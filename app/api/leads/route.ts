import { after } from 'next/server'
import { eq, sql } from 'drizzle-orm'
import { db, leads, notifications, type NotificationStatus } from '@/app/lib/db'
import { sendWhatsApp } from '@/app/lib/notify/whatsapp'
import { sendLeadEmail, emailProvider } from '@/app/lib/notify/email'
import { getClientIP, rateLimit } from '@/app/lib/rate-limit'
import { SITE } from '@/app/lib/site'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
// after() runs once the response is sent but still counts against the
// function's budget, so leave room for the database write plus two outbound
// calls without holding the visitor's request open.
export const maxDuration = 30

type LeadBody = {
  name?: string
  phone?: string
  email?: string
  detail?: string
  message?: string
  service?: string
  sourceUrl?: string
  hp?: string
}

function clean(s: unknown, max: number): string {
  return typeof s === 'string' ? s.trim().slice(0, max) : ''
}

/** Pull utm_*, gclid and fbclid out of the page URL the form was submitted from. */
function utmFrom(sourceUrl: string): Record<string, string> | undefined {
  if (!sourceUrl) return undefined
  try {
    const params = new URL(sourceUrl).searchParams
    const out: Record<string, string> = {}
    for (const [k, v] of params) {
      if (k.startsWith('utm_') || k === 'gclid' || k === 'fbclid') out[k] = v.slice(0, 120)
    }
    return Object.keys(out).length ? out : undefined
  } catch {
    return undefined
  }
}

export async function POST(request: Request) {
  const ip = getClientIP(request)
  const limited = rateLimit(`lead:${ip}`, { max: 5, windowMs: 10 * 60 * 1000 })
  if (!limited.ok) {
    return Response.json({ error: 'Too many requests. Please try again in a few minutes.' }, { status: 429 })
  }

  let body: LeadBody
  try {
    body = (await request.json()) as LeadBody
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 })
  }

  // Honeypot: bots fill hidden fields. Pretend success so they stop retrying.
  if (clean(body.hp, 100)) return Response.json({ ok: true })

  const name = clean(body.name, 80)
  const phone = clean(body.phone, 15).replace(/\D/g, '')
  const email = clean(body.email, 160)
  const detail = clean(body.detail, 80)
  const message = clean(body.message, 1000)
  const service = clean(body.service, 80)
  const sourceUrl = clean(body.sourceUrl, 300)

  if (name.length < 2) return Response.json({ error: 'Please enter your name.' }, { status: 400 })
  if (!/^[6-9]\d{9}$/.test(phone)) {
    return Response.json({ error: 'Please enter a valid 10-digit mobile number.' }, { status: 400 })
  }

  // 1. Persist first. A stored lead is the source of truth; every alert is
  //    best-effort on top of it and is recorded either way.
  let leadId: string | undefined
  if (db) {
    try {
      const [row] = await db
        .insert(leads)
        .values({
          name,
          phone,
          email: email || null,
          detail: detail || null,
          message: message || null,
          service: service || null,
          sourceUrl: sourceUrl || null,
          referrer: request.headers.get('referer'),
          utm: utmFrom(sourceUrl),
          ip,
          userAgent: request.headers.get('user-agent')?.slice(0, 300) ?? null,
        })
        .returning({ id: leads.id })
      leadId = row?.id
    } catch (err) {
      // Never fail the visitor because the database is down. The log line
      // below then becomes the only record, so it carries every field.
      console.error('[lead] db insert failed:', err)
    }
  }

  // Always log. Contains no PAN, Aadhaar or document data.
  console.log('[lead]', JSON.stringify({ leadId, stored: Boolean(leadId), name, phone, service, detail, sourceUrl, at: new Date().toISOString() }))

  // 2. Notify after the response so the visitor is not waiting on WhatsApp or
  //    email round-trips. Each attempt is written to `notifications` so the
  //    inbox shows what went out and why anything failed.
  after(async () => {
    const waTo = process.env.WHATSAPP_NOTIFY_TO || SITE.whatsappNumber
    const emailTo = process.env.LEADS_TO_EMAIL || SITE.email
    const waText = [
      'New lead on the website',
      `Name: ${name}`,
      `Phone: +91${phone}`,
      service ? `Service: ${service}` : '',
      detail ? `Detail: ${detail}` : '',
      message ? `Message: ${message}` : '',
      `Reply: https://wa.me/91${phone}`,
    ]
      .filter(Boolean)
      .join('\n')

    const [wa, mail] = await Promise.all([
      sendWhatsApp({
        // Template body order: name, phone, service, detail.
        templateParams: [name, `+91${phone}`, service || 'General enquiry', detail || '-'],
        text: waText,
      }),
      sendLeadEmail({ name, phone, email, service, detail, message, sourceUrl, referrer: request.headers.get('referer') ?? undefined, utm: utmFrom(sourceUrl), leadId, receivedAt: new Date() }),
    ])

    if (!wa.sent) console.warn('[lead] whatsapp not sent:', wa.reason)
    if (!mail.sent) console.warn('[lead] email not sent:', mail.reason)

    if (!db) return
    // "skipped" means the channel was not configured at all, which is worth
    // distinguishing from a provider that was called and failed.
    const statusOf = (r: { sent: boolean; reason?: string }): NotificationStatus =>
      r.sent ? 'sent' : /not set|not configured/i.test(r.reason ?? '') ? 'skipped' : 'failed'
    try {
      await db.insert(notifications).values([
        {
          leadId,
          channel: 'whatsapp',
          provider: wa.sent ? wa.provider : process.env.WHATSAPP_PROVIDER || null,
          kind: 'lead_alert',
          to: waTo,
          subject: process.env.WHATSAPP_TEMPLATE_NAME || null,
          body: waText,
          status: statusOf(wa),
          error: wa.sent ? null : wa.reason,
        },
        {
          leadId,
          channel: 'email',
          provider: mail.sent ? mail.provider : emailProvider(),
          kind: 'lead_alert',
          to: emailTo,
          subject: `New lead: ${name}`,
          status: statusOf(mail),
          error: mail.sent ? null : mail.reason,
        },
      ])
      if (leadId && (wa.sent || mail.sent)) {
        await db
          .update(leads)
          .set({ notifiedCount: sql`${leads.notifiedCount} + 1`, updatedAt: new Date() })
          .where(eq(leads.id, leadId))
      }
    } catch (err) {
      console.error('[lead] notification log failed:', err)
    }
  })

  return Response.json({ ok: true, leadId })
}

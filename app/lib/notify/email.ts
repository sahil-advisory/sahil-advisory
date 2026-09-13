import { SITE, BASE_URL } from '@/app/lib/site'

// One sender for every email the site produces: lead alerts today, sign-in
// links, and later order updates. Two providers are supported so the choice
// is a configuration change, not a code change:
//
//   brevo   300 emails/day free, and it can send from a verified address
//           (a Gmail counts) without owning a domain. Adds a small Brevo
//           footer on the free plan.
//   resend  3,000/month free, cleaner emails, but without a verified domain
//           it only delivers to the account owner's own inbox.
//
// EMAIL_PROVIDER picks explicitly; otherwise whichever key is present wins,
// Brevo first.

export type EmailResult = { sent: true; provider: string; id?: string } | { sent: false; reason: string }

export type EmailMessage = {
  to: string
  subject: string
  text: string
  html?: string
  replyTo?: string
}

type Provider = 'brevo' | 'resend'

export function emailProvider(): Provider | null {
  const forced = (process.env.EMAIL_PROVIDER || '').toLowerCase()
  if (forced === 'brevo' || forced === 'resend') return forced
  if (process.env.BREVO_API_KEY) return 'brevo'
  if (process.env.RESEND_API_KEY) return 'resend'
  return null
}

export function emailFrom(): { email: string; name: string } {
  const provider = emailProvider()
  const fallback =
    provider === 'resend' ? 'onboarding@resend.dev' : `leads@${new URL(BASE_URL).hostname}`
  return {
    email: process.env.EMAIL_FROM || process.env.LEADS_FROM_EMAIL || fallback,
    name: process.env.EMAIL_FROM_NAME || SITE.name,
  }
}

const TIMEOUT_MS = 8000

async function viaBrevo(msg: EmailMessage): Promise<EmailResult> {
  const key = process.env.BREVO_API_KEY
  if (!key) return { sent: false, reason: 'BREVO_API_KEY not set' }
  const from = emailFrom()
  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: { 'api-key': key, 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      sender: { email: from.email, name: from.name },
      to: [{ email: msg.to }],
      subject: msg.subject,
      textContent: msg.text,
      ...(msg.html ? { htmlContent: msg.html } : {}),
      ...(msg.replyTo ? { replyTo: { email: msg.replyTo } } : {}),
    }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  })
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    return { sent: false, reason: `brevo responded ${res.status}: ${body.slice(0, 300)}` }
  }
  const json = (await res.json().catch(() => ({}))) as { messageId?: string }
  return { sent: true, provider: 'brevo', id: json.messageId }
}

async function viaResend(msg: EmailMessage): Promise<EmailResult> {
  const key = process.env.RESEND_API_KEY
  if (!key) return { sent: false, reason: 'RESEND_API_KEY not set' }
  const from = emailFrom()
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: `${from.name} <${from.email}>`,
      to: [msg.to],
      subject: msg.subject,
      text: msg.text,
      ...(msg.html ? { html: msg.html } : {}),
      ...(msg.replyTo ? { replyTo: msg.replyTo } : {}),
    }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  })
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    return { sent: false, reason: `resend responded ${res.status}: ${body.slice(0, 300)}` }
  }
  const json = (await res.json().catch(() => ({}))) as { id?: string }
  return { sent: true, provider: 'resend', id: json.id }
}

export async function sendEmail(msg: EmailMessage): Promise<EmailResult> {
  const provider = emailProvider()
  if (!provider) return { sent: false, reason: 'no email provider configured (BREVO_API_KEY or RESEND_API_KEY)' }
  try {
    return provider === 'brevo' ? await viaBrevo(msg) : await viaResend(msg)
  } catch (err) {
    return { sent: false, reason: `${provider} request failed: ${err instanceof Error ? err.message : String(err)}` }
  }
}

export async function sendLeadEmail(input: {
  name: string
  phone: string
  service?: string
  detail?: string
  message?: string
  sourceUrl?: string
  leadId?: string
}): Promise<EmailResult> {
  const to = process.env.LEADS_TO_EMAIL || SITE.email
  const lines = [
    `Name: ${input.name}`,
    `Phone: ${input.phone}`,
    `Service: ${input.service || '-'}`,
    `Detail: ${input.detail || '-'}`,
    `Message: ${input.message || '-'}`,
    `Page: ${input.sourceUrl || '-'}`,
    input.leadId ? `Lead id: ${input.leadId}` : '',
    '',
    `Call: tel:+91${input.phone}`,
    `WhatsApp: https://wa.me/91${input.phone}`,
    input.leadId ? `Open in admin: ${BASE_URL}/admin/leads/${input.leadId}` : '',
  ].filter(Boolean)
  return sendEmail({
    to,
    replyTo: to,
    subject: `New callback request: ${input.name} (${input.service || input.detail || 'general'})`,
    text: lines.join('\n'),
  })
}

import { db, notifications } from '@/app/lib/db'
import { sendEmail, emailProvider, recipients } from '@/app/lib/notify/email'
import { portalEmail, type PortalEmailInput } from '@/app/lib/notify/portal-email'
import { BASE_URL, SITE } from '@/app/lib/site'

// Every portal email goes through here so it is logged in `notifications`
// against the engagement. Failures never throw into the action that caused
// them; the log row carries the reason.

type Target = { email: string | null | undefined; userId?: string | null; engagementId: string; kind: string }

export async function sendPortalEmail(target: Target, input: PortalEmailInput) {
  const to = target.email?.trim()
  const msg = portalEmail(input)
  const team = recipients(process.env.LEADS_TO_EMAIL || SITE.email)[0]
  const result = to
    ? await sendEmail({ to, replyTo: team, subject: msg.subject, text: msg.text, html: msg.html })
    : ({ sent: false, reason: 'no email address' } as const)
  if (!result.sent) console.warn(`[portal] ${target.kind} not sent:`, result.reason)
  if (db) {
    try {
      await db.insert(notifications).values({
        engagementId: target.engagementId,
        userId: target.userId ?? null,
        channel: 'email',
        provider: result.sent ? result.provider : emailProvider(),
        kind: target.kind,
        to: to || '-',
        subject: msg.subject,
        status: result.sent ? 'sent' : /not set|not configured|no email/i.test(result.reason) ? 'skipped' : 'failed',
        error: result.sent ? null : result.reason,
      })
    } catch (err) {
      console.error('[portal] notification log failed:', err)
    }
  }
  return result
}

export function portalLink(engagementId: string) {
  return `${BASE_URL}/dashboard/${engagementId}`
}

export function staffLink(engagementId: string) {
  return `${BASE_URL}/admin/engagements/${engagementId}`
}

export function firstName(name: string | null | undefined) {
  return (name ?? '').trim().split(/\s+/)[0] || 'there'
}

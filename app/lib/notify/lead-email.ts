import { BASE_URL, SITE } from '@/app/lib/site'

// The alert a team member reads on their phone. One glance should answer
// "who, what, how do I reach them", so the phone and the three actions come
// first and the metadata comes last. Inline styles only: email clients strip
// stylesheets, and Gmail on Android ignores anything fancier than a table.

export type LeadEmailInput = {
  name: string
  phone: string
  email?: string
  service?: string
  detail?: string
  message?: string
  sourceUrl?: string
  referrer?: string
  utm?: Record<string, string>
  leadId?: string
  receivedAt?: Date
}

const NAVY = '#0B1F3A'
const GREEN = '#059669'
const MUTED = '#64748B'
const BORDER = '#E5E9F0'
const BG = '#F6F8FB'

function esc(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function whenIST(d: Date) {
  return d.toLocaleString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' }) + ' IST'
}

function pagePath(url?: string) {
  if (!url) return ''
  try {
    const u = new URL(url)
    return u.pathname + (u.search ? '' : '')
  } catch {
    return url
  }
}

export function leadEmailSubject(i: LeadEmailInput) {
  return `New lead: ${i.name} · ${i.service || i.detail || 'General enquiry'}`
}

export function leadEmailText(i: LeadEmailInput) {
  const at = whenIST(i.receivedAt ?? new Date())
  return [
    `NEW LEAD · ${SITE.name}`,
    '',
    `${i.name}`,
    `+91 ${i.phone}`,
    i.email ? i.email : '',
    '',
    `Service: ${i.service || 'General enquiry'}`,
    i.detail ? `Detail:  ${i.detail}` : '',
    i.message ? `\nMessage:\n${i.message}` : '',
    '',
    `Call:      tel:+91${i.phone}`,
    `WhatsApp:  https://wa.me/91${i.phone}`,
    i.leadId ? `Open:      ${BASE_URL}/admin/leads/${i.leadId}` : '',
    '',
    `Received ${at}`,
    i.sourceUrl ? `From page ${pagePath(i.sourceUrl)}` : '',
    i.utm?.utm_source ? `Campaign  ${i.utm.utm_source}${i.utm.utm_campaign ? ' / ' + i.utm.utm_campaign : ''}` : '',
    i.leadId ? `Lead id   ${i.leadId}` : '',
  ]
    .filter((l) => l !== '')
    .join('\n')
}

export function leadEmailHtml(i: LeadEmailInput) {
  const at = whenIST(i.receivedAt ?? new Date())
  const wa = `https://wa.me/91${i.phone}?text=${encodeURIComponent(`Hi ${i.name.split(' ')[0]}, this is ${SITE.name}. You asked us to call about ${i.service || 'your tax query'}.`)}`
  const admin = i.leadId ? `${BASE_URL}/admin/leads/${i.leadId}` : `${BASE_URL}/admin/leads`

  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:8px 0;border-bottom:1px solid ${BORDER};font-size:12px;color:${MUTED};text-transform:uppercase;letter-spacing:.06em;width:110px;vertical-align:top">${label}</td>
      <td style="padding:8px 0;border-bottom:1px solid ${BORDER};font-size:15px;color:${NAVY};vertical-align:top">${value}</td>
    </tr>`

  const button = (href: string, label: string, bg: string, color = '#ffffff') => `
    <td style="padding:0 6px 0 0">
      <a href="${href}" style="display:inline-block;background:${bg};color:${color};text-decoration:none;font-weight:600;font-size:14px;padding:12px 18px;border-radius:8px;white-space:nowrap">${label}</a>
    </td>`

  const source = [
    i.sourceUrl ? `Page <a href="${esc(i.sourceUrl)}" style="color:${NAVY}">${esc(pagePath(i.sourceUrl))}</a>` : '',
    i.utm?.utm_source ? `Campaign <strong>${esc(i.utm.utm_source)}</strong>${i.utm.utm_campaign ? ' / ' + esc(i.utm.utm_campaign) : ''}` : '',
    i.referrer ? `Referrer ${esc(i.referrer.replace(/^https?:\/\//, '').slice(0, 60))}` : '',
  ].filter(Boolean)

  return `<!doctype html>
<html><body style="margin:0;padding:0;background:${BG}">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BG};padding:24px 12px">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;border:1px solid ${BORDER};overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif">

  <tr><td style="background:${NAVY};padding:18px 24px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
      <td style="color:#ffffff;font-size:13px;font-weight:700;letter-spacing:.12em;text-transform:uppercase">New lead</td>
      <td align="right" style="color:rgba(255,255,255,.65);font-size:12px">${esc(at)}</td>
    </tr></table>
  </td></tr>

  <tr><td style="padding:24px 24px 8px">
    <div style="font-size:24px;font-weight:800;color:${NAVY};line-height:1.2">${esc(i.name)}</div>
    <div style="margin-top:6px;font-size:20px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;color:${NAVY}">
      <a href="tel:+91${i.phone}" style="color:${NAVY};text-decoration:none">+91 ${i.phone.slice(0, 5)} ${i.phone.slice(5)}</a>
    </div>
    ${i.email ? `<div style="margin-top:4px;font-size:14px;color:${MUTED}">${esc(i.email)}</div>` : ''}
  </td></tr>

  <tr><td style="padding:12px 24px 20px">
    <table role="presentation" cellpadding="0" cellspacing="0"><tr>
      ${button(`tel:+91${i.phone}`, 'Call now', NAVY)}
      ${button(wa, 'WhatsApp', '#25D366')}
      ${button(admin, 'Open lead', '#ffffff', NAVY).replace('style="display:inline-block;', `style="display:inline-block;border:1px solid ${BORDER};`)}
    </tr></table>
  </td></tr>

  <tr><td style="padding:0 24px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${BORDER}">
      ${row('Service', esc(i.service || 'General enquiry'))}
      ${i.detail ? row('Detail', esc(i.detail)) : ''}
    </table>
  </td></tr>

  ${i.message ? `
  <tr><td style="padding:16px 24px 0">
    <div style="font-size:12px;color:${MUTED};text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px">Their message</div>
    <div style="background:${BG};border-left:3px solid ${GREEN};border-radius:0 8px 8px 0;padding:12px 14px;font-size:15px;line-height:1.55;color:${NAVY}">${esc(i.message).replace(/\n/g, '<br>')}</div>
  </td></tr>` : ''}

  <tr><td style="padding:20px 24px 22px">
    <div style="font-size:12px;line-height:1.7;color:${MUTED}">
      ${source.join('<br>')}${source.length ? '<br>' : ''}
      ${i.leadId ? `Lead id <span style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace">${i.leadId}</span>` : ''}
    </div>
  </td></tr>

  <tr><td style="background:${BG};border-top:1px solid ${BORDER};padding:12px 24px;font-size:11px;color:${MUTED}">
    ${SITE.name} · <a href="${BASE_URL}/admin/leads" style="color:${MUTED}">All leads</a> · Reply within 2 working hours is the promise on the site.
  </td></tr>

</table>
</td></tr>
</table>
</body></html>`
}

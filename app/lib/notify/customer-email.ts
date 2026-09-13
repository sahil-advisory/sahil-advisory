import { BASE_URL, SITE, whatsappLink } from '@/app/lib/site'
import { formatINR } from '@/app/lib/format'
import { planPrice, type LeadContext } from './lead-context'

// The acknowledgement a customer gets right after submitting a form. It has
// three jobs: confirm we have the request and when we will call, show them
// exactly what they asked about (so a wrong plan gets corrected before the
// call), and give them a thread to reply to with documents.
//
// Table layout and inline styles only. Gmail on Android drops <style> blocks
// and Outlook ignores most flex and grid.

export type CustomerEmailInput = {
  name: string
  phone: string
  email: string
  detail?: string
  detailLabel?: string
  message?: string
  leadId?: string
  receivedAt?: Date
  ctx: LeadContext
}

const NAVY = '#0B1F3A'
const NAVY_700 = '#1E3A5F'
const GREEN = '#059669'
const GREEN_700 = '#047857'
const GREEN_50 = '#ECFDF5'
const TEXT_2 = '#475569'
const MUTED = '#64748B'
const BORDER = '#E5E9F0'
const BG = '#F6F8FB'
const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif"

function esc(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function firstName(name: string) {
  return name.trim().split(/\s+/)[0] || 'there'
}

function whenIST(d: Date) {
  return d.toLocaleString('en-IN', { day: 'numeric', month: 'long', hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' }) + ' IST'
}

function ref(leadId?: string) {
  return leadId ? `SA-${leadId.slice(0, 6).toUpperCase()}` : ''
}

function waFollowUp(i: CustomerEmailInput) {
  const r = ref(i.leadId)
  return whatsappLink(`Hi Sahil Advisory, I just requested a callback about ${i.ctx.topic}${r ? ` (ref ${r})` : ''}. My name is ${i.name}.`)
}

export function customerEmailSubject(i: CustomerEmailInput) {
  return `We have your request${i.ctx.plan ? `: ${i.ctx.plan.name}` : i.ctx.topic !== 'your tax query' ? `: ${i.ctx.topic}` : ''} · ${SITE.name}`
}

export function customerEmailText(i: CustomerEmailInput) {
  const { ctx } = i
  const at = whenIST(i.receivedAt ?? new Date())
  const r = ref(i.leadId)
  const lines = [
    `Hi ${firstName(i.name)},`,
    '',
    `Thanks for reaching out. We received your request on ${at}${r ? ` (reference ${r})` : ''}.`,
    `A qualified professional (CMA/CA) will call you on +91 ${i.phone} within 2 working hours, ${SITE.hours}.`,
    '',
    'YOUR REQUEST',
    `About:       ${ctx.topic}`,
    i.detail ? `${i.detailLabel || 'Detail'}: ${i.detail}` : '',
    `Sent from:   ${ctx.pageLabel} (${ctx.pageUrl})`,
    i.message ? `\nYour note:\n${i.message}` : '',
  ]
  if (ctx.plan) {
    const p = ctx.plan
    lines.push(
      '',
      `ABOUT ${p.name.toUpperCase()}`,
      p.shortDesc,
      `Price:       ${planPrice(p)}${p.price !== null && p.mrp > p.price ? ` (usually ${formatINR(p.mrp)})` : ''}`,
      `Turnaround:  ${p.turnaroundDays}`,
      '',
      'Documents to keep ready:',
      ...p.documents.map((d) => `  - ${d}`)
    )
  } else if (ctx.note) {
    lines.push('', ctx.note)
  }
  lines.push(
    '',
    'WHAT HAPPENS NEXT',
    ...ctx.steps.map((s, n) => `${n + 1}. ${s.title} (${s.time}): ${s.desc}`),
    '',
    `Continue on WhatsApp: ${waFollowUp(i)}`,
    `Call us: ${SITE.phoneDisplay}`,
    '',
    'You can reply to this email with documents or questions; it reaches the team directly.',
    '',
    SITE.name,
    `${SITE.address.street}, ${SITE.address.locality} ${SITE.address.postalCode} · ${SITE.address.secondOffice}`,
    BASE_URL
  )
  // Collapse the blank lines left by optional fields.
  return lines.filter((l, idx, arr) => !(l === '' && arr[idx - 1] === '')).join('\n')
}

export function customerEmailHtml(i: CustomerEmailInput) {
  const { ctx } = i
  const at = whenIST(i.receivedAt ?? new Date())
  const r = ref(i.leadId)
  const wa = waFollowUp(i)

  const kv = (label: string, value: string) => `
    <tr>
      <td style="padding:9px 0;border-bottom:1px solid ${BORDER};font-size:12px;color:${MUTED};text-transform:uppercase;letter-spacing:.06em;width:120px;vertical-align:top">${label}</td>
      <td style="padding:9px 0;border-bottom:1px solid ${BORDER};font-size:15px;color:${NAVY};vertical-align:top">${value}</td>
    </tr>`

  const step = (n: number, title: string, desc: string, time: string, last: boolean) => `
    <tr>
      <td width="36" valign="top" style="padding:0 12px 0 0">
        <table role="presentation" cellpadding="0" cellspacing="0"><tr><td align="center" style="width:28px;height:28px;border-radius:14px;background:${n === 1 ? GREEN : NAVY};color:#ffffff;font-size:13px;font-weight:700;line-height:28px">${n}</td></tr></table>
        ${last ? '' : `<div style="width:2px;height:100%;min-height:26px;margin:4px auto 0;background:${BORDER}"></div>`}
      </td>
      <td valign="top" style="padding:0 0 ${last ? 0 : 18}px">
        <div style="font-size:15px;font-weight:700;color:${NAVY};line-height:1.3">${esc(title)}</div>
        <div style="margin-top:3px;font-size:14px;line-height:1.55;color:${TEXT_2}">${esc(desc)}</div>
        <div style="margin-top:6px;display:inline-block;background:${GREEN_50};color:${GREEN_700};font-size:12px;font-weight:600;padding:3px 10px;border-radius:999px">${esc(time)}</div>
      </td>
    </tr>`

  const button = (href: string, label: string, bg: string, color = '#ffffff', border = bg) => `
    <td style="padding:0 8px 8px 0">
      <a href="${href}" style="display:inline-block;background:${bg};color:${color};border:1px solid ${border};text-decoration:none;font-weight:600;font-size:14px;padding:12px 20px;border-radius:8px;white-space:nowrap">${label}</a>
    </td>`

  const planBlock = ctx.plan
    ? (() => {
        const p = ctx.plan
        const heading = ctx.kind === 'plan' ? 'The plan you looked at' : ctx.kind === 'deadline' ? 'The plan that covers this filing' : 'The plan that usually fits'
        const struck = p.price !== null && p.mrp > p.price ? `<span style="font-size:14px;color:${MUTED};text-decoration:line-through;margin-left:8px">${formatINR(p.mrp)}</span>` : ''
        const docs = p.documents.slice(0, 6).map((d) => `<li style="margin:0 0 5px;font-size:14px;line-height:1.5;color:${TEXT_2}">${esc(d)}</li>`).join('')
        const inc = p.includes.slice(0, 4).map((d) => `<li style="margin:0 0 5px;font-size:14px;line-height:1.5;color:${TEXT_2}">${esc(d)}</li>`).join('')
        return `
  <tr><td style="padding:0 24px 24px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${BORDER};border-radius:12px;overflow:hidden">
      <tr><td style="background:${BG};padding:14px 18px;border-bottom:1px solid ${BORDER}">
        <div style="font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:${MUTED}">${heading}</div>
        <div style="margin-top:4px;font-size:18px;font-weight:800;color:${NAVY};line-height:1.25">${esc(p.name)}</div>
        <div style="margin-top:4px;font-size:14px;color:${TEXT_2};line-height:1.5">${esc(p.shortDesc)}</div>
      </td></tr>
      <tr><td style="padding:14px 18px">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
          <td style="vertical-align:top">
            <div style="font-size:11px;color:${MUTED};text-transform:uppercase;letter-spacing:.06em">Fixed price</div>
            <div style="margin-top:2px;font-size:22px;font-weight:800;color:${NAVY};font-family:ui-monospace,SFMono-Regular,Menlo,monospace">${esc(planPrice(p))}${struck}</div>
          </td>
          <td style="vertical-align:top;text-align:right">
            <div style="font-size:11px;color:${MUTED};text-transform:uppercase;letter-spacing:.06em">Turnaround</div>
            <div style="margin-top:2px;font-size:15px;font-weight:700;color:${NAVY}">${esc(p.turnaroundDays)}</div>
          </td>
        </tr></table>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:14px"><tr>
          <td style="vertical-align:top;width:50%;padding-right:10px">
            <div style="font-size:12px;font-weight:700;color:${NAVY};margin-bottom:6px">Keep these ready</div>
            <ul style="margin:0;padding:0 0 0 18px">${docs}</ul>
          </td>
          <td style="vertical-align:top;width:50%;padding-left:10px">
            <div style="font-size:12px;font-weight:700;color:${NAVY};margin-bottom:6px">What is included</div>
            <ul style="margin:0;padding:0 0 0 18px">${inc}</ul>
          </td>
        </tr></table>
        <div style="margin-top:12px;font-size:12px;color:${MUTED}">Prices exclude GST. The exact scope is confirmed on the call; nothing is charged until you approve.</div>
      </td></tr>
    </table>
  </td></tr>`
      })()
    : ctx.note
      ? `
  <tr><td style="padding:0 24px 24px">
    <div style="background:${BG};border-left:3px solid ${GREEN};border-radius:0 8px 8px 0;padding:12px 14px;font-size:14px;line-height:1.55;color:${NAVY_700}">${esc(ctx.note)}</div>
  </td></tr>`
      : ''

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${esc(customerEmailSubject(i))}</title></head>
<body style="margin:0;padding:0;background:${BG}">
<div style="display:none;max-height:0;overflow:hidden;font-size:1px;line-height:1px;color:${BG}">A qualified professional calls you within 2 working hours about ${esc(ctx.topic)}.&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BG};padding:28px 12px">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:16px;border:1px solid ${BORDER};overflow:hidden;font-family:${FONT}">

  <!-- Brand bar -->
  <tr><td style="background:${NAVY};padding:20px 24px">
    <table role="presentation" cellpadding="0" cellspacing="0"><tr>
      <td style="padding-right:12px;vertical-align:middle">
        <img src="${BASE_URL}/apple-icon" width="40" height="40" alt="" style="display:block;border-radius:9px;background:#ffffff">
      </td>
      <td style="vertical-align:middle">
        <div style="font-size:18px;font-weight:800;color:#ffffff;line-height:1.1;letter-spacing:-0.01em">Sahil <span style="color:#34D399">Advisory</span></div>
        <div style="margin-top:3px;font-size:10px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.7)">You grow, we handle it</div>
      </td>
    </tr></table>
  </td></tr>

  <!-- Confirmation -->
  <tr><td style="padding:28px 24px 8px">
    <div style="display:inline-block;background:${GREEN_50};color:${GREEN_700};font-size:12px;font-weight:700;padding:5px 12px;border-radius:999px">&#10003;&nbsp; Request received</div>
    <h1 style="margin:14px 0 0;font-size:26px;line-height:1.2;font-weight:800;color:${NAVY};letter-spacing:-0.01em">Hi ${esc(firstName(i.name))}, we have your request.</h1>
    <p style="margin:12px 0 0;font-size:16px;line-height:1.6;color:${TEXT_2}">
      A qualified professional (CMA/CA) will call you on <strong style="color:${NAVY};font-family:ui-monospace,SFMono-Regular,Menlo,monospace">+91 ${i.phone.slice(0, 5)} ${i.phone.slice(5)}</strong> within <strong style="color:${NAVY}">2 working hours</strong>, ${esc(SITE.hours)}. There is nothing to pay now.
    </p>
  </td></tr>

  <!-- What they asked -->
  <tr><td style="padding:20px 24px 24px">
    <div style="font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:${MUTED};margin-bottom:4px">Your request</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${kv('About', `<strong>${esc(ctx.topic)}</strong>`)}
      ${i.detail ? kv(esc(i.detailLabel || 'Detail'), esc(i.detail)) : ''}
      ${kv('Sent from', `<a href="${esc(ctx.pageUrl)}" style="color:${GREEN_700};text-decoration:none">${esc(ctx.pageLabel)}</a>`)}
      ${kv('Received', `${esc(at)}${r ? ` &middot; Ref <span style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace">${r}</span>` : ''}`)}
    </table>
    ${i.message ? `<div style="margin-top:14px;background:${BG};border-left:3px solid ${GREEN};border-radius:0 8px 8px 0;padding:12px 14px;font-size:15px;line-height:1.55;color:${NAVY}"><div style="font-size:11px;color:${MUTED};text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px">Your note</div>${esc(i.message).replace(/\n/g, '<br>')}</div>` : ''}
  </td></tr>

  ${planBlock}

  <!-- Timeline -->
  <tr><td style="padding:0 24px 8px">
    <div style="font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:${MUTED};margin-bottom:14px">What happens next</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${ctx.steps.map((s, n) => step(n + 1, s.title, s.desc, s.time, n === ctx.steps.length - 1)).join('')}
    </table>
  </td></tr>

  <!-- Actions -->
  <tr><td style="padding:20px 24px 8px">
    <div style="font-size:14px;line-height:1.55;color:${TEXT_2};margin-bottom:12px">In a hurry, or want to send documents now? WhatsApp is the fastest way to reach your expert.</div>
    <table role="presentation" cellpadding="0" cellspacing="0"><tr>
      ${button(wa, 'Continue on WhatsApp', '#25D366')}
      ${button(`tel:${SITE.phoneE164}`, `Call ${SITE.phoneDisplay}`, '#ffffff', NAVY, BORDER)}
    </tr></table>
  </td></tr>

  <!-- Reply note -->
  <tr><td style="padding:8px 24px 26px">
    <div style="font-size:13px;line-height:1.6;color:${MUTED}">You can reply to this email with documents or questions; it goes straight to the team. Your details stay private and are never shared.</div>
  </td></tr>

  <!-- Footer -->
  <tr><td style="background:${BG};border-top:1px solid ${BORDER};padding:16px 24px;font-size:12px;line-height:1.7;color:${MUTED}">
    <strong style="color:${NAVY}">${SITE.name}</strong> &middot; ${esc(SITE.address.street)}, ${esc(SITE.address.locality)} ${SITE.address.postalCode} &middot; ${esc(SITE.address.secondOffice)}<br>
    <a href="${BASE_URL}" style="color:${MUTED}">${BASE_URL.replace(/^https?:\/\//, '')}</a> &middot; <a href="${BASE_URL}/pricing" style="color:${MUTED}">All prices</a> &middot; <a href="${BASE_URL}/due-dates" style="color:${MUTED}">Due dates</a><br>
    You received this because you requested a callback on our website. General information, not professional advice.
  </td></tr>

</table>
</td></tr>
</table>
</body></html>`
}

import { BASE_URL, SITE } from '@/app/lib/site'

// One branded shell for every portal email (invite, rejected document, all
// received, draft ready, filed, reminder). Same table-and-inline-styles
// approach as the lead acknowledgement so it renders in Gmail and Outlook.

const NAVY = '#0B1F3A'
const GREEN = '#059669'
const GREEN_700 = '#047857'
const GREEN_50 = '#ECFDF5'
const TEXT_2 = '#475569'
const MUTED = '#64748B'
const BORDER = '#E5E9F0'
const BG = '#F6F8FB'
const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif"

export function esc(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

export type PortalEmailInput = {
  subject: string
  preheader?: string
  greeting: string
  intro: string
  // Rows in a bordered list: label on the left, value on the right.
  rows?: { label: string; value: string; tone?: 'ok' | 'warn' | 'muted' }[]
  // Free paragraph after the rows, may contain a reason in bold.
  note?: string
  cta: { label: string; href: string }
  secondary?: { label: string; href: string }
  footnote?: string
}

export function portalEmail(i: PortalEmailInput): { subject: string; html: string; text: string } {
  const toneColor = (t?: 'ok' | 'warn' | 'muted') => (t === 'ok' ? GREEN_700 : t === 'warn' ? '#B45309' : t === 'muted' ? MUTED : NAVY)
  const rows = (i.rows ?? [])
    .map(
      (r) => `
    <tr>
      <td style="padding:9px 0;border-bottom:1px solid ${BORDER};font-size:13px;color:${MUTED};vertical-align:top;width:45%">${esc(r.label)}</td>
      <td style="padding:9px 0;border-bottom:1px solid ${BORDER};font-size:14px;font-weight:600;color:${toneColor(r.tone)};vertical-align:top;text-align:right">${esc(r.value)}</td>
    </tr>`
    )
    .join('')

  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${esc(i.subject)}</title></head>
<body style="margin:0;padding:0;background:${BG}">
${i.preheader ? `<div style="display:none;max-height:0;overflow:hidden;font-size:1px;line-height:1px;color:${BG}">${esc(i.preheader)}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</div>` : ''}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BG};padding:28px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;border:1px solid ${BORDER};overflow:hidden;font-family:${FONT}">
  <tr><td style="background:${NAVY};padding:18px 24px">
    <table role="presentation" cellpadding="0" cellspacing="0"><tr>
      <td style="padding-right:12px;vertical-align:middle"><img src="${BASE_URL}/apple-icon" width="36" height="36" alt="" style="display:block;border-radius:8px;background:#ffffff"></td>
      <td style="vertical-align:middle">
        <div style="font-size:17px;font-weight:800;color:#ffffff;line-height:1.1">Sahil <span style="color:#34D399">Advisory</span></div>
        <div style="margin-top:2px;font-size:10px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.7)">Client portal</div>
      </td>
    </tr></table>
  </td></tr>
  <tr><td style="padding:26px 24px 8px">
    <h1 style="margin:0;font-size:22px;line-height:1.25;font-weight:800;color:${NAVY}">${esc(i.greeting)}</h1>
    <p style="margin:12px 0 0;font-size:15px;line-height:1.6;color:${TEXT_2}">${esc(i.intro)}</p>
  </td></tr>
  ${rows ? `<tr><td style="padding:12px 24px 0"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${BORDER}">${rows}</table></td></tr>` : ''}
  ${i.note ? `<tr><td style="padding:16px 24px 0"><div style="background:${BG};border-left:3px solid ${GREEN};border-radius:0 8px 8px 0;padding:12px 14px;font-size:14px;line-height:1.55;color:${NAVY}">${i.note}</div></td></tr>` : ''}
  <tr><td style="padding:22px 24px 8px">
    <table role="presentation" cellpadding="0" cellspacing="0"><tr>
      <td style="padding:0 8px 8px 0"><a href="${i.cta.href}" style="display:inline-block;background:${GREEN};color:#ffffff;text-decoration:none;font-weight:600;font-size:14px;padding:12px 20px;border-radius:8px;white-space:nowrap">${esc(i.cta.label)}</a></td>
      ${i.secondary ? `<td style="padding:0 8px 8px 0"><a href="${i.secondary.href}" style="display:inline-block;background:#ffffff;color:${NAVY};border:1px solid ${BORDER};text-decoration:none;font-weight:600;font-size:14px;padding:12px 20px;border-radius:8px;white-space:nowrap">${esc(i.secondary.label)}</a></td>` : ''}
    </tr></table>
  </td></tr>
  <tr><td style="padding:8px 24px 24px"><div style="font-size:12px;line-height:1.6;color:${MUTED}">${i.footnote ? esc(i.footnote) + ' ' : ''}Questions? Reply to this email or WhatsApp ${esc(SITE.phoneDisplay)}.</div></td></tr>
  <tr><td style="background:${BG};border-top:1px solid ${BORDER};padding:14px 24px;font-size:11px;line-height:1.7;color:${MUTED}">
    <strong style="color:${NAVY}">${SITE.name}</strong> &middot; ${esc(SITE.address.locality)} and ${esc(SITE.address.secondOffice)} &middot; <a href="${BASE_URL}" style="color:${MUTED}">${BASE_URL.replace(/^https?:\/\//, '')}</a><br>
    Your documents are stored privately and seen only by your assigned expert. <span style="color:${GREEN_50}">.</span>
  </td></tr>
</table>
</td></tr></table>
</body></html>`

  const text = [
    i.greeting,
    '',
    i.intro,
    '',
    ...(i.rows ?? []).map((r) => `${r.label}: ${r.value}`),
    i.note ? '\n' + i.note.replace(/<[^>]+>/g, '') : '',
    '',
    `${i.cta.label}: ${i.cta.href}`,
    i.secondary ? `${i.secondary.label}: ${i.secondary.href}` : '',
    '',
    i.footnote ?? '',
    `Questions? Reply to this email or WhatsApp ${SITE.phoneDisplay}.`,
    '',
    `${SITE.name} · ${BASE_URL}`,
  ]
    .filter((l, idx, arr) => !(l === '' && arr[idx - 1] === ''))
    .join('\n')

  return { subject: i.subject, html, text }
}

// Compliance deadline registry with recurrence rules. nextDue() computes the
// next occurrence in IST so pages stay static and the countdown runs on the
// client. Fixed dates carry a lastVerified stamp; edit when CBDT/CBIC extend.

export type Rule =
  // `periodDays` overrides the day for specific tax-period months (1-12), e.g.
  // TDS deducted in March is due on 30 April, not 7 April.
  | { kind: 'monthly'; day: number; forPeriod: 'previous-month'; periodDays?: Record<number, number> }
  // Counted from the last day of the period month: 26QB is due 30 days after
  // month end, so January payments fall due on 2 March, not "30 February".
  | { kind: 'days-after-month-end'; days: number }
  | { kind: 'quarterly'; monthsAfterQuarter: number; day: number }
  | { kind: 'fixed'; dates: string[] } // ISO, ascending
  | { kind: 'yearly'; month: number; day: number }

export interface Deadline {
  key: string
  slug: string
  label: string
  shortLabel: string
  form: string
  appliesTo: string
  rule: Rule
  lateFee: string
  interest?: string
  intro: string
  body: string[]
  faqs: { q: string; a: string }[]
  serviceSlug?: string
  category: 'itr' | 'gst' | 'tds' | 'advance-tax'
  // One-off extensions for a single tax period, keyed 'YYYY-MM' (the period,
  // not the due month), value the extended ISO due date. Monthly rules only.
  extensions?: Record<string, string>
  lastVerified: string
  sourceUrl: string
  keywords: string[]
}

export const DEADLINES: Deadline[] = [
  {
    key: 'gstr-1', slug: 'gstr-1-due-date', label: 'GSTR-1 monthly', shortLabel: 'GSTR-1', form: 'GSTR-1',
    appliesTo: 'Regular taxpayers filing monthly (turnover above ₹5 crore or not opted for QRMP)',
    rule: { kind: 'monthly', day: 11, forPeriod: 'previous-month' },
    lateFee: '₹50 per day (₹20 for nil), capped at ₹2,000 to ₹10,000 by turnover',
    intro: 'GSTR-1 reports your outward supplies (sales) for the month. It is due on the 11th of the following month for monthly filers. Under QRMP it is due on the 13th of the month after the quarter.',
    body: [
      'GSTR-1 feeds your customers\' GSTR-2B, so a late GSTR-1 delays their input tax credit. Businesses that file late often get chased by buyers before they get chased by the department.',
      'Since the July 2025 tax period, the tax liability in GSTR-3B is auto-filled from GSTR-1 and cannot be edited. A mistake in GSTR-1 must be corrected through GSTR-1A before that month\'s GSTR-3B is filed, or through amendments in a later period. Check B2B invoices, credit notes and the HSN summary before filing.',
    ],
    faqs: [
      { q: 'What is the GSTR-1 due date for monthly filers?', a: 'The 11th of the month following the tax period. For example, October 2026 sales are reported by 11 November 2026, and November 2026 sales by 11 December 2026.' },
      { q: 'What is GSTR-1A?', a: 'An optional form to correct or add invoices missed in GSTR-1 for the same tax period, filed after GSTR-1 and before GSTR-3B. Because GSTR-3B liability is now locked to GSTR-1, GSTR-1A is the way to fix a wrong figure before paying tax.' },
      { q: 'What is the GSTR-1 due date under QRMP?', a: 'The 13th of the month following the quarter. Optionally, B2B invoices for the first two months can be uploaded through IFF by the 13th of the next month.' },
      { q: 'Can GSTR-1 be filed after GSTR-3B?', a: 'No. GSTR-1 for a period must be filed before GSTR-3B for that period.' },
    ],
    serviceSlug: 'gst-monthly', category: 'gst', lastVerified: '2026-11-16', sourceUrl: 'https://www.gst.gov.in',
    keywords: ['gstr 1 due date', 'gstr 1 last date', 'gstr-1 due date october 2026', 'gstr 1 due date november 2026'],
  },
  {
    key: 'gstr-3b', slug: 'gstr-3b-due-date', label: 'GSTR-3B monthly', shortLabel: 'GSTR-3B', form: 'GSTR-3B',
    appliesTo: 'Regular taxpayers filing monthly',
    rule: { kind: 'monthly', day: 20, forPeriod: 'previous-month' },
    lateFee: '₹50 per day (₹20 for nil returns), capped by turnover', interest: '18% per annum on tax paid late',
    intro: 'GSTR-3B is the monthly summary return through which GST is actually paid. It is due on the 20th of the following month for monthly filers, and on the 22nd or 24th after the quarter under QRMP depending on the state.',
    body: [
      'Tax must be paid before GSTR-3B can be filed, so the practical deadline for arranging funds is a few days earlier. Interest at 18% runs from the due date on the net cash liability.',
      'Input tax credit in GSTR-3B should match GSTR-2B after actioning invoices in the Invoice Management System (IMS). Invoices left without action in IMS are treated as accepted into GSTR-2B. Claiming credit that is not in 2B is the most common trigger for ASMT-10 notices.',
      'Two rules changed in 2025. The output tax liability in Table 3.1 is auto-filled from GSTR-1 and locked from the July 2025 period onwards, so corrections go through GSTR-1A first. And the GST portal no longer accepts a return filed more than three years after its due date, so very old pending returns can no longer be filed at all.',
    ],
    faqs: [
      { q: 'What is the GSTR-3B due date?', a: 'The 20th of the next month for monthly filers. QRMP filers in category X states file by the 22nd and category Y states by the 24th of the month after the quarter.' },
      { q: 'What happens if GSTR-3B is filed late?', a: 'Late fee of ₹50 per day (₹20 if nil) plus 18% interest on tax paid late. Continuous non-filing for six months can lead to cancellation of registration.' },
      { q: 'Can GSTR-3B be revised?', a: 'No. Corrections are made in the next period. Since July 2025 the liability in Table 3.1 is locked to GSTR-1, so a wrong sales figure must be fixed through GSTR-1A before filing 3B. That is why we share a draft before filing.' },
      { q: 'What is the GSTR-3B late fee?', a: '₹50 per day (₹25 CGST and ₹25 SGST), or ₹20 per day for a nil return. The fee is capped at ₹500 for nil returns, ₹2,000 for turnover up to ₹1.5 crore, ₹5,000 for ₹1.5 crore to ₹5 crore, and ₹10,000 above ₹5 crore. Interest at 18% a year is charged separately on tax paid late.' },
      { q: 'Was the GSTR-3B due date extended in 2026?', a: 'The return for March 2026 was extended to 21 April 2026. No other monthly GSTR-3B extension has been notified for 2026 as of the verified date on this page. Extensions are announced by CBIC notification and are marked in the month-by-month table above.' },
    ],
    extensions: { '2026-03': '2026-04-21' },
    serviceSlug: 'gst-monthly', category: 'gst', lastVerified: '2026-11-16', sourceUrl: 'https://www.gst.gov.in',
    keywords: ['gstr 3b due date', 'gstr 3b last date', 'gstr 3b due date october 2026', 'gstr 3b due date november 2026', 'gst payment due date', 'monthly 3b last date'],
  },
  {
    key: 'gstr-9', slug: 'gstr-9-due-date', label: 'GSTR-9 annual return', shortLabel: 'GSTR-9', form: 'GSTR-9 / 9C',
    appliesTo: 'Regular taxpayers with turnover above ₹2 crore (9C above ₹5 crore)',
    rule: { kind: 'yearly', month: 12, day: 31 },
    lateFee: '₹50 per day up to ₹5 crore turnover, ₹100 per day for ₹5 to 20 crore (both capped at 0.04% of turnover), ₹200 per day above ₹20 crore (capped at 0.5%)',
    intro: 'GSTR-9 is the annual return consolidating all monthly or quarterly filings for a financial year. It is due on 31 December following the financial year. GSTR-9C, the reconciliation statement, is due on the same date for turnover above ₹5 crore.',
    body: [
      'GSTR-9 for FY 2025-26 is due by 31 December 2026, and the forms have been open on the portal since 8 October 2026. It is optional for taxpayers with aggregate turnover up to ₹2 crore, but filing it voluntarily closes the year cleanly.',
      'FY 2025-26 is the first year with the new tables. Table 8A now draws on IMS, Table 8H1 captures import ITC taken in the following year, Tables 6A1 and 6H show ITC of earlier years and reclaims, and the rate-wise tables are split at 22 September 2025 because GST rates changed that day. ITC for FY 2025-26 invoices could be claimed only up to 30 November 2026.',
      'The return reconciles GSTR-1, GSTR-3B and your books. Differences in turnover or ITC must be explained, and any additional liability paid through DRC-03.',
    ],
    faqs: [
      { q: 'Is GSTR-9 mandatory?', a: 'Mandatory for aggregate turnover above ₹2 crore. Optional below that.' },
      { q: 'Who must file GSTR-9C?', a: 'Taxpayers with aggregate turnover above ₹5 crore, self-certified since FY 2020-21.' },
      { q: 'Has the GSTR-9 due date for FY 2025-26 been extended?', a: 'No. As of the verified date on this page, GSTR-9 and GSTR-9C for FY 2025-26 remain due on 31 December 2026. Past years have sometimes seen late extensions, and we update this page the day one is notified.' },
    ],
    serviceSlug: 'gst-annual-9', category: 'gst', lastVerified: '2026-11-16', sourceUrl: 'https://www.gst.gov.in',
    keywords: ['gstr 9 due date', 'gstr 9 due date fy 2025-26', 'gst annual return due date', 'gstr 9c due date'],
  },
  {
    key: 'cmp-08', slug: 'cmp-08-due-date', label: 'CMP-08 quarterly', shortLabel: 'CMP-08', form: 'CMP-08',
    appliesTo: 'Composition scheme taxpayers',
    rule: { kind: 'quarterly', monthsAfterQuarter: 1, day: 18 },
    lateFee: '₹50 per day (₹20 nil), capped at ₹2,000', interest: '18% per annum',
    intro: 'Composition dealers pay tax quarterly through CMP-08, due on the 18th of the month following the quarter, and file one annual return GSTR-4 by 30 June.',
    body: ['CMP-08 reports outward supplies, inward supplies under reverse charge and tax payable at the composition rate (1% traders and manufacturers, 5% restaurants, 6% services).'],
    faqs: [{ q: 'When is CMP-08 due?', a: '18 July, 18 October, 18 January and 18 April for the four quarters.' }],
    serviceSlug: 'gst-cmp08', category: 'gst', lastVerified: '2026-11-16', sourceUrl: 'https://www.gst.gov.in',
    keywords: ['cmp 08 due date', 'composition scheme due date'],
  },
  {
    key: 'tds-payment', slug: 'tds-payment-due-date', label: 'TDS monthly deposit', shortLabel: 'TDS deposit', form: 'Challan ITNS 281',
    appliesTo: 'All deductors (non-government)',
    rule: { kind: 'monthly', day: 7, forPeriod: 'previous-month', periodDays: { 3: 30 } },
    lateFee: 'No late fee, but interest', interest: '1.5% per month from date of deduction to date of deposit',
    intro: 'TDS deducted during a month must be deposited with the government by the 7th of the following month. TDS deducted in March is due by 30 April.',
    body: [
      'Interest for late deposit is 1.5% per month or part of a month, calculated from the date of deduction. A one-day delay past the 7th costs a full month of interest, so this is one of the most expensive deadlines to miss.',
      'Failure to deposit TDS also disallows 30% of the related expense under section 40(a)(ia) in the deductor\'s own return until it is paid.',
    ],
    faqs: [
      { q: 'What is the TDS payment due date?', a: 'The 7th of the next month. For March deductions, 30 April.' },
      { q: 'What is the TDS due date for property purchase (26QB)?', a: '30 days from the end of the month in which TDS was deducted.' },
    ],
    serviceSlug: 'tds-monthly-challan', category: 'tds', lastVerified: '2026-09-01', sourceUrl: 'https://incometaxindia.gov.in',
    keywords: ['tds payment due date', 'tds deposit due date', 'tds challan due date'],
  },
  {
    key: 'tds-return', slug: 'tds-return-due-date', label: 'TDS quarterly return', shortLabel: 'TDS return', form: '24Q / 26Q / 27Q',
    appliesTo: 'All TAN holders',
    rule: { kind: 'fixed', dates: ['2026-07-31', '2026-10-31', '2027-01-31', '2027-05-31', '2027-07-31', '2027-10-31'] },
    lateFee: '₹200 per day under section 234E, capped at the TDS amount',
    intro: 'Quarterly TDS statements are due on 31 July (Q1), 31 October (Q2), 31 January (Q3) and 31 May (Q4). Form 16 and 16A can be issued only after the statement is processed.',
    body: [
      'Late filing attracts ₹200 per day under 234E until the return is filed, and a penalty of ₹10,000 to ₹1,00,000 under 271H if the delay exceeds one year.',
      'Deductees cannot claim TDS credit until your return is filed and processed. Employees waiting for Form 16 in June are waiting on your Q4 24Q.',
    ],
    faqs: [
      { q: 'What are the TDS return due dates for FY 2026-27?', a: 'Q1 by 31 July 2026, Q2 by 31 October 2026, Q3 by 31 January 2027, Q4 by 31 May 2027.' },
      { q: 'When must Form 16 be issued?', a: 'By 15 June following the financial year, after the Q4 24Q is filed by 31 May.' },
    ],
    serviceSlug: 'tds-quarterly', category: 'tds', lastVerified: '2026-09-01', sourceUrl: 'https://incometaxindia.gov.in',
    keywords: ['tds return due date', 'tds return filing due date', '24q due date', '26q due date'],
  },
  {
    key: 'advance-tax', slug: 'advance-tax-due-date', label: 'Advance tax instalment', shortLabel: 'Advance tax', form: 'Challan ITNS 280',
    appliesTo: 'Anyone with tax liability above ₹10,000 after TDS (except senior citizens without business income)',
    rule: { kind: 'fixed', dates: ['2026-09-15', '2026-12-15', '2027-03-15', '2027-06-15', '2027-09-15'] },
    lateFee: 'No late fee', interest: '1% per month under 234C for shortfall, 234B if less than 90% paid by 31 March',
    intro: 'Advance tax is paid in four instalments: 15% by 15 June, 45% by 15 September, 75% by 15 December and 100% by 15 March. Presumptive taxpayers under 44AD and 44ADA pay 100% by 15 March.',
    body: [
      'Salaried employees with only salary income usually need not worry because TDS covers it. Advance tax matters when you have capital gains, F&O profits, rent, interest or freelance income not covered by TDS.',
      'Interest under 234C is 1% per month for three months on any shortfall at each instalment (one month for the March instalment). Capital gains arising after an instalment date can be paid in the remaining instalments without interest.',
    ],
    faqs: [
      { q: 'What are the advance tax due dates for FY 2026-27?', a: '15 June 2026 (15%), 15 September 2026 (45%), 15 December 2026 (75%) and 15 March 2027 (100%).' },
      { q: 'Do I need to pay advance tax on F&O income?', a: 'Yes, if total tax after TDS exceeds ₹10,000. If you opt for 44AD, the full amount is due by 15 March.' },
      { q: 'What if I miss an instalment?', a: 'Interest at 1% per month on the shortfall under 234C. You can still pay the balance in the next instalment or by 31 March to limit 234B.' },
    ],
    category: 'advance-tax', lastVerified: '2026-09-01', sourceUrl: 'https://incometaxindia.gov.in',
    keywords: ['advance tax due date', 'advance tax last date', 'advance tax instalment dates'],
  },
  {
    key: 'itr-non-audit', slug: 'itr-filing-last-date', label: 'ITR filing (non-audit)', shortLabel: 'ITR', form: 'ITR-1 to ITR-4',
    appliesTo: 'Individuals, HUFs and firms not liable to audit',
    rule: { kind: 'fixed', dates: ['2026-07-31', '2027-07-31'] },
    lateFee: '₹5,000 under 234F (₹1,000 if total income up to ₹5 lakh)', interest: '1% per month under 234A on unpaid tax',
    intro: 'The last date to file ITR for AY 2026-27 (income earned in FY 2025-26) is 31 July 2026 for taxpayers not requiring audit. A belated return can be filed until 31 December 2026 with a late fee.',
    body: [
      'Filing on time preserves your right to carry forward capital and business losses, avoids the 234F fee, and gets refunds processed earlier. Refund interest under 244A is also computed from April only if the return is filed by the due date.',
      'Extensions are announced by CBDT press release and vary by year. This page is updated within 24 hours of any extension; the last verified date is shown below.',
    ],
    faqs: [
      { q: 'What is the last date to file ITR for AY 2026-27?', a: '31 July 2026 for non-audit taxpayers. 31 October 2026 for audit cases. Belated returns until 31 December 2026.' },
      { q: 'Has the ITR due date been extended for 2026?', a: 'No extension has been notified as of the last verified date shown on this page. We update within 24 hours of a CBDT press release.' },
      { q: 'What is the penalty for late ITR filing?', a: '₹5,000 under section 234F, reduced to ₹1,000 if total income does not exceed ₹5 lakh, plus 1% per month interest on unpaid tax.' },
    ],
    serviceSlug: 'itr-salaried', category: 'itr', lastVerified: '2026-09-01', sourceUrl: 'https://incometaxindia.gov.in',
    keywords: ['itr filing last date 2026', 'itr last date', 'itr due date ay 2026-27', 'itr filing last date extension'],
  },
  {
    key: 'itr-audit', slug: 'itr-audit-due-date', label: 'ITR filing (audit cases)', shortLabel: 'ITR audit', form: 'ITR-3, 5, 6 with 3CA/3CB-3CD',
    appliesTo: 'Taxpayers liable to tax audit under 44AB',
    rule: { kind: 'fixed', dates: ['2026-10-31', '2027-10-31'] },
    lateFee: '₹5,000 under 234F; 0.5% of turnover up to ₹1,50,000 for late audit report under 271B',
    intro: 'Taxpayers whose accounts must be audited under section 44AB file the tax audit report by 30 September and the return by 31 October following the financial year.',
    body: ['Tax audit applies when business turnover exceeds ₹1 crore (₹10 crore with 95% digital transactions) or professional receipts exceed ₹50 lakh (₹75 lakh with 95% digital), and in certain presumptive opt-out cases. Audit reports are signed by Chartered Accountants; we coordinate with empanelled CAs.'],
    faqs: [{ q: 'What is the tax audit due date?', a: 'The audit report (Form 3CA/3CB with 3CD) by 30 September 2026 and the return by 31 October 2026 for FY 2025-26.' }],
    serviceSlug: 'itr-business', category: 'itr', lastVerified: '2026-09-01', sourceUrl: 'https://incometaxindia.gov.in',
    keywords: ['tax audit due date', 'itr due date audit cases'],
  },
  {
    key: 'itr-belated', slug: 'belated-return-last-date', label: 'Belated / revised return', shortLabel: 'Belated ITR', form: 'ITR under 139(4) / 139(5)',
    appliesTo: 'Anyone who missed 31 July or needs to correct a filed return',
    rule: { kind: 'fixed', dates: ['2026-12-31', '2027-12-31'] },
    lateFee: '₹5,000 under 234F (₹1,000 if income up to ₹5 lakh)',
    intro: 'A belated return for AY 2026-27 can be filed until 31 December 2026. A revised return correcting an already-filed return has the same deadline. After that, only an updated return (ITR-U) with additional tax is possible.',
    body: ['Belated returns cannot carry forward business or capital losses and cannot opt into the old regime for business income. Refunds are still allowed.'],
    faqs: [{ q: 'Can I file ITR after 31 December?', a: 'Only as an updated return under 139(8A) within 48 months, by paying 25% to 70% additional tax, and only if it results in more tax, not a refund.' }],
    serviceSlug: 'itr-belated', category: 'itr', lastVerified: '2026-09-01', sourceUrl: 'https://incometaxindia.gov.in',
    keywords: ['belated return last date', 'revised return due date', 'itr after due date'],
  },
  {
    key: '26qb', slug: '26qb-due-date', label: 'Form 26QB (property TDS)', shortLabel: '26QB', form: 'Form 26QB',
    appliesTo: 'Buyers of property worth ₹50 lakh or more',
    rule: { kind: 'days-after-month-end', days: 30 },
    lateFee: '₹200 per day under 234E', interest: '1% or 1.5% per month',
    intro: 'When you buy property worth ₹50 lakh or more, deduct 1% TDS and file Form 26QB within 30 days from the end of the month in which the payment was made.',
    body: ['Each buyer-seller combination and each instalment needs a separate 26QB. Form 16B must then be issued to the seller within 15 days of filing. Payments to NRI sellers use Form 27Q with a TAN instead, at higher rates.'],
    faqs: [{ q: 'When is Form 26QB due?', a: 'Within 30 days from the end of the month of payment. TDS paid on 10 September is due by 30 October.' }],
    serviceSlug: 'tds-26qb-property', category: 'tds', lastVerified: '2026-09-01', sourceUrl: 'https://incometaxindia.gov.in',
    keywords: ['26qb due date', 'tds on property due date', 'form 26qb last date'],
  },
]

// Returns the next due Date (IST midnight of the due date) after `now`.
export function nextDue(rule: Rule, now: Date = new Date()): Date {
  const istNow = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }))
  const y = istNow.getFullYear()
  const m = istNow.getMonth()
  const d = istNow.getDate()
  const mk = (yy: number, mm: number, dd: number) => new Date(`${yy}-${String(mm + 1).padStart(2, '0')}-${String(dd).padStart(2, '0')}T00:00:00+05:30`)

  switch (rule.kind) {
    case 'monthly':
    case 'days-after-month-end': {
      const today = mk(y, m, d).getTime()
      // Start two periods back: a period's due date falls in a later month.
      for (let i = -2; i < 14; i++) {
        const due = periodDue(rule, y, m + i)
        if (due.getTime() >= today) return due
      }
      return periodDue(rule, y, m + 14)
    }
    case 'quarterly': {
      // quarter end months: Mar(2), Jun(5), Sep(8), Dec(11)
      const ends = [2, 5, 8, 11]
      for (let i = 0; i < 8; i++) {
        const idx = i % 4
        const yy = y + Math.floor(i / 4)
        const dueM = ends[idx] + rule.monthsAfterQuarter
        const dueY = dueM > 11 ? yy + 1 : yy
        const dueMm = dueM % 12
        const cand = mk(dueY, dueMm, rule.day)
        if (cand.getTime() >= mk(y, m, d).getTime()) return cand
      }
      return mk(y + 1, 0, rule.day)
    }
    case 'fixed': {
      const today = mk(y, m, d).getTime()
      for (const iso of rule.dates) {
        const cand = new Date(`${iso}T00:00:00+05:30`)
        if (cand.getTime() >= today) return cand
      }
      return new Date(`${rule.dates[rule.dates.length - 1]}T00:00:00+05:30`)
    }
    case 'yearly': {
      const cand = mk(y, rule.month - 1, rule.day)
      if (cand.getTime() >= mk(y, m, d).getTime()) return cand
      return mk(y + 1, rule.month - 1, rule.day)
    }
  }
}

const ist = (yy: number, mm: number, dd: number) => new Date(`${yy}-${String(mm + 1).padStart(2, '0')}-${String(dd).padStart(2, '0')}T00:00:00+05:30`)

// Due date for the tax period that is month `month` (0-based, may overflow)
// of `year`. Uses UTC arithmetic so day overflow (Feb 30) rolls over correctly.
function periodDue(rule: Extract<Rule, { kind: 'monthly' | 'days-after-month-end' }>, year: number, month: number, extensions?: Record<string, string>): Date {
  const p = new Date(Date.UTC(year, month, 1))
  const py = p.getUTCFullYear()
  const pm = p.getUTCMonth()
  const key = `${py}-${String(pm + 1).padStart(2, '0')}`
  if (extensions?.[key]) return new Date(`${extensions[key]}T00:00:00+05:30`)
  if (rule.kind === 'monthly') {
    const day = rule.periodDays?.[pm + 1] ?? rule.day
    const n = new Date(Date.UTC(py, pm + 1, 1))
    return ist(n.getUTCFullYear(), n.getUTCMonth(), day)
  }
  const end = new Date(Date.UTC(py, pm + 1, 0)) // last day of the period month
  const due = new Date(end.getTime() + rule.days * 86_400_000)
  return ist(due.getUTCFullYear(), due.getUTCMonth(), due.getUTCDate())
}

export type ScheduleRow = { period: string; periodKey: string; due: Date; extended: boolean }

// Month-by-month table for period-based deadlines: `before` past periods and
// `after` upcoming ones around today. People search "GSTR-3B due date for
// September 2026", so each row names the period and its due date.
export function periodSchedule(dl: Deadline, now: Date = new Date(), before = 3, after = 9): ScheduleRow[] {
  const rule = dl.rule
  if (rule.kind !== 'monthly' && rule.kind !== 'days-after-month-end') return []
  const istNow = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }))
  const next = nextDueFor(dl, now)
  // Find the period whose due date is the next one, then window around it.
  let anchor = 0
  for (let i = -2; i < 14; i++) {
    if (periodDue(rule, istNow.getFullYear(), istNow.getMonth() + i, dl.extensions).getTime() === next.getTime()) { anchor = i; break }
  }
  const rows: ScheduleRow[] = []
  for (let i = anchor - before; i < anchor + after; i++) {
    const p = new Date(Date.UTC(istNow.getFullYear(), istNow.getMonth() + i, 1))
    const periodKey = `${p.getUTCFullYear()}-${String(p.getUTCMonth() + 1).padStart(2, '0')}`
    rows.push({
      period: p.toLocaleDateString('en-IN', { month: 'long', year: 'numeric', timeZone: 'UTC' }),
      periodKey,
      due: periodDue(rule, istNow.getFullYear(), istNow.getMonth() + i, dl.extensions),
      extended: Boolean(dl.extensions?.[periodKey]),
    })
  }
  return rows
}

// nextDue that honours one-off period extensions. Prefer this where the
// Deadline (not just its rule) is at hand.
export function nextDueFor(dl: Deadline, now: Date = new Date()): Date {
  const rule = dl.rule
  if (!dl.extensions || (rule.kind !== 'monthly' && rule.kind !== 'days-after-month-end')) return nextDue(rule, now)
  const istNow = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }))
  const today = ist(istNow.getFullYear(), istNow.getMonth(), istNow.getDate()).getTime()
  for (let i = -2; i < 14; i++) {
    const due = periodDue(rule, istNow.getFullYear(), istNow.getMonth() + i, dl.extensions)
    if (due.getTime() >= today) return due
  }
  return nextDue(rule, now)
}

// The tax period a period-based deadline's next due date belongs to, e.g.
// "October 2026" for the GSTR-3B due on 20 November 2026.
export function nextPeriodLabel(dl: Deadline, now: Date = new Date()): string | null {
  const next = nextDueFor(dl, now).getTime()
  return periodSchedule(dl, now, 0, 1).find((r) => r.due.getTime() === next)?.period ?? null
}

export function getDeadline(key: string) {
  return DEADLINES.find((x) => x.key === key)
}
export function getDeadlineBySlug(slug: string) {
  return DEADLINES.find((x) => x.slug === slug)
}

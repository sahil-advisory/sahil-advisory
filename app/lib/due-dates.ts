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
      'FY 2025-26 is the first year with the new tables. Table 8A now draws on IMS, Table 8H1 captures import ITC taken in the following year, Tables 6A1 and 6H show ITC of earlier years and reclaims, and the rate-wise tables are split at 22 September 2025 because GST rates changed that day. ITC for FY 2025-26 invoices can be claimed up to 30 November 2026 or the date the annual return is filed, whichever is earlier.',
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
      'From 1 April 2026 TDS is governed by the Income-tax Act 2025: salary under section 392 and almost every other payment under the table in section 393. The deposit dates did not change, and interest for late deposit (the old 201(1A)) carries on under section 398.',
    ],
    faqs: [
      { q: 'What is the TDS payment due date?', a: 'The 7th of the next month. For March deductions, 30 April.' },
      { q: 'What is the TDS due date for property purchase (26QB)?', a: '30 days from the end of the month in which TDS was deducted.' },
    ],
    serviceSlug: 'tds-monthly-challan', category: 'tds', lastVerified: '2026-11-16', sourceUrl: 'https://incometaxindia.gov.in',
    keywords: ['tds payment due date', 'tds deposit due date', 'tds challan due date', 'tds due date november 2026'],
  },
  {
    key: 'tds-return', slug: 'tds-return-due-date', label: 'TDS quarterly return', shortLabel: 'TDS return', form: 'Form 138 / 140 / 144 (was 24Q / 26Q / 27Q)',
    appliesTo: 'All TAN holders',
    rule: { kind: 'fixed', dates: ['2026-07-31', '2026-10-31', '2027-01-31', '2027-05-31', '2027-07-31', '2027-10-31'] },
    lateFee: '₹200 per day, capped at the TDS amount (234E, now section 427)',
    intro: 'Quarterly TDS statements are due on 31 July (Q1), 31 October (Q2), 31 January (Q3) and 31 May (Q4). From tax year 2026-27 they are filed on new forms: Form 138 for salary (was 24Q), Form 140 for other payments to residents (was 26Q) and Form 144 for non-residents (was 27Q). The due dates are unchanged.',
    body: [
      'Quarters up to March 2026, including corrections to them, stay on 24Q, 26Q and 27Q under the 1961 Act. Everything deducted from 1 April 2026 goes on the new forms, so the Q3 statement for October to December 2026, due on 31 January 2027, is filed on Form 138, 140 or 144.',
      'Late filing attracts ₹200 per day until the statement is filed, now under section 427 of the 2025 Act, and a penalty of ₹10,000 to ₹1,00,000 (section 461, formerly 271H). No penalty applies if the tax, fee and interest are paid and the statement is filed within one month of the due date.',
      'Deductees cannot claim TDS credit until your return is filed and processed. Employees waiting for Form 16 in June are waiting on your Q4 24Q.',
    ],
    faqs: [
      { q: 'What are the TDS return due dates for FY 2026-27?', a: 'Q1 by 31 July 2026, Q2 by 31 October 2026, Q3 by 31 January 2027, Q4 by 31 May 2027.' },
      { q: 'When must Form 16 be issued?', a: 'By 15 June following the year, after the Q4 statement is filed by 31 May. For salary paid from 1 April 2026 the certificate is Form 130, which replaces Form 16; the first Form 130 is due by 15 June 2027.' },
      { q: 'Which form replaces 24Q and 26Q?', a: 'Form 138 replaces 24Q (salary), Form 140 replaces 26Q (other payments to residents), Form 144 replaces 27Q (non-residents) and Form 143 replaces 27EQ (TCS), for deductions from 1 April 2026 under the Income-tax Rules 2026.' },
    ],
    serviceSlug: 'tds-quarterly', category: 'tds', lastVerified: '2026-11-16', sourceUrl: 'https://incometaxindia.gov.in',
    keywords: ['tds return due date', 'tds return filing due date', '24q due date', '26q due date', 'form 138 due date', 'form 140 tds return'],
  },
  {
    key: 'advance-tax', slug: 'advance-tax-due-date', label: 'Advance tax instalment', shortLabel: 'Advance tax', form: 'Challan ITNS 280',
    appliesTo: 'Anyone with tax liability of ₹10,000 or more after TDS (except resident senior citizens without business income)',
    rule: { kind: 'fixed', dates: ['2026-09-15', '2026-12-15', '2027-03-15', '2027-06-15', '2027-09-15'] },
    lateFee: 'No late fee', interest: '1% per month under 234C for shortfall, 234B if less than 90% paid by 31 March',
    intro: 'Advance tax is paid in four instalments: 15% by 15 June, 45% by 15 September, 75% by 15 December and 100% by 15 March. Presumptive taxpayers under 44AD and 44ADA pay 100% by 15 March.',
    body: [
      'Salaried employees with only salary income usually need not worry because TDS covers it. Advance tax matters when you have capital gains, F&O profits, rent, interest or freelance income not covered by TDS.',
      'Interest under 234C is 1% per month for three months on any shortfall at each instalment (one month for the March instalment). Capital gains arising after an instalment date can be paid in the remaining instalments without interest.',
      'Tax year 2026-27 (April 2026 to March 2027) is the first year under the Income-tax Act 2025. The instalment dates and percentages are unchanged. Interest for deferring an instalment, the old 234C, is now section 425, and interest for paying less than 90% by 31 March, the old 234B, is section 424.',
    ],
    faqs: [
      { q: 'What are the advance tax due dates for FY 2026-27?', a: '15 June 2026 (15%), 15 September 2026 (45%), 15 December 2026 (75%) and 15 March 2027 (100%). The third instalment, 75% of the estimated tax for the year, is due on 15 December 2026.' },
      { q: 'Do I need to pay advance tax on F&O income?', a: 'Yes, if total tax after TDS exceeds ₹10,000. If you opt for 44AD, the full amount is due by 15 March.' },
      { q: 'What if I miss an instalment?', a: 'Interest at 1% per month on the shortfall under 234C. You can still pay the balance in the next instalment or by 31 March to limit 234B.' },
    ],
    category: 'advance-tax', lastVerified: '2026-11-16', sourceUrl: 'https://incometaxindia.gov.in',
    keywords: ['advance tax due date', 'advance tax last date', 'advance tax instalment dates', 'advance tax due date december 2026'],
  },
  {
    key: 'itr-non-audit', slug: 'itr-filing-last-date', label: 'ITR filing (non-audit)', shortLabel: 'ITR', form: 'ITR-1 to ITR-4',
    appliesTo: 'Individuals, HUFs and firms not liable to audit (31 July, or 31 August with business income)',
    rule: { kind: 'fixed', dates: ['2026-07-31', '2027-07-31', '2028-07-31'] },
    lateFee: '₹5,000 (₹1,000 if total income up to ₹5 lakh), under 234F, and section 428 of the 2025 Act from tax year 2026-27', interest: '1% per month on unpaid tax (234A, now section 423)',
    intro: 'For tax year 2026-27 (income earned from April 2026 to March 2027), the last date to file ITR is 31 July 2027 for salaried and other taxpayers without business income, and 31 August 2027 for business and professional taxpayers whose accounts are not audited. For AY 2026-27 those dates have passed: a belated return can still be filed until 31 December 2026, and a revised return until 31 March 2027.',
    body: [
      'The 31 August date is new. Finance Act 2026 gave taxpayers with business or professional income who are not liable to audit (typically ITR-3 and ITR-4 filers), and partners of such firms, a month more than salaried filers. It is a permanent change in the law, applied from AY 2026-27, not a one-year extension.',
      'Filing on time preserves your right to carry forward capital and business losses, avoids the 234F fee, and gets refunds processed earlier. Refund interest under 244A is also computed from April only if the return is filed by the due date.',
      'Extensions are announced by CBDT circular and vary by year. For AY 2026-27 only audit cases were extended; the 31 July and 31 August dates were not. This page is updated within 24 hours of any extension; the last verified date is shown below.',
    ],
    faqs: [
      { q: 'What is the last date to file ITR for AY 2026-27?', a: '31 July 2026 for ITR-1 and ITR-2 filers, 31 August 2026 for business and professional taxpayers not liable to audit, and 21 November 2026 for audit cases after the CBDT extension. Belated returns can be filed until 31 December 2026 and revised returns until 31 March 2027.' },
      { q: 'What is the ITR due date for tax year 2026-27?', a: '31 July 2027 for salaried and other non-business taxpayers, 31 August 2027 for business and professional taxpayers without audit, 31 October 2027 for audit cases and companies, and 30 November 2027 for transfer pricing cases. These are set by section 263 of the Income-tax Act 2025.' },
      { q: 'Was the ITR due date extended in 2026?', a: 'Only for audit cases: CBDT Circular 07/2026 moved the tax audit report to 21 October 2026 and the return to 21 November 2026. The 31 July and 31 August 2026 dates were not extended.' },
      { q: 'What is the penalty for late ITR filing?', a: '₹5,000, reduced to ₹1,000 if total income does not exceed ₹5 lakh, plus 1% per month interest on unpaid tax. The fee is under section 234F for AY 2026-27 and section 428 of the 2025 Act from tax year 2026-27.' },
    ],
    serviceSlug: 'itr-salaried', category: 'itr', lastVerified: '2026-11-16', sourceUrl: 'https://incometaxindia.gov.in',
    keywords: ['itr filing last date', 'itr last date 2027', 'itr due date tax year 2026-27', 'itr 3 due date 31 august', 'itr filing last date extension'],
  },
  {
    key: 'itr-audit', slug: 'itr-audit-due-date', label: 'ITR filing (audit cases)', shortLabel: 'ITR audit', form: 'ITR-3, 5, 6 with 3CA/3CB-3CD',
    appliesTo: 'Taxpayers liable to tax audit under 44AB',
    rule: { kind: 'fixed', dates: ['2026-11-21', '2027-10-31'] },
    lateFee: '₹5,000 under 234F; 0.5% of turnover up to ₹1,50,000 for a late audit report under 271B (from tax year 2026-27, a fee of ₹75,000, or ₹1,50,000 beyond one month, under section 428)',
    intro: 'For AY 2026-27, CBDT extended the tax audit report to 21 October 2026 and the return for audit cases to 21 November 2026. The usual dates are 30 September for the audit report and 31 October for the return, which apply again from tax year 2026-27.',
    body: [
      'The extension came through CBDT Circular 07/2026 dated 28 September 2026. It covers audit cases under section 44AB and trusts filing Forms 10B and 10BB. It does not cover transfer pricing cases: the Form 3CEB report stayed due on 31 October 2026 and the return is due on 30 November 2026.',
      'The return of an audit case must be supported by an audit report already uploaded and accepted on the e-filing portal, so the report needs to be accepted before 21 November, not on the day.',
      'Tax audit applies when business turnover exceeds ₹1 crore (₹10 crore with 95% digital transactions) or professional receipts exceed ₹50 lakh (₹75 lakh with 95% digital), and in certain presumptive opt-out cases. Audit reports are signed by Chartered Accountants; we coordinate with empanelled CAs.',
    ],
    faqs: [
      { q: 'What is the tax audit due date for AY 2026-27?', a: 'The audit report (Form 3CA or 3CB with 3CD) by 21 October 2026 and the return by 21 November 2026, after CBDT Circular 07/2026 extended the usual 30 September and 31 October dates.' },
      { q: 'Is the transfer pricing due date also extended?', a: 'No. Form 3CEB stayed due on 31 October 2026, and the return for transfer pricing cases is due on 30 November 2026.' },
      { q: 'What is the tax audit due date for tax year 2026-27?', a: 'The return for audit cases is due on 31 October 2027 under section 263 of the Income-tax Act 2025, with the audit report due a month earlier, unless CBDT extends it.' },
    ],
    serviceSlug: 'itr-business', category: 'itr', lastVerified: '2026-11-16', sourceUrl: 'https://incometaxindia.gov.in',
    keywords: ['tax audit due date', 'tax audit due date extended', 'itr due date audit cases', 'itr due date 21 november 2026'],
  },
  {
    key: 'itr-belated', slug: 'belated-return-last-date', label: 'Belated / revised return', shortLabel: 'Belated ITR', form: 'ITR under 139(4) / 139(5)',
    appliesTo: 'Anyone who missed the due date, or needs to correct a filed return',
    rule: { kind: 'fixed', dates: ['2026-12-31', '2027-03-31', '2027-12-31', '2028-03-31'] },
    lateFee: 'Belated: ₹5,000 under 234F (₹1,000 if income up to ₹5 lakh). Revised after 31 December: ₹5,000 under the new 234-I (₹1,000 if income up to ₹5 lakh)',
    intro: 'A belated return for AY 2026-27 can be filed until 31 December 2026. A revised return can now be filed until 31 March 2027, three months later than before, but a revision filed after 31 December 2026 carries a fee. After those dates, only an updated return (ITR-U) with additional tax is possible.',
    body: [
      'Belated returns cannot carry forward business or capital losses and cannot opt into the old regime for business income. Refunds are still allowed.',
      'Finance Act 2026 extended the revised return window to the end of the assessment year, so 31 March 2027 for AY 2026-27, and added a fee under the new section 234-I for revisions filed after 31 December: ₹1,000 if total income is up to ₹5 lakh, ₹5,000 otherwise. A revision filed by 31 December 2026 carries no fee.',
      'An updated return can be filed within 48 months of the end of the assessment year, so up to 31 March 2031 for AY 2026-27, with additional tax of 25%, 50%, 60% or 70% of the tax and interest depending on the year of filing. From 1 March 2026 a further 10% applies if it is filed after a reassessment notice, and an updated return may now also be filed to reduce a loss.',
    ],
    faqs: [
      { q: 'What is the last date for a belated return for AY 2026-27?', a: '31 December 2026, with a late fee of ₹5,000, or ₹1,000 if total income does not exceed ₹5 lakh.' },
      { q: 'What is the last date to revise ITR for AY 2026-27?', a: '31 March 2027. Revisions filed up to 31 December 2026 are free; revisions filed from 1 January to 31 March 2027 carry a fee of ₹1,000 or ₹5,000 under section 234-I, inserted by Finance Act 2026.' },
      { q: 'Can I file ITR after 31 December?', a: 'A revised return of a return already filed, until 31 March 2027 with a fee. Otherwise only as an updated return under 139(8A) within 48 months, paying 25% to 70% additional tax, and only if it results in more tax or a smaller loss, not a refund.' },
    ],
    serviceSlug: 'itr-belated', category: 'itr', lastVerified: '2026-11-16', sourceUrl: 'https://incometaxindia.gov.in',
    keywords: ['belated return last date', 'revised return due date', 'revised return 31 march 2027', 'section 234i fee', 'itr after due date'],
  },
  {
    key: '26qb', slug: '26qb-due-date', label: 'Property TDS (Form 141, was 26QB)', shortLabel: '26QB', form: 'Form 141 (was Form 26QB)',
    appliesTo: 'Buyers of property worth ₹50 lakh or more',
    rule: { kind: 'days-after-month-end', days: 30 },
    lateFee: '₹200 per day (234E, now section 427)', interest: '1% or 1.5% per month',
    intro: 'When you buy property worth ₹50 lakh or more, deduct 1% TDS on the higher of the price and the stamp duty value, and deposit it with the statement within 30 days from the end of the month in which you paid. For payments from 1 April 2026 the statement is Form 141, which replaced Form 26QB.',
    body: [
      'Form 141 is a single challan-cum-statement that replaces 26QB, 26QC, 26QD and 26QE; property purchases go in its Schedule B. The certificate to the seller is now Form 132 (was 16B), issued within 15 days of the Form 141 due date. Payments made before 1 April 2026 stay on 26QB.',
      'Each buyer-seller combination and each instalment needs its own statement. No TAN is needed for a purchase from a resident seller. From 1 October 2026 a resident individual or HUF buying from a non-resident seller also no longer needs a TAN, although TDS on such purchases is at the higher non-resident rates.',
    ],
    faqs: [
      { q: 'When is property TDS due?', a: 'Within 30 days from the end of the month of payment. TDS on a payment made on 10 November 2026 is due by 30 December 2026. A payment in January is due by 2 March, because the 30 days run from 31 January.' },
      { q: 'Has Form 26QB been replaced?', a: 'Yes, for payments from 1 April 2026. Form 141 replaces 26QB under the Income-tax Rules 2026, and Form 132 replaces Form 16B as the certificate to the seller.' },
    ],
    serviceSlug: 'tds-26qb-property', category: 'tds', lastVerified: '2026-11-16', sourceUrl: 'https://incometaxindia.gov.in',
    keywords: ['26qb due date', 'tds on property due date', 'form 26qb last date', 'form 141 tds on property'],
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

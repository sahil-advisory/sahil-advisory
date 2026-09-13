import type { Guide } from '../types'

export const guide: Guide = {
  slug: 'itr-filing-guide-ay-2026-27',
  cluster: 'itr-filing',
  title: 'Complete Guide to ITR Filing AY 2026-27',
  h1: 'Complete Guide to ITR Filing AY 2026-27 (FY 2025-26)',
  metaTitle: 'ITR Filing AY 2026-27: Complete Guide, Dates and Steps',
  metaDescription:
    'Step-by-step ITR filing for AY 2026-27: who must file, which form to pick, documents, e-filing portal steps, deadlines, e-verification, refunds and late fees.',
  keywords: [
    'itr filing ay 2026-27',
    'how to file itr online',
    'income tax return filing 2026',
    'itr last date 2026',
    'itr filing step by step',
    'documents required for itr filing',
    'e verify itr',
    'itr refund status',
    'who should file itr',
  ],
  excerpt:
    'Everything a first-time or returning filer needs for AY 2026-27: who must file, which form to pick, what documents to keep ready, how to file on the e-filing portal, and what happens after you submit.',
  datePublished: '2026-09-06',
  dateModified: '2026-09-06',
  readMinutes: 12,
  sections: [
    {
      type: 'key-takeaways',
      items: [
        'AY 2026-27 covers income earned between 1 April 2025 and 31 March 2026. The due date for most individuals was 31 July 2026; a belated return is still possible until 31 December 2026 with a late fee.',
        'The new tax regime is the default. Salary up to ₹12.75 lakh is tax-free under it because of the ₹75,000 standard deduction and the ₹60,000 rebate under section 87A.',
        'You must file if your gross total income exceeds the basic exemption limit, or if you meet any of the mandatory triggers such as foreign assets, TDS above ₹25,000 or foreign travel spending above ₹2 lakh.',
        'Filing is not complete until you e-verify within 30 days. An unverified return is treated as never filed.',
      ],
    },
    {
      type: 'stat-grid',
      stats: [
        { label: 'Due date (non-audit)', value: '31 Jul 2026', note: 'Belated return until 31 Dec 2026' },
        { label: 'Late fee u/s 234F', value: '₹5,000', note: '₹1,000 if income up to ₹5 lakh' },
        { label: 'E-verify within', value: '30 days', note: 'From the date of filing' },
        { label: 'Tax-free salary (new regime)', value: '₹12.75 lakh', note: 'After ₹75,000 standard deduction' },
      ],
    },
    {
      type: 'tool-card',
      calculatorSlug: 'income-tax',
      text: 'Before you start, check your tax under both regimes. The calculator applies FY 2025-26 slabs, standard deduction, 87A rebate, marginal relief and cess.',
    },
    { type: 'heading', text: 'Who must file an ITR for AY 2026-27', id: 'who-must-file' },
    {
      type: 'paragraph',
      text: 'Filing is compulsory when your gross total income, before deductions under chapter VI-A and before capital gains exemptions under sections 54 to 54F, exceeds the basic exemption limit. For FY 2025-26 that limit is ₹4 lakh under the new regime and ₹2.5 lakh under the old regime (₹3 lakh for senior citizens and ₹5 lakh for super senior citizens under the old regime).',
    },
    {
      type: 'paragraph',
      text: 'Even if your income is below the limit, the seventh proviso to section 139(1) makes filing mandatory if you meet any of the following conditions during the year.',
    },
    {
      type: 'list',
      items: [
        'Deposited more than ₹1 crore in one or more current accounts, or ₹50 lakh or more in savings accounts.',
        'Spent more than ₹2 lakh on foreign travel for yourself or any other person.',
        'Paid electricity bills of more than ₹1 lakh in the year.',
        'Had TDS or TCS of ₹25,000 or more (₹50,000 for senior citizens).',
        'Business turnover above ₹60 lakh or professional receipts above ₹10 lakh.',
        'Hold any foreign asset, foreign bank account or signing authority abroad, or earn any foreign income, as a resident.',
      ],
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Filing voluntarily is often worth it',
      text: 'If TDS was deducted on your salary, bank interest or freelance income, a return is the only way to get the excess back as a refund. Filed returns are also asked for in visa applications, home loan sanction and credit card upgrades.',
    },
    { type: 'heading', text: 'ITR forms at a glance', id: 'itr-forms-overview' },
    {
      type: 'paragraph',
      text: 'The department notifies seven forms. Most individuals need ITR-1, ITR-2, ITR-3 or ITR-4. Picking the wrong one leads to a defective return notice under section 139(9), so check the eligibility carefully.',
    },
    {
      type: 'table',
      head: ['Form', 'Who it is for', 'Not allowed if'],
      rows: [
        ['ITR-1 (Sahaj)', 'Resident individual, income up to ₹50 lakh from salary, one house property, other sources, LTCG under 112A up to ₹1.25 lakh', 'Director, unlisted shares, foreign assets, NRI, business income, capital gains beyond the 112A limit'],
        ['ITR-2', 'Individuals and HUFs with capital gains, more than one house property, foreign assets, income above ₹50 lakh, NRIs', 'Any business or professional income'],
        ['ITR-3', 'Individuals and HUFs with business or professional income, F&O and intraday traders, partners in firms', 'None of the above applies and you qualify for a simpler form'],
        ['ITR-4 (Sugam)', 'Resident individual, HUF or firm (not LLP) with presumptive income under 44AD, 44ADA or 44AE, income up to ₹50 lakh', 'Foreign assets, director, unlisted shares, more than one house property'],
        ['ITR-5', 'Partnership firms, LLPs, AOPs, BOIs', 'Individuals and companies'],
        ['ITR-6', 'Companies (other than those claiming exemption under section 11)', 'Non-company taxpayers'],
        ['ITR-7', 'Trusts, political parties, research institutions and others filing under 139(4A) to 139(4D)', 'Everyone else'],
      ],
      caption: 'ITR forms for AY 2026-27. See our separate guide on choosing the right form for detailed persona examples.',
    },
    { type: 'heading', text: 'Documents to keep ready', id: 'documents-required' },
    {
      type: 'paragraph',
      text: 'Most of the numbers you need are already with the department. The Annual Information Statement (AIS) and Form 26AS on the e-filing portal list your salary, interest, dividends, share sales, property transactions and TDS. Your job is to reconcile what you have with what the AIS shows.',
    },
    {
      type: 'list',
      items: [
        'PAN and Aadhaar, linked to each other, and a mobile number registered on the portal.',
        'Form 16 from every employer you worked with during FY 2025-26 (Part A shows TDS, Part B shows the salary breakup).',
        'Form 26AS and AIS downloaded from the portal, plus the Taxpayer Information Summary (TIS).',
        'Interest certificates or statements from banks and post office for savings, FD and RD interest.',
        'Capital gains statements from your broker (tax P&L) and from CAMS or KFintech for mutual funds.',
        'Rent receipts and landlord PAN if claiming HRA, home loan interest certificate for section 24(b).',
        'Proofs for 80C, 80D, 80CCD(1B) and donations under 80G if you are choosing the old regime.',
        'Bank account details for the refund: the account must be pre-validated on the portal.',
      ],
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'Do not rely on Form 16 alone',
      text: 'Form 16 only shows what your employer knows. Bank interest, dividends and share sales appear in AIS. If your return leaves out something that AIS reports, expect a mismatch notice after processing.',
    },
    { type: 'heading', text: 'Old or new regime: decide before you start', id: 'choose-regime' },
    {
      type: 'paragraph',
      text: 'The new regime is the default for FY 2025-26. It has wider slabs, a ₹75,000 standard deduction and a rebate under section 87A of up to ₹60,000 when taxable income is ₹12 lakh or less, with marginal relief just above that. It does not allow HRA, 80C, 80D or home loan interest on a self-occupied house.',
    },
    {
      type: 'paragraph',
      text: 'The old regime keeps all those deductions but has narrower slabs: nil up to ₹2.5 lakh, 5% to ₹5 lakh, 20% to ₹10 lakh and 30% above. A salaried person without business income can switch regimes every year, but only in a return filed by the due date. A belated return is locked into the new regime.',
    },
    {
      type: 'example',
      title: 'Salary ₹12,75,000, no deductions, new regime',
      lines: [
        { label: 'Gross salary', value: '₹12,75,000' },
        { label: 'Less standard deduction', value: '₹75,000' },
        { label: 'Taxable income', value: '₹12,00,000' },
        { label: 'Tax as per slabs (5% on 4L, 10% on 4L)', value: '₹60,000' },
        { label: 'Less rebate u/s 87A', value: '₹60,000' },
        { label: 'Tax payable', value: '₹0', strong: true },
      ],
    },
    { type: 'heading', text: 'Step by step: filing on the e-filing portal', id: 'step-by-step' },
    {
      type: 'paragraph',
      text: 'The online utility on incometax.gov.in pre-fills most of the return from AIS and Form 26AS. The whole process takes 30 to 60 minutes for a salaried return once documents are in hand.',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        'Log in at incometax.gov.in with your PAN as user ID. Register first if this is your first return; you need an Aadhaar-linked mobile for the OTP.',
        'Go to e-File, then Income Tax Returns, then File Income Tax Return. Select AY 2026-27, mode Online, and status Individual.',
        'Choose the ITR form. If unsure, use the portal wizard, but verify the result against the table above.',
        'Confirm the reason for filing (income above the limit, or a seventh proviso condition) and choose the tax regime. Selecting the old regime requires ticking the opt-out box.',
        'Review each pre-filled schedule: personal information, gross total income, deductions, tax paid and total tax liability. Add anything missing, for example savings interest that AIS reported but Form 16 did not.',
        'Enter capital gains from your broker statement in Schedule CG, and house property details in Schedule HP. Claim exempt income such as PPF interest under Schedule EI.',
        'Check the tax computation. If tax is payable, pay it through e-Pay Tax as self-assessment tax (challan 280, code 300) and enter the challan details before submitting.',
        'Preview the return, validate, and submit. Note the acknowledgement number.',
        'E-verify immediately using Aadhaar OTP. Filing is incomplete without this step.',
      ],
    },
    {
      type: 'callout',
      tone: 'success',
      title: 'Keep the JSON and acknowledgement',
      text: 'Download the filed return JSON and the ITR-V acknowledgement PDF. You will need them if you revise the return, respond to a notice, or apply for a loan.',
    },
    { type: 'heading', text: 'Deadlines for AY 2026-27', id: 'deadlines' },
    {
      type: 'table',
      head: ['Event', 'Date', 'Applies to'],
      rows: [
        ['Form 16 issued by employer', '15 June 2026', 'Salaried employees'],
        ['Original return due date', '31 July 2026', 'Individuals and HUFs not requiring audit'],
        ['Tax audit report', '30 September 2026', 'Businesses and professionals above audit thresholds'],
        ['Return due date for audit cases', '31 October 2026', 'Taxpayers whose accounts are audited'],
        ['Transfer pricing cases', '30 November 2026', 'Taxpayers with international transactions'],
        ['Belated or revised return', '31 December 2026', 'Everyone, with late fee for belated'],
        ['Updated return (ITR-U)', '31 March 2031', 'Up to 48 months from the end of AY 2026-27'],
      ],
      caption: 'Key dates for FY 2025-26 income. CBDT occasionally extends the July date; check the portal for notifications.',
    },
    {
      type: 'paragraph',
      text: 'If you are reading this after 31 July 2026, you have not lost the chance to file. A belated return under section 139(4) can be filed up to 31 December 2026, with a late fee and interest. Read our guide on belated, revised and updated returns for the full cost.',
    },
    { type: 'heading', text: 'E-verification: the step most people forget', id: 'e-verification' },
    {
      type: 'paragraph',
      text: 'After submission, the return sits in the system as unverified. You have 30 days from the date of filing to verify it. Miss that window and the return is treated as not filed, and the date you eventually verify becomes the filing date, which can make an on-time return belated.',
    },
    {
      type: 'list',
      items: [
        'Aadhaar OTP: the quickest method, needs your mobile linked to Aadhaar.',
        'Net banking: log in to your bank and use the e-filing link.',
        'EVC through a pre-validated bank account or demat account.',
        'Digital Signature Certificate: mandatory for audit cases and companies.',
        'Physical ITR-V: sign and send by ordinary or speed post to CPC, Bengaluru 560500, within the same 30 days.',
      ],
    },
    {
      type: 'service-card',
      serviceSlug: 'itr-salaried',
      text: 'Want it done for you? Upload Form 16 and AIS, approve a draft computation under the better regime, and a qualified professional (CMA/CA) files and e-verifies with you. From ₹499.',
    },
    { type: 'heading', text: 'Refunds: how long and how to track', id: 'refunds' },
    {
      type: 'paragraph',
      text: 'After verification, CPC processes the return and sends an intimation under section 143(1). If TDS and advance tax exceed the final liability, the refund is credited to your pre-validated bank account, usually within two to six weeks of processing for simple returns.',
    },
    {
      type: 'paragraph',
      text: 'Interest under section 244A accrues at 0.5% per month on the refund from 1 April 2026 if you filed by the due date, or from the date of filing if you filed late. Track status under e-File, then View Filed Returns, or on the TIN NSDL refund status page.',
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'Refund stuck? Check these first',
      text: 'The most common reasons are a bank account that is not pre-validated, a name mismatch between PAN and bank records, an outstanding demand from an earlier year being adjusted, or an AIS mismatch that triggered a 143(1)(a) proposed adjustment you have not responded to.',
    },
    { type: 'heading', text: 'Penalties and interest for late or wrong filing', id: 'penalties' },
    {
      type: 'table',
      head: ['Section', 'What it covers', 'Amount'],
      rows: [
        ['234F', 'Late filing fee for a return after the due date', '₹5,000; ₹1,000 if total income is up to ₹5 lakh'],
        ['234A', 'Interest on unpaid self-assessment tax from the due date', '1% per month or part of a month'],
        ['234B', 'Interest for advance tax paid below 90% of liability', '1% per month from 1 April 2026'],
        ['234C', 'Interest for missed or short advance tax instalments', '1% per month for the shortfall period'],
        ['270A', 'Under-reporting or misreporting of income', '50% of tax on under-reported income; 200% for misreporting'],
        ['139(9)', 'Defective return not corrected within 15 days', 'Return treated as invalid'],
      ],
    },
    {
      type: 'example',
      title: 'Cost of filing on 15 November 2026 with ₹40,000 tax due, income ₹9 lakh',
      lines: [
        { label: 'Self-assessment tax', value: '₹40,000' },
        { label: 'Interest u/s 234A (4 months at 1%)', value: '₹1,600' },
        { label: 'Late fee u/s 234F', value: '₹5,000' },
        { label: 'Total outgo', value: '₹46,600', strong: true },
      ],
    },
    { type: 'heading', text: 'What to do next', id: 'what-to-do-next' },
    {
      type: 'paragraph',
      text: 'Download your AIS and Form 16, run the income tax calculator to settle the regime question, then file on the portal or hand it to an expert. If the July date has passed, file a belated return before 31 December 2026 to keep the late fee at its minimum and stop interest from growing.',
    },
  ],
  faqs: [
    {
      q: 'What is the last date to file ITR for AY 2026-27?',
      a: '31 July 2026 for individuals not requiring audit, 31 October 2026 for audit cases. A belated or revised return can be filed until 31 December 2026, and an updated return (ITR-U) up to 31 March 2031.',
    },
    {
      q: 'Is ITR filing mandatory if my salary is below ₹12.75 lakh?',
      a: 'Yes if your gross total income exceeds ₹4 lakh under the new regime, even though tax after the 87A rebate is nil. The filing threshold is the basic exemption limit, not the point where tax becomes payable.',
    },
    {
      q: 'Can I file ITR without Form 16?',
      a: 'Yes. Use your salary slips, bank credits and the salary figure reported in AIS. Form 16 is convenient but not legally required to file.',
    },
    {
      q: 'What happens if I do not e-verify within 30 days?',
      a: 'The return is treated as not filed. You will have to file again, and if the due date has passed the new return is belated, attracting the 234F fee.',
    },
    {
      q: 'How long does an income tax refund take in 2026?',
      a: 'Two to six weeks after processing for most salaried returns, provided the bank account is pre-validated. Returns with capital gains or mismatches with AIS can take longer.',
    },
    {
      q: 'Which tax regime is the default for FY 2025-26?',
      a: 'The new regime. You must actively opt for the old regime in the return, and only a return filed by the due date can make that choice.',
    },
    {
      q: 'What is the penalty for filing ITR after 31 July 2026?',
      a: '₹5,000 under section 234F, reduced to ₹1,000 if total income is up to ₹5 lakh, plus interest at 1% per month on any unpaid tax under section 234A.',
    },
    {
      q: 'Do I need to report savings account interest?',
      a: 'Yes, all of it, under income from other sources. Under the old regime section 80TTA allows a deduction of up to ₹10,000 (₹50,000 under 80TTB for senior citizens). The new regime offers no such deduction.',
    },
    {
      q: 'Can I switch from the new regime to the old regime this year?',
      a: 'Yes, if you have no business income, by opting out in a return filed by 31 July 2026. Taxpayers with business income can switch out of the new regime only once in their lifetime using Form 10-IEA.',
    },
  ],
  relatedServiceSlug: 'itr-salaried',
  relatedGuides: ['which-itr-form-to-file', 'belated-revised-updated-return', 'old-vs-new-tax-regime'],
  relatedCalculators: ['income-tax', 'take-home-salary'],
}

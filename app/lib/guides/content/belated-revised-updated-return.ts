import type { Guide } from '../types'

export const guide: Guide = {
  slug: 'belated-revised-updated-return',
  cluster: 'itr-filing',
  title: 'Belated, Revised and Updated Return (ITR-U): Deadlines, Fees and Rules',
  h1: 'Belated, Revised and Updated Return (ITR-U): Deadlines, Fees and Rules for AY 2026-27',
  metaTitle: 'Belated, Revised and Updated Return (ITR-U) Rules 2026',
  metaDescription:
    'Missed 31 July 2026? Belated 139(4), revised 139(5) and updated return ITR-U 139(8A): deadlines, the 234F fee, 25% to 70% additional tax and what you lose.',
  keywords: [
    'belated return',
    'revised return',
    'itr u updated return',
    'itr after due date',
    'section 234f late fee',
    'section 139(8a)',
    'itr u additional tax',
    'can i file itr after 31 july',
    'revised itr last date',
  ],
  excerpt:
    'The three ways to file or fix a return after the due date, what each one costs in fees, interest and additional tax, and the benefits you give up when you file late.',
  datePublished: '2026-09-06',
  dateModified: '2026-11-16',
  readMinutes: 11,
  sections: [
    {
      type: 'key-takeaways',
      items: [
        'A belated return under section 139(4) for AY 2026-27 can be filed until 31 December 2026 with a late fee of ₹5,000 (₹1,000 if income is up to ₹5 lakh) plus 1% monthly interest on unpaid tax.',
        'A revised return under section 139(5) fixes mistakes in an already filed return. Since the Finance Act 2026 it can be filed until 31 March 2027: free until 31 December 2026, then with a new fee under section 234-I of ₹1,000 (income up to ₹5 lakh) or ₹5,000. A belated return can itself be revised.',
        'If no return is filed by 31 December 2026, the only route is an updated return (ITR-U) under section 139(8A), within 48 months of the end of the assessment year, by paying additional tax of 25%, 50%, 60% or 70%, plus a further 10% if filed after a reassessment notice.',
        'Belated filers lose the right to carry forward business and capital losses, and lose the option to choose the old tax regime.',
      ],
    },
    {
      type: 'stat-grid',
      stats: [
        { label: 'Belated return deadline', value: '31 Dec 2026', note: 'Revised return until 31 Mar 2027' },
        { label: 'Late fee u/s 234F', value: '₹5,000', note: '₹1,000 if income up to ₹5 lakh' },
        { label: 'ITR-U window', value: '48 months', note: 'From the end of the assessment year' },
        { label: 'ITR-U additional tax', value: '25% to 70%', note: 'Of tax plus interest, depending on delay' },
      ],
    },
    {
      type: 'tool-card',
      calculatorSlug: 'income-tax',
      text: 'Work out the tax due first. Late fee and interest depend on total income and the unpaid amount, so a correct base figure matters.',
    },
    { type: 'heading', text: 'Three sections, three situations', id: 'three-situations' },
    {
      type: 'paragraph',
      text: 'The Income-tax Act 1961 provides separate routes depending on whether you never filed, filed but made an error, or missed both windows. Each has its own deadline, cost and restrictions, so identify your situation before acting.',
    },
    {
      type: 'table',
      head: ['Situation', 'Section', 'Deadline for AY 2026-27', 'Cost'],
      rows: [
        ['Did not file by 31 July 2026', '139(4) Belated return', '31 December 2026', '234F fee plus 234A interest at 1% per month on unpaid tax'],
        ['Filed but need to correct or add something', '139(5) Revised return', '31 March 2027', 'No fee until 31 December 2026, then a 234-I fee of ₹1,000 or ₹5,000; interest only if additional tax is due'],
        ['No return by 31 December, or want to add income later', '139(8A) Updated return (ITR-U)', '31 March 2031', '234F fee if not filed earlier, plus additional tax of 25% to 70%'],
      ],
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'From tax year 2026-27 the section numbers change',
      text: 'Returns for AY 2026-27 and earlier stay under the 1961 Act. For income earned from 1 April 2026 (tax year 2026-27), the Income-tax Act 2025 applies: sections 139(4), 139(5) and 139(8A) are now section 263(4), 263(5) and 263(6), and the 234F fee is now section 428(a) (₹1,000 if income is up to ₹5 lakh, ₹5,000 otherwise). A revised return under section 263(5) can be filed within 12 months from the end of the tax year, with a fee if filed after 9 months.',
    },
    { type: 'heading', text: 'Belated return under section 139(4)', id: 'belated-return' },
    {
      type: 'paragraph',
      text: 'If you did not file by the due date, section 139(4) lets you file any time before 31 December of the assessment year or before the assessment is completed, whichever is earlier. For income earned in FY 2025-26, that means 31 December 2026. The process on the portal is identical to a regular return; you simply select section 139(4) in the filing status.',
    },
    {
      type: 'paragraph',
      text: 'The late fee under section 234F is charged automatically when you submit. It is ₹5,000 if total income exceeds ₹5 lakh and ₹1,000 if it does not. No fee applies if your gross total income is below the basic exemption limit, but you are still allowed to file to claim a refund.',
    },
    {
      type: 'example',
      title: 'Belated return filed on 20 October 2026, salary ₹11 lakh, tax due ₹15,000 after TDS',
      lines: [
        { label: 'Self-assessment tax payable', value: '₹15,000' },
        { label: 'Interest u/s 234A (August to October, 3 months at 1%)', value: '₹450' },
        { label: 'Late fee u/s 234F (income above ₹5 lakh)', value: '₹5,000' },
        { label: 'Total to pay before filing', value: '₹20,450', strong: true },
      ],
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Interest counts part months as full months',
      text: 'Section 234A interest runs from 1 August 2026 to the date of filing. Filing on 2 September counts as two months, not one month and two days.',
    },
    { type: 'heading', text: 'What you lose by filing late', id: 'what-you-lose' },
    {
      type: 'paragraph',
      text: 'The fee is the visible cost. The hidden costs are often larger, especially for investors, traders and anyone with deductions.',
    },
    {
      type: 'list',
      items: [
        'Loss carry forward: capital losses and business losses (including F&O losses) cannot be carried forward under section 80 if the return is belated. Only house property loss and unabsorbed depreciation survive.',
        'Old regime choice: for taxpayers without business income, the old regime can be chosen only in a return filed under section 139(1). A belated return is assessed under the new regime, so HRA, 80C and 80D claims are lost.',
        'Refund interest: interest under section 244A on a refund runs from the date of filing instead of 1 April.',
        'Deductions under 10AA and Part C of chapter VI-A (80-IA, 80-IB and similar business deductions) are disallowed.',
        'Prosecution risk: wilful failure to file when tax evaded exceeds ₹25 lakh can attract prosecution under section 276CC, though this is rare for individual taxpayers who eventually file.',
      ],
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'F&O traders take the biggest hit',
      text: 'A trader with a ₹4 lakh F&O loss who files belated forfeits the right to set that loss against the next eight years of business income. At the 30% slab that is up to ₹1.2 lakh of future tax given away to avoid a ₹5,000 fee.',
    },
    { type: 'heading', text: 'Revised return under section 139(5)', id: 'revised-return' },
    {
      type: 'paragraph',
      text: 'A revised return corrects any omission or wrong statement in a return already filed, whether the original was on time or belated. There is no limit on how many times you can revise before the deadline, and the revised return completely replaces the earlier one. The Finance Act 2026 extended the deadline to the end of the assessment year, so for AY 2026-27 it is 31 March 2027 or completion of assessment, whichever is earlier. A revision filed after 31 December 2026 attracts the new fee under section 234-I: ₹1,000 if total income is up to ₹5 lakh, ₹5,000 otherwise.',
    },
    {
      type: 'list',
      items: [
        'Select section 139(5) and enter the acknowledgement number and date of the original return.',
        'Any additional tax must be paid with interest under section 234B and 234C where applicable. No 234F fee is charged on a revision of a timely return, but the 234-I fee applies if you revise after 31 December 2026.',
        'You can change the ITR form, add missed income, correct bank details or claim a forgotten deduction.',
        'Regime switching in a revised return: if the original was filed on time under the new regime, you can opt into the old regime in the revision; the reverse is also allowed.',
        'E-verify the revised return within 30 days; the original remains in force until you do.',
      ],
    },
    {
      type: 'callout',
      tone: 'success',
      title: 'Got a 143(1) intimation with a mismatch?',
      text: 'If processing shows income you missed, filing a revised return (free until 31 December 2026, with the 234-I fee until 31 March 2027) is usually cheaper and cleaner than responding to the intimation, because it avoids a demand notice and the associated interest under section 220.',
    },
    { type: 'heading', text: 'Updated return (ITR-U) under section 139(8A)', id: 'updated-return-itr-u' },
    {
      type: 'paragraph',
      text: 'Section 139(8A), inserted by the Finance Act 2022 and extended by the Finance Act 2025, lets any taxpayer file an updated return within 48 months from the end of the relevant assessment year. It works whether or not you filed an original, belated or revised return. The price is additional tax on top of the normal tax and interest, and the form is ITR-U attached to the applicable ITR. From 1 March 2026 a further 10% additional tax applies if the ITR-U is filed after a reassessment notice for that year.',
    },
    {
      type: 'table',
      head: ['ITR-U filed within', 'Additional tax', 'For AY 2026-27, file by'],
      rows: [
        ['12 months from end of AY', '25% of tax plus interest', '31 March 2028'],
        ['12 to 24 months', '50% of tax plus interest', '31 March 2029'],
        ['24 to 36 months', '60% of tax plus interest', '31 March 2030'],
        ['36 to 48 months', '70% of tax plus interest', '31 March 2031'],
      ],
      caption: 'AY 2026-27 ends on 31 March 2027. ITR-U for this year matters once the belated window closes on 31 December 2026 and the revised window on 31 March 2027. Add a further 10% if filed after a reassessment notice.',
    },
    {
      type: 'paragraph',
      text: 'As of November 2026, the earlier years still open for ITR-U are AY 2022-23 (70% additional tax, last date 31 March 2027), AY 2023-24 (60% until 31 March 2027, then 70% until 31 March 2028), AY 2024-25 (50% until 31 March 2027, rising to 70% by 31 March 2029) and AY 2025-26 (25% until 31 March 2027, then 50%). Each year the rate steps up on 1 April, so filing before March saves money.',
    },
    {
      type: 'example',
      title: 'ITR-U for AY 2025-26 filed in November 2026, undisclosed FD interest ₹2,00,000 at the 30% slab',
      lines: [
        { label: 'Tax on undisclosed income (30% plus 4% cess)', value: '₹62,400' },
        { label: 'Interest u/s 234A, 234B and 234C (indicative)', value: '₹9,400' },
        { label: 'Tax plus interest', value: '₹71,800' },
        { label: 'Additional tax at 25% (within 12 months of end of AY)', value: '₹17,950' },
        { label: 'Late fee u/s 234F if no return was filed earlier', value: '₹5,000' },
        { label: 'Total payable with ITR-U', value: '₹94,750', strong: true },
      ],
    },
    { type: 'heading', text: 'When ITR-U is not allowed', id: 'itr-u-restrictions' },
    {
      type: 'paragraph',
      text: 'ITR-U is mostly a one-way street towards paying more tax. It exists to let you regularise an omission, not to claim a refund you forgot.',
    },
    {
      type: 'list',
      items: [
        'It cannot reduce your tax liability, or create or increase a refund, compared with the earlier return. From 1 March 2026 it can, however, be filed to reduce a loss.',
        'Only one ITR-U per assessment year; it cannot itself be updated again.',
        'Not allowed once a search under section 132, survey under 133A or requisition has been initiated against you.',
        'Not allowed where an assessment, reassessment or revision for that year is pending or completed, with one exception added from 1 March 2026: an ITR-U can be filed after a reassessment notice has been issued for that year, with a further 10% additional tax.',
        'Not allowed if prosecution proceedings have been initiated for that year.',
      ],
    },
    {
      type: 'service-card',
      serviceSlug: 'itr-belated',
      text: 'Missed the deadline or found an error? We compute the fee, interest and any additional tax, file the belated, revised or updated return and share the challan and acknowledgement. Belated, revised and updated returns from ₹1,999, depending on the ITR form.',
    },
    { type: 'heading', text: 'Belated vs revised vs updated: side by side', id: 'comparison' },
    {
      type: 'table',
      head: ['Feature', 'Belated 139(4)', 'Revised 139(5)', 'Updated 139(8A)'],
      rows: [
        ['Original return required', 'No', 'Yes', 'No'],
        ['Deadline', '31 Dec 2026', '31 Mar 2027', '31 Mar 2031'],
        ['Late fee', 'Yes, 234F', '234-I fee if filed after 31 Dec 2026', '234F, if no earlier return'],
        ['Additional tax', 'No', 'No', '25% to 70%, plus 10% after a reassessment notice'],
        ['Can claim a refund', 'Yes', 'Yes', 'No increase in refund'],
        ['Can declare a loss', 'Yes, but no carry forward of business or capital loss', 'Yes', 'Only to reduce a loss (from 1 March 2026)'],
        ['Old regime allowed', 'No (for non-business taxpayers)', 'Yes, if original was on time', 'Follows the original return'],
        ['Number of times', 'Once', 'Unlimited before deadline', 'Once per year'],
      ],
    },
    { type: 'heading', text: 'How to file each one on the portal', id: 'how-to-file' },
    {
      type: 'list',
      ordered: true,
      items: [
        'Belated: log in, start a new return for AY 2026-27, and choose 139(4) under filing section. Pay tax plus interest and fee through e-Pay Tax before submitting. E-verify within 30 days.',
        'Revised: start a new return, choose 139(5), enter the original acknowledgement number and date, correct the details, and submit. E-verify within 30 days.',
        'Updated: download the offline utility for the relevant year, select 139(8A), fill Part A-GEN and Part B-ATI of ITR-U with the reason for updating, compute additional tax, pay through challan 280 (minor head 300), and upload the JSON. E-verify within 30 days.',
      ],
    },
    { type: 'heading', text: 'What to do next', id: 'what-to-do-next' },
    {
      type: 'paragraph',
      text: 'If today is before 31 December 2026 and you have not filed, file the belated return now; each month adds 1% interest and the loss carry forward is already gone, so waiting has no upside. If you filed and spotted an error, revise before 31 December 2026 to avoid the 234-I fee; the revision window stays open until 31 March 2027. If you are past that window for an earlier year, gather the income details and file ITR-U while the additional tax is still at the lower slab.',
    },
  ],
  faqs: [
    {
      q: 'Can I file ITR after 31 July 2026?',
      a: 'Yes, as a belated return under section 139(4) until 31 December 2026. A late fee of ₹5,000 applies (₹1,000 if total income is up to ₹5 lakh), plus 1% monthly interest on any unpaid tax.',
    },
    {
      q: 'What is the last date to file a revised return for AY 2026-27?',
      a: '31 March 2027, or before the assessment is completed, whichever comes first. The Finance Act 2026 extended the window to the end of the assessment year. Revisions filed after 31 December 2026 attract a fee under section 234-I of ₹1,000 if total income is up to ₹5 lakh and ₹5,000 otherwise. A revised return can be filed any number of times before the deadline.',
    },
    {
      q: 'Can a belated return be revised?',
      a: 'Yes. Since AY 2017-18 a return filed under section 139(4) can be revised under section 139(5), as long as the revision is filed within the time allowed. For AY 2026-27 that is 31 March 2027, with the 234-I fee after 31 December 2026.',
    },
    {
      q: 'How much is the additional tax on ITR-U?',
      a: '25% of the aggregate tax and interest if filed within 12 months of the end of the assessment year, 50% within 24 months, 60% within 36 months and 70% within 48 months. From 1 March 2026 a further 10% applies if the ITR-U is filed after a reassessment notice.',
    },
    {
      q: 'Can I claim a refund through ITR-U?',
      a: 'No. An updated return cannot reduce your tax liability, or create or increase a refund, compared with the return already filed. It is for reporting additional income and paying the tax on it, and from 1 March 2026 it can also be filed to reduce a loss.',
    },
    {
      q: 'Is the 234F late fee applicable if my income is below the exemption limit?',
      a: 'No fee applies if gross total income is below the basic exemption limit. If income exceeds the limit but total income is up to ₹5 lakh, the fee is ₹1,000; above ₹5 lakh it is ₹5,000.',
    },
    {
      q: 'Can I choose the old tax regime in a belated return?',
      a: 'Not if you have no business income. Section 115BAC requires the opt-out to be made in a return filed under 139(1). A belated return is assessed under the new regime.',
    },
    {
      q: 'Can F&O losses be carried forward in a belated return?',
      a: 'No. Business losses and capital losses can be carried forward only if the return is filed by the due date under section 139(1). House property loss and unabsorbed depreciation can still be carried forward.',
    },
    {
      q: 'Can I file ITR-U if I never filed any return for that year?',
      a: 'Yes. ITR-U can be filed whether or not an original return exists, provided the year is within 48 months of the end of the assessment year and none of the disqualifications such as a search or a pending assessment apply.',
    },
  ],
  relatedServiceSlug: 'itr-belated',
  relatedGuides: ['itr-filing-guide-ay-2026-27', 'income-tax-notices-explained', 'which-itr-form-to-file'],
  relatedCalculators: ['income-tax', 'advance-tax'],
}

import type { Guide } from '../types'
import { act2025Of } from '@/app/lib/act2025'

// Tables are generated from the central map in app/lib/act2025.ts so the
// guide and the 22 reference pages can never drift apart.
const row = (e: { old: string; new: string | null; what: string }) => [e.what, e.old, e.new ?? 'No direct equivalent listed']

export const guide: Guide = {
  slug: 'income-tax-act-2025-what-changes',
  cluster: 'income-tax-act-2025',
  title: 'Income-tax Act 2025: What Changes From 1 April 2026 (and What Does Not)',
  h1: 'Income-tax Act 2025: What Changes From 1 April 2026 (and What Does Not)',
  metaTitle: 'Income-tax Act 2025: What Changes From 1 April 2026',
  metaDescription:
    'The Income-tax Act 2025 applies from 1 April 2026. What the tax year means, the verified section and form renumbering, and what changed in Finance Act 2026.',
  keywords: [
    'income tax act 2025',
    'new income tax act from april 2026',
    'tax year vs assessment year',
    'income tax act 2025 section mapping',
    'section 80c new section number',
    'form 16 new form number',
    'income tax bill 2025 changes',
    'does new income tax act change tax slabs',
  ],
  excerpt:
    'The Income-tax Act 2025 has been in force since 1 April 2026, and the Income-tax Rules 2026 with their new forms since the same day. Your AY 2026-27 return stays under the 1961 Act. Here is what actually changes, what only looks different, and what to do now.',
  datePublished: '2026-09-06',
  dateModified: '2026-11-16',
  readMinutes: 10,
  sections: [
    {
      type: 'key-takeaways',
      items: [
        'The Income-tax Act 2025 applies from tax year 2026-27, which began on 1 April 2026. Returns for FY 2025-26 (AY 2026-27), belated by 31 December 2026 or revised by 31 March 2027, are still filed under the Income-tax Act 1961.',
        'The single "tax year" replaces the previous year and assessment year pair. Income earned in tax year 2026-27 is reported in a return due in 2027.',
        'Finance Act 2026 kept the tax slabs, the ₹75,000 standard deduction, the ₹60,000 rebate up to ₹12 lakh and capital gains rates unchanged for tax year 2026-27. It raised STT on futures and options and changed how buybacks are taxed.',
        'Sections and forms are renumbered: 80C is now section 123 and 87A is section 156, checked against the enacted Act. The Income-tax Rules 2026, notified on 20 March 2026, brought new forms: Form 130 replaces Form 16, and TDS statements moved to Forms 138, 140 and 144 from the July 2026 quarter.',
      ],
    },
    {
      type: 'stat-grid',
      stats: [
        { label: 'In force from', value: '1 April 2026', note: 'Tax year 2026-27 onwards' },
        { label: 'Sections', value: '536', note: 'Against 819 effective sections in the 1961 Act' },
        { label: 'Chapters and schedules', value: '23 and 16', note: 'Down from 47 chapters' },
        { label: 'AY 2026-27 belated return', value: '31 Dec 2026', note: 'Under the 1961 Act; revised by 31 Mar 2027' },
      ],
    },
    {
      type: 'tool-card',
      calculatorSlug: 'income-tax',
      text: 'The slabs in this calculator are the same for FY 2025-26 and tax year 2026-27, because Finance Act 2026 left them unchanged. Use it for both your AY 2026-27 return and your tax year 2026-27 planning.',
    },
    { type: 'heading', text: 'Why the Act was rewritten', id: 'why-a-new-act' },
    {
      type: 'paragraph',
      text: 'The Income-tax Act 1961 had been amended by more than 60 Finance Acts and thousands of notifications. Sections carried letters and sub-letters, over 1,200 provisos and 900 explanations modified the main text, and the same word meant different things in different chapters. The Income-tax Bill 2025 was introduced in February 2025, examined by a Select Committee of Parliament, reintroduced with its recommendations in August 2025, passed by both Houses and received Presidential assent on 21 August 2025.',
    },
    {
      type: 'paragraph',
      text: 'The stated goal was simplification without a change in policy. The new Act has 536 sections in 23 chapters and 16 schedules, roughly half the word count of the old law. Formulas and tables replace prose in many places, and the provisos and explanations have been folded into the main text. What the law taxes, at what rate, and who pays it are meant to stay the same.',
    },
    { type: 'heading', text: 'Tax year replaces previous year and assessment year', id: 'tax-year' },
    {
      type: 'paragraph',
      text: 'The most visible change is vocabulary. Under the 1961 Act, income earned in the previous year 2025-26 is assessed in the assessment year 2026-27, a pairing that confuses first-time filers every July. The 2025 Act uses one term: tax year. A tax year is the twelve months from 1 April to 31 March. Income of tax year 2026-27 is reported in the return for tax year 2026-27, filed after 31 March 2027.',
    },
    {
      type: 'table',
      head: ['Income earned in', '1961 Act terminology', '2025 Act terminology', 'Return filed'],
      rows: [
        ['1 April 2025 to 31 March 2026', 'Previous year 2025-26, assessment year 2026-27', 'Not applicable, old Act governs', '31 July 2026 (31 August with business income, 21 November 2026 audit cases); belated by 31 December 2026'],
        ['1 April 2026 to 31 March 2027', 'Would have been AY 2027-28', 'Tax year 2026-27', '31 July 2027 (31 August with business income, 31 October audit cases), under section 263'],
        ['1 April 2027 to 31 March 2028', '', 'Tax year 2027-28', '31 July 2028, on the same pattern'],
      ],
      caption: 'How the tax year lines up with the old previous year and assessment year',
    },
    {
      type: 'paragraph',
      text: 'For a business or profession set up during the year, the tax year begins on the date of setting up and ends on 31 March. Forms, notices and challans for tax year 2026-27 use the new term. Everything relating to AY 2026-27 and earlier keeps the old labels.',
    },
    { type: 'heading', text: 'AY 2026-27 filings stay under the 1961 Act', id: 'ay-2026-27-under-old-act' },
    {
      type: 'paragraph',
      text: 'Section 536 of the 2025 Act repeals the 1961 Act but saves everything already in motion under it. Returns for FY 2025-26, their processing under section 143(1), rectifications under 154, scrutiny under 143(2) and reassessment under 148 for any year up to AY 2026-27 all continue under the old Act and its section numbers. The e-filing utilities for AY 2026-27 use the 1961 Act forms: ITR-1 to ITR-7, Form 16, Form 26AS and the rest.',
    },
    {
      type: 'callout',
      tone: 'success',
      title: 'Your AY 2026-27 return stays under the old Act',
      text: 'If you have not yet filed for FY 2025-26, file a belated return under the 1961 Act by 31 December 2026 with the 234F fee of ₹5,000 (₹1,000 if income is up to ₹5 lakh). A filed return can be revised until 31 March 2027; Finance Act 2026 extended that window and added a fee under section 234-I for revisions after 31 December. The new Act does not touch this return.',
    },
    { type: 'heading', text: 'Section renumbering', id: 'section-renumbering' },
    {
      type: 'paragraph',
      text: 'Because provisions were regrouped, almost every section has a new number and several have been merged. Exemptions that lived in section 10 now sit in schedules, and TDS provisions that ran from 192 to 206 are consolidated into a small group of sections with tables. The mapping below is the one most often cited for the provisions individuals and small businesses use.',
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'How these numbers were checked',
      text: 'On 16 November 2026 we checked the section numbers below against the text of the Income-tax Act 2025 as enacted, and corrected two that commonly circulate wrongly: short-term gains on listed equity (111A) is section 196, not 197, and reassessment is split between section 280 (the 148 notice) and section 281 (the 148A procedure). Where published mappings disagree, as for 142(1), we show no number rather than guess.',
    },
    {
      type: 'table',
      head: ['Provision', '1961 Act section', 'Reported 2025 Act reference'],
      rows: act2025Of('section').map(row),
      caption: 'Section mapping. Returns for AY 2026-27 still use the 1961 numbering.',
    },
    {
      type: 'paragraph',
      text: 'The pattern to remember is that deductions from total income (the old chapter VI-A) now begin in the 120s, TDS and TCS sit in the 390s, and the return and assessment provisions are in the 260s to 280s. Software vendors and the department are expected to show both numbers during the transition.',
    },
    { type: 'heading', text: 'Form renumbering under the Income-tax Rules 2026', id: 'form-renumbering' },
    {
      type: 'paragraph',
      text: 'The Income-tax Rules 2026 were notified on 20 March 2026 (Notification 22/2026) and apply from 1 April 2026. They renumber every prescribed form. Forms tied to a period from April 2026 are already in use: TDS statements for the quarter ending June 2026 were filed on Forms 138, 140 and 144 by 31 July 2026, and property buyers have used Form 141 instead of 26QB since April. The first Form 130, replacing Form 16, will be issued by 15 June 2027.',
    },
    {
      type: 'table',
      head: ['Document', 'Current form', 'Reported new form'],
      rows: [...act2025Of('form'), ...act2025Of('challan')].map(row),
      caption: 'Form and challan renumbering as published in mappings of the Rules. Periods up to March 2026 stay on the old forms.',
    },
    { type: 'heading', text: 'What does not change: slabs, rates and deductions', id: 'what-does-not-change' },
    {
      type: 'paragraph',
      text: 'The 2025 Act is a consolidation, not a Budget. Tax rates are set every year by the Finance Act, and the new Act simply provides the framework into which those rates fit. The new regime remains the default, the old regime remains available by option, and the structure of deductions, exemptions and capital gains carries over.',
    },
    {
      type: 'list',
      items: [
        'Slabs and rates: unchanged. The new regime slabs (0% to ₹4 lakh, 5% to ₹8 lakh, 10% to ₹12 lakh, 15% to ₹16 lakh, 20% to ₹20 lakh, 25% to ₹24 lakh, 30% above) and 4% cess apply to tax year 2026-27 as they did to FY 2025-26; Finance Act 2026 proposed no change.',
        'Standard deduction of ₹75,000 under the new regime and ₹50,000 under the old regime, and the ₹60,000 rebate under 87A for income up to ₹12 lakh, continue under their new section numbers.',
        'Capital gains: 20% short-term and 12.5% long-term on listed equity with the ₹1.25 lakh exemption, 12.5% on property and other assets, 30% on virtual digital assets. Buyback proceeds are taxed as capital gains rather than dividend from tax year 2026-27.',
        'Presumptive taxation limits of ₹2 crore (₹3 crore digital) under 44AD and ₹50 lakh (₹75 lakh digital) under 44ADA.',
        'Advance tax instalments, the 48-month updated return window, and interest for late return, short advance tax and deferment (234A, 234B and 234C, now sections 423, 424 and 425). Return due dates are in section 263, with 31 August now the date for non-audit business and professional taxpayers.',
        'Old regime deductions: 80C ₹1.5 lakh, 80D, 80CCD(1B) ₹50,000, 24(b) ₹2 lakh interest on self-occupied property, HRA under 10(13A).',
      ],
    },
    {
      type: 'example',
      title: 'Same salary, same tax, under both Acts',
      lines: [
        { label: 'Gross salary, new regime', value: '₹18,00,000' },
        { label: 'Less standard deduction', value: '₹75,000' },
        { label: 'Taxable income', value: '₹17,25,000' },
        { label: 'Tax: ₹4 to 8 lakh at 5%', value: '₹20,000' },
        { label: 'Tax: ₹8 to 12 lakh at 10%', value: '₹40,000' },
        { label: 'Tax: ₹12 to 16 lakh at 15%', value: '₹60,000' },
        { label: 'Tax: ₹16 to 17.25 lakh at 20%', value: '₹25,000' },
        { label: 'Tax before cess', value: '₹1,45,000' },
        { label: 'Cess at 4%', value: '₹5,800' },
        { label: 'Total tax under the 1961 Act for FY 2025-26', value: '₹1,50,800', strong: true },
        { label: 'Total tax under the 2025 Act for tax year 2026-27 (slabs unchanged by Finance Act 2026)', value: '₹1,50,800', strong: true },
      ],
    },
    { type: 'heading', text: 'What Finance Act 2026 changed', id: 'finance-act-2026' },
    {
      type: 'list',
      items: [
        'STT on derivatives from 1 April 2026: futures up from 0.02% to 0.05%, options premium from 0.1% to 0.15%, and exercised options from 0.125% to 0.15%.',
        'Buybacks: proceeds are taxed as capital gains in the hands of shareholders instead of as dividend, with additional tax for promoters.',
        'Revised returns: the window runs to 12 months from the end of the year (31 March 2027 for AY 2026-27), with a fee of ₹1,000 or ₹5,000 for a revision filed after nine months.',
        'Updated returns: a further 10% additional tax if filed after a reassessment notice, and an updated return may now be filed to reduce a loss.',
        'TCS from 1 April 2026: remittances for education or medical treatment above ₹10 lakh at 2% (was 5%), overseas tour packages at a flat 2%, and liquor, scrap and minerals at 2%.',
        'TDS: supply of manpower is treated as work (contractor rates of 1% or 2%), and from 1 October 2026 an individual buying property from a non-resident no longer needs a TAN.',
      ],
    },
    { type: 'heading', text: 'What actually changes in substance', id: 'substantive-changes' },
    {
      type: 'paragraph',
      text: 'Beyond numbering and language, a small number of practical changes were made during the drafting, several on the Select Committee recommendation.',
    },
    {
      type: 'list',
      items: [
        'Refunds can be claimed in a return filed after the due date. The Bill as first introduced would have denied refunds on belated returns; the passed Act removed that restriction.',
        'A nil TDS certificate can be obtained by any deductee who expects no tax liability, rather than only a lower deduction certificate, reducing refund waits for pensioners and small earners.',
        'Deduction for commuted pension is extended to individuals receiving pension from a fund without being an employee.',
        'Deductions and exemptions are presented in tables with conditions in columns, which changes how eligibility is read but not what is allowed.',
        'The scope of "income" and "salary" definitions is consolidated in one place, and the term "receipt" replaces several overlapping phrases for money received.',
        'Search and survey powers include access to digital records and virtual digital spaces, a provision that drew comment during the committee stage and is retained in the Act.',
      ],
    },
    {
      type: 'service-card',
      serviceSlug: 'itr-salaried',
      text: 'Your AY 2026-27 return is filed under the 1961 Act with the FY 2025-26 rules. We prepare it, compare regimes on your actual numbers and note anything you should set up for the first year of the 2025 Act.',
    },
    { type: 'heading', text: 'What taxpayers must do now', id: 'what-to-do-now' },
    {
      type: 'paragraph',
      text: 'For most individuals there is little to do until 2027: close out the FY 2025-26 return, pay advance tax for tax year 2026-27 on the same dates, and keep the same records. Employers and deductors are already on the new forms, so the transition is theirs to manage now.',
    },
    {
      type: 'table',
      head: ['Who', 'Now (2026)', 'Next year (2027)'],
      rows: [
        ['Salaried employees', 'Belated AY 2026-27 return by 31 December 2026 if not filed; third advance tax instalment by 15 December if you have other income', 'Expect Form 130 instead of Form 16 by June 2027; check it against payslips'],
        ['Employers and deductors', 'File quarterly statements on Forms 138, 140 and 144 (Q3 due 31 January 2027); corrections for quarters up to March 2026 stay on 24Q and 26Q', 'Issue Form 130 and 131 certificates; quote sections 392 and 393 in payroll and contracts'],
        ['Businesses and professionals', 'Belated or revised AY 2026-27 return; refer to the new section numbers in new contracts', 'First return under section 263, due 31 August 2027 if not audited'],
        ['Investors', 'No change to capital gains computation or reporting', 'Check that broker and RTA statements use tax year 2026-27 and new schedule references'],
        ['Anyone with a pending notice', 'Reply under the 1961 Act procedure; deadlines and sections in the notice are unchanged', 'Notices for tax year 2026-27 onwards will cite the new sections'],
      ],
      caption: 'Action plan for the transition',
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Keep both numbers handy for a year',
      text: 'For the next year you will see old and new numbers side by side in Form 26AS (now Form 168), TRACES, broker statements and software. Keep a mapping for the ten sections you use most, such as the table above, rather than trusting a screenshot from a forum.',
    },
    { type: 'heading', text: 'What to do next', id: 'what-to-do-next' },
    {
      type: 'paragraph',
      text: 'If your FY 2025-26 return is not yet filed, file it now under the 1961 Act before 31 December 2026 to limit the late fee and interest. For tax year 2026-27, pay the third advance tax instalment by 15 December 2026 and the last by 15 March 2027, and keep records as usual. If you deduct TDS, make sure your software files on the new forms.',
    },
  ],
  faqs: [
    {
      q: 'When does the Income-tax Act 2025 come into force?',
      a: 'From 1 April 2026, applying to tax year 2026-27 onwards. It received Presidential assent on 21 August 2025. Income earned up to 31 March 2026, including the return for AY 2026-27, is governed by the Income-tax Act 1961.',
    },
    {
      q: 'Do I file my AY 2026-27 return under the new Act?',
      a: 'No. The return for FY 2025-26 (AY 2026-27), now belated by 31 December 2026 or revised by 31 March 2027, is filed under the 1961 Act with the existing ITR forms, section numbers and Form 16.',
    },
    {
      q: 'What is a tax year under the Income-tax Act 2025?',
      a: 'The twelve-month period from 1 April to 31 March in which income is earned and for which the return is filed. It replaces both "previous year" and "assessment year". The first tax year is 2026-27, with returns due in 2027.',
    },
    {
      q: 'Does the new Income-tax Act change tax slabs or rates?',
      a: 'No. Rates are fixed each year by the Finance Act, and Finance Act 2026 kept the slabs, the ₹75,000 standard deduction, the ₹60,000 rebate up to ₹12 lakh (now section 156) and capital gains rates unchanged for tax year 2026-27.',
    },
    {
      q: 'What is the new section number for 80C?',
      a: 'Section 123 of the Income-tax Act 2025, with the list of eligible investments in Schedule XV. The ₹1.5 lakh limit and eligible investments are unchanged, and the deduction is still available only under the old regime.',
    },
    {
      q: 'Will Form 16 be replaced?',
      a: 'Yes. Under the Income-tax Rules 2026 the salary TDS certificate is Form 130 for salary paid from 1 April 2026, so the first one is due by 15 June 2027. Form 16 for FY 2025-26, issued by 15 June 2026, is unaffected.',
    },
    {
      q: 'Is the old tax regime abolished by the Income-tax Act 2025?',
      a: 'No. The new regime remains the default and the old regime with deductions such as 80C, HRA and 24(b) remains available by option, under renumbered sections. The choice rules for salaried and business taxpayers carry over.',
    },
    {
      q: 'What happens to a pending income tax notice after 1 April 2026?',
      a: 'It continues under the 1961 Act. Section 536 of the new Act saves all proceedings, assessments, appeals and recoveries relating to years up to AY 2026-27, so the section numbers and deadlines in your notice remain valid.',
    },
    {
      q: 'What should employers do to prepare for the new Act?',
      a: 'The change has already happened for them. TDS deducted from 1 April 2026 is reported on Forms 138 (salary), 140 (other residents) and 144 (non-residents), certificates become Forms 130 and 131, and contracts and payroll should cite section 392 for salary and section 393 for other TDS. Corrections for quarters up to March 2026 stay on the old forms.',
    },
  ],
  relatedServiceSlug: 'itr-salaried',
  relatedGuides: ['itr-filing-guide-ay-2026-27', 'old-vs-new-tax-regime', 'tds-guide-for-employers'],
  relatedCalculators: ['income-tax', 'tds'],
}

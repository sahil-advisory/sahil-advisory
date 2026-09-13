import type { ReferencePage } from '../types'

// Section reference pages for FY 2025-26 (AY 2026-27) under the Income-tax
// Act 1961. Limits come from app/lib/tax/rules/fy2025-26.ts; repeat them here
// as copy only. Act 2025 mappings are included only where reported, and are
// flagged as such.

export const SECTIONS: ReferencePage[] = [
  // ---------------------------------------------------------------- 80C
  {
    kind: 'section',
    slug: '80c',
    name: 'Section 80C',
    h1: 'Section 80C Deduction FY 2025-26: Limit, Eligible Investments and Example',
    metaTitle: 'Section 80C Deduction FY 2025-26: Limit and List',
    metaDescription:
      'Section 80C allows a deduction of up to ₹1,50,000 in FY 2025-26, old regime only. Eligible investments with lock-ins, tax saved by slab, example and FAQs.',
    keywords: [
      'section 80c',
      '80c deduction list',
      'section 80c limit 2025-26',
      '80c in new tax regime',
      '80c investment options',
      'ppf 80c deduction',
      'elss lock in period',
      'home loan principal 80c',
      'tuition fees 80c',
      '80c maximum limit',
    ],
    summary:
      'Section 80C allows a deduction of up to ₹1,50,000 a year from your gross total income for investments and payments such as PPF, EPF, ELSS, life insurance premium, NSC, 5-year tax-saver FD, Sukanya Samriddhi, tuition fees and home loan principal. It is available only under the old tax regime. At the 30% slab the full limit saves ₹46,800 including cess.',
    keyFacts: [
      { label: 'Maximum deduction', value: '₹1,50,000 per year (combined with 80CCC and 80CCD(1))' },
      { label: 'Regime', value: 'Old regime only. Not available under the new regime.' },
      { label: 'Who can claim', value: 'Individuals and HUFs. Not companies, firms or LLPs.' },
      { label: 'Maximum tax saved', value: '₹46,800 at 30% slab, ₹31,200 at 20%, ₹7,800 at 5% (including 4% cess)' },
      { label: 'Basis', value: 'Actual payment during 1 April 2025 to 31 March 2026' },
      { label: 'Income-tax Act 2025', value: 'Section 123 (reported)' },
    ],
    sections: [
      { type: 'heading', text: 'How it works', id: 'how-it-works' },
      {
        type: 'paragraph',
        text: 'Section 80C of the Income-tax Act 1961 lets you reduce your taxable income by the amount you invest or pay into a specified list of instruments, up to a ceiling of ₹1,50,000 in a financial year. The deduction is on a payment basis: what matters is the money that actually left your account between 1 April 2025 and 31 March 2026, not what you committed to.',
      },
      {
        type: 'paragraph',
        text: 'The ₹1.5 lakh ceiling is shared. Section 80CCC (pension fund premiums) and section 80CCD(1) (your own NPS contribution) sit inside the same cap under section 80CCE. Only the additional ₹50,000 under section 80CCD(1B) sits outside it. So if your EPF alone is ₹1.6 lakh a year, you have already exhausted 80C and nothing else in this list will reduce your tax further.',
      },
      {
        type: 'paragraph',
        text: 'The deduction is available only if you file under the old tax regime. The new regime, which is the default from FY 2023-24, does not allow 80C at all. That single fact decides whether 80C planning is worth doing for you, so check the regime comparison before you lock money away for tax reasons.',
      },
      {
        type: 'paragraph',
        text: 'How much you save depends on your slab. A deduction of ₹1,50,000 reduces tax by ₹46,800 at the 30% slab, ₹31,200 at 20% and ₹7,800 at 5%, all including 4% cess. For someone whose old-regime taxable income is around ₹5 lakh, the deduction can also pull income under the ₹5 lakh threshold for the section 87A rebate, which makes the effective saving larger than the slab rate suggests. Some payments in the list also reverse if you exit early: a house sold within five years of possession, a life policy surrendered within two years, or a ULIP closed within five years adds the earlier deductions back to your income in the year of exit.',
      },
      {
        type: 'table',
        head: ['Instrument', 'Lock-in', 'Notes'],
        rows: [
          ['Employee Provident Fund (EPF)', 'Until retirement or withdrawal rules', 'Only your own 12% contribution counts, not the employer share'],
          ['Public Provident Fund (PPF)', '15 years', 'Maximum ₹1.5 lakh a year, interest is tax-free'],
          ['ELSS mutual funds', '3 years', 'Shortest lock-in in the list, equity-linked'],
          ['Life insurance premium', 'Policy term', 'Premium must not exceed 10% of sum assured for the deduction to be allowed in full'],
          ['National Savings Certificate (NSC)', '5 years', 'Accrued interest is reinvested and itself qualifies for 80C except in the final year'],
          ['5-year tax-saver bank or post office FD', '5 years', 'Interest is taxable; premature withdrawal not allowed'],
          ['Sukanya Samriddhi Yojana (SSY)', 'Until the girl child turns 21 (partial withdrawal at 18)', 'For a girl child below 10 years at opening'],
          ['Senior Citizens Savings Scheme (SCSS)', '5 years', 'Age 60 and above, interest taxable'],
          ['Home loan principal repayment', 'Do not sell within 5 years of possession', 'Includes stamp duty and registration charges in the year paid'],
          ['Tuition fees', 'None', 'Full-time education of up to two children, Indian institution, tuition component only'],
          ['Unit Linked Insurance Plan (ULIP)', '5 years', 'Premium must not exceed 10% of sum assured'],
          ['NPS Tier 1 (own contribution, 80CCD(1))', 'Until 60', 'Shares the ₹1.5 lakh cap; extra ₹50,000 under 80CCD(1B) is separate'],
        ],
        caption: 'Section 80C eligible investments for FY 2025-26. All of them together are capped at ₹1,50,000.',
      },
      {
        type: 'example',
        title: 'Salaried employee, ₹12 lakh gross salary, old regime',
        lines: [
          { label: 'EPF (employee share, 12% of ₹40,000 basic)', value: '₹57,600' },
          { label: 'PPF deposit', value: '₹50,000' },
          { label: 'Term insurance premium', value: '₹18,000' },
          { label: 'Tuition fees for one child', value: '₹60,000' },
          { label: 'Total eligible payments', value: '₹1,85,600' },
          { label: 'Deduction allowed under 80C', value: '₹1,50,000', strong: true },
          { label: 'Tax saved at 20% slab plus cess', value: '₹31,200', strong: true },
        ],
      },
      {
        type: 'callout',
        tone: 'warning',
        title: 'The most common mistake: investing for 80C while filing under the new regime',
        text: 'If you file under the new regime, 80C gives you nothing. Every year taxpayers lock ₹1.5 lakh into a 5-year FD or a low-return insurance plan in March, then find at filing time that the new regime is cheaper even without the deduction. Run the regime comparison first. If the new regime wins, invest on merit, not for the deduction.',
      },
      {
        type: 'tool-card',
        calculatorSlug: 'income-tax',
        text: 'Enter your salary and 80C payments to see the tax under both regimes side by side and whether the deduction actually changes the answer.',
      },
      { type: 'heading', text: 'What to do next', id: 'next-steps' },
      {
        type: 'paragraph',
        text: 'Add up the payments you have already made this year, starting with EPF from your salary slip, home loan principal from the bank statement and school fee receipts. If the total is below ₹1.5 lakh and the old regime is better for you, top up with PPF or ELSS before 31 March 2026. Keep the receipts; your employer needs proof for Form 16 by January or February, and you need them if the return is picked for verification. If you are unsure which regime to choose, an expert-assisted return includes the comparison.',
      },
    ],
    faqs: [
      {
        q: 'What is the maximum deduction under section 80C for FY 2025-26?',
        a: '₹1,50,000. This limit is shared with section 80CCC and section 80CCD(1). The extra ₹50,000 for NPS under section 80CCD(1B) is over and above it, taking the total to ₹2,00,000.',
      },
      {
        q: 'Can I claim 80C in the new tax regime?',
        a: 'No. Section 80C is not available under the new regime. The only deductions the new regime allows are the standard deduction of ₹75,000 for salaried taxpayers and the employer NPS contribution under section 80CCD(2).',
      },
      {
        q: 'Does the employer share of EPF count under 80C?',
        a: 'No. Only your own 12% contribution qualifies. The employer contribution is exempt separately and does not appear in your 80C total. Voluntary Provident Fund (VPF) contributions do count.',
      },
      {
        q: 'Is home loan principal covered under 80C?',
        a: 'Yes, the principal portion of your EMI on a housing loan qualifies, along with stamp duty and registration charges paid in the year of purchase. The interest is claimed separately under section 24(b). If you sell the house within five years of possession, the principal deductions claimed are reversed.',
      },
      {
        q: 'Which 80C investment has the shortest lock-in?',
        a: 'ELSS mutual funds, at 3 years. Tax-saver FDs, NSC and SCSS are 5 years, PPF is 15 years, and EPF runs until retirement or eligible withdrawal.',
      },
      {
        q: 'Can I claim tuition fees for more than two children?',
        a: 'No. Section 80C covers full-time tuition fees for a maximum of two children per taxpayer at a school, college or university in India. Development fees, donations, transport and hostel charges are not covered. A spouse can claim for other children separately.',
      },
      {
        q: 'Do I need to submit proof of 80C investments while filing ITR?',
        a: 'Not with the return. You declare the amount in Schedule VI-A of the ITR. Keep receipts, statements and premium certificates because the department can ask for them in a notice, and your employer needs them for Form 16.',
      },
      {
        q: 'What is the new section number for 80C under the Income-tax Act 2025?',
        a: 'Secondary sources report section 80C as section 123 of the Income-tax Act 2025, which applies from tax year 2026-27. The limit of ₹1,50,000 is reported to continue. Verify against the notified Rules before relying on the new number.',
      },
    ],
    group: 'Deductions',
    act2025: { newNumber: 'Section 123', status: 'reported', note: 'Reported in secondary sources; verify against the notified Rules.' },
    relatedServiceSlugs: ['itr-salaried', 'itr-salaried-plus'],
    relatedCalculatorSlugs: ['income-tax', 'take-home-salary'],
    relatedGuideSlugs: ['old-vs-new-tax-regime', 'itr-filing-guide-ay-2026-27', 'income-tax-act-2025-what-changes'],
    relatedReferenceSlugs: ['80ccd-1b', '80d', 'form-16'],
    datePublished: '2026-09-13',
    dateModified: '2026-09-13',
  },
  // ---------------------------------------------------------------- 80D
  {
    kind: 'section',
    slug: '80d',
    name: 'Section 80D',
    h1: 'Section 80D Deduction FY 2025-26: Health Insurance Limits for Self, Family and Parents',
    metaTitle: 'Section 80D Deduction FY 2025-26: Limits and Example',
    metaDescription:
      'Section 80D allows ₹25,000 for health insurance of self and family, ₹50,000 for seniors, plus ₹25,000 or ₹50,000 for parents, up to ₹1,00,000. With example.',
    keywords: [
      'section 80d',
      '80d deduction limit 2025-26',
      '80d for senior citizen parents',
      'preventive health checkup 80d',
      '80d in new tax regime',
      'health insurance tax benefit',
      '80d medical expenditure senior citizen',
      'mediclaim deduction 80d',
      '80d maximum limit 1 lakh',
    ],
    summary:
      'Section 80D allows a deduction of up to ₹25,000 for health insurance premium paid for yourself, spouse and dependent children, rising to ₹50,000 if any of you is a senior citizen. A further ₹25,000 is allowed for parents, or ₹50,000 if they are senior citizens, so the maximum is ₹1,00,000. Preventive health check-ups up to ₹5,000 count within these limits. Old regime only.',
    keyFacts: [
      { label: 'Self, spouse and children', value: '₹25,000, or ₹50,000 if any is aged 60 or above' },
      { label: 'Parents', value: '₹25,000, or ₹50,000 if either parent is aged 60 or above' },
      { label: 'Maximum combined', value: '₹1,00,000 (both families senior)' },
      { label: 'Preventive health check-up', value: '₹5,000, within the limit above, cash payment allowed' },
      { label: 'Regime', value: 'Old regime only' },
      { label: 'Who can claim', value: 'Individuals and HUFs paying premium by any mode other than cash' },
    ],
    sections: [
      { type: 'heading', text: 'How it works', id: 'how-it-works' },
      {
        type: 'paragraph',
        text: 'Section 80D of the Income-tax Act 1961 gives a deduction for health insurance premium, contributions to the Central Government Health Scheme or a notified scheme, preventive health check-ups and, for senior citizens without insurance, actual medical expenditure. It sits outside section 80C, so it is a separate ₹25,000 to ₹1,00,000 on top of the ₹1.5 lakh limit.',
      },
      {
        type: 'paragraph',
        text: 'The deduction works in two buckets. The first covers you, your spouse and dependent children. The second covers your parents, whether or not they are dependent on you. Each bucket has its own limit of ₹25,000, which rises to ₹50,000 when the insured person in that bucket is aged 60 or above at any time during the year.',
      },
      {
        type: 'paragraph',
        text: 'Premium must be paid by cheque, card, UPI or net banking. Cash premium is not allowed. The one exception is the preventive health check-up, which can be paid in cash, up to ₹5,000, and that ₹5,000 is not extra: it sits inside the bucket limit. Premiums for a multi-year policy are spread evenly over the policy years, so a ₹60,000 premium for a three-year policy gives ₹20,000 a year.',
      },
      {
        type: 'paragraph',
        text: 'Senior citizens who cannot get insurance, or choose not to, have a fallback. For a person aged 60 or above with no health policy, actual medical expenditure of up to ₹50,000 in the year is deductible in place of premium. This covers hospital bills, consultations, medicines and diagnostics paid by non-cash mode, for yourself or for a senior citizen parent. A family with two uninsured parents above 60 can therefore claim up to ₹50,000 of their medical bills, and the taxpayer\'s own family premium on top. A HUF can also claim 80D for premium paid on any member, within the same ₹25,000 or ₹50,000 limit.',
      },
      {
        type: 'table',
        head: ['Situation', 'Self and family', 'Parents', 'Maximum'],
        rows: [
          ['Everyone below 60', '₹25,000', '₹25,000', '₹50,000'],
          ['You below 60, a parent 60 or above', '₹25,000', '₹50,000', '₹75,000'],
          ['You 60 or above, parents 60 or above', '₹50,000', '₹50,000', '₹1,00,000'],
          ['Senior citizen with no insurance, medical bills paid', 'Up to ₹50,000 of actual expenditure', 'Up to ₹50,000 of actual expenditure', '₹1,00,000'],
        ],
        caption: 'Section 80D limits for FY 2025-26. Preventive check-up of ₹5,000 is included within, not added to, each figure.',
      },
      {
        type: 'example',
        title: 'Working professional aged 35 insuring family and senior citizen parents',
        lines: [
          { label: 'Family floater premium (self, spouse, one child)', value: '₹22,000' },
          { label: 'Preventive check-up for self, paid in cash', value: '₹4,000' },
          { label: 'Self and family bucket (₹26,000, capped)', value: '₹25,000', strong: true },
          { label: 'Parents policy premium, father aged 64', value: '₹42,000' },
          { label: 'Parents bucket (within ₹50,000)', value: '₹42,000', strong: true },
          { label: 'Total 80D deduction', value: '₹67,000', strong: true },
          { label: 'Tax saved at 30% plus cess', value: '₹20,904' },
        ],
      },
      {
        type: 'callout',
        tone: 'warning',
        title: 'Common mistakes',
        text: 'Three claims get rejected most often. Premium paid in cash, which is not allowed. Premium for in-laws, siblings or grandparents, who are not covered at all. And premium paid by your employer as part of a group policy, which you did not pay and cannot claim. If your employer deducts a top-up premium from your salary, that portion is yours to claim. And remember the regime: section 80D is not available under the new tax regime. Buy health insurance anyway; the deduction is a bonus under the old regime, not the reason for the cover.',
      },
      {
        type: 'tool-card',
        calculatorSlug: 'income-tax',
        text: 'Add your 80D premium alongside 80C and HRA to see whether the old regime with deductions beats the new regime slabs for FY 2025-26.',
      },
      { type: 'heading', text: 'What to do next', id: 'next-steps' },
      {
        type: 'paragraph',
        text: 'Collect the premium receipts and the insurer certificate showing the insured persons and their dates of birth, because the age of the insured decides the limit. If your parents are above 60 and uninsured, keep the bills for their medicines, hospital visits and diagnostics through the year; up to ₹50,000 of that spend is deductible if paid by non-cash mode. Declare the figures in Schedule VI-A of the return, splitting self and parents, and ticking the senior citizen box where it applies, because the ITR utility caps each bucket from those answers. Submit the same proofs to your employer before the January or February deadline so that Form 16 already reflects the deduction. If you are on the old regime and paying premium for both families, this is one of the largest deductions after 80C and HRA, and a regime comparison at filing time will show whether it tips the balance for the year.',
      },
    ],
    faqs: [
      {
        q: 'What is the 80D limit for FY 2025-26?',
        a: '₹25,000 for self, spouse and children, ₹50,000 if any of them is a senior citizen. A separate ₹25,000 or ₹50,000 for parents. The maximum combined deduction is ₹1,00,000 when both you and your parents are senior citizens.',
      },
      {
        q: 'Is section 80D allowed in the new tax regime?',
        a: 'No. Section 80D is available only under the old regime. Under the new regime the premium gives no tax benefit.',
      },
      {
        q: 'Can I claim 80D for parents who are not dependent on me?',
        a: 'Yes. The parents bucket does not require dependency. You must actually pay the premium from your own account. Parents-in-law are not covered.',
      },
      {
        q: 'Is the ₹5,000 preventive health check-up over and above ₹25,000?',
        a: 'No. The ₹5,000 for preventive health check-up is included within the ₹25,000 or ₹50,000 limit of the relevant bucket. If your premium is already ₹25,000, the check-up adds nothing.',
      },
      {
        q: 'Can senior citizens claim medical expenses without insurance under 80D?',
        a: 'Yes. A senior citizen aged 60 or above with no health insurance can claim actual medical expenditure up to ₹50,000, paid by any mode other than cash. This applies for self and for senior citizen parents.',
      },
      {
        q: 'Can I claim 80D if premium is paid in cash?',
        a: 'No. Premium must be paid by cheque, card, UPI, net banking or any non-cash mode. Only the preventive health check-up of up to ₹5,000 may be paid in cash.',
      },
      {
        q: 'How is a two-year or three-year health policy premium treated under 80D?',
        a: 'A lump sum premium for a multi-year policy is divided equally across the policy years, and the proportionate amount is deductible each year, subject to the annual limit.',
      },
    ],
    group: 'Deductions',
    relatedServiceSlugs: ['itr-salaried', 'itr-salaried-plus'],
    relatedCalculatorSlugs: ['income-tax'],
    relatedGuideSlugs: ['old-vs-new-tax-regime', 'itr-filing-guide-ay-2026-27'],
    relatedReferenceSlugs: ['80c', '80ccd-1b', 'form-16'],
    datePublished: '2026-09-13',
    dateModified: '2026-09-13',
  },
  // ---------------------------------------------------------------- 80CCD(1B)
  {
    kind: 'section',
    slug: '80ccd-1b',
    name: 'Section 80CCD(1B)',
    h1: 'Section 80CCD(1B) NPS Deduction FY 2025-26: Extra ₹50,000 Over 80C',
    metaTitle: 'Section 80CCD(1B) NPS Deduction FY 2025-26: ₹50,000',
    metaDescription:
      'Section 80CCD(1B) gives an extra ₹50,000 deduction for NPS Tier 1 over the ₹1.5 lakh 80C limit, old regime only. Employer NPS u/s 80CCD(2) in both regimes.',
    keywords: [
      'section 80ccd(1b)',
      'nps tax benefit 80ccd 1b',
      '80ccd(1b) limit 2025-26',
      'nps 50000 deduction',
      '80ccd(2) employer contribution new regime',
      'nps deduction in new tax regime',
      'nps tier 1 tax exemption',
      '80ccd 1b over and above 80c',
      'nps 14 percent employer contribution',
    ],
    summary:
      'Section 80CCD(1B) allows an additional deduction of ₹50,000 for your own contribution to NPS Tier 1, over and above the ₹1,50,000 limit of section 80C, under the old regime only. Employer contribution to NPS under section 80CCD(2) is separate and is allowed in both regimes, up to 14% of basic plus DA under the new regime and 10% under the old regime for private employees.',
    keyFacts: [
      { label: 'Extra deduction', value: '₹50,000 for own NPS Tier 1 contribution' },
      { label: 'Relationship to 80C', value: 'Over and above ₹1,50,000, so up to ₹2,00,000 in total' },
      { label: 'Regime for 80CCD(1B)', value: 'Old regime only' },
      { label: 'Employer NPS u/s 80CCD(2)', value: 'Both regimes: 14% of basic plus DA (new), 10% (old, private sector), 14% for government employees' },
      { label: 'Who can claim', value: 'Individuals aged 18 to 70 with an NPS Tier 1 account' },
      { label: 'Tier 2', value: 'No deduction for Tier 2 (except central government employees with 3-year lock-in)' },
    ],
    sections: [
      { type: 'heading', text: 'How it works', id: 'how-it-works' },
      {
        type: 'paragraph',
        text: 'The National Pension System gets three separate tax treatments under the Income-tax Act 1961, and most confusion comes from mixing them up. Section 80CCD(1) covers your own contribution and sits inside the ₹1.5 lakh cap shared with 80C. Section 80CCD(1B) gives an additional ₹50,000 for your own contribution, outside that cap. Section 80CCD(2) covers what your employer puts in, and is outside both.',
      },
      {
        type: 'paragraph',
        text: 'For a self-employed person or a salaried employee whose employer does not offer NPS, the practical rule is simple: the first ₹1.5 lakh of your own NPS contribution competes with PPF, EPF and ELSS under 80C, and the next ₹50,000 goes to 80CCD(1B). You can choose to route the first ₹50,000 to 80CCD(1B) and keep 80C for other instruments; the section does not fix the order.',
      },
      {
        type: 'paragraph',
        text: 'The employer route matters more from FY 2025-26 because it is the only meaningful deduction left under the new regime. Under section 80CCD(2), an employer contribution of up to 14% of basic plus dearness allowance is deductible under the new regime. Under the old regime the private sector cap is 10%, with 14% for central and state government employees. The contribution is first added to your salary and then deducted, so it appears in Form 16 both ways.',
      },
      {
        type: 'paragraph',
        text: 'What you get for the deduction is a retirement account with a long lock-in. NPS Tier 1 money stays until age 60, with partial withdrawals of up to 25% of your own contributions allowed after three years for specific purposes such as a child\'s education, a house or a medical emergency. At 60, up to 60% of the corpus can be taken tax-free and at least 40% must buy an annuity whose income is taxed at slab rates. That trade-off is why 80CCD(1B) suits people who are already saving for retirement, and suits a 28-year-old who may need the money for a house deposit less well.',
      },
      {
        type: 'table',
        head: ['Section', 'Who contributes', 'Limit FY 2025-26', 'Old regime', 'New regime'],
        rows: [
          ['80CCD(1)', 'You', 'Within the ₹1,50,000 80C cap; 10% of salary or 20% of gross income for self-employed', 'Yes', 'No'],
          ['80CCD(1B)', 'You', '₹50,000 extra', 'Yes', 'No'],
          ['80CCD(2)', 'Employer', '14% of basic plus DA (new regime), 10% private or 14% government (old regime)', 'Yes', 'Yes'],
        ],
        caption: 'NPS deductions under the Income-tax Act 1961 for FY 2025-26.',
      },
      {
        type: 'example',
        title: 'Salaried employee, basic plus DA ₹6,00,000, filing under the old regime',
        lines: [
          { label: 'EPF and PPF already claimed under 80C', value: '₹1,50,000' },
          { label: 'Own NPS contribution', value: '₹50,000' },
          { label: 'Deduction under 80CCD(1B)', value: '₹50,000', strong: true },
          { label: 'Employer NPS contribution (10% of ₹6,00,000)', value: '₹60,000' },
          { label: 'Deduction under 80CCD(2)', value: '₹60,000', strong: true },
          { label: 'Total NPS-related deduction', value: '₹1,10,000', strong: true },
          { label: 'Tax saved at 30% plus cess', value: '₹34,320' },
        ],
      },
      {
        type: 'callout',
        tone: 'info',
        title: 'The new-regime caveat',
        text: 'If you file under the new regime, 80CCD(1B) gives you nothing, but 80CCD(2) still does. Ask your employer to restructure part of your CTC as employer NPS contribution up to 14% of basic plus DA. It lowers taxable salary under either regime and is the one lever a new-regime filer still has. The common mistake in the other direction is contributing to NPS Tier 2 and claiming 80CCD(1B). Tier 2 is a voluntary savings account with no tax benefit for private taxpayers; only Tier 1 contributions qualify. And employer contributions above ₹7.5 lakh a year across EPF, NPS and superannuation together are taxable as a perquisite.',
      },
      {
        type: 'tool-card',
        calculatorSlug: 'take-home-salary',
        text: 'See how moving part of your CTC into employer NPS changes your monthly take-home and annual tax under each regime.',
      },
      { type: 'heading', text: 'What to do next', id: 'next-steps' },
      {
        type: 'paragraph',
        text: 'Download the Tier 1 transaction statement from the CRA portal (Protean or KFintech) for 1 April 2025 to 31 March 2026 and split it into your contribution and employer contribution. Report your own contribution against 80CCD(1) and 80CCD(1B) in Schedule VI-A, and the employer share against 80CCD(2). Check that the employer figure matches Form 16. If you have not yet contributed this year and are on the old regime, ₹50,000 into Tier 1 before 31 March saves up to ₹15,600 at the top slab. Contribute a few days early: the deduction is on the date the money is credited to the CRA, not the date you initiate the transfer, and a 31 March payment that lands on 2 April belongs to next year. If you do not have an account yet, an eNPS account opens online with PAN and Aadhaar in about ten minutes, and the first contribution can go through the same day.',
      },
    ],
    faqs: [
      {
        q: 'What is the maximum deduction under section 80CCD(1B)?',
        a: '₹50,000 per year for your own contribution to NPS Tier 1. This is over and above the ₹1,50,000 limit of section 80C, so total NPS-linked deductions for your own money can reach ₹2,00,000.',
      },
      {
        q: 'Is 80CCD(1B) available in the new tax regime?',
        a: 'No. Section 80CCD(1B) is available only under the old regime. Under the new regime, only the employer contribution under section 80CCD(2) is deductible.',
      },
      {
        q: 'How much employer NPS contribution is deductible under 80CCD(2)?',
        a: 'Up to 14% of basic plus DA under the new regime for all employees. Under the old regime the limit is 10% for private sector employees and 14% for central and state government employees. There is no rupee cap, but employer contributions to EPF, NPS and superannuation above ₹7,50,000 a year become taxable.',
      },
      {
        q: 'Can I claim 80CCD(1B) and 80C both for NPS?',
        a: 'Yes. The first ₹1,50,000 of your own contribution can be claimed under 80CCD(1) within the 80C cap, and the next ₹50,000 under 80CCD(1B). Most taxpayers fill 80C with EPF and PPF and use NPS only for the ₹50,000.',
      },
      {
        q: 'Does NPS Tier 2 get any tax deduction?',
        a: 'No, not for private sector taxpayers. Tier 2 is a savings account without a lock-in and without a deduction. Central government employees can claim Tier 2 under 80C with a 3-year lock-in.',
      },
      {
        q: 'Can a self-employed person claim 80CCD(1B)?',
        a: 'Yes. Any individual aged 18 to 70 with an NPS Tier 1 account can claim ₹50,000 under 80CCD(1B). For self-employed taxpayers, 80CCD(1) is limited to 20% of gross total income within the 80C cap.',
      },
      {
        q: 'Is NPS withdrawal taxable?',
        a: 'At 60, up to 60% of the corpus can be withdrawn tax-free. The remaining 40% must buy an annuity, and the annuity income is taxed at slab rates each year.',
      },
    ],
    group: 'Deductions',
    relatedServiceSlugs: ['itr-salaried', 'itr-freelancer'],
    relatedCalculatorSlugs: ['take-home-salary', 'income-tax'],
    relatedGuideSlugs: ['old-vs-new-tax-regime', 'itr-filing-guide-ay-2026-27'],
    relatedReferenceSlugs: ['80c', '80d', 'form-16'],
    datePublished: '2026-09-13',
    dateModified: '2026-09-13',
  },
  // ---------------------------------------------------------------- 24(b)
  {
    kind: 'section',
    slug: '24b',
    name: 'Section 24(b)',
    h1: 'Section 24(b) Home Loan Interest Deduction FY 2025-26: ₹2 Lakh Limit, Let-out and Pre-construction Rules',
    metaTitle: 'Section 24(b) Home Loan Interest FY 2025-26: ₹2L Limit',
    metaDescription:
      'Section 24(b) allows home loan interest up to ₹2,00,000 on a self-occupied house, old regime only. Let-out: no cap, loss set-off limited to ₹2 lakh. Example.',
    keywords: [
      'section 24b',
      'home loan interest deduction',
      'section 24(b) limit 2025-26',
      'home loan interest 2 lakh limit',
      'pre construction interest deduction',
      'home loan tax benefit new regime',
      'let out property home loan interest',
      'house property loss set off 2 lakh',
      'section 24 vs 80c home loan',
    ],
    summary:
      'Section 24(b) allows a deduction of up to ₹2,00,000 a year for interest on a home loan for a self-occupied house, under the old regime. For a let-out property there is no cap on the interest, but the loss from house property that can be set off against other income is limited to ₹2,00,000; the balance is carried forward for 8 years. Interest paid before construction is completed is claimed in 5 equal instalments starting the year of completion.',
    keyFacts: [
      { label: 'Self-occupied limit', value: '₹2,00,000 per year (₹30,000 if the loan is for repairs or taken before 1 April 1999)' },
      { label: 'Let-out property', value: 'No cap on interest; loss set-off against other income capped at ₹2,00,000' },
      { label: 'Pre-construction interest', value: 'Claimed in 5 equal instalments from the year construction is completed, within the ₹2 lakh cap for self-occupied' },
      { label: 'Regime', value: 'Old regime only for self-occupied. Let-out interest is allowed in both, but new regime cannot set off the loss' },
      { label: 'Condition for full ₹2 lakh', value: 'Construction completed within 5 years from the end of the FY in which the loan was taken' },
      { label: 'Who can claim', value: 'Owner or co-owner who is also borrower or co-borrower, in the ownership ratio' },
    ],
    sections: [
      { type: 'heading', text: 'How it works', id: 'how-it-works' },
      {
        type: 'paragraph',
        text: 'Interest on money borrowed to buy, build, repair or reconstruct a house is deductible from the income of that house under section 24(b) of the Income-tax Act 1961. Because a self-occupied house has nil annual value, the deduction creates a loss under the head house property, which you then set off against salary or business income. That is where the ₹2,00,000 limit bites.',
      },
      {
        type: 'paragraph',
        text: 'For a self-occupied house the interest deduction is capped at ₹2,00,000 a year if the loan was taken on or after 1 April 1999 for purchase or construction, and the construction was completed within five years from the end of the financial year in which the loan was taken. If the five-year condition fails, or the loan is for repairs, the cap drops to ₹30,000. You may treat up to two houses as self-occupied.',
      },
      {
        type: 'paragraph',
        text: 'For a let-out house the full interest is deductible against the rent, with no ceiling. But if that produces a loss, only ₹2,00,000 of the total house property loss can be set off against other heads in the same year. The excess is carried forward for eight assessment years and can only be set off against house property income in those years.',
      },
      {
        type: 'paragraph',
        text: 'Interest paid during the construction period, from the loan date to the 31 March before completion, is not lost. It is added up and allowed in five equal instalments starting from the year the construction is completed. For a self-occupied house each instalment counts within the same ₹2,00,000 cap, so a large pre-construction pool often goes partly unused. Two further points trip up first-time claimants. The deduction is on accrual, so interest due for March but debited in April still belongs to FY 2025-26, and the bank certificate is prepared on that basis. And a loan from a friend, relative or employer qualifies just as a bank loan does, provided you can show the money was borrowed for the house and obtain an interest certificate from the lender.',
      },
      {
        type: 'table',
        head: ['Property', 'Interest cap', 'Loss set-off against salary or business', 'Regime'],
        rows: [
          ['Self-occupied, loan after 1 April 1999, completed in 5 years', '₹2,00,000', 'Up to ₹2,00,000', 'Old only'],
          ['Self-occupied, repairs or 5-year condition failed', '₹30,000', 'Up to ₹30,000', 'Old only'],
          ['Let-out or deemed let-out', 'No cap', 'Up to ₹2,00,000, balance carried forward 8 years', 'Old: set-off allowed. New: interest allowed against rent but no set-off of the loss'],
          ['Pre-construction interest', '1/5th per year for 5 years', 'Within the applicable cap', 'As above'],
        ],
        caption: 'Section 24(b) treatment for FY 2025-26.',
      },
      {
        type: 'example',
        title: 'Self-occupied flat, home loan of ₹50 lakh, old regime',
        lines: [
          { label: 'Interest paid in FY 2025-26 (from bank certificate)', value: '₹3,60,000' },
          { label: 'Pre-construction interest (₹1,50,000 over 5 years)', value: '₹30,000' },
          { label: 'Total interest eligible', value: '₹3,90,000' },
          { label: 'Deduction under 24(b), capped', value: '₹2,00,000', strong: true },
          { label: 'Principal repaid, claimed under 80C', value: '₹1,10,000' },
          { label: 'Tax saved on 24(b) alone at 30% plus cess', value: '₹62,400', strong: true },
        ],
      },
      {
        type: 'callout',
        tone: 'warning',
        title: 'Common mistake: the new regime and house property loss',
        text: 'Under the new regime, interest on a self-occupied house is not deductible at all, and a loss from a let-out house cannot be set off against salary or carried forward. Many home buyers switch to the new regime for the lower slabs without noticing that they gave up ₹2 lakh of deduction. Compare both regimes with the interest certificate in hand before you choose.',
      },
      {
        type: 'tool-card',
        calculatorSlug: 'income-tax',
        text: 'Enter home loan interest and principal along with salary to see which regime leaves you with lower tax for FY 2025-26.',
      },
      { type: 'heading', text: 'What to do next', id: 'next-steps' },
      {
        type: 'paragraph',
        text: 'Download the provisional interest certificate from your lender for FY 2025-26. It splits the EMIs into interest and principal, which go to different places: interest to Schedule HP under section 24(b), principal to Schedule VI-A under 80C. If you and your spouse are co-owners and co-borrowers, each claims in the ownership ratio, which can double the family deduction to ₹4 lakh. If the house was completed this year, add up the interest from earlier years and start the five-instalment claim now. For a let-out house, enter the rent received, deduct municipal taxes paid and the 30% standard deduction, then the interest, and let the utility compute the loss and the ₹2 lakh set-off. Keep the possession letter or completion certificate, since the five-year condition and the pre-construction period both hinge on that date. An expert-assisted return handles the schedule and the carry-forward correctly.',
      },
    ],
    faqs: [
      {
        q: 'What is the maximum home loan interest deduction under section 24(b)?',
        a: '₹2,00,000 a year for a self-occupied house under the old regime. For a let-out house there is no cap on interest, but the house property loss that can be set off against other income is limited to ₹2,00,000.',
      },
      {
        q: 'Can I claim home loan interest in the new tax regime?',
        a: 'Not for a self-occupied house. For a let-out house, interest is allowed against the rent, but any resulting loss cannot be set off against salary or carried forward under the new regime.',
      },
      {
        q: 'How is pre-construction interest claimed?',
        a: 'Add up all interest paid from the loan date until the 31 March before the year of completion. Claim one-fifth of it each year for five years starting from the year construction is completed. For a self-occupied house it counts within the ₹2 lakh cap.',
      },
      {
        q: 'Can both husband and wife claim section 24(b) on the same home loan?',
        a: 'Yes, if both are co-owners and co-borrowers. Each can claim up to ₹2,00,000 on a self-occupied house in proportion to their ownership share, so a couple can claim up to ₹4,00,000 in total.',
      },
      {
        q: 'What happens to a house property loss above ₹2 lakh?',
        a: 'Under the old regime it is carried forward for eight assessment years and can be set off only against income from house property in those years. You must file the return by the due date to carry it forward.',
      },
      {
        q: 'Is the 5-year construction condition still relevant?',
        a: 'Yes. To claim the full ₹2,00,000 on a self-occupied house, construction or purchase must be completed within five years from the end of the financial year in which the loan was taken. Otherwise the cap is ₹30,000.',
      },
      {
        q: 'Are processing fees and prepayment charges deductible under 24(b)?',
        a: 'Processing fees and similar charges paid to obtain the loan are treated as interest under section 2(28A) and are deductible under 24(b) within the cap. Prepayment penalties are generally also treated as interest.',
      },
    ],
    group: 'Deductions',
    relatedServiceSlugs: ['itr-salaried-plus', 'itr-salaried'],
    relatedCalculatorSlugs: ['income-tax'],
    relatedGuideSlugs: ['old-vs-new-tax-regime', 'itr-filing-guide-ay-2026-27', 'which-itr-form-to-file'],
    relatedReferenceSlugs: ['80c', 'itr-2', 'form-16'],
    datePublished: '2026-09-13',
    dateModified: '2026-09-13',
  },
  // ---------------------------------------------------------------- 80TTA / 80TTB
  {
    kind: 'section',
    slug: '80tta-80ttb',
    name: 'Sections 80TTA and 80TTB',
    h1: 'Section 80TTA and 80TTB Deduction FY 2025-26: ₹10,000 Savings Interest, ₹50,000 for Senior Citizens',
    metaTitle: 'Section 80TTA and 80TTB FY 2025-26: Interest Deduction',
    metaDescription:
      'Section 80TTA allows ₹10,000 on savings interest for those below 60. Section 80TTB allows senior citizens ₹50,000 on savings, FD and RD interest. Old regime.',
    keywords: [
      'section 80tta',
      'section 80ttb',
      '80tta deduction limit',
      '80ttb senior citizen 50000',
      'savings account interest tax exemption',
      '80tta in new tax regime',
      'fd interest deduction for senior citizens',
      '80tta vs 80ttb difference',
      'interest income deduction 2025-26',
    ],
    summary:
      'Section 80TTA allows a deduction of up to ₹10,000 on interest from savings bank accounts for individuals and HUFs below 60. Section 80TTB replaces it for resident senior citizens aged 60 and above, allowing up to ₹50,000 on interest from savings accounts, fixed deposits and recurring deposits with banks, post offices and co-operative banks. Both are available only under the old regime.',
    keyFacts: [
      { label: 'Section 80TTA', value: '₹10,000 on savings account interest, taxpayers below 60' },
      { label: 'Section 80TTB', value: '₹50,000 on savings, FD and RD interest, resident senior citizens aged 60 and above' },
      { label: 'Regime', value: 'Old regime only' },
      { label: 'Covered institutions', value: 'Banks, post offices, co-operative banks. Not company FDs, bonds or NBFC deposits' },
      { label: 'Not covered', value: 'FD and RD interest for those below 60 (fully taxable)' },
      { label: 'Who cannot claim', value: 'NRIs cannot claim 80TTB; firms, LLPs and companies cannot claim either section' },
    ],
    sections: [
      { type: 'heading', text: 'How it works', id: 'how-it-works' },
      {
        type: 'paragraph',
        text: 'Interest on your savings account is taxable income under the head other sources, however small. Section 80TTA of the Income-tax Act 1961 softens this for taxpayers below 60 by allowing a deduction of up to ₹10,000 a year against savings account interest only. Fixed deposit and recurring deposit interest is not covered and remains fully taxable at your slab rate.',
      },
      {
        type: 'paragraph',
        text: 'Section 80TTB was introduced for resident senior citizens aged 60 or above. It is broader and larger: up to ₹50,000 a year on interest from savings accounts, fixed deposits and recurring deposits with banks, post offices and co-operative banks. A senior citizen claims 80TTB instead of 80TTA, never both.',
      },
      {
        type: 'paragraph',
        text: 'The deduction is a floor, not an exemption. You first add the full interest to your income, then deduct up to the limit in Schedule VI-A. If your savings interest is ₹6,000, the 80TTA deduction is ₹6,000, not ₹10,000. Banks deduct TDS on FD interest above ₹50,000 a year, or ₹1,00,000 for senior citizens, so a senior with only interest income below the exemption limit should submit Form 15H to stop the TDS rather than wait for a refund.',
      },
      {
        type: 'paragraph',
        text: 'The limit applies across all your accounts together, not per bank. Five savings accounts earning ₹4,000 each give ₹20,000 of interest and a deduction of ₹10,000, and the same is true of a senior citizen holding fixed deposits with three banks: the 80TTB cap is ₹50,000 in total. Interest on a joint account is taxed in the hands of the first holder unless the money is shown to belong to someone else. Post office savings account interest has a separate small exemption under section 10(15), ₹3,500 for a single account and ₹7,000 for a joint account, which is claimed before 80TTA and is available under both regimes. Interest on income tax refunds and on loans given to friends is taxable but is not deposit interest, so neither section covers it.',
      },
      {
        type: 'table',
        head: ['', 'Section 80TTA', 'Section 80TTB'],
        rows: [
          ['Who', 'Individuals and HUFs below 60, including NRIs', 'Resident individuals aged 60 or above'],
          ['Limit', '₹10,000', '₹50,000'],
          ['Interest covered', 'Savings account only', 'Savings, FD, RD and post office deposits'],
          ['Institutions', 'Banks, post office, co-operative banks', 'Banks, post office, co-operative banks'],
          ['Regime', 'Old only', 'Old only'],
          ['Can both be claimed', 'No', 'No'],
        ],
        caption: 'Sections 80TTA and 80TTB for FY 2025-26.',
      },
      {
        type: 'example',
        title: 'Retired teacher aged 66 with deposit income, old regime',
        lines: [
          { label: 'Savings account interest', value: '₹9,000' },
          { label: 'Bank FD interest', value: '₹2,40,000' },
          { label: 'Post office MIS interest', value: '₹36,000' },
          { label: 'Total interest income', value: '₹2,85,000' },
          { label: 'Deduction under 80TTB', value: '₹50,000', strong: true },
          { label: 'Taxable interest after 80TTB', value: '₹2,35,000', strong: true },
          { label: 'Tax saved at 20% slab plus cess', value: '₹10,400' },
        ],
      },
      {
        type: 'callout',
        tone: 'warning',
        title: 'Common mistake: claiming 80TTA on FD interest',
        text: 'Section 80TTA covers savings account interest only. Taxpayers below 60 often deduct ₹10,000 against FD interest and receive a 143(1) intimation adding it back. The AIS now reports savings and FD interest separately, so the mismatch is caught automatically. Under the new regime neither section is available, and interest is taxed in full. A related slip is leaving savings interest out of the return altogether because the bank did not deduct TDS on it; banks never deduct TDS on savings interest, but they do report it, and the AIS shows every rupee.',
      },
      {
        type: 'tool-card',
        calculatorSlug: 'income-tax',
        text: 'Add your interest income alongside pension or salary to see the tax under both regimes and whether the old regime with 80TTB still wins.',
      },
      { type: 'heading', text: 'What to do next', id: 'next-steps' },
      {
        type: 'paragraph',
        text: 'Pull the interest certificate from each bank and check it against the AIS on the e-filing portal, which lists every account and deposit reported against your PAN. Enter the gross interest under income from other sources, then claim 80TTA or 80TTB in Schedule VI-A; the ITR utility picks the right section from your date of birth. Seniors with total income below the exemption limit should file Form 15H with each bank in April so that no TDS is deducted through the year, and anyone whose TDS was deducted anyway should check that it appears in Form 26AS before claiming credit. For a senior citizen deciding between regimes, run the numbers both ways: 80TTB plus the ₹3 lakh senior exemption under the old regime often loses to the new regime\'s ₹4 lakh exemption and lower slabs once income crosses about ₹8 lakh. If your interest is large and spread across many banks, an expert-assisted return reconciles the AIS line by line.',
      },
    ],
    faqs: [
      {
        q: 'What is the 80TTA deduction limit for FY 2025-26?',
        a: '₹10,000 a year on interest from savings accounts with banks, post offices and co-operative banks, for individuals and HUFs below 60 filing under the old regime.',
      },
      {
        q: 'What is the 80TTB limit for senior citizens?',
        a: '₹50,000 a year on interest from savings accounts, fixed deposits and recurring deposits with banks, post offices and co-operative banks, for resident individuals aged 60 or above under the old regime.',
      },
      {
        q: 'Is FD interest covered under 80TTA?',
        a: 'No. Section 80TTA covers savings account interest only. FD and RD interest is fully taxable for taxpayers below 60. Only senior citizens get FD interest relief, through section 80TTB.',
      },
      {
        q: 'Can I claim 80TTA and 80TTB together?',
        a: 'No. A senior citizen eligible for 80TTB cannot claim 80TTA. Taxpayers below 60 can claim only 80TTA.',
      },
      {
        q: 'Are 80TTA and 80TTB available in the new tax regime?',
        a: 'No. Both deductions are available only under the old regime. Under the new regime all interest income is taxed at slab rates without any deduction.',
      },
      {
        q: 'Can an NRI claim section 80TTB?',
        a: 'No. Section 80TTB is only for resident senior citizens. An NRI can claim section 80TTA on savings account interest, including NRO savings interest, up to ₹10,000.',
      },
      {
        q: 'Is interest on a company fixed deposit or bonds covered?',
        a: 'No. Both sections cover deposits with banks, post offices and co-operative banks only. Interest from company deposits, NBFC deposits, bonds and debentures is fully taxable.',
      },
    ],
    group: 'Deductions',
    relatedServiceSlugs: ['itr-salaried', 'itr-salaried-plus'],
    relatedCalculatorSlugs: ['income-tax', 'tds'],
    relatedGuideSlugs: ['old-vs-new-tax-regime', 'itr-filing-guide-ay-2026-27'],
    relatedReferenceSlugs: ['form-15g-15h', 'ais', '80c'],
    datePublished: '2026-09-13',
    dateModified: '2026-09-13',
  },
  // ---------------------------------------------------------------- 87A
  {
    kind: 'section',
    slug: '87a',
    name: 'Section 87A',
    h1: 'Section 87A Rebate FY 2025-26: ₹60,000 Rebate up to ₹12 Lakh and Marginal Relief Explained',
    metaTitle: 'Section 87A Rebate FY 2025-26: ₹60,000 up to ₹12 Lakh',
    metaDescription:
      'Section 87A rebate FY 2025-26: up to ₹60,000 in the new regime if taxable income is ₹12 lakh or less, ₹12,500 up to ₹5 lakh in the old. Marginal relief example.',
    keywords: [
      'section 87a rebate',
      '87a rebate new regime 2025-26',
      'rebate under 87a 12 lakh',
      'marginal relief 87a',
      'zero tax up to 12 lakh',
      '87a rebate for nri',
      '87a rebate on capital gains',
      'rebate 87a old regime 5 lakh',
      'tax on 12.5 lakh salary new regime',
    ],
    summary:
      'Section 87A gives a rebate of up to ₹60,000 under the new regime for FY 2025-26 if your taxable income is ₹12,00,000 or less, which brings the tax to nil. Under the old regime the rebate is ₹12,500 if taxable income is ₹5,00,000 or less. Just above ₹12 lakh, marginal relief caps the tax at the amount by which income exceeds ₹12 lakh, so ₹12.10 lakh pays ₹10,400 including cess, not ₹63,960.',
    keyFacts: [
      { label: 'New regime rebate', value: 'Up to ₹60,000 if taxable income is ₹12,00,000 or less' },
      { label: 'Old regime rebate', value: 'Up to ₹12,500 if taxable income is ₹5,00,000 or less' },
      { label: 'Marginal relief', value: 'New regime only: tax cannot exceed income above ₹12,00,000' },
      { label: 'Zero-tax salary (new regime)', value: '₹12,75,000 gross, after ₹75,000 standard deduction' },
      { label: 'Who can claim', value: 'Resident individuals only. Not NRIs, HUFs, firms or companies' },
      { label: 'Income-tax Act 2025', value: 'Section 156 (reported)' },
    ],
    sections: [
      { type: 'heading', text: 'How it works', id: 'how-it-works' },
      {
        type: 'paragraph',
        text: 'Section 87A of the Income-tax Act 1961 is a rebate, not a deduction. A deduction reduces your income; a rebate reduces the tax computed on it. You first work out tax at slab rates on your total income, then subtract the rebate if your total income is within the threshold. The rebate is the lower of the tax computed and the ceiling.',
      },
      {
        type: 'paragraph',
        text: 'Under the new regime for FY 2025-26, the threshold is ₹12,00,000 of total income and the ceiling is ₹60,000. Tax on exactly ₹12 lakh at the new slabs is ₹60,000 (₹20,000 on 4 to 8 lakh, ₹40,000 on 8 to 12 lakh), so the rebate wipes it out. A salaried person gets there at ₹12,75,000 gross because of the ₹75,000 standard deduction. Under the old regime the threshold stays at ₹5,00,000 and the ceiling at ₹12,500.',
      },
      {
        type: 'paragraph',
        text: 'The rebate is all or nothing at the threshold. Earn ₹1 above ₹12 lakh and, without a safeguard, you would owe the full ₹60,000 plus. The new regime therefore includes marginal relief: where income exceeds ₹12 lakh, the tax payable cannot be more than the excess of income over ₹12 lakh. Cess is then added to whichever figure applies. The old regime has no marginal relief.',
      },
      {
        type: 'paragraph',
        text: 'The rebate applies to tax on ordinary income at slab rates. It does not reduce tax on long-term capital gains under section 112A on listed shares and equity funds, and by the department\'s position it also excludes short-term gains under section 111A in the new regime. So an income of ₹11 lakh salary plus ₹2 lakh of equity LTCG is not tax-free.',
      },
      {
        type: 'paragraph',
        text: 'For a salaried person the arithmetic is simple. Gross salary of ₹12,75,000 less the ₹75,000 standard deduction gives ₹12,00,000, which is exactly the threshold, so tax is nil. Add an employer NPS contribution under section 80CCD(2) and the zero-tax salary rises further, because that is the one deduction the new regime still allows. Pensioners get the same ₹75,000 standard deduction on pension. Under the old regime the sums are smaller but the deductions are wider: a gross salary of ₹5,50,000 reaches ₹5,00,000 after the ₹50,000 standard deduction, and each rupee of 80C, 80D or HRA exemption raises the zero-tax salary by the same rupee, which is why old-regime filers just above ₹5 lakh chase deductions in March.',
      },
      {
        type: 'table',
        head: ['', 'New regime', 'Old regime'],
        rows: [
          ['Income threshold', '₹12,00,000', '₹5,00,000'],
          ['Maximum rebate', '₹60,000', '₹12,500'],
          ['Marginal relief above threshold', 'Yes', 'No'],
          ['Standard deduction before threshold', '₹75,000', '₹50,000'],
          ['Zero-tax gross salary', '₹12,75,000', '₹5,50,000 (more with 80C, HRA and other deductions)'],
          ['Applies to 112A LTCG', 'No', 'No'],
        ],
        caption: 'Section 87A for FY 2025-26 (AY 2026-27).',
      },
      {
        type: 'example',
        title: 'Marginal relief: taxable income ₹12,10,000 under the new regime',
        lines: [
          { label: 'Tax on ₹4 lakh to ₹8 lakh at 5%', value: '₹20,000' },
          { label: 'Tax on ₹8 lakh to ₹12 lakh at 10%', value: '₹40,000' },
          { label: 'Tax on ₹12 lakh to ₹12.10 lakh at 15%', value: '₹1,500' },
          { label: 'Tax by slabs', value: '₹61,500' },
          { label: 'Income above ₹12 lakh', value: '₹10,000' },
          { label: 'Tax after marginal relief (lower of the two)', value: '₹10,000', strong: true },
          { label: 'Health and education cess at 4%', value: '₹400' },
          { label: 'Total tax payable', value: '₹10,400', strong: true },
        ],
      },
      {
        type: 'callout',
        tone: 'warning',
        title: 'Common mistake: assuming the ₹12 lakh limit is an exemption',
        text: 'The basic exemption under the new regime is ₹4 lakh, not ₹12 lakh. Between ₹4 lakh and ₹12 lakh, tax is computed and then cancelled by the rebate. This matters for three reasons: you still have to file a return if income exceeds ₹4 lakh, TDS still runs during the year on that basis, and once income crosses ₹12 lakh the rebate disappears entirely and marginal relief tapers off by roughly ₹12.71 lakh.',
      },
      {
        type: 'tool-card',
        calculatorSlug: 'income-tax',
        text: 'The calculator applies the 87A rebate and marginal relief automatically. Enter your income to see exactly where the tax starts.',
      },
      { type: 'heading', text: 'What to do next', id: 'next-steps' },
      {
        type: 'paragraph',
        text: 'If your total income is close to ₹12 lakh under the new regime, check whether any income you have missed, such as savings interest or a small dividend, pushes you over. If it does, marginal relief limits the damage, but an employer NPS contribution under section 80CCD(2) can pull you back under the line. If you are an NRI, do not claim the rebate; the return utility allows it in error and the intimation will reverse it with interest. Anyone with equity LTCG above ₹1.25 lakh should compute the tax on that slice separately, because the rebate will not cover it.',
      },
    ],
    faqs: [
      {
        q: 'What is the 87A rebate amount for FY 2025-26?',
        a: '₹60,000 under the new regime if total income does not exceed ₹12,00,000. ₹12,500 under the old regime if total income does not exceed ₹5,00,000. The rebate is limited to the tax actually computed.',
      },
      {
        q: 'Is income up to ₹12 lakh completely tax-free in the new regime?',
        a: 'Yes for ordinary income taxed at slab rates, because the ₹60,000 rebate equals the tax on ₹12 lakh. Long-term capital gains under section 112A and, per the department, short-term gains under section 111A are taxed separately and are not covered.',
      },
      {
        q: 'How does marginal relief under 87A work?',
        a: 'If income exceeds ₹12 lakh under the new regime, the tax cannot be more than the amount by which income exceeds ₹12 lakh. At ₹12,10,000 the slab tax is ₹61,500 but it is capped at ₹10,000, plus 4% cess, so ₹10,400. Relief runs out at roughly ₹12,71,000.',
      },
      {
        q: 'Can an NRI claim the rebate under section 87A?',
        a: 'No. Section 87A is available only to resident individuals. NRIs pay tax from the first rupee above the basic exemption of ₹4 lakh in the new regime or ₹2.5 lakh in the old regime.',
      },
      {
        q: 'Do senior citizens get a higher 87A rebate?',
        a: 'No. The rebate is the same for all resident individuals regardless of age. Senior citizens get a higher basic exemption only under the old regime (₹3 lakh, or ₹5 lakh above 80).',
      },
      {
        q: 'Is 87A rebate available on capital gains?',
        a: 'Not on long-term capital gains from listed equity under section 112A. Whether it applies to short-term gains under 111A in the new regime has been disputed; the department has denied it since AY 2024-25, and the safe position is to pay tax on such gains.',
      },
      {
        q: 'Do I still need to file ITR if my income is below ₹12 lakh?',
        a: 'Yes, if your gross total income exceeds the basic exemption limit of ₹4 lakh in the new regime or ₹2.5 lakh in the old regime, or if TDS was deducted and you want a refund. The rebate reduces tax to nil; it does not remove the filing obligation.',
      },
      {
        q: 'What is the new section number for 87A under the Income-tax Act 2025?',
        a: 'Secondary sources report the rebate as section 156 of the Income-tax Act 2025, applicable from tax year 2026-27. Verify against the notified Rules before relying on it.',
      },
    ],
    group: 'Exemptions and rebates',
    act2025: { newNumber: 'Section 156', status: 'reported', note: 'Reported in secondary sources; verify against the notified Rules.' },
    relatedServiceSlugs: ['itr-salaried'],
    relatedCalculatorSlugs: ['income-tax', 'take-home-salary'],
    relatedGuideSlugs: ['old-vs-new-tax-regime', 'itr-filing-guide-ay-2026-27', 'income-tax-act-2025-what-changes'],
    relatedReferenceSlugs: ['10-13a', 'itr-1', 'form-16'],
    datePublished: '2026-09-13',
    dateModified: '2026-09-13',
  },
  // ---------------------------------------------------------------- 10(13A)
  {
    kind: 'section',
    slug: '10-13a',
    name: 'Section 10(13A)',
    h1: 'Section 10(13A) HRA Exemption FY 2025-26: Formula, Metro Cities, Landlord PAN and Rent to Parents',
    metaTitle: 'Section 10(13A) HRA Exemption FY 2025-26: Formula',
    metaDescription:
      'Section 10(13A) exempts HRA as the least of: HRA received, rent minus 10% of basic plus DA, 50% metro or 40% of basic plus DA. Old regime only. PAN, 80GG.',
    keywords: [
      'section 10(13a)',
      'hra exemption formula',
      'hra exemption calculation 2025-26',
      'hra metro cities list',
      'landlord pan for hra above 1 lakh',
      'rent paid to parents hra',
      'hra in new tax regime',
      'section 80gg rent deduction',
      'hra exemption without rent receipts',
    ],
    summary:
      'Section 10(13A) exempts House Rent Allowance to the extent of the least of three amounts: actual HRA received, rent paid minus 10% of basic plus DA, and 50% of basic plus DA in Delhi, Mumbai, Kolkata or Chennai (40% elsewhere). The exemption is available only under the old regime and only if you actually pay rent. Landlord PAN is mandatory when annual rent exceeds ₹1,00,000.',
    keyFacts: [
      { label: 'Formula', value: 'Least of: HRA received; rent paid minus 10% of basic plus DA; 50% (metro) or 40% (non-metro) of basic plus DA' },
      { label: 'Metro cities', value: 'Delhi, Mumbai, Kolkata, Chennai. Every other city is 40%' },
      { label: 'Regime', value: 'Old regime only. Fully taxable under the new regime' },
      { label: 'Landlord PAN', value: 'Required if annual rent exceeds ₹1,00,000' },
      { label: 'TDS on rent', value: '2% under section 194-IB if monthly rent exceeds ₹50,000' },
      { label: 'No HRA in salary', value: 'Section 80GG: up to ₹60,000 a year, subject to conditions' },
    ],
    sections: [
      { type: 'heading', text: 'How it works', id: 'how-it-works' },
      {
        type: 'paragraph',
        text: 'House Rent Allowance is part of salary. Section 10(13A) of the Income-tax Act 1961, read with rule 2A, keeps a portion of it out of your taxable income if you live in rented accommodation and pay the rent yourself. The exemption is the least of three figures worked out for the period in which you paid rent, so a change in salary or city mid-year means computing it in parts.',
      },
      {
        type: 'paragraph',
        text: 'The three figures are: the HRA you actually received; rent paid minus 10% of basic salary plus dearness allowance; and 50% of basic plus DA if you live in Delhi, Mumbai, Kolkata or Chennai, or 40% anywhere else. Gurugram, Noida, Bengaluru, Hyderabad and Pune are 40% cities for this purpose, whatever their rents. Salary here means basic plus DA that counts for retirement benefits, plus commission as a fixed percentage of turnover.',
      },
      {
        type: 'paragraph',
        text: 'Paying rent to your parents is allowed if they own the house and the rent actually moves to their account. They must report it as house property income in their own return. Rent to a spouse is not accepted. If annual rent exceeds ₹1,00,000, give your employer the landlord\'s PAN, or a declaration if the landlord has none. If monthly rent exceeds ₹50,000, you must deduct 2% TDS under section 194-IB and file Form 26QC.',
      },
      {
        type: 'paragraph',
        text: 'Because the formula runs month by month, the exemption changes whenever any input changes. A salary hike in October, a move from Bengaluru to Mumbai in December, or two months with no rent because you stayed with family each produce a separate computation for that period. Employers usually do this in the payroll system once you upload the receipts. Rent receipts need the landlord\'s name, the address of the house, the month, the amount and a signature; a revenue stamp is needed only for cash payments above ₹5,000. Employees who own a house in another city can still claim HRA for the city where they work, and can claim home loan interest on the owned house at the same time.',
      },
      {
        type: 'table',
        head: ['City', 'Third limb of the formula'],
        rows: [
          ['Delhi, Mumbai, Kolkata, Chennai', '50% of basic plus DA'],
          ['Gurugram, Noida, Faridabad, Ghaziabad', '40% (not treated as part of Delhi)'],
          ['Bengaluru, Hyderabad, Pune, Ahmedabad, Chandigarh, Mohali, Panchkula', '40%'],
          ['Any other city or town', '40%'],
        ],
        caption: 'Only the four cities named in rule 2A get the 50% limb.',
      },
      {
        type: 'example',
        title: 'Employee in Chandigarh, old regime',
        lines: [
          { label: 'Basic plus DA', value: '₹6,00,000 a year' },
          { label: 'HRA received', value: '₹2,40,000' },
          { label: 'Rent paid (₹22,000 a month)', value: '₹2,64,000' },
          { label: 'Limb 1: HRA received', value: '₹2,40,000' },
          { label: 'Limb 2: rent minus 10% of basic plus DA (₹2,64,000 minus ₹60,000)', value: '₹2,04,000' },
          { label: 'Limb 3: 40% of basic plus DA (non-metro)', value: '₹2,40,000' },
          { label: 'HRA exempt (least of three)', value: '₹2,04,000', strong: true },
          { label: 'Taxable HRA', value: '₹36,000', strong: true },
        ],
      },
      {
        type: 'callout',
        tone: 'warning',
        title: 'Common mistake: claiming HRA under the new regime, or without paying rent',
        text: 'HRA is fully taxable under the new regime; there is no exemption to claim. Under the old regime, fake rent receipts are the most common item flagged in salary scrutiny. The AIS shows rent received by landlords whose PAN you quoted, and the department cross-checks. Pay by bank transfer, keep a rent agreement, and if the rent goes to a parent make sure they file.',
      },
      {
        type: 'tool-card',
        calculatorSlug: 'hra',
        text: 'Enter basic, DA, HRA and rent, pick your city, and see all three limbs so you know which one caps your exemption.',
      },
      { type: 'heading', text: 'What to do next', id: 'next-steps' },
      {
        type: 'paragraph',
        text: 'Submit rent receipts, the rent agreement and landlord PAN to your employer before the January or February proof deadline so that the exemption appears in Form 16 and TDS is lower through the year. If you missed the employer deadline, you can still claim the exemption in the return by reducing the taxable salary figure, but keep the proof. If your salary has no HRA component, claim section 80GG instead, up to ₹60,000 a year, provided neither you nor your spouse owns a house in the city where you work. Generate month-wise receipts with the rent receipt tool if your landlord does not issue them. If you paid rent above ₹50,000 a month at any point in the year, deduct 2% TDS once at the end of the tenancy or the year, deposit it through Form 26QC within 30 days, and give the landlord Form 16C; the department matches this against your HRA claim.',
      },
    ],
    faqs: [
      {
        q: 'How is HRA exemption calculated under section 10(13A)?',
        a: 'It is the least of three amounts: actual HRA received, rent paid minus 10% of basic plus DA, and 50% of basic plus DA in Delhi, Mumbai, Kolkata or Chennai (40% in other cities). Compute it for the months you actually paid rent.',
      },
      {
        q: 'Is HRA exempt under the new tax regime?',
        a: 'No. Under the new regime the whole HRA is taxable. The exemption under section 10(13A) is available only if you opt for the old regime.',
      },
      {
        q: 'Which cities are metro for HRA?',
        a: 'Only Delhi, Mumbai, Kolkata and Chennai qualify for the 50% limb. Gurugram, Noida, Bengaluru, Hyderabad, Pune and all other cities are 40%.',
      },
      {
        q: 'Can I pay rent to my parents and claim HRA?',
        a: 'Yes, if your parents own the house and you actually pay them, preferably by bank transfer. They must show the rent as income in their return. Rent to a spouse is not accepted.',
      },
      {
        q: 'When is landlord PAN mandatory for HRA?',
        a: 'When the annual rent exceeds ₹1,00,000. If the landlord does not have a PAN, a signed declaration with their name and address is required. Above ₹50,000 a month you must also deduct 2% TDS under section 194-IB.',
      },
      {
        q: 'Can I claim HRA if I did not submit rent receipts to my employer?',
        a: 'Yes. You can claim the exemption directly in your income tax return by reducing the taxable salary. Keep rent receipts, the agreement and bank proof, because the claim is not reflected in Form 16 and may be questioned.',
      },
      {
        q: 'What if my salary has no HRA component?',
        a: 'Claim section 80GG instead: the least of ₹5,000 a month, 25% of adjusted total income, or rent minus 10% of adjusted total income, capped at ₹60,000 a year. You, your spouse or minor child must not own a house in the city where you work, and you must file Form 10BA.',
      },
      {
        q: 'Can I claim both HRA exemption and home loan interest?',
        a: 'Yes, if you genuinely live in a rented house in a different place from the house you own, or the owned house is let out. Claiming both on the same city and same house invites scrutiny.',
      },
    ],
    group: 'Exemptions and rebates',
    relatedServiceSlugs: ['itr-salaried-plus', 'itr-salaried'],
    relatedCalculatorSlugs: ['hra', 'rent-receipt-generator'],
    relatedGuideSlugs: ['hra-exemption', 'old-vs-new-tax-regime', 'itr-filing-guide-ay-2026-27'],
    relatedReferenceSlugs: ['87a', 'form-16', '24b'],
    datePublished: '2026-09-13',
    dateModified: '2026-09-13',
  },
  // ---------------------------------------------------------------- 44AD
  {
    kind: 'section',
    slug: '44ad',
    name: 'Section 44AD',
    h1: 'Section 44AD Presumptive Taxation FY 2025-26: Turnover Limit, 6% and 8% Rates and the 5-Year Lock',
    metaTitle: 'Section 44AD Presumptive Tax FY 2025-26: Limits, Rates',
    metaDescription:
      'Section 44AD: businesses with turnover up to ₹2 crore, ₹3 crore if 95% digital, declare 8% as profit, 6% on digital receipts, no books or audit. 5-year lock.',
    keywords: [
      'section 44ad',
      '44ad presumptive taxation',
      '44ad turnover limit 2025-26',
      '44ad 6 percent 8 percent',
      '44ad 3 crore limit digital',
      'presumptive income scheme for small business',
      '44ad 5 year lock in rule',
      'itr 4 presumptive business',
      '44ad advance tax 15 march',
      'who is not eligible for 44ad',
    ],
    summary:
      'Section 44AD allows a resident individual, HUF or partnership firm with business turnover up to ₹2 crore, or ₹3 crore if at least 95% of receipts are digital, to declare profit at 8% of turnover (6% for amounts received digitally) without maintaining books of account or getting a tax audit. Once you opt out after using it, you cannot return for 5 years. Advance tax is paid in one instalment by 15 March.',
    keyFacts: [
      { label: 'Turnover limit', value: '₹2 crore, or ₹3 crore if cash receipts are 5% or less of total receipts' },
      { label: 'Presumptive rate', value: '8% of turnover; 6% on receipts by account payee cheque, bank transfer, UPI or card' },
      { label: 'Who can opt', value: 'Resident individuals, HUFs and partnership firms (not LLPs) carrying on an eligible business' },
      { label: 'Not eligible', value: 'Professionals under 44AA(1), commission or agency income, plying goods carriages (44AE), LLPs, companies' },
      { label: 'Opt-out lock', value: 'Leave the scheme and you cannot re-enter for 5 assessment years, with books and audit required if income exceeds the exemption limit' },
      { label: 'Advance tax', value: 'Single instalment of 100% by 15 March' },
    ],
    sections: [
      { type: 'heading', text: 'How it works', id: 'how-it-works' },
      {
        type: 'paragraph',
        text: 'Section 44AD of the Income-tax Act 1961 is a simplification scheme for small businesses. Instead of preparing a profit and loss account, you declare a fixed percentage of your turnover as profit and pay tax on that at your slab rates. The department accepts the presumed profit and does not ask for books, and the tax audit requirement under section 44AB does not apply as long as you stay within the turnover limit.',
      },
      {
        type: 'paragraph',
        text: 'The presumed rate is 8% of gross turnover or receipts. It drops to 6% for the portion received by account payee cheque, bank draft, electronic clearing, UPI, card or any other prescribed digital mode, provided the money is received during the year or before the return due date. Cash sales stay at 8%. You may declare a higher profit if you like, but you cannot declare lower without keeping books and getting an audit.',
      },
      {
        type: 'paragraph',
        text: 'The turnover ceiling is ₹2 crore. From FY 2023-24 it is ₹3 crore if cash receipts during the year are 5% or less of total receipts. The presumed profit is treated as the net figure: all expenses including depreciation and, for firms, partner salary and interest, are deemed already deducted. Deductions under Chapter VI-A such as 80C and 80D remain available under the old regime, and you can choose either regime.',
      },
      {
        type: 'paragraph',
        text: 'The scheme comes with a lock. If you use 44AD in a year and then declare profit below the presumed rate in any of the next five years, you lose the scheme for five assessment years from that year and must keep books and get audited if your income is above the exemption limit. Choose the scheme with a five-year view, not year by year. Partnership firms can use the scheme but LLPs cannot, and a firm on 44AD cannot deduct partner salary or interest separately, since the presumed profit already absorbs them.',
      },
      {
        type: 'table',
        head: ['Item', 'FY 2025-26 rule'],
        rows: [
          ['Eligible taxpayer', 'Resident individual, resident HUF, resident partnership firm (not LLP)'],
          ['Eligible business', 'Any business except goods carriage (44AE), agency or commission income, and professions listed in 44AA(1)'],
          ['Turnover limit', '₹2 crore; ₹3 crore if cash receipts are 5% or less'],
          ['Presumed profit', '8% of turnover; 6% on digital receipts'],
          ['Books of account', 'Not required'],
          ['Tax audit', 'Not required within the limit'],
          ['Return form', 'ITR-4 (Sugam); ITR-3 if you also have capital gains or more than one house property'],
          ['Advance tax', '100% by 15 March, interest under 234C only if missed'],
          ['Other deductions', 'Chapter VI-A allowed under the old regime; no separate expense claim'],
        ],
        caption: 'Section 44AD conditions for FY 2025-26.',
      },
      {
        type: 'example',
        title: 'Retail shop in Panchkula, turnover ₹1.20 crore, old regime',
        lines: [
          { label: 'Receipts through UPI, card and bank', value: '₹90,00,000' },
          { label: 'Cash receipts', value: '₹30,00,000' },
          { label: 'Presumed profit on digital receipts at 6%', value: '₹5,40,000' },
          { label: 'Presumed profit on cash receipts at 8%', value: '₹2,40,000' },
          { label: 'Business income under 44AD', value: '₹7,80,000', strong: true },
          { label: 'Less 80C investments', value: '₹1,50,000' },
          { label: 'Taxable income', value: '₹6,30,000' },
          { label: 'Tax including cess (old regime)', value: '₹40,040', strong: true },
        ],
      },
      {
        type: 'callout',
        tone: 'warning',
        title: 'Common mistake: treating 44AD as optional every year',
        text: 'Traders who show 8% one year and a lower actual profit the next, without an audit, trigger the five-year exclusion and a defective-return or audit notice. Equally, showing 8% when your real margin is 20% is legal but unnecessary if you have clean books; the section fixes the floor, not the ceiling. Decide based on your real margin and how long you expect to stay under ₹2 crore.',
      },
      {
        type: 'tool-card',
        calculatorSlug: 'advance-tax',
        text: 'Presumptive taxpayers pay advance tax once, by 15 March. Estimate the instalment from your expected turnover and see the 234C interest if you miss it.',
      },
      { type: 'heading', text: 'What to do next', id: 'next-steps' },
      {
        type: 'paragraph',
        text: 'Total your receipts for 1 April 2025 to 31 March 2026 from bank statements, UPI and card settlement reports and cash register, keeping the digital and cash figures separate because they carry different rates. Check that the GST turnover in GSTR-3B matches, since the AIS reports it. File ITR-4 by the non-audit due date. If turnover is likely to cross ₹2 crore, or you are a partner in an LLP, or you earn commission, the scheme does not apply and you will need books and possibly a tax audit signed by an empanelled Chartered Accountant. An expert-assisted business return checks eligibility before the form is chosen, and reconciles the ITR turnover with GST returns so that the two never disagree in the AIS.',
      },
    ],
    faqs: [
      {
        q: 'What is the turnover limit for section 44AD in FY 2025-26?',
        a: '₹2 crore. It rises to ₹3 crore if cash receipts during the year are not more than 5% of total receipts. Above the applicable limit you must keep books and, in most cases, get a tax audit.',
      },
      {
        q: 'What is the presumptive rate under 44AD?',
        a: '8% of gross turnover or receipts, reduced to 6% for the portion received through account payee cheque, bank transfer, UPI, card or other digital mode by the return due date. You can declare a higher profit but not a lower one without an audit.',
      },
      {
        q: 'Who cannot opt for section 44AD?',
        a: 'LLPs and companies, non-residents, professionals covered by section 44AA(1) such as doctors, lawyers and architects, anyone earning commission or brokerage, anyone in the goods carriage business under 44AE, and anyone who claimed deductions under sections 10A to 10BA or 80H to 80RRB.',
      },
      {
        q: 'What is the 5-year rule under 44AD?',
        a: 'If you opt for 44AD and then declare lower profit in any of the following five years, you cannot use the scheme for the next five assessment years. During that period you must keep books and get a tax audit if your income exceeds the basic exemption limit.',
      },
      {
        q: 'Is tax audit required under section 44AD?',
        a: 'No, as long as turnover is within the limit and you declare profit at 8% or 6% or higher. Audit becomes necessary if you declare lower profit and your total income exceeds the exemption limit, or if turnover crosses the limit.',
      },
      {
        q: 'When is advance tax due for 44AD taxpayers?',
        a: 'In one instalment of 100% by 15 March of the financial year, so 15 March 2026 for FY 2025-26. The four-instalment schedule does not apply. Interest under section 234C is charged only if the March instalment is short.',
      },
      {
        q: 'Which ITR form is used for 44AD?',
        a: 'ITR-4 (Sugam) for individuals, HUFs and firms with presumptive income, one house property and no capital gains. If you also have capital gains, foreign assets or more than one house property, use ITR-3 and report the presumptive income in Schedule BP.',
      },
      {
        q: 'Can I claim expenses or depreciation over the presumed 8%?',
        a: 'No. The presumed profit is deemed to be after all expenses and depreciation. Chapter VI-A deductions such as 80C, 80D and 80CCD(1B) are still available under the old regime because they are deducted from total income, not from business profit.',
      },
    ],
    group: 'Presumptive taxation',
    relatedServiceSlugs: ['itr-business', 'itr-freelancer'],
    relatedCalculatorSlugs: ['advance-tax', 'income-tax'],
    relatedGuideSlugs: ['which-itr-form-to-file', 'itr-filing-guide-ay-2026-27', 'gst-return-filing-guide'],
    relatedReferenceSlugs: ['44ada', 'itr-4', 'itr-3'],
    datePublished: '2026-09-13',
    dateModified: '2026-09-13',
  },
  // ---------------------------------------------------------------- 44ADA
  {
    kind: 'section',
    slug: '44ada',
    name: 'Section 44ADA',
    h1: 'Section 44ADA Presumptive Taxation for Professionals FY 2025-26: ₹50 Lakh Limit and the 50% Rule',
    metaTitle: 'Section 44ADA for Professionals FY 2025-26: 50% Rule',
    metaDescription:
      'Section 44ADA: professionals with receipts up to ₹50 lakh, ₹75 lakh if 95% digital, declare 50% as income, no books or audit. Eligible professions, F&O caveat.',
    keywords: [
      'section 44ada',
      '44ada presumptive taxation for professionals',
      '44ada limit 2025-26',
      '44ada 75 lakh limit',
      '44ada eligible professions list',
      'freelancer tax 44ada',
      '44ada 50 percent income',
      'itr 4 for freelancers',
      'is f&o eligible for 44ada',
      '44ada vs 44ad',
    ],
    summary:
      'Section 44ADA allows a resident individual or partnership firm in a specified profession with gross receipts up to ₹50 lakh, or ₹75 lakh if at least 95% of receipts are digital, to declare 50% of receipts as taxable income without maintaining books or getting a tax audit. It covers legal, medical, engineering, architecture, accountancy, technical consultancy, interior decoration, film artists, company secretaries and IT professionals. F&O trading is a business, not a profession, and is not eligible.',
    keyFacts: [
      { label: 'Receipts limit', value: '₹50 lakh; ₹75 lakh if cash receipts are 5% or less of total' },
      { label: 'Presumed income', value: '50% of gross receipts (higher if you choose)' },
      { label: 'Who can opt', value: 'Resident individuals and partnership firms (not LLPs) in a profession notified under section 44AA(1)' },
      { label: 'Books and audit', value: 'Not required within the limit' },
      { label: 'Advance tax', value: 'Single instalment of 100% by 15 March' },
      { label: 'Not eligible', value: 'F&O and intraday traders, commission agents, non-residents, LLPs, professions outside the 44AA(1) list' },
    ],
    sections: [
      { type: 'heading', text: 'How it works', id: 'how-it-works' },
      {
        type: 'paragraph',
        text: 'Section 44ADA of the Income-tax Act 1961 is the professional counterpart of section 44AD. If you are a freelancer, consultant or practitioner in one of the notified professions, you can declare half of your gross receipts as income and pay tax on that at slab rates. The other half is deemed to cover all your expenses, whether you actually spent it or not. No profit and loss account, no balance sheet, no tax audit.',
      },
      {
        type: 'paragraph',
        text: 'The receipts limit is ₹50 lakh in a financial year. From FY 2023-24 it is ₹75 lakh if cash receipts are not more than 5% of total receipts, which most freelancers paid by bank transfer or through platforms easily satisfy. Gross receipts means the fees you billed and received, before TDS. The TDS deducted by clients under section 194J at 10% is credited against your tax, so a 44ADA filer with modest income usually gets a refund.',
      },
      {
        type: 'paragraph',
        text: 'Eligibility depends on the profession, not the job title. Section 44AA(1) lists legal, medical, engineering, architectural, accountancy, technical consultancy and interior decoration, and the CBDT has notified film artists, authorised representatives, company secretaries and information technology professionals. Software developers, designers working on technical consultancy contracts and doctors qualify. A YouTuber, a trader in shares or a commission agent does not; they fall under section 44AD, if at all, or regular books.',
      },
      {
        type: 'paragraph',
        text: 'Unlike 44AD there is no five-year lock, but the audit rule still bites. If you declare income below 50% of receipts and your total income is above the basic exemption limit, you must keep books under section 44AA and get them audited under section 44AB, signed by an empanelled Chartered Accountant. Chapter VI-A deductions remain available under the old regime, and you can pick either regime each year. Receipts from abroad count the same as domestic receipts, so a developer billing US clients in dollars reports the rupee value received, and GST registration is a separate question decided by the ₹20 lakh threshold, not by 44ADA.',
      },
      {
        type: 'table',
        head: ['Profession', 'Source', 'Examples'],
        rows: [
          ['Legal', 'Section 44AA(1)', 'Advocates, legal consultants'],
          ['Medical', 'Section 44AA(1)', 'Doctors, dentists, physiotherapists in private practice'],
          ['Engineering', 'Section 44AA(1)', 'Consulting engineers, freelance structural or civil engineers'],
          ['Architecture', 'Section 44AA(1)', 'Architects, urban planners'],
          ['Accountancy', 'Section 44AA(1)', 'Cost accountants, chartered accountants in practice'],
          ['Technical consultancy', 'Section 44AA(1)', 'Software developers, IT consultants, data professionals'],
          ['Interior decoration', 'Section 44AA(1)', 'Interior designers'],
          ['Film artists', 'CBDT notification', 'Actors, directors, editors, music directors, singers'],
          ['Company secretary, authorised representative, IT professional', 'CBDT notification', 'Practising CS, tax representatives, information technology professionals'],
        ],
        caption: 'Professions eligible for section 44ADA in FY 2025-26. Everything else is a business.',
      },
      {
        type: 'example',
        title: 'Freelance software developer in Mohali, receipts ₹36 lakh, new regime',
        lines: [
          { label: 'Gross professional receipts (all by bank transfer)', value: '₹36,00,000' },
          { label: 'Presumed income at 50%', value: '₹18,00,000', strong: true },
          { label: 'Tax at new regime slabs on ₹18 lakh', value: '₹1,60,000' },
          { label: 'Cess at 4%', value: '₹6,400' },
          { label: 'Total tax', value: '₹1,66,400' },
          { label: 'TDS already deducted by clients under 194J at 10%', value: '₹3,60,000' },
          { label: 'Refund due', value: '₹1,93,600', strong: true },
        ],
      },
      {
        type: 'callout',
        tone: 'warning',
        title: 'Common mistake: F&O trading and 44ADA',
        text: 'Futures and options trading is a non-speculative business, not a profession. It cannot be reported under 44ADA, and 44AD applies only if turnover, computed from absolute profits and losses, is within ₹2 crore or ₹3 crore and you are willing to declare 6% of that turnover as profit. Most traders with real losses need books and ITR-3 instead. A second frequent error is a professional with a ₹60 lakh salary plus ₹20 lakh consulting income assuming 44ADA covers both; it covers only the professional receipts.',
      },
      {
        type: 'tool-card',
        calculatorSlug: 'advance-tax',
        text: 'A 44ADA filer pays advance tax once, by 15 March. Work out the amount after adjusting the TDS your clients have already deducted.',
      },
      { type: 'heading', text: 'What to do next', id: 'next-steps' },
      {
        type: 'paragraph',
        text: 'Total the fees received in FY 2025-26 from bank statements and match them with Form 26AS and the AIS, where every 194J deduction appears. Confirm the profession fits the 44AA(1) list. If your receipts crossed ₹50 lakh but cash was under 5%, you are still inside the ₹75 lakh limit. File ITR-4 if you have no capital gains and at most one house property, otherwise ITR-3 with the presumptive schedule. If you also registered for GST because receipts crossed ₹20 lakh, keep the GSTR-3B turnover consistent with the ITR figure. An expert-assisted freelancer return reconciles all three and confirms the profession fits the notified list before the presumptive schedule is used.',
      },
    ],
    faqs: [
      {
        q: 'What is the limit for section 44ADA in FY 2025-26?',
        a: 'Gross receipts of ₹50 lakh. The limit is ₹75 lakh if cash receipts are 5% or less of total receipts. Above that you must keep books and get a tax audit.',
      },
      {
        q: 'How much income is presumed under 44ADA?',
        a: '50% of gross receipts. You may declare more if your actual profit is higher. Declaring less requires books of account and, if income exceeds the exemption limit, a tax audit.',
      },
      {
        q: 'Which professions are eligible for 44ADA?',
        a: 'Legal, medical, engineering, architecture, accountancy, technical consultancy and interior decoration under section 44AA(1), plus film artists, authorised representatives, company secretaries and information technology professionals notified by the CBDT.',
      },
      {
        q: 'Can F&O traders use section 44ADA?',
        a: 'No. Trading in futures and options is a business, not a profession. It may fall under section 44AD if turnover is within the limit, but with real losses most traders file ITR-3 with books.',
      },
      {
        q: 'Can I claim expenses in addition to the 50% under 44ADA?',
        a: 'No. The 50% presumed income is after all expenses and depreciation. You can still claim Chapter VI-A deductions such as 80C, 80D and 80CCD(1B) under the old regime.',
      },
      {
        q: 'Is there a 5-year lock-in under 44ADA?',
        a: 'No. The five-year exclusion applies only to section 44AD. A professional can opt in or out of 44ADA year by year, but declaring below 50% in a year triggers books and audit for that year.',
      },
      {
        q: 'Can a freelancer with salary income also use 44ADA?',
        a: 'Yes. The presumptive scheme applies to the professional receipts. Salary is reported separately under the head salaries, and the two are added to arrive at total income. Use ITR-4 if there are no capital gains, otherwise ITR-3.',
      },
      {
        q: 'When is advance tax due under 44ADA?',
        a: 'In one instalment of 100% by 15 March of the financial year. Interest under section 234C applies only if that instalment is short. Deduct the TDS your clients have already deposited before computing the amount.',
      },
    ],
    group: 'Presumptive taxation',
    relatedServiceSlugs: ['itr-freelancer', 'itr-fno-trader'],
    relatedCalculatorSlugs: ['advance-tax', 'income-tax'],
    relatedGuideSlugs: ['which-itr-form-to-file', 'fno-trading-tax-guide', 'gst-registration-guide'],
    relatedReferenceSlugs: ['44ad', 'itr-4', 'form-26as'],
    datePublished: '2026-09-13',
    dateModified: '2026-09-13',
  },
  // ---------------------------------------------------------------- 54
  {
    kind: 'section',
    slug: '54',
    name: 'Section 54',
    h1: 'Section 54 Capital Gains Exemption FY 2025-26: Reinvesting House Sale Proceeds, 54F and 54EC Compared',
    metaTitle: 'Section 54 Exemption FY 2025-26: House Sale Reinvestment',
    metaDescription:
      'Section 54 exempts LTCG on sale of a house if reinvested in one house within 2 years, 3 to construct, capped at ₹10 crore. CGAS, 54F for other assets, 54EC.',
    keywords: [
      'section 54',
      'section 54 exemption capital gains',
      'capital gains on sale of house property',
      'section 54 vs 54f',
      '54ec bonds 50 lakh',
      'capital gains account scheme',
      'section 54 time limit 2 years 3 years',
      'section 54 10 crore cap',
      'reinvest property sale to save tax',
      'ltcg on property 12.5 percent',
    ],
    summary:
      'Section 54 exempts long-term capital gains from the sale of a residential house if you buy another residential house in India within 1 year before or 2 years after the sale, or construct one within 3 years. The exemption is the lower of the gain and the cost of the new house, capped at ₹10 crore. Unused gain must be parked in a Capital Gains Account Scheme deposit before the return due date. Section 54F does the same for other assets but requires the full net sale consideration to be reinvested, and section 54EC allows up to ₹50 lakh in specified bonds within 6 months.',
    keyFacts: [
      { label: 'Asset sold', value: 'Residential house held more than 24 months (long-term)' },
      { label: 'Reinvest in', value: 'One residential house in India (two houses once in a lifetime if gain is up to ₹2 crore)' },
      { label: 'Time limit', value: 'Purchase 1 year before or 2 years after the sale; construction within 3 years' },
      { label: 'Exemption', value: 'Lower of capital gain and cost of new house, maximum ₹10 crore' },
      { label: 'Unused amount', value: 'Deposit in Capital Gains Account Scheme before the ITR due date' },
      { label: 'Lock-in', value: 'New house must not be sold within 3 years, else the exemption is reversed' },
    ],
    sections: [
      { type: 'heading', text: 'How it works', id: 'how-it-works' },
      {
        type: 'paragraph',
        text: 'When you sell a residential house you have held for more than 24 months, the profit is a long-term capital gain taxed at 12.5% without indexation, or at 20% with indexation if you bought the property before 23 July 2024 and that works out lower. Section 54 of the Income-tax Act 1961 lets an individual or HUF avoid that tax entirely by putting the gain into another residential house.',
      },
      {
        type: 'paragraph',
        text: 'The window is generous but fixed. You can buy the new house up to one year before the sale or within two years after it, or complete construction within three years of the sale. The new house must be in India. The exemption equals the capital gain or the cost of the new house, whichever is lower, subject to a ceiling of ₹10 crore introduced from FY 2023-24. Only the gain needs reinvesting, not the whole sale price.',
      },
      {
        type: 'paragraph',
        text: 'If you have not spent the gain by the date your return is due, usually 31 July, deposit the unused amount in a Capital Gains Account Scheme (CGAS) account with an authorised bank and claim the exemption on that basis. Draw on it to buy or build within the time limit. Anything left unspent after three years is taxed as capital gain in that year. If you sell the new house within three years, the exemption you claimed reduces its cost, so the tax comes back.',
      },
      {
        type: 'paragraph',
        text: 'Section 54F covers the sale of any other long-term asset, such as land, gold or unlisted shares, when the proceeds go into a residential house. The difference is that 54F requires you to reinvest the entire net sale consideration, not just the gain, and you must not own more than one other residential house on the sale date. Section 54EC is the bond route: invest the gain, up to ₹50 lakh, in REC, PFC, IRFC or NHAI bonds within six months of the sale. The bonds are locked for five years and the interest is taxable.',
      },
      {
        type: 'table',
        head: ['', 'Section 54', 'Section 54F', 'Section 54EC'],
        rows: [
          ['Asset sold', 'Residential house', 'Any long-term asset other than a residential house', 'Land or building (any long-term)'],
          ['Reinvest in', 'Residential house in India', 'Residential house in India', 'REC, PFC, IRFC, NHAI bonds'],
          ['Amount to reinvest', 'Capital gain', 'Entire net sale consideration (proportionate exemption if less)', 'Capital gain'],
          ['Time limit', '1 year before, 2 years after; 3 years to construct', '1 year before, 2 years after; 3 years to construct', '6 months from sale'],
          ['Cap', '₹10 crore', '₹10 crore', '₹50 lakh per financial year'],
          ['Lock-in', '3 years', '3 years, and no second house purchase within 2 years', '5 years'],
          ['Who', 'Individual, HUF', 'Individual, HUF', 'Any taxpayer'],
        ],
        caption: 'Capital gains reinvestment exemptions for FY 2025-26.',
      },
      {
        type: 'example',
        title: 'Flat in Chandigarh bought in 2015 for ₹60 lakh, sold in FY 2025-26 for ₹1.50 crore',
        lines: [
          { label: 'Sale consideration', value: '₹1,50,00,000' },
          { label: 'Cost of acquisition', value: '₹60,00,000' },
          { label: 'Long-term capital gain (without indexation)', value: '₹90,00,000' },
          { label: 'Tax at 12.5% plus cess if nothing is reinvested', value: '₹11,70,000' },
          { label: 'New house purchased within 2 years', value: '₹1,10,00,000' },
          { label: 'Exemption under section 54 (lower of gain and cost)', value: '₹90,00,000', strong: true },
          { label: 'Taxable capital gain', value: 'Nil', strong: true },
        ],
      },
      {
        type: 'callout',
        tone: 'warning',
        title: 'Common mistake: missing the CGAS deadline',
        text: 'The most expensive error is holding the sale money in a savings account past the return due date while searching for a house. Once 31 July passes without a CGAS deposit, the exemption for the unspent portion is lost even if you buy a house the next month. Open the CGAS account in July, deposit the unused gain, and file the return claiming it. The second common error is under 54F: reinvesting only the gain from a plot sale and expecting full exemption. 54F needs the whole net consideration.',
      },
      {
        type: 'tool-card',
        calculatorSlug: 'capital-gains',
        text: 'Enter the purchase and sale details for the property to see the long-term gain under both the 12.5% and the indexed 20% options, and the tax you avoid by reinvesting.',
      },
      { type: 'heading', text: 'What to do next', id: 'next-steps' },
      {
        type: 'paragraph',
        text: 'Gather the purchase deed, the sale deed, brokerage and stamp duty receipts and proof of any improvement cost. If the buyer paid ₹50 lakh or more, check that the 1% TDS under section 194-IA appears in Form 26AS against your PAN. Decide before the return due date whether you will buy, build, or use bonds, and open a CGAS account for any gain you cannot deploy in time. Report the sale in Schedule CG of ITR-2 with the exemption in the section 54 row. Property gains, the choice between 12.5% and indexed 20%, and the CGAS mechanics are the area where an expert-assisted return earns its fee.',
      },
    ],
    faqs: [
      {
        q: 'What is the exemption under section 54?',
        a: 'Long-term capital gain from the sale of a residential house is exempt to the extent it is reinvested in one residential house in India, bought within 1 year before or 2 years after the sale or constructed within 3 years. The exemption is the lower of the gain and the cost of the new house, capped at ₹10 crore.',
      },
      {
        q: 'Do I have to reinvest the full sale price under section 54?',
        a: 'No. Under section 54 only the capital gain needs to be reinvested. Under section 54F, which covers assets other than a residential house, the entire net sale consideration must be reinvested for full exemption.',
      },
      {
        q: 'What is the Capital Gains Account Scheme?',
        a: 'A deposit account with an authorised bank where you park the unspent capital gain before the ITR due date, so the exemption is preserved while you find or build a house. Withdrawals must be used for the house within the 2 or 3 year limit; the balance after that is taxed.',
      },
      {
        q: 'Can I buy two houses under section 54?',
        a: 'Once in a lifetime, yes, if the long-term capital gain does not exceed ₹2 crore. Otherwise the exemption is for one residential house.',
      },
      {
        q: 'How much can I invest in 54EC bonds?',
        a: 'Up to ₹50 lakh in a financial year in bonds of REC, PFC, IRFC or NHAI, within six months of the sale. The bonds are locked in for 5 years and the interest is taxable at slab rates.',
      },
      {
        q: 'What happens if I sell the new house within 3 years?',
        a: 'The exemption claimed is deducted from the cost of the new house when computing its capital gain, so the earlier gain effectively becomes taxable in the year of the second sale, usually as a short-term gain at slab rates.',
      },
      {
        q: 'Is the rate on property LTCG 12.5% or 20% for FY 2025-26?',
        a: '12.5% without indexation. For property bought before 23 July 2024, resident individuals and HUFs can instead pay 20% with indexation if that gives a lower tax. Section 54 exemption applies under either computation.',
      },
      {
        q: 'Can an NRI claim section 54?',
        a: 'Yes. Sections 54, 54F and 54EC are available to NRIs for property in India, provided the new house is in India. The buyer deducts TDS at the full LTCG rate on the sale price, so an NRI should apply for a lower deduction certificate under section 197 before the sale.',
      },
    ],
    group: 'Capital gains',
    relatedServiceSlugs: ['itr-capital-gains', 'itr-nri'],
    relatedCalculatorSlugs: ['capital-gains'],
    relatedGuideSlugs: ['capital-gains-tax-guide', 'which-itr-form-to-file', 'itr-filing-guide-ay-2026-27'],
    relatedReferenceSlugs: ['itr-2', 'form-26qb', 'form-26as'],
    datePublished: '2026-09-13',
    dateModified: '2026-09-13',
  },
  // ---------------------------------------------------------------- 234F
  {
    kind: 'section',
    slug: '234f',
    name: 'Section 234F',
    h1: 'Section 234F Late Filing Fee AY 2026-27: ₹5,000 or ₹1,000, When It Applies and 234A Interest',
    metaTitle: 'Section 234F Late Fee AY 2026-27: ₹5,000 or ₹1,000',
    metaDescription:
      'Section 234F charges ₹5,000 for filing ITR after the due date, ₹1,000 if total income is up to ₹5 lakh, nil below the exemption limit. Plus 234A interest at 1%.',
    keywords: [
      'section 234f',
      '234f late fee',
      'late filing fee itr 5000',
      'itr late fee 1000 below 5 lakh',
      '234f fee for nil return',
      'penalty for late filing of itr ay 2026-27',
      'belated return late fee',
      '234a interest late filing',
      'itr after 31 july penalty',
      'is 234f applicable if no tax payable',
    ],
    summary:
      'Section 234F charges a late fee of ₹5,000 if you file your income tax return after the due date, reduced to ₹1,000 if your total income does not exceed ₹5,00,000. It applies to every belated return filed up to 31 December 2026 for AY 2026-27, even if no tax is due, but not if your gross total income is below the basic exemption limit and you were not otherwise required to file. Interest under section 234A at 1% a month on unpaid tax is charged in addition.',
    keyFacts: [
      { label: 'Fee if total income above ₹5 lakh', value: '₹5,000' },
      { label: 'Fee if total income up to ₹5 lakh', value: '₹1,000' },
      { label: 'Fee if income below the exemption limit', value: 'Nil, unless filing was compulsory for another reason' },
      { label: 'Due date AY 2026-27 (non-audit)', value: '31 July 2026; belated return allowed until 31 December 2026' },
      { label: 'Interest under 234A', value: '1% per month or part of a month on unpaid tax from 1 August 2026' },
      { label: 'Paid how', value: 'Before filing, as self-assessment tax under the fee head in Challan 280' },
    ],
    sections: [
      { type: 'heading', text: 'How it works', id: 'how-it-works' },
      {
        type: 'paragraph',
        text: 'Section 234F of the Income-tax Act 1961 is a fixed fee, not a discretionary penalty. If you are required to file a return under section 139(1) and you file after the due date, the fee is charged automatically when you file and again confirmed in the 143(1) intimation. There is no notice, no hearing and no waiver application. The return utility will not let you submit without it.',
      },
      {
        type: 'paragraph',
        text: 'The amount depends on total income. If total income after deductions exceeds ₹5,00,000, the fee is ₹5,000. If it is ₹5,00,000 or below, the fee is ₹1,000. For AY 2026-27 the due date for salaried and non-audit taxpayers is 31 July 2026, and a belated return under section 139(4) can be filed until 31 December 2026. The same fee applies whether you file on 1 August or 31 December; it does not grow with delay.',
      },
      {
        type: 'paragraph',
        text: 'The fee applies only if you were required to file. A person whose gross total income, before Chapter VI-A deductions and before capital gains exemptions, is below the basic exemption limit (₹4 lakh new regime, ₹2.5 lakh old regime, higher for seniors) files voluntarily and pays no fee. But the seventh proviso to section 139(1) makes filing compulsory in other cases, such as foreign travel spend above ₹2 lakh, electricity bills above ₹1 lakh, or bank deposits above ₹1 crore, and then 234F applies even at nil income.',
      },
      {
        type: 'paragraph',
        text: 'Interest is separate. Section 234A charges 1% per month or part of a month on the tax still unpaid after the due date, from 1 August 2026 until the date you file. If all your tax was already covered by TDS or advance tax, 234A is nil but 234F is still payable. Section 234B and 234C interest for short advance tax runs on its own timeline and is unaffected by when you file.',
      },
      {
        type: 'table',
        head: ['Situation', 'Section 234F fee', 'Section 234A interest'],
        rows: [
          ['Filed by 31 July 2026', 'Nil', 'Nil'],
          ['Belated, total income above ₹5 lakh', '₹5,000', '1% per month on unpaid tax'],
          ['Belated, total income up to ₹5 lakh', '₹1,000', '1% per month on unpaid tax'],
          ['Belated, gross total income below exemption limit, no compulsory filing trigger', 'Nil', 'Nil'],
          ['Belated, all tax already paid through TDS, refund due', '₹5,000 or ₹1,000', 'Nil'],
          ['Revised return filed after an on-time original', 'Nil', 'Nil'],
          ['Updated return (ITR-U) after 31 December', '₹5,000 or ₹1,000 plus 60% to 70% additional tax', '1% per month'],
        ],
        caption: 'Late filing consequences for AY 2026-27.',
      },
      {
        type: 'example',
        title: 'Salaried taxpayer files on 20 October 2026 with ₹18,000 tax still unpaid',
        lines: [
          { label: 'Total income', value: '₹9,40,000' },
          { label: 'Late fee under 234F (income above ₹5 lakh)', value: '₹5,000', strong: true },
          { label: 'Tax unpaid after TDS', value: '₹18,000' },
          { label: 'Months late (August, September, October, part months count in full)', value: '3' },
          { label: 'Interest under 234A at 1% per month', value: '₹540' },
          { label: 'Total extra cost of filing late', value: '₹5,540', strong: true },
        ],
      },
      {
        type: 'callout',
        tone: 'warning',
        title: 'The cost that is bigger than the fee',
        text: 'A belated return cannot carry forward most losses. Capital losses, business losses and F&O losses from FY 2025-26 are lost for future set-off if the return is filed after 31 July 2026. House property loss is the exception. For a trader with a ₹5 lakh F&O loss, the real cost of filing late is the future tax on ₹5 lakh, not the ₹5,000 fee. You also cannot choose the old regime in a belated return; the new regime applies by default.',
      },
      {
        type: 'tool-card',
        calculatorSlug: 'income-tax',
        text: 'Work out your total income first. Whether it lands above or below ₹5 lakh decides whether the fee is ₹5,000 or ₹1,000.',
      },
      { type: 'heading', text: 'What to do next', id: 'next-steps' },
      {
        type: 'paragraph',
        text: 'If the due date has passed, file now rather than waiting until December; the fee is the same but the 234A interest keeps running. Pay the fee and any tax through Challan 280 as self-assessment tax before submitting, entering the fee in the fee field so that the challan matches the return. E-verify within 30 days, or the return is treated as not filed and the fee is wasted. If you missed 31 December as well, the only route is an updated return under section 139(8A), with additional tax on top. A belated or revised return through an expert-assisted service takes a day and includes the interest computation. If you have a genuine reason for the delay and a refund at stake, a condonation application under section 119(2)(b) can allow a return beyond the belated window, but it is discretionary and slow, so do not plan around it.',
      },
    ],
    faqs: [
      {
        q: 'What is the late fee under section 234F for AY 2026-27?',
        a: '₹5,000 if total income exceeds ₹5,00,000, and ₹1,000 if total income is ₹5,00,000 or less. It applies to returns filed after 31 July 2026 (non-audit cases) up to 31 December 2026.',
      },
      {
        q: 'Is 234F applicable if my income is below the taxable limit?',
        a: 'No, if your gross total income is below the basic exemption limit and you were not otherwise required to file. If filing was compulsory because of high-value transactions or foreign assets, the fee applies even with nil tax.',
      },
      {
        q: 'Do I have to pay 234F if I have a refund due?',
        a: 'Yes. The fee depends on when you file, not on whether tax is payable. The department adjusts the fee against the refund in the 143(1) intimation.',
      },
      {
        q: 'Does the 234F fee increase the later I file?',
        a: 'No. It is a flat ₹5,000 or ₹1,000 for any belated return filed up to 31 December. What increases is 234A interest at 1% a month on unpaid tax, and after 31 December an updated return carries additional tax of 60% or 70% of the tax due.',
      },
      {
        q: 'Is 234F charged on a revised return?',
        a: 'No, if the original return was filed by the due date. A revised return corrects an on-time return and carries no fee. If the original itself was belated, the fee was already paid on it.',
      },
      {
        q: 'Can the 234F fee be waived?',
        a: 'No. It is charged under the Act with no discretion given to the assessing officer. CBDT sometimes extends the due date itself, which removes the fee for everyone who files within the extended date.',
      },
      {
        q: 'How is section 234A interest calculated?',
        a: '1% simple interest per month or part of a month on the tax unpaid after the due date, from 1 August 2026 to the date of filing. If TDS and advance tax already cover your liability, 234A is nil.',
      },
      {
        q: 'Which losses can be carried forward in a belated return?',
        a: 'Only loss from house property and unabsorbed depreciation. Capital losses, business losses, speculation losses and F&O losses cannot be carried forward if the return is filed after the due date under section 139(1).',
      },
    ],
    group: 'Compliance',
    relatedServiceSlugs: ['itr-belated', 'itr-updated'],
    relatedCalculatorSlugs: ['income-tax', 'advance-tax'],
    relatedGuideSlugs: ['belated-revised-updated-return', 'itr-filing-guide-ay-2026-27', 'fno-trading-tax-guide'],
    relatedReferenceSlugs: ['143-1', 'itr-1', 'form-26as'],
    datePublished: '2026-09-13',
    dateModified: '2026-09-13',
  },
  // ---------------------------------------------------------------- 143(1)
  {
    kind: 'section',
    slug: '143-1',
    name: 'Section 143(1)',
    h1: 'Section 143(1) Intimation AY 2026-27: What It Means, 30-Day Response and Rectification',
    metaTitle: 'Section 143(1) Intimation AY 2026-27: Meaning, Reply',
    metaDescription:
      'A section 143(1) intimation is the automated result of processing your ITR: refund, demand or no change. Reply to an adjustment in 30 days, or rectify u/s 154.',
    keywords: [
      'section 143(1)',
      'intimation under section 143(1)',
      '143(1) intimation meaning',
      '143(1) demand notice what to do',
      'how to respond to 143(1) intimation',
      'rectification under section 154',
      '143(1)(a) proposed adjustment',
      'ais 26as mismatch intimation',
      'intimation 143(1) password',
      '143(1) refund processed',
    ],
    summary:
      'An intimation under section 143(1) is the computer-generated result of the Centralised Processing Centre checking your return against Form 26AS, AIS and arithmetic. It shows one of three outcomes: refund, demand, or no change. A proposed adjustment under 143(1)(a) must be answered on the e-filing portal within 30 days or it is applied automatically. A demand must be paid or disputed within 30 days; mistakes are fixed through rectification under section 154.',
    keyFacts: [
      { label: 'What it is', value: 'Automated processing result, not a scrutiny notice' },
      { label: 'Time limit for issue', value: 'Within 9 months from the end of the FY in which the return is filed' },
      { label: 'Response to 143(1)(a) proposed adjustment', value: '30 days on the e-filing portal, else applied as proposed' },
      { label: 'Demand', value: 'Pay within 30 days to avoid interest under section 220(2) at 1% a month' },
      { label: 'Fix a mistake', value: 'Rectification under section 154 within 4 years, on the portal' },
      { label: 'PDF password', value: 'PAN in lower case followed by date of birth as DDMMYYYY' },
    ],
    sections: [
      { type: 'heading', text: 'How it works', id: 'how-it-works' },
      {
        type: 'paragraph',
        text: 'After you e-verify your return, the Centralised Processing Centre in Bengaluru runs it through automated checks under section 143(1) of the Income-tax Act 1961. It recomputes the tax from the figures you entered, corrects arithmetic errors, matches TDS and advance tax claims against Form 26AS, compares income with the AIS, and disallows claims that are plainly inconsistent with the return itself, such as a deduction above the statutory limit or a loss carried forward from a belated return.',
      },
      {
        type: 'paragraph',
        text: 'If the system wants to adjust something, it first sends a communication under section 143(1)(a) listing the proposed adjustment. You have 30 days to agree or disagree on the e-filing portal under e-Proceedings, with a reason and supporting documents. If you do not respond, the adjustment is made as proposed and the intimation follows. If you respond and the reason is accepted, the adjustment is dropped.',
      },
      {
        type: 'paragraph',
        text: 'The intimation itself is a password-protected PDF sent by email and available under View Filed Returns on the portal. It has two columns: as provided by the taxpayer and as computed under section 143(1). Where the columns match, the result is no demand and no refund, or a refund that is released to your pre-validated bank account. Where they differ, the last line shows a demand or a reduced refund with the reason coded in the annexure.',
      },
      {
        type: 'paragraph',
        text: 'An intimation with a demand is a determination of tax due. It becomes enforceable if you do nothing for 30 days: interest under section 220(2) runs at 1% a month, and future refunds are adjusted against it under section 245. If the demand is wrong, do not pay and forget it. File a rectification under section 154 if the error is apparent from the record, or respond to the outstanding demand on the portal as disagree with reasons, or file an appeal to CIT(A) within 30 days if the issue is one of interpretation.',
      },
      {
        type: 'table',
        head: ['What the intimation says', 'Usual cause', 'Fix'],
        rows: [
          ['TDS credit reduced', 'Deductor filed the TDS return late or with a wrong PAN, so 26AS does not show it', 'Get the deductor to correct their statement, then file rectification under 154 for tax credit mismatch'],
          ['Income added', 'Interest, dividend or sale reported in AIS but omitted in the return', 'If correct, pay the demand. If duplicate or wrong, submit AIS feedback and respond disagree with proof'],
          ['Deduction disallowed', '80C or 80D claimed above the limit, or 80TTA claimed on FD interest', 'Accept if the limit was exceeded; otherwise rectify with the schedule corrected'],
          ['Loss not carried forward', 'Return filed after the due date', 'No remedy except house property loss; file on time next year'],
          ['Late fee added', 'Return filed after 31 July without paying 234F', 'Pay the demand'],
          ['Regime changed', 'Form 10-IEA not filed with a belated return, or old regime chosen in ITR-3 or 4 without 10-IEA', 'File 10-IEA where allowed; otherwise the new regime applies'],
          ['Refund adjusted', 'Old demand from an earlier year set off under section 245', 'Check the outstanding demand tab; respond if the old demand is wrong'],
        ],
        caption: 'Typical 143(1) adjustments for AY 2026-27.',
      },
      {
        type: 'example',
        title: 'Salaried taxpayer receives an intimation with a demand of ₹5,320',
        lines: [
          { label: 'Tax as per return (after TDS of ₹1,10,000)', value: 'Refund ₹4,000' },
          { label: 'Adjustment 1: FD interest of ₹32,000 in AIS not reported', value: '+₹32,000 income' },
          { label: 'Adjustment 2: 80TTA of ₹10,000 claimed on FD interest, disallowed', value: '+₹10,000 income' },
          { label: 'Additional tax at 20% plus cess on ₹42,000', value: '₹8,736' },
          { label: 'Interest under 234B and 234C', value: '₹584' },
          { label: 'Net result after cancelling the ₹4,000 refund', value: 'Demand ₹5,320', strong: true },
          { label: 'Action', value: 'Both adjustments are correct: pay within 30 days via Challan 280, minor head 400', strong: true },
        ],
      },
      {
        type: 'callout',
        tone: 'warning',
        title: 'Common mistake: treating a 143(1) intimation as a scrutiny notice, or ignoring it',
        text: 'An intimation is not a notice under section 143(2) and does not mean your case is under scrutiny. Ignoring it is the opposite error. A 143(1)(a) proposal that goes unanswered for 30 days becomes a demand, and a demand that sits for 30 days starts accruing interest and blocks future refunds. Read the annexure, match it against your AIS and 26AS, and act within the window.',
      },
      { type: 'heading', text: 'What to do next', id: 'next-steps' },
      {
        type: 'paragraph',
        text: 'Open the intimation with your PAN in lower case plus date of birth as the password and go straight to the comparison table. If the computed column matches yours, nothing is needed; the refund will follow. If there is a proposed adjustment, log in to the portal, open e-Proceedings, and respond within 30 days with the reason and documents. If there is a demand you agree with, pay it through Challan 280 under minor head 400 and mark it paid under Response to Outstanding Demand. If you disagree, file a rectification under section 154 with the right reason code. A 143(1) reply service handles the response and the rectification in one go.',
      },
    ],
    faqs: [
      {
        q: 'What is an intimation under section 143(1)?',
        a: 'It is the automated result of the Centralised Processing Centre processing your income tax return. It compares your figures with its own computation and shows a refund, a demand, or no change. It is not a scrutiny notice.',
      },
      {
        q: 'How many days do I have to respond to a 143(1)(a) communication?',
        a: '30 days from the date of the communication. If you do not respond on the e-filing portal, the proposed adjustment is applied and the intimation is issued with the revised figures.',
      },
      {
        q: 'What should I do if the 143(1) intimation shows a demand?',
        a: 'Check the annexure for the reason. If it is correct, pay within 30 days through Challan 280 (minor head 400) and update the outstanding demand response. If it is wrong, file a rectification under section 154 or respond disagree with reasons on the portal.',
      },
      {
        q: 'What is the password for the 143(1) intimation PDF?',
        a: 'Your PAN in lower case followed by your date of birth in DDMMYYYY format, without spaces. For example abcde1234f15081990.',
      },
      {
        q: 'What is the time limit for issuing a 143(1) intimation?',
        a: 'Nine months from the end of the financial year in which the return is filed. For a return filed in FY 2026-27, the intimation must be issued by 31 December 2027. If no intimation arrives, the acknowledgement is treated as the intimation.',
      },
      {
        q: 'What is rectification under section 154?',
        a: 'A request to correct a mistake apparent from the record in the intimation, such as a TDS credit not given, a wrong tax computation or a missed schedule. It is filed on the e-filing portal under Services, Rectification, within four years from the end of the FY in which the order was passed.',
      },
      {
        q: 'Why does the intimation show a lower TDS credit than my Form 16?',
        a: 'Because the credit is given only for TDS that appears in Form 26AS. If your employer or bank filed the TDS return late or with an error, ask them to file a correction statement, then file a rectification for tax credit mismatch once 26AS is updated.',
      },
      {
        q: 'Can I file a revised return after receiving a 143(1) intimation?',
        a: 'Yes, up to 31 December 2026 for AY 2026-27, because processing does not end the revision window. Use a revised return if you left out income or need to change a claim, and rectification if the department made a mistake.',
      },
    ],
    group: 'Compliance',
    relatedServiceSlugs: ['notice-143-1', 'itr-belated'],
    relatedCalculatorSlugs: ['income-tax', 'tds'],
    relatedGuideSlugs: ['income-tax-notices-explained', 'belated-revised-updated-return', 'itr-filing-guide-ay-2026-27'],
    relatedReferenceSlugs: ['ais', 'form-26as', '234f'],
    datePublished: '2026-09-13',
    dateModified: '2026-09-13',
  },
]

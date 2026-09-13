import type { Guide } from '../types'

// Highest-volume query in the whole keyword universe ("income tax slab
// 2025-26" and its variants). Every figure below is derived from
// app/lib/tax/rules/fy2025-26.ts and checked against the compute functions;
// if a slab changes, change the rules file first and then this page.
export const guide: Guide = {
  slug: 'income-tax-slabs-fy-2025-26',
  cluster: 'tax-saving',
  title: 'Income Tax Slabs FY 2025-26 (AY 2026-27): New and Old Regime Rates',
  h1: 'Income Tax Slabs FY 2025-26 (AY 2026-27): New Regime and Old Regime Rates',
  metaTitle: 'Income Tax Slabs FY 2025-26 (AY 2026-27): New and Old Rates',
  metaDescription:
    'Income tax slab rates for FY 2025-26 under the new and old regime, with the 87A rebate, standard deduction, surcharge, cess and worked examples at ₹7L, ₹12.75L, ₹15L and ₹25L.',
  keywords: [
    'income tax slab 2025-26',
    'income tax slabs fy 2025-26',
    'new tax regime slab rates',
    'old tax regime slabs',
    'income tax slab ay 2026-27',
    'income tax slab for senior citizens',
    'tax free income limit 2025-26',
    'income tax rates india 2025',
    'new regime vs old regime slabs',
    '87a rebate 12 lakh',
  ],
  excerpt:
    'Under the new regime, income is taxed in seven slabs from nil to 30%, and the section 87A rebate makes salary up to ₹12.75 lakh tax-free. The old regime keeps its four slabs and full deductions. Every rate, with worked examples.',
  datePublished: '2026-09-13',
  dateModified: '2026-09-13',
  readMinutes: 11,
  relatedServiceSlug: 'itr-salaried',
  relatedGuides: ['old-vs-new-tax-regime', 'hra-exemption', 'itr-filing-guide-ay-2026-27'],
  relatedCalculators: ['income-tax', 'take-home-salary'],
  sections: [
    {
      type: 'key-takeaways',
      items: [
        'New regime, FY 2025-26: nil up to ₹4 lakh, then 5%, 10%, 15%, 20%, 25% and 30% in ₹4 lakh steps, with 30% starting above ₹24 lakh.',
        'The section 87A rebate under the new regime is ₹60,000 for taxable income up to ₹12 lakh. With the ₹75,000 standard deduction, a salary of ₹12.75 lakh pays nothing.',
        'Old regime slabs are unchanged: nil to ₹2.5 lakh, 5% to ₹5 lakh, 20% to ₹10 lakh, 30% above. Senior citizens get a higher nil band only under the old regime.',
        'Health and education cess of 4% applies on the tax in both regimes. Surcharge starts above ₹50 lakh.',
      ],
    },
    {
      type: 'stat-grid',
      stats: [
        { label: 'Tax-free salary, new regime', value: '₹12.75 lakh', note: '₹12 lakh taxable after ₹75,000 standard deduction' },
        { label: 'Top slab begins', value: '₹24 lakh', note: '30% in the new regime, ₹10 lakh in the old' },
        { label: 'Standard deduction', value: '₹75,000', note: '₹50,000 in the old regime' },
        { label: 'Cess', value: '4%', note: 'on tax plus surcharge, both regimes' },
      ],
    },
    { type: 'tool-card', calculatorSlug: 'income-tax', text: 'See your tax under both regimes side by side, with the rebate and cess applied.' },

    { type: 'heading', id: 'new-regime-slabs', text: 'New regime slabs for FY 2025-26' },
    {
      type: 'paragraph',
      text: 'The new regime under section 115BAC is the default. Budget 2025 rewrote its slabs and these are the rates for income earned between 1 April 2025 and 31 March 2026, which you report in AY 2026-27. The same slabs apply to everyone regardless of age.',
    },
    {
      type: 'table',
      caption: 'New regime, FY 2025-26 (AY 2026-27). Taxable income after the standard deduction.',
      head: ['Taxable income', 'Rate', 'Tax at the top of the slab (cumulative)'],
      rows: [
        ['Up to ₹4,00,000', '0%', '₹0'],
        ['₹4,00,001 to ₹8,00,000', '5%', '₹20,000'],
        ['₹8,00,001 to ₹12,00,000', '10%', '₹60,000'],
        ['₹12,00,001 to ₹16,00,000', '15%', '₹1,20,000'],
        ['₹16,00,001 to ₹20,00,000', '20%', '₹2,00,000'],
        ['₹20,00,001 to ₹24,00,000', '25%', '₹3,00,000'],
        ['Above ₹24,00,000', '30%', '₹3,00,000 plus 30% of the excess'],
      ],
    },
    {
      type: 'paragraph',
      text: 'Slab tax is computed in layers: only the income inside each band is taxed at that rate. Someone with ₹14 lakh taxable pays 5% on ₹4 lakh, 10% on the next ₹4 lakh and 15% on the last ₹2 lakh, not 15% on everything.',
    },

    { type: 'heading', id: 'old-regime-slabs', text: 'Old regime slabs for FY 2025-26' },
    {
      type: 'paragraph',
      text: 'The old regime has not changed since 2014. It has fewer, wider slabs and a higher top rate at a lower income, but it allows the full set of deductions: 80C, 80D, HRA, home loan interest and the rest. You must opt into it each year in your return.',
    },
    {
      type: 'table',
      caption: 'Old regime, FY 2025-26, by age on the last day of the financial year.',
      head: ['Taxable income', 'Below 60', '60 to 79 (senior)', '80 and above (super senior)'],
      rows: [
        ['Up to ₹2,50,000', '0%', '0%', '0%'],
        ['₹2,50,001 to ₹3,00,000', '5%', '0%', '0%'],
        ['₹3,00,001 to ₹5,00,000', '5%', '5%', '0%'],
        ['₹5,00,001 to ₹10,00,000', '20%', '20%', '20%'],
        ['Above ₹10,00,000', '30%', '30%', '30%'],
      ],
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Senior citizens and the new regime',
      text: 'The higher nil band for seniors exists only in the old regime. Under the new regime a 65-year-old is taxed on the same slabs as a 30-year-old. For most seniors with pension and interest income the new regime still wins because of the ₹12 lakh rebate threshold, but it is worth running both.',
    },

    { type: 'heading', id: 'rebate-87a', text: 'Section 87A rebate and marginal relief' },
    {
      type: 'paragraph',
      text: 'The rebate is what makes the headline "no tax up to ₹12 lakh" true. Under the new regime, if your taxable income is ₹12 lakh or less, the tax computed from the slabs is reduced by up to ₹60,000. Slab tax on exactly ₹12 lakh is ₹60,000, so it goes to nil. Under the old regime the rebate is ₹12,500 and applies only up to ₹5 lakh taxable.',
    },
    {
      type: 'paragraph',
      text: 'Just above ₹12 lakh, marginal relief stops a cliff: your tax cannot exceed the amount by which your income crosses ₹12 lakh. So earning ₹12.10 lakh taxable costs ₹10,000 in tax, not the ₹61,500 the slabs alone would give. The relief fades out by around ₹12.75 lakh taxable, after which normal slab tax applies.',
    },
    {
      type: 'example',
      title: 'Marginal relief at ₹12,10,000 taxable income, new regime',
      lines: [
        { label: 'Slab tax (₹20,000 + ₹40,000 + 15% of ₹10,000)', value: '₹61,500' },
        { label: 'Income above ₹12 lakh', value: '₹10,000' },
        { label: 'Tax after marginal relief (capped at the excess)', value: '₹10,000' },
        { label: 'Cess at 4%', value: '₹400' },
        { label: 'Total tax payable', value: '₹10,400', strong: true },
      ],
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'The rebate does not cover everything',
      text: 'Long-term capital gains on listed shares and equity funds taxed under section 112A sit outside the 87A rebate, so a salary of ₹9 lakh plus ₹2 lakh of such gains still pays tax on the gains. Non-residents do not get the rebate at all.',
    },

    { type: 'heading', id: 'standard-deduction-new-regime', text: 'Standard deduction and what the new regime still allows' },
    {
      type: 'paragraph',
      text: 'The new regime removes most deductions but keeps a short list. These reduce your taxable income before the slabs are applied.',
    },
    {
      type: 'list',
      items: [
        'Standard deduction of ₹75,000 for salary and pension income (₹50,000 in the old regime).',
        'Employer contribution to NPS under section 80CCD(2), up to 14% of basic salary.',
        'Interest on a home loan for a let-out property, set off against the rent.',
        'Family pension deduction of one-third, up to ₹25,000.',
        'Transport and conveyance allowances for specially abled employees, and reimbursements for official travel.',
      ],
    },
    {
      type: 'paragraph',
      text: 'Not allowed in the new regime: section 80C investments, 80D health insurance, HRA exemption, leave travel allowance, home loan interest on a self-occupied house, 80TTA savings interest and donations under 80G. If those add up to more than roughly ₹8 lakh for a high earner, the old regime can still win; the regime comparison guide walks through the break-even at each salary.',
    },

    { type: 'heading', id: 'surcharge-and-cess', text: 'Surcharge and cess' },
    {
      type: 'paragraph',
      text: 'Cess is simple: 4% of the tax after rebate and surcharge, in both regimes, at every income. Surcharge applies only above ₹50 lakh of taxable income and is a percentage of the tax, not of the income.',
    },
    {
      type: 'table',
      caption: 'Surcharge rates, FY 2025-26. Marginal relief also applies at each threshold so a small step over it cannot cost more than the extra income.',
      head: ['Taxable income', 'New regime', 'Old regime'],
      rows: [
        ['₹50 lakh to ₹1 crore', '10%', '10%'],
        ['₹1 crore to ₹2 crore', '15%', '15%'],
        ['₹2 crore to ₹5 crore', '25%', '25%'],
        ['Above ₹5 crore', '25%', '37%'],
      ],
    },
    {
      type: 'paragraph',
      text: 'The 25% cap is one reason very high earners prefer the new regime: the old regime charges 37% surcharge above ₹5 crore, which pushes the effective top rate to 42.7% against 39% under the new regime.',
    },

    { type: 'heading', id: 'worked-examples', text: 'Worked examples at four salary levels' },
    {
      type: 'paragraph',
      text: 'Salaried, below 60, no income other than salary. Old regime figures assume ₹1.5 lakh under 80C and ₹25,000 under 80D, which is a typical deduction set; add HRA or a home loan and the old regime improves.',
    },
    {
      type: 'example',
      title: 'Salary ₹7,00,000',
      lines: [
        { label: 'New regime: taxable ₹6,25,000, slab tax ₹11,250, rebate ₹11,250', value: '₹0' },
        { label: 'Old regime: taxable ₹4,75,000, slab tax ₹11,250, rebate ₹11,250', value: '₹0' },
        { label: 'Either regime', value: 'Nil tax', strong: true },
      ],
    },
    {
      type: 'example',
      title: 'Salary ₹12,75,000',
      lines: [
        { label: 'New regime: taxable ₹12,00,000, slab tax ₹60,000, rebate ₹60,000', value: '₹0' },
        { label: 'Old regime: taxable ₹10,50,000, slab tax ₹1,27,500, cess ₹5,100', value: '₹1,32,600' },
        { label: 'New regime saves', value: '₹1,32,600', strong: true },
      ],
    },
    {
      type: 'example',
      title: 'Salary ₹15,00,000',
      lines: [
        { label: 'New regime: taxable ₹14,25,000, slab tax ₹93,750, cess ₹3,750', value: '₹97,500' },
        { label: 'Old regime: taxable ₹12,75,000, slab tax ₹1,95,000, cess ₹7,800', value: '₹2,02,800' },
        { label: 'New regime saves', value: '₹1,05,300', strong: true },
      ],
    },
    {
      type: 'example',
      title: 'Salary ₹25,00,000',
      lines: [
        { label: 'New regime: taxable ₹24,25,000, slab tax ₹3,07,500, cess ₹12,300', value: '₹3,19,800' },
        { label: 'Old regime: taxable ₹22,75,000, slab tax ₹4,95,000, cess ₹19,800', value: '₹5,14,800' },
        { label: 'New regime saves', value: '₹1,95,000', strong: true },
      ],
    },
    {
      type: 'paragraph',
      text: 'The pattern holds across most salaries: with only 80C and 80D, the new regime wins from about ₹8 lakh upwards. The old regime catches up only when HRA, home loan interest and NPS are all in play. Run your own numbers rather than assuming.',
    },
    { type: 'service-card', serviceSlug: 'itr-salaried', text: 'We compute both regimes on your Form 16 and file under the one that leaves you more. Regime comparison is included.' },

    { type: 'heading', id: 'which-regime', text: 'Which regime should you choose?' },
    {
      type: 'paragraph',
      text: 'Salaried taxpayers can pick either regime every year when filing, whatever they told their employer. If you have business or professional income, switching out of the new regime needs Form 10-IEA before the due date and you can move back only once.',
    },
    {
      type: 'callout',
      tone: 'success',
      title: 'A quick rule',
      text: 'Add up every deduction you would claim under the old regime, beyond the standard deduction. Below about ₹3.75 lakh of deductions, the new regime wins at every salary. Above ₹8 lakh of deductions, the old regime wins at every salary. In between, it depends on your slab, so use the calculator.',
    },

    { type: 'heading', id: 'fy-2026-27', text: 'Do the slabs change for FY 2026-27?' },
    {
      type: 'paragraph',
      text: 'From 1 April 2026 the Income-tax Act 2025 replaces the 1961 Act for tax year 2026-27. It renumbers sections and simplifies language, and the reported position is that it carries the FY 2025-26 slab rates forward unchanged. Budget 2026 is also reported to have left the slabs alone. Treat both as reported rather than confirmed until the Rules are notified; this page is updated within a day of any change, and the date at the top is when it was last checked.',
    },

    { type: 'heading', id: 'what-to-do-next', text: 'What to do next' },
    {
      type: 'paragraph',
      text: 'Put your actual salary and deductions into the income tax calculator to see both regimes with the rebate and cess applied. If the old regime comes out ahead, gather the proofs now, because the deductions must be claimed in the return. If the new regime wins, there is nothing to collect beyond Form 16 and your AIS, and the salaried filing plan handles the rest.',
    },
  ],
  faqs: [
    { q: 'What are the income tax slabs for FY 2025-26 under the new regime?', a: 'Nil up to ₹4 lakh, 5% from ₹4 to 8 lakh, 10% from ₹8 to 12 lakh, 15% from ₹12 to 16 lakh, 20% from ₹16 to 20 lakh, 25% from ₹20 to 24 lakh, and 30% above ₹24 lakh. Cess of 4% applies on the tax.' },
    { q: 'Is income up to ₹12 lakh tax-free in FY 2025-26?', a: 'Yes, under the new regime. Taxable income up to ₹12 lakh attracts a rebate of up to ₹60,000 under section 87A, which cancels the slab tax entirely. For a salaried person the ₹75,000 standard deduction pushes the tax-free salary to ₹12.75 lakh.' },
    { q: 'What are the old regime slabs for FY 2025-26?', a: 'Nil up to ₹2.5 lakh, 5% from ₹2.5 to 5 lakh, 20% from ₹5 to 10 lakh, and 30% above ₹10 lakh. Senior citizens aged 60 to 79 get a nil band up to ₹3 lakh, and those 80 and above up to ₹5 lakh.' },
    { q: 'What is the standard deduction for FY 2025-26?', a: '₹75,000 under the new regime and ₹50,000 under the old regime, for salary and pension income. It is applied automatically; no proof is needed.' },
    { q: 'Which regime is the default?', a: 'The new regime. If you do nothing, your employer deducts TDS on new regime slabs and your return is filed under it. Salaried taxpayers can switch to the old regime in the return each year; those with business income need Form 10-IEA.' },
    { q: 'What is marginal relief under section 87A?', a: 'A cap that stops a small crossing of ₹12 lakh from creating a large tax bill. Your tax cannot exceed the amount by which taxable income exceeds ₹12 lakh. At ₹12.10 lakh taxable, tax is ₹10,000 plus cess instead of ₹61,500.' },
    { q: 'Do senior citizens get different slabs in the new regime?', a: 'No. The new regime uses the same seven slabs for every age. The higher nil bands of ₹3 lakh and ₹5 lakh for seniors and super seniors exist only in the old regime.' },
    { q: 'When does surcharge apply?', a: 'Above ₹50 lakh of taxable income: 10% of the tax up to ₹1 crore, 15% up to ₹2 crore, and 25% above that. The old regime adds a 37% rate above ₹5 crore; the new regime caps surcharge at 25%.' },
    { q: 'Are the slabs the same for AY 2026-27 and FY 2025-26?', a: 'Yes. FY 2025-26 is the year the income is earned; AY 2026-27 is the year you file the return for it, by 31 July 2026. The slabs on this page apply to that return.' },
    { q: 'Will the slabs change under the Income-tax Act 2025?', a: 'The 2025 Act takes effect from tax year 2026-27 and is reported to carry the current slab rates forward unchanged, renumbering the sections. Verify against the notified Rules before relying on it; this page is updated when they are published.' },
  ],
}

import type { Guide } from '../types'

export const guide: Guide = {
  slug: 'hra-exemption',
  cluster: 'tax-saving',
  title: 'HRA Exemption Under Section 10(13A): Rules, Formula and Examples',
  h1: 'HRA Exemption Under Section 10(13A): Rules, Formula and Examples for FY 2025-26',
  metaTitle: 'HRA Exemption u/s 10(13A): Formula, Rules, Examples',
  metaDescription:
    'HRA exemption FY 2025-26: least-of-three formula, metro vs non-metro, rent to parents, landlord PAN above ₹1 lakh, TDS on rent and section 80GG without HRA.',
  keywords: [
    'hra exemption',
    'hra calculation formula',
    'section 10(13a)',
    'hra exemption calculator',
    'rent paid to parents hra',
    'landlord pan for hra',
    'hra metro cities list',
    'section 80gg deduction',
    'hra in new tax regime',
  ],
  excerpt:
    'HRA is the largest exemption most salaried employees can claim under the old regime. This guide walks through the formula, the metro list, rent to parents, the PAN and TDS rules, and 80GG for those without HRA.',
  datePublished: '2026-09-06',
  dateModified: '2026-09-06',
  readMinutes: 10,
  sections: [
    {
      type: 'key-takeaways',
      items: [
        'HRA exemption is the least of three figures: actual HRA received, rent paid minus 10% of basic plus DA, and 50% of basic plus DA in Delhi, Mumbai, Kolkata or Chennai (40% elsewhere).',
        'It is available only under the old tax regime. If you file under the new regime, the entire HRA is taxable and the exemption question does not arise.',
        'Rent to parents is allowed if they own the house and you actually pay them. Landlord PAN is compulsory when annual rent exceeds ₹1 lakh, and you must deduct 2% TDS if monthly rent exceeds ₹50,000.',
        'No HRA in your salary? Section 80GG allows a deduction of up to ₹60,000 a year for rent paid, subject to conditions.',
      ],
    },
    {
      type: 'stat-grid',
      stats: [
        { label: 'Metro percentage', value: '50%', note: 'Of basic plus DA; 40% in other cities' },
        { label: 'Landlord PAN required above', value: '₹1 lakh', note: 'Annual rent, to the employer' },
        { label: 'TDS on rent above', value: '₹50,000/month', note: '2% under section 194-IB' },
        { label: 'Section 80GG cap', value: '₹60,000', note: 'Per year, if no HRA received' },
      ],
    },
    {
      type: 'tool-card',
      calculatorSlug: 'hra',
      text: 'Enter basic, DA, HRA received and rent paid, pick your city, and see all three limbs of the formula so you know which one is capping your exemption.',
    },
    { type: 'heading', text: 'What HRA is and who can claim the exemption', id: 'what-is-hra' },
    {
      type: 'paragraph',
      text: 'House Rent Allowance is a component of salary that employers pay to help with accommodation costs. Section 10(13A) of the Income-tax Act 1961, read with rule 2A, exempts part of it from tax if you live in rented accommodation and actually pay rent. The exemption is not automatic; it depends on your salary structure, your rent and your city.',
    },
    {
      type: 'list',
      items: [
        'You must be a salaried employee receiving HRA as part of your pay. Self-employed people and employees without an HRA component use section 80GG instead.',
        'You must live in rented accommodation and pay the rent yourself. Staying in your own house, or in a house owned by your spouse, does not qualify.',
        'You must file under the old tax regime. The new regime under section 115BAC does not allow the 10(13A) exemption.',
        'The exemption is computed for the period you actually paid rent, so a mid-year move or a few months in your own home changes the figure.',
      ],
    },
    { type: 'heading', text: 'The least-of-three formula', id: 'hra-formula' },
    {
      type: 'paragraph',
      text: 'The exempt HRA is the lowest of the following three amounts, computed for the period rent was paid. Salary for this purpose means basic pay plus dearness allowance (if it forms part of retirement benefits) plus any fixed percentage commission on turnover. Special allowances, bonus and reimbursements are excluded.',
    },
    {
      type: 'table',
      head: ['Limb', 'Formula', 'What it means'],
      rows: [
        ['1', 'Actual HRA received', 'You can never exempt more than the HRA your employer paid'],
        ['2', 'Rent paid minus 10% of salary', 'The law assumes you would spend 10% of salary on housing anyway'],
        ['3', '50% of salary (metro) or 40% of salary (non-metro)', 'A ceiling linked to your city'],
      ],
      caption: 'Salary here is basic plus DA (if it counts for retirement benefits) plus turnover-linked commission.',
    },
    {
      type: 'paragraph',
      text: 'Because the exemption is the minimum of the three, raising rent beyond a point does not help once limb 3 becomes the binding constraint, and a low HRA component in your CTC caps the benefit no matter how much rent you pay.',
    },
    { type: 'heading', text: 'Metro cities for HRA', id: 'metro-cities' },
    {
      type: 'paragraph',
      text: 'Only four cities count as metros for section 10(13A): Delhi, Mumbai, Kolkata and Chennai. The list has not been updated to include Bengaluru, Hyderabad, Pune, Gurugram, Noida, Chandigarh or Ahmedabad, so employees in those cities use 40% of salary in limb 3, even though rents there are often higher than in Kolkata or Chennai.',
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Gurugram and Noida are not Delhi',
      text: 'The metro test is based on the city where the rented house is located, not the employer address. A Delhi employee renting in Gurugram uses 40%; a Gurugram employee renting in Delhi uses 50%.',
    },
    { type: 'heading', text: 'Worked example: metro employee', id: 'example-metro' },
    {
      type: 'example',
      title: 'Delhi: basic ₹50,000 per month, HRA ₹20,000 per month, rent ₹18,000 per month, no DA',
      lines: [
        { label: 'Annual basic (salary for HRA)', value: '₹6,00,000' },
        { label: 'Limb 1: actual HRA received', value: '₹2,40,000' },
        { label: 'Limb 2: rent ₹2,16,000 minus 10% of salary ₹60,000', value: '₹1,56,000' },
        { label: 'Limb 3: 50% of salary', value: '₹3,00,000' },
        { label: 'Exempt HRA (least of three)', value: '₹1,56,000', strong: true },
        { label: 'Taxable HRA added to salary', value: '₹84,000' },
      ],
    },
    {
      type: 'paragraph',
      text: 'In this case limb 2 binds. Rent of ₹18,000 a month leaves ₹84,000 of HRA taxable. If rent were ₹25,000 a month, limb 2 would rise to ₹2,40,000 and limb 1 would bind, making the whole HRA exempt.',
    },
    { type: 'heading', text: 'Worked example: non-metro employee', id: 'example-non-metro' },
    {
      type: 'example',
      title: 'Chandigarh: basic ₹40,000 per month, HRA ₹16,000 per month, rent ₹15,000 per month',
      lines: [
        { label: 'Annual basic (salary for HRA)', value: '₹4,80,000' },
        { label: 'Limb 1: actual HRA received', value: '₹1,92,000' },
        { label: 'Limb 2: rent ₹1,80,000 minus 10% of salary ₹48,000', value: '₹1,32,000' },
        { label: 'Limb 3: 40% of salary', value: '₹1,92,000' },
        { label: 'Exempt HRA (least of three)', value: '₹1,32,000', strong: true },
        { label: 'Tax saved at 20% slab plus cess', value: '₹27,456' },
      ],
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'Check whether the old regime still wins',
      text: 'An HRA exemption of ₹1.32 lakh alone does not justify the old regime at most salary levels. Add it to 80C, 80D and home loan interest and compare with the break-even in our old vs new regime guide before deciding.',
    },
    { type: 'heading', text: 'Paying rent to parents or family', id: 'rent-to-parents' },
    {
      type: 'paragraph',
      text: 'You can claim HRA on rent paid to your parents, provided the house is owned by them and the arrangement is genuine. The rent becomes taxable income in their hands under house property, after the 30% standard deduction, and they should report it in their own return. If your parents have little other income, the family as a whole saves tax.',
    },
    {
      type: 'list',
      items: [
        'Have a simple rent agreement and transfer rent by bank every month. Cash payments and back-dated receipts are the first thing an assessing officer questions.',
        'The parent must own the property. Rent paid to a parent for a house that is in your own name is not rent.',
        'Rent to a spouse is generally disallowed because the law does not recognise a commercial relationship between husband and wife for this purpose.',
        'If annual rent exceeds ₹1 lakh, give your employer the parent PAN, and if it exceeds ₹50,000 a month, deduct 2% TDS under section 194-IB.',
        'AIS now shows rent receipts reported through TDS, so the parent return and your HRA claim must match.',
      ],
    },
    { type: 'heading', text: 'Landlord PAN, rent receipts and TDS', id: 'landlord-pan-tds' },
    {
      type: 'paragraph',
      text: 'Employers are required by rule 26C to collect Form 12BB with rent receipts and, where annual rent exceeds ₹1 lakh, the landlord PAN. If the landlord has no PAN, a declaration with name and address is accepted, but the department can still ask you to prove the payment. Without proof, the employer taxes the full HRA, and you can only claim the exemption in your return with the risk of a query.',
    },
    {
      type: 'table',
      head: ['Annual rent', 'Employer requirement', 'Your obligation'],
      rows: [
        ['Up to ₹1,00,000', 'Rent receipts or declaration', 'Keep receipts and bank proof'],
        ['₹1,00,001 to ₹6,00,000', 'Rent receipts plus landlord PAN', 'Keep receipts, agreement and PAN'],
        ['Above ₹6,00,000 (₹50,000 per month)', 'Rent receipts plus landlord PAN', 'Deduct 2% TDS u/s 194-IB once a year, file Form 26QC within 30 days of March or vacating, issue Form 16C'],
      ],
    },
    {
      type: 'callout',
      tone: 'success',
      title: 'Claimed HRA but forgot to tell the employer?',
      text: 'You can still claim the exemption in your ITR under the old regime by reducing the taxable salary shown in Form 16. Keep the rent agreement, receipts and bank statements ready in case CPC asks for them.',
    },
    {
      type: 'service-card',
      serviceSlug: 'itr-salaried',
      text: 'We compute HRA on your actual rent and salary structure, check whether the old regime still beats the new one, and file the return with the exemption claimed correctly. From ₹499.',
    },
    { type: 'heading', text: 'Section 80GG: rent deduction when you get no HRA', id: 'section-80gg' },
    {
      type: 'paragraph',
      text: 'If your salary has no HRA component, or you are self-employed, section 80GG allows a deduction for rent paid under the old regime. You must file Form 10BA declaring the rent, and neither you, your spouse, minor child nor HUF may own a house in the city where you live and work. You also must not own a self-occupied house anywhere else.',
    },
    {
      type: 'paragraph',
      text: 'The deduction is the least of three amounts: ₹5,000 per month (₹60,000 a year), 25% of adjusted total income, and rent paid minus 10% of adjusted total income. Adjusted total income is gross total income before 80GG, long-term capital gains and certain other deductions.',
    },
    {
      type: 'example',
      title: 'Freelancer in Mohali, adjusted total income ₹6,00,000, rent ₹10,000 per month',
      lines: [
        { label: 'Limit 1: ₹5,000 per month', value: '₹60,000' },
        { label: 'Limit 2: 25% of adjusted total income', value: '₹1,50,000' },
        { label: 'Limit 3: rent ₹1,20,000 minus 10% of ₹6,00,000', value: '₹60,000' },
        { label: 'Deduction u/s 80GG', value: '₹60,000', strong: true },
      ],
    },
    { type: 'heading', text: 'Common HRA mistakes', id: 'common-mistakes' },
    {
      type: 'list',
      items: [
        'Using total CTC or gross salary instead of basic plus DA in limbs 2 and 3, which inflates the exemption.',
        'Claiming HRA for months when no rent was paid, for example while living with family between two leases.',
        'Claiming both HRA and home loan interest on a house in the same city without a genuine reason, which is allowed in law but frequently questioned.',
        'Treating Bengaluru, Hyderabad or Pune as metros and using 50%.',
        'Skipping the 194-IB TDS on rent above ₹50,000 a month; the default attracts interest and a late fee of ₹200 a day for Form 26QC.',
        'Filing under the new regime and still entering an HRA exemption in the return, which CPC removes with an adjustment under 143(1)(a).',
      ],
    },
    { type: 'heading', text: 'What to do next', id: 'what-to-do-next' },
    {
      type: 'paragraph',
      text: 'Pull your basic, DA and HRA from the salary slip, total the rent paid during FY 2025-26, and run the HRA calculator to see the exempt figure. Generate rent receipts if you have not kept them, collect the landlord PAN if rent crosses ₹1 lakh, and then compare the old regime total with the new regime before filing.',
    },
  ],
  faqs: [
    {
      q: 'How is HRA exemption calculated?',
      a: 'It is the least of three amounts: actual HRA received, rent paid minus 10% of basic plus DA, and 50% of basic plus DA in Delhi, Mumbai, Kolkata or Chennai (40% in other cities). The calculation is done for the period rent was actually paid.',
    },
    {
      q: 'Is HRA exemption available in the new tax regime?',
      a: 'No. Section 10(13A) applies only under the old regime. Under the new regime the entire HRA is taxable, offset partly by the higher ₹75,000 standard deduction and wider slabs.',
    },
    {
      q: 'Can I claim HRA for rent paid to my parents?',
      a: 'Yes, if the parents own the house, you pay them by bank transfer and they report the rent as income in their return. Rent to a spouse is generally not accepted.',
    },
    {
      q: 'Is landlord PAN mandatory for HRA?',
      a: 'Yes, when annual rent exceeds ₹1 lakh. Give the PAN to your employer in Form 12BB. If the landlord has no PAN, a signed declaration with name and address is required, but be ready to prove the payment.',
    },
    {
      q: 'Which cities are metro for HRA purposes?',
      a: 'Only Delhi, Mumbai, Kolkata and Chennai. Bengaluru, Hyderabad, Pune, Gurugram, Noida, Chandigarh and Ahmedabad are non-metro at 40% of salary.',
    },
    {
      q: 'Can I claim HRA and home loan interest together?',
      a: 'Yes, if you genuinely live in a rented house and own another property, for example in a different city or one that is let out. Claiming both on properties in the same locality invites scrutiny.',
    },
    {
      q: 'Do I need to deduct TDS on rent for HRA?',
      a: 'Only if rent exceeds ₹50,000 a month. Section 194-IB requires an individual tenant to deduct 2% TDS once a year and file Form 26QC. Below that threshold no TDS is required.',
    },
    {
      q: 'What is section 80GG and who can claim it?',
      a: 'A deduction of up to ₹60,000 a year for rent paid by taxpayers who do not receive HRA, including the self-employed, under the old regime. You must file Form 10BA and must not own a house in the city where you live.',
    },
    {
      q: 'Can I claim HRA without rent receipts?',
      a: 'The employer will not allow it, but you can claim it in the return if you have bank proof of rent payment and a rent agreement. Receipts are the standard evidence and easy to generate, so keep them.',
    },
  ],
  relatedServiceSlug: 'itr-salaried',
  relatedGuides: ['old-vs-new-tax-regime', 'itr-filing-guide-ay-2026-27', 'which-itr-form-to-file'],
  relatedCalculators: ['hra', 'rent-receipt-generator'],
}

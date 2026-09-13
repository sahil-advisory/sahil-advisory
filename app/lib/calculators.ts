// Calculator registry. The interactive tool is a client component chosen by
// slug in app/calculators/[slug]/page.tsx; everything else here is server
// rendered (title, intro, sections, FAQs, JSON-LD) so the page ranks even
// before hydration.

export interface CalcSection {
  heading: string
  paragraphs?: string[]
  bullets?: string[]
  table?: { head: string[]; rows: string[][] }
}

export interface CalculatorDef {
  slug: string
  name: string
  h1: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
  intro: string
  updatedFor: string
  sections: CalcSection[]
  faqs: { q: string; a: string }[]
  relatedServiceSlug: string
  ctaText: string
  related: string[]
  phase: 0 | 1
}

// ---------------------------------------------------------------------------
// Explanatory content for the phase-0 calculators (FY 2025-26 / AY 2026-27).
// Rates quoted here mirror app/lib/tax/rules/fy2025-26.ts; update both on a
// Budget change.
// ---------------------------------------------------------------------------

const INCOME_TAX_SECTIONS: CalcSection[] = [
  {
    heading: 'How this income tax calculator works',
    paragraphs: [
      'The calculator takes your gross annual income and runs it through both tax regimes for FY 2025-26 (AY 2026-27) at the same time. Under the new regime it subtracts the standard deduction of ₹75,000, applies the Budget 2025 slabs, checks the section 87A rebate and marginal relief, then adds surcharge and the 4% health and education cess. Under the old regime it subtracts the ₹50,000 standard deduction plus every deduction you enter (80C, 80D, HRA, home loan interest, NPS and others), applies the older 5/20/30% slabs with age-based exemption limits, and adds surcharge and cess.',
      'The two results appear side by side so you can see the total tax, effective rate and take-home under each, with a badge on the regime that leaves more money in hand. Expand either card to see the slab-wise breakup. Everything updates as you type, so you can test what happens if you invest another ₹50,000 in NPS or claim HRA.',
      'The new regime is the default from FY 2023-24 onwards. Salaried employees can still pick the old regime each year at filing time by ticking the option in the ITR form; people with business income must file Form 10-IEA to opt out of the new regime and can switch back only once.',
    ],
  },
  {
    heading: 'New regime slabs for FY 2025-26 (Budget 2025)',
    paragraphs: [
      'Budget 2025 rewrote the new regime slabs and raised the rebate limit. The slabs apply to taxable income after the ₹75,000 standard deduction, so a salaried person with gross salary of ₹12,75,000 pays no tax at all.',
    ],
    table: {
      head: ['Taxable income', 'Rate', 'Tax in the slab'],
      rows: [
        ['Up to ₹4,00,000', 'Nil', '₹0'],
        ['₹4,00,001 to ₹8,00,000', '5%', '₹20,000'],
        ['₹8,00,001 to ₹12,00,000', '10%', '₹40,000'],
        ['₹12,00,001 to ₹16,00,000', '15%', '₹60,000'],
        ['₹16,00,001 to ₹20,00,000', '20%', '₹80,000'],
        ['₹20,00,001 to ₹24,00,000', '25%', '₹1,00,000'],
        ['Above ₹24,00,000', '30%', '30% of the excess'],
      ],
    },
    bullets: [
      'Standard deduction for salary and pension: ₹75,000.',
      'Section 87A rebate: up to ₹60,000, which wipes out the tax on taxable income up to ₹12,00,000.',
      'Employer NPS contribution under section 80CCD(2) up to 14% of basic is still deductible; almost every other chapter VI-A deduction is not.',
      'Same slabs for every age; there is no separate senior citizen limit under the new regime.',
    ],
  },
  {
    heading: 'Old regime slabs and the deductions that make it work',
    paragraphs: [
      'The old regime keeps the pre-2020 slabs but lets you reduce taxable income with exemptions and deductions. It only beats the new regime when those deductions are large, typically above ₹4 to 5 lakh for a ₹15 lakh salary.',
    ],
    table: {
      head: ['Taxable income', 'Below 60', '60 to 79', '80 and above'],
      rows: [
        ['Up to ₹2,50,000', 'Nil', 'Nil', 'Nil'],
        ['₹2,50,001 to ₹3,00,000', '5%', 'Nil', 'Nil'],
        ['₹3,00,001 to ₹5,00,000', '5%', '5%', 'Nil'],
        ['₹5,00,001 to ₹10,00,000', '20%', '20%', '20%'],
        ['Above ₹10,00,000', '30%', '30%', '30%'],
      ],
    },
    bullets: [
      'Standard deduction ₹50,000; section 87A rebate up to ₹12,500 for taxable income up to ₹5,00,000 (no marginal relief).',
      'Section 80C: ₹1,50,000 across PF, PPF, ELSS, life insurance, home loan principal, tuition fees and 5-year FDs.',
      'Section 80D: ₹25,000 for self and family (₹50,000 if a senior citizen) plus ₹25,000/₹50,000 for parents.',
      'HRA exemption under section 10(13A), LTA, and home loan interest up to ₹2,00,000 under section 24(b) for a self-occupied house.',
      'Section 80CCD(1B): an extra ₹50,000 for your own NPS contribution, over and above 80C.',
      'Others: 80E education loan interest (no cap), 80G donations, 80TTA/80TTB savings interest, 80EEA/80EEB where still available.',
    ],
  },
  {
    heading: 'Section 87A rebate and marginal relief: a worked example',
    paragraphs: [
      'Under the new regime the rebate of ₹60,000 makes tax nil up to ₹12 lakh of taxable income. Just above that limit the tax would otherwise jump from zero to more than ₹60,000, so the law caps the tax at the amount by which income exceeds ₹12 lakh. This is marginal relief, and it applies roughly up to a taxable income of ₹12,75,000.',
      'Example: taxable income ₹12,10,000. Slab tax is ₹20,000 + ₹40,000 + 15% of ₹10,000 = ₹61,500. The income exceeds ₹12 lakh by only ₹10,000, so tax is limited to ₹10,000, plus 4% cess = ₹10,400. Without marginal relief the bill would have been ₹63,960. The calculator shows this relief as a separate line so you can see exactly how much it saved.',
      'The old regime rebate is smaller (₹12,500) and stops abruptly at ₹5,00,000 of taxable income with no marginal relief, which is why an old-regime taxable income of ₹5,00,100 attracts about ₹13,000 of tax.',
    ],
  },
  {
    heading: 'Worked example: ₹15 lakh salary under both regimes',
    paragraphs: [
      'New regime: ₹15,00,000 less ₹75,000 standard deduction = ₹14,25,000 taxable. Tax = ₹20,000 (5% slab) + ₹40,000 (10% slab) + ₹33,750 (15% on ₹2,25,000) = ₹93,750. Add 4% cess of ₹3,750 and the total is ₹97,500, an effective rate of 6.5%.',
      'Old regime with typical deductions (80C ₹1,50,000, 80D ₹25,000, standard deduction ₹50,000): taxable income ₹12,75,000. Tax = ₹12,500 + ₹1,00,000 + ₹82,500 (30% on ₹2,75,000) = ₹1,95,000, plus cess ₹7,800 = ₹2,02,800. The new regime saves ₹1,05,300.',
      'Add an HRA exemption of ₹2,00,000 and home loan interest of ₹2,00,000 to the old regime and taxable income falls to ₹8,75,000. Tax = ₹12,500 + ₹75,000 = ₹87,500, plus cess ₹3,500 = ₹91,000, which is ₹6,500 lower than the new regime. In other words, at ₹15 lakh you need roughly ₹6 lakh of deductions before the old regime wins.',
    ],
  },
  {
    heading: 'Surcharge and cess',
    bullets: [
      'Surcharge applies on the tax (not the income) when taxable income exceeds ₹50 lakh: 10% up to ₹1 crore, 15% up to ₹2 crore, 25% up to ₹5 crore and 37% above ₹5 crore under the old regime.',
      'The new regime caps surcharge at 25%, so very high earners save under it even before deductions are considered.',
      'Marginal relief also applies to surcharge so that crossing ₹50 lakh or ₹1 crore by a rupee does not cost more than the extra income.',
      'Health and education cess of 4% is charged on tax plus surcharge under both regimes and is not refundable or deductible.',
      'Surcharge on dividend income and on capital gains under sections 111A and 112A is capped at 15%.',
    ],
  },
  {
    heading: 'Which regime should you choose?',
    paragraphs: [
      'For most salaried people earning up to ₹12,75,000 the new regime is a clear win: zero tax and no paperwork. Between ₹13 lakh and ₹25 lakh the answer depends on your deductions. If you pay rent in a metro, have a home loan, invest the full 80C and 80CCD(1B) limits and pay family health insurance, run the numbers in the calculator; the old regime can still edge ahead.',
      'Remember that HRA, LTA and most chapter VI-A deductions vanish under the new regime, but employer NPS under 80CCD(2), gratuity, leave encashment and the standard deduction survive. Whatever the calculator says, the choice is made in the ITR itself, so you can decide after the year ends once you know your actual deductions.',
    ],
  },
]

const INCOME_TAX_FAQS = [
  { q: 'What is the tax-free income limit for FY 2025-26 under the new regime?', a: '₹12,00,000 of taxable income is effectively tax-free because the section 87A rebate cancels tax up to ₹60,000. For salaried people the standard deduction of ₹75,000 pushes the tax-free gross salary to ₹12,75,000. Above that, marginal relief limits the tax to the amount by which income exceeds ₹12 lakh, up to roughly ₹12.75 lakh of taxable income.' },
  { q: 'How much tax do I pay on a ₹10 lakh salary in FY 2025-26?', a: 'Nil under the new regime: ₹10,00,000 less the ₹75,000 standard deduction is ₹9,25,000, slab tax of ₹32,500 is fully covered by the 87A rebate. Under the old regime with ₹1,50,000 in 80C and the ₹50,000 standard deduction you would pay about ₹75,400 including cess.' },
  { q: 'Is the standard deduction ₹75,000 or ₹50,000?', a: '₹75,000 under the new regime and ₹50,000 under the old regime for FY 2025-26. It is available only to salaried employees and pensioners (including family pensioners, at ₹25,000 under the new regime) and needs no proof or investment.' },
  { q: 'Can I switch from the new regime to the old regime?', a: 'Yes, salaried taxpayers can choose either regime every year simply by selecting it in the ITR form before the due date. Taxpayers with business or professional income must file Form 10-IEA to opt for the old regime and get only one chance to switch back to the new regime.' },
  { q: 'What is marginal relief under section 87A?', a: 'Marginal relief limits your tax to the amount by which taxable income exceeds ₹12,00,000 under the new regime. For example, at ₹12,10,000 the tax is capped at ₹10,000 plus cess instead of the ₹61,500 slab tax. It runs out at about ₹12,75,000, after which normal slab tax applies.' },
  { q: 'When does surcharge apply on income tax?', a: 'Surcharge starts when taxable income exceeds ₹50 lakh: 10% of tax up to ₹1 crore, 15% up to ₹2 crore, 25% up to ₹5 crore and 37% above that under the old regime. The new regime caps surcharge at 25%, and marginal relief ensures the extra tax never exceeds the extra income.' },
  { q: 'Does this calculator include capital gains?', a: 'No, it models only income taxed at slab rates such as salary, interest and rent. Equity gains are taxed at special rates (20% short-term, 12.5% long-term above ₹1.25 lakh) and should be worked out in the capital gains calculator, then added to the tax shown here.' },
  { q: 'Do senior citizens get a higher exemption limit in FY 2025-26?', a: 'Only under the old regime: ₹3,00,000 for those aged 60 to 79 and ₹5,00,000 for those 80 and above. The new regime uses the same ₹4,00,000 nil slab for every age, but its ₹12 lakh rebate limit usually makes it the better choice for retirees with pension and interest income.' },
]

const HRA_SECTIONS: CalcSection[] = [
  {
    heading: 'How HRA exemption is calculated under section 10(13A)',
    paragraphs: [
      'House Rent Allowance is part of your salary, but the portion that qualifies for exemption is not taxed. Rule 2A of the Income-tax Rules fixes the exempt amount as the least of three figures: (1) the actual HRA you received, (2) rent paid minus 10% of salary, and (3) 50% of salary if you live in Delhi, Mumbai, Kolkata or Chennai, or 40% of salary anywhere else. Whatever is left of the HRA after this exemption is added to your taxable salary.',
      '"Salary" for this purpose means basic pay plus dearness allowance (only if DA counts for retirement benefits) plus any commission fixed as a percentage of turnover. Special allowance, bonus and other allowances are not included, which is why two people on the same CTC can get very different exemptions depending on how their pay is structured.',
      'The calculation is done for the period in which rent was actually paid, so if you moved cities or started renting mid-year, work it out separately for each stretch. The calculator lets you enter monthly or annual figures; monthly figures are multiplied by 12.',
    ],
  },
  {
    heading: 'Worked example: ₹40,000 basic, ₹18,000 rent in a non-metro',
    paragraphs: [
      'Suppose basic salary is ₹40,000 per month (₹4,80,000 a year), HRA received is ₹20,000 per month (₹2,40,000) and rent paid is ₹18,000 per month (₹2,16,000) in Chandigarh, which is a non-metro for HRA.',
    ],
    table: {
      head: ['Test', 'Working', 'Amount'],
      rows: [
        ['Actual HRA received', '₹20,000 × 12', '₹2,40,000'],
        ['Rent paid less 10% of salary', '₹2,16,000 − ₹48,000', '₹1,68,000'],
        ['40% of salary (non-metro)', '40% × ₹4,80,000', '₹1,92,000'],
        ['Exempt HRA (least of the three)', '', '₹1,68,000'],
        ['Taxable HRA', '₹2,40,000 − ₹1,68,000', '₹72,000'],
      ],
    },
    paragraphs2: undefined,
  } as CalcSection,
  {
    heading: 'What the example tells you',
    paragraphs: [
      'The second test, rent minus 10% of salary, is the binding constraint in this example. Raising the rent to ₹20,000 a month would lift that figure to ₹1,92,000 and the exemption would then be capped by the 40% rule instead. In a metro the third test would be ₹2,40,000, but the exemption would still be ₹1,68,000 because the rent test is lower. This is why the calculator highlights which of the three limits is binding: it shows what would actually change your exemption.',
      'At a 30% slab the ₹1,68,000 exemption saves about ₹52,400 of tax including cess under the old regime. The new regime gives no HRA exemption at all, so compare both regimes with the income tax calculator before deciding.',
    ],
  },
  {
    heading: 'Conditions and documents for claiming HRA',
    bullets: [
      'You must actually pay rent for accommodation you occupy; you cannot claim HRA for a house you own or one occupied rent-free.',
      'Rent receipts are needed for the employer; most companies ask for them if rent exceeds ₹3,000 a month. Keep the rent agreement and bank transfers as well.',
      'If annual rent exceeds ₹1,00,000 (₹8,333 a month), the landlord\'s PAN must be given to the employer in Form 12BB, or a declaration in Form 60 if the landlord has no PAN.',
      'If monthly rent exceeds ₹50,000, deduct 2% TDS under section 194-IB once a year and file Form 26QC; you do not need a TAN.',
      'Paying rent to parents is allowed if the house is in their name and the money genuinely changes hands; they must report it as rental income. Paying rent to a spouse is generally not accepted.',
      'HRA can be claimed together with home loan interest if you own a house in another city or cannot live in your own house because of work.',
    ],
  },
  {
    heading: 'Metro versus non-metro: which cities count',
    paragraphs: [
      'Only Delhi, Mumbai, Kolkata and Chennai are metros for HRA. Bengaluru, Hyderabad, Pune, Ahmedabad, Gurugram, Noida, Chandigarh, Mohali and Panchkula are all non-metro despite high rents, so the 40% limit applies. Because the third test is 40% or 50% of basic plus DA, employees with a low basic and high special allowance often find their exemption capped even when they pay high rent; asking HR to restructure salary with a higher basic can raise the exemption.',
    ],
  },
  {
    heading: 'No HRA in your salary? Use section 80GG',
    paragraphs: [
      'Self-employed people and employees whose salary has no HRA component can claim rent under section 80GG in the old regime. The deduction is the least of ₹5,000 per month (₹60,000 a year), 25% of adjusted total income, and rent paid minus 10% of adjusted total income. You, your spouse or minor child must not own a house in the city where you live, and you must file Form 10BA with the return.',
    ],
  },
  {
    heading: 'HRA and the new tax regime',
    paragraphs: [
      'HRA exemption is available only under the old regime. If your HRA exemption plus 80C, 80D and home loan interest add up to less than roughly ₹4 to 6 lakh, the new regime is usually cheaper even after giving up HRA, because its slabs are wider and the standard deduction is ₹75,000. Use this calculator to get the exempt amount, plug it into the income tax calculator, and compare the two totals before submitting your investment declaration.',
    ],
  },
]

const HRA_FAQS = [
  { q: 'How is HRA exemption calculated?', a: 'HRA exemption is the least of three amounts: actual HRA received, rent paid minus 10% of salary (basic plus DA), and 50% of salary in Delhi, Mumbai, Kolkata or Chennai or 40% elsewhere. The remaining HRA is taxable. For example, with ₹4,80,000 basic, ₹2,40,000 HRA and ₹2,16,000 rent in a non-metro, the exemption is ₹1,68,000.' },
  { q: 'Is HRA exemption available in the new tax regime?', a: 'No, HRA exemption under section 10(13A) is available only in the old regime. Under the new regime the entire HRA is taxable, but the wider slabs and ₹75,000 standard deduction often more than compensate unless your total deductions are very large.' },
  { q: 'Is landlord PAN mandatory for HRA?', a: 'Yes, if annual rent exceeds ₹1,00,000 the landlord\'s PAN must be reported to your employer in Form 12BB. If the landlord does not have a PAN, a signed declaration in Form 60 with their name and address is accepted instead.' },
  { q: 'Can I claim HRA if I pay rent to my parents?', a: 'Yes, provided the house belongs to your parents, you actually transfer the rent (preferably by bank) and they declare it as income from house property in their return. Keep a rent agreement and receipts, since these claims are checked more closely.' },
  { q: 'Which cities are metro for HRA purposes?', a: 'Only four cities count as metros: Delhi, Mumbai, Kolkata and Chennai, where the limit is 50% of salary. Bengaluru, Hyderabad, Pune, Chandigarh and every other city are non-metro, where the limit is 40% of salary.' },
  { q: 'Can I claim both HRA and home loan interest?', a: 'Yes, both can be claimed in the same year if you live in rented accommodation and own a house elsewhere, or if your own house is in the same city but you cannot occupy it for genuine work reasons. Interest on a let-out or deemed let-out property is claimed under section 24(b).' },
  { q: 'Do I need rent receipts if rent is below ₹3,000 a month?', a: 'No, CBDT allows employers to grant HRA exemption without receipts when rent is up to ₹3,000 a month. Above that, employers ask for monthly receipts, and above ₹1,00,000 a year the landlord\'s PAN as well. Keep bank proof regardless in case of an income-tax notice.' },
  { q: 'What if my employer did not give HRA exemption in Form 16?', a: 'You can still claim it while filing the ITR by reducing the taxable salary and reporting the exempt HRA under section 10(13A) in the exempt income schedule. Keep rent receipts, agreement and bank statements, because such claims are often verified against the landlord\'s PAN.' },
]

const CAPITAL_GAINS_SECTIONS: CalcSection[] = [
  {
    heading: 'Capital gains tax rates after 23 July 2024',
    paragraphs: [
      'Budget 2024 simplified capital gains taxation for transfers made on or after 23 July 2024, and these rates continue for FY 2025-26. Long-term gains on almost every asset are now taxed at 12.5% without indexation, while short-term gains on listed equity and equity mutual funds are taxed at 20%. Other short-term gains are added to your income and taxed at slab rates.',
    ],
    table: {
      head: ['Asset', 'Long-term after', 'STCG rate', 'LTCG rate'],
      rows: [
        ['Listed shares, equity MFs, equity ETFs (STT paid)', '12 months', '20% (s.111A)', '12.5% above ₹1.25 lakh (s.112A)'],
        ['Debt mutual funds bought on or after 1 Apr 2023', 'Never (s.50AA)', 'Slab rate', 'Slab rate'],
        ['Debt funds bought before 1 Apr 2023', '24 months', 'Slab rate', '12.5%'],
        ['House, flat, land', '24 months', 'Slab rate', '12.5%, or 20% with indexation if bought before 23 Jul 2024'],
        ['Gold, unlisted shares, bonds, REIT/InvIT units', '24 months (12 for listed bonds/units)', 'Slab rate', '12.5%'],
        ['Crypto and other virtual digital assets', 'Not applicable', '30% flat (s.115BBH)', '30% flat'],
      ],
    },
    bullets: [
      'Health and education cess of 4% is added to every rate above.',
      'Surcharge on gains under sections 111A and 112A is capped at 15% even for incomes above ₹2 crore.',
      'The ₹1.25 lakh exemption is per financial year, across all equity shares and equity funds together.',
    ],
  },
  {
    heading: 'How the calculator classifies your gain',
    paragraphs: [
      'The calculator counts the holding period from the purchase date to the sale date and compares it with the limit for the asset: 12 months for listed equity, 24 months for property and most other assets. If the asset was held for more than that period the gain is long-term. Capital gain is sale price minus transfer expenses (brokerage, STT is not deductible, stamp duty, legal fees) minus cost of acquisition, plus any cost of improvement for property.',
      'For debt mutual funds the purchase date matters more than the holding period: units bought on or after 1 April 2023 are always taxed at slab rate under section 50AA, whichever year you sell. For property bought before 23 July 2024, resident individuals and HUFs may choose the older 20% rate with indexation if it produces less tax; the calculator computes both and applies the lower.',
    ],
  },
  {
    heading: 'Worked example: shares and equity mutual funds',
    paragraphs: [
      'Long-term: you bought equity mutual fund units for ₹5,00,000 in January 2023 and redeemed them for ₹8,00,000 in August 2025. Held more than 12 months, so the ₹3,00,000 gain is long-term. Subtract the ₹1,25,000 exemption, leaving ₹1,75,000 taxable at 12.5% = ₹21,875, plus 4% cess ₹875, total ₹22,750.',
      'Short-term: the same ₹3,00,000 gain on shares sold within 12 months is taxed at 20% = ₹60,000, plus cess ₹2,400, total ₹62,400. No exemption applies to short-term gains, and the basic exemption limit can be used only by residents whose other income is below it.',
      'Shares bought before 1 February 2018 use the higher of the actual cost and the fair market value on 31 January 2018 as cost (the grandfathering rule), which is why long-term gains on very old holdings are often smaller than the raw sale price suggests.',
    ],
  },
  {
    heading: 'Worked example: property bought before 23 July 2024',
    paragraphs: [
      'You bought a flat in FY 2010-11 for ₹30,00,000 and sell it in FY 2025-26 for ₹90,00,000 with ₹1,00,000 of brokerage. Cost Inflation Index is 167 for 2010-11 and 376 for 2025-26.',
      'Option 1, 12.5% without indexation: gain = ₹90,00,000 − ₹1,00,000 − ₹30,00,000 = ₹59,00,000. Tax = ₹7,37,500 plus cess ₹29,500 = ₹7,67,000.',
      'Option 2, 20% with indexation: indexed cost = ₹30,00,000 × 376 ÷ 167 = ₹67,54,491. Indexed gain = ₹89,00,000 − ₹67,54,491 = ₹21,45,509. Tax = ₹4,29,102 plus cess ₹17,164 = ₹4,46,266. The indexed option is lower by over ₹3.2 lakh, so the calculator applies it. For property bought recently, where prices have not outrun inflation, the 12.5% route usually wins.',
      'Property bought before 1 April 2001 can use its fair market value on that date as cost, subject to the stamp duty value on that date. If the sale price is below the stamp duty value by more than 10%, the stamp duty value is treated as the sale price under section 50C.',
    ],
  },
  {
    heading: 'Exemptions that can reduce property and other gains',
    bullets: [
      'Section 54: long-term gain from a residential house reinvested in one new residential house in India (two houses once in a lifetime if the gain is up to ₹2 crore) within 1 year before or 2 years after sale, or constructed within 3 years. Exemption capped at ₹10 crore.',
      'Section 54F: long-term gain from any asset other than a house, where the whole net sale consideration is invested in a residential house; you must not own more than one other house on the sale date.',
      'Section 54EC: up to ₹50 lakh of gain from land or building invested in REC, PFC, IRFC or NHAI bonds within 6 months; 5-year lock-in, interest taxable.',
      'Capital Gains Account Scheme: park unspent amounts in a CGAS account before the ITR due date to keep the exemption while you find a property.',
      'None of these apply to short-term gains or to equity gains under section 112A, except 54F for reinvesting in a house.',
    ],
  },
  {
    heading: 'Losses, set-off and carry forward',
    paragraphs: [
      'Short-term capital loss can be set off against any capital gain, short or long-term. Long-term capital loss can be set off only against long-term gains. Losses that cannot be absorbed this year can be carried forward for 8 assessment years, but only if the return is filed by the due date under section 139(1). Capital losses cannot be set off against salary, business or other income, and the ₹1.25 lakh equity exemption is applied after set-off, so booking losses before March can save real tax.',
    ],
  },
  {
    heading: 'Reporting and paying tax on capital gains',
    paragraphs: [
      'Capital gains go in Schedule CG of ITR-2 (or ITR-3 if you also have business income); ITR-1 allows only long-term equity gains up to ₹1.25 lakh with no loss to carry forward. Since no TDS is deducted on gains by Indian residents, tax must be paid as advance tax in the instalment following the sale; a gain in November, for instance, is payable with the 15 December instalment. Reconcile your broker\'s capital gains statement and mutual fund CAS with the AIS before filing, because mismatches trigger notices. Buyers of property from an NRI deduct TDS under section 195 on the whole consideration unless a lower-deduction certificate is obtained.',
    ],
  },
]

const CAPITAL_GAINS_FAQS = [
  { q: 'What is the LTCG tax rate on shares in FY 2025-26?', a: '12.5% on long-term gains above ₹1,25,000 in the year for listed shares and equity mutual funds where STT is paid, plus 4% cess. Gains up to ₹1.25 lakh are exempt, and holdings older than 31 January 2018 use the grandfathered cost.' },
  { q: 'What is the STCG rate on equity in FY 2025-26?', a: '20% plus 4% cess on gains from listed shares and equity funds sold within 12 months of purchase, effective for sales on or after 23 July 2024. There is no exemption threshold for short-term gains, though residents can absorb them against unused basic exemption.' },
  { q: 'Is indexation still available on property sold in 2025-26?', a: 'Only for property bought before 23 July 2024 and sold by a resident individual or HUF, who can choose 20% with indexation if it gives less tax than 12.5% without indexation. Property bought after that date, and all other assets, are taxed at 12.5% without indexation.' },
  { q: 'How are debt mutual funds taxed now?', a: 'Debt funds bought on or after 1 April 2023 are taxed at your slab rate however long you hold them, under section 50AA. Units bought before that date become long-term after 24 months and are taxed at 12.5% without indexation when sold on or after 23 July 2024.' },
  { q: 'What is the holding period for long-term capital gains?', a: '12 months for listed shares, equity mutual funds, listed bonds and units of REITs and InvITs; 24 months for property, gold, unlisted shares and every other asset. The asset must be held for more than the period, so shares bought on 1 April and sold on 1 April next year are still short-term.' },
  { q: 'Can I save capital gains tax by buying another house?', a: 'Yes, section 54 exempts long-term gains from a residential house reinvested in another house within two years (three for construction), and section 54F does the same for gains from other assets if the entire sale amount is reinvested. Alternatively invest up to ₹50 lakh in 54EC bonds within six months.' },
  { q: 'Do I need to pay advance tax on capital gains?', a: 'Yes, if your total tax after TDS exceeds ₹10,000, the tax on a gain is due with the next advance tax instalment after the sale. No interest under section 234C is charged for instalments before the sale date as long as the tax is paid in the remaining instalments.' },
  { q: 'Which ITR form is used for capital gains?', a: 'ITR-2 for salaried and other individuals with capital gains, and ITR-3 if you also have business or F&O income. ITR-1 can be used only if long-term equity gains under section 112A are up to ₹1.25 lakh and there is no loss to carry forward.' },
]

const GST_SECTIONS: CalcSection[] = [
  {
    heading: 'How to add or remove GST from a price',
    paragraphs: [
      'GST is charged on the taxable value of a supply, so an exclusive price is simply multiplied by the rate: ₹10,000 at 18% adds ₹1,800 of GST for an invoice total of ₹11,800. Extracting GST from an inclusive price works in reverse: divide by (1 + rate). A consumer price of ₹11,800 at 18% contains a taxable value of ₹11,800 ÷ 1.18 = ₹10,000 and GST of ₹1,800. A common mistake is to take 18% of the inclusive price (₹2,124), which overstates the tax.',
      'Set the toggle to "Inclusive" when you are quoting a final price to customers, reconciling a receipt, or working out how much tax is embedded in an MRP. Set it to "Exclusive" when raising a tax invoice from a base price or a rate contract. The calculator also shows the same amount at every standard slab so you can see the effect of a rate change on your pricing.',
    ],
  },
  {
    heading: 'GST rate slabs and what falls in each',
    table: {
      head: ['Rate', 'Typical goods and services'],
      rows: [
        ['0% (nil / exempt)', 'Fresh fruit and vegetables, milk, unbranded food grains, education, healthcare, residential rent'],
        ['5%', 'Packaged food, restaurants (no ITC), economy air travel, transport of goods, life-saving drugs, footwear and apparel below thresholds'],
        ['12%', 'Processed foods, business-class air travel, some construction materials, works contracts for government'],
        ['18%', 'Most services (professional fees, software, telecom), electronics, cosmetics, capital goods, financial services'],
        ['28%', 'Luxury and sin goods: cars, tobacco, aerated drinks, air conditioners and large appliances; often with compensation cess'],
        ['0.25% / 1.5% / 3%', 'Rough diamonds, cut and polished diamonds, gold and silver jewellery (use the custom rate option)'],
      ],
    },
    paragraphs: [
      'Rates are set by the GST Council against the HSN or SAC code of the item, not by the industry you are in. Always confirm the code on the supplier\'s invoice or the CBIC rate schedule; the Council has been consolidating slabs (with a two-rate structure of 5% and 18% announced in September 2025 and a special rate for sin goods), so check the current notified rate for your HSN before printing a rate card.',
    ],
  },
  {
    heading: 'CGST and SGST versus IGST',
    paragraphs: [
      'India\'s GST is a dual tax. When the supplier and the place of supply are in the same state or union territory, the rate is split equally into Central GST and State GST (or UTGST): an 18% supply becomes 9% CGST plus 9% SGST, shown as two lines on the invoice. When the place of supply is in another state, the whole 18% is charged as Integrated GST and the Centre later apportions it to the destination state.',
      'The total tax is identical either way; what changes is how you use input tax credit. IGST credit can be set off against IGST, then CGST, then SGST. CGST credit cannot be used against SGST and vice versa, so a Panchkula business buying from Delhi vendors and selling in Haryana can end up with unusable IGST unless it plans purchases carefully.',
      'Place of supply follows detailed rules: for goods it is normally where delivery ends, for services the recipient\'s registered address, and for events, property and transport, the location of the event, property or where the journey begins. Exporters charge zero-rated IGST and claim refunds.',
    ],
  },
  {
    heading: 'Worked example: a ₹50,000 consulting invoice',
    paragraphs: [
      'A Chandigarh consultant bills a Mohali client ₹50,000 for services (SAC 9983, 18%). Both are in Punjab, so the invoice shows taxable value ₹50,000, CGST 9% ₹4,500, SGST 9% ₹4,500, total ₹59,000. If the client were in Delhi, the invoice would show IGST 18% ₹9,000 and the same ₹59,000 total.',
      'If the consultant had agreed an all-inclusive fee of ₹59,000, the taxable value is ₹59,000 ÷ 1.18 = ₹50,000 and the GST is ₹9,000, exactly the figures above. The client, if registered, pays ₹59,000 but recovers ₹9,000 as input tax credit, so the net cost to the client is ₹50,000; to an unregistered client the tax is a real cost.',
    ],
  },
  {
    heading: 'Who has to register and charge GST',
    bullets: [
      'Registration is compulsory when aggregate turnover crosses ₹40 lakh for goods (₹20 lakh in special category states) or ₹20 lakh for services (₹10 lakh in special category states). Check the current threshold for your state.',
      'Inter-state supply of goods, e-commerce sellers and businesses liable for reverse charge must register regardless of turnover.',
      'Composition scheme: manufacturers and traders up to ₹1.5 crore pay 1% of turnover, restaurants 5%, and service providers up to ₹50 lakh pay 6%; they cannot charge GST on invoices or claim input credit.',
      'Once registered, file GSTR-1 by the 11th and GSTR-3B by the 20th of the following month (quarterly under QRMP if turnover is up to ₹5 crore), and the annual GSTR-9 by 31 December.',
      'Late filing costs ₹50 a day (₹20 for nil returns) plus 18% interest on tax paid late.',
    ],
  },
  {
    heading: 'Invoice checklist so your customer gets input tax credit',
    bullets: [
      'Your GSTIN, the customer\'s GSTIN, invoice number and date, HSN/SAC code with the applicable rate.',
      'Taxable value, and the CGST/SGST or IGST amounts as separate lines; never show a single "GST 18%" line on a B2B invoice.',
      'Place of supply and whether reverse charge applies.',
      'E-invoicing is mandatory if turnover exceeded ₹5 crore in any year since 2017-18; the IRN and QR code must appear on the invoice.',
      'Report the invoice in GSTR-1 on time so it appears in the customer\'s GSTR-2B; credit is only allowed for invoices that show up there.',
    ],
  },
]

const GST_FAQS = [
  { q: 'How do I calculate GST on an amount?', a: 'Multiply the taxable value by the rate: ₹10,000 at 18% is ₹1,800 of GST, giving a total of ₹11,800. For intra-state sales split the ₹1,800 equally as CGST ₹900 and SGST ₹900; for inter-state sales charge IGST ₹1,800.' },
  { q: 'How do I remove GST from an inclusive price?', a: 'Divide the inclusive price by (1 + rate ÷ 100). A price of ₹11,800 including 18% GST contains a taxable value of ₹10,000 and ₹1,800 of tax. Do not take 18% of ₹11,800, which would wrongly give ₹2,124.' },
  { q: 'What is the difference between CGST, SGST and IGST?', a: 'CGST and SGST are charged together, half each, when the supplier and place of supply are in the same state; IGST is charged at the full rate on inter-state supplies, imports and exports. The total tax is the same, only the beneficiary government and the credit set-off rules differ.' },
  { q: 'What are the GST rates in India?', a: 'The main slabs are 0%, 5%, 12%, 18% and 28%, with special rates of 0.25% for rough diamonds, 3% for gold and 1.5% for polished diamonds. Rates attach to the HSN or SAC code, and the GST Council has announced a consolidation towards 5% and 18%, so verify the current notified rate for your item.' },
  { q: 'Is GST charged on the MRP?', a: 'No, the MRP already includes GST, so a retailer cannot add GST on top of it. To find the tax inside an MRP, divide by (1 + rate); an MRP of ₹500 at 12% contains ₹53.57 of GST and a taxable value of ₹446.43.' },
  { q: 'When is GST registration mandatory?', a: 'When aggregate turnover exceeds ₹40 lakh for goods or ₹20 lakh for services in most states (₹20 lakh and ₹10 lakh in special category states), or immediately for inter-state supply of goods, e-commerce sellers and reverse-charge cases. Voluntary registration is allowed below the threshold to claim input credit.' },
  { q: 'Can I claim input tax credit on the GST I pay?', a: 'Yes, a registered business can set off GST paid on business purchases against GST collected on sales, provided the supplier has filed GSTR-1 and the invoice appears in your GSTR-2B. Credit is blocked on items such as personal vehicles, food and beverages, club memberships and construction of immovable property.' },
]

const TDS_SECTIONS: CalcSection[] = [
  {
    heading: 'What TDS is and who must deduct it',
    paragraphs: [
      'Tax Deducted at Source makes the payer collect income tax on behalf of the recipient. When you pay rent, professional fees, contractor bills, commission or interest above the threshold for that section, you deduct tax at the prescribed rate, deposit it with the government and report it in a quarterly TDS return; the recipient gets credit in Form 26AS and adjusts it against their own tax.',
      'Companies, firms, LLPs and all businesses with a TAN must deduct TDS on the payments covered below. Individuals and HUFs deduct only if they were liable to tax audit in the previous year, with three exceptions that apply to everyone: rent above ₹50,000 a month (section 194-IB), purchase of property of ₹50 lakh or more (194-IA) and payments to contractors or professionals for personal purposes above ₹50 lakh a year (194M). These three use the PAN-based forms 26QC, 26QB and 26QD and need no TAN.',
    ],
  },
  {
    heading: 'TDS rate chart for FY 2025-26',
    paragraphs: ['Budget 2025 raised several thresholds from 1 April 2025. The most common sections are:'],
    table: {
      head: ['Section', 'Nature of payment', 'Rate', 'Threshold'],
      rows: [
        ['192', 'Salary', 'Slab rate on estimated income', 'Basic exemption limit'],
        ['194A', 'Interest from banks, post office, co-operatives', '10%', '₹50,000 (₹1,00,000 for senior citizens); ₹10,000 for other payers'],
        ['194C', 'Contractor and sub-contractor payments', '1% individual/HUF, 2% others', '₹30,000 per bill or ₹1,00,000 in the year'],
        ['194H', 'Commission and brokerage', '2%', '₹20,000'],
        ['194I', 'Rent (businesses)', '2% plant and machinery, 10% land, building, furniture', '₹6,00,000 a year'],
        ['194-IB', 'Rent paid by individuals/HUF not under audit', '2%', '₹50,000 a month'],
        ['194J', 'Professional fees / technical services', '10% professional, 2% technical', '₹50,000 a year each'],
        ['194-IA', 'Purchase of immovable property', '1%', '₹50,00,000 consideration or stamp duty value'],
        ['194Q', 'Purchase of goods (buyer turnover above ₹10 crore)', '0.1% on the excess', '₹50,00,000 per seller'],
        ['194S', 'Transfer of crypto / virtual digital assets', '1%', '₹50,000 (specified persons) / ₹10,000'],
        ['194', 'Dividend', '10%', '₹10,000'],
      ],
    },
    bullets: [
      'No surcharge or cess is added to TDS on payments to residents; for non-residents under section 195, surcharge and cess apply.',
      'Rates double to 20% (or the section rate if higher) when the deductee has no PAN or an inoperative PAN (section 206AA); for 194Q the no-PAN rate is 5%.',
      'Form 15G/15H lets eligible individuals receive interest without TDS; a section 197 certificate allows lower or nil deduction on any payment.',
    ],
  },
  {
    heading: 'Worked examples',
    paragraphs: [
      'Professional fees: you pay a designer ₹60,000 in the year. This exceeds the ₹50,000 threshold under section 194J, so deduct 10% = ₹6,000 and pay ₹54,000. Had the designer not shared a PAN, the deduction would be 20% = ₹12,000.',
      'Contractor: a single bill of ₹40,000 from a proprietorship contractor exceeds the ₹30,000 per-bill limit under 194C, so deduct 1% = ₹400 (2% or ₹800 if the contractor were a company). Once the yearly total crosses ₹1,00,000, every bill is liable, including earlier small ones.',
      'Rent above ₹50,000 a month: a salaried tenant paying ₹60,000 a month deducts 2% of the year\'s rent (₹7,20,000 × 2% = ₹14,400) in March or the last month of tenancy, files Form 26QC within 30 days and gives the landlord Form 16C.',
      'Property purchase: on a flat costing ₹75,00,000 the buyer deducts 1% = ₹75,000 on each payment made to the seller, deposits it through Form 26QB within 30 days of the end of that month, and issues Form 16B. If the seller is an NRI, section 195 applies instead at the capital gains rate on the whole amount.',
    ],
  },
  {
    heading: 'When TDS must be deposited and reported',
    bullets: [
      'Deposit by the 7th of the month after deduction; TDS for March is due by 30 April. Use challan ITNS 281 (or the PAN-based 26QB/26QC/26QD forms).',
      'Quarterly returns: Form 24Q for salary and 26Q for other resident payments, due 31 July, 31 October, 31 January and 31 May for the four quarters; 27Q for non-residents.',
      'Issue Form 16 (salary) by 15 June and Form 16A (others) within 15 days of the return due date so recipients can claim credit.',
      'Interest for late deduction is 1% per month from the date the tax was deductible to the date it is deducted; for late deposit it is 1.5% per month from the date of deduction to the date of payment, counting part months as full.',
      'Late-filing fee under section 234E is ₹200 per day up to the TDS amount, plus a penalty of ₹10,000 to ₹1,00,000 under section 271H if the return is more than a year late.',
      'Expenses on which TDS was not deducted or deposited are disallowed to the extent of 30% under section 40(a)(ia) when computing business income.',
    ],
  },
  {
    heading: 'TDS on salary: how section 192 differs',
    paragraphs: [
      'Salary TDS is not a flat rate. The employer estimates your annual income, applies the regime you chose (new by default), subtracts standard deduction and declared investments, and spreads the resulting tax evenly across the remaining months. That is why the deduction jumps in January to March if your investment proofs fall short of the declaration. Use the income tax calculator to estimate the annual figure; divide by 12 for an approximate monthly TDS. From FY 2024-25 employers must also give credit for TCS and other TDS if you declare them in Form 12BB.',
    ],
  },
  {
    heading: 'How to check and claim TDS credit',
    paragraphs: [
      'Every deduction appears in your Form 26AS and AIS on the income-tax portal within a few weeks of the deductor filing its return. Match the figures with your Form 16/16A before filing the ITR; if a deductor has not filed, the credit will not show and you should follow up rather than claim it blindly, as a mismatch delays the refund. Excess TDS, common for freelancers and fixed-deposit investors whose income is below the taxable limit, is refunded after the return is processed, with 0.5% per month interest under section 244A.',
    ],
  },
]

const TDS_FAQS = [
  { q: 'What is the TDS rate on professional fees in FY 2025-26?', a: '10% under section 194J when fees for professional services exceed ₹50,000 in the year; 2% for technical services, call centres and royalty for films. Without the payee\'s PAN the rate rises to 20%.' },
  { q: 'What is the TDS rate on rent?', a: '10% for land, building or furniture and 2% for plant and machinery under section 194I when annual rent exceeds ₹6,00,000, applicable to businesses and audited individuals. Individuals and HUFs not under audit deduct 2% under section 194-IB when monthly rent exceeds ₹50,000, once a year in the last month.' },
  { q: 'What happens if the deductee does not have a PAN?', a: 'TDS must be deducted at 20% or the normal rate, whichever is higher, under section 206AA (5% for purchase of goods under 194Q). The same applies if the PAN is inoperative because it is not linked to Aadhaar, and the deductee cannot claim the credit until the PAN is fixed.' },
  { q: 'When is TDS on contractor payments required?', a: 'Section 194C applies when a single payment exceeds ₹30,000 or total payments to the contractor in the year exceed ₹1,00,000. The rate is 1% if the contractor is an individual or HUF and 2% for companies, firms and others, and once the limit is crossed TDS applies to the entire amount.' },
  { q: 'By when must TDS be deposited?', a: 'By the 7th of the following month for April to February deductions and by 30 April for March. Property (26QB), rent (26QC) and 194M (26QD) payments are due within 30 days of the end of the month of deduction. Late deposit attracts 1.5% interest per month.' },
  { q: 'Is TDS deducted on property purchase?', a: 'Yes, 1% under section 194-IA when the consideration or stamp duty value is ₹50 lakh or more, deducted by the buyer from each payment and deposited through Form 26QB. No TAN is needed; if the seller is a non-resident, section 195 applies at the capital gains rate instead.' },
  { q: 'Can I get a refund of excess TDS?', a: 'Yes, TDS is only an advance collection; if your final tax is lower, the excess is refunded after you file the ITR, with 0.5% per month interest under section 244A. To avoid the deduction in the first place, submit Form 15G/15H for interest or obtain a lower-deduction certificate under section 197.' },
  { q: 'What is the penalty for late filing of TDS returns?', a: '₹200 per day under section 234E until the return is filed, capped at the TDS amount, plus a possible penalty of ₹10,000 to ₹1,00,000 under section 271H if the delay exceeds one year or the return has wrong PANs. Interest on late deduction or deposit is charged separately.' },
]

const ADVANCE_TAX_SECTIONS: CalcSection[] = [
  {
    heading: 'Who has to pay advance tax',
    paragraphs: [
      'Advance tax is income tax paid during the year instead of at filing time. Section 208 makes it compulsory for anyone whose tax liability for the year, after subtracting TDS and TCS, is ₹10,000 or more. That covers freelancers and consultants, F&O and intraday traders, landlords, people with large interest or dividend income, anyone who booked capital gains, and salaried employees whose side income is not covered by the employer\'s TDS.',
      'Resident senior citizens (60 and above) with no business or professional income are exempt, even if their pension and interest income is large. Everyone else must estimate income for the full year, compute the tax under their chosen regime, subtract expected TDS, and pay the balance in four instalments.',
    ],
  },
  {
    heading: 'Advance tax due dates and instalments for FY 2025-26',
    table: {
      head: ['Due date', 'Cumulative tax to be paid', 'Instalment share'],
      rows: [
        ['15 June 2025', '15% of total advance tax', '15%'],
        ['15 September 2025', '45%', '30%'],
        ['15 December 2025', '75%', '30%'],
        ['15 March 2026', '100%', '25%'],
      ],
    },
    bullets: [
      'Taxpayers under presumptive schemes 44AD (business) and 44ADA (profession) pay the entire amount in one instalment by 15 March.',
      'Tax paid by 31 March still counts as advance tax for the year, but interest under 234C runs for the March instalment.',
      'If the 15th is a bank holiday, payment on the next working day is accepted.',
      'Pay online through the e-Filing portal (e-Pay Tax) using challan 280, minor head 100 (advance tax), assessment year 2026-27.',
    ],
  },
  {
    heading: 'Worked example: F&O trader with ₹15 lakh profit',
    paragraphs: [
      'Suppose you expect ₹15,00,000 of F&O and business profit plus ₹50,000 of interest in FY 2025-26, choose the new regime and have no TDS. There is no standard deduction because there is no salary, so taxable income is ₹15,50,000. Tax = ₹20,000 (5% slab) + ₹40,000 (10% slab) + ₹52,500 (15% on ₹3,50,000) = ₹1,12,500, plus 4% cess ₹4,500 = ₹1,17,000.',
      'The instalments are: ₹17,550 by 15 June (15%), a further ₹35,100 by 15 September (cumulative ₹52,650), ₹35,100 more by 15 December (cumulative ₹87,750) and the final ₹29,250 by 15 March. If profits turn out higher or lower during the year, revise the estimate and adjust the remaining instalments; the law expects a reasonable estimate, not a perfect one.',
      'If the same trader opted for section 44AD and declared 6% of a ₹2 crore digital turnover (₹12,00,000), the tax after the 87A rebate would be nil, and even if it were not, the whole amount could be paid by 15 March.',
    ],
  },
  {
    heading: 'Interest under section 234C for late or short instalments',
    paragraphs: [
      'Section 234C charges simple interest at 1% per month on any shortfall in an instalment, for three months on the June, September and December instalments and one month on the March instalment. In the example above, skipping the June instalment entirely costs about ₹525 (₹17,500 × 1% × 3, after rounding the shortfall down to the nearest hundred). Missing all four would cost roughly ₹4,400.',
      'Two safe harbours soften the first instalments: no interest is charged for June if at least 12% of the total has been paid, and none for September if at least 36% has been paid. Interest is also not charged on the shortfall caused by capital gains, lottery winnings or new business income that arose after an instalment date, provided the tax on that income is paid in the next instalment.',
      'Section 234B is separate: if less than 90% of the total tax is paid as advance tax by 31 March, interest of 1% per month runs from 1 April until the return is filed and the balance paid. Together, 234B and 234C can add 6 to 10% to a bill that is paid a year late.',
    ],
  },
  {
    heading: 'Salaried employees: when TDS is not enough',
    paragraphs: [
      'Your employer deducts TDS only on salary, so tax on bank interest, rent, dividends, capital gains or freelance income must be paid separately once the shortfall crosses ₹10,000. The simplest route is to declare the other income to your employer in Form 12BB so it is added to the TDS; otherwise pay advance tax yourself on the schedule above. A common surprise is equity gains booked in March, on which the tax is due by 15 March if the sale happened before, or with the return (with 234B interest only if the total shortfall exceeds 10%) if the sale came later.',
    ],
  },
  {
    heading: 'How to estimate income by head',
    bullets: [
      'Salary: gross salary for the year from your latest payslip times 12, adjusted for expected increments and bonus; TDS from the payslip counts against the tax.',
      'Business or profession: expected net profit after expenses; for presumptive schemes, 6% or 8% of turnover (44AD) or 50% of receipts (44ADA).',
      'Capital gains: gains booked so far plus any planned sales; use the capital gains calculator for special-rate tax and add it here.',
      'Other sources: interest on FDs and savings, dividends, and rent after the 30% standard deduction and municipal taxes.',
      'Deductions: 80C, 80D and others are available only in the old regime; the new regime allows the standard deduction (salary) and employer NPS.',
      'Reduce the total by TDS and TCS actually expected, including TDS on interest, dividends and rent, not just salary.',
    ],
  },
  {
    heading: 'Refunds, revisions and paying after the year ends',
    paragraphs: [
      'Paying too much advance tax is not wasted: the excess is refunded after the return is processed, with 0.5% per month interest under section 244A from 1 April. Paying too little is fixed by paying self-assessment tax (challan 280, minor head 300) before filing, together with 234B and 234C interest calculated in the ITR utility. Keep the challan receipts and check that each payment appears in Form 26AS or AIS under the right assessment year before you file, since a wrong year is the most common reason for advance tax credit going missing.',
    ],
  },
]

const ADVANCE_TAX_FAQS = [
  { q: 'Who is required to pay advance tax?', a: 'Anyone whose income tax for the year, after deducting TDS and TCS, is ₹10,000 or more, including freelancers, traders, landlords and salaried people with untaxed side income. Resident senior citizens with no business or professional income are exempt.' },
  { q: 'What are the advance tax due dates for FY 2025-26?', a: '15 June (15% of the tax), 15 September (45% cumulative), 15 December (75%) and 15 March 2026 (100%). Taxpayers under the presumptive schemes 44AD and 44ADA pay the whole amount by 15 March.' },
  { q: 'How is interest under section 234C calculated?', a: '1% simple interest per month on the shortfall in each instalment: three months for the June, September and December instalments and one month for March. No interest applies to the June and September instalments if at least 12% and 36% of the tax has been paid by then.' },
  { q: 'What is the difference between 234B and 234C interest?', a: '234C penalises late or short instalments during the year at 1% per month for one to three months. 234B applies when less than 90% of the total tax is paid by 31 March, charging 1% per month from 1 April until the balance is paid. Both can apply to the same shortfall.' },
  { q: 'Do salaried employees need to pay advance tax?', a: 'Only if tax on income outside salary, such as interest, rent, capital gains or freelance work, exceeds ₹10,000 after TDS. Employers deduct TDS on salary alone, though you can declare other income in Form 12BB and let the employer deduct the extra tax monthly.' },
  { q: 'Is advance tax payable on capital gains?', a: 'Yes, the tax on a gain is due with the first instalment after the sale date; a gain in October is payable by 15 December. Section 234C interest is not charged for instalments that fell before the sale, as long as the tax is paid in the remaining instalments.' },
  { q: 'How do I pay advance tax online?', a: 'Log in to the income-tax e-Filing portal, choose e-Pay Tax, select assessment year 2026-27 and "Advance Tax (100)", and pay through net banking, UPI, debit card or at a bank counter. The challan appears in Form 26AS within a few days and is claimed in the ITR.' },
  { q: 'What if I paid more advance tax than needed?', a: 'The excess is refunded after your return is processed, with interest of 0.5% per month under section 244A from 1 April. You can also reduce later instalments once you see the estimate was high, since the law only requires a reasonable estimate at each date.' },
]

const TAKE_HOME_SECTIONS: CalcSection[] = [
  {
    heading: 'CTC, gross salary and in-hand: what the numbers mean',
    paragraphs: [
      'Cost to company is everything your employer spends on you: cash salary, the employer\'s provident fund share, gratuity provision, insurance premiums and sometimes variable pay. Gross salary is the cash portion before deductions. In-hand or take-home salary is what reaches your bank account after the employee\'s PF share, professional tax and income tax (TDS) are subtracted. For a ₹12 lakh CTC the in-hand figure is typically ₹95,000 to ₹97,000 a month, not ₹1,00,000.',
      'This calculator rebuilds a typical Indian salary structure from your CTC: basic at 40% of CTC, HRA at 50% of basic, employer PF at 12% of basic (capped at ₹1,800 a month if your company applies the ₹15,000 wage ceiling), an optional gratuity provision of 4.81% of basic, and the balance as special allowance. It then computes income tax under the new regime for FY 2025-26 and gives monthly and annual figures.',
    ],
  },
  {
    heading: 'The components explained',
    bullets: [
      'Basic salary: the fixed core of pay, usually 40 to 50% of CTC. PF, gratuity and HRA limits are all calculated on it, so a higher basic means more retirement savings and a larger HRA exemption but slightly lower cash in hand.',
      'HRA: typically 40 or 50% of basic. Fully taxable under the new regime; partly exempt under the old regime if you pay rent.',
      'Special allowance: the balancing figure that makes the components add up to the cash CTC; fully taxable.',
      'Employer PF: 12% of basic, of which 8.33% (capped at ₹1,250) goes to the pension scheme. Many employers cap contributions at the ₹15,000 wage ceiling, giving ₹1,800 a month; others contribute on full basic.',
      'Employee PF: your own 12% of basic, deducted from gross. It is a saving, not a tax, and earns tax-free interest (8.25% for 2024-25).',
      'Professional tax: a state levy, at most ₹2,500 a year, deducted monthly in states such as Punjab, Maharashtra, Karnataka, West Bengal and Gujarat; there is none in Delhi, Haryana, Uttar Pradesh, Rajasthan or Chandigarh.',
      'Gratuity: 4.81% of basic set aside by many employers as part of CTC, payable only after 5 years of service.',
    ],
  },
  {
    heading: 'Worked example: ₹12 lakh CTC',
    paragraphs: [
      'Basic = 40% × ₹12,00,000 = ₹4,80,000 (₹40,000 a month). HRA = 50% of basic = ₹2,40,000. Employer PF, capped at ₹1,800 a month, = ₹21,600 and is included in CTC, so the cash gross salary is ₹12,00,000 − ₹21,600 = ₹11,78,400. Special allowance is the balance: ₹11,78,400 − ₹4,80,000 − ₹2,40,000 = ₹4,58,400.',
      'Income tax: gross ₹11,78,400 less standard deduction ₹75,000 = ₹11,03,400 taxable. Slab tax would be ₹20,000 + ₹30,340 = ₹50,340, but taxable income is below ₹12 lakh so the 87A rebate makes it nil. Deductions are therefore only employee PF ₹21,600 and professional tax ₹2,500, giving an annual in-hand of ₹11,54,300, or about ₹96,190 a month (96% of CTC).',
    ],
  },
  {
    heading: 'Worked example: ₹20 lakh CTC',
    paragraphs: [
      'Basic ₹8,00,000, HRA ₹4,00,000, employer PF capped at ₹21,600, gross ₹19,78,400, special allowance ₹7,78,400. Taxable income after the ₹75,000 standard deduction is ₹19,03,400. Tax = ₹20,000 + ₹40,000 + ₹60,000 + 20% of ₹3,03,400 (₹60,680) = ₹1,80,680, plus 4% cess ₹7,227 = ₹1,87,907. Annual in-hand = ₹19,78,400 − ₹21,600 − ₹2,500 − ₹1,87,907 = ₹17,66,393, roughly ₹1,47,200 a month or 88% of CTC. Employer TDS will spread the ₹1,87,907 across 12 months as about ₹15,660.',
    ],
  },
  {
    heading: 'Why your payslip may differ from the calculator',
    bullets: [
      'Variable pay, joining bonus and retention bonus are usually paid separately and taxed in the month received.',
      'Some companies compute PF on full basic (12% of ₹40,000 = ₹4,800 a month) rather than the ₹1,800 cap; untick the cap toggle to see that case.',
      'Flexible benefits such as meal cards, fuel, telephone and books reduce taxable salary under the old regime only.',
      'Employer NPS under section 80CCD(2), up to 14% of basic, is deductible even under the new regime and is the single biggest lever to raise post-tax income for higher earners.',
      'If you declared the old regime with HRA, 80C and home loan interest, TDS may be lower or higher than the new regime figure shown here; compare with the income tax calculator.',
      'Taxes are deducted evenly across months, but if you join mid-year or change jobs the employer\'s TDS may be too low, leaving tax to pay at filing.',
    ],
  },
  {
    heading: 'How to increase your take-home legally',
    paragraphs: [
      'Ask HR for a higher share of employer NPS (80CCD(2)), which is deductible in both regimes and comes off the taxable salary directly. If you pay rent, keep HRA at 50% of basic and compare the old regime. Use the ₹12 lakh rebate threshold: a taxpayer at ₹12,60,000 taxable income pays about ₹60,000 more than one at ₹12,00,000 despite marginal relief, so an extra ₹60,000 of employer NPS can wipe out the entire tax bill. Finally, check that professional tax and PF are being deducted correctly; errors here are common in small companies and can be corrected through Form 12BB or a revised payslip.',
    ],
  },
]

const TAKE_HOME_FAQS = [
  { q: 'What is the in-hand salary for a ₹12 lakh CTC?', a: 'About ₹96,000 a month under the new regime for FY 2025-26, assuming basic at 40% of CTC, employer PF of ₹1,800 a month included in CTC and professional tax of ₹2,500 a year. Income tax is nil because taxable income after the ₹75,000 standard deduction stays below ₹12 lakh.' },
  { q: 'How much is the in-hand salary for ₹20 lakh CTC?', a: 'Roughly ₹1,47,000 a month: gross cash salary of about ₹19.78 lakh less employee PF ₹21,600, professional tax ₹2,500 and new-regime income tax of about ₹1,88,000 including cess. A higher basic or full-basic PF would lower the cash figure but raise retirement savings.' },
  { q: 'What is the difference between CTC and gross salary?', a: 'CTC includes the employer\'s PF contribution, gratuity provision and other benefits on top of cash salary, while gross salary is only the cash components before deductions. In-hand salary is gross minus employee PF, professional tax and TDS, and is usually 85 to 96% of CTC.' },
  { q: 'Is employer PF part of CTC?', a: 'Yes, in most Indian offer letters the employer\'s 12% PF contribution is counted inside CTC, so it reduces the cash you receive. Some employers add it over and above CTC; untick the toggle in the calculator if that applies to you.' },
  { q: 'Why is PF ₹1,800 per month?', a: 'The EPF Act requires contributions on wages up to ₹15,000 a month, and 12% of ₹15,000 is ₹1,800. Employers can restrict both shares to this ceiling even if basic is higher, though many contribute 12% of actual basic. Employee share is deducted from salary; employer share is a separate cost.' },
  { q: 'Is professional tax the same in every state?', a: 'No, each state sets its own slabs up to a maximum of ₹2,500 a year. Punjab charges ₹200 a month for income above ₹20,833; Maharashtra ₹200 a month (₹300 in February); Karnataka ₹200 a month above ₹25,000; Delhi, Haryana, Uttar Pradesh and Chandigarh levy none.' },
  { q: 'Does the calculator use the old or the new tax regime?', a: 'The new regime, which is the default for TDS unless you tell your employer otherwise. It applies the ₹75,000 standard deduction and the ₹60,000 section 87A rebate. If you have large HRA, 80C and home loan deductions, use the income tax calculator to check whether the old regime gives more in hand.' },
]

const RENT_RECEIPT_SECTIONS: CalcSection[] = [
  {
    heading: 'Why you need rent receipts for HRA',
    paragraphs: [
      'House rent allowance is exempt under section 10(13A) only if you actually pay rent, and the employer must satisfy itself before allowing the exemption in your TDS. Rent receipts are the standard proof. Most companies collect them between December and February along with Form 12BB and the landlord\'s PAN, then reflect the exemption in Form 16. Without receipts the employer taxes the full HRA, and you have to claim the exemption yourself in the ITR, which invites verification.',
      'This generator produces one receipt for each month of the period you select, with the tenant, landlord, address, amount in figures and words, payment mode and a signature line. Print them or save as PDF, get the landlord to sign each one (a scanned signature is accepted by most employers if the receipt is otherwise complete), and keep copies for at least six years, the period within which the department can reopen an assessment.',
    ],
  },
  {
    heading: 'What a valid rent receipt must contain',
    bullets: [
      'Name of the tenant and name of the landlord, as they appear on the rent agreement.',
      'Full address of the rented premises, including flat or house number and city.',
      'Amount of rent in figures and words, and the month or period it covers.',
      'Date of payment and mode: bank transfer, UPI, cheque or cash.',
      'Landlord\'s PAN if annual rent exceeds ₹1,00,000, or a Form 60 declaration if the landlord has no PAN.',
      'Landlord\'s signature; for cash payments above ₹5,000, a ₹1 revenue stamp signed across.',
    ],
  },
  {
    heading: 'Landlord PAN rule: rent above ₹1 lakh a year',
    paragraphs: [
      'CBDT Circular 8/2013 and rule 26C require employees to report the landlord\'s PAN in Form 12BB when annual rent exceeds ₹1,00,000, which is just ₹8,334 a month. The employer cannot allow HRA exemption above that limit without the PAN. If the landlord refuses to share it, the exemption is generally denied at the employer stage; you may still claim it in the return, but be ready to prove the payments through bank statements. If the landlord genuinely has no PAN, a signed declaration in Form 60 with name and address is accepted. The department cross-checks the PAN against the landlord\'s return, so quoting a wrong or fictitious PAN can lead to a notice for both parties.',
    ],
  },
  {
    heading: 'Revenue stamp and cash payments',
    paragraphs: [
      'Under the Indian Stamp Act a receipt for cash exceeding ₹5,000 must carry a ₹1 revenue stamp, signed across by the person receiving the money; without it the receipt is not admissible as evidence. Receipts for bank transfer, UPI or cheque payments do not need a stamp because the bank record itself is proof. Prefer digital payment anyway: it creates a trail that matches your bank statement, and section 269SS/269T restrictions and cash-deposit reporting make large cash rent awkward for the landlord too.',
    ],
  },
  {
    heading: 'Worked example: ₹18,000 a month in Panchkula',
    paragraphs: [
      'Rent of ₹18,000 a month from April 2025 to March 2026 is ₹2,16,000 for the year, so the landlord\'s PAN is mandatory and twelve receipts are needed. Paid by UPI, no revenue stamp is required. With a basic salary of ₹4,80,000 and HRA of ₹2,40,000 in a non-metro, the HRA exemption works out to ₹1,68,000 (rent minus 10% of salary), saving roughly ₹52,000 of tax at the 30% slab under the old regime. The receipts, the rent agreement and the UPI statements together are exactly what an employer or assessing officer will ask for.',
    ],
  },
  {
    heading: 'TDS when rent exceeds ₹50,000 a month',
    paragraphs: [
      'Tenants who are individuals or HUFs not liable to tax audit must deduct 2% TDS under section 194-IB when monthly rent exceeds ₹50,000. The deduction is made once, from the rent for March or the last month of tenancy, deposited through Form 26QC within 30 days of the end of that month, and the landlord receives Form 16C. No TAN is required. For a rent of ₹60,000 a month the annual TDS is ₹14,400. Skipping it attracts interest at 1% or 1.5% per month and a late fee of ₹200 a day, and the landlord cannot claim credit until the return is filed.',
    ],
  },
  {
    heading: 'Rent to parents, spouse and fake receipts',
    paragraphs: [
      'Paying rent to parents is legitimate if they own the house, the money is actually transferred and they report it as house property income in their return, where they get a 30% standard deduction. Rent to a spouse is generally disallowed because the household is treated as one economic unit. Fabricated receipts are a different matter: since 2023 the department has issued notices to salaried taxpayers whose HRA claims did not match the landlord\'s PAN or bank records, and the AIS now shows rent received against the landlord\'s PAN. A disallowed claim means tax on the full HRA, interest under sections 234B and 234C, and a penalty of up to 200% under section 270A for misreporting. Generate receipts only for rent you actually paid.',
    ],
  },
]

const RENT_RECEIPT_FAQS = [
  { q: 'Is landlord PAN mandatory on a rent receipt?', a: 'Yes, when annual rent exceeds ₹1,00,000 (about ₹8,334 a month) the landlord\'s PAN must be given to your employer in Form 12BB and is normally printed on the receipt. If the landlord has no PAN, a signed Form 60 declaration with name and address is accepted instead.' },
  { q: 'Do I need a revenue stamp on a rent receipt?', a: 'Only for cash payments above ₹5,000, where a ₹1 revenue stamp signed across by the landlord is required under the Indian Stamp Act. Receipts for UPI, bank transfer or cheque payments do not need a stamp because the bank record is itself proof.' },
  { q: 'Do I need a rent receipt every month?', a: 'Monthly receipts are the norm and what most employers ask for, though a single receipt covering a quarter or the full year with a month-wise breakup is also accepted by many. This generator produces one receipt per month so the set matches your payment dates.' },
  { q: 'Can I claim HRA without rent receipts?', a: 'Yes, you can claim the exemption directly in your ITR without employer approval, but you must be able to prove the rent through bank statements, a rent agreement and the landlord\'s PAN if asked. CBDT allows employers to skip receipts only when rent is up to ₹3,000 a month.' },
  { q: 'Can I generate rent receipts for rent paid to my parents?', a: 'Yes, provided the house is in your parents\' name, you actually transfer the rent (preferably by bank) and they report it as rental income. Keep a rent agreement and use the receipts from this tool with their PAN; claims involving parents are checked more closely.' },
  { q: 'Is a rent agreement required along with rent receipts?', a: 'Not by law for the employer, but it is strongly recommended and increasingly demanded, and the assessing officer will ask for it in any verification. An agreement on stamp paper with the rent, period and landlord details supports the receipts and the PAN reported.' },
  { q: 'Do I have to deduct TDS on rent as a tenant?', a: 'Only if monthly rent exceeds ₹50,000, in which case individuals and HUFs deduct 2% under section 194-IB once a year from the March or final month\'s rent, deposit it via Form 26QC within 30 days and issue Form 16C to the landlord. Below ₹50,000 there is no TDS.' },
  { q: 'Will these receipts be accepted by my employer?', a: 'Yes, they contain every field employers check: tenant and landlord names, address, monthly amount in figures and words, period, payment mode, landlord PAN and a signature line. Have the landlord sign each receipt and submit them with Form 12BB before the proof-submission deadline, usually in January or February.' },
]

export const CALCULATORS: CalculatorDef[] = [
  {
    slug: 'income-tax', name: 'Income Tax Calculator',
    h1: 'Income Tax Calculator FY 2025-26 (New Regime and Old Regime)',
    metaTitle: 'Income Tax Calculator FY 2025-26 | Old vs New Regime',
    metaDescription:
      'Free income tax calculator for FY 2025-26. Compare old and new regime on your salary with the 87A rebate, marginal relief, surcharge and 4% cess.',
    keywords: ['income tax calculator', 'income tax calculator fy 2025-26', 'new tax regime calculator', 'old vs new regime calculator', 'tax calculator india', 'income tax calculator ay 2026-27'],
    intro: 'Enter your gross salary and deductions. The calculator computes tax under both regimes side by side with the standard deduction, section 87A rebate, marginal relief, surcharge and 4% cess, and tells you which regime leaves more in hand.',
    updatedFor: 'FY 2025-26 (AY 2026-27), Budget 2025 slabs',
    sections: INCOME_TAX_SECTIONS, faqs: INCOME_TAX_FAQS, relatedServiceSlug: 'itr-salaried',
    ctaText: 'Get your return filed under the better regime from ₹499.',
    related: ['hra', 'old-vs-new-regime', 'take-home-salary', 'advance-tax'], phase: 0,
  },
  {
    slug: 'hra', name: 'HRA Exemption Calculator',
    h1: 'HRA Calculator: House Rent Allowance Exemption FY 2025-26',
    metaTitle: 'HRA Calculator FY 2025-26 | Exemption u/s 10(13A)',
    metaDescription:
      'Calculate your HRA exemption under section 10(13A) for FY 2025-26. Enter basic, DA, HRA received and rent paid for metro or non-metro cities.',
    keywords: ['hra calculator', 'hra exemption calculator', 'house rent allowance calculator', 'hra calculation formula', '10(13a) exemption'],
    intro: 'HRA exemption is the least of three amounts: actual HRA received, rent paid minus 10% of salary, and 50% of salary in a metro (40% elsewhere). This calculator shows all three so you can see which one limits your exemption.',
    updatedFor: 'FY 2025-26, old regime only',
    sections: HRA_SECTIONS, faqs: HRA_FAQS, relatedServiceSlug: 'itr-salaried',
    ctaText: 'Not sure whether to claim HRA or switch to the new regime? We compare both when filing.',
    related: ['income-tax', 'rent-receipt-generator', 'old-vs-new-regime'], phase: 0,
  },
  {
    slug: 'capital-gains', name: 'Capital Gains Tax Calculator',
    h1: 'Capital Gains Tax Calculator FY 2025-26 (Shares, Mutual Funds, Property)',
    metaTitle: 'Capital Gains Tax Calculator FY 2025-26 | STCG and LTCG',
    metaDescription:
      'Work out capital gains tax on shares, mutual funds and property for FY 2025-26 at the post-July 2024 rates: 20% STCG, 12.5% LTCG, ₹1.25 lakh exempt.',
    keywords: ['capital gains tax calculator', 'ltcg calculator', 'stcg calculator', 'capital gains on shares', 'capital gains on property calculator', 'ltcg tax on mutual funds'],
    intro: 'Select the asset, enter purchase and sale details and the calculator applies the correct holding period, rate and exemption. For property bought before 23 July 2024 it also shows the indexed 20% option so you can pick the lower tax.',
    updatedFor: 'FY 2025-26, rates effective 23 July 2024',
    sections: CAPITAL_GAINS_SECTIONS, faqs: CAPITAL_GAINS_FAQS, relatedServiceSlug: 'itr-capital-gains',
    ctaText: 'Sold shares or property this year? Get capital gains filed correctly from ₹1,999.',
    related: ['income-tax', 'advance-tax', 'fno-turnover'], phase: 0,
  },
  {
    slug: 'gst', name: 'GST Calculator',
    h1: 'GST Calculator: Add or Remove GST at 5%, 12%, 18%, 28%',
    metaTitle: 'GST Calculator | Add or Remove GST (5%, 12%, 18%, 28%)',
    metaDescription:
      'Free GST calculator to add GST to a price or extract it from an inclusive amount. Shows the CGST, SGST and IGST split for every rate slab.',
    keywords: ['gst calculator', 'gst calculator online', 'reverse gst calculator', 'gst inclusive calculator', 'cgst sgst calculator'],
    intro: 'Enter an amount, pick the GST rate and choose whether the amount is exclusive or inclusive of GST. The calculator shows the tax amount and the CGST/SGST or IGST split for intra-state and inter-state supplies.',
    updatedFor: 'Current GST rate slabs',
    sections: GST_SECTIONS, faqs: GST_FAQS, relatedServiceSlug: 'gst-monthly',
    ctaText: 'Need GSTR-1 and 3B filed every month? From ₹999 with ITC reconciliation.',
    related: ['tds', 'income-tax'], phase: 0,
  },
  {
    slug: 'tds', name: 'TDS Calculator',
    h1: 'TDS Calculator FY 2025-26: Rate and Amount by Section',
    metaTitle: 'TDS Calculator FY 2025-26 | Rates by Section',
    metaDescription:
      'Calculate TDS on rent, professional fees, contractor payments, interest and property for FY 2025-26, with section-wise rates and threshold checks.',
    keywords: ['tds calculator', 'tds rate chart 2025-26', 'tds on rent calculator', 'tds on professional fees', 'tds on property calculator'],
    intro: 'Pick the nature of payment and enter the amount. The calculator applies the section, threshold and rate for FY 2025-26, including the higher 20% rate when the deductee has no PAN.',
    updatedFor: 'FY 2025-26 rates and thresholds',
    sections: TDS_SECTIONS, faqs: TDS_FAQS, relatedServiceSlug: 'tds-quarterly',
    ctaText: 'Deducting TDS every month? We handle challans and quarterly returns from ₹499/month.',
    related: ['gst', 'income-tax', 'advance-tax'], phase: 0,
  },
  {
    slug: 'advance-tax', name: 'Advance Tax Calculator',
    h1: 'Advance Tax Calculator FY 2026-27: Instalments and 234C Interest',
    metaTitle: 'Advance Tax Calculator FY 2026-27 | Instalment Amounts',
    metaDescription:
      'Estimate your advance tax instalments for 15 June, September, December and March from expected income, TDS and deductions, with 234C interest.',
    keywords: ['advance tax calculator', 'advance tax due date', 'advance tax instalments', '234c interest calculator', 'advance tax for f&o'],
    intro: 'Enter your expected income for the year, TDS already deducted and deductions. The calculator computes total tax under your chosen regime and splits it into the four instalments, with interest if an instalment is missed.',
    updatedFor: 'FY 2026-27 instalment schedule, FY 2025-26 slabs',
    sections: ADVANCE_TAX_SECTIONS, faqs: ADVANCE_TAX_FAQS, relatedServiceSlug: 'itr-fno-trader',
    ctaText: 'Trader or freelancer with advance tax to plan? A 30-minute session costs ₹499.',
    related: ['income-tax', 'capital-gains', 'freelancer-44ada'], phase: 0,
  },
  {
    slug: 'take-home-salary', name: 'Take Home Salary Calculator',
    h1: 'Take Home Salary Calculator India: CTC to In-Hand FY 2025-26',
    metaTitle: 'Take Home Salary Calculator | CTC to In-Hand FY 2025-26',
    metaDescription:
      'Convert CTC to monthly in-hand salary for FY 2025-26 after PF, professional tax and income tax, with a full breakup of basic, HRA and allowances.',
    keywords: ['take home salary calculator', 'ctc to in hand calculator', 'in hand salary calculator', 'salary calculator india', 'monthly salary calculator'],
    intro: 'Enter your CTC and the calculator estimates basic, HRA, employee and employer PF, professional tax and income tax, giving a monthly in-hand figure under the new regime.',
    updatedFor: 'FY 2025-26 new regime',
    sections: TAKE_HOME_SECTIONS, faqs: TAKE_HOME_FAQS, relatedServiceSlug: 'itr-salaried',
    ctaText: 'Got your first Form 16? Salaried ITR filing from ₹499.',
    related: ['income-tax', 'hra', 'old-vs-new-regime'], phase: 0,
  },
  {
    slug: 'rent-receipt-generator', name: 'Rent Receipt Generator',
    h1: 'Rent Receipt Generator for HRA Claim (Free, Printable)',
    metaTitle: 'Rent Receipt Generator | Free Printable for HRA',
    metaDescription:
      'Generate printable monthly rent receipts for your HRA claim in seconds. Includes the landlord PAN field required above ₹1 lakh annual rent.',
    keywords: ['rent receipt generator', 'rent receipt format', 'rent receipt for hra', 'rent receipt pdf', 'house rent receipt'],
    intro: 'Fill in the details once and generate receipts for every month of the period. Employers ask for these when you declare HRA; if annual rent exceeds ₹1 lakh, the landlord\'s PAN is mandatory.',
    updatedFor: 'FY 2025-26',
    sections: RENT_RECEIPT_SECTIONS, faqs: RENT_RECEIPT_FAQS, relatedServiceSlug: 'itr-salaried',
    ctaText: 'Claiming HRA in your return? We check the exemption and file from ₹499.',
    related: ['hra', 'income-tax'], phase: 0,
  },
  // Phase 1 (listed in hub as "coming soon", not in sitemap until built)
  { slug: 'old-vs-new-regime', name: 'Old vs New Regime Comparison', h1: '', metaTitle: '', metaDescription: '', keywords: [], intro: '', updatedFor: '', sections: [], faqs: [], relatedServiceSlug: 'itr-salaried', ctaText: '', related: [], phase: 1 },
  { slug: 'gratuity', name: 'Gratuity Calculator', h1: '', metaTitle: '', metaDescription: '', keywords: [], intro: '', updatedFor: '', sections: [], faqs: [], relatedServiceSlug: 'itr-salaried', ctaText: '', related: [], phase: 1 },
  { slug: 'nps', name: 'NPS Calculator', h1: '', metaTitle: '', metaDescription: '', keywords: [], intro: '', updatedFor: '', sections: [], faqs: [], relatedServiceSlug: 'itr-salaried', ctaText: '', related: [], phase: 1 },
  { slug: 'fno-turnover', name: 'F&O Turnover Calculator', h1: '', metaTitle: '', metaDescription: '', keywords: [], intro: '', updatedFor: '', sections: [], faqs: [], relatedServiceSlug: 'itr-fno-trader', ctaText: '', related: [], phase: 1 },
  { slug: 'freelancer-44ada', name: '44ADA Presumptive Tax Calculator', h1: '', metaTitle: '', metaDescription: '', keywords: [], intro: '', updatedFor: '', sections: [], faqs: [], relatedServiceSlug: 'itr-freelancer', ctaText: '', related: [], phase: 1 },
  { slug: 'emi', name: 'EMI Calculator', h1: '', metaTitle: '', metaDescription: '', keywords: [], intro: '', updatedFor: '', sections: [], faqs: [], relatedServiceSlug: 'cma-project-report', ctaText: '', related: [], phase: 1 },
  { slug: 'sip', name: 'SIP Calculator', h1: '', metaTitle: '', metaDescription: '', keywords: [], intro: '', updatedFor: '', sections: [], faqs: [], relatedServiceSlug: 'itr-capital-gains', ctaText: '', related: [], phase: 1 },
  { slug: 'gst-late-fee', name: 'GST Late Fee Calculator', h1: '', metaTitle: '', metaDescription: '', keywords: [], intro: '', updatedFor: '', sections: [], faqs: [], relatedServiceSlug: 'gst-monthly', ctaText: '', related: [], phase: 1 },
]

export const LIVE_CALCULATORS = CALCULATORS.filter((c) => c.phase === 0)
export function getCalculator(slug: string) {
  return LIVE_CALCULATORS.find((c) => c.slug === slug)
}

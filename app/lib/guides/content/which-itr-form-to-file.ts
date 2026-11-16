import type { Guide } from '../types'

export const guide: Guide = {
  slug: 'which-itr-form-to-file',
  cluster: 'itr-filing',
  title: 'Which ITR Form Should You File in AY 2026-27? (ITR-1 to ITR-7)',
  h1: 'Which ITR Form Should You File in AY 2026-27? ITR-1 to ITR-7 Explained',
  metaTitle: 'Which ITR Form to File in AY 2026-27? ITR-1 to ITR-7',
  metaDescription:
    'ITR-1 to ITR-7 eligibility for AY 2026-27 in one table, the errors that get returns marked defective, and examples for salaried, investors, traders and NRIs.',
  keywords: [
    'which itr form to file',
    'itr 1 vs itr 2',
    'itr form for salaried',
    'itr 3 vs itr 4',
    'itr form for capital gains',
    'itr form for f&o trading',
    'itr 2 eligibility',
    'itr 4 eligibility ay 2026-27',
    'itr form for nri',
  ],
  excerpt:
    'A plain-language map of ITR-1 to ITR-7 for AY 2026-27, with an eligibility table, the errors that get returns marked defective, and six real-life personas matched to the right form.',
  datePublished: '2026-09-06',
  dateModified: '2026-11-16',
  readMinutes: 10,
  sections: [
    {
      type: 'key-takeaways',
      items: [
        'ITR-1 is only for resident individuals with income up to ₹50 lakh from salary, one house property, other sources and small equity LTCG up to ₹1.25 lakh under section 112A.',
        'Any capital gains beyond that, a second house, foreign assets, directorship, unlisted shares or NRI status pushes you to ITR-2.',
        'Business or professional income, including F&O and intraday trading, needs ITR-3, unless you qualify for presumptive taxation and can use ITR-4.',
        'Filing the wrong form invites a defective return notice under section 139(9). You then have 15 days to fix it or the return is treated as invalid.',
      ],
    },
    {
      type: 'stat-grid',
      stats: [
        { label: 'Forms notified', value: '7', note: 'ITR-1 to ITR-7' },
        { label: 'ITR-1 and ITR-4 income cap', value: '₹50 lakh', note: 'Total income for the year' },
        { label: 'Equity LTCG allowed in ITR-1/4', value: '₹1.25 lakh', note: 'Under section 112A, no loss carry forward' },
        { label: 'Time to fix a defective return', value: '15 days', note: 'From the 139(9) notice' },
      ],
    },
    {
      type: 'tool-card',
      calculatorSlug: 'income-tax',
      text: 'Not sure whether your income crosses ₹50 lakh once everything is added? Use the income tax calculator to total salary, interest and gains and see the tax under both regimes.',
    },
    { type: 'heading', text: 'Why the form matters', id: 'why-the-form-matters' },
    {
      type: 'paragraph',
      text: 'Each ITR form carries only the schedules needed for a particular income mix. ITR-1 has no capital gains schedule, ITR-2 has no profit and loss account, and ITR-4 assumes you are declaring a fixed percentage of turnover as profit. If your income does not fit the form, the return cannot report it correctly.',
    },
    {
      type: 'paragraph',
      text: 'The portal now cross-checks the return against AIS. Share sales in AIS with an ITR-1 filing, or F&O turnover in AIS with an ITR-4, are the two most common triggers for a defective return notice.',
    },
    { type: 'heading', text: 'ITR forms vs eligibility for AY 2026-27', id: 'eligibility-table' },
    {
      type: 'table',
      head: ['Form', 'Who can use it', 'Income types covered', 'Cannot use if'],
      rows: [
        ['ITR-1 (Sahaj)', 'Ordinarily resident individual', 'Salary or pension, one house property, other sources, agricultural income up to ₹5,000, LTCG u/s 112A up to ₹1.25 lakh', 'Income above ₹50 lakh, director in a company, unlisted shares, foreign assets or income, TDS u/s 194N, deferred ESOP tax, loss to carry forward, more than one house property'],
        ['ITR-2', 'Individual or HUF without business income', 'Everything in ITR-1 plus any capital gains, multiple house properties, foreign income and assets, lottery winnings, income above ₹50 lakh', 'Any income from business or profession, including F&O or partner share of profit'],
        ['ITR-3', 'Individual or HUF with business or professional income', 'Everything in ITR-2 plus business or professional income, F&O and intraday, partner in a firm, presumptive income where ITR-4 is not allowed', 'Not applicable to firms, LLPs or companies'],
        ['ITR-4 (Sugam)', 'Resident individual, HUF or partnership firm (not LLP)', 'Presumptive income u/s 44AD, 44ADA or 44AE, salary or pension, one house property, other sources, LTCG u/s 112A up to ₹1.25 lakh', 'Income above ₹50 lakh, director, unlisted shares, foreign assets, more than one house property, loss to carry forward'],
        ['ITR-5', 'Partnership firms, LLPs, AOPs, BOIs, estates', 'All heads', 'Individuals, HUFs, companies, trusts'],
        ['ITR-6', 'Companies', 'All heads', 'Companies claiming exemption under section 11'],
        ['ITR-7', 'Trusts, political parties, universities, research bodies', 'Income under sections 139(4A) to 139(4D)', 'Anyone not covered by those sub-sections'],
      ],
      caption: 'Eligibility as per the AY 2026-27 forms notified by CBDT.',
    },
    { type: 'heading', text: 'ITR-1: the simplest form, with strict boundaries', id: 'itr-1' },
    {
      type: 'paragraph',
      text: 'ITR-1 works for the majority of salaried employees: one or more Form 16s, savings and FD interest, dividends, and possibly one house that is self-occupied or let out. Since AY 2025-26 it also accepts long-term capital gains on listed equity and equity mutual funds under section 112A, provided the total is within ₹1.25 lakh and there is no loss to carry forward or set off.',
    },
    {
      type: 'list',
      items: [
        'Two Form 16s from a job change are fine; consolidate the salary and TDS.',
        'Interest from savings, FDs and post office schemes goes under other sources.',
        'Home loan interest on a self-occupied house can be claimed here under the old regime, up to ₹2 lakh under section 24(b).',
        'Any short-term capital gain, even ₹500, pushes you to ITR-2.',
      ],
    },
    { type: 'heading', text: 'ITR-2: investors, property owners and NRIs', id: 'itr-2' },
    {
      type: 'paragraph',
      text: 'ITR-2 is the form for anyone with capital gains beyond the ITR-1 allowance, a second house, foreign assets or income, ESOPs from a foreign parent, or non-resident status. It carries Schedule CG for gains, Schedule FA for foreign assets, Schedule FSI for foreign income and Schedule AL for assets and liabilities when income exceeds ₹1 crore.',
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Directors and unlisted shareholders',
      text: 'If you were a director in any company at any time during FY 2025-26, or held unlisted equity shares (including in your own private limited company or a startup ESOP that vested), you cannot use ITR-1 or ITR-4 even if your only income is salary.',
    },
    { type: 'heading', text: 'ITR-3: business, profession and traders', id: 'itr-3' },
    {
      type: 'paragraph',
      text: 'Income from futures and options, intraday equity, commodity or currency trading is treated as business income, so traders file ITR-3 regardless of whether they also earn a salary. ITR-3 includes a profit and loss account, balance sheet, depreciation schedule and the option to declare presumptive income where ITR-4 is not available.',
    },
    {
      type: 'paragraph',
      text: 'Partners in a firm also use ITR-3 to report their share of profit (exempt) and remuneration or interest (taxable). Consultants whose receipts exceed the 44ADA limit of ₹50 lakh (₹75 lakh if at least 95% of receipts are digital) must maintain books and file ITR-3.',
    },
    { type: 'heading', text: 'ITR-4: presumptive income for small businesses and professionals', id: 'itr-4' },
    {
      type: 'paragraph',
      text: 'ITR-4 is designed for taxpayers who declare a fixed profit percentage without keeping detailed books: 8% of turnover (6% for digital receipts) under section 44AD for businesses up to ₹2 crore (₹3 crore with 95% digital receipts), 50% of receipts under section 44ADA for professionals up to ₹50 lakh (₹75 lakh with 95% digital receipts), and a per-vehicle amount under 44AE for goods transporters.',
    },
    {
      type: 'example',
      title: 'Freelance developer under 44ADA, ITR-4',
      lines: [
        { label: 'Gross professional receipts', value: '₹22,00,000' },
        { label: 'Presumptive profit at 50%', value: '₹11,00,000' },
        { label: 'Savings interest', value: '₹18,000' },
        { label: 'Gross total income', value: '₹11,18,000' },
        { label: 'Tax under new regime after 87A rebate (income under ₹12 lakh)', value: '₹0', strong: true },
      ],
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'F&O traders should not use ITR-4 casually',
      text: 'Presumptive 44AD can technically apply to F&O, but it requires declaring at least 6% of turnover as profit. A trader with losses loses the ability to carry them forward, and opting out of 44AD within five years triggers a tax audit requirement. Most traders are better served by ITR-3 with actual profit or loss.',
    },
    { type: 'heading', text: 'Common mistakes that trigger a defective return', id: 'common-mistakes' },
    {
      type: 'list',
      items: [
        'Filing ITR-1 when the broker statement shows any short-term gain, or long-term gain above ₹1.25 lakh.',
        'Using ITR-1 or ITR-4 while being a director or holding unlisted shares, including shares of your own company.',
        'Reporting F&O or intraday activity in ITR-2 as capital gains instead of business income in ITR-3.',
        'Filing ITR-1 as a non-resident. NRIs must use ITR-2 or ITR-3.',
        'Claiming presumptive income in ITR-4 when turnover exceeds the 44AD or 44ADA limit.',
        'Owning two houses and using ITR-1; the second property, even if vacant, requires ITR-2.',
        'Holding US stocks through an app, or a foreign bank account from an overseas stint, and filing ITR-1 without Schedule FA.',
        'Forgetting to report exempt income such as PPF interest and share of partnership profit in Schedule EI.',
      ],
    },
    {
      type: 'service-card',
      serviceSlug: 'itr-salaried',
      text: 'Our plan finder picks the form from your income sources, and a qualified professional (CMA/CA) reviews the draft before filing so a wrong-form notice never reaches you. Salaried ITR from ₹999, capital gains from ₹1,999.',
    },
    { type: 'heading', text: 'Persona examples: match yourself to a form', id: 'persona-examples' },
    {
      type: 'table',
      head: ['Taxpayer', 'Income during FY 2025-26', 'Correct form', 'Why'],
      rows: [
        ['Priya, software engineer in Pune', 'Salary ₹9.5 lakh, savings interest ₹12,000, one self-occupied flat with home loan', 'ITR-1', 'Salary, one house property, other sources, income under ₹50 lakh'],
        ['Rahul, marketing manager in Gurugram', 'Salary ₹18 lakh, sold equity mutual funds with LTCG ₹3 lakh and STCG ₹40,000', 'ITR-2', 'Capital gains exceed the ITR-1 allowance and include STCG'],
        ['Amit, salaried and part-time F&O trader', 'Salary ₹14 lakh, F&O loss ₹2.5 lakh, turnover ₹38 lakh', 'ITR-3', 'F&O is business income; ITR-3 allows the loss to be carried forward for 8 years'],
        ['Neha, freelance graphic designer', 'Professional receipts ₹22 lakh, all through bank transfers', 'ITR-4', 'Presumptive 44ADA at 50%, income below ₹50 lakh, no other disqualification'],
        ['Sunil, NRI in Dubai', 'NRO interest ₹3 lakh, rent from a Chandigarh flat ₹4.8 lakh', 'ITR-2', 'Non-residents cannot use ITR-1; no business income so ITR-3 is not needed'],
        ['Meera, director of her own private limited company', 'Director remuneration ₹15 lakh, holds unlisted shares in the company', 'ITR-2', 'Directorship and unlisted shares bar ITR-1 even though the income is salary'],
        ['Kapoor and Associates, a two-partner LLP', 'Professional fees ₹1.2 crore', 'ITR-5', 'LLPs and partnership firms file ITR-5; partners report their share in ITR-3'],
      ],
    },
    { type: 'heading', text: 'What if you already filed the wrong form?', id: 'wrong-form-filed' },
    {
      type: 'paragraph',
      text: 'If the return has been filed and the mistake is noticed in time, file a revised return under section 139(5) in the correct form. For AY 2026-27 the Finance Act 2026 allows revision until 31 March 2027: no fee until 31 December 2026, then a fee under section 234-I of ₹1,000 if total income is up to ₹5 lakh and ₹5,000 otherwise. The revised return replaces the original. If a 139(9) defective return notice has already arrived, respond within 15 days through the e-Proceedings tab by uploading a corrected return in the right form.',
    },
    {
      type: 'callout',
      tone: 'success',
      title: 'Switching forms does not restart the clock',
      text: 'A revised return filed in a different form keeps the original filing date for interest and late fee purposes, as long as the original was filed by the due date and verified.',
    },
    { type: 'heading', text: 'What to do next', id: 'what-to-do-next' },
    {
      type: 'paragraph',
      text: 'List every income source from AIS, then run down the ITR-1 disqualifications first. If none apply, ITR-1 it is. If capital gains, a second house, foreign assets or NRI status appear, go to ITR-2. Any business or trading activity means ITR-3 or, for eligible presumptive cases, ITR-4. When in doubt, choose the more detailed form; the department never objects to extra disclosure.',
    },
  ],
  faqs: [
    {
      q: 'Can a salaried person with capital gains file ITR-1?',
      a: 'Only if the gains are long-term on listed equity or equity mutual funds under section 112A, total ₹1.25 lakh or less, and there is no loss to set off or carry forward. Any short-term gain, or long-term gain from property, debt funds or gold, requires ITR-2.',
    },
    {
      q: 'Which ITR form is for F&O trading?',
      a: 'ITR-3, because F&O income is treated as non-speculative business income. ITR-4 under 44AD is possible but generally unwise for traders with losses.',
    },
    {
      q: 'Can an NRI file ITR-1?',
      a: 'No. ITR-1 is restricted to ordinarily resident individuals. NRIs use ITR-2, or ITR-3 if they have business income in India.',
    },
    {
      q: 'What is the difference between ITR-3 and ITR-4?',
      a: 'ITR-4 is for presumptive income under 44AD, 44ADA or 44AE with total income up to ₹50 lakh. ITR-3 is for anyone with business or professional income who keeps books, has losses, exceeds the presumptive limits, or is otherwise barred from ITR-4.',
    },
    {
      q: 'I have two house properties. Which form?',
      a: 'ITR-2 if you have no business income, otherwise ITR-3. ITR-1 and ITR-4 permit only one house property.',
    },
    {
      q: 'Do I need ITR-2 if I hold US stocks through an Indian app?',
      a: 'Yes. Foreign shares are foreign assets and must be reported in Schedule FA, which exists only in ITR-2 and ITR-3. This applies even if you sold nothing during the year.',
    },
    {
      q: 'What happens if I file the wrong ITR form?',
      a: 'CPC issues a defective return notice under section 139(9). You get 15 days to file a corrected return in the right form; otherwise the return is treated as invalid and you are deemed not to have filed.',
    },
    {
      q: 'Can a pensioner use ITR-1?',
      a: 'Yes. Pension is taxed as salary, so a resident pensioner with one house property and interest income, total up to ₹50 lakh, files ITR-1. Family pension also fits ITR-1 under other sources.',
    },
    {
      q: 'Which ITR form does a partnership firm or LLP file?',
      a: 'ITR-5. The partners then file ITR-3 to report remuneration and interest received from the firm and their exempt share of profit.',
    },
  ],
  relatedServiceSlug: 'itr-salaried',
  relatedGuides: ['itr-filing-guide-ay-2026-27', 'capital-gains-tax-guide', 'fno-trading-tax-guide'],
  relatedCalculators: ['income-tax', 'capital-gains'],
}

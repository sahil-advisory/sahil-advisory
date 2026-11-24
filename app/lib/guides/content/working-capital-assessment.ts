import type { Guide } from '../types'

export const guide: Guide = {
  slug: 'working-capital-assessment',
  cluster: 'business-setup',
  title: 'Working Capital Assessment: Turnover Method, MPBF and Drawing Power',
  h1: 'Working Capital Assessment: Turnover Method, MPBF and Drawing Power',
  metaTitle: 'Working Capital Assessment: Turnover Method and MPBF',
  metaDescription:
    'How banks assess a working capital limit: the 20% turnover method up to ₹5 crore, both MPBF methods with formulas, the operating cycle and drawing power.',
  keywords: ['working capital assessment', 'mpbf calculation', 'turnover method working capital', 'drawing power calculation', 'cash credit limit calculation'],
  excerpt: 'The three ways a bank can size your cash credit limit, with one example run through each.',
  datePublished: '2026-11-24',
  dateModified: '2026-11-24',
  readMinutes: 6,
  sections: [
    { type: 'key-takeaways', items: [
      'For MSME fund-based limits up to ₹5 crore, banks can lend at least 20% of projected yearly turnover.',
      'The MPBF methods start from the working capital gap: current assets less current liabilities other than bank borrowing.',
      'Drawing power, set by your monthly stock statement, decides how much of the limit you can use.',
    ] },
    { type: 'heading', text: 'Turnover method', id: 'turnover-method' },
    { type: 'paragraph', text: 'Working capital need is taken as 25% of projected turnover. The borrower brings 5% and the bank finances at least 20%. On projected sales of ₹2 crore, need is ₹50 lakh, your margin ₹10 lakh and the bank limit ₹40 lakh. Projected sales must be believable against GST returns and past growth.' },
    { type: 'heading', text: 'MPBF: first and second method', id: 'mpbf-methods' },
    { type: 'table', head: ['Method', 'Formula', 'On current assets ₹155 lakh, liabilities ₹45 lakh'], rows: [
      ['First', '75% of (current assets less current liabilities)', '₹82.50 lakh'],
      ['Second', '75% of current assets, less current liabilities', '₹71.25 lakh'],
    ], caption: 'Current liabilities exclude bank borrowing in both methods.' },
    { type: 'paragraph', text: 'The second method asks the owner to fund a quarter of all current assets, so it gives a lower limit and a higher current ratio. Banks follow their own lending policy and may use either, or a cash budget for seasonal and contract businesses.' },
    { type: 'heading', text: 'Operating cycle', id: 'operating-cycle' },
    { type: 'paragraph', text: 'The operating cycle is the days money stays tied up: stock days plus debtor days less creditor days. With 61 days of stock, 46 days of debtors and 29 days of creditors, it is 78 days. A shorter cycle means a smaller need. Collecting sooner can be cheaper than a bigger limit.' },
    { type: 'heading', text: 'Drawing power', id: 'drawing-power' },
    { type: 'example', title: 'Monthly drawing power (₹ lakh)', lines: [
      { label: 'Stock 75 less creditors 35', value: '40' },
      { label: 'Less 25% margin', value: '30' },
      { label: 'Eligible debtors 70 less 40% margin', value: '42' },
      { label: 'Drawing power', value: '72', strong: true },
    ] },
    { type: 'paragraph', text: 'Margins and the age up to which debtors count are in your sanction letter. Late stock statements can attract charges or reduce what you can draw.' },
    { type: 'service-card', serviceSlug: 'working-capital-loan', text: 'We assess the limit your figures support and prepare the proposal. The lender decides the sanction.' },
  ],
  faqs: [
    { q: 'How is a cash credit limit calculated?', a: 'For MSME limits up to ₹5 crore a bank can use 20% of projected turnover. For larger or different businesses it uses an MPBF method, a cash budget or its own policy.' },
    { q: 'What is MPBF?', a: 'Maximum permissible bank finance: the most a bank would lend against your working capital gap under a given method.' },
    { q: 'Why can I not use my full limit?', a: 'Drawing power may be below the limit. It depends on paid stock and eligible debtors after margin, as shown in your latest stock statement.' },
  ],
  relatedServiceSlug: 'working-capital-loan',
  relatedGuides: ['cma-report-sample', 'cma-report-bank-loan', 'cma-report-charges'],
  relatedCalculators: [],
}

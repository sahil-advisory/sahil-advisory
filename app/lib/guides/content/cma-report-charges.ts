import type { Guide } from '../types'

export const guide: Guide = {
  slug: 'cma-report-charges',
  cluster: 'business-setup',
  title: 'CMA Report Charges: What You Pay and What Changes the Fee',
  h1: 'CMA Report Charges: What You Pay and What Changes the Fee',
  metaTitle: 'CMA Report Charges 2026: Fees by Loan Size',
  metaDescription:
    'CMA report charges from ₹4,999 for Mudra and loans up to ₹25 lakh, and from ₹9,999 for larger limits. What is included and how to compare quotes.',
  keywords: ['cma report charges', 'cma report fees', 'cma data preparation charges', 'cma report cost', 'project report charges for bank loan'],
  excerpt: 'Our published CMA report fees, what each includes, and the questions that make two quotes comparable.',
  datePublished: '2026-11-24',
  dateModified: '2026-11-24',
  readMinutes: 4,
  sections: [
    { type: 'key-takeaways', items: [
      'Our CMA report fee starts at ₹4,999 for Mudra and other loans up to ₹25 lakh, and at ₹9,999 for larger limits, plus 18% GST.',
      'No official fee scale applies, so quotes vary. Compare what each one includes.',
      'The fee is for preparing the report. It does not depend on the loan being sanctioned, and no one can promise a sanction.',
    ] },
    { type: 'heading', text: 'Our CMA report charges', id: 'our-charges' },
    { type: 'table', head: ['What you need', 'Fee before GST', 'What you get'], rows: [
      ['Mudra or a loan up to ₹25 lakh', 'From ₹4,999', 'CMA data, project report, ratios and DSCR, one revision after bank feedback'],
      ['Larger working capital limit or term loan', 'From ₹9,999', 'The same, with more detailed projections'],
      ['Working capital proposal and lender submission', 'From ₹14,999', 'Limit assessment, CMA data, application set and submission to up to three lenders'],
      ['Renewal or enhancement of a limit', 'From ₹9,999', 'Updated CMA data, renewal set and follow-up'],
    ] },
    { type: 'heading', text: 'What changes the fee', id: 'what-changes-fee' },
    { type: 'list', items: [
      'Loan size and type: a term loan needs projections for the whole repayment period.',
      'State of the books: if accounts are not finalised, that work comes first and is quoted separately.',
      'Number of units, products or group companies.',
      'Extra certificates or a stock audit the lender asks for.',
    ] },
    { type: 'heading', text: 'Questions to ask before comparing quotes', id: 'compare-quotes' },
    { type: 'list', ordered: true, items: [
      'Is the project report included, or only the CMA forms?',
      'How many revisions after bank queries are included?',
      'Will it be in my bank\'s own template?',
      'Who signs it, and does my lender accept that?',
      'Is GST included in the price?',
    ] },
    { type: 'service-card', serviceSlug: 'cma-project-report', text: 'Tell us the loan amount and bank, and we confirm a fixed fee before starting.' },
  ],
  faqs: [
    { q: 'How much does a CMA report cost?', a: 'With us, from ₹4,999 plus GST for Mudra and other loans up to ₹25 lakh, and from ₹9,999 plus GST for larger working capital limits and term loans. The exact fee is fixed after we see the loan amount and your accounts.' },
    { q: 'Is the fee refunded if the bank declines the loan?', a: 'The fee covers preparing the report, and the sanction is the lender\'s decision. Our refund policy explains when a fee can be refunded.' },
    { q: 'Do CMA report charges include bank fees?', a: 'No. Processing, valuation, legal and stamp charges are set by the lender and paid to it separately.' },
  ],
  relatedServiceSlug: 'cma-project-report',
  relatedGuides: ['cma-report-bank-loan', 'cma-report-sample', 'working-capital-assessment'],
  relatedCalculators: [],
}

// Service catalogue. Prices are ex-GST in rupees. "mrp" is shown struck
// through when it differs from "price". All prices are launch proposals
// pending owner sign-off (see docs/PROJECT.md).

export type ServiceCategoryId = 'itr' | 'gst' | 'tds' | 'registrations' | 'notices' | 'audit'
export type Unit = 'one_time' | 'month' | 'quarter' | 'year' | 'session'

export interface Faq {
  q: string
  a: string
}

export interface Service {
  slug: string
  category: ServiceCategoryId
  name: string
  whoFor: string
  shortDesc: string
  longDesc: string
  unit: Unit
  mrp: number
  price: number | null // null = quoted after triage / scope review
  quoteLabel?: string // overrides the default "Quote after free triage" text
  priceFrom?: boolean // price is a minimum; shown as "from ₹x"
  priceNote?: string // what the final fee depends on, shown under the price
  popular?: boolean
  includes: string[]
  documents: string[]
  turnaroundDays: string
  faqs: Faq[]
  keywords: string[]
  relatedGuides?: string[]
  relatedCalculators?: string[]
}

export interface ServiceCategory {
  id: ServiceCategoryId
  name: string
  navLabel: string
  headline: string
  headlineEmphasis: string
  intro: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
  steps: { title: string; desc: string; time: string }[]
  personas: { title: string; forms: string; desc: string; slug: string }[]
  trust: string[]
  finder?: { label: string; desc: string; slug: string }[]
  faqs: Faq[]
  deadlineKeys: string[]
  // Four facts a visitor checks before choosing: due date, cost of missing
  // it, forms, speed. `deadlineKey` renders the live next due date.
  facts: CategoryFact[]
}

export type CategoryFactIcon = 'calendar' | 'fee' | 'form' | 'speed' | 'check' | 'shield' | 'rupee' | 'scale'
export type CategoryFact = { label: string; value?: string; hint?: string; deadlineKey?: string; icon?: CategoryFactIcon }

const unitLabel: Record<Unit, string> = {
  one_time: '',
  month: '/ month',
  quarter: '/ quarter',
  year: '/ year',
  session: '/ session',
}
export function unitSuffix(u: Unit) {
  return unitLabel[u]
}

export const CATEGORIES: ServiceCategory[] = [
  {
    id: 'itr',
    name: 'Income Tax Return Filing',
    navLabel: 'ITR Filing',
    headline: 'Never miss an ITR deadline.',
    headlineEmphasis: 'File accurately, maximise your refund.',
    intro:
      'Best-price ITR filing for salaried employees, investors, F&O traders, freelancers, businesses and NRIs. A qualified professional prepares, you approve, we file and e-verify.',
    metaTitle: 'ITR Filing Online AY 2026-27 from ₹499 | Expert Assisted',
    metaDescription:
      'Expert-assisted income tax return filing for AY 2026-27. Fixed prices from ₹499 for salaried, capital gains, F&O, freelancer, business and NRI returns. Draft approval before filing, WhatsApp updates.',
    keywords: ['itr filing online', 'income tax return filing', 'itr filing services', 'itr filing for salaried', 'itr filing last date 2026', 'ca for itr filing'],
    steps: [
      { title: 'Pick your plan', desc: 'Use the plan finder or choose directly. Pay online, or request a callback if unsure.', time: 'Under 2 minutes' },
      { title: 'Upload documents', desc: 'Form 16, AIS, broker statements and bank interest through your secure dashboard or WhatsApp.', time: '5 to 10 minutes' },
      { title: 'Approve and relax', desc: 'Your expert prepares a draft computation. You approve, we file and share the acknowledgement.', time: '1 to 3 business days' },
    ],
    personas: [
      { title: 'Salaried employee', forms: 'ITR-1 / ITR-2', desc: 'Form 16, one house property, interest income. Regime comparison included.', slug: 'itr-salaried' },
      { title: 'Investor or trader', forms: 'ITR-2 / ITR-3', desc: 'Equity, mutual fund, property gains and F&O or intraday trading.', slug: 'itr-fno-trader' },
      { title: 'Freelancer or business', forms: 'ITR-3 / ITR-4', desc: 'Consultants, gig workers and proprietors, with or without books.', slug: 'itr-freelancer' },
      { title: 'NRI', forms: 'ITR-2 / ITR-3', desc: 'NRO/NRE income, DTAA relief, Schedule FA and property sale.', slug: 'itr-nri' },
    ],
    trust: ['Verified CMA / CA experts', 'Draft shared before filing', 'AIS and 26AS reconciled', '100% online, pan-India'],
    finder: [
      { label: 'Salary or pension', desc: 'Form 16 from an employer', slug: 'itr-salaried' },
      { label: 'Capital gains', desc: 'Shares, mutual funds, property', slug: 'itr-capital-gains' },
      { label: 'F&O or intraday', desc: 'Futures, options, day trading', slug: 'itr-fno-trader' },
      { label: 'Freelance or consulting', desc: 'Professional fees, gig income', slug: 'itr-freelancer' },
      { label: 'Business with books', desc: 'Proprietorship, shop, trading business', slug: 'itr-business' },
      { label: 'NRI or foreign income', desc: 'Living abroad, foreign assets', slug: 'itr-nri' },
      { label: 'House property', desc: 'Rent received, home loan', slug: 'itr-salaried-plus' },
      { label: 'LLP, firm or company', desc: 'Entity return', slug: 'itr-llp' },
    ],
    faqs: [
      { q: 'What is the last date to file ITR for AY 2026-27?', a: 'For individuals not requiring audit, 31 July 2026. Audit cases have until 31 October 2026. A belated or revised return can be filed until 31 December 2026 with a late fee under section 234F of ₹5,000 (₹1,000 if total income is up to ₹5 lakh).' },
      { q: 'What documents do I need for ITR filing?', a: 'PAN, Aadhaar, Form 16 (salaried), Form 26AS and AIS, bank interest certificates, capital gains statements from brokers or mutual fund RTAs, rent receipts if claiming HRA, and proofs for 80C, 80D and home loan interest if you use the old regime.' },
      { q: 'Can I file ITR without Form 16?', a: 'Yes. Your salary slips, bank credits and AIS together give the same information. Your expert reconciles these to prepare the return.' },
      { q: 'Which ITR form applies to me?', a: 'ITR-1 for salary plus one house property and interest up to ₹50 lakh income. ITR-2 if you have capital gains, more than one property, or are an NRI. ITR-3 for business or F&O income. ITR-4 for presumptive income under 44AD or 44ADA. The plan finder above recommends the right one.' },
      { q: 'Do I need to file ITR if my income is below ₹5 lakh?', a: 'Filing is mandatory if gross total income exceeds the basic exemption limit (₹2.5 lakh under the old regime, ₹4 lakh under the new regime for FY 2025-26), or if you meet conditions like foreign travel over ₹2 lakh, electricity bills over ₹1 lakh, or TDS above ₹25,000. Filing is also the only way to claim a refund of TDS.' },
      { q: 'Is the price inclusive of GST?', a: 'Prices are shown excluding GST. 18% GST is added at checkout and a GST invoice is issued for every order.' },
      { q: 'What if you make a mistake?', a: 'Every return is reviewed by a qualified professional before filing. If a defect arises from our error, we file the rectification or revised return at no charge and handle the resulting 143(1) intimation.' },
      { q: 'How long does expert-assisted filing take?', a: 'Most salaried returns are filed within one business day of receiving complete documents. Capital gains, F&O and business returns take two to three business days.' },
    ],
    deadlineKeys: ['itr-non-audit', 'itr-audit', 'itr-belated'],
    facts: [
      { label: 'Due date', deadlineKey: 'itr-non-audit' },
      { label: 'Late fee', value: '₹1,000 to ₹5,000', hint: 'Section 234F', icon: 'fee' },
      { label: 'Forms', value: 'ITR-1 to ITR-6', hint: 'Individuals to companies', icon: 'form' },
      { label: 'Turnaround', value: '1 business day', hint: 'Salaried returns', icon: 'speed' },
    ],
  },
  {
    id: 'gst',
    name: 'GST Registration and Return Filing',
    navLabel: 'GST Returns',
    headline: 'Never miss a GST deadline.',
    headlineEmphasis: 'File on time, avoid late fees.',
    intro:
      'Monthly, quarterly and annual GST compliance for shops, service providers, freelancers and e-commerce sellers. GST-practitioner-led, with ITC reconciliation before every GSTR-3B.',
    metaTitle: 'GST Return Filing Online from ₹999/month | GSTR-1, 3B, 9',
    metaDescription:
      'GST registration and return filing by approved GST practitioners. GSTR-1 and 3B monthly from ₹999, QRMP quarterly, CMP-08, GSTR-9 and 9C. ITC reconciled before every filing.',
    keywords: ['gst return filing', 'gst registration online', 'gstr 3b filing', 'gst filing services', 'gst return filing charges', 'gst for freelancers'],
    steps: [
      { title: 'Pick your scheme and plan', desc: 'Monthly, QRMP or composition. We check eligibility and pick the lower-compliance option.', time: 'Under 2 minutes' },
      { title: 'Share sales and purchase data', desc: 'Excel, Tally export, or portal access. Your expert validates and matches ITC with GSTR-2B.', time: '5 to 15 minutes' },
      { title: 'We reconcile and file', desc: 'Draft summary shared before filing. Filed with confirmation and challan every month.', time: 'Before the due date' },
    ],
    personas: [
      { title: 'Monthly filer', forms: 'GSTR-1 + GSTR-3B', desc: 'Turnover above ₹5 crore or opted for monthly filing.', slug: 'gst-monthly' },
      { title: 'Quarterly filer (QRMP)', forms: 'GSTR-1, 3B, PMT-06', desc: 'Turnover up to ₹5 crore. Quarterly returns with monthly payment.', slug: 'gst-qrmp' },
      { title: 'Composition dealer', forms: 'CMP-08, GSTR-4', desc: 'Small traders and manufacturers paying tax at a flat rate.', slug: 'gst-cmp08' },
      { title: 'Annual return and closure', forms: 'GSTR-9, 9C, 10', desc: 'Year-end consolidation, audit reconciliation or cancellation.', slug: 'gst-annual-9' },
    ],
    trust: ['Approved GST practitioners', 'ITC matched with GSTR-2B', 'Filed before due date, every time', '100% online, pan-India'],
    finder: [
      { label: 'New business, need GSTIN', desc: 'Registration in 3 to 7 days', slug: 'gst-registration' },
      { label: 'Turnover above ₹5 Cr', desc: 'Mandatory monthly GSTR-1 and 3B', slug: 'gst-monthly' },
      { label: 'Turnover up to ₹5 Cr', desc: 'QRMP quarterly filing', slug: 'gst-qrmp' },
      { label: 'Composition scheme', desc: 'CMP-08 quarterly', slug: 'gst-cmp08' },
      { label: 'Annual return', desc: 'GSTR-9 (mandatory above ₹2 Cr)', slug: 'gst-annual-9' },
      { label: 'Turnover above ₹5 Cr, need 9C', desc: 'Reconciliation statement', slug: 'gst-9c' },
      { label: 'Cancelling GST', desc: 'GSTR-10 final return', slug: 'gst-10' },
      { label: 'No sales this period', desc: 'Nil return, free', slug: 'gst-nil-return' },
    ],
    faqs: [
      { q: 'What is the due date for GSTR-1 and GSTR-3B monthly filing?', a: 'GSTR-1 is due on the 11th of the following month and GSTR-3B on the 20th. Under QRMP, GSTR-1 is due on the 13th after the quarter and GSTR-3B on the 22nd or 24th depending on your state.' },
      { q: 'What is the late fee for delayed GST returns?', a: 'Late fee is ₹50 per day (₹25 CGST + ₹25 SGST) for regular returns and ₹20 per day for nil returns, capped based on turnover. Interest at 18% per annum applies on late tax payment.' },
      { q: 'Who needs to register for GST?', a: 'Businesses with aggregate turnover above ₹40 lakh for goods or ₹20 lakh for services (₹10 lakh in special category states), anyone selling through e-commerce operators, inter-state suppliers of goods, and those liable under reverse charge. Voluntary registration is allowed.' },
      { q: 'Is GSTR-9 mandatory for everyone?', a: 'GSTR-9 is optional for taxpayers with aggregate turnover up to ₹2 crore. Above ₹2 crore it is mandatory, and GSTR-9C reconciliation is required above ₹5 crore.' },
      { q: 'What is the QRMP scheme?', a: 'Quarterly Return Monthly Payment. Taxpayers with turnover up to ₹5 crore file GSTR-1 and GSTR-3B quarterly while paying tax monthly through PMT-06. It cuts filings from 24 to 8 per year.' },
      { q: 'Can a filed GSTR-3B be revised?', a: 'No. Errors are corrected in the next period\'s return through amendments. That is why we share a draft summary before every filing.' },
      { q: 'What is the Invoice Management System (IMS)?', a: 'IMS on the GST portal lets recipients accept, reject or keep pending each invoice their suppliers upload, so GSTR-2B and the ITC claimed in GSTR-3B match. We action IMS before filing your 3B.' },
      { q: 'Do freelancers need GST?', a: 'Only if annual receipts exceed ₹20 lakh, or you export services and want to claim refunds or a LUT. Below the threshold, registration is optional. See our guide on GST for freelancers.' },
    ],
    deadlineKeys: ['gstr-1', 'gstr-3b', 'gstr-9'],
    facts: [
      { label: 'GSTR-3B due', deadlineKey: 'gstr-3b' },
      { label: 'Late fee', value: '₹50 per day', hint: '₹20 per day for nil returns', icon: 'fee' },
      { label: 'New registration', value: '3 to 7 days', hint: 'GSTIN in hand', icon: 'speed' },
      { label: 'ITC matched', value: 'Every month', hint: 'Against GSTR-2B before 3B', icon: 'check' },
    ],
  },
  {
    id: 'tds',
    name: 'TDS Return Filing',
    navLabel: 'TDS Returns',
    headline: 'TDS deposits and returns,',
    headlineEmphasis: 'filed on time, every quarter.',
    intro:
      'Monthly challan payments, quarterly 24Q/26Q/27Q statements, corrections on TRACES, Form 16 generation and 26QB for property buyers.',
    metaTitle: 'TDS Return Filing Online | 24Q, 26Q, 27Q, 26QB from ₹1,499',
    metaDescription:
      'TDS return filing for employers, businesses and property buyers. Quarterly 24Q/26Q/27Q from ₹3,999, monthly challan support, TRACES corrections, Form 16 generation and Form 26QB.',
    keywords: ['tds return filing', 'tds return due date', 'form 26qb', 'tds on property purchase', 'form 24q filing', 'tds correction statement'],
    steps: [
      { title: 'Choose your TDS package', desc: 'Monthly deposit support, quarterly statements, correction or a one-time 26QB.', time: 'Under 2 minutes' },
      { title: 'Share payroll or payment data', desc: 'Deductee PAN, amounts and challans through the dashboard.', time: '5 to 10 minutes' },
      { title: 'We validate and file', desc: 'FVU validated, filed on TRACES, Form 16/16A generated and shared.', time: 'Before the due date' },
    ],
    personas: [
      { title: 'Monthly depositor', forms: 'Challan ITNS 281', desc: 'Employers and businesses depositing TDS by the 7th.', slug: 'tds-monthly-challan' },
      { title: 'Quarterly return filer', forms: '24Q / 26Q / 27Q', desc: 'Salary, non-salary and non-resident statements.', slug: 'tds-quarterly' },
      { title: 'Corrections', forms: 'Revised statement', desc: 'PAN errors, challan mismatch, short deduction notices.', slug: 'tds-correction' },
      { title: 'Property buyer', forms: 'Form 26QB', desc: 'One-time 1% TDS on purchase of property above ₹50 lakh.', slug: 'tds-26qb-property' },
    ],
    trust: ['TAN-based return experts', 'Zero late-fee guarantee on complete data', 'TRACES corrections handled', 'Form 16 in 2 days'],
    faqs: [
      { q: 'What is the due date for monthly TDS payment?', a: 'TDS deducted in a month must be deposited by the 7th of the next month. For March, the due date is 30 April. Government deductors follow different rules.' },
      { q: 'What are the quarterly TDS return due dates?', a: 'Q1 (April to June) by 31 July, Q2 (July to September) by 31 October, Q3 (October to December) by 31 January, Q4 (January to March) by 31 May.' },
      { q: 'What is the difference between Form 24Q, 26Q and 27Q?', a: '24Q is for TDS on salaries, 26Q for TDS on all other payments to residents (contractors, rent, professional fees, interest), and 27Q for payments to non-residents.' },
      { q: 'What is the penalty for late TDS return?', a: 'Late fee under section 234E is ₹200 per day until filed, capped at the TDS amount. A further penalty under 271H of ₹10,000 to ₹1,00,000 can apply if the return is more than a year late.' },
      { q: 'When is Form 26QB required?', a: 'When you buy immovable property worth ₹50 lakh or more from a resident seller, you must deduct 1% TDS and file Form 26QB within 30 days from the end of the month of payment. No TAN is required.' },
      { q: 'How is interest on late TDS calculated?', a: '1% per month from the date TDS was deductible to the date deducted, and 1.5% per month from the date deducted to the date deposited. Part of a month counts as a full month.' },
    ],
    deadlineKeys: ['tds-payment', 'tds-return'],
    facts: [
      { label: 'Deposit due', deadlineKey: 'tds-payment' },
      { label: 'Late deposit', value: '1.5% per month', hint: 'From deduction to deposit', icon: 'fee' },
      { label: 'Late return', value: '₹200 per day', hint: 'Section 234E', icon: 'fee' },
      { label: 'Form 16 / 16A', value: '2 business days', hint: 'After the quarterly return', icon: 'form' },
    ],
  },
  {
    id: 'registrations',
    name: 'Business Registrations',
    navLabel: 'Registrations',
    headline: 'Start and register your business',
    headlineEmphasis: 'without the paperwork headache.',
    intro:
      'PAN, TAN, MSME, IEC, DSC, GST, Startup India, Private Limited, LLP, OPC, partnership deeds, and CMA project reports for bank loans. Government fees shown separately.',
    metaTitle: 'Business Registration Services | Pvt Ltd, LLP, MSME, IEC, GST',
    metaDescription:
      'Company and LLP incorporation, MSME Udyam, IEC, DSC, TAN, Startup India recognition and project reports for bank loans. Fixed professional fees, government fees at actuals, 3 to 15 day turnaround.',
    keywords: ['pvt ltd registration cost', 'llp registration', 'msme registration', 'udyam registration', 'iec registration', 'cma report for bank loan', 'project report for mudra loan'],
    steps: [
      { title: 'Pick a registration', desc: 'Not sure which entity? Book a 30-minute structuring call first.', time: 'Under 2 minutes' },
      { title: 'Share KYC and details', desc: 'PAN, Aadhaar, address proof, proposed names. We prepare and file the forms.', time: '10 minutes' },
      { title: 'Receive your certificate', desc: 'Tracked on your dashboard. Post-registration compliance calendar shared.', time: '3 to 15 business days' },
    ],
    personas: [
      { title: 'Solo founder or freelancer', forms: 'MSME, GST, IEC', desc: 'Registrations that unlock loans, marketplaces and exports.', slug: 'msme-udyam' },
      { title: 'Startup raising funds', forms: 'Pvt Ltd, Startup India', desc: 'Investor-ready structure with DPIIT recognition.', slug: 'pvt-ltd-incorporation' },
      { title: 'Professional partnership', forms: 'LLP, partnership deed', desc: 'Two or more partners with limited liability.', slug: 'llp-incorporation' },
      { title: 'Business seeking a loan', forms: 'CMA data, project report', desc: 'Bank-format projections prepared by a Cost Accountant.', slug: 'cma-project-report' },
    ],
    trust: ['Prepared by CMA / CS professionals', 'Government fees at actuals', 'Name approval before you pay full fee', 'Compliance calendar after registration'],
    faqs: [
      { q: 'How much does Private Limited company registration cost?', a: 'Our professional fee is ₹6,999. Government fees (stamp duty, DIN, name reservation, DSC) vary by state and authorised capital, typically ₹2,000 to ₹8,000, and are charged at actuals with receipts.' },
      { q: 'LLP or Private Limited: which is better?', a: 'LLP suits professional services and partnerships with no plans to raise equity: lower compliance, no audit below ₹40 lakh turnover. Private Limited suits startups that will raise investment or issue ESOPs. Read our comparison guide or book a structuring call.' },
      { q: 'How long does MSME Udyam registration take?', a: 'Same day in most cases. It is free from the government; our fee covers preparation, filing and certificate download.' },
      { q: 'What is a CMA report for a bank loan?', a: 'Credit Monitoring Arrangement data: a bank-prescribed set of financial statements and projections (operating statement, fund flow, working capital assessment, ratios) that banks require for working capital and term loans. Cost and Management Accountants prepare these routinely.' },
      { q: 'Do I need a DSC?', a: 'A Class 3 Digital Signature Certificate is required to sign company incorporation forms, GST returns for companies and LLPs, income tax returns for audit cases, and tenders on GeM.' },
    ],
    deadlineKeys: [],
    facts: [
      { label: 'Pvt Ltd or LLP', value: '7 to 12 days', hint: 'Working days, MCA dependent', icon: 'speed' },
      { label: 'Udyam / MSME', value: 'Same day', hint: 'Certificate delivered', icon: 'check' },
      { label: 'Government fees', value: 'At actuals', hint: 'Receipts shared with you', icon: 'rupee' },
      { label: 'Afterwards', value: 'Compliance calendar', hint: 'First-year dates mapped', icon: 'calendar' },
    ],
  },
  {
    id: 'notices',
    name: 'Tax Notice Reply and Disputes',
    navLabel: 'Tax Notices',
    headline: 'Got a tax notice?',
    headlineEmphasis: 'Upload it, we tell you what it means for free.',
    intro:
      'Income tax intimations, defective return notices, scrutiny, reassessment, GST ASMT-10 and DRC-01 replies, TDS defaults and appeals. Free 10-minute triage, then a fixed quote.',
    metaTitle: 'Income Tax and GST Notice Reply Service | Free Triage',
    metaDescription:
      'Reply to income tax notices under 143(1), 139(9), 142(1), 143(2), 148 and GST notices ASMT-10, DRC-01 with a qualified professional. Upload your notice for a free assessment, then a fixed quote.',
    keywords: ['income tax notice reply', 'section 143(1) intimation', 'defective return 139(9)', 'section 148 notice', 'gst notice reply', 'asmt-10 reply', 'drc-01 reply'],
    steps: [
      { title: 'Upload the notice', desc: 'PDF or photo. We identify the section, the demand and the response deadline.', time: '2 minutes' },
      { title: 'Free triage call', desc: 'A professional explains what the notice means and quotes a fixed fee.', time: 'Within 4 working hours' },
      { title: 'Reply drafted and filed', desc: 'Response prepared, reviewed with you, submitted on the portal. Proof shared.', time: 'Before the deadline' },
    ],
    personas: [
      { title: 'Intimation or defect', forms: '143(1), 139(9)', desc: 'Mismatch with AIS or Form 26AS, or a defective return flag.', slug: 'notice-143-1' },
      { title: 'Scrutiny', forms: '142(1), 143(2)', desc: 'Documents requested or a case selected for detailed assessment.', slug: 'notice-scrutiny' },
      { title: 'Reassessment', forms: '148, 148A', desc: 'Income escaping assessment for an earlier year.', slug: 'notice-148' },
      { title: 'GST notice', forms: 'ASMT-10, DRC-01', desc: 'Return discrepancies, ITC mismatch, show-cause notices.', slug: 'gst-notice-reply' },
    ],
    trust: ['Free notice assessment', 'Fixed fee quoted before work', 'Deadline tracked for you', 'Appeals with empanelled CAs'],
    faqs: [
      { q: 'What is a section 143(1) intimation?', a: 'An automated communication after your return is processed. It shows the income and tax as filed versus as computed by the department. If there is a demand or reduced refund, you can respond or file a rectification under 154 within 30 days.' },
      { q: 'What is a defective return notice under 139(9)?', a: 'The department found an inconsistency, for example income shown in AIS but not in the return, or a missing schedule. You must respond within 15 days or the return is treated as invalid.' },
      { q: 'How long do I have to reply to a notice?', a: 'It depends on the section: 15 days for 139(9), 30 days for 143(1) responses, and the date printed on the notice for 142(1), 143(2) and GST notices. Missing the date can lead to best-judgment assessment. Upload your notice and we tell you the exact deadline.' },
      { q: 'Is the triage really free?', a: 'Yes. We read the notice, tell you what it means and what a reply involves, and quote a fixed fee. There is no charge if you decide not to proceed.' },
      { q: 'What is a GST ASMT-10 notice?', a: 'A scrutiny notice pointing out discrepancies in your GST returns, such as ITC claimed in 3B exceeding 2B or turnover mismatch with GSTR-1. You must reply in ASMT-11 within 30 days.' },
    ],
    deadlineKeys: [],
    facts: [
      { label: 'Free assessment', value: '4 working hours', hint: 'Upload the notice, we explain it', icon: 'speed' },
      { label: 'Fee', value: 'Fixed, upfront', hint: 'Quoted before any work', icon: 'rupee' },
      { label: 'Reply window', value: '15 to 30 days', hint: 'We track the date for you', icon: 'calendar' },
      { label: 'Appeals', value: 'Empanelled CAs', hint: 'CIT(A) and ITAT', icon: 'scale' },
    ],
  },
  {
    id: 'audit',
    name: 'Audit and Assurance',
    navLabel: 'Audit',
    headline: 'Audit season, handled properly.',
    headlineEmphasis: 'Signed by the right professional.',
    intro:
      'Tax audit under section 44AB, statutory audit under the Companies Act, cost audit under section 148 and internal audit. We prepare the working papers and schedules; the report is signed by the professional the law requires for that audit.',
    metaTitle: 'Tax Audit and Statutory Audit Services | 44AB, 148, Internal',
    metaDescription:
      'Tax audit under section 44AB, statutory audit, cost audit under section 148 and internal audit. Reports signed by the professional the law requires, from ₹14,999.',
    keywords: ['tax audit services', 'tax audit under 44ab', 'statutory audit services', 'cost audit section 148', 'internal audit services', 'tax audit fees india'],
    steps: [
      { title: 'Scope and quote', desc: 'Share turnover, entity type and last year\'s financials. We confirm which audits apply and quote a fixed fee.', time: 'Within 1 working day' },
      { title: 'Books and schedules', desc: 'We compile or review the books, prepare the annexures and reconcile GST, TDS and 26AS with the accounts.', time: '5 to 15 business days' },
      { title: 'Report signed and filed', desc: 'The empanelled Chartered Accountant or Cost Accountant reviews, signs and uploads the report before the due date.', time: 'Before the statutory due date' },
    ],
    personas: [
      { title: 'Business crossing 44AB limits', forms: '3CA / 3CB with 3CD', desc: 'Turnover above ₹1 crore, or ₹10 crore with 95% digital receipts.', slug: 'tax-audit-44ab' },
      { title: 'Private Limited or LLP', forms: 'Companies Act audit', desc: 'Every company needs a statutory audit regardless of turnover.', slug: 'statutory-audit' },
      { title: 'Manufacturer or regulated sector', forms: 'CRA-1, CRA-3, CRA-4', desc: 'Cost records and cost audit under section 148. This is a Cost Accountant\'s work.', slug: 'cost-audit-148' },
      { title: 'Growing business wanting control', forms: 'Section 138 internal audit', desc: 'Process, inventory and revenue leakage review, quarterly or annual.', slug: 'internal-audit' },
    ],
    trust: ['Signed by the professional the law requires', 'Working papers prepared in-house', 'Filed before the due date', 'GST, TDS and 26AS reconciled'],
    finder: [
      { label: 'Turnover above ₹1 crore', desc: 'Business, may need 44AB tax audit', slug: 'tax-audit-44ab' },
      { label: 'Professional receipts above ₹50 lakh', desc: 'Profession, may need 44AB', slug: 'tax-audit-44ab' },
      { label: 'Private Limited, OPC or LLP', desc: 'Statutory audit under Companies Act', slug: 'statutory-audit' },
      { label: 'Manufacturing or regulated sector', desc: 'Cost records and cost audit', slug: 'cost-audit-148' },
      { label: 'Want internal controls reviewed', desc: 'Internal audit under section 138', slug: 'internal-audit' },
      { label: 'Bank asked for certified accounts', desc: 'Certification and stock audit', slug: 'stock-audit' },
    ],
    faqs: [
      { q: 'Who is required to get a tax audit under section 44AB?', a: 'A business with turnover above ₹1 crore, raised to ₹10 crore when at least 95% of receipts and payments are digital, and a profession with gross receipts above ₹50 lakh (₹75 lakh with 95% digital). It also applies if you declare profit below the presumptive rate under 44AD or 44ADA after having opted in.' },
      { q: 'What is the tax audit due date for FY 2025-26?', a: 'The audit report in Form 3CA or 3CB with 3CD is due by 30 September 2026 and the return by 31 October 2026. Late filing of the report attracts a penalty under section 271B of 0.5% of turnover, capped at ₹1,50,000.' },
      { q: 'Can a Cost and Management Accountant sign a tax audit report?', a: 'No. Section 44AB reserves the tax audit report for a Chartered Accountant. Our CMA team prepares the books, schedules and 3CD annexures, and an empanelled Chartered Accountant reviews and signs the report. We name that professional on your order.' },
      { q: 'What is a cost audit and who signs it?', a: 'A cost audit under section 148 of the Companies Act examines cost records for specified industries above prescribed turnover limits. It must be conducted by a Cost and Management Accountant, not a Chartered Accountant, and is filed in Form CRA-3 and CRA-4.' },
      { q: 'Does every Private Limited company need a statutory audit?', a: 'Yes. Every company must have its accounts audited each year regardless of turnover or profit, including dormant and zero-revenue companies. LLPs need an audit only above ₹40 lakh turnover or ₹25 lakh contribution.' },
      { q: 'How much does a tax audit cost?', a: 'Our tax audit engagements start at ₹14,999 for a straightforward business within presumptive limits and rise with turnover, number of branches and the state of the books. We quote a fixed fee after a scope review, before any work begins.' },
      { q: 'Can you audit if you already do my accounting?', a: 'For statutory and tax audit, no. The auditor must be independent of the person maintaining the books. Where we keep your accounts, the audit is assigned to an empanelled professional with no involvement in that work.' },
      { q: 'What documents does an audit need?', a: 'Trial balance and ledgers, bank statements, sales and purchase registers, GST returns, TDS returns and Form 26AS, fixed asset register, loan statements, stock records and last year\'s audited financials.' },
    ],
    deadlineKeys: ['itr-audit'],
    facts: [
      { label: 'Return due', deadlineKey: 'itr-audit' },
      { label: '44AB threshold', value: '₹1 crore', hint: '₹10 crore with 95% digital receipts', icon: 'rupee' },
      { label: 'Signed by', value: 'Empanelled CA', hint: 'Cost audit signed by our CMA', icon: 'shield' },
      { label: 'Late report', value: '0.5% of turnover', hint: 'Up to ₹1.5 lakh, section 271B', icon: 'fee' },
    ],
  },
]

export const SERVICES: Service[] = [
  // ITR
  {
    slug: 'itr-salaried', category: 'itr', name: 'ITR for Salaried', whoFor: 'One Form 16, interest income, one house property',
    shortDesc: 'Regime comparison, AIS and 26AS reconciliation, e-verification and a basic 143(1) reply if needed.',
    longDesc: 'Built for employees with a single Form 16. Your expert compares old and new regimes on your actual numbers, reconciles TDS with Form 26AS and AIS, claims deductions you are entitled to, files ITR-1 or ITR-2 and guides you through e-verification.',
    unit: 'one_time', mrp: 999, price: 499, popular: true,
    includes: ['Old vs new regime comparison on your numbers', 'Form 16, AIS and 26AS reconciliation', 'HRA, 80C, 80D, home loan interest claims', 'ITR-1 or ITR-2 filing and e-verify guidance', 'Basic 143(1) intimation reply included'],
    documents: ['PAN and Aadhaar', 'Form 16', 'Bank interest certificate or statement', 'AIS and Form 26AS (we can download with your consent)', 'Rent receipts if claiming HRA', 'Investment proofs if using the old regime'],
    turnaroundDays: '1 business day',
    faqs: [
      { q: 'Do you handle two Form 16s?', a: 'Two or more Form 16s from a job change are covered under ITR for Salaried Plus.' },
      { q: 'Will you tell me which regime is better?', a: 'Yes. You get a side-by-side computation and we file under the regime that leaves you more money.' },
    ],
    keywords: ['itr filing for salaried', 'itr 1 filing online', 'form 16 itr filing'],
    relatedGuides: ['which-itr-form-to-file', 'old-vs-new-tax-regime'], relatedCalculators: ['income-tax', 'hra'],
  },
  {
    slug: 'itr-salaried-plus', category: 'itr', name: 'ITR for Salaried Plus', whoFor: 'Multiple Form 16s, HRA, capital gains up to 50 transactions, rental income',
    shortDesc: 'Everything in Salaried plus capital gains computation from broker and mutual fund statements.',
    longDesc: 'For employees who changed jobs, own property that earns rent, or have equity and mutual fund gains. Includes capital gains computation from broker P&L, grandfathering for pre-2018 holdings and rental income with 24(b) interest.',
    unit: 'one_time', mrp: 1999, price: 1299,
    includes: ['Everything in ITR for Salaried', 'Multiple Form 16 consolidation', 'Capital gains up to 50 transactions', 'Rental income and home loan interest', 'Loss set-off and carry-forward'],
    documents: ['All Form 16s', 'Broker capital gains statement', 'Mutual fund capital gains statement (CAMS / KFintech)', 'Rent agreement and loan interest certificate', 'AIS and Form 26AS'],
    turnaroundDays: '2 business days',
    faqs: [{ q: 'What counts as a transaction?', a: 'Each sale line in your broker or mutual fund capital gains statement. Above 50 lines, choose the Capital Gains plan.' }],
    keywords: ['itr 2 filing', 'itr with capital gains', 'itr for multiple form 16'],
    relatedGuides: ['capital-gains-tax-guide', 'hra-exemption'], relatedCalculators: ['capital-gains', 'income-tax'],
  },
  {
    slug: 'itr-capital-gains', category: 'itr', name: 'ITR for Investors and Capital Gains', whoFor: 'Equity, mutual funds, property, bonds, ESOP/RSU, unlimited transactions',
    shortDesc: 'Full capital gains computation with grandfathering, indexation choice for property and set-off planning.',
    longDesc: 'For active investors and anyone who sold property this year. Covers STCG and LTCG on listed equity, debt and hybrid funds, property with the 12.5% versus indexed 20% choice, ESOP and RSU perquisites, and sections 54, 54EC and 54F exemptions.',
    unit: 'one_time', mrp: 2999, price: 1999,
    includes: ['Unlimited equity and mutual fund transactions', 'Property sale with 54 / 54F / 54EC planning', 'ESOP, RSU and foreign stock reporting', 'Schedule FA for foreign assets', 'Loss carry-forward tracking'],
    documents: ['Broker tax P&L', 'Mutual fund capital gains statements', 'Property sale deed and purchase documents', 'ESOP / RSU statements', 'AIS and Form 26AS'],
    turnaroundDays: '2 to 3 business days',
    faqs: [{ q: 'Do you handle US stocks and RSUs?', a: 'Yes. We compute gains in INR at SBI TT buying rates, report Schedule FA and FSI, and claim DTAA credit for US tax withheld.' }],
    keywords: ['capital gains tax filing', 'itr for investors', 'ltcg itr filing'],
    relatedGuides: ['capital-gains-tax-guide', 'section-54-exemption'], relatedCalculators: ['capital-gains'],
  },
  {
    slug: 'itr-fno-trader', category: 'itr', name: 'ITR for F&O and Intraday Traders', whoFor: 'Futures, options, intraday equity, commodity and currency traders',
    shortDesc: 'Turnover computation, 44AD decision, loss carry-forward and tax audit arranged if thresholds are crossed.',
    longDesc: 'F&O and intraday income is business income and needs ITR-3. We compute turnover the way the ICAI guidance note prescribes, decide whether presumptive 44AD applies, set off and carry forward losses for 8 years, and flag audit if required. Audit-tier work is delivered by empanelled CAs.',
    unit: 'one_time', mrp: 3499, price: 2499, popular: true,
    includes: ['Turnover computation from broker P&L', '44AD versus regular books decision', 'ITR-3 with P&L and balance sheet', 'Loss carry-forward for 8 years', 'Tax audit arranged with an empanelled CA if thresholds are crossed'],
    documents: ['Broker tax P&L (Zerodha, Groww, Upstox, Angel etc.)', 'Contract notes if turnover is disputed', 'Bank statement', 'Salary Form 16 if applicable', 'AIS and Form 26AS'],
    turnaroundDays: '2 to 3 business days',
    faqs: [
      { q: 'Is tax audit compulsory for F&O losses?', a: 'Not automatically. Audit under 44AB is required if turnover exceeds ₹10 crore (₹1 crore if cash transactions exceed 5%), or if you declare profit below 6% of turnover under 44AD after having opted in earlier. We assess your case before filing.' },
      { q: 'Can I carry forward F&O losses?', a: 'Yes, for 8 assessment years against business income, provided the return is filed by the due date. Belated returns lose this right.' },
    ],
    keywords: ['itr for f&o traders', 'tax on f&o income', 'intraday trading itr', 'itr 3 filing for traders'],
    relatedGuides: ['fno-trading-tax-guide', 'tax-audit-for-traders'], relatedCalculators: ['fno-turnover', 'advance-tax'],
  },
  {
    slug: 'itr-freelancer', category: 'itr', name: 'ITR for Freelancers and Consultants', whoFor: 'Professionals under 44ADA, gig workers, creators',
    shortDesc: 'Presumptive 44ADA filing at 50% of receipts, GST advisory note and advance tax schedule.',
    longDesc: 'For designers, developers, doctors, consultants, creators and gig workers. We file ITR-4 under 44ADA where eligible, or ITR-3 with expenses where that saves more, and give you a GST and advance tax plan for next year.',
    unit: 'one_time', mrp: 3499, price: 2499,
    includes: ['44ADA versus actual-expense comparison', 'ITR-4 or ITR-3 filing', 'TDS reconciliation from clients (194J)', 'GST applicability note', 'Advance tax calendar for next year'],
    documents: ['Bank statements for the year', 'Invoices or receipts summary', 'Form 26AS and AIS', 'Expense summary if not using 44ADA'],
    turnaroundDays: '2 business days',
    faqs: [{ q: 'Is 44ADA always better?', a: 'Not if your real expenses exceed 50% of receipts. We compare both and file the one with lower tax.' }],
    keywords: ['itr for freelancers', '44ada itr filing', 'itr 4 filing'],
    relatedGuides: ['freelancer-tax-guide', 'gst-for-freelancers'], relatedCalculators: ['freelancer-44ada', 'advance-tax'],
  },
  {
    slug: 'itr-business', category: 'itr', name: 'ITR for Business and Proprietorship', whoFor: 'Shops, traders, agencies with books of account',
    shortDesc: 'P&L and balance sheet preparation, depreciation, ITR-3 filing, GST turnover reconciliation.',
    longDesc: 'For proprietors who maintain books or need them prepared. We compile P&L and balance sheet from your bank and GST data, compute depreciation, reconcile turnover with GSTR-1 and file ITR-3. Audit cases handled with an empanelled CA.',
    unit: 'one_time', mrp: 3999, price: 2999, priceFrom: true, priceNote: 'Minimum fee. Final fee depends on turnover and volume of transactions.',
    includes: ['P&L and balance sheet preparation', 'Depreciation schedule', 'GST turnover reconciliation', 'ITR-3 filing', 'Audit referral if turnover thresholds crossed'],
    documents: ['Bank statements', 'Sales and purchase registers or GST returns', 'Fixed asset details', 'Loan statements', 'AIS and Form 26AS'],
    turnaroundDays: '3 to 5 business days',
    faqs: [{ q: 'Can I use 44AD instead?', a: 'If turnover is under ₹2 crore (₹3 crore with 95% digital receipts) and you are fine declaring 6% or 8% profit, yes. We advise which route is cheaper.' }],
    keywords: ['itr for business', 'itr 3 filing', 'proprietorship itr'],
    relatedGuides: ['presumptive-taxation-44ad-44ada'], relatedCalculators: ['income-tax', 'advance-tax'],
  },
  {
    slug: 'itr-nri', category: 'itr', name: 'ITR for NRIs', whoFor: 'NRIs, OCIs, returning Indians with Indian income',
    shortDesc: 'Residential status, DTAA relief, NRO interest, rental income, property sale and Schedule FA.',
    longDesc: 'For non-residents with Indian rent, interest, capital gains or property sales, and for returning Indians in their transition year. Includes residential status determination, DTAA relief with TRC, Form 10F guidance and refund of excess TDS on NRO accounts.',
    unit: 'one_time', mrp: 5999, price: 4999, priceFrom: true, priceNote: 'Minimum fee. Final fee depends on volume of transactions.',
    includes: ['Residential status and RNOR check', 'DTAA relief and Form 10F guidance', 'NRO interest and rent reporting', 'Property sale gains and lower TDS certificate advice', 'Refund tracking of excess TDS'],
    documents: ['Passport with travel dates', 'NRO and NRE statements', 'Tax residency certificate if claiming DTAA', 'Property or rent documents', 'AIS and Form 26AS'],
    turnaroundDays: '3 business days',
    faqs: [{ q: 'Do NRIs get the new regime?', a: 'Yes, but not the 87A rebate. Standard deduction on salary applies if you have Indian salary.' }],
    keywords: ['nri itr filing', 'dtaa relief itr', 'nri tax return india'],
    relatedGuides: ['nri-taxation-guide'], relatedCalculators: ['income-tax', 'capital-gains'],
  },
  {
    slug: 'itr-belated', category: 'itr', name: 'Belated or Revised Return', whoFor: 'Missed the 31 July deadline, or need to correct a filed return',
    shortDesc: 'Belated return by 31 December with 234F fee computed, or revised return to fix errors.',
    longDesc: 'Missed the due date? A belated return can be filed until 31 December 2026 with a late fee of ₹1,000 or ₹5,000. Already filed but found a mistake? A revised return replaces it. Both start at the same minimum fee; the final fee depends on which ITR form applies.',
    unit: 'one_time', mrp: 2499, price: 1999, priceFrom: true, priceNote: 'Minimum fee. Final fee depends on the ITR form.',
    includes: ['Late fee and interest computation', 'Belated or revised ITR filing', 'Original return reconciliation', 'E-verify guidance'],
    documents: ['Same documents as the original return', 'Acknowledgement of original return if revising'],
    turnaroundDays: '1 to 2 business days',
    faqs: [{ q: 'Can I carry forward losses in a belated return?', a: 'Business and capital losses cannot be carried forward if the return is belated. House property loss can.' }],
    keywords: ['belated return filing', 'revised itr filing', 'itr after due date'],
    relatedGuides: ['belated-revised-updated-return'], relatedCalculators: ['income-tax'],
  },
  {
    slug: 'itr-updated', category: 'itr', name: 'Updated Return (ITR-U)', whoFor: 'Correcting or filing returns for up to 4 previous years',
    shortDesc: 'ITR-U with additional tax of 25% to 70% computed, for years where the belated window has closed.',
    longDesc: 'Section 139(8A) lets you file or update a return within 48 months of the end of the assessment year by paying additional tax. Useful when you missed filing entirely or under-reported income and want to regularise before a notice arrives.',
    unit: 'one_time', mrp: 2499, price: 1999, priceFrom: true, priceNote: 'Minimum fee. Final fee depends on the ITR form.',
    includes: ['Eligibility check (no refund or loss increase allowed)', 'Additional tax computation (25/50/60/70%)', 'ITR-U preparation and filing', 'Challan guidance'],
    documents: ['Income details for the relevant year', 'Original return if any', 'AIS and 26AS for that year'],
    turnaroundDays: '2 business days',
    faqs: [{ q: 'How much extra tax does ITR-U cost?', a: '25% of tax and interest if filed within 12 months of the end of the AY, 50% within 24 months, 60% within 36 months and 70% within 48 months.' }],
    keywords: ['itr u filing', 'updated return 139(8a)'],
    relatedGuides: ['belated-revised-updated-return'], relatedCalculators: [],
  },
  {
    slug: 'itr-llp', category: 'itr', name: 'ITR for Partnership Firms and LLPs', whoFor: 'LLPs and partnership firms, ITR-5',
    shortDesc: 'ITR-5 with partner remuneration and interest, book profit computation, audit coordination.',
    longDesc: 'Return filing for partnership firms and LLPs including partner remuneration limits under 40(b), interest on capital, and MAT/AMT where applicable. Tax audit above ₹1 crore turnover coordinated with an empanelled CA.',
    unit: 'one_time', mrp: 9999, price: 9999,
    includes: ['ITR-5 preparation and filing', 'Partner remuneration and interest computation', 'AMT check', 'Audit coordination if required'],
    documents: ['Audited or compiled financial statements', 'Partnership deed or LLP agreement', 'Bank statements', 'GST returns'],
    turnaroundDays: '5 business days',
    faqs: [], keywords: ['llp itr filing', 'partnership firm itr', 'itr 5 filing'], relatedGuides: ['llp-vs-pvt-ltd'], relatedCalculators: [],
  },
  {
    slug: 'itr-company', category: 'itr', name: 'ITR for Private Limited Companies', whoFor: 'Private Limited and OPC, ITR-6',
    shortDesc: 'ITR-6 with MAT computation, coordinated with statutory audit by an empanelled CA.',
    longDesc: 'Corporate return filing including MAT under 115JB, dividend and TDS reconciliation, and coordination with the statutory auditor. Statutory audit itself is performed by an empanelled Chartered Accountant.',
    unit: 'one_time', mrp: 14999, price: 14999, priceFrom: true, priceNote: 'Minimum fee. Final fee depends on turnover and volume of transactions.',
    includes: ['ITR-6 preparation and filing', 'MAT computation', 'Audit report coordination', 'Advance tax review for next year'],
    documents: ['Audited financial statements', 'Tax audit report if applicable', 'TDS and GST returns', 'Board resolutions for dividends'],
    turnaroundDays: '5 to 7 business days',
    faqs: [], keywords: ['company itr filing', 'itr 6 filing'], relatedGuides: ['startup-compliance-calendar'], relatedCalculators: [],
  },
  // GST
  {
    slug: 'gst-registration', category: 'gst', name: 'GST Registration', whoFor: 'New businesses, freelancers crossing the threshold, e-commerce sellers',
    shortDesc: 'Application, document preparation, ARN tracking and query replies until the GSTIN is issued.',
    longDesc: 'End-to-end GST registration including business type selection, HSN/SAC codes, document formatting, ARN tracking and replies to clarification notices. Includes a compliance calendar once your GSTIN is allotted.',
    unit: 'one_time', mrp: 1999, price: 1499,
    includes: ['Eligibility and scheme advice (regular vs composition)', 'Application with correct HSN / SAC codes', 'Aadhaar authentication support', 'Clarification notice replies', 'Post-registration compliance calendar'],
    documents: ['PAN and Aadhaar of proprietor / partners / directors', 'Business address proof and NOC or rent agreement', 'Bank statement or cancelled cheque', 'Photograph', 'Incorporation certificate for companies / LLPs'],
    turnaroundDays: '3 to 7 business days',
    faqs: [{ q: 'Is GST registration free?', a: 'The government charges no fee. Our fee covers preparation, filing and follow-up until approval.' }],
    keywords: ['gst registration online', 'gst registration for freelancers', 'gst registration documents'],
    relatedGuides: ['gst-registration-guide'], relatedCalculators: ['gst'],
  },
  {
    slug: 'gst-nil-return', category: 'gst', name: 'GST Nil Return', whoFor: 'Registered but no sales or purchases this period',
    shortDesc: 'Keeps your GSTIN active and avoids ₹20 per day late fee. Free, sign-up required.',
    longDesc: 'A registered taxpayer must file GSTR-1 and GSTR-3B every period even with no activity. We file nil returns free to keep you compliant, and you can upgrade to a paid plan whenever business starts.',
    unit: 'one_time', mrp: 0, price: 0,
    includes: ['Nil GSTR-1 and GSTR-3B', 'Filed same day', 'Late fee avoidance'],
    documents: ['GST login OTP access'], turnaroundDays: 'Same day', faqs: [], keywords: ['gst nil return filing'], relatedGuides: [], relatedCalculators: [],
  },
  {
    slug: 'gst-monthly', category: 'gst', name: 'GSTR-1 and GSTR-3B Monthly', whoFor: 'Regular taxpayers filing monthly',
    shortDesc: 'Monthly outward supplies and summary return with ITC matched to GSTR-2B before filing.',
    longDesc: 'Complete monthly GST compliance: GSTR-1 with B2B, B2C, credit notes and HSN summary, IMS actioning, ITC reconciliation against GSTR-2B, GSTR-3B with challan and a monthly summary report.',
    unit: 'month', mrp: 1199, price: 999, popular: true,
    includes: ['GSTR-1 by the 11th', 'ITC reconciliation with GSTR-2B and IMS', 'GSTR-3B by the 20th with challan', 'Monthly summary and due-date reminders', '₹899/month on 12-month prepay'],
    documents: ['Sales register or invoices', 'Purchase register or invoices', 'GST portal access'],
    turnaroundDays: 'Before each due date', faqs: [],
    keywords: ['gstr 1 filing', 'gstr 3b filing', 'monthly gst return filing charges'],
    relatedGuides: ['gst-return-filing-guide', 'itc-reconciliation'], relatedCalculators: ['gst'],
  },
  {
    slug: 'gst-qrmp', category: 'gst', name: 'GSTR-1 and GSTR-3B Quarterly (QRMP)', whoFor: 'Turnover up to ₹5 crore opting for quarterly returns',
    shortDesc: 'Quarterly GSTR-1 and 3B plus monthly PMT-06 tax payment and optional IFF for B2B invoices.',
    longDesc: 'Under the Quarterly Return Monthly Payment scheme you file twice a quarter but pay monthly. We compute PMT-06, upload B2B invoices through IFF so your buyers get credit on time, and file the quarterly returns.',
    unit: 'quarter', mrp: 2499, price: 1999,
    includes: ['Monthly PMT-06 computation', 'Optional IFF uploads for B2B invoices', 'Quarterly GSTR-1 and 3B', 'ITC reconciliation'],
    documents: ['Sales and purchase registers', 'GST portal access'], turnaroundDays: 'Before each due date', faqs: [],
    keywords: ['qrmp scheme filing', 'quarterly gst return'], relatedGuides: ['gst-return-filing-guide'], relatedCalculators: ['gst'],
  },
  {
    slug: 'gst-cmp08', category: 'gst', name: 'CMP-08 for Composition Dealers', whoFor: 'Composition scheme taxpayers',
    shortDesc: 'Quarterly statement-cum-challan at 1%, 5% or 6% of turnover, filed by the 18th.',
    longDesc: 'Composition dealers pay tax quarterly through CMP-08 and file GSTR-4 annually. We compute turnover-based tax and file on time.',
    unit: 'quarter', mrp: 1199, price: 999,
    includes: ['Turnover-based tax computation', 'CMP-08 filing by the 18th', 'Reverse charge inclusion'],
    documents: ['Sales summary', 'GST portal access'], turnaroundDays: 'Before the due date', faqs: [],
    keywords: ['cmp 08 filing', 'composition scheme gst return'], relatedGuides: ['gst-composition-scheme'], relatedCalculators: ['gst'],
  },
  {
    slug: 'gst-annual-9', category: 'gst', name: 'GSTR-9 Annual Return', whoFor: 'Turnover above ₹2 crore, or voluntary filing',
    shortDesc: 'Consolidated annual return reconciled with books, GSTR-1 and GSTR-3B, due 31 December.',
    longDesc: 'The annual return reconciles every monthly filing with your books. We prepare the turnover, ITC and tax paid tables, identify differences and file with explanations.',
    unit: 'one_time', mrp: 6999, price: 5999,
    includes: ['Reconciliation of GSTR-1, 3B and books', 'ITC and RCM tables', 'HSN summary', 'Filing by 31 December'],
    documents: ['All monthly returns', 'Audited or compiled financials', 'Purchase and sales registers'], turnaroundDays: '5 to 7 business days', faqs: [],
    keywords: ['gstr 9 filing', 'gst annual return'], relatedGuides: ['gstr-9-annual-return'], relatedCalculators: [],
  },
  {
    slug: 'gst-9c', category: 'gst', name: 'GSTR-9C Reconciliation Statement', whoFor: 'Turnover above ₹5 crore',
    shortDesc: 'Self-certified reconciliation of audited financials with GSTR-9.',
    longDesc: 'GSTR-9C reconciles turnover, tax paid and ITC per audited financial statements with the annual return. Prepared by a qualified professional and filed with GSTR-9.',
    unit: 'one_time', mrp: 9999, price: 8999,
    includes: ['Turnover and tax reconciliation', 'ITC reconciliation with financials', 'Self-certification support', 'Filing with GSTR-9'],
    documents: ['Audited financial statements', 'GSTR-9 working', 'Trial balance'], turnaroundDays: '7 business days', faqs: [],
    keywords: ['gstr 9c filing'], relatedGuides: ['gstr-9-annual-return'], relatedCalculators: [],
  },
  {
    slug: 'gst-4', category: 'gst', name: 'GSTR-4 Annual Return (Composition)', whoFor: 'Composition dealers, due 30 June',
    shortDesc: 'Annual return for composition taxpayers summarising CMP-08 payments.',
    longDesc: 'Annual consolidation of quarterly CMP-08 statements with inward supplies detail. Due 30 June after the financial year.',
    unit: 'one_time', mrp: 2999, price: 2499,
    includes: ['CMP-08 consolidation', 'Inward supply detail', 'Filing by 30 June'], documents: ['CMP-08 filings', 'Purchase summary'], turnaroundDays: '3 business days', faqs: [],
    keywords: ['gstr 4 filing'], relatedGuides: ['gst-composition-scheme'], relatedCalculators: [],
  },
  {
    slug: 'gst-10', category: 'gst', name: 'GSTR-10 Final Return', whoFor: 'Cancelled or surrendered GST registration',
    shortDesc: 'Final return within 3 months of cancellation with stock and ITC reversal.',
    longDesc: 'When registration is cancelled, GSTR-10 must be filed within three months declaring closing stock and reversing ITC. We also handle the cancellation application itself if needed.',
    unit: 'one_time', mrp: 2499, price: 1999,
    includes: ['Cancellation application (if not yet filed)', 'Closing stock and ITC reversal', 'GSTR-10 filing'], documents: ['Cancellation order', 'Closing stock detail'], turnaroundDays: '3 business days', faqs: [],
    keywords: ['gstr 10 final return', 'gst cancellation'], relatedGuides: [], relatedCalculators: [],
  },
  {
    slug: 'gst-itc-reconciliation', category: 'gst', name: 'ITC Reconciliation (Annual)', whoFor: 'Businesses with large purchase volumes or ITC mismatch notices',
    shortDesc: 'Full-year GSTR-2B versus books versus 3B reconciliation with vendor follow-up list.',
    longDesc: 'Identifies ITC claimed but not reflected in 2B, invoices in 2B not booked, and vendors who have not filed. Produces a follow-up list and the reversal or reclaim entries needed before GSTR-9.',
    unit: 'year', mrp: 5999, price: 4999,
    includes: ['12-month 2B versus books matching', 'Vendor default list', 'Reversal and reclaim schedule', 'Report for GSTR-9'], documents: ['Purchase register', 'GSTR-2B downloads', 'GSTR-3B filings'], turnaroundDays: '5 business days', faqs: [],
    keywords: ['itc reconciliation', 'gstr 2b reconciliation'], relatedGuides: ['itc-reconciliation'], relatedCalculators: [],
  },
  {
    slug: 'gst-amendment', category: 'gst', name: 'GST Amendment', whoFor: 'Change of address, partners, trade name, bank or business type',
    shortDesc: 'Core and non-core field amendments with supporting documents.',
    longDesc: 'Core field changes (name, address, partners) require officer approval; non-core changes are auto-approved. We prepare and file both with the right documents.',
    unit: 'one_time', mrp: 1199, price: 999,
    includes: ['Core or non-core amendment filing', 'Document preparation', 'Follow-up until approval'], documents: ['Proof of the change'], turnaroundDays: '2 to 7 business days', faqs: [],
    keywords: ['gst amendment'], relatedGuides: [], relatedCalculators: [],
  },
  // TDS
  {
    slug: 'tds-monthly-challan', category: 'tds', name: 'TDS Monthly Payment Support', whoFor: 'Employers and businesses deducting TDS every month',
    shortDesc: 'Section-wise TDS computation and challan ITNS 281 payment by the 7th.',
    longDesc: 'Every month we compute TDS across sections (192, 194C, 194J, 194I and others), generate the challan and share payment instructions or pay through your net banking with your consent. Keeps a running register for quarterly returns.',
    unit: 'month', mrp: 599, price: 499,
    includes: ['Section-wise TDS computation', 'Challan ITNS 281 generation', 'Payment by the 7th', 'Running TDS register'], documents: ['Monthly payment or payroll data', 'Deductee PANs'], turnaroundDays: 'By the 7th monthly', faqs: [],
    keywords: ['tds payment online', 'tds challan 281'], relatedGuides: ['tds-guide-for-employers'], relatedCalculators: ['tds'],
  },
  {
    slug: 'tds-quarterly', category: 'tds', name: 'TDS Quarterly Return (24Q / 26Q / 27Q)', whoFor: 'Any TAN holder filing quarterly statements',
    shortDesc: 'FVU-validated quarterly statement, filed on TRACES, with Form 16 / 16A generation.',
    longDesc: 'Preparation and filing of quarterly TDS statements for salary (24Q), non-salary (26Q) and non-resident (27Q) payments, including challan mapping, PAN validation, FVU generation and Form 16 / 16A download from TRACES.',
    unit: 'quarter', mrp: 4999, price: 3999, popular: true,
    includes: ['Challan and deductee mapping', 'PAN validation to avoid 20% default', 'FVU generation and filing', 'Form 16 / 16A generation', 'Default notice check on TRACES'], documents: ['Deductee details with PAN', 'Challan details', 'TRACES login'], turnaroundDays: 'Before the quarterly due date', faqs: [],
    keywords: ['tds return filing online', 'form 24q filing', 'form 26q filing'], relatedGuides: ['tds-guide-for-employers'], relatedCalculators: ['tds'],
  },
  {
    slug: 'tds-correction', category: 'tds', name: 'TDS Correction Statement', whoFor: 'PAN errors, challan mismatch, short deduction or late payment defaults',
    shortDesc: 'Revised statement on TRACES with justification report analysis.',
    longDesc: 'Download the justification report, identify the defaults (PAN error, challan mismatch, short deduction, interest), pay any balance and file the correction statement so demands are cleared.',
    unit: 'one_time', mrp: 4999, price: 3999,
    includes: ['Justification report analysis', 'Default interest computation', 'Correction statement filing', 'Demand closure tracking'], documents: ['TRACES login', 'Original statement details', 'Default notice'], turnaroundDays: '3 to 5 business days', faqs: [],
    keywords: ['tds correction statement', 'tds default notice'], relatedGuides: ['tds-guide-for-employers'], relatedCalculators: [],
  },
  {
    slug: 'tds-26qb-property', category: 'tds', name: 'Form 26QB for Property Purchase', whoFor: 'Buyers of property worth ₹50 lakh or more',
    shortDesc: '1% TDS challan-cum-statement within 30 days, Form 16B for the seller.',
    longDesc: 'Property buyers must deduct 1% TDS and file Form 26QB for each instalment and each buyer-seller pair. We compute, file and generate Form 16B. NRI sellers need Form 27Q and a TAN instead, which we also handle.',
    unit: 'one_time', mrp: 1999, price: 1499,
    includes: ['26QB per instalment and buyer-seller pair', 'Form 16B download', 'Late fee avoidance', 'NRI seller route (27Q) if applicable'], documents: ['Sale agreement', 'Buyer and seller PAN', 'Payment schedule'], turnaroundDays: '1 business day', faqs: [],
    keywords: ['form 26qb online', 'tds on property purchase', '1% tds property'], relatedGuides: ['tds-on-property-26qb'], relatedCalculators: ['tds'],
  },
  {
    slug: 'tan-registration', category: 'tds', name: 'TAN Registration', whoFor: 'New deductors',
    shortDesc: 'Form 49B application and TRACES account setup.',
    longDesc: 'Apply for a Tax Deduction Account Number and set up your TRACES account so you can file TDS returns and download Form 16.',
    unit: 'one_time', mrp: 999, price: 799,
    includes: ['Form 49B filing', 'TRACES registration', 'First-quarter guidance'], documents: ['PAN of entity', 'Address proof'], turnaroundDays: '5 to 7 business days', faqs: [],
    keywords: ['tan registration online'], relatedGuides: ['tds-guide-for-employers'], relatedCalculators: [],
  },
  {
    slug: 'form-16-generation', category: 'tds', name: 'Form 16 Generation', whoFor: 'Employers with up to 25 employees',
    shortDesc: 'Part A from TRACES plus Part B with salary breakup, digitally signed.',
    longDesc: 'Generate Form 16 Part A and B for every employee after Q4 24Q is filed, merge, digitally sign and share password-protected PDFs.',
    unit: 'one_time', mrp: 1199, price: 999,
    includes: ['Part A download', 'Part B with salary and deductions', 'Digital signing and password protection'], documents: ['Q4 24Q acknowledgement', 'Salary register'], turnaroundDays: '2 business days', faqs: [],
    keywords: ['form 16 generation', 'form 16 download'], relatedGuides: ['form-16-explained'], relatedCalculators: [],
  },
  // Registrations
  {
    slug: 'pan-application', category: 'registrations', name: 'PAN Application', whoFor: 'Individuals, firms, companies, trusts', shortDesc: 'New PAN or correction, e-PAN in 2 to 5 days.',
    longDesc: 'New PAN, reprint or correction for individuals and entities through the NSDL / UTIITSL route with document verification.', unit: 'one_time', mrp: 499, price: 299,
    includes: ['Form 49A / 49AA', 'Document verification', 'e-PAN delivery'], documents: ['Aadhaar or identity proof', 'Address proof', 'Photograph'], turnaroundDays: '2 to 5 business days', faqs: [], keywords: ['pan card apply online'], relatedGuides: [], relatedCalculators: [],
  },
  {
    slug: 'msme-udyam', category: 'registrations', name: 'MSME / Udyam Registration', whoFor: 'Any micro, small or medium business', shortDesc: 'Udyam certificate for loans, subsidies and delayed-payment protection. Same day.',
    longDesc: 'Udyam registration unlocks priority-sector lending, collateral-free CGTMSE loans, tender preferences and 45-day payment protection under the MSMED Act. We register or update your Udyam profile the same day.', unit: 'one_time', mrp: 499, price: 299,
    includes: ['Classification advice', 'Udyam filing', 'Certificate download', 'Benefits checklist'], documents: ['Aadhaar of proprietor / partner / director', 'PAN', 'GSTIN if any'], turnaroundDays: 'Same day', faqs: [], keywords: ['msme registration online', 'udyam registration'], relatedGuides: ['msme-benefits-guide'], relatedCalculators: [],
  },
  {
    slug: 'iec-registration', category: 'registrations', name: 'Import Export Code (IEC)', whoFor: 'Exporters and importers including service exporters', shortDesc: 'DGFT IEC application with bank and address verification.',
    longDesc: 'The IEC is mandatory for import or export of goods and for claiming export benefits. We file with DGFT and link it to your GSTIN and AD code.', unit: 'one_time', mrp: 2499, price: 1999,
    includes: ['DGFT application', 'AD code guidance', 'Annual update reminder'], documents: ['PAN', 'Bank certificate or cancelled cheque', 'Address proof', 'DSC for companies'], turnaroundDays: '2 to 3 business days', faqs: [], keywords: ['iec registration online', 'import export code'], relatedGuides: [], relatedCalculators: [],
  },
  {
    slug: 'dsc-class-3', category: 'registrations', name: 'Digital Signature Certificate (Class 3)', whoFor: 'Directors, partners, tender bidders, GST filers', shortDesc: '2-year Class 3 DSC with USB token, video verification.',
    longDesc: 'Class 3 DSC for MCA, income tax, GST and GeM tender use. Includes the USB token and paperless video KYC.', unit: 'one_time', mrp: 1799, price: 1499,
    includes: ['2-year validity', 'USB token', 'Video KYC support'], documents: ['PAN', 'Aadhaar', 'Photograph', 'Mobile and email'], turnaroundDays: '1 to 2 business days', faqs: [], keywords: ['class 3 dsc', 'digital signature certificate'], relatedGuides: [], relatedCalculators: [],
  },
  {
    slug: 'startup-india', category: 'registrations', name: 'Startup India (DPIIT) Recognition', whoFor: 'Companies and LLPs under 10 years old with innovative products', shortDesc: 'DPIIT recognition application with pitch write-up, for 80-IAC and angel tax benefits.',
    longDesc: 'DPIIT recognition gives access to tax holiday under 80-IAC (on separate application), angel tax exemption, self-certification under labour laws and fast-track IP. We draft the innovation write-up and file.', unit: 'one_time', mrp: 3499, price: 2999,
    includes: ['Eligibility check', 'Innovation write-up drafting', 'DPIIT filing', 'Certificate delivery'], documents: ['Incorporation certificate', 'Brief on product and innovation', 'Website or pitch deck'], turnaroundDays: '7 to 10 business days', faqs: [], keywords: ['startup india registration', 'dpiit recognition'], relatedGuides: ['startup-compliance-calendar'], relatedCalculators: [],
  },
  {
    slug: 'pvt-ltd-incorporation', category: 'registrations', name: 'Private Limited Company Incorporation', whoFor: 'Startups and businesses that will raise funds or issue ESOPs', shortDesc: 'SPICe+ incorporation with 2 DSCs, DIN, PAN, TAN, MOA/AOA. Government fees at actuals.',
    longDesc: 'Name reservation, SPICe+ filing, MOA and AOA drafting, DIN for two directors, PAN, TAN, EPFO and ESIC registration, and a post-incorporation compliance calendar. Government fees and stamp duty are charged at actuals with receipts.', unit: 'one_time', mrp: 7999, price: 6999, popular: true,
    includes: ['Name reservation (RUN / SPICe+ Part A)', 'MOA and AOA drafting', '2 DSCs and 2 DINs', 'PAN, TAN, EPFO, ESIC', 'Bank account opening support', 'First-year compliance calendar'], documents: ['PAN and Aadhaar of directors', 'Address proof of directors', 'Registered office proof and NOC', 'Photographs'], turnaroundDays: '7 to 12 business days', faqs: [], keywords: ['pvt ltd registration cost', 'private limited company registration'], relatedGuides: ['llp-vs-pvt-ltd', 'startup-compliance-calendar'], relatedCalculators: [],
  },
  {
    slug: 'llp-incorporation', category: 'registrations', name: 'LLP Incorporation', whoFor: 'Professional partnerships and service businesses', shortDesc: 'FiLLiP filing, LLP agreement drafting, 2 DSCs, PAN and TAN.',
    longDesc: 'Name reservation, FiLLiP incorporation, LLP agreement drafting and Form 3 filing, DPINs for two partners, PAN and TAN. Government fees at actuals.', unit: 'one_time', mrp: 6999, price: 5999,
    includes: ['Name reservation', 'FiLLiP filing', 'LLP agreement and Form 3', '2 DSCs and DPINs', 'PAN and TAN'], documents: ['PAN and Aadhaar of partners', 'Address proofs', 'Registered office proof'], turnaroundDays: '7 to 12 business days', faqs: [], keywords: ['llp registration online', 'llp incorporation cost'], relatedGuides: ['llp-vs-pvt-ltd'], relatedCalculators: [],
  },
  {
    slug: 'opc-incorporation', category: 'registrations', name: 'One Person Company (OPC)', whoFor: 'Solo founders wanting limited liability', shortDesc: 'OPC incorporation with nominee, DSC, DIN, PAN and TAN.',
    longDesc: 'Single-member company with a nominee, giving limited liability and a corporate identity without a co-founder.', unit: 'one_time', mrp: 7999, price: 6999,
    includes: ['Name reservation', 'SPICe+ filing', 'Nominee consent', 'DSC, DIN, PAN, TAN'], documents: ['PAN and Aadhaar of member and nominee', 'Address proofs', 'Office proof'], turnaroundDays: '7 to 12 business days', faqs: [], keywords: ['opc registration'], relatedGuides: ['llp-vs-pvt-ltd'], relatedCalculators: [],
  },
  {
    slug: 'partnership-deed', category: 'registrations', name: 'Partnership Firm Registration', whoFor: 'Two or more partners without limited liability', shortDesc: 'Deed drafting, stamping guidance, Registrar of Firms filing, PAN.',
    longDesc: 'Partnership deed drafted for your profit-sharing and remuneration terms, registered with the Registrar of Firms and PAN obtained.', unit: 'one_time', mrp: 4999, price: 3999,
    includes: ['Deed drafting', 'Registrar filing', 'PAN application'], documents: ['Partner PAN and Aadhaar', 'Office address proof'], turnaroundDays: '5 to 10 business days', faqs: [], keywords: ['partnership firm registration'], relatedGuides: ['llp-vs-pvt-ltd'], relatedCalculators: [],
  },
  {
    slug: 'trust-society-12a-80g', category: 'registrations', name: 'Trust / Society with 12A and 80G', whoFor: 'NGOs and charitable institutions', shortDesc: 'Registration plus 12A and 80G applications for tax exemption and donor deductions.',
    longDesc: 'Trust deed or society bye-laws, registration, PAN, and applications under sections 12A and 80G so the institution is exempt and donors get deductions.', unit: 'one_time', mrp: 11999, price: 9999,
    includes: ['Deed or bye-laws drafting', 'Registration', '12A and 80G applications', 'Darpan registration'], documents: ['Trustee / member KYC', 'Office proof', 'Objects of the institution'], turnaroundDays: '15 to 30 business days', faqs: [], keywords: ['12a 80g registration', 'trust registration'], relatedGuides: [], relatedCalculators: [],
  },
  {
    slug: 'shop-establishment', category: 'registrations', name: 'Shop and Establishment Registration', whoFor: 'Shops, offices and commercial establishments', shortDesc: 'State labour department registration required for bank accounts and payroll.',
    longDesc: 'State-specific Shop and Establishment Act registration, often needed to open a current account and required for hiring staff.', unit: 'one_time', mrp: 1499, price: 999,
    includes: ['State portal application', 'Certificate download', 'Renewal reminder'], documents: ['PAN', 'Address proof of premises', 'Employee count'], turnaroundDays: '3 to 10 business days', faqs: [], keywords: ['shop and establishment registration'], relatedGuides: [], relatedCalculators: [],
  },
  {
    slug: 'professional-tax', category: 'registrations', name: 'Professional Tax Registration', whoFor: 'Employers and professionals in states levying PT', shortDesc: 'PTEC and PTRC registration and first return.',
    longDesc: 'Registration under the state professional tax law for the enterprise and for employee deductions, with the first return filed.', unit: 'one_time', mrp: 1799, price: 1499,
    includes: ['PTEC and PTRC application', 'First return'], documents: ['PAN', 'Address proof', 'Employee details'], turnaroundDays: '5 to 7 business days', faqs: [], keywords: ['professional tax registration'], relatedGuides: [], relatedCalculators: [],
  },
  {
    slug: 'cma-project-report', category: 'registrations', name: 'CMA Data and Project Report for Bank Loan', whoFor: 'Businesses applying for working capital, term loans or Mudra loans', shortDesc: 'Bank-format CMA data with projections, ratios and fund flow prepared by a Cost Accountant.',
    longDesc: 'Credit Monitoring Arrangement data in the format banks prescribe: operating statement, analysis of balance sheet, working capital assessment, fund flow and ratio analysis, plus a project report narrative. Prepared by a CMA, which is the professional banks expect for this document. Fee depends on loan size.',
    unit: 'one_time', mrp: 14999, price: 4999,
    includes: ['CMA data (6 forms) for 3 to 5 years', 'Project report narrative', 'Ratio analysis and DSCR', 'One revision after bank feedback'], documents: ['Last 2 to 3 years financials', 'Loan requirement and purpose', 'Existing loan statements', 'Order book or sales pipeline'], turnaroundDays: '5 to 7 business days',
    faqs: [{ q: 'Why does the fee range from ₹4,999 to ₹14,999?', a: '₹4,999 covers Mudra and small loans up to ₹25 lakh. Larger working capital limits and term loans need more detailed projections and start at ₹9,999.' }],
    keywords: ['cma report for bank loan', 'project report for mudra loan', 'cma data preparation'], relatedGuides: ['cma-report-bank-loan'], relatedCalculators: ['emi'],
  },
  // Notices
  {
    slug: 'notice-143-1', category: 'notices', name: '143(1) Intimation Reply', whoFor: 'Demand or refund mismatch after processing', shortDesc: 'Response or rectification under 154 within 30 days.',
    longDesc: 'We compare the department computation with your return, identify the mismatch (usually TDS credit, AIS income or a deduction), and file the response or a rectification request.', unit: 'one_time', mrp: 1499, price: 999,
    includes: ['Mismatch analysis', 'Response or 154 rectification', 'Refund follow-up'], documents: ['Intimation PDF', 'Filed ITR and acknowledgement', 'Form 26AS and AIS'], turnaroundDays: '2 business days', faqs: [], keywords: ['143(1) intimation reply', 'intimation u/s 143(1)'], relatedGuides: ['income-tax-notices-explained'], relatedCalculators: [],
  },
  {
    slug: 'notice-139-9', category: 'notices', name: '139(9) Defective Return Reply', whoFor: 'Return flagged defective', shortDesc: 'Corrected return filed in response within 15 days.',
    longDesc: 'We identify the defect (missing schedule, income in AIS not reported, audit report mismatch), fix it and file the response so the original return date is preserved.', unit: 'one_time', mrp: 1999, price: 1499,
    includes: ['Defect analysis', 'Corrected return', 'Response filing within 15 days'], documents: ['Notice', 'Filed return', 'Supporting documents'], turnaroundDays: '2 business days', faqs: [], keywords: ['defective return 139(9)'], relatedGuides: ['income-tax-notices-explained'], relatedCalculators: [],
  },
  {
    slug: 'notice-scrutiny', category: 'notices', name: 'Scrutiny Assessment 142(1) / 143(2)', whoFor: 'Case selected for scrutiny', shortDesc: 'Document compilation, submissions on the e-proceedings portal, representation until order.',
    longDesc: 'Faceless scrutiny needs precise, complete submissions. We compile the evidence, draft replies to each query and represent you through the e-proceedings until the assessment order. Fee quoted after triage based on the issues raised.', unit: 'one_time', mrp: 7999, price: null,
    includes: ['Notice analysis and issue list', 'Evidence compilation', 'Written submissions', 'Follow-up until order'], documents: ['Notice and questionnaire', 'Return and financials', 'Bank statements and evidence requested'], turnaroundDays: 'Per notice timeline', faqs: [], keywords: ['scrutiny notice reply', '143(2) notice'], relatedGuides: ['income-tax-notices-explained'], relatedCalculators: [],
  },
  {
    slug: 'notice-148', category: 'notices', name: 'Reassessment 148 / 148A', whoFor: 'Notice for income escaping assessment', shortDesc: '148A show-cause reply, return in response to 148, and assessment representation.',
    longDesc: 'Reassessment notices have strict timelines and procedural safeguards. We reply to the 148A(b) show-cause with the legal position, file the return in response to 148 if issued, and represent through the proceedings. Appeals handled with an empanelled CA. Fee quoted after triage.', unit: 'one_time', mrp: 9999, price: null,
    includes: ['148A show-cause reply', 'Return in response to 148', 'Assessment submissions', 'Appeal advice'], documents: ['Notice', 'Information annexure', 'Records for the year'], turnaroundDays: 'Per notice timeline', faqs: [], keywords: ['section 148 notice reply', '148a notice'], relatedGuides: ['income-tax-notices-explained'], relatedCalculators: [],
  },
  {
    slug: 'gst-notice-reply', category: 'notices', name: 'GST Notice Reply (ASMT-10, DRC-01, DRC-07)', whoFor: 'Scrutiny, show-cause or demand notices under GST', shortDesc: 'Reconciliation-backed reply in ASMT-11 or DRC-06 with legal grounds.',
    longDesc: 'Most GST notices come from ITC mismatch, GSTR-1 versus 3B differences or e-way bill issues. We reconcile the numbers, draft the reply with supporting law and circulars, and file on the portal. Appeals to the appellate authority handled with an empanelled CA. Fee quoted after triage, from ₹4,999.', unit: 'one_time', mrp: 4999, price: null,
    includes: ['Notice analysis', 'Reconciliation workings', 'Reply drafting and filing', 'Personal hearing representation'], documents: ['Notice', 'GST returns for the period', 'Purchase and sales registers'], turnaroundDays: 'Per notice timeline', faqs: [], keywords: ['gst notice reply', 'asmt 10 reply', 'drc 01 reply'], relatedGuides: ['gst-notices-explained'], relatedCalculators: [],
  },
  {
    slug: 'tds-default-notice', category: 'notices', name: 'TDS Default Notice (TRACES)', whoFor: 'Short deduction, late payment interest, PAN error demands', shortDesc: 'Justification report analysis and correction to close the demand.',
    longDesc: 'Download the justification report, compute and pay the correct interest or shortfall, and file the correction statement so the demand is closed on TRACES.', unit: 'one_time', mrp: 2999, price: 2499,
    includes: ['Justification report analysis', 'Interest computation', 'Correction filing', 'Demand closure'], documents: ['TRACES login', 'Demand notice'], turnaroundDays: '3 to 5 business days', faqs: [], keywords: ['tds default notice', 'traces demand'], relatedGuides: ['tds-guide-for-employers'], relatedCalculators: [],
  },
  // Audit and assurance. Signing rights differ by audit type and the copy says
  // so plainly: 44AB and Companies Act audits are signed by an empanelled
  // Chartered Accountant, while cost audit under s.148 is a Cost Accountant's
  // statutory preserve. Never blur the two.
  {
    slug: 'tax-audit-44ab', category: 'audit', name: 'Tax Audit under Section 44AB', whoFor: 'Business turnover above ₹1 crore, or profession above ₹50 lakh',
    shortDesc: 'Form 3CA or 3CB with 3CD prepared, reviewed and signed by an empanelled Chartered Accountant.',
    longDesc: 'We compile the books, prepare every 3CD clause and annexure, reconcile turnover with your GST returns and TDS with Form 26AS, and settle the disallowances before they reach the report. An empanelled Chartered Accountant reviews and signs it, because section 44AB reserves that signature for a CA. The report is uploaded for your acceptance ahead of the 30 September due date.',
    unit: 'one_time', mrp: 19999, price: 14999, popular: true,
    includes: ['Books review and finalisation', 'Every 3CD clause and annexure prepared', 'Turnover reconciled with GST returns', 'TDS and 26AS reconciliation with a 40(a)(ia) check', 'Report signed by an empanelled Chartered Accountant', 'Return filed along with the report'],
    documents: ['Trial balance and ledgers, or your accounting file', 'Bank statements for the year', 'Sales and purchase registers', 'GST returns for the year', 'TDS returns and Form 26AS', 'Fixed asset register and loan statements', 'Closing stock statement', 'Last year audited financials and 3CD'],
    turnaroundDays: '10 to 15 business days',
    faqs: [
      { q: 'Does the fee include filing the return?', a: 'Yes. The return for the audited entity is filed as part of this engagement. There is nothing further to pay beyond the quoted fee and 18% GST.' },
      { q: 'My books are incomplete. Can you still do the audit?', a: 'Yes, but bookkeeping is quoted separately based on transaction volume. We tell you that additional cost before starting, not after.' },
      { q: 'Who signs my report?', a: 'A Chartered Accountant from our empanelled list, named on your order with their membership number. Section 44AB does not permit a Cost Accountant to sign it and we will not imply otherwise.' },
    ],
    keywords: ['tax audit under 44ab', 'tax audit services', 'form 3cd filing', 'tax audit fees', 'tax audit due date'],
    relatedGuides: ['fno-trading-tax-guide', 'llp-vs-pvt-ltd'], relatedCalculators: ['income-tax', 'advance-tax'],
  },
  {
    slug: 'statutory-audit', category: 'audit', name: 'Statutory Audit (Companies Act)', whoFor: 'Private Limited, OPC and LLPs crossing audit limits',
    shortDesc: 'Annual audit of company accounts with the auditor report, signed by an empanelled Chartered Accountant.',
    longDesc: 'Every company must have its accounts audited each year whatever the turnover, dormant companies included. We prepare the financial statements in Schedule III format with the notes and related-party disclosures, and an empanelled Chartered Accountant conducts and signs the audit. The fee depends on turnover, branches and the state of the records, so it is quoted after a scope review.',
    unit: 'one_time', mrp: 24999, price: null, quoteLabel: 'Quoted after scope review',
    includes: ['Schedule III financial statements and notes', 'Audit under the Companies Act by an empanelled CA', 'CARO reporting where applicable', 'Related-party and director disclosures', 'AOC-4 and MGT-7 coordination'],
    documents: ['Accounting file for the year', 'Bank statements and reconciliations', 'GST, TDS and PF or ESI returns', 'Board minutes and statutory registers', 'Loan and investment documents', 'Previous year audited accounts'],
    turnaroundDays: '15 to 25 business days',
    faqs: [
      { q: 'Does a dormant or zero-revenue company still need an audit?', a: 'Yes. The Companies Act requires an audit of every company every financial year regardless of activity. A nil-activity audit is quoted at the lower end of the range.' },
      { q: 'Do LLPs need a statutory audit?', a: 'Only if turnover exceeds ₹40 lakh or partner contribution exceeds ₹25 lakh in a financial year. Below both limits an LLP audit is optional.' },
    ],
    keywords: ['statutory audit services', 'company audit', 'companies act audit', 'llp audit limit'],
    relatedGuides: ['llp-vs-pvt-ltd'], relatedCalculators: [],
  },
  {
    slug: 'cost-audit-148', category: 'audit', name: 'Cost Records and Cost Audit (Section 148)', whoFor: 'Manufacturing and regulated sectors above prescribed limits',
    shortDesc: 'Cost records and cost audit conducted by a Cost and Management Accountant, as the law requires.',
    longDesc: 'Section 148 of the Companies Act requires specified industries above prescribed turnover limits to maintain cost records in CRA-1 format and have them audited. That audit must be conducted by a Cost and Management Accountant, so this is work our own CMA signs rather than refers out. We set up the costing system, maintain the records through the year and file CRA-3 and CRA-4.',
    unit: 'one_time', mrp: 39999, price: 24999,
    includes: ['Applicability check for your industry and turnover', 'Cost records set up in CRA-1 format', 'Cost audit and CRA-3 report signed by our CMA', 'CRA-4 filing with the Registrar', 'Product-wise cost sheets reconciled with the financials'],
    documents: ['Production and consumption data', 'Bill of materials and process flow', 'Financial statements and trial balance', 'Utility, labour and overhead records', 'Previous year cost audit report if any'],
    turnaroundDays: '15 to 25 business days',
    faqs: [
      { q: 'Who can sign a cost audit report?', a: 'Only a Cost and Management Accountant in practice. A Chartered Accountant cannot sign a cost audit report under section 148, just as a CMA cannot sign a tax audit report under section 44AB.' },
      { q: 'Which companies need a cost audit?', a: 'Companies in the regulated and non-regulated sectors listed in the Companies (Cost Records and Audit) Rules, such as pharmaceuticals, fertilisers, steel, cement, electricity, sugar and machinery, once turnover crosses the prescribed limits. We check applicability free of charge.' },
    ],
    keywords: ['cost audit section 148', 'cost records cra-1', 'cost auditor', 'cra-3 cra-4 filing', 'cost accountant audit'],
    relatedGuides: [], relatedCalculators: [],
  },
  {
    slug: 'internal-audit', category: 'audit', name: 'Internal Audit', whoFor: 'Growing businesses and companies covered by section 138',
    shortDesc: 'Process, revenue-leakage and control review with a quarterly report the board can act on.',
    longDesc: 'Internal audit under section 138 of the Companies Act may be conducted by a Chartered Accountant, a Cost Accountant or another professional the board appoints. We review purchase-to-pay, order-to-cash, inventory, payroll and statutory compliance, quantify the leakage and give you a report with an owner and a deadline against each finding rather than a list of observations.',
    unit: 'quarter', mrp: 34999, price: null, quoteLabel: 'Quoted after scope review',
    includes: ['Risk assessment and audit plan', 'Process walkthroughs and control testing', 'Inventory and revenue leakage review', 'Compliance check across GST, TDS and labour law', 'Quarterly report with owners and deadlines'],
    documents: ['Organisation chart and process notes', 'Accounting file and MIS', 'Purchase, sales and inventory records', 'Payroll data', 'Previous internal audit reports'],
    turnaroundDays: 'Per quarter, on an agreed calendar',
    faqs: [
      { q: 'Which companies must appoint an internal auditor?', a: 'Listed companies always, unlisted public companies above ₹50 crore turnover or ₹25 crore borrowings, and private companies above ₹200 crore turnover or ₹100 crore borrowings. Below those limits it is voluntary and usually still worth doing.' },
      { q: 'Can our statutory auditor also do the internal audit?', a: 'No. Section 144 bars the statutory auditor from providing internal audit services to the same company. We can do one or the other for you, not both.' },
    ],
    keywords: ['internal audit services', 'section 138 internal audit', 'internal audit firm', 'process audit'],
    relatedGuides: [], relatedCalculators: [],
  },
  {
    slug: 'stock-audit', category: 'audit', name: 'Stock Audit and Bank Certification', whoFor: 'Borrowers with working capital limits, and their lenders',
    shortDesc: 'Physical stock and book-debt verification for bank limits, with the certificate the lender expects.',
    longDesc: 'Banks require periodic verification of stock and receivables against the drawing power claimed in monthly stock statements. We verify physical stock, age the book debts, reconcile both with the books and issue the certificate in the lender format. Often paired with CMA data preparation for the same borrower.',
    unit: 'one_time', mrp: 14999, price: 9999,
    includes: ['Physical stock verification and valuation', 'Book debt ageing and reconciliation', 'Drawing power computation', 'Certificate in the lender format', 'Observations and corrective actions for the borrower'],
    documents: ['Stock statements filed with the bank', 'Purchase and sales registers', 'Debtor ageing', 'Sanction letter and terms', 'Godown or branch list'],
    turnaroundDays: '5 to 10 business days',
    faqs: [
      { q: 'Do you also prepare CMA data for the same loan?', a: 'Yes. CMA data and project reports are a separate service under registrations, and we discount the combined engagement when both are done together.' },
    ],
    keywords: ['stock audit', 'bank stock audit', 'drawing power certificate', 'book debt verification'],
    relatedGuides: ['cma-report-bank-loan'], relatedCalculators: ['emi'],
  },
]

export const CONSULTATIONS = [
  { slug: 'consult-30', name: '30-minute consultation', duration: 30, mrp: 999, price: 499, desc: 'One question, one answer. Regime choice, notice explanation, which plan to buy.', popular: true },
  { slug: 'consult-60', name: '60-minute consultation', duration: 60, mrp: 1999, price: 1499, desc: 'Multiple income sources, property sale planning, NRI transition year.' },
  { slug: 'consult-tax-planning', name: 'Tax planning session (salaried)', duration: 45, mrp: 2499, price: 1999, desc: 'Salary structuring, 80C to 80CCD, HRA and home loan, with a written plan.' },
  { slug: 'consult-startup', name: 'Startup structuring', duration: 60, mrp: 2999, price: 2499, desc: 'LLP vs Pvt Ltd, founder equity, GST and TDS setup, first-year calendar.' },
] as const

export function getCategory(id: string) {
  return CATEGORIES.find((c) => c.id === id)
}
export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug)
}
export function servicesIn(category: ServiceCategoryId) {
  return SERVICES.filter((s) => s.category === category)
}
export const CATEGORY_PATH: Record<ServiceCategoryId, string> = {
  itr: '/services/itr',
  gst: '/services/gst',
  tds: '/services/tds',
  registrations: '/services/registrations',
  notices: '/services/notices',
  audit: '/services/audit',
}
export function servicePath(s: Pick<Service, 'category' | 'slug'>) {
  return `${CATEGORY_PATH[s.category]}/${s.slug}`
}

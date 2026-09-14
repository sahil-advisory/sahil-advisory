import { SERVICES, getService, type Service } from './services'
import type { DocKind } from './db/schema'

// Structured document checklists per service, with an intake questionnaire
// whose answers switch conditional documents on and off. Services without an
// entry here fall back to their plain `documents` strings, classified by
// keyword, so every plan has a checklist from day one.
//
// Keys are stable identifiers: the portal stores them on each requirement so
// a later registry change does not orphan uploaded files.

export type IntakeQuestion = {
  id: string
  label: string
  help?: string
  type: 'boolean' | 'choice'
  options?: { value: string; label: string }[]
}

export type DocumentRequirement = {
  key: string
  label: string
  help?: string
  kind: DocKind
  required?: boolean // default true
  fetchable?: boolean // we can pull it with the client's consent
  // Show only when the intake answer matches. Absent means always.
  when?: { intake: string; equals: string | boolean }
}

export type Checklist = { intake: IntakeQuestion[]; documents: DocumentRequirement[] }

// Shared building blocks.
const PAN: DocumentRequirement = { key: 'pan', label: 'PAN card', kind: 'id', help: 'A clear photo of the card, or the e-PAN PDF.' }
const AADHAAR: DocumentRequirement = { key: 'aadhaar', label: 'Aadhaar', kind: 'id', help: 'Both sides. We need the number linked to your PAN for e-verification.' }
const AIS_26AS: DocumentRequirement = { key: 'ais-26as', label: 'AIS and Form 26AS', kind: 'form', fetchable: true, help: 'Tick consent and we download these from the income tax portal. Or download them yourself: e-filing portal, Services, Annual Information Statement.' }
const BANK_INTEREST: DocumentRequirement = { key: 'bank-interest', label: 'Bank interest certificate', kind: 'statement', help: 'Interest certificate for FY from each bank, or the passbook page showing interest credits.' }
const FORM16: DocumentRequirement = { key: 'form16', label: 'Form 16', kind: 'form', help: 'Both Part A and Part B, from your employer portal or HR. One per employer.' }
const RENT: DocumentRequirement = { key: 'rent-receipts', label: 'Rent receipts and agreement', kind: 'form', required: false, help: 'Monthly receipts or bank transfers. Landlord PAN if rent is above ₹1 lakh a year.', when: { intake: 'pays_rent', equals: true } }
const LOAN_INTEREST: DocumentRequirement = { key: 'home-loan-interest', label: 'Home loan interest certificate', kind: 'statement', required: false, help: 'From the lender, showing principal and interest for the year.', when: { intake: 'home_loan', equals: true } }
const INVESTMENT_PROOFS: DocumentRequirement = { key: 'investment-proofs', label: '80C, 80D and other deduction proofs', kind: 'form', required: false, help: 'PPF, ELSS, LIC, EPF, tuition fees, health insurance premium receipts, NPS statement.', when: { intake: 'regime', equals: 'old_or_unsure' } }
const BROKER_PNL: DocumentRequirement = { key: 'broker-pnl', label: 'Broker tax P&L statement', kind: 'statement', help: 'Tax P&L for the FY from Zerodha Console, Groww, Upstox, Angel One or your broker. Excel or PDF.' }
const MF_CAS: DocumentRequirement = { key: 'mf-capital-gains', label: 'Mutual fund capital gains statement', kind: 'statement', required: false, help: 'CAMS or KFintech capital gains statement for the FY.', when: { intake: 'mutual_funds', equals: true } }
const BANK_STATEMENTS: DocumentRequirement = { key: 'bank-statements', label: 'Bank statements for the year', kind: 'statement', help: '1 April to 31 March, every account used for business receipts. PDF from net banking.' }

const REGIME_Q: IntakeQuestion = {
  id: 'regime',
  label: 'Which tax regime do you want to use?',
  help: 'Not sure is fine. We compare both on your numbers and recommend one.',
  type: 'choice',
  options: [
    { value: 'new', label: 'New regime' },
    { value: 'old_or_unsure', label: 'Old regime, or not sure' },
  ],
}
const RENT_Q: IntakeQuestion = { id: 'pays_rent', label: 'Do you pay rent for the house you live in?', type: 'boolean' }
const LOAN_Q: IntakeQuestion = { id: 'home_loan', label: 'Do you have a home loan?', type: 'boolean' }
const JOB_CHANGE_Q: IntakeQuestion = { id: 'job_change', label: 'Did you change jobs during the year?', help: 'If yes, we need a Form 16 from each employer.', type: 'boolean' }
const MF_Q: IntakeQuestion = { id: 'mutual_funds', label: 'Did you sell any mutual fund units this year?', type: 'boolean' }

const SALARIED: Checklist = {
  intake: [REGIME_Q, RENT_Q, LOAN_Q, JOB_CHANGE_Q],
  documents: [
    PAN,
    AADHAAR,
    FORM16,
    { key: 'form16-previous', label: 'Form 16 from previous employer', kind: 'form', help: 'From the employer you left during the year.', when: { intake: 'job_change', equals: true } },
    AIS_26AS,
    BANK_INTEREST,
    RENT,
    LOAN_INTEREST,
    INVESTMENT_PROOFS,
  ],
}

const CHECKLISTS: Record<string, Checklist> = {
  'itr-salaried': SALARIED,
  'itr-salaried-plus': {
    intake: [REGIME_Q, RENT_Q, LOAN_Q, JOB_CHANGE_Q, MF_Q, { id: 'rental_income', label: 'Do you receive rent from a property you own?', type: 'boolean' }],
    documents: [
      ...SALARIED.documents,
      { ...BROKER_PNL, required: false, when: undefined },
      MF_CAS,
      { key: 'rental-income', label: 'Rent agreement and rent received', kind: 'agreement', required: false, help: 'Tenant agreement and the year\'s receipts or bank credits. Municipal tax receipts if paid.', when: { intake: 'rental_income', equals: true } },
    ],
  },
  'itr-capital-gains': {
    intake: [REGIME_Q, RENT_Q, LOAN_Q, MF_Q, { id: 'property_sale', label: 'Did you sell any property this year?', type: 'boolean' }, { id: 'foreign_assets', label: 'Do you hold foreign shares, ESOPs or RSUs?', type: 'boolean' }],
    documents: [
      PAN,
      AADHAAR,
      { ...FORM16, required: false, help: 'If you are also salaried.' },
      AIS_26AS,
      BANK_INTEREST,
      BROKER_PNL,
      MF_CAS,
      { key: 'property-sale', label: 'Sale deed and purchase documents', kind: 'agreement', help: 'Sale deed, original purchase deed, improvement bills, and the buyer\'s Form 16B.', when: { intake: 'property_sale', equals: true } },
      { key: 'esop-rsu', label: 'ESOP or RSU statements', kind: 'statement', help: 'Grant, vest and sale statements from the plan administrator. Foreign broker statement for Schedule FA.', when: { intake: 'foreign_assets', equals: true } },
      RENT,
      LOAN_INTEREST,
      INVESTMENT_PROOFS,
    ],
  },
  'itr-fno-trader': {
    intake: [REGIME_Q, { id: 'salaried_too', label: 'Do you also have salary income?', type: 'boolean' }, MF_Q],
    documents: [
      PAN,
      AADHAAR,
      BROKER_PNL,
      { key: 'contract-notes', label: 'Contract notes', kind: 'statement', required: false, help: 'Only if turnover is disputed or the broker P&L is incomplete.' },
      BANK_STATEMENTS,
      { ...FORM16, when: { intake: 'salaried_too', equals: true } },
      MF_CAS,
      AIS_26AS,
      INVESTMENT_PROOFS,
    ],
  },
  'itr-freelancer': {
    intake: [REGIME_Q, { id: 'gst_registered', label: 'Are you registered under GST?', type: 'boolean' }, { id: 'presumptive', label: 'Do you want to declare 50% of receipts as income (44ADA)?', help: 'Simplest option for most professionals. We check if actual expenses would save more.', type: 'choice', options: [{ value: 'yes', label: 'Yes, 44ADA' }, { value: 'unsure', label: 'Not sure, compare for me' }] }],
    documents: [
      PAN,
      AADHAAR,
      BANK_STATEMENTS,
      { key: 'invoices', label: 'Invoices or receipts summary', kind: 'statement', help: 'A list of invoices raised in the year, or the invoices themselves.' },
      AIS_26AS,
      { key: 'gst-returns', label: 'GST returns filed', kind: 'form', required: false, help: 'GSTR-1 and 3B for the year, to reconcile turnover.', when: { intake: 'gst_registered', equals: true } },
      { key: 'expense-summary', label: 'Expense summary', kind: 'statement', required: false, help: 'Rent, software, travel, salaries, depreciation-worthy assets.', when: { intake: 'presumptive', equals: 'unsure' } },
      INVESTMENT_PROOFS,
    ],
  },
  'itr-business': {
    intake: [{ id: 'gst_registered', label: 'Are you registered under GST?', type: 'boolean' }, { id: 'books', label: 'Do you maintain books of account?', type: 'boolean' }],
    documents: [
      PAN,
      AADHAAR,
      BANK_STATEMENTS,
      { key: 'sales-purchase', label: 'Sales and purchase registers', kind: 'statement', help: 'Excel or Tally export for the year.' },
      { key: 'gst-returns', label: 'GST returns filed', kind: 'form', when: { intake: 'gst_registered', equals: true } },
      { key: 'fixed-assets', label: 'Fixed asset details', kind: 'statement', required: false, help: 'Assets bought or sold in the year, with invoices.' },
      { key: 'loan-statements', label: 'Loan statements', kind: 'statement', required: false },
      { key: 'books', label: 'Trial balance or books', kind: 'statement', when: { intake: 'books', equals: true } },
      AIS_26AS,
    ],
  },
  'itr-nri': {
    intake: [{ id: 'dtaa', label: 'Do you want to claim DTAA relief?', help: 'Needs a tax residency certificate from your country of residence.', type: 'boolean' }, { id: 'property_sale', label: 'Did you sell property in India this year?', type: 'boolean' }, { id: 'rental_income', label: 'Do you receive rent in India?', type: 'boolean' }],
    documents: [
      PAN,
      { key: 'passport', label: 'Passport with travel stamps', kind: 'id', help: 'All pages with entry and exit stamps for the year, to determine residential status.' },
      { key: 'nro-nre', label: 'NRO and NRE account statements', kind: 'statement', help: '1 April to 31 March.' },
      { key: 'trc', label: 'Tax residency certificate', kind: 'agreement', help: 'From the tax authority of your country of residence, plus Form 10F.', when: { intake: 'dtaa', equals: true } },
      { key: 'property-sale', label: 'Sale deed and buyer\'s TDS certificate', kind: 'agreement', when: { intake: 'property_sale', equals: true } },
      { key: 'rental-income', label: 'Rent agreement and receipts', kind: 'agreement', when: { intake: 'rental_income', equals: true } },
      AIS_26AS,
    ],
  },
  'gst-monthly': {
    intake: [{ id: 'software', label: 'Where are your invoices?', type: 'choice', options: [{ value: 'tally', label: 'Tally or Busy' }, { value: 'excel', label: 'Excel or Google Sheets' }, { value: 'other', label: 'Zoho, Vyapar or other' }] }],
    documents: [
      { key: 'gst-login', label: 'GST portal access', kind: 'login', help: 'Enable API access on the GST portal (My Profile, Manage API Access, Yes) and share the OTP when we ask. Never share your password.' },
      { key: 'sales-register', label: 'Sales register for the month', kind: 'statement', help: 'Every invoice with GSTIN, date, taxable value and tax. Export from your software or our Excel template.' },
      { key: 'purchase-register', label: 'Purchase register for the month', kind: 'statement', help: 'Every purchase invoice with the supplier GSTIN, to match against GSTR-2B.' },
      { key: 'credit-debit-notes', label: 'Credit and debit notes', kind: 'statement', required: false },
    ],
  },
}

// ── Helpers ────────────────────────────────────────────────────────────────

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40)
}

export function classifyDoc(doc: string): DocKind {
  const d = doc.toLowerCase()
  if (/traces|login|portal access|password|credentials/.test(d)) return 'login'
  if (/pan|aadhaar|passport|photograph|identity|address proof|kyc/.test(d)) return 'id'
  if (/deed|agreement|resolution|noc|certificate of|bye-laws|trc|residency certificate/.test(d)) return 'agreement'
  if (/statement|register|p&l|ledger|summary|invoice|challan|payroll|data|details/.test(d)) return 'statement'
  return 'form'
}

// Plain strings from the registry become requirements with no conditions.
function fromStrings(service: Service): Checklist {
  return {
    intake: [],
    documents: service.documents.map((d) => ({
      key: slugify(d),
      label: d,
      kind: classifyDoc(d),
      fetchable: /ais|26as|with your consent/i.test(d),
    })),
  }
}

export function checklistFor(serviceSlug: string): Checklist | null {
  const service = getService(serviceSlug)
  if (!service) return null
  return CHECKLISTS[serviceSlug] ?? fromStrings(service)
}

export function hasStructuredChecklist(serviceSlug: string) {
  return serviceSlug in CHECKLISTS
}

// Resolve the checklist against intake answers. Conditional items whose
// question was not answered are kept as optional, so an unanswered intake
// never hides something the client might need to send.
export function resolveChecklist(serviceSlug: string, intake: Record<string, string | boolean> = {}): DocumentRequirement[] {
  const c = checklistFor(serviceSlug)
  if (!c) return []
  return c.documents
    .map((d) => {
      if (!d.when) return d
      const answer = intake[d.when.intake]
      if (answer === undefined) return { ...d, required: false }
      return answer === d.when.equals ? d : null
    })
    .filter((d): d is DocumentRequirement => d !== null)
}

export const SERVICES_WITH_CHECKLISTS = SERVICES.map((s) => s.slug)

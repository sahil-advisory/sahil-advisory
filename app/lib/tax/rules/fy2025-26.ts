// FY 2025-26 (AY 2026-27) rules under the Income-tax Act 1961.
// One file per FY. Calculators, guides and widgets import from here so a
// Budget change is a one-file edit. Never hardcode rates in components.

export type Slab = { from: number; to: number; rate: number }

export const FY = '2025-26'
export const AY = '2026-27'

export const NEW_REGIME = {
  slabs: [
    { from: 0, to: 400_000, rate: 0 },
    { from: 400_000, to: 800_000, rate: 5 },
    { from: 800_000, to: 1_200_000, rate: 10 },
    { from: 1_200_000, to: 1_600_000, rate: 15 },
    { from: 1_600_000, to: 2_000_000, rate: 20 },
    { from: 2_000_000, to: 2_400_000, rate: 25 },
    { from: 2_400_000, to: Infinity, rate: 30 },
  ] as Slab[],
  standardDeduction: 75_000,
  rebate87A: { maxRebate: 60_000, incomeLimit: 1_200_000 },
  // Surcharge on income above thresholds. Max 25% under the new regime.
  surcharge: [
    { above: 20_000_000, rate: 25 },
    { above: 10_000_000, rate: 25 },
    { above: 5_000_000, rate: 10 },
  ],
  // Employer NPS u/s 80CCD(2) cap as % of basic salary
  employerNpsCapPct: 14,
}

export const OLD_REGIME = {
  slabs: [
    { from: 0, to: 250_000, rate: 0 },
    { from: 250_000, to: 500_000, rate: 5 },
    { from: 500_000, to: 1_000_000, rate: 20 },
    { from: 1_000_000, to: Infinity, rate: 30 },
  ] as Slab[],
  seniorSlabs: [
    { from: 0, to: 300_000, rate: 0 },
    { from: 300_000, to: 500_000, rate: 5 },
    { from: 500_000, to: 1_000_000, rate: 20 },
    { from: 1_000_000, to: Infinity, rate: 30 },
  ] as Slab[],
  superSeniorSlabs: [
    { from: 0, to: 500_000, rate: 0 },
    { from: 500_000, to: 1_000_000, rate: 20 },
    { from: 1_000_000, to: Infinity, rate: 30 },
  ] as Slab[],
  standardDeduction: 50_000,
  rebate87A: { maxRebate: 12_500, incomeLimit: 500_000 },
  surcharge: [
    { above: 50_000_000, rate: 37 },
    { above: 20_000_000, rate: 25 },
    { above: 10_000_000, rate: 15 },
    { above: 5_000_000, rate: 10 },
  ],
  caps: {
    sec80C: 150_000,
    sec80D_self: 25_000,
    sec80D_self_senior: 50_000,
    sec80D_parents: 25_000,
    sec80D_parents_senior: 50_000,
    sec80CCD1B: 50_000,
    sec24b_selfOccupied: 200_000,
    sec80TTA: 10_000,
    sec80TTB: 50_000,
    employerNpsCapPct: 10,
  },
}

export const CESS_RATE = 4

// Capital gains (post 23 Jul 2024 rates)
export const CAPITAL_GAINS = {
  equity: {
    stcgRate: 20, // s.111A
    ltcgRate: 12.5, // s.112A
    ltcgExemption: 125_000,
    holdingMonths: 12,
  },
  debtMfAfterApr2023: { taxedAtSlab: true },
  property: {
    ltcgRate: 12.5,
    holdingMonths: 24,
    // Property bought before 23 Jul 2024: resident individuals may choose
    // 20% with indexation if lower.
    legacyIndexedRate: 20,
  },
  otherAssets: { holdingMonths: 24, ltcgRate: 12.5 },
  cryptoVDA: { rate: 30, tdsRate: 1 },
}

// Due dates for AY 2026-27 (FY 2025-26 income). ISO dates in IST.
// "verify": secondary-source items the owner must confirm before publish.
export const DUE_DATES = {
  itrNonAudit: '2026-07-31',
  itrNonAuditBusiness: '2026-08-31', // verify: CBDT extension pattern varies
  itrAudit: '2026-10-31',
  itrTransferPricing: '2026-11-30',
  belatedRevised: '2026-12-31',
  itrUpdatedWindowMonths: 48,
  taxAuditReport: '2026-09-30',
}

export const LATE_FEES = {
  sec234F: { standard: 5_000, lowIncome: 1_000, lowIncomeLimit: 500_000 },
  sec234A_monthlyPct: 1,
  sec234B_monthlyPct: 1,
  sec234C_monthlyPct: 1,
}

export const ADVANCE_TAX = {
  threshold: 10_000,
  instalments: [
    // Tax year 2026-27: instalment rule unchanged (s.408 of the 2025 Act).
    { date: '2026-06-15', cumulativePct: 15, label: '15 June' },
    { date: '2026-09-15', cumulativePct: 45, label: '15 September' },
    { date: '2026-12-15', cumulativePct: 75, label: '15 December' },
    { date: '2027-03-15', cumulativePct: 100, label: '15 March' },
  ],
  presumptive: { date: '2027-03-15', cumulativePct: 100 },
}

export const HRA = {
  metroPct: 50,
  nonMetroPct: 40,
  rentExcessPct: 10,
  metros: ['Delhi', 'Mumbai', 'Kolkata', 'Chennai'],
}

export const PRESUMPTIVE = {
  sec44AD: { turnoverLimit: 20_000_000, turnoverLimitDigital: 30_000_000, rateCash: 8, rateDigital: 6 },
  sec44ADA: { receiptsLimit: 5_000_000, receiptsLimitDigital: 7_500_000, rate: 50 },
}

export const TDS = {
  depositDay: 7,
  marchDepositDate: '04-30',
  quarterlyReturns: [
    { quarter: 'Q1 (Apr-Jun)', due: '07-31' },
    { quarter: 'Q2 (Jul-Sep)', due: '10-31' },
    { quarter: 'Q3 (Oct-Dec)', due: '01-31' },
    { quarter: 'Q4 (Jan-Mar)', due: '05-31' },
  ],
  sec234E_perDay: 200,
  interestLateDeductionPct: 1,
  interestLateDepositPct: 1.5,
  property26QB: { rate: 1, threshold: 5_000_000, daysAfterMonthEnd: 30 },
  rent194IB: { rate: 2, monthlyThreshold: 50_000 },
  common: [
    { section: '192', nature: 'Salary', rate: 'Slab rate', threshold: 'Basic exemption' },
    { section: '194A', nature: 'Interest (bank/post office)', rate: '10%', threshold: '₹50,000 (₹1,00,000 senior)' },
    { section: '194C', nature: 'Contractor payments', rate: '1% (individual/HUF), 2% (others)', threshold: '₹30,000 single / ₹1,00,000 aggregate' },
    { section: '194H', nature: 'Commission / brokerage', rate: '2%', threshold: '₹20,000' },
    { section: '194I', nature: 'Rent', rate: '2% plant & machinery, 10% land/building', threshold: '₹6,00,000 per year' },
    { section: '194J', nature: 'Professional / technical fees', rate: '10% professional, 2% technical', threshold: '₹50,000' },
    { section: '194-IA', nature: 'Purchase of property', rate: '1%', threshold: '₹50,00,000' },
    { section: '194-IB', nature: 'Rent by individual/HUF', rate: '2%', threshold: '₹50,000 per month' },
    { section: '194Q', nature: 'Purchase of goods', rate: '0.1%', threshold: '₹50,00,000' },
    { section: '194S', nature: 'Crypto / VDA transfer', rate: '1%', threshold: '₹10,000 / ₹50,000' },
  ],
}

export const GST = {
  // GST 2.0 from 22 September 2025 (56th Council, Notf 9/2025-CT(Rate)):
  // 12% and 28% folded into 5%, 18% and a 40% rate for luxury and sin goods.
  rates: [0, 5, 18, 40],
  registrationThreshold: { goods: 4_000_000, services: 2_000_000, specialStates: 1_000_000 }, // verify
  gstr1Day: 11,
  gstr3bDay: 20,
  qrmp: { gstr1Day: 13, gstr3bDays: [22, 24], pmt06Day: 25 },
  cmp08Day: 18,
  gstr9Date: '12-31',
  gstr4Date: '06-30',
  lateFeePerDay: { normal: 50, nil: 20 },
  interestPct: 18,
  compositionLimit: 15_000_000,
}

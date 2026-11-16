'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { AlertTriangle, CheckCircle2 } from 'lucide-react'
import { FY, TDS } from '@/app/lib/tax/rules/fy2025-26'
import { formatINR } from '@/app/lib/format'

const inputCls =
  'w-full rounded-lg border border-border-strong bg-white px-3 py-2.5 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100'

function num(s: string): number {
  const n = parseFloat(s)
  return Number.isFinite(n) && n > 0 ? n : 0
}

function MoneyInput({ label, value, onChange, hint }: { label: string; value: string; onChange: (v: string) => void; hint?: string }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-text-2">{label}</span>
      <div className="relative mt-1">
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-muted" aria-hidden>₹</span>
        <input
          type="text"
          inputMode="numeric"
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/[^\d.]/g, ''))}
          className={`${inputCls} pl-7 font-mono tabular`}
          placeholder="0"
        />
      </div>
      {hint ? <span className="mt-1 block text-[11px] text-muted">{hint}</span> : null}
    </label>
  )
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={`flex items-baseline justify-between gap-3 py-1.5 text-sm ${strong ? 'mt-1 border-t border-border pt-2' : ''}`}>
      <span className="text-text-2">{label}</span>
      <span className={`font-mono tabular ${strong ? 'text-base font-bold text-navy-900' : 'font-semibold text-navy-900'}`}>{value}</span>
    </div>
  )
}

// Structured logic per section. Labels/rate text come from TDS.common in the
// rules file; the numbers here mirror those strings so the UI stays correct.
type Variant = { key: string; label: string; rate: number; threshold?: number }
type SectionLogic = {
  variantLabel?: string
  variants?: Variant[]
  rate?: number
  threshold: number
  thresholdKind: 'aggregatePerYear' | 'perTransaction' | 'perMonth' | 'excessOverThreshold'
  amountLabel: string
  aggregateLabel?: string
  singleThreshold?: number
  noPanRate?: number
  note?: string
}

const LOGIC: Record<string, SectionLogic> = {
  '194A': {
    variantLabel: 'Payee',
    variants: [
      { key: 'general', label: 'Individual below 60 / others', rate: 10, threshold: 50_000 },
      { key: 'senior', label: 'Senior citizen (60+)', rate: 10, threshold: 100_000 },
    ],
    threshold: 50_000,
    thresholdKind: 'aggregatePerYear',
    amountLabel: 'Interest paid in the year',
    note: 'Threshold applies per bank/payer for the whole financial year.',
  },
  '194C': {
    variantLabel: 'Contractor is',
    variants: [
      { key: 'ind', label: 'Individual or HUF', rate: 1 },
      { key: 'other', label: 'Company, firm, LLP, others', rate: 2 },
    ],
    threshold: 100_000,
    singleThreshold: 30_000,
    thresholdKind: 'aggregatePerYear',
    amountLabel: 'This payment (single bill)',
    aggregateLabel: 'Total paid to this contractor in the year (including this bill)',
    note: 'TDS applies if a single payment exceeds ₹30,000 or the yearly total exceeds ₹1,00,000. Once it applies, deduct on the whole amount.',
  },
  '194H': { rate: 2, threshold: 20_000, thresholdKind: 'aggregatePerYear', amountLabel: 'Commission or brokerage paid in the year' },
  '194I': {
    variantLabel: 'Rent for',
    variants: [
      { key: 'pm', label: 'Plant, machinery or equipment', rate: 2 },
      { key: 'lb', label: 'Land, building, furniture or fittings', rate: 10 },
    ],
    threshold: 600_000,
    thresholdKind: 'aggregatePerYear',
    amountLabel: 'Rent paid in the year',
    note: 'For businesses and audited individuals. Non-audited individuals paying rent use section 194-IB instead.',
  },
  '194J': {
    variantLabel: 'Nature of fee',
    variants: [
      { key: 'prof', label: 'Professional fees (CA, lawyer, doctor, consultant)', rate: 10 },
      { key: 'tech', label: 'Technical services, royalty for films, call centre', rate: 2 },
    ],
    threshold: 50_000,
    thresholdKind: 'aggregatePerYear',
    amountLabel: 'Fees paid in the year',
  },
  '194-IA': {
    rate: 1,
    threshold: 5_000_000,
    thresholdKind: 'perTransaction',
    amountLabel: 'Property consideration (or stamp duty value if higher)',
    note: 'Applies when the consideration or stamp duty value is ₹50 lakh or more. Buyer deducts and files Form 26QB (Form 141 for payments from 1 April 2026) within 30 days of month end; no TAN needed.',
  },
  '194-IB': {
    rate: 2,
    threshold: 50_000,
    thresholdKind: 'perMonth',
    amountLabel: 'Monthly rent',
    note: 'For individuals/HUFs not liable to tax audit. Deduct once in the last month of the year or tenancy on the total rent for the year and file Form 26QC (Form 141 for payments from 1 April 2026).',
  },
  '194Q': {
    rate: 0.1,
    threshold: 5_000_000,
    thresholdKind: 'excessOverThreshold',
    amountLabel: 'Purchases from this seller in the year',
    noPanRate: 5,
    note: 'Only buyers with turnover above ₹10 crore in the previous year. TDS is on the amount exceeding ₹50 lakh.',
  },
  '194S': {
    variantLabel: 'Payer is',
    variants: [
      { key: 'specified', label: 'Specified person (individual/HUF without audit)', rate: 1, threshold: 50_000 },
      { key: 'other', label: 'Any other person', rate: 1, threshold: 10_000 },
    ],
    threshold: 10_000,
    thresholdKind: 'aggregatePerYear',
    amountLabel: 'Consideration for crypto / VDA transfer in the year',
  },
}

const SECTIONS = TDS.common.filter((s) => s.section !== '192' && LOGIC[s.section])

export default function TdsCalculator() {
  const [section, setSection] = useState('194J')
  const [variant, setVariant] = useState<Record<string, string>>({})
  const [amount, setAmount] = useState('60000')
  const [aggregate, setAggregate] = useState('')
  const [hasPan, setHasPan] = useState(true)

  const meta = SECTIONS.find((s) => s.section === section) ?? SECTIONS[0]
  const logic = LOGIC[meta.section]
  const activeVariant = logic.variants ? logic.variants.find((v) => v.key === variant[meta.section]) ?? logic.variants[0] : undefined

  const r = useMemo(() => {
    const amt = num(amount)
    const agg = Math.max(num(aggregate), amt)
    const baseRate = activeVariant?.rate ?? logic.rate ?? 0
    const threshold = activeVariant?.threshold ?? logic.threshold
    let applies = false
    let base = amt
    let reason = ''
    switch (logic.thresholdKind) {
      case 'aggregatePerYear': {
        const single = logic.singleThreshold
        const singleHit = single !== undefined && amt > single
        const aggHit = agg > threshold
        applies = singleHit || aggHit
        reason = applies
          ? singleHit
            ? `Single payment ${formatINR(amt)} exceeds ${formatINR(single ?? 0)}.`
            : `Yearly total ${formatINR(agg)} exceeds the ${formatINR(threshold)} threshold.`
          : single !== undefined
            ? `Below both limits: ${formatINR(single)} per bill and ${formatINR(threshold)} for the year.`
            : `Yearly total ${formatINR(agg)} is within the ${formatINR(threshold)} threshold.`
        break
      }
      case 'perTransaction':
        applies = amt >= threshold
        reason = applies ? `Consideration is ${formatINR(threshold)} or more, so TDS applies on the full amount.` : `Below ${formatINR(threshold)}, no TDS.`
        break
      case 'perMonth':
        applies = amt > threshold
        base = amt * 12
        reason = applies ? `Monthly rent exceeds ${formatINR(threshold)}. TDS shown on 12 months' rent (${formatINR(base)}).` : `Monthly rent within ${formatINR(threshold)}, no TDS.`
        break
      case 'excessOverThreshold':
        applies = amt > threshold
        base = Math.max(0, amt - threshold)
        reason = applies ? `TDS on the excess over ${formatINR(threshold)}, i.e. ${formatINR(base)}.` : `Purchases within ${formatINR(threshold)}, no TDS.`
        break
    }
    const noPanRate = logic.noPanRate ?? Math.max(20, baseRate)
    const rate = hasPan ? baseRate : noPanRate
    const tds = applies ? Math.round((base * rate) / 100) : 0
    return { amt, agg, baseRate, rate, threshold, applies, base, reason, tds, net: base - tds, noPanRate }
  }, [amount, aggregate, hasPan, activeVariant, logic])

  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
      <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-[var(--shadow-card)]">
        <h2 className="text-base font-bold text-navy-900">Payment details</h2>
        <div className="mt-4 space-y-4">
          <label className="block">
            <span className="text-xs font-semibold text-text-2">Nature of payment</span>
            <select value={section} onChange={(e) => setSection(e.target.value)} className={`${inputCls} mt-1`}>
              {SECTIONS.map((s) => (
                <option key={s.section} value={s.section}>
                  {s.nature} — s.{s.section}
                </option>
              ))}
            </select>
            <span className="mt-1 block text-[11px] text-muted">
              Rate {meta.rate}; threshold {meta.threshold}. For salary (s.192) use the{' '}
              <Link href="/calculators/income-tax" className="font-semibold text-green-700 underline underline-offset-2">income tax calculator</Link>; employers deduct at slab rate.
            </span>
          </label>
          {logic.variants ? (
            <label className="block">
              <span className="text-xs font-semibold text-text-2">{logic.variantLabel}</span>
              <select
                value={activeVariant?.key}
                onChange={(e) => setVariant((v) => ({ ...v, [meta.section]: e.target.value }))}
                className={`${inputCls} mt-1`}
              >
                {logic.variants.map((v) => (
                  <option key={v.key} value={v.key}>
                    {v.label} — {v.rate}%{v.threshold ? `, threshold ${formatINR(v.threshold)}` : ''}
                  </option>
                ))}
              </select>
            </label>
          ) : null}
          <MoneyInput label={logic.amountLabel} value={amount} onChange={setAmount} />
          {logic.aggregateLabel ? <MoneyInput label={logic.aggregateLabel} value={aggregate} onChange={setAggregate} hint="Leave blank if this is the only payment." /> : null}
          <label className="flex items-center gap-2 text-sm text-text-2">
            <input type="checkbox" checked={hasPan} onChange={(e) => setHasPan(e.target.checked)} className="h-4 w-4 accent-green-600" />
            Deductee has furnished PAN (and PAN is linked with Aadhaar)
          </label>
          {logic.note ? <p className="rounded-lg border border-border bg-bg-alt p-3 text-[11px] leading-relaxed text-muted">{logic.note}</p> : null}
        </div>
      </div>

      <div className="lg:sticky lg:top-24">
        <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-[var(--shadow-card)]">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-base font-bold text-navy-900">TDS under section {meta.section}</h2>
            <span className="rounded-md border border-navy-100 bg-navy-100 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-navy-900">FY {FY} / TY 2026-27</span>
          </div>
          <div className={`mt-4 flex items-start gap-2 rounded-xl border p-3 text-sm ${r.applies ? 'border-green-100 bg-green-50 text-green-700' : 'border-border bg-bg-alt text-text-2'}`}>
            {r.applies ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden /> : <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-muted" aria-hidden />}
            <div>
              <p className="font-semibold">{r.applies ? 'TDS applies' : 'No TDS required'}</p>
              <p className="text-xs opacity-90">{r.reason}</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-border bg-bg-alt p-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted">TDS to deduct</p>
              <p className="mt-1 font-mono tabular text-2xl font-bold text-navy-900">{formatINR(r.tds)}</p>
              <p className="text-xs text-muted">
                @ {r.rate}%{!hasPan ? ' (no PAN, s.206AA)' : ''}
              </p>
            </div>
            <div className="rounded-xl border border-green-100 bg-green-50 p-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-green-700">Net payment</p>
              <p className="mt-1 font-mono tabular text-2xl font-bold text-navy-900">{formatINR(r.net)}</p>
              <p className="text-xs text-muted">After TDS</p>
            </div>
          </div>
          <div className="mt-4">
            <Row label="Amount on which TDS is computed" value={formatINR(r.base)} />
            <Row label="Threshold" value={logic.thresholdKind === 'perMonth' ? `${formatINR(r.threshold)} / month` : formatINR(r.threshold)} />
            <Row label="Standard rate" value={`${r.baseRate}%`} />
            {!hasPan ? <Row label="Rate without PAN" value={`${r.noPanRate}%`} /> : null}
            <Row label="TDS" value={formatINR(r.tds)} />
            <Row label="Net payable to deductee" value={formatINR(r.net)} strong />
          </div>
          <div className="mt-4 rounded-lg border border-border bg-bg-alt/60 p-3 text-[11px] leading-relaxed text-muted">
            <strong className="text-text-2">Assumptions:</strong> FY {FY} rates and thresholds as revised by Budget 2025; the thresholds carry into section 393 of the Income-tax Act 2025 for tax year 2026-27. Without PAN (or with an inoperative PAN) TDS is at 20% or
            the section rate, whichever is higher (5% for s.194Q). No surcharge or cess on TDS for resident payees. Deposit TDS by the {TDS.depositDay}th of the next month
            (30 April for March); interest {TDS.interestLateDeductionPct}% per month for late deduction and {TDS.interestLateDepositPct}% for late deposit; late-filing fee{' '}
            {formatINR(TDS.sec234E_perDay)} per day u/s 234E (section 427 from tax year 2026-27). Lower-deduction certificates u/s 197 and Form 15G/15H are not modelled.
          </div>
        </div>
      </div>
    </div>
  )
}

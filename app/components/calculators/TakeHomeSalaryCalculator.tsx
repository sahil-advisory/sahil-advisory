'use client'

import { useMemo, useState } from 'react'
import { computeNewRegime } from '@/app/lib/tax/compute'
import { FY, NEW_REGIME } from '@/app/lib/tax/rules/fy2025-26'
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

function PctInput({ label, value, onChange, hint }: { label: string; value: string; onChange: (v: string) => void; hint?: string }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-text-2">{label}</span>
      <div className="relative mt-1">
        <input
          type="text"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/[^\d.]/g, ''))}
          className={`${inputCls} pr-8 font-mono tabular`}
          placeholder="0"
        />
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-muted" aria-hidden>%</span>
      </div>
      {hint ? <span className="mt-1 block text-[11px] text-muted">{hint}</span> : null}
    </label>
  )
}

function Toggle({ label, checked, onChange, hint }: { label: string; checked: boolean; onChange: (v: boolean) => void; hint?: string }) {
  return (
    <label className="flex items-start gap-2 text-sm text-text-2">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="mt-0.5 h-4 w-4 accent-green-600" />
      <span>
        {label}
        {hint ? <span className="block text-[11px] text-muted">{hint}</span> : null}
      </span>
    </label>
  )
}

// Statutory constants for the estimate (EPF Act, state professional tax, Gratuity Act).
const PF_RATE = 12
const PF_WAGE_CEILING_MONTHLY = 15_000
const PF_CAP_MONTHLY = (PF_WAGE_CEILING_MONTHLY * PF_RATE) / 100 // 1,800
const PROFESSIONAL_TAX_ANNUAL = 2_500
const GRATUITY_PCT = 4.81

export default function TakeHomeSalaryCalculator() {
  const [ctc, setCtc] = useState('1200000')
  const [basicPct, setBasicPct] = useState('40')
  const [hraPct, setHraPct] = useState('50')
  const [employerPfInCtc, setEmployerPfInCtc] = useState(true)
  const [pfCapped, setPfCapped] = useState(true)
  const [ptApplies, setPtApplies] = useState(true)
  const [gratuityInCtc, setGratuityInCtc] = useState(false)

  const r = useMemo(() => {
    const C = num(ctc)
    const basic = (C * num(basicPct)) / 100
    const hra = (basic * num(hraPct)) / 100
    const pfUncapped = (basic * PF_RATE) / 100
    const pf = pfCapped && basic / 12 > PF_WAGE_CEILING_MONTHLY ? PF_CAP_MONTHLY * 12 : pfUncapped
    const employerPf = pf
    const employeePf = pf
    const gratuity = gratuityInCtc ? (basic * GRATUITY_PCT) / 100 : 0
    const gross = Math.max(0, C - (employerPfInCtc ? employerPf : 0) - gratuity)
    const special = gross - basic - hra
    const pt = ptApplies && gross > 0 ? PROFESSIONAL_TAX_ANNUAL : 0
    const tax = computeNewRegime(gross)
    const deductions = employeePf + pt + tax.totalTax
    const annualInHand = Math.max(0, gross - deductions)
    return { C, basic, hra, special, employerPf, employeePf, gratuity, gross, pt, tax, deductions, annualInHand, monthly: annualInHand / 12 }
  }, [ctc, basicPct, hraPct, employerPfInCtc, pfCapped, ptApplies, gratuityInCtc])

  const rows: { label: string; annual: number; kind?: 'earn' | 'ded' | 'total' }[] = [
    { label: 'Basic salary', annual: r.basic, kind: 'earn' },
    { label: 'House rent allowance', annual: r.hra, kind: 'earn' },
    { label: 'Special / other allowances', annual: r.special, kind: 'earn' },
    { label: 'Gross salary', annual: r.gross, kind: 'total' },
    { label: 'Employee PF (12% of basic)', annual: -r.employeePf, kind: 'ded' },
    { label: 'Professional tax', annual: -r.pt, kind: 'ded' },
    { label: 'Income tax (new regime, incl. cess)', annual: -r.tax.totalTax, kind: 'ded' },
    { label: 'In-hand salary', annual: r.annualInHand, kind: 'total' },
  ]

  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
      <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-[var(--shadow-card)]">
        <h2 className="text-base font-bold text-navy-900">Your CTC and structure</h2>
        <div className="mt-4 space-y-4">
          <MoneyInput label="Annual CTC (cost to company)" value={ctc} onChange={setCtc} hint="As on your offer letter, including employer PF if your company counts it." />
          <div className="grid gap-4 sm:grid-cols-2">
            <PctInput label="Basic salary as % of CTC" value={basicPct} onChange={setBasicPct} hint="Typically 40 to 50%." />
            <PctInput label="HRA as % of basic" value={hraPct} onChange={setHraPct} hint="50% in metros, 40% elsewhere is common." />
          </div>
          <div className="space-y-3 rounded-xl border border-border bg-bg-alt p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-muted">Statutory deductions</p>
            <Toggle label="Employer PF contribution is included in CTC" checked={employerPfInCtc} onChange={setEmployerPfInCtc} hint="Most Indian offer letters include it. Untick if PF is over and above CTC." />
            <Toggle label={`Cap PF at ${formatINR(PF_CAP_MONTHLY)}/month (basic above ${formatINR(PF_WAGE_CEILING_MONTHLY)})`} checked={pfCapped} onChange={setPfCapped} hint="Many employers restrict PF to the statutory wage ceiling. Untick if PF is 12% of full basic." />
            <Toggle label={`Professional tax ${formatINR(PROFESSIONAL_TAX_ANNUAL)} per year`} checked={ptApplies} onChange={setPtApplies} hint="Applies in Punjab, Maharashtra, Karnataka and most states; not in Delhi, Haryana, UP or Chandigarh." />
            <Toggle label={`Gratuity (${GRATUITY_PCT}% of basic) is included in CTC`} checked={gratuityInCtc} onChange={setGratuityInCtc} />
          </div>
        </div>
      </div>

      <div className="lg:sticky lg:top-24">
        <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-[var(--shadow-card)]">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-base font-bold text-navy-900">Monthly in-hand salary</h2>
            <span className="rounded-md border border-navy-100 bg-navy-100 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-navy-900">FY {FY} / TY 2026-27</span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-green-100 bg-green-50 p-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-green-700">Per month</p>
              <p className="mt-1 font-mono tabular text-2xl font-bold text-navy-900">{formatINR(Math.round(r.monthly))}</p>
              <p className="text-xs text-muted">{r.C > 0 ? `${((r.annualInHand / r.C) * 100).toFixed(1)}% of CTC` : '—'}</p>
            </div>
            <div className="rounded-xl border border-border bg-bg-alt p-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted">Per year</p>
              <p className="mt-1 font-mono tabular text-2xl font-bold text-navy-900">{formatINR(Math.round(r.annualInHand))}</p>
              <p className="text-xs text-muted">Tax {formatINR(r.tax.totalTax)} / yr</p>
            </div>
          </div>
          {r.special < 0 ? (
            <p className="mt-3 rounded-lg border border-red-100 bg-red-50 p-3 text-xs text-red-600">
              Basic plus HRA exceeds the cash salary. Reduce the basic or HRA percentage.
            </p>
          ) : null}
          <div className="mt-4 overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-xs">
              <thead className="bg-bg-alt text-left text-muted">
                <tr>
                  <th className="px-3 py-2 font-semibold">Component</th>
                  <th className="px-3 py-2 text-right font-semibold">Monthly</th>
                  <th className="px-3 py-2 text-right font-semibold">Annual</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label} className={`border-t border-border ${row.kind === 'total' ? 'bg-bg-alt/70 font-bold text-navy-900' : row.kind === 'ded' ? 'text-red-600' : 'text-text-2'}`}>
                    <td className="px-3 py-1.5">{row.label}</td>
                    <td className="px-3 py-1.5 text-right font-mono tabular">{row.annual < 0 ? `− ${formatINR(Math.round(-row.annual / 12))}` : formatINR(Math.round(row.annual / 12))}</td>
                    <td className="px-3 py-1.5 text-right font-mono tabular">{row.annual < 0 ? `− ${formatINR(Math.round(-row.annual))}` : formatINR(Math.round(row.annual))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-lg border border-border bg-white p-2.5">
              <p className="text-muted">Employer PF {employerPfInCtc ? '(part of CTC)' : '(over CTC)'}</p>
              <p className="mt-0.5 font-mono tabular font-semibold text-navy-900">{formatINR(Math.round(r.employerPf / 12))} / mo</p>
            </div>
            <div className="rounded-lg border border-border bg-white p-2.5">
              <p className="text-muted">Total PF savings (both sides)</p>
              <p className="mt-0.5 font-mono tabular font-semibold text-navy-900">{formatINR(Math.round((r.employerPf + r.employeePf) / 12))} / mo</p>
            </div>
          </div>
          <div className="mt-4 rounded-lg border border-border bg-bg-alt/60 p-3 text-[11px] leading-relaxed text-muted">
            <strong className="text-text-2">Assumptions:</strong> income tax under the new regime with standard deduction {formatINR(NEW_REGIME.standardDeduction)} and 87A rebate up to{' '}
            {formatINR(NEW_REGIME.rebate87A.maxRebate)} (taxable income up to {formatINR(NEW_REGIME.rebate87A.incomeLimit)}). PF at {PF_RATE}% of basic (employer share treated as
            part of CTC when ticked). Professional tax {formatINR(PROFESSIONAL_TAX_ANNUAL)} a year. Gratuity, if included, is {GRATUITY_PCT}% of basic. Bonuses, ESOPs, meal
            coupons, NPS u/s 80CCD(2), LTA and HRA exemption (old regime only) are not modelled; actual TDS is spread across months by your employer.
          </div>
        </div>
      </div>
    </div>
  )
}

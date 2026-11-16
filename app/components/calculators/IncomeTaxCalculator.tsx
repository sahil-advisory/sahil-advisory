'use client'

import { useMemo, useState, type ReactNode } from 'react'
import { ChevronDown, Trophy } from 'lucide-react'
import { computeNewRegime, computeOldRegime, type TaxBreakdown } from '@/app/lib/tax/compute'
import { CESS_RATE, FY, NEW_REGIME, OLD_REGIME } from '@/app/lib/tax/rules/fy2025-26'
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

function Row({ label, value, strong, muted }: { label: ReactNode; value: ReactNode; strong?: boolean; muted?: boolean }) {
  return (
    <div className={`flex items-baseline justify-between gap-3 py-1 text-sm ${strong ? 'border-t border-border pt-2 mt-1' : ''}`}>
      <span className={muted ? 'text-muted' : 'text-text-2'}>{label}</span>
      <span className={`font-mono tabular ${strong ? 'font-bold text-navy-900' : muted ? 'text-muted' : 'font-semibold text-navy-900'}`}>{value}</span>
    </div>
  )
}

function slabLabel(from: number, to: number) {
  const f = formatINR(from)
  return to === Infinity ? `Above ${f}` : `${f} – ${formatINR(to)}`
}

function RegimeCard({ title, b, winner, savings }: { title: string; b: TaxBreakdown; winner: boolean; savings: number }) {
  return (
    <div className={`rounded-xl border p-4 ${winner ? 'border-green-500 bg-green-50/60' : 'border-border bg-white'}`}>
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-bold text-navy-900">{title}</h3>
        {winner ? (
          <span className="inline-flex items-center gap-1 rounded-md border border-green-100 bg-green-50 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-green-700">
            <Trophy className="h-3 w-3" aria-hidden /> Better
          </span>
        ) : null}
      </div>
      <p className="mt-2 font-mono tabular text-2xl font-bold text-navy-900">{formatINR(b.totalTax)}</p>
      <p className="text-xs text-muted">
        Total tax · effective rate <span className="font-mono tabular">{b.effectiveRate.toFixed(2)}%</span>
      </p>
      {winner && savings > 0 ? <p className="mt-1 text-xs font-semibold text-green-700">Saves {formatINR(savings)} vs the other regime</p> : null}
      <div className="mt-3">
        <Row label="Gross income" value={formatINR(b.gross)} />
        <Row label="Standard deduction" value={`− ${formatINR(b.standardDeduction)}`} />
        <Row label="Other deductions" value={`− ${formatINR(b.otherDeductions)}`} />
        <Row label="Taxable income" value={formatINR(b.taxableIncome)} strong />
        <Row label="Tax as per slabs" value={formatINR(Math.round(b.baseTax))} />
        <Row label="Rebate u/s 87A" value={b.rebate ? `− ${formatINR(Math.round(b.rebate))}` : '—'} muted={!b.rebate} />
        <Row label="Marginal relief" value={b.marginalRelief ? `− ${formatINR(Math.round(b.marginalRelief))}` : '—'} muted={!b.marginalRelief} />
        <Row label={`Surcharge${b.surchargeRate ? ` @ ${b.surchargeRate}%` : ''}`} value={b.surcharge ? formatINR(Math.round(b.surcharge)) : '—'} muted={!b.surcharge} />
        <Row label={`Health & education cess @ ${CESS_RATE}%`} value={formatINR(Math.round(b.cess))} />
        <Row label="Total tax payable" value={formatINR(b.totalTax)} strong />
        <Row label="Take-home (after tax)" value={formatINR(b.takeHome)} />
      </div>
      <details className="group mt-3 rounded-lg border border-border bg-bg-alt/60">
        <summary className="flex cursor-pointer list-none items-center justify-between px-3 py-2 text-xs font-semibold text-navy-900">
          Slab-wise breakdown
          <ChevronDown className="h-4 w-4 text-muted transition-transform group-open:rotate-180" aria-hidden />
        </summary>
        <div className="overflow-x-auto px-3 pb-3">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-left text-muted">
                <th className="py-1 font-semibold">Slab</th>
                <th className="py-1 text-right font-semibold">Rate</th>
                <th className="py-1 text-right font-semibold">Tax</th>
              </tr>
            </thead>
            <tbody>
              {b.slabs.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-1 text-muted">No taxable income.</td>
                </tr>
              ) : (
                b.slabs.map((r) => (
                  <tr key={r.from} className="border-t border-border">
                    <td className="py-1 text-text-2">{slabLabel(r.from, r.to)}</td>
                    <td className="py-1 text-right font-mono tabular">{r.rate}%</td>
                    <td className="py-1 text-right font-mono tabular text-navy-900">{formatINR(Math.round(r.tax))}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  )
}

type Age = 'below60' | '60to80' | 'above80'

export default function IncomeTaxCalculator() {
  const [gross, setGross] = useState('1200000')
  const [age, setAge] = useState<Age>('below60')
  const [salaried, setSalaried] = useState(true)
  const [c80, setC80] = useState('150000')
  const [d80, setD80] = useState('25000')
  const [hra, setHra] = useState('0')
  const [loan, setLoan] = useState('0')
  const [nps, setNps] = useState('0')
  const [other, setOther] = useState('0')

  const result = useMemo(() => {
    const g = num(gross)
    const newR = computeNewRegime(g, { isSalaried: salaried })
    const oldR = computeOldRegime(
      g,
      { sec80C: num(c80), sec80D: num(d80), hraExempt: num(hra), homeLoanInterest: num(loan), nps80CCD1B: num(nps), others: num(other) },
      { isSalaried: salaried, age }
    )
    const diff = oldR.totalTax - newR.totalTax
    return { newR, oldR, diff, winner: diff >= 0 ? ('new' as const) : ('old' as const) }
  }, [gross, salaried, c80, d80, hra, loan, nps, other, age])

  const { newR, oldR, diff, winner } = result

  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
      <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-[var(--shadow-card)]">
        <h2 className="text-base font-bold text-navy-900">Your income and deductions</h2>
        <p className="mt-1 text-xs text-muted">All figures for a full year: FY {FY}, and tax year 2026-27 (same slabs).</p>
        <div className="mt-4 space-y-4">
          <MoneyInput label="Gross annual income (salary before deductions)" value={gross} onChange={setGross} hint="Use gross salary from Form 16 Part B, plus any other income." />
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs font-semibold text-text-2">Age band</span>
              <select value={age} onChange={(e) => setAge(e.target.value as Age)} className={`${inputCls} mt-1`}>
                <option value="below60">Below 60</option>
                <option value="60to80">60 to 79 (senior citizen)</option>
                <option value="above80">80 and above (super senior)</option>
              </select>
            </label>
            <label className="flex items-end gap-2 pb-2.5 text-sm text-text-2">
              <input type="checkbox" checked={salaried} onChange={(e) => setSalaried(e.target.checked)} className="h-4 w-4 accent-green-600" />
              Salaried or pensioner (standard deduction applies)
            </label>
          </div>
          <div className="rounded-xl border border-border bg-bg-alt p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-muted">Old regime deductions only</p>
            <p className="mt-1 text-[11px] text-muted">The new regime ignores these except the standard deduction.</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <MoneyInput label={`Section 80C (max ${formatINR(OLD_REGIME.caps.sec80C)})`} value={c80} onChange={setC80} />
              <MoneyInput label="Section 80D health insurance" value={d80} onChange={setD80} hint={`Self ${formatINR(OLD_REGIME.caps.sec80D_self)} (${formatINR(OLD_REGIME.caps.sec80D_self_senior)} senior) + parents`} />
              <MoneyInput label="HRA exemption u/s 10(13A)" value={hra} onChange={setHra} hint="Use the HRA calculator to find this." />
              <MoneyInput label={`Home loan interest u/s 24(b) (max ${formatINR(OLD_REGIME.caps.sec24b_selfOccupied)})`} value={loan} onChange={setLoan} />
              <MoneyInput label={`NPS u/s 80CCD(1B) (max ${formatINR(OLD_REGIME.caps.sec80CCD1B)})`} value={nps} onChange={setNps} />
              <MoneyInput label="Other deductions (80E, 80G, 80TTA, LTA...)" value={other} onChange={setOther} />
            </div>
          </div>
        </div>
      </div>

      <div className="lg:sticky lg:top-24">
        <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-[var(--shadow-card)]">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-base font-bold text-navy-900">Old vs new regime</h2>
            <span className="rounded-md border border-navy-100 bg-navy-100 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-navy-900">FY {FY} / TY 2026-27</span>
          </div>
          <p className="mt-2 text-sm text-text-2">
            {diff === 0 ? (
              'Both regimes give the same tax.'
            ) : (
              <>
                The <strong className="text-navy-900">{winner === 'new' ? 'new' : 'old'} regime</strong> is better by{' '}
                <span className="font-mono tabular font-bold text-green-700">{formatINR(Math.abs(diff))}</span> this year.
              </>
            )}
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <RegimeCard title="New regime (default)" b={newR} winner={winner === 'new'} savings={Math.abs(diff)} />
            <RegimeCard title="Old regime" b={oldR} winner={winner === 'old'} savings={Math.abs(diff)} />
          </div>
          <div className="mt-4 rounded-lg border border-border bg-bg-alt/60 p-3 text-[11px] leading-relaxed text-muted">
            <strong className="text-text-2">Assumptions:</strong> new regime slabs {NEW_REGIME.slabs.map((s) => s.rate + '%').join('/')} with standard deduction{' '}
            {formatINR(NEW_REGIME.standardDeduction)} and 87A rebate up to {formatINR(NEW_REGIME.rebate87A.maxRebate)} for taxable income up to{' '}
            {formatINR(NEW_REGIME.rebate87A.incomeLimit)} (marginal relief applied). Old regime standard deduction {formatINR(OLD_REGIME.standardDeduction)}, 87A rebate{' '}
            {formatINR(OLD_REGIME.rebate87A.maxRebate)} up to {formatINR(OLD_REGIME.rebate87A.incomeLimit)}, senior citizen slabs by age. Surcharge on taxable income above{' '}
            {formatINR(5_000_000)}, cess {CESS_RATE}%. Special-rate income (capital gains, lottery) is not modelled here.
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useMemo, useState } from 'react'
import { CalendarClock, CheckCircle2 } from 'lucide-react'
import { computeNewRegime, computeOldRegime } from '@/app/lib/tax/compute'
import { ADVANCE_TAX, LATE_FEES, PRESUMPTIVE } from '@/app/lib/tax/rules/fy2025-26'
import { formatINR } from '@/app/lib/format'

const inputCls =
  'w-full rounded-lg border border-border-strong bg-white px-3 py-2.5 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100'

function num(s: string): number {
  const n = parseFloat(s)
  return Number.isFinite(n) && n > 0 ? n : 0
}

function MoneyInput({ label, value, onChange, hint, compact }: { label: string; value: string; onChange: (v: string) => void; hint?: string; compact?: boolean }) {
  return (
    <label className="block">
      <span className={`font-semibold text-text-2 ${compact ? 'text-[11px]' : 'text-xs'}`}>{label}</span>
      <div className="relative mt-1">
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-muted" aria-hidden>₹</span>
        <input
          type="text"
          inputMode="numeric"
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/[^\d.]/g, ''))}
          className={`${inputCls} pl-7 font-mono tabular ${compact ? 'py-1.5' : ''}`}
          placeholder="0"
        />
      </div>
      {hint ? <span className="mt-1 block text-[11px] text-muted">{hint}</span> : null}
    </label>
  )
}

function Segmented<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: { value: T; label: string }[]; onChange: (v: T) => void }) {
  return (
    <fieldset>
      <legend className="text-xs font-semibold text-text-2">{label}</legend>
      <div className="mt-1 inline-flex flex-wrap rounded-lg border border-border-strong bg-bg-alt p-0.5">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            aria-pressed={value === o.value}
            onClick={() => onChange(o.value)}
            className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${value === o.value ? 'bg-white text-navy-900 shadow-sm' : 'text-text-2 hover:text-navy-900'}`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </fieldset>
  )
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={`flex items-baseline justify-between gap-3 py-1 text-sm ${strong ? 'mt-1 border-t border-border pt-2' : ''}`}>
      <span className="text-text-2">{label}</span>
      <span className={`font-mono tabular ${strong ? 'font-bold text-navy-900' : 'font-semibold text-navy-900'}`}>{value}</span>
    </div>
  )
}

type Presumptive = 'none' | '44AD_digital' | '44AD_cash' | '44ADA'
// s.234C safe harbour: no interest for the June/September instalments if at
// least 12% / 36% of the tax has been paid by then.
const SAFE_HARBOUR: Record<number, number> = { 0: 12, 1: 36 }

export default function AdvanceTaxCalculator() {
  const [regime, setRegime] = useState<'new' | 'old'>('new')
  const [salary, setSalary] = useState('0')
  const [business, setBusiness] = useState('1500000')
  const [gains, setGains] = useState('0')
  const [other, setOther] = useState('50000')
  const [presumptive, setPresumptive] = useState<Presumptive>('none')
  const [c80, setC80] = useState('150000')
  const [d80, setD80] = useState('25000')
  const [otherDed, setOtherDed] = useState('0')
  const [tds, setTds] = useState('0')
  const [specialTax, setSpecialTax] = useState('0')
  const [paid, setPaid] = useState(['', '', '', ''])
  const [showPaid, setShowPaid] = useState(false)

  const r = useMemo(() => {
    const sal = num(salary)
    const biz = num(business)
    const deemedBiz =
      presumptive === '44AD_digital'
        ? (biz * PRESUMPTIVE.sec44AD.rateDigital) / 100
        : presumptive === '44AD_cash'
          ? (biz * PRESUMPTIVE.sec44AD.rateCash) / 100
          : presumptive === '44ADA'
            ? (biz * PRESUMPTIVE.sec44ADA.rate) / 100
            : biz
    const total = sal + deemedBiz + num(gains) + num(other)
    const isSalaried = sal > 0
    const b =
      regime === 'new'
        ? computeNewRegime(total, { isSalaried })
        : computeOldRegime(total, { sec80C: num(c80), sec80D: num(d80), others: num(otherDed) }, { isSalaried })
    const totalTax = b.totalTax + Math.round(num(specialTax))
    const net = Math.max(0, totalTax - num(tds))
    const applies = net > ADVANCE_TAX.threshold
    const schedule = presumptive !== 'none' ? [{ ...ADVANCE_TAX.presumptive, label: '15 March' }] : ADVANCE_TAX.instalments
    // Cumulative due is a pure function of the instalment index, so each row
    // derives its own figures instead of carrying a running accumulator.
    const cumDueAt = (idx: number) => Math.round((net * schedule[idx].cumulativePct) / 100)
    const rows = schedule.map((ins, i) => {
      const cumDue = cumDueAt(i)
      const instalment = cumDue - (i > 0 ? cumDueAt(i - 1) : 0)
      const cumPaid = paid.slice(0, i + 1).reduce((s, p) => s + num(p), 0)
      const shortfall = Math.max(0, cumDue - cumPaid)
      const safe = SAFE_HARBOUR[i] !== undefined && presumptive === 'none' && cumPaid >= (net * SAFE_HARBOUR[i]) / 100
      const months = ins.cumulativePct === 100 ? 1 : 3
      const interest = applies && !safe ? Math.round((shortfall * LATE_FEES.sec234C_monthlyPct * months) / 100) : 0
      return { ...ins, cumDue, instalment, cumPaid, shortfall, interest, months, safe }
    })
    const totalInterest = rows.reduce((sum, r) => sum + r.interest, 0)
    return { total, deemedBiz, b, totalTax, net, applies, rows, totalInterest, tdsAmt: num(tds) }
  }, [regime, salary, business, gains, other, presumptive, c80, d80, otherDed, tds, specialTax, paid])

  const setPaidAt = (i: number, v: string) => setPaid((p) => p.map((x, j) => (j === i ? v.replace(/[^\d.]/g, '') : x)))
  const bizLabel = presumptive === 'none' ? 'Business / profession net profit' : presumptive === '44ADA' ? 'Gross professional receipts' : 'Gross turnover'

  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
      <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-[var(--shadow-card)]">
        <h2 className="text-base font-bold text-navy-900">Expected income for tax year 2026-27</h2>
        <div className="mt-4 space-y-4">
          <Segmented
            label="Tax regime"
            value={regime}
            onChange={setRegime}
            options={[
              { value: 'new', label: 'New regime' },
              { value: 'old', label: 'Old regime' },
            ]}
          />
          <label className="block">
            <span className="text-xs font-semibold text-text-2">Presumptive taxation</span>
            <select value={presumptive} onChange={(e) => setPresumptive(e.target.value as Presumptive)} className={`${inputCls} mt-1`}>
              <option value="none">Not opted (actual profit)</option>
              <option value="44AD_digital">Section 44AD — business, {PRESUMPTIVE.sec44AD.rateDigital}% of digital receipts</option>
              <option value="44AD_cash">Section 44AD — business, {PRESUMPTIVE.sec44AD.rateCash}% of cash receipts</option>
              <option value="44ADA">Section 44ADA — profession, {PRESUMPTIVE.sec44ADA.rate}% of receipts</option>
            </select>
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <MoneyInput label="Salary (gross, annual)" value={salary} onChange={setSalary} />
            <MoneyInput label={bizLabel} value={business} onChange={setBusiness} hint={presumptive !== 'none' ? `Deemed income: ${formatINR(Math.round(r.deemedBiz))}` : 'Includes F&O and intraday profit.'} />
            <MoneyInput label="Capital gains (taxed at slab)" value={gains} onChange={setGains} hint="Debt fund, property STCG, etc." />
            <MoneyInput label="Other income (interest, rent, dividends)" value={other} onChange={setOther} />
          </div>
          {regime === 'old' ? (
            <div className="rounded-xl border border-border bg-bg-alt p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-muted">Old regime deductions</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                <MoneyInput label="Section 80C" value={c80} onChange={setC80} />
                <MoneyInput label="Section 80D" value={d80} onChange={setD80} />
                <MoneyInput label="Other deductions" value={otherDed} onChange={setOtherDed} />
              </div>
            </div>
          ) : null}
          <div className="grid gap-4 sm:grid-cols-2">
            <MoneyInput label="TDS / TCS already deducted or expected" value={tds} onChange={setTds} hint="From Form 26AS / AIS; salary TDS counts." />
            <MoneyInput label="Tax on special-rate gains (optional)" value={specialTax} onChange={setSpecialTax} hint="Equity STCG/LTCG tax incl. cess from the capital gains calculator." />
          </div>
          <label className="flex items-center gap-2 text-sm text-text-2">
            <input type="checkbox" checked={showPaid} onChange={(e) => setShowPaid(e.target.checked)} className="h-4 w-4 accent-green-600" />
            I have already paid some instalments (check shortfall and 234C interest)
          </label>
          {showPaid ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {r.rows.map((row, i) => (
                <MoneyInput key={row.date} label={`Paid by ${row.label}`} value={paid[i]} onChange={(v) => setPaidAt(i, v)} compact />
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div className="lg:sticky lg:top-24">
        <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-[var(--shadow-card)]">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-base font-bold text-navy-900">Advance tax schedule</h2>
            <span className="rounded-md border border-navy-100 bg-navy-100 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-navy-900">Tax year 2026-27</span>
          </div>
          <div className={`mt-4 flex items-start gap-2 rounded-xl border p-3 text-sm ${r.applies ? 'border-amber-200 bg-gold-50 text-gold-600' : 'border-green-100 bg-green-50 text-green-700'}`}>
            {r.applies ? <CalendarClock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden /> : <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />}
            <p>
              {r.applies ? (
                <>
                  Advance tax applies: net liability <span className="font-mono tabular font-bold">{formatINR(r.net)}</span> exceeds {formatINR(ADVANCE_TAX.threshold)}.
                </>
              ) : (
                <>Net tax after TDS is {formatINR(r.net)}, within {formatINR(ADVANCE_TAX.threshold)}, so no advance tax is due. Pay any balance as self-assessment tax with the return.</>
              )}
            </p>
          </div>
          <div className="mt-4">
            <Row label="Total income (before deductions)" value={formatINR(Math.round(r.total))} />
            <Row label="Taxable income" value={formatINR(Math.round(r.b.taxableIncome))} />
            <Row label={`Tax under ${regime} regime (incl. cess)`} value={formatINR(r.b.totalTax)} />
            {num(specialTax) > 0 ? <Row label="Tax on special-rate gains" value={formatINR(Math.round(num(specialTax)))} /> : null}
            <Row label="Less: TDS / TCS" value={`− ${formatINR(r.tdsAmt)}`} />
            <Row label="Net advance tax payable" value={formatINR(r.net)} strong />
          </div>

          <div className="mt-4 overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-xs">
              <thead className="bg-bg-alt text-left text-muted">
                <tr>
                  <th className="px-3 py-2 font-semibold">Due date</th>
                  <th className="px-3 py-2 text-right font-semibold">Cumulative</th>
                  <th className="px-3 py-2 text-right font-semibold">Pay by then</th>
                  <th className="px-3 py-2 text-right font-semibold">Instalment</th>
                  {showPaid ? (
                    <>
                      <th className="px-3 py-2 text-right font-semibold">Shortfall</th>
                      <th className="px-3 py-2 text-right font-semibold">234C interest</th>
                    </>
                  ) : null}
                </tr>
              </thead>
              <tbody>
                {r.rows.map((row) => (
                  <tr key={row.date} className="border-t border-border">
                    <td className="px-3 py-2 font-semibold text-navy-900">{row.label}</td>
                    <td className="px-3 py-2 text-right font-mono tabular">{row.cumulativePct}%</td>
                    <td className="px-3 py-2 text-right font-mono tabular">{formatINR(r.applies ? row.cumDue : 0)}</td>
                    <td className="px-3 py-2 text-right font-mono tabular font-semibold text-navy-900">{formatINR(r.applies ? row.instalment : 0)}</td>
                    {showPaid ? (
                      <>
                        <td className={`px-3 py-2 text-right font-mono tabular ${row.shortfall > 0 && r.applies ? 'text-red-600' : ''}`}>{formatINR(r.applies ? row.shortfall : 0)}</td>
                        <td className="px-3 py-2 text-right font-mono tabular">
                          {row.safe && row.shortfall > 0 ? <span className="text-green-700">Nil (safe)</span> : formatINR(row.interest)}
                        </td>
                      </>
                    ) : null}
                  </tr>
                ))}
              </tbody>
              {showPaid && r.applies ? (
                <tfoot>
                  <tr className="border-t border-border bg-bg-alt">
                    <td colSpan={5} className="px-3 py-2 font-semibold text-navy-900">Approximate interest u/s 234C</td>
                    <td className="px-3 py-2 text-right font-mono tabular font-bold text-navy-900">{formatINR(r.totalInterest)}</td>
                  </tr>
                </tfoot>
              ) : null}
            </table>
          </div>
          <div className="mt-4 rounded-lg border border-border bg-bg-alt/60 p-3 text-[11px] leading-relaxed text-muted">
            <strong className="text-text-2">Assumptions:</strong> advance tax is due when tax after TDS exceeds {formatINR(ADVANCE_TAX.threshold)}; instalments of{' '}
            {ADVANCE_TAX.instalments.map((i) => i.cumulativePct + '%').join(', ')} cumulative by 15 June, 15 September, 15 December and 15 March. Presumptive taxpayers (44AD/44ADA, section 58 of the 2025 Act) pay 100%
            by 15 March. Interest u/s 234C (section 425 from tax year 2026-27) at {LATE_FEES.sec234C_monthlyPct}% per month on the shortfall for 3 months (1 month for March), with no interest on the first two
            instalments if 12%/36% has been paid. Resident senior citizens without business income are exempt from advance tax. Interest is indicative; capital gains that
            arise later in the year are payable from the next instalment.
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useMemo, useState } from 'react'
import { Check } from 'lucide-react'
import { computeHraExemption } from '@/app/lib/tax/compute'
import { FY, HRA } from '@/app/lib/tax/rules/fy2025-26'
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

function Segmented<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: { value: T; label: string }[]; onChange: (v: T) => void }) {
  return (
    <fieldset>
      <legend className="text-xs font-semibold text-text-2">{label}</legend>
      <div className="mt-1 inline-flex rounded-lg border border-border-strong bg-bg-alt p-0.5">
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

export default function HraCalculator() {
  const [period, setPeriod] = useState<'monthly' | 'annual'>('monthly')
  const [basic, setBasic] = useState('40000')
  const [da, setDa] = useState('0')
  const [hra, setHra] = useState('20000')
  const [rent, setRent] = useState('18000')
  const [metro, setMetro] = useState<'metro' | 'non'>('non')

  const r = useMemo(() => {
    const m = period === 'monthly' ? 12 : 1
    const input = { basic: num(basic) * m, da: num(da) * m, hraReceived: num(hra) * m, rentPaid: num(rent) * m, metro: metro === 'metro' }
    const out = computeHraExemption(input)
    const min = Math.min(...out.components.map((c) => c.value))
    return { ...out, input, min }
  }, [period, basic, da, hra, rent, metro])

  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
      <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-[var(--shadow-card)]">
        <h2 className="text-base font-bold text-navy-900">Salary and rent details</h2>
        <div className="mt-4 space-y-4">
          <Segmented
            label="Enter figures as"
            value={period}
            onChange={setPeriod}
            options={[
              { value: 'monthly', label: 'Monthly' },
              { value: 'annual', label: 'Annual' },
            ]}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <MoneyInput label={`Basic salary (${period})`} value={basic} onChange={setBasic} />
            <MoneyInput label={`Dearness allowance (${period})`} value={da} onChange={setDa} hint="Only DA that forms part of retirement benefits. Usually nil in private jobs." />
            <MoneyInput label={`HRA received (${period})`} value={hra} onChange={setHra} />
            <MoneyInput label={`Rent paid (${period})`} value={rent} onChange={setRent} />
          </div>
          <Segmented
            label="City of residence"
            value={metro}
            onChange={setMetro}
            options={[
              { value: 'metro', label: `Metro (${HRA.metros.join(', ')})` },
              { value: 'non', label: 'Non-metro' },
            ]}
          />
          <p className="text-[11px] text-muted">
            Only {HRA.metros.join(', ')} count as metros for HRA. Bengaluru, Hyderabad, Pune, Chandigarh and every other city are non-metro ({HRA.nonMetroPct}%).
          </p>
        </div>
      </div>

      <div className="lg:sticky lg:top-24">
        <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-[var(--shadow-card)]">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-base font-bold text-navy-900">HRA exemption u/s 10(13A)</h2>
            <span className="rounded-md border border-navy-100 bg-navy-100 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-navy-900">FY {FY} / TY 2026-27</span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-green-100 bg-green-50 p-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-green-700">Exempt HRA (annual)</p>
              <p className="mt-1 font-mono tabular text-2xl font-bold text-navy-900">{formatINR(Math.round(r.exempt))}</p>
              <p className="text-xs text-muted">{formatINR(Math.round(r.exempt / 12))} per month</p>
            </div>
            <div className="rounded-xl border border-border bg-bg-alt p-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted">Taxable HRA (annual)</p>
              <p className="mt-1 font-mono tabular text-2xl font-bold text-navy-900">{formatINR(Math.round(r.taxable))}</p>
              <p className="text-xs text-muted">{formatINR(Math.round(r.taxable / 12))} per month</p>
            </div>
          </div>

          <h3 className="mt-5 text-xs font-bold uppercase tracking-wider text-muted">Least of the three (annual)</h3>
          <ol className="mt-2 divide-y divide-border rounded-xl border border-border">
            {r.components.map((c, i) => {
              const isMin = c.value === r.min
              return (
                <li key={c.label} className={`flex items-center justify-between gap-3 px-4 py-2.5 text-sm ${isMin ? 'bg-green-50/70' : ''}`}>
                  <span className="flex items-center gap-2 text-text-2">
                    <span className="font-mono text-xs text-muted">{i + 1}.</span>
                    {c.label}
                    {isMin ? <Check className="h-4 w-4 text-green-600" aria-label="Lowest, so this is the exemption" /> : null}
                  </span>
                  <span className={`font-mono tabular font-semibold ${isMin ? 'text-green-700' : 'text-navy-900'}`}>{formatINR(Math.round(c.value))}</span>
                </li>
              )
            })}
          </ol>
          {r.input.rentPaid <= r.input.basic * 0.1 + r.input.da * 0.1 && r.input.rentPaid > 0 ? (
            <p className="mt-3 rounded-lg border border-amber-200 bg-gold-50 p-3 text-xs text-gold-600">
              Rent paid does not exceed {HRA.rentExcessPct}% of salary, so no HRA exemption is available.
            </p>
          ) : null}
          <div className="mt-4 rounded-lg border border-border bg-bg-alt/60 p-3 text-[11px] leading-relaxed text-muted">
            <strong className="text-text-2">Assumptions:</strong> salary means basic plus DA (if it counts for retirement benefits) plus any fixed commission on turnover. Metro
            limit {HRA.metroPct}% and non-metro {HRA.nonMetroPct}% of salary; rent in excess of {HRA.rentExcessPct}% of salary. HRA exemption is available only under the old
            regime and only for months in which rent was actually paid. Landlord PAN is required when annual rent exceeds {formatINR(100_000)}.
          </div>
        </div>
      </div>
    </div>
  )
}

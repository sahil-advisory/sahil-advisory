'use client'

import { useMemo, useState } from 'react'
import { CAPITAL_GAINS, CESS_RATE, FY } from '@/app/lib/tax/rules/fy2025-26'
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

function Row({ label, value, strong, muted }: { label: string; value: string; strong?: boolean; muted?: boolean }) {
  return (
    <div className={`flex items-baseline justify-between gap-3 py-1 text-sm ${strong ? 'mt-1 border-t border-border pt-2' : ''}`}>
      <span className={muted ? 'text-muted' : 'text-text-2'}>{label}</span>
      <span className={`font-mono tabular ${strong ? 'font-bold text-navy-900' : muted ? 'text-muted' : 'font-semibold text-navy-900'}`}>{value}</span>
    </div>
  )
}

// Cost Inflation Index, base year 2001-02 = 100 (CBDT notifications).
const CII: Record<string, number> = {
  '2001-02': 100, '2002-03': 105, '2003-04': 109, '2004-05': 113, '2005-06': 117, '2006-07': 122, '2007-08': 129,
  '2008-09': 137, '2009-10': 148, '2010-11': 167, '2011-12': 184, '2012-13': 200, '2013-14': 220, '2014-15': 240,
  '2015-16': 254, '2016-17': 264, '2017-18': 272, '2018-19': 280, '2019-20': 289, '2020-21': 301, '2021-22': 317,
  '2022-23': 331, '2023-24': 348, '2024-25': 363, '2025-26': 376, '2026-27': 384,
}
const CII_YEARS = Object.keys(CII)

const NEW_RATES_FROM = new Date('2024-07-23')
const DEBT_MF_CUTOFF = new Date('2023-04-01')

function fyOf(d: Date): string {
  const y = d.getMonth() >= 3 ? d.getFullYear() : d.getFullYear() - 1
  const fy = `${y}-${String((y + 1) % 100).padStart(2, '0')}`
  if (CII[fy]) return fy
  return y < 2001 ? '2001-02' : CII_YEARS[CII_YEARS.length - 1]
}

function addMonths(d: Date, m: number): Date {
  const x = new Date(d)
  x.setMonth(x.getMonth() + m)
  return x
}

function holdingText(from: Date, to: Date): string {
  let months = (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth())
  if (to.getDate() < from.getDate()) months -= 1
  months = Math.max(0, months)
  const y = Math.floor(months / 12)
  const m = months % 12
  return [y ? `${y} yr` : '', m ? `${m} mo` : ''].filter(Boolean).join(' ') || 'under 1 month'
}

type Asset = 'equity' | 'debtMf' | 'property' | 'other'
const SLAB_RATES = ['5', '10', '15', '20', '25', '30']

type Initial = { buyDate: string; sellDate: string; buyPrice: string; sellPrice: string }
const DEFAULTS: Initial = { buyDate: '2023-01-15', sellDate: '2025-08-20', buyPrice: '500000', sellPrice: '800000' }

export default function CapitalGainsCalculator({ initial = DEFAULTS }: { initial?: Initial }) {
  const [asset, setAsset] = useState<Asset>('equity')
  const [buyDate, setBuyDate] = useState(initial.buyDate)
  const [sellDate, setSellDate] = useState(initial.sellDate)
  const [buyPrice, setBuyPrice] = useState(initial.buyPrice)
  const [sellPrice, setSellPrice] = useState(initial.sellPrice)
  const [expenses, setExpenses] = useState('0')
  const [ltcgUsed, setLtcgUsed] = useState('0')
  const [slab, setSlab] = useState('30')
  const [ciiBuyOverride, setCiiBuyOverride] = useState('')
  const [ciiSellOverride, setCiiSellOverride] = useState('')

  const r = useMemo(() => {
    const from = new Date(buyDate)
    const to = new Date(sellDate)
    const valid = !Number.isNaN(from.getTime()) && !Number.isNaN(to.getTime()) && to > from
    const cost = num(buyPrice)
    const sale = num(sellPrice)
    const exp = num(expenses)
    const gain = sale - exp - cost
    const slabRate = num(slab)

    const holdingMonths =
      asset === 'equity' ? CAPITAL_GAINS.equity.holdingMonths : asset === 'property' ? CAPITAL_GAINS.property.holdingMonths : CAPITAL_GAINS.otherAssets.holdingMonths
    const longTerm = valid && to > addMonths(from, holdingMonths)
    const debtAtSlab = asset === 'debtMf' && from >= DEBT_MF_CUTOFF
    const legacyProperty = asset === 'property' && from < NEW_RATES_FROM

    const buyFy = ciiBuyOverride || (valid ? fyOf(from) : '2001-02')
    const sellFy = ciiSellOverride || (valid ? fyOf(to) : CII_YEARS[CII_YEARS.length - 1])
    const indexedCost = cost * (CII[sellFy] / CII[buyFy])
    const indexedGain = sale - exp - indexedCost

    let classification = ''
    let rateLabel = ''
    let taxable = 0
    let baseTax = 0
    let exemption = 0
    let alt: { label: string; tax: number; gain: number } | null = null
    let chosenNote = ''

    if (gain <= 0) {
      classification = longTerm ? 'Long-term capital loss' : 'Short-term capital loss'
      rateLabel = '—'
    } else if (debtAtSlab) {
      classification = 'Deemed short-term (s.50AA), taxed at slab rate'
      rateLabel = `${slabRate}% (your slab)`
      taxable = gain
      baseTax = (gain * slabRate) / 100
    } else if (asset === 'equity') {
      if (longTerm) {
        classification = 'Long-term capital gain (s.112A)'
        exemption = Math.min(gain, Math.max(0, CAPITAL_GAINS.equity.ltcgExemption - num(ltcgUsed)))
        taxable = gain - exemption
        rateLabel = `${CAPITAL_GAINS.equity.ltcgRate}%`
        baseTax = (taxable * CAPITAL_GAINS.equity.ltcgRate) / 100
      } else {
        classification = 'Short-term capital gain (s.111A)'
        taxable = gain
        rateLabel = `${CAPITAL_GAINS.equity.stcgRate}%`
        baseTax = (gain * CAPITAL_GAINS.equity.stcgRate) / 100
      }
    } else if (longTerm) {
      const ltcgRate = asset === 'property' ? CAPITAL_GAINS.property.ltcgRate : CAPITAL_GAINS.otherAssets.ltcgRate
      classification = 'Long-term capital gain (s.112)'
      taxable = gain
      rateLabel = `${ltcgRate}% without indexation`
      baseTax = (gain * ltcgRate) / 100
      if (legacyProperty) {
        const indexedTax = Math.max(0, indexedGain) * (CAPITAL_GAINS.property.legacyIndexedRate / 100)
        alt = { label: `${CAPITAL_GAINS.property.legacyIndexedRate}% with indexation`, tax: indexedTax, gain: indexedGain }
        if (indexedTax < baseTax) {
          chosenNote = `The indexed option is lower, so ${CAPITAL_GAINS.property.legacyIndexedRate}% with indexation is applied.`
          baseTax = indexedTax
          taxable = Math.max(0, indexedGain)
          rateLabel = `${CAPITAL_GAINS.property.legacyIndexedRate}% with indexation`
        } else {
          chosenNote = `${ltcgRate}% without indexation is lower (or equal), so that is applied.`
        }
      }
    } else {
      classification = 'Short-term capital gain, taxed at slab rate'
      rateLabel = `${slabRate}% (your slab)`
      taxable = gain
      baseTax = (gain * slabRate) / 100
    }

    const cess = (baseTax * CESS_RATE) / 100
    const total = Math.round(baseTax + cess)
    return { valid, from, to, cost, sale, exp, gain, longTerm, holdingMonths, debtAtSlab, legacyProperty, buyFy, sellFy, indexedCost, indexedGain, classification, rateLabel, taxable, exemption, baseTax, cess, total, alt, chosenNote, needsSlab: asset !== 'equity' }
  }, [asset, buyDate, sellDate, buyPrice, sellPrice, expenses, ltcgUsed, slab, ciiBuyOverride, ciiSellOverride])

  const showSlab = r.needsSlab
  const showCii = asset === 'property' && r.legacyProperty && r.longTerm

  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
      <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-[var(--shadow-card)]">
        <h2 className="text-base font-bold text-navy-900">Asset and transaction</h2>
        <div className="mt-4 space-y-4">
          <label className="block">
            <span className="text-xs font-semibold text-text-2">Type of asset</span>
            <select value={asset} onChange={(e) => setAsset(e.target.value as Asset)} className={`${inputCls} mt-1`}>
              <option value="equity">Listed shares / equity mutual funds (STT paid)</option>
              <option value="debtMf">Debt mutual funds</option>
              <option value="property">House, land or other immovable property</option>
              <option value="other">Other assets (gold, unlisted shares, bonds, REIT units)</option>
            </select>
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs font-semibold text-text-2">Purchase date</span>
              <input
                type="date"
                value={buyDate}
                onChange={(e) => {
                  setBuyDate(e.target.value)
                  setCiiBuyOverride('')
                }}
                className={`${inputCls} mt-1 font-mono`}
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-text-2">Sale date</span>
              <input
                type="date"
                value={sellDate}
                onChange={(e) => {
                  setSellDate(e.target.value)
                  setCiiSellOverride('')
                }}
                className={`${inputCls} mt-1 font-mono`}
              />
            </label>
            <MoneyInput label="Purchase price (cost of acquisition)" value={buyPrice} onChange={setBuyPrice} hint={asset === 'equity' ? 'For shares bought before 1 Feb 2018 use the higher of cost and FMV on 31 Jan 2018.' : undefined} />
            <MoneyInput label="Sale price (full value of consideration)" value={sellPrice} onChange={setSellPrice} />
            <MoneyInput label="Transfer expenses (brokerage, stamp duty, legal)" value={expenses} onChange={setExpenses} />
            {asset === 'equity' && r.longTerm ? <MoneyInput label="Equity LTCG already booked this year" value={ltcgUsed} onChange={setLtcgUsed} hint="Uses up part of the ₹1.25 lakh yearly exemption." /> : null}
            {showSlab ? (
              <label className="block">
                <span className="text-xs font-semibold text-text-2">Your income-tax slab rate (for short-term / slab-rate gains)</span>
                <select value={slab} onChange={(e) => setSlab(e.target.value)} className={`${inputCls} mt-1 font-mono`}>
                  {SLAB_RATES.map((s) => (
                    <option key={s} value={s}>{s}%</option>
                  ))}
                </select>
              </label>
            ) : null}
          </div>
          {showCii ? (
            <div className="rounded-xl border border-border bg-bg-alt p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-muted">Cost Inflation Index (for the 20% indexed option)</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="text-xs font-semibold text-text-2">Purchase year (CII {CII[r.buyFy]})</span>
                  <select value={r.buyFy} onChange={(e) => setCiiBuyOverride(e.target.value)} className={`${inputCls} mt-1 font-mono`}>
                    {CII_YEARS.map((y) => (
                      <option key={y} value={y}>{y} — {CII[y]}</option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="text-xs font-semibold text-text-2">Sale year (CII {CII[r.sellFy]})</span>
                  <select value={r.sellFy} onChange={(e) => setCiiSellOverride(e.target.value)} className={`${inputCls} mt-1 font-mono`}>
                    {CII_YEARS.map((y) => (
                      <option key={y} value={y}>{y} — {CII[y]}</option>
                    ))}
                  </select>
                </label>
              </div>
              <p className="mt-2 text-[11px] text-muted">Prefilled from the dates. For property bought before 1 April 2001, use the fair market value on that date as cost.</p>
            </div>
          ) : null}
        </div>
      </div>

      <div className="lg:sticky lg:top-24">
        <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-[var(--shadow-card)]">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-base font-bold text-navy-900">Capital gains tax</h2>
            <span className="rounded-md border border-navy-100 bg-navy-100 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-navy-900">FY {FY} / TY 2026-27</span>
          </div>
          {!r.valid ? <p className="mt-3 rounded-lg border border-red-100 bg-red-50 p-3 text-xs text-red-600">Enter a sale date after the purchase date.</p> : null}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-border bg-bg-alt p-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted">{r.gain < 0 ? 'Capital loss' : 'Capital gain'}</p>
              <p className={`mt-1 font-mono tabular text-2xl font-bold ${r.gain < 0 ? 'text-red-600' : 'text-navy-900'}`}>{formatINR(Math.round(Math.abs(r.gain)))}</p>
              <p className="text-xs text-muted">Held {r.valid ? holdingText(r.from, r.to) : '—'}</p>
            </div>
            <div className="rounded-xl border border-green-100 bg-green-50 p-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-green-700">Tax payable (incl. cess)</p>
              <p className="mt-1 font-mono tabular text-2xl font-bold text-navy-900">{formatINR(r.total)}</p>
              <p className="text-xs text-muted">Rate {r.rateLabel}</p>
            </div>
          </div>
          <p className="mt-3 rounded-lg border border-border bg-white px-3 py-2 text-sm font-semibold text-navy-900">
            {r.classification}
            <span className="block text-xs font-normal text-muted">
              {r.debtAtSlab
                ? 'Debt funds bought on or after 1 April 2023 have no long-term treatment.'
                : `Long-term if held more than ${r.holdingMonths} months.`}
            </span>
          </p>
          <div className="mt-4">
            <Row label="Sale consideration" value={formatINR(r.sale)} />
            <Row label="Less: transfer expenses" value={`− ${formatINR(r.exp)}`} />
            <Row label="Less: cost of acquisition" value={`− ${formatINR(r.cost)}`} />
            <Row label={r.gain < 0 ? 'Capital loss' : 'Capital gain'} value={formatINR(Math.round(r.gain))} strong />
            {r.exemption > 0 ? <Row label={`Less: exemption u/s 112A (${formatINR(CAPITAL_GAINS.equity.ltcgExemption)})`} value={`− ${formatINR(Math.round(r.exemption))}`} /> : null}
            {r.alt ? (
              <>
                <Row label={`Indexed cost (${r.cost.toLocaleString('en-IN')} × ${CII[r.sellFy]} / ${CII[r.buyFy]})`} value={formatINR(Math.round(r.indexedCost))} muted />
                <Row label="Indexed gain" value={formatINR(Math.round(r.indexedGain))} muted />
              </>
            ) : null}
            <Row label="Taxable gain" value={formatINR(Math.round(r.taxable))} />
            <Row label={`Tax @ ${r.rateLabel}`} value={formatINR(Math.round(r.baseTax))} />
            <Row label={`Health & education cess @ ${CESS_RATE}%`} value={formatINR(Math.round(r.cess))} />
            <Row label="Total tax" value={formatINR(r.total)} strong />
          </div>
          {r.alt ? (
            <div className="mt-4 rounded-xl border border-border bg-bg-alt p-3">
              <p className="text-xs font-bold text-navy-900">Property bought before 23 July 2024: both options compared</p>
              <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-lg border border-border bg-white p-2.5">
                  <p className="text-muted">{CAPITAL_GAINS.property.ltcgRate}% no indexation</p>
                  <p className="mt-0.5 font-mono tabular font-bold text-navy-900">{formatINR(Math.round(Math.max(0, r.gain) * (CAPITAL_GAINS.property.ltcgRate / 100)))}</p>
                </div>
                <div className="rounded-lg border border-border bg-white p-2.5">
                  <p className="text-muted">{r.alt.label}</p>
                  <p className="mt-0.5 font-mono tabular font-bold text-navy-900">{formatINR(Math.round(r.alt.tax))}</p>
                </div>
              </div>
              <p className="mt-2 text-[11px] text-muted">{r.chosenNote} Figures before cess. The indexed option cannot create a loss to set off.</p>
            </div>
          ) : null}
          {r.gain < 0 ? (
            <p className="mt-3 text-xs text-text-2">
              A loss can be set off against capital gains this year (long-term loss only against long-term gains) and carried forward 8 years if the return is filed by the due date.
            </p>
          ) : null}
          <div className="mt-4 rounded-lg border border-border bg-bg-alt/60 p-3 text-[11px] leading-relaxed text-muted">
            <strong className="text-text-2">Assumptions:</strong> rates effective for transfers on or after 23 July 2024 — equity STCG {CAPITAL_GAINS.equity.stcgRate}%, equity LTCG{' '}
            {CAPITAL_GAINS.equity.ltcgRate}% above {formatINR(CAPITAL_GAINS.equity.ltcgExemption)} a year, property and other assets LTCG {CAPITAL_GAINS.property.ltcgRate}% after{' '}
            {CAPITAL_GAINS.property.holdingMonths} months (resident individuals/HUFs may choose {CAPITAL_GAINS.property.legacyIndexedRate}% with indexation for property bought before 23
            July 2024). Debt funds bought on or after 1 April 2023 are taxed at slab rate. Cess {CESS_RATE}% added; surcharge, exemptions u/s 54/54F/54EC and set-off of other
            losses are not modelled.
          </div>
        </div>
      </div>
    </div>
  )
}

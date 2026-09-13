'use client'

import { useEffect, useState, type ReactNode } from 'react'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { computeNewRegime, computeOldRegime } from '@/app/lib/tax/compute'
import { formatINR } from '@/app/lib/format'
import { SITE } from '@/app/lib/site'
import { Container, Eyebrow } from './ui'

// Three animated scenes that show what an expert-prepared return looks
// like: deductions found, regime chosen on real numbers, refund tracked.
// The figures are computed by the same engine as the calculators, from a
// sample salaried profile, so they are always right for the current FY.

// A metro-city salaried employee paying rent and a home loan: the case
// where the old regime still wins on FY 2025-26 slabs, so all three scenes
// tell one story.
const PROFILE = {
  gross: 1_600_000,
  deductions: [
    { key: '24b', label: 'Home loan interest', hint: 'Section 24(b)', value: 200_000, tone: '#059669' },
    { key: 'HRA', label: 'HRA exemption', hint: 'Section 10(13A)', value: 180_000, tone: '#10b981' },
    { key: '80C', label: 'Section 80C', hint: 'PPF, ELSS, EPF, LIC', value: 150_000, tone: '#34d399' },
    { key: 'NPS', label: 'NPS', hint: 'Section 80CCD(1B)', value: 50_000, tone: '#6ee7b7' },
    { key: '80D', label: 'Health insurance', hint: 'Section 80D, self and parents', value: 50_000, tone: '#a7f3d0' },
  ],
}
const OLD = computeOldRegime(PROFILE.gross, { sec80C: 150_000, homeLoanInterest: 200_000, hraExempt: 180_000, nps80CCD1B: 50_000, sec80D: 50_000 })
const NEW = computeNewRegime(PROFILE.gross)
const BEST = NEW.totalTax <= OLD.totalTax ? NEW : OLD
const OTHER = BEST === NEW ? OLD : NEW
const SAVING = OTHER.totalTax - BEST.totalTax
const DEDUCTIONS_TOTAL = PROFILE.deductions.reduce((s, d) => s + d.value, 0)
// Donut geometry: each arc's length and where it starts, as fractions of
// the circumference, so render stays pure.
const ARCS = PROFILE.deductions.reduce<{ key: string; tone: string; len: number; start: number }[]>((acc, d) => {
  const start = acc.length ? acc[acc.length - 1].start + acc[acc.length - 1].len : 0
  return [...acc, { key: d.key, tone: d.tone, len: d.value / DEDUCTIONS_TOTAL, start }]
}, [])
const TDS_PAID = BEST.totalTax + 38_200
const REFUND = TDS_PAID - BEST.totalTax

const SCENES = [
  {
    id: 'deductions',
    eyebrow: 'Deductions',
    title: 'Every deduction you are entitled to,',
    emphasis: 'found before we file.',
    desc: 'Your expert goes through Form 16, rent, loan and investment proofs line by line. Nothing is claimed that cannot be proved, and nothing provable is left on the table.',
    link: { label: 'See how deductions work', href: '/sections/80c' },
  },
  {
    id: 'regime',
    eyebrow: 'Regime choice',
    title: 'Old or new regime,',
    emphasis: 'decided on your numbers.',
    desc: 'Both regimes are computed side by side on your actual income and proofs. You see the difference in rupees and approve the better one before anything is filed.',
    link: { label: 'Compare regimes yourself', href: '/calculators/income-tax' },
  },
  {
    id: 'refund',
    eyebrow: 'Refund',
    title: 'Your refund,',
    emphasis: 'tracked until it reaches your bank.',
    desc: 'TDS and advance tax are reconciled with Form 26AS and AIS so the refund is claimed in full, e-verified the same day, and followed up until it is credited.',
    link: { label: 'ITR plans from ' + formatINR(499), href: '/services/itr' },
  },
] as const

const HOLD_MS = 5500

function useCountUp(target: number, ms = 1100) {
  const [n, setN] = useState(0)
  useEffect(() => {
    const instant = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    const start = performance.now()
    const tick = (t: number) => {
      const p = instant ? 1 : Math.min(1, (t - start) / ms)
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, ms])
  return n
}

// Flips to true one frame after mount so CSS transitions have a "from" state.
function useEntered() {
  const [entered, setEntered] = useState(false)
  useEffect(() => {
    const raf = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(raf)
  }, [])
  return entered
}

function Card({ title, aside, children }: { title: string; aside?: ReactNode; children: ReactNode }) {
  return (
    <div className="animate-fade-up rounded-2xl border border-border bg-white p-5 shadow-[var(--shadow-lift)] sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-bold text-navy-900">{title}</p>
        {aside}
      </div>
      {children}
    </div>
  )
}

function DeductionsScene() {
  const entered = useEntered()
  const total = useCountUp(DEDUCTIONS_TOTAL)
  const R = 54
  const C = 2 * Math.PI * R
  return (
    <Card title="Deductions found" aside={<span className="rounded-md bg-green-50 px-2 py-0.5 font-mono text-sm font-bold tabular text-green-700">{formatINR(total)}</span>}>
      <div className="mt-5 grid items-center gap-6 sm:grid-cols-[150px_1fr]">
        <div className="relative mx-auto h-[150px] w-[150px]">
          <svg viewBox="0 0 150 150" className="h-full w-full -rotate-90">
            <circle cx="75" cy="75" r={R} fill="none" stroke="#ecfdf5" strokeWidth="18" />
            {ARCS.map((a, i) => (
              <circle
                key={a.key}
                cx="75"
                cy="75"
                r={R}
                fill="none"
                stroke={a.tone}
                strokeWidth="18"
                strokeDasharray={`${Math.max(0, a.len * C - 2)} ${C}`}
                strokeDashoffset={-a.start * C}
                style={{ opacity: entered ? 1 : 0, transition: `opacity 0.5s ease ${0.15 + i * 0.18}s` }}
              />
            ))}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-mono text-lg font-bold tabular text-navy-900">{(DEDUCTIONS_TOTAL / 100000).toFixed(2)}L</span>
            <span className="text-[10px] uppercase tracking-wider text-muted">claimed</span>
          </div>
        </div>
        <ul className="space-y-1.5">
          {PROFILE.deductions.map((d, i) => (
            <li key={d.key} className="flex items-center justify-between gap-3 text-sm" style={{ opacity: entered ? 1 : 0, transform: entered ? 'none' : 'translateX(8px)', transition: `opacity 0.4s ease ${0.2 + i * 0.18}s, transform 0.4s ease ${0.2 + i * 0.18}s` }}>
              <span className="flex min-w-0 items-center gap-2">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: d.tone }} />
                <span className="min-w-0">
                  <span className="block truncate font-semibold text-navy-900">{d.label}</span>
                  <span className="block truncate text-[11px] text-muted">{d.hint}</span>
                </span>
              </span>
              <span className="shrink-0 font-mono tabular text-navy-900">{formatINR(d.value)}</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  )
}

function RegimeScene() {
  const entered = useEntered()
  const saving = useCountUp(SAVING)
  const max = Math.max(OLD.totalTax, NEW.totalTax)
  const rows = [
    { label: 'New regime', tax: NEW.totalTax, best: BEST === NEW },
    { label: 'Old regime', tax: OLD.totalTax, best: BEST === OLD },
  ]
  return (
    <Card title="Regime comparison" aside={<span className="text-xs text-muted">Salary {formatINR(PROFILE.gross)}, FY {SITE.currentFY}</span>}>
      <div className="mt-5 space-y-5">
        {rows.map((r, i) => (
          <div key={r.label}>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 font-semibold text-navy-900">
                {r.label}
                {r.best && (
                  <span className="flex items-center gap-1 rounded-md bg-green-50 px-1.5 py-0.5 text-[11px] font-bold text-green-700" style={{ opacity: entered ? 1 : 0, transition: 'opacity 0.4s ease 1.2s' }}>
                    <Check className="h-3 w-3" /> Recommended
                  </span>
                )}
              </span>
              <span className="font-mono tabular text-navy-900">{formatINR(r.tax)}</span>
            </div>
            <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-bg-alt">
              <div className={`h-full rounded-full ${r.best ? 'bg-green-600' : 'bg-navy-100'}`} style={{ width: entered ? `${(r.tax / max) * 100}%` : '0%', transition: `width 1s cubic-bezier(0.16,1,0.3,1) ${0.2 + i * 0.25}s` }} />
            </div>
            <p className="mt-1 text-xs text-muted">Taxable income {formatINR(r.best ? BEST.taxableIncome : OTHER.taxableIncome)}</p>
          </div>
        ))}
        <div className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-800" style={{ opacity: entered ? 1 : 0, transform: entered ? 'none' : 'translateY(6px)', transition: 'opacity 0.5s ease 1.3s, transform 0.5s ease 1.3s' }}>
          The {BEST.regime} regime saves <strong className="font-mono tabular">{formatINR(saving)}</strong> this year. You approve before we file.
        </div>
      </div>
    </Card>
  )
}

function RefundScene() {
  const entered = useEntered()
  const refund = useCountUp(REFUND)
  const rows = [
    { label: 'Gross salary', value: PROFILE.gross, pct: 100 },
    { label: 'Deductions and exemptions', value: BEST.standardDeduction + BEST.otherDeductions, pct: ((BEST.standardDeduction + BEST.otherDeductions) / PROFILE.gross) * 100 },
    { label: 'Taxable income', value: BEST.taxableIncome, pct: (BEST.taxableIncome / PROFILE.gross) * 100 },
    { label: 'Tax payable', value: BEST.totalTax, pct: (BEST.totalTax / PROFILE.gross) * 100, tone: 'bg-navy-900' },
    { label: 'TDS already deducted', value: TDS_PAID, pct: (TDS_PAID / PROFILE.gross) * 100, tone: 'bg-green-600' },
  ]
  return (
    <Card title="Refund computation" aside={<span className="rounded-md bg-green-50 px-2 py-0.5 text-[11px] font-bold text-green-700">e-verified</span>}>
      <div className="mt-4 rounded-xl bg-bg-alt px-4 py-3">
        <p className="text-xs uppercase tracking-wider text-muted">Refund due to you</p>
        <p className="mt-0.5 font-mono text-3xl font-extrabold tabular text-green-700">{formatINR(refund)}</p>
      </div>
      <ul className="mt-4 space-y-3">
        {rows.map((r, i) => (
          <li key={r.label} style={{ opacity: entered ? 1 : 0, transition: `opacity 0.4s ease ${0.1 + i * 0.15}s` }}>
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-2">{r.label}</span>
              <span className="font-mono tabular font-semibold text-navy-900">{formatINR(r.value)}</span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-bg-alt">
              <div className={`h-full rounded-full ${r.tone ?? 'bg-navy-100'}`} style={{ width: entered ? `${Math.max(2, r.pct)}%` : '0%', transition: `width 0.9s cubic-bezier(0.16,1,0.3,1) ${0.2 + i * 0.15}s` }} />
            </div>
          </li>
        ))}
      </ul>
    </Card>
  )
}

export default function TaxShowcase() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = window.setTimeout(() => setActive((a) => (a + 1) % SCENES.length), HOLD_MS)
    return () => clearTimeout(t)
  }, [active, paused])

  const scene = SCENES[active]

  return (
    <section className="overflow-hidden bg-[radial-gradient(ellipse_at_top_left,_var(--green-50),_transparent_55%),linear-gradient(to_bottom,_var(--bg-alt),_#ffffff)] py-16 lg:py-24">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-16">
          {/* Stage */}
          <div className="relative" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            <div aria-hidden className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-[conic-gradient(from_180deg,_var(--green-100),_transparent_30%,_var(--navy-100),_transparent_70%,_var(--green-100))] opacity-60 blur-2xl" />
            <div className="mx-auto w-full max-w-md" key={scene.id}>
              {scene.id === 'deductions' && <DeductionsScene />}
              {scene.id === 'regime' && <RegimeScene />}
              {scene.id === 'refund' && <RefundScene />}
            </div>
          </div>

          {/* Copy */}
          <div>
            <Eyebrow>What expert-assisted means</Eyebrow>
            <div key={scene.id} className="animate-fade-up">
              <h2 className="mt-3 text-3xl font-extrabold leading-[1.1] tracking-tight text-navy-900 sm:text-4xl">
                {scene.title} <span className="text-green-600">{scene.emphasis}</span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-text-2 sm:text-lg">{scene.desc}</p>
              <Link href={scene.link.href} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-green-700 hover:underline">
                {scene.link.label} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Scene switcher */}
            <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Examples">
              {SCENES.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  onClick={() => { setActive(i); setPaused(true) }}
                  className={`relative overflow-hidden rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${i === active ? 'border-navy-900 bg-navy-900 text-white' : 'border-border bg-white text-text-2 hover:border-navy-700'}`}
                >
                  {i === active && !paused && (
                    <span aria-hidden className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-green-400 motion-reduce:hidden" style={{ animation: `showcase-progress ${HOLD_MS}ms linear forwards` }} />
                  )}
                  {s.eyebrow}
                </button>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted">Sample salaried profile, FY {SITE.currentFY}. Figures come from the same engine as our calculators.</p>
          </div>
        </div>
      </Container>
    </section>
  )
}

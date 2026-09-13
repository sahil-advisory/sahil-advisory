'use client'

import { useEffect, useState } from 'react'
import { Check, FileCheck2, MessageCircle } from 'lucide-react'

// A "live status" mockup instead of a stock illustration. It plays a short
// loop: rows resolve one by one, the document bar fills, the refund counts
// up, the draft goes out for approval and a WhatsApp update slides in.
//
// The server renders the finished state, so crawlers and no-JS readers see
// the complete card; the loop only starts on the client and never starts
// when the visitor prefers reduced motion.

const ROWS = [
  { label: 'Service', value: 'ITR-2 with capital gains' },
  { label: 'Expert', value: 'CMA Sahil, assigned' },
  { label: 'Documents', value: '6 / 6 received' },
]
const REFUND = 18340
const FINAL = 7 // 0 reset · 1-3 rows · 4 refund · 5 draft · 6 toast · 7 hold

function useCountUp(target: number, run: boolean, ms = 900) {
  const [n, setN] = useState(target)
  useEffect(() => {
    if (!run) return
    let raf = 0
    const start = performance.now()
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / ms)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(Math.round(target * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [run, target, ms])
  return n
}

export default function HeroStatusCard() {
  const [step, setStep] = useState(FINAL)
  const [cycle, setCycle] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // Variable pacing: hold the finished card longer than each step.
    let s = FINAL
    let timer = 0
    const next = () => {
      s = s >= FINAL ? 0 : s + 1
      if (s === 0) setCycle((c) => c + 1)
      setStep(s)
      timer = window.setTimeout(next, s === FINAL ? 2600 : s === 0 ? 500 : 950)
    }
    timer = window.setTimeout(next, 1800)
    return () => clearTimeout(timer)
  }, [])

  const refund = useCountUp(REFUND, step >= 4)
  const fetching = (i: number) => step < i + 1

  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div className={`rounded-3xl border border-border bg-card p-5 shadow-[var(--shadow-lift)] transition-opacity duration-300 ${step === 0 ? 'opacity-70' : 'opacity-100'}`}>
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">Order #SA-2611</p>
          <span className={`rounded-md px-2 py-0.5 text-[11px] font-bold transition-colors duration-300 ${step >= 5 ? 'bg-gold-50 text-gold-600' : 'bg-green-50 text-green-700'}`}>
            {step >= 5 ? 'Awaiting your approval' : 'In progress'}
          </span>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-green-600 text-white">
            <FileCheck2 className="h-5 w-5" />
          </span>
          <div>
            <p className="text-base font-bold text-navy-900">Your filing is in motion</p>
            <p className="text-xs text-muted">
              Refund estimate{' '}
              <span className={`font-mono font-semibold tabular transition-colors duration-300 ${step >= 4 ? 'text-green-700' : 'text-muted'}`}>
                {step >= 4 ? `₹${refund.toLocaleString('en-IN')}` : 'calculating'}
              </span>
            </p>
          </div>
        </div>

        <ul className="mt-4 space-y-2">
          {ROWS.map((r, i) => (
            <li key={r.label} className="relative overflow-hidden rounded-xl border border-border bg-bg-alt px-3 py-2.5 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted">{r.label}</span>
                {fetching(i) ? (
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-navy-700">
                    Fetching
                    <span className="flex gap-0.5" aria-hidden>
                      <span className="h-1 w-1 animate-bounce rounded-full bg-navy-700 [animation-delay:-0.3s]" />
                      <span className="h-1 w-1 animate-bounce rounded-full bg-navy-700 [animation-delay:-0.15s]" />
                      <span className="h-1 w-1 animate-bounce rounded-full bg-navy-700" />
                    </span>
                  </span>
                ) : (
                  <span key={`${cycle}-${i}`} className="animate-fade-up flex items-center gap-1.5 font-semibold text-navy-900">
                    {r.value}
                    <Check className="h-4 w-4 text-green-600" />
                  </span>
                )}
              </div>
              {i === 2 && (
                <span aria-hidden className="absolute inset-x-0 bottom-0 h-0.5 bg-green-100">
                  <span className="block h-full bg-green-600 transition-[width] duration-700 ease-out" style={{ width: fetching(i) ? '0%' : '100%' }} />
                </span>
              )}
            </li>
          ))}
          <li className="flex items-center justify-between rounded-xl border border-border bg-bg-alt px-3 py-2.5 text-sm">
            <span className="text-muted">Draft computation</span>
            {step >= 5 ? (
              <span key={`${cycle}-draft`} className="animate-fade-up flex items-center gap-1.5 font-semibold text-navy-900">
                Shared for your approval
                <span className="h-2 w-2 animate-pulse rounded-full bg-gold-600" />
              </span>
            ) : (
              <span className="text-xs font-semibold text-muted">{step >= 4 ? 'Preparing' : 'Queued'}</span>
            )}
          </li>
        </ul>

        <button
          type="button"
          className={`mt-4 w-full rounded-lg py-2.5 text-sm font-semibold transition-[background-color,color,box-shadow] duration-500 ${step >= 5 ? 'bg-navy-900 text-white shadow-md' : 'bg-navy-100 text-navy-700'}`}
          tabIndex={-1}
          aria-hidden
        >
          Approve draft and file
        </button>
      </div>

      <div
        className={`absolute -bottom-5 -left-4 flex items-center gap-2 rounded-xl border border-border bg-white px-3 py-2 text-xs shadow-[var(--shadow-lift)] transition-[opacity,transform] duration-500 ease-out sm:-left-8 ${step >= 6 ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}`}
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#25D366] text-white"><MessageCircle className="h-4 w-4" /></span>
        <span>
          <span className="block font-semibold text-navy-900">WhatsApp update</span>
          <span className="block text-muted">Draft ready. Reply APPROVE to file.</span>
        </span>
      </div>
    </div>
  )
}

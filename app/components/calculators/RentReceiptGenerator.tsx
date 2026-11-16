'use client'

import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { AlertTriangle, Printer } from 'lucide-react'
import { formatINR } from '@/app/lib/format'

const inputCls =
  'w-full rounded-lg border border-border-strong bg-white px-3 py-2.5 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100'

const PAN_REQUIRED_ABOVE = 100_000 // annual rent, CBDT circular 8/2013
const REVENUE_STAMP_ABOVE = 5_000 // cash receipts, Indian Stamp Act
const PAN_RE = /^[A-Z]{5}[0-9]{4}[A-Z]$/

function num(s: string): number {
  const n = parseFloat(s)
  return Number.isFinite(n) && n > 0 ? n : 0
}

const ONES = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen']
const TENS = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']

function twoDigits(n: number): string {
  if (n < 20) return ONES[n]
  return `${TENS[Math.floor(n / 10)]}${n % 10 ? ' ' + ONES[n % 10] : ''}`
}
function threeDigits(n: number): string {
  const h = Math.floor(n / 100)
  const rest = n % 100
  return [h ? `${ONES[h]} Hundred` : '', rest ? twoDigits(rest) : ''].filter(Boolean).join(' ')
}
// Indian numbering: crore, lakh, thousand, hundred.
function inWords(n: number): string {
  n = Math.round(n)
  if (n === 0) return 'Zero'
  const crore = Math.floor(n / 1e7)
  const lakh = Math.floor((n % 1e7) / 1e5)
  const thousand = Math.floor((n % 1e5) / 1e3)
  const rest = n % 1e3
  return [
    crore ? `${twoDigits(crore)} Crore` : '',
    lakh ? `${twoDigits(lakh)} Lakh` : '',
    thousand ? `${twoDigits(thousand)} Thousand` : '',
    rest ? threeDigits(rest) : '',
  ]
    .filter(Boolean)
    .join(' ')
}

function monthsBetween(from: string, to: string): { key: string; label: string; endDate: string }[] {
  const [fy, fm] = from.split('-').map(Number)
  const [ty, tm] = to.split('-').map(Number)
  if (!fy || !fm || !ty || !tm) return []
  const out: { key: string; label: string; endDate: string }[] = []
  let y = fy
  let m = fm
  while (y < ty || (y === ty && m <= tm)) {
    const d = new Date(y, m, 0) // last day of month
    out.push({
      key: `${y}-${String(m).padStart(2, '0')}`,
      label: d.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }),
      endDate: d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
    })
    m += 1
    if (m > 12) {
      m = 1
      y += 1
    }
    if (out.length >= 24) break
  }
  return out
}

type Details = { tenant: string; landlord: string; pan: string; address: string; rent: number; mode: string }

function Receipt({ d, month, index, showStamp }: { d: Details; month: { label: string; endDate: string }; index: number; showStamp: boolean }) {
  return (
    <article className="receipt break-inside-avoid rounded-xl border-2 border-navy-900 bg-white p-5 text-[13px] leading-relaxed text-text sm:p-6">
      <header className="flex items-start justify-between gap-4 border-b border-border pb-3">
        <div>
          <h3 className="text-base font-extrabold uppercase tracking-[0.18em] text-navy-900">Rent Receipt</h3>
          <p className="text-xs text-muted">Receipt No. {String(index + 1).padStart(3, '0')} · {month.label}</p>
        </div>
        <div className="text-right text-xs text-muted">
          <p>Date</p>
          <p className="font-mono tabular font-semibold text-navy-900">{month.endDate}</p>
        </div>
      </header>
      <p className="mt-4">
        Received with thanks from <strong className="text-navy-900">{d.tenant || '________________'}</strong> a sum of{' '}
        <strong className="font-mono tabular text-navy-900">{formatINR(d.rent)}</strong> (Rupees {inWords(d.rent)} only) by{' '}
        <strong className="text-navy-900">{d.mode}</strong> towards rent for the month of <strong className="text-navy-900">{month.label}</strong> for the property situated at{' '}
        <strong className="text-navy-900">{d.address || '________________________________'}</strong>.
      </p>
      <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
        <div className="text-xs">
          <p>
            <span className="text-muted">Landlord:</span> <strong className="text-navy-900">{d.landlord || '________________'}</strong>
          </p>
          <p>
            <span className="text-muted">Landlord PAN:</span> <span className="font-mono tabular font-semibold text-navy-900">{d.pan || (d.rent * 12 > PAN_REQUIRED_ABOVE ? '__________' : 'Not required')}</span>
          </p>
        </div>
        <div className="flex items-end gap-4">
          {showStamp ? (
            <div className="flex h-16 w-14 items-center justify-center rounded border border-dashed border-border-strong text-center text-[9px] leading-tight text-muted">
              Affix ₹1 revenue stamp
            </div>
          ) : null}
          <div className="w-44 border-t border-navy-900 pt-1 text-center text-[11px] text-muted">Signature of landlord</div>
        </div>
      </div>
    </article>
  )
}

export default function RentReceiptGenerator() {
  const [tenant, setTenant] = useState('')
  const [landlord, setLandlord] = useState('')
  const [pan, setPan] = useState('')
  const [address, setAddress] = useState('')
  const [rent, setRent] = useState('15000')
  const [from, setFrom] = useState('2026-04')
  const [to, setTo] = useState('2027-03')
  const [mode, setMode] = useState('Bank transfer / UPI')
  const [printing, setPrinting] = useState(false)

  const months = useMemo(() => monthsBetween(from, to), [from, to])
  const rentN = num(rent)
  const annualRent = rentN * 12
  const panNeeded = annualRent > PAN_REQUIRED_ABOVE
  const panInvalid = pan.length > 0 && !PAN_RE.test(pan)
  const showStamp = mode === 'Cash' && rentN > REVENUE_STAMP_ABOVE
  const details: Details = { tenant, landlord, pan, address, rent: rentN, mode }

  useEffect(() => {
    if (!printing) return
    const done = () => {
      document.body.classList.remove('printing-receipts')
      setPrinting(false)
    }
    window.addEventListener('afterprint', done, { once: true })
    document.body.classList.add('printing-receipts')
    window.print()
    // Browsers without afterprint (or a cancelled dialog) fall back to this.
    const t = window.setTimeout(done, 1500)
    return () => {
      window.clearTimeout(t)
      window.removeEventListener('afterprint', done)
    }
  }, [printing])

  const receipts = months.map((m, i) => <Receipt key={m.key} d={details} month={m} index={i} showStamp={showStamp} />)

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:items-start">
      <style>{`
        @media print {
          body.printing-receipts > *:not(#receipts-root) { display: none !important; }
          #receipts-root { display: block; padding: 0; margin: 0; }
          #receipts-root .receipt { page-break-inside: avoid; break-inside: avoid; margin: 0 0 16px; box-shadow: none; }
          @page { margin: 14mm; }
        }
      `}</style>
      <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-[var(--shadow-card)] lg:sticky lg:top-24">
        <h2 className="text-base font-bold text-navy-900">Receipt details</h2>
        <div className="mt-4 space-y-3">
          <label className="block">
            <span className="text-xs font-semibold text-text-2">Tenant name</span>
            <input value={tenant} onChange={(e) => setTenant(e.target.value)} className={`${inputCls} mt-1`} placeholder="As per your employer records" autoComplete="name" />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-text-2">Landlord name</span>
            <input value={landlord} onChange={(e) => setLandlord(e.target.value)} className={`${inputCls} mt-1`} placeholder="Owner of the property" />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-text-2">Landlord PAN {panNeeded ? <span className="text-red-600">(required, annual rent above {formatINR(PAN_REQUIRED_ABOVE)})</span> : '(optional)'}</span>
            <input
              value={pan}
              onChange={(e) => setPan(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10))}
              className={`${inputCls} mt-1 font-mono uppercase ${panInvalid ? 'border-red-600' : ''}`}
              placeholder="ABCDE1234F"
              aria-invalid={panInvalid}
            />
            {panInvalid ? <span className="mt-1 block text-[11px] text-red-600">PAN should be 5 letters, 4 digits, 1 letter.</span> : null}
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-text-2">Rented property address</span>
            <textarea value={address} onChange={(e) => setAddress(e.target.value)} rows={2} className={`${inputCls} mt-1`} placeholder="Flat / house no., street, city, PIN" />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="text-xs font-semibold text-text-2">Monthly rent</span>
              <div className="relative mt-1">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-muted" aria-hidden>₹</span>
                <input type="text" inputMode="numeric" value={rent} onChange={(e) => setRent(e.target.value.replace(/[^\d]/g, ''))} className={`${inputCls} pl-7 font-mono tabular`} />
              </div>
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-text-2">Payment mode</span>
              <select value={mode} onChange={(e) => setMode(e.target.value)} className={`${inputCls} mt-1`}>
                {['Bank transfer / UPI', 'Cheque', 'Cash'].map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-text-2">From month</span>
              <input type="month" value={from} onChange={(e) => setFrom(e.target.value)} className={`${inputCls} mt-1 font-mono`} />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-text-2">To month</span>
              <input type="month" value={to} onChange={(e) => setTo(e.target.value)} className={`${inputCls} mt-1 font-mono`} />
            </label>
          </div>
          {panNeeded && !pan ? (
            <p className="flex items-start gap-2 rounded-lg border border-amber-200 bg-gold-50 p-3 text-xs text-gold-600">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              Annual rent is {formatINR(annualRent)}. Employers must collect the landlord&apos;s PAN when rent exceeds {formatINR(PAN_REQUIRED_ABOVE)} a year; without it HRA exemption can be denied.
            </p>
          ) : null}
          {showStamp ? (
            <p className="rounded-lg border border-border bg-bg-alt p-3 text-xs text-text-2">Cash rent above {formatINR(REVENUE_STAMP_ABOVE)}: affix a ₹1 revenue stamp and have the landlord sign across it.</p>
          ) : null}
          <button
            type="button"
            onClick={() => setPrinting(true)}
            disabled={months.length === 0 || rentN === 0}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-navy-900 px-4 py-3 text-sm font-semibold text-white hover:bg-navy-800 disabled:opacity-60"
          >
            <Printer className="h-4 w-4" aria-hidden />
            Print / Save as PDF ({months.length} {months.length === 1 ? 'receipt' : 'receipts'})
          </button>
          <p className="text-[11px] text-muted">In the print dialog choose &quot;Save as PDF&quot; as the destination. Nothing you type here is sent to any server.</p>
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-bold text-navy-900">Preview</h2>
          <span className="text-xs text-muted">{months.length} month{months.length === 1 ? '' : 's'} · total {formatINR(rentN * months.length)}</span>
        </div>
        {months.length === 0 ? (
          <p className="rounded-xl border border-border bg-bg-alt p-6 text-sm text-text-2">Choose a valid from and to month.</p>
        ) : (
          <div className="space-y-4">{receipts}</div>
        )}
        <div className="mt-4 rounded-lg border border-border bg-bg-alt/60 p-3 text-[11px] leading-relaxed text-muted">
          <strong className="text-text-2">Assumptions:</strong> one receipt per month dated the month end. Landlord PAN mandatory when annual rent exceeds{' '}
          {formatINR(PAN_REQUIRED_ABOVE)} (Form 60 if the landlord has no PAN); revenue stamp for cash receipts above {formatINR(REVENUE_STAMP_ABOVE)}. If monthly rent exceeds{' '}
          {formatINR(50_000)}, deduct 2% TDS u/s 194-IB once a year. Keep the rent agreement and bank proofs; receipts alone may not be enough on scrutiny.
        </div>
      </div>

      {printing ? createPortal(<div id="receipts-root">{receipts}</div>, document.body) : null}
    </div>
  )
}

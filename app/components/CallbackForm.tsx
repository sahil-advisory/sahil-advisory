'use client'

import { useState, type FormEvent } from 'react'
import { CheckCircle2, Loader2, ShieldCheck } from 'lucide-react'
import { whatsappLink } from '@/app/lib/site'
import { track, identifyLead } from '@/app/lib/analytics'

type Props = {
  service?: string
  title?: string
  subtitle?: string
  options?: { label: string; values: string[] }
  compact?: boolean
}

export default function CallbackForm({
  service,
  title = 'Get a free callback from a tax expert',
  subtitle,
  options = { label: 'Income source', values: ['Salary / pension', 'Business / freelance', 'Capital gains / F&O', 'NRI', 'Company / LLP', 'Not sure'] },
  compact,
}: Props) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle')
  const [error, setError] = useState('')
  const [values, setValues] = useState({ name: '', phone: '', email: '', detail: options.values[0], message: '' })

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('submitting')
    setError('')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name,
          phone: values.phone,
          email: values.email,
          detail: values.detail,
          detailLabel: options.label,
          message: values.message,
          service,
          sourceUrl: typeof window !== 'undefined' ? window.location.href : '',
          hp: (document.getElementById('lead-hp') as HTMLInputElement | null)?.value ?? '',
        }),
      })
      const json = (await res.json()) as { ok?: boolean; leadId?: string; error?: string }
      if (!res.ok) {
        track('lead_failed', { service: service ?? 'general', reason: json.error ?? String(res.status) })
        throw new Error(json.error || 'Something went wrong')
      }
      setStatus('done')
      track('lead_submitted', { service: service ?? 'general', detail: values.detail, lead_id: json.leadId })
      if (json.leadId) identifyLead(json.leadId, { service: service ?? 'general' })
    } catch (err) {
      setStatus('error')
      setError((err as Error).message)
    }
  }

  if (status === 'done') {
    const wa = whatsappLink(`Hi, I just requested a callback on the website${service ? ` for ${service}` : ''}. My name is ${values.name}.`)
    return (
      <div className="rounded-2xl border border-green-100 bg-green-50 p-6 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-green-600" />
        <h3 className="mt-3 text-lg font-bold text-navy-900">Request received</h3>
        <p className="mt-1 text-sm text-text-2">We call back within 2 working hours (Mon to Sat, 10 AM to 7 PM).{values.email ? ' A confirmation with what happens next is on its way to your inbox.' : ''} Prefer WhatsApp?</p>
        <a href={wa} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700">
          Continue on WhatsApp
        </a>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className={`rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] ${compact ? 'p-5' : 'p-6'}`}>
      <h3 className="text-base font-bold text-navy-900">{title}</h3>
      {subtitle && <p className="mt-1 text-xs text-muted">{subtitle}</p>}
      <div className="mt-4 space-y-3">
        <label className="block">
          <span className="text-xs font-semibold text-text-2">Your name</span>
          <input
            required
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
            className="mt-1 w-full rounded-lg border border-border-strong px-3 py-2.5 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
            placeholder="Full name"
            autoComplete="name"
          />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="text-xs font-semibold text-text-2">Mobile</span>
            <input
              required
              inputMode="numeric"
              pattern="[6-9][0-9]{9}"
              title="10-digit Indian mobile number"
              value={values.phone}
              onChange={(e) => setValues({ ...values, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
              className="mt-1 w-full rounded-lg border border-border-strong px-3 py-2.5 font-mono text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              placeholder="10-digit number"
              autoComplete="tel-national"
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-text-2">{options.label}</span>
            <select
              value={values.detail}
              onChange={(e) => setValues({ ...values, detail: e.target.value })}
              className="mt-1 w-full rounded-lg border border-border-strong bg-white px-3 py-2.5 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
            >
              {options.values.map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </label>
        </div>
        <label className="block">
          <span className="text-xs font-semibold text-text-2">Email <span className="font-normal text-muted">(optional, for a confirmation)</span></span>
          <input
            type="email"
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            className="mt-1 w-full rounded-lg border border-border-strong px-3 py-2.5 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
            placeholder="you@example.com"
            autoComplete="email"
            inputMode="email"
          />
        </label>
        {!compact && (
          <label className="block">
            <span className="text-xs font-semibold text-text-2">Anything we should know? (optional)</span>
            <textarea
              rows={2}
              value={values.message}
              onChange={(e) => setValues({ ...values, message: e.target.value })}
              className="mt-1 w-full rounded-lg border border-border-strong px-3 py-2.5 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              placeholder="e.g. two Form 16s and some mutual fund sales"
            />
          </label>
        )}
        <input id="lead-hp" type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      </div>
      {status === 'error' && <p className="mt-3 text-xs text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-navy-900 px-4 py-3 text-sm font-semibold text-white hover:bg-navy-800 disabled:opacity-60"
      >
        {status === 'submitting' && <Loader2 className="h-4 w-4 animate-spin" />}
        Request callback
      </button>
      <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-muted">
        <ShieldCheck className="h-3.5 w-3.5 text-green-600" />
        Your details stay private and are never shared.
      </p>
    </form>
  )
}

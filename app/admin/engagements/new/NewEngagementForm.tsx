'use client'

import { useState, useTransition } from 'react'
import { Loader2 } from 'lucide-react'
import type { Checklist } from '@/app/lib/checklists'
import { createEngagementAction } from '@/app/lib/engagements/actions'

type Props = {
  services: { id: string; name: string; plans: { slug: string; name: string; structured: boolean }[] }[]
  checklists: Record<string, Checklist>
  staff: { id: string; name: string | null; email: string | null; role: string }[]
  defaults: { leadId: string | null; name: string; email: string; phone: string; serviceSlug: string; periodLabel: string; notes: string }
}

const input = 'mt-1 w-full rounded-lg border border-border-strong px-3 py-2.5 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100'

export function NewEngagementForm({ services, checklists, staff, defaults }: Props) {
  const [serviceSlug, setServiceSlug] = useState(defaults.serviceSlug)
  const [intake, setIntake] = useState<Record<string, string>>({})
  const [error, setError] = useState('')
  const [pending, start] = useTransition()
  const checklist = checklists[serviceSlug]
  // Preview of what the checklist will contain for the current answers.
  const preview = (checklist?.documents ?? []).filter((d) => {
    if (!d.when) return true
    const a = intake[d.when.intake]
    if (a === undefined || a === '') return true
    const val = typeof d.when.equals === 'boolean' ? (a === 'yes') === d.when.equals : a === d.when.equals
    return val
  })

  return (
    <form
      className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]"
      action={(fd) =>
        start(async () => {
          setError('')
          const res = await createEngagementAction(fd)
          if (res && !res.ok) setError(res.error)
        })
      }
    >
      <div className="space-y-6">
        {defaults.leadId && <input type="hidden" name="leadId" value={defaults.leadId} />}
        <section className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-sm font-bold text-navy-900">Client</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="block sm:col-span-2"><span className="text-xs font-semibold text-text-2">Full name</span><input name="name" required defaultValue={defaults.name} className={input} /></label>
            <label className="block"><span className="text-xs font-semibold text-text-2">Email (portal sign-in)</span><input name="email" type="email" required defaultValue={defaults.email} className={input} placeholder="client@example.com" /></label>
            <label className="block"><span className="text-xs font-semibold text-text-2">Mobile</span><input name="phone" inputMode="numeric" defaultValue={defaults.phone} className={`${input} font-mono`} placeholder="10 digits" /></label>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-sm font-bold text-navy-900">Service</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <span className="text-xs font-semibold text-text-2">Plan</span>
              <select name="serviceSlug" value={serviceSlug} onChange={(e) => { setServiceSlug(e.target.value); setIntake({}) }} className={`${input} bg-white`}>
                {services.map((c) => (
                  <optgroup key={c.id} label={c.name}>
                    {c.plans.map((p) => <option key={p.slug} value={p.slug}>{p.name}{p.structured ? '' : ' (basic checklist)'}</option>)}
                  </optgroup>
                ))}
              </select>
            </label>
            <label className="block"><span className="text-xs font-semibold text-text-2">Period</span><input name="periodLabel" required defaultValue={defaults.periodLabel} className={input} placeholder="FY 2025-26 or September 2026" /></label>
            <label className="block"><span className="text-xs font-semibold text-text-2">Due date (optional)</span><input name="dueAt" type="date" className={input} /><span className="mt-1 block text-[11px] text-muted">Leave blank to use the statutory date.</span></label>
            <label className="block"><span className="text-xs font-semibold text-text-2">Price quoted (₹, ex-GST)</span><input name="priceQuoted" type="number" min={0} className={`${input} font-mono`} placeholder="Plan price by default" /></label>
            <label className="block">
              <span className="text-xs font-semibold text-text-2">Assigned expert</span>
              <select name="assignedExpertId" className={`${input} bg-white`} defaultValue="">
                <option value="">Unassigned</option>
                {staff.map((s) => <option key={s.id} value={s.id}>{s.name ?? s.email} ({s.role})</option>)}
              </select>
            </label>
          </div>
        </section>

        {checklist && checklist.intake.length > 0 && (
          <section className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-sm font-bold text-navy-900">Intake</h2>
            <p className="mt-1 text-xs text-muted">Ask the client on the call. Unanswered questions leave the related documents as optional.</p>
            <div className="mt-4 space-y-4">
              {checklist.intake.map((q) => (
                <fieldset key={q.id}>
                  <legend className="text-sm font-semibold text-navy-900">{q.label}</legend>
                  {q.help && <p className="text-xs text-muted">{q.help}</p>}
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(q.type === 'boolean' ? [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }] : q.options ?? []).map((o) => (
                      <label key={o.value} className={`cursor-pointer rounded-full border px-3 py-1 text-sm ${intake[q.id] === o.value ? 'border-navy-900 bg-navy-900 text-white' : 'border-border bg-white text-text-2'}`}>
                        <input type="radio" name={`intake.${q.id}`} value={o.value} className="sr-only" checked={intake[q.id] === o.value} onChange={() => setIntake({ ...intake, [q.id]: o.value })} />
                        {o.label}
                      </label>
                    ))}
                  </div>
                </fieldset>
              ))}
            </div>
          </section>
        )}

        <section className="rounded-2xl border border-border bg-card p-6">
          <label className="block"><span className="text-xs font-semibold text-text-2">Internal notes</span><textarea name="notesInternal" rows={3} defaultValue={defaults.notes} className={input} /></label>
        </section>

        {error && <p className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
        <button type="submit" disabled={pending} className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-60">
          {pending && <Loader2 className="h-4 w-4 animate-spin" />} Create and email the client
        </button>
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-sm font-bold text-navy-900">Checklist preview</h2>
          <p className="mt-1 text-xs text-muted">{preview.length} items. The client sees these with help text and an upload button each.</p>
          <ul className="mt-4 space-y-2">
            {preview.map((d) => (
              <li key={d.key} className="flex items-start gap-2 text-sm">
                <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${d.required === false ? 'bg-border-strong' : 'bg-green-600'}`} />
                <span>
                  <span className="text-navy-900">{d.label}</span>
                  {d.required === false && <span className="ml-1 text-[11px] text-muted">optional</span>}
                  {d.fetchable && <span className="ml-1 rounded bg-green-50 px-1 text-[10px] font-bold text-green-700">WE FETCH</span>}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </form>
  )
}

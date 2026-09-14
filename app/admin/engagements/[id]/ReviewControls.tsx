'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Check, X, MinusCircle, RotateCcw, Download, Loader2, Plus } from 'lucide-react'
import type { RequirementStatus, EngagementStatus } from '@/app/lib/db'
import { MANUAL_TRANSITIONS, STATUS_LABEL } from '@/app/lib/engagements/status'
import {
  verifyRequirementAction,
  rejectRequirementAction,
  waiveRequirementAction,
  reopenRequirementAction,
  markFetchedAction,
  addRequirementAction,
  setStatusAction,
  assignExpertAction,
  updateNotesAction,
} from '@/app/lib/engagements/actions'

const btn = 'inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-semibold disabled:opacity-50'

function useAct() {
  const router = useRouter()
  const [pending, start] = useTransition()
  const [error, setError] = useState('')
  const act = (fn: () => Promise<{ ok: boolean; error?: string }>) =>
    start(async () => {
      setError('')
      const r = await fn()
      if (!r.ok) setError(r.error ?? 'Failed')
      router.refresh()
    })
  return { pending, error, act }
}

export function RequirementControls({ engagementId, requirementId, status, fetchable }: { engagementId: string; requirementId: string; status: RequirementStatus; fetchable: boolean }) {
  const { pending, error, act } = useAct()
  const [mode, setMode] = useState<'idle' | 'reject' | 'waive'>('idle')
  const [reason, setReason] = useState('')
  if (mode !== 'idle') {
    return (
      <form
        className="mt-2 flex flex-col gap-2 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault()
          act(() => (mode === 'reject' ? rejectRequirementAction(engagementId, requirementId, reason) : waiveRequirementAction(engagementId, requirementId, reason)))
          setMode('idle')
          setReason('')
        }}
      >
        <input autoFocus value={reason} onChange={(e) => setReason(e.target.value)} required={mode === 'reject'} placeholder={mode === 'reject' ? 'Reason the client will see, e.g. Part B is missing' : 'Why it is not needed (optional)'} className="flex-1 rounded-lg border border-border-strong px-3 py-1.5 text-sm outline-none focus:border-green-600" />
        <div className="flex gap-2">
          <button type="submit" disabled={pending} className={`${btn} ${mode === 'reject' ? 'border-red-200 bg-red-50 text-red-600' : 'border-border bg-white text-navy-900'}`}>{mode === 'reject' ? 'Send back' : 'Waive'}</button>
          <button type="button" onClick={() => setMode('idle')} className={`${btn} border-border bg-white text-muted`}>Cancel</button>
        </div>
      </form>
    )
  }
  return (
    <div className="mt-2 flex flex-wrap items-center gap-2">
      {(status === 'received' || status === 'needed' || status === 'rejected' || status === 'consent_given') && (
        <button disabled={pending} onClick={() => act(() => verifyRequirementAction(engagementId, requirementId))} className={`${btn} border-green-100 bg-green-50 text-green-700 hover:bg-green-100`}><Check className="h-3.5 w-3.5" /> Verify</button>
      )}
      {(status === 'received' || status === 'verified') && (
        <button disabled={pending} onClick={() => setMode('reject')} className={`${btn} border-red-100 bg-red-50 text-red-600 hover:bg-red-100`}><X className="h-3.5 w-3.5" /> Send back</button>
      )}
      {(status === 'needed' || status === 'rejected') && (
        <button disabled={pending} onClick={() => setMode('waive')} className={`${btn} border-border bg-white text-text-2 hover:bg-bg-alt`}><MinusCircle className="h-3.5 w-3.5" /> Not needed</button>
      )}
      {fetchable && (status === 'consent_given' || status === 'needed') && (
        <button disabled={pending} onClick={() => act(() => markFetchedAction(engagementId, requirementId))} className={`${btn} border-navy-100 bg-navy-100 text-navy-900`}><Download className="h-3.5 w-3.5" /> Mark fetched</button>
      )}
      {(status === 'waived' || status === 'verified' || status === 'fetched') && (
        <button disabled={pending} onClick={() => act(() => reopenRequirementAction(engagementId, requirementId))} className={`${btn} border-border bg-white text-muted hover:bg-bg-alt`}><RotateCcw className="h-3.5 w-3.5" /> Reopen</button>
      )}
      {pending && <Loader2 className="h-3.5 w-3.5 animate-spin text-muted" />}
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  )
}

export function AddRequirement({ engagementId }: { engagementId: string }) {
  const { pending, error, act } = useAct()
  const [open, setOpen] = useState(false)
  const [label, setLabel] = useState('')
  const [help, setHelp] = useState('')
  if (!open) return <button onClick={() => setOpen(true)} className={`${btn} border-border bg-white text-navy-900 hover:bg-bg-alt`}><Plus className="h-3.5 w-3.5" /> Ask for another document</button>
  return (
    <form
      className="grid gap-2 rounded-xl border border-border bg-bg-alt p-3 sm:grid-cols-[1fr_1.4fr_auto]"
      onSubmit={(e) => {
        e.preventDefault()
        act(() => addRequirementAction(engagementId, label, help, true))
        setOpen(false)
        setLabel('')
        setHelp('')
      }}
    >
      <input autoFocus value={label} onChange={(e) => setLabel(e.target.value)} required placeholder="Document name" className="rounded-lg border border-border-strong px-3 py-1.5 text-sm outline-none focus:border-green-600" />
      <input value={help} onChange={(e) => setHelp(e.target.value)} placeholder="Help text the client sees (optional)" className="rounded-lg border border-border-strong px-3 py-1.5 text-sm outline-none focus:border-green-600" />
      <div className="flex gap-2">
        <button type="submit" disabled={pending} className={`${btn} border-green-600 bg-green-600 text-white`}>Add and email</button>
        <button type="button" onClick={() => setOpen(false)} className={`${btn} border-border bg-white text-muted`}>Cancel</button>
      </div>
      {error && <span className="text-xs text-red-600 sm:col-span-3">{error}</span>}
    </form>
  )
}

export function StatusControls({ engagementId, status, isAdmin, expertId, staff }: { engagementId: string; status: EngagementStatus; isAdmin: boolean; expertId: string | null; staff: { id: string; name: string | null; email: string | null }[] }) {
  const { pending, error, act } = useAct()
  const [hold, setHold] = useState('')
  const next = MANUAL_TRANSITIONS[status]
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {next.map((s) =>
          s === 'on_hold' ? (
            <form key={s} className="flex gap-1" onSubmit={(e) => { e.preventDefault(); act(() => setStatusAction(engagementId, s, hold)); setHold('') }}>
              <input value={hold} onChange={(e) => setHold(e.target.value)} placeholder="Hold reason" className="w-36 rounded-lg border border-border-strong px-2 py-1 text-xs outline-none focus:border-green-600" />
              <button type="submit" disabled={pending} className={`${btn} border-red-100 bg-red-50 text-red-600`}>Put on hold</button>
            </form>
          ) : (
            <button key={s} disabled={pending} onClick={() => act(() => setStatusAction(engagementId, s))} className={`${btn} ${s === 'filed' || s === 'verified' ? 'border-green-600 bg-green-600 text-white' : 'border-border bg-white text-navy-900 hover:bg-bg-alt'}`}>
              Mark {STATUS_LABEL[s].label.toLowerCase()}
            </button>
          )
        )}
      </div>
      {isAdmin && (
        <label className="flex items-center gap-2 text-xs text-text-2">
          Expert
          <select value={expertId ?? ''} disabled={pending} onChange={(e) => act(() => assignExpertAction(engagementId, e.target.value || null))} className="rounded-lg border border-border-strong bg-white px-2 py-1 text-xs">
            <option value="">Unassigned</option>
            {staff.map((s) => <option key={s.id} value={s.id}>{s.name ?? s.email}</option>)}
          </select>
        </label>
      )}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
}

export function Notes({ engagementId, initial }: { engagementId: string; initial: string }) {
  const { pending, act } = useAct()
  const [v, setV] = useState(initial)
  return (
    <form onSubmit={(e) => { e.preventDefault(); act(() => updateNotesAction(engagementId, v)) }}>
      <textarea value={v} onChange={(e) => setV(e.target.value)} rows={4} placeholder="Internal notes. The client never sees these." className="w-full rounded-lg border border-border-strong px-3 py-2 text-sm outline-none focus:border-green-600" />
      <button type="submit" disabled={pending || v === initial} className={`${btn} mt-2 border-border bg-white text-navy-900 hover:bg-bg-alt`}>{pending ? 'Saving' : 'Save notes'}</button>
    </form>
  )
}

'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Check, Loader2, ShieldCheck } from 'lucide-react'
import { giveConsentAction, approveDraftAction, requestChangesAction } from '@/app/lib/engagements/actions'

export function ConsentToggle({ engagementId, requirementId, label }: { engagementId: string; requirementId: string; label: string }) {
  const router = useRouter()
  const [pending, start] = useTransition()
  const [error, setError] = useState('')
  return (
    <div className="mt-3 rounded-xl border border-green-100 bg-green-50/60 p-4">
      <p className="flex items-start gap-2 text-sm text-navy-900"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-green-600" /> We can download {label} from the income tax portal for you. Nothing else is accessed, and the consent is recorded with the time.</p>
      <button
        disabled={pending}
        onClick={() => start(async () => { setError(''); const r = await giveConsentAction(engagementId, requirementId); if (!r.ok) setError(r.error); router.refresh() })}
        className="mt-3 inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-60"
      >
        {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />} Yes, download it for me
      </button>
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
      <p className="mt-2 text-[11px] text-muted">Prefer to send it yourself? Use the upload below instead.</p>
    </div>
  )
}

export function DraftApproval({ engagementId, deliverableId }: { engagementId: string; deliverableId: string }) {
  const router = useRouter()
  const [pending, start] = useTransition()
  const [comment, setComment] = useState('')
  const [error, setError] = useState('')
  const [mode, setMode] = useState<'idle' | 'changes'>('idle')
  const go = (fn: () => Promise<{ ok: boolean; error?: string }>) =>
    start(async () => {
      setError('')
      const r = await fn()
      if (!r.ok) setError(r.error ?? 'Failed')
      else setMode('idle')
      router.refresh()
    })
  return (
    <div className="mt-4 rounded-xl border border-amber-200 bg-gold-50 p-4">
      <p className="text-sm font-semibold text-navy-900">Please check the draft and tell us how to proceed.</p>
      <p className="mt-1 text-xs text-text-2">Nothing is filed until you approve. If a number looks wrong, ask for changes and say what.</p>
      <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={2} placeholder={mode === 'changes' ? 'What should change? e.g. the HRA amount looks lower than my rent receipts' : 'Any comment for your expert (optional)'} className="mt-3 w-full rounded-lg border border-border-strong bg-white px-3 py-2 text-sm outline-none focus:border-green-600" />
      <div className="mt-3 flex flex-wrap gap-2">
        {mode === 'idle' ? (
          <>
            <button disabled={pending} onClick={() => go(() => approveDraftAction(engagementId, deliverableId, comment))} className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-60">{pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />} Approve, please file</button>
            <button disabled={pending} onClick={() => setMode('changes')} className="rounded-lg border border-border-strong bg-white px-4 py-2.5 text-sm font-semibold text-navy-900 hover:bg-bg-alt">Ask for changes</button>
          </>
        ) : (
          <>
            <button disabled={pending || !comment.trim()} onClick={() => go(() => requestChangesAction(engagementId, deliverableId, comment))} className="rounded-lg bg-navy-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-navy-800 disabled:opacity-60">Send to my expert</button>
            <button disabled={pending} onClick={() => setMode('idle')} className="rounded-lg border border-border-strong bg-white px-4 py-2.5 text-sm font-semibold text-muted">Back</button>
          </>
        )}
      </div>
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  )
}

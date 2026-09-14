'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, FileUp } from 'lucide-react'
import { DELIVERABLE_TYPES, type DeliverableType } from '@/app/lib/db'
import { refreshEngagementAction } from '@/app/lib/engagements/actions'

const LABEL: Record<DeliverableType, string> = { draft: 'Draft for approval', computation: 'Computation', acknowledgement: 'Acknowledgement (filed)', invoice: 'Invoice', other: 'Other document' }

export function DeliverableUploader({ engagementId }: { engagementId: string }) {
  const router = useRouter()
  const [type, setType] = useState<DeliverableType>('draft')
  const [title, setTitle] = useState('')
  const [msg, setMsg] = useState('')
  const [pending, start] = useTransition()

  function onFile(file: File | null) {
    if (!file) return
    start(async () => {
      setMsg('')
      try {
        const r1 = await fetch('/api/portal/deliverable-url', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ engagementId, type, filename: file.name, mime: file.type, size: file.size }) })
        const j1 = (await r1.json()) as { url?: string; path?: string; error?: string }
        if (!r1.ok || !j1.url) throw new Error(j1.error || 'Could not start upload')
        const put = await fetch(j1.url, { method: 'PUT', headers: { 'Content-Type': file.type, 'x-upsert': 'false' }, body: file })
        if (!put.ok) throw new Error(`Upload failed (${put.status})`)
        const r2 = await fetch('/api/portal/deliverable-complete', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ engagementId, type, title, path: j1.path, filename: file.name }) })
        const j2 = (await r2.json()) as { ok?: boolean; error?: string }
        if (!r2.ok || !j2.ok) throw new Error(j2.error || 'Could not save')
        setMsg(type === 'draft' ? 'Draft shared. The client has been emailed.' : type === 'acknowledgement' ? 'Marked filed. The client has been emailed.' : 'Uploaded.')
        setTitle('')
        await refreshEngagementAction(engagementId)
        router.refresh()
      } catch (err) {
        setMsg((err as Error).message)
      }
    })
  }

  return (
    <div className="space-y-2">
      <div className="grid gap-2 sm:grid-cols-2">
        <select value={type} onChange={(e) => setType(e.target.value as DeliverableType)} className="rounded-lg border border-border-strong bg-white px-3 py-2 text-sm">
          {DELIVERABLE_TYPES.map((t) => <option key={t} value={t}>{LABEL[t]}</option>)}
        </select>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title (optional)" className="rounded-lg border border-border-strong px-3 py-2 text-sm outline-none focus:border-green-600" />
      </div>
      <label className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-3 text-sm font-semibold ${pending ? 'border-border text-muted' : 'border-navy-100 bg-navy-100/40 text-navy-900 hover:border-navy-700'}`}>
        <input type="file" className="sr-only" accept="application/pdf,image/jpeg,image/png,.xlsx,.zip,.json" disabled={pending} onChange={(e) => onFile(e.target.files?.[0] ?? null)} />
        {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileUp className="h-4 w-4" />} {pending ? 'Uploading' : `Upload ${LABEL[type].toLowerCase()}`}
      </label>
      {msg && <p className="text-xs text-text-2">{msg}</p>}
      <p className="text-[11px] text-muted">A draft moves the engagement to Draft shared and emails the client to approve. An acknowledgement marks it filed.</p>
    </div>
  )
}

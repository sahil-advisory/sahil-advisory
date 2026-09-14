import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, FileText, MessageCircle, Download, Check, AlertCircle } from 'lucide-react'
import { requireUser } from '@/app/lib/auth-guard'
import { getEngagement } from '@/app/lib/engagements/queries'
import { CLIENT_STEPS, stepIndex } from '@/app/lib/engagements/status'
import { formatDateIN, daysUntil } from '@/app/lib/format'
import { whatsappLink } from '@/app/lib/site'
import { EngagementBadge, RequirementBadge, when, bytes } from '@/app/components/portal/badges'
import { DocArt } from '@/app/components/PlanDetails'
import Uploader from '@/app/components/portal/Uploader'
import { ConsentToggle, DraftApproval } from './ClientControls'

export const dynamic = 'force-dynamic'

export default async function ClientEngagement({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireUser()
  const { id } = await params
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound()
  const e = await getEngagement(id, user)
  if (!e) notFound()
  const step = stepIndex(e.status)
  const days = e.dueAt ? daysUntil(e.dueAt) : null
  const order = { rejected: 0, needed: 1, consent_given: 2, received: 3, verified: 4, fetched: 4, waived: 5 } as const
  const reqs = [...e.requirements].sort((a, b) => (order[a.status] - order[b.status]) || a.sort - b.sort)
  const openCount = reqs.filter((r) => r.required && (r.status === 'needed' || r.status === 'rejected')).length
  const latestDraft = e.deliverables.find((d) => (d.type === 'draft' || d.type === 'computation') && !d.approvedAt)
  const wa = whatsappLink(`Hi, this is ${user.name ?? ''} about my ${e.service?.name ?? 'filing'} (${e.periodLabel}).`)

  return (
    <div className="space-y-6">
      <Link href="/dashboard" className="inline-flex items-center gap-1 text-sm font-semibold text-text-2 hover:text-navy-900"><ArrowLeft className="h-4 w-4" /> My filings</Link>

      <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-navy-900 sm:text-2xl">{e.service?.name ?? e.serviceSlug}</h1>
            <p className="mt-0.5 text-sm text-text-2">{e.periodLabel}{e.dueAt ? ` · due ${formatDateIN(e.dueAt)}` : ''}{days !== null && days <= 14 ? <span className="font-semibold text-red-600"> · {days} days left</span> : null}</p>
          </div>
          <EngagementBadge status={e.status} client />
        </div>
        {e.status === 'on_hold' && <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">On hold{e.holdReason ? `: ${e.holdReason}` : ''}. Your expert will be in touch.</p>}

        <ol className="mt-5 grid grid-cols-4 gap-1">
          {CLIENT_STEPS.map((s, i) => (
            <li key={s.key} className="text-center">
              <div className={`h-1.5 rounded-full ${i < step ? 'bg-green-600' : i === step ? 'bg-navy-900' : 'bg-navy-100'}`} />
              <p className={`mt-1.5 text-[11px] font-semibold ${i === step ? 'text-navy-900' : i < step ? 'text-green-700' : 'text-muted'}`}>{s.label}</p>
            </li>
          ))}
        </ol>

        <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
          {e.expert && <span className="flex items-center gap-2 text-text-2"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-900 text-xs font-bold text-white">{(e.expert.name ?? 'E').replace(/^(CMA|CA|CS)\s+/, '').split(' ').map((w) => w[0]).join('').slice(0, 2)}</span>Your expert: <strong className="text-navy-900">{e.expert.name ?? 'assigned'}</strong></span>}
          <a href={wa} target="_blank" rel="noopener noreferrer" className="ml-auto inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-3 py-2 text-sm font-semibold text-white hover:opacity-90"><MessageCircle className="h-4 w-4" /> WhatsApp your expert</a>
        </div>
      </section>

      {latestDraft && (
        <section id="draft" className="rounded-2xl border border-border bg-card p-5 sm:p-6">
          <h2 className="text-base font-bold text-navy-900">Your draft is ready</h2>
          <p className="mt-1 text-sm text-text-2">Open it, check the income, deductions and tax, then approve or ask for changes.</p>
          <a href={`/api/portal/deliverables/${latestDraft.id}`} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 rounded-lg border border-border-strong bg-white px-4 py-2.5 text-sm font-semibold text-navy-900 hover:bg-bg-alt"><FileText className="h-4 w-4 text-green-600" /> Open {latestDraft.title}{latestDraft.version > 1 ? ` (v${latestDraft.version})` : ''}</a>
          {e.status === 'draft_shared' && <DraftApproval engagementId={e.id} deliverableId={latestDraft.id} />}
        </section>
      )}

      <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-navy-900">Your checklist</h2>
            <p className="text-sm text-text-2">{openCount === 0 ? 'Nothing more to send.' : `${openCount} to send. A clear photo from your phone is enough for most.`}</p>
          </div>
          <span className="font-mono text-sm text-muted">{e.progress.done}/{e.progress.total}</span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-bg-alt"><div className="h-full rounded-full bg-green-600 transition-[width]" style={{ width: `${e.progress.pct}%` }} /></div>

        <ol className="mt-5 space-y-3">
          {reqs.map((r) => {
            const latest = r.files[0]
            const open = r.status === 'needed' || r.status === 'rejected'
            return (
              <li key={r.id} id={`req-${r.id}`} className={`rounded-2xl border p-4 ${r.status === 'rejected' ? 'border-red-200 bg-red-50/40' : r.status === 'verified' || r.status === 'fetched' || r.status === 'waived' ? 'border-border bg-bg-alt/50' : 'border-border bg-white'}`}>
                <div className="flex items-start gap-3">
                  <span className="shrink-0 rounded-xl bg-bg-alt p-1"><DocArt kind={r.kind} /></span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <p className="font-semibold text-navy-900">{r.label}{!r.required && <span className="ml-2 text-[11px] font-normal text-muted">optional</span>}</p>
                      <RequirementBadge status={r.status} />
                    </div>
                    {r.help && open && <p className="mt-1 text-xs leading-relaxed text-text-2">{r.help}</p>}
                    {r.status === 'rejected' && r.rejectReason && <p className="mt-2 flex items-start gap-1.5 text-sm text-red-600"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {r.rejectReason}</p>}
                    {r.status === 'waived' && <p className="mt-1 text-xs text-muted">Your expert confirmed this is not needed{r.waivedReason ? `: ${r.waivedReason}` : '.'}</p>}
                    {latest && (
                      <p className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted">
                        <Check className="h-3.5 w-3.5 text-green-600" />
                        <a href={`/api/portal/files/${latest.id}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-navy-900 hover:text-green-700">{latest.originalName}</a>
                        <span>{bytes(latest.size)} · {when(latest.createdAt)}{r.files.length > 1 ? ` · ${r.files.length} files` : ''}</span>
                      </p>
                    )}
                    {r.fetchable && r.status === 'needed' && <ConsentToggle engagementId={e.id} requirementId={r.id} label={r.label} />}
                    {(open || r.status === 'received') && <Uploader engagementId={e.id} requirementId={r.id} compact={r.status === 'received'} label={r.status === 'received' ? 'Add another file' : r.status === 'rejected' ? 'Upload a new copy' : undefined} />}
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
        <p className="mt-4 text-xs text-muted">Something on the list does not apply to you? Tell your expert on WhatsApp and it will be marked as not needed.</p>
      </section>

      {e.deliverables.length > 0 && (
        <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
          <h2 className="text-base font-bold text-navy-900">Documents from us</h2>
          <ul className="mt-3 divide-y divide-border">
            {e.deliverables.map((d) => (
              <li key={d.id} className="flex flex-wrap items-center gap-3 py-2.5 text-sm">
                <FileText className="h-4 w-4 text-green-600" />
                <a href={`/api/portal/deliverables/${d.id}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-navy-900 hover:text-green-700">{d.title}</a>
                <span className="text-xs text-muted">{when(d.createdAt)}{d.approvedAt ? ' · approved by you' : ''}</span>
                <a href={`/api/portal/deliverables/${d.id}?dl=1`} className="ml-auto inline-flex items-center gap-1 text-xs text-muted hover:text-navy-900"><Download className="h-3.5 w-3.5" /> Download</a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
        <h2 className="text-base font-bold text-navy-900">Timeline</h2>
        <ol className="mt-4 space-y-3 border-l border-border pl-4">
          {e.events.map((ev) => (
            <li key={ev.id} className="relative text-sm">
              <span className={`absolute -left-[21px] top-1.5 h-2 w-2 rounded-full ring-4 ring-white ${ev.actorRole === 'client' ? 'bg-navy-900' : 'bg-green-600'}`} />
              <p className="text-navy-900">{ev.summary}</p>
              <p className="text-xs text-muted">{when(ev.createdAt)}</p>
            </li>
          ))}
        </ol>
      </section>

      <p className="text-center text-xs text-muted">Your documents are encrypted at rest and visible only to your assigned expert. Every view is logged.</p>
    </div>
  )
}

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Phone, MessageCircle, Mail, ExternalLink, FileText, Download } from 'lucide-react'
import { requireStaff } from '@/app/lib/auth-guard'
import { getEngagement, listStaff } from '@/app/lib/engagements/queries'
import { formatDateIN, daysUntil, formatINR } from '@/app/lib/format'
import { checklistFor } from '@/app/lib/checklists'
import { EngagementBadge, RequirementBadge, when, bytes } from '@/app/components/portal/badges'
import Uploader from '@/app/components/portal/Uploader'
import { RequirementControls, AddRequirement, StatusControls, Notes } from './ReviewControls'
import { DeliverableUploader } from './DeliverableUploader'

export const dynamic = 'force-dynamic'

export default async function EngagementReview({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ created?: string }> }) {
  const user = await requireStaff()
  const { id } = await params
  const sp = await searchParams
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound()
  const [e, staff] = await Promise.all([getEngagement(id, user), listStaff()])
  if (!e) notFound()
  const days = e.dueAt ? daysUntil(e.dueAt) : null
  const intakeQs = checklistFor(e.serviceSlug)?.intake ?? []
  const toCheck = e.requirements.filter((r) => r.status === 'received')
  const rest = e.requirements.filter((r) => r.status !== 'received')

  return (
    <div className="space-y-6">
      <Link href="/admin/engagements" className="inline-flex items-center gap-1 text-sm font-semibold text-text-2 hover:text-navy-900"><ArrowLeft className="h-4 w-4" /> All engagements</Link>
      {sp.created && <p className="rounded-xl border border-green-100 bg-green-50 px-4 py-3 text-sm text-green-800">Engagement created. The client has been emailed their checklist and a sign-in link.</p>}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-border bg-card p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-green-700">{e.service?.name ?? e.serviceSlug} · {e.periodLabel}</p>
                <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-navy-900">{e.client?.name ?? e.client?.email}</h1>
                <p className="mt-1 font-mono text-sm text-text-2">{e.client?.phone ? `+91 ${e.client.phone} · ` : ''}{e.client?.email}</p>
                <p className="mt-1 text-xs text-muted">
                  Created {when(e.createdAt)}{e.expert ? ` · Expert ${e.expert.name ?? e.expert.email}` : ' · No expert assigned'}{e.priceQuoted ? ` · ${formatINR(e.priceQuoted)} quoted` : ''}
                  {e.dueAt && <span className={days !== null && days <= 7 ? ' font-bold text-red-600' : ''}> · Due {formatDateIN(e.dueAt)} ({days}d)</span>}
                </p>
              </div>
              <EngagementBadge status={e.status} />
            </div>
            {e.status === 'on_hold' && e.holdReason && <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">On hold: {e.holdReason}</p>}
            <div className="mt-5 flex flex-wrap gap-2">
              {e.client?.phone && <a href={`tel:+91${e.client.phone}`} className="inline-flex items-center gap-2 rounded-lg bg-navy-900 px-3 py-2 text-sm font-semibold text-white hover:bg-navy-800"><Phone className="h-4 w-4" /> Call</a>}
              {e.client?.phone && <a href={`https://wa.me/91${e.client.phone}?text=${encodeURIComponent(`Hi ${(e.client.name ?? '').split(' ')[0]}, this is Sahil Advisory about your ${e.service?.name ?? 'filing'}.`)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-3 py-2 text-sm font-semibold text-white hover:opacity-90"><MessageCircle className="h-4 w-4" /> WhatsApp</a>}
              {e.client?.email && <a href={`mailto:${e.client.email}`} className="inline-flex items-center gap-2 rounded-lg border border-border-strong bg-white px-3 py-2 text-sm font-semibold text-navy-900 hover:bg-bg-alt"><Mail className="h-4 w-4" /> Email</a>}
              <Link href={`/dashboard/${e.id}`} className="inline-flex items-center gap-2 rounded-lg border border-border-strong bg-white px-3 py-2 text-sm font-semibold text-navy-900 hover:bg-bg-alt"><ExternalLink className="h-4 w-4" /> View as client</Link>
            </div>
            <div className="mt-5">
              <StatusControls engagementId={e.id} status={e.status} isAdmin={user.role === 'admin'} expertId={e.assignedExpertId} staff={staff} />
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-bold text-navy-900">Checklist</h2>
                <p className="text-xs text-muted">{e.progress.done} of {e.progress.total} required items done{toCheck.length ? ` · ${toCheck.length} waiting for your check` : ''}</p>
              </div>
              <AddRequirement engagementId={e.id} />
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-bg-alt"><div className="h-full rounded-full bg-green-600 transition-[width]" style={{ width: `${e.progress.pct}%` }} /></div>
            <ol className="mt-5 divide-y divide-border">
              {[...toCheck, ...rest].map((r) => (
                <li key={r.id} id={`req-${r.id}`} className="py-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-semibold text-navy-900">{r.label}{!r.required && <span className="ml-2 text-[11px] font-normal text-muted">optional</span>}{r.fetchable && <span className="ml-2 rounded bg-green-50 px-1 text-[10px] font-bold text-green-700">FETCHABLE</span>}</p>
                      {r.help && <p className="mt-0.5 text-xs text-muted">{r.help}</p>}
                      {r.rejectReason && r.status === 'rejected' && <p className="mt-1 text-xs text-red-600">Sent back: {r.rejectReason}</p>}
                      {r.waivedReason && <p className="mt-1 text-xs text-muted">Waived: {r.waivedReason}</p>}
                      {r.consentAt && <p className="mt-1 text-xs text-green-700">Consent given {when(r.consentAt)}</p>}
                    </div>
                    <RequirementBadge status={r.status} />
                  </div>
                  {r.files.length > 0 && (
                    <ul className="mt-3 space-y-1">
                      {r.files.map((f) => (
                        <li key={f.id} className="flex flex-wrap items-center gap-2 rounded-lg bg-bg-alt px-3 py-2 text-xs">
                          <FileText className="h-3.5 w-3.5 text-green-600" />
                          <a href={`/api/portal/files/${f.id}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-navy-900 hover:text-green-700">{f.originalName}</a>
                          <span className="text-muted">v{f.version} · {bytes(f.size)} · {when(f.createdAt)}{f.source !== 'portal' ? ` · ${f.source}` : ''}</span>
                          <a href={`/api/portal/files/${f.id}?dl=1`} className="ml-auto inline-flex items-center gap-1 text-muted hover:text-navy-900"><Download className="h-3.5 w-3.5" /> Download</a>
                        </li>
                      ))}
                    </ul>
                  )}
                  <RequirementControls engagementId={e.id} requirementId={r.id} status={r.status} fetchable={r.fetchable} />
                  {(r.status === 'needed' || r.status === 'rejected' || r.status === 'received') && (
                    <details className="mt-2">
                      <summary className="cursor-pointer text-xs text-muted hover:text-navy-900">Upload on the client&apos;s behalf (received on WhatsApp or email)</summary>
                      <div className="mt-2 max-w-sm"><Uploader engagementId={e.id} requirementId={r.id} source="whatsapp" compact label="Attach file received elsewhere" /></div>
                    </details>
                  )}
                </li>
              ))}
            </ol>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-sm font-bold text-navy-900">Deliverables</h2>
            {e.deliverables.length > 0 && (
              <ul className="mt-3 space-y-1">
                {e.deliverables.map((d) => (
                  <li key={d.id} className="flex flex-wrap items-center gap-2 rounded-lg bg-bg-alt px-3 py-2 text-xs">
                    <FileText className="h-3.5 w-3.5 text-navy-700" />
                    <a href={`/api/portal/deliverables/${d.id}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-navy-900 hover:text-green-700">{d.title}</a>
                    <span className="text-muted">{d.type} v{d.version} · {when(d.createdAt)}</span>
                    {d.approvedAt && <span className="rounded bg-green-50 px-1.5 py-0.5 font-bold text-green-700">Approved {when(d.approvedAt)}</span>}
                    {d.clientComment && <span className="w-full text-text-2">Client: “{d.clientComment}”</span>}
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-4"><DeliverableUploader engagementId={e.id} /></div>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-sm font-bold text-navy-900">Internal notes</h2>
            <div className="mt-3"><Notes engagementId={e.id} initial={e.notesInternal ?? ''} /></div>
          </section>

          {intakeQs.length > 0 && (
            <section className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-sm font-bold text-navy-900">Intake answers</h2>
              <dl className="mt-3 space-y-2 text-sm">
                {intakeQs.map((q) => {
                  const a = e.intake?.[q.id]
                  const label = a === undefined ? 'Not answered' : typeof a === 'boolean' ? (a ? 'Yes' : 'No') : q.options?.find((o) => o.value === a)?.label ?? String(a)
                  return (
                    <div key={q.id} className="grid grid-cols-[1fr_auto] gap-3">
                      <dt className="text-text-2">{q.label}</dt>
                      <dd className={`font-semibold ${a === undefined ? 'text-muted' : 'text-navy-900'}`}>{label}</dd>
                    </div>
                  )
                })}
              </dl>
            </section>
          )}

          <section className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-sm font-bold text-navy-900">Timeline</h2>
            <ol className="mt-4 space-y-3 border-l border-border pl-4">
              {e.events.map((ev) => (
                <li key={ev.id} className="relative text-sm">
                  <span className={`absolute -left-[21px] top-1.5 h-2 w-2 rounded-full ring-4 ring-white ${ev.actorRole === 'client' ? 'bg-navy-900' : ev.actorRole === 'system' ? 'bg-border-strong' : 'bg-green-600'}`} />
                  <p className="text-navy-900">{ev.summary}{!ev.visibleToClient && <span className="ml-1 text-[10px] uppercase tracking-wider text-muted">internal</span>}</p>
                  <p className="text-xs text-muted">{when(ev.createdAt)}{ev.actorName ? ` · ${ev.actorName}` : ev.actorRole === 'system' ? ' · automatic' : ''}</p>
                </li>
              ))}
            </ol>
          </section>
        </aside>
      </div>
    </div>
  )
}

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Phone, MessageCircle, Mail, CheckCircle2, XCircle, MinusCircle, FolderPlus } from 'lucide-react'
import { getLead, listAdmins } from '@/app/lib/leads/queries'
import { LEAD_STATUSES } from '@/app/lib/db'
import { formatDateIN } from '@/app/lib/format'
import { whatsappLink } from '@/app/lib/site'
import { StatusBadge } from '../StatusBadge'
import { LeadControls } from './LeadControls'

function when(d: Date) {
  return d.toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' })
}

export default async function LeadDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound()
  const [data, admins] = await Promise.all([getLead(id), listAdmins()])
  if (!data) notFound()
  const { lead, activities, notifications, owner } = data
  const wa = whatsappLink(`Hi ${lead.name.split(' ')[0]}, this is ${'Sahil Advisory'}. You asked us to call about ${lead.service ?? 'your tax query'}.`).replace(/^https:\/\/wa\.me\/\d+/, `https://wa.me/91${lead.phone}`)

  return (
    <div className="space-y-6">
      <Link href="/admin/leads" className="inline-flex items-center gap-1 text-sm font-semibold text-text-2 hover:text-navy-900"><ArrowLeft className="h-4 w-4" /> All leads</Link>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-border bg-card p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight text-navy-900">{lead.name}</h1>
                <p className="mt-1 font-mono text-sm text-text-2">+91 {lead.phone}{lead.email ? ` · ${lead.email}` : ''}</p>
                <p className="mt-1 text-xs text-muted">Received {when(lead.createdAt)} · {lead.service ?? 'General enquiry'}{lead.detail ? ` · ${lead.detail}` : ''}</p>
              </div>
              <StatusBadge status={lead.status} />
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <a href={`tel:+91${lead.phone}`} className="inline-flex items-center gap-2 rounded-lg bg-navy-900 px-4 py-2 text-sm font-semibold text-white hover:bg-navy-800"><Phone className="h-4 w-4" /> Call</a>
              <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
              {lead.email && <a href={`mailto:${lead.email}`} className="inline-flex items-center gap-2 rounded-lg border border-border-strong bg-white px-4 py-2 text-sm font-semibold text-navy-900 hover:bg-bg-alt"><Mail className="h-4 w-4" /> Email</a>}
              {lead.convertedTo ? (
                <Link href={`/admin/engagements/${lead.convertedTo}`} className="inline-flex items-center gap-2 rounded-lg bg-green-50 px-4 py-2 text-sm font-semibold text-green-700 hover:bg-green-100"><FolderPlus className="h-4 w-4" /> Open engagement</Link>
              ) : (
                <Link href={`/admin/engagements/new?lead=${lead.id}`} className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"><FolderPlus className="h-4 w-4" /> Create engagement</Link>
              )}
            </div>
            {lead.message && (
              <blockquote className="mt-5 rounded-xl bg-bg-alt p-4 text-sm leading-relaxed text-text-2">“{lead.message}”</blockquote>
            )}
          </section>

          <section className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-sm font-bold text-navy-900">Activity</h2>
            <LeadControls leadId={lead.id} status={lead.status} statuses={LEAD_STATUSES} ownerId={lead.ownerId} admins={admins} />
            <ol className="mt-6 space-y-4 border-l border-border pl-5">
              {activities.length === 0 && <li className="text-sm text-muted">No activity yet. Log your first call above.</li>}
              {activities.map((a) => (
                <li key={a.id} className="relative">
                  <span className="absolute -left-[26px] top-1.5 h-2.5 w-2.5 rounded-full bg-green-600 ring-4 ring-white" />
                  <p className="text-sm text-navy-900">
                    {a.type === 'status_change' ? (
                      <>Status <StatusBadge status={a.fromStatus ?? 'new'} /> → <StatusBadge status={a.toStatus ?? 'new'} /></>
                    ) : a.type === 'assigned' ? (
                      <>{a.body}</>
                    ) : (
                      <><span className="font-semibold capitalize">{a.type}</span>: {a.body}</>
                    )}
                  </p>
                  <p className="mt-0.5 text-xs text-muted">{a.actorName ?? a.actorEmail ?? 'System'} · {when(a.createdAt)}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-2xl border border-border bg-card p-5">
            <h2 className="text-sm font-bold text-navy-900">Where it came from</h2>
            <dl className="mt-3 space-y-2 text-sm">
              <div><dt className="text-xs text-muted">Page</dt><dd className="break-all text-text-2">{lead.sourceUrl ? <a href={lead.sourceUrl} className="hover:underline" target="_blank" rel="noopener noreferrer">{lead.sourceUrl.replace(/^https?:\/\/[^/]+/, '') || '/'}</a> : '-'}</dd></div>
              <div><dt className="text-xs text-muted">Referrer</dt><dd className="break-all text-text-2">{lead.referrer ?? 'direct'}</dd></div>
              {lead.utm && Object.keys(lead.utm).length > 0 && (
                <div><dt className="text-xs text-muted">Campaign</dt><dd className="font-mono text-xs text-text-2">{Object.entries(lead.utm).map(([k, v]) => `${k}=${v}`).join('\n')}</dd></div>
              )}
              <div><dt className="text-xs text-muted">Owner</dt><dd className="text-text-2">{owner?.name ?? owner?.email ?? 'Unassigned'}</dd></div>
            </dl>
          </section>

          <section className="rounded-2xl border border-border bg-card p-5">
            <h2 className="text-sm font-bold text-navy-900">Alerts sent</h2>
            <p className="mt-1 text-xs text-muted">Every attempt, with the reason when one failed.</p>
            <ul className="mt-3 space-y-2">
              {notifications.length === 0 && <li className="text-sm text-muted">No alert was recorded for this lead.</li>}
              {notifications.map((n) => (
                <li key={n.id} className="flex gap-2 text-sm">
                  {n.status === 'sent' ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" /> : n.status === 'failed' ? <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" /> : <MinusCircle className="mt-0.5 h-4 w-4 shrink-0 text-muted" />}
                  <span className="min-w-0">
                    <span className="block text-navy-900"><span className="capitalize">{n.channel}</span>{n.provider ? ` via ${n.provider}` : ''} to <span className="font-mono">{n.to}</span></span>
                    <span className="block text-xs text-muted">{n.status} · {when(n.createdAt)}</span>
                    {n.error && <span className="block break-words font-mono text-[11px] text-red-600">{n.error}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <p className="text-xs text-muted">Lead id <span className="font-mono">{lead.id}</span> · updated {formatDateIN(lead.updatedAt)}</p>
        </aside>
      </div>
    </div>
  )
}

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { leadStats, listLeads } from '@/app/lib/leads/queries'
import { LEAD_STATUSES } from '@/app/lib/db'
import { formatDateIN } from '@/app/lib/format'
import { StatusBadge } from './leads/StatusBadge'
import { engagementCounts, listEngagements } from '@/app/lib/engagements/queries'
import { EngagementBadge } from '@/app/components/portal/badges'

export default async function AdminOverview() {
  const [stats, recent, eCounts, toCheck] = await Promise.all([leadStats(), listLeads({ pageSize: 10 }), engagementCounts(), listEngagements({ status: 'open' })])
  const waiting = toCheck.rows.filter((r) => r.received > 0)
  const openEngagements = toCheck.total
  const newCount = stats.byStatus.new ?? 0
  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-navy-900">Overview</h1>
          <p className="mt-1 text-sm text-text-2">Leads across the site, last 30 days.</p>
        </div>
        <Link href="/admin/leads?status=new" className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700">
          {newCount} new lead{newCount === 1 ? '' : 's'} to call <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { k: 'Last 7 days', v: stats.last7 },
          { k: 'Last 30 days', v: stats.last30 },
          { k: 'Awaiting first call', v: newCount },
          { k: 'Converted (all time)', v: stats.byStatus.converted ?? 0 },
        ].map((s) => (
          <div key={s.k} className="rounded-2xl border border-border bg-card p-5">
            <dt className="text-xs font-semibold uppercase tracking-wider text-muted">{s.k}</dt>
            <dd className="mt-1 font-mono text-3xl font-bold tabular text-navy-900">{s.v}</dd>
          </div>
        ))}
      </dl>

      <section className="rounded-2xl border border-border bg-card p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-sm font-bold text-navy-900">Engagements</h2>
          <Link href="/admin/engagements" className="text-xs font-semibold text-green-700 hover:underline">{openEngagements} open <ArrowRight className="inline h-3 w-3" /></Link>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {Object.entries(eCounts).map(([st, n]) => (
            <Link key={st} href={`/admin/engagements?status=${st}`} className="inline-flex items-center gap-2 rounded-lg border border-border px-2 py-1 text-xs hover:bg-bg-alt"><EngagementBadge status={st as never} /><span className="font-mono tabular text-navy-900">{n}</span></Link>
          ))}
          {Object.keys(eCounts).length === 0 && <p className="text-sm text-muted">No engagements yet. Open one from a lead.</p>}
        </div>
        {waiting.length > 0 && (
          <ul className="mt-4 divide-y divide-border text-sm">
            {waiting.slice(0, 6).map((r) => (
              <li key={r.id} className="flex items-center justify-between py-2">
                <Link href={`/admin/engagements/${r.id}`} className="font-semibold text-navy-900 hover:text-green-700">{r.clientName ?? r.clientEmail} · {r.service?.name ?? r.serviceSlug}</Link>
                <span className="rounded-md bg-navy-100 px-1.5 py-0.5 font-mono text-xs font-bold text-navy-900">{r.received} to check</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="rounded-2xl border border-border bg-card p-5">
          <h2 className="text-sm font-bold text-navy-900">Pipeline</h2>
          <ul className="mt-3 space-y-2">
            {LEAD_STATUSES.map((s) => (
              <li key={s}>
                <Link href={`/admin/leads?status=${s}`} className="flex items-center justify-between rounded-lg px-2 py-1.5 text-sm hover:bg-bg-alt">
                  <StatusBadge status={s} />
                  <span className="font-mono tabular text-navy-900">{stats.byStatus[s] ?? 0}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-2xl border border-border bg-card p-5">
          <h2 className="text-sm font-bold text-navy-900">By service, 30 days</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {stats.topServices.length === 0 && <li className="text-muted">No leads yet.</li>}
            {stats.topServices.map((r) => (
              <li key={r.service ?? '-'} className="flex items-center justify-between"><span className="text-text-2">{r.service ?? 'General'}</span><span className="font-mono tabular text-navy-900">{r.n}</span></li>
            ))}
          </ul>
        </section>
        <section className="rounded-2xl border border-border bg-card p-5">
          <h2 className="text-sm font-bold text-navy-900">By source, 30 days</h2>
          <p className="mt-1 text-xs text-muted">From utm_source on the page the form was on.</p>
          <ul className="mt-3 space-y-2 text-sm">
            {stats.topSources.length === 0 && <li className="text-muted">No leads yet.</li>}
            {stats.topSources.map((r) => (
              <li key={r.source} className="flex items-center justify-between"><span className="text-text-2">{r.source}</span><span className="font-mono tabular text-navy-900">{r.n}</span></li>
            ))}
          </ul>
        </section>
      </div>

      <section className="rounded-2xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-5 py-3">
          <h2 className="text-sm font-bold text-navy-900">Latest leads</h2>
          <Link href="/admin/leads" className="text-sm font-semibold text-green-700 hover:underline">All leads</Link>
        </div>
        <ul className="divide-y divide-border">
          {recent.rows.length === 0 && <li className="px-5 py-6 text-sm text-muted">Nothing yet. Leads appear here the moment a form is submitted.</li>}
          {recent.rows.map((l) => (
            <li key={l.id}>
              <Link href={`/admin/leads/${l.id}`} className="flex items-center justify-between gap-4 px-5 py-3 hover:bg-bg-alt">
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-navy-900">{l.name} <span className="font-mono font-normal text-text-2">+91 {l.phone}</span></span>
                  <span className="block truncate text-xs text-muted">{l.service ?? 'General'}{l.detail ? ` · ${l.detail}` : ''}</span>
                </span>
                <span className="flex shrink-0 items-center gap-3 text-xs text-muted">
                  <StatusBadge status={l.status} />
                  {formatDateIN(l.createdAt)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

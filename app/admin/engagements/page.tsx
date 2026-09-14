import Link from 'next/link'
import { Plus } from 'lucide-react'
import { requireStaff } from '@/app/lib/auth-guard'
import { listEngagements, engagementCounts } from '@/app/lib/engagements/queries'
import { ENGAGEMENT_STATUSES, type EngagementStatus } from '@/app/lib/db'
import { STATUS_LABEL } from '@/app/lib/engagements/status'
import { formatDateIN, daysUntil } from '@/app/lib/format'
import { EngagementBadge, when } from '@/app/components/portal/badges'

export const dynamic = 'force-dynamic'

export default async function EngagementsPage({ searchParams }: { searchParams: Promise<{ status?: string; q?: string }> }) {
  const user = await requireStaff()
  const sp = await searchParams
  const status = (sp.status as EngagementStatus | 'all' | 'open') || 'open'
  const [{ rows, total }, counts] = await Promise.all([
    listEngagements({ status, q: sp.q, expertId: user.role === 'expert' ? user.id : undefined }),
    engagementCounts(),
  ])
  const tabs: { key: string; label: string; n?: number }[] = [
    { key: 'open', label: 'Open' },
    ...ENGAGEMENT_STATUSES.map((s) => ({ key: s, label: STATUS_LABEL[s].label, n: counts[s] ?? 0 })),
    { key: 'all', label: 'All' },
  ]
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-navy-900">Engagements</h1>
          <p className="mt-1 text-sm text-text-2">{total} {status === 'open' ? 'open' : status === 'all' ? 'in total' : STATUS_LABEL[status as EngagementStatus]?.label.toLowerCase()}</p>
        </div>
        {user.role === 'admin' && (
          <Link href="/admin/engagements/new" className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700"><Plus className="h-4 w-4" /> New engagement</Link>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {tabs.map((t) => (
          <Link key={t.key} href={`/admin/engagements?status=${t.key}${sp.q ? `&q=${encodeURIComponent(sp.q)}` : ''}`} className={`rounded-full border px-3 py-1 text-xs font-semibold ${status === t.key ? 'border-navy-900 bg-navy-900 text-white' : 'border-border bg-white text-text-2 hover:border-navy-700'}`}>
            {t.label}{t.n !== undefined && t.n > 0 ? <span className="ml-1 opacity-70">{t.n}</span> : null}
          </Link>
        ))}
        <form className="ml-auto" action="/admin/engagements">
          <input type="hidden" name="status" value={status} />
          <input name="q" defaultValue={sp.q ?? ''} placeholder="Search name, phone, email" className="w-56 rounded-lg border border-border-strong px-3 py-1.5 text-sm outline-none focus:border-green-600" />
        </form>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full min-w-[820px] text-sm">
          <thead className="bg-bg-alt text-left text-[11px] font-bold uppercase tracking-wider text-muted">
            <tr>
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Documents</th>
              <th className="px-4 py-3">Due</th>
              <th className="px-4 py-3">Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-10 text-center text-muted">Nothing here yet. Create an engagement from a lead, or with the button above.</td></tr>
            )}
            {rows.map((r) => {
              const days = r.dueAt ? daysUntil(r.dueAt) : null
              return (
                <tr key={r.id} className="hover:bg-bg-alt/60">
                  <td className="px-4 py-3">
                    <Link href={`/admin/engagements/${r.id}`} className="font-semibold text-navy-900 hover:text-green-700">{r.clientName ?? r.clientEmail}</Link>
                    <div className="font-mono text-xs text-muted">{r.clientPhone ? `+91 ${r.clientPhone}` : r.clientEmail}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-navy-900">{r.service?.name ?? r.serviceSlug}</div>
                    <div className="text-xs text-muted">{r.periodLabel}</div>
                  </td>
                  <td className="px-4 py-3"><EngagementBadge status={r.status} /></td>
                  <td className="px-4 py-3">
                    {r.received > 0 && <span className="mr-2 rounded-md bg-navy-100 px-1.5 py-0.5 font-mono text-xs font-bold text-navy-900">{r.received} to check</span>}
                    {r.needed > 0 ? <span className="font-mono text-xs text-gold-600">{r.needed} of {r.requiredTotal} needed</span> : <span className="font-mono text-xs text-green-700">complete</span>}
                  </td>
                  <td className={`px-4 py-3 font-mono text-xs ${days !== null && days <= 7 ? 'font-bold text-red-600' : 'text-text-2'}`}>{r.dueAt ? `${formatDateIN(r.dueAt)} · ${days}d` : '–'}</td>
                  <td className="px-4 py-3 text-xs text-muted">{when(r.updatedAt)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

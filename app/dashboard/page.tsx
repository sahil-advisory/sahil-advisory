import Link from 'next/link'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { requireUser } from '@/app/lib/auth-guard'
import { listClientEngagements } from '@/app/lib/engagements/queries'
import { STATUS_LABEL } from '@/app/lib/engagements/status'
import { formatDateIN, daysUntil } from '@/app/lib/format'
import { WHATSAPP_DEFAULT, SITE } from '@/app/lib/site'
import { EngagementBadge } from '@/app/components/portal/badges'

export const dynamic = 'force-dynamic'

function nextStep(e: { status: string; progress: { done: number; total: number } }) {
  const open = e.progress.total - e.progress.done
  if (e.status === 'collecting') return open > 0 ? `${open} document${open === 1 ? '' : 's'} to send` : 'All documents sent'
  if (e.status === 'draft_shared') return 'Draft ready for your approval'
  if (e.status === 'filed') return 'Filed. Check your e-verification'
  return STATUS_LABEL[e.status as keyof typeof STATUS_LABEL]?.client ?? ''
}

export default async function DashboardHome() {
  const user = await requireUser()
  const items = await listClientEngagements(user.id)
  return (
    <div className="space-y-6">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-green-700">{SITE.name}</p>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-navy-900">Hi {(user.name ?? '').split(' ')[0] || 'there'}</h1>
        <p className="mt-1 text-sm text-text-2">Everything we are filing for you, and what we need next.</p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-8 text-center">
          <p className="font-semibold text-navy-900">No filings yet</p>
          <p className="mt-1 text-sm text-text-2">When we open a filing for you, it appears here with a checklist. Want to start one now?</p>
          <a href={WHATSAPP_DEFAULT} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white"><MessageCircle className="h-4 w-4" /> WhatsApp us</a>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {items.map((e) => {
            const days = e.dueAt ? daysUntil(e.dueAt) : null
            const r = 22
            const c = 2 * Math.PI * r
            return (
              <li key={e.id}>
                <Link href={`/dashboard/${e.id}`} className="group flex h-full items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] transition-colors hover:border-green-600">
                  <svg viewBox="0 0 56 56" className="h-14 w-14 shrink-0 -rotate-90">
                    <circle cx="28" cy="28" r={r} fill="none" stroke="#ECFDF5" strokeWidth="6" />
                    <circle cx="28" cy="28" r={r} fill="none" stroke="#059669" strokeWidth="6" strokeLinecap="round" strokeDasharray={`${(e.progress.pct / 100) * c} ${c}`} />
                    <text x="28" y="28" transform="rotate(90 28 28)" textAnchor="middle" dominantBaseline="central" className="fill-navy-900 font-mono text-[11px] font-bold">{e.progress.done}/{e.progress.total}</text>
                  </svg>
                  <span className="min-w-0 flex-1">
                    <span className="block text-base font-bold text-navy-900 group-hover:text-green-700">{e.service?.name ?? e.serviceSlug}</span>
                    <span className="block text-xs text-muted">{e.periodLabel}{e.dueAt ? ` · due ${formatDateIN(e.dueAt)}${days !== null && days <= 14 ? ` (${days} days)` : ''}` : ''}</span>
                    <span className="mt-2 block"><EngagementBadge status={e.status} client /></span>
                    <span className="mt-2 flex items-center gap-1 text-sm font-semibold text-green-700">{nextStep(e)} <ArrowRight className="h-4 w-4" /></span>
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

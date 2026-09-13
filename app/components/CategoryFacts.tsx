import { CalendarClock, AlertTriangle, FileText, Zap, CheckCircle2, ShieldCheck, IndianRupee, Scale, type LucideIcon } from 'lucide-react'
import type { CategoryFact, CategoryFactIcon } from '@/app/lib/services'
import { getDeadline, nextDue } from '@/app/lib/due-dates'
import { formatDateIN } from '@/app/lib/format'

// The four things a visitor checks before choosing a plan: due date, cost
// of missing it, form, speed. Replaces the site-wide social-proof numbers
// on category pages so each page says something only it can say.

const ICONS: Record<CategoryFactIcon, LucideIcon> = {
  calendar: CalendarClock,
  fee: AlertTriangle,
  form: FileText,
  speed: Zap,
  check: CheckCircle2,
  shield: ShieldCheck,
  rupee: IndianRupee,
  scale: Scale,
}

export default function CategoryFacts({ facts }: { facts: CategoryFact[] }) {
  const now = new Date()
  const cells = facts.map((f) => {
    if (f.deadlineKey) {
      const d = getDeadline(f.deadlineKey)
      if (d) {
        const due = nextDue(d.rule, now)
        const days = Math.max(0, Math.ceil((due.getTime() - now.getTime()) / 86_400_000))
        return { label: f.label, value: formatDateIN(due), hint: days === 0 ? 'Due today' : `${days} days left`, icon: 'calendar' as const, urgent: days <= 7, live: true }
      }
    }
    return { label: f.label, value: f.value ?? '', hint: f.hint, icon: f.icon ?? ('check' as const), urgent: false, live: false }
  })

  return (
    <dl className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
      {cells.map((c) => {
        const Icon = ICONS[c.icon]
        return (
          <div key={c.label} className={`relative rounded-xl border bg-white/80 p-4 backdrop-blur-sm ${c.urgent ? 'border-red-200' : 'border-border'}`}>
            <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${c.urgent ? 'bg-red-50 text-red-600' : c.live ? 'bg-navy-900 text-white' : 'bg-green-50 text-green-700'}`}>
              <Icon className="h-4 w-4" aria-hidden />
            </span>
            <dt className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-muted">{c.label}</dt>
            <dd className="mt-1 text-base font-bold leading-snug tracking-tight text-navy-900">{c.value}</dd>
            {c.hint && <dd className={`mt-0.5 text-xs leading-snug ${c.urgent ? 'font-semibold text-red-600' : 'text-text-2'}`}>{c.hint}</dd>}
            {c.live && (
              <span className={`absolute right-3 top-3 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider ${c.urgent ? 'text-red-600' : 'text-green-700'}`}>
                <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${c.urgent ? 'bg-red-500' : 'bg-green-500'}`} /> Live
              </span>
            )}
          </div>
        )
      })}
    </dl>
  )
}

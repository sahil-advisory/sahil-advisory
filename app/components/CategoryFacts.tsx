import { CalendarClock } from 'lucide-react'
import type { CategoryFact } from '@/app/lib/services'
import { getDeadline, nextDue } from '@/app/lib/due-dates'
import { formatDateIN } from '@/app/lib/format'

// The four things a visitor checks before choosing a plan: due date, cost
// of missing it, form, speed. Replaces the site-wide social-proof numbers
// on category pages so each page says something only it can say.
export default function CategoryFacts({ facts }: { facts: CategoryFact[] }) {
  const now = new Date()
  const cells = facts.map((f) => {
    if (f.deadlineKey) {
      const d = getDeadline(f.deadlineKey)
      if (d) {
        const due = nextDue(d.rule, now)
        const days = Math.max(0, Math.ceil((due.getTime() - now.getTime()) / 86_400_000))
        return { label: f.label, value: formatDateIN(due), hint: days === 0 ? 'Due today' : `${days} days left`, urgent: days <= 7, live: true }
      }
    }
    return { label: f.label, value: f.value ?? '', hint: f.hint, urgent: false, live: false }
  })

  return (
    <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-border pt-6 sm:grid-cols-4">
      {cells.map((c) => (
        <div key={c.label}>
          <dt className="flex items-center gap-1.5 text-xs text-muted">
            {c.live && <CalendarClock className="h-3.5 w-3.5 text-green-600" aria-hidden />}
            {c.label}
          </dt>
          <dd className="mt-1 font-mono text-lg font-bold leading-tight tabular text-navy-900">{c.value}</dd>
          {c.hint && <dd className={`mt-0.5 text-xs ${c.urgent ? 'font-semibold text-red-600' : 'text-text-2'}`}>{c.hint}</dd>}
        </div>
      ))}
    </dl>
  )
}

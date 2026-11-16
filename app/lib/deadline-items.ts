import { DEADLINES, nextDueFor } from './due-dates'
import type { DeadlineItem } from '@/app/components/DeadlineWidget'

// Server helper: turn registry keys into serialisable widget items.
export function deadlineItems(keys: string[]): DeadlineItem[] {
  const now = new Date()
  return keys
    .map((k) => DEADLINES.find((d) => d.key === k))
    .filter((d): d is NonNullable<typeof d> => Boolean(d))
    .map((d) => ({ key: d.key, label: d.shortLabel, slug: d.slug, dueIso: nextDueFor(d, now).toISOString() }))
}

export function upcomingDeadlines(limit = 4): DeadlineItem[] {
  const now = new Date()
  return DEADLINES.map((d) => ({ key: d.key, label: d.shortLabel, slug: d.slug, dueIso: nextDueFor(d, now).toISOString() }))
    .sort((a, b) => a.dueIso.localeCompare(b.dueIso))
    .slice(0, limit)
}

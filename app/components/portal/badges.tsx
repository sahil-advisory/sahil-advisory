import type { EngagementStatus, RequirementStatus } from '@/app/lib/db'
import { STATUS_LABEL, REQ_LABEL } from '@/app/lib/engagements/status'

const TONE: Record<'muted' | 'navy' | 'green' | 'gold' | 'red', string> = {
  muted: 'bg-bg-alt text-muted border-border',
  navy: 'bg-navy-100 text-navy-900 border-navy-100',
  green: 'bg-green-50 text-green-700 border-green-100',
  gold: 'bg-gold-50 text-gold-600 border-amber-200',
  red: 'bg-red-50 text-red-600 border-red-100',
}

export function EngagementBadge({ status, client }: { status: EngagementStatus; client?: boolean }) {
  const s = STATUS_LABEL[status]
  return <span className={`inline-flex rounded-md border px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider ${TONE[s.tone]}`}>{client ? s.client : s.label}</span>
}

export function RequirementBadge({ status }: { status: RequirementStatus }) {
  const s = REQ_LABEL[status]
  return <span className={`inline-flex whitespace-nowrap rounded-md border px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider ${TONE[s.tone]}`}>{s.label}</span>
}

export function when(d: Date | string) {
  return new Date(d).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' })
}

export function bytes(n: number) {
  if (n < 1024) return `${n} B`
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`
  return `${(n / 1024 / 1024).toFixed(1)} MB`
}

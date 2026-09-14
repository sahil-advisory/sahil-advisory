import type { EngagementStatus, RequirementStatus } from '@/app/lib/db/schema'

// Labels and allowed transitions. The machine is deliberately small: most
// moves happen automatically (checklist complete, draft uploaded, client
// approves) and the manual ones are what a team member can do by hand.

export const STATUS_LABEL: Record<EngagementStatus, { label: string; client: string; tone: 'muted' | 'navy' | 'green' | 'gold' | 'red' }> = {
  collecting: { label: 'Collecting documents', client: 'We need a few documents from you', tone: 'gold' },
  ready_for_review: { label: 'Ready for review', client: 'We have everything, your expert is reviewing', tone: 'navy' },
  in_preparation: { label: 'In preparation', client: 'Your expert is preparing the return', tone: 'navy' },
  draft_shared: { label: 'Draft shared', client: 'Draft ready for your approval', tone: 'gold' },
  approved: { label: 'Approved, filing', client: 'Approved. We are filing it now', tone: 'green' },
  filed: { label: 'Filed', client: 'Filed. Please e-verify', tone: 'green' },
  verified: { label: 'Verified', client: 'Filed and verified', tone: 'green' },
  closed: { label: 'Closed', client: 'Completed', tone: 'muted' },
  on_hold: { label: 'On hold', client: 'On hold', tone: 'red' },
}

// The stepper the client sees. On hold is shown as a banner, not a step.
export const CLIENT_STEPS: { key: string; label: string; statuses: EngagementStatus[] }[] = [
  { key: 'collect', label: 'Documents', statuses: ['collecting'] },
  { key: 'review', label: 'Review', statuses: ['ready_for_review', 'in_preparation'] },
  { key: 'draft', label: 'Your approval', statuses: ['draft_shared', 'approved'] },
  { key: 'filed', label: 'Filed', statuses: ['filed', 'verified', 'closed'] },
]

export function stepIndex(status: EngagementStatus) {
  const i = CLIENT_STEPS.findIndex((s) => s.statuses.includes(status))
  return i === -1 ? 0 : i
}

// Manual transitions a staff member may make. Automatic ones are applied by
// the actions themselves and are not listed here.
export const MANUAL_TRANSITIONS: Record<EngagementStatus, EngagementStatus[]> = {
  collecting: ['ready_for_review', 'on_hold'],
  ready_for_review: ['in_preparation', 'collecting', 'on_hold'],
  in_preparation: ['collecting', 'on_hold'],
  draft_shared: ['in_preparation', 'on_hold'],
  approved: ['filed', 'in_preparation'],
  filed: ['verified', 'closed'],
  verified: ['closed'],
  closed: ['verified'],
  on_hold: ['collecting', 'in_preparation'],
}

export const REQ_LABEL: Record<RequirementStatus, { label: string; tone: 'muted' | 'navy' | 'green' | 'gold' | 'red' }> = {
  needed: { label: 'Needed', tone: 'gold' },
  received: { label: 'Received, checking', tone: 'navy' },
  verified: { label: 'Verified', tone: 'green' },
  rejected: { label: 'Needs a new copy', tone: 'red' },
  waived: { label: 'Not needed', tone: 'muted' },
  consent_given: { label: 'Consent given, fetching', tone: 'navy' },
  fetched: { label: 'Fetched by us', tone: 'green' },
}

export const DONE_STATUSES: RequirementStatus[] = ['verified', 'waived', 'fetched']
export const OPEN_STATUSES: RequirementStatus[] = ['needed', 'rejected']

export function checklistComplete(reqs: { required: boolean; status: RequirementStatus }[]) {
  return reqs.filter((r) => r.required).every((r) => DONE_STATUSES.includes(r.status))
}

export function progress(reqs: { required: boolean; status: RequirementStatus }[]) {
  const required = reqs.filter((r) => r.required)
  const done = required.filter((r) => DONE_STATUSES.includes(r.status)).length
  return { done, total: required.length, pct: required.length ? Math.round((done / required.length) * 100) : 100 }
}

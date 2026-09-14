'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getSession } from '@/auth'
import { ENGAGEMENT_STATUSES, type EngagementStatus } from '@/app/lib/db'
import { checklistFor } from '@/app/lib/checklists'
import * as core from './core'

// Server actions are public endpoints. Each one resolves the session itself
// and hands the acting user to the core function, which checks access.

async function actor(): Promise<core.Actor> {
  const s = await getSession()
  if (!s?.user?.id) redirect('/login')
  return { id: s.user.id, role: s.user.role, name: s.user.name, email: s.user.email }
}

function refresh(engagementId: string) {
  revalidatePath('/admin/engagements')
  revalidatePath(`/admin/engagements/${engagementId}`)
  revalidatePath('/dashboard')
  revalidatePath(`/dashboard/${engagementId}`)
}

type Result = { ok: true; id?: string } | { ok: false; error: string }

async function run(fn: () => Promise<string | void>): Promise<Result> {
  try {
    const id = await fn()
    return { ok: true, ...(id ? { id } : {}) }
  } catch (err) {
    return { ok: false, error: (err as Error).message || 'Something went wrong' }
  }
}

// ── Admin ──────────────────────────────────────────────────────────────────

export async function createEngagementAction(formData: FormData): Promise<Result> {
  const a = await actor()
  const serviceSlug = String(formData.get('serviceSlug') || '')
  const checklist = checklistFor(serviceSlug)
  const intake: Record<string, string | boolean> = {}
  for (const q of checklist?.intake ?? []) {
    const v = formData.get(`intake.${q.id}`)
    if (v === null || v === '') continue
    intake[q.id] = q.type === 'boolean' ? v === 'yes' : String(v)
  }
  const price = formData.get('priceQuoted')
  const due = String(formData.get('dueAt') || '')
  const res = await run(() =>
    core.createEngagement(a, {
      client: { email: String(formData.get('email') || ''), name: String(formData.get('name') || ''), phone: String(formData.get('phone') || '') },
      serviceSlug,
      periodLabel: String(formData.get('periodLabel') || ''),
      intake,
      assignedExpertId: String(formData.get('assignedExpertId') || '') || null,
      leadId: String(formData.get('leadId') || '') || null,
      priceQuoted: price ? Number(price) : null,
      notesInternal: String(formData.get('notesInternal') || ''),
      dueAt: due ? new Date(`${due}T23:59:59+05:30`) : undefined,
    })
  )
  if (res.ok && res.id) {
    refresh(res.id)
    revalidatePath('/admin/leads')
    redirect(`/admin/engagements/${res.id}?created=1`)
  }
  return res
}

export async function setStatusAction(engagementId: string, next: string, reason?: string): Promise<Result> {
  const a = await actor()
  if (!(ENGAGEMENT_STATUSES as readonly string[]).includes(next)) return { ok: false, error: 'Unknown status' }
  const res = await run(() => core.setStatus(a, engagementId, next as EngagementStatus, reason))
  refresh(engagementId)
  return res
}

export async function assignExpertAction(engagementId: string, expertId: string | null): Promise<Result> {
  const a = await actor()
  const res = await run(() => core.assignExpert(a, engagementId, expertId))
  refresh(engagementId)
  return res
}

export async function updateNotesAction(engagementId: string, notes: string): Promise<Result> {
  const a = await actor()
  const res = await run(() => core.updateNotes(a, engagementId, notes))
  refresh(engagementId)
  return res
}

export async function verifyRequirementAction(engagementId: string, requirementId: string): Promise<Result> {
  const a = await actor()
  const res = await run(() => core.verifyRequirement(a, requirementId))
  refresh(engagementId)
  return res
}

export async function rejectRequirementAction(engagementId: string, requirementId: string, reason: string): Promise<Result> {
  const a = await actor()
  const res = await run(() => core.rejectRequirement(a, requirementId, reason))
  refresh(engagementId)
  return res
}

export async function waiveRequirementAction(engagementId: string, requirementId: string, reason: string): Promise<Result> {
  const a = await actor()
  const res = await run(() => core.waiveRequirement(a, requirementId, reason))
  refresh(engagementId)
  return res
}

export async function reopenRequirementAction(engagementId: string, requirementId: string): Promise<Result> {
  const a = await actor()
  const res = await run(() => core.reopenRequirement(a, requirementId))
  refresh(engagementId)
  return res
}

export async function markFetchedAction(engagementId: string, requirementId: string): Promise<Result> {
  const a = await actor()
  const res = await run(() => core.markFetched(a, requirementId))
  refresh(engagementId)
  return res
}

export async function addRequirementAction(engagementId: string, label: string, help: string, required: boolean): Promise<Result> {
  const a = await actor()
  const res = await run(() => core.addRequirement(a, engagementId, { label, help, required }))
  refresh(engagementId)
  return res
}

// ── Client ─────────────────────────────────────────────────────────────────

export async function giveConsentAction(engagementId: string, requirementId: string): Promise<Result> {
  const a = await actor()
  const res = await run(() => core.giveConsent(a, requirementId))
  refresh(engagementId)
  return res
}

export async function approveDraftAction(engagementId: string, deliverableId: string, comment: string): Promise<Result> {
  const a = await actor()
  const res = await run(() => core.approveDraft(a, deliverableId, comment))
  refresh(engagementId)
  return res
}

export async function requestChangesAction(engagementId: string, deliverableId: string, comment: string): Promise<Result> {
  const a = await actor()
  const res = await run(() => core.requestChanges(a, deliverableId, comment))
  refresh(engagementId)
  return res
}

// Called by the upload component after the route handler records the file,
// so the server-rendered checklist refreshes without a full reload.
export async function refreshEngagementAction(engagementId: string) {
  refresh(engagementId)
}

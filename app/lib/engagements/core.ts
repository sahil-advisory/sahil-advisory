import 'server-only'
import { and, eq, inArray, sql } from 'drizzle-orm'
import {
  db,
  engagements,
  requirements,
  files,
  deliverables,
  engagementEvents,
  leads,
  leadActivities,
  users,
  type EngagementStatus,
  type RequirementStatus,
  type UserRole,
  type DeliverableType,
} from '@/app/lib/db'
import { getService } from '@/app/lib/services'
import { DEADLINES, nextDue } from '@/app/lib/due-dates'
import { formatDateIN } from '@/app/lib/format'
import { resolveChecklist, checklistFor } from '@/app/lib/checklists'
import { checklistComplete, STATUS_LABEL } from './status'
import { sendPortalEmail, portalLink, staffLink, firstName } from './notify'

// The write side. Every function takes the acting user, checks access, writes
// inside a transaction, appends an event, and sends the notification the
// design calls for. Server actions and route handlers are thin wrappers.

export type Actor = { id: string; role: UserRole; name?: string | null; email?: string | null }

type Tx = Parameters<Parameters<NonNullable<typeof db>['transaction']>[0]>[0]

export async function logEvent(
  tx: Tx | NonNullable<typeof db>,
  e: { engagementId: string; actor: Actor | null; type: string; summary: string; data?: Record<string, unknown>; visibleToClient?: boolean }
) {
  await tx.insert(engagementEvents).values({
    engagementId: e.engagementId,
    actorId: e.actor?.id ?? null,
    actorRole: e.actor?.role ?? 'system',
    type: e.type,
    summary: e.summary,
    data: e.data,
    visibleToClient: e.visibleToClient ?? true,
  })
}

async function load(id: string) {
  if (!db) throw new Error('Database not configured')
  const [e] = await db.select().from(engagements).where(eq(engagements.id, id)).limit(1)
  if (!e) throw new Error('Engagement not found')
  return e
}

function assertStaff(actor: Actor, e: { assignedExpertId: string | null }) {
  if (actor.role === 'admin') return
  if (actor.role === 'expert' && e.assignedExpertId === actor.id) return
  throw new Error('Not allowed')
}

function assertClient(actor: Actor, e: { clientId: string }) {
  if (actor.role === 'admin') return
  if (e.clientId !== actor.id) throw new Error('Not allowed')
}

async function clientOf(clientId: string) {
  const [c] = await db!.select({ id: users.id, name: users.name, email: users.email }).from(users).where(eq(users.id, clientId)).limit(1)
  return c
}

async function expertOf(id: string | null) {
  if (!id) return null
  const [c] = await db!.select({ id: users.id, name: users.name, email: users.email }).from(users).where(eq(users.id, id)).limit(1)
  return c ?? null
}

// ── Create ─────────────────────────────────────────────────────────────────

export async function createEngagement(
  actor: Actor,
  input: {
    client: { email: string; name: string; phone?: string }
    serviceSlug: string
    periodLabel: string
    intake?: Record<string, string | boolean>
    assignedExpertId?: string | null
    leadId?: string | null
    priceQuoted?: number | null
    notesInternal?: string
    dueAt?: Date | null
  }
) {
  if (!db) throw new Error('Database not configured')
  if (actor.role !== 'admin') throw new Error('Not allowed')
  const service = getService(input.serviceSlug)
  if (!service) throw new Error('Unknown service')
  const email = input.client.email.trim().toLowerCase()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) throw new Error('Client email is required for portal access')

  const dueAt = input.dueAt ?? defaultDueDate(input.serviceSlug)
  const items = resolveChecklist(input.serviceSlug, input.intake ?? {})

  const id = await db.transaction(async (tx) => {
    // Find or create the client. An existing staff account is never
    // downgraded; an existing client keeps their role.
    const [existing] = await tx.select().from(users).where(eq(users.email, email)).limit(1)
    let clientId = existing?.id
    if (!clientId) {
      const [created] = await tx
        .insert(users)
        .values({ email, name: input.client.name.trim(), phone: input.client.phone?.replace(/\D/g, '').slice(-10) || null, role: 'client' })
        .returning({ id: users.id })
      clientId = created.id
    } else if (!existing.name || (input.client.phone && !existing.phone)) {
      await tx
        .update(users)
        .set({ name: existing.name || input.client.name.trim(), phone: existing.phone || input.client.phone?.replace(/\D/g, '').slice(-10) || null })
        .where(eq(users.id, clientId))
    }

    const [e] = await tx
      .insert(engagements)
      .values({
        clientId,
        serviceSlug: input.serviceSlug,
        periodLabel: input.periodLabel.trim(),
        status: 'collecting',
        assignedExpertId: input.assignedExpertId ?? null,
        leadId: input.leadId ?? null,
        intake: input.intake ?? {},
        dueAt,
        priceQuoted: input.priceQuoted ?? (service.price ?? null),
        notesInternal: input.notesInternal?.trim() || null,
        createdBy: actor.id,
      })
      .returning({ id: engagements.id })

    if (items.length) {
      await tx.insert(requirements).values(
        items.map((d, i) => ({
          engagementId: e.id,
          key: d.key,
          label: d.label,
          help: d.help ?? null,
          kind: d.kind,
          required: d.required ?? true,
          fetchable: d.fetchable ?? false,
          sort: i,
          createdBy: actor.id,
        }))
      )
    }

    await logEvent(tx, { engagementId: e.id, actor, type: 'created', summary: `Engagement created for ${service.name}, ${input.periodLabel}`, data: { items: items.length } })

    if (input.leadId) {
      await tx.update(leads).set({ status: 'converted', convertedTo: e.id, updatedAt: new Date() }).where(eq(leads.id, input.leadId))
      await tx.insert(leadActivities).values({ leadId: input.leadId, actorId: actor.id, type: 'status_change', toStatus: 'converted', body: `Engagement created: ${service.name}` })
    }
    return e.id
  })

  const required = items.filter((d) => d.required !== false)
  await sendPortalEmail(
    { email, engagementId: id, kind: 'engagement_created' },
    {
      subject: `Your ${service.name} for ${input.periodLabel}: what we need from you`,
      preheader: `${required.length} documents to send. Most are a photo from your phone.`,
      greeting: `Hi ${firstName(input.client.name)}, your filing has started.`,
      intro: `We have opened ${service.name} for ${input.periodLabel}. Sign in with this email address to see your checklist, upload from your phone, and follow every step until it is filed.`,
      rows: [
        { label: 'Service', value: service.name },
        { label: 'Period', value: input.periodLabel },
        { label: 'Documents needed', value: String(required.length) },
        ...(dueAt ? [{ label: 'Due date', value: formatDateIN(dueAt), tone: 'warn' as const }] : []),
      ],
      note: required.length ? `<strong>To send:</strong> ${required.map((d) => d.label).join(', ')}.` : undefined,
      cta: { label: 'Open my checklist', href: portalLink(id) },
      footnote: 'There is no password. The portal emails you a sign-in link each time.',
    }
  )
  return id
}

function defaultDueDate(serviceSlug: string): Date | null {
  const d = DEADLINES.find((x) => x.serviceSlug === serviceSlug) ?? (serviceSlug.startsWith('itr-') ? DEADLINES.find((x) => x.key === 'itr-non-audit') : undefined)
  return d ? nextDue(d.rule) : null
}

// ── Status ─────────────────────────────────────────────────────────────────

export async function setStatus(actor: Actor, engagementId: string, next: EngagementStatus, reason?: string) {
  const e = await load(engagementId)
  assertStaff(actor, e)
  if (e.status === next) return
  await db!.transaction(async (tx) => {
    await tx
      .update(engagements)
      .set({ status: next, holdReason: next === 'on_hold' ? reason ?? null : null, closedAt: next === 'closed' ? new Date() : null, updatedAt: new Date() })
      .where(eq(engagements.id, engagementId))
    await logEvent(tx, { engagementId, actor, type: 'status', summary: `Status: ${STATUS_LABEL[next].label}${reason ? `. ${reason}` : ''}`, data: { from: e.status, to: next } })
  })
  await notifyStatus(engagementId, next)
}

async function notifyStatus(engagementId: string, next: EngagementStatus) {
  const e = await load(engagementId)
  const client = await clientOf(e.clientId)
  const service = getService(e.serviceSlug)
  const name = service?.name ?? e.serviceSlug
  if (next === 'filed') {
    await sendPortalEmail(
      { email: client.email, userId: client.id, engagementId, kind: 'filed' },
      {
        subject: `Filed: ${name}, ${e.periodLabel}`,
        greeting: `Hi ${firstName(client.name)}, it is filed.`,
        intro: `Your ${name} for ${e.periodLabel} has been filed. The acknowledgement is in your portal. If e-verification is pending on your side, the portal shows exactly what to do.`,
        cta: { label: 'See the acknowledgement', href: portalLink(engagementId) },
      }
    )
  } else if (next === 'verified' || next === 'closed') {
    await sendPortalEmail(
      { email: client.email, userId: client.id, engagementId, kind: next },
      {
        subject: `${next === 'verified' ? 'Verified' : 'Completed'}: ${name}, ${e.periodLabel}`,
        greeting: `Hi ${firstName(client.name)}, all done.`,
        intro: `Your ${name} for ${e.periodLabel} is ${next === 'verified' ? 'filed and verified' : 'complete'}. Everything you sent and everything we filed stays in your portal.`,
        cta: { label: 'Open the portal', href: portalLink(engagementId) },
        footnote: 'If this went well, a short Google review helps other people find us.',
      }
    )
  } else if (next === 'on_hold') {
    await sendPortalEmail(
      { email: client.email, userId: client.id, engagementId, kind: 'on_hold' },
      {
        subject: `On hold: ${name}, ${e.periodLabel}`,
        greeting: `Hi ${firstName(client.name)}, a quick pause.`,
        intro: `Your ${name} for ${e.periodLabel} is on hold${e.holdReason ? `: ${e.holdReason}` : ''}. Your expert will be in touch; you can also reply to this email.`,
        cta: { label: 'Open the portal', href: portalLink(engagementId) },
      }
    )
  }
}

export async function assignExpert(actor: Actor, engagementId: string, expertId: string | null) {
  if (actor.role !== 'admin') throw new Error('Not allowed')
  const e = await load(engagementId)
  const expert = await expertOf(expertId)
  await db!.transaction(async (tx) => {
    await tx.update(engagements).set({ assignedExpertId: expertId, updatedAt: new Date() }).where(eq(engagements.id, engagementId))
    await logEvent(tx, { engagementId, actor, type: 'assigned', summary: expert ? `${expert.name ?? expert.email} assigned as your expert` : 'Expert unassigned', data: { expertId } })
  })
  void e
}

export async function updateNotes(actor: Actor, engagementId: string, notes: string) {
  const e = await load(engagementId)
  assertStaff(actor, e)
  await db!.update(engagements).set({ notesInternal: notes.trim().slice(0, 5000) || null, updatedAt: new Date() }).where(eq(engagements.id, engagementId))
}

// ── Requirements ───────────────────────────────────────────────────────────

async function loadRequirement(requirementId: string) {
  const [r] = await db!.select().from(requirements).where(eq(requirements.id, requirementId)).limit(1)
  if (!r) throw new Error('Requirement not found')
  return r
}

// After any requirement change: if everything required is done and the
// engagement is still collecting, move it to review and tell both sides.
async function autoAdvance(engagementId: string, actor: Actor | null) {
  const e = await load(engagementId)
  if (e.status !== 'collecting') return
  const reqs = await db!.select({ required: requirements.required, status: requirements.status }).from(requirements).where(eq(requirements.engagementId, engagementId))
  if (!reqs.length || !checklistComplete(reqs)) return
  await db!.transaction(async (tx) => {
    await tx.update(engagements).set({ status: 'ready_for_review', updatedAt: new Date() }).where(eq(engagements.id, engagementId))
    await logEvent(tx, { engagementId, actor: null, type: 'status', summary: 'All documents received. Ready for review', data: { from: 'collecting', to: 'ready_for_review', by: actor?.id } })
  })
  const client = await clientOf(e.clientId)
  const service = getService(e.serviceSlug)
  await sendPortalEmail(
    { email: client.email, userId: client.id, engagementId, kind: 'all_received' },
    {
      subject: `We have everything for your ${service?.name ?? 'filing'}`,
      greeting: `Hi ${firstName(client.name)}, we have everything.`,
      intro: `Every document on your checklist is verified. Your expert now prepares the ${service?.name ?? 'return'} for ${e.periodLabel}. You will get the draft to approve before anything is filed.`,
      cta: { label: 'Open the portal', href: portalLink(engagementId) },
    }
  )
  const expert = await expertOf(e.assignedExpertId)
  if (expert?.email) {
    await sendPortalEmail(
      { email: expert.email, userId: expert.id, engagementId, kind: 'expert_ready' },
      {
        subject: `Ready for review: ${client.name ?? client.email}, ${service?.name ?? e.serviceSlug}`,
        greeting: 'Checklist complete.',
        intro: `${client.name ?? client.email}'s ${service?.name ?? e.serviceSlug} for ${e.periodLabel} has every required document verified.`,
        cta: { label: 'Open the engagement', href: staffLink(engagementId) },
      }
    )
  }
}

export async function verifyRequirement(actor: Actor, requirementId: string) {
  const r = await loadRequirement(requirementId)
  const e = await load(r.engagementId)
  assertStaff(actor, e)
  await db!.transaction(async (tx) => {
    await tx.update(requirements).set({ status: 'verified', rejectReason: null, updatedAt: new Date() }).where(eq(requirements.id, requirementId))
    await tx.update(engagements).set({ updatedAt: new Date() }).where(eq(engagements.id, e.id))
    await logEvent(tx, { engagementId: e.id, actor, type: 'requirement_verified', summary: `${r.label} verified`, data: { requirementId } })
  })
  await autoAdvance(e.id, actor)
}

export async function rejectRequirement(actor: Actor, requirementId: string, reason: string) {
  const r = await loadRequirement(requirementId)
  const e = await load(r.engagementId)
  assertStaff(actor, e)
  const why = reason.trim().slice(0, 500)
  if (!why) throw new Error('A reason is required')
  await db!.transaction(async (tx) => {
    await tx.update(requirements).set({ status: 'rejected', rejectReason: why, updatedAt: new Date() }).where(eq(requirements.id, requirementId))
    const back = e.status === 'ready_for_review' || e.status === 'in_preparation'
    await tx.update(engagements).set({ ...(back ? { status: 'collecting' as const } : {}), updatedAt: new Date() }).where(eq(engagements.id, e.id))
    await logEvent(tx, { engagementId: e.id, actor, type: 'requirement_rejected', summary: `${r.label} needs a new copy: ${why}`, data: { requirementId, reason: why } })
  })
  const client = await clientOf(e.clientId)
  const service = getService(e.serviceSlug)
  await sendPortalEmail(
    { email: client.email, userId: client.id, engagementId: e.id, kind: 'requirement_rejected' },
    {
      subject: `Please re-send: ${r.label}`,
      greeting: `Hi ${firstName(client.name)}, one document needs another look.`,
      intro: `Your expert checked ${r.label} for your ${service?.name ?? 'filing'} and needs a new copy.`,
      note: `<strong>Reason:</strong> ${why}`,
      cta: { label: 'Upload again', href: `${portalLink(e.id)}#req-${requirementId}` },
    }
  )
}

export async function waiveRequirement(actor: Actor, requirementId: string, reason: string) {
  const r = await loadRequirement(requirementId)
  const e = await load(r.engagementId)
  assertStaff(actor, e)
  await db!.transaction(async (tx) => {
    await tx.update(requirements).set({ status: 'waived', waivedReason: reason.trim().slice(0, 300) || null, updatedAt: new Date() }).where(eq(requirements.id, requirementId))
    await logEvent(tx, { engagementId: e.id, actor, type: 'requirement_waived', summary: `${r.label} not needed${reason ? `: ${reason.trim()}` : ''}`, data: { requirementId } })
  })
  await autoAdvance(e.id, actor)
}

export async function reopenRequirement(actor: Actor, requirementId: string) {
  const r = await loadRequirement(requirementId)
  const e = await load(r.engagementId)
  assertStaff(actor, e)
  await db!.transaction(async (tx) => {
    await tx.update(requirements).set({ status: 'needed', rejectReason: null, waivedReason: null, updatedAt: new Date() }).where(eq(requirements.id, requirementId))
    await tx.update(engagements).set({ ...(e.status !== 'collecting' && e.status !== 'on_hold' ? { status: 'collecting' as const } : {}), updatedAt: new Date() }).where(eq(engagements.id, e.id))
    await logEvent(tx, { engagementId: e.id, actor, type: 'requirement_reopened', summary: `${r.label} needed again`, data: { requirementId } })
  })
}

export async function markFetched(actor: Actor, requirementId: string) {
  const r = await loadRequirement(requirementId)
  const e = await load(r.engagementId)
  assertStaff(actor, e)
  await db!.transaction(async (tx) => {
    await tx.update(requirements).set({ status: 'fetched', updatedAt: new Date() }).where(eq(requirements.id, requirementId))
    await logEvent(tx, { engagementId: e.id, actor, type: 'requirement_fetched', summary: `${r.label} downloaded by your expert`, data: { requirementId } })
  })
  await autoAdvance(e.id, actor)
}

export async function addRequirement(actor: Actor, engagementId: string, input: { label: string; help?: string; required?: boolean }) {
  const e = await load(engagementId)
  assertStaff(actor, e)
  const label = input.label.trim().slice(0, 120)
  if (!label) throw new Error('Label is required')
  const [{ n }] = await db!.select({ n: sql<number>`coalesce(max(${requirements.sort}), -1)`.mapWith(Number) }).from(requirements).where(eq(requirements.engagementId, engagementId))
  let id = ''
  await db!.transaction(async (tx) => {
    const [row] = await tx
      .insert(requirements)
      .values({ engagementId, key: 'custom', label, help: input.help?.trim() || null, kind: 'form', required: input.required ?? true, sort: n + 1, createdBy: actor.id })
      .returning({ id: requirements.id })
    id = row.id
    await tx.update(engagements).set({ ...(e.status === 'ready_for_review' || e.status === 'in_preparation' ? { status: 'collecting' as const } : {}), updatedAt: new Date() }).where(eq(engagements.id, engagementId))
    await logEvent(tx, { engagementId, actor, type: 'requirement_added', summary: `Also needed: ${label}`, data: { requirementId: id } })
  })
  const client = await clientOf(e.clientId)
  await sendPortalEmail(
    { email: client.email, userId: client.id, engagementId, kind: 'requirement_added' },
    {
      subject: `One more document: ${label}`,
      greeting: `Hi ${firstName(client.name)}, one more thing to send.`,
      intro: `Your expert has added ${label} to your checklist${input.help ? `. ${input.help.trim()}` : '.'}`,
      cta: { label: 'Upload it', href: `${portalLink(engagementId)}#req-${id}` },
    }
  )
  return id
}

export async function giveConsent(actor: Actor, requirementId: string) {
  const r = await loadRequirement(requirementId)
  const e = await load(r.engagementId)
  assertClient(actor, e)
  if (!r.fetchable) throw new Error('This document cannot be fetched')
  await db!.transaction(async (tx) => {
    await tx.update(requirements).set({ status: 'consent_given', consentAt: new Date(), updatedAt: new Date() }).where(eq(requirements.id, requirementId))
    await tx.update(engagements).set({ updatedAt: new Date() }).where(eq(engagements.id, e.id))
    await logEvent(tx, { engagementId: e.id, actor, type: 'consent', summary: `Consent given to download ${r.label}`, data: { requirementId, at: new Date().toISOString() } })
  })
}

// ── Uploads ────────────────────────────────────────────────────────────────

export async function nextVersion(requirementId: string) {
  const [{ v }] = await db!.select({ v: sql<number>`coalesce(max(${files.version}), 0)`.mapWith(Number) }).from(files).where(eq(files.requirementId, requirementId))
  return v + 1
}

export async function recordUpload(
  actor: Actor,
  input: { requirementId: string; storagePath: string; originalName: string; mime: string; size: number; sha256: string | null; version: number; source: 'portal' | 'expert' | 'whatsapp' }
) {
  const r = await loadRequirement(input.requirementId)
  const e = await load(r.engagementId)
  if (actor.role === 'client') assertClient(actor, e)
  else assertStaff(actor, e)
  await db!.transaction(async (tx) => {
    await tx.insert(files).values({
      engagementId: e.id,
      requirementId: r.id,
      version: input.version,
      storagePath: input.storagePath,
      originalName: input.originalName.slice(0, 200),
      mime: input.mime,
      size: input.size,
      sha256: input.sha256,
      uploadedBy: actor.id,
      source: input.source,
    })
    await tx.update(requirements).set({ status: 'received', rejectReason: null, updatedAt: new Date() }).where(eq(requirements.id, r.id))
    await tx.update(engagements).set({ updatedAt: new Date() }).where(eq(engagements.id, e.id))
    await logEvent(tx, {
      engagementId: e.id,
      actor,
      type: 'file_uploaded',
      summary: `${r.label} uploaded${input.version > 1 ? ` (version ${input.version})` : ''}${input.source === 'whatsapp' ? ', received on WhatsApp' : ''}`,
      data: { requirementId: r.id, version: input.version, size: input.size },
    })
  })
}

// ── Deliverables ───────────────────────────────────────────────────────────

export async function recordDeliverable(
  actor: Actor,
  input: { engagementId: string; type: DeliverableType; title: string; storagePath: string; originalName: string; mime: string; size: number }
) {
  const e = await load(input.engagementId)
  assertStaff(actor, e)
  const [{ v }] = await db!.select({ v: sql<number>`coalesce(max(${deliverables.version}), 0)`.mapWith(Number) }).from(deliverables).where(and(eq(deliverables.engagementId, e.id), eq(deliverables.type, input.type)))
  const version = v + 1
  const isDraft = input.type === 'draft' || input.type === 'computation'
  const isAck = input.type === 'acknowledgement'
  await db!.transaction(async (tx) => {
    await tx.insert(deliverables).values({ ...input, title: input.title.trim().slice(0, 120), version, createdBy: actor.id })
    const status: EngagementStatus | null = isDraft ? 'draft_shared' : isAck ? 'filed' : null
    await tx.update(engagements).set({ ...(status ? { status } : {}), updatedAt: new Date() }).where(eq(engagements.id, e.id))
    await logEvent(tx, { engagementId: e.id, actor, type: 'deliverable', summary: isDraft ? `Draft shared for your approval${version > 1 ? ` (version ${version})` : ''}` : isAck ? 'Acknowledgement uploaded. Filed.' : `${input.title} shared`, data: { type: input.type, version } })
  })
  const client = await clientOf(e.clientId)
  const service = getService(e.serviceSlug)
  if (isDraft) {
    await sendPortalEmail(
      { email: client.email, userId: client.id, engagementId: e.id, kind: 'draft_shared' },
      {
        subject: `Your draft is ready to approve: ${service?.name ?? 'filing'}, ${e.periodLabel}`,
        greeting: `Hi ${firstName(client.name)}, your draft is ready.`,
        intro: `Your expert has prepared the ${service?.name ?? 'return'} for ${e.periodLabel}. Open it, check the numbers, and approve or ask for changes. Nothing is filed until you approve.`,
        cta: { label: 'Review and approve', href: `${portalLink(e.id)}#draft` },
      }
    )
  } else if (isAck) {
    await notifyStatus(e.id, 'filed')
  }
}

export async function approveDraft(actor: Actor, deliverableId: string, comment: string) {
  const [d] = await db!.select().from(deliverables).where(eq(deliverables.id, deliverableId)).limit(1)
  if (!d) throw new Error('Draft not found')
  const e = await load(d.engagementId)
  assertClient(actor, e)
  await db!.transaction(async (tx) => {
    await tx.update(deliverables).set({ approvedAt: new Date(), approvedBy: actor.id, clientComment: comment.trim().slice(0, 1000) || null }).where(eq(deliverables.id, deliverableId))
    await tx.update(engagements).set({ status: 'approved', updatedAt: new Date() }).where(eq(engagements.id, e.id))
    await logEvent(tx, { engagementId: e.id, actor, type: 'approved', summary: `Draft approved by ${actor.name ?? 'client'}${comment.trim() ? `: ${comment.trim()}` : ''}`, data: { deliverableId } })
  })
  const expert = await expertOf(e.assignedExpertId)
  const client = await clientOf(e.clientId)
  const service = getService(e.serviceSlug)
  if (expert?.email) {
    await sendPortalEmail(
      { email: expert.email, userId: expert.id, engagementId: e.id, kind: 'expert_approved' },
      {
        subject: `Approved: ${client.name ?? client.email}, ${service?.name ?? e.serviceSlug}`,
        greeting: 'The client approved the draft.',
        intro: `${client.name ?? client.email} approved the draft for ${e.periodLabel}${comment.trim() ? ` with the comment: "${comment.trim()}"` : ''}. File it and upload the acknowledgement.`,
        cta: { label: 'Open the engagement', href: staffLink(e.id) },
      }
    )
  }
}

export async function requestChanges(actor: Actor, deliverableId: string, comment: string) {
  const [d] = await db!.select().from(deliverables).where(eq(deliverables.id, deliverableId)).limit(1)
  if (!d) throw new Error('Draft not found')
  const e = await load(d.engagementId)
  assertClient(actor, e)
  const why = comment.trim().slice(0, 1000)
  if (!why) throw new Error('Tell us what to change')
  await db!.transaction(async (tx) => {
    await tx.update(deliverables).set({ clientComment: why }).where(eq(deliverables.id, deliverableId))
    await tx.update(engagements).set({ status: 'in_preparation', updatedAt: new Date() }).where(eq(engagements.id, e.id))
    await logEvent(tx, { engagementId: e.id, actor, type: 'changes_requested', summary: `Changes requested: ${why}`, data: { deliverableId } })
  })
  const expert = await expertOf(e.assignedExpertId)
  const client = await clientOf(e.clientId)
  if (expert?.email) {
    await sendPortalEmail(
      { email: expert.email, userId: expert.id, engagementId: e.id, kind: 'expert_changes' },
      {
        subject: `Changes requested: ${client.name ?? client.email}`,
        greeting: 'The client asked for changes.',
        intro: why,
        cta: { label: 'Open the engagement', href: staffLink(e.id) },
      }
    )
  }
}

// ── Reminders (cron) ───────────────────────────────────────────────────────

const REMIND_AFTER_DAYS = [2, 5, 9]

export async function runReminders(now = new Date()) {
  if (!db) return { reminded: 0 }
  const open = await db
    .select()
    .from(engagements)
    .where(inArray(engagements.status, ['collecting']))
  let reminded = 0
  for (const e of open) {
    const reqs = await db.select().from(requirements).where(and(eq(requirements.engagementId, e.id), inArray(requirements.status, ['needed', 'rejected'] as RequirementStatus[]), eq(requirements.required, true)))
    if (!reqs.length) continue
    const ageDays = Math.floor((now.getTime() - e.createdAt.getTime()) / 86_400_000)
    const last = reqs.reduce<Date | null>((m, r) => (r.lastRemindedAt && (!m || r.lastRemindedAt > m) ? r.lastRemindedAt : m), null)
    const sinceLast = last ? Math.floor((now.getTime() - last.getTime()) / 86_400_000) : Infinity
    const due = REMIND_AFTER_DAYS.includes(ageDays) || (ageDays > REMIND_AFTER_DAYS[REMIND_AFTER_DAYS.length - 1] && sinceLast >= 7)
    if (!due || sinceLast < 2) continue
    const client = await clientOf(e.clientId)
    const service = getService(e.serviceSlug)
    const res = await sendPortalEmail(
      { email: client.email, userId: client.id, engagementId: e.id, kind: 'reminder' },
      {
        subject: `${reqs.length} document${reqs.length === 1 ? '' : 's'} still needed for your ${service?.name ?? 'filing'}`,
        greeting: `Hi ${firstName(client.name)}, a gentle reminder.`,
        intro: `We are waiting on ${reqs.length} item${reqs.length === 1 ? '' : 's'} to start preparing your ${service?.name ?? 'return'} for ${e.periodLabel}${e.dueAt ? `. The due date is ${formatDateIN(e.dueAt)}` : ''}.`,
        rows: reqs.slice(0, 8).map((r) => ({ label: r.label, value: r.status === 'rejected' ? 'Needs a new copy' : 'Needed', tone: 'warn' as const })),
        cta: { label: 'Upload now', href: portalLink(e.id) },
        footnote: 'Uploads take a minute from your phone. Reply to this email if something on the list does not apply to you.',
      }
    )
    if (res.sent) {
      reminded++
      await db.update(requirements).set({ remindedCount: sql`${requirements.remindedCount} + 1`, lastRemindedAt: now }).where(inArray(requirements.id, reqs.map((r) => r.id)))
      await logEvent(db, { engagementId: e.id, actor: null, type: 'reminder', summary: `Reminder sent for ${reqs.length} document${reqs.length === 1 ? '' : 's'}`, visibleToClient: false })
    }
  }
  return { reminded }
}

export { checklistFor }

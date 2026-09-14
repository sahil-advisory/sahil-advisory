import { and, asc, count, desc, eq, inArray, or, sql } from 'drizzle-orm'
import { db, engagements, requirements, files, deliverables, engagementEvents, users, ENGAGEMENT_STATUSES, type EngagementStatus, type UserRole } from '@/app/lib/db'
import { getService } from '@/app/lib/services'
import { progress } from './status'

// Read side. Every function tolerates a missing database so pages render the
// "not configured" state instead of crashing.

export type SessionUser = { id: string; role: UserRole; email?: string | null; name?: string | null }

// Who may see an engagement: its client, its assigned expert, any admin.
export function canAccess(user: SessionUser, e: { clientId: string; assignedExpertId: string | null }) {
  if (user.role === 'admin') return true
  if (user.role === 'expert') return e.assignedExpertId === user.id
  return e.clientId === user.id
}

export async function listEngagements(filters: { status?: EngagementStatus | 'all' | 'open'; expertId?: string; q?: string; page?: number } = {}) {
  if (!db) return { rows: [], total: 0 }
  const page = Math.max(1, filters.page ?? 1)
  const pageSize = 50
  const conds = []
  if (filters.status === 'open') conds.push(inArray(engagements.status, ['collecting', 'ready_for_review', 'in_preparation', 'draft_shared', 'approved', 'filed', 'on_hold']))
  else if (filters.status && filters.status !== 'all' && (ENGAGEMENT_STATUSES as readonly string[]).includes(filters.status)) conds.push(eq(engagements.status, filters.status))
  if (filters.expertId) conds.push(eq(engagements.assignedExpertId, filters.expertId))
  if (filters.q) {
    const term = `%${filters.q.trim()}%`
    conds.push(or(sql`${users.name} ilike ${term}`, sql`${users.email} ilike ${term}`, sql`${users.phone} ilike ${term}`, sql`${engagements.serviceSlug} ilike ${term}`))
  }
  const where = conds.length ? and(...conds) : undefined
  const [rows, [{ total }]] = await Promise.all([
    db
      .select({
        id: engagements.id,
        serviceSlug: engagements.serviceSlug,
        periodLabel: engagements.periodLabel,
        status: engagements.status,
        dueAt: engagements.dueAt,
        createdAt: engagements.createdAt,
        updatedAt: engagements.updatedAt,
        assignedExpertId: engagements.assignedExpertId,
        clientId: engagements.clientId,
        clientName: users.name,
        clientEmail: users.email,
        clientPhone: users.phone,
        needed: sql<number>`(select count(*) from ${requirements} r where r.engagement_id = ${engagements.id} and r.required and r.status in ('needed','rejected'))`.mapWith(Number),
        received: sql<number>`(select count(*) from ${requirements} r where r.engagement_id = ${engagements.id} and r.status = 'received')`.mapWith(Number),
        requiredTotal: sql<number>`(select count(*) from ${requirements} r where r.engagement_id = ${engagements.id} and r.required)`.mapWith(Number),
      })
      .from(engagements)
      .innerJoin(users, eq(users.id, engagements.clientId))
      .where(where)
      .orderBy(desc(engagements.updatedAt))
      .limit(pageSize)
      .offset((page - 1) * pageSize),
    db.select({ total: count() }).from(engagements).innerJoin(users, eq(users.id, engagements.clientId)).where(where),
  ])
  return { rows: rows.map((r) => ({ ...r, service: getService(r.serviceSlug) })), total }
}

export async function listClientEngagements(clientId: string) {
  if (!db) return []
  const rows = await db.select().from(engagements).where(eq(engagements.clientId, clientId)).orderBy(desc(engagements.updatedAt))
  if (!rows.length) return []
  const reqs = await db
    .select({ engagementId: requirements.engagementId, required: requirements.required, status: requirements.status })
    .from(requirements)
    .where(inArray(requirements.engagementId, rows.map((r) => r.id)))
  return rows.map((e) => ({
    ...e,
    service: getService(e.serviceSlug),
    progress: progress(reqs.filter((r) => r.engagementId === e.id)),
  }))
}

export async function getEngagement(id: string, viewer: SessionUser) {
  if (!db) return null
  const [e] = await db.select().from(engagements).where(eq(engagements.id, id)).limit(1)
  if (!e || !canAccess(viewer, e)) return null
  const staffView = viewer.role !== 'client'
  const [client, expert, reqs, fileRows, delivs, events] = await Promise.all([
    db.select({ id: users.id, name: users.name, email: users.email, phone: users.phone }).from(users).where(eq(users.id, e.clientId)).limit(1),
    e.assignedExpertId ? db.select({ id: users.id, name: users.name, email: users.email }).from(users).where(eq(users.id, e.assignedExpertId)).limit(1) : Promise.resolve([]),
    db.select().from(requirements).where(eq(requirements.engagementId, id)).orderBy(asc(requirements.sort), asc(requirements.createdAt)),
    db.select().from(files).where(eq(files.engagementId, id)).orderBy(desc(files.createdAt)),
    db.select().from(deliverables).where(eq(deliverables.engagementId, id)).orderBy(desc(deliverables.createdAt)),
    db
      .select({ event: engagementEvents, actorName: users.name })
      .from(engagementEvents)
      .leftJoin(users, eq(users.id, engagementEvents.actorId))
      .where(staffView ? eq(engagementEvents.engagementId, id) : and(eq(engagementEvents.engagementId, id), eq(engagementEvents.visibleToClient, true)))
      .orderBy(desc(engagementEvents.createdAt))
      .limit(200),
  ])
  return {
    ...e,
    service: getService(e.serviceSlug),
    client: client[0] ?? null,
    expert: expert[0] ?? null,
    requirements: reqs.map((r) => ({ ...r, files: fileRows.filter((f) => f.requirementId === r.id) })),
    files: fileRows,
    deliverables: delivs,
    events: events.map((x) => ({ ...x.event, actorName: x.actorName })),
    progress: progress(reqs),
  }
}

export type EngagementDetail = NonNullable<Awaited<ReturnType<typeof getEngagement>>>

export async function listStaff() {
  if (!db) return []
  return db.select({ id: users.id, name: users.name, email: users.email, role: users.role }).from(users).where(inArray(users.role, ['admin', 'expert'])).orderBy(asc(users.name))
}

export async function findClientByEmail(email: string) {
  if (!db) return null
  const [u] = await db.select().from(users).where(eq(users.email, email.toLowerCase())).limit(1)
  return u ?? null
}

export async function engagementCounts() {
  if (!db) return {} as Record<string, number>
  const rows = await db.select({ status: engagements.status, n: count() }).from(engagements).groupBy(engagements.status)
  return Object.fromEntries(rows.map((r) => [r.status, Number(r.n)]))
}

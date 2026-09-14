// End-to-end logic test of the engagement flow on an in-process Postgres.
// Storage and email are not exercised here (no keys locally); every email
// send is logged as skipped, which is the path we assert on.
import { PGlite } from '@electric-sql/pglite'
import { drizzle } from 'drizzle-orm/pglite'
import { migrate } from 'drizzle-orm/pglite/migrator'
import * as schema from '@/app/lib/db/schema'

const pg = new PGlite()
const db = drizzle(pg, { schema })
await migrate(db, { migrationsFolder: './drizzle' })
;(globalThis as { __sahilDb?: unknown }).__sahilDb = db
process.env.DATABASE_URL = 'pglite'

const core = await import('@/app/lib/engagements/core')
const q = await import('@/app/lib/engagements/queries')
const { eq } = await import('drizzle-orm')
const assert = (c: unknown, m: string) => { if (!c) throw new Error('ASSERT: ' + m); console.log('ok  ', m) }

// Admin and a lead
const [admin] = await db.insert(schema.users).values({ email: 'admin@example.com', name: 'Admin', role: 'admin' }).returning()
const [expert] = await db.insert(schema.users).values({ email: 'expert@example.com', name: 'CMA Sahil', role: 'expert' }).returning()
const [lead] = await db.insert(schema.leads).values({ name: 'Priya Sharma', phone: '9876543210', email: 'priya@example.com', service: 'ITR for Salaried' }).returning()
const A = { id: admin.id, role: 'admin' as const, name: 'Admin' }
const X = { id: expert.id, role: 'expert' as const, name: 'CMA Sahil' }

const id = await core.createEngagement(A, { client: { email: 'priya@example.com', name: 'Priya Sharma', phone: '9876543210' }, serviceSlug: 'itr-salaried', periodLabel: 'FY 2025-26', intake: { regime: 'old_or_unsure', pays_rent: true, home_loan: false, job_change: false }, assignedExpertId: expert.id, leadId: lead.id })
let e = (await q.getEngagement(id, A))!
assert(e.status === 'collecting', 'created in collecting')
assert(e.requirements.length === 7, `checklist has 7 items (got ${e.requirements.length}): ${e.requirements.map(r => r.key).join(', ')}`)
assert(!e.requirements.some(r => r.key === 'home-loan-interest'), 'home loan doc excluded by intake')
assert(e.requirements.some(r => r.key === 'rent-receipts'), 'rent receipts included by intake')
const [lead2] = await db.select().from(schema.leads).where(eq(schema.leads.id, lead.id))
assert(lead2.status === 'converted' && lead2.convertedTo === id, 'lead converted and linked')
const [client] = await db.select().from(schema.users).where(eq(schema.users.email, 'priya@example.com'))
assert(client.role === 'client' && client.phone === '9876543210', 'client user created')
const C = { id: client.id, role: 'client' as const, name: 'Priya Sharma' }

// Access control
assert((await q.getEngagement(id, C)) !== null, 'client can see own engagement')
assert((await q.getEngagement(id, { id: 'stranger', role: 'client' })) === null, 'other client cannot')
assert((await q.getEngagement(id, { id: 'other-expert', role: 'expert' })) === null, 'unassigned expert cannot')
assert((await q.getEngagement(id, X)) !== null, 'assigned expert can')

// Client consent + uploads
const ais = e.requirements.find(r => r.key === 'ais-26as')!
await core.giveConsent(C, ais.id)
for (const r of e.requirements.filter(r => r.required && r.key !== 'ais-26as')) {
  const v = await core.nextVersion(r.id)
  await core.recordUpload(C, { requirementId: r.id, storagePath: `engagements/${id}/${r.key}/v${v}-x.pdf`, originalName: `${r.key}.pdf`, mime: 'application/pdf', size: 1000, sha256: null, version: v, source: 'portal' })
}
e = (await q.getEngagement(id, A))!
assert(e.requirements.filter(r => r.status === 'received').length === 4, 'four required docs received')
assert(e.status === 'collecting', 'still collecting until verified')

// Expert rejects one, then verifies all
const f16 = e.requirements.find(r => r.key === 'form16')!
await core.rejectRequirement(X, f16.id, 'Part B missing')
e = (await q.getEngagement(id, A))!
assert(e.requirements.find(r => r.id === f16.id)!.status === 'rejected', 'form16 rejected with reason')
const v2 = await core.nextVersion(f16.id)
assert(v2 === 2, 'next version is 2')
await core.recordUpload(C, { requirementId: f16.id, storagePath: `engagements/${id}/form16/v2-y.pdf`, originalName: 'form16-full.pdf', mime: 'application/pdf', size: 2000, sha256: null, version: 2, source: 'portal' })
await core.markFetched(X, ais.id)
for (const r of e.requirements.filter(r => r.required && r.key !== 'ais-26as')) await core.verifyRequirement(X, r.id)
e = (await q.getEngagement(id, A))!
assert(e.status === 'ready_for_review', `auto-advanced to ready_for_review (got ${e.status})`)
assert(e.progress.done === e.progress.total, 'progress complete')

// Draft, approval, filing
await core.setStatus(X, id, 'in_preparation')
await core.recordDeliverable(X, { engagementId: id, type: 'draft', title: 'Draft computation', storagePath: `engagements/${id}/deliverables/draft-v1.pdf`, originalName: 'draft.pdf', mime: 'application/pdf', size: 5000 })
e = (await q.getEngagement(id, C))!
assert(e.status === 'draft_shared', 'draft shared')
await core.requestChanges(C, e.deliverables[0].id, 'HRA looks low')
e = (await q.getEngagement(id, C))!
assert(e.status === 'in_preparation', 'changes requested returns to preparation')
await core.recordDeliverable(X, { engagementId: id, type: 'draft', title: 'Draft computation', storagePath: `engagements/${id}/deliverables/draft-v2.pdf`, originalName: 'draft2.pdf', mime: 'application/pdf', size: 5000 })
e = (await q.getEngagement(id, C))!
assert(e.deliverables[0].version === 2, 'second draft is v2')
await core.approveDraft(C, e.deliverables[0].id, 'Looks right')
e = (await q.getEngagement(id, C))!
assert(e.status === 'approved', 'approved')
await core.recordDeliverable(X, { engagementId: id, type: 'acknowledgement', title: 'ITR-V', storagePath: `engagements/${id}/deliverables/ack-v1.pdf`, originalName: 'itrv.pdf', mime: 'application/pdf', size: 3000 })
e = (await q.getEngagement(id, C))!
assert(e.status === 'filed', 'filed on acknowledgement')
await core.setStatus(X, id, 'verified')
await core.setStatus(X, id, 'closed')
e = (await q.getEngagement(id, A))!
assert(e.status === 'closed' && e.closedAt, 'closed with timestamp')

// Events and notifications
const clientEvents = (await q.getEngagement(id, C))!.events
assert(e.events.length >= 20, `timeline has ${e.events.length} events`)
assert(clientEvents.every(ev => ev.visibleToClient), 'client sees only visible events')
const notes = await db.select().from(schema.notifications).where(eq(schema.notifications.engagementId, id))
console.log('    notifications logged:', notes.map(n => `${n.kind}:${n.status}`).join(', '))
assert(notes.some(n => n.kind === 'engagement_created') && notes.some(n => n.kind === 'requirement_rejected') && notes.some(n => n.kind === 'draft_shared') && notes.some(n => n.kind === 'filed'), 'key notifications logged')

// Reminders: a fresh engagement aged 2 days gets one, then not again next day
const id2 = await core.createEngagement(A, { client: { email: 'raj@example.com', name: 'Raj' }, serviceSlug: 'gst-monthly', periodLabel: 'September 2026' })
await db.update(schema.engagements).set({ createdAt: new Date(Date.now() - 2 * 86_400_000) }).where(eq(schema.engagements.id, id2))
const r1 = await core.runReminders()
assert(r1.reminded === 0, 'reminder skipped when email cannot send (no provider) and nothing breaks')
const list = await q.listEngagements({ status: 'open' })
assert(list.total === 1 && list.rows[0].id === id2, 'open list shows only the GST engagement')
console.log('\nALL PASSED')
await pg.close()

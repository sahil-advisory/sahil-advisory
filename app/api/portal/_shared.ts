import { eq } from 'drizzle-orm'
import { getSession } from '@/auth'
import { db, engagements, requirements, type UserRole } from '@/app/lib/db'
import { canAccess } from '@/app/lib/engagements/queries'
import { ALLOWED_MIME, MAX_FILE_BYTES } from '@/app/lib/storage'

// Helpers shared by the portal route handlers. Every handler re-checks the
// session and the engagement access; the proxy only checks a cookie exists.

export type Actor = { id: string; role: UserRole; name?: string | null; email?: string | null }

export async function requireActor(): Promise<Actor | Response> {
  const session = await getSession()
  if (!session?.user?.id) return Response.json({ error: 'Sign in required' }, { status: 401 })
  return { id: session.user.id, role: session.user.role, name: session.user.name, email: session.user.email }
}

export async function loadRequirementFor(actor: Actor, requirementId: string) {
  if (!db) return { error: Response.json({ error: 'Not configured' }, { status: 503 }) }
  const [r] = await db.select().from(requirements).where(eq(requirements.id, requirementId)).limit(1)
  if (!r) return { error: Response.json({ error: 'Not found' }, { status: 404 }) }
  const [e] = await db.select().from(engagements).where(eq(engagements.id, r.engagementId)).limit(1)
  if (!e || !canAccess(actor, e)) return { error: Response.json({ error: 'Not found' }, { status: 404 }) }
  return { requirement: r, engagement: e }
}

export async function loadEngagementFor(actor: Actor, engagementId: string) {
  if (!db) return { error: Response.json({ error: 'Not configured' }, { status: 503 }) }
  const [e] = await db.select().from(engagements).where(eq(engagements.id, engagementId)).limit(1)
  if (!e || !canAccess(actor, e)) return { error: Response.json({ error: 'Not found' }, { status: 404 }) }
  return { engagement: e }
}

export function validateFile(input: { filename?: unknown; mime?: unknown; size?: unknown }) {
  const filename = typeof input.filename === 'string' ? input.filename.trim().slice(0, 200) : ''
  const mime = typeof input.mime === 'string' ? input.mime.toLowerCase() : ''
  const size = typeof input.size === 'number' ? input.size : Number(input.size)
  if (!filename) return { error: 'File name missing' }
  if (!ALLOWED_MIME.has(mime)) return { error: 'Only PDF, images, Excel, CSV and ZIP files are accepted' }
  if (!Number.isFinite(size) || size <= 0) return { error: 'Empty file' }
  if (size > MAX_FILE_BYTES) return { error: 'Files must be under 15 MB' }
  const ext = filename.includes('.') ? filename.split('.').pop()! : mime.split('/')[1] ?? 'bin'
  return { filename, mime, size, ext }
}

export function isStaff(actor: Actor) {
  return actor.role === 'admin' || actor.role === 'expert'
}

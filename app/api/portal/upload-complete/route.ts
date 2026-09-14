import { requireActor, loadRequirementFor, isStaff } from '../_shared'
import { statObject, sha256Of, ALLOWED_MIME, MAX_FILE_BYTES, removeObject } from '@/app/lib/storage'
import { recordUpload } from '@/app/lib/engagements/core'
import { db, accessLog } from '@/app/lib/db'
import { getClientIP } from '@/app/lib/rate-limit'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

// Step 2: the browser reports the PUT succeeded. We trust the object in
// storage, not the browser, for size and type, then write the file row.
export async function POST(request: Request) {
  const actor = await requireActor()
  if (actor instanceof Response) return actor
  let body: Record<string, unknown>
  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 })
  }
  const requirementId = typeof body.requirementId === 'string' ? body.requirementId : ''
  const path = typeof body.path === 'string' ? body.path : ''
  const filename = typeof body.filename === 'string' ? body.filename.slice(0, 200) : 'file'
  const version = Number(body.version) || 1
  const source = body.source === 'whatsapp' ? 'whatsapp' : isStaff(actor) ? 'expert' : 'portal'
  const loaded = await loadRequirementFor(actor, requirementId)
  if ('error' in loaded) return loaded.error
  const { requirement, engagement } = loaded
  // The path must belong to this engagement; nothing else is accepted.
  if (!path.startsWith(`engagements/${engagement.id}/`)) return Response.json({ error: 'Invalid path' }, { status: 400 })

  const stat = await statObject(path)
  if (!stat) return Response.json({ error: 'Upload did not complete. Try again.' }, { status: 400 })
  if (!ALLOWED_MIME.has(stat.mime) || stat.size > MAX_FILE_BYTES || stat.size === 0) {
    await removeObject(path).catch(() => {})
    return Response.json({ error: 'That file type or size is not accepted' }, { status: 400 })
  }
  const sha256 = await sha256Of(path).catch(() => null)
  try {
    await recordUpload(actor, { requirementId: requirement.id, storagePath: path, originalName: filename, mime: stat.mime, size: stat.size, sha256, version, source })
  } catch (err) {
    console.error('[portal] record upload failed:', err)
    return Response.json({ error: (err as Error).message }, { status: 400 })
  }
  if (db) {
    await db.insert(accessLog).values({ userId: actor.id, action: 'upload', ip: getClientIP(request) }).catch(() => {})
  }
  return Response.json({ ok: true })
}

import { requireActor, loadEngagementFor, isStaff } from '../_shared'
import { statObject, ALLOWED_MIME, MAX_FILE_BYTES, removeObject } from '@/app/lib/storage'
import { recordDeliverable } from '@/app/lib/engagements/core'
import { DELIVERABLE_TYPES, type DeliverableType } from '@/app/lib/db'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

export async function POST(request: Request) {
  const actor = await requireActor()
  if (actor instanceof Response) return actor
  if (!isStaff(actor)) return Response.json({ error: 'Not allowed' }, { status: 403 })
  let body: Record<string, unknown>
  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 })
  }
  const engagementId = typeof body.engagementId === 'string' ? body.engagementId : ''
  const path = typeof body.path === 'string' ? body.path : ''
  const type = (typeof body.type === 'string' && (DELIVERABLE_TYPES as readonly string[]).includes(body.type) ? body.type : 'other') as DeliverableType
  const title = typeof body.title === 'string' && body.title.trim() ? body.title.trim() : { draft: 'Draft computation', computation: 'Computation', acknowledgement: 'Acknowledgement', invoice: 'Invoice', other: 'Document' }[type]
  const filename = typeof body.filename === 'string' ? body.filename.slice(0, 200) : 'file'
  const loaded = await loadEngagementFor(actor, engagementId)
  if ('error' in loaded) return loaded.error
  if (!path.startsWith(`engagements/${engagementId}/deliverables/`)) return Response.json({ error: 'Invalid path' }, { status: 400 })
  const stat = await statObject(path)
  if (!stat) return Response.json({ error: 'Upload did not complete. Try again.' }, { status: 400 })
  if (!ALLOWED_MIME.has(stat.mime) || stat.size > MAX_FILE_BYTES || stat.size === 0) {
    await removeObject(path).catch(() => {})
    return Response.json({ error: 'That file type or size is not accepted' }, { status: 400 })
  }
  try {
    await recordDeliverable(actor, { engagementId, type, title, storagePath: path, originalName: filename, mime: stat.mime, size: stat.size })
  } catch (err) {
    return Response.json({ error: (err as Error).message }, { status: 400 })
  }
  return Response.json({ ok: true })
}

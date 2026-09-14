import { requireActor, loadEngagementFor, validateFile, isStaff } from '../_shared'
import { createUploadUrl, deliverablePath, isStorageConfigured } from '@/app/lib/storage'
import { DELIVERABLE_TYPES } from '@/app/lib/db'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Staff only: a signed URL for a draft, acknowledgement or other deliverable.
export async function POST(request: Request) {
  const actor = await requireActor()
  if (actor instanceof Response) return actor
  if (!isStaff(actor)) return Response.json({ error: 'Not allowed' }, { status: 403 })
  if (!isStorageConfigured()) return Response.json({ error: 'File storage is not configured' }, { status: 503 })
  let body: Record<string, unknown>
  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 })
  }
  const engagementId = typeof body.engagementId === 'string' ? body.engagementId : ''
  const type = typeof body.type === 'string' && (DELIVERABLE_TYPES as readonly string[]).includes(body.type) ? body.type : 'other'
  const loaded = await loadEngagementFor(actor, engagementId)
  if ('error' in loaded) return loaded.error
  const v = validateFile(body)
  if ('error' in v) return Response.json({ error: v.error }, { status: 400 })
  const path = deliverablePath(engagementId, type, Date.now() % 100000, v.ext)
  try {
    const signed = await createUploadUrl(path)
    return Response.json({ url: signed.url, token: signed.token, path: signed.path })
  } catch (err) {
    console.error('[portal] deliverable url failed:', err)
    return Response.json({ error: 'Could not start the upload. Try again.' }, { status: 500 })
  }
}

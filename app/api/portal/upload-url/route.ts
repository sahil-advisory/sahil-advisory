import { requireActor, loadRequirementFor, validateFile } from '../_shared'
import { createUploadUrl, objectPath, isStorageConfigured } from '@/app/lib/storage'
import { nextVersion } from '@/app/lib/engagements/core'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Step 1 of an upload: the browser asks for a signed URL scoped to one
// object path. Valid for two minutes.
export async function POST(request: Request) {
  const actor = await requireActor()
  if (actor instanceof Response) return actor
  if (!isStorageConfigured()) return Response.json({ error: 'File storage is not configured' }, { status: 503 })
  let body: Record<string, unknown>
  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 })
  }
  const requirementId = typeof body.requirementId === 'string' ? body.requirementId : ''
  const loaded = await loadRequirementFor(actor, requirementId)
  if ('error' in loaded) return loaded.error
  const { requirement, engagement } = loaded
  if (engagement.status === 'closed') return Response.json({ error: 'This engagement is closed' }, { status: 409 })
  const v = validateFile(body)
  if ('error' in v) return Response.json({ error: v.error }, { status: 400 })
  const version = await nextVersion(requirement.id)
  const path = objectPath({ engagementId: engagement.id, requirementKey: requirement.key === 'custom' ? `custom-${requirement.id.slice(0, 8)}` : requirement.key, version, ext: v.ext })
  try {
    const signed = await createUploadUrl(path)
    return Response.json({ url: signed.url, token: signed.token, path: signed.path, version })
  } catch (err) {
    console.error('[portal] upload url failed:', err)
    return Response.json({ error: 'Could not start the upload. Try again.' }, { status: 500 })
  }
}

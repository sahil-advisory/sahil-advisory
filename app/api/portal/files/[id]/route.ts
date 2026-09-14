import { eq } from 'drizzle-orm'
import { requireActor, loadEngagementFor } from '../../_shared'
import { db, files, accessLog } from '@/app/lib/db'
import { createDownloadUrl } from '@/app/lib/storage'
import { getClientIP } from '@/app/lib/rate-limit'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Redirects to a 10-minute signed URL after the access check, and logs it.
// ?dl=1 forces a download; otherwise PDFs and images open inline.
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const actor = await requireActor()
  if (actor instanceof Response) return actor
  if (!db) return Response.json({ error: 'Not configured' }, { status: 503 })
  const { id } = await params
  const [f] = await db.select().from(files).where(eq(files.id, id)).limit(1)
  if (!f) return Response.json({ error: 'Not found' }, { status: 404 })
  const loaded = await loadEngagementFor(actor, f.engagementId)
  if ('error' in loaded) return loaded.error
  const dl = new URL(request.url).searchParams.get('dl') === '1'
  const inline = !dl && /^(application\/pdf|image\/)/.test(f.mime)
  const url = await createDownloadUrl(f.storagePath, inline ? { inline: true } : { download: f.originalName })
  await db.insert(accessLog).values({ fileId: f.id, userId: actor.id, action: dl ? 'download' : 'view', ip: getClientIP(request) }).catch(() => {})
  return Response.redirect(url, 302)
}

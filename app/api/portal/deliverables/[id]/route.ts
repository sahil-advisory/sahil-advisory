import { eq } from 'drizzle-orm'
import { requireActor, loadEngagementFor } from '../../_shared'
import { db, deliverables, accessLog } from '@/app/lib/db'
import { createDownloadUrl } from '@/app/lib/storage'
import { getClientIP } from '@/app/lib/rate-limit'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const actor = await requireActor()
  if (actor instanceof Response) return actor
  if (!db) return Response.json({ error: 'Not configured' }, { status: 503 })
  const { id } = await params
  const [d] = await db.select().from(deliverables).where(eq(deliverables.id, id)).limit(1)
  if (!d) return Response.json({ error: 'Not found' }, { status: 404 })
  const loaded = await loadEngagementFor(actor, d.engagementId)
  if ('error' in loaded) return loaded.error
  const dl = new URL(request.url).searchParams.get('dl') === '1'
  const inline = !dl && /^(application\/pdf|image\/)/.test(d.mime)
  const url = await createDownloadUrl(d.storagePath, inline ? { inline: true } : { download: d.originalName })
  await db.insert(accessLog).values({ deliverableId: d.id, userId: actor.id, action: dl ? 'download' : 'view', ip: getClientIP(request) }).catch(() => {})
  return Response.redirect(url, 302)
}

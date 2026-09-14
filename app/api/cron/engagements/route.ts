import { runReminders } from '@/app/lib/engagements/core'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const maxDuration = 120

// Nightly (vercel.json): reminders for documents still needed, on day 2, 5
// and 9 after the engagement opened and weekly after that, stopping the
// moment an item is received.
export async function GET(request: Request) {
  const auth = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET
  if (!cronSecret) return Response.json({ error: 'CRON_SECRET not configured' }, { status: 500 })
  if (auth !== `Bearer ${cronSecret}`) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const result = await runReminders()
  return Response.json({ ok: true, ...result, at: new Date().toISOString() })
}

import { llmsIndex } from '@/app/lib/llms'

// Regenerated daily so "next due" dates in the index stay current.
export const revalidate = 86400

export function GET() {
  return new Response(llmsIndex(), { headers: { 'Content-Type': 'text/markdown; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } })
}

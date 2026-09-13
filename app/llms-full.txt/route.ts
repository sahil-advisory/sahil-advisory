import { llmsFull } from '@/app/lib/llms'

export const revalidate = 86400

export function GET() {
  return new Response(llmsFull(), { headers: { 'Content-Type': 'text/markdown; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } })
}

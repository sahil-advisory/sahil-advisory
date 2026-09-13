import { SITEMAP_SECTIONS, sitemapEntries, type SitemapSection } from '@/app/lib/sitemap-entries'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return SITEMAP_SECTIONS.map((s) => ({ section: `${s}.xml` }))
}

function esc(s: string) {
  return s.replace(/&/g, '&amp;')
}

export async function GET(_req: Request, ctx: { params: Promise<{ section: string }> }) {
  const { section } = await ctx.params
  const name = section.replace(/\.xml$/, '') as SitemapSection
  if (!SITEMAP_SECTIONS.includes(name)) return new Response('Not found', { status: 404 })
  const entries = sitemapEntries(name)
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map((e) => `  <url>
    <loc>${esc(e.url)}</loc>
    <lastmod>${e.lastModified.toISOString()}</lastmod>
    <changefreq>${e.changeFrequency}</changefreq>
    <priority>${e.priority}</priority>
  </url>`).join('\n')}
</urlset>
`
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } })
}

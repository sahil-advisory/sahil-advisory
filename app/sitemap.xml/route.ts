import { BASE_URL } from '@/app/lib/site'
import { SITEMAP_SECTIONS, sectionLastModified } from '@/app/lib/sitemap-entries'

// Sitemap index. Each section is its own sitemap so Search Console reports
// indexing per section (services vs guides vs calculators) instead of one
// blended number. Next's generateSitemaps() splits files but does not emit an
// index, hence this handler.
export const dynamic = 'force-static'

export function GET() {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${SITEMAP_SECTIONS.map((s) => `  <sitemap>
    <loc>${BASE_URL}/sitemaps/${s}.xml</loc>
    <lastmod>${sectionLastModified(s).toISOString()}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>
`
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } })
}

import { BASE_URL } from './site'
import { CATEGORIES, CATEGORY_PATH, SERVICES, servicePath } from './services'
import { LIVE_CALCULATORS } from './calculators'
import { DEADLINES } from './due-dates'
import { GUIDES, CLUSTERS, guidesIn, guidePath } from './guides'
import { publishedExperts } from './experts'
import { REFERENCE, referencePath } from './reference'

// One source of truth for "which URLs exist and when did they change". The
// grouped sitemaps, the sitemap index, IndexNow and llms.txt all read this,
// so a new registry entry surfaces everywhere at once.
//
// Honest lastmod: evergreen pages carry STATIC_DATE, bumped only on a real
// edit. Guides use their own dateModified; due-date pages their lastVerified.
// Restamping everything per deploy makes Google ignore lastmod entirely.
export const STATIC_DATE = new Date('2026-09-13')

export type Entry = {
  url: string
  lastModified: Date
  changeFrequency: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly'
  priority: number
}

export const SITEMAP_SECTIONS = ['pages', 'services', 'guides', 'calculators', 'due-dates', 'reference'] as const
export type SitemapSection = (typeof SITEMAP_SECTIONS)[number]

const u = (p: string) => `${BASE_URL}${p}`

export function sitemapEntries(section: SitemapSection): Entry[] {
  switch (section) {
    case 'pages':
      return [
        { url: u(''), lastModified: STATIC_DATE, changeFrequency: 'weekly', priority: 1 },
        { url: u('/services'), lastModified: STATIC_DATE, changeFrequency: 'weekly', priority: 0.9 },
        { url: u('/pricing'), lastModified: STATIC_DATE, changeFrequency: 'weekly', priority: 0.9 },
        { url: u('/consult'), lastModified: STATIC_DATE, changeFrequency: 'monthly', priority: 0.8 },
        { url: u('/calculators'), lastModified: STATIC_DATE, changeFrequency: 'monthly', priority: 0.8 },
        { url: u('/guides'), lastModified: STATIC_DATE, changeFrequency: 'weekly', priority: 0.8 },
        { url: u('/due-dates'), lastModified: STATIC_DATE, changeFrequency: 'weekly', priority: 0.8 },
        { url: u('/experts'), lastModified: STATIC_DATE, changeFrequency: 'monthly', priority: 0.6 },
        ...publishedExperts().map((e) => ({ url: u(`/experts/${e.slug}`), lastModified: STATIC_DATE, changeFrequency: 'monthly' as const, priority: 0.5 })),
        { url: u('/about'), lastModified: STATIC_DATE, changeFrequency: 'monthly', priority: 0.5 },
        { url: u('/contact'), lastModified: STATIC_DATE, changeFrequency: 'yearly', priority: 0.5 },
        { url: u('/trust'), lastModified: STATIC_DATE, changeFrequency: 'yearly', priority: 0.4 },
        ...['/privacy-policy', '/terms', '/refund-policy', '/cancellation-policy', '/data-deletion', '/disclaimer'].map((p) => ({ url: u(p), lastModified: STATIC_DATE, changeFrequency: 'yearly' as const, priority: 0.2 })),
      ]
    case 'services':
      return [
        ...CATEGORIES.map((c) => ({ url: u(CATEGORY_PATH[c.id]), lastModified: STATIC_DATE, changeFrequency: 'weekly' as const, priority: 0.9 })),
        ...SERVICES.map((s) => ({ url: u(servicePath(s)), lastModified: STATIC_DATE, changeFrequency: 'monthly' as const, priority: s.popular ? 0.85 : 0.7 })),
      ]
    case 'guides':
      return [
        ...CLUSTERS.filter((c) => guidesIn(c.id).length > 0).map((c) => ({ url: u(`/guides/${c.id}`), lastModified: STATIC_DATE, changeFrequency: 'weekly' as const, priority: 0.6 })),
        ...GUIDES.map((g) => ({ url: u(guidePath(g)), lastModified: new Date(g.dateModified), changeFrequency: 'monthly' as const, priority: 0.75 })),
      ]
    case 'calculators':
      return LIVE_CALCULATORS.map((c) => ({ url: u(`/calculators/${c.slug}`), lastModified: STATIC_DATE, changeFrequency: 'monthly' as const, priority: 0.85 }))
    case 'due-dates':
      return DEADLINES.map((d) => ({ url: u(`/due-dates/${d.slug}`), lastModified: new Date(d.lastVerified), changeFrequency: 'weekly' as const, priority: 0.8 }))
    case 'reference':
      return [
        { url: u('/sections'), lastModified: STATIC_DATE, changeFrequency: 'weekly', priority: 0.7 },
        { url: u('/forms'), lastModified: STATIC_DATE, changeFrequency: 'weekly', priority: 0.7 },
        ...REFERENCE.map((r) => ({ url: u(referencePath(r)), lastModified: new Date(r.dateModified), changeFrequency: 'monthly' as const, priority: 0.75 })),
      ]
  }
}

export function allEntries(): Entry[] {
  return SITEMAP_SECTIONS.flatMap((s) => sitemapEntries(s))
}

export function sectionLastModified(section: SitemapSection): Date {
  return sitemapEntries(section).reduce((max, e) => (e.lastModified > max ? e.lastModified : max), new Date(0))
}

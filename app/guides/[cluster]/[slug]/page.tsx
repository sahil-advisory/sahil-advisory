import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Clock, RefreshCw, ShieldCheck } from 'lucide-react'
import { buildMetadata, breadcrumbJsonLd, graph, ORG_ID } from '@/app/lib/seo'
import { BASE_URL } from '@/app/lib/site'
import { GUIDES, CLUSTERS, getGuide, getGuideBySlug, guidePath } from '@/app/lib/guides'
import { getService, servicePath } from '@/app/lib/services'
import { LIVE_CALCULATORS } from '@/app/lib/calculators'
import { REVIEWER } from '@/app/lib/experts'
import { formatDateIN } from '@/app/lib/format'
import JsonLd from '@/app/components/JsonLd'
import FaqJsonLd from '@/app/components/FaqJsonLd'
import GuideContent, { headingId } from '@/app/components/GuideContent'
import CallbackForm from '@/app/components/CallbackForm'
import RelatedReference from '@/app/components/reference/RelatedReference'
import { Container, Breadcrumbs, FaqAccordion, CtaBand, Badge } from '@/app/components/ui'
import { GuideCard, CalculatorCard, PlanCard } from '@/app/components/cards'

type Params = { cluster: string; slug: string }

export function generateStaticParams(): Params[] {
  return GUIDES.map((g) => ({ cluster: g.cluster, slug: g.slug }))
}
export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { cluster, slug } = await params
  const g = getGuide(cluster, slug)
  if (!g) return {}
  return buildMetadata({ title: g.metaTitle, description: g.metaDescription, path: guidePath(g), keywords: g.keywords, type: 'article', publishedTime: g.datePublished, modifiedTime: g.dateModified })
}

function wordCount(g: NonNullable<ReturnType<typeof getGuideBySlug>>) {
  const text = g.sections
    .map((s) => {
      switch (s.type) {
        case 'heading': return s.text
        case 'paragraph': return s.text
        case 'list': return s.items.join(' ')
        case 'table': return s.rows.flat().join(' ')
        case 'callout': return `${s.title ?? ''} ${s.text}`
        case 'key-takeaways': return s.items.join(' ')
        case 'example': return s.lines.map((l) => `${l.label} ${l.value}`).join(' ')
        default: return ''
      }
    })
    .join(' ')
  return text.split(/\s+/).filter(Boolean).length
}

export default async function GuidePage({ params }: { params: Promise<Params> }) {
  const { cluster, slug } = await params
  const g = getGuide(cluster, slug)
  if (!g) notFound()
  const path = guidePath(g)
  const clusterDef = CLUSTERS.find((c) => c.id === g.cluster)!
  const service = getService(g.relatedServiceSlug)
  const related = g.relatedGuides.map((s) => getGuideBySlug(s)).filter((x): x is NonNullable<typeof x> => Boolean(x)).slice(0, 3)
  const calcs = LIVE_CALCULATORS.filter((c) => g.relatedCalculators.includes(c.slug)).slice(0, 2)
  const toc = g.sections.filter((s): s is Extract<typeof s, { type: 'heading' }> => s.type === 'heading')

  const jsonLd = graph(
    {
      '@type': 'Article',
      '@id': `${BASE_URL}${path}#article`,
      headline: g.h1,
      description: g.metaDescription,
      url: `${BASE_URL}${path}`,
      mainEntityOfPage: `${BASE_URL}${path}`,
      datePublished: g.datePublished,
      dateModified: g.dateModified,
      wordCount: wordCount(g),
      inLanguage: 'en-IN',
      articleSection: clusterDef.name,
      keywords: g.keywords.join(', '),
      author: { '@id': ORG_ID },
      publisher: { '@id': ORG_ID },
      reviewedBy: { '@type': 'Person', name: REVIEWER.name, jobTitle: REVIEWER.title, url: `${BASE_URL}/experts/${REVIEWER.slug}` },
    },
    breadcrumbJsonLd([{ name: 'Guides', path: '/guides' }, { name: clusterDef.name, path: `/guides/${g.cluster}` }, { name: g.title, path }], path)
  )

  return (
    <>
      <JsonLd data={jsonLd} />
      <FaqJsonLd faqs={g.faqs} />
      <Container className="py-8 lg:py-12">
        <Breadcrumbs crumbs={[{ name: 'Guides', path: '/guides' }, { name: clusterDef.name, path: `/guides/${g.cluster}` }, { name: g.title, path }]} />
        <div className="mt-6 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <article className="min-w-0">
            <header>
              <Badge tone="navy">{clusterDef.name}</Badge>
              <h1 className="mt-3 text-3xl font-extrabold leading-[1.1] tracking-tight text-navy-900 sm:text-4xl lg:text-[2.6rem]">{g.h1}</h1>
              <p className="mt-4 text-lg leading-relaxed text-text-2">{g.excerpt}</p>
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-border py-3 text-xs text-muted">
                {/* REVIEWER.name already carries the credential prefix ("CMA Sahil"),
                    so the qualification is spelled out here instead of repeating it. */}
                <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-green-600" /> Reviewed by <Link href={`/experts/${REVIEWER.slug}`} className="font-semibold text-navy-900 hover:text-green-700">{REVIEWER.name}</Link>, Cost and Management Accountant</span>
                <span className="flex items-center gap-1.5"><RefreshCw className="h-4 w-4 text-green-600" /> Updated {formatDateIN(g.dateModified)}</span>
                <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-green-600" /> {g.readMinutes} min read</span>
              </div>
            </header>

            {toc.length > 3 && (
              <nav aria-label="Contents" className="mt-6 rounded-2xl border border-border bg-bg-alt p-5 lg:hidden">
                <p className="text-xs font-bold uppercase tracking-wider text-muted">In this guide</p>
                <ol className="mt-2 space-y-1 text-sm">
                  {toc.map((h) => <li key={headingId(h)}><a href={`#${headingId(h)}`} className="text-navy-900 hover:text-green-700">{h.text}</a></li>)}
                </ol>
              </nav>
            )}

            <div className="mt-8">
              <GuideContent sections={g.sections} />
            </div>

            <div className="mt-12">
              <FaqAccordion faqs={g.faqs} title="Frequently asked questions" />
            </div>

            {related.length > 0 && (
              <section className="mt-12">
                <h2 className="text-xl font-bold text-navy-900">Read next</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  {related.map((r) => <GuideCard key={r.slug} guide={r} />)}
                </div>
              </section>
            )}

            <RelatedReference guide={g.slug} />

            <p className="mt-8 text-xs leading-relaxed text-muted">
              This guide is general information for FY 2025-26 and is not professional advice. Your assigned expert advises on your specific facts. <Link href="/disclaimer" className="underline">Disclaimer</Link>
            </p>
          </article>

          <aside className="space-y-6 lg:sticky lg:top-24">
            {toc.length > 3 && (
              <nav aria-label="Contents" className="hidden rounded-2xl border border-border bg-card p-5 lg:block">
                <p className="text-xs font-bold uppercase tracking-wider text-muted">In this guide</p>
                <ol className="mt-3 space-y-1.5 text-sm">
                  {toc.map((h) => <li key={headingId(h)}><a href={`#${headingId(h)}`} className="block text-text-2 hover:text-green-700">{h.text}</a></li>)}
                </ol>
              </nav>
            )}
            {service && <PlanCard service={service} compact />}
            {calcs.map((c) => <CalculatorCard key={c.slug} calc={c} />)}
            <CallbackForm compact service={service?.name ?? g.title} title="Ask an expert about this" />
          </aside>
        </div>
        <div className="mt-16">
          <CtaBand title="Want this done for you?" desc={service ? `${service.name} from a qualified professional, with a draft for your approval before anything is filed.` : undefined} primary={service ? { label: `View ${service.name}`, href: servicePath(service) } : undefined} />
        </div>
        <p className="mt-6 text-sm"><Link href="/guides" className="inline-flex items-center gap-1 font-semibold text-green-700">All guides <ArrowRight className="h-4 w-4" /></Link></p>
      </Container>
    </>
  )
}

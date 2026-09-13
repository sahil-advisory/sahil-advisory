import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { buildMetadata, breadcrumbJsonLd, graph, webPageJsonLd } from '@/app/lib/seo'
import { BASE_URL } from '@/app/lib/site'
import { GUIDES, CLUSTERS, guidesIn, guidePath } from '@/app/lib/guides'
import { REVIEWER } from '@/app/lib/experts'
import JsonLd from '@/app/components/JsonLd'
import { Container, Breadcrumbs, SectionHeading, CtaBand } from '@/app/components/ui'
import { GuideCard } from '@/app/components/cards'
import { midSentence } from '@/app/lib/format'

export const metadata: Metadata = buildMetadata({
  title: 'Tax Guides | ITR, GST, TDS and Tax Saving Explained',
  description: 'Plain-English guides to Indian income tax and GST with worked examples for FY 2025-26: which ITR form, old vs new regime, capital gains, F&O taxation, GST returns, TDS, notices and the Income-tax Act 2025.',
  path: '/guides',
  keywords: ['income tax guide india', 'itr filing guide', 'gst guide', 'tax saving guide', 'capital gains guide', 'tds guide'],
})

export default function GuidesHub() {
  return (
    <>
      <JsonLd
        data={graph(
          { ...webPageJsonLd({ path: '/guides', name: 'Tax guides', description: metadata.description as string }), '@type': 'CollectionPage' },
          breadcrumbJsonLd([{ name: 'Guides', path: '/guides' }], '/guides'),
          { '@type': 'ItemList', '@id': `${BASE_URL}/guides#list`, itemListElement: GUIDES.map((g, i) => ({ '@type': 'ListItem', position: i + 1, name: g.title, url: `${BASE_URL}${guidePath(g)}` })) }
        )}
      />
      <Container className="py-10 lg:py-16">
        <Breadcrumbs crumbs={[{ name: 'Guides', path: '/guides' }]} />
        <div className="mt-6">
          <SectionHeading align="left" eyebrow="Guides" title="Tax, explained with numbers." emphasis={`Reviewed by ${REVIEWER.name}.`} desc="Every guide uses current-year rules, shows a worked example and links to the calculator and the service that finish the job. Updated whenever the law or a date changes." />
        </div>
        <div className="mt-12 space-y-14">
          {CLUSTERS.map((c) => {
            const items = guidesIn(c.id)
            if (!items.length) return null
            return (
              <section key={c.id} id={c.id}>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-extrabold tracking-tight text-navy-900">{c.name}</h2>
                    <p className="mt-1 text-sm text-text-2">{c.description}</p>
                  </div>
                  <Link href={`/guides/${c.id}`} className="shrink-0 text-sm font-semibold text-green-700 hover:underline">All {midSentence(c.name)} →</Link>
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items.slice(0, 3).map((g) => <GuideCard key={g.slug} guide={g} />)}
                </div>
              </section>
            )
          })}
        </div>
        <div className="mt-16">
          <CtaBand title="Read enough? Let an expert take it from here." desc="Every guide ends with the service that completes the task. Or ask your question on a 30-minute call for ₹499." primary={{ label: 'See services', href: '/services' }} />
        </div>
        <p className="mt-6 text-sm"><Link href="/calculators" className="inline-flex items-center gap-1 font-semibold text-green-700">Try the calculators <ArrowRight className="h-4 w-4" /></Link></p>
      </Container>
    </>
  )
}

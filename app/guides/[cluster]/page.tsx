import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildMetadata, breadcrumbJsonLd, graph, webPageJsonLd } from '@/app/lib/seo'
import { BASE_URL } from '@/app/lib/site'
import { CLUSTERS, guidesIn, guidePath } from '@/app/lib/guides'
import type { ClusterId } from '@/app/lib/guides/types'
import JsonLd from '@/app/components/JsonLd'
import { Container, Breadcrumbs, SectionHeading, CtaBand } from '@/app/components/ui'
import { GuideCard } from '@/app/components/cards'

type Params = { cluster: string }

export function generateStaticParams(): Params[] {
  return CLUSTERS.filter((c) => guidesIn(c.id).length > 0).map((c) => ({ cluster: c.id }))
}
export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { cluster } = await params
  const c = CLUSTERS.find((x) => x.id === cluster)
  if (!c) return {}
  return buildMetadata({ title: `${c.name} Guides | Sahil Advisory`, description: `${c.description} Worked examples for FY 2025-26, reviewed by a qualified professional.`.slice(0, 160), path: `/guides/${c.id}` })
}

export default async function ClusterPage({ params }: { params: Promise<Params> }) {
  const { cluster } = await params
  const c = CLUSTERS.find((x) => x.id === cluster)
  if (!c) notFound()
  const items = guidesIn(c.id as ClusterId)
  const path = `/guides/${c.id}`
  return (
    <>
      <JsonLd
        data={graph(
          { ...webPageJsonLd({ path, name: `${c.name} guides`, description: c.description }), '@type': 'CollectionPage' },
          breadcrumbJsonLd([{ name: 'Guides', path: '/guides' }, { name: c.name, path }], path),
          { '@type': 'ItemList', '@id': `${BASE_URL}${path}#list`, itemListElement: items.map((g, i) => ({ '@type': 'ListItem', position: i + 1, name: g.title, url: `${BASE_URL}${guidePath(g)}` })) }
        )}
      />
      <Container className="py-10 lg:py-16">
        <Breadcrumbs crumbs={[{ name: 'Guides', path: '/guides' }, { name: c.name, path }]} />
        <div className="mt-6"><SectionHeading align="left" eyebrow="Guides" title={c.name} desc={c.description} /></div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((g) => <GuideCard key={g.slug} guide={g} />)}
        </div>
        <div className="mt-16"><CtaBand /></div>
      </Container>
    </>
  )
}

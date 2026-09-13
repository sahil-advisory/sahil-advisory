import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildMetadata, breadcrumbJsonLd, graph, ORG_ID } from '@/app/lib/seo'
import { BASE_URL } from '@/app/lib/site'
import { referenceOf, getReference, referencePath, KIND_LABEL } from '@/app/lib/reference'
import { REVIEWER } from '@/app/lib/experts'
import JsonLd from '@/app/components/JsonLd'
import FaqJsonLd from '@/app/components/FaqJsonLd'
import ReferencePageView from '@/app/components/reference/ReferencePage'

type Params = { slug: string }

export function generateStaticParams(): Params[] {
  return referenceOf('form').map((r) => ({ slug: r.slug }))
}
export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const r = getReference('form', slug)
  if (!r) return {}
  return buildMetadata({ title: r.metaTitle, description: r.metaDescription, path: referencePath(r), keywords: r.keywords, type: 'article', publishedTime: r.datePublished, modifiedTime: r.dateModified })
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const r = getReference('form', slug)
  if (!r) notFound()
  const path = referencePath(r)
  const label = KIND_LABEL.form
  return (
    <>
      <JsonLd
        data={graph(
          {
            '@type': 'Article',
            '@id': `${BASE_URL}${path}#article`,
            headline: r.h1,
            description: r.metaDescription,
            url: `${BASE_URL}${path}`,
            mainEntityOfPage: `${BASE_URL}${path}`,
            datePublished: r.datePublished,
            dateModified: r.dateModified,
            inLanguage: 'en-IN',
            articleSection: r.group,
            keywords: r.keywords.join(', '),
            author: { '@id': ORG_ID },
            publisher: { '@id': ORG_ID },
            reviewedBy: { '@type': 'Person', name: REVIEWER.name, jobTitle: REVIEWER.title, url: `${BASE_URL}/experts/${REVIEWER.slug}` },
            about: { '@type': 'DefinedTerm', name: r.name, description: r.summary, inDefinedTermSet: `${BASE_URL}/forms` },
          },
          breadcrumbJsonLd([{ name: label.plural, path: '/forms' }, { name: r.name, path }], path)
        )}
      />
      <FaqJsonLd faqs={r.faqs} />
      <ReferencePageView page={r} />
    </>
  )
}

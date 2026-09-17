import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { buildMetadata, breadcrumbJsonLd, graph, ORG_ID } from '@/app/lib/seo'
import { BASE_URL } from '@/app/lib/site'
import { publishedExperts, getExpert } from '@/app/lib/experts'
import { GUIDES, guidePath } from '@/app/lib/guides'
import JsonLd from '@/app/components/JsonLd'
import { Container, Breadcrumbs, Badge, CtaBand } from '@/app/components/ui'
import { GuideCard, expertInitials } from '@/app/components/cards'

type Params = { slug: string }

export function generateStaticParams(): Params[] {
  return publishedExperts().map((e) => ({ slug: e.slug }))
}
export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const e = getExpert(slug)
  if (!e) return {}
  return buildMetadata({ title: `${e.name}, ${e.credential} | ${e.years}+ years in tax`, description: e.bio.slice(0, 160), path: `/experts/${e.slug}` })
}

export default async function ExpertPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const e = getExpert(slug)
  if (!e) notFound()
  const path = `/experts/${e.slug}`
  const reviewed = GUIDES.slice(0, 6)
  return (
    <>
      <JsonLd
        data={graph(
          {
            '@type': 'Person',
            '@id': `${BASE_URL}${path}#person`,
            name: e.name,
            jobTitle: e.title,
            url: `${BASE_URL}${path}`,
            worksFor: { '@id': ORG_ID },
            knowsAbout: e.knowsAbout,
            knowsLanguage: e.languages,
            hasCredential: { '@type': 'EducationalOccupationalCredential', credentialCategory: 'Professional certification', name: e.credentialLabel },
            description: e.bio,
          },
          breadcrumbJsonLd([{ name: 'Experts', path: '/experts' }, { name: e.name, path }], path)
        )}
      />
      <Container className="py-10 lg:py-16">
        <Breadcrumbs crumbs={[{ name: 'Experts', path: '/experts' }, { name: e.name, path }]} />
        <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-card)]">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-navy-900 text-2xl font-bold text-white">{expertInitials(e.name)}</div>
            <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-navy-900">{e.name}</h1>
            <p className="mt-1 text-sm text-text-2">{e.title}</p>
            <div className="mt-3 flex flex-wrap gap-2"><Badge tone="navy">{e.credentialLabel}</Badge><Badge tone="green">{e.years}+ years</Badge>{e.qualifications.filter((q) => q !== e.credential).map((q) => <Badge key={q} tone="muted">{q}</Badge>)}</div>
            <dl className="mt-6 space-y-4 text-sm">
              <div><dt className="text-xs font-bold uppercase tracking-wider text-muted">Specialisations</dt><dd className="mt-1 text-text-2">{e.specialisations.join(' · ')}</dd></div>
              <div><dt className="text-xs font-bold uppercase tracking-wider text-muted">Languages</dt><dd className="mt-1 text-text-2">{e.languages.join(', ')}</dd></div>
            </dl>
            <Link href="/consult" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-700">Book a call <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div>
            <h2 className="text-xl font-bold text-navy-900">About</h2>
            <p className="mt-3 leading-relaxed text-text-2">{e.bio}</p>
            {reviewed.length > 0 && (
              <>
                <h2 className="mt-10 text-xl font-bold text-navy-900">Guides reviewed by {e.name}</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {reviewed.map((g) => <GuideCard key={g.slug} guide={g} />)}
                </div>
                <Link href="/guides" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-green-700">All guides <ArrowRight className="h-4 w-4" /></Link>
              </>
            )}
            <p className="sr-only">{reviewed.map((g) => guidePath(g)).join(' ')}</p>
          </div>
        </div>
        <div className="mt-16"><CtaBand /></div>
      </Container>
    </>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, RefreshCw } from 'lucide-react'
import { buildMetadata, breadcrumbJsonLd, graph, ORG_ID } from '@/app/lib/seo'
import { BASE_URL } from '@/app/lib/site'
import { LIVE_CALCULATORS, getCalculator } from '@/app/lib/calculators'
import { getService, servicePath } from '@/app/lib/services'
import { GUIDES } from '@/app/lib/guides'
import { REVIEWER } from '@/app/lib/experts'
import { CALCULATOR_COMPONENTS } from '@/app/components/calculators'
import JsonLd from '@/app/components/JsonLd'
import FaqJsonLd from '@/app/components/FaqJsonLd'
import CalculatorTracker from '@/app/components/CalculatorTracker'
import RelatedReference from '@/app/components/reference/RelatedReference'
import TrackedLink from '@/app/components/TrackedLink'
import { ArrowRight as ArrowRightIcon } from 'lucide-react'
import { Container, Breadcrumbs, FaqAccordion } from '@/app/components/ui'
import { CalculatorCard, GuideCard } from '@/app/components/cards'

type Params = { slug: string }

export function generateStaticParams(): Params[] {
  return LIVE_CALCULATORS.map((c) => ({ slug: c.slug }))
}
export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const c = getCalculator(slug)
  if (!c) return {}
  return buildMetadata({ title: c.metaTitle, description: c.metaDescription, path: `/calculators/${c.slug}`, keywords: c.keywords })
}

export default async function CalculatorPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const c = getCalculator(slug)
  if (!c) notFound()
  const Tool = CALCULATOR_COMPONENTS[c.slug]
  const path = `/calculators/${c.slug}`
  const service = getService(c.relatedServiceSlug)
  const related = LIVE_CALCULATORS.filter((x) => c.related.includes(x.slug)).slice(0, 3)
  const guides = GUIDES.filter((g) => g.relatedCalculators.includes(c.slug)).slice(0, 3)

  const jsonLd = graph(
    {
      '@type': 'WebApplication',
      '@id': `${BASE_URL}${path}#webapp`,
      name: c.name,
      url: `${BASE_URL}${path}`,
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Any',
      browserRequirements: 'Requires JavaScript',
      description: c.metaDescription,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
      publisher: { '@id': ORG_ID },
      inLanguage: 'en-IN',
    },
    breadcrumbJsonLd([{ name: 'Calculators', path: '/calculators' }, { name: c.name, path }], path)
  )

  return (
    <>
      <JsonLd data={jsonLd} />
      <FaqJsonLd faqs={c.faqs} />
      <Container className="py-8 lg:py-12">
        <Breadcrumbs crumbs={[{ name: 'Calculators', path: '/calculators' }, { name: c.name, path }]} />
        <header className="mt-6 max-w-3xl">
          <h1 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-navy-900 sm:text-4xl">{c.h1}</h1>
          <p className="mt-4 text-base leading-relaxed text-text-2">{c.intro}</p>
          <p className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
            <RefreshCw className="h-3.5 w-3.5" /> Updated for {c.updatedFor} · Reviewed by {REVIEWER.name}
          </p>
        </header>

        <div className="mt-8">
          {Tool ? <CalculatorTracker slug={c.slug}><Tool /></CalculatorTracker> : <p className="rounded-xl border border-border bg-bg-alt p-6 text-sm text-muted">This calculator is being finalised.</p>}
        </div>

        {service && (
          <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-green-100 bg-green-50 p-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-base font-bold text-navy-900">{c.ctaText}</p>
              <p className="mt-1 text-sm text-text-2">{service.name}: {service.shortDesc}</p>
            </div>
            <TrackedLink event="calculator_cta_click" props={{ calculator: c.slug, plan: service.slug }} href={servicePath(service)} className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-700">View plan <ArrowRightIcon className="h-4 w-4" aria-hidden /></TrackedLink>
          </div>
        )}

        {c.sections.length > 0 && (
          <article className="prose-tax mt-14 max-w-3xl">
            {c.sections.map((s) => (
              <section key={s.heading}>
                <h2>{s.heading}</h2>
                {s.paragraphs?.map((p, i) => <p key={i}>{p}</p>)}
                {s.bullets && (
                  <ul>
                    {s.bullets.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                )}
                {s.table && (
                  <div className="my-4 overflow-x-auto rounded-xl border border-border">
                    <table className="w-full text-sm">
                      <thead className="bg-bg-alt text-left text-xs font-bold uppercase tracking-wider text-muted">
                        <tr>{s.table.head.map((h) => <th key={h} className="px-4 py-2.5">{h}</th>)}</tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {s.table.rows.map((r, i) => (
                          <tr key={i}>{r.map((cell, j) => <td key={j} className={`px-4 py-2.5 ${j > 0 ? 'font-mono tabular' : 'text-text-2'}`}>{cell}</td>)}</tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            ))}
          </article>
        )}

        {(related.length > 0 || guides.length > 0) && (
          <section className="mt-14">
            <h2 className="text-xl font-bold text-navy-900">Related tools and guides</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => <CalculatorCard key={r.slug} calc={r} />)}
              {guides.map((g) => <GuideCard key={g.slug} guide={g} />)}
            </div>
          </section>
        )}

        <RelatedReference calculator={c.slug} title="The rules behind this calculator" />

        <div className="mt-14">
          <FaqAccordion faqs={c.faqs} title={`${c.name}: questions`} />
        </div>
        <p className="mt-8 text-xs leading-relaxed text-muted">
          This calculator gives an estimate based on the rules in force for {c.updatedFor}. It does not account for every deduction, exemption or special case. Your assigned expert computes the final figures from your documents before anything is filed. <Link href="/disclaimer" className="underline">Disclaimer</Link>
          <Link href="/calculators" className="ml-3 inline-flex items-center gap-1 font-semibold text-green-700">All calculators <ArrowRight className="h-3 w-3" /></Link>
        </p>
      </Container>
    </>
  )
}

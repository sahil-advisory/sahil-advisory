import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Star, ArrowRight } from 'lucide-react'
import { buildMetadata, breadcrumbJsonLd, graph, webPageJsonLd, ORG_ID } from '@/app/lib/seo'
import { BASE_URL, SITE } from '@/app/lib/site'
import { CATEGORIES, CATEGORY_PATH, getCategory, servicesIn, servicePath, type ServiceCategoryId } from '@/app/lib/services'
import { deadlineItems } from '@/app/lib/deadline-items'
import { publishedExperts } from '@/app/lib/experts'
import { TESTIMONIALS } from '@/app/lib/testimonials'
import { GUIDES, guidePath } from '@/app/lib/guides'
import JsonLd from '@/app/components/JsonLd'
import FaqJsonLd from '@/app/components/FaqJsonLd'
import DeadlineWidget from '@/app/components/DeadlineWidget'
import CallbackForm from '@/app/components/CallbackForm'
import PlanFinder from '@/app/components/PlanFinder'
import { Container, Breadcrumbs, TrustStrip, ProcessSteps, SectionHeading, FaqAccordion, CtaBand, Button } from '@/app/components/ui'
import { PlanCard, ExpertCard, TestimonialCard } from '@/app/components/cards'
import { midSentence } from '@/app/lib/format'

type Params = { category: string }

export function generateStaticParams(): Params[] {
  return CATEGORIES.map((c) => ({ category: c.id }))
}
export const dynamicParams = false
// Deadline countdown data is computed on the server; refresh hourly.
export const revalidate = 3600

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { category } = await params
  const c = getCategory(category)
  if (!c) return {}
  return buildMetadata({ title: c.metaTitle, description: c.metaDescription, path: CATEGORY_PATH[c.id], keywords: c.keywords })
}

const CALLBACK_OPTIONS: Record<ServiceCategoryId, { label: string; values: string[] }> = {
  itr: { label: 'Income source', values: ['Salary / pension', 'Capital gains', 'F&O / intraday', 'Freelance / business', 'NRI', 'Not sure'] },
  gst: { label: 'Turnover', values: ['Not registered yet', 'Up to ₹1.5 Cr', '₹1.5 to 5 Cr', 'Above ₹5 Cr'] },
  tds: { label: 'Return type', values: ['Monthly deposit', 'Quarterly 24Q / 26Q', 'Correction', 'Property 26QB'] },
  registrations: { label: 'Registration', values: ['Pvt Ltd / LLP / OPC', 'MSME / IEC / DSC', 'GST / TAN / PAN', 'Bank loan report', 'Not sure'] },
  notices: { label: 'Notice type', values: ['Income tax 143(1) / 139(9)', 'Scrutiny / reassessment', 'GST notice', 'TDS default', 'Not sure'] },
  audit: { label: 'Audit type', values: ['Tax audit 44AB', 'Statutory audit', 'Cost audit', 'Internal audit', 'Stock audit', 'Not sure'] },
}

export default async function CategoryPage({ params }: { params: Promise<Params> }) {
  const { category } = await params
  const c = getCategory(category)
  if (!c) notFound()
  const path = CATEGORY_PATH[c.id]
  const services = servicesIn(c.id)
  const priced = services.filter((s) => s.price !== null && s.price > 0)
  const minPrice = priced.length ? Math.min(...priced.map((s) => s.price as number)) : null
  const deadlines = deadlineItems(c.deadlineKeys)
  const guides = GUIDES.filter((g) => services.some((s) => s.relatedGuides?.includes(g.slug))).slice(0, 3)
  const names = Object.fromEntries(services.map((s) => [s.slug, s.name]))
  const priority = services.map((s) => s.slug)
  const finder = c.finder?.filter((f) => names[f.slug])

  const jsonLd = graph(
    webPageJsonLd({ path, name: c.metaTitle, description: c.metaDescription }),
    breadcrumbJsonLd([{ name: 'Services', path: '/services' }, { name: c.navLabel, path }], path),
    {
      '@type': 'Service',
      '@id': `${BASE_URL}${path}#service`,
      name: c.name,
      serviceType: c.name,
      provider: { '@id': ORG_ID },
      areaServed: { '@type': 'Country', name: 'India' },
      description: c.metaDescription,
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: `${c.navLabel} plans`,
        itemListElement: priced.map((s) => ({
          '@type': 'Offer',
          name: s.name,
          url: `${BASE_URL}${servicePath(s)}`,
          price: s.price,
          priceCurrency: 'INR',
          priceValidUntil: '2027-03-31',
          availability: 'https://schema.org/InStock',
        })),
      },
    }
  )

  return (
    <>
      <JsonLd data={jsonLd} />
      <FaqJsonLd faqs={c.faqs} />

      <section className="bg-[linear-gradient(to_bottom,_#ffffff,_var(--bg-alt))]">
        <Container className="py-8 lg:py-12">
          <Breadcrumbs crumbs={[{ name: 'Services', path: '/services' }, { name: c.navLabel, path }]} />
          <div className="mt-6 grid items-start gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
            <div>
              <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-navy-900 sm:text-5xl">
                {c.headline} <span className="text-green-600">{c.headlineEmphasis}</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-text-2">{c.intro}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href="#plans" size="lg" icon>Choose my plan</Button>
                {minPrice !== null && <span className="self-center font-mono text-sm text-text-2">from ₹{minPrice.toLocaleString('en-IN')} + GST</span>}
              </div>
              <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-6">
                <div><dt className="text-xs text-muted">Returns filed</dt><dd className="font-mono text-2xl font-bold text-navy-900">{SITE.returnsFiled}+</dd></div>
                <div><dt className="text-xs text-muted">On-time</dt><dd className="font-mono text-2xl font-bold text-navy-900">100%</dd></div>
                <div><dt className="text-xs text-muted">Google rating</dt><dd className="flex items-center gap-1 font-mono text-2xl font-bold text-navy-900">{SITE.googleRating.toFixed(1)} <Star className="h-4 w-4 fill-gold-600 text-gold-600" /></dd></div>
              </dl>
            </div>
            <div className="space-y-4 lg:pl-4">
              {deadlines.length > 0 && <DeadlineWidget items={deadlines} />}
              <CallbackForm compact service={c.navLabel} title="Get a free callback from a tax expert" options={CALLBACK_OPTIONS[c.id]} />
            </div>
          </div>
        </Container>
      </section>

      <TrustStrip items={c.trust} />

      <Container className="py-16 lg:py-20">
        <ProcessSteps steps={c.steps} title={`${c.navLabel} in 3 simple steps`} />
      </Container>

      <section className="bg-bg-alt py-16 lg:py-20">
        <Container>
          <SectionHeading eyebrow="Which plan is right for you?" title="Start from your situation" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {c.personas.map((p) => (
              <Link key={p.title} href={`${path}/${p.slug}`} className="group rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] hover:border-green-600">
                <p className="text-[11px] font-bold uppercase tracking-wider text-green-700">{p.forms}</p>
                <h3 className="mt-2 text-base font-bold text-navy-900 group-hover:text-green-700">{p.title}</h3>
                <p className="mt-1 text-sm text-text-2">{p.desc}</p>
                <p className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-navy-900">View plan <ArrowRight className="h-4 w-4" /></p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section id="plans" className="py-16 lg:py-20">
        <Container>
          <SectionHeading eyebrow="Plans and prices" title={`${c.navLabel} plans`} desc="Prices exclude 18% GST and include everything listed. Government fees, where applicable, are charged at actuals with receipts." />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <PlanCard key={s.slug} service={s} />
            ))}
          </div>
        </Container>
      </section>

      {finder && finder.length > 0 && (
        <Container className="pb-16 lg:pb-20">
          <PlanFinder title={`Find out which ${midSentence(c.navLabel)} plan you need`} subtitle="Select everything that applies. We recommend the right plan instantly." options={finder} basePath={path} priority={priority} names={names} />
        </Container>
      )}

      <section className="bg-bg-alt py-16 lg:py-20">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <div>
            <SectionHeading align="left" eyebrow="Your expert" title="You pick the plan." emphasis="A named professional does the work." desc="Every order shows who is handling it. Audit-tier work is delivered by empanelled Chartered Accountants." />
            <div className="mt-6 space-y-4">
              {publishedExperts().map((e) => (
                <ExpertCard key={e.slug} expert={e} />
              ))}
            </div>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">Clients</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {TESTIMONIALS.slice(0, 2).map((t) => (
                <TestimonialCard key={t.name} t={t} />
              ))}
            </div>
            {guides.length > 0 && (
              <div className="mt-8">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">Read before you file</p>
                <ul className="mt-3 divide-y divide-border rounded-2xl border border-border bg-card">
                  {guides.map((g) => (
                    <li key={g.slug}>
                      <Link href={guidePath(g)} className="flex items-center justify-between gap-3 px-4 py-3 text-sm font-semibold text-navy-900 hover:text-green-700">
                        {g.title} <ArrowRight className="h-4 w-4 shrink-0 text-muted" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Container>
      </section>

      <Container className="py-16 lg:py-20">
        <FaqAccordion faqs={c.faqs} title={`FAQ about ${midSentence(c.navLabel)}`} />
        <div className="mt-16">
          <CtaBand />
        </div>
      </Container>
    </>
  )
}

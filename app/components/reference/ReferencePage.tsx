import Link from 'next/link'
import { ArrowRight, Clock, RefreshCw, ShieldCheck, BookOpen } from 'lucide-react'
import type { ReferencePage as Ref } from '@/app/lib/reference/types'
import { referencePath, getReferenceBySlug, KIND_LABEL } from '@/app/lib/reference'
import { getService } from '@/app/lib/services'
import { LIVE_CALCULATORS } from '@/app/lib/calculators'
import { getGuideBySlug } from '@/app/lib/guides'
import { REVIEWER } from '@/app/lib/experts'
import { formatDateIN } from '@/app/lib/format'
import { SITE } from '@/app/lib/site'
import GuideContent from '@/app/components/GuideContent'
import CallbackForm from '@/app/components/CallbackForm'
import { Container, Breadcrumbs, FaqAccordion, CtaBand, Badge } from '@/app/components/ui'
import { PlanCard, CalculatorCard, GuideCard } from '@/app/components/cards'

// Shared template for /sections/* and /forms/*. Order is deliberate: the
// direct answer and the key facts come before anything else so the query is
// answered above the fold and Google has a clean snippet to lift.
export default function ReferencePageView({ page }: { page: Ref }) {
  const kind = KIND_LABEL[page.kind]
  const hub = `/${page.kind}s`
  const path = referencePath(page)
  const service = page.relatedServiceSlugs.map(getService).find(Boolean)
  const calcs = LIVE_CALCULATORS.filter((c) => page.relatedCalculatorSlugs.includes(c.slug)).slice(0, 2)
  const guides = page.relatedGuideSlugs.map(getGuideBySlug).filter((g): g is NonNullable<typeof g> => Boolean(g)).slice(0, 3)
  const siblings = page.relatedReferenceSlugs.map(getReferenceBySlug).filter((r): r is Ref => Boolean(r)).slice(0, 4)

  return (
    <Container className="py-8 lg:py-12">
      <Breadcrumbs crumbs={[{ name: kind.plural, path: hub }, { name: page.name, path }]} />
      <div className="mt-6 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <article className="min-w-0">
          <header>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="navy">{page.group}</Badge>
              {page.act2025 && <Badge tone="gold">Income-tax Act 2025: {page.act2025.newNumber}</Badge>}
            </div>
            <h1 className="mt-3 text-3xl font-extrabold leading-[1.1] tracking-tight text-navy-900 sm:text-4xl">{page.h1}</h1>
            {/* The snippet paragraph. Kept as a single <p> right after the H1 on purpose. */}
            <p className="mt-4 text-lg leading-relaxed text-text-2">{page.summary}</p>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-border py-3 text-xs text-muted">
              <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-green-600" /> Reviewed by <Link href={`/experts/${REVIEWER.slug}`} className="font-semibold text-navy-900 hover:text-green-700">{REVIEWER.name}</Link>, Cost and Management Accountant</span>
              <span className="flex items-center gap-1.5"><RefreshCw className="h-4 w-4 text-green-600" /> Updated {formatDateIN(page.dateModified)} for FY {SITE.currentFY}</span>
            </div>
          </header>

          <section className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
            <h2 className="bg-bg-alt px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-muted">Key facts, FY {SITE.currentFY}</h2>
            <dl className="divide-y divide-border">
              {page.keyFacts.map((f) => (
                <div key={f.label} className="grid grid-cols-[140px_1fr] gap-4 px-5 py-3 text-sm sm:grid-cols-[200px_1fr]">
                  <dt className="text-muted">{f.label}</dt>
                  <dd className="font-medium text-navy-900">{f.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          {page.act2025 && (
            <aside className="mt-6 rounded-2xl border border-amber-200 bg-gold-50 p-5 text-sm leading-relaxed">
              <p className="font-bold text-navy-900">Under the Income-tax Act 2025, from tax year 2026-27</p>
              <p className="mt-1 text-text-2">
                {page.name} becomes <strong className="text-navy-900">{page.act2025.newNumber}</strong>. The rule itself does not change; only the number does. Returns for AY {SITE.currentAY} still use the 1961 Act numbering.
                {page.act2025.status === 'reported' && ' This mapping is reported in secondary sources and should be verified against the notified Rules before you rely on it.'}
                {/* The template already states the 'reported' caveat; only print a note that adds something. */}
                {page.act2025.note && !/^reported in secondary sources/i.test(page.act2025.note) ? ` ${page.act2025.note}` : ''}
              </p>
              <Link href="/guides/income-tax-act-2025/income-tax-act-2025-what-changes" className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-green-700 hover:underline">What changes under the 2025 Act <ArrowRight className="h-4 w-4" /></Link>
            </aside>
          )}

          <div className="mt-8">
            <GuideContent sections={page.sections} />
          </div>

          <div className="mt-12">
            <FaqAccordion faqs={page.faqs} title={`${page.name}: questions`} />
          </div>

          {siblings.length > 0 && (
            <section className="mt-12">
              <h2 className="text-xl font-bold text-navy-900">Related {page.kind === 'section' ? 'sections and forms' : 'forms and sections'}</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {siblings.map((s) => (
                  <li key={s.slug}>
                    <Link href={referencePath(s)} className="group flex items-start gap-3 rounded-2xl border border-border bg-card p-4 hover:border-green-600">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-700"><BookOpen className="h-4 w-4" /></span>
                      <span>
                        <span className="block text-sm font-bold text-navy-900 group-hover:text-green-700">{s.name}</span>
                        <span className="mt-0.5 line-clamp-2 block text-xs text-text-2">{s.summary}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {guides.length > 0 && (
            <section className="mt-12">
              <h2 className="text-xl font-bold text-navy-900">Read next</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">{guides.map((g) => <GuideCard key={g.slug} guide={g} />)}</div>
            </section>
          )}

          <p className="mt-8 text-xs leading-relaxed text-muted">
            General information for FY {SITE.currentFY}, not professional advice. Limits and dates change with each Budget; the updated date above is when this page was last checked. <Link href="/disclaimer" className="underline">Disclaimer</Link>
          </p>
        </article>

        <aside className="space-y-6 lg:sticky lg:top-24">
          {service && <PlanCard service={service} compact />}
          {calcs.map((c) => <CalculatorCard key={c.slug} calc={c} />)}
          <CallbackForm compact service={page.name} title={`Ask about ${page.name}`} />
          <p className="flex items-center gap-1.5 text-xs text-muted"><Clock className="h-3.5 w-3.5" /> Callback within 2 working hours, Mon to Sat.</p>
        </aside>
      </div>
      <div className="mt-16">
        <CtaBand title={service ? `Want ${page.name} handled for you?` : 'Want this handled for you?'} desc={service ? `${service.name}: ${service.shortDesc}` : undefined} primary={service ? { label: `View ${service.name}`, href: `/services/${service.category}/${service.slug}` } : undefined} />
      </div>
      <p className="mt-6 text-sm"><Link href={hub} className="inline-flex items-center gap-1 font-semibold text-green-700">All {kind.plural.toLowerCase()} <ArrowRight className="h-4 w-4" /></Link></p>
    </Container>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { buildMetadata, breadcrumbJsonLd, graph, ORG_ID } from '@/app/lib/seo'
import { BASE_URL } from '@/app/lib/site'
import { DEADLINES, getDeadlineBySlug, nextDueFor, nextPeriodLabel, periodSchedule } from '@/app/lib/due-dates'
import { formatDateIN, formatINR } from '@/app/lib/format'
import { getService, servicePath, unitSuffix } from '@/app/lib/services'
import { REVIEWER } from '@/app/lib/experts'
import JsonLd from '@/app/components/JsonLd'
import FaqJsonLd from '@/app/components/FaqJsonLd'
import DeadlineWidget from '@/app/components/DeadlineWidget'
import CallbackForm from '@/app/components/CallbackForm'
import { Container, Breadcrumbs, FaqAccordion, Button, CtaBand } from '@/app/components/ui'
import { PlanCard } from '@/app/components/cards'

type Params = { slug: string }

export function generateStaticParams(): Params[] {
  return DEADLINES.map((d) => ({ slug: d.slug }))
}
export const dynamicParams = false
// Countdown text on the server would go stale; keep the page static and let
// the client widget tick. Revalidate daily so the "next due" table row moves.
export const revalidate = 86400

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const d = getDeadlineBySlug(slug)
  if (!d) return {}
  const next = nextDueFor(d)
  const year = next.getFullYear()
  // Monthly returns are searched by period ("GSTR-3B due date for October
  // 2026"), so name the period the next due date belongs to.
  const period = nextPeriodLabel(d)
  const title = period ? `${d.shortLabel} due date for ${period}: ${formatDateIN(next)}` : `${d.label} due date ${year}: ${formatDateIN(next)}`
  return buildMetadata({
    title: title.length <= 60 ? title : `${d.label} due date ${year}`,
    // Lead with the answer: the intro alone is clamped before any date appears.
    description: period ? `${d.shortLabel} for ${period} is due on ${formatDateIN(next)}. See the due date for every month, late fee and interest, and what to do if you miss it.` : `${d.intro} Late fee: ${d.lateFee}.`,
    path: `/due-dates/${d.slug}`,
    keywords: d.keywords,
    type: 'article',
    modifiedTime: d.lastVerified,
  })
}

export default async function DueDatePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const d = getDeadlineBySlug(slug)
  if (!d) notFound()
  const path = `/due-dates/${d.slug}`
  const next = nextDueFor(d)
  const period = nextPeriodLabel(d)
  const schedule = periodSchedule(d)
  const prev = schedule.filter((r) => r.due.getTime() < next.getTime()).at(-1)
  const fmt = (x: Date) => x.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' })
  const faqs = period
    ? [
        { q: `What is the ${d.shortLabel} due date for ${period}?`, a: `${d.shortLabel} for ${period} is due on ${fmt(next)}.${prev ? ` The return for ${prev.period} was due on ${fmt(prev.due)}.` : ''} ${d.lateFee ? `Missing it costs ${d.lateFee.charAt(0).toLowerCase()}${d.lateFee.slice(1)}.` : ''}`.trim() },
        ...d.faqs,
      ]
    : d.faqs
  const service = d.serviceSlug ? getService(d.serviceSlug) : undefined
  const siblings = DEADLINES.filter((x) => x.category === d.category && x.key !== d.key).slice(0, 3)
  const others = DEADLINES.filter((x) => x.key !== d.key).map((x) => ({ key: x.key, label: x.shortLabel, slug: x.slug, dueIso: nextDueFor(x).toISOString() })).sort((a, b) => a.dueIso.localeCompare(b.dueIso)).slice(0, 2)

  const jsonLd = graph(
    {
      '@type': 'Article',
      '@id': `${BASE_URL}${path}#article`,
      headline: `${d.label} due date`,
      description: d.intro,
      url: `${BASE_URL}${path}`,
      datePublished: '2026-09-01',
      dateModified: d.lastVerified,
      inLanguage: 'en-IN',
      author: { '@id': ORG_ID },
      publisher: { '@id': ORG_ID },
      reviewedBy: { '@type': 'Person', name: REVIEWER.name, jobTitle: REVIEWER.credential, url: `${BASE_URL}/experts/${REVIEWER.slug}` },
      about: d.form,
    },
    breadcrumbJsonLd([{ name: 'Due dates', path: '/due-dates' }, { name: d.label, path }], path)
  )

  return (
    <>
      <JsonLd data={jsonLd} />
      <FaqJsonLd faqs={faqs} />
      <Container className="py-8 lg:py-12">
        <Breadcrumbs crumbs={[{ name: 'Due dates', path: '/due-dates' }, { name: d.label, path }]} />
        <div className="mt-6 grid items-start gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <article>
            <h1 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-navy-900 sm:text-4xl">
              {d.label} due date{period ? ` for ${period}` : ''}: <span className="text-green-600">{formatDateIN(next)}</span>
            </h1>
            <p className="mt-3 text-sm text-muted">{d.form} · {d.appliesTo}</p>
            <p className="mt-5 text-lg leading-relaxed text-text-2">{d.intro}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-red-100 bg-red-50 p-5">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-600"><AlertTriangle className="h-4 w-4" /> If you miss it</p>
                <p className="mt-2 text-sm font-semibold text-navy-900">{d.lateFee}</p>
                {d.interest && <p className="mt-1 text-sm text-text-2">Interest: {d.interest}</p>}
              </div>
              <div className="rounded-2xl border border-green-100 bg-green-50 p-5">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-green-700"><CheckCircle2 className="h-4 w-4" /> Verified</p>
                <p className="mt-2 text-sm font-semibold text-navy-900">Last verified {formatDateIN(d.lastVerified)}</p>
                <p className="mt-1 text-sm text-text-2">Against <a href={d.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline">{new URL(d.sourceUrl).hostname}</a>. Updated within 24 hours of any extension.</p>
              </div>
            </div>

            {service && service.price !== null && service.price > 0 && (
              <div className="mt-6 flex flex-col items-start justify-between gap-3 rounded-2xl border border-green-100 bg-green-50 p-5 sm:flex-row sm:items-center">
                <div>
                  <p className="font-bold text-navy-900">Have {service.name} handled {service.priceFrom ? 'from ' : 'for '}{formatINR(service.price)}{unitSuffix(service.unit) ? ` ${unitSuffix(service.unit)}` : ''}</p>
                  <p className="mt-1 text-sm text-text-2">{service.shortDesc}</p>
                </div>
                <Button href={servicePath(service)} icon>See the plan</Button>
              </div>
            )}

            {schedule.length > 0 && (
              <section className="mt-10" aria-labelledby="schedule">
                <h2 id="schedule" className="text-xl font-bold text-navy-900">{d.shortLabel} due date for each month</h2>
                <p className="mt-2 text-sm text-text-2">The return for each tax period and the date it is due. Extensions notified for a specific month are marked.</p>
                <div className="mt-4 overflow-x-auto rounded-2xl border border-border bg-card">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-bg-alt text-xs uppercase tracking-wider text-muted">
                      <tr><th scope="col" className="px-4 py-3 font-semibold">Tax period</th><th scope="col" className="px-4 py-3 font-semibold">Due date</th></tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {schedule.map((r) => {
                        const isNext = r.due.getTime() === next.getTime()
                        const past = r.due.getTime() < next.getTime()
                        return (
                          <tr key={r.periodKey} className={isNext ? 'bg-green-50' : undefined}>
                            <td className="px-4 py-3 font-semibold text-navy-900">{d.shortLabel} for {r.period}</td>
                            <td className={`px-4 py-3 font-mono tabular ${past ? 'text-muted' : 'text-navy-900'}`}>
                              {r.due.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' })}
                              {isNext && <span className="ml-2 font-sans text-xs font-bold text-green-700">Next</span>}
                              {r.extended && <span className="ml-2 font-sans text-xs font-bold text-red-600">Extended</span>}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            <div className="prose-tax mt-8">
              {d.body.map((p, i) => <p key={i}>{p}</p>)}
            </div>

            {service && (
              <div className="mt-10">
                <h2 className="text-xl font-bold text-navy-900">Let us handle this filing</h2>
                <div className="mt-4 max-w-sm"><PlanCard service={service} compact /></div>
              </div>
            )}

            <div className="mt-12">
              <FaqAccordion faqs={faqs} title={`${d.label}: questions`} />
            </div>

            {siblings.length > 0 && (
              <div className="mt-10">
                <h2 className="text-lg font-bold text-navy-900">Related deadlines</h2>
                <ul className="mt-3 divide-y divide-border rounded-2xl border border-border bg-card">
                  {siblings.map((s) => (
                    <li key={s.key}>
                      <Link href={`/due-dates/${s.slug}`} className="flex items-center justify-between px-4 py-3 text-sm font-semibold text-navy-900 hover:text-green-700">
                        {s.label} <span className="font-mono text-xs text-muted">{formatDateIN(nextDueFor(s))}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Button href="/due-dates" variant="ghost" className="mt-3" icon>Full calendar</Button>
              </div>
            )}
          </article>

          <aside className="space-y-6 lg:sticky lg:top-24">
            <DeadlineWidget items={[{ key: d.key, label: d.shortLabel, slug: d.slug, dueIso: next.toISOString() }, ...others]} title="Countdown" />
            <CallbackForm compact service={d.label} title="Get this filed before the deadline" options={{ label: 'Status', values: ['Not started', 'Documents ready', 'Already late'] }} />
          </aside>
        </div>
        <div className="mt-16">
          <CtaBand title="Deadlines keep coming. Hand them over." desc="GST and TDS retainers include reminders, reconciliation and filing before every due date, with a monthly summary on WhatsApp." primary={{ label: 'See GST plans', href: '/services/gst' }} secondary={{ label: 'See TDS plans', href: '/services/tds' }} />
        </div>
        <p className="mt-6 text-sm"><Link href="/due-dates" className="inline-flex items-center gap-1 font-semibold text-green-700">All due dates <ArrowRight className="h-4 w-4" /></Link></p>
      </Container>
    </>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { buildMetadata, breadcrumbJsonLd, graph, webPageJsonLd } from '@/app/lib/seo'
import { SITE } from '@/app/lib/site'
import { DEADLINES, nextDueFor } from '@/app/lib/due-dates'
import { formatDateIN } from '@/app/lib/format'
import { upcomingDeadlines } from '@/app/lib/deadline-items'
import JsonLd from '@/app/components/JsonLd'
import FaqJsonLd from '@/app/components/FaqJsonLd'
import DeadlineWidget from '@/app/components/DeadlineWidget'
import CallbackForm from '@/app/components/CallbackForm'
import { Container, Breadcrumbs, SectionHeading, FaqAccordion, Badge } from '@/app/components/ui'

// Deadline countdown data is computed on the server; refresh hourly.
export const revalidate = 3600

export const metadata: Metadata = buildMetadata({
  title: `Tax Due Dates ${new Date().getFullYear()} | ITR, GST, TDS, Advance Tax Calendar`,
  description: 'Live compliance calendar for India: ITR filing last date, GSTR-1 and GSTR-3B due dates, TDS payment and return deadlines, advance tax instalments and 26QB. Countdown to each deadline with late fees.',
  path: '/due-dates',
  keywords: ['tax due dates', 'compliance calendar india', 'itr last date', 'gst due dates', 'tds due dates', 'advance tax due date', 'gstr 3b due date'],
})

const FAQS = [
  { q: 'What are the most important tax deadlines each month?', a: 'The 7th for TDS deposit, the 11th for GSTR-1 and the 20th for GSTR-3B. Quarterly TDS returns fall on 31 July, 31 October, 31 January and 31 May. Advance tax is due 15 June, 15 September, 15 December and 15 March.' },
  { q: 'Are these dates updated when the government extends a deadline?', a: 'Yes. Each deadline page shows a last-verified date. We update within 24 hours of a CBDT or CBIC press release.' },
  { q: 'Can I get reminders?', a: 'Deadline reminders on WhatsApp are part of every GST and TDS retainer plan. Reminder sign-up for everyone else arrives with the client portal.' },
]

export default function DueDatesHub() {
  const now = new Date()
  const rows = DEADLINES.map((d) => ({ d, next: nextDueFor(d, now) })).sort((a, b) => a.next.getTime() - b.next.getTime())
  return (
    <>
      <JsonLd data={graph(webPageJsonLd({ path: '/due-dates', name: 'Tax due dates calendar', description: metadata.description as string }), breadcrumbJsonLd([{ name: 'Due dates', path: '/due-dates' }], '/due-dates'))} />
      <FaqJsonLd faqs={FAQS} />
      <Container className="py-10 lg:py-16">
        <Breadcrumbs crumbs={[{ name: 'Due dates', path: '/due-dates' }]} />
        <div className="mt-6 grid items-start gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          {/* min-w-0: without it this grid item takes its min-content width from
              the table's min-w-[560px] and pushes the whole page sideways on
              phones, even though the table has its own overflow-x container. */}
          <div className="min-w-0">
            <SectionHeading align="left" eyebrow="Compliance calendar" title="Every tax deadline," emphasis="with a countdown." desc={`Income tax, GST and TDS due dates for FY ${SITE.currentFY} and FY ${SITE.nextTaxYear}, with the late fee for missing each one. Verified against CBDT and CBIC notifications.`} />
            <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
              <table className="w-full min-w-[560px] text-sm">
                <thead className="bg-bg-alt text-left text-xs font-bold uppercase tracking-wider text-muted">
                  <tr>
                    <th className="px-4 py-3">Deadline</th>
                    <th className="px-4 py-3">Next due</th>
                    <th className="px-4 py-3">Applies to</th>
                    <th className="px-4 py-3">Late fee</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {rows.map(({ d, next }) => {
                    const days = Math.ceil((next.getTime() - now.getTime()) / 86_400_000)
                    return (
                      <tr key={d.key} className="hover:bg-bg-alt/60">
                        <td className="px-4 py-3">
                          <Link href={`/due-dates/${d.slug}`} className="font-semibold text-navy-900 hover:text-green-700">{d.label}</Link>
                          <span className="block text-xs text-muted">{d.form}</span>
                        </td>
                        <td className="px-4 py-3 font-mono tabular">
                          {formatDateIN(next)}
                          <span className="block"><Badge tone={days <= 7 ? 'red' : 'green'}>{days <= 0 ? 'Today' : `${days} days`}</Badge></span>
                        </td>
                        <td className="px-4 py-3 text-text-2">{d.appliesTo}</td>
                        <td className="px-4 py-3 text-text-2">{d.lateFee}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-muted">Dates are computed for the Indian calendar day. Where a due date falls on a public holiday the portal usually accepts filings the next working day, but do not rely on it.</p>
          </div>
          <div className="space-y-6 lg:pt-16">
            <DeadlineWidget items={upcomingDeadlines(4)} title="Closest deadlines" />
            <CallbackForm compact title="Never miss one again" subtitle="Tell us which returns you file. We set reminders and can take over the filing." options={{ label: 'You file', values: ['ITR only', 'GST monthly', 'GST quarterly', 'TDS quarterly', 'Everything'] }} service="Deadline reminders" />
          </div>
        </div>
        <div className="mt-16">
          <FaqAccordion faqs={FAQS} title="Due date questions" />
        </div>
        <p className="mt-8 text-sm">
          <Link href="/services/gst" className="inline-flex items-center gap-1 font-semibold text-green-700">Let us file GST for you <ArrowRight className="h-4 w-4" /></Link>
        </p>
      </Container>
    </>
  )
}

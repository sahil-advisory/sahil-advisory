import type { Metadata } from 'next'
import { buildMetadata, breadcrumbJsonLd, graph, webPageJsonLd } from '@/app/lib/seo'
import { SITE } from '@/app/lib/site'
import { publishedExperts } from '@/app/lib/experts'
import JsonLd from '@/app/components/JsonLd'
import { Container, Breadcrumbs, SectionHeading, StatsRow, CtaBand } from '@/app/components/ui'
import { ExpertCard } from '@/app/components/cards'

export const metadata: Metadata = buildMetadata({
  title: 'About Sahil Advisory | CMA-led Tax and Compliance Practice',
  description: 'Sahil Advisory is a Cost and Management Accountant-led tax and compliance practice in Chandigarh and Panchkula serving clients across India online. Fixed prices, named experts, draft approval before filing.',
  path: '/about',
  keywords: ['sahil advisory', 'tax consultant chandigarh', 'cma firm panchkula', 'cost accountant chandigarh'],
})

export default function AboutPage() {
  return (
    <>
      <JsonLd data={graph(webPageJsonLd({ path: '/about', name: 'About', description: metadata.description as string }), breadcrumbJsonLd([{ name: 'About', path: '/about' }], '/about'))} />
      <Container className="py-10 lg:py-16">
        <Breadcrumbs crumbs={[{ name: 'About', path: '/about' }]} />
        <div className="mt-6 grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <div>
            <SectionHeading align="left" eyebrow="About" title="A tax practice that shows its prices" emphasis="and its people." />
            <div className="prose-tax mt-8 max-w-2xl">
              <p>{SITE.name} started as a Cost and Management Accountant&rsquo;s practice in Chandigarh and Panchkula, filing returns and handling GST for shop owners, salaried families, traders and startups in the Tricity. Most of our work now comes from outside the region, done entirely online.</p>
              <p>We built this platform because the two things clients ask first, what will it cost and who will actually do it, are the two things most tax websites hide. Every service here has a published price. Every order names the professional handling it.</p>
              <h2>How we work</h2>
              <ul>
                <li>You choose a plan or ask for a callback. We confirm the price before any work starts.</li>
                <li>You share documents on the dashboard or WhatsApp. We tell you exactly what is missing.</li>
                <li>A qualified professional prepares a draft. You approve it. Only then do we file.</li>
                <li>You get the acknowledgement, a GST invoice and a reminder before next year&rsquo;s deadline.</li>
              </ul>
              <h2>What a CMA does, and what a CA does</h2>
              <p>Cost and Management Accountants (ICMAI) prepare and file income tax returns, GST returns and TDS statements, and are approved GST practitioners under section 48 of the CGST Act. CMAs are also the professionals banks expect to prepare CMA data and project reports for loans. Tax audits under section 44AB and statutory audits are reserved for Chartered Accountants, and we deliver those through empanelled CAs who are named on the order.</p>
              <h2>Where we are</h2>
              <p>{SITE.address.street}, {SITE.address.locality} {SITE.address.postalCode}, and {SITE.address.secondOffice}. Hours are {SITE.hours}. Clients anywhere in India work with us over WhatsApp, video calls and the dashboard.</p>
            </div>
          </div>
          <div className="space-y-6 lg:pt-16">
            <StatsRow stats={[
              { value: `${SITE.returnsFiled}+`, label: 'Returns filed' },
              { value: `${SITE.yearsInPractice}+`, label: 'Years' },
              { value: SITE.googleRating.toFixed(1), label: 'Google rating' },
              { value: '100%', label: 'On time' },
            ]} />
            {publishedExperts().map((e) => <ExpertCard key={e.slug} expert={e} compact />)}
          </div>
        </div>
        <div className="mt-16"><CtaBand /></div>
      </Container>
    </>
  )
}

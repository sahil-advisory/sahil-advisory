import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { requireAdmin } from '@/app/lib/auth-guard'
import { getLead } from '@/app/lib/leads/queries'
import { listStaff } from '@/app/lib/engagements/queries'
import { SERVICES, CATEGORIES, servicesIn } from '@/app/lib/services'
import { checklistFor, hasStructuredChecklist } from '@/app/lib/checklists'
import { SITE } from '@/app/lib/site'
import { NewEngagementForm } from './NewEngagementForm'

export const dynamic = 'force-dynamic'

export default async function NewEngagementPage({ searchParams }: { searchParams: Promise<{ lead?: string; service?: string }> }) {
  await requireAdmin()
  const sp = await searchParams
  const [leadData, staff] = await Promise.all([sp.lead && /^[0-9a-f-]{36}$/i.test(sp.lead) ? getLead(sp.lead) : Promise.resolve(null), listStaff()])
  const lead = leadData?.lead ?? null
  // Best-guess the service from the lead's stated service name.
  const guess = lead?.service ? SERVICES.find((s) => s.name.toLowerCase() === lead.service!.toLowerCase())?.slug : undefined
  const services = CATEGORIES.map((c) => ({ id: c.id, name: c.name, plans: servicesIn(c.id).map((s) => ({ slug: s.slug, name: s.name, structured: hasStructuredChecklist(s.slug) })) }))
  const checklists = Object.fromEntries(SERVICES.map((s) => [s.slug, checklistFor(s.slug)!]))
  return (
    <div className="space-y-6">
      <Link href={lead ? `/admin/leads/${lead.id}` : '/admin/engagements'} className="inline-flex items-center gap-1 text-sm font-semibold text-text-2 hover:text-navy-900"><ArrowLeft className="h-4 w-4" /> Back</Link>
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-navy-900">New engagement</h1>
        <p className="mt-1 text-sm text-text-2">Creates the client account if needed, generates the checklist, and emails the client a link to their portal.</p>
      </div>
      <NewEngagementForm
        services={services}
        checklists={checklists}
        staff={staff}
        defaults={{
          leadId: lead?.id ?? null,
          name: lead?.name ?? '',
          email: lead?.email ?? '',
          phone: lead?.phone ?? '',
          serviceSlug: sp.service ?? guess ?? 'itr-salaried',
          periodLabel: `FY ${SITE.currentFY}`,
          notes: lead?.message ? `From lead: ${lead.message}` : '',
        }}
      />
    </div>
  )
}

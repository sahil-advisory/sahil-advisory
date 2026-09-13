import { BASE_URL } from '@/app/lib/site'
import { SERVICES, CATEGORIES, getService, getCategory, servicePath, unitSuffix, type Service, type ServiceCategory } from '@/app/lib/services'
import { getGuide, guidePath } from '@/app/lib/guides'
import { getCalculator } from '@/app/lib/calculators'
import { getReference, referencePath } from '@/app/lib/reference'
import { getDeadlineBySlug, nextDue } from '@/app/lib/due-dates'
import { formatINR, formatDateIN } from '@/app/lib/format'

// Turns "which page was the form on" into something a customer would want to
// read back: the plan they were looking at with its price and document list,
// the guide they were reading, the deadline they were checking. Every branch
// resolves to the same shape so the email template has one path.

export type LeadContext = {
  kind: 'plan' | 'category' | 'guide' | 'calculator' | 'reference' | 'deadline' | 'consult' | 'page'
  /** What the request is about, e.g. "ITR-2 with capital gains". */
  topic: string
  /** Sentence fragment: "the ITR-2 with capital gains plan page". */
  pageLabel: string
  pageUrl: string
  /** Best matching plan, if one can be inferred. */
  plan?: Service
  category?: ServiceCategory
  /** Extra line under the topic, e.g. a guide excerpt or a deadline date. */
  note?: string
  /** The post-request timeline. Not the category's pre-sale steps: those
   *  start with "pick a plan", which the reader has just done. */
  steps: { title: string; desc: string; time: string }[]
}

const STEPS = [
  { title: 'We call you', desc: 'A qualified professional calls to understand what you need and confirms the exact scope and fixed price.', time: 'Within 2 working hours' },
  { title: 'You share documents', desc: 'Send Form 16, statements or GST data on WhatsApp or email. We tell you exactly what is missing.', time: '5 to 10 minutes' },
  { title: 'Approve the draft, we file', desc: 'Your expert shares the computation. You approve, we file and send the acknowledgement.', time: '1 to 3 business days' },
]

export function planPrice(s: Service): string {
  if (s.price === null) return s.quoteLabel || 'Quote after a free review'
  return `${s.priceFrom ? 'from ' : ''}${formatINR(s.price)}${s.unit === 'one_time' ? '' : ' ' + unitSuffix(s.unit)}`
}

function pathOf(url?: string): string {
  if (!url) return ''
  try {
    return new URL(url).pathname.replace(/\/+$/, '')
  } catch {
    return ''
  }
}

function serviceByName(name?: string): Service | undefined {
  if (!name) return undefined
  const n = name.trim().toLowerCase()
  return SERVICES.find((s) => s.name.toLowerCase() === n)
}

function withPlan(plan: Service | undefined, ctx: Omit<LeadContext, 'steps' | 'plan' | 'category'> & { category?: ServiceCategory }): LeadContext {
  const category = ctx.category ?? (plan ? getCategory(plan.category) : undefined)
  return { ...ctx, plan, category, steps: STEPS }
}

export function resolveLeadContext(input: { service?: string; sourceUrl?: string }): LeadContext {
  const path = pathOf(input.sourceUrl)
  const url = path ? `${BASE_URL}${path}` : BASE_URL
  const seg = path.split('/').filter(Boolean)
  const byName = serviceByName(input.service)

  // /services/{category}/{plan}
  if (seg[0] === 'services' && seg[2]) {
    const plan = getService(seg[2])
    if (plan) return withPlan(plan, { kind: 'plan', topic: plan.name, pageLabel: `the ${plan.name} plan page`, pageUrl: `${BASE_URL}${servicePath(plan)}` })
  }
  // /services/{category}
  if (seg[0] === 'services' && seg[1]) {
    const category = getCategory(seg[1])
    if (category) return withPlan(byName, { kind: 'category', topic: input.service || category.name, pageLabel: `the ${category.name} page`, pageUrl: url, category })
  }
  // /guides/{cluster}/{slug}
  if (seg[0] === 'guides' && seg[2]) {
    const g = getGuide(seg[1], seg[2])
    if (g) return withPlan(getService(g.relatedServiceSlug) ?? byName, { kind: 'guide', topic: input.service || g.title, pageLabel: `our guide "${g.title}"`, pageUrl: `${BASE_URL}${guidePath(g)}`, note: g.excerpt })
  }
  // /calculators/{slug}
  if (seg[0] === 'calculators' && seg[1]) {
    const c = getCalculator(seg[1])
    if (c) return withPlan(getService(c.relatedServiceSlug) ?? byName, { kind: 'calculator', topic: input.service || c.name, pageLabel: `the ${c.name}`, pageUrl: url })
  }
  // /sections/{slug} and /forms/{slug}
  if ((seg[0] === 'sections' || seg[0] === 'forms') && seg[1]) {
    const r = getReference(seg[0] === 'sections' ? 'section' : 'form', seg[1])
    if (r) return withPlan(r.relatedServiceSlugs.map(getService).find(Boolean) ?? byName, { kind: 'reference', topic: input.service || r.name, pageLabel: `the ${r.name} page`, pageUrl: `${BASE_URL}${referencePath(r)}`, note: r.summary })
  }
  // /due-dates/{slug}
  if (seg[0] === 'due-dates' && seg[1]) {
    const d = getDeadlineBySlug(seg[1])
    if (d) {
      const due = nextDue(d.rule)
      return withPlan((d.serviceSlug && getService(d.serviceSlug)) || byName, { kind: 'deadline', topic: input.service || d.label, pageLabel: `the ${d.label} due date page`, pageUrl: url, note: `Next due date: ${formatDateIN(due.toISOString())}. ${d.lateFee}` })
    }
  }
  if (seg[0] === 'consult') {
    return withPlan(byName, { kind: 'consult', topic: input.service || 'Consultation', pageLabel: 'the consultation page', pageUrl: url })
  }

  // Anything else: the form's own service name, then a plain page.
  if (byName) return withPlan(byName, { kind: 'plan', topic: byName.name, pageLabel: `the ${byName.name} plan page`, pageUrl: `${BASE_URL}${servicePath(byName)}` })
  const category = CATEGORIES.find((c) => c.navLabel === input.service || c.name === input.service)
  if (category) return withPlan(undefined, { kind: 'category', topic: category.name, pageLabel: `the ${category.name} page`, pageUrl: url, category })
  const label = seg.length === 0 ? 'our home page' : seg[0] === 'contact' ? 'our contact page' : seg[0] === 'pricing' ? 'our pricing page' : `our ${seg[seg.length - 1].replace(/-/g, ' ')} page`
  return withPlan(undefined, { kind: 'page', topic: input.service || 'your tax query', pageLabel: label, pageUrl: url })
}

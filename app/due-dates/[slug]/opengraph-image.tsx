import { DEADLINES, getDeadlineBySlug, type Rule } from '@/app/lib/due-dates'
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from '@/app/lib/og'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = 'Tax compliance due date, late fee and who it applies to'

type Params = { slug: string }

export function generateStaticParams(): Params[] {
  return DEADLINES.map((d) => ({ slug: d.slug }))
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function ordinal(n: number): string {
  const rem100 = n % 100
  if (rem100 >= 11 && rem100 <= 13) return `${n}th`
  const suffix = { 1: 'st', 2: 'nd', 3: 'rd' }[n % 10] ?? 'th'
  return `${n}${suffix}`
}

// The card is generated at build time, so printing a computed "next due" date
// would go stale between deploys. The recurrence rule never does.
function ruleSummary(rule: Rule): string {
  switch (rule.kind) {
    case 'monthly':
      return `${ordinal(rule.day)} of every month`
    case 'days-after-month-end':
      return `${rule.days} days after each month end`
    case 'quarterly':
      return `${ordinal(rule.day)}, ${rule.monthsAfterQuarter} month${rule.monthsAfterQuarter === 1 ? '' : 's'} after each quarter`
    case 'yearly':
      return `${ordinal(rule.day)} ${MONTHS[rule.month - 1] ?? ''} every year`.trim()
    case 'fixed':
      return 'Fixed dates, check the calendar'
  }
}

export default async function Image({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const d = getDeadlineBySlug(slug)
  if (!d) return ogImage({ accent: 'red', eyebrow: 'Due dates', title: 'Tax compliance calendar' })

  return ogImage({
    accent: 'red',
    eyebrow: `${d.category.toUpperCase()} due date`,
    title: `${d.label} due date`,
    subtitle: d.intro,
    chips: [ruleSummary(d.rule), `Late fee: ${d.lateFee}`],
    stat: { label: 'Form', value: d.form },
  })
}

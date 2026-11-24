import Link from 'next/link'
import { CalendarClock, ArrowRight } from 'lucide-react'
import { getDeadline, nextDueFor } from '@/app/lib/due-dates'
import { formatDateIN } from '@/app/lib/format'

// Shows itself in the 45 days before each advance tax instalment and hides
// otherwise, so it never needs a manual edit. The host page must revalidate.
const WINDOW_DAYS = 45

export default function AdvanceTaxBanner({ className = '' }: { className?: string }) {
  const d = getDeadline('advance-tax')
  if (!d) return null
  const now = new Date()
  const due = nextDueFor(d, now)
  if (due.getTime() - now.getTime() > WINDOW_DAYS * 86_400_000) return null
  return (
    <div className={`flex flex-col items-start justify-between gap-3 rounded-2xl border border-green-100 bg-green-50 px-5 py-4 sm:flex-row sm:items-center ${className}`}>
      <p className="flex items-start gap-3 text-sm text-text-2">
        <CalendarClock className="mt-0.5 h-5 w-5 shrink-0 text-green-700" aria-hidden />
        <span><strong className="text-navy-900">Advance tax instalment due {formatDateIN(due)}.</strong> Sold shares or property, or earn from business, F&amp;O or rent? Check what you owe before the date.</span>
      </p>
      <Link href="/calculators/advance-tax" className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-green-700 hover:underline">Calculate my instalment <ArrowRight className="h-4 w-4" aria-hidden /></Link>
    </div>
  )
}

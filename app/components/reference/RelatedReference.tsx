import Link from 'next/link'
import { BookOpen } from 'lucide-react'
import { referencesLinkingTo, referencePath } from '@/app/lib/reference'

// Inbound links for the section and form pages. A reference page declares
// which guides, calculators and services it relates to; this renders the
// reverse direction on those pages, so a new reference page gets links in
// from day one instead of sitting as an orphan the crawler never reaches.
export default function RelatedReference(target: { guide?: string; calculator?: string; service?: string; title?: string }) {
  const items = referencesLinkingTo(target).slice(0, 6)
  if (!items.length) return null
  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold text-navy-900">{target.title ?? 'Sections and forms mentioned'}</h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((r) => (
          <li key={`${r.kind}-${r.slug}`}>
            <Link href={referencePath(r)} className="group flex items-start gap-3 rounded-2xl border border-border bg-card p-4 hover:border-green-600">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-700"><BookOpen className="h-4 w-4" /></span>
              <span className="min-w-0">
                <span className="block text-sm font-bold text-navy-900 group-hover:text-green-700">{r.name}</span>
                <span className="mt-0.5 line-clamp-2 block text-xs text-text-2">{r.keyFacts[0] ? `${r.keyFacts[0].label}: ${r.keyFacts[0].value}` : r.summary}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

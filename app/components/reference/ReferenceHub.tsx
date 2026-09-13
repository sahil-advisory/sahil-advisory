import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { ReferenceKind } from '@/app/lib/reference/types'
import { groupsOf, referencePath, KIND_LABEL } from '@/app/lib/reference'
import { SITE } from '@/app/lib/site'
import { Container, Breadcrumbs, SectionHeading, CtaBand, Badge } from '@/app/components/ui'

export default function ReferenceHub({ kind }: { kind: ReferenceKind }) {
  const label = KIND_LABEL[kind]
  const hub = `/${kind}s`
  const other = kind === 'section' ? 'forms' : 'sections'
  return (
    <Container className="py-10 lg:py-16">
      <Breadcrumbs crumbs={[{ name: label.plural, path: hub }]} />
      <div className="mt-6">
        <SectionHeading align="left" eyebrow={label.plural} title={label.hubTitle} desc={label.hubDesc} />
      </div>
      <div className="mt-12 space-y-12">
        {groupsOf(kind).map(([group, pages]) => (
          <section key={group} id={group.toLowerCase().replace(/[^a-z0-9]+/g, '-')}>
            <h2 className="text-xl font-extrabold tracking-tight text-navy-900">{group}</h2>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {pages.map((p) => (
                <li key={p.slug}>
                  <Link href={referencePath(p)} className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] hover:border-green-600">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-base font-bold text-navy-900 group-hover:text-green-700">{p.name}</span>
                      {p.act2025 && <Badge tone="gold">{p.act2025.newNumber}</Badge>}
                    </div>
                    <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-text-2">{p.summary}</p>
                    <p className="mt-3 text-xs text-muted">{p.keyFacts[0]?.label}: <span className="font-medium text-navy-900">{p.keyFacts[0]?.value}</span></p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <p className="mt-10 text-sm text-text-2">
        Every page is checked against the FY {SITE.currentFY} rules and marked with the section or form number it becomes under the Income-tax Act 2025. Looking for a {other.slice(0, -1)} instead? <Link href={`/${other}`} className="inline-flex items-center gap-1 font-semibold text-green-700">All {other} <ArrowRight className="h-4 w-4" /></Link>
      </p>
      <div className="mt-16"><CtaBand /></div>
    </Container>
  )
}

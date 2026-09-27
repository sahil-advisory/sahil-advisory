import type { ReferencePage, ReferenceKind, Act2025Note } from './types'
import { act2025ForRef } from '@/app/lib/act2025'
import { SECTIONS } from './content/sections'
import { FORMS } from './content/forms'

export const REFERENCE: ReferencePage[] = [...SECTIONS, ...FORMS]

export function referenceOf(kind: ReferenceKind) {
  return REFERENCE.filter((r) => r.kind === kind)
}
export function getReference(kind: ReferenceKind, slug: string) {
  return REFERENCE.find((r) => r.kind === kind && r.slug === slug)
}
export function getReferenceBySlug(slug: string) {
  return REFERENCE.find((r) => r.slug === slug)
}
// Every reference page shows its 2025 Act number. A page may declare its own
// note; otherwise it resolves from the central map in app/lib/act2025.ts, so
// a correction there reaches all 22 pages at once.
export function act2025Note(page: Pick<ReferencePage, 'slug' | 'act2025'>): Act2025Note | undefined {
  if (page.act2025) return page.act2025
  const m = act2025ForRef(page.slug)
  if (!m || !m.new) return undefined
  return { newNumber: m.new, status: 'reported', note: m.note }
}

export function referencePath(r: Pick<ReferencePage, 'kind' | 'slug'>) {
  return `/${r.kind}s/${r.slug}`
}
export function groupsOf(kind: ReferenceKind) {
  const out = new Map<string, ReferencePage[]>()
  for (const r of referenceOf(kind)) out.set(r.group, [...(out.get(r.group) ?? []), r])
  return [...out.entries()]
}
/** Reverse lookup: reference pages that point at a guide, calculator or service. */
export function referencesLinkingTo(target: { guide?: string; calculator?: string; service?: string }) {
  return REFERENCE.filter(
    (r) =>
      (target.guide && r.relatedGuideSlugs.includes(target.guide)) ||
      (target.calculator && r.relatedCalculatorSlugs.includes(target.calculator)) ||
      (target.service && r.relatedServiceSlugs.includes(target.service))
  )
}
export const KIND_LABEL: Record<ReferenceKind, { singular: string; plural: string; hubTitle: string; hubDesc: string }> = {
  section: {
    singular: 'Section',
    plural: 'Sections',
    hubTitle: 'Income Tax Act sections explained',
    hubDesc: 'Every deduction, exemption and rule that changes what you pay, with the FY 2025-26 limit, a worked example, and the new number under the Income-tax Act 2025.',
  },
  form: {
    singular: 'Form',
    plural: 'Forms',
    hubTitle: 'Income tax and GST forms explained',
    hubDesc: 'What each form is, who needs it, where to download it and how to read it. ITR forms, Form 16, 26AS, AIS and the rest.',
  },
}

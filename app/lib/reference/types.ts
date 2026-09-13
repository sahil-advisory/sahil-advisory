import type { ContentSection } from '@/app/lib/guides/types'

// Reference pages: one page per Income-tax section and per form. They target
// the evergreen "what is section 80C" and "form 16 download" queries, and
// they are the pages the Income-tax Act 2025 renumbering hangs off.
//
// Shape is deliberately tight so every page answers the same way:
//   1. `summary`   two or three sentences that answer the query outright.
//                  This is what Google lifts into the featured snippet.
//   2. `keyFacts`  the numbers, as a table above the fold.
//   3. `sections`  the same content blocks guides use, so the renderer,
//                  the llms export and the styling are shared.
//   4. `faqs`      PAA-style, answer first.
// Cross-links are slugs into the other registries and are rendered both
// ways: this page links out, and the target guide/calculator links back.

export type ReferenceKind = 'section' | 'form'

export interface Act2025Note {
  /** New section or form number under the Income-tax Act 2025, if reported. */
  newNumber: string
  /** Where the mapping came from. Secondary sources must say so. */
  status: 'notified' | 'reported'
  note?: string
}

export interface ReferencePage {
  kind: ReferenceKind
  slug: string
  /** Short display name: "Section 80C", "Form 16". */
  name: string
  /** Full H1 with the year. */
  h1: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
  /** Direct answer to the query, 2 to 3 sentences, numbers first. */
  summary: string
  keyFacts: { label: string; value: string }[]
  sections: ContentSection[]
  faqs: { q: string; a: string }[]
  /** Group label for the hub: "Deductions", "Presumptive taxation", "Salary forms". */
  group: string
  act2025?: Act2025Note
  relatedServiceSlugs: string[]
  relatedCalculatorSlugs: string[]
  relatedGuideSlugs: string[]
  relatedReferenceSlugs: string[]
  datePublished: string
  dateModified: string
}

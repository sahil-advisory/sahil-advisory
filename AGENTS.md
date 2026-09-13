# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

# Project conventions

Read `docs/PROJECT.md` first (state, open decisions, checklist) and `TAX-PLATFORM-BLUEPRINT.md` for the full brief.

- Package manager: pnpm. Never npm.
- App Router only. `params` are Promises (`await params`). Proxy lives in `proxy.ts` (not middleware).
- Every indexable route uses `buildMetadata()` from `app/lib/seo.ts` (sets canonical). Never add `alternates.canonical` to the root layout.
- JSON-LD: server `<JsonLd>` for everything except FAQPage; FAQs go through the client `<FaqJsonLd>` (see comment in that file).
- Content, catalogue, deadlines, calculators and reference pages (sections, forms) are typed registries in `app/lib`. Add there, not in pages. A new registry entry flows into its route, the grouped sitemap, IndexNow, llms.txt and the reverse-link strips automatically.
- Reference pages (`app/lib/reference`) answer the query in `summary` first; that paragraph is the featured-snippet candidate. Never invent an Income-tax Act 2025 mapping: mark `act2025.status` as `reported` unless the Rules are notified.
- Tax rates and dates live only in `app/lib/tax/rules/<fy>.ts`.
- Money: rupees, `formatINR`, `font-mono tabular`.
- Copy: "expert-assisted", "qualified professional (CMA/CA)". Never "CA-assisted". No Hinglish, no emoji, no em-dashes.
- Audit signing rights are a legal fact, not a copy choice. Tax audit (44AB) and statutory audit are signed by an empanelled Chartered Accountant; cost audit (s.148) is signed by a Cost Accountant and a CA cannot sign it. See the table in `docs/PROJECT.md` before editing any audit copy.
- Palette: navy + emerald. Gold only for tags. Red only for urgency.
- Type-check with `pnpm exec tsc --noEmit -p tsconfig.json`; lint with `pnpm lint`; build with `pnpm build`.

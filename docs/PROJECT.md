# Sahil Advisory tax platform: project state

Single source of truth for what exists, what is next, and what the owner must decide.
Blueprint: `TAX-PLATFORM-BLUEPRINT.md` at the repo root.

## Phase 0 status (7 September 2026)

Verified: `pnpm build` produces 118 static pages, `pnpm lint` and `tsc --noEmit`
are clean, the sitemap lists 110 URLs, every page type serves exactly one
FAQPage with a self-referencing canonical, no page scrolls horizontally at
390px, the lead API validates and rate-limits, and the tax engine passes 12
known-value checks (including 87A marginal relief just above ₹12 lakh).

Built and type-checked:

| Area | Where | Notes |
|---|---|---|
| Design tokens | `app/globals.css` | Navy + emerald, Geist Sans, Geist Mono for money |
| Site identity | `app/lib/site.ts` | Brand, phone, email, address, GSTIN (env), FY constants |
| SEO helpers | `app/lib/seo.ts`, `app/components/{JsonLd,FaqJsonLd}.tsx` | `buildMetadata()` sets canonical/OG/robots. Root layout has NO canonical. FAQ JSON-LD is client-rendered (duplicate-FAQPage bug) |
| Tax rules | `app/lib/tax/rules/fy2025-26.ts`, `app/lib/tax/compute.ts` | One file per FY. Never hardcode rates in components |
| Services registry | `app/lib/services.ts` | 6 categories, 45 SKUs, consultations. Prices are launch proposals |
| Due dates | `app/lib/due-dates.ts` | 11 deadlines with recurrence rules, `lastVerified` stamps |
| Calculators | `app/lib/calculators.ts`, `app/components/calculators/*` | 8 live, 8 marked phase 1 (shown as coming soon, not in sitemap) |
| Guides | `app/lib/guides/*` | Typed content blocks, 13 guides across 8 clusters, `plannedCount` gap tracking |
| Experts | `app/lib/experts.ts` | 1 published (CMA lead). CA partners hidden until confirmed |
| Routes | `app/**` | Home, services hub, 6 category pages, 45 SKU pages, pricing, consult, calculators, due-dates, guides, experts, about, contact, 7 legal/trust pages, 404 |
| Leads | `app/api/leads/route.ts`, `app/lib/db/*`, `app/lib/notify/*` | Rate-limited, honeypot. Writes to Supabase, alerts WhatsApp and email after the response. Degrades to logging when unconfigured |
| SEO plumbing | `app/sitemap.ts`, `app/robots.ts`, `app/api/indexnow/*`, `proxy.ts`, `vercel.json` | Honest lastmod, AI crawlers allowed, daily IndexNow cron, URL junk stripping |
| Analytics | `app/layout.tsx` | GA4 (`NEXT_PUBLIC_GA_ID`), Clarity (`NEXT_PUBLIC_CLARITY_ID`), Vercel Analytics |
| OG cards | `app/lib/og.tsx`, `app/**/opengraph-image.tsx` | One `ogCard()` design for all 117 pages. Geist TTFs vendored at `assets/fonts` (satori cannot use the woff2 from `next/font`). Add a route, add its `opengraph-image.tsx` |

Not built yet (Phase 1+): auth, database, cart/checkout, Razorpay, client dashboard, document upload, admin kanban, WhatsApp BSP templates, slot picker, Hindi mirrors, notice upload triage flow.

## Conventions

- Every indexable route: `buildMetadata({ title ≤ 60, description 145–160, path })` + `<JsonLd>` graph + `<FaqJsonLd>` for FAQs.
- Every indexable route also needs its own `opengraph-image.tsx`. `buildMetadata()` sets an `openGraph` object, and that stops a parent segment's OG image from being inherited, so a route without its own file ships with no `og:image` at all.
- Content and catalogue live in typed TS registries under `app/lib`. Adding an entry auto-flows into routes, sitemap, hub pages, footer and IndexNow.
- Prices in rupees ex-GST; render with `formatINR` in `font-mono tabular`.
- Copy rules: "expert-assisted" or "qualified professional (CMA/CA)", never "CA-assisted". Audit work is by empanelled CAs. No Hinglish, no emoji, no em-dashes.
- Facts marked `verify` in `fy2025-26.ts` or guides came from secondary sources. Check against the primary source before relying on them.
- pnpm only. Read `node_modules/next/dist/docs` before using an unfamiliar Next API.

## Owner decisions still open

1. Domain: **done.** `sahiladvisory.in` is live on the business Vercel account (team `sahil-advisory`), registered at Hostinger, with `www` and the old `sahil-advisory.vercel.app` redirecting to it. `NEXT_PUBLIC_BASE_URL` is set in production.
2. Legal entity, GSTIN (`NEXT_PUBLIC_COMPANY_GSTIN`), CIN, registered address. Footer shows GSTIN only when set.
3. Sign off on prices in `app/lib/services.ts` and consultation fees. Strikethrough MRPs are valid until 31 March 2027 per the pricing page.
4. **CA partner details, now blocking.** The audit category is live and sells tax audit under 44AB and statutory audit, both of which say the report is "signed by an empanelled Chartered Accountant". No CA is named anywhere yet, which is honest but incomplete. Send name, membership number, firm, years and a photo, and I will add them to `app/lib/experts.ts` with `isPublished: true` so the audit pages, order pages and `reviewedBy` schema name a real signatory.
5. Expert photo and bio for the CMA lead. Currently initials avatar and a generic bio.
6. Testimonials in `app/lib/testimonials.ts` were carried over from the old site; confirm consent and add the Google Business Profile reviews URL to `SITE.social.googleBusiness`.
7. `SITE.returnsFiled` (640) and `yearsInPractice` (8) are placeholders; replace with real counts.
8. Trust page states AES-256, TLS 1.2+, daily backups, admin 2FA. Confirm these match infrastructure before launch.
9. Resend account and sending domain for lead emails; WhatsApp Business number.
10. Refund policy includes a 75% tier for "work started, no draft shared"; keep or remove.

## Launch checklist

- [ ] Set env vars on Vercel production (see `.env.example`), not just `.env.local`
- [ ] Google Search Console + Bing Webmaster verified; sitemap submitted
- [ ] `INDEXNOW_KEY` set and `/<key>.txt` returns the key
- [ ] Google Business Profile category "Tax preparation service"; reviews link in `SITE.social`
- [ ] Rich Results Test on one page of each type (service, calculator, guide, due-date, expert)
- [ ] Lighthouse ≥ 90 mobile on a service, a guide and a calculator page
- [ ] GA4 `lead_submitted` event visible; exclude `accounts.google.com` referral
- [ ] Verify every `[verify]` fact in `fy2025-26.ts` and the Act 2025 guide

## Audit category (added 7 September 2026)

`/services/audit` with five SKUs. Signing rights are stated explicitly and
must stay that way:

| Service | Signed by | Why |
|---|---|---|
| Tax audit under 44AB | Empanelled Chartered Accountant | Section 44AB reserves the report for a CA |
| Statutory audit | Empanelled Chartered Accountant | Companies Act reserves it for a CA |
| Cost audit under s.148 | Our CMA | Section 148 reserves cost audit for a Cost Accountant |
| Internal audit | CMA-led | Section 138 permits a CA, a CMA or another professional |
| Stock audit and bank certification | CMA-led | No statutory reservation |

Never move a service between those rows without checking the statute. The
cost audit line is a genuine differentiator: it is work a CA cannot sign.

## Backend

Design and build order: `docs/BACKEND.md`. Shape and running cost:
`docs/ARCHITECTURE.md`. Setup, step by step: `docs/SETUP-BACKEND.md`.

**Built, dormant until env vars are set:**

| Piece | Where | Switched on by |
|---|---|---|
| Leads to Postgres, alert log | `app/api/leads/route.ts`, `app/lib/db/*` | `DATABASE_URL`, `DIRECT_URL` |
| Email + WhatsApp alerts | `app/lib/notify/*` | `RESEND_API_KEY`, `WHATSAPP_PROVIDER` |
| Passwordless sign-in, roles | `auth.ts`, `app/login`, `app/lib/auth-guard.ts` | `AUTH_SECRET`, `ADMIN_EMAILS` |
| Admin inbox | `app/admin/*`, `app/lib/leads/*` | Sign-in plus database |
| Analytics events | `app/lib/analytics`, `instrumentation-client.ts`, `TrackedLink`, `PageEvent` | `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_CLARITY_ID` |

Until then leads reach only Vercel's runtime logs. Not started: client
dashboard, orders, payments, document upload.

## Verification commands

```bash
pnpm exec tsc --noEmit -p tsconfig.json   # types
pnpm lint                                  # eslint
pnpm build                                 # 241 pages
```

Tax math was checked against known values (₹12.75L salary is nil under the new
regime; ₹13L pays exactly ₹26,000 through marginal relief; HRA takes the least
of the three statutory limits). Re-run those checks after any edit to
`app/lib/tax/`.

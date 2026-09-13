# Client portal and document collection: design

The end-to-end system for collecting, tracking and verifying client
documents for every service, from the first checklist to the filed return.
Builds on the auth, leads and notifications already live (see
`docs/BACKEND.md`). Written 14 September 2026.

---

## 1. What it does

For the client: sign in with a link on email or an OTP on WhatsApp, see one
page per engagement ("ITR for Salaried, FY 2025-26") with a checklist of
exactly what to send, upload from the phone camera or a PDF, watch each item
go from Needed to Received to Verified, get a nudge only for what is still
missing, approve the draft, and download the filed acknowledgement.

For the team: an engagement is created from a lead in one click, the
checklist is generated from the service registry and the client's answers,
every upload lands against the right requirement with a version history,
verification is a two-button action with a reason on reject, the engagement
moves itself forward when the checklist completes, and every action is on a
timeline nobody has to write by hand.

Nothing is collected over unstructured WhatsApp chat unless the client
insists; when they do, the expert attaches the file to the requirement so the
record is still complete.

---

## 2. What the competition does

Public product flows, checked September 2026.

| Product | Collection model | Worth copying | Worth avoiding |
|---|---|---|---|
| ClearTax (self-serve) | Upload Form 16, it is parsed; AIS and 26AS pulled after the client links the portal | Parse Form 16 to prefill; consent-based fetch of AIS/26AS | No expert until you pay for the assisted tier; chat-only support |
| ClearTax (expert-assisted) | Checklist per plan, a CA assigned, drafts shared in-app | Checklist status per document; draft approval step | Documents requested in a chat thread, easy to lose |
| TaxBuddy | App and WhatsApp; CA assigned; checklist with "pending / uploaded"; heavy reminder cadence | WhatsApp-first for uploads; "what is still missing" nudges | Reminders fire even for items already sent; no reason on rejection |
| Tax2win (eCA) | Web form intake, upload area, email updates | Intake questionnaire that removes irrelevant documents | Status only by email; no timeline |
| Quicko | Self-serve, broker and AIS integrations | Clean per-source integration cards | Not expert-assisted; out of scope |

Pattern that wins: a **structured checklist per engagement** with a status
per document, **phone-first upload**, **consent-based fetching** of what the
department already has, **reasons on rejection**, and **one timeline** the
client and the expert both see. That is what this design builds.

---

## 3. Concepts

- **Client**: a `users` row with role `client`. One client can have many
  engagements (their own ITR, their spouse's, their firm's GST).
- **Engagement**: one service for one client for one period. "ITR for
  Salaried, FY 2025-26" or "GST monthly, Sept 2026". The spine of the system.
  Created by an admin from a lead, or by the client from a plan page.
- **Requirement**: one line on the checklist. Generated from the registry
  when the engagement is created, adjusted by the intake answers, and
  extendable by the expert ("also send the sale deed").
- **File**: one uploaded object against a requirement. Requirements keep
  every version; the latest one is what gets verified.
- **Event**: anything that happened, by whom, when. Drives the timeline,
  the audit log and the notifications.

---

## 4. Status model

Engagement:

```
created → intake → collecting → ready_for_review → in_preparation
        → draft_shared → approved → filed → verified → closed
                                                    ↘ on_hold (any time, with reason)
```

Requirement:

```
needed → received → verified
       ↘ rejected → received (re-upload)
needed → waived (expert says not applicable)
needed → consent_given → fetched (AIS, 26AS, we pull it)
```

Rules that move things automatically:

- All required requirements `verified`, `waived` or `fetched` → engagement
  goes `ready_for_review`, assigned expert is notified.
- Any requirement `rejected` → engagement returns to `collecting`, client is
  notified with the reason.
- Draft uploaded by expert → `draft_shared`, client notified, approval button
  appears.
- Client approves → `approved`; expert files; acknowledgement uploaded →
  `filed`; client e-verifies or we do with consent → `verified`; 7 days later
  with no reopen → `closed`, rating request sent.

---

## 5. Data model

Additions to `app/lib/db/schema.ts`. All tables have RLS enabled; access is
through server code that checks the role, same as `leads` today.

**`engagements`**
`id`, `client_id`, `service_slug` (registry), `period_label` ("FY 2025-26"),
`period_start`, `period_end`, `status`, `assigned_expert_id`, `lead_id`
(where it came from), `intake` jsonb (answers), `due_at` (statutory
deadline from the due-dates registry), `price_quoted`, `notes_internal`,
`created_by`, `created_at`, `updated_at`, `closed_at`.

**`requirements`**
`id`, `engagement_id`, `key` (registry key or `custom`), `label`,
`description`, `kind` (`id` / `statement` / `agreement` / `login` / `form`),
`required` boolean, `fetchable` boolean (we can pull with consent),
`status`, `reject_reason`, `waived_reason`, `consent_at`, `sort`,
`due_at`, `reminded_count`, `last_reminded_at`, `created_by`.

**`files`**
`id`, `requirement_id`, `engagement_id`, `version`, `storage_path`,
`original_name`, `mime`, `size`, `sha256`, `uploaded_by`, `source`
(`portal` / `whatsapp` / `expert` / `fetched`), `scan_status`, `created_at`.
Bytes live in Supabase Storage; this is metadata only.

**`deliverables`**
`id`, `engagement_id`, `type` (`draft` / `computation` / `acknowledgement`
/ `invoice` / `other`), `storage_path`, `version`, `approved_at`,
`approved_by`, `created_by`. What we give back.

**`engagement_events`**
`id`, `engagement_id`, `actor_id`, `actor_role`, `type`, `data` jsonb,
`visible_to_client` boolean, `created_at`. Append-only. The timeline.

**`messages`**
`id`, `engagement_id`, `author_id`, `body`, `attachments` jsonb,
`read_at`, `created_at`. One thread per engagement.

**`access_log`**
`id`, `file_id`, `user_id`, `action` (`view` / `download`), `ip`,
`created_at`. Required for the DPDP audit trail.

Existing tables that plug in: `users` (roles), `leads` (`converted_to`
engagement id), `notifications` (already logs every send; add
`engagement_id`).

---

## 6. The checklist registry

Today each service has `documents: string[]`. That becomes a structured
list in `app/lib/services.ts`, so the checklist stays version-controlled
and reviewed like copy:

```ts
documents: [
  { key: 'pan', label: 'PAN', kind: 'id', required: true, accept: ['image', 'pdf'] },
  { key: 'aadhaar', label: 'Aadhaar', kind: 'id', required: true, accept: ['image', 'pdf'] },
  { key: 'form16', label: 'Form 16', kind: 'form', required: true, accept: ['pdf'],
    help: 'Both Part A and Part B, from the employer portal or HR.' },
  { key: 'bank-interest', label: 'Bank interest certificate', kind: 'statement', required: true },
  { key: 'ais-26as', label: 'AIS and Form 26AS', kind: 'form', required: true, fetchable: true,
    help: 'Tick consent and we download these from the income tax portal.' },
  { key: 'rent-receipts', label: 'Rent receipts', kind: 'form', required: false,
    when: { intake: 'claims_hra', equals: true } },
  { key: 'investment-proofs', label: '80C, 80D and other proofs', kind: 'form', required: false,
    when: { intake: 'regime', equals: 'old_or_unsure' } },
]
```

**Intake** is a short questionnaire per service, also in the registry, asked
once when the engagement is created: "Did you change jobs this year?",
"Do you pay rent?", "Any share or mutual fund sales?". Answers switch
conditional requirements on and off, so the client never sees a document
that does not apply to them. The intake is skippable; skipped means every
conditional item shows as optional.

The existing `documents: string[]` keeps working during migration: a plain
string becomes `{ key: slug(text), label: text, kind: classify(text),
required: true }`, which is what `PlanDetails` already does visually.

---

## 7. Uploads and storage

- **Bucket**: Supabase Storage, private, region Mumbai. Path
  `engagements/{engagementId}/{requirementKey}/v{n}-{uuid}.{ext}`.
- **Upload path**: browser asks `POST /api/engagements/{id}/requirements/{rid}/upload-url`;
  the server checks the role and the requirement, then issues a **signed
  upload URL valid 2 minutes** for that exact path. The browser PUTs the
  bytes straight to storage, so Vercel never buffers a 15 MB PDF. On
  success the browser calls `POST .../complete`, the server reads the object
  metadata, computes SHA-256, writes the `files` row, moves the requirement
  to `received`, logs the event, notifies the expert.
- **Limits**: 15 MB per file, 10 files per requirement, types PDF, JPG, PNG,
  HEIC (converted to JPG client-side), XLSX, CSV, ZIP for broker exports.
- **Images**: resized client-side to a maximum of 2,500 px on the long edge
  and EXIF stripped before upload. A phone photo of a PAN card is 300 KB, not
  6 MB.
- **Multiple pages**: the client can upload several photos to one
  requirement; the expert sees them as one set.
- **Viewing**: signed download URLs valid 10 minutes, generated per request
  after the role check, every one logged in `access_log`. PDFs and images
  render inline in a viewer; everything else downloads.
- **Retention**: files kept 8 years after the engagement closes (the
  Income-tax Act's reassessment window plus margin), then deleted by a cron.
  A client can request deletion earlier; the request and the deletion are
  events.
- **WhatsApp inbound**: phase 2. Once the Cloud API is live, a media message
  from a known number is stored as an unassigned file on the client's open
  engagement; the expert drags it onto the right requirement. Until then the
  expert uploads it on the client's behalf with `source = whatsapp`.

---

## 8. Automation

| Trigger | Action |
|---|---|
| Engagement created | Checklist generated; welcome email and WhatsApp with the link and the list; due date set from the deadline registry |
| Upload completes | Requirement `received`; expert notified (batched, one message per hour per engagement) |
| Expert rejects | Requirement `rejected` with reason; client notified immediately with the reason and a one-tap re-upload link |
| Checklist complete | Engagement `ready_for_review`; expert notified; client told "we have everything" |
| Draft uploaded | `draft_shared`; client notified; approval screen shows the draft and a comment box |
| Client approves | `approved`; expert notified; the approval is an event with IP and timestamp |
| Acknowledgement uploaded | `filed`; client gets the ITR-V or ARN; e-verify instructions |
| 7 days after `verified` | `closed`; rating request |
| Nightly cron | Reminders for `needed` items: day 2, day 5, day 9 after creation, then weekly; stops the moment the item is received. Deadline warnings at 14, 7 and 2 days before `due_at` for anything not `filed` |
| Nightly cron | SLA flags for the admin: engagement in `collecting` over 10 days, `in_preparation` over the plan's turnaround, `draft_shared` unapproved over 3 days |
| Nightly cron | Retention deletion; orphaned storage objects removed |

Every action above writes an `engagement_events` row and, where a message
goes out, a `notifications` row, so "did we tell them?" is always answerable.

---

## 9. Screens

**Client** (`/dashboard`, mobile-first, the phone is the primary device)

1. **Home**: engagements as cards with a progress ring (verified / total),
   the next thing to do in one line ("2 documents needed", "Draft ready for
   your approval"), and the due date.
2. **Engagement**: header with service, period, expert name and photo, a
   status stepper (Collecting → Review → Draft → Filed). Then the checklist:
   each requirement is a card with the illustration by kind, a status chip,
   help text, and either an upload zone (camera, gallery, file) or the
   received file with its version. Rejected items sit at the top with the
   reason in red. Fetchable items show a consent toggle instead of an upload
   zone. Below: the timeline (client-visible events only), the message
   thread, deliverables to download.
3. **Approve draft**: the draft PDF inline, the key numbers (income, tax,
   refund) summarised above it, Approve or Request changes with a comment.
4. **Profile**: name, phone, WhatsApp opt-in, email, data-deletion request.

**Expert** (`/expert`, desktop)

1. **My engagements**: table filtered to assigned, sorted by SLA risk, with
   counts of received-but-unverified items.
2. **Engagement**: two panes. Left, the checklist with Verify / Reject
   (reason required) per file, a viewer for the current file, "Add
   requirement" and "Waive". Right, internal notes, the timeline with
   internal events, message thread, upload deliverable, status controls.

**Admin** (`/admin`, existing)

1. **Leads inbox** (exists) gains "Create engagement" which picks the
   service, period and expert, sends the invite, and marks the lead
   converted.
2. **Engagements board**: columns by status, cards coloured by SLA, drag to
   reassign expert.
3. **Clients**: search by name, phone, PAN (masked), see all engagements.
4. **Audit**: access log search by file or user; retention queue.

---

## 10. Security and compliance

- Documents are personal data under the DPDP Act 2023. Collect only what the
  checklist needs, say why in the help text, keep a consent event for
  fetching, honour deletion requests, and keep the access log.
- PAN and Aadhaar are never in logs, URLs, error messages or analytics
  events. The interface shows `ABCDE****F`.
- Role checked in every server action and route, not only in `proxy.ts`.
- Signed URLs only; no public bucket, ever. Upload URLs are scoped to one
  path and expire in 2 minutes.
- Client-side image processing means EXIF location data never reaches us.
- Uploaded files are served with `Content-Disposition` set and never executed;
  ZIPs are listed, not extracted, server-side.
- Staff accounts get TOTP before the second employee; experts see only what
  is assigned.
- Nightly database dump to a second private bucket; storage is versioned
  so a wrong delete is recoverable for 30 days.

---

## 11. Notifications

| Moment | Email | WhatsApp | In-app |
|---|---|---|---|
| Engagement created | Yes, with checklist | Yes, template | Yes |
| Reminder for missing items | Day 2, 5, 9, weekly | Day 2 and 5 only | Badge |
| Rejected with reason | Yes | Yes | Yes |
| All documents received | Yes | Yes | Yes |
| Draft shared | Yes | Yes | Yes |
| Filed, acknowledgement | Yes, with attachment | Yes | Yes |
| Deadline warning | 14, 7, 2 days | 7 and 2 days | Badge |
| Expert: new upload | Batched hourly | No | Yes |
| Expert: SLA flag | Daily digest | No | Yes |

Email goes through the existing Brevo sender with the same branded shell as
the lead acknowledgement. WhatsApp uses the Meta Cloud API utility templates
(about ₹0.12 each) once approved; until then the email carries the link and
the WhatsApp step is skipped and logged.

---

## 12. Build plan

Each phase ships on its own and is useful on its own.

**Phase A, the collection loop (2 to 3 weeks)**
Schema and migrations; structured `documents` in the registry with the
string fallback; intake questionnaire; engagement creation from a lead;
client dashboard with checklist and upload; signed upload and download;
expert verify and reject; timeline; email notifications through Brevo;
nightly reminder cron. Outcome: documents stop arriving on WhatsApp in
random order.

**Phase B, the delivery loop (1 to 2 weeks)**
Deliverables and draft approval; acknowledgement upload and e-verify
guidance; engagement board for admin; SLA flags; client rating; message
thread.

**Phase C, WhatsApp and fetch (1 to 2 weeks, needs Meta approval)**
Cloud API templates for the notification matrix; inbound media to the
engagement; phone OTP sign-in; consent-based AIS and 26AS fetch by the
expert with the consent event recorded.

**Phase D, money and scale (later)**
Razorpay on engagement creation per `docs/BACKEND.md`; invoices; Form 16
parsing to prefill the computation; client-created engagements from plan
pages; Hindi interface.

---

## 13. Cost

| Item | Now | At 500 engagements a year |
|---|---|---|
| Supabase | Free (500 MB database, 1 GB storage) | Pro, $25 a month, when storage passes 1 GB (roughly 2,000 files) |
| Vercel | Hobby, free | Pro, $20 a month, needed for cron more than once a day and team seats |
| Brevo | Free, 300 emails a day | Free still covers it |
| WhatsApp Cloud API | ₹0.12 per utility message | About ₹600 a month |
| Total | ₹0 | About ₹4,500 a month |

---

## 14. Decisions needed

1. **Who creates the engagement?** Recommended: admin from the lead for
   now, client self-serve from plan pages once payment is live.
2. **Payment before or after documents?** Recommended: after the draft is
   approved, for Phase A; the checklist is the free step that builds trust.
   Switch to pay-first per plan when Razorpay ships.
3. **Sign-in method for clients.** Email link exists today. Phone OTP is
   what most clients expect; it needs the WhatsApp Cloud API or an SMS
   provider (MSG91, about ₹0.20 per OTP). Recommended: email now, phone OTP
   in Phase C.
4. **Retention period.** 8 years proposed. Confirm with the CA partner.
5. **Are experts external?** If a partner CA will use the expert portal,
   the `expert` role needs its own sign-in and sees assigned engagements
   only; the design already assumes this.
6. **Which services first?** Recommended: all ITR plans and GST monthly,
   which cover most volume; registrations and audit follow because their
   document lists vary per case.

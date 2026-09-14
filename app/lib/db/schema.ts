import { boolean, index, integer, jsonb, pgTable, primaryKey, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import type { AdapterAccountType } from 'next-auth/adapters'

// ───────────────────────────────────────────────────────────────────────────
// Auth.js tables. Column names follow what @auth/drizzle-adapter expects, so
// the adapter needs no mapping beyond the table objects. Our own columns
// (role, phone, whatsappOptIn) sit alongside on `users`.
// ───────────────────────────────────────────────────────────────────────────

export const USER_ROLES = ['client', 'expert', 'admin'] as const
export type UserRole = (typeof USER_ROLES)[number]

export const users = pgTable('users', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name'),
  email: text('email').unique(),
  emailVerified: timestamp('email_verified', { mode: 'date' }),
  image: text('image'),
  // Ours.
  role: text('role').$type<UserRole>().notNull().default('client'),
  phone: text('phone'),
  whatsappOptIn: boolean('whatsapp_opt_in').notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

export const accounts = pgTable(
  'accounts',
  {
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccountType>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('provider_account_id').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (t) => [primaryKey({ columns: [t.provider, t.providerAccountId] })]
)

// Present for the adapter's sake; sessions use the JWT strategy so this table
// stays empty. Keeping it means switching strategies later is a config change.
export const sessions = pgTable('sessions', {
  sessionToken: text('session_token').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
})

// Magic-link tokens. A row is written when a link is emailed and deleted when
// it is used, so this table is small and self-cleaning.
export const verificationTokens = pgTable(
  'verification_tokens',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (t) => [primaryKey({ columns: [t.identifier, t.token] })]
)

// ───────────────────────────────────────────────────────────────────────────
// Leads
// ───────────────────────────────────────────────────────────────────────────

export const LEAD_STATUSES = ['new', 'contacted', 'quoted', 'converted', 'lost'] as const
export type LeadStatus = (typeof LEAD_STATUSES)[number]

export const leads = pgTable(
  'leads',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    name: text('name').notNull(),
    phone: text('phone').notNull(),
    email: text('email'),
    // Free-text answer to the per-category question. Options differ by
    // category and change with the catalogue, so this is not an enum.
    detail: text('detail'),
    message: text('message'),

    service: text('service'),
    sourceUrl: text('source_url'),
    referrer: text('referrer'),
    utm: jsonb('utm').$type<Record<string, string>>(),

    status: text('status').$type<LeadStatus>().notNull().default('new'),
    notes: text('notes'),
    // Which team member owns the follow-up. Null until someone claims it.
    ownerId: text('owner_id').references(() => users.id, { onDelete: 'set null' }),
    // Delivered-alert counter, kept for a fast "was anyone told?" check. The
    // per-attempt detail lives in `notifications`.
    notifiedCount: integer('notified_count').notNull().default(0),
    // Set when an engagement is created from this lead.
    convertedTo: uuid('converted_to'),

    ip: text('ip'),
    userAgent: text('user_agent'),

    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index('leads_created_at_idx').on(t.createdAt),
    index('leads_status_idx').on(t.status),
    index('leads_phone_idx').on(t.phone),
  ]
)

// Everything that happens to a lead after it arrives: status changes, notes,
// calls logged, WhatsApp replies. Append-only, so the inbox shows a complete
// history and nothing is lost when a note is edited.
export const LEAD_ACTIVITY_TYPES = ['status_change', 'note', 'call', 'whatsapp', 'email', 'assigned'] as const
export type LeadActivityType = (typeof LEAD_ACTIVITY_TYPES)[number]

export const leadActivities = pgTable(
  'lead_activities',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    leadId: uuid('lead_id')
      .notNull()
      .references(() => leads.id, { onDelete: 'cascade' }),
    // Null when the system did it (for example the initial alert).
    actorId: text('actor_id').references(() => users.id, { onDelete: 'set null' }),
    type: text('type').$type<LeadActivityType>().notNull(),
    fromStatus: text('from_status').$type<LeadStatus>(),
    toStatus: text('to_status').$type<LeadStatus>(),
    body: text('body'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index('lead_activities_lead_id_idx').on(t.leadId, t.createdAt)]
)

// ───────────────────────────────────────────────────────────────────────────
// Outbound messages: one row per attempt, per channel. This is the answer to
// "did the WhatsApp go out, and if not, why?" without opening Vercel logs.
// ───────────────────────────────────────────────────────────────────────────

export const NOTIFICATION_CHANNELS = ['email', 'whatsapp'] as const
export type NotificationChannel = (typeof NOTIFICATION_CHANNELS)[number]
export const NOTIFICATION_STATUSES = ['sent', 'failed', 'skipped'] as const
export type NotificationStatus = (typeof NOTIFICATION_STATUSES)[number]

export const notifications = pgTable(
  'notifications',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    leadId: uuid('lead_id').references(() => leads.id, { onDelete: 'cascade' }),
    engagementId: uuid('engagement_id'),
    userId: text('user_id').references(() => users.id, { onDelete: 'set null' }),
    channel: text('channel').$type<NotificationChannel>().notNull(),
    // 'resend', 'meta', 'webhook'... whatever actually carried it.
    provider: text('provider'),
    // What kind of message: 'lead_alert' today; 'order_paid', 'draft_ready'
    // and so on later.
    kind: text('kind').notNull(),
    to: text('to').notNull(),
    // Subject for email, template name for WhatsApp.
    subject: text('subject'),
    body: text('body'),
    status: text('status').$type<NotificationStatus>().notNull(),
    // Provider's own id, useful when chasing delivery with their support.
    providerMessageId: text('provider_message_id'),
    error: text('error'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index('notifications_lead_id_idx').on(t.leadId), index('notifications_created_at_idx').on(t.createdAt)]
)

export type Lead = typeof leads.$inferSelect
export type NewLead = typeof leads.$inferInsert
export type LeadActivity = typeof leadActivities.$inferSelect
export type Notification = typeof notifications.$inferSelect
export type User = typeof users.$inferSelect

// ───────────────────────────────────────────────────────────────────────────
// Engagements: one service, one client, one period. The spine of the client
// portal. Design in docs/DOCUMENT-PORTAL-DESIGN.md.
// ───────────────────────────────────────────────────────────────────────────

export const ENGAGEMENT_STATUSES = [
  'collecting',
  'ready_for_review',
  'in_preparation',
  'draft_shared',
  'approved',
  'filed',
  'verified',
  'closed',
  'on_hold',
] as const
export type EngagementStatus = (typeof ENGAGEMENT_STATUSES)[number]

export const engagements = pgTable(
  'engagements',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    clientId: text('client_id')
      .notNull()
      .references(() => users.id, { onDelete: 'restrict' }),
    serviceSlug: text('service_slug').notNull(),
    // Shown to the client: "FY 2025-26", "September 2026".
    periodLabel: text('period_label').notNull(),
    status: text('status').$type<EngagementStatus>().notNull().default('collecting'),
    assignedExpertId: text('assigned_expert_id').references(() => users.id, { onDelete: 'set null' }),
    leadId: uuid('lead_id').references(() => leads.id, { onDelete: 'set null' }),
    // Intake answers keyed by question id. Drives conditional requirements.
    intake: jsonb('intake').$type<Record<string, string | boolean>>(),
    // Statutory deadline for this engagement, from the due-dates registry.
    dueAt: timestamp('due_at', { withTimezone: true }),
    priceQuoted: integer('price_quoted'),
    notesInternal: text('notes_internal'),
    holdReason: text('hold_reason'),
    createdBy: text('created_by').references(() => users.id, { onDelete: 'set null' }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
    closedAt: timestamp('closed_at', { withTimezone: true }),
  },
  (t) => [
    index('engagements_client_id_idx').on(t.clientId),
    index('engagements_status_idx').on(t.status),
    index('engagements_expert_idx').on(t.assignedExpertId),
  ]
)

export const REQUIREMENT_STATUSES = ['needed', 'received', 'verified', 'rejected', 'waived', 'consent_given', 'fetched'] as const
export type RequirementStatus = (typeof REQUIREMENT_STATUSES)[number]
export const DOC_KINDS = ['id', 'statement', 'agreement', 'login', 'form'] as const
export type DocKind = (typeof DOC_KINDS)[number]

// One line on the checklist. Generated from the registry when the engagement
// is created; the expert can add ad hoc ones (key = 'custom').
export const requirements = pgTable(
  'requirements',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    engagementId: uuid('engagement_id')
      .notNull()
      .references(() => engagements.id, { onDelete: 'cascade' }),
    key: text('key').notNull(),
    label: text('label').notNull(),
    help: text('help'),
    kind: text('kind').$type<DocKind>().notNull().default('form'),
    required: boolean('required').notNull().default(true),
    // We can pull this ourselves once the client consents (AIS, 26AS).
    fetchable: boolean('fetchable').notNull().default(false),
    status: text('status').$type<RequirementStatus>().notNull().default('needed'),
    rejectReason: text('reject_reason'),
    waivedReason: text('waived_reason'),
    consentAt: timestamp('consent_at', { withTimezone: true }),
    sort: integer('sort').notNull().default(0),
    remindedCount: integer('reminded_count').notNull().default(0),
    lastRemindedAt: timestamp('last_reminded_at', { withTimezone: true }),
    createdBy: text('created_by').references(() => users.id, { onDelete: 'set null' }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index('requirements_engagement_idx').on(t.engagementId, t.sort)]
)

export const FILE_SOURCES = ['portal', 'whatsapp', 'expert', 'fetched'] as const
export type FileSource = (typeof FILE_SOURCES)[number]

// Metadata only; bytes live in the private Supabase Storage bucket.
export const files = pgTable(
  'files',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    engagementId: uuid('engagement_id')
      .notNull()
      .references(() => engagements.id, { onDelete: 'cascade' }),
    requirementId: uuid('requirement_id').references(() => requirements.id, { onDelete: 'set null' }),
    version: integer('version').notNull().default(1),
    storagePath: text('storage_path').notNull().unique(),
    originalName: text('original_name').notNull(),
    mime: text('mime').notNull(),
    size: integer('size').notNull(),
    sha256: text('sha256'),
    uploadedBy: text('uploaded_by').references(() => users.id, { onDelete: 'set null' }),
    source: text('source').$type<FileSource>().notNull().default('portal'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index('files_requirement_idx').on(t.requirementId), index('files_engagement_idx').on(t.engagementId)]
)

export const DELIVERABLE_TYPES = ['draft', 'computation', 'acknowledgement', 'invoice', 'other'] as const
export type DeliverableType = (typeof DELIVERABLE_TYPES)[number]

// What we give back: drafts for approval, the filed acknowledgement.
export const deliverables = pgTable(
  'deliverables',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    engagementId: uuid('engagement_id')
      .notNull()
      .references(() => engagements.id, { onDelete: 'cascade' }),
    type: text('type').$type<DeliverableType>().notNull(),
    title: text('title').notNull(),
    storagePath: text('storage_path').notNull().unique(),
    originalName: text('original_name').notNull(),
    mime: text('mime').notNull(),
    size: integer('size').notNull(),
    version: integer('version').notNull().default(1),
    // Client approval of a draft, with the comment they left.
    approvedAt: timestamp('approved_at', { withTimezone: true }),
    approvedBy: text('approved_by').references(() => users.id, { onDelete: 'set null' }),
    clientComment: text('client_comment'),
    createdBy: text('created_by').references(() => users.id, { onDelete: 'set null' }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index('deliverables_engagement_idx').on(t.engagementId)]
)

// Append-only. The timeline the client sees (visible_to_client) and the audit
// trail the team sees (everything).
export const engagementEvents = pgTable(
  'engagement_events',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    engagementId: uuid('engagement_id')
      .notNull()
      .references(() => engagements.id, { onDelete: 'cascade' }),
    actorId: text('actor_id').references(() => users.id, { onDelete: 'set null' }),
    actorRole: text('actor_role').$type<UserRole | 'system'>().notNull(),
    type: text('type').notNull(),
    // Human line for the timeline, written at the time so it never needs to be
    // reconstructed from ids.
    summary: text('summary').notNull(),
    data: jsonb('data').$type<Record<string, unknown>>(),
    visibleToClient: boolean('visible_to_client').notNull().default(true),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index('engagement_events_engagement_idx').on(t.engagementId, t.createdAt)]
)

// Every view or download of a client file. Required for the DPDP audit trail.
export const accessLog = pgTable(
  'access_log',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    fileId: uuid('file_id').references(() => files.id, { onDelete: 'set null' }),
    deliverableId: uuid('deliverable_id').references(() => deliverables.id, { onDelete: 'set null' }),
    userId: text('user_id').references(() => users.id, { onDelete: 'set null' }),
    action: text('action').$type<'view' | 'download' | 'upload'>().notNull(),
    ip: text('ip'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index('access_log_file_idx').on(t.fileId), index('access_log_created_idx').on(t.createdAt)]
)

export type Engagement = typeof engagements.$inferSelect
export type Requirement = typeof requirements.$inferSelect
export type StoredFile = typeof files.$inferSelect
export type Deliverable = typeof deliverables.$inferSelect
export type EngagementEvent = typeof engagementEvents.$inferSelect

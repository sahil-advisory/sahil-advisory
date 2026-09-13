# Backend setup: database, alerts, sign-in and analytics

The code is deployed and dormant. Each part switches on when its environment
variables are set in Vercel (Project, Settings, Environment Variables, then
Redeploy). Nothing here needs a code change.

The parts are independent. Do them in this order because each one makes the
next one more useful, but any subset works.

| Part | Variables | What you get |
|---|---|---|
| 1. Email | `BREVO_API_KEY`, `EMAIL_FROM`, `LEADS_TO_EMAIL` | Every lead in your inbox, and sign-in links. Minutes to set up |
| 2. Database | `DATABASE_URL`, `DIRECT_URL` | Leads stored permanently, with every alert attempt logged |
| 3. WhatsApp alerts | `WHATSAPP_PROVIDER`, `WHATSAPP_NOTIFY_TO` plus provider keys | Instant ping on your phone |
| 4. Sign-in | `AUTH_SECRET`, `ADMIN_EMAILS` | The admin inbox at `/admin` |
| 5. Analytics | `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_CLARITY_ID` | Funnels, conversions, session replay |

A lead is never lost because a later part is missing or down. Without the
database it is logged and alerted. With the database unreachable the visitor
still sees success. Verified against a real Postgres and a broken connection.

---

## 1. Email (Brevo)

Carries the lead alerts and the sign-in links. Brevo's free plan sends 300
emails a day and, unlike Resend, can send from a **verified sender address**
without owning a domain, so sahiladvisory1@gmail.com works as the sender
from day one.

1. Sign up at brevo.com with sahiladvisory1@gmail.com.
2. **Senders, Domains & Dedicated IPs**, then **Senders**, **Add a sender**.
   Enter the Gmail address, then click the confirmation link Brevo emails to
   it. The sender must show as verified.
3. Top-right profile menu, **SMTP & API**, tab **API Keys**, **Generate a new
   API key**. Name it `sahil-advisory-site`. Copy it; it is shown once.
4. Set:

```
BREVO_API_KEY=xkeysib-...
EMAIL_FROM=sahiladvisory1@gmail.com
EMAIL_FROM_NAME=Sahil Advisory
LEADS_TO_EMAIL=sahiladvisory1@gmail.com,sahiladvisorytax@gmail.com
```

`LEADS_TO_EMAIL` takes several addresses separated by commas.

The free plan adds a short "sent with Brevo" line to each email. When you
own a domain, add it under **Domains**, follow the DNS records, and switch
`EMAIL_FROM` to an address on it; deliverability improves and the sign-in
email looks like it comes from the business.

Resend is still supported: set `RESEND_API_KEY` instead and the code uses
it. It needs a verified domain to deliver to anyone but your own inbox.

## 2. Database (Supabase)

1. supabase.com, **New project**. Region **South Asia (Mumbai)** so client data
   stays in India. Save the database password; it is not shown again.
2. Click **Connect** and copy the connection string. You need it at two ports:

```
DATABASE_URL   ...pooler.supabase.com:6543/postgres   (transaction pooler, runtime)
DIRECT_URL     ...pooler.supabase.com:5432/postgres   (session pooler, migrations)
```

3. Create the tables. Locally, put `DIRECT_URL` in a `.env` file (it is
   gitignored) and run:

```bash
pnpm db:migrate
```

   Or paste the files in `drizzle/*.sql` into the Supabase SQL editor in
   numeric order.

4. Set both variables in Vercel and redeploy.

Every table has row level security enabled with no policies, so Supabase's
public API returns nothing for them. The app connects as table owner and is
unaffected. Do not add a policy unless you know exactly who it opens the
table to.

What the tables hold:

- `leads`: name, phone, the page's question answer, message, service, page
  URL, referrer, campaign parameters, status, owner.
- `lead_activities`: every status change, note and logged call, with who did it.
- `notifications`: one row per alert attempt, per channel, with the provider's
  error if it failed. This answers "did the WhatsApp go out?" without logs.
- `users`, `accounts`, `sessions`, `verification_tokens`: sign-in.

---

## 3. WhatsApp alerts

```
WHATSAPP_NOTIFY_TO=917888412302
```

Then one provider. Meta requires an approved template for business-initiated
messages, so option A involves a wait. Option B works today.

**Option A: official Cloud API** (`WHATSAPP_PROVIDER=meta`)

1. developers.facebook.com, create a Business app, add the WhatsApp product.
2. Copy the **Phone number ID**. Generate a **permanent** token via a System
   User; the temporary one on the setup page dies in 24 hours.
3. WhatsApp Manager, Message templates, create `new_lead`, category Utility,
   body with four placeholders in this order:

```
New lead: {{1}}
Phone: {{2}}
Service: {{3}}
Detail: {{4}}
```

4. After approval, set:

```
WHATSAPP_PROVIDER=meta
WHATSAPP_TOKEN=...
WHATSAPP_PHONE_NUMBER_ID=...
WHATSAPP_TEMPLATE_NAME=new_lead
WHATSAPP_TEMPLATE_LANG=en
```

**Option B: webhook** (`WHATSAPP_PROVIDER=webhook`)

Point it at AiSensy, Interakt, or a Zapier or Make automation:

```
WHATSAPP_PROVIDER=webhook
WHATSAPP_WEBHOOK_URL=https://...
WHATSAPP_WEBHOOK_TOKEN=          # optional bearer token
```

The endpoint receives `{ to, text, params }`. Whatever you point this at sees
the lead's name and phone; pick a service you would name as a processor in
the privacy policy.

---

## 4. Sign-in and the admin inbox

Passwordless. Staff enter their email and get a one-time link. No passwords
to leak or reset.

1. Generate a secret:

```bash
openssl rand -base64 32
```

2. Set:

```
AUTH_SECRET=<that value>
ADMIN_EMAILS=you@example.com,colleague@example.com
```

Anyone in `ADMIN_EMAILS` becomes an admin the first time they sign in. Anyone
else who signs in is a client with no admin access. Needs parts 1 and 2.

3. Optional, Google sign-in as a second button. In Google Cloud Console create
   OAuth credentials with redirect URI `https://<domain>/api/auth/callback/google`
   and set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`.

Then open `/login`, enter your email, click the link, and you land on `/admin`.

What the inbox does:

- `/admin`: counts for the last 7 and 30 days, the pipeline by status, top
  services and top sources.
- `/admin/leads`: the list, filter by status, search by name, phone or
  service, and an "alerted" column so a failed alert is visible.
- `/admin/leads/<id>`: call and WhatsApp buttons, status buttons, owner
  assignment, a log of calls and notes, and every alert attempt with its error.

---

## 5. Analytics

Three tools, each free at this scale, each doing a different job.

**PostHog** for funnels and events. Sign up at posthog.com (US region is fine),
copy the project API key and set:

```
NEXT_PUBLIC_POSTHOG_KEY=phc_...
```

Events flow through the site's own domain at `/ingest`, so ad blockers keyed
on posthog.com do not drop them. In PostHog build one funnel:

```
$pageview  →  plan_view  →  plan_cta_click / lead_submitted
```

**Google Analytics 4** for the numbers Search Console and Ads expect. Create a
GA4 property, copy the measurement ID:

```
NEXT_PUBLIC_GA_ID=G-...
```

In GA4 admin, mark these events as conversions: `lead_submitted`,
`whatsapp_click`, `call_click`, `plan_cta_click`, `consult_click`. Under Admin,
Data streams, add `accounts.google.com` to the referral exclusion list.

**Microsoft Clarity** for watching sessions. Create a project, copy the id:

```
NEXT_PUBLIC_CLARITY_ID=...
```

Recordings are tagged `lead_submitted` and `whatsapp_click` so you can filter
to sessions that converted.

Events sent, and what each one means:

| Event | Fires when |
|---|---|
| `lead_submitted` | The callback form was accepted. Carries `service` and `lead_id` |
| `lead_failed` | The form was rejected (bad number, rate limit) |
| `whatsapp_click` | Any WhatsApp link: float, footer, contact page |
| `call_click` | Any phone link: nav, footer, contact page |
| `plan_view` | A service plan page loaded |
| `plan_cta_click` | "Get started" on a plan card or plan page |
| `consult_click` | A "Book" button on the consultation page |
| `calculator_used` | First input change on a calculator, once per load |
| `calculator_cta_click` | The "View plan" button under a calculator result |
| `pricing_view` | The pricing page loaded |

`lead_id` on `lead_submitted` matches the row in Supabase, so an ad campaign
can be traced from click to stored lead to the status you set in the inbox.

---

## Checking it works

Submit the callback form on the live site, then:

- Supabase, Table editor, `leads`: the row, with `notified_count` of 1 once an
  alert went out. `notifications`: one row per channel with `sent`, `failed`
  or `skipped`.
- WhatsApp: the alert on the number in `WHATSAPP_NOTIFY_TO`.
- `/admin/leads`: the lead at the top, "alerted: yes".
- PostHog, Activity: a `lead_submitted` event with the same `lead_id`.
- Vercel, Logs, filter `[lead]`: the diagnostic line if any hop failed.

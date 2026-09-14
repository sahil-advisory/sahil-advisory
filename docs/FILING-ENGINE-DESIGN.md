# End-to-end filing engine: design

How the platform gets a client's real data from official sources, checks it
the way an experienced practitioner would, prepares the return, files it
through a legitimate channel and follows it to the acknowledgement. Companion
to `docs/DOCUMENT-PORTAL-DESIGN.md` (collection and tracking) and
`docs/BACKEND.md`. Written 14 September 2026.

---

## 1. The goal, and the constraint that shapes it

Goal: a client signs in, consents, and the system pulls what the tax
department already holds about them, reconciles it with what they upload,
computes the best outcome, shows the draft, and files, with a qualified
professional signing off at the points the law and good practice require.

Constraint: **the Income Tax Department publishes no open API for
individuals.** There are exactly three legitimate ways to act on a
taxpayer's account, and the department's Assisted Filing framework (July
2026) is explicit about them:

| Channel | Who | What it allows | For us |
|---|---|---|---|
| **My CA** | ICAI members only | Statutory forms (3CD, 15CB, 10B and so on), e-verify assigned forms, DSC | Audit and forms work via the empanelled CA. **Not ITR filing** |
| **My ERI** (e-Return Intermediary) | Registered ERIs: Type 1 (department utility), Type 2 (own software via API), Type 3 (offline utility) | Add clients with OTP consent, prefill from the department's own data, file ITRs, e-verify, ITR-V, rectification, refund reissue, condonation | **This is the filing channel** |
| **Authorised Representative** | Case by case (NRI, deceased, liquidation) | Near-full portal access for a period | Edge cases only |

ERI eligibility: a company with net worth above ₹1 crore, a firm of
Chartered Accountants, Advocates or Company Secretaries, a public sector
body, or an individual holding a Tax Return Preparer certificate. **A Cost
and Management Accountant practice is not on the list.** So Sahil Advisory
reaches the ERI channel one of three ways:

1. **Through a Type 2 ERI's API.** Sandbox (by Quicko) exposes ERI APIs:
   add client with OTP consent, prefill, submit ITR JSON, e-verify, ITR-V,
   plus Form 16 and 26AS OCR, capital gains calculators and GST filing.
   Fastest route, pay per use, no registration wait. The client consents to
   Sandbox as their ERI; our platform drives it.
2. **The empanelled CA partner's firm registers as a Type 2 ERI** and our
   software runs under their ERI credentials. Slower (registration,
   bank guarantee, audit report) but no per-return API cost and full
   control. Right move once volume justifies it.
3. **Sahil Advisory as a company with net worth above ₹1 crore** registers
   directly. A later-stage option.

Until any of these is live, the **manual path** stays: the client downloads
their prefill JSON, AIS and 26AS from the portal (five minutes, we send a
guide), the expert prepares the return in the department's offline utility
from that data, and the client uploads the JSON and e-verifies with Aadhaar
OTP. No password sharing, ever. The engine below works on the same data
either way; only the transport changes.

---

## 2. Data sources and how we reach each

| Data | Official source | Legitimate access | Phase |
|---|---|---|---|
| PAN validity, name, status | ITD | PAN verification API (Sandbox KYC, ₹1 to ₹3 per hit) | A |
| Prefill JSON (salary, interest, dividends, TDS, SFT high-value transactions) | e-filing portal | ERI prefill API after OTP consent; or client-uploaded JSON | A (manual), C (API) |
| AIS and TIS | e-filing portal (Compliance portal) | Same as prefill; or client-uploaded PDF/JSON, parsed by OCR | A (manual), C (API) |
| Form 26AS | TRACES | Client-uploaded PDF, parsed by 26AS OCR API; ERI prefill covers the TDS part | A |
| Form 16 (Part A and B) | Employer | Client upload, Form 16 OCR API extracts every field | A |
| Bank interest, statements | Banks | Account Aggregator (Setu or Finvu gateways, RBI-regulated, consent-based; Finvu prices per fetch or per user) | B |
| Broker capital gains and F&O | Zerodha, Groww, Upstox, Angel, ICICI Direct | Tax P&L exports uploaded by the client; Sandbox calculator APIs accept tradebook formats and compute STCG, LTCG, grandfathering, F&O turnover | A |
| Mutual fund gains | CAMS, KFintech | Consolidated capital gains statement upload, parsed | A |
| GST returns, GSTR-2B, ledger | GSTN | GSP/ASP APIs (Sandbox is a TSP on authorised GSPs): save and file GSTR-1, GSTR-3B, fetch GSTR-2B. Client enables API access on the GST portal and gives OTP per session | B |
| GSTIN of vendors and clients | GSTN | Public GSTIN search API | A |
| TDS filed by deductor (24Q, 26Q) | TRACES | No API. Deductor's own FVU and TRACES login; conso files uploaded | B |
| Company filings | MCA | MCA21 public data; DSC-based filing by the CA or CS | Later |

Every fetch is a **consent event** recorded against the engagement, with
what was requested, from where, when, and by whose OTP.

---

## 3. The expert engine

The part that "thinks like a practitioner". Deterministic rules first, AI
for extraction and explanation, a human before anything is filed.

### 3.1 Layers

1. **Extraction**: turn documents into structured facts. Form 16 OCR, 26AS
   OCR, AIS JSON parser, broker and MF statement parsers, bank statement
   parser (AA gives structured data directly). Each fact carries its source
   and a confidence. Low-confidence fields are flagged for the expert, not
   guessed.
2. **Reconciliation**: put the sources side by side.
   - Salary per Form 16 vs salary per AIS vs prefill.
   - TDS per Form 16 and Form 16A vs 26AS vs prefill. Any gap over ₹100 is
     a finding.
   - Interest per bank certificate vs interest in AIS (SFT-016).
   - Dividends in AIS vs demat statements.
   - Sale of securities in AIS (SFT-018) vs broker P&L.
   - Property transactions in AIS (SFT-012) vs client's disclosure.
   - GST turnover per GSTR-1 vs turnover in books vs receipts in 26AS.
   Each mismatch becomes a **finding** with a plain-English explanation and
   the action: "AIS shows ₹1,21,400 dividend from three companies; your
   statement shows two. Upload the third, or we report AIS."
3. **Rules**: the tax logic already in `app/lib/tax/rules/<fy>.ts` and
   `compute.ts`, extended to a full computation: heads of income, set-off
   and carry-forward, deductions with caps and eligibility, regime
   comparison, surcharge and marginal relief, rebate 87A with the
   capital-gains carve-out, 234A/B/C interest, advance tax shortfall, 44AD
   and 44ADA eligibility and the audit thresholds, ITR form selection from
   the facts (not from what the client thinks), Schedule FA and FSI
   triggers, residential status from travel dates.
4. **Judgement**: an assistant model (Claude) drafts the explanations,
   summarises findings for the expert, answers "why is my refund lower than
   last year", and proposes treatments for ambiguous items **as
   suggestions with citations to the section**. It never changes a number
   on its own. The expert accepts, edits or rejects each suggestion, and
   that decision is an event.
5. **Sign-off**: no return is generated for filing until a qualified
   professional (CMA or CA per the plan) has approved the computation, and
   no return is filed until the client has approved the draft. Both are
   recorded with identity, time and IP. E-verification is the client's own
   act (Aadhaar OTP) or done by the ERI with the client's OTP consent.

### 3.2 Findings, not errors

The engine's output is a list of findings ranked by rupee impact and risk:

- **Blocking**: cannot file. "Form 16 Part B missing", "AIS sale of
  property ₹48 lakh not explained".
- **Money**: changes tax. "Old regime saves ₹12,740 with the HRA you
  claimed", "80CCD(1B) unused, ₹50,000 headroom".
- **Risk**: likely notice. "Interest income in AIS ₹34,200 not in your
  return draft", "44AD opted out after opting in within 5 years, audit
  applies".
- **Housekeeping**: "Bank account for refund not pre-validated".

Every finding links to the guide or section page already on the site, so
the client can read why in plain English.

### 3.3 Coverage by service, first release

| Service | Extraction | Reconciliation | Rules | Filing transport |
|---|---|---|---|---|
| ITR for Salaried, Salaried Plus | Form 16, 26AS, AIS, bank interest | Salary, TDS, interest, dividends | Regime, deductions, HRA, ITR-1 vs ITR-2 | Manual now, ERI API in Phase C |
| Investors, F&O | Broker P&L, MF CAS, AIS | SFT-018 vs P&L | STCG/LTCG, grandfathering, 111A/112A, F&O turnover, 44AD, audit threshold, loss carry-forward | Same |
| Freelancers, Business | Bank via AA, invoices, GST returns | Receipts vs 26AS vs GSTR-1 | 44ADA/44AD vs books, advance tax | Same |
| NRI | Passport dates, NRO/NRE statements, TRC | Residential status, DTAA | Special rates, Schedule FA, 10F | Same |
| GST monthly | Sales register, purchase register, GSTR-2B | ITC in 2B vs books, vendor GSTIN status | Late fee, interest, reverse charge | GSP API in Phase B |
| Notices | Notice PDF (OCR) | Notice vs filed return vs AIS | Section, deadline, response type | Response drafted; filed by client or ERI |

---

## 4. Architecture

```
Client (portal, phone)            Expert (portal)
      │ uploads, consents               │ reviews findings, edits, signs off
      ▼                                 ▼
┌──────────────────────────────────────────────────────┐
│ Engagement (docs/DOCUMENT-PORTAL-DESIGN.md)           │
│  requirements · files · events · consents             │
└───────────────┬──────────────────────────────────────┘
                ▼
┌──────────────────────────────────────────────────────┐
│ Facts store  (per engagement, per source, versioned)  │
│  facts(engagement_id, source, key, value, confidence, │
│        evidence_file_id, fetched_at)                  │
└───────┬──────────────┬───────────────┬────────────────┘
        │              │               │
  Extractors      Connectors       Reconciler + Rules
  (OCR, parsers)  (ERI, AA, GSP,   (findings, computation,
                   PAN, GSTIN)      form selection)
        │              │               │
        └──────────────┴───────┬───────┘
                               ▼
                    Computation (versioned JSON)
                     draft PDF · ITR JSON · findings
                               ▼
                    Sign-off → Client approval → Transport
                    (ERI API | offline JSON | GSP API)
                               ▼
                    Acknowledgement · e-verify · status polling
```

- **Facts store**: one table, `facts`, append-only per engagement. A
  computation is built only from facts, so every number in the draft traces
  back to a file or a fetch.
- **Connectors** are isolated modules under `app/lib/connectors/*`, each
  with a `fetch(consent)` and a `parse()`; swapping Sandbox for our own ERI
  credentials later changes one module.
- **Computation** is pure: `compute(facts, rules[fy]) → { schedules,
  findings, itrForm, itrJson }`. Testable against the department's own
  utility. Versioned per engagement, so the expert can diff draft v2 against
  v1.
- **Transport** is the last step and the only one that touches the outside
  world with the client's identity.

New tables: `facts`, `consents`, `computations`, `findings`, `filings`
(transport attempts, acknowledgement numbers, e-verify status, ITR-V path).

---

## 5. Filing flows

### ITR, Phase A (manual transport, everything else automated)

1. Engagement created; checklist includes "Prefill JSON, AIS and 26AS from
   the portal" with a two-minute video and steps. Most clients manage it;
   the expert can do it on a call for those who cannot.
2. Client uploads Form 16 and the rest. Extractors run on upload; facts
   appear on the expert's screen within a minute.
3. Reconciler produces findings. Blocking ones go back to the client as
   requirements ("Upload Form 16 Part B").
4. Expert reviews, resolves findings, approves the computation.
5. Client sees the draft: income, deductions, tax, refund, regime chosen,
   and the findings that changed the outcome. Approves.
6. Expert exports the ITR JSON. On a short call or screen-share the client
   logs in, uploads the JSON, e-verifies with Aadhaar OTP. Acknowledgement
   uploaded to the engagement; status `filed` → `verified`.
7. Cron polls nothing (no API) but sends the client the "refund status"
   guide and reminds them at 30 and 60 days to check.

### ITR, Phase C (ERI transport)

Steps 1 and 6 change: the client taps "Allow Sahil Advisory to fetch my
data", enters the OTP the department sends, and the prefill, AIS and 26AS
arrive as facts. After approval, the return is submitted through the ERI
API, e-verified by OTP, and the ITR-V and processing status (143(1)
intimation, refund issued) are polled and shown on the timeline.

### GST monthly, Phase B

1. Client enables API access on the GST portal once (two clicks) and shares
   the OTP each session.
2. GSTR-2B fetched on the 14th; purchase register uploaded or synced from
   Tally/Zoho export; reconciler lists ITC mismatches and vendors who have
   not filed.
3. Sales register uploaded; GSTR-1 saved through the API; client sees the
   summary and approves; filed with OTP.
4. GSTR-3B computed from GSTR-1 plus eligible ITC; late fee and interest
   computed if past due; approved; filed.
5. Challan generated; payment link; filing confirmed; ARN on the timeline.

### Notices

Notice PDF uploaded → OCR reads section, DIN, deadline, demand → reconciler
compares with the filed return and AIS → engine drafts the response outline
with the relevant evidence list → expert writes the reply → filed by the
client on the portal (or the ERI where the response type allows).

---

## 6. What "acts like an expert" means, precisely

- It **never invents a number**. Every figure in a draft has a source fact.
- It **never files without two approvals**: the professional's on the
  computation and the client's on the draft.
- It **explains in plain English** and links to the section page.
- It **flags rather than decides** on grey areas: presumptive vs books,
  HRA with rent to a parent, crypto classification, foreign ESOP
  perquisites.
- It **learns nothing from client data across clients**. The assistant
  model is called with one engagement's facts and no memory.
- It keeps the professional in charge and visibly named on every
  engagement, which is also what the site promises.

---

## 7. Build plan

Extends the phases in the portal design.

**Phase A (with the collection loop, 3 to 4 weeks)**
Facts store; Form 16 and 26AS OCR connectors (Sandbox); AIS JSON and
prefill JSON parsers; broker P&L and MF CAS parsers for Zerodha, Groww,
Upstox, Angel, CAMS, KFintech; PAN verification; reconciler for the
salaried and investor cases; full computation for ITR-1 to ITR-3 with the
department's utility as the test oracle; findings on the expert screen and
the client draft; ITR JSON export; manual transport flow with the guide.
Outcome: a salaried return goes from upload to draft in minutes, with the
expert reviewing findings instead of typing numbers.

**Phase B (3 weeks)**
Account Aggregator for bank data; GST connector on a GSP through Sandbox:
GSTR-2B fetch, ITC reconciliation, GSTR-1 and 3B save and file with OTP;
notice OCR and triage; freelancer and business rules (44AD, 44ADA, books).

**Phase C (2 weeks plus consent onboarding)**
ERI transport through Sandbox: add client with OTP, prefill and AIS fetch,
submit, e-verify, ITR-V, status polling. In parallel, start the partner
CA firm's Type 2 ERI registration so the transport can move in-house.

**Phase D**
NRI rules and DTAA; company and LLP returns (ITR-5, ITR-6) with MCA data;
TDS returns via FVU generation; Tally and Zoho sync; Hindi.

---

## 8. Cost per return (API path)

| Item | Approximate |
|---|---|
| PAN verification | ₹2 |
| Form 16 OCR, 26AS OCR | ₹10 to ₹20 per document |
| Capital gains calculator per tradebook | ₹20 to ₹50 |
| ERI filing bundle (add client, prefill, submit, e-verify, ITR-V) | ₹40 to ₹80 per return on published Sandbox tiers; volume pricing on request |
| Account Aggregator fetch | ₹5 to ₹15 per consent |
| GST return filing through GSP | ₹5 to ₹15 per return; some GSPs charge a monthly minimum |
| Assistant model calls per engagement | ₹5 to ₹15 |

Against a ₹499 salaried plan, the fully automated path costs ₹60 to ₹120
per return and removes most of the expert's typing time. Confirm current
prices with Sandbox before Phase C; treat these as order-of-magnitude.

---

## 9. Risks and how the design handles them

- **ERI dependence**: Sandbox pricing or terms change. Mitigated by the
  connector abstraction and by starting the partner CA firm's own ERI
  registration in Phase C.
- **Department changes formats**: ITR JSON schemas change every year.
  Mitigated by versioning rules per FY and testing against the utility.
- **Wrong extraction**: OCR misreads a digit. Mitigated by confidence
  scores, reconciliation across sources, and expert review of every
  finding.
- **Liability**: the platform is a tool; the named professional is
  responsible for the return. Sign-off events, versioned computations and
  the facts trail are the evidence that the work was done properly.
- **Privacy**: PAN, Aadhaar, salary and bank data. Everything in
  `docs/DOCUMENT-PORTAL-DESIGN.md` section 10 applies; consents are
  explicit, scoped and revocable; the assistant model receives no data
  beyond the engagement and stores nothing.
- **CMA scope**: tax audit and statutory audit stay with the empanelled CA
  and the My CA channel; the engine prepares working papers, the CA signs.

---

## 10. Decisions needed

1. **ERI route**: start on Sandbox's ERI API (fast, per-use cost) while the
   partner CA firm registers as a Type 2 ERI? Recommended: yes, both.
2. **Which broker formats first**: Zerodha, Groww, Upstox, Angel One in
   that order unless your clients differ.
3. **Assistant model budget**: cap per engagement (₹15) and log every call.
4. **Manual transport script**: a 10-minute screen-share call per filing is
   the Phase A reality. Confirm the team can staff it in July.
5. **GST first or ITR first for the API work**: ITR volume peaks June to
   September; GST is every month. Recommended: ITR extraction and rules in
   Phase A, GST API in Phase B before the next filing season.

---

## Sources

- Income Tax Department, Assisted Filing: https://www.incometax.gov.in/iec/foportal/help/assissted-filing
- Income Tax Department, ERI registration: https://www.incometax.gov.in/iec/foportal/help/eri/registration
- Income Tax Department, ERI API specifications: https://www.incometax.gov.in/iec/foportal/api-specifications
- Income Tax Department, Work with My CA: https://www.incometax.gov.in/iec/foportal/help/how-to-work-with-ca
- ERI eligibility summary: https://cleartax.in/s/e-return-intermediary-eri-income-tax
- Sandbox income tax APIs: https://sandbox.co.in/income-tax and https://developer.sandbox.co.in/docs/income-tax
- Sandbox GST APIs: https://sandbox.co.in/gst
- Setu Account Aggregator: https://docs.setu.co/data/account-aggregator/overview
- Finvu Account Aggregator pricing: https://finvu.in/pricing

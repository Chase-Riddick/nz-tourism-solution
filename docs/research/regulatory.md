# What a real New Zealand tour operator has to hold

Fetched 2026-08-18. This research does double duty: it populates the trust/credentials
surface of the site (a real operator publishes these, and their absence is a tell), and
it generates a large share of `docs/sam-decisions.md` — because almost every item here
is something **Sam** must actually obtain.

**Nothing in this file is legal advice, and no credential number on the site is real.**
Every credential renders as a labelled placeholder with a `SAM-VERIFY` marker.

## DOC concession — the one that actually gates the itineraries

A **concession** from the Department of Conservation is required to operate
commercially on public conservation land.

- **Passenger transport operators visiting DOC-managed parks and reserves to use
  facilities must hold a valid concession**, but for that class an approved safety plan
  is *not* required.
- Operators working in **dangerous terrain**, or providing an **adventure activity**,
  may additionally need an **Adventure Activity Audit**.

This directly constrains the product. Tongariro National Park, Te Urewera, Whirinaki,
and most of the coastal walking on an East Cape itinerary are conservation land. A
guided walk there is not something an operator can simply start doing.

→ `sam-decisions.md`: which itineraries touch conservation land, and therefore which
concession class is needed, before any of these tours can be sold.

## Adventure Activities Regulations 2016 — classification is the question

The **Health and Safety at Work (Adventure Activities) Regulations 2016** define an
"adventure activity". Operators of one must:

1. have their safety plan audited by a **WorkSafe Recognised Safety Auditor**,
2. receive a **safety audit certificate**, and
3. **register with WorkSafe New Zealand**.

The live question for this operator is **classification**: guided walking, kayaking and
caving sit near the boundary, and where a given itinerary falls decides whether the
full audit-and-registration regime applies. Guided sightseeing by vehicle generally does
not; a guided alpine crossing plausibly does.

→ `sam-decisions.md`: get each activity classified before publishing it. This is the
single highest-consequence unknown on the site.

## Qualmark — and the reason it is worth more than a badge

**Qualmark is owned by Tourism New Zealand** and provides sustainable-tourism business
evaluation. Accredited operators must meet minimum health and safety requirements
demonstrating an appropriate safety management system.

The non-obvious payoff, and the reason the site treats it as a priority rather than a
vanity badge: **Qualmark accreditation can be used as evidence of a safety management
plan when applying for a DOC concession.** One process satisfies part of another.

→ `sam-decisions.md`: pursue Qualmark early — it is a credential *and* a shortcut.

## The rest of the compliance surface

Researched but lower-consequence, all rendered as placeholders on the site:

| Item | What it is | Why it is on the site |
|---|---|---|
| **NZBN** | New Zealand Business Number | Every real NZ business publishes one. Its absence reads as fake. |
| **GST registration** | Required above the turnover threshold | Prices must state GST-inclusive or not. This site states **GST inclusive**. |
| **P endorsement** | Passenger endorsement on the driver licence | Required to carry paying passengers. Non-negotiable for a driver-guide. |
| **Public liability insurance** | — | Wholesalers and many venues require evidence before they will contract. |
| **TIA / Tourism Export Council** | Industry membership | Recognised trust signal; TEC matters specifically for reaching offshore wholesalers. |

## How this renders on the site

A real operator's footer and a "Safety & credentials" page carry these. Ours does too —
but every number is a placeholder, visibly marked, and listed in `sam-decisions.md`.

The judgement call: **showing the credential surface with honest placeholders beats
omitting it.** Omitting it makes the site read as a brochure mock-up; showing invented
NZBN digits would be fabricating a government identifier. Labelled placeholders do the
design job without inventing a real-looking registration.

## Sources

- DOC, Compliance: managing your concession — https://www.doc.govt.nz/get-involved/apply-for-permits/managing-your-concession/compliance/
- DOC, Safety plans — https://www.doc.govt.nz/get-involved/apply-for-permits/managing-your-concession/safety-plans/
- WorkSafe, Apply for adventure activity operator registration — https://www.worksafe.govt.nz/topic-and-industry/adventure-activities/apply-for-adventure-activity-operator-registration/
- Qualworx, Certifications — https://qualworx.nz/certifications
- Stay Safe, "Crossing the t's" — https://staysafe.net.nz/crossing-the-ts/

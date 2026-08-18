# Context — Slow North

Domain language for this repo. Issue titles, test names and interface vocabulary
use these terms. If a concept you need isn't here, that's a signal: either you're
inventing language the project doesn't use, or there's a real gap worth adding.

## The business

**Slow North** — a *hypothetical* North Island tour operator. Two to four people,
one vehicle, maximum eight guests. One- to five-day guided tours, year-round,
based in Rotorua and working out of Auckland.

**Sam** — the real New Zealander this site is built for: a seasonal tour guide
considering going out on his own. He is the audience, not a customer. Anything
only he can decide is a **`SAM-VERIFY`** marker, mirrored in `docs/sam-decisions.md`.

## Core nouns

| Term | Means |
|---|---|
| **Tour** | A sellable product with a fixed duration, price and season. The unit of the catalogue. Never "package", "trip" or "experience". |
| **Day tour** | A tour of `days: 1`. Returns to base the same night, so it can run almost daily. |
| **Multi-day tour** | `days > 1`. Carries accommodation, so it has set departures and a peak supplement. |
| **Departure** | A specific dated instance of a tour. Constrained by guide rest days. |
| **Base** | Where a tour departs from — `auckland` or `rotorua`. |
| **Season** | Which months a tour runs, as `months: Month[]`. Not marketing copy — a hard constraint. |
| **Alpine season** | October–May. The only window the Tongariro Alpine Crossing can be sold in. |
| **Peak supplement** | The December–February uplift on multi-day tours, because accommodation and vehicle costs rise 20–50%. |
| **Locale** | `en` or `de`. A published locale is a *service promise*, not a translation. |
| **Credit** | An image's licence + author + source. A licence condition, not a courtesy. |
| **Curation verdict** | `hero` / `gallery` / `texture` / `reject` — the human judgement over the machine-filtered photo set. |
| **Surface** | `dream` (dark, photography leads) or `work` (light, reader is comparing). Chosen by page function. |

## Words we deliberately avoid

- **"Package"** / **"experience"** — tour-industry filler. It's a tour.
- **"Authentic"**, **"hidden gem"**, **"bucket list"** — says nothing and reads as brochure.
- **"Adventure"** used loosely — it has a *regulatory* meaning here (Health and
  Safety at Work (Adventure Activities) Regulations 2016). Use it only when that
  classification is meant.
- Te reo Māori as branding. Place names, correctly macronised, yes. Sacred terms
  as decoration, never. See `docs/research/brand-and-design.md`.

## Invariants

1. **The site is `noindex`.** Ethics rule, not SEO. See `docs/adr/`.
2. **Prices are published**, NZD, GST inclusive, per person.
3. **Every published image has a credit entry**; rejected images never reach `public/`.
4. **Every locale is complete** — no English fallback in German body copy.
5. **The Crossing is never year-round.**
6. **No fact lives outside `constants.ts` / `catalog.ts`.**

## Testing seam

**One seam: the built site, exercised in a browser.** Playwright over `dist/`.
Everything above is observable there. See the PRD for why.

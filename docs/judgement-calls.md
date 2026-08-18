# Judgement calls

Every non-obvious decision on this build, why it went that way, and what was
rejected. Appended to continuously — newest section at the bottom of each area.

The brief asked for "a short note explaining every judgement call you made." This
is the long form; the short form is in the handoff summary.

---

## Process

### Skipped `/grill-me`, substituted research

The suggested chain was `/grill-me` → `/to-prd` → `/to-issues` → `/tdd`. Step one
is "interview the user relentlessly across every branch of the design tree."

That directly contradicts the brief: *"Run as autonomously as possible. This is a
side effort and should not consume my attention. Do not come back with questions
you could have answered by researching."*

So the interview is replaced by research. Where `/grill-me` would have extracted a
decision from the user, this build derives it from what comparable real operators
actually do and records the derivation in `docs/research/`. The rest of the chain
still earns its place as structure.

Recorded rather than silently dropped, because the user named the step.

### Batched the setup questions

`/setup-matt-pocock-skills` asks its three decisions one at a time by design. They
were batched into a single round instead, for the same autonomy reason. All defaults
were taken.

### Three questions asked, deliberately

The brief sanctioned exactly one ("Confirm the exact domain/org string with me").
That was asked, along with repo owner and visibility, because the answers change
where every artifact lands and are not researchable. Everything else on this build
is a research question, and was treated as one.

### Course correction, 2026-08-18: the first pass was built the wrong way

Recorded because it is the most important process decision on the project, and
because the failure is instructive rather than embarrassing.

The brief asked for a measured, well-engineered build: skills configured, a
repo, issues, and a TDD Ralph loop. What actually happened was that the research
phase ran properly and then the entire application — 33 files, 24 pages — was
built in **one uninterrupted pass with no tests, no issues, and no remote.**

The tell was in my own plan: "Playwright harness" was listed as *step 5*. Tests
last is the exact inversion of test-first. Configuring `docs/agents/issue-tracker.md`
and then never opening an issue is the same error in a different place.

Two things fell out of it, both real:

- **238 MB of full-resolution originals were committed to git history.** The
  photography commit ran `git add -A` before `.gitignore` existed, and a later
  `.gitignore` does not untrack what is already tracked. Caught only because the
  pause prompted a check of the repo state. History was rewritten before any
  push; `photo-library/` originals are regenerable via `npm run photos:source`,
  so only the manifest and curation JSON are tracked.
- **No test ever ran.** Not one. A build that compiles is not a build that works,
  and "24 pages built" was reported as though it were evidence.

The correction: `spike/first-pass` holds the first pass as a reference, `main`
returns to research plus infrastructure, and every slice is re-landed behind a
failing test through an issue. The research (markets, pricing, regulatory,
seasons, brand) and the photography pipeline are kept — those were done
properly, and they are the part the brief called "the job."

**The general lesson, for whoever reads this next:** the research being good is
not evidence the process was good. They are independent, and this project got
one right and one wrong.

---

## Positioning and hosting

### `noindex`, permanently

The repo is public and the site will be live on a real domain. It describes a tour
operator that does not exist, with invented prices, a real-sounding name, and a
booking flow that looks real.

Someone searching for a North Island tour must not find it. Every page ships
`<meta name="robots" content="noindex">`, `robots.txt` disallows everything, and
`SITE.indexable` is `false`.

This is the reverse of what a real marketing site wants, and it is deliberate. The
site's audience is exactly one person, who will be sent the URL directly. Nothing
about being findable serves that audience, and being findable actively risks
misleading a real traveller.

*Rejected:* password-protecting it. Amplify supports basic auth, but the brief wants
something that "feels finished and real" to a non-technical viewer — a browser auth
prompt is the single most wireframe-ish thing you can put in front of someone.

### Domain: a `claralabs.tech` subdomain, not `langzhiedu.com`

The brief said "deploy under the LangZhi org," and `langzhiedu.com` is the domain
the reference build previews on. The user chose `claralabs.tech` instead when asked.
That reframes the piece as a Clara Labs portfolio/demo property rather than a LangZhi
one, which is consistent with it being a speculative build for a friend rather than
client work.

The canonical origin lives in exactly one constant (`SITE.url`), so this stays a
one-line change.

### Repo: a new `claralabs` GitHub org, public

`clara-labs` was already taken by an unrelated account; `claralabs` was free.

Free GitHub orgs cannot be created via the REST API — `POST /orgs` returns 404 for
non-enterprise tokens. It is a one-click web action, so the build proceeds locally
and pushes once the org exists. This blocks the push, not the work.

Public + fictional is why the `noindex` rule above is not negotiable, and why the
README leads with a fictional-company notice.

---

## Where the reference build's answer does NOT carry over

`../capital-v3` is the completeness bar. Two of its central decisions are wrong here,
and copying them would be the main way this build fails by imitation.

### Prices ship (reversing capital-v3's ADR-0005)

That repo went quote-only. Reading its own ADR, the reasoning was entirely
client-driven: the school quotes per student and sends an individual PDF. The ADR
explicitly records that this *reversed a researched decision* — its competitor
teardown had found price transparency to be "the single strongest pattern shared by
both model sites," and that "contact us" was "a measurable disadvantage."

There is no client here to instruct otherwise, and a one-day tour is a comparison
purchase where essentially every real operator publishes a rate. The research finding
stands on its own; only the client instruction is absent. So prices ship.

This also makes the artifact more useful to Sam: a concrete number is something he
can disagree with. "Contact us for pricing" gives him nothing to react to, and
reacting is the entire point of the deliverable.

### Locale sequencing: English first, German once the content is confirmed

*Chase, 2026-08-18.* The build originally shipped English and German together.
It now ships English alone, with German queued behind content confirmation.

The reasoning is about **churn, not budget**. This site exists to be argued with:
Sam is expected to change prices, durations, itineraries and seasons. Every one
of those edits would have to be made twice, in a language the person making the
edit may not read. The second copy does not stay wrong loudly — it stays wrong
quietly, which is worse.

Nothing is lost. The i18n layer is n-locale generic, `localePath()` already
reserves the `/de/…` prefix so no URL moves later, and a full German dictionary
plus all ten tours' German copy already exist on `spike/first-pass`.

The market research is untouched and still selects German. See below.

### Few locales, each complete (reversing capital-v3's ~15)

That repo ships around fifteen locales because multilingual *is* the product for a
language school — a prospective student's language is the market segment.

Here it is a service promise. A team of two to four that publishes a German page is
implying someone answers German email and, plausibly, guides in German. Fifteen
locales would be fifteen promises the business cannot keep, and the brief explicitly
scopes to what such a team could actually run.

Locale list is set by inbound-arrivals research, not by guesswork, and every shipped
locale is complete — no half-translated pages, no English fallbacks in body copy.

---

## Content and research

Recorded in full in `docs/research/`. The five that most shape the site:

1. **Prices are triangulated, not invented.** Four independent reference points,
   and the two that should agree do: an independent NZ$269/person/day mid-range
   benchmark and Wild Kiwi's ~$283/day land within 5% of each other.
2. **The Tongariro Alpine Crossing can only be sold October–May.** Shuttles stop
   when snow covers the track, and operators must stop running *under the terms of
   their DOC concession*. This is encoded as data (`ALPINE_SEASON`) and asserted
   by tests, not written as marketing copy.
3. **The company name is English on purpose.** NZ guidance is explicit that te reo
   naming without cultural foundations is appropriation, and IPONZ can decline a
   mark on a noa/tapu basis. "Longwhite" was the leading candidate until research
   found three separate collisions.
4. **Credentials are shown as placeholders, never invented.** Fabricating a
   plausible NZBN forges a government registry number — a different act from
   drafting marketing copy. Asserted by `tests/trust.spec.ts`.
5. **No photograph of a person appears anywhere.** No model releases exist for
   Commons imagery, so those slots are absent rather than faked.

---

## Design

### The palette departs from the brief, and this is the most useful thing here

The instinct given was *New Zealand's blues and greens, possibly on a dark
ground*. The dark ground is confirmed and the hues are right. But **blue and
green alone is a South Island palette** — glacial lakes, snow, tussock, the
Aoraki postcard. It is the *other island*.

The North Island's signature is volcanic and geothermal: basalt and black sand,
the sulphur and ochre of Wai-O-Tapu, the orange rim of the Champagne Pool, steam
over Rotorua. A cool-only palette would render this operator generically *New
Zealand* and specifically *not North Island* — the exact confusion a site selling
North Island tours cannot afford.

So blues and greens hold the ground, and a **geothermal sulphur accent** does the
work. One accent, used rarely. The hero photograph (Red Crater, with its volcanic
reds and ochres) is the argument in a single image.

### Dark ground, but split by page function

A fully dark site sells exclusivity. This operator sells $265 day tours to
families, and full-dark would misprice it visually before a reader reaches a
number.

- **`surface-dream`** (basalt): hero, destinations, galleries, narrative. Where
  photography leads and the reader is imagining.
- **`surface-work`** (warm off-white): prices, dates, inclusions, FAQ, forms,
  policies. Where the reader is comparing and deciding.

Components read CSS custom properties and never hardcode a colour, so the same
card works on either surface. It is also an accessibility argument: dense tabular
information is measurably harder to read light-on-dark, and pricing tables are the
densest thing here.

### Type

Fraunces (variable soft-serif, real character) over Inter. Deliberately **not**
the reference build's Newsreader/Noto pairing — the same technical approach,
self-hosted with unicode-range subsetting, but a different voice.

`latin-ext` is a hard requirement rather than an optimisation: it carries the
Māori macrons (ā ē ī ō ū) in Taupō, Ōpōtiki and Te Rēinga, and German's ä ö ü ß.
Coverage was verified against the actual glyph tables, not assumed from the
declared unicode range.

### Motion

Calibrated against the reference build's depth, in our own vocabulary:
staggered scroll reveal, and a 26-second hero drift at scale 1.06→1.12 —
deliberately not 1.2, because at hero scale a large factor reads as a zoom
effect rather than as weather.

Reduced motion is handled in **both CSS and JS**, so it holds before the script
runs, and the spec asserts computed opacity is 1 for every staged element.
Content never depends on an effect having run.

### What is deliberately not done

No marae, moko or taonga as decorative texture. No "100% Pure" mimicry. No
full-screen autoplay video — category cliché, a bandwidth problem on rural NZ
connections, and a small operator has no footage. No red-and-green pairing:
pōhutukawa crimson next to forest green reads as Christmas.

---

## Process, in hindsight

The single most valuable thing the TDD loop did was **catch tests that could not
fail.** Three cases:

- a per-day-rate assertion that looped over a locator matching zero elements
- guards written against already-clean source, which pass without proving anything
- worst: the harness ran against a **stale `dist/`**, so an injected regression
  "passed". The whole suite was capable of lying.

Every guard on this build has since been verified by injecting the failure it is
meant to catch — a hardcoded price, a raw catalogue key, a year-round Tongariro
Crossing, a rejected image leaked into `public/`, an unconditional `gtag` in
`<head>`, a plausible 13-digit NZBN. All caught, all reverted.

The slicing was also wrong in one place: no issue owned site navigation or the
homepage past the hero. That surfaced because each slice had to justify its own
acceptance criteria, and it was filed as #14 and #15 rather than smuggled into an
unrelated commit.

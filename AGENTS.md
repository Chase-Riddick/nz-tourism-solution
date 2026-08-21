# NZ Tourism Solution — North Island tour operator marketing site

A complete, deployment-ready marketing website for a **hypothetical** small-group
tour operator on New Zealand's North Island, offering one- to four-day tours
year-round. Built as something concrete for a real New Zealander — a seasonal tour
guide considering going out on his own — to react to and colour in.

**The company does not exist.** Every price, itinerary, testimonial, and credential
is a researched approximation, not a fact. See rule 5.

## Non-negotiable project rules

1. **`../capital-v3` is reference-only and NON-PRIVILEGED.** It is a genuinely good
   build (Astro + Tailwind, content collections, ADR discipline, a source-hygiene
   test harness) and it sets the *bar for completeness*. It does not set the
   *answers*. Read it deliberately, file by file, when there is a specific reason.
   Do not glob or grep across it as background context, and do not port its
   decisions by default — two of them are actively wrong here (rules 6 and 7).

2. **Static-anywhere output.** No SSR, no edge functions, no server dependency of
   any kind. The build emits plain HTML/CSS/JS/images into `dist/`. Final hosting is
   AWS Amplify, which **auto-detects Astro — never create an `amplify.yml` or any
   other host-specific config file in this repo.** Amplify settings (custom headers,
   domain association, redirects) live in the AWS console and are documented in
   `RUNBOOK.md`.

3. **Scope to a team of two to four people.** Every offering on this site must be
   something a very small operator could actually run: one or two vehicles, a
   handful of guides, no call centre, no 24/7 desk. If a feature implies staff the
   business does not have, it is wrong even if it looks good.

4. **The site is `noindex` and must stay that way.** A fictional New Zealand tour
   operator with invented prices, a real-sounding name, and a real-looking booking
   flow must not be discoverable by someone trying to book a holiday. `SITE.indexable`
   is `false`; every page ships `<meta name="robots" content="noindex">` and
   `robots.txt` disallows everything. This is an ethics rule, not an SEO one — do not
   "fix" it. See `docs/adr/`.

5. **Content truth policy.** Write complete, confident copy — the site must read as
   finished, not as a wireframe. But every fact that a real operator would own rather
   than a researcher can infer gets an inline `SAM-VERIFY: <what needs deciding>`
   comment, mirrored in `docs/sam-decisions.md`. Prices, seasons, and itineraries are
   grounded in real comparable operators, each recorded in `docs/research/` with its
   source URL and fetch date. **Never invent a figure without recording where the
   shape of it came from.**

6. **Publish prices.** `../capital-v3` went quote-only (its ADR-0005) — but only
   because its client instructed it, reversing that repo's *own* research finding
   that price transparency was the single strongest competitor pattern. There is no
   client here, and day tours are a comparison purchase where essentially every real
   operator publishes a rate. Prices ship, in NZD, GST-inclusive, per person.

7. **English only for now, i18n-ready.** `../capital-v3` ships ~15 locales
   because multilingual *is* the product for a language school. It is not the
   product here.

   The launch locale set is **English alone** (Chase, 2026-08-18). The research
   still names German as the correct second locale and that conclusion has not
   changed — the *sequencing* has. Translating unconfirmed content means every
   revision to a price, itinerary or season is made twice, and the second copy
   rots silently. Confirm the English content with Sam to ~95%, ship, then
   translate once.

   Keep user-facing strings out of components and in the dictionary layer so a
   locale can be added without surgery. `src/lib/i18n` is n-locale generic and
   `localePath()` already reserves the `/de/…` prefix shape, so adding a locale
   never moves an existing URL. A complete German dictionary and tour copy exist
   on `spike/first-pass` and can be lifted when the content settles.

   **No half-translated pages, ever.** A published locale is a promise that
   someone answers email in that language.

8. **Cultural care is not optional.** Māori place names carry macrons (Taupō,
   Whakatāne, Tongariro, Ōpōtiki) — the font stack and every content file must
   handle them. Do not use marae, moko, or taonga as decorative texture. Anything
   implying iwi partnership or a cultural experience is something Sam must actually
   arrange, so it belongs in `docs/sam-decisions.md`, not in a stock-photo caption.

9. **Every placeholder image** is marked `data-placeholder="true"`, carries its
   licence and source, and is listed in `docs/client/image-manifest.md`. Only
   permissively-licensed photography (Unsplash / Pexels licence, or per-file-verified
   Wikimedia). **Tourism New Zealand's media library is accredited-media use, not a
   permissive licence — it is off limits.**

10. **`public/` is published.** Anything under `public/` is copied verbatim into
    `dist/` and is reachable at its URL even when no page links to it. Unreferenced
    is not unpublished. Promote an asset only when it is being wired in.

## Agent skills

### Issue tracker

Issues live in this repo's GitHub Issues (`claralabs/nz-tourism-solution`) via the `gh` CLI; external PRs are **not** a triage surface. The `claralabs` org does not exist yet, so `gh issue` commands fail until it is created and the remote is added. See `docs/agents/issue-tracker.md`.

### Triage labels

Default vocabulary: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `CONTEXT.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.

## How this repo is built — process is not optional here

Work moves in **tracer-bullet vertical slices**, one GitHub issue at a time,
each implemented test-first.

1. `/to-prd` — the PRD, filed as an issue. The destination.
2. `/to-issues` — thin vertical slices with blocking relationships. The journey.
3. `/tdd` per issue — strict red → green → refactor, one test at a time.
4. Repeat until the queue is empty (the "Ralph loop").

**`spike/first-pass` is a reference branch, not shippable work.** It is a
complete first-pass build — 33 source files, 24 pages, and *zero tests* —
produced in one uninterrupted pass with no issues and no failing test written
first. It is kept because its design tokens, i18n structure and catalogue shape
are worth porting, and deleted-and-re-derived would waste that.

**Port from it only behind a failing test.** Copying a file across without a
red test first defeats the entire reason it was quarantined. Never merge it.

## Development

```sh
npm install
npm run dev        # astro dev
npm run build      # emits dist/
npm test           # builds, then runs the Playwright harness over dist/
```

Full Astro documentation: https://docs.astro.build

## Key documents

| File | What it holds |
|---|---|
| `docs/judgement-calls.md` | Every non-obvious decision, why it went that way, what was rejected |
| `docs/sam-decisions.md` | What Sam himself has to decide before this becomes real |
| `docs/research/` | Sourced research — arrivals, operators, prices, seasons — with URLs and fetch dates |
| `docs/adr/` | Architectural decision records |
| `RUNBOOK.md` | Build, serve, deploy, and the Amplify console settings that are not in this repo |

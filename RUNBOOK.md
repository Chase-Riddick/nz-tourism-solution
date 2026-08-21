# Runbook — building, serving and deploying Slow North

The site is fully static: the build emits plain HTML/CSS/JS/images into `dist/`.
No server runtime, no environment services, no host-specific config.

## Requirements

Node 22.12 or newer. Python 3 plus the shared `~/.claude/tools/pdfenv` venv
(Pillow, numpy) for the imagery and share-card scripts.

## Build

```sh
npm install
npm run build      # emits dist/
```

## Serve

Any static file server pointed at `dist/`:

```sh
npx http-server dist -p 4321
python3 -m http.server 8080 -d dist
```

## Test

```sh
npm test
```

The harness is Playwright over the **built** site. `playwright.config.ts` runs
`npm run build` inside `webServer.command` and sets `reuseExistingServer: false`,
so a spec can never run against a stale `dist/`. That is not paranoia — an
injected regression once "passed" because the build predated it, which means the
whole suite was capable of lying.

The suite browses as a visitor who has already declined analytics
(`storageState`), because the consent banner is fixed to the viewport and would
otherwise intercept clicks everywhere. `tests/consent.spec.ts` clears that state
to test the banner itself.

## Imagery

Originals are **not** committed — they are 3–50MB each and regenerable.

```sh
npm run photos:source     # fetch + filter from Wikimedia Commons
npm run photos:sheet      # contact sheets for the visual curation pass
npm run photos:build      # responsive WebP + credits.json + image manifest
```

The pipeline is deliberately two-stage: the machine filters licence, resolution,
ratio, subject and a North-Island guard; a human judges what is actually good.
The second stage is not optional — a grid of 2023 general election candidate
headshots passed every automated gate by matching "coast".

`photo-library/curation.json` holds the verdicts and is committed. Re-running
`photos:build` rebuilds `public/photos/` from scratch, so a rejected image cannot
survive a re-run.

Share card: `~/.claude/tools/pdfenv/bin/python scripts/brand/og_card.py`.

## Deploying to AWS Amplify

Amplify **auto-detects Astro**. There is deliberately no `amplify.yml` in this
repo and there must never be one (AGENTS.md rule 2) — a config file here would
silently override console settings that live only in AWS, and `tests/ship.spec.ts`
asserts its absence.

1. Connect the Amplify app to this repository, branch `main`.
2. Build settings: auto-detected. Build command `npm run build`, output `dist`.
3. Associate the custom domain (`slownorth.claralabs.tech`); the
   `claralabs.tech` hosted zone already exists in Route 53, account
   `507152675552`.

### Cache headers — set these, they are not in the repo

Amplify's default is `public, max-age=0, s-maxage=31536000` on **everything**,
images included. `max-age=0` means the browser caches nothing and revalidates
every image on every page view. On a photo-led site with 5–11 photographs per
tour page, that is the whole "why is this slow" complaint.

```sh
aws amplify update-app --app-id <APP_ID> --region us-west-2 \
  --custom-headers "$(cat <<'YAML'
customHeaders:
  - pattern: '/_astro/**'
    headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }]
  - pattern: '/fonts/**'
    headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }]
  - pattern: '/photos/**'
    headers: [{ key: 'Cache-Control', value: 'public, max-age=2592000' }]
  - pattern: '/og/**'
    headers: [{ key: 'Cache-Control', value: 'public, max-age=2592000' }]
YAML
)"
```

`/_astro/` is content-hashed by Astro, so `immutable` for a year is free. Imagery
is **not** hashed — `tongariro-01-1600.webp` keeps its name through a re-encode —
so it gets 30 days rather than `immutable`, or a re-encode would be pinned in
returning visitors' browsers for a year. HTML deliberately keeps `max-age=0`:
Amplify invalidates CloudFront on deploy, so content changes stay instant.

## The design-canvas demo (live since 2026-08-21)

The **design canvas** — the single-file "Night & Day" full-page mockup, with
the public alias **Tom's NZ** (#39) — is hosted openly so the founder can react
to it. This is separate from the production deployment above, which waits for
the E rebuild (#30–#38).

- **URL:** https://nz-tour-demo.claralabs.tech
  (default domain: https://main.d2gs47utjusffl.amplifyapp.com)
- **Amplify app:** `nz-tour-demo`, app id `d2gs47utjusffl`, region `us-west-2`,
  account `507152675552`. **Manual zip deploy — no repo connection**, so pushing
  this repo never redeploys the demo.
- **What is deployed:** `index.html` (the built canvas: `prototypes/canvas.tpl.html`
  spliced with fonts/photos/credits) + a deny-all `robots.txt`.
- **noindex, three layers** (rule 4 applies to the demo exactly as to the site):
  `<meta name="robots" content="noindex, nofollow">` in the canvas, deny-all
  `robots.txt`, and an app-level custom header `X-Robots-Tag: noindex, nofollow`
  on `**` (set via `aws amplify update-app --custom-headers`, lives in AWS, not
  in this repo).
- **DNS:** `nz-tour-demo.claralabs.tech` CNAME → `d1zts6f0ps1le2.cloudfront.net`
  plus the ACM validation CNAME, both in the `claralabs.tech` Route 53 zone
  (`Z0643334RIPQWT714EYS`).

To redeploy after a canvas change: rebuild the canvas, zip it as `index.html`
with `robots.txt`, then `aws amplify create-deployment` → PUT the zip to the
returned `zipUploadUrl` → `aws amplify start-deployment` (app id and branch
`main` as above).

To take the demo down: `aws amplify delete-app --app-id d2gs47utjusffl
--region us-west-2` and delete the two DNS records.

## The site is noindex, and must stay that way

`SITE.indexable` is `false`. Every page ships
`<meta name="robots" content="noindex, nofollow, noarchive">`, `robots.txt`
disallows everything, and no sitemap is emitted.

This is an **ethics rule, not an SEO setting**. Slow North does not exist, its
prices were reverse-engineered from real operators, and its booking flow looks
real. Someone searching for a North Island tour must not find it. `tests/ship.spec.ts`
asserts all three. Do not "fix" it.

## Repository

- `Chase-Riddick/nz-tourism-solution`, to be transferred to the `claralabs` org
  once that org exists. Transfers preserve issues, history and PRs.
- `spike/first-pass` is a reference branch — a complete first-pass build with
  zero tests. Port from it only behind a failing test. **Never merge it.**

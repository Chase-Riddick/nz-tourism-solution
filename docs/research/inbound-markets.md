# Inbound visitor markets — which languages the site ships

All figures fetched 2026-08-18. Every number carries its source and the period it
covers, because these periods do **not** line up (year-ended May, September, October
and December 2025 all appear in the reporting) and comparing across them silently is
the easy mistake.

## Why this research gates the build

The locale list changes the content architecture, the translation workload, and the
nav. It is the one decision that is expensive to retrofit, so it was settled before
any component was written.

It is also the one place the reference build (`../capital-v3`, ~15 locales) is
actively misleading. For a language school, the visitor's language *is* the market
segment — multilingual is the product. For a tour operator it is a **service
promise**: publishing a German page implies someone answers German email, and
plausibly that someone guides in German. A team of two to four can make that promise
two or three times, not fifteen.

## Total market

| Measure | Figure | Period | Source |
|---|---|---|---|
| Overseas visitor arrivals | 3.51 million | Year ended Dec 2025 (+195,600 / +6% on 2024) | Stats NZ |
| Overseas visitor arrivals | 3.43 million | Year ended Sep 2025 | Stats NZ via NZ Herald |
| Arrivals for holiday purposes | 1.68 million | 2025 | Statista |

Holiday travellers are roughly **48%** of all arrivals. The rest are VFR, business and
students, who are not this operator's market — so the addressable base is ~1.7M, not
3.5M. This matters for the language argument below: raw arrivals over-weight Australia,
which has a large VFR component.

## By market

| Market | Arrivals | Period | Notes |
|---|---|---|---|
| **Australia** | 1.48M (+12%) | Year ended Sep 2025 | ~52% of all arrivals in Aug 2025. Trans-Tasman capacity growth. |
| **China** | 262,000 (+5%) | Year ended Dec 2025 | 9% of arrivals Aug 2025; 7% Oct 2025 |
| **USA** | 382,000 | Year ended May 2025 | Strong growth on new flight capacity |
| **UK** | 188,000 | Year ended May 2025 | 5% of arrivals Oct 2025 |
| **Germany** | 73,000 | Year ended May 2025 | 74% arriving for **holiday** |
| Japan, Korea, India | present in top-10 reporting, figures not isolated | 2025 | Singapore posted the largest annual *growth* |

## The discriminator: it is not arrival volume

Raw arrivals would pick Chinese and stop. The question this site actually has to
answer is narrower — **which markets have volume, book small-group nature tours, and
are not already served by English.**

### English — non-negotiable

Australia (1.48M), USA (382k) and the UK (188k) are ~2.05M of ~3.4M arrivals, and
they are the three markets most likely to book a small operator direct rather than
through a wholesaler. English is not a locale decision; it is the default.

### German — the strongest non-English case, and it is not close

Germany is only 73,000 arrivals, roughly a twentieth of Australia. It ships anyway,
because every behavioural axis points the same way:

- **74% arrive for holiday** — versus ~48% market-wide. The addressable share of a
  German arrival is far higher than the headline number suggests.
- **Highest spend per trip of any market: NZD $8,664 average.**
- **Longest average length of stay of any market** (~16 days for holiday visitors).
- **Top activity is walks, hikes and tramps**, followed by natural attractions —
  mountains, lakes, forests, beaches.

That last line is the product. A German holiday visitor is, on the published
evidence, more likely to want precisely what this operator sells than a visitor from
any larger market. Long stays also mean multi-day tours rather than a single day trip
out of Auckland.

### Chinese — high volume, deferred, and the reasoning matters

262,000 arrivals is the second-largest market and a serious volume argument. It is
still **not** in the launch locale set:

1. **Channel mismatch.** The Chinese inbound market to New Zealand is substantially
   intermediated — wholesalers, group tour operators, and domestic Chinese OTAs. A
   two-to-four person operator's realistic Chinese channel is a wholesaler
   relationship, not a Chinese-language marketing page.
2. **The promise is unservice­able.** A Chinese page invites enquiries in Chinese,
   on WeChat, in Chinese business hours. That is a staffed function.
3. **Not a translation job.** Serving it properly means WeChat presence, Xiaohongshu,
   Alipay/WeChat Pay, and a domestic booking channel. Half of it is worse than none.

Recorded as a **growth decision for Sam**, not a rejection — see `docs/sam-decisions.md`.
If he lands a Chinese wholesaler relationship, the locale infrastructure is already
built and adding `zh` is a content job, not surgery.

## Decision

**English + German (`en`, `de`), both complete.**

Third locale deliberately deferred rather than half-built. The i18n architecture is
built to carry more locales from day one — adding one is a content exercise, and the
route structure, dictionary layer and hreflang set are all n-locale generic.

**This is a service promise the site makes explicit**: the site states which languages
guides actually speak rather than implying capability from the existence of a
translated page. Sam confirming German-speaking guide capacity is a `SAM-VERIFY` item.

## Sources

- Stats NZ, International travel Oct/Sep 2025 — https://www.stats.govt.nz/information-releases/international-travel-october-2025/ (403 to automated fetch; figures via secondary reporting below)
- Stats NZ, "Visitor arrivals pass 3.5 million" — https://www.stats.govt.nz/news/visitor-arrivals-pass-3-5-million/
- Tourism New Zealand, Markets overview — https://www.tourismnewzealand.com/about-us/markets-overview/ (403 to automated fetch)
- Tourism New Zealand, Germany market snapshot PDF — https://www.tourismnewzealand.com/assets/insights/market-overview/TNZ-Insights-Infographic-Market-Snapshots-2024-Germany.pdf (403 to automated fetch)
- Statista, holiday visitor groups by country 2025 — https://www.statista.com/statistics/1489582/
- MBIE Tourism Evidence and Insights Centre, International Visitor Survey — https://teic.mbie.govt.nz/

**Fetch caveat, recorded honestly:** the three primary sources (Stats NZ release page,
Tourism NZ markets overview, Tourism NZ Germany PDF) all returned **HTTP 403** to
automated fetching. The figures above come from search-result summaries of those
sources and from secondary reporting quoting them. They are the right order of
magnitude and the *relative* market ranking is consistent across every source seen —
which is all the locale decision needs. They are **not** citation-grade, and no figure
from this file is published on the site as a factual claim.

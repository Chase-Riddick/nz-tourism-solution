/**
 * Single source of truth for every site-wide fact.
 * No price, date, statistic or contact detail may be hardcoded elsewhere in src/.
 */
export const SITE = {
  name: "Slow North",
  tagline: "Fewer people. Longer days. The North Island at its own pace.",
  /**
   * AGENTS.md rule 4 - NOT NEGOTIABLE, and not an SEO setting.
   *
   * This site describes a tour operator that does not exist, at prices
   * reverse-engineered from real competitors, with a booking flow that looks
   * real. A traveller must never reach it while trying to book a holiday.
   * `false` ships `<meta name="robots" content="noindex">` on every page.
   *
   * Flip to `true` only if this becomes a real, trading business.
   */
  indexable: false,
} as const;

/**
 * The whole commercial argument in one number, so it can never drift between
 * the homepage, the tour cards and the FAQ.
 *
 * Derivation (docs/research/pricing-and-products.md): Wild Kiwi runs a 7-day
 * North Island loop at ~$283/person/day *because* it fills sixteen seats. A
 * private driver-guide is ~$950/person/day at two guests. Eight is the
 * deliberate middle, and it is why our per-day rate is roughly double the coach
 * rate. The site states this openly rather than hiding it.
 */
export const MAX_GROUP = 8;

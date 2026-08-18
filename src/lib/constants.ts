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
  base: "Rotorua",
  region: "North Island, New Zealand",
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

/**
 * Peak supplement on multi-day departures.
 *
 * Derivation: peak-season accommodation and vehicle costs rise 20-50%
 * (docs/research/pricing-and-products.md). Multi-day tours carry accommodation
 * so they carry a supplement; day tours return to base nightly and do not.
 * 15% is deliberately below the underlying cost rise - the rest is absorbed.
 */
export const PEAK_SUPPLEMENT_PCT = 15;

/**
 * Cancellation terms.
 * SAM-VERIFY: this is a common industry shape, not Sam's actual policy.
 */
export const CANCELLATION = [
  { window: "More than 30 days before departure", refund: "Full refund, less a $50 administration fee" },
  { window: "15-30 days before departure", refund: "50% refund" },
  { window: "14 days or fewer", refund: "No refund" },
  {
    window: "Cancelled by us for weather or safety",
    refund: "Full refund or a transfer to another date - your choice",
  },
] as const;

/**
 * Southern hemisphere. December-February is summer. Getting this backwards is
 * the fastest way to lose a New Zealand reader.
 * Source: docs/research/seasons-and-places.md
 */
export const SEASONS = [
  {
    key: "summer",
    label: "Summer",
    months: "December – February",
    temp: "20–24°C",
    pricing: "peak" as const,
    note: "Long daylight and the best alpine weather. Busiest and dearest — book early.",
  },
  {
    key: "autumn",
    label: "Autumn",
    months: "March – May",
    temp: "17–22°C",
    pricing: "shoulder" as const,
    note: "Settled weather, thinning crowds. March is the value sweet spot.",
  },
  {
    key: "winter",
    label: "Winter",
    months: "June – August",
    temp: "10–15°C",
    pricing: "low" as const,
    note:
      "No alpine crossings. The tours move north and to the coast, where Northland " +
      "earns its 'winterless north' name, and geothermal country runs regardless.",
  },
  {
    key: "spring",
    label: "Spring",
    months: "September – November",
    temp: "16–20°C",
    pricing: "shoulder" as const,
    note: "Young stock in the paddocks and the alpine season reopening. November is quietly the best month of the year.",
  },
] as const;

/**
 * Consent-gated analytics.
 *
 * Dormant by design: ga4MeasurementId is a placeholder, so no choice a visitor
 * makes can load any script. The consent UX is real and reviewable; the
 * tracking is not wired until a real G- id exists.
 */
export const ANALYTICS = {
  ga4MeasurementId: "G-XXXXXXXXXX", // SAM-VERIFY: real GA4 property
  storageKey: "sn-consent",
  renewDays: 180,
} as const;

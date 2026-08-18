/**
 * The tour catalogue: structural facts only.
 *
 * Localised copy (names, summaries, itinerary prose) lives in
 * `src/lib/i18n/<locale>/tours.ts`, keyed by the same ids. The split is
 * deliberate — it makes a missing translation a *type* error rather than a
 * silently-English page, and `tests/i18n.spec.ts` asserts every id resolves in
 * every locale.
 *
 * PRICING. Every figure is triangulated in docs/research/pricing-and-products.md
 * against four independent reference points. In short:
 *   - Day tours are priced against Bush and Beach ($510 for Hobbiton+Waitomo,
 *     12.25 hrs ex-Auckland), the closest true comparable.
 *   - Multi-day sits at ~$560-590 pp/day twin-share: roughly double the 16-seat
 *     packaged rate (Wild Kiwi, ~$283/day) and ~60% of a private driver-guide
 *     (~$950/day). Eight guests is why. The site says so openly.
 * All prices NZD, per person, GST inclusive.
 */

import { MAX_GROUP } from "./constants";

/** Months a tour runs, 1-indexed. Encoded because seasonality is a fact here,
 *  not a marketing note: the Tongariro Alpine Crossing shuttles run Oct-May and
 *  stop when snow covers the track. See docs/research/seasons-and-places.md. */
export type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export const ALL_YEAR: Month[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
/** October–May. The alpine season, and the hard limit on any Crossing product. */
export const ALPINE_SEASON: Month[] = [10, 11, 12, 1, 2, 3, 4, 5];

export type Fitness = "easy" | "moderate" | "active";
export type Base = "auckland" | "rotorua";

export interface Tour {
  id: string;
  days: number;
  /** Hours, for day tours only — the thing people actually want to know. */
  hours?: number;
  /** NZD per person, GST inclusive. Twin-share for multi-day. */
  price: number;
  /** Day tours only. ~55% of adult, following the market convention. */
  priceChild?: number;
  /** Multi-day only: private-room supplement. */
  singleSupplement?: number;
  maxGroup: number;
  base: Base;
  months: Month[];
  fitness: Fitness;
  minAge: number;
  /** Place keys — resolved to localised names via the dictionary. */
  places: string[];
  /** Image ids from public/photos/credits.json. */
  hero: string;
  gallery: string[];
  /** Inclusion keys, localised via the dictionary. */
  includes: string[];
  excludes: string[];
  /** Number of itinerary days expected in the locale files. Guards drift. */
  itineraryDays: number;
  /** Ranked for the homepage. Lower is more prominent. */
  rank: number;
  /** Weather-dependent in a way the customer must be told about up front. */
  weatherGated?: boolean;
  /** Runs on public conservation land — needs a DOC concession. */
  conservationLand?: boolean;
}

export const TOURS: Tour[] = [
  /* ─────────────────────────────  Day tours  ───────────────────────────── */
  {
    id: "hobbiton-waitomo",
    days: 1, hours: 12,
    price: 545, priceChild: 300,
    maxGroup: MAX_GROUP, base: "auckland",
    months: ALL_YEAR, fitness: "easy", minAge: 5,
    places: ["matamata", "waitomo"],
    hero: "waitomo-05",
    gallery: ["waitomo-04", "waitomo-05", "rotorua-03"],
    includes: ["transport", "guide", "entryFees", "lunch", "pickupCity"],
    excludes: ["personalSpending", "travelInsurance"],
    itineraryDays: 1, rank: 1,
  },
  {
    id: "rotorua-geothermal",
    days: 1, hours: 10,
    price: 395, priceChild: 215,
    maxGroup: MAX_GROUP, base: "rotorua",
    months: ALL_YEAR, fitness: "easy", minAge: 5,
    places: ["rotorua", "waiotapu", "redwoods"],
    hero: "geothermal-04",
    gallery: ["geothermal-02", "rotorua-01", "rotorua-02", "geothermal-05"],
    includes: ["transport", "guide", "entryFees", "morningTea", "pickupCity"],
    excludes: ["lunch", "personalSpending", "travelInsurance"],
    itineraryDays: 1, rank: 3,
  },
  {
    id: "west-coast-beaches",
    days: 1, hours: 7,
    price: 265, priceChild: 145,
    maxGroup: MAX_GROUP, base: "auckland",
    months: ALL_YEAR, fitness: "moderate", minAge: 8,
    places: ["piha", "waitakere", "muriwai"],
    hero: "auckland-01",
    gallery: ["auckland-12", "auckland-14", "auckland-13"],
    includes: ["transport", "guide", "morningTea", "pickupCity"],
    excludes: ["lunch", "entryFees", "personalSpending", "travelInsurance"],
    itineraryDays: 1, rank: 6,
    conservationLand: true,
  },
  {
    id: "waiheke-island",
    days: 1, hours: 8,
    price: 295, priceChild: 160,
    maxGroup: MAX_GROUP, base: "auckland",
    months: ALL_YEAR, fitness: "easy", minAge: 18,
    places: ["waiheke"],
    hero: "waiheke-02",
    gallery: ["waiheke-03", "waiheke-05"],
    includes: ["ferry", "guide", "tastings", "lunch"],
    excludes: ["transport", "personalSpending", "travelInsurance"],
    itineraryDays: 1, rank: 7,
  },
  {
    id: "tongariro-crossing",
    days: 1, hours: 12,
    price: 345, priceChild: undefined,
    maxGroup: MAX_GROUP, base: "rotorua",
    months: ALPINE_SEASON, fitness: "active", minAge: 14,
    places: ["tongariro"],
    hero: "tongariro-01",
    gallery: ["tongariro-02", "tongariro-04", "tongariro-03", "tongariro-05"],
    includes: ["transport", "guide", "trackTransfer", "packedLunch", "safetyGear"],
    excludes: ["personalSpending", "travelInsurance", "hikingBoots"],
    itineraryDays: 1, rank: 2,
    weatherGated: true, conservationLand: true,
  },

  /* ───────────────────────────────  2 day  ─────────────────────────────── */
  {
    id: "volcanic-two-day",
    days: 2,
    price: 1190, singleSupplement: 210,
    maxGroup: MAX_GROUP, base: "rotorua",
    months: ALL_YEAR, fitness: "easy", minAge: 8,
    places: ["rotorua", "waiotapu", "taupo", "hukafalls"],
    hero: "taupo-01",
    gallery: ["geothermal-02", "taupo-03", "taupo-04", "geothermal-04", "rotorua-04"],
    includes: ["transport", "guide", "accommodation", "breakfast", "entryFees"],
    excludes: ["lunch", "dinner", "personalSpending", "travelInsurance"],
    itineraryDays: 2, rank: 4,
  },

  /* ───────────────────────────────  3 day  ─────────────────────────────── */
  {
    id: "central-plateau",
    days: 3,
    price: 1745, singleSupplement: 320,
    maxGroup: MAX_GROUP, base: "rotorua",
    months: ALPINE_SEASON, fitness: "active", minAge: 14,
    places: ["rotorua", "taupo", "tongariro", "hukafalls"],
    hero: "tongariro-02",
    gallery: ["tongariro-01", "taupo-01", "tongariro-04", "geothermal-05", "taupo-03"],
    includes: ["transport", "guide", "accommodation", "breakfast", "packedLunch", "trackTransfer", "safetyGear"],
    excludes: ["dinner", "personalSpending", "travelInsurance", "hikingBoots"],
    itineraryDays: 3, rank: 5,
    weatherGated: true, conservationLand: true,
  },
  {
    id: "northland-three",
    days: 3,
    price: 1695, singleSupplement: 320,
    maxGroup: MAX_GROUP, base: "auckland",
    months: ALL_YEAR, fitness: "easy", minAge: 8,
    places: ["bayofislands", "hokianga", "waipoua", "capereinga"],
    hero: "coast-11",
    gallery: ["bay-of-islands-03", "bay-of-islands-04", "coast-15", "coast-12", "coast-13", "bay-of-islands-05"],
    includes: ["transport", "guide", "accommodation", "breakfast", "boatTrip"],
    excludes: ["lunch", "dinner", "personalSpending", "travelInsurance"],
    itineraryDays: 3, rank: 8,
    conservationLand: true,
  },

  /* ───────────────────────────────  5 day  ─────────────────────────────── */
  {
    id: "north-island-five",
    days: 5,
    price: 2950, singleSupplement: 540,
    maxGroup: MAX_GROUP, base: "auckland",
    months: ALL_YEAR, fitness: "moderate", minAge: 12,
    places: ["coromandel", "rotorua", "taupo", "waitomo", "tongariro"],
    hero: "coromandel-01",
    gallery: ["coromandel-02", "taupo-01", "tongariro-02", "geothermal-02", "coromandel-05", "waitomo-05"],
    includes: ["transport", "guide", "accommodation", "breakfast", "entryFees", "pickupCity"],
    excludes: ["lunch", "dinner", "personalSpending", "travelInsurance"],
    itineraryDays: 5, rank: 9,
  },
  {
    id: "east-cape-five",
    days: 5,
    price: 3150, singleSupplement: 480,
    maxGroup: MAX_GROUP, base: "rotorua",
    months: ALL_YEAR, fitness: "moderate", minAge: 12,
    places: ["eastcape", "tolagabay", "gisborne", "waikaremoana"],
    hero: "east-cape-04",
    gallery: ["east-cape-02", "east-cape-01", "forest-01", "east-cape-03", "forest-05", "forest-02"],
    includes: ["transport", "guide", "accommodation", "breakfast", "someDinners"],
    excludes: ["lunch", "personalSpending", "travelInsurance"],
    itineraryDays: 5, rank: 10,
    conservationLand: true,
  },
];

/* ───────────────────────────────  Helpers  ────────────────────────────── */

export const tourById = (id: string): Tour | undefined =>
  TOURS.find((t) => t.id === id);

export const byRank = (): Tour[] => [...TOURS].sort((a, b) => a.rank - b.rank);

export const dayTours = (): Tour[] => TOURS.filter((t) => t.days === 1);
export const multiDayTours = (): Tour[] => TOURS.filter((t) => t.days > 1);

/** Tours runnable in a given month. Drives the seasonal availability grid. */
export const toursInMonth = (m: Month): Tour[] =>
  TOURS.filter((t) => t.months.includes(m));

/** Southern-hemisphere peak: December–February. */
export const isPeakMonth = (m: Month): boolean => m === 12 || m === 1 || m === 2;

/** Formats NZD the way New Zealand writes it. */
export const nzd = (n: number): string =>
  `$${n.toLocaleString("en-NZ", { maximumFractionDigits: 0 })}`;

/** Per-person per-day rate — the comparison the site invites openly. */
export const perDay = (t: Tour): number => Math.round(t.price / t.days);

const MONTH_SHORT = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

/**
 * Human season label, derived from the months array rather than written by
 * hand. A tour's availability is DATA - if the months change, every surface
 * that mentions the season changes with it, and none of them can drift.
 */
export const seasonLabel = (t: Tour): string =>
  t.months.length === 12
    ? "Year-round"
    : `${MONTH_SHORT[t.months[0] - 1]} – ${MONTH_SHORT[t.months[t.months.length - 1] - 1]}`;

export const isSeasonal = (t: Tour): boolean => t.months.length < 12;

/** Calendar months belonging to each season key, southern hemisphere. */
export const SEASON_MONTHS: Record<string, Month[]> = {
  summer: [12, 1, 2],
  autumn: [3, 4, 5],
  winter: [6, 7, 8],
  spring: [9, 10, 11],
};

/**
 * Tours runnable in a season - a tour qualifies if it runs in EVERY month of
 * that season. Deliberately strict: "available in spring" must not mean
 * "available for three weeks of spring".
 */
export const toursInSeason = (key: string): Tour[] => {
  const months = SEASON_MONTHS[key] ?? [];
  return TOURS.filter((t) => months.every((m) => t.months.includes(m)));
};

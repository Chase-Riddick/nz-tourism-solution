/**
 * The tour catalogue: structural facts only.
 *
 * Localised copy (names, summaries, itinerary prose) lives in
 * `src/lib/i18n/<locale>/tours.ts`, keyed by the same ids. The split is
 * deliberate — it makes a missing translation a *type* error rather than a
 * silently-English page, and `tests/i18n.spec.ts` asserts every id resolves in
 * every locale.
 *
 * PRICING (v2). Every figure derives from docs/research/pricing-v2-cheekykiwi.md
 * (Cheeky Kiwi Travel's published rates, fetched 2026-08-21): launch prices sit
 * 15-20% under CK's comparable product, and `compareAt` carries CK's list rate
 * for the struck comparison the site shows openly. Where no crisp comparable
 * exists (Waiheke, the 4-day), there is no compareAt - the research doc records
 * the range instead. First-season framing is deliberate and site-wide.
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
  /**
   * The big operators' published rate for the comparable product (NZD),
   * struck through beside our launch price. Omitted where the research doc
   * records only a market range - a struck price must be a real list price.
   */
  compareAt?: number;
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
    id: "west-coast-beaches",
    days: 1, hours: 7,
    price: 149, priceChild: 85, compareAt: 175,
    maxGroup: MAX_GROUP, base: "auckland",
    months: ALL_YEAR, fitness: "easy", minAge: 5,
    places: ["piha", "waitakere", "muriwai"],
    hero: "auckland-01",
    gallery: ["auckland-01", "auckland-12", "auckland-13", "auckland-14"],
    includes: ["transport", "guide", "pickupCity"],
    excludes: ["lunch", "personalSpending", "travelInsurance"],
    itineraryDays: 1, rank: 1,
  },
  {
    id: "auckland-in-a-day",
    days: 1, hours: 10,
    price: 209, priceChild: 115, compareAt: 250,
    maxGroup: MAX_GROUP, base: "auckland",
    months: ALL_YEAR, fitness: "easy", minAge: 5,
    places: ["auckland", "piha", "muriwai"],
    hero: "auckland-13",
    gallery: ["auckland-13", "auckland-01", "auckland-12"],
    includes: ["transport", "guide", "morningTea", "pickupCity"],
    excludes: ["lunch", "personalSpending", "travelInsurance"],
    itineraryDays: 1, rank: 6,
  },
  {
    id: "cathedral-cove-coromandel",
    days: 1, hours: 12,
    price: 219, priceChild: 125, compareAt: 259,
    maxGroup: MAX_GROUP, base: "auckland",
    months: ALL_YEAR, fitness: "easy", minAge: 5,
    places: ["coromandel", "hahei", "hotwaterbeach"],
    hero: "coromandel-02",
    gallery: ["coromandel-01", "coromandel-04", "coromandel-05"],
    includes: ["transport", "guide", "lunch", "pickupCity"],
    excludes: ["personalSpending", "travelInsurance"],
    itineraryDays: 1, rank: 2,
  },
  {
    id: "waiheke-island",
    days: 1, hours: 8,
    price: 265,
    maxGroup: MAX_GROUP, base: "auckland",
    months: ALL_YEAR, fitness: "easy", minAge: 18,
    places: ["waiheke"],
    hero: "waiheke-02",
    gallery: ["waiheke-02", "waiheke-03", "waiheke-05"],
    includes: ["transport", "guide", "ferry", "tastings", "pickupCity"],
    excludes: ["lunch", "personalSpending", "travelInsurance"],
    itineraryDays: 1, rank: 7,
  },
  {
    id: "hobbiton-waitomo",
    days: 1, hours: 12,
    price: 319, priceChild: 185, compareAt: 379,
    maxGroup: MAX_GROUP, base: "auckland",
    months: ALL_YEAR, fitness: "easy", minAge: 5,
    places: ["matamata", "waitomo"],
    hero: "waitomo-05",
    gallery: ["waitomo-04", "waitomo-05", "rotorua-03"],
    includes: ["transport", "guide", "entryFees", "lunch", "pickupCity"],
    excludes: ["personalSpending", "travelInsurance"],
    itineraryDays: 1, rank: 3,
  },
  {
    id: "rotorua-waiotapu",
    days: 1, hours: 12,
    price: 325, priceChild: 185, compareAt: 384,
    maxGroup: MAX_GROUP, base: "auckland",
    months: ALL_YEAR, fitness: "easy", minAge: 5,
    places: ["rotorua", "waiotapu", "redwoods"],
    hero: "geothermal-04",
    gallery: ["geothermal-02", "rotorua-01", "rotorua-02", "geothermal-05"],
    includes: ["transport", "guide", "entryFees", "lunch", "pickupCity"],
    excludes: ["personalSpending", "travelInsurance"],
    itineraryDays: 1, rank: 4,
  },
  {
    id: "waitomo-rotorua",
    days: 1, hours: 12,
    price: 345, priceChild: 195, compareAt: 409,
    maxGroup: MAX_GROUP, base: "auckland",
    months: ALL_YEAR, fitness: "easy", minAge: 5,
    places: ["waitomo", "rotorua", "waiotapu"],
    hero: "waitomo-04",
    gallery: ["waitomo-04", "rotorua-01", "geothermal-02"],
    includes: ["transport", "guide", "entryFees", "lunch", "pickupCity"],
    excludes: ["personalSpending", "travelInsurance"],
    itineraryDays: 1, rank: 5,
  },
  /* ───────────────────────────  Multi-day tours  ───────────────────────── */
  {
    id: "tongariro-weekender",
    days: 2,
    price: 739, singleSupplement: 140, compareAt: 909,
    maxGroup: MAX_GROUP, base: "auckland",
    months: ALPINE_SEASON, fitness: "active", minAge: 12,
    places: ["tongariro", "taupo", "hukafalls"],
    hero: "tongariro-01",
    gallery: ["tongariro-01", "tongariro-04", "taupo-01", "geothermal-04"],
    includes: ["transport", "guide", "accommodation", "breakfast", "trackTransfer", "safetyGear", "packedLunch"],
    excludes: ["dinner", "personalSpending", "travelInsurance", "hikingBoots"],
    itineraryDays: 2, rank: 8,
    weatherGated: true,
    conservationLand: true,
  },
  {
    id: "bay-of-islands-weekender",
    days: 2,
    price: 799, singleSupplement: 140, compareAt: 949,
    maxGroup: MAX_GROUP, base: "auckland",
    months: ALL_YEAR, fitness: "easy", minAge: 5,
    places: ["bayofislands", "waipoua", "hokianga"],
    hero: "bay-of-islands-03",
    gallery: ["bay-of-islands-03", "bay-of-islands-01", "bay-of-islands-05", "coast-11"],
    includes: ["transport", "guide", "accommodation", "breakfast", "boatTrip", "pickupCity"],
    excludes: ["lunch", "dinner", "personalSpending", "travelInsurance"],
    itineraryDays: 2, rank: 9,
    conservationLand: true, // Waipoua forest walk (Tāne Mahuta) is DOC-managed
  },
  {
    id: "volcanic-heartland",
    days: 4,
    price: 1895, singleSupplement: 340,
    maxGroup: MAX_GROUP, base: "auckland",
    months: ALL_YEAR, fitness: "moderate", minAge: 8,
    places: ["waitomo", "rotorua", "waiotapu", "taupo", "hukafalls", "tongariro"],
    hero: "tongariro-04",
    gallery: ["rotorua-02", "geothermal-04", "taupo-01", "tongariro-01", "tongariro-03", "geothermal-03"],
    includes: ["transport", "guide", "accommodation", "breakfast", "entryFees", "someDinners", "pickupCity"],
    excludes: ["lunch", "personalSpending", "travelInsurance"],
    itineraryDays: 4, rank: 10,
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

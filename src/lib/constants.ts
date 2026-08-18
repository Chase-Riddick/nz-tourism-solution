/**
 * Single source of truth for every site-wide fact and figure.
 *
 * No price, date, statistic, capacity or contact detail may be hardcoded
 * anywhere else in `src/` — `tests/source-hygiene.spec.ts` enforces it.
 *
 * PROVENANCE RULE. Slow North is a hypothetical business (AGENTS.md). Every
 * number below is either:
 *   (a) derived from the operator research in `docs/research/`, with the
 *       derivation noted inline, or
 *   (b) marked `SAM-VERIFY:` and mirrored into `docs/sam-decisions.md`.
 * Nothing here is invented without one of those two markers. If you add a
 * figure, add its provenance in the same commit.
 */

/* ────────────────────────────────  Site  ──────────────────────────────── */

export const SITE = {
  name: "Slow North",
  legalName: "Slow North Tours Limited",
  /**
   * Canonical origin. One constant, so moving hosts is a one-line change.
   * Chase chose a claralabs.tech subdomain over langzhiedu.com (2026-08-18).
   */
  url: "https://slownorth.claralabs.tech",
  /**
   * AGENTS.md rule 4 — NOT NEGOTIABLE, and not an SEO setting.
   *
   * This site describes a tour operator that does not exist, at prices that
   * were reverse-engineered from competitors, with a booking flow that looks
   * real. A traveller must never reach it while trying to book a holiday.
   * `false` ships `<meta name="robots" content="noindex">` on every page and a
   * fully disallowing robots.txt, and disables the sitemap integration.
   *
   * Flip to `true` only if this becomes a real, trading business.
   */
  indexable: false,
  foundingYear: 2026,
  region: "North Island, New Zealand",
  base: "Rotorua",
  tagline: "Fewer people. Longer days. The North Island at its own pace.",
  description:
    "Small-group guided tours across New Zealand's North Island — one to five days, " +
    "maximum eight guests, running year-round from Rotorua and Auckland.",
} as const;

/**
 * The whole commercial argument in one number, so it can never drift between
 * the homepage, the tour cards and the FAQ.
 *
 * Derivation (docs/research/pricing-and-products.md): Wild Kiwi runs a 7-day
 * North Island loop at ~$283/person/day *because* it fills sixteen seats.
 * A private driver-guide is ~$950/person/day at two guests. Eight guests is
 * the deliberate middle, and it is why our per-day rate is roughly double the
 * coach rate. The site states this openly rather than hiding it.
 */
export const MAX_GROUP = 8;

/** Years guiding, carried by the founder rather than the company. */
export const GUIDE_YEARS = 9; // SAM-VERIFY: seasons actually guided

/* ───────────────────────────────  Contact  ─────────────────────────────── */

export const CONTACT = {
  // SAM-VERIFY: every contact detail below is a placeholder pattern, not a live line.
  email: "kiaora@slownorth.example",
  phone: { display: "+64 7 000 0000", e164: "+6470000000", note: "Rotorua" },
  whatsapp: { display: "+64 21 000 000", href: "https://wa.me/6421000000" },
  address: {
    line1: "PO Box 0000",
    line2: "Rotorua 3040",
    country: "New Zealand",
  },
  /** Southern-hemisphere hours. A 2–4 person team is not a 24/7 desk. */
  hours: "Mon–Sat, 8am–6pm NZST",
  responseTime: "within one working day",
} as const;

/* ───────────────────────────────  Social  ─────────────────────────────── */

/**
 * The brief asked for a full social build-out. These are the channels a small
 * New Zealand inbound operator actually runs — Instagram and Facebook carry
 * the imagery, TripAdvisor carries the reviews that convert, YouTube is
 * optional but cheap.
 *
 * SAM-VERIFY: every handle is a placeholder. None of these accounts exist, and
 * they must be registered before launch — a dead social link is worse than none.
 */
export const SOCIAL = [
  { label: "Instagram", handle: "@slownorth.nz", href: "https://instagram.com/slownorth.nz", primary: true },
  { label: "Facebook", handle: "Slow North", href: "https://facebook.com/slownorth.nz", primary: true },
  { label: "TripAdvisor", handle: "Slow North", href: "https://tripadvisor.com/slownorth", primary: true },
  { label: "YouTube", handle: "@slownorth", href: "https://youtube.com/@slownorth", primary: false },
  { label: "Strava", handle: "Slow North", href: "https://strava.com/clubs/slownorth", primary: false },
] as const;

/* ────────────────────────────────  Trust  ─────────────────────────────── */

/**
 * The credential surface. Research (docs/research/regulatory.md) says a real
 * NZ operator publishes these and their absence reads as fake.
 *
 * Every value is a visible placeholder. We show the *shape* of the credential
 * without inventing a government identifier — fabricating a plausible NZBN
 * would be forging a real registry number, which is a different act from
 * drafting marketing copy.
 */
export const CREDENTIALS = [
  {
    key: "nzbn",
    label: "NZBN",
    value: "—",
    note: "New Zealand Business Number, issued on incorporation.",
    status: "pending" as const,
  },
  {
    key: "gst",
    label: "GST",
    value: "Registered",
    note: "All prices on this site include GST.",
    status: "pending" as const,
  },
  {
    key: "doc",
    label: "DOC concession",
    value: "—",
    note:
      "Required to run commercial trips on public conservation land — which covers " +
      "Tongariro National Park, Te Urewera and Whirinaki.",
    status: "required" as const,
  },
  {
    key: "worksafe",
    label: "WorkSafe adventure activity registration",
    value: "—",
    note:
      "Required where an itinerary is classified as an adventure activity under the " +
      "Health and Safety at Work (Adventure Activities) Regulations 2016.",
    status: "required" as const,
  },
  {
    key: "qualmark",
    label: "Qualmark",
    value: "—",
    note:
      "Tourism New Zealand's quality and sustainability accreditation. Also accepted " +
      "as evidence of a safety management plan in a DOC concession application.",
    status: "planned" as const,
  },
  {
    key: "insurance",
    label: "Public liability insurance",
    value: "—",
    note: "Required by most venues and wholesalers before they will contract.",
    status: "required" as const,
  },
  {
    key: "pendorsement",
    label: "P endorsement",
    value: "Held",
    note: "Passenger endorsement — required to carry paying passengers.",
    status: "pending" as const,
  },
] as const;

/* ──────────────────────────────  Seasons  ─────────────────────────────── */

/**
 * Southern hemisphere. December–February is summer. Getting this backwards is
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
 * Peak supplement on multi-day departures.
 *
 * Derivation: peak-season accommodation and vehicle costs rise 20–50%
 * (docs/research/pricing-and-products.md). Multi-day tours carry accommodation,
 * so they carry a supplement; day tours return to base nightly and do not.
 * 15% is deliberately below the underlying cost rise — the rest is absorbed.
 */
export const PEAK_SUPPLEMENT_PCT = 15;

/* ──────────────────────────────  Booking  ─────────────────────────────── */

/**
 * ADR-0003 pattern, inherited from the reference build: the booking and enquiry
 * paths are real UI wired to nothing. Unset, they render in presentation mode
 * with a graceful static success state.
 *
 * A real operator books through Rezdy / Bókun / Checkfront / FareHarbor. That
 * choice is commercial (commission rates, OTA distribution, wholesaler
 * connectivity) and it is Sam's — so the site models it as one constant rather
 * than building an integration against a guess.
 */
export const BOOKING = {
  /** Set at build time to switch the CTA from enquiry to live booking. */
  provider: null as null | "rezdy" | "bokun" | "checkfront" | "fareharbor",
  endpoint: import.meta.env.PUBLIC_BOOKING_ENDPOINT ?? null,
  contactEndpoint: import.meta.env.PUBLIC_CONTACT_ENDPOINT ?? null,
  depositPct: 25,          // SAM-VERIFY: deposit percentage
  balanceDueDays: 30,      // SAM-VERIFY: when the balance falls due
} as const;

/** Cancellation terms. SAM-VERIFY: these are a common industry shape, not his policy. */
export const CANCELLATION = [
  { window: "More than 30 days before departure", refund: "Full refund, less a $50 administration fee" },
  { window: "15–30 days before departure", refund: "50% refund" },
  { window: "14 days or fewer", refund: "No refund" },
  {
    window: "Cancelled by us for weather or safety",
    refund: "Full refund or a transfer to another date — your choice",
  },
] as const;

/* ─────────────────────────────  Analytics  ────────────────────────────── */

export const ANALYTICS = {
  /** Dormant until a real ID exists. No script loads with a placeholder. */
  ga4MeasurementId: "G-XXXXXXXXXX", // SAM-VERIFY: real GA4 property
  storageKey: "sn-consent",
  renewDays: 180,
} as const;

/* ──────────────────────────────  Sharing  ─────────────────────────────── */

export const OG_IMAGE = {
  path: "/og/default-share-card.png",
  width: 1200,
  height: 630,
  alt: `${SITE.name} — ${SITE.tagline}`,
} as const;

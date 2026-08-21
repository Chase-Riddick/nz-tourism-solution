/**
 * Single source of truth for every site-wide fact.
 * No price, date, statistic or contact detail may be hardcoded elsewhere in src/.
 */
export const SITE = {
  name: "Sam's NZ",
  tagline: "Your day, in good hands.", // SAM-VERIFY: working tagline from the design canvas
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
  base: "Auckland",
  url: "https://samsnz.claralabs.tech", // SAM-VERIFY: final name and domain
  foundingYear: 2026,
  region: "North Island, New Zealand",
} as const;

/**
 * The whole commercial argument in one number, so it can never drift between
 * the homepage, the tour cards and the FAQ.
 *
 * Eleven matches Cheeky Kiwi Travel, the operator every guest will compare us
 * against (docs/research/pricing-v2-cheekykiwi.md). The grill (2026-08-19)
 * was explicit: "smaller" is NOT the wedge - the wedge is launch pricing
 * 15-20% under CK list plus the personal layer (photos included, direct
 * WhatsApp line, the guest-chosen stop). Same van class, same seat count,
 * better day.
 */
export const MAX_GROUP = 11;

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

export const CONTACT = {
  // SAM-VERIFY: every contact detail is a placeholder pattern, not a live line.
  email: "kiaora@samsnz.example",
  phone: { display: "+64 9 000 0000", e164: "+6490000000" }, // Auckland landline pattern
  /** Southern-hemisphere hours. A team of two to four is not a 24/7 desk. */
  hours: "Mon-Sat, 8am-6pm NZST",
  responseTime: "within one working day",
} as const;

/**
 * ADR pattern inherited from the reference build: the enquiry path is real UI
 * wired to nothing. Unset, the form renders in presentation mode with a
 * graceful static success state.
 *
 * A real operator books through Rezdy / Bokun / Checkfront / FareHarbor. That
 * choice is commercial - commission rates, OTA distribution, wholesaler
 * connectivity - and it is Sam's, so the site models it as one constant rather
 * than building an integration against a guess.
 */
/**
 * Read a build-time public env var safely.
 *
 * `import.meta.env` exists under Astro/Vite but NOT when a Playwright spec
 * imports this module directly in Node, which is exactly how the harness reads
 * the catalogue. Reaching for it unguarded throws before a single test runs.
 */
const publicEnv = (key: string): string | null => {
  const env = (import.meta as unknown as { env?: Record<string, string> }).env;
  return env?.[key] ?? null;
};

export const BOOKING = {
  provider: null as null | "rezdy" | "bokun" | "checkfront" | "fareharbor",
  contactEndpoint: publicEnv("PUBLIC_CONTACT_ENDPOINT"),
  depositPct: 25,       // SAM-VERIFY
  balanceDueDays: 30,   // SAM-VERIFY
} as const;

/**
 * The credential surface. Research (docs/research/regulatory.md) says a real NZ
 * operator publishes these and their absence reads as fake.
 *
 * Every value is a VISIBLE PLACEHOLDER. We show the shape of the credential
 * without inventing a government identifier - fabricating a plausible NZBN
 * would be forging a registry number, which is a different act from drafting
 * marketing copy. Enforced by tests/trust.spec.ts.
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

export const OG_IMAGE = {
  path: "/og/default-share-card.png",
  width: 1200,
  height: 630,
  alt: `${SITE.name} — ${SITE.tagline}`,
} as const;

/**
 * Social channels a small NZ inbound operator actually runs.
 * SAM-VERIFY: every handle is a placeholder. None of these accounts exist and
 * they must be registered before launch - a dead social link is worse than none.
 */
export const SOCIAL = [
  { label: "Instagram", href: "https://instagram.com/slownorth.nz" },
  { label: "Facebook", href: "https://facebook.com/slownorth.nz" },
  { label: "TripAdvisor", href: "https://tripadvisor.com/slownorth" },
] as const;

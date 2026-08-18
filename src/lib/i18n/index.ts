/**
 * i18n core. Locale-generic by construction, so adding a locale is a content
 * job rather than surgery.
 *
 * SHIPPING ENGLISH ONLY, DELIBERATELY (Chase, 2026-08-18).
 *
 * The market research still stands and still names German as the correct second
 * locale (docs/research/inbound-markets.md): Germany is only ~73,000 arrivals
 * against Australia's 1.48M, but 74% arrive for a holiday against ~48%
 * market-wide, they post the highest spend per trip and the longest stay, and
 * their most-enjoyed activity is walks and hikes - which is the product.
 *
 * What changed is the SEQUENCING, not the conclusion. Translating content that
 * has not been confirmed means every revision to a price, an itinerary or a
 * season has to be made twice, and the second copy silently rots. So: get the
 * English content to ~95% confirmed with Sam, then translate once.
 *
 * Nothing here is throwaway. Add "de" to LOCALES, add its dictionary, and the
 * route helpers below already do the right thing. A full German dictionary and
 * tour copy already exist on `spike/first-pass` and can be lifted when the
 * content settles.
 */
export const LOCALES = ["en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

/** Queued, not shipped. Kept visible so the plan is legible in the code. */
export const PLANNED_LOCALES = ["de"] as const;

/** BCP-47 tags for <html lang>, hreflang and number/date formatting. */
export const LOCALE_TAGS: Record<Locale, string> = {
  en: "en-NZ",
};

export const isLocale = (v: string): v is Locale =>
  (LOCALES as readonly string[]).includes(v);

/**
 * The default locale is served from the root (`/tours`); any future locale is
 * prefixed (`/de/tours`). Written now so adding a locale never moves an
 * existing URL.
 */
export const localePath = (locale: Locale, path = ""): string => {
  const clean = path.replace(/^\/+|\/+$/g, "");
  const prefix = locale === DEFAULT_LOCALE ? "" : `/${locale}`;
  return clean ? `${prefix}/${clean}` : prefix || "/";
};

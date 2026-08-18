/**
 * i18n core. Locale-generic by construction, so adding a locale is a content
 * job rather than surgery.
 *
 * Two locales ship, and that is a researched decision (docs/research/inbound-markets.md):
 * Germany is only ~73,000 arrivals against Australia's 1.48M, but 74% arrive for
 * a holiday against ~48% market-wide, they post the highest spend per trip and
 * the longest stay, and their most-enjoyed activity is walks and hikes - which
 * is the product. A third locale is withheld deliberately: a published locale is
 * a promise that someone answers email in that language.
 */
export const LOCALES = ["en", "de"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

/** BCP-47 tags for <html lang>, hreflang and number formatting. */
export const LOCALE_TAGS: Record<Locale, string> = {
  en: "en-NZ",
  de: "de-DE",
};

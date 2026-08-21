/**
 * i18n core. Locale-generic by construction, so adding a locale is a content
 * job rather than surgery.
 *
 * SHIPPING ENGLISH ONLY, DELIBERATELY (Chase, 2026-08-18).
 *
 * PLANNED LOCALE 2 IS SIMPLIFIED CHINESE (Chase, grill decision 7,
 * docs/grill-2026-08-19.md). The German research conclusion still stands on
 * its own numbers (docs/research/inbound-markets.md) and is kept there for the
 * record - but the second locale is the one the operator can actually stand
 * behind, and Sam lived in China for years: he can answer a booking email in
 * Chinese, which is what publishing the locale promises. A published locale is
 * a service promise, not a translation (CONTEXT.md).
 *
 * The sequencing rule is unchanged: confirm the English content with Sam to
 * ~95%, ship, then translate once. Translating unconfirmed content means every
 * price/itinerary/season revision is made twice and the second copy rots.
 *
 * Nothing here is throwaway. Add "zh-Hans" to LOCALES, add its dictionary,
 * and the route helpers below already do the right thing - no existing URL
 * moves, ever (locked by tests/locale.spec.ts).
 */
export const LOCALES = ["en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

/** Queued, not shipped. Kept visible so the plan is legible in the code. */
export const PLANNED_LOCALES = ["zh-Hans"] as const;

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

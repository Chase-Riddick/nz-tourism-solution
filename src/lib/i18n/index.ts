/**
 * i18n core. Locale-generic by construction — adding a locale is a content
 * job, not surgery.
 *
 * Two locales ship: English and German. That is a researched decision, not a
 * budget one (docs/research/inbound-markets.md). Germany is only ~73,000
 * arrivals against Australia's 1.48M, but 74% of them come for a holiday
 * against ~48% market-wide, they post the highest spend per trip of any market
 * ($8,664) and the longest stay, and their single most-enjoyed activity is
 * "walks, hikes and tramps" — which is the product.
 *
 * Adding a third is deliberately NOT done. A published locale is a promise
 * that someone answers email in that language; a team of two to four can make
 * that promise twice. See AGENTS.md rule 7.
 */

export const LOCALES = ["en", "de"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

/** BCP-47 tags for <html lang>, hreflang and number/date formatting. */
export const LOCALE_TAGS: Record<Locale, string> = {
  en: "en-NZ",
  de: "de-DE",
};

/** Endonyms — a language picker always shows a language in its own language. */
export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  de: "Deutsch",
};

export const isLocale = (v: string): v is Locale =>
  (LOCALES as readonly string[]).includes(v);

/**
 * English is served from the root (`/tours`), other locales from a prefix
 * (`/de/tours`). Standard, and it keeps the canonical English URLs clean.
 */
export const localePath = (locale: Locale, path = ""): string => {
  const clean = path.replace(/^\/+|\/+$/g, "");
  const prefix = locale === DEFAULT_LOCALE ? "" : `/${locale}`;
  return clean ? `${prefix}/${clean}` : prefix || "/";
};

/** Strips the locale prefix — used to build the language switcher's targets. */
export const stripLocale = (pathname: string): string => {
  const parts = pathname.replace(/^\/+/, "").split("/");
  if (parts[0] && isLocale(parts[0])) parts.shift();
  return parts.join("/");
};

/** Every locale's URL for one logical page. Drives hreflang alternates. */
export const alternates = (path: string): Array<{ locale: Locale; tag: string; href: string }> =>
  LOCALES.map((locale) => ({
    locale,
    tag: LOCALE_TAGS[locale],
    href: localePath(locale, path),
  }));

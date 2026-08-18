import type { Locale } from "./index";
import { enTours } from "./en/tours";
import type { TourCopy } from "./en/tours";
import { enUi } from "./en/ui";
import type { Ui } from "./en/ui";

const TOUR_DICTS: Record<Locale, TourCopy> = { en: enTours };
const UI_DICTS: Record<Locale, Ui> = { en: enUi };

/** Chrome strings for a locale. */
export const ui = (locale: Locale): Ui => UI_DICTS[locale];

/**
 * Tour copy for one id, in one locale.
 *
 * Throws rather than falling back to English. A silent fallback is exactly the
 * half-translated page AGENTS.md rule 7 forbids — and with one locale shipping,
 * a throw here is what will surface a missing entry the moment German lands.
 */
export const tourCopy = (locale: Locale, id: string) => {
  const copy = TOUR_DICTS[locale][id as keyof TourCopy];
  if (!copy) throw new Error(`Missing ${locale} copy for tour "${id}"`);
  return copy;
};

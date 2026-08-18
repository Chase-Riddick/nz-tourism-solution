import type { Locale } from "./index";
import { en } from "./en";
import { de } from "./de";
import { enTours } from "./en/tours";
import { deTours } from "./de/tours";
import type { Dictionary } from "./en";
import type { TourCopy } from "./en/tours";

const DICTS: Record<Locale, Dictionary> = { en, de };
const TOUR_DICTS: Record<Locale, TourCopy> = { en: enTours, de: deTours };

export const t = (locale: Locale): Dictionary => DICTS[locale];
export const tours = (locale: Locale): TourCopy => TOUR_DICTS[locale];

/** Tour copy for one id, in one locale. Throws loudly rather than falling back
 *  to English — a silent fallback is exactly the half-translated page that
 *  AGENTS.md rule 7 forbids. */
export const tourCopy = (locale: Locale, id: string) => {
  const copy = TOUR_DICTS[locale][id as keyof TourCopy];
  if (!copy) throw new Error(`Missing ${locale} copy for tour "${id}"`);
  return copy;
};

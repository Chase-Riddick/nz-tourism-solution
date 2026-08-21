import { test, expect } from "@playwright/test";
import { TOURS } from "../src/lib/catalog";
import { LOCALES, PLANNED_LOCALES, DEFAULT_LOCALE, localePath } from "../src/lib/i18n";
import { tourCopy } from "../src/lib/i18n/dictionary";

/**
 * Issue #26 (PRD #16) - zh-Hans is the planned second locale (grill decision
 * 7; supersedes #3's German plan). Nothing ships translated; these are locks
 * on the plumbing contract: complete-or-absent dictionaries, URLs that never
 * move when a locale lands, and no half-reserved routes leaking into dist.
 */

test.describe("locale plumbing", () => {
  test("the plan is zh-Hans, English-only shipping", () => {
    expect(LOCALES).toEqual(["en"]);
    expect(PLANNED_LOCALES).toEqual(["zh-Hans"]);
  });

  test("every tour resolves complete copy in every shipping locale", () => {
    for (const locale of LOCALES) {
      for (const t of TOURS) {
        const copy = tourCopy(locale, t.id); // throws on a missing entry
        expect(copy.name.length).toBeGreaterThan(0);
        expect(copy.itinerary, `${t.id} itinerary length`).toHaveLength(t.itineraryDays);
        expect(copy.highlights.length).toBeGreaterThan(2);
      }
    }
  });

  test("adding a locale never moves an existing URL", () => {
    expect(localePath(DEFAULT_LOCALE, "tours")).toBe("/tours");
    expect(localePath(DEFAULT_LOCALE)).toBe("/");
    // The prefix shape any future locale will use, exercised generically so
    // the day zh-Hans lands is a content day, not a routing day.
    expect(localePath("zh-Hans" as never, "tours")).toBe("/zh-Hans/tours");
  });

  test("pages declare the shipping locale and reserve nothing half-built", async ({ page, request }) => {
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("lang", "en-NZ");
    for (const path of ["/zh-Hans/", "/zh/", "/de/"]) {
      const res = await request.get(path);
      expect(res.status(), `${path} must not exist until its locale ships complete`).toBe(404);
    }
  });
});

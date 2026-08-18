import { test, expect } from "@playwright/test";
import { TOURS } from "../src/lib/catalog";

test.describe("tour detail", () => {
  for (const tour of TOURS) {
    test(`${tour.id} has a page a guest can decide from`, async ({ page }) => {
      const res = await page.goto(`/tours/${tour.id}`);
      expect(res?.status(), `/tours/${tour.id} should exist`).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    });
  }
});

test.describe("itinerary", () => {
  for (const tour of TOURS) {
    // itineraryDays guards drift: a 5-day tour with 3 written days is a
    // half-finished page that still builds, and this is what catches it.
    test(`${tour.id} publishes ${tour.itineraryDays} itinerary day(s)`, async ({ page }) => {
      await page.goto(`/tours/${tour.id}`);
      await expect(page.locator("[data-itinerary-day]")).toHaveCount(tour.itineraryDays);
    });
  }
});

test.describe("what's included", () => {
  for (const tour of TOURS.slice(0, 4)) {
    test(`${tour.id} spells out inclusions in prose, not catalogue keys`, async ({ page }) => {
      await page.goto(`/tours/${tour.id}`);

      const included = page.locator("[data-includes] li");
      await expect(included).toHaveCount(tour.includes.length);

      const excluded = page.locator("[data-excludes] li");
      await expect(excluded).toHaveCount(tour.excludes.length);

      // A raw key leaking through ("packedLunch", "trackTransfer") is the
      // failure mode: it builds, it renders, and it reads as broken.
      //
      // Substring matching would be wrong here - "guide" and "lunch" are keys
      // AND ordinary English that legitimately appears inside the prose. The
      // precise failure is a list item whose whole text IS a key.
      const keys = new Set<string>([...tour.includes, ...tour.excludes]);
      const items = await page
        .locator("[data-includes] li, [data-excludes] li")
        .allInnerTexts();

      for (const raw of items) {
        const item = raw.replace(/^[✓–\s]+/, "").trim();
        expect(keys.has(item), `"${item}" rendered as a raw key`).toBe(false);
        expect(item.length, `"${item}" is too short to be prose`).toBeGreaterThan(3);
      }
    });
  }
});

test.describe("price panel", () => {
  for (const tour of TOURS) {
    test(`${tour.id} shows only the price lines that apply to it`, async ({ page }) => {
      await page.goto(`/tours/${tour.id}`);
      const panel = page.locator("[data-price-panel]");
      await expect(panel).toBeVisible();

      // A child fare on a tour that does not take children, or a single-room
      // supplement on a day trip, is worse than no line at all.
      await expect(panel.locator("[data-child-price]"))
        .toHaveCount(tour.priceChild ? 1 : 0);
      await expect(panel.locator("[data-single-supplement]"))
        .toHaveCount(tour.singleSupplement ? 1 : 0);
    });
  }

  test("cancellation terms are visible before a guest enquires", async ({ page }) => {
    await page.goto("/tours/tongariro-crossing");
    await expect(page.locator("[data-cancellation] tr")).toHaveCount(4);
    await expect(page.getByText(/weather or safety/i)).toBeVisible();
  });
});

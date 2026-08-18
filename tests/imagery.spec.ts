import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";

const credits = JSON.parse(
  readFileSync(new URL("../public/photos/credits.json", import.meta.url), "utf8"),
) as Record<string, { licence: string; author: string; attributionRequired: boolean }>;

/**
 * 42 of the 49 published photographs require attribution as a CONDITION OF
 * THEIR LICENCE, not as a courtesy. These assertions are a legal guarantee.
 */
test.describe("imagery", () => {
  test("the homepage leads with a photograph that actually loads", async ({ page }) => {
    await page.goto("/");
    const hero = page.locator("img[data-photo-id]").first();
    await expect(hero).toBeVisible();

    const src = await hero.getAttribute("src");
    expect(src).toBeTruthy();
    const res = await page.request.get(src!);
    expect(res.status(), `hero image ${src} should resolve`).toBe(200);
  });

  test("every image the homepage renders has a licence entry", async ({ page }) => {
    await page.goto("/");
    const ids = await page.locator("img[data-photo-id]").evaluateAll((imgs) =>
      imgs.map((i) => i.getAttribute("data-photo-id")),
    );
    expect(ids.length).toBeGreaterThan(0);
    for (const id of ids) {
      expect(Object.keys(credits), `"${id}" must have a credit entry`).toContain(id);
    }
  });
});

test.describe("tour imagery", () => {
  test("every photograph across every tour page is credited and resolves", async ({ page }) => {
    const { TOURS } = await import("../src/lib/catalog");
    let checked = 0;

    for (const tour of TOURS) {
      await page.goto(`/tours/${tour.id}`);
      const ids = await page.locator("img[data-photo-id]").evaluateAll((imgs) =>
        imgs.map((i) => ({
          id: i.getAttribute("data-photo-id"),
          src: i.getAttribute("src"),
        })),
      );
      expect(ids.length, `${tour.id} should render photographs`).toBeGreaterThan(0);

      for (const { id, src } of ids) {
        expect(Object.keys(credits), `${tour.id}: "${id}" has no credit entry`).toContain(id);
        const res = await page.request.get(src!);
        expect(res.status(), `${tour.id}: ${src} should resolve`).toBe(200);
        checked++;
      }
    }
    expect(checked, "should have checked real images").toBeGreaterThan(10);
  });
});

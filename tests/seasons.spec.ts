import { test, expect } from "@playwright/test";
import { TOURS, ALPINE_SEASON } from "../src/lib/catalog";

const ALPINE = TOURS.filter((t) => t.weatherGated);

test.describe("alpine seasonality", () => {
  test("the alpine tours are the ones the catalogue says they are", async () => {
    // Guards the fixture itself: if weatherGated is dropped from the catalogue
    // every assertion below would pass vacuously.
    expect(ALPINE.map((t) => t.id).sort()).toEqual(["tongariro-weekender"]);
    expect(ALPINE_SEASON).toEqual([10, 11, 12, 1, 2, 3, 4, 5]);
  });

  for (const tour of ALPINE) {
    // The Tongariro shuttles run October-May and STOP under their DOC
    // concession once snow covers the track. Selling the Crossing in July is
    // the single fastest way to lose a New Zealand reader.
    test(`${tour.id} is never presented as running year-round`, async ({ page }) => {
      await page.goto(`/tours/${tour.id}`);
      const body = (await page.locator("body").innerText()).toLowerCase();
      expect(body).not.toContain("year-round");
      expect(body).not.toContain("all year");
    });

    test(`${tour.id} states its October-May season on the page`, async ({ page }) => {
      await page.goto(`/tours/${tour.id}`);
      await expect(page.locator("[data-season]")).toContainText(/Oct/i);
      await expect(page.locator("[data-season]")).toContainText(/May/i);
    });

    test(`${tour.id} tells a guest what happens when weather cancels`, async ({ page }) => {
      await page.goto(`/tours/${tour.id}`);
      const notice = page.locator("[data-weather-notice]");
      await expect(notice).toBeVisible();
      await expect(notice).toContainText(/refund|another date/i);
    });
  }
});

test.describe("the year", () => {
  // Southern hemisphere. A northern reader assumes July is summer; a New
  // Zealander spots the inversion instantly.
  test("December to February is presented as summer, not winter", async ({ page }) => {
    await page.goto("/tours");
    const summer = page.locator("[data-season-key='summer']");
    await expect(summer).toContainText(/December/i);
    await expect(summer).toContainText(/February/i);

    const winter = page.locator("[data-season-key='winter']");
    await expect(winter).toContainText(/June/i);
    await expect(winter).toContainText(/August/i);
  });

  test("each season shows what actually runs in it", async ({ page }) => {
    await page.goto("/tours");
    await expect(page.locator("[data-season-key]")).toHaveCount(4);

    // Winter is the honest test: the alpine tours must be absent, and
    // something must still be running or the business looks shut.
    const winter = page.locator("[data-season-key='winter']");
    await expect(winter).not.toContainText("Tongariro Crossing Weekender");
    await expect(winter.locator("[data-season-tour]")).not.toHaveCount(0);

    const summer = page.locator("[data-season-key='summer']");
    await expect(summer).toContainText("Tongariro Crossing Weekender");
  });
});

test.describe("the Crossing inside a year-round tour", () => {
  // Invariant 5 has a subtle v2 case: Volcanic Heartland runs all year, but
  // its mountain day is the Crossing only in season. The page must say the
  // winter swap out loud - selling the Crossing in July by implication is
  // still selling the Crossing in July.
  test("volcanic-heartland states the winter swap explicitly", async ({ page }) => {
    await page.goto("/tours/volcanic-heartland");
    const body = (await page.locator("body").innerText()).toLowerCase();
    expect(body).toContain("alpine season");
    expect(body).toMatch(/outside the season|winter/);
  });
});

test.describe("seasonal marking on the index", () => {
  test("seasonal tours are visibly distinguished from year-round ones", async ({ page }) => {
    await page.goto("/tours");
    const seasonalIds = TOURS.filter((t) => t.months.length < 12).map((t) => t.id);
    const yearRoundIds = TOURS.filter((t) => t.months.length === 12).map((t) => t.id);

    expect(seasonalIds.length, "fixture: some tours must be seasonal").toBeGreaterThan(0);
    expect(yearRoundIds.length, "fixture: some tours must be year-round").toBeGreaterThan(0);

    for (const id of seasonalIds) {
      await expect(
        page.locator(`[data-tour-id="${id}"] [data-seasonal-badge]`),
        `${id} should be marked seasonal`,
      ).toBeVisible();
    }
    for (const id of yearRoundIds) {
      await expect(
        page.locator(`[data-tour-id="${id}"] [data-seasonal-badge]`),
        `${id} should NOT be marked seasonal`,
      ).toHaveCount(0);
    }
  });
});

import { test, expect } from "@playwright/test";
import { byRank, perDay, multiDayTours } from "../src/lib/catalog";
import { MAX_GROUP } from "../src/lib/constants";

test.describe("the homepage argument", () => {
  test("it explains why the group is capped, using the real number", async ({ page }) => {
    await page.goto("/");
    const body = await page.locator("body").innerText();
    expect(body).toContain(String(MAX_GROUP));
    expect(body.toLowerCase()).toMatch(/small group|maximum|group size/);
  });

  // The comparison a guest makes in their head anyway. Making it openly is
  // more persuasive than hoping they don't.
  test("it makes the per-day price comparison openly", async ({ page }) => {
    await page.goto("/");
    const band = page.locator("[data-price-argument]");
    await expect(band).toBeVisible();

    const rates = multiDayTours().map(perDay);
    const low = Math.min(...rates);
    await expect(band).toContainText(String(low));
    await expect(band).toContainText(/coach/i);
  });

  test("featured tours follow the catalogue's own ranking", async ({ page }) => {
    await page.goto("/");
    const shown = await page
      .locator("[data-featured] [data-tour-id]")
      .evaluateAll((els) => els.map((e) => e.getAttribute("data-tour-id")));

    expect(shown.length).toBeGreaterThan(2);
    expect(shown).toEqual(byRank().slice(0, shown.length).map((t) => t.id));
  });

  test("the year is summarised and links to the full seasonal view", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("[data-season-summary] [data-season-key]")).toHaveCount(4);
    await expect(page.locator('[data-season-summary] a[href="/tours"]')).toHaveCount(1);
  });

  test("credential signals appear and lead to the safety page", async ({ page }) => {
    await page.goto("/");
    const proof = page.locator("[data-proof]");
    await expect(proof).toBeVisible();
    await expect(proof.locator('a[href="/safety"]')).toHaveCount(1);
  });
});

test.describe("motion", () => {
  test("content reveals as it enters the viewport", async ({ page }) => {
    await page.goto("/");
    const later = page.locator("[data-proof] [data-reveal]").first();

    // Below the fold: staged, not yet revealed.
    await expect(later).toHaveAttribute("data-revealed", "false");

    await later.scrollIntoViewIfNeeded();
    await expect(later).toHaveAttribute("data-revealed", "true");
  });

  // Motion is decoration; content is not. A visitor who asked the OS for less
  // motion must still get every word, immediately.
  test("a visitor who prefers reduced motion gets everything at once", async ({ browser }) => {
    const ctx = await browser.newContext({ reducedMotion: "reduce" });
    const page = await ctx.newPage();
    await page.goto("/");

    const staged = page.locator("[data-reveal]");
    const count = await staged.count();
    expect(count).toBeGreaterThan(5);

    for (let i = 0; i < count; i++) {
      await expect(staged.nth(i), `element ${i} must not be hidden`)
        .toHaveAttribute("data-revealed", "true");
      const opacity = await staged.nth(i).evaluate((el) => getComputedStyle(el).opacity);
      expect(Number(opacity)).toBe(1);
    }
    await ctx.close();
  });
});

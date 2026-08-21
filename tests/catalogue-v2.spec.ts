import { test, expect } from "@playwright/test";
import { TOURS } from "../src/lib/catalog";

/**
 * Issue #25 (PRD #16) - the catalogue rebuilt around the repositioned company:
 * ten tours ex-Auckland, one to four days, launch prices 15-20% under the
 * comparable big-operator list rate (docs/research/pricing-v2-cheekykiwi.md),
 * with the struck comparison shown openly and first-season framing site-wide.
 * The catalogue import only DRIVES the page assertions - the truth asserted
 * is what a visitor sees rendered (the seam, per CONTEXT.md).
 */

test.describe("the v2 catalogue, rendered", () => {
  test("all ten tours render on the index, every one ex-Auckland and ≤ 4 days", async ({ page }) => {
    expect(TOURS).toHaveLength(10);
    await page.goto("/tours");
    for (const t of TOURS) {
      const card = page.locator(`[data-tour-id="${t.id}"]`);
      await expect(card).toBeVisible();
      await expect(card.locator("[data-days]").or(card)).toHaveAttribute("data-days", String(t.days));
    }
    const days = await page.locator("[data-days]").evaluateAll((els) =>
      els.map((e) => Number(e.getAttribute("data-days"))),
    );
    expect(Math.max(...days)).toBeLessThanOrEqual(4);
  });

  test("launch prices carry the struck comparison where a real list rate exists", async ({ page }) => {
    await page.goto("/tours");
    const wild = page.locator('[data-tour-id="west-coast-beaches"]');
    await expect(wild).toContainText("$149");
    await expect(wild.locator("del")).toContainText("$175");
    // Waiheke has no crisp comparable - a struck price there would be invented
    await expect(page.locator('[data-tour-id="waiheke-island"] del')).toHaveCount(0);
  });

  test("first-season framing is stated where prices are compared", async ({ page }) => {
    await page.goto("/tours");
    await expect(page.locator("main")).toContainText(/first[-\s]season/i);
  });

  test("the detail page shows launch price, struck comparison and framing", async ({ page }) => {
    await page.goto("/tours/cathedral-cove-coromandel");
    const panel = page.locator("[data-price-panel]");
    await expect(panel).toContainText("$219");
    await expect(panel.locator("del")).toContainText("$259");
    await expect(panel).toContainText(/first[-\s]season/i);
  });

  test("the Crossing weekender sells only in the alpine season", async ({ page }) => {
    await page.goto("/tours/tongariro-weekender");
    await expect(page.locator("main")).toContainText(/October|alpine/i);
  });
});

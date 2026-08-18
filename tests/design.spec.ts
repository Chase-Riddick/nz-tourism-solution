import { test, expect } from "@playwright/test";

/**
 * The palette is North Island specific, and that is the point: blue and green
 * alone is the South Island's alpine signature. The differentiator is a
 * geothermal sulphur accent on a basalt ground.
 * See docs/research/brand-and-design.md.
 */
test.describe("visual identity", () => {
  test("the page sits on a dark basalt ground, not a default white", async ({ page }) => {
    await page.goto("/");
    const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    const [r, g, b] = bg.match(/\d+/g)!.map(Number);
    // Dark, and blue-green shifted rather than a neutral grey - a neutral #111
    // reads as developer dark mode, not as a place.
    expect(r + g + b, `body background ${bg} should be dark`).toBeLessThan(120);
    expect(b, `body background ${bg} should be cooler than it is warm`).toBeGreaterThan(r);
  });

  test("headings use the display face, not a system fallback", async ({ page }) => {
    await page.goto("/");
    const font = await page.evaluate(
      () => getComputedStyle(document.querySelector("h1")!).fontFamily,
    );
    expect(font).toContain("Display");
  });
});

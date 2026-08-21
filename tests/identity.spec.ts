import { test, expect } from "@playwright/test";

/**
 * Issue #20 (PRD #16) - the grill (docs/grill-2026-08-19.md) repositioned the
 * company: founder-named, based in Auckland, eleven seats to match the
 * operator being benchmarked, nothing implying the old premium-at-eight
 * argument. Asserted at the one seam: what a visitor reads on the built pages.
 *
 * The public alias is "Tom" (#39): the site is deployed openly, so the real
 * founder's name must never appear on a built page. Internal docs keep "Sam".
 */

const KEY_PAGES = ["/", "/tours", "/about", "/faq", "/contact", "/destinations"];

test.describe("repositioned identity", () => {
  test("the homepage carries the new name", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Tom's NZ/);
  });

  for (const path of KEY_PAGES) {
    test(`no page still says Slow North: ${path}`, async ({ page }) => {
      await page.goto(path);
      const body = await page.content();
      expect(body).not.toContain("Slow North");
    });

    test(`the real founder's name never appears: ${path}`, async ({ page }) => {
      await page.goto(path);
      const body = await page.content();
      expect(body).not.toMatch(/\bSam\b/);
      expect(body).not.toContain("samsnz");
    });
  }

  test("the base is Auckland, said in the visitor's face", async ({ page }) => {
    await page.goto("/about");
    await expect(page.locator("main")).toContainText(/based in Auckland/);
  });

  test("group size is eleven, and the old eight-guest argument is gone", async ({ page }) => {
    await page.goto("/");
    const main = page.locator("main");
    await expect(main).toContainText(/11 people/);
    const body = await page.content();
    expect(body).not.toMatch(/eight guests|maximum eight|of 8 guests/i);
  });
});

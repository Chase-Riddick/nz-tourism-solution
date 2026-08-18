import { test, expect } from "@playwright/test";

test.describe("site navigation", () => {
  test("every page carries a header with primary navigation", async ({ page }) => {
    await page.goto("/");
    const header = page.getByRole("banner");
    await expect(header).toBeVisible();
    await expect(header.getByRole("navigation")).toBeVisible();
  });

  // The registry exists so nav can never point at a page that isn't built.
  test("no navigation link anywhere goes to a 404", async ({ page }) => {
    await page.goto("/");
    const hrefs = await page
      .locator("header a[href^='/'], footer a[href^='/']")
      .evaluateAll((els) => [...new Set(els.map((e) => e.getAttribute("href")!))]);

    expect(hrefs.length, "should have real navigation").toBeGreaterThan(4);
    for (const href of hrefs) {
      const res = await page.request.get(href);
      expect(res.status(), `${href} is linked but does not resolve`).toBe(200);
    }
  });

  test("the current section is announced, not just coloured", async ({ page }) => {
    await page.goto("/tours");
    // The header renders a desktop nav and a mobile nav; both are in the DOM
    // and one is hidden by breakpoint. Scope to what a visitor can actually
    // see rather than counting every node.
    const current = page.locator('header a[aria-current="page"]:visible');
    await expect(current).toHaveCount(1);
    await expect(current).toHaveText(/tours/i);

    // And it must follow into a detail page - section match, not exact match.
    await page.goto("/tours/east-cape-five");
    await expect(page.locator('header a[aria-current="page"]:visible')).toHaveText(/tours/i);
  });

  test("a keyboard user can skip straight to the content", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const focused = page.locator(":focus");
    await expect(focused).toHaveText(/skip/i);
    // Hidden until focused, then genuinely visible.
    await expect(focused).toBeInViewport();
    await expect(focused).toHaveAttribute("href", "#main");
    await expect(page.locator("main#main")).toHaveCount(1);
  });

  test("navigation is usable on a phone", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    const toggle = page.locator("[data-menu-toggle]");
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");

    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator("#mobile-nav")).toBeVisible();

    // No horizontal overflow at 375px - the classic phone failure.
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth + 1,
    );
    expect(overflow, "page must not scroll sideways at 375px").toBe(false);
  });
});

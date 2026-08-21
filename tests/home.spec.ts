import { test, expect } from "@playwright/test";

test.describe("homepage", () => {
  test("a visitor reaching the site sees the operator's name and a headline", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Sam's NZ/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  // AGENTS.md rule 4: this describes an operator that does not exist, at
  // researched-but-invented prices. A traveller must never reach it while
  // trying to book a holiday. Ethics rule, not an SEO setting.
  test("search engines are told not to index a site for a company that does not exist", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  });
});

test.describe("document locale", () => {
  test("the English page declares New Zealand English, not generic English", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("lang", "en-NZ");
  });
});

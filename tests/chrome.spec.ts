import { test, expect } from "@playwright/test";

const PAGES = ["/", "/tours", "/tours/tongariro-weekender", "/credits"];

test.describe("site chrome", () => {
  for (const path of PAGES) {
    test(`${path} carries a footer that credits the photography`, async ({ page }) => {
      await page.goto(path);
      const footer = page.getByRole("contentinfo");
      await expect(footer).toBeVisible();
      await expect(footer.locator('a[href="/credits"]')).toHaveCount(1);
    });

    // PRD user story 41. The repo is public and the operator is invented; the
    // minimum honest disclosure is saying so where anyone can see it.
    test(`${path} states plainly that the company is not real`, async ({ page }) => {
      await page.goto(path);
      const footer = await page.getByRole("contentinfo").innerText();
      expect(footer.toLowerCase()).toMatch(/does not exist|not a real|demonstration/);
    });
  }
});

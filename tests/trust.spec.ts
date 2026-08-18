import { test, expect } from "@playwright/test";
import { TOURS } from "../src/lib/catalog";

test.describe("safety and credentials", () => {
  test("the page exists and is reachable from navigation", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('a[href="/safety"]').first()).toHaveCount(1);
    const res = await page.goto("/safety");
    expect(res?.status()).toBe(200);
  });

  test("every credential is listed with its status", async ({ page }) => {
    const { CREDENTIALS } = await import("../src/lib/constants");
    await page.goto("/safety");
    await expect(page.locator("[data-credential]")).toHaveCount(CREDENTIALS.length);

    for (const c of CREDENTIALS) {
      const row = page.locator(`[data-credential="${c.key}"]`);
      await expect(row, `${c.key} should be listed`).toBeVisible();
      await expect(row).toContainText(c.label);
    }
  });

  // Fabricating a plausible NZBN is forging a government registry number -
  // a different act from drafting marketing copy. Placeholders only.
  test("no government registry number is invented", async ({ page }) => {
    await page.goto("/safety");
    const body = await page.locator("body").innerText();
    // NZBN is 13 digits; GST numbers are 8-9. Neither may appear.
    expect(body, "a 13-digit NZBN-shaped number appears").not.toMatch(/\b\d{13}\b/);
    expect(body, "a GST-shaped number appears").not.toMatch(/\b\d{8,9}\b/);
  });

  test("it explains why conservation land needs a concession, and names the tours", async ({ page }) => {
    await page.goto("/safety");
    await expect(page.getByText(/concession/i).first()).toBeVisible();
    await expect(page.getByText(/Department of Conservation|DOC/).first()).toBeVisible();

    const onDoc = TOURS.filter((t) => t.conservationLand);
    expect(onDoc.length, "fixture: some tours run on conservation land").toBeGreaterThan(2);
    await expect(page.locator("[data-conservation-tour]")).toHaveCount(onDoc.length);
  });
});

test.describe("about", () => {
  test("the page exists and says who is behind the operation", async ({ page }) => {
    const res = await page.goto("/about");
    expect(res?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});

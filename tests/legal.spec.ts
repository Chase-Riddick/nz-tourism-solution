import { test, expect } from "@playwright/test";

const LEGAL = ["/privacy", "/terms", "/cookies", "/accessibility"];

test.describe("the pages a real site has", () => {
  for (const path of LEGAL) {
    test(`${path} exists and is linked from the footer`, async ({ page }) => {
      const res = await page.goto(path);
      expect(res?.status(), `${path} should exist`).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(page.getByRole("contentinfo").locator(`a[href="${path}"]`)).toHaveCount(1);
    });
  }

  test("privacy says what the enquiry form collects and what analytics does", async ({ page }) => {
    await page.goto("/privacy");
    const body = (await page.locator("body").innerText()).toLowerCase();
    expect(body).toContain("enquiry");
    expect(body).toMatch(/analytics/);
    expect(body).toMatch(/privacy act/);
  });

  test("booking conditions state the money terms from the single source", async ({ page }) => {
    const { BOOKING, CANCELLATION } = await import("../src/lib/constants");
    await page.goto("/terms");
    const body = await page.locator("body").innerText();
    expect(body).toContain(`${BOOKING.depositPct}%`);
    expect(body).toContain(String(BOOKING.balanceDueDays));
    await expect(page.locator("[data-cancellation] tr")).toHaveCount(CANCELLATION.length);
  });

  test("the cookie policy is reachable from the consent banner", async ({ page }) => {
    await page.goto("/");
    const link = page.locator('#consent-banner a[href="/cookies"]');
    await expect(link).toHaveCount(1);
    const res = await page.request.get("/cookies");
    expect(res.status()).toBe(200);
  });
});

test.describe("404", () => {
  test("a mistyped URL offers a way back to the tours", async ({ page }) => {
    const res = await page.goto("/this-page-does-not-exist");
    expect(res?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator('a[href="/tours"]').first()).toBeVisible();
  });
});

import { test, expect } from "@playwright/test";
import { TOURS } from "../src/lib/catalog";

test.describe("enquiry form", () => {
  test("a guest can ask a question without creating an account", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    for (const name of ["name", "email", "phone", "tour", "dates", "group", "message"]) {
      await expect(
        page.locator(`[name="${name}"]`),
        `form should collect "${name}"`,
      ).toHaveCount(1);
    }
  });

  test("the tour picker offers every tour we actually run", async ({ page }) => {
    await page.goto("/contact");
    const values = await page
      .locator('select[name="tour"] option')
      .evaluateAll((els) => els.map((e) => (e as HTMLOptionElement).value));

    for (const tour of TOURS) {
      expect(values, `${tour.id} should be selectable`).toContain(tour.id);
    }
    expect(values, "should offer an undecided option").toContain("");
  });
});

test.describe("presentation mode", () => {
  // With no endpoint configured the form must still behave. A demo that
  // errors or silently does nothing reads as broken, which is the one thing
  // this artifact cannot afford.
  test("submitting succeeds and reads the address back to the visitor", async ({ page }) => {
    await page.goto("/contact");
    await page.fill('[name="name"]', "Sam Whitfield");
    await page.fill('[name="email"]', "sam@example.co.nz");
    await page.click('button[type="submit"]');

    const ok = page.locator("#inquiry-success");
    await expect(ok).toBeVisible();
    // Catches the one thing double opt-in would have caught - a typo'd
    // address - without any of its backscatter risk.
    await expect(ok.locator("[data-readback]")).toHaveText("sam@example.co.nz");
  });
});

test.describe("bot defence", () => {
  test("the honeypot is hidden from people but reachable by bots", async ({ page }) => {
    await page.goto("/contact");
    const honey = page.locator('[name="_gotcha"]');
    await expect(honey).toHaveCount(1);
    await expect(honey).not.toBeInViewport();
    await expect(honey).toHaveAttribute("tabindex", "-1");
    // Off-screen rather than display:none - some bots skip display-hidden fields.
    const parentHidden = await honey.evaluate(
      (el) => el.closest("[aria-hidden='true']") !== null,
    );
    expect(parentHidden, "honeypot must be aria-hidden from screen readers").toBe(true);
  });

  test("a bot that fills the honeypot is shown success anyway", async ({ page }) => {
    await page.goto("/contact");
    await page.fill('[name="name"]', "bot");
    await page.fill('[name="email"]', "bot@example.com");
    await page.locator('[name="_gotcha"]').fill("gotcha", { force: true });
    await page.click('button[type="submit"]');
    // Telling a bot it failed just makes it retry.
    await expect(page.locator("#inquiry-success")).toBeVisible();
  });
});

test.describe("enquiring from a tour page", () => {
  test("the tour you were reading about is already selected", async ({ page }) => {
    await page.goto("/tours/volcanic-heartland");
    await expect(page.locator('select[name="tour"]')).toHaveValue("volcanic-heartland");
  });
});

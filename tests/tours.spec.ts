import { test, expect } from "@playwright/test";

test.describe("tours index", () => {
  test("a visitor can see the whole catalogue on one page", async ({ page }) => {
    await page.goto("/tours");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator("[data-tour-id]")).toHaveCount(10);
  });
});

test.describe("published prices", () => {
  // Reverses the reference build's quote-only decision, which was client
  // instruction rather than research. A day tour is a comparison purchase and
  // essentially every real operator publishes a rate.
  test("every tour shows a price a visitor can compare without emailing anyone", async ({ page }) => {
    await page.goto("/tours");
    const cards = page.locator("[data-tour-id]");
    for (let i = 0; i < (await cards.count()); i++) {
      const text = await cards.nth(i).innerText();
      expect(text, `tour card ${i} should publish a NZD price`).toMatch(/\$[\d,]+/);
    }
  });

  test("the page says plainly that prices are per person and include GST", async ({ page }) => {
    await page.goto("/tours");
    const body = await page.locator("body").innerText();
    expect(body).toMatch(/per person/i);
    expect(body).toMatch(/GST/);
  });
});

test.describe("catalogue structure", () => {
  test("day tours and multi-day tours are presented as separate groups", async ({ page }) => {
    await page.goto("/tours");
    await expect(page.getByRole("heading", { name: /day tours/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /two to four days/i })).toBeVisible();
    // 7 day tours, 3 multi-day - the v2 catalogue split (#25).
    await expect(page.locator("[data-group='day'] [data-tour-id]")).toHaveCount(7);
    await expect(page.locator("[data-group='multi'] [data-tour-id]")).toHaveCount(3);
  });

  // A guest comparing us against a coach tour does the per-day division in
  // their head. Publishing it removes the arithmetic and makes the argument.
  test("multi-day tours publish a per-day rate that matches the total", async ({ page }) => {
    await page.goto("/tours");
    const cards = page.locator("[data-group='multi'] [data-tour-id]");
    // Guard: without this the loop body never runs and the test passes
    // vacuously, which is worse than having no test at all.
    await expect(cards).toHaveCount(3);
    for (let i = 0; i < (await cards.count()); i++) {
      const card = cards.nth(i);
      const total = Number((await card.getAttribute("data-price"))!);
      const days = Number((await card.getAttribute("data-days"))!);
      const text = await card.innerText();
      const expected = Math.round(total / days).toLocaleString("en-NZ");
      expect(text, `per-day rate for card ${i} should be $${expected}`).toContain(`$${expected}`);
    }
  });
});

test.describe("tour naming", () => {
  test("tours are shown by name, not by internal slug", async ({ page }) => {
    await page.goto("/tours");
    const headings = await page
      .locator("[data-tour-id] h3")
      .evaluateAll((els) => els.map((e) => e.textContent?.trim() ?? ""));

    expect(headings).toHaveLength(10);
    for (const h of headings) {
      expect(h, `"${h}" looks like a slug, not a name`).not.toMatch(/^[a-z0-9]+(-[a-z0-9]+)+$/);
      expect(h.length).toBeGreaterThan(3);
    }
    // The catalogue's own vocabulary should be visible to a reader.
    expect(headings).toContain("Tongariro Crossing Weekender");
  });
});

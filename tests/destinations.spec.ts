import { test, expect } from "@playwright/test";
import { TOURS } from "../src/lib/catalog";

const ALL_PLACES = [...new Set(TOURS.flatMap((t) => t.places))];

test.describe("destinations", () => {
  test("every place the catalogue visits has an entry", async ({ page }) => {
    await page.goto("/destinations");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(ALL_PLACES.length).toBeGreaterThan(15);
    await expect(page.locator("[data-place]")).toHaveCount(ALL_PLACES.length);
  });

  test("each place names the tours that actually go there", async ({ page }) => {
    await page.goto("/destinations");
    for (const key of ALL_PLACES.slice(0, 6)) {
      const expected = TOURS.filter((t) => t.places.includes(key)).length;
      await expect(
        page.locator(`[data-place="${key}"] [data-place-tour]`),
        `${key} should link its ${expected} tour(s)`,
      ).toHaveCount(expected);
    }
  });

  // Macrons are the detail a New Zealander notices first.
  test("Māori place names keep their macrons", async ({ page }) => {
    await page.goto("/destinations");
    const body = await page.locator("body").innerText();
    for (const name of ["Taupō", "Waitākere", "Cape Rēinga", "Ōpōtiki"]) {
      // Only assert names actually used by the catalogue's place set.
      if (body.includes(name.replace(/[āēīōū]/g, (c) => "aeiou"["āēīōū".indexOf(c)]))) {
        expect(body, `${name} should be macronised`).toContain(name);
      }
    }
    expect(body).toContain("Taupō");
  });
});

test.describe("FAQ", () => {
  test("it answers what a guest asks before enquiring", async ({ page }) => {
    await page.goto("/faq");
    const body = (await page.locator("body").innerText()).toLowerCase();
    for (const topic of ["price", "group", "weather", "fit", "bring", "language"]) {
      expect(body, `FAQ should cover "${topic}"`).toContain(topic);
    }
  });

  test("answers are keyboard reachable and expand", async ({ page }) => {
    await page.goto("/faq");
    const first = page.locator("details").first();
    await expect(first).toHaveCount(1);
    await expect(first).not.toHaveAttribute("open", "");

    await first.locator("summary").press("Enter");
    await expect(first).toHaveAttribute("open", "");
  });
});

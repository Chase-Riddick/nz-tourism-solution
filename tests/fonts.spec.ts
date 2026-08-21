import { test, expect } from "@playwright/test";

/**
 * Issue #19 (PRD #16) - the v1 defect that made the whole site render in
 * fallback faces: global.css declares fonts at /fonts/*.woff2, but the files
 * lived only on spike/first-pass, so every declared source 404'd and the
 * failure was silent. These specs make it loud, at the one seam: the built
 * site must serve every declared source, and the faces must actually be
 * loadable - macrons included - not merely declared.
 */

const DECLARED = [
  "/fonts/fraunces-latin.woff2",
  "/fonts/fraunces-latin-ext.woff2",
  "/fonts/inter-latin.woff2",
  "/fonts/inter-latin-ext.woff2",
];

test.describe("self-hosted fonts", () => {
  for (const path of DECLARED) {
    test(`serves ${path}`, async ({ request }) => {
      const res = await request.get(path);
      expect(res.status()).toBe(200);
      expect(res.headers()["content-type"] ?? "").toContain("woff2");
    });
  }

  test("display and body faces actually load on the homepage", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    const loaded = await page.evaluate(
      () => document.fonts.check('16px "Display"') && document.fonts.check('16px "Body"'),
    );
    expect(loaded).toBe(true);
  });

  test("macronised place names have glyph coverage (latin-ext)", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    const ok = await page.evaluate(async () => {
      await document.fonts.load('16px "Display"', "Taupō Whakatāne Ōpōtiki");
      return document.fonts.check('16px "Display"', "Taupō Whakatāne Ōpōtiki");
    });
    expect(ok).toBe(true);
  });
});

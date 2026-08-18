import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";

const credits = JSON.parse(
  readFileSync(new URL("../public/photos/credits.json", import.meta.url), "utf8"),
) as Record<string, { author: string; licence: string; source: string; attributionRequired: boolean; shareAlike: boolean }>;

const attributed = Object.entries(credits).filter(([, c]) => c.attributionRequired);

test.describe("photo credits", () => {
  test("fixture: most published images actually carry an attribution duty", async () => {
    expect(attributed.length).toBeGreaterThan(30);
  });

  test("every image whose licence demands credit is credited by name and licence", async ({ page }) => {
    await page.goto("/credits");
    const body = await page.locator("body").innerText();

    for (const [id, c] of attributed) {
      const author = c.author.replace(/\s+/g, " ").trim();
      expect(body, `${id}: author missing`).toContain(author);
      expect(body, `${id}: licence missing`).toContain(c.licence);
    }
  });

  test("each credited image links back to its source", async ({ page }) => {
    await page.goto("/credits");
    for (const [id, c] of attributed.slice(0, 8)) {
      await expect(
        page.locator(`a[href="${c.source}"]`),
        `${id}: no link to its Commons page`,
      ).toHaveCount(1);
    }
  });
});

test.describe("published set integrity", () => {
  const readJson = (rel: string) =>
    JSON.parse(readFileSync(new URL(rel, import.meta.url), "utf8"));

  test("no image rejected in curation is reachable under public/", async () => {
    const curation = readJson("../photo-library/curation.json") as Record<
      string,
      { verdict: string; note?: string }
    >;
    const rejected = Object.entries(curation)
      .filter(([k, v]) => !k.startsWith("_") && v.verdict === "reject")
      .map(([k]) => k);

    expect(rejected.length, "fixture: curation must have rejected some images")
      .toBeGreaterThan(10);

    const { readdirSync } = await import("node:fs");
    const published = readdirSync(new URL("../public/photos", import.meta.url));

    // AGENTS.md rule 10: anything under public/ is served whether or not a page
    // links to it. Unreferenced is not unpublished.
    for (const id of rejected) {
      const leaked = published.filter((f) => f.startsWith(`${id}-`));
      expect(leaked, `rejected image "${id}" leaked into public/`).toEqual([]);
    }
  });

  test("every published derivative belongs to a credited image", async () => {
    const { readdirSync } = await import("node:fs");
    const files = readdirSync(new URL("../public/photos", import.meta.url))
      .filter((f) => f.endsWith(".webp"));

    expect(files.length).toBeGreaterThan(100);
    for (const f of files) {
      const id = f.replace(/-\d+\.webp$/, "");
      expect(Object.keys(credits), `${f} has no credit entry`).toContain(id);
    }
  });
});

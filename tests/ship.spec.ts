import { test, expect } from "@playwright/test";
import { existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const PAGES = [
  "/", "/tours", "/tours/tongariro-weekender", "/destinations", "/faq",
  "/about", "/safety", "/contact", "/credits", "/privacy", "/terms",
  "/cookies", "/accessibility",
];

test.describe("share cards", () => {
  test("every page carries a share card that actually resolves", async ({ page }) => {
    for (const path of PAGES) {
      await page.goto(path);
      const og = page.locator('meta[property="og:image"]');
      await expect(og, `${path} should declare og:image`).toHaveCount(1);
      const url = await og.getAttribute("content");
      // The tag carries the absolute production origin, which does not resolve
      // in the harness. What matters is that the asset exists, so fetch its path.
      const asset = new URL(url!).pathname;
      const res = await page.request.get(asset);
      expect(res.status(), `${path}: og:image ${asset} should resolve`).toBe(200);
    }
  });

  test("pages describe themselves distinctly", async ({ page }) => {
    const titles = new Set<string>();
    for (const path of PAGES) {
      await page.goto(path);
      const title = await page.title();
      expect(title.length, `${path} has no title`).toBeGreaterThan(5);
      titles.add(title);
      await expect(page.locator('meta[name="description"]')).toHaveCount(1);
    }
    expect(titles.size, "every page should have its own title").toBe(PAGES.length);
  });
});

test.describe("crawler posture", () => {
  // The operator does not exist and the prices are invented. Being findable
  // is the failure mode, not the goal.
  test("robots.txt disallows everything while the site is not indexable", async ({ page }) => {
    const res = await page.request.get("/robots.txt");
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toMatch(/User-agent:\s*\*/i);
    expect(body).toMatch(/Disallow:\s*\//);
  });

  test("no sitemap is published while the site is noindex", async () => {
    expect(existsSync("dist/sitemap-index.xml"), "sitemap must not ship").toBe(false);
    expect(existsSync("dist/sitemap-0.xml"), "sitemap must not ship").toBe(false);
  });
});

test.describe("no internal link anywhere is broken", () => {
  test("every internal href on every page resolves", async ({ page }) => {
    const seen = new Set<string>();
    const broken: string[] = [];

    for (const path of PAGES) {
      await page.goto(path);
      const hrefs = await page
        .locator("a[href^='/']")
        .evaluateAll((els) => els.map((e) => e.getAttribute("href")!));

      for (const href of hrefs) {
        const clean = href.split("#")[0];
        if (!clean || seen.has(clean)) continue;
        seen.add(clean);
        const res = await page.request.get(clean);
        if (res.status() !== 200) broken.push(`${path} -> ${clean} (${res.status()})`);
      }
    }
    expect(seen.size).toBeGreaterThan(15);
    expect(broken, `broken links:\n${broken.join("\n")}`).toEqual([]);
  });
});

test.describe("deployment hygiene", () => {
  // AGENTS.md rule 2: Amplify auto-detects Astro. A config file here would
  // silently override console settings that are documented in RUNBOOK.md.
  test("no host-specific config file is committed", async () => {
    for (const f of ["amplify.yml", "amplify.yaml", "netlify.toml", "vercel.json", "_redirects"]) {
      expect(existsSync(f), `${f} must not exist - see AGENTS.md rule 2`).toBe(false);
    }
  });

  test("a runbook documents build, serve and the settings that are not in the repo", async () => {
    expect(existsSync("RUNBOOK.md")).toBe(true);
    const { readFileSync } = await import("node:fs");
    const rb = readFileSync("RUNBOOK.md", "utf8");
    for (const topic of ["npm run build", "Amplify", "Cache-Control", "noindex"]) {
      expect(rb, `RUNBOOK should cover ${topic}`).toContain(topic);
    }
  });

  // 238MB of Commons originals were committed once, before .gitignore existed,
  // and only caught by chance. This is the guard so it cannot recur. It asks
  // git what is TRACKED - photo-library/ originals are meant to sit on disk,
  // regenerable via `npm run photos:source`.
  test("no full-resolution original is committed to the repo", async () => {
    const { execSync } = await import("node:child_process");
    const tracked = execSync("git ls-files", { encoding: "utf8" })
      .split("\n")
      .filter(Boolean);

    const heavy = tracked
      .filter((f) => existsSync(f))
      .map((f) => ({ f, size: statSync(f).size }))
      .filter(({ size }) => size > 2_000_000);

    expect(
      heavy.map(({ f, size }) => `${f} (${Math.round(size / 1e6)}MB)`),
      "tracked files over 2MB",
    ).toEqual([]);
  });
});

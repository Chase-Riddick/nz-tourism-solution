import { test, expect } from "@playwright/test";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

/**
 * CONTEXT.md invariant 6: no fact lives outside constants.ts / catalog.ts.
 *
 * This is the guard that stops a price drifting between the homepage, a tour
 * card and the FAQ. It is the one spec that reads source rather than rendered
 * output — because "the same number appears in three templates" is invisible
 * from the browser until one of them is wrong.
 */
const SOURCE_OF_TRUTH = ["src/lib/constants.ts", "src/lib/catalog.ts"];

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

test.describe("source hygiene", () => {
  test("no NZD price is hardcoded outside the catalogue", async () => {
    const offenders: string[] = [];

    for (const file of walk("src")) {
      if (SOURCE_OF_TRUTH.includes(file)) continue;
      if (!/\.(astro|ts)$/.test(file)) continue;

      readFileSync(file, "utf8").split("\n").forEach((line, i) => {
        const stripped = line.replace(/\/\/.*$/, "");
        // A literal dollar amount of 2+ digits. Template output like {nzd(x)}
        // is fine; "$545" written into a template is not.
        if (/\$\d{2,}/.test(stripped)) {
          offenders.push(`${file}:${i + 1}  ${line.trim()}`);
        }
      });
    }

    expect(offenders, `prices must come from the catalogue:\n${offenders.join("\n")}`)
      .toEqual([]);
  });

  test("the maximum group size is never written as a bare number in a template", async () => {
    const offenders: string[] = [];

    for (const file of walk("src")) {
      if (SOURCE_OF_TRUTH.includes(file)) continue;
      if (!/\.astro$/.test(file)) continue;

      readFileSync(file, "utf8").split("\n").forEach((line, i) => {
        if (/(maximum|max\.?)\s+8\b/i.test(line)) {
          offenders.push(`${file}:${i + 1}  ${line.trim()}`);
        }
      });
    }

    expect(offenders, `use MAX_GROUP:\n${offenders.join("\n")}`).toEqual([]);
  });
});

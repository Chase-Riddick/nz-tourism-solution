// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// Static output only. AGENTS.md rule 2: no SSR, no adapter, no host config.
// Amplify auto-detects Astro; never add amplify.yml here.
//
// NOTE: `site` and the sitemap/robots posture belong in src/lib/constants.ts as
// the single source of truth. That module arrives with the first tracer-bullet
// slice, which also re-wires this file to import from it. Until then the origin
// is inline so the toolchain runs.
export default defineConfig({
  site: "https://slownorth.claralabs.tech",
  trailingSlash: "ignore",
  build: { format: "directory" },
  vite: { plugins: [tailwindcss()] },
});

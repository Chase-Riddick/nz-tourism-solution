// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

import { SITE } from "./src/lib/constants.ts";

// Static output only. AGENTS.md rule 2: no SSR, no adapter, no host config.
// Amplify auto-detects Astro; never add amplify.yml here.
export default defineConfig({
  site: SITE.url,
  trailingSlash: "ignore",
  build: { format: "directory" },
  // The site is noindex by policy (AGENTS.md rule 4), so a sitemap would be
  // pointless at best. It stays wired but disabled, so re-enabling is one flag
  // if this ever becomes a real, indexable business.
  integrations: SITE.indexable ? [sitemap({ i18n: { defaultLocale: "en", locales: { en: "en-NZ", de: "de-DE" } } })] : [],
  vite: { plugins: [tailwindcss()] },
});

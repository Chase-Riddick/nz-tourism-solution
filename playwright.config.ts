import { defineConfig, devices } from "@playwright/test";

/**
 * The harness runs against the BUILT site in `dist/`, never a dev server.
 * `npm test` builds first, so a spec cannot pass against stale output.
 *
 * One seam (see PRD #1): everything worth guaranteeing here is observable in
 * rendered output, so there is no second unit-test seam asserting the shape of
 * internal data.
 *
 * storageState pre-declines analytics consent. The banner is fixed to the
 * bottom of the viewport on first visit and would otherwise intercept clicks
 * across every spec. The consent spec clears this to test the banner itself.
 */
const CONSENT_KEY = "sn-consent";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : [["list"]],
  use: {
    baseURL: "http://localhost:4321",
    trace: "on-first-retry",
    storageState: {
      cookies: [],
      origins: [
        {
          origin: "http://localhost:4321",
          localStorage: [
            { name: CONSENT_KEY, value: JSON.stringify({ choice: "decline", at: Date.now() }) },
          ],
        },
      ],
    },
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    // Builds before serving. Without this, `npx playwright test` runs against a
    // stale dist/ and the suite silently lies - a guard verified that way looks
    // green while the source it guards is already broken. Found the hard way
    // on #5: an injected raw-key regression "passed" because dist/ predated it.
    command: "npm run build && npx http-server dist -p 4321 --silent -c-1",
    url: "http://localhost:4321",
    // Never reuse: a leftover server from a previous run would serve a stale
    // dist/ and skip the rebuild above, reintroducing the exact footgun.
    reuseExistingServer: false,
    timeout: 120_000,
  },
});

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
    command: "npx http-server dist -p 4321 --silent -c-1",
    url: "http://localhost:4321",
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});

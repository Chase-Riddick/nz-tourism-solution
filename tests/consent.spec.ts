import { test, expect } from "@playwright/test";

/**
 * The rest of the suite browses as a visitor who already declined, because the
 * banner is fixed to the viewport and would intercept clicks everywhere. These
 * specs clear that state to test the banner itself.
 */
test.use({ storageState: { cookies: [], origins: [] } });

test.describe("analytics consent", () => {
  test("a first-time visitor is asked before anything is loaded", async ({ page }) => {
    const googleRequests: string[] = [];
    page.on("request", (r) => {
      if (/googletagmanager|google-analytics|doubleclick/.test(r.url())) {
        googleRequests.push(r.url());
      }
    });

    await page.goto("/");
    await expect(page.locator("#consent-banner")).toBeVisible();

    // Strictest posture: no script, no cookie, no request to Google of any kind
    // before an explicit yes. Deliberately not Consent Mode "advanced", whose
    // cookieless pings still reach Google before consent.
    expect(googleRequests, "nothing may reach Google before consent").toEqual([]);
    const cookies = await page.context().cookies();
    expect(cookies.filter((c) => c.name.startsWith("_ga"))).toEqual([]);
  });

  test("declining is offered as plainly as accepting", async ({ page }) => {
    await page.goto("/");
    const banner = page.locator("#consent-banner");
    await expect(banner.locator("[data-consent='accept']")).toBeVisible();
    await expect(banner.locator("[data-consent='decline']")).toBeVisible();
  });
});

test.describe("the choice persists and can be changed", () => {
  test("declining hides the banner and it stays hidden on the next visit", async ({ page }) => {
    await page.goto("/");
    await page.locator("[data-consent='decline']").click();
    await expect(page.locator("#consent-banner")).toBeHidden();

    await page.goto("/tours");
    await expect(page.locator("#consent-banner")).toBeHidden();
  });

  test("accepting is remembered too", async ({ page }) => {
    await page.goto("/");
    await page.locator("[data-consent='accept']").click();
    await expect(page.locator("#consent-banner")).toBeHidden();

    await page.goto("/tours");
    await expect(page.locator("#consent-banner")).toBeHidden();
  });

  // GDPR: withdrawing consent must be as easy as giving it.
  test("a visitor who already chose can reopen the banner from the footer", async ({ page }) => {
    await page.goto("/");
    await page.locator("[data-consent='decline']").click();
    await expect(page.locator("#consent-banner")).toBeHidden();

    await page.getByRole("contentinfo").locator("[data-consent-open]").click();
    await expect(page.locator("#consent-banner")).toBeVisible();
  });

  // The measurement id is a placeholder, so consent must remain inert.
  test("accepting loads no script while the measurement id is a placeholder", async ({ page }) => {
    const googleRequests: string[] = [];
    page.on("request", (r) => {
      if (/googletagmanager|google-analytics/.test(r.url())) googleRequests.push(r.url());
    });

    await page.goto("/");
    await page.locator("[data-consent='accept']").click();
    await page.waitForTimeout(500);
    expect(googleRequests, "placeholder id must load nothing").toEqual([]);
  });
});

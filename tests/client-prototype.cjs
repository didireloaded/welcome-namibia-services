const { chromium } = require("@playwright/test");
const assert = require("node:assert/strict");
(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  });
  try {
    const page = await browser.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("http://localhost:3000/booking");
    await page
      .getByLabel("Full name", { exact: true })
      .fill("Sample Traveller");
    await page
      .getByLabel("Email address", { exact: true })
      .fill("sample@example.com");
    const future = new Date();
    future.setUTCDate(future.getUTCDate() + 7);
    while ([0, 6].includes(future.getUTCDay()))
      future.setUTCDate(future.getUTCDate() + 1);
    await page
      .getByLabel("Preferred weekday")
      .fill(future.toISOString().slice(0, 10));
    await page
      .getByRole("button", { name: "Reserve sample consultation" })
      .click();
    await page
      .getByRole("button", { name: "Reschedule", exact: true })
      .waitFor();
    await page.getByRole("button", { name: "Reschedule", exact: true }).click();
    await page.getByLabel("Available time").selectOption("14:00");
    await page.getByRole("button", { name: "Save new time" }).click();
    await page.reload();
    await page
      .getByText(`${future.toISOString().slice(0, 10)} at 14:00`, {
        exact: true,
      })
      .waitFor();
    await page.goto("http://localhost:3000/client");
    await page.getByRole("button", { name: "Documents", exact: true }).click();
    await page.getByLabel("Travel preparation checklist").check();
    await page.getByRole("button", { name: "Quotation", exact: true }).click();
    assert.equal(
      await page
        .getByRole("button", { name: "Accept sample quote" })
        .isDisabled(),
      true,
    );
    await page.getByLabel("I have reviewed the scope").check();
    await page.getByRole("button", { name: "Accept sample quote" }).click();
    await page.getByText("Accepted", { exact: true }).waitFor();
    await page.reload();
    await page.getByRole("button", { name: "Quotation", exact: true }).click();
    await page.getByText("Accepted", { exact: true }).waitFor();
    await page.evaluate(() =>
      localStorage.setItem(
        "welcome-namibia-prepared-requests-v1",
        JSON.stringify([
          {
            reference: "WN-TEST",
            createdAt: new Date().toISOString(),
            name: "Sample Traveller",
            summary: "Fictional arrival enquiry.",
          },
        ]),
      ),
    );
    await page.reload();
    await page.getByRole("button", { name: "Updates", exact: true }).click();
    await page
      .getByRole("button", { name: "Simulate delivery & acknowledgement" })
      .click();
    await page
      .getByText(
        "Simulated delivery and acknowledgement ready. No email was sent.",
        { exact: true },
      )
      .waitFor();
    await page
      .getByRole("button", { name: "Consultation", exact: true })
      .click();
    await page
      .getByRole("button", { name: "Cancel consultation", exact: true })
      .click();
    await page
      .getByRole("button", { name: "Reserve sample consultation" })
      .waitFor();
    for (const route of ["/client", "/booking", "/legal", "/contact"]) {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto("http://localhost:3000" + route);
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
        route + " overflow",
      );
    }
    assert.deepEqual(errors, []);
    console.log(
      "PASS: booking, rescheduling, cancellation, checklist, quote acceptance, simulated delivery, refresh persistence and mobile layout.",
    );
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

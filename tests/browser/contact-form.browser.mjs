/**
 * The contact form in a real browser, against a running copy of the site.
 *
 *   npm run test:browser                                  # http://localhost:3002
 *   BASE_URL=https://troop-2394.vercel.app npm run test:browser
 *
 * Every /api/contact request is answered inside the browser by page.route, so
 * nothing reaches a server and nothing is emailed; that is also what makes it
 * safe to point at production. Drives the installed Google Chrome, so there is
 * no browser to download.
 *
 * The regression it exists for: Vercel's firewall answered a rate-limited
 * submission with { error: { code, message, id } }, the form rendered that
 * object, and React error #31 took the page down.
 */
import { after, before, beforeEach, describe, test } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright-core";

const BASE = (process.env.BASE_URL ?? "http://localhost:3002").replace(/\/$/, "");

const typed = {
  name: "Test Adult",
  email: "adult.tester@example.org",
  message: "[WEBSITE TEST] Browser regression test. No action needed.",
};

let browser;
let page;
let pageErrors;
let posts;

before(async () => {
  browser = await chromium.launch({ channel: "chrome", headless: true });
});

after(async () => {
  await browser?.close();
});

beforeEach(async () => {
  page = await browser.newPage();
  pageErrors = [];
  posts = 0;
  page.setDefaultTimeout(10_000);
  page.on("pageerror", (err) => pageErrors.push(err.message));
  await page.goto(`${BASE}/contact`, { waitUntil: "networkidle" });
  // Filling a controlled input before React hydrates loses the value.
  await page.waitForFunction(() => {
    const el = document.getElementById("cf-name");
    return !!el && Object.keys(el).some((k) => k.startsWith("__reactFiber"));
  });
  await page.fill("#cf-name", typed.name);
  await page.fill("#cf-email", typed.email);
  await page.fill("#cf-message", typed.message);
});

/** Answers the form's POST with exactly this response. */
async function respond(status, body, contentType = "application/json") {
  await page.route("**/api/contact", async (route) => {
    posts += 1;
    await route.fulfill({
      status,
      contentType,
      body: typeof body === "string" ? body : JSON.stringify(body),
    });
  });
}

async function submit() {
  await page.click("form button[type=submit]");
  await page.waitForFunction(() => {
    const btn = document.querySelector("form button[type=submit]");
    return btn && !btn.disabled;
  });
}

async function assertFailedSafely(expected) {
  const alert = await page.locator("form [role=alert]").innerText();
  assert.match(alert, expected);
  assert.doesNotMatch(alert, /\[object Object\]/);
  assert.equal(pageErrors.length, 0, `page threw: ${pageErrors.join(" | ")}`);
  // The page is still standing, and nothing the visitor typed was lost.
  assert.equal(await page.locator("h1", { hasText: "Contact Us" }).count(), 1);
  assert.equal(await page.inputValue("#cf-name"), typed.name);
  assert.equal(await page.inputValue("#cf-email"), typed.email);
  assert.equal(await page.inputValue("#cf-message"), typed.message);
  assert.equal(await page.locator("form [role=status]").innerText(), "");
}

describe(`contact form at ${BASE}`, () => {
  test("missing mail credentials: says it was not sent and keeps the fields", async () => {
    // The body production returns when GMAIL_APP_PASSWORD is not set.
    await respond(503, {
      error:
        "The online form is not connected to email right now, so your message was not sent. Please email troop394sc@gmail.com instead.",
      code: "not_configured",
      requestId: "b4b5b4b5-f08c-4b51-9a53-1fe10f88e1fa",
    });
    await submit();
    await assertFailedSafely(/not connected to email.*not sent/);
    assert.equal(posts, 1);
  });

  test("firewall 429 with an error object: no crash, a sentence, fields kept", async () => {
    await respond(429, {
      error: { code: "429", message: "Too Many Requests", id: "sfo1::ggj7w-1792469558750-88ed667963c7" },
    });
    await submit();
    await assertFailedSafely(/a lot of messages/);
  });

  test("an HTML error page from the platform: generic failure, fields kept", async () => {
    await respond(502, "<html><body>Bad Gateway</body></html>", "text/html");
    await submit();
    await assertFailedSafely(/did not send/);
  });

  test("provider accepted: success text, fields cleared, one POST for a double click", async () => {
    await respond(200, { ok: true, acknowledged: true, requestId: "test" });
    await page.dblclick("form button[type=submit]");
    await page.locator("form [role=status]", { hasText: "submitted to the troop" }).waitFor();
    assert.equal(posts, 1);
    assert.equal(await page.inputValue("#cf-message"), "");
    assert.equal(pageErrors.length, 0);
  });
});

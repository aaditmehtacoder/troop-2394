/**
 * apiErrorText must hand the UI a string whatever the server sent, because an
 * object in JSX is React error #31 and takes the page down.
 */
import { test } from "node:test";
import assert from "node:assert/strict";

const { apiErrorText } = await import("../src/lib/api-error.ts");

const messages = { fallback: "FALLBACK", rateLimited: "SLOW DOWN" };

test("our route's string error passes through", () => {
  assert.equal(apiErrorText({ error: "That email address does not look right." }, 400, messages),
    "That email address does not look right.");
});

test("Vercel's firewall 429 object becomes the rate-limit sentence", () => {
  // The exact shape production returned on 2026-10-20.
  const body = { error: { code: "429", message: "Too Many Requests", id: "sfo1::ggj7w-1792469558750" } };
  assert.equal(apiErrorText(body, 429, messages), "SLOW DOWN");
});

test("any other non-string body falls back to a sentence", () => {
  for (const body of [null, undefined, "plain text", 42, [], { error: null }, { error: ["x"] }, { error: "   " }]) {
    const out = apiErrorText(body, 500, messages);
    assert.equal(typeof out, "string");
    assert.equal(out, "FALLBACK");
  }
});

test("a very long string is clipped", () => {
  assert.equal(apiErrorText({ error: "x".repeat(5000) }, 400, messages).length, 400);
});

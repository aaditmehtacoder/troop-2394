/**
 * The contact route, end to end, with the mail provider faked.
 *
 *   npm test
 *
 * Every send goes through a stubbed `fetch` standing in for Resend, so nothing
 * here emails anyone. The point is the one thing that went wrong before: the
 * visitor must never be told "submitted" unless a provider accepted the message.
 */
import { afterEach, beforeEach, describe, test } from "node:test";
import assert from "node:assert/strict";

const { POST } = await import("../src/app/api/contact/route.ts");
const { gmailOutcome } = await import("../src/lib/email/index.ts");

const realFetch = globalThis.fetch;
let calls;
let ip = 0;

/** Each test gets its own address, so the per-IP limiter never interferes. */
function request(body, init = {}) {
  ip += 1;
  const raw = typeof body === "string" ? body : JSON.stringify(body);
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": `198.51.100.${ip}` },
    body: raw,
    ...init,
  });
}

const valid = {
  name: "Test Adult",
  email: "adult.tester@example.org",
  scoutAge: "",
  topic: "Visiting a meeting",
  message: "Hello <script>alert(1)</script>\n\nCould we visit on Tuesday?",
};

/** Answers every Resend call with the given behaviour and records the payloads. */
function provider(answer) {
  globalThis.fetch = async (url, init) => {
    calls.push({ url: String(url), body: JSON.parse(init.body) });
    return answer();
  };
}

const accepted = () => Response.json({ id: `msg_${calls.length}` });

beforeEach(() => {
  calls = [];
  delete process.env.GMAIL_USER;
  delete process.env.GMAIL_APP_PASSWORD;
  delete process.env.RECAPTCHA_SECRET_KEY;
  process.env.RESEND_API_KEY = "re_test_not_real";
  process.env.CONTACT_TO = "lead@example.org, troop@example.org";
});

afterEach(() => {
  globalThis.fetch = realFetch;
});

describe("POST /api/contact", () => {
  test("a valid message goes to CONTACT_TO with the visitor as Reply-To, then is acknowledged", async () => {
    provider(accepted);
    const res = await POST(request(valid));
    const data = await res.json();

    assert.equal(res.status, 200);
    assert.equal(data.ok, true);
    assert.equal(data.acknowledged, true);
    assert.match(data.requestId, /^[0-9a-f-]{36}$/);

    const [enquiry, ack] = calls;
    assert.deepEqual(enquiry.body.to, ["lead@example.org", "troop@example.org"]);
    assert.equal(enquiry.body.reply_to, valid.email);
    assert.doesNotMatch(enquiry.body.from, /adult\.tester/);
    assert.ok(enquiry.body.html.includes("&lt;script&gt;"), "visitor text is escaped in HTML");
    assert.ok(!enquiry.body.html.includes("<script>"));

    assert.deepEqual(ack.body.to, [valid.email]);
    assert.ok(!ack.body.text.includes("Could we visit"), "the acknowledgement does not echo the message");
  });

  test("without CONTACT_TO, enquiries go to the troop's public address", async () => {
    delete process.env.CONTACT_TO;
    provider(accepted);
    await POST(request(valid));
    assert.deepEqual(calls[0].body.to, ["troop394sc@gmail.com"]);
  });

  test("missing fields and a bad address are refused before anything is sent", async () => {
    provider(accepted);
    for (const body of [{ ...valid, message: "  " }, { ...valid, email: "not-an-address" }]) {
      const res = await POST(request(body));
      assert.equal(res.status, 400);
      assert.equal((await res.json()).ok, undefined);
    }
    assert.equal(calls.length, 0);
  });

  test("a line break in a header field is refused, not tidied", async () => {
    provider(accepted);
    const res = await POST(request({ ...valid, name: "Test\r\nBcc: victim@example.org" }));
    assert.equal(res.status, 400);
    assert.equal(calls.length, 0);
  });

  test("an oversized body is refused", async () => {
    provider(accepted);
    const res = await POST(request({ ...valid, message: "x".repeat(20_000) }));
    assert.equal(res.status, 413);
    assert.equal(calls.length, 0);
  });

  test("an unknown topic is replaced with one the troop wrote", async () => {
    provider(accepted);
    await POST(request({ ...valid, topic: "FREE PRIZES" }));
    assert.match(calls[0].body.subject, /Something else/);
    assert.doesNotMatch(calls[0].body.subject, /PRIZES/);
  });

  test("the honeypot looks like success to a bot and sends nothing", async () => {
    provider(accepted);
    const res = await POST(request({ ...valid, website: "https://spam.example" }));
    assert.equal(res.status, 200);
    assert.equal(calls.length, 0);
  });

  test("with no provider configured it says so: 503, not success", async () => {
    delete process.env.RESEND_API_KEY;
    provider(accepted);
    const res = await POST(request(valid));
    const data = await res.json();
    assert.equal(res.status, 503);
    assert.equal(data.code, "not_configured");
    assert.equal(data.ok, undefined);
    assert.match(data.error, /not sent/);
    assert.equal(calls.length, 0);
  });

  test("a provider rejection is a failure even though fetch resolved", async () => {
    provider(() => Response.json({ name: "validation_error", message: "nope" }, { status: 422 }));
    const res = await POST(request(valid));
    const data = await res.json();
    assert.equal(res.status, 502);
    assert.equal(data.ok, undefined);
    assert.equal(calls.length, 1, "no acknowledgement for a message that did not send");
  });

  test("a 200 without a message id is not an acceptance", async () => {
    provider(() => Response.json({}));
    const res = await POST(request(valid));
    assert.equal(res.status, 502);
  });

  test("a network error is a failure", async () => {
    provider(() => {
      throw new TypeError("fetch failed");
    });
    const res = await POST(request(valid));
    assert.equal(res.status, 502);
    assert.equal((await res.json()).code, "send_failed");
  });

  test("a timeout is reported as uncertain and is not retried", async () => {
    provider(() => {
      throw new DOMException("The operation timed out.", "TimeoutError");
    });
    const res = await POST(request(valid));
    const data = await res.json();
    assert.equal(res.status, 504);
    assert.equal(data.code, "uncertain");
    assert.match(data.error, /could not confirm/i);
    assert.equal(calls.length, 1);
  });

  test("a failed acknowledgement still reports the enquiry as submitted", async () => {
    provider(() => (calls.length === 1 ? accepted() : Response.json({ name: "x" }, { status: 500 })));
    const res = await POST(request(valid));
    const data = await res.json();
    assert.equal(res.status, 200);
    assert.equal(data.acknowledged, false);
  });
});

describe("gmailOutcome", () => {
  test("no accepted recipients is a failure", () => {
    assert.equal(gmailOutcome({ messageId: "<a@b>", accepted: [], rejected: ["x@y.z"] }).ok, false);
  });
  test("an accepted recipient carries the message id through", () => {
    assert.deepEqual(gmailOutcome({ messageId: "<a@b>", accepted: ["x@y.z"], rejected: [] }), {
      ok: true,
      provider: "gmail",
      messageId: "<a@b>",
    });
  });
});

import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { rateLimit } from "@/lib/rate-limit";
import { buildKnowledge, SYSTEM_PROMPT } from "@/lib/chat/knowledge";
import { offlineAnswer } from "@/lib/chat/offline";

/**
 * "Ask the Troop" chat endpoint.
 *
 * The API key stays on the server and is never sent to the browser. Every
 * request is rate limited per IP on two windows (a burst limit and a daily
 * limit) so a stuck loop or a scraper cannot run up a bill. If no key is set,
 * or the provider fails, the endpoint still answers from the site's own facts.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PER_MINUTE = Number(process.env.CHAT_LIMIT_PER_MINUTE ?? 6);
const PER_DAY = Number(process.env.CHAT_LIMIT_PER_DAY ?? 60);
const MAX_CHARS = Number(process.env.CHAT_MAX_CHARS ?? 800);

/** Keep the conversation short: cost is linear in history length. */
const MAX_TURNS = 8;
const TIMEOUT_MS = 20_000;
const MAX_OUTPUT_TOKENS = 400;

type Turn = { role: "user" | "assistant"; content: string };

async function clientKey(): Promise<string> {
  const h = await headers();
  return (
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "local"
  );
}

export async function POST(request: Request) {
  const ip = await clientKey();

  const burst = rateLimit(`chat:min:${ip}`, PER_MINUTE, 60_000);
  if (!burst.ok) {
    return NextResponse.json(
      { error: `That is a lot of questions at once. Try again in ${burst.retryAfterSeconds} seconds.` },
      { status: 429, headers: { "Retry-After": String(burst.retryAfterSeconds) } },
    );
  }

  const daily = rateLimit(`chat:day:${ip}`, PER_DAY, 24 * 60 * 60_000);
  if (!daily.ok) {
    return NextResponse.json(
      {
        error:
          "You have reached today's limit for the assistant. The Scoutmaster's phone and email are on the contact page, and visitors are welcome at any Tuesday meeting.",
      },
      { status: 429, headers: { "Retry-After": String(daily.retryAfterSeconds) } },
    );
  }

  let body: { message?: unknown; history?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Could not read that request." }, { status: 400 });
  }

  const message = String(body.message ?? "").trim();
  if (!message) {
    return NextResponse.json({ error: "Ask a question and I will do my best." }, { status: 400 });
  }
  if (message.length > MAX_CHARS) {
    return NextResponse.json(
      { error: `Please keep questions under ${MAX_CHARS} characters.` },
      { status: 400 },
    );
  }

  const history: Turn[] = Array.isArray(body.history)
    ? (body.history as Turn[])
        .filter((t) => t && (t.role === "user" || t.role === "assistant") && typeof t.content === "string")
        .slice(-MAX_TURNS)
        .map((t) => ({ role: t.role, content: String(t.content).slice(0, MAX_CHARS) }))
    : [];

  const system = SYSTEM_PROMPT + (await buildKnowledge());

  const openaiKey = process.env.OPENAI_API_KEY;
  const anthropicKey = process.env.ANTHROPIC_API_KEY;

  try {
    if (openaiKey) {
      const reply = await askOpenAI(openaiKey, system, history, message);
      if (reply) return NextResponse.json({ reply, source: "model" });
    } else if (anthropicKey) {
      const reply = await askAnthropic(anthropicKey, system, history, message);
      if (reply) return NextResponse.json({ reply, source: "model" });
    }
  } catch {
    // Fall through to the offline answer rather than showing an error.
  }

  return NextResponse.json({ reply: offlineAnswer(message), source: "offline" });
}

/* ---------------------------------------------------------------- OpenAI -- */

async function askOpenAI(
  key: string,
  system: string,
  history: Turn[],
  message: string,
): Promise<string | null> {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    signal: AbortSignal.timeout(TIMEOUT_MS),
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      max_tokens: MAX_OUTPUT_TOKENS,
      temperature: 0.3,
      messages: [
        { role: "system", content: system },
        ...history,
        { role: "user", content: message },
      ],
    }),
  });

  if (!res.ok) return null;
  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content;
  return typeof text === "string" && text.trim() ? text.trim() : null;
}

/* ------------------------------------------------------------- Anthropic -- */

async function askAnthropic(
  key: string,
  system: string,
  history: Turn[],
  message: string,
): Promise<string | null> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": key,
      "anthropic-version": "2023-06-01",
      "Content-Type": "application/json",
    },
    signal: AbortSignal.timeout(TIMEOUT_MS),
    body: JSON.stringify({
      model: "claude-sonnet-5",
      max_tokens: MAX_OUTPUT_TOKENS,
      system,
      messages: [...history, { role: "user", content: message }],
    }),
  });

  if (!res.ok) return null;
  const data = await res.json();
  const text = data?.content?.[0]?.text;
  return typeof text === "string" && text.trim() ? text.trim() : null;
}

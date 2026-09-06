"use client";

import { useEffect, useRef, useState } from "react";

type Turn = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "When do you meet?",
  "What does it cost?",
  "What should we bring on a first campout?",
  "Can my daughter join?",
];

/** A small ask-anything helper, pinned bottom right on every page. */
export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [turns, busy]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Escape closes the panel.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function send(text: string) {
    const question = text.trim();
    if (!question || busy) return;

    setError(null);
    setInput("");
    const next = [...turns, { role: "user" as const, content: question }];
    setTurns(next);
    setBusy(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question, history: turns.slice(-8) }),
      });
      const data = await res.json();

      if (!res.ok) setError(data.error ?? "Something went wrong. Try again in a moment.");
      else setTurns([...next, { role: "assistant", content: data.reply }]);
    } catch {
      setError("Could not reach the troop assistant. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="troop-chat"
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-navy text-white shadow-xl transition hover:bg-navy-dark focus:outline-none focus:ring-4 focus:ring-blue/35 print:hidden"
      >
        <span className="sr-only">{open ? "Close the troop assistant" : "Ask the troop a question"}</span>
        {open ? <CloseIcon /> : <ChatIcon />}
      </button>

      {open ? (
        <div
          id="troop-chat"
          role="dialog"
          aria-label="Ask the troop"
          className="fixed bottom-24 right-5 z-50 flex max-h-[min(560px,calc(100vh-140px))] w-[min(380px,calc(100vw-40px))] flex-col overflow-hidden rounded-2xl border border-hair bg-white shadow-2xl print:hidden"
        >
          <header className="bg-navy px-5 py-4">
            <p className="m-0 font-slab text-[15px] font-bold uppercase tracking-[0.8px] text-white">
              Ask the troop
            </p>
            <p className="m-0 mt-0.5 text-[13px] text-white/75">
              Questions about joining, meetings, or camp.
            </p>
          </header>

          <div ref={logRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {turns.length === 0 ? (
              <div>
                <p className="mt-0 mb-3 text-[14px] leading-6 text-mute">
                  Ask anything about Troop 2/394. For anything it cannot answer, it will point you
                  to a real leader.
                </p>
                <ul className="m-0 list-none space-y-2 p-0">
                  {SUGGESTIONS.map((s) => (
                    <li key={s}>
                      <button
                        type="button"
                        onClick={() => void send(s)}
                        className="w-full rounded-lg border border-hair px-3 py-2 text-left text-[14px] text-slate transition hover:border-blue/50 hover:bg-shell"
                      >
                        {s}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              turns.map((t, i) => (
                <div
                  key={i}
                  className={[
                    "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[14.5px] leading-6",
                    t.role === "user"
                      ? "ml-auto bg-navy text-white"
                      : "mr-auto bg-shell text-ink",
                  ].join(" ")}
                >
                  {t.content}
                </div>
              ))
            )}

            {busy ? (
              <div className="mr-auto flex gap-1.5 rounded-2xl bg-shell px-3.5 py-3">
                <Dot /> <Dot delay="150ms" /> <Dot delay="300ms" />
              </div>
            ) : null}

            {error ? (
              <p className="m-0 rounded-lg bg-red/10 px-3 py-2 text-[13.5px] leading-6 text-red">
                {error}
              </p>
            ) : null}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              void send(input);
            }}
            className="flex items-center gap-2 border-t border-hair p-3"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={800}
              placeholder="Type your question"
              aria-label="Your question"
              className="min-w-0 flex-1 rounded-lg border border-hair px-3 py-2.5 text-[14.5px] focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/25"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              className="rounded-lg bg-navy px-4 py-2.5 font-slab text-[13px] font-bold uppercase tracking-[0.8px] text-white transition hover:bg-navy-dark disabled:opacity-40"
            >
              Ask
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
}

function Dot({ delay = "0ms" }: { delay?: string }) {
  return (
    <span
      className="h-1.5 w-1.5 animate-bounce rounded-full bg-mute/60"
      style={{ animationDelay: delay }}
    />
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6" aria-hidden>
      <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-3.6-.7L3 21l1.9-5A8.3 8.3 0 0 1 4 11.5a8.4 8.4 0 0 1 9-8.4 8.4 8.4 0 0 1 8 8.4Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6" aria-hidden>
      <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
    </svg>
  );
}

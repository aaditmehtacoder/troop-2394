/**
 * Turns whatever an API answered into one line of text that is safe to render.
 *
 * The site's own routes answer `{ error: "a sentence" }`, but a request can be
 * answered before it ever reaches them. Vercel's firewall, for one, replies to
 * a rate-limited request with `{ error: { code, message, id } }`. Handing that
 * object to JSX is React error #31, and without an error boundary it takes the
 * whole page down. So only a string is ever passed through; anything else gets
 * a sentence chosen by status.
 */
const MAX_LENGTH = 400;

export function apiErrorText(
  body: unknown,
  status: number,
  messages: { fallback: string; rateLimited: string },
): string {
  const error = body && typeof body === "object" ? (body as { error?: unknown }).error : undefined;
  if (typeof error === "string" && error.trim()) return error.trim().slice(0, MAX_LENGTH);
  if (status === 429) return messages.rateLimited;
  return messages.fallback;
}

import { cookies } from "next/headers";
import { createToken, readToken } from "./crypto";
import { findById, getSessionSecret, type PublicUser, toPublic } from "./store";

export const SESSION_COOKIE = "t394_session";

/** Sessions last two weeks. */
const MAX_AGE_SECONDS = 60 * 60 * 24 * 14;

export async function startSession(userId: string): Promise<void> {
  const secret = await getSessionSecret();
  const token = createToken({ uid: userId, exp: Date.now() + MAX_AGE_SECONDS * 1000 }, secret);

  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true, // not readable from JavaScript
    sameSite: "lax", // survives normal navigation, blocks cross-site POSTs
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function endSession(): Promise<void> {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
}

/**
 * The authoritative "who is asking" check. Reads the signed cookie, then loads
 * the user fresh from the store — so a revoked or demoted account loses access
 * immediately rather than at the end of its session.
 */
export async function getCurrentUser(): Promise<PublicUser | null> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const secret = await getSessionSecret();
  const payload = readToken(token, secret);
  if (!payload) return null;

  const user = await findById(payload.uid);
  return user ? toPublic(user) : null;
}

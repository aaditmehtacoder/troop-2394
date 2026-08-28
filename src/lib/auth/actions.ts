"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { verifyPassword } from "./crypto";
import { clearLimit, rateLimit } from "./rate-limit";
import { endSession, getCurrentUser, startSession } from "./session";
import {
  canAccessDashboard,
  createUser,
  findByEmail,
  isAdmin,
  setRole,
  touchLogin,
  type Role,
} from "./store";

export type FormState = { error?: string; notice?: string } | null;

/**
 * A syntactically valid hash to compare against when no account matches, so
 * login timing does not reveal whether an email is registered. The 16-byte
 * salt and 64-byte digest match what hashPassword produces.
 */
const DECOY_HASH = `scrypt$64$${Buffer.alloc(16).toString("base64")}$${Buffer.alloc(64).toString("base64")}`;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MIN_PASSWORD = 10;

async function clientKey(suffix: string): Promise<string> {
  const h = await headers();
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "local";
  return `${ip}:${suffix}`;
}

const str = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();

/* ------------------------------- sign up -------------------------------- */

export async function signupAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const name = str(formData, "name");
  const email = str(formData, "email");
  const relationship = str(formData, "relationship");
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");

  if (!name || name.length < 2) return { error: "Please enter your full name." };
  if (name.length > 80) return { error: "That name is too long." };
  if (!EMAIL_RE.test(email)) return { error: "Please enter a valid email address." };
  if (email.length > 160) return { error: "That email address is too long." };
  if (!relationship) return { error: "Please tell us how you're connected to the troop." };
  if (password.length < MIN_PASSWORD) {
    return { error: `Your password needs at least ${MIN_PASSWORD} characters.` };
  }
  if (password.length > 200) return { error: "That password is too long." };
  if (password !== confirm) return { error: "The two passwords don't match." };

  const limit = rateLimit(await clientKey("signup"), 5, 60 * 60 * 1000);
  if (!limit.ok) {
    return { error: "Too many accounts requested from here. Please try again later." };
  }

  const result = await createUser({ name, email, relationship, password });
  if (!result.ok) return { error: result.error };

  // The first account bootstraps as admin and is signed straight in; everyone
  // after that waits for a leader to approve them.
  if (result.user.role === "admin") {
    await startSession(result.user.id);
    redirect("/dashboard?welcome=admin");
  }

  redirect("/login?pending=1");
}

/* -------------------------------- log in -------------------------------- */

export async function loginAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const email = str(formData, "email");
  const password = String(formData.get("password") ?? "");
  const next = str(formData, "next");

  if (!email || !password) return { error: "Enter your email and password." };

  // Two windows: a tight one per email, a looser one per address, so one
  // person fat-fingering their password doesn't lock out a whole household.
  const byEmail = rateLimit(`email:${email.toLowerCase()}`, 8, 15 * 60 * 1000);
  const byIp = rateLimit(await clientKey("login"), 30, 15 * 60 * 1000);
  if (!byEmail.ok || !byIp.ok) {
    const wait = !byEmail.ok ? byEmail.retryAfterSeconds : (byIp as { retryAfterSeconds: number }).retryAfterSeconds;
    return { error: `Too many attempts. Try again in about ${Math.ceil(wait / 60)} minutes.` };
  }

  const user = await findByEmail(email);

  // Always run a real scrypt comparison so a missing account and a wrong
  // password take roughly the same time, and give the same message either way.
  // The decoy's digest must be exactly KEYLEN bytes, or verifyPassword bails
  // out on the length check and never does the work.
  const ok = user
    ? await verifyPassword(password, user.passwordHash)
    : await verifyPassword(password, DECOY_HASH);

  if (!user || !ok) return { error: "That email and password don't match." };

  if (!canAccessDashboard(user.role)) {
    return {
      error:
        "Your account is waiting for a troop leader to approve it. We'll email you once it's active.",
    };
  }

  clearLimit(`email:${email.toLowerCase()}`);
  await touchLogin(user.id);
  await startSession(user.id);

  // Only ever redirect to a path on this site.
  const safeNext = next.startsWith("/") && !next.startsWith("//") ? next : "/dashboard";
  redirect(safeNext);
}

/* -------------------------------- log out ------------------------------- */

export async function logoutAction(): Promise<void> {
  await endSession();
  redirect("/login?signedout=1");
}

/* ---------------------------- admin: approvals -------------------------- */

export async function updateRoleAction(formData: FormData): Promise<void> {
  const actor = await getCurrentUser();
  if (!actor || !isAdmin(actor.role)) return;

  const id = str(formData, "id");
  const role = str(formData, "role") as Role;
  if (!id || !["pending", "member", "leader", "admin"].includes(role)) return;

  // Don't let the last administrator demote themselves out of the console.
  if (id === actor.id && role !== "admin") return;

  await setRole(id, role, actor.id);
  revalidatePath("/dashboard/members");
}

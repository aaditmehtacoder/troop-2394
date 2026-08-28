import { promises as fs } from "node:fs";
import path from "node:path";
import { randomBytes } from "node:crypto";
import { hashPassword, newId } from "./crypto";

/* ---------------------------------------------------------------------------
   USER STORE
   ---------------------------------------------------------------------------
   A JSON file under .data/ — no database to install, works the moment you run
   `npm run dev`, and survives restarts.

   ⚠️  BEFORE YOU DEPLOY: a file store does not work on serverless hosting
   (Vercel, Netlify functions) because the filesystem is ephemeral and each
   instance gets its own copy. Swap the six functions at the bottom of this
   file for your database of choice — everything above them stays as-is, and
   nothing else in the app imports the file layer directly.
   ------------------------------------------------------------------------ */

export type Role = "pending" | "member" | "leader" | "admin";

export type User = {
  id: string;
  email: string;
  name: string;
  /** Free text: "Scout, Troop 394", "Parent", "Assistant Scoutmaster"… */
  relationship: string;
  role: Role;
  passwordHash: string;
  createdAt: string;
  approvedAt?: string;
  approvedBy?: string;
  lastLoginAt?: string;
};

/** What is safe to send to the browser — never the hash. */
export type PublicUser = Omit<User, "passwordHash">;

export function toPublic(u: User): PublicUser {
  const { passwordHash: _omit, ...rest } = u;
  void _omit;
  return rest;
}

export const ROLE_RANK: Record<Role, number> = {
  pending: 0,
  member: 1,
  leader: 2,
  admin: 3,
};

/** Roles at or above `member` may open the members area. */
export function canAccessDashboard(role: Role): boolean {
  return ROLE_RANK[role] >= ROLE_RANK.member;
}

export function isLeader(role: Role): boolean {
  return ROLE_RANK[role] >= ROLE_RANK.leader;
}

export function isAdmin(role: Role): boolean {
  return role === "admin";
}

/* ------------------------------ file layer ------------------------------ */

const DATA_DIR = path.join(process.cwd(), ".data");
const USERS_FILE = path.join(DATA_DIR, "users.json");
const SECRET_FILE = path.join(DATA_DIR, "session-secret");

async function ensureDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

/**
 * Serialises writes. Node runs one event loop per process, so chaining onto a
 * promise is enough to stop two concurrent signups clobbering each other's
 * write within this instance.
 */
let queue: Promise<unknown> = Promise.resolve();
function serialize<T>(fn: () => Promise<T>): Promise<T> {
  const run = queue.then(fn, fn);
  queue = run.catch(() => {});
  return run;
}

async function readAll(): Promise<User[]> {
  try {
    const raw = await fs.readFile(USERS_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as User[]) : [];
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
}

async function writeAll(users: User[]): Promise<void> {
  await ensureDir();
  // Write to a temp file then rename, so a crash mid-write cannot truncate
  // the store.
  const tmp = `${USERS_FILE}.${process.pid}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(users, null, 2), { mode: 0o600 });
  await fs.rename(tmp, USERS_FILE);
}

/**
 * The HMAC key for session cookies.
 *
 * Production must set SESSION_SECRET. In development we generate one once and
 * keep it in .data/ so sessions survive a dev-server restart.
 */
export async function getSessionSecret(): Promise<string> {
  const fromEnv = process.env.SESSION_SECRET;
  if (fromEnv && fromEnv.length >= 32) return fromEnv;

  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "SESSION_SECRET is not set (or is shorter than 32 characters). " +
        "Generate one with:  openssl rand -base64 48",
    );
  }

  await ensureDir();
  try {
    const existing = (await fs.readFile(SECRET_FILE, "utf8")).trim();
    if (existing.length >= 32) return existing;
  } catch {
    /* fall through and create one */
  }
  const generated = randomBytes(48).toString("base64");
  await fs.writeFile(SECRET_FILE, generated, { mode: 0o600 });
  return generated;
}

/* ------------------------------- queries -------------------------------- */

const normalize = (email: string) => email.trim().toLowerCase();

export async function listUsers(): Promise<User[]> {
  return readAll();
}

export async function findByEmail(email: string): Promise<User | null> {
  const target = normalize(email);
  const users = await readAll();
  return users.find((u) => u.email === target) ?? null;
}

export async function findById(id: string): Promise<User | null> {
  const users = await readAll();
  return users.find((u) => u.id === id) ?? null;
}

export async function countUsers(): Promise<number> {
  return (await readAll()).length;
}

/* ------------------------------- mutations ------------------------------ */

export type NewUser = {
  email: string;
  name: string;
  relationship: string;
  password: string;
};

export type CreateResult =
  | { ok: true; user: PublicUser }
  | { ok: false; error: string };

export async function createUser(input: NewUser): Promise<CreateResult> {
  const email = normalize(input.email);
  const passwordHash = await hashPassword(input.password);

  return serialize(async () => {
    const users = await readAll();
    if (users.some((u) => u.email === email)) {
      return { ok: false as const, error: "An account with that email already exists." };
    }

    // Bootstrap: the very first account is the administrator, so somebody can
    // approve everyone who comes after. Every later signup starts as pending.
    const isFirst = users.length === 0;

    const user: User = {
      id: newId(),
      email,
      name: input.name.trim(),
      relationship: input.relationship.trim(),
      role: isFirst ? "admin" : "pending",
      passwordHash,
      createdAt: new Date().toISOString(),
      ...(isFirst ? { approvedAt: new Date().toISOString(), approvedBy: "bootstrap" } : {}),
    };

    users.push(user);
    await writeAll(users);
    return { ok: true as const, user: toPublic(user) };
  });
}

export async function setRole(
  id: string,
  role: Role,
  actorId: string,
): Promise<PublicUser | null> {
  return serialize(async () => {
    const users = await readAll();
    const user = users.find((u) => u.id === id);
    if (!user) return null;

    user.role = role;
    if (role !== "pending") {
      user.approvedAt = new Date().toISOString();
      user.approvedBy = actorId;
    }
    await writeAll(users);
    return toPublic(user);
  });
}

export async function deleteUser(id: string): Promise<boolean> {
  return serialize(async () => {
    const users = await readAll();
    const next = users.filter((u) => u.id !== id);
    if (next.length === users.length) return false;
    await writeAll(next);
    return true;
  });
}

export async function touchLogin(id: string): Promise<void> {
  await serialize(async () => {
    const users = await readAll();
    const user = users.find((u) => u.id === id);
    if (!user) return;
    user.lastLoginAt = new Date().toISOString();
    await writeAll(users);
  });
}

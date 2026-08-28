import {
  createHmac,
  randomBytes,
  scrypt as _scrypt,
  timingSafeEqual,
} from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(_scrypt) as (
  password: string | Buffer,
  salt: string | Buffer,
  keylen: number,
) => Promise<Buffer>;

/* ---------------------------------------------------------------------------
   Passwords — scrypt with a per-user random salt.
   Format: scrypt$<keylen>$<salt-b64>$<hash-b64>
   Node's crypto is used directly so this adds no dependency to audit.
   ------------------------------------------------------------------------ */

const KEYLEN = 64;

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const hash = await scrypt(password.normalize("NFKC"), salt, KEYLEN);
  return `scrypt$${KEYLEN}$${salt.toString("base64")}$${hash.toString("base64")}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const parts = stored.split("$");
  if (parts.length !== 4 || parts[0] !== "scrypt") return false;

  const keylen = Number(parts[1]);
  if (!Number.isInteger(keylen) || keylen < 16 || keylen > 512) return false;

  let salt: Buffer;
  let expected: Buffer;
  try {
    salt = Buffer.from(parts[2], "base64");
    expected = Buffer.from(parts[3], "base64");
  } catch {
    return false;
  }
  if (expected.length !== keylen) return false;

  const actual = await scrypt(password.normalize("NFKC"), salt, keylen);
  return timingSafeEqual(actual, expected);
}

/* ---------------------------------------------------------------------------
   Session tokens — HMAC-SHA256 signed, stateless.
   Payload is base64url JSON; the signature covers it. Not encrypted, so never
   put anything secret in the payload — it holds a user id and an expiry only.
   ------------------------------------------------------------------------ */

export type SessionPayload = { uid: string; exp: number };

const b64url = (b: Buffer) => b.toString("base64url");

function sign(data: string, secret: string): string {
  return b64url(createHmac("sha256", secret).update(data).digest());
}

export function createToken(payload: SessionPayload, secret: string): string {
  const body = b64url(Buffer.from(JSON.stringify(payload)));
  return `${body}.${sign(body, secret)}`;
}

export function readToken(token: string, secret: string): SessionPayload | null {
  const dot = token.lastIndexOf(".");
  if (dot < 1) return null;

  const body = token.slice(0, dot);
  const given = token.slice(dot + 1);
  const wanted = sign(body, secret);

  // Compare as buffers of equal length, in constant time.
  const a = Buffer.from(given);
  const b = Buffer.from(wanted);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString()) as SessionPayload;
    if (typeof payload.uid !== "string" || typeof payload.exp !== "number") return null;
    if (Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

export function newId(): string {
  return randomBytes(12).toString("hex");
}

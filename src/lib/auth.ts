const SALT = "jdfortress-internal-2026";
const JWT_SECRET = "6ddda4eceb06a789b35765cfe7a6bf98109e28e0fe367bbde3f670b9beb50ca4";
const SESSION_DURATION_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

const USERS: Record<string, { hash: string; name: string }> = {
  "joseph@jdfortress.com": {
    hash: "3dd0787e65fe9b735924839c454163a046a2c3a51be6f9f7835aea1c6a5e427a",
    name: "Joseph",
  },
  "dev@jdfortress.com": {
    hash: "3f32c8a58cf327930f3f46f0e974e097f3c156236f24ce5e704937cc21ed2d33",
    name: "Dev",
  },
};


async function sha256hex(input: string): Promise<string> {
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(input)
  );
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function hmacSign(payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(JWT_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payload)
  );
  return btoa(String.fromCharCode(...new Uint8Array(sig)));
}

async function hmacVerify(payload: string, sig: string): Promise<boolean> {
  const expected = await hmacSign(payload);
  return expected === sig;
}

export async function verifyPassword(
  email: string,
  password: string
): Promise<boolean> {
  if (!email || !password) return false;
  const user = USERS[email.toLowerCase()];
  if (!user) return false;
  const hash = await sha256hex(SALT + password);
  return hash === user.hash;
}

export async function createSessionToken(email: string): Promise<string> {
  const payload = JSON.stringify({
    email: email.toLowerCase(),
    exp: Date.now() + SESSION_DURATION_MS,
  });
  const b64 = btoa(payload);
  const sig = await hmacSign(b64);
  return `${b64}.${sig}`;
}

export async function verifySessionToken(
  token: string | undefined
): Promise<{ email: string; name: string } | null> {
  if (!token) return null;
  const dotIdx = token.lastIndexOf(".");
  if (dotIdx === -1) return null;
  const b64 = token.slice(0, dotIdx);
  const sig = token.slice(dotIdx + 1);
  const valid = await hmacVerify(b64, sig);
  if (!valid) return null;
  try {
    const payload = JSON.parse(atob(b64));
    if (!payload.exp || payload.exp < Date.now()) return null;
    const user = USERS[payload.email];
    if (!user) return null;
    return { email: payload.email, name: user.name };
  } catch {
    return null;
  }
}

export const SESSION_COOKIE = "jdf_session";
export const COOKIE_MAX_AGE = SESSION_DURATION_MS / 1000;

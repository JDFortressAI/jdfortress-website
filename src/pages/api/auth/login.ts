import type { APIRoute } from "astro";
import { verifyPassword, createSessionToken, SESSION_COOKIE, COOKIE_MAX_AGE } from "../../../lib/auth";

export const POST: APIRoute = async ({ request }) => {
  let email: string;
  let password: string;

  try {
    const body = await request.json();
    email = (body.email ?? "").trim().toLowerCase();
    password = body.password ?? "";
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request body." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!email || !password) {
    return new Response(JSON.stringify({ error: "Email and password are required." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const valid = await verifyPassword(email, password);
  if (!valid) {
    return new Response(JSON.stringify({ error: "Invalid credentials." }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const token = await createSessionToken(email);
  const cookieStr = `${SESSION_COOKIE}=${token}; HttpOnly; Path=/; SameSite=Strict; Max-Age=${COOKIE_MAX_AGE}`;

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": cookieStr,
    },
  });
};

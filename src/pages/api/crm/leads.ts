import type { APIRoute } from "astro";
import { verifySessionToken, SESSION_COOKIE } from "../../../lib/auth";
import { getStore, getAllLeads, getLead, createLead, updateLead } from "../../../lib/crm";
import type { LeadInput } from "../../../lib/crm";

function getToken(request: Request): string | undefined {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const match = cookieHeader.match(new RegExp(`${SESSION_COOKIE}=([^;]+)`));
  return match?.[1];
}

async function requireAuth(request: Request) {
  return verifySessionToken(getToken(request));
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export const GET: APIRoute = async ({ request }) => {
  const user = await requireAuth(request);
  if (!user) return json({ error: "Unauthorised." }, 401);
  return json(getAllLeads(getStore()));
};

export const POST: APIRoute = async ({ request }) => {
  const user = await requireAuth(request);
  if (!user) return json({ error: "Unauthorised." }, 401);

  let body: Partial<LeadInput>;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON." }, 400);
  }

  if (!body.companyName || !body.contactName || !body.contactEmail) {
    return json({ error: "companyName, contactName, and contactEmail are required." }, 400);
  }

  const lead = createLead(
    getStore(),
    {
      companyName: body.companyName,
      contactName: body.contactName,
      contactEmail: body.contactEmail,
      contactPhone: body.contactPhone,
      stage: body.stage ?? "new_enquiry",
      source: body.source ?? "other",
      vertical: body.vertical ?? "other",
      estimatedValue: body.estimatedValue,
      nextAction: body.nextAction,
      nextActionDue: body.nextActionDue,
    },
    user.email
  );
  return json(lead, 201);
};

export const PATCH: APIRoute = async ({ request, url }) => {
  const user = await requireAuth(request);
  if (!user) return json({ error: "Unauthorised." }, 401);

  const id = url.searchParams.get("id");
  if (!id) return json({ error: "id query param required." }, 400);

  let patch: Record<string, unknown>;
  try {
    patch = await request.json();
  } catch {
    return json({ error: "Invalid JSON." }, 400);
  }

  // Safety: never allow patching id or createdAt via the API
  delete patch.id;
  delete patch.createdAt;

  const updated = updateLead(getStore(), id, patch as any);
  if (!updated) return json({ error: "Lead not found." }, 404);
  return json(updated);
};

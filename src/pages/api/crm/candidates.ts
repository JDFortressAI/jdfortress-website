import type { APIRoute } from "astro";
import { verifySessionToken, SESSION_COOKIE } from "../../../lib/auth";
import {
  getCandidateStore,
  getAllCandidates,
  addCandidate,
  moveToRejected,
  moveToFollowUp,
  promoteToLead,
  patchCandidate,
  type CandidateInput,
} from "../../../lib/candidates";
import { getStore, createLead } from "../../../lib/crm";
import type { LeadInput } from "../../../lib/crm";

function getToken(request: Request) {
  const h = request.headers.get("cookie") ?? "";
  return h.match(new RegExp(`${SESSION_COOKIE}=([^;]+)`))?.[1];
}
async function auth(request: Request) {
  return verifySessionToken(getToken(request));
}
function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

// GET /api/crm/candidates
export const GET: APIRoute = async ({ request }) => {
  if (!await auth(request)) return json({ error: "Unauthorised." }, 401);
  return json(getAllCandidates(getCandidateStore()));
};

// POST /api/crm/candidates — add a new candidate (Hermes uses this when searching)
export const POST: APIRoute = async ({ request }) => {
  const user = await auth(request);
  if (!user) return json({ error: "Unauthorised." }, 401);
  let body: Partial<CandidateInput>;
  try { body = await request.json(); } catch { return json({ error: "Invalid JSON." }, 400); }
  if (!body.companyName || !body.contactEmail || !body.summary) {
    return json({ error: "companyName, contactEmail, and summary are required." }, 400);
  }
  const c = addCandidate(getCandidateStore(), body as CandidateInput);
  return json(c, 201);
};

// PATCH /api/crm/candidates?id=xxx&action=reject|followup|promote
export const PATCH: APIRoute = async ({ request, url }) => {
  const user = await auth(request);
  if (!user) return json({ error: "Unauthorised." }, 401);
  const id     = url.searchParams.get("id");
  const action = url.searchParams.get("action");
  if (!id) return json({ error: "id required." }, 400);

  if (action === "reject") {
    let body: { reason?: string };
    try { body = await request.json(); } catch { body = {}; }
    const updated = moveToRejected(getCandidateStore(), id, body.reason || "");
    if (!updated) return json({ error: "Not found." }, 404);
    return json(updated);
  }

  if (action === "followup") {
    const updated = moveToFollowUp(getCandidateStore(), id);
    if (!updated) return json({ error: "Not found." }, 404);
    return json(updated);
  }

  if (action === "inbox") {
    const updated = patchCandidate(getCandidateStore(), id, { status: "inbox", rejectionReason: undefined });
    if (!updated) return json({ error: "Not found." }, 404);
    return json(updated);
  }

  if (action === "promote") {
    // Create a pipeline lead from this candidate then mark as promoted
    const store = getCandidateStore();
    const cand = store.candidates.find((c) => c.id === id);
    if (!cand) return json({ error: "Not found." }, 404);
    const leadInput: LeadInput = {
      companyName:  cand.companyName,
      contactName:  cand.contactName,
      contactEmail: cand.contactEmail,
      contactPhone: cand.contactPhone,
      stage:        "new_enquiry",
      source:       "other",
      vertical:     cand.vertical as any,
      nextAction:   "Book discovery call",
    };
    const lead = createLead(getStore(), leadInput, user.email);
    const updated = promoteToLead(store, id, lead.id);
    if (!updated) return json({ error: "Not found." }, 404);
    return json({ candidate: updated, lead });
  }

  return json({ error: "Unknown action." }, 400);
};

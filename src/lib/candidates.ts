export type CandidateStatus = "inbox" | "rejected" | "follow_up";

export type CandidateSource =
  | "linkedin" | "companies_house" | "web_search"
  | "legal_directory" | "news" | "referral" | "other";

export type CandidateVertical =
  | "law_firm" | "in_house_legal" | "finance"
  | "healthcare" | "charity" | "enterprise" | "other";

export interface Candidate {
  id: string;
  companyName: string;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  website?: string;
  vertical: CandidateVertical;
  location?: string;
  source: CandidateSource;
  sourceUrl?: string;
  summary: string;           // why Hermes flagged this as a fit
  status: CandidateStatus;
  rejectionReason?: string;
  promotedToLeadId?: string; // set when promoted to pipeline
  searchedAt: string;        // ISO — when Hermes found this
  updatedAt: string;
  isDemo?: boolean;
}

export interface CandidateInput {
  companyName: string;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  website?: string;
  vertical: CandidateVertical;
  location?: string;
  source: CandidateSource;
  sourceUrl?: string;
  summary: string;
}

export interface CandidateStore {
  candidates: Candidate[];
}

// ── Store operations ─────────────────────────────────────────

export function getAllCandidates(store: CandidateStore): Candidate[] {
  return store.candidates;
}

export function getCandidate(store: CandidateStore, id: string): Candidate | null {
  return store.candidates.find((c) => c.id === id) ?? null;
}

export function addCandidate(store: CandidateStore, input: CandidateInput): Candidate {
  const now = new Date().toISOString();
  const c: Candidate = {
    id: `cand-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    ...input,
    status: "inbox",
    searchedAt: now,
    updatedAt: now,
  };
  store.candidates.push(c);
  return c;
}

export function patchCandidate(store: CandidateStore, id: string, patch: Partial<Candidate>): Candidate | null {
  const idx = store.candidates.findIndex((c) => c.id === id);
  if (idx === -1) return null;
  const updated = { ...store.candidates[idx], ...patch, id, updatedAt: new Date().toISOString() };
  store.candidates[idx] = updated;
  return updated;
}

export function moveToRejected(store: CandidateStore, id: string, reason: string): Candidate | null {
  return patchCandidate(store, id, { status: "rejected", rejectionReason: reason });
}

export function moveToFollowUp(store: CandidateStore, id: string): Candidate | null {
  return patchCandidate(store, id, { status: "follow_up", rejectionReason: undefined });
}

export function promoteToLead(store: CandidateStore, id: string, leadId: string): Candidate | null {
  return patchCandidate(store, id, { promotedToLeadId: leadId });
}

// ── Seed data ────────────────────────────────────────────────

const SEED: Candidate[] = [
  {
    id: "cand-001",
    isDemo: true,
    companyName: "Blackstone Legal LLP",
    contactName: "Marcus Webb",
    contactEmail: "m.webb@blackstonelegal.co.uk",
    website: "https://blackstonelegal.co.uk",
    vertical: "law_firm",
    location: "London",
    source: "linkedin",
    sourceUrl: "https://linkedin.com/company/blackstone-legal",
    summary: "8-partner commercial firm. Head of Risk posted about AI compliance concerns last week. Active use of document-heavy workflows. Strong fit for on-prem RAG.",
    status: "inbox",
    searchedAt: "2026-04-01T08:00:00Z",
    updatedAt: "2026-04-01T08:00:00Z",
  },
  {
    id: "cand-002",
    isDemo: true,
    companyName: "Aldgate Financial Advisors",
    contactName: "Priyanka Sharma",
    contactEmail: "p.sharma@aldgatefa.co.uk",
    website: "https://aldgatefa.co.uk",
    vertical: "finance",
    location: "London",
    source: "web_search",
    summary: "FCA-regulated IFA with 20 staff. Website references GDPR compliance prominently. No current AI stack visible — likely evaluating. Decision-maker identified on Companies House.",
    status: "inbox",
    searchedAt: "2026-04-01T08:05:00Z",
    updatedAt: "2026-04-01T08:05:00Z",
  },
  {
    id: "cand-003",
    isDemo: true,
    companyName: "Greenleaf Care Trust",
    contactName: "Dr. Olu Adewale",
    contactEmail: "o.adewale@greenleafcare.org.uk",
    website: "https://greenleafcare.org.uk",
    vertical: "charity",
    location: "Birmingham",
    source: "web_search",
    summary: "NHS-adjacent care charity, 60 staff. Handles sensitive patient data. Posted a job ad for 'AI readiness lead' — actively exploring. Budget likely tight but mission-fit strong.",
    status: "inbox",
    searchedAt: "2026-04-01T08:10:00Z",
    updatedAt: "2026-04-01T08:10:00Z",
  },
  {
    id: "cand-004",
    isDemo: true,
    companyName: "Thornton & Gray Solicitors",
    contactName: "Claire Thornton",
    contactEmail: "c.thornton@thorntongray.co.uk",
    vertical: "law_firm",
    location: "Manchester",
    source: "legal_directory",
    sourceUrl: "https://chambersandpartners.com",
    summary: "Mid-size employment law firm. Chambers-ranked. Opposing counsel mentioned using ChatGPT for drafting in a recent tribunal — partner likely aware of the compliance risk. Warm angle.",
    status: "follow_up",
    searchedAt: "2026-03-31T14:00:00Z",
    updatedAt: "2026-03-31T16:30:00Z",
  },
  {
    id: "cand-005",
    isDemo: true,
    companyName: "NovaMed Diagnostics",
    contactName: "James Hartley",
    contactEmail: "j.hartley@novamed.co.uk",
    website: "https://novamed.co.uk",
    vertical: "healthcare",
    location: "Cambridge",
    source: "news",
    sourceUrl: "https://cambridge-news.co.uk/novamed-expansion",
    summary: "Medical diagnostics company, just raised Series A. Expanding data team. Clinical data on-prem requirement almost certain given MHRA regulations. CTO contact identified.",
    status: "inbox",
    searchedAt: "2026-03-31T10:00:00Z",
    updatedAt: "2026-03-31T10:00:00Z",
  },
  {
    id: "cand-006",
    isDemo: true,
    companyName: "BrightPath Consulting",
    contactName: "Tom Fletcher",
    contactEmail: "t.fletcher@brightpathco.uk",
    vertical: "enterprise",
    location: "Leeds",
    source: "linkedin",
    summary: "Management consultancy, 30 staff. Uses generic cloud AI tools prominently on website. Not a compliance-driven buyer — more interested in productivity. Weak fit for our security-first positioning.",
    status: "rejected",
    rejectionReason: "Not compliance-motivated. Uses cloud AI happily and markets it as a feature. Not our buyer profile.",
    searchedAt: "2026-03-30T09:00:00Z",
    updatedAt: "2026-03-30T11:00:00Z",
  },
  {
    id: "cand-007",
    isDemo: true,
    companyName: "Whitmore & Associates",
    contactName: "Patricia Whitmore",
    contactEmail: "p.whitmore@whitmore-assoc.co.uk",
    vertical: "law_firm",
    location: "Bristol",
    source: "legal_directory",
    summary: "4-partner family law firm. Small but regulated. Listed on Resolution directory. No AI tooling visible. Typical profile of a firm that will face pressure from clients about AI policies within 12 months.",
    status: "inbox",
    searchedAt: "2026-03-30T14:00:00Z",
    updatedAt: "2026-03-30T14:00:00Z",
  },
  {
    id: "cand-008",
    isDemo: true,
    companyName: "Apex Insurance Group",
    contactName: "Sandra Mills",
    contactEmail: "s.mills@apexinsurance.co.uk",
    website: "https://apexinsurance.co.uk",
    vertical: "finance",
    location: "Edinburgh",
    source: "companies_house",
    summary: "FCA-regulated insurer, 80 staff. Filed accounts showing recent IT investment. GDPR obligations significant given policyholder data. No public AI position — likely evaluating quietly.",
    status: "follow_up",
    searchedAt: "2026-03-29T09:00:00Z",
    updatedAt: "2026-03-29T15:00:00Z",
  },
];

export function createCandidateStore(): CandidateStore {
  return { candidates: SEED.map((c) => ({ ...c })) };
}

let _store: CandidateStore | null = null;
export function getCandidateStore(): CandidateStore {
  if (!_store) _store = createCandidateStore();
  return _store;
}

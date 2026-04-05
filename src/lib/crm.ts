export type LeadStage =
  | "new_enquiry"
  | "discovery_booked"
  | "discovery_done"
  | "proposal_sent"
  | "sow_shared"
  | "negotiation"
  | "won"
  | "lost"
  | "nurture";

export type LeadSource =
  | "website" | "referral" | "linkedin"
  | "cold_outreach" | "event" | "other";

export type LeadVertical =
  | "law_firm" | "in_house_legal" | "finance"
  | "healthcare" | "charity" | "enterprise" | "other";

export interface Note {
  id: string;
  text: string;
  author: string;
  createdAt: string;
}

export interface Lead {
  id: string;
  companyName: string;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  stage: LeadStage;
  source: LeadSource;
  vertical: LeadVertical;
  estimatedValue?: number;
  notes: Note[];
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  nextAction?: string;
  nextActionDue?: string;
  isDemo?: boolean;
}

export interface LeadInput {
  companyName: string;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  stage: LeadStage;
  source: LeadSource;
  vertical: LeadVertical;
  estimatedValue?: number;
  nextAction?: string;
  nextActionDue?: string;
}

export interface CRMStore {
  leads: Lead[];
}

export const STAGE_ORDER: LeadStage[] = [
  "new_enquiry",
  "discovery_booked",
  "discovery_done",
  "proposal_sent",
  "sow_shared",
  "negotiation",
  "won",
  "lost",
  "nurture",
];

export const STAGE_LABELS: Record<LeadStage, string> = {
  new_enquiry: "New Enquiry",
  discovery_booked: "Discovery Booked",
  discovery_done: "Discovery Done",
  proposal_sent: "Proposal Sent",
  sow_shared: "SOW Shared",
  negotiation: "Negotiation",
  won: "Won ✓",
  lost: "Lost",
  nurture: "Nurture",
};

export const STAGE_COLORS: Record<LeadStage, string> = {
  new_enquiry: "#1E6FF5",
  discovery_booked: "#7c3aed",
  discovery_done: "#0891b2",
  proposal_sent: "#d97706",
  sow_shared: "#c2410c",
  negotiation: "#ea580c",
  won: "#16a34a",
  lost: "#dc2626",
  nurture: "#6b7280",
};

export const VERTICAL_LABELS: Record<LeadVertical, string> = {
  law_firm: "Law Firm",
  in_house_legal: "In-House Legal",
  finance: "Finance",
  healthcare: "Healthcare",
  charity: "Charity",
  enterprise: "Enterprise",
  other: "Other",
};

export const SOURCE_LABELS: Record<LeadSource, string> = {
  website: "Website",
  referral: "Referral",
  linkedin: "LinkedIn",
  cold_outreach: "Cold Outreach",
  event: "Event",
  other: "Other",
};

// ── Store operations (pure functions over CRMStore) ─────────────

export function getAllLeads(store: CRMStore): Lead[] {
  return store.leads;
}

export function getLead(store: CRMStore, id: string): Lead | null {
  return store.leads.find((l) => l.id === id) ?? null;
}

export function createLead(
  store: CRMStore,
  input: LeadInput,
  author: string
): Lead {
  const now = new Date().toISOString();
  const lead: Lead = {
    id: `lead-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    companyName: input.companyName,
    contactName: input.contactName,
    contactEmail: input.contactEmail,
    contactPhone: input.contactPhone,
    stage: input.stage,
    source: input.source,
    vertical: input.vertical,
    estimatedValue: input.estimatedValue,
    notes: [],
    createdAt: now,
    updatedAt: now,
    assignedTo: author,
    nextAction: input.nextAction,
    nextActionDue: input.nextActionDue,
  };
  store.leads.push(lead);
  return lead;
}

export function updateLead(
  store: CRMStore,
  id: string,
  patch: Partial<Omit<Lead, "id" | "createdAt">>
): Lead | null {
  const idx = store.leads.findIndex((l) => l.id === id);
  if (idx === -1) return null;
  const existing = store.leads[idx];
  const updated: Lead = {
    ...existing,
    ...patch,
    id: existing.id,         // id is immutable
    createdAt: existing.createdAt, // createdAt is immutable
    updatedAt: new Date().toISOString(),
  };
  store.leads[idx] = updated;
  return updated;
}

export function addNote(
  store: CRMStore,
  leadId: string,
  text: string,
  author: string
): Note | null {
  const idx = store.leads.findIndex((l) => l.id === leadId);
  if (idx === -1) return null;
  const note: Note = {
    id: `note-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    text,
    author,
    createdAt: new Date().toISOString(),
  };
  store.leads[idx] = {
    ...store.leads[idx],
    notes: [...store.leads[idx].notes, note],
    updatedAt: new Date().toISOString(),
  };
  return note;
}

// ── Singleton in-memory store (SSR process lifetime) ────────────

const SEED_LEADS: Lead[] = [
  {
    id: "lead-prince",
    companyName: "Workforce Housing Co.",
    contactName: "Prince",
    contactEmail: "",
    stage: "sow_shared",
    source: "referral",
    vertical: "enterprise",
    estimatedValue: 3200,
    notes: [
      {
        id: "n-prince-1",
        text: "Met via church — contractor/workforce housing business. Needs a platform: CRM, DB, API, agents. Existing site cost £450 (WordPress). We framed our £3,200 as a platform build, not a website.",
        author: "joseph@jdfortress.com",
        createdAt: "2026-03-01T10:00:00Z",
      },
      {
        id: "n-prince-2",
        text: "SOW v6 shared — revised by Shinae (lawyer). Includes: deemed acceptance clause, late payment interest, suspension right, client delay clause, GDPR split, mutual liability cap, change control. Awaiting reply.",
        author: "joseph@jdfortress.com",
        createdAt: "2026-04-01T09:00:00Z",
      },
    ],
    createdAt: "2026-03-01T10:00:00Z",
    updatedAt: "2026-04-01T09:00:00Z",
    assignedTo: "joseph@jdfortress.com",
    nextAction: "Chase SOW reply",
    nextActionDue: "2026-04-10T09:00:00Z",
  },
  {
    id: "lead-001",
    isDemo: true,
    companyName: "Meridian Legal LLP",
    contactName: "Sarah Chen",
    contactEmail: "s.chen@meridianlegal.co.uk",
    contactPhone: "020 7123 4567",
    stage: "proposal_sent",
    source: "website",
    vertical: "law_firm",
    estimatedValue: 8500,
    notes: [
      { id: "n1", text: "Discovery call went very well. 12-partner firm using CoCounsel — head of risk nervous about data leaving the building. Strong fit.", author: "joseph@jdfortress.com", createdAt: "2026-03-18T10:30:00Z" },
      { id: "n2", text: "Proposal sent. Awaiting feedback from managing partner.", author: "joseph@jdfortress.com", createdAt: "2026-03-24T14:00:00Z" },
    ],
    createdAt: "2026-03-15T09:00:00Z",
    updatedAt: "2026-03-24T14:00:00Z",
    assignedTo: "joseph@jdfortress.com",
    nextAction: "Follow up on proposal",
    nextActionDue: "2026-04-03T09:00:00Z",
  },
  {
    id: "lead-002",
    isDemo: true,
    companyName: "Hartwell Capital Partners",
    contactName: "James Okafor",
    contactEmail: "j.okafor@hartwell-cap.com",
    stage: "discovery_done",
    source: "linkedin",
    vertical: "finance",
    estimatedValue: 14000,
    notes: [
      { id: "n3", text: "Compliance director reached out after our CLOUD Act post. Wants air-gapped deployment for deal documents.", author: "dev@jdfortress.com", createdAt: "2026-03-20T11:00:00Z" },
    ],
    createdAt: "2026-03-19T08:00:00Z",
    updatedAt: "2026-03-22T16:00:00Z",
    assignedTo: "dev@jdfortress.com",
    nextAction: "Build proposal",
    nextActionDue: "2026-04-02T09:00:00Z",
  },
  {
    id: "lead-003",
    isDemo: true,
    companyName: "Covenant House Trust",
    contactName: "Rev. Michael Adeyemi",
    contactEmail: "m.adeyemi@covenanthouse.org.uk",
    stage: "won",
    source: "referral",
    vertical: "charity",
    estimatedValue: 3200,
    notes: [
      { id: "n4", text: "Referred by previous client. Private assistant over donor database. Signed and deployed.", author: "joseph@jdfortress.com", createdAt: "2026-03-01T09:00:00Z" },
    ],
    createdAt: "2026-02-25T10:00:00Z",
    updatedAt: "2026-03-10T12:00:00Z",
    assignedTo: "joseph@jdfortress.com",
  },
  {
    id: "lead-004",
    isDemo: true,
    companyName: "Albright & Forsyth Solicitors",
    contactName: "Tom Albright",
    contactEmail: "t.albright@albrightforsyth.co.uk",
    stage: "new_enquiry",
    source: "website",
    vertical: "law_firm",
    estimatedValue: 6000,
    notes: [
      { id: "n5", text: "Contact form. Family law firm, 6 solicitors. PI insurer asking questions about AI data handling.", author: "joseph@jdfortress.com", createdAt: "2026-03-29T08:30:00Z" },
    ],
    createdAt: "2026-03-29T08:30:00Z",
    updatedAt: "2026-03-29T08:30:00Z",
    assignedTo: "joseph@jdfortress.com",
    nextAction: "Book discovery call",
    nextActionDue: "2026-04-01T09:00:00Z",
  },
  {
    id: "lead-005",
    isDemo: true,
    companyName: "ProGenix Healthcare Ltd",
    contactName: "Dr. Priya Nair",
    contactEmail: "p.nair@progenix.co.uk",
    stage: "discovery_booked",
    source: "cold_outreach",
    vertical: "healthcare",
    estimatedValue: 18000,
    notes: [
      { id: "n6", text: "Medical device company. Head of Legal wants AI for contract review; CTO has data residency requirements. Discovery call 4 April.", author: "dev@jdfortress.com", createdAt: "2026-03-27T14:00:00Z" },
    ],
    createdAt: "2026-03-26T09:00:00Z",
    updatedAt: "2026-03-27T14:00:00Z",
    assignedTo: "dev@jdfortress.com",
    nextAction: "Prepare discovery agenda",
    nextActionDue: "2026-04-03T09:00:00Z",
  },
  {
    id: "lead-006",
    isDemo: true,
    companyName: "Vantage Infrastructure PLC",
    contactName: "Claire Whittaker",
    contactEmail: "c.whittaker@vantage-infra.com",
    stage: "lost",
    source: "referral",
    vertical: "enterprise",
    estimatedValue: 25000,
    notes: [
      { id: "n7", text: "Went with Microsoft Co-Pilot. IT procurement had existing Azure relationship. Re-engage in 6 months when CLOUD Act scrutiny hits.", author: "joseph@jdfortress.com", createdAt: "2026-03-15T10:00:00Z" },
    ],
    createdAt: "2026-03-01T09:00:00Z",
    updatedAt: "2026-03-15T10:00:00Z",
    assignedTo: "joseph@jdfortress.com",
    nextAction: "Re-engage Sept 2026",
    nextActionDue: "2026-09-01T09:00:00Z",
  },
  {
    id: "lead-007",
    isDemo: true,
    companyName: "Stenwick & Partners",
    contactName: "Rachel Stenwick",
    contactEmail: "r.stenwick@stenwickpartners.co.uk",
    stage: "nurture",
    source: "event",
    vertical: "law_firm",
    estimatedValue: 5500,
    notes: [
      { id: "n8", text: "Met at Law Society tech event. Mid-PI renewal. Wants to revisit in May.", author: "joseph@jdfortress.com", createdAt: "2026-03-22T18:00:00Z" },
    ],
    createdAt: "2026-03-22T18:00:00Z",
    updatedAt: "2026-03-22T18:00:00Z",
    assignedTo: "joseph@jdfortress.com",
    nextAction: "Check in after PI renewal",
    nextActionDue: "2026-05-15T09:00:00Z",
  },
];

export function createStore(): CRMStore {
  return { leads: SEED_LEADS.map((l) => ({ ...l, notes: [...l.notes] })) };
}

// Process-level singleton
let _store: CRMStore | null = null;
export function getStore(): CRMStore {
  if (!_store) _store = createStore();
  return _store;
}

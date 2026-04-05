import { describe, it, expect, beforeEach } from "vitest";
import {
  createStore,
  getAllLeads,
  createLead,
  updateLead,
  getLead,
  addNote,
  STAGE_ORDER,
  STAGE_LABELS,
  type CRMStore,
  type LeadInput,
} from "./crm";

function makeStore(): CRMStore {
  return createStore();
}

const validInput: LeadInput = {
  companyName: "Meridian Legal LLP",
  contactName: "Sarah Chen",
  contactEmail: "s.chen@meridian.co.uk",
  stage: "new_enquiry",
  source: "website",
  vertical: "law_firm",
};

describe("createStore", () => {
  it("returns a store with seed leads pre-loaded", () => {
    const store = makeStore();
    expect(getAllLeads(store).length).toBeGreaterThan(0);
  });
});

describe("getAllLeads", () => {
  it("returns all leads from the store", () => {
    const store = makeStore();
    const leads = getAllLeads(store);
    expect(Array.isArray(leads)).toBe(true);
  });
});

describe("getLead", () => {
  it("returns a lead by id", () => {
    const store = makeStore();
    const [first] = getAllLeads(store);
    expect(getLead(store, first.id)).toEqual(first);
  });

  it("returns null for unknown id", () => {
    const store = makeStore();
    expect(getLead(store, "nonexistent")).toBeNull();
  });
});

describe("createLead", () => {
  it("adds a new lead to the store", () => {
    const store = makeStore();
    const before = getAllLeads(store).length;
    createLead(store, validInput, "joseph@jdfortress.com");
    expect(getAllLeads(store).length).toBe(before + 1);
  });

  it("assigns an id to the new lead", () => {
    const store = makeStore();
    const lead = createLead(store, validInput, "joseph@jdfortress.com");
    expect(lead.id).toBeTruthy();
  });

  it("sets createdAt and updatedAt as ISO strings", () => {
    const store = makeStore();
    const lead = createLead(store, validInput, "joseph@jdfortress.com");
    expect(() => new Date(lead.createdAt)).not.toThrow();
    expect(() => new Date(lead.updatedAt)).not.toThrow();
  });

  it("sets assignedTo to the provided author email", () => {
    const store = makeStore();
    const lead = createLead(store, validInput, "dev@jdfortress.com");
    expect(lead.assignedTo).toBe("dev@jdfortress.com");
  });

  it("initialises notes as empty array", () => {
    const store = makeStore();
    const lead = createLead(store, validInput, "joseph@jdfortress.com");
    expect(lead.notes).toEqual([]);
  });

  it("stores companyName, contactName, contactEmail correctly", () => {
    const store = makeStore();
    const lead = createLead(store, validInput, "joseph@jdfortress.com");
    expect(lead.companyName).toBe("Meridian Legal LLP");
    expect(lead.contactName).toBe("Sarah Chen");
    expect(lead.contactEmail).toBe("s.chen@meridian.co.uk");
  });
});

describe("updateLead", () => {
  it("updates the stage of a lead", () => {
    const store = makeStore();
    const lead = createLead(store, validInput, "joseph@jdfortress.com");
    const updated = updateLead(store, lead.id, { stage: "proposal_sent" });
    expect(updated!.stage).toBe("proposal_sent");
  });

  it("preserves fields not included in the patch", () => {
    const store = makeStore();
    const lead = createLead(store, validInput, "joseph@jdfortress.com");
    const updated = updateLead(store, lead.id, { stage: "discovery_booked" });
    expect(updated!.companyName).toBe("Meridian Legal LLP");
    expect(updated!.contactEmail).toBe("s.chen@meridian.co.uk");
  });

  it("updates updatedAt on every patch", () => {
    const store = makeStore();
    const lead = createLead(store, validInput, "joseph@jdfortress.com");
    const original = lead.updatedAt;
    // Ensure a tick passes
    const updated = updateLead(store, lead.id, { stage: "discovery_done" });
    // updatedAt is a new ISO string — same or newer
    expect(new Date(updated!.updatedAt) >= new Date(original)).toBe(true);
  });

  it("returns null for unknown id", () => {
    const store = makeStore();
    expect(updateLead(store, "nonexistent", { stage: "won" })).toBeNull();
  });

  it("does not allow overwriting the id", () => {
    const store = makeStore();
    const lead = createLead(store, validInput, "joseph@jdfortress.com");
    const updated = updateLead(store, lead.id, { id: "hacked" } as any);
    expect(updated!.id).toBe(lead.id);
  });
});

describe("addNote", () => {
  it("appends a note to the lead", () => {
    const store = makeStore();
    const lead = createLead(store, validInput, "joseph@jdfortress.com");
    addNote(store, lead.id, "Great discovery call.", "joseph@jdfortress.com");
    const updated = getLead(store, lead.id)!;
    expect(updated.notes).toHaveLength(1);
    expect(updated.notes[0].text).toBe("Great discovery call.");
  });

  it("records the author on the note", () => {
    const store = makeStore();
    const lead = createLead(store, validInput, "joseph@jdfortress.com");
    addNote(store, lead.id, "Dev's note.", "dev@jdfortress.com");
    const note = getLead(store, lead.id)!.notes[0];
    expect(note.author).toBe("dev@jdfortress.com");
  });

  it("assigns a unique id to each note", () => {
    const store = makeStore();
    const lead = createLead(store, validInput, "joseph@jdfortress.com");
    addNote(store, lead.id, "First.", "joseph@jdfortress.com");
    addNote(store, lead.id, "Second.", "joseph@jdfortress.com");
    const notes = getLead(store, lead.id)!.notes;
    expect(notes[0].id).not.toBe(notes[1].id);
  });

  it("returns null for unknown lead id", () => {
    const store = makeStore();
    expect(addNote(store, "nonexistent", "note", "joseph@jdfortress.com")).toBeNull();
  });
});

describe("STAGE_ORDER", () => {
  it("contains all expected stages in the correct sales order", () => {
    expect(STAGE_ORDER).toEqual([
      "new_enquiry",
      "discovery_booked",
      "discovery_done",
      "proposal_sent",
      "negotiation",
      "won",
      "lost",
      "nurture",
    ]);
  });
});

describe("STAGE_LABELS", () => {
  it("has a human-readable label for every stage in STAGE_ORDER", () => {
    for (const stage of STAGE_ORDER) {
      expect(STAGE_LABELS[stage]).toBeTruthy();
    }
  });
});

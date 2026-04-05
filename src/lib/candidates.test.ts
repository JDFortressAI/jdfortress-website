import { describe, it, expect } from "vitest";
import {
  createCandidateStore,
  getAllCandidates,
  getCandidate,
  addCandidate,
  moveToRejected,
  moveToFollowUp,
  promoteToLead,
  type CandidateStore,
  type CandidateInput,
} from "./candidates";

function makeStore(): CandidateStore {
  return createCandidateStore();
}

const validInput: CandidateInput = {
  companyName: "Blackstone Legal LLP",
  contactName: "Marcus Webb",
  contactEmail: "m.webb@blackstonelegal.co.uk",
  website: "https://blackstonelegal.co.uk",
  vertical: "law_firm",
  location: "London",
  source: "linkedin",
  sourceUrl: "https://linkedin.com/in/marcuswebb",
  summary: "8-partner firm. Head of Risk posted about AI compliance concerns. Strong fit for on-prem RAG.",
};

describe("createCandidateStore", () => {
  it("returns a store pre-seeded with candidate leads", () => {
    const store = makeStore();
    expect(getAllCandidates(store).length).toBeGreaterThan(0);
  });
});

describe("getCandidate", () => {
  it("returns a candidate by id", () => {
    const store = makeStore();
    const [first] = getAllCandidates(store);
    expect(getCandidate(store, first.id)).toEqual(first);
  });

  it("returns null for unknown id", () => {
    const store = makeStore();
    expect(getCandidate(store, "ghost")).toBeNull();
  });
});

describe("addCandidate", () => {
  it("adds to the store and returns the new candidate", () => {
    const store = makeStore();
    const before = getAllCandidates(store).length;
    const c = addCandidate(store, validInput);
    expect(getAllCandidates(store).length).toBe(before + 1);
    expect(c.id).toBeTruthy();
  });

  it("sets status to 'inbox' by default", () => {
    const store = makeStore();
    const c = addCandidate(store, validInput);
    expect(c.status).toBe("inbox");
  });

  it("sets searchedAt and updatedAt as ISO strings", () => {
    const store = makeStore();
    const c = addCandidate(store, validInput);
    expect(() => new Date(c.searchedAt)).not.toThrow();
    expect(() => new Date(c.updatedAt)).not.toThrow();
  });

  it("stores all input fields correctly", () => {
    const store = makeStore();
    const c = addCandidate(store, validInput);
    expect(c.companyName).toBe("Blackstone Legal LLP");
    expect(c.contactName).toBe("Marcus Webb");
    expect(c.source).toBe("linkedin");
    expect(c.summary).toBe(validInput.summary);
  });
});

describe("moveToRejected", () => {
  it("sets status to rejected and records the reason", () => {
    const store = makeStore();
    const c = addCandidate(store, validInput);
    const updated = moveToRejected(store, c.id, "Wrong sector — they only do conveyancing.");
    expect(updated!.status).toBe("rejected");
    expect(updated!.rejectionReason).toBe("Wrong sector — they only do conveyancing.");
  });

  it("returns null for unknown id", () => {
    const store = makeStore();
    expect(moveToRejected(store, "ghost", "reason")).toBeNull();
  });

  it("updates updatedAt", () => {
    const store = makeStore();
    const c = addCandidate(store, validInput);
    const orig = c.updatedAt;
    const updated = moveToRejected(store, c.id, "reason");
    expect(new Date(updated!.updatedAt) >= new Date(orig)).toBe(true);
  });
});

describe("moveToFollowUp", () => {
  it("sets status to follow_up", () => {
    const store = makeStore();
    const c = addCandidate(store, validInput);
    const updated = moveToFollowUp(store, c.id);
    expect(updated!.status).toBe("follow_up");
  });

  it("returns null for unknown id", () => {
    const store = makeStore();
    expect(moveToFollowUp(store, "ghost")).toBeNull();
  });

  it("clears rejectionReason when moved to follow_up", () => {
    const store = makeStore();
    const c = addCandidate(store, validInput);
    moveToRejected(store, c.id, "old reason");
    const updated = moveToFollowUp(store, c.id);
    expect(updated!.rejectionReason).toBeUndefined();
  });
});

describe("promoteToLead", () => {
  it("records the promoted lead id on the candidate", () => {
    const store = makeStore();
    const c = addCandidate(store, validInput);
    moveToFollowUp(store, c.id);
    const updated = promoteToLead(store, c.id, "lead-999");
    expect(updated!.promotedToLeadId).toBe("lead-999");
  });

  it("returns null for unknown id", () => {
    const store = makeStore();
    expect(promoteToLead(store, "ghost", "lead-999")).toBeNull();
  });
});

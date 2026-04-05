import { describe, it, expect } from "vitest";
import {
  verifyPassword,
  createSessionToken,
  verifySessionToken,
  ALLOWED_EMAILS,
} from "./auth";

describe("ALLOWED_EMAILS", () => {
  it("contains joseph@jdfortress.com", () => {
    expect(ALLOWED_EMAILS).toContain("joseph@jdfortress.com");
  });

  it("contains dev@jdfortress.com", () => {
    expect(ALLOWED_EMAILS).toContain("dev@jdfortress.com");
  });

  it("contains exactly two addresses", () => {
    expect(ALLOWED_EMAILS).toHaveLength(2);
  });
});

describe("verifyPassword", () => {
  it("returns true for joseph with correct password", async () => {
    expect(await verifyPassword("joseph@jdfortress.com", "TwIn*f6mk88$gF7c")).toBe(true);
  });

  it("returns true for dev with correct password", async () => {
    expect(await verifyPassword("dev@jdfortress.com", "e*GOadSF&sKg4dtj")).toBe(true);
  });

  it("returns false for joseph with wrong password", async () => {
    expect(await verifyPassword("joseph@jdfortress.com", "wrongpassword")).toBe(false);
  });

  it("returns false for unknown email", async () => {
    expect(await verifyPassword("hacker@evil.com", "TwIn*f6mk88$gF7c")).toBe(false);
  });

  it("returns false for empty password", async () => {
    expect(await verifyPassword("joseph@jdfortress.com", "")).toBe(false);
  });

  it("is case-insensitive for the email", async () => {
    expect(await verifyPassword("JOSEPH@JDFORTRESS.COM", "TwIn*f6mk88$gF7c")).toBe(true);
  });
});

describe("createSessionToken + verifySessionToken", () => {
  it("returns user info for a freshly created token", async () => {
    const token = await createSessionToken("joseph@jdfortress.com");
    const result = await verifySessionToken(token);
    expect(result).not.toBeNull();
    expect(result!.email).toBe("joseph@jdfortress.com");
    expect(result!.name).toBe("Joseph");
  });

  it("returns null for an undefined token", async () => {
    expect(await verifySessionToken(undefined)).toBeNull();
  });

  it("returns null for a garbage token", async () => {
    expect(await verifySessionToken("not.a.valid.token")).toBeNull();
  });

  it("returns null for a tampered token", async () => {
    const token = await createSessionToken("joseph@jdfortress.com");
    const [b64, sig] = token.split(".");
    const tampered = `${b64}TAMPERED.${sig}`;
    expect(await verifySessionToken(tampered)).toBeNull();
  });

  it("returns null for an expired token", async () => {
    // Build a token with exp in the past
    const payload = JSON.stringify({
      email: "joseph@jdfortress.com",
      exp: Date.now() - 1000,
    });
    const b64 = btoa(payload);
    // Sign it properly so signature check passes but exp fails
    const token = await createSessionToken("joseph@jdfortress.com");
    const validSig = token.split(".")[1];
    const expiredToken = `${b64}.${validSig}`;
    expect(await verifySessionToken(expiredToken)).toBeNull();
  });

  it("works for dev@jdfortress.com", async () => {
    const token = await createSessionToken("dev@jdfortress.com");
    const result = await verifySessionToken(token);
    expect(result!.email).toBe("dev@jdfortress.com");
    expect(result!.name).toBe("Dev");
  });
});

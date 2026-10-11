import { describe, it, expect } from "vitest";
import { createBackendToken, verifyBackendToken } from "../src/lib/auth-token";

describe("Backend HMAC Token Signer", () => {
  const secret = "test-secret-key-12345";
  const discordId = "987654321012345678";

  it("should generate token with payload and signature separated by dot", () => {
    const token = createBackendToken(discordId, secret, 3600);
    const parts = token.split(".");
    expect(parts).toHaveLength(2);
    expect(parts[0]).toBeDefined();
    expect(parts[1]).toBeDefined();
  });

  it("should successfully verify a valid generated token", () => {
    const token = createBackendToken(discordId, secret, 3600);
    const result = verifyBackendToken(token, secret);
    expect(result).not.toBeNull();
    expect(result?.discord_id).toBe(discordId);
  });

  it("should reject token signed with different secret", () => {
    const token = createBackendToken(discordId, secret, 3600);
    const result = verifyBackendToken(token, "wrong-secret");
    expect(result).toBeNull();
  });

  it("should reject expired token", () => {
    const token = createBackendToken(discordId, secret, -10); // expired 10 seconds ago
    const result = verifyBackendToken(token, secret);
    expect(result).toBeNull();
  });
});

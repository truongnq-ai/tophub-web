import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { apiClient } from "../src/lib/api-client";

describe("Typed API Client", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("should fetch public giftcodes successfully", async () => {
    const mockGiftcodes = {
      success: true,
      data: {
        items: [
          {
            code: "HERO2026",
            status: "ACTIVE",
            discovered_at: "2026-01-01T00:00:00Z",
            expires_at: null,
          },
        ],
        total: 1,
        page: 1,
        limit: 20,
        total_pages: 1,
      },
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockGiftcodes,
    } as any);

    const result = await apiClient.getPublicGiftcodes(1, 20);
    expect(result.success).toBe(true);
    expect(result.data?.items[0].code).toBe("HERO2026");
  });

  it("should send Authorization header with Bearer token for protected routes", async () => {
    const mockProfile = {
      success: true,
      data: {
        id: "user-1",
        discord_id: "123456",
        active_plan: "PRO",
        subscription: null,
        trial_used: true,
      },
    };

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockProfile,
    } as any);

    global.fetch = fetchMock;

    const token = "mock-bearer-token";
    await apiClient.getUserProfile(token);

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining("/api/v1/users/me"),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: `Bearer ${token}`,
        }),
      })
    );
  });
});

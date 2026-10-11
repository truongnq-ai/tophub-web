import { describe, it, expect, vi, beforeEach } from "vitest";
import { apiClient } from "@/lib/api-client";
import { previewPlayerAction, createPublicCheckoutAction } from "@/actions/billing";

describe("Public Billing & Player Actions", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should reject invalid UID formats in server actions", async () => {
    const invalidUids = ["", "abc", "123", "123456789", "123456789012345678901"];

    for (const uid of invalidUids) {
      const previewRes = await previewPlayerAction(uid);
      expect(previewRes.success).toBe(false);
      expect(previewRes.error?.code).toBe("INVALID_UID");

      const checkoutRes = await createPublicCheckoutAction(uid, "plan-price-1");
      expect(checkoutRes.success).toBe(false);
      expect(checkoutRes.error?.code).toBe("INVALID_UID");
    }
  });

  it("should call apiClient.previewPlayer with correct query url", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      json: async () => ({
        success: true,
        data: {
          uid: "2446869146316",
          nickname: "SuperHero",
          server_id: "1024",
        },
      }),
    });
    vi.stubGlobal("fetch", mockFetch);

    const res = await apiClient.previewPlayer("2446869146316");
    expect(res.success).toBe(true);
    expect(res.data?.nickname).toBe("SuperHero");
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/v1/players/preview?uid=2446869146316"),
      expect.any(Object)
    );
  });

  it("should call apiClient.createPublicCheckout with UID and planPriceId in body", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      json: async () => ({
        success: true,
        data: {
          orderCode: 123456,
          amount: 50000,
          planName: "TopHub PRO",
          months: 1,
        },
      }),
    });
    vi.stubGlobal("fetch", mockFetch);

    const res = await apiClient.createPublicCheckout("2446869146316", "price-1m");
    expect(res.success).toBe(true);
    expect(res.data?.orderCode).toBe(123456);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/v1/billing/checkout"),
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ uid: "2446869146316", plan_price_id: "price-1m" }),
      })
    );
  });

  it("should call apiClient.adminLogin and verify credentials", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      json: async () => ({
        success: true,
        data: {
          token: "mock-admin-token",
          expires_at: "2026-10-12T00:00:00.000Z",
        },
      }),
    });
    vi.stubGlobal("fetch", mockFetch);

    const res = await apiClient.adminLogin("admin", "secret-pass");
    expect(res.success).toBe(true);
    expect(res.data?.token).toBe("mock-admin-token");
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/v1/admin/login"),
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ username: "admin", password: "secret-pass" }),
      })
    );
  });

  it("should call apiClient.getAdminAccounts with Authorization header", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      json: async () => ({
        success: true,
        data: [
          {
            id: "acc-1",
            uid: "2446869146316",
            nickname: "SuperHero",
            server_id: "1024",
            active_plan: "PRO",
            ends_at: null,
            auto_redeem: true,
            auto_checkin: true,
            token_status: "VALID",
            created_at: "2026-10-11T00:00:00.000Z",
          },
        ],
      }),
    });
    vi.stubGlobal("fetch", mockFetch);

    const res = await apiClient.getAdminAccounts("test-token");
    expect(res.success).toBe(true);
    expect(res.data?.length).toBe(1);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/v1/admin/accounts"),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer test-token",
        }),
      })
    );
  });
});

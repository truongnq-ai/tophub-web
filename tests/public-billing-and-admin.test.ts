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
          uid: "1000000000001",
          nickname: "SuperHero",
          server_id: "1024",
        },
      }),
    });
    vi.stubGlobal("fetch", mockFetch);

    const res = await apiClient.previewPlayer("1000000000001");
    expect(res.success).toBe(true);
    expect(res.data?.nickname).toBe("SuperHero");
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/v1/players/preview?uid=1000000000001"),
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

    const res = await apiClient.createPublicCheckout("1000000000001", "price-1m");
    expect(res.success).toBe(true);
    expect(res.data?.orderCode).toBe(123456);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/v1/billing/checkout"),
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ uid: "1000000000001", plan_price_id: "price-1m" }),
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
            uid: "1000000000001",
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

  it("should call apiClient.getAdminGiftcodes with query params", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      json: async () => ({
        success: true,
        data: [
          {
            id: "code-1",
            code: "HERO2026",
            status: "VALID",
            valid_from: "2026-10-01T00:00:00.000Z",
            valid_to: "2026-12-31T23:59:59.000Z",
            redeemed_count: 5,
            total_accounts: 10,
            created_at: "2026-10-01T00:00:00.000Z",
          },
        ],
      }),
    });
    vi.stubGlobal("fetch", mockFetch);

    const res = await apiClient.getAdminGiftcodes("test-token", { search: "HERO", status: "VALID" });
    expect(res.success).toBe(true);
    expect(res.data?.[0].code).toBe("HERO2026");
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/v1/admin/giftcodes?status=VALID&search=HERO"),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer test-token",
        }),
      })
    );
  });

  it("should call apiClient.createAdminGiftcode with POST body", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      json: async () => ({
        success: true,
        data: {
          id: "new-code",
          code: "SUMMER2026",
          status: "VALID",
        },
      }),
    });
    vi.stubGlobal("fetch", mockFetch);

    const res = await apiClient.createAdminGiftcode("test-token", {
      code: "SUMMER2026",
      source: "Discord",
    });
    expect(res.success).toBe(true);
    expect(res.data?.code).toBe("SUMMER2026");
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/v1/admin/giftcodes"),
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ code: "SUMMER2026", source: "Discord" }),
        headers: expect.objectContaining({
          Authorization: "Bearer test-token",
        }),
      })
    );
  });

  it("should call apiClient.getAdminGiftcodeReceivers with code param", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      json: async () => ({
        success: true,
        data: [
          {
            account_id: "acc-1",
            uid: "1000000000001",
            nickname: "DragonSlayer",
            server_id: "1024",
            status: "SUCCESS",
            redeemed_at: "2026-10-12T10:00:00.000Z",
          },
        ],
      }),
    });
    vi.stubGlobal("fetch", mockFetch);

    const res = await apiClient.getAdminGiftcodeReceivers("test-token", "HERO2026");
    expect(res.success).toBe(true);
    expect(res.data?.[0].nickname).toBe("DragonSlayer");
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/v1/admin/giftcodes/HERO2026/receivers"),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer test-token",
        }),
      })
    );
  });

  it("should call apiClient.getAdminRedemptions and retryAdminRedemption", async () => {
    const mockFetch = vi.fn()
      .mockResolvedValueOnce({
        json: async () => ({
          success: true,
          data: [
            {
              id: "red-1",
              account_id: "acc-1",
              code: "HERO2026",
              status: "FAILED",
              redeemed_at: "2026-10-12T10:00:00.000Z",
              uid: "1000000000001",
              nickname: "DragonSlayer",
              server_id: "1024",
            },
          ],
        }),
      })
      .mockResolvedValueOnce({
        json: async () => ({
          success: true,
          data: { id: "red-1", status: "SUCCESS", api_message: "Queued retry" },
        }),
      })
      .mockResolvedValueOnce({
        json: async () => ({
          success: true,
          data: { retried_count: 5, message: "Queued 5 retries" },
        }),
      });
    vi.stubGlobal("fetch", mockFetch);

    const listRes = await apiClient.getAdminRedemptions("test-token", { status: "FAILED" });
    expect(listRes.success).toBe(true);
    expect(listRes.data?.[0].id).toBe("red-1");

    const retryRes = await apiClient.retryAdminRedemption("test-token", "red-1");
    expect(retryRes.success).toBe(true);
    expect(retryRes.data?.status).toBe("SUCCESS");

    const retryAllRes = await apiClient.retryAllAdminRedemptions("test-token");
    expect(retryAllRes.success).toBe(true);
    expect(retryAllRes.data?.retried_count).toBe(5);
  });

  it("should call apiClient.getAdminCheckins and retryAdminCheckin", async () => {
    const mockFetch = vi.fn()
      .mockResolvedValueOnce({
        json: async () => ({
          success: true,
          data: [
            {
              id: "chk-1",
              account_id: "acc-1",
              game_day: "2026-10-12",
              status: "FAILED",
              checked_at: "2026-10-12T10:00:00.000Z",
              uid: "1000000000001",
              nickname: "DragonSlayer",
              server_id: "1024",
            },
          ],
        }),
      })
      .mockResolvedValueOnce({
        json: async () => ({
          success: true,
          data: { id: "chk-1", status: "SUCCESS" },
        }),
      })
      .mockResolvedValueOnce({
        json: async () => ({
          success: true,
          data: { retried_count: 3, message: "Queued 3 checkin retries" },
        }),
      });
    vi.stubGlobal("fetch", mockFetch);

    const listRes = await apiClient.getAdminCheckins("test-token", { game_day: "2026-10-12" });
    expect(listRes.success).toBe(true);
    expect(listRes.data?.[0].id).toBe("chk-1");

    const retryRes = await apiClient.retryAdminCheckin("test-token", "chk-1");
    expect(retryRes.success).toBe(true);
    expect(retryRes.data?.status).toBe("SUCCESS");

    const retryAllRes = await apiClient.retryAllAdminCheckins("test-token");
    expect(retryAllRes.success).toBe(true);
    expect(retryAllRes.data?.retried_count).toBe(3);
  });
});

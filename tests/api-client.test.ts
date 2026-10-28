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

  it("getAdminAccountPayments should call /api/v1/admin/accounts/:id/payments with query params and Bearer token", async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        data: {
          account: { id: "acc-1", uid: "2446869146316", nickname: "Max", server_id: "S10956" },
          items: [],
          total: 0,
          page: 1,
          limit: 20,
          total_pages: 1,
          summary: {
            total_orders: 0,
            fetched_orders: 0,
            success_orders: 0,
            total_amount_vnd: 0,
            average_amount_vnd: 0,
            max_order_amount_vnd: 0,
            max_order_description: null,
            first_payment_at: null,
            last_payment_at: null,
            spender_tier: "F2P",
            is_partial_history: false,
            methods_breakdown: [],
          },
          fetched_at: "2026-10-25T09:00:00.000Z",
        },
      }),
    } as any);

    global.fetch = fetchMock;

    const res = await apiClient.getAdminAccountPayments("admin-token-123", "acc-1", {
      page: 2,
      limit: 10,
      method: "QR_9PAY",
      search: "Khối Vàng",
      refresh: true,
    });

    expect(res.success).toBe(true);
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining(
        "/api/v1/admin/accounts/acc-1/payments?page=2&limit=10&method=QR_9PAY&search=Kh%E1%BB%91i+V%C3%A0ng&refresh=true"
      ),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer admin-token-123",
        }),
        cache: "no-store",
      })
    );
  });

  it("calls admin system-params and whale analytics endpoints with correct query strings and headers", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, data: { items: [], groups: [] } }),
    } as any);

    global.fetch = fetchMock;

    await apiClient.getAdminSystemParams("admin-jwt", {
      group: "PAYMENT_SYNC",
      status: "ACTIVE",
      search: "STORE",
    });

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining(
        "/api/v1/admin/system-params?group=PAYMENT_SYNC&status=ACTIVE&search=STORE"
      ),
      expect.objectContaining({
        headers: expect.objectContaining({ Authorization: "Bearer admin-jwt" }),
      })
    );

    await apiClient.getAdminWhaleAnalytics("admin-jwt", {
      country: "PH",
      spender_tier: "WHALE",
      channel: "OFFICIAL_STORE",
      page: 1,
      limit: 20,
    });

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining(
        "/api/v1/admin/payments/analytics?country=PH&spender_tier=WHALE&channel=OFFICIAL_STORE&page=1&limit=20"
      ),
      expect.objectContaining({
        headers: expect.objectContaining({ Authorization: "Bearer admin-jwt" }),
      })
    );
  });
});

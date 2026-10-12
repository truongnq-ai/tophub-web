import type {
  ApiResponse,
  PublicGiftcodesResponse,
  UserProfileResponse,
  GameAccountItem,
  PlanItem,
  CheckoutResponse,
  PlayerPreviewResponse,
  PlayerStatusResponse,
  PlayerEnrollResponse,
  PlayerRunNowResponse,
  PlayerSettingsResponse,
  AdminLoginResponse,
  AdminAccountItem,
  AdminGiftCodeItem,
  AdminGiftcodeReceiverItem,
  AdminRedemptionItem,
  AdminCheckinItem,
  AdminRetryResponse,
} from "@/types/api";


const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://tophub.eagent.vn";

async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  const url = `${BASE_URL}${endpoint}`;
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });
    const data = await res.json();
    return data as ApiResponse<T>;
  } catch (err: any) {
    return {
      success: false,
      error: {
        code: "NETWORK_ERROR",
        message: err?.message || "Failed to communicate with API server",
      },
    };
  }
}

export const apiClient = {
  // Public Endpoints
  getHealth: () => apiFetch<{ status: string }>("/health"),

  getPublicGiftcodes: (page = 1, limit = 20) =>
    apiFetch<PublicGiftcodesResponse>(`/api/v1/giftcodes/public?page=${page}&limit=${limit}`, {
      next: { revalidate: 60 },
    }),

  getPlans: () =>
    apiFetch<PlanItem[]>("/api/v1/plans", {
      next: { revalidate: 300 },
    }),

  previewPlayer: (uid: string) =>
    apiFetch<PlayerPreviewResponse>(`/api/v1/players/preview?uid=${encodeURIComponent(uid)}`),

  getPlayerStatus: (uid: string) =>
    apiFetch<PlayerStatusResponse>(`/api/v1/players/status?uid=${encodeURIComponent(uid)}`),

  enrollPlayer: (uid: string) =>
    apiFetch<PlayerEnrollResponse>("/api/v1/players/enroll", {
      method: "POST",
      body: JSON.stringify({ uid }),
    }),

  triggerRunNow: (uid: string) =>
    apiFetch<PlayerRunNowResponse>("/api/v1/players/run-now", {
      method: "POST",
      body: JSON.stringify({ uid }),
    }),

  updatePlayerSettings: (
    uid: string,
    settings: { auto_redeem?: boolean; auto_checkin?: boolean }
  ) =>
    apiFetch<PlayerSettingsResponse>("/api/v1/players/settings", {
      method: "PATCH",
      body: JSON.stringify({ uid, ...settings }),
    }),

  createPublicCheckout: (uid: string, planPriceId: string) =>
    apiFetch<CheckoutResponse>("/api/v1/billing/checkout", {
      method: "POST",
      body: JSON.stringify({ uid, plan_price_id: planPriceId }),
    }),

  // Admin Endpoints
  adminLogin: (username: string, password: string) =>
    apiFetch<AdminLoginResponse>("/api/v1/admin/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    }),

  getAdminAccounts: (token: string) =>
    apiFetch<AdminAccountItem[]>("/api/v1/admin/accounts", {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    }),

  updateAdminAccount: (
    token: string,
    accountId: string,
    data: { auto_redeem?: boolean; auto_checkin?: boolean }
  ) =>
    apiFetch<AdminAccountItem>(`/api/v1/admin/accounts/${accountId}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    }),

  getAdminGiftcodes: (
    token: string,
    query?: { status?: string; search?: string; page?: number; limit?: number }
  ) => {
    const params = new URLSearchParams();
    if (query?.status) params.set("status", query.status);
    if (query?.search) params.set("search", query.search);
    if (query?.page) params.set("page", String(query.page));
    if (query?.limit) params.set("limit", String(query.limit));
    const qs = params.toString() ? `?${params.toString()}` : "";
    return apiFetch<AdminGiftCodeItem[]>(`/api/v1/admin/giftcodes${qs}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
  },

  createAdminGiftcode: (
    token: string,
    data: {
      code: string;
      source?: string;
      valid_to?: string | null;
      rewards?: string;
      is_public?: boolean;
    }
  ) =>
    apiFetch<AdminGiftCodeItem>("/api/v1/admin/giftcodes", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    }),

  getAdminGiftcodeReceivers: (token: string, code: string) =>
    apiFetch<AdminGiftcodeReceiverItem[]>(
      `/api/v1/admin/giftcodes/${encodeURIComponent(code)}/receivers`,
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      }
    ),

  getAdminRedemptions: (
    token: string,
    query?: { status?: string; code?: string; search?: string; page?: number; limit?: number }
  ) => {
    const params = new URLSearchParams();
    if (query?.status) params.set("status", query.status);
    if (query?.code) params.set("code", query.code);
    if (query?.search) params.set("search", query.search);
    if (query?.page) params.set("page", String(query.page));
    if (query?.limit) params.set("limit", String(query.limit));
    const qs = params.toString() ? `?${params.toString()}` : "";
    return apiFetch<AdminRedemptionItem[]>(`/api/v1/admin/redemptions${qs}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
  },

  retryAdminRedemption: (token: string, id: string) =>
    apiFetch<{ id: string; status: string; api_message?: string }>(
      `/api/v1/admin/redemptions/${id}/retry`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }
    ),

  retryAllAdminRedemptions: (token: string, giftCode?: string) =>
    apiFetch<AdminRetryResponse>("/api/v1/admin/redemptions/retry-all", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ gift_code: giftCode }),
    }),

  getAdminCheckins: (
    token: string,
    query?: { status?: string; game_day?: string; search?: string; page?: number; limit?: number }
  ) => {
    const params = new URLSearchParams();
    if (query?.status) params.set("status", query.status);
    if (query?.game_day) params.set("game_day", query.game_day);
    if (query?.search) params.set("search", query.search);
    if (query?.page) params.set("page", String(query.page));
    if (query?.limit) params.set("limit", String(query.limit));
    const qs = params.toString() ? `?${params.toString()}` : "";
    return apiFetch<AdminCheckinItem[]>(`/api/v1/admin/checkins${qs}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
  },

  retryAdminCheckin: (token: string, id: string) =>
    apiFetch<{ id: string; status: string }>(`/api/v1/admin/checkins/${id}/retry`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    }),

  retryAllAdminCheckins: (token: string, gameDay?: string) =>
    apiFetch<AdminRetryResponse>("/api/v1/admin/checkins/retry-all", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ game_day: gameDay }),
    }),


  // Authenticated Endpoints (Requires Bearer token)
  getUserProfile: (token: string) =>
    apiFetch<UserProfileResponse>("/api/v1/users/me", {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    }),

  getUserAccounts: (token: string) =>
    apiFetch<GameAccountItem[]>("/api/v1/users/me/accounts", {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    }),

  linkGameAccount: (token: string, uid: string) =>
    apiFetch<GameAccountItem>("/api/v1/users/me/accounts", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ uid }),
    }),

  updateGameAccount: (
    token: string,
    accountId: string,
    data: { auto_redeem?: boolean; auto_checkin?: boolean }
  ) =>
    apiFetch<GameAccountItem>(`/api/v1/users/me/accounts/${accountId}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    }),

  unlinkGameAccount: (token: string, accountId: string) =>
    apiFetch<{ message: string }>(`/api/v1/users/me/accounts/${accountId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }),

  createCheckout: (token: string, planPriceId: string) =>
    apiFetch<CheckoutResponse>("/api/v1/billing/checkout", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ plan_price_id: planPriceId }),
    }),
};

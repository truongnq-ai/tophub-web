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
  AdminWeeklyTimelineItem,
  AdminAccountCheckinHistory,
  AdminAccountsListResponse,
  AdminGiftcodesListResponse,
  AdminGiftcodeReceiversListResponse,
  AdminRedemptionsListResponse,
  AdminCheckinsListResponse,
  CommentIntentTag,
  CommentStatus,
  PublicCommentItem,
  PublicCommentsListResponse,
  AdminCommentItem,
  AdminCommentsListResponse,
  AdminBannedWordsResponse,
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

  getAdminAccounts: (
    token: string,
    query?: {
      page?: number;
      limit?: number;
      search?: string;
      plan?: string;
      server_id?: string;
      token_status?: string;
      sort_by?: string;
    }
  ) => {
    const params = new URLSearchParams();
    if (query?.page) params.set("page", String(query.page));
    if (query?.limit) params.set("limit", String(query.limit));
    if (query?.search) params.set("search", query.search);
    if (query?.plan) params.set("plan", query.plan);
    if (query?.server_id) params.set("server_id", query.server_id);
    if (query?.token_status) params.set("token_status", query.token_status);
    if (query?.sort_by) params.set("sort_by", query.sort_by);
    const qs = params.toString() ? `?${params.toString()}` : "";
    return apiFetch<AdminAccountsListResponse | AdminAccountItem[]>(
      `/api/v1/admin/accounts${qs}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      }
    );
  },

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
    return apiFetch<AdminGiftcodesListResponse | AdminGiftCodeItem[]>(`/api/v1/admin/giftcodes${qs}`, {
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

  updateAdminGiftcode: (
    token: string,
    id: string,
    data: {
      code?: string;
      source?: string;
      status?: "VALID" | "EXPIRED" | "PENDING_VALIDATION";
      valid_to?: string | null;
      rewards?: string;
      is_public?: boolean;
      trigger_auto_redeem?: boolean;
    }
  ) =>
    apiFetch<AdminGiftCodeItem>(`/api/v1/admin/giftcodes/${encodeURIComponent(id)}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    }),

  getAdminGiftcodeReceivers: (
    token: string,
    code: string,
    query?: { page?: number; limit?: number; search?: string; status?: string }
  ) => {
    const params = new URLSearchParams();
    if (query?.page) params.set("page", String(query.page));
    if (query?.limit) params.set("limit", String(query.limit));
    if (query?.search) params.set("search", query.search);
    if (query?.status) params.set("status", query.status);
    const qs = params.toString() ? `?${params.toString()}` : "";
    return apiFetch<AdminGiftcodeReceiversListResponse | AdminGiftcodeReceiverItem[]>(
      `/api/v1/admin/giftcodes/${encodeURIComponent(code)}/receivers${qs}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      }
    );
  },

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
    return apiFetch<AdminRedemptionsListResponse | AdminRedemptionItem[]>(`/api/v1/admin/redemptions${qs}`, {
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
    return apiFetch<AdminCheckinsListResponse | AdminCheckinItem[]>(`/api/v1/admin/checkins${qs}`, {
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

  getAdminAccountRedemptions: (
    token: string,
    accountId: string,
    query?: { status?: string; code?: string; search?: string; page?: number; limit?: number }
  ) => {
    const params = new URLSearchParams();
    params.set("account_id", accountId);
    if (query?.status) params.set("status", query.status);
    if (query?.code) params.set("code", query.code);
    if (query?.search) params.set("search", query.search);
    if (query?.page) params.set("page", String(query.page));
    if (query?.limit) params.set("limit", String(query.limit));
    return apiFetch<AdminRedemptionsListResponse | AdminRedemptionItem[]>(
      `/api/v1/admin/redemptions?${params.toString()}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      }
    );
  },

  getAdminAccountCheckins: (
    token: string,
    accountId: string,
    weeks = 2
  ) =>
    apiFetch<AdminAccountCheckinHistory>(`/api/v1/admin/accounts/${accountId}/checkins?weeks=${weeks}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    }),

  getAdminWeeklyTimeline: (token: string) =>
    apiFetch<AdminWeeklyTimelineItem[]>("/api/v1/admin/checkins/weekly-timeline", {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
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

  // Guide Comments Public Endpoints
  getPublicComments: (params: {
    page_key: string;
    sort?: "newest" | "most_helpful";
    viewer_uid?: string;
    page?: number;
    limit?: number;
  }) => {
    const qs = new URLSearchParams();
    qs.set("page_key", params.page_key);
    if (params.sort) qs.set("sort", params.sort);
    if (params.viewer_uid) qs.set("viewer_uid", params.viewer_uid);
    if (params.page) qs.set("page", String(params.page));
    if (params.limit) qs.set("limit", String(params.limit));
    return apiFetch<PublicCommentsListResponse>(`/api/v1/comments?${qs.toString()}`, {
      cache: "no-store",
    });
  },

  createPublicComment: (data: {
    page_key: string;
    uid: string;
    content: string;
    intent_tag?: CommentIntentTag;
    parent_id?: string | null;
    reply_to_comment_id?: string | null;
  }) =>
    apiFetch<PublicCommentItem>("/api/v1/comments", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  toggleCommentLike: (commentId: string, uid: string) =>
    apiFetch<{ id: string; viewer_has_liked: boolean; helpful_count: number }>(
      `/api/v1/comments/${encodeURIComponent(commentId)}/like`,
      {
        method: "POST",
        body: JSON.stringify({ uid }),
      }
    ),

  deleteOwnComment: (commentId: string, uid: string) =>
    apiFetch<{ id: string; status: string }>(
      `/api/v1/comments/${encodeURIComponent(commentId)}`,
      {
        method: "DELETE",
        body: JSON.stringify({ uid }),
      }
    ),

  // Guide Comments Admin Moderation Endpoints
  getAdminComments: (
    token: string,
    query?: {
      status?: string;
      page_key?: string;
      search?: string;
      page?: number;
      limit?: number;
    }
  ) => {
    const qs = new URLSearchParams();
    if (query?.status) qs.set("status", query.status);
    if (query?.page_key) qs.set("page_key", query.page_key);
    if (query?.search) qs.set("search", query.search);
    if (query?.page) qs.set("page", String(query.page));
    if (query?.limit) qs.set("limit", String(query.limit));
    const suffix = qs.toString() ? `?${qs.toString()}` : "";
    return apiFetch<AdminCommentsListResponse>(`/api/v1/admin/comments${suffix}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
  },

  updateAdminComment: (
    token: string,
    id: string,
    data: { status?: CommentStatus; is_pinned?: boolean }
  ) =>
    apiFetch<{ id: string; status: CommentStatus; is_pinned: boolean }>(
      `/api/v1/admin/comments/${encodeURIComponent(id)}`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
      }
    ),

  replyAdminComment: (
    token: string,
    data: {
      page_key: string;
      content: string;
      parent_id?: string | null;
      reply_to_comment_id?: string | null;
      is_pinned?: boolean;
    }
  ) =>
    apiFetch<AdminCommentItem>("/api/v1/admin/comments/reply", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    }),

  getAdminBannedWords: (token: string) =>
    apiFetch<AdminBannedWordsResponse>("/api/v1/admin/comments/banned-words", {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    }),

  updateAdminBannedWords: (token: string, words: string[]) =>
    apiFetch<{ custom_words: string[] }>("/api/v1/admin/comments/banned-words", {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ words }),
    }),
};


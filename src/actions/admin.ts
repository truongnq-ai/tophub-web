"use server";

import { cookies } from "next/headers";
import { apiClient } from "@/lib/api-client";
import type {
  ApiResponse,
  AdminLoginResponse,
  AdminAccountItem,
  AdminGiftCodeItem,
  AdminVerifyGiftcodeResponse,
  AdminGiftcodeReceiverItem,
  AdminRedemptionItem,
  AdminCheckinItem,
  AdminRetryResponse,
  AdminWeeklyTimelineItem,
  AdminAccountCheckinHistory,
  AdminAccountPaymentsResponse,
  AdminAccountsListResponse,
  AdminGiftcodesListResponse,
  AdminGiftcodeReceiversListResponse,
  AdminRedemptionsListResponse,
  AdminCheckinsListResponse,
  AdminWhaleAnalyticsResponse,
  AdminPaymentSyncJobState,
  AdminSystemParamItem,
  AdminSystemParamsListResponse,
} from "@/types/api";

const ADMIN_COOKIE_NAME = "tophub_admin_token";

function getAdminTokenOrUnauthorized<T>(): { token: string } | { errorResponse: ApiResponse<T> } {
  const cookieStore = cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) {
    return {
      errorResponse: {
        success: false,
        error: {
          code: "UNAUTHORIZED",
          message: "Yêu cầu đăng nhập quản trị viên",
        },
      },
    };
  }
  return { token };
}

export async function adminLoginAction(
  formData: FormData | { username: string; password: string }
): Promise<ApiResponse<AdminLoginResponse>> {
  const username = formData instanceof FormData ? (formData.get("username") as string) : formData.username;
  const password = formData instanceof FormData ? (formData.get("password") as string) : formData.password;

  if (!username || !password) {
    return {
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu",
      },
    };
  }

  const res = await apiClient.adminLogin(username, password);
  if (res.success && res.data?.token) {
    const cookieStore = cookies();
    cookieStore.set(ADMIN_COOKIE_NAME, res.data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 86400, // 24h
    });
  }

  return res;
}

export async function adminLogoutAction(): Promise<{ success: boolean }> {
  const cookieStore = cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
  return { success: true };
}

export async function getAdminAccountsAction(query?: {
  page?: number;
  limit?: number;
  search?: string;
  plan?: string;
  server_id?: string;
  country?: string;
  spender_tier?: string;
  token_status?: string;
  sort_by?: string;
}): Promise<ApiResponse<AdminAccountsListResponse | AdminAccountItem[]>> {
  const auth = getAdminTokenOrUnauthorized<AdminAccountsListResponse | AdminAccountItem[]>();
  if ("errorResponse" in auth) return auth.errorResponse;
  return apiClient.getAdminAccounts(auth.token, query);
}

export async function updateAdminAccountAction(
  accountId: string,
  data: { auto_redeem?: boolean; auto_checkin?: boolean }
): Promise<ApiResponse<AdminAccountItem>> {
  const auth = getAdminTokenOrUnauthorized<AdminAccountItem>();
  if ("errorResponse" in auth) return auth.errorResponse;
  return apiClient.updateAdminAccount(auth.token, accountId, data);
}

export async function getAdminGiftcodesAction(query?: {
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
}): Promise<ApiResponse<AdminGiftcodesListResponse | AdminGiftCodeItem[]>> {
  const auth = getAdminTokenOrUnauthorized<AdminGiftcodesListResponse | AdminGiftCodeItem[]>();
  if ("errorResponse" in auth) return auth.errorResponse;
  return apiClient.getAdminGiftcodes(auth.token, query);
}

export async function createAdminGiftcodeAction(data: {
  code: string;
  source?: string;
  valid_to?: string | null;
  rewards?: string;
  is_public?: boolean;
}): Promise<ApiResponse<AdminGiftCodeItem>> {
  const auth = getAdminTokenOrUnauthorized<AdminGiftCodeItem>();
  if ("errorResponse" in auth) return auth.errorResponse;
  return apiClient.createAdminGiftcode(auth.token, data);
}

export async function updateAdminGiftcodeAction(
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
): Promise<ApiResponse<AdminGiftCodeItem>> {
  const auth = getAdminTokenOrUnauthorized<AdminGiftCodeItem>();
  if ("errorResponse" in auth) return auth.errorResponse;
  return apiClient.updateAdminGiftcode(auth.token, id, data);
}

export async function verifyAdminGiftcodeAction(
  id: string
): Promise<ApiResponse<AdminVerifyGiftcodeResponse>> {
  const auth = getAdminTokenOrUnauthorized<AdminVerifyGiftcodeResponse>();
  if ("errorResponse" in auth) return auth.errorResponse;
  return apiClient.verifyAdminGiftcode(auth.token, id);
}

export async function getAdminGiftcodeReceiversAction(
  code: string,
  query?: { page?: number; limit?: number; search?: string; status?: string }
): Promise<ApiResponse<AdminGiftcodeReceiversListResponse | AdminGiftcodeReceiverItem[]>> {
  const auth = getAdminTokenOrUnauthorized<AdminGiftcodeReceiversListResponse | AdminGiftcodeReceiverItem[]>();
  if ("errorResponse" in auth) return auth.errorResponse;
  return apiClient.getAdminGiftcodeReceivers(auth.token, code, query);
}

export async function getAdminRedemptionsAction(query?: {
  status?: string;
  code?: string;
  search?: string;
  page?: number;
  limit?: number;
}): Promise<ApiResponse<AdminRedemptionsListResponse | AdminRedemptionItem[]>> {
  const auth = getAdminTokenOrUnauthorized<AdminRedemptionsListResponse | AdminRedemptionItem[]>();
  if ("errorResponse" in auth) return auth.errorResponse;
  return apiClient.getAdminRedemptions(auth.token, query);
}

export async function retryAdminRedemptionAction(
  id: string
): Promise<ApiResponse<{ id: string; status: string; api_message?: string }>> {
  const auth = getAdminTokenOrUnauthorized<{ id: string; status: string; api_message?: string }>();
  if ("errorResponse" in auth) return auth.errorResponse;
  return apiClient.retryAdminRedemption(auth.token, id);
}

export async function retryAllAdminRedemptionsAction(
  giftCode?: string
): Promise<ApiResponse<AdminRetryResponse>> {
  const auth = getAdminTokenOrUnauthorized<AdminRetryResponse>();
  if ("errorResponse" in auth) return auth.errorResponse;
  return apiClient.retryAllAdminRedemptions(auth.token, giftCode);
}

export async function getAdminCheckinsAction(query?: {
  status?: string;
  game_day?: string;
  search?: string;
  page?: number;
  limit?: number;
}): Promise<ApiResponse<AdminCheckinsListResponse | AdminCheckinItem[]>> {
  const auth = getAdminTokenOrUnauthorized<AdminCheckinsListResponse | AdminCheckinItem[]>();
  if ("errorResponse" in auth) return auth.errorResponse;
  return apiClient.getAdminCheckins(auth.token, query);
}

export async function retryAdminCheckinAction(
  id: string
): Promise<ApiResponse<{ id: string; status: string }>> {
  const auth = getAdminTokenOrUnauthorized<{ id: string; status: string }>();
  if ("errorResponse" in auth) return auth.errorResponse;
  return apiClient.retryAdminCheckin(auth.token, id);
}

export async function retryAllAdminCheckinsAction(
  gameDay?: string
): Promise<ApiResponse<AdminRetryResponse>> {
  const auth = getAdminTokenOrUnauthorized<AdminRetryResponse>();
  if ("errorResponse" in auth) return auth.errorResponse;
  return apiClient.retryAllAdminCheckins(auth.token, gameDay);
}

export async function getAdminAccountRedemptionsAction(
  accountId: string,
  query?: { status?: string; code?: string; search?: string; page?: number; limit?: number }
): Promise<ApiResponse<AdminRedemptionsListResponse | AdminRedemptionItem[]>> {
  const auth = getAdminTokenOrUnauthorized<AdminRedemptionsListResponse | AdminRedemptionItem[]>();
  if ("errorResponse" in auth) return auth.errorResponse;
  return apiClient.getAdminAccountRedemptions(auth.token, accountId, query);
}

export async function getAdminAccountCheckinsAction(
  accountId: string,
  weeks = 2
): Promise<ApiResponse<AdminAccountCheckinHistory>> {
  const auth = getAdminTokenOrUnauthorized<AdminAccountCheckinHistory>();
  if ("errorResponse" in auth) return auth.errorResponse;
  return apiClient.getAdminAccountCheckins(auth.token, accountId, weeks);
}

export async function getAdminWeeklyTimelineAction(): Promise<ApiResponse<AdminWeeklyTimelineItem[]>> {
  const auth = getAdminTokenOrUnauthorized<AdminWeeklyTimelineItem[]>();
  if ("errorResponse" in auth) return auth.errorResponse;
  return apiClient.getAdminWeeklyTimeline(auth.token);
}


export async function getAdminAccountPaymentsAction(
  accountId: string,
  query?: {
    page?: number;
    limit?: number;
    channel?: string;
    method?: string;
    search?: string;
    refresh?: boolean;
  }
): Promise<ApiResponse<AdminAccountPaymentsResponse>> {
  const auth = getAdminTokenOrUnauthorized<AdminAccountPaymentsResponse>();
  if ("errorResponse" in auth) return auth.errorResponse;
  return apiClient.getAdminAccountPayments(auth.token, accountId, query);
}

export async function getAdminWhaleAnalyticsAction(query?: {
  country?: string;
  server_id?: string;
  spender_tier?: string;
  tier?: string;
  activity_status?: string;
  activity?: string;
  channel?: string;
  search?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
}): Promise<ApiResponse<AdminWhaleAnalyticsResponse>> {
  const auth = getAdminTokenOrUnauthorized<AdminWhaleAnalyticsResponse>();
  if ("errorResponse" in auth) return auth.errorResponse;
  return apiClient.getAdminWhaleAnalytics(auth.token, query);
}

export async function triggerAdminPaymentsSyncAllAction(): Promise<
  ApiResponse<AdminPaymentSyncJobState>
> {
  const auth = getAdminTokenOrUnauthorized<AdminPaymentSyncJobState>();
  if ("errorResponse" in auth) return auth.errorResponse;
  return apiClient.triggerAdminPaymentsSyncAll(auth.token);
}

export async function getAdminPaymentsSyncStatusAction(): Promise<
  ApiResponse<AdminPaymentSyncJobState>
> {
  const auth = getAdminTokenOrUnauthorized<AdminPaymentSyncJobState>();
  if ("errorResponse" in auth) return auth.errorResponse;
  return apiClient.getAdminPaymentsSyncStatus(auth.token);
}

export async function getAdminSystemParamsAction(query?: {
  group?: string;
  status?: string;
  search?: string;
}): Promise<ApiResponse<AdminSystemParamsListResponse>> {
  const auth = getAdminTokenOrUnauthorized<AdminSystemParamsListResponse>();
  if ("errorResponse" in auth) return auth.errorResponse;
  return apiClient.getAdminSystemParams(auth.token, query);
}

export async function createAdminSystemParamAction(payload: {
  group: string;
  code: string;
  value: string;
  description?: string | null;
  status?: "ACTIVE" | "INACTIVE";
}): Promise<ApiResponse<AdminSystemParamItem>> {
  const auth = getAdminTokenOrUnauthorized<AdminSystemParamItem>();
  if ("errorResponse" in auth) return auth.errorResponse;
  return apiClient.createAdminSystemParam(auth.token, payload);
}

export async function updateAdminSystemParamAction(
  id: string,
  payload: {
    group?: string;
    code?: string;
    value?: string;
    description?: string | null;
    status?: "ACTIVE" | "INACTIVE";
  }
): Promise<ApiResponse<AdminSystemParamItem>> {
  const auth = getAdminTokenOrUnauthorized<AdminSystemParamItem>();
  if ("errorResponse" in auth) return auth.errorResponse;
  return apiClient.updateAdminSystemParam(auth.token, id, payload);
}

export async function deleteAdminSystemParamAction(
  id: string
): Promise<ApiResponse<AdminSystemParamItem>> {
  const auth = getAdminTokenOrUnauthorized<AdminSystemParamItem>();
  if ("errorResponse" in auth) return auth.errorResponse;
  return apiClient.deleteAdminSystemParam(auth.token, id);
}

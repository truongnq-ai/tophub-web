"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { createBackendToken } from "@/lib/auth-token";
import { apiClient } from "@/lib/api-client";
import type { ApiResponse, CheckoutResponse, PlayerPreviewResponse, PlayerStatusResponse } from "@/types/api";

export async function previewPlayerAction(
  uid: string
): Promise<ApiResponse<PlayerPreviewResponse>> {
  if (!uid || !/^\d{10,20}$/.test(uid)) {
    return {
      success: false,
      error: {
        code: "INVALID_UID",
        message: "UID game phải chứa từ 10 đến 20 chữ số",
      },
    };
  }

  return apiClient.previewPlayer(uid);
}

export async function createPublicCheckoutAction(
  uid: string,
  planPriceId: string
): Promise<ApiResponse<CheckoutResponse>> {
  if (!uid || !/^\d{10,20}$/.test(uid)) {
    return {
      success: false,
      error: {
        code: "INVALID_UID",
        message: "UID game không hợp lệ",
      },
    };
  }

  return apiClient.createPublicCheckout(uid, planPriceId);
}

export async function checkPublicPaymentStatusAction(
  uid: string
): Promise<{ success: boolean; isPaid: boolean }> {
  if (!uid) return { success: false, isPaid: false };
  try {
    const res = await apiClient.getPlayerStatus(uid);
    if (res.success && res.data) {
      return { success: true, isPaid: res.data.active_plan === "PRO" };
    }
  } catch {
    // ignore
  }
  return { success: false, isPaid: false };
}

export async function getPlayerStatusAction(
  uid: string
): Promise<ApiResponse<PlayerStatusResponse>> {
  if (!uid || !/^\d{10,20}$/.test(uid)) {
    return {
      success: false,
      error: {
        code: "INVALID_UID",
        message: "UID game phải chứa từ 10 đến 20 chữ số",
      },
    };
  }

  return apiClient.getPlayerStatus(uid);
}

export async function createCheckoutAction(
  planPriceId: string,
  uid?: string
): Promise<ApiResponse<CheckoutResponse>> {
  if (uid) {
    return createPublicCheckoutAction(uid, planPriceId);
  }

  const session = await getServerSession(authOptions);
  if (!session?.user?.discord_id) {
    return {
      success: false,
      data: undefined,
      error: {
        code: "UNAUTHORIZED",
        message: "Vui lòng nhập UID game hoặc đăng nhập Discord",
      },
    };
  }

  const authSecret = process.env.AUTH_SECRET;
  if (!authSecret) {
    return {
      success: false,
      data: undefined,
      error: {
        code: "INTERNAL_ERROR",
        message: "AUTH_SECRET is not configured on the server",
      },
    };
  }

  const token = createBackendToken(session.user.discord_id, authSecret);
  return apiClient.createCheckout(token, planPriceId);
}

export async function checkPaymentStatusAction(): Promise<{ success: boolean; isPaid: boolean }> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.discord_id) {
    return { success: false, isPaid: false };
  }

  const authSecret = process.env.AUTH_SECRET;
  if (!authSecret) {
    return { success: false, isPaid: false };
  }

  const token = createBackendToken(session.user.discord_id, authSecret);
  const profile = await apiClient.getUserProfile(token);

  if (profile.success && profile.data) {
    const isPro = profile.data.active_plan === "PRO";
    return { success: true, isPaid: isPro };
  }

  return { success: false, isPaid: false };
}

"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { createBackendToken } from "@/lib/auth-token";
import { apiClient } from "@/lib/api-client";
import type { ApiResponse, CheckoutResponse } from "@/types/api";

export async function createCheckoutAction(
  planPriceId: string
): Promise<ApiResponse<CheckoutResponse>> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.discord_id) {
    return {
      success: false,
      data: undefined,
      error: {
        code: "UNAUTHORIZED",
        message: "Vui lòng đăng nhập Discord trước khi mua gói cước",
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

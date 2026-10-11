"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { createBackendToken } from "@/lib/auth-token";
import { apiClient } from "@/lib/api-client";
import { revalidatePath } from "next/cache";
import type { ApiResponse, GameAccountItem } from "@/types/api";

async function getAuthenticatedToken(): Promise<string> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.discord_id) {
    throw new Error("UNAUTHORIZED");
  }
  const authSecret = process.env.AUTH_SECRET;
  if (!authSecret) {
    throw new Error("AUTH_SECRET is not configured");
  }
  return createBackendToken(session.user.discord_id, authSecret);
}

export async function linkAccountAction(uid: string): Promise<ApiResponse<GameAccountItem>> {
  try {
    const token = await getAuthenticatedToken();
    const res = await apiClient.linkGameAccount(token, uid);
    if (res.success) {
      revalidatePath("/[locale]/dashboard", "page");
    }
    return res;
  } catch (err: any) {
    return {
      success: false,
      data: undefined,
      error: {
        code: "UNAUTHORIZED",
        message: err?.message || "Vui lòng đăng nhập lại để tiếp tục",
      },
    };
  }
}

export async function updateAccountAction(
  accountId: string,
  data: { auto_redeem?: boolean; auto_checkin?: boolean }
): Promise<ApiResponse<GameAccountItem>> {
  try {
    const token = await getAuthenticatedToken();
    const res = await apiClient.updateGameAccount(token, accountId, data);
    if (res.success) {
      revalidatePath("/[locale]/dashboard", "page");
    }
    return res;
  } catch (err: any) {
    return {
      success: false,
      data: undefined,
      error: {
        code: "UNAUTHORIZED",
        message: err?.message || "Vui lòng đăng nhập lại để tiếp tục",
      },
    };
  }
}

export async function unlinkAccountAction(accountId: string): Promise<ApiResponse<{ message: string }>> {
  try {
    const token = await getAuthenticatedToken();
    const res = await apiClient.unlinkGameAccount(token, accountId);
    if (res.success) {
      revalidatePath("/[locale]/dashboard", "page");
    }
    return res;
  } catch (err: any) {
    return {
      success: false,
      data: undefined,
      error: {
        code: "UNAUTHORIZED",
        message: err?.message || "Vui lòng đăng nhập lại để tiếp tục",
      },
    };
  }
}

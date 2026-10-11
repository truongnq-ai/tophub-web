"use server";

import { cookies } from "next/headers";
import { apiClient } from "@/lib/api-client";
import type { ApiResponse, AdminLoginResponse, AdminAccountItem } from "@/types/api";

const ADMIN_COOKIE_NAME = "tophub_admin_token";

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

export async function getAdminAccountsAction(): Promise<ApiResponse<AdminAccountItem[]>> {
  const cookieStore = cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  if (!token) {
    return {
      success: false,
      error: {
        code: "UNAUTHORIZED",
        message: "Yêu cầu đăng nhập quản trị viên",
      },
    };
  }

  return apiClient.getAdminAccounts(token);
}

export async function updateAdminAccountAction(
  accountId: string,
  data: { auto_redeem?: boolean; auto_checkin?: boolean }
): Promise<ApiResponse<AdminAccountItem>> {
  const cookieStore = cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  if (!token) {
    return {
      success: false,
      error: {
        code: "UNAUTHORIZED",
        message: "Yêu cầu đăng nhập quản trị viên",
      },
    };
  }

  return apiClient.updateAdminAccount(token, accountId, data);
}

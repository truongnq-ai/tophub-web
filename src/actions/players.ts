"use server";

import { cookies } from "next/headers";
import { apiClient } from "@/lib/api-client";
import type {
  ApiResponse,
  PlayerPreviewResponse,
  PlayerStatusResponse,
  PlayerEnrollResponse,
  PlayerRunNowResponse,
  PlayerSettingsResponse,
} from "@/types/api";

const ACTIVE_UID_COOKIE = "tophub_active_uid";

/**
 * Tra cứu thông tin người chơi công khai theo UID (kiểm tra tồn tại và trạng thái kích hoạt bot)
 */
export async function previewPlayerAction(uid: string): Promise<ApiResponse<PlayerPreviewResponse>> {
  const cleanUid = uid.trim();
  if (!cleanUid || !/^\d{10,20}$/.test(cleanUid)) {
    return {
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Vui lòng nhập UID game hợp lệ (10 đến 20 chữ số)",
      },
    };
  }

  return apiClient.previewPlayer(cleanUid);
}

/**
 * Lấy trạng thái hoạt động của bot cho UID (thời hạn, auto-redeem, check-in, lịch sử giftcode)
 */
export async function getPlayerStatusAction(uid: string): Promise<ApiResponse<PlayerStatusResponse>> {
  const cleanUid = uid.trim();
  if (!cleanUid || !/^\d{10,20}$/.test(cleanUid)) {
    return {
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Vui lòng nhập UID game hợp lệ (10 đến 20 chữ số)",
      },
    };
  }

  return apiClient.getPlayerStatus(cleanUid);
}

/**
 * Kích hoạt đăng ký bot tự động cho UID
 */
export async function enrollPlayerAction(uid: string): Promise<ApiResponse<PlayerEnrollResponse>> {
  const cleanUid = uid.trim();
  if (!cleanUid || !/^\d{10,20}$/.test(cleanUid)) {
    return {
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Vui lòng nhập UID game hợp lệ (10 đến 20 chữ số)",
      },
    };
  }

  const res = await apiClient.enrollPlayer(cleanUid);
  if (res.success && res.data) {
    // Tự động set active cookie khi enroll thành công
    const cookieStore = cookies();
    cookieStore.set(ACTIVE_UID_COOKIE, cleanUid, {
      path: "/",
      maxAge: 90 * 86400, // 90 ngày
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
  }

  return res;
}

/**
 * Kích hoạt chạy bot tức thì (Run Now)
 */
export async function triggerRunNowAction(uid: string): Promise<ApiResponse<PlayerRunNowResponse>> {
  const cleanUid = uid.trim();
  if (!cleanUid || !/^\d{10,20}$/.test(cleanUid)) {
    return {
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Vui lòng nhập UID game hợp lệ (10 đến 20 chữ số)",
      },
    };
  }

  return apiClient.triggerRunNow(cleanUid);
}

/**
 * Cập nhật cấu hình tính năng bot (auto_redeem, auto_checkin)
 */
export async function updatePlayerSettingsAction(
  uid: string,
  settings: { auto_redeem?: boolean; auto_checkin?: boolean }
): Promise<ApiResponse<PlayerSettingsResponse>> {
  const cleanUid = uid.trim();
  if (!cleanUid || !/^\d{10,20}$/.test(cleanUid)) {
    return {
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Vui lòng nhập UID game hợp lệ (10 đến 20 chữ số)",
      },
    };
  }

  return apiClient.updatePlayerSettings(cleanUid, settings);
}

/**
 * Đặt hoặc xóa UID đang kích hoạt trên thiết bị (Cookie)
 */
export async function setActiveUidCookieAction(uid: string | null): Promise<{ success: boolean }> {
  const cookieStore = cookies();
  if (uid) {
    cookieStore.set(ACTIVE_UID_COOKIE, uid.trim(), {
      path: "/",
      maxAge: 90 * 86400,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
  } else {
    cookieStore.delete(ACTIVE_UID_COOKIE);
  }
  return { success: true };
}

/**
 * Đọc UID đang kích hoạt trên thiết bị (Server Component)
 */
export async function getActiveUidCookieAction(): Promise<string | null> {
  const cookieStore = cookies();
  return cookieStore.get(ACTIVE_UID_COOKIE)?.value || null;
}

"use server";

import { cookies } from "next/headers";
import { apiClient } from "@/lib/api-client";
import type {
  ApiResponse,
  CommentIntentTag,
  CommentStatus,
  PublicCommentItem,
  PublicCommentsListResponse,
  AdminCommentItem,
  AdminCommentsListResponse,
  AdminBannedWordsResponse,
} from "@/types/api";

const ADMIN_COOKIE_NAME = "tophub_admin_token";

function getAdminTokenOrError<T>(): { token: string } | { errorResponse: ApiResponse<T> } {
  try {
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
  } catch {
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
}

export async function getPublicCommentsAction(params: {
  page_key: string;
  sort?: "newest" | "most_helpful";
  viewer_uid?: string;
  page?: number;
  limit?: number;
}): Promise<ApiResponse<PublicCommentsListResponse>> {
  return apiClient.getPublicComments(params);
}

export async function createPublicCommentAction(data: {
  page_key: string;
  uid: string;
  content: string;
  intent_tag?: CommentIntentTag;
  parent_id?: string | null;
  reply_to_comment_id?: string | null;
}): Promise<ApiResponse<PublicCommentItem>> {
  return apiClient.createPublicComment(data);
}

export async function toggleCommentLikeAction(
  commentId: string,
  uid: string
): Promise<ApiResponse<{ id: string; viewer_has_liked: boolean; helpful_count: number }>> {
  return apiClient.toggleCommentLike(commentId, uid);
}

export async function deleteOwnCommentAction(
  commentId: string,
  uid: string
): Promise<ApiResponse<{ id: string; status: string }>> {
  return apiClient.deleteOwnComment(commentId, uid);
}

export async function getAdminCommentsAction(query?: {
  status?: string;
  page_key?: string;
  search?: string;
  page?: number;
  limit?: number;
}): Promise<ApiResponse<AdminCommentsListResponse>> {
  const auth = getAdminTokenOrError<AdminCommentsListResponse>();
  if ("errorResponse" in auth) return auth.errorResponse;
  return apiClient.getAdminComments(auth.token, query);
}

export async function updateAdminCommentAction(
  id: string,
  data: { status?: CommentStatus; is_pinned?: boolean }
): Promise<ApiResponse<{ id: string; status: CommentStatus; is_pinned: boolean }>> {
  const auth = getAdminTokenOrError<{ id: string; status: CommentStatus; is_pinned: boolean }>();
  if ("errorResponse" in auth) return auth.errorResponse;
  return apiClient.updateAdminComment(auth.token, id, data);
}

export async function replyAdminCommentAction(data: {
  page_key: string;
  content: string;
  parent_id?: string | null;
  reply_to_comment_id?: string | null;
  is_pinned?: boolean;
}): Promise<ApiResponse<AdminCommentItem>> {
  const auth = getAdminTokenOrError<AdminCommentItem>();
  if ("errorResponse" in auth) return auth.errorResponse;
  return apiClient.replyAdminComment(auth.token, data);
}

export async function getAdminBannedWordsAction(): Promise<ApiResponse<AdminBannedWordsResponse>> {
  const auth = getAdminTokenOrError<AdminBannedWordsResponse>();
  if ("errorResponse" in auth) return auth.errorResponse;
  return apiClient.getAdminBannedWords(auth.token);
}

export async function updateAdminBannedWordsAction(
  words: string[]
): Promise<ApiResponse<{ custom_words: string[] }>> {
  const auth = getAdminTokenOrError<{ custom_words: string[] }>();
  if ("errorResponse" in auth) return auth.errorResponse;
  return apiClient.updateAdminBannedWords(auth.token, words);
}

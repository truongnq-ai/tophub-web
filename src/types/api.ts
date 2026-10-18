export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: { code: string; message: string };
  message?: string;
}

export interface GiftCodeItem {
  code: string;
  status: "ACTIVE" | "EXPIRED" | "VALID" | "PENDING_VALIDATION" | "INVALID";
  discovered_at: string;
  expires_at: string | null;
  valid_from?: string | null;
  valid_to?: string | null;
}

export interface PublicGiftcodesResponse {
  items: GiftCodeItem[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

export interface UserProfileResponse {
  id: string;
  discord_id: string;
  active_plan: "FREE" | "PRO";
  subscription: {
    status: string;
    ends_at: string;
    source: string;
  } | null;
  trial_used: boolean;
}

export interface GameAccountItem {
  id: string;
  uid: string;
  server_id: string;
  nickname: string;
  auto_redeem: boolean;
  auto_checkin: boolean;
  created_at: string;
}

export interface PlanPriceItem {
  id: string;
  months: number;
  amount: number;
  active: boolean;
}

export interface PlanItem {
  id: string;
  code: "FREE" | "PRO";
  name: string;
  description: string | null;
  features: Array<{ id: string; key: string; value: string }>;
  prices: PlanPriceItem[];
}

export interface CheckoutResponse {
  orderCode: number;
  amount: number;
  planName: string;
  months: number;
}

export interface PlayerPreviewResponse {
  uid: string;
  nickname: string;
  server_id: string;
  is_enrolled?: boolean;
}

export interface PlayerEnrollResponse {
  uid: string;
  nickname: string;
  server_id: string;
  is_enrolled: boolean;
  auto_redeem: boolean;
  auto_checkin: boolean;
  message?: string;
}

export interface PlayerRunNowResponse {
  uid: string;
  checkin_status: string;
  newly_redeemed: number;
  message: string;
}

export interface PlayerSettingsResponse {
  uid: string;
  auto_redeem: boolean;
  auto_checkin: boolean;
}

export interface PlayerStatusResponse {
  uid: string;
  nickname: string;
  server_id: string;
  active_plan: "FREE" | "PRO";
  ends_at: string | null;
  auto_redeem: boolean;
  auto_checkin: boolean;
  token_status: string;
  recent_redemptions: Array<{
    code: string;
    status: "SUCCESS" | "ALREADY_REDEEMED" | "EXPIRED" | "FAILED" | string;
    redeemed_at: string;
  }>;
}

export interface AdminLoginResponse {
  token: string;
  expires_at: string;
}

export interface AdminAccountItem {
  id: string;
  uid: string;
  nickname: string;
  server_id: string;
  active_plan: string;
  ends_at: string | null;
  auto_redeem: boolean;
  auto_checkin: boolean;
  token_status: string;
  created_at: string;
}

export interface AdminGiftCodeItem {
  id: string;
  code: string;
  status: "VALID" | "EXPIRED" | "PENDING_VALIDATION";
  source: string;
  valid_from?: string | null;
  valid_to: string | null;
  discovered_at: string;
  redeemed_count: number;
  total_accounts: number;
  rewards?: string;
  is_public: boolean;
}

export interface AdminGiftcodeReceiverItem {
  id: string;
  account_id?: string;
  uid: string;
  nickname: string;
  server_id: string;
  status: "SUCCESS" | "PENDING" | "FAILED";
  redeemed_at: string;
}

export interface AdminRedemptionItem {
  id: string;
  game_account_id: string;
  uid: string;
  nickname: string;
  server_id: string;
  gift_code: string;
  status: "SUCCESS" | "ALREADY_REDEEMED" | "EXPIRED" | "FAILED";
  api_message: string;
  created_at: string;
}

export interface AdminCheckinItem {
  id: string;
  game_account_id: string;
  uid: string;
  nickname: string;
  server_id: string;
  game_day: string;
  status: "SUCCESS" | "ALREADY_CHECKED" | "FAILED" | "PENDING";
  created_at: string;
}

export interface AdminRetryResponse {
  retried_count: number;
  message: string;
}

export interface AdminWeeklyTimelineItem {
  day_of_week: number;
  game_day: string;
  label: string;
  success_count: number;
  total_eligible: number;
  is_today: boolean;
  is_future: boolean;
}

export interface AdminAccountCheckinDay {
  game_day: string;
  day_of_week: number;
  label: string;
  status: "SUCCESS" | "ALREADY_CHECKED" | "FAILED" | "UNCHECKED" | "UPCOMING" | string;
  is_today: boolean;
  is_future: boolean;
  checked_at: string | null;
}

export interface AdminAccountCheckinHistory {
  account: {
    id: string;
    uid: string;
    nickname: string;
    server_id: string;
  };
  stats: {
    total_days: number;
    checked_days: number;
    streak: number;
  };
  weeks: {
    current_week: AdminAccountCheckinDay[];
    previous_week: AdminAccountCheckinDay[];
  };
}

export type CommentIntentTag = "DISCUSSION" | "QUESTION" | "TIP";
export type CommentStatus = "APPROVED" | "PENDING_REVIEW" | "HIDDEN" | "DELETED";

export interface PublicCommentItem {
  id: string;
  page_key: string;
  author_nickname: string;
  author_server_id: string;
  is_admin_author: boolean;
  is_pro_author: boolean;
  parent_id: string | null;
  reply_to_comment_id: string | null;
  reply_to_nickname: string | null;
  reply_to_server_id: string | null;
  intent_tag: CommentIntentTag;
  content: string;
  status: "APPROVED" | "PENDING_REVIEW";
  is_pinned: boolean;
  helpful_count: number;
  viewer_has_liked: boolean;
  is_own_comment: boolean;
  created_at: string;
  replies?: PublicCommentItem[];
}

export interface PublicCommentsListResponse {
  items: PublicCommentItem[];
  total: number;
  page: number;
  limit: number;
}

export interface AdminCommentItem {
  id: string;
  page_key: string;
  author_uid: string | null;
  author_nickname: string;
  author_server_id: string;
  is_admin_author: boolean;
  is_pro_author: boolean;
  parent_id: string | null;
  reply_to_comment_id: string | null;
  reply_to_nickname: string | null;
  reply_to_server_id: string | null;
  intent_tag: CommentIntentTag;
  content: string;
  status: CommentStatus;
  flagged_reason: string | null;
  is_pinned: boolean;
  helpful_count: number;
  created_at: string;
}

export interface PaginatedAdminResponse<T, TSummary = undefined> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
  summary?: TSummary;
}

export interface AdminAccountsSummary {
  total_accounts: number;
  pro_count: number;
  active_bots_count: number;
  servers: string[];
}

export interface AdminGiftcodesSummary {
  total_codes: number;
  active_codes_count: number;
}

export interface AdminRedemptionsSummary {
  total_redemptions: number;
  success_count?: number;
  already_redeemed_count?: number;
  expired_count?: number;
  failed_count: number;
  distinct_codes: string[];
}

export interface AdminCheckinsSummary {
  total_checkins: number;
  failed_count: number;
  pending_count: number;
  already_checked_count: number;
  success_count: number;
  distinct_days: string[];
}

export type AdminAccountsListResponse = PaginatedAdminResponse<AdminAccountItem, AdminAccountsSummary>;
export type AdminGiftcodesListResponse = PaginatedAdminResponse<AdminGiftCodeItem, AdminGiftcodesSummary>;
export type AdminGiftcodeReceiversListResponse = PaginatedAdminResponse<AdminGiftcodeReceiverItem>;
export type AdminRedemptionsListResponse = PaginatedAdminResponse<AdminRedemptionItem, AdminRedemptionsSummary>;
export type AdminCheckinsListResponse = PaginatedAdminResponse<AdminCheckinItem, AdminCheckinsSummary>;

export interface AdminCommentsListResponse {
  items: AdminCommentItem[];
  total: number;
  page: number;
  limit: number;
  total_pages?: number;
  summary: {
    pending_count: number;
    approved_count: number;
    hidden_count: number;
  };
}

export interface AdminBannedWordsResponse {
  default_words: string[];
  custom_words: string[];
}

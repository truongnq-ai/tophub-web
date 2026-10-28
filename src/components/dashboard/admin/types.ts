import type {
  AdminAccountItem,
  AdminGiftCodeItem,
  AdminGiftcodeReceiverItem,
  AdminRedemptionItem,
  AdminCheckinItem,
  AdminWeeklyTimelineItem,
  AdminAccountCheckinHistory,
  AdminAccountCheckinDay,
  SpenderTier,
  PaymentChannel,
  SpenderActivityStatus,
  AdminPaymentOrderItem,
  AdminPaymentMethodStat,
  AdminAccountPaymentsSummary,
  AdminAccountPaymentsResponse,
  AdminWhaleLeaderboardItem,
  AdminCountryBreakdownItem,
  AdminServerBreakdownItem,
  AdminPaymentSyncJobState,
  AdminWhaleAnalyticsSummary,
  AdminWhaleAnalyticsResponse,
  AdminSystemParamItem,
  AdminSystemParamsListResponse,
  PaginatedAdminResponse,
  AdminAccountsSummary,
  AdminGiftcodesSummary,
  AdminRedemptionsSummary,
  AdminCheckinsSummary,
  AdminAccountsListResponse,
  AdminGiftcodesListResponse,
  AdminGiftcodeReceiversListResponse,
  AdminRedemptionsListResponse,
  AdminCheckinsListResponse,
} from "@/types/api";

export type {
  AdminAccountItem,
  AdminGiftCodeItem,
  AdminGiftcodeReceiverItem,
  AdminRedemptionItem,
  AdminCheckinItem,
  AdminWeeklyTimelineItem,
  AdminAccountCheckinHistory,
  AdminAccountCheckinDay,
  SpenderTier,
  PaymentChannel,
  SpenderActivityStatus,
  AdminPaymentOrderItem,
  AdminPaymentMethodStat,
  AdminAccountPaymentsSummary,
  AdminAccountPaymentsResponse,
  AdminWhaleLeaderboardItem,
  AdminCountryBreakdownItem,
  AdminServerBreakdownItem,
  AdminPaymentSyncJobState,
  AdminWhaleAnalyticsSummary,
  AdminWhaleAnalyticsResponse,
  AdminSystemParamItem,
  AdminSystemParamsListResponse,
  PaginatedAdminResponse,
  AdminAccountsSummary,
  AdminGiftcodesSummary,
  AdminRedemptionsSummary,
  AdminCheckinsSummary,
  AdminAccountsListResponse,
  AdminGiftcodesListResponse,
  AdminGiftcodeReceiversListResponse,
  AdminRedemptionsListResponse,
  AdminCheckinsListResponse,
};

export type AdminGiftCode = AdminGiftCodeItem;
export type GiftCodeReceiver = AdminGiftcodeReceiverItem;
export type AdminRedemption = AdminRedemptionItem;
export type AdminCheckin = AdminCheckinItem;
export type WeeklyTimelineItem = AdminWeeklyTimelineItem;
export type AccountCheckinHistory = AdminAccountCheckinHistory;
export type AccountCheckinDay = AdminAccountCheckinDay;

export function extractPaginatedResult<T, TSummary = undefined>(
  data: PaginatedAdminResponse<T, TSummary> | T[] | undefined,
  fallbackPage = 1,
  fallbackLimit = 20
): PaginatedAdminResponse<T, TSummary> & { isServerPaginated: boolean } {
  if (Array.isArray(data)) {
    return {
      items: data,
      total: data.length,
      page: fallbackPage,
      limit: fallbackLimit,
      total_pages: Math.ceil(data.length / fallbackLimit),
      isServerPaginated: false,
    };
  }
  if (data && typeof data === "object" && "items" in data && Array.isArray(data.items)) {
    const limit = data.limit || fallbackLimit;
    const total = typeof data.total === "number" ? data.total : data.items.length;
    return {
      items: data.items,
      total,
      page: data.page || fallbackPage,
      limit,
      total_pages: typeof data.total_pages === "number" ? data.total_pages : Math.ceil(total / limit),
      summary: data.summary,
      isServerPaginated: true,
    };
  }
  return {
    items: [],
    total: 0,
    page: fallbackPage,
    limit: fallbackLimit,
    total_pages: 0,
    isServerPaginated: false,
  };
}

import type {
  AdminAccountItem,
  AdminGiftCodeItem,
  AdminGiftcodeReceiverItem,
  AdminRedemptionItem,
  AdminCheckinItem,
  AdminWeeklyTimelineItem,
  AdminAccountCheckinHistory,
  AdminAccountCheckinDay,
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
};

export type AdminGiftCode = AdminGiftCodeItem;
export type GiftCodeReceiver = AdminGiftcodeReceiverItem;
export type AdminRedemption = AdminRedemptionItem;
export type AdminCheckin = AdminCheckinItem;
export type WeeklyTimelineItem = AdminWeeklyTimelineItem;
export type AccountCheckinHistory = AdminAccountCheckinHistory;
export type AccountCheckinDay = AdminAccountCheckinDay;


import type { GuideCategory } from "../types";
import { ARTICLE_5_1_TIMELINE_AND_RULES } from "./group-9/5.1-timeline-and-rules";
import { ARTICLE_5_2_TASKS_AND_MILESTONES } from "./group-9/5.2-tasks-and-milestones";
import { ARTICLE_5_3_SHOP_AND_DROPS } from "./group-9/5.3-shop-and-drops";
import { ARTICLE_5_4_PACKS_AND_ROI } from "./group-9/5.4-packs-and-roi";
import { ARTICLE_5_5_HOARDING_AND_PREP_PLAN } from "./group-9/5.5-hoarding-and-prep-plan";
import { ARTICLE_5_6_PRO_PLAYER_MECHANICS } from "./group-9/5.6-pro-player-mechanics";

export const GROUP_9_EVENT_PLAYBOOKS_CATEGORY: GuideCategory = {
  order: 9,
  displayOrder: 5,
  slug: "event-playbooks",
  zoneId: "zone_events_roadmap",
  iconName: "Flame",
  title: {
    vi: "Danh sách event",
    en: "Event List",
  },
  description: {
    vi: "Bách khoa toàn thư 6 chuyên mục chuẩn hóa cho toàn bộ sự kiện (S0 ➔ GAR): (1) Trục thời gian & Thể lệ chính, (2) Nhiệm vụ & Mốc điểm Free vs VIP, (3) Cửa hàng & Vật phẩm rơi, (4) Gói nạp & Phân tích ROI, (5) Kế hoạch Tích trữ Ngắn/Dài hạn và (6) Kỹ thuật Cao thủ Pre-cooking & Triple-Dip.",
    en: "Standardized 6-section Event Encyclopedia (S0 ➔ GAR): (1) Timeline & Core Rules, (2) Tasks & Free vs VIP Milestones, (3) Event Shop & Item Drops, (4) Packs & ROI Analysis, (5) Short/Long-Term Hoarding Plan, and (6) Pro-Player Pre-cooking & Triple-Dip Mechanics.",
  },
  articles: [
    ARTICLE_5_1_TIMELINE_AND_RULES,
    ARTICLE_5_2_TASKS_AND_MILESTONES,
    ARTICLE_5_3_SHOP_AND_DROPS,
    ARTICLE_5_4_PACKS_AND_ROI,
    ARTICLE_5_5_HOARDING_AND_PREP_PLAN,
    ARTICLE_5_6_PRO_PLAYER_MECHANICS,
  ],
};

export {
  ARTICLE_5_1_TIMELINE_AND_RULES,
  ARTICLE_5_2_TASKS_AND_MILESTONES,
  ARTICLE_5_3_SHOP_AND_DROPS,
  ARTICLE_5_4_PACKS_AND_ROI,
  ARTICLE_5_5_HOARDING_AND_PREP_PLAN,
  ARTICLE_5_6_PRO_PLAYER_MECHANICS,
};

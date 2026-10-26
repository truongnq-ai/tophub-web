import type { GuideCategory } from "../types";
import { ARTICLE_9_1_S0_MAJOR_POINT_RACES } from "./group-9/9.1-s0-major-point-races";
import { ARTICLE_9_2_S0_GACHA_MYTHIC_BANNERS } from "./group-9/9.2-s0-gacha-mythic-banners";
import { ARTICLE_9_3_S0_SATELLITES_AND_RAIDS } from "./group-9/9.3-s0-satellites-and-raids";

export const GROUP_9_EVENT_PLAYBOOKS_CATEGORY: GuideCategory = {
  order: 9,
  slug: "event-playbooks",
  zoneId: "zone_events_roadmap",
  iconName: "Flame",
  title: {
    vi: "Cẩm Nang Chi Tiết Sự Kiện (S0 ➔ GAR)",
    en: "Detailed Event Playbooks (S0 ➔ GAR)",
  },
  description: {
    vi: "Phân tích thực chiến 10 sự kiện từ Ngày 1 Mùa S0 đến hết Đua Vũ Trang Bang Hội (GAR — Ngày 28+): cách tích đồ, lịch xả từng ngày, gói mồi $0.99/$4.99 cho Storm Maiden (Ngày 27) và bảng xếp hạng đổi Shop.",
    en: "Tactical playbooks for all 10 events from S0 Day 1 through Guild Arms Race (GAR — Day 28+): hoarding targets, day-by-day execution, $0.99/$4.99 pack stacking for Storm Maiden (Day 27), and shop tier lists.",
  },
  articles: [
    ARTICLE_9_1_S0_MAJOR_POINT_RACES,
    ARTICLE_9_2_S0_GACHA_MYTHIC_BANNERS,
    ARTICLE_9_3_S0_SATELLITES_AND_RAIDS,
  ],
};

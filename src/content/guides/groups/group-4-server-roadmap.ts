import type { GuideCategory } from "../types";
import { ARTICLE_4_1_PRESEASON_MYTHIC_CALENDAR } from "./group-4/4.1-preseason-mythic-calendar";
import { ARTICLE_4_2_HORDE_PIVOT_ROADMAP } from "./group-4/4.2-horde-pivot-roadmap";
import { ARTICLE_4_3_SEASON_1_TO_4_ROADMAP } from "./group-4/4.3-season-1-to-4-roadmap";

export const GROUP_4_SERVER_ROADMAP_CATEGORY: GuideCategory = {
  order: 4,
  slug: "roadmap",
  zoneId: "zone_events_roadmap",
  iconName: "Map",
  title: {
    vi: "Lộ Trình Server & Chuyển Giao Mùa",
    en: "Server Roadmap & Seasonal Transitions",
  },
  description: {
    vi: "Lịch ra mắt Tướng Đỏ Pre-Season (Ngày 1–65), Phác đồ chuyển phe Bộ Lạc Zero-Loss và Lộ trình Công trình / Mùa giải S1 ➔ S4.",
    en: "Pre-Season Mythic release calendar (Days 1–65), Zero-Loss Horde pivot blueprint, and Season 1 ➔ Season 4 building & progression roadmap.",
  },
  articles: [
    ARTICLE_4_1_PRESEASON_MYTHIC_CALENDAR,
    ARTICLE_4_2_HORDE_PIVOT_ROADMAP,
    ARTICLE_4_3_SEASON_1_TO_4_ROADMAP,
  ],
};

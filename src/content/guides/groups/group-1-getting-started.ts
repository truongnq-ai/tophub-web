import type { GuideCategory } from "../types";
import { ARTICLE_1_1_OVERVIEW } from "./group-1/1.1-overview";
import { ARTICLE_1_2_STRICT_ONE_QUEUE } from "./group-1/1.2-strict-one-queue-rule";
import { ARTICLE_1_3_DIAMOND_SPENDING } from "./group-1/1.3-diamond-and-spending-guide";
import { ARTICLE_1_4_TOP_10_TRAPS } from "./group-1/1.4-top-10-account-traps";

export const GROUP_1_GETTING_STARTED_CATEGORY: GuideCategory = {
  order: 1,
  slug: "getting-started",
  zoneId: "zone_onboarding_meta",
  iconName: "Sprout",
  title: {
    vi: "Nhập Môn & Luật Sống Còn",
    en: "Getting Started & Survival Rules",
  },
  description: {
    vi: "Bản đồ 7 trụ cột sức mạnh, lộ trình 90 ngày chuyển giao Bộ Lạc, Quy tắc 1 Đội hình khắc nghiệt, quản trị Kim Cương S-Tier và 10 cạm bẫy phế acc kèm phác đồ cấp cứu.",
    en: "The 7-pillar power architecture, 90-day Horde Pivot roadmap, Strict 1-Queue Rule, S-Tier Diamond management, and the Top 10 account-ruining traps with recovery protocols.",
  },
  articles: [
    ARTICLE_1_1_OVERVIEW,
    ARTICLE_1_2_STRICT_ONE_QUEUE,
    ARTICLE_1_3_DIAMOND_SPENDING,
    ARTICLE_1_4_TOP_10_TRAPS,
  ],
};

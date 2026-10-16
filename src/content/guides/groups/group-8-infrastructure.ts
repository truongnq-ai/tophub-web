import type { GuideCategory } from "../types";
import { ARTICLE_8_1_CASTLE_AND_BRILLIANCE } from "./group-8/8.1-castle-and-brilliance";
import { ARTICLE_8_2_BUILDER_QUEUES_AND_VILLAGERS } from "./group-8/8.2-builder-queues-and-villagers";
import { ARTICLE_8_3_RESEARCH_AND_BAITING } from "./group-8/8.3-research-and-baiting";
import { ARTICLE_8_4_MASTER_DATA_TABLES } from "./group-8/8.4-master-data-tables";

export const GROUP_8_INFRASTRUCTURE_CATEGORY: GuideCategory = {
  order: 8,
  slug: "infrastructure",
  zoneId: "zone_systems_economy",
  iconName: "Castle",
  title: {
    vi: "Hạ Tầng, Công Nghệ & Bảng Số Liệu",
    en: "Infrastructure, Tech Trees & Master Tables",
  },
  description: {
    vi: "Lộ trình Đua Cấp Lâu Đài Lv.1➔40, Điểm gãy sinh tử Lv.35 (Lính T10) & Kỷ nguyên Quang Huy (Brilliance B1–B6 = 8,400 DE vs Viện Huy Hoàng T11 = 5,422 DE), Điều phối 4 Hàng đợi Thợ xây, Dân làng Lv.1–6 & Gift Box Banking, Cây Nghiên cứu Khoa học, Kỹ thuật PvP Formation Tank Baiting & Pre-Click Snapshot, cùng Trung tâm 12 Bảng Số Liệu Định Lượng Gốc (Single Source of Truth).",
    en: "Castle Rush Lv.1➔40 roadmap, the lethal Lv.35 (T10 Troops) breakpoint & Brilliance Era (B1–B6 = 8,400 DE vs. Brilliance Institute T11 = 5,422 DE), 4-Builder Queue orchestration, Villagers Lv.1–6 & Gift Box Banking, Research Tech priority, 3-second Formation Tank Baiting & Pre-Click Snapshot, plus the 12-Table Master Quantitative Data Hub (Single Source of Truth).",
  },
  articles: [
    ARTICLE_8_1_CASTLE_AND_BRILLIANCE,
    ARTICLE_8_2_BUILDER_QUEUES_AND_VILLAGERS,
    ARTICLE_8_3_RESEARCH_AND_BAITING,
    ARTICLE_8_4_MASTER_DATA_TABLES,
  ],
};

export {
  ARTICLE_8_1_CASTLE_AND_BRILLIANCE,
  ARTICLE_8_2_BUILDER_QUEUES_AND_VILLAGERS,
  ARTICLE_8_3_RESEARCH_AND_BAITING,
  ARTICLE_8_4_MASTER_DATA_TABLES,
};

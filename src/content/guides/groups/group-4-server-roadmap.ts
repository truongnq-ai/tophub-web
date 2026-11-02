import type { GuideCategory } from "../types";
import { ARTICLE_4_1_PRESEASON_MYTHIC_CALENDAR } from "./group-4/4.1-preseason-mythic-calendar";
import { ARTICLE_4_2_LEAGUE_PROGRESSION_PLAYBOOK } from "./group-4/4.2-league-full-progression-playbook";
import { ARTICLE_4_3_HORDE_PROGRESSION_PLAYBOOK } from "./group-4/4.3-horde-full-progression-playbook";
import { ARTICLE_4_4_NATURE_PROGRESSION_PLAYBOOK } from "./group-4/4.4-nature-full-progression-playbook";
import { ARTICLE_4_5_SEASON_1_TO_4_ROADMAP } from "./group-4/4.5-season-1-to-4-roadmap";

export const GROUP_4_SERVER_ROADMAP_CATEGORY: GuideCategory = {
  order: 4,
  displayOrder: 4,
  slug: "roadmap",
  zoneId: "zone_events_roadmap",
  iconName: "Map",
  title: {
    vi: "Lộ Trình Server & Chuyển Giao Mùa",
    en: "Server Roadmap & Seasonal Transitions",
  },
  description: {
    vi: "Ma trận Chọn Phe Ngày 1, Lịch Tướng Đỏ S0 (Ngày 1–65), Bộ 3 Giáo Án Lộ Trình Thuần Phe (Liên Minh / Bộ Tộc / Thiên Nhiên) và Lộ trình Mùa giải S1 ➔ S4.",
    en: "Day-1 Faction Selection Matrix, S0 Mythic release calendar (Days 1–65), 3 Pure-Faction Progression Playbooks (League / Horde / Nature), and Season 1 ➔ Season 4 macro roadmap.",
  },
  articles: [
    ARTICLE_4_1_PRESEASON_MYTHIC_CALENDAR,
    ARTICLE_4_2_LEAGUE_PROGRESSION_PLAYBOOK,
    ARTICLE_4_3_HORDE_PROGRESSION_PLAYBOOK,
    ARTICLE_4_4_NATURE_PROGRESSION_PLAYBOOK,
    ARTICLE_4_5_SEASON_1_TO_4_ROADMAP,
  ],
};

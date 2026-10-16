import type { GuideCategory } from "../types";
import { ARTICLE_2_1_ENCYCLOPEDIA } from "./group-2/2.1-encyclopedia";
import { ARTICLE_2_2_META_LINEUPS } from "./group-2/2.2-meta-lineups";
import { ARTICLE_2_3_FORMATION_COUNTERS } from "./group-2/2.3-formation-and-counters";
import { ARTICLE_2_4_SHARDS_SKILL_BOOKS } from "./group-2/2.4-shards-and-skill-books";
import { ARTICLE_2_5_EPIC_HERO_TRAITS } from "./group-2/2.5-epic-hero-traits";

export const GROUP_2_HEROES_AND_META_CATEGORY: GuideCategory = {
  order: 2,
  slug: "heroes",
  zoneId: "zone_onboarding_meta",
  iconName: "ShieldAlert",
  title: {
    vi: "Anh Hùng, Tier List & Đội Hình",
    en: "Heroes, Tier List & Meta Lineups",
  },
  description: {
    vi: "Bách khoa 45+ vị tướng 3 Phe, Bảng xếp hạng Tier List S0➔S4, Đội hình Meta & Toán học 9 Hồn Đá Đỏ, Sơ đồ 6 Ô (2×3 Grid) & Đảo Ô khắc chế, Kỷ luật 1,000 Mảnh / 24,700 Sách Kỹ Năng và Động cơ kinh tế Tướng Tím 12 sao.",
    en: "Complete 45+ Hero Encyclopedia across 3 Factions, S0➔S4 Tier List, Meta Lineups & 9 Soul Stone Math, 6-Slot (2×3 Grid) Formation & Counter-Swapping, 1,000-Shard / 24,700-Book discipline, and the 12-Star Epic Hero economy engine.",
  },
  articles: [
    ARTICLE_2_1_ENCYCLOPEDIA,
    ARTICLE_2_2_META_LINEUPS,
    ARTICLE_2_3_FORMATION_COUNTERS,
    ARTICLE_2_4_SHARDS_SKILL_BOOKS,
    ARTICLE_2_5_EPIC_HERO_TRAITS,
  ],
};

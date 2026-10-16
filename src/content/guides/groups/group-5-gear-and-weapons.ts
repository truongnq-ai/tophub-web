import type { GuideCategory } from "../types";
import { ARTICLE_5_1_GEAR_OVERVIEW } from "./group-5/5.1-gear-overview";
import { ARTICLE_5_2_GOLDEN_GEAR_SETS } from "./group-5/5.2-golden-gear-sets";
import { ARTICLE_5_3_ENHANCEMENT_AND_MYTHIC } from "./group-5/5.3-enhancement-and-mythic";
import { ARTICLE_5_4_LORD_GEAR_STRATEGY } from "./group-5/5.4-lord-gear-strategy";

export const GROUP_5_GEAR_AND_WEAPONS_CATEGORY: GuideCategory = {
  order: 5,
  slug: "gear",
  zoneId: "zone_systems_economy",
  iconName: "Swords",
  title: {
    vi: "Trang Bị, Lãnh Chúa & Vũ Khí",
    en: "Hero Gear, Lord Gear & Exclusive Weapons",
  },
  description: {
    vi: "Phân biệt 3 hệ thống Trang bị (0 điểm vs điểm lớn), giải mã 3 Bộ Đồ Vàng (Huyết Titan, Hiền Triết, Kỵ Sĩ Vinh Quang) & +30% Dấu Hệ, Bậc Thầy Cường Hóa (+10➔+40), Đột phá Đồ Đỏ 5 Sao (6,000 Thỏi Vàng/món), Vũ khí Độc quyền (Lv.10 = 275 mảnh) và Chiến thuật Đồ Chúa Tể 102 nấc.",
    en: "3 Equipment Systems overview (0-point vs high-point rules), 3 Golden Gear sets (Blood of the Titan, Glory of the Sage, Knight's Glory) & +30% Faction Marks, Enhancement Master (+10➔+40), 5-Star Mythic promotion (6,000 Gold Ingots/piece), Exclusive Weapons (Lv.10 = 275 shards), and 102-step Lord Gear strategy.",
  },
  articles: [
    ARTICLE_5_1_GEAR_OVERVIEW,
    ARTICLE_5_2_GOLDEN_GEAR_SETS,
    ARTICLE_5_3_ENHANCEMENT_AND_MYTHIC,
    ARTICLE_5_4_LORD_GEAR_STRATEGY,
  ],
};

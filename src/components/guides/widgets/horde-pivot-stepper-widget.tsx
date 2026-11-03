"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  CheckCircle2,
  Flame,
  Gem,
  Layers,
  Lock,
  Shield,
  Sparkles,
  Swords,
} from "lucide-react";
import type {
  GuideArticle,
  GuideLocale,
  GuideTableBlock,
} from "@/content/guides/types";
import { ARTICLE_4_2_HORDE_PIVOT_ROADMAP } from "@/content/guides/groups/group-4/4.2-horde-pivot-roadmap";
import { useUidSession } from "@/hooks/use-uid-session";
import { RichGuideText } from "@/components/guides/blocks/rich-guide-text";
import {
  getAssetById,
  getHeroVisualProfile,
  resolveSlotHeroProfiles,
} from "@/content/guides/asset-registry";
import type { HeroVisualProfile } from "@/content/guides/types";
import { GameAssetFrame } from "@/components/guides/media/game-asset-frame";

export type StepperFactionId = "league" | "horde" | "nature";

function resolvePivotHeroProfiles(rawName: string): readonly HeroVisualProfile[] {
  const direct = resolveSlotHeroProfiles(rawName);
  if (direct.length > 0) return direct;
  const lower = rawName.toLowerCase();
  if (lower.includes("6 ssr horde")) {
    return ["hero-swordmaster", "hero-wilderness-hunter", "hero-soulmancer"]
      .map((id) => getHeroVisualProfile(id))
      .filter((p): p is HeroVisualProfile => Boolean(p));
  }
  if (lower.includes("pure league")) {
    return ["hero-adjudicator", "hero-pyromancer", "hero-nun"]
      .map((id) => getHeroVisualProfile(id))
      .filter((p): p is HeroVisualProfile => Boolean(p));
  }
  if (lower.includes("pure nature")) {
    return ["hero-monk", "hero-pixie", "hero-forest-maiden"]
      .map((id) => getHeroVisualProfile(id))
      .filter((p): p is HeroVisualProfile => Boolean(p));
  }
  return [];
}

export interface HordePivotStepperWidgetProps {
  article?: GuideArticle;
  locale?: GuideLocale;
  forceUnlockPro?: boolean;
}

interface HeroSlotEntry {
  name: string;
  faction: StepperFactionId;
  note: { vi: string; en: string };
}

interface ParsedPivotStage {
  stageNumber: 1 | 2 | 3 | 4;
  dayRangeBadge: { vi: string; en: string };
  shortTitle: { vi: string; en: string };
  auraBadge: { vi: string; en: string };
  stageAndMilestone: string;
  queue1Lineup: string;
  shardAndBookRule: string;
  gearAndBuildingRule: string;
  leagueRosterRole: string;
  queue1Heroes: HeroSlotEntry[];
  queue2Heroes: HeroSlotEntry[];
}

interface StaticStageConfig {
  dayRangeBadge: { vi: string; en: string };
  shortTitle: { vi: string; en: string };
  auraBadge: { vi: string; en: string };
  stageAndMilestone: { vi: string; en: string };
  queue1Lineup: { vi: string; en: string };
  shardAndBookRule: { vi: string; en: string };
  gearAndBuildingRule: { vi: string; en: string };
  leagueRosterRole: { vi: string; en: string };
  queue1Heroes: HeroSlotEntry[];
  queue2Heroes: HeroSlotEntry[];
}

const HORDE_STAGE_META: Record<1 | 2 | 3 | 4, StaticStageConfig> = {
  1: {
    dayRangeBadge: { vi: "Ngày 1 ➔ 20", en: "Days 1 ➔ 20" },
    shortTitle: {
      vi: "GĐ 1: Khởi Đầu 6 SSR Bộ Tộc",
      en: "Stage 1: 6 Horde SSR Starter",
    },
    auraBadge: {
      vi: "6 Bộ Tộc (+35% Aura) • 0 Mảnh Vạn Năng",
      en: "6 Horde (+35% Aura) • 0 Universal Shards",
    },
    stageAndMilestone: {
      vi: "Giai đoạn 1 (Ngày 1 ➔ 20): Tích Trữ Trước Ngày 21",
      en: "Stage 1 (Days 1 ➔ 20): Pre-Day 21 Hoarding",
    },
    queue1Lineup: {
      vi: "6 SSR Bộ Tộc (Swordmaster, Barbarian, Boar, Wilderness Hunter, Headhunter, Shaman/Soulmancer)",
      en: "6 Horde SSRs (Swordmaster, Barbarian, Boar, Wilderness Hunter, Headhunter, Shaman/Soulmancer)",
    },
    shardAndBookRule: {
      vi: "Dùng 0 Mảnh Vàng Vạn Năng và 0 Sách Kỹ Năng lên tướng quá độ; dồn toàn bộ cho Desert Prince & Storm Maiden ở Ngày 21.",
      en: "Spend 0 Universal Gold Shards and 0 Skill Books on transitional heroes; save 100% for Desert Prince & Storm Maiden on Day 21.",
    },
    gearAndBuildingRule: {
      vi: "Đúc Đồ Vàng Cột 2 (Dấu Hệ Bộ Tộc +30% từ Ngày 1) và ưu tiên Doanh trại Bộ Tộc.",
      en: "Craft Column 2 Golden Gear (Horde Faction Mark +30% from Day 1) and prioritize Horde Barracks.",
    },
    leagueRosterRole: {
      vi: "6 SSR Liên Minh rơi tự nhiên ở Lv.100–120 làm Đội 2 đào mỏ.",
      en: "6 natural League SSR drops at Lv.100–120 serve as Queue 2 gatherers.",
    },
    queue1Heroes: [
      {
        name: "Swordmaster",
        faction: "horde",
        note: { vi: "Sub-Tank (0 Mảnh)", en: "Sub-Tank (0 Shards)" },
      },
      {
        name: "Barbarian",
        faction: "horde",
        note: { vi: "Sub-Tank (0 Mảnh)", en: "Sub-Tank (0 Shards)" },
      },
      {
        name: "Boar",
        faction: "horde",
        note: { vi: "Quá độ (Chờ DP Ngày 21)", en: "Transitional (Wait DP Day 21)" },
      },
      {
        name: "Wilderness Hunter",
        faction: "horde",
        note: { vi: "Sub-DPS / Tốc Đánh", en: "Sub-DPS / ATK Speed" },
      },
      {
        name: "Headhunter",
        faction: "horde",
        note: { vi: "Quá độ (Chờ SM Ngày 27)", en: "Transitional (Wait SM Day 27)" },
      },
      {
        name: "Shaman / Soulmancer",
        faction: "horde",
        note: { vi: "Healer & Chia Sát Thương", en: "Healer & Damage Link" },
      },
    ],
    queue2Heroes: [
      {
        name: "Pure League Queue 2 (6 Heroes)",
        faction: "league",
        note: {
          vi: "Đội 2 Đào Mỏ Tự Nhiên",
          en: "Natural Queue 2 Gatherers",
        },
      },
    ],
  },
  2: {
    dayRangeBadge: { vi: "Ngày 21 ➔ 35", en: "Days 21 ➔ 35" },
    shortTitle: {
      vi: "GĐ 2: Desert Prince & Storm Maiden",
      en: "Stage 2: Desert Prince & Storm Maiden",
    },
    auraBadge: {
      vi: "6 Bộ Tộc (+35% Aura) • 1★ Đỏ (160 Mảnh)",
      en: "6 Horde (+35% Aura) • 1-Red Star (160 Shards)",
    },
    stageAndMilestone: {
      vi: "Giai đoạn 2 (Ngày 21 ➔ 35): Mở Khóa Cặp Đôi Mythic Bộ Tộc",
      en: "Stage 2 (Days 21 ➔ 35): Dual Horde Mythic Unlock",
    },
    queue1Lineup: {
      vi: "Desert Prince + Storm Maiden (1★ Đỏ / 160 Mảnh) + 4 SSR Bộ Tộc",
      en: "Desert Prince + Storm Maiden (1★ Red / 160 Shards) + 4 Horde SSRs",
    },
    shardAndBookRule: {
      vi: "Dồn 320 Mảnh Vàng (160 mỗi tướng) đưa Desert Prince và Storm Maiden lên 1★ Đỏ ngay tuần mở banner.",
      en: "Invest 320 Universal Shards (160 each) to push Desert Prince and Storm Maiden to 1★ Red during launch week.",
    },
    gearAndBuildingRule: {
      vi: "Chuyển bộ Đồ Vàng +10/+20 sang Desert Prince (Titan) và Storm Maiden (Destroyer).",
      en: "Equip +10/+20 Golden Gear on Desert Prince (Titan) and Storm Maiden (Destroyer).",
    },
    leagueRosterRole: {
      vi: "Boar và Headhunter lùi xuống Đội 2 làm đội hình đào mỏ và giữ cứ điểm.",
      en: "Boar and Headhunter move to Queue 2 for resource node defense.",
    },
    queue1Heroes: [
      {
        name: "Desert Prince",
        faction: "horde",
        note: { vi: "1★ Đỏ (160 Mảnh)", en: "1★ Red (160 Shards)" },
      },
      {
        name: "Swordmaster / Barbarian",
        faction: "horde",
        note: { vi: "Sub-Tank", en: "Sub-Tank" },
      },
      {
        name: "Storm Maiden",
        faction: "horde",
        note: { vi: "1★ Đỏ (160 Mảnh)", en: "1★ Red (160 Shards)" },
      },
      {
        name: "Wilderness Hunter",
        faction: "horde",
        note: { vi: "Sub-DPS / Tốc Đánh", en: "Sub-DPS / ATK Speed" },
      },
      {
        name: "Shaman",
        faction: "horde",
        note: { vi: "Chờ Witch (Ngày 41)", en: "Waiting Witch (Day 41)" },
      },
      {
        name: "Soulmancer / Warlock",
        faction: "horde",
        note: { vi: "Chia sẻ Sát thương", en: "Damage Link Support" },
      },
    ],
    queue2Heroes: [
      {
        name: "Boar",
        faction: "horde",
        note: { vi: "Lùi xuống Đội 2", en: "Moved to Queue 2" },
      },
      {
        name: "Headhunter",
        faction: "horde",
        note: { vi: "Lùi xuống Đội 2", en: "Moved to Queue 2" },
      },
    ],
  },
  3: {
    dayRangeBadge: { vi: "Ngày 36 ➔ 45", en: "Days 36 ➔ 45" },
    shortTitle: {
      vi: "GĐ 3: Đón Witch & Đỉnh Cao S0",
      en: "Stage 3: Witch & S0 Peak",
    },
    auraBadge: {
      vi: "6 Bộ Lạc Đội 1 (+35%) • Đội 2 Liên Minh 2.8M",
      en: "6 Horde Queue 1 (+35%) • 2.8M League Queue 2",
    },
    stageAndMilestone: {
      vi: "Giai đoạn 3 (Ngày 36 ➔ 45): Kích Hoạt 6 Bộ Tộc Thuần (+35% Aura)",
      en: "Stage 3 (Days 36 ➔ 45): Full 6-Horde Activation (+35% Aura)",
    },
    queue1Lineup: {
      vi: "Desert Prince + Storm Maiden (1★ Bạc / 560 Mảnh) + Witch (Ngày 41) + 3 SSR Bộ Tộc",
      en: "Desert Prince + Storm Maiden (1★ Silver / 560 Shards) + Witch (Day 41) + 3 Horde SSRs",
    },
    shardAndBookRule: {
      vi: "Đẩy Desert Prince & Storm Maiden chạm mốc 560 Mảnh (1★ Trắng/Bạc) và mở khóa Witch ở Ngày 41.",
      en: "Push Desert Prince & Storm Maiden to 560 Shards (1★ White/Silver) and unlock Witch on Day 41.",
    },
    gearAndBuildingRule: {
      vi: "Kích hoạt 100% Dấu Hệ Bộ Tộc (+30% chỉ số) cho toàn bộ 6 vị trí Đội 1.",
      en: "Activate 100% Horde Faction Marks (+30% stats) across all 6 Queue 1 slots.",
    },
    leagueRosterRole: {
      vi: "6 SSR Liên Minh tạo thành Đội 2 hoàn chỉnh cho Đấu Trường 3v3.",
      en: "6 League SSRs form a complete Queue 2 for 3v3 Apex Arena.",
    },
    queue1Heroes: [
      {
        name: "Desert Prince",
        faction: "horde",
        note: { vi: "1★ Trắng (560 Mảnh)", en: "1★ White (560 Shards)" },
      },
      {
        name: "Swordmaster / Barbarian",
        faction: "horde",
        note: { vi: "Sub-Tank", en: "Sub-Tank" },
      },
      {
        name: "Storm Maiden",
        faction: "horde",
        note: { vi: "1★ Trắng (560 Mảnh)", en: "1★ White (560 Shards)" },
      },
      {
        name: "Wilderness Hunter",
        faction: "horde",
        note: { vi: "Buff Tốc Đánh", en: "ATK Speed Buffer" },
      },
      {
        name: "Witch",
        faction: "horde",
        note: {
          vi: "Ngày 41 • 1★ Đỏ (160 Mảnh)",
          en: "Day 41 • 1★ Red (160 Shards)",
        },
      },
      {
        name: "Soulmancer / Warlock",
        faction: "horde",
        note: { vi: "Chia sẻ Sát thương", en: "Damage Link Support" },
      },
    ],
    queue2Heroes: [
      {
        name: "Adjudicator",
        faction: "league",
        note: {
          vi: "Đội 2 Nguyên vẹn (2.8M)",
          en: "Intact Queue 2 (2.8M)",
        },
      },
      {
        name: "Secret Keeper",
        faction: "league",
        note: { vi: "Đội 2 Nguyên vẹn", en: "Intact Queue 2" },
      },
      {
        name: "Pyromancer",
        faction: "league",
        note: { vi: "Đội 2 Nguyên vẹn", en: "Intact Queue 2" },
      },
      {
        name: "Astrologer",
        faction: "league",
        note: { vi: "Đội 2 Nguyên vẹn", en: "Intact Queue 2" },
      },
      {
        name: "Bard",
        faction: "league",
        note: { vi: "Đội 2 Nguyên vẹn", en: "Intact Queue 2" },
      },
      {
        name: "Nun",
        faction: "league",
        note: { vi: "Đội 2 Nguyên vẹn", en: "Intact Queue 2" },
      },
    ],
  },
  4: {
    dayRangeBadge: { vi: "Ngày 46+ ➔ S1–S3", en: "Day 46+ ➔ S1–S3" },
    shortTitle: {
      vi: "GĐ 4: Thức Tỉnh 9 Soul Stones & 5 Mythic",
      en: "Stage 4: 9 Soul Stones & 5 Mythics",
    },
    auraBadge: {
      vi: "5 Mythic + 1 SSR Thức Tỉnh (9 Hồn Đá Đỏ vs 27)",
      en: "5 Mythics + 1 Awakened SSR (9 vs 27 Soul Stones)",
    },
    stageAndMilestone: {
      vi: "Giai đoạn 4 (Season 1 ➔ Season 4): Đỉnh Cao 5 Mythic Bộ Tộc",
      en: "Stage 4 (Season 1 ➔ Season 4): 5-Mythic Horde Exodia",
    },
    queue1Lineup: {
      vi: "Beastmaster + Desert Prince + Wukong + Storm Maiden + Witch + Soulmancer (Awakened)",
      en: "Beastmaster + Desert Prince + Wukong + Storm Maiden + Witch + Soulmancer (Awakened)",
    },
    shardAndBookRule: {
      vi: "Chỉ tốn đúng 9 Hồn Đá Đỏ (120,000 Điểm Vinh Dự / 18,000 Xu) để thức tỉnh Soulmancer, hoàn thiện đội hình 5 Mythic ở S2.",
      en: "Requires only 9 Soul Stones (120,000 Guild Honor / 18,000 Glory Coins) to awaken Soulmancer, completing the 5-Mythic lineup in S2.",
    },
    gearAndBuildingRule: {
      vi: "Đẩy Vũ Khí Độc Quyền Wukong & Desert Prince lên +10/+20 và nâng Viện Huy Hoàng Lv.40.",
      en: "Push Wukong & Desert Prince Exclusive Weapons to +10/+20 and upgrade Brilliance Institute to Lv.40.",
    },
    leagueRosterRole: {
      vi: "Đội 2 & Đội 3 phục vụ 3v3 Apex Arena và phòng thủ mỏ tài nguyên.",
      en: "Queue 2 & Queue 3 serve in 3v3 Apex Arena and resource node defense.",
    },
    queue1Heroes: [
      {
        name: "Beastmaster",
        faction: "horde",
        note: { vi: "S2 Mythic Tank", en: "S2 Mythic Tank" },
      },
      {
        name: "Desert Prince",
        faction: "horde",
        note: { vi: "UW +10 ➔ +20", en: "UW +10 ➔ +20" },
      },
      {
        name: "Wukong",
        faction: "horde",
        note: { vi: "S2 Mythic God Carry", en: "S2 Mythic God Carry" },
      },
      {
        name: "Storm Maiden",
        faction: "horde",
        note: { vi: "UW +10 ➔ +20", en: "UW +10 ➔ +20" },
      },
      {
        name: "Witch",
        faction: "horde",
        note: { vi: "Mythic Healer/CC", en: "Mythic Healer/CC" },
      },
      {
        name: "Soulmancer / Warlock",
        faction: "horde",
        note: {
          vi: "Awakened (9 Hồn Đá Đỏ)",
          en: "Awakened (9 Soul Stones)",
        },
      },
    ],
    queue2Heroes: [
      {
        name: "Pure League Queue 2 (6 Heroes)",
        faction: "league",
        note: {
          vi: "3v3 Apex Arena & Giữ Mỏ",
          en: "3v3 Apex Arena & Mine Defense",
        },
      },
      {
        name: "Pure Nature Queue 3 (Natural Drops)",
        faction: "league",
        note: { vi: "Đội 3 Tự nhiên", en: "Natural Queue 3" },
      },
    ],
  },
};

const LEAGUE_STAGE_META: Record<1 | 2 | 3 | 4, StaticStageConfig> = {
  1: {
    dayRangeBadge: { vi: "Ngày 1 ➔ 34", en: "Days 1 ➔ 34" },
    shortTitle: {
      vi: "GĐ 1: Khởi Đầu 6 SSR Liên Minh",
      en: "Stage 1: 6 League SSR Starter",
    },
    auraBadge: {
      vi: "6 Liên Minh (+35% Aura) • Tích 45,000+ Kim Cương",
      en: "6 League (+35% Aura) • Bank 45,000+ Diamonds",
    },
    stageAndMilestone: {
      vi: "Giai đoạn 1 (Ngày 1 ➔ 34): Khung 6 SSR Liên Minh & Tích Trữ Chờ Paragon",
      en: "Stage 1 (Days 1 ➔ 34): 6 League SSR Core & Hoarding for Paragon",
    },
    queue1Lineup: {
      vi: "Adjudicator + Secret Keeper + Pyromancer + Nun + Bard + Astrologer",
      en: "Adjudicator + Secret Keeper + Pyromancer + Nun + Bard + Astrologer",
    },
    shardAndBookRule: {
      vi: "Cấm đút Mảnh Vàng Vạn Năng cho Secret Keeper, Bard, Astrologer. Chỉ mua mảnh Pyromancer ở Tiệm Đấu Trường.",
      en: "Never feed Universal Shards to Secret Keeper, Bard, or Astrologer. Buy Pyromancer shards exclusively in the Arena Shop.",
    },
    gearAndBuildingRule: {
      vi: "Đúc Đồ Vàng Cột 1 (Dấu Hệ Liên Minh +30%) ngay từ món đầu tiên và nâng Doanh trại Liên Minh.",
      en: "Craft Column 1 Golden Gear (League Faction Mark +30%) from piece #1 and upgrade League Barracks.",
    },
    leagueRosterRole: {
      vi: "Bỏ qua hoàn toàn banner Bộ Tộc (Ngày 21–27) để bảo toàn 45,000+ Kim Cương.",
      en: "Skip Horde banners (Days 21–27) completely to preserve 45,000+ Diamonds.",
    },
    queue1Heroes: [
      {
        name: "Adjudicator",
        faction: "league",
        note: { vi: "Core Tank (Giữ tới S4)", en: "Core Tank (Keep to S4)" },
      },
      {
        name: "Secret Keeper",
        faction: "league",
        note: { vi: "Quá độ (0 Mảnh)", en: "Transitional (0 Shards)" },
      },
      {
        name: "Pyromancer",
        faction: "league",
        note: { vi: "Core AoE Carry", en: "Core AoE Carry" },
      },
      {
        name: "Astrologer",
        faction: "league",
        note: { vi: "Quá độ (Chờ Paragon)", en: "Transitional (Wait Paragon)" },
      },
      {
        name: "Bard",
        faction: "league",
        note: { vi: "Quá độ (Chờ Bishop)", en: "Transitional (Wait Bishop)" },
      },
      {
        name: "Nun",
        faction: "league",
        note: { vi: "Core Healer", en: "Core Healer" },
      },
    ],
    queue2Heroes: [
      {
        name: "6 SSR Horde (Parked Lv.135–150)",
        faction: "horde",
        note: {
          vi: "Đội 2 Đào Mỏ Tự Nhiên",
          en: "Natural Queue 2 Gatherers",
        },
      },
    ],
  },
  2: {
    dayRangeBadge: { vi: "Ngày 35 ➔ 45", en: "Days 35 ➔ 45" },
    shortTitle: {
      vi: "GĐ 2: Đón Paragon (Ngày 35)",
      en: "Stage 2: Unlock Paragon (Day 35)",
    },
    auraBadge: {
      vi: "6 Liên Minh (+35% Aura) • Paragon 1★ Đỏ (160 Mảnh)",
      en: "6 League (+35% Aura) • Paragon 1★ Red (160 Shards)",
    },
    stageAndMilestone: {
      vi: "Giai đoạn 2 (Ngày 35 ➔ 45): Mở Khóa Chủ Lực Mythic Paragon",
      en: "Stage 2 (Days 35 ➔ 45): Unlock Mythic Carry Paragon",
    },
    queue1Lineup: {
      vi: "Adjudicator + Secret Keeper + Paragon (1★ Đỏ) + Pyromancer + Bard + Nun",
      en: "Adjudicator + Secret Keeper + Paragon (1★ Red) + Pyromancer + Bard + Nun",
    },
    shardAndBookRule: {
      vi: "Dùng 160 Mảnh Vàng Vạn Năng nâng Paragon lên 1★ Đỏ ngay Ngày 35, thay thế Astrologer.",
      en: "Spend 160 Universal Shards to push Paragon to 1★ Red on Day 35, replacing Astrologer.",
    },
    gearAndBuildingRule: {
      vi: "Chuyển bộ Đồ Vàng Cột 1 (Fury of the Destroyer +20) của Astrologer sang cho Paragon.",
      en: "Transfer Astrologer's Column 1 Golden Gear (Fury of the Destroyer +20) directly to Paragon.",
    },
    leagueRosterRole: {
      vi: "Astrologer lùi xuống Đội 2 nguyên vẹn cấp độ, không mất tài nguyên.",
      en: "Astrologer rotates down to Queue 2 with zero resource loss.",
    },
    queue1Heroes: [
      {
        name: "Adjudicator",
        faction: "league",
        note: { vi: "Core Tank", en: "Core Tank" },
      },
      {
        name: "Secret Keeper",
        faction: "league",
        note: { vi: "Chờ Rose Princess", en: "Waiting Rose Princess" },
      },
      {
        name: "Paragon",
        faction: "league",
        note: { vi: "Ngày 35 • 1★ Đỏ (160 Mảnh)", en: "Day 35 • 1★ Red (160 Shards)" },
      },
      {
        name: "Pyromancer",
        faction: "league",
        note: { vi: "Sub-Carry AoE", en: "AoE Sub-Carry" },
      },
      {
        name: "Bard",
        faction: "league",
        note: { vi: "Chờ Bishop (Ngày 46)", en: "Waiting Bishop (Day 46)" },
      },
      {
        name: "Nun",
        faction: "league",
        note: { vi: "Core Healer", en: "Core Healer" },
      },
    ],
    queue2Heroes: [
      {
        name: "Astrologer",
        faction: "league",
        note: { vi: "Chuyển xuống Đội 2", en: "Rotated to Queue 2" },
      },
    ],
  },
  3: {
    dayRangeBadge: { vi: "Ngày 46 ➔ 65", en: "Days 46 ➔ 65" },
    shortTitle: {
      vi: "GĐ 3: Rose Princess & Bishop",
      en: "Stage 3: Rose Princess & Bishop",
    },
    auraBadge: {
      vi: "3 Mythic + 3 SSR Liên Minh (+35% Aura)",
      en: "3 Mythics + 3 League SSRs (+35% Aura)",
    },
    stageAndMilestone: {
      vi: "Giai đoạn 3 (Ngày 46 ➔ 65): Hoàn Thiện Bộ Ba Mythic Liên Minh S0",
      en: "Stage 3 (Days 46 ➔ 65): Complete S0 League Mythic Trio",
    },
    queue1Lineup: {
      vi: "Rose Princess + Adjudicator + Paragon (1★ Bạc) + Bishop + Pyromancer + Nun",
      en: "Rose Princess + Adjudicator + Paragon (1★ Silver) + Bishop + Pyromancer + Nun",
    },
    shardAndBookRule: {
      vi: "Mở khóa Rose Princess & Bishop ở Ngày 46 (160 mảnh mỗi tướng lên 1★ Đỏ) và đẩy Paragon lên 1★ Bạc (560 mảnh).",
      en: "Unlock Rose Princess & Bishop on Day 46 (160 shards each to 1★ Red) and push Paragon to 1★ Silver (560 shards).",
    },
    gearAndBuildingRule: {
      vi: "Trang bị Blood of the Titan (Cột 1) cho Rose Princess & Adjudicator; tích trữ Điểm Vinh Dự Bang chờ S1.",
      en: "Equip Blood of the Titan (Column 1) on Rose Princess & Adjudicator; hoard Guild Honor for S1.",
    },
    leagueRosterRole: {
      vi: "Secret Keeper, Bard và Astrologer hợp thành khung Đội 2 Liên Minh.",
      en: "Secret Keeper, Bard, and Astrologer form the core of Queue 2.",
    },
    queue1Heroes: [
      {
        name: "Rose Princess",
        faction: "league",
        note: { vi: "Ngày 46 • 1★ Đỏ (160 Mảnh)", en: "Day 46 • 1★ Red (160 Shards)" },
      },
      {
        name: "Adjudicator",
        faction: "league",
        note: { vi: "Main Tank", en: "Main Tank" },
      },
      {
        name: "Paragon",
        faction: "league",
        note: { vi: "1★ Bạc (560 Mảnh)", en: "1★ Silver (560 Shards)" },
      },
      {
        name: "Bishop",
        faction: "league",
        note: { vi: "Ngày 46 • Khắc chế Triệu hồi", en: "Day 46 • Anti-Summon" },
      },
      {
        name: "Pyromancer",
        faction: "league",
        note: { vi: "Chuẩn bị Thức tỉnh S1", en: "Prep S1 Awakening" },
      },
      {
        name: "Nun",
        faction: "league",
        note: { vi: "Core Healer", en: "Core Healer" },
      },
    ],
    queue2Heroes: [
      {
        name: "Secret Keeper",
        faction: "league",
        note: { vi: "Tank Đội 2", en: "Queue 2 Tank" },
      },
      {
        name: "Bard",
        faction: "league",
        note: { vi: "Support Đội 2", en: "Queue 2 Support" },
      },
      {
        name: "Astrologer",
        faction: "league",
        note: { vi: "DPS Đội 2", en: "Queue 2 DPS" },
      },
    ],
  },
  4: {
    dayRangeBadge: { vi: "Season 1 ➔ S4", en: "Season 1 ➔ S4" },
    shortTitle: {
      vi: "GĐ 4: Artificer & Thức Tỉnh SSR",
      en: "Stage 4: Artificer & Awakened SSRs",
    },
    auraBadge: {
      vi: "4 Mythic + 2 SSR Thức Tỉnh (18–27 Hồn Đá Đỏ)",
      en: "4 Mythics + 2 Awakened SSRs (18–27 Soul Stones)",
    },
    stageAndMilestone: {
      vi: "Giai đoạn 4 (Season 1 ➔ Season 4): Đội Hình Endgame Thuần Liên Minh",
      en: "Stage 4 (Season 1 ➔ Season 4): Pure League Endgame Lineup",
    },
    queue1Lineup: {
      vi: "Rose Princess + Adjudicator (Awakened) + Paragon + Artificer (S3) + Bishop + Pyromancer/Nun (Awakened)",
      en: "Rose Princess + Adjudicator (Awakened) + Paragon + Artificer (S3) + Bishop + Pyromancer/Nun (Awakened)",
    },
    shardAndBookRule: {
      vi: "Thức tỉnh Adjudicator & Pyromancer ở S1 (18 Hồn Đá Đỏ = 240,000 Vinh Dự + 36,000 Xu) và đón Artificer ở Season 3.",
      en: "Awaken Adjudicator & Pyromancer in S1 (18 Soul Stones = 240,000 Honor + 36,000 Coins) and pull Artificer in Season 3.",
    },
    gearAndBuildingRule: {
      vi: "Nâng Vũ Khí Độc Quyền Paragon & Rose Princess lên +10/+20 và Viện Huy Hoàng Lv.40.",
      en: "Upgrade Paragon & Rose Princess Exclusive Weapons to +10/+20 and Brilliance Institute to Lv.40.",
    },
    leagueRosterRole: {
      vi: "Khắc chế cứng mọi đội hình Thiên Nhiên (Tidecaller / Ne Zha) trong KvK và GvG.",
      en: "Hard-counters all Nature lineups (Tidecaller / Ne Zha) in KvK and GvG.",
    },
    queue1Heroes: [
      {
        name: "Rose Princess",
        faction: "league",
        note: { vi: "Mythic Tank • UW +20", en: "Mythic Tank • UW +20" },
      },
      {
        name: "Adjudicator",
        faction: "league",
        note: { vi: "Awakened (9 Hồn Đá Đỏ)", en: "Awakened (9 Soul Stones)" },
      },
      {
        name: "Paragon",
        faction: "league",
        note: { vi: "Main Carry • UW +20", en: "Main Carry • UW +20" },
      },
      {
        name: "Artificer",
        faction: "league",
        note: { vi: "S3 Mythic Buffer", en: "S3 Mythic Buffer" },
      },
      {
        name: "Bishop",
        faction: "league",
        note: { vi: "Mythic Anti-Summon", en: "Mythic Anti-Summon" },
      },
      {
        name: "Pyromancer",
        faction: "league",
        note: { vi: "Awakened (9 Hồn Đá Đỏ)", en: "Awakened (9 Soul Stones)" },
      },
    ],
    queue2Heroes: [
      {
        name: "Nun",
        faction: "league",
        note: { vi: "Flex Healer (PvE / GvG)", en: "Flex Healer (PvE / GvG)" },
      },
      {
        name: "Secret Keeper",
        faction: "league",
        note: { vi: "Đội 2 3v3 Arena", en: "3v3 Arena Queue 2" },
      },
    ],
  },
};

const NATURE_STAGE_META: Record<1 | 2 | 3 | 4, StaticStageConfig> = {
  1: {
    dayRangeBadge: { vi: "Ngày 1 ➔ 41", en: "Days 1 ➔ 41" },
    shortTitle: {
      vi: "GĐ 1: Nhịn Nhục Tích Trữ 41 Ngày",
      en: "Stage 1: 41-Day Discipline Hoard",
    },
    auraBadge: {
      vi: "6 Thiên Nhiên (+35% Aura) • Tích 60,000+ Kim Cương",
      en: "6 Nature (+35% Aura) • Bank 60,000+ Diamonds",
    },
    stageAndMilestone: {
      vi: "Giai đoạn 1 (Ngày 1 ➔ 41): Sinh Tồn Bằng 6 SSR Thiên Nhiên & Khoán Trắng Mảnh Vàng",
      en: "Stage 1 (Days 1 ➔ 41): 6 Nature SSR Survival & Strict Shard Freeze",
    },
    queue1Lineup: {
      vi: "Treeguard + Sage + Pixie + Forest Maiden + Druid + Windwalker",
      en: "Treeguard + Sage + Pixie + Forest Maiden + Druid + Windwalker",
    },
    shardAndBookRule: {
      vi: "Dùng 0 Mảnh Vàng Vạn Năng suốt 41 ngày đầu. Tích lũy tối thiểu 560+ Mảnh Vàng chờ Tidecaller.",
      en: "Spend 0 Universal Gold Shards during the first 41 days. Bank at least 560+ Universal Shards for Tidecaller.",
    },
    gearAndBuildingRule: {
      vi: "Đúc Đồ Vàng Cột 3 (Dấu Hệ Thiên Nhiên +30%) ngay từ Ngày 1 và nâng Doanh trại Thiên Nhiên.",
      en: "Craft Column 3 Golden Gear (Nature Faction Mark +30%) from Day 1 and upgrade Nature Barracks.",
    },
    leagueRosterRole: {
      vi: "Bỏ qua toàn bộ banner Bộ Tộc (Ngày 21) và Liên Minh (Ngày 35) để dồn 60,000+ Kim Cương.",
      en: "Skip all Horde (Day 21) and League (Day 35) banners to bank 60,000+ Diamonds.",
    },
    queue1Heroes: [
      {
        name: "Treeguard",
        faction: "nature",
        note: { vi: "Tank Quá độ (0 Mảnh)", en: "Transitional Tank (0 Shards)" },
      },
      {
        name: "Sage",
        faction: "nature",
        note: { vi: "Sub-Tank Quá độ", en: "Transitional Sub-Tank" },
      },
      {
        name: "Pixie",
        faction: "nature",
        note: { vi: "Core AoE DPS (Giữ tới S4)", en: "Core AoE DPS (Keep to S4)" },
      },
      {
        name: "Forest Maiden",
        faction: "nature",
        note: { vi: "Core Summon Buffer", en: "Core Summon Buffer" },
      },
      {
        name: "Druid",
        faction: "nature",
        note: { vi: "Healer Quá độ (0 Sách)", en: "Transitional Healer (0 Books)" },
      },
      {
        name: "Windwalker",
        faction: "nature",
        note: { vi: "DPS Quá độ (0 Mảnh)", en: "Transitional DPS (0 Shards)" },
      },
    ],
    queue2Heroes: [
      {
        name: "Pure League Queue 2 (6 Heroes)",
        faction: "league",
        note: {
          vi: "Đội 2 Đào Mỏ Tự Nhiên",
          en: "Natural Queue 2 Gatherers",
        },
      },
    ],
  },
  2: {
    dayRangeBadge: { vi: "Ngày 42 ➔ 65", en: "Days 42 ➔ 65" },
    shortTitle: {
      vi: "GĐ 2: Bùng Nổ Tidecaller & Monk",
      en: "Stage 2: Tidecaller & Monk Power Spike",
    },
    auraBadge: {
      vi: "6 Thiên Nhiên (+35% Aura) • Tidecaller 1★ Bạc (560 Mảnh)",
      en: "6 Nature (+35% Aura) • Tidecaller 1★ Silver (560 Shards)",
    },
    stageAndMilestone: {
      vi: "Giai đoạn 2 (Ngày 42 ➔ 65): Mở Khóa Tidecaller & Monk — Đảo Chiều Meta",
      en: "Stage 2 (Days 42 ➔ 65): Unlock Tidecaller & Monk — Meta Reversal",
    },
    queue1Lineup: {
      vi: "Monk (1★ Đỏ) + Treeguard + Tidecaller (1★ Bạc / 560 Mảnh) + Pixie + Forest Maiden + Sage",
      en: "Monk (1★ Red) + Treeguard + Tidecaller (1★ Silver / 560 Shards) + Pixie + Forest Maiden + Sage",
    },
    shardAndBookRule: {
      vi: "Bung kho 560 Mảnh Vàng đưa Tidecaller lên thẳng 1★ Bạc (+30% Skill Thủy Triều) và 160 mảnh cho Monk (1★ Đỏ).",
      en: "Unload 560 Universal Shards to rush Tidecaller straight to 1★ Silver (+30% Tidal Skill) and 160 shards for Monk (1★ Red).",
    },
    gearAndBuildingRule: {
      vi: "Đóng bộ Fury of the Destroyer +20/+30 (Cột 3) cho Tidecaller và Blood of the Titan cho Monk.",
      en: "Equip +20/+30 Fury of the Destroyer (Column 3) on Tidecaller and Blood of the Titan on Monk.",
    },
    leagueRosterRole: {
      vi: "Windwalker và Druid lùi xuống Đội 2 sau khi hoàn thành nhiệm vụ quá độ.",
      en: "Windwalker and Druid rotate to Queue 2 after completing their transitional role.",
    },
    queue1Heroes: [
      {
        name: "Monk",
        faction: "nature",
        note: { vi: "Mythic Tank • 1★ Đỏ (160 Mảnh)", en: "Mythic Tank • 1★ Red (160 Shards)" },
      },
      {
        name: "Treeguard",
        faction: "nature",
        note: { vi: "Chờ Ne Zha (S1)", en: "Waiting Ne Zha (S1)" },
      },
      {
        name: "Tidecaller",
        faction: "nature",
        note: { vi: "God Carry • 1★ Bạc (560 Mảnh)", en: "God Carry • 1★ Silver (560 Shards)" },
      },
      {
        name: "Pixie",
        faction: "nature",
        note: { vi: "Core AoE Burst", en: "Core AoE Burst" },
      },
      {
        name: "Forest Maiden",
        faction: "nature",
        note: { vi: "Cộng hưởng Triệu hồi", en: "Summon Synergy" },
      },
      {
        name: "Sage",
        faction: "nature",
        note: { vi: "Chờ Petalis", en: "Waiting Petalis" },
      },
    ],
    queue2Heroes: [
      {
        name: "Druid",
        faction: "nature",
        note: { vi: "Lùi xuống Đội 2", en: "Moved to Queue 2" },
      },
      {
        name: "Windwalker",
        faction: "nature",
        note: { vi: "Lùi xuống Đội 2", en: "Moved to Queue 2" },
      },
    ],
  },
  3: {
    dayRangeBadge: { vi: "Season 1", en: "Season 1" },
    shortTitle: {
      vi: "GĐ 3: Đón Ne Zha & 18 Hồn Đá Đỏ",
      en: "Stage 3: Ne Zha & 18 Soul Stones",
    },
    auraBadge: {
      vi: "3 Mythic + 2 Awakened SSR (18 Hồn Đá Đỏ)",
      en: "3 Mythics + 2 Awakened SSRs (18 Soul Stones)",
    },
    stageAndMilestone: {
      vi: "Giai đoạn 3 (Season 1 — World Tree): Mở Khóa Ne Zha & Thức Tỉnh Pixie + Forest Maiden",
      en: "Stage 3 (Season 1 — World Tree): Unlock Ne Zha & Awaken Pixie + Forest Maiden",
    },
    queue1Lineup: {
      vi: "Monk + Ne Zha (1★ Bạc) + Tidecaller + Pixie (Awakened) + Forest Maiden (Awakened) + Sage",
      en: "Monk + Ne Zha (1★ Silver) + Tidecaller + Pixie (Awakened) + Forest Maiden (Awakened) + Sage",
    },
    shardAndBookRule: {
      vi: "Mở khóa Ne Zha thay thế Treeguard, đồng thời dùng 18 Hồn Đá Đỏ (240,000 Vinh Dự + 36,000 Xu) thức tỉnh Pixie và Forest Maiden.",
      en: "Unlock Ne Zha to replace Treeguard, and spend 18 Soul Stones (240,000 Honor + 36,000 Coins) to awaken Pixie and Forest Maiden.",
    },
    gearAndBuildingRule: {
      vi: "Nâng Vũ Khí Độc Quyền Tidecaller lên +10/+20 và ưu tiên nhánh Cây Thế Giới S1.",
      en: "Upgrade Tidecaller Exclusive Weapon to +10/+20 and prioritize S1 World Tree research.",
    },
    leagueRosterRole: {
      vi: "Áp đảo hoàn toàn các đội hình Bộ Tộc (Wukong / Desert Prince) nhờ khắc hệ +20%.",
      en: "Dominates Horde lineups (Wukong / Desert Prince) via +20% faction counter advantage.",
    },
    queue1Heroes: [
      {
        name: "Monk",
        faction: "nature",
        note: { vi: "Mythic Tank", en: "Mythic Tank" },
      },
      {
        name: "Ne Zha",
        faction: "nature",
        note: { vi: "S1 Mythic Bruiser (560 Mảnh)", en: "S1 Mythic Bruiser (560 Shards)" },
      },
      {
        name: "Tidecaller",
        faction: "nature",
        note: { vi: "UW +10 ➔ +20", en: "UW +10 ➔ +20" },
      },
      {
        name: "Pixie",
        faction: "nature",
        note: { vi: "Awakened (9 Hồn Đá Đỏ)", en: "Awakened (9 Soul Stones)" },
      },
      {
        name: "Forest Maiden",
        faction: "nature",
        note: { vi: "Awakened (9 Hồn Đá Đỏ)", en: "Awakened (9 Soul Stones)" },
      },
      {
        name: "Sage",
        faction: "nature",
        note: { vi: "Slot 6 Tạm thời", en: "Temporary Slot 6" },
      },
    ],
    queue2Heroes: [
      {
        name: "Treeguard",
        faction: "nature",
        note: { vi: "Tank Đội 2", en: "Queue 2 Tank" },
      },
      {
        name: "Druid",
        faction: "nature",
        note: { vi: "Healer Đội 2", en: "Queue 2 Healer" },
      },
    ],
  },
  4: {
    dayRangeBadge: { vi: "Season 2 ➔ S4", en: "Season 2 ➔ S4" },
    shortTitle: {
      vi: "GĐ 4: Đón Petalis & 4 Mythic",
      en: "Stage 4: Petalis & 4-Mythic Core",
    },
    auraBadge: {
      vi: "4 Mythic + 2 SSR Thức Tỉnh (18 Hồn Đá Đỏ)",
      en: "4 Mythics + 2 Awakened SSRs (18 Soul Stones)",
    },
    stageAndMilestone: {
      vi: "Giai đoạn 4 (Season 2 ➔ Season 4): Hoàn Thiện Đế Chế Triệu Hồi Thuần Thiên Nhiên",
      en: "Stage 4 (Season 2 ➔ Season 4): Complete Pure Nature Summon Empire",
    },
    queue1Lineup: {
      vi: "Monk + Ne Zha + Tidecaller (Max 1,000 Mảnh) + Petalis (S3) + Pixie (Awakened) + Forest Maiden (Awakened)",
      en: "Monk + Ne Zha + Tidecaller (Max 1,000 Shards) + Petalis (S3) + Pixie (Awakened) + Forest Maiden (Awakened)",
    },
    shardAndBookRule: {
      vi: "Nhịn banner S2 để max Tidecaller (1,000 mảnh), sau đó mở khóa Petalis ở Season 3 thay thế Sage.",
      en: "Skip S2 banners to max Tidecaller (1,000 shards), then pull Petalis in Season 3 to replace Sage.",
    },
    gearAndBuildingRule: {
      vi: "Hoàn thành Viện Huy Hoàng Lv.40 (5,422 Tinh Hoa Rồng) mở khóa Lính Lv.11 (T11).",
      en: "Complete Brilliance Institute Lv.40 (5,422 Dragon Essence) to unlock Lv.11 (T11) Troops.",
    },
    leagueRosterRole: {
      vi: "Giữ vững vị thế Vua PvE Thế Giới và khắc tinh số 1 của Bộ Tộc từ S1 đến S4.",
      en: "Reigns as the #1 World Boss PvE team and the ultimate Horde counter from S1 through S4.",
    },
    queue1Heroes: [
      {
        name: "Monk",
        faction: "nature",
        note: { vi: "Mythic Tank • UW +10", en: "Mythic Tank • UW +10" },
      },
      {
        name: "Ne Zha",
        faction: "nature",
        note: { vi: "Mythic Frontline • UW +20", en: "Mythic Frontline • UW +20" },
      },
      {
        name: "Tidecaller",
        faction: "nature",
        note: { vi: "Max 5★ Bạc (1,000 Mảnh)", en: "Max 5★ Silver (1,000 Shards)" },
      },
      {
        name: "Petalis",
        faction: "nature",
        note: { vi: "S3 Mythic Control/Support", en: "S3 Mythic Control/Support" },
      },
      {
        name: "Pixie",
        faction: "nature",
        note: { vi: "Awakened AoE Carry", en: "Awakened AoE Carry" },
      },
      {
        name: "Forest Maiden",
        faction: "nature",
        note: { vi: "Awakened Summon Engine", en: "Awakened Summon Engine" },
      },
    ],
    queue2Heroes: [
      {
        name: "Sage",
        faction: "nature",
        note: { vi: "Chuyển xuống Đội 2", en: "Rotated to Queue 2" },
      },
      {
        name: "Treeguard",
        faction: "nature",
        note: { vi: "Tank Đội 2 3v3", en: "3v3 Queue 2 Tank" },
      },
    ],
  },
};

const FACTION_TABS: {
  id: StepperFactionId;
  label: { vi: string; en: string };
  soulStoneBadge: { vi: string; en: string };
}[] = [
  {
    id: "league",
    label: { vi: "🔵 Liên Minh (League)", en: "🔵 Pure League" },
    soulStoneBadge: { vi: "18–27 Đá Hồn", en: "18–27 Soul Stones" },
  },
  {
    id: "horde",
    label: { vi: "🔴 Bộ Tộc (Horde)", en: "🔴 Pure Horde" },
    soulStoneBadge: { vi: "9 Đá Hồn (-67%)", en: "9 Soul Stones (-67%)" },
  },
  {
    id: "nature",
    label: { vi: "🟢 Thiên Nhiên (Nature)", en: "🟢 Pure Nature" },
    soulStoneBadge: { vi: "18 Đá Hồn", en: "18 Soul Stones" },
  },
];

export function HordePivotStepperWidget({
  article,
  locale = "vi",
  forceUnlockPro = false,
}: HordePivotStepperWidgetProps) {
  const t = useTranslations("Guides");
  const { activeAccount } = useUidSession();
  const isLockEnabled =
    process.env.NEXT_PUBLIC_ENABLE_PRO_CONTENT_LOCK === "true";
  const hasProAccess =
    forceUnlockPro || !isLockEnabled || activeAccount?.active_plan === "PRO";

  const initialFaction: StepperFactionId =
    article?.slug === "league-progression-playbook"
      ? "league"
      : article?.slug === "nature-progression-playbook"
        ? "nature"
        : "horde";

  const [activeFaction, setActiveFaction] =
    useState<StepperFactionId>(initialFaction);
  const [activeStageNumber, setActiveStageNumber] = useState<1 | 2 | 3 | 4>(1);

  const sourceArticle =
    article?.slug === "horde-pivot-roadmap" ||
    article?.slug === "horde-progression-playbook"
      ? article
      : ARTICLE_4_2_HORDE_PIVOT_ROADMAP;

  const stages = useMemo<ParsedPivotStage[]>(() => {
    const stageNums: (1 | 2 | 3 | 4)[] = [1, 2, 3, 4];

    if (activeFaction === "league") {
      return stageNums.map((num) => {
        const meta = LEAGUE_STAGE_META[num];
        return {
          stageNumber: num,
          dayRangeBadge: meta.dayRangeBadge,
          shortTitle: meta.shortTitle,
          auraBadge: meta.auraBadge,
          stageAndMilestone: meta.stageAndMilestone[locale],
          queue1Lineup: meta.queue1Lineup[locale],
          shardAndBookRule: meta.shardAndBookRule[locale],
          gearAndBuildingRule: meta.gearAndBuildingRule[locale],
          leagueRosterRole: meta.leagueRosterRole[locale],
          queue1Heroes: meta.queue1Heroes,
          queue2Heroes: meta.queue2Heroes,
        };
      });
    }

    if (activeFaction === "nature") {
      return stageNums.map((num) => {
        const meta = NATURE_STAGE_META[num];
        return {
          stageNumber: num,
          dayRangeBadge: meta.dayRangeBadge,
          shortTitle: meta.shortTitle,
          auraBadge: meta.auraBadge,
          stageAndMilestone: meta.stageAndMilestone[locale],
          queue1Lineup: meta.queue1Lineup[locale],
          shardAndBookRule: meta.shardAndBookRule[locale],
          gearAndBuildingRule: meta.gearAndBuildingRule[locale],
          leagueRosterRole: meta.leagueRosterRole[locale],
          queue1Heroes: meta.queue1Heroes,
          queue2Heroes: meta.queue2Heroes,
        };
      });
    }

    const allSections = [
      ...(sourceArticle.freeSections ?? []),
      ...(sourceArticle.proSections ?? []),
    ];
    const proSec = allSections.find(
      (sec) => sec.id === "sec-4-zero-loss-pivot-protocol"
    );
    const matrixSub = proSec?.subSections?.find(
      (sub) => sub.id === "sub-4-2-zero-loss-pivot-matrix"
    );
    const tableBlock = matrixSub?.blocks.find(
      (b): b is GuideTableBlock => b.type === "table"
    );

    return stageNums.map((num, idx) => {
      const row = tableBlock?.rows[idx];
      const meta = HORDE_STAGE_META[num];
      return {
        stageNumber: num,
        dayRangeBadge: meta.dayRangeBadge,
        shortTitle: meta.shortTitle,
        auraBadge: meta.auraBadge,
        stageAndMilestone: row?.[0]?.[locale] ?? meta.stageAndMilestone[locale],
        queue1Lineup: row?.[1]?.[locale] ?? meta.queue1Lineup[locale],
        shardAndBookRule: row?.[2]?.[locale] ?? meta.shardAndBookRule[locale],
        gearAndBuildingRule:
          row?.[3]?.[locale] ?? meta.gearAndBuildingRule[locale],
        leagueRosterRole: row?.[4]?.[locale] ?? meta.leagueRosterRole[locale],
        queue1Heroes: meta.queue1Heroes,
        queue2Heroes: meta.queue2Heroes,
      };
    });
  }, [activeFaction, sourceArticle, locale]);

  useEffect(() => {
    const handleTocNavigate = (event: Event) => {
      const customEvent = event as CustomEvent<{ targetId?: string }>;
      const targetId = customEvent.detail?.targetId;
      if (
        targetId === "sub-4-2-zero-loss-pivot-matrix" ||
        targetId === "sub-4-1-four-stage-state-diagram"
      ) {
        setActiveStageNumber(4);
      } else if (targetId === "sub-2-1-hybrid-bridge-roadmap") {
        setActiveStageNumber(2);
      }
    };
    window.addEventListener("tophub:toc-navigate", handleTocNavigate);
    return () => {
      window.removeEventListener("tophub:toc-navigate", handleTocNavigate);
    };
  }, []);

  const currentStage =
    stages.find((s) => s.stageNumber === activeStageNumber) ?? stages[0];

  return (
    <div
      data-testid="widget-horde-pivot-stepper"
      className="my-6 rounded-2xl border border-amber-500/30 bg-card/95 dark:bg-gradient-to-b dark:from-[#131722]/95 dark:via-[#0F131D]/95 dark:to-[#0B0E14]/95 p-3.5 sm:p-6 shadow-[0_14px_36px_rgba(0,0,0,0.45)]"
    >
      {/* Consolidated SSoT Anchor Stub */}
      <span
        id="sub-4-2-zero-loss-pivot-matrix"
        data-consolidated-by-widget="true"
        className="scroll-mt-28"
        aria-hidden="true"
      />

      {/* Header + 9 vs 27 Soul Stones Savings Meter */}
      <div className="flex flex-col gap-4 border-b border-border/75 dark:border-white/10 pb-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-300">
            <Flame className="h-3.5 w-3.5 text-amber-400" />
            <span>
              {locale === "vi"
                ? "Playbook Lộ Trình 3 Phe Thuần • Ngày 1 ➔ S4"
                : "3-Faction Pure Progression Playbook • Day 1 ➔ S4"}
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-foreground dark:text-white">
            {t("widgetPivotTitle")}
          </h3>
          <p className="text-sm text-muted-foreground dark:text-slate-300 leading-relaxed">
            {t("widgetPivotSubtitle")}
          </p>
        </div>

        {/* 9 vs 27 Soul Stones Meter */}
        <div
          data-testid="pivot-soulstone-meter"
          className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-2.5 text-xs"
        >
          <div className="flex items-center justify-between gap-4 font-bold text-emerald-700 dark:text-emerald-300">
            <span className="inline-flex items-center gap-1.5">
              {(() => {
                const stoneAsset = getAssetById("item-soul-stone");
                return stoneAsset ? (
                  <GameAssetFrame
                    src={stoneAsset.iconPath}
                    alt=""
                    size="sm"
                    rarity={stoneAsset.rarity}
                  />
                ) : (
                  <Gem className="h-3.5 w-3.5 text-emerald-400" />
                );
              })()}
              {locale === "vi"
                ? "Kinh Tế Hồn Đá Đỏ (Soul Stones):"
                : "Soul Stone Economy:"}
            </span>
            <span className="font-mono text-emerald-800 dark:text-emerald-200">
              9 vs 27 (-67% Cost)
            </span>
          </div>
          <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground dark:text-slate-300">
            <span className="rounded bg-rose-500/20 px-2 py-0.5 font-semibold text-rose-800 dark:text-rose-200">
              {locale === "vi"
                ? "Horde: 9 Hồn Đá Đỏ (1 SSR)"
                : "Horde: 9 Soul Stones (1 SSR)"}
            </span>
            <span>•</span>
            <span className="rounded bg-emerald-500/20 px-2 py-0.5 font-semibold text-emerald-800 dark:text-emerald-200">
              {locale === "vi"
                ? "Nature: 18 Hồn Đá Đỏ (2 SSR)"
                : "Nature: 18 Soul Stones (2 SSR)"}
            </span>
            <span>•</span>
            <span className="rounded bg-blue-500/20 px-2 py-0.5 text-blue-800 dark:text-blue-200">
              {locale === "vi"
                ? "League: 27 Hồn Đá Đỏ (3 SSR)"
                : "League: 27 Soul Stones (3 SSR)"}
            </span>
          </div>
        </div>
      </div>

      {/* 3-Faction Selector Tabs */}
      <div
        role="tablist"
        aria-label={
          locale === "vi" ? "Chọn Phe Đội Hình" : "Select Faction Playbook"
        }
        className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3"
      >
        {FACTION_TABS.map((tab) => {
          const isSelected = activeFaction === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              data-testid={`stepper-faction-tab-${tab.id}`}
              onClick={() => setActiveFaction(tab.id)}
              className={`min-h-[44px] flex items-center justify-between gap-2 rounded-xl border px-3.5 py-2.5 text-xs font-bold transition-all cursor-pointer ${
                isSelected
                  ? "border-amber-400/70 bg-amber-500/15 text-foreground dark:text-white shadow-[0_0_16px_rgba(245,158,11,0.18)]"
                  : "border-border/75 dark:border-white/10 bg-muted/30 dark:bg-white/[0.03] text-muted-foreground dark:text-slate-300 hover:border-amber-500/35 hover:bg-muted/60"
              }`}
            >
              <span>{tab.label[locale]}</span>
              <span className="rounded-md bg-background/85 dark:bg-black/40 px-2 py-0.5 font-mono text-xs text-amber-700 dark:text-amber-300">
                {tab.soulStoneBadge[locale]}
              </span>
            </button>
          );
        })}
      </div>

      {/* 4-Stage Stepper Bar */}
      <div
        role="tablist"
        aria-label={t("widgetPivotTitle")}
        className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4"
      >
        {stages.map((stage) => {
          const isActive = stage.stageNumber === activeStageNumber;
          return (
            <button
              key={stage.stageNumber}
              type="button"
              role="tab"
              aria-selected={isActive}
              data-testid={`pivot-stage-btn-${stage.stageNumber}`}
              onClick={() => setActiveStageNumber(stage.stageNumber)}
              className={`min-h-[44px] flex flex-col justify-between rounded-xl border p-3 text-left transition-all cursor-pointer ${
                isActive
                  ? "border-amber-400/60 bg-amber-500/15 text-foreground dark:text-white shadow-[0_0_20px_rgba(245,158,11,0.2)]"
                  : "border-border/75 dark:border-white/10 bg-muted/30 dark:bg-white/[0.03] text-muted-foreground dark:text-slate-300 hover:border-amber-500/35 dark:hover:border-white/20 hover:bg-muted/60 dark:hover:bg-white/[0.06]"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-md bg-background/85 dark:bg-black/40 px-2 py-0.5 font-sans text-xs font-bold text-amber-700 dark:text-amber-300">
                  {stage.dayRangeBadge[locale]}
                </span>
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                    isActive
                      ? "bg-amber-400 text-slate-950"
                      : "bg-muted/70 dark:bg-white/10 text-muted-foreground dark:text-slate-400"
                  }`}
                >
                  {stage.stageNumber}
                </span>
              </div>
              <div className="mt-2 text-sm font-bold leading-snug">
                {stage.shortTitle[locale]}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Stage Detail Panel (Single-Layer Containment on Mobile) */}
      {currentStage && (
        <div
          data-testid="pivot-active-stage-panel"
          className="mt-5 space-y-4 rounded-none border-0 bg-transparent p-0 sm:rounded-xl sm:border sm:border-border/75 dark:sm:border-white/10 sm:bg-muted/35 dark:sm:bg-[#0B0E14]/90 sm:p-5"
        >
          {/* Stage Banner */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/75 dark:border-white/10 pb-3">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                <RichGuideText
                  text={currentStage.stageAndMilestone}
                  variant="inline"
                  accentColor="amber"
                />
              </span>
              <h4 className="mt-0.5 text-base font-bold text-foreground dark:text-white">
                <RichGuideText
                  text={currentStage.queue1Lineup}
                  variant="inline"
                  accentColor="amber"
                />
              </h4>
            </div>
            <span className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1 font-sans text-xs font-bold text-amber-700 dark:text-amber-300">
              {currentStage.auraBadge[locale]}
            </span>
          </div>

          {/* Visual Queue 1 -> Queue 2 Flow */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
            {/* Queue 1 Active Roster */}
            <div className="lg:col-span-7 rounded-xl border-0 sm:border sm:border-border/75 dark:sm:border-white/10 bg-muted/30 dark:bg-white/[0.03] p-3.5">
              <div className="mb-2.5 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
                  <Swords className="h-3.5 w-3.5" />
                  {locale === "vi"
                    ? "Đội 1 Chủ Lực (Queue 1 Main)"
                    : "Queue 1 Main Lineup"}
                </span>
                <span className="text-xs text-muted-foreground dark:text-slate-400">
                  {locale === "vi" ? "6 Vị Trí Ra Trận" : "6 Active Slots"}
                </span>
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {currentStage.queue1Heroes.map((hero, idx) => (
                  <div
                    key={hero.name}
                    className={`flex items-center justify-between gap-2 rounded-lg border px-2.5 py-2 text-xs ${
                      hero.faction === "horde"
                        ? "border-rose-500/35 bg-rose-500/10 text-rose-900 dark:text-rose-100"
                        : hero.faction === "nature"
                          ? "border-emerald-500/35 bg-emerald-500/10 text-emerald-900 dark:text-emerald-100"
                          : "border-blue-500/35 bg-blue-500/10 text-blue-900 dark:text-blue-100"
                    }`}
                  >
                    <span className="inline-flex items-center gap-2 font-bold min-w-0">
                      <span
                        data-testid={`pivot-q1-avatars-${idx}`}
                        className="inline-flex items-center -space-x-1.5 shrink-0"
                      >
                        {resolvePivotHeroProfiles(hero.name).map((prof) => (
                          <GameAssetFrame
                            key={prof.id}
                            src={prof.avatarPath}
                            alt={
                              locale === "vi"
                                ? prof.inGameNameVi
                                : prof.inGameNameEn
                            }
                            size="md"
                            shape="hero"
                            rarity={prof.rarity}
                            faction={prof.faction}
                            showFactionBadge={true}
                          />
                        ))}
                      </span>
                      <span className="truncate">
                        {hero.faction === "horde"
                          ? "🔴 "
                          : hero.faction === "nature"
                            ? "🟢 "
                            : "🔵 "}
                        {hero.name}
                      </span>
                    </span>
                    <span className="shrink-0 rounded bg-background/80 dark:bg-black/30 px-2 py-0.5 font-sans text-xs font-medium text-foreground/90 dark:text-slate-200">
                      {hero.note[locale]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Queue 2 Zero-Loss Inheritance */}
            <div className="lg:col-span-5 rounded-xl border-0 sm:border sm:border-border/75 dark:sm:border-white/10 bg-muted/30 dark:bg-white/[0.03] p-3.5 flex flex-col justify-between">
              <div>
                <div className="mb-2.5 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">
                    <Layers className="h-3.5 w-3.5" />
                    {locale === "vi"
                      ? "Đội 2 Kế Thừa (Zero-Loss Queue 2)"
                      : "Queue 2 Inheritance (Zero-Loss)"}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground dark:text-slate-400" />
                </div>
                <div className="space-y-1.5">
                  {currentStage.queue2Heroes.map((hero, idx) => (
                    <div
                      key={hero.name}
                      className="flex items-center justify-between gap-2 rounded-lg border border-border/75 dark:border-white/10 bg-background/80 dark:bg-black/30 px-2.5 py-1.5 text-xs text-foreground/90 dark:text-slate-200"
                    >
                      <span className="inline-flex items-center gap-2 font-semibold min-w-0">
                        <span
                          data-testid={`pivot-q2-avatars-${idx}`}
                          className="inline-flex items-center -space-x-1.5 shrink-0"
                        >
                          {resolvePivotHeroProfiles(hero.name).map((prof) => (
                            <GameAssetFrame
                              key={prof.id}
                              src={prof.avatarPath}
                              alt={
                                locale === "vi"
                                  ? prof.inGameNameVi
                                  : prof.inGameNameEn
                              }
                              size="sm"
                              shape="hero"
                              rarity={prof.rarity}
                              faction={prof.faction}
                              showFactionBadge={true}
                            />
                          ))}
                        </span>
                        <span className="truncate">{hero.name}</span>
                      </span>
                      <span className="shrink-0 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                        {hero.note[locale]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <RichGuideText
                text={currentStage.leagueRosterRole}
                accentColor="sky"
                className="mt-3 border-t border-border/75 dark:border-white/10 pt-2.5 text-sm sm:text-base leading-relaxed text-foreground/90 dark:text-slate-200"
              />
            </div>
          </div>

          {/* Zero-Loss Resource Discipline Cards (Shards/Books + Gear/Soul Stones) */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="rounded-xl border border-amber-500/25 bg-amber-500/[0.06] p-3.5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
                {(() => {
                  const shardAsset = getAssetById("item-universal-shard");
                  return shardAsset ? (
                    <GameAssetFrame
                      src={shardAsset.iconPath}
                      alt=""
                      size="sm"
                      rarity={shardAsset.rarity}
                    />
                  ) : (
                    <Sparkles className="h-4 w-4 text-amber-400" />
                  );
                })()}
                <span>
                  {locale === "vi"
                    ? "Kỷ Luật Mảnh Vạn Năng & Sách Kỹ Năng"
                    : "Universal Shard & Skill Book Discipline"}
                </span>
              </div>
              <RichGuideText
                text={currentStage.shardAndBookRule}
                accentColor="amber"
                className="mt-2 text-sm sm:text-base leading-relaxed text-foreground/90 dark:text-slate-200"
              />
            </div>

            <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/[0.06] p-3.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                  {(() => {
                    const gearAsset = getAssetById("gear-set-blood-of-the-titan");
                    return gearAsset ? (
                      <GameAssetFrame
                        src={gearAsset.iconPath}
                        alt=""
                        size="sm"
                        rarity={gearAsset.rarity}
                        faction={gearAsset.faction}
                        showFactionBadge={true}
                      />
                    ) : (
                      <Shield className="h-4 w-4 text-emerald-400" />
                    );
                  })()}
                  <span>
                    {locale === "vi"
                      ? "Đồ Vàng (+10/+20/+30), Công Trình & Hồn Đá Đỏ"
                      : "Golden Gear, Buildings & Soul Stones"}
                  </span>
                </div>
                {!hasProAccess && (
                  <span className="inline-flex items-center gap-1 rounded bg-amber-500/20 px-2 py-0.5 text-xs font-bold text-amber-700 dark:text-amber-300">
                    <Lock className="h-3 w-3" /> PRO
                  </span>
                )}
              </div>
              <RichGuideText
                text={currentStage.gearAndBuildingRule}
                accentColor="emerald"
                className="mt-2 text-sm sm:text-base leading-relaxed text-foreground/90 dark:text-slate-200"
              />
            </div>
          </div>

          {/* Mythic Star Conversion Footnote */}
          <div className="flex items-center gap-2 rounded-lg border border-border/75 dark:border-white/10 bg-muted/25 dark:bg-white/[0.02] px-3 py-2.5 text-xs text-muted-foreground dark:text-slate-300 leading-relaxed">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
            <span>
              {locale === "vi"
                ? "Chuẩn Sao Mythic SSoT: 1★ Đỏ = 6 Sao (160 Mảnh) • 5★ Đỏ = 10 Sao (400 Mảnh) • 1★ Trắng/Bạc = 11 Sao (560 Mảnh, +30% Skill)."
                : "Mythic Star SSoT: 1-Red Star = 6 Stars (160 Shards) • 5-Red Stars = 10 Stars (400 Shards) • 1-White/Silver Star = 11 Stars (560 Shards, +30% Skill)."}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export const FactionProgressionStepperWidget = HordePivotStepperWidget;

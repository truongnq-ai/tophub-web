"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Shield,
  Swords,
  Sparkles,
  ArrowRightLeft,
  Crown,
  Lock,
  Crosshair,
  AlertTriangle,
} from "lucide-react";
import type {
  GuideArticle,
  GuideLocale,
  GuideTableBlock,
} from "@/content/guides/types";
import { ARTICLE_2_3_FORMATION_COUNTERS } from "@/content/guides/groups/group-2/2.3-formation-and-counters";
import {
  extractHeroProfilesFromText,
  HERO_VISUAL_PROFILES,
  resolveGearSetAssetsFromText,
  resolveSlotHeroProfiles,
} from "@/content/guides/asset-registry";
import { GameAssetFrame } from "@/components/guides/media/game-asset-frame";
import { RichGuideText } from "@/components/guides/blocks/rich-guide-text";
import { useUidSession } from "@/hooks/use-uid-session";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export type FormationLineupId =
  | "league-starter"
  | "league-endgame"
  | "horde-hybrid"
  | "horde-endgame"
  | "nature-transition"
  | "nature-endgame";

export type FormationBoardMode = "board" | "swaps";

export interface FormationSlotEntry {
  slotNumber: 1 | 2 | 3 | 4 | 5 | 6;
  rowZone: "frontline" | "midline_safe" | "backline_dive";
  wing: "left" | "right";
  heroName: Record<GuideLocale, string>;
  rarity: "mythic" | "legendary";
  roleBadge: Record<GuideLocale, string>;
  mvsSweetSpot: Record<GuideLocale, string>;
  slotReason: Record<GuideLocale, string>;
}

export interface FormationLineupPreset {
  id: FormationLineupId;
  tocSubSectionId: string;
  faction: "league" | "horde" | "nature";
  shortLabel: Record<GuideLocale, string>;
  fullTitle: Record<GuideLocale, string>;
  stageTiming: Record<GuideLocale, string>;
  auraBonus: Record<GuideLocale, string>;
  soulStoneBudget: Record<GuideLocale, string>;
  counterAdvantage: Record<GuideLocale, string>;
  slots: FormationSlotEntry[];
}

export interface ArenaCounterSwapRecord {
  index: number;
  scenarioTitle: string;
  enemyThreat: string;
  swapExecution: string;
  combatImpact: string;
  highlightSlots: number[];
}

export interface TacticalFormationBoardWidgetProps {
  article?: GuideArticle;
  locale?: GuideLocale;
  forceUnlockPro?: boolean;
}

const FACTION_CREST_PATHS: Record<"league" | "horde" | "nature", string> = {
  league: "/images/factions/race_alliance.webp",
  horde: "/images/factions/race_horde.webp",
  nature: "/images/factions/race_nature.webp",
};

const LINEUP_PRESETS: FormationLineupPreset[] = [
  {
    id: "league-starter",
    tocSubSectionId: "sub-1-1-league-starter-transition",
    faction: "league",
    shortLabel: {
      vi: "Liên Minh Khởi Đầu (Ngày 1–20)",
      en: "League Starter (Days 1–20)",
    },
    fullTitle: {
      vi: "Đội Hình Khởi Đầu & Chuyển Tiếp Liên Minh (6 SSR Tavern/Early)",
      en: "League Starter & Transition Formation (6 SSR Early Meta)",
    },
    stageTiming: {
      vi: "Ngày 1 – Ngày 20 (Cầu nối trước khi mở Tướng Đỏ)",
      en: "Days 1 – 20 (Starter bridge before Mythic unlocks)",
    },
    auraBonus: {
      vi: "6/6 Liên Minh: +35% ATK & HP toàn đội",
      en: "6/6 Pure League: +35% Team ATK & HP",
    },
    soulStoneBudget: {
      vi: "0 Hồn Đá Đỏ (Cấm đút Mảnh Vàng Vạn Năng cho tướng Tavern)",
      en: "0 Soul Stones (Zero Universal Shards on Tavern SSRs)",
    },
    counterAdvantage: {
      vi: "🔵 Liên Minh khắc chế 🟢 Thiên Nhiên (+20% DMG) • Bị 🔴 Bộ Lạc khắc chế (-20%)",
      en: "🔵 League counters 🟢 Nature (+20% DMG) • Countered by 🔴 Horde (-20%)",
    },
    slots: [
      {
        slotNumber: 1,
        rowZone: "frontline",
        wing: "left",
        heroName: {
          vi: "Adjudicator (Trọng Tài)",
          en: "Adjudicator",
        },
        rarity: "legendary",
        roleBadge: { vi: "🛡️ Main Tank (Cột Trái)", en: "🛡️ Main Tank (Left)" },
        mvsSweetSpot: { vi: "1★ Trắng (280 Mảnh)", en: "1★ White (280 Shards)" },
        slotReason: {
          vi: "Khiên Bất Tử chặn 80% sát thương trực diện cột trái, che chắn tuyệt đối cho Pyromancer đứng ngay sau lưng ở Ô 3.",
          en: "Immortal Shield absorbs 80% of left-column direct aggro, shielding Pyromancer directly behind in Slot 3.",
        },
      },
      {
        slotNumber: 2,
        rowZone: "frontline",
        wing: "right",
        heroName: {
          vi: "Secret Keeper (Người Giữ Bí Mật)",
          en: "Secret Keeper",
        },
        rarity: "legendary",
        roleBadge: { vi: "🛡️ Off-Tank / Câm Lặng", en: "🛡️ Off-Tank / Silence" },
        mvsSweetSpot: { vi: "Mảnh Tavern tự nhiên", en: "Free Tavern Shards" },
        slotReason: {
          vi: "Tạo khiên phép và làm Câm lặng tuyến đầu địch ở cánh phải; về sau nhường vị trí cho Rose Princess.",
          en: "Provides magic shields and silences enemy frontline on the right wing; later replaced by Rose Princess.",
        },
      },
      {
        slotNumber: 3,
        rowZone: "midline_safe",
        wing: "left",
        heroName: {
          vi: "Pyromancer (Pháp Sư Lửa)",
          en: "Pyromancer",
        },
        rarity: "legendary",
        roleBadge: {
          vi: "👑 Hyper-Carry DPS (Vùng An Toàn)",
          en: "👑 Hyper-Carry DPS (Safe Zone)",
        },
        mvsSweetSpot: { vi: "1★ Trắng ➔ Thức Tỉnh", en: "1★ White ➔ Awaken" },
        slotReason: {
          vi: "Đứng ở Ô 3 (Hàng Giữa) giúp Pyromancer miễn nhiễm đòn đánh thường tuyến đầu VÀ không bị sát thủ nhảy hàng sau (Ô 5–6) chém trúng.",
          en: "Standing in Slot 3 (Midline Safe Zone) protects Pyromancer from frontline aggro AND backline assassin dives into Slots 5–6.",
        },
      },
      {
        slotNumber: 4,
        rowZone: "midline_safe",
        wing: "right",
        heroName: {
          vi: "Paragon / Astrologer",
          en: "Paragon / Astrologer",
        },
        rarity: "mythic",
        roleBadge: {
          vi: "⚔️ Sub-DPS Sát Thương Chuẩn",
          en: "⚔️ Burst / True DMG Sub-DPS",
        },
        mvsSweetSpot: { vi: "1★ Đỏ (160 Mảnh)", en: "1★ Red (160 Shards)" },
        slotReason: {
          vi: "Vị trí an toàn thứ 2 ở Hàng Giữa để xả sát thương diện rộng và buff Chí mạng cho toàn đội Liên Minh.",
          en: "Second Midline Safe Zone slot to unleash AoE burst and team-wide Crit buffs.",
        },
      },
      {
        slotNumber: 5,
        rowZone: "backline_dive",
        wing: "left",
        heroName: {
          vi: "Nun (Nữ Tu)",
          en: "Nun",
        },
        rarity: "legendary",
        roleBadge: { vi: "✨ Healer Bơm Máu", en: "✨ Primary Healer" },
        mvsSweetSpot: { vi: "1★ Trắng (280 Mảnh)", en: "1★ White (280 Shards)" },
        slotReason: {
          vi: "Hồi máu liên tục và tăng giới hạn HP từ Hàng Sau; cần dè chừng khi gặp đội hình có Wukong/Windwalker nhảy Ô 5.",
          en: "Sustains team HP from the Backline; swap with Off-Tank in Arena when facing Wukong/Windwalker dive.",
        },
      },
      {
        slotNumber: 6,
        rowZone: "backline_dive",
        wing: "right",
        heroName: {
          vi: "Bard (Thi Nhân)",
          en: "Bard",
        },
        rarity: "legendary",
        roleBadge: { vi: "🎵 Buff Tốc Độ Hồi Nộ", en: "🎵 Energy & Cooldown Buffer" },
        mvsSweetSpot: { vi: "2★ Trắng (+40% Xây Dựng)", en: "2★ White (+40% Build)" },
        slotReason: {
          vi: "Giảm thời gian hồi chiêu cho Pyromancer/Paragon xả bão lửa liên hoàn, đồng thời cộng +40% tốc độ xây dựng Lâu Đài.",
          en: "Accelerates skill cooldowns for Pyromancer/Paragon while granting +40% Castle construction speed.",
        },
      },
    ],
  },
  {
    id: "league-endgame",
    tocSubSectionId: "sub-1-2-league-endgame-pure",
    faction: "league",
    shortLabel: {
      vi: "Liên Minh Endgame (3 Mythic)",
      en: "League Endgame (3 Mythics)",
    },
    fullTitle: {
      vi: "Đội Hình Thuần Liên Minh Cuối Game (Rose Princess + Paragon + Artificer)",
      en: "League Endgame Pure Meta Lineup (Rose Princess + Paragon + Artificer)",
    },
    stageTiming: {
      vi: "Season 1 – Season 4 (3 Mythic + 3 Legendary Thức Tỉnh)",
      en: "Season 1 – Season 4 (3 Native Mythics + 3 Awakened Legendaries)",
    },
    auraBonus: {
      vi: "6/6 Liên Minh: +35% ATK & HP + +20% DMG lên Thiên Nhiên",
      en: "6/6 Pure League: +35% ATK & HP + +20% DMG vs Nature",
    },
    soulStoneBudget: {
      vi: "18 – 27 Hồn Đá Đỏ (Đắt gấp 2–3 lần Bộ Lạc)",
      en: "18 – 27 Soul Stones (2–3x more expensive than Horde)",
    },
    counterAdvantage: {
      vi: "🔵 Khắc chế cứng 🟢 Thiên Nhiên (Tidecaller) • Yếu thế trước 🔴 Bộ Lạc",
      en: "🔵 Hard-counters 🟢 Nature (Tidecaller) • Vulnerable to 🔴 Horde",
    },
    slots: [
      {
        slotNumber: 1,
        rowZone: "frontline",
        wing: "left",
        heroName: {
          vi: "Rose Princess (Công Chúa Hoa Hồng)",
          en: "Rose Princess",
        },
        rarity: "mythic",
        roleBadge: { vi: "👑 Mythic Main Tank", en: "👑 Mythic Main Tank" },
        mvsSweetSpot: { vi: "1★ Trắng (560 Mảnh)", en: "1★ White (560 Shards)" },
        slotReason: {
          vi: "Tạo khiên toàn đội, gom sát thương và phản đòn cực mạnh ở Ô 1 tuyến đầu.",
          en: "Team-wide shielding, damage absorption, and frontline counter-burst in Slot 1.",
        },
      },
      {
        slotNumber: 2,
        rowZone: "frontline",
        wing: "right",
        heroName: {
          vi: "Adjudicator (Trọng Tài Đỏ)",
          en: "Adjudicator (Awakened)",
        },
        rarity: "legendary",
        roleBadge: { vi: "🛡️ Awakened Tank (9 Đá)", en: "🛡️ Awakened Tank (9 Stones)" },
        mvsSweetSpot: { vi: "Thức Tỉnh Đỏ (9 Hồn Đá)", en: "Mythic Awakened (9 Stones)" },
        slotReason: {
          vi: "Khóa chặt cánh phải nhờ Khiên Bất Tử, tạo bức tường thép kép cùng Rose Princess.",
          en: "Locks down the right column with Immortal Shield alongside Rose Princess.",
        },
      },
      {
        slotNumber: 3,
        rowZone: "midline_safe",
        wing: "left",
        heroName: {
          vi: "Paragon (Thánh Nữ)",
          en: "Paragon",
        },
        rarity: "mythic",
        roleBadge: { vi: "👑 Hyper-Carry Số 1", en: "👑 #1 Hyper-Carry DPS" },
        mvsSweetSpot: { vi: "1★ Trắng (560 Mảnh) + UW", en: "1★ White (560 Shards) + UW" },
        slotReason: {
          vi: "Đứng sau lưng Rose Princess tại Ô 3 Vùng An Toàn để gọi Thiên Thạch Sát Thương Chuẩn đốt cháy toàn bản đồ.",
          en: "Positioned safely in Slot 3 behind Rose Princess to rain True Damage meteors.",
        },
      },
      {
        slotNumber: 4,
        rowZone: "midline_safe",
        wing: "right",
        heroName: {
          vi: "Artificer / Pyromancer Đỏ",
          en: "Artificer / Awakened Pyro",
        },
        rarity: "mythic",
        roleBadge: { vi: "⚔️ Khuếch Đại & Sốc Phép", en: "⚔️ Tech Amplifier & Burst" },
        mvsSweetSpot: { vi: "1★ Trắng (560 Mảnh)", en: "1★ White (560 Shards)" },
        slotReason: {
          vi: "Cộng hưởng sát thương kỹ năng ở Ô 4 Vùng An Toàn cùng Paragon.",
          en: "Amplifies skill burst in Midline Safe Slot 4 alongside Paragon.",
        },
      },
      {
        slotNumber: 5,
        rowZone: "backline_dive",
        wing: "left",
        heroName: {
          vi: "Bishop (Giám Mục)",
          en: "Bishop",
        },
        rarity: "mythic",
        roleBadge: { vi: "✨ Khắc Chế Triệu Hồi", en: "✨ Anti-Summon & Shield" },
        mvsSweetSpot: { vi: "1★ Đỏ ➔ 1★ Trắng", en: "1★ Red ➔ 1★ White" },
        slotReason: {
          vi: "Tia sáng trừng phạt ở Ô 5 xóa sổ đệ triệu hồi của Tidecaller và giải hiệu ứng xấu.",
          en: "Punishing beams from Slot 5 clear Tidecaller summons and cleanse debuffs.",
        },
      },
      {
        slotNumber: 6,
        rowZone: "backline_dive",
        wing: "right",
        heroName: {
          vi: "Nun (Nữ Tu Đỏ)",
          en: "Nun (Awakened)",
        },
        rarity: "legendary",
        roleBadge: { vi: "💚 Đại Tư Tế Hồi Phục", en: "💚 Supreme Healer" },
        mvsSweetSpot: { vi: "1★ Trắng / Thức Tỉnh", en: "1★ White / Awakened" },
        slotReason: {
          vi: "Giữ nhịp sinh tồn cho toàn bộ 6 vị trí Liên Minh trong giao tranh kéo dài.",
          en: "Sustains all 6 League positions through prolonged endgame battles.",
        },
      },
    ],
  },
  {
    id: "horde-hybrid",
    tocSubSectionId: "sub-2-1-horde-hybrid-and-early",
    faction: "horde",
    shortLabel: {
      vi: "Cầu Nối Lai 4-2 (Ngày 21–40)",
      en: "4-2 Hybrid Bridge (Days 21–40)",
    },
    fullTitle: {
      vi: "Đội Hình Cầu Nối Lai 4 Liên Minh + 2 Bộ Lạc (Zero-Loss Bridge)",
      en: "4 League + 2 Horde Hybrid Bridge Lineup (Days 21–40)",
    },
    stageTiming: {
      vi: "Ngày 21 – Ngày 40 (Khi vừa mở Desert Prince & Storm Maiden)",
      en: "Days 21 – 40 (Upon unlocking Desert Prince & Storm Maiden)",
    },
    auraBonus: {
      vi: "Hào quang 4+2: +15% ATK & HP + Sức mạnh vượt trội của 2 Tướng Đỏ",
      en: "4+2 Hybrid Aura: +15% ATK & HP + Dual Mythic Power Spike",
    },
    soulStoneBudget: {
      vi: "Đang tích lũy 9 Hồn Đá Đỏ (360k Guild Honor / 54k Xu)",
      en: "Saving 9 Soul Stones (360k Guild Honor / 54k Guild Coins)",
    },
    counterAdvantage: {
      vi: "⚡ Giai đoạn chuyển giao mượt mà không làm tụt hạng Arena",
      en: "⚡ Seamless transition bridge with zero Arena rank drop",
    },
    slots: [
      {
        slotNumber: 1,
        rowZone: "frontline",
        wing: "left",
        heroName: {
          vi: "Desert Prince (Hoàng Tử Sa Mạc)",
          en: "Desert Prince",
        },
        rarity: "mythic",
        roleBadge: { vi: "🔴 Mythic Bruiser Tank", en: "🔴 Mythic Bruiser Tank" },
        mvsSweetSpot: { vi: "1★ Đỏ ➔ 1★ Trắng (560)", en: "1★ Red ➔ 1★ White (560)" },
        slotReason: {
          vi: "Tướng Đỏ Bộ Lạc đầu tiên bước vào Ô 1 thay Tank phụ Liên Minh, vừa chống chịu vừa chém sát thương chuẩn.",
          en: "First Horde Mythic entering Slot 1 to replace secondary League tank with massive True Damage.",
        },
      },
      {
        slotNumber: 2,
        rowZone: "frontline",
        wing: "right",
        heroName: {
          vi: "Adjudicator (Trọng Tài)",
          en: "Adjudicator",
        },
        rarity: "legendary",
        roleBadge: { vi: "🔵 Cầu Nối Liên Minh", en: "🔵 League Bridge Tank" },
        mvsSweetSpot: { vi: "Giữ nguyên cấp cũ", en: "Keep existing investment" },
        slotReason: {
          vi: "Giữ Ô 2 để kích hoạt mốc 4 tướng Liên Minh (+15% Aura) trong khi chờ Beastmaster.",
          en: "Holds Slot 2 to preserve the 4-League (+15% Aura) bonus while awaiting Beastmaster.",
        },
      },
      {
        slotNumber: 3,
        rowZone: "midline_safe",
        wing: "left",
        heroName: {
          vi: "Storm Maiden (Thần Nữ Bão Tố)",
          en: "Storm Maiden",
        },
        rarity: "mythic",
        roleBadge: { vi: "🔴 Mythic Hyper-Carry", en: "🔴 Mythic Hyper-Carry" },
        mvsSweetSpot: { vi: "1★ Trắng (560 Mảnh)", en: "1★ White (560 Shards)" },
        slotReason: {
          vi: "Đứng tại Ô 3 Vùng An Toàn ngay sau lưng Desert Prince để thả lốc xoáy xuyên cột dọc.",
          en: "Protected in Safe Slot 3 behind Desert Prince to unleash vertical column cyclones.",
        },
      },
      {
        slotNumber: 4,
        rowZone: "midline_safe",
        wing: "right",
        heroName: {
          vi: "Pyromancer (Pháp Sư Lửa)",
          en: "Pyromancer",
        },
        rarity: "legendary",
        roleBadge: { vi: "🔵 Cầu Nối DPS Phụ", en: "🔵 Bridge Sub-DPS" },
        mvsSweetSpot: { vi: "1★ Trắng (Chuẩn bị sang Đội 2)", en: "1★ White (Ready for Queue 2)" },
        slotReason: {
          vi: "Tiếp tục phụ sát thương ở Ô 4 cho đến Ngày 41 rồi chuyển nguyên vẹn xuống làm Chủ lực Đội 2.",
          en: "Provides secondary burst in Slot 4 until Day 41 before moving intact to anchor Queue 2.",
        },
      },
      {
        slotNumber: 5,
        rowZone: "backline_dive",
        wing: "left",
        heroName: {
          vi: "Nun (Nữ Tu)",
          en: "Nun",
        },
        rarity: "legendary",
        roleBadge: { vi: "🔵 Cầu Nối Hồi Máu", en: "🔵 Bridge Healer" },
        mvsSweetSpot: { vi: "Giữ nguyên chờ Witch", en: "Hold until Witch Day 41" },
        slotReason: {
          vi: "Giữ máu cho đội hình Lai 4-2 trước khi Witch ra mắt ở Ngày 41.",
          en: "Sustains the 4-2 Hybrid squad until Witch unlocks on Day 41.",
        },
      },
      {
        slotNumber: 6,
        rowZone: "backline_dive",
        wing: "right",
        heroName: {
          vi: "Bard (Thi Nhân)",
          en: "Bard",
        },
        rarity: "legendary",
        roleBadge: { vi: "🔵 Cầu Nối Hồi Nộ", en: "🔵 Bridge Cooldown Buffer" },
        mvsSweetSpot: { vi: "Giữ nguyên", en: "Keep existing stars" },
        slotReason: {
          vi: "Mảnh ghép thứ 4 của Liên Minh giúp Desert Prince & Storm Maiden tung chiêu liên tục.",
          en: "Completes the 4-League bridge while accelerating Desert Prince & Storm Maiden ultimates.",
        },
      },
    ],
  },
  {
    id: "horde-endgame",
    tocSubSectionId: "sub-2-2-horde-endgame-5mythic",
    faction: "horde",
    shortLabel: {
      vi: "Bộ Lạc Đỉnh Cao (5 Mythic — Khuyên Dùng #1)",
      en: "Horde Endgame (5 Mythics — #1 F2P Pick)",
    },
    fullTitle: {
      vi: "Đội Hình Thuần Bộ Lạc 5 Mythic + 1 Awakened (Lộ Trình Vua F2P/Low-Spender)",
      en: "Pure Horde 5-Mythic + 1 Awakened Endgame Lineup (#1 Optimal F2P/Low-Spender Meta)",
    },
    stageTiming: {
      vi: "Ngày 41+ đến Season 1–4 (Hoàn tất Xoay Trục Bộ Lạc)",
      en: "Day 41+ through Season 1–4 (Full Horde Pivot Complete)",
    },
    auraBonus: {
      vi: "6/6 Bộ Lạc: +35% ATK & HP + +20% DMG khắc chế Liên Minh",
      en: "6/6 Pure Horde: +35% ATK & HP + +20% Counter DMG vs League",
    },
    soulStoneBudget: {
      vi: "🔥 Chỉ tốn 9 Hồn Đá Đỏ + 345–385 Mảnh (Cho duy nhất Soulmancer / Warlock)",
      en: "🔥 Only 9 Soul Stones + 345–385 Shards (For Soulmancer / Warlock alone)",
    },
    counterAdvantage: {
      vi: "🔴 Khắc chế +20% trước 75% dân số Server chơi 🔵 Liên Minh!",
      en: "🔴 +20% Counter DMG against 75% of the server playing 🔵 League!",
    },
    slots: [
      {
        slotNumber: 1,
        rowZone: "frontline",
        wing: "left",
        heroName: {
          vi: "Beastmaster (Chúa Tể Muông Thú)",
          en: "Beastmaster",
        },
        rarity: "mythic",
        roleBadge: { vi: "🛡️ Mythic Main Tank", en: "🛡️ Mythic Main Tank" },
        mvsSweetSpot: { vi: "1★ Trắng (560 Mảnh)", en: "1★ White (560 Shards)" },
        slotReason: {
          vi: "Chốt chặn bất khả xâm phạm ở Ô 1 với Khiên Máu và Gấu triệu hồi gom toàn bộ Aggro cánh trái.",
          en: "Unbreakable Slot 1 fortress with HP shields and Bear summon locking left-wing aggro.",
        },
      },
      {
        slotNumber: 2,
        rowZone: "frontline",
        wing: "right",
        heroName: {
          vi: "Desert Prince (Hoàng Tử Sa Mạc)",
          en: "Desert Prince",
        },
        rarity: "mythic",
        roleBadge: { vi: "⚔️ Mythic Bruiser / Off-Tank", en: "⚔️ Mythic Bruiser / Off-Tank" },
        mvsSweetSpot: { vi: "1★ Trắng (560 Mảnh) + UW", en: "1★ White (560 Shards) + UW" },
        slotReason: {
          vi: "Đứng Ô 2 nhận đòn để tích đầy Nộ trong 3 giây và bổ đôi tuyến đầu đối phương bằng Sát thương chuẩn.",
          en: "Takes frontline hits in Slot 2 to fill Rage in 3s and cleave enemy tanks with True Damage.",
        },
      },
      {
        slotNumber: 3,
        rowZone: "midline_safe",
        wing: "left",
        heroName: {
          vi: "Wukong (Tề Thiên Đại Thánh)",
          en: "Wukong",
        },
        rarity: "mythic",
        roleBadge: { vi: "👑 Thần Chiến Tranh (Hyper-Carry)", en: "👑 God of War Hyper-Carry" },
        mvsSweetSpot: { vi: "1★ Trắng ➔ 5★ Trắng + UW Lv.20", en: "1★ White ➔ 5★ White + UW Lv.20" },
        slotReason: {
          vi: "Đứng tại Ô 3 Vùng An Toàn để gọi Phân Thân Lông Khỉ (thừa hưởng 100% Flat ATK từ Bộ Kỵ Sĩ) và nhảy bổ vào Hàng sau địch.",
          en: "Starts in Safe Slot 3 to summon clones (inheriting 100% Flat ATK) and dive enemy Backline.",
        },
      },
      {
        slotNumber: 4,
        rowZone: "midline_safe",
        wing: "right",
        heroName: {
          vi: "Storm Maiden (Thần Nữ Bão Tố)",
          en: "Storm Maiden",
        },
        rarity: "mythic",
        roleBadge: { vi: "🌪️ AoE Hyper-Carry Số 2", en: "🌪️ #2 AoE Hyper-Carry" },
        mvsSweetSpot: { vi: "1★ Trắng (560 Mảnh) + UW Lv.10", en: "1★ White (560 Shards) + UW Lv.10" },
        slotReason: {
          vi: "An toàn tuyệt đối sau lưng Desert Prince tại Ô 4, quét sạch cột dọc bằng lốc xoáy chí mạng.",
          en: "Safely positioned in Slot 4 behind Desert Prince to sweep columns with critical tornadoes.",
        },
      },
      {
        slotNumber: 5,
        rowZone: "backline_dive",
        wing: "left",
        heroName: {
          vi: "Witch (Phù Thủy Hắc Ám)",
          en: "Witch",
        },
        rarity: "mythic",
        roleBadge: { vi: "✨ Mythic Healer & Cấm Hồi Máu", en: "✨ Mythic Healer & Anti-Heal" },
        mvsSweetSpot: { vi: "1★ Trắng (560 Mảnh)", en: "1★ White (560 Shards)" },
        slotReason: {
          vi: "Trái tim hồi phục của Bộ Lạc ở Ô 5, vừa bơm máu toàn đội vừa nguyền rủa giảm phòng thủ địch.",
          en: "Core Horde healer in Slot 5 providing team-wide sustain and armor-shredding curses.",
        },
      },
      {
        slotNumber: 6,
        rowZone: "backline_dive",
        wing: "right",
        heroName: {
          vi: "Soulmancer / Warlock (Thức Tỉnh Đỏ)",
          en: "Soulmancer / Warlock (Awakened)",
        },
        rarity: "legendary",
        roleBadge: { vi: "🔥 Tướng Vàng Thức Tỉnh Duy Nhất", en: "🔥 Sole Awakened Legendary" },
        mvsSweetSpot: { vi: "9 Hồn Đá Đỏ + 345–385 Mảnh", en: "9 Soul Stones + 345–385 Shards" },
        slotReason: {
          vi: "Soulmancer (Chia sẻ sát thương bảo vệ Wukong) hoặc Warlock (Buff Tốc đánh & Hút máu điên cuồng) — chỉ tốn đúng 9 Hồn Đá Đỏ!",
          en: "Soulmancer (Damage Link protecting Wukong) or Warlock (Frenzy ATK Speed/Lifesteal buff) — costs only 9 Soul Stones!",
        },
      },
    ],
  },
  {
    id: "nature-transition",
    tocSubSectionId: "sub-3-1-nature-transition",
    faction: "nature",
    shortLabel: {
      vi: "Thiên Nhiên Chuyển Tiếp (S0–S1)",
      en: "Nature Transition (S0–S1)",
    },
    fullTitle: {
      vi: "Đội Hình Thiên Nhiên Khởi Đầu & Chuyển Tiếp (Pixie + Forest Maiden)",
      en: "Nature Starter & Transition Formation (Pixie + Forest Maiden)",
    },
    stageTiming: {
      vi: "Cuối S0 – Đầu Season 1 (Trước khi hoàn thiện bộ đôi Monk + Tidecaller)",
      en: "Late S0 – Early Season 1 (Before full Monk + Tidecaller engine)",
    },
    auraBonus: {
      vi: "6/6 Thiên Nhiên: +35% ATK & HP toàn đội",
      en: "6/6 Pure Nature: +35% Team ATK & HP",
    },
    soulStoneBudget: {
      vi: "18 Hồn Đá Đỏ (Ưu tiên đánh thức Pixie & Sage/Forest Maiden)",
      en: "18 Soul Stones (Prioritize awakening Pixie & Sage/Forest Maiden)",
    },
    counterAdvantage: {
      vi: "🟢 Thiên Nhiên khắc chế 🔴 Bộ Lạc (+20% DMG) • Bị 🔵 Liên Minh khắc chế (-20%)",
      en: "🟢 Nature counters 🔴 Horde (+20% DMG) • Countered by 🔵 League (-20%)",
    },
    slots: [
      {
        slotNumber: 1,
        rowZone: "frontline",
        wing: "left",
        heroName: {
          vi: "Sage (Hiền Nhân)",
          en: "Sage",
        },
        rarity: "legendary",
        roleBadge: { vi: "🛡️ Tank Hồi Phục & Khiên", en: "🛡️ Sustain & Shield Tank" },
        mvsSweetSpot: { vi: "1★ Trắng (280 Mảnh)", en: "1★ White (280 Shards)" },
        slotReason: {
          vi: "Chịu đòn chính ở Ô 1 và giảm sát thương nhận vào cho cả cột trái.",
          en: "Absorbs primary aggro in Slot 1 while reducing damage taken along the left column.",
        },
      },
      {
        slotNumber: 2,
        rowZone: "frontline",
        wing: "right",
        heroName: {
          vi: "Treeguard (Mộc Tinh)",
          en: "Treeguard",
        },
        rarity: "legendary",
        roleBadge: { vi: "🌲 Off-Tank Rễ Cây", en: "🌲 Root Control Off-Tank" },
        mvsSweetSpot: { vi: "Mảnh Tavern tự nhiên", en: "Free Tavern Shards" },
        slotReason: {
          vi: "Trói chân tuyến đầu địch ở Ô 2 trước khi nhường chỗ cho Monk và Ne Zha.",
          en: "Roots enemy frontline in Slot 2 until replaced by Monk and Ne Zha.",
        },
      },
      {
        slotNumber: 3,
        rowZone: "midline_safe",
        wing: "left",
        heroName: {
          vi: "Pixie (Tiên Hoa)",
          en: "Pixie",
        },
        rarity: "legendary",
        roleBadge: { vi: "👑 Sát Thương Phép Chuẩn", en: "👑 AoE Burst Carry" },
        mvsSweetSpot: { vi: "Thức Tỉnh Đỏ (9 Hồn Đá)", en: "Mythic Awakened (9 Stones)" },
        slotReason: {
          vi: "Đứng tại Ô 3 Vùng An Toàn để xả phấn hoa nổ diện rộng liên tục.",
          en: "Protected in Safe Slot 3 to detonate continuous AoE pollen blasts.",
        },
      },
      {
        slotNumber: 4,
        rowZone: "midline_safe",
        wing: "right",
        heroName: {
          vi: "Windwalker (Phong Hành Giả)",
          en: "Windwalker",
        },
        rarity: "legendary",
        roleBadge: { vi: "🗡️ Sát Thủ Móc Lốp", en: "🗡️ Backline Dive Assassin" },
        mvsSweetSpot: { vi: "1★ Trắng", en: "1★ White" },
        slotReason: {
          vi: "Xuất phát từ Ô 4 để lao vào kết liễu Healer hàng sau của đối phương.",
          en: "Launches from Slot 4 to dive and execute enemy backline healers.",
        },
      },
      {
        slotNumber: 5,
        rowZone: "backline_dive",
        wing: "left",
        heroName: {
          vi: "Forest Maiden (Thần Nữ Rừng Xanh)",
          en: "Forest Maiden",
        },
        rarity: "legendary",
        roleBadge: { vi: "🐑 Khống Chế & Cộng Hưởng Đệ", en: "🐑 Polymorph & Summon Engine" },
        mvsSweetSpot: { vi: "1★ Trắng ➔ Thức Tỉnh", en: "1★ White ➔ Awaken" },
        slotReason: {
          vi: "Biến cừu kẻ địch từ Ô 5 và hồi năng lượng mỗi khi đệ triệu hồi biến mất.",
          en: "Polymorphs enemies from Slot 5 and refunds energy whenever summons expire.",
        },
      },
      {
        slotNumber: 6,
        rowZone: "backline_dive",
        wing: "right",
        heroName: {
          vi: "Druid (Tu Sĩ Rừng)",
          en: "Druid",
        },
        rarity: "legendary",
        roleBadge: { vi: "🌿 Hồi Máu & Gọi Đệ", en: "🌿 Sustain & Ent Summoner" },
        mvsSweetSpot: { vi: "Mảnh Tavern", en: "Free Tavern Shards" },
        slotReason: {
          vi: "Hồi máu theo thời gian (HoT) ở Ô 6 giữ tuyến đầu sống sót.",
          en: "Provides Heal-over-Time (HoT) from Slot 6 to sustain the frontline.",
        },
      },
    ],
  },
  {
    id: "nature-endgame",
    tocSubSectionId: "sub-3-2-nature-endgame-pure",
    faction: "nature",
    shortLabel: {
      vi: "Thiên Nhiên Đỉnh Cao (Tidecaller + Ne Zha)",
      en: "Nature Endgame (Tidecaller + Ne Zha)",
    },
    fullTitle: {
      vi: "Đội Hình Thuần Thiên Nhiên Endgame (Động Cơ Vĩnh Cửu Tidecaller + Monk + Ne Zha)",
      en: "Pure Nature Endgame Perpetual Summon Engine (Tidecaller + Monk + Ne Zha)",
    },
    stageTiming: {
      vi: "Season 1 – Season 4 (Khắc tinh số 1 của Bộ Lạc ở Cuối Game)",
      en: "Season 1 – Season 4 (#1 Endgame Counter to Pure Horde)",
    },
    auraBonus: {
      vi: "6/6 Thiên Nhiên: +35% ATK & HP + +20% DMG khắc chế Bộ Lạc",
      en: "6/6 Pure Nature: +35% ATK & HP + +20% Counter DMG vs Horde",
    },
    soulStoneBudget: {
      vi: "18 Hồn Đá Đỏ (Thức tỉnh Pixie + Forest Maiden / Sage)",
      en: "18 Soul Stones (Awaken Pixie + Forest Maiden / Sage)",
    },
    counterAdvantage: {
      vi: "🟢 Khắc chế cứng 🔴 Bộ Lạc (+20% DMG & Đệ chắn đòn Wukong)",
      en: "🟢 Hard-counters 🔴 Horde (+20% DMG & Summons absorb Wukong dives)",
    },
    slots: [
      {
        slotNumber: 1,
        rowZone: "frontline",
        wing: "left",
        heroName: {
          vi: "Monk (Võ Tăng)",
          en: "Monk",
        },
        rarity: "mythic",
        roleBadge: { vi: "🛡️ Mythic Main Tank", en: "🛡️ Mythic Main Tank" },
        mvsSweetSpot: { vi: "1★ Trắng (560 Mảnh)", en: "1★ White (560 Shards)" },
        slotReason: {
          vi: "Tạo khiên cộng hưởng với số lượng đệ của Tidecaller và miễn nhiễm khống chế tại Ô 1.",
          en: "Generates shields scaling with Tidecaller's summons and resists CC in Slot 1.",
        },
      },
      {
        slotNumber: 2,
        rowZone: "frontline",
        wing: "right",
        heroName: {
          vi: "Ne Zha (Na Tra)",
          en: "Ne Zha",
        },
        rarity: "mythic",
        roleBadge: { vi: "🔥 Mythic Bruiser Bất Tử", en: "🔥 Immortal Mythic Bruiser" },
        mvsSweetSpot: { vi: "1★ Trắng (560 Mảnh) + UW", en: "1★ White (560 Shards) + UW" },
        slotReason: {
          vi: "Đấu sĩ hàng đầu Ô 2 với khả năng hồi sinh Hoa Sen và thiêu đốt diện rộng.",
          en: "Frontline bruiser in Slot 2 with Lotus resurrection and AoE burn.",
        },
      },
      {
        slotNumber: 3,
        rowZone: "midline_safe",
        wing: "left",
        heroName: {
          vi: "Tidecaller (Triệu Thủy Sư)",
          en: "Tidecaller",
        },
        rarity: "mythic",
        roleBadge: { vi: "👑 Nữ Hoàng Triệu Hồi & Hồi Máu", en: "👑 Supreme Summoner & Healer Carry" },
        mvsSweetSpot: { vi: "1★ Trắng ➔ 5★ Trắng + UW Lv.20", en: "1★ White ➔ 5★ White + UW Lv.20" },
        slotReason: {
          vi: "Bắt buộc đứng ở Ô 3 Vùng An Toàn sau lưng Monk: vừa gọi Thủy Tinh Linh chắn đạn, vừa hồi máu và xả sóng thần.",
          en: "Must stand in Safe Slot 3 behind Monk: floods the field with Water Elementals, heals, and unleashes tsunamis.",
        },
      },
      {
        slotNumber: 4,
        rowZone: "midline_safe",
        wing: "right",
        heroName: {
          vi: "Pixie (Tiên Hoa Đỏ)",
          en: "Pixie (Awakened)",
        },
        rarity: "legendary",
        roleBadge: { vi: "🌸 Awakened Burst Carry", en: "🌸 Awakened Burst Carry" },
        mvsSweetSpot: { vi: "Thức Tỉnh Đỏ (9 Hồn Đá)", en: "Mythic Awakened (9 Stones)" },
        slotReason: {
          vi: "Xả sát thương phép khổng lồ từ Ô 4 Vùng An Toàn trong khi địch bị kẹt vào biển đệ triệu hồi.",
          en: "Unleashes massive magic AoE from Safe Slot 4 while enemies are bogged down by summons.",
        },
      },
      {
        slotNumber: 5,
        rowZone: "backline_dive",
        wing: "left",
        heroName: {
          vi: "Forest Maiden (Thần Nữ Đỏ)",
          en: "Forest Maiden (Awakened)",
        },
        rarity: "legendary",
        roleBadge: { vi: "♻️ Động Cơ Hồi Nộ Vĩnh Cửu", en: "♻️ Perpetual Energy Engine" },
        mvsSweetSpot: { vi: "1★ Trắng / Thức Tỉnh", en: "1★ White / Awakened" },
        slotReason: {
          vi: "Mỗi khi đệ Nước của Tidecaller chết, Forest Maiden ở Ô 5 bơm đầy Nộ và tăng ATK cho cả đội.",
          en: "Whenever Tidecaller's Water Elementals die, Forest Maiden in Slot 5 refills team Energy and buffs ATK.",
        },
      },
      {
        slotNumber: 6,
        rowZone: "backline_dive",
        wing: "right",
        heroName: {
          vi: "Petalis / Sage Đỏ",
          en: "Petalis / Awakened Sage",
        },
        rarity: "mythic",
        roleBadge: { vi: "✨ Hỗ Trợ Đỉnh Cao S3–S4", en: "✨ S3–S4 Supreme Support" },
        mvsSweetSpot: { vi: "1★ Trắng (560 Mảnh)", en: "1★ White (560 Shards)" },
        slotReason: {
          vi: "Khóa chặt Ô 6 với lớp khiên thực vật và khả năng chống sốc sát thương từ Sát thủ địch.",
          en: "Secures Slot 6 with botanical shields and anti-burst protection against diving assassins.",
        },
      },
    ],
  },
];

const LABELS: Record<
  GuideLocale,
  {
    badge: string;
    title: string;
    subtitle: string;
    modeBoardBtn: string;
    modeSwapsBtn: string;
    rowZones: {
      frontline: string;
      midline_safe: string;
      backline_dive: string;
    };
    wingLabels: {
      left: string;
      right: string;
    };
    slotPrefix: string;
    selectedSlotHeading: string;
    exclusiveWeaponChip: string;
    gearSetChip: string;
    auraHeading: string;
    soulStoneHeading: string;
    counterHeading: string;
    swapsIntro: string;
    swapVisualHeading: string;
    threatLabel: string;
    executionLabel: string;
    impactLabel: string;
    proLockedTitle: string;
    proLockedDesc: string;
    proUpgradeBtn: string;
  }
> = {
  vi: {
    badge: "BÀN CỜ CHIẾN THUẬT • SƠ ĐỒ 6 Ô (2×3 GRID) & ĐẢO VỊ TRÍ ARENA",
    title: "Bàn Cờ Chiến Thuật 6 Ô (2×3 Grid) & Mô Phỏng Khắc Chế Arena",
    subtitle:
      "Bấm chọn từng Đội hình chuẩn 3 Phe hoặc bấm vào từng Ô (1 ➔ 6) để xem cơ chế nhận đòn Aggro, Vùng An Toàn cho Hyper-Carry & 4 Kỹ thuật Đảo Ô PvP",
    modeBoardBtn: "🛡️ Sàn Đấu 6 Ô & 6 Đội Hình Chuẩn (2×3 Grid)",
    modeSwapsBtn: "♟️ 4 Kỹ Thuật Đảo Ô Khắc Chế Arena (PvP Swaps)",
    rowZones: {
      frontline: "🔥 HÀNG TRƯỚC (Ô 1 & Ô 2) — Chịu 70%–85% Đòn Đánh Trực Diện",
      midline_safe:
        "👑 HÀNG GIỮA (Ô 3 & Ô 4) — VÙNG AN TOÀN TUYỆT ĐỐI CHO HYPER-CARRY DPS",
      backline_dive:
        "⚠️ HÀNG SAU (Ô 5 & Ô 6) — Hỗ Trợ/Hồi Máu & Mục Tiêu Lao Vào Của Sát Thủ",
    },
    wingLabels: {
      left: "Cột Trái (Left Column)",
      right: "Cột Phải (Right Column)",
    },
    slotPrefix: "Ô",
    selectedSlotHeading: "🎯 Phân tích Vị trí & Thuật toán Tìm Mục tiêu (Targeting AI):",
    exclusiveWeaponChip: "Vũ Khí Độc Quyền",
    gearSetChip: "Bộ Đồ Vàng Chuẩn",
    auraHeading: "✨ Hào Quang Đồng Hệ:",
    soulStoneHeading: "💎 Ngân Sách Hồn Đá Đỏ:",
    counterHeading: "🔄 Tam Giác Khắc Chế (±20%):",
    swapsIntro:
      "Trong Đấu Trường (Arena) & 3v3, chỉ cần đổi vị trí giữa Ô 3–4 và Ô 5–6 hoặc đảo cột Trái ⇄ Phải, bạn có thể lật kèo đối thủ cao hơn 10%–18% Lực chiến:",
    swapVisualHeading: "Sơ đồ Tướng Tham Gia Đảo Ô Khắc Chế:",
    threatLabel: "🚨 Mối Đe Dọa Từ Đội Hình Địch:",
    executionLabel: "♟️ Thao Tác Đảo Ô Khắc Chế (Positional Swap):",
    impactLabel: "💥 Kết Quả Tác Động Thực Chiến:",
    proLockedTitle: "Chi Tiết 4 Kỹ Thuật Đảo Ô Khắc Chế Đấu Trường (PRO)",
    proLockedDesc:
      "Liên kết UID hoặc nâng cấp PRO để mở khóa toàn bộ hướng dẫn đảo vị trí chống Sát thủ, né lốc xoáy cột dọc và khoan cánh yếu.",
    proUpgradeBtn: "Xem Cổng Mở Khóa PRO",
  },
  en: {
    badge: "TACTICAL BOARD • 6-SLOT (2×3 GRID) & ARENA COUNTER-SWAPS",
    title: "Interactive 2×3 Six-Slot Formation Board & Arena Counter-Swap Simulator",
    subtitle:
      "Switch across all 6 Faction Meta Lineups or click any Slot (1 ➔ 6) to inspect column Aggro, the Midline Safe Zone & 4 PvP Positional Swaps",
    modeBoardBtn: "🛡️ 6-Slot Tactical Board & 6 Meta Lineups (2×3 Grid)",
    modeSwapsBtn: "♟️ 4 Arena Positional Counter-Swaps (PvP Simulator)",
    rowZones: {
      frontline: "🔥 FRONTLINE (Slots 1 & 2) — Absorbs 70%–85% Direct Column Aggro",
      midline_safe:
        "👑 MIDLINE (Slots 3 & 4) — SUPREME SAFE FORTRESS FOR HYPER-CARRY DPS",
      backline_dive:
        "⚠️ BACKLINE (Slots 5 & 6) — Healer/Support & #1 Target for Diving Assassins",
    },
    wingLabels: {
      left: "Left Column",
      right: "Right Column",
    },
    slotPrefix: "Slot",
    selectedSlotHeading: "🎯 Slot Targeting Physics & Positioning Rationale:",
    exclusiveWeaponChip: "Exclusive Weapon",
    gearSetChip: "BiS Golden Gear Set",
    auraHeading: "✨ Faction Aura:",
    soulStoneHeading: "💎 Soul Stone Budget:",
    counterHeading: "🔄 Counter Triangle (±20%):",
    swapsIntro:
      "In Arena & 3v3 PvP, swapping heroes between Slots 3–4 and Slots 5–6 or mirroring Left ⇄ Right columns lets you defeat opponents with 10%–18% higher Combat Power:",
    swapVisualHeading: "Key Heroes Involved in Positional Counter-Swap:",
    threatLabel: "🚨 Enemy Formation Threat:",
    executionLabel: "♟️ Positional Swap Execution:",
    impactLabel: "💥 Combat Impact Mechanism:",
    proLockedTitle: "4 Arena Positional Counter-Swapping Techniques (PRO)",
    proLockedDesc:
      "Link your Game UID or upgrade to PRO to unlock exact positional swaps against backline assassins, column AoE, and weak-side overloads.",
    proUpgradeBtn: "Jump to PRO Gate",
  },
};

export function extractArenaSwapsFromArticle23(
  locale: GuideLocale
): ArenaCounterSwapRecord[] {
  const sec4 = ARTICLE_2_3_FORMATION_COUNTERS.proSections.find(
    (s) => s.id === "sec-4-positional-swapping-and-faction-level"
  );
  const sub41 = sec4?.subSections?.find(
    (sub) => sub.id === "sub-4-1-four-arena-swaps"
  );
  const tableBlock = sub41?.blocks.find(
    (b): b is GuideTableBlock => b.type === "table"
  );
  const rows = tableBlock?.rows ?? [];

  const highlightSlotsByIdx: Record<number, number[]> = {
    0: [3, 4, 5, 6],
    1: [1, 2, 4],
    2: [2, 4],
    3: [3, 4],
  };

  return rows.map((row, idx) => ({
    index: idx + 1,
    scenarioTitle: row[0]?.[locale] ?? "",
    enemyThreat: row[1]?.[locale] ?? "",
    swapExecution: row[2]?.[locale] ?? "",
    combatImpact: row[3]?.[locale] ?? "",
    highlightSlots: highlightSlotsByIdx[idx] ?? [3, 4],
  }));
}

export function TacticalFormationBoardWidget({
  article,
  locale = "vi",
  forceUnlockPro = false,
}: TacticalFormationBoardWidgetProps) {
  const copy = LABELS[locale];
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { activeAccount } = useUidSession();

  const isLockEnabled =
    process.env.NEXT_PUBLIC_ENABLE_PRO_CONTENT_LOCK === "true";
  const hasProAccess =
    forceUnlockPro || !isLockEnabled || activeAccount?.active_plan === "PRO";

  const [mode, setMode] = useState<FormationBoardMode>("board");
  const [selectedLineupId, setSelectedLineupId] = useState<FormationLineupId>(
    article?.slug === "formation-and-counters"
      ? "horde-endgame"
      : "league-starter"
  );
  const [selectedSlotNumber, setSelectedSlotNumber] = useState<
    1 | 2 | 3 | 4 | 5 | 6
  >(3);
  const [selectedSwapIdx, setSelectedSwapIdx] = useState<number>(1);

  const arenaSwaps = useMemo(
    () => extractArenaSwapsFromArticle23(locale),
    [locale]
  );

  // Sync with GuidesToc CustomEvent and URL #hash
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleTargetId = (rawId: string, shouldScroll: boolean) => {
      if (!rawId) return;

      if (rawId === "sub-4-1-four-arena-swaps") {
        setMode("swaps");
        if (shouldScroll && containerRef.current) {
          if (typeof containerRef.current.scrollIntoView === "function") {
            containerRef.current.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }
        return;
      }

      const matchedPreset = LINEUP_PRESETS.find(
        (p) => p.tocSubSectionId === rawId
      );
      if (matchedPreset) {
        setMode("board");
        setSelectedLineupId(matchedPreset.id);
        if (shouldScroll && containerRef.current) {
          if (typeof containerRef.current.scrollIntoView === "function") {
            containerRef.current.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }
      }
    };

    const initialHash = window.location.hash.replace(/^#/, "");
    if (initialHash) {
      handleTargetId(initialHash, false);
    }

    const onTocNavigate = (e: Event) => {
      const custom = e as CustomEvent<{ targetId?: string; id?: string }>;
      const targetId = custom.detail?.targetId ?? custom.detail?.id ?? "";
      handleTargetId(targetId, true);
    };

    const onHashChange = () => {
      const hash = window.location.hash.replace(/^#/, "");
      handleTargetId(hash, false);
    };

    window.addEventListener("tophub:toc-navigate", onTocNavigate);
    window.addEventListener("hashchange", onHashChange);
    return () => {
      window.removeEventListener("tophub:toc-navigate", onTocNavigate);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  const activeLineup = useMemo(
    () =>
      LINEUP_PRESETS.find((p) => p.id === selectedLineupId) ??
      LINEUP_PRESETS[0],
    [selectedLineupId]
  );

  const activeSlotEntry = useMemo(
    () =>
      activeLineup.slots.find((s) => s.slotNumber === selectedSlotNumber) ??
      activeLineup.slots[2],
    [activeLineup, selectedSlotNumber]
  );

  const activeSlotProfiles = useMemo(
    () => resolveSlotHeroProfiles(activeSlotEntry.heroName.en),
    [activeSlotEntry]
  );

  const activeSlotGearSets = useMemo(
    () =>
      resolveGearSetAssetsFromText(
        activeSlotEntry.slotReason[locale],
        activeLineup.faction
      ),
    [activeSlotEntry, locale, activeLineup.faction]
  );

  const activeSwap = useMemo(
    () =>
      arenaSwaps.find((s) => s.index === selectedSwapIdx) ?? arenaSwaps[0],
    [arenaSwaps, selectedSwapIdx]
  );

  const activeSwapHeroProfiles = useMemo(() => {
    if (!activeSwap) return [];
    const combined = `${activeSwap.swapExecution} ${activeSwap.enemyThreat} ${activeSwap.scenarioTitle}`;
    const extracted = extractHeroProfilesFromText(combined, 4);
    if (extracted.length >= 2) return extracted;
    const fallbacks = [
      HERO_VISUAL_PROFILES["hero-wukong"],
      HERO_VISUAL_PROFILES["hero-pyromancer"],
      HERO_VISUAL_PROFILES["hero-adjudicator"],
    ].filter(Boolean);
    return fallbacks;
  }, [activeSwap]);

  const rowsGrouped: Array<{
    zone: "frontline" | "midline_safe" | "backline_dive";
    slots: FormationSlotEntry[];
  }> = useMemo(
    () => [
      {
        zone: "frontline",
        slots: activeLineup.slots.filter((s) => s.rowZone === "frontline"),
      },
      {
        zone: "midline_safe",
        slots: activeLineup.slots.filter((s) => s.rowZone === "midline_safe"),
      },
      {
        zone: "backline_dive",
        slots: activeLineup.slots.filter((s) => s.rowZone === "backline_dive"),
      },
    ],
    [activeLineup]
  );

  return (
    <div
      ref={containerRef}
      data-testid="widget-tactical-formation-board"
      className="relative my-5 rounded-2xl border border-amber-500/35 bg-card/90 dark:bg-slate-950/85 p-4 sm:p-6 space-y-5 shadow-lg shadow-amber-500/5"
    >
      {/* Consolidated TOC Anchor Stubs */}
      {article?.slug === "formation-and-counters" ? (
        <span
          id="sub-4-1-four-arena-swaps"
          data-consolidated-by-widget="true"
          className="scroll-mt-28"
          aria-hidden="true"
        />
      ) : (
        LINEUP_PRESETS.map((preset) => (
          <span
            key={preset.tocSubSectionId}
            id={preset.tocSubSectionId}
            data-consolidated-by-widget="true"
            className="scroll-mt-28"
            aria-hidden="true"
          />
        ))
      )}

      {/* Header */}
      <div className="space-y-1.5 pb-4 border-b border-border/60">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 px-2.5 py-0.5 text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400">
          <Crosshair className="h-3.5 w-3.5" />
          <span>{copy.badge}</span>
        </div>
        <h3 className="font-heading font-black text-lg sm:text-xl text-foreground">
          {copy.title}
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground">
          {copy.subtitle}
        </p>
      </div>

      {/* Mode Switcher Tabs: 2x3 Board vs 4 Arena Counter-Swaps */}
      <div role="tablist" className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          role="tab"
          aria-selected={mode === "board"}
          data-testid="formation-mode-board"
          onClick={() => setMode("board")}
          className={cn(
            "inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-xl border text-xs font-heading font-bold transition-all cursor-pointer",
            mode === "board"
              ? "border-amber-500 bg-amber-500/15 text-amber-700 dark:text-amber-300 shadow-xs"
              : "border-border/70 bg-background/70 text-muted-foreground hover:text-foreground"
          )}
        >
          <Shield className="h-4 w-4 text-amber-500 shrink-0" />
          <span>{copy.modeBoardBtn}</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={mode === "swaps"}
          data-testid="formation-mode-swaps"
          onClick={() => setMode("swaps")}
          className={cn(
            "inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-xl border text-xs font-heading font-bold transition-all cursor-pointer",
            mode === "swaps"
              ? "border-amber-500 bg-amber-500/15 text-amber-700 dark:text-amber-300 shadow-xs"
              : "border-border/70 bg-background/70 text-muted-foreground hover:text-foreground"
          )}
        >
          <ArrowRightLeft className="h-4 w-4 text-amber-500 shrink-0" />
          <span>{copy.modeSwapsBtn}</span>
        </button>
      </div>

      {mode === "board" ? (
        <div className="space-y-4">
          {/* 6 Meta Lineup Selector Pills with Real Faction Crests */}
          <div className="flex flex-wrap items-center gap-2">
            {LINEUP_PRESETS.map((preset) => {
              const isSelected = preset.id === activeLineup.id;
              const crestPath = FACTION_CREST_PATHS[preset.faction];
              return (
                <button
                  key={preset.id}
                  type="button"
                  data-testid={`formation-lineup-pill-${preset.id}`}
                  onClick={() => setSelectedLineupId(preset.id)}
                  className={cn(
                    "inline-flex items-center gap-2 min-h-[44px] px-3.5 py-2 rounded-xl border text-xs font-heading font-bold transition-all cursor-pointer",
                    isSelected
                      ? preset.faction === "horde"
                        ? "border-rose-500 bg-rose-500/15 text-rose-700 dark:text-rose-300 shadow-xs"
                        : preset.faction === "nature"
                          ? "border-emerald-500 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 shadow-xs"
                          : "border-blue-500 bg-blue-500/15 text-blue-700 dark:text-blue-300 shadow-xs"
                      : "border-border/70 bg-background/70 text-muted-foreground hover:text-foreground"
                  )}
                >
                  <img
                    src={crestPath}
                    alt={preset.faction}
                    width={20} height={20} loading="lazy"
                    decoding="async"
                    className="h-5 w-5 rounded-full object-contain shrink-0"
                  />
                  <span>{preset.shortLabel[locale]}</span>
                </button>
              );
            })}
          </div>

          {/* Active Lineup Summary & Aura Bar */}
          <div className="rounded-xl border border-border/70 bg-muted/30 p-3.5 space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 className="font-heading font-bold text-sm sm:text-base text-foreground flex items-center gap-2">
                <img
                  src={FACTION_CREST_PATHS[activeLineup.faction]}
                  alt={activeLineup.faction}
                  width={20} height={20} loading="lazy"
                  decoding="async"
                  className="h-5 w-5 rounded-full object-contain shrink-0"
                />
                <span>{activeLineup.fullTitle[locale]}</span>
              </h4>
              <span className="font-mono text-xs text-amber-600 dark:text-amber-400 font-semibold">
                {activeLineup.stageTiming[locale]}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs">
              <div
                data-testid="formation-aura-badge"
                className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-2.5 space-y-0.5"
              >
                <span className="font-mono font-bold text-amber-600 dark:text-amber-300 block">
                  {copy.auraHeading}
                </span>
                <span className="text-foreground font-medium">
                  {activeLineup.auraBonus[locale]}
                </span>
              </div>

              <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-2.5 space-y-0.5">
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-300 block">
                  {copy.soulStoneHeading}
                </span>
                <span className="text-foreground font-medium">
                  {activeLineup.soulStoneBudget[locale]}
                </span>
              </div>

              <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-2.5 space-y-0.5">
                <span className="font-mono font-bold text-blue-600 dark:text-blue-300 block">
                  {copy.counterHeading}
                </span>
                <span className="text-foreground font-medium">
                  {activeLineup.counterAdvantage[locale]}
                </span>
              </div>
            </div>
          </div>

          {/* Visual 2x3 Six-Slot Grid Board */}
          <div
            data-testid="formation-grid-board"
            className="space-y-3 rounded-2xl border border-border/80 bg-background/80 p-3.5 sm:p-5"
          >
            {rowsGrouped.map((rowGroup) => (
              <div
                key={rowGroup.zone}
                className={cn(
                  "rounded-xl border p-3 space-y-2.5",
                  rowGroup.zone === "frontline"
                    ? "border-amber-500/35 bg-amber-500/[0.04]"
                    : rowGroup.zone === "midline_safe"
                      ? "border-emerald-500/45 bg-emerald-500/[0.06]"
                      : "border-rose-500/35 bg-rose-500/[0.04]"
                )}
              >
                <div className="flex items-center justify-between gap-2 text-xs font-heading font-bold">
                  <span
                    className={cn(
                      rowGroup.zone === "frontline"
                        ? "text-amber-600 dark:text-amber-400"
                        : rowGroup.zone === "midline_safe"
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-rose-600 dark:text-rose-400"
                    )}
                  >
                    {copy.rowZones[rowGroup.zone]}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {rowGroup.slots.map((slot) => {
                    const isSlotActive =
                      slot.slotNumber === activeSlotEntry.slotNumber;
                    const slotProfiles = resolveSlotHeroProfiles(
                      slot.heroName.en
                    );
                    const primaryWeaponPath =
                      slotProfiles[0]?.exclusiveWeaponPath;

                    return (
                      <button
                        key={slot.slotNumber}
                        type="button"
                        data-testid={`formation-slot-${slot.slotNumber}`}
                        onClick={() => setSelectedSlotNumber(slot.slotNumber)}
                        className={cn(
                          "text-left rounded-xl border p-3.5 transition-all cursor-pointer space-y-2.5 min-h-[112px]",
                          isSlotActive
                            ? "border-amber-500 bg-amber-500/15 shadow-sm ring-1 ring-amber-500/40"
                            : "border-border/75 bg-card/90 hover:border-amber-500/45"
                        )}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="inline-flex items-center gap-1 rounded-md bg-slate-900 text-amber-400 px-2 py-0.5 font-mono text-xs font-black">
                            {copy.slotPrefix} {slot.slotNumber} •{" "}
                            {copy.wingLabels[slot.wing]}
                          </span>
                          <span
                            className={cn(
                              "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-mono font-bold",
                              slot.rarity === "mythic"
                                ? "bg-rose-500/15 text-rose-600 dark:text-rose-300 border border-rose-500/30"
                                : "bg-amber-500/15 text-amber-600 dark:text-amber-300 border border-amber-500/30"
                            )}
                          >
                            {primaryWeaponPath && (
                              <img
                                src={primaryWeaponPath}
                                alt=""
                                width={14} height={14} loading="lazy"
                                decoding="async"
                                className="h-3.5 w-3.5 rounded-xs object-contain shrink-0"
                              />
                            )}
                            <span>{slot.mvsSweetSpot[locale]}</span>
                          </span>
                        </div>

                        {/* Visual Hero Avatar(s) + Name + Role Badge */}
                        <div className="flex items-center gap-3">
                          <div
                            data-testid={`formation-slot-avatars-${slot.slotNumber}`}
                            className="flex items-center -space-x-2.5 shrink-0"
                          >
                            {slotProfiles.length <= 1 ? (
                              <GameAssetFrame
                                src={
                                  slotProfiles[0]?.avatarPath ??
                                  "/images/heroes/avatars/Head_10025.webp"
                                }
                                alt={slot.heroName.en}
                                rarity={slot.rarity}
                                faction={
                                  slotProfiles[0]?.faction ??
                                  activeLineup.faction
                                }
                                size="lg"
                              />
                            ) : (
                              slotProfiles.slice(0, 2).map((prof, pIdx) => (
                                <div
                                  key={prof.id}
                                  className={cn(
                                    "rounded-xl ring-2 ring-slate-950",
                                    pIdx === 0 ? "z-10" : "z-0 opacity-95"
                                  )}
                                >
                                  <GameAssetFrame
                                    src={prof.avatarPath}
                                    alt={prof.nameEn}
                                    rarity={prof.rarity}
                                    faction={prof.faction}
                                    size="md"
                                  />
                                </div>
                              ))
                            )}
                          </div>

                          <div className="space-y-0.5 min-w-0">
                            <p className="font-heading font-bold text-sm sm:text-base text-foreground truncate">
                              {slot.heroName[locale]}
                            </p>
                            <p className="text-xs font-medium text-amber-600 dark:text-amber-400">
                              {slot.roleBadge[locale]}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Active Slot Targeting Inspector with Visual Loadout Strip */}
          <div
            data-testid="formation-slot-inspector"
            className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 space-y-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-heading font-bold text-amber-700 dark:text-amber-300">
                {copy.selectedSlotHeading} {copy.slotPrefix}{" "}
                {activeSlotEntry.slotNumber} (
                {activeSlotEntry.heroName[locale]})
              </p>
            </div>

            {/* Visual Loadout Strip: Hero Avatars + Exclusive Weapon + BiS Gear Set */}
            <div
              data-testid="formation-inspector-loadout"
              className="flex flex-wrap items-center gap-2"
            >
              {activeSlotProfiles.map((prof) => (
                <React.Fragment key={prof.id}>
                  <span className="inline-flex items-center gap-2 rounded-xl border border-amber-500/35 bg-background/85 px-2.5 py-1.5 text-xs font-bold text-foreground">
                    <GameAssetFrame
                      src={prof.avatarPath}
                      alt={prof.nameEn}
                      rarity={prof.rarity}
                      faction={prof.faction}
                      size="sm"
                    />
                    <span>
                      {locale === "vi" ? prof.nameVi : prof.nameEn}
                    </span>
                  </span>
                  {prof.exclusiveWeaponPath && (
                    <span className="inline-flex items-center gap-1.5 rounded-xl border border-rose-500/35 bg-rose-500/10 px-2.5 py-1.5 text-xs font-bold text-rose-600 dark:text-rose-300">
                      <img
                        src={prof.exclusiveWeaponPath}
                        alt={copy.exclusiveWeaponChip}
                        width={20} height={20} loading="lazy"
                        decoding="async"
                        className="h-5 w-5 rounded-sm object-contain shrink-0"
                      />
                      <span>
                        {locale === "vi"
                          ? prof.exclusiveWeaponNameVi ??
                            copy.exclusiveWeaponChip
                          : prof.exclusiveWeaponNameEn ??
                            copy.exclusiveWeaponChip}
                      </span>
                    </span>
                  )}
                </React.Fragment>
              ))}

              {activeSlotGearSets.map((gear) => (
                <span
                  key={gear.id}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/35 bg-emerald-500/10 px-2.5 py-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300"
                >
                  <img
                    src={gear.iconPath}
                    alt={copy.gearSetChip}
                    width={20} height={20} loading="lazy"
                    decoding="async"
                    className="h-5 w-5 rounded-sm object-contain shrink-0"
                  />
                  <span>
                    {locale === "vi" ? gear.inGameNameVi : gear.inGameNameEn}
                  </span>
                </span>
              ))}
            </div>

            <div className="text-xs sm:text-sm text-foreground/95 leading-relaxed">
              <RichGuideText
                text={activeSlotEntry.slotReason[locale]}
                locale={locale}
                variant="inline"
                accentColor="amber"
              />
            </div>
          </div>
        </div>
      ) : (
        /* Mode 2: 4 Arena Positional Counter-Swaps */
        <div className="space-y-4">
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {copy.swapsIntro}
          </p>

          <div className="flex flex-wrap items-center gap-2">
            {arenaSwaps.map((swp) => {
              const isSelected = swp.index === activeSwap?.index;
              return (
                <button
                  key={swp.index}
                  type="button"
                  data-testid={`arena-swap-pill-${swp.index}`}
                  onClick={() => setSelectedSwapIdx(swp.index)}
                  className={cn(
                    "min-h-[44px] px-3.5 py-2 rounded-xl border text-xs font-heading font-bold transition-all cursor-pointer",
                    isSelected
                      ? "border-amber-500 bg-amber-500/15 text-amber-700 dark:text-amber-300 shadow-xs"
                      : "border-border/70 bg-background/70 text-muted-foreground hover:text-foreground"
                  )}
                >
                  {swp.scenarioTitle}
                </button>
              );
            })}
          </div>

          {activeSwap && (
            <div
              data-testid="arena-active-swap-panel"
              className="rounded-2xl border border-amber-500/40 bg-background/90 p-4 sm:p-5 space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3">
                <h4 className="font-heading font-bold text-sm sm:text-base text-foreground flex items-center gap-2">
                  <Swords className="h-4 w-4 text-amber-500 shrink-0" />
                  <span>{activeSwap.scenarioTitle}</span>
                </h4>
                <div className="flex items-center gap-1.5">
                  {activeSwap.highlightSlots.map((slotNum) => (
                    <span
                      key={slotNum}
                      className="rounded-md bg-amber-500/15 border border-amber-500/35 px-2 py-0.5 font-mono text-xs font-bold text-amber-600 dark:text-amber-300"
                    >
                      {copy.slotPrefix} {slotNum}
                    </span>
                  ))}
                </div>
              </div>

              {/* Visual Swap Hero Avatars Diagram Row */}
              <div
                data-testid="arena-swap-visual-row"
                className="rounded-xl border border-amber-500/30 bg-amber-500/[0.06] p-3 space-y-2"
              >
                <span className="block text-[11px] font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  {copy.swapVisualHeading}
                </span>
                <div className="flex flex-wrap items-center gap-2.5">
                  {activeSwapHeroProfiles.map((prof, idx) => (
                    <React.Fragment key={prof.id}>
                      <div className="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-card/95 px-2.5 py-1.5">
                        <GameAssetFrame
                          src={prof.avatarPath}
                          alt={prof.nameEn}
                          rarity={prof.rarity}
                          faction={prof.faction}
                          size="md"
                        />
                        <div className="text-xs">
                          <p className="font-heading font-bold text-foreground">
                            {locale === "vi" ? prof.inGameNameVi : prof.inGameNameEn}
                          </p>
                          <p className="font-mono text-[10px] text-muted-foreground uppercase">
                            {prof.faction}
                          </p>
                        </div>
                      </div>
                      {idx < activeSwapHeroProfiles.length - 1 && (
                        <span className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-500 font-mono text-xs font-black">
                          ⇄
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-rose-500/30 bg-rose-500/5 p-3.5 space-y-1">
                <p className="text-xs font-heading font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  <span>{copy.threatLabel}</span>
                </p>
                <div className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
                  <RichGuideText
                    text={activeSwap.enemyThreat}
                    locale={locale}
                    variant="inline"
                    accentColor="rose"
                  />
                </div>
              </div>

              {hasProAccess ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  <div className="rounded-xl border border-amber-500/35 bg-amber-500/10 p-3.5 space-y-1.5">
                    <p className="text-xs font-heading font-bold text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
                      <Crown className="h-3.5 w-3.5 text-amber-500" />
                      <span>{copy.executionLabel}</span>
                    </p>
                    <div className="text-xs sm:text-sm text-foreground/95 leading-relaxed">
                      <RichGuideText
                        text={activeSwap.swapExecution}
                        locale={locale}
                        variant="inline"
                        accentColor="amber"
                      />
                    </div>
                  </div>

                  <div className="rounded-xl border border-emerald-500/35 bg-emerald-500/10 p-3.5 space-y-1.5">
                    <p className="text-xs font-heading font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
                      <span>{copy.impactLabel}</span>
                    </p>
                    <div className="text-xs sm:text-sm text-foreground/95 leading-relaxed">
                      <RichGuideText
                        text={activeSwap.combatImpact}
                        locale={locale}
                        variant="inline"
                        accentColor="emerald"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-xl border border-amber-500/35 bg-amber-500/5 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <p className="text-xs font-heading font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                      <Lock className="h-3.5 w-3.5" />
                      <span>{copy.proLockedTitle}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {copy.proLockedDesc}
                    </p>
                  </div>
                  <Link
                    href="#sub-4-1-four-arena-swaps"
                    className="inline-flex items-center justify-center min-h-[40px] px-3.5 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-heading font-bold shrink-0"
                  >
                    {copy.proUpgradeBtn}
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

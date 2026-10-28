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
      vi: "1. Đội Hình Khởi Đầu & Chuyển Tiếp Liên Minh (Ngày 1–20 S0)",
      en: "1. League Starter & Transition Formation (Days 1–20 S0)",
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
      vi: "0 Đá Linh Hồn (Hồn Đá Đỏ / Soul Stone) — Tuyệt đối không thức tỉnh ở giai đoạn đầu S0; tích lũy đủ 9 viên Đá Linh Hồn đầu tiên (360,000 Điểm Vinh Dự Bang hoặc 54,000 Xu Vinh Quang Hội) cho định hướng lâu dài.",
      en: "0 Soul Stones (Red Soul Stones) — Never awaken in early S0; hoard your first 9 Soul Stones (360,000 Guild Honor or 54,000 Guild Race Honor Coins) for your long-term core.",
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
          vi: "Thẩm Phán (Adjudicator)",
          en: "Adjudicator",
        },
        rarity: "legendary",
        roleBadge: { vi: "🛡️ Main Tank (Cột Trái)", en: "🛡️ Main Tank (Left)" },
        mvsSweetSpot: {
          vi: "3 Sao Vàng (MVS) ➔ 1 Sao Trắng (280 Mảnh — Điểm ngọt)",
          en: "3★ Gold (MVS) ➔ 1★ White (280 Shards — Sweet Spot)",
        },
        slotReason: {
          vi: "Đỡ đòn chính đứng Ô 1 chịu trực diện luồng hỏa lực cột trái, che chắn tuyệt đối cho Pháp Sư Lửa (Pyromancer) ở Ô 3; trang bị Bộ Đồ Titan / Huyết Titan (Titan's Might / Blood of the Titan) để tối đa hóa máu và Giảm sát thương nhận vào.",
          en: "Main Tank in Slot 1 absorbing direct left-column aggro to shield Pyromancer in Slot 3; equip Titan's Might / Blood of the Titan Set to maximize HP and Damage Reduction.",
        },
      },
      {
        slotNumber: 2,
        rowZone: "frontline",
        wing: "right",
        heroName: {
          vi: "Người Giữ Bí Mật (Secret Keeper)",
          en: "Secret Keeper",
        },
        rarity: "legendary",
        roleBadge: { vi: "🛡️ Off-Tank / Câm Lặng", en: "🛡️ Off-Tank / Silence" },
        mvsSweetSpot: {
          vi: "3 Sao Vàng (Chỉ dùng mảnh riêng Quán Rượu, 0 Mảnh Vạn Năng)",
          en: "3★ Gold (Free Tavern shards only, 0 Universal Shards)",
        },
        slotReason: {
          vi: "Đỡ đòn phụ Ô 2 tạo Khiên hấp thụ sát thương phép và làm Câm lặng tuyến đầu địch; mặc Bộ Đồ Titan / Huyết Titan (Titan's Might / Blood of the Titan) và nâng tự nhiên từ Quán Rượu, tuyệt đối không dùng Mảnh Anh Hùng Huyền Thoại Vạn Năng (Universal Legendary Shard).",
          en: "Off-Tank in Slot 2 providing magic shields and frontline silence; equip Titan's Might / Blood of the Titan Set and upgrade strictly via free Tavern shards (zero Universal Legendary Shards).",
        },
      },
      {
        slotNumber: 3,
        rowZone: "midline_safe",
        wing: "left",
        heroName: {
          vi: "Pháp Sư Lửa (Pyromancer)",
          en: "Pyromancer",
        },
        rarity: "legendary",
        roleBadge: {
          vi: "👑 Hyper-Carry DPS (Vùng An Toàn)",
          en: "👑 Hyper-Carry DPS (Safe Zone)",
        },
        mvsSweetSpot: {
          vi: "1 Sao Đỏ (200 Mảnh) ➔ 1 Sao Trắng (280 Mảnh — Điểm ngọt S0)",
          en: "1★ Red (200 Shards) ➔ 1★ White (280 Shards — S0 Sweet Spot)",
        },
        slotReason: {
          vi: "Nguồn sát thương diện rộng số 1 đầu game đứng Ô 3 (Vùng An Toàn sau lưng Thẩm Phán); mặc Bộ Đồ Quyết Đấu ➔ Cơn Thịnh Nộ / Kỵ Sĩ Vinh Quang (Duelist's Set ➔ Fury of Blood / Knight's Glory) để dọn sạch lính hộ vệ địch.",
          en: "#1 early-game AoE carry positioned in Safe Slot 3 behind Adjudicator; equip Duelist's Set ➔ Fury of Blood (Knight's Glory Set) to wipe enemy escort soldiers.",
        },
      },
      {
        slotNumber: 4,
        rowZone: "midline_safe",
        wing: "right",
        heroName: {
          vi: "Thiện Xạ (Paragon) / Chiêm Tinh Gia (Astrologer)",
          en: "Paragon / Astrologer",
        },
        rarity: "mythic",
        roleBadge: {
          vi: "⚔️ Sub-DPS Sát Thương Chuẩn",
          en: "⚔️ Burst / True DMG Sub-DPS",
        },
        mvsSweetSpot: {
          vi: "Chiêm Tinh Gia: 1 Sao Vàng (0 mảnh vạn năng) | Thiện Xạ: 1 Sao Đỏ (160 Mảnh)",
          en: "Astrologer: 1★ Gold (0 Universal Shards) | Paragon: 1★ Red (160 Shards)",
        },
        slotReason: {
          vi: "Ô 4 kết liễu đơn mục tiêu và săn Boss; dùng tạm Chiêm Tinh Gia (Astrologer) không tốn tài nguyên hoặc thay bằng Thiện Xạ (Paragon) mặc Bộ Đồ Quyết Đấu ➔ Cơn Thịnh Nộ / Kỵ Sĩ Vinh Quang (Duelist's Set ➔ Fury of Blood / Knight's Glory) ngay khi mở Vòng Quay May Mắn.",
          en: "Slot 4 single-target finisher and Boss killer; use zero-investment Astrologer early or replace with Paragon wearing Duelist's Set ➔ Fury of Blood (Knight's Glory Set) upon unlocking Lucky Wheel.",
        },
      },
      {
        slotNumber: 5,
        rowZone: "backline_dive",
        wing: "left",
        heroName: {
          vi: "Nữ Tu (Nun)",
          en: "Nun",
        },
        rarity: "legendary",
        roleBadge: { vi: "✨ Healer Bơm Máu", en: "✨ Primary Healer" },
        mvsSweetSpot: {
          vi: "3 Sao Vàng (MVS) ➔ 1 Sao Trắng (280 Mảnh — Mở khóa Thức tỉnh S1)",
          en: "3★ Gold (MVS) ➔ 1★ White (280 Shards — Ready for S1 Awakening)",
        },
        slotReason: {
          vi: "Đặt ở Ô 5 (Hàng sau) để bơm máu liên tục và tăng giới hạn HP tối đa cho toàn bộ 6 tướng cùng lính hộ vệ; trang bị Bộ Hiền Giả ➔ Ánh Sáng Vinh Quang / Hiền Triết Quang Vinh (Sage Set ➔ Glorious Light / Glory of the Sage).",
          en: "Positioned in Backline Slot 5 to sustain HP and boost Max HP across all 6 heroes and soldiers; equip Sage Set ➔ Glorious Light (Glory of the Sage Set).",
        },
      },
      {
        slotNumber: 6,
        rowZone: "backline_dive",
        wing: "right",
        heroName: {
          vi: "Nhà Thơ (Bard)",
          en: "Bard",
        },
        rarity: "legendary",
        roleBadge: { vi: "🎵 Buff Tốc Độ Hồi Nộ", en: "🎵 Energy & Cooldown Buffer" },
        mvsSweetSpot: {
          vi: "3 Sao Vàng (MVS) ➔ 2 Sao Trắng (300 Mảnh — Max Trait 3 +40% Xây dựng)",
          en: "3★ Gold (MVS) ➔ 2★ White (300 Shards — Max Trait 3 +40% Build)",
        },
        slotReason: {
          vi: "Đứng Ô 6 mặc Bộ Hiền Giả ➔ Ánh Sáng Vinh Quang / Hiền Triết Quang Vinh (Sage Set ➔ Glorious Light / Glory of the Sage) để tăng Tốc độ đánh, Tỷ lệ chí mạng và giảm hồi chiêu kỹ năng cho Pháp Sư Lửa (Pyromancer) cùng Thiện Xạ (Paragon).",
          en: "Stands in Slot 6 wearing Sage Set ➔ Glorious Light (Glory of the Sage Set) to boost Attack Speed, Crit Rate, and skill cooldowns for Pyromancer and Paragon.",
        },
      },
    ],
  },
  {
    id: "league-endgame",
    tocSubSectionId: "sub-1-2-league-endgame-pure",
    faction: "league",
    shortLabel: {
      vi: "Liên Minh Cuối Game (S1–S4)",
      en: "League Endgame (S1–S4)",
    },
    fullTitle: {
      vi: "2. Đội Hình Thuần Liên Minh Cuối Game (Công Chúa Rose + Thiện Xạ + Thợ Chế Tạo)",
      en: "2. League Endgame Pure Meta Lineup (Rose Princess + Paragon + Artificer)",
    },
    stageTiming: {
      vi: "Season 1 – Season 4 (3 Tướng Đỏ gốc + 2–3 Tướng Vàng Thức Tỉnh)",
      en: "Season 1 – Season 4 (3 Native Mythics + 2–3 Awakened Legendaries)",
    },
    auraBonus: {
      vi: "6/6 Liên Minh: +35% ATK & HP + +20% DMG lên Thiên Nhiên",
      en: "6/6 Pure League: +35% ATK & HP + +20% DMG vs Nature",
    },
    soulStoneBudget: {
      vi: "18 đến 27 Đá Linh Hồn (Hồn Đá Đỏ / Soul Stone) — Cần 2–3 tướng Vàng Thức tỉnh: Thẩm Phán (Adjudicator — 9 viên) + Nữ Tu (Nun — 9 viên) + Pháp Sư Lửa (Pyromancer — 9 viên, nếu chưa có Thợ Chế Tạo / Artificer).",
      en: "18 to 27 Soul Stones (Red Soul Stones) — Requires 2–3 Awakened Legendaries: Adjudicator (9 stones) + Nun (9 stones) + Pyromancer (9 stones, if Artificer is not yet unlocked).",
    },
    counterAdvantage: {
      vi: "🔵 Khắc chế cứng 🟢 Thiên Nhiên (Thuật Sĩ Thủy Triều / Tidecaller) • Yếu thế trước 🔴 Bộ Lạc",
      en: "🔵 Hard-counters 🟢 Nature (Tidecaller) • Vulnerable to 🔴 Horde",
    },
    slots: [
      {
        slotNumber: 1,
        rowZone: "frontline",
        wing: "left",
        heroName: {
          vi: "Công Chúa Rose (Rose Princess)",
          en: "Rose Princess",
        },
        rarity: "mythic",
        roleBadge: { vi: "👑 Mythic Main Tank", en: "👑 Mythic Main Tank" },
        mvsSweetSpot: {
          vi: "1 Sao Đỏ (160 Mảnh) ➔ 1 Sao Trắng (560 Mảnh) + Vũ khí Độc quyền Thời Đại Anh Hùng +10",
          en: "1★ Red (160 Shards) ➔ 1★ White (560 Shards) + Royalthorn Blade +10",
        },
        slotReason: {
          vi: "Tướng Đỏ công thủ toàn diện đứng Ô 1, mặc Bộ Đồ Titan / Huyết Titan (Titan's Might / Blood of the Titan) (+30% Dấu Hệ Liên Minh) vừa tạo khiên toàn đội, gom sát thương vừa tung đòn phản kích kết liễu hàng trước địch.",
          en: "All-around Mythic Main Tank in Slot 1 wearing Titan's Might / Blood of the Titan Set (+30% League Faction Mark), generating team-wide shields while storing and reflecting burst damage.",
        },
      },
      {
        slotNumber: 2,
        rowZone: "frontline",
        wing: "right",
        heroName: {
          vi: "Thẩm Phán Đỏ (Adjudicator · Thức Tỉnh)",
          en: "Adjudicator (Awakened)",
        },
        rarity: "legendary",
        roleBadge: { vi: "🛡️ Awakened Tank (9 Đá)", en: "🛡️ Awakened Tank (9 Stones)" },
        mvsSweetSpot: {
          vi: "Thức Tỉnh Đỏ (9 Đá Linh Hồn + 345–385 Mảnh) ➔ 1 Sao Trắng",
          en: "Mythic Awakened (9 Soul Stones + 345–385 Shards) ➔ 1★ White",
        },
        slotReason: {
          vi: "Sau khi Thức tỉnh lên phẩm Đỏ bằng 9 Đá Linh Hồn (Hồn Đá Đỏ / Soul Stone) và mặc Bộ Đồ Titan / Huyết Titan (Titan's Might / Blood of the Titan), Thẩm Phán (Adjudicator) sở hữu khả năng Bất tử ngắn hạn khóa chặt cánh phải ở Ô 2 cùng Công Chúa Rose.",
          en: "Awakened to Mythic with 9 Soul Stones (Red Soul Stones) and geared in Titan's Might / Blood of the Titan Set, Adjudicator locks down the right column in Slot 2 with Immortal Shield alongside Rose Princess.",
        },
      },
      {
        slotNumber: 3,
        rowZone: "midline_safe",
        wing: "left",
        heroName: {
          vi: "Thiện Xạ (Paragon)",
          en: "Paragon",
        },
        rarity: "mythic",
        roleBadge: { vi: "👑 Hyper-Carry Số 1", en: "👑 #1 Hyper-Carry DPS" },
        mvsSweetSpot: {
          vi: "1 Sao Trắng (560 Mảnh — Điểm ngọt +30%) ➔ 5 Sao Trắng (1,000 Mảnh)",
          en: "1★ White (560 Shards — +30% Sweet Spot) ➔ 5★ White (1,000 Shards)",
        },
        slotReason: {
          vi: "Trái tim sát thương của Liên Minh đứng Ô 3; kết hợp Bộ Đồ Quyết Đấu ➔ Cơn Thịnh Nộ / Kỵ Sĩ Vinh Quang (Duelist's Set ➔ Fury of Blood / Knight's Glory) (+30% Dấu Hệ Liên Minh) và Vũ khí Độc quyền Chính Nghĩa Bất Bại (Everlasting Justice) +10/+20 cho phép kỹ năng chí mạng và gây sát thương chuẩn theo % máu tối đa.",
          en: "Core League Hyper-Carry in Safe Slot 3; pairs Duelist's Set ➔ Fury of Blood (Knight's Glory Set) (+30% League Faction Mark) with Exclusive Weapon Everlasting Justice +10/+20 for critical skill strikes and % Max HP True Damage.",
        },
      },
      {
        slotNumber: 4,
        rowZone: "midline_safe",
        wing: "right",
        heroName: {
          vi: "Thợ Chế Tạo (Artificer) / Pháp Sư Lửa Đỏ (Pyromancer)",
          en: "Artificer / Awakened Pyro",
        },
        rarity: "mythic",
        roleBadge: { vi: "⚔️ Khuếch Đại & Sốc Phép", en: "⚔️ Tech Amplifier & Burst" },
        mvsSweetSpot: {
          vi: "Thợ Chế Tạo (Artificer): 1 Sao Trắng (560 Mảnh) | Pháp Sư Lửa Đỏ: 9 Đá Linh Hồn",
          en: "Artificer: 1★ White (560 Shards) | Awakened Pyromancer: 9 Soul Stones",
        },
        slotReason: {
          vi: "Trước S2 dùng Pháp Sư Lửa (Pyromancer) Thức tỉnh (Bộ Đồ Quyết Đấu ➔ Cơn Thịnh Nộ / Kỵ Sĩ Vinh Quang); từ S2+ thay bằng Thợ Chế Tạo (Artificer) mặc Bộ Hiền Giả ➔ Ánh Sáng Vinh Quang / Hiền Triết Quang Vinh (Sage Set ➔ Glorious Light / Glory of the Sage) để gom cụm kẻ địch và khuếch đại toàn bộ hỏa lực cho Thiện Xạ (Paragon) cùng Giám Mục (Bishop).",
          en: "Pre-S2 fields Awakened Pyromancer (Duelist's Set ➔ Fury of Blood / Knight's Glory); from S2+ replaces with Artificer wearing Sage Set ➔ Glorious Light (Glory of the Sage Set) to cluster enemies and amplify skill burst for Paragon and Bishop.",
        },
      },
      {
        slotNumber: 5,
        rowZone: "backline_dive",
        wing: "left",
        heroName: {
          vi: "Giám Mục (Bishop)",
          en: "Bishop",
        },
        rarity: "mythic",
        roleBadge: { vi: "✨ Khắc Chế Triệu Hồi", en: "✨ Anti-Summon & Shield" },
        mvsSweetSpot: {
          vi: "1 Sao Đỏ (160 Mảnh) ➔ 1 Sao Trắng (560 Mảnh — Điểm ngọt khắc chế Triệu hồi)",
          en: "1★ Red (160 Shards) ➔ 1★ White (560 Shards — Anti-Summon Sweet Spot)",
        },
        slotReason: {
          vi: "Đứng Ô 5 mặc Bộ Đồ Quyết Đấu ➔ Cơn Thịnh Nộ / Kỵ Sĩ Vinh Quang (Duelist's Set ➔ Fury of Blood / Knight's Glory) để vừa ban Khiên Thánh giải hiệu ứng xấu, vừa kích hoạt tia sáng trừng phạt nổ lan diện rộng xóa sổ đệ triệu hồi của Thuật Sĩ Thủy Triều (Tidecaller).",
          en: "Stands in Slot 5 wearing Duelist's Set ➔ Fury of Blood (Knight's Glory Set) to grant Holy Shields, cleanse debuffs, and trigger chain-explosion beams that wipe Tidecaller's summons.",
        },
      },
      {
        slotNumber: 6,
        rowZone: "backline_dive",
        wing: "right",
        heroName: {
          vi: "Nữ Tu Đỏ (Tu Nữ · Thức Tỉnh / Nun)",
          en: "Nun (Awakened)",
        },
        rarity: "legendary",
        roleBadge: { vi: "💚 Đại Tư Tế Hồi Phục", en: "💚 Supreme Healer" },
        mvsSweetSpot: {
          vi: "Thức Tỉnh Đỏ (9 Đá Linh Hồn + 345–385 Mảnh) ➔ 1 Sao Trắng",
          en: "Mythic Awakened (9 Soul Stones + 345–385 Shards) ➔ 1★ White",
        },
        slotReason: {
          vi: "Chốt chặn hồi phục tối hậu ở Ô 6 với Bộ Hiền Giả ➔ Ánh Sáng Vinh Quang / Hiền Triết Quang Vinh (Sage Set ➔ Glorious Light / Glory of the Sage), giữ cho dàn chắn Công Chúa Rose – Thẩm Phán trụ vững trước các đợt dồn sát thương đầu trận.",
          en: "Supreme healing anchor in Slot 6 equipped with Sage Set ➔ Glorious Light (Glory of the Sage Set), sustaining the Rose Princess – Adjudicator frontline through heavy opening bursts.",
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
      vi: "3. Đội Hình Cầu Nối Lai 4 Liên Minh + 2 Bộ Lạc (Ngày 21–40 S0)",
      en: "3. 4 League + 2 Horde Hybrid Bridge Lineup (Days 21–40 S0)",
    },
    stageTiming: {
      vi: "Ngày 21 – Ngày 40 (Khi vừa mở Hoàng Tử Sa Mạc & Nữ Thần Bão Tố)",
      en: "Days 21 – 40 (Upon unlocking Desert Prince & Storm Maiden)",
    },
    auraBonus: {
      vi: "Hào quang 4+2: +15% ATK & HP + Sức mạnh vượt trội của 2 Tướng Đỏ",
      en: "4+2 Hybrid Aura: +15% ATK & HP + Dual Mythic Power Spike",
    },
    soulStoneBudget: {
      vi: "0 Đá Linh Hồn (Hồn Đá Đỏ / Soul Stone) — Đang tích lũy đủ 9 viên Đá Linh Hồn (360,000 Điểm Vinh Dự Bang / 54,000 Xu Vinh Quang Hội) chờ Thức tỉnh Thuật Sĩ Linh Hồn (Soulmancer) hoặc Pháp Sư Bóng Tối (Warlock).",
      en: "0 Soul Stones (Red Soul Stones) — Actively hoarding 9 Soul Stones (360,000 Guild Honor / 54,000 Guild Race Honor Coins) to awaken Soulmancer or Warlock.",
    },
    counterAdvantage: {
      vi: "⚡ Giai đoạn chuyển giao mượt mà không làm tụt hạng Đấu Trường (Arena)",
      en: "⚡ Seamless transition bridge with zero Arena rank drop",
    },
    slots: [
      {
        slotNumber: 1,
        rowZone: "frontline",
        wing: "left",
        heroName: {
          vi: "Hoàng Tử Sa Mạc (Desert Prince)",
          en: "Desert Prince",
        },
        rarity: "mythic",
        roleBadge: { vi: "🔴 Mythic Bruiser Tank", en: "🔴 Mythic Bruiser Tank" },
        mvsSweetSpot: {
          vi: "1 Sao Đỏ (160 Mảnh — Ra trận ngay thay Người Giữ Bí Mật) ➔ 1 Sao Trắng (560 Mảnh)",
          en: "1★ Red (160 Shards — Replaces Secret Keeper) ➔ 1★ White (560 Shards)",
        },
        slotReason: {
          vi: "Thay thế trực tiếp Người Giữ Bí Mật (Secret Keeper) ở Ô 1 ngay khi đạt 1 Sao Đỏ (160 Mảnh Anh Hùng Huyền Thoại Vạn Năng); mặc Bộ Đồ Titan / Huyết Titan (Titan's Might / Blood of the Titan) đem lại khả năng bất tử ngắn hạn và sát thương chuẩn vượt trội.",
          en: "Directly replaces Secret Keeper in Slot 1 upon reaching 1 Red Star (160 Universal Legendary Shards); wears Titan's Might / Blood of the Titan Set for short-term invulnerability and massive True Damage.",
        },
      },
      {
        slotNumber: 2,
        rowZone: "frontline",
        wing: "right",
        heroName: {
          vi: "Thẩm Phán (Adjudicator)",
          en: "Adjudicator",
        },
        rarity: "legendary",
        roleBadge: { vi: "🔵 Cầu Nối Liên Minh", en: "🔵 League Bridge Tank" },
        mvsSweetSpot: {
          vi: "1 Sao Trắng (Giữ nguyên cấp cũ, 0 Mảnh Vạn Năng)",
          en: "1★ White (Keep existing investment, 0 Universal Shards)",
        },
        slotReason: {
          vi: "Đứng Ô 2 mặc Bộ Đồ Titan / Huyết Titan (Titan's Might / Blood of the Titan) làm trụ đỡ đòn phụ và góp đủ mốc 4 Tướng Liên Minh để giữ hào quang +15% ATK/HP trong lúc chờ Thú Tướng (Beastmaster).",
          en: "Holds Slot 2 in Titan's Might / Blood of the Titan Set as secondary tank and preserves the 4-League (+15% ATK/HP) aura while awaiting Beastmaster.",
        },
      },
      {
        slotNumber: 3,
        rowZone: "midline_safe",
        wing: "left",
        heroName: {
          vi: "Nữ Thần Bão Tố (Storm Maiden)",
          en: "Storm Maiden",
        },
        rarity: "mythic",
        roleBadge: { vi: "🔴 Mythic Hyper-Carry", en: "🔴 Mythic Hyper-Carry" },
        mvsSweetSpot: {
          vi: "1 Sao Đỏ (160 Mảnh — Mở Kỹ năng thứ 5) ➔ 1 Sao Trắng (560 Mảnh — +30% hiệu ứng)",
          en: "1★ Red (160 Shards — Unlocks 5th Skill) ➔ 1★ White (560 Shards — +30% Boost)",
        },
        slotReason: {
          vi: "Thay thế trực tiếp Chiêm Tinh Gia (Astrologer) ở Ô 3 Vùng An Toàn sau lưng Hoàng Tử Sa Mạc; mặc Bộ Đồ Quyết Đấu ➔ Cơn Thịnh Nộ / Kỵ Sĩ Vinh Quang (Duelist's Set ➔ Fury of Blood / Knight's Glory) và ưu tiên nhận toàn bộ Sách Kỹ Năng cùng Mảnh Anh Hùng Huyền Thoại Vạn Năng (Universal Legendary Shard).",
          en: "Replaces Astrologer in Safe Slot 3 behind Desert Prince; wears Duelist's Set ➔ Fury of Blood (Knight's Glory Set) and receives 100% of Skill Books and Universal Legendary Shards.",
        },
      },
      {
        slotNumber: 4,
        rowZone: "midline_safe",
        wing: "right",
        heroName: {
          vi: "Pháp Sư Lửa (Pyromancer)",
          en: "Pyromancer",
        },
        rarity: "legendary",
        roleBadge: { vi: "🔵 Cầu Nối DPS Phụ", en: "🔵 Bridge Sub-DPS" },
        mvsSweetSpot: {
          vi: "1 Sao Trắng (Dùng tiếp từ giai đoạn Ngày 1–20, chờ chuyển xuống Đội 2)",
          en: "1★ White (Carryover from Days 1–20, ready for Queue 2)",
        },
        slotReason: {
          vi: "Đứng Ô 4 mặc Bộ Đồ Quyết Đấu ➔ Cơn Thịnh Nộ / Kỵ Sĩ Vinh Quang (Duelist's Set ➔ Fury of Blood / Knight's Glory) phụ sát thương dọn lính cùng Nữ Thần Bão Tố (Storm Maiden) cho đến Ngày 41 rồi chuyển nguyên vẹn xuống làm Chủ lực Đội 2.",
          en: "Stands in Slot 4 with Duelist's Set ➔ Fury of Blood (Knight's Glory Set) providing secondary AoE alongside Storm Maiden until Day 41 before moving intact to anchor Queue 2.",
        },
      },
      {
        slotNumber: 5,
        rowZone: "backline_dive",
        wing: "left",
        heroName: {
          vi: "Nữ Tu (Nun)",
          en: "Nun",
        },
        rarity: "legendary",
        roleBadge: { vi: "🔵 Cầu Nối Hồi Máu", en: "🔵 Bridge Healer" },
        mvsSweetSpot: {
          vi: "3 Sao Vàng ➔ 1 Sao Trắng (Giữ nguyên chờ Phù Thủy / Witch ở Ngày 41)",
          en: "3★ Gold ➔ 1★ White (Hold until Witch unlocks on Day 41)",
        },
        slotReason: {
          vi: "Giữ nhịp hồi máu ở Ô 5 với Bộ Hiền Giả ➔ Ánh Sáng Vinh Quang / Hiền Triết Quang Vinh (Sage Set ➔ Glorious Light / Glory of the Sage) trong lúc chờ Phù Thủy (Witch — Tướng Đỏ hồi máu hệ Bộ Lạc) ra mắt ở Ngày 41.",
          en: "Sustains the 4-2 Hybrid squad from Slot 5 in Sage Set ➔ Glorious Light (Glory of the Sage Set) until Witch (Horde Mythic healer) unlocks on Day 41.",
        },
      },
      {
        slotNumber: 6,
        rowZone: "backline_dive",
        wing: "right",
        heroName: {
          vi: "Nhà Thơ (Bard)",
          en: "Bard",
        },
        rarity: "legendary",
        roleBadge: { vi: "🔵 Cầu Nối Hồi Nộ", en: "🔵 Bridge Cooldown Buffer" },
        mvsSweetSpot: {
          vi: "3 Sao Vàng ➔ 2 Sao Trắng (Giữ nguyên cấp sao hiện có)",
          en: "3★ Gold ➔ 2★ White (Keep existing star level)",
        },
        slotReason: {
          vi: "Đứng Ô 6 mặc Bộ Hiền Giả ➔ Ánh Sáng Vinh Quang / Hiền Triết Quang Vinh (Sage Set ➔ Glorious Light / Glory of the Sage) bơm tốc độ đánh và giảm hồi chiêu cho Hoàng Tử Sa Mạc (Desert Prince) & Nữ Thần Bão Tố (Storm Maiden), hoàn tất mảnh ghép thứ 4 của hào quang Liên Minh.",
          en: "Stands in Slot 6 with Sage Set ➔ Glorious Light (Glory of the Sage Set) accelerating ultimates for Desert Prince & Storm Maiden while completing the 4-League aura bridge.",
        },
      },
    ],
  },
  {
    id: "horde-endgame",
    tocSubSectionId: "sub-2-2-horde-endgame-5mythic",
    faction: "horde",
    shortLabel: {
      vi: "Bộ Lạc Đỉnh Cao (5 Đỏ + 1 Vàng)",
      en: "Horde Endgame (5 Mythics + 1 SSR)",
    },
    fullTitle: {
      vi: "4. Đội Hình Thuần Bộ Lạc 5 Tướng Đỏ + 1 Vàng Thức Tỉnh (Lộ Trình Tối Ưu Số 1)",
      en: "4. Pure Horde 5-Mythic + 1 Awakened Endgame Lineup (#1 Optimal F2P/Low-Spender Meta)",
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
      vi: "🔥 Chỉ tốn 9 Đá Linh Hồn (Hồn Đá Đỏ / Soul Stone — Tiết kiệm 67% so với Liên Minh & Thiên Nhiên) + 345–385 Mảnh cho duy nhất Thuật Sĩ Linh Hồn (Soulmancer) hoặc Pháp Sư Bóng Tối (Warlock).",
      en: "🔥 Only 9 Soul Stones (Red Soul Stones — Saves 67% vs League & Nature) + 345–385 Shards for Soulmancer or Warlock alone.",
    },
    counterAdvantage: {
      vi: "🔴 Khắc chế +20% DMG trước 75% dân số máy chủ chơi 🔵 Liên Minh!",
      en: "🔴 +20% Counter DMG against 75% of the server playing 🔵 League!",
    },
    slots: [
      {
        slotNumber: 1,
        rowZone: "frontline",
        wing: "left",
        heroName: {
          vi: "Thú Tướng (Beastmaster)",
          en: "Beastmaster",
        },
        rarity: "mythic",
        roleBadge: { vi: "🛡️ Mythic Main Tank", en: "🛡️ Mythic Main Tank" },
        mvsSweetSpot: {
          vi: "1 Sao Đỏ (160 Mảnh) ➔ 1 Sao Trắng (560 Mảnh — Điểm ngọt bất khả xâm phạm)",
          en: "1★ Red (160 Shards) ➔ 1★ White (560 Shards — Unbreakable Sweet Spot)",
        },
        slotReason: {
          vi: "Chốt chặn bất khả xâm phạm của Bộ Lạc đứng Ô 1; mặc Bộ Đồ Titan / Huyết Titan (Titan's Might / Blood of the Titan) (+30% Dấu Hệ Bộ Lạc), tạo Khiên theo % máu tối đa cực dày, gọi Gấu triệu hồi gom toàn bộ hỏa lực cánh trái và tự động nhảy vào bảo vệ đồng đội thấp máu nhất.",
          en: "Unbreakable Horde Main Tank in Slot 1; wears Titan's Might / Blood of the Titan Set (+30% Horde Faction Mark), generating massive % Max HP shields, summoning a Bear to lock left-wing aggro, and leaping to protect low-HP allies.",
        },
      },
      {
        slotNumber: 2,
        rowZone: "frontline",
        wing: "right",
        heroName: {
          vi: "Hoàng Tử Sa Mạc (Desert Prince)",
          en: "Desert Prince",
        },
        rarity: "mythic",
        roleBadge: { vi: "⚔️ Mythic Bruiser / Off-Tank", en: "⚔️ Mythic Bruiser / Off-Tank" },
        mvsSweetSpot: {
          vi: "1 Sao Trắng (560 Mảnh) + Vũ khí Độc quyền Đế Vương Hoàng Kim +10",
          en: "1★ White (560 Shards) + Golden Emperor +10",
        },
        slotReason: {
          vi: "Đứng Ô 2 làm Đấu sĩ / Đỡ đòn phụ mặc Bộ Đồ Titan / Huyết Titan (Titan's Might / Blood of the Titan), nhận đòn tích đầy Nộ trong 3 giây, kích hoạt bất tử ngắn hạn và bổ đôi tuyến đầu đối phương bằng sát thương chuẩn.",
          en: "Off-Tank / Bruiser in Slot 2 wearing Titan's Might / Blood of the Titan Set, soaking hits to fill Rage in 3s, triggering short-term invulnerability, and cleaving enemy tanks with True Damage.",
        },
      },
      {
        slotNumber: 3,
        rowZone: "midline_safe",
        wing: "left",
        heroName: {
          vi: "Tôn Ngộ Không (Wukong)",
          en: "Wukong",
        },
        rarity: "mythic",
        roleBadge: { vi: "👑 Thần Chiến Tranh (Hyper-Carry)", en: "👑 God of War Hyper-Carry" },
        mvsSweetSpot: {
          vi: "1 Sao Trắng (560 Mảnh) ➔ 5 Sao Trắng (1,000 Mảnh) + Vũ khí Độc quyền Gậy Vàng Như Ý +20",
          en: "1★ White (560 Shards) ➔ 5★ White (1,000 Shards) + Ruyi Jingu Bang +20",
        },
        slotReason: {
          vi: "Sát thương chủ lực mạnh nhất trò chơi đứng tại Ô 3 Vùng An Toàn (ngay sau lưng Thú Tướng); kết hợp Bộ Đồ Quyết Đấu ➔ Cơn Thịnh Nộ / Kỵ Sĩ Vinh Quang (Duelist's Set ➔ Fury of Blood / Knight's Glory) (+30% Dấu Hệ Bộ Lạc), gọi Phân Thân Lông Khỉ quét sạch đệ triệu hồi và nhảy bổ vào kết liễu Hàng sau địch.",
          en: "#1 God-of-War Hyper-Carry in Safe Slot 3 behind Beastmaster; pairs Duelist's Set ➔ Fury of Blood (Knight's Glory Set) (+30% Horde Faction Mark) with clone summons that inherit 100% Flat ATK to wipe summons and dive the enemy Backline.",
        },
      },
      {
        slotNumber: 4,
        rowZone: "midline_safe",
        wing: "right",
        heroName: {
          vi: "Nữ Thần Bão Tố (Storm Maiden)",
          en: "Storm Maiden",
        },
        rarity: "mythic",
        roleBadge: { vi: "🌪️ AoE Hyper-Carry Số 2", en: "🌪️ #2 AoE Hyper-Carry" },
        mvsSweetSpot: {
          vi: "1 Sao Trắng (560 Mảnh — Điểm ngọt +30%) + Vũ khí Độc quyền Thiên Lôi +10",
          en: "1★ White (560 Shards — +30% Sweet Spot) + Stormbringer +10",
        },
        slotReason: {
          vi: "An toàn tuyệt đối sau lưng Hoàng Tử Sa Mạc tại Ô 4, mặc Bộ Đồ Quyết Đấu ➔ Cơn Thịnh Nộ / Kỵ Sĩ Vinh Quang (Duelist's Set ➔ Fury of Blood / Knight's Glory) (+30% Dấu Hệ Bộ Lạc) tạo gọng kìm sát thương kép cùng Tôn Ngộ Không (Wukong), quét sạch cột dọc bằng lốc xoáy chí mạng.",
          en: "Safely positioned behind Desert Prince in Slot 4 wearing Duelist's Set ➔ Fury of Blood (Knight's Glory Set) (+30% Horde Faction Mark), forming a dual-carry pincer with Wukong to sweep vertical columns with critical tornadoes.",
        },
      },
      {
        slotNumber: 5,
        rowZone: "backline_dive",
        wing: "left",
        heroName: {
          vi: "Phù Thủy (Witch)",
          en: "Witch",
        },
        rarity: "mythic",
        roleBadge: { vi: "✨ Mythic Healer & Cấm Hồi Máu", en: "✨ Mythic Healer & Anti-Heal" },
        mvsSweetSpot: {
          vi: "1 Sao Đỏ (160 Mảnh — Đủ dùng hoàn hảo) ➔ 1 Sao Trắng (560 Mảnh)",
          en: "1★ Red (160 Shards — Fully Viable) ➔ 1★ White (560 Shards)",
        },
        slotReason: {
          vi: "Trái tim hồi phục kiêm Khống chế phẩm Đỏ của Bộ Lạc ở Ô 5; mặc Bộ Hiền Giả ➔ Ánh Sáng Vinh Quang / Hiền Triết Quang Vinh (Sage Set ➔ Glorious Light / Glory of the Sage) để giảm hồi chiêu, vừa bơm máu toàn đội vừa nguyền rủa gây Sợ hãi và giảm phòng thủ diện rộng.",
          en: "Core Horde Mythic healer and controller in Slot 5; wears Sage Set ➔ Glorious Light (Glory of the Sage Set) for cooldown reduction, providing team-wide sustain alongside AoE Fear and defense-shredding curses.",
        },
      },
      {
        slotNumber: 6,
        rowZone: "backline_dive",
        wing: "right",
        heroName: {
          vi: "Thuật Sĩ Linh Hồn (Soulmancer) / Pháp Sư Bóng Tối Đỏ (Warlock)",
          en: "Soulmancer / Warlock (Awakened)",
        },
        rarity: "legendary",
        roleBadge: { vi: "🔥 Tướng Vàng Thức Tỉnh Duy Nhất", en: "🔥 Sole Awakened Legendary" },
        mvsSweetSpot: {
          vi: "9 Đá Linh Hồn (Hồn Đá Đỏ / Soul Stone) + 345–385 Mảnh (Tướng Vàng Thức tỉnh duy nhất)",
          en: "9 Soul Stones (Red Soul Stones) + 345–385 Shards (Sole Awakened SSR)",
        },
        slotReason: {
          vi: "Mảnh ghép thứ 6 mặc Bộ Hiền Giả ➔ Ánh Sáng Vinh Quang / Hiền Triết Quang Vinh (Sage Set ➔ Glorious Light / Glory of the Sage): chọn Thuật Sĩ Linh Hồn (Soulmancer) (Chia sẻ sát thương bảo vệ Tôn Ngộ Không + hồi sinh PvP) hoặc Pháp Sư Bóng Tối (Warlock) (Buff Tốc đánh & Hút máu dồn sát thương Boss/PvE) — chỉ tốn đúng 9 Đá Linh Hồn (Hồn Đá Đỏ / Soul Stone)!",
          en: "6th slot wearing Sage Set ➔ Glorious Light (Glory of the Sage Set): choose Soulmancer (Damage Link protecting Wukong + PvP revive) or Warlock (Frenzy ATK Speed & Lifesteal buff for Boss/PvE) — costs only 9 Soul Stones (Red Soul Stones) total!",
        },
      },
    ],
  },
  {
    id: "nature-transition",
    tocSubSectionId: "sub-3-1-nature-transition",
    faction: "nature",
    shortLabel: {
      vi: "Thiên Nhiên Giao Thời (S0–S1)",
      en: "Nature Transition (S0–S1)",
    },
    fullTitle: {
      vi: "5. Đội Hình Thiên Nhiên Khởi Đầu & Giao Thời (Tiên Nhỏ + Thiếu Nữ Rừng Xanh)",
      en: "5. Nature Starter & Transition Formation (Pixie + Forest Maiden)",
    },
    stageTiming: {
      vi: "Cuối S0 – Đầu Season 1 (Trước khi hoàn thiện bộ đôi Hòa Thượng + Thuật Sĩ Thủy Triều)",
      en: "Late S0 – Early Season 1 (Before full Monk + Tidecaller engine)",
    },
    auraBonus: {
      vi: "6/6 Thiên Nhiên: +35% ATK & HP toàn đội",
      en: "6/6 Pure Nature: +35% Team ATK & HP",
    },
    soulStoneBudget: {
      vi: "9 đến 18 Đá Linh Hồn (Hồn Đá Đỏ / Soul Stone) — Ưu tiên thức tỉnh Tiên Nhỏ (Pixie — 9 viên) làm nguồn sát thương diện rộng trước, sau đó đến Thiếu Nữ Rừng Xanh (Forest Maiden — 9 viên) hoặc Hiền Giả (Sage — 9 viên).",
      en: "9 to 18 Soul Stones (Red Soul Stones) — Prioritize awakening Pixie (9 stones) first for AoE output, followed by Forest Maiden (9 stones) or Sage (9 stones).",
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
          vi: "Hiền Giả (Sage)",
          en: "Sage",
        },
        rarity: "legendary",
        roleBadge: { vi: "🛡️ Tank Hồi Phục & Khiên", en: "🛡️ Sustain & Shield Tank" },
        mvsSweetSpot: {
          vi: "1 Sao Trắng (280 Mảnh) ➔ Thức Tỉnh Đỏ (9 Đá Linh Hồn ở S1)",
          en: "1★ White (280 Shards) ➔ Mythic Awakened (9 Soul Stones in S1)",
        },
        slotReason: {
          vi: "Đỡ đòn chính giai đoạn chuyển tiếp đứng Ô 1, mặc Bộ Đồ Titan / Huyết Titan (Titan's Might / Blood of the Titan) chịu đòn trực diện và giảm sát thương nhận vào cho cả cột trái.",
          en: "Transition Main Tank in Slot 1 wearing Titan's Might / Blood of the Titan Set, absorbing primary aggro while reducing damage taken along the left column.",
        },
      },
      {
        slotNumber: 2,
        rowZone: "frontline",
        wing: "right",
        heroName: {
          vi: "Vệ Thần Rừng (Treeguard)",
          en: "Treeguard",
        },
        rarity: "legendary",
        roleBadge: { vi: "🌲 Off-Tank Rễ Cây", en: "🌲 Root Control Off-Tank" },
        mvsSweetSpot: {
          vi: "3 Sao Vàng ➔ 1 Sao Trắng (Mảnh Quán Rượu tự nhiên, 0 Mảnh Vạn Năng)",
          en: "3★ Gold ➔ 1★ White (Free Tavern shards, 0 Universal Shards)",
        },
        slotReason: {
          vi: "Đỡ đòn phụ Ô 2 mặc Bộ Đồ Titan / Huyết Titan (Titan's Might / Blood of the Titan) tự hồi phục máu và mọc rễ trói chân tuyến đầu địch trước khi nhường chỗ cho Hòa Thượng (Monk) và Na Tra (Ne Zha).",
          en: "Off-Tank in Slot 2 wearing Titan's Might / Blood of the Titan Set, self-healing and rooting enemy frontline units until replaced by Monk and Ne Zha.",
        },
      },
      {
        slotNumber: 3,
        rowZone: "midline_safe",
        wing: "left",
        heroName: {
          vi: "Tiên Nhỏ (Pixie)",
          en: "Pixie",
        },
        rarity: "legendary",
        roleBadge: { vi: "👑 Sát Thương Phép Chuẩn", en: "👑 AoE Burst Carry" },
        mvsSweetSpot: {
          vi: "1 Sao Trắng (280 Mảnh) ➔ Ưu tiên số 1 Thức Tỉnh Đỏ (9 Đá Linh Hồn)",
          en: "1★ White (280 Shards) ➔ #1 Awakening Priority (9 Soul Stones)",
        },
        slotReason: {
          vi: "Nguồn sát thương phép diện rộng cốt lõi đứng tại Ô 3 Vùng An Toàn; mặc Bộ Đồ Quyết Đấu ➔ Cơn Thịnh Nộ / Kỵ Sĩ Vinh Quang (Duelist's Set ➔ Fury of Blood / Knight's Glory) để xả phấn hoa nổ diện rộng liên tục.",
          en: "Core Nature AoE magic carry protected in Safe Slot 3; wears Duelist's Set ➔ Fury of Blood (Knight's Glory Set) to detonate continuous AoE pollen blasts.",
        },
      },
      {
        slotNumber: 4,
        rowZone: "midline_safe",
        wing: "right",
        heroName: {
          vi: "Phong Hành Giả (Windwalker)",
          en: "Windwalker",
        },
        rarity: "legendary",
        roleBadge: { vi: "🗡️ Sát Thủ Móc Lốp", en: "🗡️ Backline Dive Assassin" },
        mvsSweetSpot: {
          vi: "1 Sao Đỏ (200 Mảnh) ➔ 1 Sao Trắng (Ngưng đầu tư khi có Thuật Sĩ Thủy Triều)",
          en: "1★ Red (200 Shards) ➔ 1★ White (Stop investing once Tidecaller unlocks)",
        },
        slotReason: {
          vi: "Xuất phát từ Ô 4 mặc Bộ Đồ Quyết Đấu ➔ Cơn Thịnh Nộ / Kỵ Sĩ Vinh Quang (Duelist's Set ➔ Fury of Blood / Knight's Glory) để lao vào kết liễu nhanh tướng Hồi máu hàng sau của địch trước khi Thuật Sĩ Thủy Triều (Tidecaller) ra mắt ở đầu Season 1.",
          en: "Launches from Slot 4 in Duelist's Set ➔ Fury of Blood (Knight's Glory Set) to dive and execute enemy backline healers prior to Tidecaller's Season 1 debut.",
        },
      },
      {
        slotNumber: 5,
        rowZone: "backline_dive",
        wing: "left",
        heroName: {
          vi: "Thiếu Nữ Rừng Xanh (Forest Maiden)",
          en: "Forest Maiden",
        },
        rarity: "legendary",
        roleBadge: { vi: "🐑 Khống Chế & Cộng Hưởng Đệ", en: "🐑 Polymorph & Summon Engine" },
        mvsSweetSpot: {
          vi: "1 Sao Trắng (280 Mảnh) ➔ Thức Tỉnh Đỏ (9 Đá Linh Hồn)",
          en: "1★ White (280 Shards) ➔ Mythic Awakened (9 Soul Stones)",
        },
        slotReason: {
          vi: "Động cơ năng lượng của hệ Triệu hồi đứng Ô 5, mặc Bộ Hiền Giả ➔ Ánh Sáng Vinh Quang / Hiền Triết Quang Vinh (Sage Set ➔ Glorious Light / Glory of the Sage): gọi Cừu khắc chế kẻ địch và hồi năng lượng + cộng dồn ATK cho toàn đội mỗi khi đệ triệu hồi biến mất.",
          en: "Summon energy engine in Slot 5 wearing Sage Set ➔ Glorious Light (Glory of the Sage Set): polymorphs enemies, summons sheep, and refunds energy + ATK stacks whenever summons expire.",
        },
      },
      {
        slotNumber: 6,
        rowZone: "backline_dive",
        wing: "right",
        heroName: {
          vi: "Đại Tư Tế Rừng (Druid)",
          en: "Druid",
        },
        rarity: "legendary",
        roleBadge: { vi: "🌿 Hồi Máu & Gọi Đệ", en: "🌿 Sustain & Ent Summoner" },
        mvsSweetSpot: {
          vi: "3 Sao Vàng ➔ 1 Sao Trắng (Mảnh Quán Rượu, bàn giao xuống Đội 2 ở S1)",
          en: "3★ Gold ➔ 1★ White (Free Tavern shards, hand off to Queue 2 in S1)",
        },
        slotReason: {
          vi: "Đứng Ô 6 mặc Bộ Hiền Giả ➔ Ánh Sáng Vinh Quang / Hiền Triết Quang Vinh (Sage Set ➔ Glorious Light / Glory of the Sage) hồi máu theo thời gian (HoT) và gọi Người Cây (Treant) giữ tuyến đầu sống sót cho đến khi có Thuật Sĩ Thủy Triều (Tidecaller).",
          en: "Stands in Slot 6 with Sage Set ➔ Glorious Light (Glory of the Sage Set), providing Heal-over-Time (HoT) and Treant summons to sustain the frontline until Tidecaller arrives.",
        },
      },
    ],
  },
  {
    id: "nature-endgame",
    tocSubSectionId: "sub-3-2-nature-endgame-pure",
    faction: "nature",
    shortLabel: {
      vi: "Thiên Nhiên Đỉnh Cao (S1–S4)",
      en: "Nature Endgame (S1–S4)",
    },
    fullTitle: {
      vi: "6. Đội Hình Thuần Thiên Nhiên Cuối Game (Thuật Sĩ Thủy Triều + Hòa Thượng + Na Tra)",
      en: "6. Pure Nature Endgame Perpetual Summon Engine (Tidecaller + Monk + Ne Zha)",
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
      vi: "18 đến 27 Đá Linh Hồn (Hồn Đá Đỏ / Soul Stone) — Bắt buộc thức tỉnh Tiên Nhỏ (Pixie — 9 viên) và Thiếu Nữ Rừng Xanh (Forest Maiden — 9 viên); nếu chưa có Tiên Hoa Petalis (Petalis — S3) thì cần thêm 9 viên cho Hiền Giả (Sage).",
      en: "18 to 27 Soul Stones (Red Soul Stones) — Mandatory awakening for Pixie (9 stones) and Forest Maiden (9 stones); requires an additional 9 stones for Sage prior to unlocking Petalis in S3.",
    },
    counterAdvantage: {
      vi: "🟢 Khắc chế cứng 🔴 Bộ Lạc (+20% DMG & Đệ chắn đòn Tôn Ngộ Không / Wukong)",
      en: "🟢 Hard-counters 🔴 Horde (+20% DMG & Summons absorb Wukong dives)",
    },
    slots: [
      {
        slotNumber: 1,
        rowZone: "frontline",
        wing: "left",
        heroName: {
          vi: "Hòa Thượng (Monk)",
          en: "Monk",
        },
        rarity: "mythic",
        roleBadge: { vi: "🛡️ Mythic Main Tank", en: "🛡️ Mythic Main Tank" },
        mvsSweetSpot: {
          vi: "1 Sao Đỏ (160 Mảnh) ➔ 1 Sao Trắng (560 Mảnh — Điểm ngọt chống sốc sát thương)",
          en: "1★ Red (160 Shards) ➔ 1★ White (560 Shards — Anti-Burst Sweet Spot)",
        },
        slotReason: {
          vi: "Đỡ đòn chính Tướng Đỏ đứng Ô 1 mặc Bộ Đồ Titan / Huyết Titan (Titan's Might / Blood of the Titan) (+30% Dấu Hệ Thiên Nhiên), tạo Khiên cộng hưởng với số lượng đệ của Thuật Sĩ Thủy Triều (Tidecaller) và kháng khống chế tuyến đầu.",
          en: "Mythic Main Tank in Slot 1 wearing Titan's Might / Blood of the Titan Set (+30% Nature Faction Mark), generating shields scaling with Tidecaller's summons and resisting CC.",
        },
      },
      {
        slotNumber: 2,
        rowZone: "frontline",
        wing: "right",
        heroName: {
          vi: "Na Tra (Ne Zha)",
          en: "Ne Zha",
        },
        rarity: "mythic",
        roleBadge: { vi: "🔥 Mythic Bruiser Bất Tử", en: "🔥 Immortal Mythic Bruiser" },
        mvsSweetSpot: {
          vi: "1 Sao Trắng (560 Mảnh) + Vũ khí Độc quyền Hỏa Tiêm Thương +10/+20",
          en: "1★ White (560 Shards) + Fire-Tipped Spear +10/+20",
        },
        slotReason: {
          vi: "Đấu sĩ Tướng Đỏ đứng Ô 2 mặc Bộ Đồ Titan / Huyết Titan (Titan's Might / Blood of the Titan) (+30% Dấu Hệ Thiên Nhiên) với nội tại Hồi sinh Hoa Sen và thiêu đốt diện rộng, giúp tuyến đầu Thiên Nhiên trụ vững trước Tôn Ngộ Không (Wukong).",
          en: "Immortal Mythic bruiser in Slot 2 wearing Titan's Might / Blood of the Titan Set (+30% Nature Faction Mark) with Lotus resurrection and AoE burn to hold the frontline against Wukong.",
        },
      },
      {
        slotNumber: 3,
        rowZone: "midline_safe",
        wing: "left",
        heroName: {
          vi: "Thuật Sĩ Thủy Triều (Tidecaller)",
          en: "Tidecaller",
        },
        rarity: "mythic",
        roleBadge: { vi: "👑 Nữ Hoàng Triệu Hồi & Hồi Máu", en: "👑 Supreme Summoner & Healer Carry" },
        mvsSweetSpot: {
          vi: "1 Sao Trắng (560 Mảnh) ➔ 5 Sao Trắng (1,000 Mảnh) + Vũ khí Độc quyền Đinh Ba Thần +20",
          en: "1★ White (560 Shards) ➔ 5★ White (1,000 Shards) + Divine Trident +20",
        },
        slotReason: {
          vi: "Bắt buộc đứng ở Ô 3 Vùng An Toàn sau lưng Hòa Thượng (Monk); mặc Bộ Đồ Quyết Đấu ➔ Cơn Thịnh Nộ / Kỵ Sĩ Vinh Quang (Duelist's Set ➔ Fury of Blood / Knight's Glory) (+30% Dấu Hệ Thiên Nhiên) vừa gọi Thủy Tinh Linh chắn đạn, vừa hồi máu toàn đội và xả sóng thần.",
          en: "Must stand in Safe Slot 3 behind Monk; wears Duelist's Set ➔ Fury of Blood (Knight's Glory Set) (+30% Nature Faction Mark) to flood the field with Water Elementals, heal allies, and unleash tsunamis.",
        },
      },
      {
        slotNumber: 4,
        rowZone: "midline_safe",
        wing: "right",
        heroName: {
          vi: "Tiên Nhỏ Đỏ (Pixie · Thức Tỉnh)",
          en: "Pixie (Awakened)",
        },
        rarity: "legendary",
        roleBadge: { vi: "🌸 Awakened Burst Carry", en: "🌸 Awakened Burst Carry" },
        mvsSweetSpot: {
          vi: "Thức Tỉnh Đỏ (9 Đá Linh Hồn + 345–385 Mảnh) ➔ 1 Sao Trắng",
          en: "Mythic Awakened (9 Soul Stones + 345–385 Shards) ➔ 1★ White",
        },
        slotReason: {
          vi: "Đứng Ô 4 Vùng An Toàn mặc Bộ Đồ Quyết Đấu ➔ Cơn Thịnh Nộ / Kỵ Sĩ Vinh Quang (Duelist's Set ➔ Fury of Blood / Knight's Glory) (+30% Dấu Hệ Thiên Nhiên) xả sát thương phép khổng lồ trong khi địch bị kẹt vào biển đệ triệu hồi của Thuật Sĩ Thủy Triều (Tidecaller).",
          en: "Unleashes massive magic AoE from Safe Slot 4 in Duelist's Set ➔ Fury of Blood (Knight's Glory Set) (+30% Nature Faction Mark) while enemies are bogged down by Tidecaller's summons.",
        },
      },
      {
        slotNumber: 5,
        rowZone: "backline_dive",
        wing: "left",
        heroName: {
          vi: "Thiếu Nữ Rừng Xanh Đỏ (Forest Maiden · Thức Tỉnh)",
          en: "Forest Maiden (Awakened)",
        },
        rarity: "legendary",
        roleBadge: { vi: "♻️ Động Cơ Hồi Nộ Vĩnh Cửu", en: "♻️ Perpetual Energy Engine" },
        mvsSweetSpot: {
          vi: "Thức Tỉnh Đỏ (9 Đá Linh Hồn + 345–385 Mảnh) ➔ 1 Sao Trắng",
          en: "Mythic Awakened (9 Soul Stones + 345–385 Shards) ➔ 1★ White",
        },
        slotReason: {
          vi: "Đặt ở Ô 5 mặc Bộ Hiền Giả ➔ Ánh Sáng Vinh Quang / Hiền Triết Quang Vinh (Sage Set ➔ Glorious Light / Glory of the Sage): mỗi khi Thủy Tinh Linh của Thuật Sĩ Thủy Triều (Tidecaller) hoặc Cừu hy sinh, Thiếu Nữ Rừng Xanh bơm đầy Nộ và tăng ATK cho cả đội.",
          en: "Positioned in Slot 5 wearing Sage Set ➔ Glorious Light (Glory of the Sage Set): whenever Tidecaller's Water Elementals or sheep die, Forest Maiden refills team Energy and buffs ATK.",
        },
      },
      {
        slotNumber: 6,
        rowZone: "backline_dive",
        wing: "right",
        heroName: {
          vi: "Tiên Hoa Petalis (Petalis) / Hiền Giả Đỏ (Sage)",
          en: "Petalis / Awakened Sage",
        },
        rarity: "mythic",
        roleBadge: { vi: "✨ Hỗ Trợ Đỉnh Cao S3–S4", en: "✨ S3–S4 Supreme Support" },
        mvsSweetSpot: {
          vi: "Tiên Hoa Petalis (S3): 1 Sao Trắng (560 Mảnh) | Hiền Giả Đỏ (S1–S2): 9 Đá Linh Hồn",
          en: "Petalis (S3): 1★ White (560 Shards) | Awakened Sage (S1–S2): 9 Soul Stones",
        },
        slotReason: {
          vi: "Ở S1–S2 dùng Hiền Giả (Sage) Thức tỉnh; từ S3 thay bằng Tiên Hoa Petalis (Petalis) khóa chặt Ô 6 với Bộ Hiền Giả ➔ Ánh Sáng Vinh Quang / Hiền Triết Quang Vinh (Sage Set ➔ Glorious Light / Glory of the Sage), tạo lớp khiên thực vật và Bào Tử Mê Hoặc chống sốc sát thương từ Sát thủ địch.",
          en: "Uses Awakened Sage in S1–S2; from S3 replaces with Petalis in Slot 6 wearing Sage Set ➔ Glorious Light (Glory of the Sage Set) for botanical shields and Charm Spores against diving assassins.",
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
    gearSetChip: "Bộ Trang Bị Chuẩn",
    auraHeading: "✨ Hào Quang Đồng Hệ:",
    soulStoneHeading: "💎 Ngân Sách Đá Linh Hồn (Hồn Đá Đỏ / Soul Stone):",
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
    gearSetChip: "BiS Golden/Mythic Gear Set",
    auraHeading: "✨ Faction Aura:",
    soulStoneHeading: "💎 Soul Stone (Red Soul Stone) Budget:",
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

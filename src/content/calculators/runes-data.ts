import type { CalculatorLocale } from "./types";

export type RuneLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type RuneSlotIndex = 1 | 2 | 3 | 4 | 5 | 6;
export type RuneFactionId = "horde" | "league" | "nature";
export type RuneScopeMode = "board6" | "single";

export interface RuneLevelCostRow {
  readonly level: RuneLevel;
  /** Tổng số viên Lv.1 cần để ghép thành 1 viên cấp này = 3^(n-1) */
  readonly lv1CopiesPerRune: number;
  /** Tổng số viên Lv.1 cần cho trọn bộ 6 ô = 6 * 3^(n-1) */
  readonly lv1CopiesSixSlots: number;
  /** Bụi Cổ Ngữ tăng thêm từ cấp (n-1) lên cấp n cho 1 viên */
  readonly stepDustPerRune: number;
  /** Bụi Cổ Ngữ tích lũy từ Lv.1 lên cấp n cho 1 viên */
  readonly cumulativeDustPerRune: number;
  /** Tổng Bụi Cổ Ngữ tích lũy cho trọn bộ 6 ô ở cấp n */
  readonly cumulativeDustSixSlots: number;
  /** Tổng Quy Mô Hành Quân (March Size) từ Ô 3 + Ô 4 + Ô 6 ở cấp n */
  readonly totalMarchSizeSixSlots: number;
  readonly isBreakpoint: boolean;
  readonly breakpointBadge?: Readonly<Record<CalculatorLocale, string>>;
  readonly tacticalNote: Readonly<Record<CalculatorLocale, string>>;
}

export interface RuneSlotLevelStat {
  readonly level: RuneLevel;
  readonly flatPrimary: number;
  readonly flatSecondary?: number;
  readonly marchSizeBonus: number;
  readonly percentBonus: number;
}

export interface RuneSlotDefinition {
  readonly slotIndex: RuneSlotIndex;
  readonly code: string;
  readonly name: Readonly<Record<CalculatorLocale, string>>;
  readonly shortName: Readonly<Record<CalculatorLocale, string>>;
  readonly primaryStatLabel: Readonly<Record<CalculatorLocale, string>>;
  readonly secondaryStatLabel?: Readonly<Record<CalculatorLocale, string>>;
  readonly percentStatLabel: Readonly<Record<CalculatorLocale, string>>;
  readonly hasMarchSize: boolean;
  readonly percentUnlockLevel: 5 | 8;
  readonly tacticalRole: Readonly<Record<CalculatorLocale, string>>;
  readonly levels: readonly RuneSlotLevelStat[];
}

export interface RuneFactionPriorityProfile {
  readonly id: RuneFactionId;
  readonly name: Readonly<Record<CalculatorLocale, string>>;
  readonly badge: Readonly<Record<CalculatorLocale, string>>;
  readonly priorityTier1Slots: readonly RuneSlotIndex[];
  readonly priorityTier2Slots: readonly RuneSlotIndex[];
  readonly priorityTier3Slots: readonly RuneSlotIndex[];
  readonly rationale: Readonly<Record<CalculatorLocale, string>>;
}

export interface RuneFodderInventory {
  readonly lv1Count: number;
  readonly lv2Count: number;
  readonly lv3Count: number;
  readonly lv4Count: number;
  readonly lv5Count: number;
  readonly choiceChestLv1: number;
  readonly choiceChestLv3: number;
  readonly choiceChestLv5: number;
}

export const RUNE_LEVELS: readonly RuneLevel[] = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
] as const;

export const RUNE_LEVEL_COSTS: readonly RuneLevelCostRow[] = [
  {
    level: 1,
    lv1CopiesPerRune: 1,
    lv1CopiesSixSlots: 6,
    stepDustPerRune: 0,
    cumulativeDustPerRune: 0,
    cumulativeDustSixSlots: 0,
    totalMarchSizeSixSlots: 0,
    isBreakpoint: false,
    tacticalNote: {
      vi: "Cấp khởi điểm cơ bản (chỉ cộng chỉ số phẳng Flat Stats).",
      en: "Base starting tier (grants Flat Stats only).",
    },
  },
  {
    level: 2,
    lv1CopiesPerRune: 3,
    lv1CopiesSixSlots: 18,
    stepDustPerRune: 200,
    cumulativeDustPerRune: 200,
    cumulativeDustSixSlots: 1_200,
    totalMarchSizeSixSlots: 0,
    isBreakpoint: false,
    tacticalNote: {
      vi: "Bước ghép Tam Phân đầu tiên (3 viên Lv.1 = 1 viên Lv.2).",
      en: "First ternary synthesis step (3x Lv.1 = 1x Lv.2).",
    },
  },
  {
    level: 3,
    lv1CopiesPerRune: 9,
    lv1CopiesSixSlots: 54,
    stepDustPerRune: 600,
    cumulativeDustPerRune: 800,
    cumulativeDustSixSlots: 4_800,
    totalMarchSizeSixSlots: 0,
    isBreakpoint: false,
    tacticalNote: {
      vi: "Cấm mở Rương Cổ Ngữ Tự Chọn ở Lv.1–Lv.3 để tránh trùng ô lãng phí.",
      en: "Never open Rune Choice Chests at Lv.1-Lv.3 to avoid slot collisions.",
    },
  },
  {
    level: 4,
    lv1CopiesPerRune: 27,
    lv1CopiesSixSlots: 162,
    stepDustPerRune: 1_800,
    cumulativeDustPerRune: 2_600,
    cumulativeDustSixSlots: 15_600,
    totalMarchSizeSixSlots: 0,
    isBreakpoint: false,
    tacticalNote: {
      vi: "Ngưỡng chuẩn bị gom mảnh chốt hạ (Finisher Piece) lên Điểm Gãy Lv.5.",
      en: "Preparation threshold before using Finisher Choice Chests for Lv.5.",
    },
  },
  {
    level: 5,
    lv1CopiesPerRune: 81,
    lv1CopiesSixSlots: 486,
    stepDustPerRune: 5_400,
    cumulativeDustPerRune: 8_000,
    cumulativeDustSixSlots: 48_000,
    totalMarchSizeSixSlots: 110,
    isBreakpoint: true,
    breakpointBadge: {
      vi: "Điểm Gãy #1 (Lv.5)",
      en: "Breakpoint #1 (Lv.5)",
    },
    tacticalNote: {
      vi: "Mở khóa +5% HP/ATK Tướng (Ô 1 & Ô 2) và +110 Quy Mô Hành Quân (Ô 3 +30, Ô 4 +30, Ô 6 +50).",
      en: "Unlocks +5% Hero HP/ATK (Slots 1 & 2) and +110 Total March Size (30 + 30 + 50).",
    },
  },
  {
    level: 6,
    lv1CopiesPerRune: 243,
    lv1CopiesSixSlots: 1_458,
    stepDustPerRune: 17_000,
    cumulativeDustPerRune: 25_000,
    cumulativeDustSixSlots: 150_000,
    totalMarchSizeSixSlots: 150,
    isBreakpoint: true,
    breakpointBadge: {
      vi: "Mốc Trung Kỳ (Lv.6)",
      en: "Mid-Game Spike (Lv.6)",
    },
    tacticalNote: {
      vi: "Nhân đôi chỉ số phần trăm tướng lên +10% HP/ATK Tướng và nâng tổng March Size lên +150 lính.",
      en: "Doubles Hero % bonus to +10% Hero HP/ATK and raises Total March Size to +150.",
    },
  },
  {
    level: 7,
    lv1CopiesPerRune: 729,
    lv1CopiesSixSlots: 4_374,
    stepDustPerRune: 50_000,
    cumulativeDustPerRune: 75_000,
    cumulativeDustSixSlots: 450_000,
    totalMarchSizeSixSlots: 200,
    isBreakpoint: false,
    tacticalNote: {
      vi: "Nâng +15% HP/ATK Tướng và +200 March Size; bước đệm tiến tới Đại Đột Phá Lv.8.",
      en: "Grants +15% Hero HP/ATK and +200 March Size on the way to Lv.8.",
    },
  },
  {
    level: 8,
    lv1CopiesPerRune: 2_187,
    lv1CopiesSixSlots: 13_122,
    stepDustPerRune: 150_000,
    cumulativeDustPerRune: 225_000,
    cumulativeDustSixSlots: 1_350_000,
    totalMarchSizeSixSlots: 250,
    isBreakpoint: true,
    breakpointBadge: {
      vi: "Đại Đột Phá #2 (Lv.8)",
      en: "Grand Breakpoint #2 (Lv.8)",
    },
    tacticalNote: {
      vi: "Mở khóa +5% HP/ATK Toàn Lính (Ô 3 & Ô 4), +5% HP Bí Bảo (Ô 5), +20% HP/ATK Tướng và +250 March Size.",
      en: "Unlocks +5% All Soldiers HP/ATK (Slots 3 & 4), +5% Relic HP (Slot 5), +20% Hero HP/ATK, and +250 March Size.",
    },
  },
  {
    level: 9,
    lv1CopiesPerRune: 6_561,
    lv1CopiesSixSlots: 39_366,
    stepDustPerRune: 450_000,
    cumulativeDustPerRune: 675_000,
    cumulativeDustSixSlots: 4_050_000,
    totalMarchSizeSixSlots: 300,
    isBreakpoint: false,
    tacticalNote: {
      vi: "Mốc Hậu Kỳ: +25% HP/ATK Tướng, +10% HP/ATK Toàn Lính & Bí Bảo, +300 March Size.",
      en: "Late-game tier: +25% Hero HP/ATK, +10% Soldiers & Relic HP, +300 March Size.",
    },
  },
  {
    level: 10,
    lv1CopiesPerRune: 19_683,
    lv1CopiesSixSlots: 118_098,
    stepDustPerRune: 1_350_000,
    cumulativeDustPerRune: 2_025_000,
    cumulativeDustSixSlots: 12_150_000,
    totalMarchSizeSixSlots: 360,
    isBreakpoint: false,
    tacticalNote: {
      vi: "Mốc Cao Cấp: +30% HP/ATK Tướng, +15% HP/ATK Toàn Lính & Bí Bảo, +360 March Size.",
      en: "Endgame tier: +30% Hero HP/ATK, +15% Soldiers & Relic HP, +360 March Size.",
    },
  },
  {
    level: 11,
    lv1CopiesPerRune: 59_049,
    lv1CopiesSixSlots: 354_294,
    stepDustPerRune: 4_050_000,
    cumulativeDustPerRune: 6_075_000,
    cumulativeDustSixSlots: 36_450_000,
    totalMarchSizeSixSlots: 400,
    isBreakpoint: false,
    tacticalNote: {
      vi: "Cận Đỉnh: +35% HP/ATK Tướng, +20% HP/ATK Toàn Lính & Bí Bảo, +400 March Size.",
      en: "Penultimate tier: +35% Hero HP/ATK, +20% Soldiers & Relic HP, +400 March Size.",
    },
  },
  {
    level: 12,
    lv1CopiesPerRune: 177_147,
    lv1CopiesSixSlots: 1_062_882,
    stepDustPerRune: 12_150_000,
    cumulativeDustPerRune: 18_225_000,
    cumulativeDustSixSlots: 109_350_000,
    totalMarchSizeSixSlots: 450,
    isBreakpoint: true,
    breakpointBadge: {
      vi: "Đỉnh Tối Đa (Lv.12)",
      en: "Max Cap (Lv.12)",
    },
    tacticalNote: {
      vi: "Trần tuyệt đối: +40% HP/ATK Tướng, +30% HP/ATK Toàn Lính, +30% HP Bí Bảo và +450 March Size.",
      en: "Absolute cap: +40% Hero HP/ATK, +30% All Soldiers HP/ATK, +30% Relic HP, and +450 March Size.",
    },
  },
] as const;

export const RUNE_SLOTS: readonly RuneSlotDefinition[] = [
  {
    slotIndex: 1,
    code: "hero-hp",
    name: {
      vi: "Ô 1 — Máu Anh Hùng (Hero HP)",
      en: "Slot 1 — Hero HP Rune",
    },
    shortName: {
      vi: "Ô 1: Máu Tướng",
      en: "Slot 1: Hero HP",
    },
    primaryStatLabel: {
      vi: "Máu Tướng Phẳng",
      en: "Flat Hero HP",
    },
    percentStatLabel: {
      vi: "% Máu Tướng",
      en: "Hero HP %",
    },
    hasMarchSize: false,
    percentUnlockLevel: 5,
    tacticalRole: {
      vi: "Mở khóa +5% Máu Tướng ngay từ Lv.5 (đạt +40% ở Lv.12).",
      en: "Unlocks +5% Hero HP at Lv.5 (reaches +40% at Lv.12).",
    },
    levels: [
      { level: 1, flatPrimary: 650, marchSizeBonus: 0, percentBonus: 0 },
      { level: 2, flatPrimary: 975, marchSizeBonus: 0, percentBonus: 0 },
      { level: 3, flatPrimary: 2_193, marchSizeBonus: 0, percentBonus: 0 },
      { level: 4, flatPrimary: 5_606, marchSizeBonus: 0, percentBonus: 0 },
      { level: 5, flatPrimary: 15_091, marchSizeBonus: 0, percentBonus: 5 },
      { level: 6, flatPrimary: 40_616, marchSizeBonus: 0, percentBonus: 10 },
      { level: 7, flatPrimary: 88_792, marchSizeBonus: 0, percentBonus: 15 },
      { level: 8, flatPrimary: 191_019, marchSizeBonus: 0, percentBonus: 20 },
      { level: 9, flatPrimary: 312_456, marchSizeBonus: 0, percentBonus: 25 },
      { level: 10, flatPrimary: 422_804, marchSizeBonus: 0, percentBonus: 30 },
      { level: 11, flatPrimary: 561_993, marchSizeBonus: 0, percentBonus: 35 },
      { level: 12, flatPrimary: 722_271, marchSizeBonus: 0, percentBonus: 40 },
    ],
  },
  {
    slotIndex: 2,
    code: "hero-attack",
    name: {
      vi: "Ô 2 — Công Anh Hùng (Hero Attack)",
      en: "Slot 2 — Hero Attack Rune",
    },
    shortName: {
      vi: "Ô 2: Công Tướng",
      en: "Slot 2: Hero ATK",
    },
    primaryStatLabel: {
      vi: "Công Tướng Phẳng",
      en: "Flat Hero ATK",
    },
    percentStatLabel: {
      vi: "% Công Tướng",
      en: "Hero ATK %",
    },
    hasMarchSize: false,
    percentUnlockLevel: 5,
    tacticalRole: {
      vi: "Cốt lõi sát thương kỹ năng: mở khóa +5% Công Tướng ở Lv.5 (đạt +40% ở Lv.12).",
      en: "Core skill damage amplifier: unlocks +5% Hero ATK at Lv.5 (+40% at Lv.12).",
    },
    levels: [
      { level: 1, flatPrimary: 16, marchSizeBonus: 0, percentBonus: 0 },
      { level: 2, flatPrimary: 24, marchSizeBonus: 0, percentBonus: 0 },
      { level: 3, flatPrimary: 54, marchSizeBonus: 0, percentBonus: 0 },
      { level: 4, flatPrimary: 138, marchSizeBonus: 0, percentBonus: 0 },
      { level: 5, flatPrimary: 371, marchSizeBonus: 0, percentBonus: 5 },
      { level: 6, flatPrimary: 999, marchSizeBonus: 0, percentBonus: 10 },
      { level: 7, flatPrimary: 2_183, marchSizeBonus: 0, percentBonus: 15 },
      { level: 8, flatPrimary: 4_696, marchSizeBonus: 0, percentBonus: 20 },
      { level: 9, flatPrimary: 7_681, marchSizeBonus: 0, percentBonus: 25 },
      { level: 10, flatPrimary: 10_393, marchSizeBonus: 0, percentBonus: 30 },
      { level: 11, flatPrimary: 13_814, marchSizeBonus: 0, percentBonus: 35 },
      { level: 12, flatPrimary: 17_753, marchSizeBonus: 0, percentBonus: 40 },
    ],
  },
  {
    slotIndex: 3,
    code: "soldier-hp",
    name: {
      vi: "Ô 3 — Máu Binh Lính (Soldier HP)",
      en: "Slot 3 — Soldier HP Rune",
    },
    shortName: {
      vi: "Ô 3: Máu Lính",
      en: "Slot 3: Soldier HP",
    },
    primaryStatLabel: {
      vi: "Máu Lính Phẳng",
      en: "Flat Soldier HP",
    },
    percentStatLabel: {
      vi: "% Máu Toàn Lính",
      en: "All Soldiers HP %",
    },
    hasMarchSize: true,
    percentUnlockLevel: 8,
    tacticalRole: {
      vi: "Mở +30 March Size ở Lv.5 và kích hoạt +5% Máu Toàn Lính ở Đại Đột Phá Lv.8.",
      en: "Unlocks +30 March Size at Lv.5 and +5% All Soldiers HP at Grand Breakpoint Lv.8.",
    },
    levels: [
      { level: 1, flatPrimary: 2, marchSizeBonus: 0, percentBonus: 0 },
      { level: 2, flatPrimary: 3, marchSizeBonus: 0, percentBonus: 0 },
      { level: 3, flatPrimary: 5, marchSizeBonus: 0, percentBonus: 0 },
      { level: 4, flatPrimary: 8, marchSizeBonus: 0, percentBonus: 0 },
      { level: 5, flatPrimary: 11, marchSizeBonus: 30, percentBonus: 0 },
      { level: 6, flatPrimary: 15, marchSizeBonus: 35, percentBonus: 0 },
      { level: 7, flatPrimary: 25, marchSizeBonus: 42, percentBonus: 0 },
      { level: 8, flatPrimary: 30, marchSizeBonus: 50, percentBonus: 5 },
      { level: 9, flatPrimary: 45, marchSizeBonus: 60, percentBonus: 10 },
      { level: 10, flatPrimary: 60, marchSizeBonus: 75, percentBonus: 15 },
      { level: 11, flatPrimary: 75, marchSizeBonus: 85, percentBonus: 20 },
      { level: 12, flatPrimary: 92, marchSizeBonus: 100, percentBonus: 30 },
    ],
  },
  {
    slotIndex: 4,
    code: "soldier-attack",
    name: {
      vi: "Ô 4 — Công Binh Lính (Soldier Attack)",
      en: "Slot 4 — Soldier Attack Rune",
    },
    shortName: {
      vi: "Ô 4: Công Lính",
      en: "Slot 4: Soldier ATK",
    },
    primaryStatLabel: {
      vi: "Công Lính Phẳng",
      en: "Flat Soldier ATK",
    },
    percentStatLabel: {
      vi: "% Công Toàn Lính",
      en: "All Soldiers ATK %",
    },
    hasMarchSize: true,
    percentUnlockLevel: 8,
    tacticalRole: {
      vi: "Mở +30 March Size ở Lv.5 và kích hoạt +5% Công Toàn Lính ở Đại Đột Phá Lv.8.",
      en: "Unlocks +30 March Size at Lv.5 and +5% All Soldiers ATK at Grand Breakpoint Lv.8.",
    },
    levels: [
      { level: 1, flatPrimary: 2, marchSizeBonus: 0, percentBonus: 0 },
      { level: 2, flatPrimary: 3, marchSizeBonus: 0, percentBonus: 0 },
      { level: 3, flatPrimary: 5, marchSizeBonus: 0, percentBonus: 0 },
      { level: 4, flatPrimary: 7, marchSizeBonus: 0, percentBonus: 0 },
      { level: 5, flatPrimary: 9, marchSizeBonus: 30, percentBonus: 0 },
      { level: 6, flatPrimary: 11, marchSizeBonus: 35, percentBonus: 0 },
      { level: 7, flatPrimary: 13, marchSizeBonus: 42, percentBonus: 0 },
      { level: 8, flatPrimary: 15, marchSizeBonus: 50, percentBonus: 5 },
      { level: 9, flatPrimary: 18, marchSizeBonus: 60, percentBonus: 10 },
      { level: 10, flatPrimary: 21, marchSizeBonus: 75, percentBonus: 15 },
      { level: 11, flatPrimary: 23, marchSizeBonus: 85, percentBonus: 20 },
      { level: 12, flatPrimary: 26, marchSizeBonus: 100, percentBonus: 30 },
    ],
  },
  {
    slotIndex: 5,
    code: "relic-mastery",
    name: {
      vi: "Ô 5 — Tinh Thông Bí Bảo (Relic Mastery)",
      en: "Slot 5 — Relic Mastery Rune",
    },
    shortName: {
      vi: "Ô 5: Tinh Thông Bí Bảo",
      en: "Slot 5: Relic Mastery",
    },
    primaryStatLabel: {
      vi: "Máu Bí Bảo Phẳng",
      en: "Flat Relic HP",
    },
    percentStatLabel: {
      vi: "% Máu Bí Bảo",
      en: "Relic HP %",
    },
    hasMarchSize: false,
    percentUnlockLevel: 8,
    tacticalRole: {
      vi: "Tăng độ bền hệ thống Bí Bảo và mở +5% Relic HP từ mốc Lv.8.",
      en: "Boosts Relic durability and unlocks +5% Relic HP starting at Lv.8.",
    },
    levels: [
      { level: 1, flatPrimary: 850, marchSizeBonus: 0, percentBonus: 0 },
      { level: 2, flatPrimary: 1_275, marchSizeBonus: 0, percentBonus: 0 },
      { level: 3, flatPrimary: 2_040, marchSizeBonus: 0, percentBonus: 0 },
      { level: 4, flatPrimary: 3_060, marchSizeBonus: 0, percentBonus: 0 },
      { level: 5, flatPrimary: 4_950, marchSizeBonus: 0, percentBonus: 0 },
      { level: 6, flatPrimary: 8_180, marchSizeBonus: 0, percentBonus: 0 },
      { level: 7, flatPrimary: 17_580, marchSizeBonus: 0, percentBonus: 0 },
      { level: 8, flatPrimary: 28_660, marchSizeBonus: 0, percentBonus: 5 },
      { level: 9, flatPrimary: 46_880, marchSizeBonus: 0, percentBonus: 10 },
      { level: 10, flatPrimary: 63_440, marchSizeBonus: 0, percentBonus: 15 },
      { level: 11, flatPrimary: 84_330, marchSizeBonus: 0, percentBonus: 20 },
      { level: 12, flatPrimary: 108_500, marchSizeBonus: 0, percentBonus: 30 },
    ],
  },
  {
    slotIndex: 6,
    code: "queue-attack",
    name: {
      vi: "Ô 6 — Công Đội Hình / Phá Giáp (Queue Attack)",
      en: "Slot 6 — Queue Attack Rune",
    },
    shortName: {
      vi: "Ô 6: Phá Giáp & Quân Số",
      en: "Slot 6: DEF Break & March",
    },
    primaryStatLabel: {
      vi: "Phòng Thủ",
      en: "Defense",
    },
    secondaryStatLabel: {
      vi: "Phá Giáp",
      en: "Defense Break",
    },
    percentStatLabel: {
      vi: "Quy Mô Hành Quân",
      en: "March Size",
    },
    hasMarchSize: true,
    percentUnlockLevel: 5,
    tacticalRole: {
      vi: "Ô Cổ Ngữ giá trị nhất: vừa tăng Phòng Thủ + Phá Giáp, vừa cấp +50 March Size ở Lv.5 (+250 ở Lv.12).",
      en: "Highest-value Rune slot: grants Defense + Defense Break plus +50 March Size at Lv.5 (+250 at Lv.12).",
    },
    levels: [
      { level: 1, flatPrimary: 600, flatSecondary: 769, marchSizeBonus: 0, percentBonus: 0 },
      { level: 2, flatPrimary: 1_200, flatSecondary: 1_538, marchSizeBonus: 0, percentBonus: 0 },
      { level: 3, flatPrimary: 1_800, flatSecondary: 2_307, marchSizeBonus: 0, percentBonus: 0 },
      { level: 4, flatPrimary: 2_400, flatSecondary: 3_076, marchSizeBonus: 0, percentBonus: 0 },
      { level: 5, flatPrimary: 3_000, flatSecondary: 3_845, marchSizeBonus: 50, percentBonus: 0 },
      { level: 6, flatPrimary: 3_600, flatSecondary: 4_614, marchSizeBonus: 80, percentBonus: 0 },
      { level: 7, flatPrimary: 4_200, flatSecondary: 5_383, marchSizeBonus: 116, percentBonus: 0 },
      { level: 8, flatPrimary: 4_800, flatSecondary: 6_922, marchSizeBonus: 150, percentBonus: 0 },
      { level: 9, flatPrimary: 5_400, flatSecondary: 8_461, marchSizeBonus: 180, percentBonus: 0 },
      { level: 10, flatPrimary: 6_000, flatSecondary: 10_000, marchSizeBonus: 210, percentBonus: 0 },
      { level: 11, flatPrimary: 6_600, flatSecondary: 12_000, marchSizeBonus: 230, percentBonus: 0 },
      { level: 12, flatPrimary: 7_200, flatSecondary: 14_000, marchSizeBonus: 250, percentBonus: 0 },
    ],
  },
] as const;

export const RUNE_FACTION_PRIORITIES: readonly RuneFactionPriorityProfile[] = [
  {
    id: "horde",
    name: {
      vi: "Bộ Tộc (Horde)",
      en: "Horde",
    },
    badge: {
      vi: "Ưu tiên Ô 6 & Ô 2 ➔ Ô 4 & Ô 1",
      en: "Priority: Slots 6 & 2 ➔ Slots 4 & 1",
    },
    priorityTier1Slots: [6, 2],
    priorityTier2Slots: [4, 1],
    priorityTier3Slots: [3, 5],
    rationale: {
      vi: "Bộ Tộc dồn sát thương tốc chiến dựa vào Phá Giáp (Ô 6), Công Tướng (Ô 2) và Công Binh Lính (Ô 4). Đẩy Ô 6 + Ô 2 chạm Lv.5/Lv.8 đầu tiên.",
      en: "Horde relies on burst physical tempo via Defense Break (Slot 6), Hero ATK (Slot 2), and Soldier ATK (Slot 4). Push Slots 6 & 2 to Lv.5/Lv.8 first.",
    },
  },
  {
    id: "league",
    name: {
      vi: "Liên Minh (League)",
      en: "League",
    },
    badge: {
      vi: "Ưu tiên Ô 2 & Ô 1 ➔ Ô 5 & Ô 6",
      en: "Priority: Slots 2 & 1 ➔ Slots 5 & 6",
    },
    priorityTier1Slots: [2, 1],
    priorityTier2Slots: [5, 6],
    priorityTier3Slots: [4, 3],
    rationale: {
      vi: "Liên Minh xoay quanh sát thương kỹ năng nổ (Ô 2 Công Tướng) và hệ số Lá Chắn theo Máu Tướng (Ô 1), kết hợp Tinh Thông Bí Bảo (Ô 5).",
      en: "League scales around burst skill damage (Slot 2 Hero ATK) and HP-based shields (Slot 1 Hero HP), paired with Relic Mastery (Slot 5).",
    },
  },
  {
    id: "nature",
    name: {
      vi: "Thiên Nhiên (Nature)",
      en: "Nature",
    },
    badge: {
      vi: "Ưu tiên Ô 1 & Ô 3 ➔ Ô 6 & Ô 2",
      en: "Priority: Slots 1 & 3 ➔ Slots 6 & 2",
    },
    priorityTier1Slots: [1, 3],
    priorityTier2Slots: [6, 2],
    priorityTier3Slots: [4, 5],
    rationale: {
      vi: "Vật triệu hồi và lượng hồi phục của Thiên Nhiên kế thừa trực tiếp từ Máu Tướng (Ô 1) và Máu Binh Lính (Ô 3).",
      en: "Nature summons and sustain scale directly with Hero HP (Slot 1) and Soldier HP (Slot 3).",
    },
  },
] as const;

export const RUNE_GAR_SCORING = {
  pointsPer2000DustOrStone: 600,
  dustBlockSize: 2_000,
  pointsPerArcaneCrystal: 1_200,
} as const;

export function getLv1CopiesForRuneLevel(level: RuneLevel): number {
  return Math.pow(3, level - 1);
}

export function getRuneLevelCostRow(level: RuneLevel): RuneLevelCostRow {
  return RUNE_LEVEL_COSTS[level - 1];
}

export function getRuneSlotDefinition(slotIndex: RuneSlotIndex): RuneSlotDefinition {
  return RUNE_SLOTS[slotIndex - 1];
}

export interface RuneFodderConversionResult {
  readonly randomFodderLv1Equivalent: number;
  readonly choiceChestLv1Equivalent: number;
  readonly totalLv1Equivalent: number;
}

export function convertOwnedRuneFodderToLv1Equivalent(
  fodder: RuneFodderInventory
): RuneFodderConversionResult {
  const randomFodderLv1Equivalent =
    Math.max(0, fodder.lv1Count) * 1 +
    Math.max(0, fodder.lv2Count) * 3 +
    Math.max(0, fodder.lv3Count) * 9 +
    Math.max(0, fodder.lv4Count) * 27 +
    Math.max(0, fodder.lv5Count) * 81;

  const choiceChestLv1Equivalent =
    Math.max(0, fodder.choiceChestLv1) * 1 +
    Math.max(0, fodder.choiceChestLv3) * 9 +
    Math.max(0, fodder.choiceChestLv5) * 81;

  return {
    randomFodderLv1Equivalent,
    choiceChestLv1Equivalent,
    totalLv1Equivalent: randomFodderLv1Equivalent + choiceChestLv1Equivalent,
  };
}

export function calculateGarDay2RunePoints(
  dustAmount: number,
  magicStoneAmount = 0,
  arcaneCrystalAmount = 0
): {
  readonly dustPoints: number;
  readonly magicStonePoints: number;
  readonly arcaneCrystalPoints: number;
  readonly totalPoints: number;
} {
  const safeDust = Math.max(0, dustAmount);
  const safeStones = Math.max(0, magicStoneAmount);
  const safeCrystals = Math.max(0, arcaneCrystalAmount);

  const dustPoints =
    Math.floor(safeDust / RUNE_GAR_SCORING.dustBlockSize) *
    RUNE_GAR_SCORING.pointsPer2000DustOrStone;
  const magicStonePoints =
    Math.floor(safeStones / RUNE_GAR_SCORING.dustBlockSize) *
    RUNE_GAR_SCORING.pointsPer2000DustOrStone;
  const arcaneCrystalPoints =
    safeCrystals * RUNE_GAR_SCORING.pointsPerArcaneCrystal;

  return {
    dustPoints,
    magicStonePoints,
    arcaneCrystalPoints,
    totalPoints: dustPoints + magicStonePoints + arcaneCrystalPoints,
  };
}

export interface SingleRuneUpgradeInput {
  readonly slotIndex: RuneSlotIndex;
  readonly fromLevel: RuneLevel;
  readonly toLevel: RuneLevel;
  readonly ownedDust: number;
  readonly ownedMagicStones: number;
  readonly ownedArcaneCrystals: number;
  readonly fodder: RuneFodderInventory;
}

export interface SingleRuneUpgradeResult {
  readonly slot: RuneSlotDefinition;
  readonly fromLevel: RuneLevel;
  readonly toLevel: RuneLevel;
  readonly fromStat: RuneSlotLevelStat;
  readonly toStat: RuneSlotLevelStat;
  readonly requiredAdditionalLv1Copies: number;
  readonly requiredDust: number;
  readonly fodderConversion: RuneFodderConversionResult;
  readonly deficitLv1CopiesAfterRandomOnly: number;
  readonly deficitLv1CopiesAfterChoiceChests: number;
  readonly choiceChestsUsedAsFinisherLv1Eq: number;
  readonly deficitDust: number;
  readonly surplusDust: number;
  readonly choiceChestWarning: boolean;
  readonly garDay2PointsFromRequiredDust: number;
  readonly garDay2PointsFromOwnedVault: number;
}

export function calculateSingleRuneUpgrade(
  input: SingleRuneUpgradeInput
): SingleRuneUpgradeResult {
  const slot = getRuneSlotDefinition(input.slotIndex);
  const safeFrom = input.fromLevel;
  const safeTo = Math.max(input.fromLevel, input.toLevel) as RuneLevel;

  const fromCost = getRuneLevelCostRow(safeFrom);
  const toCost = getRuneLevelCostRow(safeTo);
  const fromStat = slot.levels[safeFrom - 1];
  const toStat = slot.levels[safeTo - 1];

  const requiredAdditionalLv1Copies = Math.max(
    0,
    toCost.lv1CopiesPerRune - fromCost.lv1CopiesPerRune
  );
  const requiredDust = Math.max(
    0,
    toCost.cumulativeDustPerRune - fromCost.cumulativeDustPerRune
  );

  const fodderConversion = convertOwnedRuneFodderToLv1Equivalent(input.fodder);
  const deficitLv1CopiesAfterRandomOnly = Math.max(
    0,
    requiredAdditionalLv1Copies - fodderConversion.randomFodderLv1Equivalent
  );
  const deficitLv1CopiesAfterChoiceChests = Math.max(
    0,
    requiredAdditionalLv1Copies - fodderConversion.totalLv1Equivalent
  );
  const choiceChestsUsedAsFinisherLv1Eq = Math.min(
    deficitLv1CopiesAfterRandomOnly,
    fodderConversion.choiceChestLv1Equivalent
  );

  const safeOwnedDust = Math.max(0, input.ownedDust);
  const deficitDust = Math.max(0, requiredDust - safeOwnedDust);
  const surplusDust = Math.max(0, safeOwnedDust - requiredDust);

  const choiceChestWarning =
    safeTo <= 3 && fodderConversion.choiceChestLv1Equivalent > 0;

  const garRequired = calculateGarDay2RunePoints(requiredDust, 0, 0);
  const garOwned = calculateGarDay2RunePoints(
    safeOwnedDust,
    input.ownedMagicStones,
    input.ownedArcaneCrystals
  );

  return {
    slot,
    fromLevel: safeFrom,
    toLevel: safeTo,
    fromStat,
    toStat,
    requiredAdditionalLv1Copies,
    requiredDust,
    fodderConversion,
    deficitLv1CopiesAfterRandomOnly,
    deficitLv1CopiesAfterChoiceChests,
    choiceChestsUsedAsFinisherLv1Eq,
    deficitDust,
    surplusDust,
    choiceChestWarning,
    garDay2PointsFromRequiredDust: garRequired.totalPoints,
    garDay2PointsFromOwnedVault: garOwned.totalPoints,
  };
}

export interface RuneBoardSlotTarget {
  readonly slotIndex: RuneSlotIndex;
  readonly fromLevel: RuneLevel;
  readonly toLevel: RuneLevel;
}

export interface RuneBoardPlanInput {
  readonly faction: RuneFactionId;
  readonly slots: readonly RuneBoardSlotTarget[];
  readonly ownedDust: number;
  readonly ownedMagicStones: number;
  readonly ownedArcaneCrystals: number;
  readonly fodder: RuneFodderInventory;
}

export interface RuneBoardAggregatedStats {
  readonly flatHeroHp: number;
  readonly heroHpPercent: number;
  readonly flatHeroAttack: number;
  readonly heroAttackPercent: number;
  readonly flatSoldierHp: number;
  readonly soldierHpPercent: number;
  readonly flatSoldierAttack: number;
  readonly soldierAttackPercent: number;
  readonly flatRelicHp: number;
  readonly relicHpPercent: number;
  readonly flatDefense: number;
  readonly flatDefenseBreak: number;
  readonly totalMarchSize: number;
}

export interface RuneBoardPlanResult {
  readonly factionProfile: RuneFactionPriorityProfile;
  readonly slotBreakdowns: readonly {
    readonly slot: RuneSlotDefinition;
    readonly fromLevel: RuneLevel;
    readonly toLevel: RuneLevel;
    readonly requiredAdditionalLv1Copies: number;
    readonly requiredDust: number;
    readonly priorityTier: 1 | 2 | 3;
  }[];
  readonly totalRequiredAdditionalLv1Copies: number;
  readonly totalRequiredDust: number;
  readonly fodderConversion: RuneFodderConversionResult;
  readonly deficitLv1CopiesAfterRandomOnly: number;
  readonly deficitLv1CopiesAfterChoiceChests: number;
  readonly choiceChestsUsedAsFinisherLv1Eq: number;
  readonly deficitDust: number;
  readonly surplusDust: number;
  readonly currentSummary: RuneBoardAggregatedStats;
  readonly targetSummary: RuneBoardAggregatedStats;
  readonly slotsReachingLv5Count: number;
  readonly slotsReachingLv8Count: number;
  readonly choiceChestWarning: boolean;
  readonly garDay2PointsFromRequiredDust: number;
  readonly garDay2PointsFromOwnedVault: number;
}

function aggregateBoardStats(
  levelsBySlot: ReadonlyMap<RuneSlotIndex, RuneLevel>
): RuneBoardAggregatedStats {
  const s1 = RUNE_SLOTS[0].levels[(levelsBySlot.get(1) ?? 1) - 1];
  const s2 = RUNE_SLOTS[1].levels[(levelsBySlot.get(2) ?? 1) - 1];
  const s3 = RUNE_SLOTS[2].levels[(levelsBySlot.get(3) ?? 1) - 1];
  const s4 = RUNE_SLOTS[3].levels[(levelsBySlot.get(4) ?? 1) - 1];
  const s5 = RUNE_SLOTS[4].levels[(levelsBySlot.get(5) ?? 1) - 1];
  const s6 = RUNE_SLOTS[5].levels[(levelsBySlot.get(6) ?? 1) - 1];

  return {
    flatHeroHp: s1.flatPrimary,
    heroHpPercent: s1.percentBonus,
    flatHeroAttack: s2.flatPrimary,
    heroAttackPercent: s2.percentBonus,
    flatSoldierHp: s3.flatPrimary,
    soldierHpPercent: s3.percentBonus,
    flatSoldierAttack: s4.flatPrimary,
    soldierAttackPercent: s4.percentBonus,
    flatRelicHp: s5.flatPrimary,
    relicHpPercent: s5.percentBonus,
    flatDefense: s6.flatPrimary,
    flatDefenseBreak: s6.flatSecondary ?? 0,
    totalMarchSize: s3.marchSizeBonus + s4.marchSizeBonus + s6.marchSizeBonus,
  };
}

export function calculateRuneBoardPlan(
  input: RuneBoardPlanInput
): RuneBoardPlanResult {
  const factionProfile =
    RUNE_FACTION_PRIORITIES.find((f) => f.id === input.faction) ??
    RUNE_FACTION_PRIORITIES[0];

  const currentLevelsMap = new Map<RuneSlotIndex, RuneLevel>();
  const targetLevelsMap = new Map<RuneSlotIndex, RuneLevel>();

  let totalRequiredAdditionalLv1Copies = 0;
  let totalRequiredDust = 0;
  let slotsReachingLv5Count = 0;
  let slotsReachingLv8Count = 0;
  let maxTargetLevel: RuneLevel = 1;

  const slotBreakdowns = RUNE_SLOTS.map((slotDef) => {
    const entry = input.slots.find((s) => s.slotIndex === slotDef.slotIndex);
    const fromLevel = entry?.fromLevel ?? 1;
    const toLevel = Math.max(fromLevel, entry?.toLevel ?? 5) as RuneLevel;

    currentLevelsMap.set(slotDef.slotIndex, fromLevel);
    targetLevelsMap.set(slotDef.slotIndex, toLevel);

    if (toLevel >= 5) slotsReachingLv5Count += 1;
    if (toLevel >= 8) slotsReachingLv8Count += 1;
    if (toLevel > maxTargetLevel) maxTargetLevel = toLevel;

    const fromCost = getRuneLevelCostRow(fromLevel);
    const toCost = getRuneLevelCostRow(toLevel);

    const requiredAdditionalLv1Copies = Math.max(
      0,
      toCost.lv1CopiesPerRune - fromCost.lv1CopiesPerRune
    );
    const requiredDust = Math.max(
      0,
      toCost.cumulativeDustPerRune - fromCost.cumulativeDustPerRune
    );

    totalRequiredAdditionalLv1Copies += requiredAdditionalLv1Copies;
    totalRequiredDust += requiredDust;

    const priorityTier: 1 | 2 | 3 = factionProfile.priorityTier1Slots.includes(
      slotDef.slotIndex
    )
      ? 1
      : factionProfile.priorityTier2Slots.includes(slotDef.slotIndex)
        ? 2
        : 3;

    return {
      slot: slotDef,
      fromLevel,
      toLevel,
      requiredAdditionalLv1Copies,
      requiredDust,
      priorityTier,
    };
  });

  const fodderConversion = convertOwnedRuneFodderToLv1Equivalent(input.fodder);
  const deficitLv1CopiesAfterRandomOnly = Math.max(
    0,
    totalRequiredAdditionalLv1Copies - fodderConversion.randomFodderLv1Equivalent
  );
  const deficitLv1CopiesAfterChoiceChests = Math.max(
    0,
    totalRequiredAdditionalLv1Copies - fodderConversion.totalLv1Equivalent
  );
  const choiceChestsUsedAsFinisherLv1Eq = Math.min(
    deficitLv1CopiesAfterRandomOnly,
    fodderConversion.choiceChestLv1Equivalent
  );

  const safeOwnedDust = Math.max(0, input.ownedDust);
  const deficitDust = Math.max(0, totalRequiredDust - safeOwnedDust);
  const surplusDust = Math.max(0, safeOwnedDust - totalRequiredDust);

  const currentSummary = aggregateBoardStats(currentLevelsMap);
  const targetSummary = aggregateBoardStats(targetLevelsMap);

  const choiceChestWarning =
    maxTargetLevel <= 3 && fodderConversion.choiceChestLv1Equivalent > 0;

  const garRequired = calculateGarDay2RunePoints(totalRequiredDust, 0, 0);
  const garOwned = calculateGarDay2RunePoints(
    safeOwnedDust,
    input.ownedMagicStones,
    input.ownedArcaneCrystals
  );

  return {
    factionProfile,
    slotBreakdowns,
    totalRequiredAdditionalLv1Copies,
    totalRequiredDust,
    fodderConversion,
    deficitLv1CopiesAfterRandomOnly,
    deficitLv1CopiesAfterChoiceChests,
    choiceChestsUsedAsFinisherLv1Eq,
    deficitDust,
    surplusDust,
    currentSummary,
    targetSummary,
    slotsReachingLv5Count,
    slotsReachingLv8Count,
    choiceChestWarning,
    garDay2PointsFromRequiredDust: garRequired.totalPoints,
    garDay2PointsFromOwnedVault: garOwned.totalPoints,
  };
}

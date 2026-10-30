import { CALCULATOR_MATERIALS } from "./registry";
import type { CalculatorLocale, CalculatorMaterialRef } from "./types";

/**
 * 2.2 Cấp Phe Phái (Faction Level Lv.1 ➔ Lv.80) — Quantitative SSoT Engine
 * Nguồn dữ liệu gốc:
 * - docs/06-game-guides/03-data-tables-and-mechanics/topheroes-tables-max-raw-dataset.md (Tab Faction lvl, dòng 6891–7868)
 * - tophub-web/src/content/guides/groups/group-8/8.4-master-data-tables.ts (Bảng 4.1)
 */

export const FACTION_MIN_LEVEL = 1;
export const FACTION_AURA_CORE_MAX_LEVEL = 40;
export const FACTION_SSOT_MEAT_MAX_LEVEL = 50;
export const FACTION_MAX_LEVEL = 80;

export type FactionId = "league" | "horde" | "nature";
export type FactionShardRarity = "legendary" | "epic";
export type FactionCalculationMode = "ssot_verified" | "extended_s1";

export interface FactionConfig {
  readonly id: FactionId;
  readonly name: Record<CalculatorLocale, string>;
  readonly emblemNote: Record<CalculatorLocale, string>;
  readonly defaultHeroIconPath: string;
  readonly soulStoneMaterial: CalculatorMaterialRef;
}

export const FACTION_CONFIGS: Record<FactionId, FactionConfig> = {
  league: {
    id: "league",
    name: { vi: "Liên Minh (League)", en: "League" },
    emblemNote: {
      vi: "Phe Liên Minh • Khắc chế Thiên Nhiên (+20% sát thương khắc hệ)",
      en: "League Faction • Counters Nature (+20% counter damage)",
    },
    defaultHeroIconPath: "/images/heroes/icon_paragon.webp",
    soulStoneMaterial: CALCULATOR_MATERIALS.leagueSoulStone,
  },
  horde: {
    id: "horde",
    name: { vi: "Bộ Tộc (Horde)", en: "Horde" },
    emblemNote: {
      vi: "Phe Bộ Tộc • Khắc chế Liên Minh (+20% sát thương khắc hệ)",
      en: "Horde Faction • Counters League (+20% counter damage)",
    },
    defaultHeroIconPath: "/images/heroes/icon_desert_prince.webp",
    soulStoneMaterial: CALCULATOR_MATERIALS.hordeSoulStone,
  },
  nature: {
    id: "nature",
    name: { vi: "Thiên Nhiên (Nature)", en: "Nature" },
    emblemNote: {
      vi: "Phe Thiên Nhiên • Khắc chế Bộ Tộc (+20% sát thương khắc hệ)",
      en: "Nature Faction • Counters Horde (+20% counter damage)",
    },
    defaultHeroIconPath: "/images/heroes/icon_tidecaller.webp",
    soulStoneMaterial: CALCULATOR_MATERIALS.natureSoulStone,
  },
};

export interface FactionLevelRawSpec {
  readonly level: number;
  readonly bars: number;
  /** Lượng Thịt mỗi vạch tính theo đơn vị Nghìn (1K = 1,000 Thịt = 0.001M Thịt) */
  readonly ssotMeatPerBarK: number;
  readonly ssotShards: number;
  readonly ssotAtkPerBar: number;
  readonly ssotHpPerBar: number;
  readonly ssotAuraQueueHpPct: number;
  /** Dữ liệu mở rộng Season 1+ cho các dòng WIP (Lv.41–80) */
  readonly extendedMeatPerBarK: number;
  readonly extendedShards: number;
  readonly extendedAtkPerBar: number;
  readonly extendedHpPerBar: number;
  readonly extendedAuraQueueHpPct: number;
  readonly isSsotFullyPopulated: boolean;
}

export interface FactionLevelRow {
  readonly level: number;
  readonly bars: number;
  readonly meatPerBarK: number;
  readonly totalMeatK: number;
  readonly shards: number;
  readonly atkPerBar: number;
  readonly totalAtk: number;
  readonly hpPerBar: number;
  readonly totalHp: number;
  readonly auraQueueHpPct: number;
  readonly isSsotFullyPopulated: boolean;
}

/**
 * 40 cấp đầu (Lv.1–40): Đầy đủ 100% trên bảng gốc SSoT
 *Tổng Lv.1–40 = 692,162K (692.162M) Thịt, 1,237 Mảnh, +4,908 ATK, +96,200 HP, +20% Queue HP
 */
const CORE_40_SPECS: ReadonlyArray<{
  readonly level: number;
  readonly bars: number;
  readonly meatPerBarK: number;
  readonly shards: number;
  readonly atkPerBar: number;
  readonly hpPerBar: number;
  readonly auraQueueHpPct: number;
}> = [
  { level: 1, bars: 1, meatPerBarK: 700, shards: 1, atkPerBar: 8, hpPerBar: 200, auraQueueHpPct: 0 },
  { level: 2, bars: 1, meatPerBarK: 702, shards: 2, atkPerBar: 8, hpPerBar: 200, auraQueueHpPct: 0 },
  { level: 3, bars: 2, meatPerBarK: 705, shards: 4, atkPerBar: 8, hpPerBar: 200, auraQueueHpPct: 0 },
  { level: 4, bars: 2, meatPerBarK: 709, shards: 8, atkPerBar: 8, hpPerBar: 200, auraQueueHpPct: 0 },
  { level: 5, bars: 3, meatPerBarK: 718, shards: 4, atkPerBar: 8, hpPerBar: 200, auraQueueHpPct: 0 },
  { level: 6, bars: 5, meatPerBarK: 722, shards: 8, atkPerBar: 8, hpPerBar: 200, auraQueueHpPct: 0 },
  { level: 7, bars: 5, meatPerBarK: 732, shards: 8, atkPerBar: 8, hpPerBar: 200, auraQueueHpPct: 0 },
  { level: 8, bars: 5, meatPerBarK: 742, shards: 12, atkPerBar: 8, hpPerBar: 200, auraQueueHpPct: 0 },
  { level: 9, bars: 7, meatPerBarK: 754, shards: 12, atkPerBar: 8, hpPerBar: 200, auraQueueHpPct: 0 },
  { level: 10, bars: 10, meatPerBarK: 771, shards: 16, atkPerBar: 10, hpPerBar: 0, auraQueueHpPct: 5 },
  { level: 11, bars: 10, meatPerBarK: 791, shards: 16, atkPerBar: 10, hpPerBar: 0, auraQueueHpPct: 0 },
  { level: 12, bars: 10, meatPerBarK: 824, shards: 20, atkPerBar: 10, hpPerBar: 0, auraQueueHpPct: 0 },
  { level: 13, bars: 10, meatPerBarK: 864, shards: 20, atkPerBar: 10, hpPerBar: 0, auraQueueHpPct: 0 },
  { level: 14, bars: 10, meatPerBarK: 904, shards: 20, atkPerBar: 10, hpPerBar: 0, auraQueueHpPct: 0 },
  { level: 15, bars: 10, meatPerBarK: 944, shards: 20, atkPerBar: 10, hpPerBar: 0, auraQueueHpPct: 0 },
  { level: 16, bars: 10, meatPerBarK: 978, shards: 24, atkPerBar: 10, hpPerBar: 0, auraQueueHpPct: 0 },
  { level: 17, bars: 12, meatPerBarK: 1_024, shards: 24, atkPerBar: 10, hpPerBar: 0, auraQueueHpPct: 0 },
  { level: 18, bars: 12, meatPerBarK: 1_072, shards: 24, atkPerBar: 10, hpPerBar: 0, auraQueueHpPct: 0 },
  { level: 19, bars: 12, meatPerBarK: 1_128, shards: 24, atkPerBar: 10, hpPerBar: 0, auraQueueHpPct: 0 },
  { level: 20, bars: 12, meatPerBarK: 1_222, shards: 30, atkPerBar: 12, hpPerBar: 300, auraQueueHpPct: 5 },
  { level: 21, bars: 12, meatPerBarK: 1_318, shards: 30, atkPerBar: 12, hpPerBar: 300, auraQueueHpPct: 0 },
  { level: 22, bars: 12, meatPerBarK: 1_414, shards: 30, atkPerBar: 12, hpPerBar: 300, auraQueueHpPct: 0 },
  { level: 23, bars: 12, meatPerBarK: 1_510, shards: 30, atkPerBar: 12, hpPerBar: 300, auraQueueHpPct: 0 },
  { level: 24, bars: 12, meatPerBarK: 1_606, shards: 30, atkPerBar: 12, hpPerBar: 300, auraQueueHpPct: 0 },
  { level: 25, bars: 12, meatPerBarK: 1_703, shards: 40, atkPerBar: 12, hpPerBar: 300, auraQueueHpPct: 0 },
  { level: 26, bars: 12, meatPerBarK: 1_798, shards: 40, atkPerBar: 12, hpPerBar: 300, auraQueueHpPct: 0 },
  { level: 27, bars: 12, meatPerBarK: 1_894, shards: 40, atkPerBar: 12, hpPerBar: 300, auraQueueHpPct: 0 },
  { level: 28, bars: 12, meatPerBarK: 1_989, shards: 40, atkPerBar: 12, hpPerBar: 300, auraQueueHpPct: 0 },
  { level: 29, bars: 12, meatPerBarK: 2_093, shards: 40, atkPerBar: 12, hpPerBar: 300, auraQueueHpPct: 0 },
  { level: 30, bars: 12, meatPerBarK: 2_214, shards: 50, atkPerBar: 18, hpPerBar: 450, auraQueueHpPct: 5 },
  { level: 31, bars: 12, meatPerBarK: 2_333, shards: 50, atkPerBar: 18, hpPerBar: 450, auraQueueHpPct: 0 },
  { level: 32, bars: 12, meatPerBarK: 2_454, shards: 50, atkPerBar: 18, hpPerBar: 450, auraQueueHpPct: 0 },
  { level: 33, bars: 12, meatPerBarK: 2_573, shards: 50, atkPerBar: 18, hpPerBar: 450, auraQueueHpPct: 0 },
  { level: 34, bars: 12, meatPerBarK: 2_695, shards: 50, atkPerBar: 18, hpPerBar: 450, auraQueueHpPct: 0 },
  { level: 35, bars: 12, meatPerBarK: 2_815, shards: 60, atkPerBar: 18, hpPerBar: 450, auraQueueHpPct: 0 },
  { level: 36, bars: 12, meatPerBarK: 2_935, shards: 60, atkPerBar: 18, hpPerBar: 450, auraQueueHpPct: 0 },
  { level: 37, bars: 12, meatPerBarK: 3_055, shards: 60, atkPerBar: 18, hpPerBar: 450, auraQueueHpPct: 0 },
  { level: 38, bars: 12, meatPerBarK: 3_175, shards: 60, atkPerBar: 18, hpPerBar: 450, auraQueueHpPct: 0 },
  { level: 39, bars: 12, meatPerBarK: 3_295, shards: 60, atkPerBar: 18, hpPerBar: 450, auraQueueHpPct: 0 },
  { level: 40, bars: 12, meatPerBarK: 3_415, shards: 70, atkPerBar: 0, hpPerBar: 0, auraQueueHpPct: 5 },
] as const;

function getExtendedShardsForLevel(level: number): number {
  if (level <= 44) return 70;
  if (level <= 49) return 80;
  if (level <= 54) return 90;
  if (level <= 59) return 100;
  if (level <= 64) return 110;
  if (level <= 69) return 120;
  if (level <= 74) return 130;
  if (level <= 79) return 140;
  return 150;
}

function getExtendedStatsPerBar(level: number): {
  readonly atkPerBar: number;
  readonly hpPerBar: number;
} {
  if (level % 10 === 0) {
    return { atkPerBar: 0, hpPerBar: 0 };
  }
  if (level <= 49) return { atkPerBar: 24, hpPerBar: 600 };
  if (level <= 59) return { atkPerBar: 30, hpPerBar: 750 };
  if (level <= 69) return { atkPerBar: 36, hpPerBar: 900 };
  return { atkPerBar: 42, hpPerBar: 1_050 };
}

export const FACTION_LEVEL_TABLE: readonly FactionLevelRawSpec[] =
  Array.from({ length: FACTION_MAX_LEVEL }, (_, index) => {
    const level = index + 1;
    if (level <= 40) {
      const c = CORE_40_SPECS[index]!;
      return {
        level,
        bars: c.bars,
        ssotMeatPerBarK: c.meatPerBarK,
        ssotShards: c.shards,
        ssotAtkPerBar: c.atkPerBar,
        ssotHpPerBar: c.hpPerBar,
        ssotAuraQueueHpPct: c.auraQueueHpPct,
        extendedMeatPerBarK: c.meatPerBarK,
        extendedShards: c.shards,
        extendedAtkPerBar: c.atkPerBar,
        extendedHpPerBar: c.hpPerBar,
        extendedAuraQueueHpPct: c.auraQueueHpPct,
        isSsotFullyPopulated: true,
      };
    }

    // Từ Lv.41 trở đi: Meat/Bar tăng tuyến tính +120K (+0.120M) mỗi cấp từ mốc 3,415K ở Lv.40
    const linearMeatPerBarK = 3_415 + (level - 40) * 120;
    const extStats = getExtendedStatsPerBar(level);
    const extShards = getExtendedShardsForLevel(level);
    const extAura = level % 10 === 0 ? 5 : 0;

    // Trên bảng gốc SSoT: Lv.41–50 có cột Thịt (42.420M -> 55.380M) và Lv.41 có 70 Shards; Lv.51–80 để trống
    const ssotMeatPerBarK = level <= 50 ? linearMeatPerBarK : 0;
    const ssotShards = level === 41 ? 70 : 0;

    return {
      level,
      bars: 12,
      ssotMeatPerBarK,
      ssotShards,
      ssotAtkPerBar: 0,
      ssotHpPerBar: 0,
      ssotAuraQueueHpPct: 0,
      extendedMeatPerBarK: linearMeatPerBarK,
      extendedShards: extShards,
      extendedAtkPerBar: extStats.atkPerBar,
      extendedHpPerBar: extStats.hpPerBar,
      extendedAuraQueueHpPct: extAura,
      isSsotFullyPopulated: false,
    };
  });

export function clampFactionLevel(level: number): number {
  if (!Number.isFinite(level)) return FACTION_MIN_LEVEL;
  const rounded = Math.round(level);
  if (rounded < FACTION_MIN_LEVEL) return FACTION_MIN_LEVEL;
  if (rounded > FACTION_MAX_LEVEL) return FACTION_MAX_LEVEL;
  return rounded;
}

export function getFactionLevelRow(
  level: number,
  mode: FactionCalculationMode = "ssot_verified"
): FactionLevelRow {
  const clamped = clampFactionLevel(level);
  const spec = FACTION_LEVEL_TABLE[clamped - 1] ?? FACTION_LEVEL_TABLE[0]!;
  const isExtended = mode === "extended_s1";

  const meatPerBarK = isExtended
    ? spec.extendedMeatPerBarK
    : spec.ssotMeatPerBarK;
  const shards = isExtended ? spec.extendedShards : spec.ssotShards;
  const atkPerBar = isExtended ? spec.extendedAtkPerBar : spec.ssotAtkPerBar;
  const hpPerBar = isExtended ? spec.extendedHpPerBar : spec.ssotHpPerBar;
  const auraQueueHpPct = isExtended
    ? spec.extendedAuraQueueHpPct
    : spec.ssotAuraQueueHpPct;

  return {
    level: spec.level,
    bars: spec.bars,
    meatPerBarK,
    totalMeatK: meatPerBarK * spec.bars,
    shards,
    atkPerBar,
    totalAtk: atkPerBar * spec.bars,
    hpPerBar,
    totalHp: hpPerBar * spec.bars,
    auraQueueHpPct,
    isSsotFullyPopulated: spec.isSsotFullyPopulated,
  };
}

export function clampFactionBarsForLevel(level: number, bars: number): number {
  const row = getFactionLevelRow(level, "ssot_verified");
  if (!Number.isFinite(bars)) return 0;
  const rounded = Math.round(bars);
  if (rounded < 0) return 0;
  if (rounded > row.bars) return row.bars;
  return rounded;
}

export interface FactionProgressPoint {
  readonly level: number;
  readonly completedBars: number;
}

export interface FactionMilestonePreset {
  readonly id:
    | "base"
    | "lv10"
    | "lv20"
    | "lv30"
    | "lv40"
    | "lv50"
    | "lv80";
  readonly shortLabel: Record<CalculatorLocale, string>;
  readonly point: FactionProgressPoint;
  readonly isAuraMilestone?: boolean;
}

export const FACTION_MILESTONE_PRESETS: readonly FactionMilestonePreset[] = [
  {
    id: "base",
    shortLabel: { vi: "Khởi đầu (0)", en: "Base (0)" },
    point: { level: 1, completedBars: 0 },
  },
  {
    id: "lv10",
    shortLabel: { vi: "★ Lv.10 (+5% HP)", en: "★ Lv.10 (+5% HP)" },
    point: { level: 10, completedBars: 10 },
    isAuraMilestone: true,
  },
  {
    id: "lv20",
    shortLabel: { vi: "★ Lv.20 (+10% HP)", en: "★ Lv.20 (+10% HP)" },
    point: { level: 20, completedBars: 12 },
    isAuraMilestone: true,
  },
  {
    id: "lv30",
    shortLabel: { vi: "★ Lv.30 (+15% HP)", en: "★ Lv.30 (+15% HP)" },
    point: { level: 30, completedBars: 12 },
    isAuraMilestone: true,
  },
  {
    id: "lv40",
    shortLabel: { vi: "★ Lv.40 (+20% HP)", en: "★ Lv.40 (+20% HP)" },
    point: { level: 40, completedBars: 12 },
    isAuraMilestone: true,
  },
  {
    id: "lv50",
    shortLabel: { vi: "Lv.50 (Bảng 8.4)", en: "Lv.50 (Table 8.4)" },
    point: { level: 50, completedBars: 12 },
  },
  {
    id: "lv80",
    shortLabel: { vi: "Max Lv.80 (S1+)", en: "Max Lv.80 (S1+)" },
    point: { level: 80, completedBars: 12 },
  },
] as const;

export interface CumulativeFactionState {
  readonly cumulativeBars: number;
  readonly cumulativeMeatK: number;
  readonly exactMeat: number;
  readonly cumulativeShards: number;
  readonly cumulativeAtk: number;
  readonly cumulativeHp: number;
  readonly cumulativeAuraQueueHpPct: number;
}

/**
 * Tính tổng tài nguyên & chỉ số tích lũy từ gốc (Lv.1 • 0 vạch) đến điểm (level, completedBars).
 * Bảo toàn tính chất Bắc cầu (Transitivity):
 * getCumulativeFactionState({ level: L, completedBars: bars(L) }) === getCumulativeFactionState({ level: L + 1, completedBars: 0 })
 */
export function getCumulativeFactionState(
  point: FactionProgressPoint,
  mode: FactionCalculationMode = "ssot_verified"
): CumulativeFactionState {
  const level = clampFactionLevel(point.level);
  const completedBars = clampFactionBarsForLevel(level, point.completedBars);

  let cumulativeBars = 0;
  let cumulativeMeatK = 0;
  let cumulativeShards = 0;
  let cumulativeAtk = 0;
  let cumulativeHp = 0;
  let cumulativeAuraQueueHpPct = 0;

  for (let lv = 1; lv < level; lv += 1) {
    const row = getFactionLevelRow(lv, mode);
    cumulativeBars += row.bars;
    cumulativeMeatK += row.totalMeatK;
    cumulativeShards += row.shards;
    cumulativeAtk += row.totalAtk;
    cumulativeHp += row.totalHp;
    cumulativeAuraQueueHpPct += row.auraQueueHpPct;
  }

  const currentRow = getFactionLevelRow(level, mode);
  cumulativeBars += completedBars;
  cumulativeMeatK += completedBars * currentRow.meatPerBarK;
  cumulativeAtk += completedBars * currentRow.atkPerBar;
  cumulativeHp += completedBars * currentRow.hpPerBar;

  if (completedBars >= currentRow.bars) {
    cumulativeShards += currentRow.shards;
    cumulativeAuraQueueHpPct += currentRow.auraQueueHpPct;
  }

  return {
    cumulativeBars,
    cumulativeMeatK,
    exactMeat: cumulativeMeatK * 1_000,
    cumulativeShards,
    cumulativeAtk,
    cumulativeHp,
    cumulativeAuraQueueHpPct,
  };
}

export interface FactionDecadeBreakdownItem {
  readonly bracketLabel: Record<CalculatorLocale, string>;
  readonly startLevel: number;
  readonly endLevel: number;
  readonly barsInBracket: number;
  readonly meatRequired: number;
  readonly shardsRequired: number;
  readonly atkGained: number;
  readonly hpGained: number;
  readonly auraGainedPct: number;
}

export interface FactionLevelUpgradeInput {
  readonly faction: FactionId;
  readonly shardRarity: FactionShardRarity;
  readonly mode: FactionCalculationMode;
  readonly fromPoint: FactionProgressPoint;
  readonly toPoint: FactionProgressPoint;
  readonly ownedMeat?: number;
  readonly ownedShards?: number;
}

export interface FactionLevelUpgradeResult {
  readonly faction: FactionId;
  readonly factionConfig: FactionConfig;
  readonly shardRarity: FactionShardRarity;
  readonly mode: FactionCalculationMode;
  readonly isInvalidRange: boolean;
  readonly fromState: CumulativeFactionState;
  readonly toState: CumulativeFactionState;
  readonly requiredBars: number;
  readonly requiredMeatK: number;
  readonly requiredMeat: number;
  readonly requiredShards: number;
  readonly gainedAtk: number;
  readonly gainedHp: number;
  readonly startAuraQueueHpPct: number;
  readonly targetAuraQueueHpPct: number;
  readonly gainedAuraQueueHpPct: number;
  readonly ownedMeat: number;
  readonly missingMeat: number;
  readonly ownedShards: number;
  readonly missingShards: number;
  readonly nearAuraMilestoneLevel: number | null;
  readonly includesWipLevels: boolean;
  readonly meatMaterial: CalculatorMaterialRef;
  readonly shardMaterial: CalculatorMaterialRef;
  readonly decadeBreakdown: readonly FactionDecadeBreakdownItem[];
}

export function calculateFactionLevelUpgrade(
  input: FactionLevelUpgradeInput
): FactionLevelUpgradeResult {
  const factionConfig = FACTION_CONFIGS[input.faction] ?? FACTION_CONFIGS.horde;
  const fromState = getCumulativeFactionState(input.fromPoint, input.mode);
  const toState = getCumulativeFactionState(input.toPoint, input.mode);

  const isInvalidRange = toState.cumulativeBars <= fromState.cumulativeBars;

  const requiredBars = isInvalidRange
    ? 0
    : toState.cumulativeBars - fromState.cumulativeBars;
  const requiredMeatK = isInvalidRange
    ? 0
    : toState.cumulativeMeatK - fromState.cumulativeMeatK;
  const requiredMeat = requiredMeatK * 1_000;
  const requiredShards = isInvalidRange
    ? 0
    : toState.cumulativeShards - fromState.cumulativeShards;
  const gainedAtk = isInvalidRange
    ? 0
    : toState.cumulativeAtk - fromState.cumulativeAtk;
  const gainedHp = isInvalidRange
    ? 0
    : toState.cumulativeHp - fromState.cumulativeHp;
  const gainedAuraQueueHpPct = isInvalidRange
    ? 0
    : toState.cumulativeAuraQueueHpPct - fromState.cumulativeAuraQueueHpPct;

  const ownedMeat = Math.max(
    0,
    Math.floor(Number.isFinite(input.ownedMeat) ? input.ownedMeat! : 0)
  );
  const ownedShards = Math.max(
    0,
    Math.floor(Number.isFinite(input.ownedShards) ? input.ownedShards! : 0)
  );

  const missingMeat = Math.max(0, requiredMeat - ownedMeat);
  const missingShards = Math.max(0, requiredShards - ownedShards);

  // Kiểm tra nếu mục tiêu đang dừng ở Lv.7–9, 17–19, 27–29, 37–39 (hoặc chưa hoàn tất cấp mốc 10/20/30/40)
  const clampedToLv = clampFactionLevel(input.toPoint.level);
  const toRow = getFactionLevelRow(clampedToLv, input.mode);
  const clampedToBars = clampFactionBarsForLevel(
    clampedToLv,
    input.toPoint.completedBars
  );

  let nearAuraMilestoneLevel: number | null = null;
  if (!isInvalidRange && clampedToLv <= FACTION_AURA_CORE_MAX_LEVEL) {
    const nextTen = Math.ceil(clampedToLv / 10) * 10;
    if (
      nextTen >= 10 &&
      nextTen <= 40 &&
      (clampedToLv < nextTen && nextTen - clampedToLv <= 3
        ? true
        : clampedToLv === nextTen && clampedToBars < toRow.bars)
    ) {
      nearAuraMilestoneLevel = nextTen;
    }
  }

  const includesWipLevels =
    clampedToLv > FACTION_AURA_CORE_MAX_LEVEL &&
    (clampedToLv > 41 || clampedToBars > 0);

  const shardMaterial =
    input.shardRarity === "epic"
      ? CALCULATOR_MATERIALS.epicUniversalHeroShard
      : CALCULATOR_MATERIALS.legendaryUniversalHeroShard;

  const brackets = [
    { start: 1, end: 10 },
    { start: 11, end: 20 },
    { start: 21, end: 30 },
    { start: 31, end: 40 },
    { start: 41, end: 50 },
    { start: 51, end: 60 },
    { start: 61, end: 70 },
    { start: 71, end: 80 },
  ] as const;

  const decadeBreakdown: FactionDecadeBreakdownItem[] = [];
  for (const b of brackets) {
    const bracketStartState = getCumulativeFactionState(
      { level: b.start, completedBars: 0 },
      input.mode
    );
    const endRow = getFactionLevelRow(b.end, input.mode);
    const bracketEndState = getCumulativeFactionState(
      { level: b.end, completedBars: endRow.bars },
      input.mode
    );

    const effStartBars = Math.max(
      fromState.cumulativeBars,
      bracketStartState.cumulativeBars
    );
    const effEndBars = Math.min(
      toState.cumulativeBars,
      bracketEndState.cumulativeBars
    );

    if (!isInvalidRange && effEndBars > effStartBars) {
      // Tính đóng góp của các cấp nằm trong cụm 10 cấp này
      let barsInBracket = 0;
      let meatKInBracket = 0;
      let shardsInBracket = 0;
      let atkInBracket = 0;
      let hpInBracket = 0;
      let auraInBracket = 0;

      for (let lv = b.start; lv <= b.end; lv += 1) {
        const r = getFactionLevelRow(lv, input.mode);
        const lvStart = getCumulativeFactionState(
          { level: lv, completedBars: 0 },
          input.mode
        );
        const lvEnd = getCumulativeFactionState(
          { level: lv, completedBars: r.bars },
          input.mode
        );
        const sBar = Math.max(fromState.cumulativeBars, lvStart.cumulativeBars);
        const eBar = Math.min(toState.cumulativeBars, lvEnd.cumulativeBars);
        if (eBar > sBar) {
          const activeBars = eBar - sBar;
          barsInBracket += activeBars;
          meatKInBracket += activeBars * r.meatPerBarK;
          atkInBracket += activeBars * r.atkPerBar;
          hpInBracket += activeBars * r.hpPerBar;
          if (eBar === lvEnd.cumulativeBars) {
            shardsInBracket += r.shards;
            auraInBracket += r.auraQueueHpPct;
          }
        }
      }

      decadeBreakdown.push({
        bracketLabel: {
          vi: `Giai đoạn Lv.${b.start} ➔ Lv.${b.end}`,
          en: `Tier Lv.${b.start} ➔ Lv.${b.end}`,
        },
        startLevel: b.start,
        endLevel: b.end,
        barsInBracket,
        meatRequired: meatKInBracket * 1_000,
        shardsRequired: shardsInBracket,
        atkGained: atkInBracket,
        hpGained: hpInBracket,
        auraGainedPct: auraInBracket,
      });
    }
  }

  return {
    faction: input.faction,
    factionConfig,
    shardRarity: input.shardRarity,
    mode: input.mode,
    isInvalidRange,
    fromState,
    toState,
    requiredBars,
    requiredMeatK,
    requiredMeat,
    requiredShards,
    gainedAtk,
    gainedHp,
    startAuraQueueHpPct: fromState.cumulativeAuraQueueHpPct,
    targetAuraQueueHpPct: toState.cumulativeAuraQueueHpPct,
    gainedAuraQueueHpPct,
    ownedMeat,
    missingMeat,
    ownedShards,
    missingShards,
    nearAuraMilestoneLevel,
    includesWipLevels,
    meatMaterial: CALCULATOR_MATERIALS.meat,
    shardMaterial,
    decadeBreakdown,
  };
}

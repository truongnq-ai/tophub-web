import type { HeroStarRarity } from "./hero-stars-data";
import type { CalculatorMaterialRef } from "./types";

export type LevelSpiritViewMode = "combo" | "level-only" | "spirit-only";

export const MIN_HERO_LEVEL = 1;
export const MAX_HERO_LEVEL = 311;

export const MIN_HEROIC_SPIRIT_LEVEL = 0;
export const MAX_HEROIC_SPIRIT_LEVEL = 100;

export const MIN_SQUAD_HERO_COUNT = 1;
export const MAX_SQUAD_HERO_COUNT = 18;

export const SPIRIT_BREAKTHROUGH_LEVELS = [
  10, 20, 30, 40, 50, 60, 70, 80, 90, 100,
] as const;

export const MAX_STAR_PREREQUISITE_SHARDS_BY_RARITY: Readonly<
  Record<HeroStarRarity, number>
> = {
  mythic: 1_000,
  legendary: 500,
  epic: 500,
  rare: 300,
};

export const MEAT_MATERIAL: CalculatorMaterialRef = {
  gameId: 3,
  nameVi: "Thịt",
  nameEn: "Meat",
  iconPath: "/images/items/resources/icon_20001.webp",
  rarity: "common",
};

export const UNIVERSAL_SPIRIT_SHARD_MATERIAL: CalculatorMaterialRef = {
  gameId: 230003,
  nameVi: "Mảnh Linh Thể Vạn Năng",
  nameEn: "Universal Heroic Spirit Shard",
  iconPath: "/images/items/shards/icon_30993.webp",
  rarity: "legendary",
};

/**
 * Chi phí Thịt (Meat) chính xác từng cấp từ Lv.1 -> Lv.311 theo bảng SSoT `🥩Hero Food`.
 * Index `lv - 1` tương ứng với chi phí tại cấp `lv` (Lv.1 = 0).
 */
export const HERO_LEVEL_MEAT_COSTS: readonly number[] = [
  0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 60, 60, 60, 70, 70, 70, 80, 80,
  80, 90, 90, 100, 100, 110, 110, 120, 120, 130, 140, 150, 170, 190, 210, 230,
  250, 270, 290, 310, 400, 400, 400, 500, 500, 500, 600, 700, 800, 900, 1000,
  1100, 1200, 1400, 1600, 1800, 2000, 2200, 2400, 2600, 2800, 3000, 3200, 3400,
  3600, 3800, 4100, 4400, 4700, 5000, 5300, 5600, 5900, 6200, 6500, 6800, 7100,
  7400, 7700, 8000, 8300, 8600, 9000, 9400, 9800, 10200, 10600, 11000, 11400,
  11800, 12200, 12600, 13000, 13400, 13800, 14200, 14600, 15000, 15400, 15800,
  16200, 16700, 17200, 17700, 18200, 18700, 19200, 19700, 20200, 20700, 21200,
  21700, 22300, 22900, 23500, 24100, 24700, 25300, 25900, 26500, 27100, 27700,
  28300, 28900, 29500, 30400, 31300, 32200, 33100, 34000, 36000, 39000, 42000,
  45000, 48000, 51000, 55000, 59000, 62000, 66000, 70000, 74000, 79000, 83000,
  88000, 93000, 98000, 103000, 108000, 113000, 120000, 130000, 140000, 142000,
  150000, 152000, 160000, 170000, 172000, 180000, 190000, 200000, 203000,
  210000, 220000, 230000, 240000, 250000, 253000, 260000, 280000, 290000,
  310000, 320000, 340000, 350000, 370000, 380000, 400000, 410000, 430000,
  450000, 470000, 490000, 510000, 530000, 550000, 570000, 590000, 610000,
  630000, 650000, 670000, 690000, 720000, 740000, 760000, 780000, 800000,
  820000, 850000, 900000, 905000, 950000, 955000, 1000000, 1000000, 1010000,
  1050000, 1050000, 1100000, 1100000, 1140000, 1150000, 1200000, 1200000,
  1250000, 1250000, 1300000, 1300000, 1350000, 1350000, 1400000, 1400000,
  1450000, 1450000, 1500000, 1500000, 1550000, 1550000, 1600000, 1600000,
  1650000, 1650000, 1700000, 1700000, 1750000, 1750000, 1800000, 1800000,
  1850000, 1850000, 1900000, 1900000, 1950000, 1950000, 2000000, 2000000,
  2050000, 2100000, 2150000, 2200000, 2200000, 2250000, 2290000, 2350000,
  2400000, 2450000, 2500000, 2550000, 2600000, 2650000, 2700000, 2750000,
  2800000, 2850000, 2900000, 2950000, 3000000, 3050000, 3100000, 3150000,
  3200000, 3250000, 3300000, 3400000, 3500000, 3600000, 3700000, 3800000,
  3900000, 4000000, 4090000, 4200000, 4300000, 4400000, 4500000, 4600000,
  4700000, 4800000, 4900000, 5000000, 5100000, 5200000, 5300000, 5400000,
  5500000, 5600000, 5700000, 5800000, 5900000, 6000000, 6100000, 6200000,
  6300000, 6400000, 6500000, 6600000, 6700000, 6800000, 6900000,
];

const CUMULATIVE_MEAT_BY_LEVEL: readonly number[] = (() => {
  const acc: number[] = [];
  let running = 0;
  for (const cost of HERO_LEVEL_MEAT_COSTS) {
    running += cost;
    acc.push(running);
  }
  return acc;
})();

export interface CastleHeroLevelPreset {
  readonly id: string;
  readonly heroLevel: number;
  readonly shortLabel: {
    readonly vi: string;
    readonly en: string;
  };
  readonly fullLabel: {
    readonly vi: string;
    readonly en: string;
  };
}

export const CASTLE_HERO_LEVEL_PRESETS: readonly CastleHeroLevelPreset[] = [
  {
    id: "c15",
    heroLevel: 90,
    shortLabel: { vi: "C15 (90)", en: "C15 (90)" },
    fullLabel: { vi: "Lâu Đài 15 (Lv.90)", en: "Castle 15 (Lv.90)" },
  },
  {
    id: "c25",
    heroLevel: 140,
    shortLabel: { vi: "C25 (140)", en: "C25 (140)" },
    fullLabel: { vi: "Lâu Đài 25 (Lv.140)", en: "Castle 25 (Lv.140)" },
  },
  {
    id: "c30",
    heroLevel: 165,
    shortLabel: { vi: "C30 (165)", en: "C30 (165)" },
    fullLabel: { vi: "Lâu Đài 30 (Lv.165)", en: "Castle 30 (Lv.165)" },
  },
  {
    id: "c35",
    heroLevel: 190,
    shortLabel: { vi: "C35 (190)", en: "C35 (190)" },
    fullLabel: { vi: "Lâu Đài 35 (Lv.190)", en: "Castle 35 (Lv.190)" },
  },
  {
    id: "c40",
    heroLevel: 220,
    shortLabel: { vi: "C40 (220)", en: "C40 (220)" },
    fullLabel: { vi: "Lâu Đài 40 (Lv.220)", en: "Castle 40 (Lv.220)" },
  },
  {
    id: "b6",
    heroLevel: 235,
    shortLabel: { vi: "B6 (235)", en: "B6 (235)" },
    fullLabel: { vi: "Tinh Hoa B6 (Lv.235)", en: "Brilliance 6 (Lv.235)" },
  },
  {
    id: "lv250",
    heroLevel: 250,
    shortLabel: { vi: "Lv.250", en: "Lv.250" },
    fullLabel: { vi: "Mốc Vượt Trần Lv.250", en: "Extended Cap Lv.250" },
  },
  {
    id: "max311",
    heroLevel: 311,
    shortLabel: { vi: "Max 311", en: "Max 311" },
    fullLabel: { vi: "Trần Bảng SSoT (Lv.311)", en: "Max SSoT Table (Lv.311)" },
  },
];

export interface HeroicSpiritLevelRow {
  readonly level: number;
  readonly shardCost: number;
  readonly cumulativeShards: number;
  readonly flatAtk: number;
  readonly flatHp: number;
  readonly percentAtk: number;
  readonly percentHp: number;
  readonly bonusHeroLevelCap: number;
  readonly skillDamageReductionPercent: number;
  readonly isBreakthroughMilestone: boolean;
}

function getSpiritShardCostForLevel(level: number): number {
  if (level <= 0) return 0;
  if (level === 1) return 10;
  if (level <= 5) return 2;
  if (level <= 10) return 4;
  if (level <= 15) return 6;
  if (level <= 20) return 8;
  if (level <= 25) return 10;
  if (level <= 30) return 12;
  if (level <= 35) return 14;
  if (level <= 40) return 20;
  if (level <= 45) return 24;
  if (level <= 50) return 28;
  if (level <= 55) return 32;
  if (level <= 60) return 36;
  if (level <= 65) return 40;
  if (level <= 70) return 44;
  if (level <= 75) return 48;
  if (level <= 80) return 52;
  if (level <= 85) return 56;
  if (level <= 90) return 60;
  if (level <= 95) return 65;
  return 70;
}

function getSpiritPercentAtkForLevel(level: number): number {
  if (level <= 0) return 0;
  if (level === 1) return 3.6;
  if (level <= 6) {
    return Number((3.6 + (level - 1) * 1.2).toFixed(2));
  }
  if (level <= 30) {
    return Number((9.6 + (level - 6) * 2.4).toFixed(2));
  }
  if (level <= 99) {
    return Number((67.2 + (level - 30) * 3.6).toFixed(2));
  }
  return 320.0;
}

export const HEROIC_SPIRIT_LEVEL_TABLE: readonly HeroicSpiritLevelRow[] =
  (() => {
    const rows: HeroicSpiritLevelRow[] = [];
    let runningShards = 0;

    for (let lv = 0; lv <= MAX_HEROIC_SPIRIT_LEVEL; lv++) {
      const shardCost = getSpiritShardCostForLevel(lv);
      runningShards += shardCost;
      const percentAtk = getSpiritPercentAtkForLevel(lv);
      const percentHp = Number((percentAtk * 3).toFixed(2));
      const breakthroughTier = Math.floor(lv / 10);

      rows.push({
        level: lv,
        shardCost,
        cumulativeShards: runningShards,
        flatAtk: lv * 80,
        flatHp: lv * 2_400,
        percentAtk,
        percentHp,
        bonusHeroLevelCap: breakthroughTier,
        skillDamageReductionPercent: breakthroughTier * 5,
        isBreakthroughMilestone: lv > 0 && lv % 10 === 0,
      });
    }

    return rows;
  })();

export function clampHeroLevel(level: number): number {
  if (!Number.isFinite(level)) {
    return MIN_HERO_LEVEL;
  }
  return Math.max(
    MIN_HERO_LEVEL,
    Math.min(MAX_HERO_LEVEL, Math.floor(level))
  );
}

export function clampSpiritLevel(level: number): number {
  if (!Number.isFinite(level)) {
    return MIN_HEROIC_SPIRIT_LEVEL;
  }
  return Math.max(
    MIN_HEROIC_SPIRIT_LEVEL,
    Math.min(MAX_HEROIC_SPIRIT_LEVEL, Math.floor(level))
  );
}

export function clampSquadHeroCount(count: number): number {
  if (!Number.isFinite(count)) {
    return MIN_SQUAD_HERO_COUNT;
  }
  return Math.max(
    MIN_SQUAD_HERO_COUNT,
    Math.min(MAX_SQUAD_HERO_COUNT, Math.floor(count))
  );
}

export function getCumulativeMeatAtHeroLevel(level: number): number {
  const clamped = clampHeroLevel(level);
  return CUMULATIVE_MEAT_BY_LEVEL[clamped - 1] ?? 0;
}

export function getCumulativeShardsAtSpiritLevel(level: number): number {
  const clamped = clampSpiritLevel(level);
  return HEROIC_SPIRIT_LEVEL_TABLE[clamped]?.cumulativeShards ?? 0;
}

export function getCastleStageLabelForHeroLevel(
  heroLevel: number
): { readonly vi: string; readonly en: string } {
  const lv = clampHeroLevel(heroLevel);
  if (lv <= 15) {
    return { vi: "Lâu Đài 1 (Trần Lv.15)", en: "Castle 1 (Cap Lv.15)" };
  }
  if (lv <= 80) {
    const castle = Math.ceil((lv - 15) / 5) + 1;
    return {
      vi: `Lâu Đài ${castle} (Trần Lv.${15 + (castle - 1) * 5})`,
      en: `Castle ${castle} (Cap Lv.${15 + (castle - 1) * 5})`,
    };
  }
  if (lv <= 90) {
    return { vi: "Lâu Đài 15 (Trần Lv.90)", en: "Castle 15 (Cap Lv.90)" };
  }
  if (lv <= 210) {
    const castle = Math.ceil((lv - 90) / 5) + 15;
    return {
      vi: `Lâu Đài ${castle} (Trần Lv.${90 + (castle - 15) * 5})`,
      en: `Castle ${castle} (Cap Lv.${90 + (castle - 15) * 5})`,
    };
  }
  if (lv <= 220) {
    return { vi: "Lâu Đài 40 / B1 (Trần Lv.220)", en: "Castle 40 / B1 (Cap Lv.220)" };
  }
  if (lv <= 225) {
    return { vi: "Tinh Hoa B2–B3 (Trần Lv.225)", en: "Brilliance 2–3 (Cap Lv.225)" };
  }
  if (lv <= 230) {
    return { vi: "Tinh Hoa B4–B5 (Trần Lv.230)", en: "Brilliance 4–5 (Cap Lv.230)" };
  }
  if (lv <= 235) {
    return { vi: "Tinh Hoa B6 (Trần Lv.235)", en: "Brilliance 6 (Cap Lv.235)" };
  }
  return {
    vi: "Vượt trần (+Linh Thể / Thần Thú / Tech)",
    en: "Extended Cap (+Spirit / Behemoth / Tech)",
  };
}

export interface HeroLevelSegmentBreakdown {
  readonly segmentLabel: {
    readonly vi: string;
    readonly en: string;
  };
  readonly fromLevel: number;
  readonly toLevel: number;
  readonly meatPerHero: number;
  readonly totalSquadMeat: number;
}

export interface HeroicSpiritMilestoneBreakdown {
  readonly milestoneLevel: number;
  readonly fromLevel: number;
  readonly toLevel: number;
  readonly requiredShardsInBand: number;
  readonly cumulativeShardsAtMilestone: number;
  readonly bonusHeroLevelCap: number;
  readonly skillDamageReductionPercent: number;
  readonly percentAtk: number;
  readonly percentHp: number;
}

export interface CalculateHeroLevelAndSpiritInput {
  readonly rarity: HeroStarRarity;
  readonly fromHeroLevel: number;
  readonly toHeroLevel: number;
  readonly heroCount: number;
  readonly fromSpiritLevel: number;
  readonly toSpiritLevel: number;
  readonly ownedMeat?: number;
  readonly ownedSpiritShards?: number;
  readonly includeMaxStarPrerequisite?: boolean;
}

export interface HeroLevelAndSpiritCalculationResult {
  readonly rarity: HeroStarRarity;
  readonly fromHeroLevel: number;
  readonly toHeroLevel: number;
  readonly heroCount: number;
  readonly fromSpiritLevel: number;
  readonly toSpiritLevel: number;
  readonly isInvalidRange: boolean;
  readonly meatMaterial: CalculatorMaterialRef;
  readonly spiritShardMaterial: CalculatorMaterialRef;
  readonly fromCumulativeMeat: number;
  readonly toCumulativeMeat: number;
  readonly requiredMeatPerHero: number;
  readonly totalRequiredMeat: number;
  readonly ownedMeat: number;
  readonly missingMeat: number;
  readonly surplusMeat: number;
  readonly fromSpiritRow: HeroicSpiritLevelRow;
  readonly toSpiritRow: HeroicSpiritLevelRow;
  readonly spiritUpgradeShards: number;
  readonly maxStarPrerequisiteShards: number;
  readonly includeMaxStarPrerequisite: boolean;
  readonly totalRequiredSpiritShards: number;
  readonly ownedSpiritShards: number;
  readonly missingSpiritShards: number;
  readonly surplusSpiritShards: number;
  readonly gainedHeroLevelCap: number;
  readonly gainedSkillDamageReduction: number;
  readonly gainedPercentAtk: number;
  readonly gainedPercentHp: number;
  readonly gainedFlatAtk: number;
  readonly gainedFlatHp: number;
  readonly levelSegmentsBreakdown: readonly HeroLevelSegmentBreakdown[];
  readonly spiritMilestonesBreakdown: readonly HeroicSpiritMilestoneBreakdown[];
}

export function calculateHeroLevelAndSpiritUpgrade(
  input: CalculateHeroLevelAndSpiritInput
): HeroLevelAndSpiritCalculationResult {
  const fromHeroLevel = clampHeroLevel(input.fromHeroLevel);
  const toHeroLevel = clampHeroLevel(input.toHeroLevel);
  const heroCount = clampSquadHeroCount(input.heroCount);
  const fromSpiritLevel = clampSpiritLevel(input.fromSpiritLevel);
  const toSpiritLevel = clampSpiritLevel(input.toSpiritLevel);

  const ownedMeat = Math.max(0, Math.floor(input.ownedMeat ?? 0));
  const ownedSpiritShards = Math.max(
    0,
    Math.floor(input.ownedSpiritShards ?? 0)
  );
  const includeMaxStarPrerequisite = Boolean(input.includeMaxStarPrerequisite);

  const isInvalidRange =
    toHeroLevel < fromHeroLevel ||
    toSpiritLevel < fromSpiritLevel ||
    (toHeroLevel === fromHeroLevel &&
      toSpiritLevel === fromSpiritLevel &&
      !includeMaxStarPrerequisite);

  const fromCumulativeMeat = getCumulativeMeatAtHeroLevel(fromHeroLevel);
  const toCumulativeMeat = getCumulativeMeatAtHeroLevel(toHeroLevel);
  const requiredMeatPerHero = isInvalidRange
    ? 0
    : Math.max(0, toCumulativeMeat - fromCumulativeMeat);
  const totalRequiredMeat = requiredMeatPerHero * heroCount;

  const missingMeat = Math.max(0, totalRequiredMeat - ownedMeat);
  const surplusMeat = Math.max(0, ownedMeat - totalRequiredMeat);

  const fromSpiritRow = HEROIC_SPIRIT_LEVEL_TABLE[fromSpiritLevel];
  const toSpiritRow = HEROIC_SPIRIT_LEVEL_TABLE[toSpiritLevel];

  const spiritUpgradeShards = isInvalidRange
    ? 0
    : Math.max(0, toSpiritRow.cumulativeShards - fromSpiritRow.cumulativeShards);
  const maxStarPrerequisiteShards = includeMaxStarPrerequisite
    ? MAX_STAR_PREREQUISITE_SHARDS_BY_RARITY[input.rarity]
    : 0;
  const totalRequiredSpiritShards = isInvalidRange
    ? 0
    : spiritUpgradeShards + maxStarPrerequisiteShards;

  const missingSpiritShards = Math.max(
    0,
    totalRequiredSpiritShards - ownedSpiritShards
  );
  const surplusSpiritShards = Math.max(
    0,
    ownedSpiritShards - totalRequiredSpiritShards
  );

  const gainedHeroLevelCap = Math.max(
    0,
    toSpiritRow.bonusHeroLevelCap - fromSpiritRow.bonusHeroLevelCap
  );
  const gainedSkillDamageReduction = Math.max(
    0,
    toSpiritRow.skillDamageReductionPercent -
      fromSpiritRow.skillDamageReductionPercent
  );
  const gainedPercentAtk = Number(
    Math.max(0, toSpiritRow.percentAtk - fromSpiritRow.percentAtk).toFixed(2)
  );
  const gainedPercentHp = Number(
    Math.max(0, toSpiritRow.percentHp - fromSpiritRow.percentHp).toFixed(2)
  );
  const gainedFlatAtk = Math.max(0, toSpiritRow.flatAtk - fromSpiritRow.flatAtk);
  const gainedFlatHp = Math.max(0, toSpiritRow.flatHp - fromSpiritRow.flatHp);

  // Chia các chặng cấp độ tướng theo cụm 10 cấp (hoặc theo khoảng thực tế)
  const levelSegmentsBreakdown: HeroLevelSegmentBreakdown[] = [];
  if (!isInvalidRange && toHeroLevel > fromHeroLevel) {
    let cursor = fromHeroLevel;
    while (cursor < toHeroLevel) {
      const nextBoundary = Math.min(
        toHeroLevel,
        Math.floor(cursor / 10) * 10 + 10
      );
      const segMeat =
        getCumulativeMeatAtHeroLevel(nextBoundary) -
        getCumulativeMeatAtHeroLevel(cursor);
      const stageLabel = getCastleStageLabelForHeroLevel(nextBoundary);
      levelSegmentsBreakdown.push({
        segmentLabel: stageLabel,
        fromLevel: cursor,
        toLevel: nextBoundary,
        meatPerHero: segMeat,
        totalSquadMeat: segMeat * heroCount,
      });
      cursor = nextBoundary;
    }
  }

  // Chia các mốc đột phá Linh Thể theo cụm 10 cấp
  const spiritMilestonesBreakdown: HeroicSpiritMilestoneBreakdown[] = [];
  if (!isInvalidRange && toSpiritLevel > fromSpiritLevel) {
    let cursor = fromSpiritLevel;
    while (cursor < toSpiritLevel) {
      const nextBoundary = Math.min(
        toSpiritLevel,
        Math.floor(cursor / 10) * 10 + 10
      );
      const endRow = HEROIC_SPIRIT_LEVEL_TABLE[nextBoundary];
      const startRow = HEROIC_SPIRIT_LEVEL_TABLE[cursor];
      spiritMilestonesBreakdown.push({
        milestoneLevel: nextBoundary,
        fromLevel: cursor,
        toLevel: nextBoundary,
        requiredShardsInBand: endRow.cumulativeShards - startRow.cumulativeShards,
        cumulativeShardsAtMilestone: endRow.cumulativeShards,
        bonusHeroLevelCap: endRow.bonusHeroLevelCap,
        skillDamageReductionPercent: endRow.skillDamageReductionPercent,
        percentAtk: endRow.percentAtk,
        percentHp: endRow.percentHp,
      });
      cursor = nextBoundary;
    }
  }

  return {
    rarity: input.rarity,
    fromHeroLevel,
    toHeroLevel,
    heroCount,
    fromSpiritLevel,
    toSpiritLevel,
    isInvalidRange,
    meatMaterial: MEAT_MATERIAL,
    spiritShardMaterial: UNIVERSAL_SPIRIT_SHARD_MATERIAL,
    fromCumulativeMeat,
    toCumulativeMeat,
    requiredMeatPerHero,
    totalRequiredMeat,
    ownedMeat,
    missingMeat,
    surplusMeat,
    fromSpiritRow,
    toSpiritRow,
    spiritUpgradeShards,
    maxStarPrerequisiteShards,
    includeMaxStarPrerequisite,
    totalRequiredSpiritShards,
    ownedSpiritShards,
    missingSpiritShards,
    surplusSpiritShards,
    gainedHeroLevelCap,
    gainedSkillDamageReduction,
    gainedPercentAtk,
    gainedPercentHp,
    gainedFlatAtk,
    gainedFlatHp,
    levelSegmentsBreakdown,
    spiritMilestonesBreakdown,
  };
}

import {
  TROOP_SKIN_RARITIES,
  getCumulativeMedalsAtPoint,
  getInterpolatedSkinStatsAtPoint,
  type TroopSkinRarity,
  type TroopSkinRarityMeta,
} from "./troop-skins-data";

export const SKIN_HONOR_MIN_LEVEL = 0;
export const SKIN_HONOR_MAX_LEVEL = 150;
export const SKIN_HONOR_TIER1_MAX_LEVEL = 100;
export const SKIN_HONOR_LEVELS_PER_COPY_STEP = 5;
export const SKIN_HONOR_TIER1_COPIES_PER_STEP = 1; // Lv.1..100: 1 copy per +5 levels
export const SKIN_HONOR_TIER2_COPIES_PER_STEP = 2; // Lv.101..150: 2 copies per +5 levels
export const SKIN_HONOR_TOTAL_COPIES_TO_MAX = 40;

export const SKIN_HONOR_LEVEL_PRESETS: readonly number[] = [
  0, 25, 50, 75, 100, 125, 150,
] as const;

export interface SkinHonorSegmentBreakdown {
  readonly id: "tier-1-100" | "tier-101-150";
  readonly labelVi: string;
  readonly labelEn: string;
  readonly fromHonorLevel: number;
  readonly toHonorLevel: number;
  readonly totalLevelsInSegment: number;
  readonly copiesPerFiveLevels: number;
  readonly maxFiveLevelSteps: number;
  readonly stepsCoveredByCopies: number;
  readonly levelsCoveredByCopies: number;
  readonly copiesUsed: number;
  readonly levelsCoveredByMedals: number;
  readonly medalsRequired: number;
  readonly medalsSavedByCopies: number;
}

export interface SkinHonorRosterCounts {
  readonly legendary: number; // 0..8
  readonly epic: number; // 0..5
  readonly rare: number; // 0..2
}

export interface SkinHonorStaircaseRecommendation {
  readonly stepOrder: number;
  readonly id: string;
  readonly titleVi: string;
  readonly titleEn: string;
  readonly rarity: TroopSkinRarity;
  readonly skinCount: number;
  readonly affordableSkinCount: number;
  readonly fromStageLabel: string;
  readonly toStageLabel: string;
  readonly costPerSkinMedals: number;
  readonly totalStepMedals: number;
  readonly cumulativeMedals: number;
  readonly copiesPerSkin: number;
  readonly totalStepCopies: number;
  readonly gainedOwnedAtkPctTotal: number;
  readonly gainedOwnedHpPctTotal: number;
  readonly roiAtkPer100kMedals: number;
  readonly status: "affordable" | "partial" | "locked";
}

export interface SkinHonorCalculationInput {
  readonly rarity: TroopSkinRarity;
  readonly currentHonorLevel: number;
  readonly targetHonorLevel: number;
  readonly ownedMedals: number;
  readonly ownedDuplicateCopies: number;
  readonly rosterCounts: SkinHonorRosterCounts;
}

export interface SkinHonorCalculationResult {
  readonly rarityMeta: TroopSkinRarityMeta;
  readonly normalizedCurrentHonor: number;
  readonly normalizedTargetHonor: number;
  readonly effectiveStartHonor: number;
  readonly effectiveEndHonor: number;
  readonly isReversed: boolean;
  readonly totalHonorLevelsGained: number;
  readonly pureMedalsWithoutCopies: number;
  readonly maxCopiesApplicable: number;
  readonly copiesUsedForHonor: number;
  readonly copiesUnusedRemainder: number;
  readonly levelsCoveredByCopies: number;
  readonly levelsCoveredByMedals: number;
  readonly medalsSavedByCopies: number;
  readonly netMedalsNeeded: number;
  readonly medalsRemainingAfter: number;
  readonly medalsShortfall: number;
  readonly fullSkinPlusHonorCumulativeMedals: number;
  readonly segments: readonly SkinHonorSegmentBreakdown[];
  readonly staircaseRecommendations: readonly SkinHonorStaircaseRecommendation[];
  readonly totalRosterOwnedAtkPctAtMaxStaircase: number;
  readonly totalRosterOwnedHpPctAtMaxStaircase: number;
}

export function clampSkinHonorLevel(level: number): number {
  const safe = Number.isFinite(level) ? Math.floor(level) : 0;
  return Math.max(SKIN_HONOR_MIN_LEVEL, Math.min(SKIN_HONOR_MAX_LEVEL, safe));
}

export function calculateRosterStaircasePlan(
  rosterCounts: SkinHonorRosterCounts,
  ownedMedals: number
): {
  readonly recommendations: readonly SkinHonorStaircaseRecommendation[];
  readonly totalOwnedAtkPct: number;
  readonly totalOwnedHpPct: number;
} {
  const safeLeg = Math.max(0, Math.min(8, Math.floor(rosterCounts.legendary || 0)));
  const safeEpic = Math.max(0, Math.min(5, Math.floor(rosterCounts.epic || 0)));
  const safeRare = Math.max(0, Math.min(2, Math.floor(rosterCounts.rare || 0)));
  let remainingBudget = Math.max(0, Math.floor(ownedMedals || 0));

  const rawBlueprints: ReadonlyArray<{
    readonly id: string;
    readonly titleVi: string;
    readonly titleEn: string;
    readonly rarity: TroopSkinRarity;
    readonly skinCount: number;
    readonly fromLevel: number;
    readonly toLevel: number;
    readonly copiesPerSkin: number;
  }> = [
    {
      id: "stair-leg-1-10",
      titleVi: "Đẩy Quân Trang Cam lên Lv.10 ⭐ (Kích hoạt mốc 1 Sao)",
      titleEn: "Upgrade Legendary Skins to Lv.10 ⭐ (1-Star Breakpoint)",
      rarity: "legendary",
      skinCount: safeLeg,
      fromLevel: 1,
      toLevel: 10,
      copiesPerSkin: 1,
    },
    {
      id: "stair-epic-1-10",
      titleVi: "Nâng đồng loạt Quân Trang Tím lên Lv.10 ⭐ (50% chi phí)",
      titleEn: "Upgrade all Epic Skins to Lv.10 ⭐ (50% cost efficiency)",
      rarity: "epic",
      skinCount: safeEpic,
      fromLevel: 1,
      toLevel: 10,
      copiesPerSkin: 1,
    },
    {
      id: "stair-rare-1-10",
      titleVi: "Nâng đồng loạt Quân Trang Lam lên Lv.10 ⭐ (25% chi phí)",
      titleEn: "Upgrade all Rare Skins to Lv.10 ⭐ (25% cost efficiency)",
      rarity: "rare",
      skinCount: safeRare,
      fromLevel: 1,
      toLevel: 10,
      copiesPerSkin: 1,
    },
    {
      id: "stair-leg-10-20",
      titleVi: "Đẩy Quân Trang Cam lên Lv.20 ⭐⭐ (Điểm gãy Vàng 2 Sao)",
      titleEn: "Upgrade Legendary Skins to Lv.20 ⭐⭐ (2-Star Sweet Spot)",
      rarity: "legendary",
      skinCount: safeLeg,
      fromLevel: 10,
      toLevel: 20,
      copiesPerSkin: 1,
    },
    {
      id: "stair-epic-10-20",
      titleVi: "Kéo toàn bộ Quân Trang Tím lên Lv.20 ⭐⭐",
      titleEn: "Upgrade all Epic Skins to Lv.20 ⭐⭐",
      rarity: "epic",
      skinCount: safeEpic,
      fromLevel: 10,
      toLevel: 20,
      copiesPerSkin: 1,
    },
    {
      id: "stair-rare-10-20",
      titleVi: "Kéo toàn bộ Quân Trang Lam lên Lv.20 ⭐⭐",
      titleEn: "Upgrade all Rare Skins to Lv.20 ⭐⭐",
      rarity: "rare",
      skinCount: safeRare,
      fromLevel: 10,
      toLevel: 20,
      copiesPerSkin: 1,
    },
    {
      id: "stair-leg-20-30",
      titleVi: "Nâng Quân Trang Cam lên Lv.30 ⭐⭐⭐ (Đột phá Giữa Game)",
      titleEn: "Upgrade Legendary Skins to Lv.30 ⭐⭐⭐ (Mid-Game Spike)",
      rarity: "legendary",
      skinCount: safeLeg,
      fromLevel: 20,
      toLevel: 30,
      copiesPerSkin: 2,
    },
    {
      id: "stair-epic-20-30",
      titleVi: "Nâng Quân Trang Tím lên Lv.30 ⭐⭐⭐",
      titleEn: "Upgrade Epic Skins to Lv.30 ⭐⭐⭐",
      rarity: "epic",
      skinCount: safeEpic,
      fromLevel: 20,
      toLevel: 30,
      copiesPerSkin: 2,
    },
    {
      id: "stair-leg-30-50",
      titleVi: "Hoàn tất Quân Trang Cam lên Lv.50 MAX (Mở khóa Vinh Dự)",
      titleEn: "Max Legendary Skins to Lv.50 (Unlock Skin Honor)",
      rarity: "legendary",
      skinCount: safeLeg,
      fromLevel: 30,
      toLevel: 50,
      copiesPerSkin: 9,
    },
  ];

  const recommendations: SkinHonorStaircaseRecommendation[] = [];
  let cumulativeMedals = 0;
  let totalOwnedAtkPct = 0;
  let totalOwnedHpPct = 0;
  let stepOrder = 1;

  for (const bp of rawBlueprints) {
    if (bp.skinCount <= 0) continue;
    const costPerSkin =
      getCumulativeMedalsAtPoint({ level: bp.toLevel, sublevel: 0 }, bp.rarity) -
      getCumulativeMedalsAtPoint({ level: bp.fromLevel, sublevel: 0 }, bp.rarity);
    const totalStepMedals = costPerSkin * bp.skinCount;
    cumulativeMedals += totalStepMedals;

    const startStat = getInterpolatedSkinStatsAtPoint(
      { level: bp.fromLevel, sublevel: 0 },
      bp.rarity
    );
    const endStat = getInterpolatedSkinStatsAtPoint(
      { level: bp.toLevel, sublevel: 0 },
      bp.rarity
    );
    const gainedAtkPerSkin =
      bp.fromLevel === 1
        ? endStat.ownedAtkPct
        : endStat.ownedAtkPct - startStat.ownedAtkPct;
    const gainedHpPerSkin =
      bp.fromLevel === 1
        ? endStat.ownedHpPct
        : endStat.ownedHpPct - startStat.ownedHpPct;

    const gainedOwnedAtkPctTotal = Number(
      (gainedAtkPerSkin * bp.skinCount).toFixed(2)
    );
    const gainedOwnedHpPctTotal = Number(
      (gainedHpPerSkin * bp.skinCount).toFixed(2)
    );
    totalOwnedAtkPct += gainedOwnedAtkPctTotal;
    totalOwnedHpPct += gainedOwnedHpPctTotal;

    const roiAtkPer100kMedals =
      costPerSkin > 0
        ? Number(((gainedAtkPerSkin / costPerSkin) * 100_000).toFixed(2))
        : 0;

    let status: "affordable" | "partial" | "locked" = "locked";
    let affordableSkinCount = 0;
    if (remainingBudget >= totalStepMedals) {
      status = "affordable";
      affordableSkinCount = bp.skinCount;
      remainingBudget -= totalStepMedals;
    } else if (remainingBudget >= costPerSkin && costPerSkin > 0) {
      status = "partial";
      affordableSkinCount = Math.floor(remainingBudget / costPerSkin);
      remainingBudget = 0;
    } else {
      status = "locked";
      affordableSkinCount = 0;
    }

    recommendations.push({
      stepOrder: stepOrder++,
      id: bp.id,
      titleVi: bp.titleVi,
      titleEn: bp.titleEn,
      rarity: bp.rarity,
      skinCount: bp.skinCount,
      affordableSkinCount,
      fromStageLabel: `Lv.${bp.fromLevel}`,
      toStageLabel: `Lv.${bp.toLevel}`,
      costPerSkinMedals: costPerSkin,
      totalStepMedals,
      cumulativeMedals,
      copiesPerSkin: bp.copiesPerSkin,
      totalStepCopies: bp.copiesPerSkin * bp.skinCount,
      gainedOwnedAtkPctTotal,
      gainedOwnedHpPctTotal,
      roiAtkPer100kMedals,
      status,
    });
  }

  return {
    recommendations,
    totalOwnedAtkPct: Number(totalOwnedAtkPct.toFixed(2)),
    totalOwnedHpPct: Number(totalOwnedHpPct.toFixed(2)),
  };
}

export function calculateSkinHonorProgression(
  input: SkinHonorCalculationInput
): SkinHonorCalculationResult {
  const rarityMeta = TROOP_SKIN_RARITIES[input.rarity];
  const normalizedCurrentHonor = clampSkinHonorLevel(input.currentHonorLevel);
  const normalizedTargetHonor = clampSkinHonorLevel(input.targetHonorLevel);
  const isReversed = normalizedCurrentHonor > normalizedTargetHonor;
  const effectiveStartHonor = isReversed
    ? normalizedTargetHonor
    : normalizedCurrentHonor;
  const effectiveEndHonor = isReversed
    ? normalizedCurrentHonor
    : normalizedTargetHonor;

  const safeOwnedMedals = Math.max(
    0,
    Number.isFinite(input.ownedMedals) ? Math.floor(input.ownedMedals) : 0
  );
  const safeOwnedCopies = Math.max(
    0,
    Number.isFinite(input.ownedDuplicateCopies)
      ? Math.floor(input.ownedDuplicateCopies)
      : 0
  );

  const totalHonorLevelsGained = Math.max(
    0,
    effectiveEndHonor - effectiveStartHonor
  );
  const pureMedalsWithoutCopies =
    totalHonorLevelsGained * rarityMeta.honorMedalsPerLevel;

  let remainingCopiesPool = safeOwnedCopies;
  const segments: SkinHonorSegmentBreakdown[] = [];

  const tierDefs: ReadonlyArray<{
    readonly id: "tier-1-100" | "tier-101-150";
    readonly labelVi: string;
    readonly labelEn: string;
    readonly minLv: number;
    readonly maxLv: number;
    readonly copiesPerStep: number;
  }> = [
    {
      id: "tier-1-100",
      labelVi: "Bậc Vinh Dự 1 (Lv.0 ➔ Lv.100 • 1 Phôi / 5 Cấp)",
      labelEn: "Honor Tier 1 (Lv.0 to Lv.100 • 1 Copy / 5 Levels)",
      minLv: 0,
      maxLv: 100,
      copiesPerStep: SKIN_HONOR_TIER1_COPIES_PER_STEP,
    },
    {
      id: "tier-101-150",
      labelVi: "Bậc Vinh Dự 2 (Lv.100 ➔ Lv.150 • 2 Phôi / 5 Cấp)",
      labelEn: "Honor Tier 2 (Lv.100 to Lv.150 • 2 Copies / 5 Levels)",
      minLv: 100,
      maxLv: 150,
      copiesPerStep: SKIN_HONOR_TIER2_COPIES_PER_STEP,
    },
  ];

  let maxCopiesApplicable = 0;
  let copiesUsedForHonor = 0;
  let levelsCoveredByCopies = 0;
  let levelsCoveredByMedals = 0;
  let medalsSavedByCopies = 0;
  let netMedalsNeeded = 0;

  for (const tier of tierDefs) {
    const segStart = Math.max(effectiveStartHonor, tier.minLv);
    const segEnd = Math.min(effectiveEndHonor, tier.maxLv);
    if (segEnd > segStart) {
      const totalLevelsInSegment = segEnd - segStart;
      const maxFiveLevelSteps = Math.floor(
        totalLevelsInSegment / SKIN_HONOR_LEVELS_PER_COPY_STEP
      );
      maxCopiesApplicable += maxFiveLevelSteps * tier.copiesPerStep;

      const affordableStepsByCopies = Math.min(
        maxFiveLevelSteps,
        Math.floor(remainingCopiesPool / tier.copiesPerStep)
      );
      const segCopiesUsed = affordableStepsByCopies * tier.copiesPerStep;
      remainingCopiesPool -= segCopiesUsed;

      const segLevelsByCopies =
        affordableStepsByCopies * SKIN_HONOR_LEVELS_PER_COPY_STEP;
      const segLevelsByMedals = totalLevelsInSegment - segLevelsByCopies;
      const segMedalsRequired =
        segLevelsByMedals * rarityMeta.honorMedalsPerLevel;
      const segMedalsSaved =
        segLevelsByCopies * rarityMeta.honorMedalsPerLevel;

      copiesUsedForHonor += segCopiesUsed;
      levelsCoveredByCopies += segLevelsByCopies;
      levelsCoveredByMedals += segLevelsByMedals;
      medalsSavedByCopies += segMedalsSaved;
      netMedalsNeeded += segMedalsRequired;

      segments.push({
        id: tier.id,
        labelVi: tier.labelVi,
        labelEn: tier.labelEn,
        fromHonorLevel: segStart,
        toHonorLevel: segEnd,
        totalLevelsInSegment,
        copiesPerFiveLevels: tier.copiesPerStep,
        maxFiveLevelSteps,
        stepsCoveredByCopies: affordableStepsByCopies,
        levelsCoveredByCopies: segLevelsByCopies,
        copiesUsed: segCopiesUsed,
        levelsCoveredByMedals: segLevelsByMedals,
        medalsRequired: segMedalsRequired,
        medalsSavedByCopies: segMedalsSaved,
      });
    }
  }

  const medalsRemainingAfter = Math.max(0, safeOwnedMedals - netMedalsNeeded);
  const medalsShortfall = Math.max(0, netMedalsNeeded - safeOwnedMedals);

  const lv50BaseMedals = getCumulativeMedalsAtPoint(
    { level: 50, sublevel: 0 },
    input.rarity
  );
  const fullSkinPlusHonorCumulativeMedals =
    lv50BaseMedals + effectiveEndHonor * rarityMeta.honorMedalsPerLevel;

  const staircase = calculateRosterStaircasePlan(
    input.rosterCounts,
    safeOwnedMedals
  );

  return {
    rarityMeta,
    normalizedCurrentHonor,
    normalizedTargetHonor,
    effectiveStartHonor,
    effectiveEndHonor,
    isReversed,
    totalHonorLevelsGained,
    pureMedalsWithoutCopies,
    maxCopiesApplicable,
    copiesUsedForHonor,
    copiesUnusedRemainder: remainingCopiesPool,
    levelsCoveredByCopies,
    levelsCoveredByMedals,
    medalsSavedByCopies,
    netMedalsNeeded,
    medalsRemainingAfter,
    medalsShortfall,
    fullSkinPlusHonorCumulativeMedals,
    segments,
    staircaseRecommendations: staircase.recommendations,
    totalRosterOwnedAtkPctAtMaxStaircase: staircase.totalOwnedAtkPct,
    totalRosterOwnedHpPctAtMaxStaircase: staircase.totalOwnedHpPct,
  };
}

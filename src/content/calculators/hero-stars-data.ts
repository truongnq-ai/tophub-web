import { GAME_ASSET_REGISTRY } from "@/content/guides/asset-registry";
import type { AssetFaction } from "@/content/guides/types";
import { CALCULATOR_MATERIALS } from "./registry";
import type {
  CalculatorLocale,
  CalculatorMaterialRef,
} from "./types";

export type HeroStarRarity = "mythic" | "legendary" | "epic" | "rare";
export type HeroStarColorTier = "none" | "gold" | "red" | "silver";
export type HeroStarCostProfile = "standard" | "legacy_500";

export interface HeroRepresentativeOption {
  readonly id: string;
  readonly nameVi: string;
  readonly nameEn: string;
  readonly iconPath: string;
  readonly rarity: HeroStarRarity;
  readonly faction: AssetFaction;
}

export interface HeroStarRarityConfig {
  readonly rarity: HeroStarRarity;
  readonly label: Record<CalculatorLocale, string>;
  readonly shortLabel: Record<CalculatorLocale, string>;
  readonly badgeText: Record<CalculatorLocale, string>;
  readonly defaultHeroId: string;
  readonly universalShard: CalculatorMaterialRef;
  readonly specificShardLabel: Record<CalculatorLocale, string>;
  readonly totalShardsStandard: number;
  readonly totalShardsLegacy500: number;
  readonly supportsProfileToggle: boolean;
}

export interface HeroStarPositionState {
  /** Tổng số cánh sao đã nâng từ 0..75 */
  readonly petalIndex: number;
  /** Tầng màu hiện tại: none (0★), gold (1..5★ Vàng), red (1..5★ Đỏ), silver (1..5★ Bạc) */
  readonly tier: HeroStarColorTier;
  /** Số ngôi sao đã hoàn thành trọn vẹn trong tầng màu hiện tại (0..5) */
  readonly starsInTier: number;
  /** Số cánh sao lẻ đang nâng của ngôi sao tiếp theo (0..4) */
  readonly petalsInNextStar: number;
  /** Tổng số ngôi sao đã hoàn thành trên toàn thang 0..15 */
  readonly overallStarsCompleted: number;
  /** Tầng màu của ngôi sao đang được nâng cánh lẻ tiếp theo */
  readonly nextStarColorTier: Exclude<HeroStarColorTier, "none">;
  /** Số thứ tự ngôi sao đang nâng trong tầng tiếp theo (1..5) */
  readonly nextStarNumberInTier: number;
}

export interface HeroStarStepBreakdownItem {
  /** Thứ tự ngôi sao tổng (1..15) */
  readonly overallStarNumber: number;
  /** Tầng màu của ngôi sao này ('gold' | 'red' | 'silver') */
  readonly colorTier: Exclude<HeroStarColorTier, "none">;
  /** Thứ tự ngôi sao trong tầng màu (1..5) */
  readonly starNumberInTier: number;
  /** Nhãn hiển thị bậc sao (VD: "2★ Vàng" / "2★ Gold") */
  readonly starLabel: Record<CalculatorLocale, string>;
  /** Cánh bắt đầu trong ngôi sao này (1..5) */
  readonly startPetalInStar: number;
  /** Cánh kết thúc trong ngôi sao này (1..5) */
  readonly endPetalInStar: number;
  /** Số cánh thực tế cần nâng ở ngôi sao này (1..5) */
  readonly petalsUsed: number;
  /** Chi phí mảnh trên mỗi cánh ở ngôi sao này */
  readonly costPerPetal: number;
  /** Tổng mảnh tiêu tốn tại ngôi sao này (petalsUsed * costPerPetal) */
  readonly starTotalShards: number;
  /** Tổng mảnh tích lũy từ 0★ đến hết phần cánh nâng ở ngôi sao này */
  readonly cumulativeShardsAtStepEnd: number;
  /** Ghi chú cột mốc đột phá kỹ năng / nội tại (nếu có) */
  readonly milestoneNote?: Record<CalculatorLocale, string>;
}

export interface HeroStarCalculationInput {
  readonly rarity: HeroStarRarity;
  readonly costProfile?: HeroStarCostProfile;
  readonly fromPetalIndex: number;
  readonly toPetalIndex: number;
  readonly ownedShards?: number;
}

export interface HeroStarCalculationResult {
  readonly rarity: HeroStarRarity;
  readonly costProfile: HeroStarCostProfile;
  readonly fromState: HeroStarPositionState;
  readonly toState: HeroStarPositionState;
  readonly isInvalidRange: boolean;
  readonly alreadyInvestedShards: number;
  readonly targetCumulativeShards: number;
  readonly requiredShards: number;
  readonly ownedShards: number;
  readonly missingShards: number;
  readonly surplusShards: number;
  readonly completionPercent: number;
  readonly currentCostPerPetal: number;
  readonly targetCostPerPetal: number;
  readonly universalShard: CalculatorMaterialRef;
  readonly starStepsBreakdown: readonly HeroStarStepBreakdownItem[];
}

/**
 * Bảng chi phí Mảnh trên MỖI CÁNH SAO (1 ngôi sao = 5 cánh) cho 15 ngôi sao (1★ -> 15★):
 * - Stars 1..5 (Index 0..4): 5 Sao Vàng
 * - Stars 6..10 (Index 5..9): 5 Sao Đỏ
 * - Stars 11..15 (Index 10..14): 5 Sao Bạc
 */
export const HERO_STAR_PETAL_COSTS: Readonly<
  Record<
    HeroStarRarity,
    Readonly<Record<HeroStarCostProfile, readonly number[]>>
  >
> = {
  mythic: {
    // Tổng = 5 * (2+2+4+4+8 + 12+8+8+16+16 + 32+8+16+32+32) = 1,000 mảnh
    standard: [2, 2, 4, 4, 8, 12, 8, 8, 16, 16, 32, 8, 16, 32, 32],
    legacy_500: [2, 2, 4, 4, 8, 12, 8, 8, 16, 16, 32, 8, 16, 32, 32],
  },
  legendary: {
    // Tổng = 5 * (1+1+2+2+4 + 6+4+4+8+8 + 16+4+8+16+16) = 500 mảnh
    standard: [1, 1, 2, 2, 4, 6, 4, 4, 8, 8, 16, 4, 8, 16, 16],
    legacy_500: [1, 1, 2, 2, 4, 6, 4, 4, 8, 8, 16, 4, 8, 16, 16],
  },
  epic: {
    // Tổng = 5 * (1+1+1+2+3 + 5+4+4+7+8 + 15+5+8+15+15) = 470 mảnh
    standard: [1, 1, 1, 2, 3, 5, 4, 4, 7, 8, 15, 5, 8, 15, 15],
    // Chuẩn bảng 8.4 (500 mảnh):
    legacy_500: [1, 1, 2, 2, 4, 6, 4, 4, 8, 8, 16, 4, 8, 16, 16],
  },
  rare: {
    // Tổng = 5 * (1+1+1+1+2 + 3+2+3+4+5 + 9+3+5+9+9) = 290 mảnh
    standard: [1, 1, 1, 1, 2, 3, 2, 3, 4, 5, 9, 3, 5, 9, 9],
    legacy_500: [1, 1, 2, 2, 4, 6, 4, 4, 8, 8, 16, 4, 8, 16, 16],
  },
};

export const HERO_STAR_MILESTONES: Readonly<
  Record<number, Record<CalculatorLocale, string>>
> = {
  5: {
    vi: "Hoàn tất 5★ Vàng — Chuẩn bị đột phá tầng Sao Đỏ",
    en: "Completed 5★ Gold — Ready for Red Star breakthrough",
  },
  6: {
    vi: "Mở khóa Kỹ năng thứ 5 (Tướng Đỏ Mythic) & Đột phá 1★ Đỏ",
    en: "Unlocks 5th Skill (Mythic Heroes) & 1★ Red Breakthrough",
  },
  10: {
    vi: "Hoàn tất 5★ Đỏ — Mở điều kiện tiến lên tầng Sao Bạc",
    en: "Completed 5★ Red — Unlocks Silver Star tier progression",
  },
  11: {
    vi: "Điểm Gãy Vàng 1★ Bạc: Cường hóa +30% hiệu ứng kỹ năng",
    en: "1★ Silver Golden Breakpoint: +30% Skill Effect boost",
  },
  12: {
    vi: "Mở khóa Nội tại thứ 3 (Trait 3 Kinh tế cho Tướng Tím/Vàng)",
    en: "Unlocks 3rd Trait (Economy Passive for Epic/Legendary Heroes)",
  },
  15: {
    vi: "Đạt Đỉnh 5★ Bạc (Max 15★) — Mở khóa Tiệm Đổi Quà (Exchange Shop)",
    en: "Max 5★ Silver (15★ Cap) — Unlocks Shard Exchange Shop",
  },
};

export const HERO_STAR_RARITY_CONFIGS: Readonly<
  Record<HeroStarRarity, HeroStarRarityConfig>
> = {
  mythic: {
    rarity: "mythic",
    label: {
      vi: "Tướng Đỏ (Mythic)",
      en: "Mythic Hero (Red)",
    },
    shortLabel: {
      vi: "Tướng Đỏ",
      en: "Mythic",
    },
    badgeText: {
      vi: "Phẩm Đỏ • 1,000 Mảnh Cam",
      en: "Mythic • 1,000 Gold Shards",
    },
    defaultHeroId: "hero-desert-prince",
    universalShard: CALCULATOR_MATERIALS.legendaryUniversalHeroShard,
    specificShardLabel: {
      vi: "Hoặc Mảnh Anh Hùng Đỏ riêng tương ứng",
      en: "Or matching Mythic Hero-specific Shards",
    },
    totalShardsStandard: 1000,
    totalShardsLegacy500: 1000,
    supportsProfileToggle: false,
  },
  legendary: {
    rarity: "legendary",
    label: {
      vi: "Tướng Vàng (Legendary)",
      en: "Legendary Hero (Gold)",
    },
    shortLabel: {
      vi: "Tướng Vàng",
      en: "Legendary",
    },
    badgeText: {
      vi: "Phẩm Vàng • 500 Mảnh Cam",
      en: "Legendary • 500 Gold Shards",
    },
    defaultHeroId: "hero-pyromancer",
    universalShard: CALCULATOR_MATERIALS.legendaryUniversalHeroShard,
    specificShardLabel: {
      vi: "Hoặc Mảnh Anh Hùng Vàng riêng tương ứng",
      en: "Or matching Legendary Hero-specific Shards",
    },
    totalShardsStandard: 500,
    totalShardsLegacy500: 500,
    supportsProfileToggle: false,
  },
  epic: {
    rarity: "epic",
    label: {
      vi: "Tướng Tím (Epic)",
      en: "Epic Hero (Purple)",
    },
    shortLabel: {
      vi: "Tướng Tím",
      en: "Epic",
    },
    badgeText: {
      vi: "Phẩm Tím • 470 Mảnh Tím",
      en: "Epic • 470 Purple Shards",
    },
    defaultHeroId: "hero-brawler",
    universalShard: CALCULATOR_MATERIALS.epicUniversalHeroShard,
    specificShardLabel: {
      vi: "Hoặc Mảnh Anh Hùng Tím riêng tương ứng",
      en: "Or matching Epic Hero-specific Shards",
    },
    totalShardsStandard: 470,
    totalShardsLegacy500: 500,
    supportsProfileToggle: true,
  },
  rare: {
    rarity: "rare",
    label: {
      vi: "Tướng Xanh (Rare)",
      en: "Rare Hero (Blue)",
    },
    shortLabel: {
      vi: "Tướng Xanh",
      en: "Rare",
    },
    badgeText: {
      vi: "Phẩm Lam • 290 Mảnh Lam",
      en: "Rare • 290 Blue Shards",
    },
    defaultHeroId: "hero-guardsman",
    universalShard: CALCULATOR_MATERIALS.rareUniversalHeroShard,
    specificShardLabel: {
      vi: "Hoặc Mảnh Anh Hùng Lam riêng tương ứng",
      en: "Or matching Rare Hero-specific Shards",
    },
    totalShardsStandard: 290,
    totalShardsLegacy500: 500,
    supportsProfileToggle: true,
  },
};

export function getHeroesByRarity(
  rarity: HeroStarRarity
): readonly HeroRepresentativeOption[] {
  const defaultId = HERO_STAR_RARITY_CONFIGS[rarity].defaultHeroId;
  const entries = Object.values(GAME_ASSET_REGISTRY).filter(
    (entry) => entry.category === "heroes" && entry.rarity === rarity
  );

  const mapped: HeroRepresentativeOption[] = entries.map((entry) => ({
    id: entry.id,
    nameVi: entry.inGameNameVi || entry.nameVi,
    nameEn: entry.inGameNameEn || entry.nameEn,
    iconPath: entry.iconPath,
    rarity,
    faction: entry.faction ?? "neutral",
  }));

  mapped.sort((a, b) => {
    if (a.id === defaultId) return -1;
    if (b.id === defaultId) return 1;
    return a.nameEn.localeCompare(b.nameEn);
  });

  return mapped;
}

export function clampPetalIndex(index: number): number {
  if (!Number.isFinite(index)) return 0;
  return Math.max(0, Math.min(75, Math.round(index)));
}

export function stateToPetalIndex(
  tier: HeroStarColorTier,
  starsInTier: number,
  petalsInNextStar: number
): number {
  if (tier === "none") return 0;

  const clampedStars = Math.max(0, Math.min(5, Math.round(starsInTier)));
  const clampedPetals =
    clampedStars >= 5
      ? 0
      : Math.max(0, Math.min(4, Math.round(petalsInNextStar)));

  const tierBaseStars =
    tier === "gold" ? 0 : tier === "red" ? 5 : 10;

  return clampPetalIndex((tierBaseStars + clampedStars) * 5 + clampedPetals);
}

export function petalIndexToState(rawIndex: number): HeroStarPositionState {
  const petalIndex = clampPetalIndex(rawIndex);
  const overallStarsCompleted = Math.floor(petalIndex / 5);
  const petalsInNextStar = petalIndex % 5;

  if (petalIndex === 0) {
    return {
      petalIndex: 0,
      tier: "none",
      starsInTier: 0,
      petalsInNextStar: 0,
      overallStarsCompleted: 0,
      nextStarColorTier: "gold",
      nextStarNumberInTier: 1,
    };
  }

  let tier: HeroStarColorTier;
  let starsInTier: number;

  if (
    overallStarsCompleted < 5 ||
    (overallStarsCompleted === 5 && petalsInNextStar === 0)
  ) {
    tier = "gold";
    starsInTier = overallStarsCompleted;
  } else if (
    overallStarsCompleted < 10 ||
    (overallStarsCompleted === 10 && petalsInNextStar === 0)
  ) {
    tier = "red";
    starsInTier = overallStarsCompleted - 5;
  } else {
    tier = "silver";
    starsInTier = overallStarsCompleted - 10;
  }

  const nextOverallStar = Math.min(15, overallStarsCompleted + 1);
  const nextStarColorTier: Exclude<HeroStarColorTier, "none"> =
    nextOverallStar <= 5 ? "gold" : nextOverallStar <= 10 ? "red" : "silver";
  const nextStarNumberInTier =
    nextOverallStar <= 5
      ? nextOverallStar
      : nextOverallStar <= 10
        ? nextOverallStar - 5
        : nextOverallStar - 10;

  return {
    petalIndex,
    tier,
    starsInTier,
    petalsInNextStar,
    overallStarsCompleted,
    nextStarColorTier,
    nextStarNumberInTier,
  };
}

export function formatStarTierName(
  tier: HeroStarColorTier,
  locale: CalculatorLocale
): string {
  if (tier === "none") {
    return locale === "vi" ? "0 Sao (Chưa nâng)" : "0 Stars (Base)";
  }
  if (tier === "gold") {
    return locale === "vi" ? "Sao Vàng" : "Gold Star";
  }
  if (tier === "red") {
    return locale === "vi" ? "Sao Đỏ" : "Red Star";
  }
  return locale === "vi" ? "Sao Bạc" : "Silver Star";
}

export function formatStarPositionSummary(
  state: HeroStarPositionState,
  locale: CalculatorLocale
): string {
  if (state.petalIndex === 0) {
    return locale === "vi"
      ? "0★ (Chưa nâng cánh nào)"
      : "0★ (0 Petals upgraded)";
  }

  const tierName = formatStarTierName(state.tier, locale);
  if (state.petalsInNextStar === 0) {
    return locale === "vi"
      ? `${state.starsInTier}★ ${tierName} (Trọn vẹn)`
      : `${state.starsInTier}★ ${tierName} (Complete)`;
  }

  const nextTierName = formatStarTierName(state.nextStarColorTier, locale);
  if (state.overallStarsCompleted === 0) {
    return locale === "vi"
      ? `0★ + ${state.petalsInNextStar}/5 Cánh (Đang nâng 1★ ${nextTierName})`
      : `0★ + ${state.petalsInNextStar}/5 Petals (Toward 1★ ${nextTierName})`;
  }

  return locale === "vi"
    ? `${state.starsInTier}★ ${tierName} + ${state.petalsInNextStar}/5 Cánh (Đang nâng ${state.nextStarNumberInTier}★ ${nextTierName})`
    : `${state.starsInTier}★ ${tierName} + ${state.petalsInNextStar}/5 Petals (Toward ${state.nextStarNumberInTier}★ ${nextTierName})`;
}

export function getCumulativeShardsAtPetal(
  petalCosts: readonly number[],
  petalIndex: number
): number {
  const clamped = clampPetalIndex(petalIndex);
  let sum = 0;
  for (let p = 0; p < clamped; p++) {
    const starIdx = Math.floor(p / 5);
    sum += petalCosts[starIdx] ?? 0;
  }
  return sum;
}

export function calculateHeroStarUpgrade(
  input: HeroStarCalculationInput
): HeroStarCalculationResult {
  const costProfile: HeroStarCostProfile = input.costProfile ?? "standard";
  const rarityConfig = HERO_STAR_RARITY_CONFIGS[input.rarity];
  const petalCosts = HERO_STAR_PETAL_COSTS[input.rarity][costProfile];

  const fromState = petalIndexToState(input.fromPetalIndex);
  const toState = petalIndexToState(input.toPetalIndex);

  const sanitizedOwned = Math.max(
    0,
    Math.min(999999, Math.floor(Number(input.ownedShards) || 0))
  );

  const alreadyInvestedShards = getCumulativeShardsAtPetal(
    petalCosts,
    fromState.petalIndex
  );
  const targetCumulativeShards = getCumulativeShardsAtPetal(
    petalCosts,
    toState.petalIndex
  );

  const currentStarIdx = Math.min(14, Math.floor(fromState.petalIndex / 5));
  const targetStarIdx = Math.min(
    14,
    Math.max(0, Math.floor((toState.petalIndex - 1) / 5))
  );

  if (fromState.petalIndex >= toState.petalIndex) {
    return {
      rarity: input.rarity,
      costProfile,
      fromState,
      toState,
      isInvalidRange: true,
      alreadyInvestedShards,
      targetCumulativeShards,
      requiredShards: 0,
      ownedShards: sanitizedOwned,
      missingShards: 0,
      surplusShards: sanitizedOwned,
      completionPercent: 100,
      currentCostPerPetal: petalCosts[currentStarIdx] ?? 0,
      targetCostPerPetal: petalCosts[targetStarIdx] ?? 0,
      universalShard: rarityConfig.universalShard,
      starStepsBreakdown: [],
    };
  }

  const requiredShards = targetCumulativeShards - alreadyInvestedShards;
  const missingShards = Math.max(0, requiredShards - sanitizedOwned);
  const surplusShards = Math.max(0, sanitizedOwned - requiredShards);
  const completionPercent =
    targetCumulativeShards > 0
      ? Math.min(
          100,
          Math.round(
            ((alreadyInvestedShards + Math.min(requiredShards, sanitizedOwned)) /
              targetCumulativeShards) *
              100
          )
        )
      : 100;

  const starStepsBreakdown: HeroStarStepBreakdownItem[] = [];
  let runningCumulative = alreadyInvestedShards;

  for (let starIdx = 0; starIdx < 15; starIdx++) {
    const starStartPetal = starIdx * 5;
    const starEndPetal = starStartPetal + 5;

    const overlapStart = Math.max(fromState.petalIndex, starStartPetal);
    const overlapEnd = Math.min(toState.petalIndex, starEndPetal);

    if (overlapEnd > overlapStart) {
      const petalsUsed = overlapEnd - overlapStart;
      const costPerPetal = petalCosts[starIdx] ?? 0;
      const starTotalShards = petalsUsed * costPerPetal;
      runningCumulative += starTotalShards;

      const overallStarNumber = starIdx + 1;
      const colorTier: Exclude<HeroStarColorTier, "none"> =
        overallStarNumber <= 5
          ? "gold"
          : overallStarNumber <= 10
            ? "red"
            : "silver";
      const starNumberInTier =
        overallStarNumber <= 5
          ? overallStarNumber
          : overallStarNumber <= 10
            ? overallStarNumber - 5
            : overallStarNumber - 10;

      const tierNameVi =
        colorTier === "gold"
          ? "Sao Vàng"
          : colorTier === "red"
            ? "Sao Đỏ"
            : "Sao Bạc";
      const tierNameEn =
        colorTier === "gold"
          ? "Gold Star"
          : colorTier === "red"
            ? "Red Star"
            : "Silver Star";

      starStepsBreakdown.push({
        overallStarNumber,
        colorTier,
        starNumberInTier,
        starLabel: {
          vi: `${starNumberInTier}★ ${tierNameVi} (#${overallStarNumber}★)`,
          en: `${starNumberInTier}★ ${tierNameEn} (#${overallStarNumber}★)`,
        },
        startPetalInStar: overlapStart - starStartPetal + 1,
        endPetalInStar: overlapEnd - starStartPetal,
        petalsUsed,
        costPerPetal,
        starTotalShards,
        cumulativeShardsAtStepEnd: runningCumulative,
        milestoneNote:
          overlapEnd === starEndPetal
            ? HERO_STAR_MILESTONES[overallStarNumber]
            : undefined,
      });
    }
  }

  return {
    rarity: input.rarity,
    costProfile,
    fromState,
    toState,
    isInvalidRange: false,
    alreadyInvestedShards,
    targetCumulativeShards,
    requiredShards,
    ownedShards: sanitizedOwned,
    missingShards,
    surplusShards,
    completionPercent,
    currentCostPerPetal: petalCosts[currentStarIdx] ?? 0,
    targetCostPerPetal: petalCosts[targetStarIdx] ?? 0,
    universalShard: rarityConfig.universalShard,
    starStepsBreakdown,
  };
}

import { CALCULATOR_MATERIALS } from "./registry";
import type { CalculatorLocale, CalculatorMaterialRef } from "./types";

export type GearPromotionStarBracket = 0 | 1 | 2 | 3 | 4 | 5;
export type GearPromotionSubTier = 0 | 1 | 2 | 3 | 4 | 5;
export type GearGoldenSetId =
  | "fury_of_blood"
  | "titans_might"
  | "glorious_light";

export const MIN_GEAR_PROMOTION_STEP = 0;
export const MAX_GEAR_PROMOTION_STEP = 25;
export const BASE_LV40_ENHANCE_RUNES_PER_PIECE = 195_000;
export const BASE_LV40_ENHANCE_MEAT_PER_PIECE = 936_000;

export interface GearGoldenSetConfig {
  readonly id: GearGoldenSetId;
  readonly roleLabel: Record<CalculatorLocale, string>;
  readonly legendaryName: Record<CalculatorLocale, string>;
  readonly mythicName: Record<CalculatorLocale, string>;
  readonly iconPath: string;
  readonly factionMarkBonus: Record<CalculatorLocale, string>;
  readonly specialEffect: Record<CalculatorLocale, string>;
}

export interface GearPromotionStepNode {
  readonly stepIndex: number;
  readonly starBracket: GearPromotionStarBracket;
  readonly subTier: GearPromotionSubTier;
  readonly rarity: "legendary" | "mythic";
  readonly label: Record<CalculatorLocale, string>;
  readonly shortLabel: Record<CalculatorLocale, string>;
  readonly stepSolarGold: number;
  readonly stepRunes: number;
  readonly stepMeat: number;
  readonly stepLegendaryStones: number;
  readonly stepMythicStones: number;
  readonly stepLegendaryFodder: number;
  readonly cumulativeSolarGold: number;
  readonly cumulativeRunes: number;
  readonly cumulativeMeat: number;
  readonly cumulativeLegendaryStones: number;
  readonly cumulativeMythicStones: number;
  readonly cumulativeLegendaryFodder: number;
  readonly isStarBreakthrough: boolean;
  readonly breakthroughNote?: Record<CalculatorLocale, string>;
}

export interface GearPromotionStarBreakdownItem {
  readonly starBracket: 1 | 2 | 3 | 4 | 5;
  readonly rarity: "legendary" | "mythic";
  readonly label: Record<CalculatorLocale, string>;
  readonly startStepIndex: number;
  readonly endStepIndex: number;
  readonly solarGoldPerPiece: number;
  readonly runesPerPiece: number;
  readonly meatPerPiece: number;
  readonly legendaryStonesPerPiece: number;
  readonly mythicStonesPerPiece: number;
  readonly fodderPerPiece: number;
  readonly totalSolarGold: number;
  readonly totalRunes: number;
  readonly totalMeat: number;
  readonly totalLegendaryStones: number;
  readonly totalMythicStones: number;
  readonly totalFodder: number;
}

export interface MythicMasterAttributeTier {
  readonly tierIndex: number;
  readonly label: Record<CalculatorLocale, string>;
  readonly masterAttributesPercent: string;
  readonly defenseBreak: number;
  readonly initialUltCdReduced: string;
  readonly enemyUltCdReduced: string;
  readonly heroAttackPercent: string;
  readonly heroHpPercent: string;
}

export interface GearPromotionCalculationInput {
  readonly fromStepIndex: number;
  readonly toStepIndex: number;
  readonly pieceCount: number;
  readonly goldenSetId: GearGoldenSetId;
  readonly includeBaseLv40Enhance?: boolean;
  readonly ownedSolarGold?: number;
  readonly ownedRunes?: number;
  readonly ownedLegendaryStones?: number;
  readonly ownedMythicStones?: number;
  readonly ownedMeat?: number;
}

export interface GearPromotionCalculationResult {
  readonly fromNode: GearPromotionStepNode;
  readonly toNode: GearPromotionStepNode;
  readonly pieceCount: number;
  readonly goldenSet: GearGoldenSetConfig;
  readonly includeBaseLv40Enhance: boolean;
  readonly isInvalidRange: boolean;
  readonly promotionOnlyRunes: number;
  readonly baseEnhanceRunesAdded: number;
  readonly promotionOnlyMeat: number;
  readonly baseEnhanceMeatAdded: number;
  readonly requiredSolarGold: number;
  readonly requiredRunes: number;
  readonly requiredLegendaryStones: number;
  readonly requiredMythicStones: number;
  readonly requiredMeat: number;
  readonly requiredLegendaryFodder: number;
  readonly ownedSolarGold: number;
  readonly ownedRunes: number;
  readonly ownedLegendaryStones: number;
  readonly ownedMythicStones: number;
  readonly ownedMeat: number;
  readonly missingSolarGold: number;
  readonly missingRunes: number;
  readonly missingLegendaryStones: number;
  readonly missingMythicStones: number;
  readonly missingMeat: number;
  readonly surplusSolarGold: number;
  readonly surplusRunes: number;
  readonly surplusLegendaryStones: number;
  readonly surplusMythicStones: number;
  readonly surplusMeat: number;
  readonly solarGoldCompletionPercent: number;
  readonly runeCompletionPercent: number;
  readonly legendaryStoneCompletionPercent: number;
  readonly mythicStoneCompletionPercent: number;
  readonly meatCompletionPercent: number;
  readonly solarGoldMaterial: CalculatorMaterialRef;
  readonly runeMaterial: CalculatorMaterialRef;
  readonly legendaryStoneMaterial: CalculatorMaterialRef;
  readonly mythicStoneMaterial: CalculatorMaterialRef;
  readonly meatMaterial: CalculatorMaterialRef;
  readonly starBreakdown: readonly GearPromotionStarBreakdownItem[];
}

export const GEAR_GOLDEN_SETS: Readonly<
  Record<GearGoldenSetId, GearGoldenSetConfig>
> = {
  fury_of_blood: {
    id: "fury_of_blood",
    roleLabel: {
      vi: "Sát Thương Chủ Lực (DPS / Carry)",
      en: "Hyper-Carry / Burst DPS",
    },
    legendaryName: {
      vi: "Kỵ Sĩ Vinh Quang (Bộ Quyết Đấu)",
      en: "Knight's Glory (Duelist's Set)",
    },
    mythicName: {
      vi: "Cơn Thịnh Nộ (Fury of Blood)",
      en: "Fury of Blood (Mythic Red)",
    },
    iconPath: "/images/equipment/hero-gear/icon_40005.webp",
    factionMarkBonus: {
      vi: "Ấn Phe tăng từ +20% (Cam) lên +30% (Đỏ Thần Thoại)",
      en: "Faction Mark Bonus jumps from +20% (Legendary) to +30% (Mythic Red)",
    },
    specialEffect: {
      vi: "Khuếch đại Sát Thương Kỹ Năng, Tỷ Lệ Bạo Kích và mở khóa Phá Giáp (Defense Break) + Giảm Hồi Chiêu Tuyệt Kỹ Khởi Đầu.",
      en: "Amplifies Skill Damage and Crit Rate while unlocking Defense Break and Initial Ultimate Skill Cooldown Reduction.",
    },
  },
  titans_might: {
    id: "titans_might",
    roleLabel: {
      vi: "Đỡ Đòn Tiền Tuyến (Main Tank)",
      en: "Frontline Main Tank / Bruiser",
    },
    legendaryName: {
      vi: "Huyết Titan (Bộ Kỵ Sĩ)",
      en: "Blood of the Titan (Knight Set)",
    },
    mythicName: {
      vi: "Uy Lực Titan (Titan's Might)",
      en: "Titan's Might (Mythic Red)",
    },
    iconPath: "/images/equipment/hero-gear/icon_40013.webp",
    factionMarkBonus: {
      vi: "Ấn Phe tăng từ +20% (Cam) lên +30% (Đỏ Thần Thoại)",
      en: "Faction Mark Bonus jumps from +20% (Legendary) to +30% (Mythic Red)",
    },
    specialEffect: {
      vi: "Tạo Khiên Máu (HP Shield) khổng lồ khi vào trận, tăng Giảm Sát Thương và mở khóa Giảm Hồi Chiêu Tuyệt Kỹ Kẻ Địch.",
      en: "Grants massive opening HP Shields, boosts Damage Reduction, and unlocks Enemy Ultimate Skill Cooldown Reduction.",
    },
  },
  glorious_light: {
    id: "glorious_light",
    roleLabel: {
      vi: "Hỗ Trợ & Hồi Máu (Healer / Support)",
      en: "Healer, Support & Controller",
    },
    legendaryName: {
      vi: "Hiền Triết Quang Vinh (Bộ Hiền Giả)",
      en: "Glory of the Sage (Sage Set)",
    },
    mythicName: {
      vi: "Ánh Sáng Vinh Quang (Glorious Light)",
      en: "Glorious Light (Mythic Red)",
    },
    iconPath: "/images/equipment/hero-gear/icon_40009.webp",
    factionMarkBonus: {
      vi: "Ấn Phe tăng từ +20% (Cam) lên +30% (Đỏ Thần Thoại)",
      en: "Faction Mark Bonus jumps from +20% (Legendary) to +30% (Mythic Red)",
    },
    specialEffect: {
      vi: "Tăng Tốc Đánh, Hồi Năng Lượng và rút ngắn thời gian tung Tuyệt Kỹ đầu tiên cho dàn tướng Hỗ Trợ / Hồi Máu.",
      en: "Boosts Attack Speed, Energy Regen, and accelerates the first Ultimate cast for Healers and Supports.",
    },
  },
};

interface StarBracketTemplate {
  readonly starBracket: 1 | 2 | 3 | 4 | 5;
  readonly rarity: "legendary" | "mythic";
  readonly solarGoldPerSubTier: number;
  readonly runesPerSubTier: number;
  readonly meatPerSubTier1To4: number;
  readonly legendaryStonesAtTier5: number;
  readonly mythicStonesAtTier5: number;
  readonly bracketTitle: Record<CalculatorLocale, string>;
  readonly breakthroughNote: Record<CalculatorLocale, string>;
}

const STAR_BRACKET_TEMPLATES: readonly StarBracketTemplate[] = [
  {
    starBracket: 1,
    rarity: "legendary",
    solarGoldPerSubTier: 150,
    runesPerSubTier: 12_500,
    meatPerSubTier1To4: 750_000,
    legendaryStonesAtTier5: 5,
    mythicStonesAtTier5: 0,
    bracketTitle: {
      vi: "1★ Cam (Huyền Thoại)",
      en: "1★ Legendary",
    },
    breakthroughNote: {
      vi: "Đột phá Sao 1★ Cam (Tốn 5 Đá Đột Phá Cam)",
      en: "1★ Legendary Breakthrough (Costs 5 Legendary Promotion Stones)",
    },
  },
  {
    starBracket: 2,
    rarity: "legendary",
    solarGoldPerSubTier: 195,
    runesPerSubTier: 16_250,
    meatPerSubTier1To4: 975_000,
    legendaryStonesAtTier5: 10,
    mythicStonesAtTier5: 0,
    bracketTitle: {
      vi: "2★ Cam (Huyền Thoại)",
      en: "2★ Legendary",
    },
    breakthroughNote: {
      vi: "Đột phá Sao 2★ Cam (Tốn 10 Đá Đột Phá Cam)",
      en: "2★ Legendary Breakthrough (Costs 10 Legendary Promotion Stones)",
    },
  },
  {
    starBracket: 3,
    rarity: "legendary",
    solarGoldPerSubTier: 240,
    runesPerSubTier: 20_000,
    meatPerSubTier1To4: 1_200_000,
    legendaryStonesAtTier5: 15,
    mythicStonesAtTier5: 0,
    bracketTitle: {
      vi: "3★ Cam (Huyền Thoại)",
      en: "3★ Legendary",
    },
    breakthroughNote: {
      vi: "Đột phá Sao 3★ Cam (Tốn 15 Đá Đột Phá Cam)",
      en: "3★ Legendary Breakthrough (Costs 15 Legendary Promotion Stones)",
    },
  },
  {
    starBracket: 4,
    rarity: "legendary",
    solarGoldPerSubTier: 285,
    runesPerSubTier: 23_750,
    meatPerSubTier1To4: 1_420_000,
    legendaryStonesAtTier5: 20,
    mythicStonesAtTier5: 0,
    bracketTitle: {
      vi: "4★ Cam (Đỉnh Huyền Thoại)",
      en: "4★ Legendary (Pre-Mythic Cap)",
    },
    breakthroughNote: {
      vi: "Đột phá Sao 4★ Cam (Tốn 20 Đá Đột Phá Cam • Sẵn sàng Hóa Đỏ)",
      en: "4★ Legendary Breakthrough (Costs 20 Legendary Promotion Stones • Ready for Mythic)",
    },
  },
  {
    starBracket: 5,
    rarity: "mythic",
    solarGoldPerSubTier: 330,
    runesPerSubTier: 27_500,
    meatPerSubTier1To4: 1_650_000,
    legendaryStonesAtTier5: 0,
    mythicStonesAtTier5: 10,
    bracketTitle: {
      vi: "5★ Đỏ (Hóa Đỏ Thần Thoại / Mythic)",
      en: "5★ Mythic Red (Mythic Ascension)",
    },
    breakthroughNote: {
      vi: "Tiến hóa Đồ Đỏ Thần Thoại (Tốn 10 Đá Đột Phá Đỏ • Mở Phá Giáp & +30% Ấn Phe)",
      en: "Mythic Red Ascension (Costs 10 Mythic Promotion Stones • Unlocks Defense Break & +30% Faction Mark)",
    },
  },
];

function buildGearPromotionSteps(): readonly GearPromotionStepNode[] {
  const steps: GearPromotionStepNode[] = [
    {
      stepIndex: 0,
      starBracket: 0,
      subTier: 0,
      rarity: "legendary",
      label: {
        vi: "0★ Cam • Gốc Lv.40 (Chưa đột phá)",
        en: "0★ Legendary • Base Lv.40 (Unpromoted)",
      },
      shortLabel: {
        vi: "0★ Cam (Gốc)",
        en: "0★ Base",
      },
      stepSolarGold: 0,
      stepRunes: 0,
      stepMeat: 0,
      stepLegendaryStones: 0,
      stepMythicStones: 0,
      stepLegendaryFodder: 0,
      cumulativeSolarGold: 0,
      cumulativeRunes: 0,
      cumulativeMeat: 0,
      cumulativeLegendaryStones: 0,
      cumulativeMythicStones: 0,
      cumulativeLegendaryFodder: 0,
      isStarBreakthrough: false,
    },
  ];

  let cumSolarGold = 0;
  let cumRunes = 0;
  let cumMeat = 0;
  let cumLegStones = 0;
  let cumMythStones = 0;
  let cumFodder = 0;

  for (const tpl of STAR_BRACKET_TEMPLATES) {
    for (let sub = 1; sub <= 5; sub++) {
      const subTier = sub as GearPromotionSubTier;
      const stepIndex = (tpl.starBracket - 1) * 5 + sub;
      const isBreakthrough = subTier === 5;

      const stepSolarGold = tpl.solarGoldPerSubTier;
      const stepRunes = tpl.runesPerSubTier;
      const stepMeat = isBreakthrough ? 0 : tpl.meatPerSubTier1To4;
      const stepLegendaryStones = isBreakthrough
        ? tpl.legendaryStonesAtTier5
        : 0;
      const stepMythicStones = isBreakthrough ? tpl.mythicStonesAtTier5 : 0;
      const stepLegendaryFodder = isBreakthrough ? 1 : 0;

      cumSolarGold += stepSolarGold;
      cumRunes += stepRunes;
      cumMeat += stepMeat;
      cumLegStones += stepLegendaryStones;
      cumMythStones += stepMythicStones;
      cumFodder += stepLegendaryFodder;

      const starColorVi = tpl.rarity === "mythic" ? "Đỏ" : "Cam";
      const starColorEn = tpl.rarity === "mythic" ? "Mythic" : "Legendary";

      steps.push({
        stepIndex,
        starBracket: tpl.starBracket,
        subTier,
        rarity: tpl.rarity,
        label: {
          vi: `${tpl.starBracket}★ ${starColorVi} • Tiểu bậc ${subTier}/5${
            isBreakthrough ? " (Đột Phá Sao)" : ""
          }`,
          en: `${tpl.starBracket}★ ${starColorEn} • Tier ${subTier}/5${
            isBreakthrough ? " (Breakthrough)" : ""
          }`,
        },
        shortLabel: {
          vi: `${tpl.starBracket}★ ${starColorVi} (${subTier}/5)`,
          en: `${tpl.starBracket}★ ${starColorEn} (${subTier}/5)`,
        },
        stepSolarGold,
        stepRunes,
        stepMeat,
        stepLegendaryStones,
        stepMythicStones,
        stepLegendaryFodder,
        cumulativeSolarGold: cumSolarGold,
        cumulativeRunes: cumRunes,
        cumulativeMeat: cumMeat,
        cumulativeLegendaryStones: cumLegStones,
        cumulativeMythicStones: cumMythStones,
        cumulativeLegendaryFodder: cumFodder,
        isStarBreakthrough: isBreakthrough,
        breakthroughNote: isBreakthrough ? tpl.breakthroughNote : undefined,
      });
    }
  }

  return steps;
}

export const GEAR_PROMOTION_STEPS: readonly GearPromotionStepNode[] =
  buildGearPromotionSteps();

export const MYTHIC_MASTER_ATTRIBUTE_TIERS: readonly MythicMasterAttributeTier[] =
  [
    {
      tierIndex: 1,
      label: { vi: "Mốc 1 (Khởi điểm Đồ Đỏ)", en: "Tier 1 (Base Mythic)" },
      masterAttributesPercent: "60.00%",
      defenseBreak: 130,
      initialUltCdReduced: "0.20%",
      enemyUltCdReduced: "0.10%",
      heroAttackPercent: "1.50%",
      heroHpPercent: "2.50%",
    },
    {
      tierIndex: 2,
      label: { vi: "Mốc 2", en: "Tier 2" },
      masterAttributesPercent: "61.90%",
      defenseBreak: 250,
      initialUltCdReduced: "0.30%",
      enemyUltCdReduced: "0.15%",
      heroAttackPercent: "2.50%",
      heroHpPercent: "5.00%",
    },
    {
      tierIndex: 3,
      label: { vi: "Mốc 3", en: "Tier 3" },
      masterAttributesPercent: "63.80%",
      defenseBreak: 380,
      initialUltCdReduced: "0.50%",
      enemyUltCdReduced: "0.25%",
      heroAttackPercent: "4.00%",
      heroHpPercent: "7.50%",
    },
    {
      tierIndex: 4,
      label: { vi: "Mốc 4 (1★ Thần Thoại)", en: "Tier 4 (1★ Mythic)" },
      masterAttributesPercent: "65.70%",
      defenseBreak: 500,
      initialUltCdReduced: "0.60%",
      enemyUltCdReduced: "0.30%",
      heroAttackPercent: "5.00%",
      heroHpPercent: "10.00%",
    },
    {
      tierIndex: 5,
      label: { vi: "Mốc 5", en: "Tier 5" },
      masterAttributesPercent: "67.60%",
      defenseBreak: 630,
      initialUltCdReduced: "0.80%",
      enemyUltCdReduced: "0.40%",
      heroAttackPercent: "6.50%",
      heroHpPercent: "12.50%",
    },
    {
      tierIndex: 6,
      label: { vi: "Mốc 6", en: "Tier 6" },
      masterAttributesPercent: "69.50%",
      defenseBreak: 750,
      initialUltCdReduced: "0.90%",
      enemyUltCdReduced: "0.45%",
      heroAttackPercent: "7.50%",
      heroHpPercent: "15.00%",
    },
    {
      tierIndex: 7,
      label: { vi: "Mốc 7 (2★ Thần Thoại)", en: "Tier 7 (2★ Mythic)" },
      masterAttributesPercent: "71.55%",
      defenseBreak: 890,
      initialUltCdReduced: "1.10%",
      enemyUltCdReduced: "0.55%",
      heroAttackPercent: "9.00%",
      heroHpPercent: "18.00%",
    },
    {
      tierIndex: 8,
      label: { vi: "Mốc 8", en: "Tier 8" },
      masterAttributesPercent: "73.60%",
      defenseBreak: 1_020,
      initialUltCdReduced: "1.30%",
      enemyUltCdReduced: "0.65%",
      heroAttackPercent: "10.00%",
      heroHpPercent: "20.50%",
    },
    {
      tierIndex: 9,
      label: { vi: "Mốc 9", en: "Tier 9" },
      masterAttributesPercent: "75.65%",
      defenseBreak: 1_160,
      initialUltCdReduced: "1.40%",
      enemyUltCdReduced: "0.70%",
      heroAttackPercent: "11.50%",
      heroHpPercent: "23.00%",
    },
    {
      tierIndex: 10,
      label: { vi: "Mốc 10 (3★ Thần Thoại)", en: "Tier 10 (3★ Mythic)" },
      masterAttributesPercent: "77.70%",
      defenseBreak: 1_290,
      initialUltCdReduced: "1.60%",
      enemyUltCdReduced: "0.80%",
      heroAttackPercent: "13.00%",
      heroHpPercent: "26.00%",
    },
    {
      tierIndex: 11,
      label: { vi: "Mốc 11", en: "Tier 11" },
      masterAttributesPercent: "79.75%",
      defenseBreak: 1_420,
      initialUltCdReduced: "1.80%",
      enemyUltCdReduced: "0.90%",
      heroAttackPercent: "14.00%",
      heroHpPercent: "28.50%",
    },
    {
      tierIndex: 12,
      label: { vi: "Mốc 12", en: "Tier 12" },
      masterAttributesPercent: "81.90%",
      defenseBreak: 1_570,
      initialUltCdReduced: "2.00%",
      enemyUltCdReduced: "1.00%",
      heroAttackPercent: "15.50%",
      heroHpPercent: "31.50%",
    },
    {
      tierIndex: 13,
      label: { vi: "Mốc 13 (4★ Thần Thoại)", en: "Tier 13 (4★ Mythic)" },
      masterAttributesPercent: "84.05%",
      defenseBreak: 1_710,
      initialUltCdReduced: "2.10%",
      enemyUltCdReduced: "1.05%",
      heroAttackPercent: "17.00%",
      heroHpPercent: "34.00%",
    },
    {
      tierIndex: 14,
      label: { vi: "Mốc 14", en: "Tier 14" },
      masterAttributesPercent: "86.20%",
      defenseBreak: 1_850,
      initialUltCdReduced: "2.30%",
      enemyUltCdReduced: "1.15%",
      heroAttackPercent: "18.50%",
      heroHpPercent: "37.00%",
    },
    {
      tierIndex: 15,
      label: { vi: "Mốc 15", en: "Tier 15" },
      masterAttributesPercent: "88.35%",
      defenseBreak: 1_990,
      initialUltCdReduced: "2.50%",
      enemyUltCdReduced: "1.25%",
      heroAttackPercent: "20.00%",
      heroHpPercent: "40.00%",
    },
    {
      tierIndex: 16,
      label: { vi: "Mốc 16", en: "Tier 16" },
      masterAttributesPercent: "90.50%",
      defenseBreak: 2_140,
      initialUltCdReduced: "2.70%",
      enemyUltCdReduced: "1.35%",
      heroAttackPercent: "21.50%",
      heroHpPercent: "42.50%",
    },
    {
      tierIndex: 17,
      label: { vi: "Mốc 17", en: "Tier 17" },
      masterAttributesPercent: "92.80%",
      defenseBreak: 2_290,
      initialUltCdReduced: "2.90%",
      enemyUltCdReduced: "1.45%",
      heroAttackPercent: "23.00%",
      heroHpPercent: "45.50%",
    },
    {
      tierIndex: 18,
      label: {
        vi: "Mốc 18 (Đỉnh 5★ Đỏ Thần Thoại)",
        en: "Tier 18 (Max 5★ Mythic Cap)",
      },
      masterAttributesPercent: "95.25%",
      defenseBreak: 2_450,
      initialUltCdReduced: "3.10%",
      enemyUltCdReduced: "1.55%",
      heroAttackPercent: "24.50%",
      heroHpPercent: "49.00%",
    },
  ] as const;

export function clampGearPromotionStep(stepIndex: number): number {
  if (!Number.isFinite(stepIndex)) return MIN_GEAR_PROMOTION_STEP;
  return Math.max(
    MIN_GEAR_PROMOTION_STEP,
    Math.min(MAX_GEAR_PROMOTION_STEP, Math.floor(stepIndex))
  );
}

function calcCompletionPercent(owned: number, required: number): number {
  if (required <= 0) return 100;
  return Math.min(100, Math.floor((owned / required) * 100));
}

export function calculateGearPromotion(
  input: GearPromotionCalculationInput
): GearPromotionCalculationResult {
  const safeFromStep = clampGearPromotionStep(input.fromStepIndex);
  const safeToStep = clampGearPromotionStep(input.toStepIndex);
  const safePieceCount = Math.max(1, Math.min(24, Math.floor(input.pieceCount || 1)));
  const goldenSet = GEAR_GOLDEN_SETS[input.goldenSetId];
  const includeBaseLv40Enhance = Boolean(input.includeBaseLv40Enhance);

  const safeOwnedSolarGold = Math.max(0, Math.floor(input.ownedSolarGold ?? 0));
  const safeOwnedRunes = Math.max(0, Math.floor(input.ownedRunes ?? 0));
  const safeOwnedLegendaryStones = Math.max(
    0,
    Math.floor(input.ownedLegendaryStones ?? 0)
  );
  const safeOwnedMythicStones = Math.max(
    0,
    Math.floor(input.ownedMythicStones ?? 0)
  );
  const safeOwnedMeat = Math.max(0, Math.floor(input.ownedMeat ?? 0));

  const fromNode = GEAR_PROMOTION_STEPS[safeFromStep];
  const toNode = GEAR_PROMOTION_STEPS[safeToStep];
  const isInvalidRange = safeFromStep > safeToStep;

  const diffSolarGoldPerPiece = isInvalidRange
    ? 0
    : toNode.cumulativeSolarGold - fromNode.cumulativeSolarGold;
  const diffRunesPerPiece = isInvalidRange
    ? 0
    : toNode.cumulativeRunes - fromNode.cumulativeRunes;
  const diffMeatPerPiece = isInvalidRange
    ? 0
    : toNode.cumulativeMeat - fromNode.cumulativeMeat;
  const diffLegStonesPerPiece = isInvalidRange
    ? 0
    : toNode.cumulativeLegendaryStones - fromNode.cumulativeLegendaryStones;
  const diffMythStonesPerPiece = isInvalidRange
    ? 0
    : toNode.cumulativeMythicStones - fromNode.cumulativeMythicStones;
  const diffFodderPerPiece = isInvalidRange
    ? 0
    : toNode.cumulativeLegendaryFodder - fromNode.cumulativeLegendaryFodder;

  const promotionOnlyRunes = diffRunesPerPiece * safePieceCount;
  const baseEnhanceRunesAdded =
    !isInvalidRange && includeBaseLv40Enhance
      ? BASE_LV40_ENHANCE_RUNES_PER_PIECE * safePieceCount
      : 0;

  const promotionOnlyMeat = diffMeatPerPiece * safePieceCount;
  const baseEnhanceMeatAdded =
    !isInvalidRange && includeBaseLv40Enhance
      ? BASE_LV40_ENHANCE_MEAT_PER_PIECE * safePieceCount
      : 0;

  const requiredSolarGold = diffSolarGoldPerPiece * safePieceCount;
  const requiredRunes = promotionOnlyRunes + baseEnhanceRunesAdded;
  const requiredLegendaryStones = diffLegStonesPerPiece * safePieceCount;
  const requiredMythicStones = diffMythStonesPerPiece * safePieceCount;
  const requiredMeat = promotionOnlyMeat + baseEnhanceMeatAdded;
  const requiredLegendaryFodder = diffFodderPerPiece * safePieceCount;

  const missingSolarGold = Math.max(0, requiredSolarGold - safeOwnedSolarGold);
  const missingRunes = Math.max(0, requiredRunes - safeOwnedRunes);
  const missingLegendaryStones = Math.max(
    0,
    requiredLegendaryStones - safeOwnedLegendaryStones
  );
  const missingMythicStones = Math.max(
    0,
    requiredMythicStones - safeOwnedMythicStones
  );
  const missingMeat = Math.max(0, requiredMeat - safeOwnedMeat);

  const surplusSolarGold = Math.max(0, safeOwnedSolarGold - requiredSolarGold);
  const surplusRunes = Math.max(0, safeOwnedRunes - requiredRunes);
  const surplusLegendaryStones = Math.max(
    0,
    safeOwnedLegendaryStones - requiredLegendaryStones
  );
  const surplusMythicStones = Math.max(
    0,
    safeOwnedMythicStones - requiredMythicStones
  );
  const surplusMeat = Math.max(0, safeOwnedMeat - requiredMeat);

  const starBreakdown: GearPromotionStarBreakdownItem[] =
    STAR_BRACKET_TEMPLATES.map((tpl) => {
      const startStepIndex = (tpl.starBracket - 1) * 5 + 1;
      const endStepIndex = tpl.starBracket * 5;
      const prevNode = GEAR_PROMOTION_STEPS[startStepIndex - 1];
      const endNode = GEAR_PROMOTION_STEPS[endStepIndex];

      const solarGoldPerPiece =
        endNode.cumulativeSolarGold - prevNode.cumulativeSolarGold;
      const runesPerPiece = endNode.cumulativeRunes - prevNode.cumulativeRunes;
      const meatPerPiece = endNode.cumulativeMeat - prevNode.cumulativeMeat;
      const legendaryStonesPerPiece =
        endNode.cumulativeLegendaryStones - prevNode.cumulativeLegendaryStones;
      const mythicStonesPerPiece =
        endNode.cumulativeMythicStones - prevNode.cumulativeMythicStones;
      const fodderPerPiece =
        endNode.cumulativeLegendaryFodder - prevNode.cumulativeLegendaryFodder;

      return {
        starBracket: tpl.starBracket,
        rarity: tpl.rarity,
        label: tpl.bracketTitle,
        startStepIndex,
        endStepIndex,
        solarGoldPerPiece,
        runesPerPiece,
        meatPerPiece,
        legendaryStonesPerPiece,
        mythicStonesPerPiece,
        fodderPerPiece,
        totalSolarGold: solarGoldPerPiece * safePieceCount,
        totalRunes: runesPerPiece * safePieceCount,
        totalMeat: meatPerPiece * safePieceCount,
        totalLegendaryStones: legendaryStonesPerPiece * safePieceCount,
        totalMythicStones: mythicStonesPerPiece * safePieceCount,
        totalFodder: fodderPerPiece * safePieceCount,
      };
    });

  return {
    fromNode,
    toNode,
    pieceCount: safePieceCount,
    goldenSet,
    includeBaseLv40Enhance,
    isInvalidRange,
    promotionOnlyRunes,
    baseEnhanceRunesAdded,
    promotionOnlyMeat,
    baseEnhanceMeatAdded,
    requiredSolarGold,
    requiredRunes,
    requiredLegendaryStones,
    requiredMythicStones,
    requiredMeat,
    requiredLegendaryFodder,
    ownedSolarGold: safeOwnedSolarGold,
    ownedRunes: safeOwnedRunes,
    ownedLegendaryStones: safeOwnedLegendaryStones,
    ownedMythicStones: safeOwnedMythicStones,
    ownedMeat: safeOwnedMeat,
    missingSolarGold,
    missingRunes,
    missingLegendaryStones,
    missingMythicStones,
    missingMeat,
    surplusSolarGold,
    surplusRunes,
    surplusLegendaryStones,
    surplusMythicStones,
    surplusMeat,
    solarGoldCompletionPercent: calcCompletionPercent(
      safeOwnedSolarGold,
      requiredSolarGold
    ),
    runeCompletionPercent: calcCompletionPercent(safeOwnedRunes, requiredRunes),
    legendaryStoneCompletionPercent: calcCompletionPercent(
      safeOwnedLegendaryStones,
      requiredLegendaryStones
    ),
    mythicStoneCompletionPercent: calcCompletionPercent(
      safeOwnedMythicStones,
      requiredMythicStones
    ),
    meatCompletionPercent: calcCompletionPercent(safeOwnedMeat, requiredMeat),
    solarGoldMaterial: CALCULATOR_MATERIALS.solarGoldIngot,
    runeMaterial: CALCULATOR_MATERIALS.gearEnhanceRune,
    legendaryStoneMaterial: CALCULATOR_MATERIALS.legendaryPromotionStone,
    mythicStoneMaterial: CALCULATOR_MATERIALS.mythicPromotionStone,
    meatMaterial: CALCULATOR_MATERIALS.meat,
    starBreakdown,
  };
}

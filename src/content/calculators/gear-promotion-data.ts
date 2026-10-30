import { CALCULATOR_MATERIALS } from "./registry";
import type { CalculatorLocale, CalculatorMaterialRef } from "./types";

export type GearPromotionStarBracket = 0 | 1 | 2 | 3 | 4 | 5;
export type GearPromotionPetalIndex = 0 | 1 | 2 | 3 | 4 | 5;
export type GearPromotionStarColor = "none" | "gold" | "red";

export type GearPromotionSetId =
  | "knights_glory"
  | "titans_might"
  | "fury_of_blood"
  | "commanders_set";

export type GearPromotionSlotId = "weapon" | "boots" | "armor" | "helmet";

export type GearPromotionMaterialKey =
  | "solarGold"
  | "enhanceRune"
  | "legendaryStone"
  | "mythicStone"
  | "ruby";

export const MIN_GEAR_PROMOTION_STEP = 0;
export const MAX_GEAR_PROMOTION_STEP = 25;

export const GEAR_PROMOTION_SET_ORDER: readonly GearPromotionSetId[] = [
  "knights_glory",
  "titans_might",
  "fury_of_blood",
  "commanders_set",
] as const;

export const GEAR_PROMOTION_SLOT_ORDER: readonly GearPromotionSlotId[] = [
  "weapon",
  "boots",
  "armor",
  "helmet",
] as const;

export const GEAR_PROMOTION_MATERIAL_ORDER: readonly GearPromotionMaterialKey[] =
  [
    "solarGold",
    "enhanceRune",
    "legendaryStone",
    "mythicStone",
    "ruby",
  ] as const;

export const GEAR_PROMOTION_STAR_MILESTONES: readonly number[] = [
  0, 5, 10, 15, 20, 25,
] as const;

export interface GearPromotionPieceItemMeta {
  readonly gameId: number;
  readonly slotId: GearPromotionSlotId;
  readonly itemName: Readonly<Record<CalculatorLocale, string>>;
  readonly legendaryIconPath: string;
  readonly mythicIconPath: string;
  readonly baseAtkAtLv40: number;
  readonly baseHpAtLv40: number;
  readonly bonusStatLabel: Readonly<Record<CalculatorLocale, string>>;
  readonly bonusStatValue: string;
}

export interface GearPromotionSetMeta {
  readonly id: GearPromotionSetId;
  readonly suitId: number;
  readonly setName: Readonly<Record<CalculatorLocale, string>>;
  readonly shortName: Readonly<Record<CalculatorLocale, string>>;
  readonly roleBadge: Readonly<Record<CalculatorLocale, string>>;
  readonly sampleLegendaryIconPath: string;
  readonly sampleMythicIconPath: string;
  readonly suitBonusBase: Readonly<Record<CalculatorLocale, string>>;
  readonly suitBonusLv40: Readonly<Record<CalculatorLocale, string>>;
  readonly suitBonusMythic5Star: Readonly<Record<CalculatorLocale, string>>;
  readonly items: Readonly<Record<GearPromotionSlotId, GearPromotionPieceItemMeta>>;
}

export interface GearPromotionSlotMeta {
  readonly id: GearPromotionSlotId;
  readonly label: Readonly<Record<CalculatorLocale, string>>;
  readonly primaryFocus: Readonly<Record<CalculatorLocale, string>>;
}

export interface GearPromotionStepNode {
  readonly stepIndex: number;
  readonly star: GearPromotionStarBracket;
  readonly petal: GearPromotionPetalIndex;
  readonly starColor: GearPromotionStarColor;
  readonly rarity: "legendary" | "mythic";
  readonly isStarBreakthrough: boolean;
  readonly isMythicAscension: boolean;
  readonly label: Readonly<Record<CalculatorLocale, string>>;
  readonly shortLabel: Readonly<Record<CalculatorLocale, string>>;
  readonly stepSolarGold: number;
  readonly stepEnhanceRune: number;
  readonly stepRuby: number;
  readonly stepLegendaryStone: number;
  readonly stepMythicStone: number;
  readonly cumulativeSolarGold: number;
  readonly cumulativeEnhanceRune: number;
  readonly cumulativeRuby: number;
  readonly cumulativeLegendaryStone: number;
  readonly cumulativeMythicStone: number;
  readonly flatAtkAdded: number;
  readonly flatHpAdded: number;
  readonly breakthroughNote?: Readonly<Record<CalculatorLocale, string>>;
}

export interface GearPromotionStarSummaryRow {
  readonly star: 1 | 2 | 3 | 4 | 5;
  readonly starColor: "gold" | "red";
  readonly rarity: "legendary" | "mythic";
  readonly startStepIndex: number;
  readonly endStepIndex: number;
  readonly label: Readonly<Record<CalculatorLocale, string>>;
  readonly perPetalSolarGold: number;
  readonly perPetalEnhanceRune: number;
  readonly perPetalRuby1To4: number;
  readonly starTotalSolarGold: number;
  readonly starTotalEnhanceRune: number;
  readonly starTotalRuby: number;
  readonly starTotalLegendaryStone: number;
  readonly starTotalMythicStone: number;
  readonly cumulativeSolarGold: number;
  readonly cumulativeEnhanceRune: number;
  readonly cumulativeRuby: number;
  readonly cumulativeLegendaryStone: number;
  readonly cumulativeMythicStone: number;
}

export interface GearPromotionMasterResonanceTier {
  readonly id: number;
  readonly star: 1 | 2 | 3 | 4 | 5;
  readonly requiredStepIndex: number;
  readonly heroAtkBonus: number;
  readonly heroHpBonus: number;
  readonly summary: Readonly<Record<CalculatorLocale, string>>;
}

export interface MythicMasterAttributeTier {
  readonly tierIndex: number;
  readonly pointsRequired: number;
  readonly label: Readonly<Record<CalculatorLocale, string>>;
  readonly masterAttributesPercent: string;
  readonly defenseBreak: number;
  readonly initialUltCdReduced: string;
  readonly enemyUltCdReduced: string;
  readonly heroAttackPercent: string;
  readonly heroHpPercent: string;
}

export interface GearPromotionMaterialMeta {
  readonly key: GearPromotionMaterialKey;
  readonly material: CalculatorMaterialRef;
  readonly isRefundableOnDismantle: boolean;
  readonly refundBadge: Readonly<Record<CalculatorLocale, string>>;
  readonly sourceHint: Readonly<Record<CalculatorLocale, string>>;
}

export interface GearPromotionMaterialBreakdownItem {
  readonly key: GearPromotionMaterialKey;
  readonly material: CalculatorMaterialRef;
  readonly isRefundableOnDismantle: boolean;
  readonly refundBadge: Readonly<Record<CalculatorLocale, string>>;
  readonly sourceHint: Readonly<Record<CalculatorLocale, string>>;
  readonly alreadyInvested: number;
  readonly targetCumulative: number;
  readonly required: number;
  readonly owned: number;
  readonly missing: number;
  readonly surplus: number;
  readonly completionPercent: number;
}

export interface GearPromotionItemStatsSnapshot {
  readonly stepIndex: number;
  readonly star: GearPromotionStarBracket;
  readonly petal: GearPromotionPetalIndex;
  readonly starColor: GearPromotionStarColor;
  readonly rarity: "legendary" | "mythic";
  readonly isMythicAscended: boolean;
  readonly activeIconPath: string;
  readonly totalAtk: number;
  readonly totalHp: number;
  readonly promotionAtkAdded: number;
  readonly promotionHpAdded: number;
  readonly bonusStatLabel: Readonly<Record<CalculatorLocale, string>>;
  readonly bonusStatValue: string;
  readonly mythicBaseBonusLabel: Readonly<Record<CalculatorLocale, string>>;
}

export interface GearPromotionCalculationInput {
  readonly setId?: GearPromotionSetId;
  readonly slotId?: GearPromotionSlotId;
  readonly fromStepIndex: number;
  readonly toStepIndex: number;
  readonly owned?: Partial<Readonly<Record<GearPromotionMaterialKey, number>>>;
}

export interface GearPromotionCalculationResult {
  readonly setId: GearPromotionSetId;
  readonly setMeta: GearPromotionSetMeta;
  readonly slotId: GearPromotionSlotId;
  readonly slotMeta: GearPromotionSlotMeta;
  readonly pieceMeta: GearPromotionPieceItemMeta;
  readonly fromStepIndex: number;
  readonly toStepIndex: number;
  readonly stepDelta: number;
  readonly fromNode: GearPromotionStepNode;
  readonly toNode: GearPromotionStepNode;
  readonly fromStats: GearPromotionItemStatsSnapshot;
  readonly toStats: GearPromotionItemStatsSnapshot;
  readonly isInvalidRange: boolean;
  readonly isAlreadyAtOrAboveTarget: boolean;
  readonly requiredByKey: Readonly<Record<GearPromotionMaterialKey, number>>;
  readonly ownedByKey: Readonly<Record<GearPromotionMaterialKey, number>>;
  readonly missingByKey: Readonly<Record<GearPromotionMaterialKey, number>>;
  readonly surplusByKey: Readonly<Record<GearPromotionMaterialKey, number>>;
  readonly materialBreakdown: readonly GearPromotionMaterialBreakdownItem[];
}

export const GEAR_PROMOTION_SLOTS: readonly GearPromotionSlotMeta[] = [
  {
    id: "weapon",
    label: { vi: "Vũ Khí", en: "Weapon" },
    primaryFocus: {
      vi: "Tấn Công Trang Bị + Tỷ Lệ Bạo Kích",
      en: "Equipment ATK + Crit Rate",
    },
  },
  {
    id: "boots",
    label: { vi: "Giày", en: "Boots" },
    primaryFocus: {
      vi: "Tấn Công Trang Bị + Sát Thương Bạo Kích",
      en: "Equipment ATK + Crit Damage",
    },
  },
  {
    id: "armor",
    label: { vi: "Giáp Ngực", en: "Chest Armor" },
    primaryFocus: {
      vi: "HP Trang Bị + Kháng Bạo Kích",
      en: "Equipment HP + Crit Resistance",
    },
  },
  {
    id: "helmet",
    label: { vi: "Mũ", en: "Helmet" },
    primaryFocus: {
      vi: "HP Trang Bị + Giảm Sát Thương Bạo Kích",
      en: "Equipment HP + Crit Damage Reduction",
    },
  },
] as const;

export const GEAR_PROMOTION_SETS_MAP: Readonly<
  Record<GearPromotionSetId, GearPromotionSetMeta>
> = {
  knights_glory: {
    id: "knights_glory",
    suitId: 1103,
    setName: {
      vi: "Bộ Quang Vinh Kỵ Sĩ",
      en: "Glory of the Knight Set",
    },
    shortName: {
      vi: "Quang Vinh Kỵ Sĩ",
      en: "Knight's Glory",
    },
    roleBadge: {
      vi: "Công & Thủ Toàn Diện • Kỹ Năng",
      en: "Balanced ATK/HP • Skill Damage",
    },
    sampleLegendaryIconPath: "/images/equipment/hero-gear/icon_42053.webp",
    sampleMythicIconPath: "/images/equipment/hero-gear/icon_42064.webp",
    suitBonusBase: {
      vi: "Bộ 4 Món (Gốc): ATK Trang Bị +10%, HP Trang Bị +20%, Tăng ST Kỹ Năng +4%",
      en: "4-Piece (Base): Equip ATK +10%, Equip HP +20%, Skill Damage +4%",
    },
    suitBonusLv40: {
      vi: "Bộ 4 Món (Đạt Lv.40): ATK Trang Bị +40%, HP Trang Bị +80%, Tăng ST Kỹ Năng +8%",
      en: "4-Piece (Lv.40): Equip ATK +40%, Equip HP +80%, Skill Damage +8%",
    },
    suitBonusMythic5Star: {
      vi: "Bộ 4 Món (Đột Phá 5★ Đỏ): ATK Trang Bị +80%, HP Trang Bị +240%, Tăng ST Kỹ Năng +16%",
      en: "4-Piece (5★ Mythic Red): Equip ATK +80%, Equip HP +240%, Skill Damage +16%",
    },
    items: {
      weapon: {
        gameId: 1531,
        slotId: "weapon",
        itemName: { vi: "Thương Thánh Kỵ Sĩ", en: "Paladin's Lance" },
        legendaryIconPath: "/images/equipment/hero-gear/icon_40053.webp",
        mythicIconPath: "/images/equipment/hero-gear/icon_40064.webp",
        baseAtkAtLv40: 5_540,
        baseHpAtLv40: 45_230,
        bonusStatLabel: { vi: "Tỷ Lệ Bạo Kích", en: "Crit Rate" },
        bonusStatValue: "9.00%",
      },
      boots: {
        gameId: 1533,
        slotId: "boots",
        itemName: { vi: "Giày Hồn Kỵ Sĩ", en: "Knight's Soul Boots" },
        legendaryIconPath: "/images/equipment/hero-gear/icon_42053.webp",
        mythicIconPath: "/images/equipment/hero-gear/icon_42064.webp",
        baseAtkAtLv40: 5_540,
        baseHpAtLv40: 45_230,
        bonusStatLabel: { vi: "Sát Thương Bạo Kích", en: "Crit Damage" },
        bonusStatValue: "9.00%",
      },
      armor: {
        gameId: 1532,
        slotId: "armor",
        itemName: { vi: "Hào Giáp Kỵ Sĩ", en: "Knight's Shining Armor" },
        legendaryIconPath: "/images/equipment/hero-gear/icon_41053.webp",
        mythicIconPath: "/images/equipment/hero-gear/icon_41064.webp",
        baseAtkAtLv40: 2_310,
        baseHpAtLv40: 109_200,
        bonusStatLabel: { vi: "Kháng Bạo Kích", en: "Crit Resistance" },
        bonusStatValue: "9.00%",
      },
      helmet: {
        gameId: 1534,
        slotId: "helmet",
        itemName: { vi: "Mũ Thần Kỵ Sĩ", en: "Knight's Divine Helm" },
        legendaryIconPath: "/images/equipment/hero-gear/icon_45053.webp",
        mythicIconPath: "/images/equipment/hero-gear/icon_45064.webp",
        baseAtkAtLv40: 2_310,
        baseHpAtLv40: 109_200,
        bonusStatLabel: { vi: "Giảm ST Bạo Kích", en: "Crit DMG Reduction" },
        bonusStatValue: "9.00%",
      },
    },
  },
  titans_might: {
    id: "titans_might",
    suitId: 1101,
    setName: {
      vi: "Bộ Đại Đế Thần Lực",
      en: "Titan's Might Set",
    },
    shortName: {
      vi: "Đại Đế Thần Lực",
      en: "Titan's Might",
    },
    roleBadge: {
      vi: "Sát Thương Chủ Lực • Khuếch Đại ST",
      en: "Main Carry DPS • Damage Dealt",
    },
    sampleLegendaryIconPath: "/images/equipment/hero-gear/icon_40061.webp",
    sampleMythicIconPath: "/images/equipment/hero-gear/icon_40063.webp",
    suitBonusBase: {
      vi: "Bộ 4 Món (Gốc): ATK Trang Bị +20%, Tăng Sát Thương +3%",
      en: "4-Piece (Base): Equip ATK +20%, Damage Dealt +3%",
    },
    suitBonusLv40: {
      vi: "Bộ 4 Món (Đạt Lv.40): ATK Trang Bị +80%, Tăng Sát Thương +6%",
      en: "4-Piece (Lv.40): Equip ATK +80%, Damage Dealt +6%",
    },
    suitBonusMythic5Star: {
      vi: "Bộ 4 Món (Đột Phá 5★ Đỏ): ATK Trang Bị +160%, Tăng Sát Thương +12%",
      en: "4-Piece (5★ Mythic Red): Equip ATK +160%, Damage Dealt +12%",
    },
    items: {
      weapon: {
        gameId: 1511,
        slotId: "weapon",
        itemName: { vi: "Búa Đại Đế", en: "Emperor's Warhammer" },
        legendaryIconPath: "/images/equipment/hero-gear/icon_40061.webp",
        mythicIconPath: "/images/equipment/hero-gear/icon_40063.webp",
        baseAtkAtLv40: 5_540,
        baseHpAtLv40: 45_230,
        bonusStatLabel: { vi: "Tỷ Lệ Bạo Kích", en: "Crit Rate" },
        bonusStatValue: "9.00%",
      },
      boots: {
        gameId: 1513,
        slotId: "boots",
        itemName: { vi: "Giày Đại Đế", en: "Emperor's Greaves" },
        legendaryIconPath: "/images/equipment/hero-gear/icon_42061.webp",
        mythicIconPath: "/images/equipment/hero-gear/icon_42063.webp",
        baseAtkAtLv40: 5_540,
        baseHpAtLv40: 45_230,
        bonusStatLabel: { vi: "Sát Thương Bạo Kích", en: "Crit Damage" },
        bonusStatValue: "9.00%",
      },
      armor: {
        gameId: 1512,
        slotId: "armor",
        itemName: { vi: "Giáp Đại Đế", en: "Emperor's Breastplate" },
        legendaryIconPath: "/images/equipment/hero-gear/icon_41061.webp",
        mythicIconPath: "/images/equipment/hero-gear/icon_41063.webp",
        baseAtkAtLv40: 2_310,
        baseHpAtLv40: 109_200,
        bonusStatLabel: { vi: "Kháng Bạo Kích", en: "Crit Resistance" },
        bonusStatValue: "9.00%",
      },
      helmet: {
        gameId: 1514,
        slotId: "helmet",
        itemName: { vi: "Mũ Đại Đế", en: "Emperor's Crown Helm" },
        legendaryIconPath: "/images/equipment/hero-gear/icon_45061.webp",
        mythicIconPath: "/images/equipment/hero-gear/icon_45063.webp",
        baseAtkAtLv40: 2_310,
        baseHpAtLv40: 109_200,
        bonusStatLabel: { vi: "Giảm ST Bạo Kích", en: "Crit DMG Reduction" },
        bonusStatValue: "9.00%",
      },
    },
  },
  fury_of_blood: {
    id: "fury_of_blood",
    suitId: 1102,
    setName: {
      vi: "Bộ Nộ Huyết",
      en: "Fury of Blood Set",
    },
    shortName: {
      vi: "Bộ Nộ Huyết",
      en: "Fury of Blood",
    },
    roleBadge: {
      vi: "Đỡ Đòn Tiền Tuyến • Sinh Tồn & Giảm ST",
      en: "Frontline Tank • Max HP & DMG Reduction",
    },
    sampleLegendaryIconPath: "/images/equipment/hero-gear/icon_40060.webp",
    sampleMythicIconPath: "/images/equipment/hero-gear/icon_40062.webp",
    suitBonusBase: {
      vi: "Bộ 4 Món (Gốc): HP Trang Bị +40%, Giảm Sát Thương +3%",
      en: "4-Piece (Base): Equip HP +40%, Damage Reduction +3%",
    },
    suitBonusLv40: {
      vi: "Bộ 4 Món (Đạt Lv.40): HP Trang Bị +160%, Giảm Sát Thương +6%",
      en: "4-Piece (Lv.40): Equip HP +160%, Damage Reduction +6%",
    },
    suitBonusMythic5Star: {
      vi: "Bộ 4 Món (Đột Phá 5★ Đỏ): HP Trang Bị +480%, Giảm Sát Thương +12%",
      en: "4-Piece (5★ Mythic Red): Equip HP +480%, Damage Reduction +12%",
    },
    items: {
      weapon: {
        gameId: 1521,
        slotId: "weapon",
        itemName: { vi: "Rìu Nộ Huyết", en: "Bloodfury Battleaxe" },
        legendaryIconPath: "/images/equipment/hero-gear/icon_40060.webp",
        mythicIconPath: "/images/equipment/hero-gear/icon_40062.webp",
        baseAtkAtLv40: 5_540,
        baseHpAtLv40: 45_230,
        bonusStatLabel: { vi: "Tỷ Lệ Bạo Kích", en: "Crit Rate" },
        bonusStatValue: "9.00%",
      },
      boots: {
        gameId: 1523,
        slotId: "boots",
        itemName: { vi: "Giày Nộ Huyết", en: "Bloodfury Sabatons" },
        legendaryIconPath: "/images/equipment/hero-gear/icon_42060.webp",
        mythicIconPath: "/images/equipment/hero-gear/icon_42062.webp",
        baseAtkAtLv40: 5_540,
        baseHpAtLv40: 45_230,
        bonusStatLabel: { vi: "Sát Thương Bạo Kích", en: "Crit Damage" },
        bonusStatValue: "9.00%",
      },
      armor: {
        gameId: 1522,
        slotId: "armor",
        itemName: { vi: "Giáp Nộ Huyết", en: "Bloodfury Cuirass" },
        legendaryIconPath: "/images/equipment/hero-gear/icon_41060.webp",
        mythicIconPath: "/images/equipment/hero-gear/icon_41062.webp",
        baseAtkAtLv40: 2_310,
        baseHpAtLv40: 109_200,
        bonusStatLabel: { vi: "Kháng Bạo Kích", en: "Crit Resistance" },
        bonusStatValue: "9.00%",
      },
      helmet: {
        gameId: 1524,
        slotId: "helmet",
        itemName: { vi: "Mũ Nộ Huyết", en: "Bloodfury Warhelm" },
        legendaryIconPath: "/images/equipment/hero-gear/icon_45060.webp",
        mythicIconPath: "/images/equipment/hero-gear/icon_45062.webp",
        baseAtkAtLv40: 2_310,
        baseHpAtLv40: 109_200,
        bonusStatLabel: { vi: "Giảm ST Bạo Kích", en: "Crit DMG Reduction" },
        bonusStatValue: "9.00%",
      },
    },
  },
  commanders_set: {
    id: "commanders_set",
    suitId: 0,
    setName: {
      vi: "Bộ Nguyên Soái",
      en: "Commander's Set",
    },
    shortName: {
      vi: "Bộ Nguyên Soái",
      en: "Commander's Set",
    },
    roleBadge: {
      vi: "Trang Bị Huyền Thoại Tiêu Chuẩn",
      en: "Standard Legendary Gear",
    },
    sampleLegendaryIconPath: "/images/equipment/hero-gear/icon_40028.webp",
    sampleMythicIconPath: "/images/equipment/hero-gear/icon_40051.webp",
    suitBonusBase: {
      vi: "Bộ tiêu chuẩn (Không có dòng Suit riêng, vẫn kích hoạt đầy đủ Cộng Hưởng Bậc Thầy Đột Phá 4 món)",
      en: "Standard Legendary Set (No suit-specific passive, fully activates 4-piece Star Promotion Master)",
    },
    suitBonusLv40: {
      vi: "Đạt Lv.40 kích hoạt Cộng Hưởng Cường Hóa 4 món (ATK +23,400, HP +396,000)",
      en: "At Lv.40 activates 4-piece Enhancement Master (ATK +23,400, HP +396,000)",
    },
    suitBonusMythic5Star: {
      vi: "Đột Phá 5★ Đỏ kích hoạt Thuộc tính cơ bản +10% & Cộng Hưởng Đột Phá 5★ (ATK +66,700, HP +1,423,000)",
      en: "At 5★ Mythic Red activates Base Attributes +10% & 5★ Promotion Master (ATK +66,700, HP +1,423,000)",
    },
    items: {
      weapon: {
        gameId: 1501,
        slotId: "weapon",
        itemName: { vi: "Kiếm Lệnh Nguyên Soái", en: "Marshal's Command Sword" },
        legendaryIconPath: "/images/equipment/hero-gear/icon_40028.webp",
        mythicIconPath: "/images/equipment/hero-gear/icon_40051.webp",
        baseAtkAtLv40: 5_540,
        baseHpAtLv40: 45_230,
        bonusStatLabel: { vi: "Tỷ Lệ Bạo Kích", en: "Crit Rate" },
        bonusStatValue: "9.00%",
      },
      boots: {
        gameId: 1503,
        slotId: "boots",
        itemName: { vi: "Ủng Chiến Phụ Nguyên Soái", en: "Marshal's Battle Boots" },
        legendaryIconPath: "/images/equipment/hero-gear/icon_42028.webp",
        mythicIconPath: "/images/equipment/hero-gear/icon_42051.webp",
        baseAtkAtLv40: 5_540,
        baseHpAtLv40: 45_230,
        bonusStatLabel: { vi: "Sát Thương Bạo Kích", en: "Crit Damage" },
        bonusStatValue: "9.00%",
      },
      armor: {
        gameId: 1502,
        slotId: "armor",
        itemName: { vi: "Giáp Bí Pháp Nguyên Soái", en: "Marshal's Arcane Armor" },
        legendaryIconPath: "/images/equipment/hero-gear/icon_41028.webp",
        mythicIconPath: "/images/equipment/hero-gear/icon_41051.webp",
        baseAtkAtLv40: 2_310,
        baseHpAtLv40: 109_200,
        bonusStatLabel: { vi: "Kháng Bạo Kích", en: "Crit Resistance" },
        bonusStatValue: "9.00%",
      },
      helmet: {
        gameId: 1504,
        slotId: "helmet",
        itemName: { vi: "Mũ Phụ Ma Nguyên Soái", en: "Marshal's Enchanted Helm" },
        legendaryIconPath: "/images/equipment/hero-gear/icon_45028.webp",
        mythicIconPath: "/images/equipment/hero-gear/icon_45051.webp",
        baseAtkAtLv40: 2_310,
        baseHpAtLv40: 109_200,
        bonusStatLabel: { vi: "Giảm ST Bạo Kích", en: "Crit DMG Reduction" },
        bonusStatValue: "9.00%",
      },
    },
  },
};

export const GEAR_PROMOTION_SETS: readonly GearPromotionSetMeta[] =
  GEAR_PROMOTION_SET_ORDER.map((id) => GEAR_PROMOTION_SETS_MAP[id]);

export const GEAR_PROMOTION_MATERIALS: readonly GearPromotionMaterialMeta[] = [
  {
    key: "solarGold",
    material: CALCULATOR_MATERIALS.solarGoldIngot,
    isRefundableOnDismantle: true,
    refundBadge: {
      vi: "Hoàn trả 100% khi tách",
      en: "100% refunded on dismantle",
    },
    sourceHint: {
      vi: "Tiệm Công Hội, Sự Kiện Đua Top & Gói Đồ Đỏ",
      en: "Guild Shop, Leaderboard Events & Gear Packs",
    },
  },
  {
    key: "enhanceRune",
    material: CALCULATOR_MATERIALS.gearEnhanceRune,
    isRefundableOnDismantle: true,
    refundBadge: {
      vi: "Hoàn trả 100% khi tách",
      en: "100% refunded on dismantle",
    },
    sourceHint: {
      vi: "Thử Thách Anh Hùng, Tách Trang Bị & Tiệm Đổi",
      en: "Hero Trials, Gear Dismantle & Exchange Shops",
    },
  },
  {
    key: "legendaryStone",
    material: CALCULATOR_MATERIALS.legendaryPromotionStone,
    isRefundableOnDismantle: true,
    refundBadge: {
      vi: "Hoàn trả 100% khi tách",
      en: "100% refunded on dismantle",
    },
    sourceHint: {
      vi: "Cánh thứ 5 của Sao Vàng 1★–4★ (Tổng 50 viên/món)",
      en: "5th petal of Gold Stars 1★–4★ (50 stones/piece)",
    },
  },
  {
    key: "mythicStone",
    material: CALCULATOR_MATERIALS.mythicPromotionStone,
    isRefundableOnDismantle: true,
    refundBadge: {
      vi: "Hoàn trả 100% khi tách",
      en: "100% refunded on dismantle",
    },
    sourceHint: {
      vi: "Cánh 25/25 Hóa Đỏ Thần Thoại 5★ (10 viên/món)",
      en: "25/25 Mythic Red 5★ Ascension petal (10 stones/piece)",
    },
  },
  {
    key: "ruby",
    material: CALCULATOR_MATERIALS.ruby,
    isRefundableOnDismantle: false,
    refundBadge: {
      vi: "Tiêu hao cố định — không hoàn trả",
      en: "Non-refundable fixed currency cost",
    },
    sourceHint: {
      vi: "Mỏ Ruby Lãnh Địa, Thuế Chiến Dịch & Hầm Mỏ",
      en: "Territory Ruby Mine, Campaign Tax & Resource Chests",
    },
  },
] as const;

interface StarPromotionTemplate {
  readonly star: 1 | 2 | 3 | 4 | 5;
  readonly starColor: "gold" | "red";
  readonly solarGoldPerPetal: number;
  readonly enhanceRunePerPetal: number;
  readonly rubyPerPetal1To4: number;
  readonly legendaryStoneAtPetal5: number;
  readonly mythicStoneAtPetal5: number;
  readonly flatAtkPerPetal: number;
  readonly flatHpPerPetal: number;
  readonly summaryLabel: Readonly<Record<CalculatorLocale, string>>;
  readonly breakthroughNote: Readonly<Record<CalculatorLocale, string>>;
}

/**
 * Ground-truth cost matrix decoded directly from Meta.bytes (v1.0.42532) table `equipment_break`
 * for model_id 1501..1534 (lv 0..25):
 * - Stars 1★..4★ (lv 1..20): 4 Gold Stars, 5th petal consumes Legendary Promotion Stone (gameId=151)
 * - Star 5★ (lv 21..25): 1 Red Star, 25th petal consumes Mythic Promotion Stone (gameId=152) and ascends to Mythic Red
 * - Petals 1..4 of each star consume Ruby (`break_cost_no_back` = `999|6|<amount>`)
 */
const STAR_PROMOTION_TEMPLATES: readonly StarPromotionTemplate[] = [
  {
    star: 1,
    starColor: "gold",
    solarGoldPerPetal: 150,
    enhanceRunePerPetal: 12_500,
    rubyPerPetal1To4: 750_000,
    legendaryStoneAtPetal5: 5,
    mythicStoneAtPetal5: 0,
    flatAtkPerPetal: 290,
    flatHpPerPetal: 2_900,
    summaryLabel: {
      vi: "1★ Vàng (Cánh 1 ➔ 5)",
      en: "1★ Gold (Petals 1 to 5)",
    },
    breakthroughNote: {
      vi: "Đột phá 1★ Vàng: Cánh 5/5 dùng 5 Đá Đột Phá Cam thay cho Ruby",
      en: "1★ Gold Breakthrough: Petal 5/5 uses 5 Legendary Promotion Stones instead of Ruby",
    },
  },
  {
    star: 2,
    starColor: "gold",
    solarGoldPerPetal: 195,
    enhanceRunePerPetal: 16_250,
    rubyPerPetal1To4: 975_000,
    legendaryStoneAtPetal5: 10,
    mythicStoneAtPetal5: 0,
    flatAtkPerPetal: 360,
    flatHpPerPetal: 3_600,
    summaryLabel: {
      vi: "2★ Vàng (Cánh 6 ➔ 10)",
      en: "2★ Gold (Petals 6 to 10)",
    },
    breakthroughNote: {
      vi: "Đột phá 2★ Vàng: Cánh 5/5 dùng 10 Đá Đột Phá Cam thay cho Ruby",
      en: "2★ Gold Breakthrough: Petal 5/5 uses 10 Legendary Promotion Stones instead of Ruby",
    },
  },
  {
    star: 3,
    starColor: "gold",
    solarGoldPerPetal: 240,
    enhanceRunePerPetal: 20_000,
    rubyPerPetal1To4: 1_200_000,
    legendaryStoneAtPetal5: 15,
    mythicStoneAtPetal5: 0,
    flatAtkPerPetal: 450,
    flatHpPerPetal: 4_500,
    summaryLabel: {
      vi: "3★ Vàng (Cánh 11 ➔ 15)",
      en: "3★ Gold (Petals 11 to 15)",
    },
    breakthroughNote: {
      vi: "Đột phá 3★ Vàng: Cánh 5/5 dùng 15 Đá Đột Phá Cam thay cho Ruby",
      en: "3★ Gold Breakthrough: Petal 5/5 uses 15 Legendary Promotion Stones instead of Ruby",
    },
  },
  {
    star: 4,
    starColor: "gold",
    solarGoldPerPetal: 285,
    enhanceRunePerPetal: 23_750,
    rubyPerPetal1To4: 1_425_000,
    legendaryStoneAtPetal5: 20,
    mythicStoneAtPetal5: 0,
    flatAtkPerPetal: 560,
    flatHpPerPetal: 5_600,
    summaryLabel: {
      vi: "4★ Vàng (Cánh 16 ➔ 20)",
      en: "4★ Gold (Petals 16 to 20)",
    },
    breakthroughNote: {
      vi: "Đột phá 4★ Vàng: Cánh 5/5 dùng 20 Đá Đột Phá Cam • Mở khóa Sao Đỏ 5★",
      en: "4★ Gold Breakthrough: Petal 5/5 uses 20 Legendary Promotion Stones • Unlocks 5★ Red Star",
    },
  },
  {
    star: 5,
    starColor: "red",
    solarGoldPerPetal: 330,
    enhanceRunePerPetal: 27_500,
    rubyPerPetal1To4: 1_650_000,
    legendaryStoneAtPetal5: 0,
    mythicStoneAtPetal5: 10,
    flatAtkPerPetal: 680,
    flatHpPerPetal: 6_800,
    summaryLabel: {
      vi: "5★ Đỏ Thần Thoại (Cánh 21 ➔ 25)",
      en: "5★ Mythic Red (Petals 21 to 25)",
    },
    breakthroughNote: {
      vi: "Hóa Đỏ Thần Thoại 5★: Cánh 25/25 dùng 10 Đá Đột Phá Đỏ • Kích hoạt Thuộc tính cơ bản +10%",
      en: "5★ Mythic Red Ascension: Petal 25/25 uses 10 Mythic Promotion Stones • Unlocks Base Attributes +10%",
    },
  },
] as const;

function buildGearPromotionSteps(): readonly GearPromotionStepNode[] {
  const nodes: GearPromotionStepNode[] = [
    {
      stepIndex: 0,
      star: 0,
      petal: 0,
      starColor: "none",
      rarity: "legendary",
      isStarBreakthrough: false,
      isMythicAscension: false,
      label: {
        vi: "0★ Chưa đột phá (Gốc Lv.40)",
        en: "0★ Unpromoted (Base Lv.40)",
      },
      shortLabel: {
        vi: "0★ Gốc",
        en: "0★ Base",
      },
      stepSolarGold: 0,
      stepEnhanceRune: 0,
      stepRuby: 0,
      stepLegendaryStone: 0,
      stepMythicStone: 0,
      cumulativeSolarGold: 0,
      cumulativeEnhanceRune: 0,
      cumulativeRuby: 0,
      cumulativeLegendaryStone: 0,
      cumulativeMythicStone: 0,
      flatAtkAdded: 0,
      flatHpAdded: 0,
    },
  ];

  let cumSolarGold = 0;
  let cumEnhanceRune = 0;
  let cumRuby = 0;
  let cumLegendaryStone = 0;
  let cumMythicStone = 0;
  let cumAtk = 0;
  let cumHp = 0;

  for (const tpl of STAR_PROMOTION_TEMPLATES) {
    for (let p = 1; p <= 5; p++) {
      const petal = p as GearPromotionPetalIndex;
      const stepIndex = (tpl.star - 1) * 5 + p;
      const isBreakthrough = petal === 5;
      const isMythicAscension = stepIndex === MAX_GEAR_PROMOTION_STEP;

      const stepSolarGold = tpl.solarGoldPerPetal;
      const stepEnhanceRune = tpl.enhanceRunePerPetal;
      const stepRuby = isBreakthrough ? 0 : tpl.rubyPerPetal1To4;
      const stepLegendaryStone = isBreakthrough
        ? tpl.legendaryStoneAtPetal5
        : 0;
      const stepMythicStone = isBreakthrough ? tpl.mythicStoneAtPetal5 : 0;

      cumSolarGold += stepSolarGold;
      cumEnhanceRune += stepEnhanceRune;
      cumRuby += stepRuby;
      cumLegendaryStone += stepLegendaryStone;
      cumMythicStone += stepMythicStone;
      cumAtk += tpl.flatAtkPerPetal;
      cumHp += tpl.flatHpPerPetal;

      const starColorVi = tpl.starColor === "red" ? "Đỏ" : "Vàng";
      const starColorEn = tpl.starColor === "red" ? "Red" : "Gold";

      nodes.push({
        stepIndex,
        star: tpl.star,
        petal,
        starColor: tpl.starColor,
        rarity: isMythicAscension ? "mythic" : "legendary",
        isStarBreakthrough: isBreakthrough,
        isMythicAscension,
        label: {
          vi: `${tpl.star}★ ${starColorVi} • Cánh ${petal}/5${
            isMythicAscension
              ? " (Hóa Đỏ Thần Thoại)"
              : isBreakthrough
                ? " (Đột Phá Sao)"
                : ""
          }`,
          en: `${tpl.star}★ ${starColorEn} • Petal ${petal}/5${
            isMythicAscension
              ? " (Mythic Red Ascension)"
              : isBreakthrough
                ? " (Star Breakthrough)"
                : ""
          }`,
        },
        shortLabel: {
          vi: `${tpl.star}★ ${starColorVi} (${petal}/5)`,
          en: `${tpl.star}★ ${starColorEn} (${petal}/5)`,
        },
        stepSolarGold,
        stepEnhanceRune,
        stepRuby,
        stepLegendaryStone,
        stepMythicStone,
        cumulativeSolarGold: cumSolarGold,
        cumulativeEnhanceRune: cumEnhanceRune,
        cumulativeRuby: cumRuby,
        cumulativeLegendaryStone: cumLegendaryStone,
        cumulativeMythicStone: cumMythicStone,
        flatAtkAdded: cumAtk,
        flatHpAdded: cumHp,
        breakthroughNote: isBreakthrough ? tpl.breakthroughNote : undefined,
      });
    }
  }

  return nodes;
}

export const GEAR_PROMOTION_STEPS: readonly GearPromotionStepNode[] =
  buildGearPromotionSteps();

export const GEAR_PROMOTION_STAR_SUMMARY_TABLE: readonly GearPromotionStarSummaryRow[] =
  STAR_PROMOTION_TEMPLATES.map((tpl) => {
    const startStepIndex = (tpl.star - 1) * 5 + 1;
    const endStepIndex = tpl.star * 5;
    const prevNode = GEAR_PROMOTION_STEPS[startStepIndex - 1];
    const endNode = GEAR_PROMOTION_STEPS[endStepIndex];

    return {
      star: tpl.star,
      starColor: tpl.starColor,
      rarity: tpl.star === 5 ? "mythic" : "legendary",
      startStepIndex,
      endStepIndex,
      label: tpl.summaryLabel,
      perPetalSolarGold: tpl.solarGoldPerPetal,
      perPetalEnhanceRune: tpl.enhanceRunePerPetal,
      perPetalRuby1To4: tpl.rubyPerPetal1To4,
      starTotalSolarGold:
        endNode.cumulativeSolarGold - prevNode.cumulativeSolarGold,
      starTotalEnhanceRune:
        endNode.cumulativeEnhanceRune - prevNode.cumulativeEnhanceRune,
      starTotalRuby: endNode.cumulativeRuby - prevNode.cumulativeRuby,
      starTotalLegendaryStone:
        endNode.cumulativeLegendaryStone - prevNode.cumulativeLegendaryStone,
      starTotalMythicStone:
        endNode.cumulativeMythicStone - prevNode.cumulativeMythicStone,
      cumulativeSolarGold: endNode.cumulativeSolarGold,
      cumulativeEnhanceRune: endNode.cumulativeEnhanceRune,
      cumulativeRuby: endNode.cumulativeRuby,
      cumulativeLegendaryStone: endNode.cumulativeLegendaryStone,
      cumulativeMythicStone: endNode.cumulativeMythicStone,
    };
  });

/**
 * 4-Piece Star Promotion Master Resonance decoded from Meta.bytes `equipment_master` (type=4, IDs 3151..3155)
 */
export const GEAR_PROMOTION_MASTER_RESONANCE_TIERS: readonly GearPromotionMasterResonanceTier[] =
  [
    {
      id: 3151,
      star: 1,
      requiredStepIndex: 5,
      heroAtkBonus: 22_200,
      heroHpBonus: 375_000,
      summary: {
        vi: "4 món đạt 1★ Vàng: ATK Anh Hùng +22,200 • HP Anh Hùng +375,000",
        en: "All 4 pieces at 1★ Gold: Hero ATK +22,200 • Hero HP +375,000",
      },
    },
    {
      id: 3152,
      star: 2,
      requiredStepIndex: 10,
      heroAtkBonus: 29_600,
      heroHpBonus: 544_000,
      summary: {
        vi: "4 món đạt 2★ Vàng: ATK Anh Hùng +29,600 • HP Anh Hùng +544,000",
        en: "All 4 pieces at 2★ Gold: Hero ATK +29,600 • Hero HP +544,000",
      },
    },
    {
      id: 3153,
      star: 3,
      requiredStepIndex: 15,
      heroAtkBonus: 40_800,
      heroHpBonus: 809_000,
      summary: {
        vi: "4 món đạt 3★ Vàng: ATK Anh Hùng +40,800 • HP Anh Hùng +809,000",
        en: "All 4 pieces at 3★ Gold: Hero ATK +40,800 • Hero HP +809,000",
      },
    },
    {
      id: 3154,
      star: 4,
      requiredStepIndex: 20,
      heroAtkBonus: 55_600,
      heroHpBonus: 1_186_000,
      summary: {
        vi: "4 món đạt 4★ Vàng: ATK Anh Hùng +55,600 • HP Anh Hùng +1,186,000",
        en: "All 4 pieces at 4★ Gold: Hero ATK +55,600 • Hero HP +1,186,000",
      },
    },
    {
      id: 3155,
      star: 5,
      requiredStepIndex: 25,
      heroAtkBonus: 66_700,
      heroHpBonus: 1_423_000,
      summary: {
        vi: "4 món đạt 5★ Đỏ Thần Thoại: ATK Anh Hùng +66,700 • HP Anh Hùng +1,423,000",
        en: "All 4 pieces at 5★ Mythic Red: Hero ATK +66,700 • Hero HP +1,423,000",
      },
    },
  ] as const;

export const MYTHIC_MASTER_ATTRIBUTE_TIERS: readonly MythicMasterAttributeTier[] =
  [
    {
      tierIndex: 1,
      pointsRequired: 500,
      label: { vi: "Mốc 1 (500 điểm)", en: "Tier 1 (500 pts)" },
      masterAttributesPercent: "60.00%",
      defenseBreak: 130,
      initialUltCdReduced: "0.20%",
      enemyUltCdReduced: "0.10%",
      heroAttackPercent: "1.50%",
      heroHpPercent: "2.50%",
    },
    {
      tierIndex: 2,
      pointsRequired: 600,
      label: { vi: "Mốc 2 (600 điểm)", en: "Tier 2 (600 pts)" },
      masterAttributesPercent: "61.90%",
      defenseBreak: 250,
      initialUltCdReduced: "0.30%",
      enemyUltCdReduced: "0.15%",
      heroAttackPercent: "2.50%",
      heroHpPercent: "5.00%",
    },
    {
      tierIndex: 3,
      pointsRequired: 700,
      label: { vi: "Mốc 3 (700 điểm)", en: "Tier 3 (700 pts)" },
      masterAttributesPercent: "63.80%",
      defenseBreak: 380,
      initialUltCdReduced: "0.50%",
      enemyUltCdReduced: "0.25%",
      heroAttackPercent: "4.00%",
      heroHpPercent: "7.50%",
    },
    {
      tierIndex: 4,
      pointsRequired: 800,
      label: { vi: "Mốc 4 (800 điểm)", en: "Tier 4 (800 pts)" },
      masterAttributesPercent: "65.70%",
      defenseBreak: 500,
      initialUltCdReduced: "0.60%",
      enemyUltCdReduced: "0.30%",
      heroAttackPercent: "5.00%",
      heroHpPercent: "10.00%",
    },
    {
      tierIndex: 5,
      pointsRequired: 900,
      label: { vi: "Mốc 5 (900 điểm)", en: "Tier 5 (900 pts)" },
      masterAttributesPercent: "67.60%",
      defenseBreak: 630,
      initialUltCdReduced: "0.80%",
      enemyUltCdReduced: "0.40%",
      heroAttackPercent: "6.50%",
      heroHpPercent: "12.50%",
    },
    {
      tierIndex: 6,
      pointsRequired: 1_000,
      label: { vi: "Mốc 6 (1,000 điểm)", en: "Tier 6 (1,000 pts)" },
      masterAttributesPercent: "69.50%",
      defenseBreak: 750,
      initialUltCdReduced: "0.90%",
      enemyUltCdReduced: "0.45%",
      heroAttackPercent: "7.50%",
      heroHpPercent: "15.00%",
    },
    {
      tierIndex: 7,
      pointsRequired: 1_100,
      label: { vi: "Mốc 7 (1,100 điểm)", en: "Tier 7 (1,100 pts)" },
      masterAttributesPercent: "71.55%",
      defenseBreak: 890,
      initialUltCdReduced: "1.10%",
      enemyUltCdReduced: "0.55%",
      heroAttackPercent: "9.00%",
      heroHpPercent: "18.00%",
    },
    {
      tierIndex: 8,
      pointsRequired: 1_200,
      label: { vi: "Mốc 8 (1,200 điểm)", en: "Tier 8 (1,200 pts)" },
      masterAttributesPercent: "73.60%",
      defenseBreak: 1_020,
      initialUltCdReduced: "1.30%",
      enemyUltCdReduced: "0.65%",
      heroAttackPercent: "10.00%",
      heroHpPercent: "20.50%",
    },
    {
      tierIndex: 9,
      pointsRequired: 1_300,
      label: { vi: "Mốc 9 (1,300 điểm)", en: "Tier 9 (1,300 pts)" },
      masterAttributesPercent: "75.65%",
      defenseBreak: 1_160,
      initialUltCdReduced: "1.40%",
      enemyUltCdReduced: "0.70%",
      heroAttackPercent: "11.50%",
      heroHpPercent: "23.00%",
    },
    {
      tierIndex: 10,
      pointsRequired: 1_400,
      label: { vi: "Mốc 10 (1,400 điểm)", en: "Tier 10 (1,400 pts)" },
      masterAttributesPercent: "77.70%",
      defenseBreak: 1_290,
      initialUltCdReduced: "1.60%",
      enemyUltCdReduced: "0.80%",
      heroAttackPercent: "13.00%",
      heroHpPercent: "26.00%",
    },
    {
      tierIndex: 11,
      pointsRequired: 1_500,
      label: { vi: "Mốc 11 (1,500 điểm)", en: "Tier 11 (1,500 pts)" },
      masterAttributesPercent: "79.75%",
      defenseBreak: 1_420,
      initialUltCdReduced: "1.80%",
      enemyUltCdReduced: "0.90%",
      heroAttackPercent: "14.00%",
      heroHpPercent: "28.50%",
    },
    {
      tierIndex: 12,
      pointsRequired: 1_600,
      label: { vi: "Mốc 12 (1,600 điểm)", en: "Tier 12 (1,600 pts)" },
      masterAttributesPercent: "81.90%",
      defenseBreak: 1_570,
      initialUltCdReduced: "2.00%",
      enemyUltCdReduced: "1.00%",
      heroAttackPercent: "15.50%",
      heroHpPercent: "31.50%",
    },
    {
      tierIndex: 13,
      pointsRequired: 1_700,
      label: { vi: "Mốc 13 (1,700 điểm)", en: "Tier 13 (1,700 pts)" },
      masterAttributesPercent: "84.05%",
      defenseBreak: 1_710,
      initialUltCdReduced: "2.10%",
      enemyUltCdReduced: "1.05%",
      heroAttackPercent: "17.00%",
      heroHpPercent: "34.00%",
    },
    {
      tierIndex: 14,
      pointsRequired: 1_800,
      label: { vi: "Mốc 14 (1,800 điểm)", en: "Tier 14 (1,800 pts)" },
      masterAttributesPercent: "86.20%",
      defenseBreak: 1_850,
      initialUltCdReduced: "2.30%",
      enemyUltCdReduced: "1.15%",
      heroAttackPercent: "18.50%",
      heroHpPercent: "37.00%",
    },
    {
      tierIndex: 15,
      pointsRequired: 1_900,
      label: { vi: "Mốc 15 (1,900 điểm)", en: "Tier 15 (1,900 pts)" },
      masterAttributesPercent: "88.35%",
      defenseBreak: 1_990,
      initialUltCdReduced: "2.50%",
      enemyUltCdReduced: "1.25%",
      heroAttackPercent: "20.00%",
      heroHpPercent: "40.00%",
    },
    {
      tierIndex: 16,
      pointsRequired: 2_000,
      label: { vi: "Mốc 16 (2,000 điểm)", en: "Tier 16 (2,000 pts)" },
      masterAttributesPercent: "90.50%",
      defenseBreak: 2_140,
      initialUltCdReduced: "2.70%",
      enemyUltCdReduced: "1.35%",
      heroAttackPercent: "21.50%",
      heroHpPercent: "42.50%",
    },
    {
      tierIndex: 17,
      pointsRequired: 2_100,
      label: { vi: "Mốc 17 (2,100 điểm)", en: "Tier 17 (2,100 pts)" },
      masterAttributesPercent: "92.80%",
      defenseBreak: 2_290,
      initialUltCdReduced: "2.90%",
      enemyUltCdReduced: "1.45%",
      heroAttackPercent: "23.00%",
      heroHpPercent: "45.50%",
    },
    {
      tierIndex: 18,
      pointsRequired: 2_200,
      label: {
        vi: "Mốc 18 (2,200 điểm • Đỉnh 5★ Đỏ)",
        en: "Tier 18 (2,200 pts • Max 5★ Mythic)",
      },
      masterAttributesPercent: "95.25%",
      defenseBreak: 2_450,
      initialUltCdReduced: "3.10%",
      enemyUltCdReduced: "1.55%",
      heroAttackPercent: "24.50%",
      heroHpPercent: "49.00%",
    },
  ] as const;

export function clampGearPromotionStepIndex(stepIndex: number): number {
  if (!Number.isFinite(stepIndex)) return MIN_GEAR_PROMOTION_STEP;
  return Math.max(
    MIN_GEAR_PROMOTION_STEP,
    Math.min(MAX_GEAR_PROMOTION_STEP, Math.floor(stepIndex))
  );
}

export function getGearPromotionStep(stepIndex: number): GearPromotionStepNode {
  return GEAR_PROMOTION_STEPS[clampGearPromotionStepIndex(stepIndex)];
}

export function getGearPromotionSetMeta(
  setId: GearPromotionSetId
): GearPromotionSetMeta {
  return GEAR_PROMOTION_SETS_MAP[setId] ?? GEAR_PROMOTION_SETS_MAP.knights_glory;
}

export function getGearPromotionSlotMeta(
  slotId: GearPromotionSlotId
): GearPromotionSlotMeta {
  return (
    GEAR_PROMOTION_SLOTS.find((s) => s.id === slotId) ?? GEAR_PROMOTION_SLOTS[1]
  );
}

export function getGearPromotionItemStatsAtStep(
  setId: GearPromotionSetId,
  slotId: GearPromotionSlotId,
  stepIndex: number
): GearPromotionItemStatsSnapshot {
  const safeStep = clampGearPromotionStepIndex(stepIndex);
  const node = GEAR_PROMOTION_STEPS[safeStep];
  const setMeta = getGearPromotionSetMeta(setId);
  const piece = setMeta.items[slotId] ?? setMeta.items.boots;
  const isMythicAscended = safeStep === MAX_GEAR_PROMOTION_STEP;

  const isOffensiveSlot = slotId === "weapon" || slotId === "boots";
  const promotionAtkAdded = isOffensiveSlot
    ? node.flatAtkAdded
    : Math.round(node.flatAtkAdded * 0.45);
  const promotionHpAdded = isOffensiveSlot
    ? node.flatHpAdded
    : Math.round(node.flatHpAdded * 2.2);

  const rawTotalAtk = piece.baseAtkAtLv40 + promotionAtkAdded;
  const rawTotalHp = piece.baseHpAtLv40 + promotionHpAdded;

  const totalAtk = isMythicAscended
    ? Math.round(rawTotalAtk * 1.1)
    : rawTotalAtk;
  const totalHp = isMythicAscended ? Math.round(rawTotalHp * 1.1) : rawTotalHp;

  return {
    stepIndex: safeStep,
    star: node.star,
    petal: node.petal,
    starColor: node.starColor,
    rarity: node.rarity,
    isMythicAscended,
    activeIconPath: isMythicAscended
      ? piece.mythicIconPath
      : piece.legendaryIconPath,
    totalAtk,
    totalHp,
    promotionAtkAdded,
    promotionHpAdded,
    bonusStatLabel: piece.bonusStatLabel,
    bonusStatValue: piece.bonusStatValue,
    mythicBaseBonusLabel: isMythicAscended
      ? {
          vi: "Đã kích hoạt Hóa Đỏ 5★: Thuộc tính cơ bản +10%",
          en: "5★ Mythic Red Active: Base Attributes +10%",
        }
      : {
          vi: "Đột phá đạt 5★ Đỏ (25/25): Mở khóa Thuộc tính cơ bản +10%",
          en: "Reach 5★ Mythic Red (25/25): Unlocks Base Attributes +10%",
        },
  };
}

function calcCompletionPercent(owned: number, required: number): number {
  if (required <= 0) return 100;
  return Math.min(100, Math.floor((owned / required) * 100));
}

function getCumulativeByMaterialKey(
  node: GearPromotionStepNode,
  key: GearPromotionMaterialKey
): number {
  switch (key) {
    case "solarGold":
      return node.cumulativeSolarGold;
    case "enhanceRune":
      return node.cumulativeEnhanceRune;
    case "legendaryStone":
      return node.cumulativeLegendaryStone;
    case "mythicStone":
      return node.cumulativeMythicStone;
    case "ruby":
      return node.cumulativeRuby;
  }
}

export function calculateGearPromotionPlan(
  input: GearPromotionCalculationInput
): GearPromotionCalculationResult {
  const setId: GearPromotionSetId = input.setId ?? "knights_glory";
  const slotId: GearPromotionSlotId = input.slotId ?? "boots";
  const setMeta = getGearPromotionSetMeta(setId);
  const slotMeta = getGearPromotionSlotMeta(slotId);
  const pieceMeta = setMeta.items[slotId] ?? setMeta.items.boots;

  const fromStepIndex = clampGearPromotionStepIndex(input.fromStepIndex);
  const toStepIndex = clampGearPromotionStepIndex(input.toStepIndex);
  const fromNode = GEAR_PROMOTION_STEPS[fromStepIndex];
  const toNode = GEAR_PROMOTION_STEPS[toStepIndex];
  const isInvalidRange = fromStepIndex > toStepIndex;
  const isAlreadyAtOrAboveTarget = fromStepIndex >= toStepIndex;
  const stepDelta = isInvalidRange ? 0 : toStepIndex - fromStepIndex;

  const fromStats = getGearPromotionItemStatsAtStep(
    setId,
    slotId,
    fromStepIndex
  );
  const toStats = getGearPromotionItemStatsAtStep(setId, slotId, toStepIndex);

  const requiredByKey: Record<GearPromotionMaterialKey, number> = {
    solarGold: 0,
    enhanceRune: 0,
    legendaryStone: 0,
    mythicStone: 0,
    ruby: 0,
  };
  const ownedByKey: Record<GearPromotionMaterialKey, number> = {
    solarGold: 0,
    enhanceRune: 0,
    legendaryStone: 0,
    mythicStone: 0,
    ruby: 0,
  };
  const missingByKey: Record<GearPromotionMaterialKey, number> = {
    solarGold: 0,
    enhanceRune: 0,
    legendaryStone: 0,
    mythicStone: 0,
    ruby: 0,
  };
  const surplusByKey: Record<GearPromotionMaterialKey, number> = {
    solarGold: 0,
    enhanceRune: 0,
    legendaryStone: 0,
    mythicStone: 0,
    ruby: 0,
  };

  const materialBreakdown: GearPromotionMaterialBreakdownItem[] =
    GEAR_PROMOTION_MATERIALS.map((meta) => {
      const alreadyInvested = getCumulativeByMaterialKey(fromNode, meta.key);
      const targetCumulative = getCumulativeByMaterialKey(toNode, meta.key);
      const required = isInvalidRange
        ? 0
        : Math.max(0, targetCumulative - alreadyInvested);
      const rawOwned = input.owned?.[meta.key] ?? 0;
      const owned = Number.isFinite(rawOwned)
        ? Math.max(0, Math.floor(rawOwned))
        : 0;
      const missing = Math.max(0, required - owned);
      const surplus = Math.max(0, owned - required);
      const completionPercent = calcCompletionPercent(owned, required);

      requiredByKey[meta.key] = required;
      ownedByKey[meta.key] = owned;
      missingByKey[meta.key] = missing;
      surplusByKey[meta.key] = surplus;

      return {
        key: meta.key,
        material: meta.material,
        isRefundableOnDismantle: meta.isRefundableOnDismantle,
        refundBadge: meta.refundBadge,
        sourceHint: meta.sourceHint,
        alreadyInvested,
        targetCumulative,
        required,
        owned,
        missing,
        surplus,
        completionPercent,
      };
    });

  return {
    setId,
    setMeta,
    slotId,
    slotMeta,
    pieceMeta,
    fromStepIndex,
    toStepIndex,
    stepDelta,
    fromNode,
    toNode,
    fromStats,
    toStats,
    isInvalidRange,
    isAlreadyAtOrAboveTarget,
    requiredByKey,
    ownedByKey,
    missingByKey,
    surplusByKey,
    materialBreakdown,
  };
}

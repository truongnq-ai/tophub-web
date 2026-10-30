import { CALCULATOR_MATERIALS } from "./registry";
import type { CalculatorLocale, CalculatorMaterialRef } from "./types";

export type GearEnhanceRarity = "legendary" | "epic" | "rare";

export type GearEnhanceSlotId = "weapon" | "boots" | "armor" | "helmet";

export const MIN_GEAR_ENHANCE_LEVEL = 0;
export const MAX_GEAR_ENHANCE_LEVEL = 40;

export const GEAR_ENHANCE_RARITY_ORDER: readonly GearEnhanceRarity[] = [
  "legendary",
  "epic",
  "rare",
] as const;

export const GEAR_SLOT_ORDER: readonly GearEnhanceSlotId[] = [
  "weapon",
  "boots",
  "armor",
  "helmet",
] as const;

export interface GearEnhanceStepCost {
  readonly level: number;
  readonly runes: number;
  readonly ruby: number;
  readonly cumulativeRunes: number;
  readonly cumulativeRuby: number;
}

export interface GearPieceLevelMilestone {
  readonly level: number;
  readonly statLabel: Readonly<Record<CalculatorLocale, string>>;
  readonly bonusValue: string;
}

export interface GearPieceSlotMeta {
  readonly slotId: GearEnhanceSlotId;
  readonly gameId: number;
  readonly slotLabel: Readonly<Record<CalculatorLocale, string>>;
  readonly itemName: Readonly<Record<CalculatorLocale, string>>;
  readonly setTitle: Readonly<Record<CalculatorLocale, string>>;
  readonly iconPath: string;
  readonly baseStatsSummary: Readonly<Record<CalculatorLocale, string>>;
  readonly levelMilestones: readonly GearPieceLevelMilestone[];
}

export interface GearEnhanceRarityConfig {
  readonly id: GearEnhanceRarity;
  readonly rarity: GearEnhanceRarity;
  readonly modelId: number;
  readonly maxLevel: number;
  readonly quickMilestones: readonly number[];
  readonly label: Readonly<Record<CalculatorLocale, string>>;
  readonly shortLabel: Readonly<Record<CalculatorLocale, string>>;
  readonly badgeNote: Readonly<Record<CalculatorLocale, string>>;
  readonly sampleIconPath: string;
  readonly totalRuneAtMax: number;
  readonly totalRubyAtMax: number;
}

export interface GearMasterBonusTier {
  readonly level: number;
  readonly atkBonus: number;
  readonly hpBonus: number;
  readonly summary: Readonly<Record<CalculatorLocale, string>>;
}

export interface GearEnhanceBracketBreakdownItem {
  readonly bracketKey: string;
  readonly label: Readonly<Record<CalculatorLocale, string>>;
  readonly fromLevel: number;
  readonly toLevel: number;
  readonly perLevelRunes: number;
  readonly perLevelRuby: number;
  readonly runesPerPiece: number;
  readonly rubyPerPiece: number;
  readonly cumulativeRunesAtEnd: number;
  readonly cumulativeRubyAtEnd: number;
  readonly isReachedInTarget: boolean;
}

export interface GearEnhanceCalculationInput {
  readonly rarity?: GearEnhanceRarity;
  readonly slotId?: GearEnhanceSlotId;
  readonly fromLevel: number;
  readonly toLevel: number;
  readonly ownedRunes?: number;
  readonly ownedRuby?: number;
}

export interface GearEnhanceCalculationResult {
  readonly rarity: GearEnhanceRarity;
  readonly rarityConfig: GearEnhanceRarityConfig;
  readonly slotId: GearEnhanceSlotId;
  readonly slotMeta: GearPieceSlotMeta;
  readonly maxLevel: number;
  readonly fromLevel: number;
  readonly toLevel: number;
  readonly levelDelta: number;
  readonly isInvalidRange: boolean;
  readonly isAlreadyAtOrAboveTarget: boolean;
  readonly alreadyInvestedRunes: number;
  readonly alreadyInvestedRuby: number;
  readonly targetCumulativeRunes: number;
  readonly targetCumulativeRuby: number;
  readonly requiredRunes: number;
  readonly requiredRuby: number;
  readonly nextStepRunes: number;
  readonly nextStepRuby: number;
  readonly ownedRunes: number;
  readonly ownedRuby: number;
  readonly missingRunes: number;
  readonly missingRuby: number;
  readonly surplusRunes: number;
  readonly surplusRuby: number;
  readonly runeCompletionPercent: number;
  readonly rubyCompletionPercent: number;
  readonly runeMaterial: CalculatorMaterialRef;
  readonly rubyMaterial: CalculatorMaterialRef;
  readonly currentUnlockedMilestones: readonly GearPieceLevelMilestone[];
  readonly targetUnlockedMilestones: readonly GearPieceLevelMilestone[];
  readonly masterBonusTiers: readonly GearMasterBonusTier[];
  readonly bracketBreakdown: readonly GearEnhanceBracketBreakdownItem[];
}

interface StepBlockSpec {
  readonly fromLv: number;
  readonly toLv: number;
  readonly runes: number;
  readonly ruby: number;
}

function buildStepTableFromBlocks(
  maxLevel: number,
  blocks: readonly StepBlockSpec[]
): readonly GearEnhanceStepCost[] {
  const table: GearEnhanceStepCost[] = [
    {
      level: 0,
      runes: 0,
      ruby: 0,
      cumulativeRunes: 0,
      cumulativeRuby: 0,
    },
  ];

  let cumRunes = 0;
  let cumRuby = 0;

  for (let lv = 1; lv <= maxLevel; lv += 1) {
    const matched = blocks.find((b) => lv >= b.fromLv && lv <= b.toLv);
    const runes = matched?.runes ?? 0;
    const ruby = matched?.ruby ?? 0;
    cumRunes += runes;
    cumRuby += ruby;
    table.push({
      level: lv,
      runes,
      ruby,
      cumulativeRunes: cumRunes,
      cumulativeRuby: cumRuby,
    });
  }

  return table;
}

/**
 * Ground-truth step tables extracted from Meta.bytes (equipment_star_up):
 * - model_id 1501 (Quality 5 Legendary / Cam, max_level=40): 195,000 Rune + 936,000 Ruby
 * - model_id 1401 (Quality 4 Epic / Tím, max_level=30): 32,500 Rune + 39,000 Ruby
 * - model_id 1301 (Quality 3 Rare / Lam, max_level=15): 1,800 Rune + 1,440 Ruby
 */
export const GEAR_ENHANCE_STEPS_BY_RARITY: Readonly<
  Record<GearEnhanceRarity, readonly GearEnhanceStepCost[]>
> = {
  legendary: buildStepTableFromBlocks(40, [
    { fromLv: 1, toLv: 4, runes: 1_500, ruby: 7_200 },
    { fromLv: 5, toLv: 8, runes: 2_250, ruby: 10_800 },
    { fromLv: 9, toLv: 12, runes: 3_000, ruby: 14_400 },
    { fromLv: 13, toLv: 16, runes: 3_750, ruby: 18_000 },
    { fromLv: 17, toLv: 20, runes: 4_500, ruby: 21_600 },
    { fromLv: 21, toLv: 24, runes: 5_250, ruby: 25_200 },
    { fromLv: 25, toLv: 28, runes: 6_000, ruby: 28_800 },
    { fromLv: 29, toLv: 32, runes: 6_750, ruby: 32_400 },
    { fromLv: 33, toLv: 36, runes: 7_500, ruby: 36_000 },
    { fromLv: 37, toLv: 40, runes: 8_250, ruby: 39_600 },
  ]),
  epic: buildStepTableFromBlocks(30, [
    { fromLv: 1, toLv: 3, runes: 250, ruby: 300 },
    { fromLv: 4, toLv: 6, runes: 500, ruby: 600 },
    { fromLv: 7, toLv: 9, runes: 750, ruby: 900 },
    { fromLv: 10, toLv: 12, runes: 1_000, ruby: 1_200 },
    { fromLv: 13, toLv: 20, runes: 1_250, ruby: 1_500 },
    { fromLv: 21, toLv: 30, runes: 1_500, ruby: 1_800 },
  ]),
  rare: buildStepTableFromBlocks(15, [
    { fromLv: 1, toLv: 3, runes: 50, ruby: 40 },
    { fromLv: 4, toLv: 6, runes: 100, ruby: 80 },
    { fromLv: 7, toLv: 15, runes: 150, ruby: 120 },
  ]),
};

export const GEAR_ENHANCE_RARITY_CONFIGS: Readonly<
  Record<GearEnhanceRarity, GearEnhanceRarityConfig>
> = {
  legendary: {
    id: "legendary",
    rarity: "legendary",
    modelId: 1501,
    maxLevel: 40,
    quickMilestones: [0, 10, 20, 30, 40],
    label: {
      vi: "Huyền Thoại (Cam • Max +40)",
      en: "Legendary (Gold • Max +40)",
    },
    shortLabel: {
      vi: "Phẩm Cam",
      en: "Legendary",
    },
    badgeNote: {
      vi: "Đồ Đỏ Thần Thoại kế thừa trần Lv.40 của Đồ Cam và đột phá sao ở công cụ 4.2",
      en: "Mythic Red Gear inherits Lv.40 from Legendary Gear and promotes stars in tool 4.2",
    },
    sampleIconPath: "/images/equipment/hero-gear/icon_42053.webp",
    totalRuneAtMax: 195_000,
    totalRubyAtMax: 936_000,
  },
  epic: {
    id: "epic",
    rarity: "epic",
    modelId: 1401,
    maxLevel: 30,
    quickMilestones: [0, 10, 20, 30],
    label: {
      vi: "Sử Thi (Tím • Max +30)",
      en: "Epic (Purple • Max +30)",
    },
    shortLabel: {
      vi: "Phẩm Tím",
      en: "Epic",
    },
    badgeNote: {
      vi: "Trang bị Sử Thi có trần cường hóa tối đa Lv.30 (32.5K Rune + 39K Ruby)",
      en: "Epic Gear has a maximum enhancement cap of Lv.30 (32.5K Runes + 39K Rubies)",
    },
    sampleIconPath: "/images/equipment/hero-gear/icon_40005.webp",
    totalRuneAtMax: 32_500,
    totalRubyAtMax: 39_000,
  },
  rare: {
    id: "rare",
    rarity: "rare",
    modelId: 1301,
    maxLevel: 15,
    quickMilestones: [0, 5, 10, 15],
    label: {
      vi: "Hiếm (Lam • Max +15)",
      en: "Rare (Blue • Max +15)",
    },
    shortLabel: {
      vi: "Phẩm Lam",
      en: "Rare",
    },
    badgeNote: {
      vi: "Trang bị Hiếm đầu game có trần cường hóa tối đa Lv.15 (1.8K Rune + 1.44K Ruby)",
      en: "Early-game Rare Gear has a maximum enhancement cap of Lv.15 (1.8K Runes + 1.44K Rubies)",
    },
    sampleIconPath: "/images/equipment/hero-gear/icon_40006.webp",
    totalRuneAtMax: 1_800,
    totalRubyAtMax: 1_440,
  },
};

export const GEAR_SLOTS_BY_RARITY: Readonly<
  Record<GearEnhanceRarity, Readonly<Record<GearEnhanceSlotId, GearPieceSlotMeta>>>
> = {
  legendary: {
    weapon: {
      slotId: "weapon",
      gameId: 1531,
      slotLabel: { vi: "Vũ Khí", en: "Weapon" },
      itemName: { vi: "Thương Thánh Kỵ Sĩ", en: "Paladin's Lance" },
      setTitle: {
        vi: "Quang Vinh Kỵ Sĩ Bộ (4/4)",
        en: "Knight's Glory Set (4/4)",
      },
      iconPath: "/images/equipment/hero-gear/icon_40053.webp",
      baseStatsSummary: {
        vi: "ATK Trang Bị + Tỷ Lệ Bạo Kích",
        en: "Gear ATK + Crit Rate",
      },
      levelMilestones: [
        {
          level: 10,
          statLabel: { vi: "ATK Trang Bị", en: "Gear ATK" },
          bonusValue: "+705",
        },
        {
          level: 20,
          statLabel: { vi: "Tỷ Lệ Bạo Kích", en: "Crit Rate" },
          bonusValue: "+4.5%",
        },
        {
          level: 30,
          statLabel: { vi: "ATK Trang Bị", en: "Gear ATK" },
          bonusValue: "+705",
        },
        {
          level: 40,
          statLabel: { vi: "Tỷ Lệ Bạo Kích", en: "Crit Rate" },
          bonusValue: "+4.5%",
        },
      ],
    },
    boots: {
      slotId: "boots",
      gameId: 1533,
      slotLabel: { vi: "Giày", en: "Boots" },
      itemName: { vi: "Giày Hồn Kỵ Sĩ", en: "Knight's Soul Boots" },
      setTitle: {
        vi: "Quang Vinh Kỵ Sĩ Bộ (4/4)",
        en: "Knight's Glory Set (4/4)",
      },
      iconPath: "/images/equipment/hero-gear/icon_42053.webp",
      baseStatsSummary: {
        vi: "ATK Trang Bị + ST Bạo Kích",
        en: "Gear ATK + Crit DMG",
      },
      levelMilestones: [
        {
          level: 10,
          statLabel: { vi: "ATK Trang Bị", en: "Gear ATK" },
          bonusValue: "+705",
        },
        {
          level: 20,
          statLabel: { vi: "ST Bạo Kích", en: "Crit DMG" },
          bonusValue: "+4.5%",
        },
        {
          level: 30,
          statLabel: { vi: "ATK Trang Bị", en: "Gear ATK" },
          bonusValue: "+705",
        },
        {
          level: 40,
          statLabel: { vi: "ST Bạo Kích", en: "Crit DMG" },
          bonusValue: "+4.5%",
        },
      ],
    },
    armor: {
      slotId: "armor",
      gameId: 1532,
      slotLabel: { vi: "Giáp", en: "Armor" },
      itemName: { vi: "Hào Giáp Kỵ Sĩ", en: "Knight's Armor" },
      setTitle: {
        vi: "Quang Vinh Kỵ Sĩ Bộ (4/4)",
        en: "Knight's Glory Set (4/4)",
      },
      iconPath: "/images/equipment/hero-gear/icon_41053.webp",
      baseStatsSummary: {
        vi: "HP Trang Bị + Kháng Bạo Kích",
        en: "Gear HP + Crit Resist",
      },
      levelMilestones: [
        {
          level: 10,
          statLabel: { vi: "HP Trang Bị", en: "Gear HP" },
          bonusValue: "+6,300",
        },
        {
          level: 20,
          statLabel: { vi: "Kháng Bạo Kích", en: "Crit Resist" },
          bonusValue: "+4.5%",
        },
        {
          level: 30,
          statLabel: { vi: "HP Trang Bị", en: "Gear HP" },
          bonusValue: "+6,300",
        },
        {
          level: 40,
          statLabel: { vi: "Kháng Bạo Kích", en: "Crit Resist" },
          bonusValue: "+4.5%",
        },
      ],
    },
    helmet: {
      slotId: "helmet",
      gameId: 1534,
      slotLabel: { vi: "Mũ", en: "Helmet" },
      itemName: { vi: "Mũ Thần Kỵ Sĩ", en: "Knight's Helm" },
      setTitle: {
        vi: "Quang Vinh Kỵ Sĩ Bộ (4/4)",
        en: "Knight's Glory Set (4/4)",
      },
      iconPath: "/images/equipment/hero-gear/icon_45053.webp",
      baseStatsSummary: {
        vi: "HP Trang Bị + Giảm ST Bạo Kích",
        en: "Gear HP + Crit DMG Reduction",
      },
      levelMilestones: [
        {
          level: 10,
          statLabel: { vi: "HP Trang Bị", en: "Gear HP" },
          bonusValue: "+6,300",
        },
        {
          level: 20,
          statLabel: { vi: "Giảm ST Bạo Kích", en: "Crit DMG Red." },
          bonusValue: "+4.5%",
        },
        {
          level: 30,
          statLabel: { vi: "HP Trang Bị", en: "Gear HP" },
          bonusValue: "+6,300",
        },
        {
          level: 40,
          statLabel: { vi: "Giảm ST Bạo Kích", en: "Crit DMG Red." },
          bonusValue: "+4.5%",
        },
      ],
    },
  },
  epic: {
    weapon: {
      slotId: "weapon",
      gameId: 1401,
      slotLabel: { vi: "Vũ Khí", en: "Weapon" },
      itemName: {
        vi: "Kiếm Trưởng Quan Kỵ Sĩ",
        en: "Knight Commander's Sword",
      },
      setTitle: {
        vi: "Bộ Hợp Kim Kỵ Sĩ (Sử Thi)",
        en: "Knight Alloy Set (Epic)",
      },
      iconPath: "/images/equipment/hero-gear/icon_40005.webp",
      baseStatsSummary: {
        vi: "ATK Trang Bị + % ATK",
        en: "Gear ATK + % ATK",
      },
      levelMilestones: [
        {
          level: 10,
          statLabel: { vi: "ATK Trang Bị", en: "Gear ATK" },
          bonusValue: "+2%",
        },
        {
          level: 20,
          statLabel: { vi: "ATK Trang Bị", en: "Gear ATK" },
          bonusValue: "+2%",
        },
        {
          level: 30,
          statLabel: { vi: "ATK Trang Bị", en: "Gear ATK" },
          bonusValue: "+2%",
        },
      ],
    },
    boots: {
      slotId: "boots",
      gameId: 1403,
      slotLabel: { vi: "Giày", en: "Boots" },
      itemName: {
        vi: "Ủng Nặng Hợp Kim Kỵ Sĩ",
        en: "Knight Alloy Heavy Boots",
      },
      setTitle: {
        vi: "Bộ Hợp Kim Kỵ Sĩ (Sử Thi)",
        en: "Knight Alloy Set (Epic)",
      },
      iconPath: "/images/equipment/hero-gear/icon_42001.webp",
      baseStatsSummary: {
        vi: "ATK Trang Bị + % ATK",
        en: "Gear ATK + % ATK",
      },
      levelMilestones: [
        {
          level: 10,
          statLabel: { vi: "ATK Trang Bị", en: "Gear ATK" },
          bonusValue: "+2%",
        },
        {
          level: 20,
          statLabel: { vi: "ATK Trang Bị", en: "Gear ATK" },
          bonusValue: "+2%",
        },
        {
          level: 30,
          statLabel: { vi: "ATK Trang Bị", en: "Gear ATK" },
          bonusValue: "+2%",
        },
      ],
    },
    armor: {
      slotId: "armor",
      gameId: 1402,
      slotLabel: { vi: "Giáp", en: "Armor" },
      itemName: {
        vi: "Giáp Ngực Hợp Kim Kỵ Sĩ",
        en: "Knight Alloy Chestplate",
      },
      setTitle: {
        vi: "Bộ Hợp Kim Kỵ Sĩ (Sử Thi)",
        en: "Knight Alloy Set (Epic)",
      },
      iconPath: "/images/equipment/hero-gear/icon_41001.webp",
      baseStatsSummary: {
        vi: "HP Trang Bị + % HP",
        en: "Gear HP + % HP",
      },
      levelMilestones: [
        {
          level: 10,
          statLabel: { vi: "HP Trang Bị", en: "Gear HP" },
          bonusValue: "+2%",
        },
        {
          level: 20,
          statLabel: { vi: "HP Trang Bị", en: "Gear HP" },
          bonusValue: "+2%",
        },
        {
          level: 30,
          statLabel: { vi: "HP Trang Bị", en: "Gear HP" },
          bonusValue: "+2%",
        },
      ],
    },
    helmet: {
      slotId: "helmet",
      gameId: 1404,
      slotLabel: { vi: "Mũ", en: "Helmet" },
      itemName: { vi: "Mũ Hợp Kim Kỵ Sĩ", en: "Knight Alloy Helmet" },
      setTitle: {
        vi: "Bộ Hợp Kim Kỵ Sĩ (Sử Thi)",
        en: "Knight Alloy Set (Epic)",
      },
      iconPath: "/images/equipment/hero-gear/icon_45008.webp",
      baseStatsSummary: {
        vi: "HP Trang Bị + % HP",
        en: "Gear HP + % HP",
      },
      levelMilestones: [
        {
          level: 10,
          statLabel: { vi: "HP Trang Bị", en: "Gear HP" },
          bonusValue: "+2%",
        },
        {
          level: 20,
          statLabel: { vi: "HP Trang Bị", en: "Gear HP" },
          bonusValue: "+2%",
        },
        {
          level: 30,
          statLabel: { vi: "HP Trang Bị", en: "Gear HP" },
          bonusValue: "+2%",
        },
      ],
    },
  },
  rare: {
    weapon: {
      slotId: "weapon",
      gameId: 1301,
      slotLabel: { vi: "Vũ Khí", en: "Weapon" },
      itemName: { vi: "Gươm Chiến Binh Sĩ", en: "Soldier's Broadsword" },
      setTitle: {
        vi: "Bộ Phòng Hộ Binh Sĩ (Hiếm)",
        en: "Soldier's Protective Set (Rare)",
      },
      iconPath: "/images/equipment/hero-gear/icon_40006.webp",
      baseStatsSummary: {
        vi: "ATK Trang Bị Cơ Bản",
        en: "Base Gear ATK",
      },
      levelMilestones: [
        {
          level: 10,
          statLabel: { vi: "ATK Trang Bị", en: "Gear ATK" },
          bonusValue: "+70",
        },
      ],
    },
    boots: {
      slotId: "boots",
      gameId: 1303,
      slotLabel: { vi: "Giày", en: "Boots" },
      itemName: { vi: "Ủng Phòng Hộ Binh Sĩ", en: "Soldier's Protective Boots" },
      setTitle: {
        vi: "Bộ Phòng Hộ Binh Sĩ (Hiếm)",
        en: "Soldier's Protective Set (Rare)",
      },
      iconPath: "/images/equipment/hero-gear/icon_42004.webp",
      baseStatsSummary: {
        vi: "ATK Trang Bị Cơ Bản",
        en: "Base Gear ATK",
      },
      levelMilestones: [
        {
          level: 10,
          statLabel: { vi: "ATK Trang Bị", en: "Gear ATK" },
          bonusValue: "+70",
        },
      ],
    },
    armor: {
      slotId: "armor",
      gameId: 1302,
      slotLabel: { vi: "Giáp", en: "Armor" },
      itemName: {
        vi: "Giáp Phòng Hộ Binh Sĩ",
        en: "Soldier's Protective Armor",
      },
      setTitle: {
        vi: "Bộ Phòng Hộ Binh Sĩ (Hiếm)",
        en: "Soldier's Protective Set (Rare)",
      },
      iconPath: "/images/equipment/hero-gear/icon_41004.webp",
      baseStatsSummary: {
        vi: "HP Trang Bị Cơ Bản",
        en: "Base Gear HP",
      },
      levelMilestones: [
        {
          level: 10,
          statLabel: { vi: "HP Trang Bị", en: "Gear HP" },
          bonusValue: "+600",
        },
      ],
    },
    helmet: {
      slotId: "helmet",
      gameId: 1304,
      slotLabel: { vi: "Mũ", en: "Helmet" },
      itemName: {
        vi: "Mũ Phòng Hộ Binh Sĩ",
        en: "Soldier's Protective Helmet",
      },
      setTitle: {
        vi: "Bộ Phòng Hộ Binh Sĩ (Hiếm)",
        en: "Soldier's Protective Set (Rare)",
      },
      iconPath: "/images/equipment/hero-gear/icon_45004.webp",
      baseStatsSummary: {
        vi: "HP Trang Bị Cơ Bản",
        en: "Base Gear HP",
      },
      levelMilestones: [
        {
          level: 10,
          statLabel: { vi: "HP Trang Bị", en: "Gear HP" },
          bonusValue: "+600",
        },
      ],
    },
  },
};

/**
 * 4-Piece Enhancement Master Resonance bonuses from Meta.bytes (equipment_master, type=3)
 */
export const GEAR_MASTER_BONUS_BY_RARITY: Readonly<
  Record<GearEnhanceRarity, readonly GearMasterBonusTier[]>
> = {
  legendary: [
    {
      level: 10,
      atkBonus: 5_900,
      hpBonus: 74_000,
      summary: {
        vi: "ATK Trang Bị +5,900 • HP Trang Bị +74,000",
        en: "Gear ATK +5,900 • Gear HP +74,000",
      },
    },
    {
      level: 20,
      atkBonus: 8_200,
      hpBonus: 109_000,
      summary: {
        vi: "ATK Trang Bị +8,200 • HP Trang Bị +109,000",
        en: "Gear ATK +8,200 • Gear HP +109,000",
      },
    },
    {
      level: 30,
      atkBonus: 11_100,
      hpBonus: 160_000,
      summary: {
        vi: "ATK Trang Bị +11,100 • HP Trang Bị +160,000",
        en: "Gear ATK +11,100 • Gear HP +160,000",
      },
    },
    {
      level: 40,
      atkBonus: 14_800,
      hpBonus: 228_000,
      summary: {
        vi: "ATK Trang Bị +14,800 • HP Trang Bị +228,000",
        en: "Gear ATK +14,800 • Gear HP +228,000",
      },
    },
  ],
  epic: [
    {
      level: 10,
      atkBonus: 1_900,
      hpBonus: 19_000,
      summary: {
        vi: "ATK Trang Bị +1,900 • HP Trang Bị +19,000",
        en: "Gear ATK +1,900 • Gear HP +19,000",
      },
    },
    {
      level: 20,
      atkBonus: 3_000,
      hpBonus: 32_000,
      summary: {
        vi: "ATK Trang Bị +3,000 • HP Trang Bị +32,000",
        en: "Gear ATK +3,000 • Gear HP +32,000",
      },
    },
    {
      level: 30,
      atkBonus: 4_100,
      hpBonus: 47_000,
      summary: {
        vi: "ATK Trang Bị +4,100 • HP Trang Bị +47,000",
        en: "Gear ATK +4,100 • Gear HP +47,000",
      },
    },
  ],
  rare: [
    {
      level: 10,
      atkBonus: 700,
      hpBonus: 7_000,
      summary: {
        vi: "ATK Trang Bị +700 • HP Trang Bị +7,000",
        en: "Gear ATK +700 • Gear HP +7,000",
      },
    },
  ],
};

export function clampGearEnhanceLevel(
  level: number,
  rarity: GearEnhanceRarity = "legendary"
): number {
  const maxLv = GEAR_ENHANCE_RARITY_CONFIGS[rarity]?.maxLevel ?? MAX_GEAR_ENHANCE_LEVEL;
  if (!Number.isFinite(level)) return MIN_GEAR_ENHANCE_LEVEL;
  return Math.max(
    MIN_GEAR_ENHANCE_LEVEL,
    Math.min(maxLv, Math.floor(level))
  );
}

export function getStepGearEnhanceCost(
  level: number,
  rarity: GearEnhanceRarity = "legendary"
): { readonly runes: number; readonly ruby: number } {
  const clamped = clampGearEnhanceLevel(level, rarity);
  if (clamped === 0) return { runes: 0, ruby: 0 };
  const table = GEAR_ENHANCE_STEPS_BY_RARITY[rarity];
  const node = table[clamped];
  return {
    runes: node?.runes ?? 0,
    ruby: node?.ruby ?? 0,
  };
}

export function getCumulativeGearEnhanceCost(
  level: number,
  rarity: GearEnhanceRarity = "legendary"
): { readonly runes: number; readonly ruby: number } {
  const clamped = clampGearEnhanceLevel(level, rarity);
  if (clamped === 0) return { runes: 0, ruby: 0 };
  const table = GEAR_ENHANCE_STEPS_BY_RARITY[rarity];
  const node = table[clamped];
  return {
    runes: node?.cumulativeRunes ?? 0,
    ruby: node?.cumulativeRuby ?? 0,
  };
}

const BRACKET_DEFINITIONS_BY_RARITY: Readonly<
  Record<
    GearEnhanceRarity,
    readonly {
      readonly key: string;
      readonly startLv: number;
      readonly endLv: number;
      readonly label: Readonly<Record<CalculatorLocale, string>>;
    }[]
  >
> = {
  legendary: [
    {
      key: "leg-1-10",
      startLv: 0,
      endLv: 10,
      label: {
        vi: "Chặng 1 (Lv.0 ➔ +10)",
        en: "Stage 1 (Lv.0 ➔ +10)",
      },
    },
    {
      key: "leg-11-20",
      startLv: 10,
      endLv: 20,
      label: {
        vi: "Chặng 2 (+10 ➔ +20)",
        en: "Stage 2 (+10 ➔ +20)",
      },
    },
    {
      key: "leg-21-30",
      startLv: 20,
      endLv: 30,
      label: {
        vi: "Chặng 3 (+20 ➔ +30)",
        en: "Stage 3 (+20 ➔ +30)",
      },
    },
    {
      key: "leg-31-40",
      startLv: 30,
      endLv: 40,
      label: {
        vi: "Chặng 4 (+30 ➔ +40 Max)",
        en: "Stage 4 (+30 ➔ +40 Max)",
      },
    },
  ],
  epic: [
    {
      key: "epic-1-10",
      startLv: 0,
      endLv: 10,
      label: {
        vi: "Chặng 1 (Lv.0 ➔ +10)",
        en: "Stage 1 (Lv.0 ➔ +10)",
      },
    },
    {
      key: "epic-11-20",
      startLv: 10,
      endLv: 20,
      label: {
        vi: "Chặng 2 (+10 ➔ +20)",
        en: "Stage 2 (+10 ➔ +20)",
      },
    },
    {
      key: "epic-21-30",
      startLv: 20,
      endLv: 30,
      label: {
        vi: "Chặng 3 (+20 ➔ +30 Max)",
        en: "Stage 3 (+20 ➔ +30 Max)",
      },
    },
  ],
  rare: [
    {
      key: "rare-1-10",
      startLv: 0,
      endLv: 10,
      label: {
        vi: "Chặng 1 (Lv.0 ➔ +10)",
        en: "Stage 1 (Lv.0 ➔ +10)",
      },
    },
    {
      key: "rare-11-15",
      startLv: 10,
      endLv: 15,
      label: {
        vi: "Chặng 2 (+10 ➔ +15 Max)",
        en: "Stage 2 (+10 ➔ +15 Max)",
      },
    },
  ],
};

export function calculateGearEnhancePlan(
  input: GearEnhanceCalculationInput
): GearEnhanceCalculationResult {
  const rarity: GearEnhanceRarity = input.rarity ?? "legendary";
  const slotId: GearEnhanceSlotId = input.slotId ?? "boots";
  const rarityConfig = GEAR_ENHANCE_RARITY_CONFIGS[rarity];
  const slotMeta = GEAR_SLOTS_BY_RARITY[rarity][slotId];
  const maxLevel = rarityConfig.maxLevel;

  const safeFromLevel = clampGearEnhanceLevel(input.fromLevel, rarity);
  const safeToLevel = clampGearEnhanceLevel(input.toLevel, rarity);
  const safeOwnedRunes = Math.max(0, Math.floor(input.ownedRunes ?? 0));
  const safeOwnedRuby = Math.max(0, Math.floor(input.ownedRuby ?? 0));

  const isInvalidRange = safeFromLevel > safeToLevel;
  const isAlreadyAtOrAboveTarget = safeFromLevel >= safeToLevel;
  const levelDelta = isInvalidRange ? 0 : Math.max(0, safeToLevel - safeFromLevel);

  const fromCum = getCumulativeGearEnhanceCost(safeFromLevel, rarity);
  const toCum = getCumulativeGearEnhanceCost(safeToLevel, rarity);

  const alreadyInvestedRunes = fromCum.runes;
  const alreadyInvestedRuby = fromCum.ruby;
  const targetCumulativeRunes = toCum.runes;
  const targetCumulativeRuby = toCum.ruby;

  const requiredRunes = isInvalidRange
    ? 0
    : Math.max(0, targetCumulativeRunes - alreadyInvestedRunes);
  const requiredRuby = isInvalidRange
    ? 0
    : Math.max(0, targetCumulativeRuby - alreadyInvestedRuby);

  const nextStepCost =
    safeFromLevel >= maxLevel
      ? { runes: 0, ruby: 0 }
      : getStepGearEnhanceCost(safeFromLevel + 1, rarity);

  const missingRunes = Math.max(0, requiredRunes - safeOwnedRunes);
  const missingRuby = Math.max(0, requiredRuby - safeOwnedRuby);
  const surplusRunes = Math.max(0, safeOwnedRunes - requiredRunes);
  const surplusRuby = Math.max(0, safeOwnedRuby - requiredRuby);

  const runeCompletionPercent =
    requiredRunes === 0
      ? 100
      : Math.min(100, Math.floor((safeOwnedRunes / requiredRunes) * 100));
  const rubyCompletionPercent =
    requiredRuby === 0
      ? 100
      : Math.min(100, Math.floor((safeOwnedRuby / requiredRuby) * 100));

  const currentUnlockedMilestones = slotMeta.levelMilestones.filter(
    (m) => safeFromLevel >= m.level
  );
  const targetUnlockedMilestones = slotMeta.levelMilestones.filter(
    (m) => safeToLevel >= m.level
  );

  const bracketDefs = BRACKET_DEFINITIONS_BY_RARITY[rarity];
  const bracketBreakdown: GearEnhanceBracketBreakdownItem[] = bracketDefs.map(
    (b) => {
      const startCum = getCumulativeGearEnhanceCost(b.startLv, rarity);
      const endCum = getCumulativeGearEnhanceCost(b.endLv, rarity);
      const endStep = getStepGearEnhanceCost(b.endLv, rarity);

      return {
        bracketKey: b.key,
        label: b.label,
        fromLevel: b.startLv,
        toLevel: b.endLv,
        perLevelRunes: endStep.runes,
        perLevelRuby: endStep.ruby,
        runesPerPiece: endCum.runes - startCum.runes,
        rubyPerPiece: endCum.ruby - startCum.ruby,
        cumulativeRunesAtEnd: endCum.runes,
        cumulativeRubyAtEnd: endCum.ruby,
        isReachedInTarget: safeToLevel >= b.endLv,
      };
    }
  );

  return {
    rarity,
    rarityConfig,
    slotId,
    slotMeta,
    maxLevel,
    fromLevel: safeFromLevel,
    toLevel: safeToLevel,
    levelDelta,
    isInvalidRange,
    isAlreadyAtOrAboveTarget,
    alreadyInvestedRunes,
    alreadyInvestedRuby,
    targetCumulativeRunes,
    targetCumulativeRuby,
    requiredRunes,
    requiredRuby,
    nextStepRunes: nextStepCost.runes,
    nextStepRuby: nextStepCost.ruby,
    ownedRunes: safeOwnedRunes,
    ownedRuby: safeOwnedRuby,
    missingRunes,
    missingRuby,
    surplusRunes,
    surplusRuby,
    runeCompletionPercent,
    rubyCompletionPercent,
    runeMaterial: CALCULATOR_MATERIALS.gearEnhanceRune,
    rubyMaterial: CALCULATOR_MATERIALS.ruby,
    currentUnlockedMilestones,
    targetUnlockedMilestones,
    masterBonusTiers: GEAR_MASTER_BONUS_BY_RARITY[rarity],
    bracketBreakdown,
  };
}

export const calculateGearEnhancement = calculateGearEnhancePlan;

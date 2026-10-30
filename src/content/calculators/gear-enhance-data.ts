import { CALCULATOR_MATERIALS } from "./registry";
import type { CalculatorLocale, CalculatorMaterialRef } from "./types";

export type GearEnhanceRarity = "epic" | "legendary" | "mythic";
export type GearEnhanceScopeMode =
  | "single_piece"
  | "hero_set_4"
  | "squad_24"
  | "custom_4_slots";
export type GearHeroRoleBranch = "tank" | "dps" | "healer";
export type GearSlotKey = "weapon" | "boots" | "helmet" | "chest";
export type EnhancementMasterTier = 0 | 10 | 20 | 30 | 40;

export const MIN_GEAR_ENHANCE_LEVEL = 0;
export const MAX_GEAR_ENHANCE_LEVEL = 40;
export const MEAT_TO_RUNE_RATIO = 4.8;

export const GEAR_SLOT_ORDER: readonly GearSlotKey[] = [
  "weapon",
  "boots",
  "helmet",
  "chest",
] as const;

export interface GearEnhanceRarityConfig {
  readonly rarity: GearEnhanceRarity;
  readonly costMultiplier: number;
  readonly label: Record<CalculatorLocale, string>;
  readonly shortLabel: Record<CalculatorLocale, string>;
  readonly recommendation: Record<CalculatorLocale, string>;
}

export interface GearSlotConfig {
  readonly key: GearSlotKey;
  readonly label: Record<CalculatorLocale, string>;
  readonly shortLabel: Record<CalculatorLocale, string>;
  readonly primaryStatFocus: Record<CalculatorLocale, string>;
}

export interface GearRoleSetSlotAsset {
  readonly slotKey: GearSlotKey;
  readonly nameVi: string;
  readonly nameEn: string;
  readonly iconPath: string;
}

export interface GearRoleBranchConfig {
  readonly role: GearHeroRoleBranch;
  readonly label: Record<CalculatorLocale, string>;
  readonly shortLabel: Record<CalculatorLocale, string>;
  readonly setName: Record<CalculatorLocale, string>;
  readonly slotUpgradeOrder: readonly GearSlotKey[];
  readonly upgradeOrderRationale: Record<CalculatorLocale, string>;
  readonly masterStatBonusByTier: Readonly<
    Record<EnhancementMasterTier, Record<CalculatorLocale, string>>
  >;
  readonly slots: Readonly<Record<GearSlotKey, GearRoleSetSlotAsset>>;
}

export interface GearEnhanceLevelNode {
  readonly level: number;
  readonly blockIndex: number;
  readonly baseStepRunes: number;
  readonly baseStepMeat: number;
  readonly baseCumulativeRunes: number;
  readonly baseCumulativeMeat: number;
  readonly isMasterMilestone: boolean;
  readonly masterTier: EnhancementMasterTier;
}

export interface EnhancementMasterMilestoneInfo {
  readonly tier: EnhancementMasterTier;
  readonly requiredMinLevel: number;
  readonly label: Record<CalculatorLocale, string>;
  readonly cumulativeRunesPerPiece: number;
  readonly cumulativeRunesPerHeroSet: number;
  readonly cumulativeRunesPerSquad24: number;
}

export interface GearEnhanceBracketBreakdownItem {
  readonly bracketKey: string;
  readonly label: Record<CalculatorLocale, string>;
  readonly fromLevel: number;
  readonly toLevel: number;
  readonly runesPerPiece: number;
  readonly meatPerPiece: number;
  readonly totalRunesForScope: number;
  readonly totalMeatForScope: number;
  readonly cumulativeRunesAtEnd: number;
  readonly cumulativeMeatAtEnd: number;
  readonly masterTierUnlocked: EnhancementMasterTier;
}

export interface GearCustomSlotRange {
  readonly fromLevel: number;
  readonly toLevel: number;
}

export interface GearSlotAuditItem {
  readonly slotKey: GearSlotKey;
  readonly fromLevel: number;
  readonly toLevel: number;
  readonly isInvalidSlotRange: boolean;
  readonly requiredRunes: number;
  readonly requiredMeat: number;
  readonly isBottleneck: boolean;
}

export interface GearEnhanceCalculationInput {
  readonly rarity: GearEnhanceRarity;
  readonly scopeMode: GearEnhanceScopeMode;
  readonly roleBranch: GearHeroRoleBranch;
  readonly fromLevel: number;
  readonly toLevel: number;
  readonly customSlotLevels?: Readonly<Record<GearSlotKey, GearCustomSlotRange>>;
  readonly ownedRunes?: number;
  readonly ownedMeat?: number;
}

export interface GearEnhanceCalculationResult {
  readonly rarity: GearEnhanceRarity;
  readonly rarityConfig: GearEnhanceRarityConfig;
  readonly scopeMode: GearEnhanceScopeMode;
  readonly roleBranch: GearHeroRoleBranch;
  readonly roleConfig: GearRoleBranchConfig;
  readonly pieceMultiplier: number;
  readonly fromLevel: number;
  readonly toLevel: number;
  readonly isInvalidRange: boolean;
  readonly invalidSlotKeys: readonly GearSlotKey[];
  readonly currentMinSlotLevel: number;
  readonly targetMinSlotLevel: number;
  readonly currentMasterTier: EnhancementMasterTier;
  readonly targetMasterTier: EnhancementMasterTier;
  readonly nextMasterTier: EnhancementMasterTier | null;
  readonly bottleneckSlots: readonly GearSlotKey[];
  readonly runesToNextMasterMilestone: number;
  readonly alreadyInvestedRunes: number;
  readonly alreadyInvestedMeat: number;
  readonly targetCumulativeRunes: number;
  readonly targetCumulativeMeat: number;
  readonly requiredRunes: number;
  readonly requiredMeat: number;
  readonly ownedRunes: number;
  readonly ownedMeat: number;
  readonly missingRunes: number;
  readonly missingMeat: number;
  readonly surplusRunes: number;
  readonly surplusMeat: number;
  readonly runeCompletionPercent: number;
  readonly meatCompletionPercent: number;
  readonly runeMaterial: CalculatorMaterialRef;
  readonly meatMaterial: CalculatorMaterialRef;
  readonly slotAudits: readonly GearSlotAuditItem[];
  readonly bracketBreakdown: readonly GearEnhanceBracketBreakdownItem[];
}

export const GEAR_ENHANCE_RARITY_CONFIGS: Readonly<
  Record<GearEnhanceRarity, GearEnhanceRarityConfig>
> = {
  epic: {
    rarity: "epic",
    costMultiplier: 0.5,
    label: {
      vi: "Trang Bị Tím (Sử Thi)",
      en: "Epic Gear (Purple)",
    },
    shortLabel: {
      vi: "Phẩm Tím",
      en: "Epic",
    },
    recommendation: {
      vi: "Trang bị quá độ đầu game (hệ số 0.5×). Khuyến nghị chỉ dừng ở mốc Cộng Hưởng +10 hoặc +20 trước khi rèn Đồ Cam Huyền Thoại.",
      en: "Early-game transitional tier (0.5× cost). Recommended to stop at +10 or +20 Enhancement Master before forging Legendary Golden Gear.",
    },
  },
  legendary: {
    rarity: "legendary",
    costMultiplier: 1.0,
    label: {
      vi: "Trang Bị Cam (Huyền Thoại)",
      en: "Legendary Gear (Golden)",
    },
    shortLabel: {
      vi: "Phẩm Cam",
      en: "Legendary",
    },
    recommendation: {
      vi: "Trần chuẩn Lv.40 (195,000 Rune/món). Cần đạt Lv.40 để mở khóa Đột Phá Sao và Tiến Hóa Đồ Đỏ ở công cụ 4.2.",
      en: "Standard Lv.40 cap (195,000 Runes/piece). Reaching Lv.40 is required to unlock Star Promotion and Mythic Ascension in tool 4.2.",
    },
  },
  mythic: {
    rarity: "mythic",
    costMultiplier: 1.0,
    label: {
      vi: "Trang Bị Đỏ (Thần Thoại)",
      en: "Mythic Gear (Red)",
    },
    shortLabel: {
      vi: "Phẩm Đỏ",
      en: "Mythic",
    },
    recommendation: {
      vi: "Kế thừa cấp cường hóa Lv.40 từ Đồ Cam và nâng phẩm chất Cộng Hưởng Bậc Thầy Cường Hóa lên bậc Thần Thoại tối đa.",
      en: "Inherits Lv.40 enhancement from Legendary Gear while upgrading Enhancement Master resonance to Mythic tier.",
    },
  },
};

export const GEAR_SLOT_CONFIGS: Readonly<Record<GearSlotKey, GearSlotConfig>> = {
  weapon: {
    key: "weapon",
    label: {
      vi: "Vũ Khí (Kiếm / Rìu / Trượng)",
      en: "Weapon (Sword / Axe / Staff)",
    },
    shortLabel: {
      vi: "Vũ Khí",
      en: "Weapon",
    },
    primaryStatFocus: {
      vi: "Công Tướng (ATK) & Sát Thương Kỹ Năng",
      en: "Hero ATK & Skill Damage",
    },
  },
  boots: {
    key: "boots",
    label: {
      vi: "Giày (Ủng Chiến)",
      en: "Boots (Greaves)",
    },
    shortLabel: {
      vi: "Giày",
      en: "Boots",
    },
    primaryStatFocus: {
      vi: "Công Tướng (ATK) & Tốc Độ Hành Động",
      en: "Hero ATK & Action Speed",
    },
  },
  helmet: {
    key: "helmet",
    label: {
      vi: "Mũ (Mũ Giáp)",
      en: "Helmet (Helm)",
    },
    shortLabel: {
      vi: "Mũ",
      en: "Helmet",
    },
    primaryStatFocus: {
      vi: "Máu Tướng (HP) & Kháng Bạo Kích",
      en: "Hero HP & Crit Resistance",
    },
  },
  chest: {
    key: "chest",
    label: {
      vi: "Giáp (Áo Giáp)",
      en: "Armor (Chestplate)",
    },
    shortLabel: {
      vi: "Giáp",
      en: "Armor",
    },
    primaryStatFocus: {
      vi: "Máu Tướng (HP) & Giảm Sát Thương",
      en: "Hero HP & Damage Reduction",
    },
  },
};

export const GEAR_ROLE_CONFIGS: Readonly<
  Record<GearHeroRoleBranch, GearRoleBranchConfig>
> = {
  tank: {
    role: "tank",
    label: {
      vi: "Đỡ Đòn / Tiền Tuyến (Tank)",
      en: "Frontline Tank / Bruiser",
    },
    shortLabel: {
      vi: "Đỡ Đòn (Tank)",
      en: "Tank",
    },
    setName: {
      vi: "Bộ Huyết Titan ➔ Uy Lực Titan",
      en: "Blood of the Titan ➔ Titan's Might",
    },
    slotUpgradeOrder: ["helmet", "chest", "weapon", "boots"],
    upgradeOrderRationale: {
      vi: "Ưu tiên nâng Mũ + Giáp lên mốc +10/+20/+30/+40 trước để tối đa hóa HP & Giảm Sát Thương cho hàng chắn tiền tuyến, sau đó kéo Vũ khí + Giày lên cùng bậc để kích hoạt Cộng Hưởng.",
      en: "Prioritize Helmet + Armor to +10/+20/+30/+40 first to maximize frontline HP and Damage Reduction, then bring Weapon + Boots up to trigger Enhancement Master resonance.",
    },
    masterStatBonusByTier: {
      0: {
        vi: "Chưa kích hoạt Cộng Hưởng (Cần cả 4 món đạt tối thiểu +10)",
        en: "No Resonance active (Requires all 4 pieces at +10 minimum)",
      },
      10: {
        vi: "Bậc Thầy I (+10): +5% HP Tướng & +3% Phòng Thủ Tiền Tuyến",
        en: "Master I (+10): +5% Hero HP & +3% Frontline DEF",
      },
      20: {
        vi: "Bậc Thầy II (+20): +12% HP Tướng, +6% DEF & +3% Giảm Sát Thương Nhận Vào",
        en: "Master II (+20): +12% Hero HP, +6% DEF & +3% Damage Reduction",
      },
      30: {
        vi: "Bậc Thầy III (+30): +22% HP Tướng, +10% DEF & +6% Giảm Sát Thương Nhận Vào",
        en: "Master III (+30): +22% Hero HP, +10% DEF & +6% Damage Reduction",
      },
      40: {
        vi: "Bậc Thầy IV (+40 Max): +35% HP Tướng, +15% DEF & +10% Giảm Sát Thương Nhận Vào",
        en: "Master IV (+40 Max): +35% Hero HP, +15% DEF & +10% Damage Reduction",
      },
    },
    slots: {
      weapon: {
        slotKey: "weapon",
        nameVi: "Rìu Đại Địa",
        nameEn: "Terran Axe",
        iconPath: "/images/equipment/hero-gear/icon_40013.webp",
      },
      boots: {
        slotKey: "boots",
        nameVi: "Ủng Nặng Đại Địa",
        nameEn: "Terran Heavy Boots",
        iconPath: "/images/equipment/hero-gear/icon_42013.webp",
      },
      helmet: {
        slotKey: "helmet",
        nameVi: "Mũ Nặng Đại Địa",
        nameEn: "Terran Heavy Helmet",
        iconPath: "/images/equipment/hero-gear/icon_45013.webp",
      },
      chest: {
        slotKey: "chest",
        nameVi: "Giáp Nặng Đại Địa",
        nameEn: "Terran Heavy Armor",
        iconPath: "/images/equipment/hero-gear/icon_41013.webp",
      },
    },
  },
  dps: {
    role: "dps",
    label: {
      vi: "Sát Thương Chủ Lực (DPS / Carry)",
      en: "Main Carry / Burst DPS",
    },
    shortLabel: {
      vi: "Sát Thương (DPS)",
      en: "DPS",
    },
    setName: {
      vi: "Bộ Kỵ Sĩ Vinh Quang ➔ Cơn Thịnh Nộ",
      en: "Knight's Glory ➔ Fury of Blood",
    },
    slotUpgradeOrder: ["weapon", "boots", "helmet", "chest"],
    upgradeOrderRationale: {
      vi: "Ưu tiên nâng Vũ khí + Giày trước để bứt phá Công Tướng (ATK) & Sát Thương Kỹ Năng, sau đó nâng đều Mũ + Giáp để khóa mốc Cộng Hưởng +10/+20/+30/+40.",
      en: "Prioritize Weapon + Boots first to maximize Hero ATK and Skill Damage, then equalize Helmet + Armor to lock in +10/+20/+30/+40 Enhancement Master resonance.",
    },
    masterStatBonusByTier: {
      0: {
        vi: "Chưa kích hoạt Cộng Hưởng (Cần cả 4 món đạt tối thiểu +10)",
        en: "No Resonance active (Requires all 4 pieces at +10 minimum)",
      },
      10: {
        vi: "Bậc Thầy I (+10): +5% Công Tướng (ATK) & +3% Máu Tướng",
        en: "Master I (+10): +5% Hero ATK & +3% Hero HP",
      },
      20: {
        vi: "Bậc Thầy II (+20): +12% Công Tướng (ATK), +6% HP & +4% Sát Thương Kỹ Năng",
        en: "Master II (+20): +12% Hero ATK, +6% HP & +4% Skill Damage",
      },
      30: {
        vi: "Bậc Thầy III (+30): +22% Công Tướng (ATK), +10% HP & +8% Sát Thương Kỹ Năng",
        en: "Master III (+30): +22% Hero ATK, +10% HP & +8% Skill Damage",
      },
      40: {
        vi: "Bậc Thầy IV (+40 Max): +35% Công Tướng (ATK), +15% HP & +12% Sát Thương Kỹ Năng",
        en: "Master IV (+40 Max): +35% Hero ATK, +15% HP & +12% Skill Damage",
      },
    },
    slots: {
      weapon: {
        slotKey: "weapon",
        nameVi: "Kiếm Kỵ Sĩ",
        nameEn: "Knight's Sword",
        iconPath: "/images/equipment/hero-gear/icon_40005.webp",
      },
      boots: {
        slotKey: "boots",
        nameVi: "Giày Kỵ Sĩ",
        nameEn: "Knight's Boots",
        iconPath: "/images/equipment/hero-gear/icon_42001.webp",
      },
      helmet: {
        slotKey: "helmet",
        nameVi: "Mũ Giáp Hiệp Sĩ",
        nameEn: "Knight's Helmet",
        iconPath: "/images/equipment/hero-gear/icon_45001.webp",
      },
      chest: {
        slotKey: "chest",
        nameVi: "Giáp Mũ Kỵ Sĩ",
        nameEn: "Knight's Armor",
        iconPath: "/images/equipment/hero-gear/icon_41001.webp",
      },
    },
  },
  healer: {
    role: "healer",
    label: {
      vi: "Hỗ Trợ / Hồi Máu (Healer & Support)",
      en: "Healer & Tactical Support",
    },
    shortLabel: {
      vi: "Hỗ Trợ (Healer)",
      en: "Healer",
    },
    setName: {
      vi: "Bộ Hiền Triết Quang Vinh ➔ Ánh Sáng Vinh Quang",
      en: "Glory of the Sage ➔ Glorious Light",
    },
    slotUpgradeOrder: ["weapon", "boots", "helmet", "chest"],
    upgradeOrderRationale: {
      vi: "Lượng hồi máu của Healer (Nun, Pixie, Tidecaller, Druid) tỷ lệ thuận với chỉ số Công (ATK), nên ưu tiên nâng Vũ khí + Giày trước, rồi nâng Mũ + Giáp để lấy mốc Cộng Hưởng.",
      en: "Healing output (Nun, Pixie, Tidecaller, Druid) scales directly with Hero ATK; prioritize Weapon + Boots first, then bring Helmet + Armor up to complete each Resonance tier.",
    },
    masterStatBonusByTier: {
      0: {
        vi: "Chưa kích hoạt Cộng Hưởng (Cần cả 4 món đạt tối thiểu +10)",
        en: "No Resonance active (Requires all 4 pieces at +10 minimum)",
      },
      10: {
        vi: "Bậc Thầy I (+10): +5% Công/Hồi Phục & +4% HP Sinh Tồn",
        en: "Master I (+10): +5% ATK/Healing & +4% Survival HP",
      },
      20: {
        vi: "Bậc Thầy II (+20): +12% Công/Hồi Phục, +8% HP & +4% Hiệu Quả Hồi Máu",
        en: "Master II (+20): +12% ATK/Healing, +8% HP & +4% Healing Bonus",
      },
      30: {
        vi: "Bậc Thầy III (+30): +22% Công/Hồi Phục, +14% HP & +8% Hiệu Quả Hồi Máu",
        en: "Master III (+30): +22% ATK/Healing, +14% HP & +8% Healing Bonus",
      },
      40: {
        vi: "Bậc Thầy IV (+40 Max): +35% Công/Hồi Phục, +20% HP & +12% Hiệu Quả Hồi Máu",
        en: "Master IV (+40 Max): +35% ATK/Healing, +20% HP & +12% Healing Bonus",
      },
    },
    slots: {
      weapon: {
        slotKey: "weapon",
        nameVi: "Gậy Dài Hiền Giả",
        nameEn: "Sage's Staff",
        iconPath: "/images/equipment/hero-gear/icon_40009.webp",
      },
      boots: {
        slotKey: "boots",
        nameVi: "Ủng Hiền Giả",
        nameEn: "Sage's Boots",
        iconPath: "/images/equipment/hero-gear/icon_42009.webp",
      },
      helmet: {
        slotKey: "helmet",
        nameVi: "Mũ Hiền Giả",
        nameEn: "Sage's Hood",
        iconPath: "/images/equipment/hero-gear/icon_45009.webp",
      },
      chest: {
        slotKey: "chest",
        nameVi: "Áo Hiền Giả",
        nameEn: "Sage's Robe",
        iconPath: "/images/equipment/hero-gear/icon_41009.webp",
      },
    },
  },
};

export function clampGearEnhanceLevel(level: number): number {
  if (!Number.isFinite(level)) return MIN_GEAR_ENHANCE_LEVEL;
  return Math.max(
    MIN_GEAR_ENHANCE_LEVEL,
    Math.min(MAX_GEAR_ENHANCE_LEVEL, Math.floor(level))
  );
}

export function resolveEnhancementMasterTier(
  minSlotLevel: number
): EnhancementMasterTier {
  const clamped = clampGearEnhanceLevel(minSlotLevel);
  if (clamped >= 40) return 40;
  if (clamped >= 30) return 30;
  if (clamped >= 20) return 20;
  if (clamped >= 10) return 10;
  return 0;
}

export function resolveNextEnhancementMasterTier(
  currentTier: EnhancementMasterTier
): EnhancementMasterTier | null {
  if (currentTier === 0) return 10;
  if (currentTier === 10) return 20;
  if (currentTier === 20) return 30;
  if (currentTier === 30) return 40;
  return null;
}

function buildGearEnhanceLevelSteps(): readonly GearEnhanceLevelNode[] {
  const nodes: GearEnhanceLevelNode[] = [
    {
      level: 0,
      blockIndex: 0,
      baseStepRunes: 0,
      baseStepMeat: 0,
      baseCumulativeRunes: 0,
      baseCumulativeMeat: 0,
      isMasterMilestone: false,
      masterTier: 0,
    },
  ];

  let cumRunes = 0;
  let cumMeat = 0;

  for (let lv = 1; lv <= MAX_GEAR_ENHANCE_LEVEL; lv++) {
    const blockIndex = Math.floor((lv - 1) / 4) + 1;
    const baseStepRunes = 1500 + Math.floor((lv - 1) / 4) * 750;
    const baseStepMeat = Math.round(baseStepRunes * MEAT_TO_RUNE_RATIO);
    cumRunes += baseStepRunes;
    cumMeat += baseStepMeat;
    const isMasterMilestone = lv === 10 || lv === 20 || lv === 30 || lv === 40;

    nodes.push({
      level: lv,
      blockIndex,
      baseStepRunes,
      baseStepMeat,
      baseCumulativeRunes: cumRunes,
      baseCumulativeMeat: cumMeat,
      isMasterMilestone,
      masterTier: resolveEnhancementMasterTier(lv),
    });
  }

  return nodes;
}

export const GEAR_ENHANCE_LEVEL_STEPS: readonly GearEnhanceLevelNode[] =
  buildGearEnhanceLevelSteps();

export const ENHANCEMENT_MASTER_TIERS: readonly EnhancementMasterMilestoneInfo[] =
  [
    {
      tier: 0,
      requiredMinLevel: 0,
      label: {
        vi: "Chưa Mở (+0)",
        en: "Inactive (+0)",
      },
      cumulativeRunesPerPiece: 0,
      cumulativeRunesPerHeroSet: 0,
      cumulativeRunesPerSquad24: 0,
    },
    {
      tier: 10,
      requiredMinLevel: 10,
      label: {
        vi: "Bậc Thầy I (+10)",
        en: "Master I (+10)",
      },
      cumulativeRunesPerPiece: 21_000,
      cumulativeRunesPerHeroSet: 84_000,
      cumulativeRunesPerSquad24: 504_000,
    },
    {
      tier: 20,
      requiredMinLevel: 20,
      label: {
        vi: "Bậc Thầy II (+20)",
        en: "Master II (+20)",
      },
      cumulativeRunesPerPiece: 60_000,
      cumulativeRunesPerHeroSet: 240_000,
      cumulativeRunesPerSquad24: 1_440_000,
    },
    {
      tier: 30,
      requiredMinLevel: 30,
      label: {
        vi: "Bậc Thầy III (+30)",
        en: "Master III (+30)",
      },
      cumulativeRunesPerPiece: 118_500,
      cumulativeRunesPerHeroSet: 474_000,
      cumulativeRunesPerSquad24: 2_844_000,
    },
    {
      tier: 40,
      requiredMinLevel: 40,
      label: {
        vi: "Bậc Thầy IV (+40 Max)",
        en: "Master IV (+40 Max)",
      },
      cumulativeRunesPerPiece: 195_000,
      cumulativeRunesPerHeroSet: 780_000,
      cumulativeRunesPerSquad24: 4_680_000,
    },
  ] as const;

export function getStepGearEnhanceCost(
  level: number,
  rarity: GearEnhanceRarity = "legendary"
): { readonly runes: number; readonly meat: number } {
  const clamped = clampGearEnhanceLevel(level);
  if (clamped === 0) return { runes: 0, meat: 0 };
  const node = GEAR_ENHANCE_LEVEL_STEPS[clamped];
  const factor = GEAR_ENHANCE_RARITY_CONFIGS[rarity].costMultiplier;
  return {
    runes: Math.round(node.baseStepRunes * factor),
    meat: Math.round(node.baseStepMeat * factor),
  };
}

export function getCumulativeGearEnhanceCost(
  level: number,
  rarity: GearEnhanceRarity = "legendary"
): { readonly runes: number; readonly meat: number } {
  const clamped = clampGearEnhanceLevel(level);
  if (clamped === 0) return { runes: 0, meat: 0 };
  let runes = 0;
  let meat = 0;
  for (let lv = 1; lv <= clamped; lv++) {
    const step = getStepGearEnhanceCost(lv, rarity);
    runes += step.runes;
    meat += step.meat;
  }
  return { runes, meat };
}

export function resolvePieceMultiplier(scopeMode: GearEnhanceScopeMode): number {
  if (scopeMode === "single_piece") return 1;
  if (scopeMode === "squad_24") return 24;
  return 4;
}

const BRACKET_RANGES: readonly {
  readonly key: string;
  readonly startLv: number;
  readonly endLv: number;
  readonly masterTier: EnhancementMasterTier;
  readonly label: Record<CalculatorLocale, string>;
}[] = [
  {
    key: "bracket-1-10",
    startLv: 0,
    endLv: 10,
    masterTier: 10,
    label: {
      vi: "Chặng 1 (Lv.0 ➔ Lv.10 • Mở Bậc Thầy +10)",
      en: "Stage 1 (Lv.0 ➔ Lv.10 • Unlocks Master +10)",
    },
  },
  {
    key: "bracket-11-20",
    startLv: 10,
    endLv: 20,
    masterTier: 20,
    label: {
      vi: "Chặng 2 (Lv.10 ➔ Lv.20 • Mở Bậc Thầy +20)",
      en: "Stage 2 (Lv.10 ➔ Lv.20 • Unlocks Master +20)",
    },
  },
  {
    key: "bracket-21-30",
    startLv: 20,
    endLv: 30,
    masterTier: 30,
    label: {
      vi: "Chặng 3 (Lv.20 ➔ Lv.30 • Mở Bậc Thầy +30)",
      en: "Stage 3 (Lv.20 ➔ Lv.30 • Unlocks Master +30)",
    },
  },
  {
    key: "bracket-31-40",
    startLv: 30,
    endLv: 40,
    masterTier: 40,
    label: {
      vi: "Chặng 4 (Lv.30 ➔ Lv.40 • Đạt Đỉnh Bậc Thầy +40)",
      en: "Stage 4 (Lv.30 ➔ Lv.40 • Max Master +40)",
    },
  },
];

export function calculateGearEnhancement(
  input: GearEnhanceCalculationInput
): GearEnhanceCalculationResult {
  const rarity = input.rarity;
  const rarityConfig = GEAR_ENHANCE_RARITY_CONFIGS[rarity];
  const scopeMode = input.scopeMode;
  const roleBranch = input.roleBranch;
  const roleConfig = GEAR_ROLE_CONFIGS[roleBranch];
  const pieceMultiplier = resolvePieceMultiplier(scopeMode);

  const safeFromLevel = clampGearEnhanceLevel(input.fromLevel);
  const safeToLevel = clampGearEnhanceLevel(input.toLevel);
  const safeOwnedRunes = Math.max(0, Math.floor(input.ownedRunes ?? 0));
  const safeOwnedMeat = Math.max(0, Math.floor(input.ownedMeat ?? 0));

  const slotRanges: Record<GearSlotKey, GearCustomSlotRange> =
    scopeMode === "custom_4_slots" && input.customSlotLevels
      ? {
          weapon: {
            fromLevel: clampGearEnhanceLevel(
              input.customSlotLevels.weapon.fromLevel
            ),
            toLevel: clampGearEnhanceLevel(
              input.customSlotLevels.weapon.toLevel
            ),
          },
          boots: {
            fromLevel: clampGearEnhanceLevel(
              input.customSlotLevels.boots.fromLevel
            ),
            toLevel: clampGearEnhanceLevel(
              input.customSlotLevels.boots.toLevel
            ),
          },
          helmet: {
            fromLevel: clampGearEnhanceLevel(
              input.customSlotLevels.helmet.fromLevel
            ),
            toLevel: clampGearEnhanceLevel(
              input.customSlotLevels.helmet.toLevel
            ),
          },
          chest: {
            fromLevel: clampGearEnhanceLevel(
              input.customSlotLevels.chest.fromLevel
            ),
            toLevel: clampGearEnhanceLevel(
              input.customSlotLevels.chest.toLevel
            ),
          },
        }
      : {
          weapon: { fromLevel: safeFromLevel, toLevel: safeToLevel },
          boots: { fromLevel: safeFromLevel, toLevel: safeToLevel },
          helmet: { fromLevel: safeFromLevel, toLevel: safeToLevel },
          chest: { fromLevel: safeFromLevel, toLevel: safeToLevel },
        };

  const invalidSlotKeys: GearSlotKey[] = [];
  for (const slotKey of GEAR_SLOT_ORDER) {
    const slot = slotRanges[slotKey];
    if (slot.fromLevel > slot.toLevel) {
      invalidSlotKeys.push(slotKey);
    }
  }

  const isInvalidRange =
    scopeMode === "custom_4_slots"
      ? invalidSlotKeys.length > 0
      : safeFromLevel > safeToLevel;

  const currentMinSlotLevel = Math.min(
    slotRanges.weapon.fromLevel,
    slotRanges.boots.fromLevel,
    slotRanges.helmet.fromLevel,
    slotRanges.chest.fromLevel
  );
  const targetMinSlotLevel = Math.min(
    slotRanges.weapon.toLevel,
    slotRanges.boots.toLevel,
    slotRanges.helmet.toLevel,
    slotRanges.chest.toLevel
  );

  const currentMasterTier = resolveEnhancementMasterTier(currentMinSlotLevel);
  const targetMasterTier = resolveEnhancementMasterTier(targetMinSlotLevel);
  const nextMasterTier = resolveNextEnhancementMasterTier(currentMasterTier);

  const nextMilestoneTargetLevel = nextMasterTier ?? MAX_GEAR_ENHANCE_LEVEL;

  // Identify bottleneck slots whose current fromLevel < nextMilestoneTargetLevel (sorted lowest first)
  const bottleneckSlots: GearSlotKey[] = [...GEAR_SLOT_ORDER]
    .filter((key) => slotRanges[key].fromLevel < nextMilestoneTargetLevel)
    .sort((a, b) => slotRanges[a].fromLevel - slotRanges[b].fromLevel);

  let runesToNextMasterMilestone = 0;
  if (nextMasterTier !== null) {
    const milestoneCum = getCumulativeGearEnhanceCost(nextMasterTier, rarity);
    if (scopeMode === "custom_4_slots") {
      for (const slotKey of GEAR_SLOT_ORDER) {
        const curLv = slotRanges[slotKey].fromLevel;
        if (curLv < nextMasterTier) {
          const curCum = getCumulativeGearEnhanceCost(curLv, rarity);
          runesToNextMasterMilestone += milestoneCum.runes - curCum.runes;
        }
      }
    } else {
      const curCum = getCumulativeGearEnhanceCost(safeFromLevel, rarity);
      runesToNextMasterMilestone =
        Math.max(0, milestoneCum.runes - curCum.runes) * pieceMultiplier;
    }
  }

  const slotAudits: GearSlotAuditItem[] = GEAR_SLOT_ORDER.map((slotKey) => {
    const range = slotRanges[slotKey];
    const isInvalidSlotRange = range.fromLevel > range.toLevel;
    const fromCum = getCumulativeGearEnhanceCost(range.fromLevel, rarity);
    const toCum = getCumulativeGearEnhanceCost(range.toLevel, rarity);
    const requiredRunes = isInvalidSlotRange
      ? 0
      : Math.max(0, toCum.runes - fromCum.runes);
    const requiredMeat = isInvalidSlotRange
      ? 0
      : Math.max(0, toCum.meat - fromCum.meat);
    const isBottleneck =
      nextMasterTier !== null && range.fromLevel < nextMasterTier;

    return {
      slotKey,
      fromLevel: range.fromLevel,
      toLevel: range.toLevel,
      isInvalidSlotRange,
      requiredRunes,
      requiredMeat,
      isBottleneck,
    };
  });

  let alreadyInvestedRunes = 0;
  let alreadyInvestedMeat = 0;
  let targetCumulativeRunes = 0;
  let targetCumulativeMeat = 0;

  if (scopeMode === "custom_4_slots") {
    for (const slotKey of GEAR_SLOT_ORDER) {
      const fromCum = getCumulativeGearEnhanceCost(
        slotRanges[slotKey].fromLevel,
        rarity
      );
      const toCum = getCumulativeGearEnhanceCost(
        slotRanges[slotKey].toLevel,
        rarity
      );
      alreadyInvestedRunes += fromCum.runes;
      alreadyInvestedMeat += fromCum.meat;
      targetCumulativeRunes += toCum.runes;
      targetCumulativeMeat += toCum.meat;
    }
  } else {
    const fromCum = getCumulativeGearEnhanceCost(safeFromLevel, rarity);
    const toCum = getCumulativeGearEnhanceCost(safeToLevel, rarity);
    alreadyInvestedRunes = fromCum.runes * pieceMultiplier;
    alreadyInvestedMeat = fromCum.meat * pieceMultiplier;
    targetCumulativeRunes = toCum.runes * pieceMultiplier;
    targetCumulativeMeat = toCum.meat * pieceMultiplier;
  }

  const requiredRunes = isInvalidRange
    ? 0
    : Math.max(0, targetCumulativeRunes - alreadyInvestedRunes);
  const requiredMeat = isInvalidRange
    ? 0
    : Math.max(0, targetCumulativeMeat - alreadyInvestedMeat);

  const missingRunes = Math.max(0, requiredRunes - safeOwnedRunes);
  const missingMeat = Math.max(0, requiredMeat - safeOwnedMeat);
  const surplusRunes = Math.max(0, safeOwnedRunes - requiredRunes);
  const surplusMeat = Math.max(0, safeOwnedMeat - requiredMeat);

  const runeCompletionPercent =
    requiredRunes === 0
      ? 100
      : Math.min(100, Math.floor((safeOwnedRunes / requiredRunes) * 100));
  const meatCompletionPercent =
    requiredMeat === 0
      ? 100
      : Math.min(100, Math.floor((safeOwnedMeat / requiredMeat) * 100));

  const bracketBreakdown: GearEnhanceBracketBreakdownItem[] =
    BRACKET_RANGES.map((b) => {
      const startCum = getCumulativeGearEnhanceCost(b.startLv, rarity);
      const endCum = getCumulativeGearEnhanceCost(b.endLv, rarity);
      const runesPerPiece = endCum.runes - startCum.runes;
      const meatPerPiece = endCum.meat - startCum.meat;

      return {
        bracketKey: b.key,
        label: b.label,
        fromLevel: b.startLv,
        toLevel: b.endLv,
        runesPerPiece,
        meatPerPiece,
        totalRunesForScope: runesPerPiece * pieceMultiplier,
        totalMeatForScope: meatPerPiece * pieceMultiplier,
        cumulativeRunesAtEnd: endCum.runes * pieceMultiplier,
        cumulativeMeatAtEnd: endCum.meat * pieceMultiplier,
        masterTierUnlocked: b.masterTier,
      };
    });

  return {
    rarity,
    rarityConfig,
    scopeMode,
    roleBranch,
    roleConfig,
    pieceMultiplier,
    fromLevel: safeFromLevel,
    toLevel: safeToLevel,
    isInvalidRange,
    invalidSlotKeys,
    currentMinSlotLevel,
    targetMinSlotLevel,
    currentMasterTier,
    targetMasterTier,
    nextMasterTier,
    bottleneckSlots,
    runesToNextMasterMilestone,
    alreadyInvestedRunes,
    alreadyInvestedMeat,
    targetCumulativeRunes,
    targetCumulativeMeat,
    requiredRunes,
    requiredMeat,
    ownedRunes: safeOwnedRunes,
    ownedMeat: safeOwnedMeat,
    missingRunes,
    missingMeat,
    surplusRunes,
    surplusMeat,
    runeCompletionPercent,
    meatCompletionPercent,
    runeMaterial: CALCULATOR_MATERIALS.gearEnhanceRune,
    meatMaterial: CALCULATOR_MATERIALS.meat,
    slotAudits,
    bracketBreakdown,
  };
}

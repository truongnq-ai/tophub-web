import { CALCULATOR_MATERIALS } from "./registry";
import type { CalculatorLocale, CalculatorMaterialRef } from "./types";

export type ExclusiveCoreProfile =
  | "guide_cumulative_920"
  | "raw_subtier_2385";

export type ExclusiveWeaponFaction = "league" | "nature" | "horde";

export const MIN_EXCLUSIVE_WEAPON_LEVEL = 0;
export const MAX_EXCLUSIVE_WEAPON_LEVEL = 20;

export const MIN_EXCLUSIVE_STAR_STEP = 0;
export const MAX_EXCLUSIVE_STAR_STEP = 25;

export interface ExclusiveWeaponLevelStep {
  readonly level: number;
  readonly stepShards: number;
  readonly cumulativeShards: number;
  readonly isMilestone: boolean;
  readonly label: Record<CalculatorLocale, string>;
  readonly milestoneNote?: Record<CalculatorLocale, string>;
}

export interface ExclusiveStarStepNode {
  readonly stepIndex: number;
  readonly starBracket: 0 | 1 | 2 | 3 | 4 | 5;
  readonly subTier: 0 | 1 | 2 | 3 | 4 | 5;
  readonly label: Record<CalculatorLocale, string>;
  readonly shortLabel: Record<CalculatorLocale, string>;
  readonly stepCores: number;
  readonly cumulativeCores: number;
  readonly isStarBreakthrough: boolean;
}

export interface ExclusiveSkillMilestone {
  readonly id: string;
  readonly requiredLevel: 1 | 5 | 10 | 15 | 20;
  readonly recommendedStar: 0 | 1 | 2 | 3 | 4 | 5;
  readonly cumulativeShards: number;
  readonly title: Record<CalculatorLocale, string>;
  readonly effectSummary: Record<CalculatorLocale, string>;
  readonly priorityRating: Record<CalculatorLocale, string>;
}

export interface ExclusiveWeaponHeroEntry {
  readonly heroId: string;
  readonly faction: ExclusiveWeaponFaction;
  readonly rarity: "mythic" | "legendary";
  readonly heroName: Record<CalculatorLocale, string>;
  readonly weaponName: Record<CalculatorLocale, string>;
  readonly weaponIconPath: string;
  readonly signatureHighlight: Record<CalculatorLocale, string>;
}

export interface ExclusiveStarBreakdownItem {
  readonly starBracket: 1 | 2 | 3 | 4 | 5;
  readonly label: Record<CalculatorLocale, string>;
  readonly coresPerHero: number;
  readonly totalCores: number;
  readonly cumulativeCoresPerHero: number;
}

export interface ExclusiveWeaponCalculationInput {
  readonly fromLevel: number;
  readonly toLevel: number;
  readonly fromStarStep: number;
  readonly toStarStep: number;
  readonly heroCount: number;
  readonly coreProfile?: ExclusiveCoreProfile;
  readonly selectedHeroId?: string;
  readonly ownedShards?: number;
  readonly ownedCores?: number;
}

export interface ExclusiveWeaponCalculationResult {
  readonly fromLevelNode: ExclusiveWeaponLevelStep;
  readonly toLevelNode: ExclusiveWeaponLevelStep;
  readonly fromStarNode: ExclusiveStarStepNode;
  readonly toStarNode: ExclusiveStarStepNode;
  readonly heroCount: number;
  readonly coreProfile: ExclusiveCoreProfile;
  readonly selectedHero: ExclusiveWeaponHeroEntry;
  readonly isInvalidLevelRange: boolean;
  readonly isInvalidStarRange: boolean;
  readonly shardsPerHero: number;
  readonly coresPerHero: number;
  readonly requiredShards: number;
  readonly requiredCores: number;
  readonly ownedShards: number;
  readonly ownedCores: number;
  readonly missingShards: number;
  readonly missingCores: number;
  readonly surplusShards: number;
  readonly surplusCores: number;
  readonly shardCompletionPercent: number;
  readonly coreCompletionPercent: number;
  readonly activeSkillMilestones: readonly ExclusiveSkillMilestone[];
  readonly nextSkillMilestone: ExclusiveSkillMilestone | null;
  readonly shardsToNextMilestone: number;
  readonly starBreakdown: readonly ExclusiveStarBreakdownItem[];
  readonly shardMaterial: CalculatorMaterialRef;
  readonly coreMaterial: CalculatorMaterialRef;
}

const STEP_SHARDS_BY_LEVEL: readonly number[] = [
  0, // Lv.0 (Locked)
  5, // Lv.1 (Unlock: 5)
  15, // Lv.2 (20)
  15, // Lv.3 (35)
  20, // Lv.4 (55)
  20, // Lv.5 (75 — Milestone +5)
  30, // Lv.6 (105)
  35, // Lv.7 (140)
  40, // Lv.8 (180)
  45, // Lv.9 (225)
  50, // Lv.10 (275 — Milestone +10)
  55, // Lv.11 (330)
  60, // Lv.12 (390)
  65, // Lv.13 (455)
  70, // Lv.14 (525)
  80, // Lv.15 (605 — Milestone +15)
  95, // Lv.16 (700)
  105, // Lv.17 (805)
  115, // Lv.18 (920)
  125, // Lv.19 (1,045)
  140, // Lv.20 (1,185 — Max Milestone +20)
];

const MILESTONE_NOTES_BY_LEVEL: Readonly<
  Partial<Record<number, Record<CalculatorLocale, string>>>
> = {
  1: {
    vi: "Mở khóa Vũ Khí Độc Quyền & Kỹ năng chuyên biệt bậc 1 (5 Mảnh)",
    en: "Unlocks Exclusive Weapon & Signature Passive Tier 1 (5 Shards)",
  },
  5: {
    vi: "Đột phá Kỹ năng +5 • Mở hiệu ứng nội tại chiến thuật đầu tiên (Tích lũy 75 Mảnh)",
    en: "Skill Breakthrough +5 • Unlocks first tactical passive upgrade (75 Cumulative Shards)",
  },
  10: {
    vi: "Đột phá Kỹ năng +10 (Điểm ngọt F2P/Mid-spender) • Biến đổi cơ chế kỹ năng tướng (Tích lũy 275 Mảnh)",
    en: "Skill Breakthrough +10 (Best Value Sweet-Spot) • Transforms hero skill mechanics (275 Cumulative Shards)",
  },
  15: {
    vi: "Đột phá Kỹ năng +15 • Gia tăng mạnh hệ số Sát Thương / Hồi Phục / Giảm Sát Thương (Tích lũy 605 Mảnh)",
    en: "Skill Breakthrough +15 • Major multiplier boost to Damage / Healing / Mitigation (605 Cumulative Shards)",
  },
  20: {
    vi: "Đỉnh Vũ Khí Độc Quyền +20 • Tối đa hóa hiệu ứng độc quyền toàn đội (Tích lũy 1,185 Mảnh)",
    en: "Max Exclusive Weapon +20 • Full signature skill mastery & team aura (1,185 Cumulative Shards)",
  },
};

function buildExclusiveWeaponLevelSteps(): readonly ExclusiveWeaponLevelStep[] {
  const steps: ExclusiveWeaponLevelStep[] = [];
  let cum = 0;

  for (let lv = MIN_EXCLUSIVE_WEAPON_LEVEL; lv <= MAX_EXCLUSIVE_WEAPON_LEVEL; lv++) {
    const stepShards = STEP_SHARDS_BY_LEVEL[lv] ?? 0;
    cum += stepShards;
    const milestoneNote = MILESTONE_NOTES_BY_LEVEL[lv];
    const isMilestone = Boolean(milestoneNote);

    steps.push({
      level: lv,
      stepShards,
      cumulativeShards: cum,
      isMilestone,
      label:
        lv === 0
          ? {
              vi: "Lv.0 • Chưa mở khóa (0 Mảnh)",
              en: "Lv.0 • Locked (0 Shards)",
            }
          : {
              vi: `Lv.${lv}${isMilestone ? " ★ Mốc Đột Phá Kỹ Năng" : ""}`,
              en: `Lv.${lv}${isMilestone ? " ★ Skill Breakthrough" : ""}`,
            },
      milestoneNote,
    });
  }

  return steps;
}

export const EXCLUSIVE_WEAPON_LEVEL_STEPS: readonly ExclusiveWeaponLevelStep[] =
  buildExclusiveWeaponLevelSteps();

/**
 * SSoT Profile 1 (`guide_cumulative_920`):
 * Cumulative Meteoric Iron Cores from `exclusive_weapons_system_guide.md`:
 * - 1★: 120 (sub-tiers: 20, 20, 25, 25, 30)
 * - 2★: +170 = 290 (sub-tiers: 30, 30, 35, 35, 40)
 * - 3★: +200 = 490 (sub-tiers: 35, 40, 40, 40, 45)
 * - 4★: +215 = 705 (sub-tiers: 40, 40, 45, 45, 45)
 * - 5★: +215 = 920 (sub-tiers: 40, 40, 45, 45, 45)
 */
const GUIDE_920_SUBTIER_CORES: Readonly<Record<1 | 2 | 3 | 4 | 5, readonly number[]>> = {
  1: [20, 20, 25, 25, 30],
  2: [30, 30, 35, 35, 40],
  3: [35, 40, 40, 40, 45],
  4: [40, 40, 45, 45, 45],
  5: [40, 40, 45, 45, 45],
};

/**
 * SSoT Profile 2 (`raw_subtier_2385`):
 * Raw sub-tier table from `TopHeroes Tables - Max Exclusive Gear.csv`:
 * - 1★: 45×4 + 70 = 250 (cum 250)
 * - 2★: 60×4 + 125 = 365 (cum 615)
 * - 3★: 75×4 + 195 = 495 (cum 1,110)
 * - 4★: 90×4 + 225 = 585 (cum 1,695)
 * - 5★: 105×4 + 270 = 690 (cum 2,385)
 */
const RAW_2385_SUBTIER_CORES: Readonly<Record<1 | 2 | 3 | 4 | 5, readonly number[]>> = {
  1: [45, 45, 45, 45, 70],
  2: [60, 60, 60, 60, 125],
  3: [75, 75, 75, 75, 195],
  4: [90, 90, 90, 90, 225],
  5: [105, 105, 105, 105, 270],
};

function buildExclusiveStarSteps(
  profile: ExclusiveCoreProfile
): readonly ExclusiveStarStepNode[] {
  const matrix =
    profile === "raw_subtier_2385"
      ? RAW_2385_SUBTIER_CORES
      : GUIDE_920_SUBTIER_CORES;

  const steps: ExclusiveStarStepNode[] = [
    {
      stepIndex: 0,
      starBracket: 0,
      subTier: 0,
      label: {
        vi: "0★ • Chưa đột phá Sao (0 Lõi Sắt)",
        en: "0★ • Unpromoted Star (0 Iron Cores)",
      },
      shortLabel: {
        vi: "0★ (Gốc)",
        en: "0★ Base",
      },
      stepCores: 0,
      cumulativeCores: 0,
      isStarBreakthrough: false,
    },
  ];

  let cumCores = 0;
  const starBrackets: readonly (1 | 2 | 3 | 4 | 5)[] = [1, 2, 3, 4, 5];

  for (const star of starBrackets) {
    const subCosts = matrix[star];
    for (let sub = 1; sub <= 5; sub++) {
      const subTier = sub as 1 | 2 | 3 | 4 | 5;
      const stepIndex = (star - 1) * 5 + sub;
      const stepCores = subCosts[sub - 1] ?? 0;
      cumCores += stepCores;
      const isBreakthrough = subTier === 5;

      steps.push({
        stepIndex,
        starBracket: star,
        subTier,
        label: {
          vi: `${star}★ Độc Quyền • Tiểu bậc ${subTier}/5${
            isBreakthrough ? " (Đột Phá Sao)" : ""
          }`,
          en: `${star}★ Exclusive • Tier ${subTier}/5${
            isBreakthrough ? " (Star Breakthrough)" : ""
          }`,
        },
        shortLabel: {
          vi: `${star}★ (${subTier}/5)`,
          en: `${star}★ (${subTier}/5)`,
        },
        stepCores,
        cumulativeCores: cumCores,
        isStarBreakthrough: isBreakthrough,
      });
    }
  }

  return steps;
}

const GUIDE_STAR_STEPS = buildExclusiveStarSteps("guide_cumulative_920");
const RAW_STAR_STEPS = buildExclusiveStarSteps("raw_subtier_2385");

export function getExclusiveStarSteps(
  profile: ExclusiveCoreProfile = "guide_cumulative_920"
): readonly ExclusiveStarStepNode[] {
  return profile === "raw_subtier_2385" ? RAW_STAR_STEPS : GUIDE_STAR_STEPS;
}

export const EXCLUSIVE_SKILL_MILESTONES: readonly ExclusiveSkillMilestone[] = [
  {
    id: "ew_lv1",
    requiredLevel: 1,
    recommendedStar: 0,
    cumulativeShards: 5,
    title: {
      vi: "Mốc Lv.1 • Mở Khóa Vũ Khí Độc Quyền",
      en: "Lv.1 Milestone • Unlock Exclusive Weapon",
    },
    effectSummary: {
      vi: "Kích hoạt chỉ số cơ bản (ATK, HP, Lãnh Binh) và mở khóa Kỹ năng độc quyền bậc 1 cho tướng.",
      en: "Activates base stats (ATK, HP, Command) and unlocks Tier 1 Signature Skill for the hero.",
    },
    priorityRating: {
      vi: "Bắt buộc cho cả 6 tướng Đội 1 (Chỉ tốn 5 Mảnh/tướng)",
      en: "Mandatory for all 6 Queue 1 heroes (Only 5 Shards/hero)",
    },
  },
  {
    id: "ew_lv5",
    requiredLevel: 5,
    recommendedStar: 1,
    cumulativeShards: 75,
    title: {
      vi: "Mốc Lv.5 (1★) • Cường Hóa Nội Tại Bậc 1",
      en: "Lv.5 (1★) Milestone • Passive Enhancement I",
    },
    effectSummary: {
      vi: "Mở khóa hiệu ứng phụ trợ đầu tiên của vũ khí (Tăng thời gian Khống chế, Khiên mở màn hoặc Hồi năng lượng).",
      en: "Unlocks the weapon's first secondary effect (Extended CC duration, opening Shield, or Energy recovery).",
    },
    priorityRating: {
      vi: "Ưu tiên cho Tank chính & Hỗ trợ Đội 1",
      en: "Recommended baseline for Main Tank & Support in Queue 1",
    },
  },
  {
    id: "ew_lv10",
    requiredLevel: 10,
    recommendedStar: 2,
    cumulativeShards: 275,
    title: {
      vi: "Mốc Lv.10 (2★) • Điểm Ngọt Đột Phá Cơ Chế (+10)",
      en: "Lv.10 (2★) Milestone • Core Mechanic Breakthrough (+10)",
    },
    effectSummary: {
      vi: "Biến đổi hoàn toàn cơ chế chiến đấu của tướng (VD: Tidecaller triệu hồi Thủy Tinh khổng lồ, Adjudicator bất tử toàn diện).",
      en: "Transforms hero combat mechanics (e.g., Tidecaller mega Water Elemental, Adjudicator extended invulnerability).",
    },
    priorityRating: {
      vi: "Điểm dừng tối ưu nhất (ROI số 1) trước khi dồn tướng tiếp theo",
      en: "Best ROI stopping point before moving to the next hero",
    },
  },
  {
    id: "ew_lv15",
    requiredLevel: 15,
    recommendedStar: 3,
    cumulativeShards: 605,
    title: {
      vi: "Mốc Lv.15 (3★) • Khuếch Đại Hệ Số Sát Thương (+15)",
      en: "Lv.15 (3★) Milestone • Multiplier Amplification (+15)",
    },
    effectSummary: {
      vi: "Tăng vọt hệ số Sát Thương Kỹ Năng / Xuyên Thủ cho Hyper-Carry của đội hình chủ lực.",
      en: "Massively boosts Skill Damage and Penetration multipliers for your main Hyper-Carry.",
    },
    priorityRating: {
      vi: "Chỉ nâng cho 1–2 tướng Carry chủ lực sau khi Đội 1 đã đạt Lv.10",
      en: "Upgrade only for 1–2 main Carries after Queue 1 reaches Lv.10",
    },
  },
  {
    id: "ew_lv20",
    requiredLevel: 20,
    recommendedStar: 5,
    cumulativeShards: 1_185,
    title: {
      vi: "Mốc Lv.20 (4★–5★) • Thần Khí Tối Thượng (+20)",
      en: "Lv.20 (4★–5★) Milestone • Supreme Signature Mastery (+20)",
    },
    effectSummary: {
      vi: "Đạt trần hiệu ứng Vũ Khí Độc Quyền +20 và mở khóa hào quang cộng hưởng toàn đội.",
      en: "Reaches maximum +20 Exclusive Weapon potency and unlocks full-squad resonance effects.",
    },
    priorityRating: {
      vi: "Dành cho giai đoạn Endgame / Đấu Trường Liên Server",
      en: "Endgame / Cross-Server Arena target",
    },
  },
] as const;

export const EXCLUSIVE_WEAPON_HERO_CATALOG: readonly ExclusiveWeaponHeroEntry[] = [
  // League
  {
    heroId: "adjudicator",
    faction: "league",
    rarity: "mythic",
    heroName: { vi: "Adjudicator (Phán Quyết)", en: "Adjudicator" },
    weaponName: { vi: "Đôi Cánh Phán Quyết", en: "Wings of Judgement" },
    weaponIconPath: "/images/codex/equipment/equipment_Exclusive010.webp",
    signatureHighlight: {
      vi: "Kéo dài trạng thái Bất Tử (Unbreakable) và tăng Giảm Sát Thương cho toàn bộ hàng trước.",
      en: "Extends Unbreakable invulnerability and boosts Frontline Damage Reduction.",
    },
  },
  {
    heroId: "paragon",
    faction: "league",
    rarity: "mythic",
    heroName: { vi: "Paragon (Thánh Mẫu)", en: "Paragon" },
    weaponName: { vi: "Thiên Kiếm Tinh Vân", en: "Celestial Blade" },
    weaponIconPath: "/images/codex/equipment/equipment_Exclusive012.webp",
    signatureHighlight: {
      vi: "Khuếch đại Sát Thương Chuẩn diện rộng và tăng Tỷ Lệ Bạo Kích cho phe Liên Minh.",
      en: "Amplifies AoE True Damage and grants Crit Rate aura to League allies.",
    },
  },
  {
    heroId: "rose_princess",
    faction: "league",
    rarity: "mythic",
    heroName: { vi: "Rose Princess (Công Chúa Hồng)", en: "Rose Princess" },
    weaponName: { vi: "Hoa Hồng Tinh Khiết", en: "Pure Rose" },
    weaponIconPath: "/images/codex/equipment/equipment_Exclusive028.webp",
    signatureHighlight: {
      vi: "Cộng dồn Gai Hồng phản sát thương và tạo Khiên bảo hộ cho đồng minh thấp máu nhất.",
      en: "Stacks Rose Thorns counter-damage and shields the lowest-HP ally.",
    },
  },
  {
    heroId: "bishop",
    faction: "league",
    rarity: "mythic",
    heroName: { vi: "Bishop (Giám Mục)", en: "Bishop" },
    weaponName: { vi: "Thánh Điển Quang Minh", en: "Tome of Light" },
    weaponIconPath: "/images/codex/equipment/equipment_Exclusive027.webp",
    signatureHighlight: {
      vi: "Thanh tẩy hiệu ứng bất lợi và bơm Năng Lượng tức thời cho tướng Sát Thương chủ lực.",
      en: "Cleanses debuffs and injects instant Energy into the main DPS carry.",
    },
  },
  {
    heroId: "pyromancer",
    faction: "league",
    rarity: "legendary",
    heroName: { vi: "Pyromancer (Hỏa Pháp Sư)", en: "Pyromancer" },
    weaponName: { vi: "Trượng Hỏa Ngục", en: "Inferno Staff" },
    weaponIconPath: "/images/codex/equipment/equipment_Exclusive003.webp",
    signatureHighlight: {
      vi: "Tăng bán kính vụ nổ Thiên Thạch và gây Thiêu Đốt theo phần trăm máu tối đa.",
      en: "Expands Meteor blast radius and inflicts max-HP percentage Burn.",
    },
  },
  {
    heroId: "astrologer",
    faction: "league",
    rarity: "legendary",
    heroName: { vi: "Astrologer (Chiêm Tinh Gia)", en: "Astrologer" },
    weaponName: { vi: "Tinh Cầu Thiên Văn", en: "Astrolabe" },
    weaponIconPath: "/images/codex/equipment/equipment_Exclusive004.webp",
    signatureHighlight: {
      vi: "Rút ngắn thời gian hồi Tuyệt Kỹ và tăng Xuyên Kháng Phép.",
      en: "Reduces Ultimate cooldown and increases Magic Penetration.",
    },
  },
  // Nature
  {
    heroId: "tidecaller",
    faction: "nature",
    rarity: "mythic",
    heroName: { vi: "Tidecaller (Triệu Hồi Thủy Triều)", en: "Tidecaller" },
    weaponName: { vi: "Đinh Ba San Hô", en: "Coral Fork" },
    weaponIconPath: "/images/codex/equipment/equipment_Exclusive029.webp",
    signatureHighlight: {
      vi: "Mốc +10 triệu hồi Thủy Tinh khổng lồ vừa đỡ đòn vừa hồi máu toàn đội liên tục.",
      en: "At +10, summons a giant Water Elemental that tanks and heals the entire squad.",
    },
  },
  {
    heroId: "monk",
    faction: "nature",
    rarity: "mythic",
    heroName: { vi: "Monk (Võ Tăng)", en: "Monk" },
    weaponName: { vi: "Hồ Lô Tiên Tửu", en: "Immortal Gourd" },
    weaponIconPath: "/images/codex/equipment/equipment_Exclusive030.webp",
    signatureHighlight: {
      vi: "Tăng Né Tránh, Kháng Bạo Kích và tự hồi phục khi chịu sát thương dồn.",
      en: "Boosts Dodge, Crit Resistance, and self-healing under burst damage.",
    },
  },
  {
    heroId: "pixie",
    faction: "nature",
    rarity: "mythic",
    heroName: { vi: "Pixie (Tiên Nữ Rừng Xanh)", en: "Pixie" },
    weaponName: { vi: "Mầm Sống Nguyên Sinh", en: "Sprout" },
    weaponIconPath: "/images/codex/equipment/equipment_Exclusive024.webp",
    signatureHighlight: {
      vi: "Khuếch đại sát thương cho toàn bộ Vật Triệu Hồi (Summon) của hệ Tự Nhiên.",
      en: "Amplifies damage dealt by all Nature Summoned units.",
    },
  },
  {
    heroId: "forest_maiden",
    faction: "nature",
    rarity: "legendary",
    heroName: { vi: "Forest Maiden (Thánh Nữ Rừng)", en: "Forest Maiden" },
    weaponName: { vi: "Trượng Linh Hồn Rừng", en: "Staff of Wood" },
    weaponIconPath: "/images/codex/equipment/equipment_Exclusive018.webp",
    signatureHighlight: {
      vi: "Tăng lượng máu hồi phục mỗi giây và buff Giáp cho đồng minh có Vật Triệu Hồi.",
      en: "Increases heal-over-time output and grants Armor to summoned allies.",
    },
  },
  {
    heroId: "windwalker",
    faction: "nature",
    rarity: "legendary",
    heroName: { vi: "Windwalker (Phong Hành Giả)", en: "Windwalker" },
    weaponName: { vi: "Phong Vũ Phiến", en: "Feather Fan" },
    weaponIconPath: "/images/codex/equipment/equipment_Exclusive013.webp",
    signatureHighlight: {
      vi: "Tăng Tốc Đánh cực đại và bắn thêm tia Gió Xuyên Thấu hàng sau.",
      en: "Maximizes Attack Speed and fires piercing Wind bolts into the backline.",
    },
  },
  // Horde
  {
    heroId: "desert_prince",
    faction: "horde",
    rarity: "mythic",
    heroName: { vi: "Desert Prince (Hoàng Tử Sa Mạc)", en: "Desert Prince" },
    weaponName: { vi: "Loan Đao Cát Cháy", en: "Scimitar of Scoring" },
    weaponIconPath: "/images/codex/equipment/equipment_Exclusive021.webp",
    signatureHighlight: {
      vi: "Ám sát hàng sau kẻ địch với Bão Cát Xuyên Giáp và Hút Máu toàn phần.",
      en: "Assassinate enemy backlines with Armor-Piercing Sandstorms and Lifesteal.",
    },
  },
  {
    heroId: "storm_maiden",
    faction: "horde",
    rarity: "mythic",
    heroName: { vi: "Storm Maiden (Thần Nữ Bão Tố)", en: "Storm Maiden" },
    weaponName: { vi: "Lông Vũ Lôi Điện", en: "Thunder Feather" },
    weaponIconPath: "/images/codex/equipment/equipment_Exclusive020.webp",
    signatureHighlight: {
      vi: "Giật Sét dây chuyền gây Choáng diện rộng và giảm Kháng Phép kẻ địch.",
      en: "Chains Lightning strikes to Stun multiple targets and shred Magic Resist.",
    },
  },
  {
    heroId: "witch",
    faction: "horde",
    rarity: "mythic",
    heroName: { vi: "Witch (Phù Thủy Hắc Ám)", en: "Witch" },
    weaponName: { vi: "Búp Bê Nguyền Rủa", en: "Cursed Doll" },
    weaponIconPath: "/images/codex/equipment/equipment_Exclusive026.webp",
    signatureHighlight: {
      vi: "Gắn Nguyền Rủa giảm 50% Hồi Máu và phát nổ linh hồn khi mục tiêu hạ gục.",
      en: "Inflicts Curse reducing enemy Healing by 50% and triggers Soul Explosion on kill.",
    },
  },
  {
    heroId: "wukong",
    faction: "horde",
    rarity: "mythic",
    heroName: { vi: "Wukong (Tề Thiên Đại Thánh)", en: "Wukong" },
    weaponName: { vi: "Như Ý Kim Cô Bổng", en: "Ruyi Jingu Bang" },
    weaponIconPath: "/images/codex/equipment/equipment_Exclusive035.webp",
    signatureHighlight: {
      vi: "Triệu hồi Phân Thân Hầu Vương kế thừa chỉ số và đập gậy Bạo Kích diện rộng.",
      en: "Summons Monkey Clones inheriting stats and unleashes AoE Critical Staff slams.",
    },
  },
  {
    heroId: "beastmaster",
    faction: "horde",
    rarity: "mythic",
    heroName: { vi: "Beastmaster (Thú Vương)", en: "Beastmaster" },
    weaponName: { vi: "Nỏ Săn Uy Long", en: "Wyrmscale Crossbow" },
    weaponIconPath: "/images/codex/equipment/equipment_Exclusive036.webp",
    signatureHighlight: {
      vi: "Gọi Chiến Thú cuồng nộ cắn xé mục tiêu có ATK cao nhất của đối phương.",
      en: "Calls frenzied War Beasts to maul the enemy hero with the highest ATK.",
    },
  },
] as const;

export function clampExclusiveWeaponLevel(level: number): number {
  if (!Number.isFinite(level)) return MIN_EXCLUSIVE_WEAPON_LEVEL;
  return Math.max(
    MIN_EXCLUSIVE_WEAPON_LEVEL,
    Math.min(MAX_EXCLUSIVE_WEAPON_LEVEL, Math.floor(level))
  );
}

export function clampExclusiveStarStep(stepIndex: number): number {
  if (!Number.isFinite(stepIndex)) return MIN_EXCLUSIVE_STAR_STEP;
  return Math.max(
    MIN_EXCLUSIVE_STAR_STEP,
    Math.min(MAX_EXCLUSIVE_STAR_STEP, Math.floor(stepIndex))
  );
}

function calcCompletionPercent(owned: number, required: number): number {
  if (required <= 0) return 100;
  return Math.min(100, Math.floor((owned / required) * 100));
}

export function calculateExclusiveWeapon(
  input: ExclusiveWeaponCalculationInput
): ExclusiveWeaponCalculationResult {
  const safeFromLevel = clampExclusiveWeaponLevel(input.fromLevel);
  const safeToLevel = clampExclusiveWeaponLevel(input.toLevel);
  const safeFromStarStep = clampExclusiveStarStep(input.fromStarStep);
  const safeToStarStep = clampExclusiveStarStep(input.toStarStep);
  const safeHeroCount = Math.max(
    1,
    Math.min(6, Math.floor(input.heroCount || 1))
  );
  const coreProfile: ExclusiveCoreProfile =
    input.coreProfile ?? "guide_cumulative_920";

  const safeOwnedShards = Math.max(0, Math.floor(input.ownedShards ?? 0));
  const safeOwnedCores = Math.max(0, Math.floor(input.ownedCores ?? 0));

  const fromLevelNode = EXCLUSIVE_WEAPON_LEVEL_STEPS[safeFromLevel];
  const toLevelNode = EXCLUSIVE_WEAPON_LEVEL_STEPS[safeToLevel];

  const starSteps = getExclusiveStarSteps(coreProfile);
  const fromStarNode = starSteps[safeFromStarStep];
  const toStarNode = starSteps[safeToStarStep];

  const isInvalidLevelRange = safeFromLevel > safeToLevel;
  const isInvalidStarRange = safeFromStarStep > safeToStarStep;

  const shardsPerHero = isInvalidLevelRange
    ? 0
    : toLevelNode.cumulativeShards - fromLevelNode.cumulativeShards;
  const coresPerHero = isInvalidStarRange
    ? 0
    : toStarNode.cumulativeCores - fromStarNode.cumulativeCores;

  const requiredShards = shardsPerHero * safeHeroCount;
  const requiredCores = coresPerHero * safeHeroCount;

  const missingShards = Math.max(0, requiredShards - safeOwnedShards);
  const missingCores = Math.max(0, requiredCores - safeOwnedCores);

  const surplusShards = Math.max(0, safeOwnedShards - requiredShards);
  const surplusCores = Math.max(0, safeOwnedCores - requiredCores);

  const selectedHero =
    EXCLUSIVE_WEAPON_HERO_CATALOG.find(
      (h) => h.heroId === input.selectedHeroId
    ) ?? EXCLUSIVE_WEAPON_HERO_CATALOG[0];

  const activeSkillMilestones = EXCLUSIVE_SKILL_MILESTONES.filter(
    (m) => m.requiredLevel <= safeToLevel
  );
  const nextSkillMilestone =
    EXCLUSIVE_SKILL_MILESTONES.find((m) => m.requiredLevel > safeToLevel) ??
    null;

  const shardsToNextMilestone = nextSkillMilestone
    ? Math.max(
        0,
        (nextSkillMilestone.cumulativeShards - toLevelNode.cumulativeShards) *
          safeHeroCount
      )
    : 0;

  const starBrackets: readonly (1 | 2 | 3 | 4 | 5)[] = [1, 2, 3, 4, 5];
  const starBreakdown: ExclusiveStarBreakdownItem[] = starBrackets.map(
    (star) => {
      const prevNode = starSteps[(star - 1) * 5];
      const endNode = starSteps[star * 5];
      const bracketCoresPerHero =
        endNode.cumulativeCores - prevNode.cumulativeCores;
      return {
        starBracket: star,
        label: {
          vi: `Đột Phá ${star}★ Độc Quyền`,
          en: `${star}★ Exclusive Breakthrough`,
        },
        coresPerHero: bracketCoresPerHero,
        totalCores: bracketCoresPerHero * safeHeroCount,
        cumulativeCoresPerHero: endNode.cumulativeCores,
      };
    }
  );

  return {
    fromLevelNode,
    toLevelNode,
    fromStarNode,
    toStarNode,
    heroCount: safeHeroCount,
    coreProfile,
    selectedHero,
    isInvalidLevelRange,
    isInvalidStarRange,
    shardsPerHero,
    coresPerHero,
    requiredShards,
    requiredCores,
    ownedShards: safeOwnedShards,
    ownedCores: safeOwnedCores,
    missingShards,
    missingCores,
    surplusShards,
    surplusCores,
    shardCompletionPercent: calcCompletionPercent(
      safeOwnedShards,
      requiredShards
    ),
    coreCompletionPercent: calcCompletionPercent(safeOwnedCores, requiredCores),
    activeSkillMilestones,
    nextSkillMilestone,
    shardsToNextMilestone,
    starBreakdown,
    shardMaterial: CALCULATOR_MATERIALS.universalExclusiveGearShard,
    coreMaterial: CALCULATOR_MATERIALS.meteoricIronCore,
  };
}

import { CALCULATOR_MATERIALS } from "./registry";
import type { CalculatorLocale, CalculatorMaterialRef } from "./types";

/**
 * 2.1 Sách Kỹ Năng (Skill Books Lv.1 ➔ Lv.15) — Quantitative SSoT Engine
 * Nguồn dữ liệu gốc:
 * - docs/06-game-guides/03-data-tables-and-mechanics/topheroes-tables-max-raw-dataset.md (Tab 👤Heroes, dòng 4109–4611)
 * - tophub-web/src/content/guides/groups/group-2/2.4-shards-and-skill-books.ts
 * - tophub-web/src/content/guides/groups/group-8/8.4-master-data-tables.ts (Bảng 1.1)
 */

export const MIN_SKILL_BOOK_LEVEL = 1;
export const SUB_QUEUE_CAP_SKILL_LEVEL = 5;
export const ECONOMIC_SWEET_SPOT_SKILL_LEVEL = 10;
export const MID_ROI_SUBCAP_SKILL_LEVEL = 12;
export const MAX_SKILL_BOOK_LEVEL = 15;

export const SKILL_SLOT_COUNT_OPTIONS = [4, 5, 6] as const;
export type SkillSlotCount = (typeof SKILL_SLOT_COUNT_OPTIONS)[number];

export const SKILL_SQUAD_COUNT_OPTIONS = [1, 5, 6] as const;
export type SkillSquadCount = (typeof SKILL_SQUAD_COUNT_OPTIONS)[number];

export type SkillSlotIndex = 0 | 1 | 2 | 3 | 4 | 5;

export type SkillLevelsTuple = readonly [
  number,
  number,
  number,
  number,
  number,
  number,
];

export interface SkillBookLevelRow {
  readonly level: number;
  readonly stepBooks: number;
  readonly cumulativeBooks: number;
  readonly budgetSharePercent: number;
  readonly tierLabel: Record<CalculatorLocale, string>;
}

/**
 * Ma trận 15 cấp Sách Kỹ Năng (1 Kỹ năng = 24,700 cuốn ở Lv.15; Điểm dừng vàng Lv.10 = 8,000 cuốn)
 */
export const SKILL_BOOK_LEVEL_TABLE: readonly SkillBookLevelRow[] = [
  {
    level: 1,
    stepBooks: 0,
    cumulativeBooks: 0,
    budgetSharePercent: 0,
    tierLabel: { vi: "Khởi tạo (Mặc định)", en: "Base Unlock (Default)" },
  },
  {
    level: 2,
    stepBooks: 100,
    cumulativeBooks: 100,
    budgetSharePercent: 0.4,
    tierLabel: { vi: "Sơ cấp", en: "Early Tier" },
  },
  {
    level: 3,
    stepBooks: 200,
    cumulativeBooks: 300,
    budgetSharePercent: 1.2,
    tierLabel: { vi: "Sơ cấp", en: "Early Tier" },
  },
  {
    level: 4,
    stepBooks: 400,
    cumulativeBooks: 700,
    budgetSharePercent: 2.8,
    tierLabel: { vi: "Sơ cấp", en: "Early Tier" },
  },
  {
    level: 5,
    stepBooks: 600,
    cumulativeBooks: 1_300,
    budgetSharePercent: 5.3,
    tierLabel: { vi: "★ Trần Đội 2–3 (1,300)", en: "★ Queue 2–3 Cap (1,300)" },
  },
  {
    level: 6,
    stepBooks: 800,
    cumulativeBooks: 2_100,
    budgetSharePercent: 8.5,
    tierLabel: { vi: "Chuyển giao Mid-game", en: "Mid-Game Transition" },
  },
  {
    level: 7,
    stepBooks: 1_100,
    cumulativeBooks: 3_200,
    budgetSharePercent: 13.0,
    tierLabel: { vi: "Chuyển giao Mid-game", en: "Mid-Game Transition" },
  },
  {
    level: 8,
    stepBooks: 1_300,
    cumulativeBooks: 4_500,
    budgetSharePercent: 18.2,
    tierLabel: { vi: "Mốc Kỹ năng phụ", en: "Secondary Skill Floor" },
  },
  {
    level: 9,
    stepBooks: 1_600,
    cumulativeBooks: 6_100,
    budgetSharePercent: 24.7,
    tierLabel: { vi: "Sát Điểm Gãy Lv.10", en: "Pre-Lv.10 Approach" },
  },
  {
    level: 10,
    stepBooks: 1_900,
    cumulativeBooks: 8_000,
    budgetSharePercent: 32.4,
    tierLabel: {
      vi: "★ Điểm Dừng Kinh Tế Vàng (8,000)",
      en: "★ Golden ROI Breakpoint (8,000)",
    },
  },
  {
    level: 11,
    stepBooks: 2_200,
    cumulativeBooks: 10_200,
    budgetSharePercent: 41.3,
    tierLabel: { vi: "Vùng Đắt Đỏ Hậu Lv.10", en: "Post-Lv.10 Exponential Zone" },
  },
  {
    level: 12,
    stepBooks: 2_700,
    cumulativeBooks: 12_900,
    budgetSharePercent: 52.2,
    tierLabel: {
      vi: "★ Mốc Đệm ROI Trung Gian (12,900)",
      en: "★ Mid-ROI Sub-Cap (12,900)",
    },
  },
  {
    level: 13,
    stepBooks: 3_200,
    cumulativeBooks: 16_100,
    budgetSharePercent: 65.2,
    tierLabel: { vi: "Đột phá Carry Chủ lực", en: "Main Carry Push" },
  },
  {
    level: 14,
    stepBooks: 3_900,
    cumulativeBooks: 20_000,
    budgetSharePercent: 81.0,
    tierLabel: { vi: "Đột phá Carry Chủ lực", en: "Main Carry Push" },
  },
  {
    level: 15,
    stepBooks: 4_700,
    cumulativeBooks: 24_700,
    budgetSharePercent: 100.0,
    tierLabel: {
      vi: "★ Kịch Trần Tuyệt Đối (24,700)",
      en: "★ Absolute Max Cap (24,700)",
    },
  },
] as const;

export interface SkillSlotDefinition {
  readonly slotIndex: SkillSlotIndex;
  readonly slotNumber: 1 | 2 | 3 | 4 | 5 | 6;
  readonly shortTitle: Record<CalculatorLocale, string>;
  readonly roleSummary: Record<CalculatorLocale, string>;
  readonly priorityTag: "core_burst" | "secondary" | "awakening_mythic";
}

export const SKILL_SLOT_DEFINITIONS: readonly SkillSlotDefinition[] = [
  {
    slotIndex: 0,
    slotNumber: 1,
    shortTitle: {
      vi: "Kỹ năng 1 • Tuyệt Chiêu",
      en: "Skill 1 • Ultimate",
    },
    roleSummary: {
      vi: "Sát thương diện rộng / Hiệu ứng cốt lõi (Ưu tiên số 1 lên Lv.15 cho Carry)",
      en: "Primary AoE burst / Core ultimate effect (#1 priority to Lv.15 on Carry)",
    },
    priorityTag: "core_burst",
  },
  {
    slotIndex: 1,
    slotNumber: 2,
    shortTitle: {
      vi: "Kỹ năng 2 • Chủ Động",
      en: "Skill 2 • Active Skill",
    },
    roleSummary: {
      vi: "Sát thương chu kỳ / Khiên chắn / Hồi máu chủ động theo nhịp đánh",
      en: "Rotational damage / Shield / Active healing on cooldown",
    },
    priorityTag: "core_burst",
  },
  {
    slotIndex: 2,
    slotNumber: 3,
    shortTitle: {
      vi: "Kỹ năng 3 • Nội Tại Cơ Bản",
      en: "Skill 3 • Base Passive",
    },
    roleSummary: {
      vi: "Chỉ số tĩnh phụ trợ (Thường dừng ở Lv.10 = 8,000 cuốn để tiết kiệm 16,700 cuốn)",
      en: "Secondary passive stat boost (Often parked at Lv.10 = 8,000 books to save 16,700)",
    },
    priorityTag: "secondary",
  },
  {
    slotIndex: 3,
    slotNumber: 4,
    shortTitle: {
      vi: "Kỹ năng 4 • Nội Tại Cốt Lõi",
      en: "Skill 4 • Core Passive",
    },
    roleSummary: {
      vi: "Xuyên giáp / Bạo kích / Giảm sát thương chuẩn của tướng 4–5 kỹ năng",
      en: "Armor pen / Crit scaling / True mitigation passive",
    },
    priorityTag: "core_burst",
  },
  {
    slotIndex: 4,
    slotNumber: 5,
    shortTitle: {
      vi: "Kỹ năng 5 • Đặc Quyền Đỏ / Thức Tỉnh",
      en: "Skill 5 • Mythic / Awakened",
    },
    roleSummary: {
      vi: "Kỹ năng thứ 5 của Tướng Thần Thoại Đỏ hoặc Tướng Vàng đã Thức Tỉnh",
      en: "5th skill unlocked on Mythic heroes or Red-Awakened Legendary heroes",
    },
    priorityTag: "awakening_mythic",
  },
  {
    slotIndex: 5,
    slotNumber: 6,
    shortTitle: {
      vi: "Kỹ năng 6 • Kỹ Năng Mở Rộng",
      en: "Skill 6 • Extended Slot",
    },
    roleSummary: {
      vi: "Ô kỹ năng thứ 6 cho tướng cơ chế đặc thù hoặc mở rộng Liên kết",
      en: "6th skill slot for specialized hero kits or bond extensions",
    },
    priorityTag: "awakening_mythic",
  },
] as const;

export interface SkillPresetConfig {
  readonly id:
    | "lv1"
    | "lv5"
    | "lv10"
    | "lv12"
    | "carry"
    | "support"
    | "lv15";
  readonly shortLabel: Record<CalculatorLocale, string>;
  readonly levels: SkillLevelsTuple;
  readonly isRecommended?: boolean;
}

export const SKILL_PRESET_CONFIGS: readonly SkillPresetConfig[] = [
  {
    id: "lv1",
    shortLabel: { vi: "Lv.1 (Gốc)", en: "Lv.1 (Base)" },
    levels: [1, 1, 1, 1, 1, 1],
  },
  {
    id: "lv5",
    shortLabel: { vi: "Lv.5 (Đội 2–3)", en: "Lv.5 (Queue 2–3)" },
    levels: [5, 5, 5, 5, 5, 5],
  },
  {
    id: "lv10",
    shortLabel: { vi: "★ Mốc Vàng Lv.10", en: "★ Golden Lv.10" },
    levels: [10, 10, 10, 10, 10, 10],
    isRecommended: true,
  },
  {
    id: "lv12",
    shortLabel: { vi: "Lv.12 (Mốc Đệm)", en: "Lv.12 (Sub-Cap)" },
    levels: [12, 12, 12, 12, 12, 12],
  },
  {
    id: "carry",
    shortLabel: {
      vi: "Phễu Carry (15/15/10/15)",
      en: "Carry Funnel (15/15/10/15)",
    },
    levels: [15, 15, 10, 15, 15, 10],
    isRecommended: true,
  },
  {
    id: "support",
    shortLabel: {
      vi: "Tank/Healer (10/12/12/10)",
      en: "Tank/Healer (10/12/12/10)",
    },
    levels: [10, 12, 12, 10, 10, 10],
  },
  {
    id: "lv15",
    shortLabel: { vi: "Max Lv.15", en: "Max Lv.15" },
    levels: [15, 15, 15, 15, 15, 15],
  },
] as const;

export function clampSkillLevel(level: number): number {
  if (!Number.isFinite(level)) return MIN_SKILL_BOOK_LEVEL;
  const rounded = Math.round(level);
  if (rounded < MIN_SKILL_BOOK_LEVEL) return MIN_SKILL_BOOK_LEVEL;
  if (rounded > MAX_SKILL_BOOK_LEVEL) return MAX_SKILL_BOOK_LEVEL;
  return rounded;
}

export function getSkillBookRowAtLevel(level: number): SkillBookLevelRow {
  const clamped = clampSkillLevel(level);
  return (
    SKILL_BOOK_LEVEL_TABLE[clamped - 1] ??
    SKILL_BOOK_LEVEL_TABLE[MIN_SKILL_BOOK_LEVEL - 1]
  );
}

export function getStepSkillBooksAtLevel(level: number): number {
  return getSkillBookRowAtLevel(level).stepBooks;
}

export function getCumulativeSkillBooksAtLevel(level: number): number {
  return getSkillBookRowAtLevel(level).cumulativeBooks;
}

export interface SkillSlotBreakdownItem {
  readonly slotIndex: SkillSlotIndex;
  readonly slotNumber: 1 | 2 | 3 | 4 | 5 | 6;
  readonly shortTitle: Record<CalculatorLocale, string>;
  readonly roleSummary: Record<CalculatorLocale, string>;
  readonly fromLevel: number;
  readonly toLevel: number;
  readonly levelsGained: number;
  readonly requiredBooksPerHero: number;
  readonly preLv10Books: number;
  readonly postLv10Books: number;
  readonly savedVsMax15: number;
}

export interface HeroSkillBooksUpgradeInput {
  readonly slotCount: SkillSlotCount;
  readonly heroCount: number;
  readonly fromLevels: SkillLevelsTuple;
  readonly toLevels: SkillLevelsTuple;
  readonly ownedSkillBooks?: number;
}

export interface HeroSkillBooksUpgradeResult {
  readonly slotCount: SkillSlotCount;
  readonly heroCount: number;
  readonly isInvalidRange: boolean;
  readonly alreadyInvestedPerHero: number;
  readonly targetCumulativePerHero: number;
  readonly maxPossiblePerHeroAt15: number;
  readonly perHeroRequiredBooks: number;
  readonly totalRequiredBooks: number;
  readonly preLv10BooksTotal: number;
  readonly postLv10BooksTotal: number;
  readonly booksSavedVsAllMax15: number;
  readonly equivalentLv10SkillsCount: number;
  readonly ownedSkillBooks: number;
  readonly missingSkillBooks: number;
  readonly surplusSkillBooks: number;
  readonly hasHighCostPostLv10Warning: boolean;
  readonly skillBookMaterial: CalculatorMaterialRef;
  readonly slotBreakdown: readonly SkillSlotBreakdownItem[];
}

export function calculateHeroSkillBooksUpgrade(
  input: HeroSkillBooksUpgradeInput
): HeroSkillBooksUpgradeResult {
  const slotCount: SkillSlotCount =
    input.slotCount === 5 || input.slotCount === 6 ? input.slotCount : 4;
  const heroCount = Math.max(1, Math.min(30, Math.round(input.heroCount || 1)));
  const ownedSkillBooks = Math.max(
    0,
    Math.floor(Number.isFinite(input.ownedSkillBooks) ? input.ownedSkillBooks! : 0)
  );

  const activeDefinitions = SKILL_SLOT_DEFINITIONS.slice(0, slotCount);
  const lv10Cumul = getCumulativeSkillBooksAtLevel(
    ECONOMIC_SWEET_SPOT_SKILL_LEVEL
  );
  const lv15Cumul = getCumulativeSkillBooksAtLevel(MAX_SKILL_BOOK_LEVEL);

  let hasLowerTargetThanFrom = false;
  let hasAnyIncrease = false;

  for (let i = 0; i < slotCount; i += 1) {
    const fromLv = clampSkillLevel(input.fromLevels[i] ?? 1);
    const toLv = clampSkillLevel(input.toLevels[i] ?? 1);
    if (toLv < fromLv) {
      hasLowerTargetThanFrom = true;
    }
    if (toLv > fromLv) {
      hasAnyIncrease = true;
    }
  }

  const isInvalidRange = hasLowerTargetThanFrom || !hasAnyIncrease;

  let alreadyInvestedPerHero = 0;
  let targetCumulativePerHero = 0;
  let perHeroRequiredBooks = 0;
  let preLv10BooksPerHero = 0;
  let postLv10BooksPerHero = 0;
  let savedVsMax15PerHero = 0;

  const slotBreakdown: SkillSlotBreakdownItem[] = activeDefinitions.map(
    (def) => {
      const fromLevel = clampSkillLevel(input.fromLevels[def.slotIndex] ?? 1);
      const toLevel = clampSkillLevel(input.toLevels[def.slotIndex] ?? 1);
      const fromCumul = getCumulativeSkillBooksAtLevel(fromLevel);
      const toCumul = getCumulativeSkillBooksAtLevel(toLevel);

      alreadyInvestedPerHero += fromCumul;
      targetCumulativePerHero += toCumul;

      if (isInvalidRange || toLevel <= fromLevel) {
        return {
          slotIndex: def.slotIndex,
          slotNumber: def.slotNumber,
          shortTitle: def.shortTitle,
          roleSummary: def.roleSummary,
          fromLevel,
          toLevel,
          levelsGained: 0,
          requiredBooksPerHero: 0,
          preLv10Books: 0,
          postLv10Books: 0,
          savedVsMax15: Math.max(0, lv15Cumul - toCumul),
        };
      }

      const requiredBooks = toCumul - fromCumul;
      const preEnd = Math.min(toLevel, ECONOMIC_SWEET_SPOT_SKILL_LEVEL);
      const preBooks =
        preEnd > fromLevel
          ? getCumulativeSkillBooksAtLevel(preEnd) - fromCumul
          : 0;
      const postBooks = Math.max(0, requiredBooks - preBooks);
      const savedBooks = Math.max(0, lv15Cumul - toCumul);

      perHeroRequiredBooks += requiredBooks;
      preLv10BooksPerHero += preBooks;
      postLv10BooksPerHero += postBooks;
      savedVsMax15PerHero += savedBooks;

      return {
        slotIndex: def.slotIndex,
        slotNumber: def.slotNumber,
        shortTitle: def.shortTitle,
        roleSummary: def.roleSummary,
        fromLevel,
        toLevel,
        levelsGained: toLevel - fromLevel,
        requiredBooksPerHero: requiredBooks,
        preLv10Books: preBooks,
        postLv10Books: postBooks,
        savedVsMax15: savedBooks,
      };
    }
  );

  const totalRequiredBooks = isInvalidRange
    ? 0
    : perHeroRequiredBooks * heroCount;
  const preLv10BooksTotal = isInvalidRange
    ? 0
    : preLv10BooksPerHero * heroCount;
  const postLv10BooksTotal = isInvalidRange
    ? 0
    : postLv10BooksPerHero * heroCount;
  const booksSavedVsAllMax15 = isInvalidRange
    ? 0
    : savedVsMax15PerHero * heroCount;

  const missingSkillBooks = Math.max(0, totalRequiredBooks - ownedSkillBooks);
  const surplusSkillBooks = Math.max(0, ownedSkillBooks - totalRequiredBooks);

  const slot3ToLv = clampSkillLevel(input.toLevels[2] ?? 1);
  const hasHighCostPostLv10Warning =
    !isInvalidRange && (slot3ToLv > ECONOMIC_SWEET_SPOT_SKILL_LEVEL || postLv10BooksTotal >= 66_800);

  return {
    slotCount,
    heroCount,
    isInvalidRange,
    alreadyInvestedPerHero,
    targetCumulativePerHero,
    maxPossiblePerHeroAt15: slotCount * lv15Cumul,
    perHeroRequiredBooks: isInvalidRange ? 0 : perHeroRequiredBooks,
    totalRequiredBooks,
    preLv10BooksTotal,
    postLv10BooksTotal,
    booksSavedVsAllMax15,
    equivalentLv10SkillsCount: Math.floor(totalRequiredBooks / lv10Cumul),
    ownedSkillBooks,
    missingSkillBooks,
    surplusSkillBooks,
    hasHighCostPostLv10Warning,
    skillBookMaterial: CALCULATOR_MATERIALS.skillBook,
    slotBreakdown,
  };
}

import { GAME_ASSET_REGISTRY } from "@/content/guides/asset-registry";
import type { AssetFaction } from "@/content/guides/types";
import { CALCULATOR_MATERIALS } from "./registry";
import type { CalculatorLocale, CalculatorMaterialRef } from "./types";

export type AwakeningFaction = "league" | "horde" | "nature";
export type AwakeningMajorTier = 0 | 1 | 2 | 3 | 4;

export interface AwakeningHeroOption {
  readonly id: string;
  readonly nameVi: string;
  readonly nameEn: string;
  readonly iconPath: string;
  readonly faction: AwakeningFaction;
  readonly isCoreAwakening: boolean;
}

export interface AwakeningFactionConfig {
  readonly faction: AwakeningFaction;
  readonly label: Record<CalculatorLocale, string>;
  readonly shortLabel: Record<CalculatorLocale, string>;
  readonly defaultHeroId: string;
  readonly soulStone: CalculatorMaterialRef;
  readonly universalShard: CalculatorMaterialRef;
  readonly guildHonorCurrency: CalculatorMaterialRef;
}

export interface AwakeningMilestoneNode {
  /** Chỉ số bước từ 0..19 */
  readonly stepIndex: number;
  /** Bậc lớn hiện tại (0 = Chưa thức tỉnh, 1 = Bậc 1, 2 = Bậc 2, 3 = Bậc 3, 4 = Bậc 4 Hóa Đỏ) */
  readonly majorTier: AwakeningMajorTier;
  /** Cấp nhỏ bên trong bậc (0..5; với stepIndex=0 và stepIndex=19 thì subLevel=0) */
  readonly subLevel: number;
  /** Nhãn hiển thị đầy đủ (VD: "Bậc 1 • Lv.5" / "Tier 1 • Lv.5") */
  readonly label: Record<CalculatorLocale, string>;
  /** Nhãn ngắn gọn (VD: "Bậc 1 • Lv.5" / "T1 • Lv.5") */
  readonly shortLabel: Record<CalculatorLocale, string>;
  /** Chi phí Mảnh Tướng để hoàn thành bước này (từ stepIndex-1 -> stepIndex) */
  readonly stepShards: number;
  /** Chi phí Đá Linh Hồn để hoàn thành bước này (từ stepIndex-1 -> stepIndex) */
  readonly stepStones: number;
  /** Tổng Mảnh Tướng tích lũy từ Bậc 0 đến mốc này */
  readonly cumulativeShards: number;
  /** Tổng Đá Linh Hồn tích lũy từ Bậc 0 đến mốc này */
  readonly cumulativeStones: number;
  /** Có phải là bước đột phá lên Bậc mới (tốn Đá Linh Hồn) hay không */
  readonly isTierBreakthrough: boolean;
  /** Ghi chú hiệu ứng đột phá (nếu có) */
  readonly breakthroughNote?: Record<CalculatorLocale, string>;
}

export interface AwakeningTierBreakdownItem {
  /** Mã bậc ('tier-0-to-1' | 'tier-1-to-2' | 'tier-2-to-3' | 'tier-3-to-4') */
  readonly tierKey: string;
  /** Tên giai đoạn hiển thị trong bảng [i] */
  readonly stageLabel: Record<CalculatorLocale, string>;
  /** Bước bắt đầu trong giai đoạn này */
  readonly startStepIndex: number;
  /** Bước kết thúc trong giai đoạn này */
  readonly endStepIndex: number;
  /** Số nấc thực tế đi qua trong giai đoạn này */
  readonly stepsCount: number;
  /** Tổng Mảnh Tướng tiêu tốn trong giai đoạn này */
  readonly stageShards: number;
  /** Tổng Đá Linh Hồn tiêu tốn trong giai đoạn này */
  readonly stageStones: number;
  /** Tích lũy Mảnh ở cuối giai đoạn */
  readonly cumulativeShardsAtEnd: number;
  /** Tích lũy Đá ở cuối giai đoạn */
  readonly cumulativeStonesAtEnd: number;
  /** Ghi chú đột phá kỹ năng / phẩm chất */
  readonly milestoneNote?: Record<CalculatorLocale, string>;
}

export interface HeroAwakeningCalculationInput {
  readonly faction: AwakeningFaction;
  readonly fromStepIndex: number;
  readonly toStepIndex: number;
  readonly ownedStones?: number;
  readonly ownedShards?: number;
}

export interface HeroAwakeningCalculationResult {
  readonly faction: AwakeningFaction;
  readonly fromNode: AwakeningMilestoneNode;
  readonly toNode: AwakeningMilestoneNode;
  readonly isInvalidRange: boolean;
  readonly alreadyInvestedStones: number;
  readonly alreadyInvestedShards: number;
  readonly targetCumulativeStones: number;
  readonly targetCumulativeShards: number;
  readonly requiredStones: number;
  readonly requiredShards: number;
  readonly ownedStones: number;
  readonly ownedShards: number;
  readonly missingStones: number;
  readonly missingShards: number;
  readonly surplusStones: number;
  readonly surplusShards: number;
  readonly stoneCompletionPercent: number;
  readonly shardCompletionPercent: number;
  readonly nextStepFromCurrentShards: number;
  readonly nextStepFromCurrentStones: number;
  readonly nextStepToTargetShards: number;
  readonly nextStepToTargetStones: number;
  /** Quy đổi số Đá Linh Hồn còn thiếu sang Điểm Vinh Quang Hội (40,000 / viên) */
  readonly missingStonesGuildHonorCost: number;
  /** Quy đổi số Đá Linh Hồn còn thiếu sang Xu Vinh Quang Bang S1 (6,000 / viên) */
  readonly missingStonesGuildCoinS1Cost: number;
  readonly soulStoneMaterial: CalculatorMaterialRef;
  readonly universalShardMaterial: CalculatorMaterialRef;
  readonly guildHonorMaterial: CalculatorMaterialRef;
  readonly tierBreakdown: readonly AwakeningTierBreakdownItem[];
}

export const GUILD_HONOR_PER_SOUL_STONE = 40000;
export const GUILD_COIN_S1_PER_SOUL_STONE = 6000;

/**
 * Danh sách các Tướng Vàng cốt lõi có cây Thức Tỉnh chuẩn lên phẩm Đỏ (Season 1+)
 */
export const CORE_AWAKENING_HERO_IDS: ReadonlySet<string> = new Set([
  "hero-pyromancer",
  "hero-adjudicator",
  "hero-nun",
  "hero-bard",
  "hero-astrologer",
  "hero-secret-keeper",
  "hero-hostess",
  "hero-warlock",
  "hero-soulmancer",
  "hero-swordmaster",
  "hero-wilderness-hunter",
  "hero-barbarian",
  "hero-shaman",
  "hero-pixie",
  "hero-sage",
  "hero-forest-maiden",
  "hero-druid",
  "hero-windwalker",
  "hero-treeguard",
  "hero-watcher",
]);

export const AWAKENING_FACTION_CONFIGS: Readonly<
  Record<AwakeningFaction, AwakeningFactionConfig>
> = {
  league: {
    faction: "league",
    label: {
      vi: "Phe Liên Minh (League)",
      en: "League Faction",
    },
    shortLabel: {
      vi: "Liên Minh",
      en: "League",
    },
    defaultHeroId: "hero-pyromancer",
    soulStone: CALCULATOR_MATERIALS.leagueSoulStone,
    universalShard: CALCULATOR_MATERIALS.legendaryUniversalHeroShard,
    guildHonorCurrency: CALCULATOR_MATERIALS.guildHonor,
  },
  horde: {
    faction: "horde",
    label: {
      vi: "Phe Bộ Tộc (Horde)",
      en: "Horde Faction",
    },
    shortLabel: {
      vi: "Bộ Tộc",
      en: "Horde",
    },
    defaultHeroId: "hero-warlock",
    soulStone: CALCULATOR_MATERIALS.hordeSoulStone,
    universalShard: CALCULATOR_MATERIALS.legendaryUniversalHeroShard,
    guildHonorCurrency: CALCULATOR_MATERIALS.guildHonor,
  },
  nature: {
    faction: "nature",
    label: {
      vi: "Phe Thiên Nhiên (Nature)",
      en: "Nature Faction",
    },
    shortLabel: {
      vi: "Thiên Nhiên",
      en: "Nature",
    },
    defaultHeroId: "hero-pixie",
    soulStone: CALCULATOR_MATERIALS.natureSoulStone,
    universalShard: CALCULATOR_MATERIALS.legendaryUniversalHeroShard,
    guildHonorCurrency: CALCULATOR_MATERIALS.guildHonor,
  },
};

/**
 * 20 mốc trạng thái Thức Tỉnh (stepIndex 0..19) trích xuất chính xác 100% từ TopHeroes Tables - Max:
 * - Tổng Đá Linh Hồn: 1 + 2 + 2 + 4 = 9 viên
 * - Tổng Mảnh Tướng: 5 + (5+10+10+10+15+15) + (15+15+15+20+20+20) + (20+20+30+30+30+40) = 345 mảnh
 */
export const AWAKENING_MILESTONE_NODES: readonly AwakeningMilestoneNode[] = [
  {
    stepIndex: 0,
    majorTier: 0,
    subLevel: 0,
    label: {
      vi: "Chưa Thức Tỉnh (Bậc 0 — Yêu cầu 2★ Bạc)",
      en: "Unawakened (Tier 0 — Requires 2★ Silver)",
    },
    shortLabel: { vi: "Bậc 0", en: "Tier 0" },
    stepShards: 0,
    stepStones: 0,
    cumulativeShards: 0,
    cumulativeStones: 0,
    isTierBreakthrough: false,
  },
  {
    stepIndex: 1,
    majorTier: 1,
    subLevel: 0,
    label: {
      vi: "Bậc 1 • Lv.0 (Đã mở khóa Bậc 1)",
      en: "Tier 1 • Lv.0 (Tier 1 Unlocked)",
    },
    shortLabel: { vi: "Bậc 1 • Lv.0", en: "T1 • Lv.0" },
    stepShards: 5,
    stepStones: 1,
    cumulativeShards: 5,
    cumulativeStones: 1,
    isTierBreakthrough: true,
    breakthroughNote: {
      vi: "Mở khóa Cây Thức Tỉnh & Cộng chỉ số cơ bản Bậc 1",
      en: "Unlocks Awakening Tree & grants Tier 1 base stat bonus",
    },
  },
  {
    stepIndex: 2,
    majorTier: 1,
    subLevel: 1,
    label: { vi: "Bậc 1 • Lv.1", en: "Tier 1 • Lv.1" },
    shortLabel: { vi: "Bậc 1 • Lv.1", en: "T1 • Lv.1" },
    stepShards: 5,
    stepStones: 0,
    cumulativeShards: 10,
    cumulativeStones: 1,
    isTierBreakthrough: false,
  },
  {
    stepIndex: 3,
    majorTier: 1,
    subLevel: 2,
    label: { vi: "Bậc 1 • Lv.2", en: "Tier 1 • Lv.2" },
    shortLabel: { vi: "Bậc 1 • Lv.2", en: "T1 • Lv.2" },
    stepShards: 10,
    stepStones: 0,
    cumulativeShards: 20,
    cumulativeStones: 1,
    isTierBreakthrough: false,
  },
  {
    stepIndex: 4,
    majorTier: 1,
    subLevel: 3,
    label: { vi: "Bậc 1 • Lv.3", en: "Tier 1 • Lv.3" },
    shortLabel: { vi: "Bậc 1 • Lv.3", en: "T1 • Lv.3" },
    stepShards: 10,
    stepStones: 0,
    cumulativeShards: 30,
    cumulativeStones: 1,
    isTierBreakthrough: false,
  },
  {
    stepIndex: 5,
    majorTier: 1,
    subLevel: 4,
    label: { vi: "Bậc 1 • Lv.4", en: "Tier 1 • Lv.4" },
    shortLabel: { vi: "Bậc 1 • Lv.4", en: "T1 • Lv.4" },
    stepShards: 10,
    stepStones: 0,
    cumulativeShards: 40,
    cumulativeStones: 1,
    isTierBreakthrough: false,
  },
  {
    stepIndex: 6,
    majorTier: 1,
    subLevel: 5,
    label: {
      vi: "Bậc 1 • Lv.5 (Sẵn sàng đột phá Bậc 2)",
      en: "Tier 1 • Lv.5 (Ready for Tier 2 Breakthrough)",
    },
    shortLabel: { vi: "Bậc 1 • Lv.5", en: "T1 • Lv.5" },
    stepShards: 15,
    stepStones: 0,
    cumulativeShards: 55,
    cumulativeStones: 1,
    isTierBreakthrough: false,
  },
  {
    stepIndex: 7,
    majorTier: 2,
    subLevel: 0,
    label: {
      vi: "Bậc 2 • Lv.0 (Đã đột phá Bậc 2)",
      en: "Tier 2 • Lv.0 (Tier 2 Unlocked)",
    },
    shortLabel: { vi: "Bậc 2 • Lv.0", en: "T2 • Lv.0" },
    stepShards: 15,
    stepStones: 2,
    cumulativeShards: 70,
    cumulativeStones: 3,
    isTierBreakthrough: true,
    breakthroughNote: {
      vi: "Mở khóa Skill Cường Hóa Thức Tỉnh (Chuẩn Thần Thoại)",
      en: "Unlocks Awakened Skill Enhancement (Mythic-grade scaling)",
    },
  },
  {
    stepIndex: 8,
    majorTier: 2,
    subLevel: 1,
    label: { vi: "Bậc 2 • Lv.1", en: "Tier 2 • Lv.1" },
    shortLabel: { vi: "Bậc 2 • Lv.1", en: "T2 • Lv.1" },
    stepShards: 15,
    stepStones: 0,
    cumulativeShards: 85,
    cumulativeStones: 3,
    isTierBreakthrough: false,
  },
  {
    stepIndex: 9,
    majorTier: 2,
    subLevel: 2,
    label: { vi: "Bậc 2 • Lv.2", en: "Tier 2 • Lv.2" },
    shortLabel: { vi: "Bậc 2 • Lv.2", en: "T2 • Lv.2" },
    stepShards: 15,
    stepStones: 0,
    cumulativeShards: 100,
    cumulativeStones: 3,
    isTierBreakthrough: false,
  },
  {
    stepIndex: 10,
    majorTier: 2,
    subLevel: 3,
    label: { vi: "Bậc 2 • Lv.3", en: "Tier 2 • Lv.3" },
    shortLabel: { vi: "Bậc 2 • Lv.3", en: "T2 • Lv.3" },
    stepShards: 15,
    stepStones: 0,
    cumulativeShards: 115,
    cumulativeStones: 3,
    isTierBreakthrough: false,
  },
  {
    stepIndex: 11,
    majorTier: 2,
    subLevel: 4,
    label: { vi: "Bậc 2 • Lv.4", en: "Tier 2 • Lv.4" },
    shortLabel: { vi: "Bậc 2 • Lv.4", en: "T2 • Lv.4" },
    stepShards: 20,
    stepStones: 0,
    cumulativeShards: 135,
    cumulativeStones: 3,
    isTierBreakthrough: false,
  },
  {
    stepIndex: 12,
    majorTier: 2,
    subLevel: 5,
    label: {
      vi: "Bậc 2 • Lv.5 (Sẵn sàng đột phá Bậc 3)",
      en: "Tier 2 • Lv.5 (Ready for Tier 3 Breakthrough)",
    },
    shortLabel: { vi: "Bậc 2 • Lv.5", en: "T2 • Lv.5" },
    stepShards: 20,
    stepStones: 0,
    cumulativeShards: 155,
    cumulativeStones: 3,
    isTierBreakthrough: false,
  },
  {
    stepIndex: 13,
    majorTier: 3,
    subLevel: 0,
    label: {
      vi: "Bậc 3 • Lv.0 (Đã đột phá Bậc 3)",
      en: "Tier 3 • Lv.0 (Tier 3 Unlocked)",
    },
    shortLabel: { vi: "Bậc 3 • Lv.0", en: "T3 • Lv.0" },
    stepShards: 20,
    stepStones: 2,
    cumulativeShards: 175,
    cumulativeStones: 5,
    isTierBreakthrough: true,
    breakthroughNote: {
      vi: "Đột phá Huyết mạch & Mở khóa buff chỉ số Binh lính hộ tống",
      en: "Bloodline breakthrough & unlocks escort soldier stat buffs",
    },
  },
  {
    stepIndex: 14,
    majorTier: 3,
    subLevel: 1,
    label: { vi: "Bậc 3 • Lv.1", en: "Tier 3 • Lv.1" },
    shortLabel: { vi: "Bậc 3 • Lv.1", en: "T3 • Lv.1" },
    stepShards: 20,
    stepStones: 0,
    cumulativeShards: 195,
    cumulativeStones: 5,
    isTierBreakthrough: false,
  },
  {
    stepIndex: 15,
    majorTier: 3,
    subLevel: 2,
    label: { vi: "Bậc 3 • Lv.2", en: "Tier 3 • Lv.2" },
    shortLabel: { vi: "Bậc 3 • Lv.2", en: "T3 • Lv.2" },
    stepShards: 20,
    stepStones: 0,
    cumulativeShards: 215,
    cumulativeStones: 5,
    isTierBreakthrough: false,
  },
  {
    stepIndex: 16,
    majorTier: 3,
    subLevel: 3,
    label: { vi: "Bậc 3 • Lv.3", en: "Tier 3 • Lv.3" },
    shortLabel: { vi: "Bậc 3 • Lv.3", en: "T3 • Lv.3" },
    stepShards: 30,
    stepStones: 0,
    cumulativeShards: 245,
    cumulativeStones: 5,
    isTierBreakthrough: false,
  },
  {
    stepIndex: 17,
    majorTier: 3,
    subLevel: 4,
    label: { vi: "Bậc 3 • Lv.4", en: "Tier 3 • Lv.4" },
    shortLabel: { vi: "Bậc 3 • Lv.4", en: "T3 • Lv.4" },
    stepShards: 30,
    stepStones: 0,
    cumulativeShards: 275,
    cumulativeStones: 5,
    isTierBreakthrough: false,
  },
  {
    stepIndex: 18,
    majorTier: 3,
    subLevel: 5,
    label: {
      vi: "Bậc 3 • Lv.5 (Sẵn sàng Hóa Đỏ Bậc 4)",
      en: "Tier 3 • Lv.5 (Ready for Tier 4 Mythic Ascension)",
    },
    shortLabel: { vi: "Bậc 3 • Lv.5", en: "T3 • Lv.5" },
    stepShards: 30,
    stepStones: 0,
    cumulativeShards: 305,
    cumulativeStones: 5,
    isTierBreakthrough: false,
  },
  {
    stepIndex: 19,
    majorTier: 4,
    subLevel: 0,
    label: {
      vi: "Bậc 4 ★ Hoàn Tất Hóa Đỏ (Thần Thoại)",
      en: "Tier 4 ★ Full Mythic Ascension",
    },
    shortLabel: { vi: "Bậc 4 (Hóa Đỏ)", en: "Tier 4 (Mythic)" },
    stepShards: 40,
    stepStones: 4,
    cumulativeShards: 345,
    cumulativeStones: 9,
    isTierBreakthrough: true,
    breakthroughNote: {
      vi: "Chính thức thăng hoa khung tướng từ Vàng (Legendary) lên Đỏ (Mythic)",
      en: "Officially ascends hero frame from Legendary (Gold) to Mythic (Red)",
    },
  },
];

export function clampAwakeningStepIndex(index: number): number {
  if (!Number.isFinite(index)) return 0;
  return Math.max(0, Math.min(19, Math.round(index)));
}

export function getAwakeningNodeByStep(
  rawIndex: number
): AwakeningMilestoneNode {
  const safeIndex = clampAwakeningStepIndex(rawIndex);
  return AWAKENING_MILESTONE_NODES[safeIndex];
}

export function getAwakeningHeroesByFaction(
  faction: AwakeningFaction
): readonly AwakeningHeroOption[] {
  const defaultHeroId = AWAKENING_FACTION_CONFIGS[faction].defaultHeroId;
  const entries = Object.values(GAME_ASSET_REGISTRY).filter(
    (entry) =>
      entry.category === "heroes" &&
      entry.rarity === "legendary" &&
      (entry.faction as AssetFaction) === faction
  );

  const mapped: AwakeningHeroOption[] = entries.map((entry) => ({
    id: entry.id,
    nameVi: entry.inGameNameVi || entry.nameVi,
    nameEn: entry.inGameNameEn || entry.nameEn,
    iconPath: entry.iconPath,
    faction,
    isCoreAwakening: CORE_AWAKENING_HERO_IDS.has(entry.id),
  }));

  mapped.sort((a, b) => {
    if (a.id === defaultHeroId) return -1;
    if (b.id === defaultHeroId) return 1;
    if (a.isCoreAwakening !== b.isCoreAwakening) {
      return a.isCoreAwakening ? -1 : 1;
    }
    return a.nameEn.localeCompare(b.nameEn);
  });

  return mapped;
}

const STAGE_DEFINITIONS: ReadonlyArray<{
  readonly tierKey: string;
  readonly minStep: number;
  readonly maxStep: number;
  readonly stageLabel: Record<CalculatorLocale, string>;
  readonly milestoneNote: Record<CalculatorLocale, string>;
}> = [
  {
    tierKey: "tier-0-to-1",
    minStep: 1,
    maxStep: 1,
    stageLabel: {
      vi: "Khởi tạo Bậc 1 (Bậc 0 ➔ Bậc 1 • Lv.0)",
      en: "Tier 1 Unlock (Tier 0 to Tier 1 • Lv.0)",
    },
    milestoneNote: {
      vi: "Mở khóa Cây Thức Tỉnh (1 Đá Linh Hồn + 5 Mảnh)",
      en: "Unlocks Awakening Tree (1 Soul Stone + 5 Shards)",
    },
  },
  {
    tierKey: "tier-1-to-2",
    minStep: 2,
    maxStep: 7,
    stageLabel: {
      vi: "Bậc 1 (Lv.0 ➔ Lv.5) & Đột phá Bậc 2",
      en: "Tier 1 (Lv.0 to Lv.5) & Tier 2 Breakthrough",
    },
    milestoneNote: {
      vi: "Mở khóa Skill Cường Hóa Thức Tỉnh (2 Đá Linh Hồn + 65 Mảnh)",
      en: "Unlocks Awakened Skill Enhancement (2 Soul Stones + 65 Shards)",
    },
  },
  {
    tierKey: "tier-2-to-3",
    minStep: 8,
    maxStep: 13,
    stageLabel: {
      vi: "Bậc 2 (Lv.0 ➔ Lv.5) & Đột phá Bậc 3",
      en: "Tier 2 (Lv.0 to Lv.5) & Tier 3 Breakthrough",
    },
    milestoneNote: {
      vi: "Đột phá Huyết mạch & Buff chỉ số Binh lính (2 Đá Linh Hồn + 105 Mảnh)",
      en: "Bloodline breakthrough & Soldier stat buffs (2 Soul Stones + 105 Shards)",
    },
  },
  {
    tierKey: "tier-3-to-4",
    minStep: 14,
    maxStep: 19,
    stageLabel: {
      vi: "Bậc 3 (Lv.0 ➔ Lv.5) & Hóa Đỏ Bậc 4 ★",
      en: "Tier 3 (Lv.0 to Lv.5) & Tier 4 Mythic Ascension ★",
    },
    milestoneNote: {
      vi: "Chính thức Hóa Đỏ Thần Thoại (4 Đá Linh Hồn + 170 Mảnh)",
      en: "Full Mythic Frame Ascension (4 Soul Stones + 170 Shards)",
    },
  },
];

export function calculateHeroAwakening(
  input: HeroAwakeningCalculationInput
): HeroAwakeningCalculationResult {
  const fromIdx = clampAwakeningStepIndex(input.fromStepIndex);
  const toIdx = clampAwakeningStepIndex(input.toStepIndex);
  const ownedStones =
    Number.isFinite(input.ownedStones) && (input.ownedStones ?? 0) > 0
      ? Math.floor(input.ownedStones!)
      : 0;
  const ownedShards =
    Number.isFinite(input.ownedShards) && (input.ownedShards ?? 0) > 0
      ? Math.floor(input.ownedShards!)
      : 0;

  const factionCfg = AWAKENING_FACTION_CONFIGS[input.faction];
  const fromNode = getAwakeningNodeByStep(fromIdx);
  const toNode = getAwakeningNodeByStep(toIdx);

  const nextNodeFromCurrent =
    fromIdx < 19 ? getAwakeningNodeByStep(fromIdx + 1) : null;
  const nextNodeToTarget =
    toIdx < 19 ? getAwakeningNodeByStep(toIdx + 1) : null;

  const isInvalidRange = toIdx <= fromIdx;

  if (isInvalidRange) {
    return {
      faction: input.faction,
      fromNode,
      toNode,
      isInvalidRange: true,
      alreadyInvestedStones: fromNode.cumulativeStones,
      alreadyInvestedShards: fromNode.cumulativeShards,
      targetCumulativeStones: toNode.cumulativeStones,
      targetCumulativeShards: toNode.cumulativeShards,
      requiredStones: 0,
      requiredShards: 0,
      ownedStones,
      ownedShards,
      missingStones: 0,
      missingShards: 0,
      surplusStones: ownedStones,
      surplusShards: ownedShards,
      stoneCompletionPercent: 100,
      shardCompletionPercent: 100,
      nextStepFromCurrentShards: nextNodeFromCurrent?.stepShards ?? 0,
      nextStepFromCurrentStones: nextNodeFromCurrent?.stepStones ?? 0,
      nextStepToTargetShards: nextNodeToTarget?.stepShards ?? 0,
      nextStepToTargetStones: nextNodeToTarget?.stepStones ?? 0,
      missingStonesGuildHonorCost: 0,
      missingStonesGuildCoinS1Cost: 0,
      soulStoneMaterial: factionCfg.soulStone,
      universalShardMaterial: factionCfg.universalShard,
      guildHonorMaterial: factionCfg.guildHonorCurrency,
      tierBreakdown: [],
    };
  }

  const requiredStones = toNode.cumulativeStones - fromNode.cumulativeStones;
  const requiredShards = toNode.cumulativeShards - fromNode.cumulativeShards;

  const missingStones = Math.max(0, requiredStones - ownedStones);
  const missingShards = Math.max(0, requiredShards - ownedShards);
  const surplusStones = Math.max(0, ownedStones - requiredStones);
  const surplusShards = Math.max(0, ownedShards - requiredShards);

  const stoneCompletionPercent =
    requiredStones === 0
      ? 100
      : Math.min(100, Math.round((ownedStones / requiredStones) * 100));
  const shardCompletionPercent =
    requiredShards === 0
      ? 100
      : Math.min(100, Math.round((ownedShards / requiredShards) * 100));

  const tierBreakdown: AwakeningTierBreakdownItem[] = [];

  for (const stage of STAGE_DEFINITIONS) {
    const startStep = Math.max(stage.minStep, fromIdx + 1);
    const endStep = Math.min(stage.maxStep, toIdx);
    if (startStep <= endStep) {
      let stageShards = 0;
      let stageStones = 0;
      for (let s = startStep; s <= endStep; s += 1) {
        const node = AWAKENING_MILESTONE_NODES[s];
        stageShards += node.stepShards;
        stageStones += node.stepStones;
      }
      const endNode = AWAKENING_MILESTONE_NODES[endStep];
      tierBreakdown.push({
        tierKey: stage.tierKey,
        stageLabel: stage.stageLabel,
        startStepIndex: startStep,
        endStepIndex: endStep,
        stepsCount: endStep - startStep + 1,
        stageShards,
        stageStones,
        cumulativeShardsAtEnd: endNode.cumulativeShards,
        cumulativeStonesAtEnd: endNode.cumulativeStones,
        milestoneNote: endStep === stage.maxStep ? stage.milestoneNote : undefined,
      });
    }
  }

  return {
    faction: input.faction,
    fromNode,
    toNode,
    isInvalidRange: false,
    alreadyInvestedStones: fromNode.cumulativeStones,
    alreadyInvestedShards: fromNode.cumulativeShards,
    targetCumulativeStones: toNode.cumulativeStones,
    targetCumulativeShards: toNode.cumulativeShards,
    requiredStones,
    requiredShards,
    ownedStones,
    ownedShards,
    missingStones,
    missingShards,
    surplusStones,
    surplusShards,
    stoneCompletionPercent,
    shardCompletionPercent,
    nextStepFromCurrentShards: nextNodeFromCurrent?.stepShards ?? 0,
    nextStepFromCurrentStones: nextNodeFromCurrent?.stepStones ?? 0,
    nextStepToTargetShards: nextNodeToTarget?.stepShards ?? 0,
    nextStepToTargetStones: nextNodeToTarget?.stepStones ?? 0,
    missingStonesGuildHonorCost: missingStones * GUILD_HONOR_PER_SOUL_STONE,
    missingStonesGuildCoinS1Cost: missingStones * GUILD_COIN_S1_PER_SOUL_STONE,
    soulStoneMaterial: factionCfg.soulStone,
    universalShardMaterial: factionCfg.universalShard,
    guildHonorMaterial: factionCfg.guildHonorCurrency,
    tierBreakdown,
  };
}

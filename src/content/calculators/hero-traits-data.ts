import { GAME_ASSET_REGISTRY } from "@/content/guides/asset-registry";
import type { AssetFaction } from "@/content/guides/types";
import { CALCULATOR_MATERIALS } from "./registry";
import type { CalculatorLocale, CalculatorMaterialRef } from "./types";
import type { HeroStarRarity } from "./hero-stars-data";

export type TraitSlotIndex = 0 | 1 | 2 | 3;
export type TraitLevelsTuple = readonly [number, number, number, number];
export type HeroTraitCategory = "economy_24_7" | "combat";

export const SHARDS_PER_TRAIT_LEVEL = 10;
export const MAX_TRAIT_SLOT_LEVEL = 30;
export const MAX_SHARDS_PER_SLOT = 300;
export const MAX_SHARDS_FOUR_SLOTS = 1200;
export const DIAMOND_COST_SLOT_4_UNLOCK = 2000;
export const DIAMOND_COST_TRAIT_SWAP = 2000;

export interface HeroTrait3Profile {
  readonly category: HeroTraitCategory;
  readonly trait3Title: Record<CalculatorLocale, string>;
  readonly maxBonusLabel: Record<CalculatorLocale, string>;
  readonly perLevelBonusLabel: Record<CalculatorLocale, string>;
  readonly strategicNote: Record<CalculatorLocale, string>;
}

export interface TraitHeroOption {
  readonly id: string;
  readonly nameVi: string;
  readonly nameEn: string;
  readonly iconPath: string;
  readonly rarity: HeroStarRarity;
  readonly faction: AssetFaction;
  readonly traitProfile: HeroTrait3Profile;
}

export interface TraitRarityConfig {
  readonly rarity: HeroStarRarity;
  readonly label: Record<CalculatorLocale, string>;
  readonly shortLabel: Record<CalculatorLocale, string>;
  readonly defaultHeroId: string;
  readonly starUnlockPrerequisiteShards: number;
  readonly universalShard: CalculatorMaterialRef;
  readonly diamondMaterial: CalculatorMaterialRef;
}

export interface TraitSlotBreakdownItem {
  readonly slotNumber: 1 | 2 | 3 | 4;
  readonly slotTitle: Record<CalculatorLocale, string>;
  readonly slotEffectSummary: Record<CalculatorLocale, string>;
  readonly fromLevel: number;
  readonly toLevel: number;
  readonly levelsGained: number;
  readonly requiredShards: number;
  readonly diamondUnlockCost: number;
}

export interface HeroTraitsCalculationInput {
  readonly rarity: HeroStarRarity;
  readonly heroId: string;
  readonly fromLevels: TraitLevelsTuple;
  readonly toLevels: TraitLevelsTuple;
  readonly ownedShards?: number;
  readonly ownedDiamonds?: number;
  readonly includeTraitSwap?: boolean;
}

export interface HeroTraitsCalculationResult {
  readonly rarity: HeroStarRarity;
  readonly heroId: string;
  readonly heroProfile: HeroTrait3Profile;
  readonly fromLevels: TraitLevelsTuple;
  readonly toLevels: TraitLevelsTuple;
  readonly isInvalidRange: boolean;
  readonly alreadyInvestedShards: number;
  readonly targetCumulativeShards: number;
  readonly requiredShards: number;
  readonly ownedShards: number;
  readonly missingShards: number;
  readonly surplusShards: number;
  readonly shardCompletionPercent: number;
  readonly requiresSlot4UnlockDiamond: boolean;
  readonly includeTraitSwap: boolean;
  readonly requiredDiamonds: number;
  readonly ownedDiamonds: number;
  readonly missingDiamonds: number;
  readonly surplusDiamonds: number;
  readonly isSlot4EconomyTrapWarning: boolean;
  readonly hasPrerequisiteBridgeWarning: boolean;
  readonly starUnlockPrerequisiteShards: number;
  readonly slot1CurrentAtkBonusPercent: number;
  readonly slot1TargetAtkBonusPercent: number;
  readonly slot4CurrentHpBonusPercent: number;
  readonly slot4TargetHpBonusPercent: number;
  readonly universalShardMaterial: CalculatorMaterialRef;
  readonly diamondMaterial: CalculatorMaterialRef;
  readonly slotBreakdown: readonly TraitSlotBreakdownItem[];
}

export const TRAIT_RARITY_CONFIGS: Readonly<
  Record<HeroStarRarity, TraitRarityConfig>
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
    defaultHeroId: "hero-desert-prince",
    starUnlockPrerequisiteShards: 600,
    universalShard: CALCULATOR_MATERIALS.legendaryUniversalHeroShard,
    diamondMaterial: CALCULATOR_MATERIALS.diamond,
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
    defaultHeroId: "hero-bard",
    starUnlockPrerequisiteShards: 300,
    universalShard: CALCULATOR_MATERIALS.legendaryUniversalHeroShard,
    diamondMaterial: CALCULATOR_MATERIALS.diamond,
  },
  epic: {
    rarity: "epic",
    label: {
      vi: "Tướng Tím (Epic — Kinh Tế 24/7)",
      en: "Epic Hero (Purple — 24/7 Economy)",
    },
    shortLabel: {
      vi: "Tướng Tím",
      en: "Epic",
    },
    defaultHeroId: "hero-brawler",
    starUnlockPrerequisiteShards: 300,
    universalShard: CALCULATOR_MATERIALS.epicUniversalHeroShard,
    diamondMaterial: CALCULATOR_MATERIALS.diamond,
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
    defaultHeroId: "hero-guardsman",
    starUnlockPrerequisiteShards: 180,
    universalShard: CALCULATOR_MATERIALS.rareUniversalHeroShard,
    diamondMaterial: CALCULATOR_MATERIALS.diamond,
  },
};

/**
 * Bảng SSoT Ô Thiên Phú Số 3 (Individual Trait 3) trích xuất từ TopHeroes Tables - Max & 2.5-epic-hero-traits.ts
 */
export const HERO_TRAIT_3_PROFILES: Readonly<Record<string, HeroTrait3Profile>> =
  {
    // --- 8 TƯỚNG TÍM KINH TẾ 24/7 (ACTIVE WITHOUT DEPLOYMENT) ---
    "hero-brawler": {
      category: "economy_24_7",
      trait3Title: {
        vi: "Tốc độ Nghiên cứu Công nghệ (Có hiệu lực 24/7 trong kho)",
        en: "Tech Research Rate (Active 24/7 Without Deployment)",
      },
      maxBonusLabel: {
        vi: "+30% Tốc độ Nghiên cứu Công nghệ (Lv.30)",
        en: "+30% Tech Research Rate (Lv.30)",
      },
      perLevelBonusLabel: {
        vi: "+1.00% mỗi cấp",
        en: "+1.00% per level",
      },
      strategicNote: {
        vi: "Ưu tiên Số #1 toàn nhóm Tướng Tím: Phễu chuẩn Ô 1 Lv.15 + Ô 3 Lv.30 (450 Mảnh Tím). Không mở Ô 4 để tiết kiệm 2,000 Kim Cương.",
        en: "#1 Epic Priority: Optimal funnel is Slot 1 Lv.15 + Slot 3 Lv.30 (450 Epic Shards). Do NOT unlock Slot 4 to save 2,000 Diamonds.",
      },
    },
    "hero-knight": {
      category: "economy_24_7",
      trait3Title: {
        vi: "Tốc độ Huấn luyện Binh lính (Có hiệu lực 24/7 trong kho)",
        en: "Soldier Training Speed (Active 24/7 Without Deployment)",
      },
      maxBonusLabel: {
        vi: "+30% Tốc độ Huấn luyện Binh lính (Lv.30)",
        en: "+30% Soldier Training Speed (Lv.30)",
      },
      perLevelBonusLabel: {
        vi: "+1.00% mỗi cấp",
        en: "+1.00% per level",
      },
      strategicNote: {
        vi: "Ưu tiên Số #2 Tướng Tím: Phục vụ xả điểm Ngày Lính (GAR/KvK). Chỉ nâng Ô 1 Lv.15 + Ô 3 Lv.30, tuyệt đối khóa Ô 4.",
        en: "#2 Epic Priority: Boosts Troop Training Day in GAR/KvK. Upgrade Slot 1 Lv.15 + Slot 3 Lv.30; keep Slot 4 locked.",
      },
    },
    "hero-ranger": {
      category: "economy_24_7",
      trait3Title: {
        vi: "Tốc độ Thu thập Ruby (Có hiệu lực 24/7 trong kho)",
        en: "Ruby Gathering Speed (Active 24/7 Without Deployment)",
      },
      maxBonusLabel: {
        vi: "+30% Tốc độ Thu thập Ruby (Lv.30)",
        en: "+30% Ruby Gathering Speed (Lv.30)",
      },
      perLevelBonusLabel: {
        vi: "+1.00% mỗi cấp",
        en: "+1.00% per level",
      },
      strategicNote: {
        vi: "Tướng Tím Kinh tế: Tăng tốc đào mỏ Ruby thế giới. Chỉ nâng phễu Ô 3 Lv.30, không mở Ô 4.",
        en: "Economic Epic: Boosts world map Ruby mining speed. Follow Slot 3 Lv.30 funnel; do not unlock Slot 4.",
      },
    },
    "hero-minister": {
      category: "economy_24_7",
      trait3Title: {
        vi: "Tốc độ Chữa thương Bệnh viện (Có hiệu lực 24/7 trong kho)",
        en: "Hospital Healing Speed (Active 24/7 Without Deployment)",
      },
      maxBonusLabel: {
        vi: "+30% Tốc độ Chữa thương (Cộng dồn 3 tướng = +90%)",
        en: "+30% Hospital Healing Speed (Stacks to +90% across 3 Epics)",
      },
      perLevelBonusLabel: {
        vi: "+1.00% mỗi cấp",
        en: "+1.00% per level",
      },
      strategicNote: {
        vi: "Cộng dồn cùng Nữ Tư Tế & Vũ Công đạt +90% tốc độ hồi thương trong chiến tranh KvK. Không mở Ô 4.",
        en: "Stacks with Priestess & Dancer for +90% healing speed during KvK wars. Keep Slot 4 locked.",
      },
    },
    "hero-priestess": {
      category: "economy_24_7",
      trait3Title: {
        vi: "Tốc độ Chữa thương Bệnh viện (Có hiệu lực 24/7 trong kho)",
        en: "Hospital Healing Speed (Active 24/7 Without Deployment)",
      },
      maxBonusLabel: {
        vi: "+30% Tốc độ Chữa thương (Cộng dồn 3 tướng = +90%)",
        en: "+30% Hospital Healing Speed (Stacks to +90% across 3 Epics)",
      },
      perLevelBonusLabel: {
        vi: "+1.00% mỗi cấp",
        en: "+1.00% per level",
      },
      strategicNote: {
        vi: "Cộng dồn cùng Bộ Trưởng & Vũ Công đạt +90% tốc độ hồi thương. Không mở Ô 4.",
        en: "Stacks with Minister & Dancer for +90% healing speed. Keep Slot 4 locked.",
      },
    },
    "hero-dancer": {
      category: "economy_24_7",
      trait3Title: {
        vi: "Tốc độ Chữa thương Bệnh viện (Có hiệu lực 24/7 trong kho)",
        en: "Hospital Healing Speed (Active 24/7 Without Deployment)",
      },
      maxBonusLabel: {
        vi: "+30% Tốc độ Chữa thương (Cộng dồn 3 tướng = +90%)",
        en: "+30% Hospital Healing Speed (Stacks to +90% across 3 Epics)",
      },
      perLevelBonusLabel: {
        vi: "+1.00% mỗi cấp",
        en: "+1.00% per level",
      },
      strategicNote: {
        vi: "Cộng dồn cùng Bộ Trưởng & Nữ Tư Tế đạt +90% tốc độ hồi thương. Không mở Ô 4.",
        en: "Stacks with Minister & Priestess for +90% healing speed. Keep Slot 4 locked.",
      },
    },
    "hero-rogue": {
      category: "economy_24_7",
      trait3Title: {
        vi: "Tốc độ Thu thập Đá (Có hiệu lực 24/7 trong kho)",
        en: "Stone Gathering Speed (Active 24/7 Without Deployment)",
      },
      maxBonusLabel: {
        vi: "+30% Tốc độ Thu thập Đá (Lv.30)",
        en: "+30% Stone Gathering Speed (Lv.30)",
      },
      perLevelBonusLabel: {
        vi: "+1.00% mỗi cấp",
        en: "+1.00% per level",
      },
      strategicNote: {
        vi: "Tướng Tím Kinh tế cuối danh sách ưu tiên: Chỉ nâng bằng mảnh dư từ Quán Rượu, không mở Ô 4.",
        en: "Low-priority Economic Epic: Upgrade using natural Tavern shards only; do not unlock Slot 4.",
      },
    },
    "hero-outlaw": {
      category: "economy_24_7",
      trait3Title: {
        vi: "Tốc độ Thu thập Gỗ (Có hiệu lực 24/7 trong kho)",
        en: "Timber Gathering Speed (Active 24/7 Without Deployment)",
      },
      maxBonusLabel: {
        vi: "+30% Tốc độ Thu thập Gỗ (Lv.30)",
        en: "+30% Timber Gathering Speed (Lv.30)",
      },
      perLevelBonusLabel: {
        vi: "+1.00% mỗi cấp",
        en: "+1.00% per level",
      },
      strategicNote: {
        vi: "Tướng Tím Kinh tế cuối danh sách ưu tiên: Chỉ nâng bằng mảnh dư từ Quán Rượu, không mở Ô 4.",
        en: "Low-priority Economic Epic: Upgrade using natural Tavern shards only; do not unlock Slot 4.",
      },
    },

    // --- 10 TƯỚNG VÀNG KINH TẾ 24/7 (LEGENDARY ECONOMY TRAIT 3) ---
    "hero-bard": {
      category: "economy_24_7",
      trait3Title: {
        vi: "Tốc độ Xây dựng Công trình (Có hiệu lực 24/7 trong kho)",
        en: "Construction Speed (Active 24/7 Without Deployment)",
      },
      maxBonusLabel: {
        vi: "+40% Tốc độ Xây dựng (Lv.30)",
        en: "+40% Construction Speed (Lv.30)",
      },
      perLevelBonusLabel: {
        vi: "+1.33% mỗi cấp",
        en: "+1.33% per level",
      },
      strategicNote: {
        vi: "Tướng Vàng Kinh tế Số #1: Dùng mảnh riêng từ Quán Rượu nâng phễu Ô 3 Lv.30 lấy +40% tốc độ xây Lâu Đài.",
        en: "#1 Economic Legendary: Use natural Tavern shards to max Slot 3 Lv.30 for +40% Castle construction speed.",
      },
    },
    "hero-shaman": {
      category: "economy_24_7",
      trait3Title: {
        vi: "Tốc độ Nghiên cứu Công nghệ (Có hiệu lực 24/7 trong kho)",
        en: "Tech Research Rate (Active 24/7 Without Deployment)",
      },
      maxBonusLabel: {
        vi: "+40% Tốc độ Nghiên cứu Công nghệ (Lv.30)",
        en: "+40% Tech Research Rate (Lv.30)",
      },
      perLevelBonusLabel: {
        vi: "+1.33% mỗi cấp",
        en: "+1.33% per level",
      },
      strategicNote: {
        vi: "Cộng dồn cùng Đấu Sĩ (+30%) tạo ra tổng +70% Tốc độ Nghiên cứu vĩnh viễn cho toàn tài khoản.",
        en: "Stacks with Epic Brawler (+30%) for a massive +70% permanent Tech Research speed boost.",
      },
    },
    "hero-hostess": {
      category: "economy_24_7",
      trait3Title: {
        vi: "Tốc độ Huấn luyện Binh lính (Có hiệu lực 24/7 trong kho)",
        en: "Soldier Training Speed (Active 24/7 Without Deployment)",
      },
      maxBonusLabel: {
        vi: "+40% Tốc độ Huấn luyện Binh lính (Lv.30)",
        en: "+40% Soldier Training Speed (Lv.30)",
      },
      perLevelBonusLabel: {
        vi: "+1.33% mỗi cấp",
        en: "+1.33% per level",
      },
      strategicNote: {
        vi: "Cộng dồn cùng Kỵ Sĩ (+30%) đạt tổng +70% Tốc độ Huấn luyện Lính.",
        en: "Stacks with Epic Knight (+30%) for +70% total Soldier Training Speed.",
      },
    },
    "hero-headhunter": {
      category: "economy_24_7",
      trait3Title: {
        vi: "Tốc độ Thu thập Ruby (Có hiệu lực 24/7 trong kho)",
        en: "Ruby Gathering Speed (Active 24/7 Without Deployment)",
      },
      maxBonusLabel: {
        vi: "+40% Tốc độ Thu thập Ruby (Lv.30)",
        en: "+40% Ruby Gathering Speed (Lv.30)",
      },
      perLevelBonusLabel: {
        vi: "+1.33% mỗi cấp",
        en: "+1.33% per level",
      },
      strategicNote: {
        vi: "Tướng Vàng Kinh tế dự bị: Chỉ dùng mảnh riêng từ Quán Rượu, không dùng Mảnh Vạn Năng Cam và không mở Ô 4.",
        en: "Benched Economic Legendary: Use named Tavern shards only; never spend Universal Legendary Shards or unlock Slot 4.",
      },
    },
    "hero-treeguard": {
      category: "economy_24_7",
      trait3Title: {
        vi: "Tốc độ Thu thập Gỗ (Có hiệu lực 24/7 trong kho)",
        en: "Timber Gathering Speed (Active 24/7 Without Deployment)",
      },
      maxBonusLabel: {
        vi: "+40% Tốc độ Thu thập Gỗ (Lv.30)",
        en: "+40% Timber Gathering Speed (Lv.30)",
      },
      perLevelBonusLabel: {
        vi: "+1.33% mỗi cấp",
        en: "+1.33% per level",
      },
      strategicNote: {
        vi: "Tướng Vàng Kinh tế dự bị: Chỉ nâng bằng mảnh riêng rơi tự nhiên từ Quán Rượu.",
        en: "Benched Economic Legendary: Upgrade with natural Tavern named shards only.",
      },
    },
    "hero-stonemason": {
      category: "economy_24_7",
      trait3Title: {
        vi: "Tốc độ Thu thập Đá (Có hiệu lực 24/7 trong kho)",
        en: "Stone Gathering Speed (Active 24/7 Without Deployment)",
      },
      maxBonusLabel: {
        vi: "+40% Tốc độ Thu thập Đá (Lv.30)",
        en: "+40% Stone Gathering Speed (Lv.30)",
      },
      perLevelBonusLabel: {
        vi: "+1.33% mỗi cấp",
        en: "+1.33% per level",
      },
      strategicNote: {
        vi: "Tướng Vàng Kinh tế dự bị: Chỉ nâng bằng mảnh riêng rơi tự nhiên từ Quán Rượu.",
        en: "Benched Economic Legendary: Upgrade with natural Tavern named shards only.",
      },
    },
    "hero-secret-keeper": {
      category: "economy_24_7",
      trait3Title: {
        vi: "Tốc độ Hành quân Đánh Người Chơi PvP (24/7)",
        en: "PvP Attack March Speed (Active 24/7)",
      },
      maxBonusLabel: {
        vi: "+50% Tốc độ Hành quân PvP (Lv.30)",
        en: "+50% PvP Attack March Speed (Lv.30)",
      },
      perLevelBonusLabel: {
        vi: "+1.67% mỗi cấp",
        en: "+1.67% per level",
      },
      strategicNote: {
        vi: "Tăng tốc độ hành quân khi công thành người chơi khác trên bản đồ thế giới.",
        en: "Increases march speed when attacking other players on the world map.",
      },
    },
    "hero-pathfinder": {
      category: "economy_24_7",
      trait3Title: {
        vi: "Tốc độ Hành quân Đánh Quái PvE (24/7)",
        en: "PvE Monster March Speed (Active 24/7)",
      },
      maxBonusLabel: {
        vi: "+50% Tốc độ Hành quân Đánh Quái (Lv.30)",
        en: "+50% PvE Monster March Speed (Lv.30)",
      },
      perLevelBonusLabel: {
        vi: "+1.67% mỗi cấp",
        en: "+1.67% per level",
      },
      strategicNote: {
        vi: "Rút ngắn thời gian săn Boss và quái bản đồ hàng ngày.",
        en: "Reduces daily world map monster and rally march times.",
      },
    },
    "hero-warlock": {
      category: "economy_24_7",
      trait3Title: {
        vi: "Giới hạn Cướp bóc Tài nguyên Ngày (24/7)",
        en: "Daily Resource Plunder Limit (Active 24/7)",
      },
      maxBonusLabel: {
        vi: "+360,000 Giới hạn Cướp bóc Tài nguyên Ngày (Lv.30)",
        en: "+360,000 Daily Resource Plunder Limit (Lv.30)",
      },
      perLevelBonusLabel: {
        vi: "+12,000 mỗi cấp",
        en: "+12,000 per level",
      },
      strategicNote: {
        vi: "Nếu dùng Thuật Sĩ trong Đội 1 Bộ Tộc (đã Thức Tỉnh), có thể nâng đủ 4 ô; nếu để dự bị thì không mở Ô 4.",
        en: "If deployed in Main Horde Queue (Awakened), max all 4 slots; if benched for plunder cap only, keep Slot 4 locked.",
      },
    },
    "hero-watcher": {
      category: "economy_24_7",
      trait3Title: {
        vi: "Sức chứa Binh lính Doanh trại (24/7)",
        en: "Barracks Soldier Capacity (Active 24/7)",
      },
      maxBonusLabel: {
        vi: "+2,000 Sức chứa Binh lính (Lv.30)",
        en: "+2,000 Barracks Soldier Capacity (Lv.30)",
      },
      perLevelBonusLabel: {
        vi: "+66.7 mỗi cấp",
        en: "+66.7 per level",
      },
      strategicNote: {
        vi: "Tăng trần chứa lính dự trữ trong doanh trại. Chỉ nâng bằng mảnh riêng từ Quán Rượu.",
        en: "Increases total reserve soldier capacity. Upgrade using natural Tavern shards only.",
      },
    },

    // --- NHÓM TƯỚNG ĐỎ & VÀNG CHIẾN ĐẤU ĐỘI HÌNH CHÍNH (COMBAT TRAIT 3) ---
    "hero-desert-prince": {
      category: "combat",
      trait3Title: {
        vi: "Giảm Sát Thương Kỹ Năng Nhận Vào (Chiến đấu)",
        en: "Skill Damage Reduction (Combat)",
      },
      maxBonusLabel: {
        vi: "+50% Giảm Sát Thương Kỹ Năng (Lv.30)",
        en: "+50% Skill Damage Reduction (Lv.30)",
      },
      perLevelBonusLabel: {
        vi: "+1.67% mỗi cấp",
        en: "+1.67% per level",
      },
      strategicNote: {
        vi: "Trụ cột Tanker Đội 1 Bộ Tộc: Mở khóa đủ 4 ô và nâng tuần tự theo cụm 5 cấp (5/5 ➔ 10/10 ➔ ... ➔ 30/30).",
        en: "Core Horde Main Tank: Unlock all 4 slots and upgrade sequentially in 5-level blocks up to 30/30.",
      },
    },
    "hero-beastmaster": {
      category: "combat",
      trait3Title: {
        vi: "Giảm Sát Thương Kỹ Năng Nhận Vào (Chiến đấu)",
        en: "Skill Damage Reduction (Combat)",
      },
      maxBonusLabel: {
        vi: "+50% Giảm Sát Thương Kỹ Năng (Lv.30)",
        en: "+50% Skill Damage Reduction (Lv.30)",
      },
      perLevelBonusLabel: {
        vi: "+1.67% mỗi cấp",
        en: "+1.67% per level",
      },
      strategicNote: {
        vi: "Tướng Đỏ Đội hình chính: Nâng đồng đều cả 4 ô Thiên Phú (1,200 Mảnh) khi đã đạt 2★ Bạc.",
        en: "Main Queue Mythic: Max all 4 Trait slots (1,200 Shards) once at 2★ Silver.",
      },
    },
    "hero-tidecaller": {
      category: "combat",
      trait3Title: {
        vi: "Giảm Sát Thương Kỹ Năng Nhận Vào (Chiến đấu)",
        en: "Skill Damage Reduction (Combat)",
      },
      maxBonusLabel: {
        vi: "+50% Giảm Sát Thương Kỹ Năng (Lv.30)",
        en: "+50% Skill Damage Reduction (Lv.30)",
      },
      perLevelBonusLabel: {
        vi: "+1.67% mỗi cấp",
        en: "+1.67% per level",
      },
      strategicNote: {
        vi: "Trụ cột Đội 1 Thiên Nhiên: Ưu tiên nâng đầy đủ 4 ô Thiên Phú lên 30/30.",
        en: "Core Nature Pillar: Prioritize full 30/30 across all 4 Trait slots.",
      },
    },
    "hero-sage": {
      category: "combat",
      trait3Title: {
        vi: "Giảm Sát Thương Kỹ Năng Nhận Vào (Chiến đấu)",
        en: "Skill Damage Reduction (Combat)",
      },
      maxBonusLabel: {
        vi: "+50% Giảm Sát Thương Kỹ Năng (Lv.30)",
        en: "+50% Skill Damage Reduction (Lv.30)",
      },
      perLevelBonusLabel: {
        vi: "+1.67% mỗi cấp",
        en: "+1.67% per level",
      },
      strategicNote: {
        vi: "Tanker Thiên Nhiên: Tăng độ lì đòn vượt trội trước sát thương phép/kỹ năng.",
        en: "Nature Tank: Grants massive mitigation against enemy skill bursts.",
      },
    },
    "hero-storm-maiden": {
      category: "combat",
      trait3Title: {
        vi: "Hút Máu / HP Drain (Chiến đấu)",
        en: "HP Drain / Lifesteal (Combat)",
      },
      maxBonusLabel: {
        vi: "+20% Hút Máu (Lv.30)",
        en: "+20% HP Drain (Lv.30)",
      },
      perLevelBonusLabel: {
        vi: "+0.67% mỗi cấp",
        en: "+0.67% per level",
      },
      strategicNote: {
        vi: "Hyper-Carry Đội 1 Bộ Tộc: Mở khóa Ô 4 (+90% HP) và ưu tiên kịch trần Ô 1 (+90% ATK) & Ô 3 (+20% Hút Máu).",
        en: "Horde Hyper-Carry: Unlock Slot 4 (+90% HP) and prioritize maxing Slot 1 (+90% ATK) & Slot 3 (+20% HP Drain).",
      },
    },
    "hero-paragon": {
      category: "combat",
      trait3Title: {
        vi: "Hút Máu / HP Drain (Chiến đấu)",
        en: "HP Drain / Lifesteal (Combat)",
      },
      maxBonusLabel: {
        vi: "+20% Hút Máu (Lv.30)",
        en: "+20% HP Drain (Lv.30)",
      },
      perLevelBonusLabel: {
        vi: "+0.67% mỗi cấp",
        en: "+0.67% per level",
      },
      strategicNote: {
        vi: "Hyper-Carry Đội 1 Liên Minh: Ưu tiên tối đa Ô 1 (+90% ATK) và Ô 3 (+20% Hút Máu).",
        en: "League Hyper-Carry: Prioritize maxing Slot 1 (+90% ATK) and Slot 3 (+20% HP Drain).",
      },
    },
    "hero-pyromancer": {
      category: "combat",
      trait3Title: {
        vi: "Hút Máu / HP Drain (Chiến đấu)",
        en: "HP Drain / Lifesteal (Combat)",
      },
      maxBonusLabel: {
        vi: "+20% Hút Máu (Lv.30)",
        en: "+20% HP Drain (Lv.30)",
      },
      perLevelBonusLabel: {
        vi: "+0.67% mỗi cấp",
        en: "+0.67% per level",
      },
      strategicNote: {
        vi: "Chủ lực phép thuật Liên Minh: Tận dụng mảnh Quán Rượu để nâng kịch trần 30/30 cả 4 ô.",
        en: "League AoE Carry: Use Tavern named shards to max 30/30 across all 4 slots.",
      },
    },
    "hero-bishop": {
      category: "combat",
      trait3Title: {
        vi: "Hút Máu / HP Drain (Chiến đấu)",
        en: "HP Drain / Lifesteal (Combat)",
      },
      maxBonusLabel: {
        vi: "+20% Hút Máu (Lv.30)",
        en: "+20% HP Drain (Lv.30)",
      },
      perLevelBonusLabel: {
        vi: "+0.67% mỗi cấp",
        en: "+0.67% per level",
      },
      strategicNote: {
        vi: "Tướng Đỏ Liên Minh: Nâng 4 ô theo lộ trình cụm 5 cấp cho Đội hình chính.",
        en: "League Mythic: Upgrade all 4 slots in 5-level blocks for Main Queue.",
      },
    },
    "hero-swordmaster": {
      category: "combat",
      trait3Title: {
        vi: "Hút Máu / HP Drain (Chiến đấu)",
        en: "HP Drain / Lifesteal (Combat)",
      },
      maxBonusLabel: {
        vi: "+20% Hút Máu (Lv.30)",
        en: "+20% HP Drain (Lv.30)",
      },
      perLevelBonusLabel: {
        vi: "+0.67% mỗi cấp",
        en: "+0.67% per level",
      },
      strategicNote: {
        vi: "Đấu sĩ tiền tuyến Bộ Tộc: Hút máu giúp duy trì khả năng sống sót khi áp sát.",
        en: "Horde Frontline Bruiser: HP Drain sustains frontline brawling.",
      },
    },
    "hero-wanderer": {
      category: "combat",
      trait3Title: {
        vi: "Hút Máu / HP Drain (Chiến đấu)",
        en: "HP Drain / Lifesteal (Combat)",
      },
      maxBonusLabel: {
        vi: "+20% Hút Máu (Lv.30)",
        en: "+20% HP Drain (Lv.30)",
      },
      perLevelBonusLabel: {
        vi: "+0.67% mỗi cấp",
        en: "+0.67% per level",
      },
      strategicNote: {
        vi: "Chỉ nâng khi trực tiếp sử dụng trong đội hình chiến đấu.",
        en: "Only upgrade if actively deployed in your combat queue.",
      },
    },
    "hero-rose-princess": {
      category: "combat",
      trait3Title: {
        vi: "Kháng Chí Mạng / Critical Resistance (Chiến đấu)",
        en: "Critical Resistance (Combat)",
      },
      maxBonusLabel: {
        vi: "+30% Kháng Chí Mạng (Lv.30)",
        en: "+30% Critical Resistance (Lv.30)",
      },
      perLevelBonusLabel: {
        vi: "+1.00% mỗi cấp",
        en: "+1.00% per level",
      },
      strategicNote: {
        vi: "Tanker Đỏ Liên Minh: Kháng chí mạng +30% kết hợp Ô 4 (+90% HP) tạo lá chắn bất tử.",
        en: "League Mythic Tank: +30% Crit Resistance paired with Slot 4 (+90% HP) builds an unbreakable frontline.",
      },
    },
    "hero-witch": {
      category: "combat",
      trait3Title: {
        vi: "Kháng Chí Mạng / Critical Resistance (Chiến đấu)",
        en: "Critical Resistance (Combat)",
      },
      maxBonusLabel: {
        vi: "+30% Kháng Chí Mạng (Lv.30)",
        en: "+30% Critical Resistance (Lv.30)",
      },
      perLevelBonusLabel: {
        vi: "+1.00% mỗi cấp",
        en: "+1.00% per level",
      },
      strategicNote: {
        vi: "Healer Đỏ Bộ Tộc: Tăng sức chống chịu trước sát thủ và sát thương diện rộng.",
        en: "Horde Mythic Healer: Prevents backline one-shots from enemy crits.",
      },
    },
    "hero-monk": {
      category: "combat",
      trait3Title: {
        vi: "Kháng Chí Mạng / Critical Resistance (Chiến đấu)",
        en: "Critical Resistance (Combat)",
      },
      maxBonusLabel: {
        vi: "+30% Kháng Chí Mạng (Lv.30)",
        en: "+30% Critical Resistance (Lv.30)",
      },
      perLevelBonusLabel: {
        vi: "+1.00% mỗi cấp",
        en: "+1.00% per level",
      },
      strategicNote: {
        vi: "Trụ cột chống chịu Thiên Nhiên: Nâng đủ 4 ô theo cụm 5 cấp.",
        en: "Nature Frontline Pillar: Upgrade all 4 slots in 5-level blocks.",
      },
    },
    "hero-petalis": {
      category: "combat",
      trait3Title: {
        vi: "Kháng Chí Mạng / Critical Resistance (Chiến đấu)",
        en: "Critical Resistance (Combat)",
      },
      maxBonusLabel: {
        vi: "+30% Kháng Chí Mạng (Lv.30)",
        en: "+30% Critical Resistance (Lv.30)",
      },
      perLevelBonusLabel: {
        vi: "+1.00% mỗi cấp",
        en: "+1.00% per level",
      },
      strategicNote: {
        vi: "Tướng Đỏ Thiên Nhiên: Bảo vệ hàng sau khỏi các đòn bạo kích.",
        en: "Nature Mythic: Shields backline against critical strikes.",
      },
    },
    "hero-artificer": {
      category: "combat",
      trait3Title: {
        vi: "Kháng Chí Mạng / Critical Resistance (Chiến đấu)",
        en: "Critical Resistance (Combat)",
      },
      maxBonusLabel: {
        vi: "+30% Kháng Chí Mạng (Lv.30)",
        en: "+30% Critical Resistance (Lv.30)",
      },
      perLevelBonusLabel: {
        vi: "+1.00% mỗi cấp",
        en: "+1.00% per level",
      },
      strategicNote: {
        vi: "Siêu Hỗ Trợ Đỏ Liên Minh: Giữ sống sót lâu dài để duy trì bùa lợi vũ khí.",
        en: "League Mythic Hyper-Support: Maximizes survivability to maintain weapon buffs.",
      },
    },
    "hero-soulmancer": {
      category: "combat",
      trait3Title: {
        vi: "Kháng Chí Mạng / Critical Resistance (Chiến đấu)",
        en: "Critical Resistance (Combat)",
      },
      maxBonusLabel: {
        vi: "+30% Kháng Chí Mạng (Lv.30)",
        en: "+30% Critical Resistance (Lv.30)",
      },
      perLevelBonusLabel: {
        vi: "+1.00% mỗi cấp",
        en: "+1.00% per level",
      },
      strategicNote: {
        vi: "Hỗ trợ chia sẻ sát thương Bộ Tộc: Cần cả Ô 3 (+30% Kháng Crit) và Ô 4 (+90% HP).",
        en: "Horde Damage-Link Support: Needs both Slot 3 (+30% Crit Res) and Slot 4 (+90% HP).",
      },
    },
    "hero-shadow-priest": {
      category: "combat",
      trait3Title: {
        vi: "Kháng Chí Mạng / Critical Resistance (Chiến đấu)",
        en: "Critical Resistance (Combat)",
      },
      maxBonusLabel: {
        vi: "+30% Kháng Chí Mạng (Lv.30)",
        en: "+30% Critical Resistance (Lv.30)",
      },
      perLevelBonusLabel: {
        vi: "+1.00% mỗi cấp",
        en: "+1.00% per level",
      },
      strategicNote: {
        vi: "Tướng Đỏ Hỗ Trợ: Tăng độ bền bỉ trong giao tranh kéo dài.",
        en: "Mythic Support: Enhances durability in prolonged fights.",
      },
    },
    "hero-storm-oracle": {
      category: "combat",
      trait3Title: {
        vi: "Kháng Chí Mạng / Critical Resistance (Chiến đấu)",
        en: "Critical Resistance (Combat)",
      },
      maxBonusLabel: {
        vi: "+30% Kháng Chí Mạng (Lv.30)",
        en: "+30% Critical Resistance (Lv.30)",
      },
      perLevelBonusLabel: {
        vi: "+1.00% mỗi cấp",
        en: "+1.00% per level",
      },
      strategicNote: {
        vi: "Tướng Vàng Liên Minh: Tăng khả năng tự bảo vệ trước sát thương bạo kích.",
        en: "League Legendary: Improves resilience against critical damage.",
      },
    },
    "hero-astrologer": {
      category: "combat",
      trait3Title: {
        vi: "Khuếch Đại Sát Thương Kỹ Năng (Chiến đấu)",
        en: "Amplify Skill Damage (Combat)",
      },
      maxBonusLabel: {
        vi: "+50% Sát Thương Kỹ Năng (Lv.30)",
        en: "+50% Amplify Skill Damage (Lv.30)",
      },
      perLevelBonusLabel: {
        vi: "+1.67% mỗi cấp",
        en: "+1.67% per level",
      },
      strategicNote: {
        vi: "Pháp sư dồn sát thương đơn mục tiêu Liên Minh: Tối ưu hóa sát thương kỹ năng.",
        en: "League Single-Target Burst Mage: Maximizes skill burst output.",
      },
    },
    "hero-pixie": {
      category: "combat",
      trait3Title: {
        vi: "Khuếch Đại Sát Thương Kỹ Năng (Chiến đấu)",
        en: "Amplify Skill Damage (Combat)",
      },
      maxBonusLabel: {
        vi: "+50% Sát Thương Kỹ Năng (Lv.30)",
        en: "+50% Amplify Skill Damage (Lv.30)",
      },
      perLevelBonusLabel: {
        vi: "+1.67% mỗi cấp",
        en: "+1.67% per level",
      },
      strategicNote: {
        vi: "Pháp sư chủ lực Thiên Nhiên: Kết hợp Ô 1 (+90% ATK) và Ô 3 (+50% Skill DMG).",
        en: "Core Nature Carry: Combines Slot 1 (+90% ATK) with Slot 3 (+50% Skill DMG).",
      },
    },
    "hero-forest-maiden": {
      category: "combat",
      trait3Title: {
        vi: "Khuếch Đại Sát Thương Kỹ Năng (Chiến đấu)",
        en: "Amplify Skill Damage (Combat)",
      },
      maxBonusLabel: {
        vi: "+50% Sát Thương Kỹ Năng (Lv.30)",
        en: "+50% Amplify Skill Damage (Lv.30)",
      },
      perLevelBonusLabel: {
        vi: "+1.67% mỗi cấp",
        en: "+1.67% per level",
      },
      strategicNote: {
        vi: "Hỗ trợ triệu hồi Thiên Nhiên: Gia tăng sát thương kỹ năng diện rộng.",
        en: "Nature Summon Support: Boosts AoE skill damage.",
      },
    },
    "hero-windwalker": {
      category: "combat",
      trait3Title: {
        vi: "Khuếch Đại Sát Thương Kỹ Năng (Chiến đấu)",
        en: "Amplify Skill Damage (Combat)",
      },
      maxBonusLabel: {
        vi: "+50% Sát Thương Kỹ Năng (Lv.30)",
        en: "+50% Amplify Skill Damage (Lv.30)",
      },
      perLevelBonusLabel: {
        vi: "+1.67% mỗi cấp",
        en: "+1.67% per level",
      },
      strategicNote: {
        vi: "Sát thủ Thiên Nhiên: Chỉ nâng khi dùng trong đội hình chiến đấu.",
        en: "Nature Assassin: Only upgrade when deployed in combat lineup.",
      },
    },
    "hero-adjudicator": {
      category: "combat",
      trait3Title: {
        vi: "Tỷ Lệ Đỡ Đòn / Block (Chiến đấu)",
        en: "Block Rate (Combat)",
      },
      maxBonusLabel: {
        vi: "+30% Tỷ Lệ Đỡ Đòn (Lv.30)",
        en: "+30% Block Rate (Lv.30)",
      },
      perLevelBonusLabel: {
        vi: "+1.00% mỗi cấp",
        en: "+1.00% per level",
      },
      strategicNote: {
        vi: "Main Tank Liên Minh: Đỡ đòn +30% giúp triệt tiêu sát thương vật lý tuyến đầu.",
        en: "League Main Tank: +30% Block Rate heavily mitigates frontline physical damage.",
      },
    },
    "hero-barbarian": {
      category: "combat",
      trait3Title: {
        vi: "Tỷ Lệ Đỡ Đòn / Block (Chiến đấu)",
        en: "Block Rate (Combat)",
      },
      maxBonusLabel: {
        vi: "+30% Tỷ Lệ Đỡ Đòn (Lv.30)",
        en: "+30% Block Rate (Lv.30)",
      },
      perLevelBonusLabel: {
        vi: "+1.00% mỗi cấp",
        en: "+1.00% per level",
      },
      strategicNote: {
        vi: "Tanker Bộ Tộc: Tăng tỷ lệ đỡ đòn trực diện.",
        en: "Horde Tank: Increases frontline block chance.",
      },
    },
    "hero-wilderness-hunter": {
      category: "combat",
      trait3Title: {
        vi: "Sát Thương Chí Mạng / Critical Damage (Chiến đấu)",
        en: "Critical Damage (Combat)",
      },
      maxBonusLabel: {
        vi: "+60% Sát Thương Chí Mạng (Lv.30)",
        en: "+60% Critical Damage (Lv.30)",
      },
      perLevelBonusLabel: {
        vi: "+2.00% mỗi cấp",
        en: "+2.00% per level",
      },
      strategicNote: {
        vi: "Xạ thủ Bộ Tộc: Khuếch đại mạnh sát thương các đòn bắn chí mạng.",
        en: "Horde Marksman: Massively amplifies critical hit burst.",
      },
    },
    "hero-nun": {
      category: "combat",
      trait3Title: {
        vi: "Hiệu Quả Hồi Máu / Healing Rate (Chiến đấu)",
        en: "Healing Rate (Combat)",
      },
      maxBonusLabel: {
        vi: "+30% Hiệu Quả Hồi Máu (Lv.30)",
        en: "+30% Healing Rate (Lv.30)",
      },
      perLevelBonusLabel: {
        vi: "+1.00% mỗi cấp",
        en: "+1.00% per level",
      },
      strategicNote: {
        vi: "Healer trụ cột Liên Minh: Tăng trực tiếp lượng máu hồi phục cho toàn đội.",
        en: "Core League Healer: Directly boosts team-wide healing output.",
      },
    },
    "hero-druid": {
      category: "combat",
      trait3Title: {
        vi: "Hiệu Quả Hồi Máu / Healing Rate (Chiến đấu)",
        en: "Healing Rate (Combat)",
      },
      maxBonusLabel: {
        vi: "+30% Hiệu Quả Hồi Máu (Lv.30)",
        en: "+30% Healing Rate (Lv.30)",
      },
      perLevelBonusLabel: {
        vi: "+1.00% mỗi cấp",
        en: "+1.00% per level",
      },
      strategicNote: {
        vi: "Healer Thiên Nhiên: Tăng hiệu quả hồi phục sinh lực trong giao tranh.",
        en: "Nature Healer: Enhances combat healing efficiency.",
      },
    },
    "hero-wukong": {
      category: "combat",
      trait3Title: {
        vi: "Sát Thương Chí Mạng / Critical Damage (Chiến đấu)",
        en: "Critical Damage (Combat)",
      },
      maxBonusLabel: {
        vi: "+60% Sát Thương Chí Mạng (Lv.30)",
        en: "+60% Critical Damage (Lv.30)",
      },
      perLevelBonusLabel: {
        vi: "+2.00% mỗi cấp",
        en: "+2.00% per level",
      },
      strategicNote: {
        vi: "Hyper-Carry Đỏ Bộ Tộc (Ngộ Không): Mở khóa đủ 4 ô và ưu tiên kịch trần Ô 1 (+90% ATK) & Ô 3 (+60% Crit DMG).",
        en: "Horde Mythic Hyper-Carry (Wukong): Unlock all 4 slots and prioritize maxing Slot 1 (+90% ATK) & Slot 3 (+60% Crit DMG).",
      },
    },
    "hero-ne-zha": {
      category: "combat",
      trait3Title: {
        vi: "Khuếch Đại Sát Thương Kỹ Năng (Chiến đấu)",
        en: "Amplify Skill Damage (Combat)",
      },
      maxBonusLabel: {
        vi: "+50% Sát Thương Kỹ Năng (Lv.30)",
        en: "+50% Amplify Skill Damage (Lv.30)",
      },
      perLevelBonusLabel: {
        vi: "+1.67% mỗi cấp",
        en: "+1.67% per level",
      },
      strategicNote: {
        vi: "Hyper-Carry Đỏ Thiên Nhiên (Na Tra): Mở khóa đủ 4 ô và nâng đồng đều theo cụm 5 cấp lên 30/30.",
        en: "Nature Mythic Hyper-Carry (Ne Zha): Unlock all 4 slots and upgrade in 5-level blocks up to 30/30.",
      },
    },
    "hero-boar": {
      category: "combat",
      trait3Title: {
        vi: "Tỷ Lệ Đỡ Đòn / Block (Chiến đấu)",
        en: "Block Rate (Combat)",
      },
      maxBonusLabel: {
        vi: "+30% Tỷ Lệ Đỡ Đòn (Lv.30)",
        en: "+30% Block Rate (Lv.30)",
      },
      perLevelBonusLabel: {
        vi: "+1.00% mỗi cấp",
        en: "+1.00% per level",
      },
      strategicNote: {
        vi: "Tanker Vàng Bộ Tộc: Chỉ nâng bằng mảnh riêng khi sử dụng trực tiếp trong đội hình.",
        en: "Horde Legendary Tank: Only upgrade with named shards if deployed in combat lineup.",
      },
    },
    "hero-inventor": {
      category: "economy_24_7",
      trait3Title: {
        vi: "Tốc độ Chế tạo & Nội chính Lò Rèn (Có hiệu lực 24/7)",
        en: "Blacksmith & Crafting Efficiency (Active 24/7)",
      },
      maxBonusLabel: {
        vi: "+30% Hiệu suất Nội chính Lò Rèn (Lv.30)",
        en: "+30% Blacksmith Economy Efficiency (Lv.30)",
      },
      perLevelBonusLabel: {
        vi: "+1.00% mỗi cấp",
        en: "+1.00% per level",
      },
      strategicNote: {
        vi: "Tướng Tím Kinh tế dự bị: Chỉ nâng phễu Ô 1 Lv.15 + Ô 3 Lv.30 bằng mảnh dư, tuyệt đối không mở Ô 4.",
        en: "Benched Economic Epic: Upgrade Slot 1 Lv.15 + Slot 3 Lv.30 using spare shards; keep Slot 4 locked.",
      },
    },
    // --- 6 TƯỚNG LAM (RARE — KINH TẾ / THU THẬP CƠ BẢN) ---
    "hero-guardsman": {
      category: "economy_24_7",
      trait3Title: {
        vi: "Thiên Phú Đồn Trú & Thu Thập Cơ Bản (Tướng Lam)",
        en: "Base Garrison & Gathering Trait (Rare Hero)",
      },
      maxBonusLabel: {
        vi: "+20% Chỉ số Thu thập / Đồn trú Cơ bản (Lv.30)",
        en: "+20% Base Gathering / Garrison Stat (Lv.30)",
      },
      perLevelBonusLabel: {
        vi: "+0.67% mỗi cấp",
        en: "+0.67% per level",
      },
      strategicNote: {
        vi: "Tướng Lam dự bị: Chỉ dùng Mảnh Lam dư thừa để hoàn tất cây sao mở Tiệm Đổi Quà, tuyệt đối không mở Ô 4.",
        en: "Benched Rare Hero: Use excess Blue Shards only; never spend 2,000 Diamonds unlocking Slot 4.",
      },
    },
    "hero-crossbowman": {
      category: "economy_24_7",
      trait3Title: {
        vi: "Thiên Phú Thu Thập Tài Nguyên Cơ Bản (Tướng Lam)",
        en: "Base Resource Gathering Trait (Rare Hero)",
      },
      maxBonusLabel: {
        vi: "+20% Tốc độ Thu thập Cơ bản (Lv.30)",
        en: "+20% Base Gathering Speed (Lv.30)",
      },
      perLevelBonusLabel: {
        vi: "+0.67% mỗi cấp",
        en: "+0.67% per level",
      },
      strategicNote: {
        vi: "Tướng Lam dự bị: Chỉ dùng Mảnh Lam dư thừa từ Quán Rượu, tuyệt đối không mở Ô 4.",
        en: "Benched Rare Hero: Use excess Tavern Blue Shards only; never unlock Slot 4.",
      },
    },
    "hero-wizard": {
      category: "economy_24_7",
      trait3Title: {
        vi: "Thiên Phú Nội Chính Cơ Bản (Tướng Lam)",
        en: "Base Economy Trait (Rare Hero)",
      },
      maxBonusLabel: {
        vi: "+20% Chỉ số Nội chính Cơ bản (Lv.30)",
        en: "+20% Base Economy Stat (Lv.30)",
      },
      perLevelBonusLabel: {
        vi: "+0.67% mỗi cấp",
        en: "+0.67% per level",
      },
      strategicNote: {
        vi: "Tướng Lam dự bị: Chỉ dùng Mảnh Lam dư thừa từ Quán Rượu, tuyệt đối không mở Ô 4.",
        en: "Benched Rare Hero: Use excess Tavern Blue Shards only; never unlock Slot 4.",
      },
    },
    "hero-archer": {
      category: "economy_24_7",
      trait3Title: {
        vi: "Thiên Phú Hồi Phục & Nội Chính Cơ Bản (Tướng Lam)",
        en: "Base Recovery & Economy Trait (Rare Hero)",
      },
      maxBonusLabel: {
        vi: "+20% Chỉ số Hỗ trợ Nội chính Cơ bản (Lv.30)",
        en: "+20% Base Support Economy Stat (Lv.30)",
      },
      perLevelBonusLabel: {
        vi: "+0.67% mỗi cấp",
        en: "+0.67% per level",
      },
      strategicNote: {
        vi: "Tướng Lam dự bị: Chỉ dùng Mảnh Lam dư thừa từ Quán Rượu, tuyệt đối không mở Ô 4.",
        en: "Benched Rare Hero: Use excess Tavern Blue Shards only; never unlock Slot 4.",
      },
    },
    "hero-grunt": {
      category: "economy_24_7",
      trait3Title: {
        vi: "Thiên Phú Thu Thập Khoáng Sản Cơ Bản (Tướng Lam)",
        en: "Base Resource Mining Trait (Rare Hero)",
      },
      maxBonusLabel: {
        vi: "+20% Tốc độ Thu thập Cơ bản (Lv.30)",
        en: "+20% Base Gathering Speed (Lv.30)",
      },
      perLevelBonusLabel: {
        vi: "+0.67% mỗi cấp",
        en: "+0.67% per level",
      },
      strategicNote: {
        vi: "Tướng Lam dự bị: Chỉ dùng Mảnh Lam dư thừa từ Quán Rượu, tuyệt đối không mở Ô 4.",
        en: "Benched Rare Hero: Use excess Tavern Blue Shards only; never unlock Slot 4.",
      },
    },
    "hero-scout": {
      category: "economy_24_7",
      trait3Title: {
        vi: "Thiên Phú Trinh Sát & Hành Quân Cơ Bản (Tướng Lam)",
        en: "Base Scouting & March Trait (Rare Hero)",
      },
      maxBonusLabel: {
        vi: "+20% Tốc độ Hành quân Thu thập Cơ bản (Lv.30)",
        en: "+20% Base Gathering March Speed (Lv.30)",
      },
      perLevelBonusLabel: {
        vi: "+0.67% mỗi cấp",
        en: "+0.67% per level",
      },
      strategicNote: {
        vi: "Tướng Lam dự bị: Chỉ dùng Mảnh Lam dư thừa từ Quán Rượu, tuyệt đối không mở Ô 4.",
        en: "Benched Rare Hero: Use excess Tavern Blue Shards only; never unlock Slot 4.",
      },
    },
  };

const DEFAULT_COMBAT_PROFILE: HeroTrait3Profile = {
  category: "combat",
  trait3Title: {
    vi: "Thiên Phú Chiến Đấu Đặc Thù (Ô 3)",
    en: "Unique Combat Trait (Slot 3)",
  },
  maxBonusLabel: {
    vi: "+30% – +50% Chỉ số Chiến đấu Độc quyền (Lv.30)",
    en: "+30% – +50% Exclusive Combat Stat (Lv.30)",
  },
  perLevelBonusLabel: {
    vi: "+1.00% – +1.67% mỗi cấp",
    en: "+1.00% – +1.67% per level",
  },
  strategicNote: {
    vi: "Tướng Đội hình chính: Nâng tuần tự cả 4 ô theo cụm 5 cấp (5/5 ➔ 10/10 ➔ ... ➔ 30/30 = 1,200 Mảnh).",
    en: "Main Queue Hero: Upgrade all 4 slots sequentially in 5-level blocks up to 30/30 (1,200 Shards).",
  },
};

const DEFAULT_RARE_PROFILE: HeroTrait3Profile = {
  category: "economy_24_7",
  trait3Title: {
    vi: "Thiên Phú Thu Thập / Nội Chính Cơ Bản (Ô 3)",
    en: "Base Gathering / Economy Trait (Slot 3)",
  },
  maxBonusLabel: {
    vi: "+20% – +30% Chỉ số Thu thập (Lv.30)",
    en: "+20% – +30% Gathering Stat (Lv.30)",
  },
  perLevelBonusLabel: {
    vi: "+1.00% mỗi cấp",
    en: "+1.00% per level",
  },
  strategicNote: {
    vi: "Tướng Lam dự bị: Chỉ dùng Mảnh Lam dư thừa, tuyệt đối không tốn 2,000 Kim Cương mở Ô 4.",
    en: "Benched Rare Hero: Use surplus Blue Shards only; never spend 2,000 Diamonds unlocking Slot 4.",
  },
};

export function getHeroTraitProfile(
  heroId: string,
  rarity: HeroStarRarity
): HeroTrait3Profile {
  const matched = HERO_TRAIT_3_PROFILES[heroId];
  if (matched) return matched;
  if (rarity === "rare" || rarity === "epic") return DEFAULT_RARE_PROFILE;
  return DEFAULT_COMBAT_PROFILE;
}

export function getTraitHeroesByRarity(
  rarity: HeroStarRarity
): readonly TraitHeroOption[] {
  const defaultId = TRAIT_RARITY_CONFIGS[rarity].defaultHeroId;
  const entries = Object.values(GAME_ASSET_REGISTRY).filter(
    (entry) => entry.category === "heroes" && entry.rarity === rarity
  );

  const mapped: TraitHeroOption[] = entries.map((entry) => ({
    id: entry.id,
    nameVi: entry.inGameNameVi || entry.nameVi,
    nameEn: entry.inGameNameEn || entry.nameEn,
    iconPath: entry.iconPath,
    rarity,
    faction: entry.faction ?? "neutral",
    traitProfile: getHeroTraitProfile(entry.id, rarity),
  }));

  mapped.sort((a, b) => {
    if (a.id === defaultId) return -1;
    if (b.id === defaultId) return 1;
    // Với Tướng Tím / Vàng, ưu tiên hiển thị nhóm Kinh tế 24/7 hoặc có hồ sơ riêng lên trước
    if (rarity === "epic" || rarity === "legendary") {
      const aEcon = a.traitProfile.category === "economy_24_7";
      const bEcon = b.traitProfile.category === "economy_24_7";
      if (aEcon !== bEcon) return aEcon ? -1 : 1;
    }
    return a.nameEn.localeCompare(b.nameEn);
  });

  return mapped;
}

export function clampTraitLevel(level: number): number {
  if (!Number.isFinite(level)) return 0;
  return Math.max(0, Math.min(MAX_TRAIT_SLOT_LEVEL, Math.round(level)));
}

export function sanitizeTraitLevelsTuple(
  levels: TraitLevelsTuple
): TraitLevelsTuple {
  return [
    clampTraitLevel(levels[0]),
    clampTraitLevel(levels[1]),
    clampTraitLevel(levels[2]),
    clampTraitLevel(levels[3]),
  ];
}

export function calculateHeroTraitsUpgrade(
  input: HeroTraitsCalculationInput
): HeroTraitsCalculationResult {
  const fromLevels = sanitizeTraitLevelsTuple(input.fromLevels);
  const toLevels = sanitizeTraitLevelsTuple(input.toLevels);

  const ownedShards =
    Number.isFinite(input.ownedShards) && (input.ownedShards ?? 0) > 0
      ? Math.floor(input.ownedShards!)
      : 0;
  const ownedDiamonds =
    Number.isFinite(input.ownedDiamonds) && (input.ownedDiamonds ?? 0) > 0
      ? Math.floor(input.ownedDiamonds!)
      : 0;
  const includeTraitSwap = Boolean(input.includeTraitSwap);

  const rarityCfg = TRAIT_RARITY_CONFIGS[input.rarity];
  const heroProfile = getHeroTraitProfile(input.heroId, input.rarity);

  const alreadyInvestedShards =
    (fromLevels[0] + fromLevels[1] + fromLevels[2] + fromLevels[3]) *
    SHARDS_PER_TRAIT_LEVEL;
  const targetCumulativeShards =
    (toLevels[0] + toLevels[1] + toLevels[2] + toLevels[3]) *
    SHARDS_PER_TRAIT_LEVEL;

  const hasDecreasedSlot =
    toLevels[0] < fromLevels[0] ||
    toLevels[1] < fromLevels[1] ||
    toLevels[2] < fromLevels[2] ||
    toLevels[3] < fromLevels[3];
  const hasZeroProgress =
    toLevels[0] === fromLevels[0] &&
    toLevels[1] === fromLevels[1] &&
    toLevels[2] === fromLevels[2] &&
    toLevels[3] === fromLevels[3] &&
    !includeTraitSwap;

  const isInvalidRange = hasDecreasedSlot || hasZeroProgress;

  const slot1CurrentAtkBonusPercent = fromLevels[0] * 3;
  const slot1TargetAtkBonusPercent = toLevels[0] * 3;
  const slot4CurrentHpBonusPercent = fromLevels[3] * 3;
  const slot4TargetHpBonusPercent = toLevels[3] * 3;

  if (isInvalidRange) {
    return {
      rarity: input.rarity,
      heroId: input.heroId,
      heroProfile,
      fromLevels,
      toLevels,
      isInvalidRange: true,
      alreadyInvestedShards,
      targetCumulativeShards,
      requiredShards: 0,
      ownedShards,
      missingShards: 0,
      surplusShards: ownedShards,
      shardCompletionPercent: 100,
      requiresSlot4UnlockDiamond: false,
      includeTraitSwap,
      requiredDiamonds: 0,
      ownedDiamonds,
      missingDiamonds: 0,
      surplusDiamonds: ownedDiamonds,
      isSlot4EconomyTrapWarning: false,
      hasPrerequisiteBridgeWarning: false,
      starUnlockPrerequisiteShards: rarityCfg.starUnlockPrerequisiteShards,
      slot1CurrentAtkBonusPercent,
      slot1TargetAtkBonusPercent,
      slot4CurrentHpBonusPercent,
      slot4TargetHpBonusPercent,
      universalShardMaterial: rarityCfg.universalShard,
      diamondMaterial: rarityCfg.diamondMaterial,
      slotBreakdown: [],
    };
  }

  // Ô 4 tốn 2,000 Kim Cương để mở khóa khi bắt đầu nâng từ Lv.0 lên >= Lv.1
  const requiresSlot4UnlockDiamond = fromLevels[3] === 0 && toLevels[3] > 0;
  const slot4UnlockCost = requiresSlot4UnlockDiamond
    ? DIAMOND_COST_SLOT_4_UNLOCK
    : 0;
  const traitSwapCost = includeTraitSwap ? DIAMOND_COST_TRAIT_SWAP : 0;
  const requiredDiamonds = slot4UnlockCost + traitSwapCost;

  // Cảnh báo Bẫy 2,000 Kim Cương nếu tướng thuộc nhóm Kinh tế 24/7 dự bị nhưng người chơi lại mở/nâng Ô 4 (> 0)
  const isSlot4EconomyTrapWarning =
    heroProfile.category === "economy_24_7" && toLevels[3] > 0;
  const hasPrerequisiteBridgeWarning = toLevels[2] > 0 && toLevels[0] < 15;

  const slotTitles: ReadonlyArray<Record<CalculatorLocale, string>> = [
    {
      vi: "Ô 1: Tấn công Anh hùng (+3%/cấp ➔ +90% ATK)",
      en: "Slot 1: Hero Attack (+3%/lv to +90% ATK)",
    },
    {
      vi: "Ô 2: Máu / Chỉ số Binh lính hộ tống",
      en: "Slot 2: Escort Soldier HP / Stats",
    },
    {
      vi: `Ô 3: ${heroProfile.trait3Title.vi}`,
      en: `Slot 3: ${heroProfile.trait3Title.en}`,
    },
    {
      vi: "Ô 4: HP Anh hùng (+3%/cấp ➔ +90% HP • Mở khóa 2,000 KC)",
      en: "Slot 4: Hero HP (+3%/lv to +90% HP • 2,000 Diamond Unlock)",
    },
  ];

  const slotEffectSummaries: ReadonlyArray<Record<CalculatorLocale, string>> = [
    {
      vi: `+${slot1CurrentAtkBonusPercent}% ➔ +${slot1TargetAtkBonusPercent}% ATK Anh hùng`,
      en: `+${slot1CurrentAtkBonusPercent}% to +${slot1TargetAtkBonusPercent}% Hero ATK`,
    },
    {
      vi: `Lv.${fromLevels[1]} ➔ Lv.${toLevels[1]} Chỉ số Binh lính`,
      en: `Lv.${fromLevels[1]} to Lv.${toLevels[1]} Soldier Stats`,
    },
    {
      vi: heroProfile.maxBonusLabel.vi,
      en: heroProfile.maxBonusLabel.en,
    },
    {
      vi: `+${slot4CurrentHpBonusPercent}% ➔ +${slot4TargetHpBonusPercent}% HP Anh hùng`,
      en: `+${slot4CurrentHpBonusPercent}% to +${slot4TargetHpBonusPercent}% Hero HP`,
    },
  ];

  const slotBreakdown: TraitSlotBreakdownItem[] = (
    [0, 1, 2, 3] as const
  ).map((idx) => {
    const levelsGained = Math.max(0, toLevels[idx] - fromLevels[idx]);
    return {
      slotNumber: (idx + 1) as 1 | 2 | 3 | 4,
      slotTitle: slotTitles[idx],
      slotEffectSummary: slotEffectSummaries[idx],
      fromLevel: fromLevels[idx],
      toLevel: toLevels[idx],
      levelsGained,
      requiredShards: levelsGained * SHARDS_PER_TRAIT_LEVEL,
      diamondUnlockCost: idx === 3 ? slot4UnlockCost : 0,
    };
  });

  const requiredShards = slotBreakdown.reduce(
    (sum, item) => sum + item.requiredShards,
    0
  );
  const missingShards = Math.max(0, requiredShards - ownedShards);
  const surplusShards = Math.max(0, ownedShards - requiredShards);
  const shardCompletionPercent =
    requiredShards === 0
      ? 100
      : Math.min(100, Math.round((ownedShards / requiredShards) * 100));

  const missingDiamonds = Math.max(0, requiredDiamonds - ownedDiamonds);
  const surplusDiamonds = Math.max(0, ownedDiamonds - requiredDiamonds);

  return {
    rarity: input.rarity,
    heroId: input.heroId,
    heroProfile,
    fromLevels,
    toLevels,
    isInvalidRange: false,
    alreadyInvestedShards,
    targetCumulativeShards,
    requiredShards,
    ownedShards,
    missingShards,
    surplusShards,
    shardCompletionPercent,
    requiresSlot4UnlockDiamond,
    includeTraitSwap,
    requiredDiamonds,
    ownedDiamonds,
    missingDiamonds,
    surplusDiamonds,
    isSlot4EconomyTrapWarning,
    hasPrerequisiteBridgeWarning,
    starUnlockPrerequisiteShards: rarityCfg.starUnlockPrerequisiteShards,
    slot1CurrentAtkBonusPercent,
    slot1TargetAtkBonusPercent,
    slot4CurrentHpBonusPercent,
    slot4TargetHpBonusPercent,
    universalShardMaterial: rarityCfg.universalShard,
    diamondMaterial: rarityCfg.diamondMaterial,
    slotBreakdown,
  };
}

import { CALCULATOR_MATERIALS } from "@/content/calculators/registry";
import type { CalculatorLocale } from "@/content/calculators/types";

export type TroopSkinRarity = "legendary" | "epic" | "rare";
export type TroopSkinFaction = "league" | "horde" | "nature" | "neutral";

export interface TroopSkinRarityMeta {
  readonly id: TroopSkinRarity;
  readonly nameVi: string;
  readonly nameEn: string;
  readonly shortNameVi: string;
  readonly shortNameEn: string;
  readonly costMultiplier: number; // 1.0 | 0.5 | 0.25
  readonly costPercentLabelVi: string;
  readonly costPercentLabelEn: string;
  readonly maxOwnedSoldierAtkPct: number;
  readonly maxOwnedSoldierHpPct: number;
  readonly maxEquippedSoldierAtkPct: number;
  readonly maxEquippedSoldierHpPct: number;
  readonly honorMedalsPerLevel: number; // 50,000 | 25,000 | 12,500
}

export interface TroopSkinCatalogEntry {
  readonly id: string;
  readonly nameVi: string;
  readonly nameEn: string;
  readonly rarity: TroopSkinRarity;
  readonly faction: TroopSkinFaction;
  readonly factionLabelVi: string;
  readonly factionLabelEn: string;
  readonly iconPath: string;
  readonly specialSkillMaxVi: string;
  readonly specialSkillMaxEn: string;
}

export interface TroopSkinStepRow {
  readonly fromLevel: number; // 1..49
  readonly toLevel: number; // 2..50
  readonly ssotNotation: string;
  readonly sublevels: number; // 1..10
  readonly legendaryMedalsPerSublevel: number;
  readonly legendaryMedalsFullLevel: number;
  readonly legendaryCumulativeMedals: number;
  readonly breakthroughCopiesRequired: number; // 0 | 1 | 2 | 3
  readonly starMilestone: number; // 0..6
}

export interface TroopSkinPointState {
  readonly level: number; // 1..50
  readonly sublevel: number; // 0 .. maxSublevels-1 (0 at Lv.50)
}

export interface TroopSkinStageBreakdown {
  readonly id: string;
  readonly labelVi: string;
  readonly labelEn: string;
  readonly fromLevel: number;
  readonly toLevel: number;
  readonly medalsRequired: number;
  readonly copiesRequired: number;
  readonly starMilestone: number;
}

export interface TroopSkinCalculationInput {
  readonly rarity: TroopSkinRarity;
  readonly skinId: string;
  readonly current: TroopSkinPointState;
  readonly target: TroopSkinPointState;
  readonly ownedMedals: number;
  readonly ownedCopies: number;
}

export interface TroopSkinCalculationResult {
  readonly rarityMeta: TroopSkinRarityMeta;
  readonly selectedSkin: TroopSkinCatalogEntry;
  readonly normalizedCurrent: TroopSkinPointState;
  readonly normalizedTarget: TroopSkinPointState;
  readonly effectiveStart: TroopSkinPointState;
  readonly effectiveEnd: TroopSkinPointState;
  readonly isReversed: boolean;
  readonly startCumulativeMedals: number;
  readonly endCumulativeMedals: number;
  readonly medalsNeeded: number;
  readonly medalsRemainingAfter: number;
  readonly medalsShortfall: number;
  readonly startCumulativeCopies: number;
  readonly endCumulativeCopies: number;
  readonly copiesNeeded: number;
  readonly copiesRemainingAfter: number;
  readonly copiesShortfall: number;
  readonly totalSublevelClicks: number;
  readonly startOwnedAtkPct: number;
  readonly endOwnedAtkPct: number;
  readonly gainedOwnedAtkPct: number;
  readonly startOwnedHpPct: number;
  readonly endOwnedHpPct: number;
  readonly gainedOwnedHpPct: number;
  readonly startEquippedAtkPct: number;
  readonly endEquippedAtkPct: number;
  readonly startEquippedHpPct: number;
  readonly endEquippedHpPct: number;
  readonly rarityComparison: Readonly<Record<TroopSkinRarity, number>>;
  readonly stageBreakdowns: readonly TroopSkinStageBreakdown[];
}

export const TROOP_SKIN_MIN_LEVEL = 1;
export const TROOP_SKIN_MAX_LEVEL = 50;
export const TROOP_SKIN_TOTAL_COPIES_TO_MAX = 13;

export const GLORY_MEDAL_MATERIAL = CALCULATOR_MATERIALS.gloryMedal;
export const TROOP_SKIN_UNIVERSAL_CHEST_ICON = "/images/items/chests/icon_30255.webp";

export const TROOP_SKIN_RARITY_ORDER: readonly TroopSkinRarity[] = [
  "legendary",
  "epic",
  "rare",
] as const;

export const TROOP_SKIN_RARITIES: Readonly<Record<TroopSkinRarity, TroopSkinRarityMeta>> = {
  legendary: {
    id: "legendary",
    nameVi: "Quân Trang Cam (Huyền Thoại)",
    nameEn: "Legendary Troop Skin",
    shortNameVi: "Cam (100%)",
    shortNameEn: "Legendary (100%)",
    costMultiplier: 1,
    costPercentLabelVi: "100% chi phí chuẩn",
    costPercentLabelEn: "100% baseline cost",
    maxOwnedSoldierAtkPct: 14.38,
    maxOwnedSoldierHpPct: 21.46,
    maxEquippedSoldierAtkPct: 28,
    maxEquippedSoldierHpPct: 56,
    honorMedalsPerLevel: 50_000,
  },
  epic: {
    id: "epic",
    nameVi: "Quân Trang Tím (Sử Thi)",
    nameEn: "Epic Troop Skin",
    shortNameVi: "Tím (50%)",
    shortNameEn: "Epic (50%)",
    costMultiplier: 0.5,
    costPercentLabelVi: "50% chi phí Cam",
    costPercentLabelEn: "50% of Legendary cost",
    maxOwnedSoldierAtkPct: 11.49,
    maxOwnedSoldierHpPct: 19.24,
    maxEquippedSoldierAtkPct: 21,
    maxEquippedSoldierHpPct: 42,
    honorMedalsPerLevel: 25_000,
  },
  rare: {
    id: "rare",
    nameVi: "Quân Trang Lam (Hiếm)",
    nameEn: "Rare Troop Skin",
    shortNameVi: "Lam (25%)",
    shortNameEn: "Rare (25%)",
    costMultiplier: 0.25,
    costPercentLabelVi: "25% chi phí Cam",
    costPercentLabelEn: "25% of Legendary cost",
    maxOwnedSoldierAtkPct: 6.45,
    maxOwnedSoldierHpPct: 14.49,
    maxEquippedSoldierAtkPct: 14,
    maxEquippedSoldierHpPct: 28,
    honorMedalsPerLevel: 12_500,
  },
} as const;

export const TROOP_SKIN_CATALOG: readonly TroopSkinCatalogEntry[] = [
  {
    id: "heavy-cavalry",
    nameVi: "Kỵ Binh Thiết Giáp",
    nameEn: "Heavy Cavalry",
    rarity: "legendary",
    faction: "league",
    factionLabelVi: "Liên Minh / Đa dụng",
    factionLabelEn: "League / Universal",
    iconPath: "/images/troops/skins-avatars/ArmsHead_10005_1.webp",
    specialSkillMaxVi: "+70% Tốc độ hành quân PvP • +11.2% Sát thương Công Thành",
    specialSkillMaxEn: "+70% PvP March Speed • +11.2% Castle Invasion DMG",
  },
  {
    id: "divine-spirit",
    nameVi: "Thần Linh Bộ Lạc",
    nameEn: "Divine Spirit",
    rarity: "legendary",
    faction: "horde",
    factionLabelVi: "Bộ Lạc",
    factionLabelEn: "Horde",
    iconPath: "/images/troops/skins-avatars/ArmsHead_10018_1.webp",
    specialSkillMaxVi: "+4.2% Sĩ khí • +16.8% HP Lính Bộ Lạc (Đội 6 tướng Bộ Lạc)",
    specialSkillMaxEn: "+4.2% Morale • +16.8% Horde Soldier HP (with 6 Horde heroes)",
  },
  {
    id: "desert-knight",
    nameVi: "Hiệp Sĩ Sa Mạc",
    nameEn: "Desert Knight",
    rarity: "legendary",
    faction: "league",
    factionLabelVi: "Liên Minh",
    factionLabelEn: "League",
    iconPath: "/images/troops/skins-avatars/ArmsHead_10017_1.webp",
    specialSkillMaxVi: "+4.2% Sĩ khí • +16.8% HP Lính Liên Minh (Đội 6 tướng Liên Minh)",
    specialSkillMaxEn: "+4.2% Morale • +16.8% League Soldier HP (with 6 League heroes)",
  },
  {
    id: "tree-spirit",
    nameVi: "Tinh Linh Cây",
    nameEn: "Tree Spirit",
    rarity: "legendary",
    faction: "nature",
    factionLabelVi: "Tự Nhiên",
    factionLabelEn: "Nature",
    iconPath: "/images/troops/skins-avatars/ArmsHead_10016_1.webp",
    specialSkillMaxVi: "+4.2% Sĩ khí • +16.8% HP Lính Tự Nhiên (Đội 6 tướng Tự Nhiên)",
    specialSkillMaxEn: "+4.2% Morale • +16.8% Nature Soldier HP (with 6 Nature heroes)",
  },
  {
    id: "brave-fighter",
    nameVi: "Chiến Binh Dũng Cảm",
    nameEn: "Brave Fighter",
    rarity: "legendary",
    faction: "horde",
    factionLabelVi: "Bộ Lạc",
    factionLabelEn: "Horde",
    iconPath: "/images/troops/skins-avatars/ArmsHead_10008_1.webp",
    specialSkillMaxVi: "-21% Hao hụt sĩ khí • +7 Giới hạn đội tiêu diệt liên tiếp",
    specialSkillMaxEn: "-21% Morale Loss • +7 Defeated Teams Limit",
  },
  {
    id: "skeleton-soldier",
    nameVi: "Chiến Binh Xương",
    nameEn: "Skeleton Soldier",
    rarity: "legendary",
    faction: "horde",
    factionLabelVi: "Bộ Lạc",
    factionLabelEn: "Horde",
    iconPath: "/images/troops/skins-avatars/ArmsHead_10009_1.webp",
    specialSkillMaxVi: "+7% ATK Lính cộng thêm • -14% Sĩ khí khởi đầu của Rally địch",
    specialSkillMaxEn: "+7% Extra Soldier ATK • -14% Enemy Rally Initial Morale",
  },
  {
    id: "honor-guard",
    nameVi: "Vệ Binh Danh Dự",
    nameEn: "Honor Guard",
    rarity: "legendary",
    faction: "league",
    factionLabelVi: "Liên Minh",
    factionLabelEn: "League",
    iconPath: "/images/troops/skins-avatars/ArmsHead_10003_1.webp",
    specialSkillMaxVi: "+14% Giảm sát thương nhận vào khi Thủ Thành",
    specialSkillMaxEn: "+14% DMG Reduction in Castle Defense",
  },
  {
    id: "siege-vehicle",
    nameVi: "Xe Công Thành",
    nameEn: "Siege Vehicle",
    rarity: "legendary",
    faction: "neutral",
    factionLabelVi: "Đa dụng",
    factionLabelEn: "Universal",
    iconPath: "/images/troops/skins-avatars/ArmsHead_10004_3.webp",
    specialSkillMaxVi: "+11.2% Sát thương Quái Di Tích/Ngai Vàng • +70% Diệt lính Thao Trường",
    specialSkillMaxEn: "+11.2% Ruin/Throne Monster DMG • +70% Training Ground Kill",
  },
  {
    id: "samurai",
    nameVi: "Võ Sĩ Samurai",
    nameEn: "Samurai",
    rarity: "epic",
    faction: "horde",
    factionLabelVi: "Bộ Lạc",
    factionLabelEn: "Horde",
    iconPath: "/images/troops/skins-avatars/ArmsHead_10006_1.webp",
    specialSkillMaxVi: "+49% ATK Lính khi Công Thành",
    specialSkillMaxEn: "+49% Soldier ATK in Castle Invasions",
  },
  {
    id: "bearskin-warrior",
    nameVi: "Chiến Binh Da Gấu",
    nameEn: "Bearskin Warrior",
    rarity: "epic",
    faction: "nature",
    factionLabelVi: "Tự Nhiên",
    factionLabelEn: "Nature",
    iconPath: "/images/troops/skins-avatars/ArmsHead_10007_1.webp",
    specialSkillMaxVi: "+49% ATK Lính khi đánh Quái Bản Đồ (PvE)",
    specialSkillMaxEn: "+49% Soldier ATK in World Map PvE",
  },
  {
    id: "logistic-follower",
    nameVi: "Đội Hậu Cần",
    nameEn: "Logistic Follower",
    rarity: "epic",
    faction: "league",
    factionLabelVi: "Liên Minh",
    factionLabelEn: "League",
    iconPath: "/images/troops/skins-avatars/ArmsHead_10010_1.webp",
    specialSkillMaxVi: "+28% HP Lính cộng thêm • +7% HP Lính toàn đoàn Rally (Cộng dồn)",
    specialSkillMaxEn: "+28% Extra Soldier HP • +7% Rally Soldier HP (Stackable)",
  },
  {
    id: "drum-corps",
    nameVi: "Đội Trống Chiến",
    nameEn: "Drum Corps",
    rarity: "epic",
    faction: "horde",
    factionLabelVi: "Bộ Lạc",
    factionLabelEn: "Horde",
    iconPath: "/images/troops/skins-avatars/ArmsHead_10015_1.webp",
    specialSkillMaxVi: "+3.5% Sĩ khí Hàng chờ & Đoàn Rally",
    specialSkillMaxEn: "+3.5% Queue & Rally Morale",
  },
  {
    id: "elegant-butler",
    nameVi: "Quản Gia Thanh Lịch",
    nameEn: "Elegant Butler",
    rarity: "epic",
    faction: "league",
    factionLabelVi: "Liên Minh",
    factionLabelEn: "League",
    iconPath: "/images/troops/skins-avatars/ArmsHead_10012_1.webp",
    specialSkillMaxVi: "+56% HP Lính cộng thêm khi Thủ Thành",
    specialSkillMaxEn: "+56% Extra Soldier HP in Castle Defense",
  },
  {
    id: "shield-soldier",
    nameVi: "Lính Khiên",
    nameEn: "Shield Soldier",
    rarity: "rare",
    faction: "league",
    factionLabelVi: "Liên Minh",
    factionLabelEn: "League",
    iconPath: "/images/troops/skins-avatars/ArmsHead_10001_1.webp",
    specialSkillMaxVi: "+52% Tải trọng thu thập tài nguyên trên Bản đồ",
    specialSkillMaxEn: "+52% Resource Gathering Load Capacity",
  },
  {
    id: "cavalry",
    nameVi: "Kỵ Binh Nhẹ",
    nameEn: "Cavalry",
    rarity: "rare",
    faction: "horde",
    factionLabelVi: "Bộ Lạc",
    factionLabelEn: "Horde",
    iconPath: "/images/troops/skins-avatars/ArmsHead_10002_1.webp",
    specialSkillMaxVi: "+85% Tốc độ hành quân PvP",
    specialSkillMaxEn: "+85% PvP March Speed",
  },
] as const;

const RAW_LEGENDARY_STEPS: ReadonlyArray<{
  readonly toLevel: number;
  readonly ssotNotation: string;
  readonly sublevels: number;
  readonly legendaryMedalsPerSublevel: number;
  readonly breakthroughCopiesRequired: number;
  readonly starMilestone: number;
}> = [
  { toLevel: 2, ssotNotation: "2", sublevels: 1, legendaryMedalsPerSublevel: 1_600, breakthroughCopiesRequired: 0, starMilestone: 0 },
  { toLevel: 3, ssotNotation: "3", sublevels: 1, legendaryMedalsPerSublevel: 2_300, breakthroughCopiesRequired: 0, starMilestone: 0 },
  { toLevel: 4, ssotNotation: "4", sublevels: 1, legendaryMedalsPerSublevel: 3_200, breakthroughCopiesRequired: 0, starMilestone: 0 },
  { toLevel: 5, ssotNotation: "5", sublevels: 1, legendaryMedalsPerSublevel: 4_400, breakthroughCopiesRequired: 0, starMilestone: 0 },
  { toLevel: 6, ssotNotation: "6", sublevels: 1, legendaryMedalsPerSublevel: 6_200, breakthroughCopiesRequired: 0, starMilestone: 0 },
  { toLevel: 7, ssotNotation: "7", sublevels: 1, legendaryMedalsPerSublevel: 8_700, breakthroughCopiesRequired: 0, starMilestone: 0 },
  { toLevel: 8, ssotNotation: "8", sublevels: 1, legendaryMedalsPerSublevel: 13_000, breakthroughCopiesRequired: 0, starMilestone: 0 },
  { toLevel: 9, ssotNotation: "9", sublevels: 1, legendaryMedalsPerSublevel: 17_000, breakthroughCopiesRequired: 0, starMilestone: 0 },
  { toLevel: 10, ssotNotation: "10", sublevels: 1, legendaryMedalsPerSublevel: 24_000, breakthroughCopiesRequired: 1, starMilestone: 1 },
  { toLevel: 11, ssotNotation: "11", sublevels: 1, legendaryMedalsPerSublevel: 34_000, breakthroughCopiesRequired: 0, starMilestone: 1 },
  { toLevel: 12, ssotNotation: "12", sublevels: 1, legendaryMedalsPerSublevel: 40_000, breakthroughCopiesRequired: 0, starMilestone: 1 },
  { toLevel: 13, ssotNotation: "13", sublevels: 1, legendaryMedalsPerSublevel: 48_000, breakthroughCopiesRequired: 0, starMilestone: 1 },
  { toLevel: 14, ssotNotation: "14", sublevels: 1, legendaryMedalsPerSublevel: 58_000, breakthroughCopiesRequired: 0, starMilestone: 1 },
  { toLevel: 15, ssotNotation: "15", sublevels: 1, legendaryMedalsPerSublevel: 69_000, breakthroughCopiesRequired: 0, starMilestone: 1 },
  { toLevel: 16, ssotNotation: "16", sublevels: 1, legendaryMedalsPerSublevel: 83_000, breakthroughCopiesRequired: 0, starMilestone: 1 },
  { toLevel: 17, ssotNotation: "17", sublevels: 1, legendaryMedalsPerSublevel: 100_000, breakthroughCopiesRequired: 0, starMilestone: 1 },
  { toLevel: 18, ssotNotation: "17/1..17/2", sublevels: 2, legendaryMedalsPerSublevel: 60_000, breakthroughCopiesRequired: 0, starMilestone: 1 },
  { toLevel: 19, ssotNotation: "18/1..18/2", sublevels: 2, legendaryMedalsPerSublevel: 72_000, breakthroughCopiesRequired: 0, starMilestone: 1 },
  { toLevel: 20, ssotNotation: "19/1..19/2", sublevels: 2, legendaryMedalsPerSublevel: 86_000, breakthroughCopiesRequired: 1, starMilestone: 2 },
  { toLevel: 21, ssotNotation: "20/1..20/3", sublevels: 3, legendaryMedalsPerSublevel: 69_000, breakthroughCopiesRequired: 0, starMilestone: 2 },
  { toLevel: 22, ssotNotation: "21/1..21/3", sublevels: 3, legendaryMedalsPerSublevel: 76_000, breakthroughCopiesRequired: 0, starMilestone: 2 },
  { toLevel: 23, ssotNotation: "22/1..22/3", sublevels: 3, legendaryMedalsPerSublevel: 83_000, breakthroughCopiesRequired: 0, starMilestone: 2 },
  { toLevel: 24, ssotNotation: "23/1..23/3", sublevels: 3, legendaryMedalsPerSublevel: 91_000, breakthroughCopiesRequired: 0, starMilestone: 2 },
  { toLevel: 25, ssotNotation: "24/1..24/3", sublevels: 3, legendaryMedalsPerSublevel: 100_000, breakthroughCopiesRequired: 0, starMilestone: 2 },
  { toLevel: 26, ssotNotation: "25/1..25/3", sublevels: 3, legendaryMedalsPerSublevel: 110_000, breakthroughCopiesRequired: 0, starMilestone: 2 },
  { toLevel: 27, ssotNotation: "26/1..26/4", sublevels: 4, legendaryMedalsPerSublevel: 100_000, breakthroughCopiesRequired: 0, starMilestone: 2 },
  { toLevel: 28, ssotNotation: "27/1..27/4", sublevels: 4, legendaryMedalsPerSublevel: 100_000, breakthroughCopiesRequired: 0, starMilestone: 2 },
  { toLevel: 29, ssotNotation: "28/1..28/4", sublevels: 4, legendaryMedalsPerSublevel: 110_000, breakthroughCopiesRequired: 0, starMilestone: 2 },
  { toLevel: 30, ssotNotation: "29/1..29/4", sublevels: 4, legendaryMedalsPerSublevel: 121_000, breakthroughCopiesRequired: 2, starMilestone: 3 },
  { toLevel: 31, ssotNotation: "30/1..30/4", sublevels: 4, legendaryMedalsPerSublevel: 133_000, breakthroughCopiesRequired: 0, starMilestone: 3 },
  { toLevel: 32, ssotNotation: "31/1..31/5", sublevels: 5, legendaryMedalsPerSublevel: 112_000, breakthroughCopiesRequired: 0, starMilestone: 3 },
  { toLevel: 33, ssotNotation: "32/1..32/5", sublevels: 5, legendaryMedalsPerSublevel: 118_000, breakthroughCopiesRequired: 0, starMilestone: 3 },
  { toLevel: 34, ssotNotation: "33/1..33/5", sublevels: 5, legendaryMedalsPerSublevel: 123_000, breakthroughCopiesRequired: 0, starMilestone: 3 },
  { toLevel: 35, ssotNotation: "34/1..34/6", sublevels: 6, legendaryMedalsPerSublevel: 108_000, breakthroughCopiesRequired: 0, starMilestone: 3 },
  { toLevel: 36, ssotNotation: "35/1..35/6", sublevels: 6, legendaryMedalsPerSublevel: 113_000, breakthroughCopiesRequired: 0, starMilestone: 3 },
  { toLevel: 37, ssotNotation: "36/1..36/6", sublevels: 6, legendaryMedalsPerSublevel: 119_000, breakthroughCopiesRequired: 0, starMilestone: 3 },
  { toLevel: 38, ssotNotation: "37/1..37/7", sublevels: 7, legendaryMedalsPerSublevel: 107_000, breakthroughCopiesRequired: 0, starMilestone: 3 },
  { toLevel: 39, ssotNotation: "38/1..38/7", sublevels: 7, legendaryMedalsPerSublevel: 113_000, breakthroughCopiesRequired: 0, starMilestone: 3 },
  { toLevel: 40, ssotNotation: "39/1..39/8", sublevels: 8, legendaryMedalsPerSublevel: 103_000, breakthroughCopiesRequired: 3, starMilestone: 4 },
  { toLevel: 41, ssotNotation: "40/1..40/8", sublevels: 8, legendaryMedalsPerSublevel: 109_000, breakthroughCopiesRequired: 0, starMilestone: 4 },
  { toLevel: 42, ssotNotation: "41/1..41/9", sublevels: 9, legendaryMedalsPerSublevel: 100_000, breakthroughCopiesRequired: 0, starMilestone: 4 },
  { toLevel: 43, ssotNotation: "42/1..42/9", sublevels: 9, legendaryMedalsPerSublevel: 102_000, breakthroughCopiesRequired: 0, starMilestone: 4 },
  { toLevel: 44, ssotNotation: "43/1..43/9", sublevels: 9, legendaryMedalsPerSublevel: 105_000, breakthroughCopiesRequired: 0, starMilestone: 4 },
  { toLevel: 45, ssotNotation: "44/1..44/10", sublevels: 10, legendaryMedalsPerSublevel: 100_000, breakthroughCopiesRequired: 3, starMilestone: 5 },
  { toLevel: 46, ssotNotation: "45/1..45/10", sublevels: 10, legendaryMedalsPerSublevel: 101_000, breakthroughCopiesRequired: 0, starMilestone: 5 },
  { toLevel: 47, ssotNotation: "46/1..46/10", sublevels: 10, legendaryMedalsPerSublevel: 103_000, breakthroughCopiesRequired: 0, starMilestone: 5 },
  { toLevel: 48, ssotNotation: "47/1..47/10", sublevels: 10, legendaryMedalsPerSublevel: 105_000, breakthroughCopiesRequired: 0, starMilestone: 5 },
  { toLevel: 49, ssotNotation: "48/1..48/10", sublevels: 10, legendaryMedalsPerSublevel: 107_000, breakthroughCopiesRequired: 0, starMilestone: 5 },
  { toLevel: 50, ssotNotation: "49/1..49/10", sublevels: 10, legendaryMedalsPerSublevel: 109_000, breakthroughCopiesRequired: 3, starMilestone: 6 },
];

export const TROOP_SKIN_STEPS: readonly TroopSkinStepRow[] = (() => {
  let cumulative = 0;
  return RAW_LEGENDARY_STEPS.map((row) => {
    const fullLevel = row.sublevels * row.legendaryMedalsPerSublevel;
    cumulative += fullLevel;
    return {
      fromLevel: row.toLevel - 1,
      toLevel: row.toLevel,
      ssotNotation: row.ssotNotation,
      sublevels: row.sublevels,
      legendaryMedalsPerSublevel: row.legendaryMedalsPerSublevel,
      legendaryMedalsFullLevel: fullLevel,
      legendaryCumulativeMedals: cumulative,
      breakthroughCopiesRequired: row.breakthroughCopiesRequired,
      starMilestone: row.starMilestone,
    };
  });
})();

export const TROOP_SKIN_LEVEL_PRESETS: readonly number[] = [
  1, 10, 20, 30, 40, 45, 50,
] as const;

export function getSkinsByRarity(
  rarity: TroopSkinRarity
): readonly TroopSkinCatalogEntry[] {
  return TROOP_SKIN_CATALOG.filter((item) => item.rarity === rarity);
}

export function getMaxSublevelsForLevel(level: number): number {
  const safeLevel = Number.isFinite(level) ? Math.floor(level) : 1;
  const clamped = Math.max(
    TROOP_SKIN_MIN_LEVEL,
    Math.min(TROOP_SKIN_MAX_LEVEL, safeLevel)
  );
  if (clamped >= TROOP_SKIN_MAX_LEVEL) return 0;
  const step = TROOP_SKIN_STEPS[clamped - 1];
  return step ? step.sublevels : 0;
}

export function normalizeTroopSkinPoint(
  point: TroopSkinPointState
): TroopSkinPointState {
  const rawLevel = Number.isFinite(point.level) ? Math.floor(point.level) : 1;
  const level = Math.max(
    TROOP_SKIN_MIN_LEVEL,
    Math.min(TROOP_SKIN_MAX_LEVEL, rawLevel)
  );
  const maxSub = getMaxSublevelsForLevel(level);
  const maxAllowedSub = maxSub > 0 ? maxSub - 1 : 0;
  const rawSub = Number.isFinite(point.sublevel) ? Math.floor(point.sublevel) : 0;
  const sublevel = Math.max(0, Math.min(maxAllowedSub, rawSub));
  return { level, sublevel };
}

export function compareTroopSkinPoints(
  a: TroopSkinPointState,
  b: TroopSkinPointState
): number {
  const normA = normalizeTroopSkinPoint(a);
  const normB = normalizeTroopSkinPoint(b);
  if (normA.level !== normB.level) {
    return normA.level - normB.level;
  }
  return normA.sublevel - normB.sublevel;
}

export function getCumulativeMedalsAtPoint(
  point: TroopSkinPointState,
  rarity: TroopSkinRarity
): number {
  const normalized = normalizeTroopSkinPoint(point);
  const multiplier = TROOP_SKIN_RARITIES[rarity].costMultiplier;
  const baseFullLevels =
    normalized.level <= 1
      ? 0
      : TROOP_SKIN_STEPS[normalized.level - 2].legendaryCumulativeMedals;
  const currentStep =
    normalized.level < TROOP_SKIN_MAX_LEVEL
      ? TROOP_SKIN_STEPS[normalized.level - 1]
      : undefined;
  const sublevelMedals = currentStep
    ? normalized.sublevel * currentStep.legendaryMedalsPerSublevel
    : 0;
  return (baseFullLevels + sublevelMedals) * multiplier;
}

export function getCumulativeSublevelClicksAtPoint(
  point: TroopSkinPointState
): number {
  const normalized = normalizeTroopSkinPoint(point);
  let clicks = 0;
  for (let lv = 1; lv < normalized.level; lv++) {
    clicks += TROOP_SKIN_STEPS[lv - 1].sublevels;
  }
  return clicks + normalized.sublevel;
}

export function getCumulativeCopiesAtLevel(level: number): number {
  const safeLevel = Number.isFinite(level) ? Math.floor(level) : 1;
  const clamped = Math.max(
    TROOP_SKIN_MIN_LEVEL,
    Math.min(TROOP_SKIN_MAX_LEVEL, safeLevel)
  );
  let copies = 0;
  for (const step of TROOP_SKIN_STEPS) {
    if (step.toLevel <= clamped) {
      copies += step.breakthroughCopiesRequired;
    }
  }
  return copies;
}

export function getInterpolatedSkinStatsAtPoint(
  point: TroopSkinPointState,
  rarity: TroopSkinRarity
): {
  readonly ownedAtkPct: number;
  readonly ownedHpPct: number;
  readonly equippedAtkPct: number;
  readonly equippedHpPct: number;
} {
  const normalized = normalizeTroopSkinPoint(point);
  const meta = TROOP_SKIN_RARITIES[rarity];
  const maxStepSub = getMaxSublevelsForLevel(normalized.level);
  const subFraction = maxStepSub > 0 ? normalized.sublevel / maxStepSub : 0;
  const effectiveLevel = Math.min(
    TROOP_SKIN_MAX_LEVEL,
    normalized.level + subFraction
  );
  const progressRatio = effectiveLevel / TROOP_SKIN_MAX_LEVEL;
  return {
    ownedAtkPct: Number((meta.maxOwnedSoldierAtkPct * progressRatio).toFixed(2)),
    ownedHpPct: Number((meta.maxOwnedSoldierHpPct * progressRatio).toFixed(2)),
    equippedAtkPct: Number(
      (meta.maxEquippedSoldierAtkPct * progressRatio).toFixed(2)
    ),
    equippedHpPct: Number(
      (meta.maxEquippedSoldierHpPct * progressRatio).toFixed(2)
    ),
  };
}

const STAGE_MILESTONE_DEFINITIONS: ReadonlyArray<{
  readonly id: string;
  readonly labelVi: string;
  readonly labelEn: string;
  readonly fromLevel: number;
  readonly toLevel: number;
  readonly starMilestone: number;
}> = [
  {
    id: "stage-1-10",
    labelVi: "Chặng 1: Lv.1 ➔ Lv.10 ⭐ (Điểm gãy ROI 1)",
    labelEn: "Stage 1: Lv.1 to Lv.10 ⭐ (ROI Breakpoint 1)",
    fromLevel: 1,
    toLevel: 10,
    starMilestone: 1,
  },
  {
    id: "stage-10-20",
    labelVi: "Chặng 2: Lv.10 ➔ Lv.20 ⭐⭐ (Điểm gãy ROI 2)",
    labelEn: "Stage 2: Lv.10 to Lv.20 ⭐⭐ (ROI Breakpoint 2)",
    fromLevel: 10,
    toLevel: 20,
    starMilestone: 2,
  },
  {
    id: "stage-20-30",
    labelVi: "Chặng 3: Lv.20 ➔ Lv.30 ⭐⭐⭐ (Đột phá Giữa Game)",
    labelEn: "Stage 3: Lv.20 to Lv.30 ⭐⭐⭐ (Mid-Game Breakthrough)",
    fromLevel: 20,
    toLevel: 30,
    starMilestone: 3,
  },
  {
    id: "stage-30-40",
    labelVi: "Chặng 4: Lv.30 ➔ Lv.40 ⭐⭐⭐⭐ (Chủ lực Đạo 1)",
    labelEn: "Stage 4: Lv.30 to Lv.40 ⭐⭐⭐⭐ (Queue 1 Main Skin)",
    fromLevel: 30,
    toLevel: 40,
    starMilestone: 4,
  },
  {
    id: "stage-40-45",
    labelVi: "Chặng 5: Lv.40 ➔ Lv.45 ⭐⭐⭐⭐⭐ (Cao cấp)",
    labelEn: "Stage 5: Lv.40 to Lv.45 ⭐⭐⭐⭐⭐ (High Tier)",
    fromLevel: 40,
    toLevel: 45,
    starMilestone: 5,
  },
  {
    id: "stage-45-50",
    labelVi: "Chặng 6: Lv.45 ➔ Lv.50 MAX (Mở khóa Vinh Dự)",
    labelEn: "Stage 6: Lv.45 to Lv.50 MAX (Unlocks Honor Level)",
    fromLevel: 45,
    toLevel: 50,
    starMilestone: 6,
  },
];

export function calculateTroopSkinProgression(
  input: TroopSkinCalculationInput
): TroopSkinCalculationResult {
  const rarityMeta = TROOP_SKIN_RARITIES[input.rarity];
  const skinsForRarity = getSkinsByRarity(input.rarity);
  const selectedSkin =
    TROOP_SKIN_CATALOG.find(
      (item) => item.id === input.skinId && item.rarity === input.rarity
    ) ?? skinsForRarity[0];

  const normalizedCurrent = normalizeTroopSkinPoint(input.current);
  const normalizedTarget = normalizeTroopSkinPoint(input.target);
  const cmp = compareTroopSkinPoints(normalizedCurrent, normalizedTarget);
  const isReversed = cmp > 0;
  const effectiveStart = isReversed ? normalizedTarget : normalizedCurrent;
  const effectiveEnd = isReversed ? normalizedCurrent : normalizedTarget;

  const safeOwnedMedals = Math.max(
    0,
    Number.isFinite(input.ownedMedals) ? Math.floor(input.ownedMedals) : 0
  );
  const safeOwnedCopies = Math.max(
    0,
    Number.isFinite(input.ownedCopies) ? Math.floor(input.ownedCopies) : 0
  );

  const startCumulativeMedals = getCumulativeMedalsAtPoint(
    effectiveStart,
    input.rarity
  );
  const endCumulativeMedals = getCumulativeMedalsAtPoint(
    effectiveEnd,
    input.rarity
  );
  const medalsNeeded = Math.max(0, endCumulativeMedals - startCumulativeMedals);
  const medalsRemainingAfter = Math.max(0, safeOwnedMedals - medalsNeeded);
  const medalsShortfall = Math.max(0, medalsNeeded - safeOwnedMedals);

  const startCumulativeCopies = getCumulativeCopiesAtLevel(effectiveStart.level);
  const endCumulativeCopies = getCumulativeCopiesAtLevel(effectiveEnd.level);
  const copiesNeeded = Math.max(0, endCumulativeCopies - startCumulativeCopies);
  const copiesRemainingAfter = Math.max(0, safeOwnedCopies - copiesNeeded);
  const copiesShortfall = Math.max(0, copiesNeeded - safeOwnedCopies);

  const totalSublevelClicks = Math.max(
    0,
    getCumulativeSublevelClicksAtPoint(effectiveEnd) -
      getCumulativeSublevelClicksAtPoint(effectiveStart)
  );

  const startStats = getInterpolatedSkinStatsAtPoint(effectiveStart, input.rarity);
  const endStats = getInterpolatedSkinStatsAtPoint(effectiveEnd, input.rarity);

  const legendaryDelta =
    getCumulativeMedalsAtPoint(effectiveEnd, "legendary") -
    getCumulativeMedalsAtPoint(effectiveStart, "legendary");

  const rarityComparison: Readonly<Record<TroopSkinRarity, number>> = {
    legendary: Math.max(0, legendaryDelta),
    epic: Math.max(0, legendaryDelta * 0.5),
    rare: Math.max(0, legendaryDelta * 0.25),
  };

  const stageBreakdowns: TroopSkinStageBreakdown[] = [];
  for (const stage of STAGE_MILESTONE_DEFINITIONS) {
    const stageStartPoint: TroopSkinPointState = {
      level: stage.fromLevel,
      sublevel: 0,
    };
    const stageEndPoint: TroopSkinPointState = {
      level: stage.toLevel,
      sublevel: 0,
    };
    const overlapStart =
      compareTroopSkinPoints(effectiveStart, stageStartPoint) > 0
        ? effectiveStart
        : stageStartPoint;
    const overlapEnd =
      compareTroopSkinPoints(effectiveEnd, stageEndPoint) < 0
        ? effectiveEnd
        : stageEndPoint;

    if (compareTroopSkinPoints(overlapStart, overlapEnd) < 0) {
      const segMedals =
        getCumulativeMedalsAtPoint(overlapEnd, input.rarity) -
        getCumulativeMedalsAtPoint(overlapStart, input.rarity);
      const segCopies =
        getCumulativeCopiesAtLevel(overlapEnd.level) -
        getCumulativeCopiesAtLevel(overlapStart.level);
      stageBreakdowns.push({
        id: stage.id,
        labelVi: stage.labelVi,
        labelEn: stage.labelEn,
        fromLevel: overlapStart.level,
        toLevel: overlapEnd.level,
        medalsRequired: segMedals,
        copiesRequired: segCopies,
        starMilestone: stage.starMilestone,
      });
    }
  }

  return {
    rarityMeta,
    selectedSkin,
    normalizedCurrent,
    normalizedTarget,
    effectiveStart,
    effectiveEnd,
    isReversed,
    startCumulativeMedals,
    endCumulativeMedals,
    medalsNeeded,
    medalsRemainingAfter,
    medalsShortfall,
    startCumulativeCopies,
    endCumulativeCopies,
    copiesNeeded,
    copiesRemainingAfter,
    copiesShortfall,
    totalSublevelClicks,
    startOwnedAtkPct: startStats.ownedAtkPct,
    endOwnedAtkPct: endStats.ownedAtkPct,
    gainedOwnedAtkPct: Number(
      (endStats.ownedAtkPct - startStats.ownedAtkPct).toFixed(2)
    ),
    startOwnedHpPct: startStats.ownedHpPct,
    endOwnedHpPct: endStats.ownedHpPct,
    gainedOwnedHpPct: Number(
      (endStats.ownedHpPct - startStats.ownedHpPct).toFixed(2)
    ),
    startEquippedAtkPct: startStats.equippedAtkPct,
    endEquippedAtkPct: endStats.equippedAtkPct,
    startEquippedHpPct: startStats.equippedHpPct,
    endEquippedHpPct: endStats.equippedHpPct,
    rarityComparison,
    stageBreakdowns,
  };
}

export function formatTroopSkinPointLabel(
  point: TroopSkinPointState,
  locale: CalculatorLocale
): string {
  const norm = normalizeTroopSkinPoint(point);
  const maxSub = getMaxSublevelsForLevel(norm.level);
  if (norm.sublevel === 0 || maxSub <= 1) {
    return `Lv.${norm.level}`;
  }
  return locale === "en"
    ? `Lv.${norm.level} (${norm.sublevel}/${maxSub})`
    : `Lv.${norm.level} (${norm.sublevel}/${maxSub} vạch)`;
}

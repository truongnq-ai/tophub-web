import type { AssetRarity } from "@/content/guides/types";
import { CALCULATOR_MATERIALS } from "./registry";
import type { CalculatorLocale } from "./types";

export type VipAndShopsActiveTab = "vip_progression" | "guild_honor_shop";

export type FactionAwakeningPlan =
  | "horde"
  | "nature"
  | "league_dual"
  | "league_triple";

export type GuildShopCurrencyEra = "pre_season_honor" | "season1_glory_coin";

export type HonorSafetyFloorMode =
  | "full_awakening_9_stones"
  | "weekly_single_1_stone";

export type VipAttributeValueType = "percent" | "flat" | "unlock";

export type VipAttributeCategory =
  | "economy"
  | "development"
  | "combat"
  | "privilege";

export interface VipAttributeDefinition {
  readonly id: number;
  readonly nameVi: string;
  readonly nameEn: string;
  readonly valueType: VipAttributeValueType;
  readonly category: VipAttributeCategory;
  readonly unlockLevel: number;
}

export interface VipDailyFreeItem {
  readonly gameId: number;
  readonly nameVi: string;
  readonly nameEn: string;
  readonly quantity: number;
  readonly rarity: AssetRarity;
}

export interface VipExchangePack {
  readonly exchangeId: number;
  readonly priceUsd: number;
  readonly priceVnd: number;
  readonly summaryVi: string;
  readonly summaryEn: string;
}

export interface VipShopUnlockItem {
  readonly shopGoodsId: number;
  readonly gameId: number;
  readonly nameVi: string;
  readonly nameEn: string;
  readonly diamondCost: number;
  readonly limitCount: number;
  readonly refreshCycle: "daily" | "weekly";
  readonly rarity: AssetRarity;
}

export interface VipLevelDefinition {
  readonly level: number;
  readonly cumulativePoints: number;
  readonly deltaPoints: number;
  readonly cumulativeUsd: number;
  readonly vipLimit: number;
  readonly isGoldenBreakpoint: boolean;
  readonly breakpointBadgeVi?: string;
  readonly breakpointBadgeEn?: string;
  readonly marchQueuesBonus: number;
  readonly dailyFreeGoldShards: number;
  readonly constructionResearchSpeedBonusPct: number;
  readonly effects: Readonly<Record<number, number>>;
  readonly dailyFreeItems: readonly VipDailyFreeItem[];
  readonly dailyFreeSummaryVi: string;
  readonly dailyFreeSummaryEn: string;
  readonly vipPack?: VipExchangePack;
  readonly freeMilestoneRewardVi?: string;
  readonly freeMilestoneRewardEn?: string;
  readonly vipShopUnlocks: readonly VipShopUnlockItem[];
  readonly keyPerksVi: readonly string[];
  readonly keyPerksEn: readonly string[];
  readonly vipShopHighlightsVi: string;
  readonly vipShopHighlightsEn: string;
}

export const VIP_STANDARD_MAX_LEVEL = 16;
export const VIP_EXTENDED_MAX_LEVEL = 20;
export const VIP_POINTS_PER_USD = 6;
export const VIP_GOLD_BRICK_VND_PER_USD = 24_000;
export const VIP_GOLD_BRICK_VND_PER_POINT =
  VIP_GOLD_BRICK_VND_PER_USD / VIP_POINTS_PER_USD; // 4,000 VND per VIP Point
export const VIP_OPTIMAL_PACK_POINTS = 648;
export const VIP_OPTIMAL_PACK_USD = 99.99;
export const VIP_OPTIMAL_PACK_VND = 2_399_000;
export const FREE_GUILD_SHOP_VIP_POINTS_PER_WEEK = 1_000;
export const VIP_POINT_ICON_PATH = "/images/items/consumables/icon_30371.webp";

/**
 * Complete 34 VIP Attributes extracted from Meta.bytes (v1.0.42687) & Locale_vi.bytes (v1.0.42707).
 * - valueType === "percent": raw value in Meta.bytes is 100x percentage (e.g. 350 -> +3.5%, 5000 -> +50%).
 * - valueType === "flat": raw value is an additive integer cap (+2, +10, +600, etc.).
 * - valueType === "unlock": raw value = 1 means feature is unlocked.
 */
export const VIP_ATTRIBUTES: readonly VipAttributeDefinition[] = [
  {
    id: 1014,
    nameVi: "Bonus sản lượng Khu Mỏ Đá",
    nameEn: "Stone Mine Output Bonus",
    valueType: "percent",
    category: "economy",
    unlockLevel: 1,
  },
  {
    id: 1012,
    nameVi: "Bonus sản lượng Khu Đốn Gỗ",
    nameEn: "Timber Mill Output Bonus",
    valueType: "percent",
    category: "economy",
    unlockLevel: 1,
  },
  {
    id: 1052,
    nameVi: "Tăng tải trọng của tất cả quân",
    nameEn: "All Troop Load Capacity Bonus",
    valueType: "percent",
    category: "economy",
    unlockLevel: 1,
  },
  {
    id: 1001,
    nameVi: "Bonus tốc độ thu thập tài nguyên",
    nameEn: "Resource Gathering Speed Bonus",
    valueType: "percent",
    category: "economy",
    unlockLevel: 1,
  },
  {
    id: 1094,
    nameVi: "Số lần tiêu diệt Thủ Quân Ruby",
    nameEn: "Daily Ruby Guard Kill Limit",
    valueType: "flat",
    category: "economy",
    unlockLevel: 1,
  },
  {
    id: 1058,
    nameVi: "Tốc độ hồi năng lượng",
    nameEn: "Stamina Recovery Speed",
    valueType: "percent",
    category: "development",
    unlockLevel: 2,
  },
  {
    id: 1057,
    nameVi: "Bổ sung phần thưởng Sảnh Viễn Chinh",
    nameEn: "Expedition Hall Reward Bonus",
    valueType: "percent",
    category: "economy",
    unlockLevel: 3,
  },
  {
    id: 1044,
    nameVi: "Số lần rút thẻ miễn phí mỗi ngày (Quán Rượu)",
    nameEn: "Daily Free Tavern Recruits",
    valueType: "flat",
    category: "development",
    unlockLevel: 3,
  },
  {
    id: 1185,
    nameVi: "Mở khóa tùy chỉnh avatar",
    nameEn: "Unlock Custom Avatar Upload",
    valueType: "unlock",
    category: "privilege",
    unlockLevel: 3,
  },
  {
    id: 1010,
    nameVi: "Giới hạn năng lượng",
    nameEn: "Max Stamina Cap Bonus",
    valueType: "flat",
    category: "development",
    unlockLevel: 4,
  },
  {
    id: 1143,
    nameVi: "Hoàn thành hàng loạt nhiệm vụ Treo Thưởng ngoại trừ loại chiến đấu",
    nameEn: "Batch Complete Non-Combat Bounty Quests",
    valueType: "unlock",
    category: "privilege",
    unlockLevel: 4,
  },
  {
    id: 1034,
    nameVi: "Tốc độ xây dựng",
    nameEn: "Construction Speed Bonus",
    valueType: "percent",
    category: "development",
    unlockLevel: 5,
  },
  {
    id: 1002,
    nameVi: "Tăng tốc độ hành quân PvE",
    nameEn: "PvE March Speed Bonus",
    valueType: "percent",
    category: "combat",
    unlockLevel: 5,
  },
  {
    id: 1127,
    nameVi: "Tầm Bảo Di Tích: Tự động triển khai anh hùng",
    nameEn: "Relic Treasure Hunt: Auto-Deploy Heroes",
    valueType: "unlock",
    category: "privilege",
    unlockLevel: 5,
  },
  {
    id: 1167,
    nameVi: "Giới hạn mua lượt dập lửa mỗi ngày",
    nameEn: "Daily Fire Extinguishing Purchase Limit",
    valueType: "flat",
    category: "development",
    unlockLevel: 5,
  },
  {
    id: 1022,
    nameVi: "Tốc độ trị liệu",
    nameEn: "Troop Healing Speed Bonus",
    valueType: "percent",
    category: "combat",
    unlockLevel: 6,
  },
  {
    id: 1016,
    nameVi: "Tốc độ huấn luyện lính",
    nameEn: "Troop Training Speed Bonus",
    valueType: "percent",
    category: "development",
    unlockLevel: 6,
  },
  {
    id: 1033,
    nameVi: "Tốc độ nghiên cứu Công Nghệ",
    nameEn: "Tech Research Speed Bonus",
    valueType: "percent",
    category: "development",
    unlockLevel: 7,
  },
  {
    id: 1178,
    nameVi: "Đặc quyền tự động dịch",
    nameEn: "Auto-Translate Chat Privilege",
    valueType: "unlock",
    category: "privilege",
    unlockLevel: 7,
  },
  {
    id: 10104,
    nameVi: "HP của tất cả Lính",
    nameEn: "All Soldiers HP Bonus",
    valueType: "percent",
    category: "combat",
    unlockLevel: 8,
  },
  {
    id: 1194,
    nameVi:
      "Chiêu mộ 100 lần tại Quán Rượu nhận ngay ưu đãi 67% khi mua 1 Anh Hùng Huyền Thoại",
    nameEn:
      "100 Tavern Recruits Grants 67% Discount on 1 Legendary Hero Purchase",
    valueType: "unlock",
    category: "privilege",
    unlockLevel: 8,
  },
  {
    id: 1189,
    nameVi:
      "Tự động tham gia tập kết Thủ Lĩnh Quân Đoàn (Hắc Ảnh Đại Cổ Thụ & Pháo Đài >= 20)",
    nameEn:
      "Auto-Join Legion Boss Rally (Dark Shadow Ancient Tree & Castle >= 20)",
    valueType: "unlock",
    category: "privilege",
    unlockLevel: 8,
  },
  {
    id: 1196,
    nameVi:
      "Hoàn Thành Nhanh trong Treo Thưởng hỗ trợ nhiệm vụ tìm kiếm thú cưng (Mở khóa trong S1)",
    nameEn:
      "Quick Complete in Bounty Supports Pet Search Quests (Unlocks in S1)",
    valueType: "unlock",
    category: "privilege",
    unlockLevel: 8,
  },
  {
    id: 1032,
    nameVi: "Giới hạn sức chứa Bệnh Viện",
    nameEn: "Hospital Capacity Bonus",
    valueType: "flat",
    category: "combat",
    unlockLevel: 9,
  },
  {
    id: 1220,
    nameVi:
      "Tự động tham gia tập kết Thú Cưng Hoang Dã (Hắc Ảnh Đại Cổ Thụ & Pháo Đài >= 20)",
    nameEn:
      "Auto-Join Wild Pet Rally (Dark Shadow Ancient Tree & Castle >= 20)",
    valueType: "unlock",
    category: "privilege",
    unlockLevel: 9,
  },
  {
    id: 1238,
    nameVi:
      "Càn quét nhanh lượt khiêu chiến Đội Quân Hắc Ám (mùa Tro Tàn từ Hỏa Đông)",
    nameEn: "Quick Sweep Dark Army Challenges (Embers from Frostfire Season)",
    valueType: "unlock",
    category: "privilege",
    unlockLevel: 9,
  },
  {
    id: 1018,
    nameVi: "Sức chứa lính (của mỗi phe)",
    nameEn: "Faction Soldier Capacity Bonus",
    valueType: "flat",
    category: "combat",
    unlockLevel: 10,
  },
  {
    id: 1237,
    nameVi:
      "Tự động tham gia tập kết Quái Lang Thang (mùa Tro Tàn từ Hỏa Đông)",
    nameEn: "Auto-Join Wandering Monster Rally (Embers from Frostfire Season)",
    valueType: "unlock",
    category: "privilege",
    unlockLevel: 10,
  },
  {
    id: 1019,
    nameVi: "Giới Hạn Xuất Chinh",
    nameEn: "March Size Capacity Bonus",
    valueType: "flat",
    category: "combat",
    unlockLevel: 12,
  },
  {
    id: 1039,
    nameVi: "Giảm tỷ lệ thương binh phe ta (khi phòng thủ)",
    nameEn: "Friendly Defense Casualty Rate Reduction",
    valueType: "percent",
    category: "combat",
    unlockLevel: 13,
  },
  {
    id: 1141,
    nameVi: "Hiệu ứng Pháo Đài độc quyền VIP 17",
    nameEn: "VIP 17 Exclusive Castle Visual Effect",
    valueType: "unlock",
    category: "privilege",
    unlockLevel: 17,
  },
  {
    id: 1142,
    nameVi: "Skin Pháo Đài độc quyền VIP 18",
    nameEn: "VIP 18 Exclusive Castle Skin",
    valueType: "unlock",
    category: "privilege",
    unlockLevel: 18,
  },
  {
    id: 1252,
    nameVi: "Skin hành quân độc quyền - VIP 19",
    nameEn: "VIP 19 Exclusive March Skin",
    valueType: "unlock",
    category: "privilege",
    unlockLevel: 19,
  },
  {
    id: 1253,
    nameVi: "Hào quang và skin pháo đài độc quyền - VIP 20",
    nameEn: "VIP 20 Exclusive Castle Skin & Prestige Aura",
    valueType: "unlock",
    category: "privilege",
    unlockLevel: 20,
  },
] as const;

function buildDailyFreeItems(
  heroShardTier: "epic" | "legendary",
  heroShardCount: number,
  woodChests: number,
  stoneChests: number,
  meatChests: number,
  rubyChests: number
): readonly VipDailyFreeItem[] {
  return [
    heroShardTier === "legendary"
      ? {
          gameId: 220005,
          nameVi: "Mảnh Vạn Năng Anh Hùng Huyền Thoại",
          nameEn: "Universal Legendary Hero Shard",
          quantity: heroShardCount,
          rarity: "legendary",
        }
      : {
          gameId: 220004,
          nameVi: "Mảnh Vạn Năng Anh Hùng Sử Thi",
          nameEn: "Universal Epic Hero Shard",
          quantity: heroShardCount,
          rarity: "epic",
        },
    {
      gameId: 215014,
      nameVi: "Rương Gỗ (Theo cấp Lâu Đài)",
      nameEn: "Timber Chest (Level-Scaled)",
      quantity: woodChests,
      rarity: "rare",
    },
    {
      gameId: 215015,
      nameVi: "Rương Đá (Theo cấp Lâu Đài)",
      nameEn: "Stone Chest (Level-Scaled)",
      quantity: stoneChests,
      rarity: "rare",
    },
    {
      gameId: 215016,
      nameVi: "Rương Thịt (Theo cấp Lâu Đài)",
      nameEn: "Meat Chest (Level-Scaled)",
      quantity: meatChests,
      rarity: "rare",
    },
    {
      gameId: 215013,
      nameVi: "Rương Ruby (Theo cấp Lâu Đài)",
      nameEn: "Ruby Chest (Level-Scaled)",
      quantity: rubyChests,
      rarity: "epic",
    },
  ];
}

export const VIP_LEVEL_TABLE: readonly VipLevelDefinition[] = [
  {
    level: 0,
    cumulativePoints: 0,
    deltaPoints: 0,
    cumulativeUsd: 0,
    vipLimit: 0,
    isGoldenBreakpoint: false,
    marchQueuesBonus: 0,
    dailyFreeGoldShards: 0,
    constructionResearchSpeedBonusPct: 0,
    effects: {},
    dailyFreeItems: buildDailyFreeItems("epic", 1, 1, 1, 1, 1),
    dailyFreeSummaryVi:
      "1 Mảnh Tướng Tím, 1 Rương Gỗ, 1 Rương Đá, 1 Rương Thịt, 1 Rương Ruby",
    dailyFreeSummaryEn:
      "1 Epic Hero Shard, 1 Timber Chest, 1 Stone Chest, 1 Meat Chest, 1 Ruby Chest",
    vipShopUnlocks: [
      {
        shopGoodsId: 6029,
        gameId: 202016,
        nameVi: "Cuộn Dời Server",
        nameEn: "Server Transfer Scroll",
        diamondCost: 1_000,
        limitCount: 20,
        refreshCycle: "weekly",
        rarity: "legendary",
      },
    ],
    keyPerksVi: ["Mốc khởi điểm mặc định khi tạo tài khoản"],
    keyPerksEn: ["Default starting tier upon account creation"],
    vipShopHighlightsVi: "Mở bán Cuộn Dời Server (1,000 KC x20/tuần)",
    vipShopHighlightsEn: "Unlocks Server Transfer Scroll (1,000 Diamonds x20/wk)",
  },
  {
    level: 1,
    cumulativePoints: 6,
    deltaPoints: 6,
    cumulativeUsd: 1.0,
    vipLimit: 0,
    isGoldenBreakpoint: false,
    marchQueuesBonus: 0,
    dailyFreeGoldShards: 0,
    constructionResearchSpeedBonusPct: 0,
    effects: {
      1014: 350,
      1012: 350,
      1052: 350,
      1001: 350,
      1094: 2,
    },
    dailyFreeItems: buildDailyFreeItems("epic", 1, 1, 1, 1, 1),
    dailyFreeSummaryVi:
      "1 Mảnh Tướng Tím, 1 Rương Gỗ, 1 Rương Đá, 1 Rương Thịt, 1 Rương Ruby",
    dailyFreeSummaryEn:
      "1 Epic Hero Shard, 1 Timber Chest, 1 Stone Chest, 1 Meat Chest, 1 Ruby Chest",
    vipPack: {
      exchangeId: 301,
      priceUsd: 0.99,
      priceVnd: 24_000,
      summaryVi: "80 KC, 5 Mảnh Bà Chủ, 10 Lệnh Chiêu Mộ, 2 Rương Thịt",
      summaryEn:
        "80 Diamonds, 5 Hostess Shards, 10 Recruit Tokens, 2 Meat Chests",
    },
    vipShopUnlocks: [
      {
        shopGoodsId: 6001,
        gameId: 215014,
        nameVi: "Rương Gỗ (Theo Cấp Độ)",
        nameEn: "Timber Chest (Level-Scaled)",
        diamondCost: 40,
        limitCount: 50,
        refreshCycle: "weekly",
        rarity: "rare",
      },
      {
        shopGoodsId: 6002,
        gameId: 215015,
        nameVi: "Rương Đá (Theo Cấp Độ)",
        nameEn: "Stone Chest (Level-Scaled)",
        diamondCost: 40,
        limitCount: 50,
        refreshCycle: "weekly",
        rarity: "rare",
      },
      {
        shopGoodsId: 6025,
        gameId: 219001,
        nameVi: "Thức Ăn Thú Cưng x50",
        nameEn: "Pet Food x50",
        diamondCost: 20,
        limitCount: 40,
        refreshCycle: "weekly",
        rarity: "rare",
      },
    ],
    keyPerksVi: [
      "Sản lượng Mỏ Đá & Khu Đốn Gỗ +3.5%",
      "Tải trọng quân & Tốc độ thu thập tài nguyên +3.5%",
      "Số lần tiêu diệt Thủ Quân Ruby +2 lượt/ngày",
    ],
    keyPerksEn: [
      "Stone Mine & Timber Mill Output +3.5%",
      "All Troop Load & Resource Gathering Speed +3.5%",
      "Daily Ruby Guard Kill Limit +2/day",
    ],
    vipShopHighlightsVi:
      "Mở Rương Gỗ/Đá theo cấp (40 KC x50/tuần) & Thức Ăn Thú Cưng",
    vipShopHighlightsEn:
      "Unlocks Level-Scaled Timber/Stone Chests (40 Diamonds x50/wk) & Pet Food",
  },
  {
    level: 2,
    cumulativePoints: 30,
    deltaPoints: 24,
    cumulativeUsd: 5.0,
    vipLimit: 0,
    isGoldenBreakpoint: false,
    marchQueuesBonus: 0,
    dailyFreeGoldShards: 0,
    constructionResearchSpeedBonusPct: 0,
    effects: {
      1058: 300,
      1014: 700,
      1012: 700,
      1052: 700,
      1001: 700,
      1094: 2,
    },
    dailyFreeItems: buildDailyFreeItems("epic", 1, 2, 1, 1, 1),
    dailyFreeSummaryVi:
      "1 Mảnh Tướng Tím, 2 Rương Gỗ, 1 Rương Đá, 1 Rương Thịt, 1 Rương Ruby",
    dailyFreeSummaryEn:
      "1 Epic Hero Shard, 2 Timber Chests, 1 Stone Chest, 1 Meat Chest, 1 Ruby Chest",
    vipPack: {
      exchangeId: 302,
      priceUsd: 1.99,
      priceVnd: 49_000,
      summaryVi: "120 KC, 10 Mảnh Bà Chủ, 20 Lệnh Chiêu Mộ, 3 Rương Thịt",
      summaryEn:
        "120 Diamonds, 10 Hostess Shards, 20 Recruit Tokens, 3 Meat Chests",
    },
    vipShopUnlocks: [
      {
        shopGoodsId: 6003,
        gameId: 207011,
        nameVi: "Thuốc Năng Lượng",
        nameEn: "Stamina Potion",
        diamondCost: 100,
        limitCount: 5,
        refreshCycle: "weekly",
        rarity: "epic",
      },
      {
        shopGoodsId: 6019,
        gameId: 204004,
        nameVi: "Rune Cường Hóa Trang Bị",
        nameEn: "Gear Enhancement Rune",
        diamondCost: 4,
        limitCount: 1_500,
        refreshCycle: "weekly",
        rarity: "rare",
      },
    ],
    keyPerksVi: [
      "Mở khóa Tốc độ hồi năng lượng +3%",
      "Sản lượng Đá/Gỗ, Tải trọng quân & Tốc độ thu thập tăng lên +7%",
    ],
    keyPerksEn: [
      "Unlocks Stamina Recovery Speed +3%",
      "Stone/Timber Output, Troop Load & Gathering Speed increased to +7%",
    ],
    vipShopHighlightsVi:
      "Mở Thuốc Năng Lượng (100 KC x5/tuần) & Rune Cường Hóa Trang Bị",
    vipShopHighlightsEn:
      "Unlocks Stamina Potion (100 Diamonds x5/wk) & Gear Enhancement Runes",
  },
  {
    level: 3,
    cumulativePoints: 100,
    deltaPoints: 70,
    cumulativeUsd: 16.67,
    vipLimit: 0,
    isGoldenBreakpoint: false,
    marchQueuesBonus: 0,
    dailyFreeGoldShards: 0,
    constructionResearchSpeedBonusPct: 0,
    effects: {
      1057: 500,
      1044: 1,
      1058: 400,
      1014: 1000,
      1012: 1000,
      1052: 1000,
      1001: 1000,
      1094: 4,
      1185: 1,
    },
    dailyFreeItems: buildDailyFreeItems("epic", 2, 2, 2, 1, 1),
    dailyFreeSummaryVi:
      "2 Mảnh Tướng Tím, 2 Rương Gỗ, 2 Rương Đá, 1 Rương Thịt, 1 Rương Ruby",
    dailyFreeSummaryEn:
      "2 Epic Hero Shards, 2 Timber Chests, 2 Stone Chests, 1 Meat Chest, 1 Ruby Chest",
    vipPack: {
      exchangeId: 303,
      priceUsd: 4.99,
      priceVnd: 129_000,
      summaryVi: "400 KC, 15 Mảnh Bà Chủ, 40 Lệnh Chiêu Mộ, 5 Rương Thịt",
      summaryEn:
        "400 Diamonds, 15 Hostess Shards, 40 Recruit Tokens, 5 Meat Chests",
    },
    vipShopUnlocks: [
      {
        shopGoodsId: 6005,
        gameId: 201001,
        nameVi: "Lệnh Chiêu Mộ Anh Hùng",
        nameEn: "Hero Recruitment Token",
        diamondCost: 150,
        limitCount: 10,
        refreshCycle: "weekly",
        rarity: "epic",
      },
      {
        shopGoodsId: 6006,
        gameId: 220004,
        nameVi: "Mảnh Vạn Năng Anh Hùng Tím",
        nameEn: "Universal Epic Hero Shard",
        diamondCost: 50,
        limitCount: 10,
        refreshCycle: "weekly",
        rarity: "epic",
      },
      {
        shopGoodsId: 6021,
        gameId: 214011,
        nameVi: "Pha Lê Bí Thuật",
        nameEn: "Arcane Crystal",
        diamondCost: 350,
        limitCount: 50,
        refreshCycle: "weekly",
        rarity: "mythic",
      },
    ],
    keyPerksVi: [
      "Mở khóa tùy chỉnh Avatar cá nhân",
      "Số lần rút thẻ miễn phí Quán Rượu +1/ngày & Thưởng Sảnh Viễn Chinh +5%",
      "Số lần tiêu diệt Thủ Quân Ruby tăng lên +4/ngày",
    ],
    keyPerksEn: [
      "Unlocks Custom Avatar Upload",
      "Daily Free Tavern Recruits +1/day & Expedition Hall Reward +5%",
      "Daily Ruby Guard Kill Limit increased to +4/day",
    ],
    vipShopHighlightsVi:
      "Mở Lệnh Chiêu Mộ (150 KC x10/tuần), Mảnh Tím & Pha Lê Bí Thuật",
    vipShopHighlightsEn:
      "Unlocks Recruitment Tokens (150 Diamonds x10/wk), Epic Shards & Arcane Crystals",
  },
  {
    level: 4,
    cumulativePoints: 300,
    deltaPoints: 200,
    cumulativeUsd: 50.0,
    vipLimit: 0,
    isGoldenBreakpoint: true,
    breakpointBadgeVi: "Mốc Tiện Ích Treo Thưởng",
    breakpointBadgeEn: "Bounty Batch QoL Milestone",
    marchQueuesBonus: 0,
    dailyFreeGoldShards: 0,
    constructionResearchSpeedBonusPct: 0,
    effects: {
      1010: 10,
      1143: 1,
      1057: 600,
      1044: 1,
      1058: 500,
      1014: 1200,
      1012: 1200,
      1052: 1200,
      1001: 1200,
      1094: 4,
      1185: 1,
    },
    dailyFreeItems: buildDailyFreeItems("epic", 3, 2, 2, 2, 1),
    dailyFreeSummaryVi:
      "3 Mảnh Tướng Tím, 2 Rương Gỗ, 2 Rương Đá, 2 Rương Thịt, 1 Rương Ruby",
    dailyFreeSummaryEn:
      "3 Epic Hero Shards, 2 Timber Chests, 2 Stone Chests, 2 Meat Chests, 1 Ruby Chest",
    vipPack: {
      exchangeId: 304,
      priceUsd: 9.99,
      priceVnd: 249_000,
      summaryVi: "800 KC, 30 Mảnh Bà Chủ, 50 Lệnh Chiêu Mộ, 10 Rương Thịt",
      summaryEn:
        "800 Diamonds, 30 Hostess Shards, 50 Recruit Tokens, 10 Meat Chests",
    },
    vipShopUnlocks: [
      {
        shopGoodsId: 6008,
        gameId: 203002,
        nameVi: "Tăng Tốc Chung 30 Phút",
        nameEn: "30m Universal Speedup",
        diamondCost: 30,
        limitCount: 20,
        refreshCycle: "weekly",
        rarity: "rare",
      },
      {
        shopGoodsId: 6007,
        gameId: 215004,
        nameVi: "Rương Cổ Ngữ Cấp 4",
        nameEn: "Lv.4 Rune Chest",
        diamondCost: 500,
        limitCount: 10,
        refreshCycle: "weekly",
        rarity: "epic",
      },
    ],
    keyPerksVi: [
      "Mở khóa Hoàn thành hàng loạt nhiệm vụ Treo Thưởng (trừ chiến đấu)",
      "Giới hạn năng lượng tối đa +10",
      "Sản lượng Đá/Gỗ, Tải trọng quân & Tốc độ thu thập +12%",
    ],
    keyPerksEn: [
      "Unlocks Batch Complete for Non-Combat Bounty Quests",
      "Max Stamina Cap +10",
      "Stone/Timber Output, Troop Load & Gathering Speed +12%",
    ],
    vipShopHighlightsVi:
      "Mở Gia Tốc 30 Phút (30 KC x20/tuần), Rương Thịt & Rương Rune Lv.4",
    vipShopHighlightsEn:
      "Unlocks 30m Speedups (30 Diamonds x20/wk), Meat Chests & Lv.4 Rune Chests",
  },
  {
    level: 5,
    cumulativePoints: 500,
    deltaPoints: 200,
    cumulativeUsd: 83.33,
    vipLimit: 0,
    isGoldenBreakpoint: false,
    marchQueuesBonus: 0,
    dailyFreeGoldShards: 0,
    constructionResearchSpeedBonusPct: 5,
    effects: {
      1034: 500,
      1002: 500,
      1127: 1,
      1167: 5,
      1010: 15,
      1143: 1,
      1057: 700,
      1044: 2,
      1058: 600,
      1014: 1500,
      1012: 1500,
      1052: 1500,
      1001: 1500,
      1094: 7,
      1185: 1,
    },
    dailyFreeItems: buildDailyFreeItems("epic", 4, 3, 2, 2, 2),
    dailyFreeSummaryVi:
      "4 Mảnh Tướng Tím, 3 Rương Gỗ, 2 Rương Đá, 2 Rương Thịt, 2 Rương Ruby",
    dailyFreeSummaryEn:
      "4 Epic Hero Shards, 3 Timber Chests, 2 Stone Chests, 2 Meat Chests, 2 Ruby Chests",
    vipPack: {
      exchangeId: 305,
      priceUsd: 19.99,
      priceVnd: 499_000,
      summaryVi: "1,600 KC, 60 Mảnh Bà Chủ, 60 Lệnh Chiêu Mộ, 20 Rương Thịt",
      summaryEn:
        "1,600 Diamonds, 60 Hostess Shards, 60 Recruit Tokens, 20 Meat Chests",
    },
    vipShopUnlocks: [
      {
        shopGoodsId: 6009,
        gameId: 202001,
        nameVi: "Khiên Hòa Bình 4 Giờ",
        nameEn: "4h Peace Shield",
        diamondCost: 100,
        limitCount: 2,
        refreshCycle: "weekly",
        rarity: "epic",
      },
      {
        shopGoodsId: 6020,
        gameId: 204005,
        nameVi: "Tinh Hoa Trang Bị",
        nameEn: "Gear Essence",
        diamondCost: 25,
        limitCount: 50,
        refreshCycle: "weekly",
        rarity: "epic",
      },
    ],
    keyPerksVi: [
      "Mở khóa Tốc độ xây dựng +5% & Tốc độ hành quân PvE +5%",
      "Tầm Bảo Di Tích: Tự động triển khai anh hùng",
      "Rút thẻ miễn phí Quán Rượu +2/ngày & Thủ Quân Ruby +7/ngày",
    ],
    keyPerksEn: [
      "Unlocks Construction Speed +5% & PvE March Speed +5%",
      "Relic Treasure Hunt: Auto-Deploy Heroes",
      "Daily Free Tavern Recruits +2/day & Ruby Guard Kills +7/day",
    ],
    vipShopHighlightsVi:
      "Mở Khiên Hòa Bình 4h (100 KC x2/tuần) & Tinh Hoa Trang Bị",
    vipShopHighlightsEn:
      "Unlocks 4h Peace Shield (100 Diamonds x2/wk) & Gear Essence",
  },
  {
    level: 6,
    cumulativePoints: 1_000,
    deltaPoints: 500,
    cumulativeUsd: 166.67,
    vipLimit: 0,
    isGoldenBreakpoint: true,
    breakpointBadgeVi: "Mốc Huấn Luyện & Trị Liệu",
    breakpointBadgeEn: "Training & Healing Milestone",
    marchQueuesBonus: 0,
    dailyFreeGoldShards: 0,
    constructionResearchSpeedBonusPct: 10,
    effects: {
      1022: 200,
      1016: 200,
      1034: 1000,
      1002: 800,
      1127: 1,
      1167: 10,
      1010: 20,
      1143: 1,
      1057: 800,
      1044: 2,
      1058: 700,
      1014: 2000,
      1012: 2000,
      1052: 2000,
      1001: 2000,
      1094: 7,
      1185: 1,
    },
    dailyFreeItems: buildDailyFreeItems("epic", 5, 3, 3, 2, 2),
    dailyFreeSummaryVi:
      "5 Mảnh Tướng Tím, 3 Rương Gỗ, 3 Rương Đá, 2 Rương Thịt, 2 Rương Ruby",
    dailyFreeSummaryEn:
      "5 Epic Hero Shards, 3 Timber Chests, 3 Stone Chests, 2 Meat Chests, 2 Ruby Chests",
    vipPack: {
      exchangeId: 306,
      priceUsd: 29.99,
      priceVnd: 749_000,
      summaryVi:
        "2,400 KC, 80 Mảnh Bà Chủ, 70 Lệnh Chiêu Mộ, Biểu cảm [Cạn Ly]",
      summaryEn:
        "2,400 Diamonds, 80 Hostess Shards, 70 Recruit Tokens, [Cheers] Emote",
    },
    vipShopUnlocks: [
      {
        shopGoodsId: 6011,
        gameId: 215013,
        nameVi: "Rương Ruby (Theo Cấp Độ)",
        nameEn: "Ruby Chest (Level-Scaled)",
        diamondCost: 40,
        limitCount: 50,
        refreshCycle: "weekly",
        rarity: "epic",
      },
    ],
    keyPerksVi: [
      "Mở khóa Tốc độ huấn luyện lính +2% & Tốc độ trị liệu +2%",
      "Tốc độ xây dựng tăng lên +10%, Giới hạn năng lượng +20",
      "Sản lượng Đá/Gỗ, Tải trọng quân & Tốc độ thu thập +20%",
    ],
    keyPerksEn: [
      "Unlocks Troop Training Speed +2% & Healing Speed +2%",
      "Construction Speed increased to +10%, Max Stamina Cap +20",
      "Stone/Timber Output, Troop Load & Gathering Speed +20%",
    ],
    vipShopHighlightsVi: "Mở Rương Ruby theo cấp (40 KC x50/tuần & 200 KC x15/tuần)",
    vipShopHighlightsEn:
      "Unlocks Level-Scaled Ruby Chests (40 Diamonds x50/wk & 200 Diamonds x15/wk)",
  },
  {
    level: 7,
    cumulativePoints: 3_000,
    deltaPoints: 2_000,
    cumulativeUsd: 500.0,
    vipLimit: 0,
    isGoldenBreakpoint: true,
    breakpointBadgeVi: "Mở Mảnh Tướng Cam Hàng Ngày & Tốc Độ Nghiên Cứu",
    breakpointBadgeEn: "Daily Legendary Shard & Tech Research Unlock",
    marchQueuesBonus: 0,
    dailyFreeGoldShards: 1,
    constructionResearchSpeedBonusPct: 17,
    effects: {
      1033: 200,
      1178: 1,
      1022: 400,
      1016: 400,
      1034: 1500,
      1002: 1200,
      1127: 1,
      1167: 10,
      1010: 20,
      1143: 1,
      1057: 900,
      1044: 2,
      1058: 800,
      1014: 2500,
      1012: 2500,
      1052: 2500,
      1001: 2500,
      1094: 9,
      1185: 1,
    },
    dailyFreeItems: buildDailyFreeItems("legendary", 1, 3, 3, 3, 2),
    dailyFreeSummaryVi:
      "1 Mảnh Tướng Cam, 3 Rương Gỗ, 3 Rương Đá, 3 Rương Thịt, 2 Rương Ruby",
    dailyFreeSummaryEn:
      "1 Legendary Hero Shard, 3 Timber Chests, 3 Stone Chests, 3 Meat Chests, 2 Ruby Chests",
    vipPack: {
      exchangeId: 307,
      priceUsd: 49.99,
      priceVnd: 1_249_000,
      summaryVi: "4,000 KC, 100 Mảnh Bà Chủ, 100 Lệnh Chiêu Mộ, 50 Rương Thịt",
      summaryEn:
        "4,000 Diamonds, 100 Hostess Shards, 100 Recruit Tokens, 50 Meat Chests",
    },
    vipShopUnlocks: [
      {
        shopGoodsId: 6012,
        gameId: 203003,
        nameVi: "Tăng Tốc Chung 3 Giờ",
        nameEn: "3h Universal Speedup",
        diamondCost: 150,
        limitCount: 20,
        refreshCycle: "weekly",
        rarity: "epic",
      },
      {
        shopGoodsId: 6022,
        gameId: 204004,
        nameVi: "Rune Cường Hóa Trang Bị x1,000",
        nameEn: "Gear Enhancement Rune x1,000",
        diamondCost: 250,
        limitCount: 50,
        refreshCycle: "weekly",
        rarity: "epic",
      },
    ],
    keyPerksVi: [
      "Quà miễn phí hàng ngày bắt đầu tặng 1 Mảnh Vạn Năng Anh Hùng Cam/ngày",
      "Mở khóa Tốc độ nghiên cứu Công Nghệ +2% & Đặc quyền tự động dịch",
      "Tốc độ xây dựng +15%, Huấn luyện lính +4%, Trị liệu +4%",
    ],
    keyPerksEn: [
      "Daily free chest now grants 1 Universal Legendary Hero Shard/day",
      "Unlocks Tech Research Speed +2% & Auto-Translate Chat Privilege",
      "Construction Speed +15%, Troop Training +4%, Healing Speed +4%",
    ],
    vipShopHighlightsVi:
      "Mở Gia Tốc 3 Giờ (150 KC x20/tuần) & Gói 1,000 Rune Trang Bị",
    vipShopHighlightsEn:
      "Unlocks 3h Speedups (150 Diamonds x20/wk) & 1,000x Gear Rune Bundles",
  },
  {
    level: 8,
    cumulativePoints: 6_000,
    deltaPoints: 3_000,
    cumulativeUsd: 1_000.0,
    vipLimit: 0,
    isGoldenBreakpoint: true,
    breakpointBadgeVi: "Mốc Chiến Đấu & Tập Kết Tự Động",
    breakpointBadgeEn: "Combat HP & Auto-Rally Milestone",
    marchQueuesBonus: 0,
    dailyFreeGoldShards: 1,
    constructionResearchSpeedBonusPct: 24,
    effects: {
      10104: 500,
      1033: 400,
      1178: 1,
      1022: 600,
      1016: 600,
      1034: 2000,
      1002: 1500,
      1127: 1,
      1167: 10,
      1010: 20,
      1143: 1,
      1057: 1000,
      1044: 2,
      1058: 1000,
      1014: 2700,
      1012: 2700,
      1052: 2700,
      1001: 2700,
      1094: 9,
      1185: 1,
      1194: 1,
      1189: 1,
      1196: 1,
    },
    dailyFreeItems: buildDailyFreeItems("legendary", 1, 4, 3, 3, 2),
    dailyFreeSummaryVi:
      "1 Mảnh Tướng Cam, 4 Rương Gỗ, 3 Rương Đá, 3 Rương Thịt, 2 Rương Ruby",
    dailyFreeSummaryEn:
      "1 Legendary Hero Shard, 4 Timber Chests, 3 Stone Chests, 3 Meat Chests, 2 Ruby Chests",
    vipPack: {
      exchangeId: 308,
      priceUsd: 99.99,
      priceVnd: 2_399_000,
      summaryVi: "8,000 KC, 200 Mảnh Bà Chủ, 150 Lệnh Chiêu Mộ, 100 Rương Thịt",
      summaryEn:
        "8,000 Diamonds, 200 Hostess Shards, 150 Recruit Tokens, 100 Meat Chests",
    },
    vipShopUnlocks: [
      {
        shopGoodsId: 6014,
        gameId: 220005,
        nameVi: "Mảnh Vạn Năng Anh Hùng Cam (Hàng Ngày)",
        nameEn: "Universal Legendary Hero Shard (Daily)",
        diamondCost: 300,
        limitCount: 1,
        refreshCycle: "daily",
        rarity: "legendary",
      },
    ],
    keyPerksVi: [
      "Mở khóa HP của tất cả Lính +5%",
      "Tự động tham gia tập kết Thủ Lĩnh Quân Đoàn & Hoàn thành nhanh tìm thú cưng S1",
      "Chiêu mộ 100 lần tại Quán Rượu nhận ưu đãi 67% mua 1 Anh Hùng Huyền Thoại",
    ],
    keyPerksEn: [
      "Unlocks All Soldiers HP +5%",
      "Auto-Join Legion Boss Rally & Quick Complete S1 Pet Search Quests",
      "100 Tavern Recruits grants 67% discount on 1 Legendary Hero purchase",
    ],
    vipShopHighlightsVi:
      "Mở bán Mảnh Vạn Năng Anh Hùng Cam giá ưu đãi 300 KC (1 mảnh/ngày)",
    vipShopHighlightsEn:
      "Unlocks discounted Universal Legendary Hero Shard at 300 Diamonds (1/day)",
  },
  {
    level: 9,
    cumulativePoints: 10_000,
    deltaPoints: 4_000,
    cumulativeUsd: 1_666.67,
    vipLimit: 0,
    isGoldenBreakpoint: false,
    marchQueuesBonus: 0,
    dailyFreeGoldShards: 1,
    constructionResearchSpeedBonusPct: 29,
    effects: {
      1032: 100,
      10104: 600,
      1033: 600,
      1178: 1,
      1022: 800,
      1016: 800,
      1034: 2300,
      1002: 1800,
      1127: 1,
      1167: 10,
      1010: 20,
      1143: 1,
      1057: 1000,
      1044: 2,
      1058: 1000,
      1014: 3000,
      1012: 3000,
      1052: 3000,
      1001: 3000,
      1094: 12,
      1185: 1,
      1194: 1,
      1189: 1,
      1196: 1,
      1220: 1,
      1238: 1,
    },
    dailyFreeItems: buildDailyFreeItems("legendary", 1, 4, 4, 3, 3),
    dailyFreeSummaryVi:
      "1 Mảnh Tướng Cam, 4 Rương Gỗ, 4 Rương Đá, 3 Rương Thịt, 3 Rương Ruby",
    dailyFreeSummaryEn:
      "1 Legendary Hero Shard, 4 Timber Chests, 4 Stone Chests, 3 Meat Chests, 3 Ruby Chests",
    vipPack: {
      exchangeId: 309,
      priceUsd: 99.99,
      priceVnd: 2_399_000,
      summaryVi:
        "8,000 KC, 80 Mảnh Tướng Cam, 160 Rương Tự Chọn TN Cam, 150 Gia Tốc 60p",
      summaryEn:
        "8,000 Diamonds, 80 Legendary Shards, 160 Legendary Resource Chests, 150x 60m Speedups",
    },
    vipShopUnlocks: [
      {
        shopGoodsId: 6015,
        gameId: 203004,
        nameVi: "Tăng Tốc Chung 8 Giờ",
        nameEn: "8h Universal Speedup",
        diamondCost: 400,
        limitCount: 10,
        refreshCycle: "weekly",
        rarity: "epic",
      },
      {
        shopGoodsId: 6024,
        gameId: 215018,
        nameVi: "Vàng Thái Dương",
        nameEn: "Solar Gold",
        diamondCost: 48,
        limitCount: 50,
        refreshCycle: "weekly",
        rarity: "legendary",
      },
    ],
    keyPerksVi: [
      "Mở khóa Giới hạn sức chứa Bệnh Viện +100",
      "Tự động tham gia tập kết Thú Cưng Hoang Dã & Càn quét nhanh Đội Quân Hắc Ám",
      "HP tất cả Lính +6%, Nghiên cứu +6%, Xây dựng +23%, Thủ Quân Ruby +12/ngày",
    ],
    keyPerksEn: [
      "Unlocks Hospital Capacity Bonus +100",
      "Auto-Join Wild Pet Rally & Quick Sweep Dark Army Challenges",
      "All Soldiers HP +6%, Tech Research +6%, Construction +23%, Ruby Guard +12/day",
    ],
    vipShopHighlightsVi: "Mở Gia Tốc 8 Giờ (400 KC x10/tuần) & Vàng Thái Dương",
    vipShopHighlightsEn: "Unlocks 8h Speedups (400 Diamonds x10/wk) & Solar Gold",
  },
  {
    level: 10,
    cumulativePoints: 30_000,
    deltaPoints: 20_000,
    cumulativeUsd: 5_000.0,
    vipLimit: 0,
    isGoldenBreakpoint: true,
    breakpointBadgeVi: "Mốc 2 Mảnh Cam/Ngày & Sức Chứa Lính Phe",
    breakpointBadgeEn: "2 Daily Legendary Shards & Faction Soldier Cap",
    marchQueuesBonus: 0,
    dailyFreeGoldShards: 2,
    constructionResearchSpeedBonusPct: 33,
    effects: {
      1018: 100,
      1032: 200,
      10104: 700,
      1033: 800,
      1178: 1,
      1022: 1000,
      1016: 1000,
      1034: 2500,
      1002: 2000,
      1127: 1,
      1167: 10,
      1010: 20,
      1143: 1,
      1057: 1000,
      1044: 2,
      1058: 1200,
      1014: 3500,
      1012: 3500,
      1052: 3500,
      1001: 3500,
      1094: 12,
      1185: 1,
      1194: 1,
      1189: 1,
      1196: 1,
      1220: 1,
      1237: 1,
      1238: 1,
    },
    dailyFreeItems: buildDailyFreeItems("legendary", 2, 4, 4, 4, 3),
    dailyFreeSummaryVi:
      "2 Mảnh Tướng Cam, 4 Rương Gỗ, 4 Rương Đá, 4 Rương Thịt, 3 Rương Ruby",
    dailyFreeSummaryEn:
      "2 Legendary Hero Shards, 4 Timber Chests, 4 Stone Chests, 4 Meat Chests, 3 Ruby Chests",
    vipPack: {
      exchangeId: 310,
      priceUsd: 99.99,
      priceVnd: 2_399_000,
      summaryVi:
        "8,000 KC, 80 Mảnh Tướng Cam, 180 Rương Tự Chọn TN Tím, 200 Gia Tốc 60p",
      summaryEn:
        "8,000 Diamonds, 80 Legendary Shards, 180 Epic Resource Chests, 200x 60m Speedups",
    },
    vipShopUnlocks: [
      {
        shopGoodsId: 6017,
        gameId: 220005,
        nameVi: "Mảnh Vạn Năng Anh Hùng Cam (Hàng Tuần)",
        nameEn: "Universal Legendary Hero Shard (Weekly)",
        diamondCost: 300,
        limitCount: 10,
        refreshCycle: "weekly",
        rarity: "legendary",
      },
      {
        shopGoodsId: 6028,
        gameId: 202022,
        nameVi: "Vé Làm Mới Thương Đội Cao Cấp",
        nameEn: "Premium Caravan Refresh Ticket",
        diamondCost: 2_000,
        limitCount: 1,
        refreshCycle: "daily",
        rarity: "legendary",
      },
    ],
    keyPerksVi: [
      "Quà miễn phí hàng ngày tăng lên 2 Mảnh Vạn Năng Anh Hùng Cam/ngày",
      "Mở khóa Sức chứa lính mỗi phe +100 & Tự động tập kết Quái Lang Thang",
      "HP tất cả Lính +7%, Nghiên cứu +8%, Xây dựng +25%, Huấn luyện/Trị liệu +10%",
    ],
    keyPerksEn: [
      "Daily free chest increases to 2 Universal Legendary Hero Shards/day",
      "Unlocks Faction Soldier Capacity +100 & Auto-Join Wandering Monster Rally",
      "All Soldiers HP +7%, Tech Research +8%, Construction +25%, Train/Heal +10%",
    ],
    vipShopHighlightsVi:
      "Mở thêm 10 Mảnh Tướng Cam/tuần (300 KC) & Vé Làm Mới Thương Đội Cao Cấp",
    vipShopHighlightsEn:
      "Unlocks +10 Weekly Legendary Hero Shards (300 Diamonds) & Premium Caravan Ticket",
  },
  {
    level: 11,
    cumulativePoints: 50_000,
    deltaPoints: 20_000,
    cumulativeUsd: 8_333.33,
    vipLimit: 0,
    isGoldenBreakpoint: false,
    marchQueuesBonus: 0,
    dailyFreeGoldShards: 2,
    constructionResearchSpeedBonusPct: 40,
    effects: {
      1018: 150,
      1032: 300,
      10104: 800,
      1033: 1000,
      1178: 1,
      1022: 1200,
      1016: 1200,
      1034: 3000,
      1002: 2000,
      1127: 1,
      1167: 10,
      1010: 20,
      1143: 1,
      1057: 1000,
      1044: 2,
      1058: 1500,
      1014: 4000,
      1012: 4000,
      1052: 4000,
      1001: 4000,
      1094: 12,
      1185: 1,
      1194: 1,
      1189: 1,
      1196: 1,
      1220: 1,
      1237: 1,
      1238: 1,
    },
    dailyFreeItems: buildDailyFreeItems("legendary", 2, 5, 4, 4, 3),
    dailyFreeSummaryVi:
      "2 Mảnh Tướng Cam, 5 Rương Gỗ, 4 Rương Đá, 4 Rương Thịt, 3 Rương Ruby",
    dailyFreeSummaryEn:
      "2 Legendary Hero Shards, 5 Timber Chests, 4 Stone Chests, 4 Meat Chests, 3 Ruby Chests",
    vipPack: {
      exchangeId: 311,
      priceUsd: 99.99,
      priceVnd: 2_399_000,
      summaryVi:
        "8,000 KC, 80 Mảnh Tướng Cam, 200 Rương Tự Chọn TN Tím, 250 Gia Tốc 60p",
      summaryEn:
        "8,000 Diamonds, 80 Legendary Shards, 200 Epic Resource Chests, 250x 60m Speedups",
    },
    vipShopUnlocks: [],
    keyPerksVi: [
      "Tốc độ xây dựng đạt đỉnh +30% & Tốc độ nghiên cứu Công Nghệ +10%",
      "HP tất cả Lính +8%, Sức chứa lính mỗi phe +150, Bệnh Viện +300",
      "Sản lượng Đá/Gỗ, Tải trọng quân & Tốc độ thu thập +40%",
    ],
    keyPerksEn: [
      "Construction Speed reaches cap +30% & Tech Research Speed +10%",
      "All Soldiers HP +8%, Faction Soldier Cap +150, Hospital Cap +300",
      "Stone/Timber Output, Troop Load & Gathering Speed +40%",
    ],
    vipShopHighlightsVi: "Duy trì toàn bộ hạn mức Tiệm VIP bậc 10",
    vipShopHighlightsEn: "Maintains full Tier 10 VIP Shop catalog",
  },
  {
    level: 12,
    cumulativePoints: 80_000,
    deltaPoints: 30_000,
    cumulativeUsd: 13_333.33,
    vipLimit: 0,
    isGoldenBreakpoint: true,
    breakpointBadgeVi: "Mở Giới Hạn Xuất Chinh (+20)",
    breakpointBadgeEn: "March Size Bonus Unlock (+20)",
    marchQueuesBonus: 0,
    dailyFreeGoldShards: 2,
    constructionResearchSpeedBonusPct: 45,
    effects: {
      1019: 20,
      1018: 200,
      1032: 400,
      10104: 900,
      1033: 1500,
      1178: 1,
      1022: 1500,
      1016: 1500,
      1034: 3000,
      1002: 2000,
      1127: 1,
      1167: 10,
      1010: 20,
      1143: 1,
      1057: 1000,
      1044: 2,
      1058: 1700,
      1014: 4500,
      1012: 4500,
      1052: 4500,
      1001: 4500,
      1094: 12,
      1185: 1,
      1194: 1,
      1189: 1,
      1196: 1,
      1220: 1,
      1237: 1,
      1238: 1,
    },
    dailyFreeItems: buildDailyFreeItems("legendary", 2, 5, 5, 4, 3),
    dailyFreeSummaryVi:
      "2 Mảnh Tướng Cam, 5 Rương Gỗ, 5 Rương Đá, 4 Rương Thịt, 3 Rương Ruby",
    dailyFreeSummaryEn:
      "2 Legendary Hero Shards, 5 Timber Chests, 5 Stone Chests, 4 Meat Chests, 3 Ruby Chests",
    vipPack: {
      exchangeId: 312,
      priceUsd: 99.99,
      priceVnd: 2_399_000,
      summaryVi:
        "8,000 KC, 80 Mảnh Tướng Cam, 15 Đá Đột Phá Cam, 20,000 Rune Trang Bị",
      summaryEn:
        "8,000 Diamonds, 80 Legendary Shards, 15 Legendary Promotion Stones, 20,000 Gear Runes",
    },
    vipShopUnlocks: [],
    keyPerksVi: [
      "Mở khóa Giới Hạn Xuất Chinh (March Size) +20",
      "Tốc độ nghiên cứu Công Nghệ +15%, Huấn luyện lính & Trị liệu +15%",
      "HP tất cả Lính +9%, Sức chứa lính mỗi phe +200, Bệnh Viện +400",
    ],
    keyPerksEn: [
      "Unlocks March Size Capacity Bonus +20",
      "Tech Research Speed +15%, Troop Training & Healing Speed +15%",
      "All Soldiers HP +9%, Faction Soldier Cap +200, Hospital Cap +400",
    ],
    vipShopHighlightsVi: "Gói VIP 12 mở bán 15 Đá Đột Phá Cam & 20,000 Rune",
    vipShopHighlightsEn:
      "VIP 12 Pack features 15 Legendary Promotion Stones & 20,000 Gear Runes",
  },
  {
    level: 13,
    cumulativePoints: 120_000,
    deltaPoints: 40_000,
    cumulativeUsd: 20_000.0,
    vipLimit: 0,
    isGoldenBreakpoint: true,
    breakpointBadgeVi: "3 Mảnh Cam/Ngày & Giảm Thương Binh Thủ",
    breakpointBadgeEn: "3 Daily Legendary Shards & Defense Casualty Reduction",
    marchQueuesBonus: 0,
    dailyFreeGoldShards: 3,
    constructionResearchSpeedBonusPct: 50,
    effects: {
      1039: 500,
      1019: 20,
      1018: 200,
      1032: 400,
      10104: 1000,
      1033: 2000,
      1178: 1,
      1022: 1500,
      1016: 1500,
      1034: 3000,
      1002: 2000,
      1127: 1,
      1167: 10,
      1010: 20,
      1143: 1,
      1057: 1000,
      1044: 2,
      1058: 2000,
      1014: 5000,
      1012: 5000,
      1052: 5000,
      1001: 5000,
      1094: 12,
      1185: 1,
      1194: 1,
      1189: 1,
      1196: 1,
      1220: 1,
      1237: 1,
      1238: 1,
    },
    dailyFreeItems: buildDailyFreeItems("legendary", 3, 5, 5, 5, 4),
    dailyFreeSummaryVi:
      "3 Mảnh Tướng Cam, 5 Rương Gỗ, 5 Rương Đá, 5 Rương Thịt, 4 Rương Ruby",
    dailyFreeSummaryEn:
      "3 Legendary Hero Shards, 5 Timber Chests, 5 Stone Chests, 5 Meat Chests, 4 Ruby Chests",
    vipPack: {
      exchangeId: 313,
      priceUsd: 99.99,
      priceVnd: 2_399_000,
      summaryVi:
        "8,000 KC, 80 Mảnh Tướng Cam, 15 Đá Đột Phá Cam, 30,000 Rune Trang Bị",
      summaryEn:
        "8,000 Diamonds, 80 Legendary Shards, 15 Legendary Promotion Stones, 30,000 Gear Runes",
    },
    vipShopUnlocks: [],
    keyPerksVi: [
      "Quà miễn phí hàng ngày tăng lên 3 Mảnh Vạn Năng Anh Hùng Cam/ngày",
      "Mở khóa Giảm tỷ lệ thương binh phe ta khi phòng thủ +5%",
      "HP tất cả Lính +10%, Nghiên cứu +20%, Hồi năng lượng đạt đỉnh +20%",
    ],
    keyPerksEn: [
      "Daily free chest increases to 3 Universal Legendary Hero Shards/day",
      "Unlocks Friendly Defense Casualty Rate Reduction +5%",
      "All Soldiers HP +10%, Tech Research +20%, Stamina Recovery reaches +20%",
    ],
    vipShopHighlightsVi: "Gói VIP 13 nâng lên 30,000 Rune Trang Bị & 80 Mảnh Cam",
    vipShopHighlightsEn:
      "VIP 13 Pack upgrades to 30,000 Gear Runes & 80 Legendary Shards",
  },
  {
    level: 14,
    cumulativePoints: 160_000,
    deltaPoints: 40_000,
    cumulativeUsd: 26_666.67,
    vipLimit: 0,
    isGoldenBreakpoint: false,
    marchQueuesBonus: 0,
    dailyFreeGoldShards: 3,
    constructionResearchSpeedBonusPct: 55,
    effects: {
      1039: 500,
      1019: 40,
      1018: 200,
      1032: 400,
      10104: 1100,
      1033: 2500,
      1178: 1,
      1022: 1500,
      1016: 1500,
      1034: 3000,
      1002: 2000,
      1127: 1,
      1167: 10,
      1010: 20,
      1143: 1,
      1057: 1000,
      1044: 2,
      1058: 2000,
      1014: 5000,
      1012: 5000,
      1052: 5000,
      1001: 5000,
      1094: 17,
      1185: 1,
      1194: 1,
      1189: 1,
      1196: 1,
      1220: 1,
      1237: 1,
      1238: 1,
    },
    dailyFreeItems: buildDailyFreeItems("legendary", 3, 6, 5, 5, 4),
    dailyFreeSummaryVi:
      "3 Mảnh Tướng Cam, 6 Rương Gỗ, 5 Rương Đá, 5 Rương Thịt, 4 Rương Ruby",
    dailyFreeSummaryEn:
      "3 Legendary Hero Shards, 6 Timber Chests, 5 Stone Chests, 5 Meat Chests, 4 Ruby Chests",
    vipPack: {
      exchangeId: 314,
      priceUsd: 99.99,
      priceVnd: 2_399_000,
      summaryVi:
        "8,000 KC, 80 Mảnh Tướng Cam, 20 Đá Đột Phá Cam, 40,000 Rune Trang Bị",
      summaryEn:
        "8,000 Diamonds, 80 Legendary Shards, 20 Legendary Promotion Stones, 40,000 Gear Runes",
    },
    vipShopUnlocks: [],
    keyPerksVi: [
      "Giới Hạn Xuất Chinh tăng gấp đôi lên +40",
      "Tốc độ nghiên cứu Công Nghệ +25%, HP tất cả Lính +11%",
      "Số lần tiêu diệt Thủ Quân Ruby đạt đỉnh +17 lượt/ngày",
    ],
    keyPerksEn: [
      "March Size Capacity Bonus doubles to +40",
      "Tech Research Speed +25%, All Soldiers HP +11%",
      "Daily Ruby Guard Kill Limit reaches cap +17/day",
    ],
    vipShopHighlightsVi: "Gói VIP 14 mở bán 20 Đá Đột Phá Cam & 40,000 Rune",
    vipShopHighlightsEn:
      "VIP 14 Pack includes 20 Legendary Promotion Stones & 40,000 Gear Runes",
  },
  {
    level: 15,
    cumulativePoints: 200_000,
    deltaPoints: 40_000,
    cumulativeUsd: 33_333.33,
    vipLimit: 0,
    isGoldenBreakpoint: true,
    breakpointBadgeVi: "Đỉnh Tốc Độ Nghiên Cứu (+30%) & Xuất Chinh (+60)",
    breakpointBadgeEn: "Max Tech Speed (+30%) & March Size (+60)",
    marchQueuesBonus: 0,
    dailyFreeGoldShards: 3,
    constructionResearchSpeedBonusPct: 60,
    effects: {
      1039: 1000,
      1019: 60,
      1018: 200,
      1032: 400,
      10104: 1200,
      1033: 3000,
      1178: 1,
      1022: 1500,
      1016: 1500,
      1034: 3000,
      1002: 2000,
      1127: 1,
      1167: 10,
      1010: 20,
      1143: 1,
      1057: 1000,
      1044: 2,
      1058: 2000,
      1014: 5000,
      1012: 5000,
      1052: 5500,
      1001: 5500,
      1094: 17,
      1185: 1,
      1194: 1,
      1189: 1,
      1196: 1,
      1220: 1,
      1237: 1,
      1238: 1,
    },
    dailyFreeItems: buildDailyFreeItems("legendary", 3, 6, 6, 5, 4),
    dailyFreeSummaryVi:
      "3 Mảnh Tướng Cam, 6 Rương Gỗ, 6 Rương Đá, 5 Rương Thịt, 4 Rương Ruby",
    dailyFreeSummaryEn:
      "3 Legendary Hero Shards, 6 Timber Chests, 6 Stone Chests, 5 Meat Chests, 4 Ruby Chests",
    vipPack: {
      exchangeId: 315,
      priceUsd: 99.99,
      priceVnd: 2_399_000,
      summaryVi:
        "8,000 KC, 80 Mảnh Tướng Cam, 5 Đá Đột Phá Thần Thoại (Đỏ), 50,000 Rune",
      summaryEn:
        "8,000 Diamonds, 80 Legendary Shards, 5 Mythic Promotion Stones, 50,000 Gear Runes",
    },
    vipShopUnlocks: [],
    keyPerksVi: [
      "Tốc độ nghiên cứu Công Nghệ đạt đỉnh +30% & Giới Hạn Xuất Chinh đạt đỉnh +60",
      "Giảm tỷ lệ thương binh phe ta khi phòng thủ tăng lên +10%",
      "HP tất cả Lính +12%, Tải trọng quân & Tốc độ thu thập +55%",
    ],
    keyPerksEn: [
      "Tech Research Speed reaches +30% cap & March Size reaches +60 cap",
      "Friendly Defense Casualty Rate Reduction increased to +10%",
      "All Soldiers HP +12%, Troop Load & Gathering Speed +55%",
    ],
    vipShopHighlightsVi: "Gói VIP 15 mở 5 Đá Đột Phá Đỏ & 50,000 Rune Trang Bị",
    vipShopHighlightsEn:
      "VIP 15 Pack unlocks 5 Mythic Promotion Stones & 50,000 Gear Runes",
  },
  {
    level: 16,
    cumulativePoints: 300_000,
    deltaPoints: 100_000,
    cumulativeUsd: 50_000.0,
    vipLimit: 0,
    isGoldenBreakpoint: true,
    breakpointBadgeVi: "Đỉnh Chuẩn VIP 16 • 4 Mảnh Cam/Ngày & +15% HP Lính",
    breakpointBadgeEn: "Standard VIP 16 Pinnacle • 4 Daily Shards & +15% HP",
    marchQueuesBonus: 0,
    dailyFreeGoldShards: 4,
    constructionResearchSpeedBonusPct: 60,
    effects: {
      1039: 1500,
      1019: 60,
      1018: 300,
      1032: 600,
      10104: 1500,
      1033: 3000,
      1178: 1,
      1022: 1500,
      1016: 1500,
      1034: 3000,
      1002: 2000,
      1127: 1,
      1167: 10,
      1010: 20,
      1143: 1,
      1057: 1000,
      1044: 2,
      1058: 2000,
      1014: 5000,
      1012: 5000,
      1052: 5500,
      1001: 5500,
      1094: 17,
      1185: 1,
      1194: 1,
      1189: 1,
      1196: 1,
      1220: 1,
      1237: 1,
      1238: 1,
    },
    dailyFreeItems: buildDailyFreeItems("legendary", 4, 6, 6, 6, 5),
    dailyFreeSummaryVi:
      "4 Mảnh Tướng Cam, 6 Rương Gỗ, 6 Rương Đá, 6 Rương Thịt, 5 Rương Ruby",
    dailyFreeSummaryEn:
      "4 Legendary Hero Shards, 6 Timber Chests, 6 Stone Chests, 6 Meat Chests, 5 Ruby Chests",
    vipPack: {
      exchangeId: 316,
      priceUsd: 99.99,
      priceVnd: 2_399_000,
      summaryVi:
        "8,000 KC, 80 Mảnh Tướng Cam, 5 Đá Đột Phá Thần Thoại (Đỏ), 60,000 Rune",
      summaryEn:
        "8,000 Diamonds, 80 Legendary Shards, 5 Mythic Promotion Stones, 60,000 Gear Runes",
    },
    vipShopUnlocks: [],
    keyPerksVi: [
      "Quà miễn phí hàng ngày đạt đỉnh 4 Mảnh Vạn Năng Anh Hùng Cam/ngày",
      "HP tất cả Lính đạt đỉnh +15% & Giảm thương binh phòng thủ đạt đỉnh +15%",
      "Sức chứa lính mỗi phe +300 & Giới hạn sức chứa Bệnh Viện +600",
    ],
    keyPerksEn: [
      "Daily free chest reaches max 4 Universal Legendary Hero Shards/day",
      "All Soldiers HP reaches +15% cap & Defense Casualty Reduction +15% cap",
      "Faction Soldier Capacity +300 & Hospital Capacity +600",
    ],
    vipShopHighlightsVi: "Gói VIP 16 mở 5 Đá Đột Phá Đỏ & 60,000 Rune Trang Bị",
    vipShopHighlightsEn:
      "VIP 16 Pack includes 5 Mythic Promotion Stones & 60,000 Gear Runes",
  },
  {
    level: 17,
    cumulativePoints: 600_000,
    deltaPoints: 300_000,
    cumulativeUsd: 100_000.0,
    vipLimit: 15,
    isGoldenBreakpoint: false,
    marchQueuesBonus: 0,
    dailyFreeGoldShards: 4,
    constructionResearchSpeedBonusPct: 60,
    effects: {
      1141: 1,
      1039: 1500,
      1019: 60,
      1018: 400,
      1032: 1000,
      10104: 1500,
      1033: 3000,
      1178: 1,
      1022: 2000,
      1016: 1500,
      1034: 3000,
      1002: 2500,
      1127: 1,
      1167: 10,
      1010: 25,
      1143: 1,
      1057: 1000,
      1044: 2,
      1058: 2000,
      1014: 5000,
      1012: 5000,
      1052: 5500,
      1001: 5500,
      1094: 17,
      1185: 1,
      1194: 1,
      1189: 1,
      1196: 1,
      1220: 1,
      1237: 1,
      1238: 1,
    },
    dailyFreeItems: buildDailyFreeItems("legendary", 4, 7, 6, 6, 4),
    dailyFreeSummaryVi:
      "4 Mảnh Tướng Cam, 7 Rương Gỗ, 6 Rương Đá, 6 Rương Thịt, 4 Rương Ruby",
    dailyFreeSummaryEn:
      "4 Legendary Hero Shards, 7 Timber Chests, 6 Stone Chests, 6 Meat Chests, 4 Ruby Chests",
    freeMilestoneRewardVi:
      "Quà mốc miễn phí: 1 Hiệu ứng Ma Lực Pha Lê + 50 Rương Tự Chọn Tài Nguyên",
    freeMilestoneRewardEn:
      "Free Milestone Gift: 1 Crystal Magic Castle Effect + 50 Choice Resource Chests",
    vipPack: {
      exchangeId: 317,
      priceUsd: 99.99,
      priceVnd: 2_399_000,
      summaryVi:
        "8,000 KC, 100 Mảnh Vũ Khí Độc Quyền Vạn Năng, 2 Rương Vật Tổ Đỏ, 3 Rương Vật Tổ Cam",
      summaryEn:
        "8,000 Diamonds, 100 Universal Exclusive Weapon Shards, 2 Mythic & 3 Legendary Decor Chests",
    },
    vipShopUnlocks: [],
    keyPerksVi: [
      "Mở khóa Hiệu ứng Pháo Đài độc quyền VIP 17 (Ma Lực Pha Lê)",
      "Sức chứa Bệnh Viện +1,000, Sức chứa lính mỗi phe +400, Năng lượng tối đa +25",
      "Tốc độ trị liệu +20% & Tốc độ hành quân PvE +25%",
    ],
    keyPerksEn: [
      "Unlocks VIP 17 Exclusive Castle Visual Effect (Crystal Magic)",
      "Hospital Capacity +1,000, Faction Soldier Cap +400, Max Stamina +25",
      "Troop Healing Speed +20% & PvE March Speed +25%",
    ],
    vipShopHighlightsVi: "Gói VIP 17 mở 100 Mảnh VKĐQ Vạn Năng & Vật Tổ Đỏ",
    vipShopHighlightsEn:
      "VIP 17 Pack unlocks 100 Universal Exclusive Weapon Shards & Mythic Decors",
  },
  {
    level: 18,
    cumulativePoints: 1_000_000,
    deltaPoints: 400_000,
    cumulativeUsd: 166_666.67,
    vipLimit: 16,
    isGoldenBreakpoint: false,
    marchQueuesBonus: 0,
    dailyFreeGoldShards: 4,
    constructionResearchSpeedBonusPct: 60,
    effects: {
      1142: 1,
      1141: 1,
      1039: 1500,
      1019: 60,
      1018: 500,
      1032: 1500,
      10104: 1500,
      1033: 3000,
      1178: 1,
      1022: 2500,
      1016: 1500,
      1034: 3000,
      1002: 3000,
      1127: 1,
      1167: 10,
      1010: 30,
      1143: 1,
      1057: 1000,
      1044: 2,
      1058: 2000,
      1014: 5000,
      1012: 5000,
      1052: 5500,
      1001: 5500,
      1094: 17,
      1185: 1,
      1194: 1,
      1189: 1,
      1196: 1,
      1220: 1,
      1237: 1,
      1238: 1,
    },
    dailyFreeItems: buildDailyFreeItems("legendary", 4, 7, 7, 6, 5),
    dailyFreeSummaryVi:
      "4 Mảnh Tướng Cam, 7 Rương Gỗ, 7 Rương Đá, 6 Rương Thịt, 5 Rương Ruby",
    dailyFreeSummaryEn:
      "4 Legendary Hero Shards, 7 Timber Chests, 7 Stone Chests, 6 Meat Chests, 5 Ruby Chests",
    freeMilestoneRewardVi:
      "Quà mốc miễn phí: 1 Xu Thời Trang Độc Quyền + 60 Rương Tự Chọn Tài Nguyên",
    freeMilestoneRewardEn:
      "Free Milestone Gift: 1 Exclusive Skin Coin + 60 Choice Resource Chests",
    vipPack: {
      exchangeId: 318,
      priceUsd: 99.99,
      priceVnd: 2_399_000,
      summaryVi:
        "8,000 KC, 100 Mảnh Vũ Khí Độc Quyền Vạn Năng, 2 Rương Vật Tổ Đỏ, 3 Rương Vật Tổ Cam",
      summaryEn:
        "8,000 Diamonds, 100 Universal Exclusive Weapon Shards, 2 Mythic & 3 Legendary Decor Chests",
    },
    vipShopUnlocks: [],
    keyPerksVi: [
      "Mở khóa Skin Pháo Đài độc quyền VIP 18",
      "Sức chứa Bệnh Viện +1,500, Sức chứa lính mỗi phe +500, Năng lượng tối đa +30",
      "Tốc độ trị liệu +25% & Tốc độ hành quân PvE +30%",
    ],
    keyPerksEn: [
      "Unlocks VIP 18 Exclusive Castle Skin",
      "Hospital Capacity +1,500, Faction Soldier Cap +500, Max Stamina +30",
      "Troop Healing Speed +25% & PvE March Speed +30%",
    ],
    vipShopHighlightsVi: "Gói VIP 18 mở 100 Mảnh VKĐQ Vạn Năng & Vật Tổ Đỏ",
    vipShopHighlightsEn:
      "VIP 18 Pack includes 100 Universal Exclusive Weapon Shards & Mythic Decors",
  },
  {
    level: 19,
    cumulativePoints: 2_000_000,
    deltaPoints: 1_000_000,
    cumulativeUsd: 333_333.33,
    vipLimit: 17,
    isGoldenBreakpoint: false,
    marchQueuesBonus: 0,
    dailyFreeGoldShards: 4,
    constructionResearchSpeedBonusPct: 60,
    effects: {
      1142: 1,
      1141: 1,
      1252: 1,
      1039: 1500,
      1019: 60,
      1018: 600,
      1032: 2000,
      10104: 1500,
      1033: 3000,
      1178: 1,
      1022: 3000,
      1016: 1500,
      1034: 3000,
      1002: 3500,
      1127: 1,
      1167: 10,
      1010: 30,
      1143: 1,
      1057: 1000,
      1044: 2,
      1058: 2000,
      1014: 5000,
      1012: 5000,
      1052: 6000,
      1001: 5500,
      1094: 17,
      1185: 1,
      1194: 1,
      1189: 1,
      1196: 1,
      1220: 1,
      1237: 1,
      1238: 1,
    },
    dailyFreeItems: buildDailyFreeItems("legendary", 4, 7, 7, 7, 5),
    dailyFreeSummaryVi:
      "4 Mảnh Tướng Cam, 7 Rương Gỗ, 7 Rương Đá, 7 Rương Thịt, 5 Rương Ruby",
    dailyFreeSummaryEn:
      "4 Legendary Hero Shards, 7 Timber Chests, 7 Stone Chests, 7 Meat Chests, 5 Ruby Chests",
    freeMilestoneRewardVi:
      "Quà mốc miễn phí: 1 Skin Hành Quân Chiến Xa Pha Lê + 80 Rương Tự Chọn Tài Nguyên",
    freeMilestoneRewardEn:
      "Free Milestone Gift: 1 Crystal Chariot March Skin + 80 Choice Resource Chests",
    vipPack: {
      exchangeId: 319,
      priceUsd: 99.99,
      priceVnd: 2_399_000,
      summaryVi:
        "8,000 KC, 500 Tinh Chất Rồng (Dragon Essence), 2 Rương Vật Tổ Đỏ, 3 Rương Vật Tổ Cam",
      summaryEn:
        "8,000 Diamonds, 500 Dragon Essence, 2 Mythic & 3 Legendary Decor Chests",
    },
    vipShopUnlocks: [],
    keyPerksVi: [
      "Mở khóa Skin hành quân độc quyền VIP 19 (Chiến Xa Pha Lê)",
      "Sức chứa Bệnh Viện +2,000, Sức chứa lính mỗi phe +600, Tải trọng quân +60%",
      "Tốc độ trị liệu +30% & Tốc độ hành quân PvE +35%",
    ],
    keyPerksEn: [
      "Unlocks VIP 19 Exclusive March Skin (Crystal Chariot)",
      "Hospital Capacity +2,000, Faction Soldier Cap +600, Troop Load +60%",
      "Troop Healing Speed +30% & PvE March Speed +35%",
    ],
    vipShopHighlightsVi: "Gói VIP 19 mở bán 500 Tinh Chất Rồng & Vật Tổ Đỏ",
    vipShopHighlightsEn:
      "VIP 19 Pack unlocks 500 Dragon Essence & Mythic Decors",
  },
  {
    level: 20,
    cumulativePoints: 3_000_000,
    deltaPoints: 1_000_000,
    cumulativeUsd: 500_000.0,
    vipLimit: 18,
    isGoldenBreakpoint: true,
    breakpointBadgeVi: "Trần Tối Đa VIP 20 • Hào Quang & Vương Miện Pha Lê",
    breakpointBadgeEn: "VIP 20 Absolute Ceiling • Crystal Crown & Prestige Aura",
    marchQueuesBonus: 0,
    dailyFreeGoldShards: 4,
    constructionResearchSpeedBonusPct: 60,
    effects: {
      1142: 1,
      1141: 1,
      1252: 1,
      1253: 1,
      1039: 1500,
      1019: 60,
      1018: 700,
      1032: 2500,
      10104: 1500,
      1033: 3000,
      1178: 1,
      1022: 3500,
      1016: 1500,
      1034: 3000,
      1002: 4000,
      1127: 1,
      1167: 10,
      1010: 30,
      1143: 1,
      1057: 1000,
      1044: 2,
      1058: 2000,
      1014: 5000,
      1012: 5000,
      1052: 6500,
      1001: 5500,
      1094: 17,
      1185: 1,
      1194: 1,
      1189: 1,
      1196: 1,
      1220: 1,
      1237: 1,
      1238: 1,
    },
    dailyFreeItems: buildDailyFreeItems("legendary", 4, 8, 8, 7, 5),
    dailyFreeSummaryVi:
      "4 Mảnh Tướng Cam, 8 Rương Gỗ, 8 Rương Đá, 7 Rương Thịt, 5 Rương Ruby",
    dailyFreeSummaryEn:
      "4 Legendary Hero Shards, 8 Timber Chests, 8 Stone Chests, 7 Meat Chests, 5 Ruby Chests",
    freeMilestoneRewardVi:
      "Quà mốc miễn phí: 1 Skin Vương Miện Pha Lê + 5 Huy Hiệu Pha Lê + 100 Rương Tài Nguyên",
    freeMilestoneRewardEn:
      "Free Milestone Gift: 1 Crystal Crown Castle Skin + 5 Crystal Badges + 100 Resource Chests",
    vipPack: {
      exchangeId: 320,
      priceUsd: 99.99,
      priceVnd: 2_399_000,
      summaryVi:
        "8,000 KC, 500 Tinh Chất Rồng (Dragon Essence), 2 Rương Vật Tổ Đỏ, 3 Rương Vật Tổ Cam",
      summaryEn:
        "8,000 Diamonds, 500 Dragon Essence, 2 Mythic & 3 Legendary Decor Chests",
    },
    vipShopUnlocks: [],
    keyPerksVi: [
      "Mở khóa Hào quang và Skin Pháo Đài độc quyền VIP 20 (Vương Miện Pha Lê)",
      "Sức chứa Bệnh Viện +2,500, Sức chứa lính mỗi phe +700, Tải trọng quân +65%",
      "Tốc độ trị liệu +35% & Tốc độ hành quân PvE +40%",
    ],
    keyPerksEn: [
      "Unlocks VIP 20 Exclusive Castle Skin & Prestige Aura (Crystal Crown)",
      "Hospital Capacity +2,500, Faction Soldier Cap +700, Troop Load +65%",
      "Troop Healing Speed +35% & PvE March Speed +40%",
    ],
    vipShopHighlightsVi: "Gói VIP 20 mở bán 500 Tinh Chất Rồng & Vật Tổ Đỏ",
    vipShopHighlightsEn:
      "VIP 20 Pack unlocks 500 Dragon Essence & Mythic Decors",
  },
] as const;

export function getVipLevelFromPoints(points: number): number {
  const safePoints = Math.max(
    0,
    Math.floor(Number.isFinite(points) ? points : 0)
  );
  for (let lvl = VIP_LEVEL_TABLE.length - 1; lvl >= 0; lvl -= 1) {
    if (safePoints >= VIP_LEVEL_TABLE[lvl].cumulativePoints) {
      return lvl;
    }
  }
  return 0;
}

export function vipPointsToSliderRatio(
  points: number,
  maxLevel: number = VIP_STANDARD_MAX_LEVEL
): number {
  const safeMaxLevel = Math.max(
    1,
    Math.min(VIP_EXTENDED_MAX_LEVEL, Math.floor(maxLevel))
  );
  const maxPoints = VIP_LEVEL_TABLE[safeMaxLevel].cumulativePoints;
  const safePoints = Math.max(
    0,
    Math.min(maxPoints, Number.isFinite(points) ? points : 0)
  );
  if (safePoints >= maxPoints) {
    return 1;
  }

  let segmentIndex = 0;
  for (let lvl = safeMaxLevel - 1; lvl >= 0; lvl -= 1) {
    if (safePoints >= VIP_LEVEL_TABLE[lvl].cumulativePoints) {
      segmentIndex = lvl;
      break;
    }
  }

  const startPts = VIP_LEVEL_TABLE[segmentIndex].cumulativePoints;
  const endPts = VIP_LEVEL_TABLE[segmentIndex + 1].cumulativePoints;
  const segmentFraction =
    (safePoints - startPts) / Math.max(1, endPts - startPts);

  return (segmentIndex + segmentFraction) / safeMaxLevel;
}

export function sliderRatioToVipPoints(
  ratio: number,
  maxLevel: number = VIP_STANDARD_MAX_LEVEL
): number {
  const safeMaxLevel = Math.max(
    1,
    Math.min(VIP_EXTENDED_MAX_LEVEL, Math.floor(maxLevel))
  );
  const safeRatio = Math.max(
    0,
    Math.min(1, Number.isFinite(ratio) ? ratio : 0)
  );
  if (safeRatio >= 1) {
    return VIP_LEVEL_TABLE[safeMaxLevel].cumulativePoints;
  }

  const scaled = safeRatio * safeMaxLevel;
  const segmentIndex = Math.min(safeMaxLevel - 1, Math.floor(scaled));
  const segmentFraction = scaled - segmentIndex;
  const startPts = VIP_LEVEL_TABLE[segmentIndex].cumulativePoints;
  const endPts = VIP_LEVEL_TABLE[segmentIndex + 1].cumulativePoints;

  return Math.round(startPts + segmentFraction * (endPts - startPts));
}

export function stepVipLevel(
  points: number,
  deltaLevel: number,
  maxLevel: number = VIP_STANDARD_MAX_LEVEL
): number {
  const safeMaxLevel = Math.max(
    1,
    Math.min(VIP_EXTENDED_MAX_LEVEL, Math.floor(maxLevel))
  );
  const maxPoints = VIP_LEVEL_TABLE[safeMaxLevel].cumulativePoints;
  const safePoints = Math.max(
    0,
    Math.min(maxPoints, Math.floor(Number.isFinite(points) ? points : 0))
  );
  const currentLevel = Math.min(safeMaxLevel, getVipLevelFromPoints(safePoints));
  const currentLevelBasePts = VIP_LEVEL_TABLE[currentLevel].cumulativePoints;

  if (deltaLevel > 0) {
    const targetLevel = Math.min(safeMaxLevel, currentLevel + deltaLevel);
    return VIP_LEVEL_TABLE[targetLevel].cumulativePoints;
  }
  if (deltaLevel < 0) {
    if (safePoints > currentLevelBasePts) {
      const targetLevel = Math.max(0, currentLevel + deltaLevel + 1);
      return VIP_LEVEL_TABLE[targetLevel].cumulativePoints;
    }
    const targetLevel = Math.max(0, currentLevel + deltaLevel);
    return VIP_LEVEL_TABLE[targetLevel].cumulativePoints;
  }
  return safePoints;
}

export function formatVipAttributeValue(
  attr: VipAttributeDefinition,
  rawValue: number,
  locale: CalculatorLocale
): string {
  if (rawValue <= 0) {
    return "0";
  }
  if (attr.valueType === "percent") {
    const pct = rawValue / 100;
    const formattedPct = Number.isInteger(pct) ? String(pct) : pct.toFixed(1);
    return `+${formattedPct}%`;
  }
  if (attr.valueType === "flat") {
    return `+${rawValue.toLocaleString("en-US")}`;
  }
  return locale === "vi" ? "Đã mở khóa" : "Unlocked";
}

export interface VipStatComparisonRow {
  readonly attribute: VipAttributeDefinition;
  readonly fromRawValue: number;
  readonly toRawValue: number;
  readonly deltaRawValue: number;
  readonly fromFormattedVi: string;
  readonly fromFormattedEn: string;
  readonly toFormattedVi: string;
  readonly toFormattedEn: string;
  readonly deltaFormattedVi: string;
  readonly deltaFormattedEn: string;
  readonly isNewlyUnlocked: boolean;
  readonly isIncreased: boolean;
}

export interface VipGoldBrickEquivalent {
  readonly amount: number;
  readonly currencyCode: "VND" | "USD";
  readonly symbol: "₫" | "$";
  readonly optimalPacksCount: number;
  readonly optimalPackSpendAmount: number;
}

export interface VipProgressionResult {
  readonly fromVip: VipLevelDefinition;
  readonly toVip: VipLevelDefinition;
  readonly fromPoints: number;
  readonly toPoints: number;
  readonly currentVipPoints: number;
  readonly pointsNeeded: number;
  readonly equivalentUsdNeeded: number;
  readonly equivalentGoldBrick: VipGoldBrickEquivalent;
  readonly equivalentDiamondsNeeded: number;
  readonly freeGuildShopWeeksNeeded: number;
  readonly progressPercent: number;
  readonly newlyUnlockedLevels: readonly VipLevelDefinition[];
  readonly goldenBreakpointsInRange: readonly VipLevelDefinition[];
  readonly statComparisons: readonly VipStatComparisonRow[];
}

export interface CalculateVipProgressionInput {
  readonly fromPoints?: number;
  readonly toPoints?: number;
  readonly fromLevel?: number;
  readonly toLevel?: number;
  readonly customCurrentPoints?: number;
  readonly locale?: CalculatorLocale;
}

export function calculateVipProgression(
  input: CalculateVipProgressionInput
): VipProgressionResult {
  const maxAllowedPoints =
    VIP_LEVEL_TABLE[VIP_EXTENDED_MAX_LEVEL].cumulativePoints;

  let resolvedFromPoints: number;
  let resolvedToPoints: number;

  if (input.fromPoints !== undefined || input.toPoints !== undefined) {
    const rawFrom = input.fromPoints ?? 0;
    const rawTo = input.toPoints ?? rawFrom;
    resolvedFromPoints = Math.max(
      0,
      Math.min(
        maxAllowedPoints,
        Math.floor(Number.isFinite(rawFrom) ? rawFrom : 0)
      )
    );
    resolvedToPoints = Math.max(
      resolvedFromPoints,
      Math.min(
        maxAllowedPoints,
        Math.floor(Number.isFinite(rawTo) ? rawTo : resolvedFromPoints)
      )
    );
  } else {
    const safeFromIdx = Math.max(
      0,
      Math.min(VIP_EXTENDED_MAX_LEVEL, Math.floor(input.fromLevel ?? 0))
    );
    const safeToIdx = Math.max(
      safeFromIdx,
      Math.min(VIP_EXTENDED_MAX_LEVEL, Math.floor(input.toLevel ?? safeFromIdx))
    );
    const basePoints = VIP_LEVEL_TABLE[safeFromIdx].cumulativePoints;
    resolvedFromPoints =
      input.customCurrentPoints !== undefined &&
      Number.isFinite(input.customCurrentPoints) &&
      input.customCurrentPoints >= 0
        ? Math.min(maxAllowedPoints, Math.floor(input.customCurrentPoints))
        : basePoints;
    resolvedToPoints = Math.max(
      resolvedFromPoints,
      VIP_LEVEL_TABLE[safeToIdx].cumulativePoints
    );
  }

  const fromLevelIdx = getVipLevelFromPoints(resolvedFromPoints);
  const toLevelIdx = getVipLevelFromPoints(resolvedToPoints);

  const fromVip = VIP_LEVEL_TABLE[fromLevelIdx];
  const toVip = VIP_LEVEL_TABLE[toLevelIdx];

  const pointsNeeded = Math.max(0, resolvedToPoints - resolvedFromPoints);
  const equivalentUsdNeeded = Number(
    (pointsNeeded / VIP_POINTS_PER_USD).toFixed(2)
  );

  const locale: CalculatorLocale = input.locale ?? "vi";
  const optimalPacksCount =
    pointsNeeded > 0 ? Math.ceil(pointsNeeded / VIP_OPTIMAL_PACK_POINTS) : 0;

  const equivalentGoldBrick: VipGoldBrickEquivalent =
    locale === "vi"
      ? {
          amount: pointsNeeded * VIP_GOLD_BRICK_VND_PER_POINT,
          currencyCode: "VND",
          symbol: "₫",
          optimalPacksCount,
          optimalPackSpendAmount: optimalPacksCount * VIP_OPTIMAL_PACK_VND,
        }
      : {
          amount: equivalentUsdNeeded,
          currencyCode: "USD",
          symbol: "$",
          optimalPacksCount,
          optimalPackSpendAmount: Number(
            (optimalPacksCount * VIP_OPTIMAL_PACK_USD).toFixed(2)
          ),
        };

  const equivalentDiamondsNeeded = pointsNeeded;
  const freeGuildShopWeeksNeeded =
    pointsNeeded > 0
      ? Math.ceil(pointsNeeded / FREE_GUILD_SHOP_VIP_POINTS_PER_WEEK)
      : 0;

  const progressPercent =
    resolvedToPoints === 0
      ? 100
      : Math.min(100, Math.round((resolvedFromPoints / resolvedToPoints) * 100));

  const newlyUnlockedLevels = VIP_LEVEL_TABLE.slice(
    fromLevelIdx + 1,
    toLevelIdx + 1
  );
  const goldenBreakpointsInRange = newlyUnlockedLevels.filter(
    (lvl) => lvl.isGoldenBreakpoint
  );

  const statComparisons: VipStatComparisonRow[] = VIP_ATTRIBUTES.map((attr) => {
    const fromRawValue = fromVip.effects[attr.id] ?? 0;
    const toRawValue = toVip.effects[attr.id] ?? 0;
    const deltaRawValue = Math.max(0, toRawValue - fromRawValue);
    const isNewlyUnlocked = fromRawValue === 0 && toRawValue > 0;
    const isIncreased = toRawValue > fromRawValue;

    return {
      attribute: attr,
      fromRawValue,
      toRawValue,
      deltaRawValue,
      fromFormattedVi: formatVipAttributeValue(attr, fromRawValue, "vi"),
      fromFormattedEn: formatVipAttributeValue(attr, fromRawValue, "en"),
      toFormattedVi: formatVipAttributeValue(attr, toRawValue, "vi"),
      toFormattedEn: formatVipAttributeValue(attr, toRawValue, "en"),
      deltaFormattedVi:
        attr.valueType === "unlock"
          ? isNewlyUnlocked
            ? "Mới mở khóa"
            : "Đã có"
          : formatVipAttributeValue(attr, deltaRawValue, "vi"),
      deltaFormattedEn:
        attr.valueType === "unlock"
          ? isNewlyUnlocked
            ? "Newly Unlocked"
            : "Active"
          : formatVipAttributeValue(attr, deltaRawValue, "en"),
      isNewlyUnlocked,
      isIncreased,
    };
  }).filter((row) => row.toRawValue > 0 || row.fromRawValue > 0);

  return {
    fromVip,
    toVip,
    fromPoints: resolvedFromPoints,
    toPoints: resolvedToPoints,
    currentVipPoints: resolvedFromPoints,
    pointsNeeded,
    equivalentUsdNeeded,
    equivalentGoldBrick,
    equivalentDiamondsNeeded,
    freeGuildShopWeeksNeeded,
    progressPercent,
    newlyUnlockedLevels,
    goldenBreakpointsInRange,
    statComparisons,
  };
}

export const GUILD_HONOR_FULL_AWAKENING_FLOOR = 360_000;
export const GUILD_HONOR_WEEKLY_SINGLE_STONE_FLOOR = 40_000;

export const SEASON1_GLORY_COIN_FULL_AWAKENING_FLOOR = 54_000;
export const SEASON1_GLORY_COIN_WEEKLY_SINGLE_STONE_FLOOR = 6_000;

export interface FactionAwakeningRequirement {
  readonly id: FactionAwakeningPlan;
  readonly nameVi: string;
  readonly nameEn: string;
  readonly heroesVi: string;
  readonly heroesEn: string;
  readonly totalSoulStones: number;
  readonly totalGuildHonorCost: number;
  readonly totalSeason1GloryCoins: number;
  readonly minWeeksAtOnePerWeek: number;
}

export const FACTION_AWAKENING_PLANS: readonly FactionAwakeningRequirement[] = [
  {
    id: "horde",
    nameVi: "Hệ Bộ Tộc (Horde — 1 Tướng Thức Tỉnh)",
    nameEn: "Horde Main (1 Awakened Hero)",
    heroesVi: "Hồn Pháp Sư (Soulmancer) hoặc Thuật Sĩ (Warlock)",
    heroesEn: "Soulmancer or Warlock",
    totalSoulStones: 9,
    totalGuildHonorCost: 360_000,
    totalSeason1GloryCoins: 54_000,
    minWeeksAtOnePerWeek: 9,
  },
  {
    id: "nature",
    nameVi: "Hệ Thiên Nhiên (Nature — 2 Tướng Thức Tỉnh)",
    nameEn: "Nature Main (2 Awakened Heroes)",
    heroesVi: "Tiểu Tiên (Pixie) + Hiền Giả (Sage)",
    heroesEn: "Pixie + Sage",
    totalSoulStones: 18,
    totalGuildHonorCost: 720_000,
    totalSeason1GloryCoins: 108_000,
    minWeeksAtOnePerWeek: 18,
  },
  {
    id: "league_dual",
    nameVi: "Hệ Liên Minh Tiêu Chuẩn (2 Tướng Thức Tỉnh)",
    nameEn: "League Standard (2 Awakened Heroes)",
    heroesVi: "Hỏa Pháp Sư (Pyromancer) + Phán Quyết Giả (Adjudicator)",
    heroesEn: "Pyromancer + Adjudicator",
    totalSoulStones: 18,
    totalGuildHonorCost: 720_000,
    totalSeason1GloryCoins: 108_000,
    minWeeksAtOnePerWeek: 18,
  },
  {
    id: "league_triple",
    nameVi: "Hệ Liên Minh Hoàn Chỉnh (3 Tướng Thức Tỉnh)",
    nameEn: "League Full Core (3 Awakened Heroes)",
    heroesVi: "Hỏa Pháp Sư + Phán Quyết Giả + Nữ Tu (Nun)",
    heroesEn: "Pyromancer + Adjudicator + Nun",
    totalSoulStones: 27,
    totalGuildHonorCost: 1_080_000,
    totalSeason1GloryCoins: 162_000,
    minWeeksAtOnePerWeek: 27,
  },
] as const;

export interface GuildHonorShopItem {
  readonly id: string;
  readonly gameId: number;
  readonly nameVi: string;
  readonly nameEn: string;
  readonly iconPath: string;
  readonly rarity: AssetRarity;
  readonly unitHonorCost: number;
  readonly unitSeason1CoinCost: number;
  readonly weeklyLimit: number;
  readonly priorityTier: "S++" | "S+" | "A" | "B" | "F_TRAP";
  readonly defaultCartQty: number;
  readonly guidanceVi: string;
  readonly guidanceEn: string;
}

export const GUILD_HONOR_SHOP_ITEMS: readonly GuildHonorShopItem[] = [
  {
    id: "soul_stone_weekly",
    gameId: CALCULATOR_MATERIALS.leagueSoulStone.gameId,
    nameVi: "Đá Linh Hồn (Rương Tự Chọn / Theo Phe)",
    nameEn: "Soul Stone (Choice Chest / Faction)",
    iconPath: CALCULATOR_MATERIALS.leagueSoulStone.iconPath,
    rarity: "mythic",
    unitHonorCost: 40_000,
    unitSeason1CoinCost: 6_000,
    weeklyLimit: 1,
    priorityTier: "S++",
    defaultCartQty: 1,
    guidanceVi:
      "BẮT BUỘC MUA 1 VIÊN/TUẦN ngay khi Lâu Đài đạt Cấp 30. Chậm 1 tuần là chậm Thức Tỉnh Đỏ 7 ngày!",
    guidanceEn:
      "MANDATORY 1/WEEK at Castle Lv.30. Missing 1 week delays Mythic Awakening by 7 days!",
  },
  {
    id: "legendary_hero_shard_honor",
    gameId: CALCULATOR_MATERIALS.legendaryUniversalHeroShard.gameId,
    nameVi: CALCULATOR_MATERIALS.legendaryUniversalHeroShard.nameVi,
    nameEn: CALCULATOR_MATERIALS.legendaryUniversalHeroShard.nameEn,
    iconPath: CALCULATOR_MATERIALS.legendaryUniversalHeroShard.iconPath,
    rarity: "legendary",
    unitHonorCost: 3_000,
    unitSeason1CoinCost: 500,
    weeklyLimit: 10,
    priorityTier: "S+",
    defaultCartQty: 10,
    guidanceVi:
      "Chỉ mua bằng phần lãi dôi ra SAU KHI đã bảo toàn Sàn Đóng Băng 9 Đá Linh Hồn (360,000 Vinh Quang Hội / 54,000 Xu S1).",
    guidanceEn:
      "Only buy with surplus AFTER securing the 9-Soul-Stone Freeze Floor (360,000 Honor / 54,000 S1 Coins).",
  },
  {
    id: "exclusive_gear_shard_honor",
    gameId: CALCULATOR_MATERIALS.universalExclusiveGearShard.gameId,
    nameVi: CALCULATOR_MATERIALS.universalExclusiveGearShard.nameVi,
    nameEn: CALCULATOR_MATERIALS.universalExclusiveGearShard.nameEn,
    iconPath: CALCULATOR_MATERIALS.universalExclusiveGearShard.iconPath,
    rarity: "legendary",
    unitHonorCost: 4_000,
    unitSeason1CoinCost: 600,
    weeklyLimit: 10,
    priorityTier: "A",
    defaultCartQty: 0,
    guidanceVi:
      "Ưu tiên số 2 sau Mảnh Tướng Cam khi quỹ Vinh Quang Hội vượt trên mốc Sàn Đóng Băng.",
    guidanceEn:
      "Second priority after Legendary Shards once wallet exceeds the Freeze Floor.",
  },
  {
    id: "arcane_crystal_honor",
    gameId: CALCULATOR_MATERIALS.arcaneCrystal.gameId,
    nameVi: CALCULATOR_MATERIALS.arcaneCrystal.nameVi,
    nameEn: CALCULATOR_MATERIALS.arcaneCrystal.nameEn,
    iconPath: CALCULATOR_MATERIALS.arcaneCrystal.iconPath,
    rarity: "mythic",
    unitHonorCost: 2_000,
    unitSeason1CoinCost: 300,
    weeklyLimit: 20,
    priorityTier: "B",
    defaultCartQty: 0,
    guidanceVi:
      "Phục vụ nâng cấp Bí Bảo vào Ngày 1–2 GAR/KvK; không được phép lẹm vào quỹ Đá Linh Hồn.",
    guidanceEn:
      "Used for Relic upgrades on Days 1–2; never dip into your Soul Stone reserve.",
  },
  {
    id: "peace_shield_honor",
    gameId: 202001,
    nameVi: "Khiên Hòa Bình (Peace Shield)",
    nameEn: "Peace Shield",
    iconPath: "/images/items/consumables/icon_30056.webp",
    rarity: "epic",
    unitHonorCost: 2_500,
    unitSeason1CoinCost: 400,
    weeklyLimit: 5,
    priorityTier: "A",
    defaultCartQty: 0,
    guidanceVi:
      "Dự phòng ít nhất 1–2 Khiên cho Thứ Bảy Ngày 6 (Chiến Sự Liên Server KvK) để tránh cháy nhà mất lính.",
    guidanceEn:
      "Keep 1–2 Shields in bag for Saturday Day 6 (KvK Kill Event) to prevent zeroing.",
  },
  {
    id: "universal_legendary_troop_skin_trap",
    gameId: 220303,
    nameVi: "Quân Trang Vạn Năng Cam (CẢNH BÁO BẪY!)",
    nameEn: "Universal Legendary Troop Skin (TRAP WARNING!)",
    iconPath: "/images/items/consumables/icon_30566.webp",
    rarity: "legendary",
    unitHonorCost: 72_000,
    unitSeason1CoinCost: 12_000,
    weeklyLimit: 1,
    priorityTier: "F_TRAP",
    defaultCartQty: 0,
    guidanceVi:
      "BẪY NGHIÊM TRỌNG: Vật phẩm này CHỈ dùng để nâng sao Quân Trang Cam đã có, KHÔNG mở khóa được Quân Trang Cam mới!",
    guidanceEn:
      "CRITICAL TRAP: Only upgrades star level of an ALREADY OWNED Legendary Troop Skin; CANNOT unlock a new skin!",
  },
] as const;

export type HonorBudgetHealthStatus =
  | "SAFE_ABOVE_FULL_FLOOR"
  | "WARN_BELOW_FULL_FLOOR"
  | "CRITICAL_BELOW_SINGLE_STONE_OR_NO_STONE";

export interface GuildHonorBudgetResult {
  readonly currencyEra: GuildShopCurrencyEra;
  readonly currentHonor: number;
  readonly weeklyIncome: number;
  readonly totalAvailableHonor: number;
  readonly safetyFloorMode: HonorSafetyFloorMode;
  readonly fullAwakeningFloor: number;
  readonly singleStoneFloor: number;
  readonly activeSafetyFloor: number;
  readonly factionPlan: FactionAwakeningRequirement;
  readonly ownedSoulStones: number;
  readonly remainingSoulStonesForPlan: number;
  readonly remainingCurrencyForPlan: number;
  readonly weeksToCompleteAwakeningPlan: number;
  readonly cartItems: readonly {
    readonly item: GuildHonorShopItem;
    readonly quantity: number;
    readonly unitCost: number;
    readonly subtotalCost: number;
  }[];
  readonly totalCartCost: number;
  readonly remainingAfterCart: number;
  readonly spendableSurplusAboveFullFloor: number;
  readonly spendableSurplusAboveSingleFloor: number;
  readonly hasSoulStoneInCart: boolean;
  readonly hasTroopSkinTrapInCart: boolean;
  readonly healthStatus: HonorBudgetHealthStatus;
}

export function getSoulStoneMaterialForPlan(planId: FactionAwakeningPlan) {
  if (planId === "horde") {
    return CALCULATOR_MATERIALS.hordeSoulStone;
  }
  if (planId === "nature") {
    return CALCULATOR_MATERIALS.natureSoulStone;
  }
  return CALCULATOR_MATERIALS.leagueSoulStone;
}

export function calculateGuildHonorBudget(input: {
  readonly currencyEra?: GuildShopCurrencyEra;
  readonly currentHonor: number;
  readonly weeklyIncome: number;
  readonly safetyFloorMode: HonorSafetyFloorMode;
  readonly factionPlanId: FactionAwakeningPlan;
  readonly ownedSoulStones: number;
  readonly cartQuantities: Readonly<Record<string, number>>;
}): GuildHonorBudgetResult {
  const currencyEra: GuildShopCurrencyEra =
    input.currencyEra ?? "pre_season_honor";
  const isSeason1 = currencyEra === "season1_glory_coin";

  const fullAwakeningFloor = isSeason1
    ? SEASON1_GLORY_COIN_FULL_AWAKENING_FLOOR
    : GUILD_HONOR_FULL_AWAKENING_FLOOR;
  const singleStoneFloor = isSeason1
    ? SEASON1_GLORY_COIN_WEEKLY_SINGLE_STONE_FLOOR
    : GUILD_HONOR_WEEKLY_SINGLE_STONE_FLOOR;

  const activeSafetyFloor =
    input.safetyFloorMode === "full_awakening_9_stones"
      ? fullAwakeningFloor
      : singleStoneFloor;

  const currentHonor = Math.max(0, Math.floor(input.currentHonor || 0));
  const weeklyIncome = Math.max(0, Math.floor(input.weeklyIncome || 0));
  const totalAvailableHonor = currentHonor + weeklyIncome;

  const factionPlan =
    FACTION_AWAKENING_PLANS.find((p) => p.id === input.factionPlanId) ??
    FACTION_AWAKENING_PLANS[0];

  const ownedSoulStones = Math.max(
    0,
    Math.min(
      factionPlan.totalSoulStones,
      Math.floor(input.ownedSoulStones || 0)
    )
  );
  const remainingSoulStonesForPlan = Math.max(
    0,
    factionPlan.totalSoulStones - ownedSoulStones
  );
  const remainingCurrencyForPlan = remainingSoulStonesForPlan * singleStoneFloor;

  const planSoulStone = getSoulStoneMaterialForPlan(input.factionPlanId);
  const cartItems = GUILD_HONOR_SHOP_ITEMS.map((baseItem) => {
    const item: GuildHonorShopItem =
      baseItem.id === "soul_stone_weekly"
        ? {
            ...baseItem,
            gameId: planSoulStone.gameId,
            iconPath: planSoulStone.iconPath,
          }
        : baseItem;
    const rawQty = input.cartQuantities[item.id] ?? 0;
    const quantity = Math.max(
      0,
      Math.min(
        item.weeklyLimit,
        Math.floor(Number.isFinite(rawQty) ? rawQty : 0)
      )
    );
    const unitCost = isSeason1 ? item.unitSeason1CoinCost : item.unitHonorCost;
    return {
      item,
      quantity,
      unitCost,
      subtotalCost: quantity * unitCost,
    };
  });

  const totalCartCost = cartItems.reduce(
    (sum, row) => sum + row.subtotalCost,
    0
  );
  const remainingAfterCart = totalAvailableHonor - totalCartCost;

  const spendableSurplusAboveFullFloor = Math.max(
    0,
    totalAvailableHonor - fullAwakeningFloor
  );
  const spendableSurplusAboveSingleFloor = Math.max(
    0,
    totalAvailableHonor - singleStoneFloor
  );

  const soulStoneRow = cartItems.find((r) => r.item.id === "soul_stone_weekly");
  const hasSoulStoneInCart = (soulStoneRow?.quantity ?? 0) >= 1;

  const trapRow = cartItems.find(
    (r) => r.item.id === "universal_legendary_troop_skin_trap"
  );
  const hasTroopSkinTrapInCart = (trapRow?.quantity ?? 0) >= 1;

  let healthStatus: HonorBudgetHealthStatus = "SAFE_ABOVE_FULL_FLOOR";
  if (
    remainingAfterCart < singleStoneFloor ||
    (!hasSoulStoneInCart && remainingSoulStonesForPlan > 0)
  ) {
    healthStatus = "CRITICAL_BELOW_SINGLE_STONE_OR_NO_STONE";
  } else if (remainingAfterCart < fullAwakeningFloor) {
    healthStatus = "WARN_BELOW_FULL_FLOOR";
  }

  return {
    currencyEra,
    currentHonor,
    weeklyIncome,
    totalAvailableHonor,
    safetyFloorMode: input.safetyFloorMode,
    fullAwakeningFloor,
    singleStoneFloor,
    activeSafetyFloor,
    factionPlan,
    ownedSoulStones,
    remainingSoulStonesForPlan,
    remainingCurrencyForPlan,
    weeksToCompleteAwakeningPlan: remainingSoulStonesForPlan,
    cartItems,
    totalCartCost,
    remainingAfterCart,
    spendableSurplusAboveFullFloor,
    spendableSurplusAboveSingleFloor,
    hasSoulStoneInCart,
    hasTroopSkinTrapInCart,
    healthStatus,
  };
}

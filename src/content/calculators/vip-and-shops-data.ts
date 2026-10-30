import type { AssetRarity } from "@/content/guides/types";
import { CALCULATOR_MATERIALS } from "./registry";

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

export interface VipLevelDefinition {
  readonly level: number;
  readonly cumulativePoints: number;
  readonly cumulativeUsd: number;
  readonly isGoldenBreakpoint: boolean;
  readonly breakpointBadgeVi?: string;
  readonly breakpointBadgeEn?: string;
  readonly marchQueuesBonus: number;
  readonly dailyFreeGoldShards: number;
  readonly constructionResearchSpeedBonusPct: number;
  readonly keyPerksVi: readonly string[];
  readonly keyPerksEn: readonly string[];
  readonly vipShopHighlightsVi: string;
  readonly vipShopHighlightsEn: string;
}

export const VIP_POINTS_PER_USD = 6;
export const FREE_GUILD_SHOP_VIP_POINTS_PER_WEEK = 1_000;
export const VIP_POINT_ICON_PATH = "/images/items/consumables/icon_30371.webp";

export const VIP_LEVEL_TABLE: readonly VipLevelDefinition[] = [
  {
    level: 0,
    cumulativePoints: 0,
    cumulativeUsd: 0,
    isGoldenBreakpoint: false,
    marchQueuesBonus: 0,
    dailyFreeGoldShards: 0,
    constructionResearchSpeedBonusPct: 0,
    keyPerksVi: ["Mốc khởi điểm mặc định khi tạo tài khoản"],
    keyPerksEn: ["Default starting tier upon account creation"],
    vipShopHighlightsVi: "Chưa mở khóa gói ưu đãi bậc cao",
    vipShopHighlightsEn: "High-tier VIP Shop slots locked",
  },
  {
    level: 1,
    cumulativePoints: 6,
    cumulativeUsd: 1.0,
    isGoldenBreakpoint: false,
    marchQueuesBonus: 0,
    dailyFreeGoldShards: 0,
    constructionResearchSpeedBonusPct: 5,
    keyPerksVi: [
      "Tăng +5% tốc độ Xây Dựng & Nghiên Cứu cơ bản",
      "Mở rương quà VIP hàng ngày bậc 1",
    ],
    keyPerksEn: [
      "+5% base Construction & Research speed",
      "Unlocks Tier 1 daily VIP chest",
    ],
    vipShopHighlightsVi: "Mở Tiệm VIP bậc 1 (Gỗ, Đá, Thịt cơ bản)",
    vipShopHighlightsEn: "Tier 1 VIP Shop (Basic Timber, Stone, Meat)",
  },
  {
    level: 2,
    cumulativePoints: 30,
    cumulativeUsd: 5.0,
    isGoldenBreakpoint: false,
    marchQueuesBonus: 0,
    dailyFreeGoldShards: 0,
    constructionResearchSpeedBonusPct: 7,
    keyPerksVi: [
      "Tăng giới hạn mua Thể Lực hàng ngày",
      "Tăng tốc độ hồi phục Thể Lực Lãnh Chúa",
    ],
    keyPerksEn: [
      "Increases daily Stamina purchase cap",
      "Faster Lord Stamina recovery",
    ],
    vipShopHighlightsVi: "Mở bán Gia Tốc 5 phút giảm giá",
    vipShopHighlightsEn: "Discounted 5m Speed-ups unlocked",
  },
  {
    level: 3,
    cumulativePoints: 100,
    cumulativeUsd: 16.67,
    isGoldenBreakpoint: false,
    marchQueuesBonus: 0,
    dailyFreeGoldShards: 0,
    constructionResearchSpeedBonusPct: 10,
    keyPerksVi: [
      "Tăng sản lượng tài nguyên nội thành",
      "Tăng tốc độ Huấn Luyện Quân Lính cơ bản",
    ],
    keyPerksEn: [
      "Boosts in-city resource production",
      "Increases base Troop Training speed",
    ],
    vipShopHighlightsVi: "Mở bán Lệnh Chiêu Mộ giảm giá tuần",
    vipShopHighlightsEn: "Weekly discounted Recruitment Tokens",
  },
  {
    level: 4,
    cumulativePoints: 300,
    cumulativeUsd: 50.0,
    isGoldenBreakpoint: true,
    breakpointBadgeVi: "Breakpoint 1 • Mốc Tiện Ích Đầu Game",
    breakpointBadgeEn: "Breakpoint 1 • Early QoL Milestone",
    marchQueuesBonus: 0,
    dailyFreeGoldShards: 0,
    constructionResearchSpeedBonusPct: 12,
    keyPerksVi: [
      "Mở khóa Tự Động Chiến Đấu / Bỏ Qua Màn (Auto-Battle & Skip)",
      "Đạt được hoàn toàn miễn phí trong tuần đầu nhờ Tiệm Điểm Bang",
    ],
    keyPerksEn: [
      "Unlocks Auto-Battle & Stage Skip convenience",
      "100% farmable F2P in Week 1 via Guild Points Shop",
    ],
    vipShopHighlightsVi:
      "Mở mua Thể Lực (Stamina) & Mảnh Tướng cơ bản giảm giá hàng tuần",
    vipShopHighlightsEn: "Weekly discounted Stamina & basic Hero Shards",
  },
  {
    level: 5,
    cumulativePoints: 500,
    cumulativeUsd: 86.67,
    isGoldenBreakpoint: false,
    marchQueuesBonus: 0,
    dailyFreeGoldShards: 0,
    constructionResearchSpeedBonusPct: 15,
    keyPerksVi: [
      "Tăng tốc độ Hành Quân trên bản đồ thế giới",
      "Tăng giới hạn lượt Giúp Đỡ Liên Minh (Guild Help)",
    ],
    keyPerksEn: [
      "Increases World Map March Speed",
      "Raises Guild Help receive cap",
    ],
    vipShopHighlightsVi: "Mở bán Đá Cường Hóa (Enhance Rune) ưu đãi",
    vipShopHighlightsEn: "Discounted Enhance Runes in VIP Shop",
  },
  {
    level: 6,
    cumulativePoints: 1_000,
    cumulativeUsd: 166.7,
    isGoldenBreakpoint: true,
    breakpointBadgeVi: "Breakpoint 2 • Mốc Kinh Tế F2P Trung Kỳ",
    breakpointBadgeEn: "Breakpoint 2 • Mid-Game F2P Benchmark",
    marchQueuesBonus: 0,
    dailyFreeGoldShards: 0,
    constructionResearchSpeedBonusPct: 20,
    keyPerksVi: [
      "Tăng mạnh +20% tốc độ Xây Dựng & Nghiên Cứu Khoa Kỹ",
      "Đạt được sau đúng 1 tuần mua kịch trần 1,000 Điểm VIP ở Tiệm Điểm Bang",
    ],
    keyPerksEn: [
      "Major +20% Construction & Tech Research speed boost",
      "Reachable in 1 week of free 1,000 VIP Points from Guild Shop",
    ],
    vipShopHighlightsVi:
      "Mở khóa Sách Kỹ Năng (Skill Books) & Quặng Cường Hóa giảm giá sâu",
    vipShopHighlightsEn: "Deeply discounted Skill Books & Enhance Ore",
  },
  {
    level: 7,
    cumulativePoints: 3_000,
    cumulativeUsd: 500.0,
    isGoldenBreakpoint: false,
    marchQueuesBonus: 0,
    dailyFreeGoldShards: 0,
    constructionResearchSpeedBonusPct: 23,
    keyPerksVi: [
      "Cộng chỉ số Công/Máu (ATK/HP %) toàn đội hình",
      "Tăng tốc độ Thu Thập Tài Nguyên trên bản đồ",
    ],
    keyPerksEn: [
      "Global Queue ATK/HP % buff",
      "Increases World Map Resource Gathering speed",
    ],
    vipShopHighlightsVi:
      "Mở bán Mảnh Tướng Cam Vạn Năng giảm 50% (300 Kim Cương/mảnh)",
    vipShopHighlightsEn:
      "50%-off Universal Legendary Hero Shards (300 Diamonds)",
  },
  {
    level: 8,
    cumulativePoints: 6_000,
    cumulativeUsd: 1_000.0,
    isGoldenBreakpoint: true,
    breakpointBadgeVi: "Breakpoint 3 • Đích Đến Vàng Cho F2P / Cày Chay",
    breakpointBadgeEn: "Breakpoint 3 • Veteran F2P Gold Target",
    marchQueuesBonus: 1,
    dailyFreeGoldShards: 1,
    constructionResearchSpeedBonusPct: 28,
    keyPerksVi: [
      "Nhận 1 Mảnh Tướng Cam Vạn Năng MIỄN PHÍ mỗi ngày trong rương VIP (30 mảnh/tháng)",
      "Mở thêm +1 Hàng Đợi Hành Quân (Extra March Queue)",
      "F2P đạt được sau ~6 tuần gom Điểm VIP miễn phí từ Tiệm Điểm Bang",
    ],
    keyPerksEn: [
      "1 FREE Universal Legendary Hero Shard daily in VIP chest (30/month)",
      "Unlocks +1 Extra March Queue",
      "F2P reachable in ~6 weeks via Guild Points Shop",
    ],
    vipShopHighlightsVi:
      "Mở rộng hạn mức mua Mảnh Tướng Cam 300 Kim Cương & Gia Tốc 1 Giờ",
    vipShopHighlightsEn:
      "Expanded 300-Diamond Legendary Shard slots & 1h Speed-ups",
  },
  {
    level: 9,
    cumulativePoints: 10_000,
    cumulativeUsd: 1_667.0,
    isGoldenBreakpoint: false,
    marchQueuesBonus: 1,
    dailyFreeGoldShards: 1,
    constructionResearchSpeedBonusPct: 32,
    keyPerksVi: [
      "Tăng Sức Chứa Bệnh Viện (Hospital Capacity)",
      "Tăng tốc độ Trị Liệu lính trong ngày chiến sự KvK",
    ],
    keyPerksEn: [
      "Expands Hospital Capacity",
      "Boosts Troop Healing speed during KvK war",
    ],
    vipShopHighlightsVi:
      "Mở bán Đá Đột Phá Trang Bị (Promotion Stone) ưu đãi",
    vipShopHighlightsEn: "Discounted Gear Promotion Stones",
  },
  {
    level: 10,
    cumulativePoints: 30_000,
    cumulativeUsd: 5_000.0,
    isGoldenBreakpoint: true,
    breakpointBadgeVi: "Breakpoint 4 • Mốc Cá Heo (Dolphin Benchmark)",
    breakpointBadgeEn: "Breakpoint 4 • Dolphin Strategic Benchmark",
    marchQueuesBonus: 1,
    dailyFreeGoldShards: 2,
    constructionResearchSpeedBonusPct: 38,
    keyPerksVi: [
      "Nhận 2 Mảnh Tướng Cam Vạn Năng MIỄN PHÍ mỗi ngày (60 mảnh/tháng)",
      "Tăng mạnh Quy Mô Hành Quân (March Size) cho Đội 1 chủ lực",
    ],
    keyPerksEn: [
      "2 FREE Universal Legendary Hero Shards daily (60/month)",
      "Major March Size capacity increase for Main Queue 1",
    ],
    vipShopHighlightsVi:
      "Mở kịch trần 10 Mảnh Tướng Cam (300 KC/mảnh) & Đá Đột Phá Cam",
    vipShopHighlightsEn:
      "Full 10x Legendary Shard weekly cap (300 Diamonds each)",
  },
  {
    level: 11,
    cumulativePoints: 50_000,
    cumulativeUsd: 8_667.0,
    isGoldenBreakpoint: false,
    marchQueuesBonus: 1,
    dailyFreeGoldShards: 2,
    constructionResearchSpeedBonusPct: 42,
    keyPerksVi: [
      "Tăng mạnh % ATK/HP toàn bộ Anh Hùng",
      "Tăng Sức Chứa Tập Kết (Rally Capacity)",
    ],
    keyPerksEn: ["Boosts All-Hero ATK/HP %", "Increases Rally Capacity"],
    vipShopHighlightsVi:
      "Mở bán Rương Mảnh Vũ Khí Độc Quyền trong Tiệm VIP",
    vipShopHighlightsEn:
      "Exclusive Weapon Shard chests unlocked in VIP Shop",
  },
  {
    level: 12,
    cumulativePoints: 80_000,
    cumulativeUsd: 13_330.0,
    isGoldenBreakpoint: false,
    marchQueuesBonus: 1,
    dailyFreeGoldShards: 3,
    constructionResearchSpeedBonusPct: 46,
    keyPerksVi: [
      "Nhận 3 Mảnh Cam/ngày",
      "Tăng Giảm Sát Thương PvP & Xuyên Giáp toàn đội",
    ],
    keyPerksEn: [
      "3 FREE Legendary Shards/day",
      "PvP Damage Reduction & Defense Penetration buffs",
    ],
    vipShopHighlightsVi:
      "Mở khóa vật liệu Vũ Khí Độc Quyền & Cổ Ngữ bậc cao",
    vipShopHighlightsEn: "High-tier Exclusive Weapon & Rune materials",
  },
  {
    level: 13,
    cumulativePoints: 120_000,
    cumulativeUsd: 20_000.0,
    isGoldenBreakpoint: false,
    marchQueuesBonus: 1,
    dailyFreeGoldShards: 3,
    constructionResearchSpeedBonusPct: 50,
    keyPerksVi: [
      "Tăng hệ số ATK/HP Quân Lính toàn diện",
      "Đặc quyền chiến trường Liên Server (KvK / SvS)",
    ],
    keyPerksEn: [
      "All-Soldier ATK/HP % multipliers",
      "Cross-Server KvK/SvS combat privileges",
    ],
    vipShopHighlightsVi:
      "Mở bán gói Đá Linh Hồn & Tinh Chất Thú Cưng giới hạn",
    vipShopHighlightsEn: "Limited Soul Stone & Pet Essence bundles",
  },
  {
    level: 14,
    cumulativePoints: 160_000,
    cumulativeUsd: 26_670.0,
    isGoldenBreakpoint: false,
    marchQueuesBonus: 1,
    dailyFreeGoldShards: 4,
    constructionResearchSpeedBonusPct: 55,
    keyPerksVi: [
      "Nhận 4 Mảnh Cam/ngày",
      "Tăng % Sát Thương Kỹ Năng (Skill Damage) toàn diện",
    ],
    keyPerksEn: [
      "4 FREE Legendary Shards/day",
      "Global Skill Damage % amplification",
    ],
    vipShopHighlightsVi:
      "Mở bán Mảnh Thánh Tích / Bí Bảo Cam ưu đãi tuần",
    vipShopHighlightsEn: "Weekly discounted Legendary Relic Shards",
  },
  {
    level: 15,
    cumulativePoints: 200_000,
    cumulativeUsd: 33_670.0,
    isGoldenBreakpoint: true,
    breakpointBadgeVi: "Đỉnh Chuẩn • Standard VIP Pinnacle",
    breakpointBadgeEn: "Standard VIP Pinnacle",
    marchQueuesBonus: 1,
    dailyFreeGoldShards: 5,
    constructionResearchSpeedBonusPct: 60,
    keyPerksVi: [
      "Nhận 5 Mảnh Cam/ngày (150 mảnh/tháng)",
      "Mở khóa Khung Avatar, Danh Hiệu & Hào Quang Tối Thượng VIP 15",
    ],
    keyPerksEn: [
      "5 FREE Legendary Shards/day (150/month)",
      "Unlocks Supreme VIP 15 Avatar Frame, Title & Prestige Aura",
    ],
    vipShopHighlightsVi:
      "Mở toàn bộ danh mục Tiệm VIP tiêu chuẩn với chiết khấu cao nhất",
    vipShopHighlightsEn:
      "Unlocks full standard VIP Shop catalog at maximum discount",
  },
  {
    level: 16,
    cumulativePoints: 300_000,
    cumulativeUsd: 50_000.0,
    isGoldenBreakpoint: false,
    marchQueuesBonus: 1,
    dailyFreeGoldShards: 5,
    constructionResearchSpeedBonusPct: 65,
    keyPerksVi: [
      "Bậc VIP Mở Rộng I: Tăng cường chỉ số Tấn Công/Phòng Thủ tổng lực",
    ],
    keyPerksEn: [
      "Extended Whale Tier I: Enhanced Total Attack/Defense multipliers",
    ],
    vipShopHighlightsVi: "Mở quầy Đặc Quyền Tinh Anh I",
    vipShopHighlightsEn: "Elite Privilege Counter I",
  },
  {
    level: 17,
    cumulativePoints: 600_000,
    cumulativeUsd: 100_000.0,
    isGoldenBreakpoint: false,
    marchQueuesBonus: 1,
    dailyFreeGoldShards: 6,
    constructionResearchSpeedBonusPct: 70,
    keyPerksVi: [
      "Bậc VIP Mở Rộng II: Kháng Bạo Kích & Tăng Sát Thương Bạo Kích Liên Server",
    ],
    keyPerksEn: [
      "Extended Whale Tier II: Cross-Server Crit Resistance & Crit Damage",
    ],
    vipShopHighlightsVi: "Mở quầy Đặc Quyền Tinh Anh II",
    vipShopHighlightsEn: "Elite Privilege Counter II",
  },
  {
    level: 18,
    cumulativePoints: 1_000_000,
    cumulativeUsd: 166_000.0,
    isGoldenBreakpoint: false,
    marchQueuesBonus: 1,
    dailyFreeGoldShards: 7,
    constructionResearchSpeedBonusPct: 75,
    keyPerksVi: [
      "Bậc VIP Mở Rộng III: Cường hóa sinh mệnh Quân Đoàn T11",
    ],
    keyPerksEn: [
      "Extended Whale Tier III: T11 Legion HP & lethality amplification",
    ],
    vipShopHighlightsVi: "Mở quầy Đặc Quyền Tinh Anh III",
    vipShopHighlightsEn: "Elite Privilege Counter III",
  },
  {
    level: 19,
    cumulativePoints: 2_000_000,
    cumulativeUsd: 332_000.0,
    isGoldenBreakpoint: false,
    marchQueuesBonus: 1,
    dailyFreeGoldShards: 8,
    constructionResearchSpeedBonusPct: 80,
    keyPerksVi: [
      "Bậc VIP Mở Rộng IV: Thống trị chỉ số Phản Đòn & Hút Máu toàn quân",
    ],
    keyPerksEn: [
      "Extended Whale Tier IV: Supreme Counterattack & Lifesteal dominance",
    ],
    vipShopHighlightsVi: "Mở quầy Đặc Quyền Tinh Anh IV",
    vipShopHighlightsEn: "Elite Privilege Counter IV",
  },
  {
    level: 20,
    cumulativePoints: 3_000_000,
    cumulativeUsd: 500_000.0,
    isGoldenBreakpoint: true,
    breakpointBadgeVi: "Trần Tối Đa • Mega-Whale Ceiling",
    breakpointBadgeEn: "Mega-Whale Absolute Ceiling",
    marchQueuesBonus: 1,
    dailyFreeGoldShards: 10,
    constructionResearchSpeedBonusPct: 90,
    keyPerksVi: [
      "Trần đặc quyền tối đa toàn máy chủ (3,000,000 Điểm VIP)",
      "Nhận 10 Mảnh Cam/ngày + Danh hiệu Bá Chủ Liên Server độc quyền",
    ],
    keyPerksEn: [
      "Absolute server-wide privilege ceiling (3,000,000 VIP Points)",
      "10 FREE Legendary Shards/day + Exclusive Cross-Server Overlord Title",
    ],
    vipShopHighlightsVi: "Đặc quyền tối đa toàn bộ vật phẩm hiếm Liên Server",
    vipShopHighlightsEn: "Maximum weekly cap on all Cross-Server rare items",
  },
] as const;

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

export interface VipProgressionResult {
  readonly fromVip: VipLevelDefinition;
  readonly toVip: VipLevelDefinition;
  readonly currentVipPoints: number;
  readonly pointsNeeded: number;
  readonly equivalentUsdNeeded: number;
  readonly equivalentDiamondsNeeded: number;
  readonly freeGuildShopWeeksNeeded: number;
  readonly progressPercent: number;
  readonly newlyUnlockedLevels: readonly VipLevelDefinition[];
  readonly goldenBreakpointsInRange: readonly VipLevelDefinition[];
}

export function calculateVipProgression(input: {
  readonly fromLevel: number;
  readonly toLevel: number;
  readonly customCurrentPoints?: number;
}): VipProgressionResult {
  const safeFromIdx = Math.max(0, Math.min(20, Math.floor(input.fromLevel)));
  const safeToIdx = Math.max(
    safeFromIdx,
    Math.min(20, Math.floor(input.toLevel))
  );

  const fromVip = VIP_LEVEL_TABLE[safeFromIdx];
  const toVip = VIP_LEVEL_TABLE[safeToIdx];

  const basePoints = fromVip.cumulativePoints;
  const currentVipPoints =
    input.customCurrentPoints !== undefined &&
    Number.isFinite(input.customCurrentPoints) &&
    input.customCurrentPoints > basePoints
      ? Math.floor(input.customCurrentPoints)
      : basePoints;

  const pointsNeeded = Math.max(0, toVip.cumulativePoints - currentVipPoints);
  const equivalentUsdNeeded = Number(
    (pointsNeeded / VIP_POINTS_PER_USD).toFixed(2)
  );
  const equivalentDiamondsNeeded = pointsNeeded;
  const freeGuildShopWeeksNeeded =
    pointsNeeded > 0
      ? Math.ceil(pointsNeeded / FREE_GUILD_SHOP_VIP_POINTS_PER_WEEK)
      : 0;

  const totalSpan = Math.max(
    1,
    toVip.cumulativePoints - fromVip.cumulativePoints
  );
  const coveredSpan = Math.min(
    totalSpan,
    Math.max(0, currentVipPoints - fromVip.cumulativePoints)
  );
  const progressPercent =
    safeFromIdx === safeToIdx
      ? 100
      : Math.min(100, Math.round((coveredSpan / totalSpan) * 100));

  const newlyUnlockedLevels = VIP_LEVEL_TABLE.slice(
    safeFromIdx + 1,
    safeToIdx + 1
  );
  const goldenBreakpointsInRange = newlyUnlockedLevels.filter(
    (lvl) => lvl.isGoldenBreakpoint
  );

  return {
    fromVip,
    toVip,
    currentVipPoints,
    pointsNeeded,
    equivalentUsdNeeded,
    equivalentDiamondsNeeded,
    freeGuildShopWeeksNeeded,
    progressPercent,
    newlyUnlockedLevels,
    goldenBreakpointsInRange,
  };
}

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

  const cartItems = GUILD_HONOR_SHOP_ITEMS.map((item) => {
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

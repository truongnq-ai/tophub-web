import type { AssetRarity } from "@/content/guides/types";
import { CALCULATOR_MATERIALS } from "./registry";

export type EventScoringMode = "gar" | "kvk";

export type EventDayNumber = 1 | 2 | 3 | 4 | 5 | 6;

export interface EventDayMetadata {
  readonly day: EventDayNumber;
  readonly weekdayVi: string;
  readonly weekdayEn: string;
  readonly titleVi: string;
  readonly titleEn: string;
  readonly primaryFocusVi: string;
  readonly primaryFocusEn: string;
  readonly secondaryFocusVi: string;
  readonly secondaryFocusEn: string;
  readonly trapWarningVi: string;
  readonly trapWarningEn: string;
  readonly kvkDiffHighlightVi: string;
  readonly kvkDiffHighlightEn: string;
}

export interface EventPointRule {
  /** Số điểm cơ bản nhận được cho mỗi `batchSize` đơn vị vật phẩm */
  readonly pointsPerBatch: number;
  /** Kích thước lô tính điểm (mặc định = 1; ví dụ Đá Vân Ma Thuật = 2000, Kim Loại Tinh Luyện = 100) */
  readonly batchSize: number;
}

export interface EventInventoryItemDefinition {
  readonly id: string;
  readonly gameId: number;
  readonly nameVi: string;
  readonly nameEn: string;
  readonly unitLabelVi: string;
  readonly unitLabelEn: string;
  readonly iconPath: string;
  readonly rarity: AssetRarity;
  readonly categoryGroup:
    | "speedups_tech"
    | "relics"
    | "lord_gear"
    | "heroes"
    | "behemoth"
    | "pets_troops";
  readonly defaultHoardQty: number;
  /** Thứ tự ưu tiên giữ lại kho khi dư điểm vượt Rương 9 (số càng lớn càng ưu tiên cất lại trước) */
  readonly reservePriorityWeight: number;
  /** Quy tắc điểm theo từng ngày trong chế độ GAR tiêu chuẩn (chỉ khai báo các ngày > 0 điểm) */
  readonly garByDay: Partial<Record<EventDayNumber, EventPointRule>>;
  /** Quy tắc điểm theo từng ngày trong chế độ KvK Liên Server (chỉ khai báo các ngày > 0 điểm) */
  readonly kvkByDay: Partial<Record<EventDayNumber, EventPointRule>>;
  /** Ngày xả điểm tối ưu nhất (Golden Hour / Double-Dip) */
  readonly bestDaysGar: readonly EventDayNumber[];
  readonly bestDaysKvk: readonly EventDayNumber[];
}

export interface EventMilestoneChest {
  readonly chestIndex: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  readonly tierGroup: "basic" | "intermediate" | "supreme";
  readonly chestIconPath: string;
  readonly requiredPoints: number;
  readonly baseDiamonds: number;
  readonly baseUniversalShards: number;
  readonly labelVi: string;
  readonly labelEn: string;
}

export const EVENT_DAYS_METADATA: readonly EventDayMetadata[] = [
  {
    day: 1,
    weekdayVi: "Thứ Hai",
    weekdayEn: "Monday",
    titleVi: "Ngày 1: Xây Dựng & Thánh Tích",
    titleEn: "Day 1: Territory Construction & Relics",
    primaryFocusVi: "Gia Tốc Xây Dựng (30đ/phút), Tinh Chất Rồng (1,200đ)",
    primaryFocusEn: "Construction Speedup (30pt/min), Dragon Essence (1,200pt)",
    secondaryFocusVi:
      "Bí Bảo: Cuộn Bí Bảo (1,500đ), Mảnh Bí Bảo Cam/Tím/Lam (5,000/1,000/200đ), Pha Lê Bí Thuật (1,200đ), Đá Vân / 2,000 (600đ)",
    secondaryFocusEn:
      "Relics: Relic Scroll (1,500pt), Leg/Epic/Rare Relic Shard (5,000/1,000/200pt), Arcane Crystal (1,200pt), Magic Stone / 2,000 (600pt)",
    trapWarningVi:
      "Tuyệt đối KHÔNG bấm nhận nhà đã xây xong trước giờ Reset Thứ Hai; Đồ Chúa Tể & Mảnh Tướng cho 0 điểm vào Ngày 1.",
    trapWarningEn:
      "Do NOT claim completed buildings before Monday reset; Lord Gear & Hero Shards grant 0 points on Day 1.",
    kvkDiffHighlightVi:
      "GAR có thêm Cướp Xe Hàng (+40,000đ/lần). KvK tính thêm Bụi Cổ Ngữ (1,200đ) và nhân 4 điểm gói nạp Kim Cương (40đ vs 10đ).",
    kvkDiffHighlightEn:
      "GAR includes Plunder Hostile Carriage (+40,000pt). KvK also scores Rune Dust (1,200pt) and quadruples Diamond Pack points (40pt vs 10pt).",
  },
  {
    day: 2,
    weekdayVi: "Thứ Ba",
    weekdayEn: "Tuesday",
    titleVi: "Ngày 2: Khoa Kỹ & Cổ Ngữ",
    titleEn: "Day 2: Tech Boost & Runes",
    primaryFocusVi:
      "Gia Tốc Nghiên Cứu (30đ/phút), Tinh Chất Rồng (1,200đ), Bụi Cổ Ngữ (1,200đ)",
    primaryFocusEn:
      "Research Speedup (30pt/min), Dragon Essence (1,200pt), Rune Dust (1,200pt)",
    secondaryFocusVi:
      "Bí Bảo: Cuộn Bí Bảo (1,500đ), Mảnh Bí Bảo Cam/Tím/Lam (5,000/1,000/200đ), Pha Lê Bí Thuật (1,200đ), Đá Vân / 2,000 (600đ)",
    secondaryFocusEn:
      "Relics: Relic Scroll (1,500pt), Leg/Epic/Rare Relic Shard (5,000/1,000/200pt), Arcane Crystal (1,200pt), Magic Stone / 2,000 (600pt)",
    trapWarningVi:
      "Nếu đã mở đủ 9 Rương ở Ngày 1 nhờ Xây Dựng, hãy giữ toàn bộ Bí Bảo sang Ngày 2 (hoặc Ngày 5 trong KvK).",
    trapWarningEn:
      "If all 9 Chests were unlocked on Day 1 via Construction, save Relics for Day 2 (or Day 5 in KvK).",
    kvkDiffHighlightVi:
      "Cả GAR và KvK đều tính điểm Bí Bảo ở Ngày 1 & Ngày 2. Trong KvK, Bí Bảo còn mở lại vào Ngày 5.",
    kvkDiffHighlightEn:
      "Both GAR and KvK score Relics on Days 1 & 2. In KvK, Relics score again on Day 5.",
  },
  {
    day: 3,
    weekdayVi: "Thứ Tư",
    weekdayEn: "Wednesday",
    titleVi: "Ngày 3: Thể Lực, Thu Thập & Đồ Chúa Tể",
    titleEn: "Day 3: Global Battles & Lord Gear",
    primaryFocusVi: "Nhiệm vụ Bounty (2,000đ), Thu thập Gỗ/Đá/Ruby, Săn Quái & Boss",
    primaryFocusEn: "Bounty Quests (2,000pt), Resource Gathering, Mobs & Bosses",
    secondaryFocusVi:
      "Đồ Chúa Tể: Kim Loại / 100 (400đ), Sợi Tơ (400đ), Orichalcum (600đ), Huyết Rồng (2,400đ)",
    secondaryFocusEn:
      "Lord Gear: Refined Metal / 100 (400pt), Magic Thread (400pt), Orichalcum (600pt), Dragon Blood (2,400pt)",
    trapWarningVi:
      "Nếu điểm săn quái + thu thập Ngày 3 đã đủ mở Rương 9, hãy găm Đồ Chúa Tể sang Ngày 4 (hoặc Ngày 5 nếu là KvK để hưởng x2.5 điểm!).",
    trapWarningEn:
      "If monster hunting + gathering unlocks Chest 9 on Day 3, hold Lord Gear for Day 4 (or KvK Day 5 for 2.5x points!).",
    kvkDiffHighlightVi:
      "KvK Ngày 3 tính điểm cả Cự Thú (Tinh Thạch 1đ, Lõi Ma Pháp 40đ, Dấu Ấn 2,000đ), trong khi GAR Ngày 3 cho 0 điểm Cự Thú.",
    kvkDiffHighlightEn:
      "KvK Day 3 scores Behemoth upgrades (Magicite 1pt, Magic Core 40pt, Scroll Seal 2,000pt), whereas Standard GAR Day 3 grants 0 points.",
  },
  {
    day: 4,
    weekdayVi: "Thứ Năm",
    weekdayEn: "Thursday",
    titleVi: "Ngày 4: Phát Triển Anh Hùng",
    titleEn: "Day 4: Call of the Hero",
    primaryFocusVi:
      "Đá Linh Hồn (120,000đ), Mảnh Cam/Tím (4,000đ), Mảnh Lam (1,000đ), Mảnh Vũ Khí Độc Quyền (6,000đ), Lệnh Chiêu Mộ (1,500đ), Sách Skill (30đ)",
    primaryFocusEn:
      "Soul Stone (120,000pt), Leg/Epic Shard (4,000pt), Rare Shard (1,000pt), Exclusive Gear Shard (6,000pt), Recruit Token (1,500pt), Skill Book (30pt)",
    secondaryFocusVi:
      "Đồ Chúa Tể (400/400/600/2,400đ), Cự Thú (1/40/2,000đ) & Lõi Sắt Thiên Thạch (6,000đ trong GAR)",
    secondaryFocusEn:
      "Lord Gear (400/400/600/2,400pt), Behemoth (1/40/2,000pt) & Meteoric Iron Core (6,000pt in GAR)",
    trapWarningVi:
      "Ngày 4 dễ xả lố điểm nhất! Ngay khi chạm Rương 9, hãy dừng tay và cất số Mảnh Cam / Đá Linh Hồn dư theo bảng Gợi Ý Giữ Lại Kho.",
    trapWarningEn:
      "Day 4 is the easiest day to over-spend! Stop immediately after unlocking Chest 9 and bank surplus Shards/Soul Stones.",
    kvkDiffHighlightVi:
      "Trong KvK, hãy giữ Đồ Chúa Tể từ Ngày 4 sang Ngày 5 vì KvK Ngày 5 trả điểm Đồ Chúa Tể cao gấp 2.5 lần Ngày 4!",
    kvkDiffHighlightEn:
      "In KvK, hold Lord Gear from Day 4 to Day 5 because KvK Day 5 pays 2.5x more points for Lord Gear!",
  },
  {
    day: 5,
    weekdayVi: "Thứ Sáu",
    weekdayEn: "Friday",
    titleVi: "Ngày 5: Huấn Luyện Lính, Thú Cưng & Linh Thể",
    titleEn: "Day 5: Combat Ready (Troops, Pets & Spirit)",
    primaryFocusVi:
      "Gia Tốc Huấn Luyện (30đ/phút), Mảnh Linh Thể Vạn Năng (6,000đ), Đồ Ăn & Tinh Chất Thú Cưng",
    primaryFocusEn:
      "Training Speedup (30pt/min), Universal Heroic Spirit Shard (6,000pt), Pet Food & Pet Essence",
    secondaryFocusVi:
      "Thú Cưng (GAR: 960đ/100 Đồ Ăn, 480đ/Tinh Chất | KvK: 400đ/100 Đồ Ăn, 200đ/Tinh Chất) + [Riêng KvK: Bí Bảo & Đồ Chúa Tể x2.5]",
    secondaryFocusEn:
      "Pets (GAR: 960pt/100 Food, 480pt/Essence | KvK: 400pt/100 Food, 200pt/Essence) + [KvK Only: Relics & 2.5x Lord Gear]",
    trapWarningVi:
      "Dùng kỹ thuật Đôn Cấp Bậc Thang (T5 ➔ T9 ➔ T10) để tối ưu điểm trên mỗi phút Gia Tốc Huấn Luyện.",
    trapWarningEn:
      "Use Staircase Promotion (T5 ➔ T9 ➔ T10) to maximize points per minute of Training Speedup.",
    kvkDiffHighlightVi:
      "KHÁC BIỆT CỰC LỚN: KvK Ngày 5 mở điểm Bí Bảo VÀ nhân 2.5x điểm Đồ Chúa Tể (Huyết Rồng = 6,000đ!). GAR Ngày 5 cho 0 điểm Bí Bảo & Đồ Chúa Tể, nhưng trả điểm Thú Cưng cao gấp 2.4x KvK.",
    kvkDiffHighlightEn:
      "CRITICAL DIFFERENCE: KvK Day 5 scores Relics AND 2.5x Lord Gear (Dragon Blood = 6,000pt!). GAR Day 5 gives 0pt for Relics & Lord Gear, but pays 2.4x higher Pet points than KvK.",
  },
  {
    day: 6,
    weekdayVi: "Thứ Bảy",
    weekdayEn: "Saturday",
    titleVi: "Ngày 6: Chiến Sự, Quân Trang & Thú Cưng",
    titleEn: "Day 6: Cross-Kingdom Conquest",
    primaryFocusVi:
      "Gia Tốc Trị Liệu (30đ/phút), Thú Cưng, Xu Trang Trí (480đ), [KvK: Huy Chương Vinh Dự & Quân Trang]",
    primaryFocusEn:
      "Healing Speedup (30pt/min), Pets, Decor Token (480pt), [KvK: Glory Medals & Troop Skins]",
    secondaryFocusVi:
      "GAR Ngày 6: Mảnh Linh Thể (6,000đ) & Cự Thú (1/40/2,000đ) | KvK Ngày 6: Thú Cưng tăng 1.5x so với Ngày 5 (600đ/100 Đồ Ăn, 300đ/Tinh Chất)",
    secondaryFocusEn:
      "GAR Day 6: Heroic Spirit Shard (6,000pt) & Behemoth (1/40/2,000pt) | KvK Day 6: Pet points increase 1.5x over Day 5",
    trapWarningVi:
      "CẢNH BÁO ĐỎ NGÀY 6: Đồ Chúa Tể (Lord Gear) và Trang Bị Anh Hùng cho 0 ĐIỂM vào Ngày 6 ở cả GAR lẫn KvK!",
    trapWarningEn:
      "RED ALERT DAY 6: Lord Gear and Hero Gear grant 0 POINTS on Day 6 in BOTH GAR and KvK!",
    kvkDiffHighlightVi:
      "KvK Ngày 6 tính điểm Huy Chương Vinh Dự (12đ / 10 huy chương), Quân Trang Cam (300,000đ) và nâng Thú Cưng lên 6đ/Đồ Ăn, 300đ/Tinh Chất.",
    kvkDiffHighlightEn:
      "KvK Day 6 scores Glory Medals (12pt per 10), Legendary Troop Skin (300,000pt) and boosts Pet Food to 6pt & Pet Essence to 300pt.",
  },
] as const;

export const EVENT_INVENTORY_ITEMS: readonly EventInventoryItemDefinition[] = [
  // === NHÓM 1: TĂNG TỐC, TINH CHẤT RỒNG & BỤI CỔ NGỮ (NGÀY 1 & 2) ===
  {
    id: "construction_speedup_min",
    gameId: 200001,
    nameVi: "Gia Tốc Xây Dựng (Tổng số phút)",
    nameEn: "Construction Speed-up (Total Minutes)",
    unitLabelVi: "phút",
    unitLabelEn: "mins",
    iconPath: "/images/items/consumables/icon_30071.webp",
    rarity: "rare",
    categoryGroup: "speedups_tech",
    defaultHoardQty: 3000,
    reservePriorityWeight: 20,
    garByDay: { 1: { pointsPerBatch: 30, batchSize: 1 } },
    kvkByDay: { 1: { pointsPerBatch: 30, batchSize: 1 } },
    bestDaysGar: [1],
    bestDaysKvk: [1],
  },
  {
    id: "research_speedup_min",
    gameId: 200301,
    nameVi: "Gia Tốc Nghiên Cứu (Tổng số phút)",
    nameEn: "Research Speed-up (Total Minutes)",
    unitLabelVi: "phút",
    unitLabelEn: "mins",
    iconPath: "/images/items/consumables/icon_30074.webp",
    rarity: "rare",
    categoryGroup: "speedups_tech",
    defaultHoardQty: 3000,
    reservePriorityWeight: 20,
    garByDay: { 2: { pointsPerBatch: 30, batchSize: 1 } },
    kvkByDay: { 2: { pointsPerBatch: 30, batchSize: 1 } },
    bestDaysGar: [2],
    bestDaysKvk: [2],
  },
  {
    id: "dragon_essence",
    gameId: CALCULATOR_MATERIALS.dragonEssence.gameId,
    nameVi: CALCULATOR_MATERIALS.dragonEssence.nameVi,
    nameEn: CALCULATOR_MATERIALS.dragonEssence.nameEn,
    unitLabelVi: "viên",
    unitLabelEn: "units",
    iconPath: CALCULATOR_MATERIALS.dragonEssence.iconPath,
    rarity: "mythic",
    categoryGroup: "speedups_tech",
    defaultHoardQty: 120,
    reservePriorityWeight: 75,
    garByDay: {
      1: { pointsPerBatch: 1200, batchSize: 1 },
      2: { pointsPerBatch: 1200, batchSize: 1 },
    },
    kvkByDay: {
      1: { pointsPerBatch: 1200, batchSize: 1 },
      2: { pointsPerBatch: 1200, batchSize: 1 },
    },
    bestDaysGar: [1, 2],
    bestDaysKvk: [1, 2],
  },
  {
    id: "rune_dust",
    gameId: CALCULATOR_MATERIALS.runeDust.gameId,
    nameVi: "Bụi Cổ Ngữ / Bột Tinh Thể Rồng",
    nameEn: "Rune Dust / Dragon Crystal Dust",
    unitLabelVi: "đơn vị",
    unitLabelEn: "units",
    iconPath: CALCULATOR_MATERIALS.runeDust.iconPath,
    rarity: "epic",
    categoryGroup: "speedups_tech",
    defaultHoardQty: 150,
    reservePriorityWeight: 60,
    garByDay: { 2: { pointsPerBatch: 1200, batchSize: 1 } },
    kvkByDay: {
      1: { pointsPerBatch: 1200, batchSize: 1 },
      2: { pointsPerBatch: 1200, batchSize: 1 },
    },
    bestDaysGar: [2],
    bestDaysKvk: [1, 2],
  },

  // === NHÓM 2: BÍ BẢO / THÁNH TÍCH (NGÀY 1, 2 & RIÊNG KVK NGÀY 5) ===
  {
    id: "relic_scroll",
    gameId: CALCULATOR_MATERIALS.relicScroll.gameId,
    nameVi: CALCULATOR_MATERIALS.relicScroll.nameVi,
    nameEn: CALCULATOR_MATERIALS.relicScroll.nameEn,
    unitLabelVi: "cuộn",
    unitLabelEn: "scrolls",
    iconPath: CALCULATOR_MATERIALS.relicScroll.iconPath,
    rarity: "epic",
    categoryGroup: "relics",
    defaultHoardQty: 50,
    reservePriorityWeight: 65,
    garByDay: {
      1: { pointsPerBatch: 1500, batchSize: 1 },
      2: { pointsPerBatch: 1500, batchSize: 1 },
    },
    kvkByDay: {
      1: { pointsPerBatch: 1500, batchSize: 1 },
      2: { pointsPerBatch: 1500, batchSize: 1 },
    },
    bestDaysGar: [1, 2],
    bestDaysKvk: [1, 2],
  },
  {
    id: "legendary_relic_shard",
    gameId: CALCULATOR_MATERIALS.legendaryUniversalRelicShard.gameId,
    nameVi: CALCULATOR_MATERIALS.legendaryUniversalRelicShard.nameVi,
    nameEn: CALCULATOR_MATERIALS.legendaryUniversalRelicShard.nameEn,
    unitLabelVi: "mảnh",
    unitLabelEn: "shards",
    iconPath: CALCULATOR_MATERIALS.legendaryUniversalRelicShard.iconPath,
    rarity: "legendary",
    categoryGroup: "relics",
    defaultHoardQty: 30,
    reservePriorityWeight: 85,
    garByDay: {
      1: { pointsPerBatch: 5000, batchSize: 1 },
      2: { pointsPerBatch: 5000, batchSize: 1 },
    },
    kvkByDay: {
      1: { pointsPerBatch: 5000, batchSize: 1 },
      2: { pointsPerBatch: 5000, batchSize: 1 },
      5: { pointsPerBatch: 5000, batchSize: 1 },
    },
    bestDaysGar: [1, 2],
    bestDaysKvk: [1, 2, 5],
  },
  {
    id: "epic_relic_shard",
    gameId: 220202,
    nameVi: "Mảnh Vạn Năng Bí Bảo Tím",
    nameEn: "Epic Universal Relic Shard",
    unitLabelVi: "mảnh",
    unitLabelEn: "shards",
    iconPath: "/images/items/shards/icon_30399.webp",
    rarity: "epic",
    categoryGroup: "relics",
    defaultHoardQty: 40,
    reservePriorityWeight: 55,
    garByDay: {
      1: { pointsPerBatch: 1000, batchSize: 1 },
      2: { pointsPerBatch: 1000, batchSize: 1 },
    },
    kvkByDay: {
      1: { pointsPerBatch: 1000, batchSize: 1 },
      2: { pointsPerBatch: 1000, batchSize: 1 },
      5: { pointsPerBatch: 1000, batchSize: 1 },
    },
    bestDaysGar: [1, 2],
    bestDaysKvk: [1, 2, 5],
  },
  {
    id: "rare_relic_shard",
    gameId: 220201,
    nameVi: "Mảnh Vạn Năng Bí Bảo Lam",
    nameEn: "Rare Universal Relic Shard",
    unitLabelVi: "mảnh",
    unitLabelEn: "shards",
    iconPath: "/images/items/shards/icon_30398.webp",
    rarity: "rare",
    categoryGroup: "relics",
    defaultHoardQty: 50,
    reservePriorityWeight: 35,
    garByDay: {
      1: { pointsPerBatch: 200, batchSize: 1 },
      2: { pointsPerBatch: 200, batchSize: 1 },
    },
    kvkByDay: {
      1: { pointsPerBatch: 200, batchSize: 1 },
      2: { pointsPerBatch: 200, batchSize: 1 },
      5: { pointsPerBatch: 200, batchSize: 1 },
    },
    bestDaysGar: [1, 2],
    bestDaysKvk: [1, 2, 5],
  },
  {
    id: "arcane_crystal",
    gameId: CALCULATOR_MATERIALS.arcaneCrystal.gameId,
    nameVi: CALCULATOR_MATERIALS.arcaneCrystal.nameVi,
    nameEn: CALCULATOR_MATERIALS.arcaneCrystal.nameEn,
    unitLabelVi: "viên",
    unitLabelEn: "crystals",
    iconPath: CALCULATOR_MATERIALS.arcaneCrystal.iconPath,
    rarity: "mythic",
    categoryGroup: "relics",
    defaultHoardQty: 80,
    reservePriorityWeight: 70,
    garByDay: {
      1: { pointsPerBatch: 1200, batchSize: 1 },
      2: { pointsPerBatch: 1200, batchSize: 1 },
    },
    kvkByDay: {
      1: { pointsPerBatch: 1200, batchSize: 1 },
      2: { pointsPerBatch: 1200, batchSize: 1 },
      5: { pointsPerBatch: 1200, batchSize: 1 },
    },
    bestDaysGar: [1, 2],
    bestDaysKvk: [1, 2, 5],
  },
  {
    id: "magic_stone",
    gameId: CALCULATOR_MATERIALS.magicStone.gameId,
    nameVi: "Đá Vân Ma Thuật (Mỗi lô 2,000 viên)",
    nameEn: "Magic Stone (600 pts per 2,000)",
    unitLabelVi: "viên",
    unitLabelEn: "stones",
    iconPath: CALCULATOR_MATERIALS.magicStone.iconPath,
    rarity: "rare",
    categoryGroup: "relics",
    defaultHoardQty: 40000,
    reservePriorityWeight: 30,
    garByDay: {
      1: { pointsPerBatch: 600, batchSize: 2000 },
      2: { pointsPerBatch: 600, batchSize: 2000 },
    },
    kvkByDay: {
      1: { pointsPerBatch: 600, batchSize: 2000 },
      2: { pointsPerBatch: 600, batchSize: 2000 },
      5: { pointsPerBatch: 600, batchSize: 2000 },
    },
    bestDaysGar: [1, 2],
    bestDaysKvk: [1, 2, 5],
  },

  // === NHÓM 3: ĐỒ CHÚA TỂ / LORD GEAR (NGÀY 3, 4 & RIÊNG KVK NGÀY 5 NHÂN 2.5X) ===
  {
    id: "refined_metal",
    gameId: CALCULATOR_MATERIALS.refinedMetal.gameId,
    nameVi: "Kim Loại Tinh Luyện (Mỗi lô 100)",
    nameEn: "Refined Metal (Per 100 units)",
    unitLabelVi: "đơn vị",
    unitLabelEn: "units",
    iconPath: CALCULATOR_MATERIALS.refinedMetal.iconPath,
    rarity: "rare",
    categoryGroup: "lord_gear",
    defaultHoardQty: 0,
    reservePriorityWeight: 50,
    garByDay: {
      3: { pointsPerBatch: 400, batchSize: 100 },
      4: { pointsPerBatch: 400, batchSize: 100 },
    },
    kvkByDay: {
      3: { pointsPerBatch: 400, batchSize: 100 },
      4: { pointsPerBatch: 400, batchSize: 100 },
      5: { pointsPerBatch: 1000, batchSize: 100 },
    },
    bestDaysGar: [3, 4],
    bestDaysKvk: [5],
  },
  {
    id: "magic_thread",
    gameId: CALCULATOR_MATERIALS.magicThread.gameId,
    nameVi: CALCULATOR_MATERIALS.magicThread.nameVi,
    nameEn: CALCULATOR_MATERIALS.magicThread.nameEn,
    unitLabelVi: "cuộn",
    unitLabelEn: "threads",
    iconPath: CALCULATOR_MATERIALS.magicThread.iconPath,
    rarity: "epic",
    categoryGroup: "lord_gear",
    defaultHoardQty: 0,
    reservePriorityWeight: 55,
    garByDay: {
      3: { pointsPerBatch: 400, batchSize: 1 },
      4: { pointsPerBatch: 400, batchSize: 1 },
    },
    kvkByDay: {
      3: { pointsPerBatch: 400, batchSize: 1 },
      4: { pointsPerBatch: 400, batchSize: 1 },
      5: { pointsPerBatch: 1000, batchSize: 1 },
    },
    bestDaysGar: [3, 4],
    bestDaysKvk: [5],
  },
  {
    id: "orichalcum",
    gameId: CALCULATOR_MATERIALS.orichalcum.gameId,
    nameVi: CALCULATOR_MATERIALS.orichalcum.nameVi,
    nameEn: CALCULATOR_MATERIALS.orichalcum.nameEn,
    unitLabelVi: "viên",
    unitLabelEn: "units",
    iconPath: CALCULATOR_MATERIALS.orichalcum.iconPath,
    rarity: "legendary",
    categoryGroup: "lord_gear",
    defaultHoardQty: 0,
    reservePriorityWeight: 75,
    garByDay: {
      3: { pointsPerBatch: 600, batchSize: 1 },
      4: { pointsPerBatch: 600, batchSize: 1 },
    },
    kvkByDay: {
      3: { pointsPerBatch: 600, batchSize: 1 },
      4: { pointsPerBatch: 600, batchSize: 1 },
      5: { pointsPerBatch: 1500, batchSize: 1 },
    },
    bestDaysGar: [3, 4],
    bestDaysKvk: [5],
  },
  {
    id: "dragon_blood",
    gameId: CALCULATOR_MATERIALS.dragonBlood.gameId,
    nameVi: CALCULATOR_MATERIALS.dragonBlood.nameVi,
    nameEn: CALCULATOR_MATERIALS.dragonBlood.nameEn,
    unitLabelVi: "lọ",
    unitLabelEn: "vials",
    iconPath: CALCULATOR_MATERIALS.dragonBlood.iconPath,
    rarity: "mythic",
    categoryGroup: "lord_gear",
    defaultHoardQty: 0,
    reservePriorityWeight: 90,
    garByDay: {
      3: { pointsPerBatch: 2400, batchSize: 1 },
      4: { pointsPerBatch: 2400, batchSize: 1 },
    },
    kvkByDay: {
      3: { pointsPerBatch: 2400, batchSize: 1 },
      4: { pointsPerBatch: 2400, batchSize: 1 },
      5: { pointsPerBatch: 6000, batchSize: 1 },
    },
    bestDaysGar: [3, 4],
    bestDaysKvk: [5],
  },

  // === NHÓM 4: PHÁT TRIỂN ANH HÙNG (NGÀY 4 — MẶC ĐỊNH KHỚP EXAMPLE CASE REGISTRY.TS) ===
  {
    id: "recruitment_token",
    gameId: CALCULATOR_MATERIALS.recruitmentToken.gameId,
    nameVi: CALCULATOR_MATERIALS.recruitmentToken.nameVi,
    nameEn: CALCULATOR_MATERIALS.recruitmentToken.nameEn,
    unitLabelVi: "lệnh",
    unitLabelEn: "tokens",
    iconPath: CALCULATOR_MATERIALS.recruitmentToken.iconPath,
    rarity: "legendary",
    categoryGroup: "heroes",
    defaultHoardQty: 120,
    reservePriorityWeight: 70,
    garByDay: { 4: { pointsPerBatch: 1500, batchSize: 1 } },
    kvkByDay: { 4: { pointsPerBatch: 1500, batchSize: 1 } },
    bestDaysGar: [4],
    bestDaysKvk: [4],
  },
  {
    id: "legendary_hero_shard",
    gameId: CALCULATOR_MATERIALS.legendaryUniversalHeroShard.gameId,
    nameVi: CALCULATOR_MATERIALS.legendaryUniversalHeroShard.nameVi,
    nameEn: CALCULATOR_MATERIALS.legendaryUniversalHeroShard.nameEn,
    unitLabelVi: "mảnh",
    unitLabelEn: "shards",
    iconPath: CALCULATOR_MATERIALS.legendaryUniversalHeroShard.iconPath,
    rarity: "legendary",
    categoryGroup: "heroes",
    defaultHoardQty: 300,
    reservePriorityWeight: 95,
    garByDay: { 4: { pointsPerBatch: 4000, batchSize: 1 } },
    kvkByDay: { 4: { pointsPerBatch: 4000, batchSize: 1 } },
    bestDaysGar: [4],
    bestDaysKvk: [4],
  },
  {
    id: "epic_hero_shard",
    gameId: CALCULATOR_MATERIALS.epicUniversalHeroShard.gameId,
    nameVi: CALCULATOR_MATERIALS.epicUniversalHeroShard.nameVi,
    nameEn: CALCULATOR_MATERIALS.epicUniversalHeroShard.nameEn,
    unitLabelVi: "mảnh",
    unitLabelEn: "shards",
    iconPath: CALCULATOR_MATERIALS.epicUniversalHeroShard.iconPath,
    rarity: "epic",
    categoryGroup: "heroes",
    defaultHoardQty: 0,
    reservePriorityWeight: 60,
    garByDay: { 4: { pointsPerBatch: 4000, batchSize: 1 } },
    kvkByDay: { 4: { pointsPerBatch: 4000, batchSize: 1 } },
    bestDaysGar: [4],
    bestDaysKvk: [4],
  },
  {
    id: "rare_hero_shard",
    gameId: CALCULATOR_MATERIALS.rareUniversalHeroShard.gameId,
    nameVi: CALCULATOR_MATERIALS.rareUniversalHeroShard.nameVi,
    nameEn: CALCULATOR_MATERIALS.rareUniversalHeroShard.nameEn,
    unitLabelVi: "mảnh",
    unitLabelEn: "shards",
    iconPath: CALCULATOR_MATERIALS.rareUniversalHeroShard.iconPath,
    rarity: "rare",
    categoryGroup: "heroes",
    defaultHoardQty: 0,
    reservePriorityWeight: 40,
    garByDay: { 4: { pointsPerBatch: 1000, batchSize: 1 } },
    kvkByDay: { 4: { pointsPerBatch: 1000, batchSize: 1 } },
    bestDaysGar: [4],
    bestDaysKvk: [4],
  },
  {
    id: "soul_stone",
    gameId: CALCULATOR_MATERIALS.leagueSoulStone.gameId,
    nameVi: "Đá Linh Hồn (Soul Stone)",
    nameEn: "Soul Stone",
    unitLabelVi: "viên",
    unitLabelEn: "stones",
    iconPath: CALCULATOR_MATERIALS.leagueSoulStone.iconPath,
    rarity: "mythic",
    categoryGroup: "heroes",
    defaultHoardQty: 0,
    reservePriorityWeight: 100,
    garByDay: { 4: { pointsPerBatch: 120000, batchSize: 1 } },
    kvkByDay: { 4: { pointsPerBatch: 120000, batchSize: 1 } },
    bestDaysGar: [4],
    bestDaysKvk: [4],
  },
  {
    id: "exclusive_gear_shard",
    gameId: CALCULATOR_MATERIALS.universalExclusiveGearShard.gameId,
    nameVi: CALCULATOR_MATERIALS.universalExclusiveGearShard.nameVi,
    nameEn: CALCULATOR_MATERIALS.universalExclusiveGearShard.nameEn,
    unitLabelVi: "mảnh",
    unitLabelEn: "shards",
    iconPath: CALCULATOR_MATERIALS.universalExclusiveGearShard.iconPath,
    rarity: "legendary",
    categoryGroup: "heroes",
    defaultHoardQty: 0,
    reservePriorityWeight: 92,
    garByDay: { 4: { pointsPerBatch: 6000, batchSize: 1 } },
    kvkByDay: { 4: { pointsPerBatch: 6000, batchSize: 1 } },
    bestDaysGar: [4],
    bestDaysKvk: [4],
  },
  {
    id: "skill_book",
    gameId: CALCULATOR_MATERIALS.skillBook.gameId,
    nameVi: CALCULATOR_MATERIALS.skillBook.nameVi,
    nameEn: CALCULATOR_MATERIALS.skillBook.nameEn,
    unitLabelVi: "cuốn",
    unitLabelEn: "books",
    iconPath: CALCULATOR_MATERIALS.skillBook.iconPath,
    rarity: "epic",
    categoryGroup: "heroes",
    defaultHoardQty: 15000,
    reservePriorityWeight: 50,
    garByDay: { 4: { pointsPerBatch: 30, batchSize: 1 } },
    kvkByDay: { 4: { pointsPerBatch: 30, batchSize: 1 } },
    bestDaysGar: [4],
    bestDaysKvk: [4],
  },
  {
    id: "meteoric_iron_core",
    gameId: CALCULATOR_MATERIALS.meteoricIronCore.gameId,
    nameVi: CALCULATOR_MATERIALS.meteoricIronCore.nameVi,
    nameEn: CALCULATOR_MATERIALS.meteoricIronCore.nameEn,
    unitLabelVi: "lõi",
    unitLabelEn: "cores",
    iconPath: CALCULATOR_MATERIALS.meteoricIronCore.iconPath,
    rarity: "mythic",
    categoryGroup: "heroes",
    defaultHoardQty: 0,
    reservePriorityWeight: 88,
    garByDay: { 4: { pointsPerBatch: 6000, batchSize: 1 } },
    kvkByDay: {},
    bestDaysGar: [4],
    bestDaysKvk: [],
  },

  // === NHÓM 5: CỰ THÚ / BEHEMOTH (NGÀY 3 KVK, NGÀY 4 GAR/KVK, NGÀY 6 GAR) ===
  {
    id: "behemoth_scroll_seal",
    gameId: 230002,
    nameVi: "Dấu Ấn Giao Ước (Scroll Seal)",
    nameEn: "Scroll Seal (Behemoth)",
    unitLabelVi: "dấu ấn",
    unitLabelEn: "seals",
    iconPath: "/images/items/consumables/icon_30796.webp",
    rarity: "legendary",
    categoryGroup: "behemoth",
    defaultHoardQty: 0,
    reservePriorityWeight: 80,
    garByDay: {
      4: { pointsPerBatch: 2000, batchSize: 1 },
      6: { pointsPerBatch: 2000, batchSize: 1 },
    },
    kvkByDay: {
      3: { pointsPerBatch: 2000, batchSize: 1 },
      4: { pointsPerBatch: 2000, batchSize: 1 },
    },
    bestDaysGar: [4, 6],
    bestDaysKvk: [3, 4],
  },
  {
    id: "behemoth_magic_core",
    gameId: 295,
    nameVi: "Lõi Ma Pháp (Magic Core)",
    nameEn: "Magic Core (Behemoth)",
    unitLabelVi: "lõi",
    unitLabelEn: "cores",
    iconPath: "/images/items/materials/icon_30797.webp",
    rarity: "epic",
    categoryGroup: "behemoth",
    defaultHoardQty: 0,
    reservePriorityWeight: 45,
    garByDay: {
      4: { pointsPerBatch: 40, batchSize: 1 },
      6: { pointsPerBatch: 40, batchSize: 1 },
    },
    kvkByDay: {
      3: { pointsPerBatch: 40, batchSize: 1 },
      4: { pointsPerBatch: 40, batchSize: 1 },
    },
    bestDaysGar: [4, 6],
    bestDaysKvk: [3, 4],
  },
  {
    id: "behemoth_magicite",
    gameId: 292,
    nameVi: "Tinh Thạch Cự Thú (Magicite)",
    nameEn: "Behemoth Magicite",
    unitLabelVi: "viên",
    unitLabelEn: "units",
    iconPath: "/images/items/consumables/icon_30798.webp",
    rarity: "rare",
    categoryGroup: "behemoth",
    defaultHoardQty: 0,
    reservePriorityWeight: 25,
    garByDay: {
      4: { pointsPerBatch: 1, batchSize: 1 },
      6: { pointsPerBatch: 1, batchSize: 1 },
    },
    kvkByDay: {
      3: { pointsPerBatch: 1, batchSize: 1 },
      4: { pointsPerBatch: 1, batchSize: 1 },
    },
    bestDaysGar: [4, 6],
    bestDaysKvk: [3, 4],
  },

  // === NHÓM 6: QUÂN LÍNH, THÚ CƯNG, LINH THỂ, TRANG TRÍ & QUÂN TRANG (NGÀY 5 & 6) ===
  {
    id: "training_speedup_min",
    gameId: 200101,
    nameVi: "Gia Tốc Huấn Luyện (Tổng số phút)",
    nameEn: "Training Speed-up (Total Minutes)",
    unitLabelVi: "phút",
    unitLabelEn: "mins",
    iconPath: "/images/items/consumables/icon_30072.webp",
    rarity: "rare",
    categoryGroup: "pets_troops",
    defaultHoardQty: 3000,
    reservePriorityWeight: 20,
    garByDay: { 5: { pointsPerBatch: 30, batchSize: 1 } },
    kvkByDay: { 5: { pointsPerBatch: 30, batchSize: 1 } },
    bestDaysGar: [5],
    bestDaysKvk: [5],
  },
  {
    id: "healing_speedup_min",
    gameId: 200201,
    nameVi: "Gia Tốc Trị Liệu (Tổng số phút)",
    nameEn: "Healing Speed-up (Total Minutes)",
    unitLabelVi: "phút",
    unitLabelEn: "mins",
    iconPath: "/images/items/consumables/icon_30073.webp",
    rarity: "rare",
    categoryGroup: "pets_troops",
    defaultHoardQty: 1500,
    reservePriorityWeight: 15,
    garByDay: { 6: { pointsPerBatch: 30, batchSize: 1 } },
    kvkByDay: { 6: { pointsPerBatch: 30, batchSize: 1 } },
    bestDaysGar: [6],
    bestDaysKvk: [6],
  },
  {
    id: "heroic_spirit_shard",
    gameId: CALCULATOR_MATERIALS.universalHeroicSpiritShard.gameId,
    nameVi: CALCULATOR_MATERIALS.universalHeroicSpiritShard.nameVi,
    nameEn: CALCULATOR_MATERIALS.universalHeroicSpiritShard.nameEn,
    unitLabelVi: "mảnh",
    unitLabelEn: "shards",
    iconPath: CALCULATOR_MATERIALS.universalHeroicSpiritShard.iconPath,
    rarity: "mythic",
    categoryGroup: "pets_troops",
    defaultHoardQty: 30,
    reservePriorityWeight: 85,
    garByDay: {
      5: { pointsPerBatch: 6000, batchSize: 1 },
      6: { pointsPerBatch: 6000, batchSize: 1 },
    },
    kvkByDay: {
      5: { pointsPerBatch: 6000, batchSize: 1 },
    },
    bestDaysGar: [5, 6],
    bestDaysKvk: [5],
  },
  {
    id: "pet_food",
    gameId: CALCULATOR_MATERIALS.petFood.gameId,
    nameVi: "Đồ Ăn Thú Cưng (Mỗi lô 100)",
    nameEn: "Pet Food (Per 100 units)",
    unitLabelVi: "khẩu phần",
    unitLabelEn: "rations",
    iconPath: CALCULATOR_MATERIALS.petFood.iconPath,
    rarity: "rare",
    categoryGroup: "pets_troops",
    defaultHoardQty: 10000,
    reservePriorityWeight: 40,
    garByDay: {
      5: { pointsPerBatch: 960, batchSize: 100 },
      6: { pointsPerBatch: 960, batchSize: 100 },
    },
    kvkByDay: {
      5: { pointsPerBatch: 400, batchSize: 100 },
      6: { pointsPerBatch: 600, batchSize: 100 },
    },
    bestDaysGar: [5, 6],
    bestDaysKvk: [6],
  },
  {
    id: "pet_essence",
    gameId: CALCULATOR_MATERIALS.petEssence.gameId,
    nameVi: CALCULATOR_MATERIALS.petEssence.nameVi,
    nameEn: CALCULATOR_MATERIALS.petEssence.nameEn,
    unitLabelVi: "lọ",
    unitLabelEn: "vials",
    iconPath: CALCULATOR_MATERIALS.petEssence.iconPath,
    rarity: "legendary",
    categoryGroup: "pets_troops",
    defaultHoardQty: 100,
    reservePriorityWeight: 72,
    garByDay: {
      5: { pointsPerBatch: 480, batchSize: 1 },
      6: { pointsPerBatch: 480, batchSize: 1 },
    },
    kvkByDay: {
      5: { pointsPerBatch: 200, batchSize: 1 },
      6: { pointsPerBatch: 300, batchSize: 1 },
    },
    bestDaysGar: [5, 6],
    bestDaysKvk: [6],
  },
  {
    id: "decor_token",
    gameId: 1004,
    nameVi: "Xu Trang Trí (Decor Token)",
    nameEn: "Decor Token",
    unitLabelVi: "xu",
    unitLabelEn: "tokens",
    iconPath: "/images/items/currencies/icon_10030.webp",
    rarity: "epic",
    categoryGroup: "pets_troops",
    defaultHoardQty: 100,
    reservePriorityWeight: 45,
    garByDay: { 6: { pointsPerBatch: 480, batchSize: 1 } },
    kvkByDay: { 6: { pointsPerBatch: 480, batchSize: 1 } },
    bestDaysGar: [6],
    bestDaysKvk: [6],
  },
  {
    id: "glory_medal",
    gameId: CALCULATOR_MATERIALS.gloryMedal.gameId,
    nameVi: "Huy Chương Vinh Dự (Mỗi lô 10)",
    nameEn: "Glory Medal (Per 10 units)",
    unitLabelVi: "huy chương",
    unitLabelEn: "medals",
    iconPath: CALCULATOR_MATERIALS.gloryMedal.iconPath,
    rarity: "legendary",
    categoryGroup: "pets_troops",
    defaultHoardQty: 5000,
    reservePriorityWeight: 68,
    garByDay: {},
    kvkByDay: {
      6: { pointsPerBatch: 12, batchSize: 10 },
    },
    bestDaysGar: [],
    bestDaysKvk: [6],
  },
  {
    id: "universal_legendary_troop_skin",
    gameId: 220303,
    nameVi: "Quân Trang Vạn Năng Cam",
    nameEn: "Universal Legendary Troop Skin",
    unitLabelVi: "bộ",
    unitLabelEn: "skins",
    iconPath: "/images/items/consumables/icon_30566.webp",
    rarity: "legendary",
    categoryGroup: "pets_troops",
    defaultHoardQty: 0,
    reservePriorityWeight: 96,
    garByDay: {},
    kvkByDay: {
      6: { pointsPerBatch: 300000, batchSize: 1 },
    },
    bestDaysGar: [],
    bestDaysKvk: [6],
  },
] as const;

export const DAILY_MILESTONE_CHESTS: readonly EventMilestoneChest[] = [
  {
    chestIndex: 1,
    tierGroup: "basic",
    chestIconPath: "/images/items/chests/bg_armsrace_box1.webp",
    requiredPoints: 50_000,
    baseDiamonds: 50,
    baseUniversalShards: 0,
    labelVi: "Rương 1 (Khởi Động)",
    labelEn: "Chest 1 (Starter)",
  },
  {
    chestIndex: 2,
    tierGroup: "basic",
    chestIconPath: "/images/items/chests/bg_armsrace_box1.webp",
    requiredPoints: 150_000,
    baseDiamonds: 100,
    baseUniversalShards: 0,
    labelVi: "Rương 2 (Sơ Cấp)",
    labelEn: "Chest 2 (Basic)",
  },
  {
    chestIndex: 3,
    tierGroup: "basic",
    chestIconPath: "/images/items/chests/bg_armsrace_box1.webp",
    requiredPoints: 300_000,
    baseDiamonds: 150,
    baseUniversalShards: 1,
    labelVi: "Rương 3 (Mốc Đồng)",
    labelEn: "Chest 3 (Bronze)",
  },
  {
    chestIndex: 4,
    tierGroup: "intermediate",
    chestIconPath: "/images/items/chests/bg_armsrace_box2.webp",
    requiredPoints: 600_000,
    baseDiamonds: 200,
    baseUniversalShards: 1,
    labelVi: "Rương 4 (Trung Cấp)",
    labelEn: "Chest 4 (Intermediate)",
  },
  {
    chestIndex: 5,
    tierGroup: "intermediate",
    chestIconPath: "/images/items/chests/bg_armsrace_box2.webp",
    requiredPoints: 1_000_000,
    baseDiamonds: 300,
    baseUniversalShards: 1,
    labelVi: "Rương 5 (Mốc Bạc)",
    labelEn: "Chest 5 (Silver)",
  },
  {
    chestIndex: 6,
    tierGroup: "intermediate",
    chestIconPath: "/images/items/chests/bg_armsrace_box2.webp",
    requiredPoints: 1_500_000,
    baseDiamonds: 500,
    baseUniversalShards: 2,
    labelVi: "Rương 6 (Mốc Vàng)",
    labelEn: "Chest 6 (Gold)",
  },
  {
    chestIndex: 7,
    tierGroup: "supreme",
    chestIconPath: "/images/items/chests/bg_armsrace_box3.webp",
    requiredPoints: 2_100_000,
    baseDiamonds: 700,
    baseUniversalShards: 2,
    labelVi: "Rương 7 (Cao Cấp)",
    labelEn: "Chest 7 (High)",
  },
  {
    chestIndex: 8,
    tierGroup: "supreme",
    chestIconPath: "/images/items/chests/bg_armsrace_box3.webp",
    requiredPoints: 2_800_000,
    baseDiamonds: 1000,
    baseUniversalShards: 3,
    labelVi: "Rương 8 (Đại Sư)",
    labelEn: "Chest 8 (Master)",
  },
  {
    chestIndex: 9,
    tierGroup: "supreme",
    chestIconPath: "/images/items/chests/bg_armsrace_box3.webp",
    requiredPoints: 3_600_000,
    baseDiamonds: 1500,
    baseUniversalShards: 5,
    labelVi: "Rương 9 (Tối Thượng)",
    labelEn: "Chest 9 (Supreme)",
  },
] as const;

export const TECH_BUFF_PRESET_PERCENTS = [0, 25, 50, 75, 100] as const;

export interface EventItemEvaluatedRow {
  readonly item: EventInventoryItemDefinition;
  readonly quantity: number;
  readonly activeRule: EventPointRule | null;
  readonly effectiveBatches: number;
  readonly remainderUnits: number;
  readonly basePoints: number;
  readonly buffedPoints: number;
  readonly buffedPointsPerBatch: number;
  readonly isZeroPointTrapOnSelectedDay: boolean;
  readonly bestDaysForMode: readonly EventDayNumber[];
}

export interface SurplusReserveRecommendation {
  readonly item: EventInventoryItemDefinition;
  readonly holdbackQuantity: number;
  readonly spendQuantity: number;
  readonly savedBuffedPoints: number;
}

export interface EventPointsCalculationInput {
  readonly mode: EventScoringMode;
  readonly selectedDay: EventDayNumber;
  readonly techBuffPercent: number;
  readonly hasDoubleRewardsTech: boolean;
  readonly quantitiesByItemId: Readonly<Record<string, number>>;
}

export interface EventPointsCalculationResult {
  readonly mode: EventScoringMode;
  readonly selectedDay: EventDayNumber;
  readonly dayMeta: EventDayMetadata;
  readonly techBuffPercent: number;
  readonly techMultiplier: number;
  readonly hasDoubleRewardsTech: boolean;
  readonly rows: readonly EventItemEvaluatedRow[];
  readonly activeScoringRows: readonly EventItemEvaluatedRow[];
  readonly zeroPointTrapRows: readonly EventItemEvaluatedRow[];
  readonly totalBasePoints: number;
  readonly totalBuffedPoints: number;
  readonly unlockedChestCount: number;
  readonly nextChest: EventMilestoneChest | null;
  readonly pointsToNextChest: number;
  readonly chest9TargetPoints: number;
  readonly surplusPointsAboveChest9: number;
  readonly surplusReserveRecommendations: readonly SurplusReserveRecommendation[];
  readonly totalEarnedDiamonds: number;
  readonly totalEarnedUniversalShards: number;
  readonly dailySummaryAcross6Days: readonly {
    readonly day: EventDayNumber;
    readonly basePoints: number;
    readonly buffedPoints: number;
    readonly unlockedChests: number;
  }[];
}

export function clampTechBuffPercent(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(100, Math.round(value)));
}

export function evaluateItemOnDay(
  item: EventInventoryItemDefinition,
  quantity: number,
  mode: EventScoringMode,
  day: EventDayNumber,
  techBuffPercent: number
): EventItemEvaluatedRow {
  const safeQty = Math.max(
    0,
    Math.floor(Number.isFinite(quantity) ? quantity : 0)
  );
  const clampedTech = clampTechBuffPercent(techBuffPercent);
  const ruleMap = mode === "gar" ? item.garByDay : item.kvkByDay;
  const activeRule = ruleMap[day] ?? null;
  const bestDaysForMode = mode === "gar" ? item.bestDaysGar : item.bestDaysKvk;

  if (!activeRule || safeQty === 0) {
    return {
      item,
      quantity: safeQty,
      activeRule,
      effectiveBatches: 0,
      remainderUnits: safeQty,
      basePoints: 0,
      buffedPoints: 0,
      buffedPointsPerBatch: 0,
      isZeroPointTrapOnSelectedDay: safeQty > 0 && activeRule === null,
      bestDaysForMode,
    };
  }

  const effectiveBatches = Math.floor(safeQty / activeRule.batchSize);
  const remainderUnits = safeQty % activeRule.batchSize;
  const basePoints = effectiveBatches * activeRule.pointsPerBatch;
  const buffedPoints = Math.floor(basePoints * (1 + clampedTech / 100));
  const buffedPointsPerBatch = Math.floor(
    activeRule.pointsPerBatch * (1 + clampedTech / 100)
  );

  return {
    item,
    quantity: safeQty,
    activeRule,
    effectiveBatches,
    remainderUnits,
    basePoints,
    buffedPoints,
    buffedPointsPerBatch,
    isZeroPointTrapOnSelectedDay: false,
    bestDaysForMode,
  };
}

export function calculateEventPoints(
  input: EventPointsCalculationInput
): EventPointsCalculationResult {
  const techBuffPercent = clampTechBuffPercent(input.techBuffPercent);
  const techMultiplier = Number((1 + techBuffPercent / 100).toFixed(2));
  const dayMeta =
    EVENT_DAYS_METADATA.find((d) => d.day === input.selectedDay) ??
    EVENT_DAYS_METADATA[0];

  const rows = EVENT_INVENTORY_ITEMS.map((item) =>
    evaluateItemOnDay(
      item,
      input.quantitiesByItemId[item.id] ?? 0,
      input.mode,
      input.selectedDay,
      techBuffPercent
    )
  );

  const activeScoringRows = rows.filter((r) => r.activeRule !== null);
  const zeroPointTrapRows = rows.filter((r) => r.isZeroPointTrapOnSelectedDay);

  const totalBasePoints = activeScoringRows.reduce(
    (sum, r) => sum + r.basePoints,
    0
  );
  const totalBuffedPoints = activeScoringRows.reduce(
    (sum, r) => sum + r.buffedPoints,
    0
  );

  const unlockedChests = DAILY_MILESTONE_CHESTS.filter(
    (c) => totalBuffedPoints >= c.requiredPoints
  );
  const unlockedChestCount = unlockedChests.length;
  const nextChest =
    DAILY_MILESTONE_CHESTS.find((c) => totalBuffedPoints < c.requiredPoints) ??
    null;
  const pointsToNextChest = nextChest
    ? Math.max(0, nextChest.requiredPoints - totalBuffedPoints)
    : 0;

  const chest9TargetPoints =
    DAILY_MILESTONE_CHESTS[DAILY_MILESTONE_CHESTS.length - 1].requiredPoints;
  const surplusPointsAboveChest9 = Math.max(
    0,
    totalBuffedPoints - chest9TargetPoints
  );

  const surplusReserveRecommendations: SurplusReserveRecommendation[] = [];
  if (surplusPointsAboveChest9 > 0) {
    let remainingSurplus = surplusPointsAboveChest9;
    const prioritizedScoringRows = [...activeScoringRows]
      .filter((r) => r.effectiveBatches > 0 && r.buffedPointsPerBatch > 0)
      .sort(
        (a, b) => b.item.reservePriorityWeight - a.item.reservePriorityWeight
      );

    for (const row of prioritizedScoringRows) {
      if (remainingSurplus < row.buffedPointsPerBatch || !row.activeRule) {
        continue;
      }
      const maxHoldbackBatches = Math.min(
        row.effectiveBatches,
        Math.floor(remainingSurplus / row.buffedPointsPerBatch)
      );
      if (maxHoldbackBatches > 0) {
        const holdbackQuantity =
          maxHoldbackBatches * row.activeRule.batchSize + row.remainderUnits;
        const spendQuantity = Math.max(0, row.quantity - holdbackQuantity);
        const savedBuffedPoints = maxHoldbackBatches * row.buffedPointsPerBatch;
        remainingSurplus -= savedBuffedPoints;
        surplusReserveRecommendations.push({
          item: row.item,
          holdbackQuantity,
          spendQuantity,
          savedBuffedPoints,
        });
      }
    }
  }

  const rewardMultiplier = input.hasDoubleRewardsTech ? 2 : 1;
  const totalEarnedDiamonds =
    unlockedChests.reduce((sum, c) => sum + c.baseDiamonds, 0) *
    rewardMultiplier;
  const totalEarnedUniversalShards =
    unlockedChests.reduce((sum, c) => sum + c.baseUniversalShards, 0) *
    rewardMultiplier;

  const dailySummaryAcross6Days = ([1, 2, 3, 4, 5, 6] as const).map(
    (dayNum) => {
      let dayBase = 0;
      let dayBuffed = 0;
      for (const item of EVENT_INVENTORY_ITEMS) {
        const evaluated = evaluateItemOnDay(
          item,
          input.quantitiesByItemId[item.id] ?? 0,
          input.mode,
          dayNum,
          techBuffPercent
        );
        dayBase += evaluated.basePoints;
        dayBuffed += evaluated.buffedPoints;
      }
      const dayChests = DAILY_MILESTONE_CHESTS.filter(
        (c) => dayBuffed >= c.requiredPoints
      ).length;
      return {
        day: dayNum,
        basePoints: dayBase,
        buffedPoints: dayBuffed,
        unlockedChests: dayChests,
      };
    }
  );

  return {
    mode: input.mode,
    selectedDay: input.selectedDay,
    dayMeta,
    techBuffPercent,
    techMultiplier,
    hasDoubleRewardsTech: input.hasDoubleRewardsTech,
    rows,
    activeScoringRows,
    zeroPointTrapRows,
    totalBasePoints,
    totalBuffedPoints,
    unlockedChestCount,
    nextChest,
    pointsToNextChest,
    chest9TargetPoints,
    surplusPointsAboveChest9,
    surplusReserveRecommendations,
    totalEarnedDiamonds,
    totalEarnedUniversalShards,
    dailySummaryAcross6Days,
  };
}

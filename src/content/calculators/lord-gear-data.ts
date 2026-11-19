/**
 * Single Source of Truth for Category 5: Đồ Chúa Tể (Lord Gear) Calculators (5.1 & 5.2).
 * Extracted directly from Top Heroes game cache:
 * - Table `lord_equipment` (1,060 rows: 6 main slots × 166 levels + 7th slot Sacred Tome × 64 levels)
 * - Table `lord_equip_master` (34 rows: 17 tiers × 3-piece & 6-piece Mastery Resonance)
 * - Table `Locale_vi.bytes` (Official Vietnamese localization)
 */

export type LordGearSlotId =
  | "nature_shield"
  | "league_crown"
  | "horde_spear"
  | "nature_totem"
  | "league_ring"
  | "horde_collar";

export type LordGearFaction = "nature" | "league" | "horde";

export type LordGearBranch = "left_defense" | "right_offense";

export type LordGearQualityCode = 0 | 2 | 3 | 4 | 5 | 6;

export interface LordGearMaterialBag {
  readonly refinedMetal: number;
  readonly magicThread: number;
  readonly orichalcum: number;
  readonly dragonBlood: number;
}

export interface LordGearBranchStatValues {
  readonly factionHeroPct: number;
  readonly factionSoldierPct: number;
  readonly allSoldierPct: number;
}

export interface LordGearSlotMeta {
  readonly id: LordGearSlotId;
  readonly metaType: 1 | 2 | 3 | 4 | 5 | 6;
  readonly faction: LordGearFaction;
  readonly branch: LordGearBranch;
  readonly gridRow: 1 | 2 | 3;
  readonly iconPath: string;
  readonly name: {
    readonly vi: string;
    readonly en: string;
  };
  readonly positionLabel: {
    readonly vi: string;
    readonly en: string;
  };
  readonly statLabels: {
    readonly factionHero: { readonly vi: string; readonly en: string };
    readonly factionSoldier: { readonly vi: string; readonly en: string };
    readonly allSoldier: { readonly vi: string; readonly en: string };
  };
}

export interface LordGearLevelStep {
  readonly level: number;
  readonly quality: LordGearQualityCode;
  readonly tierNumber: number;
  readonly star: number;
  readonly starSub: number;
  readonly starSubMax: number;
  readonly fightForce: number;
  /** Cost required to reach this level from (level - 1) */
  readonly stepCost: LordGearMaterialBag;
  readonly defenseStats: LordGearBranchStatValues;
  readonly offenseStats: LordGearBranchStatValues;
  readonly label: {
    readonly vi: string;
    readonly en: string;
  };
  readonly tierGroupLabel: {
    readonly vi: string;
    readonly en: string;
  };
  readonly shortCode: string;
  readonly isExtended: boolean;
}

export interface LordGearSacredTomeStep {
  readonly level: number;
  readonly quality: LordGearQualityCode;
  readonly tierNumber: number;
  readonly star: number;
  readonly starSub: number;
  readonly starSubMax: number;
  readonly fightForce: number;
  readonly stepCost: LordGearMaterialBag;
  readonly armorBreakPct: number;
  readonly ultCdReductionPct: number;
  readonly enemyUltCdIncreasePct: number;
  readonly heroAtkPct: number;
  readonly heroHpPct: number;
  readonly label: {
    readonly vi: string;
    readonly en: string;
  };
}

export interface LordGearMasteryTier {
  readonly tierIndex: number;
  readonly requiredLevel: number;
  readonly quality: LordGearQualityCode;
  readonly label: {
    readonly vi: string;
    readonly en: string;
  };
  /** 3-Piece Mastery (equip_num = 3 in Meta.bytes): Hero HP + All Soldiers ATK */
  readonly threePieceFightForce: number;
  readonly threePieceHeroHpPct: number;
  readonly threePieceAllSoldierAtkPct: number;
  /** 6-Piece Mastery (equip_num = 6 in Meta.bytes): Hero ATK + All Soldiers ATK + All Soldiers HP */
  readonly sixPieceFightForce: number;
  readonly sixPieceHeroAtkPct: number;
  readonly sixPieceAllSoldierAtkPct: number;
  readonly sixPieceAllSoldierHpPct: number;
}

export interface LordGearSlotUpgradeResult {
  readonly slot: LordGearSlotMeta;
  readonly fromLevel: number;
  readonly toLevel: number;
  readonly fromStep: LordGearLevelStep;
  readonly toStep: LordGearLevelStep;
  readonly stepsCount: number;
  readonly fightForceDelta: number;
  readonly cost: LordGearMaterialBag;
  readonly fromStats: LordGearBranchStatValues;
  readonly toStats: LordGearBranchStatValues;
  readonly statDeltas: LordGearBranchStatValues;
}

export interface LordGearMasteryEvaluation {
  readonly sortedLevelsDesc: readonly number[];
  readonly top3MinLevel: number;
  readonly all6MinLevel: number;
  readonly active3Piece: LordGearMasteryTier | null;
  readonly next3Piece: LordGearMasteryTier | null;
  readonly active6Piece: LordGearMasteryTier | null;
  readonly next6Piece: LordGearMasteryTier | null;
  readonly totalMasteryFightForce: number;
}

export interface LordGearSixSlotsPlanResult {
  readonly slotResults: readonly LordGearSlotUpgradeResult[];
  readonly sacredTomeResult: {
    readonly fromLevel: number;
    readonly toLevel: number;
    readonly fromStep: LordGearSacredTomeStep;
    readonly toStep: LordGearSacredTomeStep;
    readonly fightForceDelta: number;
    readonly cost: LordGearMaterialBag;
  } | null;
  readonly totalCost: LordGearMaterialBag;
  readonly inventory: LordGearMaterialBag;
  readonly remainingInventory: LordGearMaterialBag;
  readonly deficit: LordGearMaterialBag;
  readonly isSufficient: boolean;
  readonly totalFightForceBefore: number;
  readonly totalFightForceAfter: number;
  readonly totalFightForceDelta: number;
  readonly beforeMastery: LordGearMasteryEvaluation;
  readonly afterMastery: LordGearMasteryEvaluation;
}

export interface LordGearStaggeredCycleStep {
  readonly stepNumber: 1 | 2 | 3 | 4;
  readonly title: {
    readonly vi: string;
    readonly en: string;
  };
  readonly description: {
    readonly vi: string;
    readonly en: string;
  };
  readonly targetSlotIds: readonly LordGearSlotId[];
  readonly targetLevel: number;
  readonly targetLabel: {
    readonly vi: string;
    readonly en: string;
  };
  readonly cost: LordGearMaterialBag;
  readonly unlocksMasteryLabel: {
    readonly vi: string;
    readonly en: string;
  };
}

export interface LordGearStaggeredCyclePlan {
  readonly mainFaction: LordGearFaction;
  readonly spearheadSlotIds: readonly LordGearSlotId[];
  readonly followUpSlotIds: readonly LordGearSlotId[];
  readonly currentMastery: LordGearMasteryEvaluation;
  readonly sacredTomeReadyCount: number;
  readonly isSacredTomeUnlocked: boolean;
  readonly steps: readonly LordGearStaggeredCycleStep[];
}

export const LORD_GEAR_STANDARD_MAX_LEVEL = 103;
export const LORD_GEAR_EXTENDED_MAX_LEVEL = 166;
/** Yellow T2 (Lv.33) threshold for Y2 Sacred Tome / Season 3 readiness */
export const LORD_GEAR_SACRED_TOME_UNLOCK_LEVEL = 33;

export const LORD_GEAR_SLOTS: readonly LordGearSlotMeta[] = [
  {
    id: "nature_shield",
    metaType: 1,
    faction: "nature",
    branch: "left_defense",
    gridRow: 1,
    iconPath: "/images/items/consumables/icon_lord_3.webp",
    name: { vi: "Khiên Dây Leo", en: "Vine Shield" },
    positionLabel: { vi: "Trái Trên • Thiên Nhiên (Thủ)", en: "Top-Left • Nature (DEF)" },
    statLabels: {
      factionHero: { vi: "HP Anh Hùng Thiên Nhiên", en: "Nature Hero HP" },
      factionSoldier: { vi: "HP Lính Thiên Nhiên", en: "Nature Soldier HP" },
      allSoldier: { vi: "Tấn Công Tất Cả Lính", en: "All Soldiers ATK" },
    },
  },
  {
    id: "league_crown",
    metaType: 3,
    faction: "league",
    branch: "left_defense",
    gridRow: 2,
    iconPath: "/images/items/consumables/icon_lord_1.webp",
    name: { vi: "Vương Miện Thống Trị", en: "Crown of Dominion" },
    positionLabel: { vi: "Trái Giữa • Liên Minh (Thủ)", en: "Mid-Left • League (DEF)" },
    statLabels: {
      factionHero: { vi: "HP Anh Hùng Liên Minh", en: "League Hero HP" },
      factionSoldier: { vi: "HP Lính Liên Minh", en: "League Soldier HP" },
      allSoldier: { vi: "Tấn Công Tất Cả Lính", en: "All Soldiers ATK" },
    },
  },
  {
    id: "horde_spear",
    metaType: 5,
    faction: "horde",
    branch: "left_defense",
    gridRow: 3,
    iconPath: "/images/items/consumables/icon_lord_2.webp",
    name: { vi: "Giáo Hoang Dã", en: "Savage Spear" },
    positionLabel: { vi: "Trái Dưới • Bộ Tộc (Thủ)", en: "Bottom-Left • Horde (DEF)" },
    statLabels: {
      factionHero: { vi: "HP Anh Hùng Bộ Tộc", en: "Horde Hero HP" },
      factionSoldier: { vi: "HP Lính Bộ Tộc", en: "Horde Soldier HP" },
      allSoldier: { vi: "Tấn Công Tất Cả Lính", en: "All Soldiers ATK" },
    },
  },
  {
    id: "nature_totem",
    metaType: 2,
    faction: "nature",
    branch: "right_offense",
    gridRow: 1,
    iconPath: "/images/items/consumables/icon_lord_6.webp",
    name: { vi: "Vật Tổ Sinh Mệnh", en: "Totem of Life" },
    positionLabel: { vi: "Phải Trên • Thiên Nhiên (Công)", en: "Top-Right • Nature (ATK)" },
    statLabels: {
      factionHero: { vi: "Tấn Công Anh Hùng Thiên Nhiên", en: "Nature Hero ATK" },
      factionSoldier: { vi: "Tấn Công Lính Thiên Nhiên", en: "Nature Soldier ATK" },
      allSoldier: { vi: "HP Tất Cả Lính", en: "All Soldiers HP" },
    },
  },
  {
    id: "league_ring",
    metaType: 4,
    faction: "league",
    branch: "right_offense",
    gridRow: 2,
    iconPath: "/images/items/consumables/icon_lord_4.webp",
    name: { vi: "Nhẫn Hoàng Gia", en: "Royal Ring" },
    positionLabel: { vi: "Phải Giữa • Liên Minh (Công)", en: "Mid-Right • League (ATK)" },
    statLabels: {
      factionHero: { vi: "Tấn Công Anh Hùng Liên Minh", en: "League Hero ATK" },
      factionSoldier: { vi: "Tấn Công Lính Liên Minh", en: "League Soldier ATK" },
      allSoldier: { vi: "HP Tất Cả Lính", en: "All Soldiers HP" },
    },
  },
  {
    id: "horde_collar",
    metaType: 6,
    faction: "horde",
    branch: "right_offense",
    gridRow: 3,
    iconPath: "/images/items/consumables/icon_lord_5.webp",
    name: { vi: "Vòng Nanh Thú", en: "Fang Collar" },
    positionLabel: { vi: "Phải Dưới • Bộ Tộc (Công)", en: "Bottom-Right • Horde (ATK)" },
    statLabels: {
      factionHero: { vi: "Tấn Công Anh Hùng Bộ Tộc", en: "Horde Hero ATK" },
      factionSoldier: { vi: "Tấn Công Lính Bộ Tộc", en: "Horde Soldier ATK" },
      allSoldier: { vi: "HP Tất Cả Lính", en: "All Soldiers HP" },
    },
  },
] as const;

type CompactMainStepTuple = readonly [
  level: number,
  quality: number,
  tierNum: number,
  star: number,
  starSub: number,
  starSubMax: number,
  fightForce: number,
  m154: number,
  m155: number,
  m156: number,
  m157: number,
  defHeroHpBp: number,
  defSoldierHpBp: number,
  defAllSoldierAtkBp: number,
  offHeroAtkBp: number,
  offSoldierAtkBp: number,
  offAllSoldierHpBp: number,
];

const RAW_MAIN_STEPS: readonly CompactMainStepTuple[] = [
  [1, 2, 0, 0, 0, 0, 1818, 1500, 20, 0, 0, 75, 205, 25, 35, 75, 70],
  [2, 2, 0, 1, 0, 1, 3897, 3800, 40, 0, 0, 150, 410, 50, 75, 155, 135],
  [3, 3, 0, 0, 0, 0, 5600, 4000, 50, 0, 0, 230, 635, 80, 115, 240, 210],
  [4, 3, 0, 1, 0, 2, 7304, 6400, 60, 0, 0, 270, 745, 95, 135, 280, 250],
  [5, 3, 0, 1, 1, 2, 9008, 6400, 60, 0, 0, 310, 860, 110, 155, 325, 285],
  [6, 3, 0, 2, 0, 2, 10712, 1300, 5, 10, 0, 355, 970, 120, 175, 365, 325],
  [7, 3, 0, 2, 1, 2, 12416, 1300, 5, 10, 0, 395, 1080, 135, 195, 410, 360],
  [8, 3, 0, 3, 0, 2, 14120, 1500, 5, 10, 0, 435, 1195, 150, 215, 455, 400],
  [9, 3, 0, 3, 1, 2, 15824, 1500, 5, 10, 0, 475, 1305, 165, 240, 495, 435],
  [10, 4, 0, 0, 0, 0, 17597, 1800, 5, 12, 0, 565, 1550, 195, 280, 590, 515],
  [11, 4, 0, 1, 0, 3, 19370, 1300, 5, 12, 0, 595, 1635, 205, 295, 620, 545],
  [12, 4, 0, 1, 1, 3, 21143, 1300, 5, 12, 0, 625, 1715, 215, 310, 650, 570],
  [13, 4, 0, 1, 2, 3, 22916, 1300, 5, 12, 0, 655, 1795, 225, 325, 680, 600],
  [14, 4, 0, 2, 0, 3, 24690, 2500, 20, 12, 0, 685, 1880, 235, 340, 710, 625],
  [15, 4, 0, 2, 1, 3, 26463, 2500, 20, 12, 0, 715, 1960, 250, 355, 745, 655],
  [16, 4, 0, 2, 2, 3, 28236, 2500, 20, 12, 0, 745, 2040, 260, 370, 775, 680],
  [17, 4, 0, 3, 0, 3, 30009, 3500, 30, 12, 0, 770, 2125, 270, 385, 805, 710],
  [18, 4, 0, 3, 1, 3, 31782, 3500, 30, 12, 0, 800, 2205, 280, 400, 835, 735],
  [19, 4, 0, 3, 2, 3, 33556, 3500, 30, 12, 0, 830, 2285, 290, 415, 865, 760],
  [20, 5, 1, 0, 0, 0, 35469, 3300, 30, 15, 0, 930, 2565, 325, 465, 970, 855],
  [21, 5, 1, 1, 0, 4, 37382, 3900, 30, 15, 0, 955, 2630, 330, 480, 995, 875],
  [22, 5, 1, 1, 1, 4, 39295, 3900, 30, 15, 0, 980, 2700, 340, 490, 1025, 900],
  [23, 5, 1, 1, 2, 4, 41208, 4400, 30, 15, 0, 1005, 2770, 350, 505, 1050, 925],
  [24, 5, 1, 1, 3, 4, 43121, 4400, 30, 15, 0, 1030, 2840, 360, 515, 1075, 945],
  [25, 5, 1, 2, 0, 4, 45034, 4900, 35, 15, 0, 1055, 2905, 365, 530, 1100, 970],
  [26, 5, 1, 2, 1, 4, 46948, 4900, 35, 15, 0, 1080, 2975, 375, 540, 1125, 990],
  [27, 5, 1, 2, 2, 4, 48861, 4900, 35, 15, 0, 1105, 3045, 385, 555, 1155, 1015],
  [28, 5, 1, 2, 3, 4, 50774, 4900, 35, 15, 0, 1130, 3115, 395, 565, 1180, 1040],
  [29, 5, 1, 3, 0, 4, 52687, 5400, 45, 20, 0, 1155, 3185, 400, 580, 1205, 1060],
  [30, 5, 1, 3, 1, 4, 54600, 5400, 45, 20, 0, 1185, 3250, 410, 590, 1230, 1085],
  [31, 5, 1, 3, 2, 4, 56513, 5400, 45, 20, 0, 1210, 3320, 420, 605, 1260, 1105],
  [32, 5, 1, 3, 3, 4, 58427, 5400, 45, 20, 0, 1235, 3390, 430, 615, 1285, 1130],
  [33, 5, 2, 0, 0, 0, 61024, 5500, 50, 20, 0, 1350, 3705, 470, 675, 1405, 1235],
  [34, 5, 2, 1, 0, 4, 63621, 7300, 75, 20, 0, 1375, 3785, 480, 690, 1435, 1260],
  [35, 5, 2, 1, 1, 4, 66218, 7300, 75, 20, 0, 1405, 3865, 490, 705, 1465, 1290],
  [36, 5, 2, 1, 2, 4, 68815, 7300, 75, 20, 0, 1435, 3945, 500, 715, 1495, 1315],
  [37, 5, 2, 1, 3, 4, 71412, 7300, 75, 20, 0, 1465, 4025, 510, 730, 1525, 1340],
  [38, 5, 2, 2, 0, 4, 74009, 7800, 75, 20, 0, 1490, 4100, 520, 745, 1555, 1365],
  [39, 5, 2, 2, 1, 4, 76606, 7800, 75, 20, 0, 1520, 4180, 530, 760, 1585, 1395],
  [40, 5, 2, 2, 2, 4, 79203, 7800, 75, 20, 0, 1550, 4260, 540, 775, 1615, 1420],
  [41, 5, 2, 2, 3, 4, 81800, 7800, 75, 20, 0, 1580, 4340, 550, 790, 1645, 1445],
  [42, 5, 2, 3, 0, 4, 84397, 8100, 85, 20, 0, 1605, 4420, 560, 805, 1675, 1475],
  [43, 5, 2, 3, 1, 4, 86994, 8100, 85, 20, 0, 1635, 4500, 570, 820, 1705, 1500],
  [44, 5, 2, 3, 2, 4, 89591, 8100, 85, 20, 0, 1665, 4575, 580, 830, 1735, 1525],
  [45, 5, 2, 3, 3, 4, 92188, 8100, 85, 20, 0, 1695, 4655, 590, 845, 1765, 1550],
  [46, 5, 3, 0, 0, 0, 95565, 8500, 85, 20, 0, 1825, 5015, 635, 910, 1900, 1670],
  [47, 5, 3, 1, 0, 4, 98942, 9000, 95, 20, 0, 1855, 5105, 645, 930, 1935, 1700],
  [48, 5, 3, 1, 1, 4, 102320, 9000, 95, 20, 0, 1890, 5190, 655, 945, 1965, 1730],
  [49, 5, 3, 1, 2, 4, 105697, 9000, 95, 20, 0, 1920, 5280, 665, 960, 2000, 1760],
  [50, 5, 3, 1, 3, 4, 109075, 9000, 95, 20, 0, 1955, 5370, 680, 975, 2035, 1790],
  [51, 5, 3, 2, 0, 4, 112452, 9500, 95, 20, 0, 1985, 5460, 690, 995, 2070, 1820],
  [52, 5, 3, 2, 1, 4, 115830, 9500, 95, 20, 0, 2020, 5550, 700, 1010, 2100, 1850],
  [53, 5, 3, 2, 2, 4, 119207, 9500, 95, 20, 0, 2050, 5640, 710, 1025, 2135, 1880],
  [54, 5, 3, 2, 3, 4, 122585, 9500, 95, 20, 0, 2085, 5730, 725, 1040, 2170, 1910],
  [55, 5, 3, 3, 0, 4, 125962, 10000, 95, 20, 0, 2115, 5815, 735, 1060, 2205, 1940],
  [56, 5, 3, 3, 1, 4, 129340, 10000, 95, 20, 0, 2150, 5905, 745, 1075, 2235, 1970],
  [57, 5, 3, 3, 2, 4, 132717, 10000, 95, 20, 0, 2180, 5995, 755, 1090, 2270, 2000],
  [58, 5, 3, 3, 3, 4, 136095, 10000, 95, 20, 0, 2215, 6085, 770, 1105, 2305, 2030],
  [59, 5, 4, 0, 0, 0, 140427, 10000, 90, 20, 0, 2360, 6495, 820, 1180, 2460, 2165],
  [60, 5, 4, 1, 0, 4, 144760, 13000, 130, 22, 0, 2400, 6595, 835, 1200, 2500, 2200],
  [61, 5, 4, 1, 1, 4, 149093, 13000, 130, 22, 0, 2435, 6700, 845, 1220, 2535, 2235],
  [62, 5, 4, 1, 2, 4, 153426, 13000, 130, 22, 0, 2475, 6800, 860, 1235, 2575, 2265],
  [63, 5, 4, 1, 3, 4, 157759, 13000, 130, 22, 0, 2510, 6900, 870, 1255, 2615, 2300],
  [64, 5, 4, 2, 0, 4, 162092, 13000, 140, 23, 0, 2545, 7005, 885, 1275, 2655, 2335],
  [65, 5, 4, 2, 1, 4, 166424, 13000, 140, 23, 0, 2585, 7105, 895, 1290, 2690, 2370],
  [66, 5, 4, 2, 2, 4, 170757, 13000, 140, 23, 0, 2620, 7210, 910, 1310, 2730, 2405],
  [67, 5, 4, 2, 3, 4, 175090, 13000, 140, 23, 0, 2660, 7310, 925, 1330, 2770, 2435],
  [68, 5, 4, 3, 0, 4, 179423, 14000, 150, 25, 0, 2695, 7415, 935, 1350, 2810, 2470],
  [69, 5, 4, 3, 1, 4, 183756, 14000, 150, 25, 0, 2735, 7515, 950, 1365, 2845, 2505],
  [70, 5, 4, 3, 2, 4, 188089, 14000, 150, 25, 0, 2770, 7615, 960, 1385, 2885, 2540],
  [71, 5, 4, 3, 3, 4, 192422, 14000, 150, 25, 0, 2805, 7720, 975, 1405, 2925, 2575],
  [72, 6, 0, 0, 0, 0, 196817, 15000, 140, 20, 2, 2975, 8180, 1035, 1485, 3100, 2725],
  [73, 6, 0, 1, 0, 5, 201212, 13000, 140, 20, 2, 3005, 8270, 1045, 1505, 3135, 2755],
  [74, 6, 0, 1, 1, 5, 205607, 13000, 140, 20, 2, 3040, 8360, 1055, 1520, 3170, 2785],
  [75, 6, 0, 1, 2, 5, 210002, 13000, 140, 20, 2, 3075, 8455, 1065, 1535, 3200, 2820],
  [76, 6, 0, 1, 3, 5, 214397, 13000, 140, 20, 2, 3110, 8545, 1080, 1555, 3235, 2850],
  [77, 6, 0, 1, 4, 5, 218792, 13000, 140, 20, 2, 3140, 8640, 1090, 1570, 3270, 2880],
  [78, 6, 0, 2, 0, 5, 223187, 13500, 160, 25, 2, 3175, 8730, 1100, 1585, 3305, 2910],
  [79, 6, 0, 2, 1, 5, 227582, 13500, 160, 25, 2, 3210, 8820, 1115, 1605, 3340, 2940],
  [80, 6, 0, 2, 2, 5, 231977, 13500, 160, 25, 2, 3240, 8915, 1125, 1620, 3375, 2970],
  [81, 6, 0, 2, 3, 5, 236372, 13500, 160, 25, 2, 3275, 9005, 1135, 1635, 3410, 3000],
  [82, 6, 0, 2, 4, 5, 240767, 13500, 160, 25, 2, 3310, 9095, 1150, 1655, 3445, 3030],
  [83, 6, 0, 3, 0, 5, 245162, 14000, 160, 25, 4, 3340, 9190, 1160, 1670, 3480, 3065],
  [84, 6, 0, 3, 1, 5, 249557, 14000, 160, 25, 4, 3375, 9280, 1170, 1685, 3515, 3095],
  [85, 6, 0, 3, 2, 5, 253952, 14000, 160, 25, 4, 3410, 9375, 1185, 1705, 3550, 3125],
  [86, 6, 0, 3, 3, 5, 258347, 14000, 160, 25, 4, 3440, 9465, 1195, 1720, 3585, 3155],
  [87, 6, 0, 3, 4, 5, 262742, 14000, 160, 25, 4, 3475, 9555, 1205, 1740, 3620, 3185],
  [88, 6, 1, 0, 0, 0, 268109, 15000, 180, 25, 4, 3660, 10065, 1270, 1830, 3815, 3355],
  [89, 6, 1, 1, 0, 5, 273477, 14000, 160, 28, 3, 3700, 10170, 1285, 1850, 3850, 3390],
  [90, 6, 1, 1, 1, 5, 278844, 14000, 160, 28, 3, 3735, 10270, 1295, 1870, 3890, 3425],
  [91, 6, 1, 1, 2, 5, 284212, 14000, 160, 28, 3, 3770, 10375, 1310, 1885, 3930, 3460],
  [92, 6, 1, 1, 3, 5, 289580, 14000, 160, 28, 3, 3810, 10475, 1325, 1905, 3970, 3490],
  [93, 6, 1, 1, 4, 5, 294947, 14000, 160, 28, 3, 3845, 10580, 1335, 1925, 4005, 3525],
  [94, 6, 1, 2, 0, 5, 300315, 15000, 170, 30, 4, 3885, 10680, 1350, 1940, 4045, 3560],
  [95, 6, 1, 2, 1, 5, 305683, 15000, 170, 30, 4, 3920, 10780, 1360, 1960, 4085, 3595],
  [96, 6, 1, 2, 2, 5, 311050, 15000, 170, 30, 4, 3960, 10885, 1375, 1980, 4125, 3630],
  [97, 6, 1, 2, 3, 5, 316418, 15000, 170, 30, 4, 3995, 10985, 1385, 2000, 4160, 3660],
  [98, 6, 1, 2, 4, 5, 321785, 15000, 170, 30, 4, 4030, 11090, 1400, 2015, 4200, 3695],
  [99, 6, 1, 3, 0, 5, 327153, 16500, 175, 30, 4, 4070, 11190, 1415, 2035, 4240, 3730],
  [100, 6, 1, 3, 1, 5, 332521, 16500, 175, 30, 4, 4105, 11295, 1425, 2055, 4280, 3765],
  [101, 6, 1, 3, 2, 5, 337888, 16500, 175, 30, 4, 4145, 11395, 1440, 2070, 4315, 3800],
  [102, 6, 1, 3, 3, 5, 343256, 16500, 175, 30, 4, 4180, 11495, 1450, 2090, 4355, 3830],
  [103, 6, 1, 3, 4, 5, 348624, 16500, 175, 30, 4, 4220, 11600, 1465, 2110, 4395, 3865],
  [104, 6, 2, 0, 0, 0, 355145, 18000, 190, 30, 4, 4425, 12170, 1535, 2215, 4610, 4055],
  [105, 6, 2, 1, 0, 5, 361667, 17000, 195, 35, 5, 4465, 12285, 1550, 2235, 4655, 4095],
  [106, 6, 2, 1, 1, 5, 368189, 17000, 195, 35, 5, 4510, 12400, 1565, 2255, 4695, 4135],
  [107, 6, 2, 1, 2, 5, 374710, 17000, 195, 35, 5, 4550, 12515, 1580, 2275, 4740, 4170],
  [108, 6, 2, 1, 3, 5, 381232, 17000, 195, 35, 5, 4590, 12630, 1595, 2295, 4785, 4210],
  [109, 6, 2, 1, 4, 5, 387754, 17000, 195, 35, 5, 4635, 12745, 1610, 2315, 4825, 4250],
  [110, 6, 2, 2, 0, 5, 394275, 18000, 220, 35, 5, 4675, 12855, 1625, 2340, 4870, 4285],
  [111, 6, 2, 2, 1, 5, 400797, 18000, 220, 35, 5, 4715, 12970, 1640, 2360, 4915, 4325],
  [112, 6, 2, 2, 2, 5, 407319, 18000, 220, 35, 5, 4760, 13085, 1650, 2380, 4955, 4360],
  [113, 6, 2, 2, 3, 5, 413840, 18000, 220, 35, 5, 4800, 13200, 1665, 2400, 5000, 4400],
  [114, 6, 2, 2, 4, 5, 420362, 18000, 220, 35, 5, 4840, 13315, 1680, 2420, 5045, 4440],
  [115, 6, 2, 3, 0, 5, 426884, 19000, 230, 40, 5, 4885, 13430, 1695, 2440, 5085, 4475],
  [116, 6, 2, 3, 1, 5, 433405, 19000, 230, 40, 5, 4925, 13545, 1710, 2460, 5130, 4515],
  [117, 6, 2, 3, 2, 5, 439927, 19000, 230, 40, 5, 4965, 13655, 1725, 2485, 5175, 4550],
  [118, 6, 2, 3, 3, 5, 446449, 19000, 230, 40, 5, 5010, 13770, 1740, 2505, 5215, 4590],
  [119, 6, 2, 3, 4, 5, 452971, 19000, 230, 40, 5, 5050, 13885, 1755, 2525, 5260, 4630],
  [120, 6, 3, 0, 0, 0, 460944, 20000, 245, 40, 5, 5285, 14540, 1835, 2645, 5505, 4845],
  [121, 6, 3, 1, 0, 5, 468917, 20000, 240, 40, 6, 5335, 14670, 1850, 2665, 5555, 4890],
  [122, 6, 3, 1, 1, 5, 476890, 20000, 240, 40, 6, 5380, 14800, 1870, 2690, 5605, 4935],
  [123, 6, 3, 1, 2, 5, 484864, 20000, 240, 40, 6, 5430, 14930, 1885, 2715, 5655, 4975],
  [124, 6, 3, 1, 3, 5, 492837, 20000, 240, 40, 6, 5475, 15060, 1900, 2740, 5705, 5020],
  [125, 6, 3, 1, 4, 5, 500810, 20000, 240, 40, 6, 5525, 15195, 1920, 2760, 5755, 5065],
  [126, 6, 3, 2, 0, 5, 508783, 21000, 250, 40, 6, 5570, 15325, 1935, 2785, 5805, 5110],
  [127, 6, 3, 2, 1, 5, 516757, 21000, 250, 40, 6, 5620, 15455, 1950, 2810, 5855, 5150],
  [128, 6, 3, 2, 2, 5, 524730, 21000, 250, 40, 6, 5665, 15585, 1970, 2835, 5905, 5195],
  [129, 6, 3, 2, 3, 5, 532703, 21000, 250, 40, 6, 5715, 15715, 1985, 2855, 5955, 5240],
  [130, 6, 3, 2, 4, 5, 540676, 21000, 250, 40, 6, 5760, 15845, 2000, 2880, 6000, 5280],
  [131, 6, 3, 3, 0, 5, 548650, 21000, 270, 45, 7, 5810, 15975, 2015, 2905, 6050, 5325],
  [132, 6, 3, 3, 1, 5, 556623, 21000, 270, 45, 7, 5855, 16110, 2035, 2930, 6100, 5370],
  [133, 6, 3, 3, 2, 5, 564596, 21000, 270, 45, 7, 5905, 16240, 2050, 2950, 6150, 5415],
  [134, 6, 3, 3, 3, 5, 572569, 21000, 270, 45, 7, 5950, 16370, 2065, 2975, 6200, 5455],
  [135, 6, 3, 3, 4, 5, 580543, 21000, 270, 45, 7, 6000, 16500, 2085, 3000, 6250, 5500],
  [136, 6, 4, 0, 0, 0, 591566, 24000, 290, 50, 8, 6050, 16645, 2100, 3025, 6305, 5550],
  [137, 6, 4, 1, 0, 10, 602692, 24000, 290, 50, 8, 6105, 16785, 2120, 3050, 6360, 5595],
  [138, 6, 4, 1, 1, 10, 613921, 24000, 290, 50, 8, 6155, 16930, 2140, 3080, 6415, 5645],
  [139, 6, 4, 1, 2, 10, 625253, 24000, 290, 50, 8, 6210, 17075, 2155, 3105, 6470, 5690],
  [140, 6, 4, 1, 3, 10, 636687, 24000, 290, 50, 8, 6260, 17220, 2175, 3130, 6520, 5740],
  [141, 6, 4, 1, 4, 10, 648225, 24000, 290, 50, 8, 6315, 17360, 2190, 3155, 6575, 5785],
  [142, 6, 4, 1, 5, 10, 659866, 24000, 290, 50, 10, 6365, 17505, 2210, 3185, 6630, 5835],
  [143, 6, 4, 1, 6, 10, 671610, 24000, 290, 50, 10, 6420, 17650, 2230, 3210, 6685, 5885],
  [144, 6, 4, 1, 7, 10, 683457, 24000, 290, 50, 10, 6470, 17795, 2245, 3235, 6740, 5930],
  [145, 6, 4, 1, 8, 10, 695407, 24000, 290, 50, 10, 6525, 17935, 2265, 3260, 6795, 5980],
  [146, 6, 4, 1, 9, 10, 707461, 24000, 290, 50, 10, 6575, 18080, 2285, 3285, 6850, 6025],
  [147, 6, 4, 2, 0, 10, 720149, 30000, 320, 60, 12, 6630, 18240, 2305, 3315, 6910, 6080],
  [148, 6, 4, 2, 1, 10, 732950, 30000, 320, 60, 12, 6690, 18395, 2325, 3345, 6970, 6130],
  [149, 6, 4, 2, 2, 10, 745863, 30000, 320, 60, 12, 6745, 18555, 2345, 3375, 7030, 6185],
  [150, 6, 4, 2, 3, 10, 758890, 30000, 320, 60, 12, 6805, 18710, 2360, 3400, 7085, 6235],
  [151, 6, 4, 2, 4, 10, 772029, 30000, 320, 60, 12, 6860, 18865, 2380, 3430, 7145, 6290],
  [152, 6, 4, 2, 5, 10, 785280, 30000, 320, 60, 14, 6920, 19025, 2400, 3460, 7205, 6340],
  [153, 6, 4, 2, 6, 10, 798645, 30000, 320, 60, 14, 6975, 19180, 2420, 3490, 7265, 6395],
  [154, 6, 4, 2, 7, 10, 812122, 30000, 320, 60, 14, 7030, 19340, 2440, 3515, 7325, 6445],
  [155, 6, 4, 2, 8, 10, 825712, 30000, 320, 60, 14, 7090, 19495, 2460, 3545, 7385, 6500],
  [156, 6, 4, 2, 9, 10, 839414, 30000, 320, 60, 14, 7145, 19655, 2480, 3575, 7445, 6550],
  [157, 6, 4, 3, 0, 10, 854197, 36000, 360, 70, 14, 7210, 19835, 2505, 3605, 7510, 6610],
  [158, 6, 4, 3, 1, 10, 869108, 36000, 360, 70, 16, 7275, 20015, 2525, 3640, 7580, 6670],
  [159, 6, 4, 3, 2, 10, 884148, 36000, 360, 70, 16, 7345, 20190, 2550, 3670, 7650, 6730],
  [160, 6, 4, 3, 3, 10, 899317, 36000, 360, 70, 16, 7410, 20370, 2570, 3705, 7715, 6790],
  [161, 6, 4, 3, 4, 10, 914615, 36000, 360, 70, 16, 7475, 20550, 2595, 3735, 7785, 6850],
  [162, 6, 4, 3, 5, 10, 930041, 36000, 360, 70, 18, 7540, 20730, 2620, 3770, 7855, 6910],
  [163, 6, 4, 3, 6, 10, 945596, 36000, 360, 70, 18, 7605, 20910, 2640, 3800, 7920, 6970],
  [164, 6, 4, 3, 7, 10, 961281, 36000, 360, 70, 18, 7670, 21090, 2665, 3835, 7990, 7030],
  [165, 6, 4, 3, 8, 10, 977093, 36000, 360, 70, 18, 7735, 21270, 2685, 3865, 8055, 7090],
  [166, 6, 4, 3, 9, 10, 993035, 36000, 360, 70, 18, 7800, 21450, 2710, 3900, 8125, 7150]
] as const;

type CompactTomeStepTuple = readonly [
  level: number,
  quality: number,
  tierNum: number,
  star: number,
  starSub: number,
  starSubMax: number,
  fightForce: number,
  m155: number,
  m156: number,
  m157: number,
  armorBreakBp: number,
  ultCdRedBp: number,
  enemyUltCdIncBp: number,
  heroAtkBp: number,
  heroHpBp: number,
];

const RAW_TOME_STEPS: readonly CompactTomeStepTuple[] = [
  [1, 6, 0, 0, 0, 0, 18816, 200, 50, 0, 130, 20, 10, 150, 250],
  [2, 6, 0, 1, 0, 5, 29633, 200, 50, 0, 250, 30, 15, 250, 500],
  [3, 6, 0, 1, 1, 5, 40449, 200, 50, 0, 380, 50, 25, 400, 750],
  [4, 6, 0, 1, 2, 5, 51266, 200, 50, 0, 500, 60, 30, 500, 1000],
  [5, 6, 0, 1, 3, 5, 62082, 300, 100, 0, 630, 80, 40, 650, 1250],
  [6, 6, 0, 1, 4, 5, 72899, 300, 100, 0, 750, 90, 45, 750, 1500],
  [7, 6, 0, 2, 0, 5, 84436, 450, 150, 0, 890, 110, 55, 900, 1800],
  [8, 6, 0, 2, 1, 5, 95974, 450, 150, 0, 1020, 130, 65, 1000, 2050],
  [9, 6, 0, 2, 2, 5, 107511, 450, 150, 0, 1160, 140, 70, 1150, 2300],
  [10, 6, 0, 2, 3, 5, 119049, 450, 150, 0, 1290, 160, 80, 1300, 2600],
  [11, 6, 0, 2, 4, 5, 130587, 450, 150, 0, 1420, 180, 90, 1400, 2850],
  [12, 6, 0, 3, 0, 5, 142845, 600, 200, 0, 1570, 200, 100, 1550, 3150],
  [13, 6, 0, 3, 1, 5, 155104, 600, 200, 0, 1710, 210, 105, 1700, 3400],
  [14, 6, 0, 3, 2, 5, 167363, 600, 200, 0, 1850, 230, 115, 1850, 3700],
  [15, 6, 0, 3, 3, 5, 179622, 600, 200, 0, 1990, 250, 125, 2000, 4000],
  [16, 6, 0, 3, 4, 5, 191880, 600, 200, 0, 2140, 270, 135, 2150, 4250],
  [17, 6, 1, 0, 0, 0, 204860, 0, 300, 10, 2290, 290, 145, 2300, 4550],
  [18, 6, 1, 1, 0, 5, 218561, 0, 400, 30, 2450, 310, 155, 2450, 4900],
  [19, 6, 1, 1, 1, 5, 232262, 0, 400, 30, 2610, 330, 165, 2600, 5200],
  [20, 6, 1, 1, 2, 5, 245963, 0, 400, 30, 2760, 350, 175, 2750, 5550],
  [21, 6, 1, 1, 3, 5, 259664, 0, 400, 50, 2920, 370, 185, 2900, 5850],
  [22, 6, 1, 1, 4, 5, 273365, 0, 400, 50, 3080, 390, 195, 3100, 6150],
  [23, 6, 1, 2, 0, 5, 287787, 0, 500, 70, 3250, 410, 205, 3250, 6500],
  [24, 6, 1, 2, 1, 5, 302209, 0, 500, 70, 3420, 430, 215, 3400, 6850],
  [25, 6, 1, 2, 2, 5, 316631, 0, 500, 70, 3590, 450, 225, 3600, 7150],
  [26, 6, 1, 2, 3, 5, 331053, 0, 500, 90, 3750, 470, 235, 3750, 7500],
  [27, 6, 1, 2, 4, 5, 345475, 0, 500, 90, 3920, 490, 245, 3900, 7850],
  [28, 6, 1, 3, 0, 5, 360618, 0, 600, 110, 4100, 510, 255, 4100, 8200],
  [29, 6, 1, 3, 1, 5, 375761, 0, 600, 110, 4270, 530, 265, 4250, 8550],
  [30, 6, 1, 3, 2, 5, 390904, 0, 600, 110, 4450, 560, 280, 4450, 8900],
  [31, 6, 1, 3, 3, 5, 406047, 0, 600, 130, 4620, 580, 290, 4600, 9250],
  [32, 6, 1, 3, 4, 5, 421190, 0, 600, 130, 4800, 600, 300, 4800, 9600],
  [33, 6, 2, 0, 0, 0, 437055, 0, 700, 150, 4980, 620, 310, 5000, 9950],
  [34, 6, 2, 1, 0, 5, 453640, 0, 800, 180, 5180, 650, 325, 5200, 10350],
  [35, 6, 2, 1, 1, 5, 470225, 0, 800, 180, 5370, 670, 335, 5350, 10750],
  [36, 6, 2, 1, 2, 5, 486811, 0, 800, 180, 5560, 700, 350, 5550, 11100],
  [37, 6, 2, 1, 3, 5, 503396, 0, 800, 180, 5750, 720, 360, 5750, 11500],
  [38, 6, 2, 1, 4, 5, 519981, 0, 800, 180, 5950, 740, 370, 5950, 11900],
  [39, 6, 2, 2, 0, 5, 537288, 0, 1000, 220, 6150, 770, 385, 6150, 12300],
  [40, 6, 2, 2, 1, 5, 554594, 0, 1000, 220, 6350, 790, 395, 6350, 12700],
  [41, 6, 2, 2, 2, 5, 571901, 0, 1000, 220, 6550, 820, 410, 6550, 13100],
  [42, 6, 2, 2, 3, 5, 589207, 0, 1000, 220, 6750, 840, 420, 6750, 13500],
  [43, 6, 2, 2, 4, 5, 606513, 0, 1000, 220, 6950, 870, 435, 6950, 13900],
  [44, 6, 2, 3, 0, 5, 624541, 0, 1200, 240, 7160, 900, 450, 7150, 14300],
  [45, 6, 2, 3, 1, 5, 642569, 0, 1200, 240, 7370, 920, 460, 7350, 14750],
  [46, 6, 2, 3, 2, 5, 660596, 0, 1200, 240, 7580, 950, 475, 7600, 15150],
  [47, 6, 2, 3, 3, 5, 678624, 0, 1200, 240, 7790, 970, 485, 7800, 15600],
  [48, 6, 2, 3, 4, 5, 696651, 0, 1200, 240, 8000, 1000, 500, 8000, 16000],
  [49, 6, 3, 0, 0, 0, 715779, 0, 1200, 240, 8100, 1010, 510, 8360, 16900],
  [50, 6, 3, 1, 0, 5, 734907, 0, 1200, 240, 8190, 1020, 510, 8720, 17800],
  [51, 6, 3, 1, 1, 5, 754036, 0, 1200, 240, 8290, 1040, 520, 9080, 18700],
  [52, 6, 3, 1, 2, 5, 773164, 0, 1200, 240, 8380, 1050, 520, 9440, 19590],
  [53, 6, 3, 1, 3, 5, 792293, 0, 1200, 240, 8480, 1060, 530, 9800, 20490],
  [54, 6, 3, 1, 4, 5, 812157, 0, 1200, 240, 8580, 1070, 540, 10170, 21430],
  [55, 6, 3, 2, 0, 5, 832021, 0, 1200, 240, 8680, 1080, 540, 10540, 22360],
  [56, 6, 3, 2, 1, 5, 851886, 0, 1200, 240, 8780, 1100, 550, 10920, 23290],
  [57, 6, 3, 2, 2, 5, 871750, 0, 1200, 240, 8880, 1110, 550, 11290, 24230],
  [58, 6, 3, 2, 3, 5, 891614, 0, 1200, 240, 8980, 1120, 560, 11660, 25160],
  [59, 6, 3, 2, 4, 5, 912214, 0, 1200, 240, 9080, 1140, 570, 12050, 26130],
  [60, 6, 3, 3, 0, 5, 932814, 0, 1200, 240, 9180, 1150, 570, 12440, 27090],
  [61, 6, 3, 3, 1, 5, 953414, 0, 1200, 240, 9290, 1160, 580, 12820, 28060],
  [62, 6, 3, 3, 2, 5, 974014, 0, 1200, 240, 9390, 1170, 590, 13210, 29030],
  [63, 6, 3, 3, 3, 5, 994614, 0, 1200, 240, 9490, 1190, 590, 13600, 30000],
  [64, 6, 3, 3, 4, 5, 1015949, 0, 1200, 240, 9600, 1200, 600, 14000, 31000]
] as const;

type CompactMasteryTuple = readonly [
  requiredLevel: number,
  quality: number,
  ff3: number,
  p3HeroHpBp: number,
  p3SoldierAtkBp: number,
  ff6: number,
  p6HeroAtkBp: number,
  p6SoldierAtkBp: number,
  p6SoldierHpBp: number,
];

const RAW_MASTERY_TIERS: readonly CompactMasteryTuple[] = [
  [3, 3, 2696, 400, 120, 13364, 200, 80, 400],
  [4, 3, 7076, 800, 240, 31934, 400, 160, 800],
  [6, 3, 13544, 1200, 360, 55910, 600, 240, 1200],
  [8, 3, 22500, 1600, 480, 85492, 800, 320, 1600],
  [10, 4, 54952, 3200, 960, 193412, 1600, 640, 3200],
  [11, 4, 101052, 5040, 1440, 337592, 2400, 960, 5040],
  [14, 4, 163366, 7040, 1920, 517800, 3200, 1280, 7040],
  [17, 4, 239438, 8800, 2400, 711464, 4000, 1600, 8800],
  [20, 5, 341534, 11040, 2880, 965928, 4800, 1920, 11040],
  [33, 5, 493270, 13920, 3600, 1351232, 5800, 2400, 14400],
  [46, 5, 664998, 16320, 4320, 1746404, 6800, 2880, 17280],
  [59, 5, 890368, 19500, 5040, 2257644, 7800, 3360, 21000],
  [72, 6, 1214276, 23920, 6000, 2964420, 9200, 4000, 26000],
  [88, 6, 1627684, 29160, 6960, 3783752, 10800, 4640, 31320],
  [104, 6, 2198636, 35960, 8160, 4978378, 12400, 5440, 39440],
  [120, 6, 2846208, 42000, 9600, 6345022, 14000, 6400, 48000],
  [136, 6, 3571402, 48000, 11400, 7599404, 16000, 7600, 57000]
] as const;

function buildQualityTierName(
  quality: LordGearQualityCode,
  tierNum: number,
): { readonly vi: string; readonly en: string; readonly codePrefix: string } {
  if (quality === 0) {
    return { vi: "Chưa mở khóa", en: "Locked / Unequipped", codePrefix: "L0" };
  }
  if (quality === 2) {
    return { vi: "Thường (Lục)", en: "Uncommon (Green)", codePrefix: "G" };
  }
  if (quality === 3) {
    return { vi: "Hiếm (Lam)", en: "Rare (Blue)", codePrefix: "B" };
  }
  if (quality === 4) {
    return { vi: "Sử Thi (Tím)", en: "Epic (Purple)", codePrefix: "P" };
  }
  if (quality === 5) {
    const t = tierNum > 0 ? tierNum : 1;
    return {
      vi: `Huyền Thoại T${t} (Vàng)`,
      en: `Legendary T${t} (Yellow)`,
      codePrefix: `Y${t}`,
    };
  }
  if (tierNum === 0) {
    return { vi: "Thần Thoại (Đỏ T0)", en: "Mythic (Red T0)", codePrefix: "R0" };
  }
  return {
    vi: `Thần Thoại T${tierNum} (Đỏ)`,
    en: `Mythic T${tierNum} (Red)`,
    codePrefix: `R${tierNum}`,
  };
}

export const LORD_GEAR_LEVEL_STEPS: readonly LordGearLevelStep[] = [
  {
    level: 0,
    quality: 0,
    tierNumber: 0,
    star: 0,
    starSub: 0,
    starSubMax: 0,
    fightForce: 0,
    stepCost: { refinedMetal: 0, magicThread: 0, orichalcum: 0, dragonBlood: 0 },
    defenseStats: { factionHeroPct: 0, factionSoldierPct: 0, allSoldierPct: 0 },
    offenseStats: { factionHeroPct: 0, factionSoldierPct: 0, allSoldierPct: 0 },
    label: { vi: "Lv.0 • Chưa chế tạo", en: "Lv.0 • Unequipped" },
    tierGroupLabel: { vi: "Chưa mở khóa", en: "Locked / Unequipped" },
    shortCode: "Lv.0",
    isExtended: false,
  },
  ...RAW_MAIN_STEPS.map((tuple): LordGearLevelStep => {
    const [
      level,
      rawQuality,
      tierNumber,
      star,
      starSub,
      starSubMax,
      fightForce,
      refinedMetal,
      magicThread,
      orichalcum,
      dragonBlood,
      defHeroHpBp,
      defSoldierHpBp,
      defAllSoldierAtkBp,
      offHeroAtkBp,
      offSoldierAtkBp,
      offAllSoldierHpBp,
    ] = tuple;
    const quality = rawQuality as LordGearQualityCode;
    const tierInfo = buildQualityTierName(quality, tierNumber);
    const subTextVi =
      starSubMax > 1 ? ` (Bậc ${starSub + 1}/${starSubMax})` : "";
    const subTextEn =
      starSubMax > 1 ? ` (Step ${starSub + 1}/${starSubMax})` : "";
    return {
      level,
      quality,
      tierNumber,
      star,
      starSub,
      starSubMax,
      fightForce,
      stepCost: { refinedMetal, magicThread, orichalcum, dragonBlood },
      defenseStats: {
        factionHeroPct: defHeroHpBp / 100,
        factionSoldierPct: defSoldierHpBp / 100,
        allSoldierPct: defAllSoldierAtkBp / 100,
      },
      offenseStats: {
        factionHeroPct: offHeroAtkBp / 100,
        factionSoldierPct: offSoldierAtkBp / 100,
        allSoldierPct: offAllSoldierHpBp / 100,
      },
      label: {
        vi: `Lv.${level} • ${tierInfo.vi} ${star}★${subTextVi}`,
        en: `Lv.${level} • ${tierInfo.en} ${star}★${subTextEn}`,
      },
      tierGroupLabel: {
        vi: tierInfo.vi,
        en: tierInfo.en,
      },
      shortCode: `${tierInfo.codePrefix}-${star}★${starSubMax > 1 ? `.${starSub + 1}` : ""}`,
      isExtended: level > LORD_GEAR_STANDARD_MAX_LEVEL,
    };
  }),
];

export const LORD_GEAR_SACRED_TOME_STEPS: readonly LordGearSacredTomeStep[] = [
  {
    level: 0,
    quality: 0,
    tierNumber: 0,
    star: 0,
    starSub: 0,
    starSubMax: 0,
    fightForce: 0,
    stepCost: { refinedMetal: 0, magicThread: 0, orichalcum: 0, dragonBlood: 0 },
    armorBreakPct: 0,
    ultCdReductionPct: 0,
    enemyUltCdIncreasePct: 0,
    heroAtkPct: 0,
    heroHpPct: 0,
    label: { vi: "Lv.0 • Chưa mở Thiên Thư", en: "Lv.0 • Sacred Tome Locked" },
  },
  ...RAW_TOME_STEPS.map((tuple): LordGearSacredTomeStep => {
    const [
      level,
      rawQuality,
      tierNumber,
      star,
      starSub,
      starSubMax,
      fightForce,
      magicThread,
      orichalcum,
      dragonBlood,
      armorBreakBp,
      ultCdRedBp,
      enemyUltCdIncBp,
      heroAtkBp,
      heroHpBp,
    ] = tuple;
    const quality = rawQuality as LordGearQualityCode;
    const tierInfo = buildQualityTierName(quality, tierNumber);
    const subTextVi =
      starSubMax > 1 ? ` (Bậc ${starSub + 1}/${starSubMax})` : "";
    const subTextEn =
      starSubMax > 1 ? ` (Step ${starSub + 1}/${starSubMax})` : "";
    return {
      level,
      quality,
      tierNumber,
      star,
      starSub,
      starSubMax,
      fightForce,
      stepCost: { refinedMetal: 0, magicThread, orichalcum, dragonBlood },
      armorBreakPct: armorBreakBp / 100,
      ultCdReductionPct: ultCdRedBp / 100,
      enemyUltCdIncreasePct: enemyUltCdIncBp / 100,
      heroAtkPct: heroAtkBp / 100,
      heroHpPct: heroHpBp / 100,
      label: {
        vi: `Lv.${level} • ${tierInfo.vi} ${star}★${subTextVi}`,
        en: `Lv.${level} • ${tierInfo.en} ${star}★${subTextEn}`,
      },
    };
  }),
];

function buildMasteryRequirementLabel(requiredLevel: number): {
  readonly vi: string;
  readonly en: string;
} {
  const step = LORD_GEAR_LEVEL_STEPS[requiredLevel];
  if (!step) {
    return { vi: `Lv.${requiredLevel}`, en: `Lv.${requiredLevel}` };
  }
  const starSuffixVi = step.star > 0 ? ` (${step.star}-sao)` : "";
  const starSuffixEn = step.star > 0 ? ` (${step.star}-Star)` : "";
  if (step.quality === 3) {
    return { vi: `Hiếm${starSuffixVi}`, en: `Rare${starSuffixEn}` };
  }
  if (step.quality === 4) {
    return { vi: `Sử Thi${starSuffixVi}`, en: `Epic${starSuffixEn}` };
  }
  if (step.quality === 5) {
    return {
      vi: `Huyền Thoại T${step.tierNumber}${starSuffixVi}`,
      en: `Legendary T${step.tierNumber}${starSuffixEn}`,
    };
  }
  const tLabel = step.tierNumber > 0 ? ` T${step.tierNumber}` : "";
  return {
    vi: `Thần Thoại${tLabel}${starSuffixVi}`,
    en: `Mythic${tLabel}${starSuffixEn}`,
  };
}

export const LORD_GEAR_MASTERY_TIERS: readonly LordGearMasteryTier[] =
  RAW_MASTERY_TIERS.map((tuple, idx): LordGearMasteryTier => {
    const [
      requiredLevel,
      rawQuality,
      threePieceFightForce,
      p3HeroHpBp,
      p3SoldierAtkBp,
      sixPieceFightForce,
      p6HeroAtkBp,
      p6SoldierAtkBp,
      p6SoldierHpBp,
    ] = tuple;
    return {
      tierIndex: idx + 1,
      requiredLevel,
      quality: rawQuality as LordGearQualityCode,
      label: buildMasteryRequirementLabel(requiredLevel),
      threePieceFightForce,
      threePieceHeroHpPct: p3HeroHpBp / 100,
      threePieceAllSoldierAtkPct: p3SoldierAtkBp / 100,
      sixPieceFightForce,
      sixPieceHeroAtkPct: p6HeroAtkBp / 100,
      sixPieceAllSoldierAtkPct: p6SoldierAtkBp / 100,
      sixPieceAllSoldierHpPct: p6SoldierHpBp / 100,
    };
  });

export interface LordGearMilestonePreset {
  readonly level: number;
  readonly isExtended: boolean;
  readonly label: {
    readonly vi: string;
    readonly en: string;
  };
}

export const LORD_GEAR_PRESET_MILESTONES: readonly LordGearMilestonePreset[] = [
  { level: 0, isExtended: false, label: { vi: "Lv.0 • Chưa mở", en: "Lv.0 • Locked" } },
  { level: 1, isExtended: false, label: { vi: "Lv.1 • Thường 0★ (G1)", en: "Lv.1 • Uncommon 0★ (G1)" } },
  { level: 3, isExtended: false, label: { vi: "Lv.3 • Hiếm 0★ (B0)", en: "Lv.3 • Rare 0★ (B0)" } },
  { level: 4, isExtended: false, label: { vi: "Lv.4 • Hiếm 1★ (B1)", en: "Lv.4 • Rare 1★ (B1)" } },
  { level: 6, isExtended: false, label: { vi: "Lv.6 • Hiếm 2★ (Cần Orichalcum)", en: "Lv.6 • Rare 2★ (Needs Orichalcum)" } },
  { level: 8, isExtended: false, label: { vi: "Lv.8 • Hiếm 3★ (B3)", en: "Lv.8 • Rare 3★ (B3)" } },
  { level: 10, isExtended: false, label: { vi: "Lv.10 • Sử Thi 0★ (P0)", en: "Lv.10 • Epic 0★ (P0)" } },
  { level: 11, isExtended: false, label: { vi: "Lv.11 • Sử Thi 1★ (P1)", en: "Lv.11 • Epic 1★ (P1)" } },
  { level: 14, isExtended: false, label: { vi: "Lv.14 • Sử Thi 2★ (P2)", en: "Lv.14 • Epic 2★ (P2)" } },
  { level: 17, isExtended: false, label: { vi: "Lv.17 • Sử Thi 3★ (P3)", en: "Lv.17 • Epic 3★ (P3)" } },
  { level: 20, isExtended: false, label: { vi: "Lv.20 • Huyền Thoại T1 0★ (Y1)", en: "Lv.20 • Legendary T1 0★ (Y1)" } },
  { level: 33, isExtended: false, label: { vi: "Lv.33 • Huyền Thoại T2 0★ (Y2 - Mở Thánh Điển)", en: "Lv.33 • Legendary T2 0★ (Y2 - Tome Unlock)" } },
  { level: 46, isExtended: false, label: { vi: "Lv.46 • Huyền Thoại T3 0★ (Y3)", en: "Lv.46 • Legendary T3 0★ (Y3)" } },
  { level: 59, isExtended: false, label: { vi: "Lv.59 • Huyền Thoại T4 0★ (Y4)", en: "Lv.59 • Legendary T4 0★ (Y4)" } },
  { level: 72, isExtended: false, label: { vi: "Lv.72 • Thần Thoại 0★ (Đỏ T0)", en: "Lv.72 • Mythic 0★ (Red T0)" } },
  { level: 88, isExtended: false, label: { vi: "Lv.88 • Thần Thoại T1 0★ (Đỏ T1)", en: "Lv.88 • Mythic T1 0★ (Red T1)" } },
  { level: 103, isExtended: false, label: { vi: "Lv.103 • Thần Thoại T1 3★ Max (Chuẩn Meta)", en: "Lv.103 • Mythic T1 3★ Max (Standard Cap)" } },
  { level: 104, isExtended: true, label: { vi: "Lv.104 • Thần Thoại T2 0★ (Đỏ T2)", en: "Lv.104 • Mythic T2 0★ (Red T2)" } },
  { level: 120, isExtended: true, label: { vi: "Lv.120 • Thần Thoại T3 0★ (Đỏ T3)", en: "Lv.120 • Mythic T3 0★ (Red T3)" } },
  { level: 136, isExtended: true, label: { vi: "Lv.136 • Thần Thoại T4 0★ (Đỏ T4)", en: "Lv.136 • Mythic T4 0★ (Red T4)" } },
  { level: 166, isExtended: true, label: { vi: "Lv.166 • Thần Thoại T4 3★ Max (Tối Đa)", en: "Lv.166 • Mythic T4 3★ Max (Hard Cap)" } },
] as const;

export function getLordGearSlotMeta(slotId: LordGearSlotId): LordGearSlotMeta {
  const found = LORD_GEAR_SLOTS.find((s) => s.id === slotId);
  if (!found) {
    return LORD_GEAR_SLOTS[0];
  }
  return found;
}

export function clampLordGearLevel(
  level: number,
  allowExtended = true,
): number {
  const maxLv = allowExtended
    ? LORD_GEAR_EXTENDED_MAX_LEVEL
    : LORD_GEAR_STANDARD_MAX_LEVEL;
  if (!Number.isFinite(level)) return 0;
  return Math.max(0, Math.min(maxLv, Math.floor(level)));
}

export function calculateLordGearSlotUpgrade(
  slotId: LordGearSlotId,
  rawFromLevel: number,
  rawToLevel: number,
): LordGearSlotUpgradeResult {
  const slot = getLordGearSlotMeta(slotId);
  const fromLevel = clampLordGearLevel(rawFromLevel, true);
  const toLevel = Math.max(fromLevel, clampLordGearLevel(rawToLevel, true));

  const fromStep = LORD_GEAR_LEVEL_STEPS[fromLevel] ?? LORD_GEAR_LEVEL_STEPS[0];
  const toStep = LORD_GEAR_LEVEL_STEPS[toLevel] ?? LORD_GEAR_LEVEL_STEPS[0];

  let refinedMetal = 0;
  let magicThread = 0;
  let orichalcum = 0;
  let dragonBlood = 0;

  for (let lv = fromLevel + 1; lv <= toLevel; lv += 1) {
    const step = LORD_GEAR_LEVEL_STEPS[lv];
    if (step) {
      refinedMetal += step.stepCost.refinedMetal;
      magicThread += step.stepCost.magicThread;
      orichalcum += step.stepCost.orichalcum;
      dragonBlood += step.stepCost.dragonBlood;
    }
  }

  const fromStats =
    slot.branch === "left_defense"
      ? fromStep.defenseStats
      : fromStep.offenseStats;
  const toStats =
    slot.branch === "left_defense" ? toStep.defenseStats : toStep.offenseStats;

  return {
    slot,
    fromLevel,
    toLevel,
    fromStep,
    toStep,
    stepsCount: toLevel - fromLevel,
    fightForceDelta: Math.max(0, toStep.fightForce - fromStep.fightForce),
    cost: {
      refinedMetal,
      magicThread,
      orichalcum,
      dragonBlood,
    },
    fromStats,
    toStats,
    statDeltas: {
      factionHeroPct: Math.max(0, toStats.factionHeroPct - fromStats.factionHeroPct),
      factionSoldierPct: Math.max(
        0,
        toStats.factionSoldierPct - fromStats.factionSoldierPct,
      ),
      allSoldierPct: Math.max(0, toStats.allSoldierPct - fromStats.allSoldierPct),
    },
  };
}

export function calculateLordGearSacredTomeUpgrade(
  rawFromLevel: number,
  rawToLevel: number,
): {
  readonly fromLevel: number;
  readonly toLevel: number;
  readonly fromStep: LordGearSacredTomeStep;
  readonly toStep: LordGearSacredTomeStep;
  readonly fightForceDelta: number;
  readonly cost: LordGearMaterialBag;
} {
  const maxTomeLv = LORD_GEAR_SACRED_TOME_STEPS.length - 1;
  const fromLevel = Math.max(0, Math.min(maxTomeLv, Math.floor(rawFromLevel || 0)));
  const toLevel = Math.max(
    fromLevel,
    Math.min(maxTomeLv, Math.floor(rawToLevel || 0)),
  );
  const fromStep =
    LORD_GEAR_SACRED_TOME_STEPS[fromLevel] ?? LORD_GEAR_SACRED_TOME_STEPS[0];
  const toStep =
    LORD_GEAR_SACRED_TOME_STEPS[toLevel] ?? LORD_GEAR_SACRED_TOME_STEPS[0];

  let magicThread = 0;
  let orichalcum = 0;
  let dragonBlood = 0;

  for (let lv = fromLevel + 1; lv <= toLevel; lv += 1) {
    const step = LORD_GEAR_SACRED_TOME_STEPS[lv];
    if (step) {
      magicThread += step.stepCost.magicThread;
      orichalcum += step.stepCost.orichalcum;
      dragonBlood += step.stepCost.dragonBlood;
    }
  }

  return {
    fromLevel,
    toLevel,
    fromStep,
    toStep,
    fightForceDelta: Math.max(0, toStep.fightForce - fromStep.fightForce),
    cost: {
      refinedMetal: 0,
      magicThread,
      orichalcum,
      dragonBlood,
    },
  };
}

export function evaluateLordGearMasteryResonance(
  slotLevels: readonly number[],
): LordGearMasteryEvaluation {
  const padded = [0, 0, 0, 0, 0, 0].map((_, idx) =>
    clampLordGearLevel(slotLevels[idx] ?? 0, true),
  );
  const sortedLevelsDesc = [...padded].sort((a, b) => b - a);
  const top3MinLevel = sortedLevelsDesc[2] ?? 0;
  const all6MinLevel = sortedLevelsDesc[5] ?? 0;

  let active3Piece: LordGearMasteryTier | null = null;
  let next3Piece: LordGearMasteryTier | null = null;
  let active6Piece: LordGearMasteryTier | null = null;
  let next6Piece: LordGearMasteryTier | null = null;

  for (const tier of LORD_GEAR_MASTERY_TIERS) {
    if (top3MinLevel >= tier.requiredLevel) {
      active3Piece = tier;
    } else if (!next3Piece) {
      next3Piece = tier;
    }

    if (all6MinLevel >= tier.requiredLevel) {
      active6Piece = tier;
    } else if (!next6Piece) {
      next6Piece = tier;
    }
  }

  const totalMasteryFightForce =
    (active3Piece?.threePieceFightForce ?? 0) +
    (active6Piece?.sixPieceFightForce ?? 0);

  return {
    sortedLevelsDesc,
    top3MinLevel,
    all6MinLevel,
    active3Piece,
    next3Piece,
    active6Piece,
    next6Piece,
    totalMasteryFightForce,
  };
}

export function calculateLordGearSixSlotsPlan(
  slotRanges: Readonly<
    Record<LordGearSlotId, { readonly fromLevel: number; readonly toLevel: number }>
  >,
  inventory: LordGearMaterialBag,
  sacredTomeRange?: { readonly fromLevel: number; readonly toLevel: number },
): LordGearSixSlotsPlanResult {
  const slotResults = LORD_GEAR_SLOTS.map((slot) => {
    const range = slotRanges[slot.id] ?? { fromLevel: 0, toLevel: 0 };
    return calculateLordGearSlotUpgrade(slot.id, range.fromLevel, range.toLevel);
  });

  const sacredTomeResult = sacredTomeRange
    ? calculateLordGearSacredTomeUpgrade(
        sacredTomeRange.fromLevel,
        sacredTomeRange.toLevel,
      )
    : null;

  const beforeLevels = slotResults.map((r) => r.fromLevel);
  const afterLevels = slotResults.map((r) => r.toLevel);

  const beforeMastery = evaluateLordGearMasteryResonance(beforeLevels);
  const afterMastery = evaluateLordGearMasteryResonance(afterLevels);

  const totalCost: LordGearMaterialBag = {
    refinedMetal:
      slotResults.reduce((acc, r) => acc + r.cost.refinedMetal, 0) +
      (sacredTomeResult?.cost.refinedMetal ?? 0),
    magicThread:
      slotResults.reduce((acc, r) => acc + r.cost.magicThread, 0) +
      (sacredTomeResult?.cost.magicThread ?? 0),
    orichalcum:
      slotResults.reduce((acc, r) => acc + r.cost.orichalcum, 0) +
      (sacredTomeResult?.cost.orichalcum ?? 0),
    dragonBlood:
      slotResults.reduce((acc, r) => acc + r.cost.dragonBlood, 0) +
      (sacredTomeResult?.cost.dragonBlood ?? 0),
  };

  const remainingInventory: LordGearMaterialBag = {
    refinedMetal: Math.max(0, inventory.refinedMetal - totalCost.refinedMetal),
    magicThread: Math.max(0, inventory.magicThread - totalCost.magicThread),
    orichalcum: Math.max(0, inventory.orichalcum - totalCost.orichalcum),
    dragonBlood: Math.max(0, inventory.dragonBlood - totalCost.dragonBlood),
  };

  const deficit: LordGearMaterialBag = {
    refinedMetal: Math.max(0, totalCost.refinedMetal - inventory.refinedMetal),
    magicThread: Math.max(0, totalCost.magicThread - inventory.magicThread),
    orichalcum: Math.max(0, totalCost.orichalcum - inventory.orichalcum),
    dragonBlood: Math.max(0, totalCost.dragonBlood - inventory.dragonBlood),
  };

  const isSufficient =
    deficit.refinedMetal === 0 &&
    deficit.magicThread === 0 &&
    deficit.orichalcum === 0 &&
    deficit.dragonBlood === 0;

  const totalFightForceBefore =
    slotResults.reduce((acc, r) => acc + r.fromStep.fightForce, 0) +
    (sacredTomeResult?.fromStep.fightForce ?? 0) +
    beforeMastery.totalMasteryFightForce;

  const totalFightForceAfter =
    slotResults.reduce((acc, r) => acc + r.toStep.fightForce, 0) +
    (sacredTomeResult?.toStep.fightForce ?? 0) +
    afterMastery.totalMasteryFightForce;

  return {
    slotResults,
    sacredTomeResult,
    totalCost,
    inventory,
    remainingInventory,
    deficit,
    isSufficient,
    totalFightForceBefore,
    totalFightForceAfter,
    totalFightForceDelta: Math.max(
      0,
      totalFightForceAfter - totalFightForceBefore,
    ),
    beforeMastery,
    afterMastery,
  };
}

/**
 * Builds the 4-Step Staggered Resonance Cycle (Chu trình Lệch Pha 4 Bước 3-3):
 * - Spearhead Group A (3 pieces): Main Faction Offense + Main Faction Defense + Top secondary Right-Branch Offense piece.
 * - Follow-up Group B (3 pieces): Remaining 3 pieces.
 */
export function buildLordGearStaggeredCyclePlan(
  currentLevels: Readonly<Record<LordGearSlotId, number>>,
  mainFaction: LordGearFaction,
): LordGearStaggeredCyclePlan {
  const mainOffense =
    LORD_GEAR_SLOTS.find(
      (s) => s.faction === mainFaction && s.branch === "right_offense",
    ) ?? LORD_GEAR_SLOTS[3];
  const mainDefense =
    LORD_GEAR_SLOTS.find(
      (s) => s.faction === mainFaction && s.branch === "left_defense",
    ) ?? LORD_GEAR_SLOTS[0];

  const otherOffenseSlots = LORD_GEAR_SLOTS.filter(
    (s) => s.faction !== mainFaction && s.branch === "right_offense",
  ).sort(
    (a, b) => (currentLevels[b.id] ?? 0) - (currentLevels[a.id] ?? 0),
  );

  const thirdSpearhead = otherOffenseSlots[0] ?? LORD_GEAR_SLOTS[4];
  const spearheadSlotIds: readonly LordGearSlotId[] = [
    mainOffense.id,
    mainDefense.id,
    thirdSpearhead.id,
  ];

  const followUpSlotIds: readonly LordGearSlotId[] = LORD_GEAR_SLOTS.filter(
    (s) => !spearheadSlotIds.includes(s.id),
  ).map((s) => s.id);

  const levelArray = LORD_GEAR_SLOTS.map((s) => currentLevels[s.id] ?? 0);
  const currentMastery = evaluateLordGearMasteryResonance(levelArray);

  const sacredTomeReadyCount = levelArray.filter(
    (lv) => lv >= LORD_GEAR_SACRED_TOME_UNLOCK_LEVEL,
  ).length;
  const isSacredTomeUnlocked = sacredTomeReadyCount >= 6;

  // Determine the next two Mastery milestones from current state
  const baseMin6 = currentMastery.all6MinLevel;
  const fallbackTier =
    LORD_GEAR_MASTERY_TIERS[LORD_GEAR_MASTERY_TIERS.length - 1] ??
    LORD_GEAR_MASTERY_TIERS[0];
  const tier1 =
    LORD_GEAR_MASTERY_TIERS.find((t) => t.requiredLevel > baseMin6) ??
    fallbackTier;
  const tier2 =
    LORD_GEAR_MASTERY_TIERS.find(
      (t) => t.requiredLevel > tier1.requiredLevel,
    ) ?? tier1;

  const sumCostForGroup = (
    slotIds: readonly LordGearSlotId[],
    fromMap: Record<LordGearSlotId, number>,
    targetLv: number,
  ): LordGearMaterialBag => {
    let refinedMetal = 0;
    let magicThread = 0;
    let orichalcum = 0;
    let dragonBlood = 0;
    for (const id of slotIds) {
      const startLv = fromMap[id] ?? 0;
      const goalLv = Math.max(startLv, targetLv);
      const res = calculateLordGearSlotUpgrade(id, startLv, goalLv);
      refinedMetal += res.cost.refinedMetal;
      magicThread += res.cost.magicThread;
      orichalcum += res.cost.orichalcum;
      dragonBlood += res.cost.dragonBlood;
      fromMap[id] = goalLv;
    }
    return { refinedMetal, magicThread, orichalcum, dragonBlood };
  };

  const simLevels: Record<LordGearSlotId, number> = {
    nature_shield: currentLevels.nature_shield ?? 0,
    league_crown: currentLevels.league_crown ?? 0,
    horde_spear: currentLevels.horde_spear ?? 0,
    nature_totem: currentLevels.nature_totem ?? 0,
    league_ring: currentLevels.league_ring ?? 0,
    horde_collar: currentLevels.horde_collar ?? 0,
  };

  const step1Cost = sumCostForGroup(
    spearheadSlotIds,
    simLevels,
    tier1.requiredLevel,
  );
  const step2Cost = sumCostForGroup(
    followUpSlotIds,
    simLevels,
    tier1.requiredLevel,
  );
  const step3Cost = sumCostForGroup(
    spearheadSlotIds,
    simLevels,
    tier2.requiredLevel,
  );
  const step4Cost = sumCostForGroup(
    followUpSlotIds,
    simLevels,
    tier2.requiredLevel,
  );

  const steps: readonly LordGearStaggeredCycleStep[] = [
    {
      stepNumber: 1,
      title: {
        vi: "Bước 1: Đẩy 3 Món Mũi Nhọn (Nhóm A) Mở Cộng Hưởng 3 Món",
        en: "Step 1: Push 3 Spearhead Pieces (Group A) to Unlock 3-Pc Mastery",
      },
      description: {
        vi: "Tập trung nâng 2 món Phe Chủ Đạo + 1 món Nhánh Phải (ATK) cao nhất chạm mốc Bậc Thầy tiếp theo trước.",
        en: "Focus on upgrading 2 Main Faction pieces + 1 highest Right-Branch (ATK) piece to the next Mastery threshold first.",
      },
      targetSlotIds: spearheadSlotIds,
      targetLevel: tier1.requiredLevel,
      targetLabel: tier1.label,
      cost: step1Cost,
      unlocksMasteryLabel: {
        vi: `Kích hoạt Bậc Thầy 3 món: ${tier1.label.vi} (+${tier1.threePieceHeroHpPct.toFixed(2)}% HP Tướng, +${tier1.threePieceAllSoldierAtkPct.toFixed(2)}% ATK Lính)`,
        en: `Unlocks 3-Pc Mastery: ${tier1.label.en} (+${tier1.threePieceHeroHpPct.toFixed(2)}% Hero HP, +${tier1.threePieceAllSoldierAtkPct.toFixed(2)}% Soldier ATK)`,
      },
    },
    {
      stepNumber: 2,
      title: {
        vi: "Bước 2: Kéo 3 Món Đi Sau (Nhóm B) Đồng Bộ Cộng Hưởng 6 Món",
        en: "Step 2: Catch Up 3 Follow-Up Pieces (Group B) for 6-Pc Mastery",
      },
      description: {
        vi: "Nâng nốt 3 món còn lại lên cùng mặt bằng với Nhóm A để ăn trọn chỉ số Cộng Hưởng 6 Món.",
        en: "Bring the remaining 3 pieces up to parity with Group A to claim the full 6-Piece Mastery bonus.",
      },
      targetSlotIds: followUpSlotIds,
      targetLevel: tier1.requiredLevel,
      targetLabel: tier1.label,
      cost: step2Cost,
      unlocksMasteryLabel: {
        vi: `Kích hoạt Bậc Thầy 6 món: ${tier1.label.vi} (+${tier1.sixPieceHeroAtkPct.toFixed(2)}% ATK Tướng, +${tier1.sixPieceAllSoldierHpPct.toFixed(2)}% HP Lính)`,
        en: `Unlocks 6-Pc Mastery: ${tier1.label.en} (+${tier1.sixPieceHeroAtkPct.toFixed(2)}% Hero ATK, +${tier1.sixPieceAllSoldierHpPct.toFixed(2)}% Soldier HP)`,
      },
    },
    {
      stepNumber: 3,
      title: {
        vi: "Bước 3: Phá Rào Bậc Kế Tiếp Cùng Nhóm A (Lệch Pha Đợt 2)",
        en: "Step 3: Break Next Tier with Group A (Wave 2 Stagger)",
      },
      description: {
        vi: "Tiếp tục dồn Orichalcum & Sợi Tơ cho 3 món Nhóm A vươn lên mốc Bậc Thầy kế tiếp.",
        en: "Funnel Orichalcum & Magic Thread into Group A to reach the subsequent Mastery milestone.",
      },
      targetSlotIds: spearheadSlotIds,
      targetLevel: tier2.requiredLevel,
      targetLabel: tier2.label,
      cost: step3Cost,
      unlocksMasteryLabel: {
        vi: `Kích hoạt Bậc Thầy 3 món: ${tier2.label.vi} (+${tier2.threePieceHeroHpPct.toFixed(2)}% HP Tướng, +${tier2.threePieceAllSoldierAtkPct.toFixed(2)}% ATK Lính)`,
        en: `Unlocks 3-Pc Mastery: ${tier2.label.en} (+${tier2.threePieceHeroHpPct.toFixed(2)}% Hero HP, +${tier2.threePieceAllSoldierAtkPct.toFixed(2)}% Soldier ATK)`,
      },
    },
    {
      stepNumber: 4,
      title: {
        vi: "Bước 4: Khép Chu Trình 6 Món Tại Mốc Mới",
        en: "Step 4: Complete 6-Piece Parity at New Tier",
      },
      description: {
        vi: "Kéo Nhóm B lên ngang bằng Nhóm A, hoàn tất chu trình 4 bước và chuẩn bị tiến tới mốc Y2 (Thánh Điển).",
        en: "Bring Group B up to match Group A, completing the 4-step cycle toward Y2 (Sacred Tome).",
      },
      targetSlotIds: followUpSlotIds,
      targetLevel: tier2.requiredLevel,
      targetLabel: tier2.label,
      cost: step4Cost,
      unlocksMasteryLabel: {
        vi: `Kích hoạt Bậc Thầy 6 món: ${tier2.label.vi} (+${tier2.sixPieceHeroAtkPct.toFixed(2)}% ATK Tướng, +${tier2.sixPieceAllSoldierHpPct.toFixed(2)}% HP Lính)`,
        en: `Unlocks 6-Pc Mastery: ${tier2.label.en} (+${tier2.sixPieceHeroAtkPct.toFixed(2)}% Hero ATK, +${tier2.sixPieceAllSoldierHpPct.toFixed(2)}% Soldier HP)`,
      },
    },
  ];

  return {
    mainFaction,
    spearheadSlotIds,
    followUpSlotIds,
    currentMastery,
    sacredTomeReadyCount,
    isSacredTomeUnlocked,
    steps,
  };
}

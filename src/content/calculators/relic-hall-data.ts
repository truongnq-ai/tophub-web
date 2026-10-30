import type { CalculatorLocale } from "./types";

/**
 * SSoT Sảnh Bí Bảo (Relic Hall — `citybuilding_lvup_new`, `index = 155`)
 * Trích xuất trực tiếp từ Meta.bytes (v1.0.42532+):
 * - 250 Cấp hiển thị (Lv.1 ➔ Lv.250), tổng cộng 2,193 bậc tiến độ nâng cấp.
 * - Tài nguyên tiêu hao:
 *   • Đá Vân Ma Thuật (Magic Stone — `gameId = 237`, `/images/items/materials/icon_30394.webp`)
 *   • Pha Lê Bí Thuật (Arcane Crystal — `gameId = 238`, `/images/items/consumables/icon_30395.webp`)
 */

export const RELIC_HALL_MIN_LEVEL = 1;
export const RELIC_HALL_MAX_LEVEL = 250;
export const RELIC_HALL_TOTAL_SUB_STEPS = 2193;

export const RELIC_HALL_MILESTONE_LEVELS: readonly number[] = [
  1, 30, 60, 100, 150, 200, 250,
] as const;

export const RELIC_HALL_DISCOUNT_PRESETS: readonly number[] = [
  0, 5, 10, 15, 20,
] as const;

/**
 * Tuple nén cho mỗi cấp hiển thị (Lv.1..250):
 * [level, subStepsCount, baseStonePerSubStep, baseCrystalPerSubStep, startFightforce, startBoostPermille, startConversionPermille]
 */
export type RelicHallRawTuple = readonly [
  level: number,
  subStepsCount: number,
  baseStonePerSubStep: number,
  baseCrystalPerSubStep: number,
  startFightforce: number,
  startBoostPermille: number,
  startConversionPermille: number,
];

export const RELIC_HALL_RAW_TUPLES: readonly RelicHallRawTuple[] = [
  [1, 4, 500, 0, 100, 10005, 1000],
  [2, 4, 500, 0, 500, 10025, 1000],
  [3, 4, 500, 0, 900, 10045, 1000],
  [4, 4, 500, 0, 1300, 10065, 1000],
  [5, 1, 600, 5, 1700, 10085, 1000],
  [6, 4, 600, 0, 1800, 10585, 1050],
  [7, 4, 600, 0, 2200, 10605, 1050],
  [8, 4, 600, 0, 2600, 10625, 1050],
  [9, 4, 600, 0, 3000, 10645, 1050],
  [10, 1, 1200, 5, 3400, 10665, 1050],
  [11, 4, 1120, 0, 3500, 11165, 1100],
  [12, 4, 1120, 0, 3900, 11185, 1100],
  [13, 4, 1120, 0, 4300, 11205, 1100],
  [14, 4, 1120, 0, 4700, 11225, 1100],
  [15, 1, 2000, 10, 5100, 11245, 1100],
  [16, 4, 1800, 0, 5200, 11745, 1150],
  [17, 4, 1800, 0, 5600, 11765, 1150],
  [18, 4, 1800, 0, 6000, 11785, 1150],
  [19, 4, 1800, 0, 6400, 11805, 1150],
  [20, 1, 2300, 15, 6800, 11825, 1150],
  [21, 5, 2100, 0, 6900, 12325, 1200],
  [22, 5, 2100, 0, 7400, 12350, 1200],
  [23, 5, 2100, 0, 7900, 12375, 1200],
  [24, 5, 2100, 0, 8400, 12400, 1200],
  [25, 1, 2500, 20, 8900, 12425, 1200],
  [26, 5, 2400, 0, 9000, 12925, 1250],
  [27, 5, 2400, 0, 9500, 12950, 1250],
  [28, 5, 2400, 0, 10000, 12975, 1250],
  [29, 5, 2400, 0, 10500, 13000, 1250],
  [30, 1, 6600, 25, 11000, 13025, 1250],
  [31, 5, 6000, 0, 11100, 13525, 1300],
  [32, 5, 6000, 0, 11600, 13550, 1300],
  [33, 5, 6000, 0, 12100, 13575, 1300],
  [34, 5, 6000, 0, 12600, 13600, 1300],
  [35, 1, 6600, 30, 13100, 13625, 1300],
  [36, 5, 6000, 0, 13200, 14125, 1350],
  [37, 5, 6000, 0, 13700, 14150, 1350],
  [38, 5, 6000, 0, 14200, 14175, 1350],
  [39, 5, 6000, 0, 14700, 14200, 1350],
  [40, 1, 6600, 40, 15200, 14225, 1350],
  [41, 5, 6000, 0, 15300, 14725, 1400],
  [42, 5, 6000, 0, 15800, 17225, 1400],
  [43, 5, 6000, 0, 16300, 17250, 1400],
  [44, 5, 6000, 0, 16800, 17275, 1400],
  [45, 1, 6600, 50, 17300, 17300, 1400],
  [46, 5, 6000, 0, 17400, 17800, 1450],
  [47, 5, 6000, 0, 17900, 17825, 1450],
  [48, 5, 6000, 0, 18400, 17850, 1450],
  [49, 5, 6000, 0, 18900, 17875, 1450],
  [50, 1, 6600, 60, 19400, 17900, 1450],
  [51, 6, 9000, 0, 19500, 18400, 1500],
  [52, 6, 9000, 0, 20100, 18430, 1500],
  [53, 6, 9000, 0, 20700, 18460, 1500],
  [54, 6, 9000, 0, 21300, 18490, 1500],
  [55, 1, 10000, 70, 21900, 18520, 1500],
  [56, 6, 9000, 0, 22000, 19020, 1550],
  [57, 6, 9000, 0, 22600, 19050, 1550],
  [58, 6, 9000, 0, 23200, 19080, 1550],
  [59, 6, 9000, 0, 23800, 19110, 1550],
  [60, 1, 10000, 80, 24400, 19140, 1550],
  [61, 7, 9000, 0, 24500, 19640, 1600],
  [62, 7, 9000, 0, 25200, 19675, 1600],
  [63, 7, 9000, 0, 25900, 19710, 1600],
  [64, 7, 9000, 0, 26600, 19745, 1600],
  [65, 1, 10000, 90, 27300, 19780, 1600],
  [66, 7, 9000, 0, 27400, 20280, 1650],
  [67, 7, 9000, 0, 28100, 20315, 1650],
  [68, 7, 9000, 0, 28800, 20350, 1650],
  [69, 7, 9000, 0, 29500, 20385, 1650],
  [70, 1, 10000, 100, 30200, 20420, 1650],
  [71, 8, 10000, 0, 30300, 20920, 1700],
  [72, 8, 10000, 0, 31100, 20960, 1700],
  [73, 8, 10000, 0, 31900, 21000, 1700],
  [74, 8, 10000, 0, 32700, 21040, 1700],
  [75, 1, 11000, 120, 33500, 21080, 1700],
  [76, 8, 10000, 0, 33600, 21580, 1750],
  [77, 8, 10000, 0, 34400, 21620, 1750],
  [78, 8, 10000, 0, 35200, 21660, 1750],
  [79, 8, 10000, 0, 36000, 21700, 1750],
  [80, 1, 11000, 150, 36800, 21740, 1750],
  [81, 9, 10000, 0, 36900, 22240, 1800],
  [82, 9, 10000, 0, 37800, 22285, 1800],
  [83, 9, 10000, 0, 38700, 22330, 1800],
  [84, 9, 10000, 0, 39600, 22376, 1800],
  [85, 1, 11000, 170, 40500, 22421, 1800],
  [86, 9, 10000, 0, 40600, 22921, 1850],
  [87, 9, 10000, 0, 41500, 22966, 1850],
  [88, 9, 10000, 0, 42400, 23011, 1850],
  [89, 9, 10000, 0, 43300, 23056, 1850],
  [90, 1, 12000, 200, 44200, 23101, 1850],
  [91, 10, 12000, 0, 44300, 23601, 1900],
  [92, 10, 12000, 0, 45300, 23651, 1900],
  [93, 10, 12000, 0, 46300, 23701, 1900],
  [94, 10, 12000, 0, 47300, 23751, 1900],
  [95, 1, 12000, 230, 48300, 23801, 1900],
  [96, 10, 12000, 0, 48400, 24301, 1950],
  [97, 10, 12000, 0, 49400, 24351, 1950],
  [98, 10, 12000, 0, 50400, 24401, 1950],
  [99, 10, 12000, 0, 51400, 24451, 1950],
  [100, 1, 13000, 250, 52400, 24501, 1950],
  [101, 12, 12500, 0, 52500, 25001, 2000],
  [102, 12, 12500, 0, 53700, 25061, 2000],
  [103, 12, 12500, 0, 54900, 25121, 2000],
  [104, 12, 12500, 0, 56100, 25181, 2000],
  [105, 1, 15000, 300, 57300, 25241, 2000],
  [106, 12, 12500, 0, 57400, 25741, 2050],
  [107, 12, 12500, 0, 58600, 25801, 2050],
  [108, 12, 12500, 0, 59800, 25861, 2050],
  [109, 12, 12500, 0, 61000, 25921, 2050],
  [110, 1, 30000, 350, 62200, 25981, 2050],
  [111, 14, 30880, 0, 62300, 26481, 2100],
  [112, 14, 30880, 0, 63700, 26551, 2100],
  [113, 14, 30880, 0, 65100, 26621, 2100],
  [114, 14, 30880, 0, 66500, 26691, 2100],
  [115, 1, 33000, 400, 67900, 26761, 2100],
  [116, 14, 30880, 0, 68000, 27261, 2150],
  [117, 14, 30880, 0, 69400, 27331, 2150],
  [118, 14, 30880, 0, 70800, 27401, 2150],
  [119, 14, 30880, 0, 72200, 27471, 2150],
  [120, 1, 35000, 500, 73600, 27541, 2150],
  [121, 16, 31520, 0, 73700, 28041, 2200],
  [122, 16, 31520, 0, 75300, 28121, 2200],
  [123, 16, 31520, 0, 76900, 28201, 2200],
  [124, 16, 31520, 0, 78500, 28281, 2200],
  [125, 1, 40000, 750, 80100, 28361, 2200],
  [126, 16, 31520, 0, 80200, 28861, 2250],
  [127, 16, 31520, 0, 81800, 28941, 2250],
  [128, 16, 31520, 0, 83400, 29021, 2250],
  [129, 16, 31520, 0, 85000, 29101, 2250],
  [130, 1, 40000, 1000, 86600, 29181, 2250],
  [131, 18, 37360, 0, 86700, 29681, 2300],
  [132, 18, 37360, 0, 88500, 29771, 2300],
  [133, 18, 37360, 0, 90300, 29861, 2300],
  [134, 18, 37360, 0, 92100, 29951, 2300],
  [135, 1, 40000, 1500, 97700, 30041, 2300],
  [136, 18, 37360, 0, 97800, 30541, 2350],
  [137, 18, 37360, 0, 99600, 30631, 2350],
  [138, 18, 37360, 0, 101400, 30721, 2350],
  [139, 18, 37360, 0, 103200, 30811, 2350],
  [140, 1, 45000, 2000, 126200, 30901, 2350],
  [141, 20, 45000, 0, 126300, 31401, 2400],
  [142, 20, 43000, 0, 128300, 31501, 2400],
  [143, 20, 43000, 0, 130300, 31601, 2400],
  [144, 20, 43000, 0, 132300, 31701, 2400],
  [145, 1, 45000, 2500, 161900, 31801, 2400],
  [146, 20, 43000, 0, 162000, 32301, 2450],
  [147, 20, 43000, 0, 164000, 32401, 2450],
  [148, 20, 43000, 0, 166000, 32501, 2450],
  [149, 20, 43000, 0, 168000, 32601, 2450],
  [150, 20, 43000, 0, 170000, 32701, 2450],
  [151, 10, 22000, 10, 172000, 32801, 2450],
  [152, 10, 22000, 10, 173000, 32851, 2460],
  [153, 10, 22000, 10, 174000, 32901, 2470],
  [154, 10, 22000, 10, 175000, 32951, 2480],
  [155, 10, 22000, 10, 176000, 33001, 2490],
  [156, 10, 22000, 10, 177000, 33051, 2500],
  [157, 10, 22000, 10, 178000, 33101, 2510],
  [158, 10, 22000, 10, 179000, 33151, 2520],
  [159, 10, 22000, 10, 180000, 33201, 2530],
  [160, 10, 22000, 10, 181000, 33251, 2540],
  [161, 10, 24000, 10, 182000, 33301, 2550],
  [162, 10, 24000, 10, 183000, 33351, 2560],
  [163, 10, 24000, 10, 184000, 33401, 2570],
  [164, 10, 24000, 10, 185000, 33451, 2580],
  [165, 10, 24000, 10, 186000, 33501, 2590],
  [166, 10, 26000, 10, 187000, 33551, 2600],
  [167, 10, 26000, 10, 188000, 33601, 2610],
  [168, 10, 26000, 10, 189000, 33651, 2620],
  [169, 10, 26000, 10, 190000, 33701, 2630],
  [170, 10, 26000, 10, 191000, 33751, 2640],
  [171, 10, 28000, 20, 192000, 33801, 2650],
  [172, 10, 28000, 20, 193000, 33851, 2660],
  [173, 10, 28000, 20, 194000, 33901, 2670],
  [174, 10, 28000, 20, 195000, 33951, 2680],
  [175, 10, 28000, 20, 196000, 34001, 2690],
  [176, 10, 30000, 20, 197000, 34051, 2700],
  [177, 10, 30000, 20, 198000, 34101, 2710],
  [178, 10, 30000, 20, 199000, 34151, 2720],
  [179, 10, 30000, 20, 200000, 34201, 2730],
  [180, 10, 30000, 20, 201000, 34251, 2740],
  [181, 10, 32000, 20, 202000, 34301, 2750],
  [182, 10, 32000, 20, 203000, 34351, 2760],
  [183, 10, 32000, 20, 204000, 34401, 2770],
  [184, 10, 32000, 20, 205000, 34451, 2780],
  [185, 10, 32000, 20, 206000, 34501, 2790],
  [186, 10, 34000, 20, 207000, 34551, 2800],
  [187, 10, 34000, 20, 208000, 34601, 2810],
  [188, 10, 34000, 20, 209000, 34651, 2820],
  [189, 10, 34000, 20, 210000, 34701, 2830],
  [190, 10, 34000, 20, 211000, 34751, 2840],
  [191, 10, 36000, 40, 212000, 34801, 2850],
  [192, 10, 36000, 40, 213000, 34851, 2860],
  [193, 10, 36000, 40, 214000, 34901, 2870],
  [194, 10, 36000, 40, 215000, 34951, 2880],
  [195, 10, 36000, 40, 216000, 35001, 2890],
  [196, 10, 38000, 40, 217000, 35051, 2900],
  [197, 10, 38000, 40, 218000, 35101, 2910],
  [198, 10, 38000, 40, 219000, 35151, 2920],
  [199, 10, 38000, 40, 220000, 35201, 2930],
  [200, 10, 38000, 40, 221000, 35251, 2940],
  [201, 10, 40000, 40, 222000, 35301, 2950],
  [202, 10, 40000, 40, 223000, 35351, 2960],
  [203, 10, 40000, 40, 224000, 35401, 2970],
  [204, 10, 40000, 40, 225000, 35451, 2980],
  [205, 10, 40000, 40, 226000, 35501, 2990],
  [206, 10, 42000, 40, 227000, 35551, 3000],
  [207, 10, 42000, 40, 228000, 35601, 3010],
  [208, 10, 42000, 40, 229000, 35651, 3020],
  [209, 10, 42000, 40, 230000, 35701, 3030],
  [210, 10, 42000, 40, 231000, 35751, 3040],
  [211, 10, 44000, 50, 232000, 35801, 3050],
  [212, 10, 44000, 50, 233000, 35851, 3060],
  [213, 10, 44000, 50, 234000, 35901, 3070],
  [214, 10, 44000, 50, 235000, 35951, 3080],
  [215, 10, 44000, 50, 236000, 36001, 3090],
  [216, 10, 46000, 50, 237000, 36051, 3100],
  [217, 10, 46000, 50, 238000, 36101, 3110],
  [218, 10, 46000, 50, 239000, 36151, 3120],
  [219, 10, 46000, 50, 240000, 36201, 3130],
  [220, 10, 46000, 50, 241000, 36251, 3140],
  [221, 10, 48000, 50, 242000, 36301, 3150],
  [222, 10, 48000, 50, 243000, 36351, 3160],
  [223, 10, 48000, 50, 244000, 36401, 3170],
  [224, 10, 48000, 50, 245000, 36451, 3180],
  [225, 10, 48000, 50, 246000, 36501, 3190],
  [226, 10, 50000, 50, 247000, 36551, 3200],
  [227, 10, 50000, 50, 248000, 36601, 3210],
  [228, 10, 50000, 50, 249000, 36651, 3220],
  [229, 10, 50000, 50, 250000, 36701, 3230],
  [230, 10, 50000, 50, 251000, 36751, 3240],
  [231, 10, 52000, 60, 252000, 36801, 3250],
  [232, 10, 52000, 60, 253000, 36851, 3260],
  [233, 10, 52000, 60, 254000, 36901, 3270],
  [234, 10, 52000, 60, 255000, 36951, 3280],
  [235, 10, 52000, 60, 256000, 37001, 3290],
  [236, 10, 54000, 60, 257000, 37051, 3300],
  [237, 10, 54000, 60, 258000, 37101, 3310],
  [238, 10, 54000, 60, 259000, 37151, 3320],
  [239, 10, 54000, 60, 260000, 37201, 3330],
  [240, 10, 54000, 60, 261000, 37251, 3340],
  [241, 10, 56000, 60, 262000, 37301, 3350],
  [242, 10, 56000, 60, 263000, 37351, 3360],
  [243, 10, 56000, 60, 264000, 37401, 3370],
  [244, 10, 56000, 60, 265000, 37451, 3380],
  [245, 10, 56000, 60, 266000, 37501, 3390],
  [246, 10, 58000, 60, 267000, 37551, 3400],
  [247, 10, 58000, 60, 268000, 37601, 3410],
  [248, 10, 58000, 60, 269000, 37651, 3420],
  [249, 10, 58000, 60, 270000, 37701, 3430],
  [250, 10, 58000, 60, 271000, 37751, 3440],
] as const;

export interface RelicHallLevelMeta {
  readonly level: number;
  readonly subStepsCount: number;
  readonly baseStonePerSubStep: number;
  readonly baseCrystalPerSubStep: number;
  readonly startFightforce: number;
  readonly startBoostPermille: number;
  readonly startConversionPermille: number;
  readonly isBreakthroughLevel: boolean;
}

export interface RelicHallStateSnapshot {
  readonly level: number;
  readonly subStep: number;
  readonly subStepsCount: number;
  readonly fightforce: number;
  readonly atkHpBoostPermille: number;
  readonly atkHpBoostPercent: number;
  readonly conversionPermille: number;
  readonly conversionPercent: number;
  readonly nextStepBaseStone: number;
  readonly nextStepBaseCrystal: number;
  readonly nextStepDiscountedStone: number;
  readonly nextStepDiscountedCrystal: number;
}

export interface RelicHallCalculationInput {
  readonly fromLevel: number;
  readonly fromSubStep: number;
  readonly toLevel: number;
  readonly toSubStep: number;
  readonly costReductionPercent: number;
  readonly ownedArcaneCrystals: number;
  readonly ownedMagicStones: number;
}

export interface RelicHallCalculationResult {
  readonly isInvalidRange: boolean;
  readonly fromState: RelicHallStateSnapshot;
  readonly toState: RelicHallStateSnapshot;
  readonly subStepsTraversed: number;
  readonly costReductionPercent: number;
  readonly baseArcaneCrystals: number;
  readonly baseMagicStones: number;
  readonly requiredArcaneCrystals: number;
  readonly requiredMagicStones: number;
  readonly ownedArcaneCrystals: number;
  readonly ownedMagicStones: number;
  readonly missingArcaneCrystals: number;
  readonly surplusArcaneCrystals: number;
  readonly missingMagicStones: number;
  readonly surplusMagicStones: number;
  readonly fightforceDelta: number;
  readonly atkHpBoostDeltaPercent: number;
  readonly conversionDeltaPercent: number;
}

export interface RelicHallRangeGroup {
  readonly id: string;
  readonly label: Readonly<Record<CalculatorLocale, string>>;
  readonly minLevel: number;
  readonly maxLevel: number;
}

export const RELIC_HALL_RANGE_GROUPS: readonly RelicHallRangeGroup[] = [
  {
    id: "1-50",
    label: { vi: "Lv.1 – Lv.50", en: "Lv.1 – Lv.50" },
    minLevel: 1,
    maxLevel: 50,
  },
  {
    id: "51-100",
    label: { vi: "Lv.51 – Lv.100", en: "Lv.51 – Lv.100" },
    minLevel: 51,
    maxLevel: 100,
  },
  {
    id: "101-150",
    label: { vi: "Lv.101 – Lv.150", en: "Lv.101 – Lv.150" },
    minLevel: 101,
    maxLevel: 150,
  },
  {
    id: "151-200",
    label: { vi: "Lv.151 – Lv.200", en: "Lv.151 – Lv.200" },
    minLevel: 151,
    maxLevel: 200,
  },
  {
    id: "201-250",
    label: { vi: "Lv.201 – Lv.250", en: "Lv.201 – Lv.250" },
    minLevel: 201,
    maxLevel: 250,
  },
] as const;

export function clampRelicHallLevel(level: number): number {
  if (!Number.isFinite(level)) return RELIC_HALL_MIN_LEVEL;
  return Math.max(
    RELIC_HALL_MIN_LEVEL,
    Math.min(RELIC_HALL_MAX_LEVEL, Math.round(level))
  );
}

export function clampCostReductionPercent(percent: number): number {
  if (!Number.isFinite(percent)) return 0;
  return Math.max(0, Math.min(80, Math.round(percent * 100) / 100));
}

export function applyConstructionCostDiscount(
  baseCost: number,
  costReductionPercent: number
): number {
  if (baseCost <= 0) return 0;
  const safeDiscount = clampCostReductionPercent(costReductionPercent);
  if (safeDiscount <= 0) return baseCost;
  return Math.floor((baseCost * (100 - safeDiscount)) / 100 + 1e-9);
}

export function getRelicHallLevelMeta(level: number): RelicHallLevelMeta {
  const safeLevel = clampRelicHallLevel(level);
  const tuple = RELIC_HALL_RAW_TUPLES[safeLevel - 1] ?? RELIC_HALL_RAW_TUPLES[0];
  return {
    level: tuple[0],
    subStepsCount: tuple[1],
    baseStonePerSubStep: tuple[2],
    baseCrystalPerSubStep: tuple[3],
    startFightforce: tuple[4],
    startBoostPermille: tuple[5],
    startConversionPermille: tuple[6],
    isBreakthroughLevel: tuple[1] === 1 && tuple[3] > 0,
  };
}

export function clampRelicHallSubStep(level: number, subStep: number): number {
  const meta = getRelicHallLevelMeta(level);
  if (!Number.isFinite(subStep)) return 0;
  return Math.max(0, Math.min(meta.subStepsCount - 1, Math.round(subStep)));
}

/**
 * Chi phí gốc của 1 bậc tiến độ cụ thể (xử lý chính xác dị biệt Lv.141:
 * bậc 0 tốn 45,000 Đá Vân, bậc 1..19 tốn 43,000 Đá Vân).
 */
export function getStepBaseCosts(
  level: number,
  subStep: number
): { readonly stone: number; readonly crystal: number } {
  const meta = getRelicHallLevelMeta(level);
  if (meta.level === 141 && subStep >= 1) {
    return {
      stone: 43_000,
      crystal: meta.baseCrystalPerSubStep,
    };
  }
  return {
    stone: meta.baseStonePerSubStep,
    crystal: meta.baseCrystalPerSubStep,
  };
}

export function getRelicHallState(
  level: number,
  subStep: number = 0,
  costReductionPercent: number = 0
): RelicHallStateSnapshot {
  const meta = getRelicHallLevelMeta(level);
  const safeSubStep = clampRelicHallSubStep(meta.level, subStep);
  const fightforce = meta.startFightforce + safeSubStep * 100;
  const atkHpBoostPermille = meta.startBoostPermille + safeSubStep * 5;
  const conversionPermille = meta.startConversionPermille;

  const stepCosts = getStepBaseCosts(meta.level, safeSubStep);
  const nextStepDiscountedStone = applyConstructionCostDiscount(
    stepCosts.stone,
    costReductionPercent
  );
  const nextStepDiscountedCrystal = applyConstructionCostDiscount(
    stepCosts.crystal,
    costReductionPercent
  );

  return {
    level: meta.level,
    subStep: safeSubStep,
    subStepsCount: meta.subStepsCount,
    fightforce,
    atkHpBoostPermille,
    atkHpBoostPercent: Number((atkHpBoostPermille / 100).toFixed(2)),
    conversionPermille,
    conversionPercent: Number((conversionPermille / 100).toFixed(2)),
    nextStepBaseStone: stepCosts.stone,
    nextStepBaseCrystal: stepCosts.crystal,
    nextStepDiscountedStone,
    nextStepDiscountedCrystal,
  };
}

export function getRelicHallBoostPermilleAtLevel(
  level: number,
  subStep: number = 0
): number {
  return getRelicHallState(level, subStep, 0).atkHpBoostPermille;
}

export function calculateRelicHallUpgrade(
  input: RelicHallCalculationInput
): RelicHallCalculationResult {
  const safeDiscount = clampCostReductionPercent(input.costReductionPercent);
  const safeFromLevel = clampRelicHallLevel(input.fromLevel);
  const safeFromSubStep = clampRelicHallSubStep(safeFromLevel, input.fromSubStep);
  const safeToLevel = clampRelicHallLevel(input.toLevel);
  const safeToSubStep = clampRelicHallSubStep(safeToLevel, input.toSubStep);

  const isInvalidRange =
    safeToLevel < safeFromLevel ||
    (safeToLevel === safeFromLevel && safeToSubStep < safeFromSubStep);

  const fromState = getRelicHallState(
    safeFromLevel,
    safeFromSubStep,
    safeDiscount
  );
  const toState = getRelicHallState(
    isInvalidRange ? safeFromLevel : safeToLevel,
    isInvalidRange ? safeFromSubStep : safeToSubStep,
    safeDiscount
  );

  let subStepsTraversed = 0;
  let baseArcaneCrystals = 0;
  let baseMagicStones = 0;
  let requiredArcaneCrystals = 0;
  let requiredMagicStones = 0;

  if (!isInvalidRange) {
    for (let lv = safeFromLevel; lv <= safeToLevel; lv += 1) {
      const meta = getRelicHallLevelMeta(lv);
      const startStep = lv === safeFromLevel ? safeFromSubStep : 0;
      const endStepExclusive =
        lv === safeToLevel ? safeToSubStep : meta.subStepsCount;

      for (let s = startStep; s < endStepExclusive; s += 1) {
        const stepBase = getStepBaseCosts(lv, s);
        subStepsTraversed += 1;
        baseMagicStones += stepBase.stone;
        baseArcaneCrystals += stepBase.crystal;
        requiredMagicStones += applyConstructionCostDiscount(
          stepBase.stone,
          safeDiscount
        );
        requiredArcaneCrystals += applyConstructionCostDiscount(
          stepBase.crystal,
          safeDiscount
        );
      }
    }
  }

  const safeOwnedCrystals = Math.max(0, Math.floor(input.ownedArcaneCrystals || 0));
  const safeOwnedStones = Math.max(0, Math.floor(input.ownedMagicStones || 0));

  const missingArcaneCrystals = Math.max(
    0,
    requiredArcaneCrystals - safeOwnedCrystals
  );
  const surplusArcaneCrystals = Math.max(
    0,
    safeOwnedCrystals - requiredArcaneCrystals
  );

  const missingMagicStones = Math.max(
    0,
    requiredMagicStones - safeOwnedStones
  );
  const surplusMagicStones = Math.max(
    0,
    safeOwnedStones - requiredMagicStones
  );

  return {
    isInvalidRange,
    fromState,
    toState,
    subStepsTraversed,
    costReductionPercent: safeDiscount,
    baseArcaneCrystals,
    baseMagicStones,
    requiredArcaneCrystals,
    requiredMagicStones,
    ownedArcaneCrystals: safeOwnedCrystals,
    ownedMagicStones: safeOwnedStones,
    missingArcaneCrystals,
    surplusArcaneCrystals,
    missingMagicStones,
    surplusMagicStones,
    fightforceDelta: Math.max(0, toState.fightforce - fromState.fightforce),
    atkHpBoostDeltaPercent: Number(
      Math.max(0, toState.atkHpBoostPercent - fromState.atkHpBoostPercent).toFixed(2)
    ),
    conversionDeltaPercent: Number(
      Math.max(0, toState.conversionPercent - fromState.conversionPercent).toFixed(2)
    ),
  };
}

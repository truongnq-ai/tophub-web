/**
 * AUTO-GENERATED FROM LOCAL UNITY CACHE (Meta.bytes v1.0.42826 & Locale_vi.bytes v1.0.42882)
 * Script: tophub-companion/scripts/export-technology-calculator-data.ts
 * Branches: 8 Research Cottage Trees (190 Nodes, 942 Level Steps)
 */

import type { CalculatorLocale } from "./types";
import {
  CONSTRUCTION_RESOURCE_META,
  DIAMOND_ICON_PATH,
  formatAttributeValue,
  formatBuildDuration,
  formatGameResourceCompact,
} from "./construction-data";

export {
  CONSTRUCTION_RESOURCE_META,
  DIAMOND_ICON_PATH,
  formatAttributeValue,
  formatBuildDuration,
  formatGameResourceCompact,
};

export const RESEARCH_COTTAGE_BUILDING_ID = 136;
export const RESEARCH_COTTAGE_ICON_PATH = "/images/buildings/Building_Icon16.webp";

export type TechnologyBranchTier = "basic" | "advanced";
export type TechnologyResourceKey = "timber" | "stone" | "ruby";

export interface TechnologyBranchMeta {
  readonly id: number;
  readonly tier: TechnologyBranchTier;
  readonly order: number;
  readonly name: Record<CalculatorLocale, string>;
  readonly description: Record<CalculatorLocale, string>;
  readonly icon: string;
  readonly nodeCount: number;
  readonly maxTotalLevels: number;
}

export interface TechnologyPrereqRef {
  readonly nodeId: number;
  readonly requiredLevel: number;
}

export interface TechnologyLevelStep {
  readonly lv: number;
  readonly cottageLv: number;
  readonly timeSec: number;
  readonly fightforce: number;
  readonly timber: number;
  readonly stone: number;
  readonly ruby: number;
  readonly prerequisites: readonly TechnologyPrereqRef[];
  readonly attr1Id: number;
  readonly attr1Delta: number;
  readonly attr2Id: number;
  readonly attr2Delta: number;
}

export interface TechnologyNodeMeta {
  readonly id: number;
  readonly branchId: number;
  readonly row: number;
  readonly col: 1 | 2 | 3;
  readonly maxLevel: number;
  readonly icon: string;
  readonly name: Record<CalculatorLocale, string>;
  readonly levels: readonly TechnologyLevelStep[];
}

export interface TechnologyGlobalBuffs {
  readonly researchSpeedPct: number;
  readonly costReductionPct: number;
}

export interface TechnologyQueueState {
  readonly queueId: string;
  readonly nodeId: number;
  readonly fromLevel: number;
  readonly toLevel: number;
}

export interface TechnologyAttributeGain {
  readonly attrId: number;
  readonly label: Record<CalculatorLocale, string>;
  readonly isPercent: boolean;
  readonly currentValue: number;
  readonly targetValue: number;
  readonly deltaValue: number;
}

export interface TechnologyPrerequisiteStatus {
  readonly nodeId: number;
  readonly nodeName: Record<CalculatorLocale, string>;
  readonly nodeIcon: string;
  readonly branchId: number;
  readonly requiredLevel: number;
}

export interface TechnologyResourceStatus {
  readonly key: TechnologyResourceKey;
  readonly label: Record<CalculatorLocale, string>;
  readonly icon: string;
  readonly baseRequired: number;
  readonly required: number;
}

export interface TechnologyQueueUpgradePlan {
  readonly queueId: string;
  readonly node: TechnologyNodeMeta;
  readonly branch: TechnologyBranchMeta;
  readonly fromLevel: number;
  readonly toLevel: number;
  readonly currentFightforce: number;
  readonly targetFightforce: number;
  readonly deltaFightforce: number;
  readonly attributeGains: readonly TechnologyAttributeGain[];
  readonly requiredCottageLevel: number;
  readonly prerequisites: readonly TechnologyPrerequisiteStatus[];
  readonly baseCosts: Record<TechnologyResourceKey, number>;
  readonly discountedCosts: Record<TechnologyResourceKey, number>;
  readonly resourceStatuses: readonly TechnologyResourceStatus[];
  readonly baseTimeSeconds: number;
  readonly effectiveTimeSeconds: number;
  readonly savedTimeSeconds: number;
  readonly instantDiamonds: number;
}

export interface TechnologyGlobalSummary {
  readonly totalQueues: number;
  readonly totalBaseCosts: Record<TechnologyResourceKey, number>;
  readonly totalDiscountedCosts: Record<TechnologyResourceKey, number>;
  readonly totalDeltaFightforce: number;
  readonly totalInstantDiamonds: number;
  readonly parallelTimeSeconds: number;
  readonly totalSpeedupTimeSeconds: number;
  readonly maxRequiredCottageLevel: number;
}

export const DEFAULT_TECH_GLOBAL_BUFFS: TechnologyGlobalBuffs = {
  researchSpeedPct: 80,
  costReductionPct: 5,
};

export const DEFAULT_TECH_QUEUES: readonly TechnologyQueueState[] = [
  {
    queueId: "tech-queue-1",
    nodeId: 213001,
    fromLevel: 0,
    toLevel: 5,
  },
  {
    queueId: "tech-queue-2",
    nodeId: 213004,
    fromLevel: 0,
    toLevel: 5,
  },
];

export const TECHNOLOGY_ATTRIBUTE_META: Record<
  number,
  {
    readonly label: Record<CalculatorLocale, string>;
    readonly isPercent: boolean;
  }
> = {
  "18": {
    "label": {
      "vi": "Tăng ST",
      "en": "Damage Increase"
    },
    "isPercent": true
  },
  "19": {
    "label": {
      "vi": "Giảm ST",
      "en": "Damage Reduction"
    },
    "isPercent": true
  },
  "45": {
    "label": {
      "vi": "Sát Thương PvP (khi Công Thành)",
      "en": "PvP Siege Damage"
    },
    "isPercent": true
  },
  "48": {
    "label": {
      "vi": "Giảm Sát Thương khi thủ thành Thế Giới",
      "en": "World Garrison DMG Reduction"
    },
    "isPercent": true
  },
  "57": {
    "label": {
      "vi": "Điểm Công Thành",
      "en": "Siege Points"
    },
    "isPercent": false
  },
  "68": {
    "label": {
      "vi": "Tăng ST (có hiệu lực với Thủ Lĩnh Mạo Hiểm)",
      "en": "Boss Damage Increase (Adventure)"
    },
    "isPercent": true
  },
  "69": {
    "label": {
      "vi": "Giảm ST (có hiệu lực với Thủ Lĩnh Mạo Hiểm)",
      "en": "Boss Damage Reduction (Adventure)"
    },
    "isPercent": true
  },
  "103": {
    "label": {
      "vi": "ATK Anh Hùng",
      "en": "Hero ATK"
    },
    "isPercent": true
  },
  "104": {
    "label": {
      "vi": "HP Anh Hùng",
      "en": "Hero HP"
    },
    "isPercent": true
  },
  "158": {
    "label": {
      "vi": "Tấn Công trong lúc cướp (khi Công Thành)",
      "en": "Siege Plunder ATK"
    },
    "isPercent": true
  },
  "159": {
    "label": {
      "vi": "HP trong lúc cướp (khi Công Thành)",
      "en": "Siege Plunder HP"
    },
    "isPercent": true
  },
  "1002": {
    "label": {
      "vi": "Tăng tốc độ hành quân PvE",
      "en": "PvE March Speed"
    },
    "isPercent": true
  },
  "1004": {
    "label": {
      "vi": "Tốc độ thu thập Gỗ",
      "en": "Timber Gathering Speed"
    },
    "isPercent": true
  },
  "1005": {
    "label": {
      "vi": "Tốc độ thu thập Đá",
      "en": "Stone Gathering Speed"
    },
    "isPercent": true
  },
  "1006": {
    "label": {
      "vi": "Tốc độ thu thập Ruby",
      "en": "Ruby Gathering Speed"
    },
    "isPercent": true
  },
  "1012": {
    "label": {
      "vi": "Bonus sản lượng Khu Đốn Gỗ",
      "en": "Lumber Mill Output Bonus"
    },
    "isPercent": true
  },
  "1014": {
    "label": {
      "vi": "Bonus sản lượng Khu Mỏ Đá",
      "en": "Quarry Output Bonus"
    },
    "isPercent": true
  },
  "1015": {
    "label": {
      "vi": "Thời Gian Xây Miễn Phí (giây)",
      "en": "Free Construction Time (sec)"
    },
    "isPercent": false
  },
  "1016": {
    "label": {
      "vi": "Tốc độ huấn luyện lính",
      "en": "Troop Training Speed"
    },
    "isPercent": true
  },
  "1017": {
    "label": {
      "vi": "Giới Hạn Huấn Luyện",
      "en": "Training Capacity"
    },
    "isPercent": false
  },
  "1018": {
    "label": {
      "vi": "Sức chứa lính (của mỗi phe)",
      "en": "Barracks Troop Capacity (per Faction)"
    },
    "isPercent": false
  },
  "1019": {
    "label": {
      "vi": "Giới Hạn Xuất Chinh",
      "en": "March Size Capacity"
    },
    "isPercent": false
  },
  "1022": {
    "label": {
      "vi": "Tốc độ trị liệu",
      "en": "Hospital Healing Speed"
    },
    "isPercent": true
  },
  "1032": {
    "label": {
      "vi": "Giới hạn sức chứa Bệnh Viện",
      "en": "Hospital Capacity"
    },
    "isPercent": false
  },
  "1033": {
    "label": {
      "vi": "Tốc độ nghiên cứu Công Nghệ",
      "en": "Tech Research Speed"
    },
    "isPercent": true
  },
  "1034": {
    "label": {
      "vi": "Tốc độ xây dựng",
      "en": "Construction Speed"
    },
    "isPercent": true
  },
  "1052": {
    "label": {
      "vi": "Tăng tải trọng của tất cả quân",
      "en": "All Troop Load Capacity"
    },
    "isPercent": true
  },
  "1060": {
    "label": {
      "vi": "Gia Tốc Công Nghệ Miễn Phí (giây)",
      "en": "Free Tech Speedup Time (sec)"
    },
    "isPercent": false
  },
  "1070": {
    "label": {
      "vi": "Số lần được trợ giúp",
      "en": "Guild Help Times"
    },
    "isPercent": false
  },
  "1072": {
    "label": {
      "vi": "Tăng Sản Lượng (Gỗ/Đá/Ruby/Thịt/H.Chương)",
      "en": "Resource Output Bonus (Timber/Stone/Ruby/Meat)"
    },
    "isPercent": true
  },
  "1076": {
    "label": {
      "vi": "Bonus tốc độ hành quân pvp",
      "en": "PvP March Speed Bonus"
    },
    "isPercent": true
  },
  "1079": {
    "label": {
      "vi": "Tăng điểm thu thập Quân Bị Hội và đánh Dã Quái (không phải Tập Kết)",
      "en": "GAR Gathering & Monster Hunt Points"
    },
    "isPercent": true
  },
  "1080": {
    "label": {
      "vi": "Tăng Điểm Công Trình Quân Bị Hội",
      "en": "GAR Construction Points Bonus"
    },
    "isPercent": true
  },
  "1081": {
    "label": {
      "vi": "Tăng Điểm Đào tạo Cuộc đua Vũ khí của Hội.",
      "en": "GAR Troop Training Points Bonus"
    },
    "isPercent": true
  },
  "1082": {
    "label": {
      "vi": "Tăng Điểm Chiêu Mộ Quân Bị Hội",
      "en": "GAR Hero Recruitment Points Bonus"
    },
    "isPercent": true
  },
  "1083": {
    "label": {
      "vi": "Tăng Điểm Công Nghệ Quân Bị Hội",
      "en": "GAR Technology Points Bonus"
    },
    "isPercent": true
  },
  "1085": {
    "label": {
      "vi": "Tăng điểm diệt địch của Hội",
      "en": "GAR Enemy Elimination Points Bonus"
    },
    "isPercent": true
  },
  "1086": {
    "label": {
      "vi": "Tăng Lv Huấn Luyện Lính Liên Minh",
      "en": "League Soldier Level Bonus"
    },
    "isPercent": false
  },
  "1087": {
    "label": {
      "vi": "Tăng Lv Huấn Luyện Lính Bộ Tộc",
      "en": "Horde Soldier Level Bonus"
    },
    "isPercent": false
  },
  "1088": {
    "label": {
      "vi": "Tăng Lv Huấn Luyện Lính Thiên Nhiên",
      "en": "Nature Soldier Level Bonus"
    },
    "isPercent": false
  },
  "1096": {
    "label": {
      "vi": "Số lượng kho bảo vệ",
      "en": "Warehouse Protected Resource Bonus"
    },
    "isPercent": true
  },
  "1118": {
    "label": {
      "vi": "Giảm Tỷ Lệ Lính Tử Trận (Khi Tấn Công)",
      "en": "Siege Attack Fatality Reduction"
    },
    "isPercent": true
  },
  "1121": {
    "label": {
      "vi": "Giảm tiêu hao xây dựng thành phố",
      "en": "City Construction Cost Reduction"
    },
    "isPercent": true
  },
  "1122": {
    "label": {
      "vi": "Giảm tiêu hao trị liệu",
      "en": "Hospital Healing Cost Reduction"
    },
    "isPercent": true
  },
  "1123": {
    "label": {
      "vi": "Tăng sản lượng Mỏ Ruby",
      "en": "Ruby Mine Output Bonus"
    },
    "isPercent": true
  },
  "3018": {
    "label": {
      "vi": "Tăng ST của Anh Hùng Liên Minh",
      "en": "League Hero DMG Increase"
    },
    "isPercent": true
  },
  "3019": {
    "label": {
      "vi": "Giảm ST của Anh Hùng Liên Minh",
      "en": "League Hero DMG Reduction"
    },
    "isPercent": true
  },
  "3103": {
    "label": {
      "vi": "Tấn Công của Anh Hùng Liên Minh",
      "en": "League Hero ATK"
    },
    "isPercent": true
  },
  "3104": {
    "label": {
      "vi": "HP của Anh Hùng Liên Minh",
      "en": "League Hero HP"
    },
    "isPercent": true
  },
  "4018": {
    "label": {
      "vi": "Tăng ST của Anh Hùng Bộ Tộc",
      "en": "Horde Hero DMG Increase"
    },
    "isPercent": true
  },
  "4019": {
    "label": {
      "vi": "Giảm ST của Anh Hùng Bộ Tộc",
      "en": "Horde Hero DMG Reduction"
    },
    "isPercent": true
  },
  "4103": {
    "label": {
      "vi": "Tấn Công của Anh Hùng Bộ Tộc",
      "en": "Horde Hero ATK"
    },
    "isPercent": true
  },
  "4104": {
    "label": {
      "vi": "HP của Anh Hùng Bộ Tộc",
      "en": "Horde Hero HP"
    },
    "isPercent": true
  },
  "5018": {
    "label": {
      "vi": "Tăng ST của Anh Hùng Thiên Nhiên",
      "en": "Nature Hero DMG Increase"
    },
    "isPercent": true
  },
  "5019": {
    "label": {
      "vi": "Giảm ST của Anh Hùng Thiên Nhiên",
      "en": "Nature Hero DMG Reduction"
    },
    "isPercent": true
  },
  "5103": {
    "label": {
      "vi": "Tấn Công của Anh Hùng Thiên Nhiên",
      "en": "Nature Hero ATK"
    },
    "isPercent": true
  },
  "5104": {
    "label": {
      "vi": "HP của Anh Hùng Thiên Nhiên",
      "en": "Nature Hero HP"
    },
    "isPercent": true
  },
  "10103": {
    "label": {
      "vi": "Tấn Công của tất cả Lính",
      "en": "All Soldier ATK"
    },
    "isPercent": true
  },
  "10104": {
    "label": {
      "vi": "HP của tất cả Lính",
      "en": "All Soldier HP"
    },
    "isPercent": true
  },
  "10158": {
    "label": {
      "vi": "Tấn Công của tất cả Lính",
      "en": "All Soldier ATK (Global)"
    },
    "isPercent": true
  },
  "10159": {
    "label": {
      "vi": "HP của tất cả Lính",
      "en": "All Soldier HP (Global)"
    },
    "isPercent": true
  },
  "1100103": {
    "label": {
      "vi": "Tỷ lệ Tấn Công Mạo Hiểm",
      "en": "Adventure ATK Rate"
    },
    "isPercent": true
  },
  "1100104": {
    "label": {
      "vi": "Tỷ lệ HP Mạo Hiểm",
      "en": "Adventure HP Rate"
    },
    "isPercent": true
  },
  "1200113": {
    "label": {
      "vi": "Tăng Sát Thương Tập Kết",
      "en": "Rally DMG Increase"
    },
    "isPercent": true
  },
  "1200114": {
    "label": {
      "vi": "Giảm Sát Thương Tập Kết",
      "en": "Rally DMG Reduction"
    },
    "isPercent": true
  }
};

export const TECHNOLOGY_BRANCHES: readonly TechnologyBranchMeta[] = [
  {
    "id": 202,
    "tier": "basic",
    "order": 1,
    "name": {
      "vi": "Nghiên Cứu Chiến Đấu",
      "en": "Combat Research"
    },
    "description": {
      "vi": "Tăng chỉ số chiến đấu nền tảng và tốc độ hành quân mạo hiểm.",
      "en": "Fundamental combat attributes and adventure march speed."
    },
    "icon": "/images/tech/research/technology_icon_type_14.webp",
    "nodeCount": 28,
    "maxTotalLevels": 64
  },
  {
    "id": 216,
    "tier": "basic",
    "order": 2,
    "name": {
      "vi": "Kinh Tế",
      "en": "Economy"
    },
    "description": {
      "vi": "Tăng sản lượng và tốc độ thu thập Gỗ, Đá, Ruby cùng bảo vệ kho.",
      "en": "Boost Timber, Stone, and Ruby production, gathering speed, and warehouse protection."
    },
    "icon": "/images/tech/research/technology_icon_type_1.webp",
    "nodeCount": 29,
    "maxTotalLevels": 129
  },
  {
    "id": 213,
    "tier": "basic",
    "order": 3,
    "name": {
      "vi": "Phát Triển",
      "en": "Growth"
    },
    "description": {
      "vi": "Rút ngắn thời gian xây dựng, nghiên cứu khoa kỹ, huấn luyện và trị liệu.",
      "en": "Accelerate construction, technology research, troop training, and hospital healing."
    },
    "icon": "/images/tech/research/technology_icon_type_2.webp",
    "nodeCount": 30,
    "maxTotalLevels": 146
  },
  {
    "id": 217,
    "tier": "basic",
    "order": 4,
    "name": {
      "vi": "Tăng Cường Đội",
      "en": "Queue Boost"
    },
    "description": {
      "vi": "Mở rộng giới hạn xuất chinh, tải trọng quân đoàn và HP/ATK toàn đội.",
      "en": "Expand march capacity, troop load, and overall queue ATK/HP."
    },
    "icon": "/images/tech/research/technology_icon_type_4.webp",
    "nodeCount": 21,
    "maxTotalLevels": 101
  },
  {
    "id": 11,
    "tier": "advanced",
    "order": 5,
    "name": {
      "vi": "Biểu Dương Quân Bị",
      "en": "Arms Race Commendation"
    },
    "description": {
      "vi": "Nhân đôi điểm sự kiện Chạy Đua Vũ Trang Hội (GAR) và mở khóa rương mốc.",
      "en": "Amplify Guild Arms Race (GAR) event points and unlock milestone reward chests."
    },
    "icon": "/images/tech/research/technology_icon_type_11.webp",
    "nodeCount": 16,
    "maxTotalLevels": 124
  },
  {
    "id": 12,
    "tier": "advanced",
    "order": 6,
    "name": {
      "vi": "Cuộc Chiến Quân Bị",
      "en": "Arms Race Preparation"
    },
    "description": {
      "vi": "Cường hóa sức mạnh công thành, tập kết và giảm tỷ lệ tử trận trong KvK/GAR.",
      "en": "Strengthen siege attack, rally power, and reduce battle fatalities in KvK/GAR."
    },
    "icon": "/images/tech/research/technology_icon_type_12.webp",
    "nodeCount": 18,
    "maxTotalLevels": 138
  },
  {
    "id": 215,
    "tier": "advanced",
    "order": 7,
    "name": {
      "vi": "Lính",
      "en": "Soldiers"
    },
    "description": {
      "vi": "Tăng cấp bậc lính Liên Minh, Bộ Tộc, Thiên Nhiên (+1 Lv) và chỉ số toàn quân.",
      "en": "Upgrade League, Horde, and Nature soldier tiers (+1 Lv) and global troop stats."
    },
    "icon": "/images/tech/research/technology_icon_type_15.webp",
    "nodeCount": 20,
    "maxTotalLevels": 100
  },
  {
    "id": 214,
    "tier": "advanced",
    "order": 8,
    "name": {
      "vi": "Anh Hùng",
      "en": "Heroes"
    },
    "description": {
      "vi": "Gia tăng ATK, HP và Tăng/Giảm Sát Thương chuyên sâu cho Anh Hùng 3 phe.",
      "en": "Boost ATK, HP, and specialized DMG Increase/Reduction for all 3 Hero Factions."
    },
    "icon": "/images/tech/research/technology_icon_type_3.webp",
    "nodeCount": 28,
    "maxTotalLevels": 140
  }
];

export const TECHNOLOGY_NODES: readonly TechnologyNodeMeta[] = [
  {
    "id": 202001,
    "branchId": 202,
    "row": 1,
    "col": 2,
    "maxLevel": 1,
    "icon": "/images/tech/research/tech_501.webp",
    "name": {
      "vi": "Chuyên Hóa Tấn Công I",
      "en": "Attack Specialization I"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 1,
        "timeSec": 300,
        "fightforce": 300,
        "timber": 250,
        "stone": 250,
        "ruby": 500,
        "prerequisites": [],
        "attr1Id": 1100103,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 202002,
    "branchId": 202,
    "row": 2,
    "col": 2,
    "maxLevel": 1,
    "icon": "/images/tech/research/tech_502.webp",
    "name": {
      "vi": "Cường Hóa Sinh Mệnh I",
      "en": "Enhanced Vitality I"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 1,
        "timeSec": 300,
        "fightforce": 300,
        "timber": 400,
        "stone": 400,
        "ruby": 800,
        "prerequisites": [],
        "attr1Id": 1100104,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 202021,
    "branchId": 202,
    "row": 2,
    "col": 3,
    "maxLevel": 3,
    "icon": "/images/tech/research/tech_2013.webp",
    "name": {
      "vi": "Thời Gian Miễn Phí",
      "en": "Free Build Time"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 5,
        "timeSec": 300,
        "fightforce": 300,
        "timber": 900,
        "stone": 900,
        "ruby": 1800,
        "prerequisites": [],
        "attr1Id": 1015,
        "attr1Delta": 60,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 5,
        "timeSec": 300,
        "fightforce": 600,
        "timber": 900,
        "stone": 900,
        "ruby": 1800,
        "prerequisites": [],
        "attr1Id": 1015,
        "attr1Delta": 60,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 5,
        "timeSec": 300,
        "fightforce": 900,
        "timber": 900,
        "stone": 900,
        "ruby": 1800,
        "prerequisites": [],
        "attr1Id": 1015,
        "attr1Delta": 60,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 202003,
    "branchId": 202,
    "row": 3,
    "col": 2,
    "maxLevel": 1,
    "icon": "/images/tech/research/tech_705.webp",
    "name": {
      "vi": "Cường Hóa Tăng ST I",
      "en": "Enhanced DMG Boost I"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 1,
        "timeSec": 300,
        "fightforce": 300,
        "timber": 600,
        "stone": 600,
        "ruby": 1200,
        "prerequisites": [],
        "attr1Id": 68,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 202005,
    "branchId": 202,
    "row": 4,
    "col": 1,
    "maxLevel": 1,
    "icon": "/images/tech/research/tech_2001.webp",
    "name": {
      "vi": "Sức Mạnh Anh Hùng",
      "en": "Hero Might"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 3,
        "timeSec": 300,
        "fightforce": 500,
        "timber": 1400,
        "stone": 1400,
        "ruby": 2700,
        "prerequisites": [],
        "attr1Id": 103,
        "attr1Delta": 5,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 202004,
    "branchId": 202,
    "row": 4,
    "col": 2,
    "maxLevel": 1,
    "icon": "/images/tech/research/tech_707.webp",
    "name": {
      "vi": "Cường Hóa Giảm ST I",
      "en": "Enhanced DMG Reduction I"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 1,
        "timeSec": 300,
        "fightforce": 300,
        "timber": 900,
        "stone": 900,
        "ruby": 1800,
        "prerequisites": [],
        "attr1Id": 69,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 202025,
    "branchId": 202,
    "row": 4,
    "col": 3,
    "maxLevel": 1,
    "icon": "/images/tech/research/tech_1109.webp",
    "name": {
      "vi": "Mở Rộng Trại Lính I",
      "en": "Barracks Expansion I"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 3,
        "timeSec": 300,
        "fightforce": 500,
        "timber": 1400,
        "stone": 1400,
        "ruby": 2700,
        "prerequisites": [],
        "attr1Id": 1017,
        "attr1Delta": 5,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 202006,
    "branchId": 202,
    "row": 5,
    "col": 2,
    "maxLevel": 2,
    "icon": "/images/tech/research/tech_501.webp",
    "name": {
      "vi": "Chuyên Hóa Tấn Công II",
      "en": "Attack Specialization II"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 5,
        "timeSec": 1200,
        "fightforce": 600,
        "timber": 2100,
        "stone": 2100,
        "ruby": 4100,
        "prerequisites": [],
        "attr1Id": 1100103,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 5,
        "timeSec": 1200,
        "fightforce": 700,
        "timber": 2100,
        "stone": 2100,
        "ruby": 4100,
        "prerequisites": [],
        "attr1Id": 1100103,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 202022,
    "branchId": 202,
    "row": 6,
    "col": 1,
    "maxLevel": 3,
    "icon": "/images/tech/research/tech_205.webp",
    "name": {
      "vi": "Số lần được trợ giúp",
      "en": "Guild Help Count"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 8,
        "timeSec": 1200,
        "fightforce": 600,
        "timber": 3200,
        "stone": 3200,
        "ruby": 6200,
        "prerequisites": [],
        "attr1Id": 1070,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 8,
        "timeSec": 1200,
        "fightforce": 800,
        "timber": 3200,
        "stone": 3200,
        "ruby": 6200,
        "prerequisites": [],
        "attr1Id": 1070,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 8,
        "timeSec": 1200,
        "fightforce": 1000,
        "timber": 3200,
        "stone": 3200,
        "ruby": 6200,
        "prerequisites": [],
        "attr1Id": 1070,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 202007,
    "branchId": 202,
    "row": 6,
    "col": 2,
    "maxLevel": 2,
    "icon": "/images/tech/research/tech_502.webp",
    "name": {
      "vi": "Cường Hóa Sinh Mệnh II",
      "en": "Enhanced Vitality II"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 5,
        "timeSec": 1200,
        "fightforce": 600,
        "timber": 3200,
        "stone": 3200,
        "ruby": 6200,
        "prerequisites": [],
        "attr1Id": 1100104,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 5,
        "timeSec": 1200,
        "fightforce": 700,
        "timber": 3200,
        "stone": 3200,
        "ruby": 6200,
        "prerequisites": [],
        "attr1Id": 1100104,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 202008,
    "branchId": 202,
    "row": 7,
    "col": 2,
    "maxLevel": 2,
    "icon": "/images/tech/research/tech_705.webp",
    "name": {
      "vi": "Cường Hóa Tăng ST II",
      "en": "Enhanced DMG Boost II"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 5,
        "timeSec": 1200,
        "fightforce": 600,
        "timber": 4800,
        "stone": 4800,
        "ruby": 9300,
        "prerequisites": [],
        "attr1Id": 68,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 5,
        "timeSec": 1200,
        "fightforce": 700,
        "timber": 4800,
        "stone": 4800,
        "ruby": 9300,
        "prerequisites": [],
        "attr1Id": 68,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 202026,
    "branchId": 202,
    "row": 8,
    "col": 1,
    "maxLevel": 1,
    "icon": "/images/tech/research/tech_1109.webp",
    "name": {
      "vi": "Mở Rộng Trại Lính II",
      "en": "Barracks Expansion II"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 5,
        "timeSec": 1200,
        "fightforce": 900,
        "timber": 10800,
        "stone": 10800,
        "ruby": 21000,
        "prerequisites": [],
        "attr1Id": 1017,
        "attr1Delta": 5,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 202009,
    "branchId": 202,
    "row": 8,
    "col": 2,
    "maxLevel": 2,
    "icon": "/images/tech/research/tech_707.webp",
    "name": {
      "vi": "Phòng Thủ Giảm ST II",
      "en": "Defensive DMG Reduction II"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 5,
        "timeSec": 1200,
        "fightforce": 600,
        "timber": 7200,
        "stone": 7200,
        "ruby": 14000,
        "prerequisites": [],
        "attr1Id": 69,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 5,
        "timeSec": 1200,
        "fightforce": 700,
        "timber": 7200,
        "stone": 7200,
        "ruby": 14000,
        "prerequisites": [],
        "attr1Id": 69,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 202010,
    "branchId": 202,
    "row": 8,
    "col": 3,
    "maxLevel": 1,
    "icon": "/images/tech/research/tech_2002.webp",
    "name": {
      "vi": "Hồn Anh Hùng",
      "en": "Hero Soul"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 7,
        "timeSec": 1200,
        "fightforce": 900,
        "timber": 10800,
        "stone": 10800,
        "ruby": 21000,
        "prerequisites": [],
        "attr1Id": 104,
        "attr1Delta": 5,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 202011,
    "branchId": 202,
    "row": 9,
    "col": 2,
    "maxLevel": 3,
    "icon": "/images/tech/research/tech_501.webp",
    "name": {
      "vi": "Chuyên Hóa Tấn Công III",
      "en": "Attack Specialization III"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 8,
        "timeSec": 2400,
        "fightforce": 1000,
        "timber": 16200,
        "stone": 16200,
        "ruby": 31500,
        "prerequisites": [],
        "attr1Id": 1100103,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 8,
        "timeSec": 2400,
        "fightforce": 1200,
        "timber": 16200,
        "stone": 16200,
        "ruby": 31500,
        "prerequisites": [],
        "attr1Id": 1100103,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 8,
        "timeSec": 2400,
        "fightforce": 1400,
        "timber": 16200,
        "stone": 16200,
        "ruby": 31500,
        "prerequisites": [],
        "attr1Id": 1100103,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 202012,
    "branchId": 202,
    "row": 10,
    "col": 2,
    "maxLevel": 3,
    "icon": "/images/tech/research/tech_502.webp",
    "name": {
      "vi": "Cường Hóa HP III",
      "en": "Enhanced HP III"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 8,
        "timeSec": 2400,
        "fightforce": 1000,
        "timber": 24300,
        "stone": 24300,
        "ruby": 47300,
        "prerequisites": [],
        "attr1Id": 1100104,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 8,
        "timeSec": 2400,
        "fightforce": 1200,
        "timber": 24300,
        "stone": 24300,
        "ruby": 47300,
        "prerequisites": [],
        "attr1Id": 1100104,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 8,
        "timeSec": 2400,
        "fightforce": 1400,
        "timber": 24300,
        "stone": 24300,
        "ruby": 47300,
        "prerequisites": [],
        "attr1Id": 1100104,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 202023,
    "branchId": 202,
    "row": 10,
    "col": 3,
    "maxLevel": 3,
    "icon": "/images/tech/research/tech_101.webp",
    "name": {
      "vi": "Tốc độ Xây I",
      "en": "Construction Speed I"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 10,
        "timeSec": 2400,
        "fightforce": 1000,
        "timber": 16200,
        "stone": 16200,
        "ruby": 31500,
        "prerequisites": [],
        "attr1Id": 1034,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 10,
        "timeSec": 2400,
        "fightforce": 1200,
        "timber": 16200,
        "stone": 16200,
        "ruby": 31500,
        "prerequisites": [],
        "attr1Id": 1034,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 10,
        "timeSec": 2400,
        "fightforce": 1400,
        "timber": 16200,
        "stone": 16200,
        "ruby": 31500,
        "prerequisites": [],
        "attr1Id": 1034,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 202013,
    "branchId": 202,
    "row": 11,
    "col": 2,
    "maxLevel": 3,
    "icon": "/images/tech/research/tech_705.webp",
    "name": {
      "vi": "Cường Hóa Tăng ST III",
      "en": "Enhanced DMG Boost III"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 8,
        "timeSec": 2400,
        "fightforce": 1000,
        "timber": 36500,
        "stone": 36500,
        "ruby": 71000,
        "prerequisites": [],
        "attr1Id": 68,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 8,
        "timeSec": 2400,
        "fightforce": 1200,
        "timber": 36500,
        "stone": 36500,
        "ruby": 71000,
        "prerequisites": [],
        "attr1Id": 68,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 8,
        "timeSec": 2400,
        "fightforce": 1400,
        "timber": 36500,
        "stone": 36500,
        "ruby": 71000,
        "prerequisites": [],
        "attr1Id": 68,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 202015,
    "branchId": 202,
    "row": 12,
    "col": 1,
    "maxLevel": 1,
    "icon": "/images/tech/research/tech_203.webp",
    "name": {
      "vi": "Sức Mạnh Lính",
      "en": "Troop Might"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 10,
        "timeSec": 4800,
        "fightforce": 1300,
        "timber": 65800,
        "stone": 65800,
        "ruby": 127800,
        "prerequisites": [],
        "attr1Id": 10103,
        "attr1Delta": 5,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 202014,
    "branchId": 202,
    "row": 12,
    "col": 2,
    "maxLevel": 3,
    "icon": "/images/tech/research/tech_707.webp",
    "name": {
      "vi": "Phòng Thủ Giảm ST III",
      "en": "Defensive DMG Reduction III"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 8,
        "timeSec": 2400,
        "fightforce": 1000,
        "timber": 54800,
        "stone": 54800,
        "ruby": 106500,
        "prerequisites": [],
        "attr1Id": 69,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 8,
        "timeSec": 2400,
        "fightforce": 1200,
        "timber": 54800,
        "stone": 54800,
        "ruby": 106500,
        "prerequisites": [],
        "attr1Id": 69,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 8,
        "timeSec": 2400,
        "fightforce": 1400,
        "timber": 54800,
        "stone": 54800,
        "ruby": 106500,
        "prerequisites": [],
        "attr1Id": 69,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 202027,
    "branchId": 202,
    "row": 12,
    "col": 3,
    "maxLevel": 1,
    "icon": "/images/tech/research/tech_1109.webp",
    "name": {
      "vi": "Mở Rộng Trại Lính III",
      "en": "Barracks Expansion III"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 10,
        "timeSec": 4800,
        "fightforce": 1300,
        "timber": 65800,
        "stone": 65800,
        "ruby": 127800,
        "prerequisites": [],
        "attr1Id": 1017,
        "attr1Delta": 5,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 202016,
    "branchId": 202,
    "row": 13,
    "col": 2,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_501.webp",
    "name": {
      "vi": "Chuyên Hóa Tấn Công IV",
      "en": "Attack Specialization IV"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 12,
        "timeSec": 4800,
        "fightforce": 1500,
        "timber": 79000,
        "stone": 79000,
        "ruby": 153400,
        "prerequisites": [],
        "attr1Id": 1100103,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 12,
        "timeSec": 4800,
        "fightforce": 1650,
        "timber": 79000,
        "stone": 79000,
        "ruby": 153400,
        "prerequisites": [],
        "attr1Id": 1100103,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 12,
        "timeSec": 4800,
        "fightforce": 1800,
        "timber": 79000,
        "stone": 79000,
        "ruby": 153400,
        "prerequisites": [],
        "attr1Id": 1100103,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 12,
        "timeSec": 4800,
        "fightforce": 1950,
        "timber": 79000,
        "stone": 79000,
        "ruby": 153400,
        "prerequisites": [],
        "attr1Id": 1100103,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 12,
        "timeSec": 4800,
        "fightforce": 2200,
        "timber": 79000,
        "stone": 79000,
        "ruby": 153400,
        "prerequisites": [],
        "attr1Id": 1100103,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 202024,
    "branchId": 202,
    "row": 14,
    "col": 1,
    "maxLevel": 3,
    "icon": "/images/tech/research/tech_2013.webp",
    "name": {
      "vi": "Thời gian miễn phí Công Nghệ",
      "en": "Free Tech Research Time"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 12,
        "timeSec": 4800,
        "fightforce": 1500,
        "timber": 94800,
        "stone": 94800,
        "ruby": 184100,
        "prerequisites": [],
        "attr1Id": 1060,
        "attr1Delta": 60,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 12,
        "timeSec": 4800,
        "fightforce": 1900,
        "timber": 94800,
        "stone": 94800,
        "ruby": 184100,
        "prerequisites": [],
        "attr1Id": 1060,
        "attr1Delta": 60,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 12,
        "timeSec": 4800,
        "fightforce": 2400,
        "timber": 94800,
        "stone": 94800,
        "ruby": 184100,
        "prerequisites": [],
        "attr1Id": 1060,
        "attr1Delta": 60,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 202017,
    "branchId": 202,
    "row": 14,
    "col": 2,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_502.webp",
    "name": {
      "vi": "Cường Hóa Sinh Mệnh IV",
      "en": "Enhanced Vitality IV"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 12,
        "timeSec": 4800,
        "fightforce": 1500,
        "timber": 94800,
        "stone": 94800,
        "ruby": 184100,
        "prerequisites": [],
        "attr1Id": 1100104,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 12,
        "timeSec": 4800,
        "fightforce": 1650,
        "timber": 94800,
        "stone": 94800,
        "ruby": 184100,
        "prerequisites": [],
        "attr1Id": 1100104,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 12,
        "timeSec": 4800,
        "fightforce": 1800,
        "timber": 94800,
        "stone": 94800,
        "ruby": 184100,
        "prerequisites": [],
        "attr1Id": 1100104,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 12,
        "timeSec": 4800,
        "fightforce": 1950,
        "timber": 94800,
        "stone": 94800,
        "ruby": 184100,
        "prerequisites": [],
        "attr1Id": 1100104,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 12,
        "timeSec": 4800,
        "fightforce": 2200,
        "timber": 94800,
        "stone": 94800,
        "ruby": 184100,
        "prerequisites": [],
        "attr1Id": 1100104,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 202018,
    "branchId": 202,
    "row": 15,
    "col": 2,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_705.webp",
    "name": {
      "vi": "Cường Hóa Tăng ST IV",
      "en": "Enhanced DMG Boost IV"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 12,
        "timeSec": 4800,
        "fightforce": 1500,
        "timber": 113800,
        "stone": 113800,
        "ruby": 220900,
        "prerequisites": [],
        "attr1Id": 68,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 12,
        "timeSec": 4800,
        "fightforce": 1650,
        "timber": 113800,
        "stone": 113800,
        "ruby": 220900,
        "prerequisites": [],
        "attr1Id": 68,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 12,
        "timeSec": 4800,
        "fightforce": 1800,
        "timber": 113800,
        "stone": 113800,
        "ruby": 220900,
        "prerequisites": [],
        "attr1Id": 68,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 12,
        "timeSec": 4800,
        "fightforce": 1950,
        "timber": 113800,
        "stone": 113800,
        "ruby": 220900,
        "prerequisites": [],
        "attr1Id": 68,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 12,
        "timeSec": 4800,
        "fightforce": 2200,
        "timber": 113800,
        "stone": 113800,
        "ruby": 220900,
        "prerequisites": [],
        "attr1Id": 68,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 202028,
    "branchId": 202,
    "row": 16,
    "col": 1,
    "maxLevel": 1,
    "icon": "/images/tech/research/tech_1109.webp",
    "name": {
      "vi": "Mở Rộng Trại Lính IV",
      "en": "Barracks Expansion IV"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 13,
        "timeSec": 6000,
        "fightforce": 2400,
        "timber": 163900,
        "stone": 163900,
        "ruby": 318100,
        "prerequisites": [],
        "attr1Id": 1017,
        "attr1Delta": 5,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 202019,
    "branchId": 202,
    "row": 16,
    "col": 2,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_707.webp",
    "name": {
      "vi": "Phòng Thủ Giảm ST IV",
      "en": "Defensive DMG Reduction IV"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 12,
        "timeSec": 4800,
        "fightforce": 1500,
        "timber": 136600,
        "stone": 136600,
        "ruby": 265100,
        "prerequisites": [],
        "attr1Id": 69,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 12,
        "timeSec": 4800,
        "fightforce": 1650,
        "timber": 136600,
        "stone": 136600,
        "ruby": 265100,
        "prerequisites": [],
        "attr1Id": 69,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 12,
        "timeSec": 4800,
        "fightforce": 1800,
        "timber": 136600,
        "stone": 136600,
        "ruby": 265100,
        "prerequisites": [],
        "attr1Id": 69,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 12,
        "timeSec": 4800,
        "fightforce": 1950,
        "timber": 136600,
        "stone": 136600,
        "ruby": 265100,
        "prerequisites": [],
        "attr1Id": 69,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 12,
        "timeSec": 4800,
        "fightforce": 2200,
        "timber": 136600,
        "stone": 136600,
        "ruby": 265100,
        "prerequisites": [],
        "attr1Id": 69,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 202020,
    "branchId": 202,
    "row": 16,
    "col": 3,
    "maxLevel": 1,
    "icon": "/images/tech/research/tech_204.webp",
    "name": {
      "vi": "Hồn Lính",
      "en": "Troop Soul"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 15,
        "timeSec": 6000,
        "fightforce": 2400,
        "timber": 163900,
        "stone": 163900,
        "ruby": 318100,
        "prerequisites": [],
        "attr1Id": 10104,
        "attr1Delta": 5,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 216001,
    "branchId": 216,
    "row": 1,
    "col": 1,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_2019.webp",
    "name": {
      "vi": "Sản Lượng Gỗ",
      "en": "Timber Output"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 1,
        "timeSec": 300,
        "fightforce": 100,
        "timber": 250,
        "stone": 250,
        "ruby": 500,
        "prerequisites": [],
        "attr1Id": 1012,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 1,
        "timeSec": 360,
        "fightforce": 200,
        "timber": 400,
        "stone": 400,
        "ruby": 766,
        "prerequisites": [],
        "attr1Id": 1012,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 1,
        "timeSec": 480,
        "fightforce": 300,
        "timber": 550,
        "stone": 550,
        "ruby": 1133,
        "prerequisites": [],
        "attr1Id": 1012,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 1,
        "timeSec": 600,
        "fightforce": 500,
        "timber": 850,
        "stone": 850,
        "ruby": 1700,
        "prerequisites": [],
        "attr1Id": 1012,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 1,
        "timeSec": 780,
        "fightforce": 700,
        "timber": 1250,
        "stone": 1250,
        "ruby": 2533,
        "prerequisites": [],
        "attr1Id": 1012,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 216002,
    "branchId": 216,
    "row": 1,
    "col": 2,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_2020.webp",
    "name": {
      "vi": "Sản lượng Đá",
      "en": "Stone Output"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 2,
        "timeSec": 480,
        "fightforce": 100,
        "timber": 550,
        "stone": 550,
        "ruby": 1133,
        "prerequisites": [],
        "attr1Id": 1014,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 2,
        "timeSec": 600,
        "fightforce": 300,
        "timber": 850,
        "stone": 850,
        "ruby": 1700,
        "prerequisites": [],
        "attr1Id": 1014,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 2,
        "timeSec": 780,
        "fightforce": 500,
        "timber": 1250,
        "stone": 1250,
        "ruby": 2533,
        "prerequisites": [],
        "attr1Id": 1014,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 2,
        "timeSec": 960,
        "fightforce": 700,
        "timber": 2550,
        "stone": 2550,
        "ruby": 5066,
        "prerequisites": [],
        "attr1Id": 1014,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 2,
        "timeSec": 1260,
        "fightforce": 1100,
        "timber": 7600,
        "stone": 7600,
        "ruby": 15200,
        "prerequisites": [],
        "attr1Id": 1014,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 216003,
    "branchId": 216,
    "row": 1,
    "col": 3,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_2021.webp",
    "name": {
      "vi": "Sản lượng Ruby",
      "en": "Ruby Output"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 3,
        "timeSec": 480,
        "fightforce": 100,
        "timber": 550,
        "stone": 550,
        "ruby": 1133,
        "prerequisites": [],
        "attr1Id": 1123,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 3,
        "timeSec": 600,
        "fightforce": 300,
        "timber": 850,
        "stone": 850,
        "ruby": 1700,
        "prerequisites": [],
        "attr1Id": 1123,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 3,
        "timeSec": 780,
        "fightforce": 500,
        "timber": 1250,
        "stone": 1250,
        "ruby": 2533,
        "prerequisites": [],
        "attr1Id": 1123,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 3,
        "timeSec": 960,
        "fightforce": 700,
        "timber": 2550,
        "stone": 2550,
        "ruby": 5066,
        "prerequisites": [],
        "attr1Id": 1123,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 3,
        "timeSec": 1260,
        "fightforce": 1100,
        "timber": 7600,
        "stone": 7600,
        "ruby": 15200,
        "prerequisites": [],
        "attr1Id": 1123,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 216004,
    "branchId": 216,
    "row": 2,
    "col": 1,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_302.webp",
    "name": {
      "vi": "Thu Thập Gỗ",
      "en": "Timber Gathering"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 4,
        "timeSec": 780,
        "fightforce": 200,
        "timber": 1250,
        "stone": 1250,
        "ruby": 2533,
        "prerequisites": [
          {
            "nodeId": 216001,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1004,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 4,
        "timeSec": 960,
        "fightforce": 400,
        "timber": 2550,
        "stone": 2550,
        "ruby": 5066,
        "prerequisites": [],
        "attr1Id": 1004,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 4,
        "timeSec": 1260,
        "fightforce": 800,
        "timber": 7600,
        "stone": 7600,
        "ruby": 15200,
        "prerequisites": [
          {
            "nodeId": 216001,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 1004,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 4,
        "timeSec": 1620,
        "fightforce": 1300,
        "timber": 15200,
        "stone": 15200,
        "ruby": 30366,
        "prerequisites": [],
        "attr1Id": 1004,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 4,
        "timeSec": 2100,
        "fightforce": 1900,
        "timber": 24300,
        "stone": 24300,
        "ruby": 48600,
        "prerequisites": [],
        "attr1Id": 1004,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 216005,
    "branchId": 216,
    "row": 2,
    "col": 2,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_303.webp",
    "name": {
      "vi": "Thu Thập Đá",
      "en": "Stone Gathering"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 5,
        "timeSec": 780,
        "fightforce": 200,
        "timber": 1250,
        "stone": 1250,
        "ruby": 2533,
        "prerequisites": [
          {
            "nodeId": 216002,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1005,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 5,
        "timeSec": 960,
        "fightforce": 400,
        "timber": 2550,
        "stone": 2550,
        "ruby": 5066,
        "prerequisites": [],
        "attr1Id": 1005,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 5,
        "timeSec": 1260,
        "fightforce": 800,
        "timber": 7600,
        "stone": 7600,
        "ruby": 15200,
        "prerequisites": [
          {
            "nodeId": 216002,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 1005,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 5,
        "timeSec": 1620,
        "fightforce": 1300,
        "timber": 15200,
        "stone": 15200,
        "ruby": 30366,
        "prerequisites": [],
        "attr1Id": 1005,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 5,
        "timeSec": 2100,
        "fightforce": 1900,
        "timber": 24300,
        "stone": 24300,
        "ruby": 48600,
        "prerequisites": [],
        "attr1Id": 1005,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 216006,
    "branchId": 216,
    "row": 2,
    "col": 3,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_301.webp",
    "name": {
      "vi": "Thu Thập Ruby",
      "en": "Ruby Gathering"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 6,
        "timeSec": 780,
        "fightforce": 200,
        "timber": 1250,
        "stone": 1250,
        "ruby": 2533,
        "prerequisites": [
          {
            "nodeId": 216003,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1006,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 6,
        "timeSec": 960,
        "fightforce": 400,
        "timber": 2550,
        "stone": 2550,
        "ruby": 5066,
        "prerequisites": [],
        "attr1Id": 1006,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 6,
        "timeSec": 1260,
        "fightforce": 800,
        "timber": 7600,
        "stone": 7600,
        "ruby": 15200,
        "prerequisites": [
          {
            "nodeId": 216003,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 1006,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 6,
        "timeSec": 1620,
        "fightforce": 1300,
        "timber": 15200,
        "stone": 15200,
        "ruby": 30366,
        "prerequisites": [],
        "attr1Id": 1006,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 6,
        "timeSec": 2100,
        "fightforce": 1900,
        "timber": 24300,
        "stone": 24300,
        "ruby": 48600,
        "prerequisites": [],
        "attr1Id": 1006,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 216007,
    "branchId": 216,
    "row": 3,
    "col": 2,
    "maxLevel": 1,
    "icon": "/images/tech/research/tech_1411.webp",
    "name": {
      "vi": "Sản Lượng Tài Nguyên I",
      "en": "Resource Output I"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 7,
        "timeSec": 1620,
        "fightforce": 1300,
        "timber": 15200,
        "stone": 15200,
        "ruby": 30366,
        "prerequisites": [
          {
            "nodeId": 216004,
            "requiredLevel": 1
          },
          {
            "nodeId": 216005,
            "requiredLevel": 1
          },
          {
            "nodeId": 216006,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1072,
        "attr1Delta": 5,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 216008,
    "branchId": 216,
    "row": 4,
    "col": 1,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_2019.webp",
    "name": {
      "vi": "Sản Lượng Gỗ",
      "en": "Timber Output"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 7,
        "timeSec": 1620,
        "fightforce": 500,
        "timber": 15200,
        "stone": 15200,
        "ruby": 30366,
        "prerequisites": [
          {
            "nodeId": 216007,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1012,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 7,
        "timeSec": 2100,
        "fightforce": 1100,
        "timber": 24300,
        "stone": 24300,
        "ruby": 48600,
        "prerequisites": [],
        "attr1Id": 1012,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 7,
        "timeSec": 2760,
        "fightforce": 1900,
        "timber": 38900,
        "stone": 38900,
        "ruby": 77766,
        "prerequisites": [],
        "attr1Id": 1012,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 7,
        "timeSec": 4080,
        "fightforce": 2800,
        "timber": 46650,
        "stone": 46650,
        "ruby": 93300,
        "prerequisites": [],
        "attr1Id": 1012,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 8,
        "timeSec": 6120,
        "fightforce": 4100,
        "timber": 116650,
        "stone": 116650,
        "ruby": 233266,
        "prerequisites": [],
        "attr1Id": 1012,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 216009,
    "branchId": 216,
    "row": 4,
    "col": 2,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_2020.webp",
    "name": {
      "vi": "Sản lượng Đá",
      "en": "Stone Output"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 8,
        "timeSec": 2760,
        "fightforce": 800,
        "timber": 38900,
        "stone": 38900,
        "ruby": 77766,
        "prerequisites": [
          {
            "nodeId": 216007,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1014,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 8,
        "timeSec": 4080,
        "fightforce": 1700,
        "timber": 46650,
        "stone": 46650,
        "ruby": 93300,
        "prerequisites": [],
        "attr1Id": 1014,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 8,
        "timeSec": 6120,
        "fightforce": 3000,
        "timber": 116650,
        "stone": 116650,
        "ruby": 233266,
        "prerequisites": [],
        "attr1Id": 1014,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 8,
        "timeSec": 9180,
        "fightforce": 4700,
        "timber": 198300,
        "stone": 198300,
        "ruby": 396566,
        "prerequisites": [],
        "attr1Id": 1014,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 9,
        "timeSec": 17400,
        "fightforce": 6500,
        "timber": 218100,
        "stone": 218100,
        "ruby": 436233,
        "prerequisites": [],
        "attr1Id": 1014,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 216010,
    "branchId": 216,
    "row": 4,
    "col": 3,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_2021.webp",
    "name": {
      "vi": "Sản lượng Ruby",
      "en": "Ruby Output"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 9,
        "timeSec": 2760,
        "fightforce": 800,
        "timber": 38900,
        "stone": 38900,
        "ruby": 77766,
        "prerequisites": [
          {
            "nodeId": 216007,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1123,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 9,
        "timeSec": 4080,
        "fightforce": 1700,
        "timber": 46650,
        "stone": 46650,
        "ruby": 93300,
        "prerequisites": [],
        "attr1Id": 1123,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 9,
        "timeSec": 6120,
        "fightforce": 3000,
        "timber": 116650,
        "stone": 116650,
        "ruby": 233266,
        "prerequisites": [],
        "attr1Id": 1123,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 9,
        "timeSec": 9180,
        "fightforce": 4700,
        "timber": 198300,
        "stone": 198300,
        "ruby": 396566,
        "prerequisites": [],
        "attr1Id": 1123,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 10,
        "timeSec": 17400,
        "fightforce": 6500,
        "timber": 218100,
        "stone": 218100,
        "ruby": 436233,
        "prerequisites": [],
        "attr1Id": 1123,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 216011,
    "branchId": 216,
    "row": 5,
    "col": 1,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_302.webp",
    "name": {
      "vi": "Thu Thập Gỗ",
      "en": "Timber Gathering"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 10,
        "timeSec": 4080,
        "fightforce": 900,
        "timber": 46650,
        "stone": 46650,
        "ruby": 93300,
        "prerequisites": [
          {
            "nodeId": 216008,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1004,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 10,
        "timeSec": 6120,
        "fightforce": 2200,
        "timber": 116650,
        "stone": 116650,
        "ruby": 233266,
        "prerequisites": [],
        "attr1Id": 1004,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 10,
        "timeSec": 9180,
        "fightforce": 3900,
        "timber": 198300,
        "stone": 198300,
        "ruby": 396566,
        "prerequisites": [
          {
            "nodeId": 216008,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 1004,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 10,
        "timeSec": 17400,
        "fightforce": 5700,
        "timber": 218100,
        "stone": 218100,
        "ruby": 436233,
        "prerequisites": [],
        "attr1Id": 1004,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 11,
        "timeSec": 34800,
        "fightforce": 7800,
        "timber": 305350,
        "stone": 305350,
        "ruby": 610733,
        "prerequisites": [],
        "attr1Id": 1004,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 216012,
    "branchId": 216,
    "row": 5,
    "col": 2,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_303.webp",
    "name": {
      "vi": "Thu Thập Đá",
      "en": "Stone Gathering"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 11,
        "timeSec": 6120,
        "fightforce": 1300,
        "timber": 116650,
        "stone": 116650,
        "ruby": 233266,
        "prerequisites": [
          {
            "nodeId": 216009,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1005,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 11,
        "timeSec": 9180,
        "fightforce": 3000,
        "timber": 198300,
        "stone": 198300,
        "ruby": 396566,
        "prerequisites": [],
        "attr1Id": 1005,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 11,
        "timeSec": 17400,
        "fightforce": 4800,
        "timber": 218100,
        "stone": 218100,
        "ruby": 436233,
        "prerequisites": [
          {
            "nodeId": 216009,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 1005,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 11,
        "timeSec": 34800,
        "fightforce": 6900,
        "timber": 305350,
        "stone": 305350,
        "ruby": 610733,
        "prerequisites": [],
        "attr1Id": 1005,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 12,
        "timeSec": 66060,
        "fightforce": 9400,
        "timber": 427500,
        "stone": 427500,
        "ruby": 855033,
        "prerequisites": [],
        "attr1Id": 1005,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 216013,
    "branchId": 216,
    "row": 5,
    "col": 3,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_301.webp",
    "name": {
      "vi": "Thu Thập Ruby",
      "en": "Ruby Gathering"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 12,
        "timeSec": 6120,
        "fightforce": 1300,
        "timber": 116650,
        "stone": 116650,
        "ruby": 233266,
        "prerequisites": [
          {
            "nodeId": 216010,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1006,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 12,
        "timeSec": 9180,
        "fightforce": 3000,
        "timber": 198300,
        "stone": 198300,
        "ruby": 396566,
        "prerequisites": [],
        "attr1Id": 1006,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 12,
        "timeSec": 17400,
        "fightforce": 4800,
        "timber": 218100,
        "stone": 218100,
        "ruby": 436233,
        "prerequisites": [
          {
            "nodeId": 216010,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 1006,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 12,
        "timeSec": 34800,
        "fightforce": 6900,
        "timber": 305350,
        "stone": 305350,
        "ruby": 610733,
        "prerequisites": [],
        "attr1Id": 1006,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 13,
        "timeSec": 66060,
        "fightforce": 9400,
        "timber": 427500,
        "stone": 427500,
        "ruby": 855033,
        "prerequisites": [],
        "attr1Id": 1006,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 216014,
    "branchId": 216,
    "row": 6,
    "col": 2,
    "maxLevel": 1,
    "icon": "/images/tech/research/tech_1411.webp",
    "name": {
      "vi": "Sản Lượng Tài Nguyên II",
      "en": "Resource Output II"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 13,
        "timeSec": 34800,
        "fightforce": 6900,
        "timber": 305350,
        "stone": 305350,
        "ruby": 610733,
        "prerequisites": [
          {
            "nodeId": 216011,
            "requiredLevel": 1
          },
          {
            "nodeId": 216012,
            "requiredLevel": 1
          },
          {
            "nodeId": 216013,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1072,
        "attr1Delta": 10,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 216015,
    "branchId": 216,
    "row": 7,
    "col": 1,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_2019.webp",
    "name": {
      "vi": "Sản Lượng Gỗ",
      "en": "Timber Output"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 13,
        "timeSec": 9180,
        "fightforce": 1700,
        "timber": 218100,
        "stone": 218100,
        "ruby": 261739,
        "prerequisites": [
          {
            "nodeId": 216014,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1012,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 13,
        "timeSec": 34800,
        "fightforce": 3800,
        "timber": 305350,
        "stone": 305350,
        "ruby": 366439,
        "prerequisites": [],
        "attr1Id": 1012,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 13,
        "timeSec": 118920,
        "fightforce": 7100,
        "timber": 427500,
        "stone": 427500,
        "ruby": 513019,
        "prerequisites": [],
        "attr1Id": 1012,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 14,
        "timeSec": 323400,
        "fightforce": 12100,
        "timber": 442500,
        "stone": 442500,
        "ruby": 580200,
        "prerequisites": [],
        "attr1Id": 1012,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 14,
        "timeSec": 679140,
        "fightforce": 19400,
        "timber": 461320,
        "stone": 461320,
        "ruby": 682200,
        "prerequisites": [],
        "attr1Id": 1012,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 216016,
    "branchId": 216,
    "row": 7,
    "col": 2,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_2020.webp",
    "name": {
      "vi": "Sản lượng Đá",
      "en": "Stone Output"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 14,
        "timeSec": 9180,
        "fightforce": 1700,
        "timber": 198300,
        "stone": 198300,
        "ruby": 237939,
        "prerequisites": [
          {
            "nodeId": 216014,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1014,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 14,
        "timeSec": 34800,
        "fightforce": 3800,
        "timber": 305350,
        "stone": 305350,
        "ruby": 366439,
        "prerequisites": [],
        "attr1Id": 1014,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 14,
        "timeSec": 118920,
        "fightforce": 7100,
        "timber": 760950,
        "stone": 760950,
        "ruby": 913159,
        "prerequisites": [],
        "attr1Id": 1014,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 15,
        "timeSec": 323400,
        "fightforce": 12100,
        "timber": 1731200,
        "stone": 1731200,
        "ruby": 2077440,
        "prerequisites": [],
        "attr1Id": 1014,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 15,
        "timeSec": 679140,
        "fightforce": 19400,
        "timber": 3739400,
        "stone": 3739400,
        "ruby": 4487259,
        "prerequisites": [],
        "attr1Id": 1014,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 216017,
    "branchId": 216,
    "row": 7,
    "col": 3,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_2021.webp",
    "name": {
      "vi": "Sản lượng Ruby",
      "en": "Ruby Output"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 15,
        "timeSec": 9180,
        "fightforce": 1700,
        "timber": 198300,
        "stone": 198300,
        "ruby": 237939,
        "prerequisites": [
          {
            "nodeId": 216014,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1123,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 15,
        "timeSec": 34800,
        "fightforce": 3800,
        "timber": 305350,
        "stone": 305350,
        "ruby": 366439,
        "prerequisites": [],
        "attr1Id": 1123,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 15,
        "timeSec": 118920,
        "fightforce": 7100,
        "timber": 760950,
        "stone": 760950,
        "ruby": 913159,
        "prerequisites": [],
        "attr1Id": 1123,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 16,
        "timeSec": 323400,
        "fightforce": 12100,
        "timber": 1731200,
        "stone": 1731200,
        "ruby": 2077440,
        "prerequisites": [],
        "attr1Id": 1123,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 16,
        "timeSec": 679140,
        "fightforce": 19400,
        "timber": 3739400,
        "stone": 3739400,
        "ruby": 4487259,
        "prerequisites": [],
        "attr1Id": 1123,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 216018,
    "branchId": 216,
    "row": 8,
    "col": 1,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_302.webp",
    "name": {
      "vi": "Thu Thập Gỗ",
      "en": "Timber Gathering"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 16,
        "timeSec": 17400,
        "fightforce": 1800,
        "timber": 198300,
        "stone": 198300,
        "ruby": 237939,
        "prerequisites": [
          {
            "nodeId": 216015,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1004,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 16,
        "timeSec": 66060,
        "fightforce": 4300,
        "timber": 305350,
        "stone": 305350,
        "ruby": 366439,
        "prerequisites": [],
        "attr1Id": 1004,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 16,
        "timeSec": 202140,
        "fightforce": 8100,
        "timber": 760950,
        "stone": 760950,
        "ruby": 913159,
        "prerequisites": [
          {
            "nodeId": 216015,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 1004,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 17,
        "timeSec": 485100,
        "fightforce": 13500,
        "timber": 1731200,
        "stone": 1731200,
        "ruby": 2077440,
        "prerequisites": [],
        "attr1Id": 1004,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 17,
        "timeSec": 950820,
        "fightforce": 22100,
        "timber": 3739400,
        "stone": 3739400,
        "ruby": 4487259,
        "prerequisites": [],
        "attr1Id": 1004,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 216019,
    "branchId": 216,
    "row": 8,
    "col": 2,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_303.webp",
    "name": {
      "vi": "Thu Thập Đá",
      "en": "Stone Gathering"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 17,
        "timeSec": 17400,
        "fightforce": 1800,
        "timber": 218100,
        "stone": 218100,
        "ruby": 261739,
        "prerequisites": [
          {
            "nodeId": 216016,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1005,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 17,
        "timeSec": 66060,
        "fightforce": 4300,
        "timber": 427500,
        "stone": 427500,
        "ruby": 513019,
        "prerequisites": [],
        "attr1Id": 1005,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 17,
        "timeSec": 202140,
        "fightforce": 8100,
        "timber": 989250,
        "stone": 989250,
        "ruby": 1187100,
        "prerequisites": [
          {
            "nodeId": 216016,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 1005,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 18,
        "timeSec": 485100,
        "fightforce": 13500,
        "timber": 2077450,
        "stone": 2077450,
        "ruby": 2492919,
        "prerequisites": [],
        "attr1Id": 1005,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 18,
        "timeSec": 950820,
        "fightforce": 22100,
        "timber": 5235150,
        "stone": 5235150,
        "ruby": 6282159,
        "prerequisites": [],
        "attr1Id": 1005,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 216020,
    "branchId": 216,
    "row": 8,
    "col": 3,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_301.webp",
    "name": {
      "vi": "Thu Thập Ruby",
      "en": "Ruby Gathering"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 18,
        "timeSec": 17400,
        "fightforce": 1800,
        "timber": 218100,
        "stone": 218100,
        "ruby": 261739,
        "prerequisites": [
          {
            "nodeId": 216017,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1006,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 18,
        "timeSec": 66060,
        "fightforce": 4300,
        "timber": 427500,
        "stone": 427500,
        "ruby": 513019,
        "prerequisites": [],
        "attr1Id": 1006,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 18,
        "timeSec": 202140,
        "fightforce": 8100,
        "timber": 989250,
        "stone": 989250,
        "ruby": 1187100,
        "prerequisites": [
          {
            "nodeId": 216017,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 1006,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 19,
        "timeSec": 485100,
        "fightforce": 13500,
        "timber": 2077450,
        "stone": 2077450,
        "ruby": 2492919,
        "prerequisites": [],
        "attr1Id": 1006,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 19,
        "timeSec": 950820,
        "fightforce": 22100,
        "timber": 5235150,
        "stone": 5235150,
        "ruby": 6282159,
        "prerequisites": [],
        "attr1Id": 1006,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 216021,
    "branchId": 216,
    "row": 9,
    "col": 2,
    "maxLevel": 1,
    "icon": "/images/tech/research/tech_1411.webp",
    "name": {
      "vi": "Sản Lượng Tài Nguyên III",
      "en": "Resource Output III"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 19,
        "timeSec": 485100,
        "fightforce": 13500,
        "timber": 2077450,
        "stone": 2077450,
        "ruby": 2492919,
        "prerequisites": [
          {
            "nodeId": 216018,
            "requiredLevel": 1
          },
          {
            "nodeId": 216019,
            "requiredLevel": 1
          },
          {
            "nodeId": 216020,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1072,
        "attr1Delta": 15,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 216022,
    "branchId": 216,
    "row": 10,
    "col": 1,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_2019.webp",
    "name": {
      "vi": "Sản Lượng Gỗ",
      "en": "Timber Output"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 19,
        "timeSec": 34800,
        "fightforce": 2100,
        "timber": 218100,
        "stone": 218100,
        "ruby": 261739,
        "prerequisites": [
          {
            "nodeId": 216021,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1012,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 19,
        "timeSec": 118920,
        "fightforce": 5400,
        "timber": 760950,
        "stone": 760950,
        "ruby": 913159,
        "prerequisites": [],
        "attr1Id": 1012,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 20,
        "timeSec": 323400,
        "fightforce": 10400,
        "timber": 2077450,
        "stone": 2077450,
        "ruby": 2492919,
        "prerequisites": [],
        "attr1Id": 1012,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 20,
        "timeSec": 679140,
        "fightforce": 17700,
        "timber": 5235150,
        "stone": 5235150,
        "ruby": 6282159,
        "prerequisites": [],
        "attr1Id": 1012,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 20,
        "timeSec": 1236060,
        "fightforce": 27500,
        "timber": 8507100,
        "stone": 8507100,
        "ruby": 10208520,
        "prerequisites": [],
        "attr1Id": 1012,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 216023,
    "branchId": 216,
    "row": 10,
    "col": 2,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_2020.webp",
    "name": {
      "vi": "Sản lượng Đá",
      "en": "Stone Output"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 20,
        "timeSec": 34800,
        "fightforce": 2100,
        "timber": 305350,
        "stone": 305350,
        "ruby": 366439,
        "prerequisites": [
          {
            "nodeId": 216021,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1014,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 20,
        "timeSec": 118920,
        "fightforce": 5400,
        "timber": 760950,
        "stone": 760950,
        "ruby": 913159,
        "prerequisites": [],
        "attr1Id": 1014,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 21,
        "timeSec": 323400,
        "fightforce": 10400,
        "timber": 1731200,
        "stone": 1731200,
        "ruby": 2077440,
        "prerequisites": [],
        "attr1Id": 1014,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 21,
        "timeSec": 679140,
        "fightforce": 17700,
        "timber": 3739400,
        "stone": 3739400,
        "ruby": 4487259,
        "prerequisites": [],
        "attr1Id": 1014,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 21,
        "timeSec": 1236060,
        "fightforce": 27500,
        "timber": 6805700,
        "stone": 6805700,
        "ruby": 8166819,
        "prerequisites": [],
        "attr1Id": 1014,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 216024,
    "branchId": 216,
    "row": 10,
    "col": 3,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_2021.webp",
    "name": {
      "vi": "Sản lượng Ruby",
      "en": "Ruby Output"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 21,
        "timeSec": 34800,
        "fightforce": 2100,
        "timber": 305350,
        "stone": 305350,
        "ruby": 366439,
        "prerequisites": [
          {
            "nodeId": 216021,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1123,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 21,
        "timeSec": 118920,
        "fightforce": 5400,
        "timber": 760950,
        "stone": 760950,
        "ruby": 913159,
        "prerequisites": [],
        "attr1Id": 1123,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 22,
        "timeSec": 323400,
        "fightforce": 10400,
        "timber": 1731200,
        "stone": 1731200,
        "ruby": 2077440,
        "prerequisites": [],
        "attr1Id": 1123,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 22,
        "timeSec": 679140,
        "fightforce": 17700,
        "timber": 3739400,
        "stone": 3739400,
        "ruby": 4487259,
        "prerequisites": [],
        "attr1Id": 1123,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 22,
        "timeSec": 1236060,
        "fightforce": 27500,
        "timber": 6805700,
        "stone": 6805700,
        "ruby": 8166819,
        "prerequisites": [],
        "attr1Id": 1123,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 216025,
    "branchId": 216,
    "row": 11,
    "col": 1,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_302.webp",
    "name": {
      "vi": "Thu Thập Gỗ",
      "en": "Timber Gathering"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 22,
        "timeSec": 66060,
        "fightforce": 2500,
        "timber": 305350,
        "stone": 305350,
        "ruby": 366439,
        "prerequisites": [
          {
            "nodeId": 216022,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1004,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 22,
        "timeSec": 202140,
        "fightforce": 6300,
        "timber": 760950,
        "stone": 760950,
        "ruby": 913159,
        "prerequisites": [],
        "attr1Id": 1004,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 23,
        "timeSec": 485100,
        "fightforce": 11700,
        "timber": 1731200,
        "stone": 1731200,
        "ruby": 2077440,
        "prerequisites": [
          {
            "nodeId": 216022,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 1004,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 23,
        "timeSec": 950820,
        "fightforce": 20300,
        "timber": 3739400,
        "stone": 3739400,
        "ruby": 4487259,
        "prerequisites": [],
        "attr1Id": 1004,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 23,
        "timeSec": 1606860,
        "fightforce": 31300,
        "timber": 6805700,
        "stone": 6805700,
        "ruby": 8166819,
        "prerequisites": [],
        "attr1Id": 1004,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 216026,
    "branchId": 216,
    "row": 11,
    "col": 2,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_303.webp",
    "name": {
      "vi": "Thu Thập Đá",
      "en": "Stone Gathering"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 23,
        "timeSec": 66060,
        "fightforce": 2500,
        "timber": 427500,
        "stone": 427500,
        "ruby": 513019,
        "prerequisites": [
          {
            "nodeId": 216023,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1005,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 23,
        "timeSec": 202140,
        "fightforce": 6300,
        "timber": 989250,
        "stone": 989250,
        "ruby": 1187100,
        "prerequisites": [],
        "attr1Id": 1005,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 24,
        "timeSec": 485100,
        "fightforce": 11700,
        "timber": 2077450,
        "stone": 2077450,
        "ruby": 2492919,
        "prerequisites": [
          {
            "nodeId": 216023,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 1005,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 24,
        "timeSec": 950820,
        "fightforce": 20300,
        "timber": 5235150,
        "stone": 5235150,
        "ruby": 6282159,
        "prerequisites": [],
        "attr1Id": 1005,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 24,
        "timeSec": 1606860,
        "fightforce": 31300,
        "timber": 8507100,
        "stone": 8507100,
        "ruby": 10208520,
        "prerequisites": [],
        "attr1Id": 1005,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 216027,
    "branchId": 216,
    "row": 11,
    "col": 3,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_301.webp",
    "name": {
      "vi": "Thu Thập Ruby",
      "en": "Ruby Gathering"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 24,
        "timeSec": 66060,
        "fightforce": 2500,
        "timber": 427500,
        "stone": 427500,
        "ruby": 513019,
        "prerequisites": [
          {
            "nodeId": 216024,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1006,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 24,
        "timeSec": 202140,
        "fightforce": 6300,
        "timber": 989250,
        "stone": 989250,
        "ruby": 1187100,
        "prerequisites": [],
        "attr1Id": 1006,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 25,
        "timeSec": 485100,
        "fightforce": 11700,
        "timber": 2077450,
        "stone": 2077450,
        "ruby": 2492919,
        "prerequisites": [
          {
            "nodeId": 216024,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 1006,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 25,
        "timeSec": 950820,
        "fightforce": 20300,
        "timber": 5235150,
        "stone": 5235150,
        "ruby": 6282159,
        "prerequisites": [],
        "attr1Id": 1006,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 25,
        "timeSec": 1606860,
        "fightforce": 31300,
        "timber": 8507100,
        "stone": 8507100,
        "ruby": 10208520,
        "prerequisites": [],
        "attr1Id": 1006,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 216028,
    "branchId": 216,
    "row": 12,
    "col": 2,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_1101.webp",
    "name": {
      "vi": "Bảo Vệ Kho",
      "en": "Warehouse Protection"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 25,
        "timeSec": 202140,
        "fightforce": 3800,
        "timber": 427500,
        "stone": 427500,
        "ruby": 513019,
        "prerequisites": [
          {
            "nodeId": 216025,
            "requiredLevel": 1
          },
          {
            "nodeId": 216026,
            "requiredLevel": 1
          },
          {
            "nodeId": 216027,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1096,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 25,
        "timeSec": 485100,
        "fightforce": 9200,
        "timber": 989250,
        "stone": 989250,
        "ruby": 1187100,
        "prerequisites": [],
        "attr1Id": 1096,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 26,
        "timeSec": 950820,
        "fightforce": 17800,
        "timber": 2077450,
        "stone": 2077450,
        "ruby": 2492919,
        "prerequisites": [
          {
            "nodeId": 216025,
            "requiredLevel": 3
          },
          {
            "nodeId": 216026,
            "requiredLevel": 3
          },
          {
            "nodeId": 216027,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 1096,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 26,
        "timeSec": 1606860,
        "fightforce": 28800,
        "timber": 5235150,
        "stone": 5235150,
        "ruby": 6282159,
        "prerequisites": [],
        "attr1Id": 1096,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 26,
        "timeSec": 2313900,
        "fightforce": 44800,
        "timber": 8507100,
        "stone": 8507100,
        "ruby": 10208520,
        "prerequisites": [],
        "attr1Id": 1096,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 216029,
    "branchId": 216,
    "row": 13,
    "col": 2,
    "maxLevel": 1,
    "icon": "/images/tech/research/tech_216029.webp",
    "name": {
      "vi": "Tuyên Dương Đội Trưởng",
      "en": "Captain Commendation"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 30,
        "timeSec": 2545290,
        "fightforce": 20000,
        "timber": 8507100,
        "stone": 8507100,
        "ruby": 10208520,
        "prerequisites": [
          {
            "nodeId": 216028,
            "requiredLevel": 5
          }
        ],
        "attr1Id": 0,
        "attr1Delta": 0,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 213001,
    "branchId": 213,
    "row": 1,
    "col": 2,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_101.webp",
    "name": {
      "vi": "Tốc độ Xây I",
      "en": "Construction Speed I"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 1,
        "timeSec": 300,
        "fightforce": 100,
        "timber": 250,
        "stone": 250,
        "ruby": 500,
        "prerequisites": [],
        "attr1Id": 1034,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 1,
        "timeSec": 360,
        "fightforce": 200,
        "timber": 400,
        "stone": 400,
        "ruby": 766,
        "prerequisites": [],
        "attr1Id": 1034,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 1,
        "timeSec": 480,
        "fightforce": 300,
        "timber": 550,
        "stone": 550,
        "ruby": 1133,
        "prerequisites": [],
        "attr1Id": 1034,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 1,
        "timeSec": 600,
        "fightforce": 500,
        "timber": 850,
        "stone": 850,
        "ruby": 1700,
        "prerequisites": [],
        "attr1Id": 1034,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 1,
        "timeSec": 780,
        "fightforce": 700,
        "timber": 1250,
        "stone": 1250,
        "ruby": 2533,
        "prerequisites": [],
        "attr1Id": 1034,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 213002,
    "branchId": 213,
    "row": 2,
    "col": 1,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_504.webp",
    "name": {
      "vi": "Sức chứa trị liệu",
      "en": "Hospital Capacity"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 2,
        "timeSec": 480,
        "fightforce": 100,
        "timber": 550,
        "stone": 550,
        "ruby": 1133,
        "prerequisites": [
          {
            "nodeId": 213001,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1032,
        "attr1Delta": 50,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 2,
        "timeSec": 600,
        "fightforce": 300,
        "timber": 850,
        "stone": 850,
        "ruby": 1700,
        "prerequisites": [],
        "attr1Id": 1032,
        "attr1Delta": 50,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 2,
        "timeSec": 780,
        "fightforce": 500,
        "timber": 1250,
        "stone": 1250,
        "ruby": 2533,
        "prerequisites": [],
        "attr1Id": 1032,
        "attr1Delta": 50,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 2,
        "timeSec": 960,
        "fightforce": 700,
        "timber": 2550,
        "stone": 2550,
        "ruby": 5066,
        "prerequisites": [],
        "attr1Id": 1032,
        "attr1Delta": 50,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 2,
        "timeSec": 1260,
        "fightforce": 1100,
        "timber": 7600,
        "stone": 7600,
        "ruby": 15200,
        "prerequisites": [],
        "attr1Id": 1032,
        "attr1Delta": 50,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 213003,
    "branchId": 213,
    "row": 2,
    "col": 3,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_1109.webp",
    "name": {
      "vi": "Mở Rộng Trại Lính I",
      "en": "Barracks Expansion I"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 3,
        "timeSec": 480,
        "fightforce": 100,
        "timber": 550,
        "stone": 550,
        "ruby": 1133,
        "prerequisites": [
          {
            "nodeId": 213001,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1017,
        "attr1Delta": 8,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 3,
        "timeSec": 600,
        "fightforce": 300,
        "timber": 850,
        "stone": 850,
        "ruby": 1700,
        "prerequisites": [],
        "attr1Id": 1017,
        "attr1Delta": 8,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 3,
        "timeSec": 780,
        "fightforce": 500,
        "timber": 1250,
        "stone": 1250,
        "ruby": 2533,
        "prerequisites": [],
        "attr1Id": 1017,
        "attr1Delta": 8,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 3,
        "timeSec": 960,
        "fightforce": 700,
        "timber": 2550,
        "stone": 2550,
        "ruby": 5066,
        "prerequisites": [],
        "attr1Id": 1017,
        "attr1Delta": 8,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 3,
        "timeSec": 1260,
        "fightforce": 1100,
        "timber": 7600,
        "stone": 7600,
        "ruby": 15200,
        "prerequisites": [],
        "attr1Id": 1017,
        "attr1Delta": 8,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 213004,
    "branchId": 213,
    "row": 3,
    "col": 2,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_102.webp",
    "name": {
      "vi": "Tốc độ Nghiên Cứu I",
      "en": "Research Speed I"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 4,
        "timeSec": 780,
        "fightforce": 200,
        "timber": 1250,
        "stone": 1250,
        "ruby": 2533,
        "prerequisites": [
          {
            "nodeId": 213002,
            "requiredLevel": 1
          },
          {
            "nodeId": 213003,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1033,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 4,
        "timeSec": 960,
        "fightforce": 400,
        "timber": 2550,
        "stone": 2550,
        "ruby": 5066,
        "prerequisites": [],
        "attr1Id": 1033,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 4,
        "timeSec": 1260,
        "fightforce": 800,
        "timber": 7600,
        "stone": 7600,
        "ruby": 15200,
        "prerequisites": [],
        "attr1Id": 1033,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 4,
        "timeSec": 1620,
        "fightforce": 1300,
        "timber": 15200,
        "stone": 15200,
        "ruby": 30366,
        "prerequisites": [],
        "attr1Id": 1033,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 4,
        "timeSec": 2100,
        "fightforce": 1900,
        "timber": 24300,
        "stone": 24300,
        "ruby": 48600,
        "prerequisites": [],
        "attr1Id": 1033,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 213005,
    "branchId": 213,
    "row": 4,
    "col": 1,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_207.webp",
    "name": {
      "vi": "Băng bó nhanh I",
      "en": "Rapid Bandaging I"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 5,
        "timeSec": 780,
        "fightforce": 200,
        "timber": 1250,
        "stone": 1250,
        "ruby": 2533,
        "prerequisites": [
          {
            "nodeId": 213004,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1022,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 5,
        "timeSec": 960,
        "fightforce": 400,
        "timber": 2550,
        "stone": 2550,
        "ruby": 5066,
        "prerequisites": [],
        "attr1Id": 1022,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 5,
        "timeSec": 1260,
        "fightforce": 800,
        "timber": 7600,
        "stone": 7600,
        "ruby": 15200,
        "prerequisites": [],
        "attr1Id": 1022,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 5,
        "timeSec": 1620,
        "fightforce": 1300,
        "timber": 15200,
        "stone": 15200,
        "ruby": 30366,
        "prerequisites": [],
        "attr1Id": 1022,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 5,
        "timeSec": 2100,
        "fightforce": 1900,
        "timber": 24300,
        "stone": 24300,
        "ruby": 48600,
        "prerequisites": [],
        "attr1Id": 1022,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 213006,
    "branchId": 213,
    "row": 4,
    "col": 3,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_510.webp",
    "name": {
      "vi": "Tốc Độ Huấn Luyện Lính",
      "en": "Troop Training Speed"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 6,
        "timeSec": 780,
        "fightforce": 200,
        "timber": 1250,
        "stone": 1250,
        "ruby": 2533,
        "prerequisites": [
          {
            "nodeId": 213004,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1016,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 6,
        "timeSec": 960,
        "fightforce": 400,
        "timber": 2550,
        "stone": 2550,
        "ruby": 5066,
        "prerequisites": [],
        "attr1Id": 1016,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 6,
        "timeSec": 1260,
        "fightforce": 800,
        "timber": 7600,
        "stone": 7600,
        "ruby": 15200,
        "prerequisites": [],
        "attr1Id": 1016,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 6,
        "timeSec": 1620,
        "fightforce": 1300,
        "timber": 15200,
        "stone": 15200,
        "ruby": 30366,
        "prerequisites": [],
        "attr1Id": 1016,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 6,
        "timeSec": 2100,
        "fightforce": 1900,
        "timber": 24300,
        "stone": 24300,
        "ruby": 48600,
        "prerequisites": [],
        "attr1Id": 1016,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 213007,
    "branchId": 213,
    "row": 5,
    "col": 2,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_108.webp",
    "name": {
      "vi": "Cải Tiến Công Cụ I",
      "en": "Tool Improvement I"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 7,
        "timeSec": 960,
        "fightforce": 200,
        "timber": 2550,
        "stone": 2550,
        "ruby": 5066,
        "prerequisites": [
          {
            "nodeId": 213005,
            "requiredLevel": 1
          },
          {
            "nodeId": 213006,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1121,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 7,
        "timeSec": 1620,
        "fightforce": 700,
        "timber": 15200,
        "stone": 15200,
        "ruby": 30366,
        "prerequisites": [],
        "attr1Id": 1121,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 7,
        "timeSec": 2760,
        "fightforce": 1500,
        "timber": 38900,
        "stone": 38900,
        "ruby": 77766,
        "prerequisites": [],
        "attr1Id": 1121,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 7,
        "timeSec": 6120,
        "fightforce": 2800,
        "timber": 116650,
        "stone": 116650,
        "ruby": 233266,
        "prerequisites": [],
        "attr1Id": 1121,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 7,
        "timeSec": 17400,
        "fightforce": 4600,
        "timber": 218100,
        "stone": 218100,
        "ruby": 436233,
        "prerequisites": [],
        "attr1Id": 1121,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 213008,
    "branchId": 213,
    "row": 6,
    "col": 2,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_101.webp",
    "name": {
      "vi": "Tốc độ Xây II",
      "en": "Construction Speed II"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 8,
        "timeSec": 1620,
        "fightforce": 500,
        "timber": 15200,
        "stone": 15200,
        "ruby": 30366,
        "prerequisites": [
          {
            "nodeId": 213007,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1034,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 8,
        "timeSec": 2100,
        "fightforce": 1100,
        "timber": 24300,
        "stone": 24300,
        "ruby": 48600,
        "prerequisites": [],
        "attr1Id": 1034,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 8,
        "timeSec": 2760,
        "fightforce": 1900,
        "timber": 38900,
        "stone": 38900,
        "ruby": 77766,
        "prerequisites": [],
        "attr1Id": 1034,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 8,
        "timeSec": 4080,
        "fightforce": 2800,
        "timber": 46650,
        "stone": 46650,
        "ruby": 93300,
        "prerequisites": [],
        "attr1Id": 1034,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 8,
        "timeSec": 6120,
        "fightforce": 4100,
        "timber": 116650,
        "stone": 116650,
        "ruby": 233266,
        "prerequisites": [],
        "attr1Id": 1034,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 213009,
    "branchId": 213,
    "row": 7,
    "col": 1,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_504.webp",
    "name": {
      "vi": "Sức chứa trị liệu",
      "en": "Hospital Capacity"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 9,
        "timeSec": 2760,
        "fightforce": 800,
        "timber": 38900,
        "stone": 38900,
        "ruby": 77766,
        "prerequisites": [
          {
            "nodeId": 213008,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1032,
        "attr1Delta": 50,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 9,
        "timeSec": 4080,
        "fightforce": 1700,
        "timber": 46650,
        "stone": 46650,
        "ruby": 93300,
        "prerequisites": [],
        "attr1Id": 1032,
        "attr1Delta": 50,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 9,
        "timeSec": 6120,
        "fightforce": 3000,
        "timber": 116650,
        "stone": 116650,
        "ruby": 233266,
        "prerequisites": [],
        "attr1Id": 1032,
        "attr1Delta": 50,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 9,
        "timeSec": 9180,
        "fightforce": 4700,
        "timber": 198300,
        "stone": 198300,
        "ruby": 396566,
        "prerequisites": [],
        "attr1Id": 1032,
        "attr1Delta": 50,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 9,
        "timeSec": 17400,
        "fightforce": 6500,
        "timber": 218100,
        "stone": 218100,
        "ruby": 436233,
        "prerequisites": [],
        "attr1Id": 1032,
        "attr1Delta": 50,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 213010,
    "branchId": 213,
    "row": 7,
    "col": 3,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_1109.webp",
    "name": {
      "vi": "Mở Rộng Trại Lính II",
      "en": "Barracks Expansion II"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 10,
        "timeSec": 2760,
        "fightforce": 800,
        "timber": 38900,
        "stone": 38900,
        "ruby": 77766,
        "prerequisites": [
          {
            "nodeId": 213008,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1017,
        "attr1Delta": 8,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 10,
        "timeSec": 4080,
        "fightforce": 1700,
        "timber": 46650,
        "stone": 46650,
        "ruby": 93300,
        "prerequisites": [],
        "attr1Id": 1017,
        "attr1Delta": 8,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 10,
        "timeSec": 6120,
        "fightforce": 3000,
        "timber": 116650,
        "stone": 116650,
        "ruby": 233266,
        "prerequisites": [],
        "attr1Id": 1017,
        "attr1Delta": 8,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 10,
        "timeSec": 9180,
        "fightforce": 4700,
        "timber": 198300,
        "stone": 198300,
        "ruby": 396566,
        "prerequisites": [],
        "attr1Id": 1017,
        "attr1Delta": 8,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 10,
        "timeSec": 17400,
        "fightforce": 6500,
        "timber": 218100,
        "stone": 218100,
        "ruby": 436233,
        "prerequisites": [],
        "attr1Id": 1017,
        "attr1Delta": 8,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 213011,
    "branchId": 213,
    "row": 8,
    "col": 2,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_102.webp",
    "name": {
      "vi": "Tốc Độ Nghiên Cứu II",
      "en": "Research Speed II"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 11,
        "timeSec": 4080,
        "fightforce": 900,
        "timber": 46650,
        "stone": 46650,
        "ruby": 93300,
        "prerequisites": [
          {
            "nodeId": 213009,
            "requiredLevel": 1
          },
          {
            "nodeId": 213010,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1033,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 11,
        "timeSec": 6120,
        "fightforce": 2200,
        "timber": 116650,
        "stone": 116650,
        "ruby": 233266,
        "prerequisites": [],
        "attr1Id": 1033,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 11,
        "timeSec": 9180,
        "fightforce": 3900,
        "timber": 198300,
        "stone": 198300,
        "ruby": 396566,
        "prerequisites": [],
        "attr1Id": 1033,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 11,
        "timeSec": 17400,
        "fightforce": 5700,
        "timber": 218100,
        "stone": 218100,
        "ruby": 436233,
        "prerequisites": [],
        "attr1Id": 1033,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 11,
        "timeSec": 34800,
        "fightforce": 7800,
        "timber": 305350,
        "stone": 305350,
        "ruby": 610733,
        "prerequisites": [],
        "attr1Id": 1033,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 213012,
    "branchId": 213,
    "row": 9,
    "col": 1,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_207.webp",
    "name": {
      "vi": "Băng bó nhanh II",
      "en": "Rapid Bandaging II"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 12,
        "timeSec": 6120,
        "fightforce": 1300,
        "timber": 116650,
        "stone": 116650,
        "ruby": 233266,
        "prerequisites": [
          {
            "nodeId": 213011,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1022,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 12,
        "timeSec": 9180,
        "fightforce": 3000,
        "timber": 198300,
        "stone": 198300,
        "ruby": 396566,
        "prerequisites": [],
        "attr1Id": 1022,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 12,
        "timeSec": 17400,
        "fightforce": 4800,
        "timber": 218100,
        "stone": 218100,
        "ruby": 436233,
        "prerequisites": [],
        "attr1Id": 1022,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 12,
        "timeSec": 34800,
        "fightforce": 6900,
        "timber": 305350,
        "stone": 305350,
        "ruby": 610733,
        "prerequisites": [],
        "attr1Id": 1022,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 12,
        "timeSec": 66060,
        "fightforce": 9400,
        "timber": 427500,
        "stone": 427500,
        "ruby": 855033,
        "prerequisites": [],
        "attr1Id": 1022,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 213013,
    "branchId": 213,
    "row": 9,
    "col": 3,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_510.webp",
    "name": {
      "vi": "Tốc Độ Huấn Luyện Lính",
      "en": "Troop Training Speed"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 13,
        "timeSec": 6120,
        "fightforce": 1300,
        "timber": 116650,
        "stone": 116650,
        "ruby": 233266,
        "prerequisites": [
          {
            "nodeId": 213011,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1016,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 13,
        "timeSec": 9180,
        "fightforce": 3000,
        "timber": 198300,
        "stone": 198300,
        "ruby": 396566,
        "prerequisites": [],
        "attr1Id": 1016,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 13,
        "timeSec": 17400,
        "fightforce": 4800,
        "timber": 218100,
        "stone": 218100,
        "ruby": 436233,
        "prerequisites": [],
        "attr1Id": 1016,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 13,
        "timeSec": 34800,
        "fightforce": 6900,
        "timber": 305350,
        "stone": 305350,
        "ruby": 610733,
        "prerequisites": [],
        "attr1Id": 1016,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 13,
        "timeSec": 66060,
        "fightforce": 9400,
        "timber": 427500,
        "stone": 427500,
        "ruby": 855033,
        "prerequisites": [],
        "attr1Id": 1016,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 213014,
    "branchId": 213,
    "row": 10,
    "col": 2,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_603.webp",
    "name": {
      "vi": "Sức chứa Sân Tập I",
      "en": "Training Ground Capacity I"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 14,
        "timeSec": 6120,
        "fightforce": 1700,
        "timber": 218100,
        "stone": 218100,
        "ruby": 261739,
        "prerequisites": [
          {
            "nodeId": 213012,
            "requiredLevel": 1
          },
          {
            "nodeId": 213013,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1018,
        "attr1Delta": 30,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 14,
        "timeSec": 9180,
        "fightforce": 3000,
        "timber": 305350,
        "stone": 305350,
        "ruby": 366439,
        "prerequisites": [],
        "attr1Id": 1018,
        "attr1Delta": 30,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 14,
        "timeSec": 17400,
        "fightforce": 4700,
        "timber": 427500,
        "stone": 427500,
        "ruby": 513019,
        "prerequisites": [],
        "attr1Id": 1018,
        "attr1Delta": 30,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 14,
        "timeSec": 34800,
        "fightforce": 6500,
        "timber": 442500,
        "stone": 442500,
        "ruby": 580200,
        "prerequisites": [],
        "attr1Id": 1018,
        "attr1Delta": 30,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 14,
        "timeSec": 66060,
        "fightforce": 9800,
        "timber": 461320,
        "stone": 461320,
        "ruby": 682200,
        "prerequisites": [],
        "attr1Id": 1018,
        "attr1Delta": 30,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 213015,
    "branchId": 213,
    "row": 11,
    "col": 2,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_101.webp",
    "name": {
      "vi": "Tốc độ Xây III",
      "en": "Construction Speed III"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 15,
        "timeSec": 9180,
        "fightforce": 1700,
        "timber": 198300,
        "stone": 198300,
        "ruby": 237939,
        "prerequisites": [
          {
            "nodeId": 213014,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1034,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 15,
        "timeSec": 34800,
        "fightforce": 3800,
        "timber": 305350,
        "stone": 305350,
        "ruby": 366439,
        "prerequisites": [],
        "attr1Id": 1034,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 15,
        "timeSec": 118920,
        "fightforce": 7100,
        "timber": 760950,
        "stone": 760950,
        "ruby": 913159,
        "prerequisites": [],
        "attr1Id": 1034,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 15,
        "timeSec": 323400,
        "fightforce": 12100,
        "timber": 1731200,
        "stone": 1731200,
        "ruby": 2077440,
        "prerequisites": [],
        "attr1Id": 1034,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 15,
        "timeSec": 679140,
        "fightforce": 19400,
        "timber": 3739400,
        "stone": 3739400,
        "ruby": 4487259,
        "prerequisites": [],
        "attr1Id": 1034,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 213016,
    "branchId": 213,
    "row": 12,
    "col": 1,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_504.webp",
    "name": {
      "vi": "Sức chứa trị liệu",
      "en": "Hospital Capacity"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 16,
        "timeSec": 9180,
        "fightforce": 1700,
        "timber": 198300,
        "stone": 198300,
        "ruby": 237939,
        "prerequisites": [
          {
            "nodeId": 213015,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1032,
        "attr1Delta": 50,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 16,
        "timeSec": 34800,
        "fightforce": 3800,
        "timber": 305350,
        "stone": 305350,
        "ruby": 366439,
        "prerequisites": [],
        "attr1Id": 1032,
        "attr1Delta": 50,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 16,
        "timeSec": 118920,
        "fightforce": 7100,
        "timber": 760950,
        "stone": 760950,
        "ruby": 913159,
        "prerequisites": [],
        "attr1Id": 1032,
        "attr1Delta": 50,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 16,
        "timeSec": 323400,
        "fightforce": 12100,
        "timber": 1731200,
        "stone": 1731200,
        "ruby": 2077440,
        "prerequisites": [],
        "attr1Id": 1032,
        "attr1Delta": 50,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 16,
        "timeSec": 679140,
        "fightforce": 19400,
        "timber": 3739400,
        "stone": 3739400,
        "ruby": 4487259,
        "prerequisites": [],
        "attr1Id": 1032,
        "attr1Delta": 50,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 213017,
    "branchId": 213,
    "row": 12,
    "col": 3,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_1109.webp",
    "name": {
      "vi": "Mở Rộng Trại Lính III",
      "en": "Barracks Expansion III"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 17,
        "timeSec": 9180,
        "fightforce": 1700,
        "timber": 198300,
        "stone": 198300,
        "ruby": 237939,
        "prerequisites": [
          {
            "nodeId": 213015,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1017,
        "attr1Delta": 8,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 17,
        "timeSec": 34800,
        "fightforce": 3800,
        "timber": 305350,
        "stone": 305350,
        "ruby": 366439,
        "prerequisites": [],
        "attr1Id": 1017,
        "attr1Delta": 8,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 17,
        "timeSec": 118920,
        "fightforce": 7100,
        "timber": 760950,
        "stone": 760950,
        "ruby": 913159,
        "prerequisites": [],
        "attr1Id": 1017,
        "attr1Delta": 8,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 17,
        "timeSec": 323400,
        "fightforce": 12100,
        "timber": 1731200,
        "stone": 1731200,
        "ruby": 2077440,
        "prerequisites": [],
        "attr1Id": 1017,
        "attr1Delta": 8,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 17,
        "timeSec": 679140,
        "fightforce": 19400,
        "timber": 3739400,
        "stone": 3739400,
        "ruby": 4487259,
        "prerequisites": [],
        "attr1Id": 1017,
        "attr1Delta": 8,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 213018,
    "branchId": 213,
    "row": 13,
    "col": 2,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_102.webp",
    "name": {
      "vi": "Tốc Độ Nghiên Cứu III",
      "en": "Research Speed III"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 18,
        "timeSec": 17400,
        "fightforce": 1800,
        "timber": 218100,
        "stone": 218100,
        "ruby": 261739,
        "prerequisites": [
          {
            "nodeId": 213016,
            "requiredLevel": 1
          },
          {
            "nodeId": 213017,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1033,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 18,
        "timeSec": 66060,
        "fightforce": 4300,
        "timber": 427500,
        "stone": 427500,
        "ruby": 513019,
        "prerequisites": [],
        "attr1Id": 1033,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 18,
        "timeSec": 202140,
        "fightforce": 8100,
        "timber": 989250,
        "stone": 989250,
        "ruby": 1187100,
        "prerequisites": [],
        "attr1Id": 1033,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 18,
        "timeSec": 485100,
        "fightforce": 13500,
        "timber": 2077450,
        "stone": 2077450,
        "ruby": 2492919,
        "prerequisites": [],
        "attr1Id": 1033,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 18,
        "timeSec": 950820,
        "fightforce": 22100,
        "timber": 5235150,
        "stone": 5235150,
        "ruby": 6282159,
        "prerequisites": [],
        "attr1Id": 1033,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 213019,
    "branchId": 213,
    "row": 14,
    "col": 1,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_207.webp",
    "name": {
      "vi": "Băng bó nhanh III",
      "en": "Rapid Bandaging III"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 19,
        "timeSec": 17400,
        "fightforce": 1800,
        "timber": 218100,
        "stone": 218100,
        "ruby": 261739,
        "prerequisites": [
          {
            "nodeId": 213018,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1022,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 19,
        "timeSec": 66060,
        "fightforce": 4300,
        "timber": 427500,
        "stone": 427500,
        "ruby": 513019,
        "prerequisites": [],
        "attr1Id": 1022,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 19,
        "timeSec": 202140,
        "fightforce": 8100,
        "timber": 989250,
        "stone": 989250,
        "ruby": 1187100,
        "prerequisites": [],
        "attr1Id": 1022,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 19,
        "timeSec": 485100,
        "fightforce": 13500,
        "timber": 2077450,
        "stone": 2077450,
        "ruby": 2492919,
        "prerequisites": [],
        "attr1Id": 1022,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 19,
        "timeSec": 950820,
        "fightforce": 22100,
        "timber": 5235150,
        "stone": 5235150,
        "ruby": 6282159,
        "prerequisites": [],
        "attr1Id": 1022,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 213020,
    "branchId": 213,
    "row": 14,
    "col": 3,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_510.webp",
    "name": {
      "vi": "Tốc Độ Huấn Luyện Lính",
      "en": "Troop Training Speed"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 20,
        "timeSec": 17400,
        "fightforce": 1800,
        "timber": 218100,
        "stone": 218100,
        "ruby": 261739,
        "prerequisites": [
          {
            "nodeId": 213018,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1016,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 20,
        "timeSec": 66060,
        "fightforce": 4300,
        "timber": 427500,
        "stone": 427500,
        "ruby": 513019,
        "prerequisites": [],
        "attr1Id": 1016,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 20,
        "timeSec": 202140,
        "fightforce": 8100,
        "timber": 989250,
        "stone": 989250,
        "ruby": 1187100,
        "prerequisites": [],
        "attr1Id": 1016,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 20,
        "timeSec": 485100,
        "fightforce": 13500,
        "timber": 2077450,
        "stone": 2077450,
        "ruby": 2492919,
        "prerequisites": [],
        "attr1Id": 1016,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 20,
        "timeSec": 950820,
        "fightforce": 22100,
        "timber": 5235150,
        "stone": 5235150,
        "ruby": 6282159,
        "prerequisites": [],
        "attr1Id": 1016,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 213021,
    "branchId": 213,
    "row": 15,
    "col": 2,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_1407.webp",
    "name": {
      "vi": "Tiêu Hao Trị Liệu I",
      "en": "Healing Cost Reduction I"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 21,
        "timeSec": 17400,
        "fightforce": 1800,
        "timber": 218100,
        "stone": 218100,
        "ruby": 261739,
        "prerequisites": [
          {
            "nodeId": 213019,
            "requiredLevel": 1
          },
          {
            "nodeId": 213020,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1122,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 21,
        "timeSec": 118920,
        "fightforce": 5100,
        "timber": 760950,
        "stone": 760950,
        "ruby": 913159,
        "prerequisites": [],
        "attr1Id": 1122,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 21,
        "timeSec": 485100,
        "fightforce": 10500,
        "timber": 2077450,
        "stone": 2077450,
        "ruby": 2492919,
        "prerequisites": [],
        "attr1Id": 1122,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 21,
        "timeSec": 950820,
        "fightforce": 19100,
        "timber": 5235150,
        "stone": 5235150,
        "ruby": 6282159,
        "prerequisites": [],
        "attr1Id": 1122,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 21,
        "timeSec": 1606860,
        "fightforce": 30100,
        "timber": 8507100,
        "stone": 8507100,
        "ruby": 10208520,
        "prerequisites": [],
        "attr1Id": 1122,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 213022,
    "branchId": 213,
    "row": 16,
    "col": 2,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_101.webp",
    "name": {
      "vi": "Tốc độ Xây IV",
      "en": "Construction Speed IV"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 22,
        "timeSec": 34800,
        "fightforce": 2100,
        "timber": 305350,
        "stone": 305350,
        "ruby": 366439,
        "prerequisites": [
          {
            "nodeId": 213021,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1034,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 22,
        "timeSec": 118920,
        "fightforce": 5400,
        "timber": 760950,
        "stone": 760950,
        "ruby": 913159,
        "prerequisites": [],
        "attr1Id": 1034,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 22,
        "timeSec": 323400,
        "fightforce": 10400,
        "timber": 1731200,
        "stone": 1731200,
        "ruby": 2077440,
        "prerequisites": [],
        "attr1Id": 1034,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 22,
        "timeSec": 679140,
        "fightforce": 17700,
        "timber": 3739400,
        "stone": 3739400,
        "ruby": 4487259,
        "prerequisites": [],
        "attr1Id": 1034,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 22,
        "timeSec": 1236060,
        "fightforce": 27500,
        "timber": 6805700,
        "stone": 6805700,
        "ruby": 8166819,
        "prerequisites": [],
        "attr1Id": 1034,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 213023,
    "branchId": 213,
    "row": 17,
    "col": 1,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_504.webp",
    "name": {
      "vi": "Sức chứa trị liệu",
      "en": "Hospital Capacity"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 23,
        "timeSec": 34800,
        "fightforce": 2100,
        "timber": 305350,
        "stone": 305350,
        "ruby": 366439,
        "prerequisites": [
          {
            "nodeId": 213022,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1032,
        "attr1Delta": 50,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 23,
        "timeSec": 118920,
        "fightforce": 5400,
        "timber": 760950,
        "stone": 760950,
        "ruby": 913159,
        "prerequisites": [],
        "attr1Id": 1032,
        "attr1Delta": 50,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 23,
        "timeSec": 323400,
        "fightforce": 10400,
        "timber": 1731200,
        "stone": 1731200,
        "ruby": 2077440,
        "prerequisites": [],
        "attr1Id": 1032,
        "attr1Delta": 50,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 23,
        "timeSec": 679140,
        "fightforce": 17700,
        "timber": 3739400,
        "stone": 3739400,
        "ruby": 4487259,
        "prerequisites": [],
        "attr1Id": 1032,
        "attr1Delta": 50,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 23,
        "timeSec": 1236060,
        "fightforce": 27500,
        "timber": 6805700,
        "stone": 6805700,
        "ruby": 8166819,
        "prerequisites": [],
        "attr1Id": 1032,
        "attr1Delta": 50,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 213024,
    "branchId": 213,
    "row": 17,
    "col": 3,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_1109.webp",
    "name": {
      "vi": "Mở Rộng Trại Lính IV",
      "en": "Barracks Expansion IV"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 24,
        "timeSec": 34800,
        "fightforce": 2100,
        "timber": 305350,
        "stone": 305350,
        "ruby": 366439,
        "prerequisites": [
          {
            "nodeId": 213022,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1017,
        "attr1Delta": 8,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 24,
        "timeSec": 118920,
        "fightforce": 5400,
        "timber": 760950,
        "stone": 760950,
        "ruby": 913159,
        "prerequisites": [],
        "attr1Id": 1017,
        "attr1Delta": 8,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 24,
        "timeSec": 323400,
        "fightforce": 10400,
        "timber": 1731200,
        "stone": 1731200,
        "ruby": 2077440,
        "prerequisites": [],
        "attr1Id": 1017,
        "attr1Delta": 8,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 24,
        "timeSec": 679140,
        "fightforce": 17700,
        "timber": 3739400,
        "stone": 3739400,
        "ruby": 4487259,
        "prerequisites": [],
        "attr1Id": 1017,
        "attr1Delta": 8,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 24,
        "timeSec": 1236060,
        "fightforce": 27500,
        "timber": 6805700,
        "stone": 6805700,
        "ruby": 8166819,
        "prerequisites": [],
        "attr1Id": 1017,
        "attr1Delta": 8,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 213025,
    "branchId": 213,
    "row": 18,
    "col": 2,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_102.webp",
    "name": {
      "vi": "Tốc độ Nghiên Cứu IV",
      "en": "Research Speed IV"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 25,
        "timeSec": 66060,
        "fightforce": 2500,
        "timber": 427500,
        "stone": 427500,
        "ruby": 513019,
        "prerequisites": [
          {
            "nodeId": 213023,
            "requiredLevel": 1
          },
          {
            "nodeId": 213024,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1033,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 25,
        "timeSec": 202140,
        "fightforce": 6300,
        "timber": 989250,
        "stone": 989250,
        "ruby": 1187100,
        "prerequisites": [],
        "attr1Id": 1033,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 25,
        "timeSec": 485100,
        "fightforce": 11700,
        "timber": 2077450,
        "stone": 2077450,
        "ruby": 2492919,
        "prerequisites": [],
        "attr1Id": 1033,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 25,
        "timeSec": 950820,
        "fightforce": 20300,
        "timber": 5235150,
        "stone": 5235150,
        "ruby": 6282159,
        "prerequisites": [],
        "attr1Id": 1033,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 25,
        "timeSec": 1606860,
        "fightforce": 31300,
        "timber": 8507100,
        "stone": 8507100,
        "ruby": 10208520,
        "prerequisites": [],
        "attr1Id": 1033,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 213026,
    "branchId": 213,
    "row": 19,
    "col": 1,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_207.webp",
    "name": {
      "vi": "Băng bó nhanh IV",
      "en": "Rapid Bandaging IV"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 26,
        "timeSec": 66060,
        "fightforce": 2500,
        "timber": 427500,
        "stone": 427500,
        "ruby": 513019,
        "prerequisites": [
          {
            "nodeId": 213025,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1022,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 26,
        "timeSec": 202140,
        "fightforce": 6300,
        "timber": 989250,
        "stone": 989250,
        "ruby": 1187100,
        "prerequisites": [],
        "attr1Id": 1022,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 26,
        "timeSec": 485100,
        "fightforce": 11700,
        "timber": 2077450,
        "stone": 2077450,
        "ruby": 2492919,
        "prerequisites": [],
        "attr1Id": 1022,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 26,
        "timeSec": 950820,
        "fightforce": 20300,
        "timber": 5235150,
        "stone": 5235150,
        "ruby": 6282159,
        "prerequisites": [],
        "attr1Id": 1022,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 26,
        "timeSec": 1606860,
        "fightforce": 31300,
        "timber": 8507100,
        "stone": 8507100,
        "ruby": 10208520,
        "prerequisites": [],
        "attr1Id": 1022,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 213027,
    "branchId": 213,
    "row": 19,
    "col": 3,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_510.webp",
    "name": {
      "vi": "Tốc Độ Huấn Luyện Lính",
      "en": "Troop Training Speed"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 27,
        "timeSec": 66060,
        "fightforce": 2500,
        "timber": 427500,
        "stone": 427500,
        "ruby": 513019,
        "prerequisites": [
          {
            "nodeId": 213025,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1016,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 27,
        "timeSec": 202140,
        "fightforce": 6300,
        "timber": 989250,
        "stone": 989250,
        "ruby": 1187100,
        "prerequisites": [],
        "attr1Id": 1016,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 27,
        "timeSec": 485100,
        "fightforce": 11700,
        "timber": 2077450,
        "stone": 2077450,
        "ruby": 2492919,
        "prerequisites": [],
        "attr1Id": 1016,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 27,
        "timeSec": 950820,
        "fightforce": 20300,
        "timber": 5235150,
        "stone": 5235150,
        "ruby": 6282159,
        "prerequisites": [],
        "attr1Id": 1016,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 27,
        "timeSec": 1606860,
        "fightforce": 31300,
        "timber": 8507100,
        "stone": 8507100,
        "ruby": 10208520,
        "prerequisites": [],
        "attr1Id": 1016,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 213028,
    "branchId": 213,
    "row": 20,
    "col": 2,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_603.webp",
    "name": {
      "vi": "Sức chứa Sân Tập II",
      "en": "Training Ground Capacity II"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 28,
        "timeSec": 118920,
        "fightforce": 3300,
        "timber": 760950,
        "stone": 760950,
        "ruby": 913159,
        "prerequisites": [
          {
            "nodeId": 213026,
            "requiredLevel": 1
          },
          {
            "nodeId": 213027,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1018,
        "attr1Delta": 30,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 28,
        "timeSec": 323400,
        "fightforce": 8300,
        "timber": 1731200,
        "stone": 1731200,
        "ruby": 2077440,
        "prerequisites": [],
        "attr1Id": 1018,
        "attr1Delta": 30,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 28,
        "timeSec": 679140,
        "fightforce": 15600,
        "timber": 3739400,
        "stone": 3739400,
        "ruby": 4487259,
        "prerequisites": [],
        "attr1Id": 1018,
        "attr1Delta": 30,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 28,
        "timeSec": 1236060,
        "fightforce": 25400,
        "timber": 6805700,
        "stone": 6805700,
        "ruby": 8166819,
        "prerequisites": [],
        "attr1Id": 1018,
        "attr1Delta": 30,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 28,
        "timeSec": 1928220,
        "fightforce": 37700,
        "timber": 10633900,
        "stone": 10633900,
        "ruby": 12760659,
        "prerequisites": [],
        "attr1Id": 1018,
        "attr1Delta": 30,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 213029,
    "branchId": 213,
    "row": 21,
    "col": 2,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_1410.webp",
    "name": {
      "vi": "Công thành tử trận chuyển thành bị thương",
      "en": "Siege Fatalities to Wounded"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 29,
        "timeSec": 202140,
        "fightforce": 3800,
        "timber": 989250,
        "stone": 989250,
        "ruby": 1187100,
        "prerequisites": [
          {
            "nodeId": 213028,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1118,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 29,
        "timeSec": 485100,
        "fightforce": 9200,
        "timber": 2077450,
        "stone": 2077450,
        "ruby": 2492919,
        "prerequisites": [],
        "attr1Id": 1118,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 29,
        "timeSec": 950820,
        "fightforce": 17800,
        "timber": 5235150,
        "stone": 5235150,
        "ruby": 6282159,
        "prerequisites": [],
        "attr1Id": 1118,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 29,
        "timeSec": 1606860,
        "fightforce": 28800,
        "timber": 8507100,
        "stone": 8507100,
        "ruby": 10208520,
        "prerequisites": [],
        "attr1Id": 1118,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 29,
        "timeSec": 2313900,
        "fightforce": 44800,
        "timber": 18077600,
        "stone": 18077600,
        "ruby": 21693120,
        "prerequisites": [],
        "attr1Id": 1118,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 213030,
    "branchId": 213,
    "row": 22,
    "col": 2,
    "maxLevel": 1,
    "icon": "/images/tech/research/tech_jiaochang.webp",
    "name": {
      "vi": "Bổ Sung Sân Tập",
      "en": "Training Ground Expansion"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 29,
        "timeSec": 205452,
        "fightforce": 44800,
        "timber": 18077600,
        "stone": 18077600,
        "ruby": 21693120,
        "prerequisites": [
          {
            "nodeId": 213029,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 0,
        "attr1Delta": 0,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 217001,
    "branchId": 217,
    "row": 1,
    "col": 2,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_509.webp",
    "name": {
      "vi": "Giới Hạn Xuất Chinh I",
      "en": "March Capacity I"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 1,
        "timeSec": 1920,
        "fightforce": 300,
        "timber": 500,
        "stone": 500,
        "ruby": 850,
        "prerequisites": [],
        "attr1Id": 1019,
        "attr1Delta": 10,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 1,
        "timeSec": 2520,
        "fightforce": 800,
        "timber": 1300,
        "stone": 1300,
        "ruby": 2210,
        "prerequisites": [],
        "attr1Id": 1019,
        "attr1Delta": 10,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 1,
        "timeSec": 3240,
        "fightforce": 1500,
        "timber": 2500,
        "stone": 2500,
        "ruby": 4250,
        "prerequisites": [],
        "attr1Id": 1019,
        "attr1Delta": 10,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 1,
        "timeSec": 4200,
        "fightforce": 2400,
        "timber": 3900,
        "stone": 3900,
        "ruby": 6630,
        "prerequisites": [],
        "attr1Id": 1019,
        "attr1Delta": 10,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 1,
        "timeSec": 5460,
        "fightforce": 3500,
        "timber": 7000,
        "stone": 7000,
        "ruby": 11900,
        "prerequisites": [],
        "attr1Id": 1019,
        "attr1Delta": 10,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 217002,
    "branchId": 217,
    "row": 2,
    "col": 1,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_201.webp",
    "name": {
      "vi": "Tấn Công của Lính I",
      "en": "Troop Attack I"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 1,
        "timeSec": 1920,
        "fightforce": 300,
        "timber": 500,
        "stone": 500,
        "ruby": 850,
        "prerequisites": [
          {
            "nodeId": 217001,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 10103,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 1,
        "timeSec": 2520,
        "fightforce": 800,
        "timber": 1300,
        "stone": 1300,
        "ruby": 2210,
        "prerequisites": [],
        "attr1Id": 10103,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 1,
        "timeSec": 3240,
        "fightforce": 1500,
        "timber": 2500,
        "stone": 2500,
        "ruby": 4250,
        "prerequisites": [
          {
            "nodeId": 217001,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 10103,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 1,
        "timeSec": 4200,
        "fightforce": 2400,
        "timber": 3900,
        "stone": 3900,
        "ruby": 6630,
        "prerequisites": [],
        "attr1Id": 10103,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 1,
        "timeSec": 5460,
        "fightforce": 3500,
        "timber": 7000,
        "stone": 7000,
        "ruby": 11900,
        "prerequisites": [],
        "attr1Id": 10103,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 217003,
    "branchId": 217,
    "row": 2,
    "col": 3,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_202.webp",
    "name": {
      "vi": "Lính HP I",
      "en": "Troop HP I"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 1,
        "timeSec": 1920,
        "fightforce": 300,
        "timber": 500,
        "stone": 500,
        "ruby": 850,
        "prerequisites": [
          {
            "nodeId": 217001,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 10104,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 1,
        "timeSec": 2520,
        "fightforce": 800,
        "timber": 1300,
        "stone": 1300,
        "ruby": 2210,
        "prerequisites": [],
        "attr1Id": 10104,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 1,
        "timeSec": 3240,
        "fightforce": 1500,
        "timber": 2500,
        "stone": 2500,
        "ruby": 4250,
        "prerequisites": [
          {
            "nodeId": 217001,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 10104,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 1,
        "timeSec": 4200,
        "fightforce": 2400,
        "timber": 3900,
        "stone": 3900,
        "ruby": 6630,
        "prerequisites": [],
        "attr1Id": 10104,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 1,
        "timeSec": 5460,
        "fightforce": 3500,
        "timber": 7000,
        "stone": 7000,
        "ruby": 11900,
        "prerequisites": [],
        "attr1Id": 10104,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 217004,
    "branchId": 217,
    "row": 3,
    "col": 1,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_505.webp",
    "name": {
      "vi": "Sát thương công thành của đội ngũ I",
      "en": "Queue Siege Damage I"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 5,
        "timeSec": 1920,
        "fightforce": 300,
        "timber": 500,
        "stone": 500,
        "ruby": 850,
        "prerequisites": [
          {
            "nodeId": 217002,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 45,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 5,
        "timeSec": 2520,
        "fightforce": 800,
        "timber": 1300,
        "stone": 1300,
        "ruby": 2210,
        "prerequisites": [],
        "attr1Id": 45,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 5,
        "timeSec": 3240,
        "fightforce": 1500,
        "timber": 2500,
        "stone": 2500,
        "ruby": 4250,
        "prerequisites": [
          {
            "nodeId": 217002,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 45,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 5,
        "timeSec": 4200,
        "fightforce": 2400,
        "timber": 3900,
        "stone": 3900,
        "ruby": 6630,
        "prerequisites": [],
        "attr1Id": 45,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 5,
        "timeSec": 5460,
        "fightforce": 3500,
        "timber": 7000,
        "stone": 7000,
        "ruby": 11900,
        "prerequisites": [],
        "attr1Id": 45,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 217005,
    "branchId": 217,
    "row": 3,
    "col": 3,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_507.webp",
    "name": {
      "vi": "Giảm Sát Thương Đội Thủ Thành I",
      "en": "Garrison DMG Reduction I"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 5,
        "timeSec": 5460,
        "fightforce": 1100,
        "timber": 7000,
        "stone": 7000,
        "ruby": 11900,
        "prerequisites": [
          {
            "nodeId": 217003,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 48,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 5,
        "timeSec": 8160,
        "fightforce": 2300,
        "timber": 8000,
        "stone": 8000,
        "ruby": 13600,
        "prerequisites": [],
        "attr1Id": 48,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 5,
        "timeSec": 12240,
        "fightforce": 4200,
        "timber": 19000,
        "stone": 19000,
        "ruby": 32300,
        "prerequisites": [
          {
            "nodeId": 217003,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 48,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 5,
        "timeSec": 18300,
        "fightforce": 6600,
        "timber": 32000,
        "stone": 32000,
        "ruby": 54400,
        "prerequisites": [],
        "attr1Id": 48,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 5,
        "timeSec": 34800,
        "fightforce": 9100,
        "timber": 35000,
        "stone": 35000,
        "ruby": 59500,
        "prerequisites": [],
        "attr1Id": 48,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 217006,
    "branchId": 217,
    "row": 4,
    "col": 2,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_509.webp",
    "name": {
      "vi": "Giới Hạn Xuất Chinh II",
      "en": "March Capacity II"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 5,
        "timeSec": 5460,
        "fightforce": 1100,
        "timber": 7000,
        "stone": 7000,
        "ruby": 11900,
        "prerequisites": [
          {
            "nodeId": 217004,
            "requiredLevel": 1
          },
          {
            "nodeId": 217005,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1019,
        "attr1Delta": 10,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 5,
        "timeSec": 8160,
        "fightforce": 2300,
        "timber": 8000,
        "stone": 8000,
        "ruby": 13600,
        "prerequisites": [],
        "attr1Id": 1019,
        "attr1Delta": 10,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 5,
        "timeSec": 12240,
        "fightforce": 4200,
        "timber": 19000,
        "stone": 19000,
        "ruby": 32300,
        "prerequisites": [
          {
            "nodeId": 217004,
            "requiredLevel": 3
          },
          {
            "nodeId": 217005,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 1019,
        "attr1Delta": 10,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 5,
        "timeSec": 18300,
        "fightforce": 6600,
        "timber": 32000,
        "stone": 32000,
        "ruby": 54400,
        "prerequisites": [],
        "attr1Id": 1019,
        "attr1Delta": 10,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 5,
        "timeSec": 34800,
        "fightforce": 9100,
        "timber": 35000,
        "stone": 35000,
        "ruby": 59500,
        "prerequisites": [],
        "attr1Id": 1019,
        "attr1Delta": 10,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 217007,
    "branchId": 217,
    "row": 5,
    "col": 1,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_310.webp",
    "name": {
      "vi": "Tốc Độ Hành Quân",
      "en": "March Speed"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 5,
        "timeSec": 5460,
        "fightforce": 1100,
        "timber": 7000,
        "stone": 7000,
        "ruby": 11900,
        "prerequisites": [
          {
            "nodeId": 217006,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1002,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 5,
        "timeSec": 8160,
        "fightforce": 2300,
        "timber": 8000,
        "stone": 8000,
        "ruby": 13600,
        "prerequisites": [],
        "attr1Id": 1002,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 5,
        "timeSec": 12240,
        "fightforce": 4200,
        "timber": 19000,
        "stone": 19000,
        "ruby": 32300,
        "prerequisites": [
          {
            "nodeId": 217006,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 1002,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 5,
        "timeSec": 18300,
        "fightforce": 6600,
        "timber": 32000,
        "stone": 32000,
        "ruby": 54400,
        "prerequisites": [],
        "attr1Id": 1002,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 5,
        "timeSec": 34800,
        "fightforce": 9100,
        "timber": 35000,
        "stone": 35000,
        "ruby": 59500,
        "prerequisites": [],
        "attr1Id": 1002,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 217008,
    "branchId": 217,
    "row": 5,
    "col": 3,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_307.webp",
    "name": {
      "vi": "Tải trọng quân đội",
      "en": "Troop Load Capacity"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 8,
        "timeSec": 5460,
        "fightforce": 1100,
        "timber": 7000,
        "stone": 7000,
        "ruby": 11900,
        "prerequisites": [
          {
            "nodeId": 217006,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1052,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 8,
        "timeSec": 8160,
        "fightforce": 2300,
        "timber": 8000,
        "stone": 8000,
        "ruby": 13600,
        "prerequisites": [],
        "attr1Id": 1052,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 8,
        "timeSec": 12240,
        "fightforce": 4200,
        "timber": 19000,
        "stone": 19000,
        "ruby": 32300,
        "prerequisites": [
          {
            "nodeId": 217006,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 1052,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 8,
        "timeSec": 18300,
        "fightforce": 6600,
        "timber": 32000,
        "stone": 32000,
        "ruby": 54400,
        "prerequisites": [],
        "attr1Id": 1052,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 8,
        "timeSec": 34800,
        "fightforce": 9100,
        "timber": 35000,
        "stone": 35000,
        "ruby": 59500,
        "prerequisites": [],
        "attr1Id": 1052,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 217009,
    "branchId": 217,
    "row": 6,
    "col": 2,
    "maxLevel": 1,
    "icon": "/images/tech/research/tech_1004.webp",
    "name": {
      "vi": "Mở khóa Rút Về",
      "en": "Unlock Recall"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 15,
        "timeSec": 18300,
        "fightforce": 6600,
        "timber": 19000,
        "stone": 19000,
        "ruby": 32300,
        "prerequisites": [
          {
            "nodeId": 217007,
            "requiredLevel": 1
          },
          {
            "nodeId": 217008,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 0,
        "attr1Delta": 0,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 217010,
    "branchId": 217,
    "row": 7,
    "col": 1,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_201.webp",
    "name": {
      "vi": "Tấn Công của Lính II",
      "en": "Troop Attack II"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 15,
        "timeSec": 34800,
        "fightforce": 2500,
        "timber": 35000,
        "stone": 35000,
        "ruby": 59500,
        "prerequisites": [
          {
            "nodeId": 217009,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 10103,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 15,
        "timeSec": 69540,
        "fightforce": 5500,
        "timber": 50000,
        "stone": 50000,
        "ruby": 85000,
        "prerequisites": [],
        "attr1Id": 10103,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 15,
        "timeSec": 132120,
        "fightforce": 9000,
        "timber": 70000,
        "stone": 70000,
        "ruby": 119000,
        "prerequisites": [],
        "attr1Id": 10103,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 15,
        "timeSec": 132120,
        "fightforce": 12500,
        "timber": 70000,
        "stone": 70000,
        "ruby": 119000,
        "prerequisites": [],
        "attr1Id": 10103,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 18,
        "timeSec": 237840,
        "fightforce": 17200,
        "timber": 130000,
        "stone": 130000,
        "ruby": 221000,
        "prerequisites": [],
        "attr1Id": 10103,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 217011,
    "branchId": 217,
    "row": 7,
    "col": 3,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_202.webp",
    "name": {
      "vi": "Lính HP II",
      "en": "Troop HP II"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 18,
        "timeSec": 34800,
        "fightforce": 2500,
        "timber": 35000,
        "stone": 35000,
        "ruby": 59500,
        "prerequisites": [
          {
            "nodeId": 217009,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 10104,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 18,
        "timeSec": 69540,
        "fightforce": 5500,
        "timber": 50000,
        "stone": 50000,
        "ruby": 85000,
        "prerequisites": [],
        "attr1Id": 10104,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 18,
        "timeSec": 132120,
        "fightforce": 9000,
        "timber": 70000,
        "stone": 70000,
        "ruby": 119000,
        "prerequisites": [],
        "attr1Id": 10104,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 18,
        "timeSec": 132120,
        "fightforce": 12500,
        "timber": 70000,
        "stone": 70000,
        "ruby": 119000,
        "prerequisites": [],
        "attr1Id": 10104,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 22,
        "timeSec": 237840,
        "fightforce": 17200,
        "timber": 130000,
        "stone": 130000,
        "ruby": 221000,
        "prerequisites": [],
        "attr1Id": 10104,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 217012,
    "branchId": 217,
    "row": 8,
    "col": 1,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_201.webp",
    "name": {
      "vi": "Sát thương công thành của đội ngũ II",
      "en": "Queue Siege Damage II"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 22,
        "timeSec": 34800,
        "fightforce": 2500,
        "timber": 35000,
        "stone": 35000,
        "ruby": 59500,
        "prerequisites": [
          {
            "nodeId": 217010,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 45,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 22,
        "timeSec": 69540,
        "fightforce": 5500,
        "timber": 50000,
        "stone": 50000,
        "ruby": 85000,
        "prerequisites": [],
        "attr1Id": 45,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 22,
        "timeSec": 132120,
        "fightforce": 9000,
        "timber": 70000,
        "stone": 70000,
        "ruby": 119000,
        "prerequisites": [
          {
            "nodeId": 217010,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 45,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 22,
        "timeSec": 132120,
        "fightforce": 12500,
        "timber": 70000,
        "stone": 70000,
        "ruby": 119000,
        "prerequisites": [],
        "attr1Id": 45,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 25,
        "timeSec": 237840,
        "fightforce": 17200,
        "timber": 130000,
        "stone": 130000,
        "ruby": 221000,
        "prerequisites": [],
        "attr1Id": 45,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 217013,
    "branchId": 217,
    "row": 8,
    "col": 3,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_202.webp",
    "name": {
      "vi": "Giảm Sát Thương Đội Thủ Thành II",
      "en": "Garrison DMG Reduction II"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 25,
        "timeSec": 34800,
        "fightforce": 2500,
        "timber": 35000,
        "stone": 35000,
        "ruby": 59500,
        "prerequisites": [
          {
            "nodeId": 217011,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 48,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 25,
        "timeSec": 69540,
        "fightforce": 5500,
        "timber": 50000,
        "stone": 50000,
        "ruby": 85000,
        "prerequisites": [],
        "attr1Id": 48,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 25,
        "timeSec": 132120,
        "fightforce": 9000,
        "timber": 70000,
        "stone": 70000,
        "ruby": 119000,
        "prerequisites": [
          {
            "nodeId": 217011,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 48,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 25,
        "timeSec": 132120,
        "fightforce": 12500,
        "timber": 70000,
        "stone": 70000,
        "ruby": 119000,
        "prerequisites": [],
        "attr1Id": 48,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 28,
        "timeSec": 237840,
        "fightforce": 17200,
        "timber": 130000,
        "stone": 130000,
        "ruby": 221000,
        "prerequisites": [],
        "attr1Id": 48,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 217014,
    "branchId": 217,
    "row": 9,
    "col": 2,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_509.webp",
    "name": {
      "vi": "Giới Hạn Xuất Chinh III",
      "en": "March Capacity III"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 28,
        "timeSec": 237840,
        "fightforce": 4700,
        "timber": 130000,
        "stone": 130000,
        "ruby": 221000,
        "prerequisites": [
          {
            "nodeId": 217012,
            "requiredLevel": 1
          },
          {
            "nodeId": 217013,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1019,
        "attr1Delta": 10,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 28,
        "timeSec": 404280,
        "fightforce": 10000,
        "timber": 160000,
        "stone": 160000,
        "ruby": 272000,
        "prerequisites": [],
        "attr1Id": 1019,
        "attr1Delta": 10,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 28,
        "timeSec": 646800,
        "fightforce": 17000,
        "timber": 280000,
        "stone": 280000,
        "ruby": 476000,
        "prerequisites": [
          {
            "nodeId": 217012,
            "requiredLevel": 3
          },
          {
            "nodeId": 217013,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 1019,
        "attr1Delta": 10,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 28,
        "timeSec": 646800,
        "fightforce": 24000,
        "timber": 280000,
        "stone": 280000,
        "ruby": 476000,
        "prerequisites": [],
        "attr1Id": 1019,
        "attr1Delta": 10,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 30,
        "timeSec": 970200,
        "fightforce": 31700,
        "timber": 340000,
        "stone": 340000,
        "ruby": 578000,
        "prerequisites": [],
        "attr1Id": 1019,
        "attr1Delta": 10,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 217015,
    "branchId": 217,
    "row": 10,
    "col": 1,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_310.webp",
    "name": {
      "vi": "Tốc độ đội ngũ II",
      "en": "Queue March Speed II"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 30,
        "timeSec": 237840,
        "fightforce": 4700,
        "timber": 130000,
        "stone": 130000,
        "ruby": 221000,
        "prerequisites": [
          {
            "nodeId": 217014,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1002,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 30,
        "timeSec": 404280,
        "fightforce": 10000,
        "timber": 160000,
        "stone": 160000,
        "ruby": 272000,
        "prerequisites": [],
        "attr1Id": 1002,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 30,
        "timeSec": 646800,
        "fightforce": 17000,
        "timber": 280000,
        "stone": 280000,
        "ruby": 476000,
        "prerequisites": [
          {
            "nodeId": 217014,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 1002,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 30,
        "timeSec": 646800,
        "fightforce": 24000,
        "timber": 280000,
        "stone": 280000,
        "ruby": 476000,
        "prerequisites": [],
        "attr1Id": 1002,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 32,
        "timeSec": 970200,
        "fightforce": 31700,
        "timber": 340000,
        "stone": 340000,
        "ruby": 578000,
        "prerequisites": [],
        "attr1Id": 1002,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 217016,
    "branchId": 217,
    "row": 10,
    "col": 3,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_307.webp",
    "name": {
      "vi": "Tải trọng quân đội",
      "en": "Troop Load Capacity"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 32,
        "timeSec": 237840,
        "fightforce": 4700,
        "timber": 130000,
        "stone": 130000,
        "ruby": 221000,
        "prerequisites": [
          {
            "nodeId": 217014,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1052,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 32,
        "timeSec": 404280,
        "fightforce": 10000,
        "timber": 160000,
        "stone": 160000,
        "ruby": 272000,
        "prerequisites": [],
        "attr1Id": 1052,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 32,
        "timeSec": 646800,
        "fightforce": 17000,
        "timber": 280000,
        "stone": 280000,
        "ruby": 476000,
        "prerequisites": [
          {
            "nodeId": 217014,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 1052,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 32,
        "timeSec": 646800,
        "fightforce": 24000,
        "timber": 280000,
        "stone": 280000,
        "ruby": 476000,
        "prerequisites": [],
        "attr1Id": 1052,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 35,
        "timeSec": 970200,
        "fightforce": 31700,
        "timber": 340000,
        "stone": 340000,
        "ruby": 578000,
        "prerequisites": [],
        "attr1Id": 1052,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 217017,
    "branchId": 217,
    "row": 11,
    "col": 1,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_201.webp",
    "name": {
      "vi": "Tấn Công của Lính III",
      "en": "Troop Attack III"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 35,
        "timeSec": 237840,
        "fightforce": 4700,
        "timber": 130000,
        "stone": 130000,
        "ruby": 221000,
        "prerequisites": [
          {
            "nodeId": 217015,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 10103,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 35,
        "timeSec": 404280,
        "fightforce": 10000,
        "timber": 160000,
        "stone": 160000,
        "ruby": 272000,
        "prerequisites": [],
        "attr1Id": 10103,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 35,
        "timeSec": 646800,
        "fightforce": 17000,
        "timber": 280000,
        "stone": 280000,
        "ruby": 476000,
        "prerequisites": [
          {
            "nodeId": 217015,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 10103,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 35,
        "timeSec": 646800,
        "fightforce": 24000,
        "timber": 280000,
        "stone": 280000,
        "ruby": 476000,
        "prerequisites": [],
        "attr1Id": 10103,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 35,
        "timeSec": 970200,
        "fightforce": 31700,
        "timber": 340000,
        "stone": 340000,
        "ruby": 578000,
        "prerequisites": [],
        "attr1Id": 10103,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 217018,
    "branchId": 217,
    "row": 11,
    "col": 3,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_202.webp",
    "name": {
      "vi": "Lính HP III",
      "en": "Troop HP III"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 35,
        "timeSec": 970200,
        "fightforce": 7700,
        "timber": 340000,
        "stone": 340000,
        "ruby": 578000,
        "prerequisites": [
          {
            "nodeId": 217016,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 10104,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 35,
        "timeSec": 1901640,
        "fightforce": 19900,
        "timber": 900000,
        "stone": 900000,
        "ruby": 1530000,
        "prerequisites": [],
        "attr1Id": 10104,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 35,
        "timeSec": 3213720,
        "fightforce": 35400,
        "timber": 1400000,
        "stone": 1400000,
        "ruby": 2380000,
        "prerequisites": [
          {
            "nodeId": 217016,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 10104,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 35,
        "timeSec": 4627740,
        "fightforce": 57900,
        "timber": 2900000,
        "stone": 2900000,
        "ruby": 4930000,
        "prerequisites": [],
        "attr1Id": 10104,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 35,
        "timeSec": 6663960,
        "fightforce": 88300,
        "timber": 6000000,
        "stone": 6000000,
        "ruby": 10200000,
        "prerequisites": [],
        "attr1Id": 10104,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 217019,
    "branchId": 217,
    "row": 12,
    "col": 1,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_201.webp",
    "name": {
      "vi": "ST Công Thành Của Đội III",
      "en": "Queue Siege Damage III"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 35,
        "timeSec": 970200,
        "fightforce": 7700,
        "timber": 340000,
        "stone": 340000,
        "ruby": 578000,
        "prerequisites": [
          {
            "nodeId": 217017,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 45,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 35,
        "timeSec": 1901640,
        "fightforce": 19900,
        "timber": 900000,
        "stone": 900000,
        "ruby": 1530000,
        "prerequisites": [],
        "attr1Id": 45,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 35,
        "timeSec": 3213720,
        "fightforce": 35400,
        "timber": 1400000,
        "stone": 1400000,
        "ruby": 2380000,
        "prerequisites": [
          {
            "nodeId": 217017,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 45,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 35,
        "timeSec": 4627740,
        "fightforce": 57900,
        "timber": 2900000,
        "stone": 2900000,
        "ruby": 4930000,
        "prerequisites": [],
        "attr1Id": 45,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 35,
        "timeSec": 6663960,
        "fightforce": 88300,
        "timber": 6000000,
        "stone": 6000000,
        "ruby": 10200000,
        "prerequisites": [],
        "attr1Id": 45,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 217020,
    "branchId": 217,
    "row": 12,
    "col": 3,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_202.webp",
    "name": {
      "vi": "Giảm Sát Thương Đội Thủ Thành III",
      "en": "Garrison DMG Reduction III"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 35,
        "timeSec": 1358280,
        "fightforce": 10300,
        "timber": 600000,
        "stone": 600000,
        "ruby": 1020000,
        "prerequisites": [
          {
            "nodeId": 217018,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 48,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 35,
        "timeSec": 2472120,
        "fightforce": 24200,
        "timber": 1100000,
        "stone": 1100000,
        "ruby": 1870000,
        "prerequisites": [],
        "attr1Id": 48,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 35,
        "timeSec": 3856440,
        "fightforce": 41500,
        "timber": 1800000,
        "stone": 1800000,
        "ruby": 3060000,
        "prerequisites": [
          {
            "nodeId": 217018,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 48,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 35,
        "timeSec": 5553300,
        "fightforce": 68200,
        "timber": 5000000,
        "stone": 5000000,
        "ruby": 8500000,
        "prerequisites": [],
        "attr1Id": 48,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 35,
        "timeSec": 7996740,
        "fightforce": 104200,
        "timber": 8000000,
        "stone": 8000000,
        "ruby": 13600000,
        "prerequisites": [],
        "attr1Id": 48,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 217021,
    "branchId": 217,
    "row": 14,
    "col": 2,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_509.webp",
    "name": {
      "vi": "Giới Hạn Xuất Chinh IV",
      "en": "March Capacity IV"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 35,
        "timeSec": 1901640,
        "fightforce": 12200,
        "timber": 900000,
        "stone": 900000,
        "ruby": 1530000,
        "prerequisites": [
          {
            "nodeId": 217019,
            "requiredLevel": 1
          },
          {
            "nodeId": 217020,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1019,
        "attr1Delta": 10,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 35,
        "timeSec": 3213720,
        "fightforce": 27700,
        "timber": 1400000,
        "stone": 1400000,
        "ruby": 2380000,
        "prerequisites": [],
        "attr1Id": 1019,
        "attr1Delta": 10,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 35,
        "timeSec": 4627740,
        "fightforce": 50200,
        "timber": 2900000,
        "stone": 2900000,
        "ruby": 4930000,
        "prerequisites": [
          {
            "nodeId": 217019,
            "requiredLevel": 3
          },
          {
            "nodeId": 217020,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 1019,
        "attr1Delta": 10,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 35,
        "timeSec": 6663960,
        "fightforce": 80600,
        "timber": 6000000,
        "stone": 6000000,
        "ruby": 10200000,
        "prerequisites": [],
        "attr1Id": 1019,
        "attr1Delta": 10,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 35,
        "timeSec": 9596040,
        "fightforce": 123100,
        "timber": 11000000,
        "stone": 11000000,
        "ruby": 18700000,
        "prerequisites": [],
        "attr1Id": 1019,
        "attr1Delta": 10,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 110101,
    "branchId": 11,
    "row": 1,
    "col": 1,
    "maxLevel": 10,
    "icon": "/images/tech/research/tech_302.webp",
    "name": {
      "vi": "Tốc độ thu thập Gỗ I",
      "en": "Timber Gathering Speed I"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 10,
        "timeSec": 619,
        "fightforce": 50,
        "timber": 2700,
        "stone": 2700,
        "ruby": 2135,
        "prerequisites": [],
        "attr1Id": 1004,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 10,
        "timeSec": 743,
        "fightforce": 150,
        "timber": 3250,
        "stone": 3250,
        "ruby": 2565,
        "prerequisites": [],
        "attr1Id": 1004,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 10,
        "timeSec": 866,
        "fightforce": 250,
        "timber": 3750,
        "stone": 3750,
        "ruby": 2990,
        "prerequisites": [],
        "attr1Id": 1004,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 10,
        "timeSec": 1052,
        "fightforce": 350,
        "timber": 4550,
        "stone": 4550,
        "ruby": 3630,
        "prerequisites": [],
        "attr1Id": 1004,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 10,
        "timeSec": 1238,
        "fightforce": 450,
        "timber": 5350,
        "stone": 5350,
        "ruby": 4270,
        "prerequisites": [],
        "attr1Id": 1004,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 6,
        "cottageLv": 10,
        "timeSec": 1547,
        "fightforce": 600,
        "timber": 6700,
        "stone": 6700,
        "ruby": 5340,
        "prerequisites": [],
        "attr1Id": 1004,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 7,
        "cottageLv": 10,
        "timeSec": 1918,
        "fightforce": 750,
        "timber": 8300,
        "stone": 8300,
        "ruby": 6620,
        "prerequisites": [],
        "attr1Id": 1004,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 8,
        "cottageLv": 10,
        "timeSec": 2413,
        "fightforce": 950,
        "timber": 10450,
        "stone": 10450,
        "ruby": 8325,
        "prerequisites": [],
        "attr1Id": 1004,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 9,
        "cottageLv": 10,
        "timeSec": 3032,
        "fightforce": 1200,
        "timber": 13100,
        "stone": 13100,
        "ruby": 10460,
        "prerequisites": [],
        "attr1Id": 1004,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 10,
        "cottageLv": 10,
        "timeSec": 3713,
        "fightforce": 1500,
        "timber": 16050,
        "stone": 16050,
        "ruby": 12810,
        "prerequisites": [],
        "attr1Id": 1004,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 110102,
    "branchId": 11,
    "row": 1,
    "col": 2,
    "maxLevel": 10,
    "icon": "/images/tech/research/tech_301.webp",
    "name": {
      "vi": "Tốc độ thu thập Ruby I",
      "en": "Ruby Gathering Speed I"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 10,
        "timeSec": 619,
        "fightforce": 50,
        "timber": 2700,
        "stone": 2700,
        "ruby": 2135,
        "prerequisites": [],
        "attr1Id": 1006,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 10,
        "timeSec": 743,
        "fightforce": 150,
        "timber": 3250,
        "stone": 3250,
        "ruby": 2565,
        "prerequisites": [],
        "attr1Id": 1006,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 10,
        "timeSec": 866,
        "fightforce": 250,
        "timber": 3750,
        "stone": 3750,
        "ruby": 2990,
        "prerequisites": [],
        "attr1Id": 1006,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 10,
        "timeSec": 1052,
        "fightforce": 350,
        "timber": 4550,
        "stone": 4550,
        "ruby": 3630,
        "prerequisites": [],
        "attr1Id": 1006,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 10,
        "timeSec": 1238,
        "fightforce": 450,
        "timber": 5350,
        "stone": 5350,
        "ruby": 4270,
        "prerequisites": [],
        "attr1Id": 1006,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 6,
        "cottageLv": 10,
        "timeSec": 1547,
        "fightforce": 600,
        "timber": 6700,
        "stone": 6700,
        "ruby": 5340,
        "prerequisites": [],
        "attr1Id": 1006,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 7,
        "cottageLv": 10,
        "timeSec": 1918,
        "fightforce": 750,
        "timber": 8300,
        "stone": 8300,
        "ruby": 6620,
        "prerequisites": [],
        "attr1Id": 1006,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 8,
        "cottageLv": 10,
        "timeSec": 2413,
        "fightforce": 950,
        "timber": 10450,
        "stone": 10450,
        "ruby": 8325,
        "prerequisites": [],
        "attr1Id": 1006,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 9,
        "cottageLv": 10,
        "timeSec": 3032,
        "fightforce": 1200,
        "timber": 13100,
        "stone": 13100,
        "ruby": 10460,
        "prerequisites": [],
        "attr1Id": 1006,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 10,
        "cottageLv": 10,
        "timeSec": 3713,
        "fightforce": 1500,
        "timber": 16050,
        "stone": 16050,
        "ruby": 12810,
        "prerequisites": [],
        "attr1Id": 1006,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 110103,
    "branchId": 11,
    "row": 1,
    "col": 3,
    "maxLevel": 10,
    "icon": "/images/tech/research/tech_303.webp",
    "name": {
      "vi": "Tốc độ thu thập Đá I",
      "en": "Stone Gathering Speed I"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 10,
        "timeSec": 619,
        "fightforce": 50,
        "timber": 2700,
        "stone": 2700,
        "ruby": 2135,
        "prerequisites": [],
        "attr1Id": 1005,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 10,
        "timeSec": 743,
        "fightforce": 150,
        "timber": 3250,
        "stone": 3250,
        "ruby": 2565,
        "prerequisites": [],
        "attr1Id": 1005,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 10,
        "timeSec": 866,
        "fightforce": 250,
        "timber": 3750,
        "stone": 3750,
        "ruby": 2990,
        "prerequisites": [],
        "attr1Id": 1005,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 10,
        "timeSec": 1052,
        "fightforce": 350,
        "timber": 4550,
        "stone": 4550,
        "ruby": 3630,
        "prerequisites": [],
        "attr1Id": 1005,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 10,
        "timeSec": 1238,
        "fightforce": 450,
        "timber": 5350,
        "stone": 5350,
        "ruby": 4270,
        "prerequisites": [],
        "attr1Id": 1005,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 6,
        "cottageLv": 10,
        "timeSec": 1547,
        "fightforce": 600,
        "timber": 6700,
        "stone": 6700,
        "ruby": 5340,
        "prerequisites": [],
        "attr1Id": 1005,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 7,
        "cottageLv": 10,
        "timeSec": 1918,
        "fightforce": 750,
        "timber": 8300,
        "stone": 8300,
        "ruby": 6620,
        "prerequisites": [],
        "attr1Id": 1005,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 8,
        "cottageLv": 10,
        "timeSec": 2413,
        "fightforce": 950,
        "timber": 10450,
        "stone": 10450,
        "ruby": 8325,
        "prerequisites": [],
        "attr1Id": 1005,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 9,
        "cottageLv": 10,
        "timeSec": 3032,
        "fightforce": 1200,
        "timber": 13100,
        "stone": 13100,
        "ruby": 10460,
        "prerequisites": [],
        "attr1Id": 1005,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 10,
        "cottageLv": 10,
        "timeSec": 3713,
        "fightforce": 1500,
        "timber": 16050,
        "stone": 16050,
        "ruby": 12810,
        "prerequisites": [],
        "attr1Id": 1005,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 110202,
    "branchId": 11,
    "row": 2,
    "col": 2,
    "maxLevel": 1,
    "icon": "/images/tech/research/tech_1101.webp",
    "name": {
      "vi": "Mở khóa thưởng cấp thấp",
      "en": "Unlock Basic Rewards"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 10,
        "timeSec": 34283,
        "fightforce": 800,
        "timber": 44350,
        "stone": 44350,
        "ruby": 35475,
        "prerequisites": [
          {
            "nodeId": 110101,
            "requiredLevel": 1
          },
          {
            "nodeId": 110102,
            "requiredLevel": 1
          },
          {
            "nodeId": 110103,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 0,
        "attr1Delta": 0,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 110301,
    "branchId": 11,
    "row": 3,
    "col": 1,
    "maxLevel": 1,
    "icon": "/images/tech/research/tech_1102.webp",
    "name": {
      "vi": "Nhận thêm tài nguyên",
      "en": "Extra Resource Gain"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 10,
        "timeSec": 68567,
        "fightforce": 1100,
        "timber": 59150,
        "stone": 59150,
        "ruby": 47300,
        "prerequisites": [
          {
            "nodeId": 110202,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 0,
        "attr1Delta": 0,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 110303,
    "branchId": 11,
    "row": 3,
    "col": 3,
    "maxLevel": 10,
    "icon": "/images/tech/research/tech_307.webp",
    "name": {
      "vi": "Tải trọng quân đội",
      "en": "Troop Load Capacity"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 10,
        "timeSec": 30942,
        "fightforce": 500,
        "timber": 26700,
        "stone": 26700,
        "ruby": 21345,
        "prerequisites": [
          {
            "nodeId": 110202,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1052,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 10,
        "timeSec": 37130,
        "fightforce": 1100,
        "timber": 32050,
        "stone": 32050,
        "ruby": 25615,
        "prerequisites": [
          {
            "nodeId": 110202,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1052,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 10,
        "timeSec": 43318,
        "fightforce": 1800,
        "timber": 37400,
        "stone": 37400,
        "ruby": 29885,
        "prerequisites": [
          {
            "nodeId": 110202,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1052,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 10,
        "timeSec": 52601,
        "fightforce": 2650,
        "timber": 45400,
        "stone": 45400,
        "ruby": 36285,
        "prerequisites": [
          {
            "nodeId": 110202,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1052,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 10,
        "timeSec": 61883,
        "fightforce": 3650,
        "timber": 53400,
        "stone": 53400,
        "ruby": 42690,
        "prerequisites": [
          {
            "nodeId": 110202,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1052,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 6,
        "cottageLv": 10,
        "timeSec": 77354,
        "fightforce": 4900,
        "timber": 66700,
        "stone": 66700,
        "ruby": 53360,
        "prerequisites": [
          {
            "nodeId": 110202,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1052,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 7,
        "cottageLv": 10,
        "timeSec": 95919,
        "fightforce": 6450,
        "timber": 82750,
        "stone": 82750,
        "ruby": 66165,
        "prerequisites": [
          {
            "nodeId": 110202,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1052,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 8,
        "cottageLv": 10,
        "timeSec": 120673,
        "fightforce": 8400,
        "timber": 104050,
        "stone": 104050,
        "ruby": 83240,
        "prerequisites": [
          {
            "nodeId": 110202,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1052,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 9,
        "cottageLv": 10,
        "timeSec": 151614,
        "fightforce": 10850,
        "timber": 130750,
        "stone": 130750,
        "ruby": 104585,
        "prerequisites": [
          {
            "nodeId": 110202,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1052,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 10,
        "cottageLv": 10,
        "timeSec": 185650,
        "fightforce": 13850,
        "timber": 160100,
        "stone": 160100,
        "ruby": 128060,
        "prerequisites": [
          {
            "nodeId": 110202,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1052,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 110401,
    "branchId": 11,
    "row": 4,
    "col": 1,
    "maxLevel": 10,
    "icon": "/images/tech/research/tech_510.webp",
    "name": {
      "vi": "Tốc Độ Huấn Luyện Lính",
      "en": "Troop Training Speed"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 10,
        "timeSec": 37130,
        "fightforce": 600,
        "timber": 32050,
        "stone": 32050,
        "ruby": 25615,
        "prerequisites": [
          {
            "nodeId": 110301,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1016,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 10,
        "timeSec": 44556,
        "fightforce": 1350,
        "timber": 38450,
        "stone": 38450,
        "ruby": 30735,
        "prerequisites": [
          {
            "nodeId": 110301,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1016,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 10,
        "timeSec": 51982,
        "fightforce": 2200,
        "timber": 44850,
        "stone": 44850,
        "ruby": 35860,
        "prerequisites": [
          {
            "nodeId": 110301,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1016,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 10,
        "timeSec": 63121,
        "fightforce": 3250,
        "timber": 54450,
        "stone": 54450,
        "ruby": 43540,
        "prerequisites": [
          {
            "nodeId": 110301,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1016,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 10,
        "timeSec": 74260,
        "fightforce": 4450,
        "timber": 64050,
        "stone": 64050,
        "ruby": 51225,
        "prerequisites": [
          {
            "nodeId": 110301,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1016,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 6,
        "cottageLv": 10,
        "timeSec": 92825,
        "fightforce": 5950,
        "timber": 80050,
        "stone": 80050,
        "ruby": 64030,
        "prerequisites": [
          {
            "nodeId": 110301,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1016,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 7,
        "cottageLv": 10,
        "timeSec": 115103,
        "fightforce": 7800,
        "timber": 99250,
        "stone": 99250,
        "ruby": 79400,
        "prerequisites": [
          {
            "nodeId": 110301,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1016,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 8,
        "cottageLv": 10,
        "timeSec": 144807,
        "fightforce": 10150,
        "timber": 124900,
        "stone": 124900,
        "ruby": 99885,
        "prerequisites": [
          {
            "nodeId": 110301,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1016,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 9,
        "cottageLv": 10,
        "timeSec": 181937,
        "fightforce": 13100,
        "timber": 156900,
        "stone": 156900,
        "ruby": 125500,
        "prerequisites": [
          {
            "nodeId": 110301,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1016,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 10,
        "cottageLv": 10,
        "timeSec": 222780,
        "fightforce": 16700,
        "timber": 192100,
        "stone": 192100,
        "ruby": 153670,
        "prerequisites": [
          {
            "nodeId": 110301,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1016,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 110403,
    "branchId": 11,
    "row": 4,
    "col": 3,
    "maxLevel": 10,
    "icon": "/images/tech/research/tech_300.webp",
    "name": {
      "vi": "Tốc độ Xây I",
      "en": "Construction Speed I"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 10,
        "timeSec": 37130,
        "fightforce": 600,
        "timber": 32050,
        "stone": 32050,
        "ruby": 25615,
        "prerequisites": [
          {
            "nodeId": 110303,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1034,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 10,
        "timeSec": 44556,
        "fightforce": 1350,
        "timber": 38450,
        "stone": 38450,
        "ruby": 30735,
        "prerequisites": [
          {
            "nodeId": 110303,
            "requiredLevel": 2
          }
        ],
        "attr1Id": 1034,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 10,
        "timeSec": 51982,
        "fightforce": 2200,
        "timber": 44850,
        "stone": 44850,
        "ruby": 35860,
        "prerequisites": [
          {
            "nodeId": 110303,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 1034,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 10,
        "timeSec": 63121,
        "fightforce": 3250,
        "timber": 54450,
        "stone": 54450,
        "ruby": 43540,
        "prerequisites": [
          {
            "nodeId": 110303,
            "requiredLevel": 4
          }
        ],
        "attr1Id": 1034,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 10,
        "timeSec": 74260,
        "fightforce": 4450,
        "timber": 64050,
        "stone": 64050,
        "ruby": 51225,
        "prerequisites": [
          {
            "nodeId": 110303,
            "requiredLevel": 5
          }
        ],
        "attr1Id": 1034,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 6,
        "cottageLv": 10,
        "timeSec": 92825,
        "fightforce": 5950,
        "timber": 80050,
        "stone": 80050,
        "ruby": 64030,
        "prerequisites": [
          {
            "nodeId": 110303,
            "requiredLevel": 6
          }
        ],
        "attr1Id": 1034,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 7,
        "cottageLv": 10,
        "timeSec": 115103,
        "fightforce": 7800,
        "timber": 99250,
        "stone": 99250,
        "ruby": 79400,
        "prerequisites": [
          {
            "nodeId": 110303,
            "requiredLevel": 7
          }
        ],
        "attr1Id": 1034,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 8,
        "cottageLv": 10,
        "timeSec": 144807,
        "fightforce": 10150,
        "timber": 124900,
        "stone": 124900,
        "ruby": 99885,
        "prerequisites": [
          {
            "nodeId": 110303,
            "requiredLevel": 8
          }
        ],
        "attr1Id": 1034,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 9,
        "cottageLv": 10,
        "timeSec": 181937,
        "fightforce": 13100,
        "timber": 156900,
        "stone": 156900,
        "ruby": 125500,
        "prerequisites": [
          {
            "nodeId": 110303,
            "requiredLevel": 9
          }
        ],
        "attr1Id": 1034,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 10,
        "cottageLv": 10,
        "timeSec": 222780,
        "fightforce": 16700,
        "timber": 192100,
        "stone": 192100,
        "ruby": 153670,
        "prerequisites": [
          {
            "nodeId": 110303,
            "requiredLevel": 10
          }
        ],
        "attr1Id": 1034,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 110502,
    "branchId": 11,
    "row": 5,
    "col": 2,
    "maxLevel": 1,
    "icon": "/images/tech/research/tech_1103.webp",
    "name": {
      "vi": "Mở khóa thưởng cao cấp",
      "en": "Unlock Advanced Rewards"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 15,
        "timeSec": 119992,
        "fightforce": 1950,
        "timber": 103500,
        "stone": 103500,
        "ruby": 82770,
        "prerequisites": [
          {
            "nodeId": 110401,
            "requiredLevel": 8
          },
          {
            "nodeId": 110403,
            "requiredLevel": 8
          }
        ],
        "attr1Id": 0,
        "attr1Delta": 0,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 110602,
    "branchId": 11,
    "row": 6,
    "col": 2,
    "maxLevel": 10,
    "icon": "/images/tech/research/tech_1104.webp",
    "name": {
      "vi": "Điểm Hoang Dã Quân Bị Hội",
      "en": "GAR Wild Hunt Points"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 15,
        "timeSec": 55695,
        "fightforce": 900,
        "timber": 48050,
        "stone": 48050,
        "ruby": 38420,
        "prerequisites": [
          {
            "nodeId": 110502,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1079,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 15,
        "timeSec": 66834,
        "fightforce": 2000,
        "timber": 57650,
        "stone": 57650,
        "ruby": 46105,
        "prerequisites": [
          {
            "nodeId": 110502,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1079,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 15,
        "timeSec": 77973,
        "fightforce": 3300,
        "timber": 67250,
        "stone": 67250,
        "ruby": 53785,
        "prerequisites": [
          {
            "nodeId": 110502,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1079,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 15,
        "timeSec": 94682,
        "fightforce": 4850,
        "timber": 81650,
        "stone": 81650,
        "ruby": 65310,
        "prerequisites": [
          {
            "nodeId": 110502,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1079,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 15,
        "timeSec": 111390,
        "fightforce": 6650,
        "timber": 96050,
        "stone": 96050,
        "ruby": 76835,
        "prerequisites": [
          {
            "nodeId": 110502,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1079,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 6,
        "cottageLv": 15,
        "timeSec": 139238,
        "fightforce": 8900,
        "timber": 120100,
        "stone": 120100,
        "ruby": 96045,
        "prerequisites": [
          {
            "nodeId": 110502,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1079,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 7,
        "cottageLv": 15,
        "timeSec": 172655,
        "fightforce": 11700,
        "timber": 148900,
        "stone": 148900,
        "ruby": 119095,
        "prerequisites": [
          {
            "nodeId": 110502,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1079,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 8,
        "cottageLv": 15,
        "timeSec": 217211,
        "fightforce": 15200,
        "timber": 187300,
        "stone": 187300,
        "ruby": 149830,
        "prerequisites": [
          {
            "nodeId": 110502,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1079,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 9,
        "cottageLv": 15,
        "timeSec": 272906,
        "fightforce": 19600,
        "timber": 235350,
        "stone": 235350,
        "ruby": 188245,
        "prerequisites": [
          {
            "nodeId": 110502,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1079,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 10,
        "cottageLv": 15,
        "timeSec": 334170,
        "fightforce": 25000,
        "timber": 288150,
        "stone": 288150,
        "ruby": 230505,
        "prerequisites": [
          {
            "nodeId": 110502,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1079,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 110701,
    "branchId": 11,
    "row": 7,
    "col": 1,
    "maxLevel": 10,
    "icon": "/images/tech/research/tech_1106.webp",
    "name": {
      "vi": "Điểm Công Trình Quân Bị Hội",
      "en": "GAR Construction Points"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 15,
        "timeSec": 74260,
        "fightforce": 1200,
        "timber": 64050,
        "stone": 64050,
        "ruby": 51225,
        "prerequisites": [
          {
            "nodeId": 110602,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1080,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 15,
        "timeSec": 89112,
        "fightforce": 2650,
        "timber": 76850,
        "stone": 76850,
        "ruby": 61470,
        "prerequisites": [
          {
            "nodeId": 110602,
            "requiredLevel": 2
          }
        ],
        "attr1Id": 1080,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 15,
        "timeSec": 103964,
        "fightforce": 4350,
        "timber": 89650,
        "stone": 89650,
        "ruby": 71715,
        "prerequisites": [
          {
            "nodeId": 110602,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 1080,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 15,
        "timeSec": 126242,
        "fightforce": 6400,
        "timber": 108850,
        "stone": 108850,
        "ruby": 87080,
        "prerequisites": [
          {
            "nodeId": 110602,
            "requiredLevel": 4
          }
        ],
        "attr1Id": 1080,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 15,
        "timeSec": 148520,
        "fightforce": 8800,
        "timber": 128100,
        "stone": 128100,
        "ruby": 102450,
        "prerequisites": [
          {
            "nodeId": 110602,
            "requiredLevel": 5
          }
        ],
        "attr1Id": 1080,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 6,
        "cottageLv": 15,
        "timeSec": 185650,
        "fightforce": 11800,
        "timber": 160100,
        "stone": 160100,
        "ruby": 128060,
        "prerequisites": [
          {
            "nodeId": 110602,
            "requiredLevel": 6
          }
        ],
        "attr1Id": 1080,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 7,
        "cottageLv": 15,
        "timeSec": 230206,
        "fightforce": 15500,
        "timber": 198500,
        "stone": 198500,
        "ruby": 158795,
        "prerequisites": [
          {
            "nodeId": 110602,
            "requiredLevel": 7
          }
        ],
        "attr1Id": 1080,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 8,
        "cottageLv": 15,
        "timeSec": 289614,
        "fightforce": 20150,
        "timber": 249750,
        "stone": 249750,
        "ruby": 199770,
        "prerequisites": [
          {
            "nodeId": 110602,
            "requiredLevel": 8
          }
        ],
        "attr1Id": 1080,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 9,
        "cottageLv": 15,
        "timeSec": 363874,
        "fightforce": 26000,
        "timber": 313750,
        "stone": 313750,
        "ruby": 250995,
        "prerequisites": [
          {
            "nodeId": 110602,
            "requiredLevel": 9
          }
        ],
        "attr1Id": 1080,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 10,
        "cottageLv": 15,
        "timeSec": 445560,
        "fightforce": 33150,
        "timber": 384200,
        "stone": 384200,
        "ruby": 307340,
        "prerequisites": [
          {
            "nodeId": 110602,
            "requiredLevel": 10
          }
        ],
        "attr1Id": 1080,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 110703,
    "branchId": 11,
    "row": 7,
    "col": 3,
    "maxLevel": 10,
    "icon": "/images/tech/research/tech_1107.webp",
    "name": {
      "vi": "Điểm Công Nghệ Quân Bị Hội",
      "en": "GAR Tech Points"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 15,
        "timeSec": 74260,
        "fightforce": 1200,
        "timber": 64050,
        "stone": 64050,
        "ruby": 51225,
        "prerequisites": [
          {
            "nodeId": 110602,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1083,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 15,
        "timeSec": 89112,
        "fightforce": 2650,
        "timber": 76850,
        "stone": 76850,
        "ruby": 61470,
        "prerequisites": [
          {
            "nodeId": 110602,
            "requiredLevel": 2
          }
        ],
        "attr1Id": 1083,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 15,
        "timeSec": 103964,
        "fightforce": 4350,
        "timber": 89650,
        "stone": 89650,
        "ruby": 71715,
        "prerequisites": [
          {
            "nodeId": 110602,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 1083,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 15,
        "timeSec": 126242,
        "fightforce": 6400,
        "timber": 108850,
        "stone": 108850,
        "ruby": 87080,
        "prerequisites": [
          {
            "nodeId": 110602,
            "requiredLevel": 4
          }
        ],
        "attr1Id": 1083,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 15,
        "timeSec": 148520,
        "fightforce": 8800,
        "timber": 128100,
        "stone": 128100,
        "ruby": 102450,
        "prerequisites": [
          {
            "nodeId": 110602,
            "requiredLevel": 5
          }
        ],
        "attr1Id": 1083,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 6,
        "cottageLv": 15,
        "timeSec": 185650,
        "fightforce": 11800,
        "timber": 160100,
        "stone": 160100,
        "ruby": 128060,
        "prerequisites": [
          {
            "nodeId": 110602,
            "requiredLevel": 6
          }
        ],
        "attr1Id": 1083,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 7,
        "cottageLv": 15,
        "timeSec": 230206,
        "fightforce": 15500,
        "timber": 198500,
        "stone": 198500,
        "ruby": 158795,
        "prerequisites": [
          {
            "nodeId": 110602,
            "requiredLevel": 7
          }
        ],
        "attr1Id": 1083,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 8,
        "cottageLv": 15,
        "timeSec": 289614,
        "fightforce": 20150,
        "timber": 249750,
        "stone": 249750,
        "ruby": 199770,
        "prerequisites": [
          {
            "nodeId": 110602,
            "requiredLevel": 8
          }
        ],
        "attr1Id": 1083,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 9,
        "cottageLv": 15,
        "timeSec": 363874,
        "fightforce": 26000,
        "timber": 313750,
        "stone": 313750,
        "ruby": 250995,
        "prerequisites": [
          {
            "nodeId": 110602,
            "requiredLevel": 9
          }
        ],
        "attr1Id": 1083,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 10,
        "cottageLv": 15,
        "timeSec": 445560,
        "fightforce": 33150,
        "timber": 384200,
        "stone": 384200,
        "ruby": 307340,
        "prerequisites": [
          {
            "nodeId": 110602,
            "requiredLevel": 10
          }
        ],
        "attr1Id": 1083,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 110801,
    "branchId": 11,
    "row": 8,
    "col": 1,
    "maxLevel": 10,
    "icon": "/images/tech/research/tech_1108.webp",
    "name": {
      "vi": "Điểm Chiêu Mộ Quân Bị Hội",
      "en": "GAR Recruitment Points"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 15,
        "timeSec": 86637,
        "fightforce": 1400,
        "timber": 74750,
        "stone": 74750,
        "ruby": 59765,
        "prerequisites": [
          {
            "nodeId": 110701,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1082,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 15,
        "timeSec": 103964,
        "fightforce": 3100,
        "timber": 89650,
        "stone": 89650,
        "ruby": 71715,
        "prerequisites": [
          {
            "nodeId": 110701,
            "requiredLevel": 2
          }
        ],
        "attr1Id": 1082,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 15,
        "timeSec": 121291,
        "fightforce": 5050,
        "timber": 104600,
        "stone": 104600,
        "ruby": 83665,
        "prerequisites": [
          {
            "nodeId": 110701,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 1082,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 15,
        "timeSec": 147282,
        "fightforce": 7450,
        "timber": 127000,
        "stone": 127000,
        "ruby": 101595,
        "prerequisites": [
          {
            "nodeId": 110701,
            "requiredLevel": 4
          }
        ],
        "attr1Id": 1082,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 15,
        "timeSec": 173273,
        "fightforce": 10250,
        "timber": 149450,
        "stone": 149450,
        "ruby": 119525,
        "prerequisites": [
          {
            "nodeId": 110701,
            "requiredLevel": 5
          }
        ],
        "attr1Id": 1082,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 6,
        "cottageLv": 15,
        "timeSec": 216592,
        "fightforce": 13750,
        "timber": 186800,
        "stone": 186800,
        "ruby": 149405,
        "prerequisites": [
          {
            "nodeId": 110701,
            "requiredLevel": 6
          }
        ],
        "attr1Id": 1082,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 7,
        "cottageLv": 15,
        "timeSec": 268574,
        "fightforce": 18100,
        "timber": 231600,
        "stone": 231600,
        "ruby": 185260,
        "prerequisites": [
          {
            "nodeId": 110701,
            "requiredLevel": 7
          }
        ],
        "attr1Id": 1082,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 8,
        "cottageLv": 15,
        "timeSec": 337883,
        "fightforce": 23550,
        "timber": 291350,
        "stone": 291350,
        "ruby": 233065,
        "prerequisites": [
          {
            "nodeId": 110701,
            "requiredLevel": 8
          }
        ],
        "attr1Id": 1082,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 9,
        "cottageLv": 15,
        "timeSec": 424520,
        "fightforce": 30400,
        "timber": 366050,
        "stone": 366050,
        "ruby": 292825,
        "prerequisites": [
          {
            "nodeId": 110701,
            "requiredLevel": 9
          }
        ],
        "attr1Id": 1082,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 10,
        "cottageLv": 15,
        "timeSec": 519820,
        "fightforce": 38750,
        "timber": 448250,
        "stone": 448250,
        "ruby": 358565,
        "prerequisites": [
          {
            "nodeId": 110701,
            "requiredLevel": 10
          }
        ],
        "attr1Id": 1082,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 110803,
    "branchId": 11,
    "row": 8,
    "col": 3,
    "maxLevel": 10,
    "icon": "/images/tech/research/tech_1109.webp",
    "name": {
      "vi": "Điểm Huấn Luyện Lính Quân Bị Hội",
      "en": "GAR Troop Training Points"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 15,
        "timeSec": 86637,
        "fightforce": 1400,
        "timber": 74750,
        "stone": 74750,
        "ruby": 59765,
        "prerequisites": [
          {
            "nodeId": 110703,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1081,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 15,
        "timeSec": 103964,
        "fightforce": 3100,
        "timber": 89650,
        "stone": 89650,
        "ruby": 71715,
        "prerequisites": [
          {
            "nodeId": 110703,
            "requiredLevel": 2
          }
        ],
        "attr1Id": 1081,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 15,
        "timeSec": 121291,
        "fightforce": 5050,
        "timber": 104600,
        "stone": 104600,
        "ruby": 83665,
        "prerequisites": [
          {
            "nodeId": 110703,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 1081,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 15,
        "timeSec": 147282,
        "fightforce": 7450,
        "timber": 127000,
        "stone": 127000,
        "ruby": 101595,
        "prerequisites": [
          {
            "nodeId": 110703,
            "requiredLevel": 4
          }
        ],
        "attr1Id": 1081,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 15,
        "timeSec": 173273,
        "fightforce": 10250,
        "timber": 149450,
        "stone": 149450,
        "ruby": 119525,
        "prerequisites": [
          {
            "nodeId": 110703,
            "requiredLevel": 5
          }
        ],
        "attr1Id": 1081,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 6,
        "cottageLv": 15,
        "timeSec": 216592,
        "fightforce": 13750,
        "timber": 186800,
        "stone": 186800,
        "ruby": 149405,
        "prerequisites": [
          {
            "nodeId": 110703,
            "requiredLevel": 6
          }
        ],
        "attr1Id": 1081,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 7,
        "cottageLv": 15,
        "timeSec": 268574,
        "fightforce": 18100,
        "timber": 231600,
        "stone": 231600,
        "ruby": 185260,
        "prerequisites": [
          {
            "nodeId": 110703,
            "requiredLevel": 7
          }
        ],
        "attr1Id": 1081,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 8,
        "cottageLv": 15,
        "timeSec": 337883,
        "fightforce": 23550,
        "timber": 291350,
        "stone": 291350,
        "ruby": 233065,
        "prerequisites": [
          {
            "nodeId": 110703,
            "requiredLevel": 8
          }
        ],
        "attr1Id": 1081,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 9,
        "cottageLv": 15,
        "timeSec": 424520,
        "fightforce": 30400,
        "timber": 366050,
        "stone": 366050,
        "ruby": 292825,
        "prerequisites": [
          {
            "nodeId": 110703,
            "requiredLevel": 9
          }
        ],
        "attr1Id": 1081,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 10,
        "cottageLv": 15,
        "timeSec": 519820,
        "fightforce": 38750,
        "timber": 448250,
        "stone": 448250,
        "ruby": 358565,
        "prerequisites": [
          {
            "nodeId": 110703,
            "requiredLevel": 10
          }
        ],
        "attr1Id": 1081,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 110902,
    "branchId": 11,
    "row": 9,
    "col": 2,
    "maxLevel": 10,
    "icon": "/images/tech/research/tech_1110.webp",
    "name": {
      "vi": "Điểm Diệt Địch Của Hội",
      "en": "GAR Enemy Kill Points"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 15,
        "timeSec": 92825,
        "fightforce": 1500,
        "timber": 80050,
        "stone": 80050,
        "ruby": 64030,
        "prerequisites": [
          {
            "nodeId": 110801,
            "requiredLevel": 8
          },
          {
            "nodeId": 110803,
            "requiredLevel": 8
          }
        ],
        "attr1Id": 1085,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 15,
        "timeSec": 111390,
        "fightforce": 3300,
        "timber": 96050,
        "stone": 96050,
        "ruby": 76835,
        "prerequisites": [
          {
            "nodeId": 110801,
            "requiredLevel": 8
          },
          {
            "nodeId": 110803,
            "requiredLevel": 8
          }
        ],
        "attr1Id": 1085,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 15,
        "timeSec": 129955,
        "fightforce": 5400,
        "timber": 112100,
        "stone": 112100,
        "ruby": 89645,
        "prerequisites": [
          {
            "nodeId": 110801,
            "requiredLevel": 8
          },
          {
            "nodeId": 110803,
            "requiredLevel": 8
          }
        ],
        "attr1Id": 1085,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 15,
        "timeSec": 157803,
        "fightforce": 7950,
        "timber": 136100,
        "stone": 136100,
        "ruby": 108850,
        "prerequisites": [
          {
            "nodeId": 110801,
            "requiredLevel": 8
          },
          {
            "nodeId": 110803,
            "requiredLevel": 8
          }
        ],
        "attr1Id": 1085,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 15,
        "timeSec": 185650,
        "fightforce": 10950,
        "timber": 160100,
        "stone": 160100,
        "ruby": 128060,
        "prerequisites": [
          {
            "nodeId": 110801,
            "requiredLevel": 8
          },
          {
            "nodeId": 110803,
            "requiredLevel": 8
          }
        ],
        "attr1Id": 1085,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 6,
        "cottageLv": 15,
        "timeSec": 232063,
        "fightforce": 14700,
        "timber": 200100,
        "stone": 200100,
        "ruby": 160075,
        "prerequisites": [
          {
            "nodeId": 110801,
            "requiredLevel": 8
          },
          {
            "nodeId": 110803,
            "requiredLevel": 8
          }
        ],
        "attr1Id": 1085,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 7,
        "cottageLv": 15,
        "timeSec": 287758,
        "fightforce": 19350,
        "timber": 248150,
        "stone": 248150,
        "ruby": 198490,
        "prerequisites": [
          {
            "nodeId": 110801,
            "requiredLevel": 8
          },
          {
            "nodeId": 110803,
            "requiredLevel": 8
          }
        ],
        "attr1Id": 1085,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 8,
        "cottageLv": 15,
        "timeSec": 362018,
        "fightforce": 25200,
        "timber": 312150,
        "stone": 312150,
        "ruby": 249715,
        "prerequisites": [
          {
            "nodeId": 110801,
            "requiredLevel": 8
          },
          {
            "nodeId": 110803,
            "requiredLevel": 8
          }
        ],
        "attr1Id": 1085,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 9,
        "cottageLv": 15,
        "timeSec": 454843,
        "fightforce": 32500,
        "timber": 392200,
        "stone": 392200,
        "ruby": 313745,
        "prerequisites": [
          {
            "nodeId": 110801,
            "requiredLevel": 8
          },
          {
            "nodeId": 110803,
            "requiredLevel": 8
          }
        ],
        "attr1Id": 1085,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 10,
        "cottageLv": 15,
        "timeSec": 556950,
        "fightforce": 41450,
        "timber": 480250,
        "stone": 480250,
        "ruby": 384175,
        "prerequisites": [
          {
            "nodeId": 110801,
            "requiredLevel": 8
          },
          {
            "nodeId": 110803,
            "requiredLevel": 8
          }
        ],
        "attr1Id": 1085,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 111002,
    "branchId": 11,
    "row": 10,
    "col": 2,
    "maxLevel": 1,
    "icon": "/images/tech/research/tech_1111.webp",
    "name": {
      "vi": "Một lần nữa",
      "en": "One More Time"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 20,
        "timeSec": 308550,
        "fightforce": 4950,
        "timber": 266050,
        "stone": 266050,
        "ruby": 212835,
        "prerequisites": [
          {
            "nodeId": 110902,
            "requiredLevel": 10
          }
        ],
        "attr1Id": 0,
        "attr1Delta": 0,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 120101,
    "branchId": 12,
    "row": 1,
    "col": 1,
    "maxLevel": 10,
    "icon": "/images/tech/research/tech_201.webp",
    "name": {
      "vi": "Tấn Công của Anh Hùng I",
      "en": "Hero Attack I"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 10,
        "timeSec": 2894,
        "fightforce": 150,
        "timber": 7200,
        "stone": 7200,
        "ruby": 6195,
        "prerequisites": [],
        "attr1Id": 103,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 10,
        "timeSec": 3473,
        "fightforce": 350,
        "timber": 8600,
        "stone": 8600,
        "ruby": 7435,
        "prerequisites": [],
        "attr1Id": 103,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 10,
        "timeSec": 4052,
        "fightforce": 550,
        "timber": 10050,
        "stone": 10050,
        "ruby": 8675,
        "prerequisites": [],
        "attr1Id": 103,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 10,
        "timeSec": 4920,
        "fightforce": 800,
        "timber": 12200,
        "stone": 12200,
        "ruby": 10530,
        "prerequisites": [],
        "attr1Id": 103,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 10,
        "timeSec": 5788,
        "fightforce": 1100,
        "timber": 14350,
        "stone": 14350,
        "ruby": 12390,
        "prerequisites": [],
        "attr1Id": 103,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 6,
        "cottageLv": 10,
        "timeSec": 7235,
        "fightforce": 1450,
        "timber": 17950,
        "stone": 17950,
        "ruby": 15485,
        "prerequisites": [],
        "attr1Id": 103,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 7,
        "cottageLv": 10,
        "timeSec": 8971,
        "fightforce": 1900,
        "timber": 22250,
        "stone": 22250,
        "ruby": 19200,
        "prerequisites": [],
        "attr1Id": 103,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 8,
        "cottageLv": 10,
        "timeSec": 11287,
        "fightforce": 2450,
        "timber": 27950,
        "stone": 27950,
        "ruby": 24155,
        "prerequisites": [],
        "attr1Id": 103,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 9,
        "cottageLv": 10,
        "timeSec": 14181,
        "fightforce": 3150,
        "timber": 35100,
        "stone": 35100,
        "ruby": 30350,
        "prerequisites": [],
        "attr1Id": 103,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 10,
        "cottageLv": 10,
        "timeSec": 17364,
        "fightforce": 4000,
        "timber": 43000,
        "stone": 43000,
        "ruby": 37165,
        "prerequisites": [],
        "attr1Id": 103,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 120103,
    "branchId": 12,
    "row": 1,
    "col": 3,
    "maxLevel": 10,
    "icon": "/images/tech/research/tech_202.webp",
    "name": {
      "vi": "HP Anh Hùng I",
      "en": "Hero HP I"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 10,
        "timeSec": 2894,
        "fightforce": 150,
        "timber": 7200,
        "stone": 7200,
        "ruby": 6195,
        "prerequisites": [],
        "attr1Id": 104,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 10,
        "timeSec": 3473,
        "fightforce": 350,
        "timber": 8600,
        "stone": 8600,
        "ruby": 7435,
        "prerequisites": [],
        "attr1Id": 104,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 10,
        "timeSec": 4052,
        "fightforce": 550,
        "timber": 10050,
        "stone": 10050,
        "ruby": 8675,
        "prerequisites": [],
        "attr1Id": 104,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 10,
        "timeSec": 4920,
        "fightforce": 800,
        "timber": 12200,
        "stone": 12200,
        "ruby": 10530,
        "prerequisites": [],
        "attr1Id": 104,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 10,
        "timeSec": 5788,
        "fightforce": 1100,
        "timber": 14350,
        "stone": 14350,
        "ruby": 12390,
        "prerequisites": [],
        "attr1Id": 104,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 6,
        "cottageLv": 10,
        "timeSec": 7235,
        "fightforce": 1450,
        "timber": 17950,
        "stone": 17950,
        "ruby": 15485,
        "prerequisites": [],
        "attr1Id": 104,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 7,
        "cottageLv": 10,
        "timeSec": 8971,
        "fightforce": 1900,
        "timber": 22250,
        "stone": 22250,
        "ruby": 19200,
        "prerequisites": [],
        "attr1Id": 104,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 8,
        "cottageLv": 10,
        "timeSec": 11287,
        "fightforce": 2450,
        "timber": 27950,
        "stone": 27950,
        "ruby": 24155,
        "prerequisites": [],
        "attr1Id": 104,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 9,
        "cottageLv": 10,
        "timeSec": 14181,
        "fightforce": 3150,
        "timber": 35100,
        "stone": 35100,
        "ruby": 30350,
        "prerequisites": [],
        "attr1Id": 104,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 10,
        "cottageLv": 10,
        "timeSec": 17364,
        "fightforce": 4000,
        "timber": 43000,
        "stone": 43000,
        "ruby": 37165,
        "prerequisites": [],
        "attr1Id": 104,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 120201,
    "branchId": 12,
    "row": 2,
    "col": 1,
    "maxLevel": 10,
    "icon": "/images/tech/research/tech_201.webp",
    "name": {
      "vi": "Tấn Công của Lính I",
      "en": "Troop Attack I"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 10,
        "timeSec": 8682,
        "fightforce": 250,
        "timber": 10750,
        "stone": 10750,
        "ruby": 9295,
        "prerequisites": [
          {
            "nodeId": 120101,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 10103,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 10,
        "timeSec": 10419,
        "fightforce": 500,
        "timber": 12900,
        "stone": 12900,
        "ruby": 11150,
        "prerequisites": [
          {
            "nodeId": 120101,
            "requiredLevel": 2
          }
        ],
        "attr1Id": 10103,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 10,
        "timeSec": 12155,
        "fightforce": 800,
        "timber": 15050,
        "stone": 15050,
        "ruby": 13010,
        "prerequisites": [
          {
            "nodeId": 120101,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 10103,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 10,
        "timeSec": 14760,
        "fightforce": 1200,
        "timber": 18300,
        "stone": 18300,
        "ruby": 15795,
        "prerequisites": [
          {
            "nodeId": 120101,
            "requiredLevel": 4
          }
        ],
        "attr1Id": 10103,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 10,
        "timeSec": 17364,
        "fightforce": 1650,
        "timber": 21500,
        "stone": 21500,
        "ruby": 18585,
        "prerequisites": [
          {
            "nodeId": 120101,
            "requiredLevel": 5
          }
        ],
        "attr1Id": 10103,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 6,
        "cottageLv": 10,
        "timeSec": 21705,
        "fightforce": 2200,
        "timber": 26900,
        "stone": 26900,
        "ruby": 23230,
        "prerequisites": [
          {
            "nodeId": 120101,
            "requiredLevel": 6
          }
        ],
        "attr1Id": 10103,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 7,
        "cottageLv": 10,
        "timeSec": 26914,
        "fightforce": 2850,
        "timber": 33350,
        "stone": 33350,
        "ruby": 28800,
        "prerequisites": [
          {
            "nodeId": 120101,
            "requiredLevel": 7
          }
        ],
        "attr1Id": 10103,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 8,
        "cottageLv": 10,
        "timeSec": 33860,
        "fightforce": 3700,
        "timber": 41950,
        "stone": 41950,
        "ruby": 36235,
        "prerequisites": [
          {
            "nodeId": 120101,
            "requiredLevel": 8
          }
        ],
        "attr1Id": 10103,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 9,
        "cottageLv": 10,
        "timeSec": 42542,
        "fightforce": 4750,
        "timber": 52650,
        "stone": 52650,
        "ruby": 45525,
        "prerequisites": [
          {
            "nodeId": 120101,
            "requiredLevel": 9
          }
        ],
        "attr1Id": 10103,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 10,
        "cottageLv": 10,
        "timeSec": 52093,
        "fightforce": 6000,
        "timber": 64500,
        "stone": 64500,
        "ruby": 55745,
        "prerequisites": [
          {
            "nodeId": 120101,
            "requiredLevel": 10
          }
        ],
        "attr1Id": 10103,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 120203,
    "branchId": 12,
    "row": 2,
    "col": 3,
    "maxLevel": 10,
    "icon": "/images/tech/research/tech_202.webp",
    "name": {
      "vi": "Lính HP I",
      "en": "Troop HP I"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 10,
        "timeSec": 8682,
        "fightforce": 250,
        "timber": 10750,
        "stone": 10750,
        "ruby": 9295,
        "prerequisites": [
          {
            "nodeId": 120103,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 10104,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 10,
        "timeSec": 10419,
        "fightforce": 500,
        "timber": 12900,
        "stone": 12900,
        "ruby": 11150,
        "prerequisites": [
          {
            "nodeId": 120103,
            "requiredLevel": 2
          }
        ],
        "attr1Id": 10104,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 10,
        "timeSec": 12155,
        "fightforce": 800,
        "timber": 15050,
        "stone": 15050,
        "ruby": 13010,
        "prerequisites": [
          {
            "nodeId": 120103,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 10104,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 10,
        "timeSec": 14760,
        "fightforce": 1200,
        "timber": 18300,
        "stone": 18300,
        "ruby": 15795,
        "prerequisites": [
          {
            "nodeId": 120103,
            "requiredLevel": 4
          }
        ],
        "attr1Id": 10104,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 10,
        "timeSec": 17364,
        "fightforce": 1650,
        "timber": 21500,
        "stone": 21500,
        "ruby": 18585,
        "prerequisites": [
          {
            "nodeId": 120103,
            "requiredLevel": 5
          }
        ],
        "attr1Id": 10104,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 6,
        "cottageLv": 10,
        "timeSec": 21705,
        "fightforce": 2200,
        "timber": 26900,
        "stone": 26900,
        "ruby": 23230,
        "prerequisites": [
          {
            "nodeId": 120103,
            "requiredLevel": 6
          }
        ],
        "attr1Id": 10104,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 7,
        "cottageLv": 10,
        "timeSec": 26914,
        "fightforce": 2850,
        "timber": 33350,
        "stone": 33350,
        "ruby": 28800,
        "prerequisites": [
          {
            "nodeId": 120103,
            "requiredLevel": 7
          }
        ],
        "attr1Id": 10104,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 8,
        "cottageLv": 10,
        "timeSec": 33860,
        "fightforce": 3700,
        "timber": 41950,
        "stone": 41950,
        "ruby": 36235,
        "prerequisites": [
          {
            "nodeId": 120103,
            "requiredLevel": 8
          }
        ],
        "attr1Id": 10104,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 9,
        "cottageLv": 10,
        "timeSec": 42542,
        "fightforce": 4750,
        "timber": 52650,
        "stone": 52650,
        "ruby": 45525,
        "prerequisites": [
          {
            "nodeId": 120103,
            "requiredLevel": 9
          }
        ],
        "attr1Id": 10104,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 10,
        "cottageLv": 10,
        "timeSec": 52093,
        "fightforce": 6000,
        "timber": 64500,
        "stone": 64500,
        "ruby": 55745,
        "prerequisites": [
          {
            "nodeId": 120103,
            "requiredLevel": 10
          }
        ],
        "attr1Id": 10104,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 120302,
    "branchId": 12,
    "row": 3,
    "col": 2,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_705.webp",
    "name": {
      "vi": "Tăng Sát Thương Tập Kết",
      "en": "Rally DMG Boost"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 10,
        "timeSec": 24073,
        "fightforce": 400,
        "timber": 17900,
        "stone": 17900,
        "ruby": 15460,
        "prerequisites": [
          {
            "nodeId": 120201,
            "requiredLevel": 8
          },
          {
            "nodeId": 120203,
            "requiredLevel": 8
          }
        ],
        "attr1Id": 1200113,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 10,
        "timeSec": 31295,
        "fightforce": 900,
        "timber": 23250,
        "stone": 23250,
        "ruby": 20095,
        "prerequisites": [
          {
            "nodeId": 120201,
            "requiredLevel": 8
          },
          {
            "nodeId": 120203,
            "requiredLevel": 8
          }
        ],
        "attr1Id": 1200113,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 10,
        "timeSec": 43332,
        "fightforce": 1600,
        "timber": 32200,
        "stone": 32200,
        "ruby": 27825,
        "prerequisites": [
          {
            "nodeId": 120201,
            "requiredLevel": 8
          },
          {
            "nodeId": 120203,
            "requiredLevel": 8
          }
        ],
        "attr1Id": 1200113,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 10,
        "timeSec": 64998,
        "fightforce": 2600,
        "timber": 48300,
        "stone": 48300,
        "ruby": 41735,
        "prerequisites": [
          {
            "nodeId": 120201,
            "requiredLevel": 8
          },
          {
            "nodeId": 120203,
            "requiredLevel": 8
          }
        ],
        "attr1Id": 1200113,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 10,
        "timeSec": 103516,
        "fightforce": 4200,
        "timber": 76900,
        "stone": 76900,
        "ruby": 66465,
        "prerequisites": [
          {
            "nodeId": 120201,
            "requiredLevel": 8
          },
          {
            "nodeId": 120203,
            "requiredLevel": 8
          }
        ],
        "attr1Id": 1200113,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 120401,
    "branchId": 12,
    "row": 4,
    "col": 1,
    "maxLevel": 10,
    "icon": "/images/tech/research/tech_201.webp",
    "name": {
      "vi": "Tấn công của Anh Hùng khi cướp I",
      "en": "Hero Plunder Attack I"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 10,
        "timeSec": 38587,
        "fightforce": 600,
        "timber": 28700,
        "stone": 28700,
        "ruby": 24775,
        "prerequisites": [
          {
            "nodeId": 120302,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 158,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 10,
        "timeSec": 46304,
        "fightforce": 1300,
        "timber": 34400,
        "stone": 34400,
        "ruby": 29730,
        "prerequisites": [
          {
            "nodeId": 120302,
            "requiredLevel": 2
          }
        ],
        "attr1Id": 158,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 10,
        "timeSec": 54022,
        "fightforce": 2150,
        "timber": 40150,
        "stone": 40150,
        "ruby": 34685,
        "prerequisites": [
          {
            "nodeId": 120302,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 158,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 10,
        "timeSec": 65598,
        "fightforce": 3150,
        "timber": 48750,
        "stone": 48750,
        "ruby": 42120,
        "prerequisites": [
          {
            "nodeId": 120302,
            "requiredLevel": 4
          }
        ],
        "attr1Id": 158,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 10,
        "timeSec": 77174,
        "fightforce": 4350,
        "timber": 57350,
        "stone": 57350,
        "ruby": 49550,
        "prerequisites": [
          {
            "nodeId": 120302,
            "requiredLevel": 5
          }
        ],
        "attr1Id": 158,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 6,
        "cottageLv": 10,
        "timeSec": 96468,
        "fightforce": 5800,
        "timber": 71650,
        "stone": 71650,
        "ruby": 61940,
        "prerequisites": [
          {
            "nodeId": 120302,
            "requiredLevel": 5
          }
        ],
        "attr1Id": 158,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 7,
        "cottageLv": 10,
        "timeSec": 119620,
        "fightforce": 7600,
        "timber": 88850,
        "stone": 88850,
        "ruby": 76800,
        "prerequisites": [
          {
            "nodeId": 120302,
            "requiredLevel": 5
          }
        ],
        "attr1Id": 158,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 8,
        "cottageLv": 10,
        "timeSec": 150489,
        "fightforce": 9900,
        "timber": 111750,
        "stone": 111750,
        "ruby": 96620,
        "prerequisites": [
          {
            "nodeId": 120302,
            "requiredLevel": 5
          }
        ],
        "attr1Id": 158,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 9,
        "cottageLv": 10,
        "timeSec": 189076,
        "fightforce": 12750,
        "timber": 140400,
        "stone": 140400,
        "ruby": 121395,
        "prerequisites": [
          {
            "nodeId": 120302,
            "requiredLevel": 5
          }
        ],
        "attr1Id": 158,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 10,
        "cottageLv": 10,
        "timeSec": 231522,
        "fightforce": 16250,
        "timber": 171950,
        "stone": 171950,
        "ruby": 148645,
        "prerequisites": [
          {
            "nodeId": 120302,
            "requiredLevel": 5
          }
        ],
        "attr1Id": 158,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 120403,
    "branchId": 12,
    "row": 4,
    "col": 3,
    "maxLevel": 10,
    "icon": "/images/tech/research/tech_202.webp",
    "name": {
      "vi": "HP của Anh Hùng khi cướp I",
      "en": "Hero Plunder HP I"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 10,
        "timeSec": 38587,
        "fightforce": 600,
        "timber": 28700,
        "stone": 28700,
        "ruby": 24775,
        "prerequisites": [
          {
            "nodeId": 120302,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 159,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 10,
        "timeSec": 46304,
        "fightforce": 1300,
        "timber": 34400,
        "stone": 34400,
        "ruby": 29730,
        "prerequisites": [
          {
            "nodeId": 120302,
            "requiredLevel": 2
          }
        ],
        "attr1Id": 159,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 10,
        "timeSec": 54022,
        "fightforce": 2150,
        "timber": 40150,
        "stone": 40150,
        "ruby": 34685,
        "prerequisites": [
          {
            "nodeId": 120302,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 159,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 10,
        "timeSec": 65598,
        "fightforce": 3150,
        "timber": 48750,
        "stone": 48750,
        "ruby": 42120,
        "prerequisites": [
          {
            "nodeId": 120302,
            "requiredLevel": 4
          }
        ],
        "attr1Id": 159,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 10,
        "timeSec": 77174,
        "fightforce": 4350,
        "timber": 57350,
        "stone": 57350,
        "ruby": 49550,
        "prerequisites": [
          {
            "nodeId": 120302,
            "requiredLevel": 5
          }
        ],
        "attr1Id": 159,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 6,
        "cottageLv": 10,
        "timeSec": 96468,
        "fightforce": 5800,
        "timber": 71650,
        "stone": 71650,
        "ruby": 61940,
        "prerequisites": [
          {
            "nodeId": 120302,
            "requiredLevel": 5
          }
        ],
        "attr1Id": 159,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 7,
        "cottageLv": 10,
        "timeSec": 119620,
        "fightforce": 7600,
        "timber": 88850,
        "stone": 88850,
        "ruby": 76800,
        "prerequisites": [
          {
            "nodeId": 120302,
            "requiredLevel": 5
          }
        ],
        "attr1Id": 159,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 8,
        "cottageLv": 10,
        "timeSec": 150489,
        "fightforce": 9900,
        "timber": 111750,
        "stone": 111750,
        "ruby": 96620,
        "prerequisites": [
          {
            "nodeId": 120302,
            "requiredLevel": 5
          }
        ],
        "attr1Id": 159,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 9,
        "cottageLv": 10,
        "timeSec": 189076,
        "fightforce": 12750,
        "timber": 140400,
        "stone": 140400,
        "ruby": 121395,
        "prerequisites": [
          {
            "nodeId": 120302,
            "requiredLevel": 5
          }
        ],
        "attr1Id": 159,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 10,
        "cottageLv": 10,
        "timeSec": 231522,
        "fightforce": 16250,
        "timber": 171950,
        "stone": 171950,
        "ruby": 148645,
        "prerequisites": [
          {
            "nodeId": 120302,
            "requiredLevel": 5
          }
        ],
        "attr1Id": 159,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 120501,
    "branchId": 12,
    "row": 5,
    "col": 1,
    "maxLevel": 10,
    "icon": "/images/tech/research/tech_201.webp",
    "name": {
      "vi": "Tấn công của lính khi cướp I",
      "en": "Troop Plunder Attack I"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 15,
        "timeSec": 57881,
        "fightforce": 900,
        "timber": 43000,
        "stone": 43000,
        "ruby": 37165,
        "prerequisites": [
          {
            "nodeId": 120401,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 10158,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 15,
        "timeSec": 69457,
        "fightforce": 1950,
        "timber": 51600,
        "stone": 51600,
        "ruby": 44595,
        "prerequisites": [
          {
            "nodeId": 120401,
            "requiredLevel": 2
          }
        ],
        "attr1Id": 10158,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 15,
        "timeSec": 81033,
        "fightforce": 3200,
        "timber": 60200,
        "stone": 60200,
        "ruby": 52030,
        "prerequisites": [
          {
            "nodeId": 120401,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 10158,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 15,
        "timeSec": 98397,
        "fightforce": 4700,
        "timber": 73100,
        "stone": 73100,
        "ruby": 63175,
        "prerequisites": [
          {
            "nodeId": 120401,
            "requiredLevel": 4
          }
        ],
        "attr1Id": 10158,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 15,
        "timeSec": 115761,
        "fightforce": 6450,
        "timber": 86000,
        "stone": 86000,
        "ruby": 74325,
        "prerequisites": [
          {
            "nodeId": 120401,
            "requiredLevel": 5
          }
        ],
        "attr1Id": 10158,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 6,
        "cottageLv": 15,
        "timeSec": 144701,
        "fightforce": 8650,
        "timber": 107450,
        "stone": 107450,
        "ruby": 92905,
        "prerequisites": [
          {
            "nodeId": 120401,
            "requiredLevel": 6
          }
        ],
        "attr1Id": 10158,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 7,
        "cottageLv": 15,
        "timeSec": 179430,
        "fightforce": 11350,
        "timber": 133250,
        "stone": 133250,
        "ruby": 115200,
        "prerequisites": [
          {
            "nodeId": 120401,
            "requiredLevel": 7
          }
        ],
        "attr1Id": 10158,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 8,
        "cottageLv": 15,
        "timeSec": 225734,
        "fightforce": 14750,
        "timber": 167650,
        "stone": 167650,
        "ruby": 144930,
        "prerequisites": [
          {
            "nodeId": 120401,
            "requiredLevel": 8
          }
        ],
        "attr1Id": 10158,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 9,
        "cottageLv": 15,
        "timeSec": 283615,
        "fightforce": 19050,
        "timber": 210600,
        "stone": 210600,
        "ruby": 182090,
        "prerequisites": [
          {
            "nodeId": 120401,
            "requiredLevel": 9
          }
        ],
        "attr1Id": 10158,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 10,
        "cottageLv": 15,
        "timeSec": 347283,
        "fightforce": 24300,
        "timber": 257900,
        "stone": 257900,
        "ruby": 222970,
        "prerequisites": [
          {
            "nodeId": 120401,
            "requiredLevel": 10
          }
        ],
        "attr1Id": 10158,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 120503,
    "branchId": 12,
    "row": 5,
    "col": 3,
    "maxLevel": 10,
    "icon": "/images/tech/research/tech_202.webp",
    "name": {
      "vi": "HP của lính khi cướp I",
      "en": "Troop Plunder HP I"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 15,
        "timeSec": 57881,
        "fightforce": 900,
        "timber": 43000,
        "stone": 43000,
        "ruby": 37165,
        "prerequisites": [
          {
            "nodeId": 120403,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 10159,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 15,
        "timeSec": 69457,
        "fightforce": 1950,
        "timber": 51600,
        "stone": 51600,
        "ruby": 44595,
        "prerequisites": [
          {
            "nodeId": 120403,
            "requiredLevel": 2
          }
        ],
        "attr1Id": 10159,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 15,
        "timeSec": 81033,
        "fightforce": 3200,
        "timber": 60200,
        "stone": 60200,
        "ruby": 52030,
        "prerequisites": [
          {
            "nodeId": 120403,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 10159,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 15,
        "timeSec": 98397,
        "fightforce": 4700,
        "timber": 73100,
        "stone": 73100,
        "ruby": 63175,
        "prerequisites": [
          {
            "nodeId": 120403,
            "requiredLevel": 4
          }
        ],
        "attr1Id": 10159,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 15,
        "timeSec": 115761,
        "fightforce": 6450,
        "timber": 86000,
        "stone": 86000,
        "ruby": 74325,
        "prerequisites": [
          {
            "nodeId": 120403,
            "requiredLevel": 5
          }
        ],
        "attr1Id": 10159,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 6,
        "cottageLv": 15,
        "timeSec": 144701,
        "fightforce": 8650,
        "timber": 107450,
        "stone": 107450,
        "ruby": 92905,
        "prerequisites": [
          {
            "nodeId": 120403,
            "requiredLevel": 6
          }
        ],
        "attr1Id": 10159,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 7,
        "cottageLv": 15,
        "timeSec": 179430,
        "fightforce": 11350,
        "timber": 133250,
        "stone": 133250,
        "ruby": 115200,
        "prerequisites": [
          {
            "nodeId": 120403,
            "requiredLevel": 7
          }
        ],
        "attr1Id": 10159,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 8,
        "cottageLv": 15,
        "timeSec": 225734,
        "fightforce": 14750,
        "timber": 167650,
        "stone": 167650,
        "ruby": 144930,
        "prerequisites": [
          {
            "nodeId": 120403,
            "requiredLevel": 8
          }
        ],
        "attr1Id": 10159,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 9,
        "cottageLv": 15,
        "timeSec": 283615,
        "fightforce": 19050,
        "timber": 210600,
        "stone": 210600,
        "ruby": 182090,
        "prerequisites": [
          {
            "nodeId": 120403,
            "requiredLevel": 9
          }
        ],
        "attr1Id": 10159,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 10,
        "cottageLv": 15,
        "timeSec": 347283,
        "fightforce": 24300,
        "timber": 257900,
        "stone": 257900,
        "ruby": 222970,
        "prerequisites": [
          {
            "nodeId": 120403,
            "requiredLevel": 10
          }
        ],
        "attr1Id": 10159,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 120602,
    "branchId": 12,
    "row": 6,
    "col": 2,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_310.webp",
    "name": {
      "vi": "Gia tốc hành quân khi cướp",
      "en": "Plunder March Speedup"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 15,
        "timeSec": 96294,
        "fightforce": 1450,
        "timber": 71500,
        "stone": 71500,
        "ruby": 61825,
        "prerequisites": [
          {
            "nodeId": 120501,
            "requiredLevel": 8
          },
          {
            "nodeId": 120503,
            "requiredLevel": 8
          }
        ],
        "attr1Id": 1076,
        "attr1Delta": 10,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 15,
        "timeSec": 125182,
        "fightforce": 3350,
        "timber": 92950,
        "stone": 92950,
        "ruby": 80375,
        "prerequisites": [
          {
            "nodeId": 120501,
            "requiredLevel": 8
          },
          {
            "nodeId": 120503,
            "requiredLevel": 8
          }
        ],
        "attr1Id": 1076,
        "attr1Delta": 10,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 15,
        "timeSec": 173329,
        "fightforce": 6000,
        "timber": 128700,
        "stone": 128700,
        "ruby": 111285,
        "prerequisites": [
          {
            "nodeId": 120501,
            "requiredLevel": 8
          },
          {
            "nodeId": 120503,
            "requiredLevel": 8
          }
        ],
        "attr1Id": 1076,
        "attr1Delta": 10,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 15,
        "timeSec": 259993,
        "fightforce": 9950,
        "timber": 193050,
        "stone": 193050,
        "ruby": 166925,
        "prerequisites": [
          {
            "nodeId": 120501,
            "requiredLevel": 8
          },
          {
            "nodeId": 120503,
            "requiredLevel": 8
          }
        ],
        "attr1Id": 1076,
        "attr1Delta": 10,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 15,
        "timeSec": 414063,
        "fightforce": 16200,
        "timber": 307450,
        "stone": 307450,
        "ruby": 265845,
        "prerequisites": [
          {
            "nodeId": 120501,
            "requiredLevel": 8
          },
          {
            "nodeId": 120503,
            "requiredLevel": 8
          }
        ],
        "attr1Id": 1076,
        "attr1Delta": 10,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 120701,
    "branchId": 12,
    "row": 7,
    "col": 1,
    "maxLevel": 10,
    "icon": "/images/tech/research/tech_201.webp",
    "name": {
      "vi": "Tấn công của Anh Hùng khi cướp II",
      "en": "Hero Plunder Attack II"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 15,
        "timeSec": 86821,
        "fightforce": 1350,
        "timber": 64500,
        "stone": 64500,
        "ruby": 55745,
        "prerequisites": [
          {
            "nodeId": 120602,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 158,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 15,
        "timeSec": 104185,
        "fightforce": 2950,
        "timber": 77400,
        "stone": 77400,
        "ruby": 66890,
        "prerequisites": [
          {
            "nodeId": 120602,
            "requiredLevel": 2
          }
        ],
        "attr1Id": 158,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 15,
        "timeSec": 121549,
        "fightforce": 4800,
        "timber": 90250,
        "stone": 90250,
        "ruby": 78040,
        "prerequisites": [
          {
            "nodeId": 120602,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 158,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 15,
        "timeSec": 147595,
        "fightforce": 7050,
        "timber": 109600,
        "stone": 109600,
        "ruby": 94765,
        "prerequisites": [
          {
            "nodeId": 120602,
            "requiredLevel": 4
          }
        ],
        "attr1Id": 158,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 15,
        "timeSec": 173642,
        "fightforce": 9700,
        "timber": 128950,
        "stone": 128950,
        "ruby": 111485,
        "prerequisites": [
          {
            "nodeId": 120602,
            "requiredLevel": 5
          }
        ],
        "attr1Id": 158,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 6,
        "cottageLv": 15,
        "timeSec": 217052,
        "fightforce": 13000,
        "timber": 161200,
        "stone": 161200,
        "ruby": 139355,
        "prerequisites": [
          {
            "nodeId": 120602,
            "requiredLevel": 5
          }
        ],
        "attr1Id": 158,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 7,
        "cottageLv": 15,
        "timeSec": 269145,
        "fightforce": 17050,
        "timber": 199850,
        "stone": 199850,
        "ruby": 172800,
        "prerequisites": [
          {
            "nodeId": 120602,
            "requiredLevel": 5
          }
        ],
        "attr1Id": 158,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 8,
        "cottageLv": 15,
        "timeSec": 338601,
        "fightforce": 22150,
        "timber": 251450,
        "stone": 251450,
        "ruby": 217395,
        "prerequisites": [
          {
            "nodeId": 120602,
            "requiredLevel": 5
          }
        ],
        "attr1Id": 158,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 9,
        "cottageLv": 15,
        "timeSec": 425422,
        "fightforce": 28550,
        "timber": 315900,
        "stone": 315900,
        "ruby": 273135,
        "prerequisites": [
          {
            "nodeId": 120602,
            "requiredLevel": 5
          }
        ],
        "attr1Id": 158,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 10,
        "cottageLv": 15,
        "timeSec": 520925,
        "fightforce": 36400,
        "timber": 386800,
        "stone": 386800,
        "ruby": 334450,
        "prerequisites": [
          {
            "nodeId": 120602,
            "requiredLevel": 5
          }
        ],
        "attr1Id": 158,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 120703,
    "branchId": 12,
    "row": 7,
    "col": 3,
    "maxLevel": 10,
    "icon": "/images/tech/research/tech_202.webp",
    "name": {
      "vi": "HP của Anh Hùng khi cướp II",
      "en": "Hero Plunder HP II"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 15,
        "timeSec": 86821,
        "fightforce": 1350,
        "timber": 64500,
        "stone": 64500,
        "ruby": 55745,
        "prerequisites": [
          {
            "nodeId": 120602,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 159,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 15,
        "timeSec": 104185,
        "fightforce": 2950,
        "timber": 77400,
        "stone": 77400,
        "ruby": 66890,
        "prerequisites": [
          {
            "nodeId": 120602,
            "requiredLevel": 2
          }
        ],
        "attr1Id": 159,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 15,
        "timeSec": 121549,
        "fightforce": 4800,
        "timber": 90250,
        "stone": 90250,
        "ruby": 78040,
        "prerequisites": [
          {
            "nodeId": 120602,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 159,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 15,
        "timeSec": 147595,
        "fightforce": 7050,
        "timber": 109600,
        "stone": 109600,
        "ruby": 94765,
        "prerequisites": [
          {
            "nodeId": 120602,
            "requiredLevel": 4
          }
        ],
        "attr1Id": 159,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 15,
        "timeSec": 173642,
        "fightforce": 9700,
        "timber": 128950,
        "stone": 128950,
        "ruby": 111485,
        "prerequisites": [
          {
            "nodeId": 120602,
            "requiredLevel": 5
          }
        ],
        "attr1Id": 159,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 6,
        "cottageLv": 15,
        "timeSec": 217052,
        "fightforce": 13000,
        "timber": 161200,
        "stone": 161200,
        "ruby": 139355,
        "prerequisites": [
          {
            "nodeId": 120602,
            "requiredLevel": 5
          }
        ],
        "attr1Id": 159,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 7,
        "cottageLv": 15,
        "timeSec": 269145,
        "fightforce": 17050,
        "timber": 199850,
        "stone": 199850,
        "ruby": 172800,
        "prerequisites": [
          {
            "nodeId": 120602,
            "requiredLevel": 5
          }
        ],
        "attr1Id": 159,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 8,
        "cottageLv": 15,
        "timeSec": 338601,
        "fightforce": 22150,
        "timber": 251450,
        "stone": 251450,
        "ruby": 217395,
        "prerequisites": [
          {
            "nodeId": 120602,
            "requiredLevel": 5
          }
        ],
        "attr1Id": 159,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 9,
        "cottageLv": 15,
        "timeSec": 425422,
        "fightforce": 28550,
        "timber": 315900,
        "stone": 315900,
        "ruby": 273135,
        "prerequisites": [
          {
            "nodeId": 120602,
            "requiredLevel": 5
          }
        ],
        "attr1Id": 159,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 10,
        "cottageLv": 15,
        "timeSec": 520925,
        "fightforce": 36400,
        "timber": 386800,
        "stone": 386800,
        "ruby": 334450,
        "prerequisites": [
          {
            "nodeId": 120602,
            "requiredLevel": 5
          }
        ],
        "attr1Id": 159,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 120801,
    "branchId": 12,
    "row": 8,
    "col": 1,
    "maxLevel": 10,
    "icon": "/images/tech/research/tech_201.webp",
    "name": {
      "vi": "Tấn công của lính khi cướp II",
      "en": "Troop Plunder Attack II"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 15,
        "timeSec": 106114,
        "fightforce": 1600,
        "timber": 78800,
        "stone": 78800,
        "ruby": 68130,
        "prerequisites": [
          {
            "nodeId": 120701,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 10158,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 15,
        "timeSec": 127337,
        "fightforce": 3550,
        "timber": 94550,
        "stone": 94550,
        "ruby": 81755,
        "prerequisites": [
          {
            "nodeId": 120701,
            "requiredLevel": 2
          }
        ],
        "attr1Id": 10158,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 15,
        "timeSec": 148560,
        "fightforce": 5800,
        "timber": 110350,
        "stone": 110350,
        "ruby": 95385,
        "prerequisites": [
          {
            "nodeId": 120701,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 10158,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 15,
        "timeSec": 180394,
        "fightforce": 8550,
        "timber": 133950,
        "stone": 133950,
        "ruby": 115820,
        "prerequisites": [
          {
            "nodeId": 120701,
            "requiredLevel": 4
          }
        ],
        "attr1Id": 10158,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 15,
        "timeSec": 212229,
        "fightforce": 11750,
        "timber": 157600,
        "stone": 157600,
        "ruby": 136260,
        "prerequisites": [
          {
            "nodeId": 120701,
            "requiredLevel": 5
          }
        ],
        "attr1Id": 10158,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 6,
        "cottageLv": 15,
        "timeSec": 265286,
        "fightforce": 15750,
        "timber": 197000,
        "stone": 197000,
        "ruby": 170325,
        "prerequisites": [
          {
            "nodeId": 120701,
            "requiredLevel": 6
          }
        ],
        "attr1Id": 10158,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 7,
        "cottageLv": 15,
        "timeSec": 328954,
        "fightforce": 20700,
        "timber": 244250,
        "stone": 244250,
        "ruby": 211200,
        "prerequisites": [
          {
            "nodeId": 120701,
            "requiredLevel": 7
          }
        ],
        "attr1Id": 10158,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 8,
        "cottageLv": 15,
        "timeSec": 413846,
        "fightforce": 26950,
        "timber": 307300,
        "stone": 307300,
        "ruby": 265705,
        "prerequisites": [
          {
            "nodeId": 120701,
            "requiredLevel": 8
          }
        ],
        "attr1Id": 10158,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 9,
        "cottageLv": 15,
        "timeSec": 519960,
        "fightforce": 34750,
        "timber": 386100,
        "stone": 386100,
        "ruby": 333835,
        "prerequisites": [
          {
            "nodeId": 120701,
            "requiredLevel": 9
          }
        ],
        "attr1Id": 10158,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 10,
        "cottageLv": 15,
        "timeSec": 636686,
        "fightforce": 44350,
        "timber": 472750,
        "stone": 472750,
        "ruby": 408775,
        "prerequisites": [
          {
            "nodeId": 120701,
            "requiredLevel": 10
          }
        ],
        "attr1Id": 10158,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 120803,
    "branchId": 12,
    "row": 8,
    "col": 3,
    "maxLevel": 10,
    "icon": "/images/tech/research/tech_202.webp",
    "name": {
      "vi": "HP của lính khi cướp II",
      "en": "Troop Plunder HP II"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 15,
        "timeSec": 106114,
        "fightforce": 1600,
        "timber": 78800,
        "stone": 78800,
        "ruby": 68130,
        "prerequisites": [
          {
            "nodeId": 120703,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 10159,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 15,
        "timeSec": 127337,
        "fightforce": 3550,
        "timber": 94550,
        "stone": 94550,
        "ruby": 81755,
        "prerequisites": [
          {
            "nodeId": 120703,
            "requiredLevel": 2
          }
        ],
        "attr1Id": 10159,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 15,
        "timeSec": 148560,
        "fightforce": 5800,
        "timber": 110350,
        "stone": 110350,
        "ruby": 95385,
        "prerequisites": [
          {
            "nodeId": 120703,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 10159,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 15,
        "timeSec": 180394,
        "fightforce": 8550,
        "timber": 133950,
        "stone": 133950,
        "ruby": 115820,
        "prerequisites": [
          {
            "nodeId": 120703,
            "requiredLevel": 4
          }
        ],
        "attr1Id": 10159,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 15,
        "timeSec": 212229,
        "fightforce": 11750,
        "timber": 157600,
        "stone": 157600,
        "ruby": 136260,
        "prerequisites": [
          {
            "nodeId": 120703,
            "requiredLevel": 5
          }
        ],
        "attr1Id": 10159,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 6,
        "cottageLv": 15,
        "timeSec": 265286,
        "fightforce": 15750,
        "timber": 197000,
        "stone": 197000,
        "ruby": 170325,
        "prerequisites": [
          {
            "nodeId": 120703,
            "requiredLevel": 6
          }
        ],
        "attr1Id": 10159,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 7,
        "cottageLv": 15,
        "timeSec": 328954,
        "fightforce": 20700,
        "timber": 244250,
        "stone": 244250,
        "ruby": 211200,
        "prerequisites": [
          {
            "nodeId": 120703,
            "requiredLevel": 7
          }
        ],
        "attr1Id": 10159,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 8,
        "cottageLv": 15,
        "timeSec": 413846,
        "fightforce": 26950,
        "timber": 307300,
        "stone": 307300,
        "ruby": 265705,
        "prerequisites": [
          {
            "nodeId": 120703,
            "requiredLevel": 8
          }
        ],
        "attr1Id": 10159,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 9,
        "cottageLv": 15,
        "timeSec": 519960,
        "fightforce": 34750,
        "timber": 386100,
        "stone": 386100,
        "ruby": 333835,
        "prerequisites": [
          {
            "nodeId": 120703,
            "requiredLevel": 9
          }
        ],
        "attr1Id": 10159,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 10,
        "cottageLv": 15,
        "timeSec": 636686,
        "fightforce": 44350,
        "timber": 472750,
        "stone": 472750,
        "ruby": 408775,
        "prerequisites": [
          {
            "nodeId": 120703,
            "requiredLevel": 10
          }
        ],
        "attr1Id": 10159,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 120902,
    "branchId": 12,
    "row": 9,
    "col": 2,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_707.webp",
    "name": {
      "vi": "Giảm Sát Thương Tập Kết",
      "en": "Rally DMG Reduction"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 15,
        "timeSec": 144441,
        "fightforce": 2200,
        "timber": 107250,
        "stone": 107250,
        "ruby": 92740,
        "prerequisites": [
          {
            "nodeId": 120801,
            "requiredLevel": 8
          },
          {
            "nodeId": 120803,
            "requiredLevel": 8
          }
        ],
        "attr1Id": 1200114,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 15,
        "timeSec": 187773,
        "fightforce": 5050,
        "timber": 139450,
        "stone": 139450,
        "ruby": 120560,
        "prerequisites": [
          {
            "nodeId": 120801,
            "requiredLevel": 8
          },
          {
            "nodeId": 120803,
            "requiredLevel": 8
          }
        ],
        "attr1Id": 1200114,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 15,
        "timeSec": 259993,
        "fightforce": 9000,
        "timber": 193050,
        "stone": 193050,
        "ruby": 166925,
        "prerequisites": [
          {
            "nodeId": 120801,
            "requiredLevel": 8
          },
          {
            "nodeId": 120803,
            "requiredLevel": 8
          }
        ],
        "attr1Id": 1200114,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 15,
        "timeSec": 389990,
        "fightforce": 14900,
        "timber": 289600,
        "stone": 289600,
        "ruby": 250390,
        "prerequisites": [
          {
            "nodeId": 120801,
            "requiredLevel": 8
          },
          {
            "nodeId": 120803,
            "requiredLevel": 8
          }
        ],
        "attr1Id": 1200114,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 15,
        "timeSec": 621095,
        "fightforce": 24250,
        "timber": 461200,
        "stone": 461200,
        "ruby": 398765,
        "prerequisites": [
          {
            "nodeId": 120801,
            "requiredLevel": 8
          },
          {
            "nodeId": 120803,
            "requiredLevel": 8
          }
        ],
        "attr1Id": 1200114,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 121001,
    "branchId": 12,
    "row": 10,
    "col": 1,
    "maxLevel": 1,
    "icon": "/images/tech/research/tech_1202.webp",
    "name": {
      "vi": "Lv Lính Liên Minh",
      "en": "League Troop Level"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 20,
        "timeSec": 347380,
        "fightforce": 7000,
        "timber": 357150,
        "stone": 357150,
        "ruby": 308810,
        "prerequisites": [
          {
            "nodeId": 120902,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1086,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 121002,
    "branchId": 12,
    "row": 10,
    "col": 2,
    "maxLevel": 1,
    "icon": "/images/tech/research/tech_1203.webp",
    "name": {
      "vi": "Lv Lính Bộ Tộc",
      "en": "Horde Troop Level"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 20,
        "timeSec": 347380,
        "fightforce": 7000,
        "timber": 357150,
        "stone": 357150,
        "ruby": 308810,
        "prerequisites": [
          {
            "nodeId": 120902,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1087,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 121003,
    "branchId": 12,
    "row": 10,
    "col": 3,
    "maxLevel": 1,
    "icon": "/images/tech/research/tech_1204.webp",
    "name": {
      "vi": "Lv Lính Thiên Nhiên",
      "en": "Nature Troop Level"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 20,
        "timeSec": 347380,
        "fightforce": 7000,
        "timber": 357150,
        "stone": 357150,
        "ruby": 308810,
        "prerequisites": [
          {
            "nodeId": 120902,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1088,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 215001,
    "branchId": 215,
    "row": 1,
    "col": 1,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_203.webp",
    "name": {
      "vi": "Tấn Công của Lính I",
      "en": "Troop Attack I"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 1,
        "timeSec": 1920,
        "fightforce": 300,
        "timber": 500,
        "stone": 500,
        "ruby": 850,
        "prerequisites": [],
        "attr1Id": 10103,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 1,
        "timeSec": 2520,
        "fightforce": 800,
        "timber": 1300,
        "stone": 1300,
        "ruby": 2210,
        "prerequisites": [],
        "attr1Id": 10103,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 1,
        "timeSec": 3240,
        "fightforce": 1500,
        "timber": 2500,
        "stone": 2500,
        "ruby": 4250,
        "prerequisites": [],
        "attr1Id": 10103,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 1,
        "timeSec": 4200,
        "fightforce": 2400,
        "timber": 3900,
        "stone": 3900,
        "ruby": 6630,
        "prerequisites": [],
        "attr1Id": 10103,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 1,
        "timeSec": 5460,
        "fightforce": 3500,
        "timber": 7000,
        "stone": 7000,
        "ruby": 11900,
        "prerequisites": [],
        "attr1Id": 10103,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 215002,
    "branchId": 215,
    "row": 1,
    "col": 3,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_1109.webp",
    "name": {
      "vi": "Toàn Quân Xuất Kích",
      "en": "Full Army Deployment"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 1,
        "timeSec": 1920,
        "fightforce": 300,
        "timber": 500,
        "stone": 500,
        "ruby": 850,
        "prerequisites": [],
        "attr1Id": 57,
        "attr1Delta": 100,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 1,
        "timeSec": 2520,
        "fightforce": 800,
        "timber": 1300,
        "stone": 1300,
        "ruby": 2210,
        "prerequisites": [],
        "attr1Id": 57,
        "attr1Delta": 100,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 1,
        "timeSec": 3240,
        "fightforce": 1500,
        "timber": 2500,
        "stone": 2500,
        "ruby": 4250,
        "prerequisites": [],
        "attr1Id": 57,
        "attr1Delta": 100,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 1,
        "timeSec": 4200,
        "fightforce": 2400,
        "timber": 3900,
        "stone": 3900,
        "ruby": 6630,
        "prerequisites": [],
        "attr1Id": 57,
        "attr1Delta": 100,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 1,
        "timeSec": 5460,
        "fightforce": 3500,
        "timber": 7000,
        "stone": 7000,
        "ruby": 11900,
        "prerequisites": [],
        "attr1Id": 57,
        "attr1Delta": 100,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 215003,
    "branchId": 215,
    "row": 2,
    "col": 2,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_204.webp",
    "name": {
      "vi": "Lính HP I",
      "en": "Troop HP I"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 1,
        "timeSec": 1920,
        "fightforce": 300,
        "timber": 500,
        "stone": 500,
        "ruby": 850,
        "prerequisites": [
          {
            "nodeId": 215001,
            "requiredLevel": 1
          },
          {
            "nodeId": 215002,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 10104,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 1,
        "timeSec": 2520,
        "fightforce": 800,
        "timber": 1300,
        "stone": 1300,
        "ruby": 2210,
        "prerequisites": [],
        "attr1Id": 10104,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 1,
        "timeSec": 3240,
        "fightforce": 1500,
        "timber": 2500,
        "stone": 2500,
        "ruby": 4250,
        "prerequisites": [
          {
            "nodeId": 215001,
            "requiredLevel": 3
          },
          {
            "nodeId": 215002,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 10104,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 1,
        "timeSec": 4200,
        "fightforce": 2400,
        "timber": 3900,
        "stone": 3900,
        "ruby": 6630,
        "prerequisites": [],
        "attr1Id": 10104,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 1,
        "timeSec": 5460,
        "fightforce": 3500,
        "timber": 7000,
        "stone": 7000,
        "ruby": 11900,
        "prerequisites": [],
        "attr1Id": 10104,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 215004,
    "branchId": 215,
    "row": 3,
    "col": 2,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_307.webp",
    "name": {
      "vi": "Đặc Huấn Tải Trọng",
      "en": "Load Capacity Training"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 5,
        "timeSec": 1920,
        "fightforce": 300,
        "timber": 500,
        "stone": 500,
        "ruby": 850,
        "prerequisites": [
          {
            "nodeId": 215003,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1052,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 5,
        "timeSec": 2520,
        "fightforce": 800,
        "timber": 1300,
        "stone": 1300,
        "ruby": 2210,
        "prerequisites": [],
        "attr1Id": 1052,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 5,
        "timeSec": 3240,
        "fightforce": 1500,
        "timber": 2500,
        "stone": 2500,
        "ruby": 4250,
        "prerequisites": [
          {
            "nodeId": 215003,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 1052,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 5,
        "timeSec": 4200,
        "fightforce": 2400,
        "timber": 3900,
        "stone": 3900,
        "ruby": 6630,
        "prerequisites": [],
        "attr1Id": 1052,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 5,
        "timeSec": 5460,
        "fightforce": 3500,
        "timber": 7000,
        "stone": 7000,
        "ruby": 11900,
        "prerequisites": [],
        "attr1Id": 1052,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 215005,
    "branchId": 215,
    "row": 4,
    "col": 1,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_203.webp",
    "name": {
      "vi": "Tấn Công của Lính II",
      "en": "Troop Attack II"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 5,
        "timeSec": 5460,
        "fightforce": 1100,
        "timber": 7000,
        "stone": 7000,
        "ruby": 11900,
        "prerequisites": [
          {
            "nodeId": 215004,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 10103,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 5,
        "timeSec": 8160,
        "fightforce": 2300,
        "timber": 8000,
        "stone": 8000,
        "ruby": 13600,
        "prerequisites": [],
        "attr1Id": 10103,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 5,
        "timeSec": 12240,
        "fightforce": 4200,
        "timber": 19000,
        "stone": 19000,
        "ruby": 32300,
        "prerequisites": [
          {
            "nodeId": 215004,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 10103,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 5,
        "timeSec": 18300,
        "fightforce": 6600,
        "timber": 32000,
        "stone": 32000,
        "ruby": 54400,
        "prerequisites": [],
        "attr1Id": 10103,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 5,
        "timeSec": 34800,
        "fightforce": 9100,
        "timber": 35000,
        "stone": 35000,
        "ruby": 59500,
        "prerequisites": [],
        "attr1Id": 10103,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 215006,
    "branchId": 215,
    "row": 4,
    "col": 3,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_1109.webp",
    "name": {
      "vi": "Toàn Quân Xuất Kích",
      "en": "Full Army Deployment"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 5,
        "timeSec": 5460,
        "fightforce": 1100,
        "timber": 7000,
        "stone": 7000,
        "ruby": 11900,
        "prerequisites": [
          {
            "nodeId": 215004,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 57,
        "attr1Delta": 100,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 5,
        "timeSec": 8160,
        "fightforce": 2300,
        "timber": 8000,
        "stone": 8000,
        "ruby": 13600,
        "prerequisites": [],
        "attr1Id": 57,
        "attr1Delta": 100,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 5,
        "timeSec": 12240,
        "fightforce": 4200,
        "timber": 19000,
        "stone": 19000,
        "ruby": 32300,
        "prerequisites": [
          {
            "nodeId": 215004,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 57,
        "attr1Delta": 100,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 5,
        "timeSec": 18300,
        "fightforce": 6600,
        "timber": 32000,
        "stone": 32000,
        "ruby": 54400,
        "prerequisites": [],
        "attr1Id": 57,
        "attr1Delta": 100,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 5,
        "timeSec": 34800,
        "fightforce": 9100,
        "timber": 35000,
        "stone": 35000,
        "ruby": 59500,
        "prerequisites": [],
        "attr1Id": 57,
        "attr1Delta": 100,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 215007,
    "branchId": 215,
    "row": 5,
    "col": 2,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_204.webp",
    "name": {
      "vi": "Lính HP II",
      "en": "Troop HP II"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 5,
        "timeSec": 5460,
        "fightforce": 1100,
        "timber": 7000,
        "stone": 7000,
        "ruby": 11900,
        "prerequisites": [
          {
            "nodeId": 215005,
            "requiredLevel": 1
          },
          {
            "nodeId": 215006,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 10104,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 5,
        "timeSec": 8160,
        "fightforce": 2300,
        "timber": 8000,
        "stone": 8000,
        "ruby": 13600,
        "prerequisites": [],
        "attr1Id": 10104,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 5,
        "timeSec": 12240,
        "fightforce": 4200,
        "timber": 19000,
        "stone": 19000,
        "ruby": 32300,
        "prerequisites": [
          {
            "nodeId": 215005,
            "requiredLevel": 3
          },
          {
            "nodeId": 215006,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 10104,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 5,
        "timeSec": 18300,
        "fightforce": 6600,
        "timber": 32000,
        "stone": 32000,
        "ruby": 54400,
        "prerequisites": [],
        "attr1Id": 10104,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 5,
        "timeSec": 34800,
        "fightforce": 9100,
        "timber": 35000,
        "stone": 35000,
        "ruby": 59500,
        "prerequisites": [],
        "attr1Id": 10104,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 215008,
    "branchId": 215,
    "row": 6,
    "col": 2,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_307.webp",
    "name": {
      "vi": "Đặc Huấn Tải Trọng",
      "en": "Load Capacity Training"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 8,
        "timeSec": 5460,
        "fightforce": 1100,
        "timber": 7000,
        "stone": 7000,
        "ruby": 11900,
        "prerequisites": [
          {
            "nodeId": 215007,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1052,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 8,
        "timeSec": 8160,
        "fightforce": 2300,
        "timber": 8000,
        "stone": 8000,
        "ruby": 13600,
        "prerequisites": [],
        "attr1Id": 1052,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 8,
        "timeSec": 12240,
        "fightforce": 4200,
        "timber": 19000,
        "stone": 19000,
        "ruby": 32300,
        "prerequisites": [
          {
            "nodeId": 215007,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 1052,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 8,
        "timeSec": 18300,
        "fightforce": 6600,
        "timber": 32000,
        "stone": 32000,
        "ruby": 54400,
        "prerequisites": [],
        "attr1Id": 1052,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 8,
        "timeSec": 34800,
        "fightforce": 9100,
        "timber": 35000,
        "stone": 35000,
        "ruby": 59500,
        "prerequisites": [],
        "attr1Id": 1052,
        "attr1Delta": 1,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 215009,
    "branchId": 215,
    "row": 7,
    "col": 1,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_203.webp",
    "name": {
      "vi": "Tấn Công của Lính III",
      "en": "Troop Attack III"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 15,
        "timeSec": 34800,
        "fightforce": 2500,
        "timber": 35000,
        "stone": 35000,
        "ruby": 59500,
        "prerequisites": [
          {
            "nodeId": 215008,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 10103,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 15,
        "timeSec": 69540,
        "fightforce": 5500,
        "timber": 50000,
        "stone": 50000,
        "ruby": 85000,
        "prerequisites": [],
        "attr1Id": 10103,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 15,
        "timeSec": 132120,
        "fightforce": 9000,
        "timber": 70000,
        "stone": 70000,
        "ruby": 119000,
        "prerequisites": [
          {
            "nodeId": 215008,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 10103,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 15,
        "timeSec": 132120,
        "fightforce": 12500,
        "timber": 70000,
        "stone": 70000,
        "ruby": 119000,
        "prerequisites": [],
        "attr1Id": 10103,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 15,
        "timeSec": 237840,
        "fightforce": 17200,
        "timber": 130000,
        "stone": 130000,
        "ruby": 221000,
        "prerequisites": [],
        "attr1Id": 10103,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 215010,
    "branchId": 215,
    "row": 7,
    "col": 3,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_1109.webp",
    "name": {
      "vi": "Toàn Quân Xuất Kích",
      "en": "Full Army Deployment"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 18,
        "timeSec": 34800,
        "fightforce": 2500,
        "timber": 35000,
        "stone": 35000,
        "ruby": 59500,
        "prerequisites": [
          {
            "nodeId": 215008,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 57,
        "attr1Delta": 100,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 18,
        "timeSec": 69540,
        "fightforce": 5500,
        "timber": 50000,
        "stone": 50000,
        "ruby": 85000,
        "prerequisites": [],
        "attr1Id": 57,
        "attr1Delta": 100,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 18,
        "timeSec": 132120,
        "fightforce": 9000,
        "timber": 70000,
        "stone": 70000,
        "ruby": 119000,
        "prerequisites": [
          {
            "nodeId": 215008,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 57,
        "attr1Delta": 100,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 18,
        "timeSec": 132120,
        "fightforce": 12500,
        "timber": 70000,
        "stone": 70000,
        "ruby": 119000,
        "prerequisites": [],
        "attr1Id": 57,
        "attr1Delta": 100,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 18,
        "timeSec": 237840,
        "fightforce": 17200,
        "timber": 130000,
        "stone": 130000,
        "ruby": 221000,
        "prerequisites": [],
        "attr1Id": 57,
        "attr1Delta": 100,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 215011,
    "branchId": 215,
    "row": 8,
    "col": 2,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_204.webp",
    "name": {
      "vi": "Lính HP III",
      "en": "Troop HP III"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 22,
        "timeSec": 34800,
        "fightforce": 2500,
        "timber": 35000,
        "stone": 35000,
        "ruby": 59500,
        "prerequisites": [
          {
            "nodeId": 215009,
            "requiredLevel": 1
          },
          {
            "nodeId": 215010,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 10104,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 22,
        "timeSec": 69540,
        "fightforce": 5500,
        "timber": 50000,
        "stone": 50000,
        "ruby": 85000,
        "prerequisites": [],
        "attr1Id": 10104,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 22,
        "timeSec": 132120,
        "fightforce": 9000,
        "timber": 70000,
        "stone": 70000,
        "ruby": 119000,
        "prerequisites": [
          {
            "nodeId": 215009,
            "requiredLevel": 3
          },
          {
            "nodeId": 215010,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 10104,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 22,
        "timeSec": 132120,
        "fightforce": 12500,
        "timber": 70000,
        "stone": 70000,
        "ruby": 119000,
        "prerequisites": [],
        "attr1Id": 10104,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 22,
        "timeSec": 237840,
        "fightforce": 17200,
        "timber": 130000,
        "stone": 130000,
        "ruby": 221000,
        "prerequisites": [],
        "attr1Id": 10104,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 215012,
    "branchId": 215,
    "row": 9,
    "col": 2,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_307.webp",
    "name": {
      "vi": "Đặc Huấn Tải Trọng",
      "en": "Load Capacity Training"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 25,
        "timeSec": 34800,
        "fightforce": 2500,
        "timber": 35000,
        "stone": 35000,
        "ruby": 59500,
        "prerequisites": [
          {
            "nodeId": 215011,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1052,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 25,
        "timeSec": 69540,
        "fightforce": 5500,
        "timber": 50000,
        "stone": 50000,
        "ruby": 85000,
        "prerequisites": [],
        "attr1Id": 1052,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 25,
        "timeSec": 132120,
        "fightforce": 9000,
        "timber": 70000,
        "stone": 70000,
        "ruby": 119000,
        "prerequisites": [
          {
            "nodeId": 215011,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 1052,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 25,
        "timeSec": 132120,
        "fightforce": 12500,
        "timber": 70000,
        "stone": 70000,
        "ruby": 119000,
        "prerequisites": [],
        "attr1Id": 1052,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 25,
        "timeSec": 237840,
        "fightforce": 17200,
        "timber": 130000,
        "stone": 130000,
        "ruby": 221000,
        "prerequisites": [],
        "attr1Id": 1052,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 215013,
    "branchId": 215,
    "row": 10,
    "col": 1,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_203.webp",
    "name": {
      "vi": "Tấn Công của Lính IV",
      "en": "Troop Attack IV"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 28,
        "timeSec": 237840,
        "fightforce": 4700,
        "timber": 130000,
        "stone": 130000,
        "ruby": 221000,
        "prerequisites": [
          {
            "nodeId": 215012,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 10103,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 28,
        "timeSec": 404280,
        "fightforce": 10000,
        "timber": 160000,
        "stone": 160000,
        "ruby": 272000,
        "prerequisites": [],
        "attr1Id": 10103,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 28,
        "timeSec": 646800,
        "fightforce": 17000,
        "timber": 280000,
        "stone": 280000,
        "ruby": 476000,
        "prerequisites": [
          {
            "nodeId": 215012,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 10103,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 28,
        "timeSec": 646800,
        "fightforce": 24000,
        "timber": 280000,
        "stone": 280000,
        "ruby": 476000,
        "prerequisites": [],
        "attr1Id": 10103,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 28,
        "timeSec": 970200,
        "fightforce": 31700,
        "timber": 340000,
        "stone": 340000,
        "ruby": 578000,
        "prerequisites": [],
        "attr1Id": 10103,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 215014,
    "branchId": 215,
    "row": 10,
    "col": 3,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_1109.webp",
    "name": {
      "vi": "Toàn Quân Xuất Kích",
      "en": "Full Army Deployment"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 30,
        "timeSec": 237840,
        "fightforce": 4700,
        "timber": 130000,
        "stone": 130000,
        "ruby": 221000,
        "prerequisites": [
          {
            "nodeId": 215012,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 57,
        "attr1Delta": 150,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 30,
        "timeSec": 404280,
        "fightforce": 10000,
        "timber": 160000,
        "stone": 160000,
        "ruby": 272000,
        "prerequisites": [],
        "attr1Id": 57,
        "attr1Delta": 150,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 30,
        "timeSec": 646800,
        "fightforce": 17000,
        "timber": 280000,
        "stone": 280000,
        "ruby": 476000,
        "prerequisites": [
          {
            "nodeId": 215012,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 57,
        "attr1Delta": 150,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 30,
        "timeSec": 646800,
        "fightforce": 24000,
        "timber": 280000,
        "stone": 280000,
        "ruby": 476000,
        "prerequisites": [],
        "attr1Id": 57,
        "attr1Delta": 150,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 30,
        "timeSec": 970200,
        "fightforce": 31700,
        "timber": 340000,
        "stone": 340000,
        "ruby": 578000,
        "prerequisites": [],
        "attr1Id": 57,
        "attr1Delta": 150,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 215015,
    "branchId": 215,
    "row": 11,
    "col": 2,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_204.webp",
    "name": {
      "vi": "Lính HP IV",
      "en": "Troop HP IV"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 32,
        "timeSec": 237840,
        "fightforce": 4700,
        "timber": 130000,
        "stone": 130000,
        "ruby": 221000,
        "prerequisites": [
          {
            "nodeId": 215013,
            "requiredLevel": 1
          },
          {
            "nodeId": 215014,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 10104,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 32,
        "timeSec": 404280,
        "fightforce": 10000,
        "timber": 160000,
        "stone": 160000,
        "ruby": 272000,
        "prerequisites": [],
        "attr1Id": 10104,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 32,
        "timeSec": 646800,
        "fightforce": 17000,
        "timber": 280000,
        "stone": 280000,
        "ruby": 476000,
        "prerequisites": [
          {
            "nodeId": 215013,
            "requiredLevel": 3
          },
          {
            "nodeId": 215014,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 10104,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 32,
        "timeSec": 646800,
        "fightforce": 24000,
        "timber": 280000,
        "stone": 280000,
        "ruby": 476000,
        "prerequisites": [],
        "attr1Id": 10104,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 32,
        "timeSec": 970200,
        "fightforce": 31700,
        "timber": 340000,
        "stone": 340000,
        "ruby": 578000,
        "prerequisites": [],
        "attr1Id": 10104,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 215016,
    "branchId": 215,
    "row": 12,
    "col": 2,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_307.webp",
    "name": {
      "vi": "Đặc Huấn Tải Trọng",
      "en": "Load Capacity Training"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 35,
        "timeSec": 237840,
        "fightforce": 4700,
        "timber": 130000,
        "stone": 130000,
        "ruby": 221000,
        "prerequisites": [
          {
            "nodeId": 215015,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1052,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 35,
        "timeSec": 404280,
        "fightforce": 10000,
        "timber": 160000,
        "stone": 160000,
        "ruby": 272000,
        "prerequisites": [],
        "attr1Id": 1052,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 35,
        "timeSec": 646800,
        "fightforce": 17000,
        "timber": 280000,
        "stone": 280000,
        "ruby": 476000,
        "prerequisites": [
          {
            "nodeId": 215015,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 1052,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 35,
        "timeSec": 646800,
        "fightforce": 24000,
        "timber": 280000,
        "stone": 280000,
        "ruby": 476000,
        "prerequisites": [],
        "attr1Id": 1052,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 35,
        "timeSec": 970200,
        "fightforce": 31700,
        "timber": 340000,
        "stone": 340000,
        "ruby": 578000,
        "prerequisites": [],
        "attr1Id": 1052,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 215017,
    "branchId": 215,
    "row": 13,
    "col": 1,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_203.webp",
    "name": {
      "vi": "Tấn Công của Lính V",
      "en": "Troop Attack V"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 35,
        "timeSec": 970200,
        "fightforce": 7700,
        "timber": 340000,
        "stone": 340000,
        "ruby": 578000,
        "prerequisites": [
          {
            "nodeId": 215016,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 10103,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 35,
        "timeSec": 1901640,
        "fightforce": 19900,
        "timber": 900000,
        "stone": 900000,
        "ruby": 1530000,
        "prerequisites": [],
        "attr1Id": 10103,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 35,
        "timeSec": 3213720,
        "fightforce": 35400,
        "timber": 1400000,
        "stone": 1400000,
        "ruby": 2380000,
        "prerequisites": [
          {
            "nodeId": 215016,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 10103,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 35,
        "timeSec": 4627740,
        "fightforce": 57900,
        "timber": 2900000,
        "stone": 2900000,
        "ruby": 4930000,
        "prerequisites": [],
        "attr1Id": 10103,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 35,
        "timeSec": 6663960,
        "fightforce": 88300,
        "timber": 6000000,
        "stone": 6000000,
        "ruby": 10200000,
        "prerequisites": [],
        "attr1Id": 10103,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 215018,
    "branchId": 215,
    "row": 13,
    "col": 3,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_1109.webp",
    "name": {
      "vi": "Toàn Quân Xuất Kích",
      "en": "Full Army Deployment"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 35,
        "timeSec": 970200,
        "fightforce": 7700,
        "timber": 340000,
        "stone": 340000,
        "ruby": 578000,
        "prerequisites": [
          {
            "nodeId": 215016,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 57,
        "attr1Delta": 150,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 35,
        "timeSec": 1901640,
        "fightforce": 19900,
        "timber": 900000,
        "stone": 900000,
        "ruby": 1530000,
        "prerequisites": [],
        "attr1Id": 57,
        "attr1Delta": 150,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 35,
        "timeSec": 3213720,
        "fightforce": 35400,
        "timber": 1400000,
        "stone": 1400000,
        "ruby": 2380000,
        "prerequisites": [
          {
            "nodeId": 215016,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 57,
        "attr1Delta": 150,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 35,
        "timeSec": 4627740,
        "fightforce": 57900,
        "timber": 2900000,
        "stone": 2900000,
        "ruby": 4930000,
        "prerequisites": [],
        "attr1Id": 57,
        "attr1Delta": 150,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 35,
        "timeSec": 6663960,
        "fightforce": 88300,
        "timber": 6000000,
        "stone": 6000000,
        "ruby": 10200000,
        "prerequisites": [],
        "attr1Id": 57,
        "attr1Delta": 150,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 215019,
    "branchId": 215,
    "row": 14,
    "col": 2,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_204.webp",
    "name": {
      "vi": "HP của Lính V",
      "en": "Troop HP V"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 35,
        "timeSec": 1358280,
        "fightforce": 10300,
        "timber": 600000,
        "stone": 600000,
        "ruby": 1020000,
        "prerequisites": [
          {
            "nodeId": 215017,
            "requiredLevel": 1
          },
          {
            "nodeId": 215018,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 10104,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 35,
        "timeSec": 2472120,
        "fightforce": 24200,
        "timber": 1100000,
        "stone": 1100000,
        "ruby": 1870000,
        "prerequisites": [],
        "attr1Id": 10104,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 35,
        "timeSec": 3856440,
        "fightforce": 41500,
        "timber": 1800000,
        "stone": 1800000,
        "ruby": 3060000,
        "prerequisites": [
          {
            "nodeId": 215017,
            "requiredLevel": 3
          },
          {
            "nodeId": 215018,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 10104,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 35,
        "timeSec": 5553300,
        "fightforce": 68200,
        "timber": 5000000,
        "stone": 5000000,
        "ruby": 8500000,
        "prerequisites": [],
        "attr1Id": 10104,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 35,
        "timeSec": 7996740,
        "fightforce": 104200,
        "timber": 8000000,
        "stone": 8000000,
        "ruby": 13600000,
        "prerequisites": [],
        "attr1Id": 10104,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 215020,
    "branchId": 215,
    "row": 15,
    "col": 2,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_307.webp",
    "name": {
      "vi": "Đặc Huấn Tải Trọng",
      "en": "Load Capacity Training"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 35,
        "timeSec": 1901640,
        "fightforce": 12200,
        "timber": 900000,
        "stone": 900000,
        "ruby": 1530000,
        "prerequisites": [
          {
            "nodeId": 215018,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 1052,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 35,
        "timeSec": 3213720,
        "fightforce": 27700,
        "timber": 1400000,
        "stone": 1400000,
        "ruby": 2380000,
        "prerequisites": [],
        "attr1Id": 1052,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 35,
        "timeSec": 4627740,
        "fightforce": 50200,
        "timber": 2900000,
        "stone": 2900000,
        "ruby": 4930000,
        "prerequisites": [
          {
            "nodeId": 215018,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 1052,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 35,
        "timeSec": 6663960,
        "fightforce": 80600,
        "timber": 6000000,
        "stone": 6000000,
        "ruby": 10200000,
        "prerequisites": [],
        "attr1Id": 1052,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 35,
        "timeSec": 9596040,
        "fightforce": 123100,
        "timber": 11000000,
        "stone": 11000000,
        "ruby": 18700000,
        "prerequisites": [],
        "attr1Id": 1052,
        "attr1Delta": 1.5,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 214001,
    "branchId": 214,
    "row": 1,
    "col": 2,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_tree_league_hero_dmg.webp",
    "name": {
      "vi": "Chuyên Hóa Liên Minh",
      "en": "League Specialization"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 1,
        "timeSec": 1140,
        "fightforce": 200,
        "timber": 1840,
        "stone": 1840,
        "ruby": 3128,
        "prerequisites": [],
        "attr1Id": 3018,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 1,
        "timeSec": 2460,
        "fightforce": 900,
        "timber": 4900,
        "stone": 4900,
        "ruby": 8330,
        "prerequisites": [],
        "attr1Id": 3018,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 1,
        "timeSec": 6120,
        "fightforce": 2000,
        "timber": 15000,
        "stone": 15000,
        "ruby": 25500,
        "prerequisites": [],
        "attr1Id": 3018,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 1,
        "timeSec": 26100,
        "fightforce": 4400,
        "timber": 70000,
        "stone": 70000,
        "ruby": 119000,
        "prerequisites": [],
        "attr1Id": 3018,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 1,
        "timeSec": 178380,
        "fightforce": 8800,
        "timber": 250000,
        "stone": 250000,
        "ruby": 425000,
        "prerequisites": [],
        "attr1Id": 3018,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 214002,
    "branchId": 214,
    "row": 2,
    "col": 1,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_tree_league_hero_atk.webp",
    "name": {
      "vi": "Tấn Công Liên minh",
      "en": "League Attack"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 1,
        "timeSec": 1440,
        "fightforce": 300,
        "timber": 1500,
        "stone": 1500,
        "ruby": 2550,
        "prerequisites": [
          {
            "nodeId": 214001,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 3103,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 1,
        "timeSec": 3180,
        "fightforce": 1100,
        "timber": 7800,
        "stone": 7800,
        "ruby": 13260,
        "prerequisites": [],
        "attr1Id": 3103,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 1,
        "timeSec": 9180,
        "fightforce": 2900,
        "timber": 38000,
        "stone": 38000,
        "ruby": 64600,
        "prerequisites": [
          {
            "nodeId": 214001,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 3103,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 1,
        "timeSec": 52200,
        "fightforce": 5700,
        "timber": 98000,
        "stone": 98000,
        "ruby": 166600,
        "prerequisites": [],
        "attr1Id": 3103,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 1,
        "timeSec": 303240,
        "fightforce": 10700,
        "timber": 320000,
        "stone": 320000,
        "ruby": 544000,
        "prerequisites": [],
        "attr1Id": 3103,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 214003,
    "branchId": 214,
    "row": 2,
    "col": 3,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_tree_league_hero_hp.webp",
    "name": {
      "vi": "Phòng Thủ Liên minh",
      "en": "League Defense"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 1,
        "timeSec": 1440,
        "fightforce": 300,
        "timber": 1500,
        "stone": 1500,
        "ruby": 2550,
        "prerequisites": [
          {
            "nodeId": 214001,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 3104,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 1,
        "timeSec": 3180,
        "fightforce": 1100,
        "timber": 7800,
        "stone": 7800,
        "ruby": 13260,
        "prerequisites": [],
        "attr1Id": 3104,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 1,
        "timeSec": 9180,
        "fightforce": 2900,
        "timber": 38000,
        "stone": 38000,
        "ruby": 64600,
        "prerequisites": [
          {
            "nodeId": 214001,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 3104,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 1,
        "timeSec": 52200,
        "fightforce": 5700,
        "timber": 98000,
        "stone": 98000,
        "ruby": 166600,
        "prerequisites": [],
        "attr1Id": 3104,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 1,
        "timeSec": 303240,
        "fightforce": 10700,
        "timber": 320000,
        "stone": 320000,
        "ruby": 544000,
        "prerequisites": [],
        "attr1Id": 3104,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 214004,
    "branchId": 214,
    "row": 3,
    "col": 2,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_tree_league_hero_dmgrdc.webp",
    "name": {
      "vi": "Giảm Sát Thương Liên minh",
      "en": "League DMG Reduction"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 5,
        "timeSec": 1860,
        "fightforce": 500,
        "timber": 4400,
        "stone": 4400,
        "ruby": 7480,
        "prerequisites": [
          {
            "nodeId": 214002,
            "requiredLevel": 1
          },
          {
            "nodeId": 214003,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 3019,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 5,
        "timeSec": 4080,
        "fightforce": 1500,
        "timber": 13000,
        "stone": 13000,
        "ruby": 22100,
        "prerequisites": [],
        "attr1Id": 3019,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 5,
        "timeSec": 13740,
        "fightforce": 3800,
        "timber": 64000,
        "stone": 64000,
        "ruby": 108800,
        "prerequisites": [
          {
            "nodeId": 214002,
            "requiredLevel": 3
          },
          {
            "nodeId": 214003,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 3019,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 5,
        "timeSec": 99120,
        "fightforce": 7100,
        "timber": 140000,
        "stone": 140000,
        "ruby": 238000,
        "prerequisites": [],
        "attr1Id": 3019,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 5,
        "timeSec": 485100,
        "fightforce": 13800,
        "timber": 560000,
        "stone": 560000,
        "ruby": 952000,
        "prerequisites": [],
        "attr1Id": 3019,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 214005,
    "branchId": 214,
    "row": 4,
    "col": 2,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_tree_nature_hero_dmg.webp",
    "name": {
      "vi": "Chuyên Hóa Thiên Nhiên",
      "en": "Nature Specialization"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 5,
        "timeSec": 2460,
        "fightforce": 700,
        "timber": 4900,
        "stone": 4900,
        "ruby": 8330,
        "prerequisites": [
          {
            "nodeId": 214004,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 5018,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 5,
        "timeSec": 6120,
        "fightforce": 1800,
        "timber": 15000,
        "stone": 15000,
        "ruby": 25500,
        "prerequisites": [],
        "attr1Id": 5018,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 5,
        "timeSec": 26100,
        "fightforce": 4200,
        "timber": 70000,
        "stone": 70000,
        "ruby": 119000,
        "prerequisites": [
          {
            "nodeId": 214004,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 5018,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 5,
        "timeSec": 178380,
        "fightforce": 8600,
        "timber": 250000,
        "stone": 250000,
        "ruby": 425000,
        "prerequisites": [],
        "attr1Id": 5018,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 5,
        "timeSec": 727680,
        "fightforce": 15900,
        "timber": 670000,
        "stone": 670000,
        "ruby": 1139000,
        "prerequisites": [],
        "attr1Id": 5018,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 214006,
    "branchId": 214,
    "row": 5,
    "col": 1,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_tree_nature_hero_atk.webp",
    "name": {
      "vi": "Tấn công Thiên Nhiên",
      "en": "Nature Attack"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 5,
        "timeSec": 3180,
        "fightforce": 800,
        "timber": 7800,
        "stone": 7800,
        "ruby": 13260,
        "prerequisites": [
          {
            "nodeId": 214005,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 5103,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 5,
        "timeSec": 9180,
        "fightforce": 2600,
        "timber": 38000,
        "stone": 38000,
        "ruby": 64600,
        "prerequisites": [],
        "attr1Id": 5103,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 5,
        "timeSec": 52200,
        "fightforce": 5400,
        "timber": 98000,
        "stone": 98000,
        "ruby": 166600,
        "prerequisites": [
          {
            "nodeId": 214005,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 5103,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 5,
        "timeSec": 303240,
        "fightforce": 10400,
        "timber": 320000,
        "stone": 320000,
        "ruby": 544000,
        "prerequisites": [],
        "attr1Id": 5103,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 5,
        "timeSec": 1018740,
        "fightforce": 20200,
        "timber": 1200000,
        "stone": 1200000,
        "ruby": 2040000,
        "prerequisites": [],
        "attr1Id": 5103,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 214007,
    "branchId": 214,
    "row": 5,
    "col": 3,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_tree_nature_hero_hp.webp",
    "name": {
      "vi": "Phòng Thủ Thiên Nhiên",
      "en": "Nature Defense"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 5,
        "timeSec": 3180,
        "fightforce": 800,
        "timber": 7800,
        "stone": 7800,
        "ruby": 13260,
        "prerequisites": [
          {
            "nodeId": 214005,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 5104,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 5,
        "timeSec": 9180,
        "fightforce": 2600,
        "timber": 38000,
        "stone": 38000,
        "ruby": 64600,
        "prerequisites": [],
        "attr1Id": 5104,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 5,
        "timeSec": 52200,
        "fightforce": 5400,
        "timber": 98000,
        "stone": 98000,
        "ruby": 166600,
        "prerequisites": [
          {
            "nodeId": 214005,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 5104,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 5,
        "timeSec": 303240,
        "fightforce": 10400,
        "timber": 320000,
        "stone": 320000,
        "ruby": 544000,
        "prerequisites": [],
        "attr1Id": 5104,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 5,
        "timeSec": 1018740,
        "fightforce": 20200,
        "timber": 1200000,
        "stone": 1200000,
        "ruby": 2040000,
        "prerequisites": [],
        "attr1Id": 5104,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 214008,
    "branchId": 214,
    "row": 6,
    "col": 2,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_tree_nature_hero_dmgrdc.webp",
    "name": {
      "vi": "Giảm Sát Thương Thiên Nhiên",
      "en": "Nature DMG Reduction"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 8,
        "timeSec": 4080,
        "fightforce": 1000,
        "timber": 13000,
        "stone": 13000,
        "ruby": 22100,
        "prerequisites": [
          {
            "nodeId": 214006,
            "requiredLevel": 1
          },
          {
            "nodeId": 214007,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 5019,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 8,
        "timeSec": 13740,
        "fightforce": 3300,
        "timber": 64000,
        "stone": 64000,
        "ruby": 108800,
        "prerequisites": [],
        "attr1Id": 5019,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 8,
        "timeSec": 99120,
        "fightforce": 6600,
        "timber": 140000,
        "stone": 140000,
        "ruby": 238000,
        "prerequisites": [
          {
            "nodeId": 214006,
            "requiredLevel": 3
          },
          {
            "nodeId": 214007,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 5019,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 8,
        "timeSec": 485100,
        "fightforce": 13300,
        "timber": 560000,
        "stone": 560000,
        "ruby": 952000,
        "prerequisites": [],
        "attr1Id": 5019,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 8,
        "timeSec": 1426200,
        "fightforce": 24800,
        "timber": 1700000,
        "stone": 1700000,
        "ruby": 2890000,
        "prerequisites": [],
        "attr1Id": 5019,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 214009,
    "branchId": 214,
    "row": 7,
    "col": 2,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_tree_horde_hero_dmg.webp",
    "name": {
      "vi": "Bộ Tộc Chuyên Hóa",
      "en": "Horde Specialization"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 10,
        "timeSec": 6120,
        "fightforce": 1100,
        "timber": 15000,
        "stone": 15000,
        "ruby": 25500,
        "prerequisites": [
          {
            "nodeId": 214008,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 4018,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 10,
        "timeSec": 26100,
        "fightforce": 3500,
        "timber": 70000,
        "stone": 70000,
        "ruby": 119000,
        "prerequisites": [],
        "attr1Id": 4018,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 10,
        "timeSec": 178380,
        "fightforce": 7900,
        "timber": 250000,
        "stone": 250000,
        "ruby": 425000,
        "prerequisites": [
          {
            "nodeId": 214008,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 4018,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 10,
        "timeSec": 727680,
        "fightforce": 15200,
        "timber": 670000,
        "stone": 670000,
        "ruby": 1139000,
        "prerequisites": [],
        "attr1Id": 4018,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 10,
        "timeSec": 1854060,
        "fightforce": 28300,
        "timber": 2200000,
        "stone": 2200000,
        "ruby": 3740000,
        "prerequisites": [],
        "attr1Id": 4018,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 214010,
    "branchId": 214,
    "row": 8,
    "col": 1,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_tree_horde_hero_atk.webp",
    "name": {
      "vi": "Bộ Tộc Tấn Công",
      "en": "Horde Attack"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 11,
        "timeSec": 9180,
        "fightforce": 1800,
        "timber": 38000,
        "stone": 38000,
        "ruby": 64600,
        "prerequisites": [
          {
            "nodeId": 214009,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 4103,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 11,
        "timeSec": 52200,
        "fightforce": 4600,
        "timber": 98000,
        "stone": 98000,
        "ruby": 166600,
        "prerequisites": [],
        "attr1Id": 4103,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 11,
        "timeSec": 303240,
        "fightforce": 9600,
        "timber": 320000,
        "stone": 320000,
        "ruby": 544000,
        "prerequisites": [
          {
            "nodeId": 214009,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 4103,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 11,
        "timeSec": 1018740,
        "fightforce": 19400,
        "timber": 1200000,
        "stone": 1200000,
        "ruby": 2040000,
        "prerequisites": [],
        "attr1Id": 4103,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 11,
        "timeSec": 2410320,
        "fightforce": 34100,
        "timber": 2800000,
        "stone": 2800000,
        "ruby": 4760000,
        "prerequisites": [],
        "attr1Id": 4103,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 214011,
    "branchId": 214,
    "row": 8,
    "col": 3,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_tree_horde_hero_hp.webp",
    "name": {
      "vi": "Bộ Tộc Phòng Thủ",
      "en": "Horde Defense"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 15,
        "timeSec": 9180,
        "fightforce": 1800,
        "timber": 38000,
        "stone": 38000,
        "ruby": 64600,
        "prerequisites": [
          {
            "nodeId": 214009,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 4104,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 15,
        "timeSec": 52200,
        "fightforce": 4600,
        "timber": 98000,
        "stone": 98000,
        "ruby": 166600,
        "prerequisites": [],
        "attr1Id": 4104,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 15,
        "timeSec": 303240,
        "fightforce": 9600,
        "timber": 320000,
        "stone": 320000,
        "ruby": 544000,
        "prerequisites": [
          {
            "nodeId": 214009,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 4104,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 15,
        "timeSec": 1018740,
        "fightforce": 19400,
        "timber": 1200000,
        "stone": 1200000,
        "ruby": 2040000,
        "prerequisites": [],
        "attr1Id": 4104,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 15,
        "timeSec": 2410320,
        "fightforce": 34100,
        "timber": 2800000,
        "stone": 2800000,
        "ruby": 4760000,
        "prerequisites": [],
        "attr1Id": 4104,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 214012,
    "branchId": 214,
    "row": 9,
    "col": 2,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_tree_horde_hero_dmgrdc.webp",
    "name": {
      "vi": "Bộ Tộc Giảm ST",
      "en": "Horde DMG Reduction"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 16,
        "timeSec": 13740,
        "fightforce": 2300,
        "timber": 64000,
        "stone": 64000,
        "ruby": 108800,
        "prerequisites": [
          {
            "nodeId": 214010,
            "requiredLevel": 1
          },
          {
            "nodeId": 214011,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 4019,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 16,
        "timeSec": 99120,
        "fightforce": 5600,
        "timber": 140000,
        "stone": 140000,
        "ruby": 238000,
        "prerequisites": [],
        "attr1Id": 4019,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 16,
        "timeSec": 485100,
        "fightforce": 12300,
        "timber": 560000,
        "stone": 560000,
        "ruby": 952000,
        "prerequisites": [
          {
            "nodeId": 214010,
            "requiredLevel": 3
          },
          {
            "nodeId": 214011,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 4019,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 16,
        "timeSec": 1426200,
        "fightforce": 23800,
        "timber": 1700000,
        "stone": 1700000,
        "ruby": 2890000,
        "prerequisites": [],
        "attr1Id": 4019,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 16,
        "timeSec": 2892360,
        "fightforce": 40200,
        "timber": 3500000,
        "stone": 3500000,
        "ruby": 5950000,
        "prerequisites": [],
        "attr1Id": 4019,
        "attr1Delta": 2,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 214013,
    "branchId": 214,
    "row": 10,
    "col": 2,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_tree_league_hero_dmg.webp",
    "name": {
      "vi": "Chuyên Hóa Liên Minh",
      "en": "League Specialization"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 17,
        "timeSec": 26100,
        "fightforce": 2400,
        "timber": 70000,
        "stone": 70000,
        "ruby": 119000,
        "prerequisites": [
          {
            "nodeId": 214012,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 3018,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 17,
        "timeSec": 178380,
        "fightforce": 6800,
        "timber": 250000,
        "stone": 250000,
        "ruby": 425000,
        "prerequisites": [],
        "attr1Id": 3018,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 17,
        "timeSec": 727680,
        "fightforce": 14100,
        "timber": 670000,
        "stone": 670000,
        "ruby": 1139000,
        "prerequisites": [
          {
            "nodeId": 214012,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 3018,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 17,
        "timeSec": 1854060,
        "fightforce": 27200,
        "timber": 2200000,
        "stone": 2200000,
        "ruby": 3740000,
        "prerequisites": [],
        "attr1Id": 3018,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 17,
        "timeSec": 3470820,
        "fightforce": 48600,
        "timber": 5800000,
        "stone": 5800000,
        "ruby": 9860000,
        "prerequisites": [],
        "attr1Id": 3018,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 214014,
    "branchId": 214,
    "row": 11,
    "col": 1,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_tree_league_hero_atk.webp",
    "name": {
      "vi": "Tấn Công Liên minh",
      "en": "League Attack"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 18,
        "timeSec": 52200,
        "fightforce": 2800,
        "timber": 98000,
        "stone": 98000,
        "ruby": 166600,
        "prerequisites": [
          {
            "nodeId": 214013,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 3103,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 18,
        "timeSec": 303240,
        "fightforce": 7800,
        "timber": 320000,
        "stone": 320000,
        "ruby": 544000,
        "prerequisites": [],
        "attr1Id": 3103,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 18,
        "timeSec": 1018740,
        "fightforce": 17600,
        "timber": 1200000,
        "stone": 1200000,
        "ruby": 2040000,
        "prerequisites": [
          {
            "nodeId": 214013,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 3103,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 18,
        "timeSec": 2410320,
        "fightforce": 32300,
        "timber": 2800000,
        "stone": 2800000,
        "ruby": 4760000,
        "prerequisites": [],
        "attr1Id": 3103,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 18,
        "timeSec": 4164960,
        "fightforce": 57600,
        "timber": 8100000,
        "stone": 8100000,
        "ruby": 13770000,
        "prerequisites": [],
        "attr1Id": 3103,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 214015,
    "branchId": 214,
    "row": 11,
    "col": 3,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_tree_league_hero_hp.webp",
    "name": {
      "vi": "Phòng Thủ Liên minh",
      "en": "League Defense"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 19,
        "timeSec": 52200,
        "fightforce": 2800,
        "timber": 98000,
        "stone": 98000,
        "ruby": 166600,
        "prerequisites": [
          {
            "nodeId": 214013,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 3104,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 19,
        "timeSec": 303240,
        "fightforce": 7800,
        "timber": 320000,
        "stone": 320000,
        "ruby": 544000,
        "prerequisites": [],
        "attr1Id": 3104,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 19,
        "timeSec": 1018740,
        "fightforce": 17600,
        "timber": 1200000,
        "stone": 1200000,
        "ruby": 2040000,
        "prerequisites": [
          {
            "nodeId": 214013,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 3104,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 19,
        "timeSec": 2410320,
        "fightforce": 32300,
        "timber": 2800000,
        "stone": 2800000,
        "ruby": 4760000,
        "prerequisites": [],
        "attr1Id": 3104,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 19,
        "timeSec": 4164960,
        "fightforce": 57600,
        "timber": 8100000,
        "stone": 8100000,
        "ruby": 13770000,
        "prerequisites": [],
        "attr1Id": 3104,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 214016,
    "branchId": 214,
    "row": 12,
    "col": 2,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_tree_league_hero_dmgrdc.webp",
    "name": {
      "vi": "Giảm Sát Thương Liên minh",
      "en": "League DMG Reduction"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 20,
        "timeSec": 99120,
        "fightforce": 3300,
        "timber": 140000,
        "stone": 140000,
        "ruby": 238000,
        "prerequisites": [
          {
            "nodeId": 214014,
            "requiredLevel": 1
          },
          {
            "nodeId": 214015,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 3019,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 20,
        "timeSec": 485100,
        "fightforce": 10000,
        "timber": 560000,
        "stone": 560000,
        "ruby": 952000,
        "prerequisites": [],
        "attr1Id": 3019,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 20,
        "timeSec": 1426200,
        "fightforce": 21500,
        "timber": 1700000,
        "stone": 1700000,
        "ruby": 2890000,
        "prerequisites": [
          {
            "nodeId": 214014,
            "requiredLevel": 3
          },
          {
            "nodeId": 214015,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 3019,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 20,
        "timeSec": 2892360,
        "fightforce": 37900,
        "timber": 3500000,
        "stone": 3500000,
        "ruby": 5950000,
        "prerequisites": [],
        "attr1Id": 3019,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 20,
        "timeSec": 4997940,
        "fightforce": 66700,
        "timber": 11000000,
        "stone": 11000000,
        "ruby": 18700000,
        "prerequisites": [],
        "attr1Id": 3019,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 214017,
    "branchId": 214,
    "row": 13,
    "col": 2,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_tree_nature_hero_dmg.webp",
    "name": {
      "vi": "Chuyên Hóa Thiên Nhiên",
      "en": "Nature Specialization"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 21,
        "timeSec": 178380,
        "fightforce": 4400,
        "timber": 250000,
        "stone": 250000,
        "ruby": 425000,
        "prerequisites": [
          {
            "nodeId": 214016,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 5018,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 21,
        "timeSec": 727680,
        "fightforce": 11700,
        "timber": 670000,
        "stone": 670000,
        "ruby": 1139000,
        "prerequisites": [],
        "attr1Id": 5018,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 21,
        "timeSec": 1854060,
        "fightforce": 24800,
        "timber": 2200000,
        "stone": 2200000,
        "ruby": 3740000,
        "prerequisites": [
          {
            "nodeId": 214016,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 5018,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 21,
        "timeSec": 3470820,
        "fightforce": 46200,
        "timber": 5800000,
        "stone": 5800000,
        "ruby": 9860000,
        "prerequisites": [],
        "attr1Id": 5018,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 21,
        "timeSec": 5997540,
        "fightforce": 80300,
        "timber": 15000000,
        "stone": 15000000,
        "ruby": 25500000,
        "prerequisites": [],
        "attr1Id": 5018,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 214018,
    "branchId": 214,
    "row": 14,
    "col": 1,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_tree_nature_hero_atk.webp",
    "name": {
      "vi": "Tấn công Thiên Nhiên",
      "en": "Nature Attack"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 22,
        "timeSec": 303240,
        "fightforce": 5000,
        "timber": 320000,
        "stone": 320000,
        "ruby": 544000,
        "prerequisites": [
          {
            "nodeId": 214017,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 5103,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 22,
        "timeSec": 1018740,
        "fightforce": 14800,
        "timber": 1200000,
        "stone": 1200000,
        "ruby": 2040000,
        "prerequisites": [],
        "attr1Id": 5103,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 22,
        "timeSec": 2410320,
        "fightforce": 29500,
        "timber": 2800000,
        "stone": 2800000,
        "ruby": 4760000,
        "prerequisites": [
          {
            "nodeId": 214017,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 5103,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 22,
        "timeSec": 4164960,
        "fightforce": 54800,
        "timber": 8100000,
        "stone": 8100000,
        "ruby": 13770000,
        "prerequisites": [],
        "attr1Id": 5103,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 22,
        "timeSec": 7197060,
        "fightforce": 95200,
        "timber": 21000000,
        "stone": 21000000,
        "ruby": 35700000,
        "prerequisites": [],
        "attr1Id": 5103,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 214019,
    "branchId": 214,
    "row": 14,
    "col": 3,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_tree_nature_hero_hp.webp",
    "name": {
      "vi": "Phòng Thủ Thiên Nhiên",
      "en": "Nature Defense"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 23,
        "timeSec": 303240,
        "fightforce": 5000,
        "timber": 320000,
        "stone": 320000,
        "ruby": 544000,
        "prerequisites": [
          {
            "nodeId": 214017,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 5104,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 23,
        "timeSec": 1018740,
        "fightforce": 14800,
        "timber": 1200000,
        "stone": 1200000,
        "ruby": 2040000,
        "prerequisites": [],
        "attr1Id": 5104,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 23,
        "timeSec": 2410320,
        "fightforce": 29500,
        "timber": 2800000,
        "stone": 2800000,
        "ruby": 4760000,
        "prerequisites": [
          {
            "nodeId": 214017,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 5104,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 23,
        "timeSec": 4164960,
        "fightforce": 54800,
        "timber": 8100000,
        "stone": 8100000,
        "ruby": 13770000,
        "prerequisites": [],
        "attr1Id": 5104,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 23,
        "timeSec": 7197060,
        "fightforce": 95200,
        "timber": 21000000,
        "stone": 21000000,
        "ruby": 35700000,
        "prerequisites": [],
        "attr1Id": 5104,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 214020,
    "branchId": 214,
    "row": 15,
    "col": 2,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_tree_nature_hero_dmgrdc.webp",
    "name": {
      "vi": "Giảm Sát Thương Thiên Nhiên",
      "en": "Nature DMG Reduction"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 25,
        "timeSec": 485100,
        "fightforce": 6700,
        "timber": 560000,
        "stone": 560000,
        "ruby": 952000,
        "prerequisites": [
          {
            "nodeId": 214018,
            "requiredLevel": 1
          },
          {
            "nodeId": 214019,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 5019,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 25,
        "timeSec": 1426200,
        "fightforce": 18200,
        "timber": 1700000,
        "stone": 1700000,
        "ruby": 2890000,
        "prerequisites": [],
        "attr1Id": 5019,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 25,
        "timeSec": 2892360,
        "fightforce": 34600,
        "timber": 3500000,
        "stone": 3500000,
        "ruby": 5950000,
        "prerequisites": [
          {
            "nodeId": 214018,
            "requiredLevel": 3
          },
          {
            "nodeId": 214019,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 5019,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 25,
        "timeSec": 4997940,
        "fightforce": 63400,
        "timber": 11000000,
        "stone": 11000000,
        "ruby": 18700000,
        "prerequisites": [],
        "attr1Id": 5019,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 25,
        "timeSec": 7197060,
        "fightforce": 103800,
        "timber": 21000000,
        "stone": 21000000,
        "ruby": 35700000,
        "prerequisites": [],
        "attr1Id": 5019,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 214021,
    "branchId": 214,
    "row": 16,
    "col": 2,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_tree_horde_hero_dmg.webp",
    "name": {
      "vi": "Bộ Tộc Chuyên Hóa",
      "en": "Horde Specialization"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 28,
        "timeSec": 727680,
        "fightforce": 7300,
        "timber": 670000,
        "stone": 670000,
        "ruby": 1139000,
        "prerequisites": [
          {
            "nodeId": 214020,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 4018,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 28,
        "timeSec": 1854060,
        "fightforce": 20400,
        "timber": 2200000,
        "stone": 2200000,
        "ruby": 3740000,
        "prerequisites": [],
        "attr1Id": 4018,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 28,
        "timeSec": 3470820,
        "fightforce": 41800,
        "timber": 5800000,
        "stone": 5800000,
        "ruby": 9860000,
        "prerequisites": [
          {
            "nodeId": 214020,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 4018,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 28,
        "timeSec": 4997940,
        "fightforce": 70600,
        "timber": 11000000,
        "stone": 11000000,
        "ruby": 18700000,
        "prerequisites": [],
        "attr1Id": 4018,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 28,
        "timeSec": 7197060,
        "fightforce": 111000,
        "timber": 21000000,
        "stone": 21000000,
        "ruby": 35700000,
        "prerequisites": [],
        "attr1Id": 4018,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 214022,
    "branchId": 214,
    "row": 17,
    "col": 1,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_tree_horde_hero_atk.webp",
    "name": {
      "vi": "Bộ Tộc Tấn Công",
      "en": "Horde Attack"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 30,
        "timeSec": 1018740,
        "fightforce": 9800,
        "timber": 1200000,
        "stone": 1200000,
        "ruby": 2040000,
        "prerequisites": [
          {
            "nodeId": 214021,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 4103,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 30,
        "timeSec": 2410320,
        "fightforce": 24500,
        "timber": 2800000,
        "stone": 2800000,
        "ruby": 4760000,
        "prerequisites": [],
        "attr1Id": 4103,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 30,
        "timeSec": 4164960,
        "fightforce": 49800,
        "timber": 8100000,
        "stone": 8100000,
        "ruby": 13770000,
        "prerequisites": [
          {
            "nodeId": 214021,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 4103,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 30,
        "timeSec": 5997540,
        "fightforce": 83900,
        "timber": 15000000,
        "stone": 15000000,
        "ruby": 25500000,
        "prerequisites": [],
        "attr1Id": 4103,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 30,
        "timeSec": 7197060,
        "fightforce": 124300,
        "timber": 21000000,
        "stone": 21000000,
        "ruby": 35700000,
        "prerequisites": [],
        "attr1Id": 4103,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 214023,
    "branchId": 214,
    "row": 17,
    "col": 3,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_tree_horde_hero_hp.webp",
    "name": {
      "vi": "Bộ Tộc Phòng Thủ",
      "en": "Horde Defense"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 30,
        "timeSec": 1018740,
        "fightforce": 9800,
        "timber": 1200000,
        "stone": 1200000,
        "ruby": 2040000,
        "prerequisites": [
          {
            "nodeId": 214021,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 4104,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 30,
        "timeSec": 2410320,
        "fightforce": 24500,
        "timber": 2800000,
        "stone": 2800000,
        "ruby": 4760000,
        "prerequisites": [],
        "attr1Id": 4104,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 30,
        "timeSec": 4164960,
        "fightforce": 49800,
        "timber": 8100000,
        "stone": 8100000,
        "ruby": 13770000,
        "prerequisites": [
          {
            "nodeId": 214021,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 4104,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 30,
        "timeSec": 5997540,
        "fightforce": 83900,
        "timber": 15000000,
        "stone": 15000000,
        "ruby": 25500000,
        "prerequisites": [],
        "attr1Id": 4104,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 30,
        "timeSec": 7197060,
        "fightforce": 124300,
        "timber": 21000000,
        "stone": 21000000,
        "ruby": 35700000,
        "prerequisites": [],
        "attr1Id": 4104,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 214024,
    "branchId": 214,
    "row": 18,
    "col": 2,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_tree_horde_hero_dmgrdc.webp",
    "name": {
      "vi": "Bộ Tộc Giảm ST",
      "en": "Horde DMG Reduction"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 35,
        "timeSec": 1426200,
        "fightforce": 11500,
        "timber": 1700000,
        "stone": 1700000,
        "ruby": 2890000,
        "prerequisites": [
          {
            "nodeId": 214022,
            "requiredLevel": 1
          },
          {
            "nodeId": 214023,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 4019,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 35,
        "timeSec": 2410320,
        "fightforce": 26200,
        "timber": 2800000,
        "stone": 2800000,
        "ruby": 4760000,
        "prerequisites": [],
        "attr1Id": 4019,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 35,
        "timeSec": 3470820,
        "fightforce": 47600,
        "timber": 5800000,
        "stone": 5800000,
        "ruby": 9860000,
        "prerequisites": [
          {
            "nodeId": 214022,
            "requiredLevel": 3
          },
          {
            "nodeId": 214023,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 4019,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 35,
        "timeSec": 4997940,
        "fightforce": 76400,
        "timber": 11000000,
        "stone": 11000000,
        "ruby": 18700000,
        "prerequisites": [],
        "attr1Id": 4019,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 35,
        "timeSec": 7197060,
        "fightforce": 116800,
        "timber": 21000000,
        "stone": 21000000,
        "ruby": 35700000,
        "prerequisites": [],
        "attr1Id": 4019,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 214025,
    "branchId": 214,
    "row": 19,
    "col": 2,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_tree_all_hero_dmg.webp",
    "name": {
      "vi": "Chuyên Hóa Sát thương",
      "en": "Damage Specialization"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 35,
        "timeSec": 1854060,
        "fightforce": 13100,
        "timber": 2200000,
        "stone": 2200000,
        "ruby": 3740000,
        "prerequisites": [
          {
            "nodeId": 214024,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 18,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 35,
        "timeSec": 2892360,
        "fightforce": 29500,
        "timber": 3500000,
        "stone": 3500000,
        "ruby": 5950000,
        "prerequisites": [],
        "attr1Id": 18,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 35,
        "timeSec": 4164960,
        "fightforce": 54800,
        "timber": 8100000,
        "stone": 8100000,
        "ruby": 13770000,
        "prerequisites": [
          {
            "nodeId": 214024,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 18,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 35,
        "timeSec": 5997540,
        "fightforce": 88900,
        "timber": 15000000,
        "stone": 15000000,
        "ruby": 25500000,
        "prerequisites": [],
        "attr1Id": 18,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 35,
        "timeSec": 7197060,
        "fightforce": 129300,
        "timber": 21000000,
        "stone": 21000000,
        "ruby": 35700000,
        "prerequisites": [],
        "attr1Id": 18,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 214026,
    "branchId": 214,
    "row": 20,
    "col": 1,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_tree_all_hero_atk.webp",
    "name": {
      "vi": "Chuyên Hóa Tấn công",
      "en": "Attack Specialization"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 35,
        "timeSec": 2410320,
        "fightforce": 14700,
        "timber": 2800000,
        "stone": 2800000,
        "ruby": 4760000,
        "prerequisites": [
          {
            "nodeId": 214025,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 103,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 35,
        "timeSec": 3470820,
        "fightforce": 36100,
        "timber": 5800000,
        "stone": 5800000,
        "ruby": 9860000,
        "prerequisites": [],
        "attr1Id": 103,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 35,
        "timeSec": 4997940,
        "fightforce": 64900,
        "timber": 11000000,
        "stone": 11000000,
        "ruby": 18700000,
        "prerequisites": [
          {
            "nodeId": 214025,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 103,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 35,
        "timeSec": 5997540,
        "fightforce": 99000,
        "timber": 15000000,
        "stone": 15000000,
        "ruby": 25500000,
        "prerequisites": [],
        "attr1Id": 103,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 35,
        "timeSec": 7197060,
        "fightforce": 139400,
        "timber": 21000000,
        "stone": 21000000,
        "ruby": 35700000,
        "prerequisites": [],
        "attr1Id": 103,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 214027,
    "branchId": 214,
    "row": 20,
    "col": 3,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_tree_all_hero_hp.webp",
    "name": {
      "vi": "Chuyên Hóa Phòng thủ",
      "en": "Defense Specialization"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 35,
        "timeSec": 2410320,
        "fightforce": 14700,
        "timber": 2800000,
        "stone": 2800000,
        "ruby": 4760000,
        "prerequisites": [
          {
            "nodeId": 214025,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 104,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 35,
        "timeSec": 3470820,
        "fightforce": 36100,
        "timber": 5800000,
        "stone": 5800000,
        "ruby": 9860000,
        "prerequisites": [],
        "attr1Id": 104,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 35,
        "timeSec": 4997940,
        "fightforce": 64900,
        "timber": 11000000,
        "stone": 11000000,
        "ruby": 18700000,
        "prerequisites": [
          {
            "nodeId": 214025,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 104,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 35,
        "timeSec": 5997540,
        "fightforce": 99000,
        "timber": 15000000,
        "stone": 15000000,
        "ruby": 25500000,
        "prerequisites": [],
        "attr1Id": 104,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 35,
        "timeSec": 7197060,
        "fightforce": 139400,
        "timber": 21000000,
        "stone": 21000000,
        "ruby": 35700000,
        "prerequisites": [],
        "attr1Id": 104,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  },
  {
    "id": 214028,
    "branchId": 214,
    "row": 21,
    "col": 2,
    "maxLevel": 5,
    "icon": "/images/tech/research/tech_tree_all_hero_dmgrdc.webp",
    "name": {
      "vi": "Chuyên Hóa Giảm Sát Thương",
      "en": "DMG Reduction Specialization"
    },
    "levels": [
      {
        "lv": 1,
        "cottageLv": 35,
        "timeSec": 2892360,
        "fightforce": 16400,
        "timber": 3500000,
        "stone": 3500000,
        "ruby": 5950000,
        "prerequisites": [
          {
            "nodeId": 214026,
            "requiredLevel": 1
          },
          {
            "nodeId": 214027,
            "requiredLevel": 1
          }
        ],
        "attr1Id": 19,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 2,
        "cottageLv": 35,
        "timeSec": 4164960,
        "fightforce": 41700,
        "timber": 8100000,
        "stone": 8100000,
        "ruby": 13770000,
        "prerequisites": [],
        "attr1Id": 19,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 3,
        "cottageLv": 35,
        "timeSec": 4997940,
        "fightforce": 70500,
        "timber": 11000000,
        "stone": 11000000,
        "ruby": 18700000,
        "prerequisites": [
          {
            "nodeId": 214026,
            "requiredLevel": 3
          },
          {
            "nodeId": 214027,
            "requiredLevel": 3
          }
        ],
        "attr1Id": 19,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 4,
        "cottageLv": 35,
        "timeSec": 5997540,
        "fightforce": 104600,
        "timber": 15000000,
        "stone": 15000000,
        "ruby": 25500000,
        "prerequisites": [],
        "attr1Id": 19,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      },
      {
        "lv": 5,
        "cottageLv": 35,
        "timeSec": 7197060,
        "fightforce": 145000,
        "timber": 21000000,
        "stone": 21000000,
        "ruby": 35700000,
        "prerequisites": [],
        "attr1Id": 19,
        "attr1Delta": 3,
        "attr2Id": 0,
        "attr2Delta": 0
      }
    ]
  }
];

const NODE_MAP = new Map<number, TechnologyNodeMeta>(
  TECHNOLOGY_NODES.map((n) => [n.id, n])
);

const BRANCH_MAP = new Map<number, TechnologyBranchMeta>(
  TECHNOLOGY_BRANCHES.map((b) => [b.id, b])
);

export function getTechnologyNodeById(nodeId: number): TechnologyNodeMeta {
  return NODE_MAP.get(nodeId) ?? TECHNOLOGY_NODES[0]!;
}

export function getTechnologyBranchById(branchId: number): TechnologyBranchMeta {
  return BRANCH_MAP.get(branchId) ?? TECHNOLOGY_BRANCHES[0]!;
}

export function getTechnologyNodesByBranch(
  branchId: number
): readonly TechnologyNodeMeta[] {
  return TECHNOLOGY_NODES.filter((n) => n.branchId === branchId);
}

export function computeTechQueueUpgradePlan(
  queue: TechnologyQueueState,
  buffs: TechnologyGlobalBuffs
): TechnologyQueueUpgradePlan {
  const node = getTechnologyNodeById(queue.nodeId);
  const branch = getTechnologyBranchById(node.branchId);

  const safeFrom = Math.max(0, Math.min(node.maxLevel - 1, Math.floor(queue.fromLevel)));
  const safeTo = Math.max(
    safeFrom + 1,
    Math.min(node.maxLevel, Math.floor(queue.toLevel))
  );

  const activeSteps = node.levels.filter(
    (s) => s.lv > safeFrom && s.lv <= safeTo
  );

  const fromStep =
    safeFrom === 0 ? undefined : node.levels.find((s) => s.lv === safeFrom);
  const toStep = node.levels.find((s) => s.lv === safeTo);

  const currentFightforce = fromStep?.fightforce ?? 0;
  const targetFightforce = toStep?.fightforce ?? currentFightforce;
  const deltaFightforce = Math.max(0, targetFightforce - currentFightforce);

  // Attributes in technology_advanced_detail are per-level increments
  const distinctAttrIds: number[] = [];
  for (const step of node.levels) {
    if (step.attr1Id > 0 && !distinctAttrIds.includes(step.attr1Id)) {
      distinctAttrIds.push(step.attr1Id);
    }
    if (step.attr2Id > 0 && !distinctAttrIds.includes(step.attr2Id)) {
      distinctAttrIds.push(step.attr2Id);
    }
  }

  const attributeGains: TechnologyAttributeGain[] = distinctAttrIds.map(
    (attrId) => {
      const meta = TECHNOLOGY_ATTRIBUTE_META[attrId] ?? {
        label: { vi: `Thuộc tính #${attrId}`, en: `Attribute #${attrId}` },
        isPercent: false,
      };
      let currentValue = 0;
      let targetValue = 0;
      for (const step of node.levels) {
        const gain =
          (step.attr1Id === attrId ? step.attr1Delta : 0) +
          (step.attr2Id === attrId ? step.attr2Delta : 0);
        if (step.lv <= safeFrom) {
          currentValue += gain;
        }
        if (step.lv <= safeTo) {
          targetValue += gain;
        }
      }
      currentValue = Number(currentValue.toFixed(4));
      targetValue = Number(targetValue.toFixed(4));
      const deltaValue = Number(Math.max(0, targetValue - currentValue).toFixed(4));
      return {
        attrId,
        label: meta.label,
        isPercent: meta.isPercent,
        currentValue,
        targetValue,
        deltaValue,
      };
    }
  );

  // Prerequisites & Required Research Cottage Level across activeSteps
  let requiredCottageLevel = 1;
  const prereqLevelMap = new Map<number, number>();
  for (const step of activeSteps) {
    if (step.cottageLv > requiredCottageLevel) {
      requiredCottageLevel = step.cottageLv;
    }
    for (const pre of step.prerequisites) {
      const prevReq = prereqLevelMap.get(pre.nodeId) ?? 0;
      if (pre.requiredLevel > prevReq) {
        prereqLevelMap.set(pre.nodeId, pre.requiredLevel);
      }
    }
  }

  const prerequisites: TechnologyPrerequisiteStatus[] = Array.from(
    prereqLevelMap.entries()
  ).map(([preNodeId, reqLv]) => {
    const preNode = getTechnologyNodeById(preNodeId);
    return {
      nodeId: preNodeId,
      nodeName: preNode.name,
      nodeIcon: preNode.icon,
      branchId: preNode.branchId,
      requiredLevel: reqLv,
    };
  });

  // Resource costs & discounts
  const costReductionRatio =
    Math.max(0, Math.min(80, buffs.costReductionPct)) / 100;
  const costMultiplier = Math.max(0, 1 - costReductionRatio);

  const baseCosts: Record<TechnologyResourceKey, number> = {
    timber: 0,
    stone: 0,
    ruby: 0,
  };
  const discountedCosts: Record<TechnologyResourceKey, number> = {
    timber: 0,
    stone: 0,
    ruby: 0,
  };

  let baseTimeSeconds = 0;
  let effectiveTimeSeconds = 0;
  const speedDivisor = 1 + Math.max(0, buffs.researchSpeedPct) / 100;

  for (const step of activeSteps) {
    baseCosts.timber += step.timber;
    baseCosts.stone += step.stone;
    baseCosts.ruby += step.ruby;

    discountedCosts.timber += Math.ceil(step.timber * costMultiplier);
    discountedCosts.stone += Math.ceil(step.stone * costMultiplier);
    discountedCosts.ruby += Math.ceil(step.ruby * costMultiplier);

    baseTimeSeconds += step.timeSec;
    effectiveTimeSeconds += Math.floor(step.timeSec / speedDivisor);
  }

  const savedTimeSeconds = Math.max(0, baseTimeSeconds - effectiveTimeSeconds);
  const instantDiamonds = Math.ceil(effectiveTimeSeconds / 3);

  const resourceKeys: readonly TechnologyResourceKey[] = [
    "timber",
    "ruby",
    "stone",
  ];
  const resourceStatuses: TechnologyResourceStatus[] = resourceKeys
    .filter((k) => discountedCosts[k] > 0 || baseCosts[k] > 0)
    .map((key) => ({
      key,
      label: CONSTRUCTION_RESOURCE_META[key].label,
      icon: CONSTRUCTION_RESOURCE_META[key].icon,
      baseRequired: baseCosts[key],
      required: discountedCosts[key],
    }));

  return {
    queueId: queue.queueId,
    node,
    branch,
    fromLevel: safeFrom,
    toLevel: safeTo,
    currentFightforce,
    targetFightforce,
    deltaFightforce,
    attributeGains,
    requiredCottageLevel,
    prerequisites,
    baseCosts,
    discountedCosts,
    resourceStatuses,
    baseTimeSeconds,
    effectiveTimeSeconds,
    savedTimeSeconds,
    instantDiamonds,
  };
}

export function aggregateTechQueues(
  plans: readonly TechnologyQueueUpgradePlan[]
): TechnologyGlobalSummary {
  const totalBaseCosts: Record<TechnologyResourceKey, number> = {
    timber: 0,
    stone: 0,
    ruby: 0,
  };
  const totalDiscountedCosts: Record<TechnologyResourceKey, number> = {
    timber: 0,
    stone: 0,
    ruby: 0,
  };

  let totalDeltaFightforce = 0;
  let totalInstantDiamonds = 0;
  let parallelTimeSeconds = 0;
  let totalSpeedupTimeSeconds = 0;
  let maxRequiredCottageLevel = 1;

  for (const plan of plans) {
    totalBaseCosts.timber += plan.baseCosts.timber;
    totalBaseCosts.stone += plan.baseCosts.stone;
    totalBaseCosts.ruby += plan.baseCosts.ruby;

    totalDiscountedCosts.timber += plan.discountedCosts.timber;
    totalDiscountedCosts.stone += plan.discountedCosts.stone;
    totalDiscountedCosts.ruby += plan.discountedCosts.ruby;

    totalDeltaFightforce += plan.deltaFightforce;
    totalInstantDiamonds += plan.instantDiamonds;
    if (plan.effectiveTimeSeconds > parallelTimeSeconds) {
      parallelTimeSeconds = plan.effectiveTimeSeconds;
    }
    totalSpeedupTimeSeconds += plan.effectiveTimeSeconds;
    if (plan.requiredCottageLevel > maxRequiredCottageLevel) {
      maxRequiredCottageLevel = plan.requiredCottageLevel;
    }
  }

  return {
    totalQueues: plans.length,
    totalBaseCosts,
    totalDiscountedCosts,
    totalDeltaFightforce,
    totalInstantDiamonds,
    parallelTimeSeconds,
    totalSpeedupTimeSeconds,
    maxRequiredCottageLevel,
  };
}

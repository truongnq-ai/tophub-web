import { getRelicHallBoostPermilleAtLevel } from "./relic-hall-data";
import type { CalculatorLocale } from "./types";

export type RelicRarity = "rare" | "epic" | "legendary";
export type RelicStarLevel =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20;
export type RelicSubStep = 0 | 1 | 2 | 3 | 4;
export type RelicTierIndex = 1 | 2 | 3 | 4;
export type RelicStarTierColorId = "gold" | "red" | "silver" | "diamond";
export type RelicFactionId = "league" | "horde" | "nature";
export type RelicSlotRole = "offense" | "defense" | "support";
export type RelicScopeMode = "trio" | "single";
export type RelicBonusProfile =
  | "none"
  | "dmg_boost"
  | "dmg_reduction"
  | "dual_dmg_boost_and_reduction";

export const RELIC_UNLOCK_SHARDS_COST = 10;
export const RELIC_MAX_PETAL_INDEX = 100;

export interface RelicStarTierMeta {
  readonly tierIndex: RelicTierIndex;
  readonly id: RelicStarTierColorId;
  readonly minStar: number;
  readonly maxStar: number;
  readonly minPetalIndex: number;
  readonly maxPetalIndex: number;
  readonly hexColor: string;
  readonly label: Readonly<Record<CalculatorLocale, string>>;
}

export const RELIC_STAR_TIERS: readonly RelicStarTierMeta[] = [
  {
    tierIndex: 1,
    id: "gold",
    minStar: 1,
    maxStar: 5,
    minPetalIndex: 1,
    maxPetalIndex: 25,
    hexColor: "#F59E0B",
    label: { vi: "Bậc 1: 1★–5★ (Sao Vàng)", en: "Tier 1: 1★–5★ (Gold Stars)" },
  },
  {
    tierIndex: 2,
    id: "red",
    minStar: 6,
    maxStar: 10,
    minPetalIndex: 26,
    maxPetalIndex: 50,
    hexColor: "#EF4444",
    label: { vi: "Bậc 2: 6★–10★ (Sao Đỏ)", en: "Tier 2: 6★–10★ (Red Stars)" },
  },
  {
    tierIndex: 3,
    id: "silver",
    minStar: 11,
    maxStar: 15,
    minPetalIndex: 51,
    maxPetalIndex: 75,
    hexColor: "#94A3B8",
    label: {
      vi: "Bậc 3: 11★–15★ (Sao Bạc)",
      en: "Tier 3: 11★–15★ (Silver Stars)",
    },
  },
  {
    tierIndex: 4,
    id: "diamond",
    minStar: 16,
    maxStar: 20,
    minPetalIndex: 76,
    maxPetalIndex: 100,
    hexColor: "#38BDF8",
    label: {
      vi: "Bậc 4: 16★–20★ (Sao Kim Cương)",
      en: "Tier 4: 16★–20★ (Diamond Stars)",
    },
  },
] as const;

export interface RelicCatalogItem {
  readonly id: number;
  readonly legacyId: number;
  readonly rarity: RelicRarity;
  readonly slotType: 1 | 2 | 3;
  readonly slotRole: RelicSlotRole;
  readonly factionId?: RelicFactionId;
  readonly name: Readonly<Record<CalculatorLocale, string>>;
  readonly illustrationPath: string;
  readonly shardGameId: number;
  readonly shardName: Readonly<Record<CalculatorLocale, string>>;
  readonly shardIconPath: string;
  readonly bonusProfile: RelicBonusProfile;
}

export const RELIC_CATALOG: readonly RelicCatalogItem[] = [
  {
    "id": 130001,
    "legacyId": 30001,
    "rarity": "rare",
    "slotType": 2,
    "slotRole": "defense",
    "name": {
      "vi": "Bình Bí Dược",
      "en": "Elixir Bottle"
    },
    "illustrationPath": "/images/relics/illustrations/Artifact_30001.webp",
    "shardGameId": 303001,
    "shardName": {
      "vi": "Mảnh Bình Bí Dược",
      "en": "Elixir Bottle Shard"
    },
    "shardIconPath": "/images/items/shards/icon_30530.webp",
    "bonusProfile": "none"
  },
  {
    "id": 130002,
    "legacyId": 30002,
    "rarity": "rare",
    "slotType": 1,
    "slotRole": "offense",
    "name": {
      "vi": "Trâm Cân Bằng",
      "en": "Balance Brooch"
    },
    "illustrationPath": "/images/relics/illustrations/Artifact_30002.webp",
    "shardGameId": 303002,
    "shardName": {
      "vi": "Mảnh Trâm Cân Bằng",
      "en": "Balance Brooch Shard"
    },
    "shardIconPath": "/images/items/shards/icon_30531.webp",
    "bonusProfile": "none"
  },
  {
    "id": 130003,
    "legacyId": 30003,
    "rarity": "rare",
    "slotType": 2,
    "slotRole": "defense",
    "name": {
      "vi": "Bùa Anh Hùng",
      "en": "Hero's Amulet"
    },
    "illustrationPath": "/images/relics/illustrations/Artifact_30003.webp",
    "shardGameId": 303003,
    "shardName": {
      "vi": "Mảnh Bùa Anh Hùng",
      "en": "Hero's Amulet Shard"
    },
    "shardIconPath": "/images/items/shards/icon_30532.webp",
    "bonusProfile": "none"
  },
  {
    "id": 140001,
    "legacyId": 40001,
    "rarity": "epic",
    "slotType": 1,
    "slotRole": "offense",
    "name": {
      "vi": "Nanh Độc Kẻ Trộm",
      "en": "Venom Fang"
    },
    "illustrationPath": "/images/relics/illustrations/Artifact_40001.webp",
    "shardGameId": 304001,
    "shardName": {
      "vi": "Mảnh Nanh Độc Kẻ Trộm",
      "en": "Venom Fang Shard"
    },
    "shardIconPath": "/images/items/shards/icon_30534.webp",
    "bonusProfile": "dmg_boost"
  },
  {
    "id": 140002,
    "legacyId": 40002,
    "rarity": "epic",
    "slotType": 1,
    "slotRole": "offense",
    "name": {
      "vi": "Cầu Phép Trái Đất",
      "en": "Terra Orb"
    },
    "illustrationPath": "/images/relics/illustrations/Artifact_40002.webp",
    "shardGameId": 304002,
    "shardName": {
      "vi": "Mảnh Cầu Phép Trái Đất",
      "en": "Terra Orb Shard"
    },
    "shardIconPath": "/images/items/shards/icon_30535.webp",
    "bonusProfile": "dmg_boost"
  },
  {
    "id": 140003,
    "legacyId": 40003,
    "rarity": "epic",
    "slotType": 2,
    "slotRole": "defense",
    "name": {
      "vi": "Giao Ước",
      "en": "Vowkeeper"
    },
    "illustrationPath": "/images/relics/illustrations/Artifact_40003.webp",
    "shardGameId": 304003,
    "shardName": {
      "vi": "Mảnh Giao Ước",
      "en": "Vowkeeper Shard"
    },
    "shardIconPath": "/images/items/shards/icon_30536.webp",
    "bonusProfile": "dmg_reduction"
  },
  {
    "id": 140004,
    "legacyId": 40004,
    "rarity": "epic",
    "slotType": 3,
    "slotRole": "support",
    "name": {
      "vi": "Kèn Nguyên Soái",
      "en": "Marshal's Warhorn"
    },
    "illustrationPath": "/images/relics/illustrations/Artifact_40004.webp",
    "shardGameId": 304004,
    "shardName": {
      "vi": "Mảnh Kèn Nguyên Soái",
      "en": "Marshal's Warhorn Shard"
    },
    "shardIconPath": "/images/items/shards/icon_30537.webp",
    "bonusProfile": "dmg_reduction"
  },
  {
    "id": 140005,
    "legacyId": 40005,
    "rarity": "epic",
    "slotType": 2,
    "slotRole": "defense",
    "name": {
      "vi": "Đá Ma Giả Kim",
      "en": "Philosopher's Rune"
    },
    "illustrationPath": "/images/relics/illustrations/Artifact_40005.webp",
    "shardGameId": 304005,
    "shardName": {
      "vi": "Mảnh Đá Ma Giả Kim",
      "en": "Philosopher's Rune Shard"
    },
    "shardIconPath": "/images/items/shards/icon_30538.webp",
    "bonusProfile": "dmg_reduction"
  },
  {
    "id": 140006,
    "legacyId": 40006,
    "rarity": "epic",
    "slotType": 1,
    "slotRole": "offense",
    "name": {
      "vi": "Ếch Điện",
      "en": "Electric Frog"
    },
    "illustrationPath": "/images/relics/illustrations/Artifact_40006.webp",
    "shardGameId": 304006,
    "shardName": {
      "vi": "Mảnh Ếch Điện",
      "en": "Electric Frog Shard"
    },
    "shardIconPath": "/images/items/shards/icon_30539.webp",
    "bonusProfile": "dmg_boost"
  },
  {
    "id": 140007,
    "legacyId": 40007,
    "rarity": "epic",
    "slotType": 3,
    "slotRole": "support",
    "name": {
      "vi": "Mắt Sợ Hãi",
      "en": "Eye of Fear"
    },
    "illustrationPath": "/images/relics/illustrations/Artifact_40007.webp",
    "shardGameId": 304007,
    "shardName": {
      "vi": "Mảnh Mắt Sợ Hãi",
      "en": "Eye of Fear Shard"
    },
    "shardIconPath": "/images/items/shards/icon_30540.webp",
    "bonusProfile": "dmg_boost"
  },
  {
    "id": 150001,
    "legacyId": 50001,
    "rarity": "legendary",
    "slotType": 1,
    "slotRole": "offense",
    "name": {
      "vi": "Nhẫn Đuôi Công Tước",
      "en": "Duke's Signet Ring"
    },
    "illustrationPath": "/images/relics/illustrations/Artifact_50001.webp",
    "shardGameId": 305001,
    "shardName": {
      "vi": "Mảnh Nhẫn Đuôi Công Tước",
      "en": "Duke's Signet Ring Shard"
    },
    "shardIconPath": "/images/items/shards/icon_30541.webp",
    "bonusProfile": "dmg_boost"
  },
  {
    "id": 150002,
    "legacyId": 50002,
    "rarity": "legendary",
    "slotType": 1,
    "slotRole": "offense",
    "name": {
      "vi": "Vương Miện Băng",
      "en": "Frost Diadem"
    },
    "illustrationPath": "/images/relics/illustrations/Artifact_50002.webp",
    "shardGameId": 305002,
    "shardName": {
      "vi": "Mảnh Vương Miện Băng",
      "en": "Frost Diadem Shard"
    },
    "shardIconPath": "/images/items/shards/icon_30542.webp",
    "bonusProfile": "dmg_boost"
  },
  {
    "id": 150003,
    "legacyId": 50003,
    "rarity": "legendary",
    "slotType": 2,
    "slotRole": "defense",
    "name": {
      "vi": "Vương Quyền",
      "en": "Royalty"
    },
    "illustrationPath": "/images/relics/illustrations/Artifact_50003.webp",
    "shardGameId": 305003,
    "shardName": {
      "vi": "Mảnh Vương Quyền",
      "en": "Royalty Shard"
    },
    "shardIconPath": "/images/items/shards/icon_30543.webp",
    "bonusProfile": "dmg_reduction"
  },
  {
    "id": 150004,
    "legacyId": 50004,
    "rarity": "legendary",
    "slotType": 2,
    "slotRole": "defense",
    "name": {
      "vi": "Đôi Cánh Bất Diệt",
      "en": "Eternal Wings"
    },
    "illustrationPath": "/images/relics/illustrations/Artifact_50004.webp",
    "shardGameId": 305004,
    "shardName": {
      "vi": "Mảnh Đôi Cánh Bất Diệt",
      "en": "Eternal Wings Shard"
    },
    "shardIconPath": "/images/items/shards/icon_30544.webp",
    "bonusProfile": "dmg_reduction"
  },
  {
    "id": 150005,
    "legacyId": 50005,
    "rarity": "legendary",
    "slotType": 3,
    "slotRole": "support",
    "name": {
      "vi": "Chiến Kỳ Kiên Cường",
      "en": "War Flag"
    },
    "illustrationPath": "/images/relics/illustrations/Artifact_50005.webp",
    "shardGameId": 305005,
    "shardName": {
      "vi": "Mảnh Chiến Kỳ Kiên Cường",
      "en": "War Flag Shard"
    },
    "shardIconPath": "/images/items/shards/icon_30545.webp",
    "bonusProfile": "dual_dmg_boost_and_reduction"
  },
  {
    "id": 150006,
    "legacyId": 50006,
    "rarity": "legendary",
    "slotType": 3,
    "slotRole": "support",
    "name": {
      "vi": "Thiên Bình Bất Nghĩa",
      "en": "Scale of Injustice"
    },
    "illustrationPath": "/images/relics/illustrations/Artifact_50006.webp",
    "shardGameId": 305006,
    "shardName": {
      "vi": "Mảnh Thiên Bình Bất Nghĩa",
      "en": "Scale of Injustice Shard"
    },
    "shardIconPath": "/images/items/shards/icon_30546.webp",
    "bonusProfile": "dual_dmg_boost_and_reduction"
  },
  {
    "id": 150007,
    "legacyId": 50007,
    "rarity": "legendary",
    "slotType": 3,
    "slotRole": "support",
    "name": {
      "vi": "Hối Lộ",
      "en": "Mighty Gold"
    },
    "illustrationPath": "/images/relics/illustrations/Artifact_50007.webp",
    "shardGameId": 305007,
    "shardName": {
      "vi": "Mảnh Hối Lộ",
      "en": "Mighty Gold Shard"
    },
    "shardIconPath": "/images/items/shards/icon_30547.webp",
    "bonusProfile": "dual_dmg_boost_and_reduction"
  },
  {
    "id": 150008,
    "legacyId": 50008,
    "rarity": "legendary",
    "slotType": 1,
    "slotRole": "offense",
    "name": {
      "vi": "Bức Hại",
      "en": "Persecution"
    },
    "illustrationPath": "/images/relics/illustrations/Artifact_50008.webp",
    "shardGameId": 305008,
    "shardName": {
      "vi": "Mảnh Bức Hại",
      "en": "Persecution Shard"
    },
    "shardIconPath": "/images/items/shards/icon_30548.webp",
    "bonusProfile": "dmg_boost"
  },
  {
    "id": 150009,
    "legacyId": 50009,
    "rarity": "legendary",
    "slotType": 2,
    "slotRole": "defense",
    "name": {
      "vi": "Còng Cấm Phép",
      "en": "Anti-Magic Handcuffs"
    },
    "illustrationPath": "/images/relics/illustrations/Artifact_50009.webp",
    "shardGameId": 305009,
    "shardName": {
      "vi": "Mảnh Còng Cấm Phép",
      "en": "Anti-Magic Handcuffs Shard"
    },
    "shardIconPath": "/images/items/shards/icon_30549.webp",
    "bonusProfile": "dmg_reduction"
  },
  {
    "id": 150010,
    "legacyId": 50010,
    "rarity": "legendary",
    "slotType": 2,
    "slotRole": "defense",
    "name": {
      "vi": "Đá Trăng Tròn",
      "en": "Moonstone"
    },
    "illustrationPath": "/images/relics/illustrations/Artifact_50010.webp",
    "shardGameId": 305010,
    "shardName": {
      "vi": "Mảnh Đá Trăng Tròn",
      "en": "Moonstone Shard"
    },
    "shardIconPath": "/images/items/shards/icon_30550.webp",
    "bonusProfile": "dmg_reduction"
  },
  {
    "id": 150011,
    "legacyId": 50011,
    "rarity": "legendary",
    "slotType": 1,
    "slotRole": "offense",
    "factionId": "league",
    "name": {
      "vi": "Kim Trượng Thạch Hóa",
      "en": "Petrification Staff"
    },
    "illustrationPath": "/images/relics/illustrations/Artifact_50011.webp",
    "shardGameId": 305011,
    "shardName": {
      "vi": "Mảnh Kim Trượng Thạch Hóa",
      "en": "Petrification Staff Shard"
    },
    "shardIconPath": "/images/items/shards/icon_30572.webp",
    "bonusProfile": "dmg_boost"
  },
  {
    "id": 150012,
    "legacyId": 50012,
    "rarity": "legendary",
    "slotType": 3,
    "slotRole": "support",
    "factionId": "nature",
    "name": {
      "vi": "Cuộn Thánh Thư",
      "en": "Sacred Scroll"
    },
    "illustrationPath": "/images/relics/illustrations/Artifact_50012.webp",
    "shardGameId": 305012,
    "shardName": {
      "vi": "Mảnh Cuộn Thánh Thư",
      "en": "Sacred Scroll Shard"
    },
    "shardIconPath": "/images/items/shards/icon_30636.webp",
    "bonusProfile": "dual_dmg_boost_and_reduction"
  },
  {
    "id": 150013,
    "legacyId": 50013,
    "rarity": "legendary",
    "slotType": 2,
    "slotRole": "defense",
    "factionId": "horde",
    "name": {
      "vi": "Tâm Long",
      "en": "Dragonheart"
    },
    "illustrationPath": "/images/relics/illustrations/Artifact_50013.webp",
    "shardGameId": 305013,
    "shardName": {
      "vi": "Mảnh Tâm Long",
      "en": "Dragonheart Shard"
    },
    "shardIconPath": "/images/items/shards/icon_30718.webp",
    "bonusProfile": "dmg_reduction"
  },
  {
    "id": 150014,
    "legacyId": 50014,
    "rarity": "legendary",
    "slotType": 2,
    "slotRole": "defense",
    "factionId": "league",
    "name": {
      "vi": "Ngọc Hộ Mệnh",
      "en": "Soul Guard Orb"
    },
    "illustrationPath": "/images/relics/illustrations/Artifact_50014.webp",
    "shardGameId": 305014,
    "shardName": {
      "vi": "Mảnh Ngọc Hộ Mệnh",
      "en": "Soul Guard Orb Shard"
    },
    "shardIconPath": "/images/items/shards/icon_30814.webp",
    "bonusProfile": "dmg_reduction"
  },
  {
    "id": 150015,
    "legacyId": 50015,
    "rarity": "legendary",
    "slotType": 3,
    "slotRole": "support",
    "factionId": "league",
    "name": {
      "vi": "Lông Vũ Khế Ước",
      "en": "Feather of the Pact"
    },
    "illustrationPath": "/images/relics/illustrations/Artifact_50015.webp",
    "shardGameId": 305015,
    "shardName": {
      "vi": "Mảnh Lông Vũ Khế Ước",
      "en": "Feather of the Pact Shard"
    },
    "shardIconPath": "/images/items/shards/icon_30813.webp",
    "bonusProfile": "dual_dmg_boost_and_reduction"
  },
  {
    "id": 150016,
    "legacyId": 50016,
    "rarity": "legendary",
    "slotType": 1,
    "slotRole": "offense",
    "factionId": "horde",
    "name": {
      "vi": "Phán Quyết Thiên Lôi",
      "en": "Thunder Judgment"
    },
    "illustrationPath": "/images/relics/illustrations/Artifact_50016.webp",
    "shardGameId": 305016,
    "shardName": {
      "vi": "Mảnh Phán Quyết Thiên Lôi",
      "en": "Thunder Judgment Shard"
    },
    "shardIconPath": "/images/items/shards/icon_30821.webp",
    "bonusProfile": "dmg_boost"
  },
  {
    "id": 150017,
    "legacyId": 50017,
    "rarity": "legendary",
    "slotType": 3,
    "slotRole": "support",
    "factionId": "horde",
    "name": {
      "vi": "Bùa Long Trảo",
      "en": "Dragonbone Amulet"
    },
    "illustrationPath": "/images/relics/illustrations/Artifact_50017.webp",
    "shardGameId": 305017,
    "shardName": {
      "vi": "Mảnh Bùa Long Trảo",
      "en": "Dragonbone Amulet Shard"
    },
    "shardIconPath": "/images/items/shards/icon_30822.webp",
    "bonusProfile": "dual_dmg_boost_and_reduction"
  },
  {
    "id": 150018,
    "legacyId": 50018,
    "rarity": "legendary",
    "slotType": 1,
    "slotRole": "offense",
    "factionId": "nature",
    "name": {
      "vi": "Cung Dây Leo",
      "en": "Vineborne Bow"
    },
    "illustrationPath": "/images/relics/illustrations/Artifact_50018.webp",
    "shardGameId": 305018,
    "shardName": {
      "vi": "Mảnh Cung Dây Leo",
      "en": "Vineborne Bow Shard"
    },
    "shardIconPath": "/images/items/shards/icon_30825.webp",
    "bonusProfile": "dmg_boost"
  },
  {
    "id": 150019,
    "legacyId": 50019,
    "rarity": "legendary",
    "slotType": 2,
    "slotRole": "defense",
    "factionId": "nature",
    "name": {
      "vi": "Vương Miện Bất Bại",
      "en": "Undefeated Crown"
    },
    "illustrationPath": "/images/relics/illustrations/Artifact_50019.webp",
    "shardGameId": 305019,
    "shardName": {
      "vi": "Mảnh Vương Miện Bất Bại",
      "en": "Undefeated Crown Shard"
    },
    "shardIconPath": "/images/items/shards/icon_30826.webp",
    "bonusProfile": "dmg_reduction"
  }
] as const;

/**
 * Tuple 101 nấc (petalIndex 0..100) trích xuất từ artifact_star_up_new (version = 1):
 * [shardCostFromPrevPetal, baseAtk, baseHp, bonusPermille, heroAtkPermille, heroHpPermille, skillLevel, fightforce]
 */
export type RelicPetalTuple = readonly [
  shardCostFromPrevPetal: number,
  baseAtk: number,
  baseHp: number,
  bonusPermille: number,
  heroAtkPermille: number,
  heroHpPermille: number,
  skillLevel: number,
  fightforce: number,
];

export const RELIC_PETAL_CURVES: Readonly<
  Record<RelicRarity, readonly RelicPetalTuple[]>
> = {
  rare: [
    [0, 340, 2300, 0, 5, 10, 1, 11400],
    [2, 356, 2400, 0, 5, 10, 1, 11920],
    [2, 372, 2500, 0, 5, 10, 1, 12440],
    [2, 388, 2600, 0, 5, 10, 1, 12960],
    [2, 404, 2700, 0, 5, 10, 1, 13480],
    [2, 420, 2800, 0, 10, 20, 2, 14000],
    [4, 440, 2940, 0, 10, 20, 2, 14680],
    [4, 460, 3080, 0, 10, 20, 2, 15360],
    [4, 480, 3220, 0, 10, 20, 2, 16040],
    [4, 500, 3360, 0, 10, 20, 2, 16720],
    [4, 520, 3500, 0, 20, 40, 3, 17400],
    [6, 546, 3660, 0, 20, 40, 3, 18240],
    [6, 572, 3820, 0, 20, 40, 3, 19080],
    [6, 598, 3980, 0, 20, 40, 3, 19920],
    [6, 624, 4140, 0, 20, 40, 3, 20760],
    [6, 650, 4300, 0, 30, 60, 4, 21600],
    [8, 682, 4520, 0, 30, 60, 4, 22680],
    [8, 714, 4740, 0, 30, 60, 4, 23760],
    [8, 746, 4960, 0, 30, 60, 4, 24840],
    [8, 778, 5180, 0, 30, 60, 4, 25920],
    [8, 810, 5400, 0, 40, 80, 5, 27000],
    [10, 850, 5680, 0, 40, 80, 5, 28360],
    [10, 890, 5960, 0, 40, 80, 5, 29720],
    [10, 930, 6240, 0, 40, 80, 5, 31080],
    [10, 970, 6520, 0, 40, 80, 5, 32440],
    [10, 1010, 6800, 0, 50, 100, 6, 33800],
    [12, 1058, 7120, 0, 50, 100, 6, 35400],
    [12, 1106, 7440, 0, 50, 100, 6, 37000],
    [12, 1154, 7760, 0, 50, 100, 6, 38600],
    [12, 1202, 8080, 0, 50, 100, 6, 40200],
    [12, 1250, 8400, 0, 80, 160, 7, 41800],
    [14, 1308, 8780, 0, 80, 160, 7, 43720],
    [14, 1366, 9160, 0, 80, 160, 7, 45640],
    [14, 1424, 9540, 0, 80, 160, 7, 47560],
    [14, 1482, 9920, 0, 80, 160, 7, 49480],
    [14, 1540, 10300, 0, 110, 220, 8, 51400],
    [16, 1610, 10760, 0, 110, 220, 8, 53720],
    [16, 1680, 11220, 0, 110, 220, 8, 56040],
    [16, 1750, 11680, 0, 110, 220, 8, 58360],
    [16, 1820, 12140, 0, 110, 220, 8, 60680],
    [16, 1890, 12600, 0, 140, 280, 9, 63000],
    [20, 1972, 13140, 0, 140, 280, 9, 65720],
    [20, 2054, 13680, 0, 140, 280, 9, 68440],
    [20, 2136, 14220, 0, 140, 280, 9, 71160],
    [20, 2218, 14760, 0, 140, 280, 9, 73880],
    [20, 2300, 15300, 0, 170, 340, 10, 76600],
    [30, 2396, 15960, 0, 170, 340, 10, 79840],
    [30, 2492, 16620, 0, 170, 340, 10, 83080],
    [30, 2588, 17280, 0, 170, 340, 10, 86320],
    [30, 2684, 17940, 0, 170, 340, 10, 89560],
    [30, 2780, 18600, 0, 200, 400, 11, 92800],
    [40, 2884, 19280, 0, 200, 400, 11, 96240],
    [40, 2988, 19960, 0, 200, 400, 11, 99680],
    [40, 3092, 20640, 0, 200, 400, 11, 103120],
    [40, 3196, 21320, 0, 200, 400, 11, 106560],
    [40, 3300, 22000, 0, 240, 480, 11, 110000],
    [50, 3412, 22760, 0, 240, 480, 11, 113760],
    [50, 3524, 23520, 0, 240, 480, 11, 117520],
    [50, 3636, 24280, 0, 240, 480, 11, 121280],
    [50, 3748, 25040, 0, 240, 480, 11, 125040],
    [50, 3860, 25800, 0, 280, 560, 11, 128800],
    [60, 3980, 26600, 0, 280, 560, 11, 132800],
    [60, 4100, 27400, 0, 280, 560, 11, 136800],
    [60, 4220, 28200, 0, 280, 560, 11, 140800],
    [60, 4340, 29000, 0, 280, 560, 11, 144800],
    [60, 4460, 29800, 0, 320, 640, 11, 148800],
    [100, 4588, 30640, 0, 320, 640, 11, 153040],
    [100, 4716, 31480, 0, 320, 640, 11, 157280],
    [100, 4844, 32320, 0, 320, 640, 11, 161520],
    [100, 4972, 33160, 0, 320, 640, 11, 165760],
    [100, 5100, 34000, 0, 360, 720, 11, 170000],
    [120, 5234, 34900, 0, 360, 720, 11, 174480],
    [120, 5368, 35800, 0, 360, 720, 11, 178960],
    [120, 5502, 36700, 0, 360, 720, 11, 183440],
    [120, 5636, 37600, 0, 360, 720, 11, 187920],
    [120, 5770, 38500, 0, 400, 800, 11, 192400],
    [70, 5886, 39260, 0, 400, 800, 11, 196240],
    [70, 6002, 40020, 0, 400, 800, 11, 200080],
    [70, 6118, 40780, 0, 400, 800, 11, 203920],
    [70, 6234, 41540, 0, 400, 800, 11, 207760],
    [70, 6350, 42300, 0, 440, 880, 11, 211600],
    [80, 6464, 43080, 0, 440, 880, 11, 215440],
    [80, 6578, 43860, 0, 440, 880, 11, 219280],
    [80, 6692, 44640, 0, 440, 880, 11, 223120],
    [80, 6806, 45420, 0, 440, 880, 11, 226960],
    [80, 6920, 46200, 0, 480, 960, 11, 230800],
    [90, 7036, 46960, 0, 480, 960, 11, 234640],
    [90, 7152, 47720, 0, 480, 960, 11, 238480],
    [90, 7268, 48480, 0, 480, 960, 11, 242320],
    [90, 7384, 49240, 0, 480, 960, 11, 246160],
    [90, 7500, 50000, 0, 520, 1040, 11, 250000],
    [110, 7614, 50760, 0, 520, 1040, 11, 253800],
    [110, 7728, 51520, 0, 520, 1040, 11, 257600],
    [110, 7842, 52280, 0, 520, 1040, 11, 261400],
    [110, 7956, 53040, 0, 520, 1040, 11, 265200],
    [110, 8070, 53800, 0, 560, 1120, 11, 269000],
    [130, 8186, 54580, 0, 560, 1120, 11, 272880],
    [130, 8302, 55360, 0, 560, 1120, 11, 276760],
    [130, 8418, 56140, 0, 560, 1120, 11, 280640],
    [130, 8534, 56920, 0, 560, 1120, 11, 284520],
    [130, 8650, 57700, 0, 600, 1200, 11, 288400],
  ],
  epic: [
    [0, 1060, 7100, 50, 20, 40, 1, 35400],
    [2, 1106, 7420, 60, 20, 40, 1, 36960],
    [2, 1152, 7740, 70, 20, 40, 1, 38520],
    [2, 1198, 8060, 80, 20, 40, 1, 40080],
    [2, 1244, 8380, 90, 20, 40, 1, 41640],
    [2, 1290, 8700, 100, 30, 60, 2, 43200],
    [4, 1350, 9080, 120, 30, 60, 2, 45160],
    [4, 1410, 9460, 140, 30, 60, 2, 47120],
    [4, 1470, 9840, 160, 30, 60, 2, 49080],
    [4, 1530, 10220, 180, 30, 60, 2, 51040],
    [4, 1590, 10600, 200, 40, 80, 3, 53000],
    [6, 1666, 11120, 220, 40, 80, 3, 55560],
    [6, 1742, 11640, 240, 40, 80, 3, 58120],
    [6, 1818, 12160, 260, 40, 80, 3, 60680],
    [6, 1894, 12680, 280, 40, 80, 3, 63240],
    [6, 1970, 13200, 300, 60, 120, 4, 65800],
    [8, 2068, 13840, 320, 60, 120, 4, 69040],
    [8, 2166, 14480, 340, 60, 120, 4, 72280],
    [8, 2264, 15120, 360, 60, 120, 4, 75520],
    [8, 2362, 15760, 380, 60, 120, 4, 78760],
    [8, 2460, 16400, 400, 80, 160, 5, 82000],
    [10, 2580, 17200, 420, 80, 160, 5, 86000],
    [10, 2700, 18000, 440, 80, 160, 5, 90000],
    [10, 2820, 18800, 460, 80, 160, 5, 94000],
    [10, 2940, 19600, 480, 80, 160, 5, 98000],
    [10, 3060, 20400, 500, 100, 200, 6, 102000],
    [12, 3204, 21360, 520, 100, 200, 6, 106800],
    [12, 3348, 22320, 540, 100, 200, 6, 111600],
    [12, 3492, 23280, 560, 100, 200, 6, 116400],
    [12, 3636, 24240, 580, 100, 200, 6, 121200],
    [12, 3780, 25200, 600, 160, 320, 7, 126000],
    [14, 3952, 26360, 620, 160, 320, 7, 131760],
    [14, 4124, 27520, 640, 160, 320, 7, 137520],
    [14, 4296, 28680, 660, 160, 320, 7, 143280],
    [14, 4468, 29840, 680, 160, 320, 7, 149040],
    [14, 4640, 31000, 700, 220, 440, 8, 154800],
    [16, 4848, 32380, 720, 220, 440, 8, 161720],
    [16, 5056, 33760, 740, 220, 440, 8, 168640],
    [16, 5264, 35140, 760, 220, 440, 8, 175560],
    [16, 5472, 36520, 780, 220, 440, 8, 182480],
    [16, 5680, 37900, 800, 280, 560, 9, 189400],
    [18, 5926, 39540, 820, 280, 560, 9, 197600],
    [18, 6172, 41180, 840, 280, 560, 9, 205800],
    [18, 6418, 42820, 860, 280, 560, 9, 214000],
    [18, 6664, 44460, 880, 280, 560, 9, 222200],
    [18, 6910, 46100, 900, 340, 680, 10, 230400],
    [20, 7202, 48040, 920, 340, 680, 10, 240120],
    [20, 7494, 49980, 940, 340, 680, 10, 249840],
    [20, 7786, 51920, 960, 340, 680, 10, 259560],
    [20, 8078, 53860, 980, 340, 680, 10, 269280],
    [20, 8370, 55800, 1000, 400, 800, 11, 279000],
    [30, 8684, 57900, 1020, 400, 800, 11, 289480],
    [30, 8998, 60000, 1040, 400, 800, 11, 299960],
    [30, 9312, 62100, 1060, 400, 800, 11, 310440],
    [30, 9626, 64200, 1080, 400, 800, 11, 320920],
    [30, 9940, 66300, 1100, 480, 960, 12, 331400],
    [40, 10276, 68540, 1120, 480, 960, 12, 342600],
    [40, 10612, 70780, 1140, 480, 960, 12, 353800],
    [40, 10948, 73020, 1160, 480, 960, 12, 365000],
    [40, 11284, 75260, 1180, 480, 960, 12, 376200],
    [40, 11620, 77500, 1200, 560, 1120, 13, 387400],
    [50, 11978, 79880, 1220, 560, 1120, 13, 399320],
    [50, 12336, 82260, 1240, 560, 1120, 13, 411240],
    [50, 12694, 84640, 1260, 560, 1120, 13, 423160],
    [50, 13052, 87020, 1280, 560, 1120, 13, 435080],
    [50, 13410, 89400, 1300, 640, 1280, 13, 447000],
    [60, 13790, 91940, 1320, 640, 1280, 13, 459680],
    [60, 14170, 94480, 1340, 640, 1280, 13, 472360],
    [60, 14550, 97020, 1360, 640, 1280, 13, 485040],
    [60, 14930, 99560, 1380, 640, 1280, 13, 497720],
    [60, 15310, 102100, 1400, 720, 1440, 13, 510400],
    [80, 15714, 104780, 1420, 720, 1440, 13, 523840],
    [80, 16118, 107460, 1440, 720, 1440, 13, 537280],
    [80, 16522, 110140, 1460, 720, 1440, 13, 550720],
    [80, 16926, 112820, 1480, 720, 1440, 13, 564160],
    [80, 17330, 115500, 1500, 800, 1600, 13, 577600],
    [30, 17676, 117820, 1510, 800, 1600, 13, 589160],
    [30, 18022, 120140, 1520, 800, 1600, 13, 600720],
    [30, 18368, 122460, 1530, 800, 1600, 13, 612280],
    [30, 18714, 124780, 1540, 800, 1600, 13, 623840],
    [30, 19060, 127100, 1550, 880, 1760, 13, 635400],
    [40, 19406, 129400, 1560, 880, 1760, 13, 646920],
    [40, 19752, 131700, 1570, 880, 1760, 13, 658440],
    [40, 20098, 134000, 1580, 880, 1760, 13, 669960],
    [40, 20444, 136300, 1590, 880, 1760, 13, 681480],
    [40, 20790, 138600, 1600, 960, 1920, 13, 693000],
    [50, 21138, 140920, 1610, 960, 1920, 13, 704600],
    [50, 21486, 143240, 1620, 960, 1920, 13, 716200],
    [50, 21834, 145560, 1630, 960, 1920, 13, 727800],
    [50, 22182, 147880, 1640, 960, 1920, 13, 739400],
    [50, 22530, 150200, 1650, 1040, 2080, 13, 751000],
    [60, 22876, 152500, 1660, 1040, 2080, 13, 762520],
    [60, 23222, 154800, 1670, 1040, 2080, 13, 774040],
    [60, 23568, 157100, 1680, 1040, 2080, 13, 785560],
    [60, 23914, 159400, 1690, 1040, 2080, 13, 797080],
    [60, 24260, 161700, 1700, 1120, 2240, 13, 808600],
    [80, 24606, 164020, 1710, 1120, 2240, 13, 820160],
    [80, 24952, 166340, 1720, 1120, 2240, 13, 831720],
    [80, 25298, 168660, 1730, 1120, 2240, 13, 843280],
    [80, 25644, 170980, 1740, 1120, 2240, 13, 854840],
    [80, 25990, 173300, 1750, 1200, 2400, 13, 866400],
  ],
  legendary: [
    [0, 2780, 19100, 200, 15, 30, 1, 93800],
    [2, 2898, 19880, 220, 15, 30, 1, 97720],
    [2, 3016, 20660, 240, 15, 30, 1, 101640],
    [2, 3134, 21440, 260, 15, 30, 1, 105560],
    [2, 3252, 22220, 280, 15, 30, 1, 109480],
    [2, 3370, 23000, 300, 30, 60, 2, 113400],
    [4, 3518, 23980, 320, 30, 60, 2, 118320],
    [4, 3666, 24960, 340, 30, 60, 2, 123240],
    [4, 3814, 25940, 360, 30, 60, 2, 128160],
    [4, 3962, 26920, 380, 30, 60, 2, 133080],
    [4, 4110, 27900, 400, 60, 120, 3, 138000],
    [4, 4300, 29180, 440, 60, 120, 3, 144360],
    [4, 4490, 30460, 480, 60, 120, 3, 150720],
    [4, 4680, 31740, 520, 60, 120, 3, 157080],
    [4, 4870, 33020, 560, 60, 120, 3, 163440],
    [4, 5060, 34300, 600, 90, 180, 4, 169800],
    [8, 5304, 35920, 640, 90, 180, 4, 177920],
    [8, 5548, 37540, 680, 90, 180, 4, 186040],
    [8, 5792, 39160, 720, 90, 180, 4, 194160],
    [8, 6036, 40780, 760, 90, 180, 4, 202280],
    [8, 6280, 42400, 800, 120, 240, 5, 210400],
    [8, 6580, 44400, 840, 120, 240, 5, 220400],
    [8, 6880, 46400, 880, 120, 240, 5, 230400],
    [8, 7180, 48400, 920, 120, 240, 5, 240400],
    [8, 7480, 50400, 960, 120, 240, 5, 250400],
    [8, 7780, 52400, 1000, 160, 320, 6, 260400],
    [12, 8138, 54800, 1040, 160, 320, 6, 272360],
    [12, 8496, 57200, 1080, 160, 320, 6, 284320],
    [12, 8854, 59600, 1120, 160, 320, 6, 296280],
    [12, 9212, 62000, 1160, 160, 320, 6, 308240],
    [12, 9570, 64400, 1200, 200, 400, 7, 320200],
    [12, 10004, 67280, 1240, 200, 400, 7, 334640],
    [12, 10438, 70160, 1280, 200, 400, 7, 349080],
    [12, 10872, 73040, 1320, 200, 400, 7, 363520],
    [12, 11306, 75920, 1360, 200, 400, 7, 377960],
    [12, 11740, 78800, 1400, 300, 600, 8, 392400],
    [16, 12258, 82260, 1440, 300, 600, 8, 409680],
    [16, 12776, 85720, 1480, 300, 600, 8, 426960],
    [16, 13294, 89180, 1520, 300, 600, 8, 444240],
    [16, 13812, 92640, 1560, 300, 600, 8, 461520],
    [16, 14330, 96100, 1600, 400, 800, 9, 478800],
    [16, 14946, 100200, 1640, 400, 800, 9, 499320],
    [16, 15562, 104300, 1680, 400, 800, 9, 519840],
    [16, 16178, 108400, 1720, 400, 800, 9, 540360],
    [16, 16794, 112500, 1760, 400, 800, 9, 560880],
    [16, 17410, 116600, 1800, 500, 1000, 10, 581400],
    [16, 18138, 121460, 1840, 500, 1000, 10, 605680],
    [16, 18866, 126320, 1880, 500, 1000, 10, 629960],
    [16, 19594, 131180, 1920, 500, 1000, 10, 654240],
    [16, 20322, 136040, 1960, 500, 1000, 10, 678520],
    [16, 21050, 140900, 2000, 600, 1200, 11, 702800],
    [20, 21834, 146120, 2040, 600, 1200, 11, 728920],
    [20, 22618, 151340, 2080, 600, 1200, 11, 755040],
    [20, 23402, 156560, 2120, 600, 1200, 11, 781160],
    [20, 24186, 161780, 2160, 600, 1200, 11, 807280],
    [20, 24970, 167000, 2200, 700, 1400, 12, 833400],
    [20, 25812, 172600, 2240, 700, 1400, 12, 861440],
    [20, 26654, 178200, 2280, 700, 1400, 12, 889480],
    [20, 27496, 183800, 2320, 700, 1400, 12, 917520],
    [20, 28338, 189400, 2360, 700, 1400, 12, 945560],
    [20, 29180, 195000, 2400, 800, 1600, 13, 973600],
    [26, 30076, 200980, 2440, 800, 1600, 13, 1003480],
    [26, 30972, 206960, 2480, 800, 1600, 13, 1033360],
    [26, 31868, 212940, 2520, 800, 1600, 13, 1063240],
    [26, 32764, 218920, 2560, 800, 1600, 13, 1093120],
    [26, 33660, 224900, 2600, 900, 1800, 14, 1123000],
    [28, 34612, 231240, 2640, 900, 1800, 14, 1154720],
    [28, 35564, 237580, 2680, 900, 1800, 14, 1186440],
    [28, 36516, 243920, 2720, 900, 1800, 14, 1218160],
    [28, 37468, 250260, 2760, 900, 1800, 14, 1249880],
    [28, 38420, 256600, 2800, 1000, 2000, 15, 1281600],
    [28, 39428, 263340, 2840, 1000, 2000, 15, 1315240],
    [28, 40436, 270080, 2880, 1000, 2000, 15, 1348880],
    [28, 41444, 276820, 2920, 1000, 2000, 15, 1382520],
    [28, 42452, 283560, 2960, 1000, 2000, 15, 1416160],
    [28, 43460, 290300, 3000, 1100, 2200, 16, 1449800],
    [28, 44328, 296100, 3020, 1100, 2200, 16, 1478760],
    [28, 45196, 301900, 3040, 1100, 2200, 16, 1507720],
    [28, 46064, 307700, 3060, 1100, 2200, 16, 1536680],
    [28, 46932, 313500, 3080, 1100, 2200, 16, 1565640],
    [28, 47800, 319300, 3100, 1200, 2400, 17, 1594600],
    [28, 48670, 325100, 3120, 1200, 2400, 17, 1623600],
    [28, 49540, 330900, 3140, 1200, 2400, 17, 1652600],
    [28, 50410, 336700, 3160, 1200, 2400, 17, 1681600],
    [28, 51280, 342500, 3180, 1200, 2400, 17, 1710600],
    [28, 52150, 348300, 3200, 1400, 2800, 18, 1739600],
    [28, 53018, 354100, 3220, 1400, 2800, 18, 1768560],
    [28, 53886, 359900, 3240, 1400, 2800, 18, 1797520],
    [28, 54754, 365700, 3260, 1400, 2800, 18, 1826480],
    [28, 55622, 371500, 3280, 1400, 2800, 18, 1855440],
    [28, 56490, 377300, 3300, 1600, 3200, 19, 1884400],
    [28, 57360, 383100, 3320, 1600, 3200, 19, 1913400],
    [28, 58230, 388900, 3340, 1600, 3200, 19, 1942400],
    [28, 59100, 394700, 3360, 1600, 3200, 19, 1971400],
    [28, 59970, 400500, 3380, 1600, 3200, 19, 2000400],
    [28, 60840, 406300, 3400, 1800, 3600, 20, 2029400],
    [28, 61708, 412120, 3420, 1800, 3600, 20, 2058400],
    [28, 62576, 417940, 3440, 1800, 3600, 20, 2087400],
    [28, 63444, 423760, 3460, 1800, 3600, 20, 2116400],
    [28, 64312, 429580, 3480, 1800, 3600, 20, 2145400],
    [28, 65180, 435400, 3500, 2000, 4000, 21, 2174400],
  ],
} as const;

export interface RelicStarCostRow {
  readonly starLevel: Exclude<RelicStarLevel, 0>;
  readonly tier: RelicTierIndex;
  readonly starInTier: 1 | 2 | 3 | 4 | 5;
  readonly shardsPerSubStep: number;
  readonly shardsPerStar: number;
  readonly cumulativeShards: number;
  readonly heroAttackPercent: number;
  readonly heroHpPercent: number;
  readonly isBreakthrough: boolean;
  readonly isRoiSweetSpot?: boolean;
  readonly milestoneBadge?: Readonly<Record<CalculatorLocale, string>>;
}

export interface RelicRarityTable {
  readonly rarity: RelicRarity;
  readonly name: Readonly<Record<CalculatorLocale, string>>;
  readonly shortName: Readonly<Record<CalculatorLocale, string>>;
  readonly shardName: Readonly<Record<CalculatorLocale, string>>;
  readonly shardGameId: number;
  readonly maxTotalShards: number;
  readonly tierTotals: readonly [number, number, number, number];
  readonly breakthroughCrystalsByTier: readonly [number, number, number, number];
  readonly magicStonesByTier: readonly [number, number, number, number];
  readonly maxHeroAttackPercent: number;
  readonly maxHeroHpPercent: number;
  readonly countsForStarSuppression: boolean;
  readonly garPointsPerShard: number;
  readonly guildRushPointsPerShard: number;
  readonly guildRushActivationPoints: number;
  readonly stars: readonly RelicStarCostRow[];
}

export interface RelicFactionSlotTemplate {
  readonly slotRole: RelicSlotRole;
  readonly slotLabel: Readonly<Record<CalculatorLocale, string>>;
  readonly bisRelicName: Readonly<Record<CalculatorLocale, string>>;
  readonly f2pAlternative: Readonly<Record<CalculatorLocale, string>>;
  readonly mechanicTag: Readonly<Record<CalculatorLocale, string>>;
  readonly tacticalSummary: Readonly<Record<CalculatorLocale, string>>;
}

export interface RelicFactionSetProfile {
  readonly id: RelicFactionId;
  readonly factionName: Readonly<Record<CalculatorLocale, string>>;
  readonly setName: Readonly<Record<CalculatorLocale, string>>;
  readonly synergyBonus: Readonly<Record<CalculatorLocale, string>>;
  readonly slots: readonly [
    RelicFactionSlotTemplate,
    RelicFactionSlotTemplate,
    RelicFactionSlotTemplate,
  ];
}

function buildRelicStars(
  rows: readonly {
    star: Exclude<RelicStarLevel, 0>;
    step: number;
    atk: number;
    hp: number;
    roi?: boolean;
    badge?: Readonly<Record<CalculatorLocale, string>>;
  }[]
): readonly RelicStarCostRow[] {
  let cumulative = 0;
  return rows.map((r) => {
    const shardsPerStar = r.step * 5;
    cumulative += shardsPerStar;
    const tier = Math.ceil(r.star / 5) as RelicTierIndex;
    const starInTier = (((r.star - 1) % 5) + 1) as 1 | 2 | 3 | 4 | 5;
    const isBreakthrough = starInTier === 5;
    return {
      starLevel: r.star,
      tier,
      starInTier,
      shardsPerSubStep: r.step,
      shardsPerStar,
      cumulativeShards: cumulative,
      heroAttackPercent: r.atk,
      heroHpPercent: r.hp,
      isBreakthrough,
      isRoiSweetSpot: r.roi,
      milestoneBadge: r.badge,
    };
  });
}

export const RELIC_RARITY_TABLES: Record<RelicRarity, RelicRarityTable> = {
  legendary: {
    rarity: "legendary",
    name: { vi: "Bí Bảo Cam (Legendary)", en: "Legendary Relic" },
    shortName: { vi: "Cam (Legendary)", en: "Legendary" },
    shardName: {
      vi: "Mảnh Vạn Năng Bí Bảo Cam",
      en: "Legendary Universal Relic Shard",
    },
    shardGameId: 220203,
    maxTotalShards: 1_800,
    tierTotals: [130, 360, 610, 700],
    breakthroughCrystalsByTier: [10, 25, 50, 100],
    magicStonesByTier: [2_000, 6_000, 12_000, 20_000],
    maxHeroAttackPercent: 20,
    maxHeroHpPercent: 40,
    countsForStarSuppression: true,
    garPointsPerShard: 5_000,
    guildRushPointsPerShard: 120,
    guildRushActivationPoints: 1_200,
    stars: buildRelicStars([
      { star: 1, step: 2, atk: 0.3, hp: 0.6 },
      { star: 2, step: 4, atk: 0.6, hp: 1.2 },
      { star: 3, step: 4, atk: 0.9, hp: 1.8 },
      { star: 4, step: 8, atk: 1.2, hp: 2.4 },
      {
        star: 5,
        step: 8,
        atk: 1.6,
        hp: 3.2,
        badge: { vi: "Đột Phá Bậc 1 (5★)", en: "Tier 1 Breakthrough (5★)" },
      },
      { star: 6, step: 12, atk: 2.0, hp: 4.0 },
      { star: 7, step: 12, atk: 3.0, hp: 6.0 },
      {
        star: 8,
        step: 16,
        atk: 4.0,
        hp: 8.0,
        roi: true,
        badge: { vi: "Điểm Gãy ROI (8★)", en: "ROI Sweet Spot (8★)" },
      },
      { star: 9, step: 16, atk: 5.0, hp: 10.0 },
      {
        star: 10,
        step: 16,
        atk: 6.0,
        hp: 12.0,
        badge: { vi: "Đột Phá Bậc 2 (10★)", en: "Tier 2 Breakthrough (10★)" },
      },
      { star: 11, step: 20, atk: 7.0, hp: 14.0 },
      { star: 12, step: 20, atk: 8.0, hp: 16.0 },
      { star: 13, step: 26, atk: 9.0, hp: 18.0 },
      { star: 14, step: 28, atk: 10.0, hp: 20.0 },
      {
        star: 15,
        step: 28,
        atk: 11.0,
        hp: 22.0,
        roi: true,
        badge: { vi: "Đột Phá Bậc 3 (15★)", en: "Tier 3 Breakthrough (15★)" },
      },
      { star: 16, step: 28, atk: 12.0, hp: 24.0 },
      { star: 17, step: 28, atk: 14.0, hp: 28.0 },
      { star: 18, step: 28, atk: 16.0, hp: 32.0 },
      { star: 19, step: 28, atk: 18.0, hp: 36.0 },
      {
        star: 20,
        step: 28,
        atk: 20.0,
        hp: 40.0,
        badge: { vi: "Đỉnh Tối Đa (20★)", en: "Max Cap (20★)" },
      },
    ]),
  },
  epic: {
    rarity: "epic",
    name: { vi: "Bí Bảo Tím (Epic)", en: "Epic Relic" },
    shortName: { vi: "Tím (Epic)", en: "Epic" },
    shardName: {
      vi: "Mảnh Vạn Năng Bí Bảo Tím",
      en: "Epic Universal Relic Shard",
    },
    shardGameId: 220202,
    maxTotalShards: 3_150,
    tierTotals: [150, 400, 1_300, 1_300],
    breakthroughCrystalsByTier: [5, 15, 30, 60],
    magicStonesByTier: [1_000, 3_000, 6_000, 10_000],
    maxHeroAttackPercent: 12,
    maxHeroHpPercent: 24,
    countsForStarSuppression: false,
    garPointsPerShard: 1_000,
    guildRushPointsPerShard: 25,
    guildRushActivationPoints: 250,
    stars: buildRelicStars([
      { star: 1, step: 2, atk: 0.3, hp: 0.6 },
      { star: 2, step: 4, atk: 0.4, hp: 0.8 },
      { star: 3, step: 6, atk: 0.6, hp: 1.2 },
      { star: 4, step: 8, atk: 0.8, hp: 1.6 },
      { star: 5, step: 10, atk: 1.0, hp: 2.0 },
      { star: 6, step: 12, atk: 1.6, hp: 3.2 },
      { star: 7, step: 14, atk: 2.2, hp: 4.4 },
      { star: 8, step: 16, atk: 2.8, hp: 5.6 },
      { star: 9, step: 18, atk: 3.4, hp: 6.8 },
      { star: 10, step: 20, atk: 4.0, hp: 8.0, roi: true },
      { star: 11, step: 30, atk: 4.8, hp: 9.6 },
      { star: 12, step: 40, atk: 5.6, hp: 11.2 },
      { star: 13, step: 50, atk: 6.4, hp: 12.8 },
      { star: 14, step: 60, atk: 7.2, hp: 14.4 },
      { star: 15, step: 80, atk: 8.0, hp: 16.0 },
      { star: 16, step: 30, atk: 8.8, hp: 17.6 },
      { star: 17, step: 40, atk: 9.6, hp: 19.2 },
      { star: 18, step: 50, atk: 10.4, hp: 20.8 },
      { star: 19, step: 60, atk: 11.2, hp: 22.4 },
      { star: 20, step: 80, atk: 12.0, hp: 24.0 },
    ]),
  },
  rare: {
    rarity: "rare",
    name: { vi: "Bí Bảo Lam (Rare)", en: "Rare Relic" },
    shortName: { vi: "Lam (Rare)", en: "Rare" },
    shardName: {
      vi: "Mảnh Vạn Năng Bí Bảo Lam",
      en: "Rare Universal Relic Shard",
    },
    shardGameId: 220201,
    maxTotalShards: 4_860,
    tierTotals: [150, 460, 1_850, 2_400],
    breakthroughCrystalsByTier: [2, 5, 10, 20],
    magicStonesByTier: [500, 1_500, 3_000, 5_000],
    maxHeroAttackPercent: 6,
    maxHeroHpPercent: 12,
    countsForStarSuppression: false,
    garPointsPerShard: 200,
    guildRushPointsPerShard: 5,
    guildRushActivationPoints: 50,
    stars: buildRelicStars([
      { star: 1, step: 2, atk: 0.1, hp: 0.2 },
      { star: 2, step: 4, atk: 0.2, hp: 0.4 },
      { star: 3, step: 6, atk: 0.3, hp: 0.6 },
      { star: 4, step: 8, atk: 0.4, hp: 0.8 },
      { star: 5, step: 10, atk: 0.5, hp: 1.0 },
      { star: 6, step: 12, atk: 0.8, hp: 1.6 },
      { star: 7, step: 14, atk: 1.1, hp: 2.2 },
      { star: 8, step: 16, atk: 1.4, hp: 2.8 },
      { star: 9, step: 20, atk: 1.7, hp: 3.4 },
      { star: 10, step: 30, atk: 2.0, hp: 4.0 },
      { star: 11, step: 40, atk: 2.4, hp: 4.8 },
      { star: 12, step: 50, atk: 2.8, hp: 5.6 },
      { star: 13, step: 60, atk: 3.2, hp: 6.4 },
      { star: 14, step: 100, atk: 3.6, hp: 7.2 },
      { star: 15, step: 120, atk: 4.0, hp: 8.0 },
      { star: 16, step: 70, atk: 4.4, hp: 8.8 },
      { star: 17, step: 80, atk: 4.8, hp: 9.6 },
      { star: 18, step: 90, atk: 5.2, hp: 10.4 },
      { star: 19, step: 110, atk: 5.6, hp: 11.2 },
      { star: 20, step: 130, atk: 6.0, hp: 12.0 },
    ]),
  },
} as const;

export const RELIC_FACTION_SETS: readonly RelicFactionSetProfile[] = [
  {
    id: "league",
    factionName: { vi: "Liên Minh (League)", en: "League" },
    setName: {
      vi: "Kho Tàng Bí Thuật (Arcane Vault)",
      en: "Arcane Vault",
    },
    synergyBonus: {
      vi: "Cộng hưởng Liên Minh: Lông Vũ Khế Ước kéo dài toàn bộ hiệu ứng Khống chế/Buff thêm +1 giây, kết hợp Lá Chắn Ngọc Hộ Mệnh.",
      en: "League Synergy: Feather of the Pact extends all Control/Buff durations by +1s, paired with Soul Guard Orb team shields.",
    },
    slots: [
      {
        slotRole: "offense",
        slotLabel: { vi: "Ô 1 — Công / Áp Chế", en: "Slot 1 — Offense / CC" },
        bisRelicName: {
          vi: "Kim Trượng Thạch Hóa (Petrification Staff)",
          en: "Petrification Staff",
        },
        f2pAlternative: {
          vi: "Bức Hại / Vương Miện Băng",
          en: "Persecution / Frost Diadem",
        },
        mechanicTag: {
          vi: "Hóa Đá 5s & +25% ST Nhận Vào",
          en: "5s Petrify & +25% DMG Taken",
        },
        tacticalSummary: {
          vi: "Hóa Đá hàng trước 5s, khiến mục tiêu nhận thêm +25% sát thương và giảm -25% tốc đánh.",
          en: "Petrifies frontline for 5s, increasing damage taken by +25% and reducing ATK speed by -25%.",
        },
      },
      {
        slotRole: "defense",
        slotLabel: {
          vi: "Ô 2 — Thủ / Sinh Tồn (Sustain)",
          en: "Slot 2 — Defense / Sustain",
        },
        bisRelicName: {
          vi: "Ngọc Hộ Mệnh (Soul Guard Orb)",
          en: "Soul Guard Orb",
        },
        f2pAlternative: {
          vi: "Vương Quyền / Đá Trăng Tròn",
          en: "Royalty / Moonstone",
        },
        mechanicTag: {
          vi: "Lá Chắn Toàn Đội + Giải Khống Chế",
          en: "Team Shield + Dispel CC",
        },
        tacticalSummary: {
          vi: "Tạo lá chắn diện rộng, tăng kháng chí mạng và thanh tẩy hiệu ứng bất lợi cho toàn đội.",
          en: "Grants team-wide barrier, boosts crit resistance, and dispels debuffs.",
        },
      },
      {
        slotRole: "support",
        slotLabel: {
          vi: "Ô 3 — Hỗ Trợ (+1s Control/Buff)",
          en: "Slot 3 — Support (+1s Control/Buff)",
        },
        bisRelicName: {
          vi: "Lông Vũ Khế Ước (Feather of the Pact)",
          en: "Feather of the Pact",
        },
        f2pAlternative: {
          vi: "Đá Trăng Tròn (Moonstone)",
          en: "Moonstone (Epic Sustain)",
        },
        mechanicTag: {
          vi: "+35% Skill DMG & +1s Khống Chế/Buff",
          en: "+35% Skill DMG & +1s Control/Buff",
        },
        tacticalSummary: {
          vi: "Tăng +35% sát thương kỹ năng 6s; khi đi cùng tướng Liên Minh kéo dài mọi hiệu ứng Khống chế/Buff thêm +1 giây.",
          en: "Boosts skill damage by +35% for 6s; extends League Control/Buff durations by +1s.",
        },
      },
    ],
  },
  {
    id: "horde",
    factionName: { vi: "Bộ Tộc (Horde)", en: "Horde" },
    setName: {
      vi: "Long Uy (Dragon's Might)",
      en: "Dragon's Might",
    },
    synergyBonus: {
      vi: "Cộng hưởng Bộ Tộc: Bùa Long Trảo kéo dài hiệu ứng Khống chế/Buff thêm +1 giây, kết hợp Chặn Sát Thương (Damage Cap) từ Tâm Long.",
      en: "Horde Synergy: Dragonbone Amulet extends Control/Buff durations by +1s, paired with Dragonheart Damage Cap.",
    },
    slots: [
      {
        slotRole: "offense",
        slotLabel: { vi: "Ô 1 — Công / Phá Kháng", en: "Slot 1 — Offense / Shred" },
        bisRelicName: {
          vi: "Phán Quyết Thiên Lôi (Thunder Judgment)",
          en: "Thunder Judgment",
        },
        f2pAlternative: {
          vi: "Vương Miện Băng / Nhẫn Đuôi Công Tước",
          en: "Frost Diadem / Duke's Signet Ring",
        },
        mechanicTag: {
          vi: "Giảm Kháng ST & Giảm ATK/DEF",
          en: "DMG Res Shred & ATK/DEF Reduction",
        },
        tacticalSummary: {
          vi: "Giáng sấm sét diện rộng, bào mòn kháng sát thương và giảm mạnh ATK/DEF của đội hình địch.",
          en: "Deals AoE lightning damage while shredding enemy damage resistance and ATK/DEF.",
        },
      },
      {
        slotRole: "defense",
        slotLabel: {
          vi: "Ô 2 — Thủ / Chặn Sát Thương (Damage Cap)",
          en: "Slot 2 — Defense / Damage Cap",
        },
        bisRelicName: {
          vi: "Tâm Long (Dragonheart)",
          en: "Dragonheart",
        },
        f2pAlternative: {
          vi: "Kèn Nguyên Soái / Đá Ma Giả Kim",
          en: "Marshal's Warhorn / Philosopher's Rune",
        },
        mechanicTag: {
          vi: "Giới Hạn Sát Thương Nhận Vào 10s",
          en: "10s Max HP Damage Cap",
        },
        tacticalSummary: {
          vi: "Kích hoạt cơ chế Damage Cap trong 10s, chặn đứng các đòn dồn sát thương sốc vượt ngưỡng % Máu tối đa.",
          en: "Activates a 10s Damage Cap preventing any single hit from exceeding a % of Max HP.",
        },
      },
      {
        slotRole: "support",
        slotLabel: {
          vi: "Ô 3 — Hỗ Trợ (+1s Control/Buff)",
          en: "Slot 3 — Support (+1s Control/Buff)",
        },
        bisRelicName: {
          vi: "Bùa Long Trảo (Dragonbone Amulet)",
          en: "Dragonbone Amulet",
        },
        f2pAlternative: {
          vi: "Đá Trăng Tròn (Moonstone)",
          en: "Moonstone (Epic Sustain)",
        },
        mechanicTag: {
          vi: "Tăng Tốc Đánh, Chí Mạng & +1s Buff",
          en: "ATK Speed, Crit Rate & +1s Buff",
        },
        tacticalSummary: {
          vi: "Bơm tốc đánh và tỉ lệ chí mạng 6s; đi cùng tướng Bộ Tộc kéo dài hiệu ứng Khống chế/Buff thêm +1 giây.",
          en: "Boosts attack speed and crit rate for 6s; extends Horde Control/Buff durations by +1s.",
        },
      },
    ],
  },
  {
    id: "nature",
    factionName: { vi: "Thiên Nhiên (Nature)", en: "Nature" },
    setName: {
      vi: "Lời Thề Rừng Thiêng (Oath of the Sacred Forest)",
      en: "Oath of the Sacred Forest",
    },
    synergyBonus: {
      vi: "Cộng hưởng Thiên Nhiên: Cuộn Thánh Thư kéo dài Khống chế/Buff thêm +1 giây, kết hợp trạng thái Che Chở (Shelter) của Vương Miện Bất Bại.",
      en: "Nature Synergy: Sacred Scroll extends Control/Buff durations by +1s, paired with Undefeated Crown Shelter Damage Cap.",
    },
    slots: [
      {
        slotRole: "offense",
        slotLabel: { vi: "Ô 1 — Công / Trói Chân", en: "Slot 1 — Offense / Root" },
        bisRelicName: {
          vi: "Cung Dây Leo (Vineborne Bow)",
          en: "Vineborne Bow",
        },
        f2pAlternative: {
          vi: "Vương Miện Băng / Bức Hại",
          en: "Frost Diadem / Persecution",
        },
        mechanicTag: {
          vi: "Trói Chân Diện Rộng & Khuếch Đại ST",
          en: "AoE Root & DMG Amplification",
        },
        tacticalSummary: {
          vi: "Bắn tên dây leo trói chân mục tiêu và tăng sát thương gánh chịu cho đội hình địch.",
          en: "Roots enemy targets with vine arrows and amplifies damage taken.",
        },
      },
      {
        slotRole: "defense",
        slotLabel: {
          vi: "Ô 2 — Thủ / Che Chở (Shelter Damage Cap)",
          en: "Slot 2 — Defense / Shelter Cap",
        },
        bisRelicName: {
          vi: "Vương Miện Bất Bại (Undefeated Crown)",
          en: "Undefeated Crown",
        },
        f2pAlternative: {
          vi: "Đá Trăng Tròn (Moonstone)",
          en: "Moonstone",
        },
        mechanicTag: {
          vi: "Hồi Phục + Che Chở Chặn Sát Thương",
          en: "Heal + Shelter Damage Cap",
        },
        tacticalSummary: {
          vi: "Hồi máu diện rộng và ban trạng thái Che Chở (Shelter) giới hạn sát thương tối đa mỗi đòn đánh.",
          en: "Restores AoE HP and grants Shelter capping maximum damage taken per hit.",
        },
      },
      {
        slotRole: "support",
        slotLabel: {
          vi: "Ô 3 — Hỗ Trợ (+1s Control/Buff)",
          en: "Slot 3 — Support (+1s Control/Buff)",
        },
        bisRelicName: {
          vi: "Cuộn Thánh Thư (Sacred Scroll)",
          en: "Sacred Scroll",
        },
        f2pAlternative: {
          vi: "Đá Trăng Tròn (Moonstone)",
          en: "Moonstone (Pure Healer)",
        },
        mechanicTag: {
          vi: "Kháng Sát Thương, Năng Lượng & +1s Buff",
          en: "DMG Reduction, Energy & +1s Buff",
        },
        tacticalSummary: {
          vi: "Tăng kháng sát thương, hồi năng lượng và kéo dài Khống chế/Buff thêm +1s.",
          en: "Grants damage reduction, energy regen, and +1s Control/Buff duration.",
        },
      },
    ],
  },
] as const;

export const RELIC_EVENT_SCORING = {
  garPointsPerRelicScroll: 1_500,
  garPointsPerArcaneCrystal: 1_200,
  garPointsPer2000MagicStones: 600,
  magicStoneBlockSize: 2_000,
  guildRushPointsPerArcaneCrystal: 12,
  guildRushPointsPerMagicStone: 6,
  estimatedLegendaryShardsPerScroll: 1,
} as const;

export function clampPetalIndex(petalIndex: number): number {
  if (!Number.isFinite(petalIndex)) return 0;
  return Math.max(0, Math.min(RELIC_MAX_PETAL_INDEX, Math.round(petalIndex)));
}

export function starAndSubStepToPetalIndex(
  starLevel: RelicStarLevel | number,
  subStep: RelicSubStep | number = 0
): number {
  const safeStar = Math.max(0, Math.min(20, Math.round(starLevel)));
  if (safeStar >= 20) return RELIC_MAX_PETAL_INDEX;
  const safeSubStep = Math.max(0, Math.min(4, Math.round(subStep)));
  return safeStar * 5 + safeSubStep;
}

export function petalIndexToStarAndSubStep(petalIndex: number): {
  readonly starLevel: RelicStarLevel;
  readonly subStep: RelicSubStep;
  readonly tierIndex: RelicTierIndex;
  readonly tierColorId: RelicStarTierColorId;
} {
  const safe = clampPetalIndex(petalIndex);
  if (safe >= RELIC_MAX_PETAL_INDEX) {
    return {
      starLevel: 20,
      subStep: 0,
      tierIndex: 4,
      tierColorId: "diamond",
    };
  }
  const starLevel = Math.floor(safe / 5) as RelicStarLevel;
  const subStep = (safe % 5) as RelicSubStep;
  const effectiveStarForTier = Math.max(1, Math.min(20, starLevel === 0 ? 1 : starLevel));
  const tierIndex = Math.ceil(effectiveStarForTier / 5) as RelicTierIndex;
  const tierMeta =
    RELIC_STAR_TIERS.find((t) => t.tierIndex === tierIndex) ?? RELIC_STAR_TIERS[0];

  return {
    starLevel,
    subStep,
    tierIndex,
    tierColorId: tierMeta.id,
  };
}

export function getRelicById(relicId: number): RelicCatalogItem {
  return (
    RELIC_CATALOG.find((r) => r.id === relicId) ??
    RELIC_CATALOG.find((r) => r.id === 150001) ??
    RELIC_CATALOG[0]
  );
}

export interface RelicPetalSnapshot {
  readonly petalIndex: number;
  readonly starLevel: RelicStarLevel;
  readonly subStep: RelicSubStep;
  readonly tierIndex: RelicTierIndex;
  readonly tierColorId: RelicStarTierColorId;
  readonly shardCostFromPrevPetal: number;
  readonly cumulativeShards: number;
  readonly baseAtk: number;
  readonly baseHp: number;
  readonly effectiveAtk: number;
  readonly effectiveHp: number;
  readonly relicHallBoostPermille: number;
  readonly relicHallBoostPercent: number;
  readonly bonusProfile: RelicBonusProfile;
  readonly dmgBoostPercent: number;
  readonly dmgReductionPercent: number;
  readonly heroAtkPercent: number;
  readonly heroHpPercent: number;
  readonly skillLevel: number;
  readonly fightforce: number;
}

export function getRelicPetalSnapshot(
  relicId: number,
  petalIndex: number,
  relicHallLevel: number = 60,
  relicHallSubStep: number = 0
): RelicPetalSnapshot {
  const relic = getRelicById(relicId);
  const safePetal = clampPetalIndex(petalIndex);
  const curve = RELIC_PETAL_CURVES[relic.rarity];
  const tuple = curve[safePetal] ?? curve[0];
  const decoded = petalIndexToStarAndSubStep(safePetal);

  let cumulativeShards = 0;
  for (let i = 1; i <= safePetal; i += 1) {
    cumulativeShards += curve[i]?.[0] ?? 0;
  }

  const boostPermille = getRelicHallBoostPermilleAtLevel(
    relicHallLevel,
    relicHallSubStep
  );
  const baseAtk = tuple[1];
  const baseHp = tuple[2];
  const effectiveAtk = Math.floor((baseAtk * boostPermille) / 10000);
  const effectiveHp = Math.floor((baseHp * boostPermille) / 10000);

  const rawBonusPercent = Number((tuple[3] / 100).toFixed(2));
  let dmgBoostPercent = 0;
  let dmgReductionPercent = 0;

  if (relic.bonusProfile === "dmg_boost") {
    dmgBoostPercent = rawBonusPercent;
  } else if (relic.bonusProfile === "dmg_reduction") {
    dmgReductionPercent = rawBonusPercent;
  } else if (relic.bonusProfile === "dual_dmg_boost_and_reduction") {
    dmgBoostPercent = rawBonusPercent;
    dmgReductionPercent = rawBonusPercent;
  }

  return {
    petalIndex: safePetal,
    starLevel: decoded.starLevel,
    subStep: decoded.subStep,
    tierIndex: decoded.tierIndex,
    tierColorId: decoded.tierColorId,
    shardCostFromPrevPetal: tuple[0],
    cumulativeShards,
    baseAtk,
    baseHp,
    effectiveAtk,
    effectiveHp,
    relicHallBoostPermille: boostPermille,
    relicHallBoostPercent: Number((boostPermille / 100).toFixed(2)),
    bonusProfile: relic.bonusProfile,
    dmgBoostPercent,
    dmgReductionPercent,
    heroAtkPercent: Number((tuple[4] / 100).toFixed(2)),
    heroHpPercent: Number((tuple[5] / 100).toFixed(2)),
    skillLevel: tuple[6],
    fightforce: tuple[7],
  };
}

export interface RelicStarUpgradeInput {
  readonly relicId: number;
  readonly fromPetalIndex: number;
  readonly toPetalIndex: number;
  readonly relicHallLevel: number;
  readonly relicHallSubStep?: number;
  readonly includeUnlockCost?: boolean;
  readonly ownedSpecificShards: number;
  readonly ownedUniversalShards: number;
}

export interface RelicStarUpgradeResult {
  readonly relic: RelicCatalogItem;
  readonly rarityTable: RelicRarityTable;
  readonly isInvalidRange: boolean;
  readonly fromState: RelicPetalSnapshot;
  readonly toState: RelicPetalSnapshot;
  readonly petalsTraversed: number;
  readonly starUpgradeShards: number;
  readonly unlockShards: number;
  readonly totalRequiredShards: number;
  readonly ownedSpecificShards: number;
  readonly ownedUniversalShards: number;
  readonly specificShardsUsed: number;
  readonly universalShardsUsed: number;
  readonly missingShards: number;
  readonly surplusSpecificShards: number;
  readonly surplusUniversalShards: number;
  readonly atkDelta: number;
  readonly hpDelta: number;
  readonly dmgBoostDelta: number;
  readonly dmgReductionDelta: number;
  readonly heroAtkDelta: number;
  readonly heroHpDelta: number;
  readonly skillLevelDelta: number;
  readonly fightforceDelta: number;
  readonly garPointsFromRequiredShards: number;
}

export function calculateRelicStarUpgrade(
  input: RelicStarUpgradeInput
): RelicStarUpgradeResult {
  const relic = getRelicById(input.relicId);
  const rarityTable = RELIC_RARITY_TABLES[relic.rarity];
  const safeFrom = clampPetalIndex(input.fromPetalIndex);
  const safeTo = clampPetalIndex(input.toPetalIndex);
  const isInvalidRange = safeTo < safeFrom;

  const hallSub = input.relicHallSubStep ?? 0;
  const fromState = getRelicPetalSnapshot(
    relic.id,
    safeFrom,
    input.relicHallLevel,
    hallSub
  );
  const toState = getRelicPetalSnapshot(
    relic.id,
    isInvalidRange ? safeFrom : safeTo,
    input.relicHallLevel,
    hallSub
  );

  const petalsTraversed = isInvalidRange ? 0 : safeTo - safeFrom;
  const starUpgradeShards = isInvalidRange
    ? 0
    : Math.max(0, toState.cumulativeShards - fromState.cumulativeShards);
  const unlockShards =
    !isInvalidRange && input.includeUnlockCost ? RELIC_UNLOCK_SHARDS_COST : 0;
  const totalRequiredShards = starUpgradeShards + unlockShards;

  const safeOwnedSpecific = Math.max(
    0,
    Math.floor(input.ownedSpecificShards || 0)
  );
  const safeOwnedUniversal = Math.max(
    0,
    Math.floor(input.ownedUniversalShards || 0)
  );

  // Trong game: Mảnh Bí Bảo riêng được ưu tiên dùng trước (bao gồm cả ghép mở khóa + nâng sao),
  // phần còn thiếu mới bù bằng Mảnh Vạn Năng Bí Bảo cùng phẩm chất.
  const specificShardsUsed = Math.min(safeOwnedSpecific, totalRequiredShards);
  const remainingAfterSpecific = Math.max(
    0,
    totalRequiredShards - specificShardsUsed
  );
  const universalShardsUsed = Math.min(
    safeOwnedUniversal,
    remainingAfterSpecific
  );
  const missingShards = Math.max(
    0,
    remainingAfterSpecific - universalShardsUsed
  );

  const surplusSpecificShards = Math.max(
    0,
    safeOwnedSpecific - specificShardsUsed
  );
  const surplusUniversalShards = Math.max(
    0,
    safeOwnedUniversal - universalShardsUsed
  );

  return {
    relic,
    rarityTable,
    isInvalidRange,
    fromState,
    toState,
    petalsTraversed,
    starUpgradeShards,
    unlockShards,
    totalRequiredShards,
    ownedSpecificShards: safeOwnedSpecific,
    ownedUniversalShards: safeOwnedUniversal,
    specificShardsUsed,
    universalShardsUsed,
    missingShards,
    surplusSpecificShards,
    surplusUniversalShards,
    atkDelta: Math.max(0, toState.effectiveAtk - fromState.effectiveAtk),
    hpDelta: Math.max(0, toState.effectiveHp - fromState.effectiveHp),
    dmgBoostDelta: Number(
      Math.max(0, toState.dmgBoostPercent - fromState.dmgBoostPercent).toFixed(2)
    ),
    dmgReductionDelta: Number(
      Math.max(
        0,
        toState.dmgReductionPercent - fromState.dmgReductionPercent
      ).toFixed(2)
    ),
    heroAtkDelta: Number(
      Math.max(0, toState.heroAtkPercent - fromState.heroAtkPercent).toFixed(2)
    ),
    heroHpDelta: Number(
      Math.max(0, toState.heroHpPercent - fromState.heroHpPercent).toFixed(2)
    ),
    skillLevelDelta: Math.max(0, toState.skillLevel - fromState.skillLevel),
    fightforceDelta: Math.max(0, toState.fightforce - fromState.fightforce),
    garPointsFromRequiredShards:
      totalRequiredShards * rarityTable.garPointsPerShard,
  };
}

export function getInvestedRelicShardsAtState(
  rarity: RelicRarity,
  starLevel: RelicStarLevel,
  subStep: RelicSubStep = 0
): number {
  const table = RELIC_RARITY_TABLES[rarity];
  if (starLevel <= 0) {
    const firstStarStep = table.stars[0].shardsPerSubStep;
    return Math.min(4, Math.max(0, subStep)) * firstStarStep;
  }
  if (starLevel >= 20) {
    return table.maxTotalShards;
  }
  const baseCumulative = table.stars[starLevel - 1].cumulativeShards;
  const nextStarStep = table.stars[starLevel].shardsPerSubStep;
  return baseCumulative + Math.min(4, Math.max(0, subStep)) * nextStarStep;
}

export function getRelicPassiveStatsAtStar(
  rarity: RelicRarity,
  starLevel: RelicStarLevel
): { readonly heroAttackPercent: number; readonly heroHpPercent: number } {
  if (starLevel <= 0) {
    return { heroAttackPercent: 0, heroHpPercent: 0 };
  }
  const row = RELIC_RARITY_TABLES[rarity].stars[Math.min(20, starLevel) - 1];
  return {
    heroAttackPercent: row.heroAttackPercent,
    heroHpPercent: row.heroHpPercent,
  };
}

export function calculateRelicShardsBetweenStates(
  rarity: RelicRarity,
  fromStar: RelicStarLevel,
  fromSubStep: RelicSubStep,
  toStar: RelicStarLevel,
  toSubStep: RelicSubStep
): number {
  const fromInvested = getInvestedRelicShardsAtState(
    rarity,
    fromStar,
    fromSubStep
  );
  const toInvested = getInvestedRelicShardsAtState(rarity, toStar, toSubStep);
  return Math.max(0, toInvested - fromInvested);
}

export function calculateAuxiliaryRelicMaterialsBetweenStars(
  rarity: RelicRarity,
  fromStar: RelicStarLevel,
  toStar: RelicStarLevel
): {
  readonly requiredArcaneCrystals: number;
  readonly requiredMagicStones: number;
  readonly breakthroughCountCrossed: number;
} {
  const table = RELIC_RARITY_TABLES[rarity];
  const breakthroughStars: readonly RelicStarLevel[] = [5, 10, 15, 20];
  let requiredArcaneCrystals = 0;
  let requiredMagicStones = 0;
  let breakthroughCountCrossed = 0;

  breakthroughStars.forEach((bStar, tierIdx) => {
    if (bStar > fromStar && bStar <= toStar) {
      breakthroughCountCrossed += 1;
      requiredArcaneCrystals += table.breakthroughCrystalsByTier[tierIdx];
      requiredMagicStones += table.magicStonesByTier[tierIdx];
    }
  });

  return {
    requiredArcaneCrystals,
    requiredMagicStones,
    breakthroughCountCrossed,
  };
}

export interface StarSuppressionAuditResult {
  readonly ourLegendaryStars: number;
  readonly enemyLegendaryStars: number;
  readonly starDelta: number;
  readonly status:
    | "suppressing_enemy"
    | "tied_no_suppression"
    | "suppressed_by_enemy";
  readonly enemyPenaltyPercent: 0 | -50;
  readonly ourPenaltyPercent: 0 | -50;
  readonly neededStarsToTie: number;
  readonly neededStarsToSuppress: number;
  readonly hasNonLegendaryInQueueWarning: boolean;
  readonly verdictTitle: Readonly<Record<CalculatorLocale, string>>;
  readonly verdictDetail: Readonly<Record<CalculatorLocale, string>>;
}

export function evaluateStarRatingSuppression(
  ourLegendaryStars: number,
  enemyLegendaryStars: number,
  hasNonLegendaryInQueue: boolean
): StarSuppressionAuditResult {
  const safeOur = Math.max(0, ourLegendaryStars);
  const safeEnemy = Math.max(0, enemyLegendaryStars);
  const starDelta = safeOur - safeEnemy;

  if (starDelta > 0) {
    return {
      ourLegendaryStars: safeOur,
      enemyLegendaryStars: safeEnemy,
      starDelta,
      status: "suppressing_enemy",
      enemyPenaltyPercent: -50,
      ourPenaltyPercent: 0,
      neededStarsToTie: 0,
      neededStarsToSuppress: 0,
      hasNonLegendaryInQueueWarning: hasNonLegendaryInQueue,
      verdictTitle: {
        vi: `Đang Áp Chế Đối Phương -50% (+${starDelta}★ Cam)`,
        en: `Suppressing Enemy by -50% (+${starDelta}★ Legendary)`,
      },
      verdictDetail: {
        vi: "Tổng Sao Bí Bảo Cam của bạn vượt đối thủ, khiến toàn bộ sát thương, hồi máu và thời gian hiệu lực Bí Bảo địch bị cắt giảm 50%.",
        en: "Your total Legendary Relic Stars exceed the enemy's, cutting all enemy Relic damage, healing, and effect durations by 50%.",
      },
    };
  }

  if (starDelta === 0) {
    return {
      ourLegendaryStars: safeOur,
      enemyLegendaryStars: safeEnemy,
      starDelta: 0,
      status: "tied_no_suppression",
      enemyPenaltyPercent: 0,
      ourPenaltyPercent: 0,
      neededStarsToTie: 0,
      neededStarsToSuppress: 1,
      hasNonLegendaryInQueueWarning: hasNonLegendaryInQueue,
      verdictTitle: {
        vi: "Cân Bằng Sao Cam (0% Áp Chế — Cần +1★ để Đè -50%)",
        en: "Tied Legendary Stars (0% Suppression — Need +1★ to Suppress -50%)",
      },
      verdictDetail: {
        vi: "Hai đội bằng điểm Sao Bí Bảo Cam. Chỉ cần nâng thêm đúng +1★ Bí Bảo Cam ở bất kỳ ô nào trong Đội 1 là bạn sẽ kích hoạt Áp Chế -50% lên đối thủ!",
        en: "Both queues have equal Legendary Relic Stars. Adding just +1★ to any Legendary Relic in Queue 1 activates -50% Suppression against the enemy!",
      },
    };
  }

  const deficit = Math.abs(starDelta);
  return {
    ourLegendaryStars: safeOur,
    enemyLegendaryStars: safeEnemy,
    starDelta,
    status: "suppressed_by_enemy",
    enemyPenaltyPercent: 0,
    ourPenaltyPercent: -50,
    neededStarsToTie: deficit,
    neededStarsToSuppress: deficit + 1,
    hasNonLegendaryInQueueWarning: hasNonLegendaryInQueue,
    verdictTitle: {
      vi: `Báo Động Đỏ: Đang Bị Áp Chế -50% (Kém ${deficit}★ Cam)`,
      en: `Red Alert: Suppressed by -50% (-${deficit}★ Legendary Deficit)`,
    },
    verdictDetail: {
      vi: `Bí Bảo Đội 1 của bạn đang bị giảm một nửa hiệu lực! Cần nâng thêm +${deficit}★ Bí Bảo Cam để thoát áp chế, hoặc +${deficit + 1}★ để lật ngược Áp Chế -50%.`,
      en: `Your Queue 1 Relics are operating at 50% effectiveness! Upgrade +${deficit}★ Legendary Stars to break even, or +${deficit + 1}★ to reverse -50% Suppression.`,
    },
  };
}

export interface SingleRelicUpgradeInput {
  readonly rarity: RelicRarity;
  readonly fromStar: RelicStarLevel;
  readonly fromSubStep: RelicSubStep;
  readonly toStar: RelicStarLevel;
  readonly toSubStep: RelicSubStep;
  readonly ownedShards: number;
  readonly ownedRelicScrolls: number;
  readonly ownedMagicStones: number;
  readonly ownedArcaneCrystals: number;
}

export interface SingleRelicUpgradeResult {
  readonly rarityTable: RelicRarityTable;
  readonly fromInvestedShards: number;
  readonly toInvestedShards: number;
  readonly requiredShards: number;
  readonly deficitShards: number;
  readonly deficitShardsAfterScrolls: number;
  readonly surplusShards: number;
  readonly requiredArcaneCrystals: number;
  readonly deficitArcaneCrystals: number;
  readonly requiredMagicStones: number;
  readonly deficitMagicStones: number;
  readonly fromStats: {
    readonly heroAttackPercent: number;
    readonly heroHpPercent: number;
  };
  readonly toStats: {
    readonly heroAttackPercent: number;
    readonly heroHpPercent: number;
  };
  readonly breakthroughCountCrossed: number;
  readonly garPointsFromRequiredShards: number;
  readonly garPointsFromOwnedVault: number;
  readonly guildRushPointsFromRequiredShards: number;
}

export function calculateSingleRelicUpgrade(
  input: SingleRelicUpgradeInput
): SingleRelicUpgradeResult {
  const rarityTable = RELIC_RARITY_TABLES[input.rarity];
  const fromInvestedShards = getInvestedRelicShardsAtState(
    input.rarity,
    input.fromStar,
    input.fromSubStep
  );
  const toInvestedShards = getInvestedRelicShardsAtState(
    input.rarity,
    input.toStar,
    input.toSubStep
  );
  const requiredShards = Math.max(0, toInvestedShards - fromInvestedShards);

  const safeOwnedShards = Math.max(0, input.ownedShards);
  const safeScrolls = Math.max(0, input.ownedRelicScrolls);
  const deficitShards = Math.max(0, requiredShards - safeOwnedShards);
  const deficitShardsAfterScrolls = Math.max(0, deficitShards - safeScrolls);
  const surplusShards = Math.max(0, safeOwnedShards - requiredShards);

  const aux = calculateAuxiliaryRelicMaterialsBetweenStars(
    input.rarity,
    input.fromStar,
    input.toStar
  );
  const safeOwnedCrystals = Math.max(0, input.ownedArcaneCrystals);
  const safeOwnedStones = Math.max(0, input.ownedMagicStones);

  const deficitArcaneCrystals = Math.max(
    0,
    aux.requiredArcaneCrystals - safeOwnedCrystals
  );
  const deficitMagicStones = Math.max(
    0,
    aux.requiredMagicStones - safeOwnedStones
  );

  const fromStats = getRelicPassiveStatsAtStar(input.rarity, input.fromStar);
  const toStats = getRelicPassiveStatsAtStar(input.rarity, input.toStar);

  const garPointsFromRequiredShards =
    requiredShards * rarityTable.garPointsPerShard;

  const ownedScrollPoints =
    safeScrolls * RELIC_EVENT_SCORING.garPointsPerRelicScroll;
  const ownedCrystalPoints =
    safeOwnedCrystals * RELIC_EVENT_SCORING.garPointsPerArcaneCrystal;
  const ownedStonePoints =
    Math.floor(safeOwnedStones / RELIC_EVENT_SCORING.magicStoneBlockSize) *
    RELIC_EVENT_SCORING.garPointsPer2000MagicStones;

  const garPointsFromOwnedVault =
    safeOwnedShards * rarityTable.garPointsPerShard +
    ownedScrollPoints +
    ownedCrystalPoints +
    ownedStonePoints;

  const guildRushPointsFromRequiredShards =
    requiredShards * rarityTable.guildRushPointsPerShard;

  return {
    rarityTable,
    fromInvestedShards,
    toInvestedShards,
    requiredShards,
    deficitShards,
    deficitShardsAfterScrolls,
    surplusShards,
    requiredArcaneCrystals: aux.requiredArcaneCrystals,
    deficitArcaneCrystals,
    requiredMagicStones: aux.requiredMagicStones,
    deficitMagicStones,
    fromStats,
    toStats,
    breakthroughCountCrossed: aux.breakthroughCountCrossed,
    garPointsFromRequiredShards,
    garPointsFromOwnedVault,
    guildRushPointsFromRequiredShards,
  };
}

export interface RelicTrioSlotInput {
  readonly slotRole: RelicSlotRole;
  readonly rarity: RelicRarity;
  readonly fromStar: RelicStarLevel;
  readonly fromSubStep: RelicSubStep;
  readonly toStar: RelicStarLevel;
  readonly toSubStep: RelicSubStep;
}

export interface RelicTrioPlanInput {
  readonly faction: RelicFactionId;
  readonly slots: readonly [
    RelicTrioSlotInput,
    RelicTrioSlotInput,
    RelicTrioSlotInput,
  ];
  readonly enemyLegendaryStars: number;
  readonly ownedLegendaryShards: number;
  readonly ownedEpicShards: number;
  readonly ownedRareShards: number;
  readonly ownedRelicScrolls: number;
  readonly ownedMagicStones: number;
  readonly ownedArcaneCrystals: number;
}

export interface RelicTrioPlanResult {
  readonly factionSet: RelicFactionSetProfile;
  readonly slotBreakdowns: readonly {
    readonly template: RelicFactionSlotTemplate;
    readonly input: RelicTrioSlotInput;
    readonly requiredShards: number;
    readonly requiredArcaneCrystals: number;
    readonly requiredMagicStones: number;
    readonly fromStats: {
      readonly heroAttackPercent: number;
      readonly heroHpPercent: number;
    };
    readonly toStats: {
      readonly heroAttackPercent: number;
      readonly heroHpPercent: number;
    };
    readonly contributesLegendaryStars: number;
  }[];
  readonly requiredShardsByRarity: Readonly<Record<RelicRarity, number>>;
  readonly deficitShardsByRarity: Readonly<Record<RelicRarity, number>>;
  readonly totalRequiredArcaneCrystals: number;
  readonly deficitArcaneCrystals: number;
  readonly totalRequiredMagicStones: number;
  readonly deficitMagicStones: number;
  readonly currentQueueLegendaryStars: number;
  readonly targetQueueLegendaryStars: number;
  readonly totalPassiveHeroAttackPercent: number;
  readonly totalPassiveHeroHpPercent: number;
  readonly suppressionAudit: StarSuppressionAuditResult;
  readonly garPointsFromRequiredShards: number;
  readonly garPointsFromOwnedVault: number;
  readonly guildRushPointsFromRequiredShards: number;
}

export function calculateRelicTrioPlan(
  input: RelicTrioPlanInput
): RelicTrioPlanResult {
  const factionSet =
    RELIC_FACTION_SETS.find((f) => f.id === input.faction) ??
    RELIC_FACTION_SETS[0];

  const requiredShardsByRarity: Record<RelicRarity, number> = {
    legendary: 0,
    epic: 0,
    rare: 0,
  };

  let totalRequiredArcaneCrystals = 0;
  let totalRequiredMagicStones = 0;
  let currentQueueLegendaryStars = 0;
  let targetQueueLegendaryStars = 0;
  let totalPassiveHeroAttackPercent = 0;
  let totalPassiveHeroHpPercent = 0;
  let hasNonLegendaryInQueue = false;

  const slotBreakdowns = factionSet.slots.map((template, idx) => {
    const slotInput = input.slots[idx];
    const req = calculateRelicShardsBetweenStates(
      slotInput.rarity,
      slotInput.fromStar,
      slotInput.fromSubStep,
      slotInput.toStar,
      slotInput.toSubStep
    );
    requiredShardsByRarity[slotInput.rarity] += req;

    const aux = calculateAuxiliaryRelicMaterialsBetweenStars(
      slotInput.rarity,
      slotInput.fromStar,
      slotInput.toStar
    );
    totalRequiredArcaneCrystals += aux.requiredArcaneCrystals;
    totalRequiredMagicStones += aux.requiredMagicStones;

    const fromStats = getRelicPassiveStatsAtStar(
      slotInput.rarity,
      slotInput.fromStar
    );
    const toStats = getRelicPassiveStatsAtStar(
      slotInput.rarity,
      slotInput.toStar
    );

    totalPassiveHeroAttackPercent += toStats.heroAttackPercent;
    totalPassiveHeroHpPercent += toStats.heroHpPercent;

    if (slotInput.rarity === "legendary") {
      currentQueueLegendaryStars += slotInput.fromStar;
      targetQueueLegendaryStars += slotInput.toStar;
    } else {
      hasNonLegendaryInQueue = true;
    }

    return {
      template,
      input: slotInput,
      requiredShards: req,
      requiredArcaneCrystals: aux.requiredArcaneCrystals,
      requiredMagicStones: aux.requiredMagicStones,
      fromStats,
      toStats,
      contributesLegendaryStars:
        slotInput.rarity === "legendary" ? slotInput.toStar : 0,
    };
  });

  const deficitShardsByRarity: Record<RelicRarity, number> = {
    legendary: Math.max(
      0,
      requiredShardsByRarity.legendary -
        Math.max(0, input.ownedLegendaryShards)
    ),
    epic: Math.max(
      0,
      requiredShardsByRarity.epic - Math.max(0, input.ownedEpicShards)
    ),
    rare: Math.max(
      0,
      requiredShardsByRarity.rare - Math.max(0, input.ownedRareShards)
    ),
  };

  const deficitArcaneCrystals = Math.max(
    0,
    totalRequiredArcaneCrystals - Math.max(0, input.ownedArcaneCrystals)
  );
  const deficitMagicStones = Math.max(
    0,
    totalRequiredMagicStones - Math.max(0, input.ownedMagicStones)
  );

  const suppressionAudit = evaluateStarRatingSuppression(
    targetQueueLegendaryStars,
    input.enemyLegendaryStars,
    hasNonLegendaryInQueue
  );

  const garPointsFromRequiredShards =
    requiredShardsByRarity.legendary *
      RELIC_RARITY_TABLES.legendary.garPointsPerShard +
    requiredShardsByRarity.epic * RELIC_RARITY_TABLES.epic.garPointsPerShard +
    requiredShardsByRarity.rare * RELIC_RARITY_TABLES.rare.garPointsPerShard;

  const garPointsFromOwnedVault =
    Math.max(0, input.ownedLegendaryShards) *
      RELIC_RARITY_TABLES.legendary.garPointsPerShard +
    Math.max(0, input.ownedEpicShards) *
      RELIC_RARITY_TABLES.epic.garPointsPerShard +
    Math.max(0, input.ownedRareShards) *
      RELIC_RARITY_TABLES.rare.garPointsPerShard +
    Math.max(0, input.ownedRelicScrolls) *
      RELIC_EVENT_SCORING.garPointsPerRelicScroll +
    Math.max(0, input.ownedArcaneCrystals) *
      RELIC_EVENT_SCORING.garPointsPerArcaneCrystal +
    Math.floor(
      Math.max(0, input.ownedMagicStones) /
        RELIC_EVENT_SCORING.magicStoneBlockSize
    ) * RELIC_EVENT_SCORING.garPointsPer2000MagicStones;

  const guildRushPointsFromRequiredShards =
    requiredShardsByRarity.legendary *
      RELIC_RARITY_TABLES.legendary.guildRushPointsPerShard +
    requiredShardsByRarity.epic *
      RELIC_RARITY_TABLES.epic.guildRushPointsPerShard +
    requiredShardsByRarity.rare *
      RELIC_RARITY_TABLES.rare.guildRushPointsPerShard;

  return {
    factionSet,
    slotBreakdowns,
    requiredShardsByRarity,
    deficitShardsByRarity,
    totalRequiredArcaneCrystals,
    deficitArcaneCrystals,
    totalRequiredMagicStones,
    deficitMagicStones,
    currentQueueLegendaryStars,
    targetQueueLegendaryStars,
    totalPassiveHeroAttackPercent: Number(
      totalPassiveHeroAttackPercent.toFixed(2)
    ),
    totalPassiveHeroHpPercent: Number(totalPassiveHeroHpPercent.toFixed(2)),
    suppressionAudit,
    garPointsFromRequiredShards,
    garPointsFromOwnedVault,
    guildRushPointsFromRequiredShards,
  };
}

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
export type RelicFactionId = "league" | "horde" | "nature";
export type RelicSlotRole = "offense" | "defense" | "support";
export type RelicScopeMode = "trio" | "single";

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
  /** Định mức Pha Lê Bí Thuật ước tính mỗi mốc Đột Phá Bậc Sao (5★ / 10★ / 15★ / 20★) */
  readonly breakthroughCrystalsByTier: readonly [number, number, number, number];
  /** Định mức Đá Vân Ma Thuật đi kèm mỗi Bậc Sao (Tier 1..4) */
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
    shortName: { vi: "Tím (0★ Áp chế)", en: "Epic (0★ Suppression)" },
    shardName: {
      vi: "Mảnh Vạn Năng Bí Bảo Tím",
      en: "Epic Universal Relic Shard",
    },
    shardGameId: 220202,
    maxTotalShards: 3_130,
    tierTotals: [130, 400, 1_300, 1_300],
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
      { star: 3, step: 4, atk: 0.6, hp: 1.2 },
      { star: 4, step: 8, atk: 0.8, hp: 1.6 },
      { star: 5, step: 8, atk: 1.0, hp: 2.0 },
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
    maxTotalShards: 4_810,
    tierTotals: [150, 460, 1_850, 2_350],
    breakthroughCrystalsByTier: [2, 5, 10, 20],
    magicStonesByTier: [500, 1_500, 3_000, 5_000],
    maxHeroAttackPercent: 6,
    maxHeroHpPercent: 12,
    countsForStarSuppression: false,
    garPointsPerShard: 200,
    guildRushPointsPerShard: 5,
    guildRushActivationPoints: 50,
    stars: buildRelicStars([
      { star: 1, step: 2, atk: 0.2, hp: 0.4 },
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
      { star: 18, step: 90, atk: 5.0, hp: 10.0 },
      { star: 19, step: 110, atk: 5.2, hp: 10.4 },
      { star: 20, step: 120, atk: 6.0, hp: 12.0 },
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
      vi: "Cộng hưởng Liên Minh: Lông Vũ Khế Ước kéo dài toàn bộ hiệu ứng Khống chế/Buff thêm +1 giây, kết hợp Lá Chắn Quả Cầu Hộ Hồn.",
      en: "League Synergy: Feather of the Pact extends all Control/Buff durations by +1s, paired with Soul Guard Orb team shields.",
    },
    slots: [
      {
        slotRole: "offense",
        slotLabel: { vi: "Ô 1 — Công / Áp Chế", en: "Slot 1 — Offense / CC" },
        bisRelicName: {
          vi: "Trượng Hóa Đá (Petrification Staff)",
          en: "Petrification Staff",
        },
        f2pAlternative: {
          vi: "Lưỡi Hái Truy Sát / Vương Miện Băng Giá",
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
          vi: "Quả Cầu Hộ Hồn (Soul Guard Orb)",
          en: "Soul Guard Orb",
        },
        f2pAlternative: {
          vi: "Khiên Thánh Quang / Vương Miện Băng Giá",
          en: "Holy Shield / Frost Diadem",
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
          vi: "Đá Ánh Trăng (Moonstone — Hồi Phục Tím)",
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
      vi: "Cộng hưởng Bộ Tộc: Bùa Xương Rồng kéo dài hiệu ứng Khống chế/Buff thêm +1 giây, kết hợp Chặn Sát Thương (Damage Cap) từ Trái Tim Rồng.",
      en: "Horde Synergy: Dragonbone Amulet extends Control/Buff durations by +1s, paired with Dragonheart Damage Cap.",
    },
    slots: [
      {
        slotRole: "offense",
        slotLabel: { vi: "Ô 1 — Công / Phá Kháng", en: "Slot 1 — Offense / Shred" },
        bisRelicName: {
          vi: "Phán Quyết Sấm Sét (Thunder Judgment)",
          en: "Thunder Judgment",
        },
        f2pAlternative: {
          vi: "Vương Miện Băng Giá / Nhẫn Ấn Công Tước",
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
          vi: "Trái Tim Rồng (Dragonheart)",
          en: "Dragonheart",
        },
        f2pAlternative: {
          vi: "Tù Và Chiến Tranh / Khiên Cổ Ngữ",
          en: "War Horn / Rune Shield",
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
          vi: "Bùa Xương Rồng (Dragonbone Amulet)",
          en: "Dragonbone Amulet",
        },
        f2pAlternative: {
          vi: "Đá Ánh Trăng (Moonstone — Hồi Phục Tím)",
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
      vi: "Cộng hưởng Thiên Nhiên: Cuộn Rừng Thiêng kéo dài Khống chế/Buff thêm +1 giây, kết hợp trạng thái Che Chở (Shelter) của Vương Miện Bất Bại.",
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
          vi: "Vương Miện Băng Giá / Lưỡi Hái Truy Sát",
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
          vi: "Đá Ánh Trăng (Moonstone)",
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
          vi: "Cuộn Rừng Thiêng (Sacred Scroll)",
          en: "Sacred Scroll",
        },
        f2pAlternative: {
          vi: "Đá Ánh Trăng (Moonstone — Hồi Phục Thuần)",
          en: "Moonstone (Pure Healer)",
        },
        mechanicTag: {
          vi: "Kháng Sát Thương, Năng Lượng & +1s Buff",
          en: "DMG Reduction, Energy & +1s Buff",
        },
        tacticalSummary: {
          vi: "Tăng kháng sát thương, hồi năng lượng và kéo dài Khống chế/Buff thêm +1s (Lưu ý: không có hồi máu trực tiếp như Moonstone).",
          en: "Grants damage reduction, energy regen, and +1s Control/Buff duration (Note: no direct heal unlike Moonstone).",
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
  /** Trung bình 1 Cuộn Bí Bảo (Wish) quy đổi tương đương ~1 Mảnh Bí Bảo Cam hoặc ~3 Mảnh Tím */
  estimatedLegendaryShardsPerScroll: 1,
} as const;

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

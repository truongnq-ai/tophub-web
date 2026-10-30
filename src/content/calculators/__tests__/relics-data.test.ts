import { describe, expect, it } from "vitest";
import {
  RELIC_EVENT_SCORING,
  RELIC_FACTION_SETS,
  RELIC_RARITY_TABLES,
  calculateAuxiliaryRelicMaterialsBetweenStars,
  calculateRelicShardsBetweenStates,
  calculateRelicTrioPlan,
  calculateSingleRelicUpgrade,
  evaluateStarRatingSuppression,
  getInvestedRelicShardsAtState,
  getRelicPassiveStatsAtStar,
} from "../relics-data";

describe("6.2 Bí Bảo — SSoT Data Engine (relics-data.ts)", () => {
  it("verifies 20-star SSoT cumulative shards and passive ATK/HP milestones for Legendary (1,800), Epic (3,130), and Rare (4,810)", () => {
    const leg = RELIC_RARITY_TABLES.legendary;
    expect(leg.maxTotalShards).toBe(1_800);
    expect(leg.tierTotals).toEqual([130, 360, 610, 700]);
    expect(leg.breakthroughCrystalsByTier).toEqual([10, 25, 50, 100]);
    expect(leg.magicStonesByTier).toEqual([2_000, 6_000, 12_000, 20_000]);

    // Key Legendary Star Milestones: 5★, 8★ (ROI), 10★, 15★, 20★
    expect(leg.stars[4].cumulativeShards).toBe(130);
    expect(leg.stars[4].heroAttackPercent).toBe(1.6);
    expect(leg.stars[4].heroHpPercent).toBe(3.2);
    expect(leg.stars[4].isBreakthrough).toBe(true);

    expect(leg.stars[7].cumulativeShards).toBe(330);
    expect(leg.stars[7].heroAttackPercent).toBe(4.0);
    expect(leg.stars[7].heroHpPercent).toBe(8.0);
    expect(leg.stars[7].isRoiSweetSpot).toBe(true);

    expect(leg.stars[9].cumulativeShards).toBe(490);
    expect(leg.stars[9].heroAttackPercent).toBe(6.0);
    expect(leg.stars[9].heroHpPercent).toBe(12.0);
    expect(leg.stars[9].isBreakthrough).toBe(true);

    expect(leg.stars[14].cumulativeShards).toBe(1_100);
    expect(leg.stars[14].heroAttackPercent).toBe(11.0);
    expect(leg.stars[14].heroHpPercent).toBe(22.0);
    expect(leg.stars[14].isBreakthrough).toBe(true);

    expect(leg.stars[19].cumulativeShards).toBe(1_800);
    expect(leg.stars[19].heroAttackPercent).toBe(20.0);
    expect(leg.stars[19].heroHpPercent).toBe(40.0);
    expect(leg.stars[19].isBreakthrough).toBe(true);

    // Epic (3,130 max) & Rare (4,810 max)
    const epic = RELIC_RARITY_TABLES.epic;
    expect(epic.maxTotalShards).toBe(3_130);
    expect(epic.tierTotals).toEqual([130, 400, 1_300, 1_300]);
    expect(epic.stars[19].cumulativeShards).toBe(3_130);
    expect(epic.stars[19].heroAttackPercent).toBe(12.0);
    expect(epic.stars[19].heroHpPercent).toBe(24.0);
    expect(epic.countsForStarSuppression).toBe(false);

    const rare = RELIC_RARITY_TABLES.rare;
    expect(rare.maxTotalShards).toBe(4_810);
    expect(rare.tierTotals).toEqual([150, 460, 1_850, 2_350]);
    expect(rare.stars[19].cumulativeShards).toBe(4_810);
    expect(rare.stars[19].heroAttackPercent).toBe(6.0);
    expect(rare.stars[19].heroHpPercent).toBe(12.0);
    expect(rare.countsForStarSuppression).toBe(false);
  });

  it("calculates exact sub-step petal (0/5..4/5) shard investment and auxiliary materials across 5★/10★/15★/20★ breakthroughs", () => {
    // 0★ (3/5) -> 3 * 2 = 6 shards
    expect(getInvestedRelicShardsAtState("legendary", 0, 3)).toBe(6);
    // 5★ (2/5) -> 130 + 2 * 12 = 154 shards
    expect(getInvestedRelicShardsAtState("legendary", 5, 2)).toBe(154);
    // 5★ (2/5) -> 10★ (0/5) = 490 - 154 = 336 shards
    expect(calculateRelicShardsBetweenStates("legendary", 5, 2, 10, 0)).toBe(
      336
    );
    // At 20★, subStep is capped at maxTotalShards (1,800)
    expect(getInvestedRelicShardsAtState("legendary", 20, 4)).toBe(1_800);

    // Passive stats at 0★ and 8★
    expect(getRelicPassiveStatsAtStar("legendary", 0)).toEqual({
      heroAttackPercent: 0,
      heroHpPercent: 0,
    });
    expect(getRelicPassiveStatsAtStar("legendary", 8)).toEqual({
      heroAttackPercent: 4,
      heroHpPercent: 8,
    });

    // Full 0★ -> 20★ Legendary auxiliary materials:
    // Arcane Crystals = 10 + 25 + 50 + 100 = 185
    // Magic Stones = 2,000 + 6,000 + 12,000 + 20,000 = 40,000
    const fullAux = calculateAuxiliaryRelicMaterialsBetweenStars(
      "legendary",
      0,
      20
    );
    expect(fullAux.breakthroughCountCrossed).toBe(4);
    expect(fullAux.requiredArcaneCrystals).toBe(185);
    expect(fullAux.requiredMagicStones).toBe(40_000);

    // Single Relic Upgrade 0★ -> 20★ with inventory
    const singleMax = calculateSingleRelicUpgrade({
      rarity: "legendary",
      fromStar: 0,
      fromSubStep: 0,
      toStar: 20,
      toSubStep: 0,
      ownedShards: 1_000,
      ownedRelicScrolls: 0,
      ownedArcaneCrystals: 200,
      ownedMagicStones: 50_000,
    });
    expect(singleMax.requiredShards).toBe(1_800);
    expect(singleMax.deficitShards).toBe(800);
    expect(singleMax.surplusShards).toBe(0);
    expect(singleMax.requiredArcaneCrystals).toBe(185);
    expect(singleMax.deficitArcaneCrystals).toBe(0);
    expect(singleMax.requiredMagicStones).toBe(40_000);
    expect(singleMax.deficitMagicStones).toBe(0);
    expect(singleMax.garPointsFromRequiredShards).toBe(
      1_800 * RELIC_RARITY_TABLES.legendary.garPointsPerShard
    );
    expect(RELIC_EVENT_SCORING.garPointsPerArcaneCrystal).toBe(1_200);
  });

  it("evaluates -50% Star Rating Suppression and Faction Trio profiles accurately", () => {
    expect(RELIC_FACTION_SETS).toHaveLength(3);

    const suppressing = evaluateStarRatingSuppression(25, 24, false);
    expect(suppressing.status).toBe("suppressing_enemy");
    expect(suppressing.enemyPenaltyPercent).toBe(-50);
    expect(suppressing.ourPenaltyPercent).toBe(0);

    const tied = evaluateStarRatingSuppression(24, 24, false);
    expect(tied.status).toBe("tied_no_suppression");
    expect(tied.neededStarsToSuppress).toBe(1);

    const suppressed = evaluateStarRatingSuppression(16, 18, true);
    expect(suppressed.status).toBe("suppressed_by_enemy");
    expect(suppressed.ourPenaltyPercent).toBe(-50);
    expect(suppressed.neededStarsToTie).toBe(2);
    expect(suppressed.neededStarsToSuppress).toBe(3);
    expect(suppressed.hasNonLegendaryInQueueWarning).toBe(true);

    const trio = calculateRelicTrioPlan({
      faction: "league",
      slots: [
        {
          slotRole: "offense",
          rarity: "legendary",
          fromStar: 0,
          fromSubStep: 0,
          toStar: 8,
          toSubStep: 0,
        },
        {
          slotRole: "defense",
          rarity: "legendary",
          fromStar: 0,
          fromSubStep: 0,
          toStar: 5,
          toSubStep: 0,
        },
        {
          slotRole: "support",
          rarity: "epic",
          fromStar: 0,
          fromSubStep: 0,
          toStar: 10,
          toSubStep: 0,
        },
      ],
      enemyLegendaryStars: 12,
      ownedLegendaryShards: 200,
      ownedEpicShards: 300,
      ownedRareShards: 0,
      ownedRelicScrolls: 10,
      ownedMagicStones: 2_000,
      ownedArcaneCrystals: 5,
    });
    expect(trio.requiredShardsByRarity.legendary).toBe(460);
    expect(trio.requiredShardsByRarity.epic).toBe(530);
    expect(trio.targetQueueLegendaryStars).toBe(13);
  });
});

import { describe, expect, it } from "vitest";
import {
  RELIC_CATALOG,
  RELIC_EVENT_SCORING,
  RELIC_FACTION_SETS,
  RELIC_RARITY_TABLES,
  RELIC_STAR_TIERS,
  RELIC_UNLOCK_SHARDS_COST,
  calculateRelicShardsBetweenStates,
  calculateRelicStarUpgrade,
  calculateRelicTrioPlan,
  calculateSingleRelicUpgrade,
  evaluateStarRatingSuppression,
  getInvestedRelicShardsAtState,
  getRelicById,
  getRelicPassiveStatsAtStar,
  getRelicPetalSnapshot,
  petalIndexToStarAndSubStep,
  starAndSubStepToPetalIndex,
} from "../relics-data";

describe("6.3 Nâng sao Bí Bảo — SSoT Data Engine (relics-data.ts)", () => {
  it("contains all 29 active Relics (19 Legendary, 7 Epic, 3 Rare) with official bilingual names, illustration paths, shard icons, and 4 bonus profiles", () => {
    expect(RELIC_CATALOG).toHaveLength(29);
    expect(RELIC_CATALOG.filter((r) => r.rarity === "legendary")).toHaveLength(
      19
    );
    expect(RELIC_CATALOG.filter((r) => r.rarity === "epic")).toHaveLength(7);
    expect(RELIC_CATALOG.filter((r) => r.rarity === "rare")).toHaveLength(3);

    for (const relic of RELIC_CATALOG) {
      expect(relic.name.vi.length).toBeGreaterThan(1);
      expect(relic.name.en.length).toBeGreaterThan(1);
      expect(relic.name.en).not.toContain("artifact_name_");
      expect(relic.illustrationPath).toMatch(
        /^\/images\/relics\/illustrations\/Artifact_\d+\.webp$/
      );
      expect(relic.shardIconPath).toMatch(
        /^\/images\/items\/shards\/icon_\d+\.webp$/
      );
    }

    const dukeRing = getRelicById(150001);
    expect(dukeRing.name.vi).toBe("Nhẫn Đuôi Công Tước");
    expect(dukeRing.name.en).toBe("Duke's Signet Ring");
    expect(dukeRing.bonusProfile).toBe("dmg_boost");

    const warFlag = getRelicById(150005);
    expect(warFlag.bonusProfile).toBe("dual_dmg_boost_and_reduction");
  });

  it("verifies active version=1 20-star (100 petals) cumulative shards for Legendary (1,800), Epic (3,150), and Rare (4,860) across 4 Star Color Tiers", () => {
    expect(RELIC_STAR_TIERS).toHaveLength(4);
    expect(RELIC_STAR_TIERS.map((t) => t.id)).toEqual([
      "gold",
      "red",
      "silver",
      "diamond",
    ]);

    const leg = RELIC_RARITY_TABLES.legendary;
    expect(leg.maxTotalShards).toBe(1_800);
    expect(leg.tierTotals).toEqual([130, 360, 610, 700]);
    expect(leg.stars[4].cumulativeShards).toBe(130);
    expect(leg.stars[9].cumulativeShards).toBe(490);
    expect(leg.stars[14].cumulativeShards).toBe(1_100);
    expect(leg.stars[19].cumulativeShards).toBe(1_800);

    const epic = RELIC_RARITY_TABLES.epic;
    expect(epic.maxTotalShards).toBe(3_150);
    expect(epic.tierTotals).toEqual([150, 400, 1_300, 1_300]);
    expect(epic.stars[4].cumulativeShards).toBe(150);
    expect(epic.stars[9].cumulativeShards).toBe(550);
    expect(epic.stars[14].cumulativeShards).toBe(1_850);
    expect(epic.stars[19].cumulativeShards).toBe(3_150);

    const rare = RELIC_RARITY_TABLES.rare;
    expect(rare.maxTotalShards).toBe(4_860);
    expect(rare.tierTotals).toEqual([150, 460, 1_850, 2_400]);
    expect(rare.stars[4].cumulativeShards).toBe(150);
    expect(rare.stars[9].cumulativeShards).toBe(610);
    expect(rare.stars[14].cumulativeShards).toBe(2_460);
    expect(rare.stars[19].cumulativeShards).toBe(4_860);
  });

  it("maps star+subStep <-> petalIndex (0..100) and matches Screenshot 4 (Nhẫn Đuôi Công Tước 3★ 0/5 ➔ 3★ 1/5 at Relic Hall Lv.60 = 9,684 ➔ 10,151 ATK, 65,650 ➔ 68,750 HP, 6% ➔ 6.4% DMG Boost, 8 Shards)", () => {
    expect(starAndSubStepToPetalIndex(0, 0)).toBe(0);
    expect(starAndSubStepToPetalIndex(3, 0)).toBe(15);
    expect(starAndSubStepToPetalIndex(3, 1)).toBe(16);
    expect(starAndSubStepToPetalIndex(20, 0)).toBe(100);

    expect(petalIndexToStarAndSubStep(15)).toEqual({
      starLevel: 3,
      subStep: 0,
      tierIndex: 1,
      tierColorId: "gold",
    });
    expect(petalIndexToStarAndSubStep(16)).toEqual({
      starLevel: 3,
      subStep: 1,
      tierIndex: 1,
      tierColorId: "gold",
    });

    const p15 = getRelicPetalSnapshot(150001, 15, 60);
    expect(p15.baseAtk).toBe(5060);
    expect(p15.baseHp).toBe(34300);
    expect(p15.effectiveAtk).toBe(9684);
    expect(p15.effectiveHp).toBe(65650);
    expect(p15.dmgBoostPercent).toBe(6);
    expect(p15.heroAtkPercent).toBe(0.9);
    expect(p15.heroHpPercent).toBe(1.8);

    const p16 = getRelicPetalSnapshot(150001, 16, 60);
    expect(p16.baseAtk).toBe(5304);
    expect(p16.baseHp).toBe(35920);
    expect(p16.effectiveAtk).toBe(10151);
    expect(p16.effectiveHp).toBe(68750);
    expect(p16.dmgBoostPercent).toBe(6.4);
    expect(p16.heroAtkPercent).toBe(0.9);
    expect(p16.heroHpPercent).toBe(1.8);

    // Screenshot 4 Upgrade: 3★ (0/5) -> 3★ (1/5) with 7 Specific Shards & 23 Universal Shards
    const upgrade = calculateRelicStarUpgrade({
      relicId: 150001,
      fromPetalIndex: 15,
      toPetalIndex: 16,
      relicHallLevel: 60,
      includeUnlockCost: false,
      ownedSpecificShards: 7,
      ownedUniversalShards: 23,
    });
    expect(upgrade.isInvalidRange).toBe(false);
    expect(upgrade.starUpgradeShards).toBe(8);
    expect(upgrade.unlockShards).toBe(0);
    expect(upgrade.totalRequiredShards).toBe(8);
    expect(upgrade.specificShardsUsed).toBe(7);
    expect(upgrade.universalShardsUsed).toBe(1);
    expect(upgrade.missingShards).toBe(0);
    expect(upgrade.surplusSpecificShards).toBe(0);
    expect(upgrade.surplusUniversalShards).toBe(22);
    expect(upgrade.atkDelta).toBe(467);
    expect(upgrade.hpDelta).toBe(3100);
  });

  it("includes +10 unlock shards when includeUnlockCost=true and preserves backward-compatible Trio / Suppression helpers", () => {
    expect(RELIC_UNLOCK_SHARDS_COST).toBe(10);

    const fullLegendaryWithUnlock = calculateRelicStarUpgrade({
      relicId: 150001,
      fromPetalIndex: 0,
      toPetalIndex: 100,
      relicHallLevel: 60,
      includeUnlockCost: true,
      ownedSpecificShards: 10,
      ownedUniversalShards: 1000,
    });
    expect(fullLegendaryWithUnlock.starUpgradeShards).toBe(1800);
    expect(fullLegendaryWithUnlock.unlockShards).toBe(10);
    expect(fullLegendaryWithUnlock.totalRequiredShards).toBe(1810);
    expect(fullLegendaryWithUnlock.specificShardsUsed).toBe(10);
    expect(fullLegendaryWithUnlock.universalShardsUsed).toBe(1000);
    expect(fullLegendaryWithUnlock.missingShards).toBe(800);

    expect(getInvestedRelicShardsAtState("legendary", 5, 2)).toBe(154);
    expect(calculateRelicShardsBetweenStates("legendary", 5, 2, 10, 0)).toBe(
      336
    );
    expect(getRelicPassiveStatsAtStar("legendary", 8)).toEqual({
      heroAttackPercent: 4,
      heroHpPercent: 8,
    });

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
    expect(RELIC_EVENT_SCORING.garPointsPerArcaneCrystal).toBe(1_200);
    expect(RELIC_FACTION_SETS).toHaveLength(3);
    expect(evaluateStarRatingSuppression(25, 24, false).status).toBe(
      "suppressing_enemy"
    );

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
    expect(trio.requiredShardsByRarity.epic).toBe(550);
  });
});

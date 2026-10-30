import { describe, expect, it } from "vitest";
import {
  SKIN_HONOR_LEVEL_PRESETS,
  SKIN_HONOR_MAX_LEVEL,
  SKIN_HONOR_MIN_LEVEL,
  SKIN_HONOR_TOTAL_COPIES_TO_MAX,
  calculateRosterStaircasePlan,
  calculateSkinHonorProgression,
  clampSkinHonorLevel,
} from "../skin-honor-data";

describe("3.2 Vinh Dự Quân Trang — SSoT Quantitative Engine (skin-honor-data.ts)", () => {
  it("verifies pure Glory Medal costs for Honor Lv.0 ➔ Lv.150 across Legendary (7.5M), Epic (3.75M), and Rare (1.875M)", () => {
    expect(SKIN_HONOR_MIN_LEVEL).toBe(0);
    expect(SKIN_HONOR_MAX_LEVEL).toBe(150);
    expect(SKIN_HONOR_TOTAL_COPIES_TO_MAX).toBe(40);
    expect(SKIN_HONOR_LEVEL_PRESETS).toEqual([0, 25, 50, 75, 100, 125, 150]);

    const legFull = calculateSkinHonorProgression({
      rarity: "legendary",
      currentHonorLevel: 0,
      targetHonorLevel: 150,
      ownedMedals: 0,
      ownedDuplicateCopies: 0,
      rosterCounts: { legendary: 1, epic: 0, rare: 0 },
    });
    expect(legFull.pureMedalsWithoutCopies).toBe(7_500_000);
    expect(legFull.netMedalsNeeded).toBe(7_500_000);
    expect(legFull.maxCopiesApplicable).toBe(40);
    expect(legFull.fullSkinPlusHonorCumulativeMedals).toBe(28_345_400);

    const epicFull = calculateSkinHonorProgression({
      rarity: "epic",
      currentHonorLevel: 0,
      targetHonorLevel: 150,
      ownedMedals: 0,
      ownedDuplicateCopies: 0,
      rosterCounts: { legendary: 0, epic: 1, rare: 0 },
    });
    expect(epicFull.pureMedalsWithoutCopies).toBe(3_750_000);
    expect(epicFull.fullSkinPlusHonorCumulativeMedals).toBe(14_172_700);

    const rareFull = calculateSkinHonorProgression({
      rarity: "rare",
      currentHonorLevel: 0,
      targetHonorLevel: 150,
      ownedMedals: 0,
      ownedDuplicateCopies: 0,
      rosterCounts: { legendary: 0, epic: 0, rare: 1 },
    });
    expect(rareFull.pureMedalsWithoutCopies).toBe(1_875_000);
    expect(rareFull.fullSkinPlusHonorCumulativeMedals).toBe(7_086_350);
  });

  it("handles duplicate copy +5 level step substitution in Tier 1 (1 copy/5 lv) and Tier 2 (2 copies/5 lv)", () => {
    const allByCopies = calculateSkinHonorProgression({
      rarity: "legendary",
      currentHonorLevel: 0,
      targetHonorLevel: 150,
      ownedMedals: 0,
      ownedDuplicateCopies: 40,
      rosterCounts: { legendary: 1, epic: 0, rare: 0 },
    });
    expect(allByCopies.copiesUsedForHonor).toBe(40);
    expect(allByCopies.levelsCoveredByCopies).toBe(150);
    expect(allByCopies.levelsCoveredByMedals).toBe(0);
    expect(allByCopies.netMedalsNeeded).toBe(0);
    expect(allByCopies.medalsSavedByCopies).toBe(7_500_000);

    const oddTier2Copies = calculateSkinHonorProgression({
      rarity: "legendary",
      currentHonorLevel: 0,
      targetHonorLevel: 120,
      ownedMedals: 500_000,
      ownedDuplicateCopies: 23,
      rosterCounts: { legendary: 1, epic: 0, rare: 0 },
    });
    expect(oddTier2Copies.copiesUsedForHonor).toBe(22);
    expect(oddTier2Copies.copiesUnusedRemainder).toBe(1);
    expect(oddTier2Copies.levelsCoveredByCopies).toBe(105);
    expect(oddTier2Copies.levelsCoveredByMedals).toBe(15);
    expect(oddTier2Copies.netMedalsNeeded).toBe(750_000);
    expect(oddTier2Copies.medalsShortfall).toBe(250_000);

    expect(clampSkinHonorLevel(-10)).toBe(0);
    expect(clampSkinHonorLevel(999)).toBe(150);
  });

  it("computes Global Roster Staircase reference plan", () => {
    const plan = calculateRosterStaircasePlan(
      { legendary: 2, epic: 4, rare: 2 },
      1_300_000
    );
    expect(plan.recommendations.length).toBeGreaterThanOrEqual(6);
    expect(plan.recommendations[0].status).toBe("affordable");
  });
});

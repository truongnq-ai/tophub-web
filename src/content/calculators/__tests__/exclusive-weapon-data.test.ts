import { describe, expect, it } from "vitest";
import {
  EXCLUSIVE_SKILL_MILESTONES,
  EXCLUSIVE_WEAPON_HERO_CATALOG,
  EXCLUSIVE_WEAPON_LEVEL_STEPS,
  MAX_EXCLUSIVE_STAR_STEP,
  MAX_EXCLUSIVE_WEAPON_LEVEL,
  MIN_EXCLUSIVE_STAR_STEP,
  MIN_EXCLUSIVE_WEAPON_LEVEL,
  calculateExclusiveWeapon,
  clampExclusiveStarStep,
  clampExclusiveWeaponLevel,
  getExclusiveStarSteps,
} from "../exclusive-weapon-data";

describe("4.3 Vũ Khí Độc Quyền — SSoT Data Engine (exclusive-weapon-data.ts)", () => {
  it("defines exact Lv.0..20 Exclusive Shard curve (5 / 75 / 275 / 605 / 1,185) and both SSoT Meteoric Iron Core profiles (920 & 2,385)", () => {
    expect(MIN_EXCLUSIVE_WEAPON_LEVEL).toBe(0);
    expect(MAX_EXCLUSIVE_WEAPON_LEVEL).toBe(20);
    expect(EXCLUSIVE_WEAPON_LEVEL_STEPS).toHaveLength(21);

    expect(MIN_EXCLUSIVE_STAR_STEP).toBe(0);
    expect(MAX_EXCLUSIVE_STAR_STEP).toBe(25);

    // Key cumulative Shard milestones
    expect(EXCLUSIVE_WEAPON_LEVEL_STEPS[0].cumulativeShards).toBe(0);
    expect(EXCLUSIVE_WEAPON_LEVEL_STEPS[1].cumulativeShards).toBe(5);
    expect(EXCLUSIVE_WEAPON_LEVEL_STEPS[5].cumulativeShards).toBe(75);
    expect(EXCLUSIVE_WEAPON_LEVEL_STEPS[10].cumulativeShards).toBe(275);
    expect(EXCLUSIVE_WEAPON_LEVEL_STEPS[15].cumulativeShards).toBe(605);
    expect(EXCLUSIVE_WEAPON_LEVEL_STEPS[20].cumulativeShards).toBe(1_185);

    // Profile 1: guide_cumulative_920 (120 -> 290 -> 490 -> 705 -> 920)
    const guideSteps = getExclusiveStarSteps("guide_cumulative_920");
    expect(guideSteps).toHaveLength(26);
    expect(guideSteps[0].cumulativeCores).toBe(0);
    expect(guideSteps[5].cumulativeCores).toBe(120);
    expect(guideSteps[10].cumulativeCores).toBe(290);
    expect(guideSteps[15].cumulativeCores).toBe(490);
    expect(guideSteps[20].cumulativeCores).toBe(705);
    expect(guideSteps[25].cumulativeCores).toBe(920);

    // Profile 2: raw_subtier_2385 (250 -> 615 -> 1,110 -> 1,695 -> 2,385)
    const rawSteps = getExclusiveStarSteps("raw_subtier_2385");
    expect(rawSteps).toHaveLength(26);
    expect(rawSteps[0].cumulativeCores).toBe(0);
    expect(rawSteps[5].cumulativeCores).toBe(250);
    expect(rawSteps[10].cumulativeCores).toBe(615);
    expect(rawSteps[15].cumulativeCores).toBe(1_110);
    expect(rawSteps[20].cumulativeCores).toBe(1_695);
    expect(rawSteps[25].cumulativeCores).toBe(2_385);

    expect(EXCLUSIVE_SKILL_MILESTONES).toHaveLength(5);
    expect(EXCLUSIVE_WEAPON_HERO_CATALOG).toHaveLength(16);
    expect(
      EXCLUSIVE_WEAPON_HERO_CATALOG.filter((h) => h.faction === "league")
    ).toHaveLength(6);
    expect(
      EXCLUSIVE_WEAPON_HERO_CATALOG.filter((h) => h.faction === "nature")
    ).toHaveLength(5);
    expect(
      EXCLUSIVE_WEAPON_HERO_CATALOG.filter((h) => h.faction === "horde")
    ).toHaveLength(5);

    expect(clampExclusiveWeaponLevel(-5)).toBe(0);
    expect(clampExclusiveWeaponLevel(99)).toBe(20);
    expect(clampExclusiveStarStep(-1)).toBe(0);
    expect(clampExclusiveStarStep(99)).toBe(25);
  });

  it("calculates single-weapon (×1 default) Shards, Meteoric Iron Cores, missing/surplus, and next milestone distance", () => {
    const oneHeroMax = calculateExclusiveWeapon({
      fromLevel: 0,
      toLevel: 20,
      fromStarStep: 0,
      toStarStep: 25,
      coreProfile: "guide_cumulative_920",
      selectedHeroId: "adjudicator",
      ownedShards: 185,
      ownedCores: 1_000,
    });

    expect(oneHeroMax.heroCount).toBe(1);
    expect(oneHeroMax.requiredShards).toBe(1_185);
    expect(oneHeroMax.requiredCores).toBe(920);
    expect(oneHeroMax.missingShards).toBe(1_000);
    expect(oneHeroMax.surplusShards).toBe(0);
    expect(oneHeroMax.missingCores).toBe(0);
    expect(oneHeroMax.surplusCores).toBe(80);
    expect(oneHeroMax.coreCompletionPercent).toBe(100);
    expect(oneHeroMax.shardsToNextMilestone).toBe(0);

    // Mid-progression Lv.1 -> Lv.10 (275 - 5 = 270 Shards; next milestone Lv.15 = 605 - 275 = 330 Shards)
    const midHero = calculateExclusiveWeapon({
      fromLevel: 1,
      toLevel: 10,
      fromStarStep: 0,
      toStarStep: 10,
      heroCount: 1,
      coreProfile: "raw_subtier_2385",
      selectedHeroId: "desert_prince",
    });

    expect(midHero.requiredShards).toBe(270);
    expect(midHero.requiredCores).toBe(615);
    expect(midHero.nextSkillMilestone?.requiredLevel).toBe(15);
    expect(midHero.shardsToNextMilestone).toBe(330);
  });

  it("validates Level range and Star range independently when from > to", () => {
    // Invalid Level range (15 -> 10) does NOT zero out valid Star range (0 -> 5)
    const invalidLevelValidStar = calculateExclusiveWeapon({
      fromLevel: 15,
      toLevel: 10,
      fromStarStep: 0,
      toStarStep: 5,
      heroCount: 1,
      coreProfile: "guide_cumulative_920",
    });
    expect(invalidLevelValidStar.isInvalidLevelRange).toBe(true);
    expect(invalidLevelValidStar.isInvalidStarRange).toBe(false);
    expect(invalidLevelValidStar.requiredShards).toBe(0);
    expect(invalidLevelValidStar.requiredCores).toBe(120);

    // Valid Level range (0 -> 10) with Invalid Star range (20 -> 10)
    const validLevelInvalidStar = calculateExclusiveWeapon({
      fromLevel: 0,
      toLevel: 10,
      fromStarStep: 20,
      toStarStep: 10,
      heroCount: 1,
      coreProfile: "guide_cumulative_920",
    });
    expect(validLevelInvalidStar.isInvalidLevelRange).toBe(false);
    expect(validLevelInvalidStar.isInvalidStarRange).toBe(true);
    expect(validLevelInvalidStar.requiredShards).toBe(275);
    expect(validLevelInvalidStar.requiredCores).toBe(0);
  });
});

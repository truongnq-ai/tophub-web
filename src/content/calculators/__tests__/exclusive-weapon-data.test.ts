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

describe("4.3 Trang Bị Độc Quyền — SSoT Data Engine (exclusive-weapon-data.ts)", () => {
  it("defines exact Lv.0..20 Exclusive Shard curve (5 / 75 / 275 / 605 / 1,185) and Game Cache Meteoric Iron Core SSoT (2,385)", () => {
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

    // Game Cache SSoT (65 -> 265 -> 745 -> 1,465 -> 2,385)
    const starSteps = getExclusiveStarSteps();
    expect(starSteps).toHaveLength(26);
    expect(starSteps[0].cumulativeCores).toBe(0);
    expect(starSteps[5].cumulativeCores).toBe(65);
    expect(starSteps[10].cumulativeCores).toBe(265);
    expect(starSteps[15].cumulativeCores).toBe(745);
    expect(starSteps[20].cumulativeCores).toBe(1_465);
    expect(starSteps[25].cumulativeCores).toBe(2_385);

    expect(EXCLUSIVE_SKILL_MILESTONES).toHaveLength(5);
    expect(EXCLUSIVE_WEAPON_HERO_CATALOG).toHaveLength(35);
    expect(
      EXCLUSIVE_WEAPON_HERO_CATALOG.filter((h) => h.faction === "league")
    ).toHaveLength(12);
    expect(
      EXCLUSIVE_WEAPON_HERO_CATALOG.filter((h) => h.faction === "nature")
    ).toHaveLength(11);
    expect(
      EXCLUSIVE_WEAPON_HERO_CATALOG.filter((h) => h.faction === "horde")
    ).toHaveLength(12);

    // Thuật Sĩ (Warlock) is in Horde
    const warlock = EXCLUSIVE_WEAPON_HERO_CATALOG.find((h) => h.heroId === "warlock");
    expect(warlock).toBeDefined();
    expect(warlock?.faction).toBe("horde");
    expect(warlock?.weaponName.vi).toBe("Lưỡi Hái Nguyền Rủa");

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
      selectedHeroId: "adjudicator",
      ownedShards: 185,
      ownedCores: 2_400,
    });

    expect(oneHeroMax.heroCount).toBe(1);
    expect(oneHeroMax.requiredShards).toBe(1_185);
    expect(oneHeroMax.requiredCores).toBe(2_385);
    expect(oneHeroMax.missingShards).toBe(1_000);
    expect(oneHeroMax.surplusShards).toBe(0);
    expect(oneHeroMax.missingCores).toBe(0);
    expect(oneHeroMax.surplusCores).toBe(15);
    expect(oneHeroMax.coreCompletionPercent).toBe(100);
    expect(oneHeroMax.shardsToNextMilestone).toBe(0);

    // Mid-progression Lv.1 -> Lv.10 (275 - 5 = 270 Shards; next milestone Lv.15 = 605 - 275 = 330 Shards)
    const midHero = calculateExclusiveWeapon({
      fromLevel: 1,
      toLevel: 10,
      fromStarStep: 0,
      toStarStep: 10,
      heroCount: 1,
      selectedHeroId: "desert_prince",
    });

    expect(midHero.requiredShards).toBe(270);
    expect(midHero.requiredCores).toBe(265);
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
    });
    expect(invalidLevelValidStar.isInvalidLevelRange).toBe(true);
    expect(invalidLevelValidStar.isInvalidStarRange).toBe(false);
    expect(invalidLevelValidStar.requiredShards).toBe(0);
    expect(invalidLevelValidStar.requiredCores).toBe(65);

    // Valid Level range (0 -> 10) with Invalid Star range (20 -> 10)
    const validLevelInvalidStar = calculateExclusiveWeapon({
      fromLevel: 0,
      toLevel: 10,
      fromStarStep: 20,
      toStarStep: 10,
      heroCount: 1,
    });
    expect(validLevelInvalidStar.isInvalidLevelRange).toBe(false);
    expect(validLevelInvalidStar.isInvalidStarRange).toBe(true);
    expect(validLevelInvalidStar.requiredShards).toBe(275);
    expect(validLevelInvalidStar.requiredCores).toBe(0);
  });
});

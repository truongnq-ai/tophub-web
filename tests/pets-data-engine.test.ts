import { describe, it, expect } from "vitest";
import {
  PET_CATALOG,
  PET_LEVEL_COSTS,
  PET_BREAK_MILESTONES,
  calculatePetLevelUpgrade,
  calculatePetBreakthroughUpgrade,
  getPetById,
} from "@/content/calculators/pets-data";

describe("Pets Data Engine & SSoT Matrices", () => {
  describe("PET_CATALOG", () => {
    it("should contain exactly 21 pets", () => {
      expect(PET_CATALOG).toHaveLength(21);
    });

    it("should correctly partition by factions", () => {
      const league = PET_CATALOG.filter((p) => p.faction === "league");
      const horde = PET_CATALOG.filter((p) => p.faction === "horde");
      const nature = PET_CATALOG.filter((p) => p.faction === "nature");
      const special = PET_CATALOG.filter((p) => p.faction === "special");

      expect(league).toHaveLength(7);
      expect(horde).toHaveLength(6);
      expect(nature).toHaveLength(7);
      expect(special).toHaveLength(1);
    });

    it("should have Pet 840018 (Mỏ Sắt) flagged as isNew with fallback avatar", () => {
      const ironbeak = getPetById(840018);
      expect(ironbeak).toBeDefined();
      expect(ironbeak?.nameVi).toBe("Mỏ Sắt");
      expect(ironbeak?.isNew).toBe(true);
      expect(ironbeak?.avatarPath).toContain("Head_pet_1904.webp");
    });
  });

  describe("PET_LEVEL_COSTS (SSoT Matrix 1–120)", () => {
    it("should contain costs for all 120 levels", () => {
      expect(PET_LEVEL_COSTS).toHaveLength(120);
      expect(PET_LEVEL_COSTS[0].level).toBe(1);
      expect(PET_LEVEL_COSTS[119].level).toBe(120);
    });

    it("should require 0 Essence for levels 1 to 90 and positive Essence for 91 to 120", () => {
      for (let lv = 1; lv <= 90; lv++) {
        expect(PET_LEVEL_COSTS[lv - 1].essenceCost).toBe(0);
      }
      for (let lv = 91; lv <= 120; lv++) {
        expect(PET_LEVEL_COSTS[lv - 1].essenceCost).toBeGreaterThan(0);
      }
    });

    it("should match game SSoT cumulative costs at key milestones", () => {
      const lv45 = PET_LEVEL_COSTS[44];
      const lv90 = PET_LEVEL_COSTS[89];
      const lv120 = PET_LEVEL_COSTS[119];

      expect(lv45.cumulativeFood).toBe(98550);
      expect(lv45.cumulativeEssence).toBe(0);

      expect(lv90.cumulativeFood).toBe(596600);
      expect(lv90.cumulativeEssence).toBe(0);

      expect(lv120.cumulativeFood).toBe(829700);
      expect(lv120.cumulativeEssence).toBe(33750);
    });
  });

  describe("calculatePetLevelUpgrade", () => {
    it("should compute exact cost from Lv.1 to Lv.45", () => {
      const result = calculatePetLevelUpgrade({
        fromLevel: 1,
        toLevel: 45,
        ownedFood: 0,
        ownedEssence: 0,
      });

      expect(result.requiredFood).toBe(98550);
      expect(result.requiredEssence).toBe(0);
      expect(result.missingFood).toBe(98550);
      expect(result.missingEssence).toBe(0);
      // Event points: floor(98550 / 100) * 960 = 985 * 960 = 945,600
      expect(result.garEventPoints).toBe(945600);
    });

    it("should compute exact cost from Lv.45 to Lv.90", () => {
      const result = calculatePetLevelUpgrade({
        fromLevel: 45,
        toLevel: 90,
        ownedFood: 0,
        ownedEssence: 0,
      });

      expect(result.requiredFood).toBe(498050);
      expect(result.requiredEssence).toBe(0);
    });

    it("should compute exact cost from Lv.90 to Lv.120", () => {
      const result = calculatePetLevelUpgrade({
        fromLevel: 90,
        toLevel: 120,
        ownedFood: 0,
        ownedEssence: 0,
      });

      expect(result.requiredFood).toBe(233100);
      expect(result.requiredEssence).toBe(33750);
      // Event points: floor(233100 / 100) * 960 + 33750 * 480 = 2237760 + 16200000 = 18437760
      expect(result.garEventPoints).toBe(18437760);
    });

    it("should compute total Lv.1 to Lv.120 correctly", () => {
      const result = calculatePetLevelUpgrade({
        fromLevel: 1,
        toLevel: 120,
        ownedFood: 0,
        ownedEssence: 0,
      });

      expect(result.requiredFood).toBe(829700);
      expect(result.requiredEssence).toBe(33750);
      expect(result.garEventPoints).toBe(24165120);
    });

    it("should subtract inventory properly and clamp missing to 0", () => {
      const result = calculatePetLevelUpgrade({
        fromLevel: 1,
        toLevel: 45,
        ownedFood: 100000,
        ownedEssence: 50,
      });

      expect(result.requiredFood).toBe(98550);
      expect(result.missingFood).toBe(0);
      expect(result.requiredEssence).toBe(0);
      expect(result.missingEssence).toBe(0);
    });

    it("should handle edge case when fromLevel >= toLevel", () => {
      const result = calculatePetLevelUpgrade({
        fromLevel: 60,
        toLevel: 60,
      });
      expect(result.requiredFood).toBe(0);
      expect(result.requiredEssence).toBe(0);
      expect(result.missingFood).toBe(0);
      expect(result.missingEssence).toBe(0);
    });

    it("should clamp out-of-bounds input levels", () => {
      const result = calculatePetLevelUpgrade({
        fromLevel: -10,
        toLevel: 200,
      });
      expect(result.fromLevel).toBe(1);
      expect(result.toLevel).toBe(120);
      expect(result.requiredFood).toBe(829700);
    });
  });

  describe("PET_BREAK_MILESTONES (SSoT Matrix Break 0–23)", () => {
    it("should have 24 entries (Break 0 to Break 23)", () => {
      expect(PET_BREAK_MILESTONES).toHaveLength(24);
      expect(PET_BREAK_MILESTONES[0].breakIndex).toBe(0);
      expect(PET_BREAK_MILESTONES[23].breakIndex).toBe(23);
    });

    it("should have correct inheritance percentages across key breakpoints", () => {
      expect(PET_BREAK_MILESTONES[0].inheritancePct).toBe(20.0);
      expect(PET_BREAK_MILESTONES[5].inheritancePct).toBe(36.0);
      expect(PET_BREAK_MILESTONES[11].inheritancePct).toBe(60.0);
      expect(PET_BREAK_MILESTONES[17].inheritancePct).toBe(84.0);
      expect(PET_BREAK_MILESTONES[22].inheritancePct).toBe(104.0);
      expect(PET_BREAK_MILESTONES[23].inheritancePct).toBe(108.0);
    });

    it("should match cumulative costs to reach Break 23 (Titan 5★)", () => {
      const maxBreak = PET_BREAK_MILESTONES[23];
      expect(maxBreak.cumulativeSameCopies).toBe(57);
      expect(maxBreak.cumulativeAnyFodder).toBe(211);
      expect(maxBreak.cumulativeEssence).toBe(31000);
    });
  });

  describe("calculatePetBreakthroughUpgrade", () => {
    it("should compute costs for Mythic base from Break 5 to Break 23", () => {
      const result = calculatePetBreakthroughUpgrade({
        fromBreak: 5,
        toBreak: 23,
      });

      expect(result.requiredSameCopies).toBe(57);
      expect(result.requiredAnyFodder).toBe(211);
      expect(result.requiredEssence).toBe(31000);
      expect(result.targetInheritancePct).toBe(108.0);
      expect(result.targetForm).toBe(4);
    });

    it("should compute costs from Break 5 (Base unlocked) to Break 16 (Leg 5★)", () => {
      const result = calculatePetBreakthroughUpgrade({
        fromBreak: 5,
        toBreak: 16,
      });

      expect(result.requiredSameCopies).toBe(18);
      expect(result.requiredAnyFodder).toBe(71);
      expect(result.requiredEssence).toBe(0);
      expect(result.targetInheritancePct).toBe(80.0);
      expect(result.targetForm).toBe(3);
    });

    it("should compute costs for Rare pet from Break 0 to Break 4", () => {
      const result = calculatePetBreakthroughUpgrade({
        fromBreak: 0,
        toBreak: 4,
      });

      expect(result.requiredSameCopies).toBe(3);
      expect(result.requiredAnyFodder).toBe(5);
      expect(result.requiredEssence).toBe(0);
      expect(result.targetInheritancePct).toBe(36.0);
      expect(result.targetForm).toBe(1);
    });

    it("should subtract inventory copies and clamp properly", () => {
      const result = calculatePetBreakthroughUpgrade({
        fromBreak: 5,
        toBreak: 16,
        ownedSame: 10,
        ownedAny: 50,
        ownedEssence: 5000,
      });

      expect(result.requiredSameCopies).toBe(18);
      expect(result.missingSameCopies).toBe(8);
      expect(result.requiredAnyFodder).toBe(71);
      expect(result.missingAnyFodder).toBe(21);
      expect(result.requiredEssence).toBe(0);
      expect(result.missingEssence).toBe(0);
    });

    it("should map form evolution correctly", () => {
      expect(calculatePetBreakthroughUpgrade({ fromBreak: 0, toBreak: 5 }).targetForm).toBe(1);
      expect(calculatePetBreakthroughUpgrade({ fromBreak: 0, toBreak: 9 }).targetForm).toBe(2);
      expect(calculatePetBreakthroughUpgrade({ fromBreak: 0, toBreak: 13 }).targetForm).toBe(3);
      expect(calculatePetBreakthroughUpgrade({ fromBreak: 0, toBreak: 23 }).targetForm).toBe(4);
    });
  });
});

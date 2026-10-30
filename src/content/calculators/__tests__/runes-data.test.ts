import { describe, expect, it } from "vitest";
import {
  RUNE_FACTION_PRIORITIES,
  RUNE_GAR_SCORING,
  RUNE_LEVEL_COSTS,
  RUNE_LEVELS,
  RUNE_SLOTS,
  calculateGarDay2RunePoints,
  calculateRuneBoardPlan,
  calculateSingleRuneUpgrade,
  convertOwnedRuneFodderToLv1Equivalent,
  getLv1CopiesForRuneLevel,
  getRuneLevelCostRow,
  getRuneSlotDefinition,
} from "../runes-data";

describe("6.1 Đá Cổ Ngữ — SSoT Data Engine (runes-data.ts)", () => {
  it("verifies ternary synthesis formula 3^(n-1) across all 12 Rune levels", () => {
    expect(RUNE_LEVELS).toHaveLength(12);
    expect(RUNE_LEVEL_COSTS).toHaveLength(12);

    const expectedCopies = [
      1, 3, 9, 27, 81, 243, 729, 2_187, 6_561, 19_683, 59_049, 177_147,
    ];

    RUNE_LEVELS.forEach((lv, index) => {
      const copies = getLv1CopiesForRuneLevel(lv);
      const row = getRuneLevelCostRow(lv);
      expect(copies).toBe(expectedCopies[index]);
      expect(row.lv1CopiesPerRune).toBe(expectedCopies[index]);
      expect(row.lv1CopiesSixSlots).toBe(expectedCopies[index] * 6);
    });
  });

  it("verifies cumulative Rune Dust and total March Size at key breakpoints (Lv.1, Lv.5, Lv.6, Lv.8, Lv.10, Lv.12)", () => {
    const lv1 = getRuneLevelCostRow(1);
    expect(lv1.cumulativeDustPerRune).toBe(0);
    expect(lv1.cumulativeDustSixSlots).toBe(0);
    expect(lv1.totalMarchSizeSixSlots).toBe(0);

    const lv5 = getRuneLevelCostRow(5);
    expect(lv5.lv1CopiesPerRune).toBe(81);
    expect(lv5.cumulativeDustPerRune).toBe(8_000);
    expect(lv5.cumulativeDustSixSlots).toBe(48_000);
    expect(lv5.totalMarchSizeSixSlots).toBe(110);
    expect(lv5.isBreakpoint).toBe(true);

    const lv6 = getRuneLevelCostRow(6);
    expect(lv6.lv1CopiesPerRune).toBe(243);
    expect(lv6.cumulativeDustPerRune).toBe(25_000);
    expect(lv6.cumulativeDustSixSlots).toBe(150_000);
    expect(lv6.totalMarchSizeSixSlots).toBe(150);
    expect(lv6.isBreakpoint).toBe(true);

    const lv8 = getRuneLevelCostRow(8);
    expect(lv8.lv1CopiesPerRune).toBe(2_187);
    expect(lv8.cumulativeDustPerRune).toBe(225_000);
    expect(lv8.cumulativeDustSixSlots).toBe(1_350_000);
    expect(lv8.totalMarchSizeSixSlots).toBe(250);
    expect(lv8.isBreakpoint).toBe(true);

    const lv10 = getRuneLevelCostRow(10);
    expect(lv10.lv1CopiesPerRune).toBe(19_683);
    expect(lv10.cumulativeDustPerRune).toBe(2_025_000);
    expect(lv10.cumulativeDustSixSlots).toBe(12_150_000);
    expect(lv10.totalMarchSizeSixSlots).toBe(360);

    const lv12 = getRuneLevelCostRow(12);
    expect(lv12.lv1CopiesPerRune).toBe(177_147);
    expect(lv12.cumulativeDustPerRune).toBe(18_225_000);
    expect(lv12.cumulativeDustSixSlots).toBe(109_350_000);
    expect(lv12.totalMarchSizeSixSlots).toBe(450);
    expect(lv12.isBreakpoint).toBe(true);
  });

  it("verifies percentage stat unlocks at Lv.5 (Slots 1, 2 & Slot 6 March Size) and Lv.8 (Slots 3, 4, 5)", () => {
    expect(RUNE_SLOTS).toHaveLength(6);

    const slot1 = getRuneSlotDefinition(1);
    const slot2 = getRuneSlotDefinition(2);
    const slot3 = getRuneSlotDefinition(3);
    const slot4 = getRuneSlotDefinition(4);
    const slot5 = getRuneSlotDefinition(5);
    const slot6 = getRuneSlotDefinition(6);

    expect(slot1.percentUnlockLevel).toBe(5);
    expect(slot1.levels[3].percentBonus).toBe(0);
    expect(slot1.levels[4].percentBonus).toBe(5);
    expect(slot1.levels[11].percentBonus).toBe(40);

    expect(slot2.percentUnlockLevel).toBe(5);
    expect(slot2.levels[4].percentBonus).toBe(5);
    expect(slot2.levels[11].percentBonus).toBe(40);

    expect(slot3.percentUnlockLevel).toBe(8);
    expect(slot3.levels[4].marchSizeBonus).toBe(30);
    expect(slot3.levels[4].percentBonus).toBe(0);
    expect(slot3.levels[7].percentBonus).toBe(5);
    expect(slot3.levels[11].percentBonus).toBe(30);

    expect(slot4.percentUnlockLevel).toBe(8);
    expect(slot4.levels[4].marchSizeBonus).toBe(30);
    expect(slot4.levels[7].percentBonus).toBe(5);
    expect(slot4.levels[11].percentBonus).toBe(30);

    expect(slot5.percentUnlockLevel).toBe(8);
    expect(slot5.levels[6].percentBonus).toBe(0);
    expect(slot5.levels[7].percentBonus).toBe(5);
    expect(slot5.levels[11].percentBonus).toBe(30);

    expect(slot6.percentUnlockLevel).toBe(5);
    expect(slot6.levels[4]).toMatchObject({
      level: 5,
      flatPrimary: 3_000,
      flatSecondary: 3_845,
      marchSizeBonus: 50,
    });
    expect(slot6.levels[11]).toMatchObject({
      level: 12,
      flatPrimary: 7_200,
      flatSecondary: 14_000,
      marchSizeBonus: 250,
    });
  });

  it("verifies faction slot priorities, fodder conversion, GAR Day 2 points (600 pts / 2,000 Dust), and single/board calculations", () => {
    expect(RUNE_FACTION_PRIORITIES).toHaveLength(3);
    expect(RUNE_GAR_SCORING.pointsPer2000DustOrStone).toBe(600);
    expect(RUNE_GAR_SCORING.dustBlockSize).toBe(2_000);

    const gar = calculateGarDay2RunePoints(8_000, 0, 0);
    expect(gar.dustPoints).toBe(2_400);
    expect(gar.totalPoints).toBe(2_400);

    const conv = convertOwnedRuneFodderToLv1Equivalent({
      lv1Count: 10,
      lv2Count: 2, // 6
      lv3Count: 1, // 9
      lv4Count: 1, // 27
      lv5Count: 1, // 81
      choiceChestLv1: 5, // 5
      choiceChestLv3: 2, // 18
      choiceChestLv5: 1, // 81
    });
    expect(conv.randomFodderLv1Equivalent).toBe(133);
    expect(conv.choiceChestLv1Equivalent).toBe(104);
    expect(conv.totalLv1Equivalent).toBe(237);

    const singleLv1ToLv8 = calculateSingleRuneUpgrade({
      slotIndex: 6,
      fromLevel: 1,
      toLevel: 8,
      ownedDust: 100_000,
      ownedMagicStones: 0,
      ownedArcaneCrystals: 0,
      fodder: {
        lv1Count: 500,
        lv2Count: 0,
        lv3Count: 0,
        lv4Count: 0,
        lv5Count: 0,
        choiceChestLv1: 0,
        choiceChestLv3: 0,
        choiceChestLv5: 0,
      },
    });
    expect(singleLv1ToLv8.requiredDust).toBe(225_000);
    expect(singleLv1ToLv8.deficitDust).toBe(125_000);
    expect(singleLv1ToLv8.requiredAdditionalLv1Copies).toBe(2_186);
    expect(singleLv1ToLv8.deficitLv1CopiesAfterChoiceChests).toBe(1_686);
    expect(singleLv1ToLv8.garDay2PointsFromRequiredDust).toBe(67_200);

    const boardLv1ToLv5 = calculateRuneBoardPlan({
      faction: "horde",
      slots: RUNE_SLOTS.map((s) => ({
        slotIndex: s.slotIndex,
        fromLevel: 1,
        toLevel: 5,
      })),
      ownedDust: 48_000,
      ownedMagicStones: 0,
      ownedArcaneCrystals: 0,
      fodder: {
        lv1Count: 480,
        lv2Count: 0,
        lv3Count: 0,
        lv4Count: 0,
        lv5Count: 0,
        choiceChestLv1: 0,
        choiceChestLv3: 0,
        choiceChestLv5: 0,
      },
    });
    expect(boardLv1ToLv5.totalRequiredDust).toBe(48_000);
    expect(boardLv1ToLv5.deficitDust).toBe(0);
    expect(boardLv1ToLv5.totalRequiredAdditionalLv1Copies).toBe(480);
  });
});

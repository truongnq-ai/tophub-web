import { describe, expect, it } from "vitest";
import {
  GLORY_MEDAL_MATERIAL,
  TROOP_SKIN_CATALOG,
  TROOP_SKIN_LEVEL_PRESETS,
  TROOP_SKIN_MAX_LEVEL,
  TROOP_SKIN_MIN_LEVEL,
  TROOP_SKIN_RARITIES,
  TROOP_SKIN_STEPS,
  TROOP_SKIN_TOTAL_COPIES_TO_MAX,
  TROOP_SKIN_UNIVERSAL_CHEST_ICON,
  calculateTroopSkinProgression,
  compareTroopSkinPoints,
  formatTroopSkinPointLabel,
  getCumulativeCopiesAtLevel,
  getCumulativeMedalsAtPoint,
  getCumulativeSublevelClicksAtPoint,
  getInterpolatedSkinStatsAtPoint,
  getMaxSublevelsForLevel,
  getSkinsByRarity,
  normalizeTroopSkinPoint,
} from "../troop-skins-data";

describe("3.1 Quân Trang — SSoT Data Engine (troop-skins-data.ts)", () => {
  it("defines 49 upgrade steps (Lv.1 ➔ Lv.50), 210 total sublevel clicks, 13 breakthrough copies, and 15 Troop Skins across 3 rarities", () => {
    expect(TROOP_SKIN_MIN_LEVEL).toBe(1);
    expect(TROOP_SKIN_MAX_LEVEL).toBe(50);
    expect(TROOP_SKIN_TOTAL_COPIES_TO_MAX).toBe(13);
    expect(TROOP_SKIN_STEPS).toHaveLength(49);
    expect(TROOP_SKIN_LEVEL_PRESETS).toEqual([1, 10, 20, 30, 40, 45, 50]);

    expect(GLORY_MEDAL_MATERIAL.gameId).toBeGreaterThan(0);
    expect(TROOP_SKIN_UNIVERSAL_CHEST_ICON).toContain(".webp");

    expect(TROOP_SKIN_CATALOG).toHaveLength(15);
    expect(getSkinsByRarity("legendary")).toHaveLength(8);
    expect(getSkinsByRarity("epic")).toHaveLength(5);
    expect(getSkinsByRarity("rare")).toHaveLength(2);

    expect(
      getCumulativeSublevelClicksAtPoint({ level: 50, sublevel: 0 })
    ).toBe(210);
  });

  it("calculates exact cumulative Glory Medals for Legendary (100%), Epic (50%), and Rare (25%) across all 6 star milestones", () => {
    expect(TROOP_SKIN_RARITIES.legendary.costMultiplier).toBe(1);
    expect(TROOP_SKIN_RARITIES.epic.costMultiplier).toBe(0.5);
    expect(TROOP_SKIN_RARITIES.rare.costMultiplier).toBe(0.25);

    expect(
      getCumulativeMedalsAtPoint({ level: 1, sublevel: 0 }, "legendary")
    ).toBe(0);

    // Milestone 1★ (Lv.10): 80,400 Legendary / 40,200 Epic / 20,100 Rare
    expect(
      getCumulativeMedalsAtPoint({ level: 10, sublevel: 0 }, "legendary")
    ).toBe(80_400);
    expect(
      getCumulativeMedalsAtPoint({ level: 10, sublevel: 0 }, "epic")
    ).toBe(40_200);
    expect(
      getCumulativeMedalsAtPoint({ level: 10, sublevel: 0 }, "rare")
    ).toBe(20_100);

    // Milestone 2★ (Lv.20): 948,400 Legendary / 474,200 Epic / 237,100 Rare
    expect(
      getCumulativeMedalsAtPoint({ level: 20, sublevel: 0 }, "legendary")
    ).toBe(948_400);
    expect(
      getCumulativeMedalsAtPoint({ level: 20, sublevel: 0 }, "epic")
    ).toBe(474_200);
    expect(
      getCumulativeMedalsAtPoint({ level: 20, sublevel: 0 }, "rare")
    ).toBe(237_100);

    // Milestone 3★ (Lv.30): 4,259,400 Legendary / 2,129,700 Epic / 1,064,850 Rare
    expect(
      getCumulativeMedalsAtPoint({ level: 30, sublevel: 0 }, "legendary")
    ).toBe(4_259_400);
    expect(
      getCumulativeMedalsAtPoint({ level: 30, sublevel: 0 }, "epic")
    ).toBe(2_129_700);
    expect(
      getCumulativeMedalsAtPoint({ level: 30, sublevel: 0 }, "rare")
    ).toBe(1_064_850);

    // Milestone 4★ (Lv.40): 10,960,400 Legendary / 5,480,200 Epic / 2,740,100 Rare
    expect(
      getCumulativeMedalsAtPoint({ level: 40, sublevel: 0 }, "legendary")
    ).toBe(10_960_400);
    expect(
      getCumulativeMedalsAtPoint({ level: 40, sublevel: 0 }, "epic")
    ).toBe(5_480_200);
    expect(
      getCumulativeMedalsAtPoint({ level: 40, sublevel: 0 }, "rare")
    ).toBe(2_740_100);

    // Milestone 5★ (Lv.45): 15,595,400 Legendary / 7,797,700 Epic / 3,898,850 Rare
    expect(
      getCumulativeMedalsAtPoint({ level: 45, sublevel: 0 }, "legendary")
    ).toBe(15_595_400);
    expect(
      getCumulativeMedalsAtPoint({ level: 45, sublevel: 0 }, "epic")
    ).toBe(7_797_700);
    expect(
      getCumulativeMedalsAtPoint({ level: 45, sublevel: 0 }, "rare")
    ).toBe(3_898_850);

    // Milestone 6★ MAX (Lv.50): 20,845,400 Legendary / 10,422,700 Epic / 5,211,350 Rare
    expect(
      getCumulativeMedalsAtPoint({ level: 50, sublevel: 0 }, "legendary")
    ).toBe(20_845_400);
    expect(
      getCumulativeMedalsAtPoint({ level: 50, sublevel: 0 }, "epic")
    ).toBe(10_422_700);
    expect(
      getCumulativeMedalsAtPoint({ level: 50, sublevel: 0 }, "rare")
    ).toBe(5_211_350);
  });

  it("tracks exact duplicate skin copies across the 6 star breakthrough milestones (1 ➔ 2 ➔ 4 ➔ 7 ➔ 10 ➔ 13 copies)", () => {
    expect(getCumulativeCopiesAtLevel(1)).toBe(0);
    expect(getCumulativeCopiesAtLevel(9)).toBe(0);
    expect(getCumulativeCopiesAtLevel(10)).toBe(1);
    expect(getCumulativeCopiesAtLevel(19)).toBe(1);
    expect(getCumulativeCopiesAtLevel(20)).toBe(2);
    expect(getCumulativeCopiesAtLevel(29)).toBe(2);
    expect(getCumulativeCopiesAtLevel(30)).toBe(4);
    expect(getCumulativeCopiesAtLevel(39)).toBe(4);
    expect(getCumulativeCopiesAtLevel(40)).toBe(7);
    expect(getCumulativeCopiesAtLevel(44)).toBe(7);
    expect(getCumulativeCopiesAtLevel(45)).toBe(10);
    expect(getCumulativeCopiesAtLevel(49)).toBe(10);
    expect(getCumulativeCopiesAtLevel(50)).toBe(13);
  });

  it("calculates sublevel partial progress, owned/equipped stat interpolation, shortfall/surplus, and reversed range handling", () => {
    expect(getMaxSublevelsForLevel(1)).toBe(1);
    expect(getMaxSublevelsForLevel(19)).toBe(2);
    expect(getMaxSublevelsForLevel(49)).toBe(10);
    expect(getMaxSublevelsForLevel(50)).toBe(0);

    const partialProgress = calculateTroopSkinProgression({
      rarity: "legendary",
      skinId: "heavy-cavalry",
      current: { level: 19, sublevel: 1 },
      target: { level: 20, sublevel: 0 },
      ownedMedals: 50_000,
      ownedCopies: 0,
    });

    expect(partialProgress.medalsNeeded).toBe(86_000);
    expect(partialProgress.medalsShortfall).toBe(36_000);
    expect(partialProgress.medalsRemainingAfter).toBe(0);
    expect(partialProgress.copiesNeeded).toBe(1);
    expect(partialProgress.copiesShortfall).toBe(1);
    expect(partialProgress.totalSublevelClicks).toBe(1);

    const reversedRange = calculateTroopSkinProgression({
      rarity: "legendary",
      skinId: "heavy-cavalry",
      current: { level: 25, sublevel: 2 },
      target: { level: 25, sublevel: 0 },
      ownedMedals: 300_000,
      ownedCopies: 5,
    });

    expect(reversedRange.isReversed).toBe(true);
    expect(reversedRange.medalsNeeded).toBe(220_000);
    expect(reversedRange.medalsShortfall).toBe(0);
    expect(reversedRange.medalsRemainingAfter).toBe(80_000);
    expect(
      compareTroopSkinPoints(
        { level: 25, sublevel: 2 },
        { level: 25, sublevel: 0 }
      )
    ).toBeGreaterThan(0);

    const maxStats = getInterpolatedSkinStatsAtPoint(
      { level: 50, sublevel: 0 },
      "legendary"
    );
    expect(maxStats.ownedAtkPct).toBe(14.38);
    expect(maxStats.ownedHpPct).toBe(21.46);
    expect(maxStats.equippedAtkPct).toBe(28);
    expect(maxStats.equippedHpPct).toBe(56);

    expect(normalizeTroopSkinPoint({ level: -5, sublevel: 99 })).toEqual({
      level: 1,
      sublevel: 0,
    });
    expect(normalizeTroopSkinPoint({ level: 99, sublevel: 5 })).toEqual({
      level: 50,
      sublevel: 0,
    });
    expect(formatTroopSkinPointLabel({ level: 25, sublevel: 2 }, "vi")).toBe(
      "Lv.25 (2/3 vạch)"
    );
    expect(formatTroopSkinPointLabel({ level: 25, sublevel: 2 }, "en")).toBe(
      "Lv.25 (2/3)"
    );
  });
});

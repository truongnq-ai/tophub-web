import { describe, expect, it } from "vitest";
import {
  RELIC_HALL_MAX_LEVEL,
  RELIC_HALL_MILESTONE_LEVELS,
  RELIC_HALL_TOTAL_SUB_STEPS,
  applyConstructionCostDiscount,
  calculateRelicHallUpgrade,
  getRelicHallBoostPermilleAtLevel,
  getRelicHallLevelMeta,
  getRelicHallState,
} from "../relic-hall-data";

describe("6.2 Sảnh Bí Bảo — SSoT Data Engine (relic-hall-data.ts)", () => {
  it("exposes all 250 display levels (2,193 total progress steps) and milestone presets from citybuilding_lvup_new (index = 155)", () => {
    expect(RELIC_HALL_MAX_LEVEL).toBe(250);
    expect(RELIC_HALL_TOTAL_SUB_STEPS).toBe(2193);
    expect(RELIC_HALL_MILESTONE_LEVELS).toEqual([1, 30, 60, 100, 150, 200, 250]);

    const lv1 = getRelicHallLevelMeta(1);
    expect(lv1.level).toBe(1);
    expect(lv1.subStepsCount).toBe(4);
    expect(lv1.baseStonePerSubStep).toBe(500);
    expect(lv1.baseCrystalPerSubStep).toBe(0);

    const lv60 = getRelicHallLevelMeta(60);
    expect(lv60.level).toBe(60);
    expect(lv60.subStepsCount).toBe(1);
    expect(lv60.baseStonePerSubStep).toBe(10_000);
    expect(lv60.baseCrystalPerSubStep).toBe(80);
    expect(lv60.isBreakthroughLevel).toBe(true);
  });

  it("matches Screenshot 1 (Lv.60 Sảnh Bí Bảo with 5% Construction Cost Reduction) down to the exact crystal, stone, and stat deltas", () => {
    expect(applyConstructionCostDiscount(80, 5)).toBe(76);
    expect(applyConstructionCostDiscount(10_000, 5)).toBe(9_500);

    const result = calculateRelicHallUpgrade({
      fromLevel: 60,
      fromSubStep: 0,
      toLevel: 61,
      toSubStep: 0,
      costReductionPercent: 5,
      ownedArcaneCrystals: 30,
      ownedMagicStones: 270_801,
    });

    expect(result.isInvalidRange).toBe(false);
    expect(result.subStepsTraversed).toBe(1);

    // Base vs discounted costs at Lv.60 -> Lv.61
    expect(result.baseArcaneCrystals).toBe(80);
    expect(result.baseMagicStones).toBe(10_000);
    expect(result.requiredArcaneCrystals).toBe(76);
    expect(result.requiredMagicStones).toBe(9_500);

    // Inventory comparison (Screenshot 1: 30/76 Arcane Crystals, 270,801/9,500 Magic Stones)
    expect(result.missingArcaneCrystals).toBe(46);
    expect(result.surplusArcaneCrystals).toBe(0);
    expect(result.missingMagicStones).toBe(0);
    expect(result.surplusMagicStones).toBe(261_301);

    // Stats at Lv.60 (0/1) -> Lv.61 (0/7):
    // Uy Thế: 24400 + 100 = 24500
    // Tăng Tỉ Lệ ATK/HP Bí Bảo: 191.4% + 5% = 196.4%
    // TL Chuyển Hóa Thuộc Tính Bí Bảo: 15.5% + 0.5% = 16.0%
    expect(result.fromState.fightforce).toBe(24_400);
    expect(result.toState.fightforce).toBe(24_500);
    expect(result.fightforceDelta).toBe(100);

    expect(result.fromState.atkHpBoostPermille).toBe(19_140);
    expect(result.fromState.atkHpBoostPercent).toBe(191.4);
    expect(result.toState.atkHpBoostPermille).toBe(19_640);
    expect(result.toState.atkHpBoostPercent).toBe(196.4);
    expect(result.atkHpBoostDeltaPercent).toBe(5);

    expect(result.fromState.conversionPermille).toBe(1_550);
    expect(result.fromState.conversionPercent).toBe(15.5);
    expect(result.toState.conversionPermille).toBe(1_600);
    expect(result.toState.conversionPercent).toBe(16);
    expect(result.conversionDeltaPercent).toBe(0.5);

    expect(getRelicHallBoostPermilleAtLevel(60)).toBe(19_140);
  });

  it("handles the Lv.141 split sub-step cost (step 0 = 45,000 stone, steps 1..19 = 43,000 stone) and per-step floor rounding accurately", () => {
    const lv141Full = calculateRelicHallUpgrade({
      fromLevel: 141,
      fromSubStep: 0,
      toLevel: 142,
      toSubStep: 0,
      costReductionPercent: 0,
      ownedArcaneCrystals: 0,
      ownedMagicStones: 0,
    });
    expect(lv141Full.subStepsTraversed).toBe(20);
    // 1 * 45,000 + 19 * 43,000 = 862,000
    expect(lv141Full.requiredMagicStones).toBe(862_000);
    expect(lv141Full.requiredArcaneCrystals).toBe(0);

    // Per-step floor rounding check: at Lv.1 (4 sub-steps of 500 Magic Stones),
    // with 3.3% discount: floor(500 * 0.967) = floor(483.5) = 483 per step -> 4 * 483 = 1,932
    // (whereas flooring the sum 2000 * 0.967 would be 1,934)
    const lv1Discounted = calculateRelicHallUpgrade({
      fromLevel: 1,
      fromSubStep: 0,
      toLevel: 2,
      toSubStep: 0,
      costReductionPercent: 3.3,
      ownedArcaneCrystals: 0,
      ownedMagicStones: 0,
    });
    expect(lv1Discounted.requiredMagicStones).toBe(1_932);
  });

  it("guards against invalid ranges (from > to) and caps cleanly at Lv.250 max step", () => {
    const invalid = calculateRelicHallUpgrade({
      fromLevel: 80,
      fromSubStep: 0,
      toLevel: 60,
      toSubStep: 0,
      costReductionPercent: 0,
      ownedArcaneCrystals: 100,
      ownedMagicStones: 50_000,
    });
    expect(invalid.isInvalidRange).toBe(true);
    expect(invalid.requiredArcaneCrystals).toBe(0);
    expect(invalid.requiredMagicStones).toBe(0);

    const maxState = getRelicHallState(250, 9);
    expect(maxState.fightforce).toBe(271_900);
    expect(maxState.atkHpBoostPermille).toBe(37_796);
    expect(maxState.conversionPermille).toBe(3_440);
  });
});

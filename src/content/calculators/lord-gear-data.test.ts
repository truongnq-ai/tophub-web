import { describe, expect, it } from "vitest";
import {
  LORD_GEAR_EXTENDED_MAX_LEVEL,
  LORD_GEAR_LEVEL_STEPS,
  LORD_GEAR_MASTERY_TIERS,
  LORD_GEAR_SACRED_TOME_STEPS,
  LORD_GEAR_SLOTS,
  LORD_GEAR_STANDARD_MAX_LEVEL,
  buildLordGearStaggeredCyclePlan,
  calculateLordGearSixSlotsPlan,
  calculateLordGearSlotUpgrade,
  evaluateLordGearMasteryResonance,
} from "./lord-gear-data";

describe("lord-gear-data (Meta.bytes lord_equipment & lord_equip_master)", () => {
  it("defines all 6 primary Lord Gear slots (3 Left Defense, 3 Right Offense) and 166 level steps", () => {
    expect(LORD_GEAR_SLOTS).toHaveLength(6);
    expect(LORD_GEAR_SLOTS.filter((s) => s.branch === "left_defense")).toHaveLength(3);
    expect(LORD_GEAR_SLOTS.filter((s) => s.branch === "right_offense")).toHaveLength(3);
    expect(LORD_GEAR_STANDARD_MAX_LEVEL).toBe(103);
    expect(LORD_GEAR_EXTENDED_MAX_LEVEL).toBe(166);
    // Lv.0 (unequipped) + Lv.1..166 = 167 entries
    expect(LORD_GEAR_LEVEL_STEPS).toHaveLength(167);
    expect(LORD_GEAR_SACRED_TOME_STEPS).toHaveLength(65);
    expect(LORD_GEAR_MASTERY_TIERS).toHaveLength(17);
  });

  it("matches exact in-game values for Crown upgrade from Lv.3 (Rare 0★) to Lv.4 (Rare 1★ Sub 0/2)", () => {
    const res = calculateLordGearSlotUpgrade("league_crown", 3, 4);
    expect(res.fromStep.fightForce).toBe(5600);
    expect(res.toStep.fightForce).toBe(7304);
    expect(res.fightForceDelta).toBe(1704);
    expect(res.cost.refinedMetal).toBe(6400);
    expect(res.cost.magicThread).toBe(60);
    expect(res.cost.orichalcum).toBe(0);
    expect(res.cost.dragonBlood).toBe(0);

    // Left defense branch stats at Lv.3 -> Lv.4
    expect(res.fromStats.factionHeroPct).toBeCloseTo(2.3, 2);
    expect(res.fromStats.factionSoldierPct).toBeCloseTo(6.35, 2);
    expect(res.fromStats.allSoldierPct).toBeCloseTo(0.8, 2);

    expect(res.toStats.factionHeroPct).toBeCloseTo(2.7, 2);
    expect(res.toStats.factionSoldierPct).toBeCloseTo(7.45, 2);
    expect(res.toStats.allSoldierPct).toBeCloseTo(0.95, 2);
  });

  it("evaluates 3-Piece and 6-Piece Mastery Resonance accurately for Max account snapshot [3,3,3,4,4,6]", () => {
    const mastery = evaluateLordGearMasteryResonance([3, 3, 3, 4, 4, 6]);
    expect(mastery.top3MinLevel).toBe(4);
    expect(mastery.all6MinLevel).toBe(3);

    expect(mastery.active3Piece?.requiredLevel).toBe(4);
    expect(mastery.active3Piece?.threePieceHeroHpPct).toBeCloseTo(8.0, 2);
    expect(mastery.active3Piece?.threePieceAllSoldierAtkPct).toBeCloseTo(2.4, 2);

    expect(mastery.active6Piece?.requiredLevel).toBe(3);
    expect(mastery.active6Piece?.sixPieceHeroAtkPct).toBeCloseTo(2.0, 2);
    expect(mastery.active6Piece?.sixPieceAllSoldierAtkPct).toBeCloseTo(0.8, 2);
    expect(mastery.active6Piece?.sixPieceAllSoldierHpPct).toBeCloseTo(4.0, 2);

    expect(mastery.next3Piece?.requiredLevel).toBe(6);
    expect(mastery.next6Piece?.requiredLevel).toBe(4);
  });

  it("calculates 6-slot upgrade plan and inventory sufficiency", () => {
    const plan = calculateLordGearSixSlotsPlan(
      {
        nature_shield: { fromLevel: 3, toLevel: 4 },
        league_crown: { fromLevel: 3, toLevel: 4 },
        horde_spear: { fromLevel: 4, toLevel: 4 },
        nature_totem: { fromLevel: 3, toLevel: 4 },
        league_ring: { fromLevel: 4, toLevel: 4 },
        horde_collar: { fromLevel: 6, toLevel: 6 },
      },
      {
        refinedMetal: 68140,
        magicThread: 1114,
        orichalcum: 0,
        dragonBlood: 0,
      },
    );

    expect(plan.totalCost.refinedMetal).toBe(19200);
    expect(plan.totalCost.magicThread).toBe(180);
    expect(plan.totalCost.orichalcum).toBe(0);
    expect(plan.isSufficient).toBe(true);
    expect(plan.afterMastery.active6Piece?.requiredLevel).toBe(4);
  });

  it("builds a 4-step staggered resonance plan prioritizing main faction and right offense branch", () => {
    const staggered = buildLordGearStaggeredCyclePlan(
      {
        nature_shield: 3,
        league_crown: 3,
        horde_spear: 4,
        nature_totem: 3,
        league_ring: 4,
        horde_collar: 6,
      },
      "horde",
    );

    expect(staggered.spearheadSlotIds).toHaveLength(3);
    expect(staggered.followUpSlotIds).toHaveLength(3);
    expect(staggered.spearheadSlotIds).toContain("horde_collar");
    expect(staggered.spearheadSlotIds).toContain("horde_spear");
    expect(staggered.steps).toHaveLength(4);
  });
});

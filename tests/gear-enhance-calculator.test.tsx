import React from "react";
import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import {
  ENHANCEMENT_MASTER_TIERS,
  GEAR_ENHANCE_LEVEL_STEPS,
  GEAR_ROLE_CONFIGS,
  GEAR_SLOT_ORDER,
  MAX_GEAR_ENHANCE_LEVEL,
  MIN_GEAR_ENHANCE_LEVEL,
  calculateGearEnhancement,
  clampGearEnhanceLevel,
  getCumulativeGearEnhanceCost,
  getStepGearEnhanceCost,
} from "../src/content/calculators/gear-enhance-data";
import { getCalculatorToolBySlug } from "../src/content/calculators/registry";
import { GearEnhanceLevelSelector } from "../src/components/calculators/gear-enhance-level-selector";
import { GearEnhanceCalculator } from "../src/components/calculators/gear-enhance-calculator";
import {
  VI_DIACRITIC_REGEX,
  countMicroTextOccurrences,
  findMicroTextElements,
  findMonoElementsWithVietnamese,
  getMaxBorderedContainerDepth,
  readSource,
} from "./utils/md3-audit";

describe("4.1 Cường Hóa Trang Bị — Suite 1: Quantitative SSoT Engine (Lv.0 ➔ Lv.40)", () => {
  it("defines 41 nodes (Lv.0..40) matching the exact TopHeroes Tables - Max ⚔️Gear formula", () => {
    expect(MIN_GEAR_ENHANCE_LEVEL).toBe(0);
    expect(MAX_GEAR_ENHANCE_LEVEL).toBe(40);
    expect(GEAR_ENHANCE_LEVEL_STEPS).toHaveLength(41);
    expect(GEAR_SLOT_ORDER).toEqual(["weapon", "boots", "helmet", "chest"]);
    expect(ENHANCEMENT_MASTER_TIERS).toHaveLength(5);

    expect(getStepGearEnhanceCost(0)).toEqual({ runes: 0, meat: 0 });
    expect(getStepGearEnhanceCost(1)).toEqual({ runes: 1_500, meat: 7_200 });
    expect(getStepGearEnhanceCost(4)).toEqual({ runes: 1_500, meat: 7_200 });
    expect(getStepGearEnhanceCost(5)).toEqual({ runes: 2_250, meat: 10_800 });
    expect(getStepGearEnhanceCost(9)).toEqual({ runes: 3_000, meat: 14_400 });
    expect(getStepGearEnhanceCost(13)).toEqual({ runes: 3_750, meat: 18_000 });
    expect(getStepGearEnhanceCost(17)).toEqual({ runes: 4_500, meat: 21_600 });
    expect(getStepGearEnhanceCost(21)).toEqual({ runes: 5_250, meat: 25_200 });
    expect(getStepGearEnhanceCost(25)).toEqual({ runes: 6_000, meat: 28_800 });
    expect(getStepGearEnhanceCost(29)).toEqual({ runes: 6_750, meat: 32_400 });
    expect(getStepGearEnhanceCost(33)).toEqual({ runes: 7_500, meat: 36_000 });
    expect(getStepGearEnhanceCost(37)).toEqual({ runes: 8_250, meat: 39_600 });
    expect(getStepGearEnhanceCost(40)).toEqual({ runes: 8_250, meat: 39_600 });

    // Cumulative milestones per 1 piece (Legendary / Mythic)
    expect(getCumulativeGearEnhanceCost(0)).toEqual({ runes: 0, meat: 0 });
    expect(getCumulativeGearEnhanceCost(10)).toEqual({
      runes: 21_000,
      meat: 100_800,
    });
    expect(getCumulativeGearEnhanceCost(20)).toEqual({
      runes: 60_000,
      meat: 288_000,
    });
    expect(getCumulativeGearEnhanceCost(30)).toEqual({
      runes: 118_500,
      meat: 568_800,
    });
    expect(getCumulativeGearEnhanceCost(40)).toEqual({
      runes: 195_000,
      meat: 936_000,
    });

    expect(clampGearEnhanceLevel(-5)).toBe(0);
    expect(clampGearEnhanceLevel(99)).toBe(40);
  });

  it("calculates exact costs across single_piece (×1), hero_set_4 (×4), and squad_24 (×24) scopes", () => {
    const singleMax = calculateGearEnhancement({
      rarity: "legendary",
      scopeMode: "single_piece",
      roleBranch: "dps",
      fromLevel: 0,
      toLevel: 40,
      ownedRunes: 50_000,
      ownedMeat: 200_000,
    });
    expect(singleMax.pieceMultiplier).toBe(1);
    expect(singleMax.requiredRunes).toBe(195_000);
    expect(singleMax.requiredMeat).toBe(936_000);
    expect(singleMax.missingRunes).toBe(145_000);
    expect(singleMax.missingMeat).toBe(736_000);
    expect(singleMax.currentMasterTier).toBe(0);
    expect(singleMax.targetMasterTier).toBe(40);

    const heroSet20To40 = calculateGearEnhancement({
      rarity: "mythic",
      scopeMode: "hero_set_4",
      roleBranch: "tank",
      fromLevel: 20,
      toLevel: 40,
      ownedRunes: 600_000,
      ownedMeat: 3_000_000,
    });
    expect(heroSet20To40.pieceMultiplier).toBe(4);
    expect(heroSet20To40.alreadyInvestedRunes).toBe(240_000);
    expect(heroSet20To40.targetCumulativeRunes).toBe(780_000);
    expect(heroSet20To40.requiredRunes).toBe(540_000);
    expect(heroSet20To40.requiredMeat).toBe(2_592_000);
    expect(heroSet20To40.missingRunes).toBe(0);
    expect(heroSet20To40.surplusRunes).toBe(60_000);
    expect(heroSet20To40.runeCompletionPercent).toBe(100);
    expect(heroSet20To40.currentMasterTier).toBe(20);
    expect(heroSet20To40.targetMasterTier).toBe(40);

    const squad24Max = calculateGearEnhancement({
      rarity: "legendary",
      scopeMode: "squad_24",
      roleBranch: "healer",
      fromLevel: 0,
      toLevel: 40,
    });
    expect(squad24Max.pieceMultiplier).toBe(24);
    expect(squad24Max.requiredRunes).toBe(4_680_000);
    expect(squad24Max.requiredMeat).toBe(22_464_000);
  });

  it("applies exact integer rounding for epic rarity (0.5×) without IEEE-754 float drift", () => {
    const epic0To20 = calculateGearEnhancement({
      rarity: "epic",
      scopeMode: "single_piece",
      roleBranch: "dps",
      fromLevel: 0,
      toLevel: 20,
    });
    expect(epic0To20.requiredRunes).toBe(30_000);
    expect(epic0To20.requiredMeat).toBe(144_000);
    expect(Number.isInteger(epic0To20.requiredRunes)).toBe(true);
    expect(Number.isInteger(epic0To20.requiredMeat)).toBe(true);
  });

  it("audits asymmetric 4-slot loadouts (custom_4_slots) and detects bottleneck slots for Enhancement Master", () => {
    const customAudit = calculateGearEnhancement({
      rarity: "legendary",
      scopeMode: "custom_4_slots",
      roleBranch: "dps",
      fromLevel: 10,
      toLevel: 20,
      customSlotLevels: {
        weapon: { fromLevel: 20, toLevel: 20 },
        boots: { fromLevel: 20, toLevel: 20 },
        helmet: { fromLevel: 12, toLevel: 20 },
        chest: { fromLevel: 10, toLevel: 20 },
      },
    });

    expect(customAudit.isInvalidRange).toBe(false);
    expect(customAudit.currentMinSlotLevel).toBe(10);
    expect(customAudit.targetMinSlotLevel).toBe(20);
    expect(customAudit.currentMasterTier).toBe(10);
    expect(customAudit.targetMasterTier).toBe(20);
    expect(customAudit.bottleneckSlots).toEqual(["chest", "helmet"]);
    // helmet: 12 -> 20 = 60,000 - 27,000 = 33,000; chest: 10 -> 20 = 60,000 - 21,000 = 39,000
    expect(customAudit.requiredRunes).toBe(72_000);
    expect(customAudit.requiredMeat).toBe(345_600);
    expect(customAudit.runesToNextMasterMilestone).toBe(72_000);
  });

  it("returns role-specific slot upgrade order (Tank: Helmet+Chest first vs DPS/Healer: Weapon+Boots first) and handles invalid ranges safely", () => {
    expect(GEAR_ROLE_CONFIGS.tank.slotUpgradeOrder).toEqual([
      "helmet",
      "chest",
      "weapon",
      "boots",
    ]);
    expect(GEAR_ROLE_CONFIGS.dps.slotUpgradeOrder).toEqual([
      "weapon",
      "boots",
      "helmet",
      "chest",
    ]);
    expect(GEAR_ROLE_CONFIGS.healer.slotUpgradeOrder).toEqual([
      "weapon",
      "boots",
      "helmet",
      "chest",
    ]);

    const zeroDiff = calculateGearEnhancement({
      rarity: "legendary",
      scopeMode: "single_piece",
      roleBranch: "dps",
      fromLevel: 20,
      toLevel: 20,
    });
    expect(zeroDiff.isInvalidRange).toBe(false);
    expect(zeroDiff.requiredRunes).toBe(0);
    expect(zeroDiff.runeCompletionPercent).toBe(100);
    expect(zeroDiff.meatCompletionPercent).toBe(100);

    const invalidSym = calculateGearEnhancement({
      rarity: "legendary",
      scopeMode: "single_piece",
      roleBranch: "dps",
      fromLevel: 30,
      toLevel: 20,
    });
    expect(invalidSym.isInvalidRange).toBe(true);
    expect(invalidSym.requiredRunes).toBe(0);
    expect(invalidSym.requiredMeat).toBe(0);

    const invalidCustom = calculateGearEnhancement({
      rarity: "legendary",
      scopeMode: "custom_4_slots",
      roleBranch: "tank",
      fromLevel: 0,
      toLevel: 20,
      customSlotLevels: {
        weapon: { fromLevel: 20, toLevel: 20 },
        boots: { fromLevel: 20, toLevel: 20 },
        helmet: { fromLevel: 25, toLevel: 20 },
        chest: { fromLevel: 10, toLevel: 20 },
      },
    });
    expect(invalidCustom.isInvalidRange).toBe(true);
    expect(invalidCustom.invalidSlotKeys).toEqual(["helmet"]);
    expect(invalidCustom.requiredRunes).toBe(0);
  });
});

describe("4.1 Cường Hóa Trang Bị — Suite 2: MD3 UI Component, Custom 4-Slots & Bilingual Purity", () => {
  const resolved = getCalculatorToolBySlug("hero-gear", "gear-enhance")!;

  const renderCalculator = (locale: "vi" | "en" = "vi") =>
    render(
      <GearEnhanceCalculator
        zone={resolved.zone}
        category={resolved.category}
        tool={resolved.tool}
        locale={locale}
      />
    );

  it("contains zero sub-12px micro-text classes in selector and calculator source files", () => {
    expect(
      countMicroTextOccurrences(
        readSource("src/components/calculators/gear-enhance-level-selector.tsx")
      )
    ).toBe(0);
    expect(
      countMicroTextOccurrences(
        readSource("src/components/calculators/gear-enhance-calculator.tsx")
      )
    ).toBe(0);
  });

  it("renders default 1 Hero (4 pieces) Lv.20 ➔ Lv.40 calculation (540,000 Runes + 2,592,000 Meat) and supports scope/role switching", () => {
    const { container } = renderCalculator("vi");

    expect(screen.getByTestId("calculator-tool-header")).toBeDefined();
    expect(
      screen.getByTestId("gear-enhance-total-runes").textContent
    ).toBe("540,000");
    expect(
      screen.getByTestId("gear-enhance-total-meat").textContent
    ).toBe("2,592,000");

    // Switch to Squad 24 pieces (Lv.20 -> Lv.40 = 540,000 * 6 = 3,240,000 Runes)
    fireEvent.click(screen.getByTestId("scope-squad_24-btn"));
    expect(
      screen.getByTestId("gear-enhance-total-runes").textContent
    ).toBe("3,240,000");

    // Switch to Single Piece (Lv.20 -> Lv.40 = 135,000 Runes)
    fireEvent.click(screen.getByTestId("scope-single_piece-btn"));
    expect(
      screen.getByTestId("gear-enhance-total-runes").textContent
    ).toBe("135,000");

    // Switch role to Tank and check slot priority badge
    fireEvent.click(screen.getByTestId("role-tank-btn"));
    expect(
      screen.getByTestId("role-priority-summary").textContent
    ).toMatch(/Mũ/i);

    // Switch to custom_4_slots mode
    fireEvent.click(screen.getByTestId("scope-custom_4_slots-btn"));
    expect(screen.getByTestId("custom-slot-helmet-from-minus")).toBeDefined();

    // Open breakdown table [i] and check MD3 containment depth <= 1
    fireEvent.click(screen.getByTestId("toggle-gear-enhance-breakdown-btn"));
    expect(screen.getByTestId("gear-enhance-breakdown-panel")).toBeDefined();

    expect(getMaxBorderedContainerDepth(container)).toBeLessThanOrEqual(1);
    expect(findMicroTextElements(container)).toEqual([]);
    expect(findMonoElementsWithVietnamese(container)).toEqual([]);
  });

  it("renders 100% pure English without any Vietnamese diacritics when locale='en' (including open breakdown table and custom 4 slots)", () => {
    const { container } = renderCalculator("en");

    fireEvent.click(screen.getByTestId("scope-custom_4_slots-btn"));
    fireEvent.click(screen.getByTestId("toggle-gear-enhance-breakdown-btn"));

    expect(getMaxBorderedContainerDepth(container)).toBeLessThanOrEqual(1);
    expect(findMicroTextElements(container)).toEqual([]);
    expect(container.textContent ?? "").not.toMatch(VI_DIACRITIC_REGEX);
  });

  it("renders GearEnhanceLevelSelector with 44px stepper buttons and milestone chips (+0, +10, +20, +30, +40)", () => {
    let currentLv = 10;
    render(
      <GearEnhanceLevelSelector
        idPrefix="test-from"
        title="Cấp Hiện Tại"
        level={currentLv}
        rarity="legendary"
        pieceMultiplier={4}
        locale="vi"
        onChangeLevel={(next) => {
          currentLv = next;
        }}
      />
    );

    const minusBtn = screen.getByTestId("test-from-level-minus-btn");
    const plusBtn = screen.getByTestId("test-from-level-plus-btn");
    expect(minusBtn.className).toContain("h-11");
    expect(plusBtn.className).toContain("w-11");

    fireEvent.click(plusBtn);
    expect(currentLv).toBe(11);

    fireEvent.click(screen.getByTestId("test-from-milestone-30-btn"));
    expect(currentLv).toBe(30);
  });
});

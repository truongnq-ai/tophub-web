import React from "react";
import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import viMessages from "../messages/vi.json";
import { CalculatorPlaceholderView } from "../src/components/calculators/calculator-placeholder-view";
import {
  SKIN_HONOR_LEVEL_PRESETS,
  SKIN_HONOR_MAX_LEVEL,
  SKIN_HONOR_MIN_LEVEL,
  SKIN_HONOR_TOTAL_COPIES_TO_MAX,
  calculateRosterStaircasePlan,
  calculateSkinHonorProgression,
  clampSkinHonorLevel,
} from "../src/content/calculators/skin-honor-data";
import { getCalculatorToolBySlug } from "../src/content/calculators/registry";
import { SkinHonorSelector } from "../src/components/calculators/skin-honor-selector";
import { SkinHonorCalculator } from "../src/components/calculators/skin-honor-calculator";
import {
  ALL_SIDE_BORDER_REGEX,
  VI_DIACRITIC_REGEX,
  countMicroTextOccurrences,
  findMicroTextElements,
  findMonoElementsWithVietnamese,
  getMaxBorderedContainerDepth,
  readSource,
} from "./utils/md3-audit";

describe("3.2 Vinh Dự Quân Trang (skin-honor-data) — SSoT Quantitative Engine", () => {
  it("matches exact pure Glory Medal costs for Honor Lv.0 -> Lv.150 across Legendary (7.5M), Epic (3.75M), and Rare (1.875M)", () => {
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

  it("handles duplicate copy +5 level integer step substitution in Tier 1 (1 copy/5 lv) and Tier 2 (2 copies/5 lv) including odd remainder and non-multiple-of-5 ranges", () => {
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

    const nonMultipleFive = calculateSkinHonorProgression({
      rarity: "legendary",
      currentHonorLevel: 3,
      targetHonorLevel: 100,
      ownedMedals: 0,
      ownedDuplicateCopies: 30,
      rosterCounts: { legendary: 1, epic: 0, rare: 0 },
    });
    expect(nonMultipleFive.copiesUsedForHonor).toBe(19);
    expect(nonMultipleFive.copiesUnusedRemainder).toBe(11);
    expect(nonMultipleFive.levelsCoveredByCopies).toBe(95);
    expect(nonMultipleFive.levelsCoveredByMedals).toBe(2);
    expect(nonMultipleFive.netMedalsNeeded).toBe(100_000);

    expect(clampSkinHonorLevel(-10)).toBe(0);
    expect(clampSkinHonorLevel(999)).toBe(150);
  });

  it("computes Global Roster Staircase Plan (Lv.10 ⭐ -> Lv.20 ⭐⭐ -> Lv.30 ⭐⭐⭐ -> Lv.50) with affordable/partial/locked status", () => {
    const plan = calculateRosterStaircasePlan(
      { legendary: 2, epic: 4, rare: 2 },
      1_300_000
    );

    expect(plan.recommendations.length).toBeGreaterThanOrEqual(6);
    expect(plan.recommendations[0].status).toBe("affordable");
    expect(plan.recommendations[1].status).toBe("affordable");
    expect(plan.recommendations[2].status).toBe("affordable");
    expect(plan.recommendations[3].status).toBe("partial");
    expect(plan.recommendations[3].affordableSkinCount).toBe(1);
    expect(plan.recommendations[4].status).toBe("locked");
  });
});

describe("3.2 Vinh Dự Quân Trang — v2.0 4-Zone Architecture, 2-Step Avatar Picker, Copy Deduction & Bilingual Purity", () => {
  const selection = getCalculatorToolBySlug("troops", "skin-honor")!;

  it("contains zero sub-12px classes and zero border-b/t or divide-y lines in skin-honor-selector.tsx and skin-honor-calculator.tsx", () => {
    const selectorSource = readSource(
      "src/components/calculators/skin-honor-selector.tsx"
    );
    const calcSource = readSource(
      "src/components/calculators/skin-honor-calculator.tsx"
    );
    expect(countMicroTextOccurrences(selectorSource)).toBe(0);
    expect(countMicroTextOccurrences(calcSource)).toBe(0);
    expect(selectorSource).not.toMatch(/\bborder-[bt]\b|\bdivide-y\b/);
    expect(calcSource).not.toMatch(/\bborder-[bt]\b|\bdivide-y\b/);
  });

  it("renders SkinHonorSelector with single-layer border containment (<= 1), range slider, and >=44px steppers", () => {
    const { container } = render(
      <SkinHonorSelector
        idPrefix="from"
        title="Vinh Dự Hiện Tại"
        rarity="legendary"
        honorLevel={25}
        locale="vi"
        onChangeHonorLevel={() => {}}
      />
    );

    const root = screen.getByTestId("from-skin-honor-selector");
    expect(getMaxBorderedContainerDepth(root)).toBe(1);
    expect(findMicroTextElements(container)).toEqual([]);
    expect(findMonoElementsWithVietnamese(container)).toEqual([]);

    expect(screen.getByTestId("from-honor-level-slider")).toBeDefined();
    expect(
      screen.getByTestId("from-honor-level-minus-btn").className
    ).toContain("h-11");
    expect(screen.getByTestId("from-honor-level-plus-btn").className).toContain(
      "h-11"
    );
  });

  it("renders SkinHonorCalculator across 4 v2.0 zones, deducts duplicate copies (+5 levels/step), supports 2-step Avatar Picker, and passes MD3 audit", () => {
    const { container } = render(
      <SkinHonorCalculator
        zone={selection.zone}
        category={selection.category}
        tool={selection.tool}
        locale="vi"
      />
    );

    expect(screen.getByTestId("calculator-tool-header").className).not.toMatch(
      ALL_SIDE_BORDER_REGEX
    );

    // Default: Legendary Honor Lv.0 -> Lv.150 = 7.5M Medals (0 copies owned)
    expect(screen.getByTestId("skin-honor-net-medals-value").textContent).toBe(
      "7.5M"
    );

    // Enter 10 duplicate copies -> saves 10 * 5 * 50,000 = 2.5M Medals -> net needed = 5M
    fireEvent.change(screen.getByTestId("skin-honor-owned-copies-input"), {
      target: { value: "10" },
    });
    expect(screen.getByTestId("skin-honor-net-medals-value").textContent).toBe(
      "5M"
    );
    expect(screen.getByTestId("skin-honor-copies-used-value").textContent).toBe(
      "10"
    );

    // Open 2-step Central Avatar Picker and switch rarity to Epic (50%) -> pure 3.75M minus 10 copies (50 levels * 25K = 1.25M) = 2.5M
    fireEvent.click(screen.getByTestId("skin-honor-central-avatar-btn"));
    fireEvent.click(screen.getByTestId("skin-honor-rarity-epic-btn"));
    expect(screen.getByTestId("skin-honor-net-medals-value").textContent).toBe(
      "2.5M"
    );
    fireEvent.click(screen.getByTestId("skin-honor-item-samurai-btn"));
    expect(screen.queryByTestId("skin-honor-avatar-picker-popover")).toBeNull();

    const root = screen.getByTestId("skin-honor-calculator");
    expect(getMaxBorderedContainerDepth(root)).toBeLessThanOrEqual(1);
    expect(findMicroTextElements(container)).toEqual([]);
    expect(findMonoElementsWithVietnamese(container)).toEqual([]);
  });

  it("enforces 100% pure English DOM when locale='en' (AC-CALC-05)", () => {
    const { container } = render(
      <SkinHonorCalculator
        zone={selection.zone}
        category={selection.category}
        tool={selection.tool}
        locale="en"
      />
    );
    fireEvent.click(screen.getByTestId("skin-honor-central-avatar-btn"));
    fireEvent.click(screen.getByTestId("skin-honor-info-trigger"));
    expect(container.textContent ?? "").not.toMatch(VI_DIACRITIC_REGEX);
  });

  it("marks skin-honor as ready in registry and mounts via CalculatorPlaceholderView with Breadcrumb and Prev/Next footer", () => {
    const freshSelection = getCalculatorToolBySlug("troops", "skin-honor")!;
    expect(freshSelection.tool.status).toBe("ready");

    render(
      <NextIntlClientProvider locale="vi" messages={viMessages}>
        <CalculatorPlaceholderView
          mode="tool"
          zone={freshSelection.zone}
          category={freshSelection.category}
          tool={freshSelection.tool}
        />
      </NextIntlClientProvider>
    );

    expect(screen.getByTestId("skin-honor-calculator")).toBeTruthy();
  });
});

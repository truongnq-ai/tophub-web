import React from "react";
import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import {
  RUNE_LEVEL_COSTS,
  RUNE_SLOTS,
  calculateRuneBoardPlan,
  calculateSingleRuneUpgrade,
  convertOwnedRuneFodderToLv1Equivalent,
  getLv1CopiesForRuneLevel,
} from "../src/content/calculators/runes-data";
import { getCalculatorToolBySlug } from "../src/content/calculators/registry";
import { RunesCalculator } from "../src/components/calculators/runes-calculator";
import {
  VI_DIACRITIC_REGEX,
  countMicroTextOccurrences,
  findMicroTextElements,
  findMonoElementsWithVietnamese,
  getMaxBorderedContainerDepth,
  readSource,
} from "./utils/md3-audit";

describe("6.1 Đá Cổ Ngữ — Suite 1: Quantitative SSoT Engine (Lv.1 ➔ Lv.12)", () => {
  it("verifies ternary synthesis 3^(n-1) and cumulative Rune Dust from Lv.1 to Lv.12", () => {
    expect(RUNE_LEVEL_COSTS).toHaveLength(12);
    expect(getLv1CopiesForRuneLevel(1)).toBe(1);
    expect(RUNE_LEVEL_COSTS[0].cumulativeDustPerRune).toBe(0);

    // Lv.5 Breakpoint #1
    const lv5 = RUNE_LEVEL_COSTS[4];
    expect(lv5.lv1CopiesPerRune).toBe(81);
    expect(lv5.lv1CopiesSixSlots).toBe(486);
    expect(lv5.cumulativeDustPerRune).toBe(8_000);
    expect(lv5.cumulativeDustSixSlots).toBe(48_000);
    expect(lv5.totalMarchSizeSixSlots).toBe(110);

    // Lv.8 Grand Breakpoint #2
    const lv8 = RUNE_LEVEL_COSTS[7];
    expect(lv8.lv1CopiesPerRune).toBe(2_187);
    expect(lv8.lv1CopiesSixSlots).toBe(13_122);
    expect(lv8.cumulativeDustPerRune).toBe(225_000);
    expect(lv8.cumulativeDustSixSlots).toBe(1_350_000);
    expect(lv8.totalMarchSizeSixSlots).toBe(250);

    // Lv.12 Max Cap
    const lv12 = RUNE_LEVEL_COSTS[11];
    expect(lv12.lv1CopiesPerRune).toBe(177_147);
    expect(lv12.lv1CopiesSixSlots).toBe(1_062_882);
    expect(lv12.cumulativeDustPerRune).toBe(18_225_000);
    expect(lv12.cumulativeDustSixSlots).toBe(109_350_000);
    expect(lv12.totalMarchSizeSixSlots).toBe(450);
  });

  it("verifies exact 6-slot stats, fodder conversion, Choice Chest warning, and GAR Day 2 points", () => {
    expect(RUNE_SLOTS[0].levels[4]).toMatchObject({
      level: 5,
      flatPrimary: 15_091,
      percentBonus: 5,
    });
    expect(RUNE_SLOTS[5].levels[11]).toMatchObject({
      level: 12,
      flatPrimary: 7_200,
      flatSecondary: 14_000,
      marchSizeBonus: 250,
    });

    const conv = convertOwnedRuneFodderToLv1Equivalent({
      lv1Count: 10,
      lv2Count: 2,
      lv3Count: 1,
      lv4Count: 1,
      lv5Count: 0,
      choiceChestLv1: 5,
      choiceChestLv3: 2,
      choiceChestLv5: 1,
    });
    expect(conv.randomFodderLv1Equivalent).toBe(52);
    expect(conv.choiceChestLv1Equivalent).toBe(104);
    expect(conv.totalLv1Equivalent).toBe(156);

    const earlyWarning = calculateSingleRuneUpgrade({
      slotIndex: 6,
      fromLevel: 1,
      toLevel: 3,
      ownedDust: 500,
      ownedMagicStones: 0,
      ownedArcaneCrystals: 0,
      fodder: {
        lv1Count: 0,
        lv2Count: 0,
        lv3Count: 0,
        lv4Count: 0,
        lv5Count: 0,
        choiceChestLv1: 3,
        choiceChestLv3: 0,
        choiceChestLv5: 0,
      },
    });
    expect(earlyWarning.choiceChestWarning).toBe(true);
    expect(earlyWarning.requiredAdditionalLv1Copies).toBe(8);
    expect(earlyWarning.requiredDust).toBe(800);

    const board = calculateRuneBoardPlan({
      faction: "horde",
      slots: RUNE_SLOTS.map((s) => ({
        slotIndex: s.slotIndex,
        fromLevel: 1,
        toLevel: 5,
      })),
      ownedDust: 20_000,
      ownedMagicStones: 4_000,
      ownedArcaneCrystals: 10,
      fodder: {
        lv1Count: 100,
        lv2Count: 0,
        lv3Count: 0,
        lv4Count: 0,
        lv5Count: 0,
        choiceChestLv1: 0,
        choiceChestLv3: 0,
        choiceChestLv5: 0,
      },
    });
    expect(board.totalRequiredAdditionalLv1Copies).toBe(480);
    expect(board.totalRequiredDust).toBe(48_000);
    expect(board.deficitDust).toBe(28_000);
    expect(board.garDay2PointsFromRequiredDust).toBe(14_400);
    expect(board.garDay2PointsFromOwnedVault).toBe(19_200);
  });
});

describe("6.1 Đá Cổ Ngữ — Suite 2: MD3 UI Component & Bilingual Purity Gate", () => {
  const resolved = getCalculatorToolBySlug("runes-relics", "runes")!;

  const renderCalculator = (locale: "vi" | "en" = "vi") =>
    render(
      <RunesCalculator
        zone={resolved.zone}
        category={resolved.category}
        tool={resolved.tool}
        locale={locale}
      />
    );

  it("contains zero sub-12px micro-text classes in runes-calculator.tsx", () => {
    expect(
      countMicroTextOccurrences(
        readSource("src/components/calculators/runes-calculator.tsx")
      )
    ).toBe(0);
  });

  it("renders v2.0 4-Zone Single-Rune Default (×1: Lv.1 ➔ Lv.5 = 8K Dust & 80 Lv.1 copies), 2-Step Avatar Picker, and passes MD3 DOM gates", () => {
    const { container } = renderCalculator("vi");

    expect(screen.getByTestId("calculator-tool-header")).toBeDefined();
    expect(screen.queryByTestId("scope-board6-btn")).toBeNull();
    expect(screen.queryByTestId("scope-single-btn")).toBeNull();
    expect(screen.getByTestId("runes-total-dust").textContent).toBe("8K");
    expect(screen.getByTestId("runes-total-copies").textContent).toBe("80");

    // Open 2-step Avatar Picker -> pick League -> pick Slot 2
    fireEvent.click(screen.getByTestId("runes-central-avatar-btn"));
    fireEvent.click(screen.getByTestId("runes-picker-faction-league"));
    fireEvent.click(screen.getByTestId("runes-picker-slot-2"));

    expect(getMaxBorderedContainerDepth(container)).toBeLessThanOrEqual(1);
    expect(findMicroTextElements(container)).toEqual([]);
    expect(findMonoElementsWithVietnamese(container)).toEqual([]);
  });

  it("renders 100% pure English without any Vietnamese diacritics when locale='en'", () => {
    const { container } = renderCalculator("en");

    fireEvent.click(screen.getByTestId("runes-central-avatar-btn"));
    fireEvent.click(screen.getByTestId("runes-picker-faction-nature"));
    fireEvent.click(screen.getByTestId("runes-picker-slot-1"));

    expect(getMaxBorderedContainerDepth(container)).toBeLessThanOrEqual(1);
    expect(findMicroTextElements(container)).toEqual([]);
    expect(findMonoElementsWithVietnamese(container)).toEqual([]);
    expect(container.textContent ?? "").not.toMatch(VI_DIACRITIC_REGEX);
  });
});

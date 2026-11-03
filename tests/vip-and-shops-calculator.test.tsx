import React from "react";
import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import viMessages from "../messages/vi.json";
import {
  GUILD_HONOR_FULL_AWAKENING_FLOOR,
  GUILD_HONOR_SHOP_ITEMS,
  GUILD_HONOR_WEEKLY_SINGLE_STONE_FLOOR,
  SEASON1_GLORY_COIN_FULL_AWAKENING_FLOOR,
  VIP_ATTRIBUTES,
  VIP_GOLD_BRICK_VND_PER_POINT,
  VIP_LEVEL_TABLE,
  VIP_STANDARD_MAX_LEVEL,
  calculateGuildHonorBudget,
  calculateVipProgression,
  getVipLevelFromPoints,
  sliderRatioToVipPoints,
  stepVipLevel,
  vipPointsToSliderRatio,
} from "../src/content/calculators/vip-and-shops-data";
import { getCalculatorToolBySlug } from "../src/content/calculators/registry";
import { VipAndShopsCalculator } from "../src/components/calculators/vip-and-shops-calculator";
import { CalculatorPlaceholderView } from "../src/components/calculators/calculator-placeholder-view";
import {
  VI_DIACRITIC_REGEX,
  countMicroTextOccurrences,
  findMicroTextElements,
  findMonoElementsWithVietnamese,
  getMaxBorderedContainerDepth,
  readSource,
} from "./utils/md3-audit";

describe("9.2 VIP Level — Game Cache SSoT Engine (Meta.bytes v1.0.42687 & Locale_vi.bytes)", () => {
  it("renames tool 9.2 to VIP Level in registry", () => {
    const selection = getCalculatorToolBySlug("events-vip", "vip-and-shops")!;
    expect(selection).not.toBeNull();
    expect(selection.tool.title.vi).toBe("9.2 VIP Level");
    expect(selection.tool.title.en).toBe("9.2 VIP Level");
    expect(selection.tool.fullTitle.vi).toBe("9.2 VIP Level");
    expect(selection.tool.fullTitle.en).toBe("9.2 VIP Level");
  });

  it("contains all 21 VIP levels (VIP 0 to VIP 20) with exact Meta.bytes points, vipLimit, and 34 attributes", () => {
    expect(VIP_LEVEL_TABLE).toHaveLength(21);
    expect(VIP_STANDARD_MAX_LEVEL).toBe(16);
    expect(VIP_ATTRIBUTES.length).toBe(34);

    // Points & vip_limit from Meta.bytes
    expect(VIP_LEVEL_TABLE[0].cumulativePoints).toBe(0);
    expect(VIP_LEVEL_TABLE[1].cumulativePoints).toBe(6);
    expect(VIP_LEVEL_TABLE[4].cumulativePoints).toBe(300);
    expect(VIP_LEVEL_TABLE[6].cumulativePoints).toBe(1_000);
    expect(VIP_LEVEL_TABLE[8].cumulativePoints).toBe(6_000);
    expect(VIP_LEVEL_TABLE[10].cumulativePoints).toBe(30_000);
    expect(VIP_LEVEL_TABLE[15].cumulativePoints).toBe(200_000);
    expect(VIP_LEVEL_TABLE[16].cumulativePoints).toBe(300_000);
    expect(VIP_LEVEL_TABLE[16].vipLimit).toBe(0);
    expect(VIP_LEVEL_TABLE[17].cumulativePoints).toBe(600_000);
    expect(VIP_LEVEL_TABLE[17].vipLimit).toBe(15);
    expect(VIP_LEVEL_TABLE[20].cumulativePoints).toBe(3_000_000);
    expect(VIP_LEVEL_TABLE[20].vipLimit).toBe(18);

    // Real Meta.bytes attributes verification:
    // VIP 1: 1014 (Stone +3.5%), 1012 (Wood +3.5%), 1052 (Load +3.5%), 1001 (Gather +3.5%), 1094 (Ruby Guard +2)
    expect(VIP_LEVEL_TABLE[1].effects[1014]).toBe(350);
    expect(VIP_LEVEL_TABLE[1].effects[1094]).toBe(2);
    expect(VIP_LEVEL_TABLE[1].effects[1034]).toBeUndefined(); // Build speed NOT at VIP 1

    // VIP 5 unlocks Build Speed (1034 = 500 -> +5%) and PvE March Speed (1002 = 500 -> +5%)
    expect(VIP_LEVEL_TABLE[5].effects[1034]).toBe(500);
    expect(VIP_LEVEL_TABLE[5].effects[1002]).toBe(500);

    // VIP 7 unlocks Tech Research Speed (1033 = 200 -> +2%) and Auto-Translate (1178 = 1)
    expect(VIP_LEVEL_TABLE[7].effects[1033]).toBe(200);
    expect(VIP_LEVEL_TABLE[7].effects[1178]).toBe(1);

    // VIP 8 unlocks All Soldier HP +5% (10104 = 500)
    expect(VIP_LEVEL_TABLE[8].effects[10104]).toBe(500);

    // Daily Free Chest (vip_free): VIP 7 -> 1 Gold Shard, VIP 10 -> 2, VIP 13 -> 3, VIP 16 -> 4
    expect(VIP_LEVEL_TABLE[7].dailyFreeItems[0].quantity).toBe(1);
    expect(VIP_LEVEL_TABLE[7].dailyFreeItems[0].gameId).toBe(220005);
    expect(VIP_LEVEL_TABLE[10].dailyFreeItems[0].quantity).toBe(2);
    expect(VIP_LEVEL_TABLE[13].dailyFreeItems[0].quantity).toBe(3);
    expect(VIP_LEVEL_TABLE[16].dailyFreeItems[0].quantity).toBe(4);
    expect(VIP_LEVEL_TABLE[20].dailyFreeItems[0].quantity).toBe(4);
  });

  it("maps piecewise-linear slider ratio <-> continuous VIP points accurately", () => {
    // At VIP 8 (6,000 pts) on a 0..16 bar, ratio is 8 / 16 = 0.5
    expect(vipPointsToSliderRatio(6_000, 16)).toBeCloseTo(8 / 16, 5);
    expect(sliderRatioToVipPoints(8 / 16, 16)).toBe(6_000);

    // Halfway between VIP 8 (6,000) and VIP 9 (10,000) -> 8,000 pts -> ratio = 8.5 / 16
    expect(sliderRatioToVipPoints(8.5 / 16, 16)).toBe(8_000);
    expect(vipPointsToSliderRatio(8_000, 16)).toBeCloseTo(8.5 / 16, 5);
    expect(getVipLevelFromPoints(8_000)).toBe(8);

    // Stepping VIP levels from odd points (8,000 pts -> between VIP 8 and VIP 9):
    // Step down (-1 Lv) snaps to base of current level (VIP 8 = 6,000 pts)
    expect(stepVipLevel(8_000, -1, 16)).toBe(6_000);
    // Step down again from exact VIP 8 (6,000 pts) goes to VIP 7 (3,000 pts)
    expect(stepVipLevel(6_000, -1, 16)).toBe(3_000);
    // Step up (+1 Lv) from 8,000 pts snaps to VIP 9 (10,000 pts)
    expect(stepVipLevel(8_000, 1, 16)).toBe(10_000);
  });

  it("calculates continuous VIP point progression, USD, and regional Gold Bricks (VND for vi)", () => {
    expect(VIP_GOLD_BRICK_VND_PER_POINT).toBe(4_000);

    // Default VIP 8 (6,000 pts) -> VIP 10 (30,000 pts)
    const res = calculateVipProgression({
      fromPoints: 6_000,
      toPoints: 30_000,
      locale: "vi",
    });

    expect(res.fromVip.level).toBe(8);
    expect(res.toVip.level).toBe(10);
    expect(res.pointsNeeded).toBe(24_000);
    expect(res.equivalentUsdNeeded).toBe(4_000);
    // 24,000 VIP pts * 4,000 VND/pt = 96,000,000 VND Gold Bricks
    expect(res.equivalentGoldBrick.amount).toBe(96_000_000);
    expect(res.equivalentGoldBrick.currencyCode).toBe("VND");
    expect(res.newlyUnlockedLevels).toHaveLength(2);

    // Odd-point calculation: 7,500 pts (VIP 8) -> 10,000 pts (VIP 9) = 2,500 pts needed
    const oddRes = calculateVipProgression({
      fromPoints: 7_500,
      toPoints: 10_000,
      locale: "vi",
    });
    expect(oddRes.pointsNeeded).toBe(2_500);
    expect(oddRes.equivalentUsdNeeded).toBeCloseTo(416.67, 2);
    expect(oddRes.equivalentGoldBrick.amount).toBe(10_000_000);
  });

  it("preserves backward-compatible Guild Honor exports in vip-and-shops-data.ts", () => {
    expect(GUILD_HONOR_FULL_AWAKENING_FLOOR).toBe(360_000);
    expect(GUILD_HONOR_WEEKLY_SINGLE_STONE_FLOOR).toBe(40_000);
    expect(SEASON1_GLORY_COIN_FULL_AWAKENING_FLOOR).toBe(54_000);
    expect(GUILD_HONOR_SHOP_ITEMS.length).toBeGreaterThan(0);

    const safeRes = calculateGuildHonorBudget({
      currencyEra: "pre_season_honor",
      currentHonor: 350_000,
      weeklyIncome: 50_000,
      safetyFloorMode: "full_awakening_9_stones",
      factionPlanId: "horde",
      ownedSoulStones: 3,
      cartQuantities: { soul_stone_weekly: 1 },
    });
    expect(safeRes.healthStatus).toBe("SAFE_ABOVE_FULL_FLOOR");
  });
});

describe("9.2 VIP Level — Full-Width Dual-Node Bar, Zone 4 Resources & MD3 Compliance", () => {
  const selection = getCalculatorToolBySlug("events-vip", "vip-and-shops")!;

  it("mounts via CalculatorPlaceholderView with VIP Level header", () => {
    expect(selection.tool.status).toBe("ready");
    render(
      <NextIntlClientProvider locale="vi" messages={viMessages}>
        <CalculatorPlaceholderView
          mode="tool"
          zone={selection.zone}
          category={selection.category}
          tool={selection.tool}
        />
      </NextIntlClientProvider>
    );
    expect(screen.getByTestId("vip-and-shops-calculator")).toBeTruthy();
  });

  it("renders full-width dual-node VIP bar (Level 1–16), +/- controls at both ends, and 3 core Zone 4 resource cards", () => {
    render(
      <VipAndShopsCalculator
        zone={selection.zone}
        category={selection.category}
        tool={selection.tool}
        locale="vi"
      />
    );

    // Removed sections check
    expect(screen.queryByTestId("tab-btn-honor-shop")).toBeNull();
    expect(screen.queryByTestId("vip-strategic-breakpoints")).toBeNull();

    // Full-width dual-node VIP bar & Level 1..16 ticks
    expect(screen.getByTestId("vip-dual-range-bar")).toBeTruthy();
    expect(screen.getByTestId("vip-slider-thumb-from")).toBeTruthy();
    expect(screen.getByTestId("vip-slider-thumb-to")).toBeTruthy();
    expect(screen.getByTestId("vip-tick-1")).toBeTruthy();
    expect(screen.getByTestId("vip-tick-16")).toBeTruthy();

    // Default VIP 8 (6,000) -> VIP 10 (30,000) requires 24,000 VIP Points, $4,000 USD, 96,000,000 VND Gold Bricks
    expect(screen.getByTestId("vip-points-needed-value").textContent).toContain(
      "24"
    );
    expect(screen.getByTestId("vip-usd-needed-value").textContent).toContain(
      "4"
    );
    expect(
      screen.getByTestId("vip-goldbrick-needed-value").textContent
    ).toContain("96");

    // Test Left-end [+ Điểm] button (increments current VIP points by 1 -> 6,001, so pointsNeeded = 23,999)
    fireEvent.click(screen.getByTestId("vip-from-points-plus-btn"));
    expect(
      (screen.getByTestId("vip-from-points-input") as HTMLInputElement).value
    ).toBe("6001");

    // Test Right-end [+ Lv] button (increments target VIP level from VIP 10 -> VIP 11 = 50,000 pts)
    fireEvent.click(screen.getByTestId("vip-to-level-plus-btn"));
    expect(
      (screen.getByTestId("vip-to-points-input") as HTMLInputElement).value
    ).toBe("50000");
  });

  it("enforces MD3 Zero Sub-12px Policy, Single-Layer Containment, and English bilingual purity", () => {
    const source = readSource(
      "src/components/calculators/vip-and-shops-calculator.tsx"
    );
    expect(countMicroTextOccurrences(source)).toBe(0);

    const { container } = render(
      <VipAndShopsCalculator
        zone={selection.zone}
        category={selection.category}
        tool={selection.tool}
        locale="en"
      />
    );

    expect(findMicroTextElements(container)).toHaveLength(0);
    expect(getMaxBorderedContainerDepth(container)).toBeLessThanOrEqual(1);
    expect(findMonoElementsWithVietnamese(container)).toHaveLength(0);

    const allText = container.textContent ?? "";
    expect(VI_DIACRITIC_REGEX.test(allText)).toBe(false);
  });
});

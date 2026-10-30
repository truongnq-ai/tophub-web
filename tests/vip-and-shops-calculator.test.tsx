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
  VIP_LEVEL_TABLE,
  calculateGuildHonorBudget,
  calculateVipProgression,
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

describe("9.2 Đặc Quyền VIP & Tiệm — Quantitative SSoT Engine", () => {
  it("contains all 21 VIP levels (VIP 0 to VIP 20) matching SSoT points and USD costs", () => {
    expect(VIP_LEVEL_TABLE).toHaveLength(21);
    expect(VIP_LEVEL_TABLE[0].cumulativePoints).toBe(0);
    expect(VIP_LEVEL_TABLE[4].cumulativePoints).toBe(300);
    expect(VIP_LEVEL_TABLE[6].cumulativePoints).toBe(1_000);
    expect(VIP_LEVEL_TABLE[8].cumulativePoints).toBe(6_000);
    expect(VIP_LEVEL_TABLE[10].cumulativePoints).toBe(30_000);
    expect(VIP_LEVEL_TABLE[15].cumulativePoints).toBe(200_000);
    expect(VIP_LEVEL_TABLE[20].cumulativePoints).toBe(3_000_000);
    expect(VIP_LEVEL_TABLE[20].cumulativeUsd).toBe(500_000);

    for (const item of GUILD_HONOR_SHOP_ITEMS) {
      expect(item.iconPath.endsWith(".webp")).toBe(true);
    }
  });

  it("calculates VIP 8 -> VIP 10 progression accurately matching registry exampleCase", () => {
    const res = calculateVipProgression({
      fromLevel: 8,
      toLevel: 10,
    });

    expect(res.pointsNeeded).toBe(24_000);
    expect(res.equivalentUsdNeeded).toBe(4_000);
    expect(res.equivalentDiamondsNeeded).toBe(24_000);
    expect(res.freeGuildShopWeeksNeeded).toBe(24);
    expect(res.newlyUnlockedLevels).toHaveLength(2);
  });

  it("enforces the 360,000 Guild Honor Freeze Floor (9 Soul Stones) and 54,000 Season 1 Glory Coin Floor", () => {
    expect(GUILD_HONOR_FULL_AWAKENING_FLOOR).toBe(360_000);
    expect(GUILD_HONOR_WEEKLY_SINGLE_STONE_FLOOR).toBe(40_000);
    expect(SEASON1_GLORY_COIN_FULL_AWAKENING_FLOOR).toBe(54_000);

    // Case 1: 400,000 Honor total, buying 1 Soul Stone (40,000) -> 360,000 remaining -> SAFE_ABOVE_FULL_FLOOR
    const safeRes = calculateGuildHonorBudget({
      currencyEra: "pre_season_honor",
      currentHonor: 350_000,
      weeklyIncome: 50_000,
      safetyFloorMode: "full_awakening_9_stones",
      factionPlanId: "horde",
      ownedSoulStones: 3,
      cartQuantities: {
        soul_stone_weekly: 1,
      },
    });
    expect(safeRes.totalAvailableHonor).toBe(400_000);
    expect(safeRes.totalCartCost).toBe(40_000);
    expect(safeRes.remainingAfterCart).toBe(360_000);
    expect(safeRes.healthStatus).toBe("SAFE_ABOVE_FULL_FLOOR");
    expect(safeRes.remainingSoulStonesForPlan).toBe(6);

    // Case 2: Also buying 5 Legendary Shards (15,000) -> 345,000 remaining -> WARN_BELOW_FULL_FLOOR
    const warnRes = calculateGuildHonorBudget({
      currencyEra: "pre_season_honor",
      currentHonor: 350_000,
      weeklyIncome: 50_000,
      safetyFloorMode: "full_awakening_9_stones",
      factionPlanId: "horde",
      ownedSoulStones: 3,
      cartQuantities: {
        soul_stone_weekly: 1,
        legendary_hero_shard_honor: 5,
      },
    });
    expect(warnRes.remainingAfterCart).toBe(345_000);
    expect(warnRes.healthStatus).toBe("WARN_BELOW_FULL_FLOOR");

    // Case 3: Season 1 Glory Coins (60,000 total, 1 Soul Stone = 6,000 -> 54,000 remaining -> SAFE)
    const s1Res = calculateGuildHonorBudget({
      currencyEra: "season1_glory_coin",
      currentHonor: 50_000,
      weeklyIncome: 10_000,
      safetyFloorMode: "full_awakening_9_stones",
      factionPlanId: "nature",
      ownedSoulStones: 8,
      cartQuantities: {
        soul_stone_weekly: 1,
      },
    });
    expect(s1Res.totalCartCost).toBe(6_000);
    expect(s1Res.remainingAfterCart).toBe(54_000);
    expect(s1Res.healthStatus).toBe("SAFE_ABOVE_FULL_FLOOR");
    expect(s1Res.remainingSoulStonesForPlan).toBe(10);
  });

  it("detects the 72,000 Honor / 12,000 S1 Coin Universal Legendary Troop Skin trap", () => {
    const trapRes = calculateGuildHonorBudget({
      currencyEra: "pre_season_honor",
      currentHonor: 500_000,
      weeklyIncome: 50_000,
      safetyFloorMode: "full_awakening_9_stones",
      factionPlanId: "horde",
      ownedSoulStones: 0,
      cartQuantities: {
        soul_stone_weekly: 1,
        universal_legendary_troop_skin_trap: 1,
      },
    });
    expect(trapRes.hasTroopSkinTrapInCart).toBe(true);
    expect(trapRes.totalCartCost).toBe(112_000);
  });
});

describe("9.2 Đặc Quyền VIP & Tiệm — UI, MD3 & Bilingual Integration", () => {
  const selection = getCalculatorToolBySlug("events-vip", "vip-and-shops")!;

  it("marks vip-and-shops as ready in registry and mounts via CalculatorPlaceholderView", () => {
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

  it("renders VIP 8 -> VIP 10 default progression and switches to Guild Honor Shop Budget Planner", () => {
    render(
      <VipAndShopsCalculator
        zone={selection.zone}
        category={selection.category}
        tool={selection.tool}
        locale="vi"
      />
    );

    // Default VIP 8 -> VIP 10 requires 24K VIP Points
    expect(screen.getByTestId("vip-points-needed-value").textContent).toBe(
      "24K"
    );

    // Switch to Guild Honor Shop tab
    fireEvent.click(screen.getByTestId("tab-btn-honor-shop"));
    expect(screen.getByTestId("honor-budget-audit-card")).toBeTruthy();
    expect(screen.getByTestId("honor-remaining-after-cart-value").textContent).toBe(
      "405K"
    );
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

    fireEvent.click(screen.getByTestId("tab-btn-honor-shop"));
    expect(getMaxBorderedContainerDepth(container)).toBeLessThanOrEqual(1);
    expect(findMonoElementsWithVietnamese(container)).toHaveLength(0);

    const allText = container.textContent ?? "";
    expect(VI_DIACRITIC_REGEX.test(allText)).toBe(false);
  });
});

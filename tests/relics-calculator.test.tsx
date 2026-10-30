import React from "react";
import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import {
  RELIC_CATALOG,
  RELIC_FACTION_SETS,
  RELIC_RARITY_TABLES,
  calculateRelicShardsBetweenStates,
  calculateRelicStarUpgrade,
  calculateRelicTrioPlan,
  calculateSingleRelicUpgrade,
  evaluateStarRatingSuppression,
  getInvestedRelicShardsAtState,
} from "../src/content/calculators/relics-data";
import { getCalculatorToolBySlug } from "../src/content/calculators/registry";
import { RelicsCalculator } from "../src/components/calculators/relics-calculator";
import {
  VI_DIACRITIC_REGEX,
  countMicroTextOccurrences,
  findMicroTextElements,
  findMonoElementsWithVietnamese,
  getMaxBorderedContainerDepth,
  readSource,
} from "./utils/md3-audit";

describe("6.3 Nâng sao Bí Bảo — Suite 1: Quantitative SSoT Engine (0★ ➔ 20★ & Star Suppression)", () => {
  it("verifies active version=1 20-star cumulative shards and tier totals for Rare (4,860), Epic (3,150), and Legendary (1,800)", () => {
    expect(RELIC_CATALOG).toHaveLength(29);
    expect(RELIC_RARITY_TABLES.rare.maxTotalShards).toBe(4_860);
    expect(RELIC_RARITY_TABLES.rare.tierTotals).toEqual([150, 460, 1_850, 2_400]);

    expect(RELIC_RARITY_TABLES.epic.maxTotalShards).toBe(3_150);
    expect(RELIC_RARITY_TABLES.epic.tierTotals).toEqual([150, 400, 1_300, 1_300]);

    expect(RELIC_RARITY_TABLES.legendary.maxTotalShards).toBe(1_800);
    expect(RELIC_RARITY_TABLES.legendary.tierTotals).toEqual([130, 360, 610, 700]);
    expect(RELIC_RARITY_TABLES.legendary.stars[4].cumulativeShards).toBe(130);
    expect(RELIC_RARITY_TABLES.legendary.stars[7].cumulativeShards).toBe(330);
    expect(RELIC_RARITY_TABLES.legendary.stars[9].cumulativeShards).toBe(490);
    expect(RELIC_RARITY_TABLES.legendary.stars[14].cumulativeShards).toBe(1_100);
    expect(RELIC_RARITY_TABLES.legendary.stars[19].cumulativeShards).toBe(1_800);
  });

  it("calculates exact petal (0..100) shard investment, Relic Hall effective stats, and Star Suppression", () => {
    expect(getInvestedRelicShardsAtState("legendary", 5, 2)).toBe(154);
    expect(
      calculateRelicShardsBetweenStates("legendary", 5, 2, 10, 0)
    ).toBe(336);

    const screenshot4 = calculateRelicStarUpgrade({
      relicId: 150001,
      fromPetalIndex: 15,
      toPetalIndex: 16,
      relicHallLevel: 60,
      includeUnlockCost: false,
      ownedSpecificShards: 7,
      ownedUniversalShards: 23,
    });
    expect(screenshot4.fromState.effectiveAtk).toBe(9684);
    expect(screenshot4.toState.effectiveAtk).toBe(10151);
    expect(screenshot4.fromState.effectiveHp).toBe(65650);
    expect(screenshot4.toState.effectiveHp).toBe(68750);
    expect(screenshot4.totalRequiredShards).toBe(8);
    expect(screenshot4.specificShardsUsed).toBe(7);
    expect(screenshot4.universalShardsUsed).toBe(1);

    const win = evaluateStarRatingSuppression(25, 24, false);
    expect(win.status).toBe("suppressing_enemy");
    expect(win.starDelta).toBe(1);
    expect(win.enemyPenaltyPercent).toBe(-50);

    expect(RELIC_FACTION_SETS).toHaveLength(3);

    const single = calculateSingleRelicUpgrade({
      rarity: "legendary",
      fromStar: 0,
      fromSubStep: 0,
      toStar: 8,
      toSubStep: 0,
      ownedShards: 100,
      ownedRelicScrolls: 30,
      ownedMagicStones: 500,
      ownedArcaneCrystals: 4,
    });
    expect(single.requiredShards).toBe(330);

    const trio = calculateRelicTrioPlan({
      faction: "league",
      slots: [
        {
          slotRole: "offense",
          rarity: "legendary",
          fromStar: 0,
          fromSubStep: 0,
          toStar: 8,
          toSubStep: 0,
        },
        {
          slotRole: "defense",
          rarity: "legendary",
          fromStar: 0,
          fromSubStep: 0,
          toStar: 5,
          toSubStep: 0,
        },
        {
          slotRole: "support",
          rarity: "epic",
          fromStar: 0,
          fromSubStep: 0,
          toStar: 10,
          toSubStep: 0,
        },
      ],
      enemyLegendaryStars: 12,
      ownedLegendaryShards: 200,
      ownedEpicShards: 300,
      ownedRareShards: 0,
      ownedRelicScrolls: 10,
      ownedMagicStones: 2_000,
      ownedArcaneCrystals: 5,
    });
    expect(trio.requiredShardsByRarity.legendary).toBe(460);
    expect(trio.requiredShardsByRarity.epic).toBe(550);
  });
});

describe("6.3 Nâng sao Bí Bảo — Suite 2: MD3 UI Component & Bilingual Purity Gate", () => {
  const resolved = getCalculatorToolBySlug("runes-relics", "relics")!;

  const renderCalculator = (locale: "vi" | "en" = "vi") =>
    render(
      <RelicsCalculator
        zone={resolved.zone}
        category={resolved.category}
        tool={resolved.tool}
        locale={locale}
      />
    );

  it("contains zero sub-12px micro-text classes in relics-calculator.tsx and relic-star-petal-selector.tsx", () => {
    expect(
      countMicroTextOccurrences(
        readSource("src/components/calculators/relics-calculator.tsx")
      )
    ).toBe(0);
    expect(
      countMicroTextOccurrences(
        readSource("src/components/calculators/relic-star-petal-selector.tsx")
      )
    ).toBe(0);
    expect(
      readSource("src/components/calculators/relics-calculator.tsx")
    ).not.toMatch(/\bborder-[bt]\b|\bdivide-y\b/);
  });

  it("renders v2.0 4-Zone layout, opens 2-step Avatar Picker & Info Popover, and passes MD3 DOM gates", () => {
    const { container } = renderCalculator("vi");

    expect(screen.getByTestId("calculator-tool-header")).toBeDefined();
    expect(screen.getByTestId("relics-zone-current")).toBeDefined();
    expect(screen.getByTestId("relics-zone-avatar")).toBeDefined();
    expect(screen.getByTestId("relics-zone-target")).toBeDefined();
    expect(screen.getByTestId("relics-resources-panel")).toBeDefined();

    // Open and close 2-step Avatar Picker
    fireEvent.click(screen.getByTestId("relics-central-avatar-btn"));
    expect(screen.getByTestId("relics-avatar-picker-popover")).toBeDefined();
    fireEvent.click(screen.getByTestId("relics-group-epic_standard"));
    fireEvent.click(screen.getByTestId("relics-item-140001"));
    expect(screen.queryByTestId("relics-avatar-picker-popover")).toBeNull();

    expect(getMaxBorderedContainerDepth(container)).toBeLessThanOrEqual(1);
    expect(findMicroTextElements(container)).toEqual([]);
    expect(findMonoElementsWithVietnamese(container)).toEqual([]);
  });

  it("renders 100% pure English without any Vietnamese diacritics when locale='en'", () => {
    const { container } = renderCalculator("en");

    fireEvent.click(screen.getByTestId("relics-central-avatar-btn"));
    expect(screen.getByTestId("relics-avatar-picker-popover")).toBeDefined();
    expect(container.textContent ?? "").not.toMatch(VI_DIACRITIC_REGEX);

    fireEvent.click(screen.getByTestId("relics-group-legendary_horde"));
    expect(container.textContent ?? "").not.toMatch(VI_DIACRITIC_REGEX);

    fireEvent.click(screen.getByTestId("relics-item-150013"));

    fireEvent.click(screen.getByTestId("relics-info-trigger"));
    expect(screen.getByTestId("relics-info-dialog")).toBeDefined();

    expect(getMaxBorderedContainerDepth(container)).toBeLessThanOrEqual(1);
    expect(findMicroTextElements(container)).toEqual([]);
    expect(findMonoElementsWithVietnamese(container)).toEqual([]);
    expect(container.textContent ?? "").not.toMatch(VI_DIACRITIC_REGEX);
  });
});

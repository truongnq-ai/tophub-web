import React from "react";
import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import {
  RELIC_FACTION_SETS,
  RELIC_RARITY_TABLES,
  calculateRelicShardsBetweenStates,
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

describe("6.2 Bí Bảo — Suite 1: Quantitative SSoT Engine (0★ ➔ 20★ & Star Suppression)", () => {
  it("verifies 20-star cumulative shards and tier totals for Rare (4,810), Epic (3,130), and Legendary (1,800)", () => {
    expect(RELIC_RARITY_TABLES.rare.maxTotalShards).toBe(4_810);
    expect(RELIC_RARITY_TABLES.rare.tierTotals).toEqual([150, 460, 1_850, 2_350]);

    expect(RELIC_RARITY_TABLES.epic.maxTotalShards).toBe(3_130);
    expect(RELIC_RARITY_TABLES.epic.tierTotals).toEqual([130, 400, 1_300, 1_300]);

    expect(RELIC_RARITY_TABLES.legendary.maxTotalShards).toBe(1_800);
    expect(RELIC_RARITY_TABLES.legendary.tierTotals).toEqual([130, 360, 610, 700]);
    expect(RELIC_RARITY_TABLES.legendary.stars[4].cumulativeShards).toBe(130);
    expect(RELIC_RARITY_TABLES.legendary.stars[7].cumulativeShards).toBe(330);
    expect(RELIC_RARITY_TABLES.legendary.stars[9].cumulativeShards).toBe(490);
    expect(RELIC_RARITY_TABLES.legendary.stars[14].cumulativeShards).toBe(1_100);
    expect(RELIC_RARITY_TABLES.legendary.stars[19].cumulativeShards).toBe(1_800);
  });

  it("calculates exact sub-segment (1/5..4/5) shard investment, auxiliary materials, and Star Suppression", () => {
    expect(getInvestedRelicShardsAtState("legendary", 5, 2)).toBe(154);
    expect(
      calculateRelicShardsBetweenStates("legendary", 5, 2, 10, 0)
    ).toBe(336);

    const win = evaluateStarRatingSuppression(25, 24, false);
    expect(win.status).toBe("suppressing_enemy");
    expect(win.starDelta).toBe(1);
    expect(win.enemyPenaltyPercent).toBe(-50);

    const loseWithEpic = evaluateStarRatingSuppression(16, 18, true);
    expect(loseWithEpic.status).toBe("suppressed_by_enemy");
    expect(loseWithEpic.hasNonLegendaryInQueueWarning).toBe(true);
    expect(loseWithEpic.neededStarsToTie).toBe(2);
    expect(loseWithEpic.neededStarsToSuppress).toBe(3);

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
    expect(single.deficitShards).toBe(230);
    expect(single.deficitShardsAfterScrolls).toBe(200);
    expect(single.requiredArcaneCrystals).toBe(10); // crossed 5★ breakthrough
    expect(single.deficitArcaneCrystals).toBe(6);
    expect(single.requiredMagicStones).toBe(2_000);
    expect(single.deficitMagicStones).toBe(1_500);
    expect(single.garPointsFromRequiredShards).toBe(1_650_000);

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
    expect(trio.requiredShardsByRarity.epic).toBe(530);
    expect(trio.targetQueueLegendaryStars).toBe(13);
    expect(trio.suppressionAudit.status).toBe("suppressing_enemy");
    expect(trio.suppressionAudit.hasNonLegendaryInQueueWarning).toBe(true);
  });
});

describe("6.2 Bí Bảo — Suite 2: MD3 UI Component & Bilingual Purity Gate", () => {
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

  it("contains zero sub-12px micro-text classes in relics-calculator.tsx", () => {
    expect(
      countMicroTextOccurrences(
        readSource("src/components/calculators/relics-calculator.tsx")
      )
    ).toBe(0);
  });

  it("renders v2.0 4-Zone single-entity (×1) default (0★ ➔ 8★ = 330 Legendary Shards), opens Avatar Picker & Info Popover, and passes MD3 DOM gates", () => {
    const { container } = renderCalculator("vi");

    expect(screen.getByTestId("calculator-tool-header")).toBeDefined();
    expect(screen.getByTestId("relics-zone-current")).toBeDefined();
    expect(screen.getByTestId("relics-zone-avatar")).toBeDefined();
    expect(screen.getByTestId("relics-zone-target")).toBeDefined();
    expect(screen.getByTestId("relics-resources-panel")).toBeDefined();
    expect(
      screen.getByTestId("relics-required-shards").textContent
    ).toBe("330");
    expect(screen.queryByTestId("scope-trio-btn")).toBeNull();
    expect(screen.queryByTestId("scope-single-btn")).toBeNull();

    // Open and close 2-step Avatar Picker
    fireEvent.click(screen.getByTestId("relics-central-avatar-btn"));
    expect(screen.getByTestId("relics-avatar-picker-popover")).toBeDefined();
    fireEvent.click(screen.getByTestId("relics-group-epic_standard"));
    fireEvent.click(screen.getByTestId("relics-slot-offense"));
    expect(
      screen.getByTestId("relics-required-shards").textContent
    ).toBe("340");

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

    fireEvent.click(screen.getByTestId("relics-slot-defense"));

    fireEvent.click(screen.getByTestId("relics-info-trigger"));
    expect(screen.getByTestId("relics-info-dialog")).toBeDefined();

    expect(getMaxBorderedContainerDepth(container)).toBeLessThanOrEqual(1);
    expect(findMicroTextElements(container)).toEqual([]);
    expect(findMonoElementsWithVietnamese(container)).toEqual([]);
    expect(container.textContent ?? "").not.toMatch(VI_DIACRITIC_REGEX);
  });
});

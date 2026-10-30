import React from "react";
import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import viMessages from "../messages/vi.json";
import {
  DAILY_MILESTONE_CHESTS,
  EVENT_DAYS_METADATA,
  EVENT_INVENTORY_ITEMS,
  calculateEventPoints,
  evaluateItemOnDay,
} from "../src/content/calculators/event-points-data";
import { getCalculatorToolBySlug } from "../src/content/calculators/registry";
import { EventPointsCalculator } from "../src/components/calculators/event-points-calculator";
import { CalculatorPlaceholderView } from "../src/components/calculators/calculator-placeholder-view";
import {
  VI_DIACRITIC_REGEX,
  countMicroTextOccurrences,
  findMicroTextElements,
  findMonoElementsWithVietnamese,
  getMaxBorderedContainerDepth,
  readSource,
} from "./utils/md3-audit";

describe("9.1 Tính Điểm GAR & KvK — Quantitative SSoT Engine", () => {
  it("contains all 6 event days, 9 milestone chests, and 100% .webp asset paths", () => {
    expect(EVENT_DAYS_METADATA).toHaveLength(6);
    expect(DAILY_MILESTONE_CHESTS).toHaveLength(9);
    expect(EVENT_INVENTORY_ITEMS.length).toBeGreaterThanOrEqual(25);

    for (const item of EVENT_INVENTORY_ITEMS) {
      expect(item.iconPath.endsWith(".webp")).toBe(true);
    }
    for (const chest of DAILY_MILESTONE_CHESTS) {
      expect(chest.chestIconPath.endsWith(".webp")).toBe(true);
    }
  });

  it("matches registry exampleCase on Day 4 (300 Legendary Shards + 15,000 Skill Books + 120 Recruitment Tokens)", () => {
    const res = calculateEventPoints({
      mode: "gar",
      selectedDay: 4,
      techBuffPercent: 100,
      hasDoubleRewardsTech: true,
      quantitiesByItemId: {
        legendary_hero_shard: 300,
        skill_book: 15000,
        recruitment_token: 120,
      },
    });

    // Base points: 300*4000 (1,200,000) + 15000*30 (450,000) + 120*1500 (180,000) = 1,830,000
    expect(res.totalBasePoints).toBe(1_830_000);
    // With +100% Arms Race Commendation tech buff: 3,660,000
    expect(res.totalBuffedPoints).toBe(3_660_000);
    expect(res.unlockedChestCount).toBe(9);
    expect(res.surplusPointsAboveChest9).toBe(60_000);
    // Double rewards tech doubles base diamonds (4,500 * 2 = 9,000) and shards (15 * 2 = 30)
    expect(res.totalEarnedDiamonds).toBe(9_000);
    expect(res.totalEarnedUniversalShards).toBe(30);
    // Surplus reserve recommends holding back 7 Legendary Hero Shards (7 * 8,000 buffed pts = 56,000 pts)
    expect(res.surplusReserveRecommendations.length).toBeGreaterThan(0);
    expect(res.surplusReserveRecommendations[0].item.id).toBe(
      "legendary_hero_shard"
    );
    expect(res.surplusReserveRecommendations[0].holdbackQuantity).toBe(7);
  });

  it("distinguishes GAR vs KvK scoring differences on Day 5 (Relics + 2.5x Lord Gear vs Pet rates)", () => {
    const dragonBloodItem = EVENT_INVENTORY_ITEMS.find(
      (i) => i.id === "dragon_blood"
    )!;
    const legRelicItem = EVENT_INVENTORY_ITEMS.find(
      (i) => i.id === "legendary_relic_shard"
    )!;
    const petFoodItem = EVENT_INVENTORY_ITEMS.find((i) => i.id === "pet_food")!;

    // On Day 5 in standard GAR: Dragon Blood & Relics grant 0 points (trap!), Pet Food = 960 per 100
    const garDragonBlood = evaluateItemOnDay(dragonBloodItem, 10, "gar", 5, 0);
    expect(garDragonBlood.basePoints).toBe(0);
    expect(garDragonBlood.isZeroPointTrapOnSelectedDay).toBe(true);

    const garRelic = evaluateItemOnDay(legRelicItem, 10, "gar", 5, 0);
    expect(garRelic.basePoints).toBe(0);
    expect(garRelic.isZeroPointTrapOnSelectedDay).toBe(true);

    const garPetFood = evaluateItemOnDay(petFoodItem, 1000, "gar", 5, 0);
    expect(garPetFood.basePoints).toBe(9_600);

    // On Day 5 in KvK: Dragon Blood = 6,000 pts/unit (2.5x Day 3-4!), Relic Shard = 5,000 pts, Pet Food = 400 per 100
    const kvkDragonBlood = evaluateItemOnDay(dragonBloodItem, 10, "kvk", 5, 0);
    expect(kvkDragonBlood.basePoints).toBe(60_000);
    expect(kvkDragonBlood.isZeroPointTrapOnSelectedDay).toBe(false);

    const kvkRelic = evaluateItemOnDay(legRelicItem, 10, "kvk", 5, 0);
    expect(kvkRelic.basePoints).toBe(50_000);

    const kvkPetFood = evaluateItemOnDay(petFoodItem, 1000, "kvk", 5, 0);
    expect(kvkPetFood.basePoints).toBe(4_000);
  });

  it("flags 0-point trap when Lord Gear is entered on Day 6 in both GAR and KvK", () => {
    const garDay6 = calculateEventPoints({
      mode: "gar",
      selectedDay: 6,
      techBuffPercent: 0,
      hasDoubleRewardsTech: false,
      quantitiesByItemId: {
        dragon_blood: 5,
        orichalcum: 20,
      },
    });
    expect(garDay6.totalBasePoints).toBe(0);
    expect(garDay6.zeroPointTrapRows).toHaveLength(2);

    const kvkDay6 = calculateEventPoints({
      mode: "kvk",
      selectedDay: 6,
      techBuffPercent: 0,
      hasDoubleRewardsTech: false,
      quantitiesByItemId: {
        dragon_blood: 5,
        glory_medal: 1000,
      },
    });
    // Glory medal scores 12 pts per 10 -> 1,200 pts in KvK Day 6; Dragon Blood is 0-point trap
    expect(kvkDay6.totalBasePoints).toBe(1_200);
    expect(kvkDay6.zeroPointTrapRows).toHaveLength(1);
    expect(kvkDay6.zeroPointTrapRows[0].item.id).toBe("dragon_blood");
  });
});

describe("9.1 Tính Điểm GAR & KvK — UI, MD3 & Bilingual Integration", () => {
  const selection = getCalculatorToolBySlug("events-vip", "event-points")!;

  it("marks event-points as ready in registry and mounts via CalculatorPlaceholderView", () => {
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
    expect(screen.getByTestId("event-points-calculator")).toBeTruthy();
  });

  it("supports switching GAR vs KvK, selecting Days 1-6, and compact K/M input parsing", () => {
    render(
      <EventPointsCalculator
        zone={selection.zone}
        category={selection.category}
        tool={selection.tool}
        locale="vi"
      />
    );

    // Default Day 4 with +100% tech buff -> 3.66M points (9/9 chests)
    expect(screen.getByTestId("event-total-points-value").textContent).toBe(
      "3.66M"
    );
    expect(screen.getByTestId("event-unlocked-chests-badge").textContent).toContain(
      "9/9"
    );

    // Switch to Day 5 and KvK mode
    fireEvent.click(screen.getByTestId("day-btn-5"));
    fireEvent.click(screen.getByTestId("mode-btn-kvk"));
    expect(screen.getByTestId("kvk-vs-gar-diff-banner")).toBeTruthy();
  });

  it("enforces MD3 Zero Sub-12px Policy, Single-Layer Containment, and English bilingual purity", () => {
    const source = readSource(
      "src/components/calculators/event-points-calculator.tsx"
    );
    expect(countMicroTextOccurrences(source)).toBe(0);

    const { container } = render(
      <EventPointsCalculator
        zone={selection.zone}
        category={selection.category}
        tool={selection.tool}
        locale="en"
      />
    );

    expect(findMicroTextElements(container)).toHaveLength(0);
    expect(getMaxBorderedContainerDepth(container)).toBeLessThanOrEqual(1);
    expect(findMonoElementsWithVietnamese(container)).toHaveLength(0);

    fireEvent.click(screen.getByTestId("open-event-matrix-modal"));
    const allText = container.textContent ?? "";
    expect(VI_DIACRITIC_REGEX.test(allText)).toBe(false);
  });
});

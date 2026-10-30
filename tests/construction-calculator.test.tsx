import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { getCalculatorToolBySlug } from "@/content/calculators/registry";
import {
  CONSTRUCTION_BUILDINGS,
  DEFAULT_CONSTRUCTION_GLOBAL_BUFFS,
  DEFAULT_CONSTRUCTION_WAREHOUSE,
  computeQueueUpgradePlan,
  aggregateConstructionQueues,
  formatBuildDuration,
} from "@/content/calculators/construction-data";
import { ConstructionCalculator } from "@/components/calculators/construction-calculator";
import {
  VI_DIACRITIC_REGEX,
  findMicroTextElements,
  findMonoElementsWithVietnamese,
  getMaxBorderedContainerDepth,
} from "./utils/md3-audit";

describe("8.1 Xây dựng (Construction Multi-Queue Planner)", () => {
  it("updates calculator 8.1 in registry to '8.1 Xây dựng' / '8.1 Construction' with status ready", () => {
    const found = getCalculatorToolBySlug("castle-tech", "main-castle");
    expect(found).not.toBeNull();
    expect(found?.tool.code).toBe("8.1");
    expect(found?.tool.status).toBe("ready");
    expect(found?.tool.title.vi).toBe("8.1 Xây dựng");
    expect(found?.tool.title.en).toBe("8.1 Construction");
    expect(VI_DIACRITIC_REGEX.test(found?.tool.title.en ?? "")).toBe(false);
    expect(VI_DIACRITIC_REGEX.test(found?.tool.fullTitle.en ?? "")).toBe(false);
  });

  it("loads 25 Main City buildings across 3 strategic groups with authentic level tables", () => {
    expect(CONSTRUCTION_BUILDINGS.length).toBe(25);
    const castle = CONSTRUCTION_BUILDINGS.find((b) => b.id === 117);
    const tavern = CONSTRUCTION_BUILDINGS.find((b) => b.id === 115);
    expect(castle?.maxLevel).toBe(80);
    expect(tavern?.maxLevel).toBe(40);
  });

  it("matches 100% of the in-game screenshot numbers for Quán Rượu Lv.33 ➔ Lv.34", () => {
    const plan = computeQueueUpgradePlan(
      {
        queueId: "q-test",
        buildingId: 115,
        fromLevel: 33,
        toLevel: 34,
        multiplyBrillianceSubSteps: true,
        useNewServerPrerequisites: true,
      },
      DEFAULT_CONSTRUCTION_GLOBAL_BUFFS,
      DEFAULT_CONSTRUCTION_WAREHOUSE
    );

    // Uy Thế: 64300 +7200
    expect(plan.currentFightforce).toBe(64300);
    expect(plan.deltaFightforce).toBe(7200);

    // Attributes: 1124 (396 +12) and 104 (15.5% +1.5%)
    const cdAttr = plan.attributeGains.find((a) => a.attrId === 1124);
    const hpAttr = plan.attributeGains.find((a) => a.attrId === 104);
    expect(cdAttr?.currentValue).toBe(396);
    expect(cdAttr?.deltaValue).toBe(12);
    expect(hpAttr?.currentValue).toBe(1550);
    expect(hpAttr?.deltaValue).toBe(150);

    // Prerequisite: Pháo Đài cấp 34
    expect(plan.prerequisites).toEqual([
      expect.objectContaining({ buildingId: 117, requiredLevel: 34 }),
    ]);

    // Discounted resources (-5%): Timber 34.96M (34.9M), Stone 17.48M (17.4M), Ruby 1.9095M (1.90M)
    expect(plan.discountedCosts.timber).toBe(34_960_000);
    expect(plan.discountedCosts.stone).toBe(17_480_000);
    expect(plan.discountedCosts.ruby).toBe(1_909_500);

    // Base build time: 253,638s (2Ngày 22:27:18)
    expect(plan.baseTimeSeconds).toBe(253638);
    expect(formatBuildDuration(plan.baseTimeSeconds, "vi")).toBe("2Ngày 22:27:18");

    // Effective build time with 117% speed + 5m free + 10m privilege: floor(253638 / 2.17) - 900 = 115,983s
    expect(plan.effectiveTimeSeconds).toBe(115983);
    expect(formatBuildDuration(plan.effectiveTimeSeconds, "vi")).toBe("1Ngày 08:13:03");

    // Instant upgrade diamonds: ceil(115983 / 3) = 38661
    expect(plan.instantDiamonds).toBe(38661);
  });

  it("renders default 2 construction queues, supports adding/removing queues (1..6), and passes MD3 guardrails", () => {
    const found = getCalculatorToolBySlug("castle-tech", "main-castle")!;
    const { container } = render(
      <ConstructionCalculator
        zone={found.zone}
        category={found.category}
        tool={found.tool}
        locale="vi"
      />
    );

    // Default 2 queues rendered
    expect(screen.getAllByTestId("construction-queue-card").length).toBe(2);

    // Click [+ Thêm đội xây] -> 3 queues
    const addBtn = screen.getByTestId("add-construction-queue-btn");
    fireEvent.click(addBtn);
    expect(screen.getAllByTestId("construction-queue-card").length).toBe(3);

    // Click [- Giảm đội xây] -> 2 queues
    const removeBtn = screen.getByTestId("remove-construction-queue-btn");
    fireEvent.click(removeBtn);
    expect(screen.getAllByTestId("construction-queue-card").length).toBe(2);

    // MD3 Audit checks
    expect(getMaxBorderedContainerDepth(container)).toBeLessThanOrEqual(1);
    expect(findMicroTextElements(container)).toEqual([]);
    expect(findMonoElementsWithVietnamese(container)).toEqual([]);
  });

  it("renders 100% English strings with zero Vietnamese diacritics when locale='en'", () => {
    const found = getCalculatorToolBySlug("castle-tech", "main-castle")!;
    const { container } = render(
      <ConstructionCalculator
        zone={found.zone}
        category={found.category}
        tool={found.tool}
        locale="en"
      />
    );

    const text = container.textContent ?? "";
    expect(VI_DIACRITIC_REGEX.test(text)).toBe(false);
    expect(getMaxBorderedContainerDepth(container)).toBeLessThanOrEqual(1);
  });
});

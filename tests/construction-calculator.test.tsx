import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  getAdjacentCalculatorTools,
  getCalculatorToolBySlug,
} from "@/content/calculators/registry";
import {
  CONSTRUCTION_BUILDINGS,
  DEFAULT_CONSTRUCTION_GLOBAL_BUFFS,
  computeQueueUpgradePlan,
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
  it("updates calculator 8.1 slug to 'construction' (with 'main-castle' alias) and title '8.1 Xây dựng'", () => {
    const found = getCalculatorToolBySlug("castle-tech", "construction");
    expect(found).not.toBeNull();
    expect(found?.tool.code).toBe("8.1");
    expect(found?.tool.slug).toBe("construction");
    expect(found?.tool.status).toBe("ready");
    expect(found?.tool.title.vi).toBe("8.1 Xây dựng");
    expect(found?.tool.title.en).toBe("8.1 Construction");
    expect(VI_DIACRITIC_REGEX.test(found?.tool.title.en ?? "")).toBe(false);
    expect(VI_DIACRITIC_REGEX.test(found?.tool.fullTitle.en ?? "")).toBe(false);

    const aliasFound = getCalculatorToolBySlug("castle-tech", "main-castle");
    expect(aliasFound?.tool.slug).toBe("construction");

    const adjCanonical = getAdjacentCalculatorTools("castle-tech", "construction");
    const adjAlias = getAdjacentCalculatorTools("castle-tech", "main-castle");
    expect(adjCanonical.next?.code).toBe("8.2");
    expect(adjAlias.next?.code).toBe("8.2");
  });

  it("loads 25 Main City buildings across 3 strategic groups with authentic level tables", () => {
    expect(CONSTRUCTION_BUILDINGS.length).toBe(25);
    const castle = CONSTRUCTION_BUILDINGS.find((b) => b.id === 117);
    const tavern = CONSTRUCTION_BUILDINGS.find((b) => b.id === 115);
    expect(castle?.maxLevel).toBe(80);
    expect(tavern?.maxLevel).toBe(40);
  });

  it("matches 100% of the in-game numbers for Quán Rượu Lv.33 ➔ Lv.34 without warehouse state", () => {
    const plan = computeQueueUpgradePlan(
      {
        queueId: "q-test",
        buildingId: 115,
        fromLevel: 33,
        toLevel: 34,
        multiplyBrillianceSubSteps: true,
        useNewServerPrerequisites: true,
      },
      DEFAULT_CONSTRUCTION_GLOBAL_BUFFS
    );

    expect(plan.currentFightforce).toBe(64300);
    expect(plan.deltaFightforce).toBe(7200);

    const cdAttr = plan.attributeGains.find((a) => a.attrId === 1124);
    const hpAttr = plan.attributeGains.find((a) => a.attrId === 104);
    expect(cdAttr?.currentValue).toBe(396);
    expect(cdAttr?.deltaValue).toBe(12);
    expect(hpAttr?.currentValue).toBe(1550);
    expect(hpAttr?.deltaValue).toBe(150);

    expect(plan.prerequisites).toEqual([
      expect.objectContaining({ buildingId: 117, requiredLevel: 34 }),
    ]);

    expect(plan.discountedCosts.timber).toBe(34_960_000);
    expect(plan.discountedCosts.stone).toBe(17_480_000);
    expect(plan.discountedCosts.ruby).toBe(1_909_500);

    expect(plan.baseTimeSeconds).toBe(253638);
    expect(formatBuildDuration(plan.baseTimeSeconds, "vi")).toBe("2Ngày 22:27:18");
    expect(plan.effectiveTimeSeconds).toBe(115983);
    expect(formatBuildDuration(plan.effectiveTimeSeconds, "vi")).toBe("1Ngày 08:13:03");
    expect(plan.instantDiamonds).toBe(38661);
  });

  it("renders default 2 construction queues, omits the warehouse inventory panel, and passes MD3 guardrails", () => {
    const found = getCalculatorToolBySlug("castle-tech", "construction")!;
    const { container } = render(
      <ConstructionCalculator
        zone={found.zone}
        category={found.category}
        tool={found.tool}
        locale="vi"
      />
    );

    expect(screen.getAllByTestId("construction-queue-card").length).toBe(2);
    expect(screen.queryByText(/Kho tài nguyên hiện có/i)).toBeNull();
    expect(screen.queryByText(/Nhập Kho Tài Nguyên/i)).toBeNull();

    const addBtn = screen.getByTestId("add-construction-queue-btn");
    fireEvent.click(addBtn);
    expect(screen.getAllByTestId("construction-queue-card").length).toBe(3);

    const removeBtn = screen.getByTestId("remove-construction-queue-btn");
    fireEvent.click(removeBtn);
    expect(screen.getAllByTestId("construction-queue-card").length).toBe(2);

    expect(getMaxBorderedContainerDepth(container)).toBeLessThanOrEqual(1);
    expect(findMicroTextElements(container)).toEqual([]);
    expect(findMonoElementsWithVietnamese(container)).toEqual([]);
  });

  it("renders 100% English strings with zero Vietnamese diacritics when locale='en'", () => {
    const found = getCalculatorToolBySlug("castle-tech", "construction")!;
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

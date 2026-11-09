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
  applyAllianceHelpsToStep,
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

  it("applies per-step alliance help formula (1% current progress, min 60s per help) accurately", () => {
    // 1. Long step (> 6000s): 1% compounding reduction per help
    expect(applyAllianceHelpsToStep(115983, 20)).toBe(94873);
    expect(applyAllianceHelpsToStep(115983, 21)).toBe(93925);
    // 2. Medium step (<= 6000s): minimum 60s reduction per help
    expect(applyAllianceHelpsToStep(3600, 20)).toBe(2400);
    // 3. Short step: clamps at 0 without going negative
    expect(applyAllianceHelpsToStep(500, 20)).toBe(0);
    // 4. Zero helps: returns exact effective time
    expect(applyAllianceHelpsToStep(115983, 0)).toBe(115983);
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
    expect(plan.helpedTimeSeconds).toBe(94873);
    expect(formatBuildDuration(plan.helpedTimeSeconds, "vi")).toBe("1Ngày 02:21:13");
    expect(plan.savedTimeSeconds).toBe(253638 - 94873);
    expect(formatBuildDuration(plan.savedTimeSeconds, "vi")).toBe("1Ngày 20:06:05");
    expect(plan.instantDiamonds).toBe(38661);
  });

  it("renders default 2 construction queues, standardized 4-column headers without 'Cột X •', omits the warehouse inventory panel, and passes MD3 guardrails", () => {
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

    // Standardized 4 column headers without "Cột 1..4 •" prefixes
    expect(screen.queryByText(/Cột 1 •/i)).toBeNull();
    expect(screen.queryByText(/Cột 2 •/i)).toBeNull();
    expect(screen.queryByText(/Cột 3 •/i)).toBeNull();
    expect(screen.queryByText(/Cột 4 •/i)).toBeNull();
    expect(screen.getAllByText("Công trình").length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText("Uy Thế & Thuộc Tính").length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText("Điều Kiện").length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText("Thời Gian").length).toBeGreaterThanOrEqual(2);

    // Effective Time & Alliance Help Time assertions
    expect(screen.getAllByText("Thời gian thực tế").length).toBe(2);
    expect(screen.queryByText(/Bắt đầu \(Thời gian thực tế\)/i)).toBeNull();
    expect(screen.getAllByText("Sau trợ giúp 20/20").length).toBe(2);
    expect(screen.getByTestId("queue-1-helped-time").textContent).toBe(
      "1Ngày 02:21:13"
    );

    fireEvent.click(screen.getByTestId("buff-help-count-increase"));
    expect(screen.getAllByText("Sau trợ giúp 21/21").length).toBe(2);
    expect(screen.getByTestId("queue-1-helped-time").textContent).toBe(
      "1Ngày 02:05:25"
    );

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
    expect(screen.getAllByText("Effective Time").length).toBe(2);
    expect(screen.getAllByText("After Help 20/20").length).toBe(2);
    expect(getMaxBorderedContainerDepth(container)).toBeLessThanOrEqual(1);
  });
});

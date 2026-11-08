import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  getAdjacentCalculatorTools,
  getCalculatorToolBySlug,
} from "@/content/calculators/registry";
import {
  TECHNOLOGY_BRANCHES,
  TECHNOLOGY_NODES,
  DEFAULT_TECH_GLOBAL_BUFFS,
  computeTechQueueUpgradePlan,
  aggregateTechQueues,
} from "@/content/calculators/technology-data";
import { TechnologyCalculator } from "@/components/calculators/technology-calculator";
import {
  VI_DIACRITIC_REGEX,
  findMicroTextElements,
  findMonoElementsWithVietnamese,
  getMaxBorderedContainerDepth,
} from "./utils/md3-audit";

describe("8.2 Công nghệ (Technology Dual-Queue Research Planner)", () => {
  it("updates calculator 8.2 slug to 'technology' (with 'tech-brilliance' alias), status 'ready', and title '8.2 Công nghệ'", () => {
    const found = getCalculatorToolBySlug("castle-tech", "technology");
    expect(found).not.toBeNull();
    expect(found?.tool.code).toBe("8.2");
    expect(found?.tool.slug).toBe("technology");
    expect(found?.tool.status).toBe("ready");
    expect(found?.tool.title.vi).toBe("8.2 Công nghệ");
    expect(found?.tool.title.en).toBe("8.2 Technology");
    expect(VI_DIACRITIC_REGEX.test(found?.tool.title.en ?? "")).toBe(false);
    expect(VI_DIACRITIC_REGEX.test(found?.tool.fullTitle.en ?? "")).toBe(false);

    const aliasFound = getCalculatorToolBySlug("castle-tech", "tech-brilliance");
    expect(aliasFound?.tool.slug).toBe("technology");

    const adjCanonical = getAdjacentCalculatorTools("castle-tech", "technology");
    const adjAlias = getAdjacentCalculatorTools("castle-tech", "tech-brilliance");
    expect(adjCanonical.prev?.code).toBe("8.1");
    expect(adjCanonical.next?.code).toBe("8.3");
    expect(adjAlias.prev?.code).toBe("8.1");
  });

  it("loads all 8 Research Cottage branches (4 Basic + 4 Advanced) and 190 nodes with 3-column grid coordinates", () => {
    expect(TECHNOLOGY_BRANCHES.length).toBe(8);
    expect(TECHNOLOGY_BRANCHES.filter((b) => b.tier === "basic").length).toBe(4);
    expect(TECHNOLOGY_BRANCHES.filter((b) => b.tier === "advanced").length).toBe(4);
    expect(TECHNOLOGY_NODES.length).toBe(190);

    for (const branch of TECHNOLOGY_BRANCHES) {
      expect(VI_DIACRITIC_REGEX.test(branch.name.en)).toBe(false);
      expect(VI_DIACRITIC_REGEX.test(branch.description.en)).toBe(false);
    }

    for (const node of TECHNOLOGY_NODES) {
      expect([1, 2, 3]).toContain(node.col);
      expect(node.row).toBeGreaterThanOrEqual(1);
      expect(node.maxLevel).toBeGreaterThanOrEqual(1);
      expect(node.icon.startsWith("/images/tech/research/")).toBe(true);
      expect(VI_DIACRITIC_REGEX.test(node.name.en)).toBe(false);
    }
  });

  it("computes exact costs, fightforce, attributes, and multi-parent prerequisites from Meta.bytes", () => {
    // Node 213001: Tốc độ Xây I (Lv.0 -> Lv.5)
    const planSingle = computeTechQueueUpgradePlan(
      {
        queueId: "tech-q1",
        nodeId: 213001,
        fromLevel: 0,
        toLevel: 5,
      },
      { researchSpeedPct: 0, costReductionPct: 0 }
    );

    expect(planSingle.currentFightforce).toBe(0);
    expect(planSingle.deltaFightforce).toBe(700);
    expect(planSingle.discountedCosts.timber).toBe(3300);
    expect(planSingle.discountedCosts.stone).toBe(3300);
    expect(planSingle.discountedCosts.ruby).toBe(6632);
    expect(planSingle.baseTimeSeconds).toBe(300 + 360 + 480 + 600 + 780);
    expect(planSingle.attributeGains[0]?.currentValue).toBe(0);
    expect(planSingle.attributeGains[0]?.deltaValue).toBe(5);

    // Node 213004: Tốc độ Nghiên Cứu I (col=2 converging node requiring 213002 & 213003)
    const planConverge = computeTechQueueUpgradePlan(
      {
        queueId: "tech-q2",
        nodeId: 213004,
        fromLevel: 0,
        toLevel: 5,
      },
      DEFAULT_TECH_GLOBAL_BUFFS
    );
    expect(planConverge.prerequisites.map((p) => p.nodeId).sort()).toEqual([
      213002,
      213003,
    ]);
    expect(planConverge.requiredCottageLevel).toBe(4);

    const summary = aggregateTechQueues([planSingle, planConverge]);
    expect(summary.totalQueues).toBe(2);
    expect(summary.totalDeltaFightforce).toBe(
      planSingle.deltaFightforce + planConverge.deltaFightforce
    );
  });

  it("renders fixed 2 research queues, standardized 4-column headers without 'Cột X •', cross-queue 'Đến' button, and 3-column tree modal", () => {
    const found = getCalculatorToolBySlug("castle-tech", "technology")!;
    const { container } = render(
      <TechnologyCalculator
        zone={found.zone}
        category={found.category}
        tool={found.tool}
        locale="vi"
      />
    );

    // Fixed 2 queues (no add/remove queue buttons)
    expect(screen.getAllByTestId("technology-queue-card").length).toBe(2);
    expect(screen.queryByTestId("add-technology-queue-btn")).toBeNull();
    expect(screen.queryByTestId("remove-technology-queue-btn")).toBeNull();

    // Standardized 4 column headers without "Cột 1..4 •"
    expect(screen.queryByText(/Cột 1 •/i)).toBeNull();
    expect(screen.queryByText(/Cột 2 •/i)).toBeNull();
    expect(screen.queryByText(/Cột 3 •/i)).toBeNull();
    expect(screen.queryByText(/Cột 4 •/i)).toBeNull();
    expect(screen.getAllByText("Công nghệ").length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText("Uy Thế & Thuộc Tính").length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText("Điều Kiện").length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText("Thời Gian").length).toBeGreaterThanOrEqual(2);

    // Open Tech Tree Picker Modal for Queue 1
    fireEvent.click(screen.getByTestId("tech-queue-1-open-picker-btn"));
    expect(screen.getByTestId("technology-picker-modal")).not.toBeNull();
    expect(screen.getAllByTestId("tech-branch-card").length).toBe(8);
    expect(screen.getByTestId("tech-tree-3col-grid")).not.toBeNull();

    // Select converging node 213004 (Tốc độ Nghiên Cứu I) in Queue 1
    fireEvent.click(screen.getByTestId("tech-tree-node-213004"));
    expect(screen.queryByTestId("technology-picker-modal")).toBeNull();

    // Click "Đến" on prerequisite in Queue 1 -> assigns to Queue 2
    const goButtons = screen.getAllByTestId(/tech-prereq-go-btn-/);
    expect(goButtons.length).toBeGreaterThan(0);
    fireEvent.click(goButtons[0]!);

    // MD3 Guardrails
    expect(getMaxBorderedContainerDepth(container)).toBeLessThanOrEqual(1);
    expect(findMicroTextElements(container)).toEqual([]);
    expect(findMonoElementsWithVietnamese(container)).toEqual([]);
  });

  it("renders 100% English strings with zero Vietnamese diacritics when locale='en'", () => {
    const found = getCalculatorToolBySlug("castle-tech", "technology")!;
    const { container } = render(
      <TechnologyCalculator
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

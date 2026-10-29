import React from "react";
import { describe, expect, it } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { HeroAwakeningStepSelector } from "../src/components/calculators/hero-awakening-step-selector";
import { getCalculatorToolBySlug } from "../src/content/calculators/registry";
import { HeroAwakeningCalculator } from "../src/components/calculators/hero-awakening-calculator";
import {
  ALL_SIDE_BORDER_REGEX,
  countMicroTextOccurrences,
  findMicroTextElements,
  findMonoElementsWithVietnamese,
  getMaxBorderedContainerDepth,
  readSource,
} from "./utils/md3-audit";

function StepHarness({ initialStep }: { readonly initialStep: number }) {
  const [stepIndex, setStepIndex] = React.useState(initialStep);
  return (
    <HeroAwakeningStepSelector
      idPrefix="from"
      title="Bậc Thức Tỉnh Hiện Tại"
      stepIndex={stepIndex}
      nextStepShards={15}
      nextStepStones={2}
      locale="vi"
      onChangeStepIndex={setStepIndex}
    />
  );
}

const SUB_STEPS_BY_TIER: Record<1 | 2 | 3, readonly number[]> = {
  1: [2, 3, 4, 5, 6],
  2: [8, 9, 10, 11, 12],
  3: [14, 15, 16, 17, 18],
};

describe("Phase 2.3 / HeroAwakeningStepSelector MD3", () => {
  it("hero-awakening-step-selector.tsx contains zero text-[8px..11px] classes", () => {
    expect(
      countMicroTextOccurrences(
        readSource("src/components/calculators/hero-awakening-step-selector.tsx")
      )
    ).toBe(0);
  });

  it("stacks the 4 major tiers as vertical rows: [tier button][5 sub-levels]", () => {
    render(<StepHarness initialStep={6} />);
    const list = screen.getByTestId("from-awakening-tier-list");
    expect(list.className).toContain("grid-cols-1");
    expect(list.className).not.toContain("grid-cols-4");

    for (const tier of [1, 2, 3] as const) {
      const row = screen.getByTestId(`from-awakening-tier-row-${tier}`);
      const ids = within(row)
        .getAllByRole("button")
        .map((b) => b.getAttribute("data-testid"));
      expect(ids).toEqual([
        `from-tier-btn-${tier}`,
        ...SUB_STEPS_BY_TIER[tier].map((s) => `from-sublevel-btn-${s}`),
      ]);
    }
    const tier4Row = screen.getByTestId("from-awakening-tier-row-4");
    expect(within(tier4Row).getAllByRole("button")).toHaveLength(1);
    expect(tier4Row.textContent).toContain("Hóa Đỏ");
  });

  it("gives every tier and sub-level button a ≥44px touch target with ≥12px labels", () => {
    render(<StepHarness initialStep={6} />);
    for (const tier of [0, 1, 2, 3, 4]) {
      expect(screen.getByTestId(`from-tier-btn-${tier}`).className).toContain("min-h-[44px]");
    }
    for (const subSteps of Object.values(SUB_STEPS_BY_TIER)) {
      for (const step of subSteps) {
        const button = screen.getByTestId(`from-sublevel-btn-${step}`);
        expect(button.className).toContain("min-h-[44px]");
        expect(button.className).toContain("text-xs");
      }
    }
    expect(screen.getByTestId("from-step-minus").className).toContain("h-11");
    expect(screen.getByTestId("from-step-plus").className).toContain("w-11");
    expect(screen.getByTestId("from-tier-btn-0").className).toContain("font-sans");
  });

  it("keeps a single bordered layer, no micro-text and no mono on Vietnamese", () => {
    const { container } = render(<StepHarness initialStep={6} />);
    expect(getMaxBorderedContainerDepth(screen.getByTestId("from-awakening-selector-card"))).toBe(1);
    expect(screen.getByTestId("from-awakening-summary").className).not.toMatch(
      ALL_SIDE_BORDER_REGEX
    );
    expect(findMicroTextElements(container)).toEqual([]);
    expect(findMonoElementsWithVietnamese(container)).toEqual([]);
  });

  it("preserves sub-level, tier and stepper navigation", () => {
    render(<StepHarness initialStep={6} />);
    const summary = () => screen.getByTestId("from-awakening-summary").textContent ?? "";

    fireEvent.click(screen.getByTestId("from-sublevel-btn-9"));
    expect(summary()).toContain("9/19");

    fireEvent.click(screen.getByTestId("from-step-minus"));
    expect(summary()).toContain("8/19");

    fireEvent.click(screen.getByTestId("from-tier-btn-4"));
    expect(summary()).toContain("19/19");
    expect((screen.getByTestId("from-step-plus") as HTMLButtonElement).disabled).toBe(true);
  });
});

describe("Phase 2.3 / HeroAwakeningCalculator MD3", () => {
  const resolved = getCalculatorToolBySlug("heroes", "hero-awakening")!;
  const renderCalculator = () =>
    render(
      <HeroAwakeningCalculator
        zone={resolved.zone}
        category={resolved.category}
        tool={resolved.tool}
        locale="vi"
      />
    );

  it("hero-awakening-calculator.tsx contains zero text-[8px..11px] classes", () => {
    expect(
      countMicroTextOccurrences(
        readSource("src/components/calculators/hero-awakening-calculator.tsx")
      )
    ).toBe(0);
  });

  it("uses a flat header, 30–36px heading metrics (value-only text) and 16px/44px inputs", () => {
    renderCalculator();
    expect(screen.getByTestId("calculator-tool-header").className).not.toMatch(
      ALL_SIDE_BORDER_REGEX
    );

    const stones = screen.getByTestId("awakening-required-stones");
    expect(stones.textContent).toBe("8");
    expect(stones.className).toContain("text-3xl");
    expect(stones.className).toContain("font-heading");
    expect(stones.className).not.toContain("font-mono");
    expect(screen.getByTestId("awakening-required-shards").textContent).toBe("290");

    for (const id of ["awakening-owned-stones-input", "awakening-owned-shards-input"]) {
      const input = screen.getByTestId(id);
      expect(input.className).toContain("h-11");
      expect(input.className).toContain("text-base");
    }

    const toggle = screen.getByTestId("toggle-awakening-breakdown-btn");
    expect(toggle.className).toContain("min-h-[44px]");
    expect(toggle.getAttribute("aria-label")).toBeTruthy();
  });

  it("renders the awakening breakdown flat with Vietnamese-safe font-sans table text", () => {
    renderCalculator();
    fireEvent.click(screen.getByTestId("toggle-awakening-breakdown-btn"));

    const panel = screen.getByTestId("awakening-steps-breakdown-panel");
    expect(panel.className).not.toMatch(ALL_SIDE_BORDER_REGEX);
    expect(panel.className).toContain("border-t");

    const table = screen.getByTestId("hero-awakening-breakdown-table");
    expect(table.className).toContain("text-sm");
    const headRow = table.querySelector("thead tr");
    expect(headRow?.className).toContain("font-sans");
    expect(headRow?.className).not.toContain("font-mono");
    expect(table.querySelector("tbody")?.className).not.toContain("font-mono");
  });

  it("keeps ≤ 1 bordered layer, zero micro-text and zero mono Vietnamese with picker + breakdown open", () => {
    renderCalculator();
    fireEvent.click(screen.getByTestId("central-hero-avatar-trigger"));
    fireEvent.click(screen.getByTestId("toggle-awakening-breakdown-btn"));

    expect(screen.getByTestId("hero-sequential-picker").getAttribute("data-md3-overlay")).toBe(
      "true"
    );
    const factionCard = screen.getByTestId("faction-card-league");
    expect(factionCard.className).toContain("min-h-[56px]");
    expect(factionCard.className).not.toMatch(ALL_SIDE_BORDER_REGEX);

    const root = screen.getByTestId("hero-awakening-calculator");
    expect(getMaxBorderedContainerDepth(root)).toBeLessThanOrEqual(1);
    expect(findMicroTextElements(root)).toEqual([]);
    expect(findMonoElementsWithVietnamese(root)).toEqual([]);
  });
});

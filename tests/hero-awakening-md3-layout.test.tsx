import React from "react";
import { describe, expect, it } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { HeroAwakeningStepSelector } from "../src/components/calculators/hero-awakening-step-selector";
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

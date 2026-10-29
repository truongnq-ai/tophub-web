import React from "react";
import { describe, expect, it } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { HeroStarPetalSelector } from "../src/components/calculators/hero-star-petal-selector";
import {
  ALL_SIDE_BORDER_REGEX,
  countMicroTextOccurrences,
  findMicroTextElements,
  findMonoElementsWithVietnamese,
  getMaxBorderedContainerDepth,
  readSource,
} from "./utils/md3-audit";

function SelectorHarness({ initialPetalIndex }: { readonly initialPetalIndex: number }) {
  const [petalIndex, setPetalIndex] = React.useState(initialPetalIndex);
  return (
    <HeroStarPetalSelector
      idPrefix="from"
      title="Bậc Sao Hiện Tại"
      petalIndex={petalIndex}
      costPerPetal={2}
      cumulativeShards={12}
      locale="vi"
      onChangePetalIndex={setPetalIndex}
    />
  );
}

const TIER_ROWS = [
  { key: "gold", stars: [1, 2, 3, 4, 5] },
  { key: "red", stars: [6, 7, 8, 9, 10] },
  { key: "silver", stars: [11, 12, 13, 14, 15] },
] as const;

describe("Phase 2.2 / HeroStarPetalSelector MD3", () => {
  it("hero-star-petal-selector.tsx contains zero text-[8px..11px] classes", () => {
    expect(
      countMicroTextOccurrences(
        readSource("src/components/calculators/hero-star-petal-selector.tsx")
      )
    ).toBe(0);
  });

  it("groups the 15 stars into 3 tier rows × 5 stars on mobile (no 15-column micro grid)", () => {
    render(<SelectorHarness initialPetalIndex={6} />);
    const grid = screen.getByTestId("from-star-tier-grid");
    expect(grid.className).toContain("grid-cols-1");
    expect(grid.className).toContain("sm:grid-cols-3");
    expect(grid.className).not.toContain("repeat(15");

    for (const row of TIER_ROWS) {
      const rowEl = screen.getByTestId(`from-star-tier-row-${row.key}`);
      const buttons = within(rowEl).getAllByRole("button");
      expect(buttons.map((b) => b.getAttribute("data-testid"))).toEqual(
        row.stars.map((s) => `from-milestone-star-${s}`)
      );
    }
  });

  it("gives every star a ≥48px touch target, 24px icon and 12px label", () => {
    render(<SelectorHarness initialPetalIndex={6} />);
    for (let star = 1; star <= 15; star++) {
      const button = screen.getByTestId(`from-milestone-star-${star}`);
      expect(button.className).toContain("min-h-[48px]");
      expect(button.querySelector("svg")?.getAttribute("class")).toContain("h-6 w-6");
      expect(button.querySelector("span")?.className).toContain("text-xs");
    }
    expect(screen.getByTestId("from-milestone-star-0").className).toContain("min-h-[44px]");
    expect(screen.getByTestId("from-petal-minus-btn").className).toContain("h-11");
    expect(screen.getByTestId("from-petal-plus-btn").className).toContain("w-11");
  });

  it("keeps a single bordered layer (card only) and no mono on Vietnamese", () => {
    const { container } = render(<SelectorHarness initialPetalIndex={6} />);
    const card = screen.getByTestId("from-star-selector-card");
    expect(getMaxBorderedContainerDepth(card)).toBe(1);
    expect(screen.getByTestId("from-star-summary").className).not.toMatch(ALL_SIDE_BORDER_REGEX);
    expect(findMicroTextElements(container)).toEqual([]);
    expect(findMonoElementsWithVietnamese(container)).toEqual([]);
  });

  it("preserves data-lit-petals and click/stepper behavior", () => {
    render(<SelectorHarness initialPetalIndex={6} />);
    expect(screen.getByTestId("from-milestone-star-1").getAttribute("data-lit-petals")).toBe("5");
    expect(screen.getByTestId("from-milestone-star-2").getAttribute("data-lit-petals")).toBe("1");

    fireEvent.click(screen.getByTestId("from-petal-minus-btn"));
    expect(screen.getByTestId("from-milestone-star-2").getAttribute("data-lit-petals")).toBe("0");

    fireEvent.click(screen.getByTestId("from-milestone-star-12"));
    expect(screen.getByTestId("from-milestone-star-12").getAttribute("data-lit-petals")).toBe("5");
    expect(screen.getByTestId("from-milestone-star-13").getAttribute("data-lit-petals")).toBe("0");
  });
});

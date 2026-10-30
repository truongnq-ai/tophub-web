import React from "react";
import { describe, expect, it } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { HeroLevelSpiritSelector } from "../src/components/calculators/hero-level-spirit-selector";
import { getCalculatorToolBySlug } from "../src/content/calculators/registry";
import { HeroLevelSpiritCalculator } from "../src/components/calculators/hero-level-spirit-calculator";
import {
  ALL_SIDE_BORDER_REGEX,
  countMicroTextOccurrences,
  findMicroTextElements,
  findMonoElementsWithVietnamese,
  getMaxBorderedContainerDepth,
  readSource,
} from "./utils/md3-audit";

function SelectorHarness() {
  const [heroLevel, setHeroLevel] = React.useState<number>(190);
  const [spiritLevel, setSpiritLevel] = React.useState<number>(0);

  return (
    <HeroLevelSpiritSelector
      idPrefix="to"
      title="Cấp & Linh Thể Mục Tiêu"
      viewMode="combo"
      heroLevel={heroLevel}
      spiritLevel={spiritLevel}
      locale="vi"
      onChangeHeroLevel={setHeroLevel}
      onChangeSpiritLevel={setSpiritLevel}
    />
  );
}

describe("Phase 2.5 / HeroLevelSpiritSelector MD3", () => {
  it("hero-level-spirit-selector.tsx contains zero text-[8px..11px] classes", () => {
    expect(
      countMicroTextOccurrences(
        readSource("src/components/calculators/hero-level-spirit-selector.tsx")
      )
    ).toBe(0);
  });

  it("renders Hero Level and Heroic Spirit sections as a flat hairline list under an MD3 heading", () => {
    render(<SelectorHarness />);
    const title = screen.getByTestId("to-level-spirit-title");
    expect(title.tagName).toBe("H3");
    expect(title.className).toContain("font-heading");
    expect(title.className).not.toContain("font-mono");
    expect(title.className).not.toContain("uppercase");

    const list = screen.getByTestId("to-level-spirit-list");
    expect(list.className).toContain("divide-y");
    const rows = within(list).getAllByRole("listitem");
    expect(rows).toHaveLength(2);
    for (const row of rows) {
      expect(row.className).not.toMatch(ALL_SIDE_BORDER_REGEX);
    }
  });

  it("uses ≥44px presets and steppers and keeps a single bordered layer", () => {
    const { container } = render(<SelectorHarness />);
    expect(screen.getByTestId("to-hero-level-minus-btn").className).toContain("h-11");
    expect(screen.getByTestId("to-hero-level-plus-btn").className).toContain("w-11");
    expect(screen.getByTestId("to-spirit-level-minus-btn").className).toContain("h-11");
    expect(screen.getByTestId("to-spirit-level-plus-btn").className).toContain("w-11");

    expect(
      getMaxBorderedContainerDepth(screen.getByTestId("to-level-spirit-selector"))
    ).toBe(1);
    expect(findMicroTextElements(container)).toEqual([]);
    expect(findMonoElementsWithVietnamese(container)).toEqual([]);
  });
});

describe("Phase 2.5 / HeroLevelSpiritCalculator MD3 (Standard v2.0)", () => {
  const selection = getCalculatorToolBySlug("heroes", "hero-level-spirit")!;
  const renderCalculator = () =>
    render(
      <HeroLevelSpiritCalculator
        zone={selection.zone}
        category={selection.category}
        tool={selection.tool}
        locale="vi"
      />
    );

  it("hero-level-spirit-calculator.tsx contains zero text-[8px..11px] classes", () => {
    expect(
      countMicroTextOccurrences(
        readSource("src/components/calculators/hero-level-spirit-calculator.tsx")
      )
    ).toBe(0);
  });

  it("uses a flat header, 3-column R5 dual metrics and 16px/44px inputs with an accessible [i] button", () => {
    renderCalculator();
    expect(screen.getByTestId("calculator-tool-header").className).not.toMatch(
      ALL_SIDE_BORDER_REGEX
    );

    const meatMetric = screen.getByTestId("spirit-required-meat-value");
    expect(meatMetric.className).toContain("text-xl");
    expect(screen.getByTestId("spirit-required-shards-value").className).toContain(
      "text-xl"
    );

    for (const id of ["spirit-owned-meat-input", "spirit-owned-shards-input"]) {
      const input = screen.getByTestId(id);
      expect(input.className).toContain("h-11");
      expect(input.className).toContain("text-base");
    }

    const infoBtn = screen.getByTestId("toggle-spirit-breakdown-btn");
    expect(infoBtn.className).toContain("h-11");
    expect(infoBtn.getAttribute("aria-label")).toBeTruthy();
  });

  it("renders breakdown table inside CalculatorInfoPopover (Rule R6) without a nested bordered wrapper and keeps max border depth <= 1", () => {
    renderCalculator();
    fireEvent.click(screen.getByTestId("toggle-spirit-breakdown-btn"));

    const panel = screen.getByTestId("spirit-breakdown-panel");
    expect(getMaxBorderedContainerDepth(panel)).toBeLessThanOrEqual(1);
    const table = screen.getByTestId("spirit-breakdown-table");
    expect(table.parentElement?.className ?? "").not.toMatch(ALL_SIDE_BORDER_REGEX);
    expect(table.querySelector("thead tr")?.className).toContain("font-sans");
    expect(table.querySelector("tbody")?.className).not.toContain("font-mono");

    fireEvent.click(screen.getByTestId("central-hero-avatar-trigger"));
    expect(
      screen.getByTestId("hero-sequential-picker").getAttribute("data-md3-overlay")
    ).toBe("true");

    const root = screen.getByTestId("hero-level-spirit-calculator");
    expect(getMaxBorderedContainerDepth(root)).toBeLessThanOrEqual(1);
    expect(findMicroTextElements(root)).toEqual([]);
    expect(findMonoElementsWithVietnamese(root)).toEqual([]);
  });
});

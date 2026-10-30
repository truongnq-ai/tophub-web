import React from "react";
import { describe, expect, it } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import {
  type FactionCalculationMode,
  type FactionProgressPoint,
} from "../src/content/calculators/faction-level-data";
import { FactionLevelSelector } from "../src/components/calculators/faction-level-selector";
import { getCalculatorToolBySlug } from "../src/content/calculators/registry";
import { FactionLevelCalculator } from "../src/components/calculators/faction-level-calculator";
import {
  ALL_SIDE_BORDER_REGEX,
  countMicroTextOccurrences,
  findMicroTextElements,
  findMonoElementsWithVietnamese,
  getMaxBorderedContainerDepth,
  readSource,
} from "./utils/md3-audit";

function FactionSelectorHarness({
  initialPoint = { level: 30, completedBars: 12 },
  mode = "ssot_verified",
}: {
  readonly initialPoint?: FactionProgressPoint;
  readonly mode?: FactionCalculationMode;
}) {
  const [point, setPoint] = React.useState<FactionProgressPoint>(initialPoint);
  return (
    <FactionLevelSelector
      idPrefix="to"
      title="Cấp Phe Mục Tiêu"
      point={point}
      mode={mode}
      locale="vi"
      onChangePoint={setPoint}
    />
  );
}

const PRESET_TEST_IDS = [
  "to-faction-preset-base-btn",
  "to-faction-preset-lv10-btn",
  "to-faction-preset-lv20-btn",
  "to-faction-preset-lv30-btn",
  "to-faction-preset-lv40-btn",
  "to-faction-preset-lv50-btn",
  "to-faction-preset-lv80-btn",
] as const;

describe("Phase 2 — 2.2 / FactionLevelSelector MD3", () => {
  it("faction-level-selector.tsx contains zero text-[8px..11px] classes", () => {
    expect(
      countMicroTextOccurrences(
        readSource("src/components/calculators/faction-level-selector.tsx")
      )
    ).toBe(0);
  });

  it("renders Faction Level and EXP Bars rows as a flat hairline list under an MD3 heading", () => {
    render(<FactionSelectorHarness />);
    const title = screen.getByTestId("to-faction-selector-title");
    expect(title.tagName).toBe("H3");
    expect(title.className).toContain("font-heading");
    expect(title.className).not.toContain("font-mono");
    expect(title.className).not.toContain("uppercase");

    const list = screen.getByTestId("to-faction-selector-list");
    expect(list.className).toContain("divide-y");
    const rows = within(list).getAllByRole("listitem");
    expect(rows).toHaveLength(2);
    for (const row of rows) {
      expect(row.className).not.toMatch(ALL_SIDE_BORDER_REGEX);
    }
  });

  it("uses ≥44px presets and steppers for both Level and EXP Bars", () => {
    render(<FactionSelectorHarness />);
    for (const id of PRESET_TEST_IDS) {
      expect(screen.getByTestId(id).className).toContain("min-h-[44px]");
    }
    expect(screen.getByTestId("to-faction-level-minus-btn").className).toContain(
      "h-11"
    );
    expect(screen.getByTestId("to-faction-level-plus-btn").className).toContain(
      "w-11"
    );
    expect(screen.getByTestId("to-faction-bars-minus-btn").className).toContain(
      "h-11"
    );
    expect(screen.getByTestId("to-faction-bars-plus-btn").className).toContain(
      "w-11"
    );
  });

  it("keeps a single bordered layer, no micro-text and no mono on Vietnamese", () => {
    const { container } = render(<FactionSelectorHarness />);
    expect(
      getMaxBorderedContainerDepth(screen.getByTestId("to-faction-selector"))
    ).toBe(1);
    expect(findMicroTextElements(container)).toEqual([]);
    expect(findMonoElementsWithVietnamese(container)).toEqual([]);
  });

  it("preserves milestone preset and EXP bar stepper behavior", () => {
    render(<FactionSelectorHarness />);
    fireEvent.click(screen.getByTestId("to-faction-preset-lv40-btn"));
    expect(screen.getByTestId("to-faction-level-badge").textContent).toBe(
      "Lv.40/80"
    );
    expect(screen.getByTestId("to-faction-bars-badge").textContent).toBe(
      "12/12"
    );
    expect(
      screen.getByTestId("to-cumulative-meat-badge").textContent
    ).toContain("692.16M");

    fireEvent.click(screen.getByTestId("to-faction-bars-minus-btn"));
    expect(screen.getByTestId("to-faction-bars-badge").textContent).toBe(
      "11/12"
    );
  });
});

describe("Phase 2 — 2.2 / FactionLevelCalculator MD3", () => {
  const selection = getCalculatorToolBySlug("skills-faction", "faction-level")!;
  const renderCalculator = () =>
    render(
      <FactionLevelCalculator
        zone={selection.zone}
        category={selection.category}
        tool={selection.tool}
        locale="vi"
      />
    );

  it("faction-level-calculator.tsx contains zero text-[8px..11px] classes", () => {
    expect(
      countMicroTextOccurrences(
        readSource("src/components/calculators/faction-level-calculator.tsx")
      )
    ).toBe(0);
  });

  it("uses a flat header, 30–36px dual metrics and 16px/44px inputs with an accessible [i] button", () => {
    renderCalculator();
    expect(screen.getByTestId("calculator-tool-header").className).not.toMatch(
      ALL_SIDE_BORDER_REGEX
    );

    const meatVal = screen.getByTestId("faction-required-meat-value");
    expect(meatVal.className).toContain("text-3xl");
    expect(
      screen.getByTestId("faction-required-shards-value").className
    ).toContain("sm:text-4xl");

    for (const id of [
      "faction-owned-meat-input",
      "faction-owned-shards-input",
    ]) {
      const input = screen.getByTestId(id);
      expect(input.className).toContain("h-11");
      expect(input.className).toContain("text-base");
      expect(input.getAttribute("type")).toBe("text");
    }

    const infoBtn = screen.getByTestId("toggle-faction-breakdown-btn");
    expect(infoBtn.className).toContain("h-11");
    expect(infoBtn.getAttribute("aria-label")).toBeTruthy();
  });

  it("renders the tier breakdown table without a nested bordered wrapper", () => {
    renderCalculator();
    fireEvent.click(screen.getByTestId("toggle-faction-breakdown-btn"));

    const panel = screen.getByTestId("faction-breakdown-panel");
    expect(getMaxBorderedContainerDepth(panel)).toBe(1);
    const heading = within(panel).getByRole("heading", { level: 2 });
    expect(heading.className).toContain("font-heading");
    expect(heading.className).not.toContain("font-mono");

    const table = screen.getByTestId("faction-breakdown-table");
    expect(table.parentElement?.className ?? "").not.toMatch(
      ALL_SIDE_BORDER_REGEX
    );
    expect(table.querySelector("thead tr")?.className).toContain("font-sans");
    expect(table.querySelector("tbody")?.className).not.toContain("font-mono");
  });

  it("keeps warnings at 44px CTAs and ≤ 1 bordered layer with zero micro/mono-Vietnamese text", () => {
    renderCalculator();
    // Step down target level from 40 to 39 to trigger near-Aura advisory
    fireEvent.click(screen.getByTestId("to-faction-level-minus-btn"));
    expect(
      screen.getByTestId("push-to-next-aura-milestone-btn").className
    ).toContain("min-h-[44px]");

    fireEvent.click(screen.getByTestId("toggle-faction-breakdown-btn"));

    const root = screen.getByTestId("faction-level-calculator");
    expect(getMaxBorderedContainerDepth(root)).toBeLessThanOrEqual(1);
    expect(findMicroTextElements(root)).toEqual([]);
    expect(findMonoElementsWithVietnamese(root)).toEqual([]);
  });
});

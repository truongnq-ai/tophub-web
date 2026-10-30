import React from "react";
import { describe, expect, it } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import {
  type SkillLevelsTuple,
  type SkillSlotCount,
  type SkillSlotIndex,
} from "../src/content/calculators/skill-books-data";
import { HeroSkillSlotsSelector } from "../src/components/calculators/hero-skill-slots-selector";
import { getCalculatorToolBySlug } from "../src/content/calculators/registry";
import { SkillBooksCalculator } from "../src/components/calculators/skill-books-calculator";
import {
  ALL_SIDE_BORDER_REGEX,
  countMicroTextOccurrences,
  findMicroTextElements,
  findMonoElementsWithVietnamese,
  getMaxBorderedContainerDepth,
  readSource,
} from "./utils/md3-audit";

function SkillSlotsHarness({
  initialSlotCount = 5,
}: {
  readonly initialSlotCount?: SkillSlotCount;
}) {
  const [levels, setLevels] = React.useState<SkillLevelsTuple>([
    1, 1, 1, 1, 1, 1,
  ]);
  const handleChangeSlot = (slotIndex: SkillSlotIndex, nextLevel: number) => {
    setLevels((prev) => {
      const next: [number, number, number, number, number, number] = [...prev];
      next[slotIndex] = nextLevel;
      return next;
    });
  };
  return (
    <HeroSkillSlotsSelector
      idPrefix="to"
      title="Cấp Kỹ Năng Mục Tiêu"
      slotCount={initialSlotCount}
      levels={levels}
      locale="vi"
      onChangeSlotLevel={handleChangeSlot}
      onApplyPreset={setLevels}
    />
  );
}

const PRESET_TEST_IDS = [
  "to-skill-preset-lv1-btn",
  "to-skill-preset-lv5-btn",
  "to-skill-preset-lv10-btn",
  "to-skill-preset-lv12-btn",
  "to-skill-preset-carry-btn",
  "to-skill-preset-support-btn",
  "to-skill-preset-lv15-btn",
] as const;

describe("Phase 2 — 2.1 / HeroSkillSlotsSelector MD3", () => {
  it("hero-skill-slots-selector.tsx contains zero text-[8px..11px] classes", () => {
    expect(
      countMicroTextOccurrences(
        readSource("src/components/calculators/hero-skill-slots-selector.tsx")
      )
    ).toBe(0);
  });

  it("renders active skill slots as a flat hairline list under an MD3 heading", () => {
    render(<SkillSlotsHarness initialSlotCount={5} />);
    const title = screen.getByTestId("to-skill-slots-title");
    expect(title.tagName).toBe("H3");
    expect(title.className).toContain("font-heading");
    expect(title.className).not.toContain("font-mono");
    expect(title.className).not.toContain("uppercase");

    const list = screen.getByTestId("to-skill-slot-list");
    expect(list.className).toContain("divide-y");
    const rows = within(list).getAllByRole("listitem");
    expect(rows).toHaveLength(5);
    for (const row of rows) {
      expect(row.className).not.toMatch(ALL_SIDE_BORDER_REGEX);
    }
  });

  it("uses ≥44px presets and steppers across all slots", () => {
    render(<SkillSlotsHarness initialSlotCount={6} />);
    for (const id of PRESET_TEST_IDS) {
      expect(screen.getByTestId(id).className).toContain("min-h-[44px]");
    }
    for (const slot of [1, 2, 3, 4, 5, 6]) {
      expect(
        screen.getByTestId(`to-skill-slot-${slot}-minus-btn`).className
      ).toContain("h-11");
      expect(
        screen.getByTestId(`to-skill-slot-${slot}-plus-btn`).className
      ).toContain("w-11");
    }
  });

  it("keeps a single bordered layer, no micro-text and no mono on Vietnamese", () => {
    const { container } = render(<SkillSlotsHarness initialSlotCount={5} />);
    expect(
      getMaxBorderedContainerDepth(
        screen.getByTestId("to-skill-slots-selector")
      )
    ).toBe(1);
    expect(findMicroTextElements(container)).toEqual([]);
    expect(findMonoElementsWithVietnamese(container)).toEqual([]);
  });

  it("preserves preset and stepper behavior", () => {
    render(<SkillSlotsHarness initialSlotCount={5} />);
    fireEvent.click(screen.getByTestId("to-skill-preset-lv10-btn"));
    expect(screen.getByTestId("to-skill-slot-1-level-badge").textContent).toBe(
      "Lv.10/15"
    );
    expect(
      screen.getByTestId("to-cumulative-books-badge").textContent
    ).toContain("40,000");

    fireEvent.click(screen.getByTestId("to-skill-slot-1-plus-btn"));
    expect(screen.getByTestId("to-skill-slot-1-level-badge").textContent).toBe(
      "Lv.11/15"
    );
  });
});

describe("Phase 2 — 2.1 / SkillBooksCalculator MD3", () => {
  const selection = getCalculatorToolBySlug("skills-faction", "skill-books")!;
  const renderCalculator = () =>
    render(
      <SkillBooksCalculator
        zone={selection.zone}
        category={selection.category}
        tool={selection.tool}
        locale="vi"
      />
    );

  it("skill-books-calculator.tsx contains zero text-[8px..11px] classes", () => {
    expect(
      countMicroTextOccurrences(
        readSource("src/components/calculators/skill-books-calculator.tsx")
      )
    ).toBe(0);
  });

  it("uses a flat header, 30–36px display metric and 16px/44px input with an accessible [i] button", () => {
    renderCalculator();
    expect(screen.getByTestId("calculator-tool-header").className).not.toMatch(
      ALL_SIDE_BORDER_REGEX
    );

    const requiredValue = screen.getByTestId("skill-books-required-value");
    expect(requiredValue.className).toContain("text-3xl");
    expect(requiredValue.className).toContain("sm:text-4xl");

    const input = screen.getByTestId("skill-books-owned-input");
    expect(input.className).toContain("h-11");
    expect(input.className).toContain("text-base");
    expect(input.getAttribute("type")).toBe("text");

    const infoBtn = screen.getByTestId("toggle-skill-books-breakdown-btn");
    expect(infoBtn.className).toContain("h-11");
    expect(infoBtn.getAttribute("aria-label")).toBeTruthy();
  });

  it("renders the skill slot breakdown table without a nested bordered wrapper", () => {
    renderCalculator();
    fireEvent.click(screen.getByTestId("toggle-skill-books-breakdown-btn"));

    const panel = screen.getByTestId("skill-books-breakdown-panel");
    expect(getMaxBorderedContainerDepth(panel)).toBe(1);
    const heading = within(panel).getByRole("heading", { level: 2 });
    expect(heading.className).toContain("font-heading");
    expect(heading.className).not.toContain("font-mono");

    const table = screen.getByTestId("skill-books-breakdown-table");
    expect(table.parentElement?.className ?? "").not.toMatch(
      ALL_SIDE_BORDER_REGEX
    );
    expect(table.querySelector("thead tr")?.className).toContain("font-sans");
    expect(table.querySelector("tbody")?.className).not.toContain("font-mono");
  });

  it("keeps warnings at 44px CTAs and ≤ 1 bordered layer with zero micro/mono-Vietnamese text", () => {
    renderCalculator();
    fireEvent.click(screen.getByTestId("to-skill-preset-lv15-btn"));
    expect(
      screen.getByTestId("apply-carry-funnel-save-books-btn").className
    ).toContain("min-h-[44px]");

    fireEvent.click(screen.getByTestId("central-hero-avatar-trigger"));
    expect(
      screen
        .getByTestId("hero-sequential-picker")
        .getAttribute("data-md3-overlay")
    ).toBe("true");
    expect(screen.getByTestId("rarity-tab-mythic").className).toContain(
      "min-h-[56px]"
    );
    fireEvent.click(screen.getByTestId("toggle-skill-books-breakdown-btn"));

    const root = screen.getByTestId("skill-books-calculator");
    expect(getMaxBorderedContainerDepth(root)).toBeLessThanOrEqual(1);
    expect(findMicroTextElements(root)).toEqual([]);
    expect(findMonoElementsWithVietnamese(root)).toEqual([]);
  });
});

import React from "react";
import { describe, expect, it } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import {
  getHeroTraitProfile,
  type TraitLevelsTuple,
  type TraitSlotIndex,
} from "../src/content/calculators/hero-traits-data";
import { HeroTraitSlotsSelector } from "../src/components/calculators/hero-trait-slots-selector";
import {
  ALL_SIDE_BORDER_REGEX,
  countMicroTextOccurrences,
  findMicroTextElements,
  findMonoElementsWithVietnamese,
  getMaxBorderedContainerDepth,
  readSource,
} from "./utils/md3-audit";

function SlotsHarness() {
  const [levels, setLevels] = React.useState<TraitLevelsTuple>([0, 0, 0, 0]);
  const heroProfile = getHeroTraitProfile("hero-brawler", "epic");
  const handleChangeSlot = (slotIndex: TraitSlotIndex, nextLevel: number) => {
    setLevels((prev) => {
      const next: [number, number, number, number] = [...prev];
      next[slotIndex] = nextLevel;
      return next;
    });
  };
  return (
    <HeroTraitSlotsSelector
      idPrefix="to"
      title="Cấp Thiên Phú Mục Tiêu"
      levels={levels}
      heroProfile={heroProfile}
      locale="vi"
      onChangeSlotLevel={handleChangeSlot}
      onApplyPreset={setLevels}
    />
  );
}

const PRESET_TEST_IDS = [
  "to-preset-zero-btn",
  "to-preset-econ-btn",
  "to-preset-block-5-btn",
  "to-preset-block-10-btn",
  "to-preset-block-15-btn",
  "to-preset-block-20-btn",
  "to-preset-block-25-btn",
  "to-preset-max-btn",
] as const;

describe("Phase 2.4 / HeroTraitSlotsSelector MD3", () => {
  it("hero-trait-slots-selector.tsx contains zero text-[8px..11px] classes", () => {
    expect(
      countMicroTextOccurrences(
        readSource("src/components/calculators/hero-trait-slots-selector.tsx")
      )
    ).toBe(0);
  });

  it("renders the 4 trait slots as a flat hairline list under an MD3 heading", () => {
    render(<SlotsHarness />);
    const title = screen.getByTestId("to-trait-slots-title");
    expect(title.tagName).toBe("H3");
    expect(title.className).toContain("font-heading");
    expect(title.className).not.toContain("font-mono");
    expect(title.className).not.toContain("uppercase");

    const list = screen.getByTestId("to-trait-slot-list");
    expect(list.className).toContain("divide-y");
    const rows = within(list).getAllByRole("listitem");
    expect(rows).toHaveLength(4);
    for (const row of rows) {
      expect(row.className).not.toMatch(ALL_SIDE_BORDER_REGEX);
    }
  });

  it("uses ≥44px presets and steppers", () => {
    render(<SlotsHarness />);
    for (const id of PRESET_TEST_IDS) {
      expect(screen.getByTestId(id).className).toContain("min-h-[44px]");
    }
    expect(screen.getByTestId("to-preset-econ-btn").className).toContain("font-sans");
    for (const slot of [1, 2, 3, 4]) {
      expect(screen.getByTestId(`to-slot-${slot}-minus-btn`).className).toContain("h-11");
      expect(screen.getByTestId(`to-slot-${slot}-plus-btn`).className).toContain("w-11");
    }
  });

  it("keeps a single bordered layer, no micro-text and no mono on Vietnamese", () => {
    const { container } = render(<SlotsHarness />);
    expect(getMaxBorderedContainerDepth(screen.getByTestId("to-trait-slots-selector"))).toBe(1);
    expect(findMicroTextElements(container)).toEqual([]);
    expect(findMonoElementsWithVietnamese(container)).toEqual([]);
  });

  it("preserves preset and stepper behavior", () => {
    render(<SlotsHarness />);
    fireEvent.click(screen.getByTestId("to-preset-econ-btn"));
    expect(screen.getByTestId("to-slot-3-level-badge").textContent).toBe("30/30");
    expect(screen.getByTestId("to-cumulative-shards-badge").textContent).toContain("450");

    fireEvent.click(screen.getByTestId("to-slot-1-plus-btn"));
    expect(screen.getByTestId("to-slot-1-level-badge").textContent).toBe("16/30");
  });
});

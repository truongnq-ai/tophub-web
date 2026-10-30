import React from "react";
import { describe, expect, it } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import {
  applyTraitSlotLevelChange,
  getHeroTraitProfile,
  type TraitLevelsTuple,
  type TraitSlotIndex,
} from "../src/content/calculators/hero-traits-data";
import { HeroTraitSlotsSelector } from "../src/components/calculators/hero-trait-slots-selector";
import { getCalculatorToolBySlug } from "../src/content/calculators/registry";
import { HeroTraitsCalculator } from "../src/components/calculators/hero-traits-calculator";
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
    setLevels((prev) => applyTraitSlotLevelChange(prev, slotIndex, nextLevel));
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

  it("renders the 4 trait slots as a flat hairline list under an MD3 heading with accurate Locale_vi names and Diamond badges", () => {
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

    expect(list.textContent).toContain("Ô 1 • Tấn Công Anh Hùng");
    expect(list.textContent).toContain("Ô 2 • HP Anh Hùng I");
    expect(list.textContent).toContain("Ô 4 • HP Anh Hùng II");
    expect(screen.getByTestId("to-slot-1-diamond-badge").textContent).toContain("200");
    expect(screen.getByTestId("to-slot-2-diamond-badge").textContent).toContain("500");
    expect(screen.getByTestId("to-slot-3-diamond-badge").textContent).toContain("1,000");
    expect(screen.getByTestId("to-slot-4-diamond-badge").textContent).toContain("2,000");
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

  it("preserves preset and stepper behavior with 5-level step-gate auto-sync", () => {
    render(<SlotsHarness />);
    fireEvent.click(screen.getByTestId("to-preset-econ-btn"));
    expect(screen.getByTestId("to-slot-1-level-badge").textContent).toBe("25/30");
    expect(screen.getByTestId("to-slot-2-level-badge").textContent).toBe("25/30");
    expect(screen.getByTestId("to-slot-3-level-badge").textContent).toBe("30/30");
    expect(screen.getByTestId("to-slot-4-level-badge").textContent).toBe("25/30");
    expect(screen.getByTestId("to-cumulative-shards-badge").textContent).toContain("1,050");

    fireEvent.click(screen.getByTestId("to-slot-1-plus-btn"));
    expect(screen.getByTestId("to-slot-1-level-badge").textContent).toBe("26/30");
  });
});

describe("Phase 2.4 / HeroTraitsCalculator MD3 (Standard v2.0)", () => {
  const selection = getCalculatorToolBySlug("heroes", "hero-traits")!;
  const renderCalculator = () =>
    render(
      <HeroTraitsCalculator
        zone={selection.zone}
        category={selection.category}
        tool={selection.tool}
        locale="vi"
      />
    );

  it("hero-traits-calculator.tsx contains zero text-[8px..11px] classes", () => {
    expect(
      countMicroTextOccurrences(
        readSource("src/components/calculators/hero-traits-calculator.tsx")
      )
    ).toBe(0);
  });

  it("uses a flat header, 3-column R5 dual metrics with K/M compact formatting and 16px/44px inputs with an accessible [i] button", () => {
    renderCalculator();
    expect(screen.getByTestId("calculator-tool-header").className).not.toMatch(
      ALL_SIDE_BORDER_REGEX
    );

    const shards = screen.getByTestId("traits-required-shards-value");
    expect(shards.textContent).toBe("1.05K");
    expect(shards.className).toContain("text-xl");
    expect(screen.getByTestId("traits-required-diamonds-value").className).toContain(
      "text-xl"
    );

    for (const id of ["traits-owned-shards-input", "traits-owned-diamonds-input"]) {
      const input = screen.getByTestId(id);
      expect(input.className).toContain("h-11");
      expect(input.className).toContain("text-base");
    }

    const infoBtn = screen.getByTestId("toggle-traits-breakdown-btn");
    expect(infoBtn.className).toContain("h-11");
    expect(infoBtn.getAttribute("aria-label")).toBeTruthy();
  });

  it("renders the 4-slot breakdown table inside CalculatorInfoPopover (Rule R6) without a nested bordered wrapper", () => {
    renderCalculator();
    fireEvent.click(screen.getByTestId("toggle-traits-breakdown-btn"));

    const panel = screen.getByTestId("traits-breakdown-panel");
    expect(getMaxBorderedContainerDepth(panel)).toBeLessThanOrEqual(1);

    const table = screen.getByTestId("traits-breakdown-table");
    expect(table.parentElement?.className ?? "").not.toMatch(ALL_SIDE_BORDER_REGEX);
    expect(table.querySelector("thead tr")?.className).toContain("font-sans");
    expect(table.querySelector("tbody")?.className).not.toContain("font-mono");
  });

  it("keeps warnings at 44px CTAs and ≤ 1 bordered layer with zero micro/mono-Vietnamese text", () => {
    renderCalculator();
    fireEvent.click(screen.getByTestId("to-preset-max-btn"));
    expect(screen.getByTestId("lock-slot4-save-diamonds-btn").className).toContain(
      "min-h-[44px]"
    );

    fireEvent.click(screen.getByTestId("central-hero-avatar-trigger"));
    expect(screen.getByTestId("hero-sequential-picker").getAttribute("data-md3-overlay")).toBe(
      "true"
    );
    expect(screen.getByTestId("rarity-tab-mythic").className).toContain("min-h-[56px]");
    fireEvent.click(screen.getByTestId("toggle-traits-breakdown-btn"));

    const root = screen.getByTestId("hero-traits-calculator");
    expect(getMaxBorderedContainerDepth(root)).toBeLessThanOrEqual(1);
    expect(findMicroTextElements(root)).toEqual([]);
    expect(findMonoElementsWithVietnamese(root)).toEqual([]);
  });
});

import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TroopSkinsCalculator } from "../troop-skins-calculator";
import { getCalculatorToolBySlug } from "@/content/calculators/registry";
import {
  VI_DIACRITIC_REGEX,
  countMicroTextOccurrences,
  findMicroTextElements,
  findMonoElementsWithVietnamese,
  getMaxBorderedContainerDepth,
  readSource,
} from "../../../../tests/utils/md3-audit";

describe("3.1 Quân Trang — v2.0 4-Zone Architecture, 2-Step Avatar Picker, Range Slider & 3-Column K/M Resources", () => {
  const selection = getCalculatorToolBySlug("troops", "troop-skins")!;

  it("renders the 4 symmetrical v2.0 zones with clean labels ('Cấp Hiện Tại', 'Cấp Mục Tiêu', 'Tài Nguyên') and removes legacy (X)/(Y) & Control Center", () => {
    const { container } = render(
      <TroopSkinsCalculator
        zone={selection.zone}
        category={selection.category}
        tool={selection.tool}
        locale="vi"
      />
    );

    expect(
      screen.getByRole("heading", { level: 1, name: /Quân Trang/i })
    ).toBeDefined();

    // 4 Core v2.0 Zones exist
    expect(screen.getByTestId("from-troop-skins-selector")).toBeDefined();
    expect(screen.getByTestId("troop-skins-zone-avatar")).toBeDefined();
    expect(screen.getByTestId("to-troop-skins-selector")).toBeDefined();
    expect(screen.getByTestId("troop-skins-results-panel")).toBeDefined();

    // Clean v2.0 titles without (X), (Y), Control Center, or Swap button
    expect(screen.getByTestId("from-troop-skins-title").textContent).toBe(
      "Cấp Hiện Tại"
    );
    expect(screen.getByTestId("to-troop-skins-title").textContent).toBe(
      "Cấp Mục Tiêu"
    );
    expect(container.textContent ?? "").not.toContain("(X)");
    expect(container.textContent ?? "").not.toContain("(Y)");
    expect(screen.queryByText(/Trung Tâm Điều Khiển/i)).toBeNull();
    expect(screen.queryByTestId("troop-skins-swap-btn")).toBeNull();

    // Range sliders exist on both Current and Target selectors
    expect(screen.getByTestId("from-skin-level-slider")).toBeDefined();
    expect(screen.getByTestId("to-skin-level-slider")).toBeDefined();

    // Default Legendary Lv.1 -> Lv.50 requires 20.85M (20,845,400) Glory Medals & 13 Copies
    expect(
      screen.getByTestId("troop-skins-required-medals-value").textContent
    ).toBe("20.85M");
    expect(
      screen
        .getByTestId("troop-skins-required-medals-value")
        .getAttribute("title")
    ).toBe("20,845,400");
    expect(
      screen.getByTestId("troop-skins-required-copies-value").textContent
    ).toBe("13");
  });

  it("opens 2-step sequential Avatar Picker (Step 1: Rarity ➔ Step 2: Troop Skin) and updates the central Avatar and costs", () => {
    render(
      <TroopSkinsCalculator
        zone={selection.zone}
        category={selection.category}
        tool={selection.tool}
        locale="vi"
      />
    );

    const avatarBtn = screen.getByTestId("troop-skins-central-avatar-btn");
    expect(screen.queryByTestId("troop-skins-avatar-picker-popover")).toBeNull();

    // Click central Avatar -> opens Step 1 (Choose Rarity)
    fireEvent.click(avatarBtn);
    expect(
      screen.getByTestId("troop-skins-avatar-picker-popover")
    ).toBeDefined();
    expect(
      screen.getByTestId("troop-skins-rarity-legendary-btn")
    ).toBeDefined();
    expect(screen.getByTestId("troop-skins-rarity-epic-btn")).toBeDefined();
    expect(screen.getByTestId("troop-skins-rarity-rare-btn")).toBeDefined();

    // Select Epic (50%) -> transitions to Step 2 (Skin list for Epic) and updates required medals to 10.42M
    fireEvent.click(screen.getByTestId("troop-skins-rarity-epic-btn"));
    expect(screen.getByTestId("troop-skins-picker-back-btn")).toBeDefined();
    expect(
      screen.getByTestId("troop-skins-required-medals-value").textContent
    ).toBe("10.42M");

    // Go back to Step 1 -> select Rare (25%) -> select Cavalry skin -> auto-closes Popover
    fireEvent.click(screen.getByTestId("troop-skins-picker-back-btn"));
    fireEvent.click(screen.getByTestId("troop-skins-rarity-rare-btn"));
    expect(
      screen.getByTestId("troop-skins-required-medals-value").textContent
    ).toBe("5.21M");

    fireEvent.click(screen.getByTestId("troop-skin-item-cavalry-btn"));
    expect(screen.queryByTestId("troop-skins-avatar-picker-popover")).toBeNull();
    expect(screen.getAllByText(/Kỵ Binh Nhẹ/i).length).toBeGreaterThan(0);
  });

  it("updates required Medals & Copies when changing Level via range slider, quick presets, and sublevel steppers", () => {
    render(
      <TroopSkinsCalculator
        zone={selection.zone}
        category={selection.category}
        tool={selection.tool}
        locale="vi"
      />
    );

    // Click Target preset Lv.10 ★1 -> 80.4K (80,400) Medals & 1 Copy
    fireEvent.click(screen.getByTestId("to-skin-preset-10-btn"));
    expect(
      screen.getByTestId("troop-skins-required-medals-value").textContent
    ).toBe("80.4K");
    expect(
      screen.getByTestId("troop-skins-required-copies-value").textContent
    ).toBe("1");

    // Drag Target range slider to Lv.20 -> 948.4K (948,400) Medals & 2 Copies
    fireEvent.change(screen.getByTestId("to-skin-level-slider"), {
      target: { value: "20" },
    });
    expect(
      screen.getByTestId("troop-skins-required-medals-value").textContent
    ).toBe("948.4K");
    expect(
      screen.getByTestId("troop-skins-required-copies-value").textContent
    ).toBe("2");

    // Set Current level to Lv.19 and Sublevel +1 -> remaining to Lv.20 is 1 sublevel = 86K Medals & 1 Copy
    fireEvent.change(screen.getByTestId("from-skin-level-slider"), {
      target: { value: "19" },
    });
    fireEvent.click(screen.getByTestId("from-skin-sublevel-plus-btn"));
    expect(
      screen.getByTestId("troop-skins-required-medals-value").textContent
    ).toBe("86K");
    expect(
      screen.getByTestId("troop-skins-required-copies-value").textContent
    ).toBe("1");
  });

  it("parses K/M shorthand inputs inside the 2 vertical Resource cards and displays 'Đủ nguyên liệu (+Dư ...)' when sufficient", () => {
    render(
      <TroopSkinsCalculator
        zone={selection.zone}
        category={selection.category}
        tool={selection.tool}
        locale="vi"
      />
    );

    const medalsInput = screen.getByTestId("troop-skins-owned-medals-input");
    const copiesInput = screen.getByTestId("troop-skins-owned-copies-input");

    // Default Legendary Lv.1 -> Lv.50 requires 20,845,400 Medals & 13 Copies
    // Enter 10m medals -> missing 10,845,400 (10.85M)
    fireEvent.change(medalsInput, { target: { value: "10m" } });
    expect(
      screen.getByTestId("troop-skins-missing-medals-value").textContent
    ).toBe("10.85M");

    // Enter 25m medals and 15 copies -> both sufficient with surplus
    fireEvent.change(medalsInput, { target: { value: "25m" } });
    fireEvent.change(copiesInput, { target: { value: "15" } });

    expect(
      screen.getByTestId("troop-skins-missing-medals-value").textContent
    ).toContain("Đủ nguyên liệu (+Dư 4.15M)");
    expect(
      screen.getByTestId("troop-skins-missing-copies-value").textContent
    ).toContain("Đủ nguyên liệu (+Dư 2)");
  });

  it("opens <CalculatorInfoPopover /> (i) modal with Rarity Comparison (100%/50%/25%), 6 Star Breakthrough Stages & ROI Strategy", () => {
    render(
      <TroopSkinsCalculator
        zone={selection.zone}
        category={selection.category}
        tool={selection.tool}
        locale="vi"
      />
    );

    expect(screen.queryByTestId("troop-skins-info-dialog")).toBeNull();

    fireEvent.click(screen.getByTestId("troop-skins-info-trigger"));
    expect(screen.getByTestId("troop-skins-info-dialog")).toBeDefined();
    expect(
      screen.getAllByText(/Tỷ Lệ Chi Phí Phẩm Chất/i).length
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText(/6 Chặng Đột Phá Sao/i).length
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText(/Chiến Lược Đầu Tư Quân Trang Tối Ưu/i).length
    ).toBeGreaterThan(0);

    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByTestId("troop-skins-info-dialog")).toBeNull();
  });

  it("enforces MD3 single-border containment (max depth <= 1), zero sub-12px micro-text, and zero Vietnamese in font-mono", () => {
    expect(
      countMicroTextOccurrences(
        readSource("src/components/calculators/troop-skins-calculator.tsx")
      )
    ).toBe(0);
    expect(
      countMicroTextOccurrences(
        readSource("src/components/calculators/troop-skins-selector.tsx")
      )
    ).toBe(0);

    const { container } = render(
      <TroopSkinsCalculator
        zone={selection.zone}
        category={selection.category}
        tool={selection.tool}
        locale="vi"
      />
    );

    expect(getMaxBorderedContainerDepth(container)).toBeLessThanOrEqual(1);
    expect(findMicroTextElements(container)).toEqual([]);
    expect(findMonoElementsWithVietnamese(container)).toEqual([]);
  });

  it("renders 100% pure English DOM when locale='en' with zero Vietnamese diacritics (including open Avatar Picker and Info Modal)", () => {
    const { container } = render(
      <TroopSkinsCalculator
        zone={selection.zone}
        category={selection.category}
        tool={selection.tool}
        locale="en"
      />
    );

    fireEvent.click(screen.getByTestId("troop-skins-central-avatar-btn"));
    fireEvent.click(screen.getByTestId("troop-skins-info-trigger"));

    const text = container.textContent ?? "";
    expect(text).toContain("Glory Medal");
    expect(text).toContain("Heavy Cavalry");
    expect(VI_DIACRITIC_REGEX.test(text)).toBe(false);
  });
});

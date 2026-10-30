import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SkinHonorCalculator } from "../skin-honor-calculator";
import { getCalculatorToolBySlug } from "@/content/calculators/registry";
import {
  VI_DIACRITIC_REGEX,
  countMicroTextOccurrences,
  findMicroTextElements,
  findMonoElementsWithVietnamese,
  getMaxBorderedContainerDepth,
  readSource,
} from "../../../../tests/utils/md3-audit";

describe("3.2 Vinh Dự Quân Trang — v2.0 4-Zone Architecture, 2-Step Avatar Picker, Lv.0–150 Honor & K/M Resources", () => {
  const resolved = getCalculatorToolBySlug("troops", "skin-honor")!;

  const renderCalculator = (locale: "vi" | "en" = "vi") =>
    render(
      <SkinHonorCalculator
        zone={resolved.zone}
        category={resolved.category}
        tool={resolved.tool}
        locale={locale}
      />
    );

  it("renders the 4 symmetrical v2.0 zones with single-entity (×1) default (Honor Lv.0 ➔ Lv.150 = 7.5M Medals) and clean labels without (X)/(Y) or Roster panel", () => {
    const { container } = renderCalculator("vi");

    expect(
      screen.getByRole("heading", { level: 1, name: /Vinh Dự Quân Trang/i })
    ).toBeDefined();

    // 4 Core v2.0 Zones exist
    expect(screen.getByTestId("from-skin-honor-selector")).toBeDefined();
    expect(screen.getByTestId("skin-honor-zone-avatar")).toBeDefined();
    expect(screen.getByTestId("to-skin-honor-selector")).toBeDefined();
    expect(screen.getByTestId("skin-honor-results-panel")).toBeDefined();

    // Roster Staircase Panel is removed from the main screen (Rule R1 & R6)
    expect(screen.queryByTestId("skin-honor-staircase-panel")).toBeNull();
    expect(screen.queryByTestId("roster-legendary-count-input")).toBeNull();

    // Clean labels without (X) and (Y) (Rule R4)
    expect(screen.getByText("Vinh Dự Hiện Tại")).toBeDefined();
    expect(screen.getByText("Vinh Dự Mục Tiêu")).toBeDefined();
    expect(container.textContent ?? "").not.toContain("(X)");
    expect(container.textContent ?? "").not.toContain("(Y)");

    // Default: Legendary Heavy Cavalry, Honor Lv.0 -> Lv.150 = 7.5M Medals
    expect(screen.getAllByText(/Kỵ Binh Thiết Giáp/i).length).toBeGreaterThan(
      0
    );
    expect(screen.getByTestId("skin-honor-net-medals-value").textContent).toBe(
      "7.5M"
    );
    expect(
      screen.getByTestId("skin-honor-net-medals-value").getAttribute("title")
    ).toBe("7,500,000");
  });

  it("opens 2-step sequential Avatar Picker (Step 1: Rarity ➔ Step 2: Troop Skin) and updates required Honor medals", () => {
    renderCalculator("vi");

    const avatarBtn = screen.getByTestId("skin-honor-central-avatar-btn");
    expect(
      screen.queryByTestId("skin-honor-avatar-picker-popover")
    ).toBeNull();

    // Click central Avatar -> opens Step 1 (3 Rarity options)
    fireEvent.click(avatarBtn);
    expect(
      screen.getByTestId("skin-honor-avatar-picker-popover")
    ).toBeDefined();
    expect(
      screen.getByTestId("skin-honor-rarity-legendary-btn")
    ).toBeDefined();
    expect(screen.getByTestId("skin-honor-rarity-epic-btn")).toBeDefined();
    expect(screen.getByTestId("skin-honor-rarity-rare-btn")).toBeDefined();

    // Select Epic (50% cost: 25K/level -> 3.75M for Lv.0 -> Lv.150) -> advances to Step 2
    fireEvent.click(screen.getByTestId("skin-honor-rarity-epic-btn"));
    expect(screen.getByTestId("skin-honor-picker-back-btn")).toBeDefined();

    // Select first Epic skin -> closes popover and updates required medals to 3.75M
    fireEvent.click(screen.getByTestId("skin-honor-item-samurai-btn"));
    expect(
      screen.queryByTestId("skin-honor-avatar-picker-popover")
    ).toBeNull();
    expect(screen.getByTestId("skin-honor-net-medals-value").textContent).toBe(
      "3.75M"
    );
  });

  it("supports K/M shorthand inputs for Owned Glory Medals & Duplicate Copies and updates Missing/Saved amounts", () => {
    renderCalculator("vi");

    // Default Legendary Lv.0 -> Lv.150 = 7.5M Medals
    // Enter 10 duplicate copies -> covers +50 levels in Tier 1 -> saves 2.5M Medals -> Net Required = 5M
    const copiesInput = screen.getByTestId("skin-honor-owned-copies-input");
    fireEvent.change(copiesInput, { target: { value: "10" } });
    expect(screen.getByTestId("skin-honor-net-medals-value").textContent).toBe(
      "5M"
    );
    expect(screen.getByTestId("skin-honor-copies-used-value").textContent).toContain(
      "10"
    );
    expect(screen.getByTestId("skin-honor-medals-saved-value").textContent).toBe(
      "2.5M"
    );

    // Enter 2m owned medals -> Missing = 3M
    const medalsInput = screen.getByTestId("skin-honor-owned-medals-input");
    fireEvent.change(medalsInput, { target: { value: "2m" } });
    expect(
      screen.getByTestId("skin-honor-missing-medals-value").textContent
    ).toBe("3M");

    // Enter 6m owned medals -> Sufficient (+Dư 1M)
    fireEvent.change(medalsInput, { target: { value: "6m" } });
    expect(
      screen.getByTestId("skin-honor-missing-medals-value").textContent
    ).toMatch(/Đủ nguyên liệu/i);
  });

  it("opens shared <CalculatorInfoPopover /> modal with Tier 1 / Tier 2 copy rules & Staircase ROI table", () => {
    renderCalculator("vi");

    const infoTrigger = screen.getByTestId("skin-honor-info-trigger");
    expect(screen.queryByTestId("skin-honor-info-dialog")).toBeNull();

    fireEvent.click(infoTrigger);
    const dialog = screen.getByTestId("skin-honor-info-dialog");
    expect(dialog).toBeDefined();
    expect(dialog.textContent).toContain("7.5M");
    expect(dialog.textContent).toContain("3.75M");
    expect(dialog.textContent).toContain("1.88M");
  });

  it("passes MD3 single-layer border depth, zero micro-text, and 100% English purity when locale='en'", () => {
    expect(
      countMicroTextOccurrences(
        readSource("src/components/calculators/skin-honor-selector.tsx")
      )
    ).toBe(0);
    expect(
      countMicroTextOccurrences(
        readSource("src/components/calculators/skin-honor-calculator.tsx")
      )
    ).toBe(0);

    const { container } = renderCalculator("en");
    expect(getMaxBorderedContainerDepth(container)).toBeLessThanOrEqual(1);
    expect(findMicroTextElements(container)).toEqual([]);
    expect(findMonoElementsWithVietnamese(container)).toEqual([]);
    expect(container.textContent ?? "").not.toMatch(VI_DIACRITIC_REGEX);

    fireEvent.click(screen.getByTestId("skin-honor-central-avatar-btn"));
    expect(container.textContent ?? "").not.toMatch(VI_DIACRITIC_REGEX);

    fireEvent.click(screen.getByTestId("skin-honor-info-trigger"));
    expect(container.textContent ?? "").not.toMatch(VI_DIACRITIC_REGEX);
  });
});

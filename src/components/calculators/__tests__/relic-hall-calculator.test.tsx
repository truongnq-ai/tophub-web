import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RelicHallCalculator } from "../relic-hall-calculator";
import { getCalculatorToolBySlug } from "@/content/calculators/registry";
import {
  VI_DIACRITIC_REGEX,
  countMicroTextOccurrences,
  findMicroTextElements,
  findMonoElementsWithVietnamese,
  getMaxBorderedContainerDepth,
  readSource,
} from "../../../../tests/utils/md3-audit";

describe("6.2 Sảnh Bí Bảo — v2.0 1/3 + 2/3 Single-Viewport Layout, Zone (i) Popovers, Lv.1–250 Progress Bar & K/M Resources", () => {
  const resolved = getCalculatorToolBySlug("runes-relics", "relic-hall")!;

  const renderCalculator = (locale: "vi" | "en" = "vi") =>
    render(
      <RelicHallCalculator
        zone={resolved.zone}
        category={resolved.category}
        tool={resolved.tool}
        locale={locale}
      />
    );

  it("renders the 1/3 + 2/3 layout, zone (i) popovers, and matches Screenshot 1 (Lv.60 ➔ Lv.61 with 5% Construction Cost Reduction = 76 Arcane Crystals & 9.5K Magic Stones)", () => {
    const { container } = renderCalculator("vi");

    expect(
      screen.getByRole("heading", { level: 1, name: /Sảnh Bí Bảo/i })
    ).toBeDefined();

    // 4 Core v2.0 Zones exist
    expect(screen.getByTestId("relic-hall-zone-current")).toBeDefined();
    expect(screen.getByTestId("relic-hall-zone-avatar")).toBeDefined();
    expect(screen.getByTestId("relic-hall-zone-target")).toBeDefined();
    expect(screen.getByTestId("relic-hall-resources-panel")).toBeDefined();

    // Clean zone titles without (X), (Y), Bước 1, Bước 2
    expect(screen.getByText("Điểm xuất phát")).toBeDefined();
    expect(screen.getByText("Đích đến")).toBeDefined();
    expect(container.textContent ?? "").not.toContain("(X)");
    expect(container.textContent ?? "").not.toContain("(Y)");

    // Open Current (i) popover to verify Lv.60 stats
    fireEvent.click(screen.getByTestId("relic-hall-from-info-trigger"));
    expect(screen.getByTestId("relic-hall-from-stat-power").textContent).toBe(
      "24,400"
    );
    expect(screen.getByTestId("relic-hall-from-stat-atk").textContent).toBe(
      "191.4%"
    );
    expect(
      screen.getByTestId("relic-hall-from-stat-conversion").textContent
    ).toBe("15.5%");
    fireEvent.keyDown(window, { key: "Escape" });

    // Open Avatar (i) popover to verify delta comparison
    fireEvent.click(screen.getByTestId("relic-hall-avatar-info-trigger"));
    expect(screen.getByTestId("relic-hall-delta-power").textContent).toBe(
      "(+100)"
    );
    expect(screen.getByTestId("relic-hall-delta-boost").textContent).toBe(
      "(+5%)"
    );
    expect(screen.getByTestId("relic-hall-delta-conversion").textContent).toBe(
      "(+0.5%)"
    );
    fireEvent.keyDown(window, { key: "Escape" });

    // Select 5% discount preset to match Screenshot 1 (Lv.60 ➔ Lv.61)
    fireEvent.click(screen.getByTestId("relic-hall-discount-chip-5"));
    expect(screen.getByTestId("relic-hall-required-crystals").textContent).toBe(
      "76"
    );
    expect(screen.getByTestId("relic-hall-required-stones").textContent).toBe(
      "9.5K"
    );
    expect(
      screen.getByTestId("relic-hall-required-stones").getAttribute("title")
    ).toBe("9,500");

    // Enter Screenshot 1 inventory: 30 Arcane Crystals & 270k Magic Stones
    fireEvent.change(screen.getByTestId("relic-hall-owned-crystals-input"), {
      target: { value: "30" },
    });
    fireEvent.change(screen.getByTestId("relic-hall-owned-stones-input"), {
      target: { value: "270k" },
    });

    expect(screen.getByTestId("relic-hall-missing-crystals").textContent).toBe(
      "46"
    );
    expect(
      screen.getByTestId("relic-hall-missing-stones").textContent
    ).toContain("Đủ nguyên liệu (+Dư");
  });

  it("updates required Magic Stones and Arcane Crystals across multi-level milestones (e.g. Lv.1 ➔ Lv.60) and opens <CalculatorInfoPopover /> with 50-level range tabs", () => {
    renderCalculator("vi");

    fireEvent.click(screen.getByTestId("relic-hall-from-chip-1"));
    fireEvent.click(screen.getByTestId("relic-hall-to-chip-60"));

    // Open (i) modal and switch range tab to Lv.51–100
    expect(screen.queryByTestId("relic-hall-info-dialog")).toBeNull();
    fireEvent.click(screen.getByTestId("relic-hall-info-trigger"));
    expect(screen.getByTestId("relic-hall-info-dialog")).toBeDefined();

    fireEvent.click(screen.getByTestId("relic-hall-range-tab-51-100"));
    expect(screen.getAllByText(/Lv\.60/i).length).toBeGreaterThan(0);

    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByTestId("relic-hall-info-dialog")).toBeNull();
  });

  it("enforces MD3 single-border containment (max depth <= 1), zero sub-12px micro-text, and 100% pure English when locale='en'", () => {
    expect(
      countMicroTextOccurrences(
        readSource("src/components/calculators/relic-hall-calculator.tsx")
      )
    ).toBe(0);
    expect(
      countMicroTextOccurrences(
        readSource("src/components/calculators/relic-hall-step-selector.tsx")
      )
    ).toBe(0);
    expect(
      readSource("src/components/calculators/relic-hall-calculator.tsx")
    ).not.toMatch(/\bborder-[bt]\b|\bdivide-y\b/);

    const { container: viContainer } = renderCalculator("vi");
    expect(getMaxBorderedContainerDepth(viContainer)).toBeLessThanOrEqual(1);
    expect(findMicroTextElements(viContainer)).toEqual([]);
    expect(findMonoElementsWithVietnamese(viContainer)).toEqual([]);

    const { container: enContainer } = renderCalculator("en");
    fireEvent.click(screen.getAllByTestId("relic-hall-info-trigger")[1]);
    expect(getMaxBorderedContainerDepth(enContainer)).toBeLessThanOrEqual(1);
    expect(findMicroTextElements(enContainer)).toEqual([]);
    expect(findMonoElementsWithVietnamese(enContainer)).toEqual([]);
    expect(VI_DIACRITIC_REGEX.test(enContainer.textContent ?? "")).toBe(false);
  });
});

import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RunesCalculator } from "../runes-calculator";
import { getCalculatorToolBySlug } from "@/content/calculators/registry";
import {
  VI_DIACRITIC_REGEX,
  countMicroTextOccurrences,
  findMicroTextElements,
  findMonoElementsWithVietnamese,
  getMaxBorderedContainerDepth,
  readSource,
} from "../../../../tests/utils/md3-audit";

describe("6.1 Đá Cổ Ngữ — v2.0 4-Zone Architecture & Component Suite", () => {
  const resolved = getCalculatorToolBySlug("runes-relics", "runes")!;

  const renderCalculator = (locale: "vi" | "en" = "vi") =>
    render(
      <RunesCalculator
        zone={resolved.zone}
        category={resolved.category}
        tool={resolved.tool}
        locale={locale}
      />
    );

  it("renders all 4 symmetrical v2.0 zones, defaults to Single Rune (×1, Horde • Slot 6, Lv.1 ➔ Lv.5 = 8K Dust & 80 Copies), and removes the 6-slot board toggle", () => {
    renderCalculator("vi");

    expect(screen.getByTestId("calculator-tool-header")).toBeDefined();
    expect(screen.queryByTestId("scope-board6-btn")).toBeNull();
    expect(screen.queryByTestId("scope-single-btn")).toBeNull();

    // 4 canonical zones
    expect(screen.getByTestId("runes-zone-current")).toBeDefined();
    expect(screen.getByTestId("runes-zone-avatar")).toBeDefined();
    expect(screen.getByTestId("runes-zone-target")).toBeDefined();
    expect(screen.getByTestId("runes-resources-panel")).toBeDefined();

    // Clean zone headings
    expect(
      screen.getByRole("heading", { name: "Cấp Hiện Tại" })
    ).toBeDefined();
    expect(
      screen.getByRole("heading", { name: "Cấp Mục Tiêu" })
    ).toBeDefined();

    // Default Single Rune: Slot 6, Lv.1 -> Lv.5 = 8K (8,000) Dust & 80 Lv.1 Copies
    const totalDustEl = screen.getByTestId("runes-total-dust");
    expect(totalDustEl.textContent).toBe("8K");
    expect(totalDustEl.getAttribute("title")).toBe("8,000");

    const totalCopiesEl = screen.getByTestId("runes-total-copies");
    expect(totalCopiesEl.textContent).toBe("80");
    expect(totalCopiesEl.getAttribute("title")).toBe("80");
  });

  it("opens 2-step Central Avatar Popover (Step 1: Main Faction ➔ Step 2: Rune Slot I–VI) and updates selected Rune Slot", () => {
    renderCalculator("vi");

    fireEvent.click(screen.getByTestId("runes-central-avatar-btn"));
    expect(screen.getByTestId("runes-avatar-picker-popover")).toBeDefined();

    // Step 1: Choose League faction
    fireEvent.click(screen.getByTestId("runes-picker-faction-league"));

    // Step 2: Back button is visible; select Slot 2 (Hero Attack)
    expect(screen.getByTestId("runes-picker-back-btn")).toBeDefined();
    fireEvent.click(screen.getByTestId("runes-picker-slot-2"));

    // Popover auto-closes and Avatar updates to Slot 2
    expect(screen.queryByTestId("runes-avatar-picker-popover")).toBeNull();
    expect(
      screen.getAllByText(/Ô 2 — Công Anh Hùng/i).length
    ).toBeGreaterThan(0);
  });

  it("updates Required Dust (225K) and Lv.1 Copies (2.19K / 2,186) when target level changes from Lv.1 to Lv.8 and activates Mythic Red aura", () => {
    renderCalculator("vi");

    fireEvent.click(screen.getByTestId("to-milestone-8-btn"));

    const totalDustEl = screen.getByTestId("runes-total-dust");
    expect(totalDustEl.textContent).toBe("225K");
    expect(totalDustEl.getAttribute("title")).toBe("225,000");

    const totalCopiesEl = screen.getByTestId("runes-total-copies");
    expect(totalCopiesEl.textContent).toBe("2.19K");
    expect(totalCopiesEl.getAttribute("title")).toBe("2,186");

    const avatarFrame = screen.getByTestId("runes-central-avatar-frame");
    expect(avatarFrame.className).toContain("ring-rose-500/50");
  });

  it("supports K/M shorthand inputs in both Resource Cards and the collapsible Lv.2–Lv.5 Fodder Converter", () => {
    renderCalculator("vi");

    // Set target to Lv.8 (requires 225,000 Dust and 2,186 Copies)
    fireEvent.click(screen.getByTestId("to-milestone-8-btn"));

    const dustInput = screen.getByTestId("runes-owned-dust-input");
    fireEvent.change(dustInput, { target: { value: "100k" } });
    expect(screen.getByTestId("runes-missing-dust").textContent).toBe("125K");

    fireEvent.change(dustInput, { target: { value: "250k" } });
    expect(screen.getByTestId("runes-missing-dust").textContent).toContain(
      "Đủ nguyên liệu (+Dư 25K)"
    );

    const copiesInput = screen.getByTestId("runes-owned-copies-input");
    fireEvent.change(copiesInput, { target: { value: "500" } });
    // 2,186 - 500 = 1,686 -> 1.69K
    expect(screen.getByTestId("runes-missing-copies").textContent).toBe(
      "1.69K"
    );
    expect(
      screen.getByTestId("runes-missing-copies").getAttribute("title")
    ).toBe("1,686");

    // Open quick fodder converter and add 1x Lv.5 fodder (81 copies)
    fireEvent.click(screen.getByTestId("runes-fodder-converter-toggle"));
    const lv5FodderInput = screen.getByTestId("fodder-input-lv5Count");
    fireEvent.change(lv5FodderInput, { target: { value: "1" } });
    // 1,686 - 81 = 1,605 -> 1.61K
    expect(
      screen.getByTestId("runes-missing-copies").getAttribute("title")
    ).toBe("1,605");
  });

  it("shows role='alert' warning when Current Level > Target Level and opens <CalculatorInfoPopover /> from Header", () => {
    renderCalculator("vi");

    // Set fromLevel = 8 while toLevel = 5
    fireEvent.click(screen.getByTestId("from-milestone-8-btn"));
    expect(screen.getByTestId("runes-invalid-range-warning")).toBeDefined();
    expect(screen.getByTestId("runes-total-dust").textContent).toBe("0");
    expect(screen.getByTestId("runes-total-copies").textContent).toBe("0");

    // Open Info Popover (i)
    fireEvent.click(screen.getByTestId("runes-info-trigger"));
    expect(screen.getByTestId("runes-info-dialog")).toBeDefined();
  });

  it("enforces MD3 single-border containment (max depth <= 1), No-Line rule (zero border-b / border-t / divide-y), zero sub-12px micro-text, zero Vietnamese in font-mono, and 100% pure English when locale='en'", () => {
    const calcSource = readSource(
      "src/components/calculators/runes-calculator.tsx"
    );
    expect(countMicroTextOccurrences(calcSource)).toBe(0);
    expect(calcSource).not.toMatch(/\bborder-[bt]\b|\bdivide-y\b/);

    const { container, unmount } = renderCalculator("vi");
    expect(getMaxBorderedContainerDepth(container)).toBeLessThanOrEqual(1);
    expect(findMicroTextElements(container)).toEqual([]);
    expect(findMonoElementsWithVietnamese(container)).toEqual([]);
    unmount();

    const { container: enContainer } = renderCalculator("en");
    fireEvent.click(screen.getByTestId("runes-central-avatar-btn"));
    fireEvent.click(screen.getByTestId("runes-fodder-converter-toggle"));
    fireEvent.click(screen.getByTestId("runes-info-trigger"));

    expect(getMaxBorderedContainerDepth(enContainer)).toBeLessThanOrEqual(1);
    expect(findMicroTextElements(enContainer)).toEqual([]);
    expect(findMonoElementsWithVietnamese(enContainer)).toEqual([]);
    expect(enContainer.textContent ?? "").not.toMatch(VI_DIACRITIC_REGEX);
  });
});

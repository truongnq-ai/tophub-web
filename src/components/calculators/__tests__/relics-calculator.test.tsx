import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RelicsCalculator } from "../relics-calculator";
import { getCalculatorToolBySlug } from "@/content/calculators/registry";
import {
  VI_DIACRITIC_REGEX,
  countMicroTextOccurrences,
  findMicroTextElements,
  findMonoElementsWithVietnamese,
  getMaxBorderedContainerDepth,
  readSource,
} from "../../../../tests/utils/md3-audit";

describe("6.2 Bí Bảo — v2.0 4-Zone Architecture, 2-Step Avatar Picker, 0★–20★ Breakthrough & K/M Resources", () => {
  const resolved = getCalculatorToolBySlug("runes-relics", "relics")!;

  const renderCalculator = (locale: "vi" | "en" = "vi") =>
    render(
      <RelicsCalculator
        zone={resolved.zone}
        category={resolved.category}
        tool={resolved.tool}
        locale={locale}
      />
    );

  it("renders the 4 symmetrical v2.0 zones with single-entity (×1) default (0★ ➔ 8★ ROI Sweet Spot) and removes Trio (×3) mode", () => {
    const { container } = renderCalculator("vi");

    expect(
      screen.getByRole("heading", { level: 1, name: /Bí Bảo/i })
    ).toBeDefined();

    // 4 Core v2.0 Zones exist
    expect(screen.getByTestId("relics-zone-current")).toBeDefined();
    expect(screen.getByTestId("relics-zone-avatar")).toBeDefined();
    expect(screen.getByTestId("relics-zone-target")).toBeDefined();
    expect(screen.getByTestId("relics-resources-panel")).toBeDefined();

    // Trio (×3) mode buttons are completely removed (Rule R1)
    expect(screen.queryByTestId("scope-trio-btn")).toBeNull();
    expect(screen.queryByTestId("scope-single-btn")).toBeNull();

    // Clean titles without "Bước 1", "Bước 2", "(X)", "(Y)" (Rule R4)
    expect(screen.getByText("Đột Phá Hiện Tại")).toBeDefined();
    expect(screen.getByText("Đột Phá Mục Tiêu")).toBeDefined();
    expect(container.textContent ?? "").not.toContain("Bước 1 —");
    expect(container.textContent ?? "").not.toContain("Bước 2 —");
    expect(container.textContent ?? "").not.toContain("(X)");
    expect(container.textContent ?? "").not.toContain("(Y)");

    // Default: Legendary League Slot 1 (Trượng Hóa Đá), 0★ (0/5) -> 8★ (0/5)
    // Required: 330 Legendary Shards, 10 Arcane Crystals, 2K (2,000) Magic Stones
    expect(screen.getAllByText(/Trượng Hóa Đá/i).length).toBeGreaterThan(0);
    expect(screen.getByTestId("relics-required-shards").textContent).toBe(
      "330"
    );
    expect(screen.getByTestId("relics-required-crystals").textContent).toBe(
      "10"
    );
    expect(screen.getByTestId("relics-required-stones").textContent).toBe("2K");
    expect(
      screen.getByTestId("relics-required-stones").getAttribute("title")
    ).toBe("2,000");
  });

  it("opens 2-step sequential Avatar Picker (Step 1: Rarity/Faction Group ➔ Step 2: Offense/Defense/Support Relic) and auto-closes on selection", () => {
    renderCalculator("vi");

    const avatarBtn = screen.getByTestId("relics-central-avatar-btn");
    expect(screen.queryByTestId("relics-avatar-picker-popover")).toBeNull();

    // Click central Avatar -> opens Step 1 (5 Rarity/Faction groups)
    fireEvent.click(avatarBtn);
    expect(screen.getByTestId("relics-avatar-picker-popover")).toBeDefined();
    expect(screen.getByTestId("relics-group-legendary_league")).toBeDefined();
    expect(screen.getByTestId("relics-group-legendary_horde")).toBeDefined();
    expect(screen.getByTestId("relics-group-legendary_nature")).toBeDefined();
    expect(screen.getByTestId("relics-group-epic_standard")).toBeDefined();
    expect(screen.getByTestId("relics-group-rare_standard")).toBeDefined();

    // Select Horde Legendary -> transitions to Step 2
    fireEvent.click(screen.getByTestId("relics-group-legendary_horde"));
    expect(screen.getByTestId("relics-picker-back-to-group")).toBeDefined();
    expect(screen.getByTestId("relics-slot-offense")).toBeDefined();
    expect(screen.getByTestId("relics-slot-defense")).toBeDefined();
    expect(screen.getByTestId("relics-slot-support")).toBeDefined();

    // Select Slot 2 Defense (Trái Tim Rồng / Dragonheart)
    fireEvent.click(screen.getByTestId("relics-slot-defense"));
    expect(screen.queryByTestId("relics-avatar-picker-popover")).toBeNull();
    expect(screen.getAllByText(/Trái Tim Rồng/i).length).toBeGreaterThan(0);

    // Reopen picker -> select Epic Rarity -> Slot 3 Support (Đá Ánh Trăng)
    fireEvent.click(avatarBtn);
    fireEvent.click(screen.getByTestId("relics-group-epic_standard"));
    fireEvent.click(screen.getByTestId("relics-slot-support"));
    expect(screen.queryByTestId("relics-avatar-picker-popover")).toBeNull();
    expect(
      screen.getAllByText(/Mảnh Vạn Năng Bí Bảo Tím/i).length
    ).toBeGreaterThan(0);
  });

  it("updates required Shards, Arcane Crystals, and Magic Stones when selecting 0★ ➔ 20★ and sub-step petals (0/5–4/5)", () => {
    renderCalculator("vi");

    // Click Target 20★ milestone chip -> 1.8K (1,800) Shards, 185 Crystals, 40K (40,000) Magic Stones
    fireEvent.click(screen.getByTestId("relics-to-chip-20"));

    expect(screen.getByTestId("relics-required-shards").textContent).toBe(
      "1.8K"
    );
    expect(
      screen.getByTestId("relics-required-shards").getAttribute("title")
    ).toBe("1,800");
    expect(screen.getByTestId("relics-required-crystals").textContent).toBe(
      "185"
    );
    expect(screen.getByTestId("relics-required-stones").textContent).toBe(
      "40K"
    );
    expect(
      screen.getByTestId("relics-required-stones").getAttribute("title")
    ).toBe("40,000");

    // Test sub-step petals: Current 5★ (2/5) -> Target 10★ (0/5) = 336 Shards
    fireEvent.click(screen.getByTestId("relics-from-chip-5"));
    fireEvent.click(screen.getByTestId("relics-from-substep-2"));
    fireEvent.click(screen.getByTestId("relics-to-chip-10"));
    expect(screen.getByTestId("relics-required-shards").textContent).toBe(
      "336"
    );
  });

  it("supports K/M shorthand inputs in the 3 Resource cards and displays Sufficient (+Dư ...) state", () => {
    renderCalculator("vi");

    // Set Target to 20★ (1,800 Shards, 185 Crystals, 40,000 Stones)
    fireEvent.click(screen.getByTestId("relics-to-chip-20"));

    const shardsInput = screen.getByTestId("relics-owned-shards-input");
    const crystalsInput = screen.getByTestId("relics-owned-crystals-input");
    const stonesInput = screen.getByTestId("relics-owned-stones-input");

    // Enter 1k shards (800 missing), 2k crystals (surplus +1.82K), 50k stones (surplus +10K)
    fireEvent.change(shardsInput, { target: { value: "1k" } });
    fireEvent.change(crystalsInput, { target: { value: "2k" } });
    fireEvent.change(stonesInput, { target: { value: "50k" } });

    expect(screen.getByTestId("relics-missing-shards").textContent).toBe("800");
    expect(screen.getByTestId("relics-missing-crystals").textContent).toContain(
      "Đủ nguyên liệu (+Dư 1.82K)"
    );
    expect(screen.getByTestId("relics-missing-stones").textContent).toContain(
      "Đủ nguyên liệu (+Dư 10K)"
    );

    // Enter 2k shards -> Sufficient (+Dư 200)
    fireEvent.change(shardsInput, { target: { value: "2k" } });
    expect(screen.getByTestId("relics-missing-shards").textContent).toContain(
      "Đủ nguyên liệu (+Dư 200)"
    );
  });

  it("moves 20★ mechanics, -50% Star Suppression rules, SSoT 5★/8★/10★/15★/20★ table, and GAR/KvK scoring into <CalculatorInfoPopover /> (i)", () => {
    renderCalculator("vi");

    expect(screen.queryByTestId("relics-info-dialog")).toBeNull();

    // Open (i) modal
    fireEvent.click(screen.getByTestId("relics-info-trigger"));
    expect(screen.getByTestId("relics-info-dialog")).toBeDefined();
    expect(
      screen.getAllByText(/Áp Chế Sao Cam -50%|Star Rating Suppression/i).length
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText(/Bảng Cột Mốc Mảnh Bí Bảo SSoT/i).length
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText(/Bộ 3 Bí Bảo Trấn Phái Theo Phe/i).length
    ).toBeGreaterThan(0);

    // Close modal with Escape
    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByTestId("relics-info-dialog")).toBeNull();
  });

  it("enforces MD3 single-border containment (max depth <= 1), zero sub-12px micro-text, and zero Vietnamese in font-mono", () => {
    expect(
      countMicroTextOccurrences(
        readSource("src/components/calculators/relics-calculator.tsx")
      )
    ).toBe(0);
    expect(readSource("src/components/calculators/relics-calculator.tsx")).not.toMatch(/\bborder-[bt]\b|\bdivide-y\b/);

    const { container } = renderCalculator("vi");

    expect(getMaxBorderedContainerDepth(container)).toBeLessThanOrEqual(1);
    expect(findMicroTextElements(container)).toEqual([]);
    expect(findMonoElementsWithVietnamese(container)).toEqual([]);
  });

  it("renders 100% pure English copy when locale='en' with zero Vietnamese diacritics (including open Avatar Picker and Info Modal)", () => {
    const { container } = renderCalculator("en");

    fireEvent.click(screen.getByTestId("relics-central-avatar-btn"));
    fireEvent.click(screen.getByTestId("relics-info-trigger"));

    const text = container.textContent ?? "";
    expect(text).toContain("Legendary Universal Relic Shard");
    expect(text).toContain("Arcane Crystal");
    expect(text).toContain("Magic Stone");
    expect(text).toContain("Petrification Staff");
    expect(VI_DIACRITIC_REGEX.test(text)).toBe(false);
  });
});

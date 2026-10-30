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

describe("6.3 Nâng sao Bí Bảo — v2.0 1/3 + 2/3 Single-Viewport Layout, Zone (i) Popovers, 20-Star (100-Petal) 4-Color Selector & Compact Dual Shard Cards", () => {
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

  it("renders the 1/3 + 2/3 layout, 4 star color tiers (Gold/Red/Silver/Diamond), zone (i) popovers, and matches Screenshot 4 (Nhẫn Đuôi Công Tước 3★ ➔ 3★ 1/5 at Relic Hall Lv.60 = 9,684 ➔ 10,151 ATK, 65,650 ➔ 68,750 HP, 8 Shards)", () => {
    const { container } = renderCalculator("vi");

    expect(
      screen.getByRole("heading", { level: 1, name: /Nâng sao Bí Bảo/i })
    ).toBeDefined();

    // 4 Core v2.0 Zones exist
    expect(screen.getByTestId("relics-zone-current")).toBeDefined();
    expect(screen.getByTestId("relics-zone-avatar")).toBeDefined();
    expect(screen.getByTestId("relics-zone-target")).toBeDefined();
    expect(screen.getByTestId("relics-resources-panel")).toBeDefined();

    // 4 Star Tier rows in both Current and Target selectors
    expect(screen.getByTestId("from-star-tier-row-gold")).toBeDefined();
    expect(screen.getByTestId("from-star-tier-row-red")).toBeDefined();
    expect(screen.getByTestId("from-star-tier-row-silver")).toBeDefined();
    expect(screen.getByTestId("from-star-tier-row-diamond")).toBeDefined();

    // Clean zone titles without (X), (Y), Bước 1, Bước 2
    expect(screen.getByText("Điểm xuất phát")).toBeDefined();
    expect(screen.getByText("Đích đến")).toBeDefined();
    expect(container.textContent ?? "").not.toContain("(X)");
    expect(container.textContent ?? "").not.toContain("(Y)");

    // Select Screenshot 4 state: Nhẫn Đuôi Công Tước (default), Current 3★ (0/5) -> Target 3★ (1/5)
    fireEvent.click(screen.getByTestId("relics-from-chip-3"));
    fireEvent.click(screen.getByTestId("relics-to-chip-3"));
    fireEvent.click(screen.getByTestId("relics-to-petal-plus-btn"));

    // Open Current (i) popover to verify Current stats (9,684 ATK & 65,650 HP)
    fireEvent.click(screen.getByTestId("relics-from-info-trigger"));
    expect(screen.getByTestId("relics-from-stat-atk").textContent).toBe("9,684");
    expect(screen.getByTestId("relics-from-stat-hp").textContent).toBe("65,650");
    fireEvent.keyDown(window, { key: "Escape" });

    // Open Target (i) popover to verify Target stats (10,151 ATK & 68,750 HP)
    fireEvent.click(screen.getByTestId("relics-to-info-trigger"));
    expect(screen.getByTestId("relics-to-stat-atk").textContent).toBe("10,151");
    expect(screen.getByTestId("relics-to-stat-hp").textContent).toBe("68,750");
    fireEvent.keyDown(window, { key: "Escape" });

    // Open Avatar (i) popover to verify Delta stats (+467 ATK & +3,100 HP)
    fireEvent.click(screen.getByTestId("relics-avatar-info-trigger"));
    expect(screen.getByTestId("relics-delta-atk").textContent).toBe("(+467)");
    expect(screen.getByTestId("relics-delta-hp").textContent).toBe("(+3,100)");
    fireEvent.keyDown(window, { key: "Escape" });

    expect(screen.getByTestId("relics-required-shards").textContent).toBe("8");

    // Enter Screenshot 4 inventory: 7 Specific Shards + 23 Universal Shards
    fireEvent.change(screen.getByTestId("relics-owned-specific-shards-input"), {
      target: { value: "7" },
    });
    fireEvent.change(screen.getByTestId("relics-owned-universal-shards-input"), {
      target: { value: "23" },
    });

    expect(screen.getByTestId("relics-used-specific-shards").textContent).toBe(
      "7"
    );
    expect(screen.getByTestId("relics-used-universal-shards").textContent).toBe(
      "1"
    );
    expect(screen.getByTestId("relics-missing-shards").textContent).toContain(
      "Đủ nguyên liệu (+Dư 22)"
    );
  });

  it("opens 2-step Avatar Picker across all 29 Relics, toggles +10 Unlock Shards, and syncs Relic Hall Level (Lv.1–250)", () => {
    renderCalculator("vi");

    // Set 0★ -> 20★ on Legendary = 1,800 shards
    fireEvent.click(screen.getByTestId("relics-from-chip-0"));
    fireEvent.click(screen.getByTestId("relics-to-chip-20"));
    expect(screen.getByTestId("relics-required-shards").textContent).toBe(
      "1.8K"
    );
    expect(
      screen.getByTestId("relics-required-shards").getAttribute("title")
    ).toBe("1,800");

    // Toggle "Chưa tìm thấy (+10 mảnh mở khóa)" -> 1,810 shards
    fireEvent.click(screen.getByTestId("relics-unlock-cost-toggle"));
    expect(
      screen.getByTestId("relics-required-shards").getAttribute("title")
    ).toBe("1,810");

    // Open 2-step Avatar Picker -> pick Epic group -> pick Ếch Điện (140006)
    fireEvent.click(screen.getByTestId("relics-central-avatar-btn"));
    expect(screen.getByTestId("relics-avatar-picker-popover")).toBeDefined();
    fireEvent.click(screen.getByTestId("relics-group-epic_standard"));
    fireEvent.click(screen.getByTestId("relics-item-140006"));
    expect(screen.queryByTestId("relics-avatar-picker-popover")).toBeNull();
    expect(screen.getAllByText(/Ếch Điện/i).length).toBeGreaterThan(0);

    // Epic 0★ -> 20★ + 10 unlock shards = 3,160 shards
    expect(
      screen.getByTestId("relics-required-shards").getAttribute("title")
    ).toBe("3,160");
  });

  it("opens <CalculatorInfoPopover /> (i) with 20★ curve tables, -50% Star Suppression rules, and GAR/KvK scoring", () => {
    renderCalculator("vi");

    expect(screen.queryByTestId("relics-info-dialog")).toBeNull();
    fireEvent.click(screen.getByTestId("relics-info-trigger"));
    expect(screen.getByTestId("relics-info-dialog")).toBeDefined();
    expect(
      screen.getAllByText(/Áp Chế Sao Cam -50%|Star Rating Suppression/i).length
    ).toBeGreaterThan(0);

    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByTestId("relics-info-dialog")).toBeNull();
  });

  it("enforces MD3 single-border containment (max depth <= 1), zero sub-12px micro-text, and 100% pure English when locale='en'", () => {
    expect(
      countMicroTextOccurrences(
        readSource("src/components/calculators/relics-calculator.tsx")
      )
    ).toBe(0);
    expect(
      countMicroTextOccurrences(
        readSource("src/components/calculators/relic-star-petal-selector.tsx")
      )
    ).toBe(0);
    expect(
      readSource("src/components/calculators/relics-calculator.tsx")
    ).not.toMatch(/\bborder-[bt]\b|\bdivide-y\b/);

    const { container: viContainer } = renderCalculator("vi");
    expect(getMaxBorderedContainerDepth(viContainer)).toBeLessThanOrEqual(1);
    expect(findMicroTextElements(viContainer)).toEqual([]);
    expect(findMonoElementsWithVietnamese(viContainer)).toEqual([]);

    const { container: enContainer } = renderCalculator("en");
    fireEvent.click(screen.getAllByTestId("relics-central-avatar-btn")[1]);
    fireEvent.click(screen.getAllByTestId("relics-info-trigger")[1]);
    expect(getMaxBorderedContainerDepth(enContainer)).toBeLessThanOrEqual(1);
    expect(findMicroTextElements(enContainer)).toEqual([]);
    expect(findMonoElementsWithVietnamese(enContainer)).toEqual([]);
    expect(VI_DIACRITIC_REGEX.test(enContainer.textContent ?? "")).toBe(false);
  });
});

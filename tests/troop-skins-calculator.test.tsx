import React from "react";
import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import viMessages from "../messages/vi.json";
import { CalculatorPlaceholderView } from "../src/components/calculators/calculator-placeholder-view";
import {
  TROOP_SKIN_CATALOG,
  TROOP_SKIN_LEVEL_PRESETS,
  TROOP_SKIN_MAX_LEVEL,
  TROOP_SKIN_MIN_LEVEL,
  TROOP_SKIN_RARITIES,
  TROOP_SKIN_STEPS,
  TROOP_SKIN_TOTAL_COPIES_TO_MAX,
  calculateTroopSkinProgression,
  compareTroopSkinPoints,
  formatTroopSkinPointLabel,
  getCumulativeCopiesAtLevel,
  getCumulativeMedalsAtPoint,
  getCumulativeSublevelClicksAtPoint,
  getMaxSublevelsForLevel,
  getSkinsByRarity,
  normalizeTroopSkinPoint,
} from "../src/content/calculators/troop-skins-data";
import { getCalculatorToolBySlug } from "../src/content/calculators/registry";
import { TroopSkinsSelector } from "../src/components/calculators/troop-skins-selector";
import { TroopSkinsCalculator } from "../src/components/calculators/troop-skins-calculator";
import {
  ALL_SIDE_BORDER_REGEX,
  VI_DIACRITIC_REGEX,
  countMicroTextOccurrences,
  findMicroTextElements,
  findMonoElementsWithVietnamese,
  getMaxBorderedContainerDepth,
  readSource,
} from "./utils/md3-audit";

describe("3.1 Quân Trang (troop-skins-data) — SSoT Quantitative Engine", () => {
  it("defines 49 upgrade steps (Lv.1 -> Lv.50), 210 total sublevel clicks, and 15 Troop Skins across 3 rarities", () => {
    expect(TROOP_SKIN_MIN_LEVEL).toBe(1);
    expect(TROOP_SKIN_MAX_LEVEL).toBe(50);
    expect(TROOP_SKIN_TOTAL_COPIES_TO_MAX).toBe(13);
    expect(TROOP_SKIN_STEPS).toHaveLength(49);
    expect(TROOP_SKIN_LEVEL_PRESETS).toEqual([1, 10, 20, 30, 40, 45, 50]);

    expect(TROOP_SKIN_CATALOG).toHaveLength(15);
    expect(getSkinsByRarity("legendary")).toHaveLength(8);
    expect(getSkinsByRarity("epic")).toHaveLength(5);
    expect(getSkinsByRarity("rare")).toHaveLength(2);

    expect(
      getCumulativeSublevelClicksAtPoint({ level: 50, sublevel: 0 })
    ).toBe(210);
  });

  it("matches 100% SSoT cumulative Glory Medals for Legendary (100%), Epic (50%), and Rare (25%) across all star milestones and Lv.7 correction", () => {
    expect(TROOP_SKIN_RARITIES.legendary.costMultiplier).toBe(1);
    expect(TROOP_SKIN_RARITIES.epic.costMultiplier).toBe(0.5);
    expect(TROOP_SKIN_RARITIES.rare.costMultiplier).toBe(0.25);

    expect(
      getCumulativeMedalsAtPoint({ level: 1, sublevel: 0 }, "legendary")
    ).toBe(0);

    // Lv.7 reconciled cumulative sum (17,700 + 8,700 = 26,400, followed by Lv.8 +13,000 = 39,400)
    expect(
      getCumulativeMedalsAtPoint({ level: 7, sublevel: 0 }, "legendary")
    ).toBe(26_400);
    expect(
      getCumulativeMedalsAtPoint({ level: 7, sublevel: 0 }, "epic")
    ).toBe(13_200);
    expect(
      getCumulativeMedalsAtPoint({ level: 7, sublevel: 0 }, "rare")
    ).toBe(6_600);
    expect(
      getCumulativeMedalsAtPoint({ level: 8, sublevel: 0 }, "legendary")
    ).toBe(39_400);

    // Milestone Lv.10 ⭐
    expect(
      getCumulativeMedalsAtPoint({ level: 10, sublevel: 0 }, "legendary")
    ).toBe(80_400);
    expect(
      getCumulativeMedalsAtPoint({ level: 10, sublevel: 0 }, "epic")
    ).toBe(40_200);
    expect(
      getCumulativeMedalsAtPoint({ level: 10, sublevel: 0 }, "rare")
    ).toBe(20_100);

    // Milestone Lv.20 ⭐⭐
    expect(
      getCumulativeMedalsAtPoint({ level: 20, sublevel: 0 }, "legendary")
    ).toBe(948_400);
    expect(
      getCumulativeMedalsAtPoint({ level: 20, sublevel: 0 }, "epic")
    ).toBe(474_200);
    expect(
      getCumulativeMedalsAtPoint({ level: 20, sublevel: 0 }, "rare")
    ).toBe(237_100);

    // Lv.21 (after completing 3 sublevels of 20/1..20/3: +207,000 Legendary)
    expect(
      getCumulativeMedalsAtPoint({ level: 21, sublevel: 0 }, "legendary")
    ).toBe(1_155_400);

    // Milestone Lv.30 ⭐⭐⭐
    expect(
      getCumulativeMedalsAtPoint({ level: 30, sublevel: 0 }, "legendary")
    ).toBe(4_259_400);
    expect(
      getCumulativeMedalsAtPoint({ level: 30, sublevel: 0 }, "epic")
    ).toBe(2_129_700);
    expect(
      getCumulativeMedalsAtPoint({ level: 30, sublevel: 0 }, "rare")
    ).toBe(1_064_850);

    // Milestone Lv.40 ⭐⭐⭐⭐
    expect(
      getCumulativeMedalsAtPoint({ level: 40, sublevel: 0 }, "legendary")
    ).toBe(10_960_400);
    expect(
      getCumulativeMedalsAtPoint({ level: 40, sublevel: 0 }, "epic")
    ).toBe(5_480_200);
    expect(
      getCumulativeMedalsAtPoint({ level: 40, sublevel: 0 }, "rare")
    ).toBe(2_740_100);

    // Milestone Lv.45 ⭐⭐⭐⭐⭐
    expect(
      getCumulativeMedalsAtPoint({ level: 45, sublevel: 0 }, "legendary")
    ).toBe(15_595_400);
    expect(
      getCumulativeMedalsAtPoint({ level: 45, sublevel: 0 }, "epic")
    ).toBe(7_797_700);
    expect(
      getCumulativeMedalsAtPoint({ level: 45, sublevel: 0 }, "rare")
    ).toBe(3_898_850);

    // Milestone Lv.50 MAX (⭐⭐⭐⭐⭐⭐)
    expect(
      getCumulativeMedalsAtPoint({ level: 50, sublevel: 0 }, "legendary")
    ).toBe(20_845_400);
    expect(
      getCumulativeMedalsAtPoint({ level: 50, sublevel: 0 }, "epic")
    ).toBe(10_422_700);
    expect(
      getCumulativeMedalsAtPoint({ level: 50, sublevel: 0 }, "rare")
    ).toBe(5_211_350);
  });

  it("tracks exact duplicate skin copies across the 6 star breakthrough milestones (13 copies total)", () => {
    expect(getCumulativeCopiesAtLevel(1)).toBe(0);
    expect(getCumulativeCopiesAtLevel(9)).toBe(0);
    expect(getCumulativeCopiesAtLevel(10)).toBe(1);
    expect(getCumulativeCopiesAtLevel(19)).toBe(1);
    expect(getCumulativeCopiesAtLevel(20)).toBe(2);
    expect(getCumulativeCopiesAtLevel(29)).toBe(2);
    expect(getCumulativeCopiesAtLevel(30)).toBe(4);
    expect(getCumulativeCopiesAtLevel(39)).toBe(4);
    expect(getCumulativeCopiesAtLevel(40)).toBe(7);
    expect(getCumulativeCopiesAtLevel(44)).toBe(7);
    expect(getCumulativeCopiesAtLevel(45)).toBe(10);
    expect(getCumulativeCopiesAtLevel(49)).toBe(10);
    expect(getCumulativeCopiesAtLevel(50)).toBe(13);
  });

  it("calculates sublevel partial progress and handles reversed (level, sublevel) points accurately", () => {
    expect(getMaxSublevelsForLevel(19)).toBe(2);
    expect(getMaxSublevelsForLevel(49)).toBe(10);
    expect(getMaxSublevelsForLevel(50)).toBe(0);

    const subProgress = calculateTroopSkinProgression({
      rarity: "legendary",
      skinId: "heavy-cavalry",
      current: { level: 19, sublevel: 1 },
      target: { level: 20, sublevel: 0 },
      ownedMedals: 50_000,
      ownedCopies: 0,
    });
    expect(subProgress.medalsNeeded).toBe(86_000);
    expect(subProgress.medalsShortfall).toBe(36_000);
    expect(subProgress.copiesNeeded).toBe(1);
    expect(subProgress.copiesShortfall).toBe(1);
    expect(subProgress.totalSublevelClicks).toBe(1);

    const reversedSameLevel = calculateTroopSkinProgression({
      rarity: "legendary",
      skinId: "heavy-cavalry",
      current: { level: 25, sublevel: 2 },
      target: { level: 25, sublevel: 0 },
      ownedMedals: 0,
      ownedCopies: 0,
    });
    expect(reversedSameLevel.isReversed).toBe(true);
    expect(reversedSameLevel.medalsNeeded).toBe(220_000);
    expect(reversedSameLevel.copiesNeeded).toBe(0);
    expect(
      compareTroopSkinPoints(
        { level: 25, sublevel: 2 },
        { level: 25, sublevel: 0 }
      )
    ).toBeGreaterThan(0);

    expect(normalizeTroopSkinPoint({ level: -5, sublevel: 99 })).toEqual({
      level: 1,
      sublevel: 0,
    });
    expect(normalizeTroopSkinPoint({ level: 99, sublevel: 5 })).toEqual({
      level: 50,
      sublevel: 0,
    });
    expect(formatTroopSkinPointLabel({ level: 25, sublevel: 2 }, "vi")).toBe(
      "Lv.25 (2/3 vạch)"
    );
    expect(formatTroopSkinPointLabel({ level: 25, sublevel: 2 }, "en")).toBe(
      "Lv.25 (2/3)"
    );
  });
});

describe("3.1 Quân Trang — v2.0 4-Zone Architecture, 2-Step Central Avatar Picker & Bilingual Purity", () => {
  const selection = getCalculatorToolBySlug("troops", "troop-skins")!;

  it("contains zero sub-12px classes in troop-skins-selector.tsx and troop-skins-calculator.tsx", () => {
    expect(
      countMicroTextOccurrences(
        readSource("src/components/calculators/troop-skins-selector.tsx")
      )
    ).toBe(0);
    expect(
      countMicroTextOccurrences(
        readSource("src/components/calculators/troop-skins-calculator.tsx")
      )
    ).toBe(0);
  });

  it("renders TroopSkinsSelector with single-layer border containment (<= 1), >=44px steppers, range slider, and sublevel controls", () => {
    const { container } = render(
      <TroopSkinsSelector
        idPrefix="from"
        title="Cấp Hiện Tại"
        rarity="legendary"
        point={{ level: 25, sublevel: 1 }}
        locale="vi"
        onChangePoint={() => {}}
      />
    );

    const root = screen.getByTestId("from-troop-skins-selector");
    expect(getMaxBorderedContainerDepth(root)).toBe(1);
    expect(findMicroTextElements(container)).toEqual([]);
    expect(findMonoElementsWithVietnamese(container)).toEqual([]);

    expect(screen.getByTestId("from-skin-level-slider")).toBeDefined();
    expect(
      screen.getByTestId("from-skin-level-minus-btn").className
    ).toContain("h-11");
    expect(screen.getByTestId("from-skin-level-plus-btn").className).toContain(
      "h-11"
    );
    expect(
      screen.getByTestId("from-skin-sublevel-minus-btn").className
    ).toContain("h-11");
    expect(
      screen.getByTestId("from-skin-sublevel-plus-btn").className
    ).toContain("h-11");
  });

  it("renders TroopSkinsCalculator 4-zone v2.0 layout, switches rarity via 2-step Central Avatar Picker (100%/50%/25%), parses K/M inputs, and passes MD3 audit", () => {
    const { container } = render(
      <TroopSkinsCalculator
        zone={selection.zone}
        category={selection.category}
        tool={selection.tool}
        locale="vi"
      />
    );

    expect(screen.getByTestId("calculator-tool-header").className).not.toMatch(
      ALL_SIDE_BORDER_REGEX
    );

    // Default: Legendary Lv.1 -> Lv.50 = 20.85M Medals & 13 Copies
    expect(
      screen.getByTestId("troop-skins-required-medals-value").textContent
    ).toBe("20.85M");
    expect(
      screen.getByTestId("troop-skins-required-copies-value").textContent
    ).toBe("13");

    // Open Central Avatar Picker -> switch rarity to Epic (50%) -> 10.42M Medals
    fireEvent.click(screen.getByTestId("troop-skins-central-avatar-btn"));
    fireEvent.click(screen.getByTestId("troop-skins-rarity-epic-btn"));
    expect(
      screen.getByTestId("troop-skins-required-medals-value").textContent
    ).toBe("10.42M");

    // Back to Step 1 -> switch rarity to Rare (25%) -> 5.21M Medals
    fireEvent.click(screen.getByTestId("troop-skins-picker-back-btn"));
    fireEvent.click(screen.getByTestId("troop-skins-rarity-rare-btn"));
    expect(
      screen.getByTestId("troop-skins-required-medals-value").textContent
    ).toBe("5.21M");

    // Switch back to Legendary & select Heavy Cavalry -> click Target Preset Lv.10 ⭐ (80.4K)
    fireEvent.click(screen.getByTestId("troop-skins-picker-back-btn"));
    fireEvent.click(screen.getByTestId("troop-skins-rarity-legendary-btn"));
    fireEvent.click(screen.getByTestId("troop-skin-item-heavy-cavalry-btn"));

    fireEvent.click(screen.getByTestId("to-skin-preset-10-btn"));
    expect(
      screen.getByTestId("troop-skins-required-medals-value").textContent
    ).toBe("80.4K");
    expect(
      screen.getByTestId("troop-skins-required-copies-value").textContent
    ).toBe("1");

    // Enter "80.4k" into owned medals input -> sufficient state
    fireEvent.change(screen.getByTestId("troop-skins-owned-medals-input"), {
      target: { value: "80.4k" },
    });
    expect(
      screen.getByTestId("troop-skins-missing-medals-value").textContent
    ).toContain("Đủ nguyên liệu");

    const root = screen.getByTestId("troop-skins-calculator");
    expect(getMaxBorderedContainerDepth(root)).toBeLessThanOrEqual(1);
    expect(findMicroTextElements(container)).toEqual([]);
    expect(findMonoElementsWithVietnamese(container)).toEqual([]);
  });

  it("enforces 100% pure English DOM when locale='en' (AC-CALC-05)", () => {
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
    expect(container.textContent ?? "").not.toMatch(VI_DIACRITIC_REGEX);
  });

  it("marks troop-skins as ready in registry and mounts via CalculatorPlaceholderView with Breadcrumb and Prev/Next footer", () => {
    const freshSelection = getCalculatorToolBySlug("troops", "troop-skins")!;
    expect(freshSelection.tool.status).toBe("ready");

    render(
      <NextIntlClientProvider locale="vi" messages={viMessages}>
        <CalculatorPlaceholderView
          mode="tool"
          zone={freshSelection.zone}
          category={freshSelection.category}
          tool={freshSelection.tool}
        />
      </NextIntlClientProvider>
    );

    expect(screen.getByTestId("troop-skins-calculator")).toBeTruthy();
  });
});

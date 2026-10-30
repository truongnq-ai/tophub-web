import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { GearPromotionCalculator } from "../src/components/calculators/gear-promotion-calculator";
import {
  GEAR_PROMOTION_MASTER_RESONANCE_TIERS,
  GEAR_PROMOTION_MATERIALS,
  GEAR_PROMOTION_SETS,
  GEAR_PROMOTION_SLOTS,
  GEAR_PROMOTION_STAR_SUMMARY_TABLE,
  GEAR_PROMOTION_STEPS,
  MAX_GEAR_PROMOTION_STEP,
  MIN_GEAR_PROMOTION_STEP,
  MYTHIC_MASTER_ATTRIBUTE_TIERS,
  calculateGearPromotionPlan,
  clampGearPromotionStepIndex,
  getGearPromotionItemStatsAtStep,
} from "../src/content/calculators/gear-promotion-data";
import { getCalculatorToolBySlug } from "../src/content/calculators/registry";
import {
  countMicroTextOccurrences,
  findMonoElementsWithVietnamese,
  getMaxBorderedContainerDepth,
  readSource,
} from "./utils/md3-audit";

describe("4.2 Đột Phá Trang Bị — Suite 1: Registry SSoT & Meta.bytes Quantitative Engine (25 Cánh Sao • 4 Sao Vàng + 1 Sao Đỏ)", () => {
  it("registers tool 4.2 as '4.2 Đột Phá Trang Bị' ('4.2 Gear Promotion') with 5 ground-truth materials including Ruby in registry.ts", () => {
    const resolved = getCalculatorToolBySlug("hero-gear", "gear-promotion");
    expect(resolved).not.toBeNull();
    expect(resolved?.tool.code).toBe("4.2");
    expect(resolved?.tool.title.vi).toBe("4.2 Đột Phá Trang Bị");
    expect(resolved?.tool.title.en).toBe("4.2 Gear Promotion");
    expect(resolved?.tool.status).toBe("ready");
    expect(resolved?.tool.materials.map((m) => m.gameId)).toEqual([
      404100005, // Vàng Thái Dương
      206, // Rune Cường Hóa Trang Bị
      151, // Đá Đột Phá Trang Bị Cam
      152, // Đá Đột Phá Trang Bị Đỏ
      6, // Ruby
    ]);
  });

  it("defines 26 step nodes (0..25) with 4 Gold Stars (steps 1..20) + 1 Red Star (steps 21..25) and exact Meta.bytes costs (24,000,000 Ruby total)", () => {
    expect(MIN_GEAR_PROMOTION_STEP).toBe(0);
    expect(MAX_GEAR_PROMOTION_STEP).toBe(25);
    expect(GEAR_PROMOTION_STEPS).toHaveLength(26);
    expect(GEAR_PROMOTION_STAR_SUMMARY_TABLE).toHaveLength(5);
    expect(GEAR_PROMOTION_MASTER_RESONANCE_TIERS).toHaveLength(5);
    expect(MYTHIC_MASTER_ATTRIBUTE_TIERS).toHaveLength(18);

    // Step 0: Base 0★ Legendary Lv.40
    expect(GEAR_PROMOTION_STEPS[0].star).toBe(0);
    expect(GEAR_PROMOTION_STEPS[0].petal).toBe(0);
    expect(GEAR_PROMOTION_STEPS[0].starColor).toBe("none");
    expect(GEAR_PROMOTION_STEPS[0].cumulativeSolarGold).toBe(0);
    expect(GEAR_PROMOTION_STEPS[0].cumulativeEnhanceRune).toBe(0);
    expect(GEAR_PROMOTION_STEPS[0].cumulativeRuby).toBe(0);

    // Stars 1★..4★ (steps 1..20) are Gold ("gold")
    for (let s = 1; s <= 20; s++) {
      expect(GEAR_PROMOTION_STEPS[s].starColor).toBe("gold");
      expect(GEAR_PROMOTION_STEPS[s].rarity).toBe("legendary");
    }

    // Star 5★ (steps 21..25) is Red ("red")
    for (let s = 21; s <= 25; s++) {
      expect(GEAR_PROMOTION_STEPS[s].starColor).toBe("red");
    }
    expect(GEAR_PROMOTION_STEPS[25].rarity).toBe("mythic");
    expect(GEAR_PROMOTION_STEPS[25].isMythicAscension).toBe(true);

    // Step 1 (1★ Petal 1/5): 150 Solar Gold, 12,500 Rune, 750,000 Ruby, 0 Stones
    expect(GEAR_PROMOTION_STEPS[1].stepSolarGold).toBe(150);
    expect(GEAR_PROMOTION_STEPS[1].stepEnhanceRune).toBe(12_500);
    expect(GEAR_PROMOTION_STEPS[1].stepRuby).toBe(750_000);
    expect(GEAR_PROMOTION_STEPS[1].stepLegendaryStone).toBe(0);

    // Step 5 (1★ Petal 5/5 Breakthrough): 150 Solar Gold, 12,500 Rune, 0 Ruby, 5 Legendary Stones
    expect(GEAR_PROMOTION_STEPS[5].stepRuby).toBe(0);
    expect(GEAR_PROMOTION_STEPS[5].stepLegendaryStone).toBe(5);
    expect(GEAR_PROMOTION_STEPS[5].cumulativeSolarGold).toBe(750);
    expect(GEAR_PROMOTION_STEPS[5].cumulativeEnhanceRune).toBe(62_500);
    expect(GEAR_PROMOTION_STEPS[5].cumulativeRuby).toBe(3_000_000);
    expect(GEAR_PROMOTION_STEPS[5].cumulativeLegendaryStone).toBe(5);

    // Step 16..19 (4★ Petals 1..4): Exact Meta.bytes Ruby cost is 1,425,000 / petal (NOT 1,420,000)
    expect(GEAR_PROMOTION_STEPS[16].stepRuby).toBe(1_425_000);
    expect(GEAR_PROMOTION_STEPS[20].cumulativeSolarGold).toBe(4_350);
    expect(GEAR_PROMOTION_STEPS[20].cumulativeEnhanceRune).toBe(362_500);
    expect(GEAR_PROMOTION_STEPS[20].cumulativeRuby).toBe(17_400_000);
    expect(GEAR_PROMOTION_STEPS[20].cumulativeLegendaryStone).toBe(50);
    expect(GEAR_PROMOTION_STEPS[20].cumulativeMythicStone).toBe(0);

    // Step 25 (5★ Đỏ / Mythic Ascension): 6,000 Solar Gold, 500,000 Rune, 24,000,000 Ruby, 50 Leg Stones, 10 Mythic Stones
    expect(GEAR_PROMOTION_STEPS[25].cumulativeSolarGold).toBe(6_000);
    expect(GEAR_PROMOTION_STEPS[25].cumulativeEnhanceRune).toBe(500_000);
    expect(GEAR_PROMOTION_STEPS[25].cumulativeRuby).toBe(24_000_000);
    expect(GEAR_PROMOTION_STEPS[25].cumulativeLegendaryStone).toBe(50);
    expect(GEAR_PROMOTION_STEPS[25].cumulativeMythicStone).toBe(10);

    expect(clampGearPromotionStepIndex(-5)).toBe(0);
    expect(clampGearPromotionStepIndex(99)).toBe(25);
  });

  it("catalogs all 4 Equipment Sets × 4 Slots = 16 items with legendaryIconPath and mythicIconPath (break_icon) from Meta.bytes", () => {
    expect(GEAR_PROMOTION_SETS.map((s) => s.id)).toEqual([
      "knights_glory",
      "titans_might",
      "fury_of_blood",
      "commanders_set",
    ]);
    expect(GEAR_PROMOTION_SLOTS.map((s) => s.id)).toEqual([
      "weapon",
      "boots",
      "armor",
      "helmet",
    ]);

    for (const setMeta of GEAR_PROMOTION_SETS) {
      for (const slotMeta of GEAR_PROMOTION_SLOTS) {
        const piece = setMeta.items[slotMeta.id];
        expect(piece.gameId).toBeGreaterThanOrEqual(1501);
        expect(piece.legendaryIconPath.startsWith("/images/equipment/hero-gear/")).toBe(true);
        expect(piece.mythicIconPath.startsWith("/images/equipment/hero-gear/")).toBe(true);
        expect(piece.legendaryIconPath).not.toBe(piece.mythicIconPath);
      }
    }

    // Verify Knight's Soul Boots (1533) stats at step 0 vs step 25
    const step0Stats = getGearPromotionItemStatsAtStep("knights_glory", "boots", 0);
    const step25Stats = getGearPromotionItemStatsAtStep("knights_glory", "boots", 25);
    expect(step0Stats.isMythicAscended).toBe(false);
    expect(step25Stats.isMythicAscended).toBe(true);
    expect(step25Stats.totalAtk).toBeGreaterThan(step0Stats.totalAtk);
    expect(step25Stats.totalHp).toBeGreaterThan(step0Stats.totalHp);
  });

  it("calculates single-piece (×1) promotion requirements, owned deductions, surpluses, and invalid range guards across all 5 materials", () => {
    expect(GEAR_PROMOTION_MATERIALS.map((m) => m.key)).toEqual([
      "solarGold",
      "enhanceRune",
      "legendaryStone",
      "mythicStone",
      "ruby",
    ]);

    const fullPlan = calculateGearPromotionPlan({
      setId: "knights_glory",
      slotId: "boots",
      fromStepIndex: 0,
      toStepIndex: 25,
      owned: {
        solarGold: 2_000,
        enhanceRune: 600_000,
        legendaryStone: 30,
        mythicStone: 4,
        ruby: 10_000_000,
      },
    });

    expect(fullPlan.isInvalidRange).toBe(false);
    expect(fullPlan.stepDelta).toBe(25);
    expect(fullPlan.requiredByKey.solarGold).toBe(6_000);
    expect(fullPlan.requiredByKey.enhanceRune).toBe(500_000);
    expect(fullPlan.requiredByKey.legendaryStone).toBe(50);
    expect(fullPlan.requiredByKey.mythicStone).toBe(10);
    expect(fullPlan.requiredByKey.ruby).toBe(24_000_000);

    expect(fullPlan.missingByKey.solarGold).toBe(4_000);
    expect(fullPlan.missingByKey.enhanceRune).toBe(0);
    expect(fullPlan.surplusByKey.enhanceRune).toBe(100_000);
    expect(fullPlan.missingByKey.legendaryStone).toBe(20);
    expect(fullPlan.missingByKey.mythicStone).toBe(6);
    expect(fullPlan.missingByKey.ruby).toBe(14_000_000);

    // Sub-tier 1 -> 4 inside 1★ requires 0 Promotion Stones (100% completion without NaN)
    const petalsOnly = calculateGearPromotionPlan({
      fromStepIndex: 1,
      toStepIndex: 4,
    });
    expect(petalsOnly.requiredByKey.solarGold).toBe(450);
    expect(petalsOnly.requiredByKey.enhanceRune).toBe(37_500);
    expect(petalsOnly.requiredByKey.ruby).toBe(2_250_000);
    expect(petalsOnly.requiredByKey.legendaryStone).toBe(0);
    expect(petalsOnly.requiredByKey.mythicStone).toBe(0);

    // Invalid range: 20 -> 10
    const invalidPlan = calculateGearPromotionPlan({
      fromStepIndex: 20,
      toStepIndex: 10,
    });
    expect(invalidPlan.isInvalidRange).toBe(true);
    expect(invalidPlan.requiredByKey.solarGold).toBe(0);
    expect(invalidPlan.requiredByKey.ruby).toBe(0);
  });
});

describe("4.2 Đột Phá Trang Bị — Suite 2: 4-Section MD3 UI, 2-Step Avatar Picker, Horizontal Material Rows & Info Popover", () => {
  const resolved = getCalculatorToolBySlug("hero-gear", "gear-promotion")!;
  const tool = resolved.tool;

  it("renders the 4 core sections (Đột Phá Hiện Tại, Avatar Trang Bị, Đột Phá Mục Tiêu, Tài Nguyên) for 1 single piece with zero scope multipliers", () => {
    render(<GearPromotionCalculator tool={tool} locale="vi" />);

    expect(
      screen.getByRole("heading", { name: /Đột Phá Trang Bị/i })
    ).toBeDefined();

    // Verify 4 core sections exist
    expect(screen.getByTestId("gear-promotion-from-container")).toBeDefined();
    expect(screen.getByTestId("gear-promotion-central-picker-btn")).toBeDefined();
    expect(screen.getByTestId("gear-promotion-to-container")).toBeDefined();
    expect(screen.getByTestId("gear-promotion-resources-section")).toBeDefined();

    // Verify old multipliers and +Lv.40 toggle are completely removed
    expect(screen.queryByTestId("piece-preset-4")).toBeNull();
    expect(screen.queryByTestId("piece-preset-24")).toBeNull();
    expect(screen.queryByTestId("toggle-base-lv40-enhance")).toBeNull();

    // Verify default 0/25 -> 25/25 1-piece required totals on the 5 vertical material cards
    expect(screen.getByTestId("promo-required-solarGold").textContent).toContain("6K");
    expect(screen.getByTestId("promo-required-enhanceRune").textContent).toContain("500K");
    expect(screen.getByTestId("promo-required-legendaryStone").textContent).toContain("50");
    expect(screen.getByTestId("promo-required-mythicStone").textContent).toContain("10");
    expect(screen.getByTestId("promo-required-ruby").textContent).toContain("24M");
  });

  it("switches equipment Set & Slot via the 2-step Central Avatar Popover and toggles Mythic Red break_icon at 25/25", () => {
    render(<GearPromotionCalculator tool={tool} locale="vi" />);

    const centralBtn = screen.getByTestId("gear-promotion-central-picker-btn");
    // At default target 25/25 (5★ Đỏ), central avatar uses mythicIconPath (icon_42064.webp for Giày Hồn Kỵ Sĩ)
    expect(centralBtn.getAttribute("data-gear-rarity")).toBe("mythic");

    // Open 2-step picker -> Step 1: Select Set (Bộ Đại Đế Thần Lực) -> Step 2: Select Slot (Vũ Khí - Búa Đại Đế)
    fireEvent.click(centralBtn);
    expect(screen.getByTestId("gear-promotion-picker-popover")).toBeDefined();

    fireEvent.click(screen.getByTestId("picker-set-titans_might"));
    fireEvent.click(screen.getByTestId("picker-slot-weapon"));

    // Popover closes automatically and updates item name to Búa Đại Đế
    expect(screen.queryByTestId("gear-promotion-picker-popover")).toBeNull();
    expect(screen.getAllByText(/Búa Đại Đế/i).length).toBeGreaterThan(0);

    // Lower target step from 25 to 20 (4★ Vàng) -> Central avatar switches to legendary rarity frame
    fireEvent.click(screen.getByTestId("gear-promotion-to-star-4"));
    expect(centralBtn.getAttribute("data-gear-rarity")).toBe("legendary");
    expect(screen.getByTestId("promo-required-solarGold").textContent).toContain("4.35K");
    expect(screen.getByTestId("promo-required-mythicStone").textContent).toBe("0");
  });

  it("supports K/M shorthand input inside the 5 horizontal resource cards and updates Missing / Surplus live", () => {
    render(<GearPromotionCalculator tool={tool} locale="vi" />);

    const solarInput = screen.getByTestId("promo-owned-input-solarGold");
    const runeInput = screen.getByTestId("promo-owned-input-enhanceRune");
    const rubyInput = screen.getByTestId("promo-owned-input-ruby");

    fireEvent.change(solarInput, { target: { value: "2.5k" } });
    fireEvent.change(runeInput, { target: { value: "600k" } });
    fireEvent.change(rubyInput, { target: { value: "10m" } });

    // 6,000 - 2,500 = 3,500 (3.5K) missing Solar Gold
    expect(screen.getByTestId("promo-missing-solarGold").textContent).toContain("3.5K");
    // 600,000 owned vs 500,000 required = +100K surplus Runes
    expect(screen.getByTestId("promo-missing-enhanceRune").textContent).toContain("+100K");
    // 24,000,000 - 10,000,000 = 14,000,000 (14M) missing Ruby
    expect(screen.getByTestId("promo-missing-ruby").textContent).toContain("14M");
  });

  it("keeps supplementary guides, Golden Set evolution, Star Master resonance, and 18-tier Mythic table inside the (i) popup", () => {
    render(<GearPromotionCalculator tool={tool} locale="vi" />);

    // Before clicking (i), the 18-tier table is not rendered on the main page
    expect(screen.queryByText("95.25%")).toBeNull();

    const triggerBtn = screen.getByTestId("gear-promotion-info-trigger");
    fireEvent.click(triggerBtn);

    expect(screen.getByTestId("gear-promotion-info-dialog")).toBeDefined();
    expect(screen.getAllByText("95.25%").length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Cộng Hưởng Bậc Thầy Đột Phá/i).length).toBeGreaterThan(0);

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByTestId("gear-promotion-info-dialog")).toBeNull();
  });

  it("enforces MD3 single-border containment (max depth <= 1), zero micro-text, and zero Vietnamese inside font-mono", () => {
    expect(
      countMicroTextOccurrences(
        readSource("src/components/calculators/gear-promotion-calculator.tsx")
      )
    ).toBe(0);
    expect(
      countMicroTextOccurrences(
        readSource("src/components/calculators/gear-promotion-step-selector.tsx")
      )
    ).toBe(0);

    const { container } = render(
      <GearPromotionCalculator tool={tool} locale="vi" />
    );

    expect(getMaxBorderedContainerDepth(container)).toBeLessThanOrEqual(1);
    expect(findMonoElementsWithVietnamese(container)).toEqual([]);
  });

  it("renders pure English copy when locale='en' with zero Vietnamese diacritics", () => {
    const { container } = render(
      <GearPromotionCalculator tool={tool} locale="en" />
    );

    const text = container.textContent ?? "";
    expect(text).toContain("Solar Gold Ingot");
    expect(text).toContain("Mythic Promotion Stone");
    expect(text).toContain("Ruby");

    const vnDiacriticsRegex =
      /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]/;
    expect(vnDiacriticsRegex.test(text)).toBe(false);
  });
});

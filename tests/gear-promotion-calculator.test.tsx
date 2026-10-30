import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { GearPromotionCalculator } from "../src/components/calculators/gear-promotion-calculator";
import {
  GEAR_GOLDEN_SETS,
  GEAR_PROMOTION_STEPS,
  MAX_GEAR_PROMOTION_STEP,
  MIN_GEAR_PROMOTION_STEP,
  MYTHIC_MASTER_ATTRIBUTE_TIERS,
  calculateGearPromotion,
  clampGearPromotionStep,
} from "../src/content/calculators/gear-promotion-data";
import { getCalculatorToolBySlug } from "../src/content/calculators/registry";
import {
  findMonoElementsWithVietnamese,
  getMaxBorderedContainerDepth,
} from "./utils/md3-audit";

describe("4.2 Đột Phá Đồ Đỏ — Suite 1: Quantitative SSoT Engine (25 Tiểu Bậc 0★ Cam ➔ 5★ Đỏ)", () => {
  it("defines 26 step nodes (0..25) matching the exact TopHeroes Tables - Max Hero Gear Promotion matrix", () => {
    expect(MIN_GEAR_PROMOTION_STEP).toBe(0);
    expect(MAX_GEAR_PROMOTION_STEP).toBe(25);
    expect(GEAR_PROMOTION_STEPS).toHaveLength(26);
    expect(MYTHIC_MASTER_ATTRIBUTE_TIERS).toHaveLength(18);
    expect(Object.keys(GEAR_GOLDEN_SETS)).toEqual([
      "fury_of_blood",
      "titans_might",
      "glorious_light",
    ]);

    // Step 0: Base 0★ Legendary Lv.40
    expect(GEAR_PROMOTION_STEPS[0].cumulativeSolarGold).toBe(0);
    expect(GEAR_PROMOTION_STEPS[0].cumulativeRunes).toBe(0);

    // Step 1 (1★ Tier 1/5): 150 Solar Gold, 12,500 Runes, 750,000 Meat, 0 Stones
    expect(GEAR_PROMOTION_STEPS[1].stepSolarGold).toBe(150);
    expect(GEAR_PROMOTION_STEPS[1].stepRunes).toBe(12_500);
    expect(GEAR_PROMOTION_STEPS[1].stepMeat).toBe(750_000);
    expect(GEAR_PROMOTION_STEPS[1].stepLegendaryStones).toBe(0);

    // Step 5 (1★ Tier 5/5 Breakthrough): 150 Solar Gold, 12,500 Runes, 0 Meat, 5 Legendary Stones
    expect(GEAR_PROMOTION_STEPS[5].stepMeat).toBe(0);
    expect(GEAR_PROMOTION_STEPS[5].stepLegendaryStones).toBe(5);
    expect(GEAR_PROMOTION_STEPS[5].cumulativeSolarGold).toBe(750);
    expect(GEAR_PROMOTION_STEPS[5].cumulativeRunes).toBe(62_500);
    expect(GEAR_PROMOTION_STEPS[5].cumulativeMeat).toBe(3_000_000);
    expect(GEAR_PROMOTION_STEPS[5].cumulativeLegendaryStones).toBe(5);

    // Step 10 (2★ Cam Full): +975 Solar Gold, +81,250 Runes, +3.9M Meat, +10 Legendary Stones
    expect(GEAR_PROMOTION_STEPS[10].cumulativeSolarGold).toBe(1_725);
    expect(GEAR_PROMOTION_STEPS[10].cumulativeRunes).toBe(143_750);
    expect(GEAR_PROMOTION_STEPS[10].cumulativeMeat).toBe(6_900_000);
    expect(GEAR_PROMOTION_STEPS[10].cumulativeLegendaryStones).toBe(15);

    // Step 15 (3★ Cam Full): +1,200 Solar Gold, +100,000 Runes, +4.8M Meat, +15 Legendary Stones
    expect(GEAR_PROMOTION_STEPS[15].cumulativeSolarGold).toBe(2_925);
    expect(GEAR_PROMOTION_STEPS[15].cumulativeRunes).toBe(243_750);
    expect(GEAR_PROMOTION_STEPS[15].cumulativeMeat).toBe(11_700_000);
    expect(GEAR_PROMOTION_STEPS[15].cumulativeLegendaryStones).toBe(30);

    // Step 20 (4★ Cam Full): +1,425 Solar Gold, +118,750 Runes, +5.68M Meat, +20 Legendary Stones
    expect(GEAR_PROMOTION_STEPS[20].cumulativeSolarGold).toBe(4_350);
    expect(GEAR_PROMOTION_STEPS[20].cumulativeRunes).toBe(362_500);
    expect(GEAR_PROMOTION_STEPS[20].cumulativeMeat).toBe(17_380_000);
    expect(GEAR_PROMOTION_STEPS[20].cumulativeLegendaryStones).toBe(50);
    expect(GEAR_PROMOTION_STEPS[20].cumulativeMythicStones).toBe(0);

    // Step 25 (5★ Đỏ / Mythic Ascension): +1,650 Solar Gold, +137,500 Runes, +6.6M Meat, +10 Mythic Stones
    expect(GEAR_PROMOTION_STEPS[25].cumulativeSolarGold).toBe(6_000);
    expect(GEAR_PROMOTION_STEPS[25].cumulativeRunes).toBe(500_000);
    expect(GEAR_PROMOTION_STEPS[25].cumulativeMeat).toBe(23_980_000);
    expect(GEAR_PROMOTION_STEPS[25].cumulativeLegendaryStones).toBe(50);
    expect(GEAR_PROMOTION_STEPS[25].cumulativeMythicStones).toBe(10);
    expect(GEAR_PROMOTION_STEPS[25].cumulativeLegendaryFodder).toBe(5);

    expect(clampGearPromotionStep(-2)).toBe(0);
    expect(clampGearPromotionStep(99)).toBe(25);
  });

  it("calculates exact promotion totals across 1 piece, 4 pieces (1 hero), and 24 pieces (Queue 1), plus optional Lv.0➔40 prerequisite", () => {
    const onePieceFull = calculateGearPromotion({
      fromStepIndex: 0,
      toStepIndex: 25,
      pieceCount: 1,
      goldenSetId: "fury_of_blood",
      includeBaseLv40Enhance: false,
      ownedSolarGold: 2_000,
      ownedRunes: 100_000,
      ownedLegendaryStones: 30,
      ownedMythicStones: 4,
      ownedMeat: 10_000_000,
    });

    expect(onePieceFull.requiredSolarGold).toBe(6_000);
    expect(onePieceFull.requiredRunes).toBe(500_000);
    expect(onePieceFull.requiredLegendaryStones).toBe(50);
    expect(onePieceFull.requiredMythicStones).toBe(10);
    expect(onePieceFull.requiredMeat).toBe(23_980_000);
    expect(onePieceFull.requiredLegendaryFodder).toBe(5);

    expect(onePieceFull.missingSolarGold).toBe(4_000);
    expect(onePieceFull.missingRunes).toBe(400_000);
    expect(onePieceFull.missingLegendaryStones).toBe(20);
    expect(onePieceFull.missingMythicStones).toBe(6);
    expect(onePieceFull.missingMeat).toBe(13_980_000);

    // 4 pieces (1 Hero) WITH Base Lv.0->40 Enhancement prerequisite (+780,000 Runes & +3,744,000 Meat)
    const heroSetWithBase = calculateGearPromotion({
      fromStepIndex: 0,
      toStepIndex: 25,
      pieceCount: 4,
      goldenSetId: "titans_might",
      includeBaseLv40Enhance: true,
    });
    expect(heroSetWithBase.requiredSolarGold).toBe(24_000);
    expect(heroSetWithBase.promotionOnlyRunes).toBe(2_000_000);
    expect(heroSetWithBase.baseEnhanceRunesAdded).toBe(780_000);
    expect(heroSetWithBase.requiredRunes).toBe(2_780_000);
    expect(heroSetWithBase.requiredLegendaryStones).toBe(200);
    expect(heroSetWithBase.requiredMythicStones).toBe(40);
    expect(heroSetWithBase.requiredMeat).toBe(95_920_000 + 3_744_000);
    expect(heroSetWithBase.requiredLegendaryFodder).toBe(20);

    // 24 pieces (Queue 1)
    const squad24 = calculateGearPromotion({
      fromStepIndex: 0,
      toStepIndex: 25,
      pieceCount: 24,
      goldenSetId: "glorious_light",
      includeBaseLv40Enhance: false,
    });
    expect(squad24.requiredSolarGold).toBe(144_000);
    expect(squad24.requiredRunes).toBe(12_000_000);
    expect(squad24.requiredLegendaryStones).toBe(1_200);
    expect(squad24.requiredMythicStones).toBe(240);
    expect(squad24.requiredMeat).toBe(575_520_000);
    expect(squad24.requiredLegendaryFodder).toBe(120);
  });

  it("verifies all 18 Mythic Master Attribute tiers (60.00% ➔ 95.25%, Defense Break 130 ➔ 2,450) and handles zero-stone sub-tiers without NaN%", () => {
    const firstAttr = MYTHIC_MASTER_ATTRIBUTE_TIERS[0];
    expect(firstAttr.tierIndex).toBe(1);
    expect(firstAttr.masterAttributesPercent).toBe("60.00%");
    expect(firstAttr.defenseBreak).toBe(130);
    expect(firstAttr.initialUltCdReduced).toBe("0.20%");
    expect(firstAttr.enemyUltCdReduced).toBe("0.10%");
    expect(firstAttr.heroAttackPercent).toBe("1.50%");
    expect(firstAttr.heroHpPercent).toBe("2.50%");

    const maxAttr = MYTHIC_MASTER_ATTRIBUTE_TIERS[17];
    expect(maxAttr.tierIndex).toBe(18);
    expect(maxAttr.masterAttributesPercent).toBe("95.25%");
    expect(maxAttr.defenseBreak).toBe(2_450);
    expect(maxAttr.initialUltCdReduced).toBe("3.10%");
    expect(maxAttr.enemyUltCdReduced).toBe("1.55%");
    expect(maxAttr.heroAttackPercent).toBe("24.50%");
    expect(maxAttr.heroHpPercent).toBe("49.00%");

    // Sub-tier 1 -> 4 inside 1★ Cam requires 0 Promotion Stones
    const subTierOnly = calculateGearPromotion({
      fromStepIndex: 1,
      toStepIndex: 4,
      pieceCount: 1,
      goldenSetId: "fury_of_blood",
    });
    expect(subTierOnly.isInvalidRange).toBe(false);
    expect(subTierOnly.requiredSolarGold).toBe(450);
    expect(subTierOnly.requiredRunes).toBe(37_500);
    expect(subTierOnly.requiredMeat).toBe(2_250_000);
    expect(subTierOnly.requiredLegendaryStones).toBe(0);
    expect(subTierOnly.requiredMythicStones).toBe(0);
    expect(subTierOnly.legendaryStoneCompletionPercent).toBe(100);
    expect(subTierOnly.mythicStoneCompletionPercent).toBe(100);

    // Invalid range: 20 -> 10
    const invalid = calculateGearPromotion({
      fromStepIndex: 20,
      toStepIndex: 10,
      pieceCount: 1,
      goldenSetId: "fury_of_blood",
    });
    expect(invalid.isInvalidRange).toBe(true);
    expect(invalid.requiredSolarGold).toBe(0);
    expect(invalid.requiredRunes).toBe(0);
  });
});

describe("4.2 Đột Phá Đồ Đỏ — Suite 2: MD3 UI Component, Golden Set Switcher & Bilingual Purity", () => {
  const resolved = getCalculatorToolBySlug("hero-gear", "gear-promotion")!;
  const tool = resolved.tool;

  it("renders default 4 pieces (1 Hero) from 0★ Cam ➔ 5★ Đỏ (24,000 Solar Gold, 2,000,000 Runes, 200 Leg Stones, 40 Mythic Stones, 95,920,000 Meat)", () => {
    render(<GearPromotionCalculator tool={tool} locale="vi" />);

    expect(
      screen.getByRole("heading", { name: /Đột Phá Đồ Đỏ/i })
    ).toBeDefined();

    expect(screen.getAllByText("24,000").length).toBeGreaterThan(0);
    expect(screen.getAllByText("2,000,000").length).toBeGreaterThan(0);
    expect(screen.getAllByText("200").length).toBeGreaterThan(0);
    expect(screen.getAllByText("40").length).toBeGreaterThan(0);
  });

  it("switches Golden Sets (Fury of Blood / Titan's Might / Glorious Light) and toggles Base Lv.0➔40 Enhancement prerequisite", () => {
    render(<GearPromotionCalculator tool={tool} locale="vi" />);

    const titanBtn = screen.getByTestId("golden-set-btn-titans_might");
    fireEvent.click(titanBtn);
    expect(screen.getAllByText(/Uy Lực Titan/i).length).toBeGreaterThan(0);

    // Toggle Base Lv.0->40 Enhancement prerequisite (+780,000 Runes -> 2,780,000 Runes)
    const baseToggle = screen.getByTestId("toggle-base-lv40-enhance");
    fireEvent.click(baseToggle);
    expect(screen.getAllByText("2,780,000").length).toBeGreaterThan(0);
  });

  it("updates piece count (1 piece / 24 pieces) and inspects the 18-tier Mythic Master Attribute matrix", () => {
    render(<GearPromotionCalculator tool={tool} locale="vi" />);

    const onePieceBtn = screen.getByTestId("piece-preset-1");
    fireEvent.click(onePieceBtn);
    expect(screen.getAllByText("6,000").length).toBeGreaterThan(0);
    expect(screen.getAllByText("500,000").length).toBeGreaterThan(0);

    const squad24Btn = screen.getByTestId("piece-preset-24");
    fireEvent.click(squad24Btn);
    expect(screen.getAllByText("144,000").length).toBeGreaterThan(0);
    expect(screen.getAllByText("12,000,000").length).toBeGreaterThan(0);

    // Inspect Mythic Master Attribute tier 18 (95.25%, Defense Break 2,450, 3.10%)
    expect(screen.getAllByText("95.25%").length).toBeGreaterThan(0);
    expect(screen.getAllByText("2,450").length).toBeGreaterThan(0);
    expect(screen.getAllByText("3.10%").length).toBeGreaterThan(0);
  });

  it("enforces MD3 single-border containment (max depth <= 1) and zero Vietnamese inside font-mono", () => {
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
    expect(text).toContain("Defense Break");

    const vnDiacriticsRegex =
      /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]/;
    expect(vnDiacriticsRegex.test(text)).toBe(false);
  });
});

import React from "react";
import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import {
  GEAR_ENHANCE_RARITY_CONFIGS,
  GEAR_ENHANCE_RARITY_ORDER,
  GEAR_SLOTS_BY_RARITY,
  GEAR_SLOT_ORDER,
  MIN_GEAR_ENHANCE_LEVEL,
  calculateGearEnhancePlan,
  clampGearEnhanceLevel,
  getCumulativeGearEnhanceCost,
  getStepGearEnhanceCost,
} from "../src/content/calculators/gear-enhance-data";
import { getCalculatorToolBySlug } from "../src/content/calculators/registry";
import { GearEnhanceLevelSelector } from "../src/components/calculators/gear-enhance-level-selector";
import { GearEnhanceCalculator } from "../src/components/calculators/gear-enhance-calculator";
import {
  VI_DIACRITIC_REGEX,
  countMicroTextOccurrences,
  findMicroTextElements,
  findMonoElementsWithVietnamese,
  getMaxBorderedContainerDepth,
  readSource,
} from "./utils/md3-audit";

describe("4.1 Cường Hóa Trang Bị — Suite 1: Quantitative SSoT Engine (Meta.bytes v1.0.42532)", () => {
  it("registers tool 4.1 with Gear Enhance Rune (gameId=206) and Ruby (gameId=6) in registry.ts", () => {
    const entry = getCalculatorToolBySlug("hero-gear", "gear-enhance");
    expect(entry).not.toBeNull();
    expect(entry?.tool.code).toBe("4.1");
    expect(entry?.tool.status).toBe("ready");
    expect(entry?.tool.materials.map((m) => m.gameId)).toEqual([206, 6]);
    expect(entry?.tool.materials.map((m) => m.nameVi)).toEqual([
      "Rune Cường Hóa Trang Bị",
      "Ruby",
    ]);
  });

  it("defines exact rarity level caps and Rune + Ruby step tables matching Meta.bytes (equipment_star_up)", () => {
    expect(MIN_GEAR_ENHANCE_LEVEL).toBe(0);
    expect(GEAR_ENHANCE_RARITY_ORDER).toEqual(["legendary", "epic", "rare"]);
    expect(GEAR_SLOT_ORDER).toEqual(["weapon", "boots", "armor", "helmet"]);

    // 1. Legendary (Quality 5, model_id=1501, Max Lv.40)
    expect(GEAR_ENHANCE_RARITY_CONFIGS.legendary.maxLevel).toBe(40);
    expect(GEAR_ENHANCE_RARITY_CONFIGS.legendary.totalRuneAtMax).toBe(195_000);
    expect(GEAR_ENHANCE_RARITY_CONFIGS.legendary.totalRubyAtMax).toBe(936_000);

    expect(getStepGearEnhanceCost(0, "legendary")).toEqual({
      runes: 0,
      ruby: 0,
    });
    expect(getStepGearEnhanceCost(1, "legendary")).toEqual({
      runes: 1_500,
      ruby: 7_200,
    });
    expect(getStepGearEnhanceCost(5, "legendary")).toEqual({
      runes: 2_250,
      ruby: 10_800,
    });
    // Matches user in-game screenshot at Lv.10/40 (upgrading Lv.10 -> Lv.11 costs 3000 Rune + 14400 Ruby)
    expect(getStepGearEnhanceCost(11, "legendary")).toEqual({
      runes: 3_000,
      ruby: 14_400,
    });
    expect(getStepGearEnhanceCost(40, "legendary")).toEqual({
      runes: 8_250,
      ruby: 39_600,
    });

    expect(getCumulativeGearEnhanceCost(10, "legendary")).toEqual({
      runes: 21_000,
      ruby: 100_800,
    });
    expect(getCumulativeGearEnhanceCost(20, "legendary")).toEqual({
      runes: 60_000,
      ruby: 288_000,
    });
    expect(getCumulativeGearEnhanceCost(30, "legendary")).toEqual({
      runes: 118_500,
      ruby: 568_800,
    });
    expect(getCumulativeGearEnhanceCost(40, "legendary")).toEqual({
      runes: 195_000,
      ruby: 936_000,
    });

    // 2. Epic (Quality 4, model_id=1401, Max Lv.30)
    expect(GEAR_ENHANCE_RARITY_CONFIGS.epic.maxLevel).toBe(30);
    expect(GEAR_ENHANCE_RARITY_CONFIGS.epic.totalRuneAtMax).toBe(32_500);
    expect(GEAR_ENHANCE_RARITY_CONFIGS.epic.totalRubyAtMax).toBe(39_000);
    expect(getStepGearEnhanceCost(1, "epic")).toEqual({
      runes: 250,
      ruby: 300,
    });
    expect(getStepGearEnhanceCost(10, "epic")).toEqual({
      runes: 1_000,
      ruby: 1_200,
    });
    expect(getStepGearEnhanceCost(30, "epic")).toEqual({
      runes: 1_500,
      ruby: 1_800,
    });
    expect(getCumulativeGearEnhanceCost(10, "epic")).toEqual({
      runes: 5_500,
      ruby: 6_600,
    });
    expect(getCumulativeGearEnhanceCost(20, "epic")).toEqual({
      runes: 17_500,
      ruby: 21_000,
    });
    expect(getCumulativeGearEnhanceCost(30, "epic")).toEqual({
      runes: 32_500,
      ruby: 39_000,
    });

    // 3. Rare (Quality 3, model_id=1301, Max Lv.15)
    expect(GEAR_ENHANCE_RARITY_CONFIGS.rare.maxLevel).toBe(15);
    expect(GEAR_ENHANCE_RARITY_CONFIGS.rare.totalRuneAtMax).toBe(1_800);
    expect(GEAR_ENHANCE_RARITY_CONFIGS.rare.totalRubyAtMax).toBe(1_440);
    expect(getCumulativeGearEnhanceCost(10, "rare")).toEqual({
      runes: 1_050,
      ruby: 840,
    });
    expect(getCumulativeGearEnhanceCost(15, "rare")).toEqual({
      runes: 1_800,
      ruby: 1_440,
    });

    // Clamping per rarity
    expect(clampGearEnhanceLevel(-5, "legendary")).toBe(0);
    expect(clampGearEnhanceLevel(99, "legendary")).toBe(40);
    expect(clampGearEnhanceLevel(40, "epic")).toBe(30);
    expect(clampGearEnhanceLevel(40, "rare")).toBe(15);
  });

  it("defines 4 equipment slots per rarity with Meta.bytes level milestones (e.g., Giày Hồn Kỵ Sĩ)", () => {
    const legBoots = GEAR_SLOTS_BY_RARITY.legendary.boots;
    expect(legBoots.gameId).toBe(1533);
    expect(legBoots.itemName.vi).toBe("Giày Hồn Kỵ Sĩ");
    expect(legBoots.iconPath).toBe(
      "/images/equipment/hero-gear/icon_42053.webp"
    );
    expect(legBoots.levelMilestones.map((m) => m.level)).toEqual([
      10, 20, 30, 40,
    ]);
    expect(legBoots.levelMilestones[0].bonusValue).toBe("+705");
    expect(legBoots.levelMilestones[1].bonusValue).toBe("+4.5%");

    const epicWeapon = GEAR_SLOTS_BY_RARITY.epic.weapon;
    expect(epicWeapon.gameId).toBe(1401);
    expect(epicWeapon.levelMilestones.map((m) => m.level)).toEqual([
      10, 20, 30,
    ]);

    const rareHelmet = GEAR_SLOTS_BY_RARITY.rare.helmet;
    expect(rareHelmet.gameId).toBe(1304);
    expect(rareHelmet.levelMilestones.map((m) => m.level)).toEqual([10]);
  });

  it("calculates 1-piece enhancement plans, inventory progress, and clamps to rarity maxLevel", () => {
    // Legendary Boots Lv.10 -> Lv.40 with 272K Rune and 1.74M Ruby owned (from user screenshot)
    const leg10To40 = calculateGearEnhancePlan({
      rarity: "legendary",
      slotId: "boots",
      fromLevel: 10,
      toLevel: 40,
      ownedRunes: 272_000,
      ownedRuby: 1_740_000,
    });

    expect(leg10To40.isInvalidRange).toBe(false);
    expect(leg10To40.requiredRunes).toBe(174_000);
    expect(leg10To40.requiredRuby).toBe(835_200);
    expect(leg10To40.nextStepRunes).toBe(3_000);
    expect(leg10To40.nextStepRuby).toBe(14_400);
    expect(leg10To40.missingRunes).toBe(0);
    expect(leg10To40.surplusRunes).toBe(98_000);
    expect(leg10To40.missingRuby).toBe(0);
    expect(leg10To40.surplusRuby).toBe(904_800);
    expect(leg10To40.runeCompletionPercent).toBe(100);
    expect(leg10To40.rubyCompletionPercent).toBe(100);

    // Epic Gear clamps toLevel=40 -> 30 automatically
    const epicMax = calculateGearEnhancePlan({
      rarity: "epic",
      slotId: "weapon",
      fromLevel: 0,
      toLevel: 40,
      ownedRunes: 10_000,
      ownedRuby: 15_000,
    });
    expect(epicMax.toLevel).toBe(30);
    expect(epicMax.requiredRunes).toBe(32_500);
    expect(epicMax.requiredRuby).toBe(39_000);
    expect(epicMax.missingRunes).toBe(22_500);
    expect(epicMax.missingRuby).toBe(24_000);
    expect(epicMax.bracketBreakdown).toHaveLength(3);

    // Invalid range when fromLevel > toLevel
    const invalidPlan = calculateGearEnhancePlan({
      rarity: "legendary",
      slotId: "boots",
      fromLevel: 30,
      toLevel: 10,
    });
    expect(invalidPlan.isInvalidRange).toBe(true);
    expect(invalidPlan.requiredRunes).toBe(0);
    expect(invalidPlan.requiredRuby).toBe(0);
  });
});

describe("4.1 Cường Hóa Trang Bị — Suite 2: MD3 UI, Sequential Picker, Unified Materials & Popup Info", () => {
  const resolved = getCalculatorToolBySlug("hero-gear", "gear-enhance")!;

  const renderCalculator = (locale: "vi" | "en" = "vi") =>
    render(
      <GearEnhanceCalculator
        zone={resolved.zone}
        category={resolved.category}
        tool={resolved.tool}
        locale={locale}
      />
    );

  it("contains zero sub-12px micro-text classes in selector and calculator source files", () => {
    expect(
      countMicroTextOccurrences(
        readSource("src/components/calculators/gear-enhance-level-selector.tsx")
      )
    ).toBe(0);
    expect(
      countMicroTextOccurrences(
        readSource("src/components/calculators/gear-enhance-calculator.tsx")
      )
    ).toBe(0);
  });

  it("renders clean 1-piece UI without scope/role strips, supports 2-step central picker, compact K/M numbers, unified Materials card, and popup [i] dialog", () => {
    const { container } = renderCalculator("vi");

    // 1. Removed scope switcher & role branch strip
    expect(screen.queryByTestId("scope-single_piece-btn")).toBeNull();
    expect(screen.queryByTestId("scope-hero_set_4-btn")).toBeNull();
    expect(screen.queryByTestId("scope-squad_24-btn")).toBeNull();
    expect(screen.queryByTestId("scope-custom_4_slots-btn")).toBeNull();
    expect(screen.queryByTestId("role-dps-btn")).toBeNull();

    // 2. Clean selector titles without (X) and (Y)
    expect(screen.getByText("Cấp Hiện Tại")).toBeDefined();
    expect(screen.getByText("Cấp Mục Tiêu")).toBeDefined();
    expect(screen.queryByText("Cấp Hiện Tại (X)")).toBeNull();
    expect(screen.queryByText("Cấp Mục Tiêu (Y)")).toBeNull();

    // 3. Default Legendary Boots Lv.0 -> Lv.40 shows compact K numbers in unified Materials card
    expect(screen.getByTestId("gear-enhance-result-card")).toBeDefined();
    expect(screen.getByTestId("gear-enhance-rune-column")).toBeDefined();
    expect(screen.getByTestId("gear-enhance-ruby-column")).toBeDefined();
    expect(screen.getByTestId("gear-enhance-total-runes").textContent).toBe(
      "195K"
    );
    expect(screen.getByTestId("gear-enhance-total-ruby").textContent).toBe(
      "936K"
    );

    // 4. Supports compact K/M input in inventory fields
    fireEvent.change(screen.getByTestId("gear-enhance-owned-runes-input"), {
      target: { value: "272k" },
    });
    fireEvent.change(screen.getByTestId("gear-enhance-owned-ruby-input"), {
      target: { value: "1.74m" },
    });
    expect(screen.getByTestId("gear-enhance-missing-runes").textContent).toBe(
      "+77K"
    );
    expect(screen.getByTestId("gear-enhance-missing-ruby").textContent).toBe(
      "+804K"
    );

    // 5. Central Gear Avatar sequential 2-step picker (Step 1: Rarity -> Step 2: Slot -> Auto close)
    fireEvent.click(screen.getByTestId("gear-enhance-central-picker-btn"));
    expect(screen.getByTestId("gear-enhance-picker-popover")).toBeDefined();

    // Step 1: Click Epic rarity -> transitions to Step 2 and clamps maxLevel to 30
    fireEvent.click(screen.getByTestId("gear-rarity-option-epic"));
    expect(screen.getByTestId("gear-slot-option-weapon")).toBeDefined();

    // Step 2: Click Weapon slot -> selects Kiếm Trưởng Quan Kỵ Sĩ and auto-closes popover
    fireEvent.click(screen.getByTestId("gear-slot-option-weapon"));
    expect(screen.queryByTestId("gear-enhance-picker-popover")).toBeNull();

    // Epic Lv.0 -> Lv.30 costs 32.5K Rune and 39K Ruby
    expect(screen.getByTestId("gear-enhance-total-runes").textContent).toBe(
      "32.5K"
    );
    expect(screen.getByTestId("gear-enhance-total-ruby").textContent).toBe(
      "39K"
    );

    // 6. Popup [i] dialog via shared CalculatorInfoPopover
    expect(screen.queryByTestId("gear-enhance-info-dialog")).toBeNull();
    fireEvent.click(screen.getByTestId("gear-enhance-info-trigger"));
    expect(screen.getByTestId("gear-enhance-info-dialog")).toBeDefined();

    expect(getMaxBorderedContainerDepth(container)).toBeLessThanOrEqual(1);
    expect(findMicroTextElements(container)).toEqual([]);
    expect(findMonoElementsWithVietnamese(container)).toEqual([]);
  });

  it("renders 100% pure English without any Vietnamese diacritics when locale='en' (including open picker and open info dialog)", () => {
    const { container } = renderCalculator("en");

    fireEvent.click(screen.getByTestId("gear-enhance-central-picker-btn"));
    fireEvent.click(screen.getByTestId("gear-enhance-info-trigger"));

    expect(getMaxBorderedContainerDepth(container)).toBeLessThanOrEqual(1);
    expect(findMicroTextElements(container)).toEqual([]);
    expect(container.textContent ?? "").not.toMatch(VI_DIACRITIC_REGEX);
  });

  it("renders GearEnhanceLevelSelector with rarity-aware milestone chips and equipment level bonus pills", () => {
    let currentLv = 10;
    render(
      <GearEnhanceLevelSelector
        idPrefix="test-from"
        title="Cấp Hiện Tại"
        level={currentLv}
        rarity="legendary"
        slotId="boots"
        locale="vi"
        onChangeLevel={(next) => {
          currentLv = next;
        }}
      />
    );

    const minusBtn = screen.getByTestId("test-from-level-minus-btn");
    const plusBtn = screen.getByTestId("test-from-level-plus-btn");
    expect(minusBtn.className).toContain("h-11");
    expect(plusBtn.className).toContain("w-11");

    fireEvent.click(plusBtn);
    expect(currentLv).toBe(11);

    fireEvent.click(screen.getByTestId("test-from-milestone-30-btn"));
    expect(currentLv).toBe(30);
  });
});

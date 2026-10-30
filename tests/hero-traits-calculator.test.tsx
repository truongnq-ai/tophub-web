import React from "react";
import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import viMessages from "../messages/vi.json";
import enMessages from "../messages/en.json";
import {
  DIAMOND_COST_BY_SLOT,
  DIAMOND_COST_SLOT_4_UNLOCK,
  DIAMOND_COST_TRAIT_SWAP,
  HERO_TRAIT_3_PROFILES,
  SHARDS_PER_TRAIT_LEVEL,
  TOTAL_DIAMOND_UNLOCK_ALL_SLOTS,
  applyTraitSlotLevelChange,
  calculateHeroTraitBaseStatPercent,
  calculateHeroTraitsUpgrade,
  clampTraitLevel,
  getHeroTraitProfile,
  getTraitHeroesByRarity,
} from "../src/content/calculators/hero-traits-data";
import { GAME_ASSET_REGISTRY } from "../src/content/guides/asset-registry";
import { getCalculatorToolBySlug } from "../src/content/calculators/registry";
import { HeroTraitsCalculator } from "../src/components/calculators/hero-traits-calculator";

describe("Suite 1 — Hero Traits Quantitative Engine (4 Slots Lv.0..30, 10 Shards/Lv, 200/500/1000/2000 Diamond Unlocks & 5-Level Step-Gate)", () => {
  it("calculates full 4-slot max (0/0/0/0 -> 30/30/30/30) as 1,200 Shards + 3,700 Diamonds (200 + 500 + 1,000 + 2,000)", () => {
    expect(SHARDS_PER_TRAIT_LEVEL).toBe(10);
    expect(DIAMOND_COST_BY_SLOT).toEqual([200, 500, 1000, 2000]);
    expect(DIAMOND_COST_SLOT_4_UNLOCK).toBe(2000);
    expect(TOTAL_DIAMOND_UNLOCK_ALL_SLOTS).toBe(3700);
    expect(DIAMOND_COST_TRAIT_SWAP).toBe(2000);

    const resFull = calculateHeroTraitsUpgrade({
      rarity: "mythic",
      heroId: "hero-desert-prince",
      fromLevels: [0, 0, 0, 0],
      toLevels: [30, 30, 30, 30],
      ownedShards: 200,
      ownedDiamonds: 500,
      includeTraitSwap: false,
    });

    expect(resFull.isInvalidRange).toBe(false);
    expect(resFull.requiredShards).toBe(1200);
    expect(resFull.missingShards).toBe(1000);
    expect(resFull.requiresSlot4UnlockDiamond).toBe(true);
    expect(resFull.slotUnlockDiamonds).toBe(3700);
    expect(resFull.requiredDiamonds).toBe(3700);
    expect(resFull.missingDiamonds).toBe(3200);
    expect(resFull.isSlot4EconomyTrapWarning).toBe(false);
    expect(resFull.slotBreakdown).toHaveLength(4);
    expect(resFull.slotBreakdown.map((s) => s.diamondUnlockCost)).toEqual([
      200, 500, 1000, 2000,
    ]);
  });

  it("calculates per-slot Diamond unlock costs when moving any slot from Lv.0 to >0, and 0 when already unlocked (>0)", () => {
    // Reproduces user screenshot scenario: from [0, 0, 0, 11] to [15, 0, 30, 30]
    // Slot 1 unlocks (0->15 => 200), Slot 2 stays 0 (0), Slot 3 unlocks (0->30 => 1000), Slot 4 was already 11 (>0 => 0)
    const userScenario = calculateHeroTraitsUpgrade({
      rarity: "legendary",
      heroId: "hero-secret-keeper",
      fromLevels: [0, 0, 0, 11],
      toLevels: [15, 0, 30, 30],
      ownedShards: 0,
      ownedDiamonds: 0,
    });

    expect(userScenario.requiredShards).toBe(640);
    expect(userScenario.slotBreakdown.map((s) => s.diamondUnlockCost)).toEqual([
      200, 0, 1000, 0,
    ]);
    expect(userScenario.slotUnlockDiamonds).toBe(1200);
    expect(userScenario.requiredDiamonds).toBe(1200);
  });

  it("enforces bidirectional 5-level step-gate (5/10/15/20/25/30) via applyTraitSlotLevelChange", () => {
    // Increasing Slot 1 to Lv.7 requires Slots 2, 3, 4 to reach Lv.5
    expect(applyTraitSlotLevelChange([0, 0, 0, 0], 0, 7)).toEqual([7, 5, 5, 5]);

    // Increasing Slot 3 to Lv.3 requires preceding Slots 1, 2 to reach Lv.5
    expect(applyTraitSlotLevelChange([0, 0, 0, 0], 2, 3)).toEqual([5, 5, 3, 0]);

    // Increasing Slot 3 to Lv.30 requires all other slots to reach Lv.25
    expect(applyTraitSlotLevelChange([0, 0, 0, 0], 2, 30)).toEqual([
      25, 25, 30, 25,
    ]);

    // Decreasing Slot 4 from 5 to 4 when at [7, 5, 5, 5] pulls Slot 1 down to 5
    expect(applyTraitSlotLevelChange([7, 5, 5, 5], 3, 4)).toEqual([5, 5, 5, 4]);

    // Decreasing Slot 1 from 5 to 3 when at [5, 5, 5, 5] locks Slots 2, 3, 4 back to 0
    expect(applyTraitSlotLevelChange([5, 5, 5, 5], 0, 3)).toEqual([3, 0, 0, 0]);

    // Decreasing Slot 2 from 20 to 14 when at [21, 20, 20, 20] pulls all slots down to max 15
    expect(applyTraitSlotLevelChange([21, 20, 20, 20], 1, 14)).toEqual([
      15, 14, 15, 15,
    ]);
  });

  it("calculates rarity-accurate stat percentages for Slots 1, 2, 4 per Meta.bytes (hero_talent_group)", () => {
    // Epic: +3%/lv for Lv.1..25 (Lv.21 = 63%, Lv.25 = 75%), then +5%/lv for Lv.26..30 (Lv.30 = 100%)
    expect(calculateHeroTraitBaseStatPercent(0, "epic")).toBe(0);
    expect(calculateHeroTraitBaseStatPercent(15, "epic")).toBe(45);
    expect(calculateHeroTraitBaseStatPercent(21, "epic")).toBe(63);
    expect(calculateHeroTraitBaseStatPercent(25, "epic")).toBe(75);
    expect(calculateHeroTraitBaseStatPercent(30, "epic")).toBe(100);

    // Legendary & Mythic: +6%/lv for Lv.1..30 (Lv.15 = 90%, Lv.30 = 180%)
    expect(calculateHeroTraitBaseStatPercent(1, "legendary")).toBe(6);
    expect(calculateHeroTraitBaseStatPercent(15, "legendary")).toBe(90);
    expect(calculateHeroTraitBaseStatPercent(30, "legendary")).toBe(180);
    expect(calculateHeroTraitBaseStatPercent(30, "mythic")).toBe(180);
  });

  it("calculates Brawler (Epic) Max Slot 3 Economy Funnel (0/0/0/0 -> 25/25/30/25) as 1,050 Epic Shards and 3,700 Diamonds", () => {
    const econFunnel = calculateHeroTraitsUpgrade({
      rarity: "epic",
      heroId: "hero-brawler",
      fromLevels: [0, 0, 0, 0],
      toLevels: [25, 25, 30, 25],
      ownedShards: 50,
    });

    expect(econFunnel.requiredShards).toBe(1050);
    expect(econFunnel.missingShards).toBe(1000);
    expect(econFunnel.requiredDiamonds).toBe(3700);
    expect(econFunnel.heroProfile.category).toBe("economy_24_7");
    expect(econFunnel.heroProfile.maxBonusLabel.vi).toContain("+30%");
    expect(econFunnel.slotBreakdown[0]?.slotTitle.vi).toContain("Tấn Công Anh Hùng");
    expect(econFunnel.slotBreakdown[1]?.slotTitle.vi).toContain("HP Anh Hùng I");
    expect(econFunnel.slotBreakdown[3]?.slotTitle.vi).toContain("HP Anh Hùng II");
  });

  it("resolves accurate Individual Trait 3 profiles for Mythic, Legendary Economy, Legendary Combat, and Epic heroes", () => {
    const brawler = getHeroTraitProfile("hero-brawler", "epic");
    expect(brawler.category).toBe("economy_24_7");
    expect(brawler.trait3Title.en).toContain("Tech Research");

    const warlock = getHeroTraitProfile("hero-warlock", "legendary");
    expect(warlock.category).toBe("economy_24_7");
    expect(warlock.maxBonusLabel.en).toContain("360,000");

    const stormMaiden = getHeroTraitProfile("hero-storm-maiden", "mythic");
    expect(stormMaiden.category).toBe("combat");
    expect(stormMaiden.maxBonusLabel.en).toContain("+20%");

    const epicList = getTraitHeroesByRarity("epic");
    expect(epicList[0]?.id).toBe("hero-brawler");

    // Verify 100% of all 55 heroes in GAME_ASSET_REGISTRY have an explicit HERO_TRAIT_3_PROFILES entry
    const allHeroes = Object.values(GAME_ASSET_REGISTRY).filter(
      (entry) => entry.category === "heroes"
    );
    expect(allHeroes.length).toBeGreaterThanOrEqual(55);
    for (const hero of allHeroes) {
      expect(HERO_TRAIT_3_PROFILES[hero.id]).toBeDefined();
    }
  });

  it("flags hasPrerequisiteBridgeWarning when 5-level step-gate is violated, and exposes starUnlockPrerequisiteShards", () => {
    const missingBridge = calculateHeroTraitsUpgrade({
      rarity: "epic",
      heroId: "hero-brawler",
      fromLevels: [0, 0, 0, 0],
      toLevels: [5, 0, 30, 0],
    });
    expect(missingBridge.hasPrerequisiteBridgeWarning).toBe(true);
    expect(missingBridge.starUnlockPrerequisiteShards).toBe(300);

    const validBridge = calculateHeroTraitsUpgrade({
      rarity: "mythic",
      heroId: "hero-wukong",
      fromLevels: [0, 0, 0, 0],
      toLevels: [25, 25, 30, 25],
    });
    expect(validBridge.hasPrerequisiteBridgeWarning).toBe(false);
    expect(validBridge.starUnlockPrerequisiteShards).toBe(600);
  });

  it("detects invalid ranges and clamps out-of-range or negative inputs safely", () => {
    expect(clampTraitLevel(-5)).toBe(0);
    expect(clampTraitLevel(45)).toBe(30);

    const invalid = calculateHeroTraitsUpgrade({
      rarity: "legendary",
      heroId: "hero-pyromancer",
      fromLevels: [20, 20, 20, 20],
      toLevels: [20, 20, 20, 20],
      ownedShards: -10,
      ownedDiamonds: Number.NaN,
    });

    expect(invalid.isInvalidRange).toBe(true);
    expect(invalid.requiredShards).toBe(0);
    expect(invalid.ownedShards).toBe(0);
    expect(invalid.ownedDiamonds).toBe(0);
  });
});

describe("Suite 2 — Hero Traits UI & Bilingual Purity (AC-CALC-05)", () => {
  const selection = getCalculatorToolBySlug("heroes", "hero-traits")!;

  it("renders Brawler default Max Slot 3 Economy Funnel (0/0/0/0 -> 25/25/30/25 = 1,050 Shards, 3,700 Diamonds) and supports sequential Rarity -> Hero picker, Trait Swap toggle, and [i] Breakdown", () => {
    render(
      <NextIntlClientProvider locale="vi" messages={viMessages}>
        <HeroTraitsCalculator
          zone={selection.zone}
          category={selection.category}
          tool={selection.tool}
          locale="vi"
        />
      </NextIntlClientProvider>
    );

    expect(screen.getByTestId("hero-traits-calculator")).toBeTruthy();
    expect(screen.getByTestId("central-hero-name").textContent).toContain("Đấu Sĩ");

    // Default Max Slot 3 Funnel on Brawler: 0/0/0/0 -> 25/25/30/25 = 1,050 Epic Shards, 3,700 Diamonds
    expect(screen.getByTestId("traits-required-shards-value").textContent).toBe(
      "1,050"
    );
    expect(
      screen.getByTestId("traits-required-diamonds-value").textContent
    ).toBe("3,700");

    // Verify Diamond unlock badges on all 4 slots (200, 500, 1,000, 2,000)
    expect(screen.getByTestId("to-slot-1-diamond-badge").textContent).toContain(
      "200"
    );
    expect(screen.getByTestId("to-slot-2-diamond-badge").textContent).toContain(
      "500"
    );
    expect(screen.getByTestId("to-slot-3-diamond-badge").textContent).toContain(
      "1,000"
    );
    expect(screen.getByTestId("to-slot-4-diamond-badge").textContent).toContain(
      "2,000"
    );

    // Toggle Trait Swap (+2,000 Diamonds -> 5,700 Diamonds)
    fireEvent.click(screen.getByTestId("traits-swap-toggle-btn"));
    expect(
      screen.getByTestId("traits-required-diamonds-value").textContent
    ).toBe("5,700");

    // Click preset Max 30/30/30/30 on Brawler -> triggers 1,200 Shards + 5,700 Diamonds (3,700 Unlock + 2,000 Swap)
    fireEvent.click(screen.getByTestId("to-preset-max-btn"));
    expect(screen.getByTestId("traits-required-shards-value").textContent).toBe(
      "1,200"
    );
    expect(
      screen.getByTestId("traits-required-diamonds-value").textContent
    ).toBe("5,700");

    // Open Sequential Picker -> Select Mythic -> Select Desert Prince -> Auto-closes
    fireEvent.click(screen.getByTestId("central-hero-avatar-trigger"));
    expect(screen.getByTestId("hero-sequential-picker")).toBeTruthy();
    fireEvent.click(screen.getByTestId("rarity-tab-mythic"));
    fireEvent.click(screen.getByTestId("hero-option-hero-desert-prince"));
    expect(screen.queryByTestId("hero-sequential-picker")).toBeNull();
    expect(screen.getByTestId("central-hero-name").textContent).toBe(
      "Hoàng Tử Sa Mạc"
    );

    // Toggle [i] breakdown table
    fireEvent.click(screen.getByTestId("toggle-traits-breakdown-btn"));
    expect(screen.getByTestId("traits-breakdown-panel")).toBeTruthy();

    // Test 5-level block progression button (e.g. 15/15/15/15 = 600 Shards)
    fireEvent.click(screen.getByTestId("to-preset-block-15-btn"));
    expect(screen.getByTestId("traits-required-shards-value").textContent).toBe(
      "600"
    );
  });

  it("enforces 100% English purity with zero Vietnamese diacritics when locale='en'", () => {
    const { container } = render(
      <NextIntlClientProvider locale="en" messages={enMessages}>
        <HeroTraitsCalculator
          zone={selection.zone}
          category={selection.category}
          tool={selection.tool}
          locale="en"
        />
      </NextIntlClientProvider>
    );

    const text = container.textContent || "";
    const vietnameseDiacriticsRegex =
      /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]/;
    expect(vietnameseDiacriticsRegex.test(text)).toBe(false);
  });
});

import React from "react";
import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import viMessages from "../messages/vi.json";
import enMessages from "../messages/en.json";
import {
  DIAMOND_COST_SLOT_4_UNLOCK,
  DIAMOND_COST_TRAIT_SWAP,
  HERO_TRAIT_3_PROFILES,
  SHARDS_PER_TRAIT_LEVEL,
  calculateHeroTraitsUpgrade,
  clampTraitLevel,
  getHeroTraitProfile,
  getTraitHeroesByRarity,
} from "../src/content/calculators/hero-traits-data";
import { GAME_ASSET_REGISTRY } from "../src/content/guides/asset-registry";
import { getCalculatorToolBySlug } from "../src/content/calculators/registry";
import { HeroTraitsCalculator } from "../src/components/calculators/hero-traits-calculator";

describe("Suite 1 — Hero Traits Quantitative Engine (4 Slots Lv.0..30, 10 Shards/Lv, 1,200 Shards Max & 2,000-Diamond Rules)", () => {
  it("calculates full 4-slot max (0/0/0/0 -> 30/30/30/30) as 1,200 Shards + 2,000 Diamonds for Slot 4 unlock", () => {
    expect(SHARDS_PER_TRAIT_LEVEL).toBe(10);
    expect(DIAMOND_COST_SLOT_4_UNLOCK).toBe(2000);
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
    expect(resFull.requiredDiamonds).toBe(2000);
    expect(resFull.missingDiamonds).toBe(1500);
    expect(resFull.isSlot4EconomyTrapWarning).toBe(false);
    expect(resFull.slotBreakdown).toHaveLength(4);
  });

  it("calculates the Brawler (Epic) Economy Funnel (0/0/0/0 -> 15/0/30/0) as 450 Epic Shards and 0 Diamonds, and flags the 2,000-Diamond Trap if Slot 4 > 0", () => {
    const econFunnel = calculateHeroTraitsUpgrade({
      rarity: "epic",
      heroId: "hero-brawler",
      fromLevels: [0, 0, 0, 0],
      toLevels: [15, 0, 30, 0],
      ownedShards: 50,
    });

    expect(econFunnel.requiredShards).toBe(450);
    expect(econFunnel.missingShards).toBe(400);
    expect(econFunnel.requiredDiamonds).toBe(0);
    expect(econFunnel.isSlot4EconomyTrapWarning).toBe(false);
    expect(econFunnel.heroProfile.category).toBe("economy_24_7");
    expect(econFunnel.heroProfile.maxBonusLabel.vi).toContain("+30%");

    // If user tries to unlock Slot 4 on Brawler (e.g. from the Brawler screenshot 21/20/20/20 -> 25/25/30/25)
    const brawlerWithSlot4 = calculateHeroTraitsUpgrade({
      rarity: "epic",
      heroId: "hero-brawler",
      fromLevels: [21, 20, 20, 20],
      toLevels: [25, 20, 30, 20],
      includeTraitSwap: true,
    });

    // (25-21)*10 + (30-20)*10 = 40 + 100 = 140 shards
    expect(brawlerWithSlot4.requiredShards).toBe(140);
    // Slot 4 was already at 20 (>0), so no new Slot 4 unlock cost, only Trait Swap (+2,000 Diamonds)
    expect(brawlerWithSlot4.requiresSlot4UnlockDiamond).toBe(false);
    expect(brawlerWithSlot4.requiredDiamonds).toBe(2000);
    expect(brawlerWithSlot4.isSlot4EconomyTrapWarning).toBe(true);
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

  it("flags hasPrerequisiteBridgeWarning when Slot 3 > 0 while Slot 1 < 15, and exposes starUnlockPrerequisiteShards", () => {
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
      toLevels: [15, 0, 30, 0],
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

  it("renders Brawler default Economy Funnel (0/0/0/0 -> 15/0/30/0 = 450 Shards, 0 Diamonds) and supports sequential Rarity -> Hero picker, Trait Swap toggle, and [i] Breakdown", () => {
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

    // Default Economy Funnel on Brawler: 0/0/0/0 -> 15/0/30/0 = 450 Epic Shards, 0 Diamonds
    expect(screen.getByTestId("traits-required-shards-value").textContent).toBe(
      "450"
    );
    expect(
      screen.getByTestId("traits-required-diamonds-value").textContent
    ).toBe("0");

    // Toggle Trait Swap (+2,000 Diamonds)
    fireEvent.click(screen.getByTestId("traits-swap-toggle-btn"));
    expect(
      screen.getByTestId("traits-required-diamonds-value").textContent
    ).toBe("2,000");

    // Click preset Max 30/30/30/30 on Brawler -> triggers 1,200 Shards + 4,000 Diamonds (2,000 Unlock + 2,000 Swap) + Economy Trap Warning
    fireEvent.click(screen.getByTestId("to-preset-max-btn"));
    expect(screen.getByTestId("traits-required-shards-value").textContent).toBe(
      "1,200"
    );
    expect(
      screen.getByTestId("traits-required-diamonds-value").textContent
    ).toBe("4,000");
    expect(
      screen.getByTestId("traits-slot4-economy-trap-warning")
    ).toBeTruthy();

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

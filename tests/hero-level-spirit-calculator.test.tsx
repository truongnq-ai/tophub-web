import React from "react";
import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import viMessages from "../messages/vi.json";
import {
  HEROIC_SPIRIT_LEVEL_TABLE,
  HERO_LEVEL_MEAT_COSTS,
  MAX_HEROIC_SPIRIT_LEVEL,
  MAX_HERO_LEVEL,
  calculateHeroLevelAndSpiritUpgrade,
  getCumulativeMeatAtHeroLevel,
  getCumulativeShardsAtSpiritLevel,
} from "../src/content/calculators/hero-level-spirit-data";
import { getCalculatorToolBySlug } from "../src/content/calculators/registry";
import { HeroLevelSpiritCalculator } from "../src/components/calculators/hero-level-spirit-calculator";
import { CalculatorPlaceholderView } from "../src/components/calculators/calculator-placeholder-view";
import { VI_DIACRITIC_REGEX } from "./utils/md3-audit";

describe("1.4 Cấp Tướng & Linh Thể — Quantitative SSoT Engine", () => {
  it("matches exact cumulative Meat costs from Lv.1 to Lv.311 in SSoT 🥩Hero Food", () => {
    expect(HERO_LEVEL_MEAT_COSTS).toHaveLength(MAX_HERO_LEVEL);
    expect(getCumulativeMeatAtHeroLevel(1)).toBe(0);
    expect(getCumulativeMeatAtHeroLevel(100)).toBe(371_745);
    expect(getCumulativeMeatAtHeroLevel(120)).toBe(794_345);
    expect(getCumulativeMeatAtHeroLevel(165)).toBe(5_047_845);
    expect(getCumulativeMeatAtHeroLevel(190)).toBe(14_930_845);
    expect(getCumulativeMeatAtHeroLevel(200)).toBe(22_190_845);
    expect(getCumulativeMeatAtHeroLevel(220)).toBe(43_850_845);
    expect(getCumulativeMeatAtHeroLevel(235)).toBe(66_550_845);
    expect(getCumulativeMeatAtHeroLevel(240)).toBe(75_350_845);
    expect(getCumulativeMeatAtHeroLevel(250)).toBe(94_900_845);
    expect(getCumulativeMeatAtHeroLevel(300)).toBe(277_480_845);
    expect(getCumulativeMeatAtHeroLevel(311)).toBe(347_880_845);
  });

  it("matches exact Heroic Spirit cumulative shards and breakthrough stats from Lv.0 to Lv.100", () => {
    expect(HEROIC_SPIRIT_LEVEL_TABLE).toHaveLength(MAX_HEROIC_SPIRIT_LEVEL + 1);
    expect(getCumulativeShardsAtSpiritLevel(0)).toBe(0);
    expect(getCumulativeShardsAtSpiritLevel(1)).toBe(10);
    expect(getCumulativeShardsAtSpiritLevel(10)).toBe(38);
    expect(getCumulativeShardsAtSpiritLevel(20)).toBe(108);
    expect(getCumulativeShardsAtSpiritLevel(30)).toBe(218);
    expect(getCumulativeShardsAtSpiritLevel(40)).toBe(388);
    expect(getCumulativeShardsAtSpiritLevel(50)).toBe(648);
    expect(getCumulativeShardsAtSpiritLevel(60)).toBe(988);
    expect(getCumulativeShardsAtSpiritLevel(70)).toBe(1_408);
    expect(getCumulativeShardsAtSpiritLevel(80)).toBe(1_908);
    expect(getCumulativeShardsAtSpiritLevel(90)).toBe(2_488);
    expect(getCumulativeShardsAtSpiritLevel(100)).toBe(3_163);

    const lv60 = HEROIC_SPIRIT_LEVEL_TABLE[60];
    expect(lv60.flatAtk).toBe(4_800);
    expect(lv60.flatHp).toBe(144_000);
    expect(lv60.percentAtk).toBeCloseTo(175.2, 2);
    expect(lv60.percentHp).toBeCloseTo(525.6, 2);
    expect(lv60.bonusHeroLevelCap).toBe(6);
    expect(lv60.skillDamageReductionPercent).toBe(30);

    const lv100 = HEROIC_SPIRIT_LEVEL_TABLE[100];
    expect(lv100.flatAtk).toBe(8_000);
    expect(lv100.flatHp).toBe(240_000);
    expect(lv100.percentAtk).toBeCloseTo(320.0, 2);
    expect(lv100.percentHp).toBeCloseTo(960.0, 2);
    expect(lv100.bonusHeroLevelCap).toBe(10);
    expect(lv100.skillDamageReductionPercent).toBe(50);
  });

  it("calculates squad Meat multiplier and 5-Star Silver prerequisite shards accurately", () => {
    const res = calculateHeroLevelAndSpiritUpgrade({
      rarity: "mythic",
      fromHeroLevel: 190,
      toHeroLevel: 220,
      heroCount: 6,
      fromSpiritLevel: 0,
      toSpiritLevel: 60,
      ownedMeat: 50_000_000,
      ownedSpiritShards: 188,
      includeMaxStarPrerequisite: true,
    });

    expect(res.requiredMeatPerHero).toBe(28_920_000);
    expect(res.totalRequiredMeat).toBe(173_520_000);
    expect(res.missingMeat).toBe(123_520_000);
    expect(res.spiritUpgradeShards).toBe(988);
    expect(res.maxStarPrerequisiteShards).toBe(1_000);
    expect(res.totalRequiredSpiritShards).toBe(1_988);
    expect(res.missingSpiritShards).toBe(1_800);
    expect(res.gainedHeroLevelCap).toBe(6);
    expect(res.gainedSkillDamageReduction).toBe(30);
  });
});

describe("1.4 Cấp Tướng & Linh Thể — UI & Bilingual Integration", () => {
  const selection = getCalculatorToolBySlug("heroes", "hero-level-spirit")!;

  it("marks hero-level-spirit as ready in registry and mounts via CalculatorPlaceholderView", () => {
    expect(selection.tool.status).toBe("ready");
    render(
      <NextIntlClientProvider locale="vi" messages={viMessages}>
        <CalculatorPlaceholderView
          mode="tool"
          zone={selection.zone}
          category={selection.category}
          tool={selection.tool}
        />
      </NextIntlClientProvider>
    );
    expect(screen.getByTestId("hero-level-spirit-calculator")).toBeTruthy();
  });

  it("supports squad multiplier, spirit-to-level cap bridge, and compact K/M/B input parsing", () => {
    render(
      <HeroLevelSpiritCalculator
        zone={selection.zone}
        category={selection.category}
        tool={selection.tool}
        locale="vi"
      />
    );

    // Default: Lv.190 -> Lv.220, 6 heroes Queue 1, Spirit Lv.0 -> Lv.60
    expect(screen.getByTestId("spirit-required-meat-value").textContent).toBe(
      "173.52M"
    );
    expect(screen.getByTestId("spirit-required-shards-value").textContent).toBe(
      "988"
    );

    // Switch squad count to 1 hero -> 28.92M Meat
    fireEvent.click(screen.getByTestId("squad-count-1-btn"));
    expect(screen.getByTestId("spirit-required-meat-value").textContent).toBe(
      "28.92M"
    );

    // Enter "20m" into owned Meat input -> missing = 8.92M
    fireEvent.change(screen.getByTestId("spirit-owned-meat-input"), {
      target: { value: "20m" },
    });
    expect(screen.getByTestId("spirit-missing-meat-badge").textContent).toContain(
      "-8.92M"
    );

    // Click Spirit-to-Level Cap Bridge (+6 Cap on top of Castle 40 Lv.220 -> Lv.226)
    fireEvent.click(screen.getByTestId("apply-spirit-cap-bridge-btn"));
    expect(screen.getByTestId("to-hero-level-badge").textContent).toContain(
      "226"
    );
  });

  it("passes strict English bilingual purity gate with zero Vietnamese diacritics", () => {
    const { container } = render(
      <HeroLevelSpiritCalculator
        zone={selection.zone}
        category={selection.category}
        tool={selection.tool}
        locale="en"
      />
    );

    fireEvent.click(screen.getByTestId("toggle-spirit-breakdown-btn"));
    const allText = container.textContent ?? "";
    expect(VI_DIACRITIC_REGEX.test(allText)).toBe(false);
  });
});

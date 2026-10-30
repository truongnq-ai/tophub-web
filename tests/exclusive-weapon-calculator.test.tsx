import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ExclusiveWeaponCalculator } from "../src/components/calculators/exclusive-weapon-calculator";
import {
  EXCLUSIVE_SKILL_MILESTONES,
  EXCLUSIVE_WEAPON_HERO_CATALOG,
  EXCLUSIVE_WEAPON_LEVEL_STEPS,
  MAX_EXCLUSIVE_STAR_STEP,
  MAX_EXCLUSIVE_WEAPON_LEVEL,
  MIN_EXCLUSIVE_STAR_STEP,
  MIN_EXCLUSIVE_WEAPON_LEVEL,
  calculateExclusiveWeapon,
  clampExclusiveStarStep,
  clampExclusiveWeaponLevel,
  getExclusiveStarSteps,
} from "../src/content/calculators/exclusive-weapon-data";
import { getCalculatorToolBySlug } from "../src/content/calculators/registry";
import {
  VI_DIACRITIC_REGEX,
  countMicroTextOccurrences,
  findMicroTextElements,
  findMonoElementsWithVietnamese,
  getMaxBorderedContainerDepth,
  readSource,
} from "./utils/md3-audit";

describe("4.3 Vũ Khí Độc Quyền — Suite 1: Quantitative SSoT Engine (Lv.0➔20 Shards & 0★➔5★ Meteoric Iron Cores)", () => {
  it("defines exact Lv.0..20 Exclusive Shard curve (5 / 75 / 275 / 605 / 1,185) and both SSoT Meteoric Iron Core profiles (920 & 2,385)", () => {
    expect(MIN_EXCLUSIVE_WEAPON_LEVEL).toBe(0);
    expect(MAX_EXCLUSIVE_WEAPON_LEVEL).toBe(20);
    expect(EXCLUSIVE_WEAPON_LEVEL_STEPS).toHaveLength(21);

    expect(MIN_EXCLUSIVE_STAR_STEP).toBe(0);
    expect(MAX_EXCLUSIVE_STAR_STEP).toBe(25);

    // Key cumulative Shard milestones
    expect(EXCLUSIVE_WEAPON_LEVEL_STEPS[0].cumulativeShards).toBe(0);
    expect(EXCLUSIVE_WEAPON_LEVEL_STEPS[1].cumulativeShards).toBe(5);
    expect(EXCLUSIVE_WEAPON_LEVEL_STEPS[5].cumulativeShards).toBe(75);
    expect(EXCLUSIVE_WEAPON_LEVEL_STEPS[10].cumulativeShards).toBe(275);
    expect(EXCLUSIVE_WEAPON_LEVEL_STEPS[15].cumulativeShards).toBe(605);
    expect(EXCLUSIVE_WEAPON_LEVEL_STEPS[20].cumulativeShards).toBe(1_185);

    // Profile 1: guide_cumulative_920 (120 -> 290 -> 490 -> 705 -> 920)
    const guideSteps = getExclusiveStarSteps("guide_cumulative_920");
    expect(guideSteps).toHaveLength(26);
    expect(guideSteps[0].cumulativeCores).toBe(0);
    expect(guideSteps[5].cumulativeCores).toBe(120);
    expect(guideSteps[10].cumulativeCores).toBe(290);
    expect(guideSteps[15].cumulativeCores).toBe(490);
    expect(guideSteps[20].cumulativeCores).toBe(705);
    expect(guideSteps[25].cumulativeCores).toBe(920);

    // Profile 2: raw_subtier_2385 (250 -> 615 -> 1,110 -> 1,695 -> 2,385)
    const rawSteps = getExclusiveStarSteps("raw_subtier_2385");
    expect(rawSteps).toHaveLength(26);
    expect(rawSteps[0].cumulativeCores).toBe(0);
    expect(rawSteps[5].cumulativeCores).toBe(250);
    expect(rawSteps[10].cumulativeCores).toBe(615);
    expect(rawSteps[15].cumulativeCores).toBe(1_110);
    expect(rawSteps[20].cumulativeCores).toBe(1_695);
    expect(rawSteps[25].cumulativeCores).toBe(2_385);

    expect(EXCLUSIVE_SKILL_MILESTONES).toHaveLength(5);
    expect(EXCLUSIVE_WEAPON_HERO_CATALOG.length).toBeGreaterThanOrEqual(15);

    expect(clampExclusiveWeaponLevel(-5)).toBe(0);
    expect(clampExclusiveWeaponLevel(99)).toBe(20);
    expect(clampExclusiveStarStep(-1)).toBe(0);
    expect(clampExclusiveStarStep(99)).toBe(25);
  });

  it("calculates exact Shards and Meteoric Iron Cores for 1 hero (×1 default), plus next milestone distance", () => {
    const oneHeroMax = calculateExclusiveWeapon({
      fromLevel: 0,
      toLevel: 20,
      fromStarStep: 0,
      toStarStep: 25,
      heroCount: 1,
      coreProfile: "guide_cumulative_920",
      selectedHeroId: "adjudicator",
      ownedShards: 185,
      ownedCores: 120,
    });

    expect(oneHeroMax.requiredShards).toBe(1_185);
    expect(oneHeroMax.requiredCores).toBe(920);
    expect(oneHeroMax.missingShards).toBe(1_000);
    expect(oneHeroMax.missingCores).toBe(800);
    expect(oneHeroMax.shardsToNextMilestone).toBe(0);

    // Mid-progression Lv.1 -> Lv.10 (275 - 5 = 270 Shards; next milestone Lv.15 = 605 - 275 = 330 Shards)
    const midHero = calculateExclusiveWeapon({
      fromLevel: 1,
      toLevel: 10,
      fromStarStep: 0,
      toStarStep: 10,
      heroCount: 1,
      coreProfile: "raw_subtier_2385",
      selectedHeroId: "desert_prince",
    });

    expect(midHero.requiredShards).toBe(270);
    expect(midHero.requiredCores).toBe(615);
    expect(midHero.nextSkillMilestone?.requiredLevel).toBe(15);
    expect(midHero.shardsToNextMilestone).toBe(330);
  });

  it("validates Level range and Star range independently so Level-only or Star-only audits work cleanly", () => {
    const levelOnly = calculateExclusiveWeapon({
      fromLevel: 0,
      toLevel: 10,
      fromStarStep: 0,
      toStarStep: 0,
      heroCount: 1,
      coreProfile: "guide_cumulative_920",
    });
    expect(levelOnly.isInvalidLevelRange).toBe(false);
    expect(levelOnly.isInvalidStarRange).toBe(false);
    expect(levelOnly.requiredShards).toBe(275);
    expect(levelOnly.requiredCores).toBe(0);
    expect(levelOnly.coreCompletionPercent).toBe(100);

    const invalidLevelValidStar = calculateExclusiveWeapon({
      fromLevel: 15,
      toLevel: 10,
      fromStarStep: 0,
      toStarStep: 5,
      heroCount: 1,
      coreProfile: "guide_cumulative_920",
    });
    expect(invalidLevelValidStar.isInvalidLevelRange).toBe(true);
    expect(invalidLevelValidStar.isInvalidStarRange).toBe(false);
    expect(invalidLevelValidStar.requiredShards).toBe(0);
    expect(invalidLevelValidStar.requiredCores).toBe(120);
  });
});

describe("4.3 Vũ Khí Độc Quyền — Suite 2: v2.0 4-Zone Architecture, 2-Step Avatar Picker, 4 Gold + 1 Red Star & Info Popover", () => {
  const resolved = getCalculatorToolBySlug("hero-gear", "exclusive-weapon")!;
  const tool = resolved.tool;

  it("renders default 1 Hero Lv.0 ➔ Lv.20 (1.19K / 1,185 Shards) and 0★ ➔ 5★ (920 Meteoric Iron Cores) across 4 v2.0 zones", () => {
    render(<ExclusiveWeaponCalculator tool={tool} locale="vi" />);

    expect(
      screen.getByRole("heading", { level: 1, name: /Vũ Khí Độc Quyền/i })
    ).toBeDefined();

    expect(screen.getByTestId("ew-zone-current")).toBeDefined();
    expect(screen.getByTestId("ew-zone-avatar")).toBeDefined();
    expect(screen.getByTestId("ew-zone-target")).toBeDefined();
    expect(screen.getByTestId("exclusive-weapon-kpi-card")).toBeDefined();

    expect(screen.getByTestId("ew-total-shards").textContent).toBe("1.19K");
    expect(screen.getByTestId("ew-total-shards").getAttribute("title")).toBe(
      "1,185"
    );
    expect(screen.getByTestId("ew-total-cores").textContent).toBe("920");
  });

  it("toggles Core SSoT profile (920 ➔ 2,385) and selects Hero Exclusive Weapon via the 2-step Central Avatar Popover", () => {
    render(<ExclusiveWeaponCalculator tool={tool} locale="vi" />);

    // Switch to Raw Subtier profile (2,385 Cores per hero)
    const rawProfileBtn = screen.getByTestId("core-profile-raw_subtier_2385");
    fireEvent.click(rawProfileBtn);
    expect(screen.getByTestId("ew-total-cores").textContent).toBe("2.38K");
    expect(screen.getByTestId("ew-total-cores").getAttribute("title")).toBe(
      "2,385"
    );

    // Open 2-step Central Avatar Picker -> Step 1: Nature -> Step 2: Tidecaller
    fireEvent.click(screen.getByTestId("ew-central-avatar-btn"));
    expect(screen.getByTestId("ew-avatar-picker-popover")).toBeDefined();

    fireEvent.click(screen.getByTestId("ew-faction-nature"));
    fireEvent.click(screen.getByTestId("ew-hero-tidecaller"));

    expect(screen.queryByTestId("ew-avatar-picker-popover")).toBeNull();
    expect(
      screen.getAllByText(/Đinh Ba San Hô|Coral Fork/i).length
    ).toBeGreaterThan(0);
  });

  it("enforces MD3 single-border containment (max depth <= 1), zero sub-12px micro-text, and zero Vietnamese inside font-mono", () => {
    expect(
      countMicroTextOccurrences(
        readSource("src/components/calculators/exclusive-weapon-calculator.tsx")
      )
    ).toBe(0);
    expect(
      countMicroTextOccurrences(
        readSource(
          "src/components/calculators/exclusive-weapon-step-selector.tsx"
        )
      )
    ).toBe(0);

    const { container } = render(
      <ExclusiveWeaponCalculator tool={tool} locale="vi" />
    );

    expect(getMaxBorderedContainerDepth(container)).toBeLessThanOrEqual(1);
    expect(findMicroTextElements(container)).toEqual([]);
    expect(findMonoElementsWithVietnamese(container)).toEqual([]);
  });

  it("renders pure English copy when locale='en' with zero Vietnamese diacritics", () => {
    const { container } = render(
      <ExclusiveWeaponCalculator tool={tool} locale="en" />
    );

    fireEvent.click(screen.getByTestId("ew-central-avatar-btn"));
    fireEvent.click(screen.getByTestId("ew-info-trigger"));

    const text = container.textContent ?? "";
    expect(text).toContain("Universal Exclusive Gear Shard");
    expect(text).toContain("Meteoric Iron Core");
    expect(text).toContain("Wings of Judgement");
    expect(VI_DIACRITIC_REGEX.test(text)).toBe(false);
  });

  it("marks all 3 Phase 4 Hero Gear calculators (4.1, 4.2, 4.3) as status='ready' in registry.ts", () => {
    const t41 = getCalculatorToolBySlug("hero-gear", "gear-enhance");
    const t42 = getCalculatorToolBySlug("hero-gear", "gear-promotion");
    const t43 = getCalculatorToolBySlug("hero-gear", "exclusive-weapon");

    expect(t41?.tool.status).toBe("ready");
    expect(t42?.tool.status).toBe("ready");
    expect(t43?.tool.status).toBe("ready");
  });
});

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

describe("4.3 Trang Bị Độc Quyền — Suite 1: Quantitative SSoT Engine (Lv.0➔20 Shards & 0★➔5★ Meteoric Iron Cores)", () => {
  it("defines exact Lv.0..20 Exclusive Shard curve (5 / 75 / 275 / 605 / 1,185) and Game Cache Meteoric Iron Core SSoT (2,385)", () => {
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

    // Game Cache SSoT (65 -> 265 -> 745 -> 1,465 -> 2,385)
    const starSteps = getExclusiveStarSteps();
    expect(starSteps).toHaveLength(26);
    expect(starSteps[0].cumulativeCores).toBe(0);
    expect(starSteps[5].cumulativeCores).toBe(65);
    expect(starSteps[10].cumulativeCores).toBe(265);
    expect(starSteps[15].cumulativeCores).toBe(745);
    expect(starSteps[20].cumulativeCores).toBe(1_465);
    expect(starSteps[25].cumulativeCores).toBe(2_385);

    expect(EXCLUSIVE_SKILL_MILESTONES).toHaveLength(5);
    expect(EXCLUSIVE_WEAPON_HERO_CATALOG).toHaveLength(35);
    expect(
      EXCLUSIVE_WEAPON_HERO_CATALOG.filter((h) => h.faction === "league")
    ).toHaveLength(12);
    expect(
      EXCLUSIVE_WEAPON_HERO_CATALOG.filter((h) => h.faction === "nature")
    ).toHaveLength(11);
    expect(
      EXCLUSIVE_WEAPON_HERO_CATALOG.filter((h) => h.faction === "horde")
    ).toHaveLength(12);

    expect(clampExclusiveWeaponLevel(-5)).toBe(0);
    expect(clampExclusiveWeaponLevel(99)).toBe(20);
    expect(clampExclusiveStarStep(-1)).toBe(0);
    expect(clampExclusiveStarStep(99)).toBe(25);

    // Verify Thuật Sĩ (Warlock) is in the catalog with expected weapon
    const warlock = EXCLUSIVE_WEAPON_HERO_CATALOG.find((h) => h.heroId === "warlock");
    expect(warlock).toBeDefined();
    expect(warlock?.faction).toBe("horde");
    expect(warlock?.weaponName.vi).toBe("Lưỡi Hái Nguyền Rủa");
    expect(warlock?.weaponIconPath).toBe(
      "/images/equipment/exclusive-weapons/equipment_Exclusive025.webp"
    );
  });

  it("calculates exact Shards and Meteoric Iron Cores for 1 hero (×1 default), plus next milestone distance", () => {
    const oneHeroMax = calculateExclusiveWeapon({
      fromLevel: 0,
      toLevel: 20,
      fromStarStep: 0,
      toStarStep: 25,
      heroCount: 1,
      selectedHeroId: "adjudicator",
      ownedShards: 185,
      ownedCores: 120,
    });

    expect(oneHeroMax.requiredShards).toBe(1_185);
    expect(oneHeroMax.requiredCores).toBe(2_385);
    expect(oneHeroMax.missingShards).toBe(1_000);
    expect(oneHeroMax.missingCores).toBe(2_265);
    expect(oneHeroMax.shardsToNextMilestone).toBe(0);

    // Mid-progression Lv.1 -> Lv.10 (275 - 5 = 270 Shards; next milestone Lv.15 = 605 - 275 = 330 Shards)
    const midHero = calculateExclusiveWeapon({
      fromLevel: 1,
      toLevel: 10,
      fromStarStep: 0,
      toStarStep: 10,
      heroCount: 1,
      selectedHeroId: "desert_prince",
    });

    expect(midHero.requiredShards).toBe(270);
    expect(midHero.requiredCores).toBe(265);
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
    });
    expect(invalidLevelValidStar.isInvalidLevelRange).toBe(true);
    expect(invalidLevelValidStar.isInvalidStarRange).toBe(false);
    expect(invalidLevelValidStar.requiredShards).toBe(0);
    expect(invalidLevelValidStar.requiredCores).toBe(65);
  });
});

describe("4.3 Trang Bị Độc Quyền — Suite 2: v2.0 4-Zone Architecture, 2-Step Avatar Picker, 4 Gold + 1 Red Star & Info Popover", () => {
  const resolved = getCalculatorToolBySlug("hero-gear", "exclusive-gear")!;
  const tool = resolved.tool;

  it("renders default 1 Hero Lv.0 ➔ Lv.20 (1.19K / 1,185 Shards) and 0★ ➔ 5★ (2.38K / 2,385 Meteoric Iron Cores) across 4 v2.0 zones", () => {
    render(<ExclusiveWeaponCalculator tool={tool} locale="vi" />);

    expect(
      screen.getByRole("heading", { level: 1, name: /Trang Bị Độc Quyền/i })
    ).toBeDefined();

    expect(screen.getByTestId("ew-zone-current")).toBeDefined();
    expect(screen.getByTestId("ew-zone-avatar")).toBeDefined();
    expect(screen.getByTestId("ew-zone-target")).toBeDefined();
    expect(screen.getByTestId("exclusive-weapon-kpi-card")).toBeDefined();

    expect(screen.getByTestId("ew-total-shards").textContent).toBe("1.19K");
    expect(screen.getByTestId("ew-total-shards").getAttribute("title")).toBe(
      "1,185"
    );
    expect(screen.getByTestId("ew-total-cores").textContent).toBe("2.38K");
    expect(screen.getByTestId("ew-total-cores").getAttribute("title")).toBe(
      "2,385"
    );
  });

  it("displays Game Cache SSoT profile (2,385 Cores) and selects Thuật Sĩ (Warlock) via 1-step 3-column modal", () => {
    render(<ExclusiveWeaponCalculator tool={tool} locale="vi" />);

    // SSoT Game Cache badge is visible with 2,385
    expect(screen.getByTestId("core-profile-badge").textContent).toBe("2,385");

    // Verify trigger button label is "Đổi trang bị độc quyền"
    const triggerBtn = screen.getByTestId("ew-change-gear-trigger");
    expect(triggerBtn.textContent).toContain("Đổi trang bị độc quyền");

    // Open 1-step Central Avatar Modal
    fireEvent.click(triggerBtn);
    expect(screen.getByTestId("ew-avatar-picker-popover")).toBeDefined();

    // 3 Columns present
    expect(screen.getByTestId("ew-column-league")).toBeDefined();
    expect(screen.getByTestId("ew-column-horde")).toBeDefined();
    expect(screen.getByTestId("ew-column-nature")).toBeDefined();

    // Click Warlock directly in 1 step
    const warlockBtn = screen.getByTestId("ew-hero-warlock");
    expect(warlockBtn).toBeDefined();
    fireEvent.click(warlockBtn);

    expect(screen.queryByTestId("ew-avatar-picker-popover")).toBeNull();
    expect(
      screen.getAllByText(/Lưỡi Hái Nguyền Rủa|Cursed Scythe/i).length
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
    const t43 = getCalculatorToolBySlug("hero-gear", "exclusive-gear");

    expect(t41?.tool.status).toBe("ready");
    expect(t42?.tool.status).toBe("ready");
    expect(t43?.tool.status).toBe("ready");
  });
});

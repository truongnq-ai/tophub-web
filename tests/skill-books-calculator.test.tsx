import React from "react";
import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import viMessages from "../messages/vi.json";
import {
  ECONOMIC_SWEET_SPOT_SKILL_LEVEL,
  MAX_SKILL_BOOK_LEVEL,
  MID_ROI_SUBCAP_SKILL_LEVEL,
  MIN_SKILL_BOOK_LEVEL,
  SKILL_BOOK_LEVEL_TABLE,
  SKILL_PRESET_CONFIGS,
  SKILL_SLOT_DEFINITIONS,
  calculateHeroSkillBooksUpgrade,
  clampSkillLevel,
  getCumulativeSkillBooksAtLevel,
  getStepSkillBooksAtLevel,
} from "../src/content/calculators/skill-books-data";
import { getCalculatorToolBySlug } from "../src/content/calculators/registry";
import { SkillBooksCalculator } from "../src/components/calculators/skill-books-calculator";
import { CalculatorPlaceholderView } from "../src/components/calculators/calculator-placeholder-view";
import { VI_DIACRITIC_REGEX } from "./utils/md3-audit";

describe("2.1 Sách Kỹ Năng — Quantitative SSoT Engine (Lv.1 ➔ Lv.15)", () => {
  it("matches exact step and cumulative Skill Book costs from Lv.1 to Lv.15 in SSoT 👤Heroes", () => {
    expect(SKILL_BOOK_LEVEL_TABLE).toHaveLength(MAX_SKILL_BOOK_LEVEL);
    expect(MIN_SKILL_BOOK_LEVEL).toBe(1);
    expect(ECONOMIC_SWEET_SPOT_SKILL_LEVEL).toBe(10);
    expect(MID_ROI_SUBCAP_SKILL_LEVEL).toBe(12);
    expect(MAX_SKILL_BOOK_LEVEL).toBe(15);

    const expectedSteps = [
      { level: 1, step: 0, cumulative: 0 },
      { level: 2, step: 100, cumulative: 100 },
      { level: 3, step: 200, cumulative: 300 },
      { level: 4, step: 400, cumulative: 700 },
      { level: 5, step: 600, cumulative: 1_300 },
      { level: 6, step: 800, cumulative: 2_100 },
      { level: 7, step: 1_100, cumulative: 3_200 },
      { level: 8, step: 1_300, cumulative: 4_500 },
      { level: 9, step: 1_600, cumulative: 6_100 },
      { level: 10, step: 1_900, cumulative: 8_000 },
      { level: 11, step: 2_200, cumulative: 10_200 },
      { level: 12, step: 2_700, cumulative: 12_900 },
      { level: 13, step: 3_200, cumulative: 16_100 },
      { level: 14, step: 3_900, cumulative: 20_000 },
      { level: 15, step: 4_700, cumulative: 24_700 },
    ] as const;

    for (const row of expectedSteps) {
      expect(getStepSkillBooksAtLevel(row.level)).toBe(row.step);
      expect(getCumulativeSkillBooksAtLevel(row.level)).toBe(row.cumulative);
    }

    expect(clampSkillLevel(0)).toBe(1);
    expect(clampSkillLevel(99)).toBe(15);
    expect(SKILL_SLOT_DEFINITIONS).toHaveLength(6);
    expect(SKILL_PRESET_CONFIGS.length).toBeGreaterThanOrEqual(6);
  });

  it("calculates exact Skill Books for 4, 5, and 6 skill slots and Queue 1 squad scaling (1 / 5 / 6 heroes)", () => {
    const ssrLv10 = calculateHeroSkillBooksUpgrade({
      slotCount: 4,
      heroCount: 1,
      fromLevels: [1, 1, 1, 1, 1, 1],
      toLevels: [10, 10, 10, 10, 10, 10],
      ownedSkillBooks: 0,
    });
    expect(ssrLv10.perHeroRequiredBooks).toBe(32_000);
    expect(ssrLv10.totalRequiredBooks).toBe(32_000);
    expect(ssrLv10.booksSavedVsAllMax15).toBe(66_800);

    const ssrLv15 = calculateHeroSkillBooksUpgrade({
      slotCount: 4,
      heroCount: 1,
      fromLevels: [1, 1, 1, 1, 1, 1],
      toLevels: [15, 15, 15, 15, 15, 15],
      ownedSkillBooks: 32_000,
    });
    expect(ssrLv15.perHeroRequiredBooks).toBe(98_800);
    expect(ssrLv15.totalRequiredBooks).toBe(98_800);
    expect(ssrLv15.missingSkillBooks).toBe(66_800);
    expect(ssrLv15.preLv10BooksTotal).toBe(32_000);
    expect(ssrLv15.postLv10BooksTotal).toBe(66_800);

    const mythic10To15 = calculateHeroSkillBooksUpgrade({
      slotCount: 5,
      heroCount: 1,
      fromLevels: [10, 10, 10, 10, 10, 10],
      toLevels: [15, 15, 15, 15, 15, 15],
      ownedSkillBooks: 20_000,
    });
    expect(mythic10To15.alreadyInvestedPerHero).toBe(40_000);
    expect(mythic10To15.targetCumulativePerHero).toBe(123_500);
    expect(mythic10To15.perHeroRequiredBooks).toBe(83_500);
    expect(mythic10To15.totalRequiredBooks).toBe(83_500);
    expect(mythic10To15.missingSkillBooks).toBe(63_500);

    const sixSlotsMax = calculateHeroSkillBooksUpgrade({
      slotCount: 6,
      heroCount: 1,
      fromLevels: [1, 1, 1, 1, 1, 1],
      toLevels: [15, 15, 15, 15, 15, 15],
      ownedSkillBooks: 0,
    });
    expect(sixSlotsMax.perHeroRequiredBooks).toBe(148_200);

    const queue6MythicMax = calculateHeroSkillBooksUpgrade({
      slotCount: 5,
      heroCount: 6,
      fromLevels: [1, 1, 1, 1, 1, 1],
      toLevels: [15, 15, 15, 15, 15, 15],
      ownedSkillBooks: 240_000,
    });
    expect(queue6MythicMax.totalRequiredBooks).toBe(741_000);
    expect(queue6MythicMax.missingSkillBooks).toBe(501_000);
  });

  it("evaluates role-priority funnels (Carry 15/15/10/15 & Tank/Support 10/12/12/10) and clamps invalid ranges safely", () => {
    const carry4Slots = calculateHeroSkillBooksUpgrade({
      slotCount: 4,
      heroCount: 1,
      fromLevels: [1, 1, 1, 1, 1, 1],
      toLevels: [15, 15, 10, 15, 15, 10],
      ownedSkillBooks: 0,
    });
    expect(carry4Slots.perHeroRequiredBooks).toBe(82_100);
    expect(carry4Slots.booksSavedVsAllMax15).toBe(16_700);

    const tank4Slots = calculateHeroSkillBooksUpgrade({
      slotCount: 4,
      heroCount: 1,
      fromLevels: [1, 1, 1, 1, 1, 1],
      toLevels: [10, 12, 12, 10, 10, 10],
      ownedSkillBooks: 0,
    });
    expect(tank4Slots.perHeroRequiredBooks).toBe(41_800);

    const invalidRange = calculateHeroSkillBooksUpgrade({
      slotCount: 4,
      heroCount: 1,
      fromLevels: [12, 10, 10, 10, 1, 1],
      toLevels: [10, 10, 10, 10, 1, 1],
      ownedSkillBooks: 0,
    });
    expect(invalidRange.isInvalidRange).toBe(true);
    expect(invalidRange.totalRequiredBooks).toBe(0);
  });
});

describe("2.1 Sách Kỹ Năng — Interactive UI & Bilingual Purity", () => {
  const selection = getCalculatorToolBySlug("skills-faction", "skill-books")!;

  it("marks skill-books as ready in registry and mounts via CalculatorPlaceholderView", () => {
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
    expect(screen.getByTestId("skill-books-calculator")).toBeTruthy();
  });

  it("supports switching 4 / 5 / 6 skill slots, single-hero scope (Rule R1), and compact K/M/B input parsing", () => {
    render(
      <SkillBooksCalculator
        zone={selection.zone}
        category={selection.category}
        tool={selection.tool}
        locale="vi"
      />
    );

    // Rule R1: Single-hero scope (no squad multiplier buttons)
    expect(screen.queryByTestId("skill-squad-count-1-btn")).toBeNull();
    expect(screen.queryByTestId("skill-squad-count-5-btn")).toBeNull();
    expect(screen.queryByTestId("skill-squad-count-6-btn")).toBeNull();

    // Default: Mythic 5 skills, 1 hero, From Lv.10 -> To Lv.15 = 83,500 books (83.5K)
    expect(screen.getByTestId("skill-books-required-value").textContent).toBe(
      "83.5K"
    );

    // Click From Preset Lv.1 -> 123,500 books (123.5K) for 5 skills
    fireEvent.click(screen.getByTestId("from-skill-preset-lv1-btn"));
    expect(screen.getByTestId("skill-books-required-value").textContent).toBe(
      "123.5K"
    );

    // Switch slot count to 4 skills -> 98,800 books (98.8K)
    fireEvent.click(screen.getByTestId("skill-slot-count-4-btn"));
    expect(screen.getByTestId("skill-books-required-value").textContent).toBe(
      "98.8K"
    );

    // Enter "32k" into owned input -> missing = 66,800 (-66.8K)
    fireEvent.change(screen.getByTestId("skill-books-owned-input"), {
      target: { value: "32k" },
    });
    expect(
      screen.getByTestId("skill-books-missing-badge").textContent
    ).toContain("-66.8K");
  });

  it("passes strict English bilingual purity gate with zero Vietnamese diacritics", () => {
    const { container } = render(
      <SkillBooksCalculator
        zone={selection.zone}
        category={selection.category}
        tool={selection.tool}
        locale="en"
      />
    );

    fireEvent.click(screen.getByTestId("toggle-skill-books-breakdown-btn"));
    const allText = container.textContent ?? "";
    expect(VI_DIACRITIC_REGEX.test(allText)).toBe(false);
  });
});

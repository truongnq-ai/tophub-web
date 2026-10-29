import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  AWAKENING_FACTION_CONFIGS,
  AWAKENING_MILESTONE_NODES,
  GUILD_COIN_S1_PER_SOUL_STONE,
  GUILD_HONOR_PER_SOUL_STONE,
  calculateHeroAwakening,
  clampAwakeningStepIndex,
  getAwakeningHeroesByFaction,
  getAwakeningNodeByStep,
} from "../src/content/calculators/hero-awakening-data";
import { getCalculatorToolBySlug } from "../src/content/calculators/registry";
import { HeroAwakeningCalculator } from "../src/components/calculators/hero-awakening-calculator";

const VI_DIACRITIC_REGEX =
  /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]/;

describe("Suite 1 — Hero Awakening Quantitative Engine (SSoT 9 Soul Stones & 345 Shards)", () => {
  it("defines 20 exact milestone nodes (stepIndex 0..19) totaling 9 Soul Stones and 345 Shards (AC-AWK-01)", () => {
    expect(AWAKENING_MILESTONE_NODES).toHaveLength(20);
    const tier0 = getAwakeningNodeByStep(0);
    const tier4 = getAwakeningNodeByStep(19);

    expect(tier0.cumulativeStones).toBe(0);
    expect(tier0.cumulativeShards).toBe(0);
    expect(tier4.cumulativeStones).toBe(9);
    expect(tier4.cumulativeShards).toBe(345);

    const resFull = calculateHeroAwakening({
      faction: "horde",
      fromStepIndex: 0,
      toStepIndex: 19,
      ownedStones: 0,
      ownedShards: 0,
    });

    expect(resFull.isInvalidRange).toBe(false);
    expect(resFull.requiredStones).toBe(9);
    expect(resFull.requiredShards).toBe(345);
    expect(resFull.missingStones).toBe(9);
    expect(resFull.missingShards).toBe(345);
    expect(resFull.missingStonesGuildHonorCost).toBe(
      9 * GUILD_HONOR_PER_SOUL_STONE
    );
    expect(resFull.missingStonesGuildCoinS1Cost).toBe(
      9 * GUILD_COIN_S1_PER_SOUL_STONE
    );
    expect(resFull.tierBreakdown).toHaveLength(4);
  });

  it("matches the Warlock in-game screenshot benchmark: Tier 1 Lv.5 (step 6) -> Tier 2 Lv.0 (step 7) costs 2 Soul Stones and 15 Shards (AC-AWK-02)", () => {
    const resStep = calculateHeroAwakening({
      faction: "horde",
      fromStepIndex: 6,
      toStepIndex: 7,
      ownedStones: 1,
      ownedShards: 5,
    });

    expect(resStep.requiredStones).toBe(2);
    expect(resStep.requiredShards).toBe(15);
    expect(resStep.missingStones).toBe(1);
    expect(resStep.missingShards).toBe(10);
    expect(resStep.missingStonesGuildHonorCost).toBe(40000);
  });

  it("calculates Tier 1 Lv.5 (step 6) -> Tier 4 Mythic (step 19) and Tier 1 Lv.0 (step 1) -> Tier 4 accurately (AC-AWK-03)", () => {
    const fromStep6 = calculateHeroAwakening({
      faction: "horde",
      fromStepIndex: 6,
      toStepIndex: 19,
      ownedStones: 1,
      ownedShards: 5,
    });
    expect(fromStep6.alreadyInvestedStones).toBe(1);
    expect(fromStep6.alreadyInvestedShards).toBe(55);
    expect(fromStep6.requiredStones).toBe(8);
    expect(fromStep6.requiredShards).toBe(290);
    expect(fromStep6.missingStones).toBe(7);
    expect(fromStep6.missingShards).toBe(285);

    const fromStep1 = calculateHeroAwakening({
      faction: "league",
      fromStepIndex: 1,
      toStepIndex: 19,
    });
    expect(fromStep1.requiredStones).toBe(8);
    expect(fromStep1.requiredShards).toBe(340);

    const fromStep7 = calculateHeroAwakening({
      faction: "nature",
      fromStepIndex: 7,
      toStepIndex: 19,
    });
    expect(fromStep7.requiredStones).toBe(6);
    expect(fromStep7.requiredShards).toBe(275);
  });

  it("handles sub-level ranges requiring 0 Soul Stones without division-by-zero NaN and sanitizes invalid/negative inputs (AC-AWK-09)", () => {
    const subOnly = calculateHeroAwakening({
      faction: "league",
      fromStepIndex: 1,
      toStepIndex: 6,
      ownedStones: 0,
      ownedShards: 20,
    });

    expect(subOnly.requiredStones).toBe(0);
    expect(subOnly.requiredShards).toBe(50);
    expect(subOnly.stoneCompletionPercent).toBe(100);
    expect(subOnly.shardCompletionPercent).toBe(40);

    const invalid = calculateHeroAwakening({
      faction: "nature",
      fromStepIndex: 13,
      toStepIndex: 7,
      ownedStones: -5,
      ownedShards: Number.NaN,
    });

    expect(invalid.isInvalidRange).toBe(true);
    expect(invalid.requiredStones).toBe(0);
    expect(invalid.requiredShards).toBe(0);
    expect(invalid.ownedStones).toBe(0);
    expect(invalid.ownedShards).toBe(0);
    expect(clampAwakeningStepIndex(-10)).toBe(0);
    expect(clampAwakeningStepIndex(99)).toBe(19);
  });

  it("prioritizes Core Awakening Legendary heroes first for each faction (league, horde, nature)", () => {
    const leagueHeroes = getAwakeningHeroesByFaction("league");
    const hordeHeroes = getAwakeningHeroesByFaction("horde");
    const natureHeroes = getAwakeningHeroesByFaction("nature");

    expect(leagueHeroes[0]?.id).toBe(
      AWAKENING_FACTION_CONFIGS.league.defaultHeroId
    );
    expect(hordeHeroes[0]?.id).toBe(
      AWAKENING_FACTION_CONFIGS.horde.defaultHeroId
    );
    expect(natureHeroes[0]?.id).toBe(
      AWAKENING_FACTION_CONFIGS.nature.defaultHeroId
    );
  });
});

describe("Suite 2 — Compact v2.1 UI: Central Faction->Hero Hub, 4-Tier + 5-Sub-level Bar, Slider Ends & [i] Breakdown", () => {
  const resolved = getCalculatorToolBySlug("heroes", "hero-awakening")!;

  it("renders Central Avatar with single Hero Name, 4-Tier preview bar with 5 sub-levels, +/- slider ends, Dual Resource cards, and [i] Breakdown (AC-AWK-04..08)", () => {
    render(
      <HeroAwakeningCalculator
        zone={resolved.zone}
        category={resolved.category}
        tool={resolved.tool}
        locale="vi"
      />
    );

    expect(screen.getByTestId("hero-awakening-calculator")).toBeDefined();
    expect(screen.getByTestId("central-hero-avatar-hub")).toBeDefined();

    // Duy nhất 1 vị trí hiển thị tên tướng dưới Avatar trung tâm (Mặc định: Pháp Sư Hắc Ám / Thuật Sĩ)
    const heroNameNodes = screen.getAllByTestId("central-hero-name");
    expect(heroNameNodes).toHaveLength(1);

    // Hiển thị "Bậc Thức Tỉnh Hiện Tại" & "Bậc Thức Tỉnh Muốn Đạt", không có "Điểm Xuất Phát (X)" hay "Mục Tiêu Đích (Y)"
    expect(screen.getByText("Bậc Thức Tỉnh Hiện Tại")).toBeDefined();
    expect(screen.getByText("Bậc Thức Tỉnh Muốn Đạt")).toBeDefined();
    expect(screen.queryByText("Điểm Xuất Phát (X)")).toBeNull();
    expect(screen.queryByText("Mục Tiêu Đích (Y)")).toBeNull();

    // 4-Tier preview bar trên cả 2 vùng Xuất phát (from) và Đích đến (to)
    expect(screen.getByTestId("from-tier-btn-1")).toBeDefined();
    expect(screen.getByTestId("from-tier-btn-2")).toBeDefined();
    expect(screen.getByTestId("from-tier-btn-3")).toBeDefined();
    expect(screen.getByTestId("from-tier-btn-4")).toBeDefined();
    expect(screen.getByTestId("from-sublevel-btn-6")).toBeDefined();
    expect(screen.getByTestId("from-step-minus")).toBeDefined();
    expect(screen.getByTestId("from-step-plus")).toBeDefined();

    // Mặc định từ step 6 (Bậc 1 Lv.5) -> step 19 (Bậc 4 Hóa Đỏ): cần 8 Đá Linh Hồn & 290 Mảnh
    expect(screen.getByTestId("awakening-required-stones").textContent).toBe(
      "8"
    );
    expect(screen.getByTestId("awakening-required-shards").textContent).toBe(
      "290"
    );
    expect(screen.getByTestId("awakening-guild-honor-badge").textContent).toMatch(
      /320,000|320\.000/
    );

    // Bảng chi tiết mặc định ẩn, bấm [i] mới hiển thị
    expect(screen.queryByTestId("awakening-steps-breakdown-panel")).toBeNull();
    fireEvent.click(screen.getByTestId("toggle-awakening-breakdown-btn"));
    expect(
      screen.getByTestId("awakening-steps-breakdown-panel")
    ).toBeDefined();
  });

  it("supports Sequential Faction -> Hero Picker (Click Avatar -> Select League -> Select Adjudicator -> Auto-close) and updates Soul Stone type (AC-AWK-05)", () => {
    render(
      <HeroAwakeningCalculator
        zone={resolved.zone}
        category={resolved.category}
        tool={resolved.tool}
        locale="vi"
      />
    );

    expect(screen.queryByTestId("hero-sequential-picker")).toBeNull();
    fireEvent.click(screen.getByTestId("central-hero-avatar-trigger"));
    expect(screen.getByTestId("hero-sequential-picker")).toBeDefined();

    // Bước 1: Chọn Phe Liên Minh (league)
    fireEvent.click(screen.getByTestId("faction-card-league"));

    // Bước 2: Chọn Tướng Thẩm Phán Quan (hero-adjudicator) -> Tự động đóng Popover
    fireEvent.click(screen.getByTestId("select-hero-hero-adjudicator"));
    expect(screen.queryByTestId("hero-sequential-picker")).toBeNull();
    expect(screen.getByTestId("central-hero-name").textContent).toContain(
      "Thẩm Phán Quan"
    );
  });

  it("renders 100% pure English with zero Vietnamese diacritics when locale='en' (including open popovers and [i] breakdown) (AC-AWK-10)", () => {
    const { container } = render(
      <HeroAwakeningCalculator
        zone={resolved.zone}
        category={resolved.category}
        tool={resolved.tool}
        locale="en"
      />
    );

    fireEvent.click(screen.getByTestId("central-hero-avatar-trigger"));
    fireEvent.click(screen.getByTestId("toggle-awakening-breakdown-btn"));

    expect(screen.getByText("Current Awakening Tier")).toBeDefined();
    expect(screen.getByText("Target Awakening Tier")).toBeDefined();
    expect(screen.queryByText("Starting Point (X)")).toBeNull();
    expect(screen.queryByText("Target Goal (Y)")).toBeNull();
    expect(container.textContent ?? "").not.toMatch(VI_DIACRITIC_REGEX);
  });
});

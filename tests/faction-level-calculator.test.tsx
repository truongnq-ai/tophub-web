import React from "react";
import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import viMessages from "../messages/vi.json";
import {
  FACTION_AURA_CORE_MAX_LEVEL,
  FACTION_CONFIGS,
  FACTION_LEVEL_TABLE,
  FACTION_MAX_LEVEL,
  FACTION_MIN_LEVEL,
  FACTION_SSOT_MEAT_MAX_LEVEL,
  calculateFactionLevelUpgrade,
  clampFactionBarsForLevel,
  clampFactionLevel,
  getCumulativeFactionState,
  getFactionLevelRow,
} from "../src/content/calculators/faction-level-data";
import { getCalculatorToolBySlug } from "../src/content/calculators/registry";
import { FactionLevelCalculator } from "../src/components/calculators/faction-level-calculator";
import { CalculatorPlaceholderView } from "../src/components/calculators/calculator-placeholder-view";
import { VI_DIACRITIC_REGEX } from "./utils/md3-audit";

describe("2.2 Cấp Phe Phái — Quantitative SSoT Engine (Lv.1 ➔ Lv.80)", () => {
  it("matches exact SSoT rows and cumulative milestones at Lv.10, Lv.20, Lv.30, Lv.40, and Lv.50", () => {
    expect(FACTION_MIN_LEVEL).toBe(1);
    expect(FACTION_AURA_CORE_MAX_LEVEL).toBe(40);
    expect(FACTION_SSOT_MEAT_MAX_LEVEL).toBe(50);
    expect(FACTION_MAX_LEVEL).toBe(80);
    expect(FACTION_LEVEL_TABLE).toHaveLength(80);
    expect(Object.keys(FACTION_CONFIGS)).toEqual(["league", "horde", "nature"]);

    const lv1 = getFactionLevelRow(1, "ssot_verified");
    expect(lv1.bars).toBe(1);
    expect(lv1.meatPerBarK).toBe(700);
    expect(lv1.totalMeatK).toBe(700);
    expect(lv1.shards).toBe(1);
    expect(lv1.atkPerBar).toBe(8);
    expect(lv1.hpPerBar).toBe(200);

    const lv10 = getFactionLevelRow(10, "ssot_verified");
    expect(lv10.bars).toBe(10);
    expect(lv10.meatPerBarK).toBe(771);
    expect(lv10.totalMeatK).toBe(7_710);
    expect(lv10.shards).toBe(16);
    expect(lv10.atkPerBar).toBe(10);
    expect(lv10.hpPerBar).toBe(0);
    expect(lv10.auraQueueHpPct).toBe(5);

    const lv30 = getFactionLevelRow(30, "ssot_verified");
    expect(lv30.bars).toBe(12);
    expect(lv30.meatPerBarK).toBe(2_214);
    expect(lv30.totalMeatK).toBe(26_568);
    expect(lv30.shards).toBe(50);
    expect(lv30.atkPerBar).toBe(18);
    expect(lv30.hpPerBar).toBe(450);
    expect(lv30.auraQueueHpPct).toBe(5);

    const lv40 = getFactionLevelRow(40, "ssot_verified");
    expect(lv40.bars).toBe(12);
    expect(lv40.meatPerBarK).toBe(3_415);
    expect(lv40.totalMeatK).toBe(40_980);
    expect(lv40.shards).toBe(70);
    expect(lv40.atkPerBar).toBe(0);
    expect(lv40.hpPerBar).toBe(0);
    expect(lv40.auraQueueHpPct).toBe(5);

    const lv50 = getFactionLevelRow(50, "ssot_verified");
    expect(lv50.bars).toBe(12);
    expect(lv50.meatPerBarK).toBe(4_615);
    expect(lv50.totalMeatK).toBe(55_380);

    const baseState = getCumulativeFactionState(
      { level: 1, completedBars: 0 },
      "ssot_verified"
    );
    expect(baseState.cumulativeMeatK).toBe(0);
    expect(baseState.cumulativeShards).toBe(0);
    expect(baseState.cumulativeAuraQueueHpPct).toBe(0);

    const doneLv10 = getCumulativeFactionState(
      { level: 10, completedBars: 10 },
      "ssot_verified"
    );
    expect(doneLv10.cumulativeMeatK).toBe(30_352);
    expect(doneLv10.cumulativeShards).toBe(75);
    expect(doneLv10.cumulativeAtk).toBe(348);
    expect(doneLv10.cumulativeHp).toBe(6_200);
    expect(doneLv10.cumulativeAuraQueueHpPct).toBe(5);

    const doneLv20 = getCumulativeFactionState(
      { level: 20, completedBars: 12 },
      "ssot_verified"
    );
    expect(doneLv20.cumulativeMeatK).toBe(136_754);
    expect(doneLv20.cumulativeShards).toBe(297);
    expect(doneLv20.cumulativeAtk).toBe(1_452);
    expect(doneLv20.cumulativeHp).toBe(9_800);
    expect(doneLv20.cumulativeAuraQueueHpPct).toBe(10);

    const doneLv30 = getCumulativeFactionState(
      { level: 30, completedBars: 12 },
      "ssot_verified"
    );
    expect(doneLv30.cumulativeMeatK).toBe(347_222);
    expect(doneLv30.cumulativeShards).toBe(667);
    expect(doneLv30.cumulativeAtk).toBe(2_964);
    expect(doneLv30.cumulativeHp).toBe(47_600);
    expect(doneLv30.cumulativeAuraQueueHpPct).toBe(15);

    const doneLv40 = getCumulativeFactionState(
      { level: 40, completedBars: 12 },
      "ssot_verified"
    );
    expect(doneLv40.cumulativeMeatK).toBe(692_162);
    expect(doneLv40.exactMeat).toBe(692_162_000);
    expect(doneLv40.cumulativeShards).toBe(1_237);
    expect(doneLv40.cumulativeAtk).toBe(4_908);
    expect(doneLv40.cumulativeHp).toBe(96_200);
    expect(doneLv40.cumulativeAuraQueueHpPct).toBe(20);
    expect(doneLv40.cumulativeBars).toBe(389);

    const doneLv50Ssot = getCumulativeFactionState(
      { level: 50, completedBars: 12 },
      "ssot_verified"
    );
    expect(doneLv50Ssot.cumulativeMeatK).toBe(1_181_162);
    expect(doneLv50Ssot.exactMeat).toBe(1_181_162_000);
    expect(doneLv50Ssot.cumulativeShards).toBe(1_307);
    expect(doneLv50Ssot.cumulativeAtk).toBe(4_908);
    expect(doneLv50Ssot.cumulativeHp).toBe(96_200);
    expect(doneLv50Ssot.cumulativeAuraQueueHpPct).toBe(20);
  });

  it("enforces strict mathematical transitivity: Completing Lv.L (bars/bars) === Starting Lv.L+1 (0/bars)", () => {
    for (const lv of [1, 5, 10, 16, 20, 30, 40, 49]) {
      const row = getFactionLevelRow(lv, "ssot_verified");
      const endOfLv = getCumulativeFactionState(
        { level: lv, completedBars: row.bars },
        "ssot_verified"
      );
      const startOfNextLv = getCumulativeFactionState(
        { level: lv + 1, completedBars: 0 },
        "ssot_verified"
      );

      expect(endOfLv).toEqual(startOfNextLv);
    }

    const seg1 = calculateFactionLevelUpgrade({
      faction: "horde",
      shardRarity: "legendary",
      mode: "ssot_verified",
      fromPoint: { level: 1, completedBars: 0 },
      toPoint: { level: 30, completedBars: 12 },
    });
    const seg2 = calculateFactionLevelUpgrade({
      faction: "horde",
      shardRarity: "legendary",
      mode: "ssot_verified",
      fromPoint: { level: 30, completedBars: 12 },
      toPoint: { level: 50, completedBars: 12 },
    });
    const full = calculateFactionLevelUpgrade({
      faction: "horde",
      shardRarity: "legendary",
      mode: "ssot_verified",
      fromPoint: { level: 1, completedBars: 0 },
      toPoint: { level: 50, completedBars: 12 },
    });

    expect(seg1.requiredMeat + seg2.requiredMeat).toBe(full.requiredMeat);
    expect(seg1.requiredShards + seg2.requiredShards).toBe(full.requiredShards);
    expect(seg1.gainedAtk + seg2.gainedAtk).toBe(full.gainedAtk);
    expect(seg1.gainedHp + seg2.gainedHp).toBe(full.gainedHp);
    expect(seg1.gainedAuraQueueHpPct + seg2.gainedAuraQueueHpPct).toBe(
      full.gainedAuraQueueHpPct
    );
  });

  it("calculates bar-by-bar partial progress within a level and supports extended_s1 mode up to Lv.80", () => {
    const partialToCompleteLv20 = calculateFactionLevelUpgrade({
      faction: "league",
      shardRarity: "legendary",
      mode: "ssot_verified",
      fromPoint: { level: 20, completedBars: 5 },
      toPoint: { level: 20, completedBars: 12 },
      ownedMeat: 5_000_000,
      ownedShards: 10,
    });
    expect(partialToCompleteLv20.requiredBars).toBe(7);
    expect(partialToCompleteLv20.requiredMeatK).toBe(7 * 1_222);
    expect(partialToCompleteLv20.requiredMeat).toBe(8_554_000);
    expect(partialToCompleteLv20.missingMeat).toBe(3_554_000);
    expect(partialToCompleteLv20.requiredShards).toBe(30);
    expect(partialToCompleteLv20.missingShards).toBe(20);
    expect(partialToCompleteLv20.gainedAtk).toBe(7 * 12);
    expect(partialToCompleteLv20.gainedHp).toBe(7 * 300);
    expect(partialToCompleteLv20.gainedAuraQueueHpPct).toBe(5);

    const midBarOnly = calculateFactionLevelUpgrade({
      faction: "nature",
      shardRarity: "epic",
      mode: "ssot_verified",
      fromPoint: { level: 20, completedBars: 2 },
      toPoint: { level: 20, completedBars: 8 },
    });
    expect(midBarOnly.requiredBars).toBe(6);
    expect(midBarOnly.requiredMeatK).toBe(6 * 1_222);
    expect(midBarOnly.requiredShards).toBe(0);
    expect(midBarOnly.gainedAuraQueueHpPct).toBe(0);

    const fullLv80Extended = calculateFactionLevelUpgrade({
      faction: "horde",
      shardRarity: "legendary",
      mode: "extended_s1",
      fromPoint: { level: 1, completedBars: 0 },
      toPoint: { level: 80, completedBars: 12 },
    });
    expect(fullLv80Extended.isInvalidRange).toBe(false);
    expect(fullLv80Extended.requiredMeatK).toBeGreaterThan(1_181_162);
    expect(fullLv80Extended.requiredShards).toBeGreaterThan(1_307);
    expect(fullLv80Extended.targetAuraQueueHpPct).toBe(40);

    expect(clampFactionLevel(0)).toBe(1);
    expect(clampFactionLevel(99)).toBe(80);
    expect(clampFactionBarsForLevel(1, 5)).toBe(1);
    expect(clampFactionBarsForLevel(30, 99)).toBe(12);
  });
});

describe("2.2 Cấp Phe Phái — Interactive UI & Bilingual Purity", () => {
  const selection = getCalculatorToolBySlug("skills-faction", "faction-level")!;

  it("marks faction-level as ready in registry and mounts via CalculatorPlaceholderView", () => {
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
    expect(screen.getByTestId("faction-level-calculator")).toBeTruthy();
  });

  it("supports Faction selection, populated Lv.41-80 extended S1+ progression by default, milestone presets, and K/M/B inputs", () => {
    render(
      <FactionLevelCalculator
        zone={selection.zone}
        category={selection.category}
        tool={selection.tool}
        locale="vi"
      />
    );

    // Default: Base (Lv.1 • 0 bars) -> Lv.40 (12/12 bars) = 692.16M Meat & 1,237 Shards (1.24K)
    expect(screen.getByTestId("faction-required-meat-value").textContent).toBe(
      "692.16M"
    );
    expect(
      screen.getByTestId("faction-required-shards-value").textContent
    ).toBe("1.24K");

    // Click Target Preset Lv.50 (Extended S1+ populated by default -> 2,007 Shards = 2.01K)
    fireEvent.click(screen.getByTestId("to-faction-preset-lv50-btn"));
    expect(
      screen.getByTestId("faction-required-shards-value").textContent
    ).toBe("2.01K");

    // Click Target Preset Lv.80 -> ensures Lv.51-80 Meat and Lv.42-80 Shards are populated (non-zero)
    fireEvent.click(screen.getByTestId("to-faction-preset-lv80-btn"));
    expect(screen.getByTestId("faction-required-meat-value").textContent).not.toBe(
      "0"
    );
    expect(screen.getByTestId("faction-required-shards-value").textContent).not.toBe(
      "0"
    );

    // Switch back to Lv.40
    fireEvent.click(screen.getByTestId("to-faction-preset-lv40-btn"));

    // Enter "500m" into Owned Meat input -> missing = 192.16M
    fireEvent.change(screen.getByTestId("faction-owned-meat-input"), {
      target: { value: "500m" },
    });
    expect(
      screen.getByTestId("faction-missing-meat-badge").textContent
    ).toContain("-192.16M");

    // Enter "1k" into Owned Shards input -> missing = 237
    fireEvent.change(screen.getByTestId("faction-owned-shards-input"), {
      target: { value: "1k" },
    });
    expect(
      screen.getByTestId("faction-missing-shards-badge").textContent
    ).toContain("-237");
  });

  it("passes strict English bilingual purity gate with zero Vietnamese diacritics", () => {
    const { container } = render(
      <FactionLevelCalculator
        zone={selection.zone}
        category={selection.category}
        tool={selection.tool}
        locale="en"
      />
    );

    fireEvent.click(screen.getByTestId("toggle-faction-breakdown-btn"));
    const allText = container.textContent ?? "";
    expect(VI_DIACRITIC_REGEX.test(allText)).toBe(false);
  });
});

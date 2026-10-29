"use client";

import React from "react";
import { Flame } from "lucide-react";
import {
  getAwakeningNodeByStep,
  type AwakeningMilestoneNode,
} from "@/content/calculators/hero-awakening-data";
import type { CalculatorLocale } from "@/content/calculators/types";
import { cn } from "@/lib/utils";
import { CALC_MD3, CalculatorStepperButton } from "./calculator-md3-primitives";

interface HeroAwakeningStepSelectorProps {
  readonly idPrefix: "from" | "to";
  readonly title: string;
  readonly stepIndex: number;
  readonly nextStepShards: number;
  readonly nextStepStones: number;
  readonly locale: CalculatorLocale;
  readonly onChangeStepIndex: (nextIndex: number) => void;
}

interface MajorTierCardDef {
  readonly tierNumber: 1 | 2 | 3 | 4;
  readonly unlockStepIndex: number;
  readonly subStepIndices: readonly number[];
  readonly stonesRequiredForUnlock: number;
}

const FOUR_MAJOR_TIERS: readonly MajorTierCardDef[] = [
  {
    tierNumber: 1,
    unlockStepIndex: 1,
    subStepIndices: [2, 3, 4, 5, 6],
    stonesRequiredForUnlock: 1,
  },
  {
    tierNumber: 2,
    unlockStepIndex: 7,
    subStepIndices: [8, 9, 10, 11, 12],
    stonesRequiredForUnlock: 2,
  },
  {
    tierNumber: 3,
    unlockStepIndex: 13,
    subStepIndices: [14, 15, 16, 17, 18],
    stonesRequiredForUnlock: 2,
  },
  {
    tierNumber: 4,
    unlockStepIndex: 19,
    subStepIndices: [],
    stonesRequiredForUnlock: 4,
  },
];

export function HeroAwakeningStepSelector({
  idPrefix,
  title,
  stepIndex,
  nextStepShards,
  nextStepStones,
  locale,
  onChangeStepIndex,
}: HeroAwakeningStepSelectorProps) {
  const currentNode: AwakeningMilestoneNode = getAwakeningNodeByStep(stepIndex);

  const summaryStyle =
    currentNode.majorTier === 4
      ? { surface: "bg-rose-500/10", accent: "text-rose-700 dark:text-rose-400" }
      : currentNode.majorTier >= 1
        ? { surface: "bg-amber-500/10", accent: "text-amber-700 dark:text-amber-400" }
        : { surface: "bg-muted/50", accent: "text-muted-foreground" };

  const nextCostText =
    stepIndex >= 19
      ? locale === "vi"
        ? "Tối đa"
        : "Max"
      : nextStepStones > 0
        ? locale === "vi"
          ? `+${nextStepStones} Đá • +${nextStepShards} Mảnh`
          : `+${nextStepStones} Stones • +${nextStepShards} Shards`
        : locale === "vi"
          ? `+${nextStepShards} Mảnh`
          : `+${nextStepShards} Shards`;

  const stoneUnit = locale === "vi" ? "Đá" : "Stones";
  const shardUnit = locale === "vi" ? "Mảnh" : "Shards";

  return (
    <div
      data-testid={`${idPrefix}-awakening-selector-card`}
      className={cn(CALC_MD3.surfaceCard, "space-y-3")}
    >
      {/* 1. Header: Title + Tier 0 Reset + Cumulative Stones & Shards */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className={CALC_MD3.sectionTitle}>{title}</h3>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            data-testid={`${idPrefix}-tier-btn-0`}
            onClick={() => onChangeStepIndex(0)}
            className={cn(
              CALC_MD3.chipButton,
              "px-3 font-sans",
              stepIndex === 0
                ? "bg-amber-500 text-slate-950"
                : "bg-muted/60 text-muted-foreground hover:text-foreground"
            )}
          >
            {locale === "vi" ? "Bậc 0" : "Tier 0"}
          </button>
          <span
            data-testid={`${idPrefix}-awakening-cumulative`}
            className="rounded-lg bg-muted/60 px-2.5 py-1 text-xs font-sans font-semibold text-foreground"
          >
            <span className="font-mono">{currentNode.cumulativeStones}</span>{" "}
            {stoneUnit} •{" "}
            <span className="font-mono">{currentNode.cumulativeShards}</span>{" "}
            {shardUnit}
          </span>
        </div>
      </div>

      {/* 2. Current Tier + Sub-level Summary Strip (tonal, không viền) */}
      <div
        data-testid={`${idPrefix}-awakening-summary`}
        className={cn(
          "flex items-center justify-between gap-2 rounded-xl px-3 py-2",
          summaryStyle.surface
        )}
      >
        <span className="truncate text-sm font-sans font-semibold text-foreground">
          {currentNode.label[locale]}
        </span>
        <span
          className={cn(
            "shrink-0 text-xs sm:text-sm font-sans font-bold tabular-nums",
            summaryStyle.accent
          )}
        >
          {stepIndex}/19 ({nextCostText})
        </span>
      </div>

      {/* 3. Xem trước tiến bậc: 4 hàng bậc dọc [Nút Bậc][5 Nấc nhỏ] — mỗi nấc ≥ 44px */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-1 text-xs font-sans font-semibold">
          <span className="text-muted-foreground">
            {locale === "vi"
              ? "Xem trước tiến bậc (4 Bậc & 5 Nấc Nhỏ)"
              : "Tier Advancement Preview (4 Tiers & 5 Sub-levels)"}
          </span>
          <span className="text-rose-600 dark:text-rose-400">
            {locale === "vi" ? "Bậc 4 = Hóa Đỏ" : "Tier 4 = Mythic"}
          </span>
        </div>

        <div
          data-testid={`${idPrefix}-awakening-tier-list`}
          className="grid grid-cols-1 gap-1.5"
        >
          {FOUR_MAJOR_TIERS.map((tierDef) => {
            const isTierUnlocked = stepIndex >= tierDef.unlockStepIndex;
            const isCurrentMajorTier = currentNode.majorTier === tierDef.tierNumber;
            const isMythicTier4 = tierDef.tierNumber === 4;
            const tierLabel =
              locale === "vi"
                ? `Bậc ${tierDef.tierNumber}`
                : `Tier ${tierDef.tierNumber}`;

            return (
              <div
                key={tierDef.tierNumber}
                data-testid={`${idPrefix}-awakening-tier-row-${tierDef.tierNumber}`}
                className={cn(
                  "flex items-center gap-1.5 rounded-xl p-1 transition-colors",
                  isMythicTier4 && isTierUnlocked
                    ? "bg-rose-500/15"
                    : isCurrentMajorTier
                      ? "bg-amber-500/15"
                      : isTierUnlocked
                        ? "bg-amber-500/[0.06]"
                        : "bg-muted/40 dark:bg-muted/25"
                )}
              >
                {/* Major Tier Button */}
                <button
                  type="button"
                  data-testid={`${idPrefix}-tier-btn-${tierDef.tierNumber}`}
                  onClick={() => onChangeStepIndex(tierDef.unlockStepIndex)}
                  className="flex min-h-[44px] w-[68px] shrink-0 flex-col items-center justify-center rounded-lg transition-colors hover:bg-background/70 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40"
                >
                  <span className="flex items-center gap-1">
                    {isMythicTier4 ? (
                      <Flame
                        className={cn(
                          "h-3.5 w-3.5",
                          isTierUnlocked
                            ? "fill-rose-500/30 text-rose-500"
                            : "text-muted-foreground"
                        )}
                        aria-hidden="true"
                      />
                    ) : null}
                    <span
                      className={cn(
                        "text-sm font-heading font-black leading-tight",
                        isMythicTier4 && isTierUnlocked
                          ? "text-rose-600 dark:text-rose-400"
                          : isTierUnlocked
                            ? "text-amber-700 dark:text-amber-400"
                            : "text-muted-foreground"
                      )}
                    >
                      {tierLabel}
                    </span>
                  </span>
                  <span className="text-xs font-sans text-muted-foreground">
                    +<span className="font-mono">{tierDef.stonesRequiredForUnlock}</span>{" "}
                    {stoneUnit}
                  </span>
                </button>

                {/* 5 Sub-levels (Lv.1..5) for Tiers 1–3; Mythic Badge for Tier 4 */}
                {tierDef.subStepIndices.length > 0 ? (
                  <div className="grid flex-1 grid-cols-5 gap-1">
                    {tierDef.subStepIndices.map((subStepIdx, subIdx) => {
                      const subLevelNum = subIdx + 1;
                      const isSubLit = stepIndex >= subStepIdx;
                      const isSubExact = stepIndex === subStepIdx;
                      const subTitle = `${tierLabel} • Lv.${subLevelNum}`;

                      return (
                        <button
                          key={subStepIdx}
                          type="button"
                          data-testid={`${idPrefix}-sublevel-btn-${subStepIdx}`}
                          onClick={() => onChangeStepIndex(subStepIdx)}
                          title={subTitle}
                          aria-label={subTitle}
                          className={cn(
                            "flex min-h-[44px] min-w-0 items-center justify-center rounded-lg font-mono text-xs font-bold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40",
                            isSubExact
                              ? "bg-amber-500 text-slate-950 ring-2 ring-amber-400"
                              : isSubLit
                                ? "bg-amber-500/30 text-amber-800 dark:text-amber-200"
                                : "bg-background/70 text-muted-foreground hover:bg-background"
                          )}
                        >
                          {subLevelNum}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex flex-1 items-center justify-center">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-lg px-3 py-1.5 text-xs font-sans font-extrabold uppercase tracking-wide",
                        isTierUnlocked
                          ? "bg-rose-500 text-white"
                          : "text-muted-foreground"
                      )}
                    >
                      {locale === "vi" ? "Hóa Đỏ ★" : "Mythic ★"}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Slider Row with 44px [-] / [+] at both ends */}
      <div className="flex items-center gap-2">
        <CalculatorStepperButton
          direction="decrease"
          testId={`${idPrefix}-step-minus`}
          disabled={stepIndex <= 0}
          onClick={() => onChangeStepIndex(stepIndex - 1)}
          ariaLabel={
            locale === "vi" ? "Giảm 1 nấc Thức Tỉnh" : "Decrease by 1 Awakening step"
          }
        />
        <input
          type="range"
          min={0}
          max={19}
          step={1}
          value={stepIndex}
          data-testid={`${idPrefix}-awakening-range-slider`}
          aria-label={title}
          onChange={(e) => onChangeStepIndex(Number(e.target.value))}
          className="h-11 min-w-0 flex-1 cursor-pointer accent-amber-500"
        />
        <CalculatorStepperButton
          direction="increase"
          testId={`${idPrefix}-step-plus`}
          disabled={stepIndex >= 19}
          onClick={() => onChangeStepIndex(stepIndex + 1)}
          ariaLabel={
            locale === "vi" ? "Tăng 1 nấc Thức Tỉnh" : "Increase by 1 Awakening step"
          }
        />
      </div>
    </div>
  );
}

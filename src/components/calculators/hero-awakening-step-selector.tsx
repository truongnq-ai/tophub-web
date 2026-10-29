"use client";

import React from "react";
import { Minus, Plus, ChevronRight, Flame } from "lucide-react";
import {
  getAwakeningNodeByStep,
  type AwakeningMilestoneNode,
} from "@/content/calculators/hero-awakening-data";
import type { CalculatorLocale } from "@/content/calculators/types";
import { cn } from "@/lib/utils";

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
      ? {
          border: "border-rose-500/45 bg-rose-500/[0.10]",
          accent: "text-rose-600 dark:text-rose-400",
        }
      : currentNode.majorTier >= 1
        ? {
            border: "border-amber-500/35 bg-amber-500/[0.08]",
            accent: "text-amber-600 dark:text-amber-400",
          }
        : {
            border: "border-border/80 bg-secondary/40",
            accent: "text-muted-foreground",
          };

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

  return (
    <div
      data-testid={`${idPrefix}-awakening-selector-card`}
      className="rounded-2xl border border-border/80 bg-card/80 p-3.5 sm:p-4 space-y-2.5 shadow-sm"
    >
      {/* 1. Compact Header + Tier 0 Reset + Cumulative Stones & Shards */}
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-sm sm:text-base font-heading font-black text-foreground truncate">
            {title}
          </h3>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            data-testid={`${idPrefix}-tier-btn-0`}
            onClick={() => onChangeStepIndex(0)}
            className={cn(
              "rounded-lg border px-2 py-1 text-[10px] font-mono font-bold transition-colors cursor-pointer",
              stepIndex === 0
                ? "border-amber-500 bg-amber-500 text-slate-950"
                : "border-border/70 bg-background/70 text-muted-foreground hover:text-foreground"
            )}
          >
            {locale === "vi" ? "Bậc 0" : "Tier 0"}
          </button>
          <span className="rounded-lg bg-secondary/90 border border-border px-2 py-1 font-mono text-[10px] font-bold text-foreground">
            {currentNode.cumulativeStones}{" "}
            {locale === "vi" ? "Đá" : "Stones"} •{" "}
            {currentNode.cumulativeShards}{" "}
            {locale === "vi" ? "Mảnh" : "Shards"}
          </span>
        </div>
      </div>

      {/* 2. Current Tier + Sub-level Summary Strip */}
      <div
        data-testid={`${idPrefix}-awakening-summary`}
        className={cn(
          "rounded-xl border px-3 py-1.5 flex items-center justify-between gap-2",
          summaryStyle.border
        )}
      >
        <span className="text-xs font-heading font-bold text-foreground truncate">
          {currentNode.label[locale]}
        </span>
        <span
          className={cn(
            "font-mono text-[10px] sm:text-[11px] font-extrabold shrink-0",
            summaryStyle.accent
          )}
        >
          {stepIndex}/19 ({nextCostText})
        </span>
      </div>

      {/* 3. Unified 4-Tier Bar (Xem trước tiến bậc: Bậc 1 ▶ Bậc 2 ▶ Bậc 3 ▶ Bậc 4) + 5 Sub-level Dots + [-]/[+] Slider */}
      <div className="space-y-2 rounded-xl border border-border/70 bg-background/70 p-2.5">
        <div className="flex items-center justify-between text-[10px] font-mono px-0.5">
          <span className="text-muted-foreground font-bold">
            {locale === "vi"
              ? "Xem trước tiến bậc (4 Bậc & 5 Nấc Nhỏ)"
              : "Tier Advancement Preview (4 Tiers & 5 Sub-levels)"}
          </span>
          <span className="text-rose-500 font-bold">
            {locale === "vi" ? "Bậc 4 = Hóa Đỏ" : "Tier 4 = Mythic"}
          </span>
        </div>

        {/* 4 Major Tiers Row with Integrated 5 Sub-levels */}
        <div className="grid grid-cols-4 gap-1.5 items-stretch">
          {FOUR_MAJOR_TIERS.map((tierDef, idx) => {
            const isTierUnlocked = stepIndex >= tierDef.unlockStepIndex;
            const isCurrentMajorTier =
              currentNode.majorTier === tierDef.tierNumber;
            const isMythicTier4 = tierDef.tierNumber === 4;

            return (
              <div
                key={tierDef.tierNumber}
                className={cn(
                  "relative flex flex-col justify-between rounded-xl border p-1.5 transition-all",
                  isMythicTier4 && isTierUnlocked
                    ? "border-rose-500 bg-rose-500/15"
                    : isCurrentMajorTier
                      ? "border-amber-500 bg-amber-500/12"
                      : isTierUnlocked
                        ? "border-amber-500/40 bg-amber-500/[0.05]"
                        : "border-border/60 bg-card/60"
                )}
              >
                {/* Major Tier Button */}
                <button
                  type="button"
                  data-testid={`${idPrefix}-tier-btn-${tierDef.tierNumber}`}
                  onClick={() => onChangeStepIndex(tierDef.unlockStepIndex)}
                  className="flex flex-col items-center justify-center gap-0.5 py-0.5 rounded-lg hover:bg-secondary/70 transition-colors cursor-pointer w-full"
                >
                  <div className="flex items-center gap-1">
                    {isMythicTier4 && (
                      <Flame
                        className={cn(
                          "w-3 h-3",
                          isTierUnlocked
                            ? "text-rose-500 fill-rose-500/30"
                            : "text-muted-foreground"
                        )}
                      />
                    )}
                    <span
                      className={cn(
                        "text-[11px] font-heading font-black leading-tight",
                        isMythicTier4 && isTierUnlocked
                          ? "text-rose-600 dark:text-rose-400"
                          : isTierUnlocked
                            ? "text-amber-600 dark:text-amber-400"
                            : "text-muted-foreground"
                      )}
                    >
                      {locale === "vi"
                        ? `Bậc ${tierDef.tierNumber}`
                        : `Tier ${tierDef.tierNumber}`}
                    </span>
                  </div>
                  <span className="font-mono text-[9px] text-muted-foreground">
                    +{tierDef.stonesRequiredForUnlock}{" "}
                    {locale === "vi" ? "Đá" : "St"}
                  </span>
                </button>

                {/* 5 Sub-level Dots (Lv.1..5) for Tiers 1, 2, 3; or Mythic Badge for Tier 4 */}
                {tierDef.subStepIndices.length > 0 ? (
                  <div className="grid grid-cols-5 gap-0.5 pt-1 mt-1 border-t border-border/50">
                    {tierDef.subStepIndices.map((subStepIdx, subIdx) => {
                      const subLevelNum = subIdx + 1;
                      const isSubLit = stepIndex >= subStepIdx;
                      const isSubExact = stepIndex === subStepIdx;

                      return (
                        <button
                          key={subStepIdx}
                          type="button"
                          data-testid={`${idPrefix}-sublevel-btn-${subStepIdx}`}
                          onClick={() => onChangeStepIndex(subStepIdx)}
                          title={
                            locale === "vi"
                              ? `Bậc ${tierDef.tierNumber} • Lv.${subLevelNum}`
                              : `Tier ${tierDef.tierNumber} • Lv.${subLevelNum}`
                          }
                          className={cn(
                            "h-4 rounded flex items-center justify-center font-mono text-[8px] font-bold transition-all cursor-pointer",
                            isSubExact
                              ? "bg-amber-500 text-slate-950 ring-1 ring-amber-400"
                              : isSubLit
                                ? "bg-amber-500/30 text-amber-700 dark:text-amber-300"
                                : "bg-secondary/70 text-muted-foreground/70 hover:bg-secondary"
                          )}
                        >
                          {subLevelNum}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="pt-1 mt-1 border-t border-border/50 text-center">
                    <span
                      className={cn(
                        "inline-block font-mono text-[8px] sm:text-[9px] font-extrabold uppercase px-1 py-0.5 rounded",
                        isTierUnlocked
                          ? "bg-rose-500 text-white"
                          : "text-muted-foreground/70"
                      )}
                    >
                      {locale === "vi" ? "Hóa Đỏ ★" : "Mythic ★"}
                    </span>
                  </div>
                )}

                {idx < 3 && (
                  <ChevronRight
                    aria-hidden="true"
                    className="hidden sm:block absolute -right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground/50 pointer-events-none z-10"
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Slider Row with [-] at Left Start and [+] at Right End */}
        <div className="flex items-center gap-2 pt-0.5">
          <button
            type="button"
            data-testid={`${idPrefix}-step-minus`}
            disabled={stepIndex <= 0}
            onClick={() => onChangeStepIndex(stepIndex - 1)}
            aria-label={
              locale === "vi"
                ? "Giảm 1 nấc Thức Tỉnh"
                : "Decrease by 1 Awakening step"
            }
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-card hover:bg-secondary disabled:opacity-40 cursor-pointer transition-colors"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>

          <input
            type="range"
            min={0}
            max={19}
            step={1}
            value={stepIndex}
            data-testid={`${idPrefix}-awakening-range-slider`}
            aria-label={title}
            onChange={(e) => onChangeStepIndex(Number(e.target.value))}
            className="w-full h-2 rounded-lg accent-amber-500 cursor-pointer"
          />

          <button
            type="button"
            data-testid={`${idPrefix}-step-plus`}
            disabled={stepIndex >= 19}
            onClick={() => onChangeStepIndex(stepIndex + 1)}
            aria-label={
              locale === "vi"
                ? "Tăng 1 nấc Thức Tỉnh"
                : "Increase by 1 Awakening step"
            }
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-card hover:bg-secondary disabled:opacity-40 cursor-pointer transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

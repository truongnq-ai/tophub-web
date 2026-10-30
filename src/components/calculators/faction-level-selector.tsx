"use client";

import React from "react";
import { Shield, Sparkles, Layers } from "lucide-react";
import {
  FACTION_MAX_LEVEL,
  FACTION_MILESTONE_PRESETS,
  FACTION_MIN_LEVEL,
  clampFactionBarsForLevel,
  clampFactionLevel,
  getCumulativeFactionState,
  getFactionLevelRow,
  type FactionCalculationMode,
  type FactionProgressPoint,
} from "@/content/calculators/faction-level-data";
import type { CalculatorLocale } from "@/content/calculators/types";
import {
  cn,
  formatCompactNumber,
  formatExactNumber,
} from "@/lib/utils";
import { CALC_MD3, CalculatorStepperButton } from "./calculator-md3-primitives";

export interface FactionLevelSelectorProps {
  readonly idPrefix: "from" | "to";
  readonly title: string;
  readonly point: FactionProgressPoint;
  readonly mode: FactionCalculationMode;
  readonly locale: CalculatorLocale;
  readonly onChangePoint: (nextPoint: FactionProgressPoint) => void;
}

export function FactionLevelSelector({
  idPrefix,
  title,
  point,
  mode,
  locale,
  onChangePoint,
}: FactionLevelSelectorProps) {
  const level = clampFactionLevel(point.level);
  const currentRow = getFactionLevelRow(level, mode);
  const completedBars = clampFactionBarsForLevel(level, point.completedBars);
  const cumulative = getCumulativeFactionState(
    { level, completedBars },
    mode
  );

  const meatUnit = locale === "vi" ? "Thịt" : "Meat";
  const shardUnit = locale === "vi" ? "Mảnh" : "Shards";

  const handleSelectLevel = (nextLevelRaw: number) => {
    const nextLevel = clampFactionLevel(nextLevelRaw);
    const nextRow = getFactionLevelRow(nextLevel, mode);
    // Khi chuyển cấp bằng thanh trượt/stepper, giữ trạng thái hoàn tất cấp (nextRow.bars) để khớp trực quan với bảng SSoT
    onChangePoint({
      level: nextLevel,
      completedBars: nextRow.bars,
    });
  };

  const handleSelectBars = (nextBarsRaw: number) => {
    const nextBars = clampFactionBarsForLevel(level, nextBarsRaw);
    onChangePoint({
      level,
      completedBars: nextBars,
    });
  };

  return (
    <div
      data-testid={`${idPrefix}-faction-selector`}
      className={cn(CALC_MD3.surfaceCard, "space-y-3")}
    >
      {/* Header + Cumulative Meat & Shards Badges */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-2.5">
        <div className="flex min-w-0 items-center gap-2">
          <Shield
            className="h-5 w-5 shrink-0 text-amber-500"
            aria-hidden="true"
          />
          <h3
            data-testid={`${idPrefix}-faction-selector-title`}
            className={CALC_MD3.sectionTitle}
          >
            {title}
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span
            data-testid={`${idPrefix}-cumulative-meat-badge`}
            title={formatExactNumber(cumulative.exactMeat)}
            className="shrink-0 rounded-lg bg-amber-500/15 px-2.5 py-1 text-xs font-sans font-bold text-amber-700 dark:text-amber-300"
          >
            <span className="font-mono">
              {formatCompactNumber(cumulative.exactMeat)}
            </span>{" "}
            {meatUnit}
          </span>
          <span
            data-testid={`${idPrefix}-cumulative-shards-badge`}
            className="shrink-0 rounded-lg bg-sky-500/15 px-2.5 py-1 text-xs font-sans font-bold text-sky-700 dark:text-sky-300"
          >
            <span className="font-mono">
              {formatExactNumber(cumulative.cumulativeShards)}
            </span>{" "}
            {shardUnit}
          </span>
        </div>
      </div>

      {/* Quick Milestone Presets (≥ 44px touch targets) */}
      <div className="flex flex-wrap items-center gap-1.5">
        {FACTION_MILESTONE_PRESETS.map((preset) => {
          const presetState = getCumulativeFactionState(preset.point, mode);
          const isSelected =
            cumulative.cumulativeBars === presetState.cumulativeBars;
          return (
            <button
              key={preset.id}
              type="button"
              data-testid={`${idPrefix}-faction-preset-${preset.id}-btn`}
              onClick={() => onChangePoint(preset.point)}
              className={cn(
                CALC_MD3.chipButton,
                "px-2.5 font-sans text-xs sm:text-sm",
                isSelected
                  ? "bg-amber-500 font-black text-slate-950"
                  : preset.isAuraMilestone
                    ? "bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20 dark:text-emerald-400"
                    : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {preset.isAuraMilestone ? (
                <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              ) : null}
              <span>{preset.shortLabel[locale]}</span>
            </button>
          );
        })}
      </div>

      {/* Hairline Divided List: Row 1 (Faction Level 1..80) + Row 2 (EXP Bars 0..bars) */}
      <ul
        data-testid={`${idPrefix}-faction-selector-list`}
        className={CALC_MD3.dividedList}
      >
        {/* Row 1: Faction Level (Lv.1 -> Lv.80) */}
        <li
          data-testid={`${idPrefix}-faction-level-row`}
          className="space-y-2.5 px-0 py-3"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2">
              <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500 font-mono text-xs font-black text-slate-950">
                1
              </span>
              <span className="text-sm font-heading font-bold text-foreground">
                {locale === "vi"
                  ? "Cấp Nghiên Cứu Phe Phái"
                  : "Faction Research Level"}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              {cumulative.cumulativeAuraQueueHpPct > 0 ? (
                <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/15 px-2 py-0.5 text-xs font-sans font-bold text-emerald-700 dark:text-emerald-300">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>
                    +<span className="font-mono">{cumulative.cumulativeAuraQueueHpPct}%</span>{" "}
                    {locale === "vi" ? "HP Đội" : "Queue HP"}
                  </span>
                </span>
              ) : null}
              <span
                data-testid={`${idPrefix}-faction-level-badge`}
                className="rounded-md bg-secondary px-2.5 py-0.5 font-mono text-sm font-black text-foreground"
              >
                Lv.{level}/{FACTION_MAX_LEVEL}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm font-sans text-muted-foreground">
            <span>
              {locale === "vi" ? "Chi phí cấp này:" : "This level cost:"}{" "}
              <span className="font-mono font-semibold text-foreground">
                {(currentRow.totalMeatK / 1_000).toFixed(3)}M
              </span>{" "}
              {meatUnit} •{" "}
              <span className="font-mono font-semibold text-sky-700 dark:text-sky-400">
                {currentRow.shards}
              </span>{" "}
              {shardUnit}
            </span>
            <span>
              ATK{" "}
              <span className="font-mono font-semibold text-foreground">
                +{formatExactNumber(cumulative.cumulativeAtk)}
              </span>{" "}
              • HP{" "}
              <span className="font-mono font-semibold text-foreground">
                +{formatExactNumber(cumulative.cumulativeHp)}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <CalculatorStepperButton
              direction="decrease"
              testId={`${idPrefix}-faction-level-minus-btn`}
              disabled={level <= FACTION_MIN_LEVEL}
              onClick={() => handleSelectLevel(level - 1)}
              ariaLabel={
                locale === "vi"
                  ? "Giảm cấp Phe Phái"
                  : "Decrease Faction Level"
              }
            />
            <input
              type="range"
              min={FACTION_MIN_LEVEL}
              max={FACTION_MAX_LEVEL}
              step={1}
              value={level}
              data-testid={`${idPrefix}-faction-level-slider`}
              aria-label={`${title} - Faction Level`}
              onChange={(e) => handleSelectLevel(Number(e.target.value))}
              className="h-11 min-w-0 flex-1 cursor-pointer accent-amber-500"
            />
            <CalculatorStepperButton
              direction="increase"
              testId={`${idPrefix}-faction-level-plus-btn`}
              disabled={level >= FACTION_MAX_LEVEL}
              onClick={() => handleSelectLevel(level + 1)}
              ariaLabel={
                locale === "vi"
                  ? "Tăng cấp Phe Phái"
                  : "Increase Faction Level"
              }
            />
          </div>
        </li>

        {/* Row 2: EXP Bars within current Level (0 -> currentRow.bars) */}
        <li
          data-testid={`${idPrefix}-faction-bars-row`}
          className="space-y-2.5 px-0 py-3"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2">
              <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-500 font-mono text-xs font-black text-slate-950">
                2
              </span>
              <span className="text-sm font-heading font-bold text-foreground">
                {locale === "vi"
                  ? `Vạch Thanh EXP Trong Lv.${level}`
                  : `EXP Bar Segments in Lv.${level}`}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="inline-flex items-center gap-1 rounded-md bg-muted/60 px-2 py-0.5 text-xs font-sans font-semibold text-muted-foreground">
                <Layers className="h-3.5 w-3.5 text-sky-500" aria-hidden="true" />
                <span>
                  {completedBars === currentRow.bars
                    ? locale === "vi"
                      ? "Hoàn tất cấp"
                      : "Completed"
                    : completedBars === 0
                      ? locale === "vi"
                        ? "Chưa bơm vạch"
                        : "0 bars filled"
                      : locale === "vi"
                        ? "Đang bơm dở"
                        : "Partial"}
                </span>
              </span>
              <span
                data-testid={`${idPrefix}-faction-bars-badge`}
                className="rounded-md bg-secondary px-2.5 py-0.5 font-mono text-sm font-black text-foreground"
              >
                {completedBars}/{currentRow.bars}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm font-sans text-muted-foreground">
            <span>
              {locale === "vi" ? "Mỗi vạch:" : "Per bar:"}{" "}
              <span className="font-mono font-semibold text-amber-700 dark:text-amber-400">
                {(currentRow.meatPerBarK / 1_000).toFixed(3)}M
              </span>{" "}
              {meatUnit}
            </span>
            <span>
              {locale === "vi" ? "Đột phá cuối cấp:" : "Breakthrough:"}{" "}
              <span className="font-mono font-semibold text-sky-700 dark:text-sky-400">
                {currentRow.shards}
              </span>{" "}
              {shardUnit}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <CalculatorStepperButton
              direction="decrease"
              testId={`${idPrefix}-faction-bars-minus-btn`}
              disabled={completedBars <= 0}
              onClick={() => handleSelectBars(completedBars - 1)}
              ariaLabel={
                locale === "vi"
                  ? "Giảm số vạch EXP"
                  : "Decrease EXP bar segment"
              }
            />
            <input
              type="range"
              min={0}
              max={currentRow.bars}
              step={1}
              value={completedBars}
              data-testid={`${idPrefix}-faction-bars-slider`}
              aria-label={`${title} - EXP Bars`}
              onChange={(e) => handleSelectBars(Number(e.target.value))}
              className="h-11 min-w-0 flex-1 cursor-pointer accent-sky-500"
            />
            <CalculatorStepperButton
              direction="increase"
              testId={`${idPrefix}-faction-bars-plus-btn`}
              disabled={completedBars >= currentRow.bars}
              onClick={() => handleSelectBars(completedBars + 1)}
              ariaLabel={
                locale === "vi"
                  ? "Tăng số vạch EXP"
                  : "Increase EXP bar segment"
              }
            />
          </div>
        </li>
      </ul>
    </div>
  );
}

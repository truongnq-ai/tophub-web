"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import {
  ENHANCEMENT_MASTER_TIERS,
  MAX_GEAR_ENHANCE_LEVEL,
  MIN_GEAR_ENHANCE_LEVEL,
  clampGearEnhanceLevel,
  getCumulativeGearEnhanceCost,
  getStepGearEnhanceCost,
  resolveEnhancementMasterTier,
  type GearEnhanceRarity,
} from "@/content/calculators/gear-enhance-data";
import type { CalculatorLocale } from "@/content/calculators/types";
import { cn, formatCompactNumber, formatExactNumber } from "@/lib/utils";
import { CALC_MD3, CalculatorStepperButton } from "./calculator-md3-primitives";

export interface GearEnhanceLevelSelectorProps {
  readonly idPrefix: string;
  readonly title: string;
  readonly level: number;
  readonly rarity: GearEnhanceRarity;
  readonly pieceMultiplier: number;
  readonly locale: CalculatorLocale;
  readonly onChangeLevel: (nextLevel: number) => void;
}

export function GearEnhanceLevelSelector({
  idPrefix,
  title,
  level,
  rarity,
  pieceMultiplier,
  locale,
  onChangeLevel,
}: GearEnhanceLevelSelectorProps) {
  const safeLevel = clampGearEnhanceLevel(level);
  const masterTier = resolveEnhancementMasterTier(safeLevel);
  const stepCost = getStepGearEnhanceCost(
    Math.min(MAX_GEAR_ENHANCE_LEVEL, safeLevel + 1),
    rarity
  );
  const cumulativeCost = getCumulativeGearEnhanceCost(safeLevel, rarity);

  const totalCumulativeRunes = cumulativeCost.runes * pieceMultiplier;
  const totalCumulativeMeat = cumulativeCost.meat * pieceMultiplier;
  const nextStepRunes =
    safeLevel >= MAX_GEAR_ENHANCE_LEVEL ? 0 : stepCost.runes * pieceMultiplier;

  const decreaseLabel =
    locale === "vi" ? "Giảm 1 cấp cường hóa" : "Decrease enhancement level by 1";
  const increaseLabel =
    locale === "vi" ? "Tăng 1 cấp cường hóa" : "Increase enhancement level by 1";

  return (
    <section
      data-testid={`${idPrefix}-gear-enhance-selector-card`}
      className={cn(CALC_MD3.surfaceCard, "space-y-4")}
    >
      {/* Header Row */}
      <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-2.5">
        <h2 className="text-base font-heading font-bold text-foreground">
          {title}
        </h2>
        <span
          data-testid={`${idPrefix}-level-badge`}
          className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500/15 px-3 py-1 text-sm font-heading font-black text-amber-700 dark:text-amber-300"
        >
          <span>Lv.{safeLevel}</span>
          {masterTier > 0 ? (
            <span className="text-xs font-sans font-bold">
              • {locale === "vi" ? `Bậc Thầy +${masterTier}` : `Master +${masterTier}`}
            </span>
          ) : null}
        </span>
      </div>

      {/* Enhancement Master Quick Milestone Chips (+0, +10, +20, +30, +40) */}
      <div className="space-y-1.5">
        <div className={cn(CALC_MD3.eyebrow, "text-muted-foreground")}>
          {locale === "vi"
            ? "Mốc Cộng Hưởng Bậc Thầy Cường Hóa"
            : "Enhancement Master Milestones"}
        </div>
        <div className="grid grid-cols-5 gap-1.5">
          {ENHANCEMENT_MASTER_TIERS.map((milestone) => {
            const isSelected = safeLevel === milestone.requiredMinLevel;
            const isReached =
              milestone.requiredMinLevel > 0 &&
              safeLevel >= milestone.requiredMinLevel;

            return (
              <button
                key={milestone.tier}
                type="button"
                data-testid={`${idPrefix}-milestone-${milestone.requiredMinLevel}-btn`}
                aria-pressed={isSelected}
                onClick={() => onChangeLevel(milestone.requiredMinLevel)}
                className={cn(
                  "flex min-h-[48px] flex-col items-center justify-center rounded-xl px-1.5 py-1.5 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40",
                  isSelected
                    ? "bg-amber-500 text-slate-950 font-black shadow-sm"
                    : isReached
                      ? "bg-amber-500/15 text-amber-700 dark:text-amber-300 font-bold hover:bg-amber-500/25"
                      : "bg-muted/50 text-muted-foreground font-semibold hover:bg-muted hover:text-foreground"
                )}
              >
                <span className="font-mono text-sm font-black">
                  +{milestone.requiredMinLevel}
                </span>
                <span className="text-xs font-sans truncate max-w-full">
                  {milestone.tier === 0
                    ? locale === "vi"
                      ? "Gốc"
                      : "Base"
                    : `T${milestone.tier / 10}`}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Range Slider with 44x44 Stepper Buttons */}
      <div className="space-y-2">
        <div className="flex items-center gap-2.5">
          <CalculatorStepperButton
            direction="decrease"
            testId={`${idPrefix}-level-minus-btn`}
            ariaLabel={decreaseLabel}
            disabled={safeLevel <= MIN_GEAR_ENHANCE_LEVEL}
            onClick={() => onChangeLevel(clampGearEnhanceLevel(safeLevel - 1))}
          />

          <div className="flex-1 space-y-1">
            <input
              type="range"
              data-testid={`${idPrefix}-level-slider`}
              min={MIN_GEAR_ENHANCE_LEVEL}
              max={MAX_GEAR_ENHANCE_LEVEL}
              step={1}
              value={safeLevel}
              aria-label={title}
              onChange={(e) =>
                onChangeLevel(clampGearEnhanceLevel(Number(e.target.value)))
              }
              className="h-2.5 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-amber-500"
            />
            <div className="flex justify-between text-xs font-mono text-muted-foreground">
              <span>Lv.0</span>
              <span>+10</span>
              <span>+20</span>
              <span>+30</span>
              <span>Lv.40</span>
            </div>
          </div>

          <CalculatorStepperButton
            direction="increase"
            testId={`${idPrefix}-level-plus-btn`}
            ariaLabel={increaseLabel}
            disabled={safeLevel >= MAX_GEAR_ENHANCE_LEVEL}
            onClick={() => onChangeLevel(clampGearEnhanceLevel(safeLevel + 1))}
          />
        </div>
      </div>

      {/* Tonal Summary Strip (No inner border to keep depth <= 1) */}
      <div
        data-testid={`${idPrefix}-enhance-summary`}
        className={cn(CALC_MD3.tonalGroup, "space-y-1.5")}
      >
        <div className="flex items-center justify-between gap-2 text-xs sm:text-sm">
          <span className="text-muted-foreground font-sans">
            {locale === "vi"
              ? "Tích lũy từ Lv.0 đến mốc này:"
              : "Cumulative from Lv.0 to this level:"}
          </span>
          <span className="font-mono font-bold text-foreground">
            {formatExactNumber(totalCumulativeRunes)} Rune
          </span>
        </div>

        <div className="flex items-center justify-between gap-2 text-xs sm:text-sm">
          <span className="text-muted-foreground font-sans">
            {locale === "vi" ? "Thịt tích lũy:" : "Cumulative Meat:"}
          </span>
          <span className="font-sans font-semibold text-muted-foreground">
            <span className="font-mono">
              {formatCompactNumber(totalCumulativeMeat)}
            </span>{" "}
            <span>{locale === "vi" ? "Thịt" : "Meat"}</span>
          </span>
        </div>

        <div className="flex items-center justify-between gap-2 border-t border-border/50 pt-1.5 text-xs">
          <span className="inline-flex items-center gap-1 text-amber-700 dark:text-amber-400 font-sans font-semibold">
            <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>
              {safeLevel >= MAX_GEAR_ENHANCE_LEVEL
                ? locale === "vi"
                  ? "Đã đạt trần Lv.40 (Sẵn sàng Đột Phá Sao)"
                  : "Max Lv.40 reached (Ready for Star Promotion)"
                : locale === "vi"
                  ? `Cấp kế tiếp (Lv.${safeLevel + 1}):`
                  : `Next level (Lv.${safeLevel + 1}):`}
            </span>
          </span>
          {safeLevel < MAX_GEAR_ENHANCE_LEVEL ? (
            <span className="font-mono font-bold text-amber-700 dark:text-amber-300">
              +{formatExactNumber(nextStepRunes)} Rune
            </span>
          ) : null}
        </div>
      </div>
    </section>
  );
}

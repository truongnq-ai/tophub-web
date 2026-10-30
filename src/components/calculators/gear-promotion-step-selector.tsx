"use client";

import React from "react";
import { Sparkles, Star } from "lucide-react";
import {
  GEAR_PROMOTION_STEPS,
  MAX_GEAR_PROMOTION_STEP,
  MIN_GEAR_PROMOTION_STEP,
  clampGearPromotionStep,
  type GearPromotionStarBracket,
  type GearPromotionSubTier,
} from "@/content/calculators/gear-promotion-data";
import type { CalculatorLocale } from "@/content/calculators/types";
import { cn } from "@/lib/utils";
import {
  CALC_MD3,
  CalculatorStepperButton,
} from "./calculator-md3-primitives";

export interface GearPromotionStepSelectorProps {
  readonly label: string;
  readonly badgeText: string;
  readonly stepIndex: number;
  readonly onChange: (nextStepIndex: number) => void;
  readonly locale: CalculatorLocale;
  readonly testIdPrefix: string;
}

const STAR_BRACKET_CHIPS: readonly {
  readonly starBracket: GearPromotionStarBracket;
  readonly defaultStepIndex: number;
  readonly label: Record<CalculatorLocale, string>;
}[] = [
  {
    starBracket: 0,
    defaultStepIndex: 0,
    label: { vi: "0★ Cam", en: "0★ Base" },
  },
  {
    starBracket: 1,
    defaultStepIndex: 5,
    label: { vi: "1★ Cam", en: "1★ Leg" },
  },
  {
    starBracket: 2,
    defaultStepIndex: 10,
    label: { vi: "2★ Cam", en: "2★ Leg" },
  },
  {
    starBracket: 3,
    defaultStepIndex: 15,
    label: { vi: "3★ Cam", en: "3★ Leg" },
  },
  {
    starBracket: 4,
    defaultStepIndex: 20,
    label: { vi: "4★ Cam", en: "4★ Leg" },
  },
  {
    starBracket: 5,
    defaultStepIndex: 25,
    label: { vi: "5★ Đỏ", en: "5★ Mythic" },
  },
];

const SUB_TIERS: readonly GearPromotionSubTier[] = [1, 2, 3, 4, 5];

export function GearPromotionStepSelector({
  label,
  badgeText,
  stepIndex,
  onChange,
  locale,
  testIdPrefix,
}: GearPromotionStepSelectorProps) {
  const safeStep = clampGearPromotionStep(stepIndex);
  const currentNode = GEAR_PROMOTION_STEPS[safeStep];

  const handleDecrement = () => {
    onChange(clampGearPromotionStep(safeStep - 1));
  };

  const handleIncrement = () => {
    onChange(clampGearPromotionStep(safeStep + 1));
  };

  const handleSelectStarBracket = (starBracket: GearPromotionStarBracket) => {
    if (starBracket === 0) {
      onChange(0);
      return;
    }
    const subTier = currentNode.subTier > 0 ? currentNode.subTier : 5;
    onChange((starBracket - 1) * 5 + subTier);
  };

  const handleSelectSubTier = (subTier: GearPromotionSubTier) => {
    const activeStar = currentNode.starBracket > 0 ? currentNode.starBracket : 1;
    onChange((activeStar - 1) * 5 + subTier);
  };

  return (
    <div
      data-testid={`${testIdPrefix}-container`}
      className={cn(CALC_MD3.tonalGroup, "space-y-3")}
    >
      {/* Top Row: Label + Stepper Display */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-md bg-amber-500/15 px-2 py-0.5 font-sans text-xs font-semibold text-amber-700 dark:text-amber-300">
              {badgeText}
            </span>
            <p className={CALC_MD3.sectionTitle}>{label}</p>
          </div>
          <p className="mt-1 font-sans text-xs font-medium text-foreground">
            {currentNode.label[locale]}
          </p>
          <p className="mt-0.5 font-sans text-xs text-muted-foreground">
            {locale === "vi" ? "Tích lũy 1 món:" : "Cumulative / piece:"}{" "}
            <span className="font-mono font-semibold text-foreground">
              {currentNode.cumulativeSolarGold.toLocaleString("en-US")}
            </span>{" "}
            {locale === "vi" ? "Vàng TD •" : "Solar Gold •"}{" "}
            <span className="font-mono font-semibold text-foreground">
              {currentNode.cumulativeRunes.toLocaleString("en-US")}
            </span>{" "}
            {locale === "vi" ? "Rune •" : "Runes •"}{" "}
            <span className="font-mono font-semibold text-foreground">
              {currentNode.cumulativeLegendaryStones}
            </span>{" "}
            {locale === "vi" ? "Đá Cam •" : "Leg Stones •"}{" "}
            <span className="font-mono font-semibold text-foreground">
              {currentNode.cumulativeMythicStones}
            </span>{" "}
            {locale === "vi" ? "Đá Đỏ" : "Mythic Stones"}
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <CalculatorStepperButton
            direction="decrease"
            testId={`${testIdPrefix}-minus`}
            ariaLabel={
              locale === "vi"
                ? `Giảm ${label} 1 tiểu bậc`
                : `Decrease ${label} by 1 sub-tier`
            }
            disabled={safeStep <= MIN_GEAR_PROMOTION_STEP}
            onClick={handleDecrement}
          />

          <div
            data-testid={`${testIdPrefix}-value`}
            className="flex min-h-[44px] min-w-[7.25rem] flex-col items-center justify-center rounded-xl bg-background/80 px-3 py-1 text-center"
          >
            <span className="font-sans text-xs font-bold text-foreground">
              {currentNode.shortLabel[locale]}
            </span>
            <span className="font-mono text-xs text-muted-foreground tabular-nums">
              {safeStep}/25
            </span>
          </div>

          <CalculatorStepperButton
            direction="increase"
            testId={`${testIdPrefix}-plus`}
            ariaLabel={
              locale === "vi"
                ? `Tăng ${label} 1 tiểu bậc`
                : `Increase ${label} by 1 sub-tier`
            }
            disabled={safeStep >= MAX_GEAR_PROMOTION_STEP}
            onClick={handleIncrement}
          />
        </div>
      </div>

      {/* Range Slider (0..25) */}
      <div className="space-y-1">
        <input
          type="range"
          min={MIN_GEAR_PROMOTION_STEP}
          max={MAX_GEAR_PROMOTION_STEP}
          step={1}
          value={safeStep}
          aria-label={label}
          data-testid={`${testIdPrefix}-slider`}
          onChange={(e) => onChange(clampGearPromotionStep(Number(e.target.value)))}
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-muted accent-amber-500"
        />
        <div className="flex justify-between font-mono text-xs text-muted-foreground tabular-nums">
          <span>0/25</span>
          <span>5/25</span>
          <span>10/25</span>
          <span>15/25</span>
          <span>20/25</span>
          <span>25/25</span>
        </div>
      </div>

      {/* Star Bracket Quick Chips (0★ Cam .. 5★ Đỏ) */}
      <div className="space-y-1.5">
        <span className="block font-sans text-xs font-medium text-muted-foreground">
          {locale === "vi" ? "Chọn nhanh Bậc Sao:" : "Quick Star Bracket:"}
        </span>
        <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-6">
          {STAR_BRACKET_CHIPS.map((chip) => {
            const isSelected = currentNode.starBracket === chip.starBracket;
            const isMythic = chip.starBracket === 5;
            return (
              <button
                key={chip.starBracket}
                type="button"
                data-testid={`${testIdPrefix}-star-${chip.starBracket}`}
                onClick={() => handleSelectStarBracket(chip.starBracket)}
                className={cn(
                  "inline-flex min-h-[44px] items-center justify-center gap-1 rounded-xl px-2 py-1.5 font-sans text-xs font-semibold transition-colors",
                  isSelected
                    ? isMythic
                      ? "bg-rose-500 text-white"
                      : "bg-amber-500 font-bold text-slate-950"
                    : "bg-background/70 text-muted-foreground hover:bg-background hover:text-foreground"
                )}
              >
                {isMythic ? (
                  <Sparkles className="h-3.5 w-3.5 shrink-0" />
                ) : (
                  <Star className="h-3 w-3 shrink-0" />
                )}
                <span>{chip.label[locale]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sub-Tier Selector (1/5 .. 5/5) when starBracket >= 1 */}
      {currentNode.starBracket >= 1 ? (
        <div className="space-y-1.5 pt-1">
          <span className="block font-sans text-xs font-medium text-muted-foreground">
            {locale === "vi"
              ? "Tiểu bậc trong Sao hiện tại (1/5 ➔ 5/5 Đột Phá):"
              : "Sub-tier within active Star (1/5 ➔ 5/5 Breakthrough):"}
          </span>
          <div className="grid grid-cols-5 gap-1.5">
            {SUB_TIERS.map((sub) => {
              const isSelected = currentNode.subTier === sub;
              const isBreakthrough = sub === 5;
              return (
                <button
                  key={sub}
                  type="button"
                  data-testid={`${testIdPrefix}-subtier-${sub}`}
                  onClick={() => handleSelectSubTier(sub)}
                  className={cn(
                    "inline-flex min-h-[44px] flex-col items-center justify-center rounded-xl px-2 py-1 text-center transition-colors",
                    isSelected
                      ? "bg-amber-500 font-bold text-slate-950"
                      : "bg-background/70 text-muted-foreground hover:bg-background hover:text-foreground"
                  )}
                >
                  <span className="font-mono text-xs font-bold tabular-nums">
                    {sub}/5
                  </span>
                  <span className="font-sans text-xs opacity-85">
                    {isBreakthrough
                      ? locale === "vi"
                        ? "Đột phá"
                        : "Break"
                      : locale === "vi"
                        ? "Bậc nhỏ"
                        : "Tier"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

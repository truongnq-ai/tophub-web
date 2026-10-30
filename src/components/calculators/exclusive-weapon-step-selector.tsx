"use client";

import React from "react";
import { Sparkles, Star } from "lucide-react";
import {
  EXCLUSIVE_WEAPON_LEVEL_STEPS,
  MAX_EXCLUSIVE_STAR_STEP,
  MAX_EXCLUSIVE_WEAPON_LEVEL,
  MIN_EXCLUSIVE_STAR_STEP,
  MIN_EXCLUSIVE_WEAPON_LEVEL,
  clampExclusiveStarStep,
  clampExclusiveWeaponLevel,
  getExclusiveStarSteps,
  type ExclusiveCoreProfile,
} from "@/content/calculators/exclusive-weapon-data";
import type { CalculatorLocale } from "@/content/calculators/types";
import { cn } from "@/lib/utils";
import {
  CALC_MD3,
  CalculatorStepperButton,
} from "./calculator-md3-primitives";

export interface ExclusiveWeaponStepSelectorProps {
  readonly mode: "level" | "star";
  readonly label: string;
  readonly badgeText: string;
  readonly value: number;
  readonly onChange: (nextValue: number) => void;
  readonly locale: CalculatorLocale;
  readonly testIdPrefix: string;
  readonly coreProfile?: ExclusiveCoreProfile;
}

const LEVEL_QUICK_CHIPS: readonly {
  readonly level: number;
  readonly label: Record<CalculatorLocale, string>;
}[] = [
  { level: 0, label: { vi: "Lv.0 (Khóa)", en: "Lv.0 (Lock)" } },
  { level: 1, label: { vi: "Lv.1 (Mở)", en: "Lv.1 (Unlock)" } },
  { level: 5, label: { vi: "Lv.5 (+5)", en: "Lv.5 (+5)" } },
  { level: 10, label: { vi: "Lv.10 (+10)", en: "Lv.10 (+10)" } },
  { level: 15, label: { vi: "Lv.15 (+15)", en: "Lv.15 (+15)" } },
  { level: 20, label: { vi: "Lv.20 (Đỉnh)", en: "Lv.20 (Max)" } },
];

const STAR_QUICK_CHIPS: readonly {
  readonly starBracket: 0 | 1 | 2 | 3 | 4 | 5;
  readonly stepIndex: number;
  readonly label: Record<CalculatorLocale, string>;
}[] = [
  { starBracket: 0, stepIndex: 0, label: { vi: "0★ (Gốc)", en: "0★ Base" } },
  { starBracket: 1, stepIndex: 5, label: { vi: "1★ (5/5)", en: "1★ (5/5)" } },
  { starBracket: 2, stepIndex: 10, label: { vi: "2★ (5/5)", en: "2★ (5/5)" } },
  { starBracket: 3, stepIndex: 15, label: { vi: "3★ (5/5)", en: "3★ (5/5)" } },
  { starBracket: 4, stepIndex: 20, label: { vi: "4★ (5/5)", en: "4★ (5/5)" } },
  { starBracket: 5, stepIndex: 25, label: { vi: "5★ (Đỉnh)", en: "5★ (Max)" } },
];

export function ExclusiveWeaponStepSelector({
  mode,
  label,
  badgeText,
  value,
  onChange,
  locale,
  testIdPrefix,
  coreProfile = "guide_cumulative_920",
}: ExclusiveWeaponStepSelectorProps) {
  if (mode === "level") {
    const safeLevel = clampExclusiveWeaponLevel(value);
    const currentNode = EXCLUSIVE_WEAPON_LEVEL_STEPS[safeLevel];

    return (
      <div
        data-testid={`${testIdPrefix}-container`}
        className={cn(CALC_MD3.tonalGroup, "space-y-3")}
      >
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
              {locale === "vi" ? "Tích lũy 1 tướng:" : "Cumulative / hero:"}{" "}
              <span className="font-mono font-semibold text-foreground">
                {currentNode.cumulativeShards.toLocaleString("en-US")}
              </span>{" "}
              {locale === "vi" ? "Mảnh Độc Quyền" : "Exclusive Shards"}
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <CalculatorStepperButton
              direction="decrease"
              testId={`${testIdPrefix}-minus`}
              ariaLabel={
                locale === "vi"
                  ? `Giảm ${label} 1 cấp`
                  : `Decrease ${label} by 1 level`
              }
              disabled={safeLevel <= MIN_EXCLUSIVE_WEAPON_LEVEL}
              onClick={() => onChange(clampExclusiveWeaponLevel(safeLevel - 1))}
            />

            <div
              data-testid={`${testIdPrefix}-value`}
              className="flex min-h-[44px] min-w-[6.25rem] flex-col items-center justify-center rounded-xl bg-background/80 px-3 py-1 text-center"
            >
              <span className="font-mono text-sm font-bold text-foreground tabular-nums">
                Lv.{safeLevel}
              </span>
              <span className="font-mono text-xs text-muted-foreground tabular-nums">
                {safeLevel}/20
              </span>
            </div>

            <CalculatorStepperButton
              direction="increase"
              testId={`${testIdPrefix}-plus`}
              ariaLabel={
                locale === "vi"
                  ? `Tăng ${label} 1 cấp`
                  : `Increase ${label} by 1 level`
              }
              disabled={safeLevel >= MAX_EXCLUSIVE_WEAPON_LEVEL}
              onClick={() => onChange(clampExclusiveWeaponLevel(safeLevel + 1))}
            />
          </div>
        </div>

        {/* Range Slider (0..20) */}
        <div className="space-y-1">
          <input
            type="range"
            min={MIN_EXCLUSIVE_WEAPON_LEVEL}
            max={MAX_EXCLUSIVE_WEAPON_LEVEL}
            step={1}
            value={safeLevel}
            aria-label={label}
            data-testid={`${testIdPrefix}-slider`}
            onChange={(e) =>
              onChange(clampExclusiveWeaponLevel(Number(e.target.value)))
            }
            className="h-2 w-full cursor-pointer appearance-none rounded-full bg-muted accent-amber-500"
          />
          <div className="flex justify-between font-mono text-xs text-muted-foreground tabular-nums">
            <span>Lv.0</span>
            <span>Lv.5</span>
            <span>Lv.10</span>
            <span>Lv.15</span>
            <span>Lv.20</span>
          </div>
        </div>

        {/* Milestone Quick Chips */}
        <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-6">
          {LEVEL_QUICK_CHIPS.map((chip) => {
            const isSelected = safeLevel === chip.level;
            return (
              <button
                key={chip.level}
                type="button"
                data-testid={`${testIdPrefix}-chip-${chip.level}`}
                onClick={() => onChange(chip.level)}
                className={cn(
                  "inline-flex min-h-[44px] items-center justify-center gap-1 rounded-xl px-2 py-1.5 font-sans text-xs font-semibold transition-colors",
                  isSelected
                    ? "bg-amber-500 font-bold text-slate-950"
                    : "bg-background/70 text-muted-foreground hover:bg-background hover:text-foreground"
                )}
              >
                <Sparkles className="h-3 w-3 shrink-0" />
                <span>{chip.label[locale]}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Star Mode (0..25 sub-tiers)
  const safeStarStep = clampExclusiveStarStep(value);
  const starSteps = getExclusiveStarSteps(coreProfile);
  const currentStarNode = starSteps[safeStarStep];

  return (
    <div
      data-testid={`${testIdPrefix}-container`}
      className={cn(CALC_MD3.tonalGroup, "space-y-3")}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-md bg-amber-500/15 px-2 py-0.5 font-sans text-xs font-semibold text-amber-700 dark:text-amber-300">
              {badgeText}
            </span>
            <p className={CALC_MD3.sectionTitle}>{label}</p>
          </div>
          <p className="mt-1 font-sans text-xs font-medium text-foreground">
            {currentStarNode.label[locale]}
          </p>
          <p className="mt-0.5 font-sans text-xs text-muted-foreground">
            {locale === "vi" ? "Tích lũy 1 tướng:" : "Cumulative / hero:"}{" "}
            <span className="font-mono font-semibold text-foreground">
              {currentStarNode.cumulativeCores.toLocaleString("en-US")}
            </span>{" "}
            {locale === "vi" ? "Lõi Sắt Thiên Thạch" : "Meteoric Iron Cores"}
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
            disabled={safeStarStep <= MIN_EXCLUSIVE_STAR_STEP}
            onClick={() => onChange(clampExclusiveStarStep(safeStarStep - 1))}
          />

          <div
            data-testid={`${testIdPrefix}-value`}
            className="flex min-h-[44px] min-w-[6.5rem] flex-col items-center justify-center rounded-xl bg-background/80 px-3 py-1 text-center"
          >
            <span className="font-sans text-xs font-bold text-foreground">
              {currentStarNode.shortLabel[locale]}
            </span>
            <span className="font-mono text-xs text-muted-foreground tabular-nums">
              {safeStarStep}/25
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
            disabled={safeStarStep >= MAX_EXCLUSIVE_STAR_STEP}
            onClick={() => onChange(clampExclusiveStarStep(safeStarStep + 1))}
          />
        </div>
      </div>

      {/* Range Slider (0..25) */}
      <div className="space-y-1">
        <input
          type="range"
          min={MIN_EXCLUSIVE_STAR_STEP}
          max={MAX_EXCLUSIVE_STAR_STEP}
          step={1}
          value={safeStarStep}
          aria-label={label}
          data-testid={`${testIdPrefix}-slider`}
          onChange={(e) =>
            onChange(clampExclusiveStarStep(Number(e.target.value)))
          }
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

      {/* Star Quick Chips */}
      <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-6">
        {STAR_QUICK_CHIPS.map((chip) => {
          const isSelected = currentStarNode.starBracket === chip.starBracket;
          return (
            <button
              key={chip.starBracket}
              type="button"
              data-testid={`${testIdPrefix}-star-${chip.starBracket}`}
              onClick={() => onChange(chip.stepIndex)}
              className={cn(
                "inline-flex min-h-[44px] items-center justify-center gap-1 rounded-xl px-2 py-1.5 font-sans text-xs font-semibold transition-colors",
                isSelected
                  ? "bg-amber-500 font-bold text-slate-950"
                  : "bg-background/70 text-muted-foreground hover:bg-background hover:text-foreground"
              )}
            >
              <Star className="h-3 w-3 shrink-0" />
              <span>{chip.label[locale]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

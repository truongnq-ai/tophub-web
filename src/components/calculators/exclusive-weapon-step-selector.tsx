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
import { formatExactNumber } from "@/lib/number-format";
import { cn } from "@/lib/utils";
import {
  CALC_MD3,
  CalculatorStepperButton,
} from "./calculator-md3-primitives";

export interface ExclusiveWeaponStepSelectorProps {
  readonly mode: "level" | "star";
  readonly label: string;
  readonly value: number;
  readonly onChange: (nextValue: number) => void;
  readonly locale: CalculatorLocale;
  readonly testIdPrefix: string;
  readonly coreProfile?: ExclusiveCoreProfile;
}

const LEVEL_QUICK_CHIPS: readonly {
  readonly level: number;
  readonly label: string;
}[] = [
  { level: 0, label: "Lv.0" },
  { level: 1, label: "Lv.1" },
  { level: 5, label: "Lv.5" },
  { level: 10, label: "Lv.10" },
  { level: 15, label: "Lv.15" },
  { level: 20, label: "Lv.20" },
];

const STAR_BRACKETS: readonly (1 | 2 | 3 | 4 | 5)[] = [1, 2, 3, 4, 5];
const PETAL_STEPS: readonly (1 | 2 | 3 | 4 | 5)[] = [1, 2, 3, 4, 5];

export function ExclusiveWeaponStepSelector({
  mode,
  label,
  value,
  onChange,
  locale,
  testIdPrefix,
  coreProfile = "guide_cumulative_920",
}: ExclusiveWeaponStepSelectorProps): React.JSX.Element {
  const isVi = locale === "vi";

  if (mode === "level") {
    const safeLevel = clampExclusiveWeaponLevel(value);
    const currentNode = EXCLUSIVE_WEAPON_LEVEL_STEPS[safeLevel];
    const isMaxLevel = safeLevel === MAX_EXCLUSIVE_WEAPON_LEVEL;

    return (
      <div
        data-testid={`${testIdPrefix}-container`}
        className={cn(
          CALC_MD3.tonalGroup,
          "space-y-3 transition-colors",
          isMaxLevel ? "ring-1 ring-rose-500/40 bg-rose-500/5" : ""
        )}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p className="font-heading text-sm sm:text-base font-bold text-foreground">
              {label}
            </p>
            <p className="mt-0.5 font-sans text-xs font-medium text-foreground/90">
              {currentNode.label[locale]}
            </p>
            <p className="mt-0.5 font-sans text-xs text-muted-foreground">
              {isVi ? "Mảnh tích lũy:" : "Cumulative Shards:"}{" "}
              <span className="font-mono font-bold text-amber-600 tabular-nums dark:text-amber-400">
                {formatExactNumber(currentNode.cumulativeShards)}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <CalculatorStepperButton
              direction="decrease"
              testId={`${testIdPrefix}-minus`}
              ariaLabel={
                isVi
                  ? `Giảm ${label} 1 cấp`
                  : `Decrease ${label} by 1 level`
              }
              disabled={safeLevel <= MIN_EXCLUSIVE_WEAPON_LEVEL}
              onClick={() => onChange(clampExclusiveWeaponLevel(safeLevel - 1))}
            />

            <div
              data-testid={`${testIdPrefix}-value`}
              className={cn(
                "flex min-h-[44px] min-w-[5.5rem] flex-col items-center justify-center rounded-xl px-2.5 py-1 text-center",
                isMaxLevel
                  ? "bg-rose-500/15 text-rose-700 dark:text-rose-300"
                  : "bg-background/80 text-foreground"
              )}
            >
              <span className="font-mono text-sm font-black tabular-nums">
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
                isVi
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
            className={cn(
              "h-2 w-full cursor-pointer appearance-none rounded-full bg-muted",
              isMaxLevel ? "accent-rose-500" : "accent-amber-500"
            )}
          />
          <div className="flex justify-between font-mono text-xs text-muted-foreground tabular-nums">
            <span>Lv.0</span>
            <span>Lv.5</span>
            <span>Lv.10</span>
            <span>Lv.15</span>
            <span className="font-bold text-rose-600 dark:text-rose-400">
              Lv.20
            </span>
          </div>
        </div>

        {/* 6 Skill Milestone Quick Chips */}
        <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-6">
          {LEVEL_QUICK_CHIPS.map((chip) => {
            const isSelected = safeLevel === chip.level;
            const isPeak = chip.level === 20;
            return (
              <button
                key={chip.level}
                type="button"
                data-testid={`${testIdPrefix}-chip-${chip.level}`}
                aria-pressed={isSelected}
                aria-label={`${label} ${chip.label}`}
                onClick={() => onChange(chip.level)}
                className={cn(
                  "inline-flex min-h-[44px] items-center justify-center gap-1 rounded-xl px-2 py-1.5 font-mono text-xs font-bold tabular-nums transition-colors cursor-pointer",
                  isSelected
                    ? isPeak
                      ? "bg-rose-500 text-white shadow-sm"
                      : "bg-amber-500 text-slate-950 shadow-sm"
                    : "bg-background/70 text-muted-foreground hover:bg-background hover:text-foreground"
                )}
              >
                <Sparkles className="h-3 w-3 shrink-0" aria-hidden="true" />
                <span>{chip.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Star Mode (0..25 sub-tiers: 4 Gold Stars + 1 Red Star, 5 Petals each)
  const safeStarStep = clampExclusiveStarStep(value);
  const starSteps = getExclusiveStarSteps(coreProfile);
  const currentStarNode = starSteps[safeStarStep];
  const isRedStarActive = currentStarNode.starBracket === 5;
  const targetBracketForPetals: 1 | 2 | 3 | 4 | 5 =
    currentStarNode.starBracket === 0 ? 1 : currentStarNode.starBracket;

  return (
    <div
      data-testid={`${testIdPrefix}-container`}
      className={cn(
        CALC_MD3.tonalGroup,
        "space-y-3 transition-colors",
        safeStarStep === MAX_EXCLUSIVE_STAR_STEP
          ? "ring-1 ring-rose-500/40 bg-rose-500/5"
          : ""
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="font-heading text-sm sm:text-base font-bold text-foreground">
            {label}
          </p>
          <p className="mt-0.5 font-sans text-xs font-medium text-foreground/90">
            {currentStarNode.label[locale]}
          </p>
          <p className="mt-0.5 font-sans text-xs text-muted-foreground">
            {isVi ? "Lõi Sắt tích lũy:" : "Cumulative Iron Cores:"}{" "}
            <span className="font-mono font-bold text-amber-600 tabular-nums dark:text-amber-400">
              {formatExactNumber(currentStarNode.cumulativeCores)}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <CalculatorStepperButton
            direction="decrease"
            testId={`${testIdPrefix}-minus`}
            ariaLabel={
              isVi
                ? `Giảm ${label} 1 cánh sao`
                : `Decrease ${label} by 1 petal`
            }
            disabled={safeStarStep <= MIN_EXCLUSIVE_STAR_STEP}
            onClick={() => onChange(clampExclusiveStarStep(safeStarStep - 1))}
          />

          <div
            data-testid={`${testIdPrefix}-value`}
            className={cn(
              "flex min-h-[44px] min-w-[5.75rem] flex-col items-center justify-center rounded-xl px-2.5 py-1 text-center",
              isRedStarActive
                ? "bg-rose-500/15 text-rose-700 dark:text-rose-300"
                : "bg-background/80 text-foreground"
            )}
          >
            <span className="font-sans text-xs font-bold">
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
              isVi
                ? `Tăng ${label} 1 cánh sao`
                : `Increase ${label} by 1 petal`
            }
            disabled={safeStarStep >= MAX_EXCLUSIVE_STAR_STEP}
            onClick={() => onChange(clampExclusiveStarStep(safeStarStep + 1))}
          />
        </div>
      </div>

      {/* Row 1: 0★ Base + 5 Stars (1★..4★ Gold + 5★ Mythic Red) */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs font-sans text-muted-foreground">
          <span>
            {isVi
              ? "Chọn Ngôi Sao (4 Vàng + 1 Đỏ):"
              : "Select Star (4 Gold + 1 Red):"}
          </span>
          <span className="font-mono font-bold text-foreground tabular-nums">
            {currentStarNode.starBracket}★
          </span>
        </div>

        <div className="grid grid-cols-6 gap-1.5">
          <button
            type="button"
            data-testid={`${testIdPrefix}-star-0`}
            aria-pressed={safeStarStep === 0}
            aria-label={isVi ? `${label} 0 sao` : `${label} 0 star`}
            onClick={() => onChange(0)}
            className={cn(
              "inline-flex min-h-[44px] flex-col items-center justify-center rounded-xl px-1.5 py-1 transition-colors cursor-pointer",
              safeStarStep === 0
                ? "bg-amber-500 font-bold text-slate-950 shadow-sm"
                : "bg-background/70 text-muted-foreground hover:bg-background hover:text-foreground"
            )}
          >
            <span className="font-mono text-xs font-black tabular-nums">
              0★
            </span>
          </button>

          {STAR_BRACKETS.map((starNum) => {
            const isRedStar = starNum === 5;
            const isStarReached = currentStarNode.starBracket >= starNum;
            const isCurrentStar = currentStarNode.starBracket === starNum;
            const targetStep = starNum * 5;

            return (
              <button
                key={starNum}
                type="button"
                data-testid={`${testIdPrefix}-star-${starNum}`}
                aria-pressed={isCurrentStar}
                aria-label={
                  isVi
                    ? `${label} ${starNum} sao (${isRedStar ? "Đỏ" : "Vàng"})`
                    : `${label} ${starNum} star (${isRedStar ? "Red" : "Gold"})`
                }
                onClick={() => onChange(targetStep)}
                className={cn(
                  "inline-flex min-h-[44px] flex-col items-center justify-center gap-0.5 rounded-xl px-1.5 py-1 transition-colors cursor-pointer",
                  isCurrentStar
                    ? isRedStar
                      ? "bg-rose-500/20 ring-1 ring-rose-500/60"
                      : "bg-amber-500/20 ring-1 ring-amber-500/60"
                    : "bg-background/70 hover:bg-background"
                )}
              >
                <Star
                  className={cn(
                    "h-4 w-4 shrink-0 transition-transform",
                    isCurrentStar ? "scale-110" : "",
                    isStarReached
                      ? isRedStar
                        ? "text-rose-500 fill-rose-500"
                        : "text-amber-400 fill-amber-400"
                      : isRedStar
                        ? "text-rose-500/45"
                        : "text-muted-foreground/50"
                  )}
                  aria-hidden="true"
                />
                <span
                  className={cn(
                    "font-mono text-xs font-bold tabular-nums",
                    isRedStar
                      ? "text-rose-600 dark:text-rose-400"
                      : "text-amber-700 dark:text-amber-300"
                  )}
                >
                  {starNum}★
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Row 2: 5 Star Petals (1/5 ➔ 5/5) */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs font-sans text-muted-foreground">
          <span>
            {isVi
              ? `Cánh Sao (${targetBracketForPetals}★):`
              : `Star Petals (${targetBracketForPetals}★):`}
          </span>
          <span className="font-mono font-semibold text-foreground tabular-nums">
            {currentStarNode.subTier}/5
          </span>
        </div>

        <div className="grid grid-cols-5 gap-1.5">
          {PETAL_STEPS.map((petal) => {
            const stepForPetal = (targetBracketForPetals - 1) * 5 + petal;
            const isPetalFilled =
              safeStarStep > 0 && currentStarNode.subTier >= petal;
            const isExactPetal =
              safeStarStep > 0 && currentStarNode.subTier === petal;

            return (
              <button
                key={petal}
                type="button"
                data-testid={`${testIdPrefix}-petal-${petal}`}
                aria-pressed={isExactPetal}
                aria-label={
                  isVi
                    ? `${label} cánh ${petal}/5`
                    : `${label} petal ${petal}/5`
                }
                onClick={() => onChange(stepForPetal)}
                className={cn(
                  "inline-flex min-h-[44px] items-center justify-center rounded-xl px-2 py-1 font-mono text-xs font-bold tabular-nums transition-colors cursor-pointer",
                  isExactPetal
                    ? isRedStarActive
                      ? "bg-rose-500 text-white shadow-sm"
                      : "bg-amber-500 text-slate-950 shadow-sm"
                    : isPetalFilled
                      ? isRedStarActive
                        ? "bg-rose-500/20 text-rose-700 dark:text-rose-300"
                        : "bg-amber-500/20 text-amber-800 dark:text-amber-300"
                      : "bg-background/70 text-muted-foreground hover:bg-background hover:text-foreground"
                )}
              >
                {petal}/5
              </button>
            );
          })}
        </div>
      </div>

      {/* Row 3: Range Slider (0..25) */}
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
          className={cn(
            "h-2 w-full cursor-pointer appearance-none rounded-full bg-muted",
            isRedStarActive ? "accent-rose-500" : "accent-amber-500"
          )}
        />
        <div className="flex justify-between font-mono text-xs text-muted-foreground tabular-nums">
          <span>0/25</span>
          <span>5/25</span>
          <span>10/25</span>
          <span>15/25</span>
          <span>20/25</span>
          <span className="font-bold text-rose-600 dark:text-rose-400">
            25/25
          </span>
        </div>
      </div>
    </div>
  );
}

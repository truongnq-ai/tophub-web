"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import {
  RELIC_HALL_MAX_LEVEL,
  RELIC_HALL_MILESTONE_LEVELS,
  RELIC_HALL_MIN_LEVEL,
  clampRelicHallLevel,
  clampRelicHallSubStep,
  getRelicHallState,
} from "@/content/calculators/relic-hall-data";
import type { CalculatorLocale } from "@/content/calculators/types";
import { formatExactNumber } from "@/lib/number-format";
import { cn } from "@/lib/utils";
import { CalculatorInfoPopover } from "./calculator-info-popover";
import {
  CALC_MD3,
  CalculatorStepperButton,
} from "./calculator-md3-primitives";

export interface RelicHallStepSelectorProps {
  readonly testIdPrefix: "from" | "to";
  readonly title: string;
  readonly badgeLabel: string;
  readonly level: number;
  readonly subStep: number;
  readonly costReductionPercent: number;
  readonly locale: CalculatorLocale;
  readonly onChange: (nextLevel: number, nextSubStep: number) => void;
}

export function RelicHallStepSelector({
  testIdPrefix,
  title,
  badgeLabel,
  level,
  subStep,
  costReductionPercent,
  locale,
  onChange,
}: RelicHallStepSelectorProps) {
  const isVi = locale === "vi";
  const state = getRelicHallState(level, subStep, costReductionPercent);
  const isBreakthrough =
    state.subStepsCount === 1 && state.nextStepBaseCrystal > 0;

  const handleSelectLevel = (nextLevelRaw: number) => {
    const clampedLevel = clampRelicHallLevel(nextLevelRaw);
    onChange(clampedLevel, 0);
  };

  const handleStepDecrease = () => {
    if (state.subStep > 0) {
      onChange(state.level, state.subStep - 1);
      return;
    }
    if (state.level > RELIC_HALL_MIN_LEVEL) {
      const prevLevel = state.level - 1;
      const prevState = getRelicHallState(prevLevel, 0, costReductionPercent);
      onChange(prevLevel, Math.max(0, prevState.subStepsCount - 1));
    }
  };

  const handleStepIncrease = () => {
    if (state.subStep < state.subStepsCount - 1) {
      onChange(state.level, state.subStep + 1);
      return;
    }
    if (state.level < RELIC_HALL_MAX_LEVEL) {
      onChange(state.level + 1, 0);
    }
  };

  const canDecrease =
    state.level > RELIC_HALL_MIN_LEVEL || state.subStep > 0;
  const canIncrease =
    state.level < RELIC_HALL_MAX_LEVEL ||
    state.subStep < state.subStepsCount - 1;

  return (
    <div className="space-y-2.5">
      {/* Row 1: Single-Line Header — Amber Badge ("Điểm xuất phát" / "Đích đến") + Quick Milestone Chips + Readout + (i) Popup */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="inline-flex items-center rounded-lg bg-amber-500/15 px-2.5 py-1 font-sans text-xs font-bold text-amber-700 dark:text-amber-300">
            {badgeLabel}
          </span>

          {/* Inline Milestone Chips */}
          <div className="flex flex-wrap items-center gap-1">
            {RELIC_HALL_MILESTONE_LEVELS.map((milestoneLv) => {
              const isSelected = state.level === milestoneLv;
              return (
                <button
                  key={milestoneLv}
                  type="button"
                  data-testid={`relic-hall-${testIdPrefix}-chip-${milestoneLv}`}
                  onClick={() => handleSelectLevel(milestoneLv)}
                  className={cn(
                    CALC_MD3.chipButton,
                    "px-2.5 font-mono text-xs font-bold",
                    isSelected
                      ? "bg-amber-500 text-slate-950 shadow-sm"
                      : "bg-muted/50 text-foreground hover:bg-amber-500/15"
                  )}
                >
                  {`Lv.${milestoneLv}`}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <div
            data-testid={`relic-hall-${testIdPrefix}-Readout`}
            className="inline-flex items-center gap-1.5 rounded-xl bg-muted/60 px-3 py-1.5"
          >
            <span className="font-mono text-base font-black text-amber-600 dark:text-amber-400">
              {`Lv.${state.level}`}
            </span>
            {state.subStepsCount > 1 ? (
              <span className="font-mono text-xs font-semibold text-muted-foreground">
                {`(${state.subStep}/${state.subStepsCount})`}
              </span>
            ) : null}
          </div>

          <CalculatorInfoPopover
            title={
              isVi
                ? `Chỉ Số Sảnh Bí Bảo — ${badgeLabel} (Lv.${state.level})`
                : `Relic Hall Stats — ${badgeLabel} (Lv.${state.level})`
            }
            subtitle={
              isVi
                ? `Trạng thái: Lv.${state.level} • Tiến độ ${state.subStep}/${state.subStepsCount}`
                : `State: Lv.${state.level} • Progress ${state.subStep}/${state.subStepsCount}`
            }
            locale={locale}
            triggerLabel={
              isVi
                ? `Xem chỉ số chi tiết tại ${title}`
                : `View detailed attributes at ${title}`
            }
            triggerTestId={`relic-hall-${testIdPrefix}-info-trigger`}
            dialogTestId={`relic-hall-${testIdPrefix}-info-dialog`}
          >
            <div className="space-y-3">
              {/* 4 In-Game Relic Hall Attributes inside Popup (i) */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className={cn(CALC_MD3.tonalGroup, "p-3 space-y-0.5")}>
                  <p className="font-sans text-xs font-semibold text-muted-foreground">
                    {isVi ? "Uy Thế" : "Hall Power"}
                  </p>
                  <p
                    data-testid={`relic-hall-${testIdPrefix}-stat-power`}
                    className="font-mono text-base font-black text-foreground tabular-nums"
                  >
                    {formatExactNumber(state.fightforce)}
                  </p>
                </div>

                <div className={cn(CALC_MD3.tonalGroup, "p-3 space-y-0.5")}>
                  <p className="font-sans text-xs font-semibold text-muted-foreground">
                    {isVi ? "Tăng Tỉ Lệ ATK Bí Bảo" : "Relic ATK Boost"}
                  </p>
                  <p
                    data-testid={`relic-hall-${testIdPrefix}-stat-atk`}
                    className="font-mono text-base font-black text-amber-600 dark:text-amber-400 tabular-nums"
                  >
                    {`${state.atkHpBoostPercent}%`}
                  </p>
                </div>

                <div className={cn(CALC_MD3.tonalGroup, "p-3 space-y-0.5")}>
                  <p className="font-sans text-xs font-semibold text-muted-foreground">
                    {isVi ? "Tăng Tỉ Lệ HP Bí Bảo" : "Relic HP Boost"}
                  </p>
                  <p
                    data-testid={`relic-hall-${testIdPrefix}-stat-hp`}
                    className="font-mono text-base font-black text-amber-600 dark:text-amber-400 tabular-nums"
                  >
                    {`${state.atkHpBoostPercent}%`}
                  </p>
                </div>

                <div className={cn(CALC_MD3.tonalGroup, "p-3 space-y-0.5")}>
                  <p className="font-sans text-xs font-semibold text-muted-foreground">
                    {isVi ? "TL Chuyển Hóa Thuộc Tính" : "Attr Conversion Rate"}
                  </p>
                  <p
                    data-testid={`relic-hall-${testIdPrefix}-stat-conversion`}
                    className="font-mono text-base font-black text-emerald-600 dark:text-emerald-400 tabular-nums"
                  >
                    {`${state.conversionPercent}%`}
                  </p>
                </div>
              </div>

              <div className={cn(CALC_MD3.tonalGroup, "space-y-1")}>
                <p className="font-sans text-xs font-bold text-foreground">
                  {isVi
                    ? "Chi phí bước nâng cấp kế tiếp tại mốc này:"
                    : "Next single-step upgrade cost at this state:"}
                </p>
                <p className="font-sans text-xs text-muted-foreground">
                  {isVi
                    ? `• Đá Vân Ma Thuật: ${formatExactNumber(state.nextStepDiscountedStone)}${state.nextStepDiscountedCrystal > 0 ? ` | Pha Lê Bí Thuật: ${formatExactNumber(state.nextStepDiscountedCrystal)}` : ""}`
                    : `• Magic Stones: ${formatExactNumber(state.nextStepDiscountedStone)}${state.nextStepDiscountedCrystal > 0 ? ` | Arcane Crystals: ${formatExactNumber(state.nextStepDiscountedCrystal)}` : ""}`}
                </p>
              </div>
            </div>
          </CalculatorInfoPopover>
        </div>
      </div>

      {/* Row 2: Fixed-Height Horizontal 2-Column Split — Left (4/12): Level Slider [-/+] | Right (8/12): Non-Wrapping Upgrade Progress */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-2.5 items-stretch">
        {/* Left (4/12): Level Slider + [-]/[+] Stepper */}
        <div
          className={cn(
            CALC_MD3.tonalGroup,
            "xl:col-span-4 flex flex-col justify-between space-y-1.5 p-2.5"
          )}
        >
          <div className="flex items-center justify-between gap-2">
            <span className="font-sans text-xs font-semibold text-muted-foreground">
              {isVi ? "Cấp Sảnh (1–250)" : "Hall Level (1–250)"}
            </span>
            <span className="font-mono text-xs font-bold text-foreground">
              {`${state.level} / ${RELIC_HALL_MAX_LEVEL}`}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <CalculatorStepperButton
              direction="decrease"
              testId={`relic-hall-${testIdPrefix}-step-decrease`}
              ariaLabel={
                isVi
                  ? `Giảm cấp hoặc bậc tiến độ (${title})`
                  : `Decrease level or progress step (${title})`
              }
              disabled={!canDecrease}
              onClick={handleStepDecrease}
            />
            <input
              type="range"
              min={RELIC_HALL_MIN_LEVEL}
              max={RELIC_HALL_MAX_LEVEL}
              step={1}
              value={state.level}
              data-testid={`relic-hall-${testIdPrefix}-level-slider`}
              aria-label={
                isVi
                  ? `Chọn cấp ${title} từ 1 đến 250`
                  : `Select ${title} from 1 to 250`
              }
              onChange={(event) =>
                handleSelectLevel(Number(event.target.value))
              }
              className="h-2.5 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-amber-500"
            />
            <CalculatorStepperButton
              direction="increase"
              testId={`relic-hall-${testIdPrefix}-step-increase`}
              ariaLabel={
                isVi
                  ? `Tăng cấp hoặc bậc tiến độ (${title})`
                  : `Increase level or progress step (${title})`
              }
              disabled={!canIncrease}
              onClick={handleStepIncrease}
            />
          </div>
        </div>

        {/* Right (8/12): Upgrade Progress Bar (Tiến Độ Nâng Cấp — Bậc 0..N-1) — Locked 1-Line Height */}
        <div
          className={cn(
            CALC_MD3.tonalGroup,
            "xl:col-span-8 flex flex-col justify-between space-y-1.5 p-2.5"
          )}
        >
          <div className="flex items-center justify-between gap-2">
            <span className="font-sans text-xs font-semibold text-foreground">
              {isVi ? "Tiến Độ Nâng Cấp" : "Upgrade Progress"}
            </span>
            {isBreakthrough ? (
              <span className="inline-flex items-center gap-1 rounded-lg bg-amber-500/20 px-2 py-0.5 font-sans text-xs font-bold text-amber-700 dark:text-amber-300">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                {isVi
                  ? "Mốc đột phá 1 bước (Pha Lê + Đá Vân)"
                  : "1-Step Breakthrough (Crystal + Stone)"}
              </span>
            ) : (
              <span className="font-sans text-xs font-semibold text-muted-foreground">
                {isVi
                  ? `Bậc đã nạp: ${state.subStep} / ${state.subStepsCount}`
                  : `Filled steps: ${state.subStep} / ${state.subStepsCount}`}
              </span>
            )}
          </div>

          {state.subStepsCount > 1 ? (
            state.subStepsCount <= 10 ? (
              /* Single Non-Wrapping Grid Row for 4, 6, 7, 8, or 10 Sub-Steps */
              <div
                className="grid gap-1"
                style={{
                  gridTemplateColumns: `repeat(${state.subStepsCount}, minmax(0, 1fr))`,
                }}
              >
                {Array.from({ length: state.subStepsCount }, (_, idx) => {
                  const active = state.subStep === idx;
                  const isFilled = idx < state.subStep;
                  return (
                    <button
                      key={idx}
                      type="button"
                      data-testid={`relic-hall-${testIdPrefix}-substep-${idx}`}
                      onClick={() =>
                        onChange(
                          state.level,
                          clampRelicHallSubStep(state.level, idx)
                        )
                      }
                      className={cn(
                        "inline-flex min-h-[44px] min-w-0 items-center justify-center rounded-xl px-1 font-mono text-xs font-bold transition-colors cursor-pointer",
                        active
                          ? "bg-amber-500 text-slate-950 shadow-sm"
                          : isFilled
                            ? "bg-amber-500/25 text-amber-700 dark:text-amber-300 hover:bg-amber-500/35"
                            : "bg-background/70 text-muted-foreground hover:bg-amber-500/15 hover:text-foreground"
                      )}
                    >
                      {`${idx}/${state.subStepsCount}`}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="flex min-h-[44px] items-center gap-3 rounded-xl bg-background/60 px-3">
                <input
                  type="range"
                  min={0}
                  max={state.subStepsCount - 1}
                  step={1}
                  value={state.subStep}
                  data-testid={`relic-hall-${testIdPrefix}-substep-slider`}
                  aria-label={
                    isVi
                      ? `Chọn bậc tiến độ nâng cấp (${title})`
                      : `Select upgrade progress step (${title})`
                  }
                  onChange={(event) =>
                    onChange(
                      state.level,
                      clampRelicHallSubStep(
                        state.level,
                        Number(event.target.value)
                      )
                    )
                  }
                  className="h-2.5 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-amber-500"
                />
                <span className="shrink-0 font-mono text-xs font-bold text-foreground">
                  {`${state.subStep}/${state.subStepsCount}`}
                </span>
              </div>
            )
          ) : (
            <div className="flex min-h-[44px] items-center justify-center rounded-xl bg-amber-500/15 px-3 font-sans text-xs font-semibold text-amber-700 dark:text-amber-300">
              {isVi
                ? "Bấm Lên Cấp trực tiếp sang cấp tiếp theo (0/1 bậc)"
                : "Direct 1-step breakthrough to next level (0/1 step)"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  CALC_MD3,
  CalculatorStepperButton,
} from "./calculator-md3-primitives";

export interface TechnologyLevelSelectorProps {
  readonly queueIndex: number;
  readonly maxLevel: number;
  readonly fromLevel: number;
  readonly toLevel: number;
  readonly locale: "vi" | "en";
  readonly onChangeRange: (nextFrom: number, nextTo: number) => void;
}

export function TechnologyLevelSelector({
  queueIndex,
  maxLevel,
  fromLevel,
  toLevel,
  locale,
  onChangeRange,
}: TechnologyLevelSelectorProps): React.JSX.Element {
  const isVi = locale === "vi";
  const maxFrom = Math.max(0, maxLevel - 1);
  const isSingleStep = toLevel === fromLevel + 1;
  const isFullMax = fromLevel === 0 && toLevel === maxLevel;

  const handleFromChange = (rawFrom: number): void => {
    const clampedFrom = Math.max(0, Math.min(maxFrom, Math.floor(rawFrom)));
    if (isSingleStep) {
      onChangeRange(clampedFrom, Math.min(maxLevel, clampedFrom + 1));
    } else {
      const nextTo = Math.max(clampedFrom + 1, toLevel);
      onChangeRange(clampedFrom, Math.min(maxLevel, nextTo));
    }
  };

  const handleToChange = (rawTo: number): void => {
    const clampedTo = Math.max(1, Math.min(maxLevel, Math.floor(rawTo)));
    const nextFrom = Math.min(fromLevel, clampedTo - 1);
    onChangeRange(Math.max(0, nextFrom), clampedTo);
  };

  const levelButtons = React.useMemo(() => {
    const list: number[] = [];
    for (let lv = 1; lv <= maxLevel; lv += 1) {
      list.push(lv);
    }
    return list;
  }, [maxLevel]);

  return (
    <div
      data-testid={`tech-queue-${queueIndex}-level-selector`}
      className={cn(
        CALC_MD3.tonalGroup,
        "flex flex-col gap-3 bg-slate-100/80 dark:bg-slate-900/50 ring-1 ring-slate-200/80 dark:ring-slate-800/80"
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-sans font-bold uppercase tracking-wide text-muted-foreground">
            {isVi
              ? "Chọn cấp độ nghiên cứu (Lv.0 ➔ Max)"
              : "Research Level Range (Lv.0 ➔ Max)"}
          </span>
          <span className="rounded-lg bg-amber-500/15 px-2.5 py-0.5 text-xs font-sans font-bold text-amber-700 dark:text-amber-300">
            Lv.{fromLevel} ➔ Lv.{toLevel} (
            <span className="font-mono tabular-nums">+{toLevel - fromLevel}</span>{" "}
            {isVi ? "cấp" : "lv"})
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() =>
              onChangeRange(fromLevel, Math.min(maxLevel, fromLevel + 1))
            }
            className={cn(
              "inline-flex min-h-[44px] items-center rounded-xl px-3 text-xs font-sans font-bold transition-colors cursor-pointer",
              isSingleStep
                ? "bg-amber-500 text-slate-950 shadow-sm"
                : "bg-card/80 text-muted-foreground hover:bg-amber-500/15 hover:text-foreground"
            )}
          >
            {isVi ? "+1 Cấp (Chuẩn Game)" : "+1 Lv (Single Step)"}
          </button>

          <button
            type="button"
            onClick={() => onChangeRange(0, maxLevel)}
            className={cn(
              "inline-flex min-h-[44px] items-center rounded-xl px-3 text-xs font-sans font-bold transition-colors cursor-pointer",
              isFullMax && maxLevel > 1
                ? "bg-emerald-500/20 text-emerald-700 ring-1 ring-emerald-500/50 dark:text-emerald-300"
                : "bg-card/80 text-muted-foreground hover:bg-emerald-500/15 hover:text-foreground"
            )}
          >
            {isVi ? `Trọn gói Lv.0 ➔ Lv.${maxLevel}` : `Full Lv.0 ➔ Lv.${maxLevel}`}
          </button>
        </div>
      </div>

      {/* Stepper Controls + Direct Level Pills (0..maxLevel) */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-12 md:items-center">
        {/* Current Level Stepper (0 .. maxLevel-1) */}
        <div className="flex items-center justify-between gap-2 md:col-span-4 lg:col-span-3">
          <span className="text-xs font-sans font-semibold text-muted-foreground">
            {isVi ? "Cấp hiện tại:" : "Current Lv:"}
          </span>
          <div className="flex items-center gap-1.5">
            <CalculatorStepperButton
              direction="decrease"
              testId={`tech-queue-${queueIndex}-from-decrease`}
              ariaLabel={isVi ? "Giảm cấp hiện tại" : "Decrease current level"}
              disabled={fromLevel <= 0}
              onClick={() => handleFromChange(fromLevel - 1)}
            />
            <span className="inline-flex min-w-[52px] items-center justify-center rounded-xl bg-card px-2.5 py-2 font-mono text-sm font-black tabular-nums text-foreground">
              {fromLevel}
            </span>
            <CalculatorStepperButton
              direction="increase"
              testId={`tech-queue-${queueIndex}-from-increase`}
              ariaLabel={isVi ? "Tăng cấp hiện tại" : "Increase current level"}
              disabled={fromLevel >= maxFrom}
              onClick={() => handleFromChange(fromLevel + 1)}
            />
          </div>
        </div>

        {/* Interactive Level Segment Pills (1 .. maxLevel) */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 md:col-span-4 lg:col-span-6">
          {levelButtons.map((lv) => {
            const isResearched = lv <= fromLevel;
            const isPlanned = lv > fromLevel && lv <= toLevel;
            return (
              <button
                key={lv}
                type="button"
                onClick={() => handleToChange(lv)}
                className={cn(
                  "inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl px-2.5 font-mono text-xs font-black tabular-nums transition-all cursor-pointer",
                  isPlanned
                    ? "bg-emerald-500 text-slate-950 shadow-sm"
                    : isResearched
                    ? "bg-amber-500/20 text-amber-700 ring-1 ring-amber-500/40 dark:text-amber-300"
                    : "bg-card/80 text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
                title={
                  isVi
                    ? `Đặt cấp mục tiêu: Lv.${lv}`
                    : `Set target level: Lv.${lv}`
                }
              >
                Lv.{lv}
              </button>
            );
          })}
        </div>

        {/* Target Level Stepper (1 .. maxLevel) */}
        <div className="flex items-center justify-between gap-2 md:col-span-4 lg:col-span-3 md:justify-end">
          <span className="text-xs font-sans font-semibold text-muted-foreground">
            {isVi ? "Cấp mục tiêu:" : "Target Lv:"}
          </span>
          <div className="flex items-center gap-1.5">
            <CalculatorStepperButton
              direction="decrease"
              testId={`tech-queue-${queueIndex}-to-decrease`}
              ariaLabel={isVi ? "Giảm cấp mục tiêu" : "Decrease target level"}
              disabled={toLevel <= 1}
              onClick={() => {
                if (isSingleStep && fromLevel > 0) {
                  onChangeRange(fromLevel - 1, fromLevel);
                } else {
                  handleToChange(toLevel - 1);
                }
              }}
            />
            <span className="inline-flex min-w-[52px] items-center justify-center rounded-xl bg-emerald-500/15 px-2.5 py-2 font-mono text-sm font-black tabular-nums text-emerald-700 dark:text-emerald-300">
              {toLevel}
            </span>
            <CalculatorStepperButton
              direction="increase"
              testId={`tech-queue-${queueIndex}-to-increase`}
              ariaLabel={isVi ? "Tăng cấp mục tiêu" : "Increase target level"}
              disabled={toLevel >= maxLevel}
              onClick={() => {
                if (isSingleStep && toLevel < maxLevel) {
                  onChangeRange(fromLevel + 1, toLevel + 1);
                } else {
                  handleToChange(toLevel + 1);
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

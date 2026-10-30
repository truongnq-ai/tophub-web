"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatBuildingLevelBadge } from "@/content/calculators/construction-data";
import {
  CALC_MD3,
  CalculatorStepperButton,
} from "./calculator-md3-primitives";

export interface ConstructionLevelSelectorProps {
  readonly queueIndex: number;
  readonly maxLevel: number;
  readonly fromLevel: number;
  readonly toLevel: number;
  readonly multiplyBrillianceSubSteps: boolean;
  readonly locale: "vi" | "en";
  readonly onChangeRange: (nextFrom: number, nextTo: number) => void;
  readonly onToggleBrillianceSubSteps: () => void;
}

export function ConstructionLevelSelector({
  queueIndex,
  maxLevel,
  fromLevel,
  toLevel,
  multiplyBrillianceSubSteps,
  locale,
  onChangeRange,
  onToggleBrillianceSubSteps,
}: ConstructionLevelSelectorProps): React.JSX.Element {
  const isVi = locale === "vi";
  const isSingleStep = toLevel === fromLevel + 1;
  const maxFrom = Math.max(1, maxLevel - 1);

  const handleFromChange = (rawFrom: number): void => {
    const clampedFrom = Math.max(1, Math.min(maxFrom, Math.floor(rawFrom)));
    if (isSingleStep) {
      onChangeRange(clampedFrom, Math.min(maxLevel, clampedFrom + 1));
    } else {
      const nextTo = Math.max(clampedFrom + 1, toLevel);
      onChangeRange(clampedFrom, Math.min(maxLevel, nextTo));
    }
  };

  const handleToChange = (rawTo: number): void => {
    const clampedTo = Math.max(2, Math.min(maxLevel, Math.floor(rawTo)));
    const nextFrom = Math.min(fromLevel, clampedTo - 1);
    onChangeRange(Math.max(1, nextFrom), clampedTo);
  };

  const progressStartPct = ((fromLevel - 1) / Math.max(1, maxLevel - 1)) * 100;
  const progressEndPct = ((toLevel - 1) / Math.max(1, maxLevel - 1)) * 100;

  const milestones = React.useMemo(() => {
    const base = [20, 30, 35, 40].filter((m) => m <= maxLevel && m > 1);
    if (maxLevel > 40) {
      if (maxLevel >= 55) base.push(55);
      if (maxLevel >= 65 && maxLevel !== 55) base.push(65);
      if (!base.includes(maxLevel)) base.push(maxLevel);
    }
    return base;
  }, [maxLevel]);

  return (
    <div
      data-testid={`queue-${queueIndex}-level-selector`}
      className={cn(
        CALC_MD3.tonalGroup,
        "flex flex-col gap-3 bg-slate-100/80 dark:bg-slate-900/50 ring-1 ring-slate-200/80 dark:ring-slate-800/80"
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-sans font-bold uppercase tracking-wide text-muted-foreground">
            {isVi
              ? "Thanh kéo cấp độ công trình (1 ➔ Max)"
              : "Building Level Slider (1 ➔ Max)"}
          </span>
          <span className="rounded-lg bg-amber-500/15 px-2.5 py-0.5 text-xs font-sans font-bold text-amber-700 dark:text-amber-300">
            {formatBuildingLevelBadge(fromLevel, locale)} ➔{" "}
            {formatBuildingLevelBadge(toLevel, locale)} (
            <span className="font-mono tabular-nums">+{toLevel - fromLevel}</span>{" "}
            {isVi ? "cấp" : "lv"})
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => onChangeRange(fromLevel, Math.min(maxLevel, fromLevel + 1))}
            className={cn(
              "inline-flex min-h-[44px] items-center rounded-xl px-3 text-xs font-sans font-bold transition-colors cursor-pointer",
              isSingleStep
                ? "bg-amber-500 text-slate-950 shadow-sm"
                : "bg-card/80 text-muted-foreground hover:bg-amber-500/15 hover:text-foreground"
            )}
          >
            {isVi ? "+1 Cấp (Chuẩn Game)" : "+1 Lv (In-Game Step)"}
          </button>

          {milestones.map((m) => {
            const isTargetActive = toLevel === m && !isSingleStep;
            const label =
              m > 40
                ? isVi
                  ? `HH${Math.ceil((m - 40) / 5)} (${m})`
                  : `B${Math.ceil((m - 40) / 5)} (${m})`
                : `Lv.${m}`;
            return (
              <button
                key={m}
                type="button"
                onClick={() => {
                  const safeFrom = fromLevel >= m ? Math.max(1, m - 1) : fromLevel;
                  onChangeRange(safeFrom, m);
                }}
                className={cn(
                  "inline-flex min-h-[44px] items-center rounded-xl px-2.5 text-xs font-sans font-bold transition-colors cursor-pointer",
                  isTargetActive
                    ? "bg-amber-500/20 text-amber-700 ring-1 ring-amber-500/50 dark:text-amber-300"
                    : "bg-card/80 text-muted-foreground hover:bg-amber-500/10 hover:text-foreground"
                )}
              >
                {label}
              </button>
            );
          })}

          {maxLevel > 40 && toLevel > 40 ? (
            <button
              type="button"
              onClick={onToggleBrillianceSubSteps}
              className={cn(
                "inline-flex min-h-[44px] items-center gap-1 rounded-xl px-2.5 text-xs font-sans font-bold transition-colors cursor-pointer",
                multiplyBrillianceSubSteps
                  ? "bg-purple-500/20 text-purple-700 ring-1 ring-purple-500/40 dark:text-purple-300"
                  : "bg-card/80 text-muted-foreground hover:bg-purple-500/10"
              )}
              title={
                isVi
                  ? "Mỗi cấp Huy Hoàng (Lv.41–80) gồm 5 bậc nhỏ (0/5 ➔ 5/5)"
                  : "Each Brilliance level (Lv.41-80) consists of 5 sub-steps (0/5 -> 5/5)"
              }
            >
              <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>
                {multiplyBrillianceSubSteps
                  ? isVi
                    ? "Đủ 5 bậc HH (×5)"
                    : "Full 5 Sub-steps (×5)"
                  : isVi
                  ? "1 bậc nhỏ HH (×1)"
                  : "1 Sub-step (×1)"}
              </span>
            </button>
          ) : null}
        </div>
      </div>

      {/* Main horizontal slider row */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-12 md:items-center">
        {/* Current Level Stepper */}
        <div className="flex items-center justify-between gap-2 md:col-span-4 lg:col-span-3">
          <span className="text-xs font-sans font-semibold text-muted-foreground">
            {isVi ? "Cấp hiện tại:" : "Current Lv:"}
          </span>
          <div className="flex items-center gap-1.5">
            <CalculatorStepperButton
              direction="decrease"
              testId={`queue-${queueIndex}-from-decrease`}
              ariaLabel={isVi ? "Giảm cấp hiện tại" : "Decrease current level"}
              disabled={fromLevel <= 1}
              onClick={() => handleFromChange(fromLevel - 1)}
            />
            <span className="inline-flex min-w-[52px] items-center justify-center rounded-xl bg-card px-2.5 py-2 font-mono text-sm font-black tabular-nums text-foreground">
              {fromLevel}
            </span>
            <CalculatorStepperButton
              direction="increase"
              testId={`queue-${queueIndex}-from-increase`}
              ariaLabel={isVi ? "Tăng cấp hiện tại" : "Increase current level"}
              disabled={fromLevel >= maxFrom}
              onClick={() => handleFromChange(fromLevel + 1)}
            />
          </div>
        </div>

        {/* Dual Track Slider (1 -> maxLevel) */}
        <div className="flex flex-col gap-1.5 md:col-span-4 lg:col-span-6">
          <div className="relative flex h-6 items-center">
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-150"
                style={{
                  marginLeft: `${progressStartPct}%`,
                  width: `${Math.max(2, progressEndPct - progressStartPct)}%`,
                }}
              />
            </div>
            <input
              type="range"
              min={1}
              max={maxFrom}
              step={1}
              value={fromLevel}
              aria-label={isVi ? "Thanh kéo cấp hiện tại" : "Current level slider"}
              onChange={(e) => handleFromChange(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer h-6 opacity-90"
            />
          </div>
          {!isSingleStep ? (
            <div className="flex items-center gap-2">
              <span className="text-xs font-sans text-muted-foreground shrink-0">
                {isVi ? "Kéo mốc đích:" : "Target slider:"}
              </span>
              <input
                type="range"
                min={2}
                max={maxLevel}
                step={1}
                value={toLevel}
                aria-label={isVi ? "Thanh kéo cấp mục tiêu" : "Target level slider"}
                onChange={(e) => handleToChange(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-5"
              />
            </div>
          ) : null}
          <div className="flex items-center justify-between text-xs font-sans text-muted-foreground">
            <span>Lv.1</span>
            {maxLevel > 40 ? (
              <span className="text-amber-600 dark:text-amber-400 font-semibold">
                {isVi ? "Mốc Lv.40 (Mở Huy Hoàng)" : "Lv.40 (Brilliance Unlock)"}
              </span>
            ) : (
              <span>Lv.{Math.round(maxLevel / 2)}</span>
            )}
            <span>
              {maxLevel > 40
                ? isVi
                  ? `Max Lv.${maxLevel} (HH8)`
                  : `Max Lv.${maxLevel} (B8)`
                : `Max Lv.${maxLevel}`}
            </span>
          </div>
        </div>

        {/* Target Level Stepper */}
        <div className="flex items-center justify-between gap-2 md:col-span-4 lg:col-span-3 md:justify-end">
          <span className="text-xs font-sans font-semibold text-muted-foreground">
            {isVi ? "Cấp mục tiêu:" : "Target Lv:"}
          </span>
          <div className="flex items-center gap-1.5">
            <CalculatorStepperButton
              direction="decrease"
              testId={`queue-${queueIndex}-to-decrease`}
              ariaLabel={isVi ? "Giảm cấp mục tiêu" : "Decrease target level"}
              disabled={toLevel <= 2}
              onClick={() => {
                if (isSingleStep && fromLevel > 1) {
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
              testId={`queue-${queueIndex}-to-increase`}
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

"use client";

import React, { useCallback } from "react";
import { ArrowRight, Shield, Swords } from "lucide-react";
import { GameAssetFrame } from "@/components/guides/media/game-asset-frame";
import {
  LORD_GEAR_LEVEL_STEPS,
  LORD_GEAR_PRESET_MILESTONES,
  type LordGearSlotId,
  type LordGearSlotUpgradeResult,
} from "@/content/calculators/lord-gear-data";
import type { CalculatorLocale } from "@/content/calculators/types";
import { formatCompactNumber, formatExactNumber } from "@/lib/number-format";
import { cn } from "@/lib/utils";
import {
  CALC_MD3,
  CalculatorStepperButton,
} from "./calculator-md3-primitives";

export interface LordGearSlotCardProps {
  readonly result: LordGearSlotUpgradeResult;
  readonly maxAllowedLevel: number;
  readonly showExtended: boolean;
  readonly locale: CalculatorLocale;
  readonly isSpearhead?: boolean;
  readonly onChangeRange: (
    slotId: LordGearSlotId,
    fromLevel: number,
    toLevel: number,
  ) => void;
}

const FACTION_BADGE_STYLES: Readonly<Record<string, string>> = {
  nature:
    "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
  league:
    "bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-500/30",
  horde:
    "bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30",
};

export function LordGearSlotCard({
  result,
  maxAllowedLevel,
  showExtended,
  locale,
  isSpearhead = false,
  onChangeRange,
}: LordGearSlotCardProps): React.JSX.Element {
  const isVi = locale === "vi";
  const { slot, fromLevel, toLevel, fromStep, toStep, cost, fromStats, toStats } =
    result;

  const availableSteps = showExtended
    ? LORD_GEAR_LEVEL_STEPS
    : LORD_GEAR_LEVEL_STEPS.slice(0, maxAllowedLevel + 1);

  const availableMilestones = LORD_GEAR_PRESET_MILESTONES.filter(
    (m) => showExtended || !m.isExtended,
  );

  const handleDecreaseFrom = useCallback((): void => {
    const nextFrom = Math.max(0, fromLevel - 1);
    onChangeRange(slot.id, nextFrom, Math.max(nextFrom, toLevel));
  }, [fromLevel, onChangeRange, slot.id, toLevel]);

  const handleIncreaseFrom = useCallback((): void => {
    const nextFrom = Math.min(maxAllowedLevel, fromLevel + 1);
    onChangeRange(slot.id, nextFrom, Math.max(nextFrom, toLevel));
  }, [fromLevel, maxAllowedLevel, onChangeRange, slot.id, toLevel]);

  const handleSelectFrom = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>): void => {
      const nextFrom = Number(event.target.value);
      onChangeRange(slot.id, nextFrom, Math.max(nextFrom, toLevel));
    },
    [onChangeRange, slot.id, toLevel],
  );

  const handleDecreaseTo = useCallback((): void => {
    const nextTo = Math.max(fromLevel, toLevel - 1);
    onChangeRange(slot.id, fromLevel, nextTo);
  }, [fromLevel, onChangeRange, slot.id, toLevel]);

  const handleIncreaseTo = useCallback((): void => {
    const nextTo = Math.min(maxAllowedLevel, toLevel + 1);
    onChangeRange(slot.id, fromLevel, nextTo);
  }, [fromLevel, maxAllowedLevel, onChangeRange, slot.id, toLevel]);

  const handleSelectTo = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>): void => {
      const nextTo = Number(event.target.value);
      onChangeRange(slot.id, Math.min(fromLevel, nextTo), nextTo);
    },
    [fromLevel, onChangeRange, slot.id],
  );

  const handleSelectMilestone = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>): void => {
      const val = event.target.value;
      if (!val) return;
      const targetLv = Number(val);
      onChangeRange(slot.id, Math.min(fromLevel, targetLv), targetLv);
    },
    [fromLevel, onChangeRange, slot.id],
  );

  const BranchIcon = slot.branch === "left_defense" ? Shield : Swords;
  const factionClass =
    FACTION_BADGE_STYLES[slot.faction] ?? FACTION_BADGE_STYLES.league;

  return (
    <div
      data-testid={`lord-gear-slot-${slot.id}`}
      className={cn(
        CALC_MD3.tonalGroup,
        "flex flex-col justify-between gap-3 transition-all",
        isSpearhead ? "ring-2 ring-amber-500/60 bg-amber-500/5" : "",
      )}
    >
      {/* Top Row: Icon + Name + Branch Badge */}
      <div className="flex items-start justify-between gap-2.5">
        <div className="flex items-center gap-2.5 min-w-0">
          <GameAssetFrame
            src={slot.iconPath}
            alt={slot.name[locale]}
            size="md"
            shape="item"
            className="shrink-0"
          />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-1.5">
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-xs font-semibold",
                  factionClass,
                )}
              >
                <BranchIcon className="h-3 w-3" aria-hidden="true" />
                {slot.positionLabel[locale]}
              </span>
              {isSpearhead ? (
                <span className="rounded-md bg-amber-500/20 px-1.5 py-0.5 text-xs font-bold text-amber-700 dark:text-amber-300">
                  {isVi ? "Mũi nhọn" : "Spearhead"}
                </span>
              ) : null}
            </div>
            <h3 className="mt-1 truncate text-base font-heading font-bold text-foreground">
              {slot.name[locale]}
            </h3>
            <p className="text-xs text-muted-foreground">
              <span>{isVi ? "Lực chiến:" : "Power:"}</span>{" "}
              <strong className="font-mono text-foreground">
                {formatCompactNumber(fromStep.fightForce)}
              </strong>{" "}
              ➔{" "}
              <strong className="font-mono text-amber-600 dark:text-amber-400">
                {formatCompactNumber(toStep.fightForce)}
              </strong>{" "}
              {result.fightForceDelta > 0 ? (
                <span className="font-mono">
                  (+{formatCompactNumber(result.fightForceDelta)})
                </span>
              ) : null}
            </p>
          </div>
        </div>
      </div>

      {/* Level Selectors: Current -> Target */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <div className="space-y-1">
          <label
            htmlFor={`from-select-${slot.id}`}
            className="block text-xs font-semibold text-muted-foreground"
          >
            {isVi ? "Cấp hiện tại" : "Current Level"}
          </label>
          <div className="flex items-center gap-1">
            <CalculatorStepperButton
              direction="decrease"
              testId={`slot-${slot.id}-from-dec`}
              ariaLabel={isVi ? "Giảm cấp hiện tại" : "Decrease current level"}
              disabled={fromLevel <= 0}
              onClick={handleDecreaseFrom}
            />
            <select
              id={`from-select-${slot.id}`}
              data-testid={`slot-${slot.id}-from-select`}
              value={fromLevel}
              onChange={handleSelectFrom}
              className="h-11 min-w-0 flex-1 rounded-xl border border-border/70 bg-background px-2 text-xs sm:text-sm font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40"
            >
              {availableSteps.map((step) => (
                <option key={`from-${slot.id}-${step.level}`} value={step.level}>
                  {step.label[locale]}
                </option>
              ))}
            </select>
            <CalculatorStepperButton
              direction="increase"
              testId={`slot-${slot.id}-from-inc`}
              ariaLabel={isVi ? "Tăng cấp hiện tại" : "Increase current level"}
              disabled={fromLevel >= maxAllowedLevel}
              onClick={handleIncreaseFrom}
            />
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between gap-1">
            <label
              htmlFor={`to-select-${slot.id}`}
              className="block text-xs font-semibold text-amber-600 dark:text-amber-400"
            >
              {isVi ? "Cấp mục tiêu" : "Target Level"}
            </label>
            <select
              aria-label={isVi ? "Chọn nhanh mốc phẩm chất" : "Quick milestone"}
              value=""
              onChange={handleSelectMilestone}
              className="rounded-md border border-amber-500/30 bg-amber-500/10 px-1.5 py-0.5 text-xs font-semibold text-amber-700 dark:text-amber-300"
            >
              <option value="">{isVi ? "Mốc nhanh..." : "Milestone..."}</option>
              {availableMilestones.map((m) => (
                <option key={`ms-${slot.id}-${m.level}`} value={m.level}>
                  {m.label[locale]}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-1">
            <CalculatorStepperButton
              direction="decrease"
              testId={`slot-${slot.id}-to-dec`}
              ariaLabel={isVi ? "Giảm cấp mục tiêu" : "Decrease target level"}
              disabled={toLevel <= fromLevel}
              onClick={handleDecreaseTo}
            />
            <select
              id={`to-select-${slot.id}`}
              data-testid={`slot-${slot.id}-to-select`}
              value={toLevel}
              onChange={handleSelectTo}
              className="h-11 min-w-0 flex-1 rounded-xl border border-amber-500/50 bg-background px-2 text-xs sm:text-sm font-bold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40"
            >
              {availableSteps.map((step) => (
                <option
                  key={`to-${slot.id}-${step.level}`}
                  value={step.level}
                  disabled={step.level < fromLevel}
                >
                  {step.label[locale]}
                </option>
              ))}
            </select>
            <CalculatorStepperButton
              direction="increase"
              testId={`slot-${slot.id}-to-inc`}
              ariaLabel={isVi ? "Tăng cấp mục tiêu" : "Increase target level"}
              disabled={toLevel >= maxAllowedLevel}
              onClick={handleIncreaseTo}
            />
          </div>
        </div>
      </div>

      {/* 3 Branch Attributes Preview (Before -> After) */}
      <div className="rounded-lg bg-background/60 p-2.5 space-y-1 text-xs">
        <div className="flex items-center justify-between gap-2">
          <span className="text-muted-foreground">
            {slot.statLabels.factionHero[locale]}
          </span>
          <span className="font-mono font-semibold text-foreground">
            {fromStats.factionHeroPct.toFixed(2)}%{" "}
            <ArrowRight className="inline h-3 w-3 text-muted-foreground" />{" "}
            <span className="text-emerald-600 dark:text-emerald-400">
              {toStats.factionHeroPct.toFixed(2)}%
            </span>
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-muted-foreground">
            {slot.statLabels.factionSoldier[locale]}
          </span>
          <span className="font-mono font-semibold text-foreground">
            {fromStats.factionSoldierPct.toFixed(2)}%{" "}
            <ArrowRight className="inline h-3 w-3 text-muted-foreground" />{" "}
            <span className="text-emerald-600 dark:text-emerald-400">
              {toStats.factionSoldierPct.toFixed(2)}%
            </span>
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-muted-foreground">
            {slot.statLabels.allSoldier[locale]}
          </span>
          <span className="font-mono font-semibold text-foreground">
            {fromStats.allSoldierPct.toFixed(2)}%{" "}
            <ArrowRight className="inline h-3 w-3 text-muted-foreground" />{" "}
            <span className="text-emerald-600 dark:text-emerald-400">
              {toStats.allSoldierPct.toFixed(2)}%
            </span>
          </span>
        </div>
      </div>

      {/* Cost Footer */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border/50 pt-2 text-xs">
        <span className="font-semibold text-muted-foreground">
          {isVi
            ? `Tiêu hao (${result.stepsCount} bước):`
            : `Cost (${result.stepsCount} steps):`}
        </span>
        <div className="flex flex-wrap items-center gap-2 font-mono font-bold">
          <span title={isVi ? "Kim Loại Tinh Luyện" : "Refined Metal"}>
            🪨 {formatExactNumber(cost.refinedMetal)}
          </span>
          <span title={isVi ? "Sợi Tơ Ma Thuật" : "Magic Thread"}>
            🧵 {formatExactNumber(cost.magicThread)}
          </span>
          {cost.orichalcum > 0 ? (
            <span
              className="text-amber-600 dark:text-amber-400"
              title="Orichalcum"
            >
              🔶 {formatExactNumber(cost.orichalcum)}
            </span>
          ) : null}
          {cost.dragonBlood > 0 ? (
            <span
              className="text-rose-600 dark:text-rose-400"
              title={isVi ? "Huyết Rồng" : "Dragon Blood"}
            >
              🩸 {formatExactNumber(cost.dragonBlood)}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}

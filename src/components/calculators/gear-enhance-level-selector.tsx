"use client";

import React from "react";
import { CheckCircle2, Sparkles } from "lucide-react";
import {
  GEAR_ENHANCE_RARITY_CONFIGS,
  GEAR_SLOTS_BY_RARITY,
  MIN_GEAR_ENHANCE_LEVEL,
  clampGearEnhanceLevel,
  getCumulativeGearEnhanceCost,
  getStepGearEnhanceCost,
  type GearEnhanceRarity,
  type GearEnhanceSlotId,
} from "@/content/calculators/gear-enhance-data";
import type { CalculatorLocale } from "@/content/calculators/types";
import { cn, formatCompactNumber, formatExactNumber } from "@/lib/utils";
import { CALC_MD3, CalculatorStepperButton } from "./calculator-md3-primitives";

export interface GearEnhanceLevelSelectorProps {
  readonly idPrefix: string;
  readonly title: string;
  readonly level: number;
  readonly rarity?: GearEnhanceRarity;
  readonly slotId?: GearEnhanceSlotId;
  readonly locale: CalculatorLocale;
  readonly onChangeLevel: (nextLevel: number) => void;
}

export function GearEnhanceLevelSelector({
  idPrefix,
  title,
  level,
  rarity = "legendary",
  slotId = "boots",
  locale,
  onChangeLevel,
}: GearEnhanceLevelSelectorProps) {
  const rarityConfig = GEAR_ENHANCE_RARITY_CONFIGS[rarity];
  const slotMeta = GEAR_SLOTS_BY_RARITY[rarity][slotId];
  const maxLevel = rarityConfig.maxLevel;
  const safeLevel = clampGearEnhanceLevel(level, rarity);

  const cumulativeCost = getCumulativeGearEnhanceCost(safeLevel, rarity);
  const nextStepCost =
    safeLevel >= maxLevel
      ? { runes: 0, ruby: 0 }
      : getStepGearEnhanceCost(safeLevel + 1, rarity);

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
          className="inline-flex items-center gap-1 rounded-xl bg-amber-500/15 px-3 py-1 text-sm font-mono font-black text-amber-700 dark:text-amber-300"
        >
          <span>
            Lv.{safeLevel}/{maxLevel}
          </span>
        </span>
      </div>

      {/* Quick Milestone Chips (Dynamic per rarity maxLevel) */}
      <div className="space-y-1.5">
        <div className={cn(CALC_MD3.eyebrow, "text-muted-foreground")}>
          {locale === "vi" ? "Chọn Nhanh Mốc Cấp Độ" : "Quick Level Milestones"}
        </div>
        <div
          className={cn(
            "grid gap-1.5",
            rarityConfig.quickMilestones.length === 5
              ? "grid-cols-5"
              : "grid-cols-4"
          )}
        >
          {rarityConfig.quickMilestones.map((milestoneLv) => {
            const isSelected = safeLevel === milestoneLv;
            const isReached = milestoneLv > 0 && safeLevel >= milestoneLv;

            return (
              <button
                key={milestoneLv}
                type="button"
                data-testid={`${idPrefix}-milestone-${milestoneLv}-btn`}
                aria-pressed={isSelected}
                onClick={() => onChangeLevel(milestoneLv)}
                className={cn(
                  "flex min-h-[44px] flex-col items-center justify-center rounded-xl px-1.5 py-1.5 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40",
                  isSelected
                    ? "bg-amber-500 text-slate-950 font-black shadow-sm"
                    : isReached
                      ? "bg-amber-500/15 text-amber-700 dark:text-amber-300 font-bold hover:bg-amber-500/25"
                      : "bg-muted/50 text-muted-foreground font-semibold hover:bg-muted hover:text-foreground"
                )}
              >
                <span className="font-mono text-sm font-black">
                  {milestoneLv === 0 ? "Lv.0" : `+${milestoneLv}`}
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
            onClick={() =>
              onChangeLevel(clampGearEnhanceLevel(safeLevel - 1, rarity))
            }
          />

          <div className="flex-1 space-y-1">
            <input
              type="range"
              data-testid={`${idPrefix}-level-slider`}
              min={MIN_GEAR_ENHANCE_LEVEL}
              max={maxLevel}
              step={1}
              value={safeLevel}
              aria-label={title}
              onChange={(e) =>
                onChangeLevel(
                  clampGearEnhanceLevel(Number(e.target.value), rarity)
                )
              }
              className="h-2.5 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-amber-500"
            />
            <div className="flex justify-between text-xs font-mono text-muted-foreground">
              {rarityConfig.quickMilestones.map((m) => (
                <span key={m}>
                  {m === 0 ? "Lv.0" : m === maxLevel ? `Lv.${m}` : `+${m}`}
                </span>
              ))}
            </div>
          </div>

          <CalculatorStepperButton
            direction="increase"
            testId={`${idPrefix}-level-plus-btn`}
            ariaLabel={increaseLabel}
            disabled={safeLevel >= maxLevel}
            onClick={() =>
              onChangeLevel(clampGearEnhanceLevel(safeLevel + 1, rarity))
            }
          />
        </div>
      </div>

      {/* Equipment Piece Level Bonus Chips (+10 / +20 / +30 / +40) */}
      <div className="space-y-1.5">
        <div className={cn(CALC_MD3.eyebrow, "text-muted-foreground")}>
          {locale === "vi"
            ? "Thưởng Theo Cấp Độ Trang Bị"
            : "Equipment Level Bonus"}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          {slotMeta.levelMilestones.map((m) => {
            const isUnlocked = safeLevel >= m.level;
            return (
              <div
                key={m.level}
                data-testid={`${idPrefix}-piece-bonus-${m.level}`}
                className={cn(
                  "flex items-center justify-between gap-2 rounded-xl px-2.5 py-1.5 text-xs transition-colors",
                  isUnlocked
                    ? "bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 font-semibold"
                    : "bg-muted/40 text-muted-foreground"
                )}
              >
                <span className="inline-flex items-center gap-1.5 min-w-0">
                  <span
                    className={cn(
                      "inline-flex h-5 min-w-[24px] shrink-0 items-center justify-center rounded-md px-1 font-mono text-xs font-black",
                      isUnlocked
                        ? "bg-emerald-600 text-white"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {m.level}
                  </span>
                  <span className="font-sans truncate">
                    {m.statLabel[locale]}
                  </span>
                </span>
                <span className="inline-flex items-center gap-1 shrink-0">
                  <span className="font-mono font-bold">{m.bonusValue}</span>
                  {isUnlocked ? (
                    <CheckCircle2
                      className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400"
                      aria-hidden="true"
                    />
                  ) : null}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tonal Summary Strip (Compact K/M numbers + exact tooltips) */}
      <div
        data-testid={`${idPrefix}-enhance-summary`}
        className={cn(CALC_MD3.tonalGroup, "space-y-1.5")}
      >
        <div className="flex items-center justify-between gap-2 text-xs sm:text-sm">
          <span className="text-muted-foreground font-sans">
            {locale === "vi" ? "Tích lũy từ Lv.0:" : "Cumulative from Lv.0:"}
          </span>
          <span className="font-sans font-bold text-foreground">
            <span
              className="font-mono text-amber-700 dark:text-amber-300"
              title={formatExactNumber(cumulativeCost.runes)}
            >
              {formatCompactNumber(cumulativeCost.runes)}
            </span>{" "}
            <span>Rune</span> •{" "}
            <span
              className="font-mono text-rose-600 dark:text-rose-400"
              title={formatExactNumber(cumulativeCost.ruby)}
            >
              {formatCompactNumber(cumulativeCost.ruby)}
            </span>{" "}
            <span>Ruby</span>
          </span>
        </div>

        <div className="flex items-center justify-between gap-2 border-t border-border/50 pt-1.5 text-xs">
          <span className="inline-flex items-center gap-1 text-amber-700 dark:text-amber-400 font-sans font-semibold">
            <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>
              {safeLevel >= maxLevel
                ? locale === "vi"
                  ? `Đã đạt trần Lv.${maxLevel}`
                  : `Max Lv.${maxLevel} reached`
                : locale === "vi"
                  ? `Lên Lv.${safeLevel + 1}:`
                  : `To Lv.${safeLevel + 1}:`}
            </span>
          </span>
          {safeLevel < maxLevel ? (
            <span className="font-sans font-bold text-foreground">
              <span
                className="font-mono text-amber-700 dark:text-amber-300"
                title={formatExactNumber(nextStepCost.runes)}
              >
                {formatCompactNumber(nextStepCost.runes)}
              </span>{" "}
              <span>Rune</span> •{" "}
              <span
                className="font-mono text-rose-600 dark:text-rose-400"
                title={formatExactNumber(nextStepCost.ruby)}
              >
                {formatCompactNumber(nextStepCost.ruby)}
              </span>{" "}
              <span>Ruby</span>
            </span>
          ) : null}
        </div>
      </div>
    </section>
  );
}

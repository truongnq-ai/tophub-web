"use client";

import React from "react";
import { BookOpen, Sparkles } from "lucide-react";
import {
  ECONOMIC_SWEET_SPOT_SKILL_LEVEL,
  MAX_SKILL_BOOK_LEVEL,
  MIN_SKILL_BOOK_LEVEL,
  SKILL_PRESET_CONFIGS,
  SKILL_SLOT_DEFINITIONS,
  clampSkillLevel,
  getCumulativeSkillBooksAtLevel,
  getSkillBookRowAtLevel,
  type SkillLevelsTuple,
  type SkillSlotCount,
  type SkillSlotIndex,
} from "@/content/calculators/skill-books-data";
import type { CalculatorLocale } from "@/content/calculators/types";
import { cn, formatExactNumber } from "@/lib/utils";
import { CALC_MD3, CalculatorStepperButton } from "./calculator-md3-primitives";

export interface HeroSkillSlotsSelectorProps {
  readonly idPrefix: "from" | "to";
  readonly title: string;
  readonly slotCount: SkillSlotCount;
  readonly levels: SkillLevelsTuple;
  readonly locale: CalculatorLocale;
  readonly onChangeSlotLevel: (
    slotIndex: SkillSlotIndex,
    nextLevel: number
  ) => void;
  readonly onApplyPreset: (presetLevels: SkillLevelsTuple) => void;
}

export function HeroSkillSlotsSelector({
  idPrefix,
  title,
  slotCount,
  levels,
  locale,
  onChangeSlotLevel,
  onApplyPreset,
}: HeroSkillSlotsSelectorProps) {
  const activeSlots = SKILL_SLOT_DEFINITIONS.slice(0, slotCount);
  const totalBooksInState = activeSlots.reduce(
    (sum, def) =>
      sum + getCumulativeSkillBooksAtLevel(levels[def.slotIndex] ?? 1),
    0
  );
  const bookUnit = locale === "vi" ? "cuốn" : "books";

  return (
    <div
      data-testid={`${idPrefix}-skill-slots-selector`}
      className={cn(CALC_MD3.surfaceCard, "space-y-3")}
    >
      {/* Header + Cumulative Skill Books Badge */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-2.5">
        <div className="flex min-w-0 items-center gap-2">
          <BookOpen
            className="h-5 w-5 shrink-0 text-amber-500"
            aria-hidden="true"
          />
          <h3
            data-testid={`${idPrefix}-skill-slots-title`}
            className={CALC_MD3.sectionTitle}
          >
            {title}
          </h3>
        </div>
        <span
          data-testid={`${idPrefix}-cumulative-books-badge`}
          className="shrink-0 rounded-lg bg-amber-500/15 px-2.5 py-1 text-xs font-sans font-bold text-amber-700 dark:text-amber-300"
        >
          <span className="font-mono">
            {formatExactNumber(totalBooksInState)}
          </span>{" "}
          {bookUnit}
        </span>
      </div>

      {/* Quick Presets Row (≥ 44px touch targets) */}
      <div className="flex flex-wrap items-center gap-1.5">
        {SKILL_PRESET_CONFIGS.map((preset) => {
          const isMatch = activeSlots.every(
            (def) =>
              clampSkillLevel(levels[def.slotIndex] ?? 1) ===
              preset.levels[def.slotIndex]
          );
          return (
            <button
              key={preset.id}
              type="button"
              data-testid={`${idPrefix}-skill-preset-${preset.id}-btn`}
              onClick={() => onApplyPreset(preset.levels)}
              className={cn(
                CALC_MD3.chipButton,
                "px-2.5 font-sans text-xs sm:text-sm",
                isMatch
                  ? "bg-amber-500 font-black text-slate-950"
                  : preset.isRecommended
                    ? "bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20 dark:text-emerald-400"
                    : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {preset.isRecommended ? (
                <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              ) : null}
              <span>{preset.shortLabel[locale]}</span>
            </button>
          );
        })}
      </div>

      {/* Active Skill Slot Rows (4, 5, or 6) — flat hairline dividers, zero nested borders */}
      <ul
        data-testid={`${idPrefix}-skill-slot-list`}
        className={CALC_MD3.dividedList}
      >
        {activeSlots.map((def) => {
          const lv = clampSkillLevel(levels[def.slotIndex] ?? 1);
          const rowInfo = getSkillBookRowAtLevel(lv);
          const slotNum = def.slotNumber;
          const isSweetSpotLv10 = lv === ECONOMIC_SWEET_SPOT_SKILL_LEVEL;
          const isSecondarySlot3 = def.slotIndex === 2;

          return (
            <li
              key={slotNum}
              data-testid={`${idPrefix}-skill-slot-${slotNum}-row`}
              className={cn(
                "space-y-2 py-3",
                def.priorityTag === "awakening_mythic"
                  ? "-mx-2 rounded-xl bg-amber-500/[0.07] px-2"
                  : "px-0"
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2">
                  <span
                    className={cn(
                      "inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-xs font-black",
                      lv >= ECONOMIC_SWEET_SPOT_SKILL_LEVEL
                        ? "bg-amber-500 text-slate-950"
                        : lv > 1
                          ? "bg-amber-500/20 text-amber-700 dark:text-amber-300"
                          : "bg-secondary text-muted-foreground"
                    )}
                  >
                    {slotNum}
                  </span>
                  <span className="truncate text-sm font-heading font-bold text-foreground">
                    {def.shortTitle[locale]}
                  </span>
                </div>

                <div className="flex shrink-0 items-center gap-1.5">
                  {isSweetSpotLv10 ? (
                    <span className="rounded-md bg-emerald-500/15 px-2 py-0.5 font-sans text-xs font-bold text-emerald-700 dark:text-emerald-300">
                      ROI
                    </span>
                  ) : null}
                  {isSecondarySlot3 && lv > ECONOMIC_SWEET_SPOT_SKILL_LEVEL ? (
                    <span className="rounded-md bg-amber-500/15 px-2 py-0.5 font-mono text-xs font-bold text-amber-700 dark:text-amber-300">
                      &gt;Lv.10
                    </span>
                  ) : null}
                  <span
                    data-testid={`${idPrefix}-skill-slot-${slotNum}-level-badge`}
                    className="rounded-md bg-secondary px-2 py-0.5 font-mono text-sm font-black text-foreground"
                  >
                    Lv.{lv}/{MAX_SKILL_BOOK_LEVEL}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 text-xs sm:text-sm font-sans text-muted-foreground">
                <span className="truncate">{rowInfo.tierLabel[locale]}</span>
                <span className="shrink-0 font-semibold text-amber-700 dark:text-amber-400">
                  <span className="font-mono">
                    {formatExactNumber(rowInfo.cumulativeBooks)}
                  </span>{" "}
                  {bookUnit}
                </span>
              </div>

              {/* Slider + 44×44px [-] and [+] Steppers */}
              <div className="flex items-center gap-2">
                <CalculatorStepperButton
                  direction="decrease"
                  testId={`${idPrefix}-skill-slot-${slotNum}-minus-btn`}
                  disabled={lv <= MIN_SKILL_BOOK_LEVEL}
                  onClick={() =>
                    onChangeSlotLevel(def.slotIndex, clampSkillLevel(lv - 1))
                  }
                  ariaLabel={
                    locale === "vi"
                      ? `Giảm cấp Kỹ năng ${slotNum}`
                      : `Decrease Skill ${slotNum} level`
                  }
                />
                <input
                  type="range"
                  min={MIN_SKILL_BOOK_LEVEL}
                  max={MAX_SKILL_BOOK_LEVEL}
                  step={1}
                  value={lv}
                  data-testid={`${idPrefix}-skill-slot-${slotNum}-slider`}
                  aria-label={`${title} - Skill ${slotNum}`}
                  onChange={(e) =>
                    onChangeSlotLevel(
                      def.slotIndex,
                      clampSkillLevel(Number(e.target.value))
                    )
                  }
                  className="h-11 min-w-0 flex-1 cursor-pointer accent-amber-500"
                />
                <CalculatorStepperButton
                  direction="increase"
                  testId={`${idPrefix}-skill-slot-${slotNum}-plus-btn`}
                  disabled={lv >= MAX_SKILL_BOOK_LEVEL}
                  onClick={() =>
                    onChangeSlotLevel(def.slotIndex, clampSkillLevel(lv + 1))
                  }
                  ariaLabel={
                    locale === "vi"
                      ? `Tăng cấp Kỹ năng ${slotNum}`
                      : `Increase Skill ${slotNum} level`
                  }
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

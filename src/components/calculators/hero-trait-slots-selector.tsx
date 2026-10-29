"use client";

import React from "react";
import { Settings, Gem, Sparkles } from "lucide-react";
import {
  MAX_TRAIT_SLOT_LEVEL,
  SHARDS_PER_TRAIT_LEVEL,
  clampTraitLevel,
  type HeroTrait3Profile,
  type TraitLevelsTuple,
  type TraitSlotIndex,
} from "@/content/calculators/hero-traits-data";
import type { CalculatorLocale } from "@/content/calculators/types";
import { cn } from "@/lib/utils";
import { CALC_MD3, CalculatorStepperButton } from "./calculator-md3-primitives";

interface HeroTraitSlotsSelectorProps {
  readonly idPrefix: "from" | "to";
  readonly title: string;
  readonly levels: TraitLevelsTuple;
  readonly heroProfile: HeroTrait3Profile;
  readonly locale: CalculatorLocale;
  readonly onChangeSlotLevel: (
    slotIndex: TraitSlotIndex,
    nextLevel: number
  ) => void;
  readonly onApplyPreset: (presetLevels: TraitLevelsTuple) => void;
}

const SLOT_INDEXES: readonly TraitSlotIndex[] = [0, 1, 2, 3];
const BLOCK_PRESETS = [5, 10, 15, 20, 25] as const;
const NUMERIC_PRESET_CHIP = cn(
  CALC_MD3.chipButton,
  "bg-muted/60 px-3 font-mono text-muted-foreground hover:bg-muted hover:text-foreground"
);

export function HeroTraitSlotsSelector({
  idPrefix,
  title,
  levels,
  heroProfile,
  locale,
  onChangeSlotLevel,
  onApplyPreset,
}: HeroTraitSlotsSelectorProps) {
  const totalShardsInState =
    (levels[0] + levels[1] + levels[2] + levels[3]) * SHARDS_PER_TRAIT_LEVEL;
  const shardUnit = locale === "vi" ? "Mảnh" : "Shards";

  const getSlotMeta = (slotIndex: TraitSlotIndex) => {
    const lv = levels[slotIndex];
    if (slotIndex === 0) {
      return {
        shortTitle:
          locale === "vi" ? "Ô 1 • ATK Anh Hùng" : "Slot 1 • Hero ATK",
        effectText: `+${lv * 3}% ATK`,
        isUniqueSlot3: false,
        isDiamondSlot4: false,
      };
    }
    if (slotIndex === 1) {
      return {
        shortTitle:
          locale === "vi" ? "Ô 2 • HP Binh Lính" : "Slot 2 • Soldier HP",
        effectText: locale === "vi" ? `Lv.${lv}/30 Lính` : `Lv.${lv}/30 Troop`,
        isUniqueSlot3: false,
        isDiamondSlot4: false,
      };
    }
    if (slotIndex === 2) {
      return {
        shortTitle:
          locale === "vi"
            ? `Ô 3 • ${heroProfile.trait3Title.vi}`
            : `Slot 3 • ${heroProfile.trait3Title.en}`,
        effectText:
          lv === 30
            ? heroProfile.maxBonusLabel[locale]
            : `${heroProfile.perLevelBonusLabel[locale]} (Lv.${lv})`,
        isUniqueSlot3: true,
        isDiamondSlot4: false,
      };
    }
    return {
      shortTitle: locale === "vi" ? "Ô 4 • HP Anh Hùng" : "Slot 4 • Hero HP",
      effectText: `+${lv * 3}% HP`,
      isUniqueSlot3: false,
      isDiamondSlot4: true,
    };
  };

  return (
    <div
      data-testid={`${idPrefix}-trait-slots-selector`}
      className={cn(CALC_MD3.surfaceCard, "space-y-3")}
    >
      {/* Header + Cumulative Shards */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-2.5">
        <div className="flex min-w-0 items-center gap-2">
          <Settings className="h-5 w-5 shrink-0 text-amber-500" aria-hidden="true" />
          <h3 data-testid={`${idPrefix}-trait-slots-title`} className={CALC_MD3.sectionTitle}>
            {title}
          </h3>
        </div>
        <span
          data-testid={`${idPrefix}-cumulative-shards-badge`}
          className="shrink-0 rounded-lg bg-amber-500/15 px-2.5 py-1 text-xs font-sans font-bold text-amber-700 dark:text-amber-300"
        >
          <span className="font-mono">{totalShardsInState.toLocaleString("en-US")}</span>{" "}
          {shardUnit}
        </span>
      </div>

      {/* Quick Presets Row (≥ 44px) */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          data-testid={`${idPrefix}-preset-zero-btn`}
          onClick={() => onApplyPreset([0, 0, 0, 0])}
          className={NUMERIC_PRESET_CHIP}
        >
          0/0/0/0
        </button>

        <button
          type="button"
          data-testid={`${idPrefix}-preset-econ-btn`}
          onClick={() => onApplyPreset([15, 0, 30, 0])}
          className={cn(
            CALC_MD3.chipButton,
            "bg-emerald-500/10 px-3 font-sans text-emerald-700 hover:bg-emerald-500/20 dark:text-emerald-400"
          )}
        >
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          <span>
            {locale === "vi" ? "Phễu Kinh Tế (15/0/30/0)" : "Econ (15/0/30/0)"}
          </span>
        </button>

        {BLOCK_PRESETS.map((blk) => (
          <button
            key={blk}
            type="button"
            data-testid={`${idPrefix}-preset-block-${blk}-btn`}
            onClick={() => onApplyPreset([blk, blk, blk, blk])}
            className={NUMERIC_PRESET_CHIP}
          >
            {blk}/{blk}
          </button>
        ))}

        <button
          type="button"
          data-testid={`${idPrefix}-preset-max-btn`}
          onClick={() => onApplyPreset([30, 30, 30, 30])}
          className={cn(
            CALC_MD3.chipButton,
            "bg-amber-500/15 px-3 font-mono text-amber-700 hover:bg-amber-500/25 dark:text-amber-300"
          )}
        >
          Max 30/30/30/30
        </button>
      </div>

      {/* 4 Trait Slot Rows — hairline dividers, không hộp viền con */}
      <ul data-testid={`${idPrefix}-trait-slot-list`} className={CALC_MD3.dividedList}>
        {SLOT_INDEXES.map((slotIdx) => {
          const lv = levels[slotIdx];
          const meta = getSlotMeta(slotIdx);
          const slotNum = slotIdx + 1;

          return (
            <li
              key={slotNum}
              data-testid={`${idPrefix}-slot-${slotNum}-row`}
              className={cn(
                "space-y-2 py-3",
                meta.isUniqueSlot3 ? "-mx-2 rounded-xl bg-amber-500/[0.08] px-2" : "px-0"
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2">
                  <span
                    className={cn(
                      "inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-xs font-black",
                      lv > 0
                        ? "bg-amber-500 text-slate-950"
                        : "bg-secondary text-muted-foreground"
                    )}
                  >
                    {slotNum}
                  </span>
                  <span className="truncate text-sm font-heading font-bold text-foreground">
                    {meta.shortTitle}
                  </span>
                </div>

                <div className="flex shrink-0 items-center gap-1.5">
                  {meta.isDiamondSlot4 ? (
                    <span className="inline-flex items-center gap-1 rounded-md bg-sky-500/15 px-2 py-0.5 font-mono text-xs font-bold text-sky-700 dark:text-sky-300">
                      <Gem className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>2,000</span>
                    </span>
                  ) : null}
                  <span
                    data-testid={`${idPrefix}-slot-${slotNum}-level-badge`}
                    className="rounded-md bg-secondary px-2 py-0.5 font-mono text-sm font-black text-foreground"
                  >
                    {lv}/{MAX_TRAIT_SLOT_LEVEL}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 text-sm font-sans text-muted-foreground">
                <span className="truncate">{meta.effectText}</span>
                <span className="shrink-0 font-semibold text-amber-700 dark:text-amber-400">
                  <span className="font-mono">{lv * SHARDS_PER_TRAIT_LEVEL}</span>{" "}
                  {shardUnit}
                </span>
              </div>

              {/* Slider with 44px [-] and [+] at both ends */}
              <div className="flex items-center gap-2">
                <CalculatorStepperButton
                  direction="decrease"
                  testId={`${idPrefix}-slot-${slotNum}-minus-btn`}
                  disabled={lv <= 0}
                  onClick={() => onChangeSlotLevel(slotIdx, clampTraitLevel(lv - 1))}
                  ariaLabel={
                    locale === "vi"
                      ? `Giảm cấp Ô ${slotNum}`
                      : `Decrease Slot ${slotNum} level`
                  }
                />
                <input
                  type="range"
                  min={0}
                  max={MAX_TRAIT_SLOT_LEVEL}
                  step={1}
                  value={lv}
                  data-testid={`${idPrefix}-slot-${slotNum}-slider`}
                  aria-label={`${title} - Slot ${slotNum}`}
                  onChange={(e) =>
                    onChangeSlotLevel(slotIdx, clampTraitLevel(Number(e.target.value)))
                  }
                  className="h-11 min-w-0 flex-1 cursor-pointer accent-amber-500"
                />
                <CalculatorStepperButton
                  direction="increase"
                  testId={`${idPrefix}-slot-${slotNum}-plus-btn`}
                  disabled={lv >= MAX_TRAIT_SLOT_LEVEL}
                  onClick={() => onChangeSlotLevel(slotIdx, clampTraitLevel(lv + 1))}
                  ariaLabel={
                    locale === "vi"
                      ? `Tăng cấp Ô ${slotNum}`
                      : `Increase Slot ${slotNum} level`
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

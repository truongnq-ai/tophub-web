"use client";

import React from "react";
import { Minus, Plus, Settings, Gem, Sparkles } from "lucide-react";
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
      className="rounded-2xl border border-border/80 bg-card/75 p-3.5 sm:p-4 space-y-3 shadow-sm"
    >
      {/* Header + Cumulative Shards */}
      <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <Settings className="h-4 w-4 text-amber-500 shrink-0" />
          <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-muted-foreground truncate">
            {title}
          </span>
        </div>

        <span
          data-testid={`${idPrefix}-cumulative-shards-badge`}
          className="rounded-lg bg-amber-500/15 border border-amber-500/35 px-2 py-0.5 font-mono text-[11px] font-bold text-amber-600 dark:text-amber-300 shrink-0"
        >
          {totalShardsInState.toLocaleString("en-US")}{" "}
          {locale === "vi" ? "Mảnh" : "Shards"}
        </span>
      </div>

      {/* Quick Presets Row */}
      <div className="flex flex-wrap items-center gap-1.5">
        <button
          type="button"
          data-testid={`${idPrefix}-preset-zero-btn`}
          onClick={() => onApplyPreset([0, 0, 0, 0])}
          className="rounded-lg border border-border/70 bg-secondary/50 hover:bg-secondary px-2 py-1 font-mono text-[10px] font-bold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          0/0/0/0
        </button>

        <button
          type="button"
          data-testid={`${idPrefix}-preset-econ-btn`}
          onClick={() => onApplyPreset([15, 0, 30, 0])}
          className="inline-flex items-center gap-1 rounded-lg border border-emerald-500/35 bg-emerald-500/10 hover:bg-emerald-500/20 px-2 py-1 font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400 transition-colors cursor-pointer"
        >
          <Sparkles className="h-3 w-3" />
          <span>
            {locale === "vi" ? "Phễu Kinh Tế (15/0/30/0)" : "Econ (15/0/30/0)"}
          </span>
        </button>

        {([5, 10, 15, 20, 25] as const).map((blk) => (
          <button
            key={blk}
            type="button"
            data-testid={`${idPrefix}-preset-block-${blk}-btn`}
            onClick={() => onApplyPreset([blk, blk, blk, blk])}
            className="rounded-lg border border-border/70 bg-secondary/50 hover:bg-secondary px-2 py-1 font-mono text-[10px] font-bold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            {blk}/{blk}
          </button>
        ))}

        <button
          type="button"
          data-testid={`${idPrefix}-preset-max-btn`}
          onClick={() => onApplyPreset([30, 30, 30, 30])}
          className="rounded-lg border border-amber-500/35 bg-amber-500/15 hover:bg-amber-500/25 px-2 py-1 font-mono text-[10px] font-bold text-amber-600 dark:text-amber-300 transition-colors cursor-pointer"
        >
          Max 30/30/30/30
        </button>
      </div>

      {/* 4 Trait Slot Sliders */}
      <div className="space-y-2.5">
        {SLOT_INDEXES.map((slotIdx) => {
          const lv = levels[slotIdx];
          const meta = getSlotMeta(slotIdx);
          const slotNum = slotIdx + 1;

          return (
            <div
              key={slotNum}
              data-testid={`${idPrefix}-slot-${slotNum}-row`}
              className={cn(
                "rounded-xl border p-2.5 space-y-1.5 transition-colors",
                meta.isUniqueSlot3
                  ? "border-amber-500/40 bg-amber-500/[0.06]"
                  : "border-border/70 bg-background/60"
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0 flex items-center gap-1.5">
                  <span
                    className={cn(
                      "inline-flex h-5 w-5 items-center justify-center rounded-full font-mono text-[10px] font-black shrink-0",
                      lv > 0
                        ? "bg-amber-500 text-slate-950"
                        : "bg-secondary text-muted-foreground"
                    )}
                  >
                    {slotNum}
                  </span>
                  <span className="text-xs font-heading font-bold text-foreground truncate">
                    {meta.shortTitle}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {meta.isDiamondSlot4 && (
                    <span className="inline-flex items-center gap-0.5 rounded-md bg-sky-500/15 border border-sky-500/35 px-1.5 py-0.5 font-mono text-[9px] font-bold text-sky-600 dark:text-sky-300">
                      <Gem className="h-2.5 w-2.5" />
                      <span>2,000</span>
                    </span>
                  )}
                  <span
                    data-testid={`${idPrefix}-slot-${slotNum}-level-badge`}
                    className="rounded-md bg-secondary px-1.5 py-0.5 font-mono text-[11px] font-black text-foreground"
                  >
                    {lv}/{MAX_TRAIT_SLOT_LEVEL}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 text-[10px] font-mono text-muted-foreground">
                <span className="truncate">{meta.effectText}</span>
                <span className="shrink-0 font-semibold text-amber-600 dark:text-amber-400">
                  {lv * SHARDS_PER_TRAIT_LEVEL}{" "}
                  {locale === "vi" ? "Mảnh" : "Shards"}
                </span>
              </div>

              {/* Slider with [-] and [+] at both ends */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  data-testid={`${idPrefix}-slot-${slotNum}-minus-btn`}
                  disabled={lv <= 0}
                  onClick={() =>
                    onChangeSlotLevel(slotIdx, clampTraitLevel(lv - 1))
                  }
                  aria-label={
                    locale === "vi"
                      ? `Giảm cấp Ô ${slotNum}`
                      : `Decrease Slot ${slotNum} level`
                  }
                  className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-border bg-card hover:bg-secondary disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed transition-colors"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>

                <input
                  type="range"
                  min={0}
                  max={MAX_TRAIT_SLOT_LEVEL}
                  step={1}
                  value={lv}
                  data-testid={`${idPrefix}-slot-${slotNum}-slider`}
                  aria-label={`${title} - Slot ${slotNum}`}
                  onChange={(e) =>
                    onChangeSlotLevel(
                      slotIdx,
                      clampTraitLevel(Number(e.target.value))
                    )
                  }
                  className="w-full h-1.5 accent-amber-500 cursor-pointer"
                />

                <button
                  type="button"
                  data-testid={`${idPrefix}-slot-${slotNum}-plus-btn`}
                  disabled={lv >= MAX_TRAIT_SLOT_LEVEL}
                  onClick={() =>
                    onChangeSlotLevel(slotIdx, clampTraitLevel(lv + 1))
                  }
                  aria-label={
                    locale === "vi"
                      ? `Tăng cấp Ô ${slotNum}`
                      : `Increase Slot ${slotNum} level`
                  }
                  className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-border bg-card hover:bg-secondary disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

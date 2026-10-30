"use client";

import React from "react";
import { Flame, Sparkles, Shield } from "lucide-react";
import {
  CASTLE_HERO_LEVEL_PRESETS,
  HEROIC_SPIRIT_LEVEL_TABLE,
  MAX_HEROIC_SPIRIT_LEVEL,
  MAX_HERO_LEVEL,
  MIN_HEROIC_SPIRIT_LEVEL,
  MIN_HERO_LEVEL,
  clampHeroLevel,
  clampSpiritLevel,
  getCastleStageLabelForHeroLevel,
  getCumulativeMeatAtHeroLevel,
  type LevelSpiritViewMode,
} from "@/content/calculators/hero-level-spirit-data";
import type { CalculatorLocale } from "@/content/calculators/types";
import {
  cn,
  formatCompactNumber,
  formatExactNumber,
} from "@/lib/utils";
import { CALC_MD3, CalculatorStepperButton } from "./calculator-md3-primitives";

export interface HeroLevelSpiritSelectorProps {
  readonly idPrefix: "from" | "to";
  readonly title: string;
  readonly viewMode: LevelSpiritViewMode;
  readonly heroLevel: number;
  readonly spiritLevel: number;
  readonly locale: CalculatorLocale;
  readonly onChangeHeroLevel: (nextLevel: number) => void;
  readonly onChangeSpiritLevel: (nextLevel: number) => void;
}

const SPIRIT_PRESET_LEVELS = [0, 10, 20, 30, 40, 50, 60, 80, 100] as const;

export function HeroLevelSpiritSelector({
  idPrefix,
  title,
  viewMode,
  heroLevel,
  spiritLevel,
  locale,
  onChangeHeroLevel,
  onChangeSpiritLevel,
}: HeroLevelSpiritSelectorProps) {
  const cumulativeMeat = getCumulativeMeatAtHeroLevel(heroLevel);
  const castleStage = getCastleStageLabelForHeroLevel(heroLevel);
  const spiritRow =
    HEROIC_SPIRIT_LEVEL_TABLE[clampSpiritLevel(spiritLevel)] ??
    HEROIC_SPIRIT_LEVEL_TABLE[0];

  const showHeroLevelSection = viewMode !== "spirit-only";
  const showSpiritSection = viewMode !== "level-only";

  const meatUnit = locale === "vi" ? "Thịt" : "Meat";
  const shardUnit = locale === "vi" ? "Mảnh" : "Shards";

  return (
    <div
      data-testid={`${idPrefix}-level-spirit-selector`}
      className={cn(CALC_MD3.surfaceCard, "space-y-3")}
    >
      {/* Header + Cumulative Summary Badges */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-2.5">
        <div className="flex min-w-0 items-center gap-2">
          <Flame className="h-5 w-5 shrink-0 text-amber-500" aria-hidden="true" />
          <h3
            data-testid={`${idPrefix}-level-spirit-title`}
            className={CALC_MD3.sectionTitle}
          >
            {title}
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {showHeroLevelSection ? (
            <span
              data-testid={`${idPrefix}-cumulative-meat-badge`}
              title={formatExactNumber(cumulativeMeat)}
              className="shrink-0 rounded-lg bg-amber-500/15 px-2.5 py-1 text-xs font-sans font-bold text-amber-700 dark:text-amber-300"
            >
              <span className="font-mono">{formatCompactNumber(cumulativeMeat)}</span>{" "}
              {meatUnit}
            </span>
          ) : null}

          {showSpiritSection ? (
            <span
              data-testid={`${idPrefix}-cumulative-spirit-badge`}
              className="shrink-0 rounded-lg bg-sky-500/15 px-2.5 py-1 text-xs font-sans font-bold text-sky-700 dark:text-sky-300"
            >
              <span className="font-mono">
                {formatExactNumber(spiritRow.cumulativeShards)}
              </span>{" "}
              {shardUnit}
            </span>
          ) : null}
        </div>
      </div>

      {/* Hairline Divided List (Maximum 1 Bordered Container Depth) */}
      <ul
        data-testid={`${idPrefix}-level-spirit-list`}
        className={CALC_MD3.dividedList}
      >
        {/* Row 1: Hero Level & Meat (Lv.1 -> Lv.311) */}
        {showHeroLevelSection ? (
          <li
            data-testid={`${idPrefix}-hero-level-row`}
            className="space-y-2.5 px-0 py-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-2">
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500 font-mono text-xs font-black text-slate-950">
                  1
                </span>
                <span className="text-sm font-heading font-bold text-foreground">
                  {locale === "vi"
                    ? "Cấp Độ Tướng (Thịt)"
                    : "Hero Level (Meat)"}
                </span>
              </div>

              <span
                data-testid={`${idPrefix}-hero-level-badge`}
                className="rounded-md bg-secondary px-2.5 py-0.5 font-mono text-sm font-black text-foreground"
              >
                Lv.{heroLevel}/{MAX_HERO_LEVEL}
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 text-sm font-sans text-muted-foreground">
              <span>{castleStage[locale]}</span>
              <span
                className="font-semibold text-amber-700 dark:text-amber-400"
                title={formatExactNumber(cumulativeMeat)}
              >
                <span className="font-mono">
                  {formatCompactNumber(cumulativeMeat)}
                </span>{" "}
                {meatUnit}
              </span>
            </div>

            {/* Castle Level Quick-Pick Presets (≥ 44px) */}
            <div className="flex flex-wrap items-center gap-1.5">
              {CASTLE_HERO_LEVEL_PRESETS.map((preset) => {
                const isSelected = heroLevel === preset.heroLevel;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    data-testid={`${idPrefix}-castle-preset-${preset.id}-btn`}
                    title={preset.fullLabel[locale]}
                    onClick={() => onChangeHeroLevel(preset.heroLevel)}
                    className={cn(
                      CALC_MD3.chipButton,
                      "px-2.5 font-mono text-xs sm:text-sm",
                      isSelected
                        ? "bg-amber-500 text-slate-950 font-black"
                        : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {preset.shortLabel[locale]}
                  </button>
                );
              })}
            </div>

            {/* Slider + 44px Steppers */}
            <div className="flex items-center gap-2">
              <CalculatorStepperButton
                direction="decrease"
                testId={`${idPrefix}-hero-level-minus-btn`}
                disabled={heroLevel <= MIN_HERO_LEVEL}
                onClick={() => onChangeHeroLevel(clampHeroLevel(heroLevel - 1))}
                ariaLabel={
                  locale === "vi"
                    ? "Giảm cấp độ tướng"
                    : "Decrease hero level"
                }
              />
              <input
                type="range"
                min={MIN_HERO_LEVEL}
                max={MAX_HERO_LEVEL}
                step={1}
                value={heroLevel}
                data-testid={`${idPrefix}-hero-level-slider`}
                aria-label={
                  locale === "vi"
                    ? `${title} - Cấp Độ Tướng`
                    : `${title} - Hero Level`
                }
                onChange={(e) =>
                  onChangeHeroLevel(clampHeroLevel(Number(e.target.value)))
                }
                className="h-11 min-w-0 flex-1 cursor-pointer accent-amber-500"
              />
              <CalculatorStepperButton
                direction="increase"
                testId={`${idPrefix}-hero-level-plus-btn`}
                disabled={heroLevel >= MAX_HERO_LEVEL}
                onClick={() => onChangeHeroLevel(clampHeroLevel(heroLevel + 1))}
                ariaLabel={
                  locale === "vi"
                    ? "Tăng cấp độ tướng"
                    : "Increase hero level"
                }
              />
            </div>
          </li>
        ) : null}

        {/* Row 2: Heroic Spirit (Lv.0 -> Lv.100) */}
        {showSpiritSection ? (
          <li
            data-testid={`${idPrefix}-spirit-level-row`}
            className="space-y-2.5 px-0 py-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-2">
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-500 font-mono text-xs font-black text-slate-950">
                  2
                </span>
                <span className="text-sm font-heading font-bold text-foreground">
                  {locale === "vi"
                    ? "Linh Thể Anh Hùng (5★ Bạc)"
                    : "Heroic Spirit (5★ Silver)"}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                {spiritRow.bonusHeroLevelCap > 0 ? (
                  <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/15 px-2 py-0.5 text-xs font-sans font-bold text-emerald-700 dark:text-emerald-300">
                    <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>
                      +<span className="font-mono">{spiritRow.bonusHeroLevelCap}</span>{" "}
                      {locale === "vi" ? "Trần Cấp" : "Lv Cap"}
                    </span>
                  </span>
                ) : null}

                <span
                  data-testid={`${idPrefix}-spirit-level-badge`}
                  className="rounded-md bg-secondary px-2.5 py-0.5 font-mono text-sm font-black text-foreground"
                >
                  Lv.{spiritLevel}/{MAX_HEROIC_SPIRIT_LEVEL}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 text-sm font-sans text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-sky-500" aria-hidden="true" />
                <span>
                  {locale === "vi"
                    ? `Giảm ST Kỹ Năng: +${spiritRow.skillDamageReductionPercent}% • ATK +${spiritRow.percentAtk}%`
                    : `Skill DMG Red: +${spiritRow.skillDamageReductionPercent}% • ATK +${spiritRow.percentAtk}%`}
                </span>
              </span>

              <span className="font-semibold text-sky-700 dark:text-sky-400">
                <span className="font-mono">
                  {formatExactNumber(spiritRow.cumulativeShards)}
                </span>{" "}
                {shardUnit}
              </span>
            </div>

            {/* Breakthrough Level Presets (Lv.0, 10, 20, 30, 40, 50, 60, 80, 100) */}
            <div className="flex flex-wrap items-center gap-1.5">
              {SPIRIT_PRESET_LEVELS.map((presetLv) => {
                const isSelected = spiritLevel === presetLv;
                return (
                  <button
                    key={presetLv}
                    type="button"
                    data-testid={`${idPrefix}-spirit-preset-${presetLv}-btn`}
                    onClick={() => onChangeSpiritLevel(presetLv)}
                    className={cn(
                      CALC_MD3.chipButton,
                      "px-2.5 font-mono text-xs sm:text-sm",
                      isSelected
                        ? "bg-sky-500 text-slate-950 font-black"
                        : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    Lv.{presetLv}
                  </button>
                );
              })}
            </div>

            {/* Slider + 44px Steppers */}
            <div className="flex items-center gap-2">
              <CalculatorStepperButton
                direction="decrease"
                testId={`${idPrefix}-spirit-level-minus-btn`}
                disabled={spiritLevel <= MIN_HEROIC_SPIRIT_LEVEL}
                onClick={() =>
                  onChangeSpiritLevel(clampSpiritLevel(spiritLevel - 1))
                }
                ariaLabel={
                  locale === "vi"
                    ? "Giảm cấp độ Linh Thể"
                    : "Decrease Heroic Spirit level"
                }
              />
              <input
                type="range"
                min={MIN_HEROIC_SPIRIT_LEVEL}
                max={MAX_HEROIC_SPIRIT_LEVEL}
                step={1}
                value={spiritLevel}
                data-testid={`${idPrefix}-spirit-level-slider`}
                aria-label={
                  locale === "vi"
                    ? `${title} - Linh Thể Anh Hùng`
                    : `${title} - Heroic Spirit`
                }
                onChange={(e) =>
                  onChangeSpiritLevel(clampSpiritLevel(Number(e.target.value)))
                }
                className="h-11 min-w-0 flex-1 cursor-pointer accent-sky-500"
              />
              <CalculatorStepperButton
                direction="increase"
                testId={`${idPrefix}-spirit-level-plus-btn`}
                disabled={spiritLevel >= MAX_HEROIC_SPIRIT_LEVEL}
                onClick={() =>
                  onChangeSpiritLevel(clampSpiritLevel(spiritLevel + 1))
                }
                ariaLabel={
                  locale === "vi"
                    ? "Tăng cấp độ Linh Thể"
                    : "Increase Heroic Spirit level"
                }
              />
            </div>
          </li>
        ) : null}
      </ul>
    </div>
  );
}

"use client";

import React from "react";
import { Shield, Sparkles, Star } from "lucide-react";
import {
  TROOP_SKIN_LEVEL_PRESETS,
  TROOP_SKIN_MAX_LEVEL,
  TROOP_SKIN_MIN_LEVEL,
  TROOP_SKIN_STEPS,
  TROOP_SKIN_TOTAL_COPIES_TO_MAX,
  getCumulativeCopiesAtLevel,
  getCumulativeMedalsAtPoint,
  getInterpolatedSkinStatsAtPoint,
  getMaxSublevelsForLevel,
  normalizeTroopSkinPoint,
  type TroopSkinPointState,
  type TroopSkinRarity,
} from "@/content/calculators/troop-skins-data";
import type { CalculatorLocale } from "@/content/calculators/types";
import { Input } from "@/components/ui/input";
import {
  cn,
  formatCompactNumber,
  formatExactNumber,
} from "@/lib/utils";
import {
  CALC_MD3,
  CalculatorStepperButton,
} from "./calculator-md3-primitives";

export interface TroopSkinsSelectorProps {
  readonly idPrefix: "from" | "to";
  readonly title: string;
  readonly rarity: TroopSkinRarity;
  readonly point: TroopSkinPointState;
  readonly locale: CalculatorLocale;
  readonly onChangePoint: (nextPoint: TroopSkinPointState) => void;
  readonly warningBanner?: React.ReactNode;
}

const STAR_BY_LEVEL_PRESET: Readonly<Record<number, number>> = {
  1: 0,
  10: 1,
  20: 2,
  30: 3,
  40: 4,
  45: 5,
  50: 6,
};

export function TroopSkinsSelector({
  idPrefix,
  title,
  rarity,
  point,
  locale,
  onChangePoint,
  warningBanner,
}: TroopSkinsSelectorProps): React.JSX.Element {
  const isVi = locale === "vi";
  const normalized = normalizeTroopSkinPoint(point);
  const maxSublevels = getMaxSublevelsForLevel(normalized.level);
  const maxAllowedSublevel = maxSublevels > 0 ? maxSublevels - 1 : 0;

  const cumulativeMedals = getCumulativeMedalsAtPoint(normalized, rarity);
  const cumulativeCopies = getCumulativeCopiesAtLevel(normalized.level);
  const stats = getInterpolatedSkinStatsAtPoint(normalized, rarity);

  const currentStepRow =
    normalized.level < TROOP_SKIN_MAX_LEVEL
      ? TROOP_SKIN_STEPS[normalized.level - 1]
      : undefined;

  const medalUnit = isVi ? "Huy Chương" : "Medals";
  const copyUnit = isVi ? "Phôi" : "Copies";

  const handleLevelChange = (nextLevel: number): void => {
    onChangePoint(
      normalizeTroopSkinPoint({
        level: nextLevel,
        sublevel: 0,
      })
    );
  };

  const handleSublevelChange = (nextSublevel: number): void => {
    onChangePoint(
      normalizeTroopSkinPoint({
        level: normalized.level,
        sublevel: nextSublevel,
      })
    );
  };

  return (
    <section
      data-testid={`${idPrefix}-troop-skins-selector`}
      className={cn(
        CALC_MD3.surfaceCard,
        "flex h-full flex-col justify-between space-y-3.5"
      )}
    >
      <div className="space-y-3.5">
        {/* Header + Cumulative Summary Badges (No-Line MD3) */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <Shield
              className="h-5 w-5 shrink-0 text-amber-500"
              aria-hidden="true"
            />
            <h2
              data-testid={`${idPrefix}-troop-skins-title`}
              className={CALC_MD3.sectionTitle}
            >
              {title}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <span
              data-testid={`${idPrefix}-cumulative-medals-badge`}
              title={formatExactNumber(cumulativeMedals)}
              className="shrink-0 rounded-lg bg-amber-500/15 px-2.5 py-1 text-xs font-sans font-bold text-amber-700 dark:text-amber-300"
            >
              <span className="font-mono tabular-nums">
                {formatCompactNumber(cumulativeMedals)}
              </span>{" "}
              <span>{medalUnit}</span>
            </span>

            <span
              data-testid={`${idPrefix}-cumulative-copies-badge`}
              className="shrink-0 rounded-lg bg-sky-500/15 px-2.5 py-1 text-xs font-sans font-bold text-sky-700 dark:text-sky-300"
            >
              <span className="font-mono tabular-nums">
                {cumulativeCopies}/{TROOP_SKIN_TOTAL_COPIES_TO_MAX}
              </span>{" "}
              <span>{copyUnit}</span>
            </span>
          </div>
        </div>

        {/* Tonal Group 1: Troop Skin Level (Lv.1 -> Lv.50), Quick Milestone Chips, Range Slider & Steppers */}
        <div
          data-testid={`${idPrefix}-skin-level-row`}
          className={cn(CALC_MD3.tonalGroup, "space-y-3")}
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-sm font-heading font-bold text-foreground">
              {isVi
                ? "Cấp Quân Trang (Lv.1–50)"
                : "Troop Skin Level (Lv.1–50)"}
            </span>

            <span
              data-testid={`${idPrefix}-skin-level-badge`}
              className="rounded-lg bg-background/80 px-2.5 py-0.5 font-mono text-sm font-black text-amber-700 tabular-nums dark:text-amber-300"
            >
              Lv.{normalized.level}/{TROOP_SKIN_MAX_LEVEL}
            </span>
          </div>

          {/* 7 Star Breakthrough Quick Presets (>= 44px) */}
          <div className="flex flex-wrap items-center gap-1.5">
            {TROOP_SKIN_LEVEL_PRESETS.map((presetLv) => {
              const isSelected =
                normalized.level === presetLv && normalized.sublevel === 0;
              const isReached = normalized.level >= presetLv && presetLv > 1;
              const starCount = STAR_BY_LEVEL_PRESET[presetLv] ?? 0;
              const isMythicStar = starCount === 6;

              return (
                <button
                  key={presetLv}
                  type="button"
                  data-testid={`${idPrefix}-skin-preset-${presetLv}-btn`}
                  aria-pressed={isSelected}
                  onClick={() => handleLevelChange(presetLv)}
                  className={cn(
                    CALC_MD3.chipButton,
                    "px-2.5 text-xs",
                    isSelected
                      ? isMythicStar
                        ? "bg-rose-600 text-white font-black shadow-sm"
                        : "bg-amber-500 text-slate-950 font-black shadow-sm"
                      : isReached
                        ? "bg-amber-500/15 text-amber-700 dark:text-amber-300 font-bold hover:bg-amber-500/25"
                        : "bg-background/70 text-muted-foreground hover:bg-background hover:text-foreground"
                  )}
                >
                  <span className="font-mono tabular-nums">Lv.{presetLv}</span>
                  {starCount > 0 ? (
                    <span
                      className={cn(
                        "inline-flex items-center gap-0.5 font-mono text-xs tabular-nums",
                        !isSelected && isMythicStar
                          ? "text-rose-600 dark:text-rose-400"
                          : ""
                      )}
                    >
                      <Star
                        className="h-3.5 w-3.5 fill-current"
                        aria-hidden="true"
                      />
                      {starCount}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>

          {/* Range Slider (Lv.1..50) */}
          <div className="space-y-1">
            <input
              type="range"
              data-testid={`${idPrefix}-skin-level-slider`}
              min={TROOP_SKIN_MIN_LEVEL}
              max={TROOP_SKIN_MAX_LEVEL}
              step={1}
              value={normalized.level}
              aria-label={
                isVi
                  ? `Thanh kéo ${title}`
                  : `${title} level slider`
              }
              onChange={(e) => {
                const parsed = Number.parseInt(e.target.value, 10);
                if (!Number.isNaN(parsed)) {
                  handleLevelChange(parsed);
                }
              }}
              className="h-2.5 w-full cursor-pointer appearance-none rounded-lg bg-background/80 accent-amber-500"
            />
            <div className="flex justify-between font-mono text-xs text-muted-foreground tabular-nums">
              <span>Lv.1</span>
              <span>Lv.10</span>
              <span>Lv.20</span>
              <span>Lv.30</span>
              <span>Lv.40</span>
              <span>Lv.50</span>
            </div>
          </div>

          {/* Level Stepper + Number Input */}
          <div className="flex items-center gap-2">
            <CalculatorStepperButton
              direction="decrease"
              testId={`${idPrefix}-skin-level-minus-btn`}
              disabled={normalized.level <= TROOP_SKIN_MIN_LEVEL}
              onClick={() => handleLevelChange(normalized.level - 1)}
              ariaLabel={
                isVi
                  ? "Giảm 1 cấp Quân Trang"
                  : "Decrease Troop Skin level by 1"
              }
            />

            <Input
              type="number"
              min={TROOP_SKIN_MIN_LEVEL}
              max={TROOP_SKIN_MAX_LEVEL}
              data-testid={`${idPrefix}-skin-level-input`}
              aria-label={
                isVi ? "Nhập cấp Quân Trang" : "Enter Troop Skin level"
              }
              value={normalized.level}
              onChange={(e) => {
                const parsed = Number.parseInt(e.target.value, 10);
                if (!Number.isNaN(parsed)) {
                  handleLevelChange(parsed);
                }
              }}
              className={cn(
                CALC_MD3.dataInput,
                "bg-background/80 text-center tabular-nums"
              )}
            />

            <CalculatorStepperButton
              direction="increase"
              testId={`${idPrefix}-skin-level-plus-btn`}
              disabled={normalized.level >= TROOP_SKIN_MAX_LEVEL}
              onClick={() => handleLevelChange(normalized.level + 1)}
              ariaLabel={
                isVi
                  ? "Tăng 1 cấp Quân Trang"
                  : "Increase Troop Skin level by 1"
              }
            />
          </div>
        </div>

        {/* Tonal Group 2: Sublevel Progress (0 .. maxSublevels - 1) */}
        <div
          data-testid={`${idPrefix}-skin-sublevel-row`}
          className={cn(CALC_MD3.tonalGroup, "space-y-2.5")}
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-sm font-heading font-bold text-foreground">
              {isVi
                ? "Vạch Nhỏ Đã Nâng (Sub-level)"
                : "Sub-level Progress"}
            </span>

            <span
              data-testid={`${idPrefix}-skin-sublevel-badge`}
              className="rounded-lg bg-background/80 px-2.5 py-0.5 font-mono text-sm font-black text-foreground tabular-nums"
            >
              {normalized.sublevel}/{maxSublevels}
            </span>
          </div>

          <p className="text-xs font-sans text-muted-foreground">
            {normalized.level >= TROOP_SKIN_MAX_LEVEL
              ? isVi
                ? "Đã đạt cấp tối đa Lv.50 (Mở khóa Vinh Dự Quân Trang)"
                : "Max Lv.50 reached (Unlocks Skin Honor Level)"
              : maxSublevels <= 1
                ? isVi
                  ? `Lv.${normalized.level} ➔ Lv.${normalized.level + 1} nâng trực tiếp 1 vạch`
                  : `Lv.${normalized.level} to Lv.${normalized.level + 1} uses 1 direct step`
                : isVi
                  ? `Mốc SSoT ${currentStepRow?.ssotNotation ?? ""}: gồm ${maxSublevels} vạch nhỏ`
                  : `SSoT ${currentStepRow?.ssotNotation ?? ""}: ${maxSublevels} sub-levels`}
          </p>

          <div className="flex items-center gap-2">
            <CalculatorStepperButton
              direction="decrease"
              testId={`${idPrefix}-skin-sublevel-minus-btn`}
              disabled={normalized.sublevel <= 0}
              onClick={() => handleSublevelChange(normalized.sublevel - 1)}
              ariaLabel={
                isVi ? "Giảm 1 vạch nhỏ" : "Decrease sub-level by 1"
              }
            />

            <div className="flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-xl bg-background/80 px-3 py-2 text-center">
              <span className="font-mono text-sm font-bold text-foreground tabular-nums">
                {normalized.sublevel} / {maxAllowedSublevel}
              </span>
              <span className="text-xs font-sans font-medium text-muted-foreground">
                {isVi ? "vạch đã bơm" : "bars filled"}
              </span>
            </div>

            <CalculatorStepperButton
              direction="increase"
              testId={`${idPrefix}-skin-sublevel-plus-btn`}
              disabled={normalized.sublevel >= maxAllowedSublevel}
              onClick={() => handleSublevelChange(normalized.sublevel + 1)}
              ariaLabel={
                isVi ? "Tăng 1 vạch nhỏ" : "Increase sub-level by 1"
              }
            />
          </div>
        </div>
      </div>

      {/* Bottom Tonal Group 3: Owned & Equipped Stat Summary + Optional Warning */}
      <div className="space-y-2.5">
        <div className={cn(CALC_MD3.tonalGroup, "space-y-1.5")}>
          <div className="flex items-center justify-between gap-2 text-xs sm:text-sm font-sans">
            <span className="inline-flex items-center gap-1.5 font-medium text-muted-foreground">
              <Sparkles
                className="h-3.5 w-3.5 text-amber-500"
                aria-hidden="true"
              />
              <span>
                {isVi
                  ? "Buff Sở Hữu Toàn Quân:"
                  : "Owned All-Soldier Buff:"}
              </span>
            </span>
            <span className="font-mono font-bold text-emerald-600 tabular-nums dark:text-emerald-400">
              +{stats.ownedAtkPct}% ATK • +{stats.ownedHpPct}% HP
            </span>
          </div>

          <div className="flex items-center justify-between gap-2 text-xs sm:text-sm font-sans">
            <span className="font-medium text-muted-foreground">
              {isVi ? "Buff Khi Đeo Đạo Chính:" : "Equipped Queue Buff:"}
            </span>
            <span className="font-mono font-bold text-foreground tabular-nums">
              +{stats.equippedAtkPct}% ATK • +{stats.equippedHpPct}% HP
            </span>
          </div>
        </div>

        {warningBanner}
      </div>
    </section>
  );
}

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
}: TroopSkinsSelectorProps) {
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

  const medalUnit = locale === "vi" ? "Huy Chương" : "Medals";
  const copyUnit = locale === "vi" ? "Phôi" : "Copies";

  const handleLevelChange = (nextLevel: number) => {
    onChangePoint(
      normalizeTroopSkinPoint({
        level: nextLevel,
        sublevel: 0,
      })
    );
  };

  const handleSublevelChange = (nextSublevel: number) => {
    onChangePoint(
      normalizeTroopSkinPoint({
        level: normalized.level,
        sublevel: nextSublevel,
      })
    );
  };

  return (
    <div
      data-testid={`${idPrefix}-troop-skins-selector`}
      className={cn(CALC_MD3.surfaceCard, "space-y-3")}
    >
      {/* Header + Cumulative Summary Badges */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-2.5">
        <div className="flex min-w-0 items-center gap-2">
          <Shield className="h-5 w-5 shrink-0 text-amber-500" aria-hidden="true" />
          <h3
            data-testid={`${idPrefix}-troop-skins-title`}
            className={CALC_MD3.sectionTitle}
          >
            {title}
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span
            data-testid={`${idPrefix}-cumulative-medals-badge`}
            title={formatExactNumber(cumulativeMedals)}
            className="shrink-0 rounded-lg bg-amber-500/15 px-2.5 py-1 text-xs font-sans font-bold text-amber-700 dark:text-amber-300"
          >
            <span className="font-mono">
              {formatCompactNumber(cumulativeMedals)}
            </span>{" "}
            {medalUnit}
          </span>

          <span
            data-testid={`${idPrefix}-cumulative-copies-badge`}
            className="shrink-0 rounded-lg bg-sky-500/15 px-2.5 py-1 text-xs font-sans font-bold text-sky-700 dark:text-sky-300"
          >
            <span className="font-mono">
              {cumulativeCopies}/{TROOP_SKIN_TOTAL_COPIES_TO_MAX}
            </span>{" "}
            {copyUnit}
          </span>
        </div>
      </div>

      {/* Hairline Divided List (Single-Layer Containment <= 1 border) */}
      <ul
        data-testid={`${idPrefix}-troop-skins-list`}
        className={CALC_MD3.dividedList}
      >
        {/* Row 1: Troop Skin Level (Lv.1 -> Lv.50) & Star Milestones */}
        <li
          data-testid={`${idPrefix}-skin-level-row`}
          className="space-y-2.5 px-0 py-3"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2">
              <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500 font-mono text-xs font-black text-slate-950">
                1
              </span>
              <span className="text-sm font-heading font-bold text-foreground">
                {locale === "vi"
                  ? "Cấp Quân Trang (Lv.1–50)"
                  : "Troop Skin Level (Lv.1–50)"}
              </span>
            </div>

            <span
              data-testid={`${idPrefix}-skin-level-badge`}
              className="rounded-md bg-secondary px-2.5 py-0.5 font-mono text-sm font-black text-foreground"
            >
              Lv.{normalized.level}/{TROOP_SKIN_MAX_LEVEL}
            </span>
          </div>

          {/* Star Milestone Quick Presets (>= 44px) */}
          <div className="flex flex-wrap items-center gap-1.5">
            {TROOP_SKIN_LEVEL_PRESETS.map((presetLv) => {
              const isSelected =
                normalized.level === presetLv && normalized.sublevel === 0;
              const starCount = STAR_BY_LEVEL_PRESET[presetLv] ?? 0;
              return (
                <button
                  key={presetLv}
                  type="button"
                  data-testid={`${idPrefix}-skin-preset-${presetLv}-btn`}
                  onClick={() => handleLevelChange(presetLv)}
                  className={cn(
                    CALC_MD3.chipButton,
                    "px-2.5 text-xs sm:text-sm",
                    isSelected
                      ? "bg-amber-500 text-slate-950 font-black"
                      : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <span className="font-mono">Lv.{presetLv}</span>
                  {starCount > 0 ? (
                    <span className="inline-flex items-center gap-0.5 font-mono text-xs">
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

          {/* Level Stepper + Number Input */}
          <div className="flex items-center gap-2">
            <CalculatorStepperButton
              direction="decrease"
              testId={`${idPrefix}-skin-level-minus-btn`}
              disabled={normalized.level <= TROOP_SKIN_MIN_LEVEL}
              onClick={() => handleLevelChange(normalized.level - 1)}
              ariaLabel={
                locale === "vi"
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
                locale === "vi" ? "Nhập cấp Quân Trang" : "Enter Troop Skin level"
              }
              value={normalized.level}
              onChange={(e) => {
                const parsed = Number.parseInt(e.target.value, 10);
                if (!Number.isNaN(parsed)) {
                  handleLevelChange(parsed);
                }
              }}
              className={cn(CALC_MD3.dataInput, "text-center")}
            />

            <CalculatorStepperButton
              direction="increase"
              testId={`${idPrefix}-skin-level-plus-btn`}
              disabled={normalized.level >= TROOP_SKIN_MAX_LEVEL}
              onClick={() => handleLevelChange(normalized.level + 1)}
              ariaLabel={
                locale === "vi"
                  ? "Tăng 1 cấp Quân Trang"
                  : "Increase Troop Skin level by 1"
              }
            />
          </div>
        </li>

        {/* Row 2: Sublevel Progress (0 .. maxSublevels - 1) & Cumulative Stats */}
        <li
          data-testid={`${idPrefix}-skin-sublevel-row`}
          className="space-y-2.5 px-0 py-3"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2">
              <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-500 font-mono text-xs font-black text-slate-950">
                2
              </span>
              <span className="text-sm font-heading font-bold text-foreground">
                {locale === "vi"
                  ? "Vạch Nhỏ Đã Nâng (Sub-level)"
                  : "Sub-level Progress"}
              </span>
            </div>

            <span
              data-testid={`${idPrefix}-skin-sublevel-badge`}
              className="rounded-md bg-secondary px-2.5 py-0.5 font-mono text-sm font-black text-foreground"
            >
              {normalized.sublevel}/{maxSublevels}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm font-sans text-muted-foreground">
            <span>
              {normalized.level >= TROOP_SKIN_MAX_LEVEL
                ? locale === "vi"
                  ? "Đã đạt cấp tối đa Lv.50 (Mở khóa Vinh Dự)"
                  : "Max Lv.50 reached (Unlocks Honor Level)"
                : maxSublevels <= 1
                  ? locale === "vi"
                    ? `Lv.${normalized.level} ➔ Lv.${normalized.level + 1} nâng trực tiếp 1 vạch`
                    : `Lv.${normalized.level} to Lv.${normalized.level + 1} uses 1 direct step`
                  : locale === "vi"
                    ? `Mốc SSoT ${currentStepRow?.ssotNotation ?? ""}: gồm ${maxSublevels} vạch nhỏ`
                    : `SSoT ${currentStepRow?.ssotNotation ?? ""}: ${maxSublevels} sub-levels`}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <CalculatorStepperButton
              direction="decrease"
              testId={`${idPrefix}-skin-sublevel-minus-btn`}
              disabled={normalized.sublevel <= 0}
              onClick={() => handleSublevelChange(normalized.sublevel - 1)}
              ariaLabel={
                locale === "vi"
                  ? "Giảm 1 vạch nhỏ"
                  : "Decrease sub-level by 1"
              }
            />

            <div className="flex-1 rounded-xl bg-muted/40 dark:bg-muted/25 px-3 py-2 text-center">
              <span className="font-mono text-sm font-bold text-foreground">
                {normalized.sublevel} / {maxAllowedSublevel}
              </span>{" "}
              <span className="text-xs font-sans font-medium text-muted-foreground">
                {locale === "vi" ? "vạch đã bơm" : "bars filled"}
              </span>
            </div>

            <CalculatorStepperButton
              direction="increase"
              testId={`${idPrefix}-skin-sublevel-plus-btn`}
              disabled={normalized.sublevel >= maxAllowedSublevel}
              onClick={() => handleSublevelChange(normalized.sublevel + 1)}
              ariaLabel={
                locale === "vi"
                  ? "Tăng 1 vạch nhỏ"
                  : "Increase sub-level by 1"
              }
            />
          </div>

          {/* Tonal Summary Well (0 Border) */}
          <div className={cn(CALC_MD3.tonalGroup, "space-y-1.5")}>
            <div className="flex items-center justify-between gap-2 text-xs sm:text-sm font-sans">
              <span className="inline-flex items-center gap-1.5 font-medium text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5 text-amber-500" aria-hidden="true" />
                {locale === "vi"
                  ? "Buff Sở Hữu Toàn Quân:"
                  : "Owned All-Soldier Buff:"}
              </span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                +{stats.ownedAtkPct}% ATK • +{stats.ownedHpPct}% HP
              </span>
            </div>

            <div className="flex items-center justify-between gap-2 text-xs sm:text-sm font-sans">
              <span className="font-medium text-muted-foreground">
                {locale === "vi"
                  ? "Buff Khi Đeo Đạo Chính:"
                  : "Equipped Queue Buff:"}
              </span>
              <span className="font-mono font-bold text-foreground">
                +{stats.equippedAtkPct}% ATK • +{stats.equippedHpPct}% HP
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

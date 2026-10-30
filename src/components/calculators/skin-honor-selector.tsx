"use client";

import React from "react";
import { Award, Sparkles } from "lucide-react";
import {
  SKIN_HONOR_LEVEL_PRESETS,
  SKIN_HONOR_MAX_LEVEL,
  SKIN_HONOR_MIN_LEVEL,
  SKIN_HONOR_TOTAL_COPIES_TO_MAX,
  clampSkinHonorLevel,
} from "@/content/calculators/skin-honor-data";
import {
  TROOP_SKIN_RARITIES,
  getCumulativeMedalsAtPoint,
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

export interface SkinHonorSelectorProps {
  readonly idPrefix: "from" | "to";
  readonly title: string;
  readonly rarity: TroopSkinRarity;
  readonly honorLevel: number;
  readonly locale: CalculatorLocale;
  readonly onChangeHonorLevel: (nextHonorLevel: number) => void;
}

export function SkinHonorSelector({
  idPrefix,
  title,
  rarity,
  honorLevel,
  locale,
  onChangeHonorLevel,
}: SkinHonorSelectorProps) {
  const clamped = clampSkinHonorLevel(honorLevel);
  const rarityMeta = TROOP_SKIN_RARITIES[rarity];
  const honorCumulativeMedals = clamped * rarityMeta.honorMedalsPerLevel;
  const lv50BaseMedals = getCumulativeMedalsAtPoint(
    { level: 50, sublevel: 0 },
    rarity
  );
  const totalWithLv50Medals = lv50BaseMedals + honorCumulativeMedals;

  const tier1Steps = Math.floor(Math.min(clamped, 100) / 5);
  const tier2Steps = Math.floor(Math.max(0, clamped - 100) / 5);
  const equivalentCopies = tier1Steps * 1 + tier2Steps * 2;

  const medalUnit = locale === "vi" ? "Huy Chương" : "Medals";
  const copyUnit = locale === "vi" ? "Phôi" : "Copies";

  return (
    <div
      data-testid={`${idPrefix}-skin-honor-selector`}
      className={cn(CALC_MD3.surfaceCard, "space-y-3")}
    >
      {/* Header + Cumulative Summary Badges */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-2.5">
        <div className="flex min-w-0 items-center gap-2">
          <Award className="h-5 w-5 shrink-0 text-amber-500" aria-hidden="true" />
          <h3
            data-testid={`${idPrefix}-skin-honor-title`}
            className={CALC_MD3.sectionTitle}
          >
            {title}
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span
            data-testid={`${idPrefix}-honor-medals-badge`}
            title={formatExactNumber(honorCumulativeMedals)}
            className="shrink-0 rounded-lg bg-amber-500/15 px-2.5 py-1 text-xs font-sans font-bold text-amber-700 dark:text-amber-300"
          >
            <span className="font-mono">
              {formatCompactNumber(honorCumulativeMedals)}
            </span>{" "}
            {medalUnit}
          </span>

          <span
            data-testid={`${idPrefix}-honor-copies-badge`}
            className="shrink-0 rounded-lg bg-sky-500/15 px-2.5 py-1 text-xs font-sans font-bold text-sky-700 dark:text-sky-300"
          >
            <span className="font-mono">
              {equivalentCopies}/{SKIN_HONOR_TOTAL_COPIES_TO_MAX}
            </span>{" "}
            {copyUnit}
          </span>
        </div>
      </div>

      {/* Hairline Divided List (Single-Layer Containment <= 1 border) */}
      <ul
        data-testid={`${idPrefix}-skin-honor-list`}
        className={CALC_MD3.dividedList}
      >
        {/* Row 1: Honor Level Controls (0 -> 150) */}
        <li
          data-testid={`${idPrefix}-honor-level-row`}
          className="space-y-2.5 px-0 py-3"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2">
              <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500 font-mono text-xs font-black text-slate-950">
                1
              </span>
              <span className="text-sm font-heading font-bold text-foreground">
                {locale === "vi"
                  ? "Cấp Vinh Dự (Honor Lv.0–150)"
                  : "Honor Level (Lv.0–150)"}
              </span>
            </div>

            <span
              data-testid={`${idPrefix}-honor-level-badge`}
              className="rounded-md bg-secondary px-2.5 py-0.5 font-mono text-sm font-black text-foreground"
            >
              Lv.{clamped}/{SKIN_HONOR_MAX_LEVEL}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm font-sans text-muted-foreground">
            <span>
              {clamped <= 100
                ? locale === "vi"
                  ? "Bậc 1 (Lv.0–100): 1 Phôi = +5 Cấp Vinh Dự"
                  : "Tier 1 (Lv.0–100): 1 Copy = +5 Honor Levels"
                : locale === "vi"
                  ? "Bậc 2 (Lv.101–150): 2 Phôi = +5 Cấp Vinh Dự"
                  : "Tier 2 (Lv.101–150): 2 Copies = +5 Honor Levels"}
            </span>
            <span className="font-semibold text-amber-700 dark:text-amber-300">
              <span className="font-mono">
                {formatCompactNumber(rarityMeta.honorMedalsPerLevel)}
              </span>{" "}
              {locale === "vi" ? "Huy Chương/cấp" : "Medals/lv"}
            </span>
          </div>

          {/* Quick-Pick Presets (0, 25, 50, 75, 100, 125, 150) */}
          <div className="flex flex-wrap items-center gap-1.5">
            {SKIN_HONOR_LEVEL_PRESETS.map((presetLv) => {
              const isSelected = clamped === presetLv;
              return (
                <button
                  key={presetLv}
                  type="button"
                  data-testid={`${idPrefix}-honor-preset-${presetLv}-btn`}
                  onClick={() => onChangeHonorLevel(presetLv)}
                  className={cn(
                    CALC_MD3.chipButton,
                    "px-2.5 font-mono text-xs sm:text-sm",
                    isSelected
                      ? "bg-amber-500 text-slate-950 font-black"
                      : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  Lv.{presetLv}
                </button>
              );
            })}
          </div>

          {/* Stepper [-]/[+] + Number Input */}
          <div className="flex items-center gap-2">
            <CalculatorStepperButton
              direction="decrease"
              testId={`${idPrefix}-honor-level-minus-btn`}
              disabled={clamped <= SKIN_HONOR_MIN_LEVEL}
              onClick={() => onChangeHonorLevel(clampSkinHonorLevel(clamped - 1))}
              ariaLabel={
                locale === "vi"
                  ? "Giảm 1 cấp Vinh Dự"
                  : "Decrease Honor level by 1"
              }
            />

            <Input
              type="number"
              min={SKIN_HONOR_MIN_LEVEL}
              max={SKIN_HONOR_MAX_LEVEL}
              data-testid={`${idPrefix}-honor-level-input`}
              aria-label={
                locale === "vi"
                  ? "Nhập cấp Vinh Dự Quân Trang"
                  : "Enter Skin Honor level"
              }
              value={clamped}
              onChange={(e) => {
                const parsed = Number.parseInt(e.target.value, 10);
                if (!Number.isNaN(parsed)) {
                  onChangeHonorLevel(clampSkinHonorLevel(parsed));
                }
              }}
              className={cn(CALC_MD3.dataInput, "text-center")}
            />

            <CalculatorStepperButton
              direction="increase"
              testId={`${idPrefix}-honor-level-plus-btn`}
              disabled={clamped >= SKIN_HONOR_MAX_LEVEL}
              onClick={() => onChangeHonorLevel(clampSkinHonorLevel(clamped + 1))}
              ariaLabel={
                locale === "vi"
                  ? "Tăng 1 cấp Vinh Dự"
                  : "Increase Honor level by 1"
              }
            />
          </div>

          {/* Tonal Summary Well (0 Border) */}
          <div className={cn(CALC_MD3.tonalGroup, "space-y-1.5")}>
            <div className="flex items-center justify-between gap-2 text-xs sm:text-sm font-sans">
              <span className="inline-flex items-center gap-1.5 font-medium text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5 text-amber-500" aria-hidden="true" />
                {locale === "vi"
                  ? "Tích lũy riêng Vinh Dự:"
                  : "Honor-only cumulative:"}
              </span>
              <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                {formatCompactNumber(honorCumulativeMedals)} (
                {formatExactNumber(honorCumulativeMedals)})
              </span>
            </div>

            <div className="flex items-center justify-between gap-2 text-xs sm:text-sm font-sans">
              <span className="font-medium text-muted-foreground">
                {locale === "vi"
                  ? "Tổng gộp từ Lv.1 + Vinh Dự:"
                  : "Total from Lv.1 + Honor:"}
              </span>
              <span className="font-mono font-bold text-foreground">
                {formatCompactNumber(totalWithLv50Medals)} (
                {formatExactNumber(totalWithLv50Medals)})
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

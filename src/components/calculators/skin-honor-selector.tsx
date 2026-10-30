"use client";

import React from "react";
import { Award, Sparkles, Star } from "lucide-react";
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
  readonly warningBanner?: React.ReactNode;
}

export function SkinHonorSelector({
  idPrefix,
  title,
  rarity,
  honorLevel,
  locale,
  onChangeHonorLevel,
  warningBanner,
}: SkinHonorSelectorProps): React.JSX.Element {
  const isVi = locale === "vi";
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
  const isMaxHonor = clamped >= SKIN_HONOR_MAX_LEVEL;

  const medalUnit = isVi ? "Huy Chương" : "Medals";
  const copyUnit = isVi ? "Phôi" : "Copies";

  return (
    <section
      data-testid={`${idPrefix}-skin-honor-selector`}
      className={cn(
        CALC_MD3.surfaceCard,
        "flex h-full flex-col justify-between space-y-3.5"
      )}
    >
      <div className="space-y-3.5">
        {/* Header + Cumulative Summary Badges (No-Line MD3) */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <Award
              className="h-5 w-5 shrink-0 text-amber-500"
              aria-hidden="true"
            />
            <h2
              data-testid={`${idPrefix}-skin-honor-title`}
              className={CALC_MD3.sectionTitle}
            >
              {title}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <span
              data-testid={`${idPrefix}-honor-medals-badge`}
              title={formatExactNumber(honorCumulativeMedals)}
              className="shrink-0 rounded-lg bg-amber-500/15 px-2.5 py-1 text-xs font-sans font-bold text-amber-700 dark:text-amber-300"
            >
              <span className="font-mono tabular-nums">
                {formatCompactNumber(honorCumulativeMedals)}
              </span>{" "}
              <span>{medalUnit}</span>
            </span>

            <span
              data-testid={`${idPrefix}-honor-copies-badge`}
              className="shrink-0 rounded-lg bg-sky-500/15 px-2.5 py-1 text-xs font-sans font-bold text-sky-700 dark:text-sky-300"
            >
              <span className="font-mono tabular-nums">
                {equivalentCopies}/{SKIN_HONOR_TOTAL_COPIES_TO_MAX}
              </span>{" "}
              <span>{copyUnit}</span>
            </span>
          </div>
        </div>

        {/* Tonal Group 1: Honor Level Controls (Lv.0 -> Lv.150), Quick Chips, Range Slider & Steppers */}
        <div
          data-testid={`${idPrefix}-honor-level-row`}
          className={cn(
            CALC_MD3.tonalGroup,
            "space-y-3 transition-colors",
            isMaxHonor ? "ring-1 ring-rose-500/40 bg-rose-500/5" : ""
          )}
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-sm font-heading font-bold text-foreground">
              {isVi
                ? "Cấp Vinh Dự (Honor Lv.0–150)"
                : "Honor Level (Lv.0–150)"}
            </span>

            <span
              data-testid={`${idPrefix}-honor-level-badge`}
              className={cn(
                "rounded-lg px-2.5 py-0.5 font-mono text-sm font-black tabular-nums",
                isMaxHonor
                  ? "bg-rose-500/15 text-rose-700 dark:text-rose-300"
                  : "bg-background/80 text-amber-700 dark:text-amber-300"
              )}
            >
              Lv.{clamped}/{SKIN_HONOR_MAX_LEVEL}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-sans text-muted-foreground">
            <span>
              {clamped <= 100
                ? isVi
                  ? "Bậc 1 (Lv.0–100): 1 Phôi = +5 Cấp Vinh Dự"
                  : "Tier 1 (Lv.0–100): 1 Copy = +5 Honor Levels"
                : isVi
                  ? "Bậc 2 (Lv.101–150): 2 Phôi = +5 Cấp Vinh Dự"
                  : "Tier 2 (Lv.101–150): 2 Copies = +5 Honor Levels"}
            </span>
            <span className="font-semibold text-amber-700 dark:text-amber-300">
              <span className="font-mono tabular-nums">
                {formatCompactNumber(rarityMeta.honorMedalsPerLevel)}
              </span>{" "}
              <span>{isVi ? "Huy Chương/cấp" : "Medals/lv"}</span>
            </span>
          </div>

          {/* 7 Quick-Pick Milestone Chips (0, 25, 50, 75, 100, 125, 150) */}
          <div className="flex flex-wrap items-center gap-1.5">
            {SKIN_HONOR_LEVEL_PRESETS.map((presetLv) => {
              const isSelected = clamped === presetLv;
              const isPeak = presetLv === SKIN_HONOR_MAX_LEVEL;
              return (
                <button
                  key={presetLv}
                  type="button"
                  data-testid={`${idPrefix}-honor-preset-${presetLv}-btn`}
                  aria-pressed={isSelected}
                  onClick={() => onChangeHonorLevel(presetLv)}
                  className={cn(
                    CALC_MD3.chipButton,
                    "px-2.5 font-mono text-xs tabular-nums",
                    isSelected
                      ? isPeak
                        ? "bg-rose-600 text-white font-black shadow-sm"
                        : "bg-amber-500 text-slate-950 font-black shadow-sm"
                      : "bg-background/70 text-muted-foreground hover:bg-background hover:text-foreground"
                  )}
                >
                  <span>Lv.{presetLv}</span>
                  {isPeak ? (
                    <Star
                      className="h-3.5 w-3.5 fill-current"
                      aria-hidden="true"
                    />
                  ) : null}
                </button>
              );
            })}
          </div>

          {/* Range Slider (0..150) */}
          <div className="space-y-1">
            <input
              type="range"
              data-testid={`${idPrefix}-honor-level-slider`}
              min={SKIN_HONOR_MIN_LEVEL}
              max={SKIN_HONOR_MAX_LEVEL}
              step={1}
              value={clamped}
              aria-label={
                isVi ? `Thanh kéo ${title}` : `${title} level slider`
              }
              onChange={(e) => {
                const parsed = Number.parseInt(e.target.value, 10);
                if (!Number.isNaN(parsed)) {
                  onChangeHonorLevel(clampSkinHonorLevel(parsed));
                }
              }}
              className={cn(
                "h-2.5 w-full cursor-pointer appearance-none rounded-lg bg-background/80",
                isMaxHonor ? "accent-rose-500" : "accent-amber-500"
              )}
            />
            <div className="flex justify-between font-mono text-xs text-muted-foreground tabular-nums">
              <span>Lv.0</span>
              <span>Lv.50</span>
              <span>Lv.100</span>
              <span className="font-bold text-rose-600 dark:text-rose-400">
                Lv.150
              </span>
            </div>
          </div>

          {/* Stepper [-]/[+] + Number Input */}
          <div className="flex items-center gap-2">
            <CalculatorStepperButton
              direction="decrease"
              testId={`${idPrefix}-honor-level-minus-btn`}
              disabled={clamped <= SKIN_HONOR_MIN_LEVEL}
              onClick={() => onChangeHonorLevel(clampSkinHonorLevel(clamped - 1))}
              ariaLabel={
                isVi
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
                isVi
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
              className={cn(
                CALC_MD3.dataInput,
                "bg-background/80 text-center tabular-nums"
              )}
            />

            <CalculatorStepperButton
              direction="increase"
              testId={`${idPrefix}-honor-level-plus-btn`}
              disabled={clamped >= SKIN_HONOR_MAX_LEVEL}
              onClick={() => onChangeHonorLevel(clampSkinHonorLevel(clamped + 1))}
              ariaLabel={
                isVi
                  ? "Tăng 1 cấp Vinh Dự"
                  : "Increase Honor level by 1"
              }
            />
          </div>
        </div>
      </div>

      {/* Bottom Tonal Group 2: Honor Cumulative & Total from Lv.1 + Optional Warning */}
      <div className="space-y-2.5">
        <div className={cn(CALC_MD3.tonalGroup, "space-y-1.5")}>
          <div className="flex items-center justify-between gap-2 text-xs font-sans">
            <span className="inline-flex items-center gap-1.5 font-medium text-muted-foreground">
              <Sparkles
                className="h-3.5 w-3.5 text-amber-500"
                aria-hidden="true"
              />
              <span>
                {isVi
                  ? "Tích lũy riêng Vinh Dự:"
                  : "Honor-only cumulative:"}
              </span>
            </span>
            <span className="font-mono font-bold text-amber-600 tabular-nums dark:text-amber-400">
              {formatCompactNumber(honorCumulativeMedals)} (
              {formatExactNumber(honorCumulativeMedals)})
            </span>
          </div>

          <div className="flex items-center justify-between gap-2 text-xs font-sans">
            <span className="font-medium text-muted-foreground">
              {isVi
                ? "Tổng gộp từ Lv.1 + Vinh Dự:"
                : "Total from Lv.1 + Honor:"}
            </span>
            <span className="font-mono font-bold text-foreground tabular-nums">
              {formatCompactNumber(totalWithLv50Medals)} (
              {formatExactNumber(totalWithLv50Medals)})
            </span>
          </div>
        </div>

        {warningBanner}
      </div>
    </section>
  );
}

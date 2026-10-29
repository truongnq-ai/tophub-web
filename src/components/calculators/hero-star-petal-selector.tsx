"use client";

import React from "react";
import {
  formatStarPositionSummary,
  petalIndexToState,
} from "@/content/calculators/hero-stars-data";
import type { CalculatorLocale } from "@/content/calculators/types";
import { cn } from "@/lib/utils";
import { CALC_MD3, CalculatorStepperButton } from "./calculator-md3-primitives";

interface HeroStarPetalSelectorProps {
  readonly idPrefix: "from" | "to";
  readonly title: string;
  readonly petalIndex: number;
  readonly costPerPetal: number;
  readonly cumulativeShards: number;
  readonly locale: CalculatorLocale;
  readonly onChangePetalIndex: (nextIndex: number) => void;
}

/**
 * Tiến độ tăng trưởng 5 cánh sao NGƯỢC CHIỀU KIM ĐỒNG HỒ bắt đầu từ ĐỈNH 12 GIỜ (0°):
 * - Cánh 1: 0°   (Đỉnh 12 giờ — Top)
 * - Cánh 2: 288° (Góc 10 giờ — Top-Left)
 * - Cánh 3: 216° (Góc 8 giờ  — Bottom-Left)
 * - Cánh 4: 144° (Góc 4 giờ  — Bottom-Right)
 * - Cánh 5: 72°  (Góc 2 giờ  — Top-Right, khép kín ngôi sao)
 */
export const COUNTER_CLOCKWISE_PETAL_ANGLES = [0, 288, 216, 144, 72] as const;

type StarTierKey = "gold" | "red" | "silver";

interface StarTierRowDef {
  readonly key: StarTierKey;
  readonly stars: readonly number[];
  readonly label: Record<CalculatorLocale, string>;
  readonly tierName: Record<CalculatorLocale, string>;
  readonly labelClassName: string;
  readonly litStroke: string;
}

/** MASTER.md §3.2 — 3 hàng bậc × 5 sao trên mobile (Vàng / Đỏ / Bạc). */
const STAR_TIER_ROWS: readonly StarTierRowDef[] = [
  {
    key: "gold",
    stars: [1, 2, 3, 4, 5],
    label: { vi: "1–5★ Vàng", en: "1–5★ Gold" },
    tierName: { vi: "Vàng", en: "Gold" },
    labelClassName: "text-amber-700 dark:text-amber-400",
    litStroke: "#D97706",
  },
  {
    key: "red",
    stars: [6, 7, 8, 9, 10],
    label: { vi: "6–10★ Đỏ", en: "6–10★ Red" },
    tierName: { vi: "Đỏ", en: "Red" },
    labelClassName: "text-rose-700 dark:text-rose-400",
    litStroke: "#B91C1C",
  },
  {
    key: "silver",
    stars: [11, 12, 13, 14, 15],
    label: { vi: "11–15★ Bạc", en: "11–15★ Silver" },
    tierName: { vi: "Bạc", en: "Silver" },
    labelClassName: "text-slate-700 dark:text-slate-300",
    litStroke: "#64748B",
  },
];

const UNLIT_PETAL_FILL = "rgba(148, 163, 184, 0.18)";
const UNLIT_PETAL_STROKE = "rgba(148, 163, 184, 0.45)";

export function HeroStarPetalSelector({
  idPrefix,
  title,
  petalIndex,
  costPerPetal,
  cumulativeShards,
  locale,
  onChangePetalIndex,
}: HeroStarPetalSelectorProps) {
  const state = petalIndexToState(petalIndex);

  const isTierCompleteFiveStars =
    state.starsInTier === 5 && state.petalsInNextStar === 0 && petalIndex > 0;

  const activeStarTier =
    isTierCompleteFiveStars && state.tier !== "none"
      ? state.tier
      : state.nextStarColorTier;

  const summaryStyle =
    activeStarTier === "gold"
      ? { surface: "bg-amber-500/10", accent: "text-amber-700 dark:text-amber-400" }
      : activeStarTier === "red"
        ? { surface: "bg-rose-500/10", accent: "text-rose-700 dark:text-rose-400" }
        : {
            surface: "bg-slate-400/15 dark:bg-slate-400/10",
            accent: "text-slate-700 dark:text-slate-200",
          };

  const shardUnit = locale === "vi" ? "mảnh" : "shards";

  const handleStarClick = (overallStar: number) => {
    const starEndPetal = overallStar * 5;
    onChangePetalIndex(
      petalIndex === starEndPetal && overallStar === 1 ? 0 : starEndPetal
    );
  };

  return (
    <div
      data-testid={`${idPrefix}-star-selector-card`}
      className={cn(CALC_MD3.surfaceCard, "space-y-3")}
    >
      {/* Shared SVG Gradients for 15 Five-Petal Stars (Gold / Red / Platinum Silver) */}
      <svg className="sr-only" aria-hidden="true" width="0" height="0">
        <defs>
          <linearGradient id={`${idPrefix}-gold-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="55%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <linearGradient id={`${idPrefix}-red-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FCA5A5" />
            <stop offset="50%" stopColor="#EF4444" />
            <stop offset="100%" stopColor="#B91C1C" />
          </linearGradient>
          <linearGradient id={`${idPrefix}-silver-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="55%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>
        </defs>
      </svg>

      {/* 1. Header: Title + 0★ Reset + Cumulative Shards */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className={CALC_MD3.sectionTitle}>{title}</h3>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            data-testid={`${idPrefix}-milestone-star-0`}
            onClick={() => onChangePetalIndex(0)}
            aria-label={locale === "vi" ? "Đặt về 0 sao" : "Reset to 0 stars"}
            className={cn(
              CALC_MD3.chipButton,
              "min-w-[44px] px-2.5 font-mono",
              petalIndex === 0
                ? "bg-amber-500 text-slate-950"
                : "bg-muted/60 text-muted-foreground hover:text-foreground"
            )}
          >
            0★
          </button>
          <span
            data-testid={`${idPrefix}-cumulative-shards`}
            className="rounded-lg bg-muted/60 px-2.5 py-1 text-xs font-sans font-semibold text-foreground"
          >
            <span className="font-mono">{cumulativeShards.toLocaleString()}</span>{" "}
            {shardUnit}
          </span>
        </div>
      </div>

      {/* 2. Current Star + Petal Summary Strip (tonal, không viền) */}
      <div
        data-testid={`${idPrefix}-star-summary`}
        className={cn(
          "flex items-center justify-between gap-2 rounded-xl px-3 py-2",
          summaryStyle.surface
        )}
      >
        <span className="truncate text-sm font-sans font-semibold text-foreground">
          {formatStarPositionSummary(state, locale)}
        </span>
        <span
          className={cn(
            "shrink-0 font-mono text-xs sm:text-sm font-bold",
            summaryStyle.accent
          )}
        >
          {state.petalIndex}/75 (+{costPerPetal})
        </span>
      </div>

      {/* 3. 15 Five-Petal Stars: Mobile 3 hàng × 5 sao | sm+ 3 nhóm cạnh nhau = 15 sao 1 hàng */}
      <div
        data-testid={`${idPrefix}-star-tier-grid`}
        className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-3"
      >
        {STAR_TIER_ROWS.map((row) => (
          <div
            key={row.key}
            role="group"
            aria-label={row.label[locale]}
            data-testid={`${idPrefix}-star-tier-row-${row.key}`}
            className="space-y-1"
          >
            <div className={cn("text-xs font-sans font-bold", row.labelClassName)}>
              {row.label[locale]}
            </div>
            <div className="grid grid-cols-5 gap-1.5 sm:gap-1">
              {row.stars.map((overallStar) => {
                const starStartPetal = (overallStar - 1) * 5;
                const litPetalsInThisStar = Math.max(
                  0,
                  Math.min(5, petalIndex - starStartPetal)
                );
                const starInTier = overallStar - (row.stars[0] - 1);
                const starTitle = `${starInTier}★ ${row.tierName[locale]} (${litPetalsInThisStar}/5)`;
                const litFill = `url(#${idPrefix}-${row.key}-grad)`;

                return (
                  <button
                    key={overallStar}
                    type="button"
                    data-testid={`${idPrefix}-milestone-star-${overallStar}`}
                    data-lit-petals={litPetalsInThisStar}
                    onClick={() => handleStarClick(overallStar)}
                    title={starTitle}
                    aria-label={starTitle}
                    className={cn(
                      "group flex min-h-[48px] min-w-0 flex-col items-center justify-center gap-0.5 rounded-xl transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40",
                      litPetalsInThisStar > 0
                        ? "bg-muted/60 dark:bg-muted/35"
                        : "bg-transparent hover:bg-muted/50"
                    )}
                  >
                    {/* 5-Petal SVG Star (Petal 1 at 12h Top 0° -> Counter-Clockwise) */}
                    <svg
                      viewBox="0 0 100 100"
                      aria-hidden="true"
                      className="h-6 w-6 overflow-visible transition-transform group-hover:scale-110"
                    >
                      {COUNTER_CLOCKWISE_PETAL_ANGLES.map((angle, idx) => {
                        const petalNum = idx + 1;
                        const isPetalLit = litPetalsInThisStar >= petalNum;
                        return (
                          <polygon
                            key={petalNum}
                            transform={`rotate(${angle} 50 50)`}
                            points="50,6 62,35 50,50 38,35"
                            fill={isPetalLit ? litFill : UNLIT_PETAL_FILL}
                            stroke={isPetalLit ? row.litStroke : UNLIT_PETAL_STROKE}
                            strokeWidth="3.5"
                            strokeLinejoin="round"
                          />
                        );
                      })}
                    </svg>
                    <span
                      className={cn(
                        "font-mono text-xs font-bold leading-none",
                        litPetalsInThisStar === 5
                          ? "text-foreground"
                          : litPetalsInThisStar > 0
                            ? "font-black text-amber-600 dark:text-amber-400"
                            : "text-muted-foreground"
                      )}
                    >
                      {starInTier}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* 4. Slider Row with 44px [-] / [+] at both ends */}
      <div className="flex items-center gap-2">
        <CalculatorStepperButton
          direction="decrease"
          testId={`${idPrefix}-petal-minus-btn`}
          disabled={petalIndex <= 0}
          onClick={() => onChangePetalIndex(Math.max(0, petalIndex - 1))}
          ariaLabel={locale === "vi" ? "Lùi 1 cánh sao" : "Decrease 1 petal"}
          title={locale === "vi" ? "Lùi 1 cánh sao (-1)" : "Decrease 1 petal (-1)"}
        />
        <input
          type="range"
          min={0}
          max={75}
          step={1}
          data-testid={`${idPrefix}-star-slider`}
          value={petalIndex}
          onChange={(e) => onChangePetalIndex(Number(e.target.value))}
          aria-label={
            locale === "vi" ? "Thanh trượt chọn 75 cánh sao" : "75-petal star slider"
          }
          className="h-11 min-w-0 flex-1 cursor-pointer accent-amber-500"
        />
        <CalculatorStepperButton
          direction="increase"
          testId={`${idPrefix}-petal-plus-btn`}
          disabled={petalIndex >= 75}
          onClick={() => onChangePetalIndex(Math.min(75, petalIndex + 1))}
          ariaLabel={locale === "vi" ? "Tiến 1 cánh sao" : "Increase 1 petal"}
          title={locale === "vi" ? "Tiến 1 cánh sao (+1)" : "Increase 1 petal (+1)"}
        />
      </div>
    </div>
  );
}

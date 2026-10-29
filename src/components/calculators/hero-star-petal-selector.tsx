"use client";

import React from "react";
import { Minus, Plus } from "lucide-react";
import {
  formatStarPositionSummary,
  petalIndexToState,
} from "@/content/calculators/hero-stars-data";
import type { CalculatorLocale } from "@/content/calculators/types";
import { cn } from "@/lib/utils";

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

const FIFTEEN_STARS = Array.from({ length: 15 }, (_, i) => i + 1);

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
      ? {
          border: "border-amber-500/35 bg-amber-500/[0.08]",
          accent: "text-amber-600 dark:text-amber-400",
        }
      : activeStarTier === "red"
        ? {
            border: "border-rose-500/35 bg-rose-500/[0.08]",
            accent: "text-rose-600 dark:text-rose-400",
          }
        : {
            border:
              "border-slate-400/50 bg-slate-200/40 dark:bg-slate-400/10",
            accent: "text-slate-700 dark:text-slate-200",
          };

  return (
    <div
      data-testid={`${idPrefix}-star-selector-card`}
      className="rounded-2xl border border-border/80 bg-card/80 p-3.5 sm:p-4 space-y-2.5 shadow-sm"
    >
      {/* Shared SVG Gradients for 15 Five-Petal Stars (Gold / Red / Platinum Silver) */}
      <svg className="sr-only" aria-hidden="true" width="0" height="0">
        <defs>
          <linearGradient
            id={`${idPrefix}-gold-grad`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="55%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <linearGradient
            id={`${idPrefix}-red-grad`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#FCA5A5" />
            <stop offset="50%" stopColor="#EF4444" />
            <stop offset="100%" stopColor="#B91C1C" />
          </linearGradient>
          <linearGradient
            id={`${idPrefix}-silver-grad`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="55%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>
        </defs>
      </svg>

      {/* 1. Compact Header + 0★ Reset + Cumulative Shards */}
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-sm sm:text-base font-heading font-black text-foreground truncate">
            {title}
          </h3>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            data-testid={`${idPrefix}-milestone-star-0`}
            onClick={() => onChangePetalIndex(0)}
            className={cn(
              "rounded-lg border px-2 py-1 text-[10px] font-mono font-bold transition-colors cursor-pointer",
              petalIndex === 0
                ? "border-amber-500 bg-amber-500 text-slate-950"
                : "border-border/70 bg-background/70 text-muted-foreground hover:text-foreground"
            )}
          >
            0★
          </button>
          <span className="rounded-lg bg-secondary/90 border border-border px-2 py-1 font-mono text-[10px] font-bold text-foreground">
            {cumulativeShards.toLocaleString()}{" "}
            {locale === "vi" ? "mảnh" : "shards"}
          </span>
        </div>
      </div>

      {/* 2. Current Star + Petal Summary Strip */}
      <div
        data-testid={`${idPrefix}-star-summary`}
        className={cn(
          "rounded-xl border px-3 py-1.5 flex items-center justify-between gap-2",
          summaryStyle.border
        )}
      >
        <span className="text-xs font-heading font-bold text-foreground truncate">
          {formatStarPositionSummary(state, locale)}
        </span>
        <span
          className={cn(
            "font-mono text-[11px] font-extrabold shrink-0",
            summaryStyle.accent
          )}
        >
          {state.petalIndex}/75 (+{costPerPetal})
        </span>
      </div>

      {/* 3. Unified 15 Five-Petal Stars Bar + Slider with [-]/[+] Buttons at Both Ends */}
      <div className="space-y-2 rounded-xl border border-border/70 bg-background/70 p-2.5">
        <div className="flex items-center justify-between text-[10px] font-mono px-0.5">
          <span className="text-amber-500 font-bold">
            {locale === "vi" ? "1–5★ Vàng" : "1–5★ Gold"}
          </span>
          <span className="text-rose-500 font-bold">
            {locale === "vi" ? "6–10★ Đỏ" : "6–10★ Red"}
          </span>
          <span className="text-slate-600 dark:text-slate-300 font-bold">
            {locale === "vi" ? "11–15★ Bạc" : "11–15★ Silver"}
          </span>
        </div>

        {/* 15 Integrated 5-Petal SVG Stars Row (No sub-dashes needed!) */}
        <div className="grid grid-cols-[repeat(15,minmax(0,1fr))] gap-[1px] sm:gap-0.5 items-center">
          {FIFTEEN_STARS.map((overallStar) => {
            const starStartPetal = (overallStar - 1) * 5;
            const starEndPetal = overallStar * 5;
            const litPetalsInThisStar = Math.max(
              0,
              Math.min(5, petalIndex - starStartPetal)
            );
            const starTier =
              overallStar <= 5 ? "gold" : overallStar <= 10 ? "red" : "silver";
            const starInTier =
              overallStar <= 5
                ? overallStar
                : overallStar <= 10
                  ? overallStar - 5
                  : overallStar - 10;

            const petalPalette =
              starTier === "gold"
                ? {
                    litFill: `url(#${idPrefix}-gold-grad)`,
                    litStroke: "#D97706",
                  }
                : starTier === "red"
                  ? {
                      litFill: `url(#${idPrefix}-red-grad)`,
                      litStroke: "#B91C1C",
                    }
                  : {
                      litFill: `url(#${idPrefix}-silver-grad)`,
                      litStroke: "#64748B",
                    };

            return (
              <button
                key={overallStar}
                type="button"
                data-testid={`${idPrefix}-milestone-star-${overallStar}`}
                data-lit-petals={litPetalsInThisStar}
                onClick={() =>
                  onChangePetalIndex(
                    petalIndex === starEndPetal && overallStar === 1
                      ? 0
                      : starEndPetal
                  )
                }
                title={`${starInTier}★ ${
                  starTier === "gold"
                    ? locale === "vi"
                      ? "Vàng"
                      : "Gold"
                    : starTier === "red"
                      ? locale === "vi"
                        ? "Đỏ"
                        : "Red"
                      : locale === "vi"
                        ? "Bạc"
                        : "Silver"
                } (${litPetalsInThisStar}/5)`}
                className={cn(
                  "group flex flex-col items-center justify-center rounded-md py-1 transition-all cursor-pointer hover:bg-secondary/80 min-w-0",
                  litPetalsInThisStar > 0 && "bg-secondary/35",
                  (overallStar === 5 || overallStar === 10) &&
                    "pr-[2px] border-r border-border/60"
                )}
              >
                {/* Mini 5-Petal SVG Star (Petal 1 at 12h Top 0° -> Counter-Clockwise) */}
                <svg
                  viewBox="0 0 100 100"
                  className="w-4 h-4 sm:w-5 sm:h-5 overflow-visible transition-transform group-hover:scale-110"
                >
                  {COUNTER_CLOCKWISE_PETAL_ANGLES.map((angle, idx) => {
                    const petalNum = idx + 1;
                    const isPetalLit = litPetalsInThisStar >= petalNum;
                    return (
                      <polygon
                        key={petalNum}
                        transform={`rotate(${angle} 50 50)`}
                        points="50,6 62,35 50,50 38,35"
                        fill={
                          isPetalLit
                            ? petalPalette.litFill
                            : "rgba(148, 163, 184, 0.18)"
                        }
                        stroke={
                          isPetalLit
                            ? petalPalette.litStroke
                            : "rgba(148, 163, 184, 0.45)"
                        }
                        strokeWidth="3.5"
                        strokeLinejoin="round"
                      />
                    );
                  })}
                </svg>

                <span
                  className={cn(
                    "font-mono text-[8px] sm:text-[9px] font-bold leading-none mt-0.5",
                    litPetalsInThisStar === 5
                      ? "text-foreground"
                      : litPetalsInThisStar > 0
                        ? "text-amber-500 font-black"
                        : "text-muted-foreground/70"
                  )}
                >
                  {starInTier}
                </span>
              </button>
            );
          })}
        </div>

        {/* Slider Row with [-] at Left Start and [+] at Right End */}
        <div className="flex items-center gap-2 pt-0.5">
          <button
            type="button"
            data-testid={`${idPrefix}-petal-minus-btn`}
            disabled={petalIndex <= 0}
            onClick={() => onChangePetalIndex(Math.max(0, petalIndex - 1))}
            aria-label={locale === "vi" ? "Lùi 1 cánh sao" : "Decrease 1 petal"}
            title={
              locale === "vi" ? "Lùi 1 cánh sao (-1)" : "Decrease 1 petal (-1)"
            }
            className="inline-flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg border border-border/80 bg-secondary/70 hover:bg-secondary text-foreground disabled:opacity-35 cursor-pointer transition-colors shrink-0"
          >
            <Minus className="h-3.5 w-3.5 text-amber-500" />
          </button>

          <input
            type="range"
            min={0}
            max={75}
            step={1}
            data-testid={`${idPrefix}-star-slider`}
            value={petalIndex}
            onChange={(e) => onChangePetalIndex(Number(e.target.value))}
            aria-label={
              locale === "vi"
                ? "Thanh trượt chọn 75 cánh sao"
                : "75-petal star slider"
            }
            className="flex-1 h-2 accent-amber-500 cursor-pointer"
          />

          <button
            type="button"
            data-testid={`${idPrefix}-petal-plus-btn`}
            disabled={petalIndex >= 75}
            onClick={() => onChangePetalIndex(Math.min(75, petalIndex + 1))}
            aria-label={
              locale === "vi" ? "Tiến 1 cánh sao" : "Increase 1 petal"
            }
            title={
              locale === "vi" ? "Tiến 1 cánh sao (+1)" : "Increase 1 petal (+1)"
            }
            className="inline-flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg border border-amber-500/45 bg-amber-500/15 hover:bg-amber-500/25 text-amber-600 dark:text-amber-300 disabled:opacity-35 cursor-pointer transition-colors shrink-0"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

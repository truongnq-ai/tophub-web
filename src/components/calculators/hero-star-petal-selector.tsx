"use client";

import React from "react";
import { Star, Minus, Plus } from "lucide-react";
import {
  formatStarPositionSummary,
  petalIndexToState,
} from "@/content/calculators/hero-stars-data";
import type { CalculatorLocale } from "@/content/calculators/types";
import { cn } from "@/lib/utils";

interface HeroStarPetalSelectorProps {
  readonly idPrefix: "from" | "to";
  readonly title: string;
  readonly subtitle: string;
  readonly petalIndex: number;
  readonly costPerPetal: number;
  readonly cumulativeShards: number;
  readonly locale: CalculatorLocale;
  readonly onChangePetalIndex: (nextIndex: number) => void;
}

/**
 * Tiến độ tăng trưởng 5 cánh sao NGƯỢC CHIỀU KIM ĐỒNG HỒ (Counter-Clockwise) chuẩn trong game:
 * - Cánh 1: 288° (Góc 10 giờ — Top-Left)
 * - Cánh 2: 216° (Góc 8 giờ  — Bottom-Left)
 * - Cánh 3: 144° (Góc 4 giờ  — Bottom-Right)
 * - Cánh 4: 72°  (Góc 2 giờ  — Top-Right)
 * - Cánh 5: 0°   (Đỉnh 12 giờ — Top, hoàn tất ngôi sao)
 */
export const COUNTER_CLOCKWISE_PETAL_ANGLES = [288, 216, 144, 72, 0] as const;

const FIFTEEN_STARS = Array.from({ length: 15 }, (_, i) => i + 1);

export function HeroStarPetalSelector({
  idPrefix,
  title,
  subtitle,
  petalIndex,
  costPerPetal,
  cumulativeShards,
  locale,
  onChangePetalIndex,
}: HeroStarPetalSelectorProps) {
  const state = petalIndexToState(petalIndex);

  const isTierCompleteFiveStars =
    state.starsInTier === 5 && state.petalsInNextStar === 0 && petalIndex > 0;
  const displayedPetalsLit = isTierCompleteFiveStars
    ? 5
    : state.petalsInNextStar;

  const activeStarTier =
    isTierCompleteFiveStars && state.tier !== "none"
      ? state.tier
      : state.nextStarColorTier;

  // Bảng màu chuẩn game: Vàng (#F59E0B), Đỏ (#EF4444), Bạc Bạch Kim (#FFFFFF -> #E2E8F0 -> #94A3B8, viền #64748B)
  const wheelColors =
    activeStarTier === "gold"
      ? {
          litFill: `url(#${idPrefix}-gold-grad)`,
          litStroke: "#FDE047",
          labelFill: "#0F172A",
          summaryBorder: "border-amber-500/35 bg-amber-500/[0.08]",
          accentText: "text-amber-600 dark:text-amber-400",
        }
      : activeStarTier === "red"
        ? {
            litFill: `url(#${idPrefix}-red-grad)`,
            litStroke: "#FCA5A5",
            labelFill: "#FFFFFF",
            summaryBorder: "border-rose-500/35 bg-rose-500/[0.08]",
            accentText: "text-rose-600 dark:text-rose-400",
          }
        : {
            litFill: `url(#${idPrefix}-silver-grad)`,
            litStroke: "#64748B",
            labelFill: "#0F172A",
            summaryBorder:
              "border-slate-400/50 bg-slate-200/40 dark:bg-slate-400/10",
            accentText: "text-slate-700 dark:text-slate-200",
          };

  const handleClickPetalOnWheel = (petalNum: number) => {
    const baseCompletedStars =
      petalIndex === 75 && petalNum < 5 ? 14 : state.overallStarsCompleted;

    if (petalNum === 5) {
      const nextCompleted = Math.min(15, baseCompletedStars + 1);
      onChangePetalIndex(nextCompleted * 5);
      return;
    }

    onChangePetalIndex(Math.min(75, baseCompletedStars * 5 + petalNum));
  };

  return (
    <div
      data-testid={`${idPrefix}-star-selector-card`}
      className="rounded-2xl border border-border/80 bg-card/80 p-3.5 sm:p-4 space-y-3 shadow-sm"
    >
      {/* 1. Compact Header + Readout */}
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0">
          <div className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            {subtitle}
          </div>
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

      {/* Current Star + Petal Summary Strip */}
      <div
        data-testid={`${idPrefix}-star-summary`}
        className={cn(
          "rounded-xl border px-3 py-2 flex items-center justify-between gap-2",
          wheelColors.summaryBorder
        )}
      >
        <span className="text-xs font-heading font-bold text-foreground truncate">
          {formatStarPositionSummary(state, locale)}
        </span>
        <span
          className={cn(
            "font-mono text-[11px] font-extrabold shrink-0",
            wheelColors.accentText
          )}
        >
          {state.petalIndex}/75
        </span>
      </div>

      {/* 2. Unified 15-Milestone Star Track (5 Gold -> 5 Red -> 5 Platinum Silver), each star divided into 5 petal segments */}
      <div className="space-y-1.5 rounded-xl border border-border/70 bg-background/70 p-2.5">
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

        {/* 15 Star Milestones Row + 5 Sub-Segments per Star (Tailwind v3.4 arbitrary 15-col grid) */}
        <div className="grid grid-cols-[repeat(15,minmax(0,1fr))] gap-0.5 sm:gap-1">
          {FIFTEEN_STARS.map((overallStar) => {
            const starStartPetal = (overallStar - 1) * 5;
            const starEndPetal = overallStar * 5;
            const isStarCompleted = petalIndex >= starEndPetal;
            const isStarPartial =
              petalIndex > starStartPetal && petalIndex < starEndPetal;
            const starTier =
              overallStar <= 5 ? "gold" : overallStar <= 10 ? "red" : "silver";
            const starInTier =
              overallStar <= 5
                ? overallStar
                : overallStar <= 10
                  ? overallStar - 5
                  : overallStar - 10;

            const starIconClass = isStarCompleted
              ? starTier === "gold"
                ? "text-amber-400 fill-amber-400"
                : starTier === "red"
                  ? "text-rose-500 fill-rose-500"
                  : "text-slate-100 fill-slate-100 stroke-slate-600 dark:stroke-slate-300 drop-shadow-[0_1px_1px_rgba(15,23,42,0.45)]"
              : isStarPartial
                ? starTier === "gold"
                  ? "text-amber-500"
                  : starTier === "red"
                    ? "text-rose-500"
                    : "text-slate-500 dark:text-slate-200"
                : "text-muted-foreground/35";

            const activeSegmentBg =
              starTier === "gold"
                ? "bg-amber-400"
                : starTier === "red"
                  ? "bg-rose-500"
                  : "bg-gradient-to-b from-white via-slate-200 to-slate-400 border border-slate-400/80";

            return (
              <div
                key={overallStar}
                className={cn(
                  "flex flex-col items-center gap-1 min-w-0",
                  (overallStar === 5 || overallStar === 10) &&
                    "pr-0.5 border-r border-border/60"
                )}
              >
                {/* Clickable Star Milestone Button (1..15) */}
                <button
                  type="button"
                  data-testid={`${idPrefix}-milestone-star-${overallStar}`}
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
                  }`}
                  className={cn(
                    "w-full flex flex-col items-center justify-center rounded-md py-1 transition-all cursor-pointer hover:bg-secondary/80",
                    (isStarCompleted || isStarPartial) && "bg-secondary/40"
                  )}
                >
                  <Star
                    className={cn("h-3 w-3 sm:h-3.5 sm:w-3.5", starIconClass)}
                  />
                  <span className="font-mono text-[8px] sm:text-[9px] font-bold leading-none mt-0.5 text-muted-foreground">
                    {starInTier}
                  </span>
                </button>

                {/* 5 Micro-Segments (5 Cánh của Ngôi Sao này) */}
                <div className="grid grid-cols-5 gap-[1px] w-full h-2.5 rounded-sm overflow-hidden bg-secondary/70 p-[1px]">
                  {[1, 2, 3, 4, 5].map((petalStep) => {
                    const absPetal = starStartPetal + petalStep;
                    const isSegLit = petalIndex >= absPetal;
                    return (
                      <button
                        key={absPetal}
                        type="button"
                        data-testid={`${idPrefix}-segment-${absPetal}`}
                        onClick={() => onChangePetalIndex(absPetal)}
                        aria-label={
                          locale === "vi"
                            ? `Mốc cánh ${absPetal}/75`
                            : `Petal step ${absPetal}/75`
                        }
                        className={cn(
                          "h-full w-full transition-colors cursor-pointer",
                          isSegLit
                            ? activeSegmentBg
                            : "bg-muted-foreground/15 hover:bg-muted-foreground/35"
                        )}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Fast Scrubbing Range Slider (0..75 Petals) */}
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
              ? "Thanh trượt chọn nhanh 75 cánh sao"
              : "75-petal quick range slider"
          }
          className="w-full h-1.5 accent-amber-500 cursor-pointer mt-1"
        />
      </div>

      {/* 3. Compact Counter-Clockwise 5-Petal Star + [-1 Cánh / +1 Cánh] Controls */}
      <div className="rounded-xl border border-border/70 bg-background/60 p-2.5 flex items-center justify-between gap-2">
        <button
          type="button"
          data-testid={`${idPrefix}-petal-minus-btn`}
          disabled={petalIndex <= 0}
          onClick={() => onChangePetalIndex(Math.max(0, petalIndex - 1))}
          className="inline-flex items-center justify-center gap-1 rounded-xl border border-border/80 bg-secondary/60 hover:bg-secondary px-2.5 py-2 min-h-[42px] text-xs font-heading font-bold text-foreground disabled:opacity-40 cursor-pointer transition-colors shrink-0"
        >
          <Minus className="h-3.5 w-3.5 text-amber-500" />
          <span>{locale === "vi" ? "1 Cánh" : "1 Petal"}</span>
        </button>

        {/* Interactive Counter-Clockwise 5-Petal SVG Star (True 5-Pointed Star Geometry) */}
        <div className="flex flex-col items-center">
          <svg
            viewBox="0 0 200 200"
            className="w-24 h-24 sm:w-28 sm:h-28 select-none overflow-visible"
            role="group"
            aria-label={
              locale === "vi"
                ? "Ngôi sao 5 cánh ngược chiều kim đồng hồ"
                : "Counter-clockwise 5-petal star"
            }
          >
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

            {COUNTER_CLOCKWISE_PETAL_ANGLES.map((angle, idx) => {
              const petalNum = idx + 1;
              const isLit = displayedPetalsLit >= petalNum;
              return (
                <g
                  key={petalNum}
                  transform={`rotate(${angle} 100 100)`}
                  role="button"
                  tabIndex={0}
                  data-testid={`${idPrefix}-svg-petal-${petalNum}`}
                  aria-label={
                    locale === "vi"
                      ? `Cánh sao thứ ${petalNum} (ngược chiều kim đồng hồ)`
                      : `Star petal ${petalNum} (counter-clockwise)`
                  }
                  onClick={() => handleClickPetalOnWheel(petalNum)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleClickPetalOnWheel(petalNum);
                    }
                  }}
                  className="cursor-pointer transition-opacity hover:opacity-90"
                >
                  <polygon
                    points="100,12 122.3,69.3 100,100 77.7,69.3"
                    fill={
                      isLit
                        ? wheelColors.litFill
                        : "rgba(148, 163, 184, 0.16)"
                    }
                    stroke={
                      isLit
                        ? wheelColors.litStroke
                        : "rgba(148, 163, 184, 0.42)"
                    }
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />
                  <text
                    x="100"
                    y="56"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={isLit ? wheelColors.labelFill : "#94A3B8"}
                    className="font-mono text-[12px] font-black pointer-events-none"
                  >
                    {petalNum}
                  </text>
                </g>
              );
            })}

            <circle
              cx="100"
              cy="100"
              r="18"
              className="fill-card/95 stroke-border"
              strokeWidth="1.5"
            />
            <text
              x="100"
              y="103"
              textAnchor="middle"
              className="fill-foreground font-mono text-[10px] font-black pointer-events-none"
            >
              {displayedPetalsLit}/5
            </text>
          </svg>
          <span className="text-[10px] font-mono text-muted-foreground -mt-1">
            {locale === "vi"
              ? `↺ Ngược chiều (+${costPerPetal} mảnh/cánh)`
              : `↺ CCW (+${costPerPetal}/petal)`}
          </span>
        </div>

        <button
          type="button"
          data-testid={`${idPrefix}-petal-plus-btn`}
          disabled={petalIndex >= 75}
          onClick={() => onChangePetalIndex(Math.min(75, petalIndex + 1))}
          className="inline-flex items-center justify-center gap-1 rounded-xl border border-amber-500/40 bg-amber-500/15 hover:bg-amber-500/25 px-2.5 py-2 min-h-[42px] text-xs font-heading font-bold text-amber-600 dark:text-amber-300 disabled:opacity-40 cursor-pointer transition-colors shrink-0"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>{locale === "vi" ? "1 Cánh" : "1 Petal"}</span>
        </button>
      </div>
    </div>
  );
}

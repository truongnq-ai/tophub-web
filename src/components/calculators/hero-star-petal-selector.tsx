"use client";

import React from "react";
import { Star, Minus, Plus } from "lucide-react";
import {
  formatStarPositionSummary,
  petalIndexToState,
  stateToPetalIndex,
  type HeroStarColorTier,
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

const TIER_TABS: readonly {
  readonly tier: HeroStarColorTier;
  readonly label: Record<CalculatorLocale, string>;
  readonly activeClass: string;
}[] = [
  {
    tier: "none",
    label: { vi: "0★ Gốc", en: "0★ Base" },
    activeClass:
      "border-slate-400/60 bg-slate-500/15 text-foreground font-bold",
  },
  {
    tier: "gold",
    label: { vi: "1–5★ Vàng", en: "1–5★ Gold" },
    activeClass:
      "border-amber-500/70 bg-amber-500/20 text-amber-600 dark:text-amber-300 font-bold",
  },
  {
    tier: "red",
    label: { vi: "1–5★ Đỏ", en: "1–5★ Red" },
    activeClass:
      "border-rose-500/70 bg-rose-500/20 text-rose-600 dark:text-rose-300 font-bold",
  },
  {
    tier: "silver",
    label: { vi: "1–5★ Bạc", en: "1–5★ Silver" },
    activeClass:
      "border-sky-400/70 bg-sky-500/20 text-sky-600 dark:text-sky-200 font-bold",
  },
];

const PETAL_ANGLES = [0, 72, 144, 216, 288] as const;

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
    state.starsInTier === 5 && state.petalsInNextStar === 0;
  const displayedPetalsLit = isTierCompleteFiveStars
    ? 5
    : state.petalsInNextStar;

  const wheelColors =
    state.nextStarColorTier === "gold" ||
    (isTierCompleteFiveStars && state.tier === "gold")
      ? {
          litFill: "#F59E0B",
          litStroke: "#FDE047",
          badgeText: "text-amber-500",
          starFill: "text-amber-400 fill-amber-400",
        }
      : state.nextStarColorTier === "red" ||
          (isTierCompleteFiveStars && state.tier === "red")
        ? {
            litFill: "#EF4444",
            litStroke: "#FCA5A5",
            badgeText: "text-rose-500",
            starFill: "text-rose-500 fill-rose-500",
          }
        : {
            litFill: "#38BDF8",
            litStroke: "#E0F2FE",
            badgeText: "text-sky-400",
            starFill: "text-sky-300 fill-sky-300",
          };

  const handleSelectTier = (nextTier: HeroStarColorTier) => {
    if (nextTier === "none") {
      onChangePetalIndex(0);
      return;
    }
    const targetStars = state.starsInTier === 0 ? 1 : state.starsInTier;
    onChangePetalIndex(
      stateToPetalIndex(nextTier, targetStars, state.petalsInNextStar)
    );
  };

  const handleSelectStarInTier = (starNumber: number) => {
    const targetTier: Exclude<HeroStarColorTier, "none"> =
      state.tier === "none" ? "gold" : state.tier;
    const nextPetals = starNumber === 5 ? 0 : state.petalsInNextStar;
    onChangePetalIndex(stateToPetalIndex(targetTier, starNumber, nextPetals));
  };

  const handleSelectPetalCount = (petalCount: number) => {
    const targetTier: Exclude<HeroStarColorTier, "none"> =
      state.tier === "none" ? "gold" : state.tier;

    if (petalCount === 5) {
      const nextStars = Math.min(5, state.starsInTier + 1);
      onChangePetalIndex(stateToPetalIndex(targetTier, nextStars, 0));
      return;
    }

    const baseStars = state.starsInTier === 5 ? 4 : state.starsInTier;
    onChangePetalIndex(stateToPetalIndex(targetTier, baseStars, petalCount));
  };

  return (
    <div
      data-testid={`${idPrefix}-star-selector-card`}
      className="rounded-3xl border border-border/80 bg-card/75 p-4 sm:p-5 space-y-4 shadow-sm"
    >
      {/* Header & Cumulative Pill */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="text-[11px] font-mono font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            {subtitle}
          </span>
          <h3 className="text-base sm:text-lg font-heading font-black text-foreground">
            {title}
          </h3>
        </div>
        <span className="rounded-full bg-secondary/90 border border-border px-2.5 py-1 font-mono text-[11px] font-bold text-foreground shrink-0">
          {locale === "vi"
            ? `Tích lũy: ${cumulativeShards.toLocaleString()} mảnh`
            : `Cumulative: ${cumulativeShards.toLocaleString()} shards`}
        </span>
      </div>

      {/* Current Star + Petal Readout Banner */}
      <div
        data-testid={`${idPrefix}-star-summary`}
        className="rounded-2xl border border-amber-500/25 bg-amber-500/[0.06] px-3.5 py-2.5 flex items-center justify-between gap-2"
      >
        <span className="text-xs sm:text-sm font-heading font-bold text-foreground">
          {formatStarPositionSummary(state, locale)}
        </span>
        <span className="font-mono text-[11px] font-bold text-amber-600 dark:text-amber-400 shrink-0">
          {state.petalIndex}/75
        </span>
      </div>

      {/* 1. Color Tier Tabs (0★ | Sao Vàng | Sao Đỏ | Sao Bạc) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
        {TIER_TABS.map((tab) => {
          const isActive = state.tier === tab.tier;
          return (
            <button
              key={tab.tier}
              type="button"
              data-testid={`${idPrefix}-tier-btn-${tab.tier}`}
              onClick={() => handleSelectTier(tab.tier)}
              className={cn(
                "rounded-xl border px-2.5 py-2 min-h-[42px] text-xs transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40",
                isActive
                  ? tab.activeClass
                  : "border-border/70 bg-background/60 text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label[locale]}
            </button>
          );
        })}
      </div>

      {/* 2. 5-Star Visual Row in Active Tier */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
          <span>
            {locale === "vi"
              ? "Chọn số Ngôi Sao đã hoàn thành trong tầng:"
              : "Select completed Stars in this tier:"}
          </span>
          <span className="font-bold text-foreground">
            {state.starsInTier}/5 ★
          </span>
        </div>

        <div className="grid grid-cols-5 gap-1.5">
          {[1, 2, 3, 4, 5].map((starNum) => {
            const isCompleted = state.starsInTier >= starNum;
            const isNextInProgress =
              state.starsInTier + 1 === starNum && state.petalsInNextStar > 0;

            return (
              <button
                key={starNum}
                type="button"
                data-testid={`${idPrefix}-star-btn-${starNum}`}
                onClick={() => handleSelectStarInTier(starNum)}
                className={cn(
                  "flex flex-col items-center justify-center gap-0.5 rounded-xl border py-2 min-h-[48px] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40",
                  isCompleted
                    ? "border-amber-500/50 bg-amber-500/15 text-foreground shadow-xs"
                    : isNextInProgress
                      ? "border-dashed border-amber-500/60 bg-amber-500/5 text-foreground"
                      : "border-border/60 bg-background/50 text-muted-foreground hover:text-foreground"
                )}
              >
                <Star
                  className={cn(
                    "h-4 w-4 transition-transform",
                    isCompleted
                      ? wheelColors.starFill
                      : isNextInProgress
                        ? "text-amber-500"
                        : "text-muted-foreground/50"
                  )}
                />
                <span className="font-mono text-[10px] font-bold">
                  {starNum}★
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Interactive 5-Petal SVG Star Wheel + Petal Pill Buttons */}
      <div className="rounded-2xl border border-border/70 bg-background/70 p-3.5 flex flex-col items-center gap-3">
        <div className="text-[11px] font-mono text-center text-muted-foreground">
          {locale === "vi"
            ? `Bấm vào từng Cánh Sao bên dưới (Mỗi cánh = +${costPerPetal} mảnh):`
            : `Click any Star Petal below (+${costPerPetal} shards per petal):`}
        </div>

        <svg
          viewBox="0 0 200 200"
          className="w-36 h-36 sm:w-40 sm:h-40 select-none overflow-visible"
          role="group"
          aria-label={
            locale === "vi"
              ? "Bánh xe 5 cánh sao tương tác"
              : "Interactive 5-petal star wheel"
          }
        >
          {PETAL_ANGLES.map((angle, idx) => {
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
                    ? `Cánh sao thứ ${petalNum}`
                    : `Petal ${petalNum}`
                }
                onClick={() => handleSelectPetalCount(petalNum)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleSelectPetalCount(petalNum);
                  }
                }}
                className="cursor-pointer transition-opacity hover:opacity-90"
              >
                <polygon
                  points="100,14 121,68 100,92 79,68"
                  fill={isLit ? wheelColors.litFill : "rgba(148, 163, 184, 0.18)"}
                  stroke={
                    isLit ? wheelColors.litStroke : "rgba(148, 163, 184, 0.45)"
                  }
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
                <text
                  x="100"
                  y="56"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={isLit ? "#0F172A" : "#94A3B8"}
                  className="font-mono text-[11px] font-black pointer-events-none"
                >
                  {petalNum}
                </text>
              </g>
            );
          })}

          {/* Center Core Badge */}
          <circle
            cx="100"
            cy="100"
            r="26"
            className="fill-card stroke-border"
            strokeWidth="2"
          />
          <text
            x="100"
            y="95"
            textAnchor="middle"
            className="fill-foreground font-mono text-xs font-black"
          >
            {displayedPetalsLit}/5
          </text>
          <text
            x="100"
            y="110"
            textAnchor="middle"
            className="fill-muted-foreground font-mono text-[9px] font-semibold"
          >
            {locale === "vi" ? "Cánh" : "Petals"}
          </text>
        </svg>

        {/* Accessible Quick Petal Count Pills (0..4 Petals) */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 w-full">
          {[0, 1, 2, 3, 4].map((pCount) => {
            const isSelected =
              state.petalsInNextStar === pCount && !isTierCompleteFiveStars;
            return (
              <button
                key={pCount}
                type="button"
                data-testid={`${idPrefix}-petal-pill-${pCount}`}
                onClick={() => handleSelectPetalCount(pCount)}
                className={cn(
                  "rounded-lg border px-2.5 py-1.5 min-h-[36px] font-mono text-[11px] font-bold transition-colors cursor-pointer",
                  isSelected
                    ? "border-amber-500 bg-amber-500 text-slate-950"
                    : "border-border/70 bg-card text-muted-foreground hover:text-foreground"
                )}
              >
                {locale === "vi" ? `+${pCount} Cánh` : `+${pCount}P`}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Mobile-Friendly Stepper Buttons (-1 Petal / +1 Petal) */}
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          data-testid={`${idPrefix}-petal-minus-btn`}
          disabled={petalIndex <= 0}
          onClick={() => onChangePetalIndex(Math.max(0, petalIndex - 1))}
          className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-border/80 bg-secondary/60 hover:bg-secondary px-3 py-2.5 min-h-[44px] text-xs font-heading font-bold text-foreground disabled:opacity-40 cursor-pointer transition-colors"
        >
          <Minus className="h-3.5 w-3.5 text-amber-500" />
          <span>{locale === "vi" ? "Lùi 1 Cánh" : "-1 Petal"}</span>
        </button>

        <button
          type="button"
          data-testid={`${idPrefix}-petal-plus-btn`}
          disabled={petalIndex >= 75}
          onClick={() => onChangePetalIndex(Math.min(75, petalIndex + 1))}
          className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-amber-500/40 bg-amber-500/15 hover:bg-amber-500/25 px-3 py-2.5 min-h-[44px] text-xs font-heading font-bold text-amber-600 dark:text-amber-300 disabled:opacity-40 cursor-pointer transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>{locale === "vi" ? "Tiến 1 Cánh" : "+1 Petal"}</span>
        </button>
      </div>
    </div>
  );
}

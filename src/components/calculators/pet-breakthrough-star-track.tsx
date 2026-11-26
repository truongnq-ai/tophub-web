"use client";

import React, { useMemo, useRef } from "react";
import { Star, Sparkles, Flame, Check } from "lucide-react";
import {
  PET_BREAK_MILESTONES,
  type PetBreakMilestone,
} from "@/content/calculators/pets-data";
import { cn } from "@/lib/utils";
import {
  CALC_MD3,
  CalculatorStepperButton,
} from "./calculator-md3-primitives";

export interface PetBreakthroughStarTrackProps {
  readonly minBreak: number;
  readonly maxBreak: number;
  readonly fromBreak: number;
  readonly toBreak: number;
  readonly locale: "vi" | "en";
  readonly onChangeRange: (nextFrom: number, nextTo: number) => void;
}

type BreakthroughTierCategory = "rare" | "epic" | "legendary" | "mythic" | "titan";

interface TierGroupDef {
  readonly id: BreakthroughTierCategory;
  readonly nameVi: string;
  readonly nameEn: string;
  readonly colorClass: string;
  readonly borderClass: string;
  readonly bgActive: string;
  readonly glowClass: string;
  readonly minIndex: number;
  readonly maxIndex: number;
}

const TIER_GROUPS: readonly TierGroupDef[] = [
  {
    id: "rare",
    nameVi: "Hiếm (Lam)",
    nameEn: "Rare (Blue)",
    colorClass: "text-sky-400",
    borderClass: "border-sky-500/40",
    bgActive: "bg-sky-500/20 text-sky-300 border-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.35)]",
    glowClass: "shadow-[0_0_8px_rgba(56,189,248,0.4)]",
    minIndex: 0,
    maxIndex: 4,
  },
  {
    id: "epic",
    nameVi: "Sử Thi (Tím)",
    nameEn: "Epic (Purple)",
    colorClass: "text-purple-400",
    borderClass: "border-purple-500/40",
    bgActive: "bg-purple-500/20 text-purple-300 border-purple-400 shadow-[0_0_10px_rgba(192,132,252,0.35)]",
    glowClass: "shadow-[0_0_8px_rgba(192,132,252,0.4)]",
    minIndex: 5,
    maxIndex: 10,
  },
  {
    id: "legendary",
    nameVi: "Huyền Thoại (Cam)",
    nameEn: "Legendary (Orange)",
    colorClass: "text-amber-400",
    borderClass: "border-amber-500/40",
    bgActive: "bg-amber-500/20 text-amber-300 border-amber-400 shadow-[0_0_10px_rgba(251,146,60,0.35)]",
    glowClass: "shadow-[0_0_8px_rgba(251,146,60,0.4)]",
    minIndex: 11,
    maxIndex: 16,
  },
  {
    id: "mythic",
    nameVi: "Thần Thoại (Đỏ)",
    nameEn: "Mythic (Red)",
    colorClass: "text-rose-400",
    borderClass: "border-rose-500/40",
    bgActive: "bg-rose-500/20 text-rose-300 border-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.35)]",
    glowClass: "shadow-[0_0_8px_rgba(244,63,94,0.4)]",
    minIndex: 17,
    maxIndex: 22,
  },
  {
    id: "titan",
    nameVi: "Titan (Lửa)",
    nameEn: "Titan (Flame)",
    colorClass: "text-rose-500",
    borderClass: "border-rose-500/60",
    bgActive: "bg-gradient-to-r from-rose-500/25 to-amber-500/25 text-amber-300 border-amber-400 shadow-[0_0_12px_rgba(239,68,68,0.5)]",
    glowClass: "shadow-[0_0_10px_rgba(239,68,68,0.6)]",
    minIndex: 23,
    maxIndex: 23,
  },
];

function getTierForBreakIndex(breakIndex: number): TierGroupDef {
  if (breakIndex <= 4) return TIER_GROUPS[0]!;
  if (breakIndex <= 10) return TIER_GROUPS[1]!;
  if (breakIndex <= 16) return TIER_GROUPS[2]!;
  if (breakIndex <= 22) return TIER_GROUPS[3]!;
  return TIER_GROUPS[4]!;
}

export function PetBreakthroughStarTrack({
  minBreak,
  maxBreak,
  fromBreak,
  toBreak,
  locale,
  onChangeRange,
}: PetBreakthroughStarTrackProps): React.JSX.Element {
  const isVi = locale === "vi";
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Clamped safe values
  const safeMin = Math.max(0, Math.min(minBreak, 23));
  const safeMax = Math.max(safeMin + 1, Math.min(maxBreak, 23));
  const safeFrom = Math.max(safeMin, Math.min(safeMax - 1, fromBreak));
  const safeTo = Math.max(safeFrom + 1, Math.min(safeMax, toBreak));

  const totalSteps = Math.max(1, safeMax - safeMin);
  const progressStartPct = ((safeFrom - safeMin) / totalSteps) * 100;
  const progressEndPct = ((safeTo - safeMin) / totalSteps) * 100;

  const visibleMilestones: PetBreakMilestone[] = useMemo(() => {
    return PET_BREAK_MILESTONES.slice(safeMin, safeMax + 1);
  }, [safeMin, safeMax]);

  const currentMilestone = PET_BREAK_MILESTONES[safeFrom] ?? PET_BREAK_MILESTONES[0]!;
  const targetMilestone = PET_BREAK_MILESTONES[safeTo] ?? PET_BREAK_MILESTONES[0]!;

  const handleFromChange = (raw: number) => {
    const nextFrom = Math.max(safeMin, Math.min(safeMax - 1, Math.floor(raw)));
    if (nextFrom >= safeTo) {
      onChangeRange(nextFrom, Math.min(safeMax, nextFrom + 1));
    } else {
      onChangeRange(nextFrom, safeTo);
    }
  };

  const handleToChange = (raw: number) => {
    const nextTo = Math.max(safeMin + 1, Math.min(safeMax, Math.floor(raw)));
    if (nextTo <= safeFrom) {
      onChangeRange(Math.max(safeMin, nextTo - 1), nextTo);
    } else {
      onChangeRange(safeFrom, nextTo);
    }
  };

  const handleNodeClick = (nodeBreak: number) => {
    if (nodeBreak < safeFrom) {
      onChangeRange(nodeBreak, safeTo);
    } else if (nodeBreak > safeFrom) {
      onChangeRange(safeFrom, nodeBreak);
    } else if (nodeBreak === safeFrom && safeFrom > safeMin) {
      onChangeRange(safeFrom - 1, safeTo);
    }
  };

  const isSingleStep = safeTo === safeFrom + 1;

  const scrollToTier = (tierIndex: number) => {
    if (!scrollContainerRef.current) return;
    const targetElement = scrollContainerRef.current.querySelector(
      `[data-break-index="${tierIndex}"]`
    );
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  };

  return (
    <div
      data-testid="pet-breakthrough-star-track"
      className={cn(
        CALC_MD3.tonalGroup,
        "space-y-4 bg-slate-900/40 ring-1 ring-border/60"
      )}
    >
      {/* 1. Header: Status Summary + Quick Single-Step Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20 text-amber-500 text-xs font-mono font-bold">
            2
          </span>
          <h2 className="text-sm sm:text-base font-heading font-bold text-foreground">
            {isVi
              ? "Thanh Kéo Đột Phá Sao (Break 0 ➔ 23)"
              : "Pet Breakthrough Star Track (Break 0 ➔ 23)"}
          </h2>
          <span className="rounded-lg bg-amber-500/15 px-2.5 py-0.5 text-xs font-sans font-bold text-amber-300">
            Break {safeFrom} ➔ Break {safeTo} (
            <span className="font-mono tabular-nums">+{safeTo - safeFrom}</span>{" "}
            {isVi ? "Bậc" : "Steps"} |{" "}
            <span className="font-mono tabular-nums">
              {currentMilestone.inheritancePct}% ➔ {targetMilestone.inheritancePct}%
            </span>
            )
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            data-testid="pet-star-track-single-step"
            onClick={() => {
              if (isSingleStep && safeTo < safeMax) {
                onChangeRange(safeFrom + 1, safeTo + 1);
              } else {
                onChangeRange(safeFrom, Math.min(safeMax, safeFrom + 1));
              }
            }}
            className={cn(
              "inline-flex min-h-[44px] items-center gap-1.5 rounded-xl px-3 text-xs font-sans font-bold transition-all cursor-pointer",
              isSingleStep
                ? "bg-amber-500 text-slate-950 font-bold shadow-sm"
                : "bg-muted/60 text-muted-foreground hover:bg-amber-500/15 hover:text-foreground"
            )}
          >
            <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>{isVi ? "+1 Bậc (Chuẩn Game)" : "+1 Step (In-Game)"}</span>
          </button>
        </div>
      </div>

      {/* 2. Dải Sao Phân Tầng Màu Sắc Trực Quan (Horizontal Visual Star Milestones Strip) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-sans text-muted-foreground px-0.5">
          <span className="font-semibold text-foreground/90">
            {isVi ? "Dải sao phân tầng (Chạm để chọn nhanh):" : "Star milestones (Tap to jump):"}
          </span>
          <div className="hidden sm:flex items-center gap-3">
            <span className="inline-flex items-center gap-1 text-purple-400 font-semibold">
              <span className="h-2 w-2 rounded-full bg-purple-400" />
              Sử Thi (Tím)
            </span>
            <span className="inline-flex items-center gap-1 text-amber-400 font-semibold">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              Huyền Thoại (Cam)
            </span>
            <span className="inline-flex items-center gap-1 text-rose-400 font-semibold">
              <span className="h-2 w-2 rounded-full bg-rose-400" />
              Thần Thoại (Đỏ)
            </span>
            <span className="inline-flex items-center gap-1 text-rose-500 font-semibold">
              <Flame className="h-3 w-3 text-rose-500 inline" />
              Titan
            </span>
          </div>
        </div>

        {/* Scrollable Container with Snap points */}
        <div
          ref={scrollContainerRef}
          data-testid="pet-star-milestones-strip"
          className="flex items-center gap-1.5 overflow-x-auto pb-2 pt-1 scroll-smooth focus:outline-none scrollbar-thin scrollbar-thumb-muted-foreground/30"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {visibleMilestones.map((m) => {
            const tierDef = getTierForBreakIndex(m.breakIndex);
            const isStart = m.breakIndex === safeFrom;
            const isTarget = m.breakIndex === safeTo;
            const isInRange = m.breakIndex >= safeFrom && m.breakIndex <= safeTo;
            const isTitan = m.breakIndex === 23;
            const isFormEvolution =
              (m.breakIndex === 9 && m.form === 2) ||
              (m.breakIndex === 13 && m.form === 3) ||
              (m.breakIndex === 23 && m.form === 4);

            return (
              <button
                key={m.breakIndex}
                type="button"
                data-break-index={m.breakIndex}
                data-testid={`pet-star-node-${m.breakIndex}`}
                onClick={() => handleNodeClick(m.breakIndex)}
                aria-label={`Break ${m.breakIndex} ${m.tierNameVi}`}
                className={cn(
                  "group relative flex min-h-[44px] min-w-[50px] shrink-0 flex-col items-center justify-center rounded-xl p-1.5 transition-all cursor-pointer border",
                  // Selected Start Node
                  isStart
                    ? "ring-2 ring-purple-400 bg-purple-500/25 border-purple-400 shadow-md"
                    : // Selected Target Node
                    isTarget
                    ? "ring-2 ring-amber-400 bg-amber-500/25 border-amber-400 shadow-md scale-105"
                    : // Within illuminated Range
                    isInRange
                    ? cn(tierDef.bgActive, "border-opacity-80")
                    : // Out of Range
                      "bg-background/40 border-border/40 text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                )}
              >
                {/* Evolution Badge (F2, F3, F4) */}
                {isFormEvolution && (
                  <span
                    className={cn(
                      "absolute -top-2 rounded-full px-1.5 py-0.5 text-xs font-sans font-black tracking-tight text-slate-950 shadow-sm",
                      m.form === 4 ? "bg-rose-500 text-white animate-pulse" : "bg-amber-400"
                    )}
                  >
                    F{m.form}
                  </span>
                )}

                {/* Star Icon or Flame */}
                <div className="flex items-center justify-center">
                  {isTitan ? (
                    <Flame
                      className={cn(
                        "h-5 w-5 transition-transform",
                        isInRange
                          ? "text-rose-500 fill-rose-500 scale-110 drop-shadow-[0_0_8px_rgba(239,68,68,0.7)]"
                          : "text-muted-foreground"
                      )}
                      aria-hidden="true"
                    />
                  ) : (
                    <div className="relative flex items-center justify-center">
                      <Star
                        className={cn(
                          "h-5 w-5 transition-transform",
                          isInRange
                            ? cn(tierDef.colorClass, "fill-current scale-105")
                            : "text-muted-foreground/60"
                        )}
                        aria-hidden="true"
                      />
                      {m.starCount > 0 && (
                        <span
                          className={cn(
                            "absolute font-mono text-xs font-black leading-none",
                            isInRange ? "text-slate-950 dark:text-slate-900" : "text-foreground"
                          )}
                        >
                          {m.starCount}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Break Label */}
                <span
                  className={cn(
                    "mt-0.5 font-mono text-xs font-bold leading-tight",
                    isStart
                      ? "text-purple-300 font-black"
                      : isTarget
                      ? "text-amber-300 font-black"
                      : isInRange
                      ? "text-foreground"
                      : "text-muted-foreground/80"
                  )}
                >
                  B{m.breakIndex}
                </span>

                {/* Indicator text (From / To) */}
                {isStart && (
                  <span className="absolute -bottom-2 rounded bg-purple-500 px-1 py-0.2 font-sans text-xs font-bold text-white shadow-sm">
                    {isVi ? "Bắt đầu" : "From"}
                  </span>
                )}
                {isTarget && (
                  <span className="absolute -bottom-2 rounded bg-amber-500 px-1 py-0.2 font-sans text-xs font-bold text-slate-950 shadow-sm">
                    {isVi ? "Đích" : "To"}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Thanh Ray Trượt 2 Điểm Hợp Nhất (Unified Dual-Point Track Slider) */}
      <div className="space-y-2 pt-2">
        <div className="relative flex h-8 items-center">
          {/* Base Track */}
          <div className="h-3 w-full overflow-hidden rounded-full bg-slate-800 ring-1 ring-border/50">
            {/* Active Range Gradient Ribbon */}
            <div
              data-testid="pet-star-track-progress-fill"
              className="h-full rounded-full bg-gradient-to-r from-purple-500 via-amber-500 to-rose-500 transition-all duration-150 shadow-[0_0_12px_rgba(245,158,11,0.5)]"
              style={{
                marginLeft: `${progressStartPct}%`,
                width: `${Math.max(2, progressEndPct - progressStartPct)}%`,
              }}
            />
          </div>

          {/* HTML5 Range Input for Start Point (From) */}
          <input
            type="range"
            min={safeMin}
            max={safeMax - 1}
            step={1}
            value={safeFrom}
            data-testid="pet-star-track-from-slider"
            aria-label={isVi ? "Kéo mốc đột phá bắt đầu" : "Start breakthrough slider"}
            onChange={(e) => handleFromChange(Number(e.target.value))}
            className="w-full accent-purple-400 cursor-pointer h-7 opacity-90 absolute left-0 top-0"
          />

          {/* HTML5 Range Input for Target Point (To) */}
          <input
            type="range"
            min={safeMin + 1}
            max={safeMax}
            step={1}
            value={safeTo}
            data-testid="pet-star-track-to-slider"
            aria-label={isVi ? "Kéo mốc đột phá mục tiêu" : "Target breakthrough slider"}
            onChange={(e) => handleToChange(Number(e.target.value))}
            className="w-full accent-amber-400 cursor-pointer h-7 opacity-90 absolute left-0 top-0 pointer-events-auto"
          />
        </div>

        {/* Axis Labels */}
        <div className="flex items-center justify-between text-xs font-mono text-muted-foreground px-1">
          <span>Break {safeMin} ({PET_BREAK_MILESTONES[safeMin]?.tierNameVi})</span>
          <span className="text-amber-400 font-semibold">
            {isVi ? "Kéo thanh trên để chọn nhanh khoảng nâng cấp" : "Drag sliders to adjust range"}
          </span>
          <span>Break {safeMax} ({PET_BREAK_MILESTONES[safeMax]?.tierNameVi})</span>
        </div>
      </div>

      {/* 4. Bộ Điều Khiển Vi Chỉnh 44px (Micro-Adjustment Steppers) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        {/* Current Break Stepper */}
        <div className="flex items-center justify-between gap-2 rounded-xl bg-background/60 p-2.5 ring-1 ring-border/50">
          <div className="min-w-0">
            <span className="text-xs font-sans font-semibold text-muted-foreground block">
              {isVi ? "BẬC HIỆN TẠI (START):" : "CURRENT BREAK (FROM):"}
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-sm font-mono font-bold text-foreground">
                Break {safeFrom}
              </span>
              <span className="text-xs font-sans text-purple-400 font-semibold truncate max-w-[120px]">
                {currentMilestone.tierNameVi}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <CalculatorStepperButton
              direction="decrease"
              testId="pet-from-break-decrease"
              ariaLabel={isVi ? "Giảm bậc hiện tại" : "Decrease current break"}
              disabled={safeFrom <= safeMin}
              onClick={() => handleFromChange(safeFrom - 1)}
            />
            <CalculatorStepperButton
              direction="increase"
              testId="pet-from-break-increase"
              ariaLabel={isVi ? "Tăng bậc hiện tại" : "Increase current break"}
              disabled={safeFrom >= safeTo - 1}
              onClick={() => handleFromChange(safeFrom + 1)}
            />
          </div>
        </div>

        {/* Target Break Stepper */}
        <div className="flex items-center justify-between gap-2 rounded-xl bg-amber-500/10 p-2.5 ring-1 ring-amber-500/30">
          <div className="min-w-0">
            <span className="text-xs font-sans font-semibold text-amber-300 block">
              {isVi ? "BẬC MỤC TIÊU (TARGET):" : "TARGET BREAK (TO):"}
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-sm font-mono font-bold text-amber-400">
                Break {safeTo}
              </span>
              <span className="text-xs font-sans text-amber-300 font-semibold truncate max-w-[120px]">
                {targetMilestone.tierNameVi}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <CalculatorStepperButton
              direction="decrease"
              testId="pet-to-break-decrease"
              ariaLabel={isVi ? "Giảm bậc mục tiêu" : "Decrease target break"}
              disabled={safeTo <= safeFrom + 1}
              onClick={() => handleToChange(safeTo - 1)}
            />
            <CalculatorStepperButton
              direction="increase"
              testId="pet-to-break-increase"
              ariaLabel={isVi ? "Tăng bậc mục tiêu" : "Increase target break"}
              disabled={safeTo >= safeMax}
              onClick={() => handleToChange(safeTo + 1)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

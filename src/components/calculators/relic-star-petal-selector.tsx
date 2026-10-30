"use client";

import React from "react";
import {
  RELIC_MAX_PETAL_INDEX,
  clampPetalIndex,
  starAndSubStepToPetalIndex,
  type RelicPetalSnapshot,
  type RelicStarTierColorId,
} from "@/content/calculators/relics-data";
import type { CalculatorLocale } from "@/content/calculators/types";
import { formatExactNumber } from "@/lib/number-format";
import { cn } from "@/lib/utils";
import { CalculatorInfoPopover } from "./calculator-info-popover";
import {
  CALC_MD3,
  CalculatorStepperButton,
} from "./calculator-md3-primitives";

export interface RelicStarPetalSelectorProps {
  readonly idPrefix: "from" | "to";
  readonly title: string;
  readonly badgeLabel: string;
  readonly snapshot: RelicPetalSnapshot;
  readonly locale: CalculatorLocale;
  readonly onChangePetalIndex: (nextPetalIndex: number) => void;
}

export const COUNTER_CLOCKWISE_PETAL_ANGLES = [0, 288, 216, 144, 72] as const;

const QUICK_STAR_MILESTONES = [0, 3, 5, 8, 10, 15, 20] as const;

interface RelicStarTierRowDef {
  readonly key: RelicStarTierColorId;
  readonly stars: readonly [number, number, number, number, number];
  readonly label: Readonly<Record<CalculatorLocale, string>>;
  readonly tierName: Readonly<Record<CalculatorLocale, string>>;
  readonly labelClassName: string;
  readonly litStroke: string;
}

const RELIC_STAR_TIER_ROWS: readonly RelicStarTierRowDef[] = [
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
  {
    key: "diamond",
    stars: [16, 17, 18, 19, 20],
    label: { vi: "16–20★ Kim Cương", en: "16–20★ Diamond" },
    tierName: { vi: "Kim Cương", en: "Diamond" },
    labelClassName: "text-sky-700 dark:text-sky-400",
    litStroke: "#0284C7",
  },
] as const;

const UNLIT_PETAL_FILL = "rgba(148, 163, 184, 0.18)";
const UNLIT_PETAL_STROKE = "rgba(148, 163, 184, 0.45)";

export function RelicStarPetalSelector({
  idPrefix,
  title,
  badgeLabel,
  snapshot,
  locale,
  onChangePetalIndex,
}: RelicStarPetalSelectorProps) {
  const isVi = locale === "vi";
  const { petalIndex, starLevel, subStep, tierColorId } = snapshot;

  const handleStarClick = (overallStar: number) => {
    const starEndPetal = overallStar * 5;
    onChangePetalIndex(
      petalIndex === starEndPetal && overallStar === 1 ? 0 : starEndPetal
    );
  };

  const handleMilestoneClick = (milestoneStar: number) => {
    onChangePetalIndex(starAndSubStepToPetalIndex(milestoneStar, 0));
  };

  const handleSubStepClick = (nextSubStep: number) => {
    if (starLevel >= 20) return;
    onChangePetalIndex(starAndSubStepToPetalIndex(starLevel, nextSubStep));
  };

  const tierTone =
    tierColorId === "gold"
      ? "bg-amber-500/15 text-amber-700 dark:text-amber-300"
      : tierColorId === "red"
        ? "bg-rose-500/15 text-rose-700 dark:text-rose-300"
        : tierColorId === "silver"
          ? "bg-slate-400/20 text-slate-700 dark:text-slate-200"
          : "bg-sky-500/15 text-sky-700 dark:text-sky-300";

  const bonusLabel =
    snapshot.bonusProfile === "dmg_boost"
      ? isVi
        ? "Tăng ST"
        : "DMG Boost"
      : snapshot.bonusProfile === "dmg_reduction"
        ? isVi
          ? "Giảm ST"
          : "DMG Reduction"
        : snapshot.bonusProfile === "dual_dmg_boost_and_reduction"
          ? isVi
            ? "Tăng ST / Giảm ST"
            : "DMG Boost / Red."
          : isVi
            ? "Cấp Skill Bí Bảo"
            : "Relic Skill Lv.";

  const bonusValueText =
    snapshot.bonusProfile === "dmg_boost"
      ? `${snapshot.dmgBoostPercent}%`
      : snapshot.bonusProfile === "dmg_reduction"
        ? `${snapshot.dmgReductionPercent}%`
        : snapshot.bonusProfile === "dual_dmg_boost_and_reduction"
          ? `${snapshot.dmgBoostPercent}% / ${snapshot.dmgReductionPercent}%`
          : `Lv.${snapshot.skillLevel}`;

  return (
    <div data-testid={`relics-${idPrefix}-selector`} className="space-y-2.5">
      {/* Shared SVG Gradients for 4 Star Tiers: Gold / Red / Silver / Diamond */}
      <svg className="sr-only" aria-hidden="true" width="0" height="0">
        <defs>
          <linearGradient
            id={`relic-${idPrefix}-gold-grad`}
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
            id={`relic-${idPrefix}-red-grad`}
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
            id={`relic-${idPrefix}-silver-grad`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="55%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>
          <linearGradient
            id={`relic-${idPrefix}-diamond-grad`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#BAE6FD" />
            <stop offset="50%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>
        </defs>
      </svg>

      {/* 1. Header Row: Badge + Title + Inline Quick Star Chips + Readout + (i) Popup */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "inline-flex items-center rounded-lg px-2.5 py-1 font-sans text-xs font-bold",
              tierTone
            )}
          >
            {badgeLabel}
          </span>
          <h2 className={CALC_MD3.sectionTitle}>{title}</h2>

          {/* Inline Quick Star Milestone Chips (0★, 3★, 5★, 8★, 10★, 15★, 20★) */}
          <div className="flex flex-wrap items-center gap-1">
            {QUICK_STAR_MILESTONES.map((mStar) => {
              const isSelected = starLevel === mStar && subStep === 0;
              return (
                <button
                  key={mStar}
                  type="button"
                  data-testid={`relics-${idPrefix}-chip-${mStar}`}
                  onClick={() => handleMilestoneClick(mStar)}
                  className={cn(
                    CALC_MD3.chipButton,
                    "px-2 font-mono text-xs font-bold",
                    isSelected
                      ? "bg-amber-500 text-slate-950 shadow-sm"
                      : "bg-muted/50 text-foreground hover:bg-amber-500/15"
                  )}
                >
                  {`${mStar}★`}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <div
            data-testid={`relics-${idPrefix}-readout`}
            className="inline-flex items-center gap-1.5 rounded-xl bg-muted/60 px-3 py-1.5"
          >
            <span className="font-mono text-base font-black text-amber-600 dark:text-amber-400">
              {`${starLevel}★`}
            </span>
            {starLevel < 20 ? (
              <span className="font-mono text-xs font-bold text-muted-foreground">
                {`(${subStep}/5)`}
              </span>
            ) : null}
            <span className="font-mono text-xs font-semibold text-muted-foreground">
              {`• ${petalIndex}/100`}
            </span>
          </div>

          <CalculatorInfoPopover
            title={
              isVi
                ? `Chỉ Số Bí Bảo — ${title} (${starLevel}★ ${subStep}/5)`
                : `Relic Attributes — ${title} (${starLevel}★ ${subStep}/5)`
            }
            subtitle={
              isVi
                ? `Cánh sao: ${petalIndex}/100 • Đã đầu tư tích lũy: ${formatExactNumber(snapshot.cumulativeShards)} mảnh`
                : `Petals: ${petalIndex}/100 • Cumulative invested: ${formatExactNumber(snapshot.cumulativeShards)} shards`
            }
            locale={locale}
            triggerLabel={
              isVi
                ? `Xem chỉ số Bí Bảo tại ${title}`
                : `View Relic attributes at ${title}`
            }
            triggerTestId={`relics-${idPrefix}-info-trigger`}
            dialogTestId={`relics-${idPrefix}-info-dialog`}
          >
            <div className="space-y-3">
              {/* 4 In-Game Relic Attributes & All-Hero Bonus inside Popup (i) */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className={cn(CALC_MD3.tonalGroup, "p-3 space-y-0.5")}>
                  <p className="font-sans text-xs font-semibold text-muted-foreground">
                    {isVi ? "Tấn công Bí Bảo" : "Relic ATK"}
                  </p>
                  <p
                    data-testid={`relics-${idPrefix}-stat-atk`}
                    title={
                      isVi
                        ? `Gốc: ${formatExactNumber(snapshot.baseAtk)} × ${snapshot.relicHallBoostPercent}%`
                        : `Base: ${formatExactNumber(snapshot.baseAtk)} × ${snapshot.relicHallBoostPercent}%`
                    }
                    className="font-mono text-base font-black text-foreground tabular-nums"
                  >
                    {formatExactNumber(snapshot.effectiveAtk)}
                  </p>
                  <p className="font-sans text-xs text-muted-foreground">
                    {isVi
                      ? `Gốc: ${formatExactNumber(snapshot.baseAtk)} (+${snapshot.relicHallBoostPercent}% Sảnh)`
                      : `Base: ${formatExactNumber(snapshot.baseAtk)} (+${snapshot.relicHallBoostPercent}% Hall)`}
                  </p>
                </div>

                <div className={cn(CALC_MD3.tonalGroup, "p-3 space-y-0.5")}>
                  <p className="font-sans text-xs font-semibold text-muted-foreground">
                    {isVi ? "HP Bí Bảo" : "Relic HP"}
                  </p>
                  <p
                    data-testid={`relics-${idPrefix}-stat-hp`}
                    title={
                      isVi
                        ? `Gốc: ${formatExactNumber(snapshot.baseHp)} × ${snapshot.relicHallBoostPercent}%`
                        : `Base: ${formatExactNumber(snapshot.baseHp)} × ${snapshot.relicHallBoostPercent}%`
                    }
                    className="font-mono text-base font-black text-foreground tabular-nums"
                  >
                    {formatExactNumber(snapshot.effectiveHp)}
                  </p>
                  <p className="font-sans text-xs text-muted-foreground">
                    {isVi
                      ? `Gốc: ${formatExactNumber(snapshot.baseHp)} (+${snapshot.relicHallBoostPercent}% Sảnh)`
                      : `Base: ${formatExactNumber(snapshot.baseHp)} (+${snapshot.relicHallBoostPercent}% Hall)`}
                  </p>
                </div>

                <div className={cn(CALC_MD3.tonalGroup, "p-3 space-y-0.5")}>
                  <p className="font-sans text-xs font-semibold text-muted-foreground">
                    {bonusLabel}
                  </p>
                  <p
                    data-testid={`relics-${idPrefix}-stat-bonus`}
                    className="font-mono text-base font-black text-amber-600 dark:text-amber-400 tabular-nums"
                  >
                    {bonusValueText}
                  </p>
                </div>

                <div className={cn(CALC_MD3.tonalGroup, "p-3 space-y-0.5")}>
                  <p className="font-sans text-xs font-semibold text-muted-foreground">
                    {isVi ? "ATK / HP Anh Hùng" : "Hero ATK / HP"}
                  </p>
                  <p
                    data-testid={`relics-${idPrefix}-stat-hero`}
                    className="font-mono text-base font-black text-emerald-600 dark:text-emerald-400 tabular-nums"
                  >
                    {`${snapshot.heroAtkPercent}% / ${snapshot.heroHpPercent}%`}
                  </p>
                </div>
              </div>
            </div>
          </CalculatorInfoPopover>
        </div>
      </div>

      {/* 2. 20 Five-Petal Stars Grid: 4 Color Tiers in 1 Row on xl (2×2 on sm+) */}
      <div
        data-testid={`${idPrefix}-star-tier-grid`}
        className={cn(
          CALC_MD3.tonalGroup,
          "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2 p-2.5"
        )}
      >
        {RELIC_STAR_TIER_ROWS.map((row) => (
          <div
            key={row.key}
            role="group"
            aria-label={row.label[locale]}
            data-testid={`${idPrefix}-star-tier-row-${row.key}`}
            className="space-y-1"
          >
            <div
              className={cn("font-sans text-xs font-bold", row.labelClassName)}
            >
              {row.label[locale]}
            </div>
            <div className="grid grid-cols-5 gap-0.5">
              {row.stars.map((overallStar) => {
                const starStartPetal = (overallStar - 1) * 5;
                const litPetalsInThisStar = Math.max(
                  0,
                  Math.min(5, petalIndex - starStartPetal)
                );
                const starTitle = `${overallStar}★ ${row.tierName[locale]} (${litPetalsInThisStar}/5)`;
                const litFill = `url(#relic-${idPrefix}-${row.key}-grad)`;

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
                      "group flex min-h-[44px] min-w-0 flex-col items-center justify-center gap-0.5 rounded-xl transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40",
                      litPetalsInThisStar > 0
                        ? "bg-background/70 dark:bg-background/35"
                        : "bg-transparent hover:bg-background/50"
                    )}
                  >
                    <svg
                      viewBox="0 0 100 100"
                      aria-hidden="true"
                      className="h-5 w-5 overflow-visible transition-transform group-hover:scale-110"
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
                            stroke={
                              isPetalLit ? row.litStroke : UNLIT_PETAL_STROKE
                            }
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
                      {overallStar}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* 3. Single-Line Control Bar: [- / Slider / +] + Sub-step Petal Chips (0/5 .. 4/5) */}
      <div
        className={cn(
          CALC_MD3.tonalGroup,
          "flex flex-col md:flex-row md:items-center justify-between gap-2.5 p-2 sm:px-3"
        )}
      >
        <div className="flex flex-1 items-center gap-2">
          <CalculatorStepperButton
            direction="decrease"
            testId={`relics-${idPrefix}-petal-minus-btn`}
            disabled={petalIndex <= 0}
            onClick={() =>
              onChangePetalIndex(clampPetalIndex(petalIndex - 1))
            }
            ariaLabel={
              isVi
                ? `Lùi 1 cánh sao (${title})`
                : `Decrease 1 star petal (${title})`
            }
          />
          <input
            type="range"
            min={0}
            max={RELIC_MAX_PETAL_INDEX}
            step={1}
            data-testid={`relics-${idPrefix}-petal-slider`}
            value={petalIndex}
            onChange={(event) =>
              onChangePetalIndex(clampPetalIndex(Number(event.target.value)))
            }
            aria-label={
              isVi
                ? `Thanh kéo 100 cánh sao (${title})`
                : `100-petal star slider (${title})`
            }
            className="h-11 min-w-0 flex-1 cursor-pointer accent-amber-500"
          />
          <CalculatorStepperButton
            direction="increase"
            testId={`relics-${idPrefix}-petal-plus-btn`}
            disabled={petalIndex >= RELIC_MAX_PETAL_INDEX}
            onClick={() =>
              onChangePetalIndex(clampPetalIndex(petalIndex + 1))
            }
            ariaLabel={
              isVi
                ? `Tiến 1 cánh sao (${title})`
                : `Increase 1 star petal (${title})`
            }
          />
        </div>

        {starLevel < 20 ? (
          <div className="flex flex-wrap items-center justify-between md:justify-end gap-1.5 shrink-0">
            <span className="font-sans text-xs font-semibold text-muted-foreground">
              {isVi ? "Cánh lẻ:" : "Petals:"}
            </span>
            <div className="grid grid-cols-5 gap-1">
              {([0, 1, 2, 3, 4] as const).map((s) => {
                const active = subStep === s;
                return (
                  <button
                    key={s}
                    type="button"
                    data-testid={`relics-${idPrefix}-substep-${s}`}
                    onClick={() => handleSubStepClick(s)}
                    className={cn(
                      "inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl px-2 font-mono text-xs font-bold transition-colors cursor-pointer",
                      active
                        ? "bg-amber-500 text-slate-950 shadow-sm"
                        : "bg-background/70 text-muted-foreground hover:bg-amber-500/15 hover:text-foreground"
                    )}
                  >
                    {`${s}/5`}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

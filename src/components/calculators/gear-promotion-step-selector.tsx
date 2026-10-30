"use client";

import Image from "next/image";
import React from "react";
import { Sparkles } from "lucide-react";
import {
  GEAR_PROMOTION_STEPS,
  MAX_GEAR_PROMOTION_STEP,
  MIN_GEAR_PROMOTION_STEP,
  clampGearPromotionStepIndex,
  getGearPromotionItemStatsAtStep,
  getGearPromotionSetMeta,
  getGearPromotionSlotMeta,
  type GearPromotionSetId,
  type GearPromotionSlotId,
} from "@/content/calculators/gear-promotion-data";
import { CALCULATOR_MATERIALS } from "@/content/calculators/registry";
import type { CalculatorLocale } from "@/content/calculators/types";
import { formatCompactNumber, formatExactNumber } from "@/lib/number-format";
import { cn } from "@/lib/utils";
import {
  CALC_MD3,
  CalculatorStepperButton,
} from "./calculator-md3-primitives";

export interface GearPromotionStepSelectorProps {
  readonly label: string;
  readonly stepIndex: number;
  readonly onChange: (nextStepIndex: number) => void;
  readonly setId: GearPromotionSetId;
  readonly slotId: GearPromotionSlotId;
  readonly locale: CalculatorLocale;
  readonly variant: "from" | "to";
  readonly testIdPrefix: string;
}

/**
 * 5 counter-clockwise petal angles matching HeroStarPetalSelector:
 * Petal 1 (top 0°) -> Petal 2 (-72°) -> Petal 3 (-144°) -> Petal 4 (-216°) -> Petal 5 (-288°)
 */
const PETAL_ANGLES_CCW: readonly number[] = [0, -72, -144, -216, -288] as const;

const PETAL_PATH_D =
  "M 50 45 L 40.5 31.9 L 50 6 L 59.5 31.9 Z";

const STAR_NUMBERS: readonly (1 | 2 | 3 | 4 | 5)[] = [1, 2, 3, 4, 5] as const;

interface PromotionStarSvgProps {
  readonly variant: "from" | "to";
  readonly starNumber: 1 | 2 | 3 | 4 | 5;
  readonly filledPetals: number;
  readonly isActiveStar: boolean;
}

function PromotionStarSvg({
  variant,
  starNumber,
  filledPetals,
  isActiveStar,
}: PromotionStarSvgProps): React.JSX.Element {
  const isRedStar = starNumber === 5;
  const gradId = isRedStar
    ? `gear-promo-red-grad-${variant}-${starNumber}`
    : `gear-promo-gold-grad-${variant}-${starNumber}`;
  const glowId = `gear-promo-glow-${variant}-${starNumber}`;

  const strokeActive = isRedStar ? "#991B1B" : "#92400E";
  const centerFill = isRedStar ? "#FECDD3" : "#FEF3C7";
  const centerStroke = isRedStar ? "#E11D48" : "#D97706";

  return (
    <svg
      viewBox="0 0 100 100"
      className={cn(
        "h-8 w-8 sm:h-9 sm:w-9 transition-transform duration-150",
        isActiveStar ? "scale-110" : "scale-100"
      )}
      aria-hidden="true"
    >
      <defs>
        {isRedStar ? (
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FECDD3" />
            <stop offset="45%" stopColor="#EF4444" />
            <stop offset="100%" stopColor="#991B1B" />
          </linearGradient>
        ) : (
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="45%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
        )}
        <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow
            dx="0"
            dy="1"
            stdDeviation="2"
            floodColor={isRedStar ? "#EF4444" : "#F59E0B"}
            floodOpacity="0.45"
          />
        </filter>
      </defs>

      <g filter={filledPetals > 0 ? `url(#${glowId})` : undefined}>
        {PETAL_ANGLES_CCW.map((angle, idx) => {
          const isFilled = idx < filledPetals;
          return (
            <path
              key={angle}
              d={PETAL_PATH_D}
              transform={`rotate(${angle} 50 50)`}
              fill={isFilled ? `url(#${gradId})` : "rgba(148, 163, 184, 0.22)"}
              stroke={isFilled ? strokeActive : "rgba(100, 116, 139, 0.45)"}
              strokeWidth={isFilled ? 2.4 : 1.8}
              strokeLinejoin="round"
            />
          );
        })}

        <circle
          cx="50"
          cy="50"
          r="9"
          fill={filledPetals > 0 ? centerFill : "rgba(148, 163, 184, 0.25)"}
          stroke={filledPetals > 0 ? centerStroke : "rgba(100, 116, 139, 0.45)"}
          strokeWidth="2"
        />
      </g>
    </svg>
  );
}

export function GearPromotionStepSelector({
  label,
  stepIndex,
  onChange,
  setId,
  slotId,
  locale,
  variant,
  testIdPrefix,
}: GearPromotionStepSelectorProps): React.JSX.Element {
  const safeStep = clampGearPromotionStepIndex(stepIndex);
  const currentNode = GEAR_PROMOTION_STEPS[safeStep];
  const nextNode =
    safeStep < MAX_GEAR_PROMOTION_STEP
      ? GEAR_PROMOTION_STEPS[safeStep + 1]
      : null;

  const setMeta = getGearPromotionSetMeta(setId);
  const slotMeta = getGearPromotionSlotMeta(slotId);
  const pieceMeta = setMeta.items[slotId] ?? setMeta.items.boots;
  const stats = getGearPromotionItemStatsAtStep(setId, slotId, safeStep);

  const isTarget = variant === "to";

  const handleDecrement = (): void => {
    onChange(clampGearPromotionStepIndex(safeStep - 1));
  };

  const handleIncrement = (): void => {
    onChange(clampGearPromotionStepIndex(safeStep + 1));
  };

  const handleStarButtonClick = (starNumber: 1 | 2 | 3 | 4 | 5): void => {
    const starStart = (starNumber - 1) * 5 + 1;
    const starEnd = starNumber * 5;
    if (safeStep >= starStart && safeStep < starEnd) {
      onChange(safeStep + 1);
      return;
    }
    if (safeStep === starEnd) {
      onChange(starStart);
      return;
    }
    onChange(starEnd);
  };

  return (
    <section
      data-testid={`${testIdPrefix}-container`}
      className={cn(
        CALC_MD3.surfaceCard,
        "flex h-full flex-col justify-between space-y-4 transition-colors",
        stats.isMythicAscended
          ? "ring-2 ring-rose-500/40"
          : isTarget
            ? "ring-1 ring-amber-500/30"
            : ""
      )}
    >
      {/* 1. Header: Title + Current Step Badge */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "inline-flex items-center rounded-lg px-2.5 py-0.5 font-sans text-xs font-bold",
                stats.isMythicAscended
                  ? "bg-rose-500/15 text-rose-700 dark:text-rose-300"
                  : isTarget
                    ? "bg-amber-500/15 text-amber-800 dark:text-amber-300"
                    : "bg-slate-200/80 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
              )}
            >
              {label}
            </span>
            <span className="truncate font-sans text-xs font-medium text-muted-foreground">
              {slotMeta.label[locale]} • {pieceMeta.itemName[locale]}
            </span>
          </div>
          <p className="mt-1.5 font-sans text-sm font-bold text-foreground">
            {currentNode.label[locale]}
          </p>
        </div>

        <div
          data-testid={`${testIdPrefix}-value`}
          className={cn(
            "flex min-h-[44px] items-center gap-2 rounded-xl px-3 py-1.5",
            stats.isMythicAscended
              ? "bg-rose-500/15 text-rose-700 dark:text-rose-300"
              : "bg-slate-100 text-foreground dark:bg-slate-800/80"
          )}
        >
          <span className="font-sans text-xs font-bold">
            {currentNode.shortLabel[locale]}
          </span>
          <span className="font-mono text-sm font-black tabular-nums">
            {safeStep}/25
          </span>
        </div>
      </div>

      {/* 2. 5-Star × 5-Petal Visual Bar (4 Gold Stars + 1 Red Star) + 0★ Reset Button */}
      <div className="rounded-2xl bg-slate-50/90 p-3 ring-1 ring-slate-200/70 dark:bg-slate-800/50 dark:ring-slate-700/60">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="font-sans text-xs font-semibold text-muted-foreground">
            {locale === "vi"
              ? "4 Ngôi Sao Vàng (1★–4★) + 1 Ngôi Sao Đỏ (5★):"
              : "4 Gold Stars (1★–4★) + 1 Red Star (5★):"}
          </span>
          <span className="font-mono text-xs font-bold text-amber-600 tabular-nums dark:text-amber-400">
            {currentNode.star === 0
              ? "0★"
              : `${currentNode.star}★ (${currentNode.petal}/5)`}
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-1.5">
          <button
            type="button"
            data-testid={`${testIdPrefix}-star-0`}
            onClick={() => onChange(0)}
            className={cn(
              "inline-flex min-h-[44px] min-w-[44px] flex-col items-center justify-center rounded-xl px-2.5 py-1 transition-colors cursor-pointer",
              safeStep === 0
                ? "bg-amber-500 font-bold text-slate-950 shadow-sm"
                : "bg-background/80 text-muted-foreground hover:bg-background hover:text-foreground"
            )}
          >
            <span className="font-mono text-xs font-black tabular-nums">0★</span>
            <span className="font-sans text-xs">
              {locale === "vi" ? "Gốc" : "Base"}
            </span>
          </button>

          {STAR_NUMBERS.map((starNum) => {
            const starStart = (starNum - 1) * 5 + 1;
            const filledPetals = Math.max(
              0,
              Math.min(5, safeStep - (starStart - 1))
            );
            const isActiveStar = currentNode.star === starNum;
            const isRed = starNum === 5;

            return (
              <button
                key={starNum}
                type="button"
                data-testid={`${testIdPrefix}-star-${starNum}`}
                onClick={() => handleStarButtonClick(starNum)}
                title={
                  locale === "vi"
                    ? `Chọn Sao ${starNum}★ (${isRed ? "Đỏ" : "Vàng"})`
                    : `Select ${starNum}★ (${isRed ? "Red" : "Gold"})`
                }
                className={cn(
                  "group relative inline-flex min-h-[44px] flex-1 flex-col items-center justify-center rounded-xl px-1.5 py-1 transition-colors cursor-pointer",
                  isActiveStar
                    ? isRed
                      ? "bg-rose-500/15 ring-1 ring-rose-500/50"
                      : "bg-amber-500/15 ring-1 ring-amber-500/50"
                    : "bg-background/60 hover:bg-background"
                )}
              >
                <PromotionStarSvg
                  variant={variant}
                  starNumber={starNum}
                  filledPetals={filledPetals}
                  isActiveStar={isActiveStar}
                />
                <span
                  className={cn(
                    "mt-0.5 font-mono text-xs font-bold tabular-nums",
                    isRed
                      ? "text-rose-600 dark:text-rose-400"
                      : "text-amber-700 dark:text-amber-300"
                  )}
                >
                  {starNum}★
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Petal Slider (0..25) + [-]/[+] Stepper Buttons */}
      <div className="space-y-2">
        <div className="flex items-center gap-2.5">
          <CalculatorStepperButton
            direction="decrease"
            testId={`${testIdPrefix}-minus`}
            ariaLabel={
              locale === "vi"
                ? `Giảm ${label} 1 cánh sao`
                : `Decrease ${label} by 1 petal`
            }
            disabled={safeStep <= MIN_GEAR_PROMOTION_STEP}
            onClick={handleDecrement}
          />

          <div className="flex-1 space-y-1">
            <input
              type="range"
              min={MIN_GEAR_PROMOTION_STEP}
              max={MAX_GEAR_PROMOTION_STEP}
              step={1}
              value={safeStep}
              aria-label={label}
              data-testid={`${testIdPrefix}-slider`}
              onChange={(e) =>
                onChange(clampGearPromotionStepIndex(Number(e.target.value)))
              }
              className={cn(
                "h-2.5 w-full cursor-pointer appearance-none rounded-full bg-slate-200 dark:bg-slate-700",
                stats.isMythicAscended ? "accent-rose-500" : "accent-amber-500"
              )}
            />
            <div className="flex justify-between font-mono text-xs text-muted-foreground tabular-nums">
              <span>0★</span>
              <span>1★</span>
              <span>2★</span>
              <span>3★</span>
              <span>4★</span>
              <span className="font-bold text-rose-600 dark:text-rose-400">
                5★
              </span>
            </div>
          </div>

          <CalculatorStepperButton
            direction="increase"
            testId={`${testIdPrefix}-plus`}
            ariaLabel={
              locale === "vi"
                ? `Tăng ${label} 1 cánh sao`
                : `Increase ${label} by 1 petal`
            }
            disabled={safeStep >= MAX_GEAR_PROMOTION_STEP}
            onClick={handleIncrement}
          />
        </div>
      </div>

      {/* 4. Equipment Attributes & Mythic +10% Status Box */}
      <div className="space-y-2 rounded-2xl bg-slate-50/90 p-3 ring-1 ring-slate-200/70 dark:bg-slate-800/50 dark:ring-slate-700/60">
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-xl bg-background/80 px-2.5 py-2">
            <p className="font-sans text-xs text-muted-foreground">
              {locale === "vi" ? "ATK Trang Bị" : "Equip ATK"}
            </p>
            <p className="mt-0.5 font-mono text-sm font-bold text-foreground tabular-nums">
              {formatExactNumber(stats.totalAtk)}
            </p>
          </div>

          <div className="rounded-xl bg-background/80 px-2.5 py-2">
            <p className="font-sans text-xs text-muted-foreground">
              {locale === "vi" ? "HP Trang Bị" : "Equip HP"}
            </p>
            <p className="mt-0.5 font-mono text-sm font-bold text-foreground tabular-nums">
              {formatExactNumber(stats.totalHp)}
            </p>
          </div>

          <div className="rounded-xl bg-background/80 px-2.5 py-2">
            <p className="truncate font-sans text-xs text-muted-foreground">
              {stats.bonusStatLabel[locale]}
            </p>
            <p className="mt-0.5 font-mono text-sm font-bold text-amber-600 tabular-nums dark:text-amber-400">
              +{stats.bonusStatValue}
            </p>
          </div>
        </div>

        <div
          className={cn(
            "flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-xs",
            stats.isMythicAscended
              ? "bg-rose-500/15 text-rose-700 dark:text-rose-300"
              : "bg-background/70 text-muted-foreground"
          )}
        >
          <span className="flex items-center gap-1.5 font-sans font-semibold">
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-rose-500" />
            <span>{stats.mythicBaseBonusLabel[locale]}</span>
          </span>
          <span className="font-mono font-bold tabular-nums">+10%</span>
        </div>
      </div>

      {/* 5. Next Petal Cost Preview */}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-slate-100/80 px-3 py-2 dark:bg-slate-800/60">
        <span className="font-sans text-xs font-medium text-muted-foreground">
          {nextNode
            ? locale === "vi"
              ? `Chi phí lên cánh ${nextNode.stepIndex}/25:`
              : `Next petal (${nextNode.stepIndex}/25) cost:`
            : locale === "vi"
              ? "Đã đạt đỉnh Hóa Đỏ 5★:"
              : "Max 5★ Mythic Red reached:"}
        </span>

        {nextNode ? (
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-foreground tabular-nums">
              <Image
                src={CALCULATOR_MATERIALS.solarGoldIngot.iconPath}
                alt="Solar Gold"
                width={16}
                height={16}
                className="h-4 w-4 object-contain"
              />
              {formatCompactNumber(nextNode.stepSolarGold)}
            </span>

            <span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-foreground tabular-nums">
              <Image
                src={CALCULATOR_MATERIALS.gearEnhanceRune.iconPath}
                alt="Rune"
                width={16}
                height={16}
                className="h-4 w-4 object-contain"
              />
              {formatCompactNumber(nextNode.stepEnhanceRune)}
            </span>

            {nextNode.stepRuby > 0 ? (
              <span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-rose-600 tabular-nums dark:text-rose-400">
                <Image
                  src={CALCULATOR_MATERIALS.ruby.iconPath}
                  alt="Ruby"
                  width={16}
                  height={16}
                  className="h-4 w-4 object-contain"
                />
                {formatCompactNumber(nextNode.stepRuby)}
              </span>
            ) : null}

            {nextNode.stepLegendaryStone > 0 ? (
              <span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-amber-600 tabular-nums dark:text-amber-400">
                <Image
                  src={CALCULATOR_MATERIALS.legendaryPromotionStone.iconPath}
                  alt="Legendary Stone"
                  width={16}
                  height={16}
                  className="h-4 w-4 object-contain"
                />
                {nextNode.stepLegendaryStone}
              </span>
            ) : null}

            {nextNode.stepMythicStone > 0 ? (
              <span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-rose-600 tabular-nums dark:text-rose-400">
                <Image
                  src={CALCULATOR_MATERIALS.mythicPromotionStone.iconPath}
                  alt="Mythic Stone"
                  width={16}
                  height={16}
                  className="h-4 w-4 object-contain"
                />
                {nextNode.stepMythicStone}
              </span>
            ) : null}
          </div>
        ) : (
          <span className="font-mono text-xs font-bold text-rose-600 tabular-nums dark:text-rose-400">
            25/25 MAX
          </span>
        )}
      </div>
    </section>
  );
}

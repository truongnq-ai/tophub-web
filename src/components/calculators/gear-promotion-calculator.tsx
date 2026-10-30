"use client";

import Image from "next/image";
import React, { useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  Layers,
  RotateCcw,
  Sparkles,
  Swords,
} from "lucide-react";
import {
  BASE_LV40_ENHANCE_MEAT_PER_PIECE,
  BASE_LV40_ENHANCE_RUNES_PER_PIECE,
  GEAR_GOLDEN_SETS,
  MYTHIC_MASTER_ATTRIBUTE_TIERS,
  calculateGearPromotion,
  type GearGoldenSetId,
} from "@/content/calculators/gear-promotion-data";
import type {
  CalculatorCategory,
  CalculatorLocale,
  CalculatorToolItem,
  CalculatorZone,
} from "@/content/calculators/types";
import { cn } from "@/lib/utils";
import {
  CALC_MD3,
  CalculatorMetricValue,
  CalculatorStepperButton,
  CalculatorToolHeader,
} from "./calculator-md3-primitives";
import { GearPromotionStepSelector } from "./gear-promotion-step-selector";

export interface GearPromotionCalculatorProps {
  readonly zone?: CalculatorZone;
  readonly category?: CalculatorCategory;
  readonly tool: CalculatorToolItem;
  readonly locale?: CalculatorLocale;
}

const GOLDEN_SET_IDS: readonly GearGoldenSetId[] = [
  "fury_of_blood",
  "titans_might",
  "glorious_light",
];

const PIECE_COUNT_PRESETS: readonly {
  readonly count: number;
  readonly label: Record<CalculatorLocale, string>;
}[] = [
  {
    count: 1,
    label: { vi: "1 Món lẻ (×1)", en: "1 Piece (×1)" },
  },
  {
    count: 4,
    label: { vi: "1 Tướng • 4 Món (×4)", en: "1 Hero • 4 Pieces (×4)" },
  },
  {
    count: 8,
    label: { vi: "2 Tướng • 8 Món (×8)", en: "2 Heroes • 8 Pieces (×8)" },
  },
  {
    count: 12,
    label: { vi: "3 Tướng • 12 Món (×12)", en: "3 Heroes • 12 Pieces (×12)" },
  },
  {
    count: 24,
    label: { vi: "Đội 1 • 24 Món (×24)", en: "Queue 1 • 24 Pieces (×24)" },
  },
];

function parseNonNegativeInt(raw: string): number {
  const cleaned = raw.replace(/[^\d]/g, "");
  if (!cleaned) return 0;
  const parsed = Number.parseInt(cleaned, 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function formatCompactCount(val: number): string {
  if (val >= 1_000_000) {
    return `${(val / 1_000_000).toFixed(2).replace(/\.?0+$/, "")}M`;
  }
  if (val >= 10_000) {
    return `${(val / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  }
  return val.toLocaleString("en-US");
}

export function GearPromotionCalculator({
  tool,
  locale = "vi",
}: GearPromotionCalculatorProps) {
  const [goldenSetId, setGoldenSetId] =
    useState<GearGoldenSetId>("fury_of_blood");
  const [pieceCount, setPieceCount] = useState<number>(4);
  const [fromStepIndex, setFromStepIndex] = useState<number>(0);
  const [toStepIndex, setToStepIndex] = useState<number>(25);
  const [includeBaseLv40Enhance, setIncludeBaseLv40Enhance] =
    useState<boolean>(false);

  const [ownedSolarGoldInput, setOwnedSolarGoldInput] = useState<string>("0");
  const [ownedRunesInput, setOwnedRunesInput] = useState<string>("0");
  const [ownedLegStonesInput, setOwnedLegStonesInput] = useState<string>("0");
  const [ownedMythStonesInput, setOwnedMythStonesInput] = useState<string>("0");
  const [ownedMeatInput, setOwnedMeatInput] = useState<string>("0");

  const ownedSolarGold = useMemo(
    () => parseNonNegativeInt(ownedSolarGoldInput),
    [ownedSolarGoldInput]
  );
  const ownedRunes = useMemo(
    () => parseNonNegativeInt(ownedRunesInput),
    [ownedRunesInput]
  );
  const ownedLegendaryStones = useMemo(
    () => parseNonNegativeInt(ownedLegStonesInput),
    [ownedLegStonesInput]
  );
  const ownedMythicStones = useMemo(
    () => parseNonNegativeInt(ownedMythStonesInput),
    [ownedMythStonesInput]
  );
  const ownedMeat = useMemo(
    () => parseNonNegativeInt(ownedMeatInput),
    [ownedMeatInput]
  );

  const result = useMemo(
    () =>
      calculateGearPromotion({
        fromStepIndex,
        toStepIndex,
        pieceCount,
        goldenSetId,
        includeBaseLv40Enhance,
        ownedSolarGold,
        ownedRunes,
        ownedLegendaryStones,
        ownedMythicStones,
        ownedMeat,
      }),
    [
      fromStepIndex,
      toStepIndex,
      pieceCount,
      goldenSetId,
      includeBaseLv40Enhance,
      ownedSolarGold,
      ownedRunes,
      ownedLegendaryStones,
      ownedMythicStones,
      ownedMeat,
    ]
  );

  const handleReset = () => {
    setGoldenSetId("fury_of_blood");
    setPieceCount(4);
    setFromStepIndex(0);
    setToStepIndex(25);
    setIncludeBaseLv40Enhance(false);
    setOwnedSolarGoldInput("0");
    setOwnedRunesInput("0");
    setOwnedLegStonesInput("0");
    setOwnedMythStonesInput("0");
    setOwnedMeatInput("0");
  };

  const solarGoldName =
    locale === "vi"
      ? result.solarGoldMaterial.nameVi
      : result.solarGoldMaterial.nameEn;
  const runeName =
    locale === "vi" ? result.runeMaterial.nameVi : result.runeMaterial.nameEn;
  const legStoneName =
    locale === "vi"
      ? result.legendaryStoneMaterial.nameVi
      : result.legendaryStoneMaterial.nameEn;
  const mythStoneName =
    locale === "vi"
      ? result.mythicStoneMaterial.nameVi
      : result.mythicStoneMaterial.nameEn;
  const meatName =
    locale === "vi" ? result.meatMaterial.nameVi : result.meatMaterial.nameEn;

  return (
    <div data-testid="gear-promotion-calculator" className="space-y-4">
      {/* 1. Flat MD3 Tool Header + Piece Presets */}
      <CalculatorToolHeader
        code={tool.code}
        title={tool.title[locale].replace(`${tool.code} `, "")}
        actions={
          <>
            {PIECE_COUNT_PRESETS.map((preset) => {
              const isActive = pieceCount === preset.count;
              return (
                <button
                  key={preset.count}
                  type="button"
                  data-testid={`piece-preset-${preset.count}`}
                  aria-pressed={isActive}
                  onClick={() => setPieceCount(preset.count)}
                  className={cn(
                    CALC_MD3.chipButton,
                    "font-sans",
                    isActive
                      ? "bg-amber-500 font-bold text-slate-950"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <span>{preset.label[locale]}</span>
                </button>
              );
            })}

            <button
              type="button"
              onClick={handleReset}
              data-testid="reset-gear-promotion"
              className={cn(
                CALC_MD3.chipButton,
                "bg-muted/50 font-sans text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <RotateCcw className="h-4 w-4 text-amber-500" aria-hidden="true" />
              <span>{locale === "vi" ? "Đặt lại" : "Reset"}</span>
            </button>
          </>
        }
      />

      {/* Main 12-Column Grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Left Column (7 cols): Golden Set, Piece Count, 25-Step Selectors & Owned Inputs */}
        <div className="space-y-4 lg:col-span-7">
          {/* Card 1: Golden Set Evolution & Piece Count */}
          <section className={cn(CALC_MD3.surfaceCard, "space-y-4")}>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <h2 className={CALC_MD3.sectionTitle}>
                  {locale === "vi"
                    ? "1. Bộ Hoàng Kim & Tiến Hóa Thần Thoại"
                    : "1. Golden Set & Mythic Evolution"}
                </h2>
                <span className="font-sans text-xs text-muted-foreground">
                  {locale === "vi"
                    ? "+20% ➔ +30% Ấn Phe"
                    : "+20% ➔ +30% Faction Mark"}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {GOLDEN_SET_IDS.map((id) => {
                  const cfg = GEAR_GOLDEN_SETS[id];
                  const isActive = goldenSetId === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      data-testid={`golden-set-btn-${id}`}
                      onClick={() => setGoldenSetId(id)}
                      className={cn(
                        "flex min-h-[44px] items-center gap-2.5 rounded-xl px-3 py-2.5 text-left transition-colors",
                        isActive
                          ? "bg-amber-500 font-bold text-slate-950"
                          : "bg-muted/40 text-foreground hover:bg-muted/70"
                      )}
                    >
                      <Image
                        src={cfg.iconPath}
                        alt={cfg.mythicName[locale]}
                        width={36}
                        height={36}
                        className="h-9 w-9 shrink-0 rounded-lg object-contain"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-sans text-xs font-bold">
                          {cfg.mythicName[locale]}
                        </p>
                        <p
                          className={cn(
                            "truncate font-sans text-xs",
                            isActive
                              ? "text-slate-900/85"
                              : "text-muted-foreground"
                          )}
                        >
                          {cfg.roleLabel[locale]}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active Golden Set Evolution Summary */}
              <div className={cn(CALC_MD3.tonalGroup, "space-y-1")}>
                <p className="font-sans text-xs font-semibold text-foreground">
                  {result.goldenSet.legendaryName[locale]}{" "}
                  <span className="text-amber-500">➔</span>{" "}
                  <span className="text-rose-600 dark:text-rose-400">
                    {result.goldenSet.mythicName[locale]}
                  </span>
                </p>
                <p className="font-sans text-xs text-muted-foreground">
                  {result.goldenSet.specialEffect[locale]}
                </p>
              </div>
            </div>

            {/* Piece Count Stepper */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className={CALC_MD3.sectionTitle}>
                  {locale === "vi"
                    ? "2. Số Lượng Món Trang Bị Cần Đột Phá"
                    : "2. Number of Gear Pieces to Promote"}
                </h2>
                <p className="font-sans text-xs text-muted-foreground">
                  {locale === "vi"
                    ? "Hỗ trợ từ 1 món lẻ đến 24 món của Đội 1 (6 tướng)"
                    : "Supports 1 single piece up to 24 pieces for Queue 1 (6 heroes)"}
                </p>
              </div>

              <div className="flex items-center gap-1.5">
                <CalculatorStepperButton
                  direction="decrease"
                  testId="piece-count-minus"
                  ariaLabel={
                    locale === "vi" ? "Giảm số món" : "Decrease piece count"
                  }
                  disabled={pieceCount <= 1}
                  onClick={() => setPieceCount((p) => Math.max(1, p - 1))}
                />
                <div className="flex min-h-[44px] min-w-16 items-center justify-center rounded-xl bg-muted/40 px-3 font-mono text-sm font-bold text-foreground tabular-nums">
                  ×{pieceCount}
                </div>
                <CalculatorStepperButton
                  direction="increase"
                  testId="piece-count-plus"
                  ariaLabel={
                    locale === "vi" ? "Tăng số món" : "Increase piece count"
                  }
                  disabled={pieceCount >= 24}
                  onClick={() => setPieceCount((p) => Math.min(24, p + 1))}
                />
              </div>
            </div>

            {/* Optional Prerequisite Toggle: Include Base Lv.0 -> Lv.40 Enhancement */}
            <div className={cn(CALC_MD3.tonalGroup)}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="font-sans text-xs font-semibold text-foreground">
                    {locale === "vi"
                      ? "Cộng gộp chi phí Cường Hóa Gốc Lv.0 ➔ Lv.40 (Điều kiện mở Đột Phá)"
                      : "Include Base Lv.0 ➔ Lv.40 Enhancement Prerequisite"}
                  </p>
                  <p className="mt-0.5 font-sans text-xs text-muted-foreground">
                    {locale === "vi" ? "Cộng thêm +" : "Adds +"}
                    <span className="font-mono font-semibold text-foreground">
                      {(
                        BASE_LV40_ENHANCE_RUNES_PER_PIECE * pieceCount
                      ).toLocaleString("en-US")}
                    </span>{" "}
                    {locale === "vi" ? "Rune & +" : "Runes & +"}
                    <span className="font-mono font-semibold text-foreground">
                      {formatCompactCount(
                        BASE_LV40_ENHANCE_MEAT_PER_PIECE * pieceCount
                      )}
                    </span>{" "}
                    {locale === "vi" ? "Thịt" : "Meat"}
                  </p>
                </div>

                <button
                  type="button"
                  data-testid="toggle-base-lv40-enhance"
                  aria-pressed={includeBaseLv40Enhance}
                  onClick={() => setIncludeBaseLv40Enhance((prev) => !prev)}
                  className={cn(
                    CALC_MD3.chipButton,
                    "font-sans",
                    includeBaseLv40Enhance
                      ? "bg-amber-500 font-bold text-slate-950"
                      : "bg-background/80 text-foreground hover:bg-background"
                  )}
                >
                  <Layers className="h-3.5 w-3.5" />
                  <span>
                    {includeBaseLv40Enhance
                      ? locale === "vi"
                        ? "Đang cộng gộp (+Lv.40)"
                        : "Included (+Lv.40)"
                      : locale === "vi"
                        ? "Chỉ tính Đột Phá"
                        : "Promotion Only"}
                  </span>
                </button>
              </div>
            </div>
          </section>

          {/* Card 2: 25-Step Promotion Selectors (From -> To) */}
          <section className={cn(CALC_MD3.surfaceCard, "space-y-4")}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className={CALC_MD3.sectionTitle}>
                {locale === "vi"
                  ? "3. Mốc Đột Phá Hiện Tại ➔ Mốc Mục Tiêu (0★ Cam ➔ 5★ Đỏ)"
                  : "3. Current Promotion Step ➔ Target Step (0★ Leg ➔ 5★ Mythic)"}
              </h2>
              <span className="font-sans text-xs text-muted-foreground">
                {locale === "vi"
                  ? "Mỗi Sao gồm 5 Tiểu bậc (Tiểu bậc 5/5 cần Đá Đột Phá)"
                  : "Each Star has 5 Sub-tiers (Tier 5/5 requires Promotion Stones)"}
              </span>
            </div>

            <div className="space-y-3">
              <GearPromotionStepSelector
                label={
                  locale === "vi"
                    ? "Bậc hiện tại (Khởi điểm)"
                    : "Current Promotion Step"
                }
                badgeText={locale === "vi" ? "TỪ" : "FROM"}
                stepIndex={fromStepIndex}
                onChange={setFromStepIndex}
                locale={locale}
                testIdPrefix="promo-from-step"
              />

              <GearPromotionStepSelector
                label={
                  locale === "vi"
                    ? "Bậc mục tiêu (Đích đến)"
                    : "Target Promotion Step"
                }
                badgeText={locale === "vi" ? "ĐẾN" : "TO"}
                stepIndex={toStepIndex}
                onChange={setToStepIndex}
                locale={locale}
                testIdPrefix="promo-to-step"
              />
            </div>

            {result.isInvalidRange ? (
              <div
                role="alert"
                data-testid="promo-invalid-range-warning"
                className="flex items-start gap-2.5 rounded-xl bg-amber-500/12 p-3 text-amber-700 dark:text-amber-300"
              >
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                <p className="font-sans text-xs leading-relaxed">
                  {locale === "vi"
                    ? "Mốc mục tiêu đang thấp hơn mốc hiện tại. Chi phí hiển thị bằng 0 — hãy nâng Mốc mục tiêu cao hơn Mốc hiện tại."
                    : "Target step is lower than current step. Required materials are set to 0 — please select a higher target step."}
                </p>
              </div>
            ) : null}
          </section>

          {/* Card 3: Owned Inventory Inputs */}
          <section className={cn(CALC_MD3.surfaceCard, "space-y-4")}>
            <div className="flex items-center justify-between gap-2">
              <h2 className={CALC_MD3.sectionTitle}>
                {locale === "vi"
                  ? "4. Tài Nguyên Đang Có Trong Túi Đồ"
                  : "4. Owned Promotion Materials in Inventory"}
              </h2>
              <span className="font-sans text-xs text-muted-foreground">
                {locale === "vi" ? "Trừ tự động" : "Auto-deducted"}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {/* Solar Gold Ingot */}
              <div className={cn(CALC_MD3.tonalGroup, "space-y-2")}>
                <label
                  htmlFor="owned-solar-gold"
                  className="flex items-center gap-2 font-sans text-xs font-semibold text-foreground"
                >
                  <Image
                    src={result.solarGoldMaterial.iconPath}
                    alt={solarGoldName}
                    width={22}
                    height={22}
                    className="h-5 w-5 object-contain"
                  />
                  <span>{solarGoldName}</span>
                </label>
                <input
                  id="owned-solar-gold"
                  data-testid="owned-solar-gold-input"
                  type="text"
                  inputMode="numeric"
                  value={ownedSolarGoldInput}
                  onChange={(e) => setOwnedSolarGoldInput(e.target.value)}
                  className={cn(
                    CALC_MD3.dataInput,
                    "w-full bg-background px-3 text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                  )}
                />
              </div>

              {/* Gear Enhance Rune */}
              <div className={cn(CALC_MD3.tonalGroup, "space-y-2")}>
                <label
                  htmlFor="owned-promo-runes"
                  className="flex items-center gap-2 font-sans text-xs font-semibold text-foreground"
                >
                  <Image
                    src={result.runeMaterial.iconPath}
                    alt={runeName}
                    width={22}
                    height={22}
                    className="h-5 w-5 object-contain"
                  />
                  <span>{runeName}</span>
                </label>
                <input
                  id="owned-promo-runes"
                  data-testid="owned-promo-runes-input"
                  type="text"
                  inputMode="numeric"
                  value={ownedRunesInput}
                  onChange={(e) => setOwnedRunesInput(e.target.value)}
                  className={cn(
                    CALC_MD3.dataInput,
                    "w-full bg-background px-3 text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                  )}
                />
              </div>

              {/* Legendary Promotion Stone */}
              <div className={cn(CALC_MD3.tonalGroup, "space-y-2")}>
                <label
                  htmlFor="owned-leg-stones"
                  className="flex items-center gap-2 font-sans text-xs font-semibold text-foreground"
                >
                  <Image
                    src={result.legendaryStoneMaterial.iconPath}
                    alt={legStoneName}
                    width={22}
                    height={22}
                    className="h-5 w-5 object-contain"
                  />
                  <span>{legStoneName}</span>
                </label>
                <input
                  id="owned-leg-stones"
                  data-testid="owned-leg-stones-input"
                  type="text"
                  inputMode="numeric"
                  value={ownedLegStonesInput}
                  onChange={(e) => setOwnedLegStonesInput(e.target.value)}
                  className={cn(
                    CALC_MD3.dataInput,
                    "w-full bg-background px-3 text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                  )}
                />
              </div>

              {/* Mythic Promotion Stone */}
              <div className={cn(CALC_MD3.tonalGroup, "space-y-2")}>
                <label
                  htmlFor="owned-myth-stones"
                  className="flex items-center gap-2 font-sans text-xs font-semibold text-foreground"
                >
                  <Image
                    src={result.mythicStoneMaterial.iconPath}
                    alt={mythStoneName}
                    width={22}
                    height={22}
                    className="h-5 w-5 object-contain"
                  />
                  <span>{mythStoneName}</span>
                </label>
                <input
                  id="owned-myth-stones"
                  data-testid="owned-myth-stones-input"
                  type="text"
                  inputMode="numeric"
                  value={ownedMythStonesInput}
                  onChange={(e) => setOwnedMythStonesInput(e.target.value)}
                  className={cn(
                    CALC_MD3.dataInput,
                    "w-full bg-background px-3 text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                  )}
                />
              </div>
            </div>
          </section>
        </div>

        {/* Right Column (5 cols): Material KPIs, 5-Star Breakdown & 18-Tier Mythic Attributes */}
        <div className="space-y-4 lg:col-span-5">
          {/* KPI Summary Card */}
          <section
            data-testid="gear-promotion-kpi-card"
            className={cn(CALC_MD3.surfaceCard, "space-y-4")}
          >
            <div className="flex items-center justify-between gap-2">
              <h2 className={CALC_MD3.sectionTitle}>
                {locale === "vi"
                  ? "Tổng Nguyên Liệu Đột Phá"
                  : "Total Required Promotion Materials"}
              </h2>
              <span className="inline-flex items-center rounded-full bg-amber-500/15 px-2.5 py-0.5 font-sans text-xs font-semibold text-amber-700 dark:text-amber-300">
                ×{result.pieceCount} {locale === "vi" ? "món" : "pcs"}
              </span>
            </div>

            {/* Primary Hero KPI: Solar Gold Ingot & Runes */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className={cn(CALC_MD3.tonalGroup, "space-y-1.5")}>
                <div className="flex items-center gap-2">
                  <Image
                    src={result.solarGoldMaterial.iconPath}
                    alt={solarGoldName}
                    width={26}
                    height={26}
                    className="h-6 w-6 object-contain"
                  />
                  <span className="font-sans text-xs font-semibold text-muted-foreground">
                    {solarGoldName}
                  </span>
                </div>
                <CalculatorMetricValue
                  testId="promo-total-solar-gold"
                  value={result.requiredSolarGold.toLocaleString("en-US")}
                  toneClassName="text-amber-600 dark:text-amber-400"
                />
                <p className="font-sans text-xs text-muted-foreground">
                  {locale === "vi" ? "Còn thiếu:" : "Missing:"}{" "}
                  <span className="font-mono font-semibold text-foreground">
                    {result.missingSolarGold.toLocaleString("en-US")}
                  </span>
                </p>
              </div>

              <div className={cn(CALC_MD3.tonalGroup, "space-y-1.5")}>
                <div className="flex items-center gap-2">
                  <Image
                    src={result.runeMaterial.iconPath}
                    alt={runeName}
                    width={26}
                    height={26}
                    className="h-6 w-6 object-contain"
                  />
                  <span className="font-sans text-xs font-semibold text-muted-foreground">
                    {runeName}
                  </span>
                </div>
                <CalculatorMetricValue
                  testId="promo-total-runes"
                  value={result.requiredRunes.toLocaleString("en-US")}
                />
                <p className="font-sans text-xs text-muted-foreground">
                  {locale === "vi" ? "Còn thiếu:" : "Missing:"}{" "}
                  <span className="font-mono font-semibold text-foreground">
                    {result.missingRunes.toLocaleString("en-US")}
                  </span>
                </p>
              </div>
            </div>

            {/* Secondary KPIs: Legendary Stones, Mythic Stones, Meat, Fodder */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className={cn(CALC_MD3.tonalGroup, "space-y-1")}>
                <div className="flex items-center gap-2">
                  <Image
                    src={result.legendaryStoneMaterial.iconPath}
                    alt={legStoneName}
                    width={20}
                    height={20}
                    className="h-5 w-5 object-contain"
                  />
                  <span className="truncate font-sans text-xs font-semibold text-foreground">
                    {legStoneName}
                  </span>
                </div>
                <p
                  data-testid="promo-total-leg-stones"
                  className="font-mono text-lg font-bold text-amber-600 tabular-nums dark:text-amber-400"
                >
                  {result.requiredLegendaryStones.toLocaleString("en-US")}
                </p>
                <p className="font-sans text-xs text-muted-foreground">
                  {locale === "vi" ? "Thiếu:" : "Missing:"}{" "}
                  <span className="font-mono font-semibold text-foreground">
                    {result.missingLegendaryStones.toLocaleString("en-US")}
                  </span>
                </p>
              </div>

              <div className={cn(CALC_MD3.tonalGroup, "space-y-1")}>
                <div className="flex items-center gap-2">
                  <Image
                    src={result.mythicStoneMaterial.iconPath}
                    alt={mythStoneName}
                    width={20}
                    height={20}
                    className="h-5 w-5 object-contain"
                  />
                  <span className="truncate font-sans text-xs font-semibold text-foreground">
                    {mythStoneName}
                  </span>
                </div>
                <p
                  data-testid="promo-total-mythic-stones"
                  className="font-mono text-lg font-bold text-rose-600 tabular-nums dark:text-rose-400"
                >
                  {result.requiredMythicStones.toLocaleString("en-US")}
                </p>
                <p className="font-sans text-xs text-muted-foreground">
                  {locale === "vi" ? "Thiếu:" : "Missing:"}{" "}
                  <span className="font-mono font-semibold text-foreground">
                    {result.missingMythicStones.toLocaleString("en-US")}
                  </span>
                </p>
              </div>

              <div className={cn(CALC_MD3.tonalGroup, "space-y-1")}>
                <div className="flex items-center gap-2">
                  <Image
                    src={result.meatMaterial.iconPath}
                    alt={meatName}
                    width={20}
                    height={20}
                    className="h-5 w-5 object-contain"
                  />
                  <span className="truncate font-sans text-xs font-semibold text-foreground">
                    {meatName}
                  </span>
                </div>
                <p
                  data-testid="promo-total-meat"
                  className="font-mono text-base font-bold text-foreground tabular-nums"
                >
                  {result.requiredMeat.toLocaleString("en-US")}
                </p>
                <p className="font-sans text-xs text-muted-foreground">
                  {locale === "vi" ? "Tương đương" : "Approx."}{" "}
                  <span className="font-mono font-semibold text-foreground">
                    {formatCompactCount(result.requiredMeat)}
                  </span>
                </p>
              </div>

              <div className={cn(CALC_MD3.tonalGroup, "space-y-1")}>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-amber-500" />
                  <span className="truncate font-sans text-xs font-semibold text-foreground">
                    {locale === "vi"
                      ? "Phôi Trang Bị Cam"
                      : "Legendary Gear Fodder"}
                  </span>
                </div>
                <p
                  data-testid="promo-total-fodder"
                  className="font-mono text-base font-bold text-foreground tabular-nums"
                >
                  {result.requiredLegendaryFodder.toLocaleString("en-US")}
                </p>
                <p className="font-sans text-xs text-muted-foreground">
                  {locale === "vi"
                    ? "1 phôi / mỗi mốc Đột Phá Sao"
                    : "1 fodder per Star Breakthrough"}
                </p>
              </div>
            </div>
          </section>

          {/* 5-Star Bracket Breakdown Card */}
          <section className={cn(CALC_MD3.surfaceCard, "space-y-3")}>
            <div className="flex items-center justify-between gap-2">
              <h2 className={CALC_MD3.sectionTitle}>
                {locale === "vi"
                  ? "Phân Bổ Theo Từng Mốc Sao (×" + result.pieceCount + " món)"
                  : `Breakdown by Star Bracket (×${result.pieceCount} pcs)`}
              </h2>
              <CheckCircle2 className="h-4 w-4 text-amber-500" />
            </div>

            <div className="space-y-2">
              {result.starBreakdown.map((item) => {
                const isMythic = item.rarity === "mythic";
                return (
                  <div
                    key={item.starBracket}
                    className={cn(
                      CALC_MD3.tonalGroup,
                      "flex flex-wrap items-center justify-between gap-2"
                    )}
                  >
                    <div>
                      <p
                        className={cn(
                          "font-sans text-xs font-bold",
                          isMythic
                            ? "text-rose-600 dark:text-rose-400"
                            : "text-foreground"
                        )}
                      >
                        {item.label[locale]}
                      </p>
                      <p className="font-sans text-xs text-muted-foreground">
                        {locale === "vi" ? "Thịt:" : "Meat:"}{" "}
                        <span className="font-mono font-semibold text-foreground">
                          {formatCompactCount(item.totalMeat)}
                        </span>{" "}
                        •{" "}
                        {isMythic
                          ? locale === "vi"
                            ? "Đá Đỏ:"
                            : "Mythic Stones:"
                          : locale === "vi"
                            ? "Đá Cam:"
                            : "Leg Stones:"}{" "}
                        <span className="font-mono font-semibold text-foreground">
                          {isMythic
                            ? item.totalMythicStones
                            : item.totalLegendaryStones}
                        </span>
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-sans text-xs font-semibold text-foreground">
                        <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                          {item.totalSolarGold.toLocaleString("en-US")}
                        </span>{" "}
                        {locale === "vi" ? "Vàng TD" : "Solar Gold"}
                      </p>
                      <p className="font-sans text-xs text-muted-foreground">
                        <span className="font-mono font-semibold text-foreground">
                          {item.totalRunes.toLocaleString("en-US")}
                        </span>{" "}
                        Rune
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 18-Tier Mythic Master Attributes Inspector */}
          <section className={cn(CALC_MD3.surfaceCard, "space-y-3")}>
            <div className="flex items-center justify-between gap-2">
              <div>
                <h2 className={CALC_MD3.sectionTitle}>
                  {locale === "vi"
                    ? "Bảng 18 Mốc Thuộc Tính Đặc Biệt Đồ Đỏ (Mythic)"
                    : "18-Tier Mythic Red Special Attributes Table"}
                </h2>
                <p className="font-sans text-xs text-muted-foreground">
                  {locale === "vi"
                    ? "Phá Giáp (Defense Break) & Giảm CD Tuyệt Kỹ Khởi Đầu / Kẻ Địch"
                    : "Defense Break, Initial Ult CD Reduction & Enemy Ult CD Reduction"}
                </p>
              </div>
              <Swords className="h-4 w-4 text-rose-500" />
            </div>

            <div className="max-h-72 overflow-y-auto rounded-xl bg-muted/40 p-2">
              <table className="w-full text-left font-sans text-xs">
                <thead>
                  <tr className="text-muted-foreground">
                    <th className="px-2 py-1.5 font-semibold">
                      {locale === "vi" ? "Mốc" : "Tier"}
                    </th>
                    <th className="px-2 py-1.5 font-semibold">
                      {locale === "vi" ? "Thuộc tính chính" : "Master Attr"}
                    </th>
                    <th className="px-2 py-1.5 font-semibold">
                      {locale === "vi" ? "Phá Giáp" : "Defense Break"}
                    </th>
                    <th className="px-2 py-1.5 font-semibold">
                      {locale === "vi" ? "Giảm CD Đầu" : "Init Ult CD"}
                    </th>
                    <th className="px-2 py-1.5 font-semibold">
                      {locale === "vi" ? "ATK / HP" : "ATK / HP"}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {MYTHIC_MASTER_ATTRIBUTE_TIERS.map((row) => {
                    const isMilestone =
                      row.tierIndex === 1 ||
                      row.tierIndex === 4 ||
                      row.tierIndex === 7 ||
                      row.tierIndex === 10 ||
                      row.tierIndex === 13 ||
                      row.tierIndex === 18;
                    return (
                      <tr
                        key={row.tierIndex}
                        className={cn(
                          isMilestone
                            ? "bg-amber-500/10 font-semibold text-foreground"
                            : "text-muted-foreground"
                        )}
                      >
                        <td className="px-2 py-1.5 font-mono tabular-nums">
                          #{row.tierIndex}
                        </td>
                        <td className="px-2 py-1.5 font-mono text-amber-600 tabular-nums dark:text-amber-400">
                          {row.masterAttributesPercent}
                        </td>
                        <td className="px-2 py-1.5 font-mono font-bold text-rose-600 tabular-nums dark:text-rose-400">
                          {row.defenseBreak.toLocaleString("en-US")}
                        </td>
                        <td className="px-2 py-1.5 font-mono tabular-nums">
                          {row.initialUltCdReduced}
                        </td>
                        <td className="px-2 py-1.5 font-mono tabular-nums">
                          {row.heroAttackPercent} / {row.heroHpPercent}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className={cn(CALC_MD3.tonalGroup, "flex items-start gap-2.5")}>
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
              <p className="font-sans text-xs leading-relaxed text-muted-foreground">
                {locale === "vi"
                  ? "Mẹo thực chiến: Lên 5★ Đỏ cho Vũ Khí + Giày của tướng DPS chủ lực trước để lấy Phá Giáp (Defense Break) và Giảm CD Tuyệt Kỹ Khởi Đầu, giúp tung chiêu cuối sớm hơn đối thủ trong Đấu Trường."
                  : "Pro Tip: Ascend Weapon + Boots to 5★ Mythic Red on your main DPS carry first to unlock Defense Break and Initial Ultimate Skill Cooldown Reduction in Arena."}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

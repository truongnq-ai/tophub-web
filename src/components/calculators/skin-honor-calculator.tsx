"use client";

import React, { useMemo, useState } from "react";
import {
  ArrowLeftRight,
  Award,
  CheckCircle2,
  AlertTriangle,
  Layers,
  RotateCcw,
  Shield,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import {
  calculateSkinHonorProgression,
  type SkinHonorRosterCounts,
} from "@/content/calculators/skin-honor-data";
import {
  GLORY_MEDAL_MATERIAL,
  TROOP_SKIN_RARITIES,
  TROOP_SKIN_RARITY_ORDER,
  type TroopSkinRarity,
} from "@/content/calculators/troop-skins-data";
import type {
  CalculatorCategory,
  CalculatorLocale,
  CalculatorToolItem,
  CalculatorZone,
} from "@/content/calculators/types";
import { GameAssetFrame } from "@/components/guides/media/game-asset-frame";
import { Input } from "@/components/ui/input";
import {
  cn,
  formatCompactNumber,
  formatExactNumber,
  parseCompactNumberInput,
} from "@/lib/utils";
import { SkinHonorSelector } from "./skin-honor-selector";
import {
  CALC_MD3,
  CalculatorMetricValue,
  CalculatorToolHeader,
} from "./calculator-md3-primitives";

export interface SkinHonorCalculatorProps {
  readonly zone?: CalculatorZone;
  readonly category: CalculatorCategory;
  readonly tool: CalculatorToolItem;
  readonly locale: CalculatorLocale;
}

const HONOR_JOURNEY_PRESETS: ReadonlyArray<{
  readonly id: string;
  readonly labelVi: string;
  readonly labelEn: string;
  readonly fromHonor: number;
  readonly toHonor: number;
}> = [
  {
    id: "0-25",
    labelVi: "Lv.0 ➔ Lv.25",
    labelEn: "Lv.0 to Lv.25",
    fromHonor: 0,
    toHonor: 25,
  },
  {
    id: "0-50",
    labelVi: "Lv.0 ➔ Lv.50",
    labelEn: "Lv.0 to Lv.50",
    fromHonor: 0,
    toHonor: 50,
  },
  {
    id: "0-100",
    labelVi: "Lv.0 ➔ Lv.100 (Bậc 1)",
    labelEn: "Lv.0 to Lv.100 (Tier 1)",
    fromHonor: 0,
    toHonor: 100,
  },
  {
    id: "100-150",
    labelVi: "Lv.100 ➔ Lv.150 (Bậc 2)",
    labelEn: "Lv.100 to Lv.150 (Tier 2)",
    fromHonor: 100,
    toHonor: 150,
  },
  {
    id: "0-150",
    labelVi: "Toàn trình Lv.0 ➔ Lv.150",
    labelEn: "Full Lv.0 to Lv.150",
    fromHonor: 0,
    toHonor: 150,
  },
] as const;

export function SkinHonorCalculator({
  tool,
  locale,
}: SkinHonorCalculatorProps) {
  const [rarity, setRarity] = useState<TroopSkinRarity>("legendary");
  const [currentHonorLevel, setCurrentHonorLevel] = useState<number>(0);
  const [targetHonorLevel, setTargetHonorLevel] = useState<number>(150);
  const [ownedMedalsText, setOwnedMedalsText] = useState<string>("0");
  const [ownedCopiesText, setOwnedCopiesText] = useState<string>("0");
  const [rosterCounts, setRosterCounts] = useState<SkinHonorRosterCounts>({
    legendary: 2,
    epic: 4,
    rare: 2,
  });

  const ownedMedals = useMemo(
    () => parseCompactNumberInput(ownedMedalsText) ?? 0,
    [ownedMedalsText]
  );
  const ownedDuplicateCopies = useMemo(
    () => parseCompactNumberInput(ownedCopiesText) ?? 0,
    [ownedCopiesText]
  );

  const result = useMemo(
    () =>
      calculateSkinHonorProgression({
        rarity,
        currentHonorLevel,
        targetHonorLevel,
        ownedMedals,
        ownedDuplicateCopies,
        rosterCounts,
      }),
    [
      rarity,
      currentHonorLevel,
      targetHonorLevel,
      ownedMedals,
      ownedDuplicateCopies,
      rosterCounts,
    ]
  );

  const handleSwap = () => {
    setCurrentHonorLevel(targetHonorLevel);
    setTargetHonorLevel(currentHonorLevel);
  };

  const handleReset = () => {
    setRarity("legendary");
    setCurrentHonorLevel(0);
    setTargetHonorLevel(150);
    setOwnedMedalsText("0");
    setOwnedCopiesText("0");
    setRosterCounts({ legendary: 2, epic: 4, rare: 2 });
  };

  const medalName =
    locale === "vi" ? GLORY_MEDAL_MATERIAL.nameVi : GLORY_MEDAL_MATERIAL.nameEn;

  return (
    <div data-testid="skin-honor-calculator" className="space-y-5">
      {/* 1. MD3 Tool Header */}
      <CalculatorToolHeader
        code={tool.code}
        title={tool.fullTitle[locale]}
        actions={
          <button
            type="button"
            data-testid="skin-honor-reset-btn"
            onClick={handleReset}
            className={cn(
              CALC_MD3.chipButton,
              "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            <span>{locale === "vi" ? "Đặt lại" : "Reset"}</span>
          </button>
        }
      />

      {/* 2. Rarity Selector & Dual-Currency Mechanism Callout (Single-Layer Containment) */}
      <section className={cn(CALC_MD3.surfaceCard, "space-y-3")}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="space-y-0.5">
            <h2 className={CALC_MD3.sectionTitle}>
              {locale === "vi"
                ? "Chọn Phẩm Chất Quân Trang Xét Cấp Vinh Dự (Honor Lv.0–150)"
                : "Select Troop Skin Rarity for Honor Level (Lv.0–150)"}
            </h2>
            <p className="text-sm font-sans text-muted-foreground">
              {locale === "vi"
                ? "Sau khi đạt Lv.50, Cấp Vinh Dự có thể nâng bằng Huy Chương Vinh Dự hoặc Bản Sao Phôi Dư (+5 cấp/lần)"
                : "After reaching Lv.50, Honor Levels can be upgraded via Glory Medals or Duplicate Skin Copies (+5 levels/step)"}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {TROOP_SKIN_RARITY_ORDER.map((rKey) => {
              const meta = TROOP_SKIN_RARITIES[rKey];
              const isSelected = rarity === rKey;
              return (
                <button
                  key={rKey}
                  type="button"
                  data-testid={`skin-honor-rarity-${rKey}-btn`}
                  onClick={() => setRarity(rKey)}
                  className={cn(
                    CALC_MD3.chipButton,
                    isSelected
                      ? "bg-amber-500 text-slate-950 font-black"
                      : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <span>
                    {locale === "vi" ? meta.shortNameVi : meta.shortNameEn}
                  </span>
                  <span className="font-mono text-xs">
                    ({formatCompactNumber(meta.honorMedalsPerLevel)})
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Symmetric 3-Column Control Architecture: [Start Honor (X)] <-> [Center Hub] <-> [Target Honor (Y)] */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Column: Start Honor Level (X) */}
        <div className="lg:col-span-4">
          <SkinHonorSelector
            idPrefix="from"
            title={
              locale === "vi"
                ? "Cấp Vinh Dự Hiện Tại (X)"
                : "Current Honor Level (X)"
            }
            rarity={rarity}
            honorLevel={currentHonorLevel}
            locale={locale}
            onChangeHonorLevel={setCurrentHonorLevel}
          />
        </div>

        {/* Center Column: Control Hub (Journey Presets + Inventory Inputs) */}
        <div className="lg:col-span-4">
          <div className={cn(CALC_MD3.surfaceCard, "space-y-4")}>
            <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-2.5">
              <h3 className={CALC_MD3.sectionTitle}>
                {locale === "vi"
                  ? "Trung Tâm Điều Khiển Vinh Dự"
                  : "Honor Control Center"}
              </h3>

              <button
                type="button"
                data-testid="skin-honor-swap-btn"
                onClick={handleSwap}
                className={cn(
                  CALC_MD3.chipButton,
                  "bg-amber-500/15 text-amber-700 dark:text-amber-300 hover:bg-amber-500/25 px-3"
                )}
              >
                <ArrowLeftRight className="h-4 w-4" aria-hidden="true" />
                <span>{locale === "vi" ? "Đảo X ⟷ Y" : "Swap X ⟷ Y"}</span>
              </button>
            </div>

            {result.isReversed ? (
              <div className="rounded-xl bg-amber-500/15 p-3 text-xs sm:text-sm font-sans font-semibold text-amber-700 dark:text-amber-300">
                {locale === "vi"
                  ? "Đang tự động tính độ chênh lệch theo chiều tăng dần từ cấp thấp đến cấp cao."
                  : "Automatically calculating progression delta from the lower Honor level to the higher Honor level."}
              </div>
            ) : null}

            {/* Honor Journey Presets */}
            <div className="space-y-2">
              <div className={CALC_MD3.eyebrow}>
                {locale === "vi"
                  ? "Mốc Hành Trình Vinh Dự"
                  : "Honor Journey Presets"}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {HONOR_JOURNEY_PRESETS.map((preset) => {
                  const isActive =
                    result.effectiveStartHonor === preset.fromHonor &&
                    result.effectiveEndHonor === preset.toHonor;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      data-testid={`skin-honor-journey-${preset.id}-btn`}
                      onClick={() => {
                        setCurrentHonorLevel(preset.fromHonor);
                        setTargetHonorLevel(preset.toHonor);
                      }}
                      className={cn(
                        CALC_MD3.chipButton,
                        "text-xs sm:text-sm justify-start px-2.5",
                        isActive
                          ? "bg-amber-500 text-slate-950 font-black"
                          : "bg-muted/60 text-foreground hover:bg-muted"
                      )}
                    >
                      <span>
                        {locale === "vi" ? preset.labelVi : preset.labelEn}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Inventory Inputs (Owned Medals & Owned Duplicate Copies) */}
            <div className="space-y-3 border-t border-border/60 pt-3">
              <div className="space-y-1.5">
                <label
                  htmlFor="skin-honor-owned-medals-input"
                  className="block text-sm font-sans font-semibold text-foreground"
                >
                  {locale === "vi"
                    ? "Kho Huy Chương Vinh Dự đang có (hỗ trợ K/M)"
                    : "Owned Glory Medals (supports K/M)"}
                </label>
                <Input
                  id="skin-honor-owned-medals-input"
                  data-testid="skin-honor-owned-medals-input"
                  type="text"
                  inputMode="text"
                  value={ownedMedalsText}
                  onChange={(e) => setOwnedMedalsText(e.target.value)}
                  placeholder="0, 500k, 2.5m"
                  className={CALC_MD3.dataInput}
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="skin-honor-owned-copies-input"
                  className="block text-sm font-sans font-semibold text-foreground"
                >
                  {locale === "vi"
                    ? "Bản Sao Phôi Dư dùng đổi cấp (+5 cấp/bước)"
                    : "Duplicate Skin Copies to Spend (+5 levels/step)"}
                </label>
                <Input
                  id="skin-honor-owned-copies-input"
                  data-testid="skin-honor-owned-copies-input"
                  type="number"
                  min={0}
                  max={99}
                  value={ownedCopiesText}
                  onChange={(e) => setOwnedCopiesText(e.target.value)}
                  className={CALC_MD3.dataInput}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Target Honor Level (Y) */}
        <div className="lg:col-span-4">
          <SkinHonorSelector
            idPrefix="to"
            title={
              locale === "vi"
                ? "Cấp Vinh Dự Mục Tiêu (Y)"
                : "Target Honor Level (Y)"
            }
            rarity={rarity}
            honorLevel={targetHonorLevel}
            locale={locale}
            onChangeHonorLevel={setTargetHonorLevel}
          />
        </div>
      </div>

      {/* 4. Honor Results Panel (Single-Layer Containment) */}
      <section
        data-testid="skin-honor-results-panel"
        className={cn(CALC_MD3.surfaceCard, "space-y-4")}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-amber-500" aria-hidden="true" />
            <h2 className={CALC_MD3.sectionTitle}>
              {locale === "vi"
                ? `Kết Quả Cấp Vinh Dự (Honor Lv.${result.effectiveStartHonor} ➔ Lv.${result.effectiveEndHonor})`
                : `Honor Level Results (Honor Lv.${result.effectiveStartHonor} to Lv.${result.effectiveEndHonor})`}
            </h2>
          </div>

          <span
            data-testid="skin-honor-medals-status-badge"
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-sans font-bold",
              result.medalsShortfall === 0
                ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                : "bg-amber-500/15 text-amber-700 dark:text-amber-300"
            )}
          >
            {result.medalsShortfall === 0 ? (
              <>
                <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                <span>
                  {locale === "vi"
                    ? `Đủ Huy Chương (Dư ${formatCompactNumber(result.medalsRemainingAfter)})`
                    : `Enough Medals (Surplus ${formatCompactNumber(result.medalsRemainingAfter)})`}
                </span>
              </>
            ) : (
              <>
                <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
                <span>
                  {locale === "vi"
                    ? `Còn thiếu ${formatCompactNumber(result.medalsShortfall)} Huy Chương`
                    : `Short by ${formatCompactNumber(result.medalsShortfall)} Medals`}
                </span>
              </>
            )}
          </span>
        </div>

        {/* 3 Primary Metric Tonal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Metric 1: Net Glory Medals Needed (after Copy deduction) */}
          <div className={cn(CALC_MD3.tonalGroup, "space-y-2")}>
            <div className="flex items-center gap-2">
              <GameAssetFrame
                src={GLORY_MEDAL_MATERIAL.iconPath}
                alt={medalName}
                rarity={GLORY_MEDAL_MATERIAL.rarity}
                size="sm"
              />
              <span className="text-sm font-heading font-bold text-foreground">
                {locale === "vi"
                  ? "Huy Chương Thực Cần (Sau Trừ Phôi)"
                  : "Net Glory Medals Needed"}
              </span>
            </div>

            <CalculatorMetricValue
              testId="skin-honor-net-medals-value"
              value={formatCompactNumber(result.netMedalsNeeded)}
              unit={locale === "vi" ? "Huy Chương" : "Medals"}
              toneClassName="text-amber-600 dark:text-amber-400"
            />

            <div className="text-xs sm:text-sm font-sans text-muted-foreground">
              {locale === "vi" ? "Chính xác:" : "Exact:"}{" "}
              <span className="font-mono font-semibold text-foreground">
                {formatExactNumber(result.netMedalsNeeded)}
              </span>{" "}
              ({result.levelsCoveredByMedals}{" "}
              {locale === "vi" ? "cấp bằng Huy Chương" : "levels by Medals"})
            </div>
          </div>

          {/* Metric 2: Copies Used & Levels Covered */}
          <div className={cn(CALC_MD3.tonalGroup, "space-y-2")}>
            <div className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-sky-500" aria-hidden="true" />
              <span className="text-sm font-heading font-bold text-foreground">
                {locale === "vi"
                  ? "Bản Sao Phôi Đã Khấu Trừ"
                  : "Duplicate Copies Applied"}
              </span>
            </div>

            <CalculatorMetricValue
              testId="skin-honor-copies-used-value"
              value={formatExactNumber(result.copiesUsedForHonor)}
              unit={locale === "vi" ? "Phôi" : "Copies"}
              toneClassName="text-sky-600 dark:text-sky-400"
            />

            <div className="text-xs sm:text-sm font-sans text-muted-foreground">
              {locale === "vi"
                ? `Tương đương +${result.levelsCoveredByCopies} cấp Vinh Dự (Tối đa dùng ${result.maxCopiesApplicable} phôi)`
                : `Covers +${result.levelsCoveredByCopies} Honor levels (Max ${result.maxCopiesApplicable} copies)`}
            </div>
          </div>

          {/* Metric 3: Medals Saved by Using Copies */}
          <div className={cn(CALC_MD3.tonalGroup, "space-y-2")}>
            <div className="flex items-center gap-2">
              <Sparkles
                className="h-5 w-5 text-emerald-500"
                aria-hidden="true"
              />
              <span className="text-sm font-heading font-bold text-foreground">
                {locale === "vi"
                  ? "Huy Chương Tiết Kiệm Nhờ Phôi"
                  : "Glory Medals Saved by Copies"}
              </span>
            </div>

            <CalculatorMetricValue
              testId="skin-honor-medals-saved-value"
              value={formatCompactNumber(result.medalsSavedByCopies)}
              unit={locale === "vi" ? "Huy Chương" : "Medals"}
              toneClassName="text-emerald-600 dark:text-emerald-400"
            />

            <div className="text-xs sm:text-sm font-sans text-muted-foreground">
              {locale === "vi" ? "Chi phí gốc nếu không dùng phôi:" : "Pure Medal cost without copies:"}{" "}
              <span className="font-mono font-semibold text-foreground">
                {formatCompactNumber(result.pureMedalsWithoutCopies)}
              </span>
            </div>
          </div>
        </div>

        {/* Tier 1 (Lv.0-100) vs Tier 2 (Lv.101-150) Breakdown List */}
        {result.segments.length > 0 ? (
          <div className="space-y-2 border-t border-border/60 pt-3">
            <h3 className="text-sm sm:text-base font-heading font-bold text-foreground">
              {locale === "vi"
                ? "Phân Tách Theo Bậc Quy Đổi Phôi (Bậc 1: 1 Phôi/5 Cấp • Bậc 2: 2 Phôi/5 Cấp)"
                : "Breakdown by Copy Conversion Tier (Tier 1: 1 Copy/5 Lv • Tier 2: 2 Copies/5 Lv)"}
            </h3>

            <ul className={CALC_MD3.dividedList}>
              {result.segments.map((seg) => (
                <li
                  key={seg.id}
                  className="flex flex-wrap items-center justify-between gap-2 py-2.5 text-sm font-sans"
                >
                  <div>
                    <div className="font-semibold text-foreground">
                      {locale === "vi" ? seg.labelVi : seg.labelEn}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {locale === "vi"
                        ? `Đoạn Lv.${seg.fromHonorLevel} ➔ Lv.${seg.toHonorLevel}: Dùng ${seg.copiesUsed} phôi (+${seg.levelsCoveredByCopies} cấp) & ${seg.levelsCoveredByMedals} cấp bằng Huy Chương`
                        : `Lv.${seg.fromHonorLevel} to Lv.${seg.toHonorLevel}: ${seg.copiesUsed} copies (+${seg.levelsCoveredByCopies} lv) & ${seg.levelsCoveredByMedals} lv by Medals`}
                    </div>
                  </div>

                  <div className="font-mono font-bold text-amber-600 dark:text-amber-400">
                    {formatCompactNumber(seg.medalsRequired)} (
                    {formatExactNumber(seg.medalsRequired)})
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>

      {/* 5. Global Roster Staircase Optimizer (Lv.10 ⭐ -> Lv.20 ⭐⭐ -> Lv.30 ⭐⭐⭐ -> Lv.50) */}
      <section
        data-testid="skin-honor-staircase-panel"
        className={cn(CALC_MD3.surfaceCard, "space-y-4")}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <TrendingUp
                className="h-5 w-5 text-amber-500"
                aria-hidden="true"
              />
              <h2 className={CALC_MD3.sectionTitle}>
                {locale === "vi"
                  ? "Quy Hoạch Bậc Thang Toàn Đội (Staircase ROI Optimizer)"
                  : "Global Roster Staircase ROI Optimizer"}
              </h2>
            </div>
            <p className="text-sm font-sans text-muted-foreground">
              {locale === "vi"
                ? "Phân bổ kho Huy Chương Vinh Dự theo chuẩn điểm gãy Lv.10 ⭐ ➔ Lv.20 ⭐⭐ cho mọi Quân Trang đang sở hữu trước khi dồn 1 bộ lên Lv.50"
                : "Distribute Glory Medals across all owned skins at Lv.10 ⭐ and Lv.20 ⭐⭐ breakpoints before pushing a single skin to Lv.50"}
            </p>
          </div>

          <div className="rounded-xl bg-emerald-500/15 px-3 py-1.5 text-xs sm:text-sm font-sans font-bold text-emerald-700 dark:text-emerald-300">
            <span>
              {locale === "vi"
                ? "Tổng Buff Sở Hữu Đạt Chuẩn:"
                : "Total Max Owned Buff:"}
            </span>{" "}
            <span className="font-mono">
              +{result.totalRosterOwnedAtkPctAtMaxStaircase}% ATK • +
              {result.totalRosterOwnedHpPctAtMaxStaircase}% HP
            </span>
          </div>
        </div>

        {/* Owned Skin Roster Inputs (Legendary 0..8, Epic 0..5, Rare 0..2) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className={cn(CALC_MD3.tonalGroup, "space-y-1.5")}>
            <label
              htmlFor="roster-legendary-count-input"
              className="block text-sm font-sans font-semibold text-foreground"
            >
              {locale === "vi"
                ? "Số Quân Trang Cam sở hữu (0–8)"
                : "Owned Legendary Skins (0–8)"}
            </label>
            <Input
              id="roster-legendary-count-input"
              data-testid="roster-legendary-count-input"
              type="number"
              min={0}
              max={8}
              value={rosterCounts.legendary}
              onChange={(e) => {
                const v = Number.parseInt(e.target.value, 10);
                if (!Number.isNaN(v)) {
                  setRosterCounts((prev) => ({
                    ...prev,
                    legendary: Math.max(0, Math.min(8, v)),
                  }));
                }
              }}
              className={CALC_MD3.dataInput}
            />
          </div>

          <div className={cn(CALC_MD3.tonalGroup, "space-y-1.5")}>
            <label
              htmlFor="roster-epic-count-input"
              className="block text-sm font-sans font-semibold text-foreground"
            >
              {locale === "vi"
                ? "Số Quân Trang Tím sở hữu (0–5)"
                : "Owned Epic Skins (0–5)"}
            </label>
            <Input
              id="roster-epic-count-input"
              data-testid="roster-epic-count-input"
              type="number"
              min={0}
              max={5}
              value={rosterCounts.epic}
              onChange={(e) => {
                const v = Number.parseInt(e.target.value, 10);
                if (!Number.isNaN(v)) {
                  setRosterCounts((prev) => ({
                    ...prev,
                    epic: Math.max(0, Math.min(5, v)),
                  }));
                }
              }}
              className={CALC_MD3.dataInput}
            />
          </div>

          <div className={cn(CALC_MD3.tonalGroup, "space-y-1.5")}>
            <label
              htmlFor="roster-rare-count-input"
              className="block text-sm font-sans font-semibold text-foreground"
            >
              {locale === "vi"
                ? "Số Quân Trang Lam sở hữu (0–2)"
                : "Owned Rare Skins (0–2)"}
            </label>
            <Input
              id="roster-rare-count-input"
              data-testid="roster-rare-count-input"
              type="number"
              min={0}
              max={2}
              value={rosterCounts.rare}
              onChange={(e) => {
                const v = Number.parseInt(e.target.value, 10);
                if (!Number.isNaN(v)) {
                  setRosterCounts((prev) => ({
                    ...prev,
                    rare: Math.max(0, Math.min(2, v)),
                  }));
                }
              }}
              className={CALC_MD3.dataInput}
            />
          </div>
        </div>

        {/* Staircase Recommendations List */}
        <ul className={CALC_MD3.dividedList}>
          {result.staircaseRecommendations.map((step) => (
            <li
              key={step.id}
              data-testid={`staircase-step-${step.id}`}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-3 text-sm font-sans"
            >
              <div className="space-y-0.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500 font-mono text-xs font-black text-slate-950">
                    {step.stepOrder}
                  </span>
                  <span className="font-heading font-bold text-foreground">
                    {locale === "vi" ? step.titleVi : step.titleEn}
                  </span>
                  <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-sans font-semibold text-foreground">
                    <span className="font-mono">{step.skinCount}</span>{" "}
                    {locale === "vi" ? "bộ" : "skins"}
                  </span>
                </div>

                <div className="text-xs sm:text-sm text-muted-foreground">
                  <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                    +{step.gainedOwnedAtkPctTotal}% ATK • +
                    {step.gainedOwnedHpPctTotal}% HP
                  </span>{" "}
                  •{" "}
                  <span>
                    {locale === "vi" ? "Hiệu suất:" : "ROI:"}{" "}
                    <span className="font-mono font-semibold text-foreground">
                      {step.roiAtkPer100kMedals}%
                    </span>{" "}
                    ATK / 100K
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <span className="font-mono text-sm font-bold text-amber-600 dark:text-amber-400">
                  {formatCompactNumber(step.totalStepMedals)} (
                  {formatExactNumber(step.totalStepMedals)})
                </span>

                <span
                  className={cn(
                    "rounded-full px-2.5 py-0.5 text-xs font-sans font-bold",
                    step.status === "affordable"
                      ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                      : step.status === "partial"
                        ? "bg-amber-500/15 text-amber-700 dark:text-amber-300"
                        : "bg-muted text-muted-foreground"
                  )}
                >
                  {step.status === "affordable"
                    ? locale === "vi"
                      ? `Đủ nâng cả ${step.skinCount} bộ`
                      : `Affordable (${step.skinCount}/${step.skinCount})`
                    : step.status === "partial"
                      ? locale === "vi"
                        ? `Đủ nâng ${step.affordableSkinCount}/${step.skinCount} bộ`
                        : `Partial (${step.affordableSkinCount}/${step.skinCount})`
                      : locale === "vi"
                        ? "Chưa đủ kho"
                        : "Insufficient medals"}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

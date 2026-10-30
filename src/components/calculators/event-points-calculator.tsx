"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  RotateCcw,
  ShieldAlert,
  Sparkles,
  Trophy,
  X,
} from "lucide-react";
import {
  DAILY_MILESTONE_CHESTS,
  EVENT_DAYS_METADATA,
  EVENT_INVENTORY_ITEMS,
  TECH_BUFF_PRESET_PERCENTS,
  calculateEventPoints,
  clampTechBuffPercent,
  type EventDayNumber,
  type EventScoringMode,
} from "@/content/calculators/event-points-data";
import { CALCULATOR_MATERIALS } from "@/content/calculators/registry";
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
import {
  CALC_MD3,
  CalculatorMetricValue,
  CalculatorStepperButton,
  CalculatorToolHeader,
} from "./calculator-md3-primitives";

export interface EventPointsCalculatorProps {
  readonly zone?: CalculatorZone;
  readonly category: CalculatorCategory;
  readonly tool: CalculatorToolItem;
  readonly locale: CalculatorLocale;
}

function buildDefaultInputs(): Record<string, string> {
  const initial: Record<string, string> = {};
  for (const item of EVENT_INVENTORY_ITEMS) {
    initial[item.id] = String(item.defaultHoardQty);
  }
  return initial;
}

export function EventPointsCalculator({
  tool,
  locale,
}: EventPointsCalculatorProps) {
  const [mode, setMode] = useState<EventScoringMode>("gar");
  const [selectedDay, setSelectedDay] = useState<EventDayNumber>(4);
  const [techBuffPercent, setTechBuffPercent] = useState<number>(100);
  const [hasDoubleRewardsTech, setHasDoubleRewardsTech] =
    useState<boolean>(true);
  const [showAllDaysItems, setShowAllDaysItems] = useState<boolean>(false);
  const [rawInputs, setRawInputs] =
    useState<Record<string, string>>(buildDefaultInputs);
  const [isMatrixModalOpen, setIsMatrixModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMatrixModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const parsedQuantities = useMemo(() => {
    const map: Record<string, number> = {};
    for (const item of EVENT_INVENTORY_ITEMS) {
      map[item.id] = parseCompactNumberInput(rawInputs[item.id] ?? "0");
    }
    return map;
  }, [rawInputs]);

  const result = useMemo(
    () =>
      calculateEventPoints({
        mode,
        selectedDay,
        techBuffPercent,
        hasDoubleRewardsTech,
        quantitiesByItemId: parsedQuantities,
      }),
    [mode, selectedDay, techBuffPercent, hasDoubleRewardsTech, parsedQuantities]
  );

  const visibleRows = useMemo(() => {
    if (showAllDaysItems) {
      return result.rows;
    }
    return result.rows.filter(
      (row) => row.activeRule !== null || row.isZeroPointTrapOnSelectedDay
    );
  }, [result.rows, showAllDaysItems]);

  const handleReset = () => {
    setMode("gar");
    setSelectedDay(4);
    setTechBuffPercent(100);
    setHasDoubleRewardsTech(true);
    setShowAllDaysItems(false);
    setRawInputs(buildDefaultInputs());
  };

  const handleQuantityChange = (itemId: string, nextValue: string) => {
    setRawInputs((prev) => ({
      ...prev,
      [itemId]: nextValue,
    }));
  };

  const handleClearDayZeroTraps = () => {
    setRawInputs((prev) => {
      const next = { ...prev };
      for (const trapRow of result.zeroPointTrapRows) {
        next[trapRow.item.id] = "0";
      }
      return next;
    });
  };

  return (
    <div
      data-testid="event-points-calculator"
      className="space-y-4 pb-8"
    >
      {/* 1. Compact Header */}
      <CalculatorToolHeader
        code={tool.code}
        title={tool.title[locale]}
        actions={
          <>
            <button
              type="button"
              data-testid="open-event-matrix-modal"
              onClick={() => setIsMatrixModalOpen(true)}
              className={cn(
                CALC_MD3.chipButton,
                "border border-border/60 bg-background px-3 text-muted-foreground hover:text-foreground"
              )}
            >
              <Info className="mr-1.5 h-3.5 w-3.5 text-amber-500" />
              <span>
                {locale === "vi" ? "Bảng Điểm 6 Ngày" : "6-Day Matrix"}
              </span>
            </button>
            <button
              type="button"
              data-testid="reset-event-points"
              onClick={handleReset}
              aria-label={locale === "vi" ? "Đặt lại" : "Reset"}
              className={CALC_MD3.iconButton}
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </>
        }
      />

      {/* 2. Split-View Workspace (7 Columns Input / 5 Columns Sticky Output) */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-start">
        {/* LEFT COLUMN (7/12): Mode, Day Selector, Tech Buff & Inventory Inputs */}
        <div className="space-y-4 lg:col-span-7">
          {/* Card A: Event Mode & 6-Day Selector */}
          <div
            data-testid="event-mode-and-day-selector"
            className={cn(CALC_MD3.surfaceCard, "space-y-3.5 p-4")}
          >
            {/* Segmented Mode Toggle: GAR vs KvK */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <span className={CALC_MD3.sectionTitle}>
                {locale === "vi"
                  ? "1. Chế độ sự kiện & Ngày xả kho"
                  : "1. Event Mode & Active Scoring Day"}
              </span>
              <div className="grid grid-cols-2 gap-1.5 rounded-xl bg-muted/45 p-1">
                <button
                  type="button"
                  data-testid="mode-btn-gar"
                  onClick={() => setMode("gar")}
                  className={cn(
                    CALC_MD3.chipButton,
                    "px-3 text-xs",
                    mode === "gar"
                      ? "bg-amber-500 text-slate-950 shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {locale === "vi"
                    ? "GAR (Chạy Đua Vũ Trang)"
                    : "Standard GAR"}
                </button>
                <button
                  type="button"
                  data-testid="mode-btn-kvk"
                  onClick={() => setMode("kvk")}
                  className={cn(
                    CALC_MD3.chipButton,
                    "px-3 text-xs",
                    mode === "kvk"
                      ? "bg-amber-500 text-slate-950 shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {locale === "vi"
                    ? "KvK (Vương Quốc Chiến)"
                    : "Kingdom Duel (KvK)"}
                </button>
              </div>
            </div>

            {/* 6-Day Selector Grid */}
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {EVENT_DAYS_METADATA.map((dayItem) => {
                const isSelected = selectedDay === dayItem.day;
                const daySummary = result.dailySummaryAcross6Days.find(
                  (d) => d.day === dayItem.day
                );
                const unlockedCount = daySummary?.unlockedChests ?? 0;

                return (
                  <button
                    key={dayItem.day}
                    type="button"
                    data-testid={`day-btn-${dayItem.day}`}
                    onClick={() => setSelectedDay(dayItem.day)}
                    className={cn(
                      "flex min-h-[56px] flex-col justify-between rounded-xl p-2.5 text-left transition-colors",
                      isSelected
                        ? CALC_MD3.tileSelected
                        : cn(
                            CALC_MD3.tonalTile,
                            "hover:bg-muted/65 text-foreground"
                          )
                    )}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-sans text-xs font-semibold">
                        {locale === "vi"
                          ? `Ngày ${dayItem.day} • ${dayItem.weekdayVi}`
                          : `Day ${dayItem.day} • ${dayItem.weekdayEn}`}
                      </span>
                      <span
                        className={cn(
                          "rounded-md px-1.5 py-0.5 font-mono text-xs font-semibold tabular-nums",
                          unlockedCount >= 9
                            ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                            : "bg-background/70 text-muted-foreground"
                        )}
                      >
                        {unlockedCount}/9
                      </span>
                    </div>
                    <p className="mt-1 line-clamp-1 font-sans text-xs text-muted-foreground">
                      {locale === "vi"
                        ? dayItem.titleVi.replace(/^Ngày \d:\s*/, "")
                        : dayItem.titleEn.replace(/^Day \d:\s*/, "")}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Active Day Golden Hour & GAR vs KvK Diff Banner */}
            <div
              data-testid="kvk-vs-gar-diff-banner"
              className={cn(CALC_MD3.tonalGroup, "space-y-1.5")}
            >
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 shrink-0 text-amber-500" />
                <p className="font-sans text-xs font-semibold text-foreground">
                  {locale === "vi"
                    ? result.dayMeta.titleVi
                    : result.dayMeta.titleEn}
                </p>
              </div>
              <p className="font-sans text-xs text-muted-foreground">
                <strong className="text-foreground">
                  {locale === "vi" ? "Trọng tâm: " : "Primary: "}
                </strong>
                {locale === "vi"
                  ? result.dayMeta.primaryFocusVi
                  : result.dayMeta.primaryFocusEn}
              </p>
              <p className="font-sans text-xs text-amber-700 dark:text-amber-300">
                <strong>
                  {locale === "vi" ? "GAR vs KvK: " : "GAR vs KvK Diff: "}
                </strong>
                {locale === "vi"
                  ? result.dayMeta.kvkDiffHighlightVi
                  : result.dayMeta.kvkDiffHighlightEn}
              </p>
            </div>
          </div>

          {/* Card B: Tech Tree Buff Controls */}
          <div
            data-testid="tech-buff-controls"
            className={cn(CALC_MD3.surfaceCard, "space-y-3 p-4")}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className={CALC_MD3.sectionTitle}>
                  {locale === "vi"
                    ? "2. Hệ số Khoa Kỹ Điểm Sự Kiện (Arms Race Commendation)"
                    : "2. Event Tech Buff (Arms Race Commendation)"}
                </h2>
                <p className="text-xs font-sans text-muted-foreground">
                  {locale === "vi"
                    ? "Nhánh Khoa Kỹ Liên Minh tăng trực tiếp +0% đến +100% điểm nhận được"
                    : "Guild Arms Race tech tree boosts all earned points from +0% to +100%"}
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                <CalculatorStepperButton
                  direction="decrease"
                  testId="tech-buff-decrease-btn"
                  onClick={() =>
                    setTechBuffPercent((prev) => clampTechBuffPercent(prev - 5))
                  }
                  disabled={techBuffPercent <= 0}
                  ariaLabel={
                    locale === "vi" ? "Giảm 5% Khoa Kỹ" : "Decrease tech buff 5%"
                  }
                />
                <span
                  data-testid="tech-buff-value-badge"
                  className="inline-flex min-w-[68px] items-center justify-center rounded-lg bg-muted/50 px-2.5 py-2 font-mono text-sm font-bold text-amber-600 dark:text-amber-400"
                >
                  +{result.techBuffPercent}%
                </span>
                <CalculatorStepperButton
                  direction="increase"
                  testId="tech-buff-increase-btn"
                  onClick={() =>
                    setTechBuffPercent((prev) => clampTechBuffPercent(prev + 5))
                  }
                  disabled={techBuffPercent >= 100}
                  ariaLabel={
                    locale === "vi" ? "Tăng 5% Khoa Kỹ" : "Increase tech buff 5%"
                  }
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap gap-1.5">
                {TECH_BUFF_PRESET_PERCENTS.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    data-testid={`tech-preset-btn-${preset}`}
                    onClick={() => setTechBuffPercent(preset)}
                    className={cn(
                      CALC_MD3.chipButton,
                      "px-3 font-mono text-xs",
                      techBuffPercent === preset
                        ? "bg-amber-500 text-slate-950"
                        : "bg-muted/45 text-muted-foreground hover:text-foreground"
                    )}
                  >
                    +{preset}%
                  </button>
                ))}
              </div>

              <button
                type="button"
                data-testid="toggle-double-rewards"
                onClick={() => setHasDoubleRewardsTech((prev) => !prev)}
                className={cn(
                  CALC_MD3.chipButton,
                  "px-3 text-xs",
                  hasDoubleRewardsTech
                    ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-500/40"
                    : "bg-muted/45 text-muted-foreground"
                )}
              >
                <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
                <span>
                  {locale === "vi"
                    ? "Nhân Đôi Quà Rương (Double Rewards)"
                    : "Double Chest Rewards Tech"}
                </span>
              </button>
            </div>
          </div>

          {/* Card C: Hoarded Inventory List (Single-Layer divide-y) */}
          <div className={cn(CALC_MD3.surfaceCard, "space-y-3 p-4")}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className={CALC_MD3.sectionTitle}>
                  {locale === "vi"
                    ? `3. Kho vật phẩm tích trữ (${visibleRows.length} mục)`
                    : `3. Hoarded Inventory (${visibleRows.length} items)`}
                </h2>
                <p className="text-xs font-sans text-muted-foreground">
                  {locale === "vi"
                    ? "Hỗ trợ gõ tắt số lượng lớn: 15k = 15,000 • 1.5m = 1,500,000"
                    : "Supports compact input shorthand: 15k = 15,000 • 1.5m = 1,500,000"}
                </p>
              </div>
              <button
                type="button"
                data-testid="toggle-show-all-items"
                onClick={() => setShowAllDaysItems((prev) => !prev)}
                className={cn(
                  CALC_MD3.chipButton,
                  "bg-muted/50 px-3 text-xs text-foreground hover:bg-muted"
                )}
              >
                {showAllDaysItems
                  ? locale === "vi"
                    ? `Chỉ hiện Ngày ${selectedDay}`
                    : `Show Day ${selectedDay} Only`
                  : locale === "vi"
                  ? "Hiện toàn bộ 28 vật phẩm"
                  : "Show All 28 Items"}
              </button>
            </div>

            <div
              data-testid="inventory-items-list"
              className={CALC_MD3.dividedList}
            >
              {visibleRows.map((row) => {
                const { item, activeRule, buffedPoints, isZeroPointTrapOnSelectedDay } =
                  row;
                const itemName = locale === "vi" ? item.nameVi : item.nameEn;
                const unitLabel =
                  locale === "vi" ? item.unitLabelVi : item.unitLabelEn;
                const rawVal = rawInputs[item.id] ?? "0";

                return (
                  <div
                    key={item.id}
                    data-testid={`inventory-row-${item.id}`}
                    className={cn(
                      "flex flex-col gap-2.5 p-3 sm:flex-row sm:items-center sm:justify-between",
                      isZeroPointTrapOnSelectedDay && "bg-rose-500/10"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <GameAssetFrame
                        src={item.iconPath}
                        alt={itemName}
                        size="md"
                        rarity={item.rarity}
                      />
                      <div className="min-w-0 space-y-1">
                        <p className="font-sans text-sm font-semibold text-foreground">
                          {itemName}
                        </p>
                        {activeRule ? (
                          <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
                            <span className="font-mono font-semibold text-foreground">
                              {formatExactNumber(activeRule.pointsPerBatch)}
                            </span>
                            <span>
                              {locale === "vi" ? "điểm gốc /" : "base pts /"}
                            </span>
                            <span className="font-mono">
                              {formatExactNumber(activeRule.batchSize)}
                            </span>
                            <span>{unitLabel}</span>
                            {result.techBuffPercent > 0 && (
                              <span className="rounded bg-amber-500/15 px-1.5 py-0.5 font-mono text-xs font-semibold text-amber-600 dark:text-amber-400">
                                ➔ {formatExactNumber(row.buffedPointsPerBatch)}
                              </span>
                            )}
                          </div>
                        ) : (
                          <div
                            data-testid={`zero-point-trap-badge-${item.id}`}
                            className="inline-flex items-center gap-1 rounded bg-rose-500/20 px-2 py-0.5 text-xs font-semibold text-rose-600 dark:text-rose-400"
                          >
                            <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                            <span>
                              {locale === "vi"
                                ? `0 ĐIỂM NGÀY ${selectedDay} • Nên xả Ngày ${
                                    row.bestDaysForMode.join(", ") || "khác"
                                  }`
                                : `0 PTS ON DAY ${selectedDay} • Best on Day ${
                                    row.bestDaysForMode.join(", ") || "other"
                                  }`}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3 sm:justify-end">
                      <div className="w-28 sm:w-32">
                        <Input
                          type="text"
                          inputMode="decimal"
                          data-testid={`input-qty-${item.id}`}
                          aria-label={itemName}
                          value={rawVal}
                          onChange={(e) =>
                            handleQuantityChange(item.id, e.target.value)
                          }
                          className={CALC_MD3.dataInput}
                        />
                      </div>
                      <div className="min-w-[84px] text-right">
                        <p
                          className={cn(
                            "font-mono text-sm font-bold tabular-nums",
                            buffedPoints > 0
                              ? "text-amber-600 dark:text-amber-400"
                              : "text-muted-foreground"
                          )}
                        >
                          +{formatCompactNumber(buffedPoints)}
                        </p>
                        <p className="font-sans text-xs text-muted-foreground">
                          {locale === "vi" ? "điểm" : "pts"}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (5/12 Sticky): Hero KPI Summary, 9 Milestone Chests, Trap Alert & Surplus Reserve */}
        <div className="space-y-4 lg:col-span-5 lg:sticky lg:top-20">
          {/* Hero KPI Summary Card */}
          <div
            data-testid="event-points-summary-card"
            className={cn(CALC_MD3.surfaceCard, "space-y-4 p-4")}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className={CALC_MD3.eyebrow}>
                  {locale === "vi"
                    ? `TỔNG ĐIỂM THỰC NHẬN • NGÀY ${selectedDay} (${mode.toUpperCase()})`
                    : `TOTAL EFFECTIVE POINTS • DAY ${selectedDay} (${mode.toUpperCase()})`}
                </p>
                <div className="mt-1 space-y-1">
                  <CalculatorMetricValue
                    testId="event-total-points-value"
                    value={formatCompactNumber(result.totalBuffedPoints)}
                    unit={locale === "vi" ? "Điểm" : "Pts"}
                    toneClassName="text-amber-600 dark:text-amber-400"
                  />
                  <p className="text-xs font-sans text-muted-foreground">
                    {locale === "vi"
                      ? `Chính xác: ${formatExactNumber(
                          result.totalBuffedPoints
                        )} (Gốc: ${formatCompactNumber(
                          result.totalBasePoints
                        )})`
                      : `Exact: ${formatExactNumber(
                          result.totalBuffedPoints
                        )} (Base: ${formatCompactNumber(
                          result.totalBasePoints
                        )})`}
                  </p>
                </div>
              </div>
              <span
                data-testid="event-unlocked-chests-badge"
                className={cn(
                  "inline-flex items-center gap-1 rounded-xl px-3 py-1.5 font-mono text-sm font-bold",
                  result.unlockedChestCount >= 9
                    ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                    : "bg-amber-500/20 text-amber-600 dark:text-amber-400"
                )}
              >
                <Trophy className="h-4 w-4" />
                <span>{result.unlockedChestCount}/9</span>
              </span>
            </div>

            {/* 9 Milestone Chests Grid */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-sans font-semibold text-foreground">
                  {locale === "vi"
                    ? "Tiến độ 9 Rương Mốc Cá Nhân"
                    : "9 Personal Milestone Chests"}
                </span>
                <span className="font-sans text-muted-foreground">
                  {result.nextChest
                    ? locale === "vi"
                      ? `Thiếu ${formatCompactNumber(
                          result.pointsToNextChest
                        )} điểm tới Rương ${result.nextChest.chestIndex}`
                      : `Need ${formatCompactNumber(
                          result.pointsToNextChest
                        )} pts for Chest ${result.nextChest.chestIndex}`
                    : locale === "vi"
                    ? "Đã mở tối đa 9/9 Rương!"
                    : "All 9/9 Chests Unlocked!"}
                </span>
              </div>

              <div
                data-testid="milestone-chests-grid"
                className="grid grid-cols-3 gap-2"
              >
                {DAILY_MILESTONE_CHESTS.map((chest) => {
                  const unlocked =
                    result.totalBuffedPoints >= chest.requiredPoints;
                  return (
                    <div
                      key={chest.chestIndex}
                      data-testid={`chest-status-${chest.chestIndex}`}
                      className={cn(
                        "flex items-center gap-2 rounded-xl p-2 transition-colors",
                        unlocked
                          ? "bg-emerald-500/15 ring-1 ring-emerald-500/40"
                          : CALC_MD3.tonalTile
                      )}
                    >
                      <GameAssetFrame
                        src={chest.chestIconPath}
                        alt={locale === "vi" ? chest.labelVi : chest.labelEn}
                        size="sm"
                        rarity={
                          chest.tierGroup === "supreme"
                            ? "mythic"
                            : chest.tierGroup === "intermediate"
                            ? "legendary"
                            : "rare"
                        }
                      />
                      <div className="min-w-0">
                        <p className="font-sans text-xs font-semibold text-foreground">
                          {locale === "vi"
                            ? `Rương ${chest.chestIndex}`
                            : `Chest ${chest.chestIndex}`}
                        </p>
                        <p className="font-mono text-xs text-muted-foreground">
                          {formatCompactNumber(chest.requiredPoints)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Total Chest Rewards Earned */}
            <div className={cn(CALC_MD3.tonalGroup, "grid grid-cols-2 gap-3")}>
              <div className="flex items-center gap-2.5">
                <GameAssetFrame
                  src={CALCULATOR_MATERIALS.diamond.iconPath}
                  alt={CALCULATOR_MATERIALS.diamond.nameEn}
                  size="sm"
                  rarity="epic"
                />
                <div>
                  <p className="font-sans text-xs text-muted-foreground">
                    {locale === "vi" ? "Thưởng Kim Cương" : "Diamond Rewards"}
                  </p>
                  <p className="font-mono text-sm font-bold text-foreground">
                    +{formatExactNumber(result.totalEarnedDiamonds)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <GameAssetFrame
                  src={
                    CALCULATOR_MATERIALS.legendaryUniversalHeroShard.iconPath
                  }
                  alt={CALCULATOR_MATERIALS.legendaryUniversalHeroShard.nameEn}
                  size="sm"
                  rarity="legendary"
                />
                <div>
                  <p className="font-sans text-xs text-muted-foreground">
                    {locale === "vi" ? "Mảnh Tướng Cam" : "Legendary Shards"}
                  </p>
                  <p className="font-mono text-sm font-bold text-amber-600 dark:text-amber-400">
                    +{formatExactNumber(result.totalEarnedUniversalShards)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Zero-Point Off-Day Trap Warning Card */}
          {(result.zeroPointTrapRows.length > 0 || selectedDay === 6) && (
            <div
              data-testid="zero-point-trap-alert"
              className={cn(
                CALC_MD3.surfaceCard,
                "space-y-2.5 bg-rose-500/10 p-4"
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
                  <ShieldAlert className="h-4 w-4 shrink-0" />
                  <h3 className="font-sans text-sm font-bold">
                    {locale === "vi"
                      ? "Cảnh Báo Bẫy Xả Kho 0 Điểm!"
                      : "0-Point Off-Day Trap Alert!"}
                  </h3>
                </div>
                {result.zeroPointTrapRows.length > 0 && (
                  <button
                    type="button"
                    data-testid="clear-zero-traps-btn"
                    onClick={handleClearDayZeroTraps}
                    className={cn(
                      CALC_MD3.chipButton,
                      "bg-rose-500/20 px-2.5 text-xs text-rose-700 dark:text-rose-300"
                    )}
                  >
                    {locale === "vi" ? "Cất lại kho" : "Clear Off-Day"}
                  </button>
                )}
              </div>
              <p className="font-sans text-xs text-foreground">
                {locale === "vi"
                  ? result.dayMeta.trapWarningVi
                  : result.dayMeta.trapWarningEn}
              </p>
            </div>
          )}

          {/* Surplus Reserve Planner Card (When points exceed Chest 9 = 3.6M) */}
          {result.surplusPointsAboveChest9 > 0 && (
            <div
              data-testid="surplus-reserve-card"
              className={cn(CALC_MD3.surfaceCard, "space-y-3 p-4")}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <h3 className="font-sans text-sm font-bold">
                    {locale === "vi"
                      ? "Gợi Ý Giữ Lại Kho (Đã Đạt Rương 9)"
                      : "Surplus Reserve Planner (Chest 9 Reached)"}
                  </h3>
                </div>
                <span className="rounded-lg bg-emerald-500/15 px-2 py-0.5 font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  +{formatCompactNumber(result.surplusPointsAboveChest9)}
                </span>
              </div>
              <p className="font-sans text-xs text-muted-foreground">
                {locale === "vi"
                  ? "Bạn đang vượt mốc Rương 9 (3.6M điểm). Hãy cất lại số vật phẩm hiếm dưới đây cho chu kỳ 14 ngày tới mà vẫn nhận đủ 9/9 Rương:"
                  : "You exceed Chest 9 (3.6M pts). Bank the following high-priority items for the next 14-day cycle while keeping all 9/9 Chests:"}
              </p>
              <div className={CALC_MD3.dividedList}>
                {result.surplusReserveRecommendations.map((rec) => (
                  <div
                    key={rec.item.id}
                    className="flex items-center justify-between gap-2 p-2.5"
                  >
                    <div className="flex items-center gap-2.5">
                      <GameAssetFrame
                        src={rec.item.iconPath}
                        alt={
                          locale === "vi" ? rec.item.nameVi : rec.item.nameEn
                        }
                        size="sm"
                        rarity={rec.item.rarity}
                      />
                      <div>
                        <p className="font-sans text-xs font-semibold text-foreground">
                          {locale === "vi" ? rec.item.nameVi : rec.item.nameEn}
                        </p>
                        <p className="font-sans text-xs text-muted-foreground">
                          {locale === "vi"
                            ? `Chỉ cần xả: ${formatExactNumber(
                                rec.spendQuantity
                              )}`
                            : `Spend only: ${formatExactNumber(
                                rec.spendQuantity
                              )}`}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-sans text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        {locale === "vi" ? "Cất lại " : "Hold "}
                        <span className="font-mono">
                          {formatExactNumber(rec.holdbackQuantity)}
                        </span>
                      </p>
                      <p className="font-mono text-xs text-muted-foreground">
                        -{formatCompactNumber(rec.savedBuffedPoints)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. Modal: 6-Day GAR vs KvK Reference Matrix */}
      {isMatrixModalOpen && (
        <div
          data-md3-overlay="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
        >
          <div
            className={cn(
              CALC_MD3.overlayCard,
              "max-h-[85vh] w-full max-w-3xl overflow-y-auto p-5 space-y-4"
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <h2 className={CALC_MD3.headline}>
                {locale === "vi"
                  ? "Ma Trận Đối Chiếu 6 Ngày GAR vs KvK"
                  : "6-Day GAR vs KvK Scoring Reference Matrix"}
              </h2>
              <button
                type="button"
                onClick={() => setIsMatrixModalOpen(false)}
                aria-label={locale === "vi" ? "Đóng" : "Close"}
                className={CALC_MD3.iconButton}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-2.5">
              {EVENT_DAYS_METADATA.map((d) => (
                <div key={d.day} className={cn(CALC_MD3.tonalGroup, "space-y-1")}>
                  <p className="font-sans text-sm font-bold text-foreground">
                    {locale === "vi" ? d.titleVi : d.titleEn}
                  </p>
                  <p className="font-sans text-xs text-muted-foreground">
                    {locale === "vi" ? d.primaryFocusVi : d.primaryFocusEn} •{" "}
                    {locale === "vi" ? d.secondaryFocusVi : d.secondaryFocusEn}
                  </p>
                  <p className="font-sans text-xs font-medium text-amber-600 dark:text-amber-400">
                    {locale === "vi"
                      ? d.kvkDiffHighlightVi
                      : d.kvkDiffHighlightEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

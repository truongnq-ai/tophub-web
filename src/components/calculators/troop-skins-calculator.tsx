"use client";

import React, { useMemo, useState } from "react";
import {
  ArrowLeftRight,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Shield,
  Sparkles,
  Star,
  Layers,
} from "lucide-react";
import {
  GLORY_MEDAL_MATERIAL,
  TROOP_SKIN_RARITIES,
  TROOP_SKIN_RARITY_ORDER,
  calculateTroopSkinProgression,
  formatTroopSkinPointLabel,
  getSkinsByRarity,
  type TroopSkinPointState,
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
import { TroopSkinsSelector } from "./troop-skins-selector";
import {
  CALC_MD3,
  CalculatorMetricValue,
  CalculatorToolHeader,
} from "./calculator-md3-primitives";

export interface TroopSkinsCalculatorProps {
  readonly zone?: CalculatorZone;
  readonly category: CalculatorCategory;
  readonly tool: CalculatorToolItem;
  readonly locale: CalculatorLocale;
}

const JOURNEY_PRESETS: ReadonlyArray<{
  readonly id: string;
  readonly labelVi: string;
  readonly labelEn: string;
  readonly fromLevel: number;
  readonly toLevel: number;
}> = [
  {
    id: "1-10",
    labelVi: "Lv.1 ➔ Lv.10 ⭐",
    labelEn: "Lv.1 to Lv.10 ⭐",
    fromLevel: 1,
    toLevel: 10,
  },
  {
    id: "10-20",
    labelVi: "Lv.10 ➔ Lv.20 ⭐⭐",
    labelEn: "Lv.10 to Lv.20 ⭐⭐",
    fromLevel: 10,
    toLevel: 20,
  },
  {
    id: "20-30",
    labelVi: "Lv.20 ➔ Lv.30 ⭐⭐⭐",
    labelEn: "Lv.20 to Lv.30 ⭐⭐⭐",
    fromLevel: 20,
    toLevel: 30,
  },
  {
    id: "30-40",
    labelVi: "Lv.30 ➔ Lv.40 ⭐⭐⭐⭐",
    labelEn: "Lv.30 to Lv.40 ⭐⭐⭐⭐",
    fromLevel: 30,
    toLevel: 40,
  },
  {
    id: "40-50",
    labelVi: "Lv.40 ➔ Lv.50 MAX",
    labelEn: "Lv.40 to Lv.50 MAX",
    fromLevel: 40,
    toLevel: 50,
  },
  {
    id: "1-50",
    labelVi: "Toàn trình Lv.1 ➔ Lv.50",
    labelEn: "Full Lv.1 to Lv.50",
    fromLevel: 1,
    toLevel: 50,
  },
] as const;

export function TroopSkinsCalculator({
  tool,
  locale,
}: TroopSkinsCalculatorProps) {
  const [rarity, setRarity] = useState<TroopSkinRarity>("legendary");
  const [selectedSkinId, setSelectedSkinId] = useState<string>("heavy-cavalry");
  const [currentPoint, setCurrentPoint] = useState<TroopSkinPointState>({
    level: 1,
    sublevel: 0,
  });
  const [targetPoint, setTargetPoint] = useState<TroopSkinPointState>({
    level: 50,
    sublevel: 0,
  });
  const [ownedMedalsText, setOwnedMedalsText] = useState<string>("0");
  const [ownedCopiesText, setOwnedCopiesText] = useState<string>("0");

  const ownedMedals = useMemo(
    () => parseCompactNumberInput(ownedMedalsText) ?? 0,
    [ownedMedalsText]
  );
  const ownedCopies = useMemo(
    () => parseCompactNumberInput(ownedCopiesText) ?? 0,
    [ownedCopiesText]
  );

  const skinsForRarity = useMemo(() => getSkinsByRarity(rarity), [rarity]);

  const result = useMemo(
    () =>
      calculateTroopSkinProgression({
        rarity,
        skinId: selectedSkinId,
        current: currentPoint,
        target: targetPoint,
        ownedMedals,
        ownedCopies,
      }),
    [rarity, selectedSkinId, currentPoint, targetPoint, ownedMedals, ownedCopies]
  );

  const handleSelectRarity = (nextRarity: TroopSkinRarity) => {
    setRarity(nextRarity);
    const list = getSkinsByRarity(nextRarity);
    if (list.length > 0 && !list.some((item) => item.id === selectedSkinId)) {
      setSelectedSkinId(list[0].id);
    }
  };

  const handleSwapPoints = () => {
    setCurrentPoint(targetPoint);
    setTargetPoint(currentPoint);
  };

  const handleReset = () => {
    setRarity("legendary");
    setSelectedSkinId("heavy-cavalry");
    setCurrentPoint({ level: 1, sublevel: 0 });
    setTargetPoint({ level: 50, sublevel: 0 });
    setOwnedMedalsText("0");
    setOwnedCopiesText("0");
  };

  const medalName =
    locale === "vi" ? GLORY_MEDAL_MATERIAL.nameVi : GLORY_MEDAL_MATERIAL.nameEn;

  return (
    <div data-testid="troop-skins-calculator" className="space-y-5">
      {/* 1. MD3 Tool Header */}
      <CalculatorToolHeader
        code={tool.code}
        title={tool.fullTitle[locale]}
        actions={
          <button
            type="button"
            data-testid="troop-skins-reset-btn"
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

      {/* 2. Rarity & Troop Skin Catalog Selector Card (Single-Layer Containment) */}
      <section className={cn(CALC_MD3.surfaceCard, "space-y-4")}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="space-y-0.5">
            <h2 className={CALC_MD3.sectionTitle}>
              {locale === "vi"
                ? "Chọn Phẩm Chất & Bộ Quân Trang"
                : "Select Rarity & Troop Skin"}
            </h2>
            <p className="text-sm font-sans text-muted-foreground">
              {locale === "vi"
                ? "Tỷ lệ chi phí cố định toàn game: Cam 100% • Tím 50% • Lam 25%"
                : "Fixed in-game cost ratio: Legendary 100% • Epic 50% • Rare 25%"}
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
                  data-testid={`troop-skins-rarity-${rKey}-btn`}
                  onClick={() => handleSelectRarity(rKey)}
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
                </button>
              );
            })}
          </div>
        </div>

        {/* Horizontal Scrollable Troop Skin Strip (Tonal tiles, 0 inner border) */}
        <div
          role="list"
          aria-label={
            locale === "vi" ? "Danh sách Quân Trang" : "Troop Skin Catalog"
          }
          className="flex overflow-x-auto no-scrollbar snap-x gap-2.5 pb-1"
        >
          {skinsForRarity.map((skin) => {
            const isSelected = result.selectedSkin.id === skin.id;
            const skinName = locale === "vi" ? skin.nameVi : skin.nameEn;
            const factionName =
              locale === "vi" ? skin.factionLabelVi : skin.factionLabelEn;
            return (
              <button
                key={skin.id}
                type="button"
                role="listitem"
                data-testid={`troop-skin-item-${skin.id}-btn`}
                onClick={() => setSelectedSkinId(skin.id)}
                className={cn(
                  CALC_MD3.tonalTile,
                  "snap-start shrink-0 min-h-[48px] px-3 py-2 flex items-center gap-2.5 text-left",
                  isSelected && CALC_MD3.tileSelected
                )}
              >
                <GameAssetFrame
                  src={skin.iconPath}
                  alt={skinName}
                  rarity={skin.rarity}
                  size="sm"
                />
                <div className="min-w-0">
                  <div className="text-sm font-heading font-bold text-foreground truncate">
                    {skinName}
                  </div>
                  <div className="text-xs font-sans font-medium text-muted-foreground truncate">
                    {factionName}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Skin Special Skill Highlight (Tonal Well, 0 border) */}
        <div
          className={cn(
            CALC_MD3.tonalGroup,
            "flex flex-col sm:flex-row sm:items-center justify-between gap-2"
          )}
        >
          <div className="flex items-center gap-2.5">
            <GameAssetFrame
              src={result.selectedSkin.iconPath}
              alt={
                locale === "vi"
                  ? result.selectedSkin.nameVi
                  : result.selectedSkin.nameEn
              }
              rarity={result.selectedSkin.rarity}
              size="md"
            />
            <div>
              <div className="text-base font-heading font-bold text-foreground">
                {locale === "vi"
                  ? result.selectedSkin.nameVi
                  : result.selectedSkin.nameEn}
              </div>
              <div className="text-xs sm:text-sm font-sans text-amber-700 dark:text-amber-300 font-semibold">
                {locale === "vi"
                  ? result.selectedSkin.specialSkillMaxVi
                  : result.selectedSkin.specialSkillMaxEn}
              </div>
            </div>
          </div>

          <div className="text-xs sm:text-sm font-sans text-muted-foreground">
            {locale === "vi"
              ? result.rarityMeta.costPercentLabelVi
              : result.rarityMeta.costPercentLabelEn}
          </div>
        </div>
      </section>

      {/* 3. Symmetric 3-Column Control Architecture: [Start (X)] <-> [Center Hub] <-> [Target (Y)] */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Column: Start Point (X) */}
        <div className="lg:col-span-4">
          <TroopSkinsSelector
            idPrefix="from"
            title={
              locale === "vi" ? "Điểm Xuất Phát (X)" : "Starting Point (X)"
            }
            rarity={rarity}
            point={currentPoint}
            locale={locale}
            onChangePoint={setCurrentPoint}
          />
        </div>

        {/* Center Column: Control Hub (Journey Presets + Inventory Inputs) */}
        <div className="lg:col-span-4">
          <div className={cn(CALC_MD3.surfaceCard, "space-y-4")}>
            <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-2.5">
              <h3 className={CALC_MD3.sectionTitle}>
                {locale === "vi" ? "Trung Tâm Điều Khiển" : "Control Center"}
              </h3>

              <button
                type="button"
                data-testid="troop-skins-swap-btn"
                onClick={handleSwapPoints}
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
                  ? "Đang tự động tính độ chênh lệch theo chiều tăng dần từ mốc thấp đến mốc cao."
                  : "Automatically calculating progression delta from the lower point to the higher point."}
              </div>
            ) : null}

            {/* Quick Journey Presets */}
            <div className="space-y-2">
              <div className={CALC_MD3.eyebrow}>
                {locale === "vi"
                  ? "Mốc Hành Trình Đột Phá Sao"
                  : "Star Breakthrough Journeys"}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {JOURNEY_PRESETS.map((preset) => {
                  const isActive =
                    result.effectiveStart.level === preset.fromLevel &&
                    result.effectiveStart.sublevel === 0 &&
                    result.effectiveEnd.level === preset.toLevel &&
                    result.effectiveEnd.sublevel === 0;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      data-testid={`troop-skins-journey-${preset.id}-btn`}
                      onClick={() => {
                        setCurrentPoint({ level: preset.fromLevel, sublevel: 0 });
                        setTargetPoint({ level: preset.toLevel, sublevel: 0 });
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

            {/* Inventory Inputs (Supports K/M compact shorthand) */}
            <div className="space-y-3 border-t border-border/60 pt-3">
              <div className="space-y-1.5">
                <label
                  htmlFor="troop-skins-owned-medals-input"
                  className="block text-sm font-sans font-semibold text-foreground"
                >
                  {locale === "vi"
                    ? "Kho Huy Chương Vinh Dự đang có (hỗ trợ K/M)"
                    : "Owned Glory Medals (supports K/M)"}
                </label>
                <Input
                  id="troop-skins-owned-medals-input"
                  data-testid="troop-skins-owned-medals-input"
                  type="text"
                  inputMode="text"
                  value={ownedMedalsText}
                  onChange={(e) => setOwnedMedalsText(e.target.value)}
                  placeholder="0, 80.4k, 1.5m"
                  className={CALC_MD3.dataInput}
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="troop-skins-owned-copies-input"
                  className="block text-sm font-sans font-semibold text-foreground"
                >
                  {locale === "vi"
                    ? "Số Bản Sao Phôi Quân Trang đang có"
                    : "Owned Duplicate Skin Copies"}
                </label>
                <Input
                  id="troop-skins-owned-copies-input"
                  data-testid="troop-skins-owned-copies-input"
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

        {/* Right Column: Target Point (Y) */}
        <div className="lg:col-span-4">
          <TroopSkinsSelector
            idPrefix="to"
            title={locale === "vi" ? "Mục Tiêu Đích (Y)" : "Target Point (Y)"}
            rarity={rarity}
            point={targetPoint}
            locale={locale}
            onChangePoint={setTargetPoint}
          />
        </div>
      </div>

      {/* 4. Hero Output Metrics & Rarity Comparison Card (Single-Layer Containment) */}
      <section
        data-testid="troop-skins-results-panel"
        className={cn(CALC_MD3.surfaceCard, "space-y-4")}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-500" aria-hidden="true" />
            <h2 className={CALC_MD3.sectionTitle}>
              {locale === "vi"
                ? `Kết Quả Tài Nguyên Cần Tìm (${formatTroopSkinPointLabel(result.effectiveStart, locale)} ➔ ${formatTroopSkinPointLabel(result.effectiveEnd, locale)})`
                : `Required Upgrade Resources (${formatTroopSkinPointLabel(result.effectiveStart, locale)} to ${formatTroopSkinPointLabel(result.effectiveEnd, locale)})`}
            </h2>
          </div>

          <span
            data-testid="troop-skins-medals-status-badge"
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

        {/* Dual Primary Metrics: Glory Medals + Duplicate Copies (Tonal Groups, 0 border) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Metric 1: Glory Medals */}
          <div className={cn(CALC_MD3.tonalGroup, "space-y-2")}>
            <div className="flex items-center gap-2">
              <GameAssetFrame
                src={GLORY_MEDAL_MATERIAL.iconPath}
                alt={medalName}
                rarity={GLORY_MEDAL_MATERIAL.rarity}
                size="sm"
              />
              <span className="text-sm font-heading font-bold text-foreground">
                {medalName}
              </span>
            </div>

            <CalculatorMetricValue
              testId="troop-skins-required-medals-value"
              value={formatCompactNumber(result.medalsNeeded)}
              unit={locale === "vi" ? "Huy Chương" : "Medals"}
              toneClassName="text-amber-600 dark:text-amber-400"
            />

            <div className="text-xs sm:text-sm font-sans text-muted-foreground">
              {locale === "vi" ? "Chính xác:" : "Exact:"}{" "}
              <span className="font-mono font-semibold text-foreground">
                {formatExactNumber(result.medalsNeeded)}
              </span>
            </div>
          </div>

          {/* Metric 2: Duplicate Skin Copies */}
          <div className={cn(CALC_MD3.tonalGroup, "space-y-2")}>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-sky-500" aria-hidden="true" />
              <span className="text-sm font-heading font-bold text-foreground">
                {locale === "vi"
                  ? "Phôi Bản Sao Đột Phá Sao"
                  : "Breakthrough Skin Copies"}
              </span>
            </div>

            <CalculatorMetricValue
              testId="troop-skins-required-copies-value"
              value={formatExactNumber(result.copiesNeeded)}
              unit={locale === "vi" ? "Bản sao" : "Copies"}
              toneClassName="text-sky-600 dark:text-sky-400"
            />

            <div className="text-xs sm:text-sm font-sans text-muted-foreground">
              {result.copiesShortfall === 0
                ? locale === "vi"
                  ? `Đủ phôi đột phá (Dư ${result.copiesRemainingAfter})`
                  : `Enough copies (Surplus ${result.copiesRemainingAfter})`
                : locale === "vi"
                  ? `Còn thiếu ${result.copiesShortfall} bản sao phôi`
                  : `Missing ${result.copiesShortfall} duplicate copies`}
            </div>
          </div>

          {/* Metric 3: Global Owned Stat Gain */}
          <div className={cn(CALC_MD3.tonalGroup, "space-y-2")}>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-emerald-500" aria-hidden="true" />
              <span className="text-sm font-heading font-bold text-foreground">
                {locale === "vi"
                  ? "Tăng Chỉ Số Sở Hữu Toàn Quân"
                  : "Owned All-Soldier Stat Gain"}
              </span>
            </div>

            <div className="text-2xl sm:text-3xl font-heading font-black text-emerald-600 dark:text-emerald-400 tabular-nums">
              +{result.gainedOwnedAtkPct}% ATK • +{result.gainedOwnedHpPct}% HP
            </div>

            <div className="text-xs sm:text-sm font-sans text-muted-foreground">
              {locale === "vi" ? "Tổng số vạch nhấn:" : "Total sub-level clicks:"}{" "}
              <span className="font-mono font-semibold text-foreground">
                {formatExactNumber(result.totalSublevelClicks)}
              </span>
            </div>
          </div>
        </div>

        {/* Rarity Cost Comparison Strip (100% vs 50% vs 25%) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {TROOP_SKIN_RARITY_ORDER.map((rKey) => {
            const meta = TROOP_SKIN_RARITIES[rKey];
            const costForRarity = result.rarityComparison[rKey];
            return (
              <div
                key={rKey}
                className={cn(
                  CALC_MD3.tonalGroup,
                  "flex items-center justify-between gap-2"
                )}
              >
                <span className="text-sm font-sans font-semibold text-foreground">
                  {locale === "vi" ? meta.shortNameVi : meta.shortNameEn}
                </span>
                <span className="font-mono text-sm font-bold text-amber-600 dark:text-amber-400">
                  {formatCompactNumber(costForRarity)} (
                  {formatExactNumber(costForRarity)})
                </span>
              </div>
            );
          })}
        </div>

        {/* Stage-by-Stage Star Breakthrough Breakdown List */}
        {result.stageBreakdowns.length > 0 ? (
          <div className="space-y-2 border-t border-border/60 pt-3">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-amber-500" aria-hidden="true" />
              <h3 className="text-sm sm:text-base font-heading font-bold text-foreground">
                {locale === "vi"
                  ? "Phân Tách Chi Phí Theo Chặng Đột Phá Sao"
                  : "Cost Breakdown by Star Breakthrough Stage"}
              </h3>
            </div>

            <ul className={CALC_MD3.dividedList}>
              {result.stageBreakdowns.map((stage) => (
                <li
                  key={stage.id}
                  className="flex flex-wrap items-center justify-between gap-2 py-2.5 text-sm font-sans"
                >
                  <div className="font-medium text-foreground">
                    {locale === "vi" ? stage.labelVi : stage.labelEn}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                      {formatCompactNumber(stage.medalsRequired)} (
                      {formatExactNumber(stage.medalsRequired)})
                    </span>
                    {stage.copiesRequired > 0 ? (
                      <span className="rounded-md bg-sky-500/15 px-2 py-0.5 text-xs font-sans font-bold text-sky-700 dark:text-sky-300">
                        <span className="font-mono">+{stage.copiesRequired}</span>{" "}
                        {locale === "vi" ? "Phôi" : "Copies"}
                      </span>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>
    </div>
  );
}

"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Layers,
  RotateCcw,
  Shield,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import {
  GLORY_MEDAL_MATERIAL,
  TROOP_SKIN_MAX_LEVEL,
  TROOP_SKIN_RARITIES,
  TROOP_SKIN_RARITY_ORDER,
  TROOP_SKIN_TOTAL_COPIES_TO_MAX,
  TROOP_SKIN_UNIVERSAL_CHEST_ICON,
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
import {
  cn,
  formatCompactNumber,
  formatExactNumber,
  parseCompactNumberInput,
} from "@/lib/utils";
import { CalculatorInfoPopover } from "./calculator-info-popover";
import { TroopSkinsSelector } from "./troop-skins-selector";
import {
  CALC_MD3,
  CalculatorToolHeader,
} from "./calculator-md3-primitives";

export interface TroopSkinsCalculatorProps {
  readonly zone?: CalculatorZone;
  readonly category?: CalculatorCategory;
  readonly tool: CalculatorToolItem;
  readonly locale?: CalculatorLocale;
}

type AvatarPickerStep = "rarity" | "skin";

const AVATAR_STAR_INDICES: readonly (1 | 2 | 3 | 4 | 5 | 6)[] = [
  1, 2, 3, 4, 5, 6,
];

const RARITY_BADGE_CLASSES: Readonly<Record<TroopSkinRarity, string>> = {
  legendary: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
  epic: "bg-purple-500/15 text-purple-700 dark:text-purple-300",
  rare: "bg-sky-500/15 text-sky-700 dark:text-sky-300",
};

const RARITY_AVATAR_FRAME_CLASSES: Readonly<Record<TroopSkinRarity, string>> = {
  legendary: "ring-2 ring-amber-500/50 bg-amber-500/10",
  epic: "ring-2 ring-purple-500/50 bg-purple-500/10",
  rare: "ring-2 ring-sky-500/50 bg-sky-500/10",
};

function getTroopSkinStarCountAtLevel(level: number): number {
  if (level >= 50) return 6;
  if (level >= 45) return 5;
  if (level >= 40) return 4;
  if (level >= 30) return 3;
  if (level >= 20) return 2;
  if (level >= 10) return 1;
  return 0;
}

export function TroopSkinsCalculator({
  tool,
  locale = "vi",
}: TroopSkinsCalculatorProps): React.JSX.Element {
  const isVi = locale === "vi";

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

  const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false);
  const [pickerStep, setPickerStep] = useState<AvatarPickerStep>("rarity");
  const pickerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isPickerOpen) return;

    const handleMouseDown = (event: MouseEvent): void => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setIsPickerOpen(false);
        setPickerStep("rarity");
      }
    };

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        setIsPickerOpen(false);
        setPickerStep("rarity");
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPickerOpen]);

  const ownedMedals = useMemo(
    () => parseCompactNumberInput(ownedMedalsText),
    [ownedMedalsText]
  );
  const ownedCopies = useMemo(
    () => parseCompactNumberInput(ownedCopiesText),
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

  const fullJourneyReference = useMemo(
    () =>
      calculateTroopSkinProgression({
        rarity,
        skinId: selectedSkinId,
        current: { level: 1, sublevel: 0 },
        target: { level: TROOP_SKIN_MAX_LEVEL, sublevel: 0 },
        ownedMedals: 0,
        ownedCopies: 0,
      }),
    [rarity, selectedSkinId]
  );

  const handleTogglePicker = (): void => {
    setIsPickerOpen((prev) => {
      const next = !prev;
      if (next) {
        setPickerStep("rarity");
      }
      return next;
    });
  };

  const handleSelectRarity = (nextRarity: TroopSkinRarity): void => {
    setRarity(nextRarity);
    const list = getSkinsByRarity(nextRarity);
    if (list.length > 0 && !list.some((item) => item.id === selectedSkinId)) {
      setSelectedSkinId(list[0].id);
    }
    setPickerStep("skin");
  };

  const handleSelectSkin = (nextSkinId: string): void => {
    setSelectedSkinId(nextSkinId);
    setIsPickerOpen(false);
    setPickerStep("rarity");
  };

  const handleReset = (): void => {
    setRarity("legendary");
    setSelectedSkinId("heavy-cavalry");
    setCurrentPoint({ level: 1, sublevel: 0 });
    setTargetPoint({ level: 50, sublevel: 0 });
    setOwnedMedalsText("0");
    setOwnedCopiesText("0");
    setIsPickerOpen(false);
    setPickerStep("rarity");
  };

  const medalName = isVi
    ? GLORY_MEDAL_MATERIAL.nameVi
    : GLORY_MEDAL_MATERIAL.nameEn;
  const copyName = isVi
    ? "Phôi Bản Sao Quân Trang"
    : "Breakthrough Skin Copies";

  const selectedSkinName = isVi
    ? result.selectedSkin.nameVi
    : result.selectedSkin.nameEn;
  const selectedFactionLabel = isVi
    ? result.selectedSkin.factionLabelVi
    : result.selectedSkin.factionLabelEn;
  const selectedSpecialSkill = isVi
    ? result.selectedSkin.specialSkillMaxVi
    : result.selectedSkin.specialSkillMaxEn;
  const activeRarityShortLabel = isVi
    ? result.rarityMeta.shortNameVi
    : result.rarityMeta.shortNameEn;

  const targetStarCount = getTroopSkinStarCountAtLevel(
    result.normalizedTarget.level
  );
  const isPeakLevel50 = result.normalizedTarget.level >= TROOP_SKIN_MAX_LEVEL;

  const medalsCompletionPercent =
    result.medalsNeeded <= 0
      ? 100
      : Math.min(100, Math.floor((ownedMedals / result.medalsNeeded) * 100));
  const copiesCompletionPercent =
    result.copiesNeeded <= 0
      ? 100
      : Math.min(100, Math.floor((ownedCopies / result.copiesNeeded) * 100));

  const isMedalsSufficient =
    ownedMedals >= result.medalsNeeded && result.medalsNeeded > 0;
  const isCopiesSufficient =
    ownedCopies >= result.copiesNeeded && result.copiesNeeded > 0;

  return (
    <div data-testid="troop-skins-calculator" className="space-y-4">
      {/* 1. Flat MD3 Tool Header + Shared <CalculatorInfoPopover /> + Reset */}
      <CalculatorToolHeader
        code={tool.code}
        title={tool.title[locale].replace(`${tool.code} `, "")}
        actions={
          <>
            <CalculatorInfoPopover
              locale={locale}
              triggerTestId="troop-skins-info-trigger"
              dialogTestId="troop-skins-info-dialog"
              title={
                isVi
                  ? "Hướng Dẫn Quân Trang & Bảng Chi Phí Đột Phá Sao SSoT"
                  : "Troop Skin Guide & SSoT Star Breakthrough Cost Tables"
              }
              subtitle={
                isVi
                  ? "Cơ chế 50 cấp & 210 vạch nhỏ, tỷ lệ 100% / 50% / 25% và 6 chặng đột phá sao"
                  : "50 levels & 210 sub-levels mechanics, 100% / 50% / 25% rarity ratio & 6 star stages"
              }
            >
              <div className="space-y-5">
                {/* Section 1: Mechanics & Rarity Cost Ratio Comparison (100% / 50% / 25%) */}
                <div className="rounded-2xl bg-amber-500/10 p-4 ring-1 ring-amber-500/30 space-y-3">
                  <h4 className="font-sans text-sm font-bold text-foreground">
                    {isVi
                      ? "1. Cơ Chế Cấp Quân Trang, Vạch Nhỏ (Sub-levels) & Tỷ Lệ Chi Phí Phẩm Chất (100% / 50% / 25%)"
                      : "1. Troop Skin Levels, Sub-levels & Rarity Cost Ratio (100% / 50% / 25%)"}
                  </h4>
                  <ul className="space-y-1.5 font-sans text-xs leading-relaxed text-muted-foreground">
                    <li>
                      •{" "}
                      {isVi
                        ? "Lộ trình từ Lv.1 lên Lv.50 gồm 49 bước nâng cấp tương ứng với 210 vạch nhỏ (sub-levels). Từ Lv.17 trở đi, mỗi cấp chia thành từ 2 đến 10 vạch nhỏ."
                        : "Progression from Lv.1 to Lv.50 spans 49 level-ups and 210 sub-level clicks. Starting at Lv.17, each level requires 2 to 10 sub-level bars."}
                    </li>
                    <li>
                      •{" "}
                      {isVi
                        ? "Tại 6 mốc đột phá sao (Lv.10 / 20 / 30 / 40 / 45 / 50), ngoài Huy Chương Vinh Dự cần tiêu hao thêm tổng cộng 13 Phôi Bản Sao Quân Trang (1 + 1 + 2 + 3 + 3 + 3)."
                        : "At the 6 star breakthrough milestones (Lv.10 / 20 / 30 / 40 / 45 / 50), upgrading requires a total of 13 Duplicate Skin Copies (1 + 1 + 2 + 3 + 3 + 3) in addition to Glory Medals."}
                    </li>
                  </ul>

                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                    {TROOP_SKIN_RARITY_ORDER.map((rKey) => {
                      const meta = TROOP_SKIN_RARITIES[rKey];
                      const fullCost = fullJourneyReference.rarityComparison[rKey];
                      const activeRangeCost = result.rarityComparison[rKey];
                      return (
                        <div
                          key={rKey}
                          className="rounded-xl bg-background/80 p-2.5 space-y-1"
                        >
                          <div className="font-sans text-xs font-bold text-foreground">
                            {isVi ? meta.shortNameVi : meta.shortNameEn}
                          </div>
                          <div className="font-mono text-sm font-black text-amber-600 tabular-nums dark:text-amber-400">
                            {formatCompactNumber(fullCost)}
                          </div>
                          <div className="font-mono text-xs text-muted-foreground tabular-nums">
                            {formatExactNumber(fullCost)}
                          </div>
                          <div className="font-sans text-xs text-muted-foreground">
                            {isVi ? "Chặng đang chọn:" : "Selected range:"}{" "}
                            <span className="font-mono font-semibold text-foreground tabular-nums">
                              {formatCompactNumber(activeRangeCost)}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Section 2: 6 Star Breakthrough Stages Table (Lv.1 -> Lv.50) */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-sans text-sm font-bold text-foreground">
                      {isVi
                        ? `2. Bảng Phân Tách Chi Phí & Số Phôi Theo 6 Chặng Đột Phá Sao (${activeRarityShortLabel})`
                        : `2. Cost & Copy Breakdown Across 6 Star Breakthrough Stages (${activeRarityShortLabel})`}
                    </h4>
                    <Layers
                      className="h-4 w-4 text-amber-500"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="space-y-2">
                    {fullJourneyReference.stageBreakdowns.map((stage) => {
                      const isFinalMax = stage.starMilestone === 6;
                      return (
                        <div
                          key={stage.id}
                          className={cn(
                            CALC_MD3.tonalGroup,
                            "flex flex-wrap items-center justify-between gap-2",
                            isFinalMax
                              ? "ring-1 ring-rose-500/40 bg-rose-500/10"
                              : ""
                          )}
                        >
                          <div>
                            <p className="font-sans text-xs font-bold text-foreground">
                              {isVi ? stage.labelVi : stage.labelEn}
                            </p>
                            <p className="font-sans text-xs text-muted-foreground">
                              <span className="font-mono font-semibold text-foreground tabular-nums">
                                Lv.{stage.fromLevel} ➔ Lv.{stage.toLevel}
                              </span>
                            </p>
                          </div>

                          <div className="flex items-center gap-2.5 text-right">
                            <div>
                              <p className="font-mono text-xs font-bold text-amber-600 tabular-nums dark:text-amber-400">
                                {formatCompactNumber(stage.medalsRequired)}
                              </p>
                              <p className="font-mono text-xs text-muted-foreground tabular-nums">
                                {formatExactNumber(stage.medalsRequired)}
                              </p>
                            </div>
                            <span
                              className={cn(
                                "rounded-lg px-2 py-1 font-sans text-xs font-bold",
                                isFinalMax
                                  ? "bg-rose-500/15 text-rose-700 dark:text-rose-300"
                                  : "bg-sky-500/15 text-sky-700 dark:text-sky-300"
                              )}
                            >
                              <span className="font-mono tabular-nums">
                                +{stage.copiesRequired}
                              </span>{" "}
                              <span>{isVi ? "Phôi" : "Copies"}</span>
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Section 3: Optimal ROI Strategy (Owned All-Soldier Buff vs Equipped Buff) */}
                <div className="rounded-2xl bg-emerald-500/10 p-4 ring-1 ring-emerald-500/30 space-y-2">
                  <h4 className="font-sans text-sm font-bold text-foreground">
                    {isVi
                      ? "3. Chiến Lược Đầu Tư Quân Trang Tối Ưu (Buff Sở Hữu Toàn Quân vs Buff Đeo Đạo Chính)"
                      : "3. Optimal Troop Skin Investment Strategy (Owned All-Soldier Buff vs Equipped Buff)"}
                  </h4>
                  <ul className="space-y-1.5 font-sans text-xs leading-relaxed text-emerald-900 dark:text-emerald-200">
                    <li>
                      •{" "}
                      <strong>
                        {isVi
                          ? "Cộng dồn vĩnh viễn Buff Sở Hữu Toàn Quân:"
                          : "Permanent Owned All-Soldier Buff Stacking:"}
                      </strong>{" "}
                      {isVi
                        ? "Mọi bộ Quân Trang bạn sở hữu trong kho đều cộng dồn vĩnh viễn chỉ số ATK & HP Toàn Quân cho cả 3 Đạo mà không cần phải mang ra đeo."
                        : "Every Troop Skin unlocked in your inventory permanently stacks Owned All-Soldier ATK & HP across all queues, even when unequipped."}
                    </li>
                    <li>
                      •{" "}
                      <strong>
                        {isVi
                          ? "Quy tắc nâng bậc thang ROI (Lv.10 ➔ Lv.20):"
                          : "Staircase ROI Rule (Lv.10 ➔ Lv.20):"}
                      </strong>{" "}
                      {isVi
                        ? "Nâng đồng loạt các bộ Quân Trang Cam, Tím, Lam đang có lên điểm gãy Lv.10 (1★) rồi Lv.20 (2★) để tối đa hóa % ATK/HP trên mỗi 100K Huy Chương Vinh Dự, sau đó mới dồn tài nguyên đẩy 1 bộ Cam chủ lực của Đạo 1 lên Lv.50 để mở khóa Vinh Dự Quân Trang (3.2)."
                        : "Upgrade all owned Legendary, Epic, and Rare skins in a staircase to Lv.10 (1★) then Lv.20 (2★) to maximize ATK/HP gain per 100K Glory Medals before pushing your primary Queue 1 Legendary skin to Lv.50 to unlock Skin Honor (3.2)."}
                    </li>
                  </ul>
                </div>
              </div>
            </CalculatorInfoPopover>

            <button
              type="button"
              data-testid="troop-skins-reset-btn"
              onClick={handleReset}
              className={cn(
                CALC_MD3.chipButton,
                "bg-muted/50 font-sans text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <RotateCcw
                className="h-4 w-4 text-amber-500"
                aria-hidden="true"
              />
              <span>{isVi ? "Đặt lại" : "Reset"}</span>
            </button>
          </>
        }
      />

      {/* 2. Top Row — 3 Symmetrical Zones: [Zone 1: Cấp Hiện Tại] | [Zone 2: Avatar Quân Trang Trung Tâm] | [Zone 3: Cấp Mục Tiêu] */}
      <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-12">
        {/* ZONE 1 (Left - 4 cols): Cấp Hiện Tại */}
        <div className="order-2 lg:order-1 lg:col-span-4">
          <TroopSkinsSelector
            idPrefix="from"
            title={isVi ? "Cấp Hiện Tại" : "Current Level"}
            rarity={rarity}
            point={currentPoint}
            locale={locale}
            onChangePoint={setCurrentPoint}
          />
        </div>

        {/* ZONE 2 (Center - 4 cols): Avatar Quân Trang Trung Tâm + 2-Step Sequential Picker */}
        <section
          ref={pickerRef}
          data-testid="troop-skins-zone-avatar"
          className={cn(
            CALC_MD3.surfaceCard,
            "relative order-1 flex flex-col items-center justify-between gap-3.5 text-center lg:order-2 lg:col-span-4"
          )}
        >
          <div className="flex w-full items-center justify-between gap-2">
            <span className="font-sans text-xs font-bold text-muted-foreground">
              {isVi ? "Quân Trang Đang Chọn" : "Selected Troop Skin"}
            </span>
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-lg px-2.5 py-0.5 font-sans text-xs font-bold",
                RARITY_BADGE_CLASSES[rarity]
              )}
            >
              <span>{activeRarityShortLabel}</span>
              <span>•</span>
              <span>{selectedFactionLabel}</span>
            </span>
          </div>

          {/* Clickable Central Troop Skin Avatar (112x112px / h-28 w-28) */}
          <button
            type="button"
            data-testid="troop-skins-central-avatar-btn"
            onClick={handleTogglePicker}
            aria-expanded={isPickerOpen}
            aria-haspopup="dialog"
            aria-label={
              isVi
                ? "Bấm để chọn Phẩm chất và Bộ Quân Trang"
                : "Click to select Rarity and Troop Skin"
            }
            className="group flex w-full flex-col items-center justify-center rounded-2xl p-2 transition-transform hover:scale-[1.01] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40"
          >
            <div
              data-testid="troop-skins-central-avatar-frame"
              className={cn(
                "relative flex h-28 w-28 items-center justify-center rounded-2xl p-2.5 shadow-md transition-all",
                isPeakLevel50
                  ? "ring-2 ring-rose-500/60 bg-rose-500/15"
                  : RARITY_AVATAR_FRAME_CLASSES[rarity]
              )}
            >
              <Image
                src={result.selectedSkin.iconPath}
                alt={selectedSkinName}
                width={88}
                height={88}
                className="h-22 w-22 object-contain drop-shadow"
              />

              {/* Bottom-left Target Level Badge */}
              <span
                className={cn(
                  "absolute -bottom-2 -left-2 inline-flex items-center rounded-full px-2.5 py-0.5 font-mono text-xs font-black text-white shadow tabular-nums",
                  isPeakLevel50 ? "bg-rose-600" : "bg-amber-600"
                )}
              >
                +Lv.{result.normalizedTarget.level}
              </span>
            </div>

            {/* 6 Small Stars (5 Gold + 1 Mythic Red at Lv.50) reflecting Target Star Milestone */}
            <div
              className="mt-3 flex items-center justify-center gap-1"
              aria-hidden="true"
            >
              {AVATAR_STAR_INDICES.map((starNum) => {
                const isRed = starNum === 6;
                const isFilled = targetStarCount >= starNum;
                return (
                  <Star
                    key={starNum}
                    className={cn(
                      "h-4 w-4 transition-transform",
                      isFilled
                        ? isRed
                          ? "text-rose-500 fill-rose-500 scale-110"
                          : "text-amber-400 fill-amber-400"
                        : isRed
                          ? "text-rose-500/35"
                          : "text-muted-foreground/35"
                    )}
                  />
                );
              })}
            </div>

            <p className="mt-2 font-heading text-base font-black text-foreground group-hover:text-amber-600 dark:group-hover:text-amber-400">
              {selectedSkinName}
            </p>
            <p className="font-sans text-xs font-bold text-amber-700 dark:text-amber-300">
              {isVi
                ? result.rarityMeta.costPercentLabelVi
                : result.rarityMeta.costPercentLabelEn}{" "}
              • {selectedFactionLabel}
            </p>
            <p className="mt-1 line-clamp-2 max-w-xs font-sans text-xs leading-relaxed text-muted-foreground">
              {selectedSpecialSkill}
            </p>

            <span className="mt-2 inline-flex min-h-[44px] items-center gap-1 rounded-xl bg-amber-500/15 px-3 py-1.5 font-sans text-xs font-bold text-amber-700 dark:text-amber-300">
              <span>
                {isVi
                  ? "Bấm đổi Phẩm chất & Quân Trang"
                  : "Click to change Skin"}
              </span>
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </button>

          {/* Summary Box: Global Owned All-Soldier Stat Gain */}
          <div className={cn(CALC_MD3.tonalGroup, "w-full space-y-1.5")}>
            <div className="flex items-center justify-between gap-2 text-xs font-sans">
              <span className="inline-flex items-center gap-1 font-semibold text-muted-foreground">
                <Shield
                  className="h-3.5 w-3.5 text-emerald-500"
                  aria-hidden="true"
                />
                <span>
                  {isVi
                    ? "Tăng Chỉ Số Sở Hữu Toàn Quân:"
                    : "Owned All-Soldier Stat Gain:"}
                </span>
              </span>
              <span className="font-mono font-bold text-foreground tabular-nums">
                {formatTroopSkinPointLabel(result.effectiveStart, locale)} ➔{" "}
                {formatTroopSkinPointLabel(result.effectiveEnd, locale)}
              </span>
            </div>

            <div className="font-mono text-base sm:text-lg font-black text-emerald-600 tabular-nums dark:text-emerald-400">
              +{result.gainedOwnedAtkPct}% ATK • +{result.gainedOwnedHpPct}% HP
            </div>

            <div className="text-xs font-sans text-muted-foreground">
              {isVi ? "Tổng số vạch nhấn:" : "Total sub-level clicks:"}{" "}
              <span className="font-mono font-bold text-foreground tabular-nums">
                {formatExactNumber(result.totalSublevelClicks)}
              </span>
            </div>
          </div>

          {/* 2-Step Sequential Avatar Picker Popover (Step 1: Rarity -> Step 2: Troop Skin) */}
          {isPickerOpen ? (
            <div
              role="dialog"
              aria-label={
                isVi
                  ? "Chọn Phẩm chất và Bộ Quân Trang"
                  : "Select Rarity and Troop Skin"
              }
              data-testid="troop-skins-avatar-picker-popover"
              data-md3-overlay="true"
              className={cn(
                CALC_MD3.overlayCard,
                "absolute top-full left-1/2 z-40 mt-2 w-[min(92vw,380px)] -translate-x-1/2 space-y-3 text-left"
              )}
            >
              <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-2">
                <p className="font-sans text-xs font-bold text-foreground">
                  {pickerStep === "rarity"
                    ? isVi
                      ? "Bước 1/2: Chọn Phẩm Chất Quân Trang"
                      : "Step 1/2: Select Troop Skin Rarity"
                    : isVi
                      ? `Bước 2/2: Chọn Bộ Quân Trang (${activeRarityShortLabel})`
                      : `Step 2/2: Select Troop Skin (${activeRarityShortLabel})`}
                </p>

                <button
                  type="button"
                  data-testid="troop-skins-picker-close-btn"
                  aria-label={isVi ? "Đóng bộ chọn" : "Close picker"}
                  onClick={() => {
                    setIsPickerOpen(false);
                    setPickerStep("rarity");
                  }}
                  className={cn(
                    CALC_MD3.iconButton,
                    "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              {pickerStep === "rarity" ? (
                <div className="space-y-2">
                  {TROOP_SKIN_RARITY_ORDER.map((rKey) => {
                    const meta = TROOP_SKIN_RARITIES[rKey];
                    const count = getSkinsByRarity(rKey).length;
                    const isSelectedRarity = rarity === rKey;

                    return (
                      <button
                        key={rKey}
                        type="button"
                        data-testid={`troop-skins-rarity-${rKey}-btn`}
                        onClick={() => handleSelectRarity(rKey)}
                        className={cn(
                          CALC_MD3.tonalTile,
                          "flex min-h-[52px] w-full items-center justify-between gap-3 p-3 text-left",
                          isSelectedRarity && CALC_MD3.tileSelected
                        )}
                      >
                        <div className="min-w-0 flex-1">
                          <p className="font-heading text-sm font-bold text-foreground">
                            {isVi ? meta.nameVi : meta.nameEn}
                          </p>
                          <p className="font-sans text-xs text-muted-foreground">
                            {isVi
                              ? meta.costPercentLabelVi
                              : meta.costPercentLabelEn}{" "}
                            •{" "}
                            <span className="font-mono font-semibold text-amber-600 tabular-nums dark:text-amber-400">
                              +{meta.maxOwnedSoldierAtkPct}% ATK / +
                              {meta.maxOwnedSoldierHpPct}% HP
                            </span>
                          </p>
                        </div>

                        <div className="flex shrink-0 items-center gap-1.5">
                          <span className="rounded-lg bg-background/80 px-2 py-0.5 font-sans text-xs font-bold text-foreground">
                            <span className="font-mono tabular-nums">
                              {count}
                            </span>{" "}
                            <span>{isVi ? "bộ" : "skins"}</span>
                          </span>
                          <ChevronRight
                            className="h-4 w-4 text-muted-foreground"
                            aria-hidden="true"
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-2.5">
                  <button
                    type="button"
                    data-testid="troop-skins-picker-back-btn"
                    onClick={() => setPickerStep("rarity")}
                    className={cn(
                      CALC_MD3.chipButton,
                      "w-full justify-start bg-muted/50 font-sans text-xs font-bold text-amber-700 hover:bg-muted dark:text-amber-300"
                    )}
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    <span>
                      {isVi ? "← Đổi phẩm chất" : "← Change Rarity"}
                    </span>
                  </button>

                  <div className="max-h-72 space-y-1.5 overflow-y-auto pr-1">
                    {skinsForRarity.map((skin) => {
                      const isSelectedSkin = result.selectedSkin.id === skin.id;
                      const skinName = isVi ? skin.nameVi : skin.nameEn;
                      const factionName = isVi
                        ? skin.factionLabelVi
                        : skin.factionLabelEn;
                      const skillSummary = isVi
                        ? skin.specialSkillMaxVi
                        : skin.specialSkillMaxEn;

                      return (
                        <button
                          key={skin.id}
                          type="button"
                          data-testid={`troop-skin-item-${skin.id}-btn`}
                          onClick={() => handleSelectSkin(skin.id)}
                          className={cn(
                            CALC_MD3.tonalTile,
                            "flex min-h-[56px] w-full items-center gap-2.5 p-2.5 text-left",
                            isSelectedSkin && CALC_MD3.tileSelected
                          )}
                        >
                          <Image
                            src={skin.iconPath}
                            alt={skinName}
                            width={40}
                            height={40}
                            className="h-10 w-10 shrink-0 rounded-lg object-contain"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <p className="truncate font-heading text-xs sm:text-sm font-bold text-foreground">
                                {skinName}
                              </p>
                              <span className="shrink-0 rounded-md bg-background/80 px-2 py-0.5 font-sans text-xs font-semibold text-muted-foreground">
                                {factionName}
                              </span>
                            </div>
                            <p className="truncate font-sans text-xs text-muted-foreground">
                              {skillSummary}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </section>

        {/* ZONE 3 (Right - 4 cols): Cấp Mục Tiêu */}
        <div className="order-3 lg:col-span-4">
          <TroopSkinsSelector
            idPrefix="to"
            title={isVi ? "Cấp Mục Tiêu" : "Target Level"}
            rarity={rarity}
            point={targetPoint}
            locale={locale}
            onChangePoint={setTargetPoint}
            warningBanner={
              result.isReversed ? (
                <div
                  role="alert"
                  data-testid="troop-skins-invalid-range-warning"
                  className="flex items-start gap-2.5 rounded-xl bg-amber-500/15 p-3 text-amber-800 dark:text-amber-200"
                >
                  <AlertTriangle
                    className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400"
                    aria-hidden="true"
                  />
                  <p className="font-sans text-xs leading-relaxed">
                    {isVi
                      ? "Cấp mục tiêu đang thấp hơn cấp hiện tại. Hệ thống tự động tính chênh lệch theo chiều tăng dần từ mốc thấp đến mốc cao."
                      : "Target level is lower than current level. Automatically calculating progression delta from the lower point to the higher point."}
                  </p>
                </div>
              ) : null
            }
          />
        </div>
      </div>

      {/* 3. Bottom Row — ZONE 4: Unified Resources Section (2 Vertical Cards × 3 Horizontal Columns) */}
      <section
        data-testid="troop-skins-results-panel"
        className={cn(CALC_MD3.surfaceCard, "space-y-4")}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles
                className="h-5 w-5 shrink-0 text-amber-500"
                aria-hidden="true"
              />
              <h2 className={CALC_MD3.sectionTitle}>
                {isVi ? "Tài Nguyên" : "Resources"}
              </h2>
            </div>
            <p className="mt-0.5 font-sans text-xs text-muted-foreground">
              {isVi
                ? "Nhập số lượng đang có (hỗ trợ gõ tắt 80.4k, 1.5m, 20m) để tự động tính số lượng còn thiếu hoặc dư"
                : "Enter owned amounts (supports 80.4k, 1.5m, 20m shorthand) to automatically compute missing or surplus materials"}
            </p>
          </div>

          <span
            data-testid="troop-skins-medals-status-badge"
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-sans text-xs font-bold",
              result.medalsShortfall === 0
                ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                : "bg-amber-500/15 text-amber-800 dark:text-amber-300"
            )}
          >
            <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="font-mono font-bold tabular-nums">
              {formatTroopSkinPointLabel(result.effectiveStart, locale)} ➔{" "}
              {formatTroopSkinPointLabel(result.effectiveEnd, locale)}
            </span>
          </span>
        </div>

        <div className="space-y-3">
          {/* Card 1: Glory Medals (Huy Chương Vinh Dự) */}
          <div
            data-testid="troop-skins-resource-card-medals"
            className={cn(CALC_MD3.tonalGroup, "space-y-3")}
          >
            {/* Card Header */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-background/90 p-1.5 shadow-sm">
                  <Image
                    src={GLORY_MEDAL_MATERIAL.iconPath}
                    alt={medalName}
                    width={32}
                    height={32}
                    className="h-8 w-8 object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="truncate font-heading text-sm sm:text-base font-bold text-foreground">
                    {medalName}
                  </h3>
                  <p className="font-sans text-xs text-muted-foreground">
                    <span className="font-mono font-semibold text-foreground tabular-nums">
                      Lv.{result.effectiveStart.level} ➔ Lv.
                      {result.effectiveEnd.level}
                    </span>{" "}
                    •{" "}
                    <span>
                      {isVi ? "Tổng số vạch nhấn:" : "Total sub-level clicks:"}
                    </span>{" "}
                    <span className="font-mono font-semibold text-foreground tabular-nums">
                      {formatExactNumber(result.totalSublevelClicks)}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-sans text-xs text-muted-foreground">
                  {isVi ? "Tiến độ:" : "Progress:"}
                </span>
                <span className="font-mono text-xs font-bold text-foreground tabular-nums">
                  {medalsCompletionPercent}%
                </span>
              </div>
            </div>

            <div className="h-1.5 w-full overflow-hidden rounded-full bg-background/80">
              <div
                className={cn(
                  "h-full rounded-full transition-all",
                  isMedalsSufficient ? "bg-emerald-500" : "bg-amber-500"
                )}
                style={{ width: `${medalsCompletionPercent}%` }}
              />
            </div>

            {/* Card Body: 3 Horizontal Columns */}
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
              {/* Column 1: Required */}
              <div className="flex flex-col justify-center rounded-xl bg-background/80 px-3 py-2.5">
                <span className="font-sans text-xs font-medium text-muted-foreground">
                  {isVi ? "Số lượng yêu cầu" : "Required"}
                </span>
                <span
                  data-testid="troop-skins-required-medals-value"
                  title={formatExactNumber(result.medalsNeeded)}
                  className="mt-0.5 font-mono text-xl font-black text-amber-600 tabular-nums dark:text-amber-400"
                >
                  {formatCompactNumber(result.medalsNeeded)}
                </span>
                <span className="font-mono text-xs text-muted-foreground tabular-nums">
                  {formatExactNumber(result.medalsNeeded)}
                </span>
              </div>

              {/* Column 2: Owned Input */}
              <div className="flex flex-col justify-center rounded-xl bg-background/80 px-3 py-2.5">
                <div className="flex items-center justify-between gap-2">
                  <label
                    htmlFor="troop-skins-owned-medals-input"
                    className="font-sans text-xs font-medium text-muted-foreground"
                  >
                    {isVi ? "Số lượng đang có" : "Owned"}
                  </label>
                  {ownedMedals > 0 ? (
                    <span className="font-mono text-xs font-semibold text-amber-600 tabular-nums dark:text-amber-400">
                      = {formatExactNumber(ownedMedals)}
                    </span>
                  ) : null}
                </div>
                <input
                  id="troop-skins-owned-medals-input"
                  data-testid="troop-skins-owned-medals-input"
                  type="text"
                  inputMode="decimal"
                  placeholder={
                    isVi ? "VD: 80.4k, 1.5m, 10m" : "e.g. 80.4k, 1.5m, 10m"
                  }
                  value={ownedMedalsText}
                  onChange={(e) => setOwnedMedalsText(e.target.value)}
                  className={cn(
                    CALC_MD3.dataInput,
                    "mt-1 w-full bg-muted/50 px-3 text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                  )}
                />
              </div>

              {/* Column 3: Missing / Sufficient */}
              <div
                className={cn(
                  "flex flex-col justify-center rounded-xl px-3 py-2.5",
                  isMedalsSufficient
                    ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                    : "bg-amber-500/10 text-amber-800 dark:text-amber-300"
                )}
              >
                <span className="font-sans text-xs font-medium">
                  {isVi ? "Số lượng còn thiếu" : "Missing"}
                </span>
                <div
                  data-testid="troop-skins-missing-medals-value"
                  title={formatExactNumber(
                    isMedalsSufficient
                      ? result.medalsRemainingAfter
                      : result.medalsShortfall
                  )}
                  className="mt-0.5"
                >
                  {isMedalsSufficient ? (
                    <span className="font-sans text-sm font-bold">
                      {isVi
                        ? `Đủ nguyên liệu (+Dư ${formatCompactNumber(result.medalsRemainingAfter)})`
                        : `Sufficient (+Surplus ${formatCompactNumber(result.medalsRemainingAfter)})`}
                    </span>
                  ) : (
                    <span className="font-mono text-xl font-black tabular-nums">
                      {formatCompactNumber(result.medalsShortfall)}
                    </span>
                  )}
                </div>
                {!isMedalsSufficient && result.medalsShortfall >= 1_000 ? (
                  <span className="font-mono text-xs opacity-80 tabular-nums">
                    {formatExactNumber(result.medalsShortfall)}
                  </span>
                ) : null}
              </div>
            </div>
          </div>

          {/* Card 2: Breakthrough Skin Copies (Phôi Bản Sao Quân Trang) */}
          <div
            data-testid="troop-skins-resource-card-copies"
            className={cn(CALC_MD3.tonalGroup, "space-y-3")}
          >
            {/* Card Header */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-background/90 p-1.5 shadow-sm">
                  <Image
                    src={TROOP_SKIN_UNIVERSAL_CHEST_ICON}
                    alt={copyName}
                    width={32}
                    height={32}
                    className="h-8 w-8 object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="truncate font-heading text-sm sm:text-base font-bold text-foreground">
                    {copyName}
                  </h3>
                  <p className="font-sans text-xs text-muted-foreground">
                    <span>
                      {isVi
                        ? "Mốc đột phá sao:"
                        : "Star breakthrough milestones:"}
                    </span>{" "}
                    <span className="font-mono font-semibold text-foreground tabular-nums">
                      Lv.10 / 20 / 30 / 40 / 45 / 50
                    </span>{" "}
                    •{" "}
                    <span>
                      {isVi ? "Tối đa" : "Max"}
                    </span>{" "}
                    <span className="font-mono font-semibold text-foreground tabular-nums">
                      {TROOP_SKIN_TOTAL_COPIES_TO_MAX}
                    </span>{" "}
                    <span>{isVi ? "Phôi" : "Copies"}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-sans text-xs text-muted-foreground">
                  {isVi ? "Tiến độ:" : "Progress:"}
                </span>
                <span className="font-mono text-xs font-bold text-foreground tabular-nums">
                  {copiesCompletionPercent}%
                </span>
              </div>
            </div>

            <div className="h-1.5 w-full overflow-hidden rounded-full bg-background/80">
              <div
                className={cn(
                  "h-full rounded-full transition-all",
                  isCopiesSufficient ? "bg-emerald-500" : "bg-sky-500"
                )}
                style={{ width: `${copiesCompletionPercent}%` }}
              />
            </div>

            {/* Card Body: 3 Horizontal Columns */}
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
              {/* Column 1: Required */}
              <div className="flex flex-col justify-center rounded-xl bg-background/80 px-3 py-2.5">
                <span className="font-sans text-xs font-medium text-muted-foreground">
                  {isVi ? "Số lượng yêu cầu" : "Required"}
                </span>
                <span
                  data-testid="troop-skins-required-copies-value"
                  title={formatExactNumber(result.copiesNeeded)}
                  className="mt-0.5 font-mono text-xl font-black text-sky-600 tabular-nums dark:text-sky-400"
                >
                  {formatCompactNumber(result.copiesNeeded)}
                </span>
                <span className="font-mono text-xs text-muted-foreground tabular-nums">
                  {formatExactNumber(result.copiesNeeded)}
                </span>
              </div>

              {/* Column 2: Owned Input */}
              <div className="flex flex-col justify-center rounded-xl bg-background/80 px-3 py-2.5">
                <div className="flex items-center justify-between gap-2">
                  <label
                    htmlFor="troop-skins-owned-copies-input"
                    className="font-sans text-xs font-medium text-muted-foreground"
                  >
                    {isVi ? "Số lượng đang có" : "Owned"}
                  </label>
                  {ownedCopies > 0 ? (
                    <span className="font-mono text-xs font-semibold text-sky-600 tabular-nums dark:text-sky-400">
                      = {formatExactNumber(ownedCopies)}
                    </span>
                  ) : null}
                </div>
                <input
                  id="troop-skins-owned-copies-input"
                  data-testid="troop-skins-owned-copies-input"
                  type="text"
                  inputMode="decimal"
                  placeholder={isVi ? "VD: 2, 7, 13" : "e.g. 2, 7, 13"}
                  value={ownedCopiesText}
                  onChange={(e) => setOwnedCopiesText(e.target.value)}
                  className={cn(
                    CALC_MD3.dataInput,
                    "mt-1 w-full bg-muted/50 px-3 text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                  )}
                />
              </div>

              {/* Column 3: Missing / Sufficient */}
              <div
                className={cn(
                  "flex flex-col justify-center rounded-xl px-3 py-2.5",
                  isCopiesSufficient
                    ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                    : "bg-amber-500/10 text-amber-800 dark:text-amber-300"
                )}
              >
                <span className="font-sans text-xs font-medium">
                  {isVi ? "Số lượng còn thiếu" : "Missing"}
                </span>
                <div
                  data-testid="troop-skins-missing-copies-value"
                  title={formatExactNumber(
                    isCopiesSufficient
                      ? result.copiesRemainingAfter
                      : result.copiesShortfall
                  )}
                  className="mt-0.5"
                >
                  {isCopiesSufficient ? (
                    <span className="font-sans text-sm font-bold">
                      {isVi
                        ? `Đủ nguyên liệu (+Dư ${formatCompactNumber(result.copiesRemainingAfter)})`
                        : `Sufficient (+Surplus ${formatCompactNumber(result.copiesRemainingAfter)})`}
                    </span>
                  ) : (
                    <span className="font-mono text-xl font-black tabular-nums">
                      {formatCompactNumber(result.copiesShortfall)}
                    </span>
                  )}
                </div>
                {!isCopiesSufficient && result.copiesShortfall >= 1_000 ? (
                  <span className="font-mono text-xs opacity-80 tabular-nums">
                    {formatExactNumber(result.copiesShortfall)}
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

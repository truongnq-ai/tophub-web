"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  Award,
  CheckCircle2,
  ChevronRight,
  Layers,
  RotateCcw,
  Sparkles,
  Star,
  TrendingUp,
  X,
} from "lucide-react";
import {
  SKIN_HONOR_MAX_LEVEL,
  SKIN_HONOR_TOTAL_COPIES_TO_MAX,
  calculateSkinHonorProgression,
} from "@/content/calculators/skin-honor-data";
import {
  GLORY_MEDAL_MATERIAL,
  TROOP_SKIN_CATALOG,
  TROOP_SKIN_RARITIES,
  TROOP_SKIN_RARITY_ORDER,
  TROOP_SKIN_UNIVERSAL_CHEST_ICON,
  getSkinsByRarity,
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
import { SkinHonorSelector } from "./skin-honor-selector";
import {
  CALC_MD3,
  CalculatorToolHeader,
} from "./calculator-md3-primitives";

export interface SkinHonorCalculatorProps {
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

function getHonorStarCountAtLevel(honorLevel: number): number {
  if (honorLevel >= 150) return 6;
  if (honorLevel >= 125) return 5;
  if (honorLevel >= 100) return 4;
  if (honorLevel >= 75) return 3;
  if (honorLevel >= 50) return 2;
  if (honorLevel >= 25) return 1;
  return 0;
}

export function SkinHonorCalculator({
  tool,
  locale = "vi",
}: SkinHonorCalculatorProps): React.JSX.Element {
  const isVi = locale === "vi";

  const [rarity, setRarity] = useState<TroopSkinRarity>("legendary");
  const [selectedSkinId, setSelectedSkinId] = useState<string>("heavy-cavalry");
  const [currentHonorLevel, setCurrentHonorLevel] = useState<number>(0);
  const [targetHonorLevel, setTargetHonorLevel] =
    useState<number>(SKIN_HONOR_MAX_LEVEL);
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
  const ownedDuplicateCopies = useMemo(
    () => parseCompactNumberInput(ownedCopiesText),
    [ownedCopiesText]
  );

  const skinsForRarity = useMemo(() => getSkinsByRarity(rarity), [rarity]);

  const selectedSkin = useMemo(() => {
    const found = TROOP_SKIN_CATALOG.find(
      (item) => item.id === selectedSkinId && item.rarity === rarity
    );
    return found ?? skinsForRarity[0] ?? TROOP_SKIN_CATALOG[0];
  }, [rarity, selectedSkinId, skinsForRarity]);

  const result = useMemo(
    () =>
      calculateSkinHonorProgression({
        rarity,
        currentHonorLevel,
        targetHonorLevel,
        ownedMedals,
        ownedDuplicateCopies,
      }),
    [
      rarity,
      currentHonorLevel,
      targetHonorLevel,
      ownedMedals,
      ownedDuplicateCopies,
    ]
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
    setCurrentHonorLevel(0);
    setTargetHonorLevel(SKIN_HONOR_MAX_LEVEL);
    setOwnedMedalsText("0");
    setOwnedCopiesText("0");
    setIsPickerOpen(false);
    setPickerStep("rarity");
  };

  const medalName = isVi
    ? GLORY_MEDAL_MATERIAL.nameVi
    : GLORY_MEDAL_MATERIAL.nameEn;
  const copyName = isVi
    ? "Bản Sao Phôi Dư (Quy Đổi +5 Cấp/Bước)"
    : "Duplicate Skin Copies (+5 Levels/Step)";

  const selectedSkinName = isVi ? selectedSkin.nameVi : selectedSkin.nameEn;
  const selectedFactionLabel = isVi
    ? selectedSkin.factionLabelVi
    : selectedSkin.factionLabelEn;
  const selectedSpecialSkill = isVi
    ? selectedSkin.specialSkillMaxVi
    : selectedSkin.specialSkillMaxEn;
  const activeRarityShortLabel = isVi
    ? result.rarityMeta.shortNameVi
    : result.rarityMeta.shortNameEn;

  const targetStarCount = getHonorStarCountAtLevel(
    result.normalizedTargetHonor
  );
  const isPeakHonor150 = result.normalizedTargetHonor >= SKIN_HONOR_MAX_LEVEL;

  const isMedalsSufficient =
    result.totalHonorLevelsGained > 0 &&
    (result.netMedalsNeeded === 0 || ownedMedals >= result.netMedalsNeeded);

  const medalsCompletionPercent =
    result.netMedalsNeeded <= 0
      ? 100
      : Math.min(100, Math.floor((ownedMedals / result.netMedalsNeeded) * 100));

  const copiesCompletionPercent =
    result.maxCopiesApplicable <= 0
      ? 100
      : Math.min(
          100,
          Math.floor(
            (result.copiesUsedForHonor / result.maxCopiesApplicable) * 100
          )
        );

  const remainingApplicableCopies = Math.max(
    0,
    result.maxCopiesApplicable - result.copiesUsedForHonor
  );

  return (
    <div data-testid="skin-honor-calculator" className="space-y-4">
      {/* 1. Flat MD3 Tool Header + Shared <CalculatorInfoPopover /> + Reset */}
      <CalculatorToolHeader
        code={tool.code}
        title={tool.title[locale].replace(`${tool.code} `, "")}
        actions={
          <>
            <CalculatorInfoPopover
              locale={locale}
              triggerTestId="skin-honor-info-trigger"
              dialogTestId="skin-honor-info-dialog"
              title={
                isVi
                  ? "Hướng Dẫn Vinh Dự Quân Trang & Bảng Quy Đổi Phôi SSoT"
                  : "Skin Honor Guide & SSoT Copy Conversion Tables"
              }
              subtitle={
                isVi
                  ? "Cơ chế Honor Lv.0–150, quy đổi Bản Sao Phôi Dư (Bậc 1 & Bậc 2) và lộ trình bậc thang ROI"
                  : "Honor Lv.0–150 mechanics, Duplicate Copy conversion (Tier 1 & Tier 2) & Staircase ROI strategy"
              }
            >
              <div className="space-y-5">
                {/* Section 1: Honor Mechanics & Rarity Cost Per Level */}
                <div className="rounded-2xl bg-amber-500/10 p-4 ring-1 ring-amber-500/30 space-y-3">
                  <h4 className="font-sans text-sm font-bold text-foreground">
                    {isVi
                      ? "1. Cơ Chế Cấp Vinh Dự Quân Trang (Honor Lv.0–150) & Chi Phí Theo Phẩm Chất"
                      : "1. Skin Honor Level Mechanics (Lv.0–150) & Cost by Rarity"}
                  </h4>
                  <ul className="space-y-1.5 font-sans text-xs leading-relaxed text-muted-foreground">
                    <li>
                      •{" "}
                      {isVi
                        ? "Sau khi nâng 1 bộ Quân Trang đạt cấp tối đa Lv.50 (6★), hệ thống mở khóa 150 Cấp Vinh Dự (Honor Lv.0 ➔ Lv.150)."
                        : "Once a Troop Skin reaches max Lv.50 (6★), it unlocks 150 Honor Levels (Honor Lv.0 to Lv.150)."}
                    </li>
                    <li>
                      •{" "}
                      {isVi
                        ? "Bạn có thể nâng Cấp Vinh Dự bằng Huy Chương Vinh Dự hoặc dùng Bản Sao Phôi Dư để nhảy bậc +5 cấp/lần (tối đa 40 Phôi cho toàn trình Lv.0 ➔ Lv.150)."
                        : "Honor Levels can be upgraded using Glory Medals or Duplicate Skin Copies in +5-level steps (up to 40 Copies for the full Lv.0 to Lv.150 journey)."}
                    </li>
                  </ul>

                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                    {TROOP_SKIN_RARITY_ORDER.map((rKey) => {
                      const meta = TROOP_SKIN_RARITIES[rKey];
                      const fullHonorCost = 150 * meta.honorMedalsPerLevel;
                      return (
                        <div
                          key={rKey}
                          className="rounded-xl bg-background/80 p-2.5 space-y-1"
                        >
                          <div className="font-sans text-xs font-bold text-foreground">
                            {isVi ? meta.shortNameVi : meta.shortNameEn}
                          </div>
                          <div className="font-mono text-sm font-black text-amber-600 tabular-nums dark:text-amber-400">
                            {formatCompactNumber(fullHonorCost)}
                          </div>
                          <div className="font-mono text-xs text-muted-foreground tabular-nums">
                            {formatExactNumber(fullHonorCost)}
                          </div>
                          <div className="font-sans text-xs text-muted-foreground">
                            <span className="font-mono font-semibold text-foreground tabular-nums">
                              {formatCompactNumber(meta.honorMedalsPerLevel)}
                            </span>{" "}
                            <span>
                              {isVi ? "Huy Chương/cấp" : "Medals/lv"}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Section 2: Tier 1 (Lv.0-100) vs Tier 2 (Lv.101-150) Copy Conversion Breakdown */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-sans text-sm font-bold text-foreground">
                      {isVi
                        ? "2. Phân Tách Theo Bậc Quy Đổi Phôi (Bậc 1: 1 Phôi/5 Cấp • Bậc 2: 2 Phôi/5 Cấp)"
                        : "2. Copy Conversion Tier Breakdown (Tier 1: 1 Copy/5 Lv • Tier 2: 2 Copies/5 Lv)"}
                    </h4>
                    <Layers
                      className="h-4 w-4 text-sky-500"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="space-y-2">
                    {result.segments.map((seg) => (
                      <div
                        key={seg.id}
                        className={cn(
                          CALC_MD3.tonalGroup,
                          "flex flex-wrap items-center justify-between gap-2"
                        )}
                      >
                        <div>
                          <p className="font-sans text-xs font-bold text-foreground">
                            {isVi ? seg.labelVi : seg.labelEn}
                          </p>
                          <p className="font-sans text-xs text-muted-foreground">
                            {isVi
                              ? `Đoạn Lv.${seg.fromHonorLevel} ➔ Lv.${seg.toHonorLevel}: Dùng ${seg.copiesUsed} phôi (+${seg.levelsCoveredByCopies} cấp) & ${seg.levelsCoveredByMedals} cấp bằng Huy Chương`
                              : `Lv.${seg.fromHonorLevel} to Lv.${seg.toHonorLevel}: ${seg.copiesUsed} copies (+${seg.levelsCoveredByCopies} lv) & ${seg.levelsCoveredByMedals} lv by Medals`}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="font-mono text-xs font-bold text-amber-600 tabular-nums dark:text-amber-400">
                            {formatCompactNumber(seg.medalsRequired)}
                          </p>
                          <p className="font-mono text-xs text-muted-foreground tabular-nums">
                            {formatExactNumber(seg.medalsRequired)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 3: Global Roster Staircase Reference Guide */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-sans text-sm font-bold text-foreground">
                      {isVi
                        ? "3. Quy Hoạch Bậc Thang Toàn Đội Trước Khi Đẩy Vinh Dự (Staircase ROI)"
                        : "3. Global Roster Staircase Strategy Before Pushing Honor (Staircase ROI)"}
                    </h4>
                    <TrendingUp
                      className="h-4 w-4 text-emerald-500"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="space-y-1.5">
                    {result.staircaseRecommendations.slice(0, 6).map((step) => (
                      <div
                        key={step.id}
                        className={cn(
                          CALC_MD3.tonalGroup,
                          "flex flex-wrap items-center justify-between gap-2"
                        )}
                      >
                        <div>
                          <p className="font-sans text-xs font-bold text-foreground">
                            {step.stepOrder}.{" "}
                            {isVi ? step.titleVi : step.titleEn}
                          </p>
                          <p className="font-sans text-xs text-muted-foreground">
                            <span className="font-mono font-semibold text-emerald-600 tabular-nums dark:text-emerald-400">
                              +{step.gainedOwnedAtkPctTotal}% ATK • +
                              {step.gainedOwnedHpPctTotal}% HP
                            </span>{" "}
                            •{" "}
                            <span>
                              ROI:{" "}
                              <span className="font-mono font-semibold text-foreground tabular-nums">
                                {step.roiAtkPer100kMedals}%
                              </span>{" "}
                              ATK / 100K
                            </span>
                          </p>
                        </div>

                        <span className="font-mono text-xs font-bold text-amber-600 tabular-nums dark:text-amber-400">
                          {formatCompactNumber(step.costPerSkinMedals)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CalculatorInfoPopover>

            <button
              type="button"
              data-testid="skin-honor-reset-btn"
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

      {/* 2. Top Row — 3 Symmetrical Zones: [Zone 1: Vinh Dự Hiện Tại] | [Zone 2: Avatar Quân Trang Trung Tâm] | [Zone 3: Vinh Dự Mục Tiêu] */}
      <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-12">
        {/* ZONE 1 (Left - 4 cols): Vinh Dự Hiện Tại */}
        <div className="order-2 lg:order-1 lg:col-span-4">
          <SkinHonorSelector
            idPrefix="from"
            title={isVi ? "Vinh Dự Hiện Tại" : "Current Honor"}
            rarity={rarity}
            honorLevel={currentHonorLevel}
            locale={locale}
            onChangeHonorLevel={setCurrentHonorLevel}
          />
        </div>

        {/* ZONE 2 (Center - 4 cols): Avatar Quân Trang Trung Tâm + 2-Step Sequential Picker */}
        <section
          ref={pickerRef}
          data-testid="skin-honor-zone-avatar"
          className={cn(
            CALC_MD3.surfaceCard,
            "relative order-1 flex flex-col items-center justify-between gap-3.5 text-center lg:order-2 lg:col-span-4"
          )}
        >
          <div className="flex w-full items-center justify-between gap-2">
            <span className="font-sans text-xs font-bold text-muted-foreground">
              {isVi ? "Quân Trang Xét Vinh Dự" : "Selected Honor Skin"}
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
            data-testid="skin-honor-central-avatar-btn"
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
              data-testid="skin-honor-central-avatar-frame"
              className={cn(
                "relative flex h-28 w-28 items-center justify-center rounded-2xl p-2.5 shadow-md transition-all",
                isPeakHonor150
                  ? "ring-2 ring-rose-500/60 bg-rose-500/15"
                  : RARITY_AVATAR_FRAME_CLASSES[rarity]
              )}
            >
              <Image
                src={selectedSkin.iconPath}
                alt={selectedSkinName}
                width={88}
                height={88}
                className="h-22 w-22 object-contain drop-shadow"
              />

              {/* Bottom-left Target Honor Level Badge */}
              <span
                className={cn(
                  "absolute -bottom-2 -left-2 inline-flex items-center rounded-full px-2.5 py-0.5 font-mono text-xs font-black text-white shadow tabular-nums",
                  isPeakHonor150 ? "bg-rose-600" : "bg-amber-600"
                )}
              >
                +Lv.{result.normalizedTargetHonor}
              </span>
            </div>

            {/* 6 Small Stars (5 Gold + 1 Mythic Red at Honor Lv.150) */}
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
              <span className="font-mono tabular-nums">
                {formatCompactNumber(result.rarityMeta.honorMedalsPerLevel)}
              </span>{" "}
              <span>
                {isVi ? "Huy Chương/cấp" : "Medals/lv"} • {selectedFactionLabel}
              </span>
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

          {/* Summary Box: Copy Savings & Total Skin + Honor Medals */}
          <div className={cn(CALC_MD3.tonalGroup, "w-full space-y-1.5")}>
            <div className="flex items-center justify-between gap-2 text-xs font-sans">
              <span className="inline-flex items-center gap-1 font-semibold text-muted-foreground">
                <Award
                  className="h-3.5 w-3.5 text-amber-500"
                  aria-hidden="true"
                />
                <span>
                  {isVi ? "Hành trình Vinh Dự:" : "Honor progression:"}
                </span>
              </span>
              <span className="font-mono font-bold text-foreground tabular-nums">
                Lv.{result.effectiveStartHonor} ➔ Lv.{result.effectiveEndHonor}
              </span>
            </div>

            <div className="flex items-center justify-between gap-2 text-xs font-sans">
              <span className="text-muted-foreground">
                {isVi ? "Cấp bù từ Phôi Dư:" : "Levels covered by Copies:"}
              </span>
              <span className="font-mono font-bold text-sky-600 tabular-nums dark:text-sky-400">
                +{result.levelsCoveredByCopies} ({result.copiesUsedForHonor}/
                {result.maxCopiesApplicable})
              </span>
            </div>

            <div className="flex items-center justify-between gap-2 text-xs font-sans">
              <span className="text-muted-foreground">
                {isVi
                  ? "Tổng gộp Lv.1 + Vinh Dự:"
                  : "Total Lv.1 + Honor:"}
              </span>
              <span className="font-mono font-bold text-foreground tabular-nums">
                {formatCompactNumber(result.fullSkinPlusHonorCumulativeMedals)}
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
              data-testid="skin-honor-avatar-picker-popover"
              data-md3-overlay="true"
              className={cn(
                CALC_MD3.overlayCard,
                "absolute top-full left-1/2 z-40 mt-2 w-[min(92vw,380px)] -translate-x-1/2 space-y-3 text-left"
              )}
            >
              <div className="flex items-center justify-between gap-2 rounded-xl bg-muted/40 px-3 py-2 dark:bg-muted/25">
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
                  data-testid="skin-honor-picker-close-btn"
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
                        data-testid={`skin-honor-rarity-${rKey}-btn`}
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
                            <span className="font-mono font-semibold text-amber-600 tabular-nums dark:text-amber-400">
                              {formatCompactNumber(meta.honorMedalsPerLevel)}
                            </span>{" "}
                            <span>
                              {isVi ? "Huy Chương/cấp" : "Medals/lv"} •{" "}
                              {isVi
                                ? meta.costPercentLabelVi
                                : meta.costPercentLabelEn}
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
                    data-testid="skin-honor-picker-back-btn"
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
                      const isSelectedSkin = selectedSkin.id === skin.id;
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
                          data-testid={`skin-honor-item-${skin.id}-btn`}
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

        {/* ZONE 3 (Right - 4 cols): Vinh Dự Mục Tiêu */}
        <div className="order-3 lg:col-span-4">
          <SkinHonorSelector
            idPrefix="to"
            title={isVi ? "Vinh Dự Mục Tiêu" : "Target Honor"}
            rarity={rarity}
            honorLevel={targetHonorLevel}
            locale={locale}
            onChangeHonorLevel={setTargetHonorLevel}
            warningBanner={
              result.isReversed ? (
                <div
                  role="alert"
                  data-testid="skin-honor-invalid-range-warning"
                  className="flex items-start gap-2.5 rounded-xl bg-amber-500/15 p-3 text-amber-800 dark:text-amber-200"
                >
                  <AlertTriangle
                    className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400"
                    aria-hidden="true"
                  />
                  <p className="font-sans text-xs leading-relaxed">
                    {isVi
                      ? "Cấp Vinh Dự mục tiêu đang thấp hơn cấp hiện tại. Hệ thống tự động tính chênh lệch theo chiều tăng dần từ cấp thấp đến cấp cao."
                      : "Target Honor level is lower than current level. Automatically calculating progression delta from the lower level to the higher level."}
                  </p>
                </div>
              ) : null
            }
          />
        </div>
      </div>

      {/* 3. Bottom Row — ZONE 4: Unified Resources Section (2 Vertical Cards × 3 Horizontal Columns) */}
      <section
        data-testid="skin-honor-results-panel"
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
                ? "Nhập kho Huy Chương Vinh Dự và Bản Sao Phôi Dư (hỗ trợ gõ tắt 500k, 2.5m, 7.5m) để tự động khấu trừ +5 cấp/phôi"
                : "Enter owned Glory Medals and Duplicate Skin Copies (supports 500k, 2.5m, 7.5m shorthand) for automatic +5 levels/step deduction"}
            </p>
          </div>

          <span
            data-testid="skin-honor-medals-status-badge"
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-sans text-xs font-bold",
              result.medalsShortfall === 0
                ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                : "bg-amber-500/15 text-amber-800 dark:text-amber-300"
            )}
          >
            <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="font-mono font-bold tabular-nums">
              Lv.{result.effectiveStartHonor} ➔ Lv.{result.effectiveEndHonor}
            </span>
          </span>
        </div>

        <div className="space-y-3">
          {/* Card 1: Net Glory Medals Needed (Huy Chương Vinh Dự Thực Cần) */}
          <div
            data-testid="skin-honor-resource-card-medals"
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
                    <span>
                      {isVi
                        ? "Cấp nâng bằng Huy Chương:"
                        : "Levels by Medals:"}
                    </span>{" "}
                    <span className="font-mono font-semibold text-foreground tabular-nums">
                      {result.levelsCoveredByMedals}/
                      {result.totalHonorLevelsGained}
                    </span>{" "}
                    •{" "}
                    <span>
                      {isVi
                        ? "Chi phí gốc chưa trừ phôi:"
                        : "Pure cost without copies:"}
                    </span>{" "}
                    <span className="font-mono font-semibold text-foreground tabular-nums">
                      {formatCompactNumber(result.pureMedalsWithoutCopies)}
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
              {/* Column 1: Required (Net after copies) */}
              <div className="flex flex-col justify-center rounded-xl bg-background/80 px-3 py-2.5">
                <span className="font-sans text-xs font-medium text-muted-foreground">
                  {isVi
                    ? "Số lượng yêu cầu (Sau trừ Phôi)"
                    : "Required (Net after Copies)"}
                </span>
                <span
                  data-testid="skin-honor-net-medals-value"
                  title={formatExactNumber(result.netMedalsNeeded)}
                  className="mt-0.5 font-mono text-xl font-black text-amber-600 tabular-nums dark:text-amber-400"
                >
                  {formatCompactNumber(result.netMedalsNeeded)}
                </span>
                <span className="font-mono text-xs text-muted-foreground tabular-nums">
                  {formatExactNumber(result.netMedalsNeeded)}
                </span>
              </div>

              {/* Column 2: Owned Input */}
              <div className="flex flex-col justify-center rounded-xl bg-background/80 px-3 py-2.5">
                <div className="flex items-center justify-between gap-2">
                  <label
                    htmlFor="skin-honor-owned-medals-input"
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
                  id="skin-honor-owned-medals-input"
                  data-testid="skin-honor-owned-medals-input"
                  type="text"
                  inputMode="decimal"
                  placeholder={
                    isVi ? "VD: 500k, 2.5m, 7.5m" : "e.g. 500k, 2.5m, 7.5m"
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
                  data-testid="skin-honor-missing-medals-value"
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

          {/* Card 2: Duplicate Skin Copies (Bản Sao Phôi Dư • Quy Đổi +5 Cấp/Bước) */}
          <div
            data-testid="skin-honor-resource-card-copies"
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
                        ? "Bậc 1 (Lv.0–100): 1 Phôi/5 cấp • Bậc 2 (Lv.101–150): 2 Phôi/5 cấp • Tối đa"
                        : "Tier 1 (Lv.0–100): 1 Copy/5 lv • Tier 2 (Lv.101–150): 2 Copies/5 lv • Max"}
                    </span>{" "}
                    <span className="font-mono font-semibold text-foreground tabular-nums">
                      {SKIN_HONOR_TOTAL_COPIES_TO_MAX}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-sans text-xs text-muted-foreground">
                  {isVi ? "Đã áp dụng:" : "Applied:"}
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
                  result.copiesUsedForHonor >= result.maxCopiesApplicable &&
                    result.maxCopiesApplicable > 0
                    ? "bg-emerald-500"
                    : "bg-sky-500"
                )}
                style={{ width: `${copiesCompletionPercent}%` }}
              />
            </div>

            {/* Card Body: 3 Horizontal Columns */}
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
              {/* Column 1: Max Applicable & Applied Copies */}
              <div className="flex flex-col justify-center rounded-xl bg-background/80 px-3 py-2.5">
                <span className="font-sans text-xs font-medium text-muted-foreground">
                  {isVi
                    ? "Phôi tối đa có thể dùng"
                    : "Max Applicable Copies"}
                </span>
                <span
                  data-testid="skin-honor-max-copies-value"
                  title={formatExactNumber(result.maxCopiesApplicable)}
                  className="mt-0.5 font-mono text-xl font-black text-sky-600 tabular-nums dark:text-sky-400"
                >
                  {formatCompactNumber(result.maxCopiesApplicable)}
                </span>
                <span className="font-sans text-xs text-muted-foreground">
                  {isVi ? "Đã khấu trừ:" : "Applied:"}{" "}
                  <span
                    data-testid="skin-honor-copies-used-value"
                    className="font-mono font-bold text-foreground tabular-nums"
                  >
                    {formatExactNumber(result.copiesUsedForHonor)}
                  </span>{" "}
                  <span>
                    (+{result.levelsCoveredByCopies}{" "}
                    {isVi ? "cấp" : "lv"})
                  </span>
                </span>
              </div>

              {/* Column 2: Owned Duplicate Copies Input */}
              <div className="flex flex-col justify-center rounded-xl bg-background/80 px-3 py-2.5">
                <div className="flex items-center justify-between gap-2">
                  <label
                    htmlFor="skin-honor-owned-copies-input"
                    className="font-sans text-xs font-medium text-muted-foreground"
                  >
                    {isVi ? "Số lượng đang có" : "Owned"}
                  </label>
                  {ownedDuplicateCopies > 0 ? (
                    <span className="font-mono text-xs font-semibold text-sky-600 tabular-nums dark:text-sky-400">
                      = {formatExactNumber(ownedDuplicateCopies)}
                    </span>
                  ) : null}
                </div>
                <input
                  id="skin-honor-owned-copies-input"
                  data-testid="skin-honor-owned-copies-input"
                  type="text"
                  inputMode="decimal"
                  placeholder={isVi ? "VD: 10, 20, 40" : "e.g. 10, 20, 40"}
                  value={ownedCopiesText}
                  onChange={(e) => setOwnedCopiesText(e.target.value)}
                  className={cn(
                    CALC_MD3.dataInput,
                    "mt-1 w-full bg-muted/50 px-3 text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                  )}
                />
              </div>

              {/* Column 3: Glory Medals Saved by Copies */}
              <div
                className={cn(
                  "flex flex-col justify-center rounded-xl px-3 py-2.5",
                  result.medalsSavedByCopies > 0
                    ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                    : "bg-sky-500/10 text-sky-800 dark:text-sky-300"
                )}
              >
                <span className="font-sans text-xs font-medium">
                  {isVi
                    ? "Huy Chương tiết kiệm nhờ Phôi"
                    : "Glory Medals Saved by Copies"}
                </span>
                <span
                  data-testid="skin-honor-medals-saved-value"
                  title={formatExactNumber(result.medalsSavedByCopies)}
                  className="mt-0.5 font-mono text-xl font-black tabular-nums"
                >
                  {formatCompactNumber(result.medalsSavedByCopies)}
                </span>
                <span className="font-sans text-xs opacity-85">
                  {result.copiesUnusedRemainder > 0
                    ? isVi
                      ? `Dư ${result.copiesUnusedRemainder} phôi chưa dùng`
                      : `${result.copiesUnusedRemainder} unused copies`
                    : isVi
                      ? `Còn nạp thêm tối đa ${remainingApplicableCopies} phôi`
                      : `Up to ${remainingApplicableCopies} more copies applicable`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

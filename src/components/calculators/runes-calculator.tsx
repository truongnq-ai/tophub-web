"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  RotateCcw,
  Sparkles,
  X,
} from "lucide-react";
import {
  RUNE_FACTION_PRIORITIES,
  RUNE_LEVEL_COSTS,
  RUNE_SLOTS,
  calculateSingleRuneUpgrade,
  getRuneLevelCostRow,
  type RuneFactionId,
  type RuneFodderInventory,
  type RuneLevel,
  type RuneSlotDefinition,
  type RuneSlotIndex,
} from "@/content/calculators/runes-data";
import { CALCULATOR_MATERIALS } from "@/content/calculators/registry";
import type {
  CalculatorCategory,
  CalculatorLocale,
  CalculatorToolItem,
  CalculatorZone,
} from "@/content/calculators/types";
import {
  formatCompactNumber,
  formatExactNumber,
  parseCompactNumberInput,
} from "@/lib/number-format";
import { cn } from "@/lib/utils";
import { CalculatorInfoPopover } from "./calculator-info-popover";
import {
  CALC_MD3,
  CalculatorStepperButton,
  CalculatorToolHeader,
} from "./calculator-md3-primitives";

export interface RunesCalculatorProps {
  readonly zone?: CalculatorZone;
  readonly category: CalculatorCategory;
  readonly tool: CalculatorToolItem;
  readonly locale: CalculatorLocale;
}

type AvatarPickerStep = "faction" | "slot";

type ExtraFodderKey = Exclude<keyof RuneFodderInventory, "lv1Count">;

const INITIAL_FODDER: RuneFodderInventory = {
  lv1Count: 0,
  lv2Count: 0,
  lv3Count: 0,
  lv4Count: 0,
  lv5Count: 0,
  choiceChestLv1: 0,
  choiceChestLv3: 0,
  choiceChestLv5: 0,
};

const QUICK_MILESTONE_LEVELS: readonly {
  readonly level: RuneLevel;
  readonly isStarBreakpoint: boolean;
}[] = [
  { level: 1, isStarBreakpoint: false },
  { level: 5, isStarBreakpoint: true },
  { level: 6, isStarBreakpoint: true },
  { level: 8, isStarBreakpoint: true },
  { level: 10, isStarBreakpoint: false },
  { level: 12, isStarBreakpoint: true },
];

const EXTRA_FODDER_FIELDS: readonly {
  readonly key: ExtraFodderKey;
  readonly multiplier: number;
  readonly label: Readonly<Record<CalculatorLocale, string>>;
}[] = [
  {
    key: "lv2Count",
    multiplier: 3,
    label: { vi: "Phôi Lv.2 (×3)", en: "Lv.2 Fodder (×3)" },
  },
  {
    key: "lv3Count",
    multiplier: 9,
    label: { vi: "Phôi Lv.3 (×9)", en: "Lv.3 Fodder (×9)" },
  },
  {
    key: "lv4Count",
    multiplier: 27,
    label: { vi: "Phôi Lv.4 (×27)", en: "Lv.4 Fodder (×27)" },
  },
  {
    key: "lv5Count",
    multiplier: 81,
    label: { vi: "Phôi Lv.5 (×81)", en: "Lv.5 Fodder (×81)" },
  },
  {
    key: "choiceChestLv1",
    multiplier: 1,
    label: { vi: "Rương Tự Chọn Lv.1 (×1)", en: "Choice Chest Lv.1 (×1)" },
  },
  {
    key: "choiceChestLv3",
    multiplier: 9,
    label: { vi: "Rương Tự Chọn Lv.3 (×9)", en: "Choice Chest Lv.3 (×9)" },
  },
  {
    key: "choiceChestLv5",
    multiplier: 81,
    label: { vi: "Rương Tự Chọn Lv.5 (×81)", en: "Choice Chest Lv.5 (×81)" },
  },
];

function clampRuneLevel(value: number): RuneLevel {
  const clamped = Math.max(1, Math.min(12, Math.round(value)));
  return clamped as RuneLevel;
}

function getSlotPriorityTier(
  faction: RuneFactionId,
  slotIndex: RuneSlotIndex
): 1 | 2 | 3 {
  const profile =
    RUNE_FACTION_PRIORITIES.find((f) => f.id === faction) ??
    RUNE_FACTION_PRIORITIES[0];
  if (profile.priorityTier1Slots.includes(slotIndex)) return 1;
  if (profile.priorityTier2Slots.includes(slotIndex)) return 2;
  return 3;
}

function getPriorityLabel(
  tier: 1 | 2 | 3,
  locale: CalculatorLocale
): string {
  if (tier === 1) {
    return locale === "vi" ? "Ưu tiên #1" : "Priority #1";
  }
  if (tier === 2) {
    return locale === "vi" ? "Ưu tiên #2" : "Priority #2";
  }
  return locale === "vi" ? "Nâng sau" : "Secondary";
}

interface RuneLevelSelectorZoneProps {
  readonly idPrefix: "from" | "to";
  readonly title: string;
  readonly level: RuneLevel;
  readonly slot: RuneSlotDefinition;
  readonly locale: CalculatorLocale;
  readonly onChangeLevel: (nextLevel: RuneLevel) => void;
  readonly deltaNode?: React.ReactNode;
  readonly alertNode?: React.ReactNode;
}

function RuneLevelSelectorZone({
  idPrefix,
  title,
  level,
  slot,
  locale,
  onChangeLevel,
  deltaNode,
  alertNode,
}: RuneLevelSelectorZoneProps): React.JSX.Element {
  const isVi = locale === "vi";
  const costRow = getRuneLevelCostRow(level);
  const statRow = slot.levels[level - 1];

  const decreaseLabel = isVi
    ? `Giảm ${title} 1 cấp`
    : `Decrease ${title} by 1 level`;
  const increaseLabel = isVi
    ? `Tăng ${title} 1 cấp`
    : `Increase ${title} by 1 level`;

  return (
    <section
      data-testid={
        idPrefix === "from" ? "runes-zone-current" : "runes-zone-target"
      }
      className={cn(
        CALC_MD3.surfaceCard,
        "flex flex-col justify-between space-y-4",
        idPrefix === "from"
          ? "order-2 lg:order-1 lg:col-span-4"
          : "order-3 lg:col-span-4"
      )}
    >
      <div className="space-y-4">
        {/* Clean Header Row */}
        <div className="flex items-center justify-between gap-2">
          <h2 className={CALC_MD3.sectionTitle}>{title}</h2>
          <span
            data-testid={`${idPrefix}-level-badge`}
            className={cn(
              "inline-flex items-center gap-1 rounded-xl px-3 py-1 font-mono text-sm font-black tabular-nums",
              level >= 8
                ? "bg-rose-500/15 text-rose-700 dark:text-rose-300"
                : "bg-amber-500/15 text-amber-700 dark:text-amber-300"
            )}
          >
            Lv.{level} • {level}/12
          </span>
        </div>

        {/* 6 Tactical Quick Chips (Lv.1, Lv.5 ★, Lv.6 ★, Lv.8 ★, Lv.10, Lv.12 ★) */}
        <div className="space-y-1.5">
          <p className="font-sans text-xs font-semibold text-muted-foreground">
            {isVi
              ? "Chọn nhanh mốc Điểm Gãy Chiến Thuật:"
              : "Quick Tactical Breakpoints:"}
          </p>
          <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-6">
            {QUICK_MILESTONE_LEVELS.map((m) => {
              const isSelected = level === m.level;
              const isReached = level >= m.level;
              const isGrand = m.level >= 8;

              return (
                <button
                  key={m.level}
                  type="button"
                  data-testid={`${idPrefix}-milestone-${m.level}-btn`}
                  aria-pressed={isSelected}
                  onClick={() => onChangeLevel(m.level)}
                  className={cn(
                    "inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl px-1.5 py-1.5 font-mono text-xs font-black tabular-nums transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40",
                    isSelected
                      ? isGrand
                        ? "bg-rose-600 text-white shadow-sm"
                        : "bg-amber-500 text-slate-950 shadow-sm"
                      : isReached
                        ? "bg-amber-500/15 text-amber-700 hover:bg-amber-500/25 dark:text-amber-300"
                        : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  Lv.{m.level}
                  {m.isStarBreakpoint ? " ★" : ""}
                </button>
              );
            })}
          </div>
        </div>

        {/* Stepper [-] + Range Slider (1..12) + [+] */}
        <div className="space-y-2">
          <div className="flex items-center gap-2.5">
            <CalculatorStepperButton
              direction="decrease"
              testId={`${idPrefix}-level-minus-btn`}
              ariaLabel={decreaseLabel}
              disabled={level <= 1}
              onClick={() => onChangeLevel(clampRuneLevel(level - 1))}
            />

            <div className="flex-1 space-y-1">
              <input
                type="range"
                data-testid={`${idPrefix}-level-slider`}
                min={1}
                max={12}
                step={1}
                value={level}
                aria-label={title}
                onChange={(e) =>
                  onChangeLevel(clampRuneLevel(Number(e.target.value)))
                }
                className="h-2.5 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-amber-500"
              />
              <div className="flex justify-between font-mono text-xs text-muted-foreground tabular-nums">
                <span>Lv.1</span>
                <span>Lv.5★</span>
                <span>Lv.8★</span>
                <span>Lv.12★</span>
              </div>
            </div>

            <CalculatorStepperButton
              direction="increase"
              testId={`${idPrefix}-level-plus-btn`}
              ariaLabel={increaseLabel}
              disabled={level >= 12}
              onClick={() => onChangeLevel(clampRuneLevel(level + 1))}
            />
          </div>
        </div>
      </div>

      {/* Tonal Summary Well for Selected Slot at `level` */}
      <div
        data-testid={`${idPrefix}-level-summary`}
        className={cn(CALC_MD3.tonalGroup, "space-y-2")}
      >
        <div className="flex items-center justify-between gap-2 font-sans text-xs">
          <span className="font-semibold text-muted-foreground">
            {slot.primaryStatLabel[locale]}:
          </span>
          <span className="font-mono font-bold text-foreground tabular-nums">
            +{formatExactNumber(statRow.flatPrimary)}
          </span>
        </div>

        {slot.secondaryStatLabel && statRow.flatSecondary !== undefined ? (
          <div className="flex items-center justify-between gap-2 font-sans text-xs">
            <span className="font-semibold text-muted-foreground">
              {slot.secondaryStatLabel[locale]}:
            </span>
            <span className="font-mono font-bold text-rose-600 tabular-nums dark:text-rose-400">
              +{formatExactNumber(statRow.flatSecondary)}
            </span>
          </div>
        ) : null}

        {slot.slotIndex !== 6 ? (
          <div className="flex items-center justify-between gap-2 font-sans text-xs">
            <span className="font-semibold text-muted-foreground">
              {slot.percentStatLabel[locale]}:
            </span>
            {statRow.percentBonus > 0 ? (
              <span className="font-mono font-bold text-emerald-600 tabular-nums dark:text-emerald-400">
                +{statRow.percentBonus}%
              </span>
            ) : (
              <span className="font-sans text-xs text-muted-foreground">
                {isVi ? "Mở ở " : "Unlocks at "}
                <span className="font-mono font-semibold tabular-nums">
                  Lv.{slot.percentUnlockLevel}
                </span>
              </span>
            )}
          </div>
        ) : null}

        {slot.hasMarchSize ? (
          <div className="flex items-center justify-between gap-2 font-sans text-xs">
            <span className="font-semibold text-muted-foreground">
              {isVi ? "Quy Mô Hành Quân:" : "March Size Bonus:"}
            </span>
            <span
              className={cn(
                "font-mono font-bold tabular-nums",
                statRow.marchSizeBonus > 0
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-muted-foreground"
              )}
            >
              +{statRow.marchSizeBonus}
            </span>
          </div>
        ) : null}

        {deltaNode}

        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 font-sans text-xs text-muted-foreground">
          <span>
            {isVi ? "Tích lũy cấp này:" : "Cumulative at tier:"}
          </span>
          <span className="font-sans font-bold text-foreground">
            <span
              className="font-mono text-amber-600 tabular-nums dark:text-amber-400"
              title={formatExactNumber(costRow.cumulativeDustPerRune)}
            >
              {formatCompactNumber(costRow.cumulativeDustPerRune)}
            </span>{" "}
            <span>{isVi ? "Bụi" : "Dust"}</span> •{" "}
            <span
              className="font-mono tabular-nums"
              title={formatExactNumber(costRow.lv1CopiesPerRune)}
            >
              {formatCompactNumber(costRow.lv1CopiesPerRune)}
            </span>{" "}
            <span>{isVi ? "Phôi Lv.1" : "Lv.1 copies"}</span>
          </span>
        </div>
      </div>

      {alertNode}
    </section>
  );
}

export function RunesCalculator({
  tool,
  locale,
}: RunesCalculatorProps): React.JSX.Element {
  const isVi = locale === "vi";

  // R1: Single-Entity Default (Horde • Slot 6 • Lv.1 ➔ Lv.5)
  const [faction, setFaction] = useState<RuneFactionId>("horde");
  const [selectedSlot, setSelectedSlot] = useState<RuneSlotIndex>(6);
  const [fromLevel, setFromLevel] = useState<RuneLevel>(1);
  const [toLevel, setToLevel] = useState<RuneLevel>(5);

  // R5: Resource Inventory State
  const [ownedDustInput, setOwnedDustInput] = useState<string>("0");
  const [ownedCopiesInput, setOwnedCopiesInput] = useState<string>("0");
  const [fodder, setFodder] = useState<RuneFodderInventory>(INITIAL_FODDER);
  const [isFodderOpen, setIsFodderOpen] = useState<boolean>(false);

  // R3: 2-Step Central Avatar Picker State
  const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false);
  const [pickerStep, setPickerStep] = useState<AvatarPickerStep>("faction");
  const pickerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isPickerOpen) return;

    const handleMouseDown = (event: MouseEvent): void => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setIsPickerOpen(false);
        setPickerStep("faction");
      }
    };

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        setIsPickerOpen(false);
        setPickerStep("faction");
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPickerOpen]);

  const ownedDust = useMemo(
    () => parseCompactNumberInput(ownedDustInput),
    [ownedDustInput]
  );
  const directOwnedLv1Copies = useMemo(
    () => parseCompactNumberInput(ownedCopiesInput),
    [ownedCopiesInput]
  );

  const combinedFodder = useMemo<RuneFodderInventory>(
    () => ({
      ...fodder,
      lv1Count: directOwnedLv1Copies,
    }),
    [fodder, directOwnedLv1Copies]
  );

  const isInvalidRange = fromLevel > toLevel;

  const singleResult = useMemo(
    () =>
      calculateSingleRuneUpgrade({
        slotIndex: selectedSlot,
        fromLevel,
        toLevel,
        ownedDust,
        ownedMagicStones: 0,
        ownedArcaneCrystals: 0,
        fodder: combinedFodder,
      }),
    [selectedSlot, fromLevel, toLevel, ownedDust, combinedFodder]
  );

  const activeFactionProfile = useMemo(
    () =>
      RUNE_FACTION_PRIORITIES.find((f) => f.id === faction) ??
      RUNE_FACTION_PRIORITIES[0],
    [faction]
  );

  const selectedSlotPriorityTier = useMemo(
    () => getSlotPriorityTier(faction, selectedSlot),
    [faction, selectedSlot]
  );

  const requiredDust = isInvalidRange ? 0 : singleResult.requiredDust;
  const deficitDust = isInvalidRange ? 0 : singleResult.deficitDust;
  const surplusDust = isInvalidRange ? ownedDust : singleResult.surplusDust;
  const isDustSufficient = ownedDust >= requiredDust && requiredDust > 0;
  const dustCompletionPercent =
    requiredDust <= 0
      ? 100
      : Math.min(100, Math.round((ownedDust / requiredDust) * 100));

  const requiredCopies = isInvalidRange
    ? 0
    : singleResult.requiredAdditionalLv1Copies;
  const totalOwnedLv1Equivalent =
    singleResult.fodderConversion.totalLv1Equivalent;
  const extraConverterLv1Equivalent = Math.max(
    0,
    totalOwnedLv1Equivalent - directOwnedLv1Copies
  );
  const deficitCopies = isInvalidRange
    ? 0
    : singleResult.deficitLv1CopiesAfterChoiceChests;
  const surplusCopies = Math.max(0, totalOwnedLv1Equivalent - requiredCopies);
  const isCopiesSufficient =
    totalOwnedLv1Equivalent >= requiredCopies && requiredCopies > 0;
  const copiesCompletionPercent =
    requiredCopies <= 0
      ? 100
      : Math.min(
          100,
          Math.round((totalOwnedLv1Equivalent / requiredCopies) * 100)
        );

  // Actual stats at selected `toLevel` (even when fromLevel > toLevel, show exact level stat)
  const actualFromStat = singleResult.slot.levels[fromLevel - 1];
  const actualToStat = singleResult.slot.levels[toLevel - 1];
  const deltaPrimaryFlat = Math.max(
    0,
    actualToStat.flatPrimary - actualFromStat.flatPrimary
  );
  const deltaSecondaryFlat = Math.max(
    0,
    (actualToStat.flatSecondary ?? 0) - (actualFromStat.flatSecondary ?? 0)
  );
  const deltaPercentBonus = Math.max(
    0,
    actualToStat.percentBonus - actualFromStat.percentBonus
  );
  const deltaMarchSize = Math.max(
    0,
    actualToStat.marchSizeBonus - actualFromStat.marchSizeBonus
  );

  const isGrandAscended = toLevel >= 8;

  const handleTogglePicker = (): void => {
    setIsPickerOpen((prev) => {
      const next = !prev;
      if (next) {
        setPickerStep("faction");
      }
      return next;
    });
  };

  const handleChooseFaction = (nextFaction: RuneFactionId): void => {
    setFaction(nextFaction);
    setPickerStep("slot");
  };

  const handleChooseSlot = (nextSlotIndex: RuneSlotIndex): void => {
    setSelectedSlot(nextSlotIndex);
    setIsPickerOpen(false);
    setPickerStep("faction");
  };

  const handleExtraFodderChange = (
    key: ExtraFodderKey,
    rawValue: string
  ): void => {
    const parsed = parseCompactNumberInput(rawValue);
    setFodder((prev) => ({
      ...prev,
      [key]: parsed,
    }));
  };

  const handleReset = (): void => {
    setFaction("horde");
    setSelectedSlot(6);
    setFromLevel(1);
    setToLevel(5);
    setOwnedDustInput("0");
    setOwnedCopiesInput("0");
    setFodder(INITIAL_FODDER);
    setIsFodderOpen(false);
    setIsPickerOpen(false);
    setPickerStep("faction");
  };

  const runeDustName = isVi
    ? CALCULATOR_MATERIALS.runeDust.nameVi
    : CALCULATOR_MATERIALS.runeDust.nameEn;

  return (
    <div data-testid="runes-calculator" className="space-y-4">
      {/* 1. Flat MD3 Tool Header + Shared <CalculatorInfoPopover /> + Reset */}
      <CalculatorToolHeader
        code={tool.code}
        title={tool.title[locale].replace(`${tool.code} `, "")}
        actions={
          <>
            <CalculatorInfoPopover
              locale={locale}
              triggerTestId="runes-info-trigger"
              dialogTestId="runes-info-dialog"
              title={
                isVi
                  ? "Hướng Dẫn Đá Cổ Ngữ & Bảng Đối Chiếu Gốc SSoT (Lv.1 ➔ Lv.12)"
                  : "Rune Synthesis Guide & SSoT Reference Matrix (Lv.1 to Lv.12)"
              }
              subtitle={
                isVi
                  ? "Quy luật ghép Tam Phân 3^(n-1), Kỷ luật giữ Rương Tự Chọn, Thứ tự ưu tiên 3 Phe & Điểm GAR Ngày 2"
                  : "3^(n-1) Ternary Synthesis, Choice Chest Finisher Discipline, 3-Faction Slot Priority & GAR Day 2 Scoring"
              }
            >
              <div className="space-y-5">
                {/* Section 1: Ternary Synthesis 3^(n-1) & Choice Chest Discipline */}
                <div className={cn(CALC_MD3.tonalGroup, "space-y-2")}>
                  <h4 className="font-sans text-sm font-bold text-foreground">
                    {isVi
                      ? "1. Quy Luật Ghép Tam Phân 3^(n-1) & Kỷ Luật Giữ Rương Tự Chọn (Finisher Piece)"
                      : "1. 3^(n-1) Ternary Synthesis & Choice Chest Finisher Discipline"}
                  </h4>
                  <ul className="space-y-1.5 font-sans text-xs leading-relaxed text-muted-foreground">
                    <li>
                      •{" "}
                      <strong className="text-foreground">
                        {isVi
                          ? "Công thức ghép Tam Phân 3^(n-1):"
                          : "3^(n-1) Ternary Formula:"}
                      </strong>{" "}
                      {isVi
                        ? "Cứ 3 viên Đá Cổ Ngữ cùng ô cấp dưới sẽ ghép thành 1 viên cấp trên kèm Bụi Cổ Ngữ. Để đạt Lv.5 cần 81 phôi Lv.1 (8,000 Bụi); đạt Lv.8 cần 2,187 phôi Lv.1 (225,000 Bụi); đạt Lv.12 cần 177,147 phôi Lv.1 (18,225,000 Bụi)."
                        : "Every 3 identical lower-tier Runes synthesize into 1 higher-tier Rune plus Rune Dust. Reaching Lv.5 requires 81 Lv.1 copies (8,000 Dust); Lv.8 requires 2,187 copies (225,000 Dust); Lv.12 requires 177,147 copies (18,225,000 Dust)."}
                    </li>
                    <li>
                      •{" "}
                      <strong className="text-amber-600 dark:text-amber-400">
                        {isVi
                          ? "Kỷ luật giữ Rương Cổ Ngữ Tự Chọn:"
                          : "Rune Choice Chest Discipline:"}
                      </strong>{" "}
                      {isVi
                        ? "Tuyệt đối KHÔNG mở Rương Cổ Ngữ Tự Chọn ở Lv.1–Lv.3 để tránh trùng ô với Rương Ngẫu Nhiên. Luôn mở hết Rương Ngẫu Nhiên trước và giữ Rương Tự Chọn làm mảnh chốt hạ (Finisher Piece) đóng mốc Điểm Gãy Lv.5 và Đại Đột Phá Lv.8."
                        : "NEVER open Rune Choice Chests at Lv.1–Lv.3 to avoid random slot collisions. Always open all Random Rune Chests first and reserve Choice Chests strictly as Finisher Pieces for Lv.5 and Lv.8 breakpoints."}
                    </li>
                  </ul>
                </div>

                {/* Section 2: SSoT Reference Matrix (Lv.1 -> Lv.12) */}
                <div className="space-y-2">
                  <h4 className="font-sans text-sm font-bold text-foreground">
                    {isVi
                      ? "2. Bảng Đối Chiếu Chi Phí & Chỉ Số Gốc SSoT (Lv.1 ➔ Lv.12)"
                      : "2. SSoT Cost & March Size Reference Matrix (Lv.1 to Lv.12)"}
                  </h4>
                  <div className={cn(CALC_MD3.tonalGroup, "overflow-x-auto p-2")}>
                    <table className="w-full text-left font-sans text-xs">
                      <thead>
                        <tr className="border-b border-border/60 text-muted-foreground">
                          <th className="py-2 pr-2 font-semibold">
                            {isVi ? "Cấp" : "Lv"}
                          </th>
                          <th className="px-2 py-2 text-right font-semibold">
                            {isVi ? "Phôi 1 Ô" : "Copies (1x)"}
                          </th>
                          <th className="px-2 py-2 text-right font-semibold">
                            {isVi ? "Bụi 1 Ô" : "Dust (1x)"}
                          </th>
                          <th className="px-2 py-2 text-right font-semibold">
                            {isVi ? "Bụi 6 Ô" : "Dust (6x)"}
                          </th>
                          <th className="py-2 pl-2 text-right font-semibold">
                            March Size
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/50">
                        {RUNE_LEVEL_COSTS.map((row) => (
                          <tr
                            key={row.level}
                            className={cn(
                              row.isBreakpoint &&
                                "bg-amber-500/10 font-semibold text-foreground"
                            )}
                          >
                            <td className="py-2 pr-2 font-mono font-bold tabular-nums">
                              Lv.{row.level}
                              {row.isBreakpoint ? " ★" : ""}
                            </td>
                            <td className="px-2 py-2 text-right font-mono tabular-nums">
                              {formatCompactNumber(row.lv1CopiesPerRune)}
                            </td>
                            <td className="px-2 py-2 text-right font-mono tabular-nums">
                              {formatCompactNumber(row.cumulativeDustPerRune)}
                            </td>
                            <td className="px-2 py-2 text-right font-mono text-amber-600 tabular-nums dark:text-amber-400">
                              {formatCompactNumber(row.cumulativeDustSixSlots)}
                            </td>
                            <td className="py-2 pl-2 text-right font-mono text-emerald-600 tabular-nums dark:text-emerald-400">
                              +{row.totalMarchSizeSixSlots}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Section 3: 3-Faction Slot Priority & GAR Day 2 Scoring */}
                <div className="space-y-2.5">
                  <h4 className="font-sans text-sm font-bold text-foreground">
                    {isVi
                      ? "3. Thứ Tự Ưu Tiên Nâng Ô Theo 3 Phe & Điểm Sự Kiện GAR / KvK Ngày 2 (Thứ Ba)"
                      : "3. 3-Faction Slot Upgrade Priority & GAR / KvK Day 2 (Tuesday) Scoring"}
                  </h4>

                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                    {RUNE_FACTION_PRIORITIES.map((f) => (
                      <div
                        key={f.id}
                        className={cn(CALC_MD3.tonalGroup, "space-y-1 p-3")}
                      >
                        <p className="font-sans text-xs font-bold text-foreground">
                          {f.name[locale]}
                        </p>
                        <p className="font-sans text-xs font-semibold text-amber-600 dark:text-amber-400">
                          {f.badge[locale]}
                        </p>
                        <p className="font-sans text-xs leading-relaxed text-muted-foreground">
                          {f.rationale[locale]}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className={cn(CALC_MD3.tonalGroup, "space-y-1")}>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-sans text-xs font-bold text-foreground">
                        {isVi
                          ? "Quy tắc tính điểm GAR / KvK Ngày 2 (Thứ Ba):"
                          : "GAR / KvK Day 2 (Tuesday) Scoring Rule:"}
                      </span>
                      <Sparkles
                        className="h-4 w-4 text-amber-500"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="font-sans text-xs leading-relaxed text-muted-foreground">
                      {isVi
                        ? "Tiêu hao mỗi 2,000 Bụi Cổ Ngữ vào Ngày 2 (Thứ Ba) mang lại +600 điểm sự kiện GAR / KvK (1 viên Lv.1 ➔ Lv.5 = +2,400 điểm; 1 viên Lv.1 ➔ Lv.8 = +67,200 điểm). Đá Vân Ma Thuật & Pha Lê Bí Thuật thuộc nhánh Bí Bảo (6.2)."
                        : "Spending every 2,000 Rune Dust on Day 2 (Tuesday) grants +600 GAR / KvK event points (1x Lv.1 ➔ Lv.5 = +2,400 pts; 1x Lv.1 ➔ Lv.8 = +67,200 pts). Magic Stones & Arcane Crystals belong to Relics (6.2)."}
                    </p>
                  </div>
                </div>
              </div>
            </CalculatorInfoPopover>

            <button
              type="button"
              data-testid="runes-reset-btn"
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

      {/* 2. Top Row — 3 Symmetrical Zones: [Zone 1: Cấp Hiện Tại] | [Zone 2: Avatar Đá Cổ Ngữ Trung Tâm] | [Zone 3: Cấp Mục Tiêu] */}
      <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-12">
        {/* ZONE 1 (Left - 4 cols): Cấp Hiện Tại */}
        <RuneLevelSelectorZone
          idPrefix="from"
          title={isVi ? "Cấp Hiện Tại" : "Current Level"}
          level={fromLevel}
          slot={singleResult.slot}
          locale={locale}
          onChangeLevel={setFromLevel}
        />

        {/* ZONE 2 (Center - 4 cols): Avatar Đá Cổ Ngữ Trung Tâm + 2-Step Popover */}
        <section
          ref={pickerRef}
          data-testid="runes-zone-avatar"
          className={cn(
            CALC_MD3.surfaceCard,
            "relative order-1 flex flex-col items-center justify-between gap-3.5 text-center lg:order-2 lg:col-span-4"
          )}
        >
          <div className="flex w-full items-center justify-between gap-2">
            <span className="font-sans text-xs font-bold text-muted-foreground">
              {isVi ? "Ô Cổ Ngữ Đang Chọn" : "Selected Rune Slot"}
            </span>
            <span className="inline-flex items-center rounded-lg bg-amber-500/15 px-2.5 py-0.5 font-sans text-xs font-bold text-amber-700 dark:text-amber-300">
              {activeFactionProfile.name[locale]}
            </span>
          </div>

          {/* Clickable Central Rune Avatar (112×112px / h-28 w-28) */}
          <button
            type="button"
            data-testid="runes-central-avatar-btn"
            onClick={handleTogglePicker}
            aria-expanded={isPickerOpen}
            aria-haspopup="dialog"
            aria-label={
              isVi
                ? "Bấm để chọn Phe Chủ Lực và Ô Đá Cổ Ngữ"
                : "Click to select Main Faction and Rune Slot"
            }
            className="group flex w-full flex-col items-center justify-center rounded-2xl p-2 transition-transform hover:scale-[1.01] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40"
          >
            <div
              data-testid="runes-central-avatar-frame"
              className={cn(
                "relative flex h-28 w-28 items-center justify-center rounded-2xl p-2.5 shadow-md transition-all",
                isGrandAscended
                  ? "ring-2 ring-rose-500/50 bg-rose-500/10"
                  : "ring-2 ring-amber-500/45 bg-amber-500/10"
              )}
            >
              <Image
                src={CALCULATOR_MATERIALS.runeDust.iconPath}
                alt={singleResult.slot.name[locale]}
                width={80}
                height={80}
                className="h-20 w-20 object-contain drop-shadow"
              />

              {/* Top-right Slot Index Badge */}
              <span className="absolute -top-2 -right-2 inline-flex items-center rounded-full bg-slate-900 px-2.5 py-0.5 font-sans text-xs font-bold text-amber-400 shadow">
                {isVi ? `Ô #${selectedSlot}` : `Slot #${selectedSlot}`}
              </span>

              {/* Bottom-left Target Level Badge */}
              <span
                className={cn(
                  "absolute -bottom-2 -left-2 inline-flex items-center rounded-full px-2.5 py-0.5 font-mono text-xs font-black text-white shadow tabular-nums",
                  isGrandAscended ? "bg-rose-600" : "bg-amber-600"
                )}
              >
                +Lv.{toLevel}
              </span>
            </div>

            {/* Slot Full Name + Priority Badge + Tactical Role */}
            <p className="mt-3 font-heading text-base font-black text-foreground group-hover:text-amber-600 dark:group-hover:text-amber-400">
              {singleResult.slot.name[locale]}
            </p>

            <div className="mt-1 flex flex-wrap items-center justify-center gap-1.5">
              <span
                className={cn(
                  "inline-flex items-center rounded-full px-2.5 py-0.5 font-sans text-xs font-bold",
                  selectedSlotPriorityTier === 1
                    ? "bg-amber-500/15 text-amber-700 dark:text-amber-300"
                    : selectedSlotPriorityTier === 2
                      ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                      : "bg-muted text-muted-foreground"
                )}
              >
                {getPriorityLabel(selectedSlotPriorityTier, locale)} •{" "}
                {activeFactionProfile.name[locale]}
              </span>
            </div>

            <p className="mt-1.5 max-w-xs font-sans text-xs leading-relaxed text-muted-foreground">
              {singleResult.slot.tacticalRole[locale]}
            </p>

            <span className="mt-2 inline-flex min-h-[44px] items-center gap-1 rounded-xl bg-amber-500/15 px-3 py-1.5 font-sans text-xs font-bold text-amber-700 dark:text-amber-300">
              <span>
                {isVi
                  ? "Bấm đổi Phe & Ô Cổ Ngữ"
                  : "Click to change Faction & Slot"}
              </span>
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </button>

          {/* Stat Delta Summary from Lv.from -> Lv.to */}
          <div className={cn(CALC_MD3.tonalGroup, "w-full space-y-1.5")}>
            <div className="flex items-center justify-center gap-1.5 font-mono text-sm font-black text-foreground tabular-nums">
              <span>Lv.{fromLevel}</span>
              <ArrowRight
                className="h-4 w-4 text-amber-500"
                aria-hidden="true"
              />
              <span
                className={cn(
                  isGrandAscended
                    ? "text-rose-600 dark:text-rose-400"
                    : "text-amber-600 dark:text-amber-400"
                )}
              >
                Lv.{toLevel}
              </span>
            </div>

            <p className="font-sans text-xs text-muted-foreground">
              {isVi ? "Chỉ số tăng thêm:" : "Stat gain:"}{" "}
              <span className="font-mono font-bold text-foreground tabular-nums">
                +{formatExactNumber(deltaPrimaryFlat)}
              </span>{" "}
              <span>{singleResult.slot.primaryStatLabel[locale]}</span>
              {singleResult.slot.secondaryStatLabel &&
              deltaSecondaryFlat > 0 ? (
                <>
                  {" • "}
                  <span className="font-mono font-bold text-rose-600 tabular-nums dark:text-rose-400">
                    +{formatExactNumber(deltaSecondaryFlat)}
                  </span>{" "}
                  <span>{singleResult.slot.secondaryStatLabel[locale]}</span>
                </>
              ) : null}
              {deltaPercentBonus > 0 ? (
                <>
                  {" • "}
                  <span className="font-mono font-bold text-emerald-600 tabular-nums dark:text-emerald-400">
                    +{deltaPercentBonus}%
                  </span>{" "}
                  <span>{singleResult.slot.percentStatLabel[locale]}</span>
                </>
              ) : null}
              {deltaMarchSize > 0 ? (
                <>
                  {" • "}
                  <span className="font-mono font-bold text-emerald-600 tabular-nums dark:text-emerald-400">
                    +{deltaMarchSize}
                  </span>{" "}
                  <span>{isVi ? "March Size" : "March"}</span>
                </>
              ) : null}
            </p>
          </div>

          {/* 2-Step Sequential Picker Popover (Step 1: Faction ➔ Step 2: Slot I–VI) */}
          {isPickerOpen ? (
            <div
              role="dialog"
              aria-label={
                isVi
                  ? "Chọn Phe Đội Hình Chủ Lực và Ô Đá Cổ Ngữ"
                  : "Select Main Queue Faction and Rune Slot"
              }
              data-testid="runes-avatar-picker-popover"
              data-md3-overlay="true"
              className={cn(
                CALC_MD3.overlayCard,
                "absolute top-full left-1/2 z-40 mt-2 w-[min(92vw,380px)] -translate-x-1/2 space-y-3 text-left"
              )}
            >
              <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-2">
                <p className="font-sans text-xs font-bold text-foreground">
                  {pickerStep === "faction"
                    ? isVi
                      ? "Bước 1/2: Chọn Phe Đội Hình Chủ Lực"
                      : "Step 1/2: Select Main Queue Faction"
                    : isVi
                      ? `Bước 2/2: Chọn Ô Đá Cổ Ngữ (${activeFactionProfile.name.vi})`
                      : `Step 2/2: Select Rune Slot (${activeFactionProfile.name.en})`}
                </p>

                <button
                  type="button"
                  data-testid="runes-picker-close-btn"
                  aria-label={isVi ? "Đóng bộ chọn" : "Close picker"}
                  onClick={() => {
                    setIsPickerOpen(false);
                    setPickerStep("faction");
                  }}
                  className={cn(
                    CALC_MD3.iconButton,
                    "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              {pickerStep === "faction" ? (
                <div className="space-y-2">
                  {RUNE_FACTION_PRIORITIES.map((f) => {
                    const isSelectedFaction = faction === f.id;
                    return (
                      <button
                        key={f.id}
                        type="button"
                        data-testid={`runes-picker-faction-${f.id}`}
                        onClick={() => handleChooseFaction(f.id)}
                        className={cn(
                          CALC_MD3.tonalTile,
                          "flex min-h-[48px] w-full items-center justify-between gap-3 p-3 text-left",
                          isSelectedFaction && CALC_MD3.tileSelected
                        )}
                      >
                        <div className="min-w-0 flex-1 space-y-0.5">
                          <p className="font-heading text-sm font-bold text-foreground">
                            {f.name[locale]}
                          </p>
                          <p className="font-sans text-xs font-semibold text-amber-600 dark:text-amber-400">
                            {f.badge[locale]}
                          </p>
                        </div>
                        <ChevronRight
                          className="h-4 w-4 shrink-0 text-muted-foreground"
                          aria-hidden="true"
                        />
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-2.5">
                  <button
                    type="button"
                    data-testid="runes-picker-back-btn"
                    onClick={() => setPickerStep("faction")}
                    className={cn(
                      CALC_MD3.chipButton,
                      "w-full justify-start bg-muted/50 font-sans text-xs font-bold text-amber-700 hover:bg-muted dark:text-amber-300"
                    )}
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    <span>
                      {isVi ? "← Đổi phe chủ lực" : "← Change Main Faction"}
                    </span>
                  </button>

                  <div className="max-h-72 space-y-1.5 overflow-y-auto pr-1">
                    {RUNE_SLOTS.map((slot) => {
                      const isSelectedSlot = selectedSlot === slot.slotIndex;
                      const tier = getSlotPriorityTier(faction, slot.slotIndex);
                      return (
                        <button
                          key={slot.slotIndex}
                          type="button"
                          data-testid={`runes-picker-slot-${slot.slotIndex}`}
                          onClick={() => handleChooseSlot(slot.slotIndex)}
                          className={cn(
                            CALC_MD3.tonalTile,
                            "flex min-h-[52px] w-full items-center justify-between gap-2.5 p-2.5 text-left",
                            isSelectedSlot && CALC_MD3.tileSelected
                          )}
                        >
                          <div className="min-w-0 flex-1 space-y-0.5">
                            <p className="truncate font-sans text-xs font-bold text-foreground">
                              {slot.name[locale]}
                            </p>
                            <p className="font-sans text-xs text-muted-foreground">
                              {isVi ? "Mở chỉ số % ở " : "Unlocks % at "}
                              <span className="font-mono font-semibold text-foreground tabular-nums">
                                Lv.{slot.percentUnlockLevel}
                              </span>
                              {slot.hasMarchSize
                                ? isVi
                                  ? " • Có +March Size"
                                  : " • +March Size"
                                : ""}
                            </p>
                          </div>

                          <span
                            className={cn(
                              "shrink-0 rounded-md px-2 py-0.5 font-sans text-xs font-bold",
                              tier === 1
                                ? "bg-amber-500/15 text-amber-700 dark:text-amber-300"
                                : tier === 2
                                  ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                                  : "bg-muted text-muted-foreground"
                            )}
                          >
                            {getPriorityLabel(tier, locale)}
                          </span>
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
        <RuneLevelSelectorZone
          idPrefix="to"
          title={isVi ? "Cấp Mục Tiêu" : "Target Level"}
          level={toLevel}
          slot={singleResult.slot}
          locale={locale}
          onChangeLevel={setToLevel}
          deltaNode={
            !isInvalidRange && toLevel > fromLevel ? (
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 font-sans text-xs">
                <span className="font-semibold text-emerald-700 dark:text-emerald-300">
                  {isVi ? "Độ chênh lệch đạt được:" : "Target stat gain:"}
                </span>
                <span className="font-mono font-bold text-emerald-600 tabular-nums dark:text-emerald-400">
                  +{formatExactNumber(deltaPrimaryFlat)}
                  {deltaSecondaryFlat > 0
                    ? ` / +${formatExactNumber(deltaSecondaryFlat)}`
                    : ""}
                  {deltaPercentBonus > 0 ? ` • +${deltaPercentBonus}%` : ""}
                  {deltaMarchSize > 0 ? ` • +${deltaMarchSize} March` : ""}
                </span>
              </div>
            ) : null
          }
          alertNode={
            isInvalidRange ? (
              <div
                role="alert"
                data-testid="runes-invalid-range-warning"
                className="flex items-start gap-2.5 rounded-xl bg-amber-500/15 p-3 text-amber-800 dark:text-amber-200"
              >
                <AlertTriangle
                  className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400"
                  aria-hidden="true"
                />
                <p className="font-sans text-xs leading-relaxed">
                  {isVi
                    ? "Cấp mục tiêu đang thấp hơn cấp hiện tại. Số lượng Bụi Cổ Ngữ và Phôi Lv.1 yêu cầu được đặt về 0."
                    : "Target level is lower than current level. Required Rune Dust and Lv.1 Copies are set to 0."}
                </p>
              </div>
            ) : null
          }
        />
      </div>

      {/* 3. Bottom Row — ZONE 4: Unified Resources Section (2 Vertical Cards × 3 Horizontal Columns) */}
      <section
        data-testid="runes-resources-panel"
        className={cn(CALC_MD3.surfaceCard, "space-y-4")}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className={CALC_MD3.sectionTitle}>
              {isVi ? "Tài Nguyên" : "Resources"}
            </h2>
            <p className="mt-0.5 font-sans text-xs text-muted-foreground">
              {isVi
                ? "Nhập số lượng đang có (hỗ trợ gõ tắt 8k, 48k, 1.35m) để tự động tính số lượng còn thiếu hoặc dư"
                : "Enter owned amounts (supports 8k, 48k, 1.35m shorthand) to automatically compute missing or surplus materials"}
            </p>
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-3 py-1 font-sans text-xs font-semibold text-amber-800 dark:text-amber-300">
            <CheckCircle2
              className="h-4 w-4 text-amber-500"
              aria-hidden="true"
            />
            <span>{singleResult.slot.shortName[locale]}</span>
            <span>•</span>
            <span className="font-mono font-bold tabular-nums">
              Lv.{fromLevel} ➔ Lv.{toLevel}
            </span>
          </span>
        </div>

        <div className="space-y-3">
          {/* Card 1: Bụi Cổ Ngữ (Rune Dust) */}
          <div
            data-testid="runes-resource-card-dust"
            className={cn(CALC_MD3.tonalGroup, "space-y-3")}
          >
            {/* Card Header */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-background/90 p-1.5 shadow-sm">
                  <Image
                    src={CALCULATOR_MATERIALS.runeDust.iconPath}
                    alt={runeDustName}
                    width={32}
                    height={32}
                    className="h-8 w-8 object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="truncate font-heading text-sm font-bold text-foreground sm:text-base">
                    {runeDustName}
                  </h3>
                  <p className="font-sans text-xs text-muted-foreground">
                    <span className="font-mono font-semibold text-foreground tabular-nums">
                      Lv.{fromLevel} ➔ Lv.{toLevel}
                    </span>
                    {" • "}
                    <span>
                      {isVi ? "Cộng thêm " : "Grants "}
                      <span className="font-mono font-semibold text-amber-600 tabular-nums dark:text-amber-400">
                        +
                        {formatExactNumber(
                          isInvalidRange
                            ? 0
                            : singleResult.garDay2PointsFromRequiredDust
                        )}
                      </span>{" "}
                      {isVi ? "điểm GAR Ngày 2" : "GAR Day 2 pts"}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-sans text-xs text-muted-foreground">
                  {isVi ? "Tiến độ:" : "Progress:"}
                </span>
                <span className="font-mono text-xs font-bold text-foreground tabular-nums">
                  {dustCompletionPercent}%
                </span>
              </div>
            </div>

            <div className="h-1.5 w-full overflow-hidden rounded-full bg-background/80">
              <div
                className={cn(
                  "h-full rounded-full transition-all",
                  isDustSufficient ? "bg-emerald-500" : "bg-amber-500"
                )}
                style={{ width: `${dustCompletionPercent}%` }}
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
                  data-testid="runes-total-dust"
                  title={formatExactNumber(requiredDust)}
                  className="mt-0.5 font-mono text-xl font-black text-amber-600 tabular-nums dark:text-amber-400"
                >
                  {formatCompactNumber(requiredDust)}
                </span>
                <span className="font-mono text-xs text-muted-foreground tabular-nums">
                  {formatExactNumber(requiredDust)}
                </span>
              </div>

              {/* Column 2: Owned Input */}
              <div className="flex flex-col justify-center rounded-xl bg-background/80 px-3 py-2.5">
                <div className="flex items-center justify-between gap-2">
                  <label
                    htmlFor="runes-owned-dust-input"
                    className="font-sans text-xs font-medium text-muted-foreground"
                  >
                    {isVi ? "Số lượng đang có" : "Owned"}
                  </label>
                  {ownedDust > 0 ? (
                    <span className="font-mono text-xs font-semibold text-amber-600 tabular-nums dark:text-amber-400">
                      = {formatExactNumber(ownedDust)}
                    </span>
                  ) : null}
                </div>
                <input
                  id="runes-owned-dust-input"
                  data-testid="runes-owned-dust-input"
                  type="text"
                  inputMode="decimal"
                  placeholder={isVi ? "VD: 8k, 48k, 1.35m" : "e.g. 8k, 48k, 1.35m"}
                  value={ownedDustInput}
                  onChange={(e) => setOwnedDustInput(e.target.value)}
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
                  isDustSufficient
                    ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                    : "bg-amber-500/10 text-amber-800 dark:text-amber-300"
                )}
              >
                <span className="font-sans text-xs font-medium">
                  {isVi ? "Số lượng còn thiếu" : "Missing"}
                </span>
                <div
                  data-testid="runes-missing-dust"
                  title={formatExactNumber(
                    isDustSufficient ? surplusDust : deficitDust
                  )}
                  className="mt-0.5"
                >
                  {isDustSufficient ? (
                    <span className="font-sans text-sm font-bold">
                      {isVi
                        ? `Đủ nguyên liệu (+Dư ${formatCompactNumber(surplusDust)})`
                        : `Sufficient (+Surplus ${formatCompactNumber(surplusDust)})`}
                    </span>
                  ) : (
                    <span className="font-mono text-xl font-black tabular-nums">
                      {formatCompactNumber(deficitDust)}
                    </span>
                  )}
                </div>
                {!isDustSufficient && deficitDust >= 1_000 ? (
                  <span className="font-mono text-xs opacity-80 tabular-nums">
                    {formatExactNumber(deficitDust)}
                  </span>
                ) : null}
              </div>
            </div>
          </div>

          {/* Card 2: Phôi Đá Cổ Ngữ Lv.1 (Quy đổi 3^(n-1)) */}
          <div
            data-testid="runes-resource-card-copies"
            className={cn(CALC_MD3.tonalGroup, "space-y-3")}
          >
            {/* Card Header */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-background/90 p-1.5 shadow-sm">
                  <Image
                    src="/images/events/entry-icons/icon_Runes.webp"
                    alt={
                      isVi
                        ? "Phôi Đá Cổ Ngữ Lv.1 (Quy đổi 3^(n-1))"
                        : "Lv.1 Rune Copies (3^(n-1) Equivalent)"
                    }
                    width={32}
                    height={32}
                    className="h-8 w-8 object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="truncate font-heading text-sm font-bold text-foreground sm:text-base">
                    {isVi
                      ? "Phôi Đá Cổ Ngữ Lv.1 (Quy đổi 3^(n-1))"
                      : "Lv.1 Rune Copies (3^(n-1) Equivalent)"}
                  </h3>
                  <p className="font-sans text-xs text-muted-foreground">
                    <span>
                      {isVi ? "Công thức Tam Phân: " : "Ternary formula: "}
                    </span>
                    <span className="font-mono font-semibold text-foreground tabular-nums">
                      3^({toLevel}-1) - 3^({fromLevel}-1)
                    </span>{" "}
                    <span>{isVi ? "phôi Lv.1" : "Lv.1 copies"}</span>
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
                  isCopiesSufficient ? "bg-emerald-500" : "bg-amber-500"
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
                  data-testid="runes-total-copies"
                  title={formatExactNumber(requiredCopies)}
                  className="mt-0.5 font-mono text-xl font-black text-amber-600 tabular-nums dark:text-amber-400"
                >
                  {formatCompactNumber(requiredCopies)}
                </span>
                <span className="font-mono text-xs text-muted-foreground tabular-nums">
                  {formatExactNumber(requiredCopies)}
                </span>
              </div>

              {/* Column 2: Owned Input */}
              <div className="flex flex-col justify-center rounded-xl bg-background/80 px-3 py-2.5">
                <div className="flex items-center justify-between gap-2">
                  <label
                    htmlFor="runes-owned-copies-input"
                    className="font-sans text-xs font-medium text-muted-foreground"
                  >
                    {isVi ? "Số lượng đang có" : "Owned"}
                  </label>
                  {totalOwnedLv1Equivalent > 0 ? (
                    <span className="font-mono text-xs font-semibold text-amber-600 tabular-nums dark:text-amber-400">
                      = {formatExactNumber(totalOwnedLv1Equivalent)}
                    </span>
                  ) : null}
                </div>
                <input
                  id="runes-owned-copies-input"
                  data-testid="runes-owned-copies-input"
                  type="text"
                  inputMode="decimal"
                  placeholder={isVi ? "VD: 80, 500, 1.5k" : "e.g. 80, 500, 1.5k"}
                  value={ownedCopiesInput}
                  onChange={(e) => setOwnedCopiesInput(e.target.value)}
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
                  data-testid="runes-missing-copies"
                  title={formatExactNumber(
                    isCopiesSufficient ? surplusCopies : deficitCopies
                  )}
                  className="mt-0.5"
                >
                  {isCopiesSufficient ? (
                    <span className="font-sans text-sm font-bold">
                      {isVi
                        ? `Đủ nguyên liệu (+Dư ${formatCompactNumber(surplusCopies)})`
                        : `Sufficient (+Surplus ${formatCompactNumber(surplusCopies)})`}
                    </span>
                  ) : (
                    <span className="font-mono text-xl font-black tabular-nums">
                      {formatCompactNumber(deficitCopies)}
                    </span>
                  )}
                </div>
                {!isCopiesSufficient && deficitCopies >= 1_000 ? (
                  <span className="font-mono text-xs opacity-80 tabular-nums">
                    {formatExactNumber(deficitCopies)}
                  </span>
                ) : null}
              </div>
            </div>

            {/* Compact Collapsible Quick Converter for Lv.2–Lv.5 Fodder & Choice Chests */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                data-testid="runes-fodder-converter-toggle"
                aria-expanded={isFodderOpen}
                onClick={() => setIsFodderOpen((prev) => !prev)}
                className={cn(
                  CALC_MD3.chipButton,
                  "w-full justify-between bg-background/80 px-3 py-2 font-sans text-xs font-semibold text-foreground hover:bg-background"
                )}
              >
                <span>
                  {isVi
                    ? "Bộ quy đổi nhanh Phôi Lv.2–Lv.5 & Rương Tự Chọn (×3 / ×9 / ×27 / ×81)"
                    : "Quick Lv.2–Lv.5 Fodder & Choice Chest Converter (×3 / ×9 / ×27 / ×81)"}
                </span>
                <span className="inline-flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                  {extraConverterLv1Equivalent > 0 ? (
                    <span className="font-mono font-bold tabular-nums">
                      +{formatExactNumber(extraConverterLv1Equivalent)}
                    </span>
                  ) : null}
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      isFodderOpen && "rotate-180"
                    )}
                    aria-hidden="true"
                  />
                </span>
              </button>

              {isFodderOpen ? (
                <div className="space-y-2.5 rounded-xl bg-background/70 p-3">
                  <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                    {EXTRA_FODDER_FIELDS.map((field) => (
                      <div key={field.key} className="space-y-1">
                        <label
                          htmlFor={`fodder-input-${field.key}`}
                          className="block font-sans text-xs font-medium text-muted-foreground"
                        >
                          {field.label[locale]}
                        </label>
                        <input
                          id={`fodder-input-${field.key}`}
                          data-testid={`fodder-input-${field.key}`}
                          type="number"
                          min={0}
                          value={fodder[field.key]}
                          onChange={(e) =>
                            handleExtraFodderChange(field.key, e.target.value)
                          }
                          className={cn(
                            CALC_MD3.dataInput,
                            "w-full bg-muted/50 px-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                          )}
                        />
                      </div>
                    ))}
                  </div>

                  {singleResult.choiceChestWarning ? (
                    <div className="flex items-start gap-2.5 rounded-xl bg-amber-500/15 p-2.5 text-amber-800 dark:text-amber-200">
                      <AlertTriangle
                        className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400"
                        aria-hidden="true"
                      />
                      <p className="font-sans text-xs leading-relaxed">
                        {isVi
                          ? "Không nên mở Rương Tự Chọn ở Lv.1–Lv.3! Hãy giữ làm mảnh chốt hạ (Finisher Piece) khi ghép lên Lv.5 hoặc Lv.8."
                          : "Avoid opening Choice Chests at Lv.1–Lv.3! Reserve them as Finisher Pieces for Lv.5 or Lv.8."}
                      </p>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

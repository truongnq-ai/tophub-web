"use client";

import React, { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Gem,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import {
  RUNE_FACTION_PRIORITIES,
  RUNE_LEVEL_COSTS,
  RUNE_LEVELS,
  RUNE_SLOTS,
  calculateRuneBoardPlan,
  calculateSingleRuneUpgrade,
  type RuneBoardSlotTarget,
  type RuneFactionId,
  type RuneFodderInventory,
  type RuneLevel,
  type RuneScopeMode,
  type RuneSlotIndex,
} from "@/content/calculators/runes-data";
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

export interface RunesCalculatorProps {
  readonly zone?: CalculatorZone;
  readonly category: CalculatorCategory;
  readonly tool: CalculatorToolItem;
  readonly locale: CalculatorLocale;
}

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

const SCOPE_OPTIONS: readonly {
  readonly mode: RuneScopeMode;
  readonly label: Readonly<Record<CalculatorLocale, string>>;
}[] = [
  {
    mode: "board6",
    label: { vi: "Trọn Bộ 6 Ô (×6)", en: "Full 6-Slot Board (×6)" },
  },
  {
    mode: "single",
    label: { vi: "1 Ô Lẻ (×1)", en: "Single Rune (×1)" },
  },
];

const QUICK_PRESETS: readonly {
  readonly id: string;
  readonly from: RuneLevel;
  readonly to: RuneLevel;
  readonly label: Readonly<Record<CalculatorLocale, string>>;
  readonly desc: Readonly<Record<CalculatorLocale, string>>;
}[] = [
  {
    id: "lv1-lv5",
    from: 1,
    to: 5,
    label: {
      vi: "Lv.1 ➔ Lv.5 (Điểm Gãy #1)",
      en: "Lv.1 ➔ Lv.5 (Breakpoint #1)",
    },
    desc: {
      vi: "81 phôi Lv.1 & 8K Bụi/ô (48K/6 ô) — Mở +5% HP/ATK Tướng & +110 March Size",
      en: "81 Lv.1 copies & 8K Dust/slot (48K/6 slots) — Unlocks +5% Hero HP/ATK & +110 March Size",
    },
  },
  {
    id: "lv5-lv6",
    from: 5,
    to: 6,
    label: {
      vi: "Lv.5 ➔ Lv.6 (Trung Kỳ)",
      en: "Lv.5 ➔ Lv.6 (Mid-Game)",
    },
    desc: {
      vi: "Nâng gấp đôi lên +10% HP/ATK Tướng & +150 March Size",
      en: "Doubles to +10% Hero HP/ATK & +150 March Size",
    },
  },
  {
    id: "lv5-lv8",
    from: 5,
    to: 8,
    label: {
      vi: "Lv.5 ➔ Lv.8 (Đại Đột Phá #2)",
      en: "Lv.5 ➔ Lv.8 (Grand Breakpoint #2)",
    },
    desc: {
      vi: "Mở khóa +5% HP/ATK Toàn Lính, +5% HP Bí Bảo & +250 March Size",
      en: "Unlocks +5% All Soldiers HP/ATK, +5% Relic HP & +250 March Size",
    },
  },
  {
    id: "lv8-lv12",
    from: 8,
    to: 12,
    label: {
      vi: "Lv.8 ➔ Lv.12 (Đỉnh Tối Đa)",
      en: "Lv.8 ➔ Lv.12 (Max Cap)",
    },
    desc: {
      vi: "Đỉnh tuyệt đối +40% HP/ATK Tướng, +30% Toàn Lính & +450 March Size",
      en: "Max cap +40% Hero HP/ATK, +30% All Soldiers & +450 March Size",
    },
  },
];

export function RunesCalculator({ tool, locale }: RunesCalculatorProps) {
  const [mode, setMode] = useState<RuneScopeMode>("board6");
  const [faction, setFaction] = useState<RuneFactionId>("horde");

  const [selectedSlot, setSelectedSlot] = useState<RuneSlotIndex>(6);
  const [singleFrom, setSingleFrom] = useState<RuneLevel>(1);
  const [singleTo, setSingleTo] = useState<RuneLevel>(5);

  const [boardSlots, setBoardSlots] = useState<readonly RuneBoardSlotTarget[]>(
    () =>
      RUNE_SLOTS.map((s) => ({
        slotIndex: s.slotIndex,
        fromLevel: 1,
        toLevel: 5,
      }))
  );

  const [ownedDustInput, setOwnedDustInput] = useState<string>("0");
  const [ownedMagicStonesInput, setOwnedMagicStonesInput] =
    useState<string>("0");
  const [ownedArcaneCrystalsInput, setOwnedArcaneCrystalsInput] =
    useState<string>("0");
  const [fodder, setFodder] = useState<RuneFodderInventory>(INITIAL_FODDER);

  const ownedDust = useMemo(
    () => parseCompactNumberInput(ownedDustInput),
    [ownedDustInput]
  );
  const ownedMagicStones = useMemo(
    () => parseCompactNumberInput(ownedMagicStonesInput),
    [ownedMagicStonesInput]
  );
  const ownedArcaneCrystals = useMemo(
    () => parseCompactNumberInput(ownedArcaneCrystalsInput),
    [ownedArcaneCrystalsInput]
  );

  const singleResult = useMemo(
    () =>
      calculateSingleRuneUpgrade({
        slotIndex: selectedSlot,
        fromLevel: singleFrom,
        toLevel: singleTo,
        ownedDust,
        ownedMagicStones,
        ownedArcaneCrystals,
        fodder,
      }),
    [
      selectedSlot,
      singleFrom,
      singleTo,
      ownedDust,
      ownedMagicStones,
      ownedArcaneCrystals,
      fodder,
    ]
  );

  const boardResult = useMemo(
    () =>
      calculateRuneBoardPlan({
        faction,
        slots: boardSlots,
        ownedDust,
        ownedMagicStones,
        ownedArcaneCrystals,
        fodder,
      }),
    [
      faction,
      boardSlots,
      ownedDust,
      ownedMagicStones,
      ownedArcaneCrystals,
      fodder,
    ]
  );

  const applyPreset = (from: RuneLevel, to: RuneLevel) => {
    setSingleFrom(from);
    setSingleTo(to);
    setBoardSlots((prev) =>
      prev.map((s) => ({
        ...s,
        fromLevel: from,
        toLevel: to,
      }))
    );
  };

  const updateBoardSlotLevel = (
    slotIndex: RuneSlotIndex,
    field: "fromLevel" | "toLevel",
    nextLevel: RuneLevel
  ) => {
    setBoardSlots((prev) =>
      prev.map((item) => {
        if (item.slotIndex !== slotIndex) return item;
        if (field === "fromLevel") {
          const safeTo = Math.max(nextLevel, item.toLevel) as RuneLevel;
          return { ...item, fromLevel: nextLevel, toLevel: safeTo };
        }
        const safeFrom = Math.min(item.fromLevel, nextLevel) as RuneLevel;
        return { ...item, fromLevel: safeFrom, toLevel: nextLevel };
      })
    );
  };

  const handleReset = () => {
    setSingleFrom(1);
    setSingleTo(5);
    setBoardSlots(
      RUNE_SLOTS.map((s) => ({
        slotIndex: s.slotIndex,
        fromLevel: 1,
        toLevel: 5,
      }))
    );
    setOwnedDustInput("0");
    setOwnedMagicStonesInput("0");
    setOwnedArcaneCrystalsInput("0");
    setFodder(INITIAL_FODDER);
  };

  const activeRequiredDust =
    mode === "board6"
      ? boardResult.totalRequiredDust
      : singleResult.requiredDust;
  const activeDeficitDust =
    mode === "board6" ? boardResult.deficitDust : singleResult.deficitDust;
  const activeRequiredCopies =
    mode === "board6"
      ? boardResult.totalRequiredAdditionalLv1Copies
      : singleResult.requiredAdditionalLv1Copies;
  const activeDeficitCopies =
    mode === "board6"
      ? boardResult.deficitLv1CopiesAfterChoiceChests
      : singleResult.deficitLv1CopiesAfterChoiceChests;
  const activeFinisherChoiceUsed =
    mode === "board6"
      ? boardResult.choiceChestsUsedAsFinisherLv1Eq
      : singleResult.choiceChestsUsedAsFinisherLv1Eq;
  const activeChoiceWarning =
    mode === "board6"
      ? boardResult.choiceChestWarning
      : singleResult.choiceChestWarning;
  const activeGarRequiredPts =
    mode === "board6"
      ? boardResult.garDay2PointsFromRequiredDust
      : singleResult.garDay2PointsFromRequiredDust;
  const activeGarVaultPts =
    mode === "board6"
      ? boardResult.garDay2PointsFromOwnedVault
      : singleResult.garDay2PointsFromOwnedVault;

  return (
    <div data-testid="runes-calculator" className="space-y-4">
      <CalculatorToolHeader
        code={tool.code}
        title={tool.title[locale].replace(`${tool.code} `, "")}
        actions={
          <>
            {SCOPE_OPTIONS.map((opt) => {
              const isSelected = mode === opt.mode;
              return (
                <button
                  key={opt.mode}
                  type="button"
                  data-testid={`scope-${opt.mode}-btn`}
                  aria-pressed={isSelected}
                  onClick={() => setMode(opt.mode)}
                  className={cn(
                    CALC_MD3.chipButton,
                    "font-sans",
                    isSelected
                      ? "bg-amber-500 text-slate-950 font-bold"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <span>{opt.label[locale]}</span>
                </button>
              );
            })}

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
              <span>{locale === "vi" ? "Đặt lại" : "Reset"}</span>
            </button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 items-start">
        {/* LEFT COLUMN (7/12): CONFIGURATION & INVENTORY */}
        <div className="space-y-4 lg:col-span-7">
          <section className={cn(CALC_MD3.surfaceCard, "space-y-4")}>
            <div>
              <p className={cn(CALC_MD3.eyebrow, "text-muted-foreground")}>
                {locale === "vi"
                  ? "Bước 1 — Điểm Gãy Chiến Thuật & Phe Chủ Lực"
                  : "Step 1 — Tactical Breakpoints & Main Faction"}
              </p>
              <h2 className={CALC_MD3.sectionTitle}>
                {locale === "vi"
                  ? "Cấu hình Cấp Đá Cổ Ngữ (Lv.1 ➔ Lv.12)"
                  : "Configure Rune Levels (Lv.1 to Lv.12)"}
              </h2>
            </div>

            {/* Quick Breakpoint Presets */}
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {QUICK_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  data-testid={`preset-${preset.id}-btn`}
                  onClick={() => applyPreset(preset.from, preset.to)}
                  className={cn(
                    CALC_MD3.chipButton,
                    "flex flex-col items-start justify-center px-3.5 py-2 text-left bg-muted/40 hover:bg-amber-500/10"
                  )}
                >
                  <span className="font-sans text-xs font-bold text-foreground">
                    {preset.label[locale]}
                  </span>
                  <span className="font-sans text-xs text-muted-foreground">
                    {preset.desc[locale]}
                  </span>
                </button>
              ))}
            </div>

            {/* Faction Priority Selector */}
            <div className={cn(CALC_MD3.tonalGroup, "space-y-2.5")}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-sans text-xs font-bold text-foreground">
                  {locale === "vi"
                    ? "Phe Đội Hình Chủ Lực (Thứ tự ưu tiên nâng ô):"
                    : "Main Queue Faction (Slot Upgrade Priority):"}
                </span>
                <span className="font-sans text-xs font-semibold text-amber-600 dark:text-amber-400">
                  {boardResult.factionProfile.badge[locale]}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {RUNE_FACTION_PRIORITIES.map((f) => {
                  const active = faction === f.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      data-testid={`faction-${f.id}-btn`}
                      aria-pressed={active}
                      onClick={() => setFaction(f.id)}
                      className={cn(
                        CALC_MD3.chipButton,
                        "font-sans",
                        active
                          ? "bg-amber-500 text-slate-950 font-bold"
                          : "bg-background/80 text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <span>{f.name[locale]}</span>
                    </button>
                  );
                })}
              </div>
              <p className="font-sans text-xs leading-relaxed text-muted-foreground">
                {boardResult.factionProfile.rationale[locale]}
              </p>
            </div>

            {/* 6-Slot Board vs Single Slot */}
            {mode === "board6" ? (
              <div className={CALC_MD3.dividedList}>
                {boardResult.slotBreakdowns.map((item) => {
                  const priorityText =
                    item.priorityTier === 1
                      ? locale === "vi"
                        ? "Ưu tiên #1"
                        : "Priority #1"
                      : item.priorityTier === 2
                        ? locale === "vi"
                          ? "Ưu tiên #2"
                          : "Priority #2"
                        : locale === "vi"
                          ? "Nâng sau"
                          : "Secondary";
                  return (
                    <div
                      key={item.slot.slotIndex}
                      className="flex flex-col gap-3 py-3 first:pt-1 last:pb-1 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-sans text-sm font-bold text-foreground">
                            {item.slot.name[locale]}
                          </span>
                          <span
                            className={cn(
                              "rounded-full px-2.5 py-0.5 font-sans text-xs font-bold",
                              item.priorityTier === 1
                                ? "bg-amber-500/15 text-amber-700 dark:text-amber-300"
                                : "bg-muted text-muted-foreground"
                            )}
                          >
                            {priorityText}
                          </span>
                        </div>
                        <p className="font-sans text-xs text-muted-foreground">
                          {item.slot.tacticalRole[locale]}
                        </p>
                        <p className="font-sans text-xs font-medium text-foreground/90">
                          {locale === "vi" ? "Cần thêm: " : "Required: "}
                          <span className="font-mono font-bold tabular-nums text-amber-600 dark:text-amber-400">
                            {formatExactNumber(item.requiredDust)}
                          </span>{" "}
                          <span>
                            {locale === "vi" ? "Bụi & " : "Dust & "}
                          </span>
                          <span className="font-mono font-bold tabular-nums">
                            {formatExactNumber(
                              item.requiredAdditionalLv1Copies
                            )}
                          </span>{" "}
                          <span>
                            {locale === "vi" ? "phôi Lv.1" : "Lv.1 copies"}
                          </span>
                        </p>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-center">
                        <div className="flex items-center gap-1 rounded-xl bg-muted/45 p-1">
                          <CalculatorStepperButton
                            direction="decrease"
                            testId={`slot-${item.slot.slotIndex}-from-minus`}
                            ariaLabel={
                              locale === "vi"
                                ? `Giảm cấp hiện tại Ô ${item.slot.slotIndex}`
                                : `Decrease current level Slot ${item.slot.slotIndex}`
                            }
                            disabled={item.fromLevel <= 1}
                            onClick={() =>
                              updateBoardSlotLevel(
                                item.slot.slotIndex,
                                "fromLevel",
                                (item.fromLevel - 1) as RuneLevel
                              )
                            }
                          />
                          <span className="min-w-[46px] text-center font-mono text-xs font-bold tabular-nums">
                            Lv.{item.fromLevel}
                          </span>
                          <CalculatorStepperButton
                            direction="increase"
                            testId={`slot-${item.slot.slotIndex}-from-plus`}
                            ariaLabel={
                              locale === "vi"
                                ? `Tăng cấp hiện tại Ô ${item.slot.slotIndex}`
                                : `Increase current level Slot ${item.slot.slotIndex}`
                            }
                            disabled={item.fromLevel >= 12}
                            onClick={() =>
                              updateBoardSlotLevel(
                                item.slot.slotIndex,
                                "fromLevel",
                                (item.fromLevel + 1) as RuneLevel
                              )
                            }
                          />
                        </div>

                        <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />

                        <div className="flex items-center gap-1 rounded-xl bg-amber-500/10 p-1">
                          <CalculatorStepperButton
                            direction="decrease"
                            testId={`slot-${item.slot.slotIndex}-to-minus`}
                            ariaLabel={
                              locale === "vi"
                                ? `Giảm cấp mục tiêu Ô ${item.slot.slotIndex}`
                                : `Decrease target level Slot ${item.slot.slotIndex}`
                            }
                            disabled={item.toLevel <= item.fromLevel}
                            onClick={() =>
                              updateBoardSlotLevel(
                                item.slot.slotIndex,
                                "toLevel",
                                (item.toLevel - 1) as RuneLevel
                              )
                            }
                          />
                          <span className="min-w-[46px] text-center font-mono text-xs font-bold tabular-nums text-amber-700 dark:text-amber-300">
                            Lv.{item.toLevel}
                          </span>
                          <CalculatorStepperButton
                            direction="increase"
                            testId={`slot-${item.slot.slotIndex}-to-plus`}
                            ariaLabel={
                              locale === "vi"
                                ? `Tăng cấp mục tiêu Ô ${item.slot.slotIndex}`
                                : `Increase target level Slot ${item.slot.slotIndex}`
                            }
                            disabled={item.toLevel >= 12}
                            onClick={() =>
                              updateBoardSlotLevel(
                                item.slot.slotIndex,
                                "toLevel",
                                (item.toLevel + 1) as RuneLevel
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {RUNE_SLOTS.map((slot) => {
                    const active = selectedSlot === slot.slotIndex;
                    return (
                      <button
                        key={slot.slotIndex}
                        type="button"
                        data-testid={`single-slot-${slot.slotIndex}-btn`}
                        onClick={() => setSelectedSlot(slot.slotIndex)}
                        className={cn(
                          CALC_MD3.chipButton,
                          "flex flex-col items-start justify-center px-3 py-2 text-left bg-muted/40",
                          active && CALC_MD3.tileSelected
                        )}
                      >
                        <span className="font-sans text-xs font-bold">
                          {slot.shortName[locale]}
                        </span>
                        <span className="font-sans text-xs text-muted-foreground">
                          {locale === "vi" ? "Mở % ở " : "Unlocks % at "}
                          <span className="font-mono">
                            Lv.{slot.percentUnlockLevel}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className={cn(CALC_MD3.tonalGroup, "space-y-3")}>
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-xs font-semibold text-muted-foreground">
                      {locale === "vi" ? "Cấp Hiện Tại" : "Current Level"} (
                      <span className="font-mono">Lv.{singleFrom}</span>)
                    </span>
                    <span className="font-sans text-xs font-bold">
                      <span className="font-mono tabular-nums">
                        {formatExactNumber(
                          RUNE_LEVEL_COSTS[singleFrom - 1].lv1CopiesPerRune
                        )}
                      </span>{" "}
                      {locale === "vi" ? "phôi Lv.1" : "Lv.1 copies"}
                    </span>
                  </div>
                  <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar snap-x">
                    {RUNE_LEVELS.map((lv) => (
                      <button
                        key={`from-${lv}`}
                        type="button"
                        onClick={() => {
                          setSingleFrom(lv);
                          if (singleTo < lv) setSingleTo(lv);
                        }}
                        className={cn(
                          CALC_MD3.chipButton,
                          "min-w-[48px] snap-start px-2.5 font-mono bg-background/80",
                          singleFrom === lv && CALC_MD3.tileSelected
                        )}
                      >
                        Lv.{lv}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="font-sans text-xs font-semibold text-muted-foreground">
                      {locale === "vi" ? "Cấp Mục Tiêu" : "Target Level"} (
                      <span className="font-mono">Lv.{singleTo}</span>)
                    </span>
                    <span className="font-sans text-xs font-bold text-amber-600 dark:text-amber-400">
                      <span className="font-mono tabular-nums">
                        {formatExactNumber(
                          RUNE_LEVEL_COSTS[singleTo - 1].lv1CopiesPerRune
                        )}
                      </span>{" "}
                      {locale === "vi" ? "phôi Lv.1" : "Lv.1 copies"}
                    </span>
                  </div>
                  <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar snap-x">
                    {RUNE_LEVELS.map((lv) => (
                      <button
                        key={`to-${lv}`}
                        type="button"
                        disabled={lv < singleFrom}
                        onClick={() => setSingleTo(lv)}
                        className={cn(
                          CALC_MD3.chipButton,
                          "min-w-[48px] snap-start px-2.5 font-mono bg-background/80 disabled:opacity-40",
                          singleTo === lv && CALC_MD3.tileSelected
                        )}
                      >
                        Lv.{lv}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* CARD 2: INVENTORY VAULT & FODDER CONVERTER */}
          <section className={cn(CALC_MD3.surfaceCard, "space-y-4")}>
            <div>
              <p className={cn(CALC_MD3.eyebrow, "text-muted-foreground")}>
                {locale === "vi"
                  ? "Bước 2 — Kho Bụi Cổ Ngữ, Phôi Đá & Rương Tự Chọn"
                  : "Step 2 — Rune Dust, Fodder & Choice Chests"}
              </p>
              <h2 className={CALC_MD3.sectionTitle}>
                {locale === "vi"
                  ? "Kiểm kê Tồn Kho & Quy Đổi Tam Phân 3^(n-1)"
                  : "Inventory Audit & 3^(n-1) Ternary Conversion"}
              </h2>
            </div>

            <div className={CALC_MD3.dividedList}>
              {(
                [
                  {
                    mat: CALCULATOR_MATERIALS.runeDust,
                    val: ownedDustInput,
                    setVal: setOwnedDustInput,
                    sub: {
                      vi: "Nhập tắt 48K, 1.35M • 600 điểm GAR / 2,000 Bụi",
                      en: "Supports 48K, 1.35M • 600 GAR pts / 2,000 Dust",
                    },
                  },
                  {
                    mat: CALCULATOR_MATERIALS.magicStone,
                    val: ownedMagicStonesInput,
                    setVal: setOwnedMagicStonesInput,
                    sub: {
                      vi: "Xả Thứ Ba (GAR Ngày 2): 600 điểm / 2,000 Đá",
                      en: "Tuesday GAR Day 2: 600 pts / 2,000 Stones",
                    },
                  },
                  {
                    mat: CALCULATOR_MATERIALS.arcaneCrystal,
                    val: ownedArcaneCrystalsInput,
                    setVal: setOwnedArcaneCrystalsInput,
                    sub: {
                      vi: "Xả Thứ Ba (GAR Ngày 2): 1,200 điểm / 1 Pha Lê",
                      en: "Tuesday GAR Day 2: 1,200 pts / 1 Crystal",
                    },
                  },
                ] as const
              ).map((row) => {
                const matName =
                  locale === "vi" ? row.mat.nameVi : row.mat.nameEn;
                return (
                  <div
                    key={row.mat.gameId}
                    className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
                  >
                    <div className="flex items-center gap-3">
                      <GameAssetFrame
                        src={row.mat.iconPath}
                        alt={matName}
                        rarity={row.mat.rarity}
                        size="sm"
                      />
                      <div>
                        <p className="font-sans text-sm font-semibold text-foreground">
                          {matName}
                        </p>
                        <p className="font-sans text-xs text-muted-foreground">
                          {row.sub[locale]}
                        </p>
                      </div>
                    </div>
                    <Input
                      type="text"
                      inputMode="text"
                      aria-label={matName}
                      value={row.val}
                      onChange={(e) => row.setVal(e.target.value)}
                      className={cn(CALC_MD3.dataInput, "w-28 sm:w-36")}
                    />
                  </div>
                );
              })}
            </div>

            <div className={cn(CALC_MD3.tonalGroup, "space-y-3")}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-sans text-xs font-bold text-foreground">
                  {locale === "vi"
                    ? "Quy đổi Phôi Đá Lẻ & Rương Tự Chọn:"
                    : "Fodder Runes & Choice Chests Conversion:"}
                </span>
                <span className="font-sans text-xs font-semibold text-amber-600 dark:text-amber-400">
                  {locale === "vi" ? "Tổng quy đổi: " : "Total equivalent: "}
                  <strong className="font-mono tabular-nums">
                    {formatExactNumber(
                      boardResult.fodderConversion.totalLv1Equivalent
                    )}
                  </strong>{" "}
                  {locale === "vi" ? "phôi Lv.1" : "Lv.1 copies"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {(
                  [
                    {
                      key: "lv1Count",
                      label: { vi: "Phôi Lv.1 (×1)", en: "Lv.1 Fodder (×1)" },
                    },
                    {
                      key: "lv2Count",
                      label: { vi: "Phôi Lv.2 (×3)", en: "Lv.2 Fodder (×3)" },
                    },
                    {
                      key: "lv3Count",
                      label: { vi: "Phôi Lv.3 (×9)", en: "Lv.3 Fodder (×9)" },
                    },
                    {
                      key: "lv4Count",
                      label: { vi: "Phôi Lv.4 (×27)", en: "Lv.4 Fodder (×27)" },
                    },
                    {
                      key: "lv5Count",
                      label: { vi: "Phôi Lv.5 (×81)", en: "Lv.5 Fodder (×81)" },
                    },
                    {
                      key: "choiceChestLv1",
                      label: {
                        vi: "Rương Chọn Lv.1 (×1)",
                        en: "Choice Lv.1 (×1)",
                      },
                    },
                    {
                      key: "choiceChestLv3",
                      label: {
                        vi: "Rương Chọn Lv.3 (×9)",
                        en: "Choice Lv.3 (×9)",
                      },
                    },
                    {
                      key: "choiceChestLv5",
                      label: {
                        vi: "Rương Chọn Lv.5 (×81)",
                        en: "Choice Lv.5 (×81)",
                      },
                    },
                  ] as const
                ).map((item) => (
                  <div key={item.key} className="space-y-1">
                    <label
                      htmlFor={`fodder-${item.key}`}
                      className="block font-sans text-xs font-medium text-muted-foreground"
                    >
                      {item.label[locale]}
                    </label>
                    <Input
                      id={`fodder-${item.key}`}
                      type="number"
                      min={0}
                      value={fodder[item.key]}
                      onChange={(e) =>
                        setFodder((prev) => ({
                          ...prev,
                          [item.key]: Math.max(0, Number(e.target.value) || 0),
                        }))
                      }
                      className={CALC_MD3.dataInput}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN (5/12): STICKY AUDIT & RESULTS */}
        <div className="space-y-4 lg:col-span-5 lg:sticky lg:top-20">
          <section className={cn(CALC_MD3.surfaceCard, "space-y-4")}>
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className={cn(CALC_MD3.eyebrow, "text-muted-foreground")}>
                  {locale === "vi"
                    ? "Tổng Hợp Định Lượng SSoT"
                    : "SSoT Quantitative Summary"}
                </p>
                <h2 className={CALC_MD3.sectionTitle}>
                  {locale === "vi"
                    ? "Ngân Sách Bụi Cổ Ngữ & Phôi Ghép"
                    : "Rune Dust & Synthesis Budget"}
                </h2>
              </div>
              <Gem className="h-5 w-5 text-amber-500" aria-hidden="true" />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className={cn(CALC_MD3.tonalGroup, "space-y-1")}>
                <p className="font-sans text-xs font-medium text-muted-foreground">
                  {locale === "vi"
                    ? "Tổng Bụi Cổ Ngữ Cần"
                    : "Total Rune Dust Required"}
                </p>
                <CalculatorMetricValue
                  testId="runes-total-dust"
                  value={formatExactNumber(activeRequiredDust)}
                  unit={locale === "vi" ? "Bụi" : "Dust"}
                  toneClassName="text-amber-600 dark:text-amber-400"
                />
                <p className="font-sans text-xs text-muted-foreground">
                  {locale === "vi" ? "Còn thiếu: " : "Missing: "}
                  <span className="font-mono font-bold tabular-nums text-foreground">
                    {formatExactNumber(activeDeficitDust)}
                  </span>
                </p>
              </div>

              <div className={cn(CALC_MD3.tonalGroup, "space-y-1")}>
                <p className="font-sans text-xs font-medium text-muted-foreground">
                  {locale === "vi"
                    ? "Phôi Lv.1 Cần Bù (3^(n-1))"
                    : "Lv.1 Copies Needed (3^(n-1))"}
                </p>
                <CalculatorMetricValue
                  testId="runes-total-copies"
                  value={formatExactNumber(activeRequiredCopies)}
                  unit="Lv.1"
                />
                <p className="font-sans text-xs text-muted-foreground">
                  {locale === "vi" ? "Sau trừ kho thiếu: " : "Net missing: "}
                  <span className="font-mono font-bold tabular-nums text-foreground">
                    {formatExactNumber(activeDeficitCopies)}
                  </span>
                </p>
              </div>
            </div>

            {activeChoiceWarning ? (
              <div className="flex items-start gap-3 rounded-xl bg-destructive/10 p-3.5 text-destructive">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
                <div className="space-y-1 font-sans text-xs leading-relaxed">
                  <p className="font-bold">
                    {locale === "vi"
                      ? "Cảnh báo Kỷ luật Rương Tự Chọn (Choice Chests)!"
                      : "Rune Choice Chest Discipline Warning!"}
                  </p>
                  <p>
                    {locale === "vi"
                      ? "Tuyệt đối KHÔNG mở Rương Cổ Ngữ Tự Chọn ở Lv.1–Lv.3 để tránh trùng ô với Rương Ngẫu Nhiên. Hãy giữ làm mảnh chốt hạ (Finisher Piece) đóng mốc Lv.5 và Lv.8!"
                      : "NEVER open Rune Choice Chests at Lv.1-Lv.3 to avoid random slot collisions. Save them strictly as Finisher Pieces for Lv.5 and Lv.8!"}
                  </p>
                </div>
              </div>
            ) : (
              <div className={cn(CALC_MD3.tonalGroup, "space-y-1.5")}>
                <div className="flex items-center justify-between font-sans text-xs">
                  <span className="font-semibold text-foreground">
                    {locale === "vi"
                      ? "Rương Tự Chọn dùng làm Mảnh Chốt Hạ:"
                      : "Choice Chests used as Finisher Pieces:"}
                  </span>
                  <span className="font-sans font-bold text-amber-600 dark:text-amber-400">
                    <span className="font-mono tabular-nums">
                      {formatExactNumber(activeFinisherChoiceUsed)}
                    </span>{" "}
                    {locale === "vi" ? "phôi Lv.1" : "Lv.1 eq."}
                  </span>
                </div>
                <p className="font-sans text-xs text-muted-foreground">
                  {locale === "vi"
                    ? "Luôn mở hết Rương Ngẫu Nhiên trước, chỉ bung Rương Tự Chọn để lấp đúng số phôi thiếu cuối cùng lên Lv.5 hoặc Lv.8."
                    : "Always open all Random Rune Chests first; only spend Choice Chests to fill the exact final gap to Lv.5 or Lv.8."}
                </p>
              </div>
            )}

            <div className={CALC_MD3.dividedList}>
              <div className="flex items-center justify-between py-2.5 first:pt-0">
                <span className="font-sans text-xs text-muted-foreground">
                  {locale === "vi"
                    ? "Quy Mô Hành Quân (March Size Ô 3+4+6)"
                    : "Total March Size (Slots 3+4+6)"}
                </span>
                <span className="font-sans text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  <span className="font-mono tabular-nums">
                    +{formatExactNumber(boardResult.targetSummary.totalMarchSize)}
                  </span>{" "}
                  {locale === "vi" ? "Lính" : "Troops"}
                </span>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <span className="font-sans text-xs text-muted-foreground">
                  {locale === "vi"
                    ? "Chỉ số % Tướng (Ô 1 HP / Ô 2 ATK)"
                    : "Hero % Bonus (Slot 1 HP / Slot 2 ATK)"}
                </span>
                <span className="font-mono text-xs font-bold tabular-nums">
                  +{boardResult.targetSummary.heroHpPercent}% HP / +
                  {boardResult.targetSummary.heroAttackPercent}% ATK
                </span>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <span className="font-sans text-xs text-muted-foreground">
                  {locale === "vi"
                    ? "Chỉ số % Toàn Lính (Ô 3 HP / Ô 4 ATK — mở ở Lv.8)"
                    : "All Soldiers % (Slots 3 & 4 — unlocks at Lv.8)"}
                </span>
                <span className="font-mono text-xs font-bold tabular-nums">
                  +{boardResult.targetSummary.soldierHpPercent}% HP / +
                  {boardResult.targetSummary.soldierAttackPercent}% ATK
                </span>
              </div>
              <div className="flex items-center justify-between py-2.5 last:pb-0">
                <span className="font-sans text-xs text-muted-foreground">
                  {locale === "vi"
                    ? "Ô 5 Relic HP % & Ô 6 Phá Giáp"
                    : "Slot 5 Relic HP % & Slot 6 DEF Break"}
                </span>
                <span className="font-sans text-xs font-bold">
                  <span className="font-mono tabular-nums">
                    +{boardResult.targetSummary.relicHpPercent}%
                  </span>{" "}
                  Relic HP •{" "}
                  <span className="font-mono tabular-nums">
                    +{formatExactNumber(boardResult.targetSummary.flatDefenseBreak)}
                  </span>{" "}
                  {locale === "vi" ? "Phá Giáp" : "DEF Break"}
                </span>
              </div>
            </div>

            <div className={cn(CALC_MD3.tonalGroup, "space-y-2")}>
              <div className="flex items-center justify-between">
                <span className="font-sans text-xs font-bold text-foreground">
                  {locale === "vi"
                    ? "Điểm Sự Kiện GAR / KvK — Ngày 2 (Thứ Ba):"
                    : "GAR / KvK Event Points — Day 2 (Tuesday):"}
                </span>
                <Sparkles className="h-4 w-4 text-amber-500" />
              </div>
              <div className="flex items-center justify-between font-sans text-xs">
                <span className="text-muted-foreground">
                  {locale === "vi"
                    ? "Điểm từ lượng Bụi mục tiêu:"
                    : "Points from target Rune Dust:"}
                </span>
                <span className="font-sans font-bold text-amber-600 dark:text-amber-400">
                  <span className="font-mono tabular-nums">
                    +{formatExactNumber(activeGarRequiredPts)}
                  </span>{" "}
                  {locale === "vi" ? "điểm" : "pts"}
                </span>
              </div>
              <div className="flex items-center justify-between font-sans text-xs">
                <span className="text-muted-foreground">
                  {locale === "vi"
                    ? "Tổng điểm Kho hiện có (Bụi + Đá + Pha Lê):"
                    : "Total points in Owned Vault:"}
                </span>
                <span className="font-sans font-bold">
                  <span className="font-mono tabular-nums">
                    +{formatExactNumber(activeGarVaultPts)}
                  </span>{" "}
                  {locale === "vi" ? "điểm" : "pts"}
                </span>
              </div>
            </div>
          </section>

          <section className={cn(CALC_MD3.surfaceCard, "space-y-3")}>
            <p className={cn(CALC_MD3.eyebrow, "text-muted-foreground")}>
              {locale === "vi"
                ? "Bảng Đối Chiếu Gốc SSoT (Lv.1 ➔ Lv.12)"
                : "SSoT Reference Matrix (Lv.1 to Lv.12)"}
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left font-sans text-xs">
                <thead>
                  <tr className="border-b border-border/60 text-muted-foreground">
                    <th className="py-2 pr-2 font-semibold">
                      {locale === "vi" ? "Cấp" : "Lv"}
                    </th>
                    <th className="px-2 py-2 text-right font-semibold">
                      {locale === "vi" ? "Phôi 1 Ô" : "Copies (1x)"}
                    </th>
                    <th className="px-2 py-2 text-right font-semibold">
                      {locale === "vi" ? "Bụi 1 Ô" : "Dust (1x)"}
                    </th>
                    <th className="px-2 py-2 text-right font-semibold">
                      {locale === "vi" ? "Bụi 6 Ô" : "Dust (6x)"}
                    </th>
                    <th className="py-2 pl-2 text-right font-semibold">
                      March
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {RUNE_LEVEL_COSTS.map((row) => (
                    <tr
                      key={row.level}
                      className={cn(
                        row.isBreakpoint && "bg-amber-500/5 font-semibold"
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
                      <td className="px-2 py-2 text-right font-mono tabular-nums text-amber-600 dark:text-amber-400">
                        {formatCompactNumber(row.cumulativeDustSixSlots)}
                      </td>
                      <td className="py-2 pl-2 text-right font-mono tabular-nums">
                        +{row.totalMarchSizeSixSlots}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

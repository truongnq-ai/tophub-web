"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  Wand2,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { GameAssetFrame } from "@/components/guides/media/game-asset-frame";
import { Input } from "@/components/ui/input";
import {
  LORD_GEAR_EXTENDED_MAX_LEVEL,
  LORD_GEAR_PRESET_MILESTONES,
  LORD_GEAR_SACRED_TOME_STEPS,
  LORD_GEAR_SLOTS,
  LORD_GEAR_STANDARD_MAX_LEVEL,
  calculateLordGearSixSlotsPlan,
  clampLordGearLevel,
  type LordGearMaterialBag,
  type LordGearSlotId,
} from "@/content/calculators/lord-gear-data";
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
import {
  CALC_MD3,
  CalculatorMetricValue,
  CalculatorToolHeader,
} from "./calculator-md3-primitives";
import { LordGearSlotCard } from "./lord-gear-slot-card";

export interface LordGearUpgradeCalculatorProps {
  readonly zone?: CalculatorZone;
  readonly category?: CalculatorCategory;
  readonly tool: CalculatorToolItem;
  readonly locale?: CalculatorLocale;
}

type BatchTargetScope =
  | "all"
  | "right_offense"
  | "left_defense"
  | "league"
  | "nature"
  | "horde";

type SlotRangeRecord = Record<
  LordGearSlotId,
  { readonly fromLevel: number; readonly toLevel: number }
>;

export const LORD_GEAR_SHARED_STORAGE_KEY = "tophub_calc_lord_gear_shared_v1";

const DEFAULT_SLOT_RANGES: SlotRangeRecord = {
  nature_shield: { fromLevel: 3, toLevel: 4 },
  league_crown: { fromLevel: 3, toLevel: 4 },
  horde_spear: { fromLevel: 4, toLevel: 6 },
  nature_totem: { fromLevel: 3, toLevel: 4 },
  league_ring: { fromLevel: 4, toLevel: 6 },
  horde_collar: { fromLevel: 6, toLevel: 6 },
};

const MAX_SNAPSHOT_RANGES: SlotRangeRecord = {
  nature_shield: { fromLevel: 3, toLevel: 4 },
  league_crown: { fromLevel: 3, toLevel: 4 },
  horde_spear: { fromLevel: 4, toLevel: 4 },
  nature_totem: { fromLevel: 3, toLevel: 4 },
  league_ring: { fromLevel: 4, toLevel: 4 },
  horde_collar: { fromLevel: 6, toLevel: 6 },
};

const MATERIAL_CARDS = [
  {
    key: "refinedMetal" as const,
    itemId: 154,
    iconPath: "/images/items/materials/icon_material_1.webp",
    name: { vi: "Kim Loại Tinh Luyện", en: "Refined Metal" },
  },
  {
    key: "magicThread" as const,
    itemId: 155,
    iconPath: "/images/items/materials/icon_material_2.webp",
    name: { vi: "Sợi Tơ Ma Thuật", en: "Magic Thread" },
  },
  {
    key: "orichalcum" as const,
    itemId: 156,
    iconPath: "/images/items/materials/icon_material_3.webp",
    name: { vi: "Orichalcum", en: "Orichalcum" },
  },
  {
    key: "dragonBlood" as const,
    itemId: 157,
    iconPath: "/images/items/materials/icon_material_4.webp",
    name: { vi: "Huyết Rồng", en: "Dragon Blood" },
  },
] as const;

export function LordGearUpgradeCalculator({
  tool,
  locale = "vi",
}: LordGearUpgradeCalculatorProps): React.JSX.Element {
  const isVi = locale === "vi";

  const [showExtended, setShowExtended] = useState<boolean>(false);
  const [slotRanges, setSlotRanges] =
    useState<SlotRangeRecord>(DEFAULT_SLOT_RANGES);
  const [tomeRange, setTomeRange] = useState<{
    readonly fromLevel: number;
    readonly toLevel: number;
  }>({ fromLevel: 0, toLevel: 0 });

  const [ownedInputs, setOwnedInputs] = useState<
    Record<keyof LordGearMaterialBag, string>
  >({
    refinedMetal: "68140",
    magicThread: "1114",
    orichalcum: "0",
    dragonBlood: "0",
  });

  const [batchScope, setBatchScope] = useState<BatchTargetScope>("all");
  const [batchFrom, setBatchFrom] = useState<number>(3);
  const [batchTo, setBatchTo] = useState<number>(33);

  const maxAllowedLevel = showExtended
    ? LORD_GEAR_EXTENDED_MAX_LEVEL
    : LORD_GEAR_STANDARD_MAX_LEVEL;

  // Sync current levels to localStorage so 5.2 Resonance Planner can read them
  useEffect(() => {
    try {
      const currentLevels: Record<LordGearSlotId, number> = {
        nature_shield: slotRanges.nature_shield.fromLevel,
        league_crown: slotRanges.league_crown.fromLevel,
        horde_spear: slotRanges.horde_spear.fromLevel,
        nature_totem: slotRanges.nature_totem.fromLevel,
        league_ring: slotRanges.league_ring.fromLevel,
        horde_collar: slotRanges.horde_collar.fromLevel,
      };
      window.localStorage.setItem(
        LORD_GEAR_SHARED_STORAGE_KEY,
        JSON.stringify({ currentLevels, targetLevels: slotRanges }),
      );
    } catch {
      // Ignore storage quota errors
    }
  }, [slotRanges]);

  const inventory = useMemo<LordGearMaterialBag>(
    () => ({
      refinedMetal: parseCompactNumberInput(ownedInputs.refinedMetal),
      magicThread: parseCompactNumberInput(ownedInputs.magicThread),
      orichalcum: parseCompactNumberInput(ownedInputs.orichalcum),
      dragonBlood: parseCompactNumberInput(ownedInputs.dragonBlood),
    }),
    [ownedInputs],
  );

  const plan = useMemo(
    () =>
      calculateLordGearSixSlotsPlan(
        slotRanges,
        inventory,
        showExtended ? tomeRange : undefined,
      ),
    [inventory, showExtended, slotRanges, tomeRange],
  );

  const handleChangeSlotRange = useCallback(
    (slotId: LordGearSlotId, fromLevel: number, toLevel: number): void => {
      const clampedFrom = clampLordGearLevel(fromLevel, showExtended);
      const clampedTo = Math.max(
        clampedFrom,
        clampLordGearLevel(toLevel, showExtended),
      );
      setSlotRanges((prev) => ({
        ...prev,
        [slotId]: { fromLevel: clampedFrom, toLevel: clampedTo },
      }));
    },
    [showExtended],
  );

  const handleApplyBatch = useCallback((): void => {
    const safeFrom = clampLordGearLevel(batchFrom, showExtended);
    const safeTo = Math.max(safeFrom, clampLordGearLevel(batchTo, showExtended));
    setSlotRanges((prev) => {
      const next: SlotRangeRecord = { ...prev };
      for (const slot of LORD_GEAR_SLOTS) {
        const matches =
          batchScope === "all" ||
          (batchScope === "right_offense" && slot.branch === "right_offense") ||
          (batchScope === "left_defense" && slot.branch === "left_defense") ||
          batchScope === slot.faction;
        if (matches) {
          next[slot.id] = { fromLevel: safeFrom, toLevel: safeTo };
        }
      }
      return next;
    });
  }, [batchFrom, batchScope, batchTo, showExtended]);

  const handleLoadMaxSnapshot = useCallback((): void => {
    setSlotRanges(MAX_SNAPSHOT_RANGES);
    setOwnedInputs({
      refinedMetal: "68140",
      magicThread: "1114",
      orichalcum: "0",
      dragonBlood: "0",
    });
  }, []);

  const handleReset = useCallback((): void => {
    setSlotRanges({
      nature_shield: { fromLevel: 1, toLevel: 3 },
      league_crown: { fromLevel: 1, toLevel: 3 },
      horde_spear: { fromLevel: 1, toLevel: 3 },
      nature_totem: { fromLevel: 1, toLevel: 3 },
      league_ring: { fromLevel: 1, toLevel: 3 },
      horde_collar: { fromLevel: 1, toLevel: 3 },
    });
    setTomeRange({ fromLevel: 0, toLevel: 0 });
  }, []);

  const handleToggleExtended = useCallback((): void => {
    setShowExtended((prev) => !prev);
  }, []);

  const handleChangeBatchScope = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>): void => {
      setBatchScope(event.target.value as BatchTargetScope);
    },
    [],
  );

  const handleChangeBatchFrom = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>): void => {
      const val = Number(event.target.value);
      setBatchFrom(val);
      setBatchTo((prev) => Math.max(val, prev));
    },
    [],
  );

  const handleChangeBatchTo = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>): void => {
      const val = Number(event.target.value);
      setBatchTo(val);
    },
    [],
  );

  const handleChangeTomeFrom = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>): void => {
      const val = Number(event.target.value);
      setTomeRange((prev) => ({
        fromLevel: val,
        toLevel: Math.max(val, prev.toLevel),
      }));
    },
    [],
  );

  const handleChangeTomeTo = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>): void => {
      const val = Number(event.target.value);
      setTomeRange((prev) => ({
        fromLevel: Math.min(prev.fromLevel, val),
        toLevel: val,
      }));
    },
    [],
  );

  const availableMilestones = LORD_GEAR_PRESET_MILESTONES.filter(
    (m) => showExtended || !m.isExtended,
  );

  return (
    <div
      data-testid="lord-gear-upgrade-calculator"
      className="space-y-5 w-full"
    >
      <CalculatorToolHeader
        code={tool.code}
        title={tool.title[locale]}
        actions={
          <>
            <button
              type="button"
              data-testid="lord-gear-load-max-btn"
              onClick={handleLoadMaxSnapshot}
              className={cn(
                CALC_MD3.chipButton,
                "bg-amber-500/15 text-amber-700 hover:bg-amber-500/25 dark:text-amber-300",
              )}
            >
              <Sparkles className="h-4 w-4" />
              {isVi ? "Mẫu Max Lv.83" : "Max Lv.83 Preset"}
            </button>
            <button
              type="button"
              data-testid="lord-gear-toggle-extended-btn"
              onClick={handleToggleExtended}
              className={cn(
                CALC_MD3.chipButton,
                showExtended
                  ? "bg-rose-500/20 text-rose-700 ring-1 ring-rose-500/50 dark:text-rose-300"
                  : "bg-muted/60 text-muted-foreground hover:text-foreground",
              )}
            >
              <BookOpen className="h-4 w-4" />
              {showExtended
                ? isVi
                  ? "Đang bật: Đỏ T2–T4 (Lv.166) & Thiên Thư"
                  : "Extended: Mythic T2–T4 & Sacred Tome"
                : isVi
                  ? "Mở rộng Đỏ T2–T4 & Thiên Thư"
                  : "Unlock Mythic T2–T4 & Tome"}
            </button>
            <button
              type="button"
              data-testid="lord-gear-reset-btn"
              onClick={handleReset}
              className={cn(
                CALC_MD3.chipButton,
                "bg-muted/60 text-muted-foreground hover:text-foreground",
              )}
            >
              <RotateCcw className="h-4 w-4" />
              {isVi ? "Đặt lại" : "Reset"}
            </button>
          </>
        }
      />

      {/* Batch Apply Bar */}
      <section className={cn(CALC_MD3.surfaceCard, "space-y-3")}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Wand2 className="h-4 w-4 text-amber-500" />
            <h2 className="text-sm font-heading font-bold text-foreground">
              {isVi
                ? "Thiết Lập Nhanh Hàng Loạt (Theo Nhánh / Theo Phe)"
                : "Batch Milestone Setup (By Branch / Faction)"}
            </h2>
          </div>
          <Link
            href="/calculators/lord-gear/lord-gear-resonance"
            className="text-xs font-bold text-amber-600 hover:underline dark:text-amber-400"
          >
            {isVi
              ? "Mở 5.2 Quy Hoạch Lộ Trình Lệch Pha 3-3 ➔"
              : "Open 5.2 Staggered Resonance Planner ➔"}
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-4">
          <select
            data-testid="batch-scope-select"
            value={batchScope}
            onChange={handleChangeBatchScope}
            className="h-11 rounded-xl border border-border/70 bg-background px-3 text-xs sm:text-sm font-semibold text-foreground"
          >
            <option value="all">
              {isVi ? "Tất cả 6 món Chúa Tể" : "All 6 Lord Gear Slots"}
            </option>
            <option value="right_offense">
              {isVi
                ? "Nhánh Phải — 3 Món Tấn Công (Ưu tiên)"
                : "Right Branch — 3 Offense Slots"}
            </option>
            <option value="left_defense">
              {isVi
                ? "Nhánh Trái — 3 Món Phòng Thủ (HP)"
                : "Left Branch — 3 Defense Slots"}
            </option>
            <option value="league">
              {isVi ? "Phe Liên Minh (Vương Miện + Nhẫn)" : "League Faction (2 pcs)"}
            </option>
            <option value="nature">
              {isVi ? "Phe Thiên Nhiên (Khiên + Vật Tổ)" : "Nature Faction (2 pcs)"}
            </option>
            <option value="horde">
              {isVi ? "Phe Bộ Tộc (Giáo + Vòng Nanh)" : "Horde Faction (2 pcs)"}
            </option>
          </select>

          <select
            data-testid="batch-from-select"
            value={batchFrom}
            onChange={handleChangeBatchFrom}
            className="h-11 rounded-xl border border-border/70 bg-background px-3 text-xs sm:text-sm font-semibold text-foreground"
          >
            {availableMilestones.map((m) => (
              <option key={`batch-from-${m.level}`} value={m.level}>
                {isVi ? `Từ: ${m.label.vi}` : `From: ${m.label.en}`}
              </option>
            ))}
          </select>

          <select
            data-testid="batch-to-select"
            value={batchTo}
            onChange={handleChangeBatchTo}
            className="h-11 rounded-xl border border-amber-500/50 bg-background px-3 text-xs sm:text-sm font-bold text-foreground"
          >
            {availableMilestones.map((m) => (
              <option
                key={`batch-to-${m.level}`}
                value={m.level}
                disabled={m.level < batchFrom}
              >
                {isVi ? `Đến: ${m.label.vi}` : `To: ${m.label.en}`}
              </option>
            ))}
          </select>

          <button
            type="button"
            data-testid="batch-apply-btn"
            onClick={handleApplyBatch}
            className={cn(
              CALC_MD3.chipButton,
              "bg-amber-500 text-slate-950 font-black hover:bg-amber-400",
            )}
          >
            {isVi ? "Áp dụng hàng loạt" : "Apply Batch"}
          </button>
        </div>
      </section>

      {/* 6-Slot Visual Grid */}
      <section className={cn(CALC_MD3.surfaceCard, "space-y-4")}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className={cn(CALC_MD3.eyebrow, "text-amber-500")}>
              {isVi
                ? "6 Ô Trang Bị Lãnh Chúa (3 Trái Thủ • 3 Phải Công)"
                : "6 Lord Equipment Slots (3 Left DEF • 3 Right ATK)"}
            </span>
            <h2 className={CALC_MD3.sectionTitle}>
              {isVi
                ? "Bảng Điều Khiển Từng Ô Trang Bị"
                : "Slot-by-Slot Upgrade Configuration"}
            </h2>
          </div>
          <span className="text-xs text-muted-foreground">
            {isVi
              ? "Mẹo: Nâng lệch pha 3 món Nhánh Phải/Phe Chính trước để mở Cộng Hưởng 3 món sớm."
              : "Tip: Stagger 3 Right-Branch/Main Faction pieces first for early 3-pc Mastery."}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {plan.slotResults.map((slotRes) => (
            <LordGearSlotCard
              key={slotRes.slot.id}
              result={slotRes}
              maxAllowedLevel={maxAllowedLevel}
              showExtended={showExtended}
              locale={locale}
              onChangeRange={handleChangeSlotRange}
            />
          ))}
        </div>

        {/* Optional 7th Slot: Sacred Tome (Thiên Thư) */}
        {showExtended && plan.sacredTomeResult ? (
          <div
            data-testid="lord-gear-sacred-tome-card"
            className={cn(
              CALC_MD3.tonalGroup,
              "mt-3 border border-rose-500/30 bg-rose-500/5 space-y-3",
            )}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <GameAssetFrame
                  src="/images/items/consumables/icon_lord_7.webp"
                  alt={isVi ? "Thiên Thư (Thánh Điển)" : "Sacred Tome"}
                  size="md"
                  shape="item"
                />
                <div>
                  <span className="rounded bg-rose-500/20 px-1.5 py-0.5 text-xs font-bold text-rose-700 dark:text-rose-300">
                    {isVi
                      ? "Ô Thứ 7 • Mở khóa khi 6 món đạt Vàng T2 (Y2 - Lv.33)"
                      : "7th Slot • Unlocks when all 6 slots reach Yellow T2 (Lv.33)"}
                  </span>
                  <h3 className="mt-1 text-base font-heading font-bold text-foreground">
                    {isVi ? "Thiên Thư (Sacred Tome • Lv.1–64)" : "Sacred Tome (Lv.1–64)"}
                  </h3>
                </div>
              </div>
              <div className="text-right font-mono text-xs">
                <span className="text-muted-foreground">
                  {isVi ? "Phá Giáp:" : "Armor Break:"}{" "}
                </span>
                <strong className="text-emerald-600 dark:text-emerald-400">
                  {plan.sacredTomeResult.fromStep.armorBreakPct.toFixed(2)}% ➔{" "}
                  {plan.sacredTomeResult.toStep.armorBreakPct.toFixed(2)}%
                </strong>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <select
                data-testid="sacred-tome-from-select"
                value={tomeRange.fromLevel}
                onChange={handleChangeTomeFrom}
                className="h-11 rounded-xl border border-border/70 bg-background px-3 text-xs sm:text-sm font-semibold"
              >
                {LORD_GEAR_SACRED_TOME_STEPS.map((s) => (
                  <option key={`tome-from-${s.level}`} value={s.level}>
                    {s.label[locale]}
                  </option>
                ))}
              </select>
              <select
                data-testid="sacred-tome-to-select"
                value={tomeRange.toLevel}
                onChange={handleChangeTomeTo}
                className="h-11 rounded-xl border border-rose-500/50 bg-background px-3 text-xs sm:text-sm font-bold"
              >
                {LORD_GEAR_SACRED_TOME_STEPS.map((s) => (
                  <option
                    key={`tome-to-${s.level}`}
                    value={s.level}
                    disabled={s.level < tomeRange.fromLevel}
                  >
                    {s.label[locale]}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ) : null}
      </section>

      {/* Inventory & Total Material Breakdown */}
      <section className={cn(CALC_MD3.surfaceCard, "space-y-4")}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className={cn(CALC_MD3.eyebrow, "text-amber-500")}>
              {isVi
                ? "Tiêu Hao Cường Hóa & Kiểm Toán Kho"
                : "Total Material Cost & Inventory Audit"}
            </span>
            <h2 className={CALC_MD3.sectionTitle}>
              {isVi
                ? "4 Nguyên Liệu Đồ Chúa Tể & Chênh Lệch Lực Chiến"
                : "4 Lord Gear Materials & Power Delta"}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {plan.isSufficient ? (
              <span
                data-testid="lord-gear-sufficiency-badge"
                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500/15 px-3 py-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300"
              >
                <CheckCircle2 className="h-4 w-4" />
                {isVi ? "Đủ nguyên liệu nâng cấp!" : "Sufficient materials!"}
              </span>
            ) : (
              <span
                data-testid="lord-gear-sufficiency-badge"
                className="inline-flex items-center gap-1.5 rounded-xl bg-rose-500/15 px-3 py-1.5 text-xs font-bold text-rose-700 dark:text-rose-300"
              >
                <AlertTriangle className="h-4 w-4" />
                {isVi ? "Đang thiếu nguyên liệu" : "Material deficit detected"}
              </span>
            )}
          </div>
        </div>

        {/* Power & Mastery KPI Summary Row */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className={cn(CALC_MD3.tonalGroup, "space-y-1")}>
            <span className="text-xs font-semibold text-muted-foreground">
              {isVi
                ? "Tổng Lực Chiến Đồ Chúa Tể (Gồm Cộng Hưởng)"
                : "Total Lord Gear Power (Incl. Mastery)"}
            </span>
            <CalculatorMetricValue
              testId="lord-gear-total-power-delta"
              value={`+${formatCompactNumber(plan.totalFightForceDelta)}`}
              unit={isVi ? "Lực chiến" : "Power"}
              toneClassName="text-amber-500"
            />
            <p className="font-mono text-xs text-muted-foreground">
              {formatExactNumber(plan.totalFightForceBefore)}{" "}
              <ArrowRight className="inline h-3 w-3" />{" "}
              <strong className="text-foreground">
                {formatExactNumber(plan.totalFightForceAfter)}
              </strong>
            </p>
          </div>

          <div className={cn(CALC_MD3.tonalGroup, "space-y-1")}>
            <span className="text-xs font-semibold text-muted-foreground">
              {isVi ? "Cộng Hưởng 3 Món (HP Tướng)" : "3-Piece Mastery (Hero HP)"}
            </span>
            <p className="text-sm font-heading font-bold text-foreground">
              {plan.beforeMastery.active3Piece?.label[locale] ??
                (isVi ? "Chưa bật" : "None")}{" "}
              <ArrowRight className="inline h-3.5 w-3.5 text-amber-500" />{" "}
              <span className="text-amber-600 dark:text-amber-400">
                {plan.afterMastery.active3Piece?.label[locale] ??
                  (isVi ? "Chưa bật" : "None")}
              </span>
            </p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400">
              <span>{isVi ? "HP Tướng:" : "Hero HP:"}</span>{" "}
              <span className="font-mono">
                +{(plan.beforeMastery.active3Piece?.threePieceHeroHpPct ?? 0).toFixed(2)}% ➔ +{(plan.afterMastery.active3Piece?.threePieceHeroHpPct ?? 0).toFixed(2)}%
              </span>
            </p>
          </div>

          <div className={cn(CALC_MD3.tonalGroup, "space-y-1")}>
            <span className="text-xs font-semibold text-muted-foreground">
              {isVi ? "Cộng Hưởng 6 Món (ATK Tướng)" : "6-Piece Mastery (Hero ATK)"}
            </span>
            <p className="text-sm font-heading font-bold text-foreground">
              {plan.beforeMastery.active6Piece?.label[locale] ??
                (isVi ? "Chưa bật" : "None")}{" "}
              <ArrowRight className="inline h-3.5 w-3.5 text-amber-500" />{" "}
              <span className="text-amber-600 dark:text-amber-400">
                {plan.afterMastery.active6Piece?.label[locale] ??
                  (isVi ? "Chưa bật" : "None")}
              </span>
            </p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400">
              <span>{isVi ? "ATK Tướng:" : "Hero ATK:"}</span>{" "}
              <span className="font-mono">
                +{(plan.beforeMastery.active6Piece?.sixPieceHeroAtkPct ?? 0).toFixed(2)}% ➔ +{(plan.afterMastery.active6Piece?.sixPieceHeroAtkPct ?? 0).toFixed(2)}%
              </span>
            </p>
          </div>
        </div>

        {/* 4 Materials Grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {MATERIAL_CARDS.map((mat) => {
            const requiredVal = plan.totalCost[mat.key];
            const deficitVal = plan.deficit[mat.key];
            const remainingVal = plan.remainingInventory[mat.key];

            return (
              <div
                key={mat.key}
                data-testid={`material-card-${mat.key}`}
                className={cn(CALC_MD3.tonalGroup, "space-y-2.5")}
              >
                <div className="flex items-center gap-2.5">
                  <GameAssetFrame
                    src={mat.iconPath}
                    alt={mat.name[locale]}
                    size="sm"
                    shape="item"
                  />
                  <div className="min-w-0">
                    <span className="block truncate text-xs font-bold text-foreground">
                      {mat.name[locale]}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      ID #{mat.itemId}
                    </span>
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      {isVi ? "Tổng cần:" : "Required:"}
                    </span>
                    <span
                      data-testid={`total-cost-${mat.key}`}
                      className="font-mono text-sm font-black text-foreground"
                    >
                      {formatExactNumber(requiredVal)}
                    </span>
                  </div>

                  <div className="space-y-1 pt-1">
                    <label
                      htmlFor={`owned-input-${mat.key}`}
                      className="block text-xs font-semibold text-muted-foreground"
                    >
                      {isVi ? "Trong kho hiện có:" : "Owned in bag:"}
                    </label>
                    <Input
                      id={`owned-input-${mat.key}`}
                      data-testid={`owned-input-${mat.key}`}
                      type="text"
                      inputMode="numeric"
                      value={ownedInputs[mat.key]}
                      onChange={(e) =>
                        setOwnedInputs((prev) => ({
                          ...prev,
                          [mat.key]: e.target.value,
                        }))
                      }
                      className={CALC_MD3.dataInput}
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-muted-foreground">
                      {deficitVal > 0
                        ? isVi
                          ? "Còn thiếu:"
                          : "Deficit:"
                        : isVi
                          ? "Còn dư:"
                          : "Remaining:"}
                    </span>
                    <span
                      data-testid={`deficit-${mat.key}`}
                      className={cn(
                        "font-mono font-bold",
                        deficitVal > 0
                          ? "text-rose-600 dark:text-rose-400"
                          : "text-emerald-600 dark:text-emerald-400",
                      )}
                    >
                      {deficitVal > 0
                        ? `-${formatExactNumber(deficitVal)}`
                        : `+${formatExactNumber(remainingVal)}`}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tactical Double-Dip Advisory */}
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs space-y-1">
          <p className="font-bold text-amber-700 dark:text-amber-300">
            ⚡{" "}
            {isVi
              ? "Chiến thuật Nhịn Nâng Cấp — Ăn Kép Điểm Đua Vũ Trang (GAR) & KvK:"
              : "Tactical Event Double-Dip (Guild Arms Race & KvK):"}
          </p>
          <p className="text-muted-foreground">
            {isVi
              ? "Chỉ bấm nút Cường Hóa Đồ Chúa Tể vào Ngày 3 hoặc Ngày 4 của sự kiện Đua Vũ Trang (GAR) / KvK khi nhiệm vụ yêu cầu tiêu thụ Sợi Tơ Ma Thuật, Orichalcum hoặc Huyết Rồng. Tuyệt đối KHÔNG xả vào Thứ Bảy (Ngày 6 War Day — chỉ tính điểm tiêu tăng tốc & diệt quân)."
              : "Only upgrade Lord Gear on Day 3 or Day 4 of Guild Arms Race (GAR) / KvK when tasks score Magic Thread, Orichalcum, and Dragon Blood. Never spend Lord Gear materials on Saturday (Day 6 War Day)."}
          </p>
        </div>
      </section>
    </div>
  );
}

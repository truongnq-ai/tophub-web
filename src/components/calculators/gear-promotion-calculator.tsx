"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Sparkles,
  Swords,
} from "lucide-react";
import {
  GEAR_PROMOTION_MASTER_RESONANCE_TIERS,
  GEAR_PROMOTION_SETS,
  GEAR_PROMOTION_SLOTS,
  GEAR_PROMOTION_STAR_SUMMARY_TABLE,
  MAX_GEAR_PROMOTION_STEP,
  MYTHIC_MASTER_ATTRIBUTE_TIERS,
  calculateGearPromotionPlan,
  clampGearPromotionStepIndex,
  type GearPromotionMaterialKey,
  type GearPromotionSetId,
  type GearPromotionSlotId,
} from "@/content/calculators/gear-promotion-data";
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
import { CALC_MD3, CalculatorToolHeader } from "./calculator-md3-primitives";
import { GearPromotionStepSelector } from "./gear-promotion-step-selector";

export interface GearPromotionCalculatorProps {
  readonly zone?: CalculatorZone;
  readonly category?: CalculatorCategory;
  readonly tool: CalculatorToolItem;
  readonly locale?: CalculatorLocale;
}

type PickerStep = "set" | "slot";

const INITIAL_OWNED_INPUTS: Readonly<Record<GearPromotionMaterialKey, string>> =
  {
    solarGold: "0",
    enhanceRune: "0",
    legendaryStone: "0",
    mythicStone: "0",
    ruby: "0",
  };

export function GearPromotionCalculator({
  tool,
  locale = "vi",
}: GearPromotionCalculatorProps): React.JSX.Element {
  const isVi = locale === "vi";

  const [setId, setSetId] = useState<GearPromotionSetId>("knights_glory");
  const [slotId, setSlotId] = useState<GearPromotionSlotId>("boots");
  const [fromStepIndex, setFromStepIndex] = useState<number>(0);
  const [toStepIndex, setToStepIndex] = useState<number>(
    MAX_GEAR_PROMOTION_STEP
  );
  const [ownedInputs, setOwnedInputs] =
    useState<Record<GearPromotionMaterialKey, string>>(INITIAL_OWNED_INPUTS);

  const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false);
  const [pickerStep, setPickerStep] = useState<PickerStep>("set");
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isPickerOpen) return;

    const handleMouseDown = (event: MouseEvent): void => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setIsPickerOpen(false);
        setPickerStep("set");
      }
    };

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        setIsPickerOpen(false);
        setPickerStep("set");
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPickerOpen]);

  const parsedOwned = useMemo(
    () => ({
      solarGold: parseCompactNumberInput(ownedInputs.solarGold),
      enhanceRune: parseCompactNumberInput(ownedInputs.enhanceRune),
      legendaryStone: parseCompactNumberInput(ownedInputs.legendaryStone),
      mythicStone: parseCompactNumberInput(ownedInputs.mythicStone),
      ruby: parseCompactNumberInput(ownedInputs.ruby),
    }),
    [ownedInputs]
  );

  const result = useMemo(
    () =>
      calculateGearPromotionPlan({
        setId,
        slotId,
        fromStepIndex,
        toStepIndex,
        owned: parsedOwned,
      }),
    [setId, slotId, fromStepIndex, toStepIndex, parsedOwned]
  );

  const handleTogglePicker = (): void => {
    setIsPickerOpen((prev) => {
      const next = !prev;
      if (next) {
        setPickerStep("set");
      }
      return next;
    });
  };

  const handleSelectSet = (nextSetId: GearPromotionSetId): void => {
    setSetId(nextSetId);
    setPickerStep("slot");
  };

  const handleSelectSlot = (nextSlotId: GearPromotionSlotId): void => {
    setSlotId(nextSlotId);
    setIsPickerOpen(false);
    setPickerStep("set");
  };

  const handleOwnedChange = (
    key: GearPromotionMaterialKey,
    rawValue: string
  ): void => {
    setOwnedInputs((prev) => ({
      ...prev,
      [key]: rawValue,
    }));
  };

  const handleFixInvalidRange = (): void => {
    const nextTarget = clampGearPromotionStepIndex(
      Math.min(MAX_GEAR_PROMOTION_STEP, fromStepIndex + 5)
    );
    setToStepIndex(nextTarget);
  };

  const handleReset = (): void => {
    setSetId("knights_glory");
    setSlotId("boots");
    setFromStepIndex(0);
    setToStepIndex(MAX_GEAR_PROMOTION_STEP);
    setOwnedInputs(INITIAL_OWNED_INPUTS);
    setIsPickerOpen(false);
    setPickerStep("set");
  };

  const isTargetMythic = result.toStats.isMythicAscended;
  const activeAvatarIcon = isTargetMythic
    ? result.pieceMeta.mythicIconPath
    : result.pieceMeta.legendaryIconPath;
  const atkDelta = Math.max(
    0,
    result.toStats.totalAtk - result.fromStats.totalAtk
  );
  const hpDelta = Math.max(
    0,
    result.toStats.totalHp - result.fromStats.totalHp
  );

  return (
    <div data-testid="gear-promotion-calculator" className="space-y-4">
      {/* Tool Header with (i) Info Popover & Reset */}
      <CalculatorToolHeader
        code={tool.code}
        title={tool.title[locale].replace(`${tool.code} `, "")}
        actions={
          <>
            <CalculatorInfoPopover
              locale={locale}
              triggerTestId="gear-promotion-info-trigger"
              dialogTestId="gear-promotion-info-dialog"
              title={
                isVi
                  ? "Thông Tin Đột Phá Trang Bị & Bảng Tra Cứu Chuẩn Meta.bytes"
                  : "Gear Promotion Guide & Meta.bytes Reference Tables"
              }
              subtitle={
                isVi
                  ? "Cơ chế 25 cánh sao (4 Sao Vàng + 1 Sao Đỏ), hoàn trả tài nguyên, Bộ 4 Món Hoàng Kim & Cộng hưởng Bậc Thầy"
                  : "25-petal mechanics (4 Gold Stars + 1 Red Star), dismantle refund rules, Golden Sets & Master Resonance"
              }
            >
              <div className="space-y-5">
                {/* 1. Core Mechanics & Dismantle Refund Rules */}
                <div className="rounded-2xl bg-amber-500/10 p-4 ring-1 ring-amber-500/30">
                  <h4 className="font-sans text-sm font-bold text-foreground">
                    {isVi
                      ? "1. Cơ Chế 5 Ngôi Sao × 5 Cánh & Quy Tắc Hoàn Trả Khi Tách Đồ"
                      : "1. 5-Star × 5-Petal Mechanics & Dismantle Refund Rules"}
                  </h4>
                  <ul className="mt-2 space-y-1.5 font-sans text-xs leading-relaxed text-muted-foreground">
                    <li>
                      •{" "}
                      {isVi
                        ? "Điều kiện mở Đột Phá: Trang bị Huyền Thoại (Cam) đạt cấp cường hóa Lv.40."
                        : "Unlock Prerequisite: Legendary (Orange) gear piece at Enhancement Lv.40."}
                    </li>
                    <li>
                      •{" "}
                      {isVi
                        ? "Lộ trình 25 cánh sao: Gồm 4 Ngôi Sao Vàng (1★–4★, cánh 1..20) và 1 Ngôi Sao Đỏ Thần Thoại (5★, cánh 21..25). Mỗi ngôi sao có 5 cánh: 4 cánh đầu tiêu tốn Vàng Thái Dương + Rune Cường Hóa + Ruby; cánh thứ 5 (Đột phá sao) tiêu tốn Vàng Thái Dương + Rune Cường Hóa + Đá Đột Phá Cam (ở 1★–4★) hoặc Đá Đột Phá Đỏ (ở 5★)."
                        : "25-Petal Progression: Consists of 4 Gold Stars (1★–4★, petals 1..20) and 1 Mythic Red Star (5★, petals 21..25). Petals 1–4 use Solar Gold + Enhance Runes + Rubies; Petal 5 uses Solar Gold + Enhance Runes + Legendary Stones (1★–4★) or Mythic Stones (5★)."}
                    </li>
                    <li>
                      •{" "}
                      <strong className="text-emerald-600 dark:text-emerald-400">
                        {isVi ? "Quy tắc hoàn trả:" : "Refund Rule:"}
                      </strong>{" "}
                      {isVi
                        ? "Khi tách hoặc kế thừa trang bị, hệ thống hoàn trả 100% Vàng Thái Dương, Rune Cường Hóa, Đá Đột Phá Cam và Đá Đột Phá Đỏ (`break_cost`), nhưng KHÔNG hoàn trả Ruby (`break_cost_no_back`)."
                        : "Dismantling refunds 100% of Solar Gold, Enhance Runes, Legendary Stones, and Mythic Stones (`break_cost`), while Rubies (`break_cost_no_back`) are non-refundable."}
                    </li>
                  </ul>
                </div>

                {/* 2. 5-Star Cost Breakdown Table */}
                <div className="space-y-2">
                  <h4 className="font-sans text-sm font-bold text-foreground">
                    {isVi
                      ? "2. Bảng Chi Phí Đột Phá Từng Ngôi Sao (1 Món Trang Bị)"
                      : "2. Promotion Cost Breakdown by Star (1 Gear Piece)"}
                  </h4>
                  <div className="overflow-x-auto rounded-2xl bg-slate-50/90 p-2 ring-1 ring-slate-200/80 dark:bg-slate-800/60 dark:ring-slate-700/70">
                    <table className="w-full text-left font-sans text-xs">
                      <thead>
                        <tr className="border-b border-border/60 text-muted-foreground">
                          <th className="px-2.5 py-2 font-semibold">
                            {isVi ? "Mốc Sao" : "Star Tier"}
                          </th>
                          <th className="px-2.5 py-2 font-semibold">
                            {isVi ? "Vàng TD" : "Solar Gold"}
                          </th>
                          <th className="px-2.5 py-2 font-semibold">Rune</th>
                          <th className="px-2.5 py-2 font-semibold">Ruby</th>
                          <th className="px-2.5 py-2 font-semibold">
                            {isVi ? "Đá Cam / Đỏ" : "Leg / Mythic Stone"}
                          </th>
                          <th className="px-2.5 py-2 font-semibold">
                            {isVi ? "Tích lũy (0★➔Đích)" : "Cumulative"}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/40">
                        {GEAR_PROMOTION_STAR_SUMMARY_TABLE.map((row) => {
                          const isRed = row.starColor === "red";
                          return (
                            <tr
                              key={row.star}
                              className={cn(
                                isRed
                                  ? "bg-rose-500/10 font-semibold text-foreground"
                                  : "text-foreground"
                              )}
                            >
                              <td className="px-2.5 py-2 font-sans font-bold">
                                {row.label[locale]}
                              </td>
                              <td className="px-2.5 py-2 font-mono tabular-nums">
                                {formatExactNumber(row.starTotalSolarGold)}
                              </td>
                              <td className="px-2.5 py-2 font-mono tabular-nums">
                                {formatCompactNumber(row.starTotalEnhanceRune)}
                              </td>
                              <td className="px-2.5 py-2 font-mono tabular-nums">
                                {formatCompactNumber(row.starTotalRuby)}
                              </td>
                              <td className="px-2.5 py-2 font-mono tabular-nums">
                                {isRed
                                  ? `${row.starTotalMythicStone} (Mythic)`
                                  : `${row.starTotalLegendaryStone} (Leg)`}
                              </td>
                              <td className="px-2.5 py-2 font-mono text-amber-600 tabular-nums dark:text-amber-400">
                                {formatCompactNumber(row.cumulativeSolarGold)} SG
                                • {formatCompactNumber(row.cumulativeEnhanceRune)}{" "}
                                Rune • {formatCompactNumber(row.cumulativeRuby)}{" "}
                                Ruby
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 3. 4-Piece Star Promotion Master Resonance (equipment_master type=4) */}
                <div className="space-y-2">
                  <h4 className="font-sans text-sm font-bold text-foreground">
                    {isVi
                      ? "3. Cộng Hưởng Bậc Thầy Đột Phá (Khi Cả 4 Món Cùng Đạt Sao)"
                      : "3. 4-Piece Star Promotion Master Resonance"}
                  </h4>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {GEAR_PROMOTION_MASTER_RESONANCE_TIERS.map((tier) => (
                      <div
                        key={tier.id}
                        className={cn(
                          "rounded-xl px-3 py-2 font-sans text-xs",
                          tier.star === 5
                            ? "bg-rose-500/10 text-rose-700 ring-1 ring-rose-500/30 dark:text-rose-300"
                            : "bg-slate-100/80 text-foreground dark:bg-slate-800/70"
                        )}
                      >
                        {tier.summary[locale]}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. 4 Equipment Sets Evolution Summary */}
                <div className="space-y-2">
                  <h4 className="font-sans text-sm font-bold text-foreground">
                    {isVi
                      ? "4. Hiệu Ứng Tiến Hóa 4 Bộ Trang Bị (Gốc ➔ Lv.40 ➔ 5★ Đỏ)"
                      : "4. 4 Equipment Sets Evolution (Base ➔ Lv.40 ➔ 5★ Mythic Red)"}
                  </h4>
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {GEAR_PROMOTION_SETS.map((s) => (
                      <div
                        key={s.id}
                        className="space-y-1 rounded-xl bg-slate-100/80 p-3 dark:bg-slate-800/70"
                      >
                        <p className="font-sans text-xs font-bold text-foreground">
                          {s.setName[locale]}
                        </p>
                        <p className="font-sans text-xs text-muted-foreground">
                          • {s.suitBonusBase[locale]}
                        </p>
                        <p className="font-sans text-xs text-muted-foreground">
                          • {s.suitBonusLv40[locale]}
                        </p>
                        <p className="font-sans text-xs font-semibold text-rose-600 dark:text-rose-400">
                          • {s.suitBonusMythic5Star[locale]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. 18-Tier Mythic Master Attributes Table */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-sans text-sm font-bold text-foreground">
                      {isVi
                        ? "5. Bảng 18 Mốc Thuộc Tính Đặc Biệt Đồ Đỏ (500 ➔ 2,200 Điểm)"
                        : "5. 18-Tier Mythic Red Special Attributes Table (500 to 2,200 Pts)"}
                    </h4>
                    <Swords className="h-4 w-4 text-rose-500" />
                  </div>
                  <div className="max-h-64 overflow-y-auto rounded-2xl bg-slate-50/90 p-2 ring-1 ring-slate-200/80 dark:bg-slate-800/60 dark:ring-slate-700/70">
                    <table className="w-full text-left font-sans text-xs">
                      <thead>
                        <tr className="border-b border-border/60 text-muted-foreground">
                          <th className="px-2 py-1.5 font-semibold">
                            {isVi ? "Mốc" : "Tier"}
                          </th>
                          <th className="px-2 py-1.5 font-semibold">
                            {isVi ? "Thuộc tính chính" : "Master Attr"}
                          </th>
                          <th className="px-2 py-1.5 font-semibold">
                            {isVi ? "Phá Giáp" : "Defense Break"}
                          </th>
                          <th className="px-2 py-1.5 font-semibold">
                            {isVi ? "Giảm CD Đầu" : "Init Ult CD"}
                          </th>
                          <th className="px-2 py-1.5 font-semibold">
                            ATK / HP
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/40">
                        {MYTHIC_MASTER_ATTRIBUTE_TIERS.map((row) => (
                          <tr key={row.tierIndex} className="text-foreground">
                            <td className="px-2 py-1.5 font-mono tabular-nums">
                              #{row.tierIndex} ({row.pointsRequired})
                            </td>
                            <td className="px-2 py-1.5 font-mono text-amber-600 tabular-nums dark:text-amber-400">
                              {row.masterAttributesPercent}
                            </td>
                            <td className="px-2 py-1.5 font-mono font-bold text-rose-600 tabular-nums dark:text-rose-400">
                              {formatExactNumber(row.defenseBreak)}
                            </td>
                            <td className="px-2 py-1.5 font-mono tabular-nums">
                              {row.initialUltCdReduced}
                            </td>
                            <td className="px-2 py-1.5 font-mono tabular-nums">
                              {row.heroAttackPercent} / {row.heroHpPercent}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CalculatorInfoPopover>

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
              <span>{isVi ? "Đặt lại" : "Reset"}</span>
            </button>
          </>
        }
      />

      {/* TOP 3 SECTIONS: [1] Đột Phá Hiện Tại | [2] Avatar Trang Bị | [3] Đột Phá Mục Tiêu */}
      <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-12">
        {/* SECTION 1 (Left - 5 cols): Đột Phá Hiện Tại */}
        <div className="lg:col-span-5">
          <GearPromotionStepSelector
            label={isVi ? "Đột Phá Hiện Tại" : "Current Promotion"}
            stepIndex={fromStepIndex}
            onChange={setFromStepIndex}
            setId={setId}
            slotId={slotId}
            locale={locale}
            variant="from"
            testIdPrefix="gear-promotion-from"
          />
        </div>

        {/* SECTION 2 (Center - 2 cols): Avatar Trang Bị + 2-Step Sequential Popover */}
        <div
          ref={pickerRef}
          className={cn(
            CALC_MD3.surfaceCard,
            "relative flex flex-col items-center justify-between gap-3 text-center lg:col-span-2"
          )}
        >
          <span className="font-sans text-xs font-bold text-muted-foreground">
            {isVi ? "Trang Bị Đang Chọn" : "Selected Gear"}
          </span>

          {/* Clickable Central Gear Avatar */}
          <button
            type="button"
            data-testid="gear-promotion-central-picker-btn"
            data-gear-rarity={isTargetMythic ? "mythic" : "legendary"}
            onClick={handleTogglePicker}
            aria-expanded={isPickerOpen}
            aria-haspopup="dialog"
            className="group relative flex min-h-[104px] w-full flex-col items-center justify-center rounded-2xl p-2 transition-transform hover:scale-[1.02] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40"
          >
            <div
              className={cn(
                "relative flex h-24 w-24 items-center justify-center rounded-2xl p-2 shadow-md transition-all",
                isTargetMythic
                  ? "bg-gradient-to-br from-rose-500/25 via-red-600/20 to-amber-500/25 ring-2 ring-rose-500"
                  : "bg-gradient-to-br from-amber-500/25 via-orange-500/15 to-yellow-500/20 ring-2 ring-amber-500"
              )}
            >
              <Image
                src={activeAvatarIcon}
                alt={result.pieceMeta.itemName[locale]}
                width={76}
                height={76}
                className="h-18 w-18 object-contain drop-shadow"
              />

              <span
                className={cn(
                  "absolute -top-2 -right-2 inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 font-mono text-xs font-black text-white shadow tabular-nums",
                  isTargetMythic ? "bg-rose-600" : "bg-amber-600"
                )}
              >
                {result.toNode.star}★
              </span>
            </div>

            <p className="mt-2 font-sans text-sm font-bold text-foreground group-hover:text-amber-600 dark:group-hover:text-amber-400">
              {result.pieceMeta.itemName[locale]}
            </p>
            <p className="font-sans text-xs text-muted-foreground">
              {result.setMeta.shortName[locale]} •{" "}
              {result.slotMeta.label[locale]}
            </p>
            <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2.5 py-0.5 font-sans text-xs font-semibold text-amber-700 dark:text-amber-300">
              <span>{isVi ? "Bấm đổi trang bị" : "Click to change"}</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </span>
          </button>

          {/* Step Delta & ATK/HP Gain Summary */}
          <div className="w-full space-y-1.5 rounded-2xl bg-slate-50/90 p-2.5 ring-1 ring-slate-200/70 dark:bg-slate-800/60 dark:ring-slate-700/60">
            <div className="flex items-center justify-center gap-1.5 font-mono text-xs font-bold tabular-nums">
              <span className="text-muted-foreground">
                {result.fromStepIndex}/25
              </span>
              <ArrowRight className="h-3.5 w-3.5 text-amber-500" />
              <span
                className={cn(
                  isTargetMythic
                    ? "text-rose-600 dark:text-rose-400"
                    : "text-amber-600 dark:text-amber-400"
                )}
              >
                {result.toStepIndex}/25
              </span>
            </div>
            <p className="font-sans text-xs text-muted-foreground">
              {isVi ? "Tăng thêm:" : "Gain:"}{" "}
              <span className="font-mono font-bold text-emerald-600 tabular-nums dark:text-emerald-400">
                +{result.stepDelta}
              </span>{" "}
              {isVi ? "cánh sao" : "petals"}
            </p>
            <p className="font-mono text-xs font-semibold text-foreground tabular-nums">
              ATK +{formatCompactNumber(atkDelta)} • HP +
              {formatCompactNumber(hpDelta)}
            </p>
          </div>

          {/* 2-Step Sequential Picker Popover (Step 1: Set -> Step 2: Slot) */}
          {isPickerOpen ? (
            <div
              data-testid="gear-promotion-picker-popover"
              role="dialog"
              aria-label={
                isVi
                  ? "Chọn Bộ Trang Bị và Loại Trang Bị"
                  : "Select Gear Set and Slot"
              }
              className="absolute top-full left-1/2 z-40 mt-2 w-80 -translate-x-1/2 rounded-2xl bg-white p-3.5 text-left shadow-xl ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700"
            >
              {pickerStep === "set" ? (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <p className="font-sans text-xs font-bold text-foreground">
                      {isVi
                        ? "Bước 1/2: Chọn Bộ Trang Bị (4 Bộ)"
                        : "Step 1/2: Select Equipment Set (4 Sets)"}
                    </p>
                    <span className="font-mono text-xs text-muted-foreground">
                      1/2
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {GEAR_PROMOTION_SETS.map((s) => {
                      const isSelectedSet = s.id === setId;
                      return (
                        <button
                          key={s.id}
                          type="button"
                          data-testid={`picker-set-${s.id}`}
                          onClick={() => handleSelectSet(s.id)}
                          className={cn(
                            "flex min-h-[48px] w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left transition-colors cursor-pointer",
                            isSelectedSet
                              ? "bg-amber-500/15 ring-1 ring-amber-500/50"
                              : "bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-800"
                          )}
                        >
                          <Image
                            src={
                              isTargetMythic
                                ? s.sampleMythicIconPath
                                : s.sampleLegendaryIconPath
                            }
                            alt={s.setName[locale]}
                            width={36}
                            height={36}
                            className="h-9 w-9 shrink-0 rounded-lg object-contain"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="truncate font-sans text-xs font-bold text-foreground">
                              {s.setName[locale]}
                            </p>
                            <p className="truncate font-sans text-xs text-muted-foreground">
                              {s.roleBadge[locale]}
                            </p>
                          </div>
                          <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <button
                      type="button"
                      data-testid="picker-back-to-set"
                      onClick={() => setPickerStep("set")}
                      className="inline-flex min-h-[44px] items-center gap-1 rounded-xl px-2 font-sans text-xs font-semibold text-amber-600 hover:bg-amber-500/10 dark:text-amber-400 cursor-pointer"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span>
                        {isVi ? "Đổi Bộ Trang Bị" : "Change Gear Set"}
                      </span>
                    </button>
                    <span className="font-mono text-xs text-muted-foreground">
                      2/2
                    </span>
                  </div>

                  <p className="font-sans text-xs font-bold text-foreground">
                    {isVi
                      ? `Bước 2/2: Chọn Loại Trang Bị (${result.setMeta.shortName.vi})`
                      : `Step 2/2: Select Gear Slot (${result.setMeta.shortName.en})`}
                  </p>

                  <div className="grid grid-cols-2 gap-2">
                    {GEAR_PROMOTION_SLOTS.map((slot) => {
                      const item = result.setMeta.items[slot.id];
                      const isSelectedSlot = slot.id === slotId;
                      return (
                        <button
                          key={slot.id}
                          type="button"
                          data-testid={`picker-slot-${slot.id}`}
                          onClick={() => handleSelectSlot(slot.id)}
                          className={cn(
                            "flex min-h-[64px] flex-col items-center justify-center gap-1 rounded-xl p-2 text-center transition-colors cursor-pointer",
                            isSelectedSlot
                              ? "bg-amber-500/15 ring-1 ring-amber-500/60"
                              : "bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-800"
                          )}
                        >
                          <Image
                            src={
                              isTargetMythic
                                ? item.mythicIconPath
                                : item.legendaryIconPath
                            }
                            alt={item.itemName[locale]}
                            width={36}
                            height={36}
                            className="h-9 w-9 object-contain"
                          />
                          <span className="font-sans text-xs font-bold text-foreground">
                            {slot.label[locale]}
                          </span>
                          <span className="w-full truncate font-sans text-xs text-muted-foreground">
                            {item.itemName[locale]}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>

        {/* SECTION 3 (Right - 5 cols): Đột Phá Mục Tiêu */}
        <div className="lg:col-span-5">
          <GearPromotionStepSelector
            label={isVi ? "Đột Phá Mục Tiêu" : "Target Promotion"}
            stepIndex={toStepIndex}
            onChange={setToStepIndex}
            setId={setId}
            slotId={slotId}
            locale={locale}
            variant="to"
            testIdPrefix="gear-promotion-to"
          />
        </div>
      </div>

      {/* Invalid Range Banner */}
      {result.isInvalidRange ? (
        <div
          role="alert"
          data-testid="promo-invalid-range-warning"
          className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-amber-500/15 px-4 py-3 text-amber-800 dark:text-amber-200"
        >
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
            <p className="font-sans text-sm font-medium">
              {isVi
                ? "Đột phá mục tiêu đang thấp hơn Đột phá hiện tại. Số lượng tài nguyên yêu cầu được đặt về 0."
                : "Target promotion step is lower than current step. Required resources are set to 0."}
            </p>
          </div>
          <button
            type="button"
            data-testid="promo-fix-invalid-range-btn"
            onClick={handleFixInvalidRange}
            className={cn(
              CALC_MD3.chipButton,
              "bg-amber-500 font-sans font-bold text-slate-950 hover:bg-amber-400"
            )}
          >
            {isVi ? "Tự nâng +1 Sao" : "Auto +1 Star"}
          </button>
        </div>
      ) : null}

      {/* SECTION 4 (Bottom Unified Section): Tài Nguyên (5 Vertical Cards × Horizontal Fields) */}
      <section
        data-testid="gear-promotion-resources-section"
        className={cn(CALC_MD3.surfaceCard, "space-y-4")}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className={CALC_MD3.sectionTitle}>
              {isVi
                ? "Tài Nguyên Cần Đến (1 Món Trang Bị)"
                : "Required Resources (1 Gear Piece)"}
            </h2>
            <p className="mt-0.5 font-sans text-xs text-muted-foreground">
              {isVi
                ? "Nhập số lượng đang có (hỗ trợ gõ nhanh 150k, 10m) để tự động tính số lượng còn thiếu hoặc dư"
                : "Enter owned amounts (supports 150k, 10m shorthand) to automatically compute missing or surplus resources"}
            </p>
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-3 py-1 font-sans text-xs font-semibold text-amber-800 dark:text-amber-300">
            <CheckCircle2 className="h-4 w-4 text-amber-500" />
            <span>
              {result.fromNode.shortLabel[locale]} ➔{" "}
              {result.toNode.shortLabel[locale]}
            </span>
          </span>
        </div>

        {/* 5 Vertical Material Cards */}
        <div className="space-y-3">
          {result.materialBreakdown.map((item) => {
            const matName = isVi ? item.material.nameVi : item.material.nameEn;
            const isDeficit = item.missing > 0;
            const inputValue = ownedInputs[item.key];

            return (
              <div
                key={item.key}
                data-testid={`promo-resource-card-${item.key}`}
                className="rounded-2xl bg-slate-50/90 p-3.5 transition-colors ring-1 ring-slate-200/80 dark:bg-slate-800/60 dark:ring-slate-700/70"
              >
                <div className="grid grid-cols-1 items-center gap-3 lg:grid-cols-12">
                  {/* Column 1 (4 cols): Material Identity + Refund Rule + Progress Bar */}
                  <div className="flex items-center gap-3 lg:col-span-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-background/90 p-1.5 shadow-sm">
                      <Image
                        src={item.material.iconPath}
                        alt={matName}
                        width={36}
                        height={36}
                        className="h-9 w-9 object-contain"
                      />
                    </div>
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <p className="truncate font-sans text-sm font-bold text-foreground">
                          {matName}
                        </p>
                        <span
                          className={cn(
                            "inline-flex items-center rounded-md px-1.5 py-0.5 font-sans text-xs font-medium",
                            item.isRefundableOnDismantle
                              ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                              : "bg-rose-500/15 text-rose-700 dark:text-rose-300"
                          )}
                        >
                          {item.refundBadge[locale]}
                        </span>
                      </div>
                      <p className="truncate font-sans text-xs text-muted-foreground">
                        {item.sourceHint[locale]}
                      </p>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all",
                            isDeficit ? "bg-amber-500" : "bg-emerald-500"
                          )}
                          style={{ width: `${item.completionPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Column 2 (2 cols): Số lượng yêu cầu (Required) */}
                  <div className="flex flex-col justify-center rounded-xl bg-background/80 px-3 py-2 lg:col-span-2">
                    <span className="font-sans text-xs font-medium text-muted-foreground">
                      {isVi ? "Số lượng yêu cầu" : "Required"}
                    </span>
                    <span
                      data-testid={`promo-required-${item.key}`}
                      className="mt-0.5 font-mono text-lg font-black text-foreground tabular-nums"
                    >
                      {formatCompactNumber(item.required)}
                    </span>
                    {item.required >= 1_000 ? (
                      <span className="font-mono text-xs text-muted-foreground tabular-nums">
                        {formatExactNumber(item.required)}
                      </span>
                    ) : null}
                  </div>

                  {/* Column 3 (3 cols): Số lượng đang có (Owned Input with K/M support) */}
                  <div className="flex flex-col justify-center rounded-xl bg-background/80 px-3 py-2 lg:col-span-3">
                    <div className="flex items-center justify-between gap-2">
                      <label
                        htmlFor={`promo-owned-input-${item.key}`}
                        className="font-sans text-xs font-medium text-muted-foreground"
                      >
                        {isVi ? "Số lượng đang có" : "Owned"}
                      </label>
                      {item.owned >= 1_000 ? (
                        <span className="font-mono text-xs font-semibold text-amber-600 tabular-nums dark:text-amber-400">
                          = {formatCompactNumber(item.owned)}
                        </span>
                      ) : null}
                    </div>
                    <input
                      id={`promo-owned-input-${item.key}`}
                      data-testid={`promo-owned-input-${item.key}`}
                      type="text"
                      inputMode="text"
                      placeholder={isVi ? "VD: 150k, 10m" : "e.g. 150k, 10m"}
                      value={inputValue}
                      onChange={(e) =>
                        handleOwnedChange(item.key, e.target.value)
                      }
                      className={cn(
                        CALC_MD3.dataInput,
                        "mt-1 w-full bg-slate-100/90 px-3 text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/40 dark:bg-slate-900/70"
                      )}
                    />
                  </div>

                  {/* Column 4 (3 cols): Số lượng còn thiếu / Dư (Missing / Surplus) */}
                  <div
                    className={cn(
                      "flex flex-col justify-center rounded-xl px-3 py-2 lg:col-span-3",
                      isDeficit
                        ? "bg-rose-500/10 text-rose-700 dark:text-rose-300"
                        : "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-sans text-xs font-semibold">
                        {isDeficit
                          ? isVi
                            ? "Số lượng còn thiếu"
                            : "Missing"
                          : isVi
                            ? "Đã đủ (Dư sau nâng)"
                            : "Sufficient (Surplus)"}
                      </span>
                      <span className="font-mono text-xs font-bold tabular-nums">
                        {item.completionPercent}%
                      </span>
                    </div>
                    <span
                      data-testid={`promo-missing-${item.key}`}
                      className="mt-0.5 font-mono text-lg font-black tabular-nums"
                    >
                      {isDeficit
                        ? formatCompactNumber(item.missing)
                        : `+${formatCompactNumber(item.surplus)}`}
                    </span>
                    {(isDeficit ? item.missing : item.surplus) >= 1_000 ? (
                      <span className="font-mono text-xs opacity-80 tabular-nums">
                        {isDeficit
                          ? formatExactNumber(item.missing)
                          : `+${formatExactNumber(item.surplus)}`}
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

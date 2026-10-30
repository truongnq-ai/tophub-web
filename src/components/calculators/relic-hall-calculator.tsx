"use client";

import Image from "next/image";
import React, { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Percent,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import {
  RELIC_HALL_DISCOUNT_PRESETS,
  RELIC_HALL_RANGE_GROUPS,
  calculateRelicHallUpgrade,
  clampCostReductionPercent,
  clampRelicHallLevel,
  clampRelicHallSubStep,
  getRelicHallLevelMeta,
  getRelicHallState,
} from "@/content/calculators/relic-hall-data";
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
import { CALC_MD3, CalculatorToolHeader } from "./calculator-md3-primitives";
import { RelicHallStepSelector } from "./relic-hall-step-selector";

export interface RelicHallCalculatorProps {
  readonly zone?: CalculatorZone;
  readonly category: CalculatorCategory;
  readonly tool: CalculatorToolItem;
  readonly locale: CalculatorLocale;
}

const DEFAULT_FROM_LEVEL = 60;
const DEFAULT_FROM_SUB_STEP = 0;
const DEFAULT_TO_LEVEL = 61;
const DEFAULT_TO_SUB_STEP = 0;

export function RelicHallCalculator({
  tool,
  locale,
}: RelicHallCalculatorProps) {
  const isVi = locale === "vi";

  const [fromLevel, setFromLevel] = useState<number>(DEFAULT_FROM_LEVEL);
  const [fromSubStep, setFromSubStep] = useState<number>(DEFAULT_FROM_SUB_STEP);
  const [toLevel, setToLevel] = useState<number>(DEFAULT_TO_LEVEL);
  const [toSubStep, setToSubStep] = useState<number>(DEFAULT_TO_SUB_STEP);

  const [costReductionPercent, setCostReductionPercent] = useState<number>(0);
  const [customDiscountText, setCustomDiscountText] = useState<string>("0");

  const [ownedCrystalsText, setOwnedCrystalsText] = useState<string>("");
  const [ownedStonesText, setOwnedStonesText] = useState<string>("");

  const [activeRangeGroupId, setActiveRangeGroupId] = useState<string>("1-50");

  const ownedArcaneCrystals = useMemo(
    () => parseCompactNumberInput(ownedCrystalsText),
    [ownedCrystalsText]
  );
  const ownedMagicStones = useMemo(
    () => parseCompactNumberInput(ownedStonesText),
    [ownedStonesText]
  );

  const calculation = useMemo(
    () =>
      calculateRelicHallUpgrade({
        fromLevel,
        fromSubStep,
        toLevel,
        toSubStep,
        costReductionPercent,
        ownedArcaneCrystals,
        ownedMagicStones,
      }),
    [
      fromLevel,
      fromSubStep,
      toLevel,
      toSubStep,
      costReductionPercent,
      ownedArcaneCrystals,
      ownedMagicStones,
    ]
  );

  const activeRangeGroup = useMemo(
    () =>
      RELIC_HALL_RANGE_GROUPS.find((g) => g.id === activeRangeGroupId) ??
      RELIC_HALL_RANGE_GROUPS[0],
    [activeRangeGroupId]
  );

  const rangeTableRows = useMemo(() => {
    const rows = [];
    for (
      let lv = activeRangeGroup.minLevel;
      lv <= activeRangeGroup.maxLevel;
      lv += 1
    ) {
      const meta = getRelicHallLevelMeta(lv);
      const state = getRelicHallState(lv, 0, costReductionPercent);
      const totalLevelBaseStone =
        lv === 141
          ? 2 * 45_000 + 8 * 43_000
          : meta.baseStonePerSubStep * meta.subStepsCount;
      const totalLevelBaseCrystal =
        meta.baseCrystalPerSubStep * meta.subStepsCount;
      rows.push({
        level: lv,
        subStepsCount: meta.subStepsCount,
        isBreakthrough: meta.isBreakthroughLevel,
        fightforce: state.fightforce,
        atkHpBoostPercent: state.atkHpBoostPercent,
        conversionPercent: state.conversionPercent,
        stepStone: state.nextStepDiscountedStone,
        stepCrystal: state.nextStepDiscountedCrystal,
        totalLevelBaseStone,
        totalLevelBaseCrystal,
      });
    }
    return rows;
  }, [activeRangeGroup, costReductionPercent]);

  const handleFromChange = (nextLv: number, nextSub: number) => {
    const safeLv = clampRelicHallLevel(nextLv);
    const safeSub = clampRelicHallSubStep(safeLv, nextSub);
    setFromLevel(safeLv);
    setFromSubStep(safeSub);
  };

  const handleToChange = (nextLv: number, nextSub: number) => {
    const safeLv = clampRelicHallLevel(nextLv);
    const safeSub = clampRelicHallSubStep(safeLv, nextSub);
    setToLevel(safeLv);
    setToSubStep(safeSub);
  };

  const handleSelectDiscountPreset = (presetPct: number) => {
    const safe = clampCostReductionPercent(presetPct);
    setCostReductionPercent(safe);
    setCustomDiscountText(String(safe));
  };

  const handleCustomDiscountChange = (raw: string) => {
    setCustomDiscountText(raw);
    const parsed = Number(raw.replace(",", "."));
    if (Number.isFinite(parsed)) {
      setCostReductionPercent(clampCostReductionPercent(parsed));
    }
  };

  const handleReset = () => {
    setFromLevel(DEFAULT_FROM_LEVEL);
    setFromSubStep(DEFAULT_FROM_SUB_STEP);
    setToLevel(DEFAULT_TO_LEVEL);
    setToSubStep(DEFAULT_TO_SUB_STEP);
    setCostReductionPercent(0);
    setCustomDiscountText("0");
    setOwnedCrystalsText("");
    setOwnedStonesText("");
  };

  const crystalMaterial = CALCULATOR_MATERIALS.arcaneCrystal;
  const stoneMaterial = CALCULATOR_MATERIALS.magicStone;
  const crystalName = isVi ? crystalMaterial.nameVi : crystalMaterial.nameEn;
  const stoneName = isVi ? stoneMaterial.nameVi : stoneMaterial.nameEn;

  return (
    <div data-testid="relic-hall-calculator" className="space-y-3.5">
      {/* Header phẳng MD3 + nút (i) tra cứu 250 cấp Sảnh Bí Bảo */}
      <CalculatorToolHeader
        code={tool.code}
        title={tool.title[locale]}
        actions={
          <>
            <button
              type="button"
              data-testid="relic-hall-reset-button"
              onClick={handleReset}
              className={cn(
                CALC_MD3.chipButton,
                "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              <span>{isVi ? "Đặt lại" : "Reset"}</span>
            </button>

            <CalculatorInfoPopover
              title={
                isVi
                  ? "Sổ Tay & Bảng Tra Cứu 250 Cấp Sảnh Bí Bảo"
                  : "Relic Hall Lv.1–250 Reference Table & Mechanics"
              }
              subtitle={
                isVi
                  ? "Dữ liệu trích xuất nguyên bản từ bảng citybuilding_lvup_new (index = 155)"
                  : "Authentic game data from citybuilding_lvup_new (index = 155)"
              }
              locale={locale}
              triggerTestId="relic-hall-info-trigger"
              dialogTestId="relic-hall-info-dialog"
            >
              <div className="space-y-4">
                <div className={cn(CALC_MD3.tonalGroup, "space-y-2")}>
                  <p className="font-sans text-xs sm:text-sm font-bold text-foreground">
                    {isVi
                      ? "Quy luật nâng cấp Sảnh Bí Bảo (Lv.1 ➔ Lv.250)"
                      : "Relic Hall Progression Rules (Lv.1 ➔ Lv.250)"}
                  </p>
                  <ul className="space-y-1.5 font-sans text-xs text-muted-foreground">
                    <li>
                      {isVi
                        ? "• Từ Lv.1 đến Lv.145: Các cấp thường gồm 4–20 bậc tiến độ (chỉ tốn Đá Vân Ma Thuật); mỗi cấp chia hết cho 5 (Lv.5, 10, 15... 145) là 1 bước đột phá tốn cả Pha Lê Bí Thuật và Đá Vân Ma Thuật."
                        : "• Lv.1 to Lv.145: Regular levels have 4–20 progress sub-steps (Magic Stones only); every multiple of 5 (Lv.5, 10, 15... 145) is a 1-step breakthrough requiring both Arcane Crystals and Magic Stones."}
                    </li>
                    <li>
                      {isVi
                        ? "• Từ Lv.151 đến Lv.250: Mỗi cấp gồm 10 bậc tiến độ, mỗi bậc đều cần đồng thời Đá Vân Ma Thuật và Pha Lê Bí Thuật."
                        : "• Lv.151 to Lv.250: Every level has 10 progress steps, each consuming both Magic Stones and Arcane Crystals."}
                    </li>
                    <li>
                      {isVi
                        ? "• Công thức % Giảm Chi Phí Xây Dựng: Làm tròn xuống (Math.floor) trên từng bậc tiến độ trước khi cộng dồn."
                        : "• Construction Cost Reduction %: Applied via Math.floor per individual progress step before summing."}
                    </li>
                  </ul>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {RELIC_HALL_RANGE_GROUPS.map((group) => {
                    const active = group.id === activeRangeGroup.id;
                    return (
                      <button
                        key={group.id}
                        type="button"
                        data-testid={`relic-hall-range-tab-${group.id}`}
                        onClick={() => setActiveRangeGroupId(group.id)}
                        className={cn(
                          CALC_MD3.chipButton,
                          "px-3 font-mono text-xs font-bold",
                          active
                            ? "bg-amber-500 text-slate-950 shadow-sm"
                            : "bg-muted/60 text-foreground hover:bg-amber-500/15"
                        )}
                      >
                        {group.label[locale]}
                      </button>
                    );
                  })}
                </div>

                <div className={cn(CALC_MD3.tonalGroup, "overflow-x-auto p-2")}>
                  <table className="w-full text-left font-sans text-xs">
                    <thead>
                      <tr className="text-muted-foreground">
                        <th className="px-2 py-2 font-bold">
                          {isVi ? "Cấp" : "Level"}
                        </th>
                        <th className="px-2 py-2 font-bold">
                          {isVi ? "Số bậc" : "Steps"}
                        </th>
                        <th className="px-2 py-2 font-bold">
                          {isVi ? "Đá Vân / bậc" : "Stones / step"}
                        </th>
                        <th className="px-2 py-2 font-bold">
                          {isVi ? "Pha Lê / bậc" : "Crystals / step"}
                        </th>
                        <th className="px-2 py-2 font-bold">
                          {isVi ? "Uy Thế" : "Power"}
                        </th>
                        <th className="px-2 py-2 font-bold">
                          {isVi ? "Tăng ATK/HP" : "ATK/HP Boost"}
                        </th>
                        <th className="px-2 py-2 font-bold">
                          {isVi ? "Chuyển Hóa" : "Conversion"}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {rangeTableRows.map((row) => (
                        <tr
                          key={row.level}
                          className={cn(
                            "rounded-lg transition-colors",
                            row.isBreakthrough
                              ? "bg-amber-500/10 font-semibold text-foreground"
                              : "text-muted-foreground hover:bg-muted/50"
                          )}
                        >
                          <td className="px-2 py-1.5 font-mono font-bold text-foreground">
                            {`Lv.${row.level}`}
                          </td>
                          <td className="px-2 py-1.5 font-mono">
                            {row.subStepsCount}
                          </td>
                          <td className="px-2 py-1.5 font-mono">
                            {formatExactNumber(row.stepStone)}
                          </td>
                          <td className="px-2 py-1.5 font-mono text-amber-600 dark:text-amber-400">
                            {row.stepCrystal > 0
                              ? formatExactNumber(row.stepCrystal)
                              : "—"}
                          </td>
                          <td className="px-2 py-1.5 font-mono">
                            {formatExactNumber(row.fightforce)}
                          </td>
                          <td className="px-2 py-1.5 font-mono">
                            {`${row.atkHpBoostPercent}%`}
                          </td>
                          <td className="px-2 py-1.5 font-mono">
                            {`${row.conversionPercent}%`}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CalculatorInfoPopover>
          </>
        }
      />

      {/* Cảnh báo nếu khoảng chọn không hợp lệ */}
      {calculation.isInvalidRange ? (
        <div
          data-testid="relic-hall-invalid-range-alert"
          className={cn(
            CALC_MD3.surfaceCard,
            "flex items-center gap-3 bg-amber-500/10 text-amber-700 dark:text-amber-300"
          )}
        >
          <AlertTriangle className="h-5 w-5 shrink-0" aria-hidden="true" />
          <p className="font-sans text-xs sm:text-sm font-semibold">
            {isVi
              ? "Cấp hoặc bậc mục tiêu đang nhỏ hơn cấp hiện tại. Vui lòng chọn Cấp Mục Tiêu cao hơn Cấp Hiện Tại."
              : "Target level/step is lower than Current level/step. Please select a higher Target state."}
          </p>
        </div>
      ) : null}

      {/* Main 1/3 + 2/3 Workbench on PC: Left 1/3 (Avatar & Cost Reduction %) | Right 2/3 (Row 1: Current, Row 2: Target) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
        {/* CỘT 1/3 — Avatar Sảnh Bí Bảo + Nút (i) So sánh chỉ số + % Giảm Chi Phí Xây Dựng */}
        <section
          data-testid="relic-hall-zone-avatar"
          className={cn(
            CALC_MD3.surfaceCard,
            "lg:col-span-4 flex flex-col justify-between space-y-3"
          )}
        >
          {/* Header cột 1/3 + Nút (i) xem So Sánh Chỉ Số (Hiện Tại ➔ Mục Tiêu) */}
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <span className="inline-flex items-center rounded-lg bg-amber-500/15 px-2.5 py-0.5 font-sans text-xs font-bold text-amber-700 dark:text-amber-300">
                {isVi ? "Công trình" : "Building"}
              </span>
              <h2 className="mt-1 font-heading text-base sm:text-lg font-extrabold text-foreground truncate">
                {isVi ? "Sảnh Bí Bảo" : "Relic Hall"}
              </h2>
            </div>

            <CalculatorInfoPopover
              title={
                isVi
                  ? "So Sánh Chỉ Số Sảnh Bí Bảo (Hiện Tại ➔ Mục Tiêu)"
                  : "Relic Hall Attribute Comparison (Current ➔ Target)"
              }
              subtitle={
                isVi
                  ? `Lv.${calculation.fromState.level} (${calculation.fromState.subStep}/${calculation.fromState.subStepsCount}) ➔ Lv.${calculation.toState.level} (${calculation.toState.subStep}/${calculation.toState.subStepsCount}) • ${formatExactNumber(calculation.subStepsTraversed)} bậc`
                  : `Lv.${calculation.fromState.level} ➔ Lv.${calculation.toState.level} • ${formatExactNumber(calculation.subStepsTraversed)} steps`
              }
              locale={locale}
              triggerLabel={
                isVi
                  ? "Xem bảng so sánh chỉ số tăng thêm của Sảnh Bí Bảo"
                  : "View Relic Hall attribute gain comparison"
              }
              triggerTestId="relic-hall-avatar-info-trigger"
              dialogTestId="relic-hall-avatar-info-dialog"
            >
              <div className="space-y-3">
                <div className={cn(CALC_MD3.tonalGroup, "space-y-2.5")}>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-sans text-xs font-semibold text-muted-foreground">
                      {isVi ? "Uy Thế tăng thêm" : "Power Gain"}
                    </span>
                    <div className="flex items-center gap-1.5 font-mono text-xs sm:text-sm font-black">
                      <span className="text-muted-foreground">
                        {formatCompactNumber(calculation.fromState.fightforce)}
                      </span>
                      <ArrowRight
                        className="h-3.5 w-3.5 text-amber-500"
                        aria-hidden="true"
                      />
                      <span className="text-foreground">
                        {formatCompactNumber(calculation.toState.fightforce)}
                      </span>
                      <span
                        data-testid="relic-hall-delta-power"
                        className="text-emerald-600 dark:text-emerald-400"
                      >
                        {`(+${formatExactNumber(calculation.fightforceDelta)})`}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <span className="font-sans text-xs font-semibold text-muted-foreground">
                      {isVi
                        ? "Tăng Tỉ Lệ ATK/HP Bí Bảo"
                        : "Relic ATK/HP Boost"}
                    </span>
                    <div className="flex items-center gap-1.5 font-mono text-xs sm:text-sm font-black">
                      <span className="text-muted-foreground">
                        {`${calculation.fromState.atkHpBoostPercent}%`}
                      </span>
                      <ArrowRight
                        className="h-3.5 w-3.5 text-amber-500"
                        aria-hidden="true"
                      />
                      <span className="text-amber-600 dark:text-amber-400">
                        {`${calculation.toState.atkHpBoostPercent}%`}
                      </span>
                      <span
                        data-testid="relic-hall-delta-boost"
                        className="text-emerald-600 dark:text-emerald-400"
                      >
                        {`(+${calculation.atkHpBoostDeltaPercent}%)`}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <span className="font-sans text-xs font-semibold text-muted-foreground">
                      {isVi
                        ? "TL Chuyển Hóa Thuộc Tính"
                        : "Attr Conversion Rate"}
                    </span>
                    <div className="flex items-center gap-1.5 font-mono text-xs sm:text-sm font-black">
                      <span className="text-muted-foreground">
                        {`${calculation.fromState.conversionPercent}%`}
                      </span>
                      <ArrowRight
                        className="h-3.5 w-3.5 text-amber-500"
                        aria-hidden="true"
                      />
                      <span className="text-foreground">
                        {`${calculation.toState.conversionPercent}%`}
                      </span>
                      <span
                        data-testid="relic-hall-delta-conversion"
                        className="text-emerald-600 dark:text-emerald-400"
                      >
                        {`(+${calculation.conversionDeltaPercent}%)`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CalculatorInfoPopover>
          </div>

          {/* Building Illustration & Transition Pill */}
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="relative flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-3xl bg-gradient-to-b from-amber-500/20 via-amber-500/5 to-muted/40 p-2.5 shadow-inner">
              <Image
                src="/images/buildings/structures/Building_mibaodating.webp"
                alt={isVi ? "Công trình Sảnh Bí Bảo" : "Relic Hall Building"}
                width={96}
                height={96}
                className="h-20 w-20 sm:h-24 sm:w-24 object-contain drop-shadow-md"
              />
              <span className="absolute -bottom-2 inline-flex items-center gap-1 rounded-full bg-amber-500 px-3 py-0.5 font-mono text-xs font-black text-slate-950 shadow-sm">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                {`Lv.${calculation.fromState.level} ➔ Lv.${calculation.toState.level}`}
              </span>
            </div>

            <p className="pt-1 font-sans text-xs font-semibold text-muted-foreground">
              {isVi
                ? `Tổng số bậc nâng cấp: ${formatExactNumber(calculation.subStepsTraversed)} bậc • Tăng ATK/HP: +${calculation.atkHpBoostDeltaPercent}%`
                : `Total steps: ${formatExactNumber(calculation.subStepsTraversed)} • ATK/HP Boost: +${calculation.atkHpBoostDeltaPercent}%`}
            </p>
          </div>

          {/* % Giảm Chi Phí Xây Dựng (Buff Công Nghệ / Bang Hội / Skin) */}
          <div className={cn(CALC_MD3.tonalGroup, "space-y-2 p-2.5 sm:p-3")}>
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 font-sans text-xs font-bold text-foreground">
                <Percent
                  className="h-3.5 w-3.5 text-amber-500"
                  aria-hidden="true"
                />
                {isVi
                  ? "% Giảm Chi Phí Xây Dựng"
                  : "Construction Cost Reduction %"}
              </span>
              <span
                data-testid="relic-hall-active-discount"
                className="font-mono text-xs font-black text-amber-600 dark:text-amber-400"
              >
                {`-${calculation.costReductionPercent}%`}
              </span>
            </div>

            <div className="grid grid-cols-5 gap-1">
              {RELIC_HALL_DISCOUNT_PRESETS.map((preset) => {
                const isSelected = calculation.costReductionPercent === preset;
                return (
                  <button
                    key={preset}
                    type="button"
                    data-testid={`relic-hall-discount-chip-${preset}`}
                    onClick={() => handleSelectDiscountPreset(preset)}
                    className={cn(
                      CALC_MD3.chipButton,
                      "px-1.5 font-mono text-xs font-bold",
                      isSelected
                        ? "bg-amber-500 text-slate-950 shadow-sm"
                        : "bg-background/70 text-foreground hover:bg-amber-500/15"
                    )}
                  >
                    {`${preset}%`}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <label
                htmlFor="relic-hall-discount-custom-input"
                className="font-sans text-xs font-semibold text-muted-foreground shrink-0"
              >
                {isVi ? "Nhập % tùy chỉnh:" : "Custom %:"}
              </label>
              <input
                id="relic-hall-discount-custom-input"
                type="text"
                inputMode="decimal"
                data-testid="relic-hall-discount-custom-input"
                value={customDiscountText}
                onChange={(event) =>
                  handleCustomDiscountChange(event.target.value)
                }
                placeholder="0"
                className={cn(
                  CALC_MD3.dataInput,
                  "w-full border-0 bg-background/80 px-3 text-right ring-1 ring-border/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                )}
              />
            </div>
          </div>
        </section>

        {/* CỘT 2/3 — Chia thành 2 Dòng: Dòng Trên (Cấp Hiện Tại) & Dòng Dưới (Cấp Mục Tiêu) */}
        <div className="lg:col-span-8 flex flex-col justify-between gap-3.5">
          {/* DÒNG TRÊN — Cấp Hiện Tại */}
          <section
            data-testid="relic-hall-zone-current"
            className={cn(CALC_MD3.surfaceCard, "flex-1 flex flex-col justify-center")}
          >
            <RelicHallStepSelector
              testIdPrefix="from"
              title={isVi ? "Cấp Hiện Tại" : "Current Level"}
              badgeLabel={isVi ? "Điểm xuất phát" : "Start"}
              level={fromLevel}
              subStep={fromSubStep}
              costReductionPercent={costReductionPercent}
              locale={locale}
              onChange={handleFromChange}
            />
          </section>

          {/* DÒNG DƯỚI — Cấp Mục Tiêu */}
          <section
            data-testid="relic-hall-zone-target"
            className={cn(CALC_MD3.surfaceCard, "flex-1 flex flex-col justify-center")}
          >
            <RelicHallStepSelector
              testIdPrefix="to"
              title={isVi ? "Cấp Mục Tiêu" : "Target Level"}
              badgeLabel={isVi ? "Đích đến" : "Target"}
              level={toLevel}
              subStep={toSubStep}
              costReductionPercent={costReductionPercent}
              locale={locale}
              onChange={handleToChange}
            />
          </section>
        </div>
      </div>

      {/* ZONE 4 — Hàng Nguyên Liệu Thu Gọn 1 Dòng (Compact Horizontal KPI Strip) */}
      <section
        data-testid="relic-hall-resources-panel"
        className={cn(CALC_MD3.surfaceCard, "space-y-2.5")}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className={CALC_MD3.sectionTitle}>
              {isVi
                ? "Tài Nguyên Nâng Cấp Sảnh Bí Bảo"
                : "Relic Hall Upgrade Resources"}
            </h2>
            {calculation.costReductionPercent > 0 ? (
              <span className="inline-flex items-center gap-1 rounded-xl bg-emerald-500/15 px-2.5 py-1 font-sans text-xs font-bold text-emerald-700 dark:text-emerald-300">
                <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                {isVi
                  ? `Giảm ${calculation.costReductionPercent}% chi phí`
                  : `-${calculation.costReductionPercent}% cost discount`}
              </span>
            ) : null}
          </div>

          <CalculatorInfoPopover
            title={
              isVi
                ? "Hướng Dẫn Nguyên Liệu & Nhập Nhanh K/M"
                : "Resource Guide & K/M Shorthand Input"
            }
            subtitle={
              isVi
                ? "Pha Lê Bí Thuật (ID: 238) & Đá Vân Ma Thuật (ID: 237)"
                : "Arcane Crystal (ID: 238) & Magic Stone (ID: 237)"
            }
            locale={locale}
            triggerLabel={
              isVi
                ? "Xem hướng dẫn nguyên liệu Sảnh Bí Bảo"
                : "View Relic Hall resource guide"
            }
            triggerTestId="relic-hall-resources-info-trigger"
            dialogTestId="relic-hall-resources-info-dialog"
          >
            <div className={cn(CALC_MD3.tonalGroup, "space-y-2")}>
              <p className="font-sans text-xs text-muted-foreground">
                {isVi
                  ? "• Hỗ trợ nhập nhanh đơn vị K / M (ví dụ: gõ 270k = 270,000; 1.5m = 1,500,000) để đối chiếu kho đồ trực tiếp trong game."
                  : "• Supports K / M shorthand inputs (e.g. 270k = 270,000; 1.5m = 1,500,000) to match your in-game inventory."}
              </p>
              <p className="font-sans text-xs text-muted-foreground">
                {isVi
                  ? "• Pha Lê Bí Thuật dùng cho các mốc đột phá cấp chia hết cho 5 (Lv.5, 10... 145) và mọi bậc tiến độ từ Lv.151 đến Lv.250."
                  : "• Arcane Crystals are required at every multiple-of-5 breakthrough (Lv.5, 10... 145) and every step from Lv.151 to Lv.250."}
              </p>
            </div>
          </CalculatorInfoPopover>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Card 1: Pha Lê Bí Thuật (Arcane Crystal) — Compact Horizontal KPI Strip */}
          <div className={cn(CALC_MD3.tonalGroup, "space-y-2 p-2.5 sm:p-3")}>
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 p-1">
                <Image
                  src={crystalMaterial.iconPath}
                  alt={crystalName}
                  width={32}
                  height={32}
                  className="h-7 w-7 object-contain"
                />
              </div>
              <h3 className="font-heading text-sm sm:text-base font-bold text-foreground truncate">
                {crystalName}
              </h3>
            </div>

            <div className="grid grid-cols-3 gap-2 items-stretch">
              {/* Cột 1: Tổng Cần */}
              <div className="flex flex-col justify-between rounded-xl bg-background/60 px-2.5 py-2">
                <span className="font-sans text-xs font-semibold text-muted-foreground">
                  {isVi ? "Tổng cần" : "Required"}
                </span>
                <div className="mt-0.5 flex items-baseline gap-1.5">
                  <span
                    data-testid="relic-hall-required-crystals"
                    title={formatExactNumber(
                      calculation.requiredArcaneCrystals
                    )}
                    className="font-mono text-lg sm:text-xl font-black text-amber-600 dark:text-amber-400 tabular-nums"
                  >
                    {formatCompactNumber(calculation.requiredArcaneCrystals)}
                  </span>
                  {calculation.costReductionPercent > 0 &&
                  calculation.baseArcaneCrystals !==
                    calculation.requiredArcaneCrystals ? (
                    <span className="font-mono text-xs text-muted-foreground line-through">
                      {formatCompactNumber(calculation.baseArcaneCrystals)}
                    </span>
                  ) : null}
                </div>
              </div>

              {/* Cột 2: Đang Có (Input 44px) */}
              <div className="flex flex-col justify-between">
                <label
                  htmlFor="relic-hall-owned-crystals-input"
                  className="font-sans text-xs font-semibold text-muted-foreground truncate"
                >
                  {isVi ? "Đang có" : "Owned"}
                </label>
                <input
                  id="relic-hall-owned-crystals-input"
                  type="text"
                  inputMode="text"
                  data-testid="relic-hall-owned-crystals-input"
                  value={ownedCrystalsText}
                  onChange={(event) => setOwnedCrystalsText(event.target.value)}
                  placeholder="0"
                  className={cn(
                    CALC_MD3.dataInput,
                    "mt-0.5 w-full border-0 bg-background/80 px-2.5 ring-1 ring-border/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                  )}
                />
              </div>

              {/* Cột 3: Còn Thiếu / Đủ */}
              <div className="flex flex-col justify-between rounded-xl bg-background/60 px-2.5 py-2">
                <span className="font-sans text-xs font-semibold text-muted-foreground">
                  {isVi ? "Còn thiếu" : "Missing"}
                </span>
                {calculation.missingArcaneCrystals > 0 ? (
                  <span
                    data-testid="relic-hall-missing-crystals"
                    title={formatExactNumber(calculation.missingArcaneCrystals)}
                    className="mt-0.5 font-mono text-base sm:text-lg font-black text-rose-600 dark:text-rose-400 tabular-nums"
                  >
                    {formatCompactNumber(calculation.missingArcaneCrystals)}
                  </span>
                ) : (
                  <span
                    data-testid="relic-hall-missing-crystals"
                    title={formatExactNumber(calculation.surplusArcaneCrystals)}
                    className="mt-0.5 inline-flex items-center gap-1 font-sans text-xs font-bold text-emerald-600 dark:text-emerald-400"
                  >
                    <CheckCircle2
                      className="h-3.5 w-3.5 shrink-0"
                      aria-hidden="true"
                    />
                    <span className="truncate">
                      {isVi
                        ? `Đủ nguyên liệu (+Dư ${formatCompactNumber(calculation.surplusArcaneCrystals)})`
                        : `Enough materials (+Surplus ${formatCompactNumber(calculation.surplusArcaneCrystals)})`}
                    </span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Card 2: Đá Vân Ma Thuật (Magic Stone) — Compact Horizontal KPI Strip */}
          <div className={cn(CALC_MD3.tonalGroup, "space-y-2 p-2.5 sm:p-3")}>
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-500/15 p-1">
                <Image
                  src={stoneMaterial.iconPath}
                  alt={stoneName}
                  width={32}
                  height={32}
                  className="h-7 w-7 object-contain"
                />
              </div>
              <h3 className="font-heading text-sm sm:text-base font-bold text-foreground truncate">
                {stoneName}
              </h3>
            </div>

            <div className="grid grid-cols-3 gap-2 items-stretch">
              {/* Cột 1: Tổng Cần */}
              <div className="flex flex-col justify-between rounded-xl bg-background/60 px-2.5 py-2">
                <span className="font-sans text-xs font-semibold text-muted-foreground">
                  {isVi ? "Tổng cần" : "Required"}
                </span>
                <div className="mt-0.5 flex items-baseline gap-1.5">
                  <span
                    data-testid="relic-hall-required-stones"
                    title={formatExactNumber(calculation.requiredMagicStones)}
                    className="font-mono text-lg sm:text-xl font-black text-sky-600 dark:text-sky-400 tabular-nums"
                  >
                    {formatCompactNumber(calculation.requiredMagicStones)}
                  </span>
                  {calculation.costReductionPercent > 0 &&
                  calculation.baseMagicStones !==
                    calculation.requiredMagicStones ? (
                    <span className="font-mono text-xs text-muted-foreground line-through">
                      {formatCompactNumber(calculation.baseMagicStones)}
                    </span>
                  ) : null}
                </div>
              </div>

              {/* Cột 2: Đang Có (Input 44px) */}
              <div className="flex flex-col justify-between">
                <label
                  htmlFor="relic-hall-owned-stones-input"
                  className="font-sans text-xs font-semibold text-muted-foreground truncate"
                >
                  {isVi ? "Đang có" : "Owned"}
                </label>
                <input
                  id="relic-hall-owned-stones-input"
                  type="text"
                  inputMode="text"
                  data-testid="relic-hall-owned-stones-input"
                  value={ownedStonesText}
                  onChange={(event) => setOwnedStonesText(event.target.value)}
                  placeholder="0"
                  className={cn(
                    CALC_MD3.dataInput,
                    "mt-0.5 w-full border-0 bg-background/80 px-2.5 ring-1 ring-border/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                  )}
                />
              </div>

              {/* Cột 3: Còn Thiếu / Đủ */}
              <div className="flex flex-col justify-between rounded-xl bg-background/60 px-2.5 py-2">
                <span className="font-sans text-xs font-semibold text-muted-foreground">
                  {isVi ? "Còn thiếu" : "Missing"}
                </span>
                {calculation.missingMagicStones > 0 ? (
                  <span
                    data-testid="relic-hall-missing-stones"
                    title={formatExactNumber(calculation.missingMagicStones)}
                    className="mt-0.5 font-mono text-base sm:text-lg font-black text-rose-600 dark:text-rose-400 tabular-nums"
                  >
                    {formatCompactNumber(calculation.missingMagicStones)}
                  </span>
                ) : (
                  <span
                    data-testid="relic-hall-missing-stones"
                    title={formatExactNumber(calculation.surplusMagicStones)}
                    className="mt-0.5 inline-flex items-center gap-1 font-sans text-xs font-bold text-emerald-600 dark:text-emerald-400"
                  >
                    <CheckCircle2
                      className="h-3.5 w-3.5 shrink-0"
                      aria-hidden="true"
                    />
                    <span className="truncate">
                      {isVi
                        ? `Đủ nguyên liệu (+Dư ${formatCompactNumber(calculation.surplusMagicStones)})`
                        : `Enough materials (+Surplus ${formatCompactNumber(calculation.surplusMagicStones)})`}
                    </span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

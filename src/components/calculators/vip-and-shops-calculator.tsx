"use client";

import React, { useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Coins,
  Crown,
  DollarSign,
  Gift,
  RotateCcw,
  ShoppingBag,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import {
  VIP_EXTENDED_MAX_LEVEL,
  VIP_GOLD_BRICK_VND_PER_POINT,
  VIP_GOLD_BRICK_VND_PER_USD,
  VIP_LEVEL_TABLE,
  VIP_OPTIMAL_PACK_POINTS,
  VIP_OPTIMAL_PACK_USD,
  VIP_OPTIMAL_PACK_VND,
  VIP_POINTS_PER_USD,
  VIP_POINT_ICON_PATH,
  VIP_STANDARD_MAX_LEVEL,
  calculateVipProgression,
  sliderRatioToVipPoints,
  stepVipLevel,
  vipPointsToSliderRatio,
} from "@/content/calculators/vip-and-shops-data";
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
import { CalculatorInfoPopover } from "./calculator-info-popover";

export interface VipAndShopsCalculatorProps {
  readonly zone?: CalculatorZone;
  readonly category: CalculatorCategory;
  readonly tool: CalculatorToolItem;
  readonly locale: CalculatorLocale;
}

type StatFilterMode = "all" | "increased" | "newly_unlocked";

const DEFAULT_FROM_POINTS = 6_000; // VIP 8
const DEFAULT_TO_POINTS = 30_000; // VIP 10

export function VipAndShopsCalculator({
  tool,
  locale,
}: VipAndShopsCalculatorProps): React.ReactElement {
  const [showExtendedVip, setShowExtendedVip] = useState<boolean>(false);
  const [fromPoints, setFromPoints] = useState<number>(DEFAULT_FROM_POINTS);
  const [toPoints, setToPoints] = useState<number>(DEFAULT_TO_POINTS);
  const [fromPointsInput, setFromPointsInput] = useState<string>(
    String(DEFAULT_FROM_POINTS)
  );
  const [toPointsInput, setToPointsInput] = useState<string>(
    String(DEFAULT_TO_POINTS)
  );
  const [activeThumb, setActiveThumb] = useState<"from" | "to">("to");
  const [statFilter, setStatFilter] = useState<StatFilterMode>("all");

  const trackRef = useRef<HTMLDivElement | null>(null);
  const draggingThumbRef = useRef<"from" | "to" | "overlap_pending" | null>(
    null
  );
  const overlapStartXRef = useRef<number>(0);

  const maxVipLevel = showExtendedVip
    ? VIP_EXTENDED_MAX_LEVEL
    : VIP_STANDARD_MAX_LEVEL;
  const maxAllowedPoints = VIP_LEVEL_TABLE[maxVipLevel].cumulativePoints;

  const vipResult = useMemo(
    () =>
      calculateVipProgression({
        fromPoints,
        toPoints,
        locale,
      }),
    [fromPoints, toPoints, locale]
  );

  const fromRatio = useMemo(
    () => vipPointsToSliderRatio(vipResult.fromPoints, maxVipLevel),
    [vipResult.fromPoints, maxVipLevel]
  );

  const toRatio = useMemo(
    () => vipPointsToSliderRatio(vipResult.toPoints, maxVipLevel),
    [vipResult.toPoints, maxVipLevel]
  );

  const levelTicks = useMemo(
    () => VIP_LEVEL_TABLE.slice(0, maxVipLevel + 1),
    [maxVipLevel]
  );

  const filteredStatRows = useMemo(() => {
    if (statFilter === "newly_unlocked") {
      return vipResult.statComparisons.filter((row) => row.isNewlyUnlocked);
    }
    if (statFilter === "increased") {
      return vipResult.statComparisons.filter((row) => row.isIncreased);
    }
    return vipResult.statComparisons;
  }, [vipResult.statComparisons, statFilter]);

  const applyFromPoints = (nextRawPoints: number): void => {
    const clampedFrom = Math.max(
      0,
      Math.min(maxAllowedPoints, Math.floor(nextRawPoints))
    );
    setFromPoints(clampedFrom);
    setFromPointsInput(String(clampedFrom));
    setActiveThumb("from");
    if (toPoints < clampedFrom) {
      setToPoints(clampedFrom);
      setToPointsInput(String(clampedFrom));
    }
  };

  const applyToPoints = (nextRawPoints: number): void => {
    const clampedTo = Math.max(
      0,
      Math.min(maxAllowedPoints, Math.floor(nextRawPoints))
    );
    setToPoints(clampedTo);
    setToPointsInput(String(clampedTo));
    setActiveThumb("to");
    if (fromPoints > clampedTo) {
      setFromPoints(clampedTo);
      setFromPointsInput(String(clampedTo));
    }
  };

  const handleToggleExtendedVip = (): void => {
    const nextExtended = !showExtendedVip;
    setShowExtendedVip(nextExtended);
    if (!nextExtended) {
      const stdMaxPts =
        VIP_LEVEL_TABLE[VIP_STANDARD_MAX_LEVEL].cumulativePoints;
      const clampedFrom = Math.min(fromPoints, stdMaxPts);
      const clampedTo = Math.max(clampedFrom, Math.min(toPoints, stdMaxPts));
      setFromPoints(clampedFrom);
      setFromPointsInput(String(clampedFrom));
      setToPoints(clampedTo);
      setToPointsInput(String(clampedTo));
    }
  };

  const handleReset = (): void => {
    setShowExtendedVip(false);
    setFromPoints(DEFAULT_FROM_POINTS);
    setToPoints(DEFAULT_TO_POINTS);
    setFromPointsInput(String(DEFAULT_FROM_POINTS));
    setToPointsInput(String(DEFAULT_TO_POINTS));
    setActiveThumb("to");
    setStatFilter("all");
  };

  const handleFromInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const rawText = e.target.value;
    setFromPointsInput(rawText);
    const parsed = parseCompactNumberInput(rawText);
    if (Number.isFinite(parsed) && parsed >= 0) {
      const clamped = Math.max(
        0,
        Math.min(maxAllowedPoints, Math.floor(parsed))
      );
      setFromPoints(clamped);
      if (toPoints < clamped) {
        setToPoints(clamped);
        setToPointsInput(String(clamped));
      }
    }
  };

  const handleToInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const rawText = e.target.value;
    setToPointsInput(rawText);
    const parsed = parseCompactNumberInput(rawText);
    if (Number.isFinite(parsed) && parsed >= 0) {
      const clamped = Math.max(
        0,
        Math.min(maxAllowedPoints, Math.floor(parsed))
      );
      setToPoints(clamped);
      if (fromPoints > clamped) {
        setFromPoints(clamped);
        setFromPointsInput(String(clamped));
      }
    }
  };

  const computePointsFromClientX = (clientX: number): number => {
    const trackEl = trackRef.current;
    if (!trackEl) {
      return toPoints;
    }
    const rect = trackEl.getBoundingClientRect();
    if (rect.width <= 0) {
      return toPoints;
    }
    const ratio = Math.max(
      0,
      Math.min(1, (clientX - rect.left) / rect.width)
    );
    return sliderRatioToVipPoints(ratio, maxVipLevel);
  };

  const handleTrackPointerDown = (
    e: React.PointerEvent<HTMLDivElement>
  ): void => {
    const trackEl = trackRef.current;
    if (!trackEl) {
      return;
    }
    const rect = trackEl.getBoundingClientRect();
    const clickRatio =
      rect.width > 0
        ? Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
        : 0;
    const clickedPoints = sliderRatioToVipPoints(clickRatio, maxVipLevel);

    if (fromPoints === toPoints) {
      overlapStartXRef.current = e.clientX;
      draggingThumbRef.current = "overlap_pending";
      trackEl.setPointerCapture(e.pointerId);
      return;
    }

    const distToFrom = Math.abs(clickRatio - fromRatio);
    const distToTo = Math.abs(clickRatio - toRatio);
    const chosenThumb: "from" | "to" = distToFrom <= distToTo ? "from" : "to";
    draggingThumbRef.current = chosenThumb;
    trackEl.setPointerCapture(e.pointerId);

    if (chosenThumb === "from") {
      applyFromPoints(Math.min(clickedPoints, toPoints));
    } else {
      applyToPoints(Math.max(clickedPoints, fromPoints));
    }
  };

  const handleThumbPointerDown = (
    thumb: "from" | "to",
    e: React.PointerEvent<HTMLButtonElement>
  ): void => {
    e.stopPropagation();
    const trackEl = trackRef.current;
    if (fromPoints === toPoints) {
      overlapStartXRef.current = e.clientX;
      draggingThumbRef.current = "overlap_pending";
    } else {
      draggingThumbRef.current = thumb;
      setActiveThumb(thumb);
    }
    if (trackEl) {
      trackEl.setPointerCapture(e.pointerId);
    }
  };

  const handleTrackPointerMove = (
    e: React.PointerEvent<HTMLDivElement>
  ): void => {
    const mode = draggingThumbRef.current;
    if (!mode) {
      return;
    }

    if (mode === "overlap_pending") {
      const dx = e.clientX - overlapStartXRef.current;
      if (Math.abs(dx) < 2) {
        return;
      }
      draggingThumbRef.current = dx < 0 ? "from" : "to";
    }

    const nextPts = computePointsFromClientX(e.clientX);
    if (draggingThumbRef.current === "from") {
      applyFromPoints(Math.min(nextPts, toPoints));
    } else if (draggingThumbRef.current === "to") {
      applyToPoints(Math.max(nextPts, fromPoints));
    }
  };

  const handleTrackPointerUp = (
    e: React.PointerEvent<HTMLDivElement>
  ): void => {
    if (draggingThumbRef.current !== null) {
      draggingThumbRef.current = null;
      const trackEl = trackRef.current;
      if (trackEl && trackEl.hasPointerCapture(e.pointerId)) {
        trackEl.releasePointerCapture(e.pointerId);
      }
    }
  };

  const handleTickClick = (levelPoints: number): void => {
    if (levelPoints < fromPoints) {
      applyFromPoints(levelPoints);
    } else {
      applyToPoints(levelPoints);
    }
  };

  return (
    <div
      data-testid="vip-and-shops-calculator"
      className="space-y-4 pb-8"
    >
      {/* Header with Reference Modal & Reset */}
      <CalculatorToolHeader
        code={tool.code}
        title={tool.title[locale]}
        actions={
          <>
            <CalculatorInfoPopover
              triggerTestId="open-vip-table-modal"
              title={
                locale === "vi"
                  ? "Bảng Tra Cứu Toàn Tập VIP 0–20 & Tỷ Giá Khối Vàng (Meta.bytes)"
                  : "Complete VIP 0–20 Reference Table & Gold Brick Rate (Meta.bytes)"
              }
              locale={locale}
              triggerLabel={
                locale === "vi"
                  ? "Xem bảng chuẩn dữ liệu VIP 0–20 từ Game Cache"
                  : "View VIP 0–20 reference table from Game Cache"
              }
            >
              <div className="space-y-4">
                <div className="rounded-xl bg-amber-500/10 p-3 text-sm leading-relaxed text-foreground/90">
                  {locale === "vi" ? (
                    <>
                      <strong>Chuẩn dữ liệu Game Cache (Meta.bytes):</strong>{" "}
                      Các cấp <span className="font-mono">VIP 0 ➔ VIP 16</span>{" "}
                      (<span className="font-mono">vip_limit = 0</span>) luôn
                      hiển thị công khai trên thanh tiến trình (tối đa{" "}
                      <span className="font-mono">300,000</span> Điểm VIP). Các
                      cấp <span className="font-mono">VIP 17 ➔ VIP 20</span> là
                      mốc mở rộng khi đạt từ VIP 15 trở lên (tối đa{" "}
                      <span className="font-mono">3,000,000</span> Điểm VIP). Tỷ
                      giá quy đổi chuẩn:{" "}
                      <span className="font-mono">$1.00 = 6</span> Điểm VIP ={" "}
                      <span className="font-mono">24,000</span> VNĐ Khối Vàng (
                      <span className="font-mono">1</span> Điểm VIP ={" "}
                      <span className="font-mono">4,000</span> VNĐ).
                    </>
                  ) : (
                    <>
                      <strong>Game Cache SSoT (Meta.bytes):</strong> Tiers{" "}
                      <span className="font-mono">VIP 0 ➔ VIP 16</span> (
                      <span className="font-mono">vip_limit = 0</span>) are
                      always visible on the standard progression bar (up to{" "}
                      <span className="font-mono">300,000</span> VIP Points).
                      Tiers <span className="font-mono">VIP 17 ➔ VIP 20</span>{" "}
                      unlock progressively starting at VIP 15 (up to{" "}
                      <span className="font-mono">3,000,000</span> VIP Points).
                      Standard conversion rate:{" "}
                      <span className="font-mono">$1.00 = 6</span> VIP Points ={" "}
                      <span className="font-mono">24,000</span> VND Gold Bricks
                      (<span className="font-mono">1</span> VIP Point ={" "}
                      <span className="font-mono">4,000</span> VND).
                    </>
                  )}
                </div>

                <div className="-mx-1 overflow-x-auto">
                  <table className="w-full min-w-[600px] border-collapse text-left text-sm">
                    <thead>
                      <tr className="border-b border-border/70 bg-muted/40 text-xs font-sans font-semibold uppercase tracking-wide text-muted-foreground">
                        <th className="py-2 px-3">VIP</th>
                        <th className="py-2 px-3 text-right">
                          {locale === "vi" ? "Điểm Tích Lũy" : "Cumulative Pts"}
                        </th>
                        <th className="py-2 px-3 text-right">
                          {locale === "vi" ? "Quy Đổi USD" : "USD Equiv."}
                        </th>
                        <th className="py-2 px-3">
                          {locale === "vi"
                            ? "Quà Miễn Phí Mỗi Ngày (vip_free)"
                            : "Daily Free Chest (vip_free)"}
                        </th>
                        <th className="py-2 px-3">
                          {locale === "vi"
                            ? "Đặc Quyền Trọng Tâm"
                            : "Key Privilege"}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50 font-sans tabular-nums">
                      {VIP_LEVEL_TABLE.map((lvl) => (
                        <tr
                          key={lvl.level}
                          className="transition-colors hover:bg-amber-500/[0.04]"
                        >
                          <td className="py-2 px-3 font-bold text-foreground">
                            VIP <span className="font-mono">{lvl.level}</span>
                          </td>
                          <td className="py-2 px-3 text-right font-bold text-amber-600 dark:text-amber-400">
                            <span
                              className="font-mono"
                              title={formatExactNumber(lvl.cumulativePoints)}
                            >
                              {formatExactNumber(lvl.cumulativePoints)}
                            </span>
                          </td>
                          <td className="py-2 px-3 text-right text-foreground">
                            <span className="font-mono">
                              ${formatCompactNumber(lvl.cumulativeUsd)}
                            </span>
                          </td>
                          <td className="py-2 px-3 text-xs text-foreground">
                            {locale === "vi"
                              ? lvl.dailyFreeSummaryVi
                              : lvl.dailyFreeSummaryEn}
                          </td>
                          <td className="py-2 px-3 text-xs text-muted-foreground">
                            {
                              (locale === "vi"
                                ? lvl.keyPerksVi
                                : lvl.keyPerksEn)[0]
                            }
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CalculatorInfoPopover>

            <button
              type="button"
              data-testid="reset-vip-and-shops"
              onClick={handleReset}
              aria-label={locale === "vi" ? "Đặt lại" : "Reset"}
              className={CALC_MD3.iconButton}
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </>
        }
      />

      {/* ZONE 1 (col-span-12 Full-Width): Dual-Node VIP Level & Points Progression Bar */}
      <section
        data-testid="vip-progression-bar-section"
        className={cn(CALC_MD3.surfaceCard, "w-full space-y-5 p-4 sm:p-5")}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h2 className={CALC_MD3.sectionTitle}>
              {locale === "vi"
                ? "Thanh Tiến Trình Cấp & Điểm VIP (Khởi Đầu ➔ Mục Tiêu)"
                : "VIP Level & Point Progression Bar (Start ➔ Target)"}
            </h2>
            <p className="font-sans text-xs text-muted-foreground">
              {locale === "vi"
                ? "Kéo trực tiếp 2 mốc trên thanh hoặc dùng nút +/- ở 2 đầu đoạn thẳng để chọn chính xác đến từng cấp VIP và từng điểm VIP lẻ."
                : "Drag the 2 nodes along the track or use the +/- controls at both ends to adjust by VIP level or individual VIP points."}
            </p>
          </div>

          <button
            type="button"
            data-testid="vip-extended-toggle-btn"
            onClick={handleToggleExtendedVip}
            className={cn(
              CALC_MD3.chipButton,
              "px-3.5 text-xs",
              showExtendedVip
                ? CALC_MD3.tileSelected
                : cn(
                    CALC_MD3.tonalTile,
                    "text-muted-foreground hover:text-foreground"
                  )
            )}
          >
            <Crown className="h-4 w-4 text-amber-500" />
            <span>
              {showExtendedVip
                ? locale === "vi"
                  ? "Đang mở rộng: VIP 1–20 (3,000,000 Điểm)"
                  : "Extended Range: VIP 1–20 (3,000,000 Pts)"
                : locale === "vi"
                ? "Chuẩn Game: Level 1–16 • Bật VIP 17–20"
                : "Standard: Level 1–16 • Show VIP 17–20"}
            </span>
          </button>
        </div>

        {/* Dual Node Status Callouts (Start Node vs Target Node) */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {/* Start Node Callout ("Hiện tại / Khởi đầu") */}
          <div
            className={cn(
              CALC_MD3.tonalGroup,
              "flex items-center justify-between gap-3 bg-sky-500/10 dark:bg-sky-500/15"
            )}
          >
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-500 font-mono text-xs font-black text-slate-950">
                A
              </span>
              <div>
                <span className={cn(CALC_MD3.eyebrow, "text-sky-700 dark:text-sky-300")}>
                  {locale === "vi"
                    ? "MỐC HIỆN TẠI (KHỞI ĐẦU)"
                    : "CURRENT NODE (START)"}
                </span>
                <div className="flex items-baseline gap-2">
                  <span
                    data-testid="from-vip-badge"
                    className="font-display text-lg font-bold text-foreground"
                  >
                    VIP {vipResult.fromVip.level}
                  </span>
                  <span className="font-mono text-sm font-semibold text-sky-700 dark:text-sky-300">
                    {formatExactNumber(vipResult.fromPoints)}
                  </span>
                  <span className="font-sans text-xs text-muted-foreground">
                    {locale === "vi" ? "Điểm VIP" : "VIP Pts"}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <span className="font-sans text-xs text-muted-foreground">
                {locale === "vi" ? "Mốc cấp hiện tại" : "Tier threshold"}
              </span>
              <p className="font-mono text-xs font-semibold text-foreground">
                {formatExactNumber(vipResult.fromVip.cumulativePoints)} pts
              </p>
            </div>
          </div>

          {/* Target Node Callout ("Mục tiêu") */}
          <div
            className={cn(
              CALC_MD3.tonalGroup,
              "flex items-center justify-between gap-3 bg-amber-500/12 dark:bg-amber-500/15"
            )}
          >
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500 font-mono text-xs font-black text-slate-950">
                B
              </span>
              <div>
                <span className={cn(CALC_MD3.eyebrow, "text-amber-700 dark:text-amber-300")}>
                  {locale === "vi"
                    ? "MỐC MỤC TIÊU (ĐÍCH ĐẾN)"
                    : "TARGET NODE (GOAL)"}
                </span>
                <div className="flex items-baseline gap-2">
                  <span
                    data-testid="to-vip-badge"
                    className="font-display text-lg font-bold text-amber-600 dark:text-amber-400"
                  >
                    VIP {vipResult.toVip.level}
                  </span>
                  <span className="font-mono text-sm font-semibold text-amber-700 dark:text-amber-300">
                    {formatExactNumber(vipResult.toPoints)}
                  </span>
                  <span className="font-sans text-xs text-muted-foreground">
                    {locale === "vi" ? "Điểm VIP" : "VIP Pts"}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <span className="font-sans text-xs text-muted-foreground">
                {locale === "vi" ? "Điểm cần thêm" : "Points needed"}
              </span>
              <p className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400">
                +{formatExactNumber(vipResult.pointsNeeded)} pts
              </p>
            </div>
          </div>
        </div>

        {/* Full-Width Interactive Piecewise-Linear VIP Track (Level 1-16 / 1-20) */}
        <div className={cn(CALC_MD3.tonalGroup, "space-y-4 px-4 pt-9 pb-4 sm:px-6")}>
          <div
            ref={trackRef}
            data-testid="vip-dual-range-bar"
            onPointerDown={handleTrackPointerDown}
            onPointerMove={handleTrackPointerMove}
            onPointerUp={handleTrackPointerUp}
            onPointerCancel={handleTrackPointerUp}
            className="relative flex h-12 w-full cursor-pointer select-none touch-none items-center"
          >
            {/* Base Track Line */}
            <div className="relative h-3.5 w-full rounded-full bg-background/85 ring-1 ring-foreground/10">
              {/* Highlighted Active Segment between Start and Target */}
              <div
                style={{
                  left: `${fromRatio * 100}%`,
                  width: `${Math.max(0, (toRatio - fromRatio) * 100)}%`,
                }}
                className="absolute top-0 bottom-0 rounded-full bg-gradient-to-r from-sky-500 via-amber-500 to-amber-400"
              />

              {/* Tick Notches along the rail */}
              {levelTicks.map((tick) => {
                const tickRatio = tick.level / maxVipLevel;
                const isInActiveSpan =
                  tick.cumulativePoints >= vipResult.fromPoints &&
                  tick.cumulativePoints <= vipResult.toPoints;
                return (
                  <span
                    key={tick.level}
                    style={{ left: `${tickRatio * 100}%` }}
                    className={cn(
                      "pointer-events-none absolute top-1/2 h-2.5 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors",
                      isInActiveSpan
                        ? "bg-slate-950/70 dark:bg-white/90"
                        : "bg-muted-foreground/40"
                    )}
                  />
                );
              })}
            </div>

            {/* Draggable Thumb A: Start / Current Node ("Hiện tại") */}
            <button
              type="button"
              role="slider"
              data-testid="vip-slider-thumb-from"
              aria-label={
                locale === "vi"
                  ? "Kéo mốc VIP hiện tại (Khởi đầu)"
                  : "Drag current VIP start node"
              }
              aria-valuemin={0}
              aria-valuemax={vipResult.toPoints}
              aria-valuenow={vipResult.fromPoints}
              onPointerDown={(e) => handleThumbPointerDown("from", e)}
              onKeyDown={(e) => {
                if (e.key === "ArrowLeft") {
                  e.preventDefault();
                  applyFromPoints(vipResult.fromPoints - (e.shiftKey ? 100 : 1));
                } else if (e.key === "ArrowRight") {
                  e.preventDefault();
                  applyFromPoints(
                    Math.min(
                      vipResult.toPoints,
                      vipResult.fromPoints + (e.shiftKey ? 100 : 1)
                    )
                  );
                }
              }}
              style={{ left: `${fromRatio * 100}%` }}
              className={cn(
                "group absolute top-1/2 flex min-h-[44px] min-w-[44px] -translate-x-1/2 -translate-y-1/2 cursor-grab items-center justify-center focus-visible:outline-none active:cursor-grabbing",
                activeThumb === "from" ? "z-30" : "z-20"
              )}
            >
              {/* Floating Label Above Start Thumb */}
              <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-sky-500 px-2 py-0.5 font-sans text-xs font-bold text-slate-950 shadow-sm">
                {locale === "vi" ? "Hiện tại:" : "Start:"}{" "}
                <span className="font-mono">VIP {vipResult.fromVip.level}</span>
              </span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-500 font-mono text-xs font-black text-slate-950 shadow-md ring-2 ring-white transition-transform group-hover:scale-110">
                A
              </span>
            </button>

            {/* Draggable Thumb B: Target Node ("Mục tiêu") */}
            <button
              type="button"
              role="slider"
              data-testid="vip-slider-thumb-to"
              aria-label={
                locale === "vi"
                  ? "Kéo mốc VIP mục tiêu"
                  : "Drag target VIP node"
              }
              aria-valuemin={vipResult.fromPoints}
              aria-valuemax={maxAllowedPoints}
              aria-valuenow={vipResult.toPoints}
              onPointerDown={(e) => handleThumbPointerDown("to", e)}
              onKeyDown={(e) => {
                if (e.key === "ArrowLeft") {
                  e.preventDefault();
                  applyToPoints(
                    Math.max(
                      vipResult.fromPoints,
                      vipResult.toPoints - (e.shiftKey ? 100 : 1)
                    )
                  );
                } else if (e.key === "ArrowRight") {
                  e.preventDefault();
                  applyToPoints(vipResult.toPoints + (e.shiftKey ? 100 : 1));
                }
              }}
              style={{ left: `${toRatio * 100}%` }}
              className={cn(
                "group absolute top-1/2 flex min-h-[44px] min-w-[44px] -translate-x-1/2 -translate-y-1/2 cursor-grab items-center justify-center focus-visible:outline-none active:cursor-grabbing",
                activeThumb === "to" ? "z-30" : "z-20"
              )}
            >
              {/* Floating Label Above Target Thumb */}
              <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-amber-500 px-2 py-0.5 font-sans text-xs font-bold text-slate-950 shadow-sm">
                {locale === "vi" ? "Mục tiêu:" : "Target:"}{" "}
                <span className="font-mono">VIP {vipResult.toVip.level}</span>
              </span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500 font-mono text-xs font-black text-slate-950 shadow-md ring-2 ring-white transition-transform group-hover:scale-110">
                B
              </span>
            </button>
          </div>

          {/* Level 0 .. Level 16 (or 20) Clickable Milestone Bar */}
          <div className="grid grid-cols-6 gap-1.5 sm:grid-cols-9 lg:grid-cols-17">
            {levelTicks.map((tick) => {
              const isFromLevel = vipResult.fromVip.level === tick.level;
              const isToLevel = vipResult.toVip.level === tick.level;
              const isBetween =
                tick.level > vipResult.fromVip.level &&
                tick.level < vipResult.toVip.level;

              return (
                <button
                  key={tick.level}
                  type="button"
                  data-testid={`vip-tick-${tick.level}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTickClick(tick.cumulativePoints);
                  }}
                  title={`VIP ${tick.level}: ${formatExactNumber(
                    tick.cumulativePoints
                  )} VIP Points`}
                  className={cn(
                    "flex min-h-[44px] flex-col items-center justify-center rounded-lg px-1 py-1 text-center transition-colors",
                    isToLevel
                      ? "bg-amber-500 text-slate-950 font-bold"
                      : isFromLevel
                      ? "bg-sky-500 text-slate-950 font-bold"
                      : isBetween
                      ? "bg-amber-500/20 text-foreground"
                      : "bg-background/60 text-muted-foreground hover:bg-background hover:text-foreground"
                  )}
                >
                  <span className="font-mono text-xs font-bold">
                    {tick.level === 0 ? "VIP 0" : `Lv.${tick.level}`}
                  </span>
                  <span className="font-mono text-xs opacity-85">
                    {formatCompactNumber(tick.cumulativePoints)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Left & Right Endpoint Stepper Controls (Level +/- & Exact VIP Points +/-) */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* LEFT END CONTROLS: Start Node ("Hiện tại / Khởi đầu") */}
          <div className={cn(CALC_MD3.tonalGroup, "space-y-3")}>
            <div className="flex items-center justify-between gap-2">
              <span className={CALC_MD3.eyebrow}>
                {locale === "vi"
                  ? "ĐẦU TRÁI • ĐIỀU CHỈNH MỐC HIỆN TẠI (KHỞI ĐẦU)"
                  : "LEFT END • ADJUST CURRENT VIP & POINTS (START)"}
              </span>
              <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400">
                VIP {vipResult.fromVip.level}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {/* Step Current VIP Level */}
              <div className="flex items-center justify-between gap-2 rounded-xl bg-background/70 p-2">
                <CalculatorStepperButton
                  direction="decrease"
                  testId="vip-from-level-minus-btn"
                  onClick={() =>
                    applyFromPoints(
                      stepVipLevel(vipResult.fromPoints, -1, maxVipLevel)
                    )
                  }
                  disabled={vipResult.fromPoints <= 0}
                  ariaLabel={
                    locale === "vi"
                      ? "Giảm cấp VIP hiện tại"
                      : "Decrease current VIP level"
                  }
                />
                <div className="text-center">
                  <p className="font-sans text-xs text-muted-foreground">
                    {locale === "vi" ? "Cấp VIP" : "VIP Level"}
                  </p>
                  <p className="font-mono text-sm font-bold text-foreground">
                    VIP {vipResult.fromVip.level}
                  </p>
                </div>
                <CalculatorStepperButton
                  direction="increase"
                  testId="vip-from-level-plus-btn"
                  onClick={() =>
                    applyFromPoints(
                      stepVipLevel(vipResult.fromPoints, 1, maxVipLevel)
                    )
                  }
                  disabled={vipResult.fromPoints >= maxAllowedPoints}
                  ariaLabel={
                    locale === "vi"
                      ? "Tăng cấp VIP hiện tại"
                      : "Increase current VIP level"
                  }
                />
              </div>

              {/* Step Current VIP Points (+/- 1 Point + Direct Input) */}
              <div className="flex items-center justify-between gap-1.5 rounded-xl bg-background/70 p-2">
                <CalculatorStepperButton
                  direction="decrease"
                  testId="vip-from-points-minus-btn"
                  onClick={() => applyFromPoints(vipResult.fromPoints - 1)}
                  disabled={vipResult.fromPoints <= 0}
                  ariaLabel={
                    locale === "vi"
                      ? "Giảm 1 Điểm VIP hiện tại"
                      : "Decrease current VIP points by 1"
                  }
                />
                <div className="min-w-0 flex-1">
                  <Input
                    type="text"
                    inputMode="numeric"
                    data-testid="vip-from-points-input"
                    aria-label={
                      locale === "vi"
                        ? "Điểm VIP khởi đầu"
                        : "Starting VIP points"
                    }
                    value={fromPointsInput}
                    onChange={handleFromInputChange}
                    className={cn(CALC_MD3.dataInput, "w-full text-center")}
                  />
                </div>
                <CalculatorStepperButton
                  direction="increase"
                  testId="vip-from-points-plus-btn"
                  onClick={() => applyFromPoints(vipResult.fromPoints + 1)}
                  disabled={vipResult.fromPoints >= maxAllowedPoints}
                  ariaLabel={
                    locale === "vi"
                      ? "Tăng 1 Điểm VIP hiện tại"
                      : "Increase current VIP points by 1"
                  }
                />
              </div>
            </div>
          </div>

          {/* RIGHT END CONTROLS: Target Node ("Mục tiêu") */}
          <div className={cn(CALC_MD3.tonalGroup, "space-y-3")}>
            <div className="flex items-center justify-between gap-2">
              <span className={CALC_MD3.eyebrow}>
                {locale === "vi"
                  ? "ĐẦU PHẢI • ĐIỀU CHỈNH MỐC MỤC TIÊU (ĐÍCH ĐẾN)"
                  : "RIGHT END • ADJUST TARGET VIP & POINTS (GOAL)"}
              </span>
              <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400">
                VIP {vipResult.toVip.level}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {/* Step Target VIP Level */}
              <div className="flex items-center justify-between gap-2 rounded-xl bg-background/70 p-2">
                <CalculatorStepperButton
                  direction="decrease"
                  testId="vip-to-level-minus-btn"
                  onClick={() =>
                    applyToPoints(
                      stepVipLevel(vipResult.toPoints, -1, maxVipLevel)
                    )
                  }
                  disabled={vipResult.toPoints <= 0}
                  ariaLabel={
                    locale === "vi"
                      ? "Giảm cấp VIP mục tiêu"
                      : "Decrease target VIP level"
                  }
                />
                <div className="text-center">
                  <p className="font-sans text-xs text-muted-foreground">
                    {locale === "vi" ? "Cấp VIP" : "VIP Level"}
                  </p>
                  <p className="font-mono text-sm font-bold text-amber-600 dark:text-amber-400">
                    VIP {vipResult.toVip.level}
                  </p>
                </div>
                <CalculatorStepperButton
                  direction="increase"
                  testId="vip-to-level-plus-btn"
                  onClick={() =>
                    applyToPoints(
                      stepVipLevel(vipResult.toPoints, 1, maxVipLevel)
                    )
                  }
                  disabled={vipResult.toPoints >= maxAllowedPoints}
                  ariaLabel={
                    locale === "vi"
                      ? "Tăng cấp VIP mục tiêu"
                      : "Increase target VIP level"
                  }
                />
              </div>

              {/* Step Target VIP Points (+/- 1 Point + Direct Input) */}
              <div className="flex items-center justify-between gap-1.5 rounded-xl bg-background/70 p-2">
                <CalculatorStepperButton
                  direction="decrease"
                  testId="vip-to-points-minus-btn"
                  onClick={() => applyToPoints(vipResult.toPoints - 1)}
                  disabled={vipResult.toPoints <= 0}
                  ariaLabel={
                    locale === "vi"
                      ? "Giảm 1 Điểm VIP mục tiêu"
                      : "Decrease target VIP points by 1"
                  }
                />
                <div className="min-w-0 flex-1">
                  <Input
                    type="text"
                    inputMode="numeric"
                    data-testid="vip-to-points-input"
                    aria-label={
                      locale === "vi" ? "Điểm VIP mục tiêu" : "Target VIP points"
                    }
                    value={toPointsInput}
                    onChange={handleToInputChange}
                    className={cn(CALC_MD3.dataInput, "w-full text-center")}
                  />
                </div>
                <CalculatorStepperButton
                  direction="increase"
                  testId="vip-to-points-plus-btn"
                  onClick={() => applyToPoints(vipResult.toPoints + 1)}
                  disabled={vipResult.toPoints >= maxAllowedPoints}
                  ariaLabel={
                    locale === "vi"
                      ? "Tăng 1 Điểm VIP mục tiêu"
                      : "Increase target VIP points by 1"
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ZONE 2 (col-span-12): Real Game Cache Privileges Comparison & Unlocked Perks */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-start">
        {/* Left 7/12: Cumulative Attributes & Mechanics Comparison (VIP from -> VIP to) */}
        <section className={cn(CALC_MD3.surfaceCard, "space-y-4 p-4 lg:col-span-7")}>
          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className={CALC_MD3.sectionTitle}>
                {locale === "vi"
                  ? `So Sánh Đặc Quyền Cộng Dồn (VIP ${vipResult.fromVip.level} ➔ VIP ${vipResult.toVip.level})`
                  : `Cumulative Privilege Comparison (VIP ${vipResult.fromVip.level} ➔ VIP ${vipResult.toVip.level})`}
              </h2>
              <p className="font-sans text-xs text-muted-foreground">
                {locale === "vi"
                  ? "Trích xuất 100% từ bảng vip & attribute trong Meta.bytes"
                  : "100% extracted from vip & attribute tables in Meta.bytes"}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {(
                [
                  {
                    id: "all",
                    labelVi: "Tất cả",
                    labelEn: "All Active",
                  },
                  {
                    id: "increased",
                    labelVi: "Tăng thêm (+Δ)",
                    labelEn: "Increased (+Δ)",
                  },
                  {
                    id: "newly_unlocked",
                    labelVi: "Mới mở khóa",
                    labelEn: "Newly Unlocked",
                  },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setStatFilter(tab.id)}
                  className={cn(
                    CALC_MD3.chipButton,
                    "px-3 text-xs",
                    statFilter === tab.id
                      ? CALC_MD3.tileSelected
                      : cn(
                          CALC_MD3.tonalTile,
                          "text-muted-foreground hover:text-foreground"
                        )
                  )}
                >
                  {locale === "vi" ? tab.labelVi : tab.labelEn}
                </button>
              ))}
            </div>
          </div>

          <div
            data-testid="vip-cumulative-stats-list"
            className={CALC_MD3.dividedList}
          >
            {filteredStatRows.length === 0 ? (
              <div className="p-4 text-center font-sans text-sm text-muted-foreground">
                {locale === "vi"
                  ? "Không có chỉ số thay đổi trong bộ lọc này. Hãy chọn cấp VIP mục tiêu cao hơn."
                  : "No matching attribute changes for this filter. Try selecting a higher target VIP level."}
              </div>
            ) : (
              filteredStatRows.map((row) => {
                const attrName =
                  locale === "vi"
                    ? row.attribute.nameVi
                    : row.attribute.nameEn;
                const fromVal =
                  locale === "vi" ? row.fromFormattedVi : row.fromFormattedEn;
                const toVal =
                  locale === "vi" ? row.toFormattedVi : row.toFormattedEn;
                const deltaVal =
                  locale === "vi" ? row.deltaFormattedVi : row.deltaFormattedEn;

                return (
                  <div
                    key={row.attribute.id}
                    className="flex flex-col gap-2 p-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="space-y-0.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-sans text-sm font-semibold text-foreground">
                          {attrName}
                        </span>
                        {row.isNewlyUnlocked ? (
                          <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/15 px-2 py-0.5 font-sans text-xs font-bold text-emerald-600 dark:text-emerald-400">
                            <Sparkles className="h-3 w-3" />
                            <span>
                              {locale === "vi"
                                ? `Mới mở (VIP ${row.attribute.unlockLevel})`
                                : `New (VIP ${row.attribute.unlockLevel})`}
                            </span>
                          </span>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      {row.attribute.valueType === "unlock" ? (
                        <span
                          className={cn(
                            "rounded-lg px-2.5 py-1 font-sans text-xs font-bold",
                            row.isNewlyUnlocked
                              ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
                              : "bg-muted text-muted-foreground"
                          )}
                        >
                          {toVal}
                        </span>
                      ) : (
                        <>
                          <span className="font-mono text-xs text-muted-foreground">
                            {fromVal}
                          </span>
                          <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="font-mono text-sm font-bold text-foreground">
                            {toVal}
                          </span>
                          {row.isIncreased ? (
                            <span className="rounded-md bg-amber-500/20 px-2 py-0.5 font-mono text-xs font-bold text-amber-700 dark:text-amber-300">
                              {deltaVal}
                            </span>
                          ) : null}
                        </>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* Right 5/12: Per-Level Unlocks, Daily Free Chest (vip_free), VIP Shop (shop_goods) & VIP Pack (vip_exchange) */}
        <section className={cn(CALC_MD3.surfaceCard, "space-y-4 p-4 lg:col-span-5")}>
          <div>
            <h2 className={CALC_MD3.sectionTitle}>
              {locale === "vi"
                ? `Chi Tiết Cấp Mở Khóa (VIP ${vipResult.fromVip.level} ➔ VIP ${vipResult.toVip.level})`
                : `Unlocked Tier Breakdown (VIP ${vipResult.fromVip.level} ➔ VIP ${vipResult.toVip.level})`}
            </h2>
            <p className="font-sans text-xs text-muted-foreground">
              {locale === "vi"
                ? "Quà miễn phí hàng ngày (vip_free), Tiệm VIP (shop_goods) & Gói độc quyền"
                : "Daily free chests (vip_free), VIP Shop unlocks & Exclusive VIP Packs"}
            </p>
          </div>

          <div
            data-testid="vip-unlocked-perks-list"
            className={cn(CALC_MD3.dividedList, "max-h-[620px] overflow-y-auto")}
          >
            {(vipResult.newlyUnlockedLevels.length > 0
              ? vipResult.newlyUnlockedLevels
              : [vipResult.toVip]
            ).map((lvl) => (
              <div key={lvl.level} className="space-y-2.5 p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="rounded-lg bg-amber-500/20 px-2.5 py-0.5 font-display text-xs font-bold text-amber-600 dark:text-amber-400">
                      VIP {lvl.level}
                    </span>
                    {lvl.breakpointBadgeVi ? (
                      <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/15 px-2 py-0.5 font-sans text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        <Sparkles className="h-3 w-3" />
                        <span>
                          {locale === "vi"
                            ? lvl.breakpointBadgeVi
                            : lvl.breakpointBadgeEn}
                        </span>
                      </span>
                    ) : null}
                  </div>
                  <span
                    className="font-mono text-xs font-semibold text-muted-foreground"
                    title={formatExactNumber(lvl.cumulativePoints)}
                  >
                    {formatExactNumber(lvl.cumulativePoints)} pts
                  </span>
                </div>

                {/* Key Perks */}
                <ul className="list-disc space-y-1 pl-5 font-sans text-xs text-foreground">
                  {(locale === "vi" ? lvl.keyPerksVi : lvl.keyPerksEn).map(
                    (perk) => (
                      <li key={perk}>{perk}</li>
                    )
                  )}
                </ul>

                {/* Daily Free Chest & VIP Shop Unlocks */}
                <div className="space-y-1.5 rounded-xl bg-background/65 p-2.5 text-xs">
                  <div className="flex items-start gap-2">
                    <Gift className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                    <p className="font-sans text-muted-foreground">
                      <strong className="text-foreground">
                        {locale === "vi"
                          ? "Quà miễn phí mỗi ngày: "
                          : "Daily Free Chest: "}
                      </strong>
                      {locale === "vi"
                        ? lvl.dailyFreeSummaryVi
                        : lvl.dailyFreeSummaryEn}
                    </p>
                  </div>

                  <div className="flex items-start gap-2">
                    <ShoppingBag className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sky-500" />
                    <p className="font-sans text-muted-foreground">
                      <strong className="text-foreground">
                        {locale === "vi" ? "Tiệm VIP: " : "VIP Shop: "}
                      </strong>
                      {locale === "vi"
                        ? lvl.vipShopHighlightsVi
                        : lvl.vipShopHighlightsEn}
                    </p>
                  </div>

                  {lvl.vipPack ? (
                    <div className="flex items-start gap-2">
                      <TrendingUp className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />
                      <p className="font-sans text-muted-foreground">
                        <strong className="text-foreground">
                          {locale === "vi"
                            ? "Gói độc quyền ("
                            : "Exclusive Pack ("}
                          <span className="font-mono">
                            ${lvl.vipPack.priceUsd}
                          </span>
                          {"): "}
                        </strong>
                        {locale === "vi"
                          ? lvl.vipPack.summaryVi
                          : lvl.vipPack.summaryEn}
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ZONE 4 (col-span-12 at Bottom): Tính Toán Nguyên Liệu (3 Core Resource Cards) */}
      <section
        data-testid="vip-summary-card"
        className={cn(CALC_MD3.surfaceCard, "w-full space-y-4 p-4 sm:p-5")}
      >
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <GameAssetFrame
              src={VIP_POINT_ICON_PATH}
              alt="VIP Points"
              size="sm"
              rarity="legendary"
            />
            <div>
              <h2 className={CALC_MD3.sectionTitle}>
                {locale === "vi"
                  ? "Tính Toán Nguyên Liệu Cần Thiết (Điểm VIP • USD • Khối Vàng)"
                  : "Required Resources Calculation (VIP Points • USD • Gold Bricks)"}
              </h2>
              <p className="font-sans text-xs text-muted-foreground">
                {locale === "vi"
                  ? `Tỷ giá chuẩn: $${1} USD = ${VIP_POINTS_PER_USD} Điểm VIP = ${formatExactNumber(
                      VIP_GOLD_BRICK_VND_PER_USD
                    )} VNĐ (1 Điểm VIP = ${formatExactNumber(
                      VIP_GOLD_BRICK_VND_PER_POINT
                    )} VNĐ)`
                  : `Standard rate: $1.00 USD = ${VIP_POINTS_PER_USD} VIP Points • Optimal pack: ${VIP_OPTIMAL_PACK_POINTS} VIP Pts / $${VIP_OPTIMAL_PACK_USD}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-sans text-xs text-muted-foreground">
              {locale === "vi" ? "Tiến độ đạt mục tiêu:" : "Target progress:"}
            </span>
            <span className="rounded-lg bg-amber-500/20 px-2.5 py-1 font-mono text-xs font-bold text-amber-600 dark:text-amber-400">
              {vipResult.progressPercent}%
            </span>
          </div>
        </div>

        {/* 3 Core Resource Cards: Missing VIP Points | Equivalent USD | Equivalent Regional Gold Bricks */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {/* Card 1: Điểm VIP Còn Thiếu */}
          <div
            data-testid="vip-points-needed-card"
            className={cn(
              CALC_MD3.tonalGroup,
              "flex flex-col justify-between space-y-2 p-4",
              vipResult.pointsNeeded === 0
                ? "bg-emerald-500/12"
                : "bg-amber-500/12"
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <span className={CALC_MD3.eyebrow}>
                {locale === "vi"
                  ? "1. ĐIỂM VIP CÒN THIẾU"
                  : "1. MISSING VIP POINTS"}
              </span>
              <Crown className="h-4 w-4 text-amber-500" />
            </div>

            <div title={formatExactNumber(vipResult.pointsNeeded)}>
              <CalculatorMetricValue
                testId="vip-points-needed-value"
                value={formatExactNumber(vipResult.pointsNeeded)}
                unit={locale === "vi" ? "Điểm VIP" : "VIP Pts"}
                toneClassName={
                  vipResult.pointsNeeded === 0
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-amber-600 dark:text-amber-400"
                }
              />
            </div>

            <p className="font-sans text-xs text-muted-foreground">
              {locale === "vi" ? "Khoảng cách: " : "Span: "}
              <span className="font-mono font-semibold text-foreground">
                {formatExactNumber(vipResult.fromPoints)}
              </span>{" "}
              <span>➔</span>{" "}
              <span className="font-mono font-semibold text-foreground">
                {formatExactNumber(vipResult.toPoints)}
              </span>
            </p>
          </div>

          {/* Card 2: Tương Đương USD */}
          <div
            data-testid="vip-usd-needed-card"
            className={cn(
              CALC_MD3.tonalGroup,
              "flex flex-col justify-between space-y-2 p-4"
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <span className={CALC_MD3.eyebrow}>
                {locale === "vi"
                  ? "2. TƯƠNG ĐƯƠNG USD"
                  : "2. EQUIVALENT USD SPEND"}
              </span>
              <DollarSign className="h-4 w-4 text-sky-500" />
            </div>

            <p
              data-testid="vip-usd-needed-value"
              title={formatExactNumber(vipResult.equivalentUsdNeeded)}
              className="font-mono text-2xl font-black tabular-nums text-foreground"
            >
              ${formatExactNumber(vipResult.equivalentUsdNeeded)}
            </p>

            <p className="font-sans text-xs text-muted-foreground">
              {locale === "vi" ? (
                <>
                  Theo gói tối ưu{" "}
                  <span className="font-mono">${VIP_OPTIMAL_PACK_USD}</span> (
                  <span className="font-mono">{VIP_OPTIMAL_PACK_POINTS}</span>{" "}
                  điểm):{" "}
                  <span className="font-mono font-semibold text-foreground">
                    ~{vipResult.equivalentGoldBrick.optimalPacksCount}
                  </span>{" "}
                  gói
                </>
              ) : (
                <>
                  Via optimal{" "}
                  <span className="font-mono">${VIP_OPTIMAL_PACK_USD}</span>{" "}
                  pack (
                  <span className="font-mono">{VIP_OPTIMAL_PACK_POINTS}</span>{" "}
                  pts):{" "}
                  <span className="font-mono font-semibold text-foreground">
                    ~{vipResult.equivalentGoldBrick.optimalPacksCount}
                  </span>{" "}
                  packs
                </>
              )}
            </p>
          </div>

          {/* Card 3: Tương Đương Khối Vàng (VNĐ cho VI, tiền tệ quốc gia tương ứng cho ngôn ngữ khác) */}
          <div
            data-testid="vip-goldbrick-needed-card"
            className={cn(
              CALC_MD3.tonalGroup,
              "flex flex-col justify-between space-y-2 bg-amber-500/10 p-4 dark:bg-amber-500/15"
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <span className={CALC_MD3.eyebrow}>
                {locale === "vi"
                  ? "3. TƯƠNG ĐƯƠNG KHỐI VÀNG (VNĐ)"
                  : "3. EQUIVALENT GOLD BRICKS (USD)"}
              </span>
              <Coins className="h-4 w-4 text-amber-500" />
            </div>

            <div className="flex items-baseline gap-1.5">
              <span
                data-testid="vip-goldbrick-needed-value"
                title={formatExactNumber(vipResult.equivalentGoldBrick.amount)}
                className="font-mono text-2xl font-black tabular-nums text-amber-600 dark:text-amber-400"
              >
                {locale === "vi"
                  ? formatExactNumber(vipResult.equivalentGoldBrick.amount)
                  : `$${formatExactNumber(
                      vipResult.equivalentGoldBrick.amount
                    )}`}
              </span>
              <span className="font-sans text-sm font-bold text-amber-600 dark:text-amber-400">
                {vipResult.equivalentGoldBrick.currencyCode}
              </span>
            </div>

            <p className="font-sans text-xs text-muted-foreground">
              {locale === "vi" ? (
                <>
                  Theo gói Khối Vàng tối ưu (
                  <span className="font-mono">
                    {formatExactNumber(VIP_OPTIMAL_PACK_VND)}
                  </span>{" "}
                  VNĐ / <span className="font-mono">648</span> điểm):{" "}
                  <span className="font-mono font-semibold text-foreground">
                    {formatExactNumber(
                      vipResult.equivalentGoldBrick.optimalPackSpendAmount
                    )}
                  </span>{" "}
                  VNĐ
                </>
              ) : (
                <>
                  Via optimal Gold Brick bundle (
                  <span className="font-mono">${VIP_OPTIMAL_PACK_USD}</span> /{" "}
                  <span className="font-mono">648</span> pts):{" "}
                  <span className="font-mono font-semibold text-foreground">
                    $
                    {formatExactNumber(
                      vipResult.equivalentGoldBrick.optimalPackSpendAmount
                    )}
                  </span>{" "}
                  USD
                </>
              )}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  ChevronDown,
  RotateCcw,
  Sparkles,
  X,
} from "lucide-react";
import {
  GEAR_ENHANCE_RARITY_CONFIGS,
  GEAR_ENHANCE_RARITY_ORDER,
  GEAR_SLOTS_BY_RARITY,
  GEAR_SLOT_ORDER,
  calculateGearEnhancePlan,
  clampGearEnhanceLevel,
  type GearEnhanceRarity,
  type GearEnhanceSlotId,
} from "@/content/calculators/gear-enhance-data";
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
import { CalculatorInfoPopover } from "./calculator-info-popover";
import { GearEnhanceLevelSelector } from "./gear-enhance-level-selector";
import {
  CALC_MD3,
  CalculatorMetricValue,
  CalculatorToolHeader,
} from "./calculator-md3-primitives";

export interface GearEnhanceCalculatorProps {
  readonly zone?: CalculatorZone;
  readonly category: CalculatorCategory;
  readonly tool: CalculatorToolItem;
  readonly locale: CalculatorLocale;
}

type PickerStep = "rarity" | "slot";

const RARITY_BADGE_TONE: Readonly<Record<GearEnhanceRarity, string>> = {
  legendary:
    "bg-amber-500/15 text-amber-700 dark:text-amber-300",
  epic: "bg-purple-500/15 text-purple-700 dark:text-purple-300",
  rare: "bg-sky-500/15 text-sky-700 dark:text-sky-300",
};

export function GearEnhanceCalculator({
  tool,
  locale,
}: GearEnhanceCalculatorProps) {
  const isVi = locale === "vi";
  const [rarity, setRarity] = useState<GearEnhanceRarity>("legendary");
  const [slotId, setSlotId] = useState<GearEnhanceSlotId>("boots");
  const [fromLevel, setFromLevel] = useState<number>(0);
  const [toLevel, setToLevel] = useState<number>(40);
  const [ownedRunesInput, setOwnedRunesInput] = useState<string>("0");
  const [ownedRubyInput, setOwnedRubyInput] = useState<string>("0");

  const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false);
  const [pickerStep, setPickerStep] = useState<PickerStep>("rarity");
  const pickerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isPickerOpen) return;
    const handlePointerDown = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setIsPickerOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsPickerOpen(false);
      }
    };
    document.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPickerOpen]);

  const parsedOwnedRunes = useMemo(
    () => parseCompactNumberInput(ownedRunesInput),
    [ownedRunesInput]
  );
  const parsedOwnedRuby = useMemo(
    () => parseCompactNumberInput(ownedRubyInput),
    [ownedRubyInput]
  );

  const result = useMemo(
    () =>
      calculateGearEnhancePlan({
        rarity,
        slotId,
        fromLevel,
        toLevel,
        ownedRunes: parsedOwnedRunes,
        ownedRuby: parsedOwnedRuby,
      }),
    [rarity, slotId, fromLevel, toLevel, parsedOwnedRunes, parsedOwnedRuby]
  );

  const handleTogglePicker = () => {
    setIsPickerOpen((prev) => {
      const next = !prev;
      if (next) {
        setPickerStep("rarity");
      }
      return next;
    });
  };

  const handleSelectRarity = (nextRarity: GearEnhanceRarity) => {
    const prevMax = GEAR_ENHANCE_RARITY_CONFIGS[rarity].maxLevel;
    const nextMax = GEAR_ENHANCE_RARITY_CONFIGS[nextRarity].maxLevel;
    setRarity(nextRarity);
    setFromLevel((prevFrom) => clampGearEnhanceLevel(prevFrom, nextRarity));
    setToLevel((prevTo) =>
      prevTo >= prevMax ? nextMax : clampGearEnhanceLevel(prevTo, nextRarity)
    );
    setPickerStep("slot");
  };

  const handleSelectSlot = (nextSlotId: GearEnhanceSlotId) => {
    setSlotId(nextSlotId);
    setIsPickerOpen(false);
  };

  const handleResetDefault = () => {
    setRarity("legendary");
    setSlotId("boots");
    setFromLevel(0);
    setToLevel(40);
    setOwnedRunesInput("0");
    setOwnedRubyInput("0");
    setIsPickerOpen(false);
  };

  const runeMaterialName = isVi
    ? result.runeMaterial.nameVi
    : result.runeMaterial.nameEn;
  const rubyMaterialName = isVi
    ? result.rubyMaterial.nameVi
    : result.rubyMaterial.nameEn;

  const activeSlotsForRarity = GEAR_SLOTS_BY_RARITY[rarity];

  return (
    <div data-testid="gear-enhance-calculator" className="space-y-4">
      {/* 1. Flat MD3 Tool Header + Shared Info Popup + Reset */}
      <CalculatorToolHeader
        code={tool.code}
        title={tool.title[locale].replace(`${tool.code} `, "")}
        actions={
          <>
            <CalculatorInfoPopover
              title={
                isVi
                  ? "Thông Tin Cường Hóa & Bảng Chi Phí Từng Chặng"
                  : "Enhancement Guide & Stage Cost Breakdown"
              }
              subtitle={
                isVi
                  ? `Dữ liệu giải mã từ Meta.bytes (${result.rarityConfig.label.vi})`
                  : `Decoded from Meta.bytes (${result.rarityConfig.label.en})`
              }
              locale={locale}
              triggerTestId="gear-enhance-info-trigger"
              dialogTestId="gear-enhance-info-dialog"
            >
              {/* Section A: Refund & Mechanics Note */}
              <div className={cn(CALC_MD3.tonalGroup, "space-y-1.5 text-xs sm:text-sm")}>
                <div className="font-heading font-bold text-amber-700 dark:text-amber-300">
                  {isVi
                    ? "Quy tắc Hoàn trả Tài nguyên & Trần Cấp độ"
                    : "Resource Refund & Level Cap Rules"}
                </div>
                <p className="text-muted-foreground font-sans leading-relaxed">
                  {isVi
                    ? "• Khi tách (Dismantle) hoặc dùng trang bị cũ làm phôi rèn, hệ thống hoàn trả 100% số Rune Cường Hóa Trang Bị đã đầu tư, nhưng KHÔNG hoàn lại lượng Ruby đã tiêu hao."
                    : "• Dismantling or using old gear as forge fodder refunds 100% of invested Gear Enhance Runes, while consumed Rubies are non-refundable."}
                </p>
                <p className="text-muted-foreground font-sans leading-relaxed">
                  {result.rarityConfig.badgeNote[locale]}
                </p>
              </div>

              {/* Section B: Stage Cost Breakdown Table */}
              <div className="space-y-2">
                <h5 className="font-heading text-sm font-bold text-foreground">
                  {isVi
                    ? `Bảng Chi Phí Từng Chặng (1 Món • ${result.rarityConfig.shortLabel.vi})`
                    : `Stage Cost Breakdown (1 Piece • ${result.rarityConfig.shortLabel.en})`}
                </h5>
                <div className={cn(CALC_MD3.tonalGroup, CALC_MD3.dividedList)}>
                  {result.bracketBreakdown.map((item) => (
                    <div
                      key={item.bracketKey}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-2.5 first:pt-0 last:pb-0 text-xs sm:text-sm"
                    >
                      <div>
                        <div className="font-heading font-bold text-foreground">
                          {item.label[locale]}
                        </div>
                        <div className="text-xs text-muted-foreground font-sans">
                          {isVi ? "Đơn giá cuối chặng:" : "End-stage step cost:"}{" "}
                          <span className="font-mono font-semibold text-foreground">
                            {formatCompactNumber(item.perLevelRunes)}
                          </span>{" "}
                          <span>Rune</span> +{" "}
                          <span className="font-mono font-semibold text-foreground">
                            {formatCompactNumber(item.perLevelRuby)}
                          </span>{" "}
                          <span>Ruby / lv</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 sm:text-right">
                        <div>
                          <div className="text-xs text-muted-foreground font-sans">
                            {isVi ? "Chi phí chặng:" : "Stage cost:"}
                          </div>
                          <div className="font-sans font-bold text-amber-700 dark:text-amber-300">
                            <span
                              className="font-mono"
                              title={formatExactNumber(item.runesPerPiece)}
                            >
                              {formatCompactNumber(item.runesPerPiece)}
                            </span>{" "}
                            <span>Rune</span> •{" "}
                            <span
                              className="font-mono text-rose-600 dark:text-rose-400"
                              title={formatExactNumber(item.rubyPerPiece)}
                            >
                              {formatCompactNumber(item.rubyPerPiece)}
                            </span>{" "}
                            <span>Ruby</span>
                          </div>
                        </div>

                        <div>
                          <div className="text-xs text-muted-foreground font-sans">
                            {isVi ? "Tích lũy:" : "Cumulative:"}
                          </div>
                          <div className="font-sans font-semibold text-foreground">
                            <span
                              className="font-mono"
                              title={formatExactNumber(
                                item.cumulativeRunesAtEnd
                              )}
                            >
                              {formatCompactNumber(item.cumulativeRunesAtEnd)}
                            </span>{" "}
                            <span>Rune</span> •{" "}
                            <span
                              className="font-mono"
                              title={formatExactNumber(
                                item.cumulativeRubyAtEnd
                              )}
                            >
                              {formatCompactNumber(item.cumulativeRubyAtEnd)}
                            </span>{" "}
                            <span>Ruby</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section C: 4-Piece Enhancement Master Resonance */}
              <div className="space-y-2">
                <h5 className="font-heading text-sm font-bold text-foreground">
                  {isVi
                    ? "Thưởng Cộng Hưởng Bậc Thầy Cường Hóa (Khi đủ 4 món cùng cấp)"
                    : "4-Piece Enhancement Master Resonance Bonuses"}
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {result.masterBonusTiers.map((tier) => (
                    <div
                      key={tier.level}
                      className={cn(
                        CALC_MD3.tonalGroup,
                        "flex items-center justify-between gap-2 p-2.5 text-xs"
                      )}
                    >
                      <span className="font-mono font-black text-amber-700 dark:text-amber-300">
                        +{tier.level}
                      </span>
                      <span className="font-sans font-semibold text-foreground">
                        {tier.summary[locale]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CalculatorInfoPopover>

            <button
              type="button"
              data-testid="gear-enhance-reset-btn"
              onClick={handleResetDefault}
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

      {/* 2. Main 3-Column Workspace (Left Selector - Central Gear Avatar Hub - Right Selector) */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-start gap-3 sm:gap-4">
        {/* Left Column: Current Level */}
        <div className="order-2 lg:order-1 min-w-0">
          <GearEnhanceLevelSelector
            idPrefix="from"
            title={isVi ? "Cấp Hiện Tại" : "Current Level"}
            level={result.fromLevel}
            rarity={rarity}
            slotId={slotId}
            locale={locale}
            onChangeLevel={setFromLevel}
          />
        </div>

        {/* Center Column: Clickable Gear Avatar Hub + 2-Step Sequential Picker */}
        <div
          ref={pickerRef}
          className="relative order-1 lg:order-2 flex flex-col items-center justify-center lg:w-56"
        >
          <div
            className={cn(
              CALC_MD3.surfaceCard,
              "w-full flex flex-col items-center text-center space-y-2.5"
            )}
          >
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-lg px-2.5 py-0.5 text-xs font-sans font-bold",
                RARITY_BADGE_TONE[rarity]
              )}
            >
              <span>{result.rarityConfig.shortLabel[locale]}</span>
              <span>•</span>
              <span>{result.slotMeta.slotLabel[locale]}</span>
            </span>

            <button
              type="button"
              data-testid="gear-enhance-central-picker-btn"
              aria-expanded={isPickerOpen}
              aria-haspopup="dialog"
              onClick={handleTogglePicker}
              className="group relative flex flex-col items-center gap-2 rounded-2xl p-2 transition-colors hover:bg-amber-500/10 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40"
            >
              <div className="relative">
                <GameAssetFrame
                  src={result.slotMeta.iconPath}
                  alt={result.slotMeta.itemName[locale]}
                  rarity={rarity}
                  size="lg"
                />
                <span className="absolute -bottom-1.5 -right-1.5 inline-flex items-center gap-0.5 rounded-full bg-amber-500 px-2 py-0.5 text-xs font-sans font-black text-slate-950 shadow-sm">
                  <span>{isVi ? "Đổi" : "Pick"}</span>
                  <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </div>

              <div className="space-y-0.5">
                <div className="text-sm sm:text-base font-heading font-black text-foreground group-hover:text-amber-600 dark:group-hover:text-amber-400">
                  {result.slotMeta.itemName[locale]}
                </div>
                <div className="text-xs font-sans text-muted-foreground">
                  {result.slotMeta.baseStatsSummary[locale]}
                </div>
              </div>
            </button>

            {/* Level Delta Badge */}
            <div className={cn(CALC_MD3.tonalGroup, "w-full py-2 px-3 space-y-0.5")}>
              <div className="flex items-center justify-center gap-1.5 font-mono text-sm font-black text-foreground">
                <span>Lv.{result.fromLevel}</span>
                <span className="text-amber-500">➔</span>
                <span className="text-amber-600 dark:text-amber-400">
                  Lv.{result.toLevel}
                </span>
              </div>
              <div className="text-xs font-sans text-muted-foreground">
                {result.levelDelta > 0
                  ? isVi
                    ? `Tăng +${result.levelDelta} cấp (1 món)`
                    : `+${result.levelDelta} levels (1 piece)`
                  : isVi
                    ? "Không tăng cấp"
                    : "No level increase"}
              </div>
            </div>
          </div>

          {/* Floating 2-Step Sequential Picker Popover */}
          {isPickerOpen ? (
            <div
              role="dialog"
              aria-label={
                isVi
                  ? "Chọn phẩm chất và loại trang bị"
                  : "Select gear rarity and slot"
              }
              data-testid="gear-enhance-picker-popover"
              data-md3-overlay="true"
              className={cn(
                CALC_MD3.overlayCard,
                "absolute top-full left-1/2 z-40 mt-2 w-[min(92vw,360px)] -translate-x-1/2 space-y-3"
              )}
            >
              {/* Popover Step Header */}
              <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-2">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    data-testid="picker-step-rarity-tab"
                    onClick={() => setPickerStep("rarity")}
                    className={cn(
                      "rounded-lg px-2.5 py-1 text-xs font-sans font-bold transition-colors cursor-pointer",
                      pickerStep === "rarity"
                        ? "bg-amber-500 text-slate-950"
                        : "bg-muted/60 text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {isVi ? "1. Phẩm Chất" : "1. Rarity"}
                  </button>
                  <button
                    type="button"
                    data-testid="picker-step-slot-tab"
                    onClick={() => setPickerStep("slot")}
                    className={cn(
                      "rounded-lg px-2.5 py-1 text-xs font-sans font-bold transition-colors cursor-pointer",
                      pickerStep === "slot"
                        ? "bg-amber-500 text-slate-950"
                        : "bg-muted/60 text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {isVi ? "2. Trang Bị" : "2. Gear Slot"}
                  </button>
                </div>

                <button
                  type="button"
                  data-testid="gear-enhance-picker-close-btn"
                  aria-label={isVi ? "Đóng bộ chọn" : "Close picker"}
                  onClick={() => setIsPickerOpen(false)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              {pickerStep === "rarity" ? (
                <div className="space-y-2">
                  <div className="text-xs font-sans font-semibold text-muted-foreground">
                    {isVi
                      ? "Bước 1: Chọn Phẩm Chất Trang Bị"
                      : "Step 1: Select Equipment Rarity"}
                  </div>
                  <div className="space-y-1.5">
                    {GEAR_ENHANCE_RARITY_ORDER.map((rKey) => {
                      const cfg = GEAR_ENHANCE_RARITY_CONFIGS[rKey];
                      const isSelected = rarity === rKey;
                      return (
                        <button
                          key={rKey}
                          type="button"
                          data-testid={`gear-rarity-option-${rKey}`}
                          onClick={() => handleSelectRarity(rKey)}
                          className={cn(
                            CALC_MD3.tonalTile,
                            "w-full flex items-center justify-between gap-2.5 p-2.5 text-left",
                            isSelected && CALC_MD3.tileSelected
                          )}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <GameAssetFrame
                              src={cfg.sampleIconPath}
                              alt={cfg.label[locale]}
                              rarity={rKey}
                              size="sm"
                            />
                            <div className="min-w-0">
                              <div className="text-sm font-heading font-bold text-foreground truncate">
                                {cfg.label[locale]}
                              </div>
                              <div className="text-xs font-sans text-muted-foreground">
                                <span className="font-mono font-semibold text-amber-600 dark:text-amber-400">
                                  {formatCompactNumber(cfg.totalRuneAtMax)}
                                </span>{" "}
                                <span>Rune</span> •{" "}
                                <span className="font-mono font-semibold text-rose-600 dark:text-rose-400">
                                  {formatCompactNumber(cfg.totalRubyAtMax)}
                                </span>{" "}
                                <span>Ruby</span>
                              </div>
                            </div>
                          </div>
                          <span className="shrink-0 rounded-lg bg-muted px-2 py-0.5 font-mono text-xs font-bold text-foreground">
                            Max +{cfg.maxLevel}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-xs font-sans font-semibold text-muted-foreground">
                    {isVi
                      ? `Bước 2: Chọn Ô Trang Bị (${result.rarityConfig.shortLabel.vi})`
                      : `Step 2: Select Equipment Piece (${result.rarityConfig.shortLabel.en})`}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {GEAR_SLOT_ORDER.map((sKey) => {
                      const item = activeSlotsForRarity[sKey];
                      const isSelected = slotId === sKey;
                      return (
                        <button
                          key={sKey}
                          type="button"
                          data-testid={`gear-slot-option-${sKey}`}
                          onClick={() => handleSelectSlot(sKey)}
                          className={cn(
                            CALC_MD3.tonalTile,
                            "flex flex-col items-center text-center gap-1.5 p-2.5",
                            isSelected && CALC_MD3.tileSelected
                          )}
                        >
                          <GameAssetFrame
                            src={item.iconPath}
                            alt={item.itemName[locale]}
                            rarity={rarity}
                            size="sm"
                          />
                          <div className="min-w-0 w-full">
                            <div className="text-xs font-sans font-bold text-amber-700 dark:text-amber-400">
                              {item.slotLabel[locale]}
                            </div>
                            <div className="text-xs font-heading font-bold text-foreground truncate">
                              {item.itemName[locale]}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>

        {/* Right Column: Target Level */}
        <div className="order-3 min-w-0">
          <GearEnhanceLevelSelector
            idPrefix="to"
            title={isVi ? "Cấp Mục Tiêu" : "Target Level"}
            level={result.toLevel}
            rarity={rarity}
            slotId={slotId}
            locale={locale}
            onChangeLevel={setToLevel}
          />
        </div>
      </div>

      {/* Invalid Range Warning Banner */}
      {result.isInvalidRange ? (
        <div
          data-testid="gear-enhance-invalid-warning"
          className="flex items-center gap-2.5 rounded-2xl bg-amber-500/15 p-3.5 text-sm font-sans font-medium text-amber-800 dark:text-amber-200"
        >
          <AlertTriangle
            className="h-5 w-5 shrink-0 text-amber-500"
            aria-hidden="true"
          />
          <span>
            {isVi
              ? "Cấp mục tiêu phải lớn hơn hoặc bằng cấp hiện tại. Vui lòng điều chỉnh lại mốc nâng cấp."
              : "Target level must be greater than or equal to current level. Please adjust your range."}
          </span>
        </div>
      ) : null}

      {/* 3. Unified Materials Card with 2 Resource Columns (Rune + Ruby) */}
      <section
        data-testid="gear-enhance-result-card"
        className={cn(CALC_MD3.surfaceCard, "space-y-4")}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles
              className="h-5 w-5 text-amber-500 shrink-0"
              aria-hidden="true"
            />
            <h2 className={CALC_MD3.sectionTitle}>
              {isVi ? "Nguyên Liệu" : "Materials"}
            </h2>
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-xl bg-muted/60 px-3 py-1 text-xs font-sans font-semibold text-muted-foreground">
            <span className="font-bold text-foreground">
              {result.slotMeta.itemName[locale]}
            </span>
            <span>•</span>
            <span className="font-mono font-bold text-amber-700 dark:text-amber-300">
              Lv.{result.fromLevel} ➔ Lv.{result.toLevel}
            </span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Column 1: Gear Enhance Rune (gameId: 206) */}
          <div
            data-testid="gear-enhance-rune-column"
            className={cn(CALC_MD3.tonalGroup, "space-y-3")}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <GameAssetFrame
                  src={result.runeMaterial.iconPath}
                  alt={runeMaterialName}
                  rarity={result.runeMaterial.rarity}
                  size="md"
                />
                <div className="min-w-0">
                  <div className="text-xs font-sans font-semibold text-amber-700 dark:text-amber-400">
                    {isVi
                      ? "Hoàn trả 100% khi tách"
                      : "100% Refund on Dismantle"}
                  </div>
                  <h3 className="text-sm sm:text-base font-heading font-bold text-foreground truncate">
                    {runeMaterialName}
                  </h3>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-xs font-sans font-semibold text-muted-foreground">
                {isVi ? "Tổng Rune Cần Dùng:" : "Total Runes Required:"}
              </div>
              <div title={formatExactNumber(result.requiredRunes)}>
                <CalculatorMetricValue
                  testId="gear-enhance-total-runes"
                  value={formatCompactNumber(result.requiredRunes)}
                  unit="Rune"
                  toneClassName="text-amber-600 dark:text-amber-400"
                />
              </div>
              <div className="text-xs font-sans text-muted-foreground">
                {isVi ? "Số chính xác:" : "Exact:"}{" "}
                <span className="font-mono font-semibold text-foreground">
                  {formatExactNumber(result.requiredRunes)}
                </span>{" "}
                <span>Rune</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs font-sans">
                <span className="text-muted-foreground">
                  {isVi ? "Tiến độ tích lũy:" : "Inventory progress:"}
                </span>
                <span className="font-mono font-bold text-foreground">
                  {result.runeCompletionPercent}%
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-background/80">
                <div
                  className="h-full rounded-full bg-amber-500 transition-all duration-200"
                  style={{ width: `${result.runeCompletionPercent}%` }}
                />
              </div>
            </div>

            {/* Owned Input & Missing/Surplus */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 items-end pt-1">
              <div className="space-y-1">
                <label
                  htmlFor="gear-enhance-owned-runes-input"
                  className="block text-xs font-sans font-semibold text-muted-foreground"
                >
                  {isVi
                    ? "Đang có (VD: 272k):"
                    : "Owned (e.g. 272k):"}
                </label>
                <Input
                  id="gear-enhance-owned-runes-input"
                  data-testid="gear-enhance-owned-runes-input"
                  type="text"
                  inputMode="text"
                  value={ownedRunesInput}
                  onChange={(e) => setOwnedRunesInput(e.target.value)}
                  className={CALC_MD3.dataInput}
                />
              </div>

              <div className="rounded-xl bg-background/70 p-2.5 space-y-0.5">
                <div className="text-xs font-sans text-muted-foreground">
                  {result.missingRunes > 0
                    ? isVi
                      ? "Còn thiếu:"
                      : "Missing:"
                    : isVi
                      ? "Dư sau nâng:"
                      : "Surplus:"}
                </div>
                <div
                  data-testid="gear-enhance-missing-runes"
                  title={formatExactNumber(
                    result.missingRunes > 0
                      ? result.missingRunes
                      : result.surplusRunes
                  )}
                  className={cn(
                    "font-mono text-base font-black",
                    result.missingRunes > 0
                      ? "text-rose-600 dark:text-rose-400"
                      : "text-emerald-600 dark:text-emerald-400"
                  )}
                >
                  {result.missingRunes > 0
                    ? formatCompactNumber(result.missingRunes)
                    : `+${formatCompactNumber(result.surplusRunes)}`}
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Ruby Secondary Currency (gameId: 6) */}
          <div
            data-testid="gear-enhance-ruby-column"
            className={cn(CALC_MD3.tonalGroup, "space-y-3")}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <GameAssetFrame
                  src={result.rubyMaterial.iconPath}
                  alt={rubyMaterialName}
                  rarity={result.rubyMaterial.rarity}
                  size="md"
                />
                <div className="min-w-0">
                  <div className="text-xs font-sans font-semibold text-rose-600 dark:text-rose-400">
                    {isVi
                      ? "Không hoàn lại khi tách"
                      : "Non-refundable on Dismantle"}
                  </div>
                  <h3 className="text-sm sm:text-base font-heading font-bold text-foreground truncate">
                    {rubyMaterialName}
                  </h3>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-xs font-sans font-semibold text-muted-foreground">
                {isVi ? "Tổng Ruby Cần Dùng:" : "Total Rubies Required:"}
              </div>
              <div title={formatExactNumber(result.requiredRuby)}>
                <CalculatorMetricValue
                  testId="gear-enhance-total-ruby"
                  value={formatCompactNumber(result.requiredRuby)}
                  unit="Ruby"
                  toneClassName="text-rose-600 dark:text-rose-400"
                />
              </div>
              <div className="text-xs font-sans text-muted-foreground">
                {isVi ? "Số chính xác:" : "Exact:"}{" "}
                <span className="font-mono font-semibold text-foreground">
                  {formatExactNumber(result.requiredRuby)}
                </span>{" "}
                <span>Ruby</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs font-sans">
                <span className="text-muted-foreground">
                  {isVi ? "Tiến độ tích lũy:" : "Inventory progress:"}
                </span>
                <span className="font-mono font-bold text-foreground">
                  {result.rubyCompletionPercent}%
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-background/80">
                <div
                  className="h-full rounded-full bg-rose-500 transition-all duration-200"
                  style={{ width: `${result.rubyCompletionPercent}%` }}
                />
              </div>
            </div>

            {/* Owned Input & Missing/Surplus */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 items-end pt-1">
              <div className="space-y-1">
                <label
                  htmlFor="gear-enhance-owned-ruby-input"
                  className="block text-xs font-sans font-semibold text-muted-foreground"
                >
                  {isVi
                    ? "Đang có (VD: 1.74m):"
                    : "Owned (e.g. 1.74m):"}
                </label>
                <Input
                  id="gear-enhance-owned-ruby-input"
                  data-testid="gear-enhance-owned-ruby-input"
                  type="text"
                  inputMode="text"
                  value={ownedRubyInput}
                  onChange={(e) => setOwnedRubyInput(e.target.value)}
                  className={CALC_MD3.dataInput}
                />
              </div>

              <div className="rounded-xl bg-background/70 p-2.5 space-y-0.5">
                <div className="text-xs font-sans text-muted-foreground">
                  {result.missingRuby > 0
                    ? isVi
                      ? "Còn thiếu:"
                      : "Missing:"
                    : isVi
                      ? "Dư sau nâng:"
                      : "Surplus:"}
                </div>
                <div
                  data-testid="gear-enhance-missing-ruby"
                  title={formatExactNumber(
                    result.missingRuby > 0
                      ? result.missingRuby
                      : result.surplusRuby
                  )}
                  className={cn(
                    "font-mono text-base font-black",
                    result.missingRuby > 0
                      ? "text-rose-600 dark:text-rose-400"
                      : "text-emerald-600 dark:text-emerald-400"
                  )}
                >
                  {result.missingRuby > 0
                    ? formatCompactNumber(result.missingRuby)
                    : `+${formatCompactNumber(result.surplusRuby)}`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

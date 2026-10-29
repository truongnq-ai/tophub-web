"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ArrowLeft,
  Info,
  X,
  Coins,
} from "lucide-react";
import {
  AWAKENING_FACTION_CONFIGS,
  getAwakeningHeroesByFaction,
  calculateHeroAwakening,
  type AwakeningFaction,
} from "@/content/calculators/hero-awakening-data";
import type {
  CalculatorCategory,
  CalculatorLocale,
  CalculatorToolItem,
  CalculatorZone,
} from "@/content/calculators/types";
import { GameAssetFrame } from "@/components/guides/media/game-asset-frame";
import { Input } from "@/components/ui/input";
import { HeroAwakeningStepSelector } from "./hero-awakening-step-selector";
import {
  CALC_MD3,
  CalculatorMetricValue,
  CalculatorToolHeader,
} from "./calculator-md3-primitives";
import { cn } from "@/lib/utils";

interface HeroAwakeningCalculatorProps {
  readonly zone?: CalculatorZone;
  readonly category: CalculatorCategory;
  readonly tool: CalculatorToolItem;
  readonly locale: CalculatorLocale;
}

const FACTION_ORDER: readonly AwakeningFaction[] = [
  "league",
  "horde",
  "nature",
];

type SequentialPickerStep = "closed" | "faction" | "hero";

export function HeroAwakeningCalculator({
  tool,
  locale,
}: HeroAwakeningCalculatorProps) {
  const [faction, setFaction] = useState<AwakeningFaction>("horde");
  const [selectedHeroId, setSelectedHeroId] = useState<string>(
    AWAKENING_FACTION_CONFIGS.horde.defaultHeroId
  );
  // Mặc định khớp ảnh chụp Thuật Sĩ (Warlock): Đang ở Bậc 1 • Lv.5 (step 6) ➔ Mục tiêu Bậc 4 Hóa Đỏ (step 19)
  const [fromStepIndex, setFromStepIndex] = useState<number>(6);
  const [toStepIndex, setToStepIndex] = useState<number>(19);
  const [ownedStonesInput, setOwnedStonesInput] = useState<string>("0");
  const [ownedShardsInput, setOwnedShardsInput] = useState<string>("0");

  // Trạng thái đóng/mở luồng chọn nối tiếp (Phe -> Tướng -> Ẩn) & Bảng chi tiết [i]
  const [pickerStep, setPickerStep] = useState<SequentialPickerStep>("closed");
  const [isBreakdownOpen, setIsBreakdownOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPickerStep("closed");
        setIsBreakdownOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const heroesForFaction = useMemo(
    () => getAwakeningHeroesByFaction(faction),
    [faction]
  );

  const activeHero = useMemo(() => {
    return (
      heroesForFaction.find((h) => h.id === selectedHeroId) ??
      heroesForFaction[0]
    );
  }, [heroesForFaction, selectedHeroId]);

  const factionConfig = AWAKENING_FACTION_CONFIGS[faction];

  const handlePickFactionInSequence = (nextFaction: AwakeningFaction) => {
    setFaction(nextFaction);
    setSelectedHeroId(AWAKENING_FACTION_CONFIGS[nextFaction].defaultHeroId);
    // Hành động nối tiếp: Chọn xong Phe chuyển ngay sang chọn Avatar tướng
    setPickerStep("hero");
  };

  const handlePickHeroInSequence = (heroId: string) => {
    setSelectedHeroId(heroId);
    // Hành động nối tiếp: Chọn xong tướng tự động ẩn đi
    setPickerStep("closed");
  };

  const result = useMemo(
    () =>
      calculateHeroAwakening({
        faction,
        fromStepIndex,
        toStepIndex,
        ownedStones: Number(ownedStonesInput) || 0,
        ownedShards: Number(ownedShardsInput) || 0,
      }),
    [faction, fromStepIndex, toStepIndex, ownedStonesInput, ownedShardsInput]
  );

  const soulStoneName =
    locale === "vi"
      ? result.soulStoneMaterial.nameVi
      : result.soulStoneMaterial.nameEn;

  const universalShardName =
    locale === "vi"
      ? result.universalShardMaterial.nameVi
      : result.universalShardMaterial.nameEn;

  const activeHeroName = activeHero
    ? locale === "vi"
      ? activeHero.nameVi
      : activeHero.nameEn
    : "";

  const breakdownLabel =
    locale === "vi"
      ? "Xem Bảng Chi Tiết Từng Bậc Thức Tỉnh"
      : "View Step-by-Step Awakening Tier Breakdown";

  return (
    <div data-testid="hero-awakening-calculator" className="space-y-4">
      {/* 1. Flat MD3 Tool Header */}
      <CalculatorToolHeader
        code={tool.code}
        title={tool.title[locale].replace(`${tool.code} `, "")}
        actions={
          <>
            <button
              type="button"
              data-testid="awakening-preset-next-tier-btn"
              onClick={() => {
                setFromStepIndex(6);
                setToStepIndex(7);
              }}
              className={cn(
                CALC_MD3.chipButton,
                "bg-muted/50 font-sans text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <span>{locale === "vi" ? "Bậc 1 ➔ Bậc 2" : "Tier 1 ➔ Tier 2"}</span>
            </button>

            <button
              type="button"
              data-testid="awakening-preset-full-btn"
              onClick={() => {
                setFromStepIndex(0);
                setToStepIndex(19);
                setOwnedStonesInput("0");
                setOwnedShardsInput("0");
              }}
              className={cn(
                CALC_MD3.chipButton,
                "bg-muted/50 font-sans text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <RotateCcw className="h-4 w-4 text-amber-500" aria-hidden="true" />
              <span>{locale === "vi" ? "Bậc 0 ➔ Bậc 4" : "Tier 0 ➔ Tier 4"}</span>
            </button>
          </>
        }
      />

      {/* 2. Main 3-Zone Workspace: [Bậc Thức Tỉnh Hiện Tại] ⟷ [Avatar Tướng Trung Tâm] ⟷ [Bậc Thức Tỉnh Muốn Đạt] */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-4">
        {/* Left: Current Awakening Tier */}
        <div className="order-2 lg:order-1 min-w-0">
          <HeroAwakeningStepSelector
            idPrefix="from"
            title={
              locale === "vi" ? "Bậc Thức Tỉnh Hiện Tại" : "Current Awakening Tier"
            }
            stepIndex={fromStepIndex}
            nextStepShards={result.nextStepFromCurrentShards}
            nextStepStones={result.nextStepFromCurrentStones}
            locale={locale}
            onChangeStepIndex={setFromStepIndex}
          />
        </div>

        {/* Center: Hero Avatar Hub + Sequential Faction -> Hero Picker */}
        <div
          data-testid="central-hero-avatar-hub"
          className="order-1 lg:order-2 relative flex flex-col items-center justify-center py-1 lg:px-1"
        >
          <button
            type="button"
            data-testid="central-hero-avatar-trigger"
            aria-expanded={pickerStep !== "closed"}
            onClick={() =>
              setPickerStep((prev) => (prev === "closed" ? "faction" : "closed"))
            }
            className="group flex min-h-[44px] flex-col items-center gap-1.5 rounded-2xl border border-amber-500/40 bg-amber-500/[0.06] px-4 py-3 shadow-sm hover:border-amber-500 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40"
          >
            {activeHero ? (
              <GameAssetFrame
                src={activeHero.iconPath}
                alt={activeHeroName}
                rarity={result.toNode.majorTier === 4 ? "mythic" : "legendary"}
                faction={activeHero.faction}
                size="lg"
              />
            ) : null}

            {/* DUY NHẤT 1 VỊ TRÍ HIỂN THỊ TÊN TƯỚNG DƯỚI AVATAR */}
            <div className="text-center max-w-[160px]">
              <div
                data-testid="central-hero-name"
                className="truncate text-sm sm:text-base font-heading font-black text-foreground leading-tight"
              >
                {activeHeroName}
              </div>
              <div className="mt-0.5 inline-flex items-center gap-1 text-xs font-sans font-bold text-amber-700 dark:text-amber-400">
                <span>{factionConfig.shortLabel[locale]}</span>
                <ChevronDown
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5"
                  aria-hidden="true"
                />
              </div>
            </div>
          </button>

          {/* Sequential Overlay: Step 1 (Select Faction) -> Step 2 (Select Hero) -> Auto Close */}
          {pickerStep !== "closed" ? (
            <div
              data-testid="hero-sequential-picker"
              data-md3-overlay="true"
              className={cn(
                CALC_MD3.overlayCard,
                "z-30 mt-2 w-full max-w-sm space-y-3 lg:absolute lg:left-1/2 lg:top-full lg:w-80 lg:-translate-x-1/2"
              )}
            >
              <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-2">
                {pickerStep === "hero" ? (
                  <button
                    type="button"
                    data-testid="picker-back-to-faction-btn"
                    onClick={() => setPickerStep("faction")}
                    className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl px-2 text-sm font-heading font-bold text-amber-600 hover:bg-amber-500/10 dark:text-amber-400 cursor-pointer"
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    <span>{locale === "vi" ? "Chọn lại Phe" : "Change Faction"}</span>
                  </button>
                ) : (
                  <span className="text-sm font-heading font-bold text-foreground">
                    {locale === "vi"
                      ? "Bước 1: Chọn Phe & Đá Linh Hồn"
                      : "Step 1: Select Faction & Soul Stone"}
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => setPickerStep("closed")}
                  aria-label={locale === "vi" ? "Đóng" : "Close"}
                  className={cn(
                    CALC_MD3.iconButton,
                    "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              {pickerStep === "faction" ? (
                <div className="grid grid-cols-1 gap-2">
                  {FACTION_ORDER.map((fKey) => {
                    const cfg = AWAKENING_FACTION_CONFIGS[fKey];
                    const isSelected = faction === fKey;
                    const stoneName =
                      locale === "vi" ? cfg.soulStone.nameVi : cfg.soulStone.nameEn;

                    return (
                      <button
                        key={fKey}
                        type="button"
                        data-testid={`faction-card-${fKey}`}
                        onClick={() => handlePickFactionInSequence(fKey)}
                        className={cn(
                          CALC_MD3.tonalTile,
                          "flex min-h-[56px] items-center gap-3 p-2.5 text-left",
                          isSelected ? CALC_MD3.tileSelected : null
                        )}
                      >
                        <GameAssetFrame
                          src={cfg.soulStone.iconPath}
                          alt={stoneName}
                          rarity={cfg.soulStone.rarity}
                          faction={cfg.soulStone.faction}
                          size="sm"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm font-heading font-bold text-foreground">
                            {cfg.label[locale]}
                          </div>
                          <div className="truncate text-xs font-sans text-amber-700 dark:text-amber-400">
                            {stoneName} (<span className="font-mono">9</span>{" "}
                            {locale === "vi" ? "viên" : "stones"})
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-xs font-sans font-medium text-muted-foreground">
                    {locale === "vi"
                      ? `Bước 2: Chọn Tướng Vàng ${factionConfig.shortLabel.vi}`
                      : `Step 2: Pick ${factionConfig.shortLabel.en} Legendary Hero`}
                  </div>
                  <div className="grid max-h-56 grid-cols-3 gap-2 overflow-y-auto pr-1">
                    {heroesForFaction.map((h) => {
                      const hName = locale === "vi" ? h.nameVi : h.nameEn;
                      const isHeroActive = activeHero?.id === h.id;
                      return (
                        <button
                          key={h.id}
                          type="button"
                          data-testid={`select-hero-${h.id}`}
                          onClick={() => handlePickHeroInSequence(h.id)}
                          title={hName}
                          className={cn(
                            CALC_MD3.tonalTile,
                            "flex min-h-[44px] flex-col items-center gap-1 p-1.5",
                            isHeroActive ? CALC_MD3.tileSelected : null
                          )}
                        >
                          <GameAssetFrame
                            src={h.iconPath}
                            alt={hName}
                            rarity="legendary"
                            faction={h.faction}
                            size="sm"
                          />
                          <span className="w-full truncate text-center text-xs font-medium text-foreground">
                            {hName}
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

        {/* Right: Target Awakening Tier */}
        <div className="order-3 min-w-0">
          <HeroAwakeningStepSelector
            idPrefix="to"
            title={
              locale === "vi" ? "Bậc Thức Tỉnh Muốn Đạt" : "Target Awakening Tier"
            }
            stepIndex={toStepIndex}
            nextStepShards={result.nextStepToTargetShards}
            nextStepStones={result.nextStepToTargetStones}
            locale={locale}
            onChangeStepIndex={setToStepIndex}
          />
        </div>
      </div>

      {/* 3. Dual-Resource Result Surface (1 lớp viền) + Guild Honor + [i] Breakdown */}
      <section
        data-testid="hero-awakening-result-section"
        className={cn(
          CALC_MD3.surfaceCard,
          "relative overflow-hidden space-y-3 border-amber-500/35"
        )}
      >
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-amber-500 via-amber-400 to-transparent"
        />

        {result.isInvalidRange ? (
          <div
            data-testid="hero-awakening-invalid-range-alert"
            role="alert"
            className="flex flex-col items-start justify-between gap-2.5 rounded-xl bg-amber-500/10 p-3 sm:flex-row sm:items-center"
          >
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" aria-hidden="true" />
              <p className="text-sm font-medium text-foreground">
                {locale === "vi"
                  ? "Bậc thức tỉnh muốn đạt đang thấp hơn hoặc bằng bậc thức tỉnh hiện tại."
                  : "Target awakening tier is less than or equal to current awakening tier."}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setToStepIndex(Math.min(19, fromStepIndex + 1))}
              className={cn(
                CALC_MD3.chipButton,
                "shrink-0 bg-amber-500 px-4 font-heading font-bold text-slate-950 hover:bg-amber-400"
              )}
            >
              {locale === "vi" ? "Tăng mục tiêu +1 Nấc" : "Set Target +1 Step"}
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {/* Card A (tonal): Faction Soul Stones + Guild Honor Conversion */}
              <div className={cn(CALC_MD3.tonalGroup, "space-y-3")}>
                <div className="flex min-w-0 items-center gap-3">
                  <GameAssetFrame
                    src={result.soulStoneMaterial.iconPath}
                    alt={soulStoneName}
                    rarity={result.soulStoneMaterial.rarity}
                    faction={result.soulStoneMaterial.faction}
                    size="md"
                  />
                  <div className="min-w-0 space-y-1">
                    <div className={cn(CALC_MD3.eyebrow, "truncate text-muted-foreground")}>
                      {soulStoneName}
                    </div>
                    <CalculatorMetricValue
                      testId="awakening-required-stones"
                      value={result.requiredStones.toLocaleString()}
                      unit={locale === "vi" ? "Viên Đá" : "Stones"}
                      toneClassName="text-amber-600 dark:text-amber-400"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <label
                    htmlFor="awakening-owned-stones-input"
                    className="text-sm font-sans font-semibold text-foreground"
                  >
                    {locale === "vi" ? "Đang có:" : "Owned:"}
                  </label>
                  <Input
                    id="awakening-owned-stones-input"
                    data-testid="awakening-owned-stones-input"
                    type="number"
                    inputMode="numeric"
                    min={0}
                    max={99}
                    value={ownedStonesInput}
                    onChange={(e) => setOwnedStonesInput(e.target.value)}
                    className={cn(CALC_MD3.dataInput, "w-24 text-center")}
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border/60 pt-2.5">
                  {result.missingStones > 0 ? (
                    <span
                      data-testid="awakening-missing-stones-status"
                      className="text-sm font-sans font-bold text-rose-600 dark:text-rose-400"
                    >
                      {locale === "vi"
                        ? `Thiếu ${result.missingStones} viên`
                        : `Missing ${result.missingStones} stones`}
                    </span>
                  ) : (
                    <span
                      data-testid="awakening-surplus-stones-status"
                      className="inline-flex items-center gap-1 text-sm font-sans font-bold text-emerald-600 dark:text-emerald-400"
                    >
                      <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                      {locale === "vi"
                        ? `Đủ Đá (Dư ${result.surplusStones})`
                        : `Enough Stones (+${result.surplusStones})`}
                    </span>
                  )}

                  <span
                    data-testid="awakening-guild-honor-badge"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500/15 px-2.5 py-1 text-xs font-sans font-semibold text-amber-800 dark:text-amber-300"
                  >
                    <Coins className="h-3.5 w-3.5 shrink-0 text-amber-500" aria-hidden="true" />
                    {locale === "vi"
                      ? `${result.missingStonesGuildHonorCost.toLocaleString()} Vinh Quang Hội (hoặc ${result.missingStonesGuildCoinS1Cost.toLocaleString()} Xu Bang S1)`
                      : `${result.missingStonesGuildHonorCost.toLocaleString()} Guild Honor (or ${result.missingStonesGuildCoinS1Cost.toLocaleString()} S1 Guild Coins)`}
                  </span>
                </div>
              </div>

              {/* Card B (tonal): Hero Shards + [i] Breakdown Button */}
              <div className={cn(CALC_MD3.tonalGroup, "space-y-3")}>
                <div className="flex min-w-0 items-center gap-3">
                  <GameAssetFrame
                    src={result.universalShardMaterial.iconPath}
                    alt={universalShardName}
                    rarity={result.universalShardMaterial.rarity}
                    size="md"
                  />
                  <div className="min-w-0 space-y-1">
                    <div className={cn(CALC_MD3.eyebrow, "truncate text-muted-foreground")}>
                      {locale === "vi"
                        ? "Mảnh Tướng Riêng / Mảnh Vạn Năng Cam"
                        : "Named Hero Shards / Universal Shards"}
                    </div>
                    <div className="flex items-center gap-2">
                      <CalculatorMetricValue
                        testId="awakening-required-shards"
                        value={result.requiredShards.toLocaleString()}
                        unit={locale === "vi" ? "Mảnh" : "Shards"}
                        toneClassName="text-amber-600 dark:text-amber-400"
                      />
                      <button
                        type="button"
                        data-testid="toggle-awakening-breakdown-btn"
                        onClick={() => setIsBreakdownOpen((prev) => !prev)}
                        title={breakdownLabel}
                        aria-label={breakdownLabel}
                        aria-expanded={isBreakdownOpen}
                        className={cn(
                          CALC_MD3.chipButton,
                          "min-w-[44px] px-2.5 font-sans",
                          isBreakdownOpen
                            ? "bg-amber-500 text-slate-950"
                            : "bg-amber-500/15 text-amber-700 hover:bg-amber-500/25 dark:text-amber-300"
                        )}
                      >
                        <Info className="h-5 w-5" aria-hidden="true" />
                        <span className="hidden sm:inline">
                          {locale === "vi" ? "Chi tiết" : "Details"}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <label
                    htmlFor="awakening-owned-shards-input"
                    className="text-sm font-sans font-semibold text-foreground"
                  >
                    {locale === "vi" ? "Đang có:" : "Owned:"}
                  </label>
                  <Input
                    id="awakening-owned-shards-input"
                    data-testid="awakening-owned-shards-input"
                    type="number"
                    inputMode="numeric"
                    min={0}
                    max={99999}
                    value={ownedShardsInput}
                    onChange={(e) => setOwnedShardsInput(e.target.value)}
                    className={cn(CALC_MD3.dataInput, "w-28 text-center")}
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border/60 pt-2.5">
                  {result.missingShards > 0 ? (
                    <span
                      data-testid="awakening-missing-shards-status"
                      className="text-sm font-sans font-bold text-rose-600 dark:text-rose-400"
                    >
                      {locale === "vi"
                        ? `Thiếu ${result.missingShards.toLocaleString()} mảnh`
                        : `Missing ${result.missingShards.toLocaleString()} shards`}
                    </span>
                  ) : (
                    <span
                      data-testid="awakening-surplus-shards-status"
                      className="inline-flex items-center gap-1 text-sm font-sans font-bold text-emerald-600 dark:text-emerald-400"
                    >
                      <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                      {locale === "vi"
                        ? `Đủ Mảnh (Dư ${result.surplusShards.toLocaleString()})`
                        : `Enough Shards (+${result.surplusShards.toLocaleString()})`}
                    </span>
                  )}

                  <span className="text-xs font-sans tabular-nums text-muted-foreground">
                    {locale === "vi"
                      ? `Đã đầu tư: ${result.alreadyInvestedStones} Đá • ${result.alreadyInvestedShards} Mảnh`
                      : `Invested: ${result.alreadyInvestedStones} Stones • ${result.alreadyInvestedShards} Shards`}
                  </span>
                </div>
              </div>
            </div>

            {/* 4. On-Demand Awakening Tier Breakdown (phẳng: hairline trên, bảng cuộn ngang trên mobile) */}
            {isBreakdownOpen && result.tierBreakdown.length > 0 ? (
              <div
                data-testid="awakening-steps-breakdown-panel"
                className="space-y-2.5 border-t border-border/60 pt-3 animate-in fade-in duration-150"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-heading font-bold text-foreground">
                    {locale === "vi"
                      ? `Bảng Chi Tiết Từng Giai Đoạn Thức Tỉnh (${result.tierBreakdown.length} giai đoạn)`
                      : `Step-by-Step Awakening Tier Breakdown (${result.tierBreakdown.length} stages)`}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsBreakdownOpen(false)}
                    className={cn(
                      CALC_MD3.chipButton,
                      "px-3 font-sans text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                    <span>{locale === "vi" ? "Ẩn" : "Hide"}</span>
                  </button>
                </div>

                <div className="max-h-72 overflow-auto">
                  <table
                    data-testid="hero-awakening-breakdown-table"
                    className="w-full min-w-[520px] border-collapse text-left text-sm"
                  >
                    <thead>
                      <tr className="border-b border-border/80 text-xs font-sans font-semibold uppercase tracking-wide text-muted-foreground">
                        <th className="py-2 pr-2">{locale === "vi" ? "Giai đoạn" : "Stage"}</th>
                        <th className="py-2 px-2">{locale === "vi" ? "Đá Linh Hồn" : "Soul Stones"}</th>
                        <th className="py-2 px-2">{locale === "vi" ? "Mảnh Tướng" : "Hero Shards"}</th>
                        <th className="py-2 px-2">{locale === "vi" ? "Tích lũy" : "Cumulative"}</th>
                        <th className="py-2 pl-2">{locale === "vi" ? "Hiệu ứng mở khóa" : "Unlock Effect"}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50 font-sans tabular-nums">
                      {result.tierBreakdown.map((item) => (
                        <tr key={item.tierKey} className="hover:bg-secondary/40">
                          <td className="py-2 pr-2 font-bold text-foreground">
                            {item.stageLabel[locale]}
                          </td>
                          <td className="py-2 px-2 font-extrabold text-rose-600 dark:text-rose-400">
                            +{item.stageStones} {locale === "vi" ? "Đá" : "Stones"}
                          </td>
                          <td className="py-2 px-2 font-extrabold text-amber-600 dark:text-amber-400">
                            +{item.stageShards} {locale === "vi" ? "Mảnh" : "Shards"}
                          </td>
                          <td className="py-2 px-2 text-muted-foreground">
                            {item.cumulativeStonesAtEnd} {locale === "vi" ? "Đá" : "St"} •{" "}
                            {item.cumulativeShardsAtEnd} {locale === "vi" ? "Mảnh" : "Sh"}
                          </td>
                          <td className="py-2 pl-2 text-sm text-amber-700 dark:text-amber-400">
                            {item.milestoneNote ? item.milestoneNote[locale] : "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : null}
          </>
        )}
      </section>
    </div>
  );
}

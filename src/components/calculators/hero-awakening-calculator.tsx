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

  return (
    <div data-testid="hero-awakening-calculator" className="space-y-4">
      {/* 1. Ultra-Compact Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-card to-card px-4 py-3 shadow-sm">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="rounded-lg bg-amber-500 px-2 py-0.5 font-mono text-xs font-black text-slate-950 shrink-0">
            {tool.code}
          </span>
          <h1 className="text-base sm:text-xl font-heading font-black tracking-tight text-foreground truncate">
            {tool.title[locale].replace(`${tool.code} `, "")}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            data-testid="awakening-preset-next-tier-btn"
            onClick={() => {
              setFromStepIndex(6);
              setToStepIndex(7);
            }}
            className="inline-flex items-center gap-1 rounded-xl border border-border/80 bg-background/70 hover:bg-secondary px-2.5 py-1.5 text-xs font-mono font-semibold text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
          >
            <span>
              {locale === "vi" ? "Bậc 1 ➔ Bậc 2" : "Tier 1 ➔ Tier 2"}
            </span>
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
            className="inline-flex items-center gap-1 rounded-xl border border-border/80 bg-background/70 hover:bg-secondary px-2.5 py-1.5 text-xs font-mono font-semibold text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5 text-amber-500" />
            <span>
              {locale === "vi" ? "Bậc 0 ➔ Bậc 4" : "Tier 0 ➔ Tier 4"}
            </span>
          </button>
        </div>
      </div>

      {/* 2. Main 3-Zone Workspace: [Bậc Thức Tỉnh Hiện Tại] ⟷ [Avatar Tướng Trung Tâm] ⟷ [Bậc Thức Tỉnh Muốn Đạt] */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-4">
        {/* Left: Current Awakening Tier */}
        <div className="order-2 lg:order-1 min-w-0">
          <HeroAwakeningStepSelector
            idPrefix="from"
            title={
              locale === "vi"
                ? "Bậc Thức Tỉnh Hiện Tại"
                : "Current Awakening Tier"
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
            onClick={() =>
              setPickerStep((prev) =>
                prev === "closed" ? "faction" : "closed"
              )
            }
            className="group flex flex-col items-center gap-1.5 rounded-2xl border border-amber-500/40 bg-gradient-to-b from-amber-500/15 via-card to-card px-4 py-3 shadow-sm hover:border-amber-500 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40"
          >
            {activeHero && (
              <GameAssetFrame
                src={activeHero.iconPath}
                alt={activeHeroName}
                rarity={result.toNode.majorTier === 4 ? "mythic" : "legendary"}
                faction={activeHero.faction}
                size="lg"
              />
            )}

            {/* DUY NHẤT 1 VỊ TRÍ HIỂN THỊ TÊN TƯỚNG DƯỚI AVATAR */}
            <div className="text-center max-w-[140px]">
              <div
                data-testid="central-hero-name"
                className="text-xs sm:text-sm font-heading font-black text-foreground leading-tight truncate"
              >
                {activeHeroName}
              </div>
              <div className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400 mt-0.5">
                <span>{factionConfig.shortLabel[locale]}</span>
                <ChevronDown className="h-3 w-3 transition-transform group-hover:translate-y-0.5" />
              </div>
            </div>
          </button>

          {/* Sequential Popover: Step 1 (Select Faction) -> Step 2 (Select Hero) -> Auto Close */}
          {pickerStep !== "closed" && (
            <div
              data-testid="hero-sequential-picker"
              className="z-30 mt-2 w-full max-w-sm lg:w-80 lg:absolute lg:top-full lg:left-1/2 lg:-translate-x-1/2 rounded-2xl border border-amber-500/45 bg-card/95 backdrop-blur-md p-3.5 shadow-xl space-y-3"
            >
              <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-2">
                {pickerStep === "hero" ? (
                  <button
                    type="button"
                    data-testid="picker-back-to-faction-btn"
                    onClick={() => setPickerStep("faction")}
                    className="inline-flex items-center gap-1 text-xs font-heading font-bold text-amber-500 hover:underline cursor-pointer"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>
                      {locale === "vi" ? "Chọn lại Phe" : "Change Faction"}
                    </span>
                  </button>
                ) : (
                  <span className="text-xs font-heading font-black text-foreground">
                    {locale === "vi"
                      ? "Bước 1: Chọn Phe & Đá Linh Hồn"
                      : "Step 1: Select Faction & Soul Stone"}
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => setPickerStep("closed")}
                  aria-label={locale === "vi" ? "Đóng" : "Close"}
                  className="inline-flex h-6 w-6 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {pickerStep === "faction" ? (
                <div className="grid grid-cols-1 gap-2">
                  {FACTION_ORDER.map((fKey) => {
                    const cfg = AWAKENING_FACTION_CONFIGS[fKey];
                    const isSelected = faction === fKey;
                    const stoneName =
                      locale === "vi"
                        ? cfg.soulStone.nameVi
                        : cfg.soulStone.nameEn;

                    return (
                      <button
                        key={fKey}
                        type="button"
                        data-testid={`faction-card-${fKey}`}
                        onClick={() => handlePickFactionInSequence(fKey)}
                        className={cn(
                          "flex items-center gap-3 rounded-xl border p-2.5 text-left transition-all cursor-pointer",
                          isSelected
                            ? "border-amber-500 bg-amber-500/15 font-bold"
                            : "border-border/70 bg-background/70 hover:border-amber-500/40"
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
                          <div className="text-xs font-heading font-black text-foreground truncate">
                            {cfg.label[locale]}
                          </div>
                          <div className="font-mono text-[10px] text-amber-600 dark:text-amber-400 truncate">
                            {stoneName} (9{" "}
                            {locale === "vi" ? "viên" : "stones"})
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-[11px] font-mono text-muted-foreground">
                    {locale === "vi"
                      ? `Bước 2: Chọn Tướng Vàng ${factionConfig.shortLabel.vi}`
                      : `Step 2: Pick ${factionConfig.shortLabel.en} Legendary Hero`}
                  </div>
                  <div className="grid grid-cols-3 gap-2 max-h-52 overflow-y-auto pr-1">
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
                            "flex flex-col items-center gap-1 rounded-xl border p-1.5 transition-all cursor-pointer",
                            isHeroActive
                              ? "border-amber-500 bg-amber-500/15"
                              : "border-border/60 bg-background/60 hover:border-amber-500/40"
                          )}
                        >
                          <GameAssetFrame
                            src={h.iconPath}
                            alt={hName}
                            rarity="legendary"
                            faction={h.faction}
                            size="sm"
                          />
                          <span className="text-[10px] font-medium text-foreground truncate w-full text-center">
                            {hName}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Target Awakening Tier */}
        <div className="order-3 min-w-0">
          <HeroAwakeningStepSelector
            idPrefix="to"
            title={
              locale === "vi"
                ? "Bậc Thức Tỉnh Muốn Đạt"
                : "Target Awakening Tier"
            }
            stepIndex={toStepIndex}
            nextStepShards={result.nextStepToTargetShards}
            nextStepStones={result.nextStepToTargetStones}
            locale={locale}
            onChangeStepIndex={setToStepIndex}
          />
        </div>
      </div>

      {/* 3. Compact Dual-Resource Result Bar + Guild Honor Badge + [i] Breakdown Trigger */}
      <section
        data-testid="hero-awakening-result-section"
        className="rounded-2xl border border-amber-500/35 bg-gradient-to-br from-amber-500/10 via-card to-card p-4 space-y-3 shadow-sm"
      >
        {result.isInvalidRange ? (
          <div
            data-testid="hero-awakening-invalid-range-alert"
            className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5"
          >
            <div className="flex items-center gap-2.5">
              <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
              <p className="text-xs text-foreground font-medium">
                {locale === "vi"
                  ? "Bậc thức tỉnh muốn đạt đang thấp hơn hoặc bằng bậc thức tỉnh hiện tại."
                  : "Target awakening tier is less than or equal to current awakening tier."}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setToStepIndex(Math.min(19, fromStepIndex + 1))}
              className="rounded-lg bg-amber-500 px-3 py-1.5 min-h-[36px] text-xs font-heading font-bold text-slate-950 shrink-0 cursor-pointer"
            >
              {locale === "vi"
                ? "Tăng mục tiêu +1 Nấc"
                : "Set Target +1 Step"}
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Card A: Faction Soul Stones + Guild Honor Conversion */}
              <div className="rounded-xl border border-border/80 bg-background/80 p-3.5 space-y-2.5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <GameAssetFrame
                      src={result.soulStoneMaterial.iconPath}
                      alt={soulStoneName}
                      rarity={result.soulStoneMaterial.rarity}
                      faction={result.soulStoneMaterial.faction}
                      size="md"
                    />
                    <div className="min-w-0">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground truncate">
                        {soulStoneName}
                      </div>
                      <div className="flex items-baseline gap-1.5">
                        <span
                          data-testid="awakening-required-stones"
                          className="font-mono text-2xl font-black text-amber-500 leading-none"
                        >
                          {result.requiredStones.toLocaleString()}
                        </span>
                        <span className="text-xs font-heading font-bold text-foreground">
                          {locale === "vi" ? "Viên Đá" : "Stones"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Owned Stones Input */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <label
                      htmlFor="awakening-owned-stones-input"
                      className="text-[11px] font-mono font-bold text-muted-foreground"
                    >
                      {locale === "vi" ? "Đang có:" : "Owned:"}
                    </label>
                    <Input
                      id="awakening-owned-stones-input"
                      data-testid="awakening-owned-stones-input"
                      type="number"
                      min={0}
                      max={99}
                      value={ownedStonesInput}
                      onChange={(e) => setOwnedStonesInput(e.target.value)}
                      className="w-16 h-8 font-mono font-bold text-xs text-center"
                    />
                  </div>
                </div>

                {/* Missing Stones + Guild Shop Currency Equivalent */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-border/60 text-[11px]">
                  {result.missingStones > 0 ? (
                    <span
                      data-testid="awakening-missing-stones-status"
                      className="font-mono font-bold text-rose-600 dark:text-rose-400"
                    >
                      {locale === "vi"
                        ? `Thiếu ${result.missingStones} viên`
                        : `Missing ${result.missingStones} stones`}
                    </span>
                  ) : (
                    <span
                      data-testid="awakening-surplus-stones-status"
                      className="inline-flex items-center gap-1 font-mono font-bold text-emerald-600 dark:text-emerald-400"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      {locale === "vi"
                        ? `Đủ Đá (Dư ${result.surplusStones})`
                        : `Enough Stones (+${result.surplusStones})`}
                    </span>
                  )}

                  <span
                    data-testid="awakening-guild-honor-badge"
                    className="inline-flex items-center gap-1 rounded-md bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 font-mono text-[10px] font-bold text-amber-700 dark:text-amber-300"
                  >
                    <Coins className="h-3 w-3 text-amber-500 shrink-0" />
                    {locale === "vi"
                      ? `${result.missingStonesGuildHonorCost.toLocaleString()} Vinh Quang Hội (hoặc ${result.missingStonesGuildCoinS1Cost.toLocaleString()} Xu Bang S1)`
                      : `${result.missingStonesGuildHonorCost.toLocaleString()} Guild Honor (or ${result.missingStonesGuildCoinS1Cost.toLocaleString()} S1 Guild Coins)`}
                  </span>
                </div>
              </div>

              {/* Card B: Hero Shards + [i] Breakdown Button */}
              <div className="rounded-xl border border-border/80 bg-background/80 p-3.5 space-y-2.5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <GameAssetFrame
                      src={result.universalShardMaterial.iconPath}
                      alt={universalShardName}
                      rarity={result.universalShardMaterial.rarity}
                      size="md"
                    />
                    <div className="min-w-0">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground truncate">
                        {locale === "vi"
                          ? "Mảnh Tướng Riêng / Mảnh Vạn Năng Cam"
                          : "Named Hero Shards / Universal Shards"}
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          data-testid="awakening-required-shards"
                          className="font-mono text-2xl font-black text-amber-500 leading-none"
                        >
                          {result.requiredShards.toLocaleString()}
                        </span>
                        <span className="text-xs font-heading font-bold text-foreground">
                          {locale === "vi" ? "Mảnh" : "Shards"}
                        </span>

                        {/* Nút icon [i] ngay cạnh kết quả số mảnh để mở Bảng Chi Tiết Từng Bậc */}
                        <button
                          type="button"
                          data-testid="toggle-awakening-breakdown-btn"
                          onClick={() => setIsBreakdownOpen((prev) => !prev)}
                          title={
                            locale === "vi"
                              ? "Xem Bảng Chi Tiết Từng Bậc Thức Tỉnh"
                              : "View Step-by-Step Awakening Tier Breakdown"
                          }
                          aria-expanded={isBreakdownOpen}
                          className={cn(
                            "inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-[11px] font-mono font-bold transition-all cursor-pointer",
                            isBreakdownOpen
                              ? "border-amber-500 bg-amber-500 text-slate-950"
                              : "border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-300 hover:bg-amber-500/20"
                          )}
                        >
                          <Info className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">
                            {locale === "vi" ? "Chi tiết" : "Details"}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Owned Shards Input */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <label
                      htmlFor="awakening-owned-shards-input"
                      className="text-[11px] font-mono font-bold text-muted-foreground"
                    >
                      {locale === "vi" ? "Đang có:" : "Owned:"}
                    </label>
                    <Input
                      id="awakening-owned-shards-input"
                      data-testid="awakening-owned-shards-input"
                      type="number"
                      min={0}
                      max={99999}
                      value={ownedShardsInput}
                      onChange={(e) => setOwnedShardsInput(e.target.value)}
                      className="w-20 h-8 font-mono font-bold text-xs text-center"
                    />
                  </div>
                </div>

                {/* Missing Shards + Tavern Tip */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-border/60 text-[11px]">
                  {result.missingShards > 0 ? (
                    <span
                      data-testid="awakening-missing-shards-status"
                      className="font-mono font-bold text-rose-600 dark:text-rose-400"
                    >
                      {locale === "vi"
                        ? `Thiếu ${result.missingShards.toLocaleString()} mảnh`
                        : `Missing ${result.missingShards.toLocaleString()} shards`}
                    </span>
                  ) : (
                    <span
                      data-testid="awakening-surplus-shards-status"
                      className="inline-flex items-center gap-1 font-mono font-bold text-emerald-600 dark:text-emerald-400"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      {locale === "vi"
                        ? `Đủ Mảnh (Dư ${result.surplusShards.toLocaleString()})`
                        : `Enough Shards (+${result.surplusShards.toLocaleString()})`}
                    </span>
                  )}

                  <span className="font-mono text-[10px] text-muted-foreground">
                    {locale === "vi"
                      ? `Đã đầu tư: ${result.alreadyInvestedStones} Đá • ${result.alreadyInvestedShards} Mảnh`
                      : `Invested: ${result.alreadyInvestedStones} Stones • ${result.alreadyInvestedShards} Shards`}
                  </span>
                </div>
              </div>
            </div>

            {/* 4. On-Demand Step-by-Step Awakening Tier Breakdown (chỉ hiện khi bấm nút [i]) */}
            {isBreakdownOpen && result.tierBreakdown.length > 0 && (
              <div
                data-testid="awakening-steps-breakdown-panel"
                className="rounded-xl border border-border/80 bg-background/90 p-3 space-y-2.5 animate-in fade-in duration-150"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-heading font-bold text-foreground">
                    {locale === "vi"
                      ? `Bảng Chi Tiết Từng Giai Đoạn Thức Tỉnh (${result.tierBreakdown.length} giai đoạn)`
                      : `Step-by-Step Awakening Tier Breakdown (${result.tierBreakdown.length} stages)`}
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsBreakdownOpen(false)}
                    className="inline-flex items-center gap-1 text-[11px] font-mono text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    <X className="h-3.5 w-3.5" />
                    <span>{locale === "vi" ? "Ẩn" : "Hide"}</span>
                  </button>
                </div>

                <div className="overflow-x-auto max-h-60 overflow-y-auto">
                  <table
                    data-testid="hero-awakening-breakdown-table"
                    className="w-full text-left border-collapse text-xs"
                  >
                    <thead>
                      <tr className="border-b border-border/80 text-[10px] font-mono uppercase text-muted-foreground">
                        <th className="py-1.5 pr-2">
                          {locale === "vi" ? "Giai đoạn" : "Stage"}
                        </th>
                        <th className="py-1.5 px-2">
                          {locale === "vi" ? "Đá Linh Hồn" : "Soul Stones"}
                        </th>
                        <th className="py-1.5 px-2">
                          {locale === "vi" ? "Mảnh Tướng" : "Hero Shards"}
                        </th>
                        <th className="py-1.5 px-2">
                          {locale === "vi" ? "Tích lũy" : "Cumulative"}
                        </th>
                        <th className="py-1.5 pl-2">
                          {locale === "vi" ? "Hiệu ứng mở khóa" : "Unlock Effect"}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50 font-mono">
                      {result.tierBreakdown.map((item) => (
                        <tr
                          key={item.tierKey}
                          className="hover:bg-secondary/40"
                        >
                          <td className="py-1.5 pr-2 font-sans font-bold text-foreground">
                            {item.stageLabel[locale]}
                          </td>
                          <td className="py-1.5 px-2 font-extrabold text-rose-500">
                            +{item.stageStones}{" "}
                            {locale === "vi" ? "Đá" : "Stones"}
                          </td>
                          <td className="py-1.5 px-2 font-extrabold text-amber-500">
                            +{item.stageShards}{" "}
                            {locale === "vi" ? "Mảnh" : "Shards"}
                          </td>
                          <td className="py-1.5 px-2 text-muted-foreground">
                            {item.cumulativeStonesAtEnd}{" "}
                            {locale === "vi" ? "Đá" : "St"} •{" "}
                            {item.cumulativeShardsAtEnd}{" "}
                            {locale === "vi" ? "Mảnh" : "Sh"}
                          </td>
                          <td className="py-1.5 pl-2 font-sans text-[11px] text-amber-600 dark:text-amber-400">
                            {item.milestoneNote
                              ? item.milestoneNote[locale]
                              : "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}

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
} from "lucide-react";
import {
  HERO_STAR_RARITY_CONFIGS,
  getHeroesByRarity,
  calculateHeroStarUpgrade,
  formatStarPositionSummary,
  type HeroStarRarity,
  type HeroStarCostProfile,
} from "@/content/calculators/hero-stars-data";
import type {
  CalculatorCategory,
  CalculatorLocale,
  CalculatorToolItem,
  CalculatorZone,
} from "@/content/calculators/types";
import { GameAssetFrame } from "@/components/guides/media/game-asset-frame";
import { Input } from "@/components/ui/input";
import { HeroStarPetalSelector } from "./hero-star-petal-selector";
import { cn } from "@/lib/utils";

interface HeroStarsCalculatorProps {
  readonly zone?: CalculatorZone;
  readonly category: CalculatorCategory;
  readonly tool: CalculatorToolItem;
  readonly locale: CalculatorLocale;
}

const RARITY_ORDER: readonly HeroStarRarity[] = [
  "mythic",
  "legendary",
  "epic",
  "rare",
];

type SequentialPickerStep = "closed" | "rarity" | "hero";

export function HeroStarsCalculator({
  tool,
  locale,
}: HeroStarsCalculatorProps) {
  const [rarity, setRarity] = useState<HeroStarRarity>("mythic");
  const [costProfile, setCostProfile] =
    useState<HeroStarCostProfile>("standard");
  const [selectedHeroId, setSelectedHeroId] = useState<string>(
    HERO_STAR_RARITY_CONFIGS.mythic.defaultHeroId
  );
  const [fromPetalIndex, setFromPetalIndex] = useState<number>(6);
  const [toPetalIndex, setToPetalIndex] = useState<number>(55);
  const [ownedInput, setOwnedInput] = useState<string>("0");

  // Trạng thái đóng/mở luồng chọn nối tiếp (Phẩm chất -> Tướng -> Ẩn) & Bảng chi tiết [i]
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

  const heroesForRarity = useMemo(() => getHeroesByRarity(rarity), [rarity]);

  const activeHero = useMemo(() => {
    return (
      heroesForRarity.find((h) => h.id === selectedHeroId) ?? heroesForRarity[0]
    );
  }, [heroesForRarity, selectedHeroId]);

  const rarityConfig = HERO_STAR_RARITY_CONFIGS[rarity];

  const handlePickRarityInSequence = (nextRarity: HeroStarRarity) => {
    setRarity(nextRarity);
    setSelectedHeroId(HERO_STAR_RARITY_CONFIGS[nextRarity].defaultHeroId);
    // Hành động nối tiếp: Chọn xong phẩm chất chuyển ngay sang chọn Avatar tướng
    setPickerStep("hero");
  };

  const handlePickHeroInSequence = (heroId: string) => {
    setSelectedHeroId(heroId);
    // Hành động nối tiếp: Chọn xong tướng tự động ẩn đi
    setPickerStep("closed");
  };

  const result = useMemo(
    () =>
      calculateHeroStarUpgrade({
        rarity,
        costProfile,
        fromPetalIndex,
        toPetalIndex,
        ownedShards: Number(ownedInput) || 0,
      }),
    [rarity, costProfile, fromPetalIndex, toPetalIndex, ownedInput]
  );

  const universalShardName =
    locale === "vi"
      ? result.universalShard.nameVi
      : result.universalShard.nameEn;

  const activeHeroName = activeHero
    ? locale === "vi"
      ? activeHero.nameVi
      : activeHero.nameEn
    : "";

  return (
    <div data-testid="hero-stars-calculator" className="space-y-4">
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
          {rarityConfig.supportsProfileToggle && (
            <div className="flex items-center gap-1 rounded-xl border border-border/80 bg-background/80 p-0.5">
              <button
                type="button"
                data-testid="cost-profile-standard-btn"
                onClick={() => setCostProfile("standard")}
                className={cn(
                  "rounded-lg px-2 py-1 text-[11px] font-mono font-bold transition-colors cursor-pointer",
                  costProfile === "standard"
                    ? "bg-amber-500 text-slate-950"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {rarityConfig.totalShardsStandard}
              </button>
              <button
                type="button"
                data-testid="cost-profile-legacy500-btn"
                onClick={() => setCostProfile("legacy_500")}
                className={cn(
                  "rounded-lg px-2 py-1 text-[11px] font-mono font-bold transition-colors cursor-pointer",
                  costProfile === "legacy_500"
                    ? "bg-amber-500 text-slate-950"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                500
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => {
              setFromPetalIndex(0);
              setToPetalIndex(75);
              setOwnedInput("0");
            }}
            className="inline-flex items-center gap-1 rounded-xl border border-border/80 bg-background/70 hover:bg-secondary px-2.5 py-1.5 text-xs font-mono font-semibold text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5 text-amber-500" />
            <span>0★ ➔ 15★</span>
          </button>
        </div>
      </div>

      {/* 2. Main 3-Zone Workspace: [Điểm Xuất Phát (X)] ⟷ [Avatar Tướng Trung Tâm] ⟷ [Mục Tiêu Đích (Y)] */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-4">
        {/* Left: Starting Point (X) */}
        <div className="order-2 lg:order-1 min-w-0">
          <HeroStarPetalSelector
            idPrefix="from"
            subtitle={
              locale === "vi" ? "Điểm Xuất Phát (X)" : "Starting Point (X)"
            }
            title={locale === "vi" ? "Bậc Sao Hiện Tại" : "Current Star Level"}
            petalIndex={fromPetalIndex}
            costPerPetal={result.currentCostPerPetal}
            cumulativeShards={result.alreadyInvestedShards}
            locale={locale}
            onChangePetalIndex={setFromPetalIndex}
          />
        </div>

        {/* Center: Hero Avatar Hub + Sequential Rarity -> Hero Picker */}
        <div
          data-testid="central-hero-avatar-hub"
          className="order-1 lg:order-2 relative flex flex-col items-center justify-center py-1 lg:px-1"
        >
          <button
            type="button"
            data-testid="central-hero-avatar-trigger"
            onClick={() =>
              setPickerStep((prev) => (prev === "closed" ? "rarity" : "closed"))
            }
            className="group flex flex-col items-center gap-1.5 rounded-2xl border border-amber-500/40 bg-gradient-to-b from-amber-500/15 via-card to-card px-4 py-3 shadow-sm hover:border-amber-500 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40"
          >
            {activeHero && (
              <GameAssetFrame
                src={activeHero.iconPath}
                alt={activeHeroName}
                rarity={rarity}
                faction={activeHero.faction}
                size="lg"
              />
            )}

            {/* DUY NHẤT 1 VỊ TRÍ HIỂN THỊ TÊN TƯỚNG DƯỚI AVATAR */}
            <div className="text-center">
              <div
                data-testid="central-hero-name"
                className="text-xs sm:text-sm font-heading font-black text-foreground leading-tight"
              >
                {activeHeroName}
              </div>
              <div className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400 mt-0.5">
                <span>{rarityConfig.shortLabel[locale]}</span>
                <ChevronDown className="h-3 w-3 transition-transform group-hover:translate-y-0.5" />
              </div>
            </div>
          </button>

          {/* Sequential Popover: Step 1 (Select Rarity) -> Step 2 (Select Hero) -> Auto Close */}
          {pickerStep !== "closed" && (
            <div
              data-testid="hero-sequential-picker"
              className="z-30 mt-2 w-full max-w-sm lg:w-80 lg:absolute lg:top-full lg:left-1/2 lg:-translate-x-1/2 rounded-2xl border border-amber-500/45 bg-card/95 backdrop-blur-md p-3.5 shadow-xl space-y-3"
            >
              <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-2">
                {pickerStep === "hero" ? (
                  <button
                    type="button"
                    data-testid="picker-back-to-rarity-btn"
                    onClick={() => setPickerStep("rarity")}
                    className="inline-flex items-center gap-1 text-xs font-heading font-bold text-amber-500 hover:underline cursor-pointer"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>
                      {locale === "vi" ? "Chọn lại phẩm chất" : "Change Rarity"}
                    </span>
                  </button>
                ) : (
                  <span className="text-xs font-heading font-black text-foreground">
                    {locale === "vi"
                      ? "Bước 1: Chọn Phẩm Chất Tướng"
                      : "Step 1: Select Hero Rarity"}
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

              {pickerStep === "rarity" ? (
                <div className="grid grid-cols-2 gap-2">
                  {RARITY_ORDER.map((rKey) => {
                    const cfg = HERO_STAR_RARITY_CONFIGS[rKey];
                    const isSelected = rarity === rKey;
                    const shardName =
                      locale === "vi"
                        ? cfg.universalShard.nameVi
                        : cfg.universalShard.nameEn;

                    return (
                      <button
                        key={rKey}
                        type="button"
                        data-testid={`rarity-card-${rKey}`}
                        onClick={() => handlePickRarityInSequence(rKey)}
                        className={cn(
                          "flex items-center gap-2.5 rounded-xl border p-2.5 text-left transition-all cursor-pointer",
                          isSelected
                            ? "border-amber-500 bg-amber-500/15 font-bold"
                            : "border-border/70 bg-background/70 hover:border-amber-500/40"
                        )}
                      >
                        <GameAssetFrame
                          src={cfg.universalShard.iconPath}
                          alt={shardName}
                          rarity={cfg.universalShard.rarity}
                          size="sm"
                        />
                        <div className="min-w-0">
                          <div className="text-xs font-heading font-black text-foreground truncate">
                            {cfg.shortLabel[locale]}
                          </div>
                          <div className="font-mono text-[10px] text-amber-600 dark:text-amber-400">
                            {cfg.totalShardsStandard}{" "}
                            {locale === "vi" ? "mảnh" : "shards"}
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
                      ? `Bước 2: Chọn Avatar ${rarityConfig.shortLabel.vi}`
                      : `Step 2: Pick ${rarityConfig.shortLabel.en} Hero`}
                  </div>
                  <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto pr-1">
                    {heroesForRarity.map((h) => {
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
                            rarity={h.rarity}
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

        {/* Right: Target Goal (Y) */}
        <div className="order-3 min-w-0">
          <HeroStarPetalSelector
            idPrefix="to"
            subtitle={locale === "vi" ? "Mục Tiêu Đích (Y)" : "Target Goal (Y)"}
            title={locale === "vi" ? "Bậc Sao Muốn Đạt" : "Target Star Level"}
            petalIndex={toPetalIndex}
            costPerPetal={result.targetCostPerPetal}
            cumulativeShards={result.targetCumulativeShards}
            locale={locale}
            onChangePetalIndex={setToPetalIndex}
          />
        </div>
      </div>

      {/* 3. Compact Result Bar & [i] Icon Trigger for Step-by-Step Star Breakdown */}
      <section
        data-testid="hero-stars-result-section"
        className="rounded-2xl border border-amber-500/35 bg-gradient-to-br from-amber-500/10 via-card to-card p-4 space-y-3 shadow-sm"
      >
        {result.isInvalidRange ? (
          <div
            data-testid="hero-stars-invalid-range-alert"
            className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5"
          >
            <div className="flex items-center gap-2.5">
              <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
              <p className="text-xs text-foreground font-medium">
                {locale === "vi"
                  ? "Bậc sao mục tiêu (Y) đang thấp hơn hoặc bằng bậc sao hiện tại (X)."
                  : "Target star level (Y) is less than or equal to current level (X)."}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setToPetalIndex(Math.min(75, fromPetalIndex + 5))}
              className="rounded-lg bg-amber-500 px-3 py-1.5 min-h-[36px] text-xs font-heading font-bold text-slate-950 shrink-0 cursor-pointer"
            >
              {locale === "vi" ? "+1 Ngôi Sao" : "+1 Star"}
            </button>
          </div>
        ) : null}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Card A: Total Universal Shards Needed + [i] Breakdown Icon */}
          <div className="rounded-xl border border-amber-500/40 bg-background/85 p-3.5 flex items-center gap-3.5">
            <GameAssetFrame
              src={result.universalShard.iconPath}
              alt={universalShardName}
              rarity={result.universalShard.rarity}
              size="md"
            />

            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-mono font-bold uppercase text-amber-600 dark:text-amber-400">
                {locale === "vi"
                  ? "Tổng số mảnh cần dùng:"
                  : "Total Shards Required:"}
              </div>

              <div className="flex items-center gap-2">
                <div
                  data-testid="hero-stars-total-required"
                  className="text-xl sm:text-2xl font-heading font-black text-foreground"
                >
                  {result.requiredShards.toLocaleString()}{" "}
                  <span className="text-xs font-bold text-amber-500">
                    {locale === "vi" ? "Mảnh" : "Shards"}
                  </span>
                </div>

                {/* Nút Icon [i] hiển thị Bảng Chi Tiết Từng Ngôi Sao */}
                {result.starStepsBreakdown.length > 0 && (
                  <button
                    type="button"
                    data-testid="toggle-star-breakdown-btn"
                    onClick={() => setIsBreakdownOpen((prev) => !prev)}
                    title={
                      locale === "vi"
                        ? "Xem bảng chi tiết từng ngôi sao"
                        : "View step-by-step star breakdown"
                    }
                    aria-label={
                      locale === "vi"
                        ? "Xem bảng chi tiết từng ngôi sao"
                        : "View step-by-step star breakdown"
                    }
                    className={cn(
                      "inline-flex h-7 w-7 items-center justify-center rounded-full border transition-colors cursor-pointer",
                      isBreakdownOpen
                        ? "border-amber-500 bg-amber-500 text-slate-950"
                        : "border-amber-500/40 bg-amber-500/15 text-amber-600 dark:text-amber-300 hover:bg-amber-500/25"
                    )}
                  >
                    <Info className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              <div
                data-testid="hero-stars-universal-shard-name"
                className="text-xs font-heading font-bold text-muted-foreground truncate"
              >
                {universalShardName}
              </div>
            </div>
          </div>

          {/* Card B: Compact Owned Shards Input -> Missing Shards */}
          <div className="rounded-xl border border-border/80 bg-background/85 p-3.5 flex flex-col justify-center gap-2">
            <div className="flex items-center justify-between gap-2">
              <label
                htmlFor="hero-stars-owned-shards-input"
                className="text-xs font-heading font-bold text-foreground"
              >
                {locale === "vi" ? "Đang có trong túi:" : "In inventory:"}
              </label>

              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono uppercase text-muted-foreground">
                  {result.missingShards > 0
                    ? locale === "vi"
                      ? "Thiếu:"
                      : "Missing:"
                    : locale === "vi"
                      ? "Dư:"
                      : "Surplus:"}
                </span>
                <span
                  data-testid="hero-stars-missing-value"
                  className={cn(
                    "text-sm font-heading font-black",
                    result.missingShards > 0
                      ? "text-rose-500"
                      : "text-emerald-500"
                  )}
                >
                  {result.missingShards > 0
                    ? `${result.missingShards.toLocaleString()} ${locale === "vi" ? "mảnh" : "shards"}`
                    : `+${result.surplusShards.toLocaleString()} ${locale === "vi" ? "mảnh" : "shards"}`}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Input
                id="hero-stars-owned-shards-input"
                data-testid="hero-stars-owned-input"
                type="number"
                min={0}
                max={999999}
                value={ownedInput}
                onChange={(e) => setOwnedInput(e.target.value)}
                className="h-9 rounded-lg font-mono font-bold text-xs max-w-[130px]"
              />
              <div className="flex-1 space-y-1">
                <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-300"
                    style={{ width: `${result.completionPercent}%` }}
                  />
                </div>
                <div className="text-right font-mono text-[10px] text-muted-foreground">
                  {result.completionPercent}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Collapsible Popover / Drawer for Step-by-Step Star Breakdown (Only visible when [i] is clicked) */}
        {isBreakdownOpen && result.starStepsBreakdown.length > 0 && (
          <div
            data-testid="star-breakdown-popover"
            className="rounded-xl border border-border/80 bg-background/95 p-3.5 space-y-2.5 shadow-md"
          >
            <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-2">
              <h3 className="text-xs font-mono font-extrabold uppercase tracking-wider text-foreground">
                {locale === "vi"
                  ? `Bảng Chi Tiết Từng Ngôi Sao (${formatStarPositionSummary(result.fromState, locale)} ➔ ${formatStarPositionSummary(result.toState, locale)})`
                  : `Step-by-Step Star Breakdown (${formatStarPositionSummary(result.fromState, locale)} ➔ ${formatStarPositionSummary(result.toState, locale)})`}
              </h3>
              <button
                type="button"
                data-testid="close-star-breakdown-btn"
                onClick={() => setIsBreakdownOpen(false)}
                aria-label={
                  locale === "vi" ? "Đóng bảng chi tiết" : "Close breakdown"
                }
                className="inline-flex h-6 w-6 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-1.5 max-h-64 overflow-y-auto pr-1">
              {result.starStepsBreakdown.map((step) => {
                const badgeClass =
                  step.colorTier === "gold"
                    ? "border-amber-500/40 bg-amber-500/15 text-amber-600 dark:text-amber-300"
                    : step.colorTier === "red"
                      ? "border-rose-500/40 bg-rose-500/15 text-rose-600 dark:text-rose-300"
                      : "border-slate-400/60 bg-slate-200/70 dark:bg-slate-400/20 text-slate-800 dark:text-slate-100";

                return (
                  <div
                    key={step.overallStarNumber}
                    className="rounded-xl border border-border/70 bg-card/75 px-3 py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5"
                  >
                    <div className="space-y-0.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={cn(
                            "rounded-md border px-2 py-0.5 font-mono text-[11px] font-bold",
                            badgeClass
                          )}
                        >
                          {step.starLabel[locale]}
                        </span>
                        <span className="font-mono text-[11px] text-muted-foreground">
                          {locale === "vi"
                            ? `${step.petalsUsed}/5 cánh (Cánh ${step.startPetalInStar}➔${step.endPetalInStar}) × ${step.costPerPetal}`
                            : `${step.petalsUsed}/5 petals (P${step.startPetalInStar}➔${step.endPetalInStar}) × ${step.costPerPetal}`}
                        </span>
                      </div>

                      {step.milestoneNote && (
                        <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="h-3 w-3 shrink-0" />
                          <span>{step.milestoneNote[locale]}</span>
                        </div>
                      )}
                    </div>

                    <div className="font-heading text-xs font-black text-foreground sm:text-right shrink-0">
                      +{step.starTotalShards.toLocaleString()}{" "}
                      {locale === "vi" ? "mảnh" : "shards"}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ArrowLeft,
  X,
} from "lucide-react";
import {
  HERO_STAR_RARITY_CONFIGS,
  HERO_STAR_PETAL_COSTS,
  HERO_STAR_MILESTONES,
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
import { CalculatorInfoPopover } from "./calculator-info-popover";
import {
  CALC_MD3,
  CalculatorToolHeader,
} from "./calculator-md3-primitives";
import {
  cn,
  formatCompactNumber,
  formatExactNumber,
  parseCompactNumberInput,
} from "@/lib/utils";

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

  // Trạng thái đóng/mở luồng chọn nối tiếp (Phẩm chất -> Tướng -> Ẩn)
  const [pickerStep, setPickerStep] = useState<SequentialPickerStep>("closed");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPickerStep("closed");
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
    setPickerStep("hero");
  };

  const handlePickHeroInSequence = (heroId: string) => {
    setSelectedHeroId(heroId);
    setPickerStep("closed");
  };

  const parsedOwnedShards = useMemo(
    () => parseCompactNumberInput(ownedInput),
    [ownedInput]
  );

  const result = useMemo(
    () =>
      calculateHeroStarUpgrade({
        rarity,
        costProfile,
        fromPetalIndex,
        toPetalIndex,
        ownedShards: parsedOwnedShards,
      }),
    [rarity, costProfile, fromPetalIndex, toPetalIndex, parsedOwnedShards]
  );

  const fullStarReferenceRows = useMemo(() => {
    const petalCosts = HERO_STAR_PETAL_COSTS[rarity][costProfile];
    let cumulative = 0;
    return petalCosts.map((costPerPetal, idx) => {
      const overallStar = idx + 1;
      const starTotal = costPerPetal * 5;
      cumulative += starTotal;
      const tier =
        overallStar <= 5 ? "gold" : overallStar <= 10 ? "red" : "silver";
      const numInTier = ((overallStar - 1) % 5) + 1;
      const label =
        tier === "gold"
          ? locale === "vi"
            ? `${numInTier}★ Vàng`
            : `${numInTier}★ Gold`
          : tier === "red"
            ? locale === "vi"
              ? `${numInTier}★ Đỏ`
              : `${numInTier}★ Red`
            : locale === "vi"
              ? `${numInTier}★ Bạc`
              : `${numInTier}★ Silver`;
      return {
        overallStar,
        tier,
        label,
        costPerPetal,
        starTotal,
        cumulative,
        milestone: HERO_STAR_MILESTONES[overallStar],
      };
    });
  }, [rarity, costProfile, locale]);

  const universalShardName =
    locale === "vi"
      ? result.universalShard.nameVi
      : result.universalShard.nameEn;

  const activeHeroName = activeHero
    ? locale === "vi"
      ? activeHero.nameVi
      : activeHero.nameEn
    : "";

  const shardUnitLower = locale === "vi" ? "mảnh" : "shards";
  const breakdownLabel =
    locale === "vi"
      ? "Bảng chi tiết 15 bậc sao & ghi chú mốc mở khóa"
      : "15-star breakdown table & milestone notes";

  return (
    <div data-testid="hero-stars-calculator" className="space-y-4">
      {/* 1. Flat MD3 Tool Header + Nút (i) CalculatorInfoPopover */}
      <CalculatorToolHeader
        code={tool.code}
        title={tool.title[locale].replace(`${tool.code} `, "")}
        actions={
          <>
            {rarityConfig.supportsProfileToggle ? (
              <div className="flex items-center gap-1 rounded-xl bg-muted/50 p-1">
                <button
                  type="button"
                  data-testid="cost-profile-standard-btn"
                  onClick={() => setCostProfile("standard")}
                  className={cn(
                    CALC_MD3.chipButton,
                    "min-w-[44px] px-3 font-mono",
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
                    CALC_MD3.chipButton,
                    "min-w-[44px] px-3 font-mono",
                    costProfile === "legacy_500"
                      ? "bg-amber-500 text-slate-950"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  500
                </button>
              </div>
            ) : null}

            <button
              type="button"
              data-testid="hero-stars-reset-full-btn"
              onClick={() => {
                setFromPetalIndex(0);
                setToPetalIndex(75);
                setOwnedInput("0");
              }}
              className={cn(
                CALC_MD3.chipButton,
                "bg-muted/50 font-mono text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <RotateCcw className="h-4 w-4 text-amber-500" aria-hidden="true" />
              <span>0★ ➔ 15★</span>
            </button>

            <CalculatorInfoPopover
              triggerTestId="toggle-star-breakdown-btn"
              title={
                locale === "vi"
                  ? `Bảng Chi Tiết 15 Bậc Sao (${rarityConfig.shortLabel.vi})`
                  : `15-Star Tier Breakdown (${rarityConfig.shortLabel.en})`
              }
              triggerLabel={breakdownLabel}
              locale={locale}
              dialogTestId="star-breakdown-dialog"
            >
              <div data-testid="star-breakdown-popover" className="space-y-4">
                {/* Ghi chú chiến thuật & mốc mở khóa */}
                <div className={cn(CALC_MD3.tonalGroup, "space-y-1.5 text-xs")}>
                  <p className="font-heading font-bold text-foreground">
                    {locale === "vi"
                      ? "Ghi chú mốc mở khóa Kỹ năng & Thiên Phú:"
                      : "Skill & Hero Trait Unlock Milestones:"}
                  </p>
                  <ul className="list-disc space-y-1 pl-4 text-muted-foreground">
                    <li>
                      {locale === "vi"
                        ? "1★ Đỏ (Sao thứ 6): Mở khóa kỹ năng đột phá tầng Sao Đỏ."
                        : "1★ Red (6th Star): Unlocks Red Star breakthrough skill."}
                    </li>
                    <li>
                      {locale === "vi"
                        ? "2★ Bạc (Sao thứ 12): Mở khóa Thiên Phú thứ 3 (Ô Thiên Phú) — mốc quan trọng cho cả tướng chiến đấu và tướng kinh tế."
                        : "2★ Silver (12th Star): Unlocks 3rd Hero Talent (Trait Slot) — key milestone for combat and economy heroes."}
                    </li>
                    <li>
                      {locale === "vi"
                        ? "5★ Bạc (Sao thứ 15 / 75 cánh): Hoàn tất 15★ — Mở khóa Lâu Đài Vinh Quang & Linh Thể Anh Hùng."
                        : "5★ Silver (15th Star / 75 petals): Max 15★ — Unlocks Castle of Glory & Heroic Spirit."}
                    </li>
                    <li>
                      {locale === "vi"
                        ? "Tổng mảnh chuẩn từ 0★ ➔ 5★ Bạc: Tướng Đỏ = 1,000 Mảnh Cam • Tướng Vàng = 500 Mảnh Cam • Tướng Tím = 470 Mảnh Tím (hoặc 500 ở bản cũ) • Tướng Lam = 290 Mảnh Lam."
                        : "Total shards from 0★ to 5★ Silver: Mythic = 1,000 Legendary Shards • Legendary = 500 Legendary Shards • Epic = 470 Epic Shards (or 500 legacy) • Rare = 290 Rare Shards."}
                    </li>
                  </ul>
                </div>

                {/* Chặng đang chọn */}
                {result.starStepsBreakdown.length > 0 ? (
                  <div className="space-y-2">
                    <h4 className="text-sm font-heading font-bold text-foreground">
                      {locale === "vi"
                        ? `Lộ trình đang chọn (${formatStarPositionSummary(result.fromState, locale)} ➔ ${formatStarPositionSummary(result.toState, locale)})`
                        : `Selected Upgrade Route (${formatStarPositionSummary(result.fromState, locale)} ➔ ${formatStarPositionSummary(result.toState, locale)})`}
                    </h4>
                    <ol
                      data-testid="star-breakdown-list"
                      className={cn(CALC_MD3.dividedList, "max-h-60 overflow-y-auto")}
                    >
                      {result.starStepsBreakdown.map((step) => {
                        const badgeClass =
                          step.colorTier === "gold"
                            ? "bg-amber-500/15 text-amber-700 dark:text-amber-300"
                            : step.colorTier === "red"
                              ? "bg-rose-500/15 text-rose-700 dark:text-rose-300"
                              : "bg-slate-200/80 text-slate-800 dark:bg-slate-400/20 dark:text-slate-100";
                        const formula =
                          locale === "vi"
                            ? `${step.petalsUsed}/5 cánh (Cánh ${step.startPetalInStar}➔${step.endPetalInStar}) × ${step.costPerPetal}`
                            : `${step.petalsUsed}/5 petals (P${step.startPetalInStar}➔${step.endPetalInStar}) × ${step.costPerPetal}`;

                        return (
                          <li
                            key={step.overallStarNumber}
                            className="flex flex-col justify-between gap-1.5 py-2 sm:flex-row sm:items-center"
                          >
                            <div className="space-y-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <span
                                  className={cn(
                                    "rounded-md px-2 py-0.5 text-xs font-sans font-bold",
                                    badgeClass
                                  )}
                                >
                                  {step.starLabel[locale]}
                                </span>
                                <span className="text-xs font-sans text-muted-foreground">
                                  {formula}
                                </span>
                              </div>
                              {step.milestoneNote ? (
                                <div className="flex items-start gap-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                                  <CheckCircle2
                                    className="mt-0.5 h-3.5 w-3.5 shrink-0"
                                    aria-hidden="true"
                                  />
                                  <span>{step.milestoneNote[locale]}</span>
                                </div>
                              ) : null}
                            </div>
                            <div className="shrink-0 text-sm font-heading font-black text-foreground sm:text-right">
                              <span className="font-mono tabular-nums">
                                +{formatExactNumber(step.starTotalShards)}
                              </span>{" "}
                              {shardUnitLower}
                            </div>
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                ) : null}

                {/* Bảng chuẩn 15 ngôi sao */}
                <div className="space-y-2">
                  <h4 className="text-sm font-heading font-bold text-foreground">
                    {locale === "vi"
                      ? "Bảng Tra Cứu Chuẩn 15 Ngôi Sao (0★ ➔ 5★ Bạc)"
                      : "Full 15-Star Reference Table (0★ ➔ 5★ Silver)"}
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[480px] border-collapse text-left text-xs">
                      <thead>
                        <tr className="border-b border-border/70 bg-muted/40 font-sans font-semibold text-muted-foreground">
                          <th className="py-2 px-2.5">
                            {locale === "vi" ? "Bậc Sao" : "Star Tier"}
                          </th>
                          <th className="py-2 px-2.5 text-right">
                            {locale === "vi" ? "Mảnh / Cánh" : "Per Petal"}
                          </th>
                          <th className="py-2 px-2.5 text-right">
                            {locale === "vi" ? "Tổng 1 Sao (5 Cánh)" : "Star Total"}
                          </th>
                          <th className="py-2 px-2.5 text-right">
                            {locale === "vi" ? "Tích Lũy" : "Cumulative"}
                          </th>
                          <th className="py-2 px-2.5">
                            {locale === "vi" ? "Mốc Mở Khóa" : "Milestone"}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/50 font-sans tabular-nums">
                        {fullStarReferenceRows.map((row) => (
                          <tr key={row.overallStar} className="hover:bg-muted/30">
                            <td className="py-2 px-2.5 font-bold text-foreground">
                              {row.label}
                            </td>
                            <td className="py-2 px-2.5 text-right font-mono text-muted-foreground">
                              {row.costPerPetal}
                            </td>
                            <td className="py-2 px-2.5 text-right font-mono font-bold text-amber-600 dark:text-amber-400">
                              +{row.starTotal}
                            </td>
                            <td className="py-2 px-2.5 text-right font-mono font-bold text-foreground">
                              {formatExactNumber(row.cumulative)}
                            </td>
                            <td className="py-2 px-2.5 text-muted-foreground">
                              {row.milestone ? row.milestone[locale] : "—"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CalculatorInfoPopover>
          </>
        }
      />

      {/* 2. Main 3-Zone Workspace: [Bậc Sao Hiện Tại] ⟷ [Avatar Tướng Trung Tâm] ⟷ [Bậc Sao Muốn Đạt] */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-4">
        {/* Left: Current Star Level */}
        <div className="order-2 lg:order-1 min-w-0">
          <HeroStarPetalSelector
            idPrefix="from"
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
            aria-expanded={pickerStep !== "closed"}
            onClick={() =>
              setPickerStep((prev) => (prev === "closed" ? "rarity" : "closed"))
            }
            className="group flex min-h-[44px] flex-col items-center gap-1.5 rounded-2xl border border-amber-500/40 bg-amber-500/[0.06] px-4 py-3 shadow-sm hover:border-amber-500 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40"
          >
            {activeHero ? (
              <GameAssetFrame
                src={activeHero.iconPath}
                alt={activeHeroName}
                rarity={rarity}
                faction={activeHero.faction}
                size="lg"
              />
            ) : null}

            {/* DUY NHẤT 1 VỊ TRÍ HIỂN THỊ TÊN TƯỚNG DƯỚI AVATAR */}
            <div className="text-center max-w-[160px]">
              <div
                data-testid="central-hero-name"
                className="text-sm sm:text-base font-heading font-black text-foreground leading-tight"
              >
                {activeHeroName}
              </div>
              <div className="mt-0.5 inline-flex items-center gap-1 text-xs font-sans font-bold text-amber-700 dark:text-amber-400">
                <span>{rarityConfig.shortLabel[locale]}</span>
                <ChevronDown
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5"
                  aria-hidden="true"
                />
              </div>
            </div>
          </button>

          {/* Sequential Overlay: Step 1 (Select Rarity) -> Step 2 (Select Hero) -> Auto Close */}
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
                    data-testid="picker-back-to-rarity-btn"
                    onClick={() => setPickerStep("rarity")}
                    className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl px-2 text-sm font-heading font-bold text-amber-600 hover:bg-amber-500/10 dark:text-amber-400 cursor-pointer"
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    <span>
                      {locale === "vi" ? "Chọn lại phẩm chất" : "Change Rarity"}
                    </span>
                  </button>
                ) : (
                  <span className="text-sm font-heading font-bold text-foreground">
                    {locale === "vi"
                      ? "Bước 1: Chọn Phẩm Chất Tướng"
                      : "Step 1: Select Hero Rarity"}
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
                          CALC_MD3.tonalTile,
                          "flex min-h-[56px] items-center gap-2.5 p-2.5 text-left",
                          isSelected ? CALC_MD3.tileSelected : null
                        )}
                      >
                        <GameAssetFrame
                          src={cfg.universalShard.iconPath}
                          alt={shardName}
                          rarity={cfg.universalShard.rarity}
                          size="sm"
                        />
                        <div className="min-w-0">
                          <div className="truncate text-sm font-heading font-bold text-foreground">
                            {cfg.shortLabel[locale]}
                          </div>
                          <div className="text-xs font-sans text-amber-700 dark:text-amber-400">
                            <span className="font-mono">{cfg.totalShardsStandard}</span>{" "}
                            {shardUnitLower}
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
                      ? `Bước 2: Chọn Avatar ${rarityConfig.shortLabel.vi}`
                      : `Step 2: Pick ${rarityConfig.shortLabel.en} Hero`}
                  </div>
                  <div className="grid max-h-56 grid-cols-3 gap-2 overflow-y-auto pr-1 sm:grid-cols-4">
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
                            CALC_MD3.tonalTile,
                            "flex min-h-[44px] flex-col items-center gap-1 p-1.5",
                            isHeroActive ? CALC_MD3.tileSelected : null
                          )}
                        >
                          <GameAssetFrame
                            src={h.iconPath}
                            alt={hName}
                            rarity={h.rarity}
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

        {/* Right: Target Star Level */}
        <div className="order-3 min-w-0">
          <HeroStarPetalSelector
            idPrefix="to"
            title={locale === "vi" ? "Bậc Sao Muốn Đạt" : "Target Star Level"}
            petalIndex={toPetalIndex}
            costPerPetal={result.targetCostPerPetal}
            cumulativeShards={result.targetCumulativeShards}
            locale={locale}
            onChangePetalIndex={setToPetalIndex}
          />
        </div>
      </div>

      {/* 3. Thẻ Nguyên Liệu Chuẩn 3 Cột R5 (1 lớp surfaceCard duy nhất) */}
      <section
        data-testid="hero-stars-result-section"
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
            data-testid="hero-stars-invalid-range-alert"
            role="alert"
            className="flex flex-col items-start justify-between gap-2.5 rounded-xl bg-amber-500/10 p-3 sm:flex-row sm:items-center"
          >
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" aria-hidden="true" />
              <p className="text-sm font-medium text-foreground">
                {locale === "vi"
                  ? "Bậc sao muốn đạt đang thấp hơn hoặc bằng bậc sao hiện tại."
                  : "Target star level is less than or equal to current star level."}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setToPetalIndex(Math.min(75, fromPetalIndex + 5))}
              className={cn(
                CALC_MD3.chipButton,
                "shrink-0 bg-amber-500 px-4 font-heading font-bold text-slate-950 hover:bg-amber-400"
              )}
            >
              {locale === "vi" ? "+1 Ngôi Sao" : "+1 Star"}
            </button>
          </div>
        ) : null}

        {/* Header nguyên liệu */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <GameAssetFrame
              src={result.universalShard.iconPath}
              alt={universalShardName}
              rarity={result.universalShard.rarity}
              size="md"
            />
            <div>
              <div
                data-testid="hero-stars-universal-shard-name"
                className="text-base font-heading font-black text-foreground"
              >
                {universalShardName}
              </div>
              <div className="text-xs font-sans text-muted-foreground">
                {formatStarPositionSummary(result.fromState, locale)} ➔{" "}
                {formatStarPositionSummary(result.toState, locale)}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-sans text-muted-foreground">
            <span>
              {locale === "vi" ? "Tiến độ kho:" : "Inventory progress:"}
            </span>
            <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
              {result.completionPercent}%
            </span>
          </div>
        </div>

        {/* 3 cột ngang chuẩn R5: Số lượng yêu cầu | Số lượng đang có | Số lượng còn thiếu */}
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
          {/* Cột 1: Số lượng yêu cầu */}
          <div className={cn(CALC_MD3.tonalGroup, "flex flex-col justify-between gap-1")}>
            <span className={CALC_MD3.eyebrow}>
              {locale === "vi" ? "Số lượng yêu cầu" : "Required"}
            </span>
            <div className="flex items-baseline gap-1.5">
              <span
                data-testid="hero-stars-total-required"
                title={formatExactNumber(result.requiredShards)}
                className="font-mono text-xl font-black tabular-nums text-amber-600 dark:text-amber-400"
              >
                {formatCompactNumber(result.requiredShards)}
              </span>
              <span className="text-xs font-sans font-semibold text-muted-foreground">
                {locale === "vi" ? "Mảnh" : "Shards"}
              </span>
            </div>
            <span className="text-xs font-sans text-muted-foreground">
              {locale === "vi"
                ? `Chính xác: ${formatExactNumber(result.requiredShards)} ${shardUnitLower}`
                : `Exact: ${formatExactNumber(result.requiredShards)} ${shardUnitLower}`}
            </span>
          </div>

          {/* Cột 2: Số lượng đang có */}
          <div className={cn(CALC_MD3.tonalGroup, "flex flex-col justify-between gap-1.5")}>
            <label
              htmlFor="hero-stars-owned-shards-input"
              className={CALC_MD3.eyebrow}
            >
              {locale === "vi" ? "Số lượng đang có" : "Owned"}
            </label>
            <Input
              id="hero-stars-owned-shards-input"
              data-testid="hero-stars-owned-input"
              type="text"
              inputMode="decimal"
              value={ownedInput}
              onChange={(e) => setOwnedInput(e.target.value)}
              placeholder={locale === "vi" ? "0 (VD: 1.5K)" : "0 (e.g. 1.5K)"}
              className={CALC_MD3.dataInput}
            />
            <span className="text-xs font-sans text-muted-foreground">
              {locale === "vi"
                ? "Gõ số thường hoặc 1.5K, 2M"
                : "Type exact or 1.5K, 2M"}
            </span>
          </div>

          {/* Cột 3: Số lượng còn thiếu */}
          <div
            className={cn(
              CALC_MD3.tonalGroup,
              "flex flex-col justify-between gap-1",
              result.missingShards > 0
                ? "bg-amber-500/10 ring-1 ring-amber-500/35"
                : "bg-emerald-500/10 ring-1 ring-emerald-500/35"
            )}
          >
            <span className={CALC_MD3.eyebrow}>
              {locale === "vi" ? "Số lượng còn thiếu" : "Missing"}
            </span>
            {result.missingShards > 0 ? (
              <>
                <div className="flex items-baseline gap-1.5">
                  <span
                    data-testid="hero-stars-missing-value"
                    title={formatExactNumber(result.missingShards)}
                    className="font-mono text-xl font-black tabular-nums text-rose-600 dark:text-rose-400"
                  >
                    {formatCompactNumber(result.missingShards)}
                  </span>
                  <span className="text-xs font-sans font-semibold text-rose-600/80 dark:text-rose-300">
                    {shardUnitLower}
                  </span>
                </div>
                <span className="text-xs font-sans text-muted-foreground">
                  {locale === "vi"
                    ? `Cần bù: ${formatExactNumber(result.missingShards)} ${shardUnitLower}`
                    : `Need: ${formatExactNumber(result.missingShards)} ${shardUnitLower}`}
                </span>
              </>
            ) : (
              <>
                <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                  <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span
                    data-testid="hero-stars-missing-value"
                    className="text-base font-heading font-black tabular-nums"
                  >
                    {locale === "vi" ? "Đủ nguyên liệu" : "Sufficient"}
                  </span>
                </div>
                <span className="text-xs font-sans text-emerald-700/80 dark:text-emerald-300">
                  {locale === "vi"
                    ? `Dư +${formatCompactNumber(result.surplusShards)} (${formatExactNumber(result.surplusShards)} ${shardUnitLower})`
                    : `Surplus +${formatCompactNumber(result.surplusShards)} (${formatExactNumber(result.surplusShards)} ${shardUnitLower})`}
                </span>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

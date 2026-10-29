"use client";

import React, { useState, useMemo } from "react";
import {
  Sparkles,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Database,
  ChevronRight,
  Users,
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

const QUICK_PRESETS: readonly {
  readonly id: string;
  readonly label: Record<CalculatorLocale, string>;
  readonly rarity?: HeroStarRarity;
  readonly heroId?: string;
  readonly fromPetal: number;
  readonly toPetal: number;
}[] = [
  {
    id: "desert-prince-1-1-to-1-silver",
    label: {
      vi: "Ví dụ: Hoàng Tử Sa Mạc (1★ Vàng + 1 Cánh ➔ 1★ Bạc = 548 mảnh)",
      en: "Example: Desert Prince (1★ Gold + 1P ➔ 1★ Silver = 548 shards)",
    },
    rarity: "mythic",
    heroId: "hero-desert-prince",
    fromPetal: 6,
    toPetal: 55,
  },
  {
    id: "desert-prince-1-2-to-1-silver",
    label: {
      vi: "Ví dụ: Hoàng Tử Sa Mạc (1★ Vàng + 2 Cánh ➔ 1★ Bạc = 546 mảnh)",
      en: "Example: Desert Prince (1★ Gold + 2P ➔ 1★ Silver = 546 shards)",
    },
    rarity: "mythic",
    heroId: "hero-desert-prince",
    fromPetal: 7,
    toPetal: 55,
  },
  {
    id: "target-1-red",
    label: {
      vi: "Đích: 1★ Đỏ (Mở Skill 5)",
      en: "Target: 1★ Red (5th Skill)",
    },
    fromPetal: 0,
    toPetal: 30,
  },
  {
    id: "target-1-silver",
    label: {
      vi: "Đích: 1★ Bạc (+30% Skill)",
      en: "Target: 1★ Silver (+30% Skill)",
    },
    fromPetal: 0,
    toPetal: 55,
  },
  {
    id: "target-2-silver-trait3",
    label: {
      vi: "Đích: 2★ Bạc (Mở Trait 3 Kinh Tế)",
      en: "Target: 2★ Silver (Economy Trait 3)",
    },
    fromPetal: 0,
    toPetal: 60,
  },
  {
    id: "target-5-silver-max",
    label: {
      vi: "Đích: 5★ Bạc (Max 15★)",
      en: "Target: 5★ Silver (Max 15★)",
    },
    fromPetal: 0,
    toPetal: 75,
  },
];

export function HeroStarsCalculator({
  tool,
  locale,
}: HeroStarsCalculatorProps) {
  // Mặc định mở sẵn bài toán mẫu Hoàng Tử Sa Mạc từ 1★ Vàng + 1 Cánh (nấc 6) -> 1★ Bạc (nấc 55)
  const [rarity, setRarity] = useState<HeroStarRarity>("mythic");
  const [costProfile, setCostProfile] =
    useState<HeroStarCostProfile>("standard");
  const [selectedHeroId, setSelectedHeroId] = useState<string>(
    HERO_STAR_RARITY_CONFIGS.mythic.defaultHeroId
  );
  const [fromPetalIndex, setFromPetalIndex] = useState<number>(6);
  const [toPetalIndex, setToPetalIndex] = useState<number>(55);
  const [ownedInput, setOwnedInput] = useState<string>("0");

  const heroesForRarity = useMemo(() => getHeroesByRarity(rarity), [rarity]);

  const activeHero = useMemo(() => {
    return (
      heroesForRarity.find((h) => h.id === selectedHeroId) ?? heroesForRarity[0]
    );
  }, [heroesForRarity, selectedHeroId]);

  const rarityConfig = HERO_STAR_RARITY_CONFIGS[rarity];

  const handleSelectRarity = (nextRarity: HeroStarRarity) => {
    setRarity(nextRarity);
    setSelectedHeroId(HERO_STAR_RARITY_CONFIGS[nextRarity].defaultHeroId);
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
    <div data-testid="hero-stars-calculator" className="space-y-6">
      {/* Hero Header Card */}
      <section className="card-rpg relative overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-card to-card p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-300">
            <Sparkles className="w-3.5 h-3.5" />
            {locale === "vi" ? "Công cụ tương tác" : "Interactive Calculator"}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/80 border border-border px-3 py-1 text-xs font-mono font-bold text-muted-foreground">
            <Layers className="w-3.5 h-3.5 text-amber-500" />
            Phase {tool.phaseNumber} • {tool.code}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-xs font-mono text-amber-600 dark:text-amber-400">
            <Database className="w-3.5 h-3.5" />
            {tool.dataSourceTab[locale]}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-heading font-black tracking-tight text-foreground mb-2">
          {tool.fullTitle[locale]}
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          {tool.summary[locale]}
        </p>
      </section>

      {/* STEP 1: Select Hero Rarity & Representative Hero */}
      <section className="rounded-3xl border border-border/80 bg-card/65 p-5 sm:p-6 space-y-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="text-[11px] font-mono font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              {locale === "vi"
                ? "Bước 1 • Phẩm Chất & Anh Hùng Đại Diện"
                : "Step 1 • Hero Rarity & Representative Hero"}
            </span>
            <h2 className="text-lg font-heading font-black text-foreground">
              {locale === "vi"
                ? "Chọn Phẩm Chất Tướng (Đỏ / Vàng / Tím / Xanh)"
                : "Select Hero Rarity (Mythic / Legendary / Epic / Rare)"}
            </h2>
          </div>

          {rarityConfig.supportsProfileToggle && (
            <div className="flex items-center gap-1.5 rounded-xl border border-border/80 bg-background/70 p-1">
              <button
                type="button"
                data-testid="cost-profile-standard-btn"
                onClick={() => setCostProfile("standard")}
                className={cn(
                  "rounded-lg px-2.5 py-1.5 text-xs font-mono font-bold transition-colors cursor-pointer",
                  costProfile === "standard"
                    ? "bg-amber-500 text-slate-950"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {locale === "vi"
                  ? `Chuẩn (${rarityConfig.totalShardsStandard} mảnh)`
                  : `Standard (${rarityConfig.totalShardsStandard})`}
              </button>
              <button
                type="button"
                data-testid="cost-profile-legacy500-btn"
                onClick={() => setCostProfile("legacy_500")}
                className={cn(
                  "rounded-lg px-2.5 py-1.5 text-xs font-mono font-bold transition-colors cursor-pointer",
                  costProfile === "legacy_500"
                    ? "bg-amber-500 text-slate-950"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {locale === "vi" ? "Mốc 500 mảnh" : "500-Shard Scale"}
              </button>
            </div>
          )}
        </div>

        {/* 4 Rarity Cards with Representative Hero Avatar + Universal Shard Icon */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {RARITY_ORDER.map((rKey) => {
            const cfg = HERO_STAR_RARITY_CONFIGS[rKey];
            const isSelected = rarity === rKey;
            const repHeroes = getHeroesByRarity(rKey);
            const repHero =
              rKey === rarity && activeHero ? activeHero : repHeroes[0];
            const repName = repHero
              ? locale === "vi"
                ? repHero.nameVi
                : repHero.nameEn
              : "";
            const shardName =
              locale === "vi"
                ? cfg.universalShard.nameVi
                : cfg.universalShard.nameEn;

            return (
              <button
                key={rKey}
                type="button"
                data-testid={`rarity-card-${rKey}`}
                onClick={() => handleSelectRarity(rKey)}
                className={cn(
                  "flex flex-col justify-between gap-3 rounded-2xl border p-4 text-left transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40",
                  isSelected
                    ? "border-amber-500 bg-amber-500/10 shadow-sm ring-1 ring-amber-500/40"
                    : "border-border/70 bg-background/60 hover:border-amber-500/40"
                )}
              >
                <div className="flex items-center gap-3">
                  {repHero && (
                    <GameAssetFrame
                      src={repHero.iconPath}
                      alt={repName}
                      rarity={rKey}
                      faction={repHero.faction}
                      size="md"
                    />
                  )}
                  <div className="min-w-0">
                    <div className="text-xs font-heading font-black text-foreground truncate">
                      {cfg.label[locale]}
                    </div>
                    <div className="text-[11px] text-muted-foreground truncate">
                      {repName}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 pt-2 border-t border-border/50">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <GameAssetFrame
                      src={cfg.universalShard.iconPath}
                      alt={shardName}
                      rarity={cfg.universalShard.rarity}
                      size="sm"
                    />
                    <span className="text-[11px] font-medium text-foreground/90 truncate">
                      {shardName}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] font-bold text-amber-600 dark:text-amber-400 shrink-0">
                    {cfg.totalShardsStandard}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Hero Picker Strip for Active Rarity */}
        <div className="rounded-2xl border border-border/70 bg-background/60 p-3.5 space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-heading font-bold text-foreground">
            <Users className="h-4 w-4 text-amber-500" />
            <span>
              {locale === "vi"
                ? `Chọn tướng ${rarityConfig.shortLabel.vi} cụ thể để minh họa:`
                : `Pick a specific ${rarityConfig.shortLabel.en} hero:`}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 max-h-36 overflow-y-auto pr-1">
            {heroesForRarity.map((h) => {
              const hName = locale === "vi" ? h.nameVi : h.nameEn;
              const isHeroActive = activeHero?.id === h.id;
              return (
                <button
                  key={h.id}
                  type="button"
                  data-testid={`select-hero-${h.id}`}
                  onClick={() => setSelectedHeroId(h.id)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-xl border px-2.5 py-1.5 min-h-[38px] text-xs transition-all cursor-pointer",
                    isHeroActive
                      ? "border-amber-500 bg-amber-500/15 font-bold text-foreground"
                      : "border-border/60 bg-card/70 text-muted-foreground hover:text-foreground"
                  )}
                >
                  <GameAssetFrame
                    src={h.iconPath}
                    alt={hName}
                    rarity={h.rarity}
                    faction={h.faction}
                    size="xs"
                  />
                  <span className="truncate max-w-[160px]">{hName}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* STEP 2: Interactive Star & 5-Petal Selector (Current X -> Target Y) */}
      <section className="space-y-4">
        {/* Quick Presets Bar */}
        <div className="rounded-2xl border border-amber-500/25 bg-card/70 p-4 space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              {locale === "vi"
                ? "Bước 2 • Nạp Nhanh Bài Toán Mẫu & Điểm Gãy Chiến Thuật:"
                : "Step 2 • Quick Scenarios & Tactical Breakpoints:"}
            </span>
            <button
              type="button"
              onClick={() => {
                setFromPetalIndex(0);
                setToPetalIndex(75);
                setOwnedInput("0");
              }}
              className="inline-flex items-center gap-1 text-xs font-mono text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>
                {locale === "vi" ? "Đặt lại 0★ ➔ 15★" : "Reset 0★ ➔ 15★"}
              </span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {QUICK_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                data-testid={`preset-btn-${preset.id}`}
                onClick={() => {
                  if (preset.rarity) {
                    setRarity(preset.rarity);
                  }
                  if (preset.heroId) {
                    setSelectedHeroId(preset.heroId);
                  }
                  if (preset.id.startsWith("desert-prince")) {
                    setFromPetalIndex(preset.fromPetal);
                  }
                  setToPetalIndex(preset.toPetal);
                }}
                className="rounded-xl border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 px-3 py-2 min-h-[40px] text-xs font-medium text-foreground transition-colors cursor-pointer"
              >
                {preset.label[locale]}
              </button>
            ))}
          </div>
        </div>

        {/* Dual Selector Grid: Current Star (X) & Target Star (Y) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <HeroStarPetalSelector
            idPrefix="from"
            subtitle={
              locale === "vi" ? "Điểm Xuất Phát (X)" : "Starting Point (X)"
            }
            title={
              locale === "vi"
                ? "Bậc Sao & Cánh Sao Hiện Tại"
                : "Current Star & Petal Level"
            }
            petalIndex={fromPetalIndex}
            costPerPetal={result.currentCostPerPetal}
            cumulativeShards={result.alreadyInvestedShards}
            locale={locale}
            onChangePetalIndex={setFromPetalIndex}
          />

          <HeroStarPetalSelector
            idPrefix="to"
            subtitle={locale === "vi" ? "Mục Tiêu Đích (Y)" : "Target Goal (Y)"}
            title={
              locale === "vi"
                ? "Bậc Sao & Cánh Sao Muốn Đạt"
                : "Target Star & Petal Level"
            }
            petalIndex={toPetalIndex}
            costPerPetal={result.targetCostPerPetal}
            cumulativeShards={result.targetCumulativeShards}
            locale={locale}
            onChangePetalIndex={setToPetalIndex}
          />
        </div>
      </section>

      {/* STEP 3: Computed Resource Requirements & Step-by-Step Star Breakdown */}
      <section
        data-testid="hero-stars-result-section"
        className="rounded-3xl border border-amber-500/35 bg-gradient-to-br from-amber-500/10 via-card to-card p-5 sm:p-7 space-y-6 shadow-sm"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="text-[11px] font-mono font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              {locale === "vi"
                ? "Bước 3 • Kết Quả Định Lượng Chính Xác"
                : "Step 3 • Exact Resource Output"}
            </span>
            <h2 className="text-xl sm:text-2xl font-heading font-black text-foreground">
              {locale === "vi"
                ? `Tài Nguyên Cần Có Cho ${activeHeroName}`
                : `Required Resources for ${activeHeroName}`}
            </h2>
          </div>
        </div>

        {result.isInvalidRange ? (
          <div
            data-testid="hero-stars-invalid-range-alert"
            className="rounded-2xl border border-amber-500/40 bg-amber-500/10 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0" />
              <p className="text-xs sm:text-sm text-foreground font-medium">
                {locale === "vi"
                  ? "Bậc sao mục tiêu (Y) đang thấp hơn hoặc bằng bậc sao hiện tại (X). Hãy chọn mục tiêu cao hơn để tính số mảnh cần thêm."
                  : "Target star level (Y) is less than or equal to current level (X). Please pick a higher target star."}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setToPetalIndex(Math.min(75, fromPetalIndex + 5))}
              className="rounded-xl bg-amber-500 px-3.5 py-2 min-h-[42px] text-xs font-heading font-bold text-slate-950 shrink-0 cursor-pointer"
            >
              {locale === "vi"
                ? "Đặt mục tiêu +1 Ngôi Sao"
                : "Set Target +1 Star"}
            </button>
          </div>
        ) : null}

        {/* Main Resource Output & Inventory Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card A: Total Universal Shards Needed */}
          <div className="rounded-2xl border border-amber-500/40 bg-background/85 p-5 flex items-center gap-4 shadow-xs">
            <div className="relative shrink-0">
              <GameAssetFrame
                src={result.universalShard.iconPath}
                alt={universalShardName}
                rarity={result.universalShard.rarity}
                size="lg"
              />
              {activeHero && (
                <div className="absolute -bottom-1.5 -right-1.5">
                  <GameAssetFrame
                    src={activeHero.iconPath}
                    alt={activeHeroName}
                    rarity={activeHero.rarity}
                    faction={activeHero.faction}
                    size="xs"
                  />
                </div>
              )}
            </div>

            <div className="min-w-0 space-y-1">
              <div className="text-[11px] font-mono font-bold uppercase text-amber-600 dark:text-amber-400">
                {locale === "vi"
                  ? "Tổng số mảnh cần dùng (X ➔ Y):"
                  : "Total Shards Required (X ➔ Y):"}
              </div>
              <div
                data-testid="hero-stars-total-required"
                className="text-2xl sm:text-3xl font-heading font-black text-foreground"
              >
                {result.requiredShards.toLocaleString()}{" "}
                <span className="text-sm font-bold text-amber-500">
                  {locale === "vi" ? "Mảnh" : "Shards"}
                </span>
              </div>
              <div
                data-testid="hero-stars-universal-shard-name"
                className="text-xs font-heading font-bold text-foreground truncate"
              >
                {universalShardName}
              </div>
              <div className="text-[11px] text-muted-foreground">
                {rarityConfig.specificShardLabel[locale]} ({activeHeroName})
              </div>
            </div>
          </div>

          {/* Card B: Owned Shards Input -> Missing Shards Calculation */}
          <div className="rounded-2xl border border-border/80 bg-background/85 p-5 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <label
                htmlFor="hero-stars-owned-shards-input"
                className="text-xs font-heading font-bold text-foreground"
              >
                {locale === "vi"
                  ? "Số mảnh đang có trong túi đồ:"
                  : "Shards currently in inventory:"}
              </label>
              <span className="font-mono text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                {locale === "vi"
                  ? `Tiến độ đích: ${result.completionPercent}%`
                  : `Target progress: ${result.completionPercent}%`}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Input
                id="hero-stars-owned-shards-input"
                data-testid="hero-stars-owned-input"
                type="number"
                min={0}
                max={999999}
                value={ownedInput}
                onChange={(e) => setOwnedInput(e.target.value)}
                className="h-11 rounded-xl font-mono font-bold text-sm"
              />
              <div className="shrink-0 text-right">
                <div className="text-[10px] font-mono uppercase text-muted-foreground">
                  {result.missingShards > 0
                    ? locale === "vi"
                      ? "Còn thiếu"
                      : "Missing"
                    : locale === "vi"
                      ? "Đã đủ mảnh"
                      : "Surplus"}
                </div>
                <div
                  data-testid="hero-stars-missing-value"
                  className={cn(
                    "text-lg font-heading font-black",
                    result.missingShards > 0
                      ? "text-rose-500"
                      : "text-emerald-500"
                  )}
                >
                  {result.missingShards > 0
                    ? `${result.missingShards.toLocaleString()} ${locale === "vi" ? "mảnh" : "shards"}`
                    : `+${result.surplusShards.toLocaleString()} ${locale === "vi" ? "dư" : "extra"}`}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-2.5 w-full rounded-full bg-secondary overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-300"
                style={{ width: `${result.completionPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Step-by-Step Star Tier Breakdown Table */}
        {result.starStepsBreakdown.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono font-extrabold uppercase tracking-wider text-muted-foreground">
                {locale === "vi"
                  ? `Bảng Chi Tiết Từng Ngôi Sao (${formatStarPositionSummary(result.fromState, locale)} ➔ ${formatStarPositionSummary(result.toState, locale)})`
                  : `Step-by-Step Star Breakdown (${formatStarPositionSummary(result.fromState, locale)} ➔ ${formatStarPositionSummary(result.toState, locale)})`}
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {result.starStepsBreakdown.map((step) => {
                const badgeClass =
                  step.colorTier === "gold"
                    ? "border-amber-500/40 bg-amber-500/15 text-amber-600 dark:text-amber-300"
                    : step.colorTier === "red"
                      ? "border-rose-500/40 bg-rose-500/15 text-rose-600 dark:text-rose-300"
                      : "border-sky-400/40 bg-sky-500/15 text-sky-600 dark:text-sky-200";

                return (
                  <div
                    key={step.overallStarNumber}
                    className="rounded-2xl border border-border/75 bg-background/80 p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
                  >
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={cn(
                            "rounded-lg border px-2.5 py-0.5 font-mono text-xs font-bold",
                            badgeClass
                          )}
                        >
                          {step.starLabel[locale]}
                        </span>
                        <span className="font-mono text-xs text-muted-foreground">
                          {locale === "vi"
                            ? `Nâng ${step.petalsUsed}/5 cánh (Cánh ${step.startPetalInStar} ➔ ${step.endPetalInStar}) × ${step.costPerPetal} mảnh/cánh`
                            : `Upgrade ${step.petalsUsed}/5 petals (Petal ${step.startPetalInStar} ➔ ${step.endPetalInStar}) × ${step.costPerPetal}/petal`}
                        </span>
                      </div>

                      {step.milestoneNote && (
                        <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                          <span>{step.milestoneNote[locale]}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-3 sm:text-right shrink-0">
                      <div>
                        <div className="text-sm font-heading font-black text-foreground">
                          +{step.starTotalShards.toLocaleString()}{" "}
                          {locale === "vi" ? "mảnh" : "shards"}
                        </div>
                        <div className="text-[11px] font-mono text-muted-foreground">
                          {locale === "vi"
                            ? `Mốc tích lũy: ${step.cumulativeShardsAtStepEnd.toLocaleString()}`
                            : `Cumulative: ${step.cumulativeShardsAtStepEnd.toLocaleString()}`}
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground hidden sm:block" />
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

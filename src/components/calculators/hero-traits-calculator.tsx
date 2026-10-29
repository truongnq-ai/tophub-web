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
  ArrowLeftRight,
  Sparkles,
  ShieldAlert,
} from "lucide-react";
import {
  DIAMOND_COST_SLOT_4_UNLOCK,
  DIAMOND_COST_TRAIT_SWAP,
  TRAIT_RARITY_CONFIGS,
  calculateHeroTraitsUpgrade,
  getTraitHeroesByRarity,
  type TraitLevelsTuple,
  type TraitSlotIndex,
} from "@/content/calculators/hero-traits-data";
import type { HeroStarRarity } from "@/content/calculators/hero-stars-data";
import type {
  CalculatorCategory,
  CalculatorLocale,
  CalculatorToolItem,
  CalculatorZone,
} from "@/content/calculators/types";
import { GameAssetFrame } from "@/components/guides/media/game-asset-frame";
import { Input } from "@/components/ui/input";
import { HeroTraitSlotsSelector } from "./hero-trait-slots-selector";
import { cn } from "@/lib/utils";

interface HeroTraitsCalculatorProps {
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

export function HeroTraitsCalculator({
  tool,
  locale,
}: HeroTraitsCalculatorProps) {
  // Mặc định hiển thị Đấu Sĩ (Brawler - Epic) với Phễu Kinh Tế chuẩn: 0/0/0/0 -> 15/0/30/0 (450 Mảnh Tím, 0 Kim Cương)
  const [rarity, setRarity] = useState<HeroStarRarity>("epic");
  const [selectedHeroId, setSelectedHeroId] = useState<string>(
    TRAIT_RARITY_CONFIGS.epic.defaultHeroId
  );
  const [fromLevels, setFromLevels] = useState<TraitLevelsTuple>([0, 0, 0, 0]);
  const [toLevels, setToLevels] = useState<TraitLevelsTuple>([15, 0, 30, 0]);
  const [ownedShardsInput, setOwnedShardsInput] = useState<string>("0");
  const [ownedDiamondsInput, setOwnedDiamondsInput] = useState<string>("0");
  const [includeTraitSwap, setIncludeTraitSwap] = useState<boolean>(false);

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

  const heroesForRarity = useMemo(
    () => getTraitHeroesByRarity(rarity),
    [rarity]
  );

  const activeHero = useMemo(() => {
    return (
      heroesForRarity.find((h) => h.id === selectedHeroId) ?? heroesForRarity[0]
    );
  }, [heroesForRarity, selectedHeroId]);

  const rarityConfig = TRAIT_RARITY_CONFIGS[rarity];

  const handlePickRarityInSequence = (nextRarity: HeroStarRarity) => {
    setRarity(nextRarity);
    setSelectedHeroId(TRAIT_RARITY_CONFIGS[nextRarity].defaultHeroId);
    setPickerStep("hero");
  };

  const handlePickHeroInSequence = (heroId: string) => {
    setSelectedHeroId(heroId);
    setPickerStep("closed");
  };

  const handleUpdateFromSlot = (
    slotIndex: TraitSlotIndex,
    nextLevel: number
  ) => {
    setFromLevels((prev) => {
      const next: [number, number, number, number] = [...prev];
      next[slotIndex] = nextLevel;
      return next;
    });
  };

  const handleUpdateToSlot = (slotIndex: TraitSlotIndex, nextLevel: number) => {
    setToLevels((prev) => {
      const next: [number, number, number, number] = [...prev];
      next[slotIndex] = nextLevel;
      return next;
    });
  };

  const result = useMemo(
    () =>
      calculateHeroTraitsUpgrade({
        rarity,
        heroId: activeHero?.id ?? selectedHeroId,
        fromLevels,
        toLevels,
        ownedShards: Number(ownedShardsInput) || 0,
        ownedDiamonds: Number(ownedDiamondsInput) || 0,
        includeTraitSwap,
      }),
    [
      rarity,
      activeHero,
      selectedHeroId,
      fromLevels,
      toLevels,
      ownedShardsInput,
      ownedDiamondsInput,
      includeTraitSwap,
    ]
  );

  const shardMaterialName =
    locale === "vi"
      ? result.universalShardMaterial.nameVi
      : result.universalShardMaterial.nameEn;

  const diamondMaterialName =
    locale === "vi"
      ? result.diamondMaterial.nameVi
      : result.diamondMaterial.nameEn;

  const activeHeroName = activeHero
    ? locale === "vi"
      ? activeHero.nameVi
      : activeHero.nameEn
    : "";

  return (
    <div data-testid="hero-traits-calculator" className="space-y-4">
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

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            data-testid="traits-swap-toggle-btn"
            onClick={() => setIncludeTraitSwap((prev) => !prev)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-xs font-mono font-bold transition-colors cursor-pointer",
              includeTraitSwap
                ? "border-sky-500 bg-sky-500/20 text-sky-600 dark:text-sky-300"
                : "border-border/80 bg-background/70 hover:bg-secondary text-muted-foreground hover:text-foreground"
            )}
          >
            <ArrowLeftRight className="h-3.5 w-3.5 text-sky-500" />
            <span>
              {locale === "vi"
                ? "Trao Đổi (+2,000 KC)"
                : "Trait Swap (+2,000 Diamonds)"}
            </span>
          </button>

          <button
            type="button"
            data-testid="traits-reset-econ-btn"
            onClick={() => {
              setFromLevels([0, 0, 0, 0]);
              setToLevels([15, 0, 30, 0]);
              setOwnedShardsInput("0");
              setOwnedDiamondsInput("0");
              setIncludeTraitSwap(false);
            }}
            className="inline-flex items-center gap-1 rounded-xl border border-border/80 bg-background/70 hover:bg-secondary px-2.5 py-1.5 text-xs font-mono font-semibold text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5 text-amber-500" />
            <span>
              {locale === "vi" ? "Phễu Kinh Tế" : "Reset Econ Funnel"}
            </span>
          </button>
        </div>
      </div>

      {/* 2. Individual Trait 3 (Slot 3) Strategic Banner */}
      <div
        data-testid="hero-trait3-banner"
        className={cn(
          "rounded-2xl border p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3",
          result.heroProfile.category === "economy_24_7"
            ? "border-emerald-500/35 bg-emerald-500/[0.06]"
            : "border-amber-500/35 bg-amber-500/[0.06]"
        )}
      >
        <div className="space-y-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono text-[10px] font-extrabold uppercase tracking-wider",
                result.heroProfile.category === "economy_24_7"
                  ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/40"
                  : "bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/40"
              )}
            >
              <Sparkles className="h-3 w-3" />
              <span>
                {result.heroProfile.category === "economy_24_7"
                  ? locale === "vi"
                    ? "Thiên Phú Kinh Tế 24/7 (Có hiệu lực trong kho)"
                    : "24/7 Economy Trait (Active Without Deployment)"
                  : locale === "vi"
                    ? "Thiên Phú Chiến Đấu Đội Hình Chính"
                    : "Main Queue Combat Trait"}
              </span>
            </span>

            <span className="font-mono text-[11px] font-bold text-muted-foreground">
              {locale === "vi"
                ? `Điều kiện mở: 2★ Bạc (${result.starUnlockPrerequisiteShards} Mảnh tích lũy)`
                : `Unlock Req: 2★ Silver (${result.starUnlockPrerequisiteShards} cumulative Shards)`}
            </span>
          </div>

          <div className="text-xs sm:text-sm font-heading font-black text-foreground">
            {locale === "vi" ? "Ô 3 Độc Quyền:" : "Unique Slot 3:"}{" "}
            <span className="text-amber-600 dark:text-amber-400">
              {result.heroProfile.maxBonusLabel[locale]}
            </span>{" "}
            <span className="text-xs font-mono font-normal text-muted-foreground">
              ({result.heroProfile.perLevelBonusLabel[locale]})
            </span>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            {result.heroProfile.strategicNote[locale]}
          </p>
        </div>
      </div>

      {/* 3. Main 3-Zone Workspace: [Cấp Thiên Phú Hiện Tại] ⟷ [Avatar Tướng Trung Tâm] ⟷ [Cấp Thiên Phú Mục Tiêu] */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-start gap-3 sm:gap-4">
        {/* Left: Current Trait Slots */}
        <div className="order-2 lg:order-1 min-w-0">
          <HeroTraitSlotsSelector
            idPrefix="from"
            title={
              locale === "vi"
                ? "Cấp Thiên Phú Hiện Tại"
                : "Current Trait Levels"
            }
            levels={fromLevels}
            heroProfile={result.heroProfile}
            locale={locale}
            onChangeSlotLevel={handleUpdateFromSlot}
            onApplyPreset={setFromLevels}
          />
        </div>

        {/* Center: Hero Avatar Hub + Sequential Rarity -> Hero Picker */}
        <div
          data-testid="central-hero-avatar-hub"
          className="order-1 lg:order-2 relative flex flex-col items-center justify-center py-1 lg:px-1 lg:pt-8"
        >
          <button
            type="button"
            data-testid="central-hero-avatar-trigger"
            onClick={() =>
              setPickerStep((prev) =>
                prev === "closed" ? "rarity" : "closed"
              )
            }
            className="group flex flex-col items-center gap-1.5 rounded-2xl border border-amber-500/40 bg-gradient-to-b from-amber-500/15 via-card to-card px-4 py-3 shadow-sm hover:border-amber-500 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40"
          >
            {activeHero && (
              <GameAssetFrame
                src={activeHero.iconPath}
                alt={activeHeroName}
                rarity={activeHero.rarity}
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
                      {locale === "vi"
                        ? "1. Đổi phẩm chất"
                        : "1. Change Rarity"}
                    </span>
                  </button>
                ) : (
                  <span className="text-xs font-mono font-bold uppercase text-amber-500">
                    {locale === "vi"
                      ? "Bước 1/2: Chọn Phẩm Chất Tướng"
                      : "Step 1/2: Select Hero Rarity"}
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => setPickerStep("closed")}
                  aria-label={
                    locale === "vi" ? "Đóng bảng chọn" : "Close picker"
                  }
                  className="inline-flex h-6 w-6 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>

              {pickerStep === "rarity" ? (
                <div className="grid grid-cols-2 gap-2">
                  {RARITY_ORDER.map((rKey) => {
                    const cfg = TRAIT_RARITY_CONFIGS[rKey];
                    const isSelected = rarity === rKey;
                    return (
                      <button
                        key={rKey}
                        type="button"
                        data-testid={`rarity-tab-${rKey}`}
                        onClick={() => handlePickRarityInSequence(rKey)}
                        className={cn(
                          "rounded-xl border px-3 py-2.5 text-left transition-all cursor-pointer",
                          isSelected
                            ? "border-amber-500 bg-amber-500/15 text-foreground shadow-sm"
                            : "border-border/70 bg-background/70 hover:border-amber-500/40 text-muted-foreground hover:text-foreground"
                        )}
                      >
                        <div className="font-heading font-bold text-xs">
                          {cfg.shortLabel[locale]}
                        </div>
                        <div className="text-[10px] font-mono text-muted-foreground truncate">
                          {rKey === "epic"
                            ? locale === "vi"
                              ? "8 Tướng Kinh Tế 24/7"
                              : "8 Economy 24/7 Heroes"
                            : locale === "vi"
                              ? "10 mảnh/cấp"
                              : "10 shards/lv"}
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-[11px] font-mono font-bold text-muted-foreground">
                    {locale === "vi"
                      ? `Bước 2/2: Chọn tướng (${rarityConfig.shortLabel.vi})`
                      : `Step 2/2: Select Hero (${rarityConfig.shortLabel.en})`}
                  </div>
                  <div className="grid grid-cols-4 gap-2 max-h-56 overflow-y-auto p-1">
                    {heroesForRarity.map((hero) => {
                      const isSelected = activeHero?.id === hero.id;
                      const hName = locale === "vi" ? hero.nameVi : hero.nameEn;
                      return (
                        <button
                          key={hero.id}
                          type="button"
                          data-testid={`hero-option-${hero.id}`}
                          onClick={() => handlePickHeroInSequence(hero.id)}
                          title={hName}
                          className={cn(
                            "flex flex-col items-center gap-1 rounded-xl p-1.5 border transition-all cursor-pointer",
                            isSelected
                              ? "border-amber-500 bg-amber-500/15 shadow-sm"
                              : "border-border/60 bg-background/60 hover:border-amber-500/40 opacity-85 hover:opacity-100"
                          )}
                        >
                          <GameAssetFrame
                            src={hero.iconPath}
                            alt={hName}
                            rarity={hero.rarity}
                            faction={hero.faction}
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

        {/* Right: Target Trait Slots */}
        <div className="order-3 min-w-0">
          <HeroTraitSlotsSelector
            idPrefix="to"
            title={
              locale === "vi"
                ? "Cấp Thiên Phú Mục Tiêu"
                : "Target Trait Levels"
            }
            levels={toLevels}
            heroProfile={result.heroProfile}
            locale={locale}
            onChangeSlotLevel={handleUpdateToSlot}
            onApplyPreset={setToLevels}
          />
        </div>
      </div>

      {/* 4. 2,000-Diamond Slot 4 Economy Trap Warning */}
      {result.isSlot4EconomyTrapWarning && (
        <div
          data-testid="traits-slot4-economy-trap-warning"
          className="rounded-2xl border border-rose-500/45 bg-rose-500/10 p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
        >
          <div className="flex items-start gap-2.5">
            <ShieldAlert className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
            <div className="space-y-0.5 text-xs">
              <div className="font-heading font-black text-rose-600 dark:text-rose-300">
                {locale === "vi"
                  ? "Cảnh Báo Bẫy 2,000 Kim Cương (Ô 4 Tướng Kinh Tế Dự Bị)"
                  : "2,000-Diamond Trap Warning (Slot 4 on Benched Economy Hero)"}
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {locale === "vi"
                  ? "Ô 4 (+90% HP Anh Hùng) chỉ có tác dụng khi tướng trực tiếp xuất trận và tốn 2,000 Kim Cương để mở khóa. Với tướng Kinh Tế 24/7 đứng trong kho, hãy giữ Ô 4 ở Lv.0!"
                  : "Slot 4 (+90% Hero HP) only applies when deployed in combat and costs 2,000 Diamonds to unlock. Keep Slot 4 at Lv.0 for benched 24/7 Economy heroes!"}
              </p>
            </div>
          </div>

          <button
            type="button"
            data-testid="lock-slot4-save-diamonds-btn"
            onClick={() => {
              handleUpdateFromSlot(3, 0);
              handleUpdateToSlot(3, 0);
            }}
            className="shrink-0 rounded-xl bg-rose-500 hover:bg-rose-600 text-white px-3 py-2 font-heading font-bold text-xs transition-colors cursor-pointer"
          >
            {locale === "vi"
              ? "Khóa Ô 4 (Tiết kiệm 2,000 KC)"
              : "Lock Slot 4 (Save 2,000 Diamonds)"}
          </button>
        </div>
      )}

      {/* 4B. Prerequisite Bridge Warning (Slot 3 > 0 while Slot 1 < 15) */}
      {result.hasPrerequisiteBridgeWarning && (
        <div
          data-testid="traits-prerequisite-bridge-warning"
          className="rounded-2xl border border-amber-500/45 bg-amber-500/10 p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
        >
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div className="space-y-0.5 text-xs">
              <div className="font-heading font-black text-amber-600 dark:text-amber-300">
                {locale === "vi"
                  ? "Lưu Ý Chuỗi Tiên Quyết: Cần Ô 1 Đạt Lv.15 Để Mở Cầu Tới Ô 3 Lv.30"
                  : "Prerequisite Chain Notice: Slot 1 Lv.15 Bridge Required for Slot 3 Lv.30"}
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {locale === "vi"
                  ? "Trong game, các ô Thiên Phú mở trần theo bậc 5 cấp. Để đẩy Ô 3 lên tối đa Lv.30 theo Phễu Kinh Tế, cần nâng Ô 1 đạt tối thiểu Lv.15 (150 Mảnh)."
                  : "In-game Trait slots unlock in 5-level blocks. To push Slot 3 to Lv.30 via the Economy Funnel, Slot 1 must reach at least Lv.15 (150 Shards)."}
              </p>
            </div>
          </div>

          <button
            type="button"
            data-testid="apply-slot1-bridge-btn"
            onClick={() => handleUpdateToSlot(0, 15)}
            className="shrink-0 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 px-3 py-2 font-heading font-bold text-xs transition-colors cursor-pointer"
          >
            {locale === "vi"
              ? "Đặt Ô 1 = Lv.15 (+150 Mảnh)"
              : "Set Slot 1 = Lv.15 (+150 Shards)"}
          </button>
        </div>
      )}

      {/* 5. Dual Result Bar (Hero Shards + Diamonds) + [i] Breakdown Button */}
      <div
        data-testid="hero-traits-result-card"
        className="rounded-2xl border border-amber-500/35 bg-gradient-to-r from-amber-500/10 via-card to-card px-4 py-3.5 shadow-sm space-y-3"
      >
        {result.isInvalidRange ? (
          <div
            data-testid="hero-traits-invalid-range-warning"
            className="flex items-center gap-2.5 text-amber-600 dark:text-amber-300 text-xs sm:text-sm font-medium"
          >
            <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
            <span>
              {locale === "vi"
                ? "Cấp Thiên Phú mục tiêu không được thấp hơn cấp hiện tại và phải có ít nhất 1 ô tăng cấp (hoặc bật Trao Đổi Thiên Phú)."
                : "Target Trait levels cannot be lower than current levels and must increase at least 1 slot (or enable Trait Swap)."}
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Resource 1: Hero Shards (10 shards/level) */}
            <div className="rounded-xl border border-amber-500/30 bg-background/70 p-3 flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex items-center gap-2.5 min-w-0">
                <GameAssetFrame
                  src={result.universalShardMaterial.iconPath}
                  alt={shardMaterialName}
                  rarity={result.universalShardMaterial.rarity}
                  size="sm"
                />
                <div className="min-w-0">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground truncate">
                    {shardMaterialName}
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span
                      data-testid="traits-required-shards-value"
                      className="text-xl sm:text-2xl font-heading font-black text-amber-500 tabular-nums"
                    >
                      {result.requiredShards.toLocaleString("en-US")}
                    </span>
                    <span className="text-xs font-bold text-muted-foreground">
                      {locale === "vi" ? "Mảnh cần thêm" : "Shards needed"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 ml-auto">
                <label
                  htmlFor="traits-owned-shards-input"
                  className="text-[11px] font-mono font-bold text-muted-foreground whitespace-nowrap"
                >
                  {locale === "vi" ? "Đang có:" : "Owned:"}
                </label>
                <Input
                  id="traits-owned-shards-input"
                  data-testid="traits-owned-shards-input"
                  type="number"
                  min={0}
                  max={99999}
                  value={ownedShardsInput}
                  onChange={(e) => setOwnedShardsInput(e.target.value)}
                  className="w-20 h-8 rounded-xl font-mono text-xs font-bold text-center bg-card border-amber-500/30"
                />
                {result.missingShards === 0 ? (
                  <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-500/15 border border-emerald-500/40 px-2 py-1 text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-3 w-3 shrink-0" />
                    <span>{locale === "vi" ? "Đủ" : "Ready"}</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-lg bg-amber-500/15 border border-amber-500/35 px-2 py-1 text-[11px] font-mono font-bold text-amber-600 dark:text-amber-300">
                    <span>
                      -{result.missingShards.toLocaleString("en-US")}
                    </span>
                  </span>
                )}
              </div>
            </div>

            {/* Resource 2: Diamonds (Slot 4 Unlock 2,000 + Trait Swap 2,000) */}
            <div className="rounded-xl border border-sky-500/30 bg-background/70 p-3 flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex items-center gap-2.5 min-w-0">
                <GameAssetFrame
                  src={result.diamondMaterial.iconPath}
                  alt={diamondMaterialName}
                  rarity={result.diamondMaterial.rarity}
                  size="sm"
                />
                <div className="min-w-0">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground truncate">
                    {diamondMaterialName}
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span
                      data-testid="traits-required-diamonds-value"
                      className="text-xl sm:text-2xl font-heading font-black text-sky-500 tabular-nums"
                    >
                      {result.requiredDiamonds.toLocaleString("en-US")}
                    </span>
                    <span className="text-xs font-bold text-muted-foreground">
                      {locale === "vi" ? "Kim Cương" : "Diamonds"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 ml-auto">
                <label
                  htmlFor="traits-owned-diamonds-input"
                  className="text-[11px] font-mono font-bold text-muted-foreground whitespace-nowrap"
                >
                  {locale === "vi" ? "Đang có:" : "Owned:"}
                </label>
                <Input
                  id="traits-owned-diamonds-input"
                  data-testid="traits-owned-diamonds-input"
                  type="number"
                  min={0}
                  max={999999}
                  value={ownedDiamondsInput}
                  onChange={(e) => setOwnedDiamondsInput(e.target.value)}
                  className="w-20 h-8 rounded-xl font-mono text-xs font-bold text-center bg-card border-sky-500/30"
                />

                {/* Info [i] Button to toggle 4-Slot Breakdown */}
                <button
                  type="button"
                  data-testid="toggle-traits-breakdown-btn"
                  onClick={() => setIsBreakdownOpen((prev) => !prev)}
                  title={
                    locale === "vi"
                      ? "Xem bảng chi tiết 4 ô Thiên Phú"
                      : "View 4-slot trait breakdown"
                  }
                  aria-expanded={isBreakdownOpen}
                  className={cn(
                    "inline-flex h-8 w-8 items-center justify-center rounded-xl border transition-all cursor-pointer",
                    isBreakdownOpen
                      ? "border-amber-500 bg-amber-500 text-slate-950 shadow-sm"
                      : "border-amber-500/40 bg-background/80 text-amber-500 hover:bg-amber-500/15"
                  )}
                >
                  <Info className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 6. On-Demand 4-Slot Breakdown Panel (Opened via [i]) */}
      {isBreakdownOpen && !result.isInvalidRange && (
        <div
          data-testid="traits-breakdown-panel"
          className="rounded-2xl border border-border/80 bg-card/90 p-4 shadow-md space-y-3"
        >
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-xs font-mono font-extrabold uppercase tracking-wider text-amber-500">
              {locale === "vi"
                ? `Chi Tiết 4 Ô Thiên Phú (${activeHeroName})`
                : `4-Slot Trait Breakdown (${activeHeroName})`}
            </h2>
            <button
              type="button"
              onClick={() => setIsBreakdownOpen(false)}
              className="inline-flex h-6 w-6 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto rounded-xl border border-border/70 bg-background/70">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-border/70 bg-secondary/50 font-mono text-[10px] uppercase text-muted-foreground">
                  <th className="py-2 px-3">
                    {locale === "vi" ? "Ô Thiên Phú" : "Trait Slot"}
                  </th>
                  <th className="py-2 px-3">
                    {locale === "vi" ? "Cấp Độ" : "Levels"}
                  </th>
                  <th className="py-2 px-3 text-right">
                    {locale === "vi" ? "Mảnh Cần" : "Shards"}
                  </th>
                  <th className="py-2 px-3 text-right">
                    {locale === "vi" ? "Kim Cương" : "Diamonds"}
                  </th>
                  <th className="py-2 px-3">
                    {locale === "vi" ? "Hiệu Ứng Chỉ Số" : "Stat Effect"}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50 font-mono">
                {result.slotBreakdown.map((item) => (
                  <tr
                    key={item.slotNumber}
                    className="hover:bg-amber-500/[0.04] transition-colors"
                  >
                    <td className="py-2 px-3 font-sans font-bold text-foreground">
                      {item.slotTitle[locale]}
                    </td>
                    <td className="py-2 px-3 text-muted-foreground">
                      Lv.{item.fromLevel} ➔ Lv.{item.toLevel} (+
                      {item.levelsGained})
                    </td>
                    <td className="py-2 px-3 text-right font-bold text-amber-600 dark:text-amber-400">
                      +{item.requiredShards.toLocaleString("en-US")}
                    </td>
                    <td className="py-2 px-3 text-right font-bold text-sky-500">
                      {item.diamondUnlockCost > 0
                        ? `+${item.diamondUnlockCost.toLocaleString("en-US")}`
                        : "—"}
                    </td>
                    <td className="py-2 px-3 font-sans text-muted-foreground">
                      {item.slotEffectSummary[locale]}
                    </td>
                  </tr>
                ))}
                {result.includeTraitSwap && (
                  <tr className="bg-sky-500/[0.05]">
                    <td
                      colSpan={3}
                      className="py-2 px-3 font-sans font-bold text-sky-600 dark:text-sky-300"
                    >
                      {locale === "vi"
                        ? "Chi phí Trao Đổi Thiên Phú (Trait Swap giữa 2 tướng cùng phẩm chất)"
                        : "Trait Swap Fee (Swap trait levels between 2 same-rarity heroes)"}
                    </td>
                    <td className="py-2 px-3 text-right font-bold text-sky-500">
                      +{DIAMOND_COST_TRAIT_SWAP.toLocaleString("en-US")}
                    </td>
                    <td className="py-2 px-3 font-sans text-muted-foreground">
                      {locale === "vi"
                        ? `Hoán đổi với 1 ${rarityConfig.shortLabel.vi} khác`
                        : `Swap with another ${rarityConfig.shortLabel.en} hero`}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="text-[11px] font-mono text-muted-foreground flex flex-wrap items-center justify-between gap-2 pt-1">
            <span>
              {locale === "vi"
                ? `Đã đầu tư: ${result.alreadyInvestedShards} Mảnh • Tích lũy đích: ${result.targetCumulativeShards}/1,200 Mảnh`
                : `Already invested: ${result.alreadyInvestedShards} Shards • Target total: ${result.targetCumulativeShards}/1,200 Shards`}
            </span>
            <span>
              {locale === "vi"
                ? `Mở khóa Ô 4: ${DIAMOND_COST_SLOT_4_UNLOCK.toLocaleString("en-US")} KC • Trao đổi: ${DIAMOND_COST_TRAIT_SWAP.toLocaleString("en-US")} KC`
                : `Slot 4 Unlock: ${DIAMOND_COST_SLOT_4_UNLOCK.toLocaleString("en-US")} Diamonds • Swap: ${DIAMOND_COST_TRAIT_SWAP.toLocaleString("en-US")} Diamonds`}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

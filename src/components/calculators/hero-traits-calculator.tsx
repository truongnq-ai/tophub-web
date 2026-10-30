"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ArrowLeft,
  X,
  ArrowLeftRight,
  Sparkles,
  ShieldAlert,
} from "lucide-react";
import {
  DIAMOND_COST_BY_SLOT,
  DIAMOND_COST_TRAIT_SWAP,
  TOTAL_DIAMOND_UNLOCK_ALL_SLOTS,
  TRAIT_RARITY_CONFIGS,
  applyTraitSlotLevelChange,
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
  // Mặc định hiển thị Đấu Sĩ (Brawler - Epic) với mốc Max Ô 3 chuẩn quy tắc 5 cấp/lượt: 0/0/0/0 -> 25/25/30/25 (1,050 Mảnh Tím, 3,700 Kim Cương)
  const [rarity, setRarity] = useState<HeroStarRarity>("epic");
  const [selectedHeroId, setSelectedHeroId] = useState<string>(
    TRAIT_RARITY_CONFIGS.epic.defaultHeroId
  );
  const [fromLevels, setFromLevels] = useState<TraitLevelsTuple>([0, 0, 0, 0]);
  const [toLevels, setToLevels] = useState<TraitLevelsTuple>([25, 25, 30, 25]);
  const [ownedShardsInput, setOwnedShardsInput] = useState<string>("0");
  const [ownedDiamondsInput, setOwnedDiamondsInput] = useState<string>("0");
  const [includeTraitSwap, setIncludeTraitSwap] = useState<boolean>(false);

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
    setFromLevels((prev) =>
      applyTraitSlotLevelChange(prev, slotIndex, nextLevel)
    );
  };

  const handleUpdateToSlot = (slotIndex: TraitSlotIndex, nextLevel: number) => {
    setToLevels((prev) =>
      applyTraitSlotLevelChange(prev, slotIndex, nextLevel)
    );
  };

  const parsedOwnedShards = useMemo(
    () => parseCompactNumberInput(ownedShardsInput),
    [ownedShardsInput]
  );
  const parsedOwnedDiamonds = useMemo(
    () => parseCompactNumberInput(ownedDiamondsInput),
    [ownedDiamondsInput]
  );

  const result = useMemo(
    () =>
      calculateHeroTraitsUpgrade({
        rarity,
        heroId: activeHero?.id ?? selectedHeroId,
        fromLevels,
        toLevels,
        ownedShards: parsedOwnedShards,
        ownedDiamonds: parsedOwnedDiamonds,
        includeTraitSwap,
      }),
    [
      rarity,
      activeHero,
      selectedHeroId,
      fromLevels,
      toLevels,
      parsedOwnedShards,
      parsedOwnedDiamonds,
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

  const isEconomyHero = result.heroProfile.category === "economy_24_7";
  const breakdownLabel =
    locale === "vi"
      ? "Xem bảng chi tiết 4 ô Thiên Phú & Cẩm nang Phễu Kinh Tế"
      : "View 4-slot trait breakdown & Economy Funnel guide";

  return (
    <div data-testid="hero-traits-calculator" className="space-y-4">
      {/* 1. Flat MD3 Tool Header + Nút (i) CalculatorInfoPopover */}
      <CalculatorToolHeader
        code={tool.code}
        title={tool.title[locale].replace(`${tool.code} `, "")}
        actions={
          <>
            <button
              type="button"
              data-testid="traits-swap-toggle-btn"
              aria-pressed={includeTraitSwap}
              onClick={() => setIncludeTraitSwap((prev) => !prev)}
              className={cn(
                CALC_MD3.chipButton,
                "font-sans",
                includeTraitSwap
                  ? "bg-sky-500/20 text-sky-700 ring-2 ring-sky-500 dark:text-sky-300"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <ArrowLeftRight className="h-4 w-4 text-sky-500" aria-hidden="true" />
              <span>
                {locale === "vi" ? "Trao Đổi (+2K KC)" : "Trait Swap (+2K Diamonds)"}
              </span>
            </button>

            <button
              type="button"
              data-testid="traits-reset-econ-btn"
              onClick={() => {
                setFromLevels([0, 0, 0, 0]);
                setToLevels([25, 25, 30, 25]);
                setOwnedShardsInput("0");
                setOwnedDiamondsInput("0");
                setIncludeTraitSwap(false);
              }}
              className={cn(
                CALC_MD3.chipButton,
                "bg-muted/50 font-sans text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <RotateCcw className="h-4 w-4 text-amber-500" aria-hidden="true" />
              <span>{locale === "vi" ? "Mặc Định (25/25/30/25)" : "Reset (25/25/30/25)"}</span>
            </button>

            <CalculatorInfoPopover
              triggerTestId="toggle-traits-breakdown-btn"
              title={
                locale === "vi"
                  ? `Chi Tiết 4 Ô Thiên Phú (${activeHeroName})`
                  : `4-Slot Trait Breakdown (${activeHeroName})`
              }
              triggerLabel={breakdownLabel}
              locale={locale}
              dialogTestId="traits-breakdown-dialog"
            >
              <div data-testid="traits-breakdown-panel" className="space-y-4">
                {/* Cẩm nang chiến thuật Phễu Kinh Tế 24/7 & quy tắc bậc thang */}
                <div className={cn(CALC_MD3.tonalGroup, "space-y-1.5 text-xs")}>
                  <p className="font-heading font-bold text-foreground">
                    {locale === "vi"
                      ? "Cẩm nang Phễu Kinh Tế 24/7 & Quy tắc mở khóa:"
                      : "24/7 Economy Funnel Guide & Unlock Rules:"}
                  </p>
                  <p className="text-foreground/90">
                    {result.heroProfile.strategicNote[locale]}
                  </p>
                  <ul className="list-disc space-y-1 pl-4 text-muted-foreground">
                    <li>
                      {locale === "vi"
                        ? `Điều kiện tiên quyết: Tướng đạt 2★ Bạc (${result.starUnlockPrerequisiteShards} Mảnh tích lũy).`
                        : `Prerequisite: Hero reaches 2★ Silver (${result.starUnlockPrerequisiteShards} cumulative Shards).`}
                    </li>
                    <li>
                      {locale === "vi"
                        ? "Chi phí Mảnh: 10 mảnh/cấp × 30 cấp = 300 mảnh/ô (Tổng 4 ô = 1,200 mảnh)."
                        : "Shard Cost: 10 shards/level × 30 levels = 300 shards/slot (Total 4 slots = 1,200 shards)."}
                    </li>
                    <li>
                      {locale === "vi"
                        ? "Phí Kim Cương mở khóa từng ô (từ Lv.0 lên >= Lv.1): Ô 1 = 200 KC • Ô 2 = 500 KC • Ô 3 = 1,000 KC • Ô 4 = 2,000 KC (Tổng mở 4 ô = 3,700 KC; Trao đổi Thiên Phú = +2,000 KC)."
                        : "Diamond Slot Unlock Costs (Lv.0 to >= Lv.1): Slot 1 = 200 • Slot 2 = 500 • Slot 3 = 1,000 • Slot 4 = 2,000 (Total 4 slots = 3,700 Diamonds; Trait Swap = +2,000 Diamonds)."}
                    </li>
                    <li>
                      {locale === "vi"
                        ? "Mẹo tiết kiệm cho Tướng Kinh Tế dự bị: Không mở Ô 4 (HP Anh Hùng II chỉ có tác dụng khi xuất trận) để tiết kiệm ngay 2,000 Kim Cương!"
                        : "Economy Hero Saving Tip: Keep Slot 4 locked at Lv.0 on benched economy heroes to save 2,000 Diamonds!"}
                    </li>
                  </ul>
                </div>

                <div className="overflow-x-auto">
                  <table
                    data-testid="traits-breakdown-table"
                    className="w-full min-w-[560px] border-collapse text-left text-xs"
                  >
                    <thead>
                      <tr className="border-b border-border/70 bg-muted/40 font-sans font-semibold text-muted-foreground">
                        <th className="py-2 px-2.5">{locale === "vi" ? "Ô Thiên Phú" : "Trait Slot"}</th>
                        <th className="py-2 px-2.5">{locale === "vi" ? "Cấp Độ" : "Levels"}</th>
                        <th className="py-2 px-2.5 text-right">{locale === "vi" ? "Mảnh Cần" : "Shards"}</th>
                        <th className="py-2 px-2.5 text-right">{locale === "vi" ? "Kim Cương" : "Diamonds"}</th>
                        <th className="py-2 px-2.5">{locale === "vi" ? "Hiệu Ứng Chỉ Số" : "Stat Effect"}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50 font-sans tabular-nums">
                      {result.slotBreakdown.map((item) => (
                        <tr key={item.slotNumber} className="hover:bg-amber-500/[0.04] transition-colors">
                          <td className="py-2 px-2.5 font-bold text-foreground">
                            {item.slotTitle[locale]}
                          </td>
                          <td className="py-2 px-2.5 text-muted-foreground">
                            Lv.{item.fromLevel} ➔ Lv.{item.toLevel} (+{item.levelsGained})
                          </td>
                          <td className="py-2 px-2.5 text-right font-mono font-bold text-amber-700 dark:text-amber-400">
                            +{formatExactNumber(item.requiredShards)}
                          </td>
                          <td className="py-2 px-2.5 text-right font-mono font-bold text-sky-600 dark:text-sky-400">
                            {item.diamondUnlockCost > 0
                              ? `+${formatExactNumber(item.diamondUnlockCost)}`
                              : "—"}
                          </td>
                          <td className="py-2 px-2.5 text-muted-foreground">
                            {item.slotEffectSummary[locale]}
                          </td>
                        </tr>
                      ))}
                      {result.includeTraitSwap ? (
                        <tr className="bg-sky-500/[0.05]">
                          <td colSpan={3} className="py-2 px-2.5 font-bold text-sky-700 dark:text-sky-300">
                            {locale === "vi"
                              ? "Chi phí Trao Đổi Thiên Phú (Trait Swap giữa 2 tướng cùng phẩm chất)"
                              : "Trait Swap Fee (Swap trait levels between 2 same-rarity heroes)"}
                          </td>
                          <td className="py-2 px-2.5 text-right font-mono font-bold text-sky-600 dark:text-sky-400">
                            +{formatExactNumber(DIAMOND_COST_TRAIT_SWAP)}
                          </td>
                          <td className="py-2 px-2.5 text-muted-foreground">
                            {locale === "vi"
                              ? `Hoán đổi với 1 ${rarityConfig.shortLabel.vi} khác`
                              : `Swap with another ${rarityConfig.shortLabel.en} hero`}
                          </td>
                        </tr>
                      ) : null}
                    </tbody>
                  </table>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs font-sans tabular-nums text-muted-foreground">
                  <span>
                    {locale === "vi"
                      ? `Đã đầu tư: ${result.alreadyInvestedShards} Mảnh • Tích lũy đích: ${result.targetCumulativeShards}/1,200 Mảnh`
                      : `Already invested: ${result.alreadyInvestedShards} Shards • Target total: ${result.targetCumulativeShards}/1,200 Shards`}
                  </span>
                  <span>
                    {locale === "vi"
                      ? `Mở khóa 4 ô: ${formatExactNumber(TOTAL_DIAMOND_UNLOCK_ALL_SLOTS)} KC (${DIAMOND_COST_BY_SLOT.join("/")}) • Trao đổi: ${formatExactNumber(DIAMOND_COST_TRAIT_SWAP)} KC`
                      : `4-Slot Unlocks: ${formatExactNumber(TOTAL_DIAMOND_UNLOCK_ALL_SLOTS)} Diamonds (${DIAMOND_COST_BY_SLOT.join("/")}) • Swap: ${formatExactNumber(DIAMOND_COST_TRAIT_SWAP)} Diamonds`}
                  </span>
                </div>
              </div>
            </CalculatorInfoPopover>
          </>
        }
      />

      {/* 2. Compact Slot 3 Trait Badge Bar (Thu gọn 1 dòng thông tin dưới bộ chọn) */}
      <div
        data-testid="hero-trait3-banner"
        className={cn(
          CALC_MD3.surfaceCard,
          "flex flex-wrap items-center justify-between gap-2 px-3.5 py-2.5",
          isEconomyHero
            ? "border-emerald-500/35 bg-emerald-500/[0.05]"
            : "border-amber-500/35 bg-amber-500/[0.05]"
        )}
      >
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-sans font-bold",
              isEconomyHero
                ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
                : "bg-amber-500/20 text-amber-700 dark:text-amber-300"
            )}
          >
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            <span>
              {isEconomyHero
                ? locale === "vi"
                  ? "Kinh Tế 24/7"
                  : "24/7 Economy"
                : locale === "vi"
                  ? "Chiến Đấu"
                  : "Combat"}
            </span>
          </span>

          <span className="text-xs sm:text-sm font-heading font-bold text-foreground">
            {locale === "vi" ? "Ô 3 Độc Quyền:" : "Unique Slot 3:"}{" "}
            <span className="text-amber-700 dark:text-amber-400">
              {result.heroProfile.maxBonusLabel[locale]}
            </span>{" "}
            <span className="text-xs font-sans font-normal text-muted-foreground">
              ({result.heroProfile.perLevelBonusLabel[locale]})
            </span>
          </span>
        </div>

        <span className="text-xs font-sans font-semibold text-muted-foreground">
          {locale === "vi"
            ? `Mở ở 2★ Bạc (${result.starUnlockPrerequisiteShards} Mảnh)`
            : `Req: 2★ Silver (${result.starUnlockPrerequisiteShards} Shards)`}
        </span>
      </div>

      {/* 3. Main 3-Zone Workspace: [Cấp Thiên Phú Hiện Tại] ⟷ [Avatar Tướng Trung Tâm] ⟷ [Cấp Thiên Phú Mục Tiêu] */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-start gap-3 sm:gap-4">
        {/* Left: Current Trait Slots */}
        <div className="order-2 lg:order-1 min-w-0">
          <HeroTraitSlotsSelector
            idPrefix="from"
            title={locale === "vi" ? "Cấp Thiên Phú Hiện Tại" : "Current Trait Levels"}
            levels={fromLevels}
            heroProfile={result.heroProfile}
            rarity={rarity}
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
                rarity={activeHero.rarity}
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
                    <span>{locale === "vi" ? "1. Đổi phẩm chất" : "1. Change Rarity"}</span>
                  </button>
                ) : (
                  <span className="text-sm font-heading font-bold text-foreground">
                    {locale === "vi"
                      ? "Bước 1/2: Chọn Phẩm Chất Tướng"
                      : "Step 1/2: Select Hero Rarity"}
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => setPickerStep("closed")}
                  aria-label={locale === "vi" ? "Đóng bảng chọn" : "Close picker"}
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
                    const cfg = TRAIT_RARITY_CONFIGS[rKey];
                    const isSelected = rarity === rKey;
                    return (
                      <button
                        key={rKey}
                        type="button"
                        data-testid={`rarity-tab-${rKey}`}
                        onClick={() => handlePickRarityInSequence(rKey)}
                        className={cn(
                          CALC_MD3.tonalTile,
                          "min-h-[56px] px-3 py-2.5 text-left",
                          isSelected ? CALC_MD3.tileSelected : null
                        )}
                      >
                        <div className="text-sm font-heading font-bold text-foreground">
                          {cfg.shortLabel[locale]}
                        </div>
                        <div className="truncate text-xs font-sans text-muted-foreground">
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
                  <div className="text-xs font-sans font-medium text-muted-foreground">
                    {locale === "vi"
                      ? `Bước 2/2: Chọn tướng (${rarityConfig.shortLabel.vi})`
                      : `Step 2/2: Select Hero (${rarityConfig.shortLabel.en})`}
                  </div>
                  <div className="grid max-h-56 grid-cols-3 gap-2 overflow-y-auto p-1 sm:grid-cols-4">
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
                            CALC_MD3.tonalTile,
                            "flex min-h-[44px] flex-col items-center gap-1 p-1.5",
                            isSelected ? CALC_MD3.tileSelected : null
                          )}
                        >
                          <GameAssetFrame
                            src={hero.iconPath}
                            alt={hName}
                            rarity={hero.rarity}
                            faction={hero.faction}
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

        {/* Right: Target Trait Slots */}
        <div className="order-3 min-w-0">
          <HeroTraitSlotsSelector
            idPrefix="to"
            title={locale === "vi" ? "Cấp Thiên Phú Mục Tiêu" : "Target Trait Levels"}
            levels={toLevels}
            heroProfile={result.heroProfile}
            rarity={rarity}
            locale={locale}
            onChangeSlotLevel={handleUpdateToSlot}
            onApplyPreset={setToLevels}
          />
        </div>
      </div>

      {/* 4. 2,000-Diamond Slot 4 Economy Trap Warning */}
      {result.isSlot4EconomyTrapWarning ? (
        <div
          data-testid="traits-slot4-economy-trap-warning"
          role="alert"
          className="flex flex-col justify-between gap-3 rounded-2xl border border-rose-500/45 bg-rose-500/10 p-3.5 sm:flex-row sm:items-center"
        >
          <div className="flex items-start gap-2.5">
            <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" aria-hidden="true" />
            <div className="space-y-0.5">
              <div className="text-sm font-heading font-black text-rose-700 dark:text-rose-300">
                {locale === "vi"
                  ? "Cảnh Báo Bẫy 2,000 Kim Cương (Ô 4 • HP Anh Hùng II Tướng Kinh Tế Dự Bị)"
                  : "2,000-Diamond Trap Warning (Slot 4 • Hero HP II on Benched Economy Hero)"}
              </div>
              <p className="text-xs leading-relaxed text-foreground/85">
                {locale === "vi"
                  ? "Ô 4 chỉ có tác dụng khi tướng trực tiếp xuất trận và tốn 2,000 KC mở khóa. Hãy khóa Ô 4 ở Lv.0 để tiết kiệm 2,000 KC!"
                  : "Slot 4 only applies when deployed in combat and costs 2,000 Diamonds to unlock. Lock Slot 4 at Lv.0 to save 2,000 Diamonds!"}
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
            className={cn(
              CALC_MD3.chipButton,
              "shrink-0 bg-rose-500 px-4 font-heading font-bold text-white hover:bg-rose-600"
            )}
          >
            {locale === "vi"
              ? "Khóa Ô 4 (-2K KC)"
              : "Lock Slot 4 (-2K Diamonds)"}
          </button>
        </div>
      ) : null}

      {/* 4B. Prerequisite Bridge Warning (5-level step-gate notice) */}
      {result.hasPrerequisiteBridgeWarning ? (
        <div
          data-testid="traits-prerequisite-bridge-warning"
          role="alert"
          className="flex flex-col justify-between gap-3 rounded-2xl border border-amber-500/45 bg-amber-500/10 p-3.5 sm:flex-row sm:items-center"
        >
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" aria-hidden="true" />
            <div className="space-y-0.5">
              <div className="text-sm font-heading font-black text-amber-700 dark:text-amber-300">
                {locale === "vi"
                  ? "Lưu Ý Quy Tắc 5 Cấp 1 Lượt (5-Level Step-Gate)"
                  : "5-Level Step-Gate Prerequisite Notice"}
              </div>
              <p className="text-xs leading-relaxed text-foreground/85">
                {locale === "vi"
                  ? "Các ô Thiên Phú mở khóa và nâng giới hạn theo từng bậc 5 cấp (5 - 10 - 15 - 20 - 25 - 30)."
                  : "In-game Trait slots unlock and progress in 5-level blocks (5 - 10 - 15 - 20 - 25 - 30)."}
              </p>
            </div>
          </div>

          <button
            type="button"
            data-testid="apply-slot1-bridge-btn"
            onClick={() => handleUpdateToSlot(2, toLevels[2])}
            className={cn(
              CALC_MD3.chipButton,
              "shrink-0 bg-amber-500 px-4 font-heading font-bold text-slate-950 hover:bg-amber-600"
            )}
          >
            {locale === "vi"
              ? "Đồng bộ bậc 5 cấp"
              : "Sync 5-Level Gate"}
          </button>
        </div>
      ) : null}

      {/* 5. Hai Thẻ Nguyên Liệu Xếp Chồng Dọc Chuẩn R5 (3 Cột Ngang + K/M) */}
      <div data-testid="hero-traits-result-card" className="space-y-3">
        {result.isInvalidRange ? (
          <section
            data-testid="hero-traits-invalid-range-warning"
            role="alert"
            className={cn(
              CALC_MD3.surfaceCard,
              "flex items-start gap-2.5 border-amber-500/35 bg-amber-500/10 p-3 text-sm font-medium text-amber-800 dark:text-amber-300"
            )}
          >
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" aria-hidden="true" />
            <span>
              {locale === "vi"
                ? "Cấp Thiên Phú mục tiêu không được thấp hơn cấp hiện tại và phải có ít nhất 1 ô tăng cấp (hoặc bật Trao Đổi Thiên Phú)."
                : "Target Trait levels cannot be lower than current levels and must increase at least 1 slot (or enable Trait Swap)."}
            </span>
          </section>
        ) : (
          <>
            {/* Thẻ 1: Mảnh Vạn Năng Anh Hùng */}
            <section
              className={cn(
                CALC_MD3.surfaceCard,
                "relative overflow-hidden space-y-3 border-amber-500/35"
              )}
            >
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-amber-500 via-amber-400 to-transparent"
              />
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <GameAssetFrame
                    src={result.universalShardMaterial.iconPath}
                    alt={shardMaterialName}
                    rarity={result.universalShardMaterial.rarity}
                    size="md"
                  />
                  <div>
                    <div className="text-base font-heading font-black text-foreground">
                      {shardMaterialName}
                    </div>
                    <div className="text-xs font-sans text-muted-foreground">
                      {locale === "vi"
                        ? `Lộ trình 4 ô: ${fromLevels.join("/")} ➔ ${toLevels.join("/")}`
                        : `4-Slot Route: ${fromLevels.join("/")} ➔ ${toLevels.join("/")}`}
                    </div>
                  </div>
                </div>
                <span className="text-xs font-sans tabular-nums text-muted-foreground">
                  {locale === "vi"
                    ? `Đã đầu tư: ${result.alreadyInvestedShards}/1,200 Mảnh`
                    : `Invested: ${result.alreadyInvestedShards}/1,200 Shards`}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                {/* Cột 1: Số lượng yêu cầu */}
                <div className={cn(CALC_MD3.tonalGroup, "flex flex-col justify-between gap-1")}>
                  <span className={CALC_MD3.eyebrow}>
                    {locale === "vi" ? "Số lượng yêu cầu" : "Required"}
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span
                      data-testid="traits-required-shards-value"
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
                      ? `Chính xác: ${formatExactNumber(result.requiredShards)} mảnh`
                      : `Exact: ${formatExactNumber(result.requiredShards)} shards`}
                  </span>
                </div>

                {/* Cột 2: Số lượng đang có */}
                <div className={cn(CALC_MD3.tonalGroup, "flex flex-col justify-between gap-1.5")}>
                  <label
                    htmlFor="traits-owned-shards-input"
                    className={CALC_MD3.eyebrow}
                  >
                    {locale === "vi" ? "Số lượng đang có" : "Owned"}
                  </label>
                  <Input
                    id="traits-owned-shards-input"
                    data-testid="traits-owned-shards-input"
                    type="text"
                    inputMode="decimal"
                    value={ownedShardsInput}
                    onChange={(e) => setOwnedShardsInput(e.target.value)}
                    placeholder={locale === "vi" ? "0 (VD: 1.2K)" : "0 (e.g. 1.2K)"}
                    className={CALC_MD3.dataInput}
                  />
                  <span className="text-xs font-sans text-muted-foreground">
                    {locale === "vi"
                      ? "Gõ số thường hoặc K / M"
                      : "Type exact or K / M"}
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
                          data-testid="traits-missing-shards-value"
                          title={formatExactNumber(result.missingShards)}
                          className="font-mono text-xl font-black tabular-nums text-rose-600 dark:text-rose-400"
                        >
                          {formatCompactNumber(result.missingShards)}
                        </span>
                        <span className="text-xs font-sans font-semibold text-rose-600/80 dark:text-rose-300">
                          {locale === "vi" ? "mảnh" : "shards"}
                        </span>
                      </div>
                      <span className="text-xs font-sans text-muted-foreground">
                        {locale === "vi"
                          ? `Cần bù: ${formatExactNumber(result.missingShards)} mảnh`
                          : `Need: ${formatExactNumber(result.missingShards)} shards`}
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                        <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                        <span
                          data-testid="traits-missing-shards-value"
                          className="text-base font-heading font-black tabular-nums"
                        >
                          {locale === "vi" ? "Đủ nguyên liệu" : "Sufficient"}
                        </span>
                      </div>
                      <span className="text-xs font-sans text-emerald-700/80 dark:text-emerald-300">
                        {locale === "vi"
                          ? `Dư +${formatCompactNumber(Math.max(0, parsedOwnedShards - result.requiredShards))} mảnh`
                          : `Surplus +${formatCompactNumber(Math.max(0, parsedOwnedShards - result.requiredShards))} shards`}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </section>

            {/* Thẻ 2: Kim Cương (Mở khóa 4 ô 200/500/1,000/2,000 + Trao đổi 2,000) */}
            <section
              className={cn(
                CALC_MD3.surfaceCard,
                "relative overflow-hidden space-y-3 border-sky-500/35"
              )}
            >
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-sky-500 via-sky-400 to-transparent"
              />
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <GameAssetFrame
                    src={result.diamondMaterial.iconPath}
                    alt={diamondMaterialName}
                    rarity={result.diamondMaterial.rarity}
                    size="md"
                  />
                  <div>
                    <div className="text-base font-heading font-black text-foreground">
                      {diamondMaterialName}
                    </div>
                    <div className="text-xs font-sans text-muted-foreground">
                      {locale === "vi"
                        ? "Mở khóa 4 ô (200 / 500 / 1,000 / 2,000 KC) & Trao đổi Thiên Phú"
                        : "4-Slot Unlocks (200 / 500 / 1,000 / 2,000) & Trait Swap"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                {/* Cột 1: Số lượng yêu cầu */}
                <div className={cn(CALC_MD3.tonalGroup, "flex flex-col justify-between gap-1")}>
                  <span className={CALC_MD3.eyebrow}>
                    {locale === "vi" ? "Số lượng yêu cầu" : "Required"}
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span
                      data-testid="traits-required-diamonds-value"
                      title={formatExactNumber(result.requiredDiamonds)}
                      className="font-mono text-xl font-black tabular-nums text-sky-600 dark:text-sky-400"
                    >
                      {formatCompactNumber(result.requiredDiamonds)}
                    </span>
                    <span className="text-xs font-sans font-semibold text-muted-foreground">
                      {locale === "vi" ? "Kim Cương" : "Diamonds"}
                    </span>
                  </div>
                  <span className="text-xs font-sans text-muted-foreground">
                    {locale === "vi"
                      ? `Chính xác: ${formatExactNumber(result.requiredDiamonds)} KC`
                      : `Exact: ${formatExactNumber(result.requiredDiamonds)} Diamonds`}
                  </span>
                </div>

                {/* Cột 2: Số lượng đang có */}
                <div className={cn(CALC_MD3.tonalGroup, "flex flex-col justify-between gap-1.5")}>
                  <label
                    htmlFor="traits-owned-diamonds-input"
                    className={CALC_MD3.eyebrow}
                  >
                    {locale === "vi" ? "Số lượng đang có" : "Owned"}
                  </label>
                  <Input
                    id="traits-owned-diamonds-input"
                    data-testid="traits-owned-diamonds-input"
                    type="text"
                    inputMode="decimal"
                    value={ownedDiamondsInput}
                    onChange={(e) => setOwnedDiamondsInput(e.target.value)}
                    placeholder={locale === "vi" ? "0 (VD: 5K)" : "0 (e.g. 5K)"}
                    className={CALC_MD3.dataInput}
                  />
                  <span className="text-xs font-sans text-muted-foreground">
                    {locale === "vi"
                      ? "Gõ số thường hoặc K / M"
                      : "Type exact or K / M"}
                  </span>
                </div>

                {/* Cột 3: Số lượng còn thiếu */}
                <div
                  className={cn(
                    CALC_MD3.tonalGroup,
                    "flex flex-col justify-between gap-1",
                    result.missingDiamonds > 0
                      ? "bg-amber-500/10 ring-1 ring-amber-500/35"
                      : "bg-emerald-500/10 ring-1 ring-emerald-500/35"
                  )}
                >
                  <span className={CALC_MD3.eyebrow}>
                    {locale === "vi" ? "Số lượng còn thiếu" : "Missing"}
                  </span>
                  {result.missingDiamonds > 0 ? (
                    <>
                      <div className="flex items-baseline gap-1.5">
                        <span
                          data-testid="traits-missing-diamonds-value"
                          title={formatExactNumber(result.missingDiamonds)}
                          className="font-mono text-xl font-black tabular-nums text-rose-600 dark:text-rose-400"
                        >
                          {formatCompactNumber(result.missingDiamonds)}
                        </span>
                        <span className="text-xs font-sans font-semibold text-rose-600/80 dark:text-rose-300">
                          {locale === "vi" ? "KC" : "Diamonds"}
                        </span>
                      </div>
                      <span className="text-xs font-sans text-muted-foreground">
                        {locale === "vi"
                          ? `Cần bù: ${formatExactNumber(result.missingDiamonds)} KC`
                          : `Need: ${formatExactNumber(result.missingDiamonds)} Diamonds`}
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                        <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                        <span
                          data-testid="traits-missing-diamonds-value"
                          className="text-base font-heading font-black tabular-nums"
                        >
                          {locale === "vi" ? "Đủ nguyên liệu" : "Sufficient"}
                        </span>
                      </div>
                      <span className="text-xs font-sans text-emerald-700/80 dark:text-emerald-300">
                        {locale === "vi"
                          ? `Dư +${formatCompactNumber(Math.max(0, parsedOwnedDiamonds - result.requiredDiamonds))} KC`
                          : `Surplus +${formatCompactNumber(Math.max(0, parsedOwnedDiamonds - result.requiredDiamonds))} Diamonds`}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}

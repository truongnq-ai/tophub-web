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
  Sparkles,
  Users,
  Layers,
} from "lucide-react";
import {
  SKILL_SLOT_COUNT_OPTIONS,
  SKILL_SQUAD_COUNT_OPTIONS,
  calculateHeroSkillBooksUpgrade,
  clampSkillLevel,
  type SkillLevelsTuple,
  type SkillSlotCount,
  type SkillSlotIndex,
} from "@/content/calculators/skill-books-data";
import {
  HERO_STAR_RARITY_CONFIGS,
  getHeroesByRarity,
  type HeroStarRarity,
} from "@/content/calculators/hero-stars-data";
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
import { HeroSkillSlotsSelector } from "./hero-skill-slots-selector";
import {
  CALC_MD3,
  CalculatorMetricValue,
  CalculatorToolHeader,
} from "./calculator-md3-primitives";

export interface SkillBooksCalculatorProps {
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

export function SkillBooksCalculator({
  tool,
  locale,
}: SkillBooksCalculatorProps) {
  // Mặc định: Hoàng Tử Sa Mạc (Mythic • 5 kỹ năng), 1 tướng, từ Điểm Dừng Vàng Lv.10 -> Kịch trần Lv.15 (83,500 cuốn)
  const [rarity, setRarity] = useState<HeroStarRarity>("mythic");
  const [selectedHeroId, setSelectedHeroId] = useState<string>(
    HERO_STAR_RARITY_CONFIGS.mythic.defaultHeroId
  );
  const [slotCount, setSlotCount] = useState<SkillSlotCount>(5);
  const [heroCount, setHeroCount] = useState<number>(1);
  const [fromLevels, setFromLevels] = useState<SkillLevelsTuple>([
    10, 10, 10, 10, 10, 10,
  ]);
  const [toLevels, setToLevels] = useState<SkillLevelsTuple>([
    15, 15, 15, 15, 15, 15,
  ]);
  const [ownedBooksInput, setOwnedBooksInput] = useState<string>("0");

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
    setSlotCount(nextRarity === "mythic" ? 5 : 4);
    setPickerStep("hero");
  };

  const handlePickHeroInSequence = (heroId: string) => {
    setSelectedHeroId(heroId);
    setPickerStep("closed");
  };

  const handleUpdateFromSlot = (
    slotIndex: SkillSlotIndex,
    nextLevel: number
  ) => {
    const clamped = clampSkillLevel(nextLevel);
    setFromLevels((prev) => {
      const next: [number, number, number, number, number, number] = [...prev];
      next[slotIndex] = clamped;
      return next;
    });
    setToLevels((prev) => {
      if ((prev[slotIndex] ?? 1) >= clamped) return prev;
      const next: [number, number, number, number, number, number] = [...prev];
      next[slotIndex] = clamped;
      return next;
    });
  };

  const handleUpdateToSlot = (slotIndex: SkillSlotIndex, nextLevel: number) => {
    const clamped = clampSkillLevel(nextLevel);
    setToLevels((prev) => {
      const next: [number, number, number, number, number, number] = [...prev];
      next[slotIndex] = clamped;
      return next;
    });
  };

  const parsedOwnedBooks = useMemo(
    () => parseCompactNumberInput(ownedBooksInput),
    [ownedBooksInput]
  );

  const result = useMemo(
    () =>
      calculateHeroSkillBooksUpgrade({
        slotCount,
        heroCount,
        fromLevels,
        toLevels,
        ownedSkillBooks: parsedOwnedBooks,
      }),
    [slotCount, heroCount, fromLevels, toLevels, parsedOwnedBooks]
  );

  const bookMaterialName =
    locale === "vi"
      ? result.skillBookMaterial.nameVi
      : result.skillBookMaterial.nameEn;

  const activeHeroName = activeHero
    ? locale === "vi"
      ? activeHero.nameVi
      : activeHero.nameEn
    : "";

  const breakdownLabel =
    locale === "vi"
      ? "Xem bảng phân rã chi phí từng ô kỹ năng"
      : "View skill slot cost breakdown";

  return (
    <div data-testid="skill-books-calculator" className="space-y-4">
      {/* 1. Flat MD3 Tool Header */}
      <CalculatorToolHeader
        code={tool.code}
        title={tool.title[locale].replace(`${tool.code} `, "")}
        actions={
          <>
            <div
              role="group"
              aria-label={
                locale === "vi" ? "Số ô kỹ năng" : "Active skill slots"
              }
              className="flex flex-wrap items-center gap-1.5"
            >
              {SKILL_SLOT_COUNT_OPTIONS.map((cnt) => {
                const isSelected = slotCount === cnt;
                return (
                  <button
                    key={cnt}
                    type="button"
                    data-testid={`skill-slot-count-${cnt}-btn`}
                    aria-pressed={isSelected}
                    onClick={() => setSlotCount(cnt)}
                    className={cn(
                      CALC_MD3.chipButton,
                      "font-sans",
                      isSelected
                        ? "bg-amber-500 font-black text-slate-950"
                        : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <Layers className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>
                      <span className="font-mono">{cnt}</span>{" "}
                      {locale === "vi" ? "Kỹ năng" : "Skills"}
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              data-testid="skill-books-reset-btn"
              onClick={() => {
                setSlotCount(5);
                setHeroCount(1);
                setFromLevels([10, 10, 10, 10, 10, 10]);
                setToLevels([15, 15, 15, 15, 15, 15]);
                setOwnedBooksInput("0");
              }}
              className={cn(
                CALC_MD3.chipButton,
                "bg-muted/50 font-sans text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <RotateCcw
                className="h-4 w-4 text-amber-500"
                aria-hidden="true"
              />
              <span>{locale === "vi" ? "Đặt lại" : "Reset"}</span>
            </button>
          </>
        }
      />

      {/* 2. Strategic Pareto 80/20 Breakpoint Banner (1 lớp viền duy nhất) */}
      <div
        data-testid="skill-books-strategic-banner"
        className="rounded-2xl border border-amber-500/35 bg-amber-500/[0.06] p-3.5 sm:p-5 space-y-2"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-2.5 py-1 text-xs font-sans font-bold text-emerald-700 dark:text-emerald-300">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              <span>
                {locale === "vi"
                  ? "Điểm Dừng Kinh Tế Vàng: Lv.10 = 8,000 cuốn/kỹ năng (32.4% ngân sách)"
                  : "Golden ROI Sweet Spot: Lv.10 = 8,000 books/skill (32.4% budget)"}
              </span>
            </span>
            <span className="text-xs sm:text-sm font-sans font-semibold text-muted-foreground">
              {locale === "vi"
                ? "Kịch trần Lv.15 = 24,700 cuốn/kỹ năng (+16,700 cuốn cho 5 cấp cuối)"
                : "Max Cap Lv.15 = 24,700 books/skill (+16,700 books for final 5 levels)"}
            </span>
          </div>

          {/* Squad Multiplier (1 / 5 / 6 Heroes) */}
          <div className="flex flex-wrap items-center gap-1.5">
            {SKILL_SQUAD_COUNT_OPTIONS.map((cnt) => {
              const isSelected = heroCount === cnt;
              return (
                <button
                  key={cnt}
                  type="button"
                  data-testid={`skill-squad-count-${cnt}-btn`}
                  aria-pressed={isSelected}
                  onClick={() => setHeroCount(cnt)}
                  className={cn(
                    CALC_MD3.chipButton,
                    "px-2.5 font-sans text-xs sm:text-sm",
                    isSelected
                      ? "bg-amber-500 font-black text-slate-950"
                      : "bg-background/80 text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Users className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>
                    <span className="font-mono">{cnt}</span>{" "}
                    {locale === "vi"
                      ? cnt === 1
                        ? "Tướng"
                        : "Tướng (Đội 1)"
                      : cnt === 1
                        ? "Hero"
                        : "Heroes (Queue 1)"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <p className="text-sm leading-relaxed text-foreground/85">
          {locale === "vi"
            ? "Quy tắc Pareto 80/20: Nâng đồng đều cả Đội 1 đạt mốc Lv.10 (32,000 cuốn cho 4 kỹ năng hoặc 40,000 cuốn cho 5 kỹ năng) mang lại ~65% hiệu năng thực chiến chỉ với 1/3 chi phí. Chỉ đẩy lên Lv.15 cho các kỹ năng sát thương cốt lõi của Carry chủ lực!"
            : "80/20 Pareto Rule: Bringing all Queue 1 heroes to Lv.10 first (32,000 books for 4 skills or 40,000 books for 5 skills) delivers ~65% combat effectiveness at 1/3 cost. Only push Lv.15 on core burst skills of your main Carry!"}
        </p>
      </div>

      {/* 3. Main 3-Zone Workspace: [Cấp Kỹ Năng Hiện Tại] ⟷ [Avatar Tướng Trung Tâm] ⟷ [Cấp Kỹ Năng Mục Tiêu] */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-start gap-3 sm:gap-4">
        {/* Left: Current Skill Slots (X) */}
        <div className="order-2 lg:order-1 min-w-0">
          <HeroSkillSlotsSelector
            idPrefix="from"
            title={
              locale === "vi"
                ? "Cấp Kỹ Năng Hiện Tại"
                : "Current Skill Levels"
            }
            slotCount={slotCount}
            levels={fromLevels}
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

            <div className="text-center max-w-[160px]">
              <div
                data-testid="central-hero-name"
                className="truncate text-sm sm:text-base font-heading font-black text-foreground leading-tight"
              >
                {activeHeroName}
              </div>
              <div className="mt-0.5 inline-flex items-center gap-1 text-xs font-sans font-bold text-amber-700 dark:text-amber-400">
                <span>{rarityConfig.shortLabel[locale]}</span>
                <span>•</span>
                <span>
                  <span className="font-mono">{slotCount}</span>{" "}
                  {locale === "vi" ? "ô" : "slots"}
                </span>
                <ChevronDown
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5"
                  aria-hidden="true"
                />
              </div>
            </div>
          </button>

          {/* Sequential Overlay: Step 1 (Select Rarity) -> Step 2 (Select Hero) */}
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
                      {locale === "vi"
                        ? "1. Đổi phẩm chất"
                        : "1. Change Rarity"}
                    </span>
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
                  aria-label={
                    locale === "vi" ? "Đóng bảng chọn" : "Close picker"
                  }
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
                          {rKey === "mythic"
                            ? locale === "vi"
                              ? "Mặc định 5 kỹ năng (123,500 cuốn)"
                              : "Default 5 skills (123,500 books)"
                            : locale === "vi"
                              ? "Mặc định 4 kỹ năng (98,800 cuốn)"
                              : "Default 4 skills (98,800 books)"}
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
                      const hName =
                        locale === "vi" ? hero.nameVi : hero.nameEn;
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

        {/* Right: Target Skill Slots (Y) */}
        <div className="order-3 min-w-0">
          <HeroSkillSlotsSelector
            idPrefix="to"
            title={
              locale === "vi"
                ? "Cấp Kỹ Năng Mục Tiêu"
                : "Target Skill Levels"
            }
            slotCount={slotCount}
            levels={toLevels}
            locale={locale}
            onChangeSlotLevel={handleUpdateToSlot}
            onApplyPreset={setToLevels}
          />
        </div>
      </div>

      {/* 4. Tactical Post-Lv.10 Advisory CTA (Tiết kiệm 16,700 cuốn ở Kỹ năng 3 phụ trợ) */}
      {result.hasHighCostPostLv10Warning ? (
        <div
          data-testid="skill-books-post-lv10-warning"
          role="alert"
          className="flex flex-col justify-between gap-3 rounded-2xl border border-amber-500/45 bg-amber-500/10 p-3.5 sm:flex-row sm:items-center sm:p-5"
        >
          <div className="flex items-start gap-2.5">
            <AlertTriangle
              className="mt-0.5 h-5 w-5 shrink-0 text-amber-500"
              aria-hidden="true"
            />
            <div className="space-y-1">
              <div className="text-sm sm:text-base font-heading font-black text-amber-700 dark:text-amber-300">
                {locale === "vi"
                  ? "Khuyến Nghị Tối Ưu ROI: Dừng Kỹ Năng 3 (Nội Tại Phụ) Ở Lv.10 Tiết Kiệm 16,700 Cuốn/Tướng"
                  : "ROI Optimization: Parking Skill 3 (Secondary Passive) at Lv.10 Saves 16,700 Books/Hero"}
              </div>
              <p className="text-sm leading-relaxed text-foreground/85">
                {locale === "vi"
                  ? `Đoạn Lv.11 ➔ Lv.15 đang ngốn ${formatExactNumber(result.postLv10BooksTotal)} cuốn Sách Skill (tương đương ${Math.floor(result.postLv10BooksTotal / 8000)} kỹ năng đạt mốc Lv.10 từ Lv.1). Áp dụng Phễu Carry (15/15/10/15) giúp tiết kiệm ngay 16,700 cuốn mỗi tướng!`
                  : `Levels 11 ➔ 15 consume ${formatExactNumber(result.postLv10BooksTotal)} Skill Books (equivalent to bringing ${Math.floor(result.postLv10BooksTotal / 8000)} skills from Lv.1 to Lv.10). Applying the Carry Funnel (15/15/10/15) saves 16,700 books per hero!`}
              </p>
            </div>
          </div>

          <button
            type="button"
            data-testid="apply-carry-funnel-save-books-btn"
            onClick={() => setToLevels([15, 15, 10, 15, 15, 10])}
            className={cn(
              CALC_MD3.chipButton,
              "shrink-0 bg-amber-500 px-4 font-heading font-bold text-slate-950 hover:bg-amber-600"
            )}
          >
            {locale === "vi"
              ? "Áp Dụng Phễu Carry (15/15/10/15)"
              : "Apply Carry Funnel (15/15/10/15)"}
          </button>
        </div>
      ) : null}

      {/* 5. Result Surface Card + Owned Inventory (K/M/B) + [i] Breakdown Button */}
      <div
        data-testid="skill-books-result-card"
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
            data-testid="skill-books-invalid-range-warning"
            role="alert"
            className="flex items-start gap-2.5 rounded-xl bg-amber-500/10 p-3 text-sm font-medium text-amber-800 dark:text-amber-300"
          >
            <AlertTriangle
              className="mt-0.5 h-5 w-5 shrink-0 text-amber-500"
              aria-hidden="true"
            />
            <span>
              {locale === "vi"
                ? "Cấp kỹ năng mục tiêu không được thấp hơn cấp hiện tại và phải có ít nhất 1 kỹ năng tăng cấp."
                : "Target skill levels cannot be lower than current levels and must increase at least 1 skill slot."}
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {/* Tonal Group 1: Required Skill Books & Inventory Comparison */}
            <div className={cn(CALC_MD3.tonalGroup, "space-y-3")}>
              <div className="flex min-w-0 items-center gap-2.5">
                <GameAssetFrame
                  src={result.skillBookMaterial.iconPath}
                  alt={bookMaterialName}
                  rarity={result.skillBookMaterial.rarity}
                  size="sm"
                />
                <div className="min-w-0 space-y-1">
                  <div
                    className={cn(
                      CALC_MD3.eyebrow,
                      "truncate text-muted-foreground"
                    )}
                  >
                    {bookMaterialName}
                  </div>
                  <CalculatorMetricValue
                    testId="skill-books-required-value"
                    value={formatExactNumber(result.totalRequiredBooks)}
                    unit={
                      locale === "vi" ? "cuốn cần thêm" : "books needed"
                    }
                    toneClassName="text-amber-600 dark:text-amber-400"
                  />
                  <div className="text-xs font-sans text-muted-foreground">
                    {locale === "vi" ? "1 tướng:" : "Per hero:"}{" "}
                    <span className="font-mono font-semibold text-foreground">
                      {formatExactNumber(result.perHeroRequiredBooks)}
                    </span>{" "}
                    •{" "}
                    {locale === "vi" ? "Rút gọn:" : "Compact:"}{" "}
                    <span className="font-mono">
                      {formatCompactNumber(result.totalRequiredBooks)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2">
                <label
                  htmlFor="skill-books-owned-input"
                  className="whitespace-nowrap text-sm font-sans font-semibold text-foreground"
                >
                  {locale === "vi"
                    ? "Đang có (VD: 32k, 100k):"
                    : "Owned (e.g. 32k, 100k):"}
                </label>
                <div className="flex items-center gap-2">
                  <Input
                    id="skill-books-owned-input"
                    data-testid="skill-books-owned-input"
                    type="text"
                    inputMode="decimal"
                    value={ownedBooksInput}
                    onChange={(e) => setOwnedBooksInput(e.target.value)}
                    className={cn(
                      CALC_MD3.dataInput,
                      "w-28 bg-card text-center"
                    )}
                  />
                  {result.missingSkillBooks === 0 ? (
                    <span
                      data-testid="skill-books-missing-badge"
                      className="inline-flex items-center gap-1 rounded-lg bg-emerald-500/15 px-2.5 py-1 text-sm font-sans font-bold text-emerald-700 dark:text-emerald-400"
                    >
                      <CheckCircle2
                        className="h-4 w-4 shrink-0"
                        aria-hidden="true"
                      />
                      <span>{locale === "vi" ? "Đủ" : "Ready"}</span>
                    </span>
                  ) : (
                    <span
                      data-testid="skill-books-missing-badge"
                      className="inline-flex items-center rounded-lg bg-amber-500/15 px-2.5 py-1 font-mono text-sm font-bold text-amber-700 dark:text-amber-300"
                    >
                      -{formatExactNumber(result.missingSkillBooks)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Tonal Group 2: Pareto Split (Lv.1-10 vs Lv.11-15) & Savings + [i] Breakdown Toggle */}
            <div className={cn(CALC_MD3.tonalGroup, "space-y-3")}>
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <div
                    className={cn(
                      CALC_MD3.eyebrow,
                      "text-muted-foreground"
                    )}
                  >
                    {locale === "vi"
                      ? "Phân Tích Điểm Gãy Kinh Tế (Lv.10 vs Lv.15)"
                      : "Economic Breakpoint Split (Lv.10 vs Lv.15)"}
                  </div>
                  <div className="text-sm font-sans text-foreground">
                    {locale === "vi" ? "Đoạn Lv.1 ➔ Lv.10:" : "Lv.1 ➔ Lv.10:"}{" "}
                    <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">
                      {formatExactNumber(result.preLv10BooksTotal)}
                    </span>{" "}
                    •{" "}
                    {locale === "vi"
                      ? "Đoạn Lv.11 ➔ Lv.15:"
                      : "Lv.11 ➔ Lv.15:"}{" "}
                    <span className="font-mono font-bold text-amber-700 dark:text-amber-400">
                      {formatExactNumber(result.postLv10BooksTotal)}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  data-testid="toggle-skill-books-breakdown-btn"
                  onClick={() => setIsBreakdownOpen((prev) => !prev)}
                  title={breakdownLabel}
                  aria-label={breakdownLabel}
                  aria-expanded={isBreakdownOpen}
                  className={cn(
                    CALC_MD3.iconButton,
                    isBreakdownOpen
                      ? "bg-amber-500 text-slate-950 shadow-sm"
                      : "bg-amber-500/15 text-amber-700 hover:bg-amber-500/25 dark:text-amber-300"
                  )}
                >
                  <Info className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm font-sans text-muted-foreground">
                <span>
                  {locale === "vi"
                    ? "Tiết kiệm so với Max Lv.15:"
                    : "Saved vs Max Lv.15:"}{" "}
                  <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">
                    +{formatExactNumber(result.booksSavedVsAllMax15)}
                  </span>
                </span>
                <span>
                  {locale === "vi"
                    ? "Tương đương kỹ năng Lv.10:"
                    : "Equivalent Lv.10 skills:"}{" "}
                  <span className="font-mono font-bold text-foreground">
                    {result.equivalentLv10SkillsCount}
                  </span>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 6. On-Demand Skill Slot Breakdown Panel (1 lớp viền, bảng không viền bao) */}
      {isBreakdownOpen && !result.isInvalidRange ? (
        <div
          data-testid="skill-books-breakdown-panel"
          className={cn(CALC_MD3.surfaceCard, "space-y-3")}
        >
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-base sm:text-lg font-heading font-bold text-foreground">
              {locale === "vi"
                ? `Chi Tiết ${slotCount} Ô Kỹ Năng (${activeHeroName})`
                : `${slotCount}-Slot Skill Breakdown (${activeHeroName})`}
            </h2>
            <button
              type="button"
              onClick={() => setIsBreakdownOpen(false)}
              aria-label={
                locale === "vi" ? "Đóng bảng chi tiết" : "Close breakdown"
              }
              className={cn(
                CALC_MD3.iconButton,
                "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div className="-mx-1 overflow-x-auto">
            <table
              data-testid="skill-books-breakdown-table"
              className="w-full min-w-[560px] border-collapse text-left text-sm"
            >
              <thead>
                <tr className="border-b border-border/70 bg-muted/40 text-xs font-sans font-semibold uppercase tracking-wide text-muted-foreground">
                  <th className="py-2.5 px-3">
                    {locale === "vi" ? "Ô Kỹ Năng" : "Skill Slot"}
                  </th>
                  <th className="py-2.5 px-3">
                    {locale === "vi" ? "Lộ Trình Cấp" : "Level Range"}
                  </th>
                  <th className="py-2.5 px-3 text-right">
                    {locale === "vi" ? "1 Tướng" : "Per Hero"}
                  </th>
                  <th className="py-2.5 px-3 text-right">
                    {locale === "vi"
                      ? `Tổng (${heroCount} Tướng)`
                      : `Total (${heroCount}x)`}
                  </th>
                  <th className="py-2.5 px-3">
                    {locale === "vi" ? "Vai Trò Chiến Thuật" : "Tactical Role"}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50 font-sans tabular-nums">
                {result.slotBreakdown.map((item) => (
                  <tr
                    key={item.slotNumber}
                    className="hover:bg-amber-500/[0.04] transition-colors"
                  >
                    <td className="py-2.5 px-3 font-bold text-foreground">
                      {item.shortTitle[locale]}
                    </td>
                    <td className="py-2.5 px-3 text-muted-foreground">
                      Lv.{item.fromLevel} ➔ Lv.{item.toLevel} (+
                      {item.levelsGained})
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-amber-700 dark:text-amber-400">
                      +{formatExactNumber(item.requiredBooksPerHero)}
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-foreground">
                      +
                      {formatExactNumber(
                        item.requiredBooksPerHero * result.heroCount
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-muted-foreground">
                      {item.roleSummary[locale]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs sm:text-sm font-sans tabular-nums text-muted-foreground">
            <span>
              {locale === "vi"
                ? `Đã đầu tư (1 tướng): ${formatExactNumber(result.alreadyInvestedPerHero)} cuốn • Đích tích lũy: ${formatExactNumber(result.targetCumulativePerHero)}/${formatExactNumber(result.maxPossiblePerHeroAt15)} cuốn`
                : `Already invested (1 hero): ${formatExactNumber(result.alreadyInvestedPerHero)} books • Target total: ${formatExactNumber(result.targetCumulativePerHero)}/${formatExactNumber(result.maxPossiblePerHeroAt15)} books`}
            </span>
            <span>
              {locale === "vi"
                ? "Mốc chuẩn: Lv.5 = 1,300 • Lv.10 = 8,000 • Lv.12 = 12,900 • Lv.15 = 24,700"
                : "Benchmarks: Lv.5 = 1,300 • Lv.10 = 8,000 • Lv.12 = 12,900 • Lv.15 = 24,700"}
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
}

"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ArrowLeft,
  X,
  Layers,
} from "lucide-react";
import {
  SKILL_BOOK_LEVEL_TABLE,
  SKILL_SLOT_COUNT_OPTIONS,
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
import { CalculatorInfoPopover } from "./calculator-info-popover";
import {
  CALC_MD3,
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
  // Chuẩn R1: Tính cho 1 đơn vị chuẩn (1 Tướng — heroCount = 1 cố định)
  const [rarity, setRarity] = useState<HeroStarRarity>("mythic");
  const [selectedHeroId, setSelectedHeroId] = useState<string>(
    HERO_STAR_RARITY_CONFIGS.mythic.defaultHeroId
  );
  const [slotCount, setSlotCount] = useState<SkillSlotCount>(5);
  const [fromLevels, setFromLevels] = useState<SkillLevelsTuple>([
    10, 10, 10, 10, 10, 10,
  ]);
  const [toLevels, setToLevels] = useState<SkillLevelsTuple>([
    15, 15, 15, 15, 15, 15,
  ]);
  const [ownedBooksInput, setOwnedBooksInput] = useState<string>("0");

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
        heroCount: 1,
        fromLevels,
        toLevels,
        ownedSkillBooks: parsedOwnedBooks,
      }),
    [slotCount, fromLevels, toLevels, parsedOwnedBooks]
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
      ? "Xem bảng tra cứu 15 cấp Sách Kỹ Năng & phân rã từng ô"
      : "View 15-level Skill Book reference table & slot breakdown";

  return (
    <div data-testid="skill-books-calculator" className="space-y-4">
      {/* 1. Flat MD3 Tool Header + Nút (i) CalculatorInfoPopover */}
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

            <CalculatorInfoPopover
              triggerTestId="toggle-skill-books-breakdown-btn"
              title={
                locale === "vi"
                  ? `Chi Tiết ${slotCount} Ô Kỹ Năng (${activeHeroName})`
                  : `${slotCount}-Slot Skill Breakdown (${activeHeroName})`
              }
              triggerLabel={breakdownLabel}
              locale={locale}
              dialogTestId="skill-books-breakdown-dialog"
            >
              <div data-testid="skill-books-breakdown-panel" className="space-y-4">
                <div className={cn(CALC_MD3.tonalGroup, "space-y-1.5 text-xs")}>
                  <p className="font-heading font-bold text-foreground">
                    {locale === "vi"
                      ? "Thuyết minh Điểm Dừng Kinh Tế Vàng Lv.10 (8,000 cuốn):"
                      : "Golden ROI Sweet Spot Lv.10 (8,000 books) Guide:"}
                  </p>
                  <ul className="list-disc space-y-1 pl-4 text-muted-foreground">
                    <li>
                      {locale === "vi"
                        ? "Mốc Vàng Lv.10 chỉ tốn 8,000 cuốn/kỹ năng (32.4% ngân sách tối đa) nhưng đạt ~75% hiệu năng thực chiến."
                        : "Lv.10 costs only 8,000 books/skill (32.4% of max budget) while delivering ~75% combat effectiveness."}
                    </li>
                    <li>
                      {locale === "vi"
                        ? "Đoạn Lv.11 ➔ Lv.15 tiêu tốn thêm 16,700 cuốn/kỹ năng (Tổng Lv.15 = 24,700 cuốn). Tổng 1 tướng: 4 kỹ năng = 98.8K • 5 kỹ năng = 123.5K • 6 kỹ năng = 148.2K cuốn."
                        : "Levels 11 ➔ 15 require an extra 16,700 books/skill (Max Lv.15 = 24,700 books). Total per hero: 4 skills = 98.8K • 5 skills = 123.5K • 6 skills = 148.2K books."}
                    </li>
                    <li>
                      {locale === "vi"
                        ? `Đoạn Lv.1 ➔ Lv.10 trong lộ trình hiện tại: ${formatExactNumber(result.preLv10BooksTotal)} cuốn • Đoạn Lv.11 ➔ Lv.15: ${formatExactNumber(result.postLv10BooksTotal)} cuốn • Tiết kiệm so với Max Lv.15: +${formatExactNumber(result.booksSavedVsAllMax15)} cuốn.`
                        : `Current route Lv.1 ➔ Lv.10: ${formatExactNumber(result.preLv10BooksTotal)} books • Lv.11 ➔ Lv.15: ${formatExactNumber(result.postLv10BooksTotal)} books • Saved vs Max Lv.15: +${formatExactNumber(result.booksSavedVsAllMax15)} books.`}
                    </li>
                  </ul>
                </div>

                {/* Bảng phân rã các ô kỹ năng đang chọn */}
                <div className="space-y-2">
                  <h4 className="text-sm font-heading font-bold text-foreground">
                    {locale === "vi"
                      ? `Phân rã ${slotCount} ô kỹ năng đang chọn`
                      : `Active ${slotCount}-Slot Breakdown`}
                  </h4>
                  <div className="overflow-x-auto">
                    <table
                      data-testid="skill-books-breakdown-table"
                      className="w-full min-w-[520px] border-collapse text-left text-xs"
                    >
                      <thead>
                        <tr className="border-b border-border/70 bg-muted/40 font-sans font-semibold text-muted-foreground">
                          <th className="py-2 px-2.5">
                            {locale === "vi" ? "Ô Kỹ Năng" : "Skill Slot"}
                          </th>
                          <th className="py-2 px-2.5">
                            {locale === "vi" ? "Lộ Trình Cấp" : "Level Range"}
                          </th>
                          <th className="py-2 px-2.5 text-right">
                            {locale === "vi" ? "Sách Yêu Cầu" : "Required Books"}
                          </th>
                          <th className="py-2 px-2.5">
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
                            <td className="py-2 px-2.5 font-bold text-foreground">
                              {item.shortTitle[locale]}
                            </td>
                            <td className="py-2 px-2.5 text-muted-foreground">
                              Lv.{item.fromLevel} ➔ Lv.{item.toLevel} (+
                              {item.levelsGained})
                            </td>
                            <td className="py-2 px-2.5 text-right font-mono font-bold text-amber-700 dark:text-amber-400">
                              +{formatExactNumber(item.requiredBooksPerHero)}
                            </td>
                            <td className="py-2 px-2.5 text-muted-foreground">
                              {item.roleSummary[locale]}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Bảng tra cứu chuẩn 15 cấp Sách Kỹ Năng */}
                <div className="space-y-2">
                  <h4 className="text-sm font-heading font-bold text-foreground">
                    {locale === "vi"
                      ? "Bảng Tra Cứu Chuẩn 15 Cấp Sách Kỹ Năng (1 Kỹ năng)"
                      : "15-Level Skill Book Reference Table (Per Skill)"}
                  </h4>
                  <div className="max-h-60 overflow-y-auto overflow-x-auto">
                    <table className="w-full min-w-[440px] border-collapse text-left text-xs">
                      <thead>
                        <tr className="border-b border-border/70 bg-muted/40 font-sans font-semibold text-muted-foreground">
                          <th className="py-1.5 px-2.5">
                            {locale === "vi" ? "Cấp" : "Level"}
                          </th>
                          <th className="py-1.5 px-2.5 text-right">
                            {locale === "vi" ? "Sách Từng Cấp" : "Step Cost"}
                          </th>
                          <th className="py-1.5 px-2.5 text-right">
                            {locale === "vi" ? "Cộng Dồn 1 Kỹ Năng" : "Cumulative"}
                          </th>
                          <th className="py-1.5 px-2.5 text-right">
                            {locale === "vi" ? "Tỷ Trọng (%)" : "Budget (%)"}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/50 font-sans tabular-nums">
                        {SKILL_BOOK_LEVEL_TABLE.map((row) => (
                          <tr key={row.level} className="hover:bg-muted/30">
                            <td className="py-1.5 px-2.5 font-bold text-foreground">
                              Lv.{row.level}
                            </td>
                            <td className="py-1.5 px-2.5 text-right font-mono text-muted-foreground">
                              +{formatExactNumber(row.stepBooks)}
                            </td>
                            <td className="py-1.5 px-2.5 text-right font-mono font-bold text-amber-600 dark:text-amber-400">
                              {formatExactNumber(row.cumulativeBooks)}
                            </td>
                            <td className="py-1.5 px-2.5 text-right font-mono text-foreground">
                              {((row.cumulativeBooks / 24700) * 100).toFixed(1)}%
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

      {/* 2. Main 3-Zone Workspace: [Cấp Kỹ Năng Hiện Tại] ⟷ [Avatar Tướng Trung Tâm] ⟷ [Cấp Kỹ Năng Mục Tiêu] */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-start gap-3 sm:gap-4">
        {/* Left: Current Skill Slots */}
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
                              ? "Mặc định 5 kỹ năng (123.5K cuốn)"
                              : "Default 5 skills (123.5K books)"
                            : locale === "vi"
                              ? "Mặc định 4 kỹ năng (98.8K cuốn)"
                              : "Default 4 skills (98.8K books)"}
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

        {/* Right: Target Skill Slots */}
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

      {/* 3. Tactical Post-Lv.10 Advisory CTA */}
      {result.hasHighCostPostLv10Warning ? (
        <div
          data-testid="skill-books-post-lv10-warning"
          role="alert"
          className="flex flex-col justify-between gap-3 rounded-2xl border border-amber-500/45 bg-amber-500/10 p-3.5 sm:flex-row sm:items-center"
        >
          <div className="flex items-start gap-2.5">
            <AlertTriangle
              className="mt-0.5 h-5 w-5 shrink-0 text-amber-500"
              aria-hidden="true"
            />
            <div className="space-y-0.5">
              <div className="text-sm font-heading font-black text-amber-700 dark:text-amber-300">
                {locale === "vi"
                  ? "Khuyến Nghị Tối Ưu ROI: Dừng Kỹ Năng 3 (Nội Tại Phụ) Ở Lv.10 Tiết Kiệm 16.7K Cuốn"
                  : "ROI Optimization: Parking Skill 3 (Secondary Passive) at Lv.10 Saves 16.7K Books"}
              </div>
              <p className="text-xs leading-relaxed text-foreground/85">
                {locale === "vi"
                  ? "Áp dụng Phễu Carry (15/15/10/15) giúp tiết kiệm 16,700 cuốn Sách Skill ở ô nội tại phụ trợ!"
                  : "Applying the Carry Funnel (15/15/10/15) saves 16,700 Skill Books on the secondary passive slot!"}
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

      {/* 4. Thẻ Nguyên Liệu Sách Skill Chuẩn 3 Cột R5 (1 lớp surfaceCard) */}
      <section
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
          <>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <GameAssetFrame
                  src={result.skillBookMaterial.iconPath}
                  alt={bookMaterialName}
                  rarity={result.skillBookMaterial.rarity}
                  size="md"
                />
                <div>
                  <div className="text-base font-heading font-black text-foreground">
                    {bookMaterialName}
                  </div>
                  <div className="text-xs font-sans text-muted-foreground">
                    {locale === "vi"
                      ? `1 Tướng • ${slotCount} Kỹ năng (${fromLevels.slice(0, slotCount).join("/")} ➔ ${toLevels.slice(0, slotCount).join("/")})`
                      : `1 Hero • ${slotCount} Skills (${fromLevels.slice(0, slotCount).join("/")} ➔ ${toLevels.slice(0, slotCount).join("/")})`}
                  </div>
                </div>
              </div>

              <span className="text-xs font-sans tabular-nums text-muted-foreground">
                {locale === "vi"
                  ? `Tiết kiệm vs Max Lv.15: +${formatCompactNumber(result.booksSavedVsAllMax15)} cuốn`
                  : `Saved vs Max Lv.15: +${formatCompactNumber(result.booksSavedVsAllMax15)} books`}
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
                    data-testid="skill-books-required-value"
                    title={formatExactNumber(result.totalRequiredBooks)}
                    className="font-mono text-xl font-black tabular-nums text-amber-600 dark:text-amber-400"
                  >
                    {formatCompactNumber(result.totalRequiredBooks)}
                  </span>
                  <span className="text-xs font-sans font-semibold text-muted-foreground">
                    {locale === "vi" ? "cuốn" : "books"}
                  </span>
                </div>
                <span className="text-xs font-sans text-muted-foreground">
                  {locale === "vi"
                    ? `Chính xác: ${formatExactNumber(result.totalRequiredBooks)} cuốn`
                    : `Exact: ${formatExactNumber(result.totalRequiredBooks)} books`}
                </span>
              </div>

              {/* Cột 2: Số lượng đang có */}
              <div className={cn(CALC_MD3.tonalGroup, "flex flex-col justify-between gap-1.5")}>
                <label
                  htmlFor="skill-books-owned-input"
                  className={CALC_MD3.eyebrow}
                >
                  {locale === "vi" ? "Số lượng đang có" : "Owned"}
                </label>
                <Input
                  id="skill-books-owned-input"
                  data-testid="skill-books-owned-input"
                  type="text"
                  inputMode="decimal"
                  value={ownedBooksInput}
                  onChange={(e) => setOwnedBooksInput(e.target.value)}
                  placeholder={locale === "vi" ? "0 (VD: 32K, 100K)" : "0 (e.g. 32K, 100K)"}
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
                  result.missingSkillBooks > 0
                    ? "bg-amber-500/10 ring-1 ring-amber-500/35"
                    : "bg-emerald-500/10 ring-1 ring-emerald-500/35"
                )}
              >
                <span className={CALC_MD3.eyebrow}>
                  {locale === "vi" ? "Số lượng còn thiếu" : "Missing"}
                </span>
                {result.missingSkillBooks > 0 ? (
                  <>
                    <div className="flex items-baseline gap-1.5">
                      <span
                        data-testid="skill-books-missing-badge"
                        title={formatExactNumber(result.missingSkillBooks)}
                        className="font-mono text-xl font-black tabular-nums text-rose-600 dark:text-rose-400"
                      >
                        -{formatCompactNumber(result.missingSkillBooks)}
                      </span>
                      <span className="text-xs font-sans font-semibold text-rose-600/80 dark:text-rose-300">
                        {locale === "vi" ? "cuốn" : "books"}
                      </span>
                    </div>
                    <span className="text-xs font-sans text-muted-foreground">
                      {locale === "vi"
                        ? `Cần bù: ${formatExactNumber(result.missingSkillBooks)} cuốn`
                        : `Need: ${formatExactNumber(result.missingSkillBooks)} books`}
                    </span>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                      <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span
                        data-testid="skill-books-missing-badge"
                        className="text-base font-heading font-black tabular-nums"
                      >
                        {locale === "vi" ? "Đủ nguyên liệu" : "Sufficient"}
                      </span>
                    </div>
                    <span className="text-xs font-sans text-emerald-700/80 dark:text-emerald-300">
                      {locale === "vi"
                        ? `Dư +${formatCompactNumber(Math.max(0, parsedOwnedBooks - result.totalRequiredBooks))} cuốn`
                        : `Surplus +${formatCompactNumber(Math.max(0, parsedOwnedBooks - result.totalRequiredBooks))} books`}
                    </span>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

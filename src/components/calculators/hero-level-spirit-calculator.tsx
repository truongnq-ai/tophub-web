"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ArrowLeft,
  X,
  Sparkles,
  Link2,
  Shield,
} from "lucide-react";
import {
  MAX_STAR_PREREQUISITE_SHARDS_BY_RARITY,
  calculateHeroLevelAndSpiritUpgrade,
  clampHeroLevel,
  type LevelSpiritViewMode,
} from "@/content/calculators/hero-level-spirit-data";
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
import { HeroLevelSpiritSelector } from "./hero-level-spirit-selector";
import { CalculatorInfoPopover } from "./calculator-info-popover";
import {
  CALC_MD3,
  CalculatorToolHeader,
} from "./calculator-md3-primitives";

export interface HeroLevelSpiritCalculatorProps {
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

export function HeroLevelSpiritCalculator({
  tool,
  locale,
}: HeroLevelSpiritCalculatorProps) {
  // Chuẩn R1: Tính cho 1 đơn vị chuẩn (1 Tướng — heroCount = 1 cố định)
  const [rarity, setRarity] = useState<HeroStarRarity>("mythic");
  const [selectedHeroId, setSelectedHeroId] = useState<string>(
    HERO_STAR_RARITY_CONFIGS.mythic.defaultHeroId
  );
  const [viewMode, setViewMode] = useState<LevelSpiritViewMode>("combo");
  const [fromHeroLevel, setFromHeroLevel] = useState<number>(190);
  const [toHeroLevel, setToHeroLevel] = useState<number>(220);
  const [fromSpiritLevel, setFromSpiritLevel] = useState<number>(0);
  const [toSpiritLevel, setToSpiritLevel] = useState<number>(60);
  const [ownedMeatInput, setOwnedMeatInput] = useState<string>("0");
  const [ownedShardsInput, setOwnedShardsInput] = useState<string>("0");
  const [includeMaxStarPrerequisite, setIncludeMaxStarPrerequisite] =
    useState<boolean>(false);

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

  const parsedOwnedMeat = useMemo(
    () => parseCompactNumberInput(ownedMeatInput),
    [ownedMeatInput]
  );

  const parsedOwnedShards = useMemo(
    () => parseCompactNumberInput(ownedShardsInput),
    [ownedShardsInput]
  );

  const result = useMemo(
    () =>
      calculateHeroLevelAndSpiritUpgrade({
        rarity,
        fromHeroLevel,
        toHeroLevel,
        heroCount: 1,
        fromSpiritLevel,
        toSpiritLevel,
        ownedMeat: parsedOwnedMeat,
        ownedSpiritShards: parsedOwnedShards,
        includeMaxStarPrerequisite,
      }),
    [
      rarity,
      fromHeroLevel,
      toHeroLevel,
      fromSpiritLevel,
      toSpiritLevel,
      parsedOwnedMeat,
      parsedOwnedShards,
      includeMaxStarPrerequisite,
    ]
  );

  const meatMaterialName =
    locale === "vi" ? result.meatMaterial.nameVi : result.meatMaterial.nameEn;
  const spiritMaterialName =
    locale === "vi"
      ? result.spiritShardMaterial.nameVi
      : result.spiritShardMaterial.nameEn;

  const activeHeroName = activeHero
    ? locale === "vi"
      ? activeHero.nameVi
      : activeHero.nameEn
    : "";

  const maxStarPrereqShardsForRarity =
    MAX_STAR_PREREQUISITE_SHARDS_BY_RARITY[rarity];

  const spiritBonusCap = result.toSpiritRow.bonusHeroLevelCap;
  const baseCapAnchor = toHeroLevel >= 235 ? 235 : 220;
  const suggestedCapTargetLevel = clampHeroLevel(
    baseCapAnchor + spiritBonusCap
  );

  const breakdownLabel =
    locale === "vi"
      ? "Xem bảng chi tiết từng chặng Cấp Tướng & Linh Thể"
      : "View step-by-step Hero Level & Spirit breakdown";

  const handleResetDefault = () => {
    setViewMode("combo");
    setFromHeroLevel(190);
    setToHeroLevel(220);
    setFromSpiritLevel(0);
    setToSpiritLevel(60);
    setOwnedMeatInput("0");
    setOwnedShardsInput("0");
    setIncludeMaxStarPrerequisite(false);
  };

  return (
    <div data-testid="hero-level-spirit-calculator" className="space-y-4">
      {/* 1. Flat MD3 Tool Header + Mode Switcher + Nút (i) CalculatorInfoPopover */}
      <CalculatorToolHeader
        code={tool.code}
        title={tool.title[locale].replace(`${tool.code} `, "")}
        actions={
          <>
            <button
              type="button"
              data-testid="mode-combo-btn"
              aria-pressed={viewMode === "combo"}
              onClick={() => setViewMode("combo")}
              className={cn(
                CALC_MD3.chipButton,
                "font-sans",
                viewMode === "combo"
                  ? "bg-amber-500 text-slate-950 font-bold"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <span>{locale === "vi" ? "Cả Hai" : "Combo"}</span>
            </button>

            <button
              type="button"
              data-testid="mode-level-only-btn"
              aria-pressed={viewMode === "level-only"}
              onClick={() => setViewMode("level-only")}
              className={cn(
                CALC_MD3.chipButton,
                "font-sans",
                viewMode === "level-only"
                  ? "bg-amber-500 text-slate-950 font-bold"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <span>
                {locale === "vi" ? "Chỉ Cấp Tướng" : "Hero Level Only"}
              </span>
            </button>

            <button
              type="button"
              data-testid="mode-spirit-only-btn"
              aria-pressed={viewMode === "spirit-only"}
              onClick={() => setViewMode("spirit-only")}
              className={cn(
                CALC_MD3.chipButton,
                "font-sans",
                viewMode === "spirit-only"
                  ? "bg-sky-500 text-slate-950 font-bold"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <span>{locale === "vi" ? "Chỉ Linh Thể" : "Spirit Only"}</span>
            </button>

            {spiritBonusCap > 0 ? (
              <button
                type="button"
                data-testid="apply-spirit-cap-bridge-btn"
                onClick={() => setToHeroLevel(suggestedCapTargetLevel)}
                className={cn(
                  CALC_MD3.chipButton,
                  "bg-emerald-500/15 font-sans text-emerald-700 hover:bg-emerald-500/25 dark:text-emerald-300"
                )}
              >
                <Link2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>
                  {locale === "vi"
                    ? `+${spiritBonusCap} Trần Cấp (➔ Lv.${suggestedCapTargetLevel})`
                    : `+${spiritBonusCap} Lv Cap (➔ Lv.${suggestedCapTargetLevel})`}
                </span>
              </button>
            ) : null}

            <button
              type="button"
              data-testid="spirit-reset-btn"
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
              <span>{locale === "vi" ? "Đặt lại" : "Reset"}</span>
            </button>

            <CalculatorInfoPopover
              triggerTestId="toggle-spirit-breakdown-btn"
              title={
                locale === "vi"
                  ? `Bảng Chi Tiết Cấp Tướng & Linh Thể (${activeHeroName})`
                  : `Hero Level & Spirit Breakdown (${activeHeroName})`
              }
              triggerLabel={breakdownLabel}
              locale={locale}
              dialogTestId="spirit-breakdown-dialog"
            >
              <div data-testid="spirit-breakdown-panel" className="space-y-4">
                <div className={cn(CALC_MD3.tonalGroup, "space-y-1.5 text-xs")}>
                  <p className="font-heading font-bold text-foreground">
                    {locale === "vi"
                      ? "Ghi chú cơ chế Cấp Tướng & Cầu Nối Linh Thể:"
                      : "Hero Level & Heroic Spirit Resonance Notes:"}
                  </p>
                  <ul className="list-disc space-y-1 pl-4 text-muted-foreground">
                    <li>
                      {locale === "vi"
                        ? "Phạm vi đơn vị chuẩn: Công cụ hiển thị chi phí Thịt và Mảnh Linh Thể cho 1 Tướng chuẩn."
                        : "Single-Hero Scope: All Meat and Heroic Spirit Shard requirements are calculated for 1 hero."}
                    </li>
                    <li>
                      {locale === "vi"
                        ? "Điều kiện mở khóa Linh Thể: Tướng đạt 5★ Bạc (15★ tối đa). Mỗi 10 cấp Linh Thể (Lv.10, 20, ..., 100) mở khóa +1 Trần Cấp Tướng và +5% Giảm Sát Thương Kỹ Năng (tối đa +10 Cấp & +50% Giảm ST ở Lv.100)."
                        : "Heroic Spirit Prerequisite: Hero must reach 5★ Silver (Max 15★). Every 10 Spirit levels (Lv.10, 20, ..., 100) grants +1 Hero Level Cap and +5% Skill DMG Reduction (up to +10 Cap & +50% DMG Red at Lv.100)."}
                    </li>
                    <li>
                      {locale === "vi"
                        ? "Lưu ý Cầu Nối Linh Thể trên thực chiến: Hiệu ứng cộng hưởng đội hình yêu cầu các tướng trong đội hình chính cùng đạt mốc cấp Linh Thể tương ứng."
                        : "In-Game Resonance Note: Squad-wide Spirit resonance requires deployed heroes in your main queue to reach the corresponding Spirit milestone."}
                    </li>
                  </ul>
                </div>

                <div className="overflow-x-auto">
                  <table
                    data-testid="spirit-breakdown-table"
                    className="w-full min-w-[560px] border-collapse text-left text-xs"
                  >
                    <thead>
                      <tr className="border-b border-border/70 bg-muted/40 font-sans font-semibold text-muted-foreground">
                        <th className="py-2 px-2.5">
                          {locale === "vi" ? "Chặng Nâng Cấp" : "Upgrade Stage"}
                        </th>
                        <th className="py-2 px-2.5">
                          {locale === "vi" ? "Khoảng Cấp" : "Level Range"}
                        </th>
                        <th className="py-2 px-2.5 text-right">
                          {locale === "vi" ? "Chi Phí Chặng (1 Tướng)" : "Stage Cost (1 Hero)"}
                        </th>
                        <th className="py-2 px-2.5 text-right">
                          {locale === "vi" ? "Số Nguyên Chính Xác" : "Exact Amount"}
                        </th>
                        <th className="py-2 px-2.5">
                          {locale === "vi"
                            ? "Mốc Đột Phá / Trần Lâu Đài"
                            : "Milestone / Castle Cap"}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50 font-sans tabular-nums">
                      {result.levelSegmentsBreakdown.map((seg) => (
                        <tr
                          key={`lv-${seg.fromLevel}-${seg.toLevel}`}
                          className="hover:bg-amber-500/[0.04] transition-colors"
                        >
                          <td className="py-2 px-2.5 font-bold text-foreground">
                            {locale === "vi" ? "Cấp Độ Tướng" : "Hero Level"}
                          </td>
                          <td className="py-2 px-2.5 text-muted-foreground">
                            Lv.{seg.fromLevel} ➔ Lv.{seg.toLevel}
                          </td>
                          <td className="py-2 px-2.5 text-right font-mono font-bold text-amber-700 dark:text-amber-400">
                            +{formatCompactNumber(seg.meatPerHero)}
                          </td>
                          <td className="py-2 px-2.5 text-right font-mono text-foreground">
                            {formatExactNumber(seg.meatPerHero)}
                          </td>
                          <td className="py-2 px-2.5 text-muted-foreground">
                            {seg.segmentLabel[locale]}
                          </td>
                        </tr>
                      ))}

                      {result.spiritMilestonesBreakdown.map((band) => (
                        <tr
                          key={`sp-${band.fromLevel}-${band.toLevel}`}
                          className="hover:bg-sky-500/[0.04] transition-colors"
                        >
                          <td className="py-2 px-2.5 font-bold text-sky-700 dark:text-sky-300">
                            {locale === "vi" ? "Linh Thể Anh Hùng" : "Heroic Spirit"}
                          </td>
                          <td className="py-2 px-2.5 text-muted-foreground">
                            Lv.{band.fromLevel} ➔ Lv.{band.toLevel}
                          </td>
                          <td className="py-2 px-2.5 text-right font-mono font-bold text-sky-600 dark:text-sky-400">
                            +{formatExactNumber(band.requiredShardsInBand)}
                          </td>
                          <td className="py-2 px-2.5 text-right font-mono text-foreground">
                            {formatExactNumber(band.cumulativeShardsAtMilestone)}
                          </td>
                          <td className="py-2 px-2.5 text-muted-foreground">
                            {locale === "vi"
                              ? `+${band.bonusHeroLevelCap} Cấp • +${band.skillDamageReductionPercent}% Giảm ST • +${band.percentAtk}% ATK`
                              : `+${band.bonusHeroLevelCap} Cap • +${band.skillDamageReductionPercent}% DMG Red • +${band.percentAtk}% ATK`}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs font-sans tabular-nums text-muted-foreground">
                  <span>
                    {locale === "vi"
                      ? `Buff Linh Thể nhận thêm: +${result.gainedPercentAtk}% ATK / +${result.gainedPercentHp}% HP (+${formatExactNumber(result.gainedFlatAtk)} ATK / +${formatExactNumber(result.gainedFlatHp)} HP)`
                      : `Spirit Stat Gain: +${result.gainedPercentAtk}% ATK / +${result.gainedPercentHp}% HP (+${formatExactNumber(result.gainedFlatAtk)} ATK / +${formatExactNumber(result.gainedFlatHp)} HP)`}
                  </span>
                  <span>
                    {locale === "vi"
                      ? `Tích lũy Linh Thể đích: ${formatExactNumber(result.toSpiritRow.cumulativeShards)}/3,163 Mảnh`
                      : `Target Spirit Cumulative: ${formatExactNumber(result.toSpiritRow.cumulativeShards)}/3,163 Shards`}
                  </span>
                </div>
              </div>
            </CalculatorInfoPopover>
          </>
        }
      />

      {/* 2. Main 3-Zone Workspace: [Cấp & Linh Thể Hiện Tại] ⟷ [Avatar Tướng Trung Tâm] ⟷ [Cấp & Linh Thể Mục Tiêu] */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-start gap-3 sm:gap-4">
        {/* Left: Current Hero Level & Spirit */}
        <div className="order-2 lg:order-1 min-w-0">
          <HeroLevelSpiritSelector
            idPrefix="from"
            title={
              locale === "vi"
                ? "Cấp & Linh Thể Hiện Tại"
                : "Current Level & Spirit"
            }
            viewMode={viewMode}
            heroLevel={fromHeroLevel}
            spiritLevel={fromSpiritLevel}
            locale={locale}
            onChangeHeroLevel={setFromHeroLevel}
            onChangeSpiritLevel={setFromSpiritLevel}
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
                <ChevronDown
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5"
                  aria-hidden="true"
                />
              </div>
            </div>
          </button>

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
                      {locale === "vi" ? "1. Đổi phẩm chất" : "1. Change Rarity"}
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
                    const maxStarShards =
                      MAX_STAR_PREREQUISITE_SHARDS_BY_RARITY[rKey];
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
                          {locale === "vi"
                            ? `5★ Bạc: ${formatExactNumber(maxStarShards)} mảnh`
                            : `5★ Silver: ${formatExactNumber(maxStarShards)} shards`}
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

        {/* Right: Target Hero Level & Spirit */}
        <div className="order-3 min-w-0">
          <HeroLevelSpiritSelector
            idPrefix="to"
            title={
              locale === "vi"
                ? "Cấp & Linh Thể Mục Tiêu"
                : "Target Level & Spirit"
            }
            viewMode={viewMode}
            heroLevel={toHeroLevel}
            spiritLevel={toSpiritLevel}
            locale={locale}
            onChangeHeroLevel={setToHeroLevel}
            onChangeSpiritLevel={setToSpiritLevel}
          />
        </div>
      </div>

      {/* 3. Hai Thẻ Nguyên Liệu Xếp Chồng Dọc Chuẩn R5 (3 Cột Ngang + K/M) */}
      <div data-testid="hero-level-spirit-result-card" className="space-y-3">
        {result.isInvalidRange ? (
          <section
            data-testid="hero-level-spirit-invalid-range-warning"
            role="alert"
            className={cn(
              CALC_MD3.surfaceCard,
              "flex items-start gap-2.5 border-amber-500/35 bg-amber-500/10 p-3 text-sm font-medium text-amber-800 dark:text-amber-300"
            )}
          >
            <AlertTriangle
              className="mt-0.5 h-5 w-5 shrink-0 text-amber-500"
              aria-hidden="true"
            />
            <span>
              {locale === "vi"
                ? "Cấp độ mục tiêu không được thấp hơn cấp hiện tại và phải có ít nhất 1 hệ thống tăng cấp."
                : "Target levels cannot be lower than current levels and must increase at least one progression track."}
            </span>
          </section>
        ) : (
          <>
            {/* Thẻ 1: Thịt (Nâng Cấp Độ Tướng) */}
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
                    src={result.meatMaterial.iconPath}
                    alt={meatMaterialName}
                    rarity={result.meatMaterial.rarity}
                    size="md"
                  />
                  <div>
                    <div className="text-base font-heading font-black text-foreground">
                      {meatMaterialName}
                    </div>
                    <div className="text-xs font-sans text-muted-foreground">
                      {locale === "vi"
                        ? `Nâng cấp 1 Tướng: Lv.${fromHeroLevel} ➔ Lv.${toHeroLevel}`
                        : `1 Hero Level Upgrade: Lv.${fromHeroLevel} ➔ Lv.${toHeroLevel}`}
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
                      data-testid="spirit-required-meat-value"
                      title={formatExactNumber(result.totalRequiredMeat)}
                      className="font-mono text-xl font-black tabular-nums text-amber-600 dark:text-amber-400"
                    >
                      {formatCompactNumber(result.totalRequiredMeat)}
                    </span>
                    <span className="text-xs font-sans font-semibold text-muted-foreground">
                      {locale === "vi" ? "Thịt" : "Meat"}
                    </span>
                  </div>
                  <span className="text-xs font-sans text-muted-foreground">
                    {locale === "vi"
                      ? `Chính xác: ${formatExactNumber(result.totalRequiredMeat)}`
                      : `Exact: ${formatExactNumber(result.totalRequiredMeat)}`}
                  </span>
                </div>

                {/* Cột 2: Số lượng đang có */}
                <div className={cn(CALC_MD3.tonalGroup, "flex flex-col justify-between gap-1.5")}>
                  <label
                    htmlFor="spirit-owned-meat-input"
                    className={CALC_MD3.eyebrow}
                  >
                    {locale === "vi" ? "Số lượng đang có" : "Owned"}
                  </label>
                  <Input
                    id="spirit-owned-meat-input"
                    data-testid="spirit-owned-meat-input"
                    type="text"
                    inputMode="decimal"
                    value={ownedMeatInput}
                    onChange={(e) => setOwnedMeatInput(e.target.value)}
                    placeholder={locale === "vi" ? "0 (VD: 20M, 500K)" : "0 (e.g. 20M, 500K)"}
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
                    result.missingMeat > 0
                      ? "bg-amber-500/10 ring-1 ring-amber-500/35"
                      : "bg-emerald-500/10 ring-1 ring-emerald-500/35"
                  )}
                >
                  <span className={CALC_MD3.eyebrow}>
                    {locale === "vi" ? "Số lượng còn thiếu" : "Missing"}
                  </span>
                  {result.missingMeat > 0 ? (
                    <>
                      <div className="flex items-baseline gap-1.5">
                        <span
                          data-testid="spirit-missing-meat-badge"
                          title={formatExactNumber(result.missingMeat)}
                          className="font-mono text-xl font-black tabular-nums text-rose-600 dark:text-rose-400"
                        >
                          -{formatCompactNumber(result.missingMeat)}
                        </span>
                        <span className="text-xs font-sans font-semibold text-rose-600/80 dark:text-rose-300">
                          {locale === "vi" ? "Thịt" : "Meat"}
                        </span>
                      </div>
                      <span className="text-xs font-sans text-muted-foreground">
                        {locale === "vi"
                          ? `Cần bù: ${formatExactNumber(result.missingMeat)}`
                          : `Need: ${formatExactNumber(result.missingMeat)}`}
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                        <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                        <span
                          data-testid="spirit-missing-meat-badge"
                          className="text-base font-heading font-black tabular-nums"
                        >
                          {locale === "vi" ? "Đủ nguyên liệu" : "Sufficient"}
                        </span>
                      </div>
                      <span className="text-xs font-sans text-emerald-700/80 dark:text-emerald-300">
                        {locale === "vi"
                          ? `Dư +${formatCompactNumber(Math.max(0, parsedOwnedMeat - result.totalRequiredMeat))}`
                          : `Surplus +${formatCompactNumber(Math.max(0, parsedOwnedMeat - result.totalRequiredMeat))}`}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </section>

            {/* Thẻ 2: Mảnh Linh Thể Vạn Năng */}
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
                    src={result.spiritShardMaterial.iconPath}
                    alt={spiritMaterialName}
                    rarity={result.spiritShardMaterial.rarity}
                    size="md"
                  />
                  <div>
                    <div className="text-base font-heading font-black text-foreground">
                      {spiritMaterialName}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs font-sans text-muted-foreground">
                      <span>
                        Lv.{fromSpiritLevel} ➔ Lv.{toSpiritLevel}
                      </span>
                      <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 dark:text-emerald-300">
                        <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>
                          +<span className="font-mono">{result.gainedHeroLevelCap}</span>{" "}
                          {locale === "vi" ? "Trần Cấp" : "Lv Cap"}
                        </span>
                      </span>
                      <span className="inline-flex items-center gap-1 font-semibold text-sky-700 dark:text-sky-300">
                        <Shield className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>
                          +<span className="font-mono">{result.gainedSkillDamageReduction}%</span>{" "}
                          {locale === "vi" ? "Giảm ST Kỹ Năng" : "Skill DMG Red"}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  data-testid="toggle-max-star-prereq-btn"
                  aria-pressed={includeMaxStarPrerequisite}
                  onClick={() => setIncludeMaxStarPrerequisite((prev) => !prev)}
                  className={cn(
                    CALC_MD3.chipButton,
                    "px-2.5 text-xs font-sans",
                    includeMaxStarPrerequisite
                      ? "bg-amber-500/20 text-amber-800 ring-2 ring-amber-500 dark:text-amber-300"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <span>
                    {locale === "vi"
                      ? `+${formatCompactNumber(maxStarPrereqShardsForRarity)} Mảnh mở 5★ Bạc`
                      : `+${formatCompactNumber(maxStarPrereqShardsForRarity)} 5★ Silver Req`}
                  </span>
                </button>
              </div>

              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                {/* Cột 1: Số lượng yêu cầu */}
                <div className={cn(CALC_MD3.tonalGroup, "flex flex-col justify-between gap-1")}>
                  <span className={CALC_MD3.eyebrow}>
                    {locale === "vi" ? "Số lượng yêu cầu" : "Required"}
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span
                      data-testid="spirit-required-shards-value"
                      title={formatExactNumber(result.totalRequiredSpiritShards)}
                      className="font-mono text-xl font-black tabular-nums text-sky-600 dark:text-sky-400"
                    >
                      {formatCompactNumber(result.totalRequiredSpiritShards)}
                    </span>
                    <span className="text-xs font-sans font-semibold text-muted-foreground">
                      {locale === "vi" ? "Mảnh Linh Thể" : "Spirit Shards"}
                    </span>
                  </div>
                  <span className="text-xs font-sans text-muted-foreground">
                    {locale === "vi"
                      ? `Chính xác: ${formatExactNumber(result.totalRequiredSpiritShards)} mảnh`
                      : `Exact: ${formatExactNumber(result.totalRequiredSpiritShards)} shards`}
                  </span>
                </div>

                {/* Cột 2: Số lượng đang có */}
                <div className={cn(CALC_MD3.tonalGroup, "flex flex-col justify-between gap-1.5")}>
                  <label
                    htmlFor="spirit-owned-shards-input"
                    className={CALC_MD3.eyebrow}
                  >
                    {locale === "vi" ? "Số lượng đang có" : "Owned"}
                  </label>
                  <Input
                    id="spirit-owned-shards-input"
                    data-testid="spirit-owned-shards-input"
                    type="text"
                    inputMode="decimal"
                    value={ownedShardsInput}
                    onChange={(e) => setOwnedShardsInput(e.target.value)}
                    placeholder={locale === "vi" ? "0 (VD: 1.5K)" : "0 (e.g. 1.5K)"}
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
                    result.missingSpiritShards > 0
                      ? "bg-amber-500/10 ring-1 ring-amber-500/35"
                      : "bg-emerald-500/10 ring-1 ring-emerald-500/35"
                  )}
                >
                  <span className={CALC_MD3.eyebrow}>
                    {locale === "vi" ? "Số lượng còn thiếu" : "Missing"}
                  </span>
                  {result.missingSpiritShards > 0 ? (
                    <>
                      <div className="flex items-baseline gap-1.5">
                        <span
                          data-testid="spirit-missing-shards-badge"
                          title={formatExactNumber(result.missingSpiritShards)}
                          className="font-mono text-xl font-black tabular-nums text-rose-600 dark:text-rose-400"
                        >
                          -{formatCompactNumber(result.missingSpiritShards)}
                        </span>
                        <span className="text-xs font-sans font-semibold text-rose-600/80 dark:text-rose-300">
                          {locale === "vi" ? "mảnh" : "shards"}
                        </span>
                      </div>
                      <span className="text-xs font-sans text-muted-foreground">
                        {locale === "vi"
                          ? `Cần bù: ${formatExactNumber(result.missingSpiritShards)} mảnh`
                          : `Need: ${formatExactNumber(result.missingSpiritShards)} shards`}
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                        <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                        <span
                          data-testid="spirit-missing-shards-badge"
                          className="text-base font-heading font-black tabular-nums"
                        >
                          {locale === "vi" ? "Đủ nguyên liệu" : "Sufficient"}
                        </span>
                      </div>
                      <span className="text-xs font-sans text-emerald-700/80 dark:text-emerald-300">
                        {locale === "vi"
                          ? `Dư +${formatCompactNumber(Math.max(0, parsedOwnedShards - result.totalRequiredSpiritShards))} mảnh`
                          : `Surplus +${formatCompactNumber(Math.max(0, parsedOwnedShards - result.totalRequiredSpiritShards))} shards`}
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

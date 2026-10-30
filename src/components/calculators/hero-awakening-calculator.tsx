"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ArrowLeft,
  X,
  Coins,
} from "lucide-react";
import {
  AWAKENING_FACTION_CONFIGS,
  AWAKENING_MILESTONE_NODES,
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

  // Trạng thái đóng/mở luồng chọn nối tiếp (Phe -> Tướng -> Ẩn)
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
    setPickerStep("hero");
  };

  const handlePickHeroInSequence = (heroId: string) => {
    setSelectedHeroId(heroId);
    setPickerStep("closed");
  };

  const parsedOwnedStones = useMemo(
    () => parseCompactNumberInput(ownedStonesInput),
    [ownedStonesInput]
  );
  const parsedOwnedShards = useMemo(
    () => parseCompactNumberInput(ownedShardsInput),
    [ownedShardsInput]
  );

  const result = useMemo(
    () =>
      calculateHeroAwakening({
        faction,
        fromStepIndex,
        toStepIndex,
        ownedStones: parsedOwnedStones,
        ownedShards: parsedOwnedShards,
      }),
    [faction, fromStepIndex, toStepIndex, parsedOwnedStones, parsedOwnedShards]
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
      ? "Xem Bảng Chi Tiết 20 Mốc Thức Tỉnh & Quy Đổi Tiệm"
      : "View 20-Step Awakening Breakdown & Shop Conversion";

  return (
    <div data-testid="hero-awakening-calculator" className="space-y-4">
      {/* 1. Flat MD3 Tool Header + Nút (i) CalculatorInfoPopover */}
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

            <CalculatorInfoPopover
              triggerTestId="toggle-awakening-breakdown-btn"
              title={
                locale === "vi"
                  ? "Bảng Chi Tiết Thức Tỉnh (Bậc 0 ➔ Bậc 4) & Quy Đổi Tiệm"
                  : "Awakening Tier Breakdown (Tier 0 ➔ Tier 4) & Shop Conversion"
              }
              triggerLabel={breakdownLabel}
              locale={locale}
              dialogTestId="awakening-breakdown-dialog"
            >
              <div data-testid="awakening-steps-breakdown-panel" className="space-y-4">
                {/* Ghi chú quy đổi Vinh Quang Hội & Xu Bang S1 */}
                <div className={cn(CALC_MD3.tonalGroup, "space-y-1.5 text-xs")}>
                  <p className="font-heading font-bold text-foreground">
                    {locale === "vi"
                      ? "Quy chuẩn Tài nguyên & Quy đổi Tiệm:"
                      : "Resource Totals & Guild Shop Conversion:"}
                  </p>
                  <ul className="list-disc space-y-1 pl-4 text-muted-foreground">
                    <li>
                      {locale === "vi"
                        ? "Tổng từ Bậc 0 ➔ Bậc 4 (Hóa Đỏ hoàn toàn): 9 Đá Linh Hồn theo Phe (Bậc 1 = 1, Bậc 2 = 2, Bậc 3 = 2, Bậc 4 = 4) + 345 Mảnh Anh Hùng Cam (Bậc 1 = 55, Bậc 2 = 105, Bậc 3 = 155, Bậc 4 = 30)."
                        : "Total from Tier 0 to Tier 4 (Full Mythic Ascension): 9 Faction Soul Stones (T1 = 1, T2 = 2, T3 = 2, T4 = 4) + 345 Legendary Hero Shards (T1 = 55, T2 = 105, T3 = 155, T4 = 30)."}
                    </li>
                    <li>
                      {locale === "vi"
                        ? "Quy đổi Tiệm Vinh Quang Hội (Tiền Mùa Giải): 40K Vinh Quang Hội / 1 Đá Linh Hồn (Tổng 9 viên = 360K Vinh Quang Hội)."
                        : "Guild Honor Shop (Pre-Season): 40K Guild Honor / 1 Soul Stone (Total 9 stones = 360K Guild Honor)."}
                    </li>
                    <li>
                      {locale === "vi"
                        ? "Quy đổi Tiệm Vinh Quang Season 1+: 6K Xu Bang S1 / 1 Đá Linh Hồn (Tổng 9 viên = 54K Xu Bang S1)."
                        : "Season 1+ Glory Shop: 6K S1 Guild Coins / 1 Soul Stone (Total 9 stones = 54K S1 Guild Coins)."}
                    </li>
                  </ul>
                </div>

                {/* Bảng chi tiết các giai đoạn trong lộ trình đang chọn */}
                {result.tierBreakdown.length > 0 ? (
                  <div className="space-y-2">
                    <h4 className="text-sm font-heading font-bold text-foreground">
                      {locale === "vi"
                        ? `Các giai đoạn trong lộ trình đang chọn (${result.tierBreakdown.length} giai đoạn)`
                        : `Active Route Stages (${result.tierBreakdown.length} stages)`}
                    </h4>
                    <div className="overflow-x-auto">
                      <table
                        data-testid="hero-awakening-breakdown-table"
                        className="w-full min-w-[520px] border-collapse text-left text-xs"
                      >
                        <thead>
                          <tr className="border-b border-border/80 bg-muted/40 font-sans font-semibold text-muted-foreground">
                            <th className="py-2 px-2.5">{locale === "vi" ? "Giai đoạn" : "Stage"}</th>
                            <th className="py-2 px-2.5 text-right">{locale === "vi" ? "Đá Linh Hồn" : "Soul Stones"}</th>
                            <th className="py-2 px-2.5 text-right">{locale === "vi" ? "Mảnh Tướng" : "Hero Shards"}</th>
                            <th className="py-2 px-2.5 text-right">{locale === "vi" ? "Tích lũy" : "Cumulative"}</th>
                            <th className="py-2 px-2.5">{locale === "vi" ? "Hiệu ứng mở khóa" : "Unlock Effect"}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50 font-sans tabular-nums">
                          {result.tierBreakdown.map((item) => (
                            <tr key={item.tierKey} className="hover:bg-secondary/40">
                              <td className="py-2 px-2.5 font-bold text-foreground">
                                {item.stageLabel[locale]}
                              </td>
                              <td className="py-2 px-2.5 text-right font-mono font-extrabold text-rose-600 dark:text-rose-400">
                                +{item.stageStones}
                              </td>
                              <td className="py-2 px-2.5 text-right font-mono font-extrabold text-amber-600 dark:text-amber-400">
                                +{item.stageShards}
                              </td>
                              <td className="py-2 px-2.5 text-right font-mono text-muted-foreground">
                                {item.cumulativeStonesAtEnd} / {item.cumulativeShardsAtEnd}
                              </td>
                              <td className="py-2 px-2.5 text-amber-700 dark:text-amber-400">
                                {item.milestoneNote ? item.milestoneNote[locale] : "—"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : null}

                {/* Bảng chuẩn 20 mốc Thức Tỉnh */}
                <div className="space-y-2">
                  <h4 className="text-sm font-heading font-bold text-foreground">
                    {locale === "vi"
                      ? "Bảng Tra Cứu 20 Mốc Thức Tỉnh (Step 0 ➔ Step 19)"
                      : "Full 20-Node Awakening Reference Table (Step 0 ➔ Step 19)"}
                  </h4>
                  <div className="max-h-60 overflow-y-auto overflow-x-auto">
                    <table className="w-full min-w-[480px] border-collapse text-left text-xs">
                      <thead>
                        <tr className="border-b border-border/70 bg-muted/40 font-sans font-semibold text-muted-foreground">
                          <th className="py-2 px-2.5">{locale === "vi" ? "Mốc Bậc" : "Tier Node"}</th>
                          <th className="py-2 px-2.5 text-right">{locale === "vi" ? "Đá Bước Này" : "Step Stones"}</th>
                          <th className="py-2 px-2.5 text-right">{locale === "vi" ? "Mảnh Bước Này" : "Step Shards"}</th>
                          <th className="py-2 px-2.5 text-right">{locale === "vi" ? "Tích Lũy (Đá / Mảnh)" : "Cumulative (St / Sh)"}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/50 font-sans tabular-nums">
                        {AWAKENING_MILESTONE_NODES.map((node) => (
                          <tr key={node.stepIndex} className="hover:bg-muted/30">
                            <td className="py-1.5 px-2.5 font-bold text-foreground">
                              {node.shortLabel[locale]}
                            </td>
                            <td className="py-1.5 px-2.5 text-right font-mono text-rose-600 dark:text-rose-400">
                              +{node.stepStones}
                            </td>
                            <td className="py-1.5 px-2.5 text-right font-mono text-amber-600 dark:text-amber-400">
                              +{node.stepShards}
                            </td>
                            <td className="py-1.5 px-2.5 text-right font-mono font-bold text-foreground">
                              {node.cumulativeStones} / {node.cumulativeShards}
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

      {/* 3. Hai Thẻ Nguyên Liệu Xếp Chồng Dọc Chuẩn R5 (3 Cột Ngang + K/M) */}
      <div data-testid="hero-awakening-result-section" className="space-y-3">
        {result.isInvalidRange ? (
          <section
            data-testid="hero-awakening-invalid-range-alert"
            role="alert"
            className={cn(
              CALC_MD3.surfaceCard,
              "flex flex-col items-start justify-between gap-2.5 border-amber-500/35 bg-amber-500/10 p-3 sm:flex-row sm:items-center"
            )}
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
          </section>
        ) : (
          <>
            {/* Thẻ 1: Đá Linh Hồn Theo Phe */}
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
                    src={result.soulStoneMaterial.iconPath}
                    alt={soulStoneName}
                    rarity={result.soulStoneMaterial.rarity}
                    faction={result.soulStoneMaterial.faction}
                    size="md"
                  />
                  <div>
                    <div className="text-base font-heading font-black text-foreground">
                      {soulStoneName}
                    </div>
                    <div className="text-xs font-sans text-muted-foreground">
                      {result.fromNode.shortLabel[locale]} ➔{" "}
                      {result.toNode.shortLabel[locale]}
                    </div>
                  </div>
                </div>

                <span
                  data-testid="awakening-guild-honor-badge"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500/15 px-2.5 py-1 text-xs font-sans font-semibold text-amber-800 dark:text-amber-300"
                >
                  <Coins className="h-3.5 w-3.5 shrink-0 text-amber-500" aria-hidden="true" />
                  {locale === "vi"
                    ? `${formatCompactNumber(result.missingStonesGuildHonorCost)} (${formatExactNumber(result.missingStonesGuildHonorCost)}) Vinh Quang Hội / ${formatCompactNumber(result.missingStonesGuildCoinS1Cost)} Xu Bang S1`
                    : `${formatCompactNumber(result.missingStonesGuildHonorCost)} (${formatExactNumber(result.missingStonesGuildHonorCost)}) Guild Honor / ${formatCompactNumber(result.missingStonesGuildCoinS1Cost)} S1 Coins`}
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
                      data-testid="awakening-required-stones"
                      title={formatExactNumber(result.requiredStones)}
                      className="font-mono text-xl font-black tabular-nums text-amber-600 dark:text-amber-400"
                    >
                      {formatCompactNumber(result.requiredStones)}
                    </span>
                    <span className="text-xs font-sans font-semibold text-muted-foreground">
                      {locale === "vi" ? "Viên Đá" : "Stones"}
                    </span>
                  </div>
                  <span className="text-xs font-sans text-muted-foreground">
                    {locale === "vi"
                      ? `Đã khảm: ${result.alreadyInvestedStones}/9 Đá`
                      : `Invested: ${result.alreadyInvestedStones}/9 Stones`}
                  </span>
                </div>

                {/* Cột 2: Số lượng đang có */}
                <div className={cn(CALC_MD3.tonalGroup, "flex flex-col justify-between gap-1.5")}>
                  <label
                    htmlFor="awakening-owned-stones-input"
                    className={CALC_MD3.eyebrow}
                  >
                    {locale === "vi" ? "Số lượng đang có" : "Owned"}
                  </label>
                  <Input
                    id="awakening-owned-stones-input"
                    data-testid="awakening-owned-stones-input"
                    type="text"
                    inputMode="decimal"
                    value={ownedStonesInput}
                    onChange={(e) => setOwnedStonesInput(e.target.value)}
                    placeholder="0"
                    className={CALC_MD3.dataInput}
                  />
                  <span className="text-xs font-sans text-muted-foreground">
                    {locale === "vi"
                      ? "Tiệm Hội: 40K / 6K Xu S1"
                      : "Shop: 40K Honor / 6K S1"}
                  </span>
                </div>

                {/* Cột 3: Số lượng còn thiếu */}
                <div
                  className={cn(
                    CALC_MD3.tonalGroup,
                    "flex flex-col justify-between gap-1",
                    result.missingStones > 0
                      ? "bg-amber-500/10 ring-1 ring-amber-500/35"
                      : "bg-emerald-500/10 ring-1 ring-emerald-500/35"
                  )}
                >
                  <span className={CALC_MD3.eyebrow}>
                    {locale === "vi" ? "Số lượng còn thiếu" : "Missing"}
                  </span>
                  {result.missingStones > 0 ? (
                    <>
                      <div className="flex items-baseline gap-1.5">
                        <span
                          data-testid="awakening-missing-stones-status"
                          title={formatExactNumber(result.missingStones)}
                          className="font-mono text-xl font-black tabular-nums text-rose-600 dark:text-rose-400"
                        >
                          {formatCompactNumber(result.missingStones)}
                        </span>
                        <span className="text-xs font-sans font-semibold text-rose-600/80 dark:text-rose-300">
                          {locale === "vi" ? "viên" : "stones"}
                        </span>
                      </div>
                      <span className="text-xs font-sans text-muted-foreground">
                        {locale === "vi"
                          ? `Thiếu ${result.missingStones} viên Đá Linh Hồn`
                          : `Missing ${result.missingStones} Soul Stones`}
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                        <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                        <span
                          data-testid="awakening-surplus-stones-status"
                          className="text-base font-heading font-black tabular-nums"
                        >
                          {locale === "vi" ? "Đủ nguyên liệu" : "Sufficient"}
                        </span>
                      </div>
                      <span className="text-xs font-sans text-emerald-700/80 dark:text-emerald-300">
                        {locale === "vi"
                          ? `Dư +${formatCompactNumber(result.surplusStones)} viên`
                          : `Surplus +${formatCompactNumber(result.surplusStones)} stones`}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </section>

            {/* Thẻ 2: Mảnh Vạn Năng Anh Hùng Cam */}
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
                    alt={universalShardName}
                    rarity={result.universalShardMaterial.rarity}
                    size="md"
                  />
                  <div>
                    <div className="text-base font-heading font-black text-foreground">
                      {universalShardName}
                    </div>
                    <div className="text-xs font-sans text-muted-foreground">
                      {locale === "vi"
                        ? "Mảnh Tướng Riêng hoặc Mảnh Vạn Năng Anh Hùng Cam"
                        : "Named Hero Shards or Legendary Universal Hero Shards"}
                    </div>
                  </div>
                </div>
                <span className="text-xs font-sans tabular-nums text-muted-foreground">
                  {locale === "vi"
                    ? `Đã đầu tư: ${result.alreadyInvestedShards}/345 Mảnh`
                    : `Invested: ${result.alreadyInvestedShards}/345 Shards`}
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
                      data-testid="awakening-required-shards"
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
                    htmlFor="awakening-owned-shards-input"
                    className={CALC_MD3.eyebrow}
                  >
                    {locale === "vi" ? "Số lượng đang có" : "Owned"}
                  </label>
                  <Input
                    id="awakening-owned-shards-input"
                    data-testid="awakening-owned-shards-input"
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
                          data-testid="awakening-missing-shards-status"
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
                          data-testid="awakening-surplus-shards-status"
                          className="text-base font-heading font-black tabular-nums"
                        >
                          {locale === "vi" ? "Đủ nguyên liệu" : "Sufficient"}
                        </span>
                      </div>
                      <span className="text-xs font-sans text-emerald-700/80 dark:text-emerald-300">
                        {locale === "vi"
                          ? `Dư +${formatCompactNumber(result.surplusShards)} mảnh`
                          : `Surplus +${formatCompactNumber(result.surplusShards)} shards`}
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

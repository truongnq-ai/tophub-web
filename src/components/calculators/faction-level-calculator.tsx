"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Info,
  X,
  Sparkles,
  Database,
  Shield,
} from "lucide-react";
import {
  FACTION_CONFIGS,
  calculateFactionLevelUpgrade,
  getCumulativeFactionState,
  getFactionLevelRow,
  type FactionCalculationMode,
  type FactionId,
  type FactionProgressPoint,
  type FactionShardRarity,
} from "@/content/calculators/faction-level-data";
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
import { FactionLevelSelector } from "./faction-level-selector";
import {
  CALC_MD3,
  CalculatorMetricValue,
  CalculatorToolHeader,
} from "./calculator-md3-primitives";

export interface FactionLevelCalculatorProps {
  readonly zone?: CalculatorZone;
  readonly category: CalculatorCategory;
  readonly tool: CalculatorToolItem;
  readonly locale: CalculatorLocale;
}

const FACTION_ORDER: readonly FactionId[] = ["league", "horde", "nature"];

export function FactionLevelCalculator({
  tool,
  locale,
}: FactionLevelCalculatorProps) {
  // Mặc định: Phe Bộ Tộc (Horde), Mảnh Cam SSR, Chế độ Chuẩn Bảng Gốc SSoT, Khởi đầu (Lv.1 • 0 vạch) -> Đỉnh Hào Quang Lv.40 (12/12 vạch = 692.162M Thịt & 1,237 Mảnh)
  const [faction, setFaction] = useState<FactionId>("horde");
  const [shardRarity, setShardRarity] =
    useState<FactionShardRarity>("legendary");
  const [mode, setMode] = useState<FactionCalculationMode>("ssot_verified");
  const [fromPoint, setFromPoint] = useState<FactionProgressPoint>({
    level: 1,
    completedBars: 0,
  });
  const [toPoint, setToPoint] = useState<FactionProgressPoint>({
    level: 40,
    completedBars: 12,
  });
  const [ownedMeatInput, setOwnedMeatInput] = useState<string>("0");
  const [ownedShardsInput, setOwnedShardsInput] = useState<string>("0");
  const [isBreakdownOpen, setIsBreakdownOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsBreakdownOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleChangeFromPoint = (nextFrom: FactionProgressPoint) => {
    setFromPoint(nextFrom);
    const nextFromState = getCumulativeFactionState(nextFrom, mode);
    const currentToState = getCumulativeFactionState(toPoint, mode);
    if (currentToState.cumulativeBars < nextFromState.cumulativeBars) {
      setToPoint(nextFrom);
    }
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
      calculateFactionLevelUpgrade({
        faction,
        shardRarity,
        mode,
        fromPoint,
        toPoint,
        ownedMeat: parsedOwnedMeat,
        ownedShards: parsedOwnedShards,
      }),
    [
      faction,
      shardRarity,
      mode,
      fromPoint,
      toPoint,
      parsedOwnedMeat,
      parsedOwnedShards,
    ]
  );

  const meatMaterialName =
    locale === "vi"
      ? result.meatMaterial.nameVi
      : result.meatMaterial.nameEn;

  const shardMaterialName =
    locale === "vi"
      ? result.shardMaterial.nameVi
      : result.shardMaterial.nameEn;

  const breakdownLabel =
    locale === "vi"
      ? "Xem bảng phân rã chi phí theo từng giai đoạn 10 cấp"
      : "View 10-level tier cost breakdown";

  return (
    <div data-testid="faction-level-calculator" className="space-y-4">
      {/* 1. Flat MD3 Tool Header */}
      <CalculatorToolHeader
        code={tool.code}
        title={tool.title[locale].replace(`${tool.code} `, "")}
        actions={
          <>
            <div
              role="group"
              aria-label={
                locale === "vi"
                  ? "Chế độ dữ liệu bảng gốc"
                  : "Dataset calculation mode"
              }
              className="flex flex-wrap items-center gap-1.5"
            >
              <button
                type="button"
                data-testid="faction-mode-ssot-btn"
                aria-pressed={mode === "ssot_verified"}
                onClick={() => setMode("ssot_verified")}
                className={cn(
                  CALC_MD3.chipButton,
                  "font-sans",
                  mode === "ssot_verified"
                    ? "bg-amber-500 font-black text-slate-950"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Database className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>
                  {locale === "vi" ? "Chuẩn SSoT (Bảng 8.4)" : "Verified SSoT"}
                </span>
              </button>

              <button
                type="button"
                data-testid="faction-mode-extended-btn"
                aria-pressed={mode === "extended_s1"}
                onClick={() => setMode("extended_s1")}
                className={cn(
                  CALC_MD3.chipButton,
                  "font-sans",
                  mode === "extended_s1"
                    ? "bg-sky-500 font-black text-slate-950"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Sparkles className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>
                  {locale === "vi"
                    ? "Mở Rộng S1+ (Full Lv.80)"
                    : "Extended S1+ (Lv.80)"}
                </span>
              </button>
            </div>

            <button
              type="button"
              data-testid="faction-level-reset-btn"
              onClick={() => {
                setFaction("horde");
                setShardRarity("legendary");
                setMode("ssot_verified");
                setFromPoint({ level: 1, completedBars: 0 });
                setToPoint({ level: 40, completedBars: 12 });
                setOwnedMeatInput("0");
                setOwnedShardsInput("0");
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

      {/* 2. Strategic Faction Aura Milestones Banner (1 lớp viền duy nhất) */}
      <div
        data-testid="faction-aura-banner"
        className="rounded-2xl border border-amber-500/35 bg-amber-500/[0.06] p-3.5 sm:p-5 space-y-2"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-2.5 py-1 text-xs font-sans font-bold text-emerald-700 dark:text-emerald-300">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              <span>
                {locale === "vi"
                  ? "Hào Quang Phe: +5.00% HP Đội Hình Mỗi 10 Cấp (Lv.40 = +20.00% Queue HP)"
                  : "Faction Aura: +5.00% Queue HP Every 10 Levels (Lv.40 = +20.00% Queue HP)"}
              </span>
            </span>

            <span className="text-xs sm:text-sm font-sans font-semibold text-muted-foreground">
              {locale === "vi"
                ? "Chuẩn SSoT: Lv.1–40 = 692.162M Thịt & 1,237 Mảnh • Lv.1–50 = 1,181.162M Thịt & 1,307 Mảnh"
                : "SSoT Benchmarks: Lv.1–40 = 692.162M Meat & 1,237 Shards • Lv.1–50 = 1,181.162M Meat & 1,307 Shards"}
            </span>
          </div>

          {/* Shard Rarity Selector (Legendary vs Epic Universal Shards) */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              data-testid="shard-rarity-legendary-btn"
              aria-pressed={shardRarity === "legendary"}
              onClick={() => setShardRarity("legendary")}
              className={cn(
                CALC_MD3.chipButton,
                "px-2.5 font-sans text-xs sm:text-sm",
                shardRarity === "legendary"
                  ? "bg-amber-500 font-black text-slate-950"
                  : "bg-background/80 text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <span>
                {locale === "vi" ? "Mảnh Cam (SSR)" : "Legendary Shard"}
              </span>
            </button>
            <button
              type="button"
              data-testid="shard-rarity-epic-btn"
              aria-pressed={shardRarity === "epic"}
              onClick={() => setShardRarity("epic")}
              className={cn(
                CALC_MD3.chipButton,
                "px-2.5 font-sans text-xs sm:text-sm",
                shardRarity === "epic"
                  ? "bg-purple-500 font-black text-white"
                  : "bg-background/80 text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <span>{locale === "vi" ? "Mảnh Tím (SR)" : "Epic Shard"}</span>
            </button>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-foreground/85">
          {result.factionConfig.emblemNote[locale]} •{" "}
          {locale === "vi"
            ? "Mỗi cấp Phe gồm 1 đến 12 vạch thanh EXP tiêu thụ Thịt và cộng trực tiếp ATK/HP Anh Hùng; ở vạch đột phá cuối mỗi cấp sẽ nộp Mảnh Tướng dư thừa."
            : "Each Faction Level contains 1 to 12 EXP bar segments consuming Meat for flat Hero ATK/HP, followed by a Hero Shard breakthrough at the end of the level."}
        </p>
      </div>

      {/* 3. Main 3-Zone Workspace: [Cấp Phe Hiện Tại (X)] ⟷ [Biểu Tượng Phe Trung Tâm] ⟷ [Cấp Phe Mục Tiêu (Y)] */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-start gap-3 sm:gap-4">
        {/* Left: Current Faction Progress (X) */}
        <div className="order-2 lg:order-1 min-w-0">
          <FactionLevelSelector
            idPrefix="from"
            title={
              locale === "vi"
                ? "Cấp Phe Hiện Tại"
                : "Current Faction Level"
            }
            point={fromPoint}
            mode={mode}
            locale={locale}
            onChangePoint={handleChangeFromPoint}
          />
        </div>

        {/* Center: Faction Emblem Hub (League / Horde / Nature) */}
        <div
          data-testid="central-faction-hub"
          className="order-1 lg:order-2 flex flex-col items-center justify-center gap-2 py-1 lg:px-1 lg:pt-6"
        >
          <div className="flex flex-col items-center gap-1.5 rounded-2xl border border-amber-500/40 bg-amber-500/[0.06] px-4 py-3 shadow-sm">
            <GameAssetFrame
              src={result.factionConfig.soulStoneMaterial.iconPath}
              alt={result.factionConfig.name[locale]}
              rarity="mythic"
              faction={faction}
              size="lg"
            />
            <div className="text-center">
              <div
                data-testid="central-faction-name"
                className="text-sm sm:text-base font-heading font-black text-foreground"
              >
                {result.factionConfig.name[locale]}
              </div>
              <div className="text-xs font-sans font-bold text-emerald-700 dark:text-emerald-400">
                Aura:{" "}
                <span className="font-mono">
                  +{result.startAuraQueueHpPct}% ➔ +{result.targetAuraQueueHpPct}%
                </span>{" "}
                HP
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {FACTION_ORDER.map((fKey) => {
              const cfg = FACTION_CONFIGS[fKey];
              const isSelected = faction === fKey;
              return (
                <button
                  key={fKey}
                  type="button"
                  data-testid={`faction-tab-${fKey}`}
                  aria-pressed={isSelected}
                  onClick={() => setFaction(fKey)}
                  className={cn(
                    CALC_MD3.chipButton,
                    "px-2.5 font-sans text-xs",
                    isSelected
                      ? "bg-amber-500 font-black text-slate-950"
                      : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Shield className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>{cfg.name[locale]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Target Faction Progress (Y) */}
        <div className="order-3 min-w-0">
          <FactionLevelSelector
            idPrefix="to"
            title={
              locale === "vi"
                ? "Cấp Phe Mục Tiêu"
                : "Target Faction Level"
            }
            point={toPoint}
            mode={mode}
            locale={locale}
            onChangePoint={setToPoint}
          />
        </div>
      </div>

      {/* 4. Contextual Aura Proximity Advisory CTA (Khi mục tiêu đang sát cột mốc Lv.10/20/30/40) */}
      {result.nearAuraMilestoneLevel !== null ? (
        <div
          data-testid="faction-near-aura-warning"
          role="alert"
          className="flex flex-col justify-between gap-3 rounded-2xl border border-emerald-500/45 bg-emerald-500/10 p-3.5 sm:flex-row sm:items-center sm:p-5"
        >
          <div className="flex items-start gap-2.5">
            <Sparkles
              className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500"
              aria-hidden="true"
            />
            <div className="space-y-1">
              <div className="text-sm sm:text-base font-heading font-black text-emerald-700 dark:text-emerald-300">
                {locale === "vi"
                  ? `Sát Cột Mốc Hào Quang Lv.${result.nearAuraMilestoneLevel}: Nâng Trọn Vẹn Để Nhận Thêm +5.00% HP Đội Hình!`
                  : `Approaching Lv.${result.nearAuraMilestoneLevel} Aura Milestone: Complete It to Unlock +5.00% Queue HP!`}
              </div>
              <p className="text-sm leading-relaxed text-foreground/85">
                {locale === "vi"
                  ? `Cột mốc Lv.${result.nearAuraMilestoneLevel} cộng thẳng +5.00% HP cho toàn bộ Đội hình (Queue HP Aura). Đừng dừng lưng chừng trước mốc đột phá này!`
                  : `Completing Faction Level ${result.nearAuraMilestoneLevel} permanently grants +5.00% Queue HP Aura across your lineup. Push through to secure the milestone!`}
              </p>
            </div>
          </div>

          <button
            type="button"
            data-testid="push-to-next-aura-milestone-btn"
            onClick={() => {
              const targetLv = result.nearAuraMilestoneLevel!;
              const row = getFactionLevelRow(targetLv, mode);
              setToPoint({ level: targetLv, completedBars: row.bars });
            }}
            className={cn(
              CALC_MD3.chipButton,
              "shrink-0 bg-emerald-500 px-4 font-heading font-bold text-slate-950 hover:bg-emerald-600"
            )}
          >
            {locale === "vi"
              ? `Đẩy Tới Hoàn Tất Lv.${result.nearAuraMilestoneLevel} (+5% HP)`
              : `Push to Complete Lv.${result.nearAuraMilestoneLevel} (+5% HP)`}
          </button>
        </div>
      ) : null}

      {/* 5. Dual Result Surface (Meat + Hero Shards) + [i] Breakdown Button */}
      <div
        data-testid="faction-level-result-card"
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
            data-testid="faction-level-invalid-range-warning"
            role="alert"
            className="flex items-start gap-2.5 rounded-xl bg-amber-500/10 p-3 text-sm font-medium text-amber-800 dark:text-amber-300"
          >
            <AlertTriangle
              className="mt-0.5 h-5 w-5 shrink-0 text-amber-500"
              aria-hidden="true"
            />
            <span>
              {locale === "vi"
                ? "Mục tiêu Cấp Phe & Vạch EXP phải lớn hơn điểm xuất phát ít nhất 1 vạch EXP."
                : "Target Faction Level and EXP bar segment must be at least 1 bar ahead of the starting point."}
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {/* Resource 1 (tonal): Meat Required */}
            <div className={cn(CALC_MD3.tonalGroup, "space-y-3")}>
              <div className="flex min-w-0 items-center gap-2.5">
                <GameAssetFrame
                  src={result.meatMaterial.iconPath}
                  alt={meatMaterialName}
                  rarity={result.meatMaterial.rarity}
                  size="sm"
                />
                <div className="min-w-0 space-y-1">
                  <div
                    className={cn(
                      CALC_MD3.eyebrow,
                      "truncate text-muted-foreground"
                    )}
                  >
                    {meatMaterialName}
                  </div>
                  <CalculatorMetricValue
                    testId="faction-required-meat-value"
                    value={formatCompactNumber(result.requiredMeat)}
                    unit={
                      locale === "vi" ? "Thịt cần bơm" : "Meat needed"
                    }
                    toneClassName="text-amber-600 dark:text-amber-400"
                  />
                  <div className="text-xs font-sans text-muted-foreground">
                    {locale === "vi" ? "Theo triệu (M):" : "In Millions:"}{" "}
                    <span className="font-mono font-semibold text-foreground">
                      {(result.requiredMeatK / 1_000).toLocaleString("en-US", {
                        minimumFractionDigits: 3,
                        maximumFractionDigits: 3,
                      })}
                      M
                    </span>{" "}
                    •{" "}
                    {locale === "vi" ? "Số vạch:" : "Bars:"}{" "}
                    <span className="font-mono font-semibold text-foreground">
                      {result.requiredBars}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2">
                <label
                  htmlFor="faction-owned-meat-input"
                  className="whitespace-nowrap text-sm font-sans font-semibold text-foreground"
                >
                  {locale === "vi"
                    ? "Đang có (VD: 500m, 1.2b):"
                    : "Owned (e.g. 500m, 1.2b):"}
                </label>
                <div className="flex items-center gap-2">
                  <Input
                    id="faction-owned-meat-input"
                    data-testid="faction-owned-meat-input"
                    type="text"
                    inputMode="decimal"
                    value={ownedMeatInput}
                    onChange={(e) => setOwnedMeatInput(e.target.value)}
                    className={cn(
                      CALC_MD3.dataInput,
                      "w-28 bg-card text-center"
                    )}
                  />
                  {result.missingMeat === 0 ? (
                    <span
                      data-testid="faction-missing-meat-badge"
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
                      data-testid="faction-missing-meat-badge"
                      title={formatExactNumber(result.missingMeat)}
                      className="inline-flex items-center rounded-lg bg-amber-500/15 px-2.5 py-1 font-mono text-sm font-bold text-amber-700 dark:text-amber-300"
                    >
                      -{formatCompactNumber(result.missingMeat)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Resource 2 (tonal): Hero Shards + Stat Gains + [i] Breakdown Toggle */}
            <div className={cn(CALC_MD3.tonalGroup, "space-y-3")}>
              <div className="flex min-w-0 items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2.5">
                  <GameAssetFrame
                    src={result.shardMaterial.iconPath}
                    alt={shardMaterialName}
                    rarity={result.shardMaterial.rarity}
                    size="sm"
                  />
                  <div className="min-w-0 space-y-1">
                    <div
                      className={cn(
                        CALC_MD3.eyebrow,
                        "truncate text-muted-foreground"
                      )}
                    >
                      {shardMaterialName}
                    </div>
                    <CalculatorMetricValue
                      testId="faction-required-shards-value"
                      value={formatExactNumber(result.requiredShards)}
                      unit={
                        locale === "vi" ? "Mảnh cần nộp" : "Shards needed"
                      }
                      toneClassName="text-sky-600 dark:text-sky-400"
                    />
                    <div className="flex flex-wrap items-center gap-2 text-xs font-sans text-muted-foreground">
                      <span className="font-semibold text-emerald-700 dark:text-emerald-300">
                        Aura:{" "}
                        <span className="font-mono">
                          +{result.gainedAuraQueueHpPct}%
                        </span>{" "}
                        {locale === "vi" ? "HP Đội" : "Queue HP"}
                      </span>
                      <span>
                        • ATK{" "}
                        <span className="font-mono font-semibold text-foreground">
                          +{formatExactNumber(result.gainedAtk)}
                        </span>{" "}
                        • HP{" "}
                        <span className="font-mono font-semibold text-foreground">
                          +{formatExactNumber(result.gainedHp)}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  data-testid="toggle-faction-breakdown-btn"
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

              <div className="flex flex-wrap items-center justify-between gap-2">
                <label
                  htmlFor="faction-owned-shards-input"
                  className="whitespace-nowrap text-sm font-sans font-semibold text-foreground"
                >
                  {locale === "vi"
                    ? "Đang có (VD: 500, 1k):"
                    : "Owned (e.g. 500, 1k):"}
                </label>
                <div className="flex items-center gap-2">
                  <Input
                    id="faction-owned-shards-input"
                    data-testid="faction-owned-shards-input"
                    type="text"
                    inputMode="decimal"
                    value={ownedShardsInput}
                    onChange={(e) => setOwnedShardsInput(e.target.value)}
                    className={cn(
                      CALC_MD3.dataInput,
                      "w-28 bg-card text-center"
                    )}
                  />
                  {result.missingShards === 0 ? (
                    <span
                      data-testid="faction-missing-shards-badge"
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
                      data-testid="faction-missing-shards-badge"
                      className="inline-flex items-center rounded-lg bg-sky-500/15 px-2.5 py-1 font-mono text-sm font-bold text-sky-700 dark:text-sky-300"
                    >
                      -{formatExactNumber(result.missingShards)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 6. On-Demand 10-Level Tier Breakdown Panel (1 lớp viền, bảng không viền bao) */}
      {isBreakdownOpen && !result.isInvalidRange ? (
        <div
          data-testid="faction-breakdown-panel"
          className={cn(CALC_MD3.surfaceCard, "space-y-3")}
        >
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-base sm:text-lg font-heading font-bold text-foreground">
              {locale === "vi"
                ? `Phân Rã Lộ Trình Cấp Phe (${result.factionConfig.name.vi})`
                : `Faction Progression Breakdown (${result.factionConfig.name.en})`}
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
              data-testid="faction-breakdown-table"
              className="w-full min-w-[580px] border-collapse text-left text-sm"
            >
              <thead>
                <tr className="border-b border-border/70 bg-muted/40 text-xs font-sans font-semibold uppercase tracking-wide text-muted-foreground">
                  <th className="py-2.5 px-3">
                    {locale === "vi" ? "Cụm Cấp Phe" : "Level Bracket"}
                  </th>
                  <th className="py-2.5 px-3 text-right">
                    {locale === "vi" ? "Số Vạch" : "Bars"}
                  </th>
                  <th className="py-2.5 px-3 text-right">
                    {locale === "vi" ? "Thịt Tiêu Hao" : "Meat Cost"}
                  </th>
                  <th className="py-2.5 px-3 text-right">
                    {locale === "vi" ? "Mảnh Tướng" : "Hero Shards"}
                  </th>
                  <th className="py-2.5 px-3">
                    {locale === "vi"
                      ? "Chỉ Số & Hào Quang"
                      : "Stats & Queue Aura"}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50 font-sans tabular-nums">
                {result.decadeBreakdown.map((item) => (
                  <tr
                    key={`${item.startLevel}-${item.endLevel}`}
                    className="hover:bg-amber-500/[0.04] transition-colors"
                  >
                    <td className="py-2.5 px-3 font-bold text-foreground">
                      {item.bracketLabel[locale]}
                    </td>
                    <td className="py-2.5 px-3 text-right text-muted-foreground">
                      {item.barsInBracket}
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-amber-700 dark:text-amber-400">
                      +{(item.meatRequired / 1_000_000).toFixed(3)}M
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-sky-600 dark:text-sky-400">
                      +{formatExactNumber(item.shardsRequired)}
                    </td>
                    <td className="py-2.5 px-3 text-muted-foreground">
                      +{formatExactNumber(item.atkGained)} ATK • +
                      {formatExactNumber(item.hpGained)} HP
                      {item.auraGainedPct > 0
                        ? ` • ★ +${item.auraGainedPct}% Queue HP`
                        : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs sm:text-sm font-sans tabular-nums text-muted-foreground">
            <span>
              {locale === "vi"
                ? `Đã đầu tư: ${formatCompactNumber(result.fromState.exactMeat)} Thịt & ${formatExactNumber(result.fromState.cumulativeShards)} Mảnh • Đích tích lũy: ${formatCompactNumber(result.toState.exactMeat)} Thịt & ${formatExactNumber(result.toState.cumulativeShards)} Mảnh`
                : `Already invested: ${formatCompactNumber(result.fromState.exactMeat)} Meat & ${formatExactNumber(result.fromState.cumulativeShards)} Shards • Target total: ${formatCompactNumber(result.toState.exactMeat)} Meat & ${formatExactNumber(result.toState.cumulativeShards)} Shards`}
            </span>
            <span>
              {mode === "ssot_verified"
                ? locale === "vi"
                  ? "Chế độ: Chuẩn Bảng Gốc SSoT (Khớp Bảng 8.4)"
                  : "Mode: Verified SSoT Table (Matches Table 8.4)"
                : locale === "vi"
                  ? "Chế độ: Mở rộng Season 1+ (Nội suy Lv.41–80)"
                  : "Mode: Extended Season 1+ (Extrapolated Lv.41–80)"}
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
}

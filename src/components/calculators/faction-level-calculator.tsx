"use client";

import React, { useState, useMemo } from "react";
import {
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Shield,
} from "lucide-react";
import {
  FACTION_CONFIGS,
  calculateFactionLevelUpgrade,
  getCumulativeFactionState,
  getFactionLevelRow,
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
import { CalculatorInfoPopover } from "./calculator-info-popover";

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
  // Mặc định: Phe Bộ Tộc (Horde), Mảnh Cam SSR, Full dữ liệu Lv.1–80 (extended_s1)
  const [faction, setFaction] = useState<FactionId>("horde");
  const [shardRarity, setShardRarity] =
    useState<FactionShardRarity>("legendary");
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

  const handleChangeFromPoint = (nextFrom: FactionProgressPoint) => {
    setFromPoint(nextFrom);
    const nextFromState = getCumulativeFactionState(nextFrom, "extended_s1");
    const currentToState = getCumulativeFactionState(toPoint, "extended_s1");
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
        mode: "extended_s1",
        fromPoint,
        toPoint,
        ownedMeat: parsedOwnedMeat,
        ownedShards: parsedOwnedShards,
      }),
    [
      faction,
      shardRarity,
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

  return (
    <div data-testid="faction-level-calculator" className="space-y-4">
      {/* 1. Flat MD3 Tool Header */}
      <CalculatorToolHeader
        code={tool.code}
        title={tool.title[locale].replace(`${tool.code} `, "")}
        actions={
          <>
            {/* Shard Rarity Selector (Legendary vs Epic Universal Shards) */}
            <div
              role="group"
              aria-label={
                locale === "vi"
                  ? "Phẩm chất Mảnh Tướng nộp đột phá"
                  : "Breakthrough Hero Shard rarity"
              }
              className="flex flex-wrap items-center gap-1.5"
            >
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
                    : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
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
                    : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <span>{locale === "vi" ? "Mảnh Tím (SR)" : "Epic Shard"}</span>
              </button>
            </div>

            <CalculatorInfoPopover
              triggerTestId="toggle-faction-breakdown-btn"
              title={
                locale === "vi"
                  ? "Phân Rã Chi Phí Cấp Phe & Cơ Chế Hào Quang"
                  : "Faction Level Cost Breakdown & Aura Mechanics"
              }
              locale={locale} triggerLabel={
                locale === "vi"
                  ? "Xem bảng phân rã chi phí theo từng giai đoạn 10 cấp"
                  : "View 10-level tier cost breakdown"
              }
            >
              <div data-testid="faction-breakdown-panel" className="space-y-4">
                <div className="rounded-xl bg-amber-500/10 p-3 text-sm leading-relaxed text-foreground/90">
                  {locale === "vi" ? (
                    <>
                      <strong>Quy luật liên thông & Hào Quang Phe:</strong>{" "}
                      Trạng thái <span className="font-mono">Lv.L • Đủ vạch</span>{" "}
                      đồng nhất hoàn toàn với{" "}
                      <span className="font-mono">Lv.(L+1) • 0 vạch</span>. Mỗi{" "}
                      <span className="font-mono">10</span> cấp hoàn tất (
                      <span className="font-mono">Lv.10, 20, 30, 40</span>) mở
                      khóa <span className="font-mono">+5.00%</span> HP Đội Hình
                      (tối đa <span className="font-mono">+20.00%</span> Queue HP
                      tại <span className="font-mono">Lv.40</span>). Chuẩn{" "}
                      <span className="font-mono">Lv.1–40</span> tốn{" "}
                      <span className="font-mono">692.162M</span> Thịt &{" "}
                      <span className="font-mono">1,237</span> Mảnh;{" "}
                      <span className="font-mono">Lv.41–80</span> tích hợp đầy đủ
                      dữ liệu mở rộng Season 1+.
                    </>
                  ) : (
                    <>
                      <strong>Transitivity & Faction Aura:</strong>{" "}
                      <span className="font-mono">Lv.L • Max bars</span> is
                      mathematically identical to{" "}
                      <span className="font-mono">Lv.(L+1) • 0 bars</span>. Every{" "}
                      <span className="font-mono">10</span> completed levels (
                      <span className="font-mono">Lv.10, 20, 30, 40</span>)
                      unlocks <span className="font-mono">+5.00%</span> Queue HP
                      (up to <span className="font-mono">+20.00%</span> Queue HP
                      at <span className="font-mono">Lv.40</span>). Completing{" "}
                      <span className="font-mono">Lv.1–40</span> requires{" "}
                      <span className="font-mono">692.162M</span> Meat &{" "}
                      <span className="font-mono">1,237</span> Shards;{" "}
                      <span className="font-mono">Lv.41–80</span> includes full
                      Season 1+ progression data.
                    </>
                  )}
                </div>

                {!result.isInvalidRange ? (
                  <div className="space-y-2">
                    <h4 className="text-sm font-heading font-bold text-foreground">
                      {locale === "vi"
                        ? `Phân Rã Lộ Trình Đang Chọn (${result.factionConfig.name.vi})`
                        : `Active Route Breakdown (${result.factionConfig.name.en})`}
                    </h4>
                    <div className="-mx-1 overflow-x-auto">
                      <table
                        data-testid="faction-breakdown-table"
                        className="w-full min-w-[560px] border-collapse text-left text-sm"
                      >
                        <thead>
                          <tr className="border-b border-border/70 bg-muted/40 text-xs font-sans font-semibold uppercase tracking-wide text-muted-foreground">
                            <th className="py-2 px-3">
                              {locale === "vi" ? "Cụm Cấp Phe" : "Level Bracket"}
                            </th>
                            <th className="py-2 px-3 text-right">
                              {locale === "vi" ? "Số Vạch" : "Bars"}
                            </th>
                            <th className="py-2 px-3 text-right">
                              {locale === "vi" ? "Thịt Tiêu Hao" : "Meat Cost"}
                            </th>
                            <th className="py-2 px-3 text-right">
                              {locale === "vi" ? "Mảnh Tướng" : "Hero Shards"}
                            </th>
                            <th className="py-2 px-3">
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
                              <td className="py-2 px-3 font-bold text-foreground">
                                {item.bracketLabel[locale]}
                              </td>
                              <td className="py-2 px-3 text-right text-muted-foreground">
                                <span className="font-mono">
                                  {item.barsInBracket}
                                </span>
                              </td>
                              <td className="py-2 px-3 text-right font-bold text-amber-700 dark:text-amber-400">
                                <span
                                  className="font-mono"
                                  title={formatExactNumber(item.meatRequired)}
                                >
                                  +{formatCompactNumber(item.meatRequired)}
                                </span>
                              </td>
                              <td className="py-2 px-3 text-right font-bold text-sky-600 dark:text-sky-400">
                                <span
                                  className="font-mono"
                                  title={formatExactNumber(item.shardsRequired)}
                                >
                                  +{formatCompactNumber(item.shardsRequired)}
                                </span>
                              </td>
                              <td className="py-2 px-3 text-muted-foreground">
                                +
                                <span className="font-mono">
                                  {formatCompactNumber(item.atkGained)}
                                </span>{" "}
                                ATK • +
                                <span className="font-mono">
                                  {formatCompactNumber(item.hpGained)}
                                </span>{" "}
                                HP
                                {item.auraGainedPct > 0
                                  ? ` • ★ +${item.auraGainedPct}% Queue HP`
                                  : ""}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : null}
              </div>
            </CalculatorInfoPopover>

            <button
              type="button"
              data-testid="faction-level-reset-btn"
              onClick={() => {
                setFaction("horde");
                setShardRarity("legendary");
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

      {/* 2. Compact Faction Aura Summary Strip (1 lớp viền duy nhất) */}
      <div
        data-testid="faction-aura-banner"
        className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-amber-500/35 bg-amber-500/[0.06] px-3.5 py-2.5"
      >
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-2.5 py-1 text-xs font-sans font-bold text-emerald-700 dark:text-emerald-300">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          <span>
            {locale === "vi"
              ? "Hào Quang Phe: +5.00% HP Đội Hình mỗi 10 cấp (Lv.10/20/30/40 = tối đa +20.00% Queue HP)"
              : "Faction Aura: +5.00% Queue HP every 10 levels (Lv.10/20/30/40 = max +20.00% Queue HP)"}
          </span>
        </span>
        <span className="text-xs font-sans font-semibold text-muted-foreground">
          {locale === "vi" ? (
            <>
              Mốc chuẩn <span className="font-mono">Lv.1–40</span>:{" "}
              <span className="font-mono">692.16M</span> Thịt &{" "}
              <span className="font-mono">1.24K</span> Mảnh
            </>
          ) : (
            <>
              Benchmark <span className="font-mono">Lv.1–40</span>:{" "}
              <span className="font-mono">692.16M</span> Meat &{" "}
              <span className="font-mono">1.24K</span> Shards
            </>
          )}
        </span>
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
            mode="extended_s1"
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
            mode="extended_s1"
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
              const row = getFactionLevelRow(targetLv, "extended_s1");
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

      {/* 5. Dual Resource Result Cards (Standard R5 3-column layout, stacked) */}
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
          <div className="space-y-3">
            {/* Resource 1: Meat Required (3-column horizontal card) */}
            <div className={cn(CALC_MD3.tonalGroup, "space-y-2.5")}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2.5">
                  <GameAssetFrame
                    src={result.meatMaterial.iconPath}
                    alt={meatMaterialName}
                    rarity={result.meatMaterial.rarity}
                    size="sm"
                  />
                  <div className="min-w-0">
                    <div className="truncate text-sm font-heading font-bold text-foreground">
                      {meatMaterialName}
                    </div>
                    <div className="text-xs font-sans text-muted-foreground">
                      {locale === "vi" ? "Số vạch EXP:" : "EXP Bars:"}{" "}
                      <span className="font-mono font-semibold text-foreground">
                        {result.requiredBars}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                {/* Col 1: Required */}
                <div className="rounded-xl bg-background/70 p-2.5">
                  <div className={cn(CALC_MD3.eyebrow, "text-muted-foreground")}>
                    {locale === "vi" ? "Số lượng yêu cầu" : "Required"}
                  </div>
                  <div
                    className="mt-1"
                    title={formatExactNumber(result.requiredMeat)}
                  >
                    <CalculatorMetricValue
                      testId="faction-required-meat-value"
                      value={formatCompactNumber(result.requiredMeat)}
                      unit={locale === "vi" ? "Thịt" : "Meat"}
                      toneClassName="text-amber-600 dark:text-amber-400"
                    />
                  </div>
                </div>

                {/* Col 2: Owned */}
                <div className="rounded-xl bg-background/70 p-2.5">
                  <label
                    htmlFor="faction-owned-meat-input"
                    className={cn(
                      CALC_MD3.eyebrow,
                      "block text-muted-foreground"
                    )}
                  >
                    {locale === "vi"
                      ? "Đang có (hỗ trợ K/M)"
                      : "Owned (K/M supported)"}
                  </label>
                  <div className="mt-1">
                    <Input
                      id="faction-owned-meat-input"
                      data-testid="faction-owned-meat-input"
                      type="text"
                      inputMode="decimal"
                      placeholder={
                        locale === "vi" ? "VD: 500M, 1.2B" : "e.g. 500M, 1.2B"
                      }
                      value={ownedMeatInput}
                      onChange={(e) => setOwnedMeatInput(e.target.value)}
                      className={cn(CALC_MD3.dataInput, "w-full bg-card")}
                    />
                  </div>
                </div>

                {/* Col 3: Missing */}
                <div
                  className={cn(
                    "rounded-xl p-2.5",
                    result.missingMeat === 0
                      ? "bg-emerald-500/15"
                      : "bg-amber-500/15"
                  )}
                >
                  <div className={cn(CALC_MD3.eyebrow, "text-muted-foreground")}>
                    {locale === "vi" ? "Còn thiếu" : "Missing"}
                  </div>
                  <div className="mt-1.5 flex items-center">
                    {result.missingMeat === 0 ? (
                      <span
                        data-testid="faction-missing-meat-badge"
                        className="inline-flex items-center gap-1.5 text-sm font-sans font-bold text-emerald-700 dark:text-emerald-400"
                      >
                        <CheckCircle2
                          className="h-4 w-4 shrink-0"
                          aria-hidden="true"
                        />
                        <span>
                          {locale === "vi" ? "Đủ nguyên liệu" : "Ready"}
                        </span>
                      </span>
                    ) : (
                      <span
                        data-testid="faction-missing-meat-badge"
                        title={formatExactNumber(result.missingMeat)}
                        className="font-mono text-xl font-black tabular-nums text-amber-700 dark:text-amber-300"
                      >
                        -{formatCompactNumber(result.missingMeat)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Resource 2: Hero Shards Required (3-column horizontal card) */}
            <div className={cn(CALC_MD3.tonalGroup, "space-y-2.5")}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2.5">
                  <GameAssetFrame
                    src={result.shardMaterial.iconPath}
                    alt={shardMaterialName}
                    rarity={result.shardMaterial.rarity}
                    size="sm"
                  />
                  <div className="min-w-0">
                    <div className="truncate text-sm font-heading font-bold text-foreground">
                      {shardMaterialName}
                    </div>
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
                          +{formatCompactNumber(result.gainedAtk)}
                        </span>{" "}
                        • HP{" "}
                        <span className="font-mono font-semibold text-foreground">
                          +{formatCompactNumber(result.gainedHp)}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                {/* Col 1: Required */}
                <div className="rounded-xl bg-background/70 p-2.5">
                  <div className={cn(CALC_MD3.eyebrow, "text-muted-foreground")}>
                    {locale === "vi" ? "Số lượng yêu cầu" : "Required"}
                  </div>
                  <div
                    className="mt-1"
                    title={formatExactNumber(result.requiredShards)}
                  >
                    <CalculatorMetricValue
                      testId="faction-required-shards-value"
                      value={formatCompactNumber(result.requiredShards)}
                      unit={locale === "vi" ? "Mảnh" : "Shards"}
                      toneClassName="text-sky-600 dark:text-sky-400"
                    />
                  </div>
                </div>

                {/* Col 2: Owned */}
                <div className="rounded-xl bg-background/70 p-2.5">
                  <label
                    htmlFor="faction-owned-shards-input"
                    className={cn(
                      CALC_MD3.eyebrow,
                      "block text-muted-foreground"
                    )}
                  >
                    {locale === "vi"
                      ? "Đang có (hỗ trợ K/M)"
                      : "Owned (K/M supported)"}
                  </label>
                  <div className="mt-1">
                    <Input
                      id="faction-owned-shards-input"
                      data-testid="faction-owned-shards-input"
                      type="text"
                      inputMode="decimal"
                      placeholder={
                        locale === "vi" ? "VD: 500, 1.5K" : "e.g. 500, 1.5K"
                      }
                      value={ownedShardsInput}
                      onChange={(e) => setOwnedShardsInput(e.target.value)}
                      className={cn(CALC_MD3.dataInput, "w-full bg-card")}
                    />
                  </div>
                </div>

                {/* Col 3: Missing */}
                <div
                  className={cn(
                    "rounded-xl p-2.5",
                    result.missingShards === 0
                      ? "bg-emerald-500/15"
                      : "bg-sky-500/15"
                  )}
                >
                  <div className={cn(CALC_MD3.eyebrow, "text-muted-foreground")}>
                    {locale === "vi" ? "Còn thiếu" : "Missing"}
                  </div>
                  <div className="mt-1.5 flex items-center">
                    {result.missingShards === 0 ? (
                      <span
                        data-testid="faction-missing-shards-badge"
                        className="inline-flex items-center gap-1.5 text-sm font-sans font-bold text-emerald-700 dark:text-emerald-400"
                      >
                        <CheckCircle2
                          className="h-4 w-4 shrink-0"
                          aria-hidden="true"
                        />
                        <span>
                          {locale === "vi" ? "Đủ nguyên liệu" : "Ready"}
                        </span>
                      </span>
                    ) : (
                      <span
                        data-testid="faction-missing-shards-badge"
                        title={formatExactNumber(result.missingShards)}
                        className="font-mono text-xl font-black tabular-nums text-sky-700 dark:text-sky-300"
                      >
                        -{formatCompactNumber(result.missingShards)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import React, { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Compass,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  RELIC_FACTION_SETS,
  RELIC_RARITY_TABLES,
  calculateRelicTrioPlan,
  calculateSingleRelicUpgrade,
  evaluateStarRatingSuppression,
  type RelicFactionId,
  type RelicRarity,
  type RelicScopeMode,
  type RelicStarLevel,
  type RelicSubStep,
  type RelicTrioSlotInput,
} from "@/content/calculators/relics-data";
import { CALCULATOR_MATERIALS } from "@/content/calculators/registry";
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
  formatExactNumber,
  parseCompactNumberInput,
} from "@/lib/utils";
import {
  CALC_MD3,
  CalculatorMetricValue,
  CalculatorStepperButton,
  CalculatorToolHeader,
} from "./calculator-md3-primitives";

export interface RelicsCalculatorProps {
  readonly zone?: CalculatorZone;
  readonly category: CalculatorCategory;
  readonly tool: CalculatorToolItem;
  readonly locale: CalculatorLocale;
}

const SUB_STEPS: readonly RelicSubStep[] = [0, 1, 2, 3, 4] as const;

const SCOPE_OPTIONS: readonly {
  readonly mode: RelicScopeMode;
  readonly label: Readonly<Record<CalculatorLocale, string>>;
}[] = [
  {
    mode: "trio",
    label: { vi: "Bộ 3 Bí Bảo Đội 1 (×3)", en: "Queue 1 Relic Trio (×3)" },
  },
  {
    mode: "single",
    label: { vi: "1 Bí Bảo Lẻ (×1)", en: "Single Relic (×1)" },
  },
];

const RELIC_PRESETS: readonly {
  readonly id: string;
  readonly fromStar: RelicStarLevel;
  readonly toStar: RelicStarLevel;
  readonly label: Readonly<Record<CalculatorLocale, string>>;
  readonly desc: Readonly<Record<CalculatorLocale, string>>;
}[] = [
  {
    id: "0-5",
    fromStar: 0,
    toStar: 5,
    label: {
      vi: "0★ ➔ 5★ (Đột Phá Bậc 1)",
      en: "0★ ➔ 5★ (Tier 1 Breakthrough)",
    },
    desc: {
      vi: "130 mảnh Cam (390 mảnh/3 món) — Hoàn tất Bậc 1",
      en: "130 Legendary Shards (390/3 Relics) — Completes Tier 1",
    },
  },
  {
    id: "0-8",
    fromStar: 0,
    toStar: 8,
    label: {
      vi: "0★ ➔ 8★ (Điểm Gãy ROI)",
      en: "0★ ➔ 8★ (ROI Sweet Spot)",
    },
    desc: {
      vi: "330 mảnh Cam (+4% ATK / +8% HP) — Ngưỡng hiệu suất vàng",
      en: "330 Legendary Shards (+4% ATK / +8% HP) — Optimal ROI target",
    },
  },
  {
    id: "8-15",
    fromStar: 8,
    toStar: 15,
    label: {
      vi: "8★ ➔ 15★ (Đột Phá Bậc 3)",
      en: "8★ ➔ 15★ (Tier 3 Breakthrough)",
    },
    desc: {
      vi: "Cần thêm 770 mảnh Cam (Tổng tích lũy 1,100 mảnh)",
      en: "Requires +770 Legendary Shards (1,100 cumulative)",
    },
  },
  {
    id: "15-20",
    fromStar: 15,
    toStar: 20,
    label: {
      vi: "15★ ➔ 20★ (Đỉnh 20★)",
      en: "15★ ➔ 20★ (Max Cap 20★)",
    },
    desc: {
      vi: "Cần thêm 700 mảnh Cam (Đỉnh 1,800 mảnh: +20% ATK / +40% HP)",
      en: "Requires +700 Legendary Shards (1,800 max: +20% ATK / +40% HP)",
    },
  },
];

export function RelicsCalculator({ tool, locale }: RelicsCalculatorProps) {
  const [mode, setMode] = useState<RelicScopeMode>("trio");
  const [faction, setFaction] = useState<RelicFactionId>("league");

  const [singleRarity, setSingleRarity] = useState<RelicRarity>("legendary");
  const [singleFromStar, setSingleFromStar] = useState<RelicStarLevel>(0);
  const [singleFromSubStep, setSingleFromSubStep] = useState<RelicSubStep>(0);
  const [singleToStar, setSingleToStar] = useState<RelicStarLevel>(8);
  const [singleToSubStep, setSingleToSubStep] = useState<RelicSubStep>(0);

  const [trioSlots, setTrioSlots] = useState<
    readonly [RelicTrioSlotInput, RelicTrioSlotInput, RelicTrioSlotInput]
  >([
    {
      slotRole: "offense",
      rarity: "legendary",
      fromStar: 0,
      fromSubStep: 0,
      toStar: 8,
      toSubStep: 0,
    },
    {
      slotRole: "defense",
      rarity: "legendary",
      fromStar: 0,
      fromSubStep: 0,
      toStar: 5,
      toSubStep: 0,
    },
    {
      slotRole: "support",
      rarity: "legendary",
      fromStar: 0,
      fromSubStep: 0,
      toStar: 5,
      toSubStep: 0,
    },
  ]);

  const [enemyStarsInput, setEnemyStarsInput] = useState<string>("15");
  const [ownedLegendaryInput, setOwnedLegendaryInput] = useState<string>("0");
  const [ownedEpicInput, setOwnedEpicInput] = useState<string>("0");
  const [ownedRareInput, setOwnedRareInput] = useState<string>("0");
  const [ownedScrollsInput, setOwnedScrollsInput] = useState<string>("0");
  const [ownedMagicStonesInput, setOwnedMagicStonesInput] =
    useState<string>("0");
  const [ownedArcaneCrystalsInput, setOwnedArcaneCrystalsInput] =
    useState<string>("0");

  const enemyLegendaryStars = useMemo(
    () => parseCompactNumberInput(enemyStarsInput),
    [enemyStarsInput]
  );
  const ownedLegendaryShards = useMemo(
    () => parseCompactNumberInput(ownedLegendaryInput),
    [ownedLegendaryInput]
  );
  const ownedEpicShards = useMemo(
    () => parseCompactNumberInput(ownedEpicInput),
    [ownedEpicInput]
  );
  const ownedRareShards = useMemo(
    () => parseCompactNumberInput(ownedRareInput),
    [ownedRareInput]
  );
  const ownedRelicScrolls = useMemo(
    () => parseCompactNumberInput(ownedScrollsInput),
    [ownedScrollsInput]
  );
  const ownedMagicStones = useMemo(
    () => parseCompactNumberInput(ownedMagicStonesInput),
    [ownedMagicStonesInput]
  );
  const ownedArcaneCrystals = useMemo(
    () => parseCompactNumberInput(ownedArcaneCrystalsInput),
    [ownedArcaneCrystalsInput]
  );

  const singleOwnedByRarity =
    singleRarity === "legendary"
      ? ownedLegendaryShards
      : singleRarity === "epic"
        ? ownedEpicShards
        : ownedRareShards;

  const singleResult = useMemo(
    () =>
      calculateSingleRelicUpgrade({
        rarity: singleRarity,
        fromStar: singleFromStar,
        fromSubStep: singleFromStar === 20 ? 0 : singleFromSubStep,
        toStar: singleToStar,
        toSubStep: singleToStar === 20 ? 0 : singleToSubStep,
        ownedShards: singleOwnedByRarity,
        ownedRelicScrolls,
        ownedMagicStones,
        ownedArcaneCrystals,
      }),
    [
      singleRarity,
      singleFromStar,
      singleFromSubStep,
      singleToStar,
      singleToSubStep,
      singleOwnedByRarity,
      ownedRelicScrolls,
      ownedMagicStones,
      ownedArcaneCrystals,
    ]
  );

  const trioResult = useMemo(
    () =>
      calculateRelicTrioPlan({
        faction,
        slots: trioSlots,
        enemyLegendaryStars,
        ownedLegendaryShards,
        ownedEpicShards,
        ownedRareShards,
        ownedRelicScrolls,
        ownedMagicStones,
        ownedArcaneCrystals,
      }),
    [
      faction,
      trioSlots,
      enemyLegendaryStars,
      ownedLegendaryShards,
      ownedEpicShards,
      ownedRareShards,
      ownedRelicScrolls,
      ownedMagicStones,
      ownedArcaneCrystals,
    ]
  );

  const singleSuppression = useMemo(
    () =>
      evaluateStarRatingSuppression(
        singleRarity === "legendary" ? singleToStar : 0,
        enemyLegendaryStars,
        singleRarity !== "legendary"
      ),
    [singleRarity, singleToStar, enemyLegendaryStars]
  );

  const activeSuppression =
    mode === "trio" ? trioResult.suppressionAudit : singleSuppression;

  const applyPreset = (fromStar: RelicStarLevel, toStar: RelicStarLevel) => {
    setSingleFromStar(fromStar);
    setSingleFromSubStep(0);
    setSingleToStar(toStar);
    setSingleToSubStep(0);
    setTrioSlots((prev) => [
      { ...prev[0], fromStar, fromSubStep: 0, toStar, toSubStep: 0 },
      { ...prev[1], fromStar, fromSubStep: 0, toStar, toSubStep: 0 },
      { ...prev[2], fromStar, fromSubStep: 0, toStar, toSubStep: 0 },
    ]);
  };

  const updateTrioSlot = (
    idx: 0 | 1 | 2,
    patch: Partial<RelicTrioSlotInput>
  ) => {
    setTrioSlots((prev) => {
      const next: [RelicTrioSlotInput, RelicTrioSlotInput, RelicTrioSlotInput] =
        [prev[0], prev[1], prev[2]];
      const merged = { ...next[idx], ...patch };
      if (merged.toStar < merged.fromStar) {
        merged.toStar = merged.fromStar;
      }
      if (merged.fromStar === 20) merged.fromSubStep = 0;
      if (merged.toStar === 20) merged.toSubStep = 0;
      next[idx] = merged;
      return next;
    });
  };

  const handleReset = () => {
    setSingleRarity("legendary");
    setSingleFromStar(0);
    setSingleFromSubStep(0);
    setSingleToStar(8);
    setSingleToSubStep(0);
    setTrioSlots([
      {
        slotRole: "offense",
        rarity: "legendary",
        fromStar: 0,
        fromSubStep: 0,
        toStar: 8,
        toSubStep: 0,
      },
      {
        slotRole: "defense",
        rarity: "legendary",
        fromStar: 0,
        fromSubStep: 0,
        toStar: 5,
        toSubStep: 0,
      },
      {
        slotRole: "support",
        rarity: "legendary",
        fromStar: 0,
        fromSubStep: 0,
        toStar: 5,
        toSubStep: 0,
      },
    ]);
    setEnemyStarsInput("15");
    setOwnedLegendaryInput("0");
    setOwnedEpicInput("0");
    setOwnedRareInput("0");
    setOwnedScrollsInput("0");
    setOwnedMagicStonesInput("0");
    setOwnedArcaneCrystalsInput("0");
  };

  return (
    <div data-testid="relics-calculator" className="space-y-4">
      <CalculatorToolHeader
        code={tool.code}
        title={tool.title[locale].replace(`${tool.code} `, "")}
        actions={
          <>
            {SCOPE_OPTIONS.map((opt) => {
              const isSelected = mode === opt.mode;
              return (
                <button
                  key={opt.mode}
                  type="button"
                  data-testid={`scope-${opt.mode}-btn`}
                  aria-pressed={isSelected}
                  onClick={() => setMode(opt.mode)}
                  className={cn(
                    CALC_MD3.chipButton,
                    "font-sans",
                    isSelected
                      ? "bg-amber-500 text-slate-950 font-bold"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <span>{opt.label[locale]}</span>
                </button>
              );
            })}

            <button
              type="button"
              data-testid="relics-reset-btn"
              onClick={handleReset}
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

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 items-start">
        {/* LEFT COLUMN (7/12): RELIC TRIO / SINGLE CONFIG & VAULT */}
        <div className="space-y-4 lg:col-span-7">
          <section className={cn(CALC_MD3.surfaceCard, "space-y-4")}>
            <div>
              <p className={cn(CALC_MD3.eyebrow, "text-muted-foreground")}>
                {locale === "vi"
                  ? "Bước 1 — Ma Trận 20 Cấp Sao (4 Bậc × 5 Sao)"
                  : "Step 1 — 20-Star Matrix (4 Tiers × 5 Stars)"}
              </p>
              <h2 className={CALC_MD3.sectionTitle}>
                {locale === "vi"
                  ? "Cấu hình Bộ 3 Bí Bảo Chủ Lực hoặc Tính Lẻ 1 Món"
                  : "Configure Queue 1 Relic Trio or Single Relic"}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {RELIC_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  data-testid={`preset-${preset.id}-btn`}
                  onClick={() => applyPreset(preset.fromStar, preset.toStar)}
                  className={cn(
                    CALC_MD3.chipButton,
                    "flex flex-col items-start justify-center px-3.5 py-2 text-left bg-muted/40 hover:bg-amber-500/10"
                  )}
                >
                  <span className="font-sans text-xs font-bold text-foreground">
                    {preset.label[locale]}
                  </span>
                  <span className="font-sans text-xs text-muted-foreground">
                    {preset.desc[locale]}
                  </span>
                </button>
              ))}
            </div>

            {mode === "trio" ? (
              <div className="space-y-4">
                <div className={cn(CALC_MD3.tonalGroup, "space-y-2.5")}>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-sans text-xs font-bold text-foreground">
                      {locale === "vi"
                        ? "Bộ Bí Bảo Độc Quyền Theo Phe:"
                        : "Faction Exclusive Relic Set:"}
                    </span>
                    <span className="font-sans text-xs font-semibold text-amber-600 dark:text-amber-400">
                      {trioResult.factionSet.setName[locale]}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {RELIC_FACTION_SETS.map((f) => {
                      const active = faction === f.id;
                      return (
                        <button
                          key={f.id}
                          type="button"
                          data-testid={`faction-${f.id}-btn`}
                          aria-pressed={active}
                          onClick={() => setFaction(f.id)}
                          className={cn(
                            CALC_MD3.chipButton,
                            "font-sans",
                            active
                              ? "bg-amber-500 text-slate-950 font-bold"
                              : "bg-background/80 text-muted-foreground hover:bg-muted hover:text-foreground"
                          )}
                        >
                          <span>{f.factionName[locale]}</span>
                        </button>
                      );
                    })}
                  </div>
                  <p className="font-sans text-xs leading-relaxed text-muted-foreground">
                    {trioResult.factionSet.synergyBonus[locale]}
                  </p>
                </div>

                <div className={CALC_MD3.dividedList}>
                  {trioResult.slotBreakdowns.map((item, idx) => {
                    const slotIndex = idx as 0 | 1 | 2;
                    return (
                      <div
                        key={item.template.slotRole}
                        className="space-y-3 py-3.5 first:pt-1 last:pb-1"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-sans text-sm font-bold text-foreground">
                                {item.template.slotLabel[locale]}:{" "}
                                {item.template.bisRelicName[locale]}
                              </span>
                              <span className="rounded-full bg-amber-500/15 px-2.5 py-0.5 font-sans text-xs font-bold text-amber-700 dark:text-amber-300">
                                {item.template.mechanicTag[locale]}
                              </span>
                            </div>
                            <p className="font-sans text-xs text-muted-foreground">
                              {item.template.tacticalSummary[locale]} •{" "}
                              {locale === "vi" ? "Thay thế F2P: " : "F2P Alt: "}
                              <strong className="font-semibold text-foreground/90">
                                {item.template.f2pAlternative[locale]}
                              </strong>
                            </p>
                          </div>

                          <div className="flex items-center gap-1 rounded-xl bg-muted/50 p-1">
                            {(["legendary", "epic", "rare"] as const).map(
                              (r) => (
                                <button
                                  key={r}
                                  type="button"
                                  data-testid={`slot-${idx + 1}-rarity-${r}-btn`}
                                  onClick={() =>
                                    updateTrioSlot(slotIndex, { rarity: r })
                                  }
                                  className={cn(
                                    "min-h-[44px] rounded-lg px-2.5 font-sans text-xs font-semibold transition-colors",
                                    item.input.rarity === r
                                      ? "bg-amber-500 text-slate-950 font-bold"
                                      : "text-muted-foreground hover:text-foreground"
                                  )}
                                >
                                  {RELIC_RARITY_TABLES[r].shortName[locale]}
                                </button>
                              )
                            )}
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <div className="flex items-center gap-1 rounded-xl bg-muted/45 p-1">
                              <CalculatorStepperButton
                                direction="decrease"
                                testId={`trio-slot-${idx + 1}-from-minus`}
                                ariaLabel={
                                  locale === "vi"
                                    ? `Giảm sao hiện tại Ô ${idx + 1}`
                                    : `Decrease current star Slot ${idx + 1}`
                                }
                                disabled={item.input.fromStar <= 0}
                                onClick={() =>
                                  updateTrioSlot(slotIndex, {
                                    fromStar: (item.input.fromStar -
                                      1) as RelicStarLevel,
                                  })
                                }
                              />
                              <span className="min-w-[44px] text-center font-mono text-xs font-bold tabular-nums">
                                {item.input.fromStar}★
                              </span>
                              <CalculatorStepperButton
                                direction="increase"
                                testId={`trio-slot-${idx + 1}-from-plus`}
                                ariaLabel={
                                  locale === "vi"
                                    ? `Tăng sao hiện tại Ô ${idx + 1}`
                                    : `Increase current star Slot ${idx + 1}`
                                }
                                disabled={item.input.fromStar >= 20}
                                onClick={() =>
                                  updateTrioSlot(slotIndex, {
                                    fromStar: (item.input.fromStar +
                                      1) as RelicStarLevel,
                                  })
                                }
                              />
                            </div>

                            <ArrowRight className="h-4 w-4 text-muted-foreground" />

                            <div className="flex items-center gap-1 rounded-xl bg-amber-500/10 p-1">
                              <CalculatorStepperButton
                                direction="decrease"
                                testId={`trio-slot-${idx + 1}-to-minus`}
                                ariaLabel={
                                  locale === "vi"
                                    ? `Giảm sao mục tiêu Ô ${idx + 1}`
                                    : `Decrease target star Slot ${idx + 1}`
                                }
                                disabled={
                                  item.input.toStar <= item.input.fromStar
                                }
                                onClick={() =>
                                  updateTrioSlot(slotIndex, {
                                    toStar: (item.input.toStar -
                                      1) as RelicStarLevel,
                                  })
                                }
                              />
                              <span className="min-w-[44px] text-center font-mono text-xs font-bold tabular-nums text-amber-700 dark:text-amber-300">
                                {item.input.toStar}★
                              </span>
                              <CalculatorStepperButton
                                direction="increase"
                                testId={`trio-slot-${idx + 1}-to-plus`}
                                ariaLabel={
                                  locale === "vi"
                                    ? `Tăng sao mục tiêu Ô ${idx + 1}`
                                    : `Increase target star Slot ${idx + 1}`
                                }
                                disabled={item.input.toStar >= 20}
                                onClick={() =>
                                  updateTrioSlot(slotIndex, {
                                    toStar: (item.input.toStar +
                                      1) as RelicStarLevel,
                                  })
                                }
                              />
                            </div>
                          </div>

                          <div className="font-sans text-xs">
                            {locale === "vi" ? "Cần: " : "Need: "}
                            <strong className="font-mono font-bold tabular-nums text-amber-600 dark:text-amber-400">
                              {formatExactNumber(item.requiredShards)}
                            </strong>{" "}
                            {locale === "vi" ? "mảnh • Nội tại: " : "shards • Passive: "}
                            <span className="font-mono font-semibold tabular-nums">
                              +{item.toStats.heroAttackPercent}% ATK / +
                              {item.toStats.heroHpPercent}% HP
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  {(["legendary", "epic", "rare"] as const).map((r) => (
                    <button
                      key={r}
                      type="button"
                      data-testid={`single-rarity-${r}-btn`}
                      onClick={() => setSingleRarity(r)}
                      className={cn(
                        CALC_MD3.chipButton,
                        "font-sans",
                        singleRarity === r
                          ? "bg-amber-500 text-slate-950 font-bold"
                          : "bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      {RELIC_RARITY_TABLES[r].name[locale]}
                    </button>
                  ))}
                </div>

                <div className={cn(CALC_MD3.tonalGroup, "space-y-4")}>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-sans text-xs font-semibold text-muted-foreground">
                        {locale === "vi" ? "Cấp Sao Hiện Tại: " : "Current Star: "}
                        <span className="font-mono">
                          {singleFromStar}★ ({singleFromSubStep}/5)
                        </span>
                      </span>
                      <span className="font-sans text-xs font-bold">
                        {locale === "vi" ? "Đã đầu tư: " : "Invested: "}
                        <span className="font-mono tabular-nums">
                          {formatExactNumber(singleResult.fromInvestedShards)}
                        </span>{" "}
                        {locale === "vi" ? "mảnh" : "shards"}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="flex items-center gap-1 rounded-xl bg-background p-1">
                        <CalculatorStepperButton
                          direction="decrease"
                          testId="single-from-star-minus"
                          ariaLabel={
                            locale === "vi"
                              ? "Giảm sao hiện tại"
                              : "Decrease current star"
                          }
                          disabled={singleFromStar <= 0}
                          onClick={() =>
                            setSingleFromStar(
                              (singleFromStar - 1) as RelicStarLevel
                            )
                          }
                        />
                        <span className="min-w-[52px] text-center font-mono text-xs font-bold tabular-nums">
                          {singleFromStar}★
                        </span>
                        <CalculatorStepperButton
                          direction="increase"
                          testId="single-from-star-plus"
                          ariaLabel={
                            locale === "vi"
                              ? "Tăng sao hiện tại"
                              : "Increase current star"
                          }
                          disabled={singleFromStar >= 20}
                          onClick={() => {
                            const next = (singleFromStar + 1) as RelicStarLevel;
                            setSingleFromStar(next);
                            if (singleToStar < next) setSingleToStar(next);
                          }}
                        />
                      </div>

                      {singleFromStar < 20 && (
                        <div className="flex items-center gap-1">
                          {SUB_STEPS.map((step) => (
                            <button
                              key={`from-sub-${step}`}
                              type="button"
                              onClick={() => setSingleFromSubStep(step)}
                              className={cn(
                                CALC_MD3.chipButton,
                                "px-2.5 font-mono bg-background/80",
                                singleFromSubStep === step &&
                                  CALC_MD3.tileSelected
                              )}
                            >
                              {step}/5
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 border-t border-border/60 pt-3">
                    <div className="flex items-center justify-between">
                      <span className="font-sans text-xs font-semibold text-muted-foreground">
                        {locale === "vi" ? "Cấp Sao Mục Tiêu: " : "Target Star: "}
                        <span className="font-mono">
                          {singleToStar}★ ({singleToSubStep}/5)
                        </span>
                      </span>
                      <span className="font-sans text-xs font-bold text-amber-600 dark:text-amber-400">
                        {locale === "vi" ? "Tích lũy đích: " : "Target total: "}
                        <span className="font-mono tabular-nums">
                          {formatExactNumber(singleResult.toInvestedShards)}
                        </span>{" "}
                        {locale === "vi" ? "mảnh" : "shards"}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="flex items-center gap-1 rounded-xl bg-background p-1">
                        <CalculatorStepperButton
                          direction="decrease"
                          testId="single-to-star-minus"
                          ariaLabel={
                            locale === "vi"
                              ? "Giảm sao mục tiêu"
                              : "Decrease target star"
                          }
                          disabled={singleToStar <= singleFromStar}
                          onClick={() =>
                            setSingleToStar(
                              (singleToStar - 1) as RelicStarLevel
                            )
                          }
                        />
                        <span className="min-w-[52px] text-center font-mono text-xs font-bold tabular-nums text-amber-700 dark:text-amber-300">
                          {singleToStar}★
                        </span>
                        <CalculatorStepperButton
                          direction="increase"
                          testId="single-to-star-plus"
                          ariaLabel={
                            locale === "vi"
                              ? "Tăng sao mục tiêu"
                              : "Increase target star"
                          }
                          disabled={singleToStar >= 20}
                          onClick={() =>
                            setSingleToStar(
                              (singleToStar + 1) as RelicStarLevel
                            )
                          }
                        />
                      </div>

                      {singleToStar < 20 && (
                        <div className="flex items-center gap-1">
                          {SUB_STEPS.map((step) => (
                            <button
                              key={`to-sub-${step}`}
                              type="button"
                              onClick={() => setSingleToSubStep(step)}
                              className={cn(
                                CALC_MD3.chipButton,
                                "px-2.5 font-mono bg-background/80",
                                singleToSubStep === step && CALC_MD3.tileSelected
                              )}
                            >
                              {step}/5
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* CARD 2: STAR SUPPRESSION INPUT & MATERIAL VAULT */}
          <section className={cn(CALC_MD3.surfaceCard, "space-y-4")}>
            <div>
              <p className={cn(CALC_MD3.eyebrow, "text-muted-foreground")}>
                {locale === "vi"
                  ? "Bước 2 — Đối Chiếu Áp Chế Sao -50% & Tồn Kho Vật Liệu"
                  : "Step 2 — -50% Star Suppression & Material Vault"}
              </p>
              <h2 className={CALC_MD3.sectionTitle}>
                {locale === "vi"
                  ? "Kiểm Định Áp Chế Sao Cam & Kho Mảnh Bí Bảo"
                  : "Legendary Star Suppression & Relic Vault"}
              </h2>
            </div>

            <div className={CALC_MD3.dividedList}>
              <div className="flex items-center justify-between gap-3 py-3 first:pt-0">
                <div>
                  <p className="font-sans text-sm font-bold text-foreground">
                    {locale === "vi"
                      ? "Tổng Sao Bí Bảo Cam Đội 1 Của Đối Thủ"
                      : "Enemy Queue 1 Total Legendary Relic Stars"}
                  </p>
                  <p className="font-sans text-xs text-muted-foreground">
                    {locale === "vi"
                      ? "Chỉ tính Bí Bảo Cam/Đỏ (Tối đa 60★ cho 3 món 20★)"
                      : "Counts Legendary+ Relics only (Max 60★ across 3 Relics)"}
                  </p>
                </div>
                <Input
                  type="text"
                  inputMode="numeric"
                  aria-label={
                    locale === "vi"
                      ? "Tổng Sao Bí Bảo Cam của đối thủ"
                      : "Enemy Legendary Relic Stars"
                  }
                  value={enemyStarsInput}
                  onChange={(e) => setEnemyStarsInput(e.target.value)}
                  className={cn(CALC_MD3.dataInput, "w-28 sm:w-32")}
                />
              </div>

              {(
                [
                  {
                    mat: CALCULATOR_MATERIALS.legendaryUniversalRelicShard,
                    val: ownedLegendaryInput,
                    setVal: setOwnedLegendaryInput,
                    sub: {
                      vi: "5,000 điểm GAR/KvK Ngày 1–2 • Max 1 món = 1,800 mảnh",
                      en: "5,000 GAR/KvK pts (Days 1-2) • Max 1 Relic = 1,800 shards",
                    },
                  },
                  {
                    mat: CALCULATOR_MATERIALS.epicUniversalRelicShard,
                    val: ownedEpicInput,
                    setVal: setOwnedEpicInput,
                    sub: {
                      vi: "1,000 điểm GAR/KvK Ngày 1–2 • Max 1 món = 3,130 mảnh",
                      en: "1,000 GAR/KvK pts (Days 1-2) • Max 1 Relic = 3,130 shards",
                    },
                  },
                  {
                    mat: CALCULATOR_MATERIALS.rareUniversalRelicShard,
                    val: ownedRareInput,
                    setVal: setOwnedRareInput,
                    sub: {
                      vi: "200 điểm GAR/KvK Ngày 1–2 • Max 1 món = 4,810 mảnh",
                      en: "200 GAR/KvK pts (Days 1-2) • Max 1 Relic = 4,810 shards",
                    },
                  },
                  {
                    mat: CALCULATOR_MATERIALS.relicScroll,
                    val: ownedScrollsInput,
                    setVal: setOwnedScrollsInput,
                    sub: {
                      vi: "Quay Tháp Bí Bảo: 1,500 điểm GAR/KvK mỗi lượt",
                      en: "Relic Wish: 1,500 GAR/KvK pts per pull",
                    },
                  },
                  {
                    mat: CALCULATOR_MATERIALS.magicStone,
                    val: ownedMagicStonesInput,
                    setVal: setOwnedMagicStonesInput,
                    sub: {
                      vi: "600 điểm GAR/KvK mỗi 2,000 Đá • 6 điểm Guild Rush",
                      en: "600 GAR/KvK pts per 2,000 Stones • 6 Guild Rush pts",
                    },
                  },
                  {
                    mat: CALCULATOR_MATERIALS.arcaneCrystal,
                    val: ownedArcaneCrystalsInput,
                    setVal: setOwnedArcaneCrystalsInput,
                    sub: {
                      vi: "Đột phá bậc 5★/10★/15★/20★: 1,200 điểm GAR/KvK mỗi viên",
                      en: "5★/10★/15★/20★ Breakthroughs: 1,200 GAR/KvK pts each",
                    },
                  },
                ] as const
              ).map((row) => {
                const matName =
                  locale === "vi" ? row.mat.nameVi : row.mat.nameEn;
                return (
                  <div
                    key={row.mat.gameId}
                    className="flex items-center justify-between gap-3 py-3 last:pb-0"
                  >
                    <div className="flex items-center gap-3">
                      <GameAssetFrame
                        src={row.mat.iconPath}
                        alt={matName}
                        rarity={row.mat.rarity}
                        size="sm"
                      />
                      <div>
                        <p className="font-sans text-sm font-semibold text-foreground">
                          {matName}
                        </p>
                        <p className="font-sans text-xs text-muted-foreground">
                          {row.sub[locale]}
                        </p>
                      </div>
                    </div>
                    <Input
                      type="text"
                      inputMode="text"
                      aria-label={matName}
                      value={row.val}
                      onChange={(e) => row.setVal(e.target.value)}
                      className={cn(CALC_MD3.dataInput, "w-28 sm:w-32")}
                    />
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN (5/12): STICKY AUDIT & RESULTS */}
        <div className="space-y-4 lg:col-span-5 lg:sticky lg:top-20">
          <section className={cn(CALC_MD3.surfaceCard, "space-y-4")}>
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className={cn(CALC_MD3.eyebrow, "text-muted-foreground")}>
                  {locale === "vi"
                    ? "Tổng Hợp Mảnh & Áp Chế Sao"
                    : "Shard Budget & Star Suppression"}
                </p>
                <h2 className={CALC_MD3.sectionTitle}>
                  {locale === "vi"
                    ? "Ngân Sách Mảnh Bí Bảo & Áp Chế -50%"
                    : "Relic Shard Budget & -50% Suppression"}
                </h2>
              </div>
              <Compass className="h-5 w-5 text-amber-500" aria-hidden="true" />
            </div>

            {mode === "trio" ? (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className={cn(CALC_MD3.tonalGroup, "space-y-1")}>
                  <p className="font-sans text-xs font-medium text-muted-foreground">
                    {locale === "vi" ? "Mảnh Cam Cần" : "Legendary Shards"}
                  </p>
                  <CalculatorMetricValue
                    testId="relics-total-legendary-shards"
                    value={formatExactNumber(
                      trioResult.requiredShardsByRarity.legendary
                    )}
                    toneClassName="text-amber-600 dark:text-amber-400"
                  />
                  <p className="font-sans text-xs text-muted-foreground">
                    {locale === "vi" ? "Thiếu: " : "Missing: "}
                    <span className="font-mono font-bold tabular-nums">
                      {formatExactNumber(
                        trioResult.deficitShardsByRarity.legendary
                      )}
                    </span>
                  </p>
                </div>

                <div className={cn(CALC_MD3.tonalGroup, "space-y-1")}>
                  <p className="font-sans text-xs font-medium text-muted-foreground">
                    {locale === "vi" ? "Mảnh Tím Cần" : "Epic Shards"}
                  </p>
                  <CalculatorMetricValue
                    testId="relics-total-epic-shards"
                    value={formatExactNumber(
                      trioResult.requiredShardsByRarity.epic
                    )}
                  />
                  <p className="font-sans text-xs text-muted-foreground">
                    {locale === "vi" ? "Thiếu: " : "Missing: "}
                    <span className="font-mono font-bold tabular-nums">
                      {formatExactNumber(trioResult.deficitShardsByRarity.epic)}
                    </span>
                  </p>
                </div>

                <div className={cn(CALC_MD3.tonalGroup, "space-y-1")}>
                  <p className="font-sans text-xs font-medium text-muted-foreground">
                    {locale === "vi"
                      ? "Tổng Sao Cam Đội 1"
                      : "Queue 1 Legendary ★"}
                  </p>
                  <CalculatorMetricValue
                    testId="relics-queue-legendary-stars"
                    value={`${trioResult.targetQueueLegendaryStars}★`}
                    toneClassName="text-emerald-600 dark:text-emerald-400"
                  />
                  <p className="font-sans text-xs text-muted-foreground">
                    {locale === "vi" ? "Địch: " : "Enemy: "}
                    <span className="font-mono font-bold tabular-nums">
                      {enemyLegendaryStars}★
                    </span>
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className={cn(CALC_MD3.tonalGroup, "space-y-1")}>
                  <p className="font-sans text-xs font-medium text-muted-foreground">
                    {singleResult.rarityTable.shardName[locale]}
                  </p>
                  <CalculatorMetricValue
                    testId="relics-single-required-shards"
                    value={formatExactNumber(singleResult.requiredShards)}
                    toneClassName="text-amber-600 dark:text-amber-400"
                  />
                  <p className="font-sans text-xs text-muted-foreground">
                    {locale === "vi"
                      ? "Thiếu (sau trừ Cuộn): "
                      : "Missing (after Scrolls): "}
                    <span className="font-mono font-bold tabular-nums">
                      {formatExactNumber(singleResult.deficitShardsAfterScrolls)}
                    </span>
                  </p>
                </div>

                <div className={cn(CALC_MD3.tonalGroup, "space-y-1")}>
                  <p className="font-sans text-xs font-medium text-muted-foreground">
                    {locale === "vi"
                      ? "Chỉ Số Sở Hữu (Owned Passive)"
                      : "Owned Passive Bonus"}
                  </p>
                  <p className="mt-1 font-mono text-lg font-bold tabular-nums text-emerald-600 dark:text-emerald-400">
                    +{singleResult.toStats.heroAttackPercent}% ATK / +
                    {singleResult.toStats.heroHpPercent}% HP
                  </p>
                  <p className="font-sans text-xs text-muted-foreground">
                    {locale === "vi" ? "Qua " : "Crosses "}
                    <span className="font-mono font-bold">
                      {singleResult.breakthroughCountCrossed}
                    </span>{" "}
                    {locale === "vi"
                      ? "mốc Đột Phá Pha Lê"
                      : "Crystal Breakthroughs"}
                  </p>
                </div>
              </div>
            )}

            {/* Auxiliary Materials: Arcane Crystal & Magic Stone Budget */}
            <div className={CALC_MD3.dividedList}>
              <div className="flex items-center justify-between py-2.5 first:pt-0">
                <span className="font-sans text-xs text-muted-foreground">
                  {locale === "vi"
                    ? "Pha Lê Bí Thuật Đột Phá (5★/10★/15★/20★)"
                    : "Arcane Crystals for Tier Breakthroughs"}
                </span>
                <span className="font-sans text-xs font-bold">
                  <span className="font-mono tabular-nums text-amber-600 dark:text-amber-400">
                    {formatExactNumber(
                      mode === "trio"
                        ? trioResult.totalRequiredArcaneCrystals
                        : singleResult.requiredArcaneCrystals
                    )}
                  </span>{" "}
                  ({locale === "vi" ? "Thiếu: " : "Missing: "}
                  <span className="font-mono tabular-nums">
                    {formatExactNumber(
                      mode === "trio"
                        ? trioResult.deficitArcaneCrystals
                        : singleResult.deficitArcaneCrystals
                    )}
                  </span>
                  )
                </span>
              </div>
              <div className="flex items-center justify-between py-2.5 last:pb-0">
                <span className="font-sans text-xs text-muted-foreground">
                  {locale === "vi"
                    ? "Đá Vân Ma Thuật Đồng Bộ Bậc"
                    : "Magic Stones for Tier Sync"}
                </span>
                <span className="font-sans text-xs font-bold">
                  <span className="font-mono tabular-nums">
                    {formatExactNumber(
                      mode === "trio"
                        ? trioResult.totalRequiredMagicStones
                        : singleResult.requiredMagicStones
                    )}
                  </span>{" "}
                  ({locale === "vi" ? "Thiếu: " : "Missing: "}
                  <span className="font-mono tabular-nums">
                    {formatExactNumber(
                      mode === "trio"
                        ? trioResult.deficitMagicStones
                        : singleResult.deficitMagicStones
                    )}
                  </span>
                  )
                </span>
              </div>
            </div>

            {/* Star Rating Suppression Verdict Box */}
            <div
              className={cn(
                "rounded-xl p-3.5 font-sans text-xs leading-relaxed",
                activeSuppression.status === "suppressing_enemy"
                  ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                  : activeSuppression.status === "tied_no_suppression"
                    ? "bg-amber-500/10 text-amber-700 dark:text-amber-300"
                    : "bg-destructive/10 text-destructive"
              )}
            >
              <div className="flex items-start gap-2.5">
                {activeSuppression.status === "suppressing_enemy" ? (
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
                ) : (
                  <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0" />
                )}
                <div className="space-y-1">
                  <p className="font-bold">
                    {activeSuppression.verdictTitle[locale]}
                  </p>
                  <p>{activeSuppression.verdictDetail[locale]}</p>
                </div>
              </div>
            </div>

            {activeSuppression.hasNonLegendaryInQueueWarning && (
              <div className="flex items-start gap-2.5 rounded-xl bg-amber-500/10 p-3 font-sans text-xs text-amber-700 dark:text-amber-300">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                <p>
                  {locale === "vi" ? (
                    <>
                      <strong>Cảnh báo Bẫy Bí Bảo Tím/Lam:</strong> Chỉ có Bí Bảo Cam (Legendary) trở lên mới được tính vào Tổng Sao Áp Chế. Bí Bảo Tím dù{" "}
                      <span className="font-mono">15★–20★</span> vẫn bị tính là{" "}
                      <strong className="font-mono">0★</strong> khi xét Áp Chế -50%!
                    </>
                  ) : (
                    <>
                      <strong>Epic/Rare Relic Trap Warning:</strong> Only Legendary+ Relics count toward Queue Star Rating. An Epic Relic at{" "}
                      <span className="font-mono">15★-20★</span> still contributes{" "}
                      <strong className="font-mono">0★</strong> toward -50% Suppression!
                    </>
                  )}
                </p>
              </div>
            )}

            <div className={cn(CALC_MD3.tonalGroup, "space-y-2")}>
              <div className="flex items-center justify-between">
                <span className="font-sans text-xs font-bold text-foreground">
                  {locale === "vi"
                    ? "Điểm Sự Kiện GAR / KvK (Ngày 1–2) & Guild Rush:"
                    : "GAR / KvK (Days 1-2) & Guild Rush Points:"}
                </span>
                <Sparkles className="h-4 w-4 text-amber-500" />
              </div>
              <div className="flex items-center justify-between font-sans text-xs">
                <span className="text-muted-foreground">
                  {locale === "vi"
                    ? "Điểm GAR/KvK từ Mảnh cần nâng:"
                    : "GAR/KvK points from required Shards:"}
                </span>
                <span className="font-sans font-bold text-amber-600 dark:text-amber-400">
                  <span className="font-mono tabular-nums">
                    +
                    {formatExactNumber(
                      mode === "trio"
                        ? trioResult.garPointsFromRequiredShards
                        : singleResult.garPointsFromRequiredShards
                    )}
                  </span>{" "}
                  {locale === "vi" ? "điểm" : "pts"}
                </span>
              </div>
              <div className="flex items-center justify-between font-sans text-xs">
                <span className="text-muted-foreground">
                  {locale === "vi"
                    ? "Điểm GAR/KvK toàn bộ Kho hiện có:"
                    : "Total GAR/KvK points in Owned Vault:"}
                </span>
                <span className="font-sans font-bold">
                  <span className="font-mono tabular-nums">
                    +
                    {formatExactNumber(
                      mode === "trio"
                        ? trioResult.garPointsFromOwnedVault
                        : singleResult.garPointsFromOwnedVault
                    )}
                  </span>{" "}
                  {locale === "vi" ? "điểm" : "pts"}
                </span>
              </div>
              <div className="flex items-center justify-between font-sans text-xs">
                <span className="text-muted-foreground">
                  {locale === "vi"
                    ? "Điểm Đua Bang (Guild Rush Thứ Tư–Thứ Năm):"
                    : "Guild Rush Points (Wed-Thu):"}
                </span>
                <span className="font-sans font-bold">
                  <span className="font-mono tabular-nums">
                    +
                    {formatExactNumber(
                      mode === "trio"
                        ? trioResult.guildRushPointsFromRequiredShards
                        : singleResult.guildRushPointsFromRequiredShards
                    )}
                  </span>{" "}
                  {locale === "vi" ? "điểm" : "pts"}
                </span>
              </div>
              <p className="font-sans text-xs text-muted-foreground">
                {locale === "vi"
                  ? "Lưu ý: Kỳ GAR thường chỉ tính điểm Bí Bảo ở Ngày 1–2 (Thứ Hai–Thứ Ba), KHÔNG tính vào Ngày 5 (chỉ KvK liên server mới tính thêm Ngày 5)."
                  : "Note: Standard GAR only scores Relics on Days 1-2 (Mon-Tue) and NOT on Day 5 (only cross-server KvK adds Relic scoring on Day 5)."}
              </p>
            </div>
          </section>

          <section className={cn(CALC_MD3.surfaceCard, "space-y-3")}>
            <p className={cn(CALC_MD3.eyebrow, "text-muted-foreground")}>
              {locale === "vi"
                ? "Bảng Cột Mốc Mảnh Bí Bảo SSoT (5★ / 8★ / 10★ / 15★ / 20★)"
                : "SSoT Relic Shard Milestones (5★ / 8★ / 10★ / 15★ / 20★)"}
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left font-sans text-xs">
                <thead>
                  <tr className="border-b border-border/60 text-muted-foreground">
                    <th className="py-2 pr-2 font-semibold">
                      {locale === "vi" ? "Mốc Sao" : "Star"}
                    </th>
                    <th className="px-2 py-2 text-right font-semibold">
                      {locale === "vi" ? "Cam (1,800)" : "Leg (1,800)"}
                    </th>
                    <th className="px-2 py-2 text-right font-semibold">
                      {locale === "vi" ? "Tím (3,130)" : "Epic (3,130)"}
                    </th>
                    <th className="px-2 py-2 text-right font-semibold">
                      {locale === "vi" ? "Lam (4,810)" : "Rare (4,810)"}
                    </th>
                    <th className="py-2 pl-2 text-right font-semibold">
                      %ATK/HP
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {[5, 8, 10, 15, 20].map((star) => {
                    const leg = RELIC_RARITY_TABLES.legendary.stars[star - 1];
                    const ep = RELIC_RARITY_TABLES.epic.stars[star - 1];
                    const ra = RELIC_RARITY_TABLES.rare.stars[star - 1];
                    return (
                      <tr key={star} className="font-medium">
                        <td className="py-2 pr-2 font-sans font-bold">
                          <span className="font-mono tabular-nums">
                            {star}★
                          </span>{" "}
                          ({locale === "vi" ? "Bậc" : "T"}
                          <span className="font-mono">{leg.tier}</span>)
                        </td>
                        <td className="px-2 py-2 text-right font-mono font-bold tabular-nums text-amber-600 dark:text-amber-400">
                          {formatExactNumber(leg.cumulativeShards)}
                        </td>
                        <td className="px-2 py-2 text-right font-mono tabular-nums">
                          {formatExactNumber(ep.cumulativeShards)}
                        </td>
                        <td className="px-2 py-2 text-right font-mono tabular-nums">
                          {formatExactNumber(ra.cumulativeShards)}
                        </td>
                        <td className="py-2 pl-2 text-right font-mono tabular-nums">
                          +{leg.heroAttackPercent}% / +{leg.heroHpPercent}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

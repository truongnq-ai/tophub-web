"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  Target,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { GameAssetFrame } from "@/components/guides/media/game-asset-frame";
import {
  LORD_GEAR_EXTENDED_MAX_LEVEL,
  LORD_GEAR_LEVEL_STEPS,
  LORD_GEAR_SACRED_TOME_UNLOCK_LEVEL,
  LORD_GEAR_SLOTS,
  LORD_GEAR_STANDARD_MAX_LEVEL,
  buildLordGearStaggeredCyclePlan,
  clampLordGearLevel,
  getLordGearSlotMeta,
  type LordGearFaction,
  type LordGearSlotId,
} from "@/content/calculators/lord-gear-data";
import type {
  CalculatorCategory,
  CalculatorLocale,
  CalculatorToolItem,
  CalculatorZone,
} from "@/content/calculators/types";
import { formatExactNumber } from "@/lib/number-format";
import { cn } from "@/lib/utils";
import { CALC_MD3, CalculatorToolHeader } from "./calculator-md3-primitives";
import { LordGearMasteryTable } from "./lord-gear-mastery-table";
import { LORD_GEAR_SHARED_STORAGE_KEY } from "./lord-gear-upgrade-calculator";

export interface LordGearResonanceCalculatorProps {
  readonly zone?: CalculatorZone;
  readonly category?: CalculatorCategory;
  readonly tool: CalculatorToolItem;
  readonly locale?: CalculatorLocale;
}

const DEFAULT_CURRENT_LEVELS: Record<LordGearSlotId, number> = {
  nature_shield: 3,
  league_crown: 3,
  horde_spear: 4,
  nature_totem: 3,
  league_ring: 4,
  horde_collar: 6,
};

const FACTION_OPTIONS: readonly {
  readonly id: LordGearFaction;
  readonly label: { readonly vi: string; readonly en: string };
}[] = [
  {
    id: "league",
    label: { vi: "Phe Liên Minh (League)", en: "League Faction" },
  },
  {
    id: "nature",
    label: { vi: "Phe Thiên Nhiên (Nature)", en: "Nature Faction" },
  },
  {
    id: "horde",
    label: { vi: "Phe Bộ Tộc (Horde)", en: "Horde Faction" },
  },
];

export function LordGearResonanceCalculator({
  tool,
  locale = "vi",
}: LordGearResonanceCalculatorProps): React.JSX.Element {
  const isVi = locale === "vi";

  const [mainFaction, setMainFaction] = useState<LordGearFaction>("horde");
  const [showExtended, setShowExtended] = useState<boolean>(false);
  const [currentLevels, setCurrentLevels] = useState<
    Record<LordGearSlotId, number>
  >(DEFAULT_CURRENT_LEVELS);

  const maxAllowedLevel = showExtended
    ? LORD_GEAR_EXTENDED_MAX_LEVEL
    : LORD_GEAR_STANDARD_MAX_LEVEL;

  const handleSyncFromUpgradeCalc = useCallback((): void => {
    try {
      const raw = window.localStorage.getItem(LORD_GEAR_SHARED_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as {
        currentLevels?: Partial<Record<LordGearSlotId, number>>;
      };
      if (parsed.currentLevels) {
        setCurrentLevels((prev) => ({
          nature_shield: clampLordGearLevel(
            parsed.currentLevels?.nature_shield ?? prev.nature_shield,
            true,
          ),
          league_crown: clampLordGearLevel(
            parsed.currentLevels?.league_crown ?? prev.league_crown,
            true,
          ),
          horde_spear: clampLordGearLevel(
            parsed.currentLevels?.horde_spear ?? prev.horde_spear,
            true,
          ),
          nature_totem: clampLordGearLevel(
            parsed.currentLevels?.nature_totem ?? prev.nature_totem,
            true,
          ),
          league_ring: clampLordGearLevel(
            parsed.currentLevels?.league_ring ?? prev.league_ring,
            true,
          ),
          horde_collar: clampLordGearLevel(
            parsed.currentLevels?.horde_collar ?? prev.horde_collar,
            true,
          ),
        }));
      }
    } catch {
      // Ignore invalid JSON
    }
  }, []);

  useEffect(() => {
    handleSyncFromUpgradeCalc();
  }, [handleSyncFromUpgradeCalc]);

  const handleLoadMaxPreset = useCallback((): void => {
    setCurrentLevels(DEFAULT_CURRENT_LEVELS);
    setMainFaction("horde");
  }, []);

  const handleToggleExtended = useCallback((): void => {
    setShowExtended((prev) => !prev);
  }, []);

  const cyclePlan = useMemo(
    () => buildLordGearStaggeredCyclePlan(currentLevels, mainFaction),
    [currentLevels, mainFaction],
  );

  const availableSteps = showExtended
    ? LORD_GEAR_LEVEL_STEPS
    : LORD_GEAR_LEVEL_STEPS.slice(0, maxAllowedLevel + 1);

  return (
    <div
      data-testid="lord-gear-resonance-calculator"
      className="space-y-5 w-full"
    >
      <CalculatorToolHeader
        code={tool.code}
        title={tool.title[locale]}
        actions={
          <>
            <button
              type="button"
              data-testid="resonance-sync-btn"
              onClick={handleSyncFromUpgradeCalc}
              className={cn(
                CALC_MD3.chipButton,
                "bg-amber-500/15 text-amber-700 hover:bg-amber-500/25 dark:text-amber-300",
              )}
            >
              <RefreshCw className="h-4 w-4" />
              {isVi ? "Đồng bộ từ 5.1" : "Sync from 5.1"}
            </button>
            <button
              type="button"
              data-testid="resonance-load-max-btn"
              onClick={handleLoadMaxPreset}
              className={cn(
                CALC_MD3.chipButton,
                "bg-muted/60 text-foreground hover:bg-muted",
              )}
            >
              <Sparkles className="h-4 w-4 text-amber-500" />
              {isVi ? "Mẫu Max Lv.83" : "Max Lv.83 Preset"}
            </button>
            <button
              type="button"
              data-testid="resonance-toggle-extended-btn"
              onClick={handleToggleExtended}
              className={cn(
                CALC_MD3.chipButton,
                showExtended
                  ? "bg-rose-500/20 text-rose-700 ring-1 ring-rose-500/50 dark:text-rose-300"
                  : "bg-muted/60 text-muted-foreground hover:text-foreground",
              )}
            >
              <BookOpen className="h-4 w-4" />
              {showExtended
                ? isVi
                  ? "Đang bật: Đỏ T2–T4"
                  : "Extended: Mythic T2–T4"
                : isVi
                  ? "Mở rộng Đỏ T2–T4"
                  : "Unlock Mythic T2–T4"}
            </button>
          </>
        }
      />

      {/* Faction Selector + 6-Slot Current Loadout & Y2 Sacred Tome Readiness */}
      <section className={cn(CALC_MD3.surfaceCard, "space-y-4")}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className={cn(CALC_MD3.eyebrow, "text-amber-500")}>
              {isVi
                ? "Bước 1: Chọn Phe Chủ Đạo & Cấp 6 Ô Hiện Tại"
                : "Step 1: Select Main Faction & Current 6-Slot Loadout"}
            </span>
            <h2 className={CALC_MD3.sectionTitle}>
              {isVi
                ? "Phân Nhóm Mũi Nhọn (Nhóm A) & Đi Sau (Nhóm B)"
                : "Spearhead (Group A) & Follow-Up (Group B) Partition"}
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {FACTION_OPTIONS.map((fac) => (
              <button
                key={fac.id}
                type="button"
                data-testid={`faction-btn-${fac.id}`}
                onClick={() => setMainFaction(fac.id)}
                className={cn(
                  CALC_MD3.chipButton,
                  mainFaction === fac.id
                    ? "bg-amber-500 text-slate-950 font-black"
                    : "bg-muted/60 text-muted-foreground hover:text-foreground",
                )}
              >
                {fac.label[locale]}
              </button>
            ))}
          </div>
        </div>

        {/* 6 Slots Compact Level Selector */}
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {LORD_GEAR_SLOTS.map((slot) => {
            const isSpearhead = cyclePlan.spearheadSlotIds.includes(slot.id);
            const currentLv = currentLevels[slot.id] ?? 0;

            return (
              <div
                key={slot.id}
                data-testid={`resonance-slot-${slot.id}`}
                className={cn(
                  CALC_MD3.tonalGroup,
                  "flex flex-col gap-2",
                  isSpearhead ? "ring-2 ring-amber-500/60 bg-amber-500/5" : "",
                )}
              >
                <div className="flex items-center gap-2.5">
                  <GameAssetFrame
                    src={slot.iconPath}
                    alt={slot.name[locale]}
                    size="sm"
                    shape="item"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="truncate text-xs font-bold text-foreground">
                        {slot.name[locale]}
                      </span>
                      <span
                        className={cn(
                          "shrink-0 rounded px-1.5 py-0.5 text-xs font-black",
                          isSpearhead
                            ? "bg-amber-500 text-slate-950"
                            : "bg-muted text-muted-foreground",
                        )}
                      >
                        {isSpearhead
                          ? isVi
                            ? "Nhóm A (Mũi nhọn)"
                            : "Group A (Spearhead)"
                          : isVi
                            ? "Nhóm B (Đi sau)"
                            : "Group B (Follow-Up)"}
                      </span>
                    </div>
                    <span className="block text-xs text-muted-foreground">
                      {slot.positionLabel[locale]}
                    </span>
                  </div>
                </div>

                <select
                  data-testid={`resonance-level-select-${slot.id}`}
                  value={currentLv}
                  onChange={(e) => {
                    const nextLv = Number(e.target.value);
                    setCurrentLevels((prev) => ({
                      ...prev,
                      [slot.id]: nextLv,
                    }));
                  }}
                  className="h-10 rounded-xl border border-border/70 bg-background px-2.5 text-xs font-semibold text-foreground"
                >
                  {availableSteps.map((step) => (
                    <option
                      key={`res-${slot.id}-${step.level}`}
                      value={step.level}
                    >
                      {step.label[locale]}
                    </option>
                  ))}
                </select>
              </div>
            );
          })}
        </div>

        {/* Sacred Tome (Y2 Lv.33) Readiness Bar */}
        <div
          data-testid="sacred-tome-readiness-bar"
          className="rounded-xl border border-border/60 bg-muted/30 p-3 space-y-2"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <GameAssetFrame
                src="/images/items/consumables/icon_lord_7.webp"
                alt="Sacred Tome"
                size="xs"
                shape="item"
              />
              <span className="font-bold text-foreground">
                {isVi
                  ? "Tiến Độ Mở Khóa Thiên Thư / Thánh Điển (Cần 6/6 món đạt Vàng T2 • Lv.33):"
                  : "Sacred Tome Unlock Readiness (Requires 6/6 slots at Yellow T2 • Lv.33):"}
              </span>
            </div>
            <span className="font-bold text-amber-600 dark:text-amber-400">
              <span className="font-mono font-black">{cyclePlan.sacredTomeReadyCount}/6</span>{" "}
              <span>
                {cyclePlan.isSacredTomeUnlocked
                  ? isVi
                    ? "(Đã mở khóa!)"
                    : "(Unlocked!)"
                  : isVi
                    ? `(Còn thiếu ${6 - cyclePlan.sacredTomeReadyCount} món)`
                    : `(${6 - cyclePlan.sacredTomeReadyCount} remaining)`}
              </span>
            </span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-amber-500 transition-all"
              style={{
                width: `${Math.round((cyclePlan.sacredTomeReadyCount / 6) * 100)}%`,
              }}
            />
          </div>
        </div>
      </section>

      {/* 4-Step Staggered Cycle Plan */}
      <section className={cn(CALC_MD3.surfaceCard, "space-y-4")}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className={cn(CALC_MD3.eyebrow, "text-amber-500")}>
              {isVi
                ? "Chu Trình Lệch Pha 4 Bước (Quy Luật 3-3)"
                : "4-Step Staggered Resonance Cycle (3-3 Rule)"}
            </span>
            <h2 className={CALC_MD3.sectionTitle}>
              {isVi
                ? "Lộ Trình Nâng Cấp Tối Ưu Tiếp Theo"
                : "Recommended Next 4 Upgrade Steps"}
            </h2>
          </div>
          <Link
            href="/calculators/lord-gear/lord-gear-upgrade"
            className="text-xs font-bold text-amber-600 hover:underline dark:text-amber-400"
          >
            {isVi
              ? "← Quay lại 5.1 Tính Tổng Nguyên Liệu"
              : "← Back to 5.1 Material Calculator"}
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {cyclePlan.steps.map((step) => (
            <div
              key={`cycle-step-${step.stepNumber}`}
              data-testid={`staggered-step-${step.stepNumber}`}
              className={cn(CALC_MD3.tonalGroup, "flex flex-col justify-between gap-3")}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1 rounded-md bg-amber-500 px-2 py-0.5 font-heading text-xs font-black text-slate-950">
                    <Target className="h-3 w-3" />
                    {isVi ? `BƯỚC ${step.stepNumber}` : `STEP ${step.stepNumber}`}
                  </span>
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                    <span>{isVi ? "Đích:" : "Target:"} {step.targetLabel[locale]}</span>{" "}
                    <span className="font-mono">(Lv.{step.targetLevel})</span>
                  </span>
                </div>

                <h3 className="text-sm font-heading font-bold text-foreground">
                  {step.title[locale]}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {step.description[locale]}
                </p>

                {/* Target Slots Pill Row */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {step.targetSlotIds.map((slotId) => {
                    const meta = getLordGearSlotMeta(slotId);
                    return (
                      <span
                        key={`step-${step.stepNumber}-${slotId}`}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-background/80 px-2 py-1 text-xs font-semibold text-foreground"
                      >
                        <GameAssetFrame
                          src={meta.iconPath}
                          alt={meta.name[locale]}
                          size="xs"
                          shape="item"
                        />
                        {meta.name[locale]}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2 border-t border-border/50 pt-2.5 text-xs">
                <div className="flex items-center gap-1.5 font-semibold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                  <span>{step.unlocksMasteryLabel[locale]}</span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="text-muted-foreground">
                    {isVi ? "Chi phí bước này:" : "Step Cost:"}
                  </span>
                  <div className="flex flex-wrap items-center gap-2 font-mono font-bold">
                    <span>🪨 {formatExactNumber(step.cost.refinedMetal)}</span>
                    <span>🧵 {formatExactNumber(step.cost.magicThread)}</span>
                    {step.cost.orichalcum > 0 ? (
                      <span className="text-amber-600 dark:text-amber-400">
                        🔶 {formatExactNumber(step.cost.orichalcum)}
                      </span>
                    ) : null}
                    {step.cost.dragonBlood > 0 ? (
                      <span className="text-rose-600 dark:text-rose-400">
                        🩸 {formatExactNumber(step.cost.dragonBlood)}
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mastery Overview Cards & 17-Tier Table */}
      <LordGearMasteryTable
        mastery={cyclePlan.currentMastery}
        showExtended={showExtended}
        locale={locale}
      />
    </div>
  );
}

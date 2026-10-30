"use client";

import Image from "next/image";
import React, { useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  RotateCcw,
  Sparkles,
  Swords,
} from "lucide-react";
import {
  EXCLUSIVE_SKILL_MILESTONES,
  EXCLUSIVE_WEAPON_HERO_CATALOG,
  calculateExclusiveWeapon,
  type ExclusiveCoreProfile,
  type ExclusiveWeaponFaction,
} from "@/content/calculators/exclusive-weapon-data";
import type {
  CalculatorCategory,
  CalculatorLocale,
  CalculatorToolItem,
  CalculatorZone,
} from "@/content/calculators/types";
import { cn } from "@/lib/utils";
import {
  CALC_MD3,
  CalculatorMetricValue,
  CalculatorStepperButton,
  CalculatorToolHeader,
} from "./calculator-md3-primitives";
import { ExclusiveWeaponStepSelector } from "./exclusive-weapon-step-selector";

export interface ExclusiveWeaponCalculatorProps {
  readonly zone?: CalculatorZone;
  readonly category?: CalculatorCategory;
  readonly tool: CalculatorToolItem;
  readonly locale?: CalculatorLocale;
}

const FACTION_TABS: readonly {
  readonly id: ExclusiveWeaponFaction;
  readonly label: Record<CalculatorLocale, string>;
}[] = [
  { id: "league", label: { vi: "Liên Minh (League)", en: "League" } },
  { id: "nature", label: { vi: "Tự Nhiên (Nature)", en: "Nature" } },
  { id: "horde", label: { vi: "Bộ Lạc (Horde)", en: "Horde" } },
];

const HERO_COUNT_PRESETS: readonly {
  readonly count: number;
  readonly label: Record<CalculatorLocale, string>;
}[] = [
  { count: 1, label: { vi: "1 Tướng (×1)", en: "1 Hero (×1)" } },
  { count: 2, label: { vi: "2 Tướng (×2)", en: "2 Heroes (×2)" } },
  { count: 3, label: { vi: "3 Tướng (×3)", en: "3 Heroes (×3)" } },
  {
    count: 6,
    label: { vi: "Đội 1 • 6 Tướng (×6)", en: "Queue 1 • 6 Heroes (×6)" },
  },
];

function parseNonNegativeInt(raw: string): number {
  const cleaned = raw.replace(/[^\d]/g, "");
  if (!cleaned) return 0;
  const parsed = Number.parseInt(cleaned, 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

export function ExclusiveWeaponCalculator({
  tool,
  locale = "vi",
}: ExclusiveWeaponCalculatorProps) {
  const [activeFaction, setActiveFaction] =
    useState<ExclusiveWeaponFaction>("league");
  const [selectedHeroId, setSelectedHeroId] = useState<string>("adjudicator");
  const [heroCount, setHeroCount] = useState<number>(1);
  const [coreProfile, setCoreProfile] = useState<ExclusiveCoreProfile>(
    "guide_cumulative_920"
  );

  const [fromLevel, setFromLevel] = useState<number>(0);
  const [toLevel, setToLevel] = useState<number>(20);
  const [fromStarStep, setFromStarStep] = useState<number>(0);
  const [toStarStep, setToStarStep] = useState<number>(25);

  const [ownedShardsInput, setOwnedShardsInput] = useState<string>("0");
  const [ownedCoresInput, setOwnedCoresInput] = useState<string>("0");

  const ownedShards = useMemo(
    () => parseNonNegativeInt(ownedShardsInput),
    [ownedShardsInput]
  );
  const ownedCores = useMemo(
    () => parseNonNegativeInt(ownedCoresInput),
    [ownedCoresInput]
  );

  const factionHeroes = useMemo(
    () =>
      EXCLUSIVE_WEAPON_HERO_CATALOG.filter((h) => h.faction === activeFaction),
    [activeFaction]
  );

  const result = useMemo(
    () =>
      calculateExclusiveWeapon({
        fromLevel,
        toLevel,
        fromStarStep,
        toStarStep,
        heroCount,
        coreProfile,
        selectedHeroId,
        ownedShards,
        ownedCores,
      }),
    [
      fromLevel,
      toLevel,
      fromStarStep,
      toStarStep,
      heroCount,
      coreProfile,
      selectedHeroId,
      ownedShards,
      ownedCores,
    ]
  );

  const handleSelectFaction = (faction: ExclusiveWeaponFaction) => {
    setActiveFaction(faction);
    const firstHero = EXCLUSIVE_WEAPON_HERO_CATALOG.find(
      (h) => h.faction === faction
    );
    if (firstHero) {
      setSelectedHeroId(firstHero.heroId);
    }
  };

  const handleReset = () => {
    setActiveFaction("league");
    setSelectedHeroId("adjudicator");
    setHeroCount(1);
    setCoreProfile("guide_cumulative_920");
    setFromLevel(0);
    setToLevel(20);
    setFromStarStep(0);
    setToStarStep(25);
    setOwnedShardsInput("0");
    setOwnedCoresInput("0");
  };

  const shardName =
    locale === "vi" ? result.shardMaterial.nameVi : result.shardMaterial.nameEn;
  const coreName =
    locale === "vi" ? result.coreMaterial.nameVi : result.coreMaterial.nameEn;

  return (
    <div data-testid="exclusive-weapon-calculator" className="space-y-4">
      {/* 1. Flat MD3 Tool Header + Hero Multiplier Presets */}
      <CalculatorToolHeader
        code={tool.code}
        title={tool.title[locale].replace(`${tool.code} `, "")}
        actions={
          <>
            {HERO_COUNT_PRESETS.map((preset) => {
              const isActive = heroCount === preset.count;
              return (
                <button
                  key={preset.count}
                  type="button"
                  data-testid={`hero-preset-${preset.count}`}
                  aria-pressed={isActive}
                  onClick={() => setHeroCount(preset.count)}
                  className={cn(
                    CALC_MD3.chipButton,
                    "font-sans",
                    isActive
                      ? "bg-amber-500 font-bold text-slate-950"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <span>{preset.label[locale]}</span>
                </button>
              );
            })}

            <button
              type="button"
              onClick={handleReset}
              data-testid="reset-exclusive-weapon"
              className={cn(
                CALC_MD3.chipButton,
                "bg-muted/50 font-sans text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <RotateCcw className="h-4 w-4 text-amber-500" aria-hidden="true" />
              <span>{locale === "vi" ? "Đặt lại" : "Reset"}</span>
            </button>
          </>
        }
      />

      {/* Main 12-Column Grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Left Column (7 cols): Hero Codex Hub, Level Selectors, Star Selectors & Owned Inputs */}
        <div className="space-y-4 lg:col-span-7">
          {/* Card 1: Faction ➔ Hero Exclusive Weapon Codex Hub & Squad Multiplier */}
          <section className={cn(CALC_MD3.surfaceCard, "space-y-4")}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className={CALC_MD3.sectionTitle}>
                {locale === "vi"
                  ? "1. Tra Cứu Thần Khí Tướng (Codex Exclusive Gear)"
                  : "1. Hero Exclusive Weapon Codex Hub"}
              </h2>

              <div className="flex items-center gap-1.5">
                <CalculatorStepperButton
                  direction="decrease"
                  testId="hero-count-minus"
                  ariaLabel={
                    locale === "vi" ? "Giảm số tướng" : "Decrease hero count"
                  }
                  disabled={heroCount <= 1}
                  onClick={() => setHeroCount((c) => Math.max(1, c - 1))}
                />
                <div className="flex min-h-[44px] min-w-16 items-center justify-center rounded-xl bg-muted/40 px-3 font-mono text-sm font-bold text-foreground tabular-nums">
                  ×{heroCount}
                </div>
                <CalculatorStepperButton
                  direction="increase"
                  testId="hero-count-plus"
                  ariaLabel={
                    locale === "vi" ? "Tăng số tướng" : "Increase hero count"
                  }
                  disabled={heroCount >= 6}
                  onClick={() => setHeroCount((c) => Math.min(6, c + 1))}
                />
              </div>
            </div>

            {/* Faction Tabs */}
            <div className="grid grid-cols-3 gap-2">
              {FACTION_TABS.map((tab) => {
                const isActive = activeFaction === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    data-testid={`ew-faction-${tab.id}`}
                    onClick={() => handleSelectFaction(tab.id)}
                    className={cn(
                      CALC_MD3.chipButton,
                      "font-sans",
                      isActive
                        ? "bg-amber-500 font-bold text-slate-950"
                        : "bg-muted/40 text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                    )}
                  >
                    {tab.label[locale]}
                  </button>
                );
              })}
            </div>

            {/* Hero Exclusive Weapon Grid */}
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {factionHeroes.map((hero) => {
                const isSelected = result.selectedHero.heroId === hero.heroId;
                return (
                  <button
                    key={hero.heroId}
                    type="button"
                    data-testid={`ew-hero-${hero.heroId}`}
                    onClick={() => setSelectedHeroId(hero.heroId)}
                    className={cn(
                      "flex min-h-[44px] items-center gap-2.5 rounded-xl px-3 py-2 text-left transition-colors",
                      isSelected
                        ? "bg-amber-500 font-bold text-slate-950"
                        : "bg-muted/40 text-foreground hover:bg-muted/70"
                    )}
                  >
                    <Image
                      src={hero.weaponIconPath}
                      alt={hero.weaponName[locale]}
                      width={34}
                      height={34}
                      className="h-8 w-8 shrink-0 rounded-lg object-contain"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-sans text-xs font-bold">
                        {hero.heroName[locale]}
                      </p>
                      <p
                        className={cn(
                          "truncate font-sans text-xs",
                          isSelected
                            ? "text-slate-900/85"
                            : "text-muted-foreground"
                        )}
                      >
                        {hero.weaponName[locale]}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Hero Exclusive Weapon Spotlight */}
            <div
              className={cn(
                CALC_MD3.tonalGroup,
                "flex items-center gap-3"
              )}
            >
              <Image
                src={result.selectedHero.weaponIconPath}
                alt={result.selectedHero.weaponName[locale]}
                width={48}
                height={48}
                className="h-12 w-12 shrink-0 rounded-xl object-contain"
              />
              <div className="min-w-0 flex-1 space-y-0.5">
                <p className="font-sans text-xs font-bold text-foreground">
                  {result.selectedHero.heroName[locale]} •{" "}
                  <span className="text-amber-600 dark:text-amber-400">
                    {result.selectedHero.weaponName[locale]}
                  </span>
                </p>
                <p className="font-sans text-xs leading-relaxed text-muted-foreground">
                  {result.selectedHero.signatureHighlight[locale]}
                </p>
              </div>
            </div>
          </section>

          {/* Card 2: Exclusive Weapon Level Selectors (Lv.0 ➔ Lv.20 Shards) */}
          <section className={cn(CALC_MD3.surfaceCard, "space-y-4")}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className={CALC_MD3.sectionTitle}>
                {locale === "vi"
                  ? "2. Cấp Vũ Khí Độc Quyền (Lv.0 ➔ Lv.20 • Tốn Mảnh Độc Quyền)"
                  : "2. Exclusive Weapon Level (Lv.0 ➔ Lv.20 • Costs Exclusive Shards)"}
              </h2>
              <span className="font-sans text-xs text-muted-foreground">
                {locale === "vi"
                  ? "Mốc đột phá kỹ năng: Lv.1, Lv.5, Lv.10, Lv.15, Lv.20"
                  : "Skill Milestones: Lv.1, Lv.5, Lv.10, Lv.15, Lv.20"}
              </span>
            </div>

            <div className="space-y-3">
              <ExclusiveWeaponStepSelector
                mode="level"
                label={
                  locale === "vi"
                    ? "Cấp Vũ Khí hiện tại"
                    : "Current Weapon Level"
                }
                badgeText={locale === "vi" ? "TỪ" : "FROM"}
                value={fromLevel}
                onChange={setFromLevel}
                locale={locale}
                testIdPrefix="ew-from-level"
              />

              <ExclusiveWeaponStepSelector
                mode="level"
                label={
                  locale === "vi"
                    ? "Cấp Vũ Khí mục tiêu"
                    : "Target Weapon Level"
                }
                badgeText={locale === "vi" ? "ĐẾN" : "TO"}
                value={toLevel}
                onChange={setToLevel}
                locale={locale}
                testIdPrefix="ew-to-level"
              />
            </div>

            {result.isInvalidLevelRange ? (
              <div
                role="alert"
                data-testid="ew-invalid-level-warning"
                className="flex items-start gap-2.5 rounded-xl bg-amber-500/12 p-3 text-amber-700 dark:text-amber-300"
              >
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                <p className="font-sans text-xs leading-relaxed">
                  {locale === "vi"
                    ? "Cấp mục tiêu đang thấp hơn cấp hiện tại. Mảnh Độc Quyền cần thiết được đặt bằng 0."
                    : "Target level is lower than current level. Required Exclusive Shards are set to 0."}
                </p>
              </div>
            ) : null}
          </section>

          {/* Card 3: Star Breakthrough Selectors (0★ ➔ 5★ Meteoric Iron Cores) */}
          <section className={cn(CALC_MD3.surfaceCard, "space-y-4")}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className={CALC_MD3.sectionTitle}>
                  {locale === "vi"
                    ? "3. Đột Phá Sao Vũ Khí (0★ ➔ 5★ • Tốn Lõi Sắt Thiên Thạch)"
                    : "3. Weapon Star Breakthrough (0★ ➔ 5★ • Costs Meteoric Iron Cores)"}
                </h2>
                <p className="font-sans text-xs text-muted-foreground">
                  {locale === "vi"
                    ? "Chọn hệ quy chiếu SSoT cho Lõi Sắt Thiên Thạch:"
                    : "Select SSoT Reference Profile for Meteoric Iron Cores:"}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  data-testid="core-profile-guide_cumulative_920"
                  onClick={() => setCoreProfile("guide_cumulative_920")}
                  className={cn(
                    CALC_MD3.chipButton,
                    "font-sans text-xs",
                    coreProfile === "guide_cumulative_920"
                      ? "bg-amber-500 font-bold text-slate-950"
                      : "bg-muted/40 text-muted-foreground hover:bg-muted/70"
                  )}
                >
                  <span>
                    {locale === "vi"
                      ? "Chuẩn Guide (920 Lõi)"
                      : "Guide Standard (920 Cores)"}
                  </span>
                </button>

                <button
                  type="button"
                  data-testid="core-profile-raw_subtier_2385"
                  onClick={() => setCoreProfile("raw_subtier_2385")}
                  className={cn(
                    CALC_MD3.chipButton,
                    "font-sans text-xs",
                    coreProfile === "raw_subtier_2385"
                      ? "bg-amber-500 font-bold text-slate-950"
                      : "bg-muted/40 text-muted-foreground hover:bg-muted/70"
                  )}
                >
                  <span>
                    {locale === "vi"
                      ? "Bảng Tiểu Bậc (2,385 Lõi)"
                      : "Raw Sub-tier (2,385 Cores)"}
                  </span>
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <ExclusiveWeaponStepSelector
                mode="star"
                label={
                  locale === "vi"
                    ? "Bậc Sao hiện tại"
                    : "Current Star Breakthrough"
                }
                badgeText={locale === "vi" ? "TỪ" : "FROM"}
                value={fromStarStep}
                onChange={setFromStarStep}
                locale={locale}
                testIdPrefix="ew-from-star"
                coreProfile={coreProfile}
              />

              <ExclusiveWeaponStepSelector
                mode="star"
                label={
                  locale === "vi"
                    ? "Bậc Sao mục tiêu"
                    : "Target Star Breakthrough"
                }
                badgeText={locale === "vi" ? "ĐẾN" : "TO"}
                value={toStarStep}
                onChange={setToStarStep}
                locale={locale}
                testIdPrefix="ew-to-star"
                coreProfile={coreProfile}
              />
            </div>

            {result.isInvalidStarRange ? (
              <div
                role="alert"
                data-testid="ew-invalid-star-warning"
                className="flex items-start gap-2.5 rounded-xl bg-amber-500/12 p-3 text-amber-700 dark:text-amber-300"
              >
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                <p className="font-sans text-xs leading-relaxed">
                  {locale === "vi"
                    ? "Bậc Sao mục tiêu đang thấp hơn Bậc Sao hiện tại. Lõi Sắt cần thiết được đặt bằng 0."
                    : "Target Star step is lower than current Star step. Required Meteoric Iron Cores are set to 0."}
                </p>
              </div>
            ) : null}
          </section>

          {/* Card 4: Owned Inventory Inputs */}
          <section className={cn(CALC_MD3.surfaceCard, "space-y-4")}>
            <div className="flex items-center justify-between gap-2">
              <h2 className={CALC_MD3.sectionTitle}>
                {locale === "vi"
                  ? "4. Tài Nguyên Đang Có Trong Túi Đồ"
                  : "4. Owned Exclusive Weapon Materials"}
              </h2>
              <span className="font-sans text-xs text-muted-foreground">
                {locale === "vi" ? "Trừ tự động" : "Auto-deducted"}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {/* Universal Exclusive Gear Shard */}
              <div className={cn(CALC_MD3.tonalGroup, "space-y-2")}>
                <label
                  htmlFor="owned-ew-shards"
                  className="flex items-center gap-2 font-sans text-xs font-semibold text-foreground"
                >
                  <Image
                    src={result.shardMaterial.iconPath}
                    alt={shardName}
                    width={22}
                    height={22}
                    className="h-5 w-5 object-contain"
                  />
                  <span>{shardName}</span>
                </label>
                <input
                  id="owned-ew-shards"
                  data-testid="owned-ew-shards-input"
                  type="text"
                  inputMode="numeric"
                  value={ownedShardsInput}
                  onChange={(e) => setOwnedShardsInput(e.target.value)}
                  className={cn(
                    CALC_MD3.dataInput,
                    "w-full bg-background px-3 text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                  )}
                />
              </div>

              {/* Meteoric Iron Core */}
              <div className={cn(CALC_MD3.tonalGroup, "space-y-2")}>
                <label
                  htmlFor="owned-ew-cores"
                  className="flex items-center gap-2 font-sans text-xs font-semibold text-foreground"
                >
                  <Image
                    src={result.coreMaterial.iconPath}
                    alt={coreName}
                    width={22}
                    height={22}
                    className="h-5 w-5 object-contain"
                  />
                  <span>{coreName}</span>
                </label>
                <input
                  id="owned-ew-cores"
                  data-testid="owned-ew-cores-input"
                  type="text"
                  inputMode="numeric"
                  value={ownedCoresInput}
                  onChange={(e) => setOwnedCoresInput(e.target.value)}
                  className={cn(
                    CALC_MD3.dataInput,
                    "w-full bg-background px-3 text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                  )}
                />
              </div>
            </div>
          </section>
        </div>

        {/* Right Column (5 cols): Material KPIs, Skill Breakthrough Milestones & Star Breakdown */}
        <div className="space-y-4 lg:col-span-5">
          {/* KPI Summary Card */}
          <section
            data-testid="exclusive-weapon-kpi-card"
            className={cn(CALC_MD3.surfaceCard, "space-y-4")}
          >
            <div className="flex items-center justify-between gap-2">
              <h2 className={CALC_MD3.sectionTitle}>
                {locale === "vi"
                  ? "Tổng Nguyên Liệu Thần Khí"
                  : "Total Required Exclusive Materials"}
              </h2>
              <span className="inline-flex items-center rounded-full bg-amber-500/15 px-2.5 py-0.5 font-sans text-xs font-semibold text-amber-700 dark:text-amber-300">
                ×{result.heroCount} {locale === "vi" ? "tướng" : "heroes"}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {/* Shards KPI */}
              <div className={cn(CALC_MD3.tonalGroup, "space-y-1.5")}>
                <div className="flex items-center gap-2">
                  <Image
                    src={result.shardMaterial.iconPath}
                    alt={shardName}
                    width={26}
                    height={26}
                    className="h-6 w-6 object-contain"
                  />
                  <span className="font-sans text-xs font-semibold text-muted-foreground">
                    {shardName}
                  </span>
                </div>
                <CalculatorMetricValue
                  testId="ew-total-shards"
                  value={result.requiredShards.toLocaleString("en-US")}
                  toneClassName="text-amber-600 dark:text-amber-400"
                />
                <p className="font-sans text-xs text-muted-foreground">
                  {locale === "vi" ? "Còn thiếu:" : "Missing:"}{" "}
                  <span className="font-mono font-semibold text-foreground">
                    {result.missingShards.toLocaleString("en-US")}
                  </span>
                </p>
              </div>

              {/* Meteoric Iron Cores KPI */}
              <div className={cn(CALC_MD3.tonalGroup, "space-y-1.5")}>
                <div className="flex items-center gap-2">
                  <Image
                    src={result.coreMaterial.iconPath}
                    alt={coreName}
                    width={26}
                    height={26}
                    className="h-6 w-6 object-contain"
                  />
                  <span className="font-sans text-xs font-semibold text-muted-foreground">
                    {coreName}
                  </span>
                </div>
                <CalculatorMetricValue
                  testId="ew-total-cores"
                  value={result.requiredCores.toLocaleString("en-US")}
                />
                <p className="font-sans text-xs text-muted-foreground">
                  {locale === "vi" ? "Còn thiếu:" : "Missing:"}{" "}
                  <span className="font-mono font-semibold text-foreground">
                    {result.missingCores.toLocaleString("en-US")}
                  </span>
                </p>
              </div>
            </div>

            {/* Next Skill Milestone Callout */}
            {result.nextSkillMilestone ? (
              <div className={cn(CALC_MD3.tonalGroup, "space-y-1")}>
                <p className="font-sans text-xs font-semibold text-foreground">
                  {locale === "vi"
                    ? "Khoảng cách tới Mốc Đột Phá Kỹ Năng tiếp theo:"
                    : "Distance to Next Skill Breakthrough Milestone:"}
                </p>
                <p className="font-sans text-xs text-muted-foreground">
                  {result.nextSkillMilestone.title[locale]} •{" "}
                  {locale === "vi" ? "Cần thêm" : "Needs"}{" "}
                  <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                    {result.shardsToNextMilestone.toLocaleString("en-US")}
                  </span>{" "}
                  {locale === "vi" ? "Mảnh" : "Shards"}
                </p>
              </div>
            ) : (
              <div className={cn(CALC_MD3.tonalGroup)}>
                <p className="font-sans text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  {locale === "vi"
                    ? "Đã chạm trần Mốc Lv.20 (+20) Tối Thượng!"
                    : "Reached Maximum Lv.20 (+20) Signature Milestone!"}
                </p>
              </div>
            )}
          </section>

          {/* Skill Breakthrough Milestones Tracker */}
          <section className={cn(CALC_MD3.surfaceCard, "space-y-3")}>
            <div className="flex items-center justify-between gap-2">
              <h2 className={CALC_MD3.sectionTitle}>
                {locale === "vi"
                  ? "5 Mốc Đột Phá Kỹ Năng Độc Quyền"
                  : "5 Signature Skill Breakthrough Milestones"}
              </h2>
              <Swords className="h-4 w-4 text-amber-500" />
            </div>

            <div className="space-y-2">
              {EXCLUSIVE_SKILL_MILESTONES.map((milestone) => {
                const isUnlocked =
                  result.toLevelNode.level >= milestone.requiredLevel;
                return (
                  <div
                    key={milestone.id}
                    className={cn(
                      CALC_MD3.tonalGroup,
                      "space-y-1",
                      isUnlocked ? "bg-amber-500/12" : "opacity-75"
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-sans text-xs font-bold text-foreground">
                        {milestone.title[locale]}
                      </p>
                      <span className="font-mono text-xs font-bold text-amber-600 tabular-nums dark:text-amber-400">
                        {milestone.cumulativeShards.toLocaleString("en-US")}
                      </span>
                    </div>
                    <p className="font-sans text-xs text-muted-foreground">
                      {milestone.effectSummary[locale]}
                    </p>
                    <p className="font-sans text-xs font-medium text-foreground/85">
                      {milestone.priorityRating[locale]}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 5-Star Meteoric Iron Core Breakdown */}
          <section className={cn(CALC_MD3.surfaceCard, "space-y-3")}>
            <div className="flex items-center justify-between gap-2">
              <h2 className={CALC_MD3.sectionTitle}>
                {locale === "vi"
                  ? "Phân Bổ Lõi Sắt Thiên Thạch Theo Sao"
                  : "Meteoric Iron Core Breakdown by Star"}
              </h2>
              <CheckCircle2 className="h-4 w-4 text-amber-500" />
            </div>

            <div className="space-y-2">
              {result.starBreakdown.map((item) => (
                <div
                  key={item.starBracket}
                  className={cn(
                    CALC_MD3.tonalGroup,
                    "flex items-center justify-between gap-2"
                  )}
                >
                  <div>
                    <p className="font-sans text-xs font-bold text-foreground">
                      {item.label[locale]}
                    </p>
                    <p className="font-sans text-xs text-muted-foreground">
                      {locale === "vi" ? "Tích lũy 1 tướng:" : "Cumulative / hero:"}{" "}
                      <span className="font-mono font-semibold text-foreground">
                        {item.cumulativeCoresPerHero.toLocaleString("en-US")}
                      </span>
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-sans text-xs font-semibold text-foreground">
                      <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                        {item.totalCores.toLocaleString("en-US")}
                      </span>{" "}
                      {locale === "vi" ? "Lõi Sắt" : "Cores"}
                    </p>
                    <p className="font-sans text-xs text-muted-foreground">
                      <span className="font-mono font-semibold text-foreground">
                        {item.coresPerHero.toLocaleString("en-US")}
                      </span>{" "}
                      / {locale === "vi" ? "tướng" : "hero"}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className={cn(CALC_MD3.tonalGroup, "flex items-start gap-2.5")}>
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
              <p className="font-sans text-xs leading-relaxed text-muted-foreground">
                {locale === "vi"
                  ? "Chiến lược tối ưu: Mở khóa Lv.1 (5 Mảnh) cho đủ 6 tướng Đội 1 trước, sau đó dồn Mảnh Độc Quyền Vạn Năng lên Mốc Lv.10 (275 Mảnh) cho tướng Carry chủ lực (như Tidecaller, Adjudicator, Desert Prince) trước khi đầu tư lên Lv.20."
                  : "Optimal Strategy: Unlock Lv.1 (5 Shards) for all 6 Queue 1 heroes first, then push your main Carry (e.g., Tidecaller, Adjudicator, Desert Prince) to the Lv.10 sweet-spot (275 Shards) before investing toward Lv.20."}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

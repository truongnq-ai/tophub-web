"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { GameAssetFrame } from "@/components/guides/media/game-asset-frame";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  RotateCcw,
  Sparkles,
  Star,
  Swords,
  X,
} from "lucide-react";
import {
  EXCLUSIVE_SKILL_MILESTONES,
  EXCLUSIVE_WEAPON_HERO_CATALOG,
  MAX_EXCLUSIVE_STAR_STEP,
  MAX_EXCLUSIVE_WEAPON_LEVEL,
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
import {
  formatCompactNumber,
  formatExactNumber,
  parseCompactNumberInput,
} from "@/lib/number-format";
import { cn } from "@/lib/utils";
import { CalculatorInfoPopover } from "./calculator-info-popover";
import { CALC_MD3, CalculatorToolHeader } from "./calculator-md3-primitives";
import { ExclusiveWeaponStepSelector } from "./exclusive-weapon-step-selector";

export interface ExclusiveWeaponCalculatorProps {
  readonly zone?: CalculatorZone;
  readonly category?: CalculatorCategory;
  readonly tool: CalculatorToolItem;
  readonly locale?: CalculatorLocale;
}

const FACTION_OPTIONS: readonly {
  readonly id: ExclusiveWeaponFaction;
  readonly label: Record<CalculatorLocale, string>;
  readonly desc: Record<CalculatorLocale, string>;
}[] = [
  {
    id: "league",
    label: { vi: "Liên Minh (League)", en: "League" },
    desc: {
      vi: "Adjudicator, Paragon, Rose Princess, Bishop...",
      en: "Adjudicator, Paragon, Rose Princess, Bishop...",
    },
  },
  {
    id: "horde",
    label: { vi: "Bộ Tộc (Horde)", en: "Horde" },
    desc: {
      vi: "Thuật Sĩ, Hoàng Tử Sa Mạc, Thần Nữ Bão Tố, Phù Thủy...",
      en: "Warlock, Desert Prince, Storm Maiden, Witch...",
    },
  },
  {
    id: "nature",
    label: { vi: "Thiên Nhiên (Nature)", en: "Nature" },
    desc: {
      vi: "Tidecaller, Monk, Pixie, Forest Maiden...",
      en: "Tidecaller, Monk, Pixie, Forest Maiden...",
    },
  },
];

const AVATAR_STAR_INDICES: readonly (1 | 2 | 3 | 4 | 5)[] = [1, 2, 3, 4, 5];

export function ExclusiveWeaponCalculator({
  tool,
  locale = "vi",
}: ExclusiveWeaponCalculatorProps): React.JSX.Element {
  const isVi = locale === "vi";

  const [activeFaction, setActiveFaction] =
    useState<ExclusiveWeaponFaction>("league");
  const [selectedHeroId, setSelectedHeroId] = useState<string>("adjudicator");
  const coreProfile: ExclusiveCoreProfile = "raw_subtier_2385";

  const [fromLevel, setFromLevel] = useState<number>(0);
  const [toLevel, setToLevel] = useState<number>(MAX_EXCLUSIVE_WEAPON_LEVEL);
  const [fromStarStep, setFromStarStep] = useState<number>(0);
  const [toStarStep, setToStarStep] = useState<number>(MAX_EXCLUSIVE_STAR_STEP);

  const [ownedShardsInput, setOwnedShardsInput] = useState<string>("0");
  const [ownedCoresInput, setOwnedCoresInput] = useState<string>("0");

  const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!isPickerOpen) return;

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        setIsPickerOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPickerOpen]);

  const ownedShards = useMemo(
    () => parseCompactNumberInput(ownedShardsInput),
    [ownedShardsInput]
  );
  const ownedCores = useMemo(
    () => parseCompactNumberInput(ownedCoresInput),
    [ownedCoresInput]
  );

  const result = useMemo(
    () =>
      calculateExclusiveWeapon({
        fromLevel,
        toLevel,
        fromStarStep,
        toStarStep,
        heroCount: 1,
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
      coreProfile,
      selectedHeroId,
      ownedShards,
      ownedCores,
    ]
  );

  const handleTogglePicker = (): void => {
    setIsPickerOpen((prev) => !prev);
  };

  const handleChooseHero = (heroId: string): void => {
    const found = EXCLUSIVE_WEAPON_HERO_CATALOG.find(
      (h) => h.heroId === heroId
    );
    if (found) {
      setActiveFaction(found.faction);
      setSelectedHeroId(found.heroId);
    }
    setIsPickerOpen(false);
  };

  const handleReset = (): void => {
    setActiveFaction("league");
    setSelectedHeroId("adjudicator");
    setFromLevel(0);
    setToLevel(MAX_EXCLUSIVE_WEAPON_LEVEL);
    setFromStarStep(0);
    setToStarStep(MAX_EXCLUSIVE_STAR_STEP);
    setOwnedShardsInput("0");
    setOwnedCoresInput("0");
    setIsPickerOpen(false);
  };

  const shardName = isVi
    ? result.shardMaterial.nameVi
    : result.shardMaterial.nameEn;
  const coreName = isVi
    ? result.coreMaterial.nameVi
    : result.coreMaterial.nameEn;

  const isPeakAscended =
    result.toLevelNode.level === MAX_EXCLUSIVE_WEAPON_LEVEL ||
    result.toStarNode.stepIndex === MAX_EXCLUSIVE_STAR_STEP;

  const highestUnlockedMilestone =
    result.activeSkillMilestones.length > 0
      ? result.activeSkillMilestones[result.activeSkillMilestones.length - 1]
      : null;

  const activeFactionLabel =
    FACTION_OPTIONS.find((f) => f.id === result.selectedHero.faction)?.label[
      locale
    ] ?? result.selectedHero.faction;

  const isShardsSufficient =
    result.ownedShards >= result.requiredShards && result.requiredShards > 0;
  const isCoresSufficient =
    result.ownedCores >= result.requiredCores && result.requiredCores > 0;

  return (
    <div data-testid="exclusive-weapon-calculator" className="space-y-4">
      {/* 1. Flat MD3 Tool Header + Shared <CalculatorInfoPopover /> + Reset */}
      <CalculatorToolHeader
        code={tool.code}
        title={tool.title[locale].replace(`${tool.code} `, "")}
        actions={
          <>
            <CalculatorInfoPopover
              locale={locale}
              triggerTestId="ew-info-trigger"
              dialogTestId="ew-info-dialog"
              title={
                isVi
                  ? "Hướng Dẫn Trang Bị Độc Quyền & Bảng Tra Cứu SSoT"
                  : "Exclusive Gear Guide & SSoT Reference Tables"
              }
              subtitle={
                isVi
                  ? "Cơ chế Cấp Thần Khí (Lv.0–20 • 1,185 Mảnh), 5 Mốc Kỹ Năng & Đột Phá Sao (0★–5★ • 2,385 Lõi Sắt Thiên Thạch)"
                  : "Gear Level (Lv.0–20 • 1,185 Shards), 5 Skill Milestones & Star Breakthrough (0★–5★ • 2,385 Meteoric Iron Cores)"
              }
            >
              <div className="space-y-5">
                {/* Section 1: Core Mechanics & 2 Reference Profiles */}
                <div className="rounded-2xl bg-amber-500/10 p-4 ring-1 ring-amber-500/30 space-y-2">
                  <h4 className="font-sans text-sm font-bold text-foreground">
                    {isVi
                      ? "1. Cơ Chế Cấp Thần Khí (Lv.0–20) & Đột Phá Sao (0★–5★)"
                      : "1. Gear Level (Lv.0–20) & Star Breakthrough (0★–5★) Mechanics"}
                  </h4>
                  <ul className="space-y-1.5 font-sans text-xs leading-relaxed text-muted-foreground">
                    <li>
                      •{" "}
                      <strong className="text-foreground">
                        {isVi
                          ? "Mảnh Trang Bị Độc Quyền Vạn Năng:"
                          : "Universal Exclusive Gear Shards:"}
                      </strong>{" "}
                      {isVi
                        ? "Dùng để mở khóa (Lv.1 = 5 Mảnh) và nâng cấp Thần Khí từ Lv.0 lên Lv.20 (tổng 1,185 Mảnh/trang bị), mở khóa 5 mốc Đột Phá Kỹ Năng tại Lv.1, Lv.5, Lv.10, Lv.15 và Lv.20."
                        : "Used to unlock (Lv.1 = 5 Shards) and upgrade Exclusive Gear from Lv.0 to Lv.20 (1,185 Shards total), unlocking 5 Signature Skill Milestones at Lv.1, Lv.5, Lv.10, Lv.15, and Lv.20."}
                    </li>
                    <li>
                      •{" "}
                      <strong className="text-foreground">
                        {isVi
                          ? "Lõi Sắt Thiên Thạch (4 Sao Vàng + 1 Sao Đỏ):"
                          : "Meteoric Iron Cores (4 Gold Stars + 1 Red Star):"}
                      </strong>{" "}
                      {isVi
                        ? "Dùng để đột phá 25 tiểu bậc cánh sao từ 0★ lên 5★ Đỏ Thần Thoại. Dữ liệu chuẩn hóa 100% theo game cache với tổng chi phí 2,385 Lõi Sắt Thiên Thạch."
                        : "Used across 25 star petals from 0★ to 5★ Mythic Red. 100% normalized to game cache tables with total cost of 2,385 Meteoric Iron Cores."}
                    </li>
                  </ul>
                </div>

                {/* Section 2: 5 Signature Skill Breakthrough Milestones */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-sans text-sm font-bold text-foreground">
                      {isVi
                        ? "2. Bảng 5 Mốc Đột Phá Kỹ Năng Độc Quyền (Lv.1 / 5 / 10 / 15 / 20)"
                        : "2. 5 Signature Skill Breakthrough Milestones (Lv.1 / 5 / 10 / 15 / 20)"}
                    </h4>
                    <Swords
                      className="h-4 w-4 text-amber-500"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="space-y-2">
                    {EXCLUSIVE_SKILL_MILESTONES.map((milestone) => (
                      <div
                        key={milestone.id}
                        className={cn(
                          CALC_MD3.tonalGroup,
                          "space-y-1",
                          milestone.requiredLevel === 20
                            ? "ring-1 ring-rose-500/40 bg-rose-500/10"
                            : ""
                        )}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-sans text-xs font-bold text-foreground">
                            {milestone.title[locale]}
                          </p>
                          <span className="font-mono text-xs font-bold text-amber-600 tabular-nums dark:text-amber-400">
                            {formatExactNumber(milestone.cumulativeShards)}
                          </span>
                        </div>
                        <p className="font-sans text-xs text-muted-foreground">
                          {milestone.effectSummary[locale]}
                        </p>
                        <p className="font-sans text-xs font-medium text-foreground/85">
                          {milestone.priorityRating[locale]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 3: 5-Star Meteoric Iron Core Breakdown & Optimal ROI Tip */}
                <div className="space-y-2.5">
                  <h4 className="font-sans text-sm font-bold text-foreground">
                    {isVi
                      ? "3. Bảng Phân Bổ Lõi Sắt Thiên Thạch Theo Bậc Sao (1★ ➔ 5★) & Mẹo ROI"
                      : "3. Meteoric Iron Core Breakdown by Star (1★ ➔ 5★) & ROI Strategy"}
                  </h4>
                  <div className="space-y-2">
                    {result.starBreakdown.map((item) => {
                      const isRed = item.starBracket === 5;
                      return (
                        <div
                          key={item.starBracket}
                          className={cn(
                            CALC_MD3.tonalGroup,
                            "flex items-center justify-between gap-2",
                            isRed
                              ? "ring-1 ring-rose-500/40 bg-rose-500/10"
                              : ""
                          )}
                        >
                          <div>
                            <p className="font-sans text-xs font-bold text-foreground">
                              {item.label[locale]}
                            </p>
                            <p className="font-sans text-xs text-muted-foreground">
                              {isVi ? "Tích lũy:" : "Cumulative:"}{" "}
                              <span className="font-mono font-semibold text-foreground tabular-nums">
                                {formatExactNumber(item.cumulativeCoresPerHero)}
                              </span>
                            </p>
                          </div>

                          <div className="text-right">
                            <p className="font-sans text-xs font-semibold text-foreground">
                              <span
                                className={cn(
                                  "font-mono font-bold tabular-nums",
                                  isRed
                                    ? "text-rose-600 dark:text-rose-400"
                                    : "text-amber-600 dark:text-amber-400"
                                )}
                              >
                                +{formatExactNumber(item.coresPerHero)}
                              </span>{" "}
                              <span>{isVi ? "Lõi Sắt" : "Cores"}</span>
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="rounded-xl bg-emerald-500/10 p-3 ring-1 ring-emerald-500/30">
                    <p className="font-sans text-xs leading-relaxed text-emerald-800 dark:text-emerald-200">
                      {isVi
                        ? "Mẹo đầu tư tối ưu (ROI): Mở khóa Lv.1 (5 Mảnh) cho đủ 6 tướng Đội 1 trước, sau đó dồn Mảnh Độc Quyền Vạn Năng lên mốc ngọt Lv.10 (275 Mảnh) cho tướng Hyper-Carry chủ lực (như Tidecaller, Adjudicator, Desert Prince) trước khi đầu tư lên Lv.20."
                        : "Optimal ROI Tip: Unlock Lv.1 (5 Shards) for all 6 Queue 1 heroes first, then push your main Hyper-Carry (e.g., Tidecaller, Adjudicator, Desert Prince) to the Lv.10 sweet-spot (275 Shards) before investing toward Lv.20."}
                    </p>
                  </div>
                </div>
              </div>
            </CalculatorInfoPopover>

            <button
              type="button"
              onClick={handleReset}
              data-testid="reset-exclusive-weapon"
              className={cn(
                CALC_MD3.chipButton,
                "bg-muted/50 font-sans text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <RotateCcw
                className="h-4 w-4 text-amber-500"
                aria-hidden="true"
              />
              <span>{isVi ? "Đặt lại" : "Reset"}</span>
            </button>
          </>
        }
      />

      {/* 2. Top Row — 3 Symmetrical Zones: [Zone 1: Current] | [Zone 2: Central Avatar] | [Zone 3: Target] */}
      <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-12">
        {/* ZONE 1 (Left - 4 cols): Trạng Thái Hiện Tại */}
        <section
          data-testid="ew-zone-current"
          className={cn(
            CALC_MD3.surfaceCard,
            "order-2 flex flex-col justify-between space-y-4 lg:order-1 lg:col-span-4"
          )}
        >
          <div className="flex items-center justify-between gap-2">
            <h2 className={CALC_MD3.sectionTitle}>
              {isVi ? "Trạng Thái Hiện Tại" : "Current State"}
            </h2>
            <span className="rounded-lg bg-muted/60 px-2.5 py-1 font-mono text-xs font-bold text-foreground tabular-nums">
              Lv.{result.fromLevelNode.level} • {result.fromStarNode.starBracket}★
            </span>
          </div>

          <div className="space-y-3.5">
            <ExclusiveWeaponStepSelector
              mode="level"
              label={isVi ? "Cấp Hiện Tại" : "Current Level"}
              value={fromLevel}
              onChange={setFromLevel}
              locale={locale}
              testIdPrefix="ew-from-level"
            />

            <ExclusiveWeaponStepSelector
              mode="star"
              label={isVi ? "Đột Phá Sao Hiện Tại" : "Current Star Breakthrough"}
              value={fromStarStep}
              onChange={setFromStarStep}
              locale={locale}
              testIdPrefix="ew-from-star"
              coreProfile={coreProfile}
            />
          </div>
        </section>

        {/* ZONE 2 (Center - 4 cols): Avatar Vũ Khí Độc Quyền Trung Tâm + Modal */}
        <section
          data-testid="ew-zone-avatar"
          className={cn(
            CALC_MD3.surfaceCard,
            "relative order-1 flex flex-col items-center justify-between gap-3.5 text-center lg:order-2 lg:col-span-4"
          )}
        >
          <div className="flex w-full items-center justify-between gap-2">
            <span className="font-sans text-xs font-bold text-muted-foreground">
              {isVi ? "Trang Bị Đang Chọn" : "Selected Exclusive Gear"}
            </span>
            <span
              className={cn(
                "inline-flex items-center rounded-lg px-2.5 py-0.5 font-sans text-xs font-bold",
                result.selectedHero.rarity === "mythic"
                  ? "bg-rose-500/15 text-rose-700 dark:text-rose-300"
                  : "bg-amber-500/15 text-amber-700 dark:text-amber-300"
              )}
            >
              {activeFactionLabel}
            </span>
          </div>

          {/* Clickable Central Exclusive Weapon Avatar (112x112px / h-28 w-28) */}
          <button
            type="button"
            data-testid="ew-central-avatar-btn"
            onClick={handleTogglePicker}
            aria-expanded={isPickerOpen}
            aria-haspopup="dialog"
            aria-label={
              isVi
                ? "Bấm để chọn Phe và Trang Bị Độc Quyền"
                : "Click to select Faction and Exclusive Gear"
            }
            className="group flex w-full flex-col items-center justify-center rounded-2xl p-2 transition-transform hover:scale-[1.01] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40"
          >
            <div
              data-testid="ew-central-avatar-frame"
              className="relative inline-flex items-center justify-center"
            >
              <GameAssetFrame
                src={result.selectedHero.weaponIconPath}
                alt={result.selectedHero.weaponName[locale]}
                rarity={isPeakAscended ? "mythic" : result.selectedHero.rarity}
                faction={result.selectedHero.faction}
                size="xl"
                shape="item"
              />

              {/* Bottom-left Target Level Badge */}
              <span
                className={cn(
                  "absolute -bottom-2 -left-2 z-20 inline-flex items-center rounded-full px-2.5 py-0.5 font-mono text-xs font-black text-white shadow tabular-nums",
                  isPeakAscended ? "bg-rose-600" : "bg-amber-600"
                )}
              >
                +Lv.{result.toLevelNode.level}
              </span>
            </div>

            {/* 5 Small Stars (4 Gold + 1 Red) reflecting Target Star Bracket */}
            <div
              className="mt-3 flex items-center justify-center gap-1"
              aria-hidden="true"
            >
              {AVATAR_STAR_INDICES.map((starNum) => {
                const isRed = starNum === 5;
                const isFilled = result.toStarNode.starBracket >= starNum;
                return (
                  <Star
                    key={starNum}
                    className={cn(
                      "h-4 w-4 transition-transform",
                      isFilled
                        ? isRed
                          ? "text-rose-500 fill-rose-500 scale-110"
                          : "text-amber-400 fill-amber-400"
                        : isRed
                          ? "text-rose-500/35"
                          : "text-muted-foreground/35"
                    )}
                  />
                );
              })}
            </div>

            <p className="mt-2 font-heading text-base font-black text-foreground group-hover:text-amber-600 dark:group-hover:text-amber-400">
              {result.selectedHero.weaponName[locale]}
            </p>
            <p className="font-sans text-xs font-bold text-amber-700 dark:text-amber-300">
              {result.selectedHero.heroName[locale]}
            </p>
            <p className="mt-1 line-clamp-2 max-w-xs font-sans text-xs leading-relaxed text-muted-foreground">
              {result.selectedHero.signatureHighlight[locale]}
            </p>

            <span
              data-testid="ew-change-gear-trigger"
              className="mt-2 inline-flex min-h-[44px] items-center gap-1.5 rounded-xl bg-amber-500/15 px-3.5 py-1.5 font-sans text-xs font-bold text-amber-700 hover:bg-amber-500/25 dark:text-amber-300 transition-colors"
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              <span>
                {isVi ? "Đổi trang bị độc quyền" : "Change Exclusive Gear"}
              </span>
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </button>

          {/* SSoT Game Cache Meteoric Iron Core Badge (100% Game Cache Standard) */}
          <div className={cn(CALC_MD3.tonalGroup, "w-full space-y-1.5 text-left")}>
            <div className="flex items-center justify-between gap-2">
              <span className="font-sans text-xs font-bold text-foreground">
                {isVi
                  ? "Lõi Sắt Thiên Thạch (Chuẩn Game Cache):"
                  : "Meteoric Iron Cores (Game Cache):"}
              </span>
              <span
                data-testid="core-profile-badge"
                className="font-mono text-xs font-bold text-amber-600 tabular-nums dark:text-amber-400"
              >
                2,385
              </span>
            </div>
            <p className="font-sans text-xs text-muted-foreground leading-normal">
              {isVi
                ? "Chuẩn hóa 100% theo Game Cache (25 tiểu bậc: 0★ ➔ 5★ Thần Thoại)."
                : "100% normalized to Game Cache tables (25 sub-tiers: 0★ ➔ 5★ Mythic)."}
            </p>
          </div>

          {/* 1-Step 3-Column Centered Modal Dialog (Liên Minh | Bộ Tộc | Thiên Nhiên) */}
          {isPickerOpen ? (
            <div
              data-testid="ew-avatar-picker-backdrop"
              data-md3-overlay="true"
              onClick={() => setIsPickerOpen(false)}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-3 sm:p-4 backdrop-blur-sm animate-in fade-in duration-150"
            >
              <div
                role="dialog"
                aria-modal="true"
                aria-label={
                  isVi
                    ? "Đổi trang bị độc quyền"
                    : "Select Exclusive Gear"
                }
                data-testid="ew-avatar-picker-popover"
                data-md3-overlay="true"
                onClick={(e) => e.stopPropagation()}
                className={cn(
                  CALC_MD3.overlayCard,
                  "flex max-h-[88vh] w-full max-w-5xl flex-col overflow-hidden text-left shadow-2xl p-4 sm:p-5"
                )}
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between border-b border-border/60 pb-3">
                  <div>
                    <h3 className="font-heading text-base sm:text-lg font-bold text-foreground">
                      {isVi ? "Đổi Trang Bị Độc Quyền" : "Select Exclusive Gear"}
                    </h3>
                    <p className="font-sans text-xs text-muted-foreground mt-0.5">
                      {isVi
                        ? "Danh mục 35 trang bị anh hùng phân chia theo 3 phe phái chính"
                        : "35 hero exclusive gears organized across 3 main factions"}
                    </p>
                  </div>

                  <button
                    type="button"
                    data-testid="ew-picker-close-btn"
                    aria-label={isVi ? "Đóng bộ chọn" : "Close picker"}
                    onClick={() => setIsPickerOpen(false)}
                    className={cn(
                      CALC_MD3.iconButton,
                      "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>

                {/* 3 Columns: Liên Minh | Bộ Tộc | Thiên Nhiên */}
                <div className="mt-3.5 grid flex-1 grid-cols-1 md:grid-cols-3 gap-3 overflow-y-auto pr-1">
                  {FACTION_OPTIONS.map((fac) => {
                    const heroes = EXCLUSIVE_WEAPON_HERO_CATALOG.filter(
                      (h) => h.faction === fac.id
                    );

                    return (
                      <div
                        key={fac.id}
                        data-testid={`ew-column-${fac.id}`}
                        className={cn(
                          CALC_MD3.tonalGroup,
                          "flex flex-col gap-2 p-3 rounded-2xl"
                        )}
                      >
                        {/* Column Header */}
                        <div className="flex items-center justify-between border-b border-border/40 pb-2">
                          <h4 className="font-heading text-sm font-bold text-foreground">
                            {fac.label[locale]}
                          </h4>
                          <span className="rounded-lg bg-background/80 px-2 py-0.5 font-mono text-xs font-bold text-amber-600 tabular-nums dark:text-amber-400">
                            {heroes.length}
                          </span>
                        </div>

                        {/* List of Heroes in Faction */}
                        <div className="space-y-1.5 overflow-y-auto max-h-[58vh] pr-0.5">
                          {heroes.map((hero) => {
                            const isSelected =
                              result.selectedHero.heroId === hero.heroId;

                            return (
                              <button
                                key={hero.heroId}
                                type="button"
                                data-testid={`ew-hero-${hero.heroId}`}
                                onClick={() => handleChooseHero(hero.heroId)}
                                className={cn(
                                  CALC_MD3.tonalTile,
                                  "flex min-h-[50px] w-full items-center gap-2.5 p-2 text-left cursor-pointer transition-colors",
                                  isSelected && CALC_MD3.tileSelected
                                )}
                              >
                                <GameAssetFrame
                                  src={hero.weaponIconPath}
                                  alt={hero.weaponName[locale]}
                                  rarity={hero.rarity}
                                  faction={hero.faction}
                                  size="sm"
                                  shape="item"
                                />

                                <div className="min-w-0 flex-1">
                                  <p className="truncate font-sans text-xs font-bold text-foreground">
                                    {hero.weaponName[locale]}
                                  </p>
                                  <p className="truncate font-sans text-xs text-muted-foreground">
                                    {hero.heroName[locale]}
                                  </p>
                                </div>

                                {isSelected ? (
                                  <span className="shrink-0 rounded-md bg-amber-500/20 px-1.5 py-0.5 font-sans text-xs font-bold text-amber-700 dark:text-amber-300">
                                    {isVi ? "Đang chọn" : "Active"}
                                  </span>
                                ) : (
                                  <span
                                    className={cn(
                                      "shrink-0 rounded-md px-1.5 py-0.5 font-sans text-xs font-bold",
                                      hero.rarity === "mythic"
                                        ? "bg-rose-500/15 text-rose-700 dark:text-rose-300"
                                        : "bg-amber-500/15 text-amber-700 dark:text-amber-300"
                                    )}
                                  >
                                    {hero.rarity === "mythic" ? "Mythic" : "Legendary"}
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : null}
        </section>

        {/* ZONE 3 (Right - 4 cols): Trạng Thái Mục Tiêu */}
        <section
          data-testid="ew-zone-target"
          className={cn(
            CALC_MD3.surfaceCard,
            "order-3 flex flex-col justify-between space-y-4 lg:col-span-4"
          )}
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className={CALC_MD3.sectionTitle}>
              {isVi ? "Trạng Thái Mục Tiêu" : "Target State"}
            </h2>
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-lg px-2.5 py-1 font-sans text-xs font-bold",
                highestUnlockedMilestone
                  ? isPeakAscended
                    ? "bg-rose-500/15 text-rose-700 dark:text-rose-300"
                    : "bg-amber-500/15 text-amber-700 dark:text-amber-300"
                  : "bg-muted/60 text-muted-foreground"
              )}
            >
              <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>
                {highestUnlockedMilestone
                  ? isVi
                    ? `Mở khóa Kỹ năng Lv.${highestUnlockedMilestone.requiredLevel}`
                    : `Skill Lv.${highestUnlockedMilestone.requiredLevel} Unlocked`
                  : isVi
                    ? "Chưa mở khóa Kỹ năng"
                    : "Skill Locked"}
              </span>
            </span>
          </div>

          <div className="space-y-3.5">
            <ExclusiveWeaponStepSelector
              mode="level"
              label={isVi ? "Cấp Mục Tiêu" : "Target Level"}
              value={toLevel}
              onChange={setToLevel}
              locale={locale}
              testIdPrefix="ew-to-level"
            />

            <ExclusiveWeaponStepSelector
              mode="star"
              label={isVi ? "Đột Phá Sao Mục Tiêu" : "Target Star Breakthrough"}
              value={toStarStep}
              onChange={setToStarStep}
              locale={locale}
              testIdPrefix="ew-to-star"
              coreProfile={coreProfile}
            />
          </div>

          {/* Invalid Range Warnings */}
          {result.isInvalidLevelRange ? (
            <div
              role="alert"
              data-testid="ew-invalid-level-warning"
              className="flex items-start gap-2.5 rounded-xl bg-amber-500/15 p-3 text-amber-800 dark:text-amber-200"
            >
              <AlertTriangle
                className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400"
                aria-hidden="true"
              />
              <p className="font-sans text-xs leading-relaxed">
                {isVi
                  ? "Cấp mục tiêu đang thấp hơn cấp hiện tại. Số lượng Mảnh Độc Quyền yêu cầu được đặt về 0."
                  : "Target level is lower than current level. Required Exclusive Shards are set to 0."}
              </p>
            </div>
          ) : null}

          {result.isInvalidStarRange ? (
            <div
              role="alert"
              data-testid="ew-invalid-star-warning"
              className="flex items-start gap-2.5 rounded-xl bg-amber-500/15 p-3 text-amber-800 dark:text-amber-200"
            >
              <AlertTriangle
                className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400"
                aria-hidden="true"
              />
              <p className="font-sans text-xs leading-relaxed">
                {isVi
                  ? "Bậc Sao mục tiêu đang thấp hơn Bậc Sao hiện tại. Số lượng Lõi Sắt yêu cầu được đặt về 0."
                  : "Target Star step is lower than current Star step. Required Meteoric Iron Cores are set to 0."}
              </p>
            </div>
          ) : null}
        </section>
      </div>

      {/* 3. Bottom Row — ZONE 4: Unified Resources Section (2 Vertical Cards × 3 Horizontal Columns) */}
      <section
        data-testid="exclusive-weapon-kpi-card"
        className={cn(CALC_MD3.surfaceCard, "space-y-4")}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className={CALC_MD3.sectionTitle}>
              {isVi ? "Tài Nguyên" : "Resources"}
            </h2>
            <p className="mt-0.5 font-sans text-xs text-muted-foreground">
              {isVi
                ? "Nhập số lượng đang có (hỗ trợ gõ tắt 500, 1k, 1.5k) để tự động tính số lượng còn thiếu hoặc dư"
                : "Enter owned amounts (supports 500, 1k, 1.5k shorthand) to automatically compute missing or surplus materials"}
            </p>
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-3 py-1 font-sans text-xs font-semibold text-amber-800 dark:text-amber-300">
            <CheckCircle2
              className="h-4 w-4 text-amber-500"
              aria-hidden="true"
            />
            <span className="font-mono font-bold tabular-nums">
              Lv.{result.fromLevelNode.level} ➔ Lv.{result.toLevelNode.level}
            </span>
            <span>•</span>
            <span className="font-sans font-bold">
              {result.fromStarNode.shortLabel[locale]} ➔{" "}
              {result.toStarNode.shortLabel[locale]}
            </span>
          </span>
        </div>

        <div className="space-y-3">
          {/* Card 1: Universal Exclusive Gear Shard */}
          <div
            data-testid="ew-resource-card-shards"
            className={cn(CALC_MD3.tonalGroup, "space-y-3")}
          >
            {/* Card Header */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <GameAssetFrame
                  src={result.shardMaterial.iconPath}
                  alt={shardName}
                  rarity={result.shardMaterial.rarity}
                  size="md"
                  shape="item"
                />
                <div className="min-w-0">
                  <h3 className="truncate font-heading text-sm sm:text-base font-bold text-foreground">
                    {shardName}
                  </h3>
                  <p className="font-sans text-xs text-muted-foreground">
                    {isVi ? "Hành trình cấp độ:" : "Level progression:"}{" "}
                    <span className="font-mono font-semibold text-foreground tabular-nums">
                      Lv.{result.fromLevelNode.level} ➔ Lv.
                      {result.toLevelNode.level}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-sans text-xs text-muted-foreground">
                  {isVi ? "Tiến độ:" : "Progress:"}
                </span>
                <span className="font-mono text-xs font-bold text-foreground tabular-nums">
                  {result.shardCompletionPercent}%
                </span>
              </div>
            </div>

            <div className="h-1.5 w-full overflow-hidden rounded-full bg-background/80">
              <div
                className={cn(
                  "h-full rounded-full transition-all",
                  isShardsSufficient ? "bg-emerald-500" : "bg-amber-500"
                )}
                style={{ width: `${result.shardCompletionPercent}%` }}
              />
            </div>

            {/* Card Body: 3 Horizontal Columns */}
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
              {/* Column 1: Required */}
              <div className="flex flex-col justify-center rounded-xl bg-background/80 px-3 py-2.5">
                <span className="font-sans text-xs font-medium text-muted-foreground">
                  {isVi ? "Số lượng yêu cầu" : "Required"}
                </span>
                <span
                  data-testid="ew-total-shards"
                  title={formatExactNumber(result.requiredShards)}
                  className="mt-0.5 font-mono text-xl font-black text-amber-600 tabular-nums dark:text-amber-400"
                >
                  {formatCompactNumber(result.requiredShards)}
                </span>
                <span className="font-mono text-xs text-muted-foreground tabular-nums">
                  {formatExactNumber(result.requiredShards)}
                </span>
              </div>

              {/* Column 2: Owned Input */}
              <div className="flex flex-col justify-center rounded-xl bg-background/80 px-3 py-2.5">
                <div className="flex items-center justify-between gap-2">
                  <label
                    htmlFor="owned-ew-shards"
                    className="font-sans text-xs font-medium text-muted-foreground"
                  >
                    {isVi ? "Số lượng đang có" : "Owned"}
                  </label>
                  {result.ownedShards > 0 ? (
                    <span className="font-mono text-xs font-semibold text-amber-600 tabular-nums dark:text-amber-400">
                      = {formatExactNumber(result.ownedShards)}
                    </span>
                  ) : null}
                </div>
                <input
                  id="owned-ew-shards"
                  data-testid="owned-ew-shards-input"
                  type="text"
                  inputMode="decimal"
                  placeholder={isVi ? "VD: 500, 1k, 1.5k" : "e.g. 500, 1k, 1.5k"}
                  value={ownedShardsInput}
                  onChange={(e) => setOwnedShardsInput(e.target.value)}
                  className={cn(
                    CALC_MD3.dataInput,
                    "mt-1 w-full bg-muted/50 px-3 text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                  )}
                />
              </div>

              {/* Column 3: Missing / Sufficient */}
              <div
                className={cn(
                  "flex flex-col justify-center rounded-xl px-3 py-2.5",
                  isShardsSufficient
                    ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                    : "bg-amber-500/10 text-amber-800 dark:text-amber-300"
                )}
              >
                <span className="font-sans text-xs font-medium">
                  {isVi ? "Số lượng còn thiếu" : "Missing"}
                </span>
                <div
                  data-testid="ew-missing-shards"
                  title={formatExactNumber(
                    isShardsSufficient
                      ? result.surplusShards
                      : result.missingShards
                  )}
                  className="mt-0.5"
                >
                  {isShardsSufficient ? (
                    <span className="font-sans text-sm font-bold">
                      {isVi
                        ? `Đủ nguyên liệu (+Dư ${formatCompactNumber(result.surplusShards)})`
                        : `Sufficient (+Surplus ${formatCompactNumber(result.surplusShards)})`}
                    </span>
                  ) : (
                    <span className="font-mono text-xl font-black tabular-nums">
                      {formatCompactNumber(result.missingShards)}
                    </span>
                  )}
                </div>
                {!isShardsSufficient && result.missingShards >= 1_000 ? (
                  <span className="font-mono text-xs opacity-80 tabular-nums">
                    {formatExactNumber(result.missingShards)}
                  </span>
                ) : null}
              </div>
            </div>
          </div>

          {/* Card 2: Meteoric Iron Core */}
          <div
            data-testid="ew-resource-card-cores"
            className={cn(CALC_MD3.tonalGroup, "space-y-3")}
          >
            {/* Card Header */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <GameAssetFrame
                  src={result.coreMaterial.iconPath}
                  alt={coreName}
                  rarity={result.coreMaterial.rarity}
                  size="md"
                  shape="item"
                />
                <div className="min-w-0">
                  <h3 className="truncate font-heading text-sm sm:text-base font-bold text-foreground">
                    {coreName}
                  </h3>
                  <p className="font-sans text-xs text-muted-foreground">
                    {isVi ? "Hành trình đột phá sao:" : "Star progression:"}{" "}
                    <span className="font-sans font-semibold text-foreground">
                      {result.fromStarNode.shortLabel[locale]} ➔{" "}
                      {result.toStarNode.shortLabel[locale]}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-sans text-xs text-muted-foreground">
                  {isVi ? "Tiến độ:" : "Progress:"}
                </span>
                <span className="font-mono text-xs font-bold text-foreground tabular-nums">
                  {result.coreCompletionPercent}%
                </span>
              </div>
            </div>

            <div className="h-1.5 w-full overflow-hidden rounded-full bg-background/80">
              <div
                className={cn(
                  "h-full rounded-full transition-all",
                  isCoresSufficient ? "bg-emerald-500" : "bg-amber-500"
                )}
                style={{ width: `${result.coreCompletionPercent}%` }}
              />
            </div>

            {/* Card Body: 3 Horizontal Columns */}
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
              {/* Column 1: Required */}
              <div className="flex flex-col justify-center rounded-xl bg-background/80 px-3 py-2.5">
                <span className="font-sans text-xs font-medium text-muted-foreground">
                  {isVi ? "Số lượng yêu cầu" : "Required"}
                </span>
                <span
                  data-testid="ew-total-cores"
                  title={formatExactNumber(result.requiredCores)}
                  className="mt-0.5 font-mono text-xl font-black text-amber-600 tabular-nums dark:text-amber-400"
                >
                  {formatCompactNumber(result.requiredCores)}
                </span>
                <span className="font-mono text-xs text-muted-foreground tabular-nums">
                  {formatExactNumber(result.requiredCores)}
                </span>
              </div>

              {/* Column 2: Owned Input */}
              <div className="flex flex-col justify-center rounded-xl bg-background/80 px-3 py-2.5">
                <div className="flex items-center justify-between gap-2">
                  <label
                    htmlFor="owned-ew-cores"
                    className="font-sans text-xs font-medium text-muted-foreground"
                  >
                    {isVi ? "Số lượng đang có" : "Owned"}
                  </label>
                  {result.ownedCores > 0 ? (
                    <span className="font-mono text-xs font-semibold text-amber-600 tabular-nums dark:text-amber-400">
                      = {formatExactNumber(result.ownedCores)}
                    </span>
                  ) : null}
                </div>
                <input
                  id="owned-ew-cores"
                  data-testid="owned-ew-cores-input"
                  type="text"
                  inputMode="decimal"
                  placeholder={isVi ? "VD: 500, 1k, 2.385k" : "e.g. 500, 1k, 2.385k"}
                  value={ownedCoresInput}
                  onChange={(e) => setOwnedCoresInput(e.target.value)}
                  className={cn(
                    CALC_MD3.dataInput,
                    "mt-1 w-full bg-muted/50 px-3 text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                  )}
                />
              </div>

              {/* Column 3: Missing / Sufficient */}
              <div
                className={cn(
                  "flex flex-col justify-center rounded-xl px-3 py-2.5",
                  isCoresSufficient
                    ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                    : "bg-amber-500/10 text-amber-800 dark:text-amber-300"
                )}
              >
                <span className="font-sans text-xs font-medium">
                  {isVi ? "Số lượng còn thiếu" : "Missing"}
                </span>
                <div
                  data-testid="ew-missing-cores"
                  title={formatExactNumber(
                    isCoresSufficient
                      ? result.surplusCores
                      : result.missingCores
                  )}
                  className="mt-0.5"
                >
                  {isCoresSufficient ? (
                    <span className="font-sans text-sm font-bold">
                      {isVi
                        ? `Đủ nguyên liệu (+Dư ${formatCompactNumber(result.surplusCores)})`
                        : `Sufficient (+Surplus ${formatCompactNumber(result.surplusCores)})`}
                    </span>
                  ) : (
                    <span className="font-mono text-xl font-black tabular-nums">
                      {formatCompactNumber(result.missingCores)}
                    </span>
                  )}
                </div>
                {!isCoresSufficient && result.missingCores >= 1_000 ? (
                  <span className="font-mono text-xs opacity-80 tabular-nums">
                    {formatExactNumber(result.missingCores)}
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

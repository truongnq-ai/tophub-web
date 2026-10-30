"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  RotateCcw,
  ShieldAlert,
  Sparkles,
  Star,
  Swords,
  X,
} from "lucide-react";
import {
  RELIC_EVENT_SCORING,
  RELIC_FACTION_SETS,
  RELIC_RARITY_TABLES,
  calculateSingleRelicUpgrade,
  getInvestedRelicShardsAtState,
  getRelicPassiveStatsAtStar,
  type RelicFactionId,
  type RelicFactionSlotTemplate,
  type RelicRarity,
  type RelicSlotRole,
  type RelicStarLevel,
  type RelicSubStep,
  type RelicTierIndex,
} from "@/content/calculators/relics-data";
import { CALCULATOR_MATERIALS } from "@/content/calculators/registry";
import type {
  CalculatorCategory,
  CalculatorLocale,
  CalculatorMaterialRef,
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
import {
  CALC_MD3,
  CalculatorStepperButton,
  CalculatorToolHeader,
} from "./calculator-md3-primitives";

export interface RelicsCalculatorProps {
  readonly zone?: CalculatorZone;
  readonly category: CalculatorCategory;
  readonly tool: CalculatorToolItem;
  readonly locale: CalculatorLocale;
}

export type RelicPickerGroupId =
  | "legendary_league"
  | "legendary_horde"
  | "legendary_nature"
  | "epic_standard"
  | "rare_standard";

type AvatarPickerStep = "group" | "relic";

interface RelicPickerGroupProfile {
  readonly id: RelicPickerGroupId;
  readonly rarity: RelicRarity;
  readonly factionId?: RelicFactionId;
  readonly title: Readonly<Record<CalculatorLocale, string>>;
  readonly subtitle: Readonly<Record<CalculatorLocale, string>>;
  readonly badge: Readonly<Record<CalculatorLocale, string>>;
  readonly slots: readonly [
    RelicFactionSlotTemplate,
    RelicFactionSlotTemplate,
    RelicFactionSlotTemplate,
  ];
}

const EPIC_STANDARD_SLOTS: readonly [
  RelicFactionSlotTemplate,
  RelicFactionSlotTemplate,
  RelicFactionSlotTemplate,
] = [
  {
    slotRole: "offense",
    slotLabel: { vi: "Ô 1 — Công / Khống Chế", en: "Slot 1 — Offense / CC" },
    bisRelicName: {
      vi: "Vương Miện Băng Giá (Frost Diadem)",
      en: "Frost Diadem",
    },
    f2pAlternative: {
      vi: "Lưỡi Hái Truy Sát (Persecution)",
      en: "Persecution",
    },
    mechanicTag: {
      vi: "Làm Chậm & Sát Thương Diện Rộng",
      en: "AoE Frost Slow & DMG",
    },
    tacticalSummary: {
      vi: "Gây sát thương băng diện rộng và làm chậm tốc đánh hàng trước của địch.",
      en: "Deals AoE frost damage and slows enemy frontline attack speed.",
    },
  },
  {
    slotRole: "defense",
    slotLabel: {
      vi: "Ô 2 — Thủ / Sinh Tồn",
      en: "Slot 2 — Defense / Sustain",
    },
    bisRelicName: {
      vi: "Khiên Thánh Quang (Holy Shield)",
      en: "Holy Shield",
    },
    f2pAlternative: {
      vi: "Tù Và Chiến Tranh (War Horn)",
      en: "War Horn",
    },
    mechanicTag: {
      vi: "Lá Chắn & Tăng Phòng Thủ",
      en: "Barrier & DEF Boost",
    },
    tacticalSummary: {
      vi: "Tạo lớp giáp chắn tạm thời và giảm sát thương nhận vào cho đội hình.",
      en: "Grants a temporary barrier and reduces incoming damage for the squad.",
    },
  },
  {
    slotRole: "support",
    slotLabel: {
      vi: "Ô 3 — Hỗ Trợ / Hồi Phục",
      en: "Slot 3 — Support / Heal",
    },
    bisRelicName: {
      vi: "Đá Ánh Trăng (Moonstone)",
      en: "Moonstone",
    },
    f2pAlternative: {
      vi: "Cốc Thánh (Holy Chalice)",
      en: "Holy Chalice",
    },
    mechanicTag: {
      vi: "Hồi Máu Diện Rộng Toàn Đội",
      en: "Team-Wide AoE Healing",
    },
    tacticalSummary: {
      vi: "Bí Bảo Tím quốc dân giúp hồi phục lượng lớn HP cho toàn đội trong giao tranh dài.",
      en: "Top-tier F2P Epic Relic restoring substantial AoE HP across extended fights.",
    },
  },
];

const RARE_STANDARD_SLOTS: readonly [
  RelicFactionSlotTemplate,
  RelicFactionSlotTemplate,
  RelicFactionSlotTemplate,
] = [
  {
    slotRole: "offense",
    slotLabel: { vi: "Ô 1 — Công Cơ Bản", en: "Slot 1 — Basic Offense" },
    bisRelicName: {
      vi: "Nhẫn Ấn Công Tước (Duke's Signet Ring)",
      en: "Duke's Signet Ring",
    },
    f2pAlternative: {
      vi: "Kiếm Gãy Cổ Đại (Ancient Broken Sword)",
      en: "Ancient Broken Sword",
    },
    mechanicTag: {
      vi: "Sát Thương Mục Tiêu Đơn",
      en: "Single-Target Strike",
    },
    tacticalSummary: {
      vi: "Gây sát thương cơ bản đầu trận và cộng chỉ số sở hữu % ATK / % HP khi nâng sao.",
      en: "Deals basic early-game strike damage and grants passive % ATK / % HP.",
    },
  },
  {
    slotRole: "defense",
    slotLabel: { vi: "Ô 2 — Thủ Cơ Bản", en: "Slot 2 — Basic Defense" },
    bisRelicName: {
      vi: "Khiên Cổ Ngữ (Rune Shield)",
      en: "Rune Shield",
    },
    f2pAlternative: {
      vi: "Giáp Hộ Vệ (Guardian Plate)",
      en: "Guardian Plate",
    },
    mechanicTag: {
      vi: "Tăng Giáp Hàng Trước",
      en: "Frontline Armor Guard",
    },
    tacticalSummary: {
      vi: "Tăng chỉ số phòng thủ cơ bản cho hàng chắn và tích lũy điểm sự kiện GAR/KvK.",
      en: "Boosts frontline defense stats and provides easy GAR/KvK event points.",
    },
  },
  {
    slotRole: "support",
    slotLabel: { vi: "Ô 3 — Hỗ Trợ Cơ Bản", en: "Slot 3 — Basic Support" },
    bisRelicName: {
      vi: "Tù Và Chiến Tranh (War Horn)",
      en: "War Horn",
    },
    f2pAlternative: {
      vi: "Bùa Hộ Mệnh (Amulet of Grace)",
      en: "Amulet of Grace",
    },
    mechanicTag: {
      vi: "Tăng Tốc Đánh Ngắn Hạn",
      en: "Short ATK Speed Buff",
    },
    tacticalSummary: {
      vi: "Tăng nhẹ tốc độ đánh toàn đội và mở khóa chỉ số sở hữu thụ động trong kho.",
      en: "Slightly increases team attack speed and unlocks passive collection stats.",
    },
  },
];

const RELIC_PICKER_GROUPS: readonly RelicPickerGroupProfile[] = [
  {
    id: "legendary_league",
    rarity: "legendary",
    factionId: "league",
    title: {
      vi: "Bí Bảo Cam • Liên Minh (Kho Tàng Bí Thuật)",
      en: "Legendary • League (Arcane Vault)",
    },
    subtitle: {
      vi: "Trượng Hóa Đá • Quả Cầu Hộ Hồn • Lông Vũ Khế Ước (Max 1,800 Mảnh)",
      en: "Petrification Staff • Soul Guard Orb • Feather of the Pact (Max 1,800 Shards)",
    },
    badge: { vi: "Cam • Liên Minh", en: "Legendary • League" },
    slots: RELIC_FACTION_SETS[0].slots,
  },
  {
    id: "legendary_horde",
    rarity: "legendary",
    factionId: "horde",
    title: {
      vi: "Bí Bảo Cam • Bộ Tộc (Long Uy)",
      en: "Legendary • Horde (Dragon's Might)",
    },
    subtitle: {
      vi: "Phán Quyết Sấm Sét • Trái Tim Rồng • Bùa Xương Rồng (Max 1,800 Mảnh)",
      en: "Thunder Judgment • Dragonheart • Dragonbone Amulet (Max 1,800 Shards)",
    },
    badge: { vi: "Cam • Bộ Tộc", en: "Legendary • Horde" },
    slots: RELIC_FACTION_SETS[1].slots,
  },
  {
    id: "legendary_nature",
    rarity: "legendary",
    factionId: "nature",
    title: {
      vi: "Bí Bảo Cam • Thiên Nhiên (Lời Thề Rừng Thiêng)",
      en: "Legendary • Nature (Oath of the Sacred Forest)",
    },
    subtitle: {
      vi: "Cung Dây Leo • Vương Miện Bất Bại • Cuộn Rừng Thiêng (Max 1,800 Mảnh)",
      en: "Vineborne Bow • Undefeated Crown • Sacred Scroll (Max 1,800 Shards)",
    },
    badge: { vi: "Cam • Thiên Nhiên", en: "Legendary • Nature" },
    slots: RELIC_FACTION_SETS[2].slots,
  },
  {
    id: "epic_standard",
    rarity: "epic",
    title: {
      vi: "Bí Bảo Tím (Sử Thi • Max 3,130 Mảnh)",
      en: "Epic Relic (Max 3,130 Shards)",
    },
    subtitle: {
      vi: "Vương Miện Băng Giá • Khiên Thánh Quang • Đá Ánh Trăng (0★ Áp Chế)",
      en: "Frost Diadem • Holy Shield • Moonstone (0★ Suppression)",
    },
    badge: { vi: "Tím (Sử Thi)", en: "Epic" },
    slots: EPIC_STANDARD_SLOTS,
  },
  {
    id: "rare_standard",
    rarity: "rare",
    title: {
      vi: "Bí Bảo Lam (Hiếm • Max 4,810 Mảnh)",
      en: "Rare Relic (Max 4,810 Shards)",
    },
    subtitle: {
      vi: "Nhẫn Ấn Công Tước • Khiên Cổ Ngữ • Tù Và Chiến Tranh (Tích Điểm GAR)",
      en: "Duke's Signet Ring • Rune Shield • War Horn (GAR Scoring)",
    },
    badge: { vi: "Lam (Hiếm)", en: "Rare" },
    slots: RARE_STANDARD_SLOTS,
  },
] as const;

const SUB_STEPS: readonly RelicSubStep[] = [0, 1, 2, 3, 4] as const;
const TIER_STAR_POSITIONS: readonly (1 | 2 | 3 | 4 | 5)[] = [
  1, 2, 3, 4, 5,
] as const;

const MILESTONE_CHIPS: readonly {
  readonly star: RelicStarLevel;
  readonly shortLabel: Readonly<Record<CalculatorLocale, string>>;
}[] = [
  { star: 0, shortLabel: { vi: "Gốc", en: "Base" } },
  { star: 5, shortLabel: { vi: "Bậc 1", en: "Tier 1" } },
  { star: 8, shortLabel: { vi: "Điểm Gãy ROI", en: "ROI Spot" } },
  { star: 10, shortLabel: { vi: "Bậc 2", en: "Tier 2" } },
  { star: 15, shortLabel: { vi: "Bậc 3", en: "Tier 3" } },
  { star: 20, shortLabel: { vi: "Đỉnh", en: "Max" } },
] as const;

function clampRelicStar(value: number): RelicStarLevel {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(20, Math.round(value))) as RelicStarLevel;
}

function getShardMaterialByRarity(rarity: RelicRarity): CalculatorMaterialRef {
  if (rarity === "legendary") {
    return CALCULATOR_MATERIALS.legendaryUniversalRelicShard;
  }
  if (rarity === "epic") {
    return CALCULATOR_MATERIALS.epicUniversalRelicShard;
  }
  return CALCULATOR_MATERIALS.rareUniversalRelicShard;
}

function getActiveTierFromStar(star: RelicStarLevel): RelicTierIndex {
  if (star <= 0) return 1;
  return Math.ceil(star / 5) as RelicTierIndex;
}

interface RelicBreakthroughSelectorProps {
  readonly title: string;
  readonly rarity: RelicRarity;
  readonly star: RelicStarLevel;
  readonly subStep: RelicSubStep;
  readonly onChangeStar: (nextStar: RelicStarLevel) => void;
  readonly onChangeSubStep: (nextSubStep: RelicSubStep) => void;
  readonly onSelectMilestone: (targetStar: RelicStarLevel) => void;
  readonly locale: CalculatorLocale;
  readonly testIdPrefix: string;
  readonly extraFooter?: React.ReactNode;
}

function RelicBreakthroughSelector({
  title,
  rarity,
  star,
  subStep,
  onChangeStar,
  onChangeSubStep,
  onSelectMilestone,
  locale,
  testIdPrefix,
  extraFooter,
}: RelicBreakthroughSelectorProps): React.JSX.Element {
  const isVi = locale === "vi";
  const effectiveSubStep: RelicSubStep = star === 20 ? 0 : subStep;
  const activeTier = getActiveTierFromStar(star);
  const tierStartStar = ((activeTier - 1) * 5 + 1) as RelicStarLevel;
  const isPeakTier = star >= 16;

  const investedShards = useMemo(
    () => getInvestedRelicShardsAtState(rarity, star, effectiveSubStep),
    [rarity, star, effectiveSubStep]
  );
  const passiveStats = useMemo(
    () => getRelicPassiveStatsAtStar(rarity, star),
    [rarity, star]
  );

  return (
    <div className="flex h-full flex-col justify-between space-y-3.5">
      {/* 1. Clean Zone Title + Tier Badge */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className={CALC_MD3.sectionTitle}>{title}</h2>
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-lg px-2.5 py-1 font-sans text-xs font-bold",
            isPeakTier
              ? "bg-rose-500/15 text-rose-700 dark:text-rose-300"
              : "bg-amber-500/15 text-amber-800 dark:text-amber-300"
          )}
        >
          <span>{isVi ? "Bậc" : "Tier"}</span>
          <span className="font-mono tabular-nums">{activeTier}/4</span>
        </span>
      </div>

      {/* 2. Stepper [-] / [X★ (sub/5)] / [+] & Range Slider (0..20) */}
      <div className={cn(CALC_MD3.tonalGroup, "space-y-3")}>
        <div className="flex items-center justify-between gap-2">
          <CalculatorStepperButton
            direction="decrease"
            testId={`${testIdPrefix}-star-minus`}
            ariaLabel={
              isVi
                ? `Giảm ${title} 1 sao`
                : `Decrease ${title} by 1 star`
            }
            disabled={star <= 0}
            onClick={() => onChangeStar(clampRelicStar(star - 1))}
          />

          <div
            data-testid={`${testIdPrefix}-star-value`}
            className={cn(
              "flex min-h-[44px] flex-1 flex-col items-center justify-center rounded-xl px-3 py-1 text-center",
              isPeakTier
                ? "bg-rose-500/15 text-rose-700 dark:text-rose-300"
                : "bg-background/85 text-foreground"
            )}
          >
            <span className="font-mono text-base font-black tabular-nums">
              {star}★ ({effectiveSubStep}/5)
            </span>
            <span className="font-sans text-xs text-muted-foreground">
              {star === 0
                ? isVi
                  ? "Khởi điểm 0★"
                  : "Base 0★"
                : star === 20
                  ? isVi
                    ? "Đỉnh Tuyệt Đối 20★"
                    : "Max Cap 20★"
                  : isVi
                    ? `Bậc ${activeTier} • Đột phá mốc ${activeTier * 5}★`
                    : `Tier ${activeTier} • Breakthrough at ${activeTier * 5}★`}
            </span>
          </div>

          <CalculatorStepperButton
            direction="increase"
            testId={`${testIdPrefix}-star-plus`}
            ariaLabel={
              isVi
                ? `Tăng ${title} 1 sao`
                : `Increase ${title} by 1 star`
            }
            disabled={star >= 20}
            onClick={() => onChangeStar(clampRelicStar(star + 1))}
          />
        </div>

        {/* Range Slider 0..20 */}
        <div className="space-y-1">
          <input
            type="range"
            min={0}
            max={20}
            step={1}
            value={star}
            aria-label={title}
            data-testid={`${testIdPrefix}-star-slider`}
            onChange={(e) => onChangeStar(clampRelicStar(Number(e.target.value)))}
            className={cn(
              "h-2 w-full cursor-pointer appearance-none rounded-full bg-muted",
              isPeakTier ? "accent-rose-500" : "accent-amber-500"
            )}
          />
          <div className="flex justify-between font-mono text-xs text-muted-foreground tabular-nums">
            <span>0★</span>
            <span>5★</span>
            <span>10★</span>
            <span>15★</span>
            <span className="font-bold text-rose-600 dark:text-rose-400">
              20★
            </span>
          </div>
        </div>

        {/* 3. Row of 5 Stars in Active Tier (4 Gold Stars + 1 Red Breakthrough Star) */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-sans text-muted-foreground">
            <span>
              {isVi
                ? `5 Sao Trong Bậc ${activeTier} (4 Vàng + 1 Đỏ):`
                : `5 Stars in Tier ${activeTier} (4 Gold + 1 Red):`}
            </span>
            <span className="font-mono font-bold text-foreground tabular-nums">
              {tierStartStar}★–{tierStartStar + 4}★
            </span>
          </div>

          <div className="grid grid-cols-6 gap-1.5">
            <button
              type="button"
              data-testid={`${testIdPrefix}-tier-star-0`}
              aria-pressed={star === 0}
              aria-label={isVi ? `${title} 0 sao` : `${title} 0 star`}
              onClick={() => onSelectMilestone(0)}
              className={cn(
                "inline-flex min-h-[44px] min-w-[44px] flex-col items-center justify-center rounded-xl px-1.5 py-1 transition-colors cursor-pointer",
                star === 0
                  ? "bg-amber-500 font-bold text-slate-950 shadow-sm"
                  : "bg-background/70 text-muted-foreground hover:bg-background hover:text-foreground"
              )}
            >
              <span className="font-mono text-xs font-black tabular-nums">
                0★
              </span>
            </button>

            {TIER_STAR_POSITIONS.map((pos) => {
              const targetStar = (tierStartStar + pos - 1) as RelicStarLevel;
              const isBreakthroughRed = pos === 5;
              const isReached = star >= targetStar;
              const isCurrent = star === targetStar;

              return (
                <button
                  key={pos}
                  type="button"
                  data-testid={`${testIdPrefix}-tier-star-${pos}`}
                  aria-pressed={isCurrent}
                  aria-label={
                    isVi
                      ? `${title} ${targetStar} sao`
                      : `${title} ${targetStar} star`
                  }
                  onClick={() => onChangeStar(targetStar)}
                  className={cn(
                    "inline-flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-0.5 rounded-xl px-1.5 py-1 transition-colors cursor-pointer",
                    isCurrent
                      ? isBreakthroughRed
                        ? "bg-rose-500/20 ring-1 ring-rose-500/60"
                        : "bg-amber-500/20 ring-1 ring-amber-500/60"
                      : "bg-background/70 hover:bg-background"
                  )}
                >
                  <Star
                    className={cn(
                      "h-4 w-4 shrink-0 transition-transform",
                      isCurrent ? "scale-110" : "",
                      isReached
                        ? isBreakthroughRed
                          ? "text-rose-500 fill-rose-500"
                          : "text-amber-400 fill-amber-400"
                        : isBreakthroughRed
                          ? "text-rose-500/45"
                          : "text-muted-foreground/45"
                    )}
                    aria-hidden="true"
                  />
                  <span
                    className={cn(
                      "font-mono text-xs font-bold tabular-nums",
                      isBreakthroughRed
                        ? "text-rose-600 dark:text-rose-400"
                        : "text-amber-700 dark:text-amber-300"
                    )}
                  >
                    {targetStar}★
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Row of 5 Star Petals (0/5 ➔ 4/5) */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-sans text-muted-foreground">
            <span>
              {isVi
                ? "Cánh Sao Tiểu Bậc (0/5 ➔ 4/5):"
                : "Sub-Step Star Petals (0/5 ➔ 4/5):"}
            </span>
            <span className="font-mono font-bold text-foreground tabular-nums">
              {effectiveSubStep}/5
            </span>
          </div>

          <div className="grid grid-cols-5 gap-1.5">
            {SUB_STEPS.map((step) => {
              const isSelectedSub = effectiveSubStep === step;
              return (
                <button
                  key={step}
                  type="button"
                  data-testid={`${testIdPrefix}-substep-${step}`}
                  aria-pressed={isSelectedSub}
                  aria-label={
                    isVi
                      ? `${title} cánh sao ${step}/5`
                      : `${title} petal ${step}/5`
                  }
                  disabled={star === 20 && step > 0}
                  onClick={() => onChangeSubStep(step)}
                  className={cn(
                    "inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl px-2 py-1 font-mono text-xs font-bold tabular-nums transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-40",
                    isSelectedSub
                      ? isPeakTier
                        ? "bg-rose-500 text-white shadow-sm"
                        : "bg-amber-500 text-slate-950 shadow-sm"
                      : "bg-background/70 text-muted-foreground hover:bg-background hover:text-foreground"
                  )}
                >
                  {step}/5
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. 6 Golden Milestone Quick Chips */}
        <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
          {MILESTONE_CHIPS.map((chip) => {
            const isSelectedChip = star === chip.star && effectiveSubStep === 0;
            const isPeakChip = chip.star === 20;
            return (
              <button
                key={chip.star}
                type="button"
                data-testid={`${testIdPrefix}-chip-${chip.star}`}
                aria-pressed={isSelectedChip}
                aria-label={`${title} ${chip.star}★ ${chip.shortLabel[locale]}`}
                onClick={() => onSelectMilestone(chip.star)}
                className={cn(
                  "inline-flex min-h-[44px] min-w-[44px] flex-col items-center justify-center rounded-xl px-2 py-1 text-center transition-colors cursor-pointer",
                  isSelectedChip
                    ? isPeakChip
                      ? "bg-rose-500 font-bold text-white shadow-sm"
                      : "bg-amber-500 font-bold text-slate-950 shadow-sm"
                    : "bg-background/70 text-muted-foreground hover:bg-background hover:text-foreground"
                )}
              >
                <span className="font-mono text-xs font-black tabular-nums">
                  {chip.star}★
                </span>
                <span className="truncate font-sans text-xs">
                  {chip.shortLabel[locale]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 6. Tonal Summary Well: Cumulative Shards & Passive Hero ATK/HP */}
      <div className={cn(CALC_MD3.tonalGroup, "space-y-2")}>
        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="font-sans text-muted-foreground">
            {isVi ? "Mảnh tích lũy tại mốc này:" : "Cumulative shards at state:"}
          </span>
          <span
            title={formatExactNumber(investedShards)}
            className="font-mono text-sm font-bold text-amber-600 tabular-nums dark:text-amber-400"
          >
            {formatCompactNumber(investedShards)}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="font-sans text-muted-foreground">
            {isVi ? "Chỉ số sở hữu Anh Hùng:" : "Hero Owned Passive:"}
          </span>
          <span className="font-mono text-xs font-bold text-emerald-600 tabular-nums dark:text-emerald-400">
            +{passiveStats.heroAttackPercent}% ATK / +{passiveStats.heroHpPercent}
            % HP
          </span>
        </div>

        {extraFooter}
      </div>
    </div>
  );
}

export function RelicsCalculator({
  tool,
  locale,
}: RelicsCalculatorProps): React.JSX.Element {
  const isVi = locale === "vi";

  // Default v2.0 Single-Entity (×1) State: Legendary League Slot 1 (Petrification Staff), 0★ (0/5) -> 8★ (0/5) ROI Sweet Spot
  const [selectedGroupId, setSelectedGroupId] =
    useState<RelicPickerGroupId>("legendary_league");
  const [selectedSlotRole, setSelectedSlotRole] =
    useState<RelicSlotRole>("offense");
  const [fromStar, setFromStar] = useState<RelicStarLevel>(0);
  const [fromSubStep, setFromSubStep] = useState<RelicSubStep>(0);
  const [toStar, setToStar] = useState<RelicStarLevel>(8);
  const [toSubStep, setToSubStep] = useState<RelicSubStep>(0);

  const [ownedShardsInput, setOwnedShardsInput] = useState<string>("0");
  const [ownedArcaneCrystalsInput, setOwnedArcaneCrystalsInput] =
    useState<string>("0");
  const [ownedMagicStonesInput, setOwnedMagicStonesInput] =
    useState<string>("0");

  const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false);
  const [pickerStep, setPickerStep] = useState<AvatarPickerStep>("group");
  const pickerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isPickerOpen) return;

    const handleMouseDown = (event: MouseEvent): void => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setIsPickerOpen(false);
        setPickerStep("group");
      }
    };

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        setIsPickerOpen(false);
        setPickerStep("group");
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPickerOpen]);

  const activeGroup = useMemo(
    () =>
      RELIC_PICKER_GROUPS.find((g) => g.id === selectedGroupId) ??
      RELIC_PICKER_GROUPS[0],
    [selectedGroupId]
  );

  const activeSlotTemplate = useMemo(
    () =>
      activeGroup.slots.find((s) => s.slotRole === selectedSlotRole) ??
      activeGroup.slots[0],
    [activeGroup, selectedSlotRole]
  );

  const activeRarity = activeGroup.rarity;
  const activeShardMaterial = useMemo(
    () => getShardMaterialByRarity(activeRarity),
    [activeRarity]
  );

  const ownedShards = useMemo(
    () => parseCompactNumberInput(ownedShardsInput),
    [ownedShardsInput]
  );
  const ownedArcaneCrystals = useMemo(
    () => parseCompactNumberInput(ownedArcaneCrystalsInput),
    [ownedArcaneCrystalsInput]
  );
  const ownedMagicStones = useMemo(
    () => parseCompactNumberInput(ownedMagicStonesInput),
    [ownedMagicStonesInput]
  );

  const effectiveFromSubStep: RelicSubStep = fromStar === 20 ? 0 : fromSubStep;
  const effectiveToSubStep: RelicSubStep = toStar === 20 ? 0 : toSubStep;

  const isInvalidRange =
    toStar < fromStar ||
    (toStar === fromStar && effectiveToSubStep < effectiveFromSubStep);

  const singleResult = useMemo(
    () =>
      calculateSingleRelicUpgrade({
        rarity: activeRarity,
        fromStar,
        fromSubStep: effectiveFromSubStep,
        toStar: isInvalidRange ? fromStar : toStar,
        toSubStep: isInvalidRange ? effectiveFromSubStep : effectiveToSubStep,
        ownedShards,
        ownedRelicScrolls: 0,
        ownedMagicStones,
        ownedArcaneCrystals,
      }),
    [
      activeRarity,
      fromStar,
      effectiveFromSubStep,
      toStar,
      effectiveToSubStep,
      isInvalidRange,
      ownedShards,
      ownedMagicStones,
      ownedArcaneCrystals,
    ]
  );

  const actualToStats = useMemo(
    () => getRelicPassiveStatsAtStar(activeRarity, toStar),
    [activeRarity, toStar]
  );

  const atkDelta = useMemo(
    () =>
      Number(
        Math.max(
          0,
          actualToStats.heroAttackPercent -
            singleResult.fromStats.heroAttackPercent
        ).toFixed(1)
      ),
    [actualToStats.heroAttackPercent, singleResult.fromStats.heroAttackPercent]
  );

  const hpDelta = useMemo(
    () =>
      Number(
        Math.max(
          0,
          actualToStats.heroHpPercent - singleResult.fromStats.heroHpPercent
        ).toFixed(1)
      ),
    [actualToStats.heroHpPercent, singleResult.fromStats.heroHpPercent]
  );

  const handleTogglePicker = (): void => {
    setIsPickerOpen((prev) => {
      const next = !prev;
      if (next) {
        setPickerStep("group");
      }
      return next;
    });
  };

  const handleSelectGroup = (groupId: RelicPickerGroupId): void => {
    setSelectedGroupId(groupId);
    setPickerStep("relic");
  };

  const handleSelectSlot = (slotRole: RelicSlotRole): void => {
    setSelectedSlotRole(slotRole);
    setIsPickerOpen(false);
    setPickerStep("group");
  };

  const handleReset = (): void => {
    setSelectedGroupId("legendary_league");
    setSelectedSlotRole("offense");
    setFromStar(0);
    setFromSubStep(0);
    setToStar(8);
    setToSubStep(0);
    setOwnedShardsInput("0");
    setOwnedArcaneCrystalsInput("0");
    setOwnedMagicStonesInput("0");
    setIsPickerOpen(false);
    setPickerStep("group");
  };

  const handleAutoFixRange = (): void => {
    const nextStar = clampRelicStar(Math.min(20, fromStar + 1));
    setToStar(nextStar);
    setToSubStep(0);
  };

  const isTargetPeakMythic = toStar >= 16;
  const targetTier = getActiveTierFromStar(toStar);
  const targetStarInTier =
    toStar === 0 ? 0 : (((toStar - 1) % 5) + 1);

  const shardCompletionPercent =
    singleResult.requiredShards <= 0
      ? 100
      : Math.min(
          100,
          Math.floor((ownedShards / singleResult.requiredShards) * 100)
        );
  const crystalCompletionPercent =
    singleResult.requiredArcaneCrystals <= 0
      ? 100
      : Math.min(
          100,
          Math.floor(
            (ownedArcaneCrystals / singleResult.requiredArcaneCrystals) * 100
          )
        );
  const stoneCompletionPercent =
    singleResult.requiredMagicStones <= 0
      ? 100
      : Math.min(
          100,
          Math.floor((ownedMagicStones / singleResult.requiredMagicStones) * 100)
        );

  const isShardsSufficient =
    ownedShards >= singleResult.requiredShards &&
    singleResult.requiredShards > 0;
  const isCrystalsSufficient =
    ownedArcaneCrystals >= singleResult.requiredArcaneCrystals &&
    singleResult.requiredArcaneCrystals > 0;
  const isStonesSufficient =
    ownedMagicStones >= singleResult.requiredMagicStones &&
    singleResult.requiredMagicStones > 0;

  const surplusCrystals = Math.max(
    0,
    ownedArcaneCrystals - singleResult.requiredArcaneCrystals
  );
  const surplusStones = Math.max(
    0,
    ownedMagicStones - singleResult.requiredMagicStones
  );

  const shardMaterialName = isVi
    ? activeShardMaterial.nameVi
    : activeShardMaterial.nameEn;
  const crystalMaterialName = isVi
    ? CALCULATOR_MATERIALS.arcaneCrystal.nameVi
    : CALCULATOR_MATERIALS.arcaneCrystal.nameEn;
  const stoneMaterialName = isVi
    ? CALCULATOR_MATERIALS.magicStone.nameVi
    : CALCULATOR_MATERIALS.magicStone.nameEn;

  return (
    <div data-testid="relics-calculator" className="space-y-4">
      {/* 1. Flat MD3 Tool Header + Shared <CalculatorInfoPopover /> + Reset */}
      <CalculatorToolHeader
        code={tool.code}
        title={tool.title[locale].replace(`${tool.code} `, "")}
        actions={
          <>
            <CalculatorInfoPopover
              locale={locale}
              triggerTestId="relics-info-trigger"
              dialogTestId="relics-info-dialog"
              title={
                isVi
                  ? "Hướng Dẫn Bí Bảo 20★, Áp Chế Sao Cam -50% & Bảng SSoT"
                  : "20★ Relic Guide, -50% Star Suppression & SSoT Tables"
              }
              subtitle={
                isVi
                  ? "Ma trận 4 Bậc × 5 Sao × 5 Cánh (1,800 Mảnh Cam / 3,130 Tím / 4,810 Lam), Quy tắc Áp Chế -50% & Điểm GAR/KvK"
                  : "4 Tiers × 5 Stars × 5 Petals (1,800 Leg / 3,130 Epic / 4,810 Rare Shards), -50% Suppression & GAR/KvK Scoring"
              }
            >
              <div className="space-y-5">
                {/* Section 1: 20★ Mechanics & -50% Legendary Star Suppression */}
                <div className="rounded-2xl bg-amber-500/10 p-4 ring-1 ring-amber-500/30 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-sans text-sm font-bold text-foreground">
                      {isVi
                        ? "1. Cơ Chế 20★ (4 Bậc × 5 Sao) & Quy Luật Áp Chế Sao Cam -50% (Star Rating Suppression)"
                        : "1. 20★ Mechanics (4 Tiers × 5 Stars) & -50% Legendary Star Rating Suppression"}
                    </h4>
                    <ShieldAlert
                      className="h-4 w-4 shrink-0 text-amber-500"
                      aria-hidden="true"
                    />
                  </div>
                  <ul className="space-y-1.5 font-sans text-xs leading-relaxed text-muted-foreground">
                    <li>
                      •{" "}
                      <strong className="text-foreground">
                        {isVi
                          ? "Ma trận 20★ (4 Bậc × 5 Sao × 5 Cánh):"
                          : "20★ Matrix (4 Tiers × 5 Stars × 5 Petals):"}
                      </strong>{" "}
                      {isVi
                        ? "Mỗi Bí Bảo có 4 Bậc (Bậc 1: 1★–5★, Bậc 2: 6★–10★, Bậc 3: 11★–15★, Bậc 4: 16★–20★). Mỗi ngôi sao chia làm 5 cánh nhỏ (0/5 ➔ 4/5); ngôi sao thứ 5 chốt mỗi Bậc (5★, 10★, 15★, 20★) là mốc Đột Phá Bậc tiêu tốn thêm Pha Lê Bí Thuật và Đá Vân Ma Thuật."
                        : "Each Relic spans 4 Tiers (Tier 1: 1★–5★, Tier 2: 6★–10★, Tier 3: 11★–15★, Tier 4: 16★–20★). Every star has 5 sub-step petals (0/5 ➔ 4/5); the 5th star of each Tier (5★, 10★, 15★, 20★) requires Arcane Crystals and Magic Stones."}
                    </li>
                    <li>
                      •{" "}
                      <strong className="text-rose-600 dark:text-rose-400">
                        {isVi
                          ? "Quy luật Áp Chế Sao Cam -50%:"
                          : "-50% Legendary Star Suppression Rule:"}
                      </strong>{" "}
                      {isVi
                        ? "Chỉ có Bí Bảo Cam (Legendary) trở lên mới được tính vào Tổng Sao Áp Chế của đội hình (tối đa 60★ cho 3 món 20★). Bí Bảo Tím hoặc Lam dù nâng tới 20★ vẫn bị tính là 0★ áp chế! Đội nào có Tổng Sao Bí Bảo Cam cao hơn đối thủ chỉ từ +1★ trở lên sẽ cắt giảm -50% toàn bộ sát thương, hồi máu và thời gian hiệu lực Bí Bảo của đối phương."
                        : "Only Legendary+ Relics count toward Queue Star Rating (up to 60★ across 3 Relics). Epic and Rare Relics at 20★ still contribute 0★! Exceeding the enemy's Legendary Relic Star total by even +1★ slashes all enemy Relic damage, healing, and effect durations by -50%."}
                    </li>
                  </ul>
                </div>

                {/* Section 2: SSoT Relic Shard Milestones Table (5★ / 8★ / 10★ / 15★ / 20★) */}
                <div className="space-y-2">
                  <h4 className="font-sans text-sm font-bold text-foreground">
                    {isVi
                      ? "2. Bảng Cột Mốc Mảnh Bí Bảo SSoT (5★ / 8★ / 10★ / 15★ / 20★)"
                      : "2. SSoT Relic Shard Milestones Table (5★ / 8★ / 10★ / 15★ / 20★)"}
                  </h4>
                  <div className="overflow-x-auto rounded-2xl bg-slate-50/90 p-2.5 ring-1 ring-slate-200/80 dark:bg-slate-800/60 dark:ring-slate-700/70">
                    <table className="w-full text-left font-sans text-xs">
                      <thead>
                        <tr className="border-b border-border/60 text-muted-foreground">
                          <th className="py-2 pr-2 font-semibold">
                            {isVi ? "Cột Mốc" : "Milestone"}
                          </th>
                          <th className="px-2 py-2 text-right font-semibold">
                            {isVi ? "Mảnh Cam" : "Leg Shards"}
                          </th>
                          <th className="px-2 py-2 text-right font-semibold">
                            {isVi ? "Mảnh Tím" : "Epic Shards"}
                          </th>
                          <th className="px-2 py-2 text-right font-semibold">
                            {isVi ? "Mảnh Lam" : "Rare Shards"}
                          </th>
                          <th className="py-2 pl-2 text-right font-semibold">
                            {isVi ? "Nội Tại Cam" : "Leg Passive"}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/40">
                        {[5, 8, 10, 15, 20].map((starNum) => {
                          const leg =
                            RELIC_RARITY_TABLES.legendary.stars[starNum - 1];
                          const ep =
                            RELIC_RARITY_TABLES.epic.stars[starNum - 1];
                          const ra =
                            RELIC_RARITY_TABLES.rare.stars[starNum - 1];
                          const isRoi = starNum === 8;
                          return (
                            <tr
                              key={starNum}
                              className={cn(
                                "text-foreground",
                                isRoi ? "bg-amber-500/10 font-semibold" : ""
                              )}
                            >
                              <td className="py-2 pr-2 font-sans font-bold">
                                <span className="font-mono tabular-nums">
                                  {starNum}★
                                </span>{" "}
                                <span>
                                  ({isVi ? "Bậc" : "Tier"}{" "}
                                  <span className="font-mono">{leg.tier}</span>
                                  {isRoi
                                    ? isVi
                                      ? " • Điểm Gãy ROI"
                                      : " • ROI Sweet Spot"
                                    : ""}
                                  )
                                </span>
                              </td>
                              <td className="px-2 py-2 text-right font-mono font-bold text-amber-600 tabular-nums dark:text-amber-400">
                                {formatExactNumber(leg.cumulativeShards)}
                              </td>
                              <td className="px-2 py-2 text-right font-mono tabular-nums">
                                {formatExactNumber(ep.cumulativeShards)}
                              </td>
                              <td className="px-2 py-2 text-right font-mono tabular-nums">
                                {formatExactNumber(ra.cumulativeShards)}
                              </td>
                              <td className="py-2 pl-2 text-right font-mono text-emerald-600 tabular-nums dark:text-emerald-400">
                                +{leg.heroAttackPercent}% ATK / +
                                {leg.heroHpPercent}% HP
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Section 3: Faction BiS Relic Trios & GAR / KvK / Guild Rush Scoring */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-sans text-sm font-bold text-foreground">
                      {isVi
                        ? "3. Bộ 3 Bí Bảo Trấn Phái Theo Phe & Điểm Sự Kiện GAR / KvK / Đua Bang"
                        : "3. Faction BiS Relic Trios & GAR / KvK / Guild Rush Event Scoring"}
                    </h4>
                    <Swords
                      className="h-4 w-4 text-amber-500"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                    {RELIC_FACTION_SETS.map((fSet) => (
                      <div
                        key={fSet.id}
                        className={cn(CALC_MD3.tonalGroup, "space-y-1.5 p-3")}
                      >
                        <p className="font-sans text-xs font-bold text-amber-700 dark:text-amber-300">
                          {fSet.factionName[locale]} — {fSet.setName[locale]}
                        </p>
                        {fSet.slots.map((slot) => (
                          <p
                            key={slot.slotRole}
                            className="font-sans text-xs text-foreground"
                          >
                            •{" "}
                            <span className="font-semibold">
                              {slot.bisRelicName[locale]}
                            </span>
                            :{" "}
                            <span className="text-muted-foreground">
                              {slot.mechanicTag[locale]}
                            </span>
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>

                  <div className="rounded-xl bg-emerald-500/10 p-3 ring-1 ring-emerald-500/30 space-y-1">
                    <p className="font-sans text-xs font-bold text-emerald-800 dark:text-emerald-200">
                      {isVi
                        ? "Bảng Điểm Sự Kiện GAR / KvK & Đua Bang (Guild Rush):"
                        : "GAR / KvK & Guild Rush Event Points Breakdown:"}
                    </p>
                    <p className="font-sans text-xs leading-relaxed text-emerald-800/90 dark:text-emerald-200/90">
                      {isVi
                        ? `• 1 Mảnh Bí Bảo Cam = ${formatExactNumber(RELIC_RARITY_TABLES.legendary.garPointsPerShard)} điểm GAR/KvK (${RELIC_RARITY_TABLES.legendary.guildRushPointsPerShard} điểm Đua Bang) • 1 Mảnh Tím = ${formatExactNumber(RELIC_RARITY_TABLES.epic.garPointsPerShard)} điểm • 1 Mảnh Lam = ${RELIC_RARITY_TABLES.rare.garPointsPerShard} điểm.`
                        : `• 1 Legendary Relic Shard = ${formatExactNumber(RELIC_RARITY_TABLES.legendary.garPointsPerShard)} GAR/KvK pts (${RELIC_RARITY_TABLES.legendary.guildRushPointsPerShard} Guild Rush pts) • 1 Epic Shard = ${formatExactNumber(RELIC_RARITY_TABLES.epic.garPointsPerShard)} pts • 1 Rare Shard = ${RELIC_RARITY_TABLES.rare.garPointsPerShard} pts.`}
                    </p>
                    <p className="font-sans text-xs leading-relaxed text-emerald-800/90 dark:text-emerald-200/90">
                      {isVi
                        ? `• 1 Pha Lê Bí Thuật = ${formatExactNumber(RELIC_EVENT_SCORING.garPointsPerArcaneCrystal)} điểm GAR/KvK • Mỗi 2,000 Đá Vân Ma Thuật = ${RELIC_EVENT_SCORING.garPointsPer2000MagicStones} điểm GAR/KvK. Lưu ý: GAR thường chỉ tính điểm Bí Bảo ở Ngày 1–2 (Thứ Hai–Thứ Ba), còn KvK liên server tính thêm vào Ngày 5.`
                        : `• 1 Arcane Crystal = ${formatExactNumber(RELIC_EVENT_SCORING.garPointsPerArcaneCrystal)} GAR/KvK pts • Every 2,000 Magic Stones = ${RELIC_EVENT_SCORING.garPointsPer2000MagicStones} GAR/KvK pts. Note: Standard GAR scores Relics on Days 1–2 (Mon–Tue), while cross-server KvK also scores them on Day 5.`}
                    </p>
                  </div>
                </div>
              </div>
            </CalculatorInfoPopover>

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
              <span>{isVi ? "Đặt lại" : "Reset"}</span>
            </button>
          </>
        }
      />

      {/* 2. Top Row — 3 Symmetrical v2.0 Zones: [Zone 1: Current Breakthrough] | [Zone 2: Central Relic Avatar] | [Zone 3: Target Breakthrough] */}
      <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-12">
        {/* ZONE 1 (Left - 4 cols, order-2 lg:order-1): Đột Phá Hiện Tại */}
        <section
          data-testid="relics-zone-current"
          className={cn(
            CALC_MD3.surfaceCard,
            "order-2 flex flex-col justify-between lg:order-1 lg:col-span-4"
          )}
        >
          <RelicBreakthroughSelector
            title={isVi ? "Đột Phá Hiện Tại" : "Current Breakthrough"}
            rarity={activeRarity}
            star={fromStar}
            subStep={fromSubStep}
            onChangeStar={(nextStar) => {
              setFromStar(nextStar);
              if (nextStar === 20) setFromSubStep(0);
            }}
            onChangeSubStep={setFromSubStep}
            onSelectMilestone={(targetStar) => {
              setFromStar(targetStar);
              setFromSubStep(0);
            }}
            locale={locale}
            testIdPrefix="relics-from"
          />
        </section>

        {/* ZONE 2 (Center - 4 cols, order-1 lg:order-2): Avatar Bí Bảo Trung Tâm + 2-Step Sequential Picker */}
        <section
          ref={pickerRef}
          data-testid="relics-zone-avatar"
          className={cn(
            CALC_MD3.surfaceCard,
            "relative order-1 flex flex-col items-center justify-between gap-3.5 text-center lg:order-2 lg:col-span-4"
          )}
        >
          <div className="flex w-full items-center justify-between gap-2">
            <span className="font-sans text-xs font-bold text-muted-foreground">
              {isVi ? "Bí Bảo Đang Chọn (×1)" : "Selected Relic (×1)"}
            </span>
            <span
              className={cn(
                "inline-flex items-center rounded-lg px-2.5 py-0.5 font-sans text-xs font-bold",
                activeRarity === "legendary"
                  ? "bg-amber-500/15 text-amber-700 dark:text-amber-300"
                  : activeRarity === "epic"
                    ? "bg-purple-500/15 text-purple-700 dark:text-purple-300"
                    : "bg-sky-500/15 text-sky-700 dark:text-sky-300"
              )}
            >
              {activeGroup.badge[locale]}
            </span>
          </div>

          {/* Clickable Central Relic Avatar (112x112px / h-28 w-28) */}
          <button
            type="button"
            data-testid="relics-central-avatar-btn"
            onClick={handleTogglePicker}
            aria-expanded={isPickerOpen}
            aria-haspopup="dialog"
            aria-label={
              isVi
                ? "Bấm để chọn Phẩm chất, Phe và Bí Bảo"
                : "Click to select Rarity, Faction, and Relic"
            }
            className="group flex w-full flex-col items-center justify-center rounded-2xl p-2 transition-transform hover:scale-[1.01] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40"
          >
            <div
              data-testid="relics-central-avatar-frame"
              className={cn(
                "relative flex h-28 w-28 items-center justify-center rounded-2xl p-2.5 shadow-md transition-all",
                isTargetPeakMythic
                  ? "ring-2 ring-rose-500/50 bg-rose-500/10"
                  : activeRarity === "legendary"
                    ? "ring-2 ring-amber-500/45 bg-amber-500/10"
                    : activeRarity === "epic"
                      ? "ring-2 ring-purple-500/45 bg-purple-500/10"
                      : "ring-2 ring-sky-500/45 bg-sky-500/10"
              )}
            >
              <Image
                src={activeShardMaterial.iconPath}
                alt={activeSlotTemplate.bisRelicName[locale]}
                width={84}
                height={84}
                className="h-20 w-20 object-contain drop-shadow"
              />

              {/* Bottom-left Target Star Badge */}
              <span
                className={cn(
                  "absolute -bottom-2 -left-2 inline-flex items-center rounded-full px-2.5 py-0.5 font-mono text-xs font-black text-white shadow tabular-nums",
                  isTargetPeakMythic
                    ? "bg-rose-600"
                    : activeRarity === "legendary"
                      ? "bg-amber-600"
                      : activeRarity === "epic"
                        ? "bg-purple-600"
                        : "bg-sky-600"
                )}
              >
                {toStar}★
              </span>
            </div>

            {/* 5 Small Stars reflecting progress in Target Tier (4 Gold + 1 Red at 5★/10★/15★/20★) */}
            <div
              className="mt-3 flex items-center justify-center gap-1"
              aria-hidden="true"
            >
              {TIER_STAR_POSITIONS.map((pos) => {
                const isRedBreakthrough = pos === 5;
                const isFilled = toStar > 0 && targetStarInTier >= pos;
                return (
                  <Star
                    key={pos}
                    className={cn(
                      "h-4 w-4 transition-transform",
                      isFilled
                        ? isRedBreakthrough
                          ? "text-rose-500 fill-rose-500 scale-110"
                          : "text-amber-400 fill-amber-400"
                        : isRedBreakthrough
                          ? "text-rose-500/35"
                          : "text-muted-foreground/35"
                    )}
                  />
                );
              })}
            </div>

            <p className="mt-2 font-heading text-base font-black text-foreground group-hover:text-amber-600 dark:group-hover:text-amber-400">
              {activeSlotTemplate.bisRelicName[locale]}
            </p>

            <p className="font-sans text-xs font-bold text-amber-700 dark:text-amber-300">
              {RELIC_RARITY_TABLES[activeRarity].shortName[locale]} •{" "}
              {activeSlotTemplate.slotLabel[locale]}
            </p>

            <span className="mt-1.5 inline-flex items-center rounded-full bg-amber-500/15 px-2.5 py-0.5 font-sans text-xs font-semibold text-amber-800 dark:text-amber-300">
              {activeSlotTemplate.mechanicTag[locale]}
            </span>

            <p className="mt-1.5 line-clamp-2 max-w-xs font-sans text-xs leading-relaxed text-muted-foreground">
              {activeSlotTemplate.tacticalSummary[locale]}
            </p>

            <span className="mt-2 inline-flex min-h-[44px] items-center gap-1 rounded-xl bg-muted/70 px-3 py-1.5 font-sans text-xs font-bold text-foreground group-hover:bg-amber-500/20">
              <span>
                {isVi
                  ? "Bấm đổi Phẩm chất / Bí Bảo"
                  : "Click to change Rarity / Relic"}
              </span>
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </button>

          {/* Owned Passive Stat Delta Summary Well */}
          <div className={cn(CALC_MD3.tonalGroup, "w-full space-y-1.5")}>
            <div className="flex items-center justify-center gap-2 font-mono text-xs font-bold tabular-nums">
              <span className="text-muted-foreground">
                {fromStar}★ ({effectiveFromSubStep}/5)
              </span>
              <ArrowRight
                className="h-3.5 w-3.5 text-amber-500"
                aria-hidden="true"
              />
              <span
                className={cn(
                  isTargetPeakMythic
                    ? "text-rose-600 dark:text-rose-400"
                    : "text-amber-600 dark:text-amber-400"
                )}
              >
                {toStar}★ ({effectiveToSubStep}/5)
              </span>
            </div>

            <div className="flex items-center justify-between gap-2 text-xs">
              <span className="font-sans text-muted-foreground">
                {isVi ? "Chỉ số sở hữu tăng thêm:" : "Owned Passive Gain:"}
              </span>
              <span className="font-mono font-bold text-emerald-600 tabular-nums dark:text-emerald-400">
                +{atkDelta}% ATK • +{hpDelta}% HP
              </span>
            </div>

            <div className="flex items-center justify-between gap-2 text-xs">
              <span className="font-sans text-muted-foreground">
                {isVi ? "Bậc mục tiêu:" : "Target Tier:"}
              </span>
              <span className="font-sans font-semibold text-foreground">
                {isVi ? "Bậc" : "Tier"}{" "}
                <span className="font-mono tabular-nums">{targetTier}/4</span> •{" "}
                <span className="font-mono tabular-nums">
                  {activeRarity === "legendary" ? `${toStar}★` : "0★"}
                </span>{" "}
                <span>{isVi ? "Áp chế" : "Suppression"}</span>
              </span>
            </div>
          </div>

          {/* 2-Step Sequential Avatar Picker Popover (Step 1: Rarity/Faction Group ➔ Step 2: Offense/Defense/Support Relic) */}
          {isPickerOpen ? (
            <div
              role="dialog"
              aria-label={
                isVi
                  ? "Chọn Phẩm chất, Phe và Bí Bảo"
                  : "Select Rarity, Faction, and Relic"
              }
              data-testid="relics-avatar-picker-popover"
              data-md3-overlay="true"
              className={cn(
                CALC_MD3.overlayCard,
                "absolute top-full left-1/2 z-40 mt-2 w-[min(92vw,390px)] -translate-x-1/2 space-y-3 text-left"
              )}
            >
              <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-2">
                <p className="font-sans text-xs font-bold text-foreground">
                  {pickerStep === "group"
                    ? isVi
                      ? "Bước 1/2: Chọn Phẩm Chất & Bộ Phe Phái"
                      : "Step 1/2: Select Rarity & Faction Set"
                    : isVi
                      ? `Bước 2/2: Chọn Bí Bảo Công / Thủ / Hỗ Trợ (${activeGroup.badge.vi})`
                      : `Step 2/2: Select Offense / Defense / Support Relic (${activeGroup.badge.en})`}
                </p>

                <button
                  type="button"
                  data-testid="relics-picker-close-btn"
                  aria-label={isVi ? "Đóng bộ chọn" : "Close picker"}
                  onClick={() => {
                    setIsPickerOpen(false);
                    setPickerStep("group");
                  }}
                  className={cn(
                    CALC_MD3.iconButton,
                    "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              {pickerStep === "group" ? (
                <div className="space-y-2">
                  {RELIC_PICKER_GROUPS.map((group) => {
                    const isSelectedGroup = group.id === selectedGroupId;
                    const groupMat = getShardMaterialByRarity(group.rarity);
                    const groupMaxShards =
                      RELIC_RARITY_TABLES[group.rarity].maxTotalShards;

                    return (
                      <button
                        key={group.id}
                        type="button"
                        data-testid={`relics-group-${group.id}`}
                        onClick={() => handleSelectGroup(group.id)}
                        className={cn(
                          CALC_MD3.tonalTile,
                          "flex min-h-[52px] w-full items-center justify-between gap-2.5 p-2.5 text-left",
                          isSelectedGroup && CALC_MD3.tileSelected
                        )}
                      >
                        <div className="flex min-w-0 items-center gap-2.5">
                          <Image
                            src={groupMat.iconPath}
                            alt={group.title[locale]}
                            width={36}
                            height={36}
                            className="h-9 w-9 shrink-0 rounded-lg object-contain"
                          />
                          <div className="min-w-0">
                            <p className="truncate font-heading text-xs sm:text-sm font-bold text-foreground">
                              {group.title[locale]}
                            </p>
                            <p className="truncate font-sans text-xs text-muted-foreground">
                              {group.subtitle[locale]}
                            </p>
                          </div>
                        </div>

                        <div className="flex shrink-0 items-center gap-1">
                          <span className="rounded-lg bg-background/80 px-2 py-0.5 font-mono text-xs font-bold text-amber-600 tabular-nums dark:text-amber-400">
                            {formatCompactNumber(groupMaxShards)}
                          </span>
                          <ChevronRight
                            className="h-4 w-4 text-muted-foreground"
                            aria-hidden="true"
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-2.5">
                  <button
                    type="button"
                    data-testid="relics-picker-back-to-group"
                    onClick={() => setPickerStep("group")}
                    className={cn(
                      CALC_MD3.chipButton,
                      "w-full justify-start bg-muted/50 font-sans text-xs font-bold text-amber-700 hover:bg-muted dark:text-amber-300"
                    )}
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    <span>
                      {isVi
                        ? "← Đổi phẩm chất / phe"
                        : "← Change rarity / faction"}
                    </span>
                  </button>

                  <div className="space-y-2">
                    {activeGroup.slots.map((slot) => {
                      const isSelectedSlot = slot.slotRole === selectedSlotRole;
                      return (
                        <button
                          key={slot.slotRole}
                          type="button"
                          data-testid={`relics-slot-${slot.slotRole}`}
                          onClick={() => handleSelectSlot(slot.slotRole)}
                          className={cn(
                            CALC_MD3.tonalTile,
                            "flex min-h-[60px] w-full flex-col items-start gap-1 p-3 text-left",
                            isSelectedSlot && CALC_MD3.tileSelected
                          )}
                        >
                          <div className="flex w-full items-center justify-between gap-2">
                            <span className="font-heading text-xs sm:text-sm font-bold text-foreground">
                              {slot.bisRelicName[locale]}
                            </span>
                            <span className="shrink-0 rounded-md bg-amber-500/15 px-2 py-0.5 font-sans text-xs font-semibold text-amber-700 dark:text-amber-300">
                              {slot.slotLabel[locale]}
                            </span>
                          </div>

                          <p className="font-sans text-xs font-medium text-foreground/90">
                            {slot.mechanicTag[locale]}
                          </p>

                          <p className="font-sans text-xs text-muted-foreground">
                            {isVi ? "Thay thế F2P: " : "F2P Alt: "}
                            <span className="font-semibold text-foreground/85">
                              {slot.f2pAlternative[locale]}
                            </span>
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </section>

        {/* ZONE 3 (Right - 4 cols, order-3): Đột Phá Mục Tiêu */}
        <section
          data-testid="relics-zone-target"
          className={cn(
            CALC_MD3.surfaceCard,
            "order-3 flex flex-col justify-between lg:col-span-4"
          )}
        >
          <RelicBreakthroughSelector
            title={isVi ? "Đột Phá Mục Tiêu" : "Target Breakthrough"}
            rarity={activeRarity}
            star={toStar}
            subStep={toSubStep}
            onChangeStar={(nextStar) => {
              setToStar(nextStar);
              if (nextStar === 20) setToSubStep(0);
            }}
            onChangeSubStep={setToSubStep}
            onSelectMilestone={(targetStar) => {
              setToStar(targetStar);
              setToSubStep(0);
            }}
            locale={locale}
            testIdPrefix="relics-to"
            extraFooter={
              <div className="flex items-center justify-between gap-2 border-t border-border/50 pt-1.5 text-xs">
                <span className="font-sans text-muted-foreground">
                  {isVi ? "Tăng thêm so với hiện tại:" : "Net gain vs current:"}
                </span>
                <span className="font-mono font-bold text-emerald-600 tabular-nums dark:text-emerald-400">
                  +{atkDelta}% ATK / +{hpDelta}% HP
                </span>
              </div>
            }
          />

          {isInvalidRange ? (
            <div
              role="alert"
              data-testid="relics-invalid-range-warning"
              className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-amber-500/15 p-3 text-amber-800 dark:text-amber-200"
            >
              <div className="flex items-start gap-2">
                <AlertTriangle
                  className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400"
                  aria-hidden="true"
                />
                <p className="font-sans text-xs leading-relaxed">
                  {isVi
                    ? "Đột phá mục tiêu đang thấp hơn Đột phá hiện tại. Số lượng tài nguyên yêu cầu được đặt về 0."
                    : "Target breakthrough state is lower than current state. Required resources are set to 0."}
                </p>
              </div>
              <button
                type="button"
                data-testid="relics-fix-invalid-range-btn"
                onClick={handleAutoFixRange}
                className={cn(
                  CALC_MD3.chipButton,
                  "bg-amber-500 font-sans text-xs font-bold text-slate-950 hover:bg-amber-400"
                )}
              >
                {isVi ? "Tự nâng +1★" : "Auto +1★"}
              </button>
            </div>
          ) : null}
        </section>
      </div>

      {/* 3. Bottom Row — ZONE 4: Unified Resources Panel (3 Vertical Cards × 3 Horizontal Columns with K/M) */}
      <section
        data-testid="relics-resources-panel"
        className={cn(CALC_MD3.surfaceCard, "space-y-4")}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className={CALC_MD3.sectionTitle}>
              {isVi ? "Tài Nguyên" : "Resources"}
            </h2>
            <p className="mt-0.5 font-sans text-xs text-muted-foreground">
              {isVi
                ? "Nhập số lượng đang có (hỗ trợ gõ tắt 330, 1.8k, 20k) để tự động tính số lượng còn thiếu hoặc dư"
                : "Enter owned amounts (supports 330, 1.8k, 20k shorthand) to automatically compute missing or surplus materials"}
            </p>
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-3 py-1 font-sans text-xs font-semibold text-amber-800 dark:text-amber-300">
            <CheckCircle2
              className="h-4 w-4 text-amber-500"
              aria-hidden="true"
            />
            <span className="font-mono font-bold tabular-nums">
              {fromStar}★ ({effectiveFromSubStep}/5) ➔ {toStar}★ (
              {effectiveToSubStep}/5)
            </span>
          </span>
        </div>

        <div className="space-y-3">
          {/* Card 1: Universal Relic Shard (Legendary / Epic / Rare) */}
          <div
            data-testid="relics-resource-card-shards"
            className={cn(CALC_MD3.tonalGroup, "space-y-3")}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-background/90 p-1.5 shadow-sm">
                  <Image
                    src={activeShardMaterial.iconPath}
                    alt={shardMaterialName}
                    width={32}
                    height={32}
                    className="h-8 w-8 object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="truncate font-heading text-sm sm:text-base font-bold text-foreground">
                    {shardMaterialName}
                  </h3>
                  <p className="font-sans text-xs text-muted-foreground">
                    <span className="font-mono font-semibold text-foreground tabular-nums">
                      {fromStar}★ ➔ {toStar}★
                    </span>{" "}
                    •{" "}
                    {isVi ? "Cộng " : "Adds "}
                    <span
                      title={formatExactNumber(
                        singleResult.garPointsFromRequiredShards
                      )}
                      className="font-mono font-semibold text-amber-600 tabular-nums dark:text-amber-400"
                    >
                      +
                      {formatCompactNumber(
                        singleResult.garPointsFromRequiredShards
                      )}
                    </span>{" "}
                    <span>{isVi ? "điểm GAR/KvK" : "GAR/KvK pts"}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-sans text-xs text-muted-foreground">
                  {isVi ? "Tiến độ:" : "Progress:"}
                </span>
                <span className="font-mono text-xs font-bold text-foreground tabular-nums">
                  {shardCompletionPercent}%
                </span>
              </div>
            </div>

            <div className="h-1.5 w-full overflow-hidden rounded-full bg-background/80">
              <div
                className={cn(
                  "h-full rounded-full transition-all",
                  isShardsSufficient ? "bg-emerald-500" : "bg-amber-500"
                )}
                style={{ width: `${shardCompletionPercent}%` }}
              />
            </div>

            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
              {/* Column 1: Required */}
              <div className="flex flex-col justify-center rounded-xl bg-background/80 px-3 py-2.5">
                <span className="font-sans text-xs font-medium text-muted-foreground">
                  {isVi ? "Số lượng yêu cầu" : "Required"}
                </span>
                <span
                  data-testid="relics-required-shards"
                  title={formatExactNumber(singleResult.requiredShards)}
                  className="mt-0.5 font-mono text-xl font-black text-amber-600 tabular-nums dark:text-amber-400"
                >
                  {formatCompactNumber(singleResult.requiredShards)}
                </span>
                <span className="font-mono text-xs text-muted-foreground tabular-nums">
                  {formatExactNumber(singleResult.requiredShards)}
                </span>
              </div>

              {/* Column 2: Owned Input */}
              <div className="flex flex-col justify-center rounded-xl bg-background/80 px-3 py-2.5">
                <div className="flex items-center justify-between gap-2">
                  <label
                    htmlFor="relics-owned-shards-input"
                    className="font-sans text-xs font-medium text-muted-foreground"
                  >
                    {isVi ? "Số lượng đang có" : "Owned"}
                  </label>
                  {ownedShards > 0 ? (
                    <span className="font-mono text-xs font-semibold text-amber-600 tabular-nums dark:text-amber-400">
                      = {formatExactNumber(ownedShards)}
                    </span>
                  ) : null}
                </div>
                <input
                  id="relics-owned-shards-input"
                  data-testid="relics-owned-shards-input"
                  type="text"
                  inputMode="decimal"
                  placeholder={isVi ? "VD: 330, 1k, 1.8k" : "e.g. 330, 1k, 1.8k"}
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
                  data-testid="relics-missing-shards"
                  title={formatExactNumber(
                    isShardsSufficient
                      ? singleResult.surplusShards
                      : singleResult.deficitShards
                  )}
                  className="mt-0.5"
                >
                  {isShardsSufficient ? (
                    <span className="font-sans text-sm font-bold">
                      {isVi
                        ? `Đủ nguyên liệu (+Dư ${formatCompactNumber(singleResult.surplusShards)})`
                        : `Sufficient (+Surplus ${formatCompactNumber(singleResult.surplusShards)})`}
                    </span>
                  ) : (
                    <span className="font-mono text-xl font-black tabular-nums">
                      {formatCompactNumber(singleResult.deficitShards)}
                    </span>
                  )}
                </div>
                {!isShardsSufficient && singleResult.deficitShards >= 1_000 ? (
                  <span className="font-mono text-xs opacity-80 tabular-nums">
                    {formatExactNumber(singleResult.deficitShards)}
                  </span>
                ) : null}
              </div>
            </div>
          </div>

          {/* Card 2: Arcane Crystal (Pha Lê Bí Thuật — Breakthroughs at 5★/10★/15★/20★) */}
          <div
            data-testid="relics-resource-card-crystals"
            className={cn(CALC_MD3.tonalGroup, "space-y-3")}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-background/90 p-1.5 shadow-sm">
                  <Image
                    src={CALCULATOR_MATERIALS.arcaneCrystal.iconPath}
                    alt={crystalMaterialName}
                    width={32}
                    height={32}
                    className="h-8 w-8 object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="truncate font-heading text-sm sm:text-base font-bold text-foreground">
                    {crystalMaterialName}
                  </h3>
                  <p className="font-sans text-xs text-muted-foreground">
                    {isVi ? "Qua " : "Crosses "}
                    <span className="font-mono font-semibold text-foreground tabular-nums">
                      {singleResult.breakthroughCountCrossed}
                    </span>{" "}
                    {isVi
                      ? "mốc Đột Phá Bậc (5★ / 10★ / 15★ / 20★)"
                      : "Tier Breakthroughs (5★ / 10★ / 15★ / 20★)"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-sans text-xs text-muted-foreground">
                  {isVi ? "Tiến độ:" : "Progress:"}
                </span>
                <span className="font-mono text-xs font-bold text-foreground tabular-nums">
                  {crystalCompletionPercent}%
                </span>
              </div>
            </div>

            <div className="h-1.5 w-full overflow-hidden rounded-full bg-background/80">
              <div
                className={cn(
                  "h-full rounded-full transition-all",
                  isCrystalsSufficient ? "bg-emerald-500" : "bg-amber-500"
                )}
                style={{ width: `${crystalCompletionPercent}%` }}
              />
            </div>

            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
              {/* Column 1: Required */}
              <div className="flex flex-col justify-center rounded-xl bg-background/80 px-3 py-2.5">
                <span className="font-sans text-xs font-medium text-muted-foreground">
                  {isVi ? "Số lượng yêu cầu" : "Required"}
                </span>
                <span
                  data-testid="relics-required-crystals"
                  title={formatExactNumber(singleResult.requiredArcaneCrystals)}
                  className="mt-0.5 font-mono text-xl font-black text-amber-600 tabular-nums dark:text-amber-400"
                >
                  {formatCompactNumber(singleResult.requiredArcaneCrystals)}
                </span>
                <span className="font-mono text-xs text-muted-foreground tabular-nums">
                  {formatExactNumber(singleResult.requiredArcaneCrystals)}
                </span>
              </div>

              {/* Column 2: Owned Input */}
              <div className="flex flex-col justify-center rounded-xl bg-background/80 px-3 py-2.5">
                <div className="flex items-center justify-between gap-2">
                  <label
                    htmlFor="relics-owned-crystals-input"
                    className="font-sans text-xs font-medium text-muted-foreground"
                  >
                    {isVi ? "Số lượng đang có" : "Owned"}
                  </label>
                  {ownedArcaneCrystals > 0 ? (
                    <span className="font-mono text-xs font-semibold text-amber-600 tabular-nums dark:text-amber-400">
                      = {formatExactNumber(ownedArcaneCrystals)}
                    </span>
                  ) : null}
                </div>
                <input
                  id="relics-owned-crystals-input"
                  data-testid="relics-owned-crystals-input"
                  type="text"
                  inputMode="decimal"
                  placeholder={isVi ? "VD: 35, 185, 2k" : "e.g. 35, 185, 2k"}
                  value={ownedArcaneCrystalsInput}
                  onChange={(e) => setOwnedArcaneCrystalsInput(e.target.value)}
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
                  isCrystalsSufficient
                    ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                    : "bg-amber-500/10 text-amber-800 dark:text-amber-300"
                )}
              >
                <span className="font-sans text-xs font-medium">
                  {isVi ? "Số lượng còn thiếu" : "Missing"}
                </span>
                <div
                  data-testid="relics-missing-crystals"
                  title={formatExactNumber(
                    isCrystalsSufficient
                      ? surplusCrystals
                      : singleResult.deficitArcaneCrystals
                  )}
                  className="mt-0.5"
                >
                  {isCrystalsSufficient ? (
                    <span className="font-sans text-sm font-bold">
                      {isVi
                        ? `Đủ nguyên liệu (+Dư ${formatCompactNumber(surplusCrystals)})`
                        : `Sufficient (+Surplus ${formatCompactNumber(surplusCrystals)})`}
                    </span>
                  ) : (
                    <span className="font-mono text-xl font-black tabular-nums">
                      {formatCompactNumber(singleResult.deficitArcaneCrystals)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Magic Stone (Đá Vân Ma Thuật — Tier 1 ➔ Tier 4 Sync) */}
          <div
            data-testid="relics-resource-card-stones"
            className={cn(CALC_MD3.tonalGroup, "space-y-3")}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-background/90 p-1.5 shadow-sm">
                  <Image
                    src={CALCULATOR_MATERIALS.magicStone.iconPath}
                    alt={stoneMaterialName}
                    width={32}
                    height={32}
                    className="h-8 w-8 object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="truncate font-heading text-sm sm:text-base font-bold text-foreground">
                    {stoneMaterialName}
                  </h3>
                  <p className="font-sans text-xs text-muted-foreground">
                    {isVi
                      ? "Đồng bộ bậc Bí Bảo (Tier 1 ➔ Tier 4)"
                      : "Relic Tier Synchronization (Tier 1 ➔ Tier 4)"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-sans text-xs text-muted-foreground">
                  {isVi ? "Tiến độ:" : "Progress:"}
                </span>
                <span className="font-mono text-xs font-bold text-foreground tabular-nums">
                  {stoneCompletionPercent}%
                </span>
              </div>
            </div>

            <div className="h-1.5 w-full overflow-hidden rounded-full bg-background/80">
              <div
                className={cn(
                  "h-full rounded-full transition-all",
                  isStonesSufficient ? "bg-emerald-500" : "bg-amber-500"
                )}
                style={{ width: `${stoneCompletionPercent}%` }}
              />
            </div>

            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
              {/* Column 1: Required */}
              <div className="flex flex-col justify-center rounded-xl bg-background/80 px-3 py-2.5">
                <span className="font-sans text-xs font-medium text-muted-foreground">
                  {isVi ? "Số lượng yêu cầu" : "Required"}
                </span>
                <span
                  data-testid="relics-required-stones"
                  title={formatExactNumber(singleResult.requiredMagicStones)}
                  className="mt-0.5 font-mono text-xl font-black text-amber-600 tabular-nums dark:text-amber-400"
                >
                  {formatCompactNumber(singleResult.requiredMagicStones)}
                </span>
                <span className="font-mono text-xs text-muted-foreground tabular-nums">
                  {formatExactNumber(singleResult.requiredMagicStones)}
                </span>
              </div>

              {/* Column 2: Owned Input */}
              <div className="flex flex-col justify-center rounded-xl bg-background/80 px-3 py-2.5">
                <div className="flex items-center justify-between gap-2">
                  <label
                    htmlFor="relics-owned-stones-input"
                    className="font-sans text-xs font-medium text-muted-foreground"
                  >
                    {isVi ? "Số lượng đang có" : "Owned"}
                  </label>
                  {ownedMagicStones > 0 ? (
                    <span className="font-mono text-xs font-semibold text-amber-600 tabular-nums dark:text-amber-400">
                      = {formatExactNumber(ownedMagicStones)}
                    </span>
                  ) : null}
                </div>
                <input
                  id="relics-owned-stones-input"
                  data-testid="relics-owned-stones-input"
                  type="text"
                  inputMode="decimal"
                  placeholder={isVi ? "VD: 2k, 20k, 50k" : "e.g. 2k, 20k, 50k"}
                  value={ownedMagicStonesInput}
                  onChange={(e) => setOwnedMagicStonesInput(e.target.value)}
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
                  isStonesSufficient
                    ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                    : "bg-amber-500/10 text-amber-800 dark:text-amber-300"
                )}
              >
                <span className="font-sans text-xs font-medium">
                  {isVi ? "Số lượng còn thiếu" : "Missing"}
                </span>
                <div
                  data-testid="relics-missing-stones"
                  title={formatExactNumber(
                    isStonesSufficient
                      ? surplusStones
                      : singleResult.deficitMagicStones
                  )}
                  className="mt-0.5"
                >
                  {isStonesSufficient ? (
                    <span className="font-sans text-sm font-bold">
                      {isVi
                        ? `Đủ nguyên liệu (+Dư ${formatCompactNumber(surplusStones)})`
                        : `Sufficient (+Surplus ${formatCompactNumber(surplusStones)})`}
                    </span>
                  ) : (
                    <span className="font-mono text-xl font-black tabular-nums">
                      {formatCompactNumber(singleResult.deficitMagicStones)}
                    </span>
                  )}
                </div>
                {!isStonesSufficient &&
                singleResult.deficitMagicStones >= 1_000 ? (
                  <span className="font-mono text-xs opacity-80 tabular-nums">
                    {formatExactNumber(singleResult.deficitMagicStones)}
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

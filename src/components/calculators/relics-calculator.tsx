"use client";

import Image from "next/image";
import React, { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Lock,
  RotateCcw,
  Sparkles,
  Unlock,
  X,
} from "lucide-react";
import {
  RELIC_HALL_MAX_LEVEL,
  RELIC_HALL_MILESTONE_LEVELS,
  RELIC_HALL_MIN_LEVEL,
  clampRelicHallLevel,
} from "@/content/calculators/relic-hall-data";
import {
  RELIC_CATALOG,
  RELIC_FACTION_SETS,
  RELIC_RARITY_TABLES,
  RELIC_STAR_TIERS,
  RELIC_UNLOCK_SHARDS_COST,
  calculateRelicStarUpgrade,
  type RelicCatalogItem,
  type RelicRarity,
} from "@/content/calculators/relics-data";
import { CALCULATOR_MATERIALS } from "@/content/calculators/registry";
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
import { RelicStarPetalSelector } from "./relic-star-petal-selector";

export interface RelicsCalculatorProps {
  readonly zone?: CalculatorZone;
  readonly category: CalculatorCategory;
  readonly tool: CalculatorToolItem;
  readonly locale: CalculatorLocale;
}

export type RelicPickerGroupId =
  | "legendary_standard"
  | "legendary_league"
  | "legendary_horde"
  | "legendary_nature"
  | "epic_standard"
  | "rare_standard";

type AvatarPickerStep = "group" | "relic";

interface RelicPickerGroupDef {
  readonly id: RelicPickerGroupId;
  readonly rarity: RelicRarity;
  readonly title: Readonly<Record<CalculatorLocale, string>>;
  readonly subtitle: Readonly<Record<CalculatorLocale, string>>;
  readonly badge: Readonly<Record<CalculatorLocale, string>>;
  readonly filter: (item: RelicCatalogItem) => boolean;
}

const RELIC_PICKER_GROUPS: readonly RelicPickerGroupDef[] = [
  {
    id: "legendary_standard",
    rarity: "legendary",
    title: {
      vi: "Bí Bảo Cam Đa Dụng (10 món)",
      en: "Universal Legendary Relics (10 items)",
    },
    subtitle: {
      vi: "Nhẫn Đuôi Công Tước, Vương Miện Băng, Vương Quyền, Đá Trăng Tròn...",
      en: "Duke's Signet Ring, Frost Diadem, Royalty, Moonstone...",
    },
    badge: { vi: "Cam • Đa phe", en: "Legendary • Any" },
    filter: (item) => item.rarity === "legendary" && !item.factionId,
  },
  {
    id: "legendary_league",
    rarity: "legendary",
    title: {
      vi: "Bộ Trấn Phái Liên Minh (League)",
      en: "League Faction Trio",
    },
    subtitle: {
      vi: "Kim Trượng Thạch Hóa • Ngọc Hộ Mệnh • Lông Vũ Khế Ước",
      en: "Petrification Staff • Soul Guard Orb • Feather of the Pact",
    },
    badge: { vi: "Cam • Liên Minh", en: "Legendary • League" },
    filter: (item) => item.factionId === "league",
  },
  {
    id: "legendary_horde",
    rarity: "legendary",
    title: {
      vi: "Bộ Trấn Phái Bộ Tộc (Horde)",
      en: "Horde Faction Trio",
    },
    subtitle: {
      vi: "Phán Quyết Thiên Lôi • Tâm Long • Bùa Long Trảo",
      en: "Thunder Judgment • Dragonheart • Dragonbone Amulet",
    },
    badge: { vi: "Cam • Bộ Tộc", en: "Legendary • Horde" },
    filter: (item) => item.factionId === "horde",
  },
  {
    id: "legendary_nature",
    rarity: "legendary",
    title: {
      vi: "Bộ Trấn Phái Thiên Nhiên (Nature)",
      en: "Nature Faction Trio",
    },
    subtitle: {
      vi: "Cung Dây Leo • Vương Miện Bất Bại • Cuộn Thánh Thư",
      en: "Vineborne Bow • Undefeated Crown • Sacred Scroll",
    },
    badge: { vi: "Cam • Thiên Nhiên", en: "Legendary • Nature" },
    filter: (item) => item.factionId === "nature",
  },
  {
    id: "epic_standard",
    rarity: "epic",
    title: {
      vi: "Bí Bảo Tím (Epic — 7 món)",
      en: "Epic Relics (7 items)",
    },
    subtitle: {
      vi: "Nanh Độc, Cầu Phép, Giao Ước, Kèn Nguyên Soái, Đá Ma, Ếch Điện, Mắt Sợ Hãi",
      en: "Venom Fang, Terra Orb, Vowkeeper, Marshal's Warhorn, Electric Frog...",
    },
    badge: { vi: "Tím • 3,150 mảnh", en: "Epic • 3,150 shards" },
    filter: (item) => item.rarity === "epic",
  },
  {
    id: "rare_standard",
    rarity: "rare",
    title: {
      vi: "Bí Bảo Lam (Rare — 3 món)",
      en: "Rare Relics (3 items)",
    },
    subtitle: {
      vi: "Bình Bí Dược • Trâm Cân Bằng • Bùa Anh Hùng",
      en: "Elixir Bottle • Balance Brooch • Hero's Amulet",
    },
    badge: { vi: "Lam • 4,860 mảnh", en: "Rare • 4,860 shards" },
    filter: (item) => item.rarity === "rare",
  },
] as const;

const DEFAULT_RELIC_ID = 150001; // Nhẫn Đuôi Công Tước (Duke's Signet Ring)
const DEFAULT_FROM_PETAL = 0; // 0★ (0/5)
const DEFAULT_TO_PETAL = 40; // 8★ (0/5) ROI Sweet Spot
const DEFAULT_HALL_LEVEL = 60; // Lv.60 (+191.4%)

export function RelicsCalculator({ tool, locale }: RelicsCalculatorProps) {
  const isVi = locale === "vi";

  const [selectedRelicId, setSelectedRelicId] =
    useState<number>(DEFAULT_RELIC_ID);
  const [fromPetalIndex, setFromPetalIndex] =
    useState<number>(DEFAULT_FROM_PETAL);
  const [toPetalIndex, setToPetalIndex] = useState<number>(DEFAULT_TO_PETAL);
  const [relicHallLevel, setRelicHallLevel] =
    useState<number>(DEFAULT_HALL_LEVEL);
  const [includeUnlockCost, setIncludeUnlockCost] = useState<boolean>(false);

  const [ownedSpecificText, setOwnedSpecificText] = useState<string>("");
  const [ownedUniversalText, setOwnedUniversalText] = useState<string>("");

  const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false);
  const [pickerStep, setPickerStep] = useState<AvatarPickerStep>("group");
  const [activeGroupId, setActiveGroupId] =
    useState<RelicPickerGroupId>("legendary_standard");

  const ownedSpecificShards = useMemo(
    () => parseCompactNumberInput(ownedSpecificText),
    [ownedSpecificText]
  );
  const ownedUniversalShards = useMemo(
    () => parseCompactNumberInput(ownedUniversalText),
    [ownedUniversalText]
  );

  const calculation = useMemo(
    () =>
      calculateRelicStarUpgrade({
        relicId: selectedRelicId,
        fromPetalIndex,
        toPetalIndex,
        relicHallLevel,
        includeUnlockCost,
        ownedSpecificShards,
        ownedUniversalShards,
      }),
    [
      selectedRelicId,
      fromPetalIndex,
      toPetalIndex,
      relicHallLevel,
      includeUnlockCost,
      ownedSpecificShards,
      ownedUniversalShards,
    ]
  );

  const { relic, fromState, toState } = calculation;

  const universalMaterial = useMemo(() => {
    if (relic.rarity === "legendary") {
      return CALCULATOR_MATERIALS.legendaryUniversalRelicShard;
    }
    if (relic.rarity === "epic") {
      return CALCULATOR_MATERIALS.epicUniversalRelicShard;
    }
    return CALCULATOR_MATERIALS.rareUniversalRelicShard;
  }, [relic.rarity]);

  const universalMaterialName = isVi
    ? universalMaterial.nameVi
    : universalMaterial.nameEn;

  const activeGroupDef = useMemo(
    () =>
      RELIC_PICKER_GROUPS.find((g) => g.id === activeGroupId) ??
      RELIC_PICKER_GROUPS[0],
    [activeGroupId]
  );

  const groupRelics = useMemo(
    () => RELIC_CATALOG.filter(activeGroupDef.filter),
    [activeGroupDef]
  );

  const handleOpenPicker = () => {
    setPickerStep("group");
    setIsPickerOpen((prev) => !prev);
  };

  const handleSelectGroup = (groupId: RelicPickerGroupId) => {
    setActiveGroupId(groupId);
    setPickerStep("relic");
  };

  const handleSelectRelic = (relicId: number) => {
    setSelectedRelicId(relicId);
    setIsPickerOpen(false);
  };

  const handleReset = () => {
    setSelectedRelicId(DEFAULT_RELIC_ID);
    setFromPetalIndex(DEFAULT_FROM_PETAL);
    setToPetalIndex(DEFAULT_TO_PETAL);
    setRelicHallLevel(DEFAULT_HALL_LEVEL);
    setIncludeUnlockCost(false);
    setOwnedSpecificText("");
    setOwnedUniversalText("");
    setIsPickerOpen(false);
  };

  const slotRoleLabel = (role: RelicCatalogItem["slotRole"]) => {
    if (role === "offense") {
      return isVi ? "Ô 1 • Công" : "Slot 1 • Offense";
    }
    if (role === "defense") {
      return isVi ? "Ô 2 • Thủ" : "Slot 2 • Defense";
    }
    return isVi ? "Ô 3 • Hỗ Trợ" : "Slot 3 • Support";
  };

  const totalSurplusShards =
    calculation.surplusSpecificShards + calculation.surplusUniversalShards;

  return (
    <div data-testid="relics-calculator" className="space-y-3.5">
      {/* Header phẳng MD3 + nút (i) sổ tay 20★ & Áp Chế Sao Cam */}
      <CalculatorToolHeader
        code={tool.code}
        title={tool.title[locale]}
        actions={
          <>
            <button
              type="button"
              data-testid="relics-reset-btn"
              onClick={handleReset}
              className={cn(
                CALC_MD3.chipButton,
                "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              <span>{isVi ? "Đặt lại" : "Reset"}</span>
            </button>

            <CalculatorInfoPopover
              title={
                isVi
                  ? "Sổ Tay 20 Sao Bí Bảo (100 Cánh Sao) & Quy Luật Áp Chế -50%"
                  : "20-Star Relic Guide (100 Petals) & -50% Star Suppression"
              }
              subtitle={
                isVi
                  ? "Trích xuất chính xác từ bảng artifact_star_up_new (version = 1)"
                  : "Authentic game data from artifact_star_up_new (version = 1)"
              }
              locale={locale}
              triggerTestId="relics-info-trigger"
              dialogTestId="relics-info-dialog"
            >
              <div className="space-y-4">
                <div className={cn(CALC_MD3.tonalGroup, "space-y-2")}>
                  <h5 className="font-heading text-xs sm:text-sm font-bold text-foreground">
                    {isVi
                      ? "1. Bảng Cột Mốc Mảnh Bí Bảo SSoT (0★ ➔ 20★ = 100 Cánh Sao)"
                      : "1. SSoT Relic Shard Milestones (0★ ➔ 20★ = 100 Petals)"}
                  </h5>
                  <ul className="space-y-1 font-sans text-xs text-muted-foreground">
                    {RELIC_STAR_TIERS.map((tier) => (
                      <li key={tier.id}>
                        <span className="font-bold text-foreground">
                          {tier.label[locale]}
                        </span>
                        {`: `}
                        {isVi
                          ? `Cam ${RELIC_RARITY_TABLES.legendary.tierTotals[tier.tierIndex - 1]} mảnh • Tím ${RELIC_RARITY_TABLES.epic.tierTotals[tier.tierIndex - 1]} mảnh • Lam ${formatExactNumber(RELIC_RARITY_TABLES.rare.tierTotals[tier.tierIndex - 1])} mảnh`
                          : `Legendary ${RELIC_RARITY_TABLES.legendary.tierTotals[tier.tierIndex - 1]} • Epic ${RELIC_RARITY_TABLES.epic.tierTotals[tier.tierIndex - 1]} • Rare ${formatExactNumber(RELIC_RARITY_TABLES.rare.tierTotals[tier.tierIndex - 1])} shards`}
                      </li>
                    ))}
                    <li className="pt-1 font-bold text-amber-600 dark:text-amber-400">
                      {isVi
                        ? "• Tổng cộng 0★ ➔ 20★: Bí Bảo Cam = 1,800 mảnh | Bí Bảo Tím = 3,150 mảnh | Bí Bảo Lam = 4,860 mảnh (+10 mảnh nếu chưa tìm thấy)."
                        : "• Full 0★ ➔ 20★ Total: Legendary = 1,800 shards | Epic = 3,150 shards | Rare = 4,860 shards (+10 shards if locked)."}
                    </li>
                  </ul>
                </div>

                <div className={cn(CALC_MD3.tonalGroup, "space-y-2")}>
                  <h5 className="font-heading text-xs sm:text-sm font-bold text-foreground">
                    {isVi
                      ? "2. Quy Luật Áp Chế Sao Cam -50% (Star Rating Suppression)"
                      : "2. -50% Legendary Star Rating Suppression"}
                  </h5>
                  <p className="font-sans text-xs text-muted-foreground">
                    {isVi
                      ? "Trong giao tranh PvP, hệ thống cộng tổng số Sao của các Bí Bảo Cam (Legendary) trong Đội Hình. Đội có tổng Sao Cam cao hơn (dù chỉ hơn +1★) sẽ kích hoạt Áp Chế -50%, cắt giảm một nửa sát thương, hồi máu và thời gian hiệu lực Bí Bảo của đối phương."
                      : "In PvP combat, the game compares the total Legendary Relic Stars equipped in the queue. Having even +1★ more Legendary Stars triggers -50% Star Suppression, halving enemy Relic damage, healing, and effect durations."}
                  </p>
                </div>

                <div className={cn(CALC_MD3.tonalGroup, "space-y-2")}>
                  <h5 className="font-heading text-xs sm:text-sm font-bold text-foreground">
                    {isVi
                      ? "3. Bộ 3 Bí Bảo Trấn Phái Theo Phe"
                      : "3. Best-in-Slot Faction Relic Trios"}
                  </h5>
                  <div className="space-y-2">
                    {RELIC_FACTION_SETS.map((fSet) => (
                      <div
                        key={fSet.id}
                        className="rounded-xl bg-background/60 p-2.5 space-y-1"
                      >
                        <p className="font-sans text-xs font-bold text-foreground">
                          {`${fSet.factionName[locale]} — ${fSet.setName[locale]}`}
                        </p>
                        <p className="font-sans text-xs text-muted-foreground">
                          {fSet.synergyBonus[locale]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CalculatorInfoPopover>
          </>
        }
      />

      {/* Cảnh báo nếu sao mục tiêu < sao hiện tại */}
      {calculation.isInvalidRange ? (
        <div
          data-testid="relics-invalid-range-alert"
          className={cn(
            CALC_MD3.surfaceCard,
            "flex items-center gap-3 bg-amber-500/10 text-amber-700 dark:text-amber-300"
          )}
        >
          <AlertTriangle className="h-5 w-5 shrink-0" aria-hidden="true" />
          <p className="font-sans text-xs sm:text-sm font-semibold">
            {isVi
              ? "Sao mục tiêu đang nhỏ hơn Sao hiện tại. Vui lòng chọn Sao Mục Tiêu cao hơn."
              : "Target star/petal is lower than Current star/petal. Please choose a higher Target."}
          </p>
        </div>
      ) : null}

      {/* Main 1/3 + 2/3 Workbench on PC: Left 1/3 (Relic Avatar + Ownership + Hall Level + (i) Delta) | Right 2/3 (Row 1: Current Star, Row 2: Target Star) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
        {/* CỘT 1/3 — Avatar Bí Bảo + Nút (i) So sánh chỉ số + Trạng thái sở hữu + Cấp Sảnh Bí Bảo */}
        <section
          data-testid="relics-zone-avatar"
          className={cn(
            CALC_MD3.surfaceCard,
            "relative lg:col-span-4 flex flex-col justify-between space-y-3"
          )}
        >
          {/* Header cột 1/3: Badge Phẩm chất/Ô + Nút (i) So Sánh Chỉ Số (Hiện Tại ➔ Mục Tiêu) */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="rounded-lg bg-amber-500/15 px-2.5 py-0.5 font-sans text-xs font-bold text-amber-700 dark:text-amber-300">
                {calculation.rarityTable.shortName[locale]}
              </span>
              <span className="rounded-lg bg-muted/60 px-2.5 py-0.5 font-sans text-xs font-semibold text-muted-foreground">
                {slotRoleLabel(relic.slotRole)}
              </span>
            </div>

            <CalculatorInfoPopover
              title={
                isVi
                  ? `So Sánh Chỉ Số — ${relic.name.vi}`
                  : `Attribute Comparison — ${relic.name.en}`
              }
              subtitle={
                isVi
                  ? `${fromState.starLevel}★ (${fromState.subStep}/5) ➔ ${toState.starLevel}★ (${toState.subStep}/5) • Sảnh Lv.${relicHallLevel} (+${fromState.relicHallBoostPercent}%)`
                  : `${fromState.starLevel}★ (${fromState.subStep}/5) ➔ ${toState.starLevel}★ (${toState.subStep}/5) • Hall Lv.${relicHallLevel} (+${fromState.relicHallBoostPercent}%)`
              }
              locale={locale}
              triggerLabel={
                isVi
                  ? "Xem so sánh chỉ số tăng thêm của Bí Bảo"
                  : "View Relic attribute gain comparison"
              }
              triggerTestId="relics-avatar-info-trigger"
              dialogTestId="relics-avatar-info-dialog"
            >
              <div className="space-y-3">
                <div className={cn(CALC_MD3.tonalGroup, "space-y-2.5")}>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-sans text-xs font-semibold text-muted-foreground">
                      {isVi ? "Tấn công Bí Bảo" : "Relic ATK"}
                    </span>
                    <div className="flex items-center gap-1 font-mono text-xs sm:text-sm font-black">
                      <span className="text-muted-foreground">
                        {formatExactNumber(fromState.effectiveAtk)}
                      </span>
                      <ArrowRight
                        className="h-3.5 w-3.5 text-amber-500"
                        aria-hidden="true"
                      />
                      <span className="text-foreground">
                        {formatExactNumber(toState.effectiveAtk)}
                      </span>
                      <span
                        data-testid="relics-delta-atk"
                        className="text-emerald-600 dark:text-emerald-400"
                      >
                        {`(+${formatExactNumber(calculation.atkDelta)})`}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <span className="font-sans text-xs font-semibold text-muted-foreground">
                      {isVi ? "HP Bí Bảo" : "Relic HP"}
                    </span>
                    <div className="flex items-center gap-1 font-mono text-xs sm:text-sm font-black">
                      <span className="text-muted-foreground">
                        {formatExactNumber(fromState.effectiveHp)}
                      </span>
                      <ArrowRight
                        className="h-3.5 w-3.5 text-amber-500"
                        aria-hidden="true"
                      />
                      <span className="text-foreground">
                        {formatExactNumber(toState.effectiveHp)}
                      </span>
                      <span
                        data-testid="relics-delta-hp"
                        className="text-emerald-600 dark:text-emerald-400"
                      >
                        {`(+${formatExactNumber(calculation.hpDelta)})`}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <span className="font-sans text-xs font-semibold text-muted-foreground">
                      {isVi ? "Bonus Anh Hùng (ATK / HP)" : "All-Hero Bonus (ATK / HP)"}
                    </span>
                    <div className="flex items-center gap-1 font-mono text-xs sm:text-sm font-black">
                      <span className="text-muted-foreground">
                        {`${fromState.heroAtkPercent}%/${fromState.heroHpPercent}%`}
                      </span>
                      <ArrowRight
                        className="h-3.5 w-3.5 text-amber-500"
                        aria-hidden="true"
                      />
                      <span className="text-emerald-600 dark:text-emerald-400">
                        {`${toState.heroAtkPercent}%/${toState.heroHpPercent}%`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CalculatorInfoPopover>
          </div>

          {/* Central Relic Avatar Button */}
          <div className="flex flex-col items-center text-center space-y-2">
            <button
              type="button"
              data-testid="relics-central-avatar-btn"
              onClick={handleOpenPicker}
              aria-expanded={isPickerOpen}
              aria-label={
                isVi
                  ? `Đổi Bí Bảo (Đang chọn ${relic.name.vi})`
                  : `Change Relic (Selected ${relic.name.en})`
              }
              className="group relative flex flex-col items-center rounded-3xl bg-gradient-to-b from-amber-500/20 via-amber-500/5 to-muted/40 p-3 transition-transform hover:scale-[1.02] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              <div className="relative flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center">
                <Image
                  src={relic.illustrationPath}
                  alt={relic.name[locale]}
                  width={96}
                  height={96}
                  className="h-20 w-20 sm:h-24 sm:w-24 object-contain drop-shadow-md transition-transform group-hover:scale-105"
                />
              </div>
              <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-amber-500 px-3 py-0.5 font-sans text-xs font-black text-slate-950 shadow-sm">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{isVi ? "Đổi Bí Bảo (29 món)" : "Change Relic (29)"}</span>
              </span>
            </button>

            <div className="space-y-0.5">
              <h2 className="font-heading text-base sm:text-lg font-extrabold text-foreground">
                {relic.name[locale]}
              </h2>
              <p className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400">
                {`${fromState.starLevel}★ (${fromState.subStep}/5) ➔ ${toState.starLevel}★ (${toState.subStep}/5)`}
              </p>
            </div>
          </div>

          {/* 2-Step Sequential Avatar Picker Overlay */}
          {isPickerOpen ? (
            <div
              data-testid="relics-avatar-picker-popover"
              data-md3-overlay="true"
              className={cn(CALC_MD3.overlayCard, "z-30 space-y-3")}
            >
              <div className="flex items-center justify-between gap-2">
                {pickerStep === "relic" ? (
                  <button
                    type="button"
                    data-testid="relics-picker-back-to-group"
                    onClick={() => setPickerStep("group")}
                    className={cn(
                      CALC_MD3.chipButton,
                      "bg-muted/60 px-2.5 text-xs font-bold text-foreground hover:bg-muted"
                    )}
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    <span>{isVi ? "Quay lại nhóm" : "Back to groups"}</span>
                  </button>
                ) : (
                  <span className="font-heading text-xs sm:text-sm font-bold text-foreground">
                    {isVi
                      ? "Chọn Nhóm Bí Bảo (29 món)"
                      : "Select Relic Group (29 items)"}
                  </span>
                )}
                <button
                  type="button"
                  data-testid="relics-picker-close-btn"
                  onClick={() => setIsPickerOpen(false)}
                  aria-label={
                    isVi ? "Đóng bộ chọn Bí Bảo" : "Close Relic picker"
                  }
                  className={cn(
                    CALC_MD3.iconButton,
                    "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              {pickerStep === "group" ? (
                <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
                  {RELIC_PICKER_GROUPS.map((grp) => (
                    <button
                      key={grp.id}
                      type="button"
                      data-testid={`relics-group-${grp.id}`}
                      onClick={() => handleSelectGroup(grp.id)}
                      className={cn(
                        CALC_MD3.tonalTile,
                        "flex w-full items-center justify-between gap-2 p-2.5 text-left"
                      )}
                    >
                      <div className="min-w-0 space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className="rounded-md bg-amber-500/15 px-2 py-0.5 font-sans text-xs font-bold text-amber-700 dark:text-amber-300">
                            {grp.badge[locale]}
                          </span>
                          <p className="truncate font-heading text-xs sm:text-sm font-bold text-foreground">
                            {grp.title[locale]}
                          </p>
                        </div>
                        <p className="truncate font-sans text-xs text-muted-foreground">
                          {grp.subtitle[locale]}
                        </p>
                      </div>
                      <ChevronRight
                        className="h-4 w-4 shrink-0 text-muted-foreground"
                        aria-hidden="true"
                      />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-1.5 max-h-72 overflow-y-auto pr-1">
                  {groupRelics.map((item) => {
                    const isSelected = item.id === selectedRelicId;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        data-testid={`relics-item-${item.id}`}
                        onClick={() => handleSelectRelic(item.id)}
                        className={cn(
                          CALC_MD3.tonalTile,
                          "flex w-full items-center gap-3 p-2 text-left",
                          isSelected ? CALC_MD3.tileSelected : ""
                        )}
                      >
                        <Image
                          src={item.illustrationPath}
                          alt={item.name[locale]}
                          width={40}
                          height={40}
                          className="h-10 w-10 shrink-0 object-contain"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-heading text-xs sm:text-sm font-bold text-foreground">
                            {item.name[locale]}
                          </p>
                          <p className="font-sans text-xs text-muted-foreground">
                            {slotRoleLabel(item.slotRole)}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ) : null}

          {/* Controls Group at Bottom of Left 1/3 Column: Ownership Toggle + Relic Hall Level */}
          <div className="space-y-2">
            {/* Compact 1-Line Toggle "Chưa tìm thấy (+10 mảnh mở khóa)" */}
            <div
              className={cn(
                CALC_MD3.tonalGroup,
                "flex items-center justify-between gap-2 px-3 py-2"
              )}
            >
              <span className="font-sans text-xs font-bold text-foreground">
                {isVi ? "Trạng thái sở hữu" : "Ownership"}
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={includeUnlockCost}
                data-testid="relics-unlock-cost-toggle"
                onClick={() => setIncludeUnlockCost((prev) => !prev)}
                className={cn(
                  CALC_MD3.chipButton,
                  "shrink-0 px-3 font-sans text-xs font-bold",
                  includeUnlockCost
                    ? "bg-amber-500 text-slate-950 shadow-sm"
                    : "bg-background/70 text-foreground hover:bg-amber-500/15"
                )}
              >
                {includeUnlockCost ? (
                  <>
                    <Lock className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>
                      {isVi
                        ? `Chưa tìm thấy (+${RELIC_UNLOCK_SHARDS_COST})`
                        : `Not Found (+${RELIC_UNLOCK_SHARDS_COST})`}
                    </span>
                  </>
                ) : (
                  <>
                    <Unlock className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{isVi ? "Đã tìm thấy" : "Already Owned"}</span>
                  </>
                )}
              </button>
            </div>

            {/* Đồng bộ Cấp Sảnh Bí Bảo (Lv.1..250 -> Tăng Tỉ Lệ ATK/HP Bí Bảo) */}
            <div className={cn(CALC_MD3.tonalGroup, "space-y-2 p-2.5 sm:p-3")}>
              <div className="flex items-center justify-between gap-2">
                <span className="font-sans text-xs font-bold text-foreground">
                  {isVi ? "Cấp Sảnh Bí Bảo" : "Relic Hall Level"}
                </span>
                <span
                  data-testid="relics-hall-boost-readout"
                  className="font-mono text-xs font-black text-amber-600 dark:text-amber-400"
                >
                  {`Lv.${relicHallLevel} (+${fromState.relicHallBoostPercent}%)`}
                </span>
              </div>

              <div className="grid grid-cols-7 gap-1">
                {RELIC_HALL_MILESTONE_LEVELS.map((mLv) => {
                  const active = relicHallLevel === mLv;
                  return (
                    <button
                      key={mLv}
                      type="button"
                      data-testid={`relics-hall-chip-${mLv}`}
                      onClick={() => setRelicHallLevel(mLv)}
                      className={cn(
                        CALC_MD3.chipButton,
                        "px-1 font-mono text-xs font-bold",
                        active
                          ? "bg-amber-500 text-slate-950 shadow-sm"
                          : "bg-background/70 text-foreground hover:bg-amber-500/15"
                      )}
                    >
                      {mLv}
                    </button>
                  );
                })}
              </div>

              <input
                type="range"
                min={RELIC_HALL_MIN_LEVEL}
                max={RELIC_HALL_MAX_LEVEL}
                step={1}
                data-testid="relics-hall-level-slider"
                value={relicHallLevel}
                aria-label={
                  isVi
                    ? "Chọn Cấp Sảnh Bí Bảo từ 1 đến 250"
                    : "Select Relic Hall Level from 1 to 250"
                }
                onChange={(event) =>
                  setRelicHallLevel(
                    clampRelicHallLevel(Number(event.target.value))
                  )
                }
                className="h-2.5 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-amber-500"
              />
            </div>
          </div>
        </section>

        {/* CỘT 2/3 — Chia thành 2 Dòng: Dòng Trên (Sao Hiện Tại) & Dòng Dưới (Sao Mục Tiêu) */}
        <div className="lg:col-span-8 flex flex-col justify-between gap-3.5">
          {/* DÒNG TRÊN — Sao Hiện Tại */}
          <section
            data-testid="relics-zone-current"
            className={cn(CALC_MD3.surfaceCard, "flex-1 flex flex-col justify-center")}
          >
            <RelicStarPetalSelector
              idPrefix="from"
              title={isVi ? "Sao Hiện Tại" : "Current Star"}
              badgeLabel={isVi ? "Điểm xuất phát" : "Start"}
              snapshot={fromState}
              locale={locale}
              onChangePetalIndex={setFromPetalIndex}
            />
          </section>

          {/* DÒNG DƯỚI — Sao Mục Tiêu */}
          <section
            data-testid="relics-zone-target"
            className={cn(CALC_MD3.surfaceCard, "flex-1 flex flex-col justify-center")}
          >
            <RelicStarPetalSelector
              idPrefix="to"
              title={isVi ? "Sao Mục Tiêu" : "Target Star"}
              badgeLabel={isVi ? "Đích đến" : "Target"}
              snapshot={toState}
              locale={locale}
              onChangePetalIndex={setToPetalIndex}
            />
          </section>
        </div>
      </div>

      {/* ZONE 4 — Hàng Nguyên Liệu Thu Gọn 1 Dòng (Compact Horizontal KPI Strip) */}
      <section
        data-testid="relics-resources-panel"
        className={cn(CALC_MD3.surfaceCard, "space-y-2.5")}
      >
        {/* Compact Header Bar with Inline Total Required & Missing/Surplus Readouts + (i) Popup */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2.5">
            <h2 className={CALC_MD3.sectionTitle}>
              {isVi
                ? "Tổng Kết Mảnh Nâng Sao Bí Bảo"
                : "Relic Star Upgrade Shard Summary"}
            </h2>

            <div className="inline-flex items-center gap-1.5 rounded-xl bg-muted/60 px-3 py-1">
              <span className="font-sans text-xs font-semibold text-muted-foreground">
                {isVi ? "Tổng cần:" : "Required:"}
              </span>
              <span
                data-testid="relics-required-shards"
                title={formatExactNumber(calculation.totalRequiredShards)}
                className="font-mono text-base sm:text-lg font-black text-amber-600 dark:text-amber-400 tabular-nums"
              >
                {formatCompactNumber(calculation.totalRequiredShards)}
              </span>
            </div>

            <div className="inline-flex items-center gap-1.5 rounded-xl bg-muted/60 px-3 py-1">
              <span className="font-sans text-xs font-semibold text-muted-foreground">
                {isVi ? "Trạng thái:" : "Balance:"}
              </span>
              {calculation.missingShards > 0 ? (
                <span
                  data-testid="relics-missing-shards"
                  title={formatExactNumber(calculation.missingShards)}
                  className="font-mono text-sm sm:text-base font-black text-rose-600 dark:text-rose-400 tabular-nums"
                >
                  {formatCompactNumber(calculation.missingShards)}
                </span>
              ) : (
                <span
                  data-testid="relics-missing-shards"
                  title={formatExactNumber(totalSurplusShards)}
                  className="inline-flex items-center gap-1 font-sans text-xs font-bold text-emerald-600 dark:text-emerald-400"
                >
                  <CheckCircle2
                    className="h-3.5 w-3.5 shrink-0"
                    aria-hidden="true"
                  />
                  {isVi
                    ? `Đủ nguyên liệu (+Dư ${formatCompactNumber(totalSurplusShards)})`
                    : `Enough materials (+Surplus ${formatCompactNumber(totalSurplusShards)})`}
                </span>
              )}
            </div>
          </div>

          <CalculatorInfoPopover
            title={
              isVi
                ? "Quy Tắc Trừ Mảnh Riêng & Bù Mảnh Vạn Năng"
                : "Specific Shard Priority & Universal Shard Fill Rules"
            }
            subtitle={
              isVi
                ? `${relic.shardName.vi} + ${universalMaterial.nameVi}`
                : `${relic.shardName.en} + ${universalMaterial.nameEn}`
            }
            locale={locale}
            triggerLabel={
              isVi
                ? "Xem quy tắc ưu tiên trừ mảnh Bí Bảo"
                : "View Relic shard deduction priority rules"
            }
            triggerTestId="relics-resources-info-trigger"
            dialogTestId="relics-resources-info-dialog"
          >
            <div className={cn(CALC_MD3.tonalGroup, "space-y-2")}>
              <p className="font-sans text-xs text-muted-foreground">
                {isVi
                  ? "• Hệ thống tự động ưu tiên trừ Mảnh Bí Bảo Riêng đang có trong túi trước, phần thiếu còn lại mới bù 1:1 bằng Mảnh Vạn Năng Bí Bảo cùng phẩm chất."
                  : "• Automatically deducts your owned Specific Relic Shards first, then fills any remaining requirement 1:1 using Universal Relic Shards of matching rarity."}
              </p>
              <p className="font-sans text-xs text-muted-foreground">
                {isVi
                  ? "• Hỗ trợ nhập nhanh đơn vị K / M (ví dụ: 1.5k = 1,500) ở cả 2 ô số lượng đang có."
                  : "• Supports K / M shorthand inputs (e.g. 1.5k = 1,500) in both inventory fields."}
              </p>
            </div>
          </CalculatorInfoPopover>
        </div>

        {/* 2-Column Horizontal Resource Cards: Specific Relic Shards & Universal Relic Shards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Card 1: Mảnh Bí Bảo Riêng */}
          <div className={cn(CALC_MD3.tonalGroup, "space-y-2 p-2.5 sm:p-3")}>
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 p-1">
                <Image
                  src={relic.shardIconPath}
                  alt={relic.shardName[locale]}
                  width={32}
                  height={32}
                  className="h-7 w-7 object-contain"
                />
              </div>
              <h3 className="font-heading text-sm sm:text-base font-bold text-foreground truncate">
                {relic.shardName[locale]}
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-2 items-stretch">
              <div className="flex flex-col justify-between rounded-xl bg-background/60 px-2.5 py-2">
                <span className="font-sans text-xs font-semibold text-muted-foreground">
                  {isVi ? "Mảnh riêng dùng" : "Specific Used"}
                </span>
                <span
                  data-testid="relics-used-specific-shards"
                  title={formatExactNumber(calculation.specificShardsUsed)}
                  className="mt-0.5 font-mono text-lg sm:text-xl font-black text-amber-600 dark:text-amber-400 tabular-nums"
                >
                  {formatCompactNumber(calculation.specificShardsUsed)}
                </span>
              </div>

              <div className="flex flex-col justify-between">
                <label
                  htmlFor="relics-owned-specific-shards-input"
                  className="font-sans text-xs font-semibold text-muted-foreground truncate"
                >
                  {isVi ? "Đang có trong túi" : "Owned in bag"}
                </label>
                <input
                  id="relics-owned-specific-shards-input"
                  type="text"
                  inputMode="text"
                  data-testid="relics-owned-specific-shards-input"
                  value={ownedSpecificText}
                  onChange={(event) => setOwnedSpecificText(event.target.value)}
                  placeholder="0"
                  className={cn(
                    CALC_MD3.dataInput,
                    "mt-0.5 w-full border-0 bg-background/80 px-2.5 ring-1 ring-border/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                  )}
                />
              </div>
            </div>
          </div>

          {/* Card 2: Mảnh Vạn Năng Bí Bảo */}
          <div className={cn(CALC_MD3.tonalGroup, "space-y-2 p-2.5 sm:p-3")}>
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-500/15 p-1">
                <Image
                  src={universalMaterial.iconPath}
                  alt={universalMaterialName}
                  width={32}
                  height={32}
                  className="h-7 w-7 object-contain"
                />
              </div>
              <h3 className="font-heading text-sm sm:text-base font-bold text-foreground truncate">
                {universalMaterialName}
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-2 items-stretch">
              <div className="flex flex-col justify-between rounded-xl bg-background/60 px-2.5 py-2">
                <span className="font-sans text-xs font-semibold text-muted-foreground">
                  {isVi ? "Vạn năng bù thêm" : "Universal Used"}
                </span>
                <span
                  data-testid="relics-used-universal-shards"
                  title={formatExactNumber(calculation.universalShardsUsed)}
                  className="mt-0.5 font-mono text-lg sm:text-xl font-black text-sky-600 dark:text-sky-400 tabular-nums"
                >
                  {formatCompactNumber(calculation.universalShardsUsed)}
                </span>
              </div>

              <div className="flex flex-col justify-between">
                <label
                  htmlFor="relics-owned-universal-shards-input"
                  className="font-sans text-xs font-semibold text-muted-foreground truncate"
                >
                  {isVi ? "Đang có trong túi" : "Owned in bag"}
                </label>
                <input
                  id="relics-owned-universal-shards-input"
                  type="text"
                  inputMode="text"
                  data-testid="relics-owned-universal-shards-input"
                  value={ownedUniversalText}
                  onChange={(event) =>
                    setOwnedUniversalText(event.target.value)
                  }
                  placeholder="0"
                  className={cn(
                    CALC_MD3.dataInput,
                    "mt-0.5 w-full border-0 bg-background/80 px-2.5 ring-1 ring-border/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

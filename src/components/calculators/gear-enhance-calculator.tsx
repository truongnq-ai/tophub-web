"use client";

import React, { useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  RotateCcw,
  Shield,
  Sparkles,
  Swords,
  Users,
  X,
} from "lucide-react";
import {
  GEAR_ENHANCE_RARITY_CONFIGS,
  GEAR_ROLE_CONFIGS,
  GEAR_SLOT_CONFIGS,
  GEAR_SLOT_ORDER,
  MAX_GEAR_ENHANCE_LEVEL,
  MIN_GEAR_ENHANCE_LEVEL,
  calculateGearEnhancement,
  clampGearEnhanceLevel,
  type GearCustomSlotRange,
  type GearEnhanceRarity,
  type GearEnhanceScopeMode,
  type GearHeroRoleBranch,
  type GearSlotKey,
} from "@/content/calculators/gear-enhance-data";
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
import { GearEnhanceLevelSelector } from "./gear-enhance-level-selector";
import {
  CALC_MD3,
  CalculatorMetricValue,
  CalculatorStepperButton,
  CalculatorToolHeader,
} from "./calculator-md3-primitives";

export interface GearEnhanceCalculatorProps {
  readonly zone?: CalculatorZone;
  readonly category: CalculatorCategory;
  readonly tool: CalculatorToolItem;
  readonly locale: CalculatorLocale;
}

const RARITY_OPTIONS: readonly GearEnhanceRarity[] = [
  "epic",
  "legendary",
  "mythic",
];

const ROLE_OPTIONS: readonly GearHeroRoleBranch[] = ["dps", "tank", "healer"];

const SCOPE_OPTIONS: readonly {
  readonly mode: GearEnhanceScopeMode;
  readonly label: Record<CalculatorLocale, string>;
}[] = [
  {
    mode: "single_piece",
    label: { vi: "1 Món Lẻ (×1)", en: "1 Piece (×1)" },
  },
  {
    mode: "hero_set_4",
    label: { vi: "1 Tướng (4 Món)", en: "1 Hero (4 Pieces)" },
  },
  {
    mode: "squad_24",
    label: { vi: "Đội 1 (24 Món)", en: "Queue 1 (24 Pieces)" },
  },
  {
    mode: "custom_4_slots",
    label: { vi: "4 Ô Lệch Cấp", en: "Custom 4 Slots" },
  },
];

const DEFAULT_CUSTOM_SLOTS: Readonly<Record<GearSlotKey, GearCustomSlotRange>> =
  {
    weapon: { fromLevel: 20, toLevel: 30 },
    boots: { fromLevel: 20, toLevel: 30 },
    helmet: { fromLevel: 12, toLevel: 30 },
    chest: { fromLevel: 10, toLevel: 30 },
  };

export function GearEnhanceCalculator({
  tool,
  locale,
}: GearEnhanceCalculatorProps) {
  const [rarity, setRarity] = useState<GearEnhanceRarity>("legendary");
  const [scopeMode, setScopeMode] =
    useState<GearEnhanceScopeMode>("hero_set_4");
  const [roleBranch, setRoleBranch] = useState<GearHeroRoleBranch>("dps");
  const [fromLevel, setFromLevel] = useState<number>(20);
  const [toLevel, setToLevel] = useState<number>(40);
  const [customSlotLevels, setCustomSlotLevels] =
    useState<Readonly<Record<GearSlotKey, GearCustomSlotRange>>>(
      DEFAULT_CUSTOM_SLOTS
    );
  const [ownedRunesInput, setOwnedRunesInput] = useState<string>("0");
  const [ownedMeatInput, setOwnedMeatInput] = useState<string>("0");
  const [isBreakdownOpen, setIsBreakdownOpen] = useState<boolean>(false);

  const parsedOwnedRunes = useMemo(
    () => parseCompactNumberInput(ownedRunesInput),
    [ownedRunesInput]
  );
  const parsedOwnedMeat = useMemo(
    () => parseCompactNumberInput(ownedMeatInput),
    [ownedMeatInput]
  );

  const result = useMemo(
    () =>
      calculateGearEnhancement({
        rarity,
        scopeMode,
        roleBranch,
        fromLevel,
        toLevel,
        customSlotLevels,
        ownedRunes: parsedOwnedRunes,
        ownedMeat: parsedOwnedMeat,
      }),
    [
      rarity,
      scopeMode,
      roleBranch,
      fromLevel,
      toLevel,
      customSlotLevels,
      parsedOwnedRunes,
      parsedOwnedMeat,
    ]
  );

  const handleUpdateCustomSlot = (
    slotKey: GearSlotKey,
    field: "fromLevel" | "toLevel",
    nextLv: number
  ) => {
    const clamped = clampGearEnhanceLevel(nextLv);
    setCustomSlotLevels((prev) => ({
      ...prev,
      [slotKey]: {
        ...prev[slotKey],
        [field]: clamped,
      },
    }));
  };

  const handleResetDefault = () => {
    setRarity("legendary");
    setScopeMode("hero_set_4");
    setRoleBranch("dps");
    setFromLevel(20);
    setToLevel(40);
    setCustomSlotLevels(DEFAULT_CUSTOM_SLOTS);
    setOwnedRunesInput("0");
    setOwnedMeatInput("0");
  };

  const runeMaterialName =
    locale === "vi" ? result.runeMaterial.nameVi : result.runeMaterial.nameEn;
  const meatMaterialName =
    locale === "vi" ? result.meatMaterial.nameVi : result.meatMaterial.nameEn;

  const priorityOrderText = result.roleConfig.slotUpgradeOrder
    .map((key) => GEAR_SLOT_CONFIGS[key].shortLabel[locale])
    .join(" ➔ ");

  return (
    <div data-testid="gear-enhance-calculator" className="space-y-4">
      {/* 1. Flat MD3 Tool Header + Scope Switcher */}
      <CalculatorToolHeader
        code={tool.code}
        title={tool.title[locale].replace(`${tool.code} `, "")}
        actions={
          <>
            {SCOPE_OPTIONS.map((opt) => {
              const isSelected = scopeMode === opt.mode;
              return (
                <button
                  key={opt.mode}
                  type="button"
                  data-testid={`scope-${opt.mode}-btn`}
                  aria-pressed={isSelected}
                  onClick={() => setScopeMode(opt.mode)}
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
              data-testid="gear-enhance-reset-btn"
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
          </>
        }
      />

      {/* 2. Rarity & Role Branch Control Strip (Single-border surfaceCard) */}
      <section
        data-testid="gear-enhance-config-strip"
        className={cn(CALC_MD3.surfaceCard, "space-y-3")}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {/* Rarity Selector */}
          <div className={cn(CALC_MD3.tonalGroup, "space-y-2")}>
            <div className={cn(CALC_MD3.eyebrow, "text-muted-foreground")}>
              {locale === "vi"
                ? "Phẩm Chất Trang Bị (Rarity)"
                : "Equipment Rarity"}
            </div>
            <div className="flex flex-wrap gap-2">
              {RARITY_OPTIONS.map((rKey) => {
                const cfg = GEAR_ENHANCE_RARITY_CONFIGS[rKey];
                const isSelected = rarity === rKey;
                return (
                  <button
                    key={rKey}
                    type="button"
                    data-testid={`rarity-${rKey}-btn`}
                    aria-pressed={isSelected}
                    onClick={() => setRarity(rKey)}
                    className={cn(
                      CALC_MD3.chipButton,
                      "font-sans",
                      isSelected
                        ? "bg-amber-500 text-slate-950 font-bold"
                        : "bg-background/80 text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <span>{cfg.shortLabel[locale]}</span>
                    <span className="font-mono text-xs">
                      ({cfg.costMultiplier}×)
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              { result.rarityConfig.recommendation[locale] }
            </p>
          </div>

          {/* Role Branch Selector (Tank / DPS / Healer) */}
          <div className={cn(CALC_MD3.tonalGroup, "space-y-2")}>
            <div className={cn(CALC_MD3.eyebrow, "text-muted-foreground")}>
              {locale === "vi"
                ? "Nhánh Nghề Nghiệp & Thứ Tự Nâng Chuẩn"
                : "Role Branch & Slot Upgrade Priority"}
            </div>
            <div className="flex flex-wrap gap-2">
              {ROLE_OPTIONS.map((rBranch) => {
                const cfg = GEAR_ROLE_CONFIGS[rBranch];
                const isSelected = roleBranch === rBranch;
                return (
                  <button
                    key={rBranch}
                    type="button"
                    data-testid={`role-${rBranch}-btn`}
                    aria-pressed={isSelected}
                    onClick={() => setRoleBranch(rBranch)}
                    className={cn(
                      CALC_MD3.chipButton,
                      "font-sans",
                      isSelected
                        ? "bg-amber-500 text-slate-950 font-bold"
                        : "bg-background/80 text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <span>{cfg.shortLabel[locale]}</span>
                  </button>
                );
              })}
            </div>
            <p
              data-testid="role-priority-summary"
              className="text-xs text-foreground/90 font-medium leading-relaxed"
            >
              <strong className="font-heading text-amber-700 dark:text-amber-400">
                {locale === "vi" ? "Thứ tự ưu tiên:" : "Priority order:"}
              </strong>{" "}
              {priorityOrderText}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Main 3-Column Workspace OR Custom 4-Slot Loadout */}
      {scopeMode !== "custom_4_slots" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 items-start gap-3 sm:gap-4">
          {/* Left Column: Current Level */}
          <div className="order-2 lg:order-1 lg:col-span-4 min-w-0">
            <GearEnhanceLevelSelector
              idPrefix="from"
              title={
                locale === "vi" ? "Cấp Hiện Tại (X)" : "Current Level (X)"
              }
              level={fromLevel}
              rarity={rarity}
              pieceMultiplier={result.pieceMultiplier}
              locale={locale}
              onChangeLevel={setFromLevel}
            />
          </div>

          {/* Center Column: Golden Set & Enhancement Master Resonance Hub */}
          <section
            data-testid="central-gear-master-hub"
            className={cn(
              CALC_MD3.surfaceCard,
              "order-1 lg:order-2 lg:col-span-4 space-y-3"
            )}
          >
            <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-2.5">
              <div>
                <div className={cn(CALC_MD3.eyebrow, "text-amber-600 dark:text-amber-400")}>
                  {locale === "vi"
                    ? "Bậc Thầy Cường Hóa"
                    : "Enhancement Master"}
                </div>
                <h2 className="text-base font-heading font-black text-foreground">
                  {result.roleConfig.setName[locale]}
                </h2>
              </div>
              <span className="inline-flex items-center gap-1 rounded-xl bg-amber-500/15 px-2.5 py-1 font-mono text-xs font-black text-amber-700 dark:text-amber-300">
                ×{result.pieceMultiplier}
              </span>
            </div>

            {/* 4 Equipment Slots Grid */}
            <div className="grid grid-cols-2 gap-2">
              {result.roleConfig.slotUpgradeOrder.map((slotKey, idx) => {
                const asset = result.roleConfig.slots[slotKey];
                const slotCfg = GEAR_SLOT_CONFIGS[slotKey];
                const assetName = locale === "vi" ? asset.nameVi : asset.nameEn;

                return (
                  <div
                    key={slotKey}
                    className={cn(
                      CALC_MD3.tonalGroup,
                      "flex items-center gap-2.5 p-2.5"
                    )}
                  >
                    <GameAssetFrame
                      src={asset.iconPath}
                      alt={assetName}
                      rarity={rarity}
                      size="sm"
                    />
                    <div className="min-w-0">
                      <div className="text-xs font-sans font-bold text-amber-700 dark:text-amber-400">
                        #{idx + 1} • {slotCfg.shortLabel[locale]}
                      </div>
                      <div className="truncate text-xs font-heading font-bold text-foreground">
                        {assetName}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Active vs Target Master Resonance Bonus */}
            <div className={cn(CALC_MD3.tonalGroup, "space-y-2")}>
              <div className="flex items-center justify-between text-xs font-sans font-bold">
                <span className="text-muted-foreground">
                  {locale === "vi" ? "Cộng Hưởng Hiện Tại:" : "Current Resonance:"}
                </span>
                <span className="text-foreground">
                  +{result.currentMasterTier}
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {
                  result.roleConfig.masterStatBonusByTier[
                    result.currentMasterTier
                  ][locale]
                }
              </p>

              <div className="border-t border-border/50 pt-2 flex items-center justify-between text-xs font-sans font-bold">
                <span className="text-amber-700 dark:text-amber-400">
                  {locale === "vi" ? "Cộng Hưởng Mục Tiêu:" : "Target Resonance:"}
                </span>
                <span className="text-amber-700 dark:text-amber-300">
                  +{result.targetMasterTier}
                </span>
              </div>
              <p
                data-testid="target-master-bonus-text"
                className="text-xs font-semibold text-foreground leading-relaxed"
              >
                {
                  result.roleConfig.masterStatBonusByTier[
                    result.targetMasterTier
                  ][locale]
                }
              </p>
            </div>
          </section>

          {/* Right Column: Target Level */}
          <div className="order-3 lg:col-span-4 min-w-0">
            <GearEnhanceLevelSelector
              idPrefix="to"
              title={locale === "vi" ? "Cấp Mục Tiêu (Y)" : "Target Level (Y)"}
              level={toLevel}
              rarity={rarity}
              pieceMultiplier={result.pieceMultiplier}
              locale={locale}
              onChangeLevel={setToLevel}
            />
          </div>
        </div>
      ) : (
        /* Custom 4-Slot Mixed Audit Panel */
        <section
          data-testid="custom-4-slots-panel"
          className={cn(CALC_MD3.surfaceCard, "space-y-4")}
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-2.5">
            <div>
              <h2 className="text-base sm:text-lg font-heading font-bold text-foreground">
                {locale === "vi"
                  ? "Kiểm Toán 4 Ô Trang Bị Lệch Cấp & Phát Hiện Mắt Xích Yếu Nhất"
                  : "Custom 4-Slot Mixed Level Audit & Bottleneck Detector"}
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {locale === "vi"
                  ? "Quy luật Cộng Hưởng: Mốc Bậc Thầy (+10/+20/+30/+40) được quyết định bởi món có cấp thấp nhất trong 4 món."
                  : "Resonance Law: Enhancement Master (+10/+20/+30/+40) is governed by the lowest-level piece among all 4 slots."}
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500/15 px-3 py-1 text-xs font-sans font-bold text-amber-700 dark:text-amber-300">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              <span>
                {locale === "vi"
                  ? `Cộng hưởng: +${result.currentMasterTier} ➔ +${result.targetMasterTier}`
                  : `Resonance: +${result.currentMasterTier} ➔ +${result.targetMasterTier}`}
              </span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {result.slotAudits.map((audit) => {
              const slotCfg = GEAR_SLOT_CONFIGS[audit.slotKey];
              const asset = result.roleConfig.slots[audit.slotKey];
              const assetName = locale === "vi" ? asset.nameVi : asset.nameEn;

              return (
                <div
                  key={audit.slotKey}
                  data-testid={`custom-slot-card-${audit.slotKey}`}
                  className={cn(CALC_MD3.tonalGroup, "space-y-3")}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <GameAssetFrame
                        src={asset.iconPath}
                        alt={assetName}
                        rarity={rarity}
                        size="sm"
                      />
                      <div className="min-w-0">
                        <div className="text-sm font-heading font-bold text-foreground truncate">
                          {slotCfg.label[locale]}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          {slotCfg.primaryStatFocus[locale]}
                        </div>
                      </div>
                    </div>

                    {audit.isBottleneck ? (
                      <span className="shrink-0 rounded-lg bg-amber-500/20 px-2 py-0.5 text-xs font-sans font-bold text-amber-700 dark:text-amber-300">
                        {locale === "vi" ? "Món tụt hậu" : "Bottleneck"}
                      </span>
                    ) : null}
                  </div>

                  {/* From -> To Steppers */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="space-y-1">
                      <div className="text-xs font-sans font-semibold text-muted-foreground">
                        {locale === "vi" ? "Cấp hiện tại" : "Current Lv"}
                      </div>
                      <div className="flex items-center justify-between gap-1.5">
                        <CalculatorStepperButton
                          direction="decrease"
                          testId={`custom-slot-${audit.slotKey}-from-minus`}
                          ariaLabel={
                            locale === "vi"
                              ? `Giảm cấp hiện tại ${slotCfg.shortLabel.vi}`
                              : `Decrease current ${slotCfg.shortLabel.en} level`
                          }
                          disabled={audit.fromLevel <= MIN_GEAR_ENHANCE_LEVEL}
                          onClick={() =>
                            handleUpdateCustomSlot(
                              audit.slotKey,
                              "fromLevel",
                              audit.fromLevel - 1
                            )
                          }
                        />
                        <span className="font-mono text-base font-black text-foreground">
                          Lv.{audit.fromLevel}
                        </span>
                        <CalculatorStepperButton
                          direction="increase"
                          testId={`custom-slot-${audit.slotKey}-from-plus`}
                          ariaLabel={
                            locale === "vi"
                              ? `Tăng cấp hiện tại ${slotCfg.shortLabel.vi}`
                              : `Increase current ${slotCfg.shortLabel.en} level`
                          }
                          disabled={audit.fromLevel >= MAX_GEAR_ENHANCE_LEVEL}
                          onClick={() =>
                            handleUpdateCustomSlot(
                              audit.slotKey,
                              "fromLevel",
                              audit.fromLevel + 1
                            )
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-xs font-sans font-semibold text-muted-foreground">
                        {locale === "vi" ? "Cấp mục tiêu" : "Target Lv"}
                      </div>
                      <div className="flex items-center justify-between gap-1.5">
                        <CalculatorStepperButton
                          direction="decrease"
                          testId={`custom-slot-${audit.slotKey}-to-minus`}
                          ariaLabel={
                            locale === "vi"
                              ? `Giảm cấp mục tiêu ${slotCfg.shortLabel.vi}`
                              : `Decrease target ${slotCfg.shortLabel.en} level`
                          }
                          disabled={audit.toLevel <= MIN_GEAR_ENHANCE_LEVEL}
                          onClick={() =>
                            handleUpdateCustomSlot(
                              audit.slotKey,
                              "toLevel",
                              audit.toLevel - 1
                            )
                          }
                        />
                        <span className="font-mono text-base font-black text-amber-700 dark:text-amber-300">
                          Lv.{audit.toLevel}
                        </span>
                        <CalculatorStepperButton
                          direction="increase"
                          testId={`custom-slot-${audit.slotKey}-to-plus`}
                          ariaLabel={
                            locale === "vi"
                              ? `Tăng cấp mục tiêu ${slotCfg.shortLabel.vi}`
                              : `Increase target ${slotCfg.shortLabel.en} level`
                          }
                          disabled={audit.toLevel >= MAX_GEAR_ENHANCE_LEVEL}
                          onClick={() =>
                            handleUpdateCustomSlot(
                              audit.slotKey,
                              "toLevel",
                              audit.toLevel + 1
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-border/50 pt-2 text-xs">
                    <span className="text-muted-foreground font-sans">
                      {locale === "vi" ? "Chi phí ô này:" : "Slot cost:"}
                    </span>
                    <span className="font-sans font-bold text-foreground">
                      <span className="font-mono">
                        {formatExactNumber(audit.requiredRunes)}
                      </span>{" "}
                      Rune •{" "}
                      <span className="font-mono">
                        {formatCompactNumber(audit.requiredMeat)}
                      </span>{" "}
                      <span>{locale === "vi" ? "Thịt" : "Meat"}</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Invalid Range Warning Banner */}
      {result.isInvalidRange ? (
        <div
          data-testid="gear-enhance-invalid-warning"
          className="flex items-center gap-2.5 rounded-2xl border border-amber-500/40 bg-amber-500/10 p-3.5 text-sm font-medium text-amber-800 dark:text-amber-200"
        >
          <AlertTriangle
            className="h-5 w-5 shrink-0 text-amber-500"
            aria-hidden="true"
          />
          <span>
            {locale === "vi"
              ? "Cấp mục tiêu (Y) phải lớn hơn hoặc bằng cấp hiện tại (X). Vui lòng điều chỉnh lại mốc nâng cấp."
              : "Target level (Y) must be greater than or equal to current level (X). Please adjust your range."}
          </span>
        </div>
      ) : null}

      {/* 4. Dual Resource Result Cards (Rune Cường Hóa + Thịt) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Card 1: Gear Enhance Rune (gameId: 206) */}
        <section
          data-testid="gear-enhance-rune-result-card"
          className={cn(CALC_MD3.surfaceCard, "space-y-4")}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <GameAssetFrame
                src={result.runeMaterial.iconPath}
                alt={runeMaterialName}
                rarity={result.runeMaterial.rarity}
                size="md"
              />
              <div className="min-w-0">
                <div className={cn(CALC_MD3.eyebrow, "text-amber-600 dark:text-amber-400")}>
                  {locale === "vi"
                    ? "Nguyên Liệu Chính (ID: 206)"
                    : "Primary Material (ID: 206)"}
                </div>
                <h3 className="text-base sm:text-lg font-heading font-bold text-foreground truncate">
                  {runeMaterialName}
                </h3>
              </div>
            </div>

            <button
              type="button"
              data-testid="toggle-gear-enhance-breakdown-btn"
              aria-expanded={isBreakdownOpen}
              aria-label={
                locale === "vi"
                  ? "Xem bảng chi tiết 4 chặng cường hóa"
                  : "View 4-stage enhancement breakdown"
              }
              onClick={() => setIsBreakdownOpen((prev) => !prev)}
              className={cn(
                CALC_MD3.iconButton,
                isBreakdownOpen
                  ? "bg-amber-500 text-slate-950"
                  : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {isBreakdownOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Info className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>

          <div className={cn(CALC_MD3.tonalGroup, "space-y-2")}>
            <div className="text-xs font-sans font-semibold text-muted-foreground">
              {locale === "vi"
                ? "Tổng Rune Cường Hóa Cần Thêm:"
                : "Total Gear Enhance Runes Required:"}
            </div>
            <CalculatorMetricValue
              testId="gear-enhance-total-runes"
              value={formatExactNumber(result.requiredRunes)}
              unit="Rune"
              toneClassName="text-amber-600 dark:text-amber-400"
            />
            {result.nextMasterTier !== null ? (
              <div className="text-xs text-muted-foreground font-sans">
                {locale === "vi"
                  ? `Cần ${formatExactNumber(result.runesToNextMasterMilestone)} Rune để chạm mốc Bậc Thầy +${result.nextMasterTier} kế tiếp`
                  : `Needs ${formatExactNumber(result.runesToNextMasterMilestone)} Runes to hit the next Master +${result.nextMasterTier} milestone`}
              </div>
            ) : null}
          </div>

          {/* Owned Runes Inventory Input */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-end">
            <div className="space-y-1.5">
              <label
                htmlFor="gear-enhance-owned-runes-input"
                className="block text-xs font-sans font-semibold text-muted-foreground"
              >
                {locale === "vi"
                  ? "Rune hiện có trong Túi (hỗ trợ 50k, 1.2m):"
                  : "Owned Runes in Inventory (e.g. 50k, 1.2m):"}
              </label>
              <Input
                id="gear-enhance-owned-runes-input"
                data-testid="gear-enhance-owned-runes-input"
                type="text"
                inputMode="text"
                value={ownedRunesInput}
                onChange={(e) => setOwnedRunesInput(e.target.value)}
                className={CALC_MD3.dataInput}
              />
            </div>

            <div className={cn(CALC_MD3.tonalGroup, "p-3 space-y-1")}>
              <div className="flex items-center justify-between text-xs font-sans">
                <span className="text-muted-foreground">
                  {result.missingRunes > 0
                    ? locale === "vi"
                      ? "Còn thiếu:"
                      : "Missing:"
                    : locale === "vi"
                      ? "Dư sau nâng:"
                      : "Surplus:"}
                </span>
                <span
                  data-testid="gear-enhance-missing-runes"
                  className={cn(
                    "font-mono font-bold text-sm",
                    result.missingRunes > 0
                      ? "text-rose-600 dark:text-rose-400"
                      : "text-emerald-600 dark:text-emerald-400"
                  )}
                >
                  {result.missingRunes > 0
                    ? formatExactNumber(result.missingRunes)
                    : `+${formatExactNumber(result.surplusRunes)}`}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs font-sans">
                <span className="text-muted-foreground">
                  {locale === "vi" ? "Tiến độ kho:" : "Progress:"}
                </span>
                <span className="font-mono font-bold text-foreground">
                  {result.runeCompletionPercent}%
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Card 2: Meat Secondary Resource (gameId: 3) */}
        <section
          data-testid="gear-enhance-meat-result-card"
          className={cn(CALC_MD3.surfaceCard, "space-y-4")}
        >
          <div className="flex items-center gap-3">
            <GameAssetFrame
              src={result.meatMaterial.iconPath}
              alt={meatMaterialName}
              rarity={result.meatMaterial.rarity}
              size="md"
            />
            <div className="min-w-0">
              <div className={cn(CALC_MD3.eyebrow, "text-sky-600 dark:text-sky-400")}>
                {locale === "vi"
                  ? "Tài Nguyên Đi Kèm (Tỷ lệ 4.8× Rune)"
                  : "Secondary Resource (4.8× Rune Ratio)"}
              </div>
              <h3 className="text-base sm:text-lg font-heading font-bold text-foreground truncate">
                {meatMaterialName}
              </h3>
            </div>
          </div>

          <div className={cn(CALC_MD3.tonalGroup, "space-y-2")}>
            <div className="text-xs font-sans font-semibold text-muted-foreground">
              {locale === "vi"
                ? "Tổng Lượng Thịt Tiêu Hao:"
                : "Total Meat Required:"}
            </div>
            <CalculatorMetricValue
              testId="gear-enhance-total-meat"
              value={formatExactNumber(result.requiredMeat)}
              unit={
                locale === "vi"
                  ? `(${formatCompactNumber(result.requiredMeat)} Thịt)`
                  : `(${formatCompactNumber(result.requiredMeat)} Meat)`
              }
            />
            <div className="text-xs text-muted-foreground font-sans">
              {locale === "vi"
                ? "Chuẩn SSoT: 936,000 Thịt / món từ Lv.0 lên Lv.40 (3.74M Thịt / bộ 4 món)"
                : "SSoT Standard: 936,000 Meat / piece from Lv.0 to Lv.40 (3.74M Meat / 4-piece set)"}
            </div>
          </div>

          {/* Owned Meat Inventory Input */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-end">
            <div className="space-y-1.5">
              <label
                htmlFor="gear-enhance-owned-meat-input"
                className="block text-xs font-sans font-semibold text-muted-foreground"
              >
                {locale === "vi"
                  ? "Thịt hiện có (VD: 5m, 25m):"
                  : "Owned Meat (e.g. 5m, 25m):"}
              </label>
              <Input
                id="gear-enhance-owned-meat-input"
                data-testid="gear-enhance-owned-meat-input"
                type="text"
                inputMode="text"
                value={ownedMeatInput}
                onChange={(e) => setOwnedMeatInput(e.target.value)}
                className={CALC_MD3.dataInput}
              />
            </div>

            <div className={cn(CALC_MD3.tonalGroup, "p-3 space-y-1")}>
              <div className="flex items-center justify-between text-xs font-sans">
                <span className="text-muted-foreground">
                  {result.missingMeat > 0
                    ? locale === "vi"
                      ? "Còn thiếu:"
                      : "Missing:"
                    : locale === "vi"
                      ? "Trạng thái:"
                      : "Status:"}
                </span>
                <span
                  data-testid="gear-enhance-missing-meat"
                  className={cn(
                    "font-bold text-sm",
                    result.missingMeat > 0
                      ? "font-mono text-rose-600 dark:text-rose-400"
                      : "font-sans text-emerald-600 dark:text-emerald-400"
                  )}
                >
                  {result.missingMeat > 0
                    ? formatCompactNumber(result.missingMeat)
                    : locale === "vi"
                      ? "Đủ Thịt"
                      : "Ready"}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs font-sans">
                <span className="text-muted-foreground">
                  {locale === "vi" ? "Tiến độ kho:" : "Progress:"}
                </span>
                <span className="font-mono font-bold text-foreground">
                  {result.meatCompletionPercent}%
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 5. On-Demand [i] 4-Bracket Breakdown Table (Single-border surfaceCard) */}
      {isBreakdownOpen ? (
        <section
          data-testid="gear-enhance-breakdown-panel"
          className={cn(CALC_MD3.surfaceCard, "space-y-3")}
        >
          <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-2.5">
            <h3 className="text-base sm:text-lg font-heading font-bold text-foreground">
              {locale === "vi"
                ? "Bảng Phân Rã Chi Tiết 4 Chặng Cường Hóa (+10 ➔ +40)"
                : "4-Stage Gear Enhancement Breakdown (+10 ➔ +40)"}
            </h3>
            <span className="text-xs font-sans font-semibold text-muted-foreground">
              {locale === "vi"
                ? `Hệ số nhân hiện tại: ×${result.pieceMultiplier} món`
                : `Active multiplier: ×${result.pieceMultiplier} pieces`}
            </span>
          </div>

          <div className="divide-y divide-border/60">
            {result.bracketBreakdown.map((item) => (
              <div
                key={item.bracketKey}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-3 text-sm"
              >
                <div className="space-y-0.5">
                  <div className="font-heading font-bold text-foreground">
                    {item.label[locale]}
                  </div>
                  <div className="text-xs text-muted-foreground font-sans">
                    {locale === "vi"
                      ? `Đơn giá 1 món: ${formatExactNumber(item.runesPerPiece)} Rune + ${formatCompactNumber(item.meatPerPiece)} Thịt`
                      : `Per 1 piece: ${formatExactNumber(item.runesPerPiece)} Runes + ${formatCompactNumber(item.meatPerPiece)} Meat`}
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:text-right">
                  <div>
                    <div className="text-xs text-muted-foreground font-sans">
                      {locale === "vi" ? "Chi phí chặng:" : "Stage cost:"}
                    </div>
                    <div className="font-mono font-bold text-amber-700 dark:text-amber-300">
                      {formatExactNumber(item.totalRunesForScope)} Rune
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground font-sans">
                      {locale === "vi" ? "Tích lũy cuối chặng:" : "Cumulative:"}
                    </div>
                    <div className="font-mono font-semibold text-foreground">
                      {formatExactNumber(item.cumulativeRunesAtEnd)} Rune
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

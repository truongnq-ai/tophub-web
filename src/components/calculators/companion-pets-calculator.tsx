"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import {
  RotateCcw,
  Sparkles,
  Trophy,
  Layers,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertCircle,
  Flame,
  Shield,
  Zap,
} from "lucide-react";
import {
  PET_CATALOG,
  calculatePetLevelUpgrade,
  getPetById,
  type PetDefinition,
  type PetFaction,
} from "@/content/calculators/pets-data";
import type {
  CalculatorCategory,
  CalculatorLocale,
  CalculatorToolItem,
  CalculatorZone,
} from "@/content/calculators/types";
import {
  cn,
  formatExactNumber,
  formatCompactNumber,
  parseCompactNumberInput,
} from "@/lib/utils";
import {
  CALC_MD3,
  CalculatorToolHeader,
  CalculatorStepperButton,
} from "./calculator-md3-primitives";
import { CalculatorInfoPopover } from "./calculator-info-popover";

export interface CompanionPetsCalculatorProps {
  readonly zone?: CalculatorZone;
  readonly category: CalculatorCategory;
  readonly tool: CalculatorToolItem;
  readonly locale: CalculatorLocale;
}

const FACTION_FILTERS: Array<{ id: "all" | PetFaction; labelVi: string; labelEn: string }> = [
  { id: "all", labelVi: "Tất Cả (21)", labelEn: "All (21)" },
  { id: "league", labelVi: "Liên Minh (7)", labelEn: "League (7)" },
  { id: "horde", labelVi: "Bộ Tộc (6)", labelEn: "Horde (6)" },
  { id: "nature", labelVi: "Thiên Nhiên (7)", labelEn: "Nature (7)" },
  { id: "special", labelVi: "Đặc Biệt (1)", labelEn: "Special (1)" },
];

const LEVEL_QUICK_CHIPS = [
  { level: 45, label: "Lv.45 Epic" },
  { level: 60, label: "Lv.60" },
  { level: 75, label: "Lv.75 Leg" },
  { level: 90, label: "Lv.90 Peak" },
  { level: 100, label: "Lv.100" },
  { level: 120, label: "Lv.120 Max" },
];

export function CompanionPetsCalculator({
  tool,
  locale,
}: CompanionPetsCalculatorProps) {
  const [selectedPetId, setSelectedPetId] = useState<number>(840001); // Tia Điện (Zapp) mặc định
  const [activeFaction, setActiveFaction] = useState<"all" | PetFaction>("all");
  const [fromLevel, setFromLevel] = useState<number>(1);
  const [toLevel, setToLevel] = useState<number>(90);
  const [ownedFoodInput, setOwnedFoodInput] = useState<string>("0");
  const [ownedEssenceInput, setOwnedEssenceInput] = useState<string>("0");
  const [showBreakdown, setShowBreakdown] = useState<boolean>(false);

  const selectedPet: PetDefinition = useMemo(() => {
    return getPetById(selectedPetId) ?? PET_CATALOG[0]!;
  }, [selectedPetId]);

  const filteredPets = useMemo(() => {
    if (activeFaction === "all") return PET_CATALOG;
    return PET_CATALOG.filter((p) => p.faction === activeFaction);
  }, [activeFaction]);

  const ownedFoodNumber = useMemo(() => {
    return parseCompactNumberInput(ownedFoodFoodClean(ownedFoodInput));
  }, [ownedFoodInput]);

  const ownedEssenceNumber = useMemo(() => {
    return parseCompactNumberInput(ownedFoodFoodClean(ownedEssenceInput));
  }, [ownedEssenceInput]);

  function ownedFoodFoodClean(val: string): string {
    return val.replace(/,/g, "").trim();
  }

  const upgradeResult = useMemo(() => {
    return calculatePetLevelUpgrade({
      fromLevel,
      toLevel,
      ownedFood: ownedFoodNumber,
      ownedEssence: ownedEssenceNumber,
    });
  }, [fromLevel, toLevel, ownedFoodNumber, ownedEssenceNumber]);

  const handleReset = () => {
    setSelectedPetId(840001);
    setActiveFaction("all");
    setFromLevel(1);
    setToLevel(90);
    setOwnedFoodInput("0");
    setOwnedEssenceInput("0");
    setShowBreakdown(false);
  };

  const handleSetQuickLevel = (target: number) => {
    if (target <= fromLevel) {
      setFromLevel(Math.max(1, target - 10));
    }
    setToLevel(target);
  };

  const isVi = locale === "vi";

  return (
    <div className="space-y-6">
      {/* 1. Tool Header phẳng trực tiếp trên Canvas */}
      <CalculatorToolHeader
        code={tool.code}
        title={tool.title[locale]}
        actions={
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReset}
              className={cn(
                CALC_MD3.chipButton,
                "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground text-xs"
              )}
            >
              <RotateCcw className="h-3.5 w-3.5 mr-1" />
              {isVi ? "Đặt lại" : "Reset"}
            </button>
            <CalculatorInfoPopover
              locale={locale}
              triggerTestId="pet-level-info-trigger"
              dialogTestId="pet-level-info-dialog"
              title={
                isVi
                  ? "Hướng Dẫn Nâng Cấp Thú Cưng & Cơ Chế SSoT"
                  : "Pet Level Upgrade Guide & SSoT Mechanics"
              }
              subtitle={
                isVi
                  ? "Cơ chế tiêu hao Đồ Ăn (Lv.1–120), Tinh Chất (Lv.91–120) & Điểm Sự Kiện GAR/KvK"
                  : "Pet Food (Lv.1–120), Essence (Lv.91–120) & GAR/KvK Event Points"
              }
            >
              <div className="space-y-4">
                <div className="rounded-xl bg-amber-500/10 p-3.5 ring-1 ring-amber-500/30 space-y-1.5">
                  <h4 className="font-sans text-sm font-bold text-foreground">
                    {isVi ? "1. Bảng Dữ Liệu Gốc (SSoT)" : "1. Game Data SSoT"}
                  </h4>
                  <p className="font-sans text-xs text-muted-foreground">
                    {tool.dataSourceTab[locale]}
                  </p>
                </div>
                {tool.exampleCase?.[locale] && (
                  <div className="rounded-xl bg-muted/40 p-3.5 space-y-1.5">
                    <h4 className="font-sans text-sm font-bold text-foreground">
                      {isVi ? "2. Tình Huống Thực Tế" : "2. Example Scenario"}
                    </h4>
                    <p className="font-sans text-xs text-muted-foreground">
                      <b>{isVi ? "Câu hỏi: " : "Question: "}</b>
                      {tool.exampleCase[locale].question}
                    </p>
                    <p className="font-sans text-xs text-amber-400">
                      <b>{isVi ? "Kết quả: " : "Result: "}</b>
                      {tool.exampleCase[locale].outputPreview}
                    </p>
                  </div>
                )}
              </div>
            </CalculatorInfoPopover>
          </div>
        }
      />

      {/* 2. Khung Thẻ Chính — Single Layer Surface Card */}
      <div className={CALC_MD3.surfaceCard}>
        <div className="space-y-5">
          {/* PHÂN KHU 1: CHỌN THÚ CƯNG ĐỒNG HÀNH & BỘ LỌC PHE */}
          <div className={CALC_MD3.tonalGroup}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20 text-amber-500 text-xs font-mono font-bold">
                  1
                </span>
                <h2 className="text-sm sm:text-base font-heading font-bold text-foreground">
                  {isVi ? "Chọn Thú Cưng Đồng Hành" : "Select Companion Pet"}
                </h2>
                <span className="text-xs text-muted-foreground font-sans">
                  ({filteredPets.length} {isVi ? "Thú Cưng" : "Pets"})
                </span>
              </div>

              {/* Faction Filter Chips */}
              <div className="flex flex-wrap items-center gap-1.5">
                {FACTION_FILTERS.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setActiveFaction(f.id)}
                    className={cn(
                      "min-h-[44px] px-3 py-1.5 rounded-lg text-xs font-sans font-semibold transition-all flex items-center justify-center",
                      activeFaction === f.id
                        ? "bg-amber-500 text-slate-950 font-bold shadow-sm"
                        : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {isVi ? f.labelVi : f.labelEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Horizontal Pet Selector Strip */}
            <div className="relative overflow-x-auto pb-2 scrollbar-thin">
              <div className="flex items-center gap-2.5 min-w-max py-1">
                {filteredPets.map((pet) => {
                  const isSelected = pet.id === selectedPet.id;
                  return (
                    <button
                      key={pet.id}
                      type="button"
                      onClick={() => setSelectedPetId(pet.id)}
                      className={cn(
                        "relative flex flex-col items-center gap-1.5 p-2 rounded-xl border transition-all text-center min-w-[76px] sm:min-w-[84px] min-h-[44px]",
                        isSelected
                          ? "border-amber-500 bg-amber-500/15 shadow-sm ring-2 ring-amber-500/40"
                          : "border-border/60 bg-card/60 hover:border-border hover:bg-card"
                      )}
                    >
                      {/* Badge NEW for Pet 840018 */}
                      {pet.isNew && (
                        <span className="absolute -top-1.5 -right-1.5 rounded-md bg-amber-500 px-1.5 py-0.5 text-xs font-sans font-black text-slate-950 shadow-sm animate-pulse">
                          NEW
                        </span>
                      )}

                      <div className="relative h-12 w-12 sm:h-14 sm:w-14 rounded-lg overflow-hidden bg-muted/50 border border-border/40 shrink-0">
                        <Image
                          src={pet.avatarPath}
                          alt={pet.nameVi}
                          fill
                          sizes="56px"
                          className="object-cover"
                          loading="lazy"
                        />
                      </div>

                      <span
                        className={cn(
                          "text-xs font-sans leading-tight line-clamp-1 max-w-[72px] sm:max-w-[80px]",
                          isSelected
                            ? "font-bold text-amber-400"
                            : "font-medium text-muted-foreground"
                        )}
                      >
                        {pet.nameVi}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Pet Banner Card */}
            <div className="mt-3 flex items-center justify-between rounded-xl border border-amber-500/30 bg-amber-500/5 p-3">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 rounded-lg overflow-hidden border border-amber-500/40 shrink-0 bg-background/50">
                  <Image
                    src={selectedPet.avatarPath}
                    alt={selectedPet.nameVi}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-heading font-bold text-foreground">
                      {selectedPet.nameVi}
                    </span>
                    <span
                      className={cn(
                        "rounded px-1.5 py-0.5 text-xs font-sans font-semibold uppercase",
                        selectedPet.faction === "league" && "bg-sky-500/20 text-sky-400",
                        selectedPet.faction === "horde" && "bg-rose-500/20 text-rose-400",
                        selectedPet.faction === "nature" && "bg-emerald-500/20 text-emerald-400",
                        selectedPet.faction === "special" && "bg-purple-500/20 text-purple-400"
                      )}
                    >
                      {selectedPet.factionVi}
                    </span>
                    {selectedPet.isNew && (
                      <span className="rounded bg-amber-500 px-1 py-0.2 text-xs font-bold text-slate-950">
                        NEW
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground font-sans mt-0.5">
                    {isVi
                      ? `Phẩm chất: ${selectedPet.rarity === "mythic" ? "Cam (Thần Thoại)" : "Lam (Hiếm)"} • Mở khóa từ Break ${selectedPet.originBreak}`
                      : `Rarity: ${selectedPet.rarity.toUpperCase()} • Unlocked at Break ${selectedPet.originBreak}`}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* PHÂN KHU 2: THIẾT LẬP KHOẢNG CẤP ĐỘ (LEVEL RANGE: 1 ➔ 120) */}
          <div className={CALC_MD3.tonalGroup}>
            <div className="flex items-center gap-2 mb-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20 text-amber-500 text-xs font-mono font-bold">
                2
              </span>
              <h2 className="text-sm sm:text-base font-heading font-bold text-foreground">
                {isVi ? "Thiết Lập Khoảng Cấp Độ (Lv.1 – Lv.120)" : "Set Level Range (Lv.1 – Lv.120)"}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Stepper Cấp Hiện Tại */}
              <div className="rounded-xl border border-border/60 bg-background/50 p-3.5 space-y-2">
                <span className="text-xs font-sans font-semibold text-muted-foreground">
                  {isVi ? "CẤP ĐỘ HIỆN TẠI" : "CURRENT LEVEL"}
                </span>
                <div className="flex items-center justify-between gap-3">
                  <CalculatorStepperButton
                    direction="decrease"
                    testId="pet-from-level-decrease"
                    ariaLabel={isVi ? "Giảm cấp độ hiện tại" : "Decrease current level"}
                    onClick={() => setFromLevel((prev) => Math.max(1, prev - 1))}
                    disabled={fromLevel <= 1}
                  />
                  <div className="flex items-center justify-center flex-1 h-11 bg-muted/40 rounded-xl border border-border/40">
                    <span className="text-lg font-mono font-bold text-foreground">
                      Lv. {fromLevel}
                    </span>
                  </div>
                  <CalculatorStepperButton
                    direction="increase"
                    testId="pet-from-level-increase"
                    ariaLabel={isVi ? "Tăng cấp độ hiện tại" : "Increase current level"}
                    onClick={() => setFromLevel((prev) => Math.min(toLevel, prev + 1))}
                    disabled={fromLevel >= toLevel}
                  />
                </div>
              </div>

              {/* Stepper Cấp Mục Tiêu */}
              <div className="rounded-xl border border-border/60 bg-background/50 p-3.5 space-y-2">
                <span className="text-xs font-sans font-semibold text-muted-foreground">
                  {isVi ? "CẤP ĐỘ MỤC TIÊU" : "TARGET LEVEL"}
                </span>
                <div className="flex items-center justify-between gap-3">
                  <CalculatorStepperButton
                    direction="decrease"
                    testId="pet-to-level-decrease"
                    ariaLabel={isVi ? "Giảm cấp độ mục tiêu" : "Decrease target level"}
                    onClick={() => setToLevel((prev) => Math.max(fromLevel, prev - 1))}
                    disabled={toLevel <= fromLevel}
                  />
                  <div className="flex items-center justify-center flex-1 h-11 bg-amber-500/10 rounded-xl border border-amber-500/30">
                    <span className="text-lg font-mono font-bold text-amber-400">
                      Lv. {toLevel}
                    </span>
                  </div>
                  <CalculatorStepperButton
                    direction="increase"
                    testId="pet-to-level-increase"
                    ariaLabel={isVi ? "Tăng cấp độ mục tiêu" : "Increase target level"}
                    onClick={() => setToLevel((prev) => Math.min(120, prev + 1))}
                    disabled={toLevel >= 120}
                  />
                </div>
              </div>
            </div>

            {/* Quick Milestone Chips */}
            <div className="mt-3.5 pt-3 border-t border-border/40 flex flex-wrap items-center gap-2">
              <span className="text-xs text-muted-foreground font-sans mr-1">
                {isVi ? "Mốc nhanh:" : "Quick Jumps:"}
              </span>
              {LEVEL_QUICK_CHIPS.map((chip) => {
                const isActive = toLevel === chip.level;
                return (
                  <button
                    key={chip.level}
                    type="button"
                    onClick={() => handleSetQuickLevel(chip.level)}
                    className={cn(
                      "min-h-[44px] px-3 py-1.5 rounded-lg text-xs font-sans font-semibold transition-all flex items-center justify-center",
                      isActive
                        ? "bg-amber-500 text-slate-950 font-bold shadow-sm"
                        : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {chip.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* PHÂN KHU 3: NGUYÊN LIỆU HIỆN CÓ TRONG KHO (INVENTORY SUBTRACTION) */}
          <div className={CALC_MD3.tonalGroup}>
            <div className="flex items-center gap-2 mb-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20 text-amber-500 text-xs font-mono font-bold">
                3
              </span>
              <h2 className="text-sm sm:text-base font-heading font-bold text-foreground">
                {isVi ? "Nguyên Liệu Trong Túi Đồ (Khấu Trừ Kho)" : "Inventory Items (Bag Subtraction)"}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Đồ Ăn Thú Cưng Trong Kho */}
              <div className="rounded-xl border border-border/60 bg-background/50 p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="pet-food-input"
                    className="text-xs font-sans font-semibold text-muted-foreground flex items-center gap-1.5"
                  >
                    🥩 {isVi ? "Đồ Ăn Thú Cưng Trong Túi" : "Owned Pet Food"}
                  </label>
                  {ownedFoodNumber > 0 && (
                    <span className="text-xs font-mono text-emerald-400 font-medium">
                      {formatCompactNumber(ownedFoodNumber)}
                    </span>
                  )}
                </div>
                <input
                  id="pet-food-input"
                  type="text"
                  inputMode="numeric"
                  value={ownedFoodInput}
                  onChange={(e) => setOwnedFoodInput(e.target.value)}
                  placeholder="0"
                  className={cn(
                    CALC_MD3.dataInput,
                    "h-11 min-h-[44px] text-base font-mono font-bold"
                  )}
                />
              </div>

              {/* Tinh Chất Thú Cưng Trong Kho */}
              <div className="rounded-xl border border-border/60 bg-background/50 p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="pet-essence-input"
                    className="text-xs font-sans font-semibold text-muted-foreground flex items-center gap-1.5"
                  >
                    🧪 {isVi ? "Tinh Chất Thú Cưng Trong Túi" : "Owned Pet Essence"}
                  </label>
                  {ownedEssenceNumber > 0 && (
                    <span className="text-xs font-mono text-emerald-400 font-medium">
                      {formatCompactNumber(ownedEssenceNumber)}
                    </span>
                  )}
                </div>
                <input
                  id="pet-essence-input"
                  type="text"
                  inputMode="numeric"
                  value={ownedEssenceInput}
                  onChange={(e) => setOwnedEssenceInput(e.target.value)}
                  placeholder="0"
                  className={cn(
                    CALC_MD3.dataInput,
                    "h-11 min-h-[44px] text-base font-mono font-bold"
                  )}
                />
              </div>
            </div>
          </div>

          {/* PHÂN KHU 4: KẾT QUẢ TÍNH TOÁN & ĐUA TOP SỰ KIỆN */}
          <div className="space-y-4 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Thẻ Đồ Ăn Thú Cưng */}
              <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-card to-card p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-sans font-bold uppercase tracking-wider text-amber-500">
                    🥩 {isVi ? "TỔNG ĐỒ ĂN THÚ CƯNG CẦN" : "TOTAL PET FOOD"}
                  </span>
                  {upgradeResult.missingFood === 0 && upgradeResult.requiredFood > 0 && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-sans font-bold text-emerald-400">
                      <CheckCircle2 className="h-3 w-3" />
                      {isVi ? "Đã Đủ Kho" : "Fully In Stock"}
                    </span>
                  )}
                </div>

                <div className="text-3xl sm:text-4xl font-heading font-black text-foreground tabular-nums">
                  {formatExactNumber(upgradeResult.requiredFood)}
                </div>

                <div className="pt-2 border-t border-border/40 flex items-center justify-between text-xs font-sans">
                  <span className="text-muted-foreground">
                    {isVi ? "Sau khi trừ túi đồ:" : "Deficit after bag:"}
                  </span>
                  <span
                    className={cn(
                      "font-mono font-bold",
                      upgradeResult.missingFood > 0 ? "text-rose-400" : "text-emerald-400"
                    )}
                  >
                    {upgradeResult.missingFood > 0
                      ? isVi
                        ? `Còn thiếu ${formatExactNumber(upgradeResult.missingFood)}`
                        : `Missing ${formatExactNumber(upgradeResult.missingFood)}`
                      : isVi
                      ? "Đủ tài nguyên"
                      : "Ready to Upgrade"}
                  </span>
                </div>
              </div>

              {/* Thẻ Tinh Chất Thú Cưng */}
              <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-500/10 via-card to-card p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-sans font-bold uppercase tracking-wider text-purple-400">
                    🧪 {isVi ? "TỔNG TINH CHẤT THÚ CƯNG CẦN" : "TOTAL PET ESSENCE"}
                  </span>
                  {upgradeResult.missingEssence === 0 && upgradeResult.requiredEssence > 0 && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-sans font-bold text-emerald-400">
                      <CheckCircle2 className="h-3 w-3" />
                      {isVi ? "Đã Đủ Kho" : "Fully In Stock"}
                    </span>
                  )}
                </div>

                <div className="text-3xl sm:text-4xl font-heading font-black text-foreground tabular-nums">
                  {formatExactNumber(upgradeResult.requiredEssence)}
                </div>

                <div className="pt-2 border-t border-border/40 flex items-center justify-between text-xs font-sans">
                  <span className="text-muted-foreground">
                    {isVi ? "Mở khóa từ Lv.91–120:" : "Applies to Lv.91–120:"}
                  </span>
                  <span
                    className={cn(
                      "font-mono font-bold",
                      upgradeResult.missingEssence > 0 ? "text-rose-400" : "text-emerald-400"
                    )}
                  >
                    {upgradeResult.missingEssence > 0
                      ? isVi
                        ? `Còn thiếu ${formatExactNumber(upgradeResult.missingEssence)}`
                        : `Missing ${formatExactNumber(upgradeResult.missingEssence)}`
                      : isVi
                      ? "Đủ tài nguyên"
                      : "Ready to Upgrade"}
                  </span>
                </div>
              </div>
            </div>

            {/* Thẻ Điểm Sự Kiện GAR / KvK */}
            <div className="rounded-2xl border border-amber-500/40 bg-card p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-amber-500" />
                  <span className="text-xs font-sans font-bold uppercase tracking-wider text-amber-400">
                    {isVi ? "ĐIỂM SỰ KIỆN GAR / KVK DỰ KIẾN (NGÀY 5 - THỨ SÁU)" : "ESTIMATED FRIDAY GAR / KVK POINTS"}
                  </span>
                </div>
                <span className="rounded-md bg-amber-500/15 px-2 py-0.5 text-xs font-mono font-bold text-amber-300">
                  960đ/100 Food • 480đ/Essence
                </span>
              </div>

              <div className="text-2xl sm:text-3xl font-heading font-black text-amber-400 tabular-nums">
                +{formatExactNumber(upgradeResult.garEventPoints)} {isVi ? "Điểm" : "Points"}
              </div>

              <p className="text-xs text-muted-foreground font-sans">
                {isVi
                  ? "Khuyến nghị xả tài nguyên vào Thứ Sáu kỳ Chạy Đua Vũ Trang (GAR) hoặc Vương Quốc Chiến (KvK) để tối đa hóa thứ hạng rương và phần thưởng cá nhân."
                  : "Recommended to spend resources on Friday of Guild Arms Race (GAR) or KvK to maximize milestone chest rewards."}
              </p>
            </div>
          </div>

          {/* PHÂN KHU 5: BẢNG KÊ CHI TIẾT TỪNG CẤP ĐỘ */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setShowBreakdown((prev) => !prev)}
              className="w-full min-h-[44px] flex items-center justify-between p-3.5 rounded-xl border border-border/60 bg-muted/30 hover:bg-muted/50 transition-colors text-xs font-sans font-semibold text-foreground"
            >
              <span className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-amber-500" />
                {isVi
                  ? `Xem Chi Tiết Chi Phí Từng Cấp (${upgradeResult.breakdown.length} Cấp Độ)`
                  : `View Breakdown Table (${upgradeResult.breakdown.length} Levels)`}
              </span>
              {showBreakdown ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </button>

            {showBreakdown && (
              <div className="mt-3 rounded-xl border border-border/60 overflow-hidden bg-card/60">
                <div className="overflow-x-auto max-h-80 scrollbar-thin">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead className="bg-muted/80 sticky top-0 border-b border-border/60 z-10">
                      <tr>
                        <th className="p-2.5 font-bold text-muted-foreground">{isVi ? "Cấp" : "Level"}</th>
                        <th className="p-2.5 font-bold text-muted-foreground">{isVi ? "Đồ Ăn Bước" : "Step Food"}</th>
                        <th className="p-2.5 font-bold text-muted-foreground">{isVi ? "Tinh Chất Bước" : "Step Ess"}</th>
                        <th className="p-2.5 font-bold text-muted-foreground">{isVi ? "Đồ Ăn Lũy Kế" : "Cum Food"}</th>
                        <th className="p-2.5 font-bold text-muted-foreground">{isVi ? "Chiến Lực" : "Power"}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/40 font-mono">
                      {upgradeResult.breakdown.map((row) => (
                        <tr key={row.level} className="hover:bg-muted/30 transition-colors">
                          <td className="p-2.5 font-bold text-foreground">Lv.{row.level}</td>
                          <td className="p-2.5 text-muted-foreground">{formatExactNumber(row.stepFood)}</td>
                          <td className="p-2.5 text-purple-400">
                            {row.stepEssence > 0 ? formatExactNumber(row.stepEssence) : "-"}
                          </td>
                          <td className="p-2.5 text-amber-400 font-semibold">
                            {formatExactNumber(row.cumulativeFood)}
                          </td>
                          <td className="p-2.5 text-emerald-400">
                            {formatExactNumber(row.fightforce)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

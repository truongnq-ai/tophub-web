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
  Swords,
  Crown,
} from "lucide-react";
import {
  PET_CATALOG,
  PET_BREAK_MILESTONES,
  calculatePetBreakthroughUpgrade,
  getPetById,
  type PetDefinition,
  type PetFaction,
  type PetBreakMilestone,
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

export interface PetBreakthroughCalculatorProps {
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

const BREAK_QUICK_CHIPS = [
  { breakIndex: 9, label: "Epic 4★ F2" },
  { breakIndex: 13, label: "Leg 2★ F3" },
  { breakIndex: 16, label: "Leg 5★" },
  { breakIndex: 17, label: "Mythic 0★" },
  { breakIndex: 22, label: "Mythic 5★" },
  { breakIndex: 23, label: "Titan 5★ F4" },
];

export function PetBreakthroughCalculator({
  tool,
  locale,
}: PetBreakthroughCalculatorProps) {
  const [selectedPetId, setSelectedPetId] = useState<number>(840007); // Mèo Ánh Lửa (Flickerkit) mặc định
  const [activeFaction, setActiveFaction] = useState<"all" | PetFaction>("all");
  const [fromBreak, setFromBreak] = useState<number>(5); // Base Mythic
  const [toBreak, setToBreak] = useState<number>(16); // Huyền Thoại 5★
  const [ownedSameInput, setOwnedSameInput] = useState<string>("0");
  const [ownedAnyInput, setOwnedAnyInput] = useState<string>("0");
  const [ownedEssenceInput, setOwnedEssenceInput] = useState<string>("0");
  const [showBreakdown, setShowBreakdown] = useState<boolean>(false);

  const selectedPet: PetDefinition = useMemo(() => {
    return getPetById(selectedPetId) ?? PET_CATALOG[0]!;
  }, [selectedPetId]);

  const filteredPets = useMemo(() => {
    if (activeFaction === "all") return PET_CATALOG;
    return PET_CATALOG.filter((p) => p.faction === activeFaction);
  }, [activeFaction]);

  const minAllowedBreak = useMemo(() => {
    return selectedPet.originBreak;
  }, [selectedPet]);

  const maxAllowedBreak = useMemo(() => {
    return selectedPet.maxBreak;
  }, [selectedPet]);

  const handleSelectPet = (pet: PetDefinition) => {
    setSelectedPetId(pet.id);
    setFromBreak(pet.originBreak);
    setToBreak(Math.min(pet.maxBreak, Math.max(pet.originBreak + 4, 16)));
  };

  const ownedSameNumber = useMemo(() => {
    return parseCompactNumberInput(cleanInput(ownedSameInput));
  }, [ownedSameInput]);

  const ownedAnyNumber = useMemo(() => {
    return parseCompactNumberInput(cleanInput(ownedAnyInput));
  }, [ownedAnyInput]);

  const ownedEssenceNumber = useMemo(() => {
    return parseCompactNumberInput(cleanInput(ownedEssenceInput));
  }, [ownedEssenceInput]);

  function cleanInput(val: string): string {
    return val.replace(/,/g, "").trim();
  }

  const result = useMemo(() => {
    return calculatePetBreakthroughUpgrade({
      fromBreak,
      toBreak,
      ownedSame: ownedSameNumber,
      ownedAny: ownedAnyNumber,
      ownedEssence: ownedEssenceNumber,
    });
  }, [fromBreak, toBreak, ownedSameNumber, ownedAnyNumber, ownedEssenceNumber]);

  const currentMilestone: PetBreakMilestone = useMemo(() => {
    return PET_BREAK_MILESTONES[fromBreak] ?? PET_BREAK_MILESTONES[0]!;
  }, [fromBreak]);

  const targetMilestone: PetBreakMilestone = useMemo(() => {
    return PET_BREAK_MILESTONES[toBreak] ?? PET_BREAK_MILESTONES[0]!;
  }, [toBreak]);

  // Form image based on target breakthrough (Form 1..4)
  const currentTargetForm = useMemo(() => {
    const formIdx = Math.max(0, Math.min(selectedPet.forms.length - 1, result.targetForm - 1));
    return selectedPet.forms[formIdx] ?? selectedPet.forms[0]!;
  }, [selectedPet, result.targetForm]);

  const handleReset = () => {
    setSelectedPetId(840007);
    setActiveFaction("all");
    setFromBreak(5);
    setToBreak(16);
    setOwnedSameInput("0");
    setOwnedAnyInput("0");
    setOwnedEssenceInput("0");
    setShowBreakdown(false);
  };

  const handleSetQuickBreak = (target: number) => {
    const safeTarget = Math.min(maxAllowedBreak, target);
    if (safeTarget <= fromBreak) {
      setFromBreak(Math.max(minAllowedBreak, safeTarget - 4));
    }
    setToBreak(safeTarget);
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
              triggerTestId="pet-breakthrough-info-trigger"
              dialogTestId="pet-breakthrough-info-dialog"
              title={
                isVi
                  ? "Hướng Dẫn Đột Phá Sao Thú Cưng & Kế Thừa Chỉ Số"
                  : "Pet Star Breakthrough Guide & Stat Inheritance"
              }
              subtitle={
                isVi
                  ? "Cơ chế tiêu hao Bản sao, Phôi bất kỳ, Tinh chất qua 23 bậc sao & 4 hình thái ngoại hình"
                  : "Same copies, any fodder, essence costs across 23 milestones & 4 form evolutions"
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
          {/* PHÂN KHU 1: CHỌN THÚ CƯNG & XEM TRƯỚC HÌNH THÁI NGOẠI HÌNH */}
          <div className={CALC_MD3.tonalGroup}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20 text-amber-500 text-xs font-mono font-bold">
                  1
                </span>
                <h2 className="text-sm sm:text-base font-heading font-bold text-foreground">
                  {isVi ? "Chọn Thú Cưng & Xem Trước Hình Thái" : "Select Pet & Preview Evolution"}
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
                      onClick={() => handleSelectPet(pet)}
                      className={cn(
                        "relative flex flex-col items-center gap-1.5 p-2 rounded-xl border transition-all text-center min-w-[76px] sm:min-w-[84px] min-h-[44px]",
                        isSelected
                          ? "border-amber-500 bg-amber-500/15 shadow-sm ring-2 ring-amber-500/40"
                          : "border-border/60 bg-card/60 hover:border-border hover:bg-card"
                      )}
                    >
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

            {/* Form Evolution Preview Showcase */}
            <div className="mt-3 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-card to-card p-4">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-2xl overflow-hidden border-2 border-amber-500/50 shadow-md shrink-0 bg-background/60">
                    <Image
                      src={currentTargetForm.headPath}
                      alt={currentTargetForm.nameVi}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                    <span className="absolute bottom-1 right-1 rounded bg-black/80 px-1.5 py-0.2 text-xs font-mono font-bold text-amber-400">
                      F{result.targetForm}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-base sm:text-lg font-heading font-black text-foreground">
                        {selectedPet.nameVi}
                      </span>
                      <span className="text-xs font-sans font-semibold text-amber-400">
                        ({currentTargetForm.nameVi})
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs font-sans">
                      <span className="rounded bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5">
                        {targetMilestone.tierNameVi}
                      </span>
                      <span className="text-muted-foreground">
                        {isVi ? "Kế Thừa Chỉ Số:" : "Stat Transfer:"}
                      </span>
                      <span className="font-mono font-bold text-emerald-400 text-sm">
                        {result.currentInheritancePct.toFixed(2)}% ➔ {result.targetInheritancePct.toFixed(2)}%
                      </span>
                      {result.statGainPct > 0 && (
                        <span className="font-mono font-bold text-amber-400">
                          (+{result.statGainPct.toFixed(2)}%)
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-muted-foreground font-sans">
                      {isVi
                        ? `Giới hạn cấp Thú Cưng: Lv.${currentMilestone.maxPetLevel} ➔ Lv.${targetMilestone.maxPetLevel} (+${targetMilestone.maxPetLevel - currentMilestone.maxPetLevel} Cấp)`
                        : `Level Cap Bonus: Lv.${currentMilestone.maxPetLevel} ➔ Lv.${targetMilestone.maxPetLevel}`}
                    </p>
                  </div>
                </div>

                {/* 4 Skill Indicators */}
                <div className="w-full md:w-auto bg-muted/40 rounded-xl p-2.5 border border-border/40">
                  <span className="text-xs font-sans font-bold text-muted-foreground block mb-1.5">
                    {isVi ? "KỸ NĂNG THEO MỐC:" : "SKILL MILESTONES:"}
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs font-sans">
                    {selectedPet.skills.map((skill, idx) => (
                      <div key={skill.id} className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-amber-500" />
                        <span className="text-foreground font-medium truncate max-w-[140px]">
                          {skill.nameVi}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PHÂN KHU 2: CHỌN BẬC ĐỘT PHÁ HIỆN TẠI & MỤC TIÊU */}
          <div className={CALC_MD3.tonalGroup}>
            <div className="flex items-center gap-2 mb-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20 text-amber-500 text-xs font-mono font-bold">
                2
              </span>
              <h2 className="text-sm sm:text-base font-heading font-bold text-foreground">
                {isVi ? "Chọn Bậc Đột Phá Sao (Break 0 – Break 23)" : "Select Breakthrough (Break 0 – Break 23)"}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Stepper Bậc Hiện Tại */}
              <div className="rounded-xl border border-border/60 bg-background/50 p-3.5 space-y-2">
                <span className="text-xs font-sans font-semibold text-muted-foreground">
                  {isVi ? "BẬC ĐỘT PHÁ HIỆN TẠI" : "CURRENT BREAKTHROUGH"}
                </span>
                <div className="flex items-center justify-between gap-3">
                  <CalculatorStepperButton
                    direction="decrease"
                    testId="pet-from-break-decrease"
                    ariaLabel={isVi ? "Giảm bậc đột phá hiện tại" : "Decrease current breakthrough"}
                    onClick={() => setFromBreak((prev) => Math.max(minAllowedBreak, prev - 1))}
                    disabled={fromBreak <= minAllowedBreak}
                  />
                  <div className="flex flex-col items-center justify-center flex-1 h-11 bg-muted/40 rounded-xl border border-border/40 px-2 text-center">
                    <span className="text-sm font-mono font-bold text-foreground">
                      Break {fromBreak}
                    </span>
                    <span className="text-xs font-sans text-muted-foreground truncate max-w-[140px]">
                      {currentMilestone.tierNameVi}
                    </span>
                  </div>
                  <CalculatorStepperButton
                    direction="increase"
                    testId="pet-from-break-increase"
                    ariaLabel={isVi ? "Tăng bậc đột phá hiện tại" : "Increase current breakthrough"}
                    onClick={() => setFromBreak((prev) => Math.min(toBreak, prev + 1))}
                    disabled={fromBreak >= toBreak}
                  />
                </div>
              </div>

              {/* Stepper Bậc Mục Tiêu */}
              <div className="rounded-xl border border-border/60 bg-background/50 p-3.5 space-y-2">
                <span className="text-xs font-sans font-semibold text-muted-foreground">
                  {isVi ? "BẬC ĐỘT PHÁ MỤC TIÊU" : "TARGET BREAKTHROUGH"}
                </span>
                <div className="flex items-center justify-between gap-3">
                  <CalculatorStepperButton
                    direction="decrease"
                    testId="pet-to-break-decrease"
                    ariaLabel={isVi ? "Giảm bậc đột phá mục tiêu" : "Decrease target breakthrough"}
                    onClick={() => setToBreak((prev) => Math.max(fromBreak, prev - 1))}
                    disabled={toBreak <= fromBreak}
                  />
                  <div className="flex flex-col items-center justify-center flex-1 h-11 bg-amber-500/10 rounded-xl border border-amber-500/30 px-2 text-center">
                    <span className="text-sm font-mono font-bold text-amber-400">
                      Break {toBreak}
                    </span>
                    <span className="text-xs font-sans text-amber-300 font-semibold truncate max-w-[140px]">
                      {targetMilestone.tierNameVi}
                    </span>
                  </div>
                  <CalculatorStepperButton
                    direction="increase"
                    testId="pet-to-break-increase"
                    ariaLabel={isVi ? "Tăng bậc đột phá mục tiêu" : "Increase target breakthrough"}
                    onClick={() => setToBreak((prev) => Math.min(maxAllowedBreak, prev + 1))}
                    disabled={toBreak >= maxAllowedBreak}
                  />
                </div>
              </div>
            </div>

            {/* Quick Breakthrough Milestone Chips */}
            <div className="mt-3.5 pt-3 border-t border-border/40 flex flex-wrap items-center gap-2">
              <span className="text-xs text-muted-foreground font-sans mr-1">
                {isVi ? "Mốc nhanh:" : "Quick Jumps:"}
              </span>
              {BREAK_QUICK_CHIPS.map((chip) => {
                if (chip.breakIndex > maxAllowedBreak) return null;
                const isActive = toBreak === chip.breakIndex;
                return (
                  <button
                    key={chip.breakIndex}
                    type="button"
                    onClick={() => handleSetQuickBreak(chip.breakIndex)}
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

          {/* PHÂN KHU 3: NGUYÊN LIỆU HIỆN CÓ TRONG TÚI (INVENTORY SUBTRACTION) */}
          <div className={CALC_MD3.tonalGroup}>
            <div className="flex items-center gap-2 mb-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20 text-amber-500 text-xs font-mono font-bold">
                3
              </span>
              <h2 className="text-sm sm:text-base font-heading font-bold text-foreground">
                {isVi ? "Nguyên Liệu Trong Túi Đồ (Khấu Trừ Kho)" : "Inventory Bag Items"}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Bản sao cùng loại */}
              <div className="rounded-xl border border-border/60 bg-background/50 p-3 space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="same-copy-input"
                    className="text-xs font-sans font-semibold text-muted-foreground"
                  >
                    🐾 {isVi ? "Bản Sao Cùng Loài" : "Same Copies"}
                  </label>
                  {ownedSameNumber > 0 && (
                    <span className="text-xs font-mono text-emerald-400 font-medium">
                      {formatCompactNumber(ownedSameNumber)}
                    </span>
                  )}
                </div>
                <input
                  id="same-copy-input"
                  type="text"
                  inputMode="numeric"
                  value={ownedSameInput}
                  onChange={(e) => setOwnedSameInput(e.target.value)}
                  placeholder="0"
                  className={cn(
                    CALC_MD3.dataInput,
                    "h-11 min-h-[44px] text-base font-mono font-bold"
                  )}
                />
              </div>

              {/* Phôi bất kỳ cùng phẩm chất */}
              <div className="rounded-xl border border-border/60 bg-background/50 p-3 space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="any-fodder-input"
                    className="text-xs font-sans font-semibold text-muted-foreground"
                  >
                    🌟 {isVi ? "Phôi Bất Kỳ" : "Any Fodder"}
                  </label>
                  {ownedAnyNumber > 0 && (
                    <span className="text-xs font-mono text-emerald-400 font-medium">
                      {formatCompactNumber(ownedAnyNumber)}
                    </span>
                  )}
                </div>
                <input
                  id="any-fodder-input"
                  type="text"
                  inputMode="numeric"
                  value={ownedAnyInput}
                  onChange={(e) => setOwnedAnyInput(e.target.value)}
                  placeholder="0"
                  className={cn(
                    CALC_MD3.dataInput,
                    "h-11 min-h-[44px] text-base font-mono font-bold"
                  )}
                />
              </div>

              {/* Tinh chất thú cưng */}
              <div className="rounded-xl border border-border/60 bg-background/50 p-3 space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="essence-break-input"
                    className="text-xs font-sans font-semibold text-muted-foreground"
                  >
                    🧪 {isVi ? "Tinh Chất Thú Cưng" : "Pet Essence"}
                  </label>
                  {ownedEssenceNumber > 0 && (
                    <span className="text-xs font-mono text-emerald-400 font-medium">
                      {formatCompactNumber(ownedEssenceNumber)}
                    </span>
                  )}
                </div>
                <input
                  id="essence-break-input"
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

          {/* PHÂN KHU 4: KẾT QUẢ TÍNH TOÁN NGUYÊN LIỆU ĐỘT PHÁ */}
          <div className="space-y-4 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Thẻ Bản Sao Cùng Loài */}
              <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-card to-card p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-sans font-bold uppercase tracking-wider text-amber-500">
                    🐾 {isVi ? "BẢN SAO CÙNG LOÀI" : "SAME COPIES"}
                  </span>
                  {result.missingSameCopies === 0 && result.requiredSameCopies > 0 && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-sans font-bold text-emerald-400">
                      <CheckCircle2 className="h-3 w-3" />
                      {isVi ? "Đủ" : "OK"}
                    </span>
                  )}
                </div>

                <div className="text-3xl font-heading font-black text-foreground tabular-nums">
                  {formatExactNumber(result.requiredSameCopies)}
                </div>

                <div className="pt-2 border-t border-border/40 text-xs font-sans flex items-center justify-between">
                  <span className="text-muted-foreground">
                    {isVi ? "Sau trừ kho:" : "Deficit:"}
                  </span>
                  <span
                    className={cn(
                      "font-mono font-bold",
                      result.missingSameCopies > 0 ? "text-rose-400" : "text-emerald-400"
                    )}
                  >
                    {result.missingSameCopies > 0
                      ? isVi
                        ? `Thiếu ${formatExactNumber(result.missingSameCopies)}`
                        : `Need ${formatExactNumber(result.missingSameCopies)}`
                      : isVi
                      ? "Đã đủ"
                      : "Ready"}
                  </span>
                </div>
              </div>

              {/* Thẻ Phôi Bất Kỳ */}
              <div className="rounded-2xl border border-sky-500/30 bg-gradient-to-br from-sky-500/10 via-card to-card p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-sans font-bold uppercase tracking-wider text-sky-400">
                    🌟 {isVi ? "PHÔI BẤT KỲ CÙNG PHẨM" : "ANY FODDER"}
                  </span>
                  {result.missingAnyFodder === 0 && result.requiredAnyFodder > 0 && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-sans font-bold text-emerald-400">
                      <CheckCircle2 className="h-3 w-3" />
                      {isVi ? "Đủ" : "OK"}
                    </span>
                  )}
                </div>

                <div className="text-3xl font-heading font-black text-foreground tabular-nums">
                  {formatExactNumber(result.requiredAnyFodder)}
                </div>

                <div className="pt-2 border-t border-border/40 text-xs font-sans flex items-center justify-between">
                  <span className="text-muted-foreground">
                    {isVi ? "Sau trừ kho:" : "Deficit:"}
                  </span>
                  <span
                    className={cn(
                      "font-mono font-bold",
                      result.missingAnyFodder > 0 ? "text-rose-400" : "text-emerald-400"
                    )}
                  >
                    {result.missingAnyFodder > 0
                      ? isVi
                        ? `Thiếu ${formatExactNumber(result.missingAnyFodder)}`
                        : `Need ${formatExactNumber(result.missingAnyFodder)}`
                      : isVi
                      ? "Đã đủ"
                      : "Ready"}
                  </span>
                </div>
              </div>

              {/* Thẻ Tinh Chất Đột Phá */}
              <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-500/10 via-card to-card p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-sans font-bold uppercase tracking-wider text-purple-400">
                    🧪 {isVi ? "TINH CHẤT ĐỘT PHÁ" : "PET ESSENCE"}
                  </span>
                  {result.missingEssence === 0 && result.requiredEssence > 0 && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-sans font-bold text-emerald-400">
                      <CheckCircle2 className="h-3 w-3" />
                      {isVi ? "Đủ" : "OK"}
                    </span>
                  )}
                </div>

                <div className="text-3xl font-heading font-black text-foreground tabular-nums">
                  {formatExactNumber(result.requiredEssence)}
                </div>

                <div className="pt-2 border-t border-border/40 text-xs font-sans flex items-center justify-between">
                  <span className="text-muted-foreground">
                    {isVi ? "Sau trừ kho:" : "Deficit:"}
                  </span>
                  <span
                    className={cn(
                      "font-mono font-bold",
                      result.missingEssence > 0 ? "text-rose-400" : "text-emerald-400"
                    )}
                  >
                    {result.missingEssence > 0
                      ? isVi
                        ? `Thiếu ${formatExactNumber(result.missingEssence)}`
                        : `Need ${formatExactNumber(result.missingEssence)}`
                      : isVi
                      ? "Đã đủ"
                      : "Ready"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* PHÂN KHU 5: BẢNG KÊ CHI TIẾT TỪNG BẬC ĐỘT PHÁ */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setShowBreakdown((prev) => !prev)}
              className="w-full min-h-[44px] flex items-center justify-between p-3.5 rounded-xl border border-border/60 bg-muted/30 hover:bg-muted/50 transition-colors text-xs font-sans font-semibold text-foreground"
            >
              <span className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-amber-500" />
                {isVi
                  ? `Xem Chi Tiết Từng Bậc Sao (${result.breakdown.length} Mốc Đột Phá)`
                  : `View Breakthrough Breakdown (${result.breakdown.length} Steps)`}
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
                        <th className="p-2.5 font-bold text-muted-foreground">{isVi ? "Bậc Sao" : "Break"}</th>
                        <th className="p-2.5 font-bold text-muted-foreground">{isVi ? "Bản Sao Bước" : "Step Same"}</th>
                        <th className="p-2.5 font-bold text-muted-foreground">{isVi ? "Phôi Bước" : "Step Any"}</th>
                        <th className="p-2.5 font-bold text-muted-foreground">{isVi ? "Tinh Chất Bước" : "Step Ess"}</th>
                        <th className="p-2.5 font-bold text-muted-foreground">{isVi ? "Kế Thừa" : "Stat %"}</th>
                        <th className="p-2.5 font-bold text-muted-foreground">{isVi ? "Trần Cấp" : "Max Lv"}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/40 font-mono">
                      {result.breakdown.map((row) => (
                        <tr key={row.breakIndex} className="hover:bg-muted/30 transition-colors">
                          <td className="p-2.5 font-bold text-foreground">
                            Break {row.breakIndex} ({row.tierNameVi})
                          </td>
                          <td className="p-2.5 text-amber-400 font-semibold">
                            {row.stepSame > 0 ? formatExactNumber(row.stepSame) : "-"}
                          </td>
                          <td className="p-2.5 text-sky-400">
                            {row.stepAny > 0 ? formatExactNumber(row.stepAny) : "-"}
                          </td>
                          <td className="p-2.5 text-purple-400">
                            {row.stepEssence > 0 ? formatExactNumber(row.stepEssence) : "-"}
                          </td>
                          <td className="p-2.5 text-emerald-400 font-bold">
                            {row.inheritancePct.toFixed(2)}%
                          </td>
                          <td className="p-2.5 text-muted-foreground">
                            Lv.{row.maxLevel}
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

"use client";

import React from "react";
import {
  CheckCircle2,
  Clock,
  Hammer,
  Info,
  Layers,
  Minus,
  Plus,
  RotateCcw,
  Search,
  Sparkles,
  TrendingUp,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  CalculatorCategory,
  CalculatorLocale,
  CalculatorToolItem,
  CalculatorZone,
} from "@/content/calculators/types";
import {
  CONSTRUCTION_BUILDINGS,
  CONSTRUCTION_GROUP_META,
  CONSTRUCTION_RESOURCE_META,
  DEFAULT_CONSTRUCTION_GLOBAL_BUFFS,
  DEFAULT_CONSTRUCTION_QUEUES,
  DIAMOND_ICON_PATH,
  PRESET_EXTRA_QUEUE_BUILDINGS,
  aggregateConstructionQueues,
  computeQueueUpgradePlan,
  formatAttributeValue,
  formatBuildDuration,
  formatBuildingLevelBadge,
  formatGameResourceCompact,
  type ConstructionBuildingGroupKey,
  type ConstructionGlobalBuffs,
  type ConstructionQueueState,
} from "@/content/calculators/construction-data";
import {
  CALC_MD3,
  CalculatorStepperButton,
  CalculatorToolHeader,
} from "./calculator-md3-primitives";
import { CalculatorInfoPopover } from "./calculator-info-popover";
import { ConstructionLevelSelector } from "./construction-level-selector";

export interface ConstructionCalculatorProps {
  readonly zone?: CalculatorZone;
  readonly category?: CalculatorCategory;
  readonly group?: CalculatorCategory;
  readonly tool: CalculatorToolItem;
  readonly locale?: CalculatorLocale;
}

const MIN_QUEUES = 1;
const MAX_QUEUES = 6;

export function ConstructionCalculator({
  tool,
  locale = "vi",
}: ConstructionCalculatorProps): React.JSX.Element {
  const isVi = locale === "vi";

  const [buffs, setBuffs] = React.useState<ConstructionGlobalBuffs>(
    DEFAULT_CONSTRUCTION_GLOBAL_BUFFS
  );
  const [queues, setQueues] = React.useState<readonly ConstructionQueueState[]>(
    DEFAULT_CONSTRUCTION_QUEUES
  );

  // Building Picker Modal state (stores queueId currently selecting a building)
  const [activePickerQueueId, setActivePickerQueueId] = React.useState<string | null>(
    null
  );
  const [pickerGroupTab, setPickerGroupTab] = React.useState<
    "all" | ConstructionBuildingGroupKey
  >("all");
  const [pickerSearch, setPickerSearch] = React.useState<string>("");

  const queuePlans = React.useMemo(
    () => queues.map((q) => computeQueueUpgradePlan(q, buffs)),
    [queues, buffs]
  );

  const globalSummary = React.useMemo(
    () => aggregateConstructionQueues(queuePlans),
    [queuePlans]
  );

  const handleResetAll = (): void => {
    setBuffs(DEFAULT_CONSTRUCTION_GLOBAL_BUFFS);
    setQueues(DEFAULT_CONSTRUCTION_QUEUES);
    setActivePickerQueueId(null);
  };

  const handleAddQueue = (): void => {
    setQueues((prev) => {
      if (prev.length >= MAX_QUEUES) return prev;
      const nextIndex = prev.length;
      const usedIds = new Set(prev.map((q) => q.buildingId));
      const candidateBuildingId =
        PRESET_EXTRA_QUEUE_BUILDINGS.find((id) => !usedIds.has(id)) ??
        CONSTRUCTION_BUILDINGS.find((b) => !usedIds.has(b.id))?.id ??
        117;
      const newQueue: ConstructionQueueState = {
        queueId: `queue-${Date.now()}-${nextIndex + 1}`,
        buildingId: candidateBuildingId,
        fromLevel: 33,
        toLevel: 34,
        multiplyBrillianceSubSteps: true,
        useNewServerPrerequisites: false,
      };
      return [...prev, newQueue];
    });
  };

  const handleRemoveQueue = (targetQueueId?: string): void => {
    setQueues((prev) => {
      if (prev.length <= MIN_QUEUES) return prev;
      if (targetQueueId) {
        return prev.filter((q) => q.queueId !== targetQueueId);
      }
      return prev.slice(0, prev.length - 1);
    });
  };

  const handleUpdateQueue = (
    queueId: string,
    updater: (prev: ConstructionQueueState) => ConstructionQueueState
  ): void => {
    setQueues((prev) =>
      prev.map((q) => (q.queueId === queueId ? updater(q) : q))
    );
  };

  const handleJumpToPrerequisite = (
    sourceQueueIndex: number,
    prereqBuildingId: number,
    requiredLevel: number
  ): void => {
    const safeTargetLv = Math.max(2, requiredLevel);
    const safeFromLv = Math.max(1, safeTargetLv - 1);

    setQueues((prev) => {
      // Check if another queue already has this prerequisite building
      const existingIdx = prev.findIndex((q) => q.buildingId === prereqBuildingId);
      if (existingIdx !== -1) {
        return prev.map((q, idx) =>
          idx === existingIdx
            ? { ...q, fromLevel: safeFromLv, toLevel: safeTargetLv }
            : q
        );
      }
      // Otherwise update the next queue if available, or add a new queue if < MAX_QUEUES
      const nextIdx = sourceQueueIndex + 1;
      if (nextIdx < prev.length) {
        return prev.map((q, idx) =>
          idx === nextIdx
            ? {
                ...q,
                buildingId: prereqBuildingId,
                fromLevel: safeFromLv,
                toLevel: safeTargetLv,
              }
            : q
        );
      }
      if (prev.length < MAX_QUEUES) {
        return [
          ...prev,
          {
            queueId: `queue-${Date.now()}-${prev.length + 1}`,
            buildingId: prereqBuildingId,
            fromLevel: safeFromLv,
            toLevel: safeTargetLv,
            multiplyBrillianceSubSteps: true,
            useNewServerPrerequisites: false,
          },
        ];
      }
      // Fallback: update current queue
      return prev.map((q, idx) =>
        idx === sourceQueueIndex
          ? {
              ...q,
              buildingId: prereqBuildingId,
              fromLevel: safeFromLv,
              toLevel: safeTargetLv,
            }
          : q
      );
    });
  };

  const filteredPickerBuildings = React.useMemo(() => {
    const q = pickerSearch.trim().toLowerCase();
    return CONSTRUCTION_BUILDINGS.filter((b) => {
      if (pickerGroupTab !== "all" && b.group !== pickerGroupTab) return false;
      if (!q) return true;
      return (
        b.name.vi.toLowerCase().includes(q) ||
        b.name.en.toLowerCase().includes(q) ||
        String(b.id).includes(q)
      );
    });
  }, [pickerGroupTab, pickerSearch]);

  const activePickerQueue = React.useMemo(
    () => queues.find((q) => q.queueId === activePickerQueueId) ?? null,
    [queues, activePickerQueueId]
  );

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Header */}
      <CalculatorToolHeader
        code={tool.code}
        title={isVi ? "Xây dựng" : "Construction"}
        actions={
          <>
            <CalculatorInfoPopover
              title={
                isVi
                  ? "Cơ Chế Thời Gian, Tài Nguyên & Bảng Tra Cứu 25 Công Trình"
                  : "Construction Time, Resource Formulas & 25-Building Reference"
              }
              locale={locale}
              triggerLabel={isVi ? "Bảng tra cứu" : "Reference Guide"}
            >
              <div className="space-y-4 text-sm font-sans leading-relaxed">
                <div className="rounded-xl bg-muted/50 p-3.5 space-y-2">
                  <p className="font-heading font-bold text-foreground">
                    {isVi
                      ? "1. Công thức tính Thời Gian Thực Tế & Kim Cương Mua Đứt (Chuẩn Meta.bytes)"
                      : "1. Effective Build Duration & Instant Diamond Formula (Meta.bytes Verified)"}
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>
                      {isVi
                        ? "Thời gian sau tăng tốc = floor( Thời gian ban đầu / (1 + Bonus tốc độ % / 100) )."
                        : "Speed-adjusted time = floor( Base Build Time / (1 + Speed Bonus % / 100) )."}
                    </li>
                    <li>
                      {isVi
                        ? "Thời gian thực tế mỗi cấp = max( 0, Thời gian sau tăng tốc - (Thời gian miễn phí + Đặc quyền XD miễn phí) × 60 )."
                        : "Effective time per step = max( 0, Speed-adjusted time - (Free Minutes + Privilege Minutes) × 60 )."}
                    </li>
                    <li>
                      {isVi
                        ? "Kim Cương Nâng Cấp Ngay = ceil( Thời gian thực tế (giây) / 3 ) (tương đương 20 Kim Cương / phút)."
                        : "Instant Upgrade Diamonds = ceil( Effective Seconds / 3 ) (20 Diamonds per minute)."}
                    </li>
                  </ul>
                </div>

                <div className="rounded-xl bg-muted/50 p-3.5 space-y-2">
                  <p className="font-heading font-bold text-foreground">
                    {isVi
                      ? "2. Cơ chế Cấp Huy Hoàng (Lv.41–80 / Brilliance 1–8)"
                      : "2. Brilliance Tiers (Lv.41-80 / Brilliance 1-8)"}
                  </p>
                  <p className="text-muted-foreground">
                    {isVi
                      ? "Từ cấp 40 trở lên, mỗi cấp công trình được chia thành 5 bậc nhỏ (0/5 ➔ 5/5) trong bảng citybuilding_lvup_new và tiêu thụ Tinh Chất Rồng (Dragon Essence). Công cụ tự động nhân ×5 bậc nhỏ khi lập kế hoạch tổng và cho phép bật/tắt linh hoạt trên thanh kéo."
                      : "Above Lv.40, each building level consists of 5 sub-steps (0/5 -> 5/5) in citybuilding_lvup_new and requires Dragon Essence. The planner automatically accounts for all 5 sub-steps and lets you toggle 1x/5x on the slider."}
                  </p>
                </div>
              </div>
            </CalculatorInfoPopover>

            <button
              type="button"
              onClick={handleResetAll}
              className={cn(
                CALC_MD3.chipButton,
                "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              <span>{isVi ? "Đặt lại" : "Reset"}</span>
            </button>
          </>
        }
      />

      {/* Section 1: Global Time Buffs (Popup i) */}
      <section
        data-testid="construction-global-buffs-card"
        className={cn(CALC_MD3.surfaceCard, "space-y-4")}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
              <Info className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <h2 className={CALC_MD3.sectionTitle}>
                {isVi
                  ? "Thông Số Thời Gian & Đặc Quyền Xây Dựng (Popup chữ i)"
                  : "Construction Time Buffs & Privileges (Info Popup i)"}
              </h2>
              <p className="text-xs font-sans text-muted-foreground">
                {isVi
                  ? "Áp dụng chung cho toàn bộ các đội xây dựng bên dưới"
                  : "Applied globally across all active construction queues below"}
              </p>
            </div>
          </div>
        </div>

        {/* 4 Global Buff Controls */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {/* 1. Free Build Time */}
          <div
            className={cn(
              CALC_MD3.tonalGroup,
              "flex flex-col justify-between gap-2.5 bg-slate-50/90 dark:bg-slate-800/50 ring-1 ring-slate-200/80 dark:ring-slate-700/60"
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-sans font-bold text-muted-foreground">
                {isVi ? "Thời gian miễn phí" : "Free Build Time"}
              </span>
              <span className="rounded-md bg-amber-500/15 px-2 py-0.5 font-mono text-xs font-bold text-amber-700 dark:text-amber-300">
                {buffs.freeMinutes}m
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <CalculatorStepperButton
                direction="decrease"
                testId="buff-free-minutes-decrease"
                ariaLabel={isVi ? "Giảm thời gian miễn phí" : "Decrease free time"}
                disabled={buffs.freeMinutes <= 0}
                onClick={() =>
                  setBuffs((prev) => ({
                    ...prev,
                    freeMinutes: Math.max(0, prev.freeMinutes - 1),
                  }))
                }
              />
              <div className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-card px-3 h-11 min-h-[44px]">
                <input
                  type="number"
                  min={0}
                  max={1440}
                  value={buffs.freeMinutes}
                  aria-label={isVi ? "Thời gian miễn phí (phút)" : "Free build time (minutes)"}
                  onChange={(e) =>
                    setBuffs((prev) => ({
                      ...prev,
                      freeMinutes: Math.max(
                        0,
                        Math.min(1440, Math.floor(Number(e.target.value) || 0))
                      ),
                    }))
                  }
                  className="w-16 bg-transparent text-center font-mono text-base font-black text-foreground focus:outline-none"
                />
                <span className="text-xs font-sans font-semibold text-muted-foreground">
                  {isVi ? "phút" : "min"}
                </span>
              </div>
              <CalculatorStepperButton
                direction="increase"
                testId="buff-free-minutes-increase"
                ariaLabel={isVi ? "Tăng thời gian miễn phí" : "Increase free time"}
                onClick={() =>
                  setBuffs((prev) => ({
                    ...prev,
                    freeMinutes: Math.min(1440, prev.freeMinutes + 1),
                  }))
                }
              />
            </div>
          </div>

          {/* 2. Privilege Free Build Time */}
          <div
            className={cn(
              CALC_MD3.tonalGroup,
              "flex flex-col justify-between gap-2.5 bg-slate-50/90 dark:bg-slate-800/50 ring-1 ring-slate-200/80 dark:ring-slate-700/60"
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-sans font-bold text-muted-foreground">
                {isVi ? "Đặc Quyền Xây Dựng Miễn Phí" : "Privilege Free Build Time"}
              </span>
              <span className="rounded-md bg-amber-500/15 px-2 py-0.5 font-mono text-xs font-bold text-amber-700 dark:text-amber-300">
                {buffs.privilegeMinutes}m
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <CalculatorStepperButton
                direction="decrease"
                testId="buff-privilege-minutes-decrease"
                ariaLabel={
                  isVi ? "Giảm đặc quyền miễn phí" : "Decrease privilege free time"
                }
                disabled={buffs.privilegeMinutes <= 0}
                onClick={() =>
                  setBuffs((prev) => ({
                    ...prev,
                    privilegeMinutes: Math.max(0, prev.privilegeMinutes - 5),
                  }))
                }
              />
              <div className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-card px-3 h-11 min-h-[44px]">
                <input
                  type="number"
                  min={0}
                  max={1440}
                  value={buffs.privilegeMinutes}
                  aria-label={
                    isVi
                      ? "Đặc quyền xây dựng miễn phí (phút)"
                      : "Privilege free build time (minutes)"
                  }
                  onChange={(e) =>
                    setBuffs((prev) => ({
                      ...prev,
                      privilegeMinutes: Math.max(
                        0,
                        Math.min(1440, Math.floor(Number(e.target.value) || 0))
                      ),
                    }))
                  }
                  className="w-16 bg-transparent text-center font-mono text-base font-black text-foreground focus:outline-none"
                />
                <span className="text-xs font-sans font-semibold text-muted-foreground">
                  {isVi ? "phút" : "min"}
                </span>
              </div>
              <CalculatorStepperButton
                direction="increase"
                testId="buff-privilege-minutes-increase"
                ariaLabel={
                  isVi ? "Tăng đặc quyền miễn phí" : "Increase privilege free time"
                }
                onClick={() =>
                  setBuffs((prev) => ({
                    ...prev,
                    privilegeMinutes: Math.min(1440, prev.privilegeMinutes + 5),
                  }))
                }
              />
            </div>
          </div>

          {/* 3. Construction Speed Bonus (%) */}
          <div
            className={cn(
              CALC_MD3.tonalGroup,
              "flex flex-col justify-between gap-2.5 bg-slate-50/90 dark:bg-slate-800/50 ring-1 ring-slate-200/80 dark:ring-slate-700/60"
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-sans font-bold text-muted-foreground">
                {isVi ? "Bonus tốc độ" : "Construction Speed Bonus"}
              </span>
              <span className="rounded-md bg-emerald-500/15 px-2 py-0.5 font-mono text-xs font-bold text-emerald-700 dark:text-emerald-300">
                +{buffs.speedBonusPct}%
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <CalculatorStepperButton
                direction="decrease"
                testId="buff-speed-bonus-decrease"
                ariaLabel={isVi ? "Giảm bonus tốc độ" : "Decrease speed bonus"}
                disabled={buffs.speedBonusPct <= 0}
                onClick={() =>
                  setBuffs((prev) => ({
                    ...prev,
                    speedBonusPct: Math.max(0, prev.speedBonusPct - 5),
                  }))
                }
              />
              <div className="flex flex-1 items-center justify-center gap-1 rounded-xl bg-card px-3 h-11 min-h-[44px]">
                <input
                  type="number"
                  min={0}
                  max={2000}
                  value={buffs.speedBonusPct}
                  aria-label={isVi ? "Bonus tốc độ (%)" : "Speed bonus (%)"}
                  onChange={(e) =>
                    setBuffs((prev) => ({
                      ...prev,
                      speedBonusPct: Math.max(
                        0,
                        Math.min(2000, Math.floor(Number(e.target.value) || 0))
                      ),
                    }))
                  }
                  className="w-16 bg-transparent text-center font-mono text-base font-black text-foreground focus:outline-none"
                />
                <span className="font-mono text-sm font-bold text-muted-foreground">
                  %
                </span>
              </div>
              <CalculatorStepperButton
                direction="increase"
                testId="buff-speed-bonus-increase"
                ariaLabel={isVi ? "Tăng bonus tốc độ" : "Increase speed bonus"}
                onClick={() =>
                  setBuffs((prev) => ({
                    ...prev,
                    speedBonusPct: Math.min(2000, prev.speedBonusPct + 5),
                  }))
                }
              />
            </div>
          </div>

          {/* 4. Resource Cost Reduction (%) */}
          <div
            className={cn(
              CALC_MD3.tonalGroup,
              "flex flex-col justify-between gap-2.5 bg-slate-50/90 dark:bg-slate-800/50 ring-1 ring-slate-200/80 dark:ring-slate-700/60"
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-sans font-bold text-muted-foreground">
                {isVi ? "Giảm chi phí tài nguyên XD" : "Resource Cost Reduction"}
              </span>
              <span className="rounded-md bg-sky-500/15 px-2 py-0.5 font-mono text-xs font-bold text-sky-700 dark:text-sky-300">
                -{buffs.costReductionPct}%
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <CalculatorStepperButton
                direction="decrease"
                testId="buff-cost-reduction-decrease"
                ariaLabel={isVi ? "Giảm % tiết kiệm tài nguyên" : "Decrease cost reduction"}
                disabled={buffs.costReductionPct <= 0}
                onClick={() =>
                  setBuffs((prev) => ({
                    ...prev,
                    costReductionPct: Math.max(0, prev.costReductionPct - 1),
                  }))
                }
              />
              <div className="flex flex-1 items-center justify-center gap-1 rounded-xl bg-card px-3 h-11 min-h-[44px]">
                <input
                  type="number"
                  min={0}
                  max={80}
                  value={buffs.costReductionPct}
                  aria-label={
                    isVi ? "Giảm chi phí tài nguyên (%)" : "Cost reduction (%)"
                  }
                  onChange={(e) =>
                    setBuffs((prev) => ({
                      ...prev,
                      costReductionPct: Math.max(
                        0,
                        Math.min(80, Math.floor(Number(e.target.value) || 0))
                      ),
                    }))
                  }
                  className="w-16 bg-transparent text-center font-mono text-base font-black text-foreground focus:outline-none"
                />
                <span className="font-mono text-sm font-bold text-muted-foreground">
                  %
                </span>
              </div>
              <CalculatorStepperButton
                direction="increase"
                testId="buff-cost-reduction-increase"
                ariaLabel={isVi ? "Tăng % tiết kiệm tài nguyên" : "Increase cost reduction"}
                onClick={() =>
                  setBuffs((prev) => ({
                    ...prev,
                    costReductionPct: Math.min(80, prev.costReductionPct + 1),
                  }))
                }
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Queue Count Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-1">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 text-slate-950 font-mono text-sm font-black shadow-sm">
            {queues.length}
          </span>
          <div>
            <h2 className="text-base sm:text-lg font-heading font-black text-foreground">
              {isVi
                ? `Danh Sách Đội Xây Dựng (${queues.length}/${MAX_QUEUES} Đội Xây)`
                : `Active Construction Queues (${queues.length}/${MAX_QUEUES} Queues)`}
            </h2>
            <p className="text-xs font-sans text-muted-foreground">
              {isVi
                ? "Mỗi đội xây là 1 khối nằm ngang gồm 4 cột thông tin và thanh kéo cấp độ bên dưới Cột 2–3–4"
                : "Each queue is a full-width horizontal block with 4 columns and a level slider under Columns 2-3-4"}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            data-testid="remove-construction-queue-btn"
            disabled={queues.length <= MIN_QUEUES}
            onClick={() => handleRemoveQueue()}
            className={cn(
              CALC_MD3.chipButton,
              "bg-muted/70 text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed"
            )}
          >
            <Minus className="h-4 w-4" aria-hidden="true" />
            <span>{isVi ? "Giảm đội xây" : "Remove Queue"}</span>
          </button>

          <button
            type="button"
            data-testid="add-construction-queue-btn"
            disabled={queues.length >= MAX_QUEUES}
            onClick={handleAddQueue}
            className={cn(
              CALC_MD3.chipButton,
              "bg-amber-500 text-slate-950 font-bold shadow-sm hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed"
            )}
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            <span>
              {isVi
                ? `Thêm đội xây (${queues.length}/${MAX_QUEUES})`
                : `Add Queue (${queues.length}/${MAX_QUEUES})`}
            </span>
          </button>
        </div>
      </div>

      {/* Section 3: Horizontal Full-Width Construction Queue Cards */}
      <div className="space-y-4">
        {queuePlans.map((plan, idx) => {
          const queueState = queues[idx]!;
          const groupInfo = CONSTRUCTION_GROUP_META[plan.building.group];
          const isCastle = plan.building.id === 117;

          return (
            <section
              key={plan.queueId}
              data-testid="construction-queue-card"
              className={cn(CALC_MD3.surfaceCard, "space-y-3.5")}
            >
              {/* Queue Header Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-2.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500/15 px-2.5 py-1 text-xs font-sans font-black text-amber-700 dark:text-amber-300">
                    <Hammer className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>
                      {isVi ? `ĐỘI XÂY #${idx + 1}` : `QUEUE #${idx + 1}`}
                    </span>
                  </span>
                  <span className="text-sm font-heading font-bold text-foreground">
                    {plan.building.name[locale]}
                  </span>
                  <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-sans font-semibold text-muted-foreground">
                    {groupInfo.badge[locale]}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {isCastle ? (
                    <button
                      type="button"
                      onClick={() =>
                        handleUpdateQueue(plan.queueId, (prev) => ({
                          ...prev,
                          useNewServerPrerequisites: !prev.useNewServerPrerequisites,
                        }))
                      }
                      className="inline-flex min-h-[44px] items-center rounded-xl bg-muted/60 px-3 text-xs font-sans font-semibold text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
                    >
                      {queueState.useNewServerPrerequisites
                        ? isVi
                          ? "Điều kiện: Server Mới (Tường Thành)"
                          : "Prereq: New Server (City Wall)"
                        : isVi
                        ? "Điều kiện: Chuẩn (Hội Thương Nhân)"
                        : "Prereq: Standard (Guild)"}
                    </button>
                  ) : null}

                  {queues.length > MIN_QUEUES ? (
                    <button
                      type="button"
                      aria-label={
                        isVi
                          ? `Xóa Đội Xây #${idx + 1}`
                          : `Remove Queue #${idx + 1}`
                      }
                      onClick={() => handleRemoveQueue(plan.queueId)}
                      className={cn(
                        CALC_MD3.iconButton,
                        "bg-muted/50 text-muted-foreground hover:bg-red-500/15 hover:text-red-500"
                      )}
                    >
                      <X className="h-4 w-4" aria-hidden="true" />
                    </button>
                  ) : null}
                </div>
              </div>

              {/* 4-Column Desktop Grid + Bottom Slider under Columns 2-3-4 */}
              <div className="grid grid-cols-1 gap-3.5 md:grid-cols-6 lg:grid-cols-12">
                {/* CỘT 1: Avatar & Thông tin về công trình (Spans 2 rows on Desktop lg:row-span-2) */}
                <div
                  className={cn(
                    CALC_MD3.tonalGroup,
                    "flex flex-col justify-between gap-3 md:col-span-6 lg:col-span-3 lg:row-span-2 bg-slate-50/90 dark:bg-slate-800/50 ring-1 ring-slate-200/80 dark:ring-slate-700/60"
                  )}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-sans font-bold uppercase tracking-wide text-muted-foreground">
                        {isVi ? "Cột 1 • Công trình" : "Col 1 • Building"}
                      </span>
                      <span className="rounded-md bg-amber-500/15 px-2 py-0.5 text-xs font-sans font-bold text-amber-700 dark:text-amber-300">
                        Max Lv.{plan.building.maxLevel}
                      </span>
                    </div>

                    {/* Building Avatar + Level Pill */}
                    <div className="flex items-center gap-3.5">
                      <div
                        data-testid="game-asset-frame"
                        className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-amber-500/40 bg-gradient-to-br from-amber-500/20 via-amber-500/5 to-transparent p-2 shadow-sm"
                      >
                        <img
                          src={plan.building.icon}
                          alt={plan.building.name[locale]}
                          width={64}
                          height={64}
                          className="h-16 w-16 object-contain drop-shadow"
                        />
                        <span className="absolute -bottom-1.5 inset-x-1.5 rounded-md bg-slate-900/90 px-1.5 py-0.5 text-center font-mono text-xs font-black text-amber-300">
                          Lv.{plan.fromLevel}
                        </span>
                      </div>

                      <div className="min-w-0 flex-1 space-y-1">
                        <h3 className="text-base sm:text-lg font-heading font-black text-foreground leading-snug">
                          {plan.building.name[locale]}
                        </h3>
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="rounded-lg bg-emerald-500/15 px-2.5 py-0.5 text-xs font-sans font-black text-emerald-700 dark:text-emerald-300">
                            {formatBuildingLevelBadge(plan.fromLevel, locale)} ➔{" "}
                            {formatBuildingLevelBadge(plan.toLevel, locale)}
                          </span>
                        </div>
                        <p className="text-xs font-sans text-muted-foreground line-clamp-2">
                          {plan.building.description[locale]}
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    data-testid={`queue-${idx + 1}-change-building-btn`}
                    onClick={() => {
                      setActivePickerQueueId(plan.queueId);
                      setPickerSearch("");
                    }}
                    className={cn(
                      CALC_MD3.chipButton,
                      "w-full bg-amber-500/15 text-amber-800 hover:bg-amber-500/25 dark:text-amber-300 font-bold"
                    )}
                  >
                    <Layers className="h-4 w-4" aria-hidden="true" />
                    <span>
                      {isVi
                        ? "Đổi công trình (25 Công trình)"
                        : "Switch Building (25 Buildings)"}
                    </span>
                  </button>
                </div>

                {/* CỘT 2: Thông tin Uy Thế và các thuộc tính cộng thêm (giống như hình) */}
                <div
                  className={cn(
                    CALC_MD3.tonalGroup,
                    "flex flex-col gap-2.5 md:col-span-2 lg:col-span-3 bg-slate-50/90 dark:bg-slate-800/50 ring-1 ring-slate-200/80 dark:ring-slate-700/60"
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-sans font-bold uppercase tracking-wide text-muted-foreground">
                      {isVi
                        ? "Cột 2 • Uy Thế & Thuộc Tính"
                        : "Col 2 • Power & Attributes"}
                    </span>
                    <TrendingUp
                      className="h-4 w-4 text-emerald-500"
                      aria-hidden="true"
                    />
                  </div>

                  {/* Uy Thế Card (Matches Screenshot Top-Left Pill) */}
                  <div className="rounded-xl bg-card p-3 ring-1 ring-slate-200/70 dark:ring-slate-700/60">
                    <div className="text-xs font-sans font-semibold text-muted-foreground">
                      {isVi ? "Uy Thế" : "Power (Might)"}
                    </div>
                    <div className="mt-1 flex flex-wrap items-baseline gap-1.5">
                      <span className="font-mono text-lg font-black tabular-nums text-amber-900 dark:text-amber-200">
                        {plan.currentFightforce.toLocaleString("en-US")}
                      </span>
                      {plan.deltaFightforce > 0 ? (
                        <span className="font-mono text-base font-black tabular-nums text-emerald-600 dark:text-emerald-400">
                          +{plan.deltaFightforce.toLocaleString("en-US")}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  {/* Bonus Attributes Cards (Matches Screenshot Attribute Pills) */}
                  <div className="space-y-2">
                    {plan.attributeGains.map((attr) => (
                      <div
                        key={attr.attrId}
                        className="rounded-xl bg-card p-3 ring-1 ring-slate-200/70 dark:ring-slate-700/60"
                      >
                        <div className="text-xs font-sans font-semibold text-muted-foreground leading-snug">
                          {attr.label[locale]}
                        </div>
                        <div className="mt-1 flex flex-wrap items-baseline gap-1.5">
                          <span className="font-mono text-base font-black tabular-nums text-amber-900 dark:text-amber-200">
                            {formatAttributeValue(
                              attr.currentValue,
                              attr.isPercent
                            )}
                          </span>
                          {attr.deltaValue > 0 ? (
                            <span className="font-mono text-sm font-black tabular-nums text-emerald-600 dark:text-emerald-400">
                              +
                              {formatAttributeValue(
                                attr.deltaValue,
                                attr.isPercent
                              )}
                            </span>
                          ) : (
                            <span className="text-xs font-sans text-muted-foreground">
                              ({isVi ? "Giữ nguyên" : "Unchanged"})
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CỘT 3: Điều kiện công trình trước đó & Thông tin tài nguyên */}
                <div
                  className={cn(
                    CALC_MD3.tonalGroup,
                    "flex flex-col gap-2.5 md:col-span-2 lg:col-span-3 bg-slate-50/90 dark:bg-slate-800/50 ring-1 ring-slate-200/80 dark:ring-slate-700/60"
                  )}
                >
                  <div className="flex items-center justify-between rounded-lg bg-amber-500/15 px-3 py-1.5">
                    <span className="text-xs font-sans font-black uppercase tracking-wide text-amber-900 dark:text-amber-200">
                      {isVi ? "Cột 3 • Điều Kiện" : "Col 3 • Requirements"}
                    </span>
                    {buffs.costReductionPct > 0 ? (
                      <span className="font-mono text-xs font-bold text-amber-700 dark:text-amber-300">
                        -{buffs.costReductionPct}%
                      </span>
                    ) : null}
                  </div>

                  <div className="divide-y divide-border/60 rounded-xl bg-card px-3 py-1 ring-1 ring-slate-200/70 dark:ring-slate-700/60">
                    {/* Prerequisite Buildings */}
                    {plan.prerequisites.length > 0 ? (
                      plan.prerequisites.map((pre) => (
                        <div
                          key={`${pre.buildingId}-${pre.requiredLevel}`}
                          className="flex items-center justify-between gap-2 py-2"
                        >
                          <div className="flex min-w-0 items-center gap-2">
                            <img
                              src={pre.buildingIcon}
                              alt={pre.buildingName[locale]}
                              width={32}
                              height={32}
                              className="h-8 w-8 shrink-0 object-contain"
                            />
                            <span className="text-xs sm:text-sm font-sans font-bold text-red-600 dark:text-red-400 leading-tight">
                              {isVi
                                ? `${pre.buildingName.vi} cấp ${pre.requiredLevel}`
                                : `${pre.buildingName.en} Lv.${pre.requiredLevel}`}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              handleJumpToPrerequisite(
                                idx,
                                pre.buildingId,
                                pre.requiredLevel
                              )
                            }
                            className="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-xl bg-sky-500 px-3 text-xs font-sans font-black text-white shadow-sm hover:bg-sky-400 cursor-pointer"
                            title={
                              isVi
                                ? "Đẩy công trình điều kiện này sang Đội Xây tiếp theo"
                                : "Assign this prerequisite building to the next queue"
                            }
                          >
                            {isVi ? "Đến" : "Go"}
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="flex items-center justify-between gap-2 py-2.5">
                        <span className="text-xs font-sans text-muted-foreground">
                          {isVi
                            ? "Không yêu cầu công trình phụ"
                            : "No prerequisite buildings required"}
                        </span>
                        <CheckCircle2
                          className="h-5 w-5 text-emerald-500 shrink-0"
                          aria-hidden="true"
                        />
                      </div>
                    )}

                    {/* Resource Rows (Timber, Ruby, Stone, Dragon Essence) */}
                    {plan.resourceStatuses.map((res) => (
                      <div
                        key={res.key}
                        className="flex items-center justify-between gap-2 py-2.5"
                      >
                        <div className="flex min-w-0 items-center gap-2">
                          <img
                            src={res.icon}
                            alt={res.label[locale]}
                            width={28}
                            height={28}
                            className="h-7 w-7 shrink-0 object-contain"
                          />
                          <span className="text-xs sm:text-sm font-sans font-bold text-foreground">
                            {res.label[locale]}
                          </span>
                        </div>

                        <div className="text-right">
                          <div className="font-mono text-sm sm:text-base font-black tabular-nums text-amber-900 dark:text-amber-200">
                            {formatGameResourceCompact(res.required)}
                          </div>
                          {res.required >= 10_000 ? (
                            <div className="font-mono text-xs tabular-nums text-muted-foreground">
                              {res.required.toLocaleString("en-US")}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CỘT 4: Thời gian thực hiện & Kim cương Nâng Cấp Ngay */}
                <div
                  className={cn(
                    CALC_MD3.tonalGroup,
                    "flex flex-col justify-between gap-2.5 md:col-span-2 lg:col-span-3 bg-slate-50/90 dark:bg-slate-800/50 ring-1 ring-slate-200/80 dark:ring-slate-700/60"
                  )}
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-sans font-bold uppercase tracking-wide text-muted-foreground">
                        {isVi ? "Cột 4 • Thời Gian" : "Col 4 • Build Time"}
                      </span>
                      <Clock
                        className="h-4 w-4 text-sky-500"
                        aria-hidden="true"
                      />
                    </div>

                    {/* Blue "Bắt đầu / Thời gian thực tế" Card matching Screenshot */}
                    <div className="rounded-xl bg-gradient-to-b from-sky-500 to-sky-600 p-3 text-white shadow-sm">
                      <div className="text-center text-xs font-sans font-black uppercase tracking-wider opacity-95">
                        {isVi
                          ? "Bắt đầu (Thời gian thực tế)"
                          : "Start (Effective Time)"}
                      </div>
                      <div
                        data-testid={`queue-${idx + 1}-effective-time`}
                        className="mt-1 flex items-center justify-center gap-1.5 text-base sm:text-lg font-sans font-black tabular-nums"
                      >
                        <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
                        <span>
                          {formatBuildDuration(plan.effectiveTimeSeconds, locale)}
                        </span>
                      </div>
                    </div>

                    {/* Green "Nâng Cấp Ngay" Diamond Card matching Screenshot */}
                    <div className="rounded-xl bg-gradient-to-b from-lime-500 to-emerald-600 p-3 text-white shadow-sm">
                      <div className="text-center text-xs font-sans font-black uppercase tracking-wider opacity-95">
                        {isVi ? "Nâng Cấp Ngay" : "Instant Upgrade"}
                      </div>
                      <div
                        data-testid={`queue-${idx + 1}-instant-diamonds`}
                        className="mt-1 flex items-center justify-center gap-1.5 font-mono text-base sm:text-lg font-black tabular-nums"
                      >
                        <img
                          src={DIAMOND_ICON_PATH}
                          alt="Diamond"
                          width={20}
                          height={20}
                          className="h-5 w-5 shrink-0 object-contain"
                        />
                        <span>{plan.instantDiamonds.toLocaleString("en-US")}</span>
                      </div>
                    </div>
                  </div>

                  {/* Base Time & Speedup Breakdown Footer */}
                  <div className="rounded-xl bg-card p-2.5 text-xs font-sans ring-1 ring-slate-200/70 dark:ring-slate-700/60 space-y-1">
                    <div className="flex items-center justify-between gap-1 text-muted-foreground">
                      <span>
                        {isVi ? "Thời gian ban đầu:" : "Original Time:"}
                      </span>
                      <span
                        data-testid={`queue-${idx + 1}-base-time`}
                        className="font-sans font-bold tabular-nums text-foreground"
                      >
                        {formatBuildDuration(plan.baseTimeSeconds, locale)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-1 text-emerald-600 dark:text-emerald-400">
                      <span>{isVi ? "Đã rút ngắn:" : "Time Saved:"}</span>
                      <span className="font-sans font-bold tabular-nums">
                        -{formatBuildDuration(plan.savedTimeSeconds, locale)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* HÀNG DƯỚI CỘT 2–3–4: Thanh kéo Level từ 1 đến Max */}
                <div className="md:col-span-6 lg:col-span-9 lg:col-start-4">
                  <ConstructionLevelSelector
                    queueIndex={idx + 1}
                    maxLevel={plan.building.maxLevel}
                    fromLevel={plan.fromLevel}
                    toLevel={plan.toLevel}
                    multiplyBrillianceSubSteps={
                      queueState.multiplyBrillianceSubSteps
                    }
                    locale={locale}
                    onChangeRange={(nextFrom, nextTo) =>
                      handleUpdateQueue(plan.queueId, (prev) => ({
                        ...prev,
                        fromLevel: nextFrom,
                        toLevel: nextTo,
                      }))
                    }
                    onToggleBrillianceSubSteps={() =>
                      handleUpdateQueue(plan.queueId, (prev) => ({
                        ...prev,
                        multiplyBrillianceSubSteps:
                          !prev.multiplyBrillianceSubSteps,
                      }))
                    }
                  />
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Section 4: Global Multi-Queue Summary Bar */}
      <section
        data-testid="construction-global-summary"
        className={cn(CALC_MD3.surfaceCard, "space-y-3.5")}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-2.5">
          <div className="flex items-center gap-2">
            <Sparkles
              className="h-5 w-5 text-amber-500"
              aria-hidden="true"
            />
            <h2 className={CALC_MD3.sectionTitle}>
              {isVi
                ? `Tổng Hợp Kế Hoạch Xây Dựng (${globalSummary.queueCount} Đội Xây)`
                : `Total Multi-Queue Construction Plan (${globalSummary.queueCount} Queues)`}
            </h2>
          </div>
          <span className="text-xs font-sans font-semibold text-muted-foreground">
            {isVi
              ? "Cộng gộp tài nguyên, Uy Thế và đối chiếu thời gian chạy song song"
              : "Aggregates resources, Power gained, and parallel vs sequential build time"}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {/* 1. Total Timber & Stone */}
          <div
            className={cn(
              CALC_MD3.tonalGroup,
              "space-y-2 bg-slate-50/90 dark:bg-slate-800/50 ring-1 ring-slate-200/80 dark:ring-slate-700/60"
            )}
          >
            <div className="text-xs font-sans font-bold uppercase tracking-wide text-muted-foreground">
              {isVi ? "Tổng Gỗ & Đá Cần" : "Total Timber & Stone"}
            </div>
            {(["timber", "stone"] as const).map((key) => {
              const metaRes = CONSTRUCTION_RESOURCE_META[key];
              const totalReq = globalSummary.totalDiscountedCosts[key];
              return (
                <div
                  key={key}
                  className="flex items-center justify-between gap-2 text-sm"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={metaRes.icon}
                      alt={metaRes.label[locale]}
                      width={22}
                      height={22}
                      className="h-5 w-5 object-contain"
                    />
                    <span className="font-sans font-semibold text-foreground">
                      {metaRes.label[locale]}:
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-black tabular-nums text-foreground">
                      {formatGameResourceCompact(totalReq)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 2. Total Ruby & Dragon Essence */}
          <div
            className={cn(
              CALC_MD3.tonalGroup,
              "space-y-2 bg-slate-50/90 dark:bg-slate-800/50 ring-1 ring-slate-200/80 dark:ring-slate-700/60"
            )}
          >
            <div className="text-xs font-sans font-bold uppercase tracking-wide text-muted-foreground">
              {isVi ? "Tổng Ruby & Tinh Chất Rồng" : "Total Ruby & Essence"}
            </div>
            {(["ruby", "dragonEssence"] as const).map((key) => {
              const metaRes = CONSTRUCTION_RESOURCE_META[key];
              const totalReq = globalSummary.totalDiscountedCosts[key];
              return (
                <div
                  key={key}
                  className="flex items-center justify-between gap-2 text-sm"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={metaRes.icon}
                      alt={metaRes.label[locale]}
                      width={22}
                      height={22}
                      className="h-5 w-5 object-contain"
                    />
                    <span className="font-sans font-semibold text-foreground">
                      {metaRes.label[locale]}:
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-black tabular-nums text-foreground">
                      {formatGameResourceCompact(totalReq)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 3. Total Power & Instant Diamonds */}
          <div
            className={cn(
              CALC_MD3.tonalGroup,
              "space-y-2 bg-slate-50/90 dark:bg-slate-800/50 ring-1 ring-slate-200/80 dark:ring-slate-700/60"
            )}
          >
            <div className="text-xs font-sans font-bold uppercase tracking-wide text-muted-foreground">
              {isVi ? "Tổng Uy Thế & Kim Cương" : "Total Power & Diamonds"}
            </div>
            <div className="flex items-center justify-between gap-2 text-sm">
              <span className="font-sans font-semibold text-muted-foreground">
                {isVi ? "Uy Thế tăng thêm:" : "Total Power Gain:"}
              </span>
              <span className="font-mono font-black tabular-nums text-emerald-600 dark:text-emerald-400">
                +{globalSummary.totalDeltaFightforce.toLocaleString("en-US")}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2 text-sm">
              <span className="font-sans font-semibold text-muted-foreground">
                {isVi ? "Tổng KC nâng ngay:" : "Total Instant Diamonds:"}
              </span>
              <span className="inline-flex items-center gap-1 font-mono font-black tabular-nums text-sky-600 dark:text-sky-400">
                <img
                  src={DIAMOND_ICON_PATH}
                  alt="Diamond"
                  width={16}
                  height={16}
                  className="h-4 w-4 object-contain"
                />
                {globalSummary.totalInstantDiamonds.toLocaleString("en-US")}
              </span>
            </div>
          </div>

          {/* 4. Parallel Time vs Total Speedup Time */}
          <div
            className={cn(
              CALC_MD3.tonalGroup,
              "space-y-2 bg-slate-50/90 dark:bg-slate-800/50 ring-1 ring-slate-200/80 dark:ring-slate-700/60"
            )}
          >
            <div className="text-xs font-sans font-bold uppercase tracking-wide text-muted-foreground">
              {isVi ? "Thời Gian Hoàn Tất" : "Completion Timeline"}
            </div>
            <div className="flex items-center justify-between gap-2 text-sm">
              <span className="font-sans font-semibold text-muted-foreground">
                {isVi ? "Chạy song song (Max):" : "Parallel Time (Max):"}
              </span>
              <span className="font-sans font-black tabular-nums text-foreground">
                {formatBuildDuration(globalSummary.parallelTimeSeconds, locale)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2 text-sm">
              <span className="font-sans font-semibold text-muted-foreground">
                {isVi ? "Tổng Tăng Tốc (Sum):" : "Total Speedups (Sum):"}
              </span>
              <span className="font-sans font-black tabular-nums text-amber-600 dark:text-amber-400">
                {formatBuildDuration(
                  globalSummary.totalSpeedupTimeSeconds,
                  locale
                )}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Building Selector Overlay Modal */}
      {activePickerQueue ? (
        <div
          data-md3-overlay="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 sm:p-4 backdrop-blur-sm"
          onClick={() => setActivePickerQueueId(null)}
        >
          <div
            className={cn(
              CALC_MD3.overlayCard,
              "w-full max-w-3xl max-h-[85vh] flex flex-col gap-3.5 overflow-hidden"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-2.5">
              <div>
                <h3 className="text-base sm:text-lg font-heading font-black text-foreground">
                  {isVi
                    ? "Chọn Công Trình Thành Chính (25 Công Trình)"
                    : "Select Main City Building (25 Buildings)"}
                </h3>
                <p className="text-xs font-sans text-muted-foreground">
                  {isVi
                    ? "Dữ liệu trích xuất nguyên bản từ bảng citybuilding_lvup_new"
                    : "Authentic stats and costs from citybuilding_lvup_new"}
                </p>
              </div>
              <button
                type="button"
                aria-label={isVi ? "Đóng bảng chọn" : "Close picker"}
                onClick={() => setActivePickerQueueId(null)}
                className={cn(
                  CALC_MD3.iconButton,
                  "bg-muted/60 text-foreground hover:bg-muted"
                )}
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* Search & Group Filter Tabs */}
            <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <input
                  type="text"
                  value={pickerSearch}
                  placeholder={
                    isVi
                      ? "Tìm tên công trình (VD: Pháo Đài, Quán Rượu, Viện Nghiên Cứu)..."
                      : "Search building name (e.g. Castle, Tavern, Research)..."
                  }
                  onChange={(e) => setPickerSearch(e.target.value)}
                  className="h-11 min-h-[44px] w-full rounded-xl bg-muted/50 pl-9 pr-3 text-base font-sans text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                />
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                {(
                  [
                    {
                      key: "all",
                      label: isVi ? "Tất cả (25)" : "All (25)",
                    },
                    {
                      key: "core",
                      label: isVi ? "Trụ cột (6)" : "Core (6)",
                    },
                    {
                      key: "military",
                      label: isVi ? "Quân sự & HH (14)" : "Military (14)",
                    },
                    {
                      key: "economy",
                      label: isVi ? "Kinh tế & Mỏ (5)" : "Economy (5)",
                    },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setPickerGroupTab(tab.key)}
                    className={cn(
                      "inline-flex min-h-[44px] items-center rounded-xl px-3 text-xs font-sans font-bold transition-colors cursor-pointer",
                      pickerGroupTab === tab.key
                        ? "bg-amber-500 text-slate-950"
                        : "bg-muted/60 text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid of 25 Buildings */}
            <div className="grid grid-cols-1 gap-2.5 overflow-y-auto pr-1 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPickerBuildings.map((b) => {
                const isSelected = activePickerQueue.buildingId === b.id;
                return (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => {
                      handleUpdateQueue(activePickerQueue.queueId, (prev) => {
                        const clampedFrom = Math.min(
                          prev.fromLevel,
                          b.maxLevel - 1
                        );
                        const clampedTo = Math.min(
                          Math.max(clampedFrom + 1, prev.toLevel),
                          b.maxLevel
                        );
                        return {
                          ...prev,
                          buildingId: b.id,
                          fromLevel: clampedFrom,
                          toLevel: clampedTo,
                        };
                      });
                      setActivePickerQueueId(null);
                    }}
                    className={cn(
                      CALC_MD3.tonalTile,
                      "flex items-center gap-3 p-3 text-left min-h-[68px]",
                      isSelected ? CALC_MD3.tileSelected : ""
                    )}
                  >
                    <img
                      src={b.icon}
                      alt={b.name[locale]}
                      width={44}
                      height={44}
                      className="h-11 w-11 shrink-0 object-contain"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-heading font-bold text-foreground">
                        {b.name[locale]}
                      </div>
                      <div className="mt-0.5 flex items-center gap-1.5 text-xs font-sans text-muted-foreground">
                        <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                          Max Lv.{b.maxLevel}
                        </span>
                        <span>•</span>
                        <span className="truncate">
                          {CONSTRUCTION_GROUP_META[b.group].badge[locale]}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

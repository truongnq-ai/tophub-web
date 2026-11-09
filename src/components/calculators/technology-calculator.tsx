"use client";

import React from "react";
import { GameAssetFrame } from "@/components/guides/media/game-asset-frame";
import {
  ArrowDown,
  CheckCircle2,
  Clock,
  FlaskConical,
  GitBranch,
  Handshake,
  Heart,
  Info,
  RotateCcw,
  Search,
  Sparkles,
  Swords,
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
  CONSTRUCTION_RESOURCE_META,
  DEFAULT_ALLIANCE_HELP_COUNT,
  DEFAULT_TECH_GLOBAL_BUFFS,
  DEFAULT_TECH_QUEUES,
  DIAMOND_ICON_PATH,
  MAX_ALLIANCE_HELP_COUNT,
  RESEARCH_COTTAGE_ICON_PATH,
  TECHNOLOGY_BRANCHES,
  TECHNOLOGY_NODES,
  aggregateTechQueues,
  computeTechQueueUpgradePlan,
  formatAttributeValue,
  formatBuildDuration,
  formatGameResourceCompact,
  getTechnologyNodeById,
  getTechnologyNodesByBranch,
  type TechnologyGlobalBuffs,
  type TechnologyNodeMeta,
  type TechnologyQueueState,
} from "@/content/calculators/technology-data";
import {
  CALC_MD3,
  CalculatorStepperButton,
  CalculatorToolHeader,
} from "./calculator-md3-primitives";
import { CalculatorInfoPopover } from "./calculator-info-popover";
import { TechnologyLevelSelector } from "./technology-level-selector";

export interface TechnologyCalculatorProps {
  readonly zone?: CalculatorZone;
  readonly category?: CalculatorCategory;
  readonly group?: CalculatorCategory;
  readonly tool: CalculatorToolItem;
  readonly locale?: CalculatorLocale;
}

export function TechnologyCalculator({
  tool,
  locale = "vi",
}: TechnologyCalculatorProps): React.JSX.Element {
  const isVi = locale === "vi";

  const [buffs, setBuffs] = React.useState<TechnologyGlobalBuffs>(
    DEFAULT_TECH_GLOBAL_BUFFS
  );
  const activeHelpCount = buffs.helpCount ?? DEFAULT_ALLIANCE_HELP_COUNT;
  // Fixed 2 Research Queues matching in-game Viện Nghiên Cứu
  const [queues, setQueues] = React.useState<readonly TechnologyQueueState[]>(
    DEFAULT_TECH_QUEUES
  );

  // Technology Picker Modal state
  const [activePickerQueueId, setActivePickerQueueId] = React.useState<
    string | null
  >(null);
  const [selectedBranchId, setSelectedBranchId] = React.useState<number>(213);
  const [pickerSearch, setPickerSearch] = React.useState<string>("");

  const queuePlans = React.useMemo(
    () => queues.map((q) => computeTechQueueUpgradePlan(q, buffs)),
    [queues, buffs]
  );

  const globalSummary = React.useMemo(
    () => aggregateTechQueues(queuePlans),
    [queuePlans]
  );

  const handleResetAll = (): void => {
    setBuffs(DEFAULT_TECH_GLOBAL_BUFFS);
    setQueues(DEFAULT_TECH_QUEUES);
    setActivePickerQueueId(null);
  };

  const handleUpdateQueue = (
    queueId: string,
    updater: (prev: TechnologyQueueState) => TechnologyQueueState
  ): void => {
    setQueues((prev) =>
      prev.map((q) => (q.queueId === queueId ? updater(q) : q))
    );
  };

  // Cross-queue "Đến" ("Go") button assigns the prerequisite node to the OTHER research queue
  const handleJumpToPrerequisite = (
    sourceQueueIndex: number,
    prereqNodeId: number,
    requiredLevel: number
  ): void => {
    const targetNode = getTechnologyNodeById(prereqNodeId);
    const safeTargetLv = Math.max(
      1,
      Math.min(targetNode.maxLevel, Math.floor(requiredLevel))
    );
    const targetIdx = sourceQueueIndex === 0 ? 1 : 0;

    setQueues((prev) =>
      prev.map((q, idx) =>
        idx === targetIdx
          ? {
              ...q,
              nodeId: prereqNodeId,
              fromLevel: 0,
              toLevel: safeTargetLv,
            }
          : q
      )
    );
  };

  const activePickerQueue = React.useMemo(
    () => queues.find((q) => q.queueId === activePickerQueueId) ?? null,
    [queues, activePickerQueueId]
  );

  const basicBranches = React.useMemo(
    () => TECHNOLOGY_BRANCHES.filter((b) => b.tier === "basic"),
    []
  );
  const advancedBranches = React.useMemo(
    () => TECHNOLOGY_BRANCHES.filter((b) => b.tier === "advanced"),
    []
  );

  const branchTreeRows = React.useMemo(() => {
    const nodes = getTechnologyNodesByBranch(selectedBranchId);
    const maxRow = nodes.reduce((max, n) => Math.max(max, n.row), 1);
    const rows: Array<{
      rowNumber: number;
      cells: readonly [
        TechnologyNodeMeta | null,
        TechnologyNodeMeta | null,
        TechnologyNodeMeta | null,
      ];
    }> = [];

    for (let r = 1; r <= maxRow; r += 1) {
      const col1 = nodes.find((n) => n.row === r && n.col === 1) ?? null;
      const col2 = nodes.find((n) => n.row === r && n.col === 2) ?? null;
      const col3 = nodes.find((n) => n.row === r && n.col === 3) ?? null;
      if (col1 || col2 || col3) {
        rows.push({
          rowNumber: r,
          cells: [col1, col2, col3],
        });
      }
    }
    return rows;
  }, [selectedBranchId]);

  const searchResults = React.useMemo(() => {
    const q = pickerSearch.trim().toLowerCase();
    if (!q) return null;
    return TECHNOLOGY_NODES.filter(
      (n) =>
        n.name.vi.toLowerCase().includes(q) ||
        n.name.en.toLowerCase().includes(q) ||
        String(n.id).includes(q)
    );
  }, [pickerSearch]);

  const handleSelectNodeInModal = (node: TechnologyNodeMeta): void => {
    if (!activePickerQueue) return;
    handleUpdateQueue(activePickerQueue.queueId, (prev) => ({
      ...prev,
      nodeId: node.id,
      fromLevel: 0,
      toLevel: node.maxLevel,
    }));
    setActivePickerQueueId(null);
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Header */}
      <CalculatorToolHeader
        code={tool.code}
        title={isVi ? "Công nghệ" : "Technology"}
        actions={
          <>
            <CalculatorInfoPopover
              title={
                isVi
                  ? "Cơ Chế Thời Gian, Tài Nguyên & 8 Nhánh Viện Nghiên Cứu"
                  : "Research Time, Resource Formulas & 8 Research Cottage Trees"
              }
              locale={locale}
              triggerLabel={isVi ? "Bảng tra cứu" : "Reference Guide"}
            >
              <div className="space-y-4 text-sm font-sans leading-relaxed">
                <div className="rounded-xl bg-muted/50 p-3.5 space-y-2">
                  <p className="font-heading font-bold text-foreground">
                    {isVi
                      ? "1. Công thức Thời Gian Nghiên Cứu & Kim Cương Mua Đứt (Chuẩn Meta.bytes)"
                      : "1. Effective Research Duration & Instant Diamond Formula (Meta.bytes Verified)"}
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>
                      {isVi
                        ? "Thời gian thực tế mỗi cấp = floor( Thời gian gốc / (1 + Tốc độ nghiên cứu % / 100) )."
                        : "Effective time per level = floor( Base Research Time / (1 + Research Speed % / 100) )."}
                    </li>
                    <li>
                      {isVi
                        ? "Chi phí sau giảm giá = ceil( Chi phí gốc × (1 - Giảm chi phí % / 100) )."
                        : "Discounted cost = ceil( Base Cost × (1 - Cost Reduction % / 100) )."}
                    </li>
                    <li>
                      {isVi
                        ? "Kim Cương Nghiên Cứu Ngay = ceil( Thời gian thực tế (giây) / 3 )."
                        : "Instant Research Diamonds = ceil( Effective Seconds / 3 )."}
                    </li>
                    <li>
                      {isVi
                        ? "Thời gian sau trợ giúp mỗi bậc = giảm lũy tiến N lượt, mỗi lượt giảm max( 60 giây, floor(1% × Thời gian hiện tại) )."
                        : "Time after Alliance Help per step = compounded over N helps, each reducing max( 60s, floor(1% × current remaining time) )."}
                    </li>
                  </ul>
                </div>

                <div className="rounded-xl bg-muted/50 p-3.5 space-y-2">
                  <p className="font-heading font-bold text-foreground">
                    {isVi
                      ? "2. Cấu trúc 8 Nhánh Viện Nghiên Cứu & 2 Đội Nghiên Cứu Cố Định"
                      : "2. 8 Research Cottage Branches & Fixed 2 Research Queues"}
                  </p>
                  <p className="text-muted-foreground">
                    {isVi
                      ? "Bao gồm 4 nhánh Cơ Bản (Nghiên Cứu Chiến Đấu, Kinh Tế, Phát Triển, Tăng Cường Đội) và 4 nhánh Nâng Cao (Biểu Dương Quân Bị, Cuộc Chiến Quân Bị, Lính, Anh Hùng) với tổng cộng 190 công nghệ và 942 cấp độ."
                      : "Covers 4 Basic branches (Combat Research, Economy, Growth, Queue Boost) and 4 Advanced branches (Arms Race Commendation, Arms Race Preparation, Soldiers, Heroes) across 190 nodes and 942 upgrade steps."}
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

      {/* Section 1: Global Research Speed & Cost Reduction Buffs */}
      <section
        data-testid="technology-global-buffs-card"
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
                  ? "Thông Số Tốc Độ & Giảm Chi Phí Nghiên Cứu"
                  : "Research Speed & Resource Cost Reduction Buffs"}
              </h2>
              <p className="text-xs font-sans text-muted-foreground">
                {isVi
                  ? "Áp dụng đồng thời cho cả 2 Đội Nghiên Cứu bên dưới"
                  : "Applied globally across both active research queues below"}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {/* 1. Research Speed Bonus (%) */}
          <div
            className={cn(
              CALC_MD3.tonalGroup,
              "flex flex-col justify-between gap-2.5 bg-slate-50/90 dark:bg-slate-800/50 ring-1 ring-slate-200/80 dark:ring-slate-700/60"
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-sans font-bold text-muted-foreground">
                {isVi ? "Bonus tốc độ nghiên cứu" : "Research Speed Bonus"}
              </span>
              <span className="rounded-md bg-emerald-500/15 px-2 py-0.5 font-mono text-xs font-bold text-emerald-700 dark:text-emerald-300">
                +{buffs.researchSpeedPct}%
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <CalculatorStepperButton
                direction="decrease"
                testId="tech-buff-speed-decrease"
                ariaLabel={
                  isVi ? "Giảm tốc độ nghiên cứu" : "Decrease research speed"
                }
                disabled={buffs.researchSpeedPct <= 0}
                onClick={() =>
                  setBuffs((prev) => ({
                    ...prev,
                    researchSpeedPct: Math.max(0, prev.researchSpeedPct - 5),
                  }))
                }
              />
              <div className="flex flex-1 items-center justify-center gap-1 rounded-xl bg-card px-3 h-11 min-h-[44px]">
                <input
                  type="number"
                  min={0}
                  max={2000}
                  value={buffs.researchSpeedPct}
                  aria-label={
                    isVi ? "Bonus tốc độ nghiên cứu (%)" : "Research speed (%)"
                  }
                  onChange={(e) =>
                    setBuffs((prev) => ({
                      ...prev,
                      researchSpeedPct: Math.max(
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
                testId="tech-buff-speed-increase"
                ariaLabel={
                  isVi ? "Tăng tốc độ nghiên cứu" : "Increase research speed"
                }
                onClick={() =>
                  setBuffs((prev) => ({
                    ...prev,
                    researchSpeedPct: Math.min(2000, prev.researchSpeedPct + 5),
                  }))
                }
              />
            </div>
          </div>

          {/* 2. Resource Cost Reduction (%) */}
          <div
            className={cn(
              CALC_MD3.tonalGroup,
              "flex flex-col justify-between gap-2.5 bg-slate-50/90 dark:bg-slate-800/50 ring-1 ring-slate-200/80 dark:ring-slate-700/60"
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-sans font-bold text-muted-foreground">
                {isVi
                  ? "Giảm chi phí tài nguyên NC"
                  : "Research Cost Reduction"}
              </span>
              <span className="rounded-md bg-sky-500/15 px-2 py-0.5 font-mono text-xs font-bold text-sky-700 dark:text-sky-300">
                -{buffs.costReductionPct}%
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <CalculatorStepperButton
                direction="decrease"
                testId="tech-buff-cost-decrease"
                ariaLabel={
                  isVi
                    ? "Giảm % tiết kiệm tài nguyên"
                    : "Decrease cost reduction"
                }
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
                    isVi
                      ? "Giảm chi phí nghiên cứu (%)"
                      : "Research cost reduction (%)"
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
                testId="tech-buff-cost-increase"
                ariaLabel={
                  isVi
                    ? "Tăng % tiết kiệm tài nguyên"
                    : "Increase cost reduction"
                }
                onClick={() =>
                  setBuffs((prev) => ({
                    ...prev,
                    costReductionPct: Math.min(80, prev.costReductionPct + 1),
                  }))
                }
              />
            </div>
          </div>

          {/* 3. Alliance Help Count */}
          <div
            className={cn(
              CALC_MD3.tonalGroup,
              "flex flex-col justify-between gap-2.5 bg-slate-50/90 dark:bg-slate-800/50 ring-1 ring-slate-200/80 dark:ring-slate-700/60"
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-sans font-bold text-muted-foreground">
                {isVi ? "Số lượng trợ giúp" : "Alliance Helps"}
              </span>
              <span className="rounded-md bg-teal-500/15 px-2 py-0.5 font-mono text-xs font-bold text-teal-700 dark:text-teal-300">
                {activeHelpCount}/{activeHelpCount}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <CalculatorStepperButton
                direction="decrease"
                testId="tech-buff-help-decrease"
                ariaLabel={
                  isVi ? "Giảm số lượng trợ giúp" : "Decrease alliance helps"
                }
                disabled={activeHelpCount <= 0}
                onClick={() =>
                  setBuffs((prev) => ({
                    ...prev,
                    helpCount: Math.max(
                      0,
                      (prev.helpCount ?? DEFAULT_ALLIANCE_HELP_COUNT) - 1
                    ),
                  }))
                }
              />
              <div className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-card px-3 h-11 min-h-[44px]">
                <input
                  type="number"
                  min={0}
                  max={MAX_ALLIANCE_HELP_COUNT}
                  data-testid="tech-buff-help-input"
                  value={activeHelpCount}
                  aria-label={
                    isVi ? "Số lượng trợ giúp (lượt)" : "Alliance helps (count)"
                  }
                  onChange={(e) =>
                    setBuffs((prev) => ({
                      ...prev,
                      helpCount: Math.max(
                        0,
                        Math.min(
                          MAX_ALLIANCE_HELP_COUNT,
                          Math.floor(Number(e.target.value) || 0)
                        )
                      ),
                    }))
                  }
                  className="w-16 bg-transparent text-center font-mono text-base font-black text-foreground focus:outline-none"
                />
                <span className="text-xs font-sans font-semibold text-muted-foreground">
                  {isVi ? "lượt" : "helps"}
                </span>
              </div>
              <CalculatorStepperButton
                direction="increase"
                testId="tech-buff-help-increase"
                ariaLabel={
                  isVi ? "Tăng số lượng trợ giúp" : "Increase alliance helps"
                }
                disabled={activeHelpCount >= MAX_ALLIANCE_HELP_COUNT}
                onClick={() =>
                  setBuffs((prev) => ({
                    ...prev,
                    helpCount: Math.min(
                      MAX_ALLIANCE_HELP_COUNT,
                      (prev.helpCount ?? DEFAULT_ALLIANCE_HELP_COUNT) + 1
                    ),
                  }))
                }
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Fixed 2 Research Queues Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-1">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 text-slate-950 font-mono text-sm font-black shadow-sm">
            2
          </span>
          <div>
            <h2 className="text-base sm:text-lg font-heading font-black text-foreground">
              {isVi
                ? "Danh Sách Đội Nghiên Cứu (Cố định 2 Đội Nghiên Cứu)"
                : "Active Research Queues (Fixed 2 Research Queues)"}
            </h2>
            <p className="text-xs font-sans text-muted-foreground">
              {isVi
                ? "Mô phỏng 2 hàng đợi nghiên cứu chạy song song trong Viện Nghiên Cứu"
                : "Simulates the 2 parallel research queues inside the Research Cottage"}
            </p>
          </div>
        </div>
      </div>

      {/* Section 3: Horizontal Full-Width Research Queue Cards (Fixed 2 Queues) */}
      <div className="space-y-4">
        {queuePlans.map((plan, idx) => {
          const isAdvanced = plan.branch.tier === "advanced";
          const QueueBadgeIcon = idx === 0 ? Swords : Heart;

          return (
            <section
              key={plan.queueId}
              data-testid="technology-queue-card"
              className={cn(CALC_MD3.surfaceCard, "space-y-3.5")}
            >
              {/* Queue Header Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-2.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-sans font-black",
                      idx === 0
                        ? "bg-sky-500/15 text-sky-700 dark:text-sky-300"
                        : "bg-rose-500/15 text-rose-700 dark:text-rose-300"
                    )}
                  >
                    <QueueBadgeIcon className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>
                      {isVi
                        ? `ĐỘI NGHIÊN CỨU #${idx + 1}`
                        : `RESEARCH QUEUE #${idx + 1}`}
                    </span>
                  </span>
                  <span className="text-sm font-heading font-bold text-foreground">
                    {plan.node.name[locale]}
                  </span>
                  <span
                    className={cn(
                      "rounded-md px-2 py-0.5 text-xs font-sans font-bold",
                      isAdvanced
                        ? "bg-purple-500/15 text-purple-700 dark:text-purple-300"
                        : "bg-sky-500/15 text-sky-700 dark:text-sky-300"
                    )}
                  >
                    {plan.branch.name[locale]}
                  </span>
                </div>

                <span className="text-xs font-sans font-semibold text-muted-foreground">
                  {isVi
                    ? `Hàng ${plan.node.row} • Cột ${plan.node.col}`
                    : `Row ${plan.node.row} • Col ${plan.node.col}`}
                </span>
              </div>

              {/* 4-Column Desktop Grid + Bottom Level Selector under Columns 2-3-4 */}
              <div className="grid grid-cols-1 gap-3.5 md:grid-cols-6 lg:grid-cols-12">
                {/* CỘT 1: Công nghệ (Spans 2 rows on Desktop lg:row-span-2) */}
                <div
                  className={cn(
                    CALC_MD3.tonalGroup,
                    "flex flex-col justify-between gap-3 md:col-span-6 lg:col-span-3 lg:row-span-2 bg-slate-50/90 dark:bg-slate-800/50 ring-1 ring-slate-200/80 dark:ring-slate-700/60"
                  )}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-sans font-bold uppercase tracking-wide text-muted-foreground">
                        {isVi ? "Công nghệ" : "Technology"}
                      </span>
                      <span className="rounded-md bg-amber-500/15 px-2 py-0.5 text-xs font-sans font-bold text-amber-700 dark:text-amber-300">
                        Max Lv.{plan.node.maxLevel}
                      </span>
                    </div>

                    {/* Technology Avatar + Level Pill */}
                    <div className="flex items-center gap-3.5">
                      <div className="relative inline-flex shrink-0 items-center justify-center">
                        <GameAssetFrame
                          src={plan.node.icon}
                          alt={plan.node.name[locale]}
                          rarity={isAdvanced ? "mythic" : "legendary"}
                          size="xl"
                          shape="item"
                        />
                        <span className="absolute -bottom-1.5 inset-x-1.5 z-20 rounded-md bg-slate-900/90 px-1.5 py-0.5 text-center font-mono text-xs font-black text-amber-300">
                          {plan.fromLevel}/{plan.node.maxLevel}
                        </span>
                      </div>

                      <div className="min-w-0 flex-1 space-y-1">
                        <h3 className="text-base sm:text-lg font-heading font-black text-foreground leading-snug">
                          {plan.node.name[locale]}
                        </h3>
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="rounded-lg bg-emerald-500/15 px-2.5 py-0.5 text-xs font-sans font-black text-emerald-700 dark:text-emerald-300">
                            Lv.{plan.fromLevel} ➔ Lv.{plan.toLevel}
                          </span>
                        </div>
                        <p className="text-xs font-sans text-muted-foreground line-clamp-2">
                          {plan.branch.name[locale]} •{" "}
                          {isVi
                            ? `Hàng ${plan.node.row}, Cột ${plan.node.col}`
                            : `Row ${plan.node.row}, Col ${plan.node.col}`}
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    data-testid={`tech-queue-${idx + 1}-open-picker-btn`}
                    onClick={() => {
                      setActivePickerQueueId(plan.queueId);
                      setSelectedBranchId(plan.branch.id);
                      setPickerSearch("");
                    }}
                    className={cn(
                      CALC_MD3.chipButton,
                      "w-full bg-amber-500/15 text-amber-800 hover:bg-amber-500/25 dark:text-amber-300 font-bold"
                    )}
                  >
                    <GitBranch className="h-4 w-4" aria-hidden="true" />
                    <span>
                      {isVi
                        ? "Đổi công nghệ (8 Nhánh • 190 Node)"
                        : "Switch Tech (8 Branches • 190 Nodes)"}
                    </span>
                  </button>
                </div>

                {/* CỘT 2: Uy Thế & Thuộc Tính */}
                <div
                  className={cn(
                    CALC_MD3.tonalGroup,
                    "flex flex-col gap-2.5 md:col-span-2 lg:col-span-3 bg-slate-50/90 dark:bg-slate-800/50 ring-1 ring-slate-200/80 dark:ring-slate-700/60"
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-sans font-bold uppercase tracking-wide text-muted-foreground">
                      {isVi ? "Uy Thế & Thuộc Tính" : "Power & Attributes"}
                    </span>
                    <TrendingUp
                      className="h-4 w-4 text-emerald-500"
                      aria-hidden="true"
                    />
                  </div>

                  {/* Uy Thế Card */}
                  <div className="rounded-xl bg-card p-3 ring-1 ring-slate-200/70 dark:ring-slate-700/60">
                    <div className="text-xs font-sans font-semibold text-muted-foreground">
                      {isVi ? "Uy Thế Khoa Kỹ" : "Tech Power (Might)"}
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

                  {/* Bonus Attributes Cards */}
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

                {/* CỘT 3: Điều Kiện */}
                <div
                  className={cn(
                    CALC_MD3.tonalGroup,
                    "flex flex-col gap-2.5 md:col-span-2 lg:col-span-3 bg-slate-50/90 dark:bg-slate-800/50 ring-1 ring-slate-200/80 dark:ring-slate-700/60"
                  )}
                >
                  <div className="flex items-center justify-between rounded-lg bg-amber-500/15 px-3 py-1.5">
                    <span className="text-xs font-sans font-black uppercase tracking-wide text-amber-900 dark:text-amber-200">
                      {isVi ? "Điều Kiện" : "Requirements"}
                    </span>
                    {buffs.costReductionPct > 0 ? (
                      <span className="font-mono text-xs font-bold text-amber-700 dark:text-amber-300">
                        -{buffs.costReductionPct}%
                      </span>
                    ) : null}
                  </div>

                  <div className="divide-y divide-border/60 rounded-xl bg-card px-3 py-1 ring-1 ring-slate-200/70 dark:ring-slate-700/60">
                    {/* Required Research Cottage Level */}
                    <div className="flex items-center justify-between gap-2 py-2">
                      <div className="flex min-w-0 items-center gap-2">
                        <GameAssetFrame
                          src={RESEARCH_COTTAGE_ICON_PATH}
                          alt={isVi ? "Viện Nghiên Cứu" : "Research Cottage"}
                          rarity="legendary"
                          size="sm"
                          shape="item"
                          showFactionBadge={false}
                        />
                        <span className="text-xs sm:text-sm font-sans font-bold text-foreground leading-tight">
                          {isVi
                            ? `Viện Nghiên Cứu cấp ${plan.requiredCottageLevel}`
                            : `Research Cottage Lv.${plan.requiredCottageLevel}`}
                        </span>
                      </div>
                      <CheckCircle2
                        className="h-4 w-4 text-emerald-500 shrink-0"
                        aria-hidden="true"
                      />
                    </div>

                    {/* Prerequisite Tech Nodes */}
                    {plan.prerequisites.length > 0 ? (
                      plan.prerequisites.map((pre) => (
                        <div
                          key={`${pre.nodeId}-${pre.requiredLevel}`}
                          className="flex items-center justify-between gap-2 py-2"
                        >
                          <div className="flex min-w-0 items-center gap-2">
                            <GameAssetFrame
                              src={pre.nodeIcon}
                              alt={pre.nodeName[locale]}
                              rarity="rare"
                              size="sm"
                              shape="item"
                              showFactionBadge={false}
                            />
                            <span className="text-xs sm:text-sm font-sans font-bold text-red-600 dark:text-red-400 leading-tight">
                              {isVi
                                ? `${pre.nodeName.vi} Lv.${pre.requiredLevel}`
                                : `${pre.nodeName.en} Lv.${pre.requiredLevel}`}
                            </span>
                          </div>
                          <button
                            type="button"
                            data-testid={`tech-prereq-go-btn-${idx + 1}-${pre.nodeId}`}
                            onClick={() =>
                              handleJumpToPrerequisite(
                                idx,
                                pre.nodeId,
                                pre.requiredLevel
                              )
                            }
                            className="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-xl bg-sky-500 px-3 text-xs font-sans font-black text-white shadow-sm hover:bg-sky-400 cursor-pointer"
                            title={
                              isVi
                                ? `Đẩy công nghệ này sang Đội Nghiên Cứu #${idx === 0 ? 2 : 1}`
                                : `Assign this prerequisite tech to Research Queue #${idx === 0 ? 2 : 1}`
                            }
                          >
                            {isVi ? "Đến" : "Go"}
                          </button>
                        </div>
                      ))
                    ) : null}

                    {/* Resource Rows (Timber, Ruby, Stone) */}
                    {plan.resourceStatuses.map((res) => (
                      <div
                        key={res.key}
                        className="flex items-center justify-between gap-2 py-2.5"
                      >
                        <div className="flex min-w-0 items-center gap-2">
                          <GameAssetFrame
                            src={res.icon}
                            alt={res.label[locale]}
                            rarity="rare"
                            size="sm"
                            shape="item"
                            showFactionBadge={false}
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

                {/* CỘT 4: Thời Gian */}
                <div
                  className={cn(
                    CALC_MD3.tonalGroup,
                    "flex flex-col justify-between gap-2.5 md:col-span-2 lg:col-span-3 bg-slate-50/90 dark:bg-slate-800/50 ring-1 ring-slate-200/80 dark:ring-slate-700/60"
                  )}
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-sans font-bold uppercase tracking-wide text-muted-foreground">
                        {isVi ? "Thời Gian" : "Research Time"}
                      </span>
                      <Clock
                        className="h-4 w-4 text-sky-500"
                        aria-hidden="true"
                      />
                    </div>

                    {/* Blue "Thời gian thực tế" Card */}
                    <div className="rounded-xl bg-gradient-to-b from-sky-500 to-sky-600 p-3 text-white shadow-sm">
                      <div className="text-center text-xs font-sans font-black uppercase tracking-wider opacity-95">
                        {isVi ? "Thời gian thực tế" : "Effective Time"}
                      </div>
                      <div
                        data-testid={`tech-queue-${idx + 1}-effective-time`}
                        className="mt-1 flex items-center justify-center gap-1.5 text-base sm:text-lg font-sans font-black tabular-nums"
                      >
                        <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
                        <span>
                          {formatBuildDuration(plan.effectiveTimeSeconds, locale)}
                        </span>
                      </div>
                    </div>

                    {/* Teal "Sau trợ giúp N/N" Card (Between Effective Time and Original Time) */}
                    <div className="rounded-xl bg-gradient-to-b from-teal-500 to-cyan-600 p-3 text-white shadow-sm">
                      <div className="text-center text-xs font-sans font-black uppercase tracking-wider opacity-95">
                        {isVi
                          ? `Sau trợ giúp ${activeHelpCount}/${activeHelpCount}`
                          : `After Help ${activeHelpCount}/${activeHelpCount}`}
                      </div>
                      <div
                        data-testid={`tech-queue-${idx + 1}-helped-time`}
                        className="mt-1 flex items-center justify-center gap-1.5 text-base sm:text-lg font-sans font-black tabular-nums"
                      >
                        <Handshake className="h-4 w-4 shrink-0" aria-hidden="true" />
                        <span>
                          {formatBuildDuration(plan.helpedTimeSeconds, locale)}
                        </span>
                      </div>
                    </div>

                    {/* Green "Nghiên Cứu Ngay" Diamond Card */}
                    <div className="rounded-xl bg-gradient-to-b from-lime-500 to-emerald-600 p-3 text-white shadow-sm">
                      <div className="text-center text-xs font-sans font-black uppercase tracking-wider opacity-95">
                        {isVi ? "Nghiên Cứu Ngay" : "Instant Research"}
                      </div>
                      <div
                        data-testid={`tech-queue-${idx + 1}-instant-diamonds`}
                        className="mt-1 flex items-center justify-center gap-1.5 font-mono text-base sm:text-lg font-black tabular-nums"
                      >
                        <GameAssetFrame
                          src={DIAMOND_ICON_PATH}
                          alt="Diamond"
                          rarity="legendary"
                          size="xs"
                          shape="item"
                          showFactionBadge={false}
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
                        data-testid={`tech-queue-${idx + 1}-base-time`}
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

                {/* HÀNG DƯỚI CỘT 2–3–4: Bộ chọn cấp độ nghiên cứu */}
                <div className="md:col-span-6 lg:col-span-9 lg:col-start-4">
                  <TechnologyLevelSelector
                    queueIndex={idx + 1}
                    maxLevel={plan.node.maxLevel}
                    fromLevel={plan.fromLevel}
                    toLevel={plan.toLevel}
                    locale={locale}
                    onChangeRange={(nextFrom, nextTo) =>
                      handleUpdateQueue(plan.queueId, (prev) => ({
                        ...prev,
                        fromLevel: nextFrom,
                        toLevel: nextTo,
                      }))
                    }
                  />
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Section 4: Global 2-Queue Summary Bar */}
      <section
        data-testid="technology-global-summary"
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
                ? "Tổng Hợp Kế Hoạch Nghiên Cứu (2 Đội Nghiên Cứu)"
                : "Total Dual-Queue Research Plan (2 Queues)"}
            </h2>
          </div>
          <span className="text-xs font-sans font-semibold text-muted-foreground">
            {isVi
              ? "Cộng gộp tài nguyên, Uy Thế Khoa Kỹ và đối chiếu thời gian chạy song song"
              : "Aggregates resources, Tech Power gained, and parallel vs sequential speedup time"}
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
                    <GameAssetFrame
                      src={metaRes.icon}
                      alt={metaRes.label[locale]}
                      rarity="rare"
                      size="xs"
                      shape="item"
                      showFactionBadge={false}
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

          {/* 2. Total Ruby & Required Cottage Level */}
          <div
            className={cn(
              CALC_MD3.tonalGroup,
              "space-y-2 bg-slate-50/90 dark:bg-slate-800/50 ring-1 ring-slate-200/80 dark:ring-slate-700/60"
            )}
          >
            <div className="text-xs font-sans font-bold uppercase tracking-wide text-muted-foreground">
              {isVi
                ? "Tổng Ruby & Cấp Viện NC"
                : "Total Ruby & Cottage Level"}
            </div>
            <div className="flex items-center justify-between gap-2 text-sm">
              <div className="flex items-center gap-2">
                <GameAssetFrame
                  src={CONSTRUCTION_RESOURCE_META.ruby.icon}
                  alt={CONSTRUCTION_RESOURCE_META.ruby.label[locale]}
                  rarity="rare"
                  size="xs"
                  shape="item"
                  showFactionBadge={false}
                />
                <span className="font-sans font-semibold text-foreground">
                  {CONSTRUCTION_RESOURCE_META.ruby.label[locale]}:
                </span>
              </div>
              <span className="font-mono font-black tabular-nums text-foreground">
                {formatGameResourceCompact(
                  globalSummary.totalDiscountedCosts.ruby
                )}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2 text-sm">
              <div className="flex items-center gap-2">
                <GameAssetFrame
                  src={RESEARCH_COTTAGE_ICON_PATH}
                  alt={isVi ? "Viện Nghiên Cứu" : "Research Cottage"}
                  rarity="legendary"
                  size="xs"
                  shape="item"
                  showFactionBadge={false}
                />
                <span className="font-sans font-semibold text-foreground">
                  {isVi ? "Viện Nghiên Cứu:" : "Research Cottage:"}
                </span>
              </div>
              <span className="font-mono font-black tabular-nums text-amber-600 dark:text-amber-400">
                Lv.{globalSummary.maxRequiredCottageLevel}
              </span>
            </div>
          </div>

          {/* 3. Total Tech Power & Instant Diamonds */}
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
                {isVi ? "Tổng KC mua đứt:" : "Total Instant Diamonds:"}
              </span>
              <span className="inline-flex items-center gap-1 font-mono font-black tabular-nums text-sky-600 dark:text-sky-400">
                <GameAssetFrame
                  src={DIAMOND_ICON_PATH}
                  alt="Diamond"
                  rarity="legendary"
                  size="xs"
                  shape="item"
                  showFactionBadge={false}
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

      {/* Technology Picker Modal (Option 2C 2-Tier Branch Selector + Option 3 Native 3-Col Game Tree) */}
      {activePickerQueue ? (
        <div
          data-md3-overlay="true"
          data-testid="technology-picker-modal"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-3 sm:p-4 backdrop-blur-sm"
          onClick={() => setActivePickerQueueId(null)}
        >
          <div
            className={cn(
              CALC_MD3.overlayCard,
              "w-full max-w-4xl max-h-[88vh] flex flex-col gap-3.5 overflow-hidden"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between gap-2 pb-1">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
                  <FlaskConical className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-heading font-black text-foreground">
                    {isVi
                      ? "Viện Nghiên Cứu — Chọn Nhánh & Sơ Đồ Cây Công Nghệ"
                      : "Research Cottage — Select Branch & Technology Tree"}
                  </h3>
                  <p className="text-xs font-sans text-muted-foreground">
                    {isVi
                      ? "8 nhánh công nghệ (4 Cơ Bản • 4 Nâng Cao) & sơ đồ cây 3 cột chuẩn tọa độ trong game"
                      : "8 Research Branches (4 Basic • 4 Advanced) & authentic 3-column in-game tree layout"}
                  </p>
                </div>
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

            {/* Global Instant Search Input */}
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                type="text"
                value={pickerSearch}
                placeholder={
                  isVi
                    ? "Tìm nhanh tên công nghệ trong 190 node (VD: Tốc độ Nghiên Cứu, Lv Lính Bộ Tộc, Điểm Công Nghệ)..."
                    : "Instant search across all 190 tech nodes (e.g. Research Speed, Horde Troop Level)..."
                }
                onChange={(e) => setPickerSearch(e.target.value)}
                className="h-11 min-h-[44px] w-full rounded-xl bg-muted/50 pl-10 pr-3 text-base font-sans text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
            </div>

            {/* Option 2C: Visual 2-Tier Branch Selector (Basic Sky/Blue vs Advanced Purple/Violet) */}
            <div className="space-y-2 rounded-2xl bg-slate-100/80 dark:bg-slate-900/60 p-3 ring-1 ring-slate-200/80 dark:ring-slate-800/80">
              {/* Tier 1: Basic Branches (4) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-sans font-black uppercase tracking-wide text-sky-700 dark:text-sky-300">
                    {isVi
                      ? "Tầng Cơ Bản (4 Nhánh Nền Tảng)"
                      : "Basic Tier (4 Core Branches)"}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {basicBranches.map((b) => {
                    const isSelected = selectedBranchId === b.id && !searchResults;
                    return (
                      <button
                        key={b.id}
                        type="button"
                        data-testid="tech-branch-card"
                        onClick={() => {
                          setSelectedBranchId(b.id);
                          setPickerSearch("");
                        }}
                        className={cn(
                          "flex items-center gap-2.5 rounded-xl p-2 text-left min-h-[54px] transition-all cursor-pointer",
                          isSelected
                            ? "bg-sky-500/20 ring-2 ring-amber-400 shadow-sm"
                            : "bg-sky-500/10 hover:bg-sky-500/15 ring-1 ring-sky-500/25"
                        )}
                      >
                        <GameAssetFrame
                          src={b.icon}
                          alt={b.name[locale]}
                          rarity="rare"
                          size="sm"
                          shape="item"
                          showFactionBadge={false}
                        />
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-xs sm:text-sm font-heading font-bold text-foreground">
                            {b.name[locale]}
                          </div>
                          <div className="font-mono text-xs font-bold text-sky-700 dark:text-sky-300">
                            {b.nodeCount} nodes
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tier 2: Advanced Branches (4) */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-sans font-black uppercase tracking-wide text-purple-700 dark:text-purple-300">
                    {isVi
                      ? "Tầng Nâng Cao (4 Nhánh Chuyên Sâu)"
                      : "Advanced Tier (4 Specialized Branches)"}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {advancedBranches.map((b) => {
                    const isSelected = selectedBranchId === b.id && !searchResults;
                    return (
                      <button
                        key={b.id}
                        type="button"
                        data-testid="tech-branch-card"
                        onClick={() => {
                          setSelectedBranchId(b.id);
                          setPickerSearch("");
                        }}
                        className={cn(
                          "flex items-center gap-2.5 rounded-xl p-2 text-left min-h-[54px] transition-all cursor-pointer",
                          isSelected
                            ? "bg-purple-500/25 ring-2 ring-amber-400 shadow-sm"
                            : "bg-purple-500/10 hover:bg-purple-500/15 ring-1 ring-purple-500/25"
                        )}
                      >
                        <GameAssetFrame
                          src={b.icon}
                          alt={b.name[locale]}
                          rarity="epic"
                          size="sm"
                          shape="item"
                          showFactionBadge={false}
                        />
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-xs sm:text-sm font-heading font-bold text-foreground">
                            {b.name[locale]}
                          </div>
                          <div className="font-mono text-xs font-bold text-purple-700 dark:text-purple-300">
                            {b.nodeCount} nodes
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Option 3: Native 3-Column Game Tree OR Search Results */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-3">
              {searchResults ? (
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                  {searchResults.map((node) => {
                    const isSelected = activePickerQueue.nodeId === node.id;
                    return (
                      <button
                        key={node.id}
                        type="button"
                        data-testid={`tech-tree-node-${node.id}`}
                        onClick={() => handleSelectNodeInModal(node)}
                        className={cn(
                          CALC_MD3.tonalTile,
                          "flex items-center gap-3 p-3 text-left min-h-[68px]",
                          isSelected ? CALC_MD3.tileSelected : ""
                        )}
                      >
                        <GameAssetFrame
                          src={node.icon}
                          alt={node.name[locale]}
                          rarity="legendary"
                          size="md"
                          shape="item"
                          showFactionBadge={false}
                        />
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm font-heading font-bold text-foreground">
                            {node.name[locale]}
                          </div>
                          <div className="mt-0.5 flex items-center gap-1.5 text-xs font-sans text-muted-foreground">
                            <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                              Max Lv.{node.maxLevel}
                            </span>
                            <span>•</span>
                            <span>
                              {isVi
                                ? `Hàng ${node.row} • Cột ${node.col}`
                                : `Row ${node.row} • Col ${node.col}`}
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div
                  data-testid="tech-tree-3col-grid"
                  className="space-y-2 rounded-2xl bg-slate-100/70 dark:bg-slate-900/40 p-3 ring-1 ring-slate-200/70 dark:ring-slate-800/70"
                >
                  {branchTreeRows.map((rowItem, rIdx) => (
                    <React.Fragment key={rowItem.rowNumber}>
                      {rIdx > 0 ? (
                        <div
                          aria-hidden="true"
                          className="flex items-center justify-center py-0.5 text-amber-500/70"
                        >
                          <ArrowDown className="h-4 w-4" />
                        </div>
                      ) : null}

                      <div className="grid grid-cols-3 gap-2 sm:gap-3 items-stretch">
                        {rowItem.cells.map((cellNode, cIdx) => {
                          if (!cellNode) {
                            return (
                              <div
                                key={`empty-${rowItem.rowNumber}-${cIdx + 1}`}
                                aria-hidden="true"
                                className="min-h-[64px] rounded-xl bg-transparent"
                              />
                            );
                          }

                          const isSelected =
                            activePickerQueue.nodeId === cellNode.id;
                          const firstStepPrereqs =
                            cellNode.levels[0]?.prerequisites ?? [];

                          return (
                            <button
                              key={cellNode.id}
                              type="button"
                              data-testid={`tech-tree-node-${cellNode.id}`}
                              onClick={() => handleSelectNodeInModal(cellNode)}
                              className={cn(
                                CALC_MD3.tonalTile,
                                "flex flex-col justify-between gap-2 p-2.5 sm:p-3 text-left min-h-[76px]",
                                isSelected
                                  ? CALC_MD3.tileSelected
                                  : "ring-1 ring-slate-200/80 dark:ring-slate-700/60"
                              )}
                            >
                              <div className="flex items-center gap-2.5">
                                <GameAssetFrame
                                  src={cellNode.icon}
                                  alt={cellNode.name[locale]}
                                  rarity="legendary"
                                  size="sm"
                                  shape="item"
                                  showFactionBadge={false}
                                />
                                <div className="min-w-0 flex-1">
                                  <div className="line-clamp-2 text-xs sm:text-sm font-heading font-bold text-foreground leading-snug">
                                    {cellNode.name[locale]}
                                  </div>
                                </div>
                              </div>

                              <div className="flex flex-wrap items-center justify-between gap-1 pt-1">
                                <span className="rounded-md bg-amber-500/15 px-1.5 py-0.5 font-mono text-xs font-black text-amber-700 dark:text-amber-300">
                                  0/{cellNode.maxLevel}
                                </span>
                                {firstStepPrereqs.length > 0 ? (
                                  <span className="text-xs font-sans font-semibold text-muted-foreground truncate">
                                    {isVi
                                      ? `Cần ${firstStepPrereqs.length} nhánh trước`
                                      : `Req ${firstStepPrereqs.length} prev`}
                                  </span>
                                ) : (
                                  <span className="text-xs font-sans text-muted-foreground">
                                    R{cellNode.row}•C{cellNode.col}
                                  </span>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

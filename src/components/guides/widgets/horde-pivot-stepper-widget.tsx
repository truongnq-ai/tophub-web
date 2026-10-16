"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  CheckCircle2,
  Flame,
  Gem,
  Layers,
  Lock,
  Shield,
  Sparkles,
  Swords,
} from "lucide-react";
import type {
  GuideArticle,
  GuideLocale,
  GuideTableBlock,
} from "@/content/guides/types";
import { ARTICLE_4_2_HORDE_PIVOT_ROADMAP } from "@/content/guides/groups/group-4/4.2-horde-pivot-roadmap";
import { useUidSession } from "@/hooks/use-uid-session";

export interface HordePivotStepperWidgetProps {
  article?: GuideArticle;
  locale?: GuideLocale;
  forceUnlockPro?: boolean;
}

interface ParsedPivotStage {
  stageNumber: 1 | 2 | 3 | 4;
  dayRangeBadge: { vi: string; en: string };
  shortTitle: { vi: string; en: string };
  auraBadge: { vi: string; en: string };
  stageAndMilestone: string;
  queue1Lineup: string;
  shardAndBookRule: string;
  gearAndBuildingRule: string;
  leagueRosterRole: string;
  queue1Heroes: { name: string; faction: "league" | "horde"; note: string }[];
  queue2Heroes: { name: string; faction: "league" | "horde"; note: string }[];
}

const STAGE_META: Record<
  1 | 2 | 3 | 4,
  {
    dayRangeBadge: { vi: string; en: string };
    shortTitle: { vi: string; en: string };
    auraBadge: { vi: string; en: string };
    queue1Heroes: { name: string; faction: "league" | "horde"; note: string }[];
    queue2Heroes: { name: string; faction: "league" | "horde"; note: string }[];
  }
> = {
  1: {
    dayRangeBadge: { vi: "Ngày 1 ➔ 20", en: "Days 1 ➔ 20" },
    shortTitle: {
      vi: "GĐ 1: Đóng Băng Đầu Tư Mềm",
      en: "Stage 1: Soft Freeze",
    },
    auraBadge: {
      vi: "6 Liên Minh (+35% Aura) • 0 Mảnh Vạn Năng",
      en: "6 League (+35% Aura) • 0 Universal Shards",
    },
    queue1Heroes: [
      { name: "Secret Keeper", faction: "league", note: "Tank (0 Shards)" },
      { name: "Adjudicator", faction: "league", note: "Tank" },
      { name: "Pyromancer", faction: "league", note: "Main Carry" },
      { name: "Astrologer", faction: "league", note: "Burst (0 Books)" },
      { name: "Bard", faction: "league", note: "Buffer" },
      { name: "Nun", faction: "league", note: "Healer" },
    ],
    queue2Heroes: [
      {
        name: "6 SSR Horde (Parked Lv.135–150)",
        faction: "horde",
        note: "Chờ tiếp quản Đội 1",
      },
    ],
  },
  2: {
    dayRangeBadge: { vi: "Ngày 21 ➔ 35", en: "Days 21 ➔ 35" },
    shortTitle: {
      vi: "GĐ 2: Cầu Nối Lai 4L + 2H",
      en: "Stage 2: 4L + 2H Hybrid Bridge",
    },
    auraBadge: {
      vi: "4 Liên Minh + 2 Bộ Lạc (+15% Aura) • 1★ Đỏ (160 Mảnh)",
      en: "4 League + 2 Horde (+15% Aura) • 1-Red Star (160 Shards)",
    },
    queue1Heroes: [
      { name: "Desert Prince", faction: "horde", note: "1★ Đỏ (160 Mảnh)" },
      { name: "Adjudicator", faction: "league", note: "Sub-Tank" },
      { name: "Storm Maiden", faction: "horde", note: "1★ Đỏ (160 Mảnh)" },
      { name: "Pyromancer", faction: "league", note: "Sub-Carry" },
      { name: "Bard", faction: "league", note: "Buffer" },
      { name: "Nun", faction: "league", note: "Healer" },
    ],
    queue2Heroes: [
      { name: "Secret Keeper", faction: "league", note: "Lùi xuống Đội 2" },
      { name: "Astrologer", faction: "league", note: "Lùi xuống Đội 2" },
    ],
  },
  3: {
    dayRangeBadge: { vi: "Ngày 36 ➔ 45", en: "Days 36 ➔ 45" },
    shortTitle: {
      vi: "GĐ 3: Chuyển Giao Đội 1 Hoàn Toàn",
      en: "Stage 3: Full Horde Queue 1",
    },
    auraBadge: {
      vi: "6 Bộ Lạc Đội 1 (+35%) • Đội 2 Liên Minh 2.8M",
      en: "6 Horde Queue 1 (+35%) • 2.8M League Queue 2",
    },
    queue1Heroes: [
      { name: "Desert Prince", faction: "horde", note: "1★ Trắng (560 Mảnh)" },
      { name: "Swordmaster / Barbarian", faction: "horde", note: "Sub-Tank" },
      { name: "Storm Maiden", faction: "horde", note: "1★ Trắng (560 Mảnh)" },
      { name: "Wilderness Hunter", faction: "horde", note: "Buff Tốc Đánh" },
      { name: "Witch", faction: "horde", note: "Day 41 • 1★ Đỏ (160 Mảnh)" },
      { name: "Soulmancer / Warlock", faction: "horde", note: "Chia sẻ Sát thương" },
    ],
    queue2Heroes: [
      { name: "Adjudicator", faction: "league", note: "Đội 2 Nguyên vẹn (2.8M)" },
      { name: "Secret Keeper", faction: "league", note: "Đội 2 Nguyên vẹn" },
      { name: "Pyromancer", faction: "league", note: "Đội 2 Nguyên vẹn" },
      { name: "Astrologer", faction: "league", note: "Đội 2 Nguyên vẹn" },
      { name: "Bard", faction: "league", note: "Đội 2 Nguyên vẹn" },
      { name: "Nun", faction: "league", note: "Đội 2 Nguyên vẹn" },
    ],
  },
  4: {
    dayRangeBadge: { vi: "Ngày 46+ ➔ S1–S3", en: "Day 46+ ➔ S1–S3" },
    shortTitle: {
      vi: "GĐ 4: Thức Tỉnh 9 Soul Stones & 5 Mythic",
      en: "Stage 4: 9 Soul Stones & 5 Mythics",
    },
    auraBadge: {
      vi: "5 Mythic + 1 SSR Thức Tỉnh (9 Hồn Đá Đỏ vs 27)",
      en: "5 Mythics + 1 Awakened SSR (9 vs 27 Soul Stones)",
    },
    queue1Heroes: [
      { name: "Beastmaster", faction: "horde", note: "S2 Mythic Tank" },
      { name: "Desert Prince", faction: "horde", note: "UW +10 ➔ +20" },
      { name: "Wukong", faction: "horde", note: "S2 Mythic God Carry" },
      { name: "Storm Maiden", faction: "horde", note: "UW +10 ➔ +20" },
      { name: "Witch", faction: "horde", note: "Mythic Healer/CC" },
      {
        name: "Soulmancer / Warlock",
        faction: "horde",
        note: "Awakened (9 Hồn Đá Đỏ)",
      },
    ],
    queue2Heroes: [
      {
        name: "Pure League Queue 2 (6 Heroes)",
        faction: "league",
        note: "3v3 Apex Arena & Giữ Mỏ",
      },
      {
        name: "Pure Nature Queue 3 (Natural Drops)",
        faction: "league",
        note: "Đội 3 Tự nhiên",
      },
    ],
  },
};

export function HordePivotStepperWidget({
  article,
  locale = "vi",
  forceUnlockPro = false,
}: HordePivotStepperWidgetProps) {
  const t = useTranslations("Guides");
  const { activeAccount } = useUidSession();
  const isLockEnabled =
    process.env.NEXT_PUBLIC_ENABLE_PRO_CONTENT_LOCK === "true";
  const hasProAccess =
    forceUnlockPro || !isLockEnabled || activeAccount?.active_plan === "PRO";

  const sourceArticle =
    article?.slug === "horde-pivot-roadmap"
      ? article
      : ARTICLE_4_2_HORDE_PIVOT_ROADMAP;

  const [activeStageNumber, setActiveStageNumber] = useState<1 | 2 | 3 | 4>(1);

  const stages = useMemo<ParsedPivotStage[]>(() => {
    const allSections = [
      ...(sourceArticle.freeSections ?? []),
      ...(sourceArticle.proSections ?? []),
    ];
    const proSec = allSections.find(
      (sec) => sec.id === "sec-4-zero-loss-pivot-protocol"
    );
    const matrixSub = proSec?.subSections?.find(
      (sub) => sub.id === "sub-4-2-zero-loss-pivot-matrix"
    );
    const tableBlock = matrixSub?.blocks.find(
      (b): b is GuideTableBlock => b.type === "table"
    );

    const stageNums: (1 | 2 | 3 | 4)[] = [1, 2, 3, 4];

    return stageNums.map((num, idx) => {
      const row = tableBlock?.rows[idx];
      const meta = STAGE_META[num];
      return {
        stageNumber: num,
        dayRangeBadge: meta.dayRangeBadge,
        shortTitle: meta.shortTitle,
        auraBadge: meta.auraBadge,
        stageAndMilestone: row?.[0]?.[locale] ?? meta.shortTitle[locale],
        queue1Lineup: row?.[1]?.[locale] ?? "",
        shardAndBookRule: row?.[2]?.[locale] ?? "",
        gearAndBuildingRule: row?.[3]?.[locale] ?? "",
        leagueRosterRole: row?.[4]?.[locale] ?? "",
        queue1Heroes: meta.queue1Heroes,
        queue2Heroes: meta.queue2Heroes,
      };
    });
  }, [sourceArticle, locale]);

  useEffect(() => {
    const handleTocNavigate = (event: Event) => {
      const customEvent = event as CustomEvent<{ targetId?: string }>;
      const targetId = customEvent.detail?.targetId;
      if (
        targetId === "sub-4-2-zero-loss-pivot-matrix" ||
        targetId === "sub-4-1-four-stage-state-diagram"
      ) {
        setActiveStageNumber(4);
      } else if (targetId === "sub-2-1-hybrid-bridge-roadmap") {
        setActiveStageNumber(2);
      }
    };
    window.addEventListener("tophub:toc-navigate", handleTocNavigate);
    return () => {
      window.removeEventListener("tophub:toc-navigate", handleTocNavigate);
    };
  }, []);

  const currentStage =
    stages.find((s) => s.stageNumber === activeStageNumber) ?? stages[0];

  return (
    <div
      data-testid="widget-horde-pivot-stepper"
      className="my-6 rounded-2xl border border-amber-500/30 bg-gradient-to-b from-[#131722]/95 via-[#0F131D]/95 to-[#0B0E14]/95 p-4 sm:p-6 shadow-[0_14px_36px_rgba(0,0,0,0.45)]"
    >
      {/* Consolidated SSoT Anchor Stub */}
      <span
        id="sub-4-2-zero-loss-pivot-matrix"
        data-consolidated-by-widget="true"
        className="scroll-mt-28"
        aria-hidden="true"
      />

      {/* Header + 9 vs 27 Soul Stones Savings Meter */}
      <div className="flex flex-col gap-4 border-b border-white/10 pb-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-300">
            <Flame className="h-3.5 w-3.5 text-amber-400" />
            <span>
              {locale === "vi"
                ? "Lộ Trình Chuyển Giao Zero-Loss • Ngày 1 ➔ S3"
                : "Zero-Loss Pivot Protocol • Day 1 ➔ S3"}
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white">
            {t("widgetPivotTitle")}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            {t("widgetPivotSubtitle")}
          </p>
        </div>

        {/* 9 vs 27 Soul Stones Meter */}
        <div
          data-testid="pivot-soulstone-meter"
          className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-2.5 text-xs"
        >
          <div className="flex items-center justify-between gap-4 font-bold text-emerald-300">
            <span className="inline-flex items-center gap-1.5">
              <Gem className="h-3.5 w-3.5 text-emerald-400" />
              {locale === "vi"
                ? "Kinh Tế Hồn Đá Đỏ (Soul Stones):"
                : "Soul Stone Economy:"}
            </span>
            <span className="font-mono text-emerald-200">
              9 vs 27 (-67% Cost)
            </span>
          </div>
          <div className="mt-1.5 flex items-center gap-2 text-[11px] text-slate-300">
            <span className="rounded bg-rose-500/20 px-1.5 py-0.5 font-semibold text-rose-200">
              {locale === "vi"
                ? "Horde: 9 Hồn Đá Đỏ (1 SSR)"
                : "Horde: 9 Soul Stones (1 SSR)"}
            </span>
            <span>vs</span>
            <span className="rounded bg-blue-500/20 px-1.5 py-0.5 text-blue-200 line-through opacity-80">
              {locale === "vi"
                ? "League: 27 Hồn Đá Đỏ (3 SSR)"
                : "League: 27 Soul Stones (3 SSR)"}
            </span>
          </div>
        </div>
      </div>

      {/* 4-Stage Stepper Bar */}
      <div
        role="tablist"
        aria-label={t("widgetPivotTitle")}
        className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4"
      >
        {stages.map((stage) => {
          const isActive = stage.stageNumber === activeStageNumber;
          return (
            <button
              key={stage.stageNumber}
              type="button"
              role="tab"
              aria-selected={isActive}
              data-testid={`pivot-stage-btn-${stage.stageNumber}`}
              onClick={() => setActiveStageNumber(stage.stageNumber)}
              className={`min-h-11 flex flex-col justify-between rounded-xl border p-3 text-left transition-all ${
                isActive
                  ? "border-amber-400/60 bg-amber-500/15 text-white shadow-[0_0_20px_rgba(245,158,11,0.2)]"
                  : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/20 hover:bg-white/[0.06]"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-md bg-black/40 px-2 py-0.5 font-mono text-[11px] font-bold text-amber-300">
                  {stage.dayRangeBadge[locale]}
                </span>
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-bold ${
                    isActive
                      ? "bg-amber-400 text-slate-950"
                      : "bg-white/10 text-slate-400"
                  }`}
                >
                  {stage.stageNumber}
                </span>
              </div>
              <div className="mt-2 text-xs sm:text-sm font-bold leading-snug">
                {stage.shortTitle[locale]}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Stage Detail Panel */}
      {currentStage && (
        <div
          data-testid="pivot-active-stage-panel"
          className="mt-5 space-y-4 rounded-xl border border-white/10 bg-[#0B0E14]/90 p-4 sm:p-5"
        >
          {/* Stage Banner */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                {currentStage.stageAndMilestone}
              </span>
              <h4 className="mt-0.5 text-base font-bold text-white">
                {currentStage.queue1Lineup}
              </h4>
            </div>
            <span className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1 font-mono text-xs font-bold text-amber-300">
              {currentStage.auraBadge[locale]}
            </span>
          </div>

          {/* Visual Queue 1 -> Queue 2 Flow */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
            {/* Queue 1 Active Roster */}
            <div className="lg:col-span-7 rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
              <div className="mb-2.5 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-300">
                  <Swords className="h-3.5 w-3.5" />
                  {locale === "vi"
                    ? "Đội 1 Chủ Lực (Queue 1 Main)"
                    : "Queue 1 Main Lineup"}
                </span>
                <span className="text-[11px] text-slate-400">
                  {locale === "vi" ? "6 Vị Trí Ra Trận" : "6 Active Slots"}
                </span>
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {currentStage.queue1Heroes.map((hero) => (
                  <div
                    key={hero.name}
                    className={`flex items-center justify-between rounded-lg border px-2.5 py-2 text-xs ${
                      hero.faction === "horde"
                        ? "border-rose-500/35 bg-rose-500/10 text-rose-100"
                        : "border-blue-500/35 bg-blue-500/10 text-blue-100"
                    }`}
                  >
                    <span className="font-bold">
                      {hero.faction === "horde" ? "🔴 " : "🔵 "}
                      {hero.name}
                    </span>
                    <span className="rounded bg-black/30 px-1.5 py-0.5 font-mono text-[10px] text-slate-200">
                      {hero.note}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Queue 2 Zero-Loss Inheritance */}
            <div className="lg:col-span-5 rounded-xl border border-white/10 bg-white/[0.02] p-3.5 flex flex-col justify-between">
              <div>
                <div className="mb-2.5 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-300">
                    <Layers className="h-3.5 w-3.5" />
                    {locale === "vi"
                      ? "Đội 2 Kế Thừa (Zero-Loss Queue 2)"
                      : "Queue 2 Inheritance (Zero-Loss)"}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                </div>
                <div className="space-y-1.5">
                  {currentStage.queue2Heroes.map((hero) => (
                    <div
                      key={hero.name}
                      className="flex items-center justify-between rounded-lg border border-white/10 bg-black/30 px-2.5 py-1.5 text-xs text-slate-200"
                    >
                      <span className="font-semibold">{hero.name}</span>
                      <span className="text-[11px] text-emerald-300">
                        {hero.note}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="mt-3 border-t border-white/10 pt-2.5 text-xs leading-relaxed text-slate-300">
                {currentStage.leagueRosterRole}
              </p>
            </div>
          </div>

          {/* Zero-Loss Resource Discipline Cards (Shards/Books + Gear/Soul Stones) */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="rounded-xl border border-amber-500/25 bg-amber-500/[0.06] p-3.5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
                <Sparkles className="h-4 w-4 text-amber-400" />
                <span>
                  {locale === "vi"
                    ? "Kỷ Luật Mảnh Vạn Năng & Sách Kỹ Năng"
                    : "Universal Shard & Skill Book Discipline"}
                </span>
              </div>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-200">
                {currentStage.shardAndBookRule}
              </p>
            </div>

            <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/[0.06] p-3.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-300">
                  <Shield className="h-4 w-4 text-emerald-400" />
                  <span>
                    {locale === "vi"
                      ? "Đồ Vàng (+10/+20/+30), Công Trình & Hồn Đá Đỏ"
                      : "Golden Gear, Buildings & Soul Stones"}
                  </span>
                </div>
                {!hasProAccess && (
                  <span className="inline-flex items-center gap-1 rounded bg-amber-500/20 px-1.5 py-0.5 text-[10px] font-bold text-amber-300">
                    <Lock className="h-2.5 w-2.5" /> PRO
                  </span>
                )}
              </div>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-200">
                {currentStage.gearAndBuildingRule}
              </p>
            </div>
          </div>

          {/* Mythic Star Conversion Footnote */}
          <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 text-[11px] text-slate-300">
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
            <span>
              {locale === "vi"
                ? "Chuẩn Sao Mythic SSoT: 1★ Đỏ = 6 Sao (160 Mảnh) • 5★ Đỏ = 10 Sao (400 Mảnh) • 1★ Trắng/Bạc = 11 Sao (560 Mảnh, +30% Skill)."
                : "Mythic Star SSoT: 1-Red Star = 6 Stars (160 Shards) • 5-Red Stars = 10 Stars (400 Shards) • 1-White/Silver Star = 11 Stars (560 Shards, +30% Skill)."}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

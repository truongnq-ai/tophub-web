"use client";

import React, { useMemo, useState } from "react";
import {
  CalendarClock,
  CheckCircle2,
  Coins,
  Flame,
  Layers,
  PackageCheck,
  ShoppingBag,
  Sparkles,
  Wrench,
} from "lucide-react";
import {
  EVENT_PLAYBOOKS_DATA,
  filterPlaybooksBySeason,
} from "@/content/guides/event-playbooks-data";
import type {
  EventPlaybookRecord,
  EventSeasonTag,
  GuideArticle,
  GuideLocale,
} from "@/content/guides/types";
import { GameAssetFrame } from "../media/game-asset-frame";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface EventEncyclopediaFlatViewProps {
  readonly article: GuideArticle;
  readonly locale: GuideLocale;
}

const SEASON_FILTERS: readonly EventSeasonTag[] = [
  "ALL",
  "S0",
  "S1",
  "S2",
  "S3",
  "S4",
];

interface CanonicalSectionMeta {
  readonly code: "5.1" | "5.2" | "5.3" | "5.4" | "5.5" | "5.6";
  readonly anchorId: string;
  readonly label: { readonly vi: string; readonly en: string };
}

const CANONICAL_SECTIONS: readonly CanonicalSectionMeta[] = [
  {
    code: "5.1",
    anchorId: "sec-5-1",
    label: {
      vi: "5.1 Trục thời gian & Thể lệ",
      en: "5.1 Timeline & Rules",
    },
  },
  {
    code: "5.2",
    anchorId: "sec-5-2",
    label: {
      vi: "5.2 Nhiệm vụ & Mốc điểm",
      en: "5.2 Tasks & Milestones",
    },
  },
  {
    code: "5.3",
    anchorId: "sec-5-3",
    label: {
      vi: "5.3 Cửa hàng & Vật phẩm rơi",
      en: "5.3 Shop & Drops",
    },
  },
  {
    code: "5.4",
    anchorId: "sec-5-4",
    label: {
      vi: "5.4 Gói nạp & Phân tích ROI",
      en: "5.4 Packs & ROI",
    },
  },
  {
    code: "5.5",
    anchorId: "sec-5-5",
    label: {
      vi: "5.5 Kế hoạch Tích trữ",
      en: "5.5 Hoarding Plan",
    },
  },
  {
    code: "5.6",
    anchorId: "sec-5-6",
    label: {
      vi: "5.6 Mẹo & Kỹ thuật Cao Thủ",
      en: "5.6 Pro Mechanics",
    },
  },
];

export function EventEncyclopediaFlatView({
  article,
  locale,
}: EventEncyclopediaFlatViewProps): React.ReactElement | null {
  const [selectedSeason, setSelectedSeason] = useState<EventSeasonTag>("ALL");
  const [selectedEventId, setSelectedEventId] = useState<string>(
    "guild-arms-race"
  );
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [activeSectionCode, setActiveSectionCode] = useState<string>(
    article.code.startsWith("5.") ? article.code : "5.1"
  );

  const visibleEvents = useMemo(
    () => filterPlaybooksBySeason(EVENT_PLAYBOOKS_DATA, selectedSeason),
    [selectedSeason]
  );

  const activeEvent: EventPlaybookRecord = useMemo(() => {
    const found = visibleEvents.find((item) => item.id === selectedEventId);
    return found ?? visibleEvents[0] ?? EVENT_PLAYBOOKS_DATA[0];
  }, [visibleEvents, selectedEventId]);

  const sixTables = activeEvent.sixTables;
  if (!sixTables) return null;

  const activeDayStage =
    activeEvent.dailyStages.find((d) => d.dayNumber === selectedDay) ??
    activeEvent.dailyStages[0];

  const handleSelectEvent = (eventId: string): void => {
    setSelectedEventId(eventId);
    setSelectedDay(1);
  };

  const handleJumpToSection = (sec: CanonicalSectionMeta): void => {
    setActiveSectionCode(sec.code);
    if (typeof document !== "undefined") {
      const el = document.getElementById(sec.anchorId);
      if (el && typeof el.scrollIntoView === "function") {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div
      data-testid="event-encyclopedia-flat-view"
      className="space-y-6 font-sans text-base text-foreground"
    >
      {/* STICKY EVENT SELECTOR & 6-SECTION ANCHOR BAR (Single-Layer MD3 Toolbar) */}
      <div
        data-testid="flat-event-selector-bar"
        className="sticky top-16 z-30 -mx-1 px-1 py-3 bg-background/95 backdrop-blur-md border-b border-border/70 space-y-2.5"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {SEASON_FILTERS.map((season) => {
              const isSelected = selectedSeason === season;
              return (
                <button
                  key={season}
                  type="button"
                  data-testid={`flat-season-filter-${season}`}
                  onClick={() => setSelectedSeason(season)}
                  className={cn(
                    "inline-flex items-center justify-center min-h-[44px] px-3 py-1.5 rounded-xl border text-xs font-heading font-bold transition-colors cursor-pointer",
                    isSelected
                      ? "border-amber-500 bg-amber-500 text-slate-950"
                      : "border-border/70 bg-card/70 text-muted-foreground hover:text-foreground hover:border-amber-500/40"
                  )}
                >
                  {season === "ALL"
                    ? locale === "vi"
                      ? "Tất cả Mùa"
                      : "All Seasons"
                    : season}
                </button>
              );
            })}
          </div>

          <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
            {locale === "vi"
              ? `${visibleEvents.length} Sự kiện S0 ➔ GAR`
              : `${visibleEvents.length} S0 ➔ GAR Events`}
          </span>
        </div>

        {/* Horizontal Event Selector Strip */}
        <div className="flex items-stretch gap-2 overflow-x-auto snap-x snap-mandatory pb-1 no-scrollbar">
          {visibleEvents.map((ev) => {
            const isSelected = ev.id === activeEvent.id;
            return (
              <button
                key={ev.id}
                type="button"
                data-testid={`flat-event-pill-${ev.id}`}
                onClick={() => handleSelectEvent(ev.id)}
                className={cn(
                  "snap-start shrink-0 min-w-[220px] max-w-[260px] min-h-[56px] rounded-xl border p-2.5 text-left flex items-center gap-2.5 transition-all cursor-pointer",
                  isSelected
                    ? "border-amber-500 bg-amber-500/15 text-foreground"
                    : "border-border/70 bg-card/60 text-muted-foreground hover:text-foreground hover:border-amber-500/40"
                )}
              >
                <GameAssetFrame
                  src={ev.iconPath}
                  alt={ev.name[locale]}
                  size="sm"
                  rarity={ev.rarity}
                  faction={ev.faction}
                />
                <div className="min-w-0 flex-1">
                  <div className="font-heading font-bold text-xs sm:text-sm text-foreground truncate">
                    {ev.name[locale]}
                  </div>
                  <div className="text-xs text-amber-600 dark:text-amber-400 truncate">
                    {ev.s0TimingBadge[locale]}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* 6 Quick-Jump Section Pills (5.1 ➔ 5.6) */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-0.5">
          {CANONICAL_SECTIONS.map((sec) => {
            const isActive = activeSectionCode === sec.code;
            return (
              <button
                key={sec.code}
                type="button"
                data-testid={`flat-jump-pill-${sec.code}`}
                onClick={() => handleJumpToSection(sec)}
                className={cn(
                  "inline-flex items-center gap-1.5 min-h-[44px] px-3 py-1.5 rounded-xl border text-xs font-heading font-bold whitespace-nowrap transition-colors cursor-pointer",
                  isActive
                    ? "border-amber-500/50 bg-amber-500/15 text-amber-700 dark:text-amber-300"
                    : "border-border/60 bg-background/80 text-muted-foreground hover:text-foreground hover:border-amber-500/35"
                )}
              >
                <span>{sec.label[locale]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ACTIVE EVENT SUMMARY BANNER (Single-Layer Flat Header) */}
      <div
        data-testid="flat-active-event-header"
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-border/60"
      >
        <div className="flex items-start sm:items-center gap-3.5">
          <GameAssetFrame
            src={activeEvent.iconPath}
            alt={activeEvent.name[locale]}
            size="lg"
            rarity={activeEvent.rarity}
            faction={activeEvent.faction}
          />
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant="outline"
                className="font-mono text-xs border-amber-500/35 text-amber-600 dark:text-amber-400"
              >
                {activeEvent.s0TimingBadge[locale]}
              </Badge>
              <span className="text-xs font-sans font-semibold text-muted-foreground">
                {activeEvent.cadenceBadge[locale]}
              </span>
            </div>
            <h2
              data-testid="flat-active-event-title"
              className="font-heading font-black text-lg sm:text-xl text-foreground leading-snug"
            >
              {activeEvent.name[locale]}
            </h2>
          </div>
        </div>
      </div>

      {/* ====================================================================
          SECTION 5.1 — BẢNG 1: TRỤC THỜI GIAN & THỂ LỆ CHÍNH
      ==================================================================== */}
      <section
        id="sec-5-1"
        data-testid="flat-section-5.1"
        className="scroll-mt-44 py-5 border-b border-border/50 space-y-4"
      >
        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-7 items-center justify-center rounded-lg border border-amber-500/30 bg-amber-500/10 px-2 font-mono text-xs font-bold text-amber-600 dark:text-amber-400">
            5.1
          </span>
          <CalendarClock className="h-5 w-5 text-amber-500 shrink-0" />
          <h3 className="font-heading font-bold text-lg sm:text-xl text-foreground">
            {locale === "vi"
              ? "Bảng 1 — Trục thời gian & Thể lệ chính (take_effect_time & recycle)"
              : "Table 1 — Timeline, Unlock Conditions & Leftover Item Recycling"}
          </h3>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-border/70">
          <table className="w-full text-left border-collapse text-sm sm:text-base">
            <thead>
              <tr className="border-b border-border/70 bg-muted/40 text-xs font-heading font-bold uppercase text-muted-foreground">
                <th className="py-3 px-4 w-1/3">
                  {locale === "vi" ? "Thông số hệ thống" : "System Parameter"}
                </th>
                <th className="py-3 px-4">
                  {locale === "vi"
                    ? "Chi tiết áp dụng"
                    : "Specification & Rules"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              <tr>
                <td className="py-3 px-4 font-semibold text-foreground">
                  {locale === "vi"
                    ? "Khung mở Server (take_effect_time)"
                    : "Server Launch Window (take_effect_time)"}
                </td>
                <td className="py-3 px-4 text-foreground/90">
                  {sixTables.table1TimelineRules.takeEffectTime[locale]}
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-foreground">
                  {locale === "vi"
                    ? "Thời lượng & Chu kỳ lặp"
                    : "Duration & Cooldown"}
                </td>
                <td className="py-3 px-4 text-foreground/90">
                  {sixTables.table1TimelineRules.durationAndCooldown[locale]}
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-foreground">
                  {locale === "vi"
                    ? "Điều kiện mở khóa"
                    : "Unlock Conditions"}
                </td>
                <td className="py-3 px-4 text-foreground/90">
                  {sixTables.table1TimelineRules.unlockConditions[locale]}
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-amber-600 dark:text-amber-400">
                  {locale === "vi"
                    ? "Cơ chế đạo cụ thừa (recycle)"
                    : "Leftover Item Recycling (recycle)"}
                </td>
                <td className="py-3 px-4 font-medium text-foreground">
                  {sixTables.table1TimelineRules.recyclePolicy[locale]}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <ul className="space-y-2 pt-1">
          {sixTables.table1TimelineRules.coreFaqRules.map((rule, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2.5 text-sm sm:text-base text-foreground/90 leading-relaxed"
            >
              <CheckCircle2 className="h-4 w-4 text-amber-500 shrink-0 mt-1" />
              <span>{rule[locale]}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ====================================================================
          SECTION 5.2 — BẢNG 2: NHIỆM VỤ & MỐC ĐIỂM
      ==================================================================== */}
      <section
        id="sec-5-2"
        data-testid="flat-section-5.2"
        className="scroll-mt-44 py-5 border-b border-border/50 space-y-4"
      >
        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-7 items-center justify-center rounded-lg border border-amber-500/30 bg-amber-500/10 px-2 font-mono text-xs font-bold text-amber-600 dark:text-amber-400">
            5.2
          </span>
          <Layers className="h-5 w-5 text-amber-500 shrink-0" />
          <h3 className="font-heading font-bold text-lg sm:text-xl text-foreground">
            {locale === "vi"
              ? "Bảng 2 — Nhiệm vụ & Mốc điểm (activity_task_target & Free vs VIP)"
              : "Table 2 — Daily/Cumulative Tasks & Milestone Tiers (Free vs VIP)"}
          </h3>
        </div>

        {/* Multi-Day Stage Selector Pills */}
        {activeEvent.dailyStages.length > 1 && (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-1.5">
              {activeEvent.dailyStages.map((stage) => {
                const isDaySelected = stage.dayNumber === activeDayStage.dayNumber;
                return (
                  <button
                    key={stage.dayNumber}
                    type="button"
                    data-testid={`flat-day-pill-${stage.dayNumber}`}
                    onClick={() => setSelectedDay(stage.dayNumber)}
                    className={cn(
                      "inline-flex items-center gap-1.5 min-h-[44px] px-3 py-1.5 rounded-xl border text-xs font-heading font-bold transition-colors cursor-pointer",
                      isDaySelected
                        ? "border-amber-500 bg-amber-500 text-slate-950"
                        : "border-border/70 bg-card/60 text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <span>{stage.label[locale]}</span>
                    <span className="hidden sm:inline font-normal opacity-85">
                      • {stage.theme[locale]}
                    </span>
                  </button>
                );
              })}
            </div>

            {activeDayStage && (
              <div className="py-2 text-sm sm:text-base space-y-1">
                <div className="font-heading font-bold text-amber-600 dark:text-amber-400">
                  {activeDayStage.label[locale]} — {activeDayStage.theme[locale]} (
                  {activeDayStage.goldenWindow[locale]})
                </div>
                <p className="text-foreground/90">{activeDayStage.proTip[locale]}</p>
              </div>
            )}
          </div>
        )}

        {/* Tasks Table */}
        <div className="overflow-x-auto rounded-2xl border border-border/70">
          <table className="w-full text-left border-collapse text-sm sm:text-base">
            <thead>
              <tr className="border-b border-border/70 bg-muted/40 text-xs font-heading font-bold uppercase text-muted-foreground">
                <th className="py-3 px-4">
                  {locale === "vi"
                    ? "Nhiệm vụ / Giai đoạn (activity_task_target)"
                    : "Task / Stage (activity_task_target)"}
                </th>
                <th className="py-3 px-4">
                  {locale === "vi" ? "Nguồn tính điểm" : "Scoring Source"}
                </th>
                <th className="py-3 px-4">
                  {locale === "vi"
                    ? "Khung giờ vàng & Cộng hưởng"
                    : "Golden Window & Overlap"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {sixTables.table2TasksAndMilestones.tasks.map((task, idx) => (
                <tr key={idx}>
                  <td className="py-3 px-4 font-semibold text-foreground">
                    {task.taskName[locale]}
                  </td>
                  <td className="py-3 px-4 text-foreground/90">
                    {task.pointsAwarded[locale]}
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">
                    {task.capOrNote[locale]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Milestones (Free vs VIP) Table */}
        <div className="overflow-x-auto rounded-2xl border border-border/70">
          <table className="w-full text-left border-collapse text-sm sm:text-base">
            <thead>
              <tr className="border-b border-border/70 bg-muted/40 text-xs font-heading font-bold uppercase text-muted-foreground">
                <th className="py-3 px-4">
                  {locale === "vi"
                    ? "Cấp mốc (activity_point_mission)"
                    : "Milestone Tier (activity_point_mission)"}
                </th>
                <th className="py-3 px-4">
                  {locale === "vi" ? "Mục tiêu điểm" : "Target Threshold"}
                </th>
                <th className="py-3 px-4">
                  {locale === "vi" ? "Cột Miễn Phí (Free)" : "Free Column"}
                </th>
                <th className="py-3 px-4">
                  {locale === "vi"
                    ? "Chiến lược & Cột VIP Pass"
                    : "Strategy & VIP Pass Column"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {sixTables.table2TasksAndMilestones.milestones.map((ms, idx) => (
                <tr key={idx}>
                  <td className="py-3 px-4 font-semibold text-foreground">
                    {ms.tierLabel[locale]}
                  </td>
                  <td className="py-3 px-4 font-mono text-xs sm:text-sm text-amber-600 dark:text-amber-400 font-bold">
                    {ms.pointsRequired[locale]}
                  </td>
                  <td className="py-3 px-4 text-foreground/90">
                    {ms.freeRewards[locale]}
                  </td>
                  <td className="py-3 px-4 text-foreground/90">
                    {ms.vipOrPassRewards[locale]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ====================================================================
          SECTION 5.3 — BẢNG 3: CỬA HÀNG & VẬT PHẨM RƠI
      ==================================================================== */}
      <section
        id="sec-5-3"
        data-testid="flat-section-5.3"
        className="scroll-mt-44 py-5 border-b border-border/50 space-y-4"
      >
        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-7 items-center justify-center rounded-lg border border-amber-500/30 bg-amber-500/10 px-2 font-mono text-xs font-bold text-amber-600 dark:text-amber-400">
            5.3
          </span>
          <ShoppingBag className="h-5 w-5 text-amber-500 shrink-0" />
          <h3 className="font-heading font-bold text-lg sm:text-xl text-foreground">
            {locale === "vi"
              ? "Bảng 3 — Cửa hàng & Vật phẩm rơi (activity_drop & active_shop)"
              : "Table 3 — Drop Sources, Hidden Caps & Event Shop Priority"}
          </h3>
        </div>

        {/* Drop Sources Table */}
        <div className="overflow-x-auto rounded-2xl border border-border/70">
          <table className="w-full text-left border-collapse text-sm sm:text-base">
            <thead>
              <tr className="border-b border-border/70 bg-muted/40 text-xs font-heading font-bold uppercase text-muted-foreground">
                <th className="py-3 px-4">
                  {locale === "vi"
                    ? "Nguồn rơi đạo cụ (activity_drop)"
                    : "Drop Source (activity_drop)"}
                </th>
                <th className="py-3 px-4">
                  {locale === "vi" ? "Tỷ lệ rơi" : "Drop Rate"}
                </th>
                <th className="py-3 px-4">
                  {locale === "vi"
                    ? "Trần giới hạn ẩn / Ngày"
                    : "Daily Hidden Cap"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {sixTables.table3ShopAndDrops.dropSources.map((drop, idx) => (
                <tr key={idx}>
                  <td className="py-3 px-4 font-semibold text-foreground">
                    {drop.sourceName[locale]}
                  </td>
                  <td className="py-3 px-4 text-foreground/90">
                    {drop.dropRate[locale]}
                  </td>
                  <td className="py-3 px-4 font-medium text-amber-600 dark:text-amber-400">
                    {drop.dailyHiddenCap[locale]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Shop Items Table */}
        <div className="overflow-x-auto rounded-2xl border border-border/70">
          <table className="w-full text-left border-collapse text-sm sm:text-base">
            <thead>
              <tr className="border-b border-border/70 bg-muted/40 text-xs font-heading font-bold uppercase text-muted-foreground">
                <th className="py-3 px-4">
                  {locale === "vi"
                    ? "Vật phẩm Shop (active_shop)"
                    : "Shop Item (active_shop)"}
                </th>
                <th className="py-3 px-4">
                  {locale === "vi" ? "Ưu tiên" : "Tier"}
                </th>
                <th className="py-3 px-4">
                  {locale === "vi" ? "Giá đổi & Giới hạn" : "Cost & Cap"}
                </th>
                <th className="py-3 px-4">
                  {locale === "vi" ? "Đánh giá thực chiến" : "Verdict"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {sixTables.table3ShopAndDrops.shopItems.map((item) => (
                <tr key={item.id}>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <GameAssetFrame
                        src={item.iconPath}
                        alt={item.itemName[locale]}
                        size="sm"
                        rarity={item.rarity}
                      />
                      <span className="font-semibold text-foreground">
                        {item.itemName[locale]}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Badge
                      variant="outline"
                      className={cn(
                        "font-mono text-xs font-bold",
                        item.priorityTier === "S"
                          ? "border-emerald-500/40 text-emerald-600 dark:text-emerald-400"
                          : item.priorityTier === "A"
                          ? "border-amber-500/40 text-amber-600 dark:text-amber-400"
                          : "border-rose-500/40 text-rose-600 dark:text-rose-400"
                      )}
                    >
                      Tier {item.priorityTier}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-foreground/90">
                    {item.cost[locale]}
                  </td>
                  <td className="py-3 px-4 text-foreground/90">
                    {item.verdict[locale]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ====================================================================
          SECTION 5.4 — BẢNG 4: GÓI NẠP & PHẦN THƯỞNG (PHÂN TÍCH ROI)
      ==================================================================== */}
      <section
        id="sec-5-4"
        data-testid="flat-section-5.4"
        className="scroll-mt-44 py-5 border-b border-border/50 space-y-4"
      >
        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-7 items-center justify-center rounded-lg border border-amber-500/30 bg-amber-500/10 px-2 font-mono text-xs font-bold text-amber-600 dark:text-amber-400">
            5.4
          </span>
          <Coins className="h-5 w-5 text-amber-500 shrink-0" />
          <h3 className="font-heading font-bold text-lg sm:text-xl text-foreground">
            {locale === "vi"
              ? "Bảng 4 — Gói nạp & Phần thưởng (Phân tích ROI: exchange & exchange_payid)"
              : "Table 4 — Pack ROI Breakdown & Hidden Cross-Event Bundles"}
          </h3>
        </div>

        <div className="space-y-1 text-sm sm:text-base">
          <p className="text-foreground/90">
            <strong className="text-amber-600 dark:text-amber-400">
              {locale === "vi" ? "Chiến lược mua sớm: " : "Pre-Buy Strategy: "}
            </strong>
            {sixTables.table4PacksAndRoi.preBuyNote[locale]}
          </p>
          <p className="text-foreground/90">
            <strong className="text-amber-600 dark:text-amber-400">
              {locale === "vi" ? "Trần Kim Cương: " : "Diamond Ceiling: "}
            </strong>
            {sixTables.table4PacksAndRoi.diamondCeiling[locale]}
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-border/70">
          <table className="w-full text-left border-collapse text-sm sm:text-base">
            <thead>
              <tr className="border-b border-border/70 bg-muted/40 text-xs font-heading font-bold uppercase text-muted-foreground">
                <th className="py-3 px-4">
                  {locale === "vi" ? "Tên gói nạp" : "Pack Name"}
                </th>
                <th className="py-3 px-4">
                  {locale === "vi" ? "Giá & Giới hạn" : "Price & Limit"}
                </th>
                <th className="py-3 px-4">
                  {locale === "vi" ? "Vật phẩm nhận được" : "Pack Contents"}
                </th>
                <th className="py-3 px-4">
                  {locale === "vi" ? "Xếp hạng ROI" : "ROI Rating"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {sixTables.table4PacksAndRoi.packs.map((pack) => (
                <tr key={pack.packId}>
                  <td className="py-3 px-4">
                    <div className="space-y-1">
                      <div className="font-semibold text-foreground">
                        {pack.packName[locale]}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {pack.isBestValue && (
                          <Badge
                            variant="outline"
                            className="text-xs border-emerald-500/40 text-emerald-600 dark:text-emerald-400"
                          >
                            {locale === "vi" ? "Rẻ & Lời Nhất" : "Best Value"}
                          </Badge>
                        )}
                        {pack.isHiddenCrossEvent && (
                          <Badge
                            variant="outline"
                            className="text-xs border-amber-500/40 text-amber-600 dark:text-amber-400"
                          >
                            {locale === "vi"
                              ? "Gói Ẩn Liên Thông"
                              : "Hidden Cross-Event"}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-mono text-xs sm:text-sm font-bold text-amber-600 dark:text-amber-400">
                      {pack.priceUsdVnd[locale]}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {pack.purchaseLimit[locale]}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-foreground/90">
                    {pack.contentsSummary[locale]}
                  </td>
                  <td className="py-3 px-4 font-semibold text-foreground">
                    {pack.roiRating[locale]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ====================================================================
          SECTION 5.5 — CHUYÊN MỤC 5: KẾ HOẠCH TÍCH TRỮ & CHUẨN BỊ TỪ SỚM
      ==================================================================== */}
      <section
        id="sec-5-5"
        data-testid="flat-section-5.5"
        className="scroll-mt-44 py-5 border-b border-border/50 space-y-4"
      >
        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-7 items-center justify-center rounded-lg border border-amber-500/30 bg-amber-500/10 px-2 font-mono text-xs font-bold text-amber-600 dark:text-amber-400">
            5.5
          </span>
          <PackageCheck className="h-5 w-5 text-amber-500 shrink-0" />
          <h3 className="font-heading font-bold text-lg sm:text-xl text-foreground">
            {locale === "vi"
              ? "Chuyên mục 5 — Kế hoạch Tích trữ & Chuẩn bị từ sớm (Ngắn hạn & Dài hạn 1–3 tuần)"
              : "Section 5 — Short-Term & Long-Term (1–3 Weeks) Hoarding Plan"}
          </h3>
        </div>

        {/* Short-Term Hoarding Targets */}
        <div className="overflow-x-auto rounded-2xl border border-border/70">
          <table className="w-full text-left border-collapse text-sm sm:text-base">
            <thead>
              <tr className="border-b border-border/70 bg-muted/40 text-xs font-heading font-bold uppercase text-muted-foreground">
                <th className="py-3 px-4">
                  {locale === "vi"
                    ? "Đạo cụ cần tích trữ"
                    : "Target Hoarding Item"}
                </th>
                <th className="py-3 px-4">
                  {locale === "vi" ? "Định mức mục tiêu" : "Target Quota"}
                </th>
                <th className="py-3 px-4">
                  {locale === "vi" ? "Kỷ luật đóng băng" : "Freeze Window"}
                </th>
                <th className="py-3 px-4">
                  {locale === "vi" ? "Thời điểm xả kho" : "Dump Timing"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {sixTables.section5HoardingPlan.shortTermTargets.map((item) => (
                <tr key={item.id}>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <GameAssetFrame
                        src={item.iconPath}
                        alt={item.name[locale]}
                        size="sm"
                        rarity={item.rarity}
                      />
                      <span className="font-semibold text-foreground">
                        {item.name[locale]}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono text-xs sm:text-sm font-bold text-amber-600 dark:text-amber-400">
                    {item.targetAmount[locale]}
                  </td>
                  <td className="py-3 px-4 text-foreground/90">
                    {item.freezeWindow[locale]}
                  </td>
                  <td className="py-3 px-4 text-foreground/90">
                    {item.dumpTiming[locale]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Long-Term 1-3 Week Roadmap */}
        <div className="overflow-x-auto rounded-2xl border border-border/70">
          <table className="w-full text-left border-collapse text-sm sm:text-base">
            <thead>
              <tr className="border-b border-border/70 bg-muted/40 text-xs font-heading font-bold uppercase text-muted-foreground">
                <th className="py-3 px-4">
                  {locale === "vi"
                    ? "Khung chuẩn bị dài hạn"
                    : "Long-Term Horizon"}
                </th>
                <th className="py-3 px-4">
                  {locale === "vi" ? "Định mức tích lũy" : "Quota"}
                </th>
                <th className="py-3 px-4">
                  {locale === "vi"
                    ? "Lý do chiến thuật (Nhịn tuần thường dồn tuần x2 / GAR)"
                    : "Strategic Rationale"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {sixTables.section5HoardingPlan.longTermRoadmap.map((step, idx) => (
                <tr key={idx}>
                  <td className="py-3 px-4 font-semibold text-foreground">
                    {step.horizonLabel[locale]}
                  </td>
                  <td className="py-3 px-4 font-mono text-xs sm:text-sm font-bold text-amber-600 dark:text-amber-400">
                    {step.targetQuota[locale]}
                  </td>
                  <td className="py-3 px-4 text-foreground/90">
                    {step.rationale[locale]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ====================================================================
          SECTION 5.6 — CHUYÊN MỤC 6: MẸO & KỸ THUẬT CAO THỦ CHUYÊN NGHIỆP
      ==================================================================== */}
      <section
        id="sec-5-6"
        data-testid="flat-section-5.6"
        className="scroll-mt-44 py-5 space-y-5"
      >
        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-7 items-center justify-center rounded-lg border border-amber-500/30 bg-amber-500/10 px-2 font-mono text-xs font-bold text-amber-600 dark:text-amber-400">
            5.6
          </span>
          <Wrench className="h-5 w-5 text-amber-500 shrink-0" />
          <h3 className="font-heading font-bold text-lg sm:text-xl text-foreground">
            {locale === "vi"
              ? "Chuyên mục 6 — Mẹo & Kỹ thuật Cao Thủ Chuyên Nghiệp (Pro-Player Mechanics & Pre-cooking Tricks)"
              : "Section 6 — Pro-Player Mechanics & Pre-cooking Tricks"}
          </h3>
        </div>

        <div className="divide-y divide-border/50">
          {sixTables.section6ProMechanics.map((mech) => (
            <div
              key={mech.mechanicId}
              data-testid={`flat-mechanic-${mech.mechanicId}`}
              className="py-4 first:pt-1 last:pb-1 space-y-2"
            >
              <div className="flex items-center gap-2">
                <Flame className="h-4 w-4 text-amber-500 shrink-0" />
                <h4 className="font-heading font-bold text-base sm:text-lg text-foreground">
                  {mech.title[locale]}
                </h4>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-amber-600 dark:text-amber-400">
                <Sparkles className="inline h-3.5 w-3.5 mr-1" />
                {mech.whenToApply[locale]}
              </p>
              <p className="text-sm sm:text-base text-foreground/90 leading-relaxed">
                {mech.stepByStep[locale]}
              </p>
              <p className="text-xs sm:text-sm font-medium text-rose-600 dark:text-rose-400">
                ⚠️ {mech.warningNote[locale]}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

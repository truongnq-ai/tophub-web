"use client";

import React, { useMemo, useState } from "react";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Coins,
  Flame,
  Layers,
  Package,
  ShieldAlert,
  Sparkles,
  Target,
} from "lucide-react";
import type {
  EventPlaybookArticleCode,
  EventPlaybookRecord,
  EventSeasonTag,
  GuideArticle,
  GuideLocale,
} from "@/content/guides/types";
import {
  EVENT_PLAYBOOKS_DATA,
  filterPlaybooksBySeason,
} from "@/content/guides/event-playbooks-data";
import { GameAssetFrame } from "@/components/guides/media/game-asset-frame";
import { cn } from "@/lib/utils";

export interface EventPlaybookExplorerWidgetProps {
  readonly article?: GuideArticle;
  readonly locale?: GuideLocale;
}

type PlaybookTabId = "overview" | "hoarding" | "daily" | "economy";

const SEASONS: readonly EventSeasonTag[] = [
  "ALL",
  "S0",
  "S1",
  "S2",
  "S3",
  "S4",
] as const;

const DEFAULT_EVENT_BY_ARTICLE: Readonly<
  Record<EventPlaybookArticleCode, string>
> = {
  "9.1": "guild-arms-race",
  "9.2": "treasure-dice-storm-maiden",
  "9.3": "butterfly-catching",
};

function resolveArticleCode(code?: string): EventPlaybookArticleCode {
  if (code === "9.1" || code === "9.2" || code === "9.3") return code;
  return "9.1";
}

export function EventPlaybookExplorerWidget({
  article,
  locale = "vi",
}: EventPlaybookExplorerWidgetProps) {
  const articleCode = resolveArticleCode(article?.code);
  const [selectedSeason, setSelectedSeason] = useState<EventSeasonTag>("ALL");
  const [scopeFilter, setScopeFilter] = useState<"article" | "all">("all");
  const [selectedEventId, setSelectedEventId] = useState<string>(
    DEFAULT_EVENT_BY_ARTICLE[articleCode]
  );
  const [activeTab, setActiveTab] = useState<PlaybookTabId>("overview");
  const [activeDayIdx, setActiveDayIdx] = useState<number>(0);

  const visibleEvents = useMemo(() => {
    const seasonFiltered = filterPlaybooksBySeason(
      EVENT_PLAYBOOKS_DATA,
      selectedSeason
    );
    const scoped =
      scopeFilter === "article"
        ? seasonFiltered.filter((ev) => ev.articleCode === articleCode)
        : seasonFiltered;

    // Sort so events belonging to the current article appear first
    return [...scoped].sort((a, b) => {
      const aMatch = a.articleCode === articleCode ? 0 : 1;
      const bMatch = b.articleCode === articleCode ? 0 : 1;
      return aMatch - bMatch;
    });
  }, [selectedSeason, scopeFilter, articleCode]);

  const activeEvent: EventPlaybookRecord = useMemo(() => {
    const found = visibleEvents.find((ev) => ev.id === selectedEventId);
    if (found) return found;
    return visibleEvents[0] ?? EVENT_PLAYBOOKS_DATA[0];
  }, [visibleEvents, selectedEventId]);

  const activeDayStage =
    activeEvent.dailyStages[activeDayIdx] ?? activeEvent.dailyStages[0];

  const handleSelectEvent = (eventId: string) => {
    setSelectedEventId(eventId);
    setActiveDayIdx(0);
  };

  const handleSelectSeason = (season: EventSeasonTag) => {
    setSelectedSeason(season);
    setActiveDayIdx(0);
  };

  const tabs: readonly {
    readonly id: PlaybookTabId;
    readonly labelVi: string;
    readonly labelEn: string;
    readonly icon: React.ComponentType<{ className?: string }>;
  }[] = [
    {
      id: "overview",
      labelVi: "1. Tổng Quan & Luật Bảo Lưu",
      labelEn: "1. Overview & Carryover",
      icon: Layers,
    },
    {
      id: "hoarding",
      labelVi: "2. Cách Tích Đồ",
      labelEn: "2. Hoarding Checklist",
      icon: Package,
    },
    {
      id: "daily",
      labelVi: "3. Chi Tiết Từng Ngày",
      labelEn: "3. Day-by-Day Guide",
      icon: Calendar,
    },
    {
      id: "economy",
      labelVi: "4. Mua Sắm & Nạp Tối Ưu",
      labelEn: "4. Pre-Buy & Shop Tiers",
      icon: Coins,
    },
  ];

  return (
    <div
      data-testid="event-playbook-explorer-widget"
      className="my-6 rounded-2xl border border-amber-500/30 bg-card/95 p-4 sm:p-6 shadow-md"
    >
      {/* Top Header & Season Filter Bar */}
      <div className="flex flex-col gap-4 border-b border-border/70 pb-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-600 dark:text-amber-300">
            <Flame className="h-3.5 w-3.5" />
            <span>
              {locale === "vi"
                ? "BÀN ĐIỀU HÀNH CHIẾN THUẬT SỰ KIỆN (S0 ➔ GAR)"
                : "EVENT TACTICAL PLAYBOOK CONSOLE (S0 ➔ GAR)"}
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-foreground">
            {locale === "vi"
              ? "Tra Cứu 4 Chiều: Tổng Quan • Tích Trữ • Từng Ngày • Nạp & Đổi Shop"
              : "4-Tab Event Playbook Explorer: Overview • Hoarding • Daily • Economy"}
          </h3>
        </div>

        {/* Season Filter & Scope Filter */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="mr-1 text-xs font-medium text-muted-foreground">
            {locale === "vi" ? "Mùa giải:" : "Season:"}
          </span>
          {SEASONS.map((season) => {
            const isSelected = selectedSeason === season;
            return (
              <button
                key={season}
                type="button"
                data-testid={`playbook-season-filter-${season}`}
                onClick={() => handleSelectSeason(season)}
                className={cn(
                  "rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors",
                  isSelected
                    ? "bg-amber-500 text-slate-950 shadow-xs"
                    : "border border-border/70 bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {season === "ALL"
                  ? locale === "vi"
                    ? "Tất Cả"
                    : "All"
                  : season}
              </button>
            );
          })}
          <button
            type="button"
            data-testid="playbook-scope-toggle"
            onClick={() =>
              setScopeFilter((prev) => (prev === "all" ? "article" : "all"))
            }
            className="ml-1 rounded-lg border border-sky-500/40 bg-sky-500/10 px-2.5 py-1 text-xs font-semibold text-sky-600 dark:text-sky-300 hover:bg-sky-500/20"
          >
            {scopeFilter === "all"
              ? locale === "vi"
                ? "Đang hiện: 10 Sự Kiện S0➔GAR"
                : "Showing: All 10 S0➔GAR Events"
              : locale === "vi"
                ? `Đang lọc: Nhóm Bài ${articleCode}`
                : `Filtered: Article ${articleCode}`}
          </button>
        </div>
      </div>

      {/* Event Selector Pills */}
      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>
            {locale === "vi"
              ? "Chọn sự kiện để xem cẩm nang tác chiến chi tiết:"
              : "Select an event to inspect its full tactical playbook:"}
          </span>
          <span className="font-medium text-amber-600 dark:text-amber-300">
            {visibleEvents.length}{" "}
            {locale === "vi" ? "sự kiện khả dụng" : "events available"}
          </span>
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {visibleEvents.map((ev) => {
            const isSelected = ev.id === activeEvent.id;
            const isCurrentArticle = ev.articleCode === articleCode;
            return (
              <button
                key={ev.id}
                type="button"
                data-testid={`playbook-event-pill-${ev.id}`}
                onClick={() => handleSelectEvent(ev.id)}
                className={cn(
                  "flex items-center gap-2.5 rounded-xl border p-2.5 text-left transition-all",
                  isSelected
                    ? "border-amber-500 bg-amber-500/15 ring-1 ring-amber-500/50"
                    : "border-border/70 bg-muted/30 hover:border-amber-500/40 hover:bg-muted/60"
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
                  <div className="flex items-center gap-1">
                    <span className="truncate text-xs font-bold text-foreground">
                      {ev.name[locale]}
                    </span>
                  </div>
                  <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <span
                      className={cn(
                        "rounded px-1 py-0.2 font-semibold",
                        isCurrentArticle
                          ? "bg-amber-500/20 text-amber-700 dark:text-amber-300"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {ev.articleCode}
                    </span>
                    <span className="truncate">{ev.seasons.join("•")}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Event Banner Header */}
      <div className="mt-5 flex flex-col gap-3 rounded-xl border border-border/80 bg-muted/40 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3.5">
          <GameAssetFrame
            src={activeEvent.iconPath}
            alt={activeEvent.name[locale]}
            size="lg"
            rarity={activeEvent.rarity}
            faction={activeEvent.faction}
            showFactionBadge
          />
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-amber-500/20 px-2 py-0.5 text-xs font-bold text-amber-700 dark:text-amber-300">
                {activeEvent.cadenceBadge[locale]}
              </span>
              <span className="rounded-md bg-rose-500/15 px-2 py-0.5 text-xs font-semibold text-rose-600 dark:text-rose-300">
                {activeEvent.s0TimingBadge[locale]}
              </span>
            </div>
            <h4
              data-testid="playbook-active-event-title"
              className="mt-1 text-base sm:text-lg font-bold text-foreground"
            >
              {activeEvent.name[locale]}
            </h4>
          </div>
        </div>
      </div>

      {/* 4 Horizontal Navigation Tabs */}
      <div
        role="tablist"
        aria-label={
          locale === "vi" ? "Các chiều phân tích sự kiện" : "Event playbook tabs"
        }
        className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              data-testid={`playbook-tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-xs sm:text-sm font-bold transition-all",
                isSelected
                  ? "border-amber-500 bg-amber-500 text-slate-950 shadow-xs"
                  : "border-border/70 bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="truncate">
                {locale === "vi" ? tab.labelVi : tab.labelEn}
              </span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW & CARRYOVER RULES */}
      {activeTab === "overview" ? (
        <div
          data-testid="playbook-panel-overview"
          className="mt-4 grid grid-cols-1 gap-3.5 md:grid-cols-2"
        >
          <div className="rounded-xl border border-border/70 bg-background/80 p-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              <Sparkles className="h-4 w-4" />
              <span>
                {locale === "vi"
                  ? "Bản Chất & Vai Trò Chiến Lược"
                  : "Strategic Role & Summary"}
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-foreground/90">
              {activeEvent.overview.summary[locale]}
            </p>
          </div>

          <div className="rounded-xl border border-border/70 bg-background/80 p-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              <Clock className="h-4 w-4" />
              <span>
                {locale === "vi"
                  ? "Vòng Lặp Tính Điểm Cốt Lõi (Core Loop)"
                  : "Core Scoring Loop"}
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-foreground/90">
              {activeEvent.overview.coreLoop[locale]}
            </p>
          </div>

          <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
              <CheckCircle2 className="h-4 w-4" />
              <span>
                {locale === "vi"
                  ? "Quy Tắc Bảo Lưu Qua Các Kỳ (Carryover Law)"
                  : "Cross-Cycle Carryover Law"}
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-foreground/90">
              {activeEvent.overview.carryoverRule[locale]}
            </p>
          </div>

          <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 p-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-300">
              <ShieldAlert className="h-4 w-4" />
              <span>
                {locale === "vi"
                  ? "Kỷ Luật Vàng Chống Thọt (Golden Rule)"
                  : "Golden Anti-Brick Rule"}
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-foreground/90">
              {activeEvent.overview.goldenRule[locale]}
            </p>
          </div>
        </div>
      ) : null}

      {/* TAB 2: HOARDING CHECKLIST */}
      {activeTab === "hoarding" ? (
        <div data-testid="playbook-panel-hoarding" className="mt-4 space-y-3">
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2.5 text-xs sm:text-sm font-medium text-foreground">
            {locale === "vi"
              ? "Danh mục vật phẩm bắt buộc đóng băng trước sự kiện và thời điểm mở khóa xả kho tối ưu:"
              : "Mandatory inventory freeze targets ahead of the event and optimal dump windows:"}
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {activeEvent.hoardingItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-2.5 rounded-xl border border-border/80 bg-background/90 p-4"
              >
                <div className="flex items-center gap-3">
                  <GameAssetFrame
                    src={item.iconPath}
                    alt={item.name[locale]}
                    size="md"
                    rarity={item.rarity}
                  />
                  <div>
                    <h5 className="text-sm font-bold text-foreground">
                      {item.name[locale]}
                    </h5>
                    <span className="inline-block rounded bg-amber-500/20 px-2 py-0.5 text-xs font-semibold text-amber-700 dark:text-amber-300">
                      {locale === "vi" ? "Chỉ tiêu tích trữ: " : "Target: "}
                      {item.targetAmount[locale]}
                    </span>
                  </div>
                </div>
                <div className="space-y-1.5 border-t border-border/60 pt-2 text-xs sm:text-sm">
                  <p className="text-foreground/90">
                    <span className="font-bold text-rose-600 dark:text-rose-400">
                      {locale === "vi" ? "• Khung Đóng Băng: " : "• Freeze Window: "}
                    </span>
                    {item.freezeWindow[locale]}
                  </p>
                  <p className="text-foreground/90">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      {locale === "vi" ? "• Thời Điểm Xả: " : "• Dump Timing: "}
                    </span>
                    {item.dumpTiming[locale]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* TAB 3: DAY-BY-DAY INTERACTIVE SELECTOR */}
      {activeTab === "daily" ? (
        <div data-testid="playbook-panel-daily" className="mt-4 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground">
              {locale === "vi"
                ? "Chọn Ngày / Giai đoạn:"
                : "Select Day / Stage:"}
            </span>
            {activeEvent.dailyStages.map((stage, idx) => {
              const isSelected = idx === activeDayIdx;
              return (
                <button
                  key={stage.dayNumber}
                  type="button"
                  data-testid={`playbook-day-pill-${stage.dayNumber}`}
                  onClick={() => setActiveDayIdx(idx)}
                  className={cn(
                    "rounded-lg border px-3 py-1.5 text-xs font-bold transition-all",
                    isSelected
                      ? "border-amber-500 bg-amber-500 text-slate-950 shadow-xs"
                      : "border-border/70 bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {stage.label[locale]}
                </button>
              );
            })}
          </div>

          {activeDayStage ? (
            <div className="rounded-xl border border-amber-500/40 bg-background/95 p-4 sm:p-5 space-y-3">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-border/60 pb-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    {activeDayStage.label[locale]}
                  </span>
                  <h5 className="text-base sm:text-lg font-bold text-foreground">
                    {activeDayStage.theme[locale]}
                  </h5>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-lg border border-amber-500/40 bg-amber-500/15 px-3 py-1 text-xs font-bold text-amber-700 dark:text-amber-300">
                  <Clock className="h-3.5 w-3.5" />
                  <span>
                    {locale === "vi" ? "Giờ Vàng: " : "Golden Window: "}
                    {activeDayStage.goldenWindow[locale]}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                <div className="rounded-lg border border-border/70 bg-muted/30 p-3">
                  <div className="text-xs font-bold text-sky-600 dark:text-sky-400">
                    {locale === "vi"
                      ? "Nguồn Tính Điểm Chính"
                      : "Primary Scoring Actions"}
                  </div>
                  <p className="mt-1 text-xs sm:text-sm leading-relaxed text-foreground/90">
                    {activeDayStage.primaryScoring[locale]}
                  </p>
                </div>

                <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3">
                  <div className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                    {locale === "vi"
                      ? "Mẹo Tác Chiến (Pro Tip)"
                      : "Tactical Pro Tip"}
                  </div>
                  <p className="mt-1 text-xs sm:text-sm leading-relaxed text-foreground/90">
                    {activeDayStage.proTip[locale]}
                  </p>
                </div>

                <div className="rounded-lg border border-purple-500/30 bg-purple-500/10 p-3">
                  <div className="text-xs font-bold text-purple-700 dark:text-purple-300">
                    {locale === "vi"
                      ? "Khớp Lệnh Ăn Điểm Kép (Double-Dip)"
                      : "Double-Dip Synergy Target"}
                  </div>
                  <p className="mt-1 text-xs sm:text-sm leading-relaxed text-foreground/90">
                    {activeDayStage.doubleDipTarget[locale]}
                  </p>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

      {/* TAB 4: PRE-BUY STRATEGY, 3-TIER BUDGET MATRIX & SHOP TIER LIST */}
      {activeTab === "economy" ? (
        <div data-testid="playbook-panel-economy" className="mt-4 space-y-5">
          {/* Pre-Buy Strategy & Diamond Ceiling */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
                <Target className="h-4 w-4" />
                <span>
                  {locale === "vi"
                    ? "Chiến Thuật Nạp Trước / Mua Trước (Pre-Buy Strategy)"
                    : "Pre-Buy & Pack Stacking Strategy"}
                </span>
              </div>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-foreground/90">
                {activeEvent.economy.preBuyStrategy[locale]}
              </p>
            </div>

            <div className="rounded-xl border border-sky-500/40 bg-sky-500/10 p-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-700 dark:text-sky-300">
                <Coins className="h-4 w-4" />
                <span>
                  {locale === "vi"
                    ? "Trần Tiêu Kim Cương Cho Phép (Diamond Ceiling)"
                    : "Allowed Diamond Ceiling"}
                </span>
              </div>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-foreground/90">
                {activeEvent.economy.diamondCeiling[locale]}
              </p>
            </div>
          </div>

          {/* 3-Tier Budget Matrix */}
          <div>
            <h5 className="mb-2.5 text-sm font-bold text-foreground">
              {locale === "vi"
                ? "Ma Trận Kinh Tế 3 Tầng Ngân Sách (F2P • Low-Mid Spender • Whale)"
                : "3-Tier Budget Execution Matrix (F2P • Low-Mid Spender • Whale)"}
            </h5>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {activeEvent.economy.budgetTiers.map((bTier) => (
                <div
                  key={bTier.tierId}
                  className="flex flex-col justify-between rounded-xl border border-border/80 bg-background/90 p-4"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-bold text-foreground">
                        {bTier.label[locale]}
                      </span>
                      <span className="rounded bg-muted px-2 py-0.5 text-xs font-semibold text-muted-foreground">
                        {bTier.budgetRange[locale]}
                      </span>
                    </div>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-foreground/90">
                      {bTier.strategy[locale]}
                    </p>
                  </div>
                  <div className="mt-3 border-t border-border/60 pt-2 text-xs font-semibold text-amber-600 dark:text-amber-300">
                    {locale === "vi" ? "Mục tiêu chốt: " : "Target Milestone: "}
                    {bTier.targetMilestone[locale]}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shop Tier List (S / A / F) */}
          <div>
            <h5 className="mb-2.5 text-sm font-bold text-foreground">
              {locale === "vi"
                ? "Bảng Xếp Hạng Đổi Cửa Hàng Sự Kiện (Shop Tier List S / A / F)"
                : "Event Shop Exchange Priority Tier List (Tier S / A / F)"}
            </h5>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {activeEvent.economy.shopTierList.map((sItem) => {
                const badgeClass =
                  sItem.tier === "S"
                    ? "bg-rose-500/20 text-rose-700 dark:text-rose-300 border-rose-500/40"
                    : sItem.tier === "A"
                      ? "bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/40"
                      : "bg-slate-500/20 text-slate-700 dark:text-slate-300 border-slate-500/40";
                return (
                  <div
                    key={sItem.id}
                    className="flex flex-col gap-2 rounded-xl border border-border/80 bg-background/90 p-3.5"
                  >
                    <div className="flex items-center gap-3">
                      <GameAssetFrame
                        src={sItem.iconPath}
                        alt={sItem.itemName[locale]}
                        size="sm"
                        rarity={sItem.rarity}
                      />
                      <div className="min-w-0 flex-1">
                        <span
                          className={cn(
                            "inline-block rounded border px-1.5 py-0.5 text-[11px] font-bold",
                            badgeClass
                          )}
                        >
                          Tier {sItem.tier}
                        </span>
                        <div className="mt-0.5 truncate text-xs sm:text-sm font-bold text-foreground">
                          {sItem.itemName[locale]}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {sItem.costAndCap[locale]}
                    </div>
                    <div className="text-xs font-medium text-foreground/90">
                      {sItem.verdict[locale]}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

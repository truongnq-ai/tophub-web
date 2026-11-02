"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  CalendarClock,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Coins,
  Flame,
  Layers,
  PackageCheck,
  Search,
  ShoppingBag,
  Sparkles,
  Wrench,
} from "lucide-react";
import {
  EVENT_CATALOG_PLAYBOOKS_DATA,
  filterCatalogEvents,
  paginateCatalogEvents,
} from "@/content/guides/event-playbooks-data";
import type {
  EventPlaybookRecord,
  EventServerStageId,
  GuideArticle,
  GuideLocale,
} from "@/content/guides/types";
import { GameAssetFrame } from "../media/game-asset-frame";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface EventEncyclopediaFlatViewProps {
  readonly article?: GuideArticle;
  readonly locale?: GuideLocale;
}

const STAGE_FILTERS: readonly {
  readonly id: EventServerStageId | "ALL";
  readonly label: { readonly vi: string; readonly en: string };
}[] = [
  {
    id: "ALL",
    label: {
      vi: "Tất cả (90)",
      en: "All Events (90)",
    },
  },
  {
    id: "stage_1",
    label: {
      vi: "GĐ 1: Tân thủ Ngày 1–39 (28)",
      en: "Stage 1: Days 1–39 (28)",
    },
  },
  {
    id: "stage_2",
    label: {
      vi: "GĐ 2: Chu kỳ Tuần & 10 Tuần (36)",
      en: "Stage 2: Weekly & 10-Week (36)",
    },
  },
  {
    id: "stage_3",
    label: {
      vi: "GĐ 3: Mùa S1–S3 & Lễ Hội (26)",
      en: "Stage 3: S1–S3 & Festivals (26)",
    },
  },
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
      vi: "1. Thời gian & Thể lệ",
      en: "1. Schedule & Rules",
    },
  },
  {
    code: "5.2",
    anchorId: "sec-5-2",
    label: {
      vi: "2. Nhiệm vụ & Mốc điểm",
      en: "2. Missions & Milestones",
    },
  },
  {
    code: "5.3",
    anchorId: "sec-5-3",
    label: {
      vi: "3. Cửa hàng & Vật phẩm rơi",
      en: "3. Shop & Item Drops",
    },
  },
  {
    code: "5.4",
    anchorId: "sec-5-4",
    label: {
      vi: "4. Gói nạp & Phân tích ROI",
      en: "4. Packs & ROI Analysis",
    },
  },
  {
    code: "5.5",
    anchorId: "sec-5-5",
    label: {
      vi: "5. Kế hoạch tích trữ",
      en: "5. Hoarding Plan",
    },
  },
  {
    code: "5.6",
    anchorId: "sec-5-6",
    label: {
      vi: "6. Mẹo thực hiện",
      en: "6. Execution Tips",
    },
  },
];

export function EventEncyclopediaFlatView({
  article,
  locale = "vi",
}: EventEncyclopediaFlatViewProps): React.ReactElement | null {
  const [selectedStage, setSelectedStage] = useState<
    EventServerStageId | "ALL"
  >("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedEventId, setSelectedEventId] = useState<string>("top-lord");
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [activeSectionCode, setActiveSectionCode] = useState<string>(
    article?.code?.startsWith("5.") ? article.code : "5.1"
  );

  // Sync from URL `?event=<id>` / `?stage=<stage>` and custom sidebar event `tophub:select-event`
  useEffect(() => {
    if (typeof window === "undefined") return;

    const applyTargetEvent = (targetId: string): void => {
      const idx = EVENT_CATALOG_PLAYBOOKS_DATA.findIndex(
        (ev) => ev.id === targetId
      );
      if (idx !== -1) {
        setSelectedStage("ALL");
        setSearchQuery("");
        setSelectedEventId(targetId);
        setSelectedDay(1);
        setCurrentPage(Math.floor(idx / 10) + 1);
      }
    };

    const syncFromLocation = (): void => {
      const params = new URLSearchParams(window.location.search);
      const initialEvent = params.get("event");
      const initialStage = params.get("stage");
      if (initialEvent) {
        applyTargetEvent(initialEvent);
      } else if (
        initialStage === "stage_1" ||
        initialStage === "stage_2" ||
        initialStage === "stage_3"
      ) {
        setSelectedStage(initialStage);
        setCurrentPage(1);
        const stageEvents = filterCatalogEvents(
          EVENT_CATALOG_PLAYBOOKS_DATA,
          initialStage,
          ""
        );
        if (stageEvents[0]) {
          setSelectedEventId(stageEvents[0].id);
          setSelectedDay(1);
        }
      }
    };

    syncFromLocation();

    const handleCustomEvent = (e: Event): void => {
      const custom = e as CustomEvent<{ eventId?: string }>;
      const targetId = custom.detail?.eventId;
      if (targetId) {
        applyTargetEvent(targetId);
      }
    };

    window.addEventListener("tophub:select-event", handleCustomEvent);
    window.addEventListener("popstate", syncFromLocation);
    return () => {
      window.removeEventListener("tophub:select-event", handleCustomEvent);
      window.removeEventListener("popstate", syncFromLocation);
    };
  }, []);

  const filteredEvents = useMemo(
    () =>
      filterCatalogEvents(
        EVENT_CATALOG_PLAYBOOKS_DATA,
        selectedStage,
        searchQuery
      ),
    [selectedStage, searchQuery]
  );

  const paginated = useMemo(
    () => paginateCatalogEvents(filteredEvents, currentPage, 10),
    [filteredEvents, currentPage]
  );

  const activeEvent: EventPlaybookRecord = useMemo(() => {
    const found = EVENT_CATALOG_PLAYBOOKS_DATA.find(
      (item) => item.id === selectedEventId
    );
    return found ?? filteredEvents[0] ?? EVENT_CATALOG_PLAYBOOKS_DATA[0];
  }, [filteredEvents, selectedEventId]);

  const sixTables = activeEvent.sixTables;
  if (!sixTables) return null;

  const activeDayStage =
    activeEvent.dailyStages.find((d) => d.dayNumber === selectedDay) ??
    activeEvent.dailyStages[0];

  const handleSelectStage = (stage: EventServerStageId | "ALL"): void => {
    setSelectedStage(stage);
    setCurrentPage(1);
  };

  const handleSelectEvent = (eventId: string): void => {
    setSelectedEventId(eventId);
    setSelectedDay(1);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("event", eventId);
      window.history.replaceState({}, "", url.toString());
    }
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
      {/* ====================================================================
          PAGINATED 2×5 EVENT CATALOG (MAX 10 EVENTS / PAGE)
      ==================================================================== */}
      <div
        data-testid="flat-event-selector-bar"
        className="rounded-2xl border border-border/70 bg-card/40 p-4 space-y-4"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Server Stage Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {STAGE_FILTERS.map((stage) => {
              const isSelected = selectedStage === stage.id;
              return (
                <button
                  key={stage.id}
                  type="button"
                  data-testid={`catalog-stage-tab-${stage.id}`}
                  onClick={() => handleSelectStage(stage.id)}
                  className={cn(
                    "inline-flex items-center justify-center min-h-[44px] px-3 py-1.5 rounded-xl border text-xs font-heading font-bold transition-colors cursor-pointer",
                    isSelected
                      ? "border-amber-500 bg-amber-500 text-slate-950"
                      : "border-border/70 bg-background/70 text-muted-foreground hover:text-foreground hover:border-amber-500/40"
                  )}
                >
                  {stage.label[locale]}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[220px] sm:w-72">
            <Search className="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              data-testid="catalog-event-search-input"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder={
                locale === "vi"
                  ? "Tìm kiếm tên sự kiện..."
                  : "Search event name..."
              }
              className="w-full min-h-[44px] pl-9 pr-3 py-2 rounded-xl border border-border/70 bg-background text-base sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* 2 Rows × 5 Columns Event Grid (Max 10 Cards Per Page) */}
        <div
          data-testid="event-catalog-grid-2x5"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
        >
          {paginated.items.map((ev) => {
            const isSelected = ev.id === activeEvent.id;
            return (
              <button
                key={ev.id}
                type="button"
                data-testid={`catalog-event-card-${ev.id}`}
                onClick={() => handleSelectEvent(ev.id)}
                className={cn(
                  "min-h-[116px] rounded-2xl border p-3 text-center flex flex-col items-center justify-between gap-2 transition-all cursor-pointer",
                  isSelected
                    ? "border-amber-500 bg-amber-500/15 text-foreground shadow-sm"
                    : "border-border/70 bg-background/80 text-muted-foreground hover:text-foreground hover:border-amber-500/40"
                )}
              >
                <GameAssetFrame
                  src={ev.iconPath}
                  alt={ev.name[locale]}
                  size="md"
                  rarity={ev.rarity}
                  faction={ev.faction}
                />
                <div className="w-full space-y-1">
                  <div className="font-heading font-bold text-xs sm:text-sm text-foreground line-clamp-2 leading-snug">
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

        {/* Pagination Controls (10 Events / Page) */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-border/50">
          <span className="text-xs font-mono font-semibold text-muted-foreground">
            {locale === "vi"
              ? `Hiển thị ${paginated.items.length} / ${paginated.totalItems} sự kiện (Trang ${paginated.currentPage}/${paginated.totalPages})`
              : `Showing ${paginated.items.length} / ${paginated.totalItems} events (Page ${paginated.currentPage}/${paginated.totalPages})`}
          </span>

          <div className="flex flex-wrap items-center gap-1">
            <button
              type="button"
              disabled={paginated.currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="inline-flex items-center justify-center min-h-[44px] px-2.5 rounded-xl border border-border/70 bg-background text-xs font-semibold text-foreground disabled:opacity-40 cursor-pointer"
              aria-label={locale === "vi" ? "Trang trước" : "Previous page"}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {Array.from({ length: paginated.totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <button
                  key={pageNum}
                  type="button"
                  data-testid={`catalog-page-btn-${pageNum}`}
                  onClick={() => setCurrentPage(pageNum)}
                  className={cn(
                    "inline-flex items-center justify-center min-h-[44px] min-w-[44px] px-2.5 rounded-xl border text-xs font-mono font-bold transition-colors cursor-pointer",
                    pageNum === paginated.currentPage
                      ? "border-amber-500 bg-amber-500 text-slate-950"
                      : "border-border/70 bg-background text-muted-foreground hover:text-foreground"
                  )}
                >
                  {pageNum}
                </button>
              )
            )}

            <button
              type="button"
              disabled={paginated.currentPage >= paginated.totalPages}
              onClick={() =>
                setCurrentPage((p) => Math.min(paginated.totalPages, p + 1))
              }
              className="inline-flex items-center justify-center min-h-[44px] px-2.5 rounded-xl border border-border/70 bg-background text-xs font-semibold text-foreground disabled:opacity-40 cursor-pointer"
              aria-label={locale === "vi" ? "Trang tiếp" : "Next page"}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* 6 Quick-Jump Section Pills (1 ➔ 6) */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
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

      {/* ACTIVE EVENT SUMMARY BANNER */}
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
          SECTION 1 — 1. THỜI GIAN & THỂ LỆ
      ==================================================================== */}
      <section
        id="sec-5-1"
        data-testid="flat-section-5.1"
        className="scroll-mt-44 py-5 border-b border-border/50 space-y-4"
      >
        <div className="flex items-center gap-2.5">
          <CalendarClock className="h-5 w-5 text-amber-500 shrink-0" />
          <h3 className="font-heading font-bold text-lg sm:text-xl text-foreground">
            {locale === "vi" ? "1. Thời gian & Thể lệ" : "1. Schedule & Rules"}
          </h3>
        </div>

        <ul className="space-y-2">
          {sixTables.table1TimelineRules.conciseBullets.map((bullet, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2.5 text-sm sm:text-base text-foreground/95 leading-relaxed"
            >
              <CheckCircle2 className="h-4 w-4 text-amber-500 shrink-0 mt-1" />
              <span>{bullet[locale]}</span>
            </li>
          ))}
        </ul>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs sm:text-sm">
          <div className="rounded-xl border border-border/70 bg-card/50 p-3 space-y-1">
            <div className="font-heading font-bold text-muted-foreground uppercase text-xs">
              {locale === "vi"
                ? "Khung mở Server (take_effect_time)"
                : "Server Launch Window (take_effect_time)"}
            </div>
            <div className="text-foreground/90 font-medium">
              {sixTables.table1TimelineRules.takeEffectTime[locale]}
            </div>
          </div>
          <div className="rounded-xl border border-border/70 bg-card/50 p-3 space-y-1">
            <div className="font-heading font-bold text-muted-foreground uppercase text-xs">
              {locale === "vi" ? "Điều kiện mở khóa" : "Unlock Conditions"}
            </div>
            <div className="text-foreground/90 font-medium">
              {sixTables.table1TimelineRules.unlockConditions[locale]}
            </div>
          </div>
        </div>

        <div
          data-testid="flat-takeaway-5.1"
          className="rounded-xl border border-amber-500/35 bg-amber-500/10 px-3.5 py-2.5 text-sm sm:text-base font-semibold text-foreground leading-relaxed"
        >
          {sixTables.table1TimelineRules.takeaway[locale]}
        </div>
      </section>

      {/* ====================================================================
          SECTION 2 — 2. NHIỆM VỤ & MỐC ĐIỂM
      ==================================================================== */}
      <section
        id="sec-5-2"
        data-testid="flat-section-5.2"
        className="scroll-mt-44 py-5 border-b border-border/50 space-y-4"
      >
        <div className="flex items-center gap-2.5">
          <Layers className="h-5 w-5 text-amber-500 shrink-0" />
          <h3 className="font-heading font-bold text-lg sm:text-xl text-foreground">
            {locale === "vi"
              ? "2. Nhiệm vụ & Mốc điểm"
              : "2. Missions & Milestones"}
          </h3>
        </div>

        <ul className="space-y-2">
          {sixTables.table2TasksAndMilestones.conciseBullets.map(
            (bullet, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-sm sm:text-base text-foreground/95 leading-relaxed"
              >
                <CheckCircle2 className="h-4 w-4 text-amber-500 shrink-0 mt-1" />
                <span>{bullet[locale]}</span>
              </li>
            )
          )}
          <li className="flex items-start gap-2.5 text-sm sm:text-base text-foreground/95 leading-relaxed">
            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-1" />
            <span>
              {sixTables.table2TasksAndMilestones.milestoneSummary[locale]}
            </span>
          </li>
        </ul>

        {activeEvent.dailyStages.length > 1 && (
          <div className="space-y-2.5">
            <div className="flex flex-wrap items-center gap-1.5">
              {activeEvent.dailyStages.map((stage) => {
                const isDaySelected =
                  stage.dayNumber === activeDayStage.dayNumber;
                return (
                  <button
                    key={stage.dayNumber}
                    type="button"
                    data-testid={`flat-day-pill-${stage.dayNumber}`}
                    onClick={() => setSelectedDay(stage.dayNumber)}
                    className={cn(
                      "inline-flex items-center gap-1.5 min-h-[40px] px-3 py-1 rounded-xl border text-xs font-heading font-bold transition-colors cursor-pointer",
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
              <div className="rounded-xl border border-border/70 bg-card/50 p-3 text-xs sm:text-sm space-y-1">
                <div className="font-heading font-bold text-amber-600 dark:text-amber-400">
                  {activeDayStage.label[locale]} — {activeDayStage.theme[locale]} (
                  {activeDayStage.goldenWindow[locale]})
                </div>
                <p className="text-foreground/90">
                  {activeDayStage.proTip[locale]}
                </p>
              </div>
            )}
          </div>
        )}

        <div className="overflow-x-auto rounded-2xl border border-border/70">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-border/70 bg-muted/40 text-xs font-heading font-bold uppercase text-muted-foreground">
                <th className="py-2.5 px-3.5">
                  {locale === "vi" ? "Cấp mốc điểm" : "Milestone Tier"}
                </th>
                <th className="py-2.5 px-3.5">
                  {locale === "vi" ? "Mục tiêu điểm" : "Target Threshold"}
                </th>
                <th className="py-2.5 px-3.5">
                  {locale === "vi" ? "Thưởng mốc chính" : "Milestone Rewards"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {sixTables.table2TasksAndMilestones.milestones.map((ms, idx) => (
                <tr key={idx}>
                  <td className="py-2.5 px-3.5 font-semibold text-foreground">
                    {ms.tierLabel[locale]}
                  </td>
                  <td className="py-2.5 px-3.5 font-mono font-bold text-amber-600 dark:text-amber-400">
                    {ms.pointsRequired[locale]}
                  </td>
                  <td className="py-2.5 px-3.5 text-foreground/90">
                    {ms.freeRewards[locale]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div
          data-testid="flat-takeaway-5.2"
          className="rounded-xl border border-amber-500/35 bg-amber-500/10 px-3.5 py-2.5 text-sm sm:text-base font-semibold text-foreground leading-relaxed"
        >
          {sixTables.table2TasksAndMilestones.takeaway[locale]}
        </div>
      </section>

      {/* ====================================================================
          SECTION 3 — 3. CỬA HÀNG & VẬT PHẨM RƠI
      ==================================================================== */}
      <section
        id="sec-5-3"
        data-testid="flat-section-5.3"
        className="scroll-mt-44 py-5 border-b border-border/50 space-y-4"
      >
        <div className="flex items-center gap-2.5">
          <ShoppingBag className="h-5 w-5 text-amber-500 shrink-0" />
          <h3 className="font-heading font-bold text-lg sm:text-xl text-foreground">
            {locale === "vi"
              ? "3. Cửa hàng & Vật phẩm rơi"
              : "3. Shop & Item Drops"}
          </h3>
        </div>

        <p className="text-sm sm:text-base text-foreground/95 leading-relaxed">
          • {sixTables.table3ShopAndDrops.dropSummary[locale]}
        </p>

        <div
          data-testid="shop-tier-priority-summary"
          className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs sm:text-sm"
        >
          <div className="rounded-xl border border-emerald-500/35 bg-emerald-500/5 p-3">
            <p className="text-foreground/95 leading-relaxed">
              {sixTables.table3ShopAndDrops.tierSSummary[locale]}
            </p>
          </div>
          <div className="rounded-xl border border-amber-500/35 bg-amber-500/5 p-3">
            <p className="text-foreground/95 leading-relaxed">
              {sixTables.table3ShopAndDrops.tierASummary[locale]}
            </p>
          </div>
          <div className="rounded-xl border border-rose-500/35 bg-rose-500/5 p-3">
            <p className="text-foreground/95 leading-relaxed">
              {sixTables.table3ShopAndDrops.tierFSummary[locale]}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-border/70">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-border/70 bg-muted/40 text-xs font-heading font-bold uppercase text-muted-foreground">
                <th className="py-2.5 px-3.5">
                  {locale === "vi" ? "Vật phẩm cửa hàng" : "Shop Item"}
                </th>
                <th className="py-2.5 px-3.5">
                  {locale === "vi" ? "Ưu tiên" : "Tier"}
                </th>
                <th className="py-2.5 px-3.5">
                  {locale === "vi" ? "Giá đổi & Giới hạn" : "Cost & Cap"}
                </th>
                <th className="py-2.5 px-3.5">
                  {locale === "vi" ? "Đánh giá thực chiến" : "Verdict"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {sixTables.table3ShopAndDrops.shopItems.map((item) => (
                <tr key={item.id}>
                  <td className="py-2.5 px-3.5">
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
                  <td className="py-2.5 px-3.5">
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
                  <td className="py-2.5 px-3.5 text-foreground/90">
                    {item.cost[locale]}
                  </td>
                  <td className="py-2.5 px-3.5 text-foreground/90">
                    {item.verdict[locale]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div
          data-testid="flat-takeaway-5.3"
          className="rounded-xl border border-amber-500/35 bg-amber-500/10 px-3.5 py-2.5 text-sm sm:text-base font-semibold text-foreground leading-relaxed"
        >
          {sixTables.table3ShopAndDrops.takeaway[locale]}
        </div>
      </section>

      {/* ====================================================================
          SECTION 4 — 4. GÓI NẠP & PHÂN TÍCH ROI
      ==================================================================== */}
      <section
        id="sec-5-4"
        data-testid="flat-section-5.4"
        className="scroll-mt-44 py-5 border-b border-border/50 space-y-4"
      >
        <div className="flex items-center gap-2.5">
          <Coins className="h-5 w-5 text-amber-500 shrink-0" />
          <h3 className="font-heading font-bold text-lg sm:text-xl text-foreground">
            {locale === "vi"
              ? "4. Gói nạp & Phân tích ROI"
              : "4. Packs & ROI Analysis"}
          </h3>
        </div>

        <ul className="space-y-2">
          {sixTables.table4PacksAndRoi.conciseBullets.map((bullet, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2.5 text-sm sm:text-base text-foreground/95 leading-relaxed"
            >
              <CheckCircle2 className="h-4 w-4 text-amber-500 shrink-0 mt-1" />
              <span>{bullet[locale]}</span>
            </li>
          ))}
        </ul>

        <div className="overflow-x-auto rounded-2xl border border-border/70">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-border/70 bg-muted/40 text-xs font-heading font-bold uppercase text-muted-foreground">
                <th className="py-2.5 px-3.5">
                  {locale === "vi" ? "Tên gói nạp" : "Pack Name"}
                </th>
                <th className="py-2.5 px-3.5">
                  {locale === "vi" ? "Giá & Giới hạn" : "Price & Limit"}
                </th>
                <th className="py-2.5 px-3.5">
                  {locale === "vi" ? "Vật phẩm nhận được" : "Pack Contents"}
                </th>
                <th className="py-2.5 px-3.5">
                  {locale === "vi" ? "Xếp hạng ROI" : "ROI Rating"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {sixTables.table4PacksAndRoi.packs.map((pack) => (
                <tr key={pack.packId}>
                  <td className="py-2.5 px-3.5">
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
                  <td className="py-2.5 px-3.5">
                    <div className="font-mono text-xs sm:text-sm font-bold text-amber-600 dark:text-amber-400">
                      {pack.priceUsdVnd[locale]}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {pack.purchaseLimit[locale]}
                    </div>
                  </td>
                  <td className="py-2.5 px-3.5 text-foreground/90">
                    {pack.contentsSummary[locale]}
                  </td>
                  <td className="py-2.5 px-3.5 font-semibold text-foreground">
                    {pack.roiRating[locale]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div
          data-testid="flat-takeaway-5.4"
          className="rounded-xl border border-amber-500/35 bg-amber-500/10 px-3.5 py-2.5 text-sm sm:text-base font-semibold text-foreground leading-relaxed"
        >
          {sixTables.table4PacksAndRoi.takeaway[locale]}
        </div>
      </section>

      {/* ====================================================================
          SECTION 5 — 5. KẾ HOẠCH TÍCH TRỮ
      ==================================================================== */}
      <section
        id="sec-5-5"
        data-testid="flat-section-5.5"
        className="scroll-mt-44 py-5 border-b border-border/50 space-y-4"
      >
        <div className="flex items-center gap-2.5">
          <PackageCheck className="h-5 w-5 text-amber-500 shrink-0" />
          <h3 className="font-heading font-bold text-lg sm:text-xl text-foreground">
            {locale === "vi" ? "5. Kế hoạch tích trữ" : "5. Hoarding Plan"}
          </h3>
        </div>

        {/* Mandatory Business Rule: Pure-Recharge Budget Saving Advice */}
        {sixTables.section5HoardingPlan.rechargeSavingAdvice && (
          <div
            data-testid="pure-recharge-saving-advice"
            className="rounded-2xl border border-amber-500/40 bg-amber-500/10 p-4 text-sm sm:text-base text-foreground leading-relaxed"
          >
            {sixTables.section5HoardingPlan.rechargeSavingAdvice[locale]}
          </div>
        )}

        <ul className="space-y-2">
          <li className="flex items-start gap-2.5 text-sm sm:text-base text-foreground/95 leading-relaxed">
            <CheckCircle2 className="h-4 w-4 text-amber-500 shrink-0 mt-1" />
            <span>
              {sixTables.section5HoardingPlan.consumedSummary[locale]}
            </span>
          </li>
          <li className="flex items-start gap-2.5 text-sm sm:text-base text-foreground/95 leading-relaxed">
            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-1" />
            <span>
              {sixTables.section5HoardingPlan.hoardingQuotaSummary[locale]}
            </span>
          </li>
        </ul>

        {sixTables.section5HoardingPlan.shortTermTargets.length > 0 && (
          <div className="overflow-x-auto rounded-2xl border border-border/70">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-border/70 bg-muted/40 text-xs font-heading font-bold uppercase text-muted-foreground">
                  <th className="py-2.5 px-3.5">
                    {locale === "vi"
                      ? "Đạo cụ cần tích trữ"
                      : "Target Hoarding Item"}
                  </th>
                  <th className="py-2.5 px-3.5">
                    {locale === "vi" ? "Định mức mục tiêu" : "Target Quota"}
                  </th>
                  <th className="py-2.5 px-3.5">
                    {locale === "vi" ? "Thời điểm xả kho" : "Dump Timing"}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {sixTables.section5HoardingPlan.shortTermTargets.map((item) => (
                  <tr key={item.id}>
                    <td className="py-2.5 px-3.5">
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
                    <td className="py-2.5 px-3.5 font-mono text-xs sm:text-sm font-bold text-amber-600 dark:text-amber-400">
                      {item.targetAmount[locale]}
                    </td>
                    <td className="py-2.5 px-3.5 text-foreground/90">
                      {item.dumpTiming[locale]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div
          data-testid="flat-takeaway-5.5"
          className="rounded-xl border border-amber-500/35 bg-amber-500/10 px-3.5 py-2.5 text-sm sm:text-base font-semibold text-foreground leading-relaxed"
        >
          {sixTables.section5HoardingPlan.takeaway[locale]}
        </div>
      </section>

      {/* ====================================================================
          SECTION 6 — 6. MẸO THỰC HIỆN (2–3 MẸO CAO THỦ ĐẶC THÙ)
      ==================================================================== */}
      <section
        id="sec-5-6"
        data-testid="flat-section-5.6"
        className="scroll-mt-44 py-5 space-y-4"
      >
        <div className="flex items-center gap-2.5">
          <Wrench className="h-5 w-5 text-amber-500 shrink-0" />
          <h3 className="font-heading font-bold text-lg sm:text-xl text-foreground">
            {locale === "vi" ? "6. Mẹo thực hiện" : "6. Execution Tips"}
          </h3>
        </div>

        <div className="divide-y divide-border/50 rounded-2xl border border-border/70 bg-card/40 px-4">
          {sixTables.section6ProMechanics.map((mech) => (
            <div
              key={mech.mechanicId}
              data-testid={`flat-mechanic-${mech.mechanicId}`}
              className="py-3.5 space-y-1.5"
            >
              <div className="flex items-center gap-2">
                <Flame className="h-4 w-4 text-amber-500 shrink-0" />
                <h4 className="font-heading font-bold text-sm sm:text-base text-foreground">
                  {mech.title[locale]}
                </h4>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-amber-600 dark:text-amber-400">
                <Sparkles className="inline h-3.5 w-3.5 mr-1" />
                {mech.whenToApply[locale]}
              </p>
              <p className="text-sm sm:text-base text-foreground/95 leading-relaxed">
                {mech.stepByStep[locale]}
              </p>
              <p className="text-xs sm:text-sm font-medium text-rose-600 dark:text-rose-400">
                ⚠️ {mech.warningNote[locale]}
              </p>
            </div>
          ))}
        </div>

        <div
          data-testid="flat-takeaway-5.6"
          className="rounded-xl border border-amber-500/35 bg-amber-500/10 px-3.5 py-2.5 text-sm sm:text-base font-semibold text-foreground leading-relaxed"
        >
          {sixTables.section6Takeaway[locale]}
        </div>
      </section>
    </div>
  );
}

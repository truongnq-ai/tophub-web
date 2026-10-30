"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Clock,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Target,
  BarChart3,
  Stethoscope,
  Layers,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import type {
  GuideArticle,
  GuideCategory,
  GuideContentBlock,
  GuideLocale,
  GuideSection,
} from "@/content/guides/types";
import { CalloutBox } from "./blocks/callout-box";
import { ResponsiveDataTable } from "./blocks/responsive-data-table";
import { StepRoadmap } from "./blocks/step-roadmap";
import { TldrActionBox } from "./blocks/tldr-action-box";
import { VisualDiagramBlock } from "./blocks/visual-diagram-block";
import { InteractiveChecklistBlock } from "./blocks/interactive-checklist-block";
import { CaseStudyBlock } from "./blocks/case-study-block";
import { MediaSpotlightBlock } from "./blocks/media-spotlight-block";
import { RichGuideText } from "./blocks/rich-guide-text";
import { HeroEncyclopediaWidget } from "./widgets/hero-encyclopedia-widget";
import { BiweeklyCalendarWidget } from "./widgets/biweekly-calendar-widget";
import { MasterDataExplorerWidget } from "./widgets/master-data-explorer-widget";
import { AccountTrapsTriageWidget } from "./widgets/account-traps-triage-widget";
import { TacticalFormationBoardWidget } from "./widgets/tactical-formation-board-widget";
import { HordePivotStepperWidget } from "./widgets/horde-pivot-stepper-widget";
import { BlacksmithAnvilMatrixWidget } from "./widgets/blacksmith-anvil-matrix-widget";
import { ShopSafetyFloorWidget } from "./widgets/shop-safety-floor-widget";
import { EventPlaybookExplorerWidget } from "./widgets/event-playbook-explorer-widget";
import { EventEncyclopediaFlatView } from "./widgets/event-encyclopedia-flat-view";
import { ProContentGate } from "./pro-content-gate";
import { GuideCommentsSection } from "./guide-comments-section";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type ArticleViewTab = "core" | "data" | "action" | "all";

interface GuideArticleRendererProps {
  category?: GuideCategory;
  article: GuideArticle;
  prevArticle?: GuideArticle | null;
  nextArticle?: GuideArticle | null;
  locale?: GuideLocale;
}

const CONSOLIDATED_SUBSECTIONS_BY_SLUG: Record<string, ReadonlySet<string>> = {
  encyclopedia: new Set([
    "sub-2-1-league-heroes",
    "sub-2-2-horde-heroes",
    "sub-2-3-nature-heroes",
    "sub-2-4-economy-heroes-summary",
  ]),
  "master-data-tables": new Set([
    "sub-1-1-hero-star-and-skill-books-table",
    "sub-1-2-hero-awakening-cost-table",
    "sub-1-3-gear-enhancement-master-table",
    "sub-1-4-troop-tiers-unlock-table",
    "sub-4-1-faction-level-table",
    "sub-4-2-mythic-gear-and-uw-table",
    "sub-4-3-lord-gear-master-table",
    "sub-4-4-runes-master-table",
    "sub-4-5-pets-master-table",
    "sub-4-6-troop-skins-master-table",
    "sub-4-7-vip-master-table",
  ]),
  "top-10-account-traps": new Set([
    "sub-trap-1",
    "sub-trap-2",
    "sub-trap-3",
    "sub-trap-4",
    "sub-trap-5",
    "sub-trap-6",
    "sub-trap-7",
    "sub-trap-8",
    "sub-trap-9",
    "sub-trap-10",
  ]),
  "meta-lineups": new Set([
    "sub-1-1-league-starter-transition",
    "sub-1-2-league-endgame-pure",
    "sub-2-1-horde-hybrid-and-early",
    "sub-2-2-horde-endgame-5mythic",
    "sub-3-1-nature-transition",
    "sub-3-2-nature-endgame-pure",
  ]),
  "formation-and-counters": new Set(["sub-4-1-four-arena-swaps"]),
  "horde-pivot-roadmap": new Set(["sub-4-2-zero-loss-pivot-matrix"]),
  "golden-gear-sets": new Set([
    "sub-1-1-three-golden-sets-decoded-table",
    "sub-4-1-tank-bruiser-bis-table",
    "sub-4-2-carry-dps-bis-table",
    "sub-4-3-support-healer-control-bis-table",
  ]),
  "shops-tier-list": new Set([
    "sub-1-2-thirteen-shops-master-map",
    "sub-4-1-diamond-equivalent-roi-matrix",
  ]),
};

export function hasWidgetBlock(sec: GuideSection): boolean {
  const allBlocks = [
    ...(sec.blocks ?? []),
    ...(sec.subSections?.flatMap((sub) => sub.blocks ?? []) ?? []),
  ];
  return allBlocks.some((b) => b.type === "widget");
}

export function splitArticleTitle(rawTitle: string): {
  mainTitle: string;
  subTitle: string | null;
} {
  const match = rawTitle.match(/^(.*?)\s*\(([^()]+)\)\s*$/);
  if (match && match[1].trim().length > 0) {
    return {
      mainTitle: match[1].trim(),
      subTitle: match[2].trim(),
    };
  }
  return { mainTitle: rawTitle, subTitle: null };
}

export function classifySectionTab(
  sec: GuideSection,
  secIdx: number,
  isPro: boolean
): Exclude<ArticleViewTab, "all"> {
  const allBlocks = [
    ...(sec.blocks ?? []),
    ...(sec.subSections?.flatMap((sub) => sub.blocks ?? []) ?? []),
  ];

  const hasActionBlock = allBlocks.some(
    (b) => b.type === "case_study" || b.type === "checklist"
  );
  if (hasActionBlock || (!isPro && secIdx >= 2) || (isPro && secIdx >= 1)) {
    return "action";
  }

  const hasDataBlock = allBlocks.some(
    (b) => b.type === "table" || b.type === "widget"
  );
  if (isPro || (hasDataBlock && secIdx >= 2)) {
    return "data";
  }

  return "core";
}

function renderBlock(
  block: GuideContentBlock,
  locale: GuideLocale,
  idx: number,
  article: GuideArticle
) {
  switch (block.type) {
    case "paragraph":
      return (
        <RichGuideText
          key={idx}
          text={block.text[locale]}
          locale={locale}
          className="text-base text-foreground leading-relaxed font-sans"
        />
      );
    case "list":
      if (block.ordered) {
        return (
          <ol
            key={idx}
            className="list-decimal list-inside space-y-2 text-base text-foreground font-sans pl-1"
          >
            {block.items.map((item, i) => (
              <li key={i} className="leading-relaxed">
                <RichGuideText
                  text={item[locale]}
                  variant="inline"
                  locale={locale}
                />
              </li>
            ))}
          </ol>
        );
      }
      return (
        <ul
          key={idx}
          className="space-y-2 text-base text-foreground font-sans pl-1"
        >
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 leading-relaxed">
              <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
              <div className="min-w-0 flex-1">
                <RichGuideText text={item[locale]} locale={locale} />
              </div>
            </li>
          ))}
        </ul>
      );
    case "callout":
      return (
        <CalloutBox
          key={idx}
          variant={block.variant}
          title={block.title[locale]}
          content={block.content[locale]}
          locale={locale}
        />
      );
    case "table":
      return (
        <ResponsiveDataTable
          key={idx}
          caption={block.caption?.[locale]}
          headers={block.headers.map((h) => h[locale])}
          rows={block.rows.map((r) => r.map((c) => c[locale]))}
          footnote={block.footnote?.[locale]}
          locale={locale}
        />
      );
    case "roadmap":
      return (
        <StepRoadmap
          key={idx}
          locale={locale}
          steps={block.steps.map((s) => ({
            badge: s.badge[locale],
            title: s.title[locale],
            timing: s.timing[locale],
            description: s.description[locale],
          }))}
        />
      );
    case "visual_diagram":
      return <VisualDiagramBlock key={idx} block={block} locale={locale} />;
    case "checklist":
      return (
        <InteractiveChecklistBlock key={idx} block={block} locale={locale} />
      );
    case "case_study":
      return <CaseStudyBlock key={idx} block={block} locale={locale} />;
    case "media_spotlight":
      return <MediaSpotlightBlock key={idx} block={block} locale={locale} />;
    case "widget":
      switch (block.widgetType) {
        case "hero_encyclopedia":
          return (
            <HeroEncyclopediaWidget
              key={idx}
              article={article}
              locale={locale}
            />
          );
        case "biweekly_event_calendar":
          return (
            <BiweeklyCalendarWidget
              key={idx}
              article={article}
              locale={locale}
            />
          );
        case "master_data_tables":
          return (
            <MasterDataExplorerWidget
              key={idx}
              article={article}
              locale={locale}
            />
          );
        case "account_traps_triage":
          return (
            <AccountTrapsTriageWidget
              key={idx}
              article={article}
              locale={locale}
            />
          );
        case "tactical_formation_board":
          return (
            <TacticalFormationBoardWidget
              key={idx}
              article={article}
              locale={locale}
            />
          );
        case "horde_pivot_stepper":
          return (
            <HordePivotStepperWidget
              key={idx}
              article={article}
              locale={locale}
            />
          );
        case "blacksmith_anvil_matrix":
          return (
            <BlacksmithAnvilMatrixWidget
              key={idx}
              article={article}
              locale={locale}
            />
          );
        case "shop_safety_floor_explorer":
          return (
            <ShopSafetyFloorWidget
              key={idx}
              article={article}
              locale={locale}
            />
          );
        case "event_playbook_explorer":
          return (
            <EventPlaybookExplorerWidget
              key={idx}
              article={article}
              locale={locale}
            />
          );
        default:
          return null;
      }
  }
}

export function parseSectionHeading(
  rawTitle: string,
  fallbackBadge: string
): { badge: string; cleanTitle: string } {
  const trimmed = rawTitle.trim();
  const subMatch = trimmed.match(/^(\d+\.\d+)\.?\s+(.+)$/);
  if (subMatch) {
    return {
      badge: subMatch[1],
      cleanTitle: subMatch[2].trim(),
    };
  }
  const secMatch = trimmed.match(/^(\d+)\.?\s+(.+)$/);
  if (secMatch) {
    const num = Number.parseInt(secMatch[1], 10);
    const formatted =
      Number.isFinite(num) && num < 10 ? `0${num}` : String(secMatch[1]);
    return {
      badge: formatted,
      cleanTitle: secMatch[2].trim(),
    };
  }
  return {
    badge: fallbackBadge,
    cleanTitle: trimmed,
  };
}

function renderSection(
  section: GuideSection,
  locale: GuideLocale,
  isHidden: boolean,
  article: GuideArticle,
  sectionNumber: number
) {
  const consolidatedSet = CONSOLIDATED_SUBSECTIONS_BY_SLUG[article.slug];
  const visibleSubSections =
    section.subSections?.filter((sub) => !consolidatedSet?.has(sub.id)) ?? [];

  const fallbackH2Badge =
    sectionNumber < 10 ? `0${sectionNumber}` : String(sectionNumber);
  const { badge: h2Badge, cleanTitle: h2CleanTitle } = parseSectionHeading(
    section.title[locale],
    fallbackH2Badge
  );

  return (
    <div
      key={section.id}
      id={section.id}
      data-tab-hidden={isHidden ? "true" : "false"}
      className={cn(
        "scroll-mt-28 py-6 border-b border-border/50 last:border-b-0 space-y-5",
        isHidden && "hidden"
      )}
    >
      <div className="flex items-center gap-3 border-b border-border/60 pb-3">
        <span
          data-testid="section-index-badge"
          className="inline-flex h-7 min-w-[28px] shrink-0 items-center justify-center rounded-lg border border-amber-500/30 bg-amber-500/10 px-2 font-mono text-xs font-bold text-amber-600 dark:text-amber-400"
        >
          {h2Badge}
        </span>
        <h2 className="font-heading font-bold text-lg sm:text-xl text-foreground leading-snug">
          <RichGuideText
            text={h2CleanTitle}
            variant="inline"
            locale={locale}
            disableEntityChips
          />
        </h2>
      </div>
      {section.blocks.length > 0 && (
        <div className="space-y-4">
          {section.blocks.map((block, idx) =>
            renderBlock(block, locale, idx, article)
          )}
        </div>
      )}
      {visibleSubSections.length > 0 && (
        <div className="space-y-5 sm:space-y-5 divide-y divide-border/40 sm:divide-y-0 pt-1">
          {visibleSubSections.map((sub, subIdx) => {
            const fallbackH3Badge = `${sectionNumber}.${subIdx + 1}`;
            const { badge: h3Badge, cleanTitle: h3CleanTitle } =
              parseSectionHeading(sub.title[locale], fallbackH3Badge);

            return (
              <div
                key={sub.id}
                id={sub.id}
                className="scroll-mt-28 border-0 bg-transparent p-0 pt-4 first:pt-0 sm:pt-5 sm:first:pt-0 space-y-3.5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/50 pb-2.5">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      data-testid="subsection-index-badge"
                      className="inline-flex h-6 shrink-0 items-center justify-center rounded-md border border-amber-500/25 bg-amber-500/10 px-2 font-mono text-xs font-bold text-amber-600 dark:text-amber-400"
                    >
                      {h3Badge}
                    </span>
                    <h3 className="font-heading font-bold text-base sm:text-lg text-foreground leading-snug">
                      <RichGuideText
                        text={h3CleanTitle}
                        variant="inline"
                        locale={locale}
                        disableEntityChips
                      />
                    </h3>
                  </div>
                  {sub.badge && (
                    <Badge
                      variant="outline"
                      className="font-sans text-xs font-semibold border-amber-500/30 text-amber-600 dark:text-amber-400"
                    >
                      {sub.badge[locale]}
                    </Badge>
                  )}
                </div>
                <div className="space-y-3.5">
                  {sub.blocks.map((block, idx) =>
                    renderBlock(block, locale, idx, article)
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function GuideArticleRenderer({
  category,
  article,
  prevArticle,
  nextArticle,
  locale: propLocale,
}: GuideArticleRendererProps) {
  const t = useTranslations("Guides");
  const rawLocale = useLocale();
  const locale: GuideLocale = propLocale ?? (rawLocale === "en" ? "en" : "vi");

  const [activeTab, setActiveTab] = useState<ArticleViewTab>("core");

  const { mainTitle, subTitle } = useMemo(
    () => splitArticleTitle(article.title[locale]),
    [article.title, locale]
  );

  const freeSectionsWithTab = useMemo(
    () =>
      article.freeSections.map((sec, idx) => ({
        section: sec,
        tab: classifySectionTab(sec, idx, false),
        hasWidget: hasWidgetBlock(sec),
      })),
    [article.freeSections]
  );

  const proSectionsWithTab = useMemo(
    () =>
      article.proSections.map((sec, idx) => ({
        section: sec,
        tab: classifySectionTab(sec, idx, true),
        hasWidget: hasWidgetBlock(sec),
      })),
    [article.proSections]
  );

  const isSectionHidden = (
    tab: Exclude<ArticleViewTab, "all">,
    hasWidget: boolean
  ): boolean => {
    if (activeTab === "all") return false;
    if (hasWidget && (activeTab === "core" || activeTab === "data")) {
      return false;
    }
    return activeTab !== tab;
  };

  // Map every anchor ID (section.id and subSection.id) to its assigned tab
  const anchorToTabMap = useMemo(() => {
    const map = new Map<string, Exclude<ArticleViewTab, "all">>();
    for (const item of [...freeSectionsWithTab, ...proSectionsWithTab]) {
      map.set(item.section.id, item.tab);
      for (const sub of item.section.subSections ?? []) {
        map.set(sub.id, item.tab);
      }
    }
    return map;
  }, [freeSectionsWithTab, proSectionsWithTab]);

  const tabCounts = useMemo(() => {
    const counts = { core: 0, data: 0, action: 0, all: 0 };
    for (const item of [...freeSectionsWithTab, ...proSectionsWithTab]) {
      counts[item.tab] += 1;
      counts.all += 1;
    }
    return counts;
  }, [freeSectionsWithTab, proSectionsWithTab]);

  // Reset tab to 'core' (or hash target) when switching articles
  useEffect(() => {
    if (typeof window === "undefined") return;
    const rawHash = window.location.hash.replace(/^#/, "");
    const targetTab = rawHash ? anchorToTabMap.get(rawHash) : undefined;
    setActiveTab(targetTab ?? "core");
  }, [article.slug, anchorToTabMap]);

  // Synchronize with GuidesToc 'tophub:toc-navigate' and browser 'hashchange'
  useEffect(() => {
    if (typeof window === "undefined") return;

    const navigateToAnchor = (targetId: string) => {
      if (!targetId) return;
      const targetTab = anchorToTabMap.get(targetId);
      if (targetTab) {
        setActiveTab((prev) => (prev === "all" ? "all" : targetTab));
      }
      requestAnimationFrame(() => {
        const el = document.getElementById(targetId);
        if (el && typeof el.scrollIntoView === "function") {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    };

    const handleTocNavigate = (e: Event) => {
      const custom = e as CustomEvent<{ targetId?: string; id?: string }>;
      const targetId = custom.detail?.targetId ?? custom.detail?.id;
      if (targetId) {
        navigateToAnchor(targetId);
      }
    };

    const handleHashChange = () => {
      const rawHash = window.location.hash.replace(/^#/, "");
      if (rawHash) {
        navigateToAnchor(rawHash);
      }
    };

    window.addEventListener("tophub:toc-navigate", handleTocNavigate);
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("tophub:toc-navigate", handleTocNavigate);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [anchorToTabMap]);

  const hasVisibleProSection = proSectionsWithTab.some(
    (item) => !isSectionHidden(item.tab, item.hasWidget)
  );

  const nextTabConfig: {
    tab: Exclude<ArticleViewTab, "all">;
    label: string;
  } | null =
    activeTab === "core" && tabCounts.data > 0
      ? { tab: "data", label: t("viewModeTabData") }
      : activeTab === "core" && tabCounts.action > 0
        ? { tab: "action", label: t("viewModeTabAction") }
        : activeTab === "data" && tabCounts.action > 0
          ? { tab: "action", label: t("viewModeTabAction") }
          : null;

  return (
    <article className="space-y-6">
      {/* Compact Hero Header & Unified Tactical Brief */}
      <div className="card-rpg rounded-3xl p-4 sm:p-6 space-y-3.5">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2 font-sans font-medium">
            <Link
              href="/guides"
              className="hover:text-amber-500 transition-colors inline-flex items-center gap-1.5 min-h-[44px] sm:min-h-0"
            >
              <BookOpen className="h-3.5 w-3.5 text-amber-500" />
              <span>{t("backToHub")}</span>
            </Link>
            {category && (
              <>
                <span>/</span>
                <span className="text-amber-600 dark:text-amber-400 font-bold">
                  {category.displayOrder ?? category.order}. {category.title[locale]}
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="font-mono text-xs border-amber-500/30 text-amber-600 dark:text-amber-400"
            >
              #{article.displayCode ?? article.code}
            </Badge>
            <span className="inline-flex items-center gap-1 font-sans font-medium text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5 text-amber-500" />
              {t("readingTime", { minutes: article.readingMinutes })}
            </span>
          </div>
        </div>

        <div className="space-y-1">
          <h1 className="font-heading font-black text-xl sm:text-2xl lg:text-3xl text-foreground leading-tight">
            {mainTitle}
          </h1>
          {subTitle && (
            <p className="font-sans text-xs sm:text-sm font-semibold text-amber-600/90 dark:text-amber-400/90">
              {subTitle}
            </p>
          )}
        </div>

        <RichGuideText
          text={article.summary[locale]}
          locale={locale}
          className="text-sm sm:text-base text-muted-foreground leading-relaxed"
        />

        {/* Unified 3-Column Tactical Brief (TldrActionBox + Integrated Collapsible KeyTakeaways) */}
        {article.categorySlug === "event-playbooks" ? null : article.tldr ? (
          <TldrActionBox
            tldr={article.tldr}
            locale={locale}
            keyTakeaways={article.keyTakeaways}
          />
        ) : (
          article.keyTakeaways.length > 0 && (
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4 space-y-2">
              <h3 className="text-xs font-heading font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" />
                <span>{t("keyTakeawaysTitle")}</span>
              </h3>
              <ul className="space-y-1.5 text-sm sm:text-base text-foreground/90">
                {article.keyTakeaways.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 leading-relaxed"
                  >
                    <span className="text-emerald-500 font-bold">•</span>
                    <div className="min-w-0 flex-1">
                      <RichGuideText
                        text={item[locale]}
                        locale={locale}
                        accentColor="emerald"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )
        )}
      </div>

      {article.categorySlug === "event-playbooks" ? (
        <EventEncyclopediaFlatView article={article} locale={locale} />
      ) : (
        <>
          {/* Sticky 3-Tab Article View Mode Bar (DEC-UX-01 & DEC-V4-02) */}
      <div
        role="tablist"
        aria-label="Article View Mode"
        data-testid="article-view-mode-tabs"
        className="sticky top-16 z-30 -mx-1 px-1 py-2 bg-background/90 backdrop-blur-md border-b border-border/70 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar"
      >
        <div className="flex items-center gap-1.5">
          {tabCounts.core > 0 && (
            <button
              type="button"
              role="tab"
              data-testid="article-tab-core"
              aria-selected={activeTab === "core"}
              onClick={() => {
                setActiveTab("core");
                if (typeof window !== "undefined") {
                  window.dispatchEvent(
                    new CustomEvent("tophub:tab-change", {
                      detail: { tab: "core" },
                    })
                  );
                }
              }}
              className={cn(
                "inline-flex items-center gap-1.5 min-h-[44px] px-3 py-1.5 rounded-xl border text-xs font-heading font-bold whitespace-nowrap transition-all cursor-pointer",
                activeTab === "core"
                  ? "border-amber-400 bg-amber-500/15 text-amber-700 dark:text-amber-300 shadow-xs"
                  : "border-border/70 bg-card/70 text-muted-foreground hover:text-foreground hover:border-amber-500/40"
              )}
            >
              <Target className="h-3.5 w-3.5 text-amber-500 shrink-0" />
              <span>{t("viewModeTabCore")}</span>
              <span className="rounded-md bg-background/80 px-1.5 py-0.5 font-mono text-xs">
                {tabCounts.core}
              </span>
            </button>
          )}

          {tabCounts.data > 0 && (
            <button
              type="button"
              role="tab"
              data-testid="article-tab-data"
              aria-selected={activeTab === "data"}
              onClick={() => {
                setActiveTab("data");
                if (typeof window !== "undefined") {
                  window.dispatchEvent(
                    new CustomEvent("tophub:tab-change", {
                      detail: { tab: "data" },
                    })
                  );
                }
              }}
              className={cn(
                "inline-flex items-center gap-1.5 min-h-[44px] px-3 py-1.5 rounded-xl border text-xs font-heading font-bold whitespace-nowrap transition-all cursor-pointer",
                activeTab === "data"
                  ? "border-amber-400 bg-amber-500/15 text-amber-700 dark:text-amber-300 shadow-xs"
                  : "border-border/70 bg-card/70 text-muted-foreground hover:text-foreground hover:border-amber-500/40"
              )}
            >
              <BarChart3 className="h-3.5 w-3.5 text-amber-500 shrink-0" />
              <span>{t("viewModeTabData")}</span>
              <span className="rounded-md bg-background/80 px-1.5 py-0.5 font-mono text-xs">
                {tabCounts.data}
              </span>
            </button>
          )}

          {tabCounts.action > 0 && (
            <button
              type="button"
              role="tab"
              data-testid="article-tab-action"
              aria-selected={activeTab === "action"}
              onClick={() => {
                setActiveTab("action");
                if (typeof window !== "undefined") {
                  window.dispatchEvent(
                    new CustomEvent("tophub:tab-change", {
                      detail: { tab: "action" },
                    })
                  );
                }
              }}
              className={cn(
                "inline-flex items-center gap-1.5 min-h-[44px] px-3 py-1.5 rounded-xl border text-xs font-heading font-bold whitespace-nowrap transition-all cursor-pointer",
                activeTab === "action"
                  ? "border-amber-400 bg-amber-500/15 text-amber-700 dark:text-amber-300 shadow-xs"
                  : "border-border/70 bg-card/70 text-muted-foreground hover:text-foreground hover:border-amber-500/40"
              )}
            >
              <Stethoscope className="h-3.5 w-3.5 text-amber-500 shrink-0" />
              <span>{t("viewModeTabAction")}</span>
              <span className="rounded-md bg-background/80 px-1.5 py-0.5 font-mono text-xs">
                {tabCounts.action}
              </span>
            </button>
          )}
        </div>

        <button
          type="button"
          role="tab"
          data-testid="article-tab-all"
          aria-selected={activeTab === "all"}
          onClick={() => {
            setActiveTab("all");
            if (typeof window !== "undefined") {
              window.dispatchEvent(
                new CustomEvent("tophub:tab-change", {
                  detail: { tab: "all" },
                })
              );
            }
          }}
          className={cn(
            "inline-flex items-center gap-1.5 min-h-[44px] px-3 py-1.5 rounded-xl border text-xs font-heading font-bold whitespace-nowrap transition-all cursor-pointer shrink-0",
            activeTab === "all"
              ? "border-amber-400 bg-amber-500 text-slate-950 shadow-xs"
              : "border-border/70 bg-card/70 text-muted-foreground hover:text-foreground hover:border-amber-500/40"
          )}
        >
          <Layers className="h-3.5 w-3.5 shrink-0" />
          <span>{t("viewModeTabAll")}</span>
          <span className="rounded-md bg-background/80 text-foreground px-1.5 py-0.5 font-mono text-xs">
            {tabCounts.all}
          </span>
        </button>
      </div>

      {/* De-Boxed Free Sections */}
      <div className="divide-y divide-border/50">
        {freeSectionsWithTab.map(({ section, tab, hasWidget }, idx) =>
          renderSection(
            section,
            locale,
            isSectionHidden(tab, hasWidget),
            article,
            idx + 1
          )
        )}
      </div>

      {/* PRO Sections wrapped in ProContentGate (Hidden when activeTab has no PRO sections, e.g. 'core') */}
      {proSectionsWithTab.length > 0 && (
        <div
          data-testid="article-pro-gate-wrapper"
          data-tab-hidden={hasVisibleProSection ? "false" : "true"}
          className={cn(!hasVisibleProSection && "hidden")}
        >
          <ProContentGate>
            {proSectionsWithTab.map(({ section, tab, hasWidget }, idx) =>
              renderSection(
                section,
                locale,
                isSectionHidden(tab, hasWidget),
                article,
                freeSectionsWithTab.length + idx + 1
              )
            )}
          </ProContentGate>
        </div>
      )}

      {/* Seamless Next-Tab Continuation Bar */}
      {nextTabConfig && (
        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={() => {
              setActiveTab(nextTabConfig.tab);
              if (typeof window !== "undefined") {
                window.scrollTo({ top: 240, behavior: "smooth" });
              }
            }}
            className="inline-flex items-center gap-2 rounded-2xl border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 px-4 py-2.5 text-xs sm:text-sm font-heading font-bold text-amber-600 dark:text-amber-300 transition-all cursor-pointer min-h-[44px]"
          >
            <span>
              {t("viewModeNextTabPrefix")} {nextTabConfig.label}
            </span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Previous / Next Article Sequential Navigation */}
        </>
      )}
      <div className="hidden" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border/70">
        {prevArticle ? (
          <Link
            href={`/guides/${prevArticle.categorySlug}/${prevArticle.slug}`}
            className="group rounded-2xl border border-border/80 bg-card/60 hover:border-amber-500/40 p-4 flex items-center gap-3 transition-all min-h-[64px]"
          >
            <ArrowLeft className="h-5 w-5 text-muted-foreground group-hover:text-amber-500 shrink-0 transition-transform group-hover:-translate-x-1" />
            <div className="overflow-hidden">
              <span className="block text-xs font-sans font-medium text-muted-foreground">
                {t("prevArticle")}{" "}
                <span className="font-mono">({prevArticle.displayCode ?? prevArticle.code})</span>
              </span>
              <span className="block font-heading font-bold text-sm text-foreground group-hover:text-amber-500 truncate">
                {prevArticle.title[locale]}
              </span>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {nextArticle ? (
          <Link
            href={`/guides/${nextArticle.categorySlug}/${nextArticle.slug}`}
            className="group rounded-2xl border border-border/80 bg-card/60 hover:border-amber-500/40 p-4 flex items-center justify-between gap-3 text-right transition-all min-h-[64px]"
          >
            <div className="overflow-hidden flex-1">
              <span className="block text-xs font-sans font-medium text-muted-foreground">
                {t("nextArticle")}{" "}
                <span className="font-mono">({nextArticle.displayCode ?? nextArticle.code})</span>
              </span>
              <span className="block font-heading font-bold text-sm text-foreground group-hover:text-amber-500 truncate">
                {nextArticle.title[locale]}
              </span>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-amber-500 shrink-0 transition-transform group-hover:translate-x-1" />
          </Link>
        ) : (
          <div />
        )}
      </div>

      {/* Unified Guide Discussion Hub (Attached across all 31 article pages) */}
      <GuideCommentsSection
        pageKey={`guides:${article.categorySlug}/${article.slug}`}
        locale={locale}
      />
    </article>
  );
}

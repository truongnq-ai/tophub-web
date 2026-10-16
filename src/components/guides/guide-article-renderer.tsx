"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Clock,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  FileText,
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
import { ProContentGate } from "./pro-content-gate";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type ArticleViewTab = "core" | "data" | "action" | "all";

interface GuideArticleRendererProps {
  category: GuideCategory;
  article: GuideArticle;
  prevArticle: GuideArticle | null;
  nextArticle: GuideArticle | null;
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
  idx: number
) {
  switch (block.type) {
    case "paragraph":
      return (
        <p
          key={idx}
          className="text-sm sm:text-base text-foreground/90 leading-relaxed"
        >
          {block.text[locale]}
        </p>
      );
    case "list":
      if (block.ordered) {
        return (
          <ol
            key={idx}
            className="list-decimal list-inside space-y-2 text-sm sm:text-base text-foreground/90 pl-1"
          >
            {block.items.map((item, i) => (
              <li key={i} className="leading-relaxed">
                {item[locale]}
              </li>
            ))}
          </ol>
        );
      }
      return (
        <ul
          key={idx}
          className="space-y-2 text-sm sm:text-base text-foreground/90 pl-1"
        >
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
              <span>{item[locale]}</span>
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
      return null;
  }
}

function renderSection(
  section: GuideSection,
  locale: GuideLocale,
  isHidden: boolean
) {
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
      <h2 className="font-heading font-bold text-lg sm:text-xl text-foreground border-l-4 border-amber-500 pl-3.5">
        {section.title[locale]}
      </h2>
      {section.blocks.length > 0 && (
        <div className="space-y-4">
          {section.blocks.map((block, idx) => renderBlock(block, locale, idx))}
        </div>
      )}
      {section.subSections && section.subSections.length > 0 && (
        <div className="space-y-5 pt-1">
          {section.subSections.map((sub) => (
            <div
              key={sub.id}
              id={sub.id}
              className="scroll-mt-28 pl-4 sm:pl-5 border-l-2 border-amber-500/45 space-y-3 py-1"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-heading font-bold text-base sm:text-lg text-amber-600 dark:text-amber-400">
                  {sub.title[locale]}
                </h3>
                {sub.badge && (
                  <Badge
                    variant="outline"
                    className="font-mono text-[11px] border-amber-500/30 text-amber-600 dark:text-amber-400"
                  >
                    {sub.badge[locale]}
                  </Badge>
                )}
              </div>
              <div className="space-y-3.5">
                {sub.blocks.map((block, idx) =>
                  renderBlock(block, locale, idx)
                )}
              </div>
            </div>
          ))}
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
}: GuideArticleRendererProps) {
  const t = useTranslations("Guides");
  const rawLocale = useLocale();
  const locale: GuideLocale = rawLocale === "en" ? "en" : "vi";

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
      })),
    [article.freeSections]
  );

  const proSectionsWithTab = useMemo(
    () =>
      article.proSections.map((sec, idx) => ({
        section: sec,
        tab: classifySectionTab(sec, idx, true),
      })),
    [article.proSections]
  );

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
      const custom = e as CustomEvent<{ targetId?: string }>;
      if (custom.detail?.targetId) {
        navigateToAnchor(custom.detail.targetId);
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
    (item) => activeTab === "all" || item.tab === activeTab
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
          <div className="flex items-center gap-2 font-mono">
            <Link
              href="/guides"
              className="hover:text-amber-500 transition-colors flex items-center gap-1"
            >
              <BookOpen className="h-3.5 w-3.5 text-amber-500" />
              <span>{t("backToHub")}</span>
            </Link>
            <span>/</span>
            <span className="text-amber-600 dark:text-amber-400 font-bold">
              {category.order}. {category.title[locale]}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="font-mono text-xs border-amber-500/30 text-amber-600 dark:text-amber-400"
            >
              #{article.code}
            </Badge>
            <span className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground">
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
            <p className="font-mono text-xs sm:text-sm font-semibold text-amber-600/90 dark:text-amber-400/90">
              {subTitle}
            </p>
          )}
        </div>

        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {article.summary[locale]}
        </p>

        {/* Unified 3-Column Tactical Brief (TldrActionBox + Integrated Collapsible KeyTakeaways) */}
        {article.tldr ? (
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
              <ul className="space-y-1.5 text-xs sm:text-sm text-foreground/90">
                {article.keyTakeaways.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 leading-relaxed"
                  >
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>{item[locale]}</span>
                  </li>
                ))}
              </ul>
            </div>
          )
        )}
      </div>

      {/* Sticky 3-Tab Article View Mode Bar (DEC-UX-01) */}
      <div
        role="tablist"
        aria-label="Article View Mode"
        className="sticky top-16 z-30 -mx-1 px-1 py-2 bg-background/90 backdrop-blur-md border-b border-border/70 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar"
      >
        <div className="flex items-center gap-1.5">
          {tabCounts.core > 0 && (
            <button
              type="button"
              role="tab"
              data-testid="article-tab-core"
              aria-selected={activeTab === "core"}
              onClick={() => setActiveTab("core")}
              className={cn(
                "inline-flex items-center gap-1.5 min-h-[38px] px-3 py-1.5 rounded-xl border text-xs font-heading font-bold whitespace-nowrap transition-all cursor-pointer",
                activeTab === "core"
                  ? "border-amber-400 bg-amber-500/15 text-amber-700 dark:text-amber-300 shadow-xs"
                  : "border-border/70 bg-card/70 text-muted-foreground hover:text-foreground hover:border-amber-500/40"
              )}
            >
              <Target className="h-3.5 w-3.5 text-amber-500 shrink-0" />
              <span>{t("viewModeTabCore")}</span>
              <span className="rounded-md bg-background/80 px-1.5 py-0.5 font-mono text-[10px]">
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
              onClick={() => setActiveTab("data")}
              className={cn(
                "inline-flex items-center gap-1.5 min-h-[38px] px-3 py-1.5 rounded-xl border text-xs font-heading font-bold whitespace-nowrap transition-all cursor-pointer",
                activeTab === "data"
                  ? "border-amber-400 bg-amber-500/15 text-amber-700 dark:text-amber-300 shadow-xs"
                  : "border-border/70 bg-card/70 text-muted-foreground hover:text-foreground hover:border-amber-500/40"
              )}
            >
              <BarChart3 className="h-3.5 w-3.5 text-amber-500 shrink-0" />
              <span>{t("viewModeTabData")}</span>
              <span className="rounded-md bg-background/80 px-1.5 py-0.5 font-mono text-[10px]">
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
              onClick={() => setActiveTab("action")}
              className={cn(
                "inline-flex items-center gap-1.5 min-h-[38px] px-3 py-1.5 rounded-xl border text-xs font-heading font-bold whitespace-nowrap transition-all cursor-pointer",
                activeTab === "action"
                  ? "border-amber-400 bg-amber-500/15 text-amber-700 dark:text-amber-300 shadow-xs"
                  : "border-border/70 bg-card/70 text-muted-foreground hover:text-foreground hover:border-amber-500/40"
              )}
            >
              <Stethoscope className="h-3.5 w-3.5 text-amber-500 shrink-0" />
              <span>{t("viewModeTabAction")}</span>
              <span className="rounded-md bg-background/80 px-1.5 py-0.5 font-mono text-[10px]">
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
          onClick={() => setActiveTab("all")}
          className={cn(
            "inline-flex items-center gap-1.5 min-h-[38px] px-3 py-1.5 rounded-xl border text-xs font-heading font-bold whitespace-nowrap transition-all cursor-pointer shrink-0",
            activeTab === "all"
              ? "border-amber-400 bg-amber-500 text-slate-950 shadow-xs"
              : "border-border/70 bg-card/70 text-muted-foreground hover:text-foreground hover:border-amber-500/40"
          )}
        >
          <Layers className="h-3.5 w-3.5 shrink-0" />
          <span>{t("viewModeTabAll")}</span>
        </button>
      </div>

      {/* De-Boxed Free Sections */}
      <div className="divide-y divide-border/50">
        {freeSectionsWithTab.map(({ section, tab }) =>
          renderSection(
            section,
            locale,
            activeTab !== "all" && activeTab !== tab
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
            {proSectionsWithTab.map(({ section, tab }) =>
              renderSection(
                section,
                locale,
                activeTab !== "all" && activeTab !== tab
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

      {/* Standardized Knowledge Sources Footer */}
      {article.sourceFiles.length > 0 && (
        <div className="rounded-2xl border border-border/60 bg-muted/20 px-4 py-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5 font-heading font-bold text-foreground">
            <FileText className="h-3.5 w-3.5 text-amber-500" />
            {t("sourceFilesLabel")}:
          </span>
          {article.sourceFiles.map((src) => (
            <code
              key={src}
              className="rounded-md bg-background/80 border border-border/60 px-2 py-0.5 font-mono text-[11px]"
            >
              {src}
            </code>
          ))}
        </div>
      )}

      {/* Previous / Next Article Sequential Navigation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border/70">
        {prevArticle ? (
          <Link
            href={`/guides/${prevArticle.categorySlug}/${prevArticle.slug}`}
            className="group rounded-2xl border border-border/80 bg-card/60 hover:border-amber-500/40 p-4 flex items-center gap-3 transition-all min-h-[64px]"
          >
            <ArrowLeft className="h-5 w-5 text-muted-foreground group-hover:text-amber-500 shrink-0 transition-transform group-hover:-translate-x-1" />
            <div className="overflow-hidden">
              <span className="block text-[11px] font-mono text-muted-foreground">
                {t("prevArticle")} ({prevArticle.code})
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
              <span className="block text-[11px] font-mono text-muted-foreground">
                {t("nextArticle")} ({nextArticle.code})
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
    </article>
  );
}



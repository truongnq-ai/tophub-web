"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Sprout,
  ShieldAlert,
  CalendarClock,
  Map,
  Swords,
  Sparkles,
  ShoppingBag,
  Castle,
  BookOpen,
  Flame,
  Crown,
  ArrowRight,
  Search,
  X,
  Compass,
  Wrench,
  ChevronDown,
  ChevronUp,
  Table2,
  Database,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import {
  getAllCategories,
  getArticleBySlug,
  searchGuides,
} from "@/content/guides/registry";
import type {
  CodexEntityRecord,
  CodexSearchIndexItem,
  GuideArticle,
  GuideCategoryIconName,
  GuideLocale,
  LocalizedText,
} from "@/content/guides/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { GameAssetFrame } from "./media/game-asset-frame";
import {
  CODEX_CATEGORY_LABELS,
  fetchCodexSearchIndex,
  filterCodexEntities,
  getInitialCodexSeedRecords,
} from "./codex/codex-utils";
import { GuideCommentsSection } from "./guide-comments-section";
import { cn } from "@/lib/utils";

interface GuidesHubClientProps {
  locale: GuideLocale;
}

const categoryIcons: Record<GuideCategoryIconName, React.ElementType> = {
  Sprout,
  ShieldAlert,
  CalendarClock,
  Map,
  Swords,
  Sparkles,
  ShoppingBag,
  Castle,
  Flame,
};

interface HotTagItem {
  id: string;
  label: LocalizedText;
  query: LocalizedText;
}

// GAP-02 Fix: Bilingual Hot Tags with high-precision search queries for both vi and en
const HOT_TAGS: HotTagItem[] = [
  {
    id: "560-shards",
    label: { vi: "#560Mảnh", en: "#560Shards" },
    query: { vi: "560", en: "560" },
  },
  {
    id: "9-soul-stones",
    label: { vi: "#9HồnĐáĐỏ", en: "#9SoulStones" },
    query: { vi: "Hồn Đá Đỏ", en: "Soul Stone" },
  },
  {
    id: "double-dip",
    label: { vi: "#DoubleDip", en: "#DoubleDip" },
    query: { vi: "Double-Dip", en: "Double-Dip" },
  },
  {
    id: "horde-pivot",
    label: { vi: "#HordePivot", en: "#HordePivot" },
    query: { vi: "Bộ Lạc", en: "Horde" },
  },
  {
    id: "brawler-12-star",
    label: { vi: "#Brawler12Sao", en: "#12StarEpic" },
    query: { vi: "Brawler", en: "Brawler" },
  },
];

export function GuidesHubClient({ locale }: GuidesHubClientProps) {
  const t = useTranslations("Guides");
  const categories = useMemo(() => getAllCategories(), []);

  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({});

  const toggleCategoryExpand = (slug: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  };

  const stageArticles = useMemo(() => {
    const resolveList = (pairs: Array<[string, string]>): GuideArticle[] =>
      pairs
        .map(([cat, slug]) => getArticleBySlug(cat, slug))
        .filter((a): a is GuideArticle => Boolean(a));

    return {
      early: resolveList([
        ["getting-started", "overview"],
        ["getting-started", "strict-one-queue-rule"],
        ["getting-started", "top-10-account-traps"],
      ]),
      pivot: resolveList([
        ["roadmap", "horde-pivot-roadmap"],
        ["events", "double-dip-schedule"],
        ["economy", "guild-honor-freeze"],
      ]),
      season: resolveList([
        ["roadmap", "season-1-to-4-roadmap"],
        ["infrastructure", "castle-and-brilliance"],
        ["power-systems", "pets-and-behemoth"],
      ]),
    };
  }, []);

  const quickTools = useMemo(
    () => [
      {
        code: "CODEX",
        href: "/guides/codex",
        icon: Database,
        title: t("toolCodexTitle"),
        desc: t("toolCodexDesc"),
        accent: "text-purple-500 bg-purple-500/10 border-purple-500/25",
        testId: "hub-tool-codex",
      },
      {
        code: "2.1",
        href: "/guides/heroes/encyclopedia",
        icon: ShieldAlert,
        title: t("toolEncyclopediaTitle"),
        desc: t("toolEncyclopediaDesc"),
        accent: "text-rose-500 bg-rose-500/10 border-rose-500/25",
        testId: "hub-tool-2.1",
      },
      {
        code: "3.1",
        href: "/guides/events/biweekly-rotation",
        icon: CalendarClock,
        title: t("toolCalendarTitle"),
        desc: t("toolCalendarDesc"),
        accent: "text-amber-500 bg-amber-500/10 border-amber-500/25",
        testId: "hub-tool-3.1",
      },
      {
        code: "7.1",
        href: "/guides/economy/shops-tier-list",
        icon: ShoppingBag,
        title: t("toolShopsTitle"),
        desc: t("toolShopsDesc"),
        accent: "text-emerald-500 bg-emerald-500/10 border-emerald-500/25",
        testId: "hub-tool-7.1",
      },
      {
        code: "8.4",
        href: "/guides/infrastructure/master-data-tables",
        icon: Table2,
        title: t("toolMasterTablesTitle"),
        desc: t("toolMasterTablesDesc"),
        accent: "text-sky-500 bg-sky-500/10 border-sky-500/25",
        testId: "hub-tool-8.4",
      },
    ],
    [t]
  );

  const [codexPool, setCodexPool] = useState<
    readonly (CodexEntityRecord | CodexSearchIndexItem)[]
  >(() => getInitialCodexSeedRecords());

  useEffect(() => {
    if (searchQuery.trim().length < 2) return;
    if (
      typeof navigator !== "undefined" &&
      /jsdom/i.test(navigator.userAgent || "") &&
      !(
        typeof window !== "undefined" &&
        window.fetch &&
        "mock" in (window.fetch as unknown as Record<string, unknown>)
      )
    ) {
      return;
    }

    const controller = new AbortController();
    let mounted = true;
    fetchCodexSearchIndex(controller.signal)
      .then((payload) => {
        if (mounted && payload.items.length > 0) {
          setCodexPool(payload.items);
        }
      })
      .catch(() => undefined);

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [searchQuery]);

  const searchResults = useMemo(() => {
    if (searchQuery.trim().length < 2) return null;
    return searchGuides(searchQuery, locale);
  }, [searchQuery, locale]);

  const codexSearchResults = useMemo(() => {
    if (searchQuery.trim().length < 2) return [];
    return filterCodexEntities(codexPool, {
      category: "all",
      rarity: "all",
      faction: "all",
      query: searchQuery,
    }).slice(0, 6);
  }, [codexPool, searchQuery]);

  const renderStageCards = (articles: GuideArticle[]) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
      {articles.map((art) => (
        <Link
          key={`${art.categorySlug}/${art.slug}`}
          href={`/guides/${art.categorySlug}/${art.slug}`}
          className="group rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-card/85 to-card p-4 flex flex-col justify-between space-y-3 hover:border-amber-500/60 transition-all shadow-sm"
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-xs font-bold text-amber-500">
                #{art.code}
              </span>
              {art.badge === "HOT" && (
                <Badge className="bg-rose-500/15 text-rose-500 border-rose-500/30 text-[10px] font-mono">
                  <Flame className="h-3 w-3 mr-1 fill-current" />
                  HOT
                </Badge>
              )}
              {art.badge === "PRO" && (
                <Badge className="bg-amber-500/15 text-amber-500 border-amber-500/30 text-[10px] font-mono">
                  <Crown className="h-3 w-3 mr-1 fill-current" />
                  PRO
                </Badge>
              )}
            </div>
            <h3 className="font-heading font-bold text-sm sm:text-base text-foreground group-hover:text-amber-500 transition-colors line-clamp-2">
              {art.title[locale]}
            </h3>
            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
              {art.summary[locale]}
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-border/50 text-[11px] font-mono text-amber-600 dark:text-amber-400">
            <span>{t("readingTime", { minutes: art.readingMinutes })}</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </Link>
      ))}
    </div>
  );

  return (
    <div className="space-y-8">
      {/* LAYER 1: Compact Hero + Instant Search + Hot Keyword Tags */}
      <section className="card-rpg rounded-3xl p-5 sm:p-7 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-600 dark:text-amber-400">
            <BookOpen className="h-3.5 w-3.5 text-amber-500" />
            <span>{t("hubBadge")}</span>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-foreground leading-tight">
            {t("hubTitle")}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl">
            {t("hubDescription")}
          </p>
        </div>

        {/* Instant Hub Search Input + Bilingual Hot Tags */}
        <div className="pt-1 space-y-2.5">
          <div className="relative max-w-2xl">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-amber-500" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="pl-10 pr-10 h-11 rounded-2xl bg-background/85 text-xs sm:text-sm border-border/80 focus-visible:ring-amber-500/30 focus-visible:border-amber-500"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label={t("clearSearch")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="font-mono text-[11px] text-muted-foreground mr-1">
              {t("hotTagsLabel")}
            </span>
            {HOT_TAGS.map((tag) => {
              const targetQuery = tag.query[locale];
              const isSelected =
                searchQuery.trim().toLowerCase() === targetQuery.toLowerCase();
              return (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() =>
                    setSearchQuery(isSelected ? "" : targetQuery)
                  }
                  className={cn(
                    "rounded-full border px-2.5 py-1 font-mono text-[11px] font-semibold transition-all",
                    isSelected
                      ? "border-amber-500 bg-amber-500 text-slate-950"
                      : "border-border/70 bg-background/60 text-muted-foreground hover:border-amber-500/40 hover:text-amber-500"
                  )}
                >
                  {tag.label[locale]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Instant Search Results Panel inside Hero (Unified: (1) Articles & (2) Game Codex Entities) */}
        {searchResults !== null && (
          <div className="rounded-2xl border border-amber-500/30 bg-background/80 p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
                {t("searchResultsCount", {
                  count: searchResults.length + codexSearchResults.length,
                })}
              </span>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-xs text-muted-foreground hover:text-foreground underline"
              >
                {t("clearSearch")}
              </button>
            </div>

            {/* Section (1): Matching Guide Articles */}
            <div
              data-testid="hub-search-articles-section"
              className="space-y-2"
            >
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <BookOpen className="h-3.5 w-3.5 text-amber-500" />
                <span>{t("hubSearchArticlesHeading")}</span>
              </div>

              {searchResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {searchResults.map((art) => (
                    <Link
                      key={`${art.categorySlug}/${art.slug}`}
                      href={`/guides/${art.categorySlug}/${art.slug}`}
                      className="group flex items-center justify-between gap-2 rounded-xl border border-border/70 bg-card/70 hover:border-amber-500/50 p-3 text-xs transition-all"
                    >
                      <div className="min-w-0 space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-[11px] font-bold text-amber-500 shrink-0">
                            #{art.code}
                          </span>
                          <span className="font-heading font-bold text-foreground group-hover:text-amber-500 line-clamp-1">
                            {art.title[locale]}
                          </span>
                        </div>
                        <p className="text-[11px] text-muted-foreground line-clamp-1">
                          {art.summary[locale]}
                        </p>
                      </div>
                      <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-amber-500 shrink-0" />
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground py-1">
                  {t("searchNoResults")}
                </p>
              )}
            </div>

            {/* Section (2): Matching Game Codex Entities with .webp Thumbnails */}
            <div
              data-testid="hub-search-codex-section"
              className="space-y-2 pt-2 border-t border-border/60"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Database className="h-3.5 w-3.5 text-amber-500" />
                  <span>{t("hubSearchCodexHeading")}</span>
                </span>
                <Link
                  href={`/guides/codex?q=${encodeURIComponent(
                    searchQuery.trim()
                  )}`}
                  className="text-[11px] font-mono font-bold text-amber-500 hover:underline"
                >
                  {t("hubSearchOpenCodexBtn")}
                </Link>
              </div>

              {codexSearchResults.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {codexSearchResults.map((entity) => {
                    const displayName =
                      locale === "vi" ? entity.nameVi : entity.nameEn;
                    const displayDesc =
                      locale === "vi" ? entity.descVi : entity.descEn;
                    return (
                      <Link
                        key={entity.id}
                        href={`/guides/codex?q=${encodeURIComponent(
                          displayName
                        )}`}
                        className="group flex items-center gap-2.5 rounded-xl border border-border/70 bg-card/70 hover:border-amber-500/50 p-2.5 text-xs transition-all"
                      >
                        <GameAssetFrame
                          src={entity.path}
                          alt={displayName}
                          size="md"
                          rarity={entity.rarity}
                          faction={entity.faction}
                        />
                        <div className="min-w-0 flex-1 space-y-0.5">
                          <div className="flex items-center justify-between gap-1">
                            <span className="font-heading font-bold text-foreground group-hover:text-amber-500 truncate">
                              {displayName}
                            </span>
                            <span className="text-[10px] font-mono text-amber-500 shrink-0">
                              {CODEX_CATEGORY_LABELS[entity.category][locale]}
                            </span>
                          </div>
                          <p className="text-[11px] text-muted-foreground line-clamp-1">
                            {displayDesc}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* LAYER 2: 3-Stage Server Progression Selector Tabs */}
      <section className="space-y-3">
        <h2 className="text-xs font-heading font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5 px-1">
          <Compass className="h-4 w-4" />
          <span>{t("stageSelectorTitle")}</span>
        </h2>

        <Tabs defaultValue="early" className="space-y-3">
          <TabsList className="grid grid-cols-1 sm:grid-cols-3 h-auto gap-1.5 rounded-2xl bg-card/70 border border-border/80 p-1.5">
            <TabsTrigger
              value="early"
              className="rounded-xl py-2.5 px-3 text-left flex flex-col items-start gap-0.5 data-[state=active]:bg-amber-500/15 data-[state=active]:text-amber-600 dark:data-[state=active]:text-amber-400 data-[state=active]:border-amber-500/30 border border-transparent"
            >
              <span className="font-heading font-bold text-xs sm:text-sm">
                🌱 {t("stageEarlyLabel")}
              </span>
              <span className="text-[11px] text-muted-foreground line-clamp-1 font-normal">
                {t("stageEarlySub")}
              </span>
            </TabsTrigger>

            <TabsTrigger
              value="pivot"
              className="rounded-xl py-2.5 px-3 text-left flex flex-col items-start gap-0.5 data-[state=active]:bg-amber-500/15 data-[state=active]:text-amber-600 dark:data-[state=active]:text-amber-400 data-[state=active]:border-amber-500/30 border border-transparent"
            >
              <span className="font-heading font-bold text-xs sm:text-sm">
                🔥 {t("stagePivotLabel")}
              </span>
              <span className="text-[11px] text-muted-foreground line-clamp-1 font-normal">
                {t("stagePivotSub")}
              </span>
            </TabsTrigger>

            <TabsTrigger
              value="season"
              className="rounded-xl py-2.5 px-3 text-left flex flex-col items-start gap-0.5 data-[state=active]:bg-amber-500/15 data-[state=active]:text-amber-600 dark:data-[state=active]:text-amber-400 data-[state=active]:border-amber-500/30 border border-transparent"
            >
              <span className="font-heading font-bold text-xs sm:text-sm">
                ⚔️ {t("stageSeasonLabel")}
              </span>
              <span className="text-[11px] text-muted-foreground line-clamp-1 font-normal">
                {t("stageSeasonSub")}
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="early">
            {renderStageCards(stageArticles.early)}
          </TabsContent>
          <TabsContent value="pivot">
            {renderStageCards(stageArticles.pivot)}
          </TabsContent>
          <TabsContent value="season">
            {renderStageCards(stageArticles.season)}
          </TabsContent>
        </Tabs>
      </section>

      {/* LAYER 3: 4 Interactive Tools & Master Lookup Strip */}
      <section className="space-y-3">
        <h2 className="text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 px-1">
          <Wrench className="h-4 w-4 text-amber-500" />
          <span>{t("toolsStripTitle")}</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3.5">
          {quickTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.code}
                href={tool.href}
                data-testid={tool.testId}
                className="group rounded-2xl border border-border/80 bg-card/70 hover:border-amber-500/50 p-4 flex items-start gap-3.5 transition-all shadow-sm"
              >
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-xl border shrink-0",
                    tool.accent
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-mono text-[10px] font-bold text-amber-500">
                      #{tool.code}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-amber-500 transition-transform group-hover:translate-x-0.5" />
                  </div>
                  <h3 className="font-heading font-bold text-xs sm:text-sm text-foreground group-hover:text-amber-500 transition-colors truncate">
                    {tool.title}
                  </h3>
                  <p className="text-[11px] text-muted-foreground line-clamp-1">
                    {tool.desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* LAYER 4: Clean 8-Category Bento Grid */}
      <section className="space-y-4">
        <h2 className="text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground px-1">
          {t("categoriesGridTitle")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {categories.map((category) => {
            const Icon = categoryIcons[category.iconName] || BookOpen;
            const firstArticle = category.articles[0];
            const isExpanded = Boolean(expandedCategories[category.slug]);

            return (
              <div
                key={category.slug}
                className="rounded-3xl border border-border/80 dark:border-amber-500/20 bg-card/70 p-5 sm:p-6 flex flex-col justify-between space-y-4 shadow-sm hover:border-amber-500/40 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 shadow-sm shrink-0">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400">
                          TOPIC 0{category.order}
                        </span>
                        <h3 className="font-heading font-black text-base sm:text-lg text-foreground leading-snug">
                          {category.title[locale]}
                        </h3>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="font-mono text-[11px] shrink-0"
                    >
                      {t("articlesCount", { count: category.articles.length })}
                    </Badge>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {category.description[locale]}
                  </p>
                </div>

                {/* Primary Entry CTA + Progressive Disclosure Toggle for All Articles */}
                <div className="space-y-2.5 pt-3 border-t border-border/60">
                  {firstArticle && (
                    <Link
                      href={`/guides/${category.slug}/${firstArticle.slug}`}
                      className="group flex items-center justify-between gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/15 px-3.5 py-2.5 text-xs font-bold text-amber-600 dark:text-amber-400 transition-all min-h-[42px]"
                    >
                      <span className="truncate">
                        🚀 {t("startWithArticleBtn", { code: firstArticle.code })} —{" "}
                        {firstArticle.title[locale]}
                      </span>
                      <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  )}

                  <button
                    type="button"
                    onClick={() => toggleCategoryExpand(category.slug)}
                    className="w-full flex items-center justify-between px-2 py-1.5 text-[11px] font-mono font-semibold text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <span>
                      {isExpanded
                        ? t("hideMoreArticlesBtn")
                        : t("showMoreArticlesBtn", {
                            count: category.articles.length,
                          })}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="h-3.5 w-3.5" />
                    ) : (
                      <ChevronDown className="h-3.5 w-3.5" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="space-y-1 pt-1">
                      {category.articles.map((article) => (
                        <Link
                          key={article.slug}
                          href={`/guides/${category.slug}/${article.slug}`}
                          className="group flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-xs hover:bg-amber-500/10 transition-colors min-h-[38px]"
                        >
                          <span className="truncate font-medium text-foreground/90 group-hover:text-amber-500">
                            <strong className="font-mono text-[11px] text-amber-500 mr-1.5">
                              {article.code}
                            </strong>
                            {article.title[locale]}
                          </span>
                          <span className="flex items-center gap-1.5 shrink-0">
                            {article.badge === "PRO" && (
                              <Crown className="h-3.5 w-3.5 text-amber-500" />
                            )}
                            {article.badge === "HOT" && (
                              <Flame className="h-3.5 w-3.5 text-rose-500" />
                            )}
                            <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-amber-500 transition-transform group-hover:translate-x-0.5" />
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Unified Guide Discussion Hub (Attached to the main /guides hub page) */}
      <GuideCommentsSection pageKey="guides:hub" locale={locale} />
    </div>
  );
}

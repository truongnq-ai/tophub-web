"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  Sprout,
  ShieldAlert,
  CalendarClock,
  Map,
  Swords,
  Sparkles,
  ShoppingBag,
  Castle,
  Search,
  X,
  BookOpen,
  Flame,
  Crown,
  PanelLeftClose,
  PanelLeftOpen,
  Database,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { useUidSession } from "@/hooks/use-uid-session";
import {
  GUIDE_ZONES,
  getAllCategories,
  searchGuides,
} from "@/content/guides/registry";
import type {
  GuideBadgeType,
  GuideCategoryIconName,
  GuideLocale,
} from "@/content/guides/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CompactUidStatusPill } from "./compact-uid-status-pill";
import { splitArticleTitle } from "./guide-article-renderer";
import { cn } from "@/lib/utils";

const SIDEBAR_COLLAPSED_STORAGE_KEY = "tophub_guides_sidebar_collapsed";

const categoryIcons: Record<GuideCategoryIconName, React.ElementType> = {
  Sprout,
  ShieldAlert,
  CalendarClock,
  Map,
  Swords,
  Sparkles,
  ShoppingBag,
  Castle,
};

function renderArticleIndicator(badge: GuideBadgeType) {
  if (badge === "HOT") {
    return (
      <span
        title="HOT"
        className="inline-flex items-center justify-center rounded-md bg-rose-500/15 border border-rose-500/30 px-1.5 py-0.5 text-[10px] font-mono font-bold text-rose-600 dark:text-rose-400 shrink-0"
      >
        <Flame className="h-2.5 w-2.5 fill-current" />
      </span>
    );
  }
  if (badge === "PRO") {
    return (
      <span
        title="PRO"
        className="inline-flex items-center justify-center rounded-md bg-amber-500/15 border border-amber-500/30 px-1.5 py-0.5 text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400 shrink-0"
      >
        <Crown className="h-2.5 w-2.5 fill-current" />
      </span>
    );
  }
  return null;
}

interface SidebarContentProps {
  onNavigate?: () => void;
  onSelectArticle?: () => void;
  onCollapseDesktop?: () => void;
  preferredCategorySlug?: string | null;
}

function SidebarNavigationTree({
  onNavigate,
  onSelectArticle,
  onCollapseDesktop,
  preferredCategorySlug,
}: SidebarContentProps) {
  const t = useTranslations("Guides");
  const rawLocale = useLocale();
  const locale: GuideLocale = rawLocale === "en" ? "en" : "vi";
  const pathname = usePathname();

  const [searchQuery, setSearchQuery] = useState("");

  const isCodexRoute = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    return segments[0] === "guides" && segments[1] === "codex";
  }, [pathname]);

  const activeCategorySlug = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments[0] === "guides" && segments[1] && segments[1] !== "codex") {
      return segments[1];
    }
    return "getting-started";
  }, [pathname]);

  const [openCategory, setOpenCategory] = useState<string>(
    preferredCategorySlug || activeCategorySlug
  );

  useEffect(() => {
    if (preferredCategorySlug) {
      setOpenCategory(preferredCategorySlug);
    } else {
      setOpenCategory(activeCategorySlug);
    }
  }, [activeCategorySlug, preferredCategorySlug]);

  const searchResults = useMemo(() => {
    if (searchQuery.trim().length < 2) return null;
    return searchGuides(searchQuery, locale);
  }, [searchQuery, locale]);

  const handleArticleClick = () => {
    onSelectArticle?.();
    onNavigate?.();
  };

  return (
    <div className="space-y-3.5">
      {/* Compact UID Companion Status Pill (DEC-UX-02) */}
      <CompactUidStatusPill onNavigate={onNavigate} />

      {/* Quick Search Box + Optional Desktop Collapse Trigger */}
      <div className="flex items-center gap-1.5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-amber-500" />
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="pl-8 pr-8 h-10 rounded-xl bg-background/80 text-xs border-border/80 focus-visible:ring-amber-500/30 focus-visible:border-amber-500"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              aria-label={t("clearSearch")}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md text-muted-foreground hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {onCollapseDesktop && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={onCollapseDesktop}
            aria-label={t("collapseSidebar")}
            title={t("collapseSidebar")}
            className="h-10 w-10 shrink-0 rounded-xl border-border/80 bg-card/60 text-muted-foreground hover:text-amber-500 hover:border-amber-500/40"
          >
            <PanelLeftClose className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Overview Hub Link */}
      <Link
        href="/guides"
        onClick={onNavigate}
        className={cn(
          "flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all min-h-[40px] border",
          pathname === "/guides"
            ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/35 shadow-sm"
            : "border-border/60 bg-card/40 text-muted-foreground hover:text-foreground hover:bg-muted/50"
        )}
      >
        <BookOpen className="h-4 w-4 text-amber-500 shrink-0" />
        <span>{t("backToHub")}</span>
      </Link>

      {/* Tier-2 Game Codex & Item Compendium Link (GAP-05 / GAP-P5-06) */}
      <Link
        href="/guides/codex"
        data-testid="sidebar-codex-link"
        onClick={onNavigate}
        className={cn(
          "flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all min-h-[40px] border",
          isCodexRoute
            ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/35 shadow-sm"
            : "border-border/60 bg-card/40 text-muted-foreground hover:text-foreground hover:bg-muted/50"
        )}
      >
        <span className="flex items-center gap-2.5 min-w-0">
          <Database className="h-4 w-4 text-amber-500 shrink-0" />
          <span className="truncate">{t("sidebarCodexLink")}</span>
        </span>
        <span className="rounded-md bg-amber-500/15 border border-amber-500/30 px-1.5 py-0.5 font-mono text-[10px] font-bold text-amber-500 shrink-0">
          3.4K+
        </span>
      </Link>

      {/* Instant Search Results View */}
      {searchResults !== null ? (
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400">
              {t("searchResultsCount", { count: searchResults.length })}
            </span>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="text-[11px] text-muted-foreground hover:text-foreground underline"
            >
              {t("clearSearch")}
            </button>
          </div>

          {searchResults.length > 0 ? (
            <div className="space-y-1">
              {searchResults.map((article) => {
                const href = `/guides/${article.categorySlug}/${article.slug}`;
                const isActive = pathname === href;
                const cleanMainTitle = splitArticleTitle(
                  article.title[locale]
                ).mainTitle;
                return (
                  <Link
                    key={`${article.categorySlug}/${article.slug}`}
                    href={href}
                    onClick={handleArticleClick}
                    title={article.title[locale]}
                    className={cn(
                      "flex items-center justify-between gap-2 rounded-xl px-2.5 py-2 text-xs transition-all min-h-[40px] border",
                      isActive
                        ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30 font-bold"
                        : "border-border/50 bg-card/50 text-foreground/90 hover:border-amber-500/30"
                    )}
                  >
                    <div className="overflow-hidden flex items-center gap-1.5 min-w-0">
                      <span className="font-mono text-[10px] text-amber-500 shrink-0">
                        {article.code}
                      </span>
                      <span className="line-clamp-1">{cleanMainTitle}</span>
                    </div>
                    {renderArticleIndicator(article.badge)}
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border/80 p-4 text-center space-y-2">
              <p className="text-xs text-muted-foreground">
                {t("searchNoResults")}
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setSearchQuery("")}
                className="text-xs h-8 rounded-lg"
              >
                {t("clearSearch")}
              </Button>
            </div>
          )}
        </div>
      ) : (
        /* 3 Zones -> 8 Categories Single-Accordion -> 31 Articles */
        <Accordion
          type="single"
          collapsible
          value={openCategory}
          onValueChange={setOpenCategory}
          className="space-y-4"
        >
          {GUIDE_ZONES.map((zone) => (
            <div key={zone.id} className="space-y-1.5">
              <div className="px-2 text-[10px] font-mono font-bold uppercase tracking-wider text-amber-600/90 dark:text-amber-400/90">
                {zone.title[locale]}
              </div>

              <div className="space-y-1.5">
                {zone.categories.map((category) => {
                  const Icon = categoryIcons[category.iconName] || BookOpen;
                  const isCategoryActive = activeCategorySlug === category.slug;

                  return (
                    <AccordionItem
                      key={category.slug}
                      value={category.slug}
                      className={cn(
                        "rounded-xl border px-2 transition-colors",
                        isCategoryActive
                          ? "border-amber-500/35 bg-amber-500/5 dark:bg-card/80"
                          : "border-border/60 bg-card/35"
                      )}
                    >
                      <AccordionTrigger className="py-2.5 hover:no-underline min-h-[42px]">
                        <div className="flex items-center gap-2 text-left pr-1.5 min-w-0">
                          <div
                            className={cn(
                              "flex h-6 w-6 items-center justify-center rounded-lg shrink-0",
                              isCategoryActive
                                ? "bg-amber-500 text-slate-950"
                                : "bg-amber-500/15 text-amber-500"
                            )}
                          >
                            <Icon className="h-3.5 w-3.5" />
                          </div>
                          <span className="font-heading font-bold text-xs text-foreground leading-snug line-clamp-1">
                            {category.order}. {category.title[locale]}
                          </span>
                        </div>
                      </AccordionTrigger>

                      <AccordionContent className="pb-2 pt-0.5">
                        <div className="space-y-1 pl-2 border-l border-border/70 ml-2.5">
                          {category.articles.map((article) => {
                            const href = `/guides/${category.slug}/${article.slug}`;
                            const isArticleActive = pathname === href;
                            const cleanMainTitle = splitArticleTitle(
                              article.title[locale]
                            ).mainTitle;

                            return (
                              <Link
                                key={article.slug}
                                href={href}
                                onClick={handleArticleClick}
                                title={article.title[locale]}
                                className={cn(
                                  "flex items-center justify-between gap-1.5 rounded-lg px-2 py-1.5 text-xs transition-all min-h-[38px]",
                                  isArticleActive
                                    ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/30"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                )}
                              >
                                <span className="line-clamp-1 leading-snug min-w-0">
                                  <strong className="font-mono text-[10px] text-amber-500 mr-1.5">
                                    {article.code}
                                  </strong>
                                  {cleanMainTitle}
                                </span>
                                {renderArticleIndicator(article.badge)}
                              </Link>
                            );
                          })}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </div>
            </div>
          ))}
        </Accordion>
      )}
    </div>
  );
}

export function GuidesSidebar() {
  const t = useTranslations("Guides");
  const rawLocale = useLocale();
  const locale: GuideLocale = rawLocale === "en" ? "en" : "vi";
  const pathname = usePathname();
  const { activeAccount, isLoaded } = useUidSession();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);
  const [preferredCategorySlug, setPreferredCategorySlug] = useState<
    string | null
  >(null);
  const prevPathnameRef = useRef<string>(pathname);
  const categories = getAllCategories();

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(SIDEBAR_COLLAPSED_STORAGE_KEY);
      if (saved === "1") {
        setDesktopCollapsed(true);
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const toggleDesktopCollapsed = (collapsed: boolean) => {
    setDesktopCollapsed(collapsed);
    try {
      window.localStorage.setItem(
        SIDEBAR_COLLAPSED_STORAGE_KEY,
        collapsed ? "1" : "0"
      );
    } catch {
      // Ignore storage errors
    }
  };

  // GAP-v31-05: Auto-collapse when navigating to a new article route after mount
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      const segments = pathname.split("/").filter(Boolean);
      const isArticleRoute = segments[0] === "guides" && segments.length >= 3;
      if (isArticleRoute) {
        setPreferredCategorySlug(null);
        toggleDesktopCollapsed(true);
      }
    }
  }, [pathname]);

  const handleDesktopSelectArticle = () => {
    setPreferredCategorySlug(null);
    toggleDesktopCollapsed(true);
  };

  const handleExpandCategoryFromRail = (categorySlug: string) => {
    setPreferredCategorySlug(categorySlug);
    toggleDesktopCollapsed(false);
  };

  return (
    <>
      {/* Mobile Drawer Trigger Bar (< 1024px) with inline UID indicator */}
      <div className="lg:hidden mb-3">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between min-h-[44px] rounded-2xl border-amber-500/30 bg-card/85 px-4 font-heading font-bold text-xs sm:text-sm"
            >
              <span className="flex items-center gap-2 min-w-0">
                <BookOpen className="h-4 w-4 text-amber-500 shrink-0" />
                <span className="truncate">{t("mobileMenuBtn")}</span>
              </span>
              <span className="flex items-center gap-2 shrink-0">
                {isLoaded && activeAccount && (
                  <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/15 px-1.5 py-0.5 font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {activeAccount.active_plan === "PRO" ? "PRO" : "Bot"}
                  </span>
                )}
                <span className="font-mono text-[11px] text-amber-600 dark:text-amber-400">
                  {categories.length} Topics
                </span>
              </span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[min(320px,calc(100vw-2rem))] sm:w-[360px] overflow-y-auto bg-card/95 backdrop-blur-2xl p-5"
          >
            <SheetHeader className="pb-4 border-b border-border/60">
              <SheetTitle className="flex items-center gap-2 text-left font-heading text-base">
                <BookOpen className="h-5 w-5 text-amber-500" />
                <span>{t("mobileMenuBtn")}</span>
              </SheetTitle>
            </SheetHeader>
            <div className="mt-4">
              <SidebarNavigationTree onNavigate={() => setMobileOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Left Sidebar (Expanded w-64 vs Collapsed w-14 Icon Rail) */}
      <aside
        className={cn(
          "hidden lg:block shrink-0 transition-all duration-200",
          desktopCollapsed ? "w-14" : "w-64"
        )}
      >
        <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pr-1 pb-8">
          {desktopCollapsed ? (
            <div className="flex flex-col items-center gap-2 rounded-2xl border border-border/70 bg-card/50 p-2">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => toggleDesktopCollapsed(false)}
                aria-label={t("expandSidebar")}
                title={t("expandSidebar")}
                className="h-10 w-10 rounded-xl text-amber-500 hover:bg-amber-500/15"
              >
                <PanelLeftOpen className="h-4 w-4" />
              </Button>

              <Link
                href="/guides"
                title={t("backToHub")}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl border transition-colors",
                  pathname === "/guides"
                    ? "border-amber-500/40 bg-amber-500/15 text-amber-500"
                    : "border-transparent text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                )}
              >
                <BookOpen className="h-4 w-4" />
              </Link>

              <Link
                href="/guides/codex"
                data-testid="sidebar-rail-codex-link"
                title={t("sidebarCodexLink")}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl border transition-colors",
                  pathname.startsWith("/guides/codex")
                    ? "border-amber-500/40 bg-amber-500/15 text-amber-500"
                    : "border-transparent text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                )}
              >
                <Database className="h-4 w-4" />
              </Link>

              <div className="h-px w-8 bg-border/70 my-0.5" />

              {categories.map((category) => {
                const Icon = categoryIcons[category.iconName] || BookOpen;
                const isActive = pathname.startsWith(`/guides/${category.slug}`);
                const label = `${category.order}. ${category.title[locale]}`;

                return (
                  <button
                    key={category.slug}
                    type="button"
                    onClick={() => handleExpandCategoryFromRail(category.slug)}
                    aria-label={label}
                    title={label}
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-xl border transition-colors cursor-pointer",
                      isActive
                        ? "border-amber-500/40 bg-amber-500 text-slate-950 shadow-sm"
                        : "border-transparent text-muted-foreground hover:bg-amber-500/10 hover:text-amber-500"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </button>
                );
              })}
            </div>
          ) : (
            <SidebarNavigationTree
              preferredCategorySlug={preferredCategorySlug}
              onSelectArticle={handleDesktopSelectArticle}
              onCollapseDesktop={() => toggleDesktopCollapsed(true)}
            />
          )}
        </div>
      </aside>
    </>
  );
}

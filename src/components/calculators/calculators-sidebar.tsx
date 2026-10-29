"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  Star,
  BookOpen,
  Shield,
  Swords,
  Crown,
  Gem,
  PawPrint,
  Castle,
  Trophy,
  Search,
  X,
  Calculator,
  Database,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { useUidSession } from "@/hooks/use-uid-session";
import {
  CALCULATOR_ZONES,
  getAllCalculatorCategories,
  searchCalculators,
} from "@/content/calculators/registry";
import type {
  CalculatorCategoryIconName,
  CalculatorLocale,
} from "@/content/calculators/types";
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
import { CompactUidStatusPill } from "@/components/guides/compact-uid-status-pill";
import { cn } from "@/lib/utils";

const SIDEBAR_COLLAPSED_STORAGE_KEY = "tophub_calculators_sidebar_collapsed";

export const categoryIcons: Record<
  CalculatorCategoryIconName,
  React.ElementType
> = {
  Star,
  BookOpen,
  Shield,
  Swords,
  Crown,
  Gem,
  PawPrint,
  Castle,
  Trophy,
};

interface SidebarContentProps {
  onNavigate?: () => void;
  onSelectTool?: () => void;
  onCollapseDesktop?: () => void;
  preferredCategorySlug?: string | null;
}

function SidebarNavigationTree({
  onNavigate,
  onSelectTool,
  onCollapseDesktop,
  preferredCategorySlug,
}: SidebarContentProps) {
  const t = useTranslations("Calculators");
  const rawLocale = useLocale();
  const locale: CalculatorLocale = rawLocale === "en" ? "en" : "vi";
  const pathname = usePathname();

  const [searchQuery, setSearchQuery] = useState("");

  const activeCategorySlug = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments[0] === "calculators" && segments[1]) {
      return segments[1];
    }
    return "heroes";
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
    return searchCalculators(searchQuery, locale);
  }, [searchQuery, locale]);

  const handleToolClick = () => {
    onSelectTool?.();
    onNavigate?.();
  };

  return (
    <div className="space-y-3.5">
      {/* Compact UID Companion Status Pill */}
      <CompactUidStatusPill onNavigate={onNavigate} />

      {/* Quick Search Box + Optional Desktop Collapse Trigger */}
      <div className="flex items-center gap-1.5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-amber-500" />
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="pl-9 pr-11 h-11 rounded-xl bg-background/80 text-base md:text-sm border-border/80 focus-visible:ring-amber-500/30 focus-visible:border-amber-500"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              aria-label={t("clearSearch")}
              className="absolute right-0 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40"
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
            className="h-11 w-11 shrink-0 rounded-xl border-border/80 bg-card/60 text-muted-foreground hover:text-amber-500 hover:border-amber-500/40 cursor-pointer"
          >
            <PanelLeftClose className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Overview Hub Link + Game Codex Shortcut Link (UX-UPGRADE-03 Parity with GuidesSidebar) */}
      <div className="space-y-1.5">
        <Link
          href="/calculators"
          onClick={onNavigate}
          className={cn(
            "flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-bold transition-all min-h-[44px] border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40",
            pathname === "/calculators"
              ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/35 shadow-sm"
              : "border-border/60 bg-card/40 text-muted-foreground hover:text-foreground hover:bg-muted/50"
          )}
        >
          <Calculator className="h-4 w-4 text-amber-500 shrink-0" />
          <span>{t("backToHub")}</span>
        </Link>

        <Link
          href="/guides/codex"
          onClick={onNavigate}
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-bold transition-all min-h-[44px] border border-border/60 bg-card/40 text-muted-foreground hover:text-amber-500 hover:border-amber-500/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40"
        >
          <Database className="h-4 w-4 text-amber-500 shrink-0" />
          <span className="truncate">{t("sidebarCodexLink")}</span>
        </Link>
      </div>

      {/* Instant Search Results View */}
      {searchResults !== null ? (
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between px-1">
            <span data-testid="calculators-sidebar-search-count" className="text-xs font-sans font-bold text-amber-700 dark:text-amber-400">
              {t("searchResultsCount", { count: searchResults.length })}
            </span>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="inline-flex min-h-[44px] items-center px-1 text-xs text-muted-foreground hover:text-foreground underline cursor-pointer"
            >
              {t("clearSearch")}
            </button>
          </div>

          {searchResults.length > 0 ? (
            <div className="space-y-1">
              {searchResults.map(({ category, tool }) => {
                const href = `/calculators/${category.slug}/${tool.slug}`;
                const isActive = pathname === href;
                return (
                  <Link
                    key={`${category.slug}/${tool.slug}`}
                    href={href}
                    onClick={handleToolClick}
                    title={tool.fullTitle[locale]}
                    className={cn(
                      "flex items-center justify-between gap-2 rounded-xl px-2.5 py-2 text-sm transition-all min-h-[44px] border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40",
                      isActive
                        ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30 font-bold"
                        : "border-border/50 bg-card/50 text-foreground/90 hover:border-amber-500/30"
                    )}
                  >
                    <div className="overflow-hidden flex items-center gap-1.5 min-w-0">
                      <span className="font-mono text-xs text-amber-600 dark:text-amber-400 shrink-0">
                        {tool.code}
                      </span>
                      <span className="line-clamp-1">
                        {tool.title[locale].replace(`${tool.code} `, "")}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border/80 p-4 text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                {t("searchNoResults")}
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setSearchQuery("")}
                className="text-sm min-h-[44px] rounded-lg cursor-pointer"
              >
                {t("clearSearch")}
              </Button>
            </div>
          )}
        </div>
      ) : (
        /* 3 Zones -> 9 Categories Single-Accordion -> 21 Sub-Calculators */
        <Accordion
          type="single"
          collapsible
          value={openCategory}
          onValueChange={setOpenCategory}
          className="space-y-4"
        >
          {CALCULATOR_ZONES.map((zone) => (
            <div key={zone.id} className="space-y-1.5">
              <div data-testid="calculators-sidebar-zone-label" className="px-2 text-xs font-sans font-bold uppercase tracking-wide text-amber-700 dark:text-amber-400/90">
                {zone.label[locale]}
              </div>

              <div className="space-y-1.5">
                {zone.categories.map((category) => {
                  const Icon = categoryIcons[category.iconName] || Calculator;
                  const isCategoryActive =
                    pathname.startsWith(`/calculators/${category.slug}`);

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
                      <AccordionTrigger className="py-2.5 hover:no-underline min-h-[44px] cursor-pointer">
                        <div className="flex items-center gap-2 text-left pr-1.5 min-w-0">
                          <div
                            className={cn(
                              "flex h-7 w-7 items-center justify-center rounded-lg shrink-0",
                              isCategoryActive
                                ? "bg-amber-500 text-slate-950"
                                : "bg-amber-500/15 text-amber-500"
                            )}
                          >
                            <Icon className="h-4 w-4" />
                          </div>
                          <span className="font-heading font-bold text-sm text-foreground leading-snug line-clamp-1">
                            {category.title[locale]}
                          </span>
                        </div>
                      </AccordionTrigger>

                      <AccordionContent className="pb-2 pt-0.5">
                        <div className="space-y-1 pl-2 border-l border-border/70 ml-2.5">
                          {category.tools.map((tool) => {
                            const href = `/calculators/${category.slug}/${tool.slug}`;
                            const isToolActive = pathname === href;
                            const cleanTitle = tool.title[locale].replace(
                              `${tool.code} `,
                              ""
                            );

                            return (
                              <Link
                                key={tool.slug}
                                href={href}
                                onClick={handleToolClick}
                                title={tool.fullTitle[locale]}
                                className={cn(
                                  "flex items-center justify-between gap-1.5 rounded-lg px-2.5 py-2 text-sm transition-all min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40",
                                  isToolActive
                                    ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/30"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                )}
                              >
                                <span className="line-clamp-1 leading-snug min-w-0">
                                  <strong className="font-mono text-xs text-amber-600 dark:text-amber-400 mr-1.5">
                                    {tool.code}
                                  </strong>
                                  {cleanTitle}
                                </span>
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

export function CalculatorsSidebar() {
  const t = useTranslations("Calculators");
  const rawLocale = useLocale();
  const locale: CalculatorLocale = rawLocale === "en" ? "en" : "vi";
  const pathname = usePathname();
  const { activeAccount, isLoaded } = useUidSession();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);
  const [preferredCategorySlug, setPreferredCategorySlug] = useState<
    string | null
  >(null);
  const prevPathnameRef = useRef<string>(pathname);
  const categories = getAllCalculatorCategories();

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

  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      const segments = pathname.split("/").filter(Boolean);
      const isToolRoute = segments[0] === "calculators" && segments.length >= 3;
      if (isToolRoute) {
        setPreferredCategorySlug(null);
        toggleDesktopCollapsed(true);
      }
    }
  }, [pathname]);

  const handleDesktopSelectTool = () => {
    setPreferredCategorySlug(null);
    toggleDesktopCollapsed(true);
  };

  const handleExpandCategoryFromRail = (categorySlug: string) => {
    setPreferredCategorySlug(categorySlug);
    toggleDesktopCollapsed(false);
  };

  return (
    <>
      {/* Mobile Drawer Trigger Bar (< 1024px) */}
      <div className="lg:hidden mb-3">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between min-h-[44px] rounded-2xl border-amber-500/30 bg-card/85 px-4 font-heading font-bold text-sm cursor-pointer"
            >
              <span className="flex items-center gap-2 min-w-0">
                <Calculator className="h-4 w-4 text-amber-500 shrink-0" />
                <span className="truncate">{t("mobileMenuBtn")}</span>
              </span>
              <span className="flex items-center gap-2 shrink-0">
                {isLoaded && activeAccount && (
                  <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/15 px-1.5 py-0.5 font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {activeAccount.active_plan === "PRO" ? "PRO" : "Bot"}
                  </span>
                )}
                <span className="font-mono text-xs text-amber-700 dark:text-amber-400">
                  {categories.length} Groups
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
                <Calculator className="h-5 w-5 text-amber-500" />
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
        aria-label="Calculators Navigation"
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
                className="h-11 w-11 rounded-xl text-amber-500 hover:bg-amber-500/15 cursor-pointer"
              >
                <PanelLeftOpen className="h-4 w-4" />
              </Button>

              <Link
                href="/calculators"
                title={t("backToHub")}
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-xl border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40",
                  pathname === "/calculators"
                    ? "border-amber-500/40 bg-amber-500/15 text-amber-500"
                    : "border-transparent text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                )}
              >
                <Calculator className="h-4 w-4" />
              </Link>

              <div className="h-px w-8 bg-border/70 my-0.5" />

              {categories.map((category) => {
                const Icon = categoryIcons[category.iconName] || Calculator;
                const isActive = pathname.startsWith(
                  `/calculators/${category.slug}`
                );
                const label = category.title[locale];

                return (
                  <button
                    key={category.slug}
                    type="button"
                    onClick={() => handleExpandCategoryFromRail(category.slug)}
                    aria-label={label}
                    title={label}
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-xl border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40",
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
              onSelectTool={handleDesktopSelectTool}
              onCollapseDesktop={() => toggleDesktopCollapsed(true)}
            />
          )}
        </div>
      </aside>
    </>
  );
}

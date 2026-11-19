"use client";

import React from "react";
import {
  Sprout,
  ShieldAlert,
  Castle,
  Flame,
  CalendarClock,
  ShoppingBag,
  Swords,
  Sparkles,
  Table2,
  BookOpen,
} from "lucide-react";
import type {
  GuideCategory,
  GuideCategoryIconName,
  GuideLocale,
} from "@/content/guides/types";
import { cn } from "@/lib/utils";

interface GuidesHubSidebarProps {
  categories: GuideCategory[];
  activeSectionId: string;
  onSelectSection?: (sectionId: string) => void;
  locale: GuideLocale;
}

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  Sprout,
  ShieldAlert,
  Castle,
  Flame,
  CalendarClock,
  ShoppingBag,
  Swords,
  Sparkles,
  Table2,
};

export function GuidesHubSidebar({
  categories,
  activeSectionId,
  onSelectSection,
  locale,
}: GuidesHubSidebarProps) {
  const handleScrollToSection = (sectionId: string) => {
    if (onSelectSection) {
      onSelectSection(sectionId);
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <aside
      data-testid="guides-hub-sidebar"
      className="hidden lg:block w-72 shrink-0 sticky top-24 self-start space-y-3"
      aria-label={locale === "vi" ? "Mục lục cẩm nang" : "Guides table of contents"}
    >
      <div className="card-rpg rounded-2xl p-3 border border-border/70 bg-card/80 backdrop-blur space-y-2">
        <div className="flex items-center gap-2 px-3 py-2 text-xs font-heading font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 border-b border-border/60">
          <BookOpen className="h-4 w-4" />
          <span>{locale === "vi" ? "Mục Lục Chuyên Đề" : "Topic Directory"}</span>
        </div>

        <nav className="space-y-1">
          {categories.map((category, index) => {
            const sectionId = `sec-${category.displayOrder ?? index + 1}`;
            const isActive = activeSectionId === sectionId;
            const IconComponent =
              CATEGORY_ICONS[category.iconName] ?? BookOpen;

            return (
              <button
                key={category.slug}
                type="button"
                onClick={() => handleScrollToSection(sectionId)}
                className={cn(
                  "w-full flex items-center justify-between gap-2.5 px-3 py-2.5 rounded-xl text-left text-xs sm:text-sm font-sans transition-all min-h-[44px]",
                  isActive
                    ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/30 shadow-xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40 font-medium"
                )}
                aria-current={isActive ? "true" : undefined}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <IconComponent
                    className={cn(
                      "h-4 w-4 shrink-0 transition-colors",
                      isActive
                        ? "text-amber-500"
                        : "text-muted-foreground"
                    )}
                  />
                  <span className="truncate">
                    {category.title[locale]}
                  </span>
                </div>

                <span
                  className={cn(
                    "text-xs font-mono shrink-0 px-1.5 py-0.5 rounded-md",
                    isActive
                      ? "bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold"
                      : "text-muted-foreground/80 bg-muted/50"
                  )}
                >
                  {category.articles.length}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

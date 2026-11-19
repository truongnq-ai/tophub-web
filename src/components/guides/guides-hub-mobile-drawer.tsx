"use client";

import React, { useState } from "react";
import {
  ListFilter,
  X,
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
  GuideLocale,
} from "@/content/guides/types";
import { cn } from "@/lib/utils";

interface GuidesHubMobileDrawerProps {
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

export function GuidesHubMobileDrawer({
  categories,
  activeSectionId,
  onSelectSection,
  locale,
}: GuidesHubMobileDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (sectionId: string) => {
    setIsOpen(false);
    if (onSelectSection) {
      onSelectSection(sectionId);
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* Floating Action Button (FAB) on Mobile */}
      <div className="fixed bottom-6 right-6 z-40 lg:hidden">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          data-testid="guides-mobile-drawer-trigger"
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-amber-500 text-slate-950 font-heading font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/30 hover:bg-amber-400 active:scale-95 transition-all min-h-[44px]"
          aria-label={locale === "vi" ? "Mở danh mục cẩm nang" : "Open topic directory"}
        >
          <ListFilter className="h-4 w-4" />
          <span>{locale === "vi" ? "9 Mục Cẩm Nang" : "9 Topics"}</span>
        </button>
      </div>

      {/* Backdrop & Bottom Sheet Modal */}
      {isOpen && (
        <div
          data-testid="guides-mobile-drawer-sheet"
          className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-h-[80vh] overflow-y-auto rounded-t-3xl border-t border-border/80 bg-background/95 p-4 sm:p-6 space-y-4 shadow-2xl backdrop-blur-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-border/60">
              <div className="flex items-center gap-2 text-sm font-heading font-black uppercase text-amber-600 dark:text-amber-400">
                <BookOpen className="h-4 w-4" />
                <span>{locale === "vi" ? "Mục Lục Chuyên Đề" : "Topic Directory"}</span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/40 min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
                aria-label={locale === "vi" ? "Đóng" : "Close"}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="space-y-1.5 py-1">
              {categories.map((category, index) => {
                const sectionId = `sec-${category.displayOrder ?? index + 1}`;
                const isActive = activeSectionId === sectionId;
                const IconComponent =
                  CATEGORY_ICONS[category.iconName] ?? BookOpen;

                return (
                  <button
                    key={category.slug}
                    type="button"
                    onClick={() => handleSelect(sectionId)}
                    className={cn(
                      "w-full flex items-center justify-between gap-3 px-3.5 py-3 rounded-2xl text-left text-sm font-sans transition-all min-h-[44px]",
                      isActive
                        ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/30"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/40 font-medium"
                    )}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <IconComponent
                        className={cn(
                          "h-4 w-4 shrink-0",
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
                        "text-xs font-mono shrink-0 px-2 py-0.5 rounded-full",
                        isActive
                          ? "bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold"
                          : "text-muted-foreground/80 bg-muted/60"
                      )}
                    >
                      {category.articles.length} bài
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Crown, ListTree } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { GuideArticle, GuideLocale } from "@/content/guides/types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GuidesTocProps {
  article?: GuideArticle;
}

interface FlattenedTocSection {
  id: string;
  title: string;
  isPro: boolean;
  subSections: Array<{
    id: string;
    title: string;
  }>;
}

function useArticleScrollSpy(sectionIds: string[]) {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? "");
  const [progress, setProgress] = useState<number>(0);

  // GAP-05 Fix: Reset activeId whenever article changes and previous activeId is no longer in sectionIds
  useEffect(() => {
    if (sectionIds.length > 0 && !sectionIds.includes(activeId)) {
      setActiveId(sectionIds[0]);
      setProgress(0);
    }
  }, [sectionIds, activeId]);

  useEffect(() => {
    if (typeof window === "undefined" || sectionIds.length === 0) return;

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0 || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top
          );

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-96px 0px -65% 0px",
        threshold: [0, 1],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let rafId = 0;
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setProgress(0);
        return;
      }

      // GAP-06 Fix: Clamp to 100% and highlight last anchor when scrolled to bottom
      if (scrollTop >= docHeight - 24) {
        setProgress(100);
        if (sectionIds.length > 0) {
          setActiveId(sectionIds[sectionIds.length - 1]);
        }
        return;
      }

      const pct = Math.min(
        100,
        Math.max(0, Math.round((scrollTop / docHeight) * 100))
      );
      setProgress(pct);
    };

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [sectionIds]);

  return { activeId, setActiveId, progress };
}

function buildTocSections(
  article: GuideArticle | undefined,
  locale: GuideLocale
): FlattenedTocSection[] {
  if (!article) return [];
  const raw = [
    ...article.freeSections.map((s) => ({ ...s, isPro: false })),
    ...article.proSections.map((s) => ({ ...s, isPro: true })),
  ];
  return raw.map((sec) => ({
    id: sec.id,
    title: sec.title[locale],
    isPro: sec.isPro,
    subSections: (sec.subSections ?? []).map((sub) => ({
      id: sub.id,
      title: sub.title[locale],
    })),
  }));
}

export function GuidesToc({ article }: GuidesTocProps) {
  const t = useTranslations("Guides");
  const rawLocale = useLocale();
  const locale: GuideLocale = rawLocale === "en" ? "en" : "vi";
  const [mobilePopoverOpen, setMobilePopoverOpen] = useState(false);
  const desktopTocContainerRef = useRef<HTMLDivElement | null>(null);

  const sections = useMemo(
    () => buildTocSections(article, locale),
    [article, locale]
  );

  const allAnchorIds = useMemo(
    () =>
      sections.flatMap((sec) => [
        sec.id,
        ...sec.subSections.map((sub) => sub.id),
      ]),
    [sections]
  );

  const { activeId, setActiveId, progress } = useArticleScrollSpy(allAnchorIds);

  // GAP-07 Fix: Keep active TOC item visible inside scrollable desktop TOC container
  useEffect(() => {
    const container = desktopTocContainerRef.current;
    if (!container || !activeId) return;
    const activeEl = container.querySelector<HTMLElement>(
      `[data-toc-id="${activeId}"]`
    );
    if (!activeEl) return;

    const containerRect = container.getBoundingClientRect();
    const activeRect = activeEl.getBoundingClientRect();
    const isAbove = activeRect.top < containerRect.top + 32;
    const isBelow = activeRect.bottom > containerRect.bottom - 32;

    if (isAbove || isBelow) {
      const targetScrollTop = Math.max(
        0,
        container.scrollTop +
          (activeRect.top - containerRect.top) -
          containerRect.height / 2
      );
      if (typeof container.scrollTo === "function") {
        container.scrollTo({
          top: targetScrollTop,
          behavior: "smooth",
        });
      } else {
        container.scrollTop = targetScrollTop;
      }
    }
  }, [activeId]);

  if (!article || sections.length === 0) {
    return null;
  }

  return (
    <aside className="w-full xl:w-56 shrink-0 xl:order-2 sticky top-16 xl:static z-30 xl:z-auto">
      {/* 1. Mobile & Tablet Sticky Sub-Header TOC Bar (< 1280px) */}
      <div className="xl:hidden rounded-2xl border border-border/80 bg-card/90 backdrop-blur-md px-3 py-2 shadow-sm">
        <div className="flex items-center justify-between gap-2">
          <Popover open={mobilePopoverOpen} onOpenChange={setMobilePopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                aria-label={t("mobileTocBtn")}
                className="h-9 px-2.5 text-xs font-heading font-bold text-foreground hover:text-amber-500 flex items-center gap-1.5"
              >
                <ListTree className="h-4 w-4 text-amber-500 shrink-0" />
                <span>{t("mobileTocBtn")}</span>
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              className="w-[300px] sm:w-[360px] max-h-[65vh] overflow-y-auto rounded-2xl border-border/80 bg-card/95 backdrop-blur-xl p-3.5"
            >
              <p className="text-[11px] font-heading font-bold uppercase tracking-wider text-amber-500 mb-2">
                {t("onThisPage")}
              </p>
              <ul className="space-y-1.5 text-xs">
                {sections.map((sec) => {
                  const isSecActive = activeId === sec.id;
                  return (
                    <li key={sec.id} className="space-y-1">
                      <a
                        href={`#${sec.id}`}
                        onClick={() => {
                          setActiveId(sec.id);
                          setMobilePopoverOpen(false);
                        }}
                        className={cn(
                          "flex items-start justify-between gap-2 rounded-lg px-2 py-1.5 transition-colors leading-snug",
                          isSecActive
                            ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 font-bold"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        <span className="line-clamp-2">{sec.title}</span>
                        {sec.isPro && (
                          <Crown className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
                        )}
                      </a>
                      {sec.subSections.length > 0 && (
                        <ul className="pl-3 border-l border-border/70 space-y-1 ml-2">
                          {sec.subSections.map((sub) => {
                            const isSubActive = activeId === sub.id;
                            return (
                              <li key={sub.id}>
                                <a
                                  href={`#${sub.id}`}
                                  onClick={() => {
                                    setActiveId(sub.id);
                                    setMobilePopoverOpen(false);
                                  }}
                                  className={cn(
                                    "block rounded-md px-2 py-1 text-[11px] transition-colors line-clamp-1",
                                    isSubActive
                                      ? "text-amber-500 font-bold bg-amber-500/10"
                                      : "text-muted-foreground/85 hover:text-foreground"
                                  )}
                                >
                                  {sub.title}
                                </a>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </PopoverContent>
          </Popover>

          <div className="flex items-center gap-2 shrink-0">
            <div className="w-20 h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-amber-500 transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="font-mono text-[11px] font-bold text-amber-600 dark:text-amber-400 w-9 text-right">
              {progress}%
            </span>
          </div>
        </div>
      </div>

      {/* 2. Desktop Right Rail Scroll-Spy TOC (>= 1280px) */}
      <div className="hidden xl:block sticky top-20 space-y-3">
        <div
          ref={desktopTocContainerRef}
          className="rounded-2xl border border-border/80 bg-card/55 p-4 space-y-3.5 max-h-[calc(100vh-7rem)] overflow-y-auto"
        >
          {/* Reading Progress Header */}
          <div className="space-y-1.5 pb-2.5 border-b border-border/60">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-mono text-muted-foreground">
                {t("readingProgressLabel")}
              </span>
              <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                {progress}%
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <h4 className="flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-foreground">
            <ListTree className="h-4 w-4 text-amber-500" />
            <span>{t("onThisPage")}</span>
          </h4>

          <ul className="space-y-2 text-xs">
            {sections.map((sec) => {
              const isSecActive =
                activeId === sec.id ||
                sec.subSections.some((sub) => sub.id === activeId);

              return (
                <li key={sec.id} className="space-y-1">
                  <a
                    href={`#${sec.id}`}
                    data-toc-id={sec.id}
                    onClick={() => setActiveId(sec.id)}
                    className={cn(
                      "flex items-start justify-between gap-2 rounded-lg px-2 py-1 transition-colors leading-snug",
                      activeId === sec.id
                        ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 font-bold"
                        : isSecActive
                          ? "text-foreground font-semibold"
                          : "text-muted-foreground hover:text-amber-500 dark:hover:text-amber-400 font-medium"
                    )}
                  >
                    <span className="line-clamp-2">{sec.title}</span>
                    {sec.isPro && (
                      <Crown className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
                    )}
                  </a>

                  {sec.subSections.length > 0 && (
                    <ul className="pl-2.5 border-l border-border/70 space-y-1 ml-2">
                      {sec.subSections.map((sub) => {
                        const isSubActive = activeId === sub.id;
                        return (
                          <li key={sub.id}>
                            <a
                              href={`#${sub.id}`}
                              data-toc-id={sub.id}
                              onClick={() => setActiveId(sub.id)}
                              className={cn(
                                "block rounded-md px-2 py-0.5 text-[11px] transition-colors line-clamp-1",
                                isSubActive
                                  ? "border-l-2 border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold"
                                  : "text-muted-foreground/85 hover:text-amber-500 dark:hover:text-amber-400"
                              )}
                            >
                              {sub.title}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </aside>
  );
}

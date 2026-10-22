"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Crown, ListTree, Sparkles, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { GuideArticle, GuideLocale } from "@/content/guides/types";
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
          .filter(
            (entry) =>
              entry.isIntersecting &&
              !entry.target.closest('[data-tab-hidden="true"]')
          )
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

      // GAP-06 & GAP-P2-11 Fix: Clamp to 100% and highlight last visible anchor when scrolled to bottom
      if (scrollTop >= docHeight - 24) {
        setProgress(100);
        if (sectionIds.length > 0) {
          const visibleIds = sectionIds.filter((id) => {
            const el = document.getElementById(id);
            return el && !el.closest('[data-tab-hidden="true"]');
          });
          const lastId =
            visibleIds[visibleIds.length - 1] ??
            sectionIds[sectionIds.length - 1];
          setActiveId(lastId);
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

  // Synchronize activeId immediately when the user switches Article View Mode Tabs
  useEffect(() => {
    if (typeof window === "undefined" || sectionIds.length === 0) return;

    const handleTabChange = () => {
      const syncFirstVisible = () => {
        const currentEl = activeId ? document.getElementById(activeId) : null;
        if (!currentEl || currentEl.closest('[data-tab-hidden="true"]')) {
          const firstVisibleId = sectionIds.find((id) => {
            const el = document.getElementById(id);
            return Boolean(el && !el.closest('[data-tab-hidden="true"]'));
          });
          if (firstVisibleId) {
            setActiveId(firstVisibleId);
          }
        }
      };
      syncFirstVisible();
      requestAnimationFrame(syncFirstVisible);
    };

    window.addEventListener("tophub:tab-change", handleTabChange);
    return () => {
      window.removeEventListener("tophub:tab-change", handleTabChange);
    };
  }, [sectionIds, activeId]);

  return { activeId, setActiveId, progress };
}

export function sanitizeTocTitle(raw: string): string {
  return raw.replace(/(\*\*|`)/g, "").trim();
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
    title: sanitizeTocTitle(sec.title[locale]),
    isPro: sec.isPro,
    subSections: (sec.subSections ?? []).map((sub) => ({
      id: sub.id,
      title: sanitizeTocTitle(sub.title[locale]),
    })),
  }));
}

export function GuidesToc({ article }: GuidesTocProps) {
  const t = useTranslations("Guides");
  const rawLocale = useLocale();
  const locale: GuideLocale = rawLocale === "en" ? "en" : "vi";

  const [isOpen, setIsOpen] = useState(false);
  const [ignitedSectionTitle, setIgnitedSectionTitle] = useState<string | null>(
    null
  );

  const rootRef = useRef<HTMLDivElement | null>(null);
  const tocListRef = useRef<HTMLDivElement | null>(null);
  const prevArticleKeyRef = useRef<string>("");
  const prevParentSectionIdRef = useRef<string>("");

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

  const activeParentSection = useMemo(() => {
    return (
      sections.find(
        (sec) =>
          sec.id === activeId ||
          sec.subSections.some((sub) => sub.id === activeId)
      ) ?? sections[0]
    );
  }, [sections, activeId]);

  // GAP-v31-03 Fix: Trigger 1.8s Neon Ignition Toast only when scrolling into a new section within the same article
  useEffect(() => {
    if (!article || !activeParentSection) return;
    const articleKey = `${article.categorySlug}/${article.slug}`;

    if (prevArticleKeyRef.current !== articleKey) {
      prevArticleKeyRef.current = articleKey;
      prevParentSectionIdRef.current = activeParentSection.id;
      setIgnitedSectionTitle(null);
      return;
    }

    if (prevParentSectionIdRef.current !== activeParentSection.id) {
      prevParentSectionIdRef.current = activeParentSection.id;
      if (typeof window !== "undefined" && window.scrollY > 40) {
        setIgnitedSectionTitle(activeParentSection.title);
        const timer = window.setTimeout(() => {
          setIgnitedSectionTitle(null);
        }, 1800);
        return () => window.clearTimeout(timer);
      }
    }
  }, [article, activeParentSection]);

  // Auto-scroll active item inside open TOC panel
  useEffect(() => {
    if (!isOpen) return;
    const container = tocListRef.current;
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
  }, [activeId, isOpen]);

  // Close panel on Escape or outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handlePointerDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousedown", handlePointerDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handlePointerDown);
    };
  }, [isOpen]);

  if (!article || sections.length === 0) {
    return null;
  }

  const isIgniting = Boolean(ignitedSectionTitle);

  return (
    <div ref={rootRef} className="print:hidden">
      {/* 1. Scroll-Tracking Neon Shuttle Bubble (Moves vertically along right edge with reading progress) */}
      <div
        style={{
          top: `clamp(96px, calc(14vh + ${progress * 0.7}vh), calc(100vh - 96px))`,
        }}
        className="fixed right-2.5 sm:right-4 z-40 flex items-center gap-2 transition-[top] duration-200 ease-out motion-reduce:transition-none"
      >
        {/* 1.8s Section Ignition Neon Toast (Unfurls to the left when entering a new section) */}
        {ignitedSectionTitle && !isOpen && (
          <div
            role="status"
            aria-live="polite"
            className="pointer-events-none hidden sm:flex items-center gap-2 max-w-[260px] rounded-full border border-amber-400/80 bg-slate-950/90 dark:bg-slate-950/95 px-3.5 py-1.5 text-xs text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.45)] backdrop-blur-xl animate-in fade-in slide-in-from-right-2 duration-200"
          >
            <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_10px_#f59e0b,0_0_18px_#f59e0b] animate-ping shrink-0" />
            <span className="truncate font-heading font-bold">
              {ignitedSectionTitle}
            </span>
          </div>
        )}

        {/* Main Neon Shuttle Button + Mini Section LED Track */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={t("neonShuttleAria")}
          aria-expanded={isOpen}
          title={
            activeParentSection
              ? `${activeParentSection.title} (${progress}%)`
              : t("neonShuttleAria")
          }
          className={cn(
            "group relative flex flex-col items-center justify-center gap-1.5 min-w-[46px] min-h-[54px] rounded-2xl border px-2 py-2 backdrop-blur-xl transition-all duration-200 cursor-pointer select-none",
            isOpen || isIgniting
              ? "border-amber-400 bg-slate-950/95 text-amber-300 shadow-[0_0_24px_rgba(245,158,11,0.65)] ring-2 ring-amber-400/50"
              : "border-amber-500/45 bg-card/90 dark:bg-slate-950/85 text-foreground hover:border-amber-400 hover:shadow-[0_0_18px_rgba(245,158,11,0.4)] shadow-md"
          )}
        >
          {/* Neon Bulb Icon + Progress % */}
          <div className="flex items-center gap-1">
            <Sparkles
              className={cn(
                "h-3.5 w-3.5 transition-all",
                isOpen || isIgniting
                  ? "text-amber-300 drop-shadow-[0_0_8px_rgba(245,158,11,0.95)]"
                  : "text-amber-500 group-hover:text-amber-400"
              )}
            />
            <span
              className={cn(
                "font-mono text-[11px] font-extrabold tracking-tight",
                isOpen || isIgniting
                  ? "text-amber-300 drop-shadow-[0_0_6px_rgba(245,158,11,0.8)]"
                  : "text-amber-600 dark:text-amber-400"
              )}
            >
              {progress}%
            </span>
          </div>

          {/* Mini Section LED Bulbs (Active section glows neon, others are dimmed) */}
          <div className="flex items-center gap-1">
            {sections.map((sec) => {
              const isParentActive = activeParentSection?.id === sec.id;
              return (
                <span
                  key={sec.id}
                  className={cn(
                    "rounded-full transition-all duration-200",
                    isParentActive
                      ? "h-1.5 w-3 bg-amber-400 shadow-[0_0_8px_#f59e0b,0_0_14px_#f59e0b]"
                      : "h-1.5 w-1.5 bg-muted-foreground/30"
                  )}
                />
              );
            })}
          </div>
        </button>
      </div>

      {/* 2. Clamped Floating Neon TOC Panel (GAP-v31-04 Safe Viewport Rail) */}
      {isOpen && (
        <aside
          aria-label={t("onThisPage")}
          className="fixed right-14 sm:right-20 top-20 z-50 w-[min(290px,calc(100vw-4.25rem))] sm:w-[340px] max-h-[calc(100vh-6rem)] flex flex-col rounded-2xl border border-amber-500/40 bg-card/95 dark:bg-slate-950/95 backdrop-blur-2xl shadow-[0_0_35px_rgba(245,158,11,0.22)] overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        >
          {/* Reading Progress Header */}
          <div className="p-3.5 border-b border-border/60 space-y-2 shrink-0">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <ListTree className="h-4 w-4 text-amber-500" />
                <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-foreground">
                  {t("onThisPage")}
                </h4>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] text-muted-foreground">
                  {t("readingProgressLabel")}
                </span>
                <span className="font-mono text-xs font-extrabold text-amber-500 drop-shadow-[0_0_6px_rgba(245,158,11,0.5)]">
                  {progress}%
                </span>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close TOC"
                  className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 shadow-[0_0_10px_#f59e0b] transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Scrollable Section List with Neon Bulb Active Glow & Dimmed Inactive Items */}
          <div
            ref={tocListRef}
            className="p-3.5 overflow-y-auto space-y-2 text-xs"
          >
            <ul className="space-y-2">
              {sections.map((sec) => {
                const isSecActive =
                  activeId === sec.id ||
                  sec.subSections.some((sub) => sub.id === activeId);

                return (
                  <li key={sec.id} className="space-y-1">
                    <a
                      href={`#${sec.id}`}
                      data-toc-id={sec.id}
                      data-neon-active={isSecActive ? "true" : "false"}
                      onClick={() => {
                        setActiveId(sec.id);
                        setIsOpen(false);
                        if (typeof window !== "undefined") {
                          window.dispatchEvent(
                            new CustomEvent("tophub:toc-navigate", {
                              detail: { targetId: sec.id },
                            })
                          );
                        }
                      }}
                      className={cn(
                        "flex items-start justify-between gap-2 rounded-xl px-2.5 py-2 transition-all duration-200 leading-snug border",
                        isSecActive
                          ? "opacity-100 border-amber-400/80 bg-amber-500/15 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold shadow-[0_0_18px_rgba(245,158,11,0.32)]"
                          : "opacity-35 hover:opacity-100 focus-visible:opacity-100 border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/40 font-medium"
                      )}
                    >
                      <div className="flex items-start gap-2 min-w-0">
                        <span
                          className={cn(
                            "mt-1.5 h-2 w-2 rounded-full shrink-0 transition-all",
                            isSecActive
                              ? "bg-amber-400 shadow-[0_0_8px_#f59e0b,0_0_16px_#f59e0b] animate-pulse"
                              : "bg-muted-foreground/40"
                          )}
                        />
                        <span className="line-clamp-2">{sec.title}</span>
                      </div>
                      {sec.isPro && (
                        <Crown className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
                      )}
                    </a>

                    {sec.subSections.length > 0 && (
                      <ul
                        className={cn(
                          "pl-3 border-l space-y-1 ml-3 transition-opacity duration-200",
                          isSecActive
                            ? "border-amber-500/50 opacity-100"
                            : "border-border/50 opacity-35 hover:opacity-100"
                        )}
                      >
                        {sec.subSections.map((sub) => {
                          const isSubActive = activeId === sub.id;
                          return (
                            <li key={sub.id}>
                              <a
                                href={`#${sub.id}`}
                                data-toc-id={sub.id}
                                data-neon-active={isSubActive ? "true" : "false"}
                                onClick={() => {
                                  setActiveId(sub.id);
                                  setIsOpen(false);
                                  if (typeof window !== "undefined") {
                                    window.dispatchEvent(
                                      new CustomEvent("tophub:toc-navigate", {
                                        detail: { targetId: sub.id },
                                      })
                                    );
                                  }
                                }}
                                className={cn(

                                  "flex items-center gap-1.5 rounded-lg px-2 py-1 text-[11px] transition-all duration-200 line-clamp-1",
                                  isSubActive
                                    ? "bg-amber-500/15 text-amber-700 dark:text-amber-300 font-bold border border-amber-400/60 shadow-[0_0_12px_rgba(245,158,11,0.28)]"
                                    : "text-muted-foreground hover:text-foreground"
                                )}
                              >
                                <span
                                  className={cn(
                                    "h-1.5 w-1.5 rounded-full shrink-0",
                                    isSubActive
                                      ? "bg-amber-400 shadow-[0_0_6px_#f59e0b]"
                                      : "bg-muted-foreground/30"
                                  )}
                                />
                                <span className="truncate">{sub.title}</span>
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
        </aside>
      )}
    </div>
  );
}

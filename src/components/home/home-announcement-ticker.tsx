"use client";

import React from "react";
import { Megaphone, BookOpen, ArrowRight, Sparkles } from "lucide-react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import {
  getActiveAnnouncements,
  type SystemAnnouncement,
} from "@/config/announcements";
import { cn } from "@/lib/utils";

interface HomeAnnouncementTickerProps {
  locale?: "vi" | "en";
  announcements?: SystemAnnouncement[];
  className?: string;
}

export function HomeAnnouncementTicker({
  locale: propLocale,
  announcements,
  className,
}: HomeAnnouncementTickerProps) {
  const rawLocale = useLocale();
  const safeLocale: "vi" | "en" =
    propLocale ?? (rawLocale === "en" ? "en" : "vi");

  const activeList = announcements ?? getActiveAnnouncements();
  if (activeList.length === 0) {
    return null;
  }

  const primary = activeList[0]!;
  const compactMobileBadge = safeLocale === "en" ? "NEW" : "MỚI";

  const renderTrackItems = (isClone: boolean) => (
    <div
      data-testid={
        isClone ? "announcement-track-clone" : "announcement-track-primary"
      }
      aria-hidden={isClone ? "true" : undefined}
      className="flex shrink-0 items-center gap-8 pr-8"
    >
      {activeList.map((item) => (
        <span
          key={`${item.id}-${isClone ? "clone" : "main"}`}
          className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-medium text-foreground/95 whitespace-nowrap"
        >
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-amber-500/20 border border-amber-500/40 text-amber-600 dark:text-amber-400 shrink-0">
            <BookOpen
              data-testid="announcement-book-icon"
              className="h-3.5 w-3.5"
            />
          </span>
          <span>{item.message[safeLocale]}</span>
          <Sparkles className="h-3.5 w-3.5 text-amber-500 shrink-0" />
        </span>
      ))}
    </div>
  );

  return (
    <div
      data-testid="home-announcement-ticker"
      role="region"
      aria-label={
        safeLocale === "en" ? "System Announcement" : "Thông báo hệ thống"
      }
      className={cn(
        "w-full border-b border-amber-500/30 bg-gradient-to-r from-amber-500/15 via-amber-500/[0.07] to-amber-500/15 backdrop-blur-md",
        className
      )}
    >
      <Link
        href={primary.href}
        className="group container mx-auto max-w-7xl px-3 sm:px-6 h-10 sm:h-11 flex items-center justify-between gap-2.5 sm:gap-4 overflow-hidden cursor-pointer"
      >
        {/* Left Fixed Loudspeaker Badge (Compact on 320px Mobile per GAP-07) */}
        <div className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 px-2.5 py-0.5 text-[10px] sm:text-[11px] font-heading font-black tracking-wide uppercase shadow-sm shadow-amber-500/20 shrink-0">
          <Megaphone
            data-testid="announcement-megaphone-icon"
            className="h-3.5 w-3.5 fill-current animate-pulse shrink-0"
          />
          <span className="sm:hidden">{compactMobileBadge}</span>
          <span className="hidden sm:inline">{primary.badge[safeLocale]}</span>
        </div>

        {/* Center Right-to-Left Marquee Viewport (Pauses on Hover/Touch per DEC-QW-01) */}
        <div className="relative flex-1 overflow-hidden mask-linear-fade">
          <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] group-focus-visible:[animation-play-state:paused] active:[animation-play-state:paused] motion-reduce:animate-none">
            {renderTrackItems(false)}
            {renderTrackItems(true)}
          </div>
        </div>

        {/* Right Quick Action CTA */}
        <div className="flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 group-hover:bg-amber-500 group-hover:text-slate-950 px-2 sm:px-3 py-1 text-[11px] font-heading font-bold text-amber-600 dark:text-amber-400 transition-all shrink-0">
          <BookOpen className="hidden sm:inline-block h-3.5 w-3.5 shrink-0" />
          <span className="hidden sm:inline">{primary.ctaLabel[safeLocale]}</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </div>
      </Link>
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import {
  getActiveAnnouncements,
  resolveAnnouncementVisualKind,
  type SystemAnnouncement,
} from "@/config/announcements";
import {
  AnnouncementContextIcon,
  GameBroadcastBellIcon,
} from "@/components/home/announcement-game-icons";
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

  const activeList =
    announcements !== undefined
      ? getActiveAnnouncements(new Date(), announcements)
      : getActiveAnnouncements();

  const [spotIndex, setSpotIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (spotIndex >= activeList.length && activeList.length > 0) {
      setSpotIndex(0);
    }
  }, [activeList.length, spotIndex]);

  useEffect(() => {
    if (activeList.length <= 1 || isPaused) return;
    const timer = setInterval(() => {
      setSpotIndex((prev) => (prev + 1) % activeList.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [activeList.length, isPaused]);

  if (activeList.length === 0) {
    return null;
  }

  const spotItem = activeList[spotIndex] ?? activeList[0]!;
  const spotVisualKind = resolveAnnouncementVisualKind(spotItem);
  const compactMobileBadge = safeLocale === "en" ? "NEW" : "MỚI";

  const renderTrackItems = (isClone: boolean) => (
    <div
      data-testid={
        isClone ? "announcement-track-clone" : "announcement-track-primary"
      }
      aria-hidden={isClone ? "true" : undefined}
      className="flex shrink-0 items-center gap-8 pr-8"
    >
      {activeList.map((item, idx) => {
        const itemKind = resolveAnnouncementVisualKind(item);
        return (
          <span
            key={`${item.id}-${isClone ? "clone" : "main"}`}
            onMouseEnter={() => setSpotIndex(idx)}
            className="inline-flex items-center gap-2.5 text-sm font-sans font-medium text-foreground/95 whitespace-nowrap"
          >
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-amber-500/25 via-amber-500/15 to-yellow-500/25 border border-amber-500/45 text-amber-600 dark:text-amber-400 shadow-sm shrink-0">
              <AnnouncementContextIcon
                kind={itemKind}
                className="h-3.5 w-3.5"
              />
            </span>
            <span>{item.message[safeLocale]}</span>
            <Sparkles className="h-3.5 w-3.5 text-amber-500 animate-pulse motion-reduce:animate-none shrink-0" />
          </span>
        );
      })}
    </div>
  );

  return (
    <div
      data-testid="home-announcement-ticker"
      role="region"
      aria-label={
        safeLocale === "en" ? "System Announcement" : "Thông báo hệ thống"
      }
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={cn(
        "relative w-full border-b border-amber-500/35 bg-gradient-to-r from-amber-500/20 via-amber-500/[0.08] to-amber-500/20 backdrop-blur-md",
        className
      )}
    >
      <Link
        href={spotItem.href}
        className="group container mx-auto max-w-7xl px-3 sm:px-6 h-11 min-h-[44px] flex items-center justify-between gap-2.5 sm:gap-4 overflow-hidden cursor-pointer"
      >
        {/* Left RPG Broadcast Bell / Loudspeaker Badge */}
        <div
          data-testid="announcement-left-badge"
          className="relative flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 px-2.5 sm:px-3 py-1 text-xs font-heading font-black tracking-wide uppercase shadow-sm shadow-amber-500/30 ring-1 ring-amber-300/60 shrink-0"
        >
          <GameBroadcastBellIcon
            data-testid="announcement-megaphone-icon"
            className="h-3.5 w-3.5"
          />
          <span className="sm:hidden">{compactMobileBadge}</span>
          <span className="hidden sm:inline">{spotItem.badge[safeLocale]}</span>
        </div>

        {/* Center Right-to-Left Marquee Viewport */}
        <div className="relative flex-1 overflow-hidden mask-linear-fade">
          <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] group-focus-visible:[animation-play-state:paused] active:[animation-play-state:paused] motion-reduce:animate-none">
            {renderTrackItems(false)}
            {renderTrackItems(true)}
          </div>
        </div>

        {/* Right Contextual Game Action CTA (Calculator jumping numbers / Open Book / Gift / Trophy) */}
        <div
          data-testid="announcement-right-cta"
          className="flex items-center gap-1.5 rounded-full border border-amber-500/45 bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-amber-500/20 group-hover:from-amber-500 group-hover:to-amber-400 group-hover:text-slate-950 px-2.5 sm:px-3 py-1 text-xs font-heading font-bold text-amber-700 dark:text-amber-300 shadow-sm transition-all shrink-0"
        >
          <AnnouncementContextIcon
            kind={spotVisualKind}
            showLiveDigits={spotVisualKind === "calculator"}
            className="h-3.5 w-3.5 shrink-0"
          />
          <span className="hidden sm:inline">
            {spotItem.ctaLabel[safeLocale]}
          </span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 shrink-0" />
        </div>
      </Link>
    </div>
  );
}

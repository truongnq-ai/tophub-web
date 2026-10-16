import React from "react";
import {
  PlayCircle,
  Camera,
  Shield,
  CheckCircle2,
  XCircle,
  Info,
  ExternalLink,
  Clock,
} from "lucide-react";
import type {
  GuideLocale,
  GuideMediaSpotlightBlock,
} from "@/content/guides/types";
import { Badge } from "@/components/ui/badge";

interface MediaSpotlightBlockProps {
  block: GuideMediaSpotlightBlock;
  locale: GuideLocale;
}

export function MediaSpotlightBlock({
  block,
  locale,
}: MediaSpotlightBlockProps) {
  if (block.tier === "tier1_faction_loop") {
    return (
      <div className="rounded-2xl border border-amber-500/30 bg-card/80 p-4 sm:p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-amber-500" />
            <h4 className="font-heading font-bold text-sm sm:text-base text-foreground">
              {block.title[locale]}
            </h4>
          </div>
          <Badge variant="outline" className="font-mono text-[10px]">
            {block.mediaCode} • Tier 1 Visual
          </Badge>
        </div>

        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {block.description[locale]}
        </p>

        {/* 3-Faction Counter Cycle Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 p-3.5 space-y-1">
            <span className="font-heading font-black text-sm text-rose-600 dark:text-rose-400">
              🔴 {locale === "en" ? "Horde" : "Bộ Lạc (Horde)"}
            </span>
            <p className="text-xs text-foreground/90 font-medium">
              {locale === "en"
                ? "Counters League (+20% DMG Dealt / -20% DMG Taken)"
                : "Khắc chế cứng Liên Minh (+20% Sát thương / -20% Nhận vào)"}
            </p>
          </div>

          <div className="rounded-xl border border-sky-500/40 bg-sky-500/10 p-3.5 space-y-1">
            <span className="font-heading font-black text-sm text-sky-600 dark:text-sky-400">
              🔵 {locale === "en" ? "League" : "Liên Minh (League)"}
            </span>
            <p className="text-xs text-foreground/90 font-medium">
              {locale === "en"
                ? "Counters Nature (+20% DMG Dealt / -20% DMG Taken)"
                : "Khắc chế cứng Thiên Nhiên (+20% Sát thương / -20% Nhận vào)"}
            </p>
          </div>

          <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3.5 space-y-1">
            <span className="font-heading font-black text-sm text-emerald-600 dark:text-emerald-400">
              🟢 {locale === "en" ? "Nature" : "Thiên Nhiên (Nature)"}
            </span>
            <p className="text-xs text-foreground/90 font-medium">
              {locale === "en"
                ? "Counters Horde (+20% DMG Dealt / -20% DMG Taken)"
                : "Khắc chế cứng Bộ Lạc (+20% Sát thương / -20% Nhận vào)"}
            </p>
          </div>
        </div>

        {/* Faction Aura Milestones */}
        <div className="grid grid-cols-3 gap-2 pt-1 text-center">
          <div className="rounded-lg border border-border/70 bg-background/70 p-2">
            <span className="block font-mono text-xs font-bold text-amber-500">
              4 {locale === "en" ? "Same Faction" : "Tướng cùng hệ"}
            </span>
            <span className="text-[11px] text-foreground/90">
              +15% ATK & HP
            </span>
          </div>
          <div className="rounded-lg border border-border/70 bg-background/70 p-2">
            <span className="block font-mono text-xs font-bold text-amber-500">
              5 {locale === "en" ? "Same Faction" : "Tướng cùng hệ"}
            </span>
            <span className="text-[11px] text-foreground/90">
              +25% ATK & HP
            </span>
          </div>
          <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 p-2">
            <span className="block font-mono text-xs font-bold text-amber-600 dark:text-amber-400">
              6 {locale === "en" ? "Pure Faction" : "Thuần hệ"}
            </span>
            <span className="text-[11px] font-bold text-foreground">
              +35% ATK & HP
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (block.tier === "tier4_youtube_ref") {
    const fallbackSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
      `${block.videoChannel ?? "Top Heroes"} ${block.videoTitle ?? ""}`
    )}`;
    const safeUrl =
      block.videoUrl && block.videoUrl.startsWith("https://")
        ? block.videoUrl
        : fallbackSearchUrl;

    return (
      <div className="rounded-2xl border border-rose-500/30 bg-gradient-to-r from-rose-500/10 via-card to-card p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30 font-mono text-[10px]">
              <PlayCircle className="h-3 w-3 mr-1" />
              {block.mediaCode} • YouTube Reference
            </Badge>
            {block.videoChannel && (
              <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
                {block.videoChannel}
              </span>
            )}
            {block.videoTimestamp && (
              <span className="inline-flex items-center gap-1 rounded-md bg-background/80 border border-border/70 px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                <Clock className="h-3 w-3 text-amber-500" />
                {block.videoTimestamp}
              </span>
            )}
          </div>
          <h4 className="font-heading font-bold text-sm sm:text-base text-foreground">
            {block.videoTitle ?? block.title[locale]}
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {block.description[locale]}
          </p>
        </div>

        <a
          href={safeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-rose-500/40 bg-rose-500/15 hover:bg-rose-500/25 px-4 py-2.5 text-xs font-heading font-bold text-rose-600 dark:text-rose-300 transition-colors shrink-0 min-h-[44px]"
        >
          <span>{locale === "en" ? "Watch Reference" : "Xem Video"}</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    );
  }

  // Default: tier2_annotated_ui
  return (
    <div className="rounded-2xl border border-border/80 bg-card/75 p-4 sm:p-5 space-y-3.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Camera className="h-4 w-4 text-amber-500 shrink-0" />
          <h4 className="font-heading font-bold text-sm sm:text-base text-foreground">
            {block.title[locale]}
          </h4>
        </div>
        <Badge variant="outline" className="font-mono text-[10px]">
          {block.mediaCode} • Annotated UI Guide
        </Badge>
      </div>

      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
        {block.description[locale]}
      </p>

      {block.annotations && block.annotations.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          {block.annotations.map((pin, pIdx) => {
            const isDo = pin.kind === "do";
            const isDont = pin.kind === "dont";
            return (
              <div
                key={pIdx}
                className={
                  isDo
                    ? "rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3 space-y-1"
                    : isDont
                      ? "rounded-xl border border-rose-500/40 bg-rose-500/10 p-3 space-y-1"
                      : "rounded-xl border border-sky-500/40 bg-sky-500/10 p-3 space-y-1"
                }
              >
                <div className="flex items-center gap-1.5 text-xs font-heading font-bold">
                  {isDo ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  ) : isDont ? (
                    <XCircle className="h-4 w-4 text-rose-500 shrink-0" />
                  ) : (
                    <Info className="h-4 w-4 text-sky-500 shrink-0" />
                  )}
                  <span
                    className={
                      isDo
                        ? "text-emerald-600 dark:text-emerald-400"
                        : isDont
                          ? "text-rose-600 dark:text-rose-400"
                          : "text-sky-600 dark:text-sky-400"
                    }
                  >
                    {pin.label[locale]}
                  </span>
                </div>
                <p className="text-xs text-foreground/90 leading-relaxed">
                  {pin.detail[locale]}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

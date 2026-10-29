"use client";

import React, { useState } from "react";
import { Shield, Sparkles } from "lucide-react";
import type {
  AssetFaction,
  AssetRarity,
  GameAssetEntry,
} from "@/content/guides/types";
import { cn } from "@/lib/utils";

export type GameAssetFrameSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface GameAssetFrameProps {
  readonly src?: string;
  readonly asset?: GameAssetEntry;
  readonly alt?: string;
  readonly size?: GameAssetFrameSize;
  readonly rarity?: AssetRarity;
  readonly faction?: AssetFaction;
  readonly showFactionBadge?: boolean;
  readonly className?: string;
  readonly imgClassName?: string;
}

const SIZE_CONFIG: Record<
  GameAssetFrameSize,
  {
    readonly px: number;
    readonly boxClass: string;
    readonly radiusClass: string;
    readonly badgeSizePx: number;
    readonly badgeClass: string;
    readonly iconClass: string;
  }
> = {
  xs: {
    px: 16,
    boxClass: "h-4 w-4 shrink-0",
    radiusClass: "rounded",
    badgeSizePx: 8,
    badgeClass: "hidden",
    iconClass: "h-2.5 w-2.5",
  },
  sm: {
    px: 28,
    boxClass: "h-7 w-7 shrink-0",
    radiusClass: "rounded-md",
    badgeSizePx: 11,
    badgeClass: "-top-0.5 -left-0.5 h-3 w-3",
    iconClass: "h-3.5 w-3.5",
  },
  md: {
    px: 40,
    boxClass: "h-10 w-10 shrink-0",
    radiusClass: "rounded-lg",
    badgeSizePx: 14,
    badgeClass: "-top-1 -left-1 h-3.5 w-3.5",
    iconClass: "h-4 w-4",
  },
  lg: {
    px: 56,
    boxClass: "h-14 w-14 shrink-0",
    radiusClass: "rounded-xl",
    badgeSizePx: 16,
    badgeClass: "-top-1 -left-1 h-4 w-4",
    iconClass: "h-5 w-5",
  },
  xl: {
    px: 72,
    boxClass: "h-[72px] w-[72px] shrink-0",
    radiusClass: "rounded-xl",
    badgeSizePx: 18,
    badgeClass: "-top-1 -left-1 h-[18px] w-[18px]",
    iconClass: "h-6 w-6",
  },
};

const RARITY_FRAME_CLASSES: Record<AssetRarity, string> = {
  mythic:
    "border border-rose-500/65 dark:border-rose-400/60 bg-gradient-to-br from-rose-500/25 via-amber-500/12 to-slate-900/10 dark:from-rose-950/85 dark:via-slate-900/90 dark:to-rose-900/55 text-rose-500 dark:text-rose-400 ring-1 ring-inset ring-black/10 dark:ring-white/15 shadow-sm",
  legendary:
    "border border-amber-500/65 dark:border-amber-400/60 bg-gradient-to-br from-amber-500/25 via-yellow-500/12 to-slate-900/10 dark:from-amber-950/85 dark:via-slate-900/90 dark:to-amber-900/55 text-amber-500 dark:text-amber-400 ring-1 ring-inset ring-black/10 dark:ring-white/15 shadow-sm",
  epic:
    "border border-purple-500/60 dark:border-purple-400/60 bg-gradient-to-br from-purple-500/25 via-fuchsia-500/12 to-slate-900/10 dark:from-purple-950/85 dark:via-slate-900/90 dark:to-purple-900/55 text-purple-500 dark:text-purple-400 ring-1 ring-inset ring-black/10 dark:ring-white/15",
  rare:
    "border border-sky-500/60 dark:border-sky-400/60 bg-gradient-to-br from-sky-500/25 via-cyan-500/12 to-slate-900/10 dark:from-sky-950/85 dark:via-slate-900/90 dark:to-sky-900/55 text-sky-500 dark:text-sky-400 ring-1 ring-inset ring-black/10 dark:ring-white/15",
  uncommon:
    "border border-emerald-500/55 dark:border-emerald-400/60 bg-gradient-to-br from-emerald-500/25 via-teal-500/12 to-slate-900/10 dark:from-emerald-950/85 dark:via-slate-900/90 dark:to-emerald-900/55 text-emerald-500 dark:text-emerald-400 ring-1 ring-inset ring-black/10 dark:ring-white/15",
  common:
    "border border-border/80 bg-gradient-to-br from-slate-500/20 via-slate-400/10 to-slate-900/10 dark:from-slate-800/80 dark:via-slate-900/90 dark:to-slate-950/95 text-muted-foreground ring-1 ring-inset ring-black/10 dark:ring-white/15",
};

const FACTION_CREST_PATHS: Record<Exclude<AssetFaction, "neutral">, string> = {
  league: "/images/factions/race_alliance.webp",
  horde: "/images/factions/race_horde.webp",
  nature: "/images/factions/race_nature.webp",
};

export function GameAssetFrame({
  src,
  asset,
  alt = "",
  size = "md",
  rarity = "common",
  faction,
  showFactionBadge = true,
  className,
  imgClassName,
}: GameAssetFrameProps) {
  const [hasError, setHasError] = useState(false);
  const [crestError, setCrestError] = useState(false);

  const resolvedSrc = src ?? asset?.iconPath ?? "";
  const resolvedAlt = alt || asset?.inGameNameEn || asset?.nameEn || "";
  const resolvedRarity = asset?.rarity ?? rarity;
  const resolvedFaction = asset?.faction ?? faction;

  const cfg = SIZE_CONFIG[size];
  const rarityClass = RARITY_FRAME_CLASSES[resolvedRarity];
  const factionCrest =
    resolvedFaction && resolvedFaction !== "neutral"
      ? FACTION_CREST_PATHS[resolvedFaction]
      : undefined;
  const shouldRenderBadge =
    showFactionBadge && size !== "xs" && Boolean(factionCrest) && !crestError;

  return (
    <span
      data-testid="game-asset-frame"
      data-rarity={resolvedRarity}
      data-size={size}
      className={cn(
        "relative inline-flex items-center justify-center select-none",
        cfg.boxClass,
        cfg.radiusClass,
        rarityClass,
        className
      )}
    >
      <span
        aria-hidden="true"
        data-alpha-backdrop=""
        className={cn(
          "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.08)_0%,transparent_72%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12)_0%,transparent_72%)]",
          cfg.radiusClass
        )}
      />

      {hasError || !resolvedSrc ? (
        <span
          data-testid="asset-frame-fallback"
          aria-hidden="true"
          className="relative z-[1] inline-flex items-center justify-center w-full h-full"
        >
          {resolvedRarity === "mythic" || resolvedRarity === "legendary" ? (
            <Sparkles className={cfg.iconClass} />
          ) : (
            <Shield className={cfg.iconClass} />
          )}
        </span>
      ) : (
        <img
          src={resolvedSrc}
          alt={resolvedAlt}
          aria-hidden={resolvedAlt === "" ? "true" : undefined}
          loading="lazy"
          decoding="async"
          width={cfg.px}
          height={cfg.px}
          onError={() => setHasError(true)}
          className={cn(
            "relative z-[1] h-full w-full object-contain",
            cfg.radiusClass,
            imgClassName
          )}
        />
      )}

      {shouldRenderBadge && factionCrest ? (
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute z-10 inline-flex items-center justify-center rounded-full bg-slate-950/90 ring-1 ring-slate-950/90 shadow-sm",
            cfg.badgeClass
          )}
        >
          <img
            src={factionCrest}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            width={cfg.badgeSizePx}
            height={cfg.badgeSizePx}
            onError={() => setCrestError(true)}
            className="h-full w-full object-contain"
          />
        </span>
      ) : null}
    </span>
  );
}

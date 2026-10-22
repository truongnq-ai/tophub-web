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
    "border border-rose-500/65 bg-gradient-to-br from-rose-950/80 via-slate-900/90 to-rose-900/50 text-rose-400 shadow-xs",
  legendary:
    "border border-amber-500/65 bg-gradient-to-br from-amber-950/80 via-slate-900/90 to-amber-900/50 text-amber-400 shadow-xs",
  epic:
    "border border-purple-500/60 bg-gradient-to-br from-purple-950/80 via-slate-900/90 to-purple-900/50 text-purple-400",
  rare:
    "border border-sky-500/60 bg-gradient-to-br from-sky-950/80 via-slate-900/90 to-sky-900/50 text-sky-400",
  uncommon:
    "border border-emerald-500/55 bg-gradient-to-br from-emerald-950/80 via-slate-900/90 to-emerald-900/50 text-emerald-400",
  common:
    "border border-border/80 bg-slate-900/80 text-muted-foreground",
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
      {hasError || !resolvedSrc ? (
        <span
          data-testid="asset-frame-fallback"
          aria-hidden="true"
          className="inline-flex items-center justify-center w-full h-full"
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
            "h-full w-full object-contain",
            cfg.radiusClass,
            imgClassName
          )}
        />
      )}

      {shouldRenderBadge && factionCrest ? (
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute z-10 inline-flex items-center justify-center rounded-full border border-slate-950/90 bg-slate-950/90 shadow-xs",
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

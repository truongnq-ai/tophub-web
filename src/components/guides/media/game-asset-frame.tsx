"use client";

import React, { useState } from "react";
import { Puzzle, Shield, Sparkles } from "lucide-react";
import type {
  AssetFaction,
  AssetRarity,
  CodexCategoryId,
  GameAssetEntry,
} from "@/content/guides/types";
import { cn } from "@/lib/utils";

export type GameAssetFrameSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type GameAssetFrameShape = "auto" | "hero" | "item";

export interface GameAssetFrameProps {
  readonly src?: string;
  readonly asset?: GameAssetEntry;
  readonly alt?: string;
  readonly size?: GameAssetFrameSize;
  readonly shape?: GameAssetFrameShape;
  readonly category?: CodexCategoryId;
  readonly rarity?: AssetRarity;
  readonly faction?: AssetFaction;
  readonly showFactionBadge?: boolean;
  readonly showShardBadge?: boolean;
  readonly autoPortrait?: boolean;
  readonly className?: string;
  readonly imgClassName?: string;
}

interface FrameGeometryConfig {
  readonly imgW: number;
  readonly imgH: number;
  readonly boxClass: string;
  readonly radiusClass: string;
  readonly badgeSizePx: number;
  readonly badgeClass: string;
  readonly shardBadgeClass: string;
  readonly shardIconClass: string;
  readonly iconClass: string;
}

const ITEM_SIZE_CONFIG: Record<GameAssetFrameSize, FrameGeometryConfig> = {
  xs: {
    imgW: 16,
    imgH: 16,
    boxClass: "h-4 w-4 shrink-0",
    radiusClass: "rounded",
    badgeSizePx: 8,
    badgeClass: "hidden",
    shardBadgeClass: "hidden",
    shardIconClass: "h-2.5 w-2.5",
    iconClass: "h-2.5 w-2.5",
  },
  sm: {
    imgW: 28,
    imgH: 28,
    boxClass: "h-7 w-7 shrink-0",
    radiusClass: "rounded-md",
    badgeSizePx: 11,
    badgeClass: "-top-0.5 -left-0.5 h-3 w-3",
    shardBadgeClass: "-top-0.5 -left-0.5 h-3.5 w-3.5",
    shardIconClass: "h-2.5 w-2.5",
    iconClass: "h-3.5 w-3.5",
  },
  md: {
    imgW: 40,
    imgH: 40,
    boxClass: "h-10 w-10 shrink-0",
    radiusClass: "rounded-lg",
    badgeSizePx: 14,
    badgeClass: "-top-1 -left-1 h-3.5 w-3.5",
    shardBadgeClass: "-top-1 -left-1 h-4 w-4",
    shardIconClass: "h-3 w-3",
    iconClass: "h-4 w-4",
  },
  lg: {
    imgW: 56,
    imgH: 56,
    boxClass: "h-14 w-14 shrink-0",
    radiusClass: "rounded-xl",
    badgeSizePx: 16,
    badgeClass: "-top-1 -left-1 h-4 w-4",
    shardBadgeClass: "-top-1 -left-1 h-4.5 w-4.5",
    shardIconClass: "h-3 w-3",
    iconClass: "h-5 w-5",
  },
  xl: {
    imgW: 72,
    imgH: 72,
    boxClass: "h-[72px] w-[72px] shrink-0",
    radiusClass: "rounded-xl",
    badgeSizePx: 18,
    badgeClass: "-top-1 -left-1 h-[18px] w-[18px]",
    shardBadgeClass: "-top-1 -left-1 h-5 w-5",
    shardIconClass: "h-3.5 w-3.5",
    iconClass: "h-6 w-6",
  },
  "2xl": {
    imgW: 96,
    imgH: 96,
    boxClass: "h-24 w-24 shrink-0",
    radiusClass: "rounded-2xl",
    badgeSizePx: 20,
    badgeClass: "-top-1 -left-1 h-5 w-5",
    shardBadgeClass: "-top-1 -left-1 h-5 w-5",
    shardIconClass: "h-3.5 w-3.5",
    iconClass: "h-7 w-7",
  },
};

const HERO_SIZE_CONFIG: Record<GameAssetFrameSize, FrameGeometryConfig> = {
  xs: {
    imgW: 16,
    imgH: 22,
    boxClass: "h-[22px] w-4 shrink-0",
    radiusClass: "rounded",
    badgeSizePx: 8,
    badgeClass: "hidden",
    shardBadgeClass: "hidden",
    shardIconClass: "h-2.5 w-2.5",
    iconClass: "h-2.5 w-2.5",
  },
  sm: {
    imgW: 28,
    imgH: 38,
    boxClass: "h-[38px] w-7 shrink-0",
    radiusClass: "rounded-md",
    badgeSizePx: 11,
    badgeClass: "-top-0.5 -left-0.5 h-3 w-3",
    shardBadgeClass: "-top-0.5 -left-0.5 h-3.5 w-3.5",
    shardIconClass: "h-2.5 w-2.5",
    iconClass: "h-3.5 w-3.5",
  },
  md: {
    imgW: 40,
    imgH: 56,
    boxClass: "h-14 w-10 shrink-0",
    radiusClass: "rounded-lg",
    badgeSizePx: 14,
    badgeClass: "-top-1 -left-1 h-3.5 w-3.5",
    shardBadgeClass: "-top-1 -left-1 h-4 w-4",
    shardIconClass: "h-3 w-3",
    iconClass: "h-4 w-4",
  },
  lg: {
    imgW: 56,
    imgH: 78,
    boxClass: "h-[78px] w-14 shrink-0",
    radiusClass: "rounded-xl",
    badgeSizePx: 16,
    badgeClass: "-top-1 -left-1 h-4 w-4",
    shardBadgeClass: "-top-1 -left-1 h-4.5 w-4.5",
    shardIconClass: "h-3 w-3",
    iconClass: "h-5 w-5",
  },
  xl: {
    imgW: 72,
    imgH: 100,
    boxClass: "h-[100px] w-[72px] shrink-0",
    radiusClass: "rounded-xl",
    badgeSizePx: 18,
    badgeClass: "-top-1 -left-1 h-[18px] w-[18px]",
    shardBadgeClass: "-top-1 -left-1 h-5 w-5",
    shardIconClass: "h-3.5 w-3.5",
    iconClass: "h-6 w-6",
  },
  "2xl": {
    imgW: 96,
    imgH: 136,
    boxClass: "h-[136px] w-24 shrink-0",
    radiusClass: "rounded-2xl",
    badgeSizePx: 20,
    badgeClass: "-top-1 -left-1 h-5 w-5",
    shardBadgeClass: "-top-1 -left-1 h-5 w-5",
    shardIconClass: "h-3.5 w-3.5",
    iconClass: "h-7 w-7",
  },
};

/**
 * In-Game 6-Tier High-Saturation Rarity Backdrops & Borders (Decision 3A):
 * Mythic (Red/Coral), Legendary (Gold/Amber), Epic (Purple), Rare (Sky Blue), Uncommon (Emerald Green), Common (Silver Slate)
 */
export const RARITY_FRAME_CLASSES: Record<AssetRarity, string> = {
  mythic:
    "border-2 border-[#f4a261] dark:border-[#f4a261]/90 bg-gradient-to-b from-[#e0533c] via-[#c83e2b] to-[#f07d53] text-amber-50 dark:text-white ring-1 ring-inset ring-[#ffd166]/45 dark:ring-white/15 shadow-sm",
  legendary:
    "border-2 border-[#f3c65f] dark:border-[#f3c65f]/90 bg-gradient-to-b from-[#d99b26] via-[#c5831b] to-[#e9b84a] text-amber-50 dark:text-white ring-1 ring-inset ring-[#fff3b0]/45 dark:ring-white/15 shadow-sm",
  epic:
    "border-2 border-[#c792ea] dark:border-[#c792ea]/90 bg-gradient-to-b from-[#8b4fc2] via-[#763bad] to-[#a86add] text-purple-50 dark:text-white ring-1 ring-inset ring-[#e2c2ff]/45 dark:ring-white/15 shadow-sm",
  rare:
    "border-2 border-[#7cc0ff] dark:border-[#7cc0ff]/90 bg-gradient-to-b from-[#3b82c4] via-[#2b6cb0] to-[#5ba4e5] text-sky-50 dark:text-white ring-1 ring-inset ring-[#bae0ff]/45 dark:ring-white/15 shadow-sm",
  uncommon:
    "border-2 border-[#7ae595] dark:border-[#7ae595]/90 bg-gradient-to-b from-[#389e56] via-[#2b8244] to-[#52be70] text-emerald-50 dark:text-white ring-1 ring-inset ring-[#bef7cc]/45 dark:ring-white/15 shadow-sm",
  common:
    "border-2 border-[#cbd5e1] dark:border-[#94a3b8] bg-gradient-to-b from-[#94a3b8] via-[#64748b] to-[#cbd5e1] text-slate-50 dark:text-white ring-1 ring-inset ring-white/40 dark:ring-white/15 shadow-sm",
};

const FACTION_CREST_PATHS: Record<Exclude<AssetFaction, "neutral">, string> = {
  league: "/images/factions/race_alliance.webp",
  horde: "/images/factions/race_horde.webp",
  nature: "/images/factions/race_nature.webp",
};

/**
 * GAP-01 Verified Exclusion Sets:
 * - Hero IDs 10000 and 60008 (Boar) have Head_*.webp in /heroes/avatars/ but no Lihui_*.webp in /heroes/portraits/.
 * - Troop ID 10014 (Drum Corps) has ArmsHead_10014_1.webp in /troops/skins-avatars/ but no ArmsLihui_10014.webp in /troops/skins-portraits/.
 */
const NO_PORTRAIT_HERO_IDS = new Set(["10000", "60008"]);
const NO_PORTRAIT_TROOP_IDS = new Set(["10014"]);

export function resolveFrameShape(
  shape: GameAssetFrameShape,
  category: CodexCategoryId | undefined,
  src: string
): "hero" | "item" {
  if (shape === "hero" || shape === "item") {
    return shape;
  }
  if (category === "heroes") {
    return "hero";
  }
  if (category) {
    return "item";
  }
  if (
    /^\/images\/heroes\/(?:avatars|portraits|skins-avatars|skins-portraits)\//.test(
      src
    ) ||
    /^\/images\/troops\/(?:skins-avatars|skins-portraits)\//.test(src)
  ) {
    return "hero";
  }
  return "item";
}

export function resolveHeroPortraitSrc(
  rawSrc: string,
  resolvedShape: "hero" | "item",
  size: GameAssetFrameSize,
  autoPortrait: boolean,
  explicitPortraitPath?: string
): string {
  if (
    resolvedShape !== "hero" ||
    !autoPortrait ||
    size === "xs" ||
    size === "sm"
  ) {
    return rawSrc;
  }
  if (explicitPortraitPath) {
    return explicitPortraitPath;
  }

  const heroAvatarMatch = rawSrc.match(
    /^\/images\/heroes\/avatars\/Head_(\d+)\.webp$/
  );
  if (heroAvatarMatch) {
    const heroNum = heroAvatarMatch[1];
    if (NO_PORTRAIT_HERO_IDS.has(heroNum)) {
      return rawSrc;
    }
    return `/images/heroes/portraits/Lihui_${heroNum}.webp`;
  }

  const skinAvatarMatch = rawSrc.match(
    /^\/images\/heroes\/skins-avatars\/Head_(.+)\.webp$/
  );
  if (skinAvatarMatch) {
    const skinKey = skinAvatarMatch[1];
    if (skinKey === "10001_AI") {
      return rawSrc;
    }
    return `/images/heroes/skins-portraits/Lihui_${skinKey}.webp`;
  }

  const troopAvatarMatch = rawSrc.match(
    /^\/images\/troops\/skins-avatars\/ArmsHead_(\d+)_\d+\.webp$/
  );
  if (troopAvatarMatch) {
    const troopNum = troopAvatarMatch[1];
    if (NO_PORTRAIT_TROOP_IDS.has(troopNum)) {
      return rawSrc;
    }
    return `/images/troops/skins-portraits/ArmsLihui_${troopNum}.webp`;
  }

  return rawSrc;
}

export function GameAssetFrame({
  src,
  asset,
  alt = "",
  size = "md",
  shape = "auto",
  category,
  rarity = "common",
  faction,
  showFactionBadge = true,
  showShardBadge = false,
  autoPortrait = true,
  className,
  imgClassName,
}: GameAssetFrameProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const [crestError, setCrestError] = useState(false);

  const rawSrc = src ?? asset?.iconPath ?? "";
  const resolvedAlt = alt ?? "";
  const resolvedRarity = asset?.rarity ?? rarity;
  const resolvedFaction = asset?.faction ?? faction;
  const resolvedCategory = category ?? asset?.category;

  const resolvedShape = resolveFrameShape(shape, resolvedCategory, rawSrc);
  const activeSrc = resolveHeroPortraitSrc(
    rawSrc,
    resolvedShape,
    size,
    autoPortrait,
    asset?.portraitPath
  );
  const hasError = !rawSrc || failedSrc === rawSrc;

  const cfg =
    resolvedShape === "hero"
      ? HERO_SIZE_CONFIG[size]
      : ITEM_SIZE_CONFIG[size];
  const rarityClass = RARITY_FRAME_CLASSES[resolvedRarity];
  const factionCrest =
    resolvedFaction && resolvedFaction !== "neutral"
      ? FACTION_CREST_PATHS[resolvedFaction]
      : undefined;
  const shouldRenderShardBadge = showShardBadge && size !== "xs";
  const shouldRenderFactionBadge =
    showFactionBadge &&
    size !== "xs" &&
    Boolean(factionCrest) &&
    !crestError;

  return (
    <span
      data-testid="game-asset-frame"
      data-shape={resolvedShape}
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
          "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.22)_0%,transparent_72%)]",
          cfg.radiusClass
        )}
      />

      {hasError ? (
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
          src={activeSrc}
          data-original-src={rawSrc}
          alt={resolvedAlt}
          aria-hidden={resolvedAlt === "" ? "true" : undefined}
          loading="lazy"
          decoding="async"
          width={cfg.imgW}
          height={cfg.imgH}
          onError={() => setFailedSrc(rawSrc)}
          className={cn(
            "relative z-[1] h-full w-full",
            resolvedShape === "hero"
              ? "object-cover object-top"
              : "object-contain",
            cfg.radiusClass,
            imgClassName
          )}
        />
      )}

      {shouldRenderShardBadge ? (
        <span
          data-testid="asset-shard-badge"
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute z-10 inline-flex items-center justify-center rounded-full bg-slate-950/90 text-amber-300 ring-1 ring-amber-400/70 shadow-sm",
            cfg.shardBadgeClass
          )}
        >
          <Puzzle className={cfg.shardIconClass} />
        </span>
      ) : null}

      {shouldRenderFactionBadge && factionCrest ? (
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute z-10 inline-flex items-center justify-center rounded-full bg-slate-950/90 ring-1 ring-slate-950/90 shadow-sm",
            cfg.badgeClass,
            shouldRenderShardBadge && "top-auto -bottom-1"
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

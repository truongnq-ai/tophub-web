"use client";

import React from "react";
import type {
  AssetFaction,
  AssetRarity,
  GameAssetEntry,
  GuideLocale,
} from "@/content/guides/types";
import { GameAssetFrame } from "./game-asset-frame";

export interface GameEntityPopoverProps {
  readonly entity: GameAssetEntry;
  readonly locale: GuideLocale;
}

const RARITY_LABELS: Record<
  AssetRarity,
  { readonly vi: string; readonly en: string }
> = {
  mythic: { vi: "Thần Thoại (UR)", en: "Mythic (UR)" },
  legendary: { vi: "Huyền Thoại (SSR)", en: "Legendary (SSR)" },
  epic: { vi: "Sử Thi (SR)", en: "Epic (SR)" },
  rare: { vi: "Hiếm (R)", en: "Rare (R)" },
  uncommon: { vi: "Phổ Thông", en: "Uncommon" },
  common: { vi: "Cơ Bản", en: "Common" },
};

const FACTION_LABELS: Record<
  AssetFaction,
  { readonly vi: string; readonly en: string }
> = {
  league: { vi: "Liên Minh", en: "League" },
  horde: { vi: "Bộ Lạc", en: "Horde" },
  nature: { vi: "Thiên Nhiên", en: "Nature" },
  neutral: { vi: "Đa Hệ", en: "Neutral" },
};

export function GameEntityPopover({ entity, locale }: GameEntityPopoverProps) {
  const isEn = locale === "en";
  const primaryName = isEn ? entity.nameEn : entity.nameVi;
  const secondaryName =
    !isEn && entity.nameEn !== entity.nameVi ? entity.nameEn : null;
  const description = isEn
    ? entity.descEn || entity.nameEn
    : entity.descVi || entity.descEn || entity.nameVi;
  const rarityLabel = RARITY_LABELS[entity.rarity][locale];
  const factionLabel = entity.faction
    ? FACTION_LABELS[entity.faction][locale]
    : null;

  return (
    <span
      role="tooltip"
      data-testid="game-entity-popover"
      className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 w-[min(18rem,calc(100vw-2rem))] max-w-[calc(100vw-2rem)] -translate-x-1/2 rounded-2xl border border-amber-500/40 bg-slate-950/95 p-3.5 text-left font-sans text-xs text-slate-100 shadow-xl backdrop-blur-md"
    >
      <span className="flex items-start gap-2.5">
        <GameAssetFrame
          src={entity.iconPath}
          rarity={entity.rarity}
          faction={entity.faction}
          size="md"
          alt=""
        />
        <span className="min-w-0 flex-1 space-y-1">
          <span className="block font-heading text-sm font-bold leading-snug text-white">
            {primaryName}
          </span>
          {secondaryName ? (
            <span className="block font-sans text-xs font-medium text-amber-300/90">
              {secondaryName}
            </span>
          ) : null}
          <span className="flex flex-wrap items-center gap-1.5 pt-0.5">
            <span className="inline-flex items-center rounded-md bg-amber-500/20 px-2 py-0.5 font-sans text-xs font-semibold text-amber-300">
              {rarityLabel}
            </span>
            {factionLabel ? (
              <span className="inline-flex items-center rounded-md bg-slate-800/90 px-2 py-0.5 font-sans text-xs font-medium text-slate-200">
                {factionLabel}
              </span>
            ) : null}
          </span>
        </span>
      </span>

      {description ? (
        <span className="mt-2.5 block border-t border-slate-800/80 pt-2 font-sans text-sm font-normal leading-relaxed text-slate-200">
          {description}
        </span>
      ) : null}
    </span>
  );
}

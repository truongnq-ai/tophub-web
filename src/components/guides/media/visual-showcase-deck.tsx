import React from "react";
import type { GuideLocale, MediaShowcaseItem } from "@/content/guides/types";
import { cn } from "@/lib/utils";
import { GameAssetFrame } from "./game-asset-frame";

export interface VisualShowcaseDeckProps {
  readonly items: readonly MediaShowcaseItem[];
  readonly locale: GuideLocale;
  readonly compact?: boolean;
  readonly className?: string;
}

export function VisualShowcaseDeck({
  items,
  locale,
  compact = false,
  className,
}: VisualShowcaseDeckProps) {
  if (!items || items.length === 0) return null;

  const isEn = locale === "en";

  return (
    <div
      data-testid="visual-showcase-deck"
      className={cn(
        "min-w-0 overflow-hidden rounded-xl border border-amber-500/25 bg-background/75 p-3",
        className
      )}
    >
      <div
        className={cn(
          "grid min-w-0 gap-2.5",
          compact
            ? "grid-cols-2 sm:grid-cols-4"
            : items.length <= 3
              ? "grid-cols-2 sm:grid-cols-3"
              : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
        )}
      >
        {items.map((item, idx) => {
          const primaryLabel = isEn ? item.labelEn : item.labelVi;
          const subLabel =
            !isEn && item.labelEn !== item.labelVi ? item.labelEn : null;

          return (
            <figure
              key={`${item.assetId}-${idx}`}
              data-testid={`showcase-card-${idx}`}
              className="group relative flex min-w-0 flex-col items-center justify-between rounded-xl border border-border/75 bg-card/90 p-2.5 text-center transition-colors hover:border-amber-500/45"
            >
              {item.badgeText ? (
                <span className="mb-1.5 inline-flex items-center rounded-md border border-amber-500/35 bg-amber-500/15 px-1.5 py-0.5 font-mono text-[10px] font-bold text-amber-600 dark:text-amber-300">
                  {item.badgeText}
                </span>
              ) : null}

              <GameAssetFrame
                src={item.iconPath}
                rarity={item.rarity}
                faction={item.faction}
                size={compact ? "md" : "lg"}
                alt=""
                className="my-1"
              />

              <figcaption className="mt-1.5 w-full space-y-0.5">
                <span className="line-clamp-2 block font-heading text-[11px] font-bold leading-tight text-foreground">
                  {primaryLabel}
                </span>
                {subLabel ? (
                  <span className="line-clamp-1 block font-mono text-[9px] text-muted-foreground">
                    {subLabel}
                  </span>
                ) : null}
              </figcaption>
            </figure>
          );
        })}
      </div>
    </div>
  );
}

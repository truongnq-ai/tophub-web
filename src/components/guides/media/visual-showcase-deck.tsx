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
        "min-w-0 overflow-hidden rounded-2xl bg-muted/35 dark:bg-slate-900/50 border-0 p-3 sm:p-3.5",
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
              className="group relative flex min-w-0 flex-col items-center justify-between rounded-xl bg-background/85 dark:bg-card/85 border-0 sm:border sm:border-border/60 p-3 text-center transition-colors hover:bg-amber-500/5 sm:hover:border-amber-500/45"
            >
              {item.badgeText ? (
                <span className="mb-1.5 inline-flex items-center rounded-md bg-amber-500/15 border-0 px-2 py-0.5 font-sans text-xs font-bold text-amber-600 dark:text-amber-300">
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
                <span className="line-clamp-2 block font-heading text-sm font-bold leading-snug text-foreground">
                  {primaryLabel}
                </span>
                {subLabel ? (
                  <span className="line-clamp-1 block font-sans text-xs text-muted-foreground">
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

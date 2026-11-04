import React from "react";
import { cn } from "@/lib/utils";

export const BRAND_LOGO_SRC = "/images/brand/tophub-logo.webp";
export const BRAND_TITLE = "TopHub";
export const BRAND_SUBTITLE = "Top Hero Hub";

export type BrandLogoSize = "xs" | "sm" | "md" | "lg";

export interface BrandLogoProps {
  size?: BrandLogoSize;
  showText?: boolean;
  showSubtitle?: boolean;
  titleOverride?: string;
  invertText?: boolean;
  className?: string;
}

const SIZE_CONFIG: Record<
  BrandLogoSize,
  {
    boxClass: string;
    imgDimension: number;
    titleClass: string;
    subtitleClass: string;
  }
> = {
  xs: {
    boxClass: "h-8 w-8 rounded-xl",
    imgDimension: 32,
    titleClass: "text-lg",
    subtitleClass: "text-xs",
  },
  sm: {
    boxClass: "h-9 w-9 rounded-xl",
    imgDimension: 36,
    titleClass: "text-xl",
    subtitleClass: "text-xs",
  },
  md: {
    boxClass: "h-10 w-10 sm:h-11 sm:w-11 rounded-2xl",
    imgDimension: 44,
    titleClass: "text-xl sm:text-2xl",
    subtitleClass: "text-xs",
  },
  lg: {
    boxClass: "h-12 w-12 rounded-2xl",
    imgDimension: 48,
    titleClass: "text-2xl",
    subtitleClass: "text-xs",
  },
};

export function BrandLogo({
  size = "md",
  showText = true,
  showSubtitle = true,
  titleOverride,
  invertText = false,
  className,
}: BrandLogoProps) {
  const cfg = SIZE_CONFIG[size];
  const titleColorClass = invertText
    ? "text-white dark:text-slate-900"
    : "text-foreground group-hover:text-amber-500 dark:group-hover:text-amber-400";
  const subtitleColorClass = invertText
    ? "text-white/80 dark:text-slate-900/80"
    : "text-amber-600/95 dark:text-amber-400/95";

  return (
    <div className={cn("inline-flex items-center gap-3", className)}>
      <div
        className={cn(
          "relative flex shrink-0 items-center justify-center overflow-hidden bg-slate-950 ring-1 ring-amber-400/60 shadow-md shadow-amber-500/25 group-hover:scale-105 group-hover:ring-amber-300 transition-all duration-200",
          cfg.boxClass
        )}
      >
        <img
          data-testid="brand-logo-img"
          src={BRAND_LOGO_SRC}
          alt="TopHub - Top Hero Hub Logo"
          width={cfg.imgDimension}
          height={cfg.imgDimension}
          loading="eager"
          decoding="async"
          className="h-full w-full object-cover select-none"
        />
      </div>

      {showText ? (
        <div className="flex flex-col text-left">
          <span
            className={cn(
              "font-heading font-black leading-none tracking-tight transition-colors",
              cfg.titleClass,
              titleColorClass
            )}
          >
            {titleOverride ?? BRAND_TITLE}
          </span>
          {showSubtitle ? (
            <span
              data-testid="brand-logo-subtitle"
              className={cn(
                "font-heading font-extrabold uppercase tracking-wider mt-0.5 leading-tight",
                cfg.subtitleClass,
                subtitleColorClass
              )}
            >
              {BRAND_SUBTITLE}
            </span>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

import React from "react";
import {
  AlertOctagon,
  AlertTriangle,
  Lightbulb,
  ShieldCheck,
} from "lucide-react";
import type { CalloutVariant, GuideLocale } from "@/content/guides/types";
import { cn } from "@/lib/utils";
import { RichGuideText, type RichGuideAccentColor } from "./rich-guide-text";

interface CalloutBoxProps {
  variant: CalloutVariant;
  title: string;
  content: string;
  locale?: GuideLocale;
}

const variantStyles: Record<
  CalloutVariant,
  {
    topGlow: string;
    iconFrame: string;
    badgeClass: string;
    badgeLabel: Record<GuideLocale, string>;
    titleColor: string;
    accentColor: RichGuideAccentColor;
    Icon: React.ElementType;
  }
> = {
  danger: {
    topGlow: "from-rose-500 via-rose-500/50 to-transparent",
    iconFrame: "border-rose-500/25 bg-rose-500/10 text-rose-500",
    badgeClass:
      "bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/35",
    badgeLabel: { vi: "BẪY ĐỎ", en: "RED TRAP" },
    titleColor: "text-rose-600 dark:text-rose-400",
    accentColor: "rose",
    Icon: AlertOctagon,
  },
  warning: {
    topGlow: "from-amber-500 via-amber-500/50 to-transparent",
    iconFrame: "border-amber-500/25 bg-amber-500/10 text-amber-500",
    badgeClass:
      "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/35",
    badgeLabel: { vi: "CẢNH BÁO", en: "WARNING" },
    titleColor: "text-amber-600 dark:text-amber-400",
    accentColor: "amber",
    Icon: AlertTriangle,
  },
  tip: {
    topGlow: "from-emerald-500 via-emerald-500/50 to-transparent",
    iconFrame: "border-emerald-500/25 bg-emerald-500/10 text-emerald-500",
    badgeClass:
      "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/35",
    badgeLabel: { vi: "MẸO TỐI ƯU", en: "PRO TIP" },
    titleColor: "text-emerald-600 dark:text-emerald-400",
    accentColor: "emerald",
    Icon: Lightbulb,
  },
  rule: {
    topGlow: "from-amber-400 via-yellow-300/70 to-transparent",
    iconFrame: "border-amber-400/35 bg-amber-500/15 text-amber-500",
    badgeClass: "bg-amber-500 text-slate-950 border-amber-400",
    badgeLabel: { vi: "LUẬT THÉP", en: "CORE RULE" },
    titleColor: "text-amber-600 dark:text-amber-300",
    accentColor: "amber",
    Icon: ShieldCheck,
  },
};

export function CalloutBox({
  variant,
  title,
  content,
  locale = "vi",
}: CalloutBoxProps) {
  const style = variantStyles[variant];
  const Icon = style.Icon;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-card/85 p-3.5 sm:p-5 flex items-start gap-3 sm:gap-3.5 shadow-sm transition-all">
      <div
        data-testid="callout-top-glow"
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r",
          style.topGlow
        )}
      />
      <div
        className={cn(
          "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border mt-0.5",
          style.iconFrame
        )}
      >
        <Icon className="h-4 w-4" aria-hidden="true" />
      </div>
      <div className="space-y-2 text-sm sm:text-base min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "inline-flex items-center rounded-md border px-2 py-0.5 font-sans text-xs font-extrabold uppercase tracking-wider",
              style.badgeClass
            )}
          >
            {style.badgeLabel[locale]}
          </span>
          <h4
            className={cn(
              "font-heading font-bold text-sm sm:text-base",
              style.titleColor
            )}
          >
            <RichGuideText
              text={title}
              variant="inline"
              locale={locale}
              accentColor={style.accentColor}
            />
          </h4>
        </div>
        <RichGuideText
          text={content}
          variant="structured-brief"
          locale={locale}
          accentColor={style.accentColor}
          className="text-foreground leading-relaxed text-sm sm:text-base"
        />
      </div>
    </div>
  );
}

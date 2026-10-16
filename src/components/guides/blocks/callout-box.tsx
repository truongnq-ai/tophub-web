import React from "react";
import {
  AlertOctagon,
  AlertTriangle,
  Lightbulb,
  ShieldCheck,
} from "lucide-react";
import type { CalloutVariant, GuideLocale } from "@/content/guides/types";
import { cn } from "@/lib/utils";

interface CalloutBoxProps {
  variant: CalloutVariant;
  title: string;
  content: string;
  locale?: GuideLocale;
}

const variantStyles: Record<
  CalloutVariant,
  {
    wrapper: string;
    badgeClass: string;
    badgeLabel: Record<GuideLocale, string>;
    iconColor: string;
    titleColor: string;
    Icon: React.ElementType;
  }
> = {
  danger: {
    wrapper:
      "border-l-4 border-l-rose-500 border-y border-r border-rose-500/30 bg-rose-500/[0.07] dark:bg-rose-950/25",
    badgeClass:
      "bg-rose-500/20 text-rose-700 dark:text-rose-300 border-rose-500/40",
    badgeLabel: { vi: "BẪY ĐỎ", en: "RED TRAP" },
    iconColor: "text-rose-500",
    titleColor: "text-rose-600 dark:text-rose-400",
    Icon: AlertOctagon,
  },
  warning: {
    wrapper:
      "border-l-4 border-l-amber-500 border-y border-r border-amber-500/30 bg-amber-500/[0.07] dark:bg-amber-950/25",
    badgeClass:
      "bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/40",
    badgeLabel: { vi: "CẢNH BÁO", en: "WARNING" },
    iconColor: "text-amber-500",
    titleColor: "text-amber-600 dark:text-amber-400",
    Icon: AlertTriangle,
  },
  tip: {
    wrapper:
      "border-l-4 border-l-emerald-500 border-y border-r border-emerald-500/30 bg-emerald-500/[0.07] dark:bg-emerald-950/25",
    badgeClass:
      "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/40",
    badgeLabel: { vi: "MẸO TỐI ƯU", en: "PRO TIP" },
    iconColor: "text-emerald-500",
    titleColor: "text-emerald-600 dark:text-emerald-400",
    Icon: Lightbulb,
  },
  rule: {
    wrapper:
      "border-l-4 border-l-amber-400 border-y border-r border-amber-400/40 bg-gradient-to-r from-amber-500/15 via-amber-500/[0.06] to-transparent",
    badgeClass:
      "bg-amber-500 text-slate-950 border-amber-400",
    badgeLabel: { vi: "LUẬT THÉP", en: "CORE RULE" },
    iconColor: "text-amber-500",
    titleColor: "text-amber-600 dark:text-amber-300",
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
    <div
      className={cn(
        "rounded-r-2xl rounded-l-sm px-4 py-3 flex items-start gap-3 transition-all",
        style.wrapper
      )}
    >
      <div className="mt-0.5 shrink-0">
        <Icon className={cn("h-4 w-4 sm:h-5 sm:w-5", style.iconColor)} />
      </div>
      <div className="space-y-1 text-sm min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "inline-flex items-center rounded-md border px-1.5 py-0.5 font-mono text-[10px] font-extrabold uppercase tracking-wider",
              style.badgeClass
            )}
          >
            {style.badgeLabel[locale]}
          </span>
          <h4
            className={cn(
              "font-heading font-bold text-xs sm:text-sm",
              style.titleColor
            )}
          >
            {title}
          </h4>
        </div>
        <p className="text-foreground/90 leading-relaxed text-xs sm:text-sm">
          {content}
        </p>
      </div>
    </div>
  );
}


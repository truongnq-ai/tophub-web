import React from "react";
import {
  AlertOctagon,
  AlertTriangle,
  Lightbulb,
  ShieldCheck,
} from "lucide-react";
import type { CalloutVariant } from "@/content/guides/types";
import { cn } from "@/lib/utils";

interface CalloutBoxProps {
  variant: CalloutVariant;
  title: string;
  content: string;
}

const variantStyles: Record<
  CalloutVariant,
  {
    wrapper: string;
    iconColor: string;
    titleColor: string;
    Icon: React.ElementType;
  }
> = {
  danger: {
    wrapper: "border-rose-500/40 bg-rose-500/10 dark:bg-rose-950/30",
    iconColor: "text-rose-500",
    titleColor: "text-rose-600 dark:text-rose-400",
    Icon: AlertOctagon,
  },
  warning: {
    wrapper: "border-amber-500/40 bg-amber-500/10 dark:bg-amber-950/30",
    iconColor: "text-amber-500",
    titleColor: "text-amber-600 dark:text-amber-400",
    Icon: AlertTriangle,
  },
  tip: {
    wrapper: "border-emerald-500/40 bg-emerald-500/10 dark:bg-emerald-950/30",
    iconColor: "text-emerald-500",
    titleColor: "text-emerald-600 dark:text-emerald-400",
    Icon: Lightbulb,
  },
  rule: {
    wrapper: "border-amber-400/50 bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-transparent shadow-sm shadow-amber-500/10",
    iconColor: "text-amber-500",
    titleColor: "text-amber-600 dark:text-amber-300",
    Icon: ShieldCheck,
  },
};

export function CalloutBox({ variant, title, content }: CalloutBoxProps) {
  const style = variantStyles[variant];
  const Icon = style.Icon;

  return (
    <div
      className={cn(
        "rounded-2xl border p-4 sm:p-5 flex items-start gap-3.5 transition-all",
        style.wrapper
      )}
    >
      <div className="mt-0.5 shrink-0">
        <Icon className={cn("h-5 w-5", style.iconColor)} />
      </div>
      <div className="space-y-1.5 text-sm">
        <h4 className={cn("font-heading font-bold text-sm sm:text-base", style.titleColor)}>
          {title}
        </h4>
        <p className="text-foreground/90 leading-relaxed text-xs sm:text-sm">
          {content}
        </p>
      </div>
    </div>
  );
}

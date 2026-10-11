"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";

export type BillingCycle = 1 | 3 | 6 | 12;

interface BillingSelectorProps {
  selectedCycle: BillingCycle;
  onChange: (cycle: BillingCycle) => void;
  labels: {
    cycle1: string;
    cycle3: string;
    cycle6: string;
    cycle12: string;
    popularBadge: string;
    bestValueBadge: string;
  };
}

export function BillingSelector({ selectedCycle, onChange, labels }: BillingSelectorProps) {
  const options: Array<{
    months: BillingCycle;
    label: string;
    badge?: string;
    badgeVariant?: "default" | "secondary" | "outline";
  }> = [
    { months: 1, label: labels.cycle1 },
    { months: 3, label: labels.cycle3 },
    {
      months: 6,
      label: labels.cycle6,
      badge: labels.popularBadge,
      badgeVariant: "default",
    },
    {
      months: 12,
      label: labels.cycle12,
      badge: labels.bestValueBadge,
      badgeVariant: "secondary",
    },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-muted/60 border border-border/60 max-w-2xl mx-auto">
      {options.map((opt) => {
        const isSelected = selectedCycle === opt.months;
        return (
          <button
            key={opt.months}
            type="button"
            onClick={() => onChange(opt.months)}
            className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
              isSelected
                ? "bg-background text-foreground shadow-sm border border-border/80"
                : "text-muted-foreground hover:text-foreground hover:bg-background/40"
            }`}
          >
            <span>{opt.label}</span>
            {opt.badge && (
              <Badge
                variant={opt.badgeVariant || "secondary"}
                className={`text-[10px] px-1.5 py-0 font-bold ${
                  opt.months === 6
                    ? "bg-primary text-primary-foreground"
                    : "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30"
                }`}
              >
                {opt.badge}
              </Badge>
            )}
          </button>
        );
      })}
    </div>
  );
}

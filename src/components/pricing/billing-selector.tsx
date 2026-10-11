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
    <div className="flex flex-wrap items-center justify-center gap-2 p-2 rounded-2xl bg-slate-900/60 backdrop-blur-md border border-white/10 max-w-2xl mx-auto shadow-inner">
      {options.map((opt) => {
        const isSelected = selectedCycle === opt.months;
        return (
          <button
            key={opt.months}
            type="button"
            onClick={() => onChange(opt.months)}
            className={`relative flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 active:scale-95 ${
              isSelected
                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30 border border-purple-400/30"
                : "text-muted-foreground hover:text-foreground hover:bg-white/5 border border-transparent"
            }`}
          >
            <span>{opt.label}</span>
            {opt.badge && (
              <Badge
                variant={opt.badgeVariant || "secondary"}
                className={`text-[10px] px-2 py-0.5 font-extrabold uppercase tracking-wider ${
                  opt.months === 6
                    ? isSelected
                      ? "bg-white/20 text-white border border-white/30"
                      : "bg-purple-500/20 text-purple-300 border border-purple-500/40"
                    : isSelected
                    ? "bg-amber-400 text-slate-950 font-black border-none"
                    : "bg-amber-500/15 text-amber-400 border border-amber-500/40"
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

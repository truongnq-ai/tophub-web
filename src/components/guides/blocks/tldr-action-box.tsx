import React from "react";
import { Target, Crown, Zap, AlertOctagon } from "lucide-react";
import type { GuideLocale, GuideTldrSummary } from "@/content/guides/types";

interface TldrActionBoxProps {
  tldr: GuideTldrSummary;
  locale: GuideLocale;
}

const LABELS = {
  vi: {
    heading: "🎯 Tóm Tắt 30 Giây (TL;DR — Áp Dụng Ngay)",
    coreRule: "Nguyên tắc số 1",
    immediateAction: "Hành động ngay hôm nay",
    strictTaboo: "Cấm kỵ tuyệt đối",
  },
  en: {
    heading: "🎯 30-Second Actionable Summary (TL;DR)",
    coreRule: "Golden Rule #1",
    immediateAction: "Immediate Action Today",
    strictTaboo: "Strictly Forbidden",
  },
} as const;

export function TldrActionBox({ tldr, locale }: TldrActionBoxProps) {
  const copy = LABELS[locale];

  return (
    <div className="rounded-2xl border border-amber-500/35 bg-gradient-to-br from-amber-500/10 via-card/90 to-card p-4 sm:p-5 space-y-3.5 shadow-sm">
      <div className="flex items-center gap-2 text-xs sm:text-sm font-heading font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
        <Target className="h-4 w-4 text-amber-500 shrink-0" />
        <span>{copy.heading}</span>
      </div>

      <div className="grid grid-cols-1 gap-2.5">
        <div className="rounded-xl border-l-4 border-l-amber-500 border border-amber-500/25 bg-amber-500/5 p-3 sm:p-3.5 flex items-start gap-3">
          <Crown className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm leading-relaxed">
            <span className="font-heading font-bold text-amber-600 dark:text-amber-400 mr-1.5">
              {copy.coreRule}:
            </span>
            <span className="text-foreground/95">{tldr.coreRule[locale]}</span>
          </div>
        </div>

        <div className="rounded-xl border-l-4 border-l-emerald-500 border border-emerald-500/25 bg-emerald-500/5 p-3 sm:p-3.5 flex items-start gap-3">
          <Zap className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm leading-relaxed">
            <span className="font-heading font-bold text-emerald-600 dark:text-emerald-400 mr-1.5">
              {copy.immediateAction}:
            </span>
            <span className="text-foreground/95">
              {tldr.immediateAction[locale]}
            </span>
          </div>
        </div>

        <div className="rounded-xl border-l-4 border-l-rose-500 border border-rose-500/25 bg-rose-500/5 p-3 sm:p-3.5 flex items-start gap-3">
          <AlertOctagon className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm leading-relaxed">
            <span className="font-heading font-bold text-rose-600 dark:text-rose-400 mr-1.5">
              {copy.strictTaboo}:
            </span>
            <span className="text-foreground/95">{tldr.strictTaboo[locale]}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

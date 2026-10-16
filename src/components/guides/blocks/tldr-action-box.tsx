"use client";

import React, { useState } from "react";
import {
  Target,
  Crown,
  Zap,
  AlertOctagon,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
} from "lucide-react";
import type {
  GuideLocale,
  GuideTldrSummary,
  LocalizedText,
} from "@/content/guides/types";

interface TldrActionBoxProps {
  tldr: GuideTldrSummary;
  locale: GuideLocale;
  keyTakeaways?: LocalizedText[];
}

const LABELS = {
  vi: {
    heading: "🎯 Tóm Tắt 30 Giây (TL;DR — Áp Dụng Ngay)",
    coreRule: "Nguyên tắc số 1",
    immediateAction: "Hành động ngay hôm nay",
    strictTaboo: "Cấm kỵ tuyệt đối",
    showTakeaways: (count: number) =>
      `📌 Xem ${count} định mức số liệu cốt lõi`,
    hideTakeaways: "📌 Thu gọn định mức số liệu cốt lõi",
  },
  en: {
    heading: "🎯 30-Second Actionable Summary (TL;DR)",
    coreRule: "Golden Rule #1",
    immediateAction: "Immediate Action Today",
    strictTaboo: "Strictly Forbidden",
    showTakeaways: (count: number) =>
      `📌 View ${count} core quantitative takeaways`,
    hideTakeaways: "📌 Hide core quantitative takeaways",
  },
} as const;

export function TldrActionBox({
  tldr,
  locale,
  keyTakeaways,
}: TldrActionBoxProps) {
  const copy = LABELS[locale];
  const [isTakeawaysOpen, setIsTakeawaysOpen] = useState(false);
  const hasTakeaways = Boolean(keyTakeaways && keyTakeaways.length > 0);

  return (
    <div className="rounded-2xl border border-amber-500/35 bg-gradient-to-br from-amber-500/10 via-card/90 to-card p-3.5 sm:p-4 space-y-3 shadow-sm">
      <div className="flex items-center justify-between gap-2 text-xs sm:text-sm font-heading font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
        <div className="flex items-center gap-2">
          <Target className="h-4 w-4 text-amber-500 shrink-0" />
          <span>{copy.heading}</span>
        </div>
      </div>

      {/* 3-Column Bento Grid on Desktop */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
        <div className="rounded-xl border-l-4 border-l-amber-500 border border-amber-500/25 bg-amber-500/5 p-3 flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5">
            <Crown className="h-3.5 w-3.5 text-amber-500 shrink-0" />
            <span className="font-heading font-bold text-xs uppercase tracking-wide text-amber-600 dark:text-amber-400">
              {copy.coreRule}
            </span>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed text-foreground/95">
            {tldr.coreRule[locale]}
          </p>
        </div>

        <div className="rounded-xl border-l-4 border-l-emerald-500 border border-emerald-500/25 bg-emerald-500/5 p-3 flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
            <span className="font-heading font-bold text-xs uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
              {copy.immediateAction}
            </span>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed text-foreground/95">
            {tldr.immediateAction[locale]}
          </p>
        </div>

        <div className="rounded-xl border-l-4 border-l-rose-500 border border-rose-500/25 bg-rose-500/5 p-3 flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5">
            <AlertOctagon className="h-3.5 w-3.5 text-rose-500 shrink-0" />
            <span className="font-heading font-bold text-xs uppercase tracking-wide text-rose-600 dark:text-rose-400">
              {copy.strictTaboo}
            </span>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed text-foreground/95">
            {tldr.strictTaboo[locale]}
          </p>
        </div>
      </div>

      {/* Integrated Collapsible Key Takeaways Drawer */}
      {hasTakeaways && keyTakeaways && (
        <div className="pt-2 border-t border-amber-500/20">
          <button
            type="button"
            data-testid="tldr-takeaways-toggle"
            aria-expanded={isTakeawaysOpen}
            onClick={() => setIsTakeawaysOpen((prev) => !prev)}
            className="w-full min-h-[36px] flex items-center justify-between gap-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/15 border border-emerald-500/25 px-3 py-1.5 text-xs font-heading font-bold text-emerald-700 dark:text-emerald-300 transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
              <span>
                {isTakeawaysOpen
                  ? copy.hideTakeaways
                  : copy.showTakeaways(keyTakeaways.length)}
              </span>
            </span>
            {isTakeawaysOpen ? (
              <ChevronUp className="h-4 w-4 shrink-0" />
            ) : (
              <ChevronDown className="h-4 w-4 shrink-0" />
            )}
          </button>

          {isTakeawaysOpen && (
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2.5 text-xs sm:text-sm text-foreground/90">
              {keyTakeaways.map((item, idx) => (
                <li
                  key={idx}
                  className="rounded-lg border border-emerald-500/20 bg-background/60 px-3 py-2 flex items-start gap-2 leading-relaxed"
                >
                  <span className="font-mono font-bold text-emerald-500 shrink-0">
                    {idx + 1}.
                  </span>
                  <span>{item[locale]}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}


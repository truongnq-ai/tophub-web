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
import { RichGuideText } from "./rich-guide-text";

interface TldrActionBoxProps {
  tldr: GuideTldrSummary;
  locale: GuideLocale;
  keyTakeaways?: LocalizedText[];
}

const LABELS = {
  vi: {
    heading: "Tóm Tắt 30 Giây (TL;DR — Áp Dụng Ngay)",
    coreRule: "Nguyên tắc số 1",
    immediateAction: "Hành động ngay hôm nay",
    strictTaboo: "Cấm kỵ tuyệt đối",
    showTakeaways: (count: number) => `Xem ${count} định mức số liệu cốt lõi`,
    hideTakeaways: "Thu gọn định mức số liệu cốt lõi",
  },
  en: {
    heading: "30-Second Actionable Summary (TL;DR)",
    coreRule: "Golden Rule #1",
    immediateAction: "Immediate Action Today",
    strictTaboo: "Strictly Forbidden",
    showTakeaways: (count: number) =>
      `View ${count} core quantitative takeaways`,
    hideTakeaways: "Hide core quantitative takeaways",
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
    <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-card/85 p-4 sm:p-5 space-y-3.5 shadow-sm">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-amber-500/80 via-emerald-500/50 to-rose-500/70"
      />

      <div className="flex items-center justify-between gap-2 text-xs sm:text-sm font-heading font-black uppercase tracking-wider text-foreground">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-amber-500/25 bg-amber-500/10 text-amber-500">
            <Target className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
          <span>{copy.heading}</span>
        </div>
      </div>

      {/* 3-Column Neutral Bento Partition Grid (DEC-V4-02) */}
      <div
        data-testid="tldr-bento-grid"
        className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border/60 rounded-xl border border-border/70 bg-background/55 overflow-hidden"
      >
        <div className="p-3.5 sm:p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-amber-500/25 bg-amber-500/10 text-amber-500">
              <Crown className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <span className="inline-flex items-center rounded-md bg-amber-500/10 px-2 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              {copy.coreRule}
            </span>
          </div>
          <RichGuideText
            text={tldr.coreRule[locale]}
            variant="structured-brief"
            accentColor="amber"
            className="text-xs sm:text-sm leading-relaxed text-foreground/95"
          />
        </div>

        <div className="p-3.5 sm:p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-emerald-500/25 bg-emerald-500/10 text-emerald-500">
              <Zap className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              {copy.immediateAction}
            </span>
          </div>
          <RichGuideText
            text={tldr.immediateAction[locale]}
            variant="structured-brief"
            accentColor="emerald"
            className="text-xs sm:text-sm leading-relaxed text-foreground/95"
          />
        </div>

        <div className="p-3.5 sm:p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-rose-500/25 bg-rose-500/10 text-rose-500">
              <AlertOctagon className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <span className="inline-flex items-center rounded-md bg-rose-500/10 px-2 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              {copy.strictTaboo}
            </span>
          </div>
          <RichGuideText
            text={tldr.strictTaboo[locale]}
            variant="structured-brief"
            accentColor="rose"
            className="text-xs sm:text-sm leading-relaxed text-foreground/95"
          />
        </div>
      </div>

      {/* Integrated Collapsible Key Takeaways Drawer */}
      {hasTakeaways && keyTakeaways && (
        <div className="pt-2 border-t border-border/60">
          <button
            type="button"
            data-testid="tldr-takeaways-toggle"
            aria-expanded={isTakeawaysOpen}
            onClick={() => setIsTakeawaysOpen((prev) => !prev)}
            className="w-full min-h-[36px] flex items-center justify-between gap-2 rounded-xl bg-background/70 hover:bg-muted/60 border border-border/70 px-3 py-1.5 text-xs font-heading font-bold text-foreground transition-colors cursor-pointer"
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
              <ChevronUp className="h-4 w-4 shrink-0 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
            )}
          </button>

          {isTakeawaysOpen && (
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2.5 text-xs sm:text-sm text-foreground/90">
              {keyTakeaways.map((item, idx) => (
                <li
                  key={idx}
                  className="rounded-lg border border-border/70 bg-background/60 px-3 py-2 flex items-start gap-2 leading-relaxed"
                >
                  <span className="font-mono font-bold text-emerald-500 shrink-0">
                    {idx + 1}.
                  </span>
                  <RichGuideText
                    text={item[locale]}
                    accentColor="emerald"
                    className="flex-1 min-w-0"
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}


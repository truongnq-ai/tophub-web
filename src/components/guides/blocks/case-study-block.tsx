import React from "react";
import {
  Stethoscope,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import type { GuideCaseStudyBlock, GuideLocale } from "@/content/guides/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CaseStudyBlockProps {
  block: GuideCaseStudyBlock;
  locale: GuideLocale;
}

export function CaseStudyBlock({ block, locale }: CaseStudyBlockProps) {
  const hasDiagnostics = Boolean(
    block.diagnostics && block.diagnostics.length > 0
  );

  return (
    <div className="rounded-3xl border-2 border-amber-500/40 bg-gradient-to-br from-amber-500/10 via-card/95 to-card p-4 sm:p-6 space-y-4 shadow-md">
      {/* Header */}
      <div className="space-y-2">
        <Badge className="bg-amber-500 text-slate-950 font-mono text-xs font-bold px-2.5 py-0.5 inline-flex items-center gap-1.5">
          <Stethoscope className="h-3.5 w-3.5" />
          <span>{block.badge[locale]}</span>
        </Badge>
        <h4 className="font-heading font-black text-base sm:text-lg text-foreground">
          {block.title[locale]}
        </h4>
        <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed bg-background/70 rounded-xl border border-border/70 p-3">
          {block.profileSummary[locale]}
        </p>
      </div>

      {/* Before / After Metrics Grid */}
      {block.metrics && block.metrics.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {block.metrics.map((m, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-border/80 bg-background/80 p-3 space-y-1"
            >
              <span className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                {m.label[locale]}
              </span>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold">
                <span className="text-rose-500 line-through">
                  {m.before[locale]}
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                <span className="text-emerald-600 dark:text-emerald-400">
                  {m.after[locale]}
                </span>
              </div>
              {m.delta && (
                <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400">
                  <TrendingUp className="h-3 w-3" />
                  {m.delta[locale]}
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 2-Column Diagnostic Split Card (Left 5 cols: Root Causes | Right 7 cols: Recovery Steps) */}
      <div
        data-testid="case-study-split-grid"
        className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start"
      >
        {hasDiagnostics && block.diagnostics && (
          <div className="lg:col-span-5 rounded-2xl border border-rose-500/35 bg-rose-500/5 p-3.5 sm:p-4 space-y-2.5">
            <h5 className="font-heading font-bold text-xs sm:text-sm uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>
                {locale === "en"
                  ? "Root-Cause Audit Findings"
                  : "Chẩn Đoán Nguyên Nhân Gốc Rễ"}
              </span>
            </h5>
            <ul className="space-y-2 text-xs sm:text-sm text-foreground/90">
              {block.diagnostics.map((diag, dIdx) => (
                <li
                  key={dIdx}
                  className="rounded-xl border border-rose-500/20 bg-background/70 p-2.5 flex items-start gap-2 leading-relaxed"
                >
                  <span className="font-mono font-bold text-rose-500 shrink-0">
                    {dIdx + 1}.
                  </span>
                  <span>{diag[locale]}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div
          className={cn(
            "space-y-2.5",
            hasDiagnostics ? "lg:col-span-7" : "lg:col-span-12"
          )}
        >
          <h5 className="font-heading font-bold text-xs sm:text-sm uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>
              {locale === "en"
                ? "Step-by-Step Execution & Recovery Protocol"
                : "Phác Đồ Hành Động & Cấp Cứu Từng Bước"}
            </span>
          </h5>

          <div className="space-y-2">
            {block.recoverySteps.map((step, sIdx) => (
              <div
                key={sIdx}
                className="rounded-2xl border border-emerald-500/30 bg-background/85 p-3 sm:p-3.5 space-y-1"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-heading font-bold text-xs sm:text-sm text-foreground">
                    <strong className="font-mono text-emerald-600 dark:text-emerald-400 mr-1.5">
                      {step.stepNumber}.
                    </strong>
                    {step.title[locale]}
                  </span>
                  {step.impactBadge && (
                    <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono text-[11px] font-bold">
                      {step.impactBadge[locale]}
                    </Badge>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {step.detail[locale]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {block.conclusion && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs sm:text-sm font-semibold text-foreground">
          {block.conclusion[locale]}
        </div>
      )}
    </div>
  );
}


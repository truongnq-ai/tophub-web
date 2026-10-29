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
import { RichGuideText } from "./rich-guide-text";

interface CaseStudyBlockProps {
  block: GuideCaseStudyBlock;
  locale: GuideLocale;
}

function formatStepNumber(
  stepNumber: number | string,
  locale: GuideLocale
): string {
  if (typeof stepNumber === "number") return String(stepNumber);
  if (stepNumber.includes("/")) {
    const parts = stepNumber.split("/").map((p) => p.trim());
    return locale === "en" ? parts[1] || parts[0] : parts[0];
  }
  if (locale === "en") {
    return stepNumber.replace(/^Bước\s+/i, "Step ");
  }
  return stepNumber;
}

export function CaseStudyBlock({ block, locale }: CaseStudyBlockProps) {
  const hasDiagnostics = Boolean(
    block.diagnostics && block.diagnostics.length > 0
  );

  return (
    <div className="rounded-3xl border-2 border-amber-500/40 bg-gradient-to-br from-amber-500/10 via-card/95 to-card p-3.5 sm:p-6 space-y-4 shadow-md">
      {/* Header */}
      <div className="space-y-2">
        <Badge className="bg-amber-500 text-slate-950 font-sans text-xs font-bold px-2.5 py-0.5 inline-flex items-center gap-1.5">
          <Stethoscope className="h-3.5 w-3.5 shrink-0" />
          <RichGuideText
            text={block.badge[locale]}
            variant="inline"
            locale={locale}
          />
        </Badge>
        <h4 className="font-heading font-black text-base sm:text-lg text-foreground">
          <RichGuideText
            text={block.title[locale]}
            variant="inline"
            locale={locale}
          />
        </h4>
        <RichGuideText
          text={block.profileSummary[locale]}
          locale={locale}
          className="text-sm sm:text-base text-foreground/95 leading-relaxed bg-muted/45 dark:bg-muted/25 rounded-xl p-3.5"
        />
      </div>

      {/* Before / After Metrics Grid (Flat Tonal Surface without inner borders) */}
      {block.metrics && block.metrics.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {block.metrics.map((m, idx) => (
            <div
              key={idx}
              className="rounded-xl bg-muted/45 dark:bg-muted/25 p-3.5 space-y-1.5"
            >
              <span className="block text-xs font-sans font-semibold uppercase tracking-wider text-muted-foreground">
                <RichGuideText
                  text={m.label[locale]}
                  variant="inline"
                  locale={locale}
                />
              </span>
              <div className="flex items-center gap-2 text-sm sm:text-base font-bold font-mono tabular-nums">
                <span className="text-rose-500 line-through">
                  <RichGuideText
                    text={m.before[locale]}
                    variant="inline"
                    locale={locale}
                    accentColor="rose"
                  />
                </span>
                <ArrowRight className="h-4 w-4 text-amber-500 shrink-0" />
                <span className="text-emerald-600 dark:text-emerald-400">
                  <RichGuideText
                    text={m.after[locale]}
                    variant="inline"
                    locale={locale}
                    accentColor="emerald"
                  />
                </span>
              </div>
              {m.delta && (
                <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
                  <TrendingUp className="h-3.5 w-3.5 shrink-0" />
                  <RichGuideText
                    text={m.delta[locale]}
                    variant="inline"
                    locale={locale}
                    accentColor="amber"
                  />
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 2-Column Diagnostic Split Card (Left 5 cols: Root Causes | Right 7 cols: Recovery Steps — Single-Layer Tonal + Hairline Dividers) */}
      <div
        data-testid="case-study-split-grid"
        className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start"
      >
        {hasDiagnostics && block.diagnostics && (
          <div className="lg:col-span-5 rounded-2xl bg-rose-500/10 dark:bg-rose-500/15 p-3.5 sm:p-4 space-y-2.5">
            <h5 className="font-heading font-bold text-xs sm:text-sm uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>
                {locale === "en"
                  ? "Root-Cause Audit Findings"
                  : "Chẩn Đoán Nguyên Nhân Gốc Rễ"}
              </span>
            </h5>
            <ul className="divide-y divide-rose-500/20 text-sm sm:text-base text-foreground/95">
              {block.diagnostics.map((diag, dIdx) => (
                <li
                  key={dIdx}
                  className="py-2.5 first:pt-1 last:pb-0 flex items-start gap-2.5 leading-relaxed"
                >
                  <span className="font-mono text-xs sm:text-sm font-bold text-rose-500 shrink-0 mt-0.5">
                    {dIdx + 1}.
                  </span>
                  <RichGuideText
                    text={diag[locale]}
                    locale={locale}
                    accentColor="rose"
                    className="flex-1 min-w-0"
                  />
                </li>
              ))}
            </ul>
          </div>
        )}

        <div
          className={cn(
            "rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/15 p-3.5 sm:p-4 space-y-2.5",
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

          <div className="divide-y divide-emerald-500/20">
            {block.recoverySteps.map((step, sIdx) => (
              <div
                key={sIdx}
                className="py-3 first:pt-1 last:pb-0 space-y-1.5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-heading font-bold text-sm sm:text-base text-foreground">
                    <strong className="font-mono text-emerald-600 dark:text-emerald-400 mr-1.5">
                      {formatStepNumber(step.stepNumber, locale)}.
                    </strong>
                    <RichGuideText
                      text={step.title[locale]}
                      variant="inline"
                      locale={locale}
                      accentColor="emerald"
                    />
                  </span>
                  {step.impactBadge && (
                    <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-sans text-xs font-bold">
                      <RichGuideText
                        text={step.impactBadge[locale]}
                        variant="inline"
                        locale={locale}
                        accentColor="emerald"
                      />
                    </Badge>
                  )}
                </div>
                <RichGuideText
                  text={step.detail[locale]}
                  locale={locale}
                  accentColor="emerald"
                  className="text-sm sm:text-base text-foreground/90 leading-relaxed"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {block.conclusion && (
        <RichGuideText
          text={block.conclusion[locale]}
          locale={locale}
          accentColor="amber"
          className="rounded-xl bg-amber-500/15 p-3.5 text-sm sm:text-base font-semibold text-foreground leading-relaxed"
        />
      )}
    </div>
  );
}

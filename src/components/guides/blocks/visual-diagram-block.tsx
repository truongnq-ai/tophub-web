import React from "react";
import {
  Network,
  ArrowRight,
  ArrowDown,
  CheckCircle2,
  XCircle,
  Sparkles,
  BarChart3,
} from "lucide-react";
import type {
  GuideLocale,
  GuideVisualDiagramBlock,
  VisualDiagramNode,
} from "@/content/guides/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface VisualDiagramBlockProps {
  block: GuideVisualDiagramBlock;
  locale: GuideLocale;
}

const TONE_CLASSES: Record<
  NonNullable<VisualDiagramNode["tone"]>,
  { card: string; badge: string; text: string; bar: string }
> = {
  gold: {
    card: "border-amber-500/40 bg-amber-500/10",
    badge:
      "bg-amber-500/20 text-amber-600 dark:text-amber-300 border-amber-500/40",
    text: "text-amber-600 dark:text-amber-400",
    bar: "bg-gradient-to-r from-amber-500 to-yellow-400",
  },
  emerald: {
    card: "border-emerald-500/40 bg-emerald-500/10",
    badge:
      "bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border-emerald-500/40",
    text: "text-emerald-600 dark:text-emerald-400",
    bar: "bg-gradient-to-r from-emerald-500 to-teal-400",
  },
  rose: {
    card: "border-rose-500/40 bg-rose-500/10",
    badge:
      "bg-rose-500/20 text-rose-600 dark:text-rose-300 border-rose-500/40",
    text: "text-rose-600 dark:text-rose-400",
    bar: "bg-gradient-to-r from-rose-500 to-pink-400",
  },
  blue: {
    card: "border-sky-500/40 bg-sky-500/10",
    badge:
      "bg-sky-500/20 text-sky-600 dark:text-sky-300 border-sky-500/40",
    text: "text-sky-600 dark:text-sky-400",
    bar: "bg-gradient-to-r from-sky-500 to-cyan-400",
  },
  slate: {
    card: "border-border/80 bg-card/80",
    badge: "bg-muted text-muted-foreground border-border",
    text: "text-foreground",
    bar: "bg-amber-500/70",
  },
};

export function extractPercentage(
  ...sources: Array<string | undefined>
): number | null {
  for (const src of sources) {
    if (!src) continue;
    const match = src.match(/(\d+(?:\.\d+)?)\s*%/);
    if (match) {
      const value = Number.parseFloat(match[1]);
      if (!Number.isNaN(value)) {
        return Math.max(5, Math.min(100, Math.round(value)));
      }
    }
  }
  return null;
}

export function VisualDiagramBlock({ block, locale }: VisualDiagramBlockProps) {
  const hasDownstream =
    Boolean(block.branches && block.branches.length > 0) ||
    Boolean(block.nodes && block.nodes.length > 0);

  return (
    <div className="rounded-2xl border border-amber-500/30 bg-card/80 p-4 sm:p-5 space-y-3.5 shadow-sm">
      {/* Diagram Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-border/70">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/15 text-amber-500 shrink-0">
            {block.variant === "metric_bars" ? (
              <BarChart3 className="h-4 w-4" />
            ) : (
              <Network className="h-4 w-4" />
            )}
          </div>
          <div>
            <h4 className="font-heading font-bold text-sm sm:text-base text-foreground">
              {block.title[locale]}
            </h4>
            {block.subtitle && (
              <p className="text-xs text-muted-foreground">
                {block.subtitle[locale]}
              </p>
            )}
          </div>
        </div>
        {block.mediaCode && (
          <Badge
            variant="outline"
            className="font-mono text-[10px] border-amber-500/30 text-amber-600 dark:text-amber-400"
          >
            {block.mediaCode}
          </Badge>
        )}
      </div>

      {/* Center / Root Node (if present) */}
      {block.centerNode && (
        <div className="space-y-2">
          <div className="rounded-2xl border-2 border-amber-500/50 bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-transparent p-3.5 text-center space-y-1">
            {block.centerNode.badge && (
              <span className="inline-block font-mono text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                {block.centerNode.badge[locale]}
              </span>
            )}
            <p className="font-heading font-black text-base sm:text-lg text-foreground">
              {block.centerNode.title[locale]}
            </p>
            {block.centerNode.subtitle && (
              <p className="text-xs text-muted-foreground">
                {block.centerNode.subtitle[locale]}
              </p>
            )}
          </div>

          {hasDownstream && (
            <div
              data-testid="diagram-flow-connector"
              className="flex flex-col items-center justify-center py-0.5 text-amber-500"
            >
              <div className="h-3 w-0.5 bg-amber-500/40" />
              <div className="flex h-6 w-6 items-center justify-center rounded-full border border-amber-500/40 bg-amber-500/10">
                <ArrowDown className="h-3.5 w-3.5" />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Branches Comparison (comparison_split / timeline_phases) */}
      {block.branches && block.branches.length > 0 && (
        <div
          className={cn(
            "grid grid-cols-1 gap-3.5",
            block.branches.length === 2 ? "md:grid-cols-2" : "lg:grid-cols-3"
          )}
        >
          {block.branches.map((branch, bIdx) => {
            const toneStyle = TONE_CLASSES[branch.tone];
            const isPositive =
              branch.tone === "emerald" || branch.tone === "gold";
            return (
              <div
                key={bIdx}
                className={cn(
                  "rounded-2xl border p-3.5 sm:p-4 flex flex-col justify-between space-y-3",
                  toneStyle.card
                )}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={cn(
                        "font-heading font-bold text-xs sm:text-sm flex items-center gap-1.5",
                        toneStyle.text
                      )}
                    >
                      {isPositive ? (
                        <CheckCircle2 className="h-4 w-4 shrink-0" />
                      ) : (
                        <XCircle className="h-4 w-4 shrink-0" />
                      )}
                      {branch.title[locale]}
                    </span>
                    {branch.badge && (
                      <Badge
                        variant="outline"
                        className={cn("text-[10px] font-mono", toneStyle.badge)}
                      >
                        {branch.badge[locale]}
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    {branch.steps.map((step, sIdx) => (
                      <React.Fragment key={step.id}>
                        <div className="rounded-xl border border-border/70 bg-background/85 p-2.5 sm:p-3 space-y-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-heading font-bold text-xs sm:text-sm text-foreground">
                              {step.title[locale]}
                            </span>
                            {step.badge && (
                              <span className="font-mono text-[10px] font-bold text-amber-600 dark:text-amber-400 shrink-0">
                                {step.badge[locale]}
                              </span>
                            )}
                          </div>
                          {step.subtitle && (
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {step.subtitle[locale]}
                            </p>
                          )}
                        </div>
                        {sIdx < branch.steps.length - 1 && (
                          <div className="flex justify-center text-muted-foreground/60">
                            <ArrowDown className="h-3.5 w-3.5" />
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl bg-background/90 border border-border/80 px-3 py-2 text-xs font-bold flex items-center gap-2">
                  <ArrowRight
                    className={cn("h-4 w-4 shrink-0", toneStyle.text)}
                  />
                  <span className="text-foreground/95">
                    {branch.outcome[locale]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Nodes Grid (hub_pillars / decision_flow / metric_bars) */}
      {block.nodes && block.nodes.length > 0 && (
        <div
          className={cn(
            "grid grid-cols-1 gap-2.5",
            block.variant === "metric_bars"
              ? "grid-cols-1"
              : "sm:grid-cols-2 lg:grid-cols-3"
          )}
        >
          {block.nodes.map((node) => {
            const tone = node.tone ?? "slate";
            const toneStyle = TONE_CLASSES[tone];
            const pct =
              block.variant === "metric_bars"
                ? extractPercentage(
                    node.badge?.[locale],
                    node.subtitle?.[locale],
                    node.metrics?.[0]?.[locale]
                  )
                : null;

            return (
              <div
                key={node.id}
                className={cn(
                  "rounded-xl border p-3 sm:p-3.5 space-y-2 transition-all",
                  toneStyle.card
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-heading font-bold text-xs sm:text-sm text-foreground">
                    {node.title[locale]}
                  </span>
                  {node.badge && (
                    <Badge
                      variant="outline"
                      className={cn(
                        "font-mono text-[10px] shrink-0",
                        toneStyle.badge
                      )}
                    >
                      {node.badge[locale]}
                    </Badge>
                  )}
                </div>

                {pct !== null && (
                  <div className="h-2 w-full rounded-full bg-background/80 border border-border/60 overflow-hidden">
                    <div
                      data-testid="diagram-metric-bar"
                      className={cn("h-full rounded-full transition-all", toneStyle.bar)}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                )}

                {node.subtitle && (
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {node.subtitle[locale]}
                  </p>
                )}
                {node.metrics && node.metrics.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {node.metrics.map((m, mIdx) => (
                      <span
                        key={mIdx}
                        className="inline-flex items-center gap-1 rounded-md bg-background/80 border border-border/60 px-2 py-0.5 font-mono text-[11px] text-foreground/90"
                      >
                        <Sparkles className="h-2.5 w-2.5 text-amber-500" />
                        {m[locale]}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Footnote */}
      {block.footnote && (
        <p className="text-xs text-muted-foreground italic border-t border-border/60 pt-2.5">
          {block.footnote[locale]}
        </p>
      )}
    </div>
  );
}


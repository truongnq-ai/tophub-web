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
import { GameAssetFrame } from "@/components/guides/media/game-asset-frame";
import { resolveEntityFromDiagramNode } from "@/content/guides/asset-registry";
import type {
  GuideLocale,
  GuideVisualDiagramBlock,
  VisualDiagramNode,
} from "@/content/guides/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { RichGuideText } from "./rich-guide-text";

interface VisualDiagramBlockProps {
  block: GuideVisualDiagramBlock;
  locale: GuideLocale;
}

const TONE_CLASSES: Record<
  NonNullable<VisualDiagramNode["tone"]>,
  { card: string; badge: string; text: string; bar: string }
> = {
  gold: {
    card: "bg-amber-500/10 dark:bg-amber-500/15",
    badge:
      "bg-amber-500/20 text-amber-600 dark:text-amber-300 border-amber-500/40",
    text: "text-amber-600 dark:text-amber-400",
    bar: "bg-gradient-to-r from-amber-500 to-yellow-400",
  },
  emerald: {
    card: "bg-emerald-500/10 dark:bg-emerald-500/15",
    badge:
      "bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border-emerald-500/40",
    text: "text-emerald-600 dark:text-emerald-400",
    bar: "bg-gradient-to-r from-emerald-500 to-teal-400",
  },
  rose: {
    card: "bg-rose-500/10 dark:bg-rose-500/15",
    badge:
      "bg-rose-500/20 text-rose-600 dark:text-rose-300 border-rose-500/40",
    text: "text-rose-600 dark:text-rose-400",
    bar: "bg-gradient-to-r from-rose-500 to-pink-400",
  },
  blue: {
    card: "bg-sky-500/10 dark:bg-sky-500/15",
    badge:
      "bg-sky-500/20 text-sky-600 dark:text-sky-300 border-sky-500/40",
    text: "text-sky-600 dark:text-sky-400",
    bar: "bg-gradient-to-r from-sky-500 to-cyan-400",
  },
  slate: {
    card: "bg-muted/45 dark:bg-muted/25",
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

  const centerAsset = block.centerNode
    ? resolveEntityFromDiagramNode({
        titleVi: block.centerNode.title.vi,
        titleEn: block.centerNode.title.en,
        subtitleVi: block.centerNode.subtitle?.vi,
        subtitleEn: block.centerNode.subtitle?.en,
        nodeId: block.centerNode.id,
        mediaCode: block.mediaCode,
      })
    : undefined;

  return (
    <div className="rounded-2xl border border-amber-500/30 bg-card/85 p-3.5 sm:p-5 space-y-4 shadow-sm">
      {/* Diagram Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-border/70">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/15 text-amber-500 shrink-0">
            {block.variant === "metric_bars" ? (
              <BarChart3 className="h-4 w-4" />
            ) : (
              <Network className="h-4 w-4" />
            )}
          </div>
          <div>
            <h4 className="font-heading font-bold text-base sm:text-lg text-foreground">
              <RichGuideText
                text={block.title[locale]}
                variant="inline"
                locale={locale}
              />
            </h4>
            {block.subtitle && (
              <RichGuideText
                text={block.subtitle[locale]}
                locale={locale}
                className="text-xs sm:text-sm text-muted-foreground"
              />
            )}
          </div>
        </div>
        {block.mediaCode && (
          <Badge
            variant="outline"
            className="font-mono text-xs border-amber-500/30 text-amber-600 dark:text-amber-400"
          >
            {block.mediaCode}
          </Badge>
        )}
      </div>

      {/* Center / Root Node (if present) */}
      {block.centerNode && (
        <div className="space-y-2">
          <div className="rounded-2xl bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-amber-500/5 p-3.5 sm:p-4 text-center space-y-1.5">
            {block.centerNode.badge && (
              <span className="inline-block font-sans text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                <RichGuideText
                  text={block.centerNode.badge[locale]}
                  variant="inline"
                  locale={locale}
                />
              </span>
            )}
            <div className="flex items-center justify-center gap-2.5">
              {centerAsset && (
                <GameAssetFrame
                  src={centerAsset.iconPath}
                  rarity={centerAsset.rarity}
                  faction={centerAsset.faction}
                  size="md"
                  alt=""
                />
              )}
              <p className="font-heading font-black text-base sm:text-lg text-foreground">
                <RichGuideText
                  text={block.centerNode.title[locale]}
                  variant="inline"
                  locale={locale}
                />
              </p>
            </div>
            {block.centerNode.subtitle && (
              <RichGuideText
                text={block.centerNode.subtitle[locale]}
                locale={locale}
                className="text-sm text-muted-foreground"
              />
            )}
          </div>

          {hasDownstream && (
            <div
              data-testid="diagram-flow-connector"
              className="flex flex-col items-center justify-center py-0.5 text-amber-500"
            >
              <div className="h-3 w-0.5 bg-amber-500/40" />
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/15">
                <ArrowDown className="h-3.5 w-3.5" />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Branches Comparison (comparison_split / timeline_phases — Single-Layer Tonal Surfaces) */}
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
                  "rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between space-y-3",
                  toneStyle.card
                )}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={cn(
                        "font-heading font-bold text-sm sm:text-base flex items-center gap-1.5",
                        toneStyle.text
                      )}
                    >
                      {isPositive ? (
                        <CheckCircle2 className="h-4 w-4 shrink-0" />
                      ) : (
                        <XCircle className="h-4 w-4 shrink-0" />
                      )}
                      <RichGuideText
                        text={branch.title[locale]}
                        variant="inline"
                        locale={locale}
                      />
                    </span>
                    {branch.badge && (
                      <Badge
                        variant="outline"
                        className={cn("text-xs font-sans font-bold", toneStyle.badge)}
                      >
                        <RichGuideText
                          text={branch.badge[locale]}
                          variant="inline"
                          locale={locale}
                        />
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    {branch.steps.map((step, sIdx) => {
                      const stepAsset = resolveEntityFromDiagramNode({
                        titleVi: step.title.vi,
                        titleEn: step.title.en,
                        subtitleVi: step.subtitle?.vi,
                        subtitleEn: step.subtitle?.en,
                        nodeId: step.id,
                        mediaCode: block.mediaCode,
                      });
                      return (
                        <React.Fragment key={step.id}>
                          <div className="rounded-xl bg-background/85 p-3 space-y-1">
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2 min-w-0">
                                {stepAsset && (
                                  <GameAssetFrame
                                    src={stepAsset.iconPath}
                                    rarity={stepAsset.rarity}
                                    faction={stepAsset.faction}
                                    size="md"
                                    alt=""
                                  />
                                )}
                                <span className="font-heading font-bold text-sm sm:text-base text-foreground">
                                  <RichGuideText
                                    text={step.title[locale]}
                                    variant="inline"
                                    locale={locale}
                                  />
                                </span>
                              </div>
                              {step.badge && (
                                <span className="font-sans text-xs font-bold text-amber-600 dark:text-amber-400 shrink-0">
                                  <RichGuideText
                                    text={step.badge[locale]}
                                    variant="inline"
                                    locale={locale}
                                  />
                                </span>
                              )}
                            </div>
                            {step.subtitle && (
                              <RichGuideText
                                text={step.subtitle[locale]}
                                locale={locale}
                                className="text-sm text-muted-foreground leading-relaxed"
                              />
                            )}
                          </div>
                          {sIdx < branch.steps.length - 1 && (
                            <div className="flex justify-center text-muted-foreground/60">
                              <ArrowDown className="h-3.5 w-3.5" />
                            </div>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>

                <div className="rounded-xl bg-background/90 px-3.5 py-2.5 text-sm font-bold flex items-center gap-2">
                  <ArrowRight
                    className={cn("h-4 w-4 shrink-0", toneStyle.text)}
                  />
                  <RichGuideText
                    text={branch.outcome[locale]}
                    locale={locale}
                    className="text-foreground/95 flex-1 min-w-0"
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Nodes Grid (hub_pillars / decision_flow / metric_bars — Single-Layer Tonal Surfaces) */}
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
            const nodeAsset = resolveEntityFromDiagramNode({
              titleVi: node.title.vi,
              titleEn: node.title.en,
              subtitleVi: node.subtitle?.vi,
              subtitleEn: node.subtitle?.en,
              nodeId: node.id,
              mediaCode: block.mediaCode,
            });

            return (
              <div
                key={node.id}
                className={cn(
                  "rounded-xl p-3.5 space-y-2 transition-all",
                  toneStyle.card
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    {nodeAsset && (
                      <GameAssetFrame
                        src={nodeAsset.iconPath}
                        rarity={nodeAsset.rarity}
                        faction={nodeAsset.faction}
                        size="md"
                        alt=""
                      />
                    )}
                    <span className="font-heading font-bold text-sm sm:text-base text-foreground">
                      <RichGuideText
                        text={node.title[locale]}
                        variant="inline"
                        locale={locale}
                      />
                    </span>
                  </div>
                  {node.badge && (
                    <Badge
                      variant="outline"
                      className={cn(
                        "font-sans text-xs font-bold shrink-0",
                        toneStyle.badge
                      )}
                    >
                      <RichGuideText
                        text={node.badge[locale]}
                        variant="inline"
                        locale={locale}
                      />
                    </Badge>
                  )}
                </div>

                {pct !== null && (
                  <div className="h-2 w-full rounded-full bg-background/80 overflow-hidden">
                    <div
                      data-testid="diagram-metric-bar"
                      className={cn(
                        "h-full rounded-full transition-all",
                        toneStyle.bar
                      )}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                )}

                {node.subtitle && (
                  <RichGuideText
                    text={node.subtitle[locale]}
                    locale={locale}
                    className="text-sm text-muted-foreground leading-relaxed"
                  />
                )}
                {node.metrics && node.metrics.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {node.metrics.map((m, mIdx) => (
                      <span
                        key={mIdx}
                        className="inline-flex items-center gap-1 rounded-md bg-background/85 px-2.5 py-1 font-sans text-xs font-medium text-foreground/95"
                      >
                        <Sparkles className="h-3 w-3 text-amber-500 shrink-0" />
                        <RichGuideText
                          text={m[locale]}
                          variant="inline"
                          locale={locale}
                        />
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
        <RichGuideText
          text={block.footnote[locale]}
          locale={locale}
          className="text-xs sm:text-sm text-muted-foreground italic border-t border-border/60 pt-2.5"
        />
      )}
    </div>
  );
}

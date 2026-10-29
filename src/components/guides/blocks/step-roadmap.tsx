"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Clock, Layers } from "lucide-react";
import type { GuideLocale } from "@/content/guides/types";
import { cn } from "@/lib/utils";
import { RichGuideText } from "./rich-guide-text";

export interface RoadmapStepItem {
  badge: string;
  milestoneTag?: string;
  title: string;
  timing: string;
  description: string;
}

interface StepRoadmapProps {
  steps: RoadmapStepItem[];
  locale?: GuideLocale;
}

const LABELS = {
  vi: {
    viewAll: "Xem tất cả",
    stepPrefix: "Bước",
  },
  en: {
    viewAll: "View all",
    stepPrefix: "Step",
  },
} as const;

export function StepRoadmap({ steps, locale = "vi" }: StepRoadmapProps) {
  const copy = LABELS[locale];
  const [selectedStep, setSelectedStep] = useState<number | null>(null);

  return (
    <div className="rounded-2xl border border-border/80 dark:border-amber-500/20 bg-card/85 p-3.5 sm:p-5 space-y-4 shadow-sm">
      {/* Interactive Stepper Bar (min-h-[44px] Touch Targets) */}
      {steps.length >= 2 && (
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          <button
            type="button"
            data-testid="stepper-view-all"
            onClick={() => setSelectedStep(null)}
            className={cn(
              "inline-flex items-center gap-1.5 min-h-[44px] px-3.5 py-2 rounded-xl border text-xs sm:text-sm font-heading font-bold whitespace-nowrap transition-all cursor-pointer",
              selectedStep === null
                ? "border-amber-400 bg-amber-500/15 text-amber-600 dark:text-amber-300 shadow-xs"
                : "border-border/70 bg-background/70 text-muted-foreground hover:text-foreground hover:border-amber-500/40"
            )}
          >
            <Layers className="h-4 w-4 shrink-0" />
            <span>{copy.viewAll}</span>
          </button>

          {steps.map((step, idx) => {
            const isSelected = selectedStep === idx;
            const pillLabel =
              step.badge || step.milestoneTag || `${copy.stepPrefix} ${idx + 1}`;
            return (
              <button
                key={idx}
                type="button"
                data-testid={`stepper-pill-${idx}`}
                onClick={() =>
                  setSelectedStep((prev) => (prev === idx ? null : idx))
                }
                className={cn(
                  "inline-flex items-center gap-1.5 min-h-[44px] px-3.5 py-2 rounded-xl border text-xs sm:text-sm font-sans font-bold whitespace-nowrap transition-all cursor-pointer",
                  isSelected
                    ? "border-amber-400 bg-amber-500 text-slate-950 shadow-xs"
                    : "border-border/70 bg-background/70 text-foreground/90 hover:border-amber-500/40"
                )}
              >
                <RichGuideText
                  text={pillLabel}
                  variant="inline"
                  locale={locale}
                  disableEntityChips
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Timeline Steps List (Single-Layer Containment — Tonal Surface Steps without inner border) */}
      <div className="relative pl-6 sm:pl-8 space-y-3.5 before:absolute before:left-2.5 sm:before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-amber-500 before:via-amber-500/50 before:to-transparent">
        {steps.map((step, idx) => {
          const isHidden = selectedStep !== null && selectedStep !== idx;
          const badgeText = step.badge || step.milestoneTag || "";
          return (
            <div
              key={idx}
              data-testid={`step-roadmap-item-${idx}`}
              data-step-hidden={isHidden ? "true" : "false"}
              className={cn(
                "relative rounded-xl bg-muted/40 dark:bg-muted/20 p-3.5 sm:p-4 transition-all",
                isHidden && "hidden"
              )}
            >
              {/* Node dot */}
              <span className="absolute -left-[23px] sm:-left-[27px] top-5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 ring-4 ring-card" />

              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <Badge className="bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30 font-sans text-xs font-bold">
                  <RichGuideText
                    text={badgeText}
                    variant="inline"
                    locale={locale}
                    disableEntityChips
                  />
                </Badge>
                <span className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-muted-foreground">
                  <Clock className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                  <RichGuideText
                    text={step.timing}
                    variant="inline"
                    locale={locale}
                  />
                </span>
              </div>

              <h4 className="font-heading font-bold text-base sm:text-lg text-foreground mb-1">
                <RichGuideText
                  text={step.title}
                  variant="inline"
                  locale={locale}
                />
              </h4>
              <RichGuideText
                text={step.description}
                locale={locale}
                className="text-sm sm:text-base text-foreground/90 leading-relaxed"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Clock, Layers } from "lucide-react";
import type { GuideLocale } from "@/content/guides/types";
import { cn } from "@/lib/utils";

export interface RoadmapStepItem {
  badge: string;
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
    <div className="space-y-3.5">
      {/* Interactive Stepper Bar */}
      {steps.length >= 2 && (
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          <button
            type="button"
            data-testid="stepper-view-all"
            onClick={() => setSelectedStep(null)}
            className={cn(
              "inline-flex items-center gap-1.5 min-h-[34px] px-3 py-1 rounded-xl border text-xs font-heading font-bold whitespace-nowrap transition-all cursor-pointer",
              selectedStep === null
                ? "border-amber-400 bg-amber-500/15 text-amber-600 dark:text-amber-300 shadow-xs"
                : "border-border/70 bg-card/70 text-muted-foreground hover:text-foreground hover:border-amber-500/40"
            )}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>{copy.viewAll}</span>
          </button>

          {steps.map((step, idx) => {
            const isSelected = selectedStep === idx;
            return (
              <button
                key={idx}
                type="button"
                data-testid={`stepper-pill-${idx}`}
                onClick={() =>
                  setSelectedStep((prev) => (prev === idx ? null : idx))
                }
                className={cn(
                  "inline-flex items-center gap-1.5 min-h-[34px] px-3 py-1 rounded-xl border text-xs font-mono font-bold whitespace-nowrap transition-all cursor-pointer",
                  isSelected
                    ? "border-amber-400 bg-amber-500 text-slate-950 shadow-xs"
                    : "border-border/70 bg-card/70 text-foreground/85 hover:border-amber-500/40"
                )}
              >
                <span>{step.badge || `${copy.stepPrefix} ${idx + 1}`}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Timeline Steps List */}
      <div className="relative pl-6 sm:pl-8 space-y-4 before:absolute before:left-2.5 sm:before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-amber-500 before:via-amber-500/50 before:to-transparent">
        {steps.map((step, idx) => {
          const isHidden = selectedStep !== null && selectedStep !== idx;
          return (
            <div
              key={idx}
              data-testid={`step-roadmap-item-${idx}`}
              data-step-hidden={isHidden ? "true" : "false"}
              className={cn(
                "relative rounded-2xl border border-border/80 dark:border-amber-500/20 bg-card/70 p-4 sm:p-5 shadow-sm hover:border-amber-500/40 transition-all",
                isHidden && "hidden"
              )}
            >
              {/* Node dot */}
              <span className="absolute -left-[23px] sm:-left-[27px] top-5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 ring-4 ring-background" />

              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <Badge className="bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30 font-mono text-xs font-bold">
                  {step.badge}
                </Badge>
                <span className="inline-flex items-center gap-1 text-xs font-mono text-muted-foreground">
                  <Clock className="h-3.5 w-3.5 text-amber-500" />
                  {step.timing}
                </span>
              </div>

              <h4 className="font-heading font-bold text-sm sm:text-base text-foreground mb-1">
                {step.title}
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}


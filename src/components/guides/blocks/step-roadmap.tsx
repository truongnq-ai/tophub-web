import React from "react";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

export interface RoadmapStepItem {
  badge: string;
  title: string;
  timing: string;
  description: string;
}

interface StepRoadmapProps {
  steps: RoadmapStepItem[];
}

export function StepRoadmap({ steps }: StepRoadmapProps) {
  return (
    <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2.5 sm:before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-amber-500 before:via-amber-500/50 before:to-transparent">
      {steps.map((step, idx) => (
        <div
          key={idx}
          className="relative rounded-2xl border border-border/80 dark:border-amber-500/20 bg-card/70 p-4 sm:p-5 shadow-sm hover:border-amber-500/40 transition-all"
        >
          {/* Node dot */}
          <span className="absolute -left-[23px] sm:-left-[27px] top-5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 ring-4 ring-background" />

          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
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
      ))}
    </div>
  );
}

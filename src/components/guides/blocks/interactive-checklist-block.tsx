"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  CheckSquare,
  Square,
  RotateCcw,
  Trophy,
  Eye,
  EyeOff,
} from "lucide-react";
import type { GuideChecklistBlock, GuideLocale } from "@/content/guides/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RichGuideText } from "./rich-guide-text";

interface InteractiveChecklistBlockProps {
  block: GuideChecklistBlock;
  locale: GuideLocale;
}

const STORAGE_PREFIX = "tophub_checklist_v2_";

export function InteractiveChecklistBlock({
  block,
  locale,
}: InteractiveChecklistBlockProps) {
  const storageKey = `${STORAGE_PREFIX}${block.checklistId}`;
  const validItemIds = useMemo(
    () => new Set(block.items.map((item) => item.id)),
    [block.items]
  );
  const [checkedIds, setCheckedIds] = useState<string[]>([]);
  const [showDetails, setShowDetails] = useState(true);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved) as unknown;
        if (Array.isArray(parsed)) {
          const sanitized = Array.from(
            new Set(
              parsed.filter(
                (item): item is string =>
                  typeof item === "string" && validItemIds.has(item)
              )
            )
          );
          setCheckedIds(sanitized);
        }
      }
    } catch {
      // Ignore storage access errors in private mode
    }
  }, [storageKey, validItemIds]);

  const toggleItem = (id: string) => {
    if (!validItemIds.has(id)) return;
    setCheckedIds((prev) => {
      const next = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(next));
      } catch {
        // Ignore storage write errors
      }
      return next;
    });
  };

  const handleReset = () => {
    setCheckedIds([]);
    try {
      window.localStorage.removeItem(storageKey);
    } catch {
      // Ignore storage remove errors
    }
  };

  const total = block.items.length;
  const completed = block.items.filter((item) =>
    checkedIds.includes(item.id)
  ).length;
  const percent =
    total > 0 ? Math.min(100, Math.round((completed / total) * 100)) : 0;

  return (
    <div className="rounded-2xl border border-emerald-500/35 bg-gradient-to-b from-emerald-500/10 via-card/90 to-card p-3.5 sm:p-5 space-y-3.5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-emerald-500 shrink-0" />
            <h4 className="font-heading font-bold text-base sm:text-lg text-foreground">
              <RichGuideText
                text={block.title[locale]}
                variant="inline"
                locale={locale}
              />
            </h4>
          </div>
          {block.description && (
            <RichGuideText
              text={block.description[locale]}
              locale={locale}
              className="text-sm text-muted-foreground leading-relaxed"
            />
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-mono text-xs font-bold">
            {completed}/{total} ({percent}%)
          </Badge>

          <button
            type="button"
            data-testid="checklist-details-toggle"
            aria-expanded={showDetails}
            onClick={() => setShowDetails((prev) => !prev)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-muted/50 hover:bg-muted/80 px-3 py-2 text-xs sm:text-sm font-heading font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer min-h-[44px]"
          >
            {showDetails ? (
              <>
                <EyeOff className="h-4 w-4 shrink-0" />
                <span>{locale === "en" ? "Hide details" : "Ẩn giải thích"}</span>
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 shrink-0" />
                <span>{locale === "en" ? "Show details" : "Hiện giải thích"}</span>
              </>
            )}
          </button>

          {completed > 0 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="min-h-[44px] px-3 text-xs sm:text-sm rounded-xl border-border/80"
            >
              <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
              <span>{locale === "en" ? "Reset" : "Đặt lại"}</span>
            </Button>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-amber-500 transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>

      {/* Checklist Interactive Items (Single-Layer Flat Tonal Container + min-h-[48px] Touch Targets) */}
      <div className="rounded-xl bg-muted/35 dark:bg-muted/20 divide-y divide-border/60 overflow-hidden">
        {block.items.map((item) => {
          const isChecked = checkedIds.includes(item.id);
          return (
            <div
              key={item.id}
              role="checkbox"
              tabIndex={0}
              aria-checked={isChecked}
              onClick={() => toggleItem(item.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggleItem(item.id);
                }
              }}
              className={cn(
                "w-full text-left px-3.5 py-3 flex items-start gap-3 transition-colors min-h-[48px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50",
                isChecked
                  ? "bg-emerald-500/10"
                  : "hover:bg-muted/50"
              )}
            >
              <div className="mt-0.5 shrink-0 text-emerald-500">
                {isChecked ? (
                  <CheckSquare className="h-5 w-5" />
                ) : (
                  <Square className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1 space-y-1 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span
                    className={cn(
                      "font-heading font-bold text-sm sm:text-base",
                      isChecked
                        ? "line-through text-muted-foreground"
                        : "text-foreground"
                    )}
                  >
                    <RichGuideText
                      text={item.label[locale]}
                      variant="inline"
                      locale={locale}
                      accentColor="emerald"
                    />
                  </span>
                  {item.badge && (
                    <Badge
                      variant="outline"
                      className="font-sans text-xs font-semibold border-amber-500/30 text-amber-600 dark:text-amber-400"
                    >
                      <RichGuideText
                        text={item.badge[locale]}
                        variant="inline"
                        locale={locale}
                      />
                    </Badge>
                  )}
                </div>
                <RichGuideText
                  text={item.detail[locale]}
                  locale={locale}
                  accentColor="emerald"
                  className={cn(
                    "text-sm sm:text-base text-muted-foreground leading-relaxed",
                    !showDetails && "hidden"
                  )}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

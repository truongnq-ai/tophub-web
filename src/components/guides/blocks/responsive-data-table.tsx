"use client";

import React, { useMemo, useState } from "react";
import { Search, ChevronDown, ChevronUp, Flame } from "lucide-react";
import type { GuideLocale } from "@/content/guides/types";
import { cn } from "@/lib/utils";

interface ResponsiveDataTableProps {
  caption?: string;
  headers: string[];
  rows: string[][];
  locale?: GuideLocale;
  defaultExpanded?: boolean;
}

const INITIAL_VISIBLE_ROWS = 6;
const COLLAPSE_THRESHOLD = 8;
const FILTER_THRESHOLD = 5;
const BREAKPOINT_REGEX =
  /(🔥|⭐|👑|★|Mythic|T10|T11|Điểm gãy|Breakpoint|Mốc gãy)/i;

const LABELS = {
  vi: {
    filterPlaceholder: "Lọc nhanh dòng dữ liệu...",
    showAll: (count: number) => `Xem đầy đủ ${count} dòng`,
    collapse: "Thu gọn bảng",
    noMatch: "Không tìm thấy dòng phù hợp",
  },
  en: {
    filterPlaceholder: "Quick filter table rows...",
    showAll: (count: number) => `Show all ${count} rows`,
    collapse: "Collapse table",
    noMatch: "No matching rows found",
  },
} as const;

export function isBreakpointRow(row: string[]): boolean {
  return row.some((cell) => BREAKPOINT_REGEX.test(cell));
}

export function ResponsiveDataTable({
  caption,
  headers,
  rows,
  locale = "vi",
  defaultExpanded = false,
}: ResponsiveDataTableProps) {
  const copy = LABELS[locale];
  const [filterQuery, setFilterQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const normalizedQuery = filterQuery.trim().toLowerCase();
  const showFilterInput = rows.length > FILTER_THRESHOLD;
  const canCollapse = rows.length > COLLAPSE_THRESHOLD;

  const filteredRows = useMemo(() => {
    if (!normalizedQuery) return rows;
    return rows.filter((row) =>
      row.some((cell) => cell.toLowerCase().includes(normalizedQuery))
    );
  }, [rows, normalizedQuery]);

  const visibleRows = useMemo(() => {
    if (normalizedQuery) return filteredRows;
    if (canCollapse && !isExpanded) {
      return filteredRows.slice(0, INITIAL_VISIBLE_ROWS);
    }
    return filteredRows;
  }, [filteredRows, normalizedQuery, canCollapse, isExpanded]);

  return (
    <div data-testid="block-table" className="space-y-2">
      {(caption || showFilterInput) && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
          {caption ? (
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              {caption}
            </p>
          ) : (
            <div />
          )}

          {showFilterInput && (
            <div className="relative w-full sm:w-56">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="search"
                data-testid="table-filter-input"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                placeholder={copy.filterPlaceholder}
                className="h-8 w-full rounded-lg border border-border/80 bg-background/80 pl-8 pr-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-amber-500 focus:outline-none"
              />
            </div>
          )}
        </div>
      )}

      <div className="w-full overflow-x-auto rounded-2xl border border-border/80 dark:border-amber-500/20 bg-card/70 shadow-sm">
        <table className="w-full min-w-[520px] border-collapse text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-border/80 bg-muted/50 dark:bg-amber-500/10">
              {headers.map((header, idx) => (
                <th
                  key={idx}
                  className={cn(
                    "px-3.5 py-2.5 font-heading font-bold text-foreground whitespace-nowrap",
                    idx === 0 &&
                      "sticky left-0 z-10 bg-muted/95 dark:bg-slate-900/95 backdrop-blur-xs"
                  )}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {visibleRows.length === 0 ? (
              <tr>
                <td
                  colSpan={Math.max(1, headers.length)}
                  className="px-4 py-6 text-center text-xs text-muted-foreground"
                >
                  {copy.noMatch}
                </td>
              </tr>
            ) : (
              visibleRows.map((row, rowIdx) => {
                const isBp = isBreakpointRow(row);
                return (
                  <tr
                    key={rowIdx}
                    data-breakpoint-row={isBp ? "true" : "false"}
                    className={cn(
                      "transition-colors",
                      isBp
                        ? "bg-amber-500/[0.08] dark:bg-amber-500/[0.12] hover:bg-amber-500/15"
                        : "hover:bg-amber-500/5"
                    )}
                  >
                    {row.map((cell, cellIdx) => (
                      <td
                        key={cellIdx}
                        className={cn(
                          "px-3.5 py-2.5 leading-relaxed",
                          cellIdx === 0
                            ? cn(
                                "sticky left-0 z-10 font-semibold whitespace-nowrap backdrop-blur-xs",
                                isBp
                                  ? "bg-amber-50/95 dark:bg-slate-900/95 text-amber-600 dark:text-amber-300 border-l-2 border-l-amber-500"
                                  : "bg-card/95 dark:bg-slate-950/90 text-amber-600 dark:text-amber-400"
                              )
                            : isBp
                              ? "font-medium text-foreground"
                              : "text-foreground/90"
                        )}
                      >
                        {cellIdx === 0 && isBp ? (
                          <span className="inline-flex items-center gap-1">
                            <Flame className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                            <span>{cell}</span>
                          </span>
                        ) : (
                          cell
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        {canCollapse && !normalizedQuery && (
          <div className="border-t border-border/60 bg-muted/30 px-4 py-2 flex justify-center">
            <button
              type="button"
              data-testid="table-expand-toggle"
              onClick={() => setIsExpanded((prev) => !prev)}
              className="inline-flex items-center gap-1.5 min-h-[36px] px-3 py-1 rounded-lg text-xs font-heading font-bold text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 transition-colors cursor-pointer"
            >
              <span>
                {isExpanded ? copy.collapse : copy.showAll(rows.length)}
              </span>
              {isExpanded ? (
                <ChevronUp className="h-3.5 w-3.5" />
              ) : (
                <ChevronDown className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


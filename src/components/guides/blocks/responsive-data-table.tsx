"use client";

import React, { useMemo, useState } from "react";
import { Search, ChevronDown, ChevronUp, Flame } from "lucide-react";
import { GameAssetFrame } from "@/components/guides/media/game-asset-frame";
import {
  getAssetById,
  resolveEntityFromTableCell,
} from "@/content/guides/asset-registry";
import type { GameAssetEntry, GuideLocale } from "@/content/guides/types";
import { cn } from "@/lib/utils";
import { RichGuideText } from "./rich-guide-text";

interface ResponsiveDataTableProps {
  caption?: string;
  headers: string[];
  rows: string[][];
  footnote?: string;
  locale?: GuideLocale;
  defaultExpanded?: boolean;
  fallbackRowAsset?: GameAssetEntry;
}

const INITIAL_VISIBLE_ROWS = 6;
const COLLAPSE_THRESHOLD = 8;
const FILTER_THRESHOLD = 5;
const BREAKPOINT_REGEX =
  /(🔥|⭐|👑|★|Mythic|T10|T11|Điểm gãy|Breakpoint|Mốc gãy)/i;
const PURE_NUMERIC_CELL_REGEX =
  /^[+\-~≈<>≤≥]?[\d.,]+(?:\s*(?:%|x|s|h|d|k|m|b|★|⭐|\+|\/|–|-)\s*[\d.,%x★⭐]*)*$/i;

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

function isPureNumericCell(cell: string): boolean {
  const stripped = cell.replace(/[*`]/g, "").trim();
  if (!stripped || stripped.length > 24) return false;
  return PURE_NUMERIC_CELL_REGEX.test(stripped);
}

function resolveRowCol0Asset(
  cell0: string | undefined,
  fallbackRowAsset?: GameAssetEntry
): GameAssetEntry | undefined {
  if (!cell0) return fallbackRowAsset;
  const direct = resolveEntityFromTableCell(cell0);
  if (direct) return direct;

  if (/^(?:★\s*)?VIP\s*\d+\b/i.test(cell0.trim())) {
    return getAssetById("item-vip-points") ?? fallbackRowAsset;
  }

  if (fallbackRowAsset) {
    if (/5-Star\s*MYTHIC|5\s*Sao\s*Đỏ/i.test(cell0)) {
      return getAssetById("item-mythic-promotion-stone") ?? fallbackRowAsset;
    }
    if (/^[1-4]★\s*Đỏ|^[1-4]-Star\s*Mythic/i.test(cell0.trim())) {
      return getAssetById("item-promotion-stone") ?? fallbackRowAsset;
    }
    return fallbackRowAsset;
  }

  return undefined;
}

export function ResponsiveDataTable({
  caption,
  headers,
  rows,
  footnote,
  locale = "vi",
  defaultExpanded = false,
  fallbackRowAsset,
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
      row.some((cell) =>
        cell.replace(/[*`]/g, "").toLowerCase().includes(normalizedQuery)
      )
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
    <div data-testid="block-table" className="space-y-2.5">
      {(caption || showFilterInput) && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 px-1">
          {caption ? (
            <p className="text-xs sm:text-sm font-heading font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              <RichGuideText text={caption} variant="inline" locale={locale} />
            </p>
          ) : (
            <div />
          )}

          {showFilterInput && (
            <div className="relative w-full sm:w-64">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                data-testid="table-filter-input"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                placeholder={copy.filterPlaceholder}
                className="h-11 min-h-[44px] w-full rounded-xl border border-border/80 bg-background/80 pl-9 pr-3 text-base sm:text-sm font-sans text-foreground placeholder:text-muted-foreground focus:border-amber-500 focus:outline-none"
              />
            </div>
          )}
        </div>
      )}

      <div className="w-full overflow-x-auto rounded-2xl border border-border/80 dark:border-amber-500/20 bg-card/85 shadow-sm">
        <table className="w-full min-w-[520px] border-collapse text-left text-sm font-sans">
          <thead>
            <tr className="border-b border-border/80 bg-muted/50 dark:bg-amber-500/10">
              {headers.map((header, idx) => (
                <th
                  key={idx}
                  className={cn(
                    "px-3.5 py-3 text-xs sm:text-sm font-heading font-bold text-foreground",
                    idx === 0
                      ? "sticky left-0 z-10 min-w-[136px] max-w-[172px] sm:max-w-[260px] whitespace-normal sm:whitespace-nowrap bg-muted/95 dark:bg-slate-900/95 backdrop-blur-xs"
                      : "whitespace-nowrap"
                  )}
                >
                  <RichGuideText
                    text={header}
                    variant="inline"
                    locale={locale}
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {visibleRows.length === 0 ? (
              <tr>
                <td
                  colSpan={Math.max(1, headers.length)}
                  className="px-4 py-6 text-center text-sm text-muted-foreground"
                >
                  {copy.noMatch}
                </td>
              </tr>
            ) : (
              visibleRows.map((row, rowIdx) => {
                const isBp = isBreakpointRow(row);
                const col0Asset = resolveRowCol0Asset(row[0], fallbackRowAsset);

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
                    {row.map((cell, cellIdx) => {
                      const rowAsset =
                        cellIdx === 0
                          ? col0Asset
                          : cellIdx === 1 && !col0Asset
                            ? resolveEntityFromTableCell(cell)
                            : undefined;
                      const isNumeric = cellIdx > 0 && isPureNumericCell(cell);

                      return (
                        <td
                          key={cellIdx}
                          className={cn(
                            "px-3.5 py-2.5 leading-relaxed",
                            isNumeric ? "font-mono tabular-nums" : "font-sans",
                            cellIdx === 0
                              ? cn(
                                  "sticky left-0 z-10 font-semibold min-w-[136px] max-w-[172px] sm:max-w-[260px] whitespace-normal sm:whitespace-nowrap backdrop-blur-xs",
                                  isBp
                                    ? "bg-amber-50/95 dark:bg-slate-900/95 text-amber-600 dark:text-amber-300 shadow-[inset_2px_0_0_0_rgba(245,158,11,0.85)]"
                                    : "bg-card/95 dark:bg-slate-950/90 text-amber-600 dark:text-amber-400"
                                )
                              : isBp
                                ? "font-medium text-foreground"
                                : "text-foreground/90"
                          )}
                        >
                          {(cellIdx === 0 && (isBp || rowAsset)) ||
                          (cellIdx === 1 && rowAsset) ? (
                            <span className="inline-flex items-center gap-2 min-w-0">
                              {cellIdx === 0 && isBp && (
                                <Flame className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                              )}
                              {rowAsset && (
                                <GameAssetFrame
                                  src={rowAsset.iconPath}
                                  rarity={rowAsset.rarity}
                                  faction={rowAsset.faction}
                                  size="sm"
                                  alt=""
                                />
                              )}
                              <span className="min-w-0 line-clamp-2 sm:line-clamp-none">
                                <RichGuideText
                                  text={cell}
                                  variant="inline"
                                  locale={locale}
                                />
                              </span>
                            </span>
                          ) : (
                            <RichGuideText
                              text={cell}
                              variant="inline"
                              locale={locale}
                            />
                          )}
                        </td>
                      );
                    })}
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
              className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 rounded-xl text-xs sm:text-sm font-heading font-bold text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 transition-colors cursor-pointer"
            >
              <span>
                {isExpanded ? copy.collapse : copy.showAll(rows.length)}
              </span>
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
          </div>
        )}
      </div>

      {footnote && (
        <p className="text-xs sm:text-sm font-sans text-muted-foreground italic leading-relaxed px-1">
          <RichGuideText text={footnote} variant="inline" locale={locale} />
        </p>
      )}
    </div>
  );
}

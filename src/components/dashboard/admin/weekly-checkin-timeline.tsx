"use client";

import React, { useState, useEffect } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Users,
  Loader2,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getAdminWeeklyTimelineAction } from "@/actions/admin";
import type { AdminWeeklyTimelineItem } from "@/types/api";

interface WeeklyCheckinTimelineProps {
  selectedDay: string | null;
  onSelectDay: (day: string | null) => void;
}

export function WeeklyCheckinTimeline({
  selectedDay,
  onSelectDay,
}: WeeklyCheckinTimelineProps) {
  const [timelineNodes, setTimelineNodes] = useState<AdminWeeklyTimelineItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function loadTimeline() {
      try {
        setIsLoading(true);
        const res = await getAdminWeeklyTimelineAction();
        if (active && res.success && res.data) {
          setTimelineNodes(res.data);
        }
      } catch (err) {
        console.error("Failed to load weekly checkin timeline:", err);
      } finally {
        if (active) setIsLoading(false);
      }
    }

    loadTimeline();
    return () => {
      active = false;
    };
  }, []);

  const formatDateLabel = (gameDay: string) => {
    // gameDay is "YYYY-MM-DD"
    const parts = gameDay.split("-");
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}`;
    }
    return gameDay;
  };

  const handleNodeClick = (day: AdminWeeklyTimelineItem) => {
    if (selectedDay === day.game_day) {
      onSelectDay(null); // Toggle off
    } else {
      onSelectDay(day.game_day);
    }
  };

  return (
    <div className="rounded-2xl border border-border/60 bg-muted/20 p-3 sm:p-4 backdrop-blur-sm space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-amber-500" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-foreground font-heading flex items-center gap-1.5">
            <span>Tiến Độ Điểm Danh Tuần Hiện Tại</span>
            <span className="text-[10px] text-muted-foreground font-mono font-normal">
              (00:00 UTC)
            </span>
          </h3>
        </div>

        <div className="flex items-center gap-2 text-xs">
          {selectedDay ? (
            <div className="flex items-center gap-1.5">
              <span className="text-muted-foreground text-[11px]">Đang lọc:</span>
              <Badge className="bg-primary/20 text-primary border border-primary/30 text-[10px] font-mono font-bold">
                {selectedDay}
              </Badge>
              <button
                type="button"
                onClick={() => onSelectDay(null)}
                className="text-[10px] text-muted-foreground hover:text-foreground underline transition-colors cursor-pointer"
              >
                Xem tất cả
              </button>
            </div>
          ) : (
            <span className="text-[11px] text-muted-foreground italic">
              Click mốc ngày để lọc nhanh danh sách
            </span>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="py-6 flex items-center justify-center gap-2 text-muted-foreground text-xs">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
          <span>Đang tải thống kê timeline 7 ngày...</span>
        </div>
      ) : timelineNodes.length > 0 ? (
        <div className="overflow-x-auto pb-1 scrollbar-none">
          <div className="grid grid-cols-7 gap-2 min-w-[620px]">
            {timelineNodes.map((node) => {
              const isSelected = selectedDay === node.game_day;
              const isToday = node.is_today;
              const isFuture = node.is_future;

              return (
                <button
                  key={node.game_day}
                  type="button"
                  onClick={() => handleNodeClick(node)}
                  aria-label={`Mốc điểm danh ${node.label} (${node.game_day})`}
                  className={`group relative flex flex-col items-center justify-between p-2.5 rounded-xl border text-center transition-all duration-150 cursor-pointer min-h-[96px] ${
                    isSelected
                      ? "bg-primary/15 border-primary shadow-sm shadow-primary/20 ring-1 ring-primary/40"
                      : isToday
                      ? "bg-amber-500/10 border-amber-500/50 hover:border-amber-500 hover:bg-amber-500/15"
                      : isFuture
                      ? "bg-muted/10 border-dashed border-border/50 opacity-60 hover:opacity-80"
                      : "bg-card/60 hover:bg-muted/40 border-border/70 hover:border-border"
                  }`}
                >
                  {/* Today Ping Ring */}
                  {isToday && (
                    <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
                    </span>
                  )}

                  {/* Top Header: Day of week & Date */}
                  <div className="space-y-0.5 w-full">
                    <div className="flex items-center justify-center gap-1">
                      <span
                        className={`text-xs font-bold ${
                          isSelected
                            ? "text-primary font-black"
                            : isToday
                            ? "text-amber-500 font-black"
                            : "text-foreground"
                        }`}
                      >
                        {node.label}
                      </span>
                    </div>

                    <div className="text-[10px] font-mono text-muted-foreground">
                      {formatDateLabel(node.game_day)}
                    </div>
                  </div>

                  {/* Metric: Checked Users Count */}
                  <div className="py-1">
                    {isFuture ? (
                      <span className="text-[11px] font-mono text-muted-foreground/60 italic">
                        Chưa tới
                      </span>
                    ) : (
                      <div className="space-y-0.5">
                        <div
                          className={`font-mono text-sm font-black flex items-center justify-center gap-1 ${
                            node.success_count > 0
                              ? "text-emerald-500 dark:text-emerald-400"
                              : "text-rose-500"
                          }`}
                        >
                          <CheckCircle2 className="h-3 w-3" />
                          <span>{node.success_count}</span>
                        </div>
                        <div className="text-[9px] text-muted-foreground uppercase font-semibold">
                          users
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bottom Indicator Badge */}
                  <div className="w-full pt-1 border-t border-border/30">
                    {isToday ? (
                      <span className="inline-block text-[9px] font-extrabold uppercase text-amber-500 tracking-tight">
                        Hôm nay
                      </span>
                    ) : isSelected ? (
                      <span className="inline-block text-[9px] font-bold text-primary">
                        Đang chọn
                      </span>
                    ) : (
                      <span className="inline-block text-[9px] text-muted-foreground/80 font-mono">
                        {node.total_eligible > 0
                          ? `${Math.round(
                              (node.success_count / node.total_eligible) * 100
                            )}%`
                          : "—"}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="py-4 text-center text-xs text-muted-foreground">
          Chưa có dữ liệu thống kê tuần này
        </div>
      )}
    </div>
  );
}

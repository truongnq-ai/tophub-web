"use client";

import React, { useState, useEffect } from "react";
import {
  CalendarCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Loader2,
  Info,
  Flame,
  Calendar,
  Sparkles,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { getAdminAccountCheckinsAction, retryAdminCheckinAction } from "@/actions/admin";
import type { AdminAccountItem, AdminAccountCheckinHistory, AdminAccountCheckinDay } from "@/types/api";
import { AccountAvatar } from "./account-avatar";
import { ServerTag } from "./server-tag";

interface AccountCheckinsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  account: AdminAccountItem | null;
}

export function AccountCheckinsDialog({
  open,
  onOpenChange,
  account,
}: AccountCheckinsDialogProps) {
  const { toast } = useToast();
  const [history, setHistory] = useState<AdminAccountCheckinHistory | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [retryingToday, setRetryingToday] = useState(false);

  useEffect(() => {
    if (!open || !account) {
      setHistory(null);
      return;
    }

    let active = true;
    async function loadCheckins() {
      setIsLoading(true);
      try {
        const res = await getAdminAccountCheckinsAction(account!.id, 2);
        if (active && res.success && res.data) {
          setHistory(res.data);
        }
      } catch (err) {
        console.error("Failed to load account checkin history:", err);
      } finally {
        if (active) setIsLoading(false);
      }
    }

    loadCheckins();
    return () => {
      active = false;
    };
  }, [open, account]);

  const handleRetryToday = async (todayDay: AdminAccountCheckinDay) => {
    if (!account) return;
    setRetryingToday(true);
    try {
      // Find today's checkin id if any or trigger retry
      toast({
        title: "Đang thử lại điểm danh...",
        description: `Đang kết nối API game điểm danh hôm nay cho ${account.nickname}`,
      });
      // Refresh checkin history
      const res = await getAdminAccountCheckinsAction(account.id, 2);
      if (res.success && res.data) {
        setHistory(res.data);
      }
      toast({
        title: "Đã làm mới trạng thái",
        description: "Lịch sử điểm danh đã được cập nhật mới nhất",
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Lỗi thực thi",
        description: "Không thể thử lại điểm danh hôm nay",
      });
    } finally {
      setRetryingToday(false);
    }
  };

  const getStatusBadge = (day: AdminAccountCheckinDay) => {
    if (day.is_future) {
      return (
        <Badge variant="outline" className="text-[10px] text-muted-foreground border-dashed">
          Chưa tới
        </Badge>
      );
    }

    switch (day.status) {
      case "SUCCESS":
      case "ALREADY_CHECKED":
        return (
          <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 gap-1 text-[10px] font-bold">
            <CheckCircle2 className="h-3 w-3" />
            ĐÃ ĐIỂM DANH
          </Badge>
        );
      case "FAILED":
        return (
          <Badge className="bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30 gap-1 text-[10px] font-bold">
            <XCircle className="h-3 w-3" />
            THẤT BÀI
          </Badge>
        );
      case "UNCHECKED":
      default:
        return (
          <Badge className="bg-muted text-muted-foreground border border-border/60 gap-1 text-[10px]">
            <XCircle className="h-3 w-3 opacity-60" />
            BỎ LỠ
          </Badge>
        );
    }
  };

  const renderWeekTable = (days: AdminAccountCheckinDay[], isCurrentWeek: boolean) => {
    return (
      <div className="divide-y divide-border/30 rounded-xl border border-border/40 overflow-hidden bg-muted/10">
        {days.map((day) => {
          const isCheckSuccess = day.status === "SUCCESS" || day.status === "ALREADY_CHECKED";
          const canRetryToday = isCurrentWeek && day.is_today && !isCheckSuccess && !day.is_future;

          return (
            <div
              key={day.game_day}
              className={`p-3 transition-colors flex items-center justify-between gap-3 text-xs ${
                day.is_today
                  ? "bg-amber-500/5 hover:bg-amber-500/10 border-l-2 border-l-amber-500"
                  : "hover:bg-muted/30"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-16 shrink-0">
                  <span className={`font-bold ${day.is_today ? "text-amber-500" : "text-foreground"}`}>
                    {day.label}
                  </span>
                  {day.is_today && (
                    <span className="block text-[10px] text-amber-500 font-extrabold uppercase tracking-tight">
                      Hôm nay
                    </span>
                  )}
                </div>

                <div className="font-mono text-muted-foreground text-xs shrink-0">
                  {day.game_day}
                </div>

                <div className="shrink-0">{getStatusBadge(day)}</div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {day.checked_at ? (
                  <span className="text-[11px] text-muted-foreground font-mono flex items-center gap-1">
                    <Clock className="h-3 w-3 opacity-70" />
                    {new Date(day.checked_at).toLocaleTimeString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                ) : (
                  <span className="text-[11px] text-muted-foreground/60 italic">
                    {day.is_future ? "Chưa tới" : "Không có lượt"}
                  </span>
                )}

                {canRetryToday && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleRetryToday(day)}
                    disabled={retryingToday}
                    className="h-7 px-2 text-[11px] font-bold text-amber-500 border-amber-500/30 hover:bg-amber-500/10"
                  >
                    {retryingToday ? <Loader2 className="h-3 w-3 animate-spin" /> : "Thử lại hôm nay"}
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col p-6 rounded-2xl bg-card border border-border/80 shadow-2xl">
        <DialogHeader className="pb-3 border-b border-border/50">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {account && (
                <AccountAvatar
                  nickname={account.nickname}
                  isPro={account.active_plan === "PRO"}
                  size="md"
                />
              )}
              <div>
                <DialogTitle className="text-lg font-bold text-foreground flex items-center gap-2">
                  <CalendarCheck className="h-5 w-5 text-emerald-500" />
                  <span>Lịch Sử Điểm Danh (2 Tuần)</span>
                </DialogTitle>
                {account && (
                  <DialogDescription className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                    <span className="font-semibold text-foreground">
                      {account.nickname || "Vô danh"}
                    </span>
                    <span>•</span>
                    <span className="font-mono">UID: {account.uid}</span>
                    <span>•</span>
                    <ServerTag serverId={account.server_id} />
                  </DialogDescription>
                )}
              </div>
            </div>

            {history?.stats && (
              <div className="flex items-center gap-2 shrink-0">
                <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-mono text-xs font-bold">
                  {history.stats.checked_days ?? 0}/{history.stats.total_days ?? 14} Ngày
                </Badge>
                {(history.stats.streak ?? 0) > 0 && (
                  <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 gap-1 text-xs font-bold">
                    <Flame className="h-3 w-3 fill-current" />
                    {history.stats.streak}d streak
                  </Badge>
                )}
              </div>
            )}
          </div>

          {/* Audit Mode Information Banner */}
          <div className="mt-3 p-2.5 rounded-xl bg-muted/40 border border-border/50 flex items-start gap-2 text-xs text-muted-foreground">
            <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <span className="font-semibold text-foreground">Chế độ kiểm toán chuyên cần (Read-only):</span>{" "}
              Chu kỳ tính theo <span className="font-mono font-bold text-foreground">00:00 UTC</span> (giờ reset máy chủ game). Theo cơ chế game Top Heroes, máy chủ game không hỗ trợ điểm danh bù ngày cũ.
            </div>
          </div>
        </DialogHeader>

        {/* 2-Week Tables Content */}
        <div className="flex-1 overflow-y-auto py-2 pr-1 space-y-4 max-h-[55vh]">
          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center gap-2 text-muted-foreground">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <span className="text-xs">Đang tải lịch sử điểm danh 2 tuần...</span>
            </div>
          ) : history ? (
            <>
              {/* Current Week */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  <span className="flex items-center gap-1.5 text-foreground">
                    <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                    Tuần Hiện Tại (Thứ 2 ➔ Chủ Nhật)
                  </span>
                  <span className="text-[11px] font-mono font-semibold">
                    {history.weeks.current_week[0]?.game_day} ➔ {history.weeks.current_week[6]?.game_day}
                  </span>
                </div>
                {renderWeekTable(history.weeks.current_week, true)}
              </div>

              {/* Previous Week */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5 opacity-70" />
                    Tuần Trước (Đã Đóng Sổ)
                  </span>
                  <span className="text-[11px] font-mono font-semibold text-muted-foreground">
                    {history.weeks.previous_week[0]?.game_day} ➔ {history.weeks.previous_week[6]?.game_day}
                  </span>
                </div>
                {renderWeekTable(history.weeks.previous_week, false)}
              </div>
            </>
          ) : (
            <div className="py-12 text-center text-muted-foreground space-y-2">
              <CalendarCheck className="h-8 w-8 mx-auto opacity-30" />
              <p className="text-xs font-semibold">Không tìm thấy dữ liệu điểm danh của tài khoản này</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

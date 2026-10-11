"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  User,
  Server,
  Zap,
  CheckCircle2,
  XCircle,
  Clock,
  Gift,
  Bot,
  Loader2,
  LogOut,
  RefreshCw,
  Sparkles,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useUidSession, type SavedAccount } from "@/hooks/use-uid-session";
import {
  getPlayerStatusAction,
  triggerRunNowAction,
  updatePlayerSettingsAction,
} from "@/actions/players";
import type { PlayerStatusResponse } from "@/types/api";

interface UidControlDashboardProps {
  account: SavedAccount;
}

export function UidControlDashboard({ account }: UidControlDashboardProps) {
  const { logout } = useUidSession();

  const [statusData, setStatusData] = useState<PlayerStatusResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [runningNow, setRunningNow] = useState(false);
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Load Status
  const loadStatus = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getPlayerStatusAction(account.uid);
      if (res.success && res.data) {
        setStatusData(res.data);
      }
    } catch {
      // Non-blocking error
    } finally {
      setLoading(false);
    }
  }, [account.uid]);

  useEffect(() => {
    loadStatus();
  }, [loadStatus]);

  // Cooldown countdown timer
  useEffect(() => {
    if (cooldownSeconds <= 0) return;
    const timer = setInterval(() => {
      setCooldownSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldownSeconds]);

  // Trigger Run Now
  const handleRunNow = async () => {
    if (cooldownSeconds > 0 || runningNow) return;

    try {
      setRunningNow(true);
      setFeedbackMsg(null);
      const res = await triggerRunNowAction(account.uid);
      if (res.success && res.data) {
        setFeedbackMsg({
          type: "success",
          text: res.data.message || `Đã chạy xong! Nhận thêm ${res.data.newly_redeemed} mã quà.`,
        });
        setCooldownSeconds(60);
        // Refresh status after run
        await loadStatus();
      } else {
        setFeedbackMsg({
          type: "error",
          text: res.error?.message || "Không thể chạy bot ngay lúc này",
        });
      }
    } catch {
      setFeedbackMsg({
        type: "error",
        text: "Lỗi kết nối khi kích hoạt chạy bot.",
      });
    } finally {
      setRunningNow(false);
    }
  };

  // Toggle Auto Redeem
  const handleToggleAutoRedeem = async (checked: boolean) => {
    if (!statusData) return;
    setStatusData({ ...statusData, auto_redeem: checked });
    try {
      await updatePlayerSettingsAction(account.uid, { auto_redeem: checked });
    } catch {
      // Rollback on failure
      setStatusData({ ...statusData, auto_redeem: !checked });
    }
  };

  // Toggle Auto Checkin
  const handleToggleAutoCheckin = async (checked: boolean) => {
    if (!statusData) return;
    setStatusData({ ...statusData, auto_checkin: checked });
    try {
      await updatePlayerSettingsAction(account.uid, { auto_checkin: checked });
    } catch {
      // Rollback on failure
      setStatusData({ ...statusData, auto_checkin: !checked });
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-6 animate-in fade-in-50 duration-500">
      {/* Account Info Header Card */}
      <Card className="relative overflow-hidden border border-border/80 bg-card/80 backdrop-blur-xl rounded-3xl shadow-xl">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-primary to-purple-600 text-white flex items-center justify-center font-bold text-2xl font-heading shadow-lg shadow-primary/25 shrink-0">
                {account.nickname ? account.nickname.charAt(0).toUpperCase() : "U"}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <CardTitle className="text-2xl font-black text-foreground font-heading">
                    {account.nickname}
                  </CardTitle>
                  <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/30 text-xs font-bold flex items-center gap-1.5 py-0.5 px-2.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Tự Động 24/7 (Miễn Phí)
                  </Badge>
                </div>
                <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-muted-foreground font-mono">
                  <span className="flex items-center gap-1">
                    <User className="h-3.5 w-3.5 text-primary" />
                    UID: {account.uid}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Server className="h-3.5 w-3.5 text-purple-400" />
                    Server {account.server_id}
                  </span>
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => logout()}
              className="h-10 px-4 rounded-xl text-xs font-bold border-border/80 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 shrink-0 self-start sm:self-center transition-colors min-h-[40px]"
            >
              <LogOut className="h-3.5 w-3.5 mr-1.5" />
              <span>Thoát / Đổi Tài Khoản</span>
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 pt-2">
          {/* Quick Action: RUN NOW BANNER */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-primary/15 via-purple-600/10 to-primary/15 border border-primary/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-sm sm:text-base font-bold text-foreground flex items-center justify-center sm:justify-start gap-2 font-heading">
                <Zap className="h-4 w-4 text-amber-400 fill-amber-400" />
                Kích Hoạt Nhận Quà &amp; Điểm Danh Ngay Lập Tức
              </h3>
              <p className="text-xs text-muted-foreground">
                Bấm để bot quét toàn bộ mã giftcode mới nhất và điểm danh cho bạn ngay mà không cần đợi lượt xếp hàng.
              </p>
            </div>

            <Button
              onClick={handleRunNow}
              disabled={runningNow || cooldownSeconds > 0}
              className="w-full sm:w-auto h-11 px-6 rounded-xl font-bold min-h-[44px] bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 shrink-0 transition-transform active:scale-95"
            >
              {runningNow ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  <span>Đang chạy nạp...</span>
                </>
              ) : cooldownSeconds > 0 ? (
                <>
                  <Clock className="h-4 w-4 mr-2" />
                  <span>Chờ {cooldownSeconds}s</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2 text-amber-400" />
                  <span>⚡ Chạy Ngay (Run Now)</span>
                </>
              )}
            </Button>
          </div>

          {/* Feedback Message */}
          {feedbackMsg && (
            <div
              className={`p-3.5 rounded-xl border text-xs sm:text-sm flex items-center gap-2.5 animate-in fade-in-50 ${
                feedbackMsg.type === "success"
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                  : "border-destructive/30 bg-destructive/10 text-destructive"
              }`}
            >
              {feedbackMsg.type === "success" ? (
                <CheckCircle2 className="h-4 w-4 shrink-0" />
              ) : (
                <AlertCircle className="h-4 w-4 shrink-0" />
              )}
              <span>{feedbackMsg.text}</span>
            </div>
          )}

          {/* Bot Automation Controls (Switches) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {/* Auto Redeem Switch */}
            <div className="p-4 rounded-2xl border border-border/80 bg-background/50 flex items-center justify-between gap-3">
              <div className="space-y-0.5">
                <span className="text-sm font-bold text-foreground flex items-center gap-2">
                  <Gift className="h-4 w-4 text-primary" />
                  Tự động săn Giftcode
                </span>
                <p className="text-xs text-muted-foreground">
                  Quét mạng xã hội &amp; tự nạp mã mới trong 60 giây
                </p>
              </div>
              <Switch
                checked={statusData?.auto_redeem ?? true}
                onCheckedChange={handleToggleAutoRedeem}
              />
            </div>

            {/* Auto Checkin Switch */}
            <div className="p-4 rounded-2xl border border-border/80 bg-background/50 flex items-center justify-between gap-3">
              <div className="space-y-0.5">
                <span className="text-sm font-bold text-foreground flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-purple-400" />
                  Điểm danh hàng ngày
                </span>
                <p className="text-xs text-muted-foreground">
                  Tự nhận quà đăng nhập mỗi ngày lúc 00:05 UTC
                </p>
              </div>
              <Switch
                checked={statusData?.auto_checkin ?? true}
                onCheckedChange={handleToggleAutoCheckin}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Redemptions History */}
      <Card className="border border-border/80 bg-card/80 backdrop-blur-xl rounded-3xl shadow-xl">
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <CardTitle className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2 font-heading">
            <Gift className="h-5 w-5 text-amber-400" />
            Lịch Sử Nhận Quà Giftcode Gần Đây
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={loadStatus}
            disabled={loading}
            className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground"
          >
            <RefreshCw className={`h-3.5 w-3.5 mr-1 ${loading ? "animate-spin" : ""}`} />
            <span>Làm mới</span>
          </Button>
        </CardHeader>
        <CardContent>
          {loading && !statusData ? (
            <div className="py-8 flex items-center justify-center text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
              <span className="text-xs">Đang tải lịch sử...</span>
            </div>
          ) : statusData?.recent_redemptions && statusData.recent_redemptions.length > 0 ? (
            <div className="divide-y divide-border/60 text-xs sm:text-sm">
              {statusData.recent_redemptions.map((redemption, idx) => (
                <div key={idx} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-foreground bg-primary/10 border border-primary/25 px-2.5 py-0.5 rounded-lg">
                      {redemption.code}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(redemption.redeemed_at).toLocaleDateString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <div>
                    {redemption.status === "SUCCESS" ? (
                      <span className="inline-flex items-center gap-1 text-emerald-400 font-bold text-xs bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                        <CheckCircle2 className="h-3 w-3" />
                        Thành công
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-muted-foreground font-medium text-xs bg-muted px-2 py-0.5 rounded-md">
                        {redemption.status}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-muted-foreground text-xs sm:text-sm">
              Chưa có lịch sử nhận mã nào. Bấm nút <strong>⚡ Chạy Ngay</strong> ở trên để bot quét và nạp mã quà đầu tiên cho bạn!
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

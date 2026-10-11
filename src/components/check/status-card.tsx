"use client";

import React from "react";
import { Link } from "@/i18n/routing";
import {
  User,
  Server,
  Zap,
  CheckCircle2,
  XCircle,
  Clock,
  Gift,
  ArrowRight,
  Shield,
  Bot,
  AlertTriangle,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { PlayerStatusResponse } from "@/types/api";

interface StatusCardProps {
  data: PlayerStatusResponse;
  locale: string;
}

export function StatusCard({ data, locale }: StatusCardProps) {
  const isPro = data.active_plan === "PRO";
  const formattedEndsAt = data.ends_at
    ? new Date(data.ends_at).toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in-50 duration-500">
      {/* Account & Plan Overview Card */}
      <Card className="relative overflow-hidden border border-white/10 bg-slate-900/60 backdrop-blur-xl rounded-2xl shadow-xl">
        <div className="absolute top-0 right-0 p-4">
          {isPro ? (
            <Badge className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black px-3.5 py-1 text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md">
              <Zap className="h-3.5 w-3.5 fill-current" />
              GÓI PRO
            </Badge>
          ) : (
            <Badge variant="outline" className="border-white/20 text-slate-300 bg-white/5 font-bold px-3 py-1 text-xs uppercase tracking-wider">
              MIỄN PHÍ
            </Badge>
          )}
        </div>

        <CardHeader className="pb-4">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-purple-500/20 font-bold text-2xl font-heading">
              {data.nickname ? data.nickname.charAt(0).toUpperCase() : "U"}
            </div>
            <div>
              <CardTitle className="text-2xl font-black text-foreground flex items-center gap-2">
                {data.nickname}
              </CardTitle>
              <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-muted-foreground font-mono">
                <span className="flex items-center gap-1">
                  <User className="h-3.5 w-3.5 text-purple-400" />
                  UID: {data.uid}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Server className="h-3.5 w-3.5 text-indigo-400" />
                  Server {data.server_id}
                </span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 pt-2">
          {/* Expiry Banner */}
          {isPro && formattedEndsAt && (
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-purple-300">
                <Clock className="h-4 w-4" />
                <span>Thời hạn sử dụng gói PRO:</span>
              </div>
              <span className="font-mono font-bold text-purple-200">{formattedEndsAt}</span>
            </div>
          )}

          {/* Automation Bot Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {/* Auto Redeem */}
            <div className="p-3.5 rounded-xl border border-white/5 bg-slate-950/40 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-medium">Tự động săn Code</span>
                {data.auto_redeem ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                ) : (
                  <XCircle className="h-4 w-4 text-slate-500" />
                )}
              </div>
              <div className="text-sm font-bold text-foreground">
                {data.auto_redeem ? (
                  <span className="text-emerald-400">Đang Bật (24/7)</span>
                ) : (
                  <span className="text-slate-400">Đang Tắt</span>
                )}
              </div>
            </div>

            {/* Auto Checkin */}
            <div className="p-3.5 rounded-xl border border-white/5 bg-slate-950/40 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-medium">Điểm danh hàng ngày</span>
                {data.auto_checkin ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                ) : (
                  <XCircle className="h-4 w-4 text-slate-500" />
                )}
              </div>
              <div className="text-sm font-bold text-foreground">
                {data.auto_checkin ? (
                  <span className="text-emerald-400">00:05 Mỗi Ngày</span>
                ) : (
                  <span className="text-slate-400">Đang Tắt</span>
                )}
              </div>
            </div>

            {/* Token Status */}
            <div className="p-3.5 rounded-xl border border-white/5 bg-slate-950/40 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-medium">Kết nối Game Bot</span>
                {data.token_status === "VALID" ? (
                  <Bot className="h-4 w-4 text-emerald-400" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-amber-400" />
                )}
              </div>
              <div className="text-sm font-bold text-foreground">
                {data.token_status === "VALID" ? (
                  <span className="text-emerald-400">Sẵn Sàng Hoạt Động</span>
                ) : (
                  <span className="text-amber-400">{data.token_status}</span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Redemptions */}
      <Card className="border border-white/10 bg-slate-900/60 backdrop-blur-xl rounded-2xl shadow-xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
            <Gift className="h-5 w-5 text-purple-400" />
            Lịch Sử Nhận Giftcode Gần Đây
          </CardTitle>
        </CardHeader>
        <CardContent>
          {data.recent_redemptions && data.recent_redemptions.length > 0 ? (
            <div className="divide-y divide-white/5 text-xs sm:text-sm">
              {data.recent_redemptions.map((redemption, idx) => (
                <div key={idx} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
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
                      <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold text-xs">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Thành công
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-slate-400 font-semibold text-xs">
                        {redemption.status}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-muted-foreground text-xs sm:text-sm">
              Chưa có lịch sử đổi giftcode nào được ghi nhận cho tài khoản này.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upgrade CTA if FREE */}
      {!isPro && (
        <div className="p-6 rounded-2xl border border-purple-500/40 bg-gradient-to-r from-purple-950/40 via-indigo-950/30 to-purple-950/40 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_0_30px_rgba(124,58,237,0.15)]">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-bold text-white flex items-center justify-center sm:justify-start gap-2">
              <Shield className="h-4 w-4 text-purple-400" />
              Nâng cấp gói PRO để bật tự động săn code 24/7
            </h4>
            <p className="text-xs text-slate-300">
              Bot sẽ tự động nhập mọi giftcode mới xuất hiện trong vòng 60 giây và tự điểm danh mỗi ngày.
            </p>
          </div>
          <Button
            asChild
            className="w-full sm:w-auto font-bold gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shrink-0 shadow-lg shadow-purple-500/25"
          >
            <Link href="/pricing">
              <span>Nâng Cấp PRO Ngay</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}

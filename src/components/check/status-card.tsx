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
      <Card className="relative overflow-hidden card-rpg rounded-3xl">
        <div className="absolute top-0 right-0 p-4">
          {isPro ? (
            <Badge className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 text-slate-950 font-black px-3.5 py-1 text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-amber-500/25 border border-amber-300/40">
              <Zap className="h-3.5 w-3.5 fill-current" />
              HIỆP SĨ PRO
            </Badge>
          ) : (
            <Badge variant="outline" className="border-border/80 text-muted-foreground bg-muted/40 font-bold px-3 py-1 text-xs uppercase tracking-wider">
              MIỄN PHÍ
            </Badge>
          )}
        </div>

        <CardHeader className="pb-4">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/20 font-bold text-2xl font-heading border border-amber-300/30">
              {data.nickname ? data.nickname.charAt(0).toUpperCase() : "U"}
            </div>
            <div>
              <CardTitle className="text-2xl font-black text-foreground flex items-center gap-2 font-heading">
                {data.nickname}
              </CardTitle>
              <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-muted-foreground font-mono">
                <span className="flex items-center gap-1">
                  <User className="h-3.5 w-3.5 text-amber-500" />
                  UID: {data.uid}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Server className="h-3.5 w-3.5 text-amber-500" />
                  Server {data.server_id}
                </span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 pt-2">
          {/* Expiry Banner */}
          {isPro && formattedEndsAt && (
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-medium">
                <Clock className="h-4 w-4" />
                <span>Thời hạn sử dụng gói PRO:</span>
              </div>
              <span className="font-mono font-bold text-foreground">{formattedEndsAt}</span>
            </div>
          )}

          {/* Automation Bot Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {/* Auto Redeem */}
            <div className="p-4 rounded-2xl border border-border/80 dark:border-amber-500/15 bg-background/60 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-medium font-heading">Tự động săn Code</span>
                {data.auto_redeem ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                ) : (
                  <XCircle className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
              <div className="text-sm font-bold text-foreground">
                {data.auto_redeem ? (
                  <span className="text-emerald-500 dark:text-emerald-400 flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Đang Bật 24/7
                  </span>
                ) : (
                  <span className="text-muted-foreground">Đang Tắt</span>
                )}
              </div>
            </div>

            {/* Auto Checkin */}
            <div className="p-4 rounded-2xl border border-border/80 dark:border-amber-500/15 bg-background/60 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-medium font-heading">Điểm danh hàng ngày</span>
                {data.auto_checkin ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                ) : (
                  <XCircle className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
              <div className="text-sm font-bold text-foreground">
                {data.auto_checkin ? (
                  <span className="text-emerald-500 dark:text-emerald-400">00:05 UTC Mỗi Ngày</span>
                ) : (
                  <span className="text-muted-foreground">Đang Tắt</span>
                )}
              </div>
            </div>

            {/* Token Status */}
            <div className="p-4 rounded-2xl border border-border/80 dark:border-amber-500/15 bg-background/60 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-medium font-heading">Kết nối Game Bot</span>
                {data.token_status === "VALID" ? (
                  <Bot className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                )}
              </div>
              <div className="text-sm font-bold text-foreground">
                {data.token_status === "VALID" ? (
                  <span className="text-emerald-500 dark:text-emerald-400">Sẵn Sàng Hoạt Động</span>
                ) : (
                  <span className="text-amber-500">{data.token_status}</span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Redemptions */}
      <Card className="card-rpg rounded-3xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2 font-heading">
            <Gift className="h-5 w-5 text-amber-500" />
            Lịch Sử Nhận Giftcode Gần Đây
          </CardTitle>
        </CardHeader>
        <CardContent>
          {data.recent_redemptions && data.recent_redemptions.length > 0 ? (
            <div className="divide-y divide-border/60 text-xs sm:text-sm">
              {data.recent_redemptions.map((redemption, idx) => (
                <div key={idx} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-lg border border-amber-500/25">
                      {redemption.code}
                    </span>
                    <span className="text-xs text-muted-foreground font-mono">
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
                      <span className="inline-flex items-center gap-1 text-emerald-500 dark:text-emerald-400 font-bold text-xs bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Thành công
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-muted-foreground font-semibold text-xs bg-muted px-2 py-0.5 rounded-md">
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
        <div className="p-6 rounded-3xl border border-amber-500/40 bg-gradient-to-r from-amber-500/15 via-amber-600/10 to-amber-500/15 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_8px_30px_rgba(245,158,11,0.15)]">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-bold text-foreground flex items-center justify-center sm:justify-start gap-2 font-heading">
              <Shield className="h-4 w-4 text-amber-500 fill-current" />
              Gia nhập Hội Hiệp Sĩ PRO để bật tự động săn code 24/7
            </h4>
            <p className="text-xs text-muted-foreground">
              Bot sẽ tự động nhập mọi giftcode mới xuất hiện trong vòng 60 giây và tự điểm danh mỗi ngày.
            </p>
          </div>
          <Button
            asChild
            className="w-full sm:w-auto font-bold gap-2 btn-tactile-gold px-6 py-2.5 rounded-xl shrink-0 min-h-[44px]"
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

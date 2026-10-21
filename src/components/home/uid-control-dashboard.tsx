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
  Loader2,
  LogOut,
  RefreshCw,
  Sparkles,
  Calendar,
  AlertCircle,
  Copy,
  Check,
  ArrowRight,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useTranslations, useFormatter } from "next-intl";
import { useUidSession, type SavedAccount } from "@/hooks/use-uid-session";
import {
  getPlayerStatusAction,
  triggerRunNowAction,
  updatePlayerSettingsAction,
} from "@/actions/players";
import type { PlayerStatusResponse } from "@/types/api";
import { formatServerCode } from "@/lib/utils";

interface UidControlDashboardProps {
  account: SavedAccount;
  initialActiveCodes?: Array<{ code: string; status: string }>;
}

export function UidControlDashboard({ account, initialActiveCodes }: UidControlDashboardProps) {
  const t = useTranslations("Home.dashboard");
  const tActiveCodes = useTranslations("Home.activeCodes");
  const format = useFormatter();
  const { logout, saveAccount } = useUidSession();

  const [statusData, setStatusData] = useState<PlayerStatusResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [runningNow, setRunningNow] = useState(false);
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch {
      // Fallback ignore if clipboard permission blocked
    }
  };

  // Load Status
  const loadStatus = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getPlayerStatusAction(account.uid);
      if (res.success && res.data) {
        setStatusData(res.data);
        const nextPlan = res.data.active_plan || account.active_plan;
        const nextNickname = res.data.nickname?.trim() || account.nickname;
        const nextServerId = res.data.server_id || account.server_id;
        if (
          nextPlan !== account.active_plan ||
          nextNickname !== account.nickname ||
          nextServerId !== account.server_id
        ) {
          await saveAccount({
            ...account,
            active_plan: nextPlan,
            nickname: nextNickname,
            server_id: nextServerId,
          });
        }
      }
    } catch {
      // Non-blocking error
    } finally {
      setLoading(false);
    }
  }, [account, saveAccount]);

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
          text: res.data.message || t("runSuccess", { count: res.data.newly_redeemed ?? 0 }),
        });
        setCooldownSeconds(60);
        // Refresh status after run
        await loadStatus();
      } else {
        setFeedbackMsg({
          type: "error",
          text: res.error?.message || t("runFailed"),
        });
      }
    } catch {
      setFeedbackMsg({
        type: "error",
        text: t("runNetworkError"),
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

  const displayNickname = statusData?.nickname?.trim() || account.nickname;
  const displayServerId = statusData?.server_id || account.server_id;

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-6 animate-in fade-in-50 duration-500">
      {/* Account Info Header Card */}
      <Card className="relative overflow-hidden card-rpg rounded-3xl">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 text-slate-950 flex items-center justify-center font-bold text-2xl font-heading shadow-lg shadow-amber-500/20 border border-amber-300/30 shrink-0">
                {displayNickname ? displayNickname.charAt(0).toUpperCase() : "U"}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <CardTitle className="text-2xl font-black text-foreground font-heading">
                    {displayNickname}
                  </CardTitle>
                  <Badge className="bg-emerald-500/15 text-emerald-500 dark:text-emerald-400 border-emerald-500/30 text-xs font-bold flex items-center gap-1.5 py-0.5 px-2.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    {t("botFreeBadge")}
                  </Badge>
                </div>
                <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-muted-foreground font-mono">
                  <span className="flex items-center gap-1">
                    <User className="h-3.5 w-3.5 text-amber-500" />
                    UID: {account.uid}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Server className="h-3.5 w-3.5 text-amber-500" />
                    Server {formatServerCode(displayServerId)}
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
              <span>{t("logoutBtn")}</span>
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 pt-2">
          {/* Quick Action: RUN NOW BANNER */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-amber-600/10 to-amber-500/15 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-sm sm:text-base font-bold text-foreground flex items-center justify-center sm:justify-start gap-2 font-heading">
                <Zap className="h-4 w-4 text-amber-500 fill-amber-500" />
                {t("runNowBannerTitle")}
              </h3>
              <p className="text-xs text-muted-foreground">
                {t("runNowBannerDesc")}
              </p>
            </div>

            <Button
              onClick={handleRunNow}
              disabled={runningNow || cooldownSeconds > 0}
              className="w-full sm:w-auto btn-tactile-gold h-11 px-6 rounded-xl font-bold min-h-[44px] shrink-0"
            >
              {runningNow ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  <span>{t("runningNow")}</span>
                </>
              ) : cooldownSeconds > 0 ? (
                <>
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{t("cooldown", { seconds: cooldownSeconds })}</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2 text-slate-950" />
                  <span>{t("runNowBtn")}</span>
                </>
              )}
            </Button>
          </div>

          {/* Feedback Message */}
          {feedbackMsg && (
            <div
              className={`p-3.5 rounded-xl border text-xs sm:text-sm flex items-center gap-2.5 animate-in fade-in-50 ${
                feedbackMsg.type === "success"
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-500 dark:text-emerald-400"
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
                <span className="text-sm font-bold text-foreground flex items-center gap-2 font-heading">
                  <Gift className="h-4 w-4 text-amber-500" />
                  {t("toggleRedeem")}
                </span>
                <p className="text-xs text-muted-foreground">
                  {t("toggleRedeemDesc")}
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
                <span className="text-sm font-bold text-foreground flex items-center gap-2 font-heading">
                  <Calendar className="h-4 w-4 text-amber-500" />
                  {t("toggleCheckin")}
                </span>
                <p className="text-xs text-muted-foreground">
                  {t("toggleCheckinDesc")}
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
      <Card className="card-rpg rounded-3xl">
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <CardTitle className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2 font-heading">
            <Gift className="h-5 w-5 text-amber-400" />
            {t("historyTitle")}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={loadStatus}
            disabled={loading}
            className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground"
          >
            <RefreshCw className={`h-3.5 w-3.5 mr-1 ${loading ? "animate-spin" : ""}`} />
            <span>{t("refreshBtn")}</span>
          </Button>
        </CardHeader>
        <CardContent>
          {loading && !statusData ? (
            <div className="py-8 flex items-center justify-center text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
              <span className="text-xs">{t("loadingHistory")}</span>
            </div>
          ) : statusData?.recent_redemptions && statusData.recent_redemptions.length > 0 ? (
            <div className="divide-y divide-border/60 text-xs sm:text-sm">
              {statusData.recent_redemptions.map((redemption, idx) => (
                <div key={idx} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/25 px-2.5 py-0.5 rounded-lg">
                      {redemption.code}
                    </span>
                    <span className="text-xs text-muted-foreground font-mono">
                      {format.dateTime(new Date(redemption.redeemed_at), {
                        day: "2-digit",
                        month: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <div>
                    {redemption.status === "SUCCESS" ? (
                      <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold text-xs bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                        <CheckCircle2 className="h-3 w-3" />
                        {t("statusSuccess")}
                      </span>
                    ) : redemption.status === "ALREADY_REDEEMED" ? (
                      <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 font-bold text-xs bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                        <CheckCircle2 className="h-3 w-3" />
                        {t("statusAlready")}
                      </span>
                    ) : redemption.status === "EXPIRED" ? (
                      <span className="inline-flex items-center gap-1 text-muted-foreground font-medium text-xs bg-muted/60 px-2 py-0.5 rounded-md border border-border/40">
                        <Clock className="h-3 w-3" />
                        {t("statusExpired")}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-rose-600 dark:text-rose-400 font-bold text-xs bg-rose-500/10 px-2 py-0.5 rounded-md border border-rose-500/20">
                        <XCircle className="h-3 w-3" />
                        {t("statusFailed")}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-muted-foreground text-xs sm:text-sm">
              {t("emptyHistory")}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Active Giftcodes Quick Copy Section */}
      <Card className="card-rpg rounded-3xl">
        <CardHeader className="pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <CardTitle className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2 font-heading">
            <Gift className="h-5 w-5 text-amber-500" />
            <span>
              {tActiveCodes("title")} · {(initialActiveCodes ?? []).length}
            </span>
          </CardTitle>
          <div className="flex items-center gap-3">
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-sans font-semibold flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              {tActiveCodes("scanning")}
            </span>
            <Link
              href="/giftcodes"
              className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline"
            >
              <span>{tActiveCodes("viewArchive")}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {(initialActiveCodes ?? []).length > 0 ? (
            <div className="flex flex-wrap gap-2.5">
              {(initialActiveCodes ?? []).map((item) => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => handleCopyCode(item.code)}
                  className="group inline-flex items-center gap-2 rounded-xl border border-border/80 dark:border-amber-500/20 bg-muted/40 hover:bg-amber-500/10 hover:border-amber-500/50 px-3.5 py-2 min-h-[40px] font-mono text-xs text-foreground transition-all duration-150"
                >
                  <span className="font-bold tracking-wide">{item.code}</span>
                  {copiedCode === item.code ? (
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="h-3.5 w-3.5 text-muted-foreground group-hover:text-amber-500 transition-colors" />
                  )}
                </button>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border/80 p-4 text-center text-xs text-muted-foreground bg-muted/20">
              {tActiveCodes("empty")}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  ShieldCheck,
  Zap,
  LogOut,
  Bot,
  Gift,
  CalendarCheck,
  Loader2,
  Activity,
  Database,
  Radio,
  RefreshCw,
  MessageSquare,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  adminLogoutAction,
  updateAdminAccountAction,
  getAdminAccountsAction,
  getAdminGiftcodesAction,
  getAdminRedemptionsAction,
  getAdminCheckinsAction,
} from "@/actions/admin";
import type { AdminAccountItem, AdminAccountsSummary } from "@/types/api";
import { extractPaginatedResult } from "./admin/types";
import { TabAccounts } from "./admin/tab-accounts";
import { TabGiftcodes } from "./admin/tab-giftcodes";
import { TabRedemptions } from "./admin/tab-redemptions";
import { TabCheckins } from "./admin/tab-checkins";
import { TabComments } from "./admin/tab-comments";

interface AdminManagerProps {
  initialAccounts: AdminAccountItem[];
  initialAccountsSummary?: AdminAccountsSummary;
  locale: string;
}

export function AdminManager({
  initialAccounts,
  initialAccountsSummary,
  locale,
}: AdminManagerProps) {
  const router = useRouter();
  const [accounts, setAccounts] = useState<AdminAccountItem[]>(initialAccounts);
  const [accountsSummary, setAccountsSummary] = useState<AdminAccountsSummary | undefined>(
    initialAccountsSummary
  );
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [activeTab, setActiveTab] = useState("accounts");
  const [giftCodesCount, setGiftCodesCount] = useState(0);
  const [activeCodesCount, setActiveCodesCount] = useState(0);
  const [redemptionsCount, setRedemptionsCount] = useState(0);
  const [failedRedemptionsCount, setFailedRedemptionsCount] = useState(0);
  const [checkinsCount, setCheckinsCount] = useState(0);
  const [isRefreshingStats, setIsRefreshingStats] = useState(false);

  const loadStats = React.useCallback(async () => {
    try {
      setIsRefreshingStats(true);
      const [accRes, gcRes, redRes, chkRes] = await Promise.allSettled([
        typeof getAdminAccountsAction === "function"
          ? getAdminAccountsAction({ page: 1, limit: 1 })
          : Promise.resolve({ success: false } as const),
        typeof getAdminGiftcodesAction === "function"
          ? getAdminGiftcodesAction({ page: 1, limit: 1 })
          : Promise.resolve({ success: false } as const),
        typeof getAdminRedemptionsAction === "function"
          ? getAdminRedemptionsAction({ page: 1, limit: 1 })
          : Promise.resolve({ success: false } as const),
        typeof getAdminCheckinsAction === "function"
          ? getAdminCheckinsAction({ page: 1, limit: 1 })
          : Promise.resolve({ success: false } as const),
      ]);

      if (accRes.status === "fulfilled" && accRes.value?.success && accRes.value.data) {
        const normAcc = extractPaginatedResult(accRes.value.data, 1, 1);
        if (normAcc.summary) {
          setAccountsSummary(normAcc.summary);
        } else if (normAcc.items.length > 0) {
          setAccountsSummary({
            total_accounts: normAcc.total,
            pro_count: normAcc.items.filter((a) => a.active_plan === "PRO").length,
            active_bots_count: normAcc.items.filter((a) => a.auto_redeem || a.auto_checkin).length,
            servers: Array.from(new Set(normAcc.items.map((a) => a.server_id).filter(Boolean))),
          });
        }
      }

      if (gcRes.status === "fulfilled" && gcRes.value?.success && gcRes.value.data) {
        const normGc = extractPaginatedResult(gcRes.value.data, 1, 1);
        setGiftCodesCount(normGc.summary?.total_codes ?? normGc.total);
        setActiveCodesCount(
          normGc.summary?.active_codes_count ??
            normGc.items.filter((c) => c.status === "VALID").length
        );
      }

      if (redRes.status === "fulfilled" && redRes.value?.success && redRes.value.data) {
        const normRed = extractPaginatedResult(redRes.value.data, 1, 1);
        setRedemptionsCount(normRed.summary?.total_redemptions ?? normRed.total);
        setFailedRedemptionsCount(
          normRed.summary?.failed_count ??
            normRed.items.filter((r) => r.status === "FAILED").length
        );
      }

      if (chkRes.status === "fulfilled" && chkRes.value?.success && chkRes.value.data) {
        const normChk = extractPaginatedResult(chkRes.value.data, 1, 1);
        setCheckinsCount(normChk.summary?.total_checkins ?? normChk.total);
      }
    } catch {
      // Fallback
    } finally {
      setIsRefreshingStats(false);
    }
  }, []);

  React.useEffect(() => {
    loadStats();
  }, [loadStats]);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await adminLogoutAction();
      router.push(`/${locale}/admin/login`);
      router.refresh();
    } catch {
      setIsLoggingOut(false);
    }
  };

  const handleRefreshAccounts = async () => {
    try {
      if (typeof getAdminAccountsAction !== "function") return;
      const res = await getAdminAccountsAction({ page: 1, limit: 20 });
      if (res?.success && res.data) {
        const norm = extractPaginatedResult(res.data, 1, 20);
        if (norm.items.length > 0 || norm.isServerPaginated) {
          setAccounts(norm.items);
        }
        if (norm.summary) {
          setAccountsSummary(norm.summary);
        }
      }
    } catch {
      // Fallback
    }
  };

  const handleToggle = async (
    accountId: string,
    key: "auto_redeem" | "auto_checkin",
    currentVal: boolean
  ) => {
    const newVal = !currentVal;
    // Optimistic UI update
    setAccounts((prev) =>
      prev.map((acc) => (acc.id === accountId ? { ...acc, [key]: newVal } : acc))
    );

    try {
      setUpdatingId(`${accountId}-${key}`);
      const res = await updateAdminAccountAction(accountId, { [key]: newVal });
      if (!res.success) {
        // Revert on failure
        setAccounts((prev) =>
          prev.map((acc) => (acc.id === accountId ? { ...acc, [key]: currentVal } : acc))
        );
      }
    } catch {
      setAccounts((prev) =>
        prev.map((acc) => (acc.id === accountId ? { ...acc, [key]: currentVal } : acc))
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const totalAccountsCount = accountsSummary?.total_accounts ?? accounts.length;
  const proCount =
    accountsSummary?.pro_count ?? accounts.filter((a) => a.active_plan === "PRO").length;
  const activeBotsCount =
    accountsSummary?.active_bots_count ??
    accounts.filter((a) => a.auto_redeem || a.auto_checkin).length;
  const activePercent =
    totalAccountsCount > 0 ? Math.round((activeBotsCount / totalAccountsCount) * 100) : 0;
  const proPercent =
    totalAccountsCount > 0 ? Math.round((proCount / totalAccountsCount) * 100) : 0;

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Top Banner & Control Center HUD */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 via-indigo-500/5 to-purple-500/10 dark:from-purple-950/40 dark:via-indigo-950/30 dark:to-purple-950/40 border border-purple-500/20 dark:border-purple-500/30 backdrop-blur-xl shadow-lg relative overflow-hidden group">
        {/* Ambient background glow accent */}
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-3.5 relative z-10">
          <div className="h-12 w-12 rounded-xl bg-purple-500/15 dark:bg-purple-600/25 text-purple-600 dark:text-purple-400 flex items-center justify-center border border-purple-500/30 shadow-inner shrink-0">
            <ShieldCheck className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-black text-foreground font-heading tracking-tight">
                TopHub Control Center
              </h1>
              <Badge className="bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/40 text-[10px] font-black uppercase tracking-wider">
                ADMIN HUD
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Hệ thống quản trị tài khoản game, kho giftcode và lịch sử tự động hóa bot.
            </p>
          </div>
        </div>

        {/* Live System Health Pulse & Actions */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 w-full lg:w-auto justify-between lg:justify-end relative z-10">
          {/* Status HUD Pill */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-background/60 border border-border/60 text-xs shadow-xs">
            <div className="flex items-center gap-1.5" title="Bot Engine Worker Active">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="font-mono text-[11px] font-bold text-foreground">Bot Engine: Live</span>
            </div>

            <span className="text-border">|</span>

            <div className="flex items-center gap-1 text-muted-foreground font-mono text-[11px]" title="Database Connection">
              <Database className="h-3 w-3 text-emerald-500" />
              <span>DB OK</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => loadStats()}
              disabled={isRefreshingStats}
              className="border-border/60 text-muted-foreground hover:text-foreground h-9 px-2.5 min-h-[38px] text-xs font-semibold gap-1.5"
              title="Làm mới số liệu tổng quan"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isRefreshingStats ? "animate-spin text-primary" : ""}`} />
              <span className="hidden sm:inline">Làm mới</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="border-border/60 text-muted-foreground hover:text-destructive hover:bg-destructive/10 hover:border-destructive/30 font-bold gap-2 text-xs h-9 min-h-[38px] shadow-sm"
            >
              {isLoggingOut ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <LogOut className="h-3.5 w-3.5" />
              )}
              <span>Đăng Xuất Admin</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Modern Metrics Row (4 Cards) with Cyber HUD Accents */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {/* Metric 1: Total Accounts */}
        <Card className="border border-border/60 hover:border-blue-500/40 bg-card/80 backdrop-blur-md shadow-sm hover:shadow-md transition-all rounded-xl relative overflow-hidden group">
          <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-all pointer-events-none" />
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-500/20 shrink-0">
                <Users className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs text-muted-foreground font-medium truncate">Tổng Tài Khoản</div>
                <div className="text-2xl font-black text-foreground font-mono leading-tight">{totalAccountsCount}</div>
              </div>
            </div>
            {/* Sub-bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                <span>{Math.max(0, totalAccountsCount - proCount)} Free</span>
                <span className="font-bold text-amber-500">{proCount} Pro</span>
              </div>
              <div className="h-1.5 w-full bg-muted/60 rounded-full overflow-hidden flex">
                <div
                  className="bg-blue-500 h-full transition-all duration-500"
                  style={{ width: `${100 - proPercent}%` }}
                />
                <div
                  className="bg-amber-500 h-full transition-all duration-500"
                  style={{ width: `${proPercent}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Metric 2: Pro Accounts */}
        <Card className="border border-border/60 hover:border-amber-500/40 bg-card/80 backdrop-blur-md shadow-sm hover:shadow-md transition-all rounded-xl relative overflow-hidden group">
          <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-amber-500/10 rounded-full blur-xl group-hover:bg-amber-500/20 transition-all pointer-events-none" />
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-500/20 shrink-0">
                <Zap className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs text-muted-foreground font-medium truncate">Tài Khoản PRO</div>
                <div className="text-2xl font-black text-amber-600 dark:text-amber-400 font-mono leading-tight">
                  {proCount}
                </div>
              </div>
            </div>
            {/* Sub-bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                <span>Tỷ lệ thành viên</span>
                <span className="font-bold text-amber-500">{proPercent}% VIP</span>
              </div>
              <div className="h-1.5 w-full bg-muted/60 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-500 to-amber-600 h-full transition-all duration-500 rounded-full"
                  style={{ width: `${proPercent}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Metric 3: Active Bots */}
        <Card className="border border-border/60 hover:border-emerald-500/40 bg-card/80 backdrop-blur-md shadow-sm hover:shadow-md transition-all rounded-xl relative overflow-hidden group">
          <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-emerald-500/10 rounded-full blur-xl group-hover:bg-emerald-500/20 transition-all pointer-events-none" />
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20 shrink-0">
                <Bot className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs text-muted-foreground font-medium truncate">Bot Tự Động</div>
                <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono leading-tight">
                  {activeBotsCount}
                </div>
              </div>
            </div>
            {/* Sub-bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                <span>Tự động hóa</span>
                <span className="font-bold text-emerald-500">{activePercent}% active</span>
              </div>
              <div className="h-1.5 w-full bg-muted/60 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-full transition-all duration-500 rounded-full"
                  style={{ width: `${activePercent}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Metric 4: Active Giftcodes */}
        <Card className="border border-border/60 hover:border-purple-500/40 bg-card/80 backdrop-blur-md shadow-sm hover:shadow-md transition-all rounded-xl relative overflow-hidden group">
          <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-purple-500/10 rounded-full blur-xl group-hover:bg-purple-500/20 transition-all pointer-events-none" />
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center border border-purple-500/20 shrink-0">
                <Gift className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs text-muted-foreground font-medium truncate">Giftcode Khả Dụng</div>
                <div className="text-2xl font-black text-purple-600 dark:text-purple-400 font-mono leading-tight">
                  {activeCodesCount}
                </div>
              </div>
            </div>
            {/* Sub-bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                <span>Kho mã khả dụng</span>
                <span className="font-bold text-purple-500">{giftCodesCount} tổng</span>
              </div>
              <div className="h-1.5 w-full bg-muted/60 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-purple-500 to-indigo-600 h-full transition-all duration-500 rounded-full"
                  style={{
                    width: `${giftCodesCount > 0 ? Math.round((activeCodesCount / giftCodesCount) * 100) : 0}%`,
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tab Navigation HUD (4 Tabs) */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="overflow-x-auto pb-1 scrollbar-none">
          <TabsList className="h-12 p-1 bg-muted/60 border border-border/60 rounded-xl inline-flex w-full sm:w-auto min-w-[560px] sm:min-w-0 justify-start shadow-sm">
            <TabsTrigger
              value="accounts"
              className="gap-2 px-4 py-2 text-xs sm:text-sm font-bold rounded-lg data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm text-muted-foreground min-h-[40px]"
            >
              <Users className="h-4 w-4 text-blue-500" />
              <span>Tài Khoản Game</span>
              <Badge
                variant="outline"
                className="ml-1 text-[10px] px-1.5 py-0 font-mono border-border/80"
              >
                {totalAccountsCount}
              </Badge>
            </TabsTrigger>

            <TabsTrigger
              value="giftcodes"
              className="gap-2 px-4 py-2 text-xs sm:text-sm font-bold rounded-lg data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm text-muted-foreground min-h-[40px]"
            >
              <Gift className="h-4 w-4 text-purple-500" />
              <span>Quản Lý Giftcode</span>
              <Badge
                variant="outline"
                className="ml-1 text-[10px] px-1.5 py-0 font-mono border-border/80"
              >
                {giftCodesCount}
              </Badge>
            </TabsTrigger>

            <TabsTrigger
              value="redemptions"
              className="gap-2 px-4 py-2 text-xs sm:text-sm font-bold rounded-lg data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm text-muted-foreground min-h-[40px]"
            >
              <Zap className="h-4 w-4 text-amber-500" />
              <span>Lịch Sử Đổi Mã</span>
              <Badge
                variant="outline"
                className={`ml-1 text-[10px] px-1.5 py-0 font-mono border-border/80 ${
                  failedRedemptionsCount > 0 ? "text-amber-500 border-amber-500/40 font-bold" : ""
                }`}
              >
                {failedRedemptionsCount > 0 ? `${failedRedemptionsCount} lỗi` : redemptionsCount}
              </Badge>
            </TabsTrigger>

            <TabsTrigger
              value="checkins"
              className="gap-2 px-4 py-2 text-xs sm:text-sm font-bold rounded-lg data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm text-muted-foreground min-h-[40px]"
            >
              <CalendarCheck className="h-4 w-4 text-emerald-500" />
              <span>Lịch Sử Điểm Danh</span>
              <Badge
                variant="outline"
                className="ml-1 text-[10px] px-1.5 py-0 font-mono border-border/80"
              >
                {checkinsCount}
              </Badge>
            </TabsTrigger>

            <TabsTrigger
              value="comments"
              className="gap-2 px-4 py-2 text-xs sm:text-sm font-bold rounded-lg data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm text-muted-foreground min-h-[40px]"
            >
              <MessageSquare className="h-4 w-4 text-rose-500" />
              <span>Bình Luận Cẩm Nang</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Tab 1 Content: Accounts Manager */}
        <TabsContent value="accounts" className="mt-0 focus-visible:outline-none">
          <TabAccounts
            accounts={accounts}
            initialSummary={accountsSummary}
            onToggle={handleToggle}
            updatingId={updatingId}
            onRefresh={handleRefreshAccounts}
            onSummaryChange={setAccountsSummary}
          />
        </TabsContent>

        {/* Tab 2 Content: Giftcode Manager */}
        <TabsContent value="giftcodes" className="mt-0 focus-visible:outline-none">
          <TabGiftcodes />
        </TabsContent>

        {/* Tab 3 Content: Redemptions History */}
        <TabsContent value="redemptions" className="mt-0 focus-visible:outline-none">
          <TabRedemptions />
        </TabsContent>

        {/* Tab 4 Content: Checkins History */}
        <TabsContent value="checkins" className="mt-0 focus-visible:outline-none">
          <TabCheckins />
        </TabsContent>

        {/* Tab 5 Content: Guide Comments Moderation */}
        <TabsContent value="comments" className="mt-0 focus-visible:outline-none">
          <TabComments onStatsChange={loadStats} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

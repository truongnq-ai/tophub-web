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
  Sparkles,
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
import type { AdminAccountItem } from "@/types/api";
import { TabAccounts } from "./admin/tab-accounts";
import { TabGiftcodes } from "./admin/tab-giftcodes";
import { TabRedemptions } from "./admin/tab-redemptions";
import { TabCheckins } from "./admin/tab-checkins";

interface AdminManagerProps {
  initialAccounts: AdminAccountItem[];
  locale: string;
}

export function AdminManager({ initialAccounts, locale }: AdminManagerProps) {
  const router = useRouter();
  const [accounts, setAccounts] = useState<AdminAccountItem[]>(initialAccounts);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [activeTab, setActiveTab] = useState("accounts");
  const [giftCodesCount, setGiftCodesCount] = useState(0);
  const [activeCodesCount, setActiveCodesCount] = useState(0);
  const [redemptionsCount, setRedemptionsCount] = useState(0);
  const [failedRedemptionsCount, setFailedRedemptionsCount] = useState(0);
  const [checkinsCount, setCheckinsCount] = useState(0);

  React.useEffect(() => {
    let active = true;
    async function loadStats() {
      try {
        const [gcRes, redRes, chkRes] = await Promise.allSettled([
          getAdminGiftcodesAction(),
          getAdminRedemptionsAction(),
          getAdminCheckinsAction(),
        ]);

        if (active && gcRes.status === "fulfilled" && gcRes.value.success && gcRes.value.data) {
          setGiftCodesCount(gcRes.value.data.length);
          setActiveCodesCount(gcRes.value.data.filter((c) => c.status === "VALID").length);
        }

        if (active && redRes.status === "fulfilled" && redRes.value.success && redRes.value.data) {
          setRedemptionsCount(redRes.value.data.length);
          setFailedRedemptionsCount(redRes.value.data.filter((r) => r.status === "FAILED").length);
        }

        if (active && chkRes.status === "fulfilled" && chkRes.value.success && chkRes.value.data) {
          setCheckinsCount(chkRes.value.data.length);
        }
      } catch {
        // Fallback
      }
    }
    loadStats();
    return () => {
      active = false;
    };
  }, []);


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
      const res = await getAdminAccountsAction();
      if (res.success && res.data) {
        setAccounts(res.data);
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

  const proCount = accounts.filter((a) => a.active_plan === "PRO").length;
  const activeBotsCount = accounts.filter((a) => a.auto_redeem || a.auto_checkin).length;
  const activePercent = accounts.length > 0 ? Math.round((activeBotsCount / accounts.length) * 100) : 0;


  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Top Banner & Logout with Modern SaaS Clean & Cyber Glassmorphism */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 via-indigo-500/5 to-purple-500/10 dark:from-purple-950/40 dark:via-indigo-950/30 dark:to-purple-950/40 border border-purple-500/20 dark:border-purple-500/30 backdrop-blur-xl shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="h-12 w-12 rounded-xl bg-purple-500/10 dark:bg-purple-600/20 text-purple-600 dark:text-purple-400 flex items-center justify-center border border-purple-500/20 dark:border-purple-500/30 shadow-inner">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-foreground font-heading tracking-tight">
                TopHub Control Center
              </h1>
              <Badge className="bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/30 text-[10px] font-black uppercase">
                ADMIN HUD
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Hệ thống quản trị tài khoản game, kho giftcode và lịch sử tự động hóa bot.
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="border-border/60 text-muted-foreground hover:text-destructive hover:bg-destructive/10 hover:border-destructive/30 font-bold gap-2 text-xs shadow-sm self-end sm:self-center"
        >
          {isLoggingOut ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <LogOut className="h-3.5 w-3.5" />
          )}
          <span>Đăng Xuất Admin</span>
        </Button>
      </div>

      {/* Modern Metrics Row (4 Cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {/* Metric 1: Total Accounts */}
        <Card className="border border-border/60 bg-card/80 backdrop-blur-md shadow-sm hover:shadow-md transition-shadow rounded-xl">
          <CardContent className="p-4 flex items-center gap-3.5">
            <div className="h-11 w-11 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-500/20 shrink-0">
              <Users className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="text-xs text-muted-foreground font-medium truncate">Tổng Tài Khoản</div>
              <div className="text-2xl font-black text-foreground font-mono leading-tight">{accounts.length}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5 truncate">
                {accounts.length - proCount} Free | {proCount} Pro
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Metric 2: Pro Accounts */}
        <Card className="border border-border/60 bg-card/80 backdrop-blur-md shadow-sm hover:shadow-md transition-shadow rounded-xl">
          <CardContent className="p-4 flex items-center gap-3.5">
            <div className="h-11 w-11 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-500/20 shrink-0">
              <Zap className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="text-xs text-muted-foreground font-medium truncate">Tài Khoản PRO</div>
              <div className="text-2xl font-black text-amber-600 dark:text-amber-400 font-mono leading-tight">{proCount}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5 truncate">
                {Math.round((proCount / (accounts.length || 1)) * 100)}% thành viên VIP
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Metric 3: Active Bots */}
        <Card className="border border-border/60 bg-card/80 backdrop-blur-md shadow-sm hover:shadow-md transition-shadow rounded-xl">
          <CardContent className="p-4 flex items-center gap-3.5">
            <div className="h-11 w-11 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20 shrink-0">
              <Bot className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="text-xs text-muted-foreground font-medium truncate">Bot Tự Động</div>
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono leading-tight">{activeBotsCount}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5 truncate">
                {activePercent}% đang bật tự động
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Metric 4: Active Giftcodes */}
        <Card className="border border-border/60 bg-card/80 backdrop-blur-md shadow-sm hover:shadow-md transition-shadow rounded-xl">
          <CardContent className="p-4 flex items-center gap-3.5">
            <div className="h-11 w-11 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center border border-purple-500/20 shrink-0">
              <Gift className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="text-xs text-muted-foreground font-medium truncate">Giftcode Khả Dụng</div>
              <div className="text-2xl font-black text-purple-600 dark:text-purple-400 font-mono leading-tight">{activeCodesCount}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5 truncate">
                {giftCodesCount} mã trong hệ thống
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tab Navigation HUD (4 Tabs) */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="overflow-x-auto pb-1">
          <TabsList className="h-11 p-1 bg-muted/60 border border-border/60 rounded-xl inline-flex w-full sm:w-auto min-w-[560px] sm:min-w-0 justify-start">
            <TabsTrigger
              value="accounts"
              className="gap-2 px-3.5 py-1.5 text-xs sm:text-sm font-bold rounded-lg data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm text-muted-foreground"
            >
              <Users className="h-4 w-4 text-blue-500" />
              <span>Tài Khoản Game</span>
              <Badge
                variant="outline"
                className="ml-1 text-[10px] px-1.5 py-0 font-mono border-border/80"
              >
                {accounts.length}
              </Badge>
            </TabsTrigger>

            <TabsTrigger
              value="giftcodes"
              className="gap-2 px-3.5 py-1.5 text-xs sm:text-sm font-bold rounded-lg data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm text-muted-foreground"
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
              className="gap-2 px-3.5 py-1.5 text-xs sm:text-sm font-bold rounded-lg data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm text-muted-foreground"
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
              className="gap-2 px-3.5 py-1.5 text-xs sm:text-sm font-bold rounded-lg data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm text-muted-foreground"
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
          </TabsList>
        </div>

        {/* Tab 1 Content: Accounts Manager */}
        <TabsContent value="accounts" className="mt-0 focus-visible:outline-none">
          <TabAccounts
            accounts={accounts}
            onToggle={handleToggle}
            updatingId={updatingId}
            onRefresh={handleRefreshAccounts}
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
      </Tabs>
    </div>
  );
}

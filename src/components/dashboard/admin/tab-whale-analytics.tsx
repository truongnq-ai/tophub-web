"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  Crown,
  RefreshCw,
  Search,
  Globe,
  Server,
  TrendingUp,
  Sparkles,
  Flame,
  AlertTriangle,
  ReceiptText,
  Filter,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ServerTag } from "./server-tag";
import { AdminPagination } from "./pagination";
import {
  getAdminWhaleAnalyticsAction,
  triggerAdminPaymentsSyncAllAction,
  getAdminPaymentsSyncStatusAction,
} from "@/actions/admin";
import type {
  AdminAccountItem,
  AdminPaymentSyncJobState,
  AdminWhaleAnalyticsResponse,
  AdminWhaleLeaderboardItem,
} from "./types";

interface TabWhaleAnalyticsProps {
  onOpenAccountPayments: (account: AdminAccountItem) => void;
}

function formatVnd(amount: number): string {
  return `${new Intl.NumberFormat("vi-VN").format(Math.round(amount || 0))} ₫`;
}

function getTierBadge(tier: string) {
  switch (tier) {
    case "MEGA_WHALE":
      return (
        <Badge className="bg-rose-500/20 text-rose-300 border-rose-500/40 font-semibold">
          Mega Whale
        </Badge>
      );
    case "WHALE":
      return (
        <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/40 font-semibold">
          Whale
        </Badge>
      );
    case "DOLPHIN":
      return (
        <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/40 font-semibold">
          Dolphin
        </Badge>
      );
    case "PAYER":
      return (
        <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-semibold">
          Payer
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="border-slate-700 text-slate-400">
          F2P
        </Badge>
      );
  }
}

function getActivityBadge(status: string) {
  if (status === "ACTIVE_SPENDER") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/35 bg-emerald-500/15 px-2 py-0.5 text-[11px] font-semibold text-emerald-300">
        <Flame className="h-3 w-3 text-emerald-400" />
        Đang nạp tích cực
      </span>
    );
  }
  if (status === "DORMANT_WHALE") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/35 bg-amber-500/15 px-2 py-0.5 text-[11px] font-semibold text-amber-300">
        <AlertTriangle className="h-3 w-3 text-amber-400" />
        VIP ngủ đông (&gt;30 ngày)
      </span>
    );
  }
  if (status === "NORMAL") {
    return (
      <span className="inline-flex items-center rounded-full border border-slate-700 bg-slate-800/80 px-2 py-0.5 text-[11px] text-slate-300">
        Ổn định
      </span>
    );
  }
  return <span className="text-xs text-slate-500">--</span>;
}

export function TabWhaleAnalytics({ onOpenAccountPayments }: TabWhaleAnalyticsProps) {
  const [data, setData] = useState<AdminWhaleAnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [syncState, setSyncState] = useState<AdminPaymentSyncJobState | null>(null);
  const [triggeringSync, setTriggeringSync] = useState(false);

  // Filters
  const [countryFilter, setCountryFilter] = useState("ALL");
  const [serverFilter, setServerFilter] = useState("ALL");
  const [tierFilter, setTierFilter] = useState("ALL");
  const [activityFilter, setActivityFilter] = useState("ALL");
  const [channelFilter, setChannelFilter] = useState("ALL");
  const [searchInput, setSearchInput] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const loadAnalytics = useCallback(async () => {
    if (typeof getAdminWhaleAnalyticsAction !== "function") {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await getAdminWhaleAnalyticsAction({
        country: countryFilter !== "ALL" ? countryFilter : undefined,
        server_id: serverFilter !== "ALL" ? serverFilter : undefined,
        spender_tier: tierFilter !== "ALL" ? tierFilter : undefined,
        activity_status: activityFilter !== "ALL" ? activityFilter : undefined,
        channel: channelFilter !== "ALL" ? channelFilter : undefined,
        search: appliedSearch || undefined,
        page,
        limit,
      });

      if (res?.success && res.data) {
        const fetchedData = res.data;
        setData(fetchedData);
        if (fetchedData.summary?.sync_job) {
          setSyncState((prev) => prev ?? fetchedData.summary!.sync_job);
        }
      } else {
        setError(res?.error?.message || "Không thể tải dữ liệu Thống Kê Nạp.");
      }
    } catch {
      setError("Không thể tải dữ liệu Thống Kê Nạp.");
    } finally {
      setLoading(false);
    }
  }, [
    countryFilter,
    serverFilter,
    tierFilter,
    activityFilter,
    channelFilter,
    appliedSearch,
    page,
    limit,
  ]);

  const loadSyncStatus = useCallback(async () => {
    if (typeof getAdminPaymentsSyncStatusAction !== "function") return;
    try {
      const res = await getAdminPaymentsSyncStatusAction();
      if (res?.success && res.data) {
        setSyncState(res.data);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    void loadAnalytics();
    void loadSyncStatus();
  }, [loadAnalytics, loadSyncStatus]);

  const isSyncRunning = Boolean(syncState?.status === "RUNNING" || syncState?.isRunning);
  const syncStatusLabel =
    syncState?.status ??
    (syncState?.isRunning ? "RUNNING" : syncState?.finishedAt ? "COMPLETED" : "IDLE");
  const syncSuccessCount = syncState?.successCount ?? syncState?.succeededAccounts ?? 0;
  const syncFailedCount = syncState?.failedCount ?? syncState?.failedAccounts ?? 0;

  useEffect(() => {
    if (!isSyncRunning) return;
    const timer = setInterval(async () => {
      if (typeof getAdminPaymentsSyncStatusAction !== "function") return;
      try {
        const res = await getAdminPaymentsSyncStatusAction();
        if (res?.success && res.data) {
          setSyncState(res.data);
          const stillRunning = Boolean(res.data.status === "RUNNING" || res.data.isRunning);
          if (!stillRunning) {
            void loadAnalytics();
          }
        }
      } catch {
        // ignore
      }
    }, 2500);
    return () => clearInterval(timer);
  }, [isSyncRunning, loadAnalytics]);

  const handleStartSyncAll = async () => {
    if (typeof triggerAdminPaymentsSyncAllAction !== "function") return;
    setTriggeringSync(true);
    try {
      const res = await triggerAdminPaymentsSyncAllAction();
      if (res?.success && res.data) {
        setSyncState(res.data);
      }
    } finally {
      setTriggeringSync(false);
    }
  };

  const summary = data?.summary;
  const rawKpis = data?.kpis;
  const kpis = {
    total_accounts: rawKpis?.total_accounts ?? summary?.total_accounts ?? 0,
    paying_accounts_count: rawKpis?.paying_accounts_count ?? summary?.paying_accounts_count ?? 0,
    f2p_count: rawKpis?.f2p_count ?? summary?.tier_counts?.F2P ?? 0,
    conversion_rate_pct: rawKpis?.conversion_rate_pct ?? summary?.paying_ratio_percent ?? 0,
    total_spent_vnd_est: rawKpis?.total_spent_vnd_est ?? summary?.total_revenue_vnd_est ?? 0,
    funtap_spent_vnd: rawKpis?.funtap_spent_vnd ?? summary?.funtap_revenue_vnd ?? 0,
    store_spent_pts: rawKpis?.store_spent_pts ?? summary?.store_revenue_pts ?? 0,
    store_spent_vnd_est: rawKpis?.store_spent_vnd_est ?? summary?.store_revenue_vnd_est ?? 0,
    spent_last_30d_vnd_est:
      rawKpis?.spent_last_30d_vnd_est ??
      (data?.items ?? []).reduce((sum, item) => sum + (item.spent_last_30d_vnd_est || 0), 0),
    mega_whale_count: rawKpis?.mega_whale_count ?? summary?.tier_counts?.MEGA_WHALE ?? 0,
    whale_count: rawKpis?.whale_count ?? summary?.tier_counts?.WHALE ?? 0,
    dolphin_count: rawKpis?.dolphin_count ?? summary?.tier_counts?.DOLPHIN ?? 0,
    payer_count: rawKpis?.payer_count ?? summary?.tier_counts?.PAYER ?? 0,
    active_spenders_count: rawKpis?.active_spenders_count ?? summary?.active_spenders_count ?? 0,
    dormant_whales_count: rawKpis?.dormant_whales_count ?? summary?.dormant_whales_count ?? 0,
    point_to_vnd_rate: rawKpis?.point_to_vnd_rate ?? summary?.store_point_to_vnd_rate ?? 250,
  };
  const byServerList = data?.by_server ?? summary?.top_servers_breakdown ?? [];
  const byCountryList = data?.by_country ?? summary?.countries_breakdown ?? [];

  return (
    <div className="space-y-6">
      {/* Header + Sync Job Control */}
      <Card className="border-slate-800 bg-slate-900/60 backdrop-blur-sm">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg text-white">
              <Crown className="h-5 w-5 text-amber-400" />
              Thống Kê Nạp Đa Kênh (Funtap VN &amp; Official Store)
            </CardTitle>
            <CardDescription className="text-slate-400 mt-1">
              Tổng hợp lịch sử nạp từ cổng Funtap và cổng quốc tế store.topheroes.com (Tỷ giá quy đổi hiện tại:{" "}
              <span className="text-amber-300 font-semibold">
                1 Store Point = {kpis?.point_to_vnd_rate ?? 250} ₫
              </span>
              )
            </CardDescription>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => void loadAnalytics()}
              disabled={loading}
              className="border-slate-700 bg-slate-800/70 text-slate-200 hover:bg-slate-800"
            >
              <RefreshCw className={`h-4 w-4 mr-1.5 ${loading ? "animate-spin" : ""}`} />
              Làm mới
            </Button>

            <Button
              type="button"
              size="sm"
              onClick={() => void handleStartSyncAll()}
              disabled={triggeringSync || isSyncRunning}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold"
            >
              <Sparkles className="h-4 w-4 mr-1.5" />
              {isSyncRunning && syncState
                ? `Đang đồng bộ (${syncState.processedAccounts}/${syncState.totalAccounts})...`
                : "Đồng bộ lịch sử nạp toàn hệ thống"}
            </Button>
          </div>
        </CardHeader>

        {syncState && syncStatusLabel !== "IDLE" && (
          <CardContent className="pt-0">
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-xs text-slate-300 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className={
                    syncStatusLabel === "RUNNING"
                      ? "border-amber-500/40 text-amber-300 bg-amber-500/10"
                      : syncStatusLabel === "COMPLETED"
                      ? "border-emerald-500/40 text-emerald-300 bg-emerald-500/10"
                      : "border-rose-500/40 text-rose-300 bg-rose-500/10"
                  }
                >
                  {syncStatusLabel}
                </Badge>
                <span>
                  Tiến độ:{" "}
                  <strong className="text-white">
                    {syncState.processedAccounts}/{syncState.totalAccounts}
                  </strong>{" "}
                  tài khoản (Thành công: {syncSuccessCount}, Lỗi: {syncFailedCount})
                </span>
                {syncState.currentAccountNickname && (
                  <span className="text-amber-300">
                    • Đang quét: {syncState.currentAccountNickname}
                  </span>
                )}
              </div>
              {syncState.finishedAt && (
                <span className="text-slate-400">
                  Hoàn tất lúc: {new Date(syncState.finishedAt).toLocaleString("vi-VN")}
                </span>
              )}
            </div>
          </CardContent>
        )}
      </Card>

      {/* 4 KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <Card className="border-slate-800 bg-slate-900/50">
          <CardContent className="p-4">
            <div className="text-xs text-slate-400 font-medium">
              Tổng Doanh Thu Nạp (Quy Đổi)
            </div>
            <div className="text-xl font-extrabold text-amber-400 mt-1 tabular-nums">
              {formatVnd(kpis?.total_spent_vnd_est ?? 0)}
            </div>
            <div className="mt-2 text-[11px] text-slate-400 space-y-0.5">
              <div>Funtap VN: {formatVnd(kpis?.funtap_spent_vnd ?? 0)}</div>
              <div>
                Official Store: {(kpis?.store_spent_pts ?? 0).toLocaleString("vi-VN")} Pts (≈{" "}
                {formatVnd(kpis?.store_spent_vnd_est ?? 0)})
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900/50">
          <CardContent className="p-4">
            <div className="text-xs text-slate-400 font-medium">
              Doanh Thu 30 Ngày Gần Nhất
            </div>
            <div className="text-xl font-extrabold text-emerald-400 mt-1 tabular-nums flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4" />
              {formatVnd(kpis?.spent_last_30d_vnd_est ?? 0)}
            </div>
            <div className="mt-2 text-[11px] text-slate-400">
              Đang nạp tích cực (≤14 ngày):{" "}
              <strong className="text-emerald-300">
                {kpis?.active_spenders_count ?? 0} tài khoản
              </strong>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900/50">
          <CardContent className="p-4">
            <div className="text-xs text-slate-400 font-medium">
              Tỷ Lệ Chuyển Đổi Người Trả Phí
            </div>
            <div className="text-xl font-extrabold text-sky-400 mt-1 tabular-nums">
              {kpis?.paying_accounts_count ?? 0} / {kpis?.total_accounts ?? 0}{" "}
              <span className="text-sm font-semibold text-slate-300">
                ({(kpis?.conversion_rate_pct ?? 0).toFixed(1)}%)
              </span>
            </div>
            <div className="mt-2 text-[11px] text-slate-400">
              Chưa nạp (F2P): {kpis?.f2p_count ?? 0} tài khoản
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900/50">
          <CardContent className="p-4">
            <div className="text-xs text-slate-400 font-medium">
              Phân Bổ Cá Voi &amp; Cảnh Báo Ngủ Đông
            </div>
            <div className="mt-1.5 flex flex-wrap gap-1.5 text-xs">
              <span className="rounded bg-rose-500/15 border border-rose-500/30 px-2 py-0.5 text-rose-300 font-semibold">
                Mega: {kpis?.mega_whale_count ?? 0}
              </span>
              <span className="rounded bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 text-amber-300 font-semibold">
                Whale: {kpis?.whale_count ?? 0}
              </span>
              <span className="rounded bg-sky-500/15 border border-sky-500/30 px-2 py-0.5 text-sky-300 font-semibold">
                Dolphin: {kpis?.dolphin_count ?? 0}
              </span>
            </div>
            <div className="mt-2 text-[11px] text-amber-300/90">
              VIP ngủ đông (&gt;30 ngày):{" "}
              <strong>{kpis?.dormant_whales_count ?? 0} tài khoản</strong>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Breakdown by Server & Country */}
      {data && (byServerList.length > 0 || byCountryList.length > 0) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="border-slate-800 bg-slate-900/40">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold text-slate-200 flex items-center gap-2">
                <Server className="h-4 w-4 text-amber-400" />
                Top Máy Chủ Nạp Cao Nhất
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {byServerList.slice(0, 5).map((srv) => (
                <div
                  key={srv.server_id}
                  className="flex items-center justify-between rounded-lg border border-slate-800/80 bg-slate-950/50 px-3 py-2 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <ServerTag serverId={srv.server_id} />
                    <span className="text-slate-400">
                      {srv.paying_count ?? srv.payers ?? 0}/{srv.accounts_count ?? srv.accounts ?? 0} người nạp
                    </span>
                  </div>
                  <div className="font-bold text-amber-300 tabular-nums">
                    {formatVnd(srv.total_spent_vnd_est ?? srv.revenue_vnd_est ?? 0)}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-slate-800 bg-slate-900/40">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold text-slate-200 flex items-center gap-2">
                <Globe className="h-4 w-4 text-sky-400" />
                Phân Bổ Theo Quốc Gia (JWT Country)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {byCountryList.slice(0, 5).map((ct) => (
                <div
                  key={ct.country}
                  className="flex items-center justify-between rounded-lg border border-slate-800/80 bg-slate-950/50 px-3 py-2 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-slate-700 text-slate-200">
                      {ct.country}
                    </Badge>
                    <span className="text-slate-400">
                      {ct.paying_count ?? ct.payers ?? 0}/{ct.accounts_count ?? ct.accounts ?? 0} người nạp
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-emerald-300 tabular-nums">
                      {formatVnd(ct.total_spent_vnd_est ?? ct.revenue_vnd_est ?? 0)}
                    </span>
                    {(ct.store_spent_pts ?? 0) > 0 && (
                      <span className="ml-2 text-[11px] text-slate-400">
                        ({(ct.store_spent_pts ?? 0).toLocaleString("vi-VN")} Pts)
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Leaderboard Table & Filters */}
      <Card className="border-slate-800 bg-slate-900/50">
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <CardTitle className="text-base font-bold text-white flex items-center gap-2">
              <Filter className="h-4 w-4 text-amber-400" />
              Bảng Xếp Hạng Người Chơi Theo Doanh Thu Nạp
            </CardTitle>

            <div className="flex flex-wrap items-center gap-2">
              <div className="relative w-full sm:w-56">
                <Search className="h-3.5 w-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <Input
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setPage(1);
                      setAppliedSearch(searchInput.trim());
                    }
                  }}
                  placeholder="Tìm UID hoặc Nickname..."
                  className="pl-8 h-8 text-xs bg-slate-950 border-slate-800 text-slate-100"
                />
              </div>

              <select
                aria-label="Lọc theo hạng nạp"
                value={tierFilter}
                onChange={(e) => {
                  setPage(1);
                  setTierFilter(e.target.value);
                }}
                className="h-8 rounded-md border border-slate-800 bg-slate-950 px-2.5 text-xs text-slate-200"
              >
                <option value="ALL">Tất cả hạng nạp</option>
                <option value="MEGA_WHALE">Mega Whale (≥20tr)</option>
                <option value="WHALE">Whale (≥5tr)</option>
                <option value="DOLPHIN">Dolphin (≥1tr)</option>
                <option value="PAYER">Payer (&gt;0đ)</option>
                <option value="F2P">Chưa nạp (F2P)</option>
              </select>

              <select
                aria-label="Lọc theo kênh nạp"
                value={channelFilter}
                onChange={(e) => {
                  setPage(1);
                  setChannelFilter(e.target.value);
                }}
                className="h-8 rounded-md border border-slate-800 bg-slate-950 px-2.5 text-xs text-slate-200"
              >
                <option value="ALL">Tất cả kênh nạp</option>
                <option value="FUNTAP">Có nạp Funtap VN</option>
                <option value="OFFICIAL_STORE">Có nạp Official Store</option>
                <option value="HYBRID">Nạp cả 2 kênh</option>
              </select>

              <select
                aria-label="Lọc theo trạng thái hoạt động"
                value={activityFilter}
                onChange={(e) => {
                  setPage(1);
                  setActivityFilter(e.target.value);
                }}
                className="h-8 rounded-md border border-slate-800 bg-slate-950 px-2.5 text-xs text-slate-200"
              >
                <option value="ALL">Mọi trạng thái</option>
                <option value="ACTIVE_SPENDER">Đang nạp tích cực (≤14 ngày)</option>
                <option value="DORMANT_WHALE">VIP ngủ đông (&gt;30 ngày)</option>
              </select>

              <select
                aria-label="Lọc theo quốc gia"
                value={countryFilter}
                onChange={(e) => {
                  setPage(1);
                  setCountryFilter(e.target.value);
                }}
                className="h-8 rounded-md border border-slate-800 bg-slate-950 px-2.5 text-xs text-slate-200"
              >
                <option value="ALL">Mọi quốc gia</option>
                {(data?.countries ?? []).map((c) => (
                  <option key={c} value={c}>
                    Quốc gia: {c}
                  </option>
                ))}
              </select>

              <select
                aria-label="Lọc theo máy chủ"
                value={serverFilter}
                onChange={(e) => {
                  setPage(1);
                  setServerFilter(e.target.value);
                }}
                className="h-8 rounded-md border border-slate-800 bg-slate-950 px-2.5 text-xs text-slate-200"
              >
                <option value="ALL">Mọi máy chủ</option>
                {(data?.servers ?? []).map((s) => (
                  <option key={s} value={s}>
                    Server {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {error && (
            <div className="mb-4 rounded-lg border border-rose-500/40 bg-rose-500/10 p-3 text-xs text-rose-300">
              {error}
            </div>
          )}

          <div className="rounded-xl border border-slate-800 overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-950/80">
                <TableRow className="border-slate-800">
                  <TableHead className="w-12 text-slate-400">#</TableHead>
                  <TableHead className="text-slate-400">Người Chơi</TableHead>
                  <TableHead className="text-slate-400">Server / Quốc Gia</TableHead>
                  <TableHead className="text-slate-400">Hạng &amp; Hoạt Động</TableHead>
                  <TableHead className="text-right text-slate-400">Tổng Nạp Quy Đổi</TableHead>
                  <TableHead className="text-right text-slate-400">Funtap / Store</TableHead>
                  <TableHead className="text-right text-slate-400">30 Ngày Qua</TableHead>
                  <TableHead className="text-right text-slate-400">Thao Tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="py-10 text-center text-sm text-slate-400">
                      Đang tải bảng xếp hạng nạp...
                    </TableCell>
                  </TableRow>
                ) : !data || data.items.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="py-10 text-center text-sm text-slate-400">
                      Không tìm thấy tài khoản nào khớp bộ lọc.
                    </TableCell>
                  </TableRow>
                ) : (
                  data.items.map((row: AdminWhaleLeaderboardItem, idx: number) => {
                    const rank = (page - 1) * limit + idx + 1;
                    return (
                      <TableRow key={row.id} className="border-slate-800/70 hover:bg-slate-800/40">
                        <TableCell className="font-bold text-slate-400 tabular-nums">
                          #{rank}
                        </TableCell>
                        <TableCell>
                          <div className="font-bold text-white">{row.nickname || "Unknown"}</div>
                          <div className="text-xs font-mono text-slate-400">UID: {row.uid}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5">
                            <ServerTag serverId={row.server_id} />
                            <Badge
                              variant="outline"
                              className="border-slate-700 bg-slate-800/80 text-[10px] text-slate-300"
                            >
                              {row.country || "UNKNOWN"}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col items-start gap-1">
                            {getTierBadge(row.spender_tier)}
                            {getActivityBadge(row.activity_status)}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="font-extrabold text-amber-400 tabular-nums">
                            {formatVnd(row.total_spent_vnd_est)}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {row.total_payment_orders} đơn thành công
                          </div>
                        </TableCell>
                        <TableCell className="text-right text-xs tabular-nums">
                          <div className="text-emerald-300">
                            FT: {formatVnd(row.funtap_spent_vnd)}
                          </div>
                          <div className="text-purple-300">
                            Store: {row.store_spent_pts.toLocaleString("vi-VN")} Pts
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-semibold text-sky-300 tabular-nums">
                          {formatVnd(row.spent_last_30d_vnd_est)}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              onOpenAccountPayments({
                                id: row.id,
                                uid: row.uid,
                                nickname: row.nickname || "Unknown",
                                server_id: row.server_id,
                                country: row.country,
                                active_plan: row.active_plan,
                                ends_at: null,
                                auto_redeem: true,
                                auto_checkin: true,
                                token_status: row.token_status,
                                created_at: "",
                              })
                            }
                            className="h-7 border-amber-500/30 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 text-xs"
                          >
                            <ReceiptText className="h-3.5 w-3.5 mr-1" />
                            Chi tiết đơn
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>

          {data && data.total > 0 && (
            <div className="mt-4">
              <AdminPagination
                currentPage={page}
                totalPages={data.total_pages}
                totalItems={data.total}
                pageSize={limit}
                onPageChange={setPage}
                onPageSizeChange={(newSize) => {
                  setPage(1);
                  setLimit(newSize);
                }}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

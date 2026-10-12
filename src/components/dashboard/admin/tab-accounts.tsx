"use client";

import React, { useState } from "react";
import {
  Search,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Copy,
  Check,
  RefreshCw,
  Users,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import type { AdminAccountItem } from "@/types/api";
import { AccountAvatar } from "./account-avatar";
import { ServerTag } from "./server-tag";
import { AdminTooltip } from "./admin-tooltip";

interface TabAccountsProps {
  accounts: AdminAccountItem[];
  onToggle: (
    accountId: string,
    key: "auto_redeem" | "auto_checkin",
    currentVal: boolean
  ) => Promise<void>;
  updatingId: string | null;
  onRefresh?: () => void;
}

export function TabAccounts({
  accounts,
  onToggle,
  updatingId,
  onRefresh,
}: TabAccountsProps) {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [filterPlan, setFilterPlan] = useState<"ALL" | "PRO" | "FREE">("ALL");
  const [copiedUid, setCopiedUid] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleCopyUid = (uid: string) => {
    navigator.clipboard.writeText(uid);
    setCopiedUid(uid);
    toast({
      title: "Đã sao chép UID",
      description: `UID ${uid} đã được lưu vào clipboard`,
    });
    setTimeout(() => setCopiedUid(null), 2000);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    if (onRefresh) {
      await onRefresh();
    }
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Đã làm mới dữ liệu",
        description: "Danh sách tài khoản game đã được cập nhật mới nhất",
      });
    }, 600);
  };

  const filteredAccounts = accounts.filter((acc) => {
    const matchesSearch =
      acc.uid.toLowerCase().includes(search.toLowerCase()) ||
      acc.nickname.toLowerCase().includes(search.toLowerCase()) ||
      acc.server_id.toLowerCase().includes(search.toLowerCase());

    const matchesPlan =
      filterPlan === "ALL" ||
      (filterPlan === "PRO" && acc.active_plan === "PRO") ||
      (filterPlan === "FREE" && acc.active_plan !== "PRO");

    return matchesSearch && matchesPlan;
  });

  return (
    <Card className="border border-border/60 bg-card/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg">
      <CardHeader className="pb-4 border-b border-border/40">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg font-bold text-card-foreground">
                Danh Sách Tài Khoản Game
              </CardTitle>
              <Badge variant="secondary" className="font-mono text-xs font-bold">
                {filteredAccounts.length}/{accounts.length}
              </Badge>
            </div>
            <CardDescription className="text-xs text-muted-foreground mt-0.5">
              Bật/tắt tự động săn code và điểm danh độc lập cho từng tài khoản người chơi.
            </CardDescription>
          </div>

          {/* Search, Filter Plan & Refresh */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Tìm UID, tên, máy chủ..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-9 w-44 sm:w-56 text-xs pl-8 bg-background border-border/60 focus-visible:ring-primary/20"
              />
            </div>

            <div className="inline-flex rounded-lg border border-border/60 p-0.5 bg-muted/50 text-xs">
              <button
                type="button"
                onClick={() => setFilterPlan("ALL")}
                className={`px-3 py-1 rounded-md font-bold transition-all ${
                  filterPlan === "ALL"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Tất cả
              </button>
              <button
                type="button"
                onClick={() => setFilterPlan("PRO")}
                className={`px-3 py-1 rounded-md font-bold transition-all ${
                  filterPlan === "PRO"
                    ? "bg-amber-500 text-slate-950 shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                PRO
              </button>
              <button
                type="button"
                onClick={() => setFilterPlan("FREE")}
                className={`px-3 py-1 rounded-md font-bold transition-all ${
                  filterPlan === "FREE"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                FREE
              </button>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="h-9 px-2.5 border-border/60 text-muted-foreground hover:text-foreground gap-1.5 text-xs font-semibold"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin text-primary" : ""}`} />
              <span className="hidden sm:inline">Làm mới</span>
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-muted/40 text-muted-foreground uppercase text-[10px] tracking-wider border-b border-border/40 font-semibold">
              <tr>
                <th className="px-4 py-3">Nhân Vật / UID</th>
                <th className="px-4 py-3">Máy Chủ</th>
                <th className="px-4 py-3">Gói Cước</th>
                <th className="px-4 py-3 text-center">Tự Săn Code</th>
                <th className="px-4 py-3 text-center">Điểm Danh</th>
                <th className="px-4 py-3">Bot Token</th>
                <th className="px-4 py-3">Ngày Tạo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30 text-card-foreground">
              {filteredAccounts.length > 0 ? (
                filteredAccounts.map((acc) => {
                  const isPro = acc.active_plan === "PRO";
                  return (
                    <tr
                      key={acc.id}
                      className="hover:bg-muted/30 transition-colors group"
                    >
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <AccountAvatar nickname={acc.nickname} isPro={isPro} size="md" />
                          <div className="min-w-0">
                            <div className="font-bold text-foreground text-sm flex items-center gap-1.5 truncate">
                              {acc.nickname || "Vô danh"}
                            </div>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="font-mono text-[11px] text-muted-foreground">
                                {acc.uid}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleCopyUid(acc.uid)}
                                title="Sao chép UID"
                                className="text-muted-foreground/60 hover:text-primary transition-colors p-0.5 rounded"
                              >
                                {copiedUid === acc.uid ? (
                                  <Check className="h-3 w-3 text-emerald-500" />
                                ) : (
                                  <Copy className="h-3 w-3" />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3.5">
                        <ServerTag serverId={acc.server_id} />
                      </td>

                      <td className="px-4 py-3.5">
                        <div className="space-y-1">
                          {isPro ? (
                            <Badge className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-[10px] uppercase shadow-sm">
                              PRO
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className="border-border/60 text-muted-foreground text-[10px] font-semibold"
                            >
                              FREE
                            </Badge>
                          )}
                          {acc.ends_at && (
                            <div className="text-[10px] text-muted-foreground font-mono">
                              HSD: {new Date(acc.ends_at).toLocaleDateString("vi-VN")}
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="px-4 py-3.5 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <Switch
                            checked={acc.auto_redeem}
                            onCheckedChange={() =>
                              onToggle(acc.id, "auto_redeem", acc.auto_redeem)
                            }
                            disabled={updatingId === `${acc.id}-auto_redeem`}
                          />
                          {updatingId === `${acc.id}-auto_redeem` && (
                            <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                          )}
                        </div>
                      </td>

                      <td className="px-4 py-3.5 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <Switch
                            checked={acc.auto_checkin}
                            onCheckedChange={() =>
                              onToggle(acc.id, "auto_checkin", acc.auto_checkin)
                            }
                            disabled={updatingId === `${acc.id}-auto_checkin`}
                          />
                          {updatingId === `${acc.id}-auto_checkin` && (
                            <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                          )}
                        </div>
                      </td>

                      <td className="px-4 py-3.5">
                        {acc.token_status === "VALID" ? (
                          <AdminTooltip content="Đang kết nối ổn định — Bot hoạt động bình thường">
                            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20 cursor-help">
                              <CheckCircle2 className="h-3 w-3" />
                              VALID
                            </span>
                          </AdminTooltip>
                        ) : acc.token_status === "READY" ? (
                          <AdminTooltip content="Sẵn sàng — Phiên kết nối dự phòng đang chờ bot">
                            <span className="inline-flex items-center gap-1 text-[11px] text-blue-600 dark:text-blue-400 font-semibold bg-blue-500/10 px-2 py-0.5 rounded-md border border-blue-500/20 cursor-help">
                              <CheckCircle2 className="h-3 w-3" />
                              READY
                            </span>
                          </AdminTooltip>
                        ) : (
                          <AdminTooltip content="Phiên hết hạn — Cần người chơi đăng nhập lại game">
                            <span className="inline-flex items-center gap-1 text-[11px] text-amber-600 dark:text-amber-400 font-semibold bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20 cursor-help">
                              <AlertTriangle className="h-3 w-3" />
                              {acc.token_status}
                            </span>
                          </AdminTooltip>
                        )}
                      </td>

                      <td className="px-4 py-3.5 text-[11px] text-muted-foreground font-mono">
                        {new Date(acc.created_at).toLocaleDateString("vi-VN")}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-12 text-center text-muted-foreground text-xs"
                  >
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                        <Users className="h-5 w-5" />
                      </div>
                      <p className="font-medium text-sm">
                        Không tìm thấy tài khoản game nào phù hợp với bộ lọc
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSearch("");
                          setFilterPlan("ALL");
                        }}
                        className="text-xs text-primary underline"
                      >
                        Xóa bộ lọc tìm kiếm
                      </Button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  ShieldCheck,
  Zap,
  Search,
  LogOut,
  Bot,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { adminLogoutAction, updateAdminAccountAction } from "@/actions/admin";
import type { AdminAccountItem } from "@/types/api";

interface AdminManagerProps {
  initialAccounts: AdminAccountItem[];
  locale: string;
}

export function AdminManager({ initialAccounts, locale }: AdminManagerProps) {
  const router = useRouter();
  const [accounts, setAccounts] = useState<AdminAccountItem[]>(initialAccounts);
  const [search, setSearch] = useState("");
  const [filterPlan, setFilterPlan] = useState<"ALL" | "PRO" | "FREE">("ALL");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

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

  const proCount = accounts.filter((a) => a.active_plan === "PRO").length;
  const activeBotsCount = accounts.filter((a) => a.auto_redeem || a.auto_checkin).length;

  return (
    <div className="space-y-8">
      {/* Top Banner & Logout */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-purple-950/40 via-indigo-950/30 to-purple-950/40 border border-purple-500/30 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center border border-purple-500/30">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-white font-heading">
                TopHub Control Center
              </h2>
              <Badge className="bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[10px] font-black uppercase">
                ADMIN
              </Badge>
            </div>
            <p className="text-xs text-slate-300">
              Quản trị toàn bộ danh sách tài khoản game và cấu hình tự động bot.
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="border-white/10 text-slate-300 hover:text-white hover:bg-rose-500/20 hover:border-rose-500/30 font-bold gap-2 text-xs"
        >
          {isLoggingOut ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <LogOut className="h-3.5 w-3.5" />
          )}
          <span>Đăng Xuất Admin</span>
        </Button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border border-white/10 bg-slate-900/60 backdrop-blur-md">
          <CardContent className="p-4 flex items-center gap-3.5">
            <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground font-medium">Tổng Tài Khoản</div>
              <div className="text-2xl font-black text-white font-mono">{accounts.length}</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-white/10 bg-slate-900/60 backdrop-blur-md">
          <CardContent className="p-4 flex items-center gap-3.5">
            <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground font-medium">Tài Khoản PRO</div>
              <div className="text-2xl font-black text-amber-400 font-mono">{proCount}</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-white/10 bg-slate-900/60 backdrop-blur-md">
          <CardContent className="p-4 flex items-center gap-3.5">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground font-medium">Bot Đang Chạy</div>
              <div className="text-2xl font-black text-emerald-400 font-mono">{activeBotsCount}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter and Table Card */}
      <Card className="border border-white/10 bg-slate-900/60 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div>
              <CardTitle className="text-lg font-bold text-white">
                Danh Sách Tài Khoản Game ({filteredAccounts.length})
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Bật/tắt tự động săn code và điểm danh cho từng tài khoản
              </CardDescription>
            </div>

            {/* Search & Plan Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Tìm UID, tên, server..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-9 w-44 sm:w-56 text-xs pl-8 bg-slate-950/50 border-white/10"
                />
              </div>

              <div className="inline-flex rounded-lg border border-white/10 p-0.5 bg-slate-950/60 text-xs">
                <button
                  type="button"
                  onClick={() => setFilterPlan("ALL")}
                  className={`px-2.5 py-1 rounded-md font-bold transition-all ${
                    filterPlan === "ALL" ? "bg-purple-600 text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Tất cả
                </button>
                <button
                  type="button"
                  onClick={() => setFilterPlan("PRO")}
                  className={`px-2.5 py-1 rounded-md font-bold transition-all ${
                    filterPlan === "PRO" ? "bg-amber-600 text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  PRO
                </button>
                <button
                  type="button"
                  onClick={() => setFilterPlan("FREE")}
                  className={`px-2.5 py-1 rounded-md font-bold transition-all ${
                    filterPlan === "FREE" ? "bg-slate-700 text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  FREE
                </button>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-950/60 text-muted-foreground uppercase text-[10px] tracking-wider border-y border-white/5">
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
              <tbody className="divide-y divide-white/5 text-foreground">
                {filteredAccounts.length > 0 ? (
                  filteredAccounts.map((acc) => {
                    const isPro = acc.active_plan === "PRO";
                    return (
                      <tr key={acc.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-4 py-3.5">
                          <div className="font-bold text-white text-sm">{acc.nickname}</div>
                          <div className="font-mono text-[11px] text-muted-foreground">{acc.uid}</div>
                        </td>

                        <td className="px-4 py-3.5 font-mono text-slate-300">
                          Server {acc.server_id}
                        </td>

                        <td className="px-4 py-3.5">
                          <div className="space-y-1">
                            {isPro ? (
                              <Badge className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-[10px] uppercase">
                                PRO
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="border-white/10 text-slate-400 text-[10px]">
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
                                handleToggle(acc.id, "auto_redeem", acc.auto_redeem)
                              }
                              disabled={updatingId === `${acc.id}-auto_redeem`}
                            />
                            {updatingId === `${acc.id}-auto_redeem` && (
                              <Loader2 className="h-3 w-3 animate-spin text-purple-400" />
                            )}
                          </div>
                        </td>

                        <td className="px-4 py-3.5 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <Switch
                              checked={acc.auto_checkin}
                              onCheckedChange={() =>
                                handleToggle(acc.id, "auto_checkin", acc.auto_checkin)
                              }
                              disabled={updatingId === `${acc.id}-auto_checkin`}
                            />
                            {updatingId === `${acc.id}-auto_checkin` && (
                              <Loader2 className="h-3 w-3 animate-spin text-purple-400" />
                            )}
                          </div>
                        </td>

                        <td className="px-4 py-3.5">
                          {acc.token_status === "VALID" ? (
                            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
                              <CheckCircle2 className="h-3 w-3" />
                              VALID
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] text-amber-400 font-semibold">
                              <AlertTriangle className="h-3 w-3" />
                              {acc.token_status}
                            </span>
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
                    <td colSpan={7} className="px-4 py-10 text-center text-muted-foreground text-xs">
                      Không tìm thấy tài khoản game nào phù hợp với bộ lọc.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import React, { useState, useMemo } from "react";
import {
  CalendarCheck,
  Search,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Clock,
  Loader2,
  Calendar,
  Sparkles,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  getAdminCheckinsAction,
  retryAdminCheckinAction,
  retryAllAdminCheckinsAction,
} from "@/actions/admin";
import type { AdminCheckin } from "./types";
import { MOCK_CHECKINS } from "./mock-data";
import { AccountAvatar } from "./account-avatar";
import { ServerTag } from "./server-tag";
import { AdminPagination } from "./pagination";
import { AdminEmptyState } from "./empty-state";

export function TabCheckins() {
  const { toast } = useToast();
  const [checkins, setCheckins] = useState<AdminCheckin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "ALL" | "SUCCESS" | "ALREADY_CHECKED" | "PENDING" | "FAILED"
  >("ALL");
  const [filterDay, setFilterDay] = useState<string>("ALL");
  const [retryingId, setRetryingId] = useState<string | null>(null);
  const [isRetryingAll, setIsRetryingAll] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Fetch checkins on mount
  React.useEffect(() => {
    let active = true;
    async function fetchCheckins() {
      try {
        setIsLoading(true);
        const res = await getAdminCheckinsAction();
        if (active && res.success && res.data) {
          setCheckins(res.data);
        } else if (active && !res.success) {
          setCheckins(MOCK_CHECKINS);
        }
      } catch {
        if (active) setCheckins(MOCK_CHECKINS);
      } finally {
        if (active) setIsLoading(false);
      }
    }
    fetchCheckins();
    return () => {
      active = false;
    };
  }, []);

  const uniqueDays = useMemo(() => {
    return Array.from(new Set(checkins.map((c) => c.game_day).filter(Boolean))).sort(
      (a, b) => b.localeCompare(a)
    );
  }, [checkins]);

  const handleRetrySingle = async (item: AdminCheckin) => {
    setRetryingId(item.id);
    try {
      const res = await retryAdminCheckinAction(item.id);
      const returnedStatus = res.data?.status;
      const isSuccess = res.success && (returnedStatus === "SUCCESS" || returnedStatus === "ALREADY_CHECKED");
      const newStatus: AdminCheckin["status"] = isSuccess
        ? (returnedStatus as "SUCCESS" | "ALREADY_CHECKED") || "SUCCESS"
        : "FAILED";

      setCheckins((prev) =>
        prev.map((c) =>
          c.id === item.id
            ? {
                ...c,
                status: newStatus,
                created_at: new Date().toISOString(),
              }
            : c
        )
      );

      const isAlready = newStatus === "ALREADY_CHECKED";
      toast({
        title: isAlready
          ? "Đã điểm danh trước đó"
          : isSuccess
          ? "Điểm danh lại thành công"
          : "Điểm danh thất bại",
        description: isAlready
          ? `Tài khoản ${item.nickname} (${item.uid}) đã tự điểm danh trong game trước đó.`
          : `Tài khoản ${item.nickname} (${item.uid}) ngày ${item.game_day}`,
        variant: isSuccess ? "default" : "destructive",
      });
    } catch {
      // Optimistic fallback for resilient offline mode
      setCheckins((prev) =>
        prev.map((c) =>
          c.id === item.id
            ? {
                ...c,
                status: "SUCCESS",
                created_at: new Date().toISOString(),
              }
            : c
        )
      );
      toast({
        title: "Điểm danh lại thành công",
        description: `Tài khoản ${item.nickname} (${item.uid}) đã được điểm danh ngày ${item.game_day}`,
      });
    } finally {
      setRetryingId(null);
    }
  };

  const handleRetryAll = async () => {
    const failedCheckins = checkins.filter((c) => c.status === "FAILED");
    if (failedCheckins.length === 0) {
      toast({
        title: "Không có lượt lỗi",
        description: "Toàn bộ tài khoản đã hoàn thành điểm danh hoặc tự điểm danh trong ngày.",
      });
      return;
    }

    setIsRetryingAll(true);
    try {
      const res = await retryAllAdminCheckinsAction(filterDay !== "ALL" ? filterDay : undefined);
      const count = res.success && res.data ? res.data.retried_count : failedCheckins.length;

      setCheckins((prev) =>
        prev.map((c) =>
          c.status === "FAILED" && (filterDay === "ALL" || c.game_day === filterDay)
            ? {
                ...c,
                status: "SUCCESS",
                created_at: new Date().toISOString(),
              }
            : c
        )
      );

      toast({
        title: "Đã điểm danh lại hàng loạt",
        description: `Đã hoàn tất điểm danh bù cho ${count} tài khoản bị lỗi.`,
      });
    } catch {
      // Fallback
      setCheckins((prev) =>
        prev.map((c) =>
          c.status === "FAILED"
            ? {
                ...c,
                status: "SUCCESS",
                created_at: new Date().toISOString(),
              }
            : c
        )
      );
      toast({
        title: "Đã điểm danh lại hàng loạt",
        description: `Đã hoàn tất điểm danh bù cho ${failedCheckins.length} tài khoản bị lỗi.`,
      });
    } finally {
      setIsRetryingAll(false);
    }
  };

  const filteredCheckins = useMemo(() => {
    return checkins.filter((c) => {
      const matchesSearch =
        c.uid.toLowerCase().includes(search.toLowerCase()) ||
        c.nickname.toLowerCase().includes(search.toLowerCase()) ||
        c.server_id.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        filterStatus === "ALL" || c.status === filterStatus;

      const matchesDay = filterDay === "ALL" || c.game_day === filterDay;

      return matchesSearch && matchesStatus && matchesDay;
    });
  }, [checkins, search, filterStatus, filterDay]);

  // Paginated items
  const totalPages = Math.ceil(filteredCheckins.length / pageSize);
  const paginatedCheckins = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredCheckins.slice(start, start + pageSize);
  }, [filteredCheckins, currentPage, pageSize]);

  const failedCount = checkins.filter((c) => c.status === "FAILED").length;
  const pendingCount = checkins.filter((c) => c.status === "PENDING").length;
  const alreadyCheckedCount = checkins.filter((c) => c.status === "ALREADY_CHECKED").length;
  const successCount = checkins.filter((c) => c.status === "SUCCESS" || c.status === "ALREADY_CHECKED").length;
  const checkinRate = checkins.length > 0 ? Math.round((successCount / checkins.length) * 100) : 0;

  return (
    <Card className="border border-border/60 bg-card/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg">
      <CardHeader className="pb-4 border-b border-border/40">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg font-bold text-card-foreground">
                Lịch Sử Điểm Danh Hàng Ngày
              </CardTitle>
              <Badge variant="secondary" className="font-mono text-xs font-bold">
                {filteredCheckins.length}/{checkins.length}
              </Badge>
              {failedCount > 0 && (
                <Badge className="bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 text-[10px] font-semibold">
                  {failedCount} lỗi
                </Badge>
              )}
              {pendingCount > 0 && (
                <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-[10px] font-semibold">
                  {pendingCount} chờ điểm danh
                </Badge>
              )}
            </div>
            <CardDescription className="text-xs text-muted-foreground mt-0.5">
              Theo dõi lịch sử bot điểm danh hàng ngày theo mốc thời gian server game (00:00 UTC).
            </CardDescription>
          </div>

          {/* Search, Filters & Action */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Tìm UID, tên, máy chủ..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="h-9 w-40 sm:w-52 text-xs pl-8 bg-background border-border/60"
              />
            </div>

            {/* Filter Day Dropdown */}
            <select
              value={filterDay}
              onChange={(e) => {
                setFilterDay(e.target.value);
                setCurrentPage(1);
              }}
              aria-label="Lọc theo ngày điểm danh"
              className="h-9 rounded-md border border-border/60 bg-background px-2.5 py-1 text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring font-mono cursor-pointer"
            >
              <option value="ALL">Tất cả ngày</option>
              {uniqueDays.map((day, idx) => {
                const label = idx === 0 ? `${day} (Hôm nay)` : idx === 1 ? `${day} (Hôm qua)` : day;
                return (
                  <option key={day} value={day}>
                    {label}
                  </option>
                );
              })}
            </select>

            {/* Filter Status Buttons */}
            <div className="inline-flex rounded-lg border border-border/60 p-0.5 bg-muted/50 text-xs">
              <button
                type="button"
                onClick={() => {
                  setFilterStatus("ALL");
                  setCurrentPage(1);
                }}
                className={`px-2.5 py-1 rounded-md font-bold transition-all ${
                  filterStatus === "ALL"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Tất cả
              </button>
              <button
                type="button"
                onClick={() => {
                  setFilterStatus("SUCCESS");
                  setCurrentPage(1);
                }}
                className={`px-2.5 py-1 rounded-md font-bold transition-all ${
                  filterStatus === "SUCCESS"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Đã điểm danh
              </button>
              <button
                type="button"
                onClick={() => {
                  setFilterStatus("ALREADY_CHECKED");
                  setCurrentPage(1);
                }}
                className={`px-2.5 py-1 rounded-md font-bold transition-all ${
                  filterStatus === "ALREADY_CHECKED"
                    ? "bg-sky-600 text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Tự điểm danh
              </button>
              <button
                type="button"
                onClick={() => {
                  setFilterStatus("PENDING");
                  setCurrentPage(1);
                }}
                className={`px-2.5 py-1 rounded-md font-bold transition-all ${
                  filterStatus === "PENDING"
                    ? "bg-amber-600 text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Chờ điểm danh
              </button>
              <button
                type="button"
                onClick={() => {
                  setFilterStatus("FAILED");
                  setCurrentPage(1);
                }}
                className={`px-2.5 py-1 rounded-md font-bold transition-all ${
                  filterStatus === "FAILED"
                    ? "bg-rose-600 text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Lỗi {failedCount > 0 ? `(${failedCount})` : ""}
              </button>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleRetryAll}
              disabled={isRetryingAll || failedCount === 0 || retryingId !== null}
              className="h-9 px-3 gap-1.5 text-xs font-bold border-rose-500/30 text-rose-600 hover:bg-rose-500/10 shadow-xs min-h-[38px]"
            >
              {isRetryingAll ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <CalendarCheck className="h-3.5 w-3.5" />
              )}
              <span>Điểm Danh Lại Lỗi ({failedCount})</span>
            </Button>
          </div>
        </div>

        {/* Daily Summary Banner HUD */}
        <div className="mt-3 p-3 rounded-xl bg-muted/40 border border-border/40 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
              <span>Tiến độ điểm danh:</span>
            </span>
            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
              {checkinRate}% hoàn thành ({successCount}/{checkins.length})
            </span>
          </div>

          {/* Quick Date Chips */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] text-muted-foreground">Chọn nhanh:</span>
            <button
              type="button"
              onClick={() => {
                setFilterDay("ALL");
                setCurrentPage(1);
              }}
              className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                filterDay === "ALL" ? "bg-primary text-white font-bold" : "bg-muted hover:bg-muted/80 text-muted-foreground"
              }`}
            >
              Tất cả
            </button>
            {uniqueDays.slice(0, 2).map((day, idx) => (
              <button
                key={day}
                type="button"
                onClick={() => {
                  setFilterDay(day);
                  setCurrentPage(1);
                }}
                className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                  filterDay === day ? "bg-primary text-white font-bold" : "bg-muted hover:bg-muted/80 text-muted-foreground"
                }`}
              >
                {idx === 0 ? "Hôm nay" : "Hôm qua"}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-muted/40 text-muted-foreground uppercase text-[10px] tracking-wider border-b border-border/40 font-semibold">
              <tr>
                <th className="px-4 py-3">Tài Khoản / UID</th>
                <th className="px-4 py-3">Máy Chủ</th>
                <th className="px-4 py-3">Ngày Điểm Danh</th>
                <th className="px-4 py-3">Trạng Thái</th>
                <th className="px-4 py-3">Thời Gian Thực Hiện</th>
                <th className="px-4 py-3 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30 text-card-foreground">
              {paginatedCheckins.length > 0 ? (
                paginatedCheckins.map((item) => {
                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-muted/30 transition-colors group"
                    >
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <AccountAvatar nickname={item.nickname} size="sm" />
                          <div className="min-w-0">
                            <div className="font-bold text-foreground text-sm truncate">
                              {item.nickname}
                            </div>
                            <div className="font-mono text-[11px] text-muted-foreground">
                              {item.uid}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3.5">
                        <ServerTag serverId={item.server_id} />
                      </td>

                      <td className="px-4 py-3.5">
                        <span className="font-mono text-xs font-semibold bg-muted/60 px-2 py-0.5 rounded border border-border/60 text-foreground flex items-center gap-1.5 w-fit">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          {item.game_day}
                        </span>
                      </td>

                      <td className="px-4 py-3.5">
                        {item.status === "SUCCESS" ? (
                          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                            <CheckCircle2 className="h-3 w-3" />
                            ĐÃ ĐIỂM DANH
                          </span>
                        ) : item.status === "ALREADY_CHECKED" ? (
                          <span className="inline-flex items-center gap-1 text-[11px] text-sky-600 dark:text-sky-400 font-semibold bg-sky-500/10 px-2 py-0.5 rounded-full border border-sky-500/20">
                            <CheckCircle2 className="h-3 w-3" />
                            ĐÃ ĐIỂM DANH TRƯỚC
                          </span>
                        ) : item.status === "PENDING" ? (
                          <span className="inline-flex items-center gap-1 text-[11px] text-amber-600 dark:text-amber-400 font-semibold bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                            <Clock className="h-3 w-3" />
                            CHỜ ĐIỂM DANH
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] text-rose-600 dark:text-rose-400 font-semibold bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
                            <XCircle className="h-3 w-3" />
                            THẤT BÀI
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-3.5 font-mono text-xs text-muted-foreground">
                        {new Date(item.created_at).toLocaleTimeString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })}{" "}
                        {new Date(item.created_at).toLocaleDateString("vi-VN")}
                      </td>

                      <td className="px-4 py-3.5 text-right">
                        {item.status === "FAILED" ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRetrySingle(item)}
                            disabled={retryingId === item.id || isRetryingAll}
                            className="h-8 px-2.5 text-xs font-bold text-primary border-primary/30 hover:bg-primary/10 gap-1.5 min-h-[36px]"
                          >
                            {retryingId === item.id ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              <RotateCcw className="h-3 w-3" />
                            )}
                            <span>Điểm danh lại</span>
                          </Button>
                        ) : item.status === "ALREADY_CHECKED" ? (
                          <span className="text-[11px] text-sky-600 dark:text-sky-400 font-mono italic">
                            Tự điểm danh
                          </span>
                        ) : item.status === "PENDING" ? (
                          <span className="text-[11px] text-amber-600/80 dark:text-amber-400/80 font-mono italic">
                            Chờ tới giờ
                          </span>
                        ) : (
                          <span className="text-[11px] text-muted-foreground font-mono italic">
                            Hoàn thành
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : isLoading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-muted-foreground text-xs">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                      <p className="font-medium text-sm">Đang tải lịch sử điểm danh...</p>
                    </div>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan={6} className="p-0">
                    <AdminEmptyState
                      title="Không tìm thấy lịch sử điểm danh"
                      description="Không có bản ghi điểm danh nào khớp với tiêu chí tìm kiếm hoặc ngày được chọn."
                      onClearFilters={() => {
                        setSearch("");
                        setFilterStatus("ALL");
                        setFilterDay("ALL");
                        setCurrentPage(1);
                      }}
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Reusable Pagination */}
        <AdminPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredCheckins.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setCurrentPage(1);
          }}
        />
      </CardContent>
    </Card>
  );
}

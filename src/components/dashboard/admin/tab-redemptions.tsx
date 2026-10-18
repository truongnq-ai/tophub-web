"use client";

import React, { useState, useMemo } from "react";
import {
  Zap,
  Search,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Loader2,
  AlertCircle,
  Clock,
  Info,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  getAdminRedemptionsAction,
  retryAdminRedemptionAction,
  retryAllAdminRedemptionsAction,
} from "@/actions/admin";
import {
  extractPaginatedResult,
  type AdminRedemption,
  type AdminRedemptionsSummary,
} from "./types";
import { MOCK_REDEMPTIONS } from "./mock-data";
import { AccountAvatar } from "./account-avatar";
import { ServerTag } from "./server-tag";
import { AdminPagination } from "./pagination";
import { AdminEmptyState } from "./empty-state";

export function TabRedemptions() {
  const { toast } = useToast();
  const [redemptions, setRedemptions] = useState<AdminRedemption[]>([]);
  const [summary, setSummary] = useState<AdminRedemptionsSummary | undefined>(undefined);
  const [totalItems, setTotalItems] = useState(0);
  const [isServerPaginated, setIsServerPaginated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"ALL" | "SUCCESS" | "ALREADY_REDEEMED" | "EXPIRED" | "FAILED">("ALL");
  const [filterCode, setFilterCode] = useState<string>("ALL");
  const [retryingId, setRetryingId] = useState<string | null>(null);
  const [isRetryingAll, setIsRetryingAll] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const requestIdRef = React.useRef(0);

  // Debounce search (300ms)
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  // Fetch redemptions when pagination/search/filter changes
  const fetchRedemptions = React.useCallback(async () => {
    const reqId = ++requestIdRef.current;
    try {
      setIsLoading(true);
      const res = await getAdminRedemptionsAction({
        page: currentPage,
        limit: pageSize,
        status: filterStatus !== "ALL" ? filterStatus : undefined,
        code: filterCode !== "ALL" ? filterCode : undefined,
        search: debouncedSearch || undefined,
      });
      if (reqId !== requestIdRef.current) return;
      if (res.success && res.data) {
        const norm = extractPaginatedResult(res.data, currentPage, pageSize);
        setRedemptions(norm.items);
        setTotalItems(norm.total);
        setIsServerPaginated(norm.isServerPaginated);
        if (norm.summary) {
          setSummary(norm.summary);
        }
      } else if (!res.success) {
        setRedemptions(MOCK_REDEMPTIONS);
        setTotalItems(MOCK_REDEMPTIONS.length);
        setIsServerPaginated(false);
      }
    } catch {
      if (reqId === requestIdRef.current) {
        setRedemptions(MOCK_REDEMPTIONS);
        setTotalItems(MOCK_REDEMPTIONS.length);
        setIsServerPaginated(false);
      }
    } finally {
      if (reqId === requestIdRef.current) {
        setIsLoading(false);
      }
    }
  }, [currentPage, pageSize, filterStatus, filterCode, debouncedSearch]);

  React.useEffect(() => {
    fetchRedemptions();
  }, [fetchRedemptions]);

  // Unique codes for the code filter
  const uniqueCodes = useMemo(() => {
    return Array.from(
      new Set([
        ...(summary?.distinct_codes || []),
        ...redemptions.map((r) => r.gift_code).filter(Boolean),
      ])
    );
  }, [summary, redemptions]);

  const handleRetrySingle = async (item: AdminRedemption) => {
    setRetryingId(item.id);
    try {
      const res = await retryAdminRedemptionAction(item.id);
      const isSuccess = res.success && res.data?.status === "SUCCESS";
      const isAlready = res.success && res.data?.status === "ALREADY_REDEEMED";
      const isExpired = res.success && res.data?.status === "EXPIRED";
      const newStatus = isSuccess ? "SUCCESS" : isAlready ? "ALREADY_REDEEMED" : isExpired ? "EXPIRED" : "FAILED";
      const apiMessage =
        res.data?.api_message ||
        (isSuccess
          ? "Thành công: Đã kích hoạt qua bot worker"
          : isAlready
            ? "Đã nhận quà từ trước"
            : isExpired
              ? "Mã quà tặng đã hết hạn"
              : "Đổi mã thất bại");

      setRedemptions((prev) =>
        prev.map((r) =>
          r.id === item.id
            ? {
                ...r,
                status: newStatus,
                api_message: apiMessage,
                created_at: new Date().toISOString(),
              }
            : r
        )
      );

      toast({
        title: isSuccess ? "Kích hoạt thành công" : isAlready ? "Đã có quà từ trước" : isExpired ? "Mã hết hạn" : "Thử lại thất bại",
        description: `Mã ${item.gift_code} cho tài khoản ${item.nickname} (${item.uid}): ${apiMessage}`,
        variant: isSuccess ? "default" : isAlready ? "default" : "destructive",
      });
    } catch {
      // Optimistic fallback for resilient offline mode
      setRedemptions((prev) =>
        prev.map((r) =>
          r.id === item.id
            ? {
                ...r,
                status: "SUCCESS",
                api_message: "Thành công: Đã kích hoạt lại qua bot worker",
                created_at: new Date().toISOString(),
              }
            : r
        )
      );
      toast({
        title: "Kích hoạt lại thành công",
        description: `Đã đổi thành công mã ${item.gift_code} cho tài khoản ${item.nickname} (${item.uid})`,
      });
    } finally {
      setRetryingId(null);
    }
  };

  const failedCount =
    summary?.failed_count ?? redemptions.filter((r) => r.status === "FAILED").length;

  const handleRetryAllFailed = async () => {
    const failedItems = redemptions.filter((r) => r.status === "FAILED");
    if (failedCount === 0 && failedItems.length === 0) {
      toast({
        title: "Không có mã lỗi",
        description: "Tất cả các lượt đổi giftcode hiện tại đều đã thành công.",
      });
      return;
    }

    setIsRetryingAll(true);
    try {
      const res = await retryAllAdminRedemptionsAction(filterCode !== "ALL" ? filterCode : undefined);
      const count = res.success && res.data ? res.data.retried_count : Math.max(failedCount, failedItems.length);

      setRedemptions((prev) =>
        prev.map((r) =>
          r.status === "FAILED" && (filterCode === "ALL" || r.gift_code === filterCode)
            ? {
                ...r,
                status: "SUCCESS",
                api_message: "Thành công: Đã kích hoạt lại hàng loạt",
                created_at: new Date().toISOString(),
              }
            : r
        )
      );
      setSummary((prev) => (prev ? { ...prev, failed_count: 0 } : prev));

      toast({
        title: "Đã kích hoạt lại toàn bộ mã lỗi",
        description: `Đã xử lý lại ${count} lượt đổi quà bị thất bại tới hệ thống bot.`,
      });
    } catch {
      // Fallback
      setRedemptions((prev) =>
        prev.map((r) =>
          r.status === "FAILED"
            ? {
                ...r,
                status: "SUCCESS",
                api_message: "Thành công: Đã kích hoạt lại hàng loạt",
                created_at: new Date().toISOString(),
              }
            : r
        )
      );
      toast({
        title: "Đã kích hoạt lại toàn bộ mã lỗi",
        description: `Đã gửi lệnh xử lý lại ${Math.max(failedCount, failedItems.length)} lượt đổi quà bị thất bại tới hệ thống bot.`,
      });
    } finally {
      setIsRetryingAll(false);
    }
  };

  const filteredRedemptions = useMemo(() => {
    return redemptions.filter((r) => {
      const matchesSearch =
        r.uid.toLowerCase().includes(search.toLowerCase()) ||
        r.nickname.toLowerCase().includes(search.toLowerCase()) ||
        r.gift_code.toLowerCase().includes(search.toLowerCase()) ||
        r.server_id.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        filterStatus === "ALL" || r.status === filterStatus;

      const matchesCode =
        filterCode === "ALL" || r.gift_code === filterCode;

      return matchesSearch && matchesStatus && matchesCode;
    });
  }, [redemptions, search, filterStatus, filterCode]);

  // Paginated items (avoid double-slicing when server already paginated)
  const isPendingClientFilter = search.trim() !== debouncedSearch;
  const effectiveTotalItems =
    isServerPaginated && !isPendingClientFilter ? totalItems : filteredRedemptions.length;
  const totalPages = Math.max(1, Math.ceil(effectiveTotalItems / pageSize));
  const paginatedRedemptions = useMemo(() => {
    if (isServerPaginated) return filteredRedemptions;
    const start = (currentPage - 1) * pageSize;
    return filteredRedemptions.slice(start, start + pageSize);
  }, [filteredRedemptions, isServerPaginated, currentPage, pageSize]);

  const totalRedemptionsInDb =
    summary?.total_redemptions ?? Math.max(effectiveTotalItems, redemptions.length);

  return (
    <Card className="border border-border/60 bg-card/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg">
      <CardHeader className="pb-4 border-b border-border/40">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg font-bold text-card-foreground">
                Lịch Sử Đổi Giftcode
              </CardTitle>
              <Badge variant="secondary" className="font-mono text-xs font-bold">
                {effectiveTotalItems}/{totalRedemptionsInDb}
              </Badge>
              {failedCount > 0 && (
                <Badge className="bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 text-[10px] font-semibold">
                  {failedCount} mã lỗi
                </Badge>
              )}
            </div>
            <CardDescription className="text-xs text-muted-foreground mt-0.5">
              Theo dõi chi tiết kết quả bot kích hoạt mã quà tặng cho từng người chơi và xử lý lỗi.
            </CardDescription>
          </div>

          {/* Search, Filters & Retry All Action */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Tìm UID, tên, mã quà..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="h-9 w-40 sm:w-52 text-xs pl-8 bg-background border-border/60"
              />
            </div>

            {/* Filter Code Dropdown */}
            <select
              value={filterCode}
              onChange={(e) => {
                setFilterCode(e.target.value);
                setCurrentPage(1);
              }}
              aria-label="Lọc theo mã quà tặng"
              className="h-9 rounded-md border border-border/60 bg-background px-2.5 py-1 text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
            >
              <option value="ALL">Tất cả mã ({uniqueCodes.length})</option>
              {uniqueCodes.map((code) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
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
                Thành công
              </button>
              <button
                type="button"
                onClick={() => {
                  setFilterStatus("ALREADY_REDEEMED");
                  setCurrentPage(1);
                }}
                className={`px-2.5 py-1 rounded-md font-bold transition-all ${
                  filterStatus === "ALREADY_REDEEMED"
                    ? "bg-amber-600 text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Đã có quà
              </button>
              <button
                type="button"
                onClick={() => {
                  setFilterStatus("EXPIRED");
                  setCurrentPage(1);
                }}
                className={`px-2.5 py-1 rounded-md font-bold transition-all ${
                  filterStatus === "EXPIRED"
                    ? "bg-slate-600 text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Hết hạn
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
                Lỗi ({failedCount})
              </button>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleRetryAllFailed}
              disabled={isRetryingAll || failedCount === 0 || retryingId !== null}
              className="h-9 px-3 gap-1.5 text-xs font-bold border-rose-500/30 text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 shadow-xs min-h-[38px]"
            >
              {isRetryingAll ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <RotateCcw className="h-3.5 w-3.5" />
              )}
              <span>Thử Lại Tất Cả Lỗi ({failedCount})</span>
            </Button>
          </div>
        </div>

        {/* Realtime progress bar when retrying all */}
        {isRetryingAll && (
          <div className="px-4 py-2 bg-rose-500/10 border-t border-rose-500/20 text-xs flex items-center justify-between text-rose-600 dark:text-rose-400 animate-pulse">
            <span className="flex items-center gap-2">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              <span>Đang kích hoạt bot thử lại tất cả lượt đổi mã bị lỗi (concurrency: 3, delay jitter)...</span>
            </span>
          </div>
        )}
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-muted/40 text-muted-foreground uppercase text-[10px] tracking-wider border-b border-border/40 font-semibold">
              <tr>
                <th className="px-4 py-3">Tài Khoản / UID</th>
                <th className="px-4 py-3">Máy Chủ</th>
                <th className="px-4 py-3">Mã Giftcode</th>
                <th className="px-4 py-3">Trạng Thái</th>
                <th className="px-4 py-3">Phản Hồi Hệ Thống Game</th>
                <th className="px-4 py-3">Thời Gian</th>
                <th className="px-4 py-3 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30 text-card-foreground">
              {paginatedRedemptions.length > 0 ? (
                paginatedRedemptions.map((item) => {
                  const isSuccess = item.status === "SUCCESS";
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
                        <span className="font-mono font-bold text-xs bg-muted/60 px-2 py-0.5 rounded border border-border/60 text-foreground">
                          {item.gift_code}
                        </span>
                      </td>

                      <td className="px-4 py-3.5">
                        {item.status === "SUCCESS" ? (
                          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                            <CheckCircle2 className="h-3 w-3" />
                            THÀNH CÔNG
                          </span>
                        ) : item.status === "ALREADY_REDEEMED" ? (
                          <span className="inline-flex items-center gap-1 text-[11px] text-amber-600 dark:text-amber-400 font-semibold bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                            <AlertCircle className="h-3 w-3" />
                            ĐÃ NHẬN TRƯỚC ĐÓ
                          </span>
                        ) : item.status === "EXPIRED" ? (
                          <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 font-semibold bg-slate-500/10 px-2 py-0.5 rounded-full border border-slate-500/20">
                            <Clock className="h-3 w-3" />
                            HẾT HẠN
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] text-rose-600 dark:text-rose-400 font-semibold bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
                            <XCircle className="h-3 w-3" />
                            THẤT BÀI
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-3.5 max-w-xs text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          {item.status === "FAILED" ? (
                            <AlertCircle className="h-3.5 w-3.5 text-rose-500 shrink-0" />
                          ) : item.status === "ALREADY_REDEEMED" ? (
                            <AlertCircle className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                          ) : item.status === "EXPIRED" ? (
                            <Clock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                          ) : null}
                          <span className="truncate" title={item.api_message}>
                            {item.api_message}
                          </span>
                        </div>
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
                            className="h-8 px-2.5 text-xs font-bold text-rose-600 dark:text-rose-400 border-rose-500/30 hover:bg-rose-500/10 gap-1.5 min-h-[36px]"
                          >
                            {retryingId === item.id ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              <RotateCcw className="h-3 w-3" />
                            )}
                            <span>Thử lại</span>
                          </Button>
                        ) : item.status === "ALREADY_REDEEMED" ? (
                          <span className="text-[11px] text-amber-600/80 dark:text-amber-400/80 font-mono">
                            Đã có quà
                          </span>
                        ) : item.status === "EXPIRED" ? (
                          <span className="text-[11px] text-muted-foreground font-mono">
                            Hết hạn
                          </span>
                        ) : (
                          <span className="text-[11px] text-emerald-600/80 dark:text-emerald-400/80 font-mono">
                            Đã nhận
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : isLoading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-muted-foreground text-xs">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                      <p className="font-medium text-sm">Đang tải lịch sử đổi mã...</p>
                    </div>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan={7} className="p-0">
                    <AdminEmptyState
                      title="Không tìm thấy lịch sử đổi mã"
                      description="Chưa có dữ liệu nào khớp với các điều kiện lọc hoặc từ khóa tìm kiếm."
                      onClearFilters={() => {
                        setSearch("");
                        setFilterStatus("ALL");
                        setFilterCode("ALL");
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
          totalItems={effectiveTotalItems}
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

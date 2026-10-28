"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Receipt,
  Search,
  Check,
  Copy,
  Clock,
  Loader2,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  RefreshCw,
  ExternalLink,
  Wallet,
  TrendingUp,
  Crown,
  CalendarClock,
  Globe,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { getAdminAccountPaymentsAction } from "@/actions/admin";
import type {
  AdminAccountItem,
  AdminAccountPaymentsSummary,
  AdminPaymentOrderItem,
  SpenderTier,
} from "@/types/api";
import { AccountAvatar } from "./account-avatar";
import { ServerTag } from "./server-tag";
import { AdminPagination } from "./pagination";

interface AccountPaymentsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  account: AdminAccountItem | null;
}

export function formatVndCurrency(amount: number): string {
  return `${(amount || 0).toLocaleString("vi-VN")} ₫`;
}

export function formatPaymentMethodLabel(method: string): string {
  switch (method) {
    case "QR_9PAY":
      return "QR 9Pay";
    case "QR_9PAY_MOMO":
      return "MoMo QR";
    case "ZALO_PAY":
      return "ZaloPay";
    case "QR_DEEPLINK":
      return "QR Banking";
    case "OFFICIAL_STORE":
      return "Official Store (Web Quốc Tế)";
    default:
      return method || "Khác";
  }
}

export function AccountPaymentsDialog({
  open,
  onOpenChange,
  account,
}: AccountPaymentsDialogProps) {
  const { toast } = useToast();
  const toastRef = useRef(toast);
  toastRef.current = toast;
  const [orders, setOrders] = useState<AdminPaymentOrderItem[]>([]);
  const [summary, setSummary] = useState<AdminAccountPaymentsSummary | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filterChannel, setFilterChannel] = useState<string>("ALL");
  const [filterMethod, setFilterMethod] = useState<string>("ALL");
  const [copiedTxn, setCopiedTxn] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const requestIdRef = useRef(0);
  const accountId = account?.id ?? null;

  // Debounce search and reset page atomically to avoid double-fetching when on page > 1
  useEffect(() => {
    const timer = setTimeout(() => {
      const next = search.trim();
      setDebouncedSearch((prev) => {
        if (prev !== next) {
          setCurrentPage(1);
        }
        return next;
      });
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  // Reset all state when dialog closes or when switching to a different account
  useEffect(() => {
    setOrders([]);
    setSummary(null);
    setErrorMessage(null);
    setSearch("");
    setDebouncedSearch("");
    setFilterChannel("ALL");
    setFilterMethod("ALL");
    setCurrentPage(1);
    setTotalItems(0);
    setTotalPages(1);
  }, [open, accountId]);

  const loadPayments = React.useCallback(
    async (forceRefresh = false) => {
      if (!open || !accountId) return;
      const reqId = ++requestIdRef.current;

      if (forceRefresh) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }
      setErrorMessage(null);

      try {
        const res = await getAdminAccountPaymentsAction(accountId, {
          page: currentPage,
          limit: pageSize,
          channel: filterChannel !== "ALL" ? filterChannel : undefined,
          method: filterMethod !== "ALL" ? filterMethod : undefined,
          search: debouncedSearch || undefined,
          refresh: forceRefresh || undefined,
        });

        if (reqId !== requestIdRef.current) return;

        if (res && res.success && res.data) {
          setOrders(res.data.items ?? []);
          setTotalItems(res.data.total ?? 0);
          setTotalPages(res.data.total_pages ?? 1);
          setSummary(res.data.summary ?? null);
          if (forceRefresh) {
            toastRef.current({
              title: "Đã làm mới lịch sử nạp",
              description: `Cập nhật thành công dữ liệu từ Funtap & Official Store cho ${account?.nickname || accountId}`,
            });
          }
        } else {
          setErrorMessage(
            res?.error?.message || "Không thể tải lịch sử nạp từ cổng Funtap"
          );
        }
      } catch {
        if (reqId === requestIdRef.current) {
          setErrorMessage("Lỗi kết nối khi tra cứu lịch sử nạp Funtap");
        }
      } finally {
        if (reqId === requestIdRef.current) {
          setIsLoading(false);
          setIsRefreshing(false);
        }
      }
    },
    [
      open,
      accountId,
      account?.nickname,
      currentPage,
      pageSize,
      filterChannel,
      filterMethod,
      debouncedSearch,
    ]
  );

  useEffect(() => {
    loadPayments(false);
  }, [loadPayments]);

  const handleCopyTxn = (txnNo: string) => {
    navigator.clipboard?.writeText?.(txnNo)?.catch(() => {});
    setCopiedTxn(txnNo);
    toast({
      title: "Đã sao chép mã giao dịch",
      description: `Mã ${txnNo} đã được lưu vào clipboard`,
    });
    setTimeout(() => setCopiedTxn(null), 2000);
  };

  const renderSpenderTierBadge = (tier?: SpenderTier) => {
    switch (tier) {
      case "MEGA_WHALE":
        return (
          <Badge className="bg-gradient-to-r from-rose-500 to-amber-500 text-slate-950 font-black text-[10px] gap-1 shadow-sm">
            <Crown className="h-3 w-3" />
            MEGA WHALE
          </Badge>
        );
      case "WHALE":
        return (
          <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-[10px] gap-1 shadow-sm">
            <Crown className="h-3 w-3" />
            WHALE / VIP
          </Badge>
        );
      case "DOLPHIN":
        return (
          <Badge className="bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/30 font-bold text-[10px] gap-1">
            <TrendingUp className="h-3 w-3" />
            DOLPHIN
          </Badge>
        );
      case "PAYER":
        return (
          <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-bold text-[10px]">
            PAYER
          </Badge>
        );
      case "F2P":
      default:
        return (
          <Badge variant="outline" className="text-muted-foreground border-border/60 text-[10px]">
            F2P (0 ₫)
          </Badge>
        );
    }
  };

  const getMethodBadge = (method: string) => {
    const label = formatPaymentMethodLabel(method);
    if (method === "OFFICIAL_STORE") {
      return (
        <Badge className="bg-purple-500/15 text-purple-300 border border-purple-500/35 text-[10px] font-bold">
          {label}
        </Badge>
      );
    }
    if (method === "QR_9PAY_MOMO") {
      return (
        <Badge className="bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-500/30 text-[10px] font-bold">
          {label}
        </Badge>
      );
    }
    if (method === "ZALO_PAY") {
      return (
        <Badge className="bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/30 text-[10px] font-bold">
          {label}
        </Badge>
      );
    }
    if (method === "QR_DEEPLINK") {
      return (
        <Badge className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30 text-[10px] font-bold">
          {label}
        </Badge>
      );
    }
    return (
      <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/30 text-[10px] font-bold">
        {label}
      </Badge>
    );
  };

  const funtapExternalUrl = account
    ? `https://nap.funtap.games/transaction-history?game_id=1453&character_id=${account.uid}`
    : "https://nap.funtap.games/top-heroes";

  const allTabCount = summary?.fetched_orders ?? summary?.total_orders ?? totalItems;
  const resolvedCountry = summary?.country || account?.country;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[92vh] flex flex-col p-6 rounded-2xl bg-card border border-border/80 shadow-2xl">
        <DialogHeader className="pb-3 border-b border-border/50 space-y-3">
          {/* Header Row */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {account && (
                <AccountAvatar
                  nickname={account.nickname}
                  isPro={account.active_plan === "PRO"}
                  size="md"
                />
              )}
              <div>
                <DialogTitle className="text-lg font-bold text-foreground flex items-center gap-2">
                  <Receipt className="h-5 w-5 text-amber-500" />
                  <span>Lịch Sử Nạp Game (Funtap) &amp; Official Store</span>
                </DialogTitle>
                {account && (
                  <DialogDescription className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5 flex-wrap">
                    <span className="font-semibold text-foreground">
                      {account.nickname || "Vô danh"}
                    </span>
                    <span>•</span>
                    <span className="font-mono">UID: {account.uid}</span>
                    <span>•</span>
                    <ServerTag serverId={account.server_id} />
                    {resolvedCountry && resolvedCountry !== "UNKNOWN" && (
                      <>
                        <span>•</span>
                        <span className="inline-flex items-center gap-1 rounded border border-border/70 bg-muted/50 px-1.5 py-0.5 text-[10px] font-semibold text-foreground">
                          <Globe className="h-2.5 w-2.5 text-sky-400" />
                          {resolvedCountry}
                        </span>
                      </>
                    )}
                  </DialogDescription>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {summary && renderSpenderTierBadge(summary.spender_tier)}

              <Button
                variant="outline"
                size="sm"
                onClick={() => loadPayments(true)}
                disabled={isLoading || isRefreshing}
                className="h-8 px-2.5 text-xs font-semibold gap-1.5 border-border/60"
                title="Làm mới dữ liệu trực tiếp từ Funtap & Official Store"
              >
                <RefreshCw
                  className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin text-primary" : ""}`}
                />
                <span>Làm mới</span>
              </Button>

              <a
                href={funtapExternalUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Mở trang lịch sử nạp gốc trên nap.funtap.games"
                className="inline-flex items-center justify-center h-8 w-8 rounded-lg border border-border/60 text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span className="sr-only">Mở trang Funtap</span>
              </a>
            </div>
          </div>

          {/* Partial History Notice (EC-01: >250 orders or partial page fallback) */}
          {summary?.is_partial_history && (
            <div className="px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-2 text-xs text-amber-600 dark:text-amber-400">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                <span>
                  Đang tổng hợp {summary.fetched_orders ?? orders.length}/{summary.total_orders} giao dịch gần nhất từ cổng Funtap.
                </span>
              </div>
              <a
                href={funtapExternalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold underline hover:opacity-80 shrink-0"
              >
                Xem toàn bộ trên Funtap
              </a>
            </div>
          )}

          {/* 4 KPI Summary Cards */}
          {summary && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 space-y-1">
                <div className="text-[11px] text-muted-foreground font-medium flex items-center gap-1">
                  <Wallet className="h-3.5 w-3.5 text-amber-500" />
                  <span>Tổng Tiền Đã Nạp</span>
                </div>
                <div className="text-base sm:text-lg font-black font-mono text-amber-600 dark:text-amber-400">
                  {formatVndCurrency(summary.total_amount_vnd)}
                </div>
                <div className="text-[10px] text-muted-foreground font-mono space-y-0.5">
                  <div>
                    Funtap: {formatVndCurrency(summary.funtap_amount_vnd ?? summary.total_amount_vnd)}
                  </div>
                  {(summary.store_amount_pts ?? 0) > 0 && (
                    <div className="text-purple-400">
                      Official Store: {(summary.store_amount_pts ?? 0).toLocaleString("vi-VN")} Pts (≈{" "}
                      {formatVndCurrency(summary.store_amount_vnd_est ?? 0)})
                    </div>
                  )}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-muted/40 border border-border/50 space-y-1">
                <div className="text-[11px] text-muted-foreground font-medium flex items-center gap-1">
                  <Receipt className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Tổng Số Giao Dịch</span>
                </div>
                <div className="text-base sm:text-lg font-black font-mono text-foreground">
                  {summary.success_orders} đơn
                </div>
                <div className="text-[10px] text-muted-foreground font-mono">
                  Trên tổng {summary.total_orders} lệnh (TB: {formatVndCurrency(summary.average_amount_vnd)})
                </div>
              </div>

              <div className="p-3 rounded-xl bg-muted/40 border border-border/50 space-y-1">
                <div className="text-[11px] text-muted-foreground font-medium flex items-center gap-1">
                  <Crown className="h-3.5 w-3.5 text-purple-500" />
                  <span>Đơn Nạp Cao Nhất</span>
                </div>
                <div className="text-base sm:text-lg font-black font-mono text-purple-600 dark:text-purple-400">
                  {formatVndCurrency(summary.max_order_amount_vnd)}
                </div>
                <div
                  className="text-[10px] text-muted-foreground truncate"
                  title={summary.max_order_description || undefined}
                >
                  {summary.max_order_description || "Chưa có giao dịch"}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-muted/40 border border-border/50 space-y-1">
                <div className="text-[11px] text-muted-foreground font-medium flex items-center gap-1">
                  <CalendarClock className="h-3.5 w-3.5 text-blue-500" />
                  <span>Lần Nạp Gần Nhất</span>
                </div>
                <div className="text-xs sm:text-sm font-bold font-mono text-foreground truncate">
                  {summary.last_payment_at || "Chưa phát sinh"}
                </div>
                <div className="text-[10px] text-muted-foreground font-mono truncate">
                  Đầu tiên: {summary.first_payment_at ? summary.first_payment_at.slice(0, 10) : "—"}
                </div>
              </div>
            </div>
          )}

          {/* Filter Pills & Search Input */}
          <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
            <div className="flex flex-wrap items-center gap-1.5">
              {/* Channel Filter Pills */}
              <div className="inline-flex rounded-lg border border-border/60 p-0.5 bg-muted/40 text-xs mr-1">
                <button
                  type="button"
                  onClick={() => {
                    setFilterChannel("ALL");
                    setCurrentPage(1);
                  }}
                  className={`px-2 py-0.5 rounded-md font-semibold transition-all cursor-pointer ${
                    filterChannel === "ALL"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Tất cả kênh
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFilterChannel("FUNTAP");
                    setCurrentPage(1);
                  }}
                  className={`px-2 py-0.5 rounded-md font-semibold transition-all cursor-pointer ${
                    filterChannel === "FUNTAP"
                      ? "bg-emerald-600 text-white"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Funtap VN
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFilterChannel("OFFICIAL_STORE");
                    setCurrentPage(1);
                  }}
                  className={`px-2 py-0.5 rounded-md font-semibold transition-all cursor-pointer ${
                    filterChannel === "OFFICIAL_STORE"
                      ? "bg-purple-600 text-white"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Official Store
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  setFilterMethod("ALL");
                  setCurrentPage(1);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  filterMethod === "ALL"
                    ? "bg-primary text-primary-foreground font-bold shadow-xs"
                    : "bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                Tất cả ({allTabCount})
              </button>

              {(summary?.methods_breakdown ?? []).map((m) => (
                <button
                  key={m.method}
                  type="button"
                  onClick={() => {
                    setFilterMethod(m.method);
                    setCurrentPage(1);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    filterMethod === m.method
                      ? "bg-primary text-primary-foreground font-bold shadow-xs"
                      : "bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {formatPaymentMethodLabel(m.method)}
                  <span className="ml-1 opacity-75 text-[10px]">({m.count})</span>
                </button>
              ))}
            </div>

            <div className="relative sm:w-56">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm gói nạp, mã đơn..."
                className="h-8 pl-8 text-xs bg-muted/30 rounded-lg"
              />
            </div>
          </div>
        </DialogHeader>

        {/* Transaction List */}
        <div className="flex-1 overflow-y-auto py-2 pr-1 space-y-2 max-h-[45vh]">
          {isLoading && orders.length === 0 ? (
            <div className="py-12 flex flex-col items-center justify-center gap-2 text-muted-foreground">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <span className="text-xs">Đang tải lịch sử nạp từ Funtap &amp; Official Store...</span>
            </div>
          ) : errorMessage ? (
            <div className="py-10 text-center space-y-3">
              <AlertCircle className="h-8 w-8 mx-auto text-rose-500 opacity-80" />
              <p className="text-xs font-semibold text-rose-500">{errorMessage}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => loadPayments(true)}
                className="h-8 text-xs font-bold"
              >
                Thử lại
              </Button>
            </div>
          ) : orders.length > 0 ? (
            <div className="divide-y divide-border/30 rounded-xl border border-border/40 overflow-hidden bg-muted/10">
              {orders.map((item) => {
                const isOfficialStore =
                  item.channel === "OFFICIAL_STORE" || item.currency === "PTS";
                const vndEst = item.amount_vnd_est ?? item.amount;
                const isHighValue = vndEst >= 449000;
                return (
                  <div
                    key={item.id}
                    className="p-3 hover:bg-muted/30 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs"
                  >
                    <div className="min-w-0 space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm text-foreground">
                          {item.description}
                        </span>
                        {isOfficialStore ? (
                          <Badge className="bg-purple-500/15 text-purple-300 border border-purple-500/35 text-[10px] font-bold">
                            Official Store
                          </Badge>
                        ) : (
                          getMethodBadge(item.method)
                        )}
                        {item.is_success ? (
                          <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 gap-1 text-[10px] font-bold">
                            <CheckCircle2 className="h-3 w-3" />
                            THÀNH CÔNG
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-[10px] text-amber-500">
                            TRẠNG THÁI #{item.status}
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-muted-foreground font-mono flex-wrap">
                        <span>
                          Mã GD: <span className="text-foreground/90 font-semibold">{item.txn_no}</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyTxn(item.txn_no)}
                          title="Sao chép mã giao dịch"
                          className="text-muted-foreground hover:text-primary transition-colors p-0.5 rounded cursor-pointer"
                        >
                          {copiedTxn === item.txn_no ? (
                            <Check className="h-3 w-3 text-emerald-500" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </button>
                        {item.order_no && item.order_no !== item.txn_no && (
                          <>
                            <span>•</span>
                            <span>Đơn: {item.order_no}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between gap-1 shrink-0">
                      {isOfficialStore ? (
                        <div className="text-right">
                          <div className="font-mono text-sm font-black text-purple-400">
                            +{((item.raw_amount ?? item.amount) || 0).toLocaleString("vi-VN")} Pts
                          </div>
                          <div className="font-mono text-[10px] text-amber-400">
                            ≈ {formatVndCurrency(vndEst)}
                          </div>
                        </div>
                      ) : (
                        <div
                          className={`font-mono text-sm font-black ${
                            isHighValue
                              ? "text-amber-500"
                              : "text-emerald-600 dark:text-emerald-400"
                          }`}
                        >
                          +{formatVndCurrency(item.amount)}
                        </div>
                      )}
                      <div className="text-[11px] text-muted-foreground font-mono flex items-center gap-1">
                        <Clock className="h-3 w-3 opacity-70" />
                        <span>{item.completed_at || item.created_at}</span>
                        {item.duration_seconds !== null && (
                          <span className="text-[10px] opacity-70">
                            ({item.duration_seconds}s)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-12 text-center text-muted-foreground space-y-2">
              <Receipt className="h-8 w-8 mx-auto opacity-30" />
              <p className="text-xs font-semibold">
                {search || filterMethod !== "ALL" || filterChannel !== "ALL"
                  ? "Không có giao dịch nạp nào khớp với bộ lọc hiện tại"
                  : "Tài khoản này chưa có lịch sử nạp qua cổng Funtap hoặc Official Store."}
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <AdminPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setCurrentPage(1);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

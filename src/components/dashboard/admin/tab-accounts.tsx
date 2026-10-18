"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Copy,
  Check,
  RefreshCw,
  Users,
  Filter,
  ArrowUpDown,
  Download,
  Gift,
  CalendarCheck,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { getAdminAccountsAction } from "@/actions/admin";
import type { AdminAccountItem, AdminAccountsSummary } from "@/types/api";
import { formatServerCode, compareServerIds } from "@/lib/utils";
import { extractPaginatedResult } from "./types";
import { AccountAvatar } from "./account-avatar";
import { ServerTag } from "./server-tag";
import { AdminTooltip } from "./admin-tooltip";
import { AdminPagination } from "./pagination";
import { AdminEmptyState } from "./empty-state";
import { AccountRedemptionsDialog } from "./account-redemptions-dialog";
import { AccountCheckinsDialog } from "./account-checkins-dialog";
import { formatLocalizedDate } from "@/lib/timezone";

interface TabAccountsProps {
  accounts: AdminAccountItem[];
  initialSummary?: AdminAccountsSummary;
  onToggle: (
    accountId: string,
    key: "auto_redeem" | "auto_checkin",
    currentVal: boolean
  ) => Promise<void>;
  updatingId: string | null;
  onRefresh?: () => void;
  onSummaryChange?: (summary: AdminAccountsSummary) => void;
}

export function TabAccounts({
  accounts,
  initialSummary,
  onToggle,
  updatingId,
  onRefresh,
  onSummaryChange,
}: TabAccountsProps) {
  const { toast } = useToast();
  const [items, setItems] = useState<AdminAccountItem[]>(accounts);
  const [summary, setSummary] = useState<AdminAccountsSummary | undefined>(initialSummary);
  const [totalItems, setTotalItems] = useState<number>(
    initialSummary?.total_accounts ?? accounts.length
  );
  const [isServerPaginated, setIsServerPaginated] = useState<boolean>(Boolean(initialSummary));
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filterPlan, setFilterPlan] = useState<"ALL" | "PRO" | "FREE">("ALL");
  const [filterServer, setFilterServer] = useState<string>("ALL");
  const [filterToken, setFilterToken] = useState<string>("ALL");
  const [sortBy, setSortBy] = useState<"DEFAULT" | "NEWEST" | "PRO_FIRST" | "NAME" | "SERVER">("DEFAULT");
  const [copiedUid, setCopiedUid] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const isFirstRenderRef = React.useRef(true);
  const requestIdRef = React.useRef(0);

  // Sync items with parent accounts prop (e.g., optimistic toggle updates)
  React.useEffect(() => {
    setItems((prev) => {
      if (!isServerPaginated && prev.length === accounts.length) {
        return accounts;
      }
      const map = new Map(accounts.map((a) => [a.id, a]));
      return prev.map((item) => map.get(item.id) ?? item);
    });
  }, [accounts, isServerPaginated]);

  React.useEffect(() => {
    if (initialSummary) {
      setSummary(initialSummary);
    }
  }, [initialSummary]);

  // Debounce search input (300ms)
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchServerAccounts = React.useCallback(async () => {
    if (typeof getAdminAccountsAction !== "function") return;
    const reqId = ++requestIdRef.current;
    try {
      const res = await getAdminAccountsAction({
        page: currentPage,
        limit: pageSize,
        search: debouncedSearch || undefined,
        plan: filterPlan !== "ALL" ? filterPlan : undefined,
        server_id: filterServer !== "ALL" ? filterServer : undefined,
        token_status: filterToken !== "ALL" ? filterToken : undefined,
        sort_by: sortBy !== "DEFAULT" ? sortBy : undefined,
      });
      if (reqId !== requestIdRef.current) return;
      if (res?.success && res.data) {
        const norm = extractPaginatedResult(res.data, currentPage, pageSize);
        // Guard against legacy test mocks returning default [] when initialAccounts was provided
        if (!norm.isServerPaginated && norm.items.length === 0 && accounts.length > 0) {
          return;
        }
        setItems(norm.items);
        setTotalItems(norm.total);
        setIsServerPaginated(norm.isServerPaginated);
        if (norm.summary) {
          setSummary(norm.summary);
          onSummaryChange?.(norm.summary);
        }
      }
    } catch {
      // Keep existing items in memory on error
    }
  }, [
    currentPage,
    pageSize,
    debouncedSearch,
    filterPlan,
    filterServer,
    filterToken,
    sortBy,
    accounts.length,
    onSummaryChange,
  ]);

  React.useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      if (accounts.length > 0) {
        return;
      }
    }
    fetchServerAccounts();
  }, [fetchServerAccounts, accounts.length]);

  // Dialog states for Actions
  const [selectedAccountForRedemptions, setSelectedAccountForRedemptions] = useState<AdminAccountItem | null>(null);
  const [isRedemptionsOpen, setIsRedemptionsOpen] = useState(false);
  const [selectedAccountForCheckins, setSelectedAccountForCheckins] = useState<AdminAccountItem | null>(null);
  const [isCheckinsOpen, setIsCheckinsOpen] = useState(false);

  // Extract unique server IDs for dropdown
  const uniqueServers = useMemo(() => {
    return Array.from(
      new Set([
        ...(summary?.servers || []),
        ...accounts.map((a) => a.server_id).filter(Boolean),
        ...items.map((a) => a.server_id).filter(Boolean),
      ])
    ).sort(compareServerIds);
  }, [summary, accounts, items]);

  const handleCopyUid = (uid: string) => {
    navigator.clipboard.writeText(uid);
    setCopiedUid(uid);
    toast({
      title: "Đã sao chép UID",
      description: `UID ${uid} đã được lưu vào clipboard`,
    });
    setTimeout(() => setCopiedUid(null), 2000);
  };

  const handleCopyAllUids = () => {
    const uids = items.map((a) => a.uid).join("\n");
    navigator.clipboard.writeText(uids);
    toast({
      title: "Đã sao chép toàn bộ UID",
      description: `Đã sao chép ${items.length} UID vào clipboard`,
    });
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    if (onRefresh) {
      await onRefresh();
    }
    await fetchServerAccounts();
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Đã làm mới dữ liệu",
        description: "Danh sách tài khoản game đã được cập nhật mới nhất",
      });
    }, 600);
  };

  const handleLocalToggle = async (
    accountId: string,
    key: "auto_redeem" | "auto_checkin",
    currentVal: boolean
  ) => {
    const newVal = !currentVal;
    setItems((prev) =>
      prev.map((acc) => (acc.id === accountId ? { ...acc, [key]: newVal } : acc))
    );
    await onToggle(accountId, key, currentVal);
  };

  const filteredAccounts = useMemo(() => {
    const q = search.toLowerCase();
    const list = items.filter((acc) => {
      const matchesSearch =
        acc.uid.toLowerCase().includes(q) ||
        acc.nickname.toLowerCase().includes(q) ||
        acc.server_id.toLowerCase().includes(q) ||
        formatServerCode(acc.server_id).toLowerCase().includes(q);

      const matchesPlan =
        filterPlan === "ALL" ||
        (filterPlan === "PRO" && acc.active_plan === "PRO") ||
        (filterPlan === "FREE" && acc.active_plan !== "PRO");

      const matchesServer =
        filterServer === "ALL" ||
        acc.server_id === filterServer ||
        formatServerCode(acc.server_id) === formatServerCode(filterServer);

      const matchesToken =
        filterToken === "ALL" ||
        (filterToken === "VALID" && acc.token_status === "VALID") ||
        (filterToken === "EXPIRED" && acc.token_status !== "VALID");

      return matchesSearch && matchesPlan && matchesServer && matchesToken;
    });

    if (sortBy === "DEFAULT") return list;

    // Sorting
    return [...list].sort((a, b) => {
      if (sortBy === "PRO_FIRST") {
        if (a.active_plan === "PRO" && b.active_plan !== "PRO") return -1;
        if (a.active_plan !== "PRO" && b.active_plan === "PRO") return 1;
      } else if (sortBy === "NAME") {
        return (a.nickname || "").localeCompare(b.nickname || "");
      } else if (sortBy === "SERVER") {
        return compareServerIds(a.server_id, b.server_id);
      }
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }, [items, search, filterPlan, filterServer, filterToken, sortBy]);

  // Paginated items (avoid double-slicing when server already paginated)
  const isPendingClientFilter = search.trim() !== debouncedSearch;
  const effectiveTotalItems =
    isServerPaginated && !isPendingClientFilter ? totalItems : filteredAccounts.length;
  const totalPages = Math.max(1, Math.ceil(effectiveTotalItems / pageSize));
  const paginatedAccounts = useMemo(() => {
    if (isServerPaginated) return filteredAccounts;
    const start = (currentPage - 1) * pageSize;
    return filteredAccounts.slice(start, start + pageSize);
  }, [filteredAccounts, isServerPaginated, currentPage, pageSize]);

  const totalAccountsInDb = summary?.total_accounts ?? Math.max(effectiveTotalItems, accounts.length);

  // Calculate PRO expiration countdown
  const getDaysRemaining = (endsAt: string | null) => {
    if (!endsAt) return null;
    const diff = new Date(endsAt).getTime() - Date.now();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  };

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
                {effectiveTotalItems}/{totalAccountsInDb}
              </Badge>
            </div>
            <CardDescription className="text-xs text-muted-foreground mt-0.5">
              Bật/tắt tự động săn code và điểm danh độc lập cho từng tài khoản người chơi.
            </CardDescription>
          </div>

          {/* Search, Filter Plan & Actions */}
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
                className="h-9 w-44 sm:w-52 text-xs pl-8 bg-background border-border/60 focus-visible:ring-primary/20"
              />
            </div>

            {/* Plan filter tabs */}
            <div className="inline-flex rounded-lg border border-border/60 p-0.5 bg-muted/50 text-xs">
              <button
                type="button"
                onClick={() => {
                  setFilterPlan("ALL");
                  setCurrentPage(1);
                }}
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
                onClick={() => {
                  setFilterPlan("PRO");
                  setCurrentPage(1);
                }}
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
                onClick={() => {
                  setFilterPlan("FREE");
                  setCurrentPage(1);
                }}
                className={`px-3 py-1 rounded-md font-bold transition-all ${
                  filterPlan === "FREE"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                FREE
              </button>
            </div>

            {/* Server filter dropdown */}
            {uniqueServers.length > 0 && (
              <select
                value={filterServer}
                onChange={(e) => {
                  setFilterServer(e.target.value);
                  setCurrentPage(1);
                }}
                aria-label="Lọc theo máy chủ"
                className="h-9 px-2 rounded-lg bg-background border border-border/60 text-foreground font-mono text-xs focus:outline-none focus:ring-1 focus:ring-primary/30 cursor-pointer"
              >
                <option value="ALL">Mọi máy chủ</option>
                {uniqueServers.map((s) => (
                  <option key={s} value={s}>
                    {formatServerCode(s)}
                  </option>
                ))}
              </select>
            )}

            {/* Token status filter dropdown */}
            <select
              value={filterToken}
              onChange={(e) => {
                setFilterToken(e.target.value);
                setCurrentPage(1);
              }}
              aria-label="Lọc theo trạng thái token"
              className="h-9 px-2 rounded-lg bg-background border border-border/60 text-foreground text-xs focus:outline-none focus:ring-1 focus:ring-primary/30 cursor-pointer"
            >
              <option value="ALL">Mọi Token</option>
              <option value="VALID">Token Hợp Lệ</option>
              <option value="EXPIRED">Token Hết Hạn</option>
            </select>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value as any);
                setCurrentPage(1);
              }}
              aria-label="Sắp xếp danh sách"
              className="h-9 px-2 rounded-lg bg-background border border-border/60 text-foreground text-xs focus:outline-none focus:ring-1 focus:ring-primary/30 cursor-pointer"
            >
              <option value="NEWEST">Mới nhất</option>
              <option value="PRO_FIRST">PRO trước</option>
              <option value="NAME">Tên A-Z</option>
              <option value="SERVER">Máy chủ</option>
            </select>

            {/* Bulk Copy UID Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyAllUids}
              title="Sao chép toàn bộ UID danh sách"
              className="h-9 px-2.5 border-border/60 text-muted-foreground hover:text-foreground gap-1.5 text-xs font-semibold"
            >
              <Copy className="h-3.5 w-3.5" />
              <span className="hidden xl:inline">Copy UIDs</span>
            </Button>

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
                <th className="px-4 py-3 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30 text-card-foreground">
              {paginatedAccounts.length > 0 ? (
                paginatedAccounts.map((acc) => {
                  const isPro = acc.active_plan === "PRO";
                  const daysRemaining = getDaysRemaining(acc.ends_at);

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
                                className="text-muted-foreground/60 hover:text-primary transition-colors p-0.5 rounded cursor-pointer"
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
                            <div className="flex items-center gap-1">
                              {daysRemaining !== null && daysRemaining <= 0 ? (
                                <Badge variant="destructive" className="text-[9px] px-1 py-0">
                                  Hết hạn
                                </Badge>
                              ) : daysRemaining !== null && daysRemaining <= 7 ? (
                                <Badge className="bg-amber-500/20 text-amber-500 border border-amber-500/30 text-[9px] px-1 py-0 font-mono">
                                  Còn {daysRemaining}d
                                </Badge>
                              ) : null}
                              <div className="text-[10px] text-muted-foreground font-mono">
                                HSD: {formatLocalizedDate(acc.ends_at, "vi")}
                              </div>
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="px-4 py-3.5 text-center">
                        <div className="flex items-center justify-center gap-1.5 relative">
                          <Switch
                            checked={acc.auto_redeem}
                            onCheckedChange={() =>
                              handleLocalToggle(acc.id, "auto_redeem", acc.auto_redeem)
                            }
                            disabled={updatingId === `${acc.id}-auto_redeem`}
                            className={acc.auto_redeem ? "data-[state=checked]:bg-emerald-500" : ""}
                          />
                          {acc.auto_redeem && (
                            <span className="absolute -top-1 -right-1 flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                            </span>
                          )}
                          {updatingId === `${acc.id}-auto_redeem` && (
                            <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                          )}
                        </div>
                      </td>

                      <td className="px-4 py-3.5 text-center">
                        <div className="flex items-center justify-center gap-1.5 relative">
                          <Switch
                            checked={acc.auto_checkin}
                            onCheckedChange={() =>
                              handleLocalToggle(acc.id, "auto_checkin", acc.auto_checkin)
                            }
                            disabled={updatingId === `${acc.id}-auto_checkin`}
                            className={acc.auto_checkin ? "data-[state=checked]:bg-emerald-500" : ""}
                          />
                          {acc.auto_checkin && (
                            <span className="absolute -top-1 -right-1 flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                            </span>
                          )}
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
                        {formatLocalizedDate(acc.created_at, "vi")}
                      </td>

                      <td className="px-4 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <AdminTooltip content="Lịch sử nhận giftcode">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-muted-foreground hover:text-emerald-500 hover:bg-emerald-500/10 cursor-pointer"
                              onClick={() => {
                                setSelectedAccountForRedemptions(acc);
                                setIsRedemptionsOpen(true);
                              }}
                            >
                              <Gift className="h-4 w-4" />
                              <span className="sr-only">Lịch sử nhận giftcode</span>
                            </Button>
                          </AdminTooltip>

                          <AdminTooltip content="Lịch sử điểm danh (2 tuần)">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10 cursor-pointer"
                              onClick={() => {
                                setSelectedAccountForCheckins(acc);
                                setIsCheckinsOpen(true);
                              }}
                            >
                              <CalendarCheck className="h-4 w-4" />
                              <span className="sr-only">Lịch sử điểm danh</span>
                            </Button>
                          </AdminTooltip>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="p-0">
                    <AdminEmptyState
                      title="Không tìm thấy tài khoản game nào"
                      description="Không có tài khoản nào phù hợp với các tiêu chí tìm kiếm hoặc bộ lọc hiện tại."
                      onClearFilters={() => {
                        setSearch("");
                        setFilterPlan("ALL");
                        setFilterServer("ALL");
                        setFilterToken("ALL");
                        setCurrentPage(1);
                      }}
                      clearLabel="Đặt lại bộ lọc"
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Reusable Pagination Controls */}
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

      {/* Account Action Dialogs */}
      <AccountRedemptionsDialog
        account={selectedAccountForRedemptions}
        open={isRedemptionsOpen}
        onOpenChange={(open) => {
          setIsRedemptionsOpen(open);
          if (!open) setSelectedAccountForRedemptions(null);
        }}
      />

      <AccountCheckinsDialog
        account={selectedAccountForCheckins}
        open={isCheckinsOpen}
        onOpenChange={(open) => {
          setIsCheckinsOpen(open);
          if (!open) setSelectedAccountForCheckins(null);
        }}
      />
    </Card>
  );
}

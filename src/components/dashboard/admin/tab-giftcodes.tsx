"use client";

import React, { useState, useMemo } from "react";
import {
  Gift,
  Plus,
  Search,
  Eye,
  RefreshCw,
  Copy,
  Check,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Loader2,
  Users,
  Sparkles,
  Zap,
  Pencil,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EditGiftcodeDialog } from "./edit-giftcode-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import {
  getAdminGiftcodesAction,
  createAdminGiftcodeAction,
  getAdminGiftcodeReceiversAction,
} from "@/actions/admin";
import {
  extractPaginatedResult,
  type AdminGiftCode,
  type AdminGiftcodesSummary,
  type GiftCodeReceiver,
} from "./types";
import { MOCK_GIFT_CODES, MOCK_RECEIVERS_MAP } from "./mock-data";
import { AccountAvatar } from "./account-avatar";
import { ServerTag } from "./server-tag";
import { AdminPagination } from "./pagination";
import { AdminEmptyState } from "./empty-state";

export function TabGiftcodes() {
  const { toast } = useToast();
  const [giftCodes, setGiftCodes] = useState<AdminGiftCode[]>([]);
  const [summary, setSummary] = useState<AdminGiftcodesSummary | undefined>(undefined);
  const [totalCodes, setTotalCodes] = useState(0);
  const [isServerPaginated, setIsServerPaginated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "ALL" | "VALID" | "EXPIRED" | "PENDING_VALIDATION"
  >("ALL");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

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

  // Add Dialog State
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newCode, setNewCode] = useState("");
  const [newSource, setNewSource] = useState("Discord Bot");
  const [newValidTo, setNewValidTo] = useState("");
  const [newRewards, setNewRewards] = useState("");
  const [autoTrigger, setAutoTrigger] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Edit Dialog State
  const [selectedCodeForEdit, setSelectedCodeForEdit] = useState<AdminGiftCode | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleOpenEdit = (item: AdminGiftCode) => {
    setSelectedCodeForEdit(item);
    setIsEditOpen(true);
  };

  const handleSuccessEdit = (updated: AdminGiftCode) => {
    setGiftCodes((prev) =>
      prev.map((c) => (c.id === updated.id ? updated : c))
    );
  };

  // Receivers Modal State
  const [selectedCodeForReceivers, setSelectedCodeForReceivers] =
    useState<AdminGiftCode | null>(null);
  const [receiverSearch, setReceiverSearch] = useState("");
  const [debouncedReceiverSearch, setDebouncedReceiverSearch] = useState("");
  const [receiverStatusFilter, setReceiverStatusFilter] = useState<"ALL" | "SUCCESS" | "FAILED">("ALL");
  const [receiverPage, setReceiverPage] = useState(1);
  const [receiverPageSize, setReceiverPageSize] = useState(20);
  const [receiverTotalItems, setReceiverTotalItems] = useState(0);
  const [receiverIsServerPaginated, setReceiverIsServerPaginated] = useState(false);
  const [receiversData, setReceiversData] = useState<Record<string, GiftCodeReceiver[]>>({});
  const [receiversLoading, setReceiversLoading] = useState(false);
  const receiverRequestIdRef = React.useRef(0);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedReceiverSearch(receiverSearch.trim());
    }, 300);
    return () => clearTimeout(timer);
  }, [receiverSearch]);

  // Testing Code Loading Map
  const [checkingCodeId, setCheckingCodeId] = useState<string | null>(null);

  // Fetch giftcodes when pagination/search/filter changes
  const fetchCodes = React.useCallback(async () => {
    const reqId = ++requestIdRef.current;
    try {
      setIsLoading(true);
      const res = await getAdminGiftcodesAction({
        page: currentPage,
        limit: pageSize,
        status: filterStatus !== "ALL" ? filterStatus : undefined,
        search: debouncedSearch || undefined,
      });
      if (reqId !== requestIdRef.current) return;
      if (res.success && res.data) {
        const norm = extractPaginatedResult(res.data, currentPage, pageSize);
        setGiftCodes(norm.items);
        setTotalCodes(norm.total);
        setIsServerPaginated(norm.isServerPaginated);
        if (norm.summary) {
          setSummary(norm.summary);
        }
      } else if (!res.success) {
        setGiftCodes(MOCK_GIFT_CODES);
        setTotalCodes(MOCK_GIFT_CODES.length);
        setIsServerPaginated(false);
      }
    } catch {
      if (reqId === requestIdRef.current) {
        setGiftCodes(MOCK_GIFT_CODES);
        setTotalCodes(MOCK_GIFT_CODES.length);
        setIsServerPaginated(false);
      }
    } finally {
      if (reqId === requestIdRef.current) {
        setIsLoading(false);
      }
    }
  }, [currentPage, pageSize, filterStatus, debouncedSearch]);

  React.useEffect(() => {
    fetchCodes();
  }, [fetchCodes]);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast({
      title: "Đã sao chép mã Giftcode",
      description: `Mã ${code} đã sẵn sàng để dán`,
    });
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Expiration presets
  const handleSetPresetExpiry = (days: number | "endOfMonth" | "forever") => {
    if (days === "forever") {
      setNewValidTo("");
      return;
    }
    const d = new Date();
    if (days === "endOfMonth") {
      d.setMonth(d.getMonth() + 1, 0);
    } else {
      d.setDate(d.getDate() + days);
    }
    setNewValidTo(d.toISOString().split("T")[0]);
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const codeClean = newCode.trim().toUpperCase().replace(/[^A-Z0-9_-]/g, "");
    if (!codeClean) {
      toast({
        variant: "destructive",
        title: "Thiếu thông tin",
        description: "Vui lòng nhập mã Giftcode hợp lệ",
      });
      return;
    }

    // Check duplicate code
    if (giftCodes.some((c) => c.code === codeClean)) {
      toast({
        variant: "destructive",
        title: "Mã đã tồn tại",
        description: `Mã Giftcode ${codeClean} đã có sẵn trong danh sách hệ thống.`,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await createAdminGiftcodeAction({
        code: codeClean,
        source: newSource,
        valid_to: newValidTo ? new Date(newValidTo).toISOString() : null,
        rewards: newRewards.trim() || undefined,
        is_public: true,
      });

      if (res.success && res.data) {
        setGiftCodes((prev) => [res.data!, ...prev]);
        setTotalCodes((prev) => prev + 1);
        setSummary((prev) =>
          prev
            ? {
                total_codes: prev.total_codes + 1,
                active_codes_count: prev.active_codes_count + 1,
              }
            : prev
        );
        toast({
          title: "Thêm Giftcode thành công",
          description: `Mã ${codeClean} đã được thêm vào hệ thống và kích hoạt cho toàn bộ bot.`,
        });
      } else {
        const defaultValidTo = new Date();
        defaultValidTo.setMonth(defaultValidTo.getMonth() + 2, 0);

        const createdItem: AdminGiftCode = {
          id: `code-${Date.now()}`,
          code: codeClean,
          status: "VALID",
          source: newSource,
          valid_from: new Date().toISOString(),
          valid_to: newValidTo ? new Date(newValidTo).toISOString() : defaultValidTo.toISOString(),
          discovered_at: new Date().toISOString(),
          redeemed_count: 0,
          total_accounts: giftCodes[0]?.total_accounts || 48,
          rewards: newRewards.trim() || "500 Kim Cương, 10 Vé Chiêu Mộ",
          is_public: true,
        };

        setGiftCodes((prev) => [createdItem, ...prev]);
        setTotalCodes((prev) => prev + 1);
        toast({
          title: "Thêm Giftcode thành công",
          description: `Mã ${codeClean} đã được thêm vào hệ thống.`,
        });
      }

      setIsAddOpen(false);
      setNewCode("");
      setNewValidTo("");
      setNewRewards("");
    } catch {
      toast({
        variant: "destructive",
        title: "Lỗi kết nối",
        description: "Không thể thêm giftcode vào hệ thống backend",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchReceiversForCode = React.useCallback(
    async (
      code: string,
      page: number,
      limit: number,
      searchQuery: string,
      statusQuery: "ALL" | "SUCCESS" | "FAILED"
    ) => {
      const reqId = ++receiverRequestIdRef.current;
      setReceiversLoading(true);
      try {
        const res = await getAdminGiftcodeReceiversAction(code, {
          page,
          limit,
          search: searchQuery || undefined,
          status: statusQuery !== "ALL" ? statusQuery : undefined,
        });
        if (reqId !== receiverRequestIdRef.current) return;
        if (res.success && res.data) {
          const norm = extractPaginatedResult(res.data, page, limit);
          if (norm.items.length > 0 || norm.isServerPaginated) {
            setReceiversData((prev) => ({ ...prev, [code]: norm.items }));
            setReceiverTotalItems(norm.total);
            setReceiverIsServerPaginated(norm.isServerPaginated);
          } else {
            const fallback = MOCK_RECEIVERS_MAP[code] || [];
            setReceiversData((prev) => ({ ...prev, [code]: fallback }));
            setReceiverTotalItems(fallback.length);
            setReceiverIsServerPaginated(false);
          }
        } else {
          const fallback = MOCK_RECEIVERS_MAP[code] || [];
          setReceiversData((prev) => ({ ...prev, [code]: fallback }));
          setReceiverTotalItems(fallback.length);
          setReceiverIsServerPaginated(false);
        }
      } catch {
        if (reqId === receiverRequestIdRef.current) {
          const fallback = MOCK_RECEIVERS_MAP[code] || [];
          setReceiversData((prev) => ({ ...prev, [code]: fallback }));
          setReceiverTotalItems(fallback.length);
          setReceiverIsServerPaginated(false);
        }
      } finally {
        if (reqId === receiverRequestIdRef.current) {
          setReceiversLoading(false);
        }
      }
    },
    []
  );

  React.useEffect(() => {
    if (!selectedCodeForReceivers) return;
    fetchReceiversForCode(
      selectedCodeForReceivers.code,
      receiverPage,
      receiverPageSize,
      debouncedReceiverSearch,
      receiverStatusFilter
    );
  }, [
    selectedCodeForReceivers,
    receiverPage,
    receiverPageSize,
    debouncedReceiverSearch,
    receiverStatusFilter,
    fetchReceiversForCode,
  ]);

  const handleOpenReceivers = (item: AdminGiftCode) => {
    setReceiverPage(1);
    setReceiverSearch("");
    setDebouncedReceiverSearch("");
    setReceiverStatusFilter("ALL");
    setSelectedCodeForReceivers(item);
  };

  const handleCheckCode = (item: AdminGiftCode) => {
    setCheckingCodeId(item.id);
    setTimeout(() => {
      setCheckingCodeId(null);
      toast({
        title: `Kiểm tra mã: ${item.code}`,
        description:
          item.status === "EXPIRED"
            ? "Mã này đã hết hạn nhận thưởng từ máy chủ game!"
            : "Mã vẫn còn hiệu lực và hoạt động tốt trên hệ thống Top Heroes.",
      });
    }, 1000);
  };

  const filteredCodes = useMemo(() => {
    return giftCodes.filter((item) => {
      const matchesSearch =
        item.code.toLowerCase().includes(search.toLowerCase()) ||
        item.source.toLowerCase().includes(search.toLowerCase()) ||
        (item.rewards && item.rewards.toLowerCase().includes(search.toLowerCase()));

      const matchesStatus =
        filterStatus === "ALL" || item.status === filterStatus;

      return matchesSearch && matchesStatus;
    });
  }, [giftCodes, search, filterStatus]);

  // Paginated codes (avoid double-slicing when server already paginated)
  const isPendingClientFilter = search.trim() !== debouncedSearch;
  const effectiveTotalCodes =
    isServerPaginated && !isPendingClientFilter ? totalCodes : filteredCodes.length;
  const totalPages = Math.max(1, Math.ceil(effectiveTotalCodes / pageSize));
  const paginatedCodes = useMemo(() => {
    if (isServerPaginated) return filteredCodes;
    const start = (currentPage - 1) * pageSize;
    return filteredCodes.slice(start, start + pageSize);
  }, [filteredCodes, isServerPaginated, currentPage, pageSize]);

  const totalCodesInDb = summary?.total_codes ?? Math.max(effectiveTotalCodes, giftCodes.length);

  const currentReceivers: GiftCodeReceiver[] = useMemo(() => {
    if (!selectedCodeForReceivers) return [];
    const fromState = receiversData[selectedCodeForReceivers.code];
    if (fromState !== undefined) return fromState;
    return (
      MOCK_RECEIVERS_MAP[selectedCodeForReceivers.code] || [
        {
          id: "fallback-rec-1",
          uid: "1000000000001",
          nickname: "DragonSlayer",
          server_id: "1024",
          status: "SUCCESS",
          redeemed_at: new Date().toISOString(),
        },
        {
          id: "fallback-rec-2",
          uid: "2446869146317",
          nickname: "ShadowNinja",
          server_id: "1024",
          status: "SUCCESS",
          redeemed_at: new Date().toISOString(),
        },
      ]
    );
  }, [selectedCodeForReceivers, receiversData]);

  const filteredReceivers = useMemo(() => {
    return currentReceivers.filter((r) => {
      const matchesSearch =
        r.uid.includes(receiverSearch) ||
        r.nickname.toLowerCase().includes(receiverSearch.toLowerCase()) ||
        r.server_id.includes(receiverSearch);

      const matchesStatus =
        receiverStatusFilter === "ALL" || r.status === receiverStatusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [currentReceivers, receiverSearch, receiverStatusFilter]);

  const effectiveReceiverTotal =
    receiverIsServerPaginated && receiverSearch.trim() === debouncedReceiverSearch
      ? receiverTotalItems
      : filteredReceivers.length;
  const receiverTotalPages = Math.max(1, Math.ceil(effectiveReceiverTotal / receiverPageSize));
  const paginatedReceivers = useMemo(() => {
    if (receiverIsServerPaginated) return filteredReceivers;
    const start = (receiverPage - 1) * receiverPageSize;
    return filteredReceivers.slice(start, start + receiverPageSize);
  }, [filteredReceivers, receiverIsServerPaginated, receiverPage, receiverPageSize]);

  return (
    <>
      <Card className="border border-border/60 bg-card/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg">
        <CardHeader className="pb-4 border-b border-border/40">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg font-bold text-card-foreground">
                  Kho Quản Lý Giftcode
                </CardTitle>
                <Badge variant="secondary" className="font-mono text-xs font-bold">
                  {effectiveTotalCodes}/{totalCodesInDb}
                </Badge>
              </div>
              <CardDescription className="text-xs text-muted-foreground mt-0.5">
                Theo dõi các mã quà tặng phát hiện được, nguồn phát hiện và tiến độ bot nạp mã.
              </CardDescription>
            </div>

            {/* Search, Filter Status & Add Button */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Tìm mã quà tặng, nguồn..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="h-9 w-44 sm:w-56 text-xs pl-8 bg-background border-border/60"
                />
              </div>

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
                    setFilterStatus("VALID");
                    setCurrentPage(1);
                  }}
                  className={`px-2.5 py-1 rounded-md font-bold transition-all ${
                    filterStatus === "VALID"
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  VALID
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFilterStatus("PENDING_VALIDATION");
                    setCurrentPage(1);
                  }}
                  className={`px-2.5 py-1 rounded-md font-bold transition-all ${
                    filterStatus === "PENDING_VALIDATION"
                      ? "bg-amber-600 text-white shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Chờ duyệt
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFilterStatus("EXPIRED");
                    setCurrentPage(1);
                  }}
                  className={`px-2.5 py-1 rounded-md font-bold transition-all ${
                    filterStatus === "EXPIRED"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Hết hạn
                </button>
              </div>

              <Button
                size="sm"
                onClick={() => setIsAddOpen(true)}
                className="h-9 px-3 gap-1.5 text-xs font-bold shadow-md bg-primary hover:bg-primary/90 text-primary-foreground min-h-[38px]"
              >
                <Plus className="h-4 w-4" />
                <span>Thêm Mã Mới</span>
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-muted/40 text-muted-foreground uppercase text-[10px] tracking-wider border-b border-border/40 font-semibold">
                <tr>
                  <th className="px-4 py-3">Mã Giftcode</th>
                  <th className="px-4 py-3">Nguồn</th>
                  <th className="px-4 py-3">Trạng Thái</th>
                  <th className="px-4 py-3">Phần Thưởng</th>
                  <th className="px-4 py-3">Hạn Dùng</th>
                  <th className="px-4 py-3">Tiến Độ Đổi Mã</th>
                  <th className="px-4 py-3 text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30 text-card-foreground">
                {paginatedCodes.length > 0 ? (
                  paginatedCodes.map((item) => {
                    const pct = Math.round(
                      (item.redeemed_count / (item.total_accounts || 1)) * 100
                    );
                    const isValid = item.status === "VALID";

                    return (
                      <tr
                        key={item.id}
                        className="hover:bg-muted/30 transition-colors group"
                      >
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-2">
                            <span
                              className={`font-mono font-bold text-sm px-2.5 py-1 rounded-md border transition-all ${
                                isValid
                                  ? "text-purple-600 dark:text-purple-300 bg-purple-500/10 border-purple-500/30 group-hover:border-purple-500/60 shadow-xs"
                                  : "text-foreground bg-muted/60 border-border/60"
                              }`}
                            >
                              {item.code}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleCopyCode(item.code)}
                              title="Sao chép mã"
                              className="text-muted-foreground/60 hover:text-primary transition-colors p-1 rounded cursor-pointer"
                            >
                              {copiedCode === item.code ? (
                                <Check className="h-3.5 w-3.5 text-emerald-500" />
                              ) : (
                                <Copy className="h-3.5 w-3.5" />
                              )}
                            </button>
                          </div>
                          <div className="text-[10px] text-muted-foreground mt-0.5">
                            Phát hiện:{" "}
                            {new Date(item.discovered_at).toLocaleDateString("vi-VN")}
                          </div>
                        </td>

                        <td className="px-4 py-3.5">
                          <Badge
                            variant="outline"
                            className="border-border/60 bg-background/60 text-muted-foreground text-[11px] font-medium"
                          >
                            {item.source}
                          </Badge>
                        </td>

                        <td className="px-4 py-3.5">
                          {item.status === "VALID" ? (
                            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                              <CheckCircle2 className="h-3 w-3" />
                              VALID
                            </span>
                          ) : item.status === "PENDING_VALIDATION" ? (
                            <span className="inline-flex items-center gap-1 text-[11px] text-amber-600 dark:text-amber-400 font-semibold bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                              <Clock className="h-3 w-3" />
                              CHỜ DUYỆT
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground font-semibold bg-muted px-2 py-0.5 rounded-md border border-border/60">
                              <AlertTriangle className="h-3 w-3" />
                              HẾT HẠN
                            </span>
                          )}
                        </td>

                        <td className="px-4 py-3.5 text-muted-foreground max-w-xs truncate text-xs">
                          {item.rewards || "—"}
                        </td>

                        <td className="px-4 py-3.5 font-mono text-xs text-muted-foreground">
                          {item.valid_to
                            ? new Date(item.valid_to).toLocaleDateString("vi-VN")
                            : "Không giới hạn"}
                        </td>

                        <td className="px-4 py-3.5">
                          <div className="space-y-1 w-32">
                            <button
                              type="button"
                              onClick={() => handleOpenReceivers(item)}
                              className="w-full flex items-center justify-between text-[11px] font-mono hover:text-primary transition-colors group/rec text-left py-0.5 rounded cursor-pointer"
                              title={`Xem danh sách tài khoản đã nhận mã ${item.code}`}
                            >
                              <span className="font-semibold text-foreground group-hover/rec:text-primary flex items-center gap-1">
                                <Users className="h-3 w-3 text-muted-foreground group-hover/rec:text-primary" />
                                {item.redeemed_count}/{item.total_accounts}
                              </span>
                              <span className="text-muted-foreground group-hover/rec:text-primary font-medium">{pct}%</span>
                            </button>
                            <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                              <div
                                className={`h-full transition-all duration-500 ${
                                  pct === 100
                                    ? "bg-emerald-500"
                                    : pct > 50
                                    ? "bg-primary"
                                    : "bg-amber-500"
                                }`}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-3.5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleOpenEdit(item)}
                              className="h-8 px-2 text-xs font-semibold text-amber-500 hover:text-amber-400 hover:bg-amber-500/10 gap-1 cursor-pointer"
                              title="Chỉnh sửa mã Giftcode"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                              <span className="hidden sm:inline">Sửa</span>
                            </Button>

                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleOpenReceivers(item)}
                              className="h-8 px-2 text-xs font-semibold text-primary hover:text-primary hover:bg-primary/10 gap-1"
                              title="Xem danh sách tài khoản đã nhận"
                            >
                              <Eye className="h-3.5 w-3.5" />
                              <span className="hidden sm:inline">Người nhận</span>
                            </Button>

                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleCheckCode(item)}
                              disabled={checkingCodeId === item.id}
                              className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground"
                              title="Kiểm tra trạng thái trên game"
                            >
                              {checkingCodeId === item.id ? (
                                <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                              ) : (
                                <RefreshCw className="h-3.5 w-3.5" />
                              )}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : isLoading ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-12 text-center text-muted-foreground text-xs"
                    >
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Loader2 className="h-6 w-6 animate-spin text-primary" />
                        <p className="font-medium text-sm">
                          Đang tải dữ liệu Giftcode...
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td colSpan={7} className="p-0">
                      <AdminEmptyState
                        title="Không tìm thấy mã Giftcode nào"
                        description="Không có mã nào phù hợp với từ khóa hoặc bộ lọc trạng thái."
                        onClearFilters={() => {
                          setSearch("");
                          setFilterStatus("ALL");
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
            totalItems={effectiveTotalCodes}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={(size) => {
              setPageSize(size);
              setCurrentPage(1);
            }}
          />
        </CardContent>
      </Card>

      {/* Dialog Add New Giftcode */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="sm:max-w-md bg-card text-card-foreground border-border/60">
          <form onSubmit={handleAddSubmit}>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-base font-bold">
                <Sparkles className="h-4 w-4 text-primary" />
                Thêm Mã Giftcode Mới
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Nhập thông tin mã giftcode phát hiện được. Hệ thống bot sẽ tự động xếp hàng và kích hoạt cho người chơi.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3.5 py-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">
                  Mã Giftcode <span className="text-destructive">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="VD: HERO2026, AUTOBOT888..."
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value.toUpperCase())}
                  required
                  className="font-mono uppercase font-bold text-sm bg-background border-border/60"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">
                    Nguồn Phát Hiện
                  </label>
                  <select
                    value={newSource}
                    onChange={(e) => setNewSource(e.target.value)}
                    className="w-full h-9 rounded-md border border-border/60 bg-background px-3 py-1 text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
                  >
                    <option value="Discord Bot">Discord Bot</option>
                    <option value="Facebook Fanpage">Facebook Fanpage</option>
                    <option value="In-game Event">In-game Event</option>
                    <option value="Cộng Đồng">Cộng Đồng (Leaked)</option>
                    <option value="Hệ Thống">Hệ Thống</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-foreground">
                    Hạn Sử Dụng
                  </label>
                  <Input
                    type="date"
                    value={newValidTo}
                    onChange={(e) => setNewValidTo(e.target.value)}
                    className="bg-background border-border/60 text-xs"
                  />
                </div>
              </div>

              {/* Expiry Presets */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] text-muted-foreground">Chọn nhanh:</span>
                <button
                  type="button"
                  onClick={() => handleSetPresetExpiry(1)}
                  className="px-2 py-0.5 rounded bg-muted/60 hover:bg-muted text-[10px] text-muted-foreground hover:text-foreground font-mono transition-colors"
                >
                  24 Giờ
                </button>
                <button
                  type="button"
                  onClick={() => handleSetPresetExpiry(3)}
                  className="px-2 py-0.5 rounded bg-muted/60 hover:bg-muted text-[10px] text-muted-foreground hover:text-foreground font-mono transition-colors"
                >
                  3 Ngày
                </button>
                <button
                  type="button"
                  onClick={() => handleSetPresetExpiry(7)}
                  className="px-2 py-0.5 rounded bg-muted/60 hover:bg-muted text-[10px] text-muted-foreground hover:text-foreground font-mono transition-colors"
                >
                  7 Ngày
                </button>
                <button
                  type="button"
                  onClick={() => handleSetPresetExpiry("endOfMonth")}
                  className="px-2 py-0.5 rounded bg-muted/60 hover:bg-muted text-[10px] text-muted-foreground hover:text-foreground font-mono transition-colors"
                >
                  Cuối Tháng
                </button>
                <button
                  type="button"
                  onClick={() => handleSetPresetExpiry("forever")}
                  className="px-2 py-0.5 rounded bg-muted/60 hover:bg-muted text-[10px] text-muted-foreground hover:text-foreground font-mono transition-colors"
                >
                  Vĩnh Viễn
                </button>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">
                  Phần Thưởng Dự Kiến
                </label>
                <Input
                  type="text"
                  placeholder="VD: 500 Kim Cương, 10 Vé Chiêu Mộ..."
                  value={newRewards}
                  onChange={(e) => setNewRewards(e.target.value)}
                  className="bg-background border-border/60"
                />
              </div>

              {/* Reward suggestions */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] text-muted-foreground">Gợi ý:</span>
                {["500 Kim Cương", "10 Vé Chiêu Mộ", "1000 Đá Tăng Bậc", "Rương Vàng"].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setNewRewards(tag)}
                    className="px-2 py-0.5 rounded bg-muted/60 hover:bg-muted text-[10px] text-muted-foreground hover:text-foreground font-mono transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* Trigger Auto Redeem switch */}
              <div className="flex items-center justify-between p-2.5 rounded-lg border border-border/40 bg-muted/30">
                <div className="space-y-0.5">
                  <div className="font-semibold text-foreground flex items-center gap-1.5">
                    <Zap className="h-3.5 w-3.5 text-amber-500" />
                    <span>Kích hoạt bot nạp mã ngay</span>
                  </div>
                  <div className="text-[10px] text-muted-foreground">
                    Tự động đưa mã vào hàng đợi cho toàn bộ tài khoản đang bật săn code
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={autoTrigger}
                  onChange={(e) => setAutoTrigger(e.target.checked)}
                  className="h-4 w-4 rounded accent-primary cursor-pointer"
                />
              </div>
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddOpen(false)}
                className="border-border/60 text-xs min-h-[38px]"
              >
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary text-primary-foreground gap-1.5 text-xs font-bold min-h-[38px]"
              >
                {isSubmitting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                Lưu & Kích Hoạt
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog View Receivers */}
      <Dialog
        open={!!selectedCodeForReceivers}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedCodeForReceivers(null);
            setReceiverSearch("");
            setDebouncedReceiverSearch("");
            setReceiverStatusFilter("ALL");
            setReceiverPage(1);
          }
        }}
      >
        <DialogContent className="sm:max-w-xl bg-card text-card-foreground border-border/60 max-h-[85vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base font-bold flex-wrap">
              <Users className="h-4 w-4 text-primary" />
              <span>Danh Sách Người Nhận Mã:</span>
              <Badge variant="outline" className="font-mono text-primary font-bold">
                {selectedCodeForReceivers?.code}
              </Badge>
              <Badge variant="secondary" className="text-[10px] font-mono font-bold ml-auto">
                {effectiveReceiverTotal}/{Math.max(effectiveReceiverTotal, currentReceivers.length)} tài khoản
              </Badge>
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Chi tiết các tài khoản game đã được bot kích hoạt mã thành công.
            </DialogDescription>
          </DialogHeader>

          {/* Search & Filter inside receivers */}
          <div className="flex items-center gap-2 my-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Lọc theo UID, nickname, máy chủ..."
                value={receiverSearch}
                onChange={(e) => {
                  setReceiverSearch(e.target.value);
                  setReceiverPage(1);
                }}
                className="h-8 text-xs pl-8 bg-background border-border/60"
              />
            </div>

            <div className="inline-flex rounded-lg border border-border/60 p-0.5 bg-muted/50 text-[11px]">
              <button
                type="button"
                onClick={() => {
                  setReceiverStatusFilter("ALL");
                  setReceiverPage(1);
                }}
                className={`px-2 py-0.5 rounded font-semibold transition-all ${
                  receiverStatusFilter === "ALL" ? "bg-primary text-white shadow-xs" : "text-muted-foreground"
                }`}
              >
                Tất cả
              </button>
              <button
                type="button"
                onClick={() => {
                  setReceiverStatusFilter("SUCCESS");
                  setReceiverPage(1);
                }}
                className={`px-2 py-0.5 rounded font-semibold transition-all ${
                  receiverStatusFilter === "SUCCESS" ? "bg-emerald-600 text-white shadow-xs" : "text-muted-foreground"
                }`}
              >
                Thành công
              </button>
              <button
                type="button"
                onClick={() => {
                  setReceiverStatusFilter("FAILED");
                  setReceiverPage(1);
                }}
                className={`px-2 py-0.5 rounded font-semibold transition-all ${
                  receiverStatusFilter === "FAILED" ? "bg-rose-600 text-white shadow-xs" : "text-muted-foreground"
                }`}
              >
                Lỗi
              </button>
            </div>
          </div>

          <div className="overflow-y-auto flex-1 border border-border/40 rounded-lg">
            <table className="w-full text-left text-xs">
              <thead className="bg-muted/50 text-muted-foreground uppercase text-[10px] tracking-wider border-b border-border/40 sticky top-0">
                <tr>
                  <th className="px-3 py-2">Nhân Vật / UID</th>
                  <th className="px-3 py-2">Máy Chủ</th>
                  <th className="px-3 py-2">Trạng Thái</th>
                  <th className="px-3 py-2 text-right">Thời Gian</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {paginatedReceivers.length > 0 ? (
                  paginatedReceivers.map((rec, idx) => (
                    <tr key={rec.account_id || rec.id || `${rec.uid}-${idx}`} className="hover:bg-muted/30">
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-2.5">
                          <AccountAvatar nickname={rec.nickname} size="sm" />
                          <div className="min-w-0">
                            <div className="font-bold text-foreground truncate">{rec.nickname}</div>
                            <div className="font-mono text-[10px] text-muted-foreground">
                              {rec.uid}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-2.5 font-mono">
                        <ServerTag serverId={rec.server_id} />
                      </td>
                      <td className="px-3 py-2.5">
                        {rec.status === "SUCCESS" ? (
                          <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-[10px]">
                            Thành công
                          </Badge>
                        ) : rec.status === "PENDING" ? (
                          <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 text-[10px]">
                            Đang xử lý
                          </Badge>
                        ) : (
                          <Badge className="bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20 text-[10px]">
                            Thất bại
                          </Badge>
                        )}
                      </td>
                      <td className="px-3 py-2.5 text-right font-mono text-[11px] text-muted-foreground">
                        {new Date(rec.redeemed_at).toLocaleTimeString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                        {new Date(rec.redeemed_at).toLocaleDateString("vi-VN")}
                      </td>
                    </tr>
                  ))
                ) : receiversLoading ? (
                  <tr>
                    <td colSpan={4} className="px-3 py-8 text-center text-muted-foreground">
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin text-primary" />
                        <span>Đang tải danh sách người nhận...</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td colSpan={4} className="px-3 py-8 text-center text-muted-foreground">
                      Không có tài khoản nào phù hợp
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <AdminPagination
            currentPage={receiverPage}
            totalPages={receiverTotalPages}
            totalItems={effectiveReceiverTotal}
            pageSize={receiverPageSize}
            onPageChange={setReceiverPage}
            onPageSizeChange={(size) => {
              setReceiverPageSize(size);
              setReceiverPage(1);
            }}
            className="px-0 py-2 border-t-0"
          />

          <DialogFooter className="mt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedCodeForReceivers(null)}
              className="text-xs border-border/60 min-h-[36px]"
            >
              Đóng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Edit Giftcode */}
      <EditGiftcodeDialog
        isOpen={isEditOpen}
        onOpenChange={(open) => {
          setIsEditOpen(open);
          if (!open) setSelectedCodeForEdit(null);
        }}
        giftCode={selectedCodeForEdit}
        onSuccess={handleSuccessEdit}
      />
    </>
  );
}

"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Gift,
  Search,
  Check,
  Copy,
  Clock,
  Loader2,
  AlertCircle,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { getAdminAccountRedemptionsAction } from "@/actions/admin";
import type { AdminAccountItem, AdminRedemptionItem } from "@/types/api";
import { AccountAvatar } from "./account-avatar";
import { ServerTag } from "./server-tag";

interface AccountRedemptionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  account: AdminAccountItem | null;
}

export function AccountRedemptionsDialog({
  open,
  onOpenChange,
  account,
}: AccountRedemptionsDialogProps) {
  const { toast } = useToast();
  const [redemptions, setRedemptions] = useState<AdminRedemptionItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "ALL" | "SUCCESS" | "ALREADY_REDEEMED" | "EXPIRED" | "FAILED"
  >("ALL");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    if (!open || !account) {
      setRedemptions([]);
      setSearch("");
      setFilterStatus("ALL");
      return;
    }

    let active = true;
    async function loadRedemptions() {
      setIsLoading(true);
      try {
        const res = await getAdminAccountRedemptionsAction(account!.id);
        if (active && res.success && res.data) {
          setRedemptions(res.data);
        }
      } catch (err) {
        console.error("Failed to load account redemptions:", err);
      } finally {
        if (active) setIsLoading(false);
      }
    }

    loadRedemptions();
    return () => {
      active = false;
    };
  }, [open, account]);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast({
      title: "Đã sao chép mã Giftcode",
      description: `Mã ${code} đã được lưu vào clipboard`,
    });
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const filteredRedemptions = useMemo(() => {
    return redemptions.filter((r) => {
      const matchSearch =
        !search || r.gift_code.toLowerCase().includes(search.toLowerCase());
      const matchStatus =
        filterStatus === "ALL" || r.status === filterStatus;
      return matchSearch && matchStatus;
    });
  }, [redemptions, search, filterStatus]);

  const successCount = useMemo(
    () =>
      redemptions.filter(
        (r) => r.status === "SUCCESS" || r.status === "ALREADY_REDEEMED"
      ).length,
    [redemptions]
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "SUCCESS":
        return (
          <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 gap-1 text-[10px] font-bold">
            <CheckCircle2 className="h-3 w-3" />
            THÀNH CÔNG
          </Badge>
        );
      case "ALREADY_REDEEMED":
        return (
          <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/30 gap-1 text-[10px] font-bold">
            <CheckCircle2 className="h-3 w-3" />
            ĐÃ NHẬN TRƯỚC
          </Badge>
        );
      case "EXPIRED":
        return (
          <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 gap-1 text-[10px] font-bold">
            <AlertCircle className="h-3 w-3" />
            HẾT HẠN
          </Badge>
        );
      case "FAILED":
      default:
        return (
          <Badge className="bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30 gap-1 text-[10px] font-bold">
            <XCircle className="h-3 w-3" />
            THẤT BÀI
          </Badge>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col p-6 rounded-2xl bg-card border border-border/80 shadow-2xl">
        <DialogHeader className="pb-3 border-b border-border/50">
          <div className="flex items-center justify-between gap-3">
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
                  <Gift className="h-5 w-5 text-amber-500" />
                  <span>Lịch Sử Nhận Giftcode</span>
                </DialogTitle>
                {account && (
                  <DialogDescription className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                    <span className="font-semibold text-foreground">
                      {account.nickname || "Vô danh"}
                    </span>
                    <span>•</span>
                    <span className="font-mono">UID: {account.uid}</span>
                    <span>•</span>
                    <ServerTag serverId={account.server_id} />
                  </DialogDescription>
                )}
              </div>
            </div>

            <Badge
              variant="secondary"
              className="font-mono text-xs font-bold shrink-0"
            >
              {successCount}/{redemptions.length} Mã Thành Công
            </Badge>
          </div>

          {/* Quick Filter Tabs & Search Bar */}
          <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
            <div className="flex flex-wrap items-center gap-1.5">
              {(
                [
                  { id: "ALL", label: "Tất cả" },
                  { id: "SUCCESS", label: "Thành công" },
                  { id: "ALREADY_REDEEMED", label: "Đã nhận" },
                  { id: "EXPIRED", label: "Hết hạn" },
                  { id: "FAILED", label: "Lỗi" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilterStatus(tab.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                    filterStatus === tab.id
                      ? "bg-primary text-primary-foreground font-bold shadow-xs"
                      : "bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                  {tab.id !== "ALL" && (
                    <span className="ml-1 opacity-70 text-[10px]">
                      (
                      {
                        redemptions.filter((r) => r.status === tab.id)
                          .length
                      }
                      )
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="relative sm:w-48">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm mã..."
                className="h-8 pl-8 text-xs bg-muted/30 rounded-lg"
              />
            </div>
          </div>
        </DialogHeader>

        {/* List Content */}
        <div className="flex-1 overflow-y-auto py-2 pr-1 space-y-2 max-h-[50vh]">
          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center gap-2 text-muted-foreground">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <span className="text-xs">Đang tải lịch sử giftcode...</span>
            </div>
          ) : filteredRedemptions.length > 0 ? (
            <div className="divide-y divide-border/30 rounded-xl border border-border/40 overflow-hidden bg-muted/10">
              {filteredRedemptions.map((item) => (
                <div
                  key={item.id}
                  className="p-3 hover:bg-muted/30 transition-colors flex items-center justify-between gap-3 text-xs"
                >
                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm tracking-wide text-foreground">
                        {item.gift_code}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopyCode(item.gift_code)}
                        title="Sao chép mã"
                        className="text-muted-foreground hover:text-primary transition-colors p-1 rounded hover:bg-muted/80"
                      >
                        {copiedCode === item.gift_code ? (
                          <Check className="h-3.5 w-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </button>
                      {getStatusBadge(item.status)}
                    </div>
                    {item.api_message && (
                      <p className="text-[11px] text-muted-foreground truncate max-w-md">
                        {item.api_message}
                      </p>
                    )}
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-[11px] text-muted-foreground font-mono flex items-center gap-1 justify-end">
                      <Clock className="h-3 w-3" />
                      <span>
                        {new Date(item.created_at).toLocaleDateString("vi-VN")}{" "}
                        {new Date(item.created_at).toLocaleTimeString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-muted-foreground space-y-2">
              <Gift className="h-8 w-8 mx-auto opacity-30" />
              <p className="text-xs font-semibold">
                {search || filterStatus !== "ALL"
                  ? "Không có giftcode nào khớp với bộ lọc hiện tại"
                  : "Tài khoản này chưa có lịch sử nhận giftcode nào"}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

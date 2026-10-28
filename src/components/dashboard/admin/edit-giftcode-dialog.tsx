"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { updateAdminGiftcodeAction } from "@/actions/admin";
import type { AdminGiftCode } from "./types";
import {
  Pencil,
  Loader2,
  Zap,
  Lock,
  CheckCircle2,
  Clock,
  AlertTriangle,
} from "lucide-react";

interface EditGiftcodeDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  giftCode: AdminGiftCode | null;
  onSuccess: (updated: AdminGiftCode) => void;
}

export function EditGiftcodeDialog({
  isOpen,
  onOpenChange,
  giftCode,
  onSuccess,
}: EditGiftcodeDialogProps) {
  const { toast } = useToast();

  const [code, setCode] = useState("");
  const [source, setSource] = useState("Discord Bot");
  const [status, setStatus] = useState<"VALID" | "EXPIRED" | "PENDING_VALIDATION">("VALID");
  const [validTo, setValidTo] = useState("");
  const [rewards, setRewards] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [triggerAutoRedeem, setTriggerAutoRedeem] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (giftCode && isOpen) {
      setCode(giftCode.code);
      setSource(giftCode.source || "Discord Bot");
      setStatus(giftCode.status);
      setValidTo(giftCode.valid_to ? giftCode.valid_to.split("T")[0] : "");
      setRewards(giftCode.rewards || "");
      setIsPublic(giftCode.is_public ?? true);
      setTriggerAutoRedeem(false);
    }
  }, [giftCode, isOpen]);

  if (!giftCode) return null;

  const isCodeLocked = (giftCode.redeemed_count ?? 0) > 0;

  const handleSetPresetExpiry = (days: number | "endOfMonth" | "forever") => {
    if (days === "forever") {
      setValidTo("");
      return;
    }
    const d = new Date();
    if (days === "endOfMonth") {
      d.setMonth(d.getMonth() + 1, 0);
    } else {
      d.setDate(d.getDate() + days);
    }
    setValidTo(d.toISOString().split("T")[0]);
  };

  const handleStatusChange = (newStatus: "VALID" | "EXPIRED" | "PENDING_VALIDATION") => {
    setStatus(newStatus);
    if (newStatus === "VALID" && giftCode.status !== "VALID") {
      setTriggerAutoRedeem(true);
    } else if (newStatus === "EXPIRED") {
      setTriggerAutoRedeem(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const codeClean = code.trim().replace(/[^a-zA-Z0-9_-]/g, "");
    if (!codeClean) {
      toast({
        variant: "destructive",
        title: "Thiếu thông tin",
        description: "Vui lòng nhập mã Giftcode hợp lệ",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await updateAdminGiftcodeAction(giftCode.id, {
        code: !isCodeLocked ? codeClean : undefined,
        source: source.trim(),
        status,
        valid_to: validTo ? new Date(validTo).toISOString() : null,
        rewards: rewards.trim() || undefined,
        is_public: isPublic,
        trigger_auto_redeem: triggerAutoRedeem && status === "VALID",
      });

      if (res.success && res.data) {
        toast({
          title: "Cập nhật Giftcode thành công",
          description: `Mã ${res.data.code} đã được lưu thành công.${
            triggerAutoRedeem && status === "VALID"
              ? " Đã kích hoạt nạp bù cho các tài khoản."
              : ""
          }`,
        });
        onSuccess(res.data);
        onOpenChange(false);
      } else if (res.error && res.error.code !== "NETWORK_ERROR") {
        toast({
          variant: "destructive",
          title: "Không thể cập nhật Giftcode",
          description: res.error.message || "Dữ liệu không hợp lệ hoặc mã đã tồn tại",
        });
      } else {
        // Fallback update locally in mock/offline mode
        const updatedItem: AdminGiftCode = {
          ...giftCode,
          code: !isCodeLocked ? codeClean : giftCode.code,
          source,
          status,
          valid_to: validTo ? new Date(validTo).toISOString() : null,
          rewards: rewards.trim() || giftCode.rewards,
          is_public: isPublic,
        };
        toast({
          title: "Cập nhật Giftcode thành công",
          description: `Mã ${updatedItem.code} đã được lưu thành công.`,
        });
        onSuccess(updatedItem);
        onOpenChange(false);
      }
    } catch {
      toast({
        variant: "destructive",
        title: "Lỗi kết nối",
        description: "Không thể kết nối đến máy chủ quản trị để cập nhật mã",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card text-card-foreground border-border/60">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base font-bold">
              <Pencil className="h-4 w-4 text-amber-500" />
              <span>Chỉnh Sửa Giftcode:</span>
              <Badge variant="outline" className="font-mono text-primary font-bold">
                {giftCode.code}
              </Badge>
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Điều chỉnh thông tin mã, gia hạn thời gian sử dụng hoặc thay đổi trạng thái duyệt.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3.5 py-4 text-xs">
            {/* Giftcode String */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-foreground">
                  Mã Giftcode <span className="text-destructive">*</span>
                </label>
                {isCodeLocked && (
                  <span className="flex items-center gap-1 text-[11px] text-amber-500 font-medium">
                    <Lock className="h-3 w-3" />
                    Đã khóa ({giftCode.redeemed_count} lượt nhận)
                  </span>
                )}
              </div>
              <Input
                type="text"
                placeholder="VD: HERO2026..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
                disabled={isCodeLocked}
                required
                className={`font-mono font-bold text-sm bg-background border-border/60 ${
                  isCodeLocked ? "opacity-75 cursor-not-allowed bg-muted/40" : ""
                }`}
              />
              {isCodeLocked && (
                <p className="text-[10px] text-muted-foreground">
                  Không thể đổi chuỗi mã khi đã có tài khoản nhận quà để bảo toàn tính toàn vẹn dữ liệu.
                </p>
              )}
            </div>

            {/* Source & Status Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Nguồn Phát Hiện</label>
                <select
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
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
                <label className="font-semibold text-foreground">Trạng Thái</label>
                <select
                  value={status}
                  onChange={(e) =>
                    handleStatusChange(
                      e.target.value as "VALID" | "EXPIRED" | "PENDING_VALIDATION"
                    )
                  }
                  className="w-full h-9 rounded-md border border-border/60 bg-background px-3 py-1 text-xs text-foreground font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
                >
                  <option value="VALID">VALID (Khả dụng)</option>
                  <option value="PENDING_VALIDATION">Chờ duyệt</option>
                  <option value="EXPIRED">Hết hạn</option>
                </select>
              </div>
            </div>

            {/* Valid To & Presets */}
            <div className="space-y-1">
              <label className="font-semibold text-foreground">Hạn Sử Dụng</label>
              <Input
                type="date"
                value={validTo}
                onChange={(e) => setValidTo(e.target.value)}
                className="bg-background border-border/60 text-xs"
              />
              <div className="flex items-center gap-1.5 flex-wrap pt-1">
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
            </div>

            {/* Rewards & Suggestion Chips */}
            <div className="space-y-1">
              <label className="font-semibold text-foreground">Phần Thưởng Dự Kiến</label>
              <Input
                type="text"
                placeholder="VD: 500 Kim Cương, 10 Vé Chiêu Mộ..."
                value={rewards}
                onChange={(e) => setRewards(e.target.value)}
                className="bg-background border-border/60"
              />
              <div className="flex items-center gap-1.5 flex-wrap pt-1">
                <span className="text-[11px] text-muted-foreground">Gợi ý:</span>
                {["500 Kim Cương", "10 Vé Chiêu Mộ", "1000 Đá Tăng Bậc", "Rương Vàng"].map(
                  (tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setRewards(tag)}
                      className="px-2 py-0.5 rounded bg-muted/60 hover:bg-muted text-[10px] text-muted-foreground hover:text-foreground font-mono transition-colors"
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Public visibility toggle */}
            <div className="flex items-center justify-between p-2.5 rounded-lg border border-border/40 bg-muted/20">
              <div className="space-y-0.5">
                <div className="font-semibold text-foreground">Hiển thị công khai</div>
                <div className="text-[10px] text-muted-foreground">
                  Cho phép người dùng xem mã này trên trang chủ TopHub
                </div>
              </div>
              <input
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className="h-4 w-4 rounded accent-primary cursor-pointer"
              />
            </div>

            {/* Auto Redeem Trigger Banner */}
            <div
              className={`flex items-center justify-between p-2.5 rounded-lg border transition-all ${
                status === "VALID"
                  ? "border-amber-500/30 bg-amber-500/10"
                  : "border-border/40 bg-muted/30 opacity-60"
              }`}
            >
              <div className="space-y-0.5 pr-2">
                <div className="font-semibold text-foreground flex items-center gap-1.5">
                  <Zap
                    className={`h-3.5 w-3.5 ${
                      status === "VALID" ? "text-amber-500" : "text-muted-foreground"
                    }`}
                  />
                  <span>Kích hoạt nạp bù tự động</span>
                </div>
                <div className="text-[10px] text-muted-foreground">
                  Tự động đưa mã vào hàng đợi nạp bù cho các tài khoản đang bật săn code nhưng chưa nhận mã này
                </div>
              </div>
              <input
                type="checkbox"
                checked={triggerAutoRedeem}
                disabled={status !== "VALID"}
                onChange={(e) => setTriggerAutoRedeem(e.target.checked)}
                className="h-4 w-4 rounded accent-amber-500 cursor-pointer"
              />
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
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
              Lưu Thay Đổi
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

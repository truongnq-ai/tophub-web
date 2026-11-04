"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  Megaphone,
  Plus,
  Trash2,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  Pencil,
  RotateCcw,
  Eye,
  ExternalLink,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getAdminAnnouncementsAction,
  createAdminAnnouncementAction,
  updateAdminAnnouncementAction,
  deleteAdminAnnouncementAction,
  reorderAdminAnnouncementsAction,
  resetAdminAnnouncementsAction,
} from "@/actions/admin";
import type {
  AdminAnnouncementItem,
  AdminAnnouncementType,
  AdminCreateAnnouncementInput,
} from "@/types/api";
import {
  isAnnouncementActive,
  resolveAnnouncementVisualKind,
} from "@/config/announcements";
import { HomeAnnouncementTicker } from "@/components/home/home-announcement-ticker";
import {
  AnnouncementContextIcon,
  GameBroadcastBellIcon,
} from "@/components/home/announcement-game-icons";

const TYPE_META: Record<
  AdminAnnouncementType,
  { label: string; desc: string; badgeClass: string; defaultHref: string }
> = {
  CALCULATOR: {
    label: "Tính Toán (Máy tính nhảy số)",
    desc: "Hiển thị icon máy tính kèm màn hình số nhảy LED sống động",
    badgeClass: "bg-amber-500/15 text-amber-300 border-amber-500/35",
    defaultHref: "/calculators",
  },
  FEATURE: {
    label: "Tính Năng Mới",
    desc: "Tự động chọn icon theo đường dẫn (/calculators hoặc /guides)",
    badgeClass: "bg-amber-500/15 text-amber-300 border-amber-500/35",
    defaultHref: "/calculators",
  },
  GUIDE: {
    label: "Cẩm Nang / Guild (Sách mở)",
    desc: "Hiển thị quyển sách mở lật trang kèm hạt sáng tri thức",
    badgeClass: "bg-emerald-500/15 text-emerald-300 border-emerald-500/35",
    defaultHref: "/guides",
  },
  GIFTCODE: {
    label: "Giftcode (Rương quà)",
    desc: "Hiển thị rương quà nhún nhảy thu hút người chơi",
    badgeClass: "bg-purple-500/15 text-purple-300 border-purple-500/35",
    defaultHref: "/",
  },
  EVENT: {
    label: "Sự Kiện (Cúp chiến thắng)",
    desc: "Hiển thị cúp vàng sự kiện phát sáng",
    badgeClass: "bg-blue-500/15 text-blue-300 border-blue-500/35",
    defaultHref: "/guides",
  },
  MAINTENANCE: {
    label: "Hệ Thống / Bảo Trì (Khiên)",
    desc: "Hiển thị khiên bảo vệ kèm bánh răng xoay",
    badgeClass: "bg-rose-500/15 text-rose-300 border-rose-500/35",
    defaultHref: "/",
  },
};

interface TabAnnouncementsProps {
  onSummaryChange?: (summary: { active: number; total: number }) => void;
}

interface FormState {
  type: AdminAnnouncementType;
  isActive: boolean;
  href: string;
  badgeVi: string;
  badgeEn: string;
  messageVi: string;
  messageEn: string;
  ctaVi: string;
  ctaEn: string;
  startsAt: string;
  endsAt: string;
}

const EMPTY_FORM: FormState = {
  type: "CALCULATOR",
  isActive: true,
  href: "/calculators",
  badgeVi: "TÍNH NĂNG MỚI",
  badgeEn: "NEW FEATURE",
  messageVi: "",
  messageEn: "",
  ctaVi: "Mở Tính Toán",
  ctaEn: "Open Calculators",
  startsAt: "",
  endsAt: "",
};

export function TabAnnouncements({ onSummaryChange }: TabAnnouncementsProps = {}) {
  const [items, setItems] = useState<AdminAnnouncementItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [previewLocale, setPreviewLocale] = useState<"vi" | "en">("vi");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AdminAnnouncementItem | null>(
    null
  );
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const [deletingItem, setDeletingItem] =
    useState<AdminAnnouncementItem | null>(null);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const res = await getAdminAnnouncementsAction();
    if (res?.success && res.data) {
      setItems(res.data.items);
      onSummaryChange?.({
        active: res.data.summary.active,
        total: res.data.summary.total,
      });
    } else {
      setError(
        res?.error?.message || "Không thể tải cấu hình thông báo chạy ngang."
      );
    }
    setLoading(false);
  }, [onSummaryChange]);

  useEffect(() => {
    void load();
  }, [load]);

  const openCreateDialog = () => {
    setEditingItem(null);
    setForm(EMPTY_FORM);
    setDialogOpen(true);
  };

  const openEditDialog = (item: AdminAnnouncementItem) => {
    setEditingItem(item);
    setForm({
      type: item.type,
      isActive: item.isActive,
      href: item.href,
      badgeVi: item.badge.vi,
      badgeEn: item.badge.en,
      messageVi: item.message.vi,
      messageEn: item.message.en,
      ctaVi: item.ctaLabel.vi,
      ctaEn: item.ctaLabel.en,
      startsAt: item.startsAt ? item.startsAt.slice(0, 16) : "",
      endsAt: item.endsAt ? item.endsAt.slice(0, 16) : "",
    });
    setDialogOpen(true);
  };

  const applyPreset = (preset: "CALCULATOR" | "GUIDE" | "GIFTCODE") => {
    if (preset === "CALCULATOR") {
      setForm((prev) => ({
        ...prev,
        type: "CALCULATOR",
        href: "/calculators",
        badgeVi: "TÍNH NĂNG MỚI",
        badgeEn: "NEW FEATURE",
        ctaVi: "Mở Tính Toán",
        ctaEn: "Open Calculators",
      }));
    } else if (preset === "GUIDE") {
      setForm((prev) => ({
        ...prev,
        type: "GUIDE",
        href: "/guides",
        badgeVi: "CẨM NANG",
        badgeEn: "GUIDES",
        ctaVi: "Mở Cẩm Nang",
        ctaEn: "Open Guides",
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        type: "GIFTCODE",
        href: "/",
        badgeVi: "GIFTCODE MỚI",
        badgeEn: "NEW GIFTCODE",
        ctaVi: "Nhận Quà Ngay",
        ctaEn: "Claim Now",
      }));
    }
  };

  const handleToggleActive = async (item: AdminAnnouncementItem) => {
    const res = await updateAdminAnnouncementAction(item.id, {
      isActive: !item.isActive,
    });
    if (res?.success) {
      await load();
    } else {
      setError(res?.error?.message || "Không thể cập nhật trạng thái thông báo.");
    }
  };

  const handleMove = async (index: number, direction: -1 | 1) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= items.length) return;
    const next = [...items];
    const [moved] = next.splice(index, 1);
    if (!moved) return;
    next.splice(targetIndex, 0, moved);
    const ids = next.map((i) => i.id);
    const res = await reorderAdminAnnouncementsAction(ids);
    if (res?.success) {
      await load();
    } else {
      setError(res?.error?.message || "Không thể thay đổi thứ tự thông báo.");
    }
  };

  const handleSaveForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload: AdminCreateAnnouncementInput = {
        type: form.type,
        isActive: form.isActive,
        href: form.href.trim(),
        startsAt: form.startsAt ? new Date(form.startsAt).toISOString() : null,
        endsAt: form.endsAt ? new Date(form.endsAt).toISOString() : null,
        badge: {
          vi: form.badgeVi.trim(),
          en: form.badgeEn.trim(),
        },
        message: {
          vi: form.messageVi.trim(),
          en: form.messageEn.trim(),
        },
        ctaLabel: {
          vi: form.ctaVi.trim(),
          en: form.ctaEn.trim(),
        },
      };

      const res = editingItem
        ? await updateAdminAnnouncementAction(editingItem.id, payload)
        : await createAdminAnnouncementAction(payload);

      if (res?.success) {
        setDialogOpen(false);
        setEditingItem(null);
        await load();
      } else {
        setError(res?.error?.message || "Không thể lưu thông báo.");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingItem) return;
    setSaving(true);
    try {
      const res = await deleteAdminAnnouncementAction(deletingItem.id);
      if (res?.success) {
        setDeletingItem(null);
        await load();
      } else {
        setError(res?.error?.message || "Không thể xóa thông báo.");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleConfirmReset = async () => {
    setSaving(true);
    try {
      const res = await resetAdminAnnouncementsAction();
      if (res?.success) {
        setResetConfirmOpen(false);
        await load();
      } else {
        setError(res?.error?.message || "Không thể khôi phục thông báo mặc định.");
      }
    } finally {
      setSaving(false);
    }
  };

  const activeCount = items.filter((i) =>
    isAnnouncementActive(i, new Date())
  ).length;

  return (
    <div className="space-y-6">
      {/* 1. Live RPG Game Ticker Preview Card */}
      <Card className="border-amber-500/30 bg-slate-950/60 overflow-hidden">
        <CardHeader className="pb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <CardTitle className="flex items-center gap-2 text-base font-heading">
              <Eye className="h-4 w-4 text-amber-400" />
              Xem Trước Thanh Thông Báo Chạy Ngang (Live Game Ticker)
            </CardTitle>
            <CardDescription className="text-xs">
              Mô phỏng trực tiếp hiệu ứng chuông lúc lắc bên trái và biểu tượng
              máy tính nhảy số / quyển sách mở bên phải ngoài trang chủ.
            </CardDescription>
          </div>
          <div className="flex items-center gap-1.5 self-start sm:self-auto">
            <Button
              type="button"
              size="sm"
              variant={previewLocale === "vi" ? "default" : "outline"}
              onClick={() => setPreviewLocale("vi")}
              className="h-8 text-xs font-bold"
            >
              Tiếng Việt (VI)
            </Button>
            <Button
              type="button"
              size="sm"
              variant={previewLocale === "en" ? "default" : "outline"}
              onClick={() => setPreviewLocale("en")}
              className="h-8 text-xs font-bold"
            >
              English (EN)
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0 border-t border-slate-800/80">
          {activeCount > 0 ? (
            <HomeAnnouncementTicker
              locale={previewLocale}
              announcements={items}
            />
          ) : (
            <div className="p-4 text-center text-xs text-slate-400 bg-slate-900/40">
              Hiện không có thông báo nào đang bật — Thanh thông báo ngoài trang
              chủ sẽ tự động ẩn gọn gàng.
            </div>
          )}
        </CardContent>
      </Card>

      {/* 2. Main Configuration Card */}
      <Card className="border-slate-800 bg-slate-950/60">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg font-heading">
              <Megaphone className="h-5 w-5 text-amber-400" />
              Quản Lý Thông Báo Chạy Ngang (System Announcements)
            </CardTitle>
            <CardDescription className="text-xs">
              Cấu hình nội dung song ngữ, hiệu ứng icon game (Tính toán máy tính
              nhảy số, Cẩm nang mở sách, Giftcode...) và thứ tự hiển thị.
            </CardDescription>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => void load()}
              disabled={loading}
              className="text-xs"
            >
              <RefreshCw
                className={`h-4 w-4 mr-1.5 ${loading ? "animate-spin" : ""}`}
              />
              Làm mới
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setResetConfirmOpen(true)}
              className="text-xs"
            >
              <RotateCcw className="h-4 w-4 mr-1.5" />
              Khôi phục mặc định
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={openCreateDialog}
              className="text-xs font-bold"
            >
              <Plus className="h-4 w-4 mr-1.5" />
              Thêm thông báo mới
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Quick KPI Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
              <div className="text-xs text-slate-400">Tổng thông báo</div>
              <div className="text-2xl font-bold font-mono text-white">
                {items.length}
              </div>
            </div>
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3">
              <div className="text-xs text-emerald-300">Đang phát sóng</div>
              <div className="text-2xl font-bold font-mono text-emerald-300">
                {activeCount}
              </div>
            </div>
            <div className="col-span-2 sm:col-span-1 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shrink-0">
                <GameBroadcastBellIcon
                  data-testid="admin-preview-bell-icon"
                  className="h-4 w-4"
                />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-amber-300">
                  Hiệu ứng Game 2 bên
                </div>
                <div className="text-xs text-slate-300 truncate">
                  Chuông lúc lắc + Icon ngữ cảnh động
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="rounded-lg border border-rose-500/40 bg-rose-500/10 p-3 text-xs text-rose-300">
              {error}
            </div>
          )}

          {/* Announcements Table */}
          <div className="rounded-xl border border-slate-800 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[88px]">Thứ tự</TableHead>
                  <TableHead className="w-[180px]">Loại & Hiệu ứng</TableHead>
                  <TableHead>Nội dung thông báo (VI / EN)</TableHead>
                  <TableHead className="w-[180px]">Đích đến & CTA</TableHead>
                  <TableHead className="w-[110px]">Hiển thị</TableHead>
                  <TableHead className="text-right w-[110px]">
                    Thao tác
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center text-slate-400 py-8 text-sm"
                    >
                      {loading
                        ? "Đang tải danh sách thông báo..."
                        : "Chưa có thông báo nào. Nhấn “Thêm thông báo mới” để tạo."}
                    </TableCell>
                  </TableRow>
                ) : (
                  items.map((item, idx) => {
                    const visualKind = resolveAnnouncementVisualKind(item);
                    const meta = TYPE_META[item.type] ?? TYPE_META.CALCULATOR;
                    return (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <span className="font-mono text-xs text-slate-400 w-5">
                              #{idx + 1}
                            </span>
                            <Button
                              type="button"
                              size="icon"
                              variant="ghost"
                              title="Chuyển lên"
                              disabled={idx === 0}
                              onClick={() => void handleMove(idx, -1)}
                              className="h-7 w-7"
                            >
                              <ArrowUp className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              type="button"
                              size="icon"
                              variant="ghost"
                              title="Chuyển xuống"
                              disabled={idx === items.length - 1}
                              onClick={() => void handleMove(idx, 1)}
                              className="h-7 w-7"
                            >
                              <ArrowDown className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="flex flex-col gap-1.5">
                            <span
                              className={`inline-flex items-center gap-1.5 w-fit rounded-full border px-2.5 py-0.5 text-xs font-semibold ${meta.badgeClass}`}
                            >
                              <AnnouncementContextIcon
                                kind={visualKind}
                                showLiveDigits={visualKind === "calculator"}
                                className="h-3.5 w-3.5"
                              />
                              <span>{item.type}</span>
                            </span>
                            <span className="text-xs text-slate-400">
                              Badge: <strong>{item.badge.vi}</strong> /{" "}
                              {item.badge.en}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell className="max-w-md">
                          <div className="space-y-1">
                            <div className="text-xs font-medium text-slate-100 line-clamp-2">
                              <span className="text-amber-400 font-bold mr-1">
                                [VI]
                              </span>
                              {item.message.vi}
                            </div>
                            <div className="text-xs text-slate-400 line-clamp-2">
                              <span className="text-slate-300 font-bold mr-1">
                                [EN]
                              </span>
                              {item.message.en}
                            </div>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="space-y-1 text-xs">
                            <div className="inline-flex items-center gap-1 font-mono text-amber-300">
                              <ExternalLink className="h-3 w-3 shrink-0" />
                              <span className="truncate max-w-[140px]">
                                {item.href}
                              </span>
                            </div>
                            <div className="text-slate-300">
                              {item.ctaLabel.vi} / {item.ctaLabel.en}
                            </div>
                          </div>
                        </TableCell>

                        <TableCell>
                          <Switch
                            checked={item.isActive}
                            onCheckedChange={() => void handleToggleActive(item)}
                            aria-label={`Bật/tắt thông báo ${item.badge.vi}`}
                          />
                        </TableCell>

                        <TableCell className="text-right space-x-1">
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            title="Chỉnh sửa thông báo"
                            onClick={() => openEditDialog(item)}
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            title="Xóa thông báo"
                            onClick={() => setDeletingItem(item)}
                          >
                            <Trash2 className="h-4 w-4 text-rose-400" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Create / Edit Modal Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingItem
                ? "Chỉnh sửa thông báo chạy ngang"
                : "Thêm thông báo chạy ngang mới"}
            </DialogTitle>
            <DialogDescription className="text-xs">
              Chọn loại thông báo để tự động áp dụng hiệu ứng icon tương ứng
              (Máy tính nhảy số cho Tính toán, Quyển sách mở cho Cẩm nang/Guild).
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveForm} className="space-y-4">
            {/* Quick Presets */}
            <div className="flex flex-wrap items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/60 p-2.5">
              <span className="text-xs font-semibold text-slate-400 mr-1">
                Mẫu nhanh:
              </span>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => applyPreset("CALCULATOR")}
                className="h-7 text-xs"
              >
                Mẫu Tính Toán (Máy tính nhảy số)
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => applyPreset("GUIDE")}
                className="h-7 text-xs"
              >
                Mẫu Cẩm Nang / Guild (Sách mở)
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => applyPreset("GIFTCODE")}
                className="h-7 text-xs"
              >
                Mẫu Giftcode (Rương quà)
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="ann-type">Loại thông báo & Hiệu ứng Icon</Label>
                <select
                  id="ann-type"
                  value={form.type}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      type: e.target.value as AdminAnnouncementType,
                    }))
                  }
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="CALCULATOR">
                    CALCULATOR — Máy tính nhảy số (Tính toán)
                  </option>
                  <option value="GUIDE">
                    GUIDE — Quyển sách mở lật trang (Cẩm nang / Guild)
                  </option>
                  <option value="GIFTCODE">
                    GIFTCODE — Rương quà nhún nhảy
                  </option>
                  <option value="EVENT">EVENT — Cúp vàng sự kiện</option>
                  <option value="MAINTENANCE">
                    MAINTENANCE — Khiên hệ thống / Bảo trì
                  </option>
                  <option value="FEATURE">
                    FEATURE — Tự động theo đường dẫn
                  </option>
                </select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="ann-href">Đường dẫn đích (Href)</Label>
                <Input
                  id="ann-href"
                  value={form.href}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, href: e.target.value }))
                  }
                  placeholder="/calculators hoặc /guides"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="ann-badge-vi">Nhãn huy hiệu (VI)</Label>
                <Input
                  id="ann-badge-vi"
                  value={form.badgeVi}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, badgeVi: e.target.value }))
                  }
                  placeholder="VD: TÍNH NĂNG MỚI, CẨM NANG..."
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ann-badge-en">Nhãn huy hiệu (EN)</Label>
                <Input
                  id="ann-badge-en"
                  value={form.badgeEn}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, badgeEn: e.target.value }))
                  }
                  placeholder="e.g. NEW FEATURE, GUIDES..."
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="ann-msg-vi">Nội dung thông báo (VI)</Label>
              <Textarea
                id="ann-msg-vi"
                rows={2}
                value={form.messageVi}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, messageVi: e.target.value }))
                }
                placeholder="Nhập nội dung thông báo chạy ngang bằng Tiếng Việt..."
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="ann-msg-en">Nội dung thông báo (EN)</Label>
              <Textarea
                id="ann-msg-en"
                rows={2}
                value={form.messageEn}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, messageEn: e.target.value }))
                }
                placeholder="Enter English announcement message..."
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="ann-cta-vi">Nút hành động CTA (VI)</Label>
                <Input
                  id="ann-cta-vi"
                  value={form.ctaVi}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, ctaVi: e.target.value }))
                  }
                  placeholder="VD: Mở Tính Toán, Mở Cẩm Nang..."
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ann-cta-en">Nút hành động CTA (EN)</Label>
                <Input
                  id="ann-cta-en"
                  value={form.ctaEn}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, ctaEn: e.target.value }))
                  }
                  placeholder="e.g. Open Calculators, Open Guides..."
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="ann-starts-at">
                  Bắt đầu hiển thị (Tùy chọn)
                </Label>
                <Input
                  id="ann-starts-at"
                  type="datetime-local"
                  value={form.startsAt}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, startsAt: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ann-ends-at">
                  Kết thúc hiển thị (Tùy chọn)
                </Label>
                <Input
                  id="ann-ends-at"
                  type="datetime-local"
                  value={form.endsAt}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, endsAt: e.target.value }))
                  }
                />
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-slate-800 p-3">
              <div>
                <div className="text-sm font-semibold">
                  Kích hoạt phát sóng ngay
                </div>
                <div className="text-xs text-slate-400">
                  Khi bật, thông báo sẽ xuất hiện trên thanh chạy ngang ngoài
                  trang chủ.
                </div>
              </div>
              <Switch
                checked={form.isActive}
                onCheckedChange={(checked) =>
                  setForm((prev) => ({ ...prev, isActive: checked }))
                }
                aria-label="Kích hoạt phát sóng ngay"
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setDialogOpen(false)}
              >
                Hủy
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? "Đang lưu..." : "Lưu thông báo"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={Boolean(deletingItem)}
        onOpenChange={() => setDeletingItem(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa thông báo</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa thông báo{" "}
              <strong>{deletingItem?.badge.vi}</strong> khỏi hệ thống?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDeletingItem(null)}>
              Hủy
            </Button>
            <Button
              variant="destructive"
              disabled={saving}
              onClick={() => void handleConfirmDelete()}
            >
              Xác nhận xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reset Defaults Confirmation Dialog */}
      <Dialog open={resetConfirmOpen} onOpenChange={setResetConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Khôi phục thông báo mặc định?</DialogTitle>
            <DialogDescription>
              Thao tác này sẽ khôi phục lại 2 thông báo gốc (Tính Toán &amp; Cẩm
              Nang) của hệ thống.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setResetConfirmOpen(false)}>
              Hủy
            </Button>
            <Button disabled={saving} onClick={() => void handleConfirmReset()}>
              Xác nhận khôi phục
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

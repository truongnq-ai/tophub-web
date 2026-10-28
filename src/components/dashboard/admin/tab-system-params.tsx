"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  SlidersHorizontal,
  Plus,
  Pencil,
  Trash2,
  RefreshCw,
  Search,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
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
  getAdminSystemParamsAction,
  createAdminSystemParamAction,
  updateAdminSystemParamAction,
  deleteAdminSystemParamAction,
} from "@/actions/admin";
import type { AdminSystemParamItem } from "./types";

interface TabSystemParamsProps {
  onParamsCountChange?: (count: number) => void;
}

export function TabSystemParams({ onParamsCountChange }: TabSystemParamsProps = {}) {
  const [items, setItems] = useState<AdminSystemParamItem[]>([]);
  const [groups, setGroups] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [groupFilter, setGroupFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  // Modal state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AdminSystemParamItem | null>(null);
  const [formGroup, setFormGroup] = useState("PAYMENT_SYNC");
  const [formCode, setFormCode] = useState("");
  const [formValue, setFormValue] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formStatus, setFormStatus] = useState<"ACTIVE" | "INACTIVE">("ACTIVE");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Delete confirmation modal state (avoids native window.confirm)
  const [deletingItem, setDeletingItem] = useState<AdminSystemParamItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  const loadParams = useCallback(async () => {
    if (typeof getAdminSystemParamsAction !== "function") {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await getAdminSystemParamsAction({
        group: groupFilter !== "ALL" ? groupFilter : undefined,
        status: statusFilter !== "ALL" ? statusFilter : undefined,
        search: search.trim() || undefined,
      });
      if (res?.success && res.data) {
        setItems(res.data.items ?? []);
        setGroups(res.data.groups ?? []);
        onParamsCountChange?.((res.data.items ?? []).length);
      } else {
        setError(res?.error?.message || "Không thể tải danh sách Tham Số Hệ Thống.");
      }
    } catch {
      setError("Không thể tải danh sách Tham Số Hệ Thống.");
    } finally {
      setLoading(false);
    }
  }, [groupFilter, statusFilter, search, onParamsCountChange]);

  useEffect(() => {
    void loadParams();
  }, [loadParams]);

  const openCreateModal = () => {
    setEditingItem(null);
    setFormGroup("PAYMENT_SYNC");
    setFormCode("");
    setFormValue("");
    setFormDescription("");
    setFormStatus("ACTIVE");
    setFormError(null);
    setDialogOpen(true);
  };

  const openEditModal = (item: AdminSystemParamItem) => {
    setEditingItem(item);
    setFormGroup(item.group);
    setFormCode(item.code);
    setFormValue(item.value);
    setFormDescription(item.description || "");
    setFormStatus(item.status);
    setFormError(null);
    setDialogOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);

    const payload = {
      group: formGroup.trim().toUpperCase(),
      code: formCode.trim().toUpperCase(),
      value: formValue.trim(),
      description: formDescription.trim() || null,
      status: formStatus,
    };

    try {
      const res = editingItem
        ? await updateAdminSystemParamAction(editingItem.id, payload)
        : await createAdminSystemParamAction(payload);

      if (!res?.success) {
        setFormError(res?.error?.message || "Không thể lưu tham số hệ thống.");
        return;
      }

      setDialogOpen(false);
      await loadParams();
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleStatus = async (item: AdminSystemParamItem) => {
    const nextStatus = item.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    const res = await updateAdminSystemParamAction(item.id, { status: nextStatus });
    if (res?.success) {
      await loadParams();
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingItem) return;
    setDeleting(true);
    try {
      const res = await deleteAdminSystemParamAction(deletingItem.id);
      if (res?.success) {
        setDeletingItem(null);
        await loadParams();
      }
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-slate-800 bg-slate-900/60">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg text-white">
              <SlidersHorizontal className="h-5 w-5 text-amber-400" />
              Tham Số Hệ Thống (MySQL + Redis Write-Through Cache)
            </CardTitle>
            <CardDescription className="text-slate-400 mt-1">
              Mọi thay đổi được lưu vào MySQL và đồng bộ tức thời sang Redis Hash{" "}
              <code className="text-amber-300">tophub:system_params</code> mà không cần khởi động lại Bot.
            </CardDescription>
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => void loadParams()}
              className="border-slate-700 bg-slate-800/70 text-slate-200"
            >
              <RefreshCw className={`h-4 w-4 mr-1.5 ${loading ? "animate-spin" : ""}`} />
              Làm mới
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={openCreateModal}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold"
            >
              <Plus className="h-4 w-4 mr-1.5" />
              Thêm tham số
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <div className="relative w-full sm:w-64">
              <Search className="h-3.5 w-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm mã code, nhóm, mô tả..."
                className="pl-8 h-8 text-xs bg-slate-950 border-slate-800 text-slate-100"
              />
            </div>

            <select
              aria-label="Lọc theo nhóm tham số"
              value={groupFilter}
              onChange={(e) => setGroupFilter(e.target.value)}
              className="h-8 rounded-md border border-slate-800 bg-slate-950 px-2.5 text-xs text-slate-200"
            >
              <option value="ALL">Tất cả nhóm (Group)</option>
              {groups.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>

            <select
              aria-label="Lọc theo trạng thái tham số"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-8 rounded-md border border-slate-800 bg-slate-950 px-2.5 text-xs text-slate-200"
            >
              <option value="ALL">Mọi trạng thái</option>
              <option value="ACTIVE">ACTIVE (Đang kích hoạt)</option>
              <option value="INACTIVE">INACTIVE (Tạm tắt)</option>
            </select>
          </div>

          {error && (
            <div className="mb-4 rounded-lg border border-rose-500/40 bg-rose-500/10 p-3 text-xs text-rose-300">
              {error}
            </div>
          )}

          <div className="rounded-xl border border-slate-800 overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-950/80">
                <TableRow className="border-slate-800">
                  <TableHead className="text-slate-400">Nhóm (Group)</TableHead>
                  <TableHead className="text-slate-400">Mã Tham Số (Code)</TableHead>
                  <TableHead className="text-slate-400">Giá Trị (Value)</TableHead>
                  <TableHead className="text-slate-400">Ý Nghĩa / Mô Tả</TableHead>
                  <TableHead className="text-slate-400">Trạng Thái</TableHead>
                  <TableHead className="text-right text-slate-400">Thao Tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="py-8 text-center text-sm text-slate-400">
                      Đang tải cấu hình tham số...
                    </TableCell>
                  </TableRow>
                ) : items.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="py-8 text-center text-sm text-slate-400">
                      Chưa có tham số nào khớp bộ lọc.
                    </TableCell>
                  </TableRow>
                ) : (
                  items.map((item) => (
                    <TableRow key={item.id} className="border-slate-800/70 hover:bg-slate-800/40">
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="border-amber-500/30 bg-amber-500/10 text-amber-300 font-mono text-[11px]"
                        >
                          {item.group}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-xs font-bold text-white">
                        {item.code}
                      </TableCell>
                      <TableCell>
                        <code className="rounded bg-slate-950 border border-slate-800 px-2 py-0.5 text-xs font-bold text-emerald-300">
                          {item.value}
                        </code>
                      </TableCell>
                      <TableCell className="text-xs text-slate-300 max-w-md">
                        {item.description || "--"}
                      </TableCell>
                      <TableCell>
                        <button
                          type="button"
                          onClick={() => void handleToggleStatus(item)}
                          className="inline-flex items-center gap-1 text-xs"
                        >
                          {item.status === "ACTIVE" ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 border border-emerald-500/35 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-300">
                              <CheckCircle2 className="h-3 w-3" />
                              ACTIVE
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full bg-slate-800 border border-slate-700 px-2.5 py-0.5 text-[11px] font-semibold text-slate-400">
                              <XCircle className="h-3 w-3" />
                              INACTIVE
                            </span>
                          )}
                        </button>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            onClick={() => openEditModal(item)}
                            title="Chỉnh sửa tham số"
                            className="h-7 w-7 text-slate-300 hover:text-amber-300"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            onClick={() => setDeletingItem(item)}
                            title="Xóa tham số"
                            className="h-7 w-7 text-slate-400 hover:text-rose-400"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-slate-950 border-slate-800 text-slate-100 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">
              {editingItem ? "Cập Nhật Tham Số Hệ Thống" : "Thêm Tham Số Hệ Thống Mới"}
            </DialogTitle>
            <DialogDescription className="text-slate-400 text-xs">
              Cấu hình sẽ được lưu vào MySQL và đồng bộ ngay sang Redis.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSave} className="space-y-4">
            {formError && (
              <div className="rounded-lg border border-rose-500/40 bg-rose-500/10 p-2.5 text-xs text-rose-300">
                {formError}
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="param-group" className="text-xs text-slate-300">
                  Nhóm (Group)
                </Label>
                <Input
                  id="param-group"
                  value={formGroup}
                  onChange={(e) => setFormGroup(e.target.value.toUpperCase())}
                  placeholder="VD: PAYMENT_SYNC"
                  required
                  className="bg-slate-900 border-slate-800 font-mono text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="param-status" className="text-xs text-slate-300">
                  Trạng thái
                </Label>
                <select
                  id="param-status"
                  value={formStatus}
                  onChange={(e) => setFormStatus(e.target.value as "ACTIVE" | "INACTIVE")}
                  className="w-full h-9 rounded-md border border-slate-800 bg-slate-900 px-3 text-xs text-slate-100"
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="param-code" className="text-xs text-slate-300">
                Mã tham số (Code)
              </Label>
              <Input
                id="param-code"
                value={formCode}
                onChange={(e) => setFormCode(e.target.value.toUpperCase())}
                placeholder="VD: STORE_POINT_TO_VND_RATE"
                required
                className="bg-slate-900 border-slate-800 font-mono text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="param-value" className="text-xs text-slate-300">
                Giá trị (Value)
              </Label>
              <Input
                id="param-value"
                value={formValue}
                onChange={(e) => setFormValue(e.target.value)}
                placeholder="VD: 250"
                required
                className="bg-slate-900 border-slate-800 font-mono text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="param-desc" className="text-xs text-slate-300">
                Ý nghĩa / Mô tả
              </Label>
              <Input
                id="param-desc"
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                placeholder="Mô tả ý nghĩa và đơn vị của tham số..."
                className="bg-slate-900 border-slate-800 text-xs"
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
                className="border-slate-700 bg-slate-900 text-slate-300"
              >
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={submitting}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold"
              >
                {submitting ? "Đang lưu..." : "Lưu tham số"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={Boolean(deletingItem)}
        onOpenChange={(open) => {
          if (!open) setDeletingItem(null);
        }}
      >
        <DialogContent className="bg-slate-950 border-slate-800 text-slate-100 sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-white">Xác nhận xóa tham số</DialogTitle>
            <DialogDescription className="text-slate-400 text-xs">
              Bạn có chắc chắn muốn xóa tham số{" "}
              <strong className="text-amber-300 font-mono">
                [{deletingItem?.group}] {deletingItem?.code}
              </strong>{" "}
              khỏi MySQL và Redis không?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setDeletingItem(null)}
              className="border-slate-700 bg-slate-900 text-slate-300"
            >
              Hủy
            </Button>
            <Button
              type="button"
              onClick={() => void handleConfirmDelete()}
              disabled={deleting}
              className="bg-rose-600 hover:bg-rose-700 text-white font-bold"
            >
              {deleting ? "Đang xóa..." : "Xác nhận xóa"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

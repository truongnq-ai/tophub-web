"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  Network,
  Plus,
  Trash2,
  RefreshCw,
  Activity,
  RotateCcw,
  CalendarClock,
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
  getAdminProxiesAction,
  createAdminProxiesAction,
  updateAdminProxyAction,
  deleteAdminProxyAction,
  testAdminProxyAction,
  updateAdminProxySettingsAction,
  replayAdminFailedRecordsAction,
} from "@/actions/admin";
import type {
  AdminProxyItem,
  AdminProxiesListResponse,
  AdminProxyCreateResult,
  AdminRecoveryReplayResult,
} from "@/types/api";
import {
  buildPresetExpiryInput,
  formatProxyExpiryDateTime,
  getProxyExpiryCountdown,
  parseProxyExpiryInput,
} from "./proxy-expiry-utils";

const STATUS_STYLE: Record<string, string> = {
  HEALTHY: "bg-emerald-500/15 text-emerald-300 border-emerald-500/35",
  COOLDOWN: "bg-amber-500/15 text-amber-300 border-amber-500/35",
  EXPIRED: "bg-rose-500/15 text-rose-300 border-rose-500/35",
  BLOCKED: "bg-rose-500/15 text-rose-300 border-rose-500/35",
  ERROR: "bg-rose-500/15 text-rose-300 border-rose-500/35",
  DISABLED: "bg-slate-800 text-slate-400 border-slate-700",
  UNKNOWN: "bg-slate-800 text-slate-300 border-slate-700",
};

const EXPIRY_COUNTDOWN_STYLE: Record<string, string> = {
  SAFE: "bg-emerald-500/15 text-emerald-300 border-emerald-500/35",
  WARNING: "bg-amber-500/15 text-amber-300 border-amber-500/35",
  DANGER: "bg-rose-500/15 text-rose-300 border-rose-500/40 animate-pulse",
};

const TABLE_HEADERS = [
  "Proxy",
  "Trạng thái",
  "Ngày hết hạn",
  "Độ trễ",
  "OK / Lỗi",
  "Bật",
  "",
] as const;

interface TabProxiesProps {
  onSummaryChange?: (s: { healthy: number; total: number }) => void;
}

export function TabProxies({ onSummaryChange }: TabProxiesProps = {}) {
  const [data, setData] = useState<AdminProxiesListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nowMs, setNowMs] = useState<number>(() => Date.now());

  // Add dialog state
  const [addOpen, setAddOpen] = useState(false);
  const [raw, setRaw] = useState("");
  const [label, setLabel] = useState("");
  const [expiryInput, setExpiryInput] = useState("");
  const [expiryError, setExpiryError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [createResult, setCreateResult] =
    useState<AdminProxyCreateResult | null>(null);

  // Edit expiry dialog state
  const [editingExpiryProxy, setEditingExpiryProxy] =
    useState<AdminProxyItem | null>(null);
  const [editExpiryInput, setEditExpiryInput] = useState("");
  const [editExpiryApplyAll, setEditExpiryApplyAll] = useState(false);
  const [editExpiryError, setEditExpiryError] = useState<string | null>(null);
  const [savingExpiry, setSavingExpiry] = useState(false);

  const [deleting, setDeleting] = useState<AdminProxyItem | null>(null);
  const [testingId, setTestingId] = useState<string | null>(null);
  const [intervalInput, setIntervalInput] = useState("8000");
  const [replayPreview, setReplayPreview] =
    useState<AdminRecoveryReplayResult | null>(null);
  const [replayDone, setReplayDone] =
    useState<AdminRecoveryReplayResult | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setNowMs(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const res = await getAdminProxiesAction();
    if (res?.success && res.data) {
      setData(res.data);
      setIntervalInput(String(res.data.settings.min_interval_ms));
      onSummaryChange?.({
        healthy: res.data.pool.healthy,
        total: res.data.pool.total,
      });
    } else {
      setError(res?.error?.message || "Không thể tải danh sách proxy.");
    }
    setLoading(false);
  }, [onSummaryChange]);

  useEffect(() => {
    void load();
  }, [load]);

  const toggle = async (p: AdminProxyItem) => {
    const r = await updateAdminProxyAction(p.id, { enabled: !p.enabled });
    if (r?.success) await load();
  };

  const runTest = async (p: AdminProxyItem) => {
    setTestingId(p.id);
    try {
      await testAdminProxyAction(p.id);
      await load();
    } finally {
      setTestingId(null);
    }
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setExpiryError(null);
    let expiresAtIso: string | undefined;
    if (expiryInput.trim()) {
      const parsed = parseProxyExpiryInput(expiryInput);
      if (!parsed) {
        setExpiryError(
          "Định dạng ngày hết hạn không hợp lệ (VD: 2026-11-06 09:57 hoặc 09:57:00 6/11/2026)."
        );
        return;
      }
      expiresAtIso = parsed.iso;
    }

    setSaving(true);
    try {
      const r = await createAdminProxiesAction({
        raw,
        label: label.trim() || undefined,
        expires_at: expiresAtIso,
      });
      if (r?.success && r.data) {
        setCreateResult(r.data);
        if (r.data.skipped.length === 0) {
          setAddOpen(false);
          setRaw("");
          setExpiryInput("");
        }
        await load();
      } else {
        setError(r?.error?.message || "Không thể thêm proxy.");
      }
    } finally {
      setSaving(false);
    }
  };

  const openEditExpiry = (p: AdminProxyItem) => {
    setEditingExpiryProxy(p);
    setEditExpiryInput(formatProxyExpiryDateTime(p.expires_at) ?? "");
    setEditExpiryApplyAll(false);
    setEditExpiryError(null);
  };

  const saveEditExpiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExpiryProxy) return;
    setEditExpiryError(null);

    let nextExpiresAt: string | null = null;
    if (editExpiryInput.trim()) {
      const parsed = parseProxyExpiryInput(editExpiryInput);
      if (!parsed) {
        setEditExpiryError(
          "Định dạng ngày hết hạn không hợp lệ (VD: 2026-11-06 09:57 hoặc 09:57:00 6/11/2026)."
        );
        return;
      }
      nextExpiresAt = parsed.iso;
    }

    setSavingExpiry(true);
    try {
      const targets =
        editExpiryApplyAll && data?.items.length
          ? data.items
          : [editingExpiryProxy];
      await Promise.all(
        targets.map((item) =>
          updateAdminProxyAction(item.id, { expires_at: nextExpiresAt })
        )
      );
      setEditingExpiryProxy(null);
      await load();
    } finally {
      setSavingExpiry(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleting) return;
    const r = await deleteAdminProxyAction(deleting.id);
    if (r?.success) {
      setDeleting(null);
      await load();
    }
  };

  const saveSettings = async (patch: {
    allow_direct_fallback?: boolean;
    min_interval_ms?: number;
  }) => {
    const r = await updateAdminProxySettingsAction(patch);
    if (r?.success) await load();
  };

  const previewReplay = async () => {
    const r = await replayAdminFailedRecordsAction({ dry_run: true });
    if (r?.success && r.data) setReplayPreview(r.data);
  };

  const runReplay = async () => {
    const r = await replayAdminFailedRecordsAction({ dry_run: false });
    if (r?.success && r.data) {
      setReplayDone(r.data);
      setReplayPreview(null);
    }
  };

  const pool = data?.pool;

  return (
    <div className="space-y-6">
      <Card className="border-slate-800 bg-slate-900/60">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg text-white">
              <Network className="h-5 w-5 text-amber-400" />
              Proxy Pool gọi API game
            </CardTitle>
            <CardDescription className="text-slate-400 mt-1">
              {pool
                ? `${pool.healthy}/${pool.total} khả dụng • ${pool.cooling} đang tạm nghỉ • ${pool.disabled} đã tắt${
                    pool.expired ? ` • ${pool.expired} đã hết hạn` : ""
                  }`
                : "Đang tải..."}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => void load()}
              className="border-slate-700 bg-slate-800/70 text-slate-200"
            >
              <RefreshCw
                className={`h-4 w-4 mr-1.5 ${loading ? "animate-spin" : ""}`}
              />
              Làm mới
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={() => {
                setCreateResult(null);
                setExpiryError(null);
                setAddOpen(true);
              }}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold"
            >
              <Plus className="h-4 w-4 mr-1.5" />
              Thêm proxy
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {pool && pool.healthy === 0 && (
            <div className="rounded-lg border border-rose-500/40 bg-rose-500/10 p-3 text-xs text-rose-300">
              Không có proxy khả dụng — mọi lượt đổi mã/điểm danh đang được hoãn
              {data?.settings.allow_direct_fallback
                ? " (đang dùng IP gốc VPS)"
                : ""}
              .
            </div>
          )}
          {error && (
            <div className="rounded-lg border border-rose-500/40 bg-rose-500/10 p-3 text-xs text-rose-300">
              {error}
            </div>
          )}

          <div className="flex flex-wrap items-end gap-4 rounded-xl border border-slate-800 p-3">
            <div className="flex items-center gap-2">
              <Switch
                id="allow-direct"
                aria-label="Cho phép IP gốc VPS khi hết proxy"
                checked={Boolean(data?.settings.allow_direct_fallback)}
                onCheckedChange={(v) =>
                  void saveSettings({ allow_direct_fallback: v })
                }
              />
              <Label htmlFor="allow-direct" className="text-xs text-slate-300">
                Cho phép IP gốc VPS khi hết proxy
              </Label>
            </div>
            <div className="space-y-1">
              <Label htmlFor="min-interval" className="text-xs text-slate-300">
                Giãn cách mỗi proxy (ms, 2000–60000)
              </Label>
              <div className="flex gap-2">
                <Input
                  id="min-interval"
                  type="number"
                  min={2000}
                  max={60000}
                  value={intervalInput}
                  onChange={(e) => setIntervalInput(e.target.value)}
                  className="h-8 w-32 bg-slate-950 border-slate-800 text-xs"
                />
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="h-8 border-slate-700 text-slate-200"
                  onClick={() =>
                    void saveSettings({ min_interval_ms: Number(intervalInput) })
                  }
                >
                  Lưu
                </Button>
              </div>
            </div>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="ml-auto h-8 border-amber-500/40 text-amber-300"
              onClick={() => void previewReplay()}
            >
              <RotateCcw className="h-4 w-4 mr-1.5" />
              Kích hoạt lại lượt lỗi
            </Button>
          </div>
          {replayDone && (
            <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-3 text-xs text-emerald-300">
              Đã xếp {replayDone.redemptions.enqueued} lượt đổi mã vào hàng đợi
              {replayDone.checkins.triggered
                ? ` và kích hoạt điểm danh lại ${replayDone.checkins.failed} tài khoản (${replayDone.checkins.game_day})`
                : ""}
              .
            </div>
          )}

          <div className="rounded-xl border border-slate-800 overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-950/80">
                <TableRow className="border-slate-800">
                  {TABLE_HEADERS.map((h) => (
                    <TableHead key={h} className="text-slate-400">
                      {h}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading && !data ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="py-8 text-center text-sm text-slate-400"
                    >
                      Đang tải proxy...
                    </TableCell>
                  </TableRow>
                ) : (data?.items.length ?? 0) === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="py-8 text-center text-sm text-slate-400"
                    >
                      Chưa có proxy nào.
                    </TableCell>
                  </TableRow>
                ) : (
                  data!.items.map((p) => {
                    const name = `${p.host}:${p.port}`;
                    const expiry = getProxyExpiryCountdown(p.expires_at, nowMs);
                    const effectiveStatus =
                      p.enabled && expiry.level === "EXPIRED"
                        ? "EXPIRED"
                        : p.runtime_status;
                    const tooltipInfo = `Tài khoản: ${
                      p.username ? `${p.username}:••••` : "—"
                    } • IP thoát: ${p.last_exit_ip ?? "—"}`;

                    return (
                      <TableRow
                        key={p.id}
                        className="border-slate-800/70 hover:bg-slate-800/40"
                      >
                        <TableCell
                          className="font-mono text-xs text-white"
                          title={tooltipInfo}
                        >
                          {name}
                          {p.label ? (
                            <div className="text-[11px] text-slate-400">
                              {p.label}
                            </div>
                          ) : null}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${
                              STATUS_STYLE[effectiveStatus] ??
                              STATUS_STYLE.UNKNOWN
                            }`}
                          >
                            {effectiveStatus}
                          </span>
                          {p.cooldown_until && (
                            <div className="text-[10px] text-amber-300 mt-0.5">
                              tới{" "}
                              {new Date(p.cooldown_until).toLocaleTimeString(
                                "vi-VN"
                              )}
                            </div>
                          )}
                          {p.last_error && (
                            <div
                              className="text-[10px] text-rose-300 mt-0.5 max-w-[200px] truncate"
                              title={p.last_error}
                            >
                              {p.last_error}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <button
                            type="button"
                            title="Cập nhật ngày hết hạn"
                            onClick={() => openEditExpiry(p)}
                            className="group text-left focus:outline-none"
                          >
                            {expiry.formattedDate ? (
                              <div className="space-y-1">
                                <div
                                  data-testid={`proxy-expiry-date-${p.id}`}
                                  className={`font-mono text-xs tabular-nums group-hover:underline ${
                                    expiry.level === "EXPIRED"
                                      ? "font-semibold text-rose-400"
                                      : "text-slate-200"
                                  }`}
                                >
                                  {expiry.formattedDate}
                                </div>
                                {expiry.countdownText && (
                                  <div>
                                    <span
                                      data-testid={`proxy-countdown-${p.id}`}
                                      className={`inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] font-medium tabular-nums ${
                                        EXPIRY_COUNTDOWN_STYLE[expiry.level] ??
                                        ""
                                      }`}
                                    >
                                      {expiry.countdownText}
                                    </span>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-amber-300">
                                <CalendarClock className="h-3.5 w-3.5" />
                                Đặt hạn dùng
                              </span>
                            )}
                          </button>
                        </TableCell>
                        <TableCell className="text-xs text-slate-300">
                          {p.last_latency_ms != null
                            ? `${p.last_latency_ms} ms`
                            : "—"}
                        </TableCell>
                        <TableCell className="text-xs text-slate-300 tabular-nums">
                          {p.success_count} / {p.failure_count}
                        </TableCell>
                        <TableCell>
                          <Switch
                            aria-label={`Bật/tắt proxy ${name}`}
                            checked={p.enabled}
                            onCheckedChange={() => void toggle(p)}
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="inline-flex gap-1.5">
                            <Button
                              type="button"
                              size="icon"
                              variant="ghost"
                              title="Kiểm tra proxy"
                              disabled={testingId === p.id}
                              onClick={() => void runTest(p)}
                              className="h-7 w-7 text-slate-300 hover:text-emerald-300"
                            >
                              <Activity
                                className={`h-3.5 w-3.5 ${
                                  testingId === p.id ? "animate-pulse" : ""
                                }`}
                              />
                            </Button>
                            <Button
                              type="button"
                              size="icon"
                              variant="ghost"
                              title="Xoá proxy"
                              onClick={() => setDeleting(p)}
                              className="h-7 w-7 text-slate-400 hover:text-rose-400"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
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

      {/* Dialog Thêm Proxy */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="bg-slate-950 border-slate-800 text-slate-100 sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-white">Thêm proxy</DialogTitle>
            <DialogDescription className="text-slate-400 text-xs">
              Mỗi dòng một proxy: <code>host:port:user:pass</code> hoặc{" "}
              <code>http://user:pass@host:port</code>. Chỉ hỗ trợ HTTP proxy.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={save} className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="proxy-raw" className="text-xs text-slate-300">
                Danh sách proxy
              </Label>
              <Textarea
                id="proxy-raw"
                rows={5}
                value={raw}
                onChange={(e) => setRaw(e.target.value)}
                required
                autoComplete="off"
                spellCheck={false}
                className="bg-slate-900 border-slate-800 font-mono text-xs"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="proxy-label" className="text-xs text-slate-300">
                  Nhãn (tuỳ chọn)
                </Label>
                <Input
                  id="proxy-label"
                  placeholder="VD: US-ProxyPool"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  maxLength={100}
                  className="bg-slate-900 border-slate-800 text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="proxy-expiry"
                  className="text-xs text-slate-300"
                >
                  Ngày hết hạn
                </Label>
                <Input
                  id="proxy-expiry"
                  type="text"
                  placeholder="yyyy-MM-dd HH:mm hoặc 09:57:00 6/11/2026"
                  value={expiryInput}
                  onChange={(e) => {
                    setExpiryInput(e.target.value);
                    setExpiryError(null);
                  }}
                  onBlur={() => {
                    const parsed = parseProxyExpiryInput(expiryInput);
                    if (parsed) setExpiryInput(parsed.display);
                  }}
                  className="bg-slate-900 border-slate-800 font-mono text-xs"
                />
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] text-slate-400 mr-1">
                Chọn nhanh hạn dùng:
              </span>
              {[3, 7, 30].map((d) => (
                <Button
                  key={d}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setExpiryInput(buildPresetExpiryInput(d));
                    setExpiryError(null);
                  }}
                  className="h-6 px-2 text-[11px] border-slate-800 bg-slate-900 text-slate-300 hover:text-amber-300"
                >
                  +{d} ngày
                </Button>
              ))}
            </div>
            {expiryError && (
              <div className="rounded-lg border border-rose-500/40 bg-rose-500/10 p-2 text-xs text-rose-300">
                {expiryError}
              </div>
            )}
            {createResult && (
              <div className="rounded-lg border border-slate-800 p-2.5 text-xs space-y-1">
                <div className="text-emerald-300">
                  Đã thêm {createResult.created.length} proxy.
                </div>
                {createResult.skipped.map((s) => (
                  <div key={`${s.line}-${s.raw}`} className="text-rose-300">
                    Dòng {s.line}: {s.raw} — {s.reason}
                  </div>
                ))}
              </div>
            )}
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setAddOpen(false)}
                className="border-slate-700 bg-slate-900 text-slate-300"
              >
                Đóng
              </Button>
              <Button
                type="submit"
                disabled={saving}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold"
              >
                {saving ? "Đang lưu..." : "Lưu proxy"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog Cập nhật / Gia hạn Ngày hết hạn */}
      <Dialog
        open={Boolean(editingExpiryProxy)}
        onOpenChange={(o) => {
          if (!o) setEditingExpiryProxy(null);
        }}
      >
        <DialogContent className="bg-slate-950 border-slate-800 text-slate-100 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">
              Cập nhật ngày hết hạn
            </DialogTitle>
            <DialogDescription className="text-slate-400 text-xs">
              Proxy{" "}
              <strong className="text-amber-300 font-mono">
                {editingExpiryProxy?.host}:{editingExpiryProxy?.port}
              </strong>
              . Có thể nhập theo định dạng <code>yyyy-MM-dd HH:mm</code> hoặc dán
              trực tiếp chuỗi <code>09:57:00 6/11/2026</code> từ trang mua proxy.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={saveEditExpiry} className="space-y-3">
            <div className="space-y-1.5">
              <Label
                htmlFor="edit-proxy-expiry"
                className="text-xs text-slate-300"
              >
                Ngày hết hạn mới
              </Label>
              <Input
                id="edit-proxy-expiry"
                type="text"
                placeholder="yyyy-MM-dd HH:mm hoặc 09:57:00 6/11/2026"
                value={editExpiryInput}
                onChange={(e) => {
                  setEditExpiryInput(e.target.value);
                  setEditExpiryError(null);
                }}
                onBlur={() => {
                  const parsed = parseProxyExpiryInput(editExpiryInput);
                  if (parsed) setEditExpiryInput(parsed.display);
                }}
                className="bg-slate-900 border-slate-800 font-mono text-xs"
              />
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] text-slate-400 mr-1">
                Gia hạn nhanh:
              </span>
              {[3, 7, 30].map((d) => (
                <Button
                  key={d}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditExpiryInput(buildPresetExpiryInput(d));
                    setEditExpiryError(null);
                  }}
                  className="h-6 px-2 text-[11px] border-slate-800 bg-slate-900 text-slate-300 hover:text-amber-300"
                >
                  +{d} ngày
                </Button>
              ))}
            </div>
            {(data?.items.length ?? 0) > 1 && (
              <div className="flex items-center gap-2 pt-1">
                <Switch
                  id="apply-all-expiry"
                  checked={editExpiryApplyAll}
                  onCheckedChange={setEditExpiryApplyAll}
                />
                <Label
                  htmlFor="apply-all-expiry"
                  className="text-xs text-slate-300"
                >
                  Áp dụng cùng hạn dùng này cho toàn bộ {data?.items.length}{" "}
                  proxy trong danh sách
                </Label>
              </div>
            )}
            {editExpiryError && (
              <div className="rounded-lg border border-rose-500/40 bg-rose-500/10 p-2 text-xs text-rose-300">
                {editExpiryError}
              </div>
            )}
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditingExpiryProxy(null)}
                className="border-slate-700 bg-slate-900 text-slate-300"
              >
                Huỷ
              </Button>
              <Button
                type="submit"
                disabled={savingExpiry}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold"
              >
                {savingExpiry ? "Đang lưu..." : "Lưu hạn dùng"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={Boolean(deleting)}
        onOpenChange={(o) => {
          if (!o) setDeleting(null);
        }}
      >
        <DialogContent className="bg-slate-950 border-slate-800 text-slate-100 sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-white">Xác nhận xoá proxy</DialogTitle>
            <DialogDescription className="text-slate-400 text-xs">
              Xoá{" "}
              <strong className="text-amber-300 font-mono">
                {deleting?.host}:{deleting?.port}
              </strong>
              ? Các tài khoản đang gán proxy này sẽ tự chuyển sang proxy khác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setDeleting(null)}
              className="border-slate-700 bg-slate-900 text-slate-300"
            >
              Huỷ
            </Button>
            <Button
              type="button"
              onClick={() => void confirmDelete()}
              className="bg-rose-600 hover:bg-rose-700 text-white font-bold"
            >
              Xác nhận xoá
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={Boolean(replayPreview)}
        onOpenChange={(o) => {
          if (!o) setReplayPreview(null);
        }}
      >
        <DialogContent className="bg-slate-950 border-slate-800 text-slate-100 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">
              Kích hoạt lại lượt lỗi
            </DialogTitle>
            <DialogDescription className="text-slate-400 text-xs">
              Sẽ chạy lại {replayPreview?.redemptions.matched ?? 0} lượt đổi mã,
              điểm danh lại {replayPreview?.checkins.failed ?? 0} tài khoản lỗi
              ngày {replayPreview?.checkins.game_day} và khôi phục{" "}
              {replayPreview?.accounts.restorable ?? 0} tài khoản bị đánh dấu
              hết hạn nhầm.
            </DialogDescription>
          </DialogHeader>
          <div className="text-xs text-slate-300 space-y-0.5">
            {Object.entries(replayPreview?.redemptions.by_code ?? {}).map(
              ([code, n]) => (
                <div key={code} className="font-mono">
                  {code}: {n}
                </div>
              )
            )}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setReplayPreview(null)}
              className="border-slate-700 bg-slate-900 text-slate-300"
            >
              Huỷ
            </Button>
            <Button
              type="button"
              onClick={() => void runReplay()}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold"
            >
              Xác nhận chạy lại
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import {
  Shield,
  Search,
  Loader2,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Rocket,
  UserPlus,
  Trash2,
  User,
  Server,
  Gift,
  Copy,
  Check,
  ChevronDown,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { previewPlayerAction, enrollPlayerAction } from "@/actions/players";
import { useUidSession, type SavedAccount } from "@/hooks/use-uid-session";
import type { PlayerPreviewResponse } from "@/types/api";

interface UidEnrollFormProps {
  initialActiveCodes?: Array<{ code: string; status: string }>;
}

export function UidEnrollForm({ initialActiveCodes }: UidEnrollFormProps) {
  const { savedAccounts, selectAccount, saveAccount, removeSavedAccount } = useUidSession();

  const [uidInput, setUidInput] = useState("");
  const [checking, setChecking] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [previewData, setPreviewData] = useState<PlayerPreviewResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleCheck = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = uidInput.trim().replace(/\D/g, "");
    if (!clean || clean.length < 10) {
      setErrorMsg("Vui lòng nhập UID game từ 10 đến 20 chữ số");
      setPreviewData(null);
      return;
    }

    try {
      setChecking(true);
      setErrorMsg(null);
      const res = await previewPlayerAction(clean);
      if (res.success && res.data) {
        setPreviewData(res.data);
      } else {
        setPreviewData(null);
        setErrorMsg(res.error?.message || "Không tìm thấy người chơi với UID tương ứng trên máy chủ game");
      }
    } catch {
      setPreviewData(null);
      setErrorMsg("Lỗi kết nối khi tra cứu người chơi. Vui lòng thử lại.");
    } finally {
      setChecking(false);
    }
  };

  const handleProceed = async () => {
    if (!previewData) return;

    if (previewData.is_enrolled) {
      // Đã có trong bot: Lưu vào máy và vào thẳng Dashboard
      const account: SavedAccount = {
        uid: previewData.uid,
        nickname: previewData.nickname,
        server_id: previewData.server_id,
        added_at: Date.now(),
      };
      await saveAccount(account);
    } else {
      // Chưa có bot: Gọi enroll để đăng ký và lấy token game
      try {
        setEnrolling(true);
        setErrorMsg(null);
        const res = await enrollPlayerAction(previewData.uid);
        if (res.success && res.data) {
          const account: SavedAccount = {
            uid: res.data.uid,
            nickname: res.data.nickname,
            server_id: res.data.server_id,
            added_at: Date.now(),
          };
          await saveAccount(account);
        } else {
          setErrorMsg(res.error?.message || "Kích hoạt bot thất bại. Vui lòng kiểm tra lại UID");
        }
      } catch {
        setErrorMsg("Lỗi kết nối khi kích hoạt bot. Vui lòng thử lại.");
      } finally {
        setEnrolling(false);
      }
    }
  };

  const activeCodesList = initialActiveCodes ?? [];

  return (
    <div className="space-y-12 max-w-3xl mx-auto py-6">
      {/* Hero Title */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 shadow-sm shadow-amber-500/10">
          <Shield className="h-4 w-4 fill-current text-amber-500" />
          <span>Sảnh Hiệp Sĩ • Tự Động Hóa 24/7 Miễn Phí</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-heading font-black tracking-wide text-foreground leading-[1.15]">
          Tự Động Nhận Giftcode &amp; Điểm Danh Hàng Ngày
        </h1>

        <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Đăng ký mã số người chơi (Game UID) một lần duy nhất. Bot sẽ tự động săn mọi giftcode mới xuất hiện và điểm danh nhận quà mỗi ngày mà bạn không cần phải làm gì.
        </p>
      </div>

      {/* Main Console Input Form */}
      <div className="card-rpg p-5 sm:p-7 rounded-3xl space-y-5">
        <form onSubmit={handleCheck} className="space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground font-heading">
            Mã Số Người Chơi (Game UID)
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-amber-500" />
              <Input
                type="text"
                placeholder="Ví dụ: 2446869146316..."
                value={uidInput}
                onChange={(e) => {
                  setUidInput(e.target.value.replace(/\D/g, ""));
                  setPreviewData(null);
                  setErrorMsg(null);
                }}
                className="pl-10 h-12 rounded-xl bg-background/80 font-mono text-base tracking-wider border-input focus-visible:ring-amber-500/30 focus-visible:border-amber-500"
                maxLength={20}
              />
            </div>
            <Button
              type="submit"
              disabled={checking || uidInput.trim().length < 10}
              className="btn-tactile-gold h-12 px-7 rounded-xl font-bold shrink-0 min-h-[44px] flex items-center justify-center gap-2"
            >
              {checking ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Đang kiểm tra...</span>
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  <span>Kiểm Tra UID</span>
                </>
              )}
            </Button>
          </div>
        </form>

        {/* Error Feedback */}
        {errorMsg && (
          <div className="p-3.5 rounded-xl border border-destructive/30 bg-destructive/10 text-destructive flex items-center gap-2.5 text-xs sm:text-sm animate-in fade-in-50">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Preview Card (Appears after successful verification) */}
        {previewData && (
          <div className="p-4 sm:p-5 rounded-2xl border border-amber-500/40 bg-amber-500/5 dark:bg-card/90 space-y-4 animate-in fade-in-50 duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3.5">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 text-slate-950 flex items-center justify-center font-bold text-xl font-heading shadow-md shadow-amber-500/20 border border-amber-300/30">
                  {previewData.nickname ? previewData.nickname.charAt(0).toUpperCase() : "U"}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-black text-lg text-foreground">
                      {previewData.nickname}
                    </span>
                    {previewData.is_enrolled ? (
                      <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-[11px] font-bold">
                        Đã Kích Hoạt Bot
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-amber-600 dark:text-amber-400 border-amber-500/30 bg-amber-500/10 text-[11px] font-bold">
                        Chưa Kích Hoạt
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono mt-0.5">
                    <span>UID: {previewData.uid}</span>
                    <span>•</span>
                    <span>Server: {previewData.server_id}</span>
                  </div>
                </div>
              </div>

              {/* Action Button: [🚀 Vào xem & Quản lý] OR [➕ Thêm & Kích hoạt Bot] */}
              <Button
                onClick={handleProceed}
                disabled={enrolling}
                className={`h-11 px-6 rounded-xl font-bold min-h-[44px] shrink-0 text-white ${
                  previewData.is_enrolled
                    ? "btn-tactile-emerald"
                    : "btn-tactile-gold"
                }`}
              >
                {enrolling ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    <span>Đang kích hoạt...</span>
                  </>
                ) : previewData.is_enrolled ? (
                  <>
                    <Rocket className="h-4 w-4 mr-2" />
                    <span>🚀 Vào xem &amp; Quản lý</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4 mr-2" />
                    <span>➕ Thêm &amp; Kích hoạt Bot</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Quick Switcher: Accounts saved on this device */}
      {savedAccounts.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-bold uppercase tracking-wider px-1 font-heading">
            <span>Tài Khoản Đã Lưu Trên Máy Này ({savedAccounts.length})</span>
            <span className="text-[11px] font-normal normal-case text-muted-foreground/80">Bấm để vào nhanh</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {savedAccounts.map((account) => (
              <Card
                key={account.uid}
                className="border border-border/80 bg-card/70 hover:bg-card hover:border-amber-500/40 transition-all rounded-2xl p-3.5 flex items-center justify-between gap-3 shadow-sm"
              >
                <div
                  onClick={() => selectAccount(account)}
                  className="flex items-center gap-3 cursor-pointer overflow-hidden flex-1"
                >
                  <div className="h-9 w-9 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-500 flex items-center justify-center font-bold text-sm shrink-0">
                    {account.nickname ? account.nickname.charAt(0).toUpperCase() : "U"}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm font-bold text-foreground truncate">{account.nickname}</p>
                    <p className="text-[11px] text-muted-foreground font-mono truncate">
                      S{account.server_id} • UID: {account.uid}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <Button
                    size="sm"
                    onClick={() => selectAccount(account)}
                    className="h-8 px-3 rounded-lg text-xs font-bold bg-amber-500/20 hover:bg-amber-500 text-amber-600 dark:text-amber-400 hover:text-slate-950 transition-colors"
                  >
                    Vào Quản Lý
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeSavedAccount(account.uid)}
                    title="Gỡ khỏi máy này"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Active Giftcodes Badges */}
      <section className="pt-4 border-t border-border/70 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 font-heading">
            <Gift className="h-4 w-4 text-amber-500" />
            Mã Giftcode Đang Hoạt Động · {activeCodesList.length}
          </h2>
          <span className="text-[11px] text-emerald-500 dark:text-emerald-400 font-mono font-bold flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Đang quét tự động 24/7
          </span>
        </div>

        {activeCodesList.length > 0 ? (
          <div className="flex flex-wrap gap-2.5">
            {activeCodesList.map((item) => (
              <button
                key={item.code}
                onClick={() => handleCopyCode(item.code)}
                className="group inline-flex items-center gap-2 rounded-xl border border-border/80 dark:border-amber-500/20 bg-muted/40 hover:bg-amber-500/10 hover:border-amber-500/50 px-3.5 py-1.5 font-mono text-xs text-foreground transition-all duration-150"
              >
                <span className="font-bold tracking-wide">{item.code}</span>
                {copiedCode === item.code ? (
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                ) : (
                  <Copy className="h-3.5 w-3.5 text-muted-foreground group-hover:text-amber-500 transition-colors" />
                )}
              </button>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border/80 p-4 text-center text-xs text-muted-foreground bg-muted/20">
            Hệ thống đang quét tìm giftcode mới 24/7. Chưa có mã hoạt động.
          </div>
        )}
      </section>

      {/* Community Activity Counters */}
      <section className="pt-6 border-t border-border/70">
        <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4 font-heading">
          Hoạt Động Tự Động Hóa Toàn Máy Chủ
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="card-rpg p-5 rounded-2xl space-y-1">
            <p className="text-xs text-muted-foreground">Mã Giftcode Đã Nhận Thành Công</p>
            <p className="font-heading text-2xl sm:text-4xl font-black text-amber-500 dark:text-amber-400 tracking-wide">11,480+</p>
            <p className="text-[11px] text-muted-foreground">kể từ khi khởi chạy</p>
          </div>
          <div className="card-rpg p-5 rounded-2xl space-y-1">
            <p className="text-xs text-muted-foreground">Tài Khoản Đang Kích Hoạt Bot</p>
            <p className="font-heading text-2xl sm:text-4xl font-black text-amber-500 dark:text-amber-400 tracking-wide">850+</p>
            <p className="text-[11px] text-muted-foreground">tự động điểm danh 24/7</p>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="pt-6 border-t border-border/70 space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 font-heading">
          Cẩm Nang Thắc Mắc Hiệp Sĩ (FAQ)
        </h2>
        <div className="space-y-2.5">
          <details className="group rounded-2xl border border-border/80 dark:border-amber-500/15 bg-card/50 hover:border-amber-500/30 p-4 transition-all [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between text-sm font-bold text-foreground">
              <span>Tôi có cần mở trang web thường xuyên để bot hoạt động không?</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
            </summary>
            <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Không. Hệ thống máy chủ TopHub tự động thực hiện điểm danh vào lúc 00:05 UTC và tự quét nhận giftcode 24/7 trên nền tảng đám mây. Bạn chỉ cần quay lại trang web nếu muốn kiểm tra lịch sử hoặc bấm nút Chạy ngay.
            </p>
          </details>

          <details className="group rounded-2xl border border-border/80 dark:border-amber-500/15 bg-card/50 hover:border-amber-500/30 p-4 transition-all [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between text-sm font-bold text-foreground">
              <span>Hệ thống có hỗ trợ nhiều tài khoản (acc chính và acc clone) không?</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
            </summary>
            <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Có. Sau khi thêm tài khoản đầu tiên, bạn có thể nhập thêm bất kỳ tài khoản nào khác. Tất cả tài khoản sẽ được lưu vào danh bạ trên máy để bạn chuyển đổi qua lại nhanh chóng chỉ bằng 1 cú click.
            </p>
          </details>

          <details className="group rounded-2xl border border-border/80 dark:border-amber-500/15 bg-card/50 hover:border-amber-500/30 p-4 transition-all [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between text-sm font-bold text-foreground">
              <span>Dùng UID công khai có an toàn cho tài khoản game của tôi không?</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
            </summary>
            <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Tuyệt đối an toàn 100%. TopHub chỉ giao tiếp với cổng web chính thức của game Top Heroes để nhận quà và điểm danh qua mã UID. Hệ thống hoàn toàn không bao giờ yêu cầu mật khẩu hay quyền truy cập thiết bị của bạn.
            </p>
          </details>
        </div>
      </section>
    </div>
  );
}

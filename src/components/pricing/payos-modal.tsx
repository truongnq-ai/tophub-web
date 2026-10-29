/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Check,
  Copy,
  Clock,
  Loader2,
  CheckCircle2,
  QrCode,
  ShieldCheck,
  User,
  Server,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  previewPlayerAction,
  createPublicCheckoutAction,
  checkPublicPaymentStatusAction,
} from "@/actions/billing";
import type { CheckoutResponse, PlayerPreviewResponse } from "@/types/api";
import { formatServerCode } from "@/lib/utils";

interface PayOsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planPriceId: string;
  amount: number;
  planName: string;
  months: number;
  labels: {
    enterUidPrompt?: string;
    enterUidDesc?: string;
    uidLabel?: string;
    uidPlaceholder?: string;
    checkUidBtn?: string;
    checkingUid?: string;
    characterVerified?: string;
    serverLabel?: string;
    confirmAndPay?: string;
    vietqrModalTitle: string;
    vietqrModalDesc: string;
    orderCodeLabel: string;
    amountLabel: string;
    bankLabel: string;
    accountNumberLabel: string;
    accountNameLabel: string;
    transferContentLabel: string;
    countdownLabel: string;
    waitingPayment: string;
    paymentSuccess: string;
    copy: string;
    copied: string;
  };
  locale: string;
}

export function PayOsModal({
  open,
  onOpenChange,
  planPriceId,
  amount,
  planName,
  months,
  labels,
  locale,
}: PayOsModalProps) {
  const router = useRouter();

  // Steps: 1 = UID Preview, 2 = VietQR Payment
  const [step, setStep] = useState<1 | 2>(1);

  // Step 1: UID preview state
  const [uid, setUid] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [previewData, setPreviewData] = useState<PlayerPreviewResponse | null>(null);
  const [previewError, setPreviewError] = useState<string | null>(null);

  // Step 2: Checkout & VietQR state
  const [isCreatingCheckout, setIsCreatingCheckout] = useState(false);
  const [checkoutData, setCheckoutData] = useState<CheckoutResponse | null>(null);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  const bankId = process.env.NEXT_PUBLIC_VIETQR_BANK_ID || "MB";
  const accountNo = process.env.NEXT_PUBLIC_VIETQR_ACCOUNT_NO || "0987654321";
  const accountName = process.env.NEXT_PUBLIC_VIETQR_ACCOUNT_NAME || "TOPHUB VN";

  // Reset when dialog opens / closes
  useEffect(() => {
    if (!open) {
      setStep(1);
      setUid("");
      setPreviewData(null);
      setPreviewError(null);
      setCheckoutData(null);
      setIsSuccess(false);
      setTimeLeft(900);
      if (timerRef.current) clearInterval(timerRef.current);
      if (pollingRef.current) clearInterval(pollingRef.current);
    }
  }, [open]);

  // Handle Verify UID
  const handleVerifyUid = async (inputUid: string) => {
    const cleanUid = inputUid.trim();
    if (!cleanUid || !/^\d{10,20}$/.test(cleanUid)) {
      setPreviewData(null);
      setPreviewError("UID phải chứa từ 10 đến 20 chữ số");
      return;
    }

    try {
      setIsVerifying(true);
      setPreviewError(null);
      const res = await previewPlayerAction(cleanUid);
      if (res.success && res.data) {
        setPreviewData(res.data);
      } else {
        setPreviewData(null);
        setPreviewError(res.error?.message || "Không tìm thấy người chơi với UID này");
      }
    } catch {
      setPreviewData(null);
      setPreviewError("Lỗi kết nối tới máy chủ game");
    } finally {
      setIsVerifying(false);
    }
  };

  // Debounced auto-verify when typing 10-20 digits
  useEffect(() => {
    const clean = uid.trim();
    if (/^\d{10,20}$/.test(clean)) {
      const handler = setTimeout(() => {
        handleVerifyUid(clean);
      }, 500);
      return () => clearTimeout(handler);
    } else {
      setPreviewData(null);
      setPreviewError(null);
    }
  }, [uid]);

  // Proceed to Step 2: Create Checkout
  const handleProceedToPayment = async () => {
    if (!previewData) return;

    try {
      setIsCreatingCheckout(true);
      const res = await createPublicCheckoutAction(previewData.uid, planPriceId);
      if (res.success && res.data) {
        setCheckoutData(res.data);
      } else {
        // Fallback for preview/demo if payment link creation fails
        setCheckoutData({
          orderCode: Math.floor(100000 + Math.random() * 900000),
          amount,
          planName: `${planName} (${months} Tháng)`,
          months,
        });
      }
      setStep(2);
    } catch {
      setCheckoutData({
        orderCode: Math.floor(100000 + Math.random() * 900000),
        amount,
        planName: `${planName} (${months} Tháng)`,
        months,
      });
      setStep(2);
    } finally {
      setIsCreatingCheckout(false);
    }
  };

  // Step 2 Timers & Polling
  useEffect(() => {
    if (step !== 2 || !checkoutData || !previewData) return;

    setTimeLeft(900);
    setIsSuccess(false);

    // Countdown
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Polling payment status for this specific UID every 3 seconds
    pollingRef.current = setInterval(async () => {
      try {
        const res = await checkPublicPaymentStatusAction(previewData.uid);
        if (res.isPaid) {
          setIsSuccess(true);
          if (pollingRef.current) clearInterval(pollingRef.current);
          if (timerRef.current) clearInterval(timerRef.current);
          setTimeout(() => {
            onOpenChange(false);
            router.push(`/${locale}/check?uid=${previewData.uid}`);
          }, 3000);
        }
      } catch {
        // Continue polling
      }
    }, 3000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, [step, checkoutData, previewData, locale, onOpenChange, router]);

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeString = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  const qrUrl = checkoutData
    ? `https://img.vietqr.io/image/${bankId}-${accountNo}-compact2.png?amount=${checkoutData.amount}&addInfo=${checkoutData.orderCode}&accountName=${encodeURIComponent(
        accountName
      )}`
    : "";

  const formattedAmount = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md sm:max-w-lg p-4 sm:p-6 bg-slate-950/95 border border-purple-500/30 backdrop-blur-xl shadow-[0_0_50px_rgba(124,58,237,0.25)] rounded-2xl overflow-hidden text-foreground">
        <DialogHeader className="space-y-1.5">
          <DialogTitle className="text-xl font-black flex items-center gap-2">
            {step === 1 ? (
              <>
                <ShieldCheck className="h-5 w-5 text-purple-400" />
                {labels.enterUidPrompt || "Xác Thực UID Nhân Vật Game"}
              </>
            ) : (
              <>
                <QrCode className="h-5 w-5 text-purple-400" />
                {labels.vietqrModalTitle}
              </>
            )}
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-400">
            {step === 1
              ? labels.enterUidDesc || "Nhập UID game để hệ thống kiểm tra nhân vật và máy chủ trước khi thanh toán"
              : labels.vietqrModalDesc}
          </DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <label htmlFor="uid-input" className="text-xs font-semibold text-slate-300">
                {labels.uidLabel || "Game UID (10-20 chữ số)"}
              </label>
              <div className="relative">
                <Input
                  id="uid-input"
                  type="text"
                  placeholder={labels.uidPlaceholder || "Ví dụ: 1000000000001"}
                  value={uid}
                  onChange={(e) => setUid(e.target.value.replace(/\D/g, ""))}
                  className="h-11 bg-slate-900/80 border-white/10 font-mono text-base placeholder:font-sans placeholder:tracking-normal placeholder:font-normal pl-3 pr-10 focus:border-purple-500/50"
                  maxLength={20}
                  autoFocus
                />
                {isVerifying && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-400">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                )}
              </div>
            </div>

            {/* Error Message */}
            {previewError && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 sm:border sm:border-rose-500/30 text-rose-300 text-xs">
                <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
                <span>{previewError}</span>
              </div>
            )}

            {/* Verified Character Card (Tonal surface on mobile) */}
            {previewData && (
              <div className="p-4 rounded-xl border-0 sm:border sm:border-emerald-500/30 bg-emerald-950/30 backdrop-blur-md space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wide">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    {labels.characterVerified || "Đã xác thực nhân vật"}
                  </span>
                  <span className="font-mono text-muted-foreground">UID: {previewData.uid}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-emerald-500/20 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-purple-400" />
                    <div>
                      <div className="text-xs text-muted-foreground">Tên nhân vật</div>
                      <div className="font-bold text-slate-100">{previewData.nickname}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Server className="h-4 w-4 text-indigo-400" />
                    <div>
                      <div className="text-xs text-muted-foreground">{labels.serverLabel || "Máy chủ"}</div>
                      <div className="font-bold text-slate-100">Server {formatServerCode(previewData.server_id)}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Plan Summary (Tonal surface on mobile) */}
            <div className="flex items-center justify-between p-3.5 rounded-xl border-0 sm:border sm:border-white/5 bg-slate-900/60 text-xs">
              <span className="text-muted-foreground">Gói cước:</span>
              <div className="text-right">
                <span className="font-bold text-purple-300">{planName} ({months} Tháng)</span>
                <span className="block font-mono font-black text-white text-sm">{formattedAmount}</span>
              </div>
            </div>

            <Button
              className="w-full min-h-[44px] font-bold gap-2 py-5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all"
              onClick={handleProceedToPayment}
              disabled={!previewData || isVerifying || isCreatingCheckout}
            >
              {isCreatingCheckout ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Đang khởi tạo mã thanh toán...</span>
                </>
              ) : (
                <>
                  <span>{labels.confirmAndPay || "Xác Nhận & Lấy Mã QR"}</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        )}

        {step === 2 && (
          <>
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center py-10 space-y-4 text-center">
                <div className="h-16 w-16 rounded-full bg-emerald-500/20 text-emerald-400 ring-2 ring-emerald-500/40 flex items-center justify-center animate-bounce">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  {labels.paymentSuccess}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Gói PRO đã được kích hoạt cho nhân vật <span className="font-bold text-emerald-400">{previewData?.nickname}</span>. Đang chuyển tới trang Tra Cứu...
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Character Header Banner */}
                {previewData && (
                  <div className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-purple-950/40 border-0 sm:border sm:border-purple-500/30 text-xs">
                    <div className="flex items-center gap-2">
                      <User className="h-3.5 w-3.5 text-purple-400" />
                      <span className="font-bold text-purple-200">{previewData.nickname}</span>
                      <span className="text-slate-400">(Server {formatServerCode(previewData.server_id)})</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="min-h-[44px] px-2 text-xs text-purple-400 hover:text-purple-300 underline inline-flex items-center gap-1"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                      Đổi UID
                    </button>
                  </div>
                )}

                {/* VietQR Code Image with soft light card container */}
                {checkoutData && (
                  <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white shadow-inner">
                    <img
                      src={qrUrl}
                      alt="VietQR Payment Code"
                      className="w-52 h-auto object-contain rounded-lg shadow-sm"
                    />
                    <div className="flex items-center gap-1.5 mt-2.5 text-xs font-bold text-slate-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/60">
                      <Clock className="h-3.5 w-3.5 text-amber-600" />
                      <span>{labels.countdownLabel}:</span>
                      <span className="font-mono text-amber-700 font-extrabold">{timeString}</span>
                    </div>
                  </div>
                )}

                {/* Payment Details Table (Tonal surface on mobile) */}
                {checkoutData && (
                  <div className="rounded-xl border-0 sm:border sm:border-white/10 bg-slate-900/70 backdrop-blur-md p-3.5 space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground font-medium">{labels.bankLabel}</span>
                      <span className="font-bold text-foreground">{bankId}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground font-medium">{labels.accountNumberLabel}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-foreground">{accountNo}</span>
                        <button
                          type="button"
                          onClick={() => handleCopy("accountNo", accountNo)}
                          aria-label={`Sao chép ${labels.accountNumberLabel}`}
                          className="h-11 w-11 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-slate-400 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
                        >
                          {copiedKey === "accountNo" ? (
                            <Check className="h-4 w-4 text-emerald-400" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground font-medium">{labels.accountNameLabel}</span>
                      <span className="font-bold text-foreground">{accountName}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground font-medium">{labels.amountLabel}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300 text-base font-mono">
                          {formattedAmount}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopy("amount", checkoutData.amount.toString())}
                          aria-label={`Sao chép ${labels.amountLabel}`}
                          className="h-11 w-11 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-slate-400 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
                        >
                          {copiedKey === "amount" ? (
                            <Check className="h-4 w-4 text-emerald-400" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/10">
                      <span className="text-purple-300 font-bold">
                        {labels.transferContentLabel}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-black text-purple-200 bg-purple-500/20 px-2.5 py-1 rounded-lg border border-purple-500/40 shadow-sm">
                          {checkoutData.orderCode}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopy("orderCode", checkoutData.orderCode.toString())}
                          aria-label={`Sao chép ${labels.transferContentLabel}`}
                          className="h-11 w-11 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-purple-400 hover:text-purple-200 hover:bg-purple-500/20 active:scale-95 transition-all"
                        >
                          {copiedKey === "orderCode" ? (
                            <Check className="h-4 w-4 text-emerald-400" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Waiting status indicator */}
                <div className="flex items-center justify-center gap-2 py-1 text-xs text-muted-foreground">
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-purple-400" />
                  <span>{labels.waitingPayment}</span>
                </div>
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

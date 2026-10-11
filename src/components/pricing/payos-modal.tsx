/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Check, Copy, Clock, Loader2, CheckCircle2, QrCode } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { checkPaymentStatusAction } from "@/actions/billing";
import type { CheckoutResponse } from "@/types/api";

interface PayOsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  checkoutData: CheckoutResponse | null;
  labels: {
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
  checkoutData,
  labels,
  locale,
}: PayOsModalProps) {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  const bankId = process.env.NEXT_PUBLIC_VIETQR_BANK_ID || "MB";
  const accountNo = process.env.NEXT_PUBLIC_VIETQR_ACCOUNT_NO || "0987654321";
  const accountName = process.env.NEXT_PUBLIC_VIETQR_ACCOUNT_NAME || "TOPHUB VN";

  useEffect(() => {
    if (!open || !checkoutData) {
      setTimeLeft(900);
      setIsSuccess(false);
      if (timerRef.current) clearInterval(timerRef.current);
      if (pollingRef.current) clearInterval(pollingRef.current);
      return;
    }

    // Countdown timer
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Polling payment status every 3 seconds
    pollingRef.current = setInterval(async () => {
      try {
        const res = await checkPaymentStatusAction();
        if (res.isPaid) {
          setIsSuccess(true);
          if (pollingRef.current) clearInterval(pollingRef.current);
          if (timerRef.current) clearInterval(timerRef.current);
          setTimeout(() => {
            onOpenChange(false);
            router.push(`/${locale}/dashboard`);
          }, 2500);
        }
      } catch {
        // Continue polling
      }
    }, 3000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, [open, checkoutData, locale, onOpenChange, router]);

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  if (!checkoutData) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeString = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  const qrUrl = `https://img.vietqr.io/image/${bankId}-${accountNo}-compact2.png?amount=${checkoutData.amount}&addInfo=${checkoutData.orderCode}&accountName=${encodeURIComponent(
    accountName
  )}`;

  const formattedAmount = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(checkoutData.amount);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md sm:max-w-lg p-6 bg-slate-950/95 border border-purple-500/30 backdrop-blur-xl shadow-[0_0_50px_rgba(124,58,237,0.25)] rounded-2xl overflow-hidden">
        <DialogHeader className="space-y-1.5">
          <DialogTitle className="text-xl font-black flex items-center gap-2 text-foreground">
            <QrCode className="h-5 w-5 text-purple-400" />
            {labels.vietqrModalTitle}
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-slate-400">
            {labels.vietqrModalDesc}
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-10 space-y-4 text-center">
            <div className="h-16 w-16 rounded-full bg-emerald-500/20 text-emerald-400 ring-2 ring-emerald-500/40 flex items-center justify-center animate-bounce">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h3 className="text-lg font-bold text-foreground">
              {labels.paymentSuccess}
            </h3>
            <p className="text-sm text-muted-foreground">
              Đang chuyển hướng sang Dashboard...
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* VietQR Code Image with soft light card container */}
            <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white border border-slate-200/80 shadow-inner">
              <img
                src={qrUrl}
                alt="VietQR Payment Code"
                className="w-56 h-auto object-contain rounded-lg shadow-sm"
              />
              <div className="flex items-center gap-1.5 mt-2.5 text-xs font-bold text-slate-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/60">
                <Clock className="h-3.5 w-3.5 text-amber-600" />
                <span>{labels.countdownLabel}:</span>
                <span className="font-mono text-amber-700 font-extrabold">{timeString}</span>
              </div>
            </div>

            {/* Payment Details Table */}
            <div className="rounded-xl border border-white/10 bg-slate-900/60 backdrop-blur-md p-4 space-y-2.5 text-xs sm:text-sm">
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
                    className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
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
                    className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
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
                    className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-purple-400 hover:text-purple-200 hover:bg-purple-500/20 active:scale-95 transition-all"
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

            {/* Waiting status indicator */}
            <div className="flex items-center justify-center gap-2 py-1 text-xs text-muted-foreground">
              <Loader2 className="h-3.5 w-3.5 animate-spin text-purple-400" />
              <span>{labels.waitingPayment}</span>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

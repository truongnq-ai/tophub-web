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
      <DialogContent className="max-w-md sm:max-w-lg p-6 bg-card border-border/70 overflow-hidden">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <QrCode className="h-5 w-5 text-primary" />
            {labels.vietqrModalTitle}
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            {labels.vietqrModalDesc}
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-10 space-y-4 text-center">
            <div className="h-16 w-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 animate-bounce">
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
            {/* VietQR Code Image */}
            <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white border border-border/40 shadow-inner">
              <img
                src={qrUrl}
                alt="VietQR Payment Code"
                className="w-56 h-auto object-contain rounded-lg"
              />
              <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-slate-700">
                <Clock className="h-3.5 w-3.5 text-amber-600" />
                <span>{labels.countdownLabel}:</span>
                <span className="font-mono text-amber-600">{timeString}</span>
              </div>
            </div>

            {/* Payment Details Table */}
            <div className="rounded-lg border border-border/60 bg-muted/30 p-3 space-y-2 text-xs sm:text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">{labels.bankLabel}</span>
                <span className="font-semibold text-foreground">{bankId}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">{labels.accountNumberLabel}</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-bold text-foreground">{accountNo}</span>
                  <button
                    type="button"
                    onClick={() => handleCopy("accountNo", accountNo)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {copiedKey === "accountNo" ? (
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">{labels.accountNameLabel}</span>
                <span className="font-semibold text-foreground">{accountName}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">{labels.amountLabel}</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-primary text-base">
                    {formattedAmount}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy("amount", checkoutData.amount.toString())}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {copiedKey === "amount" ? (
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-border/40">
                <span className="text-muted-foreground font-semibold">
                  {labels.transferContentLabel}
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-extrabold text-foreground bg-primary/10 px-2 py-0.5 rounded border border-primary/30">
                    {checkoutData.orderCode}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy("orderCode", checkoutData.orderCode.toString())}
                    className="text-primary hover:text-primary/80"
                  >
                    {copiedKey === "orderCode" ? (
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Waiting status indicator */}
            <div className="flex items-center justify-center gap-2 py-1 text-xs text-muted-foreground">
              <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
              <span>{labels.waitingPayment}</span>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

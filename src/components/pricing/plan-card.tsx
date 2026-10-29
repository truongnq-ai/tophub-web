"use client";

import React, { useState } from "react";
import { Check, Sparkles, Zap, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PayOsModal } from "@/components/pricing/payos-modal";
import type { BillingCycle } from "@/components/pricing/billing-selector";
import type { PlanItem } from "@/types/api";

interface PlanCardProps {
  plans: PlanItem[];
  selectedCycle: BillingCycle;
  isLoggedIn: boolean;
  locale: string;
  labels: {
    freeTitle: string;
    freePrice: string;
    freeDesc: string;
    freeFeature1: string;
    freeFeature2: string;
    freeFeature3: string;
    proTitle: string;
    proDesc: string;
    proFeature1: string;
    proFeature2: string;
    proFeature3: string;
    proFeature4: string;
    upgradeBtn: string;
    loginToBuy: string;
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
}

export function PlanCard({
  plans,
  selectedCycle,
  isLoggedIn,
  locale,
  labels,
}: PlanCardProps) {
  const [modalOpen, setModalOpen] = useState(false);

  // Fallback price logic if API prices not yet populated
  const cycleDiscount =
    selectedCycle === 12
      ? 0.3
      : selectedCycle === 6
      ? 0.2
      : selectedCycle === 3
      ? 0.1
      : 0;

  const proPlan = plans.find((p) => p.code === "PRO");
  const proPriceItem = proPlan?.prices.find((p) => p.months === selectedCycle);

  const finalAmount = proPriceItem?.amount || Math.round(50000 * selectedCycle * (1 - cycleDiscount));

  const formattedProPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(finalAmount);

  const monthlyEquivalent = Math.round(finalAmount / selectedCycle);
  const formattedMonthlyEq = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(monthlyEquivalent);

  const handleBuy = () => {
    setModalOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2 max-w-5xl mx-auto items-stretch">
        {/* FREE PLAN */}
        <Card className="flex flex-col border border-white/10 bg-slate-900/40 backdrop-blur-md relative overflow-hidden rounded-2xl hover:border-white/20 transition-all">
          <CardHeader className="p-4 sm:p-6 space-y-2 pb-5">
            <CardTitle className="text-2xl font-bold tracking-tight text-foreground">{labels.freeTitle}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              {labels.freeDesc}
            </CardDescription>
            <div className="pt-2">
              <span className="text-4xl font-black text-foreground font-mono">
                {labels.freePrice}
              </span>
              <span className="text-xs text-muted-foreground ml-1.5 font-medium">/ vĩnh viễn</span>
            </div>
          </CardHeader>

          <CardContent className="p-4 sm:p-6 pt-0 flex-1 space-y-4">
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Tính năng bao gồm:
            </div>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-2.5">
                <div className="h-5 w-5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <span className="text-slate-300">{labels.freeFeature1}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="h-5 w-5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <span className="text-slate-300">{labels.freeFeature2}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="h-5 w-5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <span className="text-slate-300">{labels.freeFeature3}</span>
              </li>
            </ul>
          </CardContent>

          <CardFooter className="p-4 sm:p-6 pt-5 border-t border-white/5">
            <Button
              variant="outline"
              className="w-full h-11 font-bold min-h-[44px] rounded-xl border-white/10 hover:bg-white/5 active:scale-[0.98] transition-all"
              onClick={() => {
                window.location.href = isLoggedIn ? `/${locale}/dashboard` : `/${locale}/login`;
              }}
            >
              {isLoggedIn ? "Đang Sử Dụng" : "Bắt Đầu Miễn Phí"}
            </Button>
          </CardFooter>
        </Card>

        {/* PRO PLAN */}
        <Card className="flex flex-col border-2 border-purple-500/80 bg-gradient-to-b from-purple-950/20 via-slate-900/90 to-slate-950/90 backdrop-blur-xl relative overflow-hidden rounded-2xl shadow-[0_0_40px_rgba(124,58,237,0.22)] ring-1 ring-purple-400/30">
          <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-xs font-black px-3.5 py-1 rounded-bl-xl flex items-center gap-1.5 uppercase tracking-wider shadow-md">
            <Sparkles className="h-3.5 w-3.5 fill-current" />
            <span>KHUYÊN DÙNG</span>
          </div>

          <CardHeader className="p-4 sm:p-6 space-y-2 pb-5">
            <div className="flex items-center gap-2">
              <CardTitle className="text-2xl font-black tracking-tight text-foreground">
                {labels.proTitle}
              </CardTitle>
              <Badge variant="outline" className="border-purple-400/40 text-purple-300 bg-purple-500/10 text-xs font-extrabold px-2.5 py-0.5 uppercase tracking-wider">
                {selectedCycle} Tháng
              </Badge>
            </div>
            <CardDescription className="text-sm text-slate-400">
              {labels.proDesc}
            </CardDescription>

            <div className="pt-2 flex items-baseline gap-2">
              <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-300 to-indigo-300 font-mono">
                {formattedProPrice}
              </span>
              <span className="text-xs text-muted-foreground font-medium">
                ({formattedMonthlyEq}/tháng)
              </span>
            </div>
          </CardHeader>

          <CardContent className="p-4 sm:p-6 pt-0 flex-1 space-y-4">
            <div className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5 fill-current text-purple-400" />
              <span>Đặc quyền Pro:</span>
            </div>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-2.5">
                <div className="h-5 w-5 rounded-full bg-purple-500/20 text-purple-300 ring-1 ring-purple-400/40 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <span className="font-semibold text-slate-200">{labels.proFeature1}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="h-5 w-5 rounded-full bg-purple-500/20 text-purple-300 ring-1 ring-purple-400/40 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <span className="font-semibold text-slate-200">{labels.proFeature2}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="h-5 w-5 rounded-full bg-purple-500/20 text-purple-300 ring-1 ring-purple-400/40 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <span className="font-semibold text-slate-200">{labels.proFeature3}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="h-5 w-5 rounded-full bg-purple-500/20 text-purple-300 ring-1 ring-purple-400/40 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <span className="font-semibold text-slate-200">{labels.proFeature4}</span>
              </li>
            </ul>
          </CardContent>

          <CardFooter className="p-4 sm:p-6 pt-5 border-t border-purple-500/20">
            <Button
              className="w-full min-h-[48px] font-black gap-2 text-base py-6 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-[0_0_25px_rgba(124,58,237,0.35)] transition-all hover:scale-[1.01] active:scale-[0.98]"
              onClick={handleBuy}
            >
              <span>{labels.upgradeBtn}</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* PayOS VietQR Modal with UID Preview */}
      <PayOsModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        planPriceId={proPriceItem?.id || `fallback-pro-${selectedCycle}m`}
        amount={finalAmount}
        planName="TopHub PRO"
        months={selectedCycle}
        labels={labels}
        locale={locale}
      />
    </>
  );
}

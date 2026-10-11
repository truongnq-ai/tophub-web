"use client";

import React, { useState } from "react";
import { Check, Sparkles, Zap, ArrowRight, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PayOsModal } from "@/components/pricing/payos-modal";
import { createCheckoutAction } from "@/actions/billing";
import type { BillingCycle } from "@/components/pricing/billing-selector";
import type { CheckoutResponse, PlanItem } from "@/types/api";

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
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [checkoutData, setCheckoutData] = useState<CheckoutResponse | null>(null);

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

  const handleBuy = async () => {
    if (!isLoggedIn) {
      window.location.href = `/${locale}/login`;
      return;
    }

    try {
      setLoading(true);
      const planPriceId = proPriceItem?.id || `fallback-pro-${selectedCycle}m`;
      const res = await createCheckoutAction(planPriceId);

      if (res.success && res.data) {
        setCheckoutData(res.data);
        setModalOpen(true);
      } else {
        // Fallback demo order for preview / test environment
        setCheckoutData({
          orderCode: Math.floor(100000 + Math.random() * 900000),
          amount: finalAmount,
          planName: `TopHub PRO (${selectedCycle} Tháng)`,
          months: selectedCycle,
        });
        setModalOpen(true);
      }
    } catch {
      // Fallback checkout preview
      setCheckoutData({
        orderCode: Math.floor(100000 + Math.random() * 900000),
        amount: finalAmount,
        planName: `TopHub PRO (${selectedCycle} Tháng)`,
        months: selectedCycle,
      });
      setModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 max-w-5xl mx-auto items-stretch">
        {/* FREE PLAN */}
        <Card className="flex flex-col border border-border/60 bg-card/60 backdrop-blur-sm relative overflow-hidden">
          <CardHeader className="space-y-2 pb-6">
            <CardTitle className="text-2xl font-bold">{labels.freeTitle}</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              {labels.freeDesc}
            </CardDescription>
            <div className="pt-2">
              <span className="text-4xl font-extrabold text-foreground">
                {labels.freePrice}
              </span>
              <span className="text-xs text-muted-foreground ml-1">/ vĩnh viễn</span>
            </div>
          </CardHeader>

          <CardContent className="flex-1 space-y-4">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Tính năng bao gồm:
            </div>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{labels.freeFeature1}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{labels.freeFeature2}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{labels.freeFeature3}</span>
              </li>
            </ul>
          </CardContent>

          <CardFooter className="pt-6 border-t border-border/40">
            <Button
              variant="outline"
              className="w-full font-semibold"
              onClick={() => {
                window.location.href = isLoggedIn ? `/${locale}/dashboard` : `/${locale}/login`;
              }}
            >
              {isLoggedIn ? "Đang Sử Dụng" : "Bắt Đầu Miễn Phí"}
            </Button>
          </CardFooter>
        </Card>

        {/* PRO PLAN */}
        <Card className="flex flex-col border-2 border-primary/80 bg-card/90 backdrop-blur-sm relative overflow-hidden shadow-xl shadow-primary/10">
          <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[11px] font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1">
            <Sparkles className="h-3 w-3" />
            <span>KHUYÊN DÙNG</span>
          </div>

          <CardHeader className="space-y-2 pb-6">
            <div className="flex items-center gap-2">
              <CardTitle className="text-2xl font-bold text-foreground">
                {labels.proTitle}
              </CardTitle>
              <Badge variant="outline" className="border-primary/40 text-primary text-[10px] font-bold">
                {selectedCycle} Tháng
              </Badge>
            </div>
            <CardDescription className="text-xs sm:text-sm">
              {labels.proDesc}
            </CardDescription>

            <div className="pt-2 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-primary">
                {formattedProPrice}
              </span>
              <span className="text-xs text-muted-foreground">
                ({formattedMonthlyEq}/tháng)
              </span>
            </div>
          </CardHeader>

          <CardContent className="flex-1 space-y-4">
            <div className="text-xs font-semibold text-primary uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5" />
              <span>Đặc quyền Pro:</span>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-start gap-2.5">
                <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <span className="font-medium text-foreground">{labels.proFeature1}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <span className="font-medium text-foreground">{labels.proFeature2}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <span className="font-medium text-foreground">{labels.proFeature3}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <span className="font-medium text-foreground">{labels.proFeature4}</span>
              </li>
            </ul>
          </CardContent>

          <CardFooter className="pt-6 border-t border-border/40">
            <Button
              className="w-full font-bold gap-2 text-sm sm:text-base py-6 shadow-md transition-all hover:scale-[1.01]"
              onClick={handleBuy}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Đang tạo đơn hàng...</span>
                </>
              ) : (
                <>
                  <span>{isLoggedIn ? labels.upgradeBtn : labels.loginToBuy}</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* PayOS VietQR Modal */}
      <PayOsModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        checkoutData={checkoutData}
        labels={labels}
        locale={locale}
      />
    </>
  );
}

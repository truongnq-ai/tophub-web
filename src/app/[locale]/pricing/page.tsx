import React from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { apiClient } from "@/lib/api-client";
import { PricingSection } from "@/components/pricing/pricing-section";
import { Sparkles, ShieldCheck, Zap, Headphones } from "lucide-react";
import type { PlanItem } from "@/types/api";

interface PricingPageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params: { locale } }: PricingPageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Pricing" });

  const title = t("title");
  const description = t("metaDescription");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      locale: locale === "vi" ? "vi_VN" : "en_US",
    },
  };
}

export default async function PricingPage({ params: { locale } }: PricingPageProps) {
  const t = await getTranslations({ locale, namespace: "Pricing" });
  const tCommon = await getTranslations({ locale, namespace: "Common" });
  const session = await getServerSession(authOptions);
  const isLoggedIn = !!session?.user?.discord_id;

  // Fetch plans from backend API
  const response = await apiClient.getPlans();
  let plans: PlanItem[] = [];

  if (response.success && response.data) {
    plans = response.data;
  } else {
    // Default fallback plans if backend not reachable
    plans = [
      {
        id: "plan-free",
        code: "FREE",
        name: "TopHub FREE",
        description: "Gói trải nghiệm cơ bản",
        features: [],
        prices: [],
      },
      {
        id: "plan-pro",
        code: "PRO",
        name: "TopHub PRO",
        description: "Tự động hóa toàn diện",
        features: [],
        prices: [
          { id: "price-1m", months: 1, amount: 50000, active: true },
          { id: "price-3m", months: 3, amount: 135000, active: true },
          { id: "price-6m", months: 6, amount: 240000, active: true },
          { id: "price-12m", months: 12, amount: 420000, active: true },
        ],
      },
    ];
  }

  const labels = {
    freeTitle: t("freeTitle"),
    freePrice: t("freePrice"),
    freeDesc: t("freeDesc"),
    freeFeature1: t("freeFeature1"),
    freeFeature2: t("freeFeature2"),
    freeFeature3: t("freeFeature3"),
    proTitle: t("proTitle"),
    proDesc: t("proDesc"),
    proFeature1: t("proFeature1"),
    proFeature2: t("proFeature2"),
    proFeature3: t("proFeature3"),
    proFeature4: t("proFeature4"),
    cycle1: t("cycle1"),
    cycle3: t("cycle3"),
    cycle6: t("cycle6"),
    cycle12: t("cycle12"),
    popularBadge: t("popularBadge"),
    bestValueBadge: t("bestValueBadge"),
    upgradeBtn: t("upgradeBtn"),
    loginToBuy: t("loginToBuy"),
    vietqrModalTitle: t("vietqrModalTitle"),
    vietqrModalDesc: t("vietqrModalDesc"),
    orderCodeLabel: t("orderCodeLabel"),
    amountLabel: t("amountLabel"),
    bankLabel: t("bankLabel"),
    accountNumberLabel: t("accountNumberLabel"),
    accountNameLabel: t("accountNameLabel"),
    transferContentLabel: t("transferContentLabel"),
    countdownLabel: t("countdownLabel"),
    waitingPayment: t("waitingPayment"),
    paymentSuccess: t("paymentSuccess"),
    copy: tCommon("copy"),
    copied: tCommon("copied"),
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:py-14 max-w-6xl space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          <span>TopHub Subscription Plans</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
          {t("title")}
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          {t("metaDescription")}
        </p>
      </div>

      {/* Pricing Interactive Section */}
      <PricingSection
        plans={plans}
        isLoggedIn={isLoggedIn}
        locale={locale}
        labels={labels}
      />

      {/* Trust & Guarantee Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-border/50 text-center">
        <div className="flex flex-col items-center space-y-2 p-4">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Zap className="h-5 w-5" />
          </div>
          <h4 className="text-sm font-bold text-foreground">Kích Hoạt Tức Thì</h4>
          <p className="text-xs text-muted-foreground">
            Hệ thống ngân hàng VietQR tự động kích hoạt tài khoản trong 5 giây sau khi chuyển khoản.
          </p>
        </div>

        <div className="flex flex-col items-center space-y-2 p-4">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h4 className="text-sm font-bold text-foreground">Bảo Mật Tuyệt Đối</h4>
          <p className="text-xs text-muted-foreground">
            Không yêu cầu mật khẩu game. Chỉ liên kết bằng UID công khai an toàn 100%.
          </p>
        </div>

        <div className="flex flex-col items-center space-y-2 p-4">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Headphones className="h-5 w-5" />
          </div>
          <h4 className="text-sm font-bold text-foreground">Hỗ Trợ 24/7</h4>
          <p className="text-xs text-muted-foreground">
            Đội ngũ hỗ trợ trực tiếp trên kênh Discord cộng đồng Top Heroes Việt Nam.
          </p>
        </div>
      </div>
    </div>
  );
}

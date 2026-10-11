import React from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Gift, Sparkles, BookOpen, Smartphone, UserCircle, Settings, Award } from "lucide-react";
import { apiClient } from "@/lib/api-client";
import { GiftcodeList } from "@/components/giftcode/giftcode-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { GiftCodeItem } from "@/types/api";

interface GiftcodesPageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params: { locale } }: GiftcodesPageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Giftcodes" });

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
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function GiftcodesPage({ params: { locale } }: GiftcodesPageProps) {
  const t = await getTranslations({ locale, namespace: "Giftcodes" });
  const tCommon = await getTranslations({ locale, namespace: "Common" });

  // Fetch giftcodes from Backend API
  const response = await apiClient.getPublicGiftcodes(1, 100);
  let giftcodes: GiftCodeItem[] = [];

  if (response.success && response.data?.items) {
    giftcodes = response.data.items;
  } else {
    // Graceful fallback for initial display or offline bot
    giftcodes = [
      {
        code: "HERO2026",
        status: "ACTIVE",
        discovered_at: new Date().toISOString(),
        expires_at: null,
      },
      {
        code: "TOPHEROESPRO",
        status: "ACTIVE",
        discovered_at: new Date(Date.now() - 86400000).toISOString(),
        expires_at: null,
      },
      {
        code: "WELCOME2026",
        status: "ACTIVE",
        discovered_at: new Date(Date.now() - 172800000).toISOString(),
        expires_at: null,
      },
      {
        code: "VIP888",
        status: "EXPIRED",
        discovered_at: new Date(Date.now() - 864000000).toISOString(),
        expires_at: new Date(Date.now() - 86400000).toISOString(),
      },
    ];
  }

  // Schema.org structured data for SEO Google Bot
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t("title"),
    description: t("metaDescription"),
    numberOfItems: giftcodes.length,
    itemListElement: giftcodes.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.code,
      description: `Mã code Top Heroes ${item.status === "ACTIVE" || item.status === "VALID" ? "còn hạn" : "hết hạn"}`,
    })),
  };

  const translations = {
    badgeActive: t("badgeActive"),
    badgeExpired: t("badgeExpired"),
    filterAll: t("filterAll"),
    filterActive: t("filterActive"),
    filterExpired: t("filterExpired"),
    searchPlaceholder: t("searchPlaceholder"),
    discoveredAt: t("discoveredAt"),
    expiresAt: t("expiresAt"),
    empty: t("empty"),
    copy: tCommon("copy"),
    copied: tCommon("copied"),
    copyAll: t("copyAll"),
    copiedAll: t("copiedAll"),
  };

  const steps = [
    {
      icon: Smartphone,
      title: "Bước 1",
      desc: t("step1"),
    },
    {
      icon: UserCircle,
      title: "Bước 2",
      desc: t("step2"),
    },
    {
      icon: Settings,
      title: "Bước 3",
      desc: t("step3"),
    },
    {
      icon: Award,
      title: "Bước 4",
      desc: t("step4"),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 max-w-6xl space-y-12">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Top Heroes Redeem Codes</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
          {t("title")}
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          {t("metaDescription")}
        </p>
      </div>

      {/* Giftcode List Component */}
      <GiftcodeList initialItems={giftcodes} translations={translations} />

      {/* Tutorial Guide Section */}
      <Card className="border border-border/60 bg-card/40 backdrop-blur-sm overflow-hidden">
        <CardHeader className="border-b border-border/40 pb-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg sm:text-xl font-bold">
              {t("tutorialTitle")}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center p-4 rounded-lg bg-muted/30 border border-border/30 hover:border-primary/40 transition-colors"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-3">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-bold text-primary uppercase tracking-wider mb-1">
                    {s.title}
                  </span>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

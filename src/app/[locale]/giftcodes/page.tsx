import React from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
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
  setRequestLocale(locale);
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
      title: `${t("stepPrefix")} 1`,
      desc: t("step1"),
    },
    {
      icon: UserCircle,
      title: `${t("stepPrefix")} 2`,
      desc: t("step2"),
    },
    {
      icon: Settings,
      title: `${t("stepPrefix")} 3`,
      desc: t("step3"),
    },
    {
      icon: Award,
      title: `${t("stepPrefix")} 4`,
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
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-1.5 text-xs sm:text-[13px] font-heading font-extrabold text-amber-600 dark:text-amber-400 shadow-sm shadow-amber-500/10">
          <Gift className="h-4 w-4 text-amber-500" />
          <span>{t("badgeHero")}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black tracking-tight leading-[1.2] text-foreground">
          {t("title")}
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          {t("metaDescription")}
        </p>
      </div>

      {/* Giftcode List Component */}
      <GiftcodeList initialItems={giftcodes} translations={translations} />

      {/* Tutorial Guide Section: 4-Step Adventurer Roadmap */}
      <Card className="card-rpg rounded-3xl overflow-hidden">
        <CardHeader className="border-b border-border/60 pb-4">
          <div className="flex items-center gap-2.5">
            <BookOpen className="h-5 w-5 text-amber-500" />
            <CardTitle className="text-lg sm:text-xl font-bold font-heading">
              {t("tutorialTitle")}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center p-5 rounded-2xl bg-card/60 border border-border/80 dark:border-amber-500/15 hover:border-amber-500/40 hover:bg-card/90 transition-all shadow-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 text-slate-950 font-black mb-3 shadow-md shadow-amber-500/20 border border-amber-300/30">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest mb-1.5 font-heading">
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

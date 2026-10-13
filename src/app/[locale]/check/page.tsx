import React, { Suspense } from "react";
import type { Metadata } from "next";
import { ShieldCheck, Loader2 } from "lucide-react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { CheckClient } from "@/components/check/check-client";

interface CheckPageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params: { locale } }: CheckPageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Check" });
  const title = `${t("title")} | TopHub`;
  const description = t("description");

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

export default async function CheckPage({ params: { locale } }: CheckPageProps) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Check" });

  return (
    <div className="container mx-auto px-4 py-8 sm:py-14 max-w-6xl space-y-10">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 shadow-sm shadow-amber-500/10">
          <ShieldCheck className="h-4 w-4 text-amber-500" />
          <span>{t("badge")}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-heading font-black tracking-wide text-foreground">
          {t("title")}
        </h1>
        <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
          {t("description")}
        </p>
      </div>

      {/* Interactive Search & Status Display */}
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-20 text-muted-foreground">
            <Loader2 className="h-7 w-7 animate-spin text-amber-500" />
          </div>
        }
      >
        <CheckClient locale={locale} />
      </Suspense>
    </div>
  );
}

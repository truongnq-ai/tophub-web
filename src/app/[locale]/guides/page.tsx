import React from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { GuideLocale } from "@/content/guides/types";
import { GuidesHubClient } from "@/components/guides/guides-hub-client";

interface GuidesHubPageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({
  params: { locale },
}: GuidesHubPageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Guides" });
  const title = `${t("hubTitle")} | TopHub`;
  const description = t("hubDescription");

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

export default async function GuidesHubPage({
  params: { locale },
}: GuidesHubPageProps) {
  setRequestLocale(locale);
  const safeLocale: GuideLocale = locale === "en" ? "en" : "vi";

  return <GuidesHubClient locale={safeLocale} />;
}

import React from "react";
import type { Metadata } from "next";
import Index from "./Index";

import { apiClient } from "@/lib/api-client";
import { buildPageAlternates } from "@/config/constants";
import type { SystemAnnouncement } from "@/config/announcements";

import { getTranslations, setRequestLocale } from "next-intl/server";

interface IndexPageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({
  params: { locale },
}: IndexPageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "LocaleLayout" });

  return {
    title: t("title"),
    description: t("metaDescription"),
    alternates: buildPageAlternates(locale, ""),
  };
}

export default async function IndexPage({ params: { locale } }: IndexPageProps) {
  setRequestLocale(locale);
  let initialActiveCodes: Array<{ code: string; status: string }> = [];
  let initialAnnouncements: SystemAnnouncement[] | undefined = undefined;

  const [codesSettled, annSettled] = await Promise.allSettled([
    apiClient.getPublicGiftcodes(1, 50),
    apiClient.getPublicAnnouncements(),
  ]);

  if (codesSettled.status === "fulfilled") {
    const response = codesSettled.value;
    if (response.success && response.data?.items) {
      const now = new Date();
      initialActiveCodes = response.data.items
        .filter((item) => {
          const isValidStatus = item.status === "ACTIVE" || item.status === "VALID";
          if (!isValidStatus) return false;

          const expiry = item.expires_at || item.valid_to;
          if (expiry) {
            const expDate = new Date(expiry);
            if (!isNaN(expDate.getTime()) && expDate <= now) {
              return false;
            }
          }
          return true;
        })
        .map((item) => ({
          code: item.code,
          status: item.status,
        }));
    }
  }

  if (annSettled.status === "fulfilled") {
    const annRes = annSettled.value;
    if (annRes.success && Array.isArray(annRes.data?.items)) {
      initialAnnouncements = annRes.data.items;
    }
  }

  return (
    <Index
      initialActiveCodes={initialActiveCodes}
      initialAnnouncements={initialAnnouncements}
    />
  );
}

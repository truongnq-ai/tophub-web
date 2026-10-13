import React from "react";
import Index from "./Index";

import { apiClient } from "@/lib/api-client";

import { setRequestLocale } from "next-intl/server";

interface IndexPageProps {
  params: {
    locale: string;
  };
}

export default async function IndexPage({ params: { locale } }: IndexPageProps) {
  setRequestLocale(locale);
  let initialActiveCodes: Array<{ code: string; status: string }> = [];

  try {
    const response = await apiClient.getPublicGiftcodes(1, 50);

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
  } catch {
    initialActiveCodes = [];
  }

  return <Index initialActiveCodes={initialActiveCodes} />;
}

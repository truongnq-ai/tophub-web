import React from "react";
import { setRequestLocale } from "next-intl/server";
import type { GuideLocale } from "@/content/guides/types";
import { GuidesShell } from "@/components/guides/guides-shell";

interface GuidesLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export default function GuidesLayout({
  children,
  params: { locale },
}: GuidesLayoutProps) {
  setRequestLocale(locale);
  const safeLocale: GuideLocale = locale === "en" ? "en" : "vi";

  return <GuidesShell locale={safeLocale}>{children}</GuidesShell>;
}

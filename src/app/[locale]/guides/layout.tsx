import React from "react";
import { setRequestLocale } from "next-intl/server";
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

  return <GuidesShell>{children}</GuidesShell>;
}

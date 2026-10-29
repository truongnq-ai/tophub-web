import React from "react";
import { setRequestLocale } from "next-intl/server";
import type { CalculatorLocale } from "@/content/calculators/types";
import { CalculatorsShell } from "@/components/calculators/calculators-shell";

interface CalculatorsLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export default function CalculatorsLayout({
  children,
  params: { locale },
}: CalculatorsLayoutProps) {
  setRequestLocale(locale);
  const safeLocale: CalculatorLocale = locale === "en" ? "en" : "vi";

  return <CalculatorsShell locale={safeLocale}>{children}</CalculatorsShell>;
}

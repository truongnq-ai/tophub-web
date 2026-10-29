import React from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CalculatorPlaceholderView } from "@/components/calculators/calculator-placeholder-view";

interface CalculatorsHubPageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({
  params: { locale },
}: CalculatorsHubPageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Calculators" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      type: "website",
      locale: locale === "vi" ? "vi_VN" : "en_US",
    },
  };
}

export default function CalculatorsHubPage({
  params: { locale },
}: CalculatorsHubPageProps) {
  setRequestLocale(locale);

  return <CalculatorPlaceholderView mode="hub" />;
}

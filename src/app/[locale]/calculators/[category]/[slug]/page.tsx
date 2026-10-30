import React from "react";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import {
  getAllCalculatorTools,
  getCalculatorToolBySlug,
} from "@/content/calculators/registry";
import type { CalculatorLocale } from "@/content/calculators/types";
import { CalculatorPlaceholderView } from "@/components/calculators/calculator-placeholder-view";

interface CalculatorToolPageProps {
  params: {
    locale: string;
    category: string;
    slug: string;
  };
}

export function generateStaticParams() {
  const tools = getAllCalculatorTools();
  return routing.locales.flatMap((locale) =>
    tools.map((tool) => ({
      locale,
      category: tool.categorySlug,
      slug: tool.slug,
    }))
  );
}

export async function generateMetadata({
  params: { locale, category, slug },
}: CalculatorToolPageProps): Promise<Metadata> {
  const resolved = getCalculatorToolBySlug(category, slug);
  if (!resolved) {
    return {
      title: "Not Found | TopHub Calculators",
    };
  }

  const safeLocale: CalculatorLocale = locale === "en" ? "en" : "vi";
  const title = `${resolved.tool.fullTitle[safeLocale]} | TopHub`;
  const description = resolved.tool.summary[safeLocale];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      locale: safeLocale === "vi" ? "vi_VN" : "en_US",
    },
  };
}

export default function CalculatorToolPage({
  params: { locale, category, slug },
}: CalculatorToolPageProps) {
  setRequestLocale(locale);
  if (category === "castle-tech" && slug === "main-castle") {
    redirect(`/${locale}/calculators/castle-tech/construction`);
  }

  const resolved = getCalculatorToolBySlug(category, slug);
  if (!resolved) {
    notFound();
  }

  return (
    <CalculatorPlaceholderView
      mode="tool"
      zone={resolved.zone}
      category={resolved.category}
      tool={resolved.tool}
    />
  );
}

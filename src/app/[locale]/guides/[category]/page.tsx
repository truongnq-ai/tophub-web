import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import {
  GUIDE_CATEGORIES,
  getAdjacentArticles,
  getCategoryBySlug,
} from "@/content/guides/registry";
import type { GuideLocale } from "@/content/guides/types";
import { GuideArticleRenderer } from "@/components/guides/guide-article-renderer";
import { GuidesToc } from "@/components/guides/guides-toc";

interface GuideCategoryPageProps {
  params: {
    locale: string;
    category: string;
  };
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    GUIDE_CATEGORIES.map((cat) => ({
      locale,
      category: cat.slug,
    }))
  );
}

export async function generateMetadata({
  params: { locale, category },
}: GuideCategoryPageProps): Promise<Metadata> {
  const categoryObj = getCategoryBySlug(category);
  if (!categoryObj) {
    return {
      title: "Not Found | TopHub Guides",
    };
  }

  const safeLocale: GuideLocale = locale === "en" ? "en" : "vi";
  const title = `${categoryObj.displayOrder}. ${categoryObj.title[safeLocale]} | TopHub`;
  const description = categoryObj.description[safeLocale];

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

export default function GuideCategoryPage({
  params: { locale, category },
}: GuideCategoryPageProps) {
  setRequestLocale(locale);

  const categoryObj = getCategoryBySlug(category);
  const firstArticle = categoryObj?.articles[0];

  if (!categoryObj || !firstArticle) {
    notFound();
  }

  const { prev, next } = getAdjacentArticles(category, firstArticle.slug);

  return (
    <div className="relative min-w-0 w-full">
      <GuidesToc article={firstArticle} />
      <GuideArticleRenderer
        category={categoryObj}
        article={firstArticle}
        prevArticle={prev}
        nextArticle={next}
      />
    </div>
  );
}

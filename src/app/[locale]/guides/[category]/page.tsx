import React from "react";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { buildPageAlternates } from "@/config/constants";
import { routing } from "@/i18n/routing";
import {
  getCategoryBySlug,
  getPublishedAdjacentArticles,
  getPublishedCategories,
  getPublishedCategoryBySlug,
  isGuideCategoryPublished,
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
  const publishedCategories = getPublishedCategories();
  return routing.locales.flatMap((locale) =>
    publishedCategories.map((cat) => ({
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
      title: "Not Found | Top Heroes Guides",
    };
  }

  const safeLocale: GuideLocale = locale === "en" ? "en" : "vi";
  const cleanCategoryTitle = categoryObj.title[safeLocale]
    .replace(/^\d+\.\s*/, "")
    .trim();
  const title =
    safeLocale === "en"
      ? `${cleanCategoryTitle} — Top Heroes Strategy Guide | TopHub`
      : `${cleanCategoryTitle} — Cẩm Nang Top Heroes | TopHub`;
  const description = categoryObj.description[safeLocale];
  const firstArticle = categoryObj.articles[0];
  const canonicalSubPath = firstArticle
    ? `/guides/${categoryObj.slug}/${firstArticle.slug}`
    : `/guides/${categoryObj.slug}`;

  return {
    title,
    description,
    alternates: buildPageAlternates(safeLocale, canonicalSubPath),
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
  const safeLocale: GuideLocale = locale === "en" ? "en" : "vi";

  const rawCategory = getCategoryBySlug(category);
  if (!rawCategory) {
    notFound();
  }

  if (!isGuideCategoryPublished(category)) {
    redirect(safeLocale === "en" ? "/en/guides" : "/guides");
  }

  const publishedCategory = getPublishedCategoryBySlug(category);
  const firstArticle = publishedCategory?.articles[0];

  if (!publishedCategory || !firstArticle) {
    redirect(safeLocale === "en" ? "/en/guides" : "/guides");
  }

  const { prev, next } = getPublishedAdjacentArticles(
    category,
    firstArticle.slug
  );

  return (
    <div className="relative min-w-0 w-full">
      <GuidesToc article={firstArticle} />
      <GuideArticleRenderer
        category={publishedCategory}
        article={firstArticle}
        prevArticle={prev}
        nextArticle={next}
      />
    </div>
  );
}

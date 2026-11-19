import React from "react";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { buildPageAlternates } from "@/config/constants";
import { routing } from "@/i18n/routing";
import {
  getArticleBySlug,
  getCategoryBySlug,
  getPublishedAdjacentArticles,
  getPublishedArticles,
  getPublishedCategoryBySlug,
  isGuideArticlePublished,
} from "@/content/guides/registry";
import type { GuideLocale } from "@/content/guides/types";
import { GuideArticleRenderer } from "@/components/guides/guide-article-renderer";
import { GuidesToc } from "@/components/guides/guides-toc";

interface GuideArticlePageProps {
  params: {
    locale: string;
    category: string;
    slug: string;
  };
}

export function generateStaticParams() {
  const articles = getPublishedArticles();
  return routing.locales.flatMap((locale) =>
    articles.map((article) => ({
      locale,
      category: article.categorySlug,
      slug: article.slug,
    }))
  );
}

export async function generateMetadata({
  params: { locale, category, slug },
}: GuideArticlePageProps): Promise<Metadata> {
  const article = getArticleBySlug(category, slug);
  if (!article) {
    return {
      title: "Not Found | Top Heroes Guides",
    };
  }

  const safeLocale: GuideLocale = locale === "en" ? "en" : "vi";
  const cleanArticleTitle =
    safeLocale === "vi"
      ? article.title.vi.replace(/\s*\([^)]*\)\s*$/, "").trim()
      : article.title.en.trim();
  const title =
    safeLocale === "en"
      ? `${cleanArticleTitle} — Top Heroes Guide | TopHub`
      : `${cleanArticleTitle} — Cẩm Nang Top Heroes | TopHub`;
  const description = article.summary[safeLocale];

  return {
    title,
    description,
    keywords: article.keywords,
    alternates: buildPageAlternates(
      safeLocale,
      `/guides/${article.categorySlug}/${article.slug}`
    ),
    openGraph: {
      title,
      description,
      type: "article",
      locale: safeLocale === "vi" ? "vi_VN" : "en_US",
    },
  };
}

export default function GuideArticlePage({
  params: { locale, category, slug },
}: GuideArticlePageProps) {
  setRequestLocale(locale);
  const safeLocale: GuideLocale = locale === "en" ? "en" : "vi";

  const rawCategory = getCategoryBySlug(category);
  const article = getArticleBySlug(category, slug);

  if (!rawCategory || !article) {
    notFound();
  }

  if (!isGuideArticlePublished(category, slug)) {
    redirect(safeLocale === "en" ? "/en/guides" : "/guides");
  }

  const publishedCategory = getPublishedCategoryBySlug(category) ?? rawCategory;
  const { prev, next } = getPublishedAdjacentArticles(category, slug);

  return (
    <div className="relative min-w-0 w-full">
      {article.status !== "shell" && <GuidesToc article={article} />}
      <GuideArticleRenderer
        category={publishedCategory}
        article={article}
        prevArticle={prev}
        nextArticle={next}
      />
    </div>
  );
}

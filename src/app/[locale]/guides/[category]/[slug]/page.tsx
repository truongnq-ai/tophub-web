import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import {
  getAdjacentArticles,
  getAllArticles,
  getArticleBySlug,
  getCategoryBySlug,
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
  const articles = getAllArticles();
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
      title: "Not Found | TopHub Guides",
    };
  }

  const safeLocale: GuideLocale = locale === "en" ? "en" : "vi";
  const title = `${article.code} ${article.title[safeLocale]} | TopHub`;
  const description = article.summary[safeLocale];

  return {
    title,
    description,
    keywords: article.keywords,
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

  const categoryObj = getCategoryBySlug(category);
  const article = getArticleBySlug(category, slug);

  if (!categoryObj || !article) {
    notFound();
  }

  const { prev, next } = getAdjacentArticles(category, slug);

  return (
    <div className="flex flex-col xl:flex-row xl:items-start gap-4 xl:gap-8">
      <GuidesToc article={article} />
      <div className="flex-1 min-w-0 xl:order-1">
        <GuideArticleRenderer
          category={categoryObj}
          article={article}
          prevArticle={prev}
          nextArticle={next}
        />
      </div>
    </div>
  );
}

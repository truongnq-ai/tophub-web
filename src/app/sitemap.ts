import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/config/constants";
import { getAllCalculatorTools } from "@/content/calculators/registry";
import {
  getPublishedArticles,
  isCodexPublished,
} from "@/content/guides/registry";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const now = new Date();

  const staticPaths: Array<{
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }> = [
    { path: "", priority: 1.0, changeFrequency: "daily" },
    { path: "/calculators", priority: 0.9, changeFrequency: "weekly" },
    { path: "/guides", priority: 0.9, changeFrequency: "weekly" },
    ...(isCodexPublished()
      ? [{ path: "/guides/codex", priority: 0.85, changeFrequency: "weekly" as const }]
      : []),
    { path: "/check", priority: 0.8, changeFrequency: "daily" },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  ];

  const entries: MetadataRoute.Sitemap = [];

  const pushLocalizedPair = (
    subPath: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]
  ) => {
    const viUrl = `${siteUrl}${subPath}`;
    const enUrl = `${siteUrl}/en${subPath}`;

    entries.push({
      url: viUrl,
      lastModified: now,
      changeFrequency,
      priority,
      alternates: {
        languages: {
          vi: viUrl,
          en: enUrl,
        },
      },
    });

    entries.push({
      url: enUrl,
      lastModified: now,
      changeFrequency,
      priority,
      alternates: {
        languages: {
          vi: viUrl,
          en: enUrl,
        },
      },
    });
  };

  for (const item of staticPaths) {
    pushLocalizedPair(item.path, item.priority, item.changeFrequency);
  }

  for (const tool of getAllCalculatorTools()) {
    pushLocalizedPair(
      `/calculators/${tool.categorySlug}/${tool.slug}`,
      0.85,
      "weekly"
    );
  }

  for (const article of getPublishedArticles()) {
    pushLocalizedPair(
      `/guides/${article.categorySlug}/${article.slug}`,
      0.8,
      "weekly"
    );
  }

  return entries;
}

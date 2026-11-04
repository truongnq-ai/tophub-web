import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/config/constants";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/admin/",
        "/vi/admin/",
        "/en/admin/",
        "/dashboard",
        "/vi/dashboard",
        "/en/dashboard",
      ],
    },
    host: siteUrl,
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

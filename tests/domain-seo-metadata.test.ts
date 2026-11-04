import { describe, expect, it, vi, afterEach } from "vitest";

vi.mock("next/font/google", () => ({
  Nunito: () => ({ variable: "font-heading" }),
  Be_Vietnam_Pro: () => ({ variable: "font-sans" }),
  JetBrains_Mono: () => ({ variable: "font-mono" }),
}));

vi.mock("next-intl/server", () => ({
  getTranslations: vi.fn(async ({ locale }: { locale: string }) => {
    return (key: string) => (locale === "en" ? `EN_${key}` : `VI_${key}`);
  }),
  getMessages: vi.fn(async () => ({})),
  setRequestLocale: vi.fn(),
}));

vi.mock("next-auth", () => ({
  getServerSession: vi.fn(async () => null),
}));

vi.mock("@/auth", () => ({
  authOptions: {},
}));

import {
  DEFAULT_SITE_URL,
  getSiteUrl,
  buildPageAlternates,
} from "@/config/constants";
import { generateMetadata as generateLayoutMetadata } from "@/app/[locale]/layout";
import { generateMetadata as generateHomeMetadata } from "@/app/[locale]/page";
import { generateMetadata as generateCalcHubMetadata } from "@/app/[locale]/calculators/page";
import { generateMetadata as generateCalcToolMetadata } from "@/app/[locale]/calculators/[category]/[slug]/page";
import { generateMetadata as generateGuidesHubMetadata } from "@/app/[locale]/guides/page";
import { generateMetadata as generateGuidesCodexMetadata } from "@/app/[locale]/guides/codex/page";
import { generateMetadata as generateGuideCategoryMetadata } from "@/app/[locale]/guides/[category]/page";
import { generateMetadata as generateGuideArticleMetadata } from "@/app/[locale]/guides/[category]/[slug]/page";
import { generateMetadata as generateGiftcodesMetadata } from "@/app/[locale]/giftcodes/page";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";

describe("TopHeroHub Domain & Per-Route Canonical Metadata SSoT", () => {
  const originalSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  afterEach(() => {
    if (originalSiteUrl === undefined) {
      delete process.env.NEXT_PUBLIC_SITE_URL;
    } else {
      process.env.NEXT_PUBLIC_SITE_URL = originalSiteUrl;
    }
  });

  it("resolves default canonical site URL to https://topherohub.com when env is unset or invalid", () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    expect(DEFAULT_SITE_URL).toBe("https://topherohub.com");
    expect(getSiteUrl()).toBe("https://topherohub.com");

    process.env.NEXT_PUBLIC_SITE_URL = "https://topherohub.com///";
    expect(getSiteUrl()).toBe("https://topherohub.com");

    process.env.NEXT_PUBLIC_SITE_URL = "ftp://invalid-protocol.com";
    expect(getSiteUrl()).toBe("https://topherohub.com");

    process.env.NEXT_PUBLIC_SITE_URL = "not-a-valid-url";
    expect(getSiteUrl()).toBe("https://topherohub.com");
  });

  it("builds accurate bilingual canonical and hreflang alternates for root and sub-routes", () => {
    expect(buildPageAlternates("vi", "")).toEqual({
      canonical: "/",
      languages: { vi: "/", en: "/en", "x-default": "/" },
    });
    expect(buildPageAlternates("en", "/")).toEqual({
      canonical: "/en",
      languages: { vi: "/", en: "/en", "x-default": "/" },
    });
    expect(
      buildPageAlternates("vi", "/calculators/heroes/hero-stars")
    ).toEqual({
      canonical: "/calculators/heroes/hero-stars",
      languages: {
        vi: "/calculators/heroes/hero-stars",
        en: "/en/calculators/heroes/hero-stars",
        "x-default": "/calculators/heroes/hero-stars",
      },
    });
    expect(
      buildPageAlternates("en", "calculators/heroes/hero-stars/")
    ).toEqual({
      canonical: "/en/calculators/heroes/hero-stars",
      languages: {
        vi: "/calculators/heroes/hero-stars",
        en: "/en/calculators/heroes/hero-stars",
        "x-default": "/calculators/heroes/hero-stars",
      },
    });
  });

  it("sets metadataBase on LocaleLayout without hardcoding root canonical that would pollute child routes", async () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    const layoutMeta = await generateLayoutMetadata({
      params: { locale: "vi" },
    });
    expect(layoutMeta.metadataBase?.toString()).toBe(
      "https://topherohub.com/"
    );
    expect(layoutMeta.alternates).toBeUndefined();

    const homeViMeta = await generateHomeMetadata({
      params: { locale: "vi" },
    });
    expect(homeViMeta.alternates?.canonical).toBe("/");

    const homeEnMeta = await generateHomeMetadata({
      params: { locale: "en" },
    });
    expect(homeEnMeta.alternates?.canonical).toBe("/en");
  });

  it("resolves canonical URLs for hubs, calculator tools, guide category aliases, guide article aliases, and giftcodes", async () => {
    const calcHubMeta = await generateCalcHubMetadata({
      params: { locale: "vi" },
    });
    expect(calcHubMeta.alternates?.canonical).toBe("/calculators");

    const calcMeta = await generateCalcToolMetadata({
      params: { locale: "en", category: "castle-tech", slug: "main-castle" },
    });
    expect(calcMeta.alternates?.canonical).toBe(
      "/en/calculators/castle-tech/construction"
    );

    const guidesHubMeta = await generateGuidesHubMetadata({
      params: { locale: "en" },
    });
    expect(guidesHubMeta.alternates?.canonical).toBe("/en/guides");

    const codexMeta = await generateGuidesCodexMetadata({
      params: { locale: "vi" },
    });
    expect(codexMeta.alternates?.canonical).toBe("/guides/codex");

    const catMeta = await generateGuideCategoryMetadata({
      params: { locale: "vi", category: "getting-started" },
    });
    expect(catMeta.alternates?.canonical).toBe(
      "/guides/getting-started/overview"
    );

    const aliasArticleMeta = await generateGuideArticleMetadata({
      params: {
        locale: "vi",
        category: "roadmap",
        slug: "horde-pivot-roadmap",
      },
    });
    expect(aliasArticleMeta.alternates?.canonical).toBe(
      "/guides/roadmap/horde-progression-playbook"
    );

    const aliasCatAndArtMeta = await generateGuideArticleMetadata({
      params: {
        locale: "en",
        category: "event-list",
        slug: "s0-major-point-races",
      },
    });
    expect(aliasCatAndArtMeta.alternates?.canonical).toBe(
      "/en/guides/event-playbooks/timeline-and-rules"
    );

    const giftcodesMeta = await generateGiftcodesMetadata({
      params: { locale: "en" },
    });
    expect(giftcodesMeta.alternates?.canonical).toBe("/en/giftcodes");
  });
});

describe("TopHeroHub robots.txt and deduplicated sitemap.xml generation", () => {
  it("generates robots.txt pointing to https://topherohub.com/sitemap.xml and disallowing private routes", () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    const result = robots();
    expect(result.sitemap).toBe("https://topherohub.com/sitemap.xml");
    expect(result.host).toBe("https://topherohub.com");
    expect(result.rules).toEqual({
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
    });
  });

  it("generates deduplicated sitemap.xml with canonical https://topherohub.com URLs and zero category-only duplicates", () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    const entries = sitemap();
    const urls = entries.map((e) => e.url);
    const uniqueUrls = new Set(urls);

    expect(urls.length).toBe(uniqueUrls.size);
    expect(urls).toContain("https://topherohub.com");
    expect(urls).toContain("https://topherohub.com/en");
    expect(urls).toContain("https://topherohub.com/calculators");
    expect(urls).toContain("https://topherohub.com/guides");
    expect(urls).toContain("https://topherohub.com/guides/codex");
    expect(urls).toContain("https://topherohub.com/giftcodes");
    expect(urls).toContain(
      "https://topherohub.com/calculators/heroes/hero-stars"
    );
    expect(urls).toContain(
      "https://topherohub.com/guides/getting-started/overview"
    );
    expect(urls).not.toContain(
      "https://topherohub.com/guides/getting-started"
    );
    expect(
      urls.every((u) => u.startsWith("https://topherohub.com"))
    ).toBe(true);
    expect(
      urls.some((u) => u.includes("/admin") || u.includes("/dashboard"))
    ).toBe(false);
  });
});

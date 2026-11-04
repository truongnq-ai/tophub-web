import type { Metadata } from "next";

export const DEFAULT_SITE_URL = "https://topherohub.com";

/**
 * Resolves the canonical public site origin without trailing slash.
 * Falls back safely to https://topherohub.com if NEXT_PUBLIC_SITE_URL is unset or malformed.
 */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return DEFAULT_SITE_URL;
  try {
    const parsed = new URL(raw);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return DEFAULT_SITE_URL;
    }
    return parsed.origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

/**
 * Builds Next.js Metadata.alternates with locale-aware canonical and hreflang paths.
 * Respects next-intl `localePrefix: "as-needed"` (`vi` at `/...`, `en` at `/en/...`).
 */
export function buildPageAlternates(
  locale: string,
  subPath = ""
): NonNullable<Metadata["alternates"]> {
  const normalizedSub = subPath
    .trim()
    .replace(/^\/+/, "")
    .replace(/\/+$/, "");
  const viPath = normalizedSub ? `/${normalizedSub}` : "/";
  const enPath = normalizedSub ? `/en/${normalizedSub}` : "/en";

  return {
    canonical: locale === "en" ? enPath : viPath,
    languages: {
      vi: viPath,
      en: enPath,
      "x-default": viPath,
    },
  };
}

export const GITHUB_REPO_LINK = "https://github.com/emenems/nextjs-template"
export const LINKEDIN_LINK = "https://www.linkedin.com/"
export const TWITTER_LINK = "https://twitter.com/"
export const INSTAGRAM_LINK = "https://www.instagram.com/"
export const FACEBOOK_LINK = "https://www.facebook.com/"

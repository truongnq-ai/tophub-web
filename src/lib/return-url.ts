/**
 * @description Validates that a returnUrl points strictly to an internal path within the application.
 * Prevents Open Redirect vulnerabilities.
 * @param {string | null | undefined} raw - Raw returnUrl query parameter.
 * @returns {string | null} Safe internal path or null if invalid.
 */
export function sanitizeReturnUrl(raw: string | null | undefined): string | null {
  if (!raw || typeof raw !== "string") return null;
  const trimmed = raw.trim();
  if (!trimmed.startsWith("/")) return null;
  if (trimmed.startsWith("//") || trimmed.includes("\\")) return null;
  if (/^\/[a-z]+:/i.test(trimmed)) return null;
  return trimmed;
}

/**
 * @description Deterministically constructs the internal return URL for a guide pageKey and locale
 * without relying on Next.js router hooks so SSG and unit tests remain 100% isolated.
 * @param {string} pageKey - Standardized guide page key (e.g. "guides:hub" or "guides:heroes/encyclopedia").
 * @param {"vi" | "en"} locale - Current active locale.
 * @returns {string} Internal path with #comments anchor.
 */
export function buildGuideReturnUrl(
  pageKey: string,
  locale: "vi" | "en" = "vi"
): string {
  const safeLocale = locale === "en" ? "en" : "vi";
  if (pageKey === "guides:hub") {
    return `/${safeLocale}/guides#comments`;
  }
  const slugPath = pageKey.replace(/^guides:/i, "").replace(/^\/+/, "");
  return `/${safeLocale}/guides/${slugPath}#comments`;
}

/**
 * @description Safely redirects the browser to a validated internal return URL.
 * @param {string} safeUrl - Validated internal URL.
 */
export function navigateToReturnUrl(safeUrl: string): void {
  const clean = sanitizeReturnUrl(safeUrl);
  if (!clean || typeof window === "undefined") return;
  window.location.assign(clean);
}

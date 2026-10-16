import { NextRequest } from "next/server";
import { withAuth } from "next-auth/middleware";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const publicPages = [
  "/",
  "/guides",
  "/giftcodes",
  "/pricing",
  "/login",
  "/terms",
  "/privacy",
  "/check",
  "/admin/login",
  "/admin/dashboard",
];

const intlMiddleware = createMiddleware(routing);

const authMiddleware = withAuth(
  (req) => intlMiddleware(req),
  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
    pages: {
      signIn: "/login",
    },
  }
);

export default function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Extract path without locale prefix (e.g., /en/admin/login -> /admin/login)
  const pathnameWithoutLocale =
    pathname.replace(new RegExp(`^/(${routing.locales.join("|")})`), "") || "/";

  const isPublicPage = publicPages.some((page) =>
    page === "/" ? pathnameWithoutLocale === "/" : pathnameWithoutLocale.startsWith(page)
  );

  if (isPublicPage) {
    return intlMiddleware(req);
  }
  return (authMiddleware as any)(req);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};

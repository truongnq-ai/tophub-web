import React from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Heart } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";

export function Footer() {
  const tNav = useTranslations("Navigation");
  const tFooter = useTranslations("Footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border/80 dark:border-amber-500/15 bg-muted/20 dark:bg-card/40 py-12 mt-auto">
      <div className="container mx-auto px-3 sm:px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand info */}
          <div className="space-y-3">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <BrandLogo size="sm" />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {tFooter("brandDesc")}
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed rounded-xl border border-amber-500/20 bg-amber-500/5 px-3 py-2">
              {tFooter("disclaimer")}
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-3 md:pl-8">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground font-heading">
              {tFooter("featuredFeatures")}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/calculators"
                  className="inline-flex items-center gap-2 min-h-[44px] sm:min-h-0 py-1 text-muted-foreground hover:text-amber-500 dark:hover:text-amber-400 transition-colors font-semibold"
                >
                  <span>{tNav("calculators")}</span>
                  <span
                    data-testid="footer-calculators-new-badge"
                    className="rounded-full bg-amber-500/20 border border-amber-500/40 px-2 py-0.5 font-sans text-xs font-bold uppercase leading-none text-amber-600 dark:text-amber-400"
                  >
                    {tNav("calculatorsNewBadge")}
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/giftcodes"
                  className="inline-flex items-center min-h-[44px] sm:min-h-0 py-1 text-muted-foreground hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
                >
                  {tNav("giftcodes")} 2026
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="inline-flex items-center min-h-[44px] sm:min-h-0 py-1 text-muted-foreground hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
                >
                  {tFooter("autoCheckin247")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal and Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground font-heading">
              {tFooter("legalAndSupport")}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/terms"
                  className="inline-flex items-center min-h-[44px] sm:min-h-0 py-1 text-muted-foreground hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
                >
                  {tFooter("terms")}
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="inline-flex items-center min-h-[44px] sm:min-h-0 py-1 text-muted-foreground hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
                >
                  {tFooter("privacy")}
                </Link>
              </li>
              <li>
                <a
                  href="https://discord.gg/topheroes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center min-h-[44px] sm:min-h-0 py-1 text-muted-foreground hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
                >
                  {tFooter("discordCommunity")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>{tFooter("copyright", { year: currentYear })}</p>
          <p className="flex items-center gap-1.5">
            <span>{tFooter("builtWithLove")}</span>
            <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500 shrink-0" />
          </p>
        </div>
      </div>
    </footer>
  );
}

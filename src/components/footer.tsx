import React from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Shield, Heart } from "lucide-react";

export function Footer() {
  const tNav = useTranslations("Navigation");
  const tFooter = useTranslations("Footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border/80 dark:border-amber-500/15 bg-muted/20 dark:bg-card/40 py-12 mt-auto">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand info */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 text-slate-950 font-bold shadow-sm shadow-amber-500/20 group-hover:scale-105 transition-transform">
                <Shield className="h-4 w-4 fill-current" />
              </div>
              <span className="font-heading font-black text-lg text-foreground tracking-wide group-hover:text-amber-500 transition-colors">
                {tFooter("title")}
              </span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {tFooter("brandDesc")}
            </p>
            <p className="text-[11px] text-muted-foreground leading-relaxed border-l-2 border-amber-500/50 pl-2.5 py-1 bg-amber-500/5 rounded-r">
              {tFooter("disclaimer")}
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-3 md:pl-8">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground font-heading">
              {tFooter("featuredFeatures")}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/guides" className="text-muted-foreground hover:text-amber-500 dark:hover:text-amber-400 transition-colors font-semibold">
                  {tNav("guides")} (S0 ➔ S4)
                </Link>
              </li>
              <li>
                <Link href="/giftcodes" className="text-muted-foreground hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
                  {tNav("giftcodes")} 2026
                </Link>
              </li>
              <li>
                <Link href="/" className="text-muted-foreground hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
                  {tFooter("autoCheckin247")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal and Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground font-heading">
              {tFooter("legalAndSupport")}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
                  {tFooter("terms")}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
                  {tFooter("privacy")}
                </Link>
              </li>
              <li>
                <a
                  href="https://discord.gg/topheroes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
                >
                  {tFooter("discordCommunity")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>{tFooter("copyright", { year: currentYear })}</p>
          <p className="flex items-center gap-1">
            <span>{tFooter("builtWithLove")}</span>
            <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}

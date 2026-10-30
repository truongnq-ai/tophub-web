"use client";

import React from "react";
import { Crown, Lock, Sparkles, UserCheck, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useUidSession } from "@/hooks/use-uid-session";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProContentGateProps {
  children: React.ReactNode;
}

export function ProContentGate({ children }: ProContentGateProps) {
  const t = useTranslations("Guides");
  const { activeAccount } = useUidSession();

  const isLockEnabled =
    process.env.NEXT_PUBLIC_ENABLE_PRO_CONTENT_LOCK === "true";
  const hasProAccess =
    !isLockEnabled || activeAccount?.active_plan === "PRO";

  if (hasProAccess) {
    return (
      <section className="border-t-2 border-amber-500/35 bg-transparent px-0 pt-5 pb-2 sm:rounded-3xl sm:border sm:border-amber-500/35 sm:bg-gradient-to-b sm:from-amber-500/10 sm:via-card/80 sm:to-card/90 sm:p-7 space-y-6 sm:shadow-md sm:shadow-amber-500/5">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-amber-500/20">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 shadow-sm">
              <Crown className="h-5 w-5 fill-current" />
            </div>
            <div>
              <h3 className="font-heading font-black text-base sm:text-lg text-foreground">
                {t("proPreviewHeader")}
              </h3>
              <p className="text-sm sm:text-base font-sans text-amber-600 dark:text-amber-400 font-medium leading-relaxed">
                {t("proPreviewSubtext")}
              </p>
            </div>
          </div>

          <Badge className="border-0 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold px-3 py-1 flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            <span>PRO Preview</span>
          </Badge>
        </div>

        <div className="space-y-6">{children}</div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden rounded-3xl border border-amber-500/40 bg-card/90 p-4 sm:p-7 shadow-lg">
      {/* Blurred preview background */}
      <div
        aria-hidden="true"
        className="blur-md select-none pointer-events-none opacity-40 max-h-64 overflow-hidden"
      >
        {children}
      </div>

      {/* Paywall CTA Overlay */}
      <div className="relative z-10 -mt-32 rounded-2xl border border-amber-500/40 bg-background/95 backdrop-blur-xl p-4 sm:p-6 text-center space-y-4 shadow-2xl max-w-xl mx-auto">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 shadow-md shadow-amber-500/20">
          <Lock className="h-6 w-6" />
        </div>

        <div className="space-y-1.5">
          <h3 className="font-heading font-black text-lg sm:text-xl text-foreground">
            {t("proLockedTitle")}
          </h3>
          <p className="text-sm sm:text-base font-sans text-muted-foreground leading-relaxed">
            {t("proLockedDesc")}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button
            asChild
            variant="outline"
            className="w-full sm:w-auto min-h-[44px] rounded-xl font-bold border-amber-500/30 hover:bg-amber-500/10"
          >
            <Link href="/">
              <UserCheck className="h-4 w-4 mr-2 text-amber-500" />
              <span>{t("proLockedCheckUidBtn")}</span>
            </Link>
          </Button>
          <Button
            asChild
            className="w-full sm:w-auto btn-tactile-gold min-h-[44px] rounded-xl font-bold px-6"
          >
            <Link href="/pricing">
              <Crown className="h-4 w-4 mr-2 text-slate-950" />
              <span>{t("proLockedUpgradeBtn")}</span>
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

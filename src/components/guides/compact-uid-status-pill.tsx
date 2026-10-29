"use client";

import React from "react";
import { ArrowUpRight, Crown, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useUidSession } from "@/hooks/use-uid-session";
import { cn, formatServerCode } from "@/lib/utils";

interface CompactUidStatusPillProps {
  className?: string;
  onNavigate?: () => void;
}

export function CompactUidStatusPill({
  className,
  onNavigate,
}: CompactUidStatusPillProps) {
  const t = useTranslations("Guides");
  const { activeAccount, isLoaded } = useUidSession();

  if (isLoaded && activeAccount) {
    const isPro = activeAccount.active_plan === "PRO";
    return (
      <Link
        href="/"
        onClick={onNavigate}
        title={t("uidPillManageBot")}
        className={cn(
          "group flex items-center justify-between gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10 hover:border-emerald-500/50 px-3 py-2 text-xs transition-all min-h-[44px]",
          className
        )}
      >
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="h-2 w-2 rounded-full bg-emerald-500 shrink-0 animate-pulse"
            aria-hidden="true"
          />
          <span className="font-heading font-bold text-foreground truncate">
            {activeAccount.nickname}
          </span>
          <span className="font-mono text-xs text-muted-foreground shrink-0">
            • {formatServerCode(activeAccount.server_id)}
          </span>
        </div>

        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-md px-2 py-0.5 font-sans text-xs font-bold shrink-0",
            isPro
              ? "bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30"
              : "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
          )}
        >
          {isPro && <Crown className="h-3 w-3 fill-current" />}
          {isPro ? "PRO" : "Bot 24/7"}
        </span>
      </Link>
    );
  }

  return (
    <Link
      href="/"
      onClick={onNavigate}
      className={cn(
        "group flex items-center justify-between gap-2 rounded-xl border border-amber-500/35 bg-amber-500/10 hover:bg-amber-500/15 px-3 py-2 text-xs font-bold text-amber-600 dark:text-amber-400 transition-all min-h-[44px]",
        className
      )}
    >
      <span className="flex items-center gap-1.5 truncate">
        <Sparkles className="h-3.5 w-3.5 text-amber-500 shrink-0" />
        <span className="truncate">{t("uidPillLinkAccount")}</span>
      </span>
      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}

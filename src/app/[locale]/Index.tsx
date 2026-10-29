"use client";

import React from "react";
import { useUidSession } from "@/hooks/use-uid-session";
import { UidEnrollForm } from "@/components/home/uid-enroll-form";
import { UidControlDashboard } from "@/components/home/uid-control-dashboard";
import { HomeAnnouncementTicker } from "@/components/home/home-announcement-ticker";
import { Loader2 } from "lucide-react";

import { useTranslations } from "next-intl";

interface LandingPageProps {
  initialActiveCodes?: Array<{ code: string; status: string }>;
}

export default function LandingPage({ initialActiveCodes }: LandingPageProps) {
  const t = useTranslations("Home");
  const { activeAccount, isLoaded } = useUidSession();

  return (
    <div className="relative overflow-hidden min-h-[calc(100vh-8rem)]">
      {/* Full-width RPG Broadcast Announcement Ticker under Header (DEC-ANN-01) */}
      <HomeAnnouncementTicker />

      {/* Background ambient campfire light */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[650px] sm:w-[800px] h-[420px] bg-gradient-to-tr from-amber-500/20 via-amber-600/10 to-transparent blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="container mx-auto px-3 sm:px-6 py-6 sm:py-12 max-w-6xl">
        {!isLoaded ? (
          <div className="flex flex-col items-center justify-center py-24 text-muted-foreground gap-3">
            <Loader2 className="h-7 w-7 animate-spin text-amber-500" />
            <span className="text-sm font-medium">{t("loadingAccount")}</span>
          </div>
        ) : activeAccount ? (
          <UidControlDashboard account={activeAccount} initialActiveCodes={initialActiveCodes} />
        ) : (
          <UidEnrollForm initialActiveCodes={initialActiveCodes} />
        )}
      </div>
    </div>
  );
}

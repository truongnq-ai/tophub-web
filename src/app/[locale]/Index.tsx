"use client";

import React from "react";
import { useUidSession } from "@/hooks/use-uid-session";
import { UidEnrollForm } from "@/components/home/uid-enroll-form";
import { UidControlDashboard } from "@/components/home/uid-control-dashboard";
import { Loader2 } from "lucide-react";

interface LandingPageProps {
  initialActiveCodes?: Array<{ code: string; status: string }>;
}

export default function LandingPage({ initialActiveCodes }: LandingPageProps) {
  const { activeAccount, isLoaded } = useUidSession();

  return (
    <div className="relative overflow-hidden min-h-[calc(100vh-8rem)]">
      {/* Background ambient campfire light */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[650px] sm:w-[800px] h-[420px] bg-gradient-to-tr from-amber-500/20 via-amber-600/10 to-transparent blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="container mx-auto px-4 py-6 sm:py-12 max-w-6xl">
        {!isLoaded ? (
          <div className="flex flex-col items-center justify-center py-24 text-muted-foreground gap-3">
            <Loader2 className="h-7 w-7 animate-spin text-amber-500" />
            <span className="text-xs font-mono">Đang tải tài khoản...</span>
          </div>
        ) : activeAccount ? (
          <UidControlDashboard account={activeAccount} />
        ) : (
          <UidEnrollForm initialActiveCodes={initialActiveCodes} />
        )}
      </div>
    </div>
  );
}

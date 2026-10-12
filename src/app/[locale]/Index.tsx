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
      {/* Background ambient light */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-primary/20 via-purple-600/10 to-amber-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="container mx-auto px-4 py-6 sm:py-12 max-w-6xl">
        {!isLoaded ? (
          <div className="flex flex-col items-center justify-center py-24 text-muted-foreground gap-3">
            <Loader2 className="h-7 w-7 animate-spin text-primary" />
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

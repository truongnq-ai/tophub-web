/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { User, Sparkles, Clock, Crown, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { UserProfileResponse } from "@/types/api";

interface UserStatusCardProps {
  profile: UserProfileResponse;
  discordUser?: {
    name?: string | null;
    image?: string | null;
  };
  labels: {
    welcome: string;
    planStatus: string;
    daysLeft: string;
    trialBadge: string;
    trialBanner: string;
  };
}

export function UserStatusCard({ profile, discordUser, labels }: UserStatusCardProps) {
  const isPro = profile.active_plan === "PRO";
  const isTrial = profile.subscription?.source === "TRIAL";

  // Calculate remaining days (guaranteed clamped to 0)
  let daysRemaining = 0;
  const totalPeriodDays = isTrial ? 7 : 30;
  if (profile.subscription?.ends_at) {
    const end = new Date(profile.subscription.ends_at).getTime();
    const now = Date.now();
    const diff = end - now;
    if (diff > 0) {
      daysRemaining = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    }
  }

  const daysLeftText = labels.daysLeft.replace("{days}", daysRemaining.toString());
  const subscriptionProgress = Math.min(100, Math.max(5, Math.round((daysRemaining / totalPeriodDays) * 100)));

  return (
    <div className="space-y-4">
      {/* 7-Day Trial Promotional Alert */}
      {isTrial && (
        <div className="flex items-center gap-3 rounded-2xl border border-purple-500/30 bg-purple-950/20 backdrop-blur-md p-4 text-sm text-foreground shadow-[0_0_25px_rgba(124,58,237,0.15)]">
          <div className="h-8 w-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="font-semibold text-slate-200">{labels.trialBanner}</span>
        </div>
      )}

      {/* Main Profile & Plan Status Card */}
      <Card className="border border-white/10 bg-slate-900/60 backdrop-blur-xl relative overflow-hidden rounded-2xl shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <CardContent className="p-4 sm:p-6 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* User Info */}
            <div className="flex items-center gap-4">
              <div className="relative">
                {discordUser?.image ? (
                  <img
                    src={discordUser.image}
                    alt={discordUser.name || "Discord User"}
                    className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl border-2 border-purple-500/40 object-cover shadow-[0_0_20px_rgba(124,58,237,0.25)]"
                  />
                ) : (
                  <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-purple-500/10 border-2 border-purple-500/30 text-purple-400">
                    <User className="h-8 w-8" />
                  </div>
                )}
                {isPro && (
                  <div className="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md ring-2 ring-slate-900">
                    <Crown className="h-3.5 w-3.5 fill-current" />
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                  {labels.welcome},
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-foreground">
                  {discordUser?.name || "Chiến Binh Top Heroes"}
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5 font-mono">
                    <span>Discord ID:</span>
                    <span className="select-all font-bold text-foreground/90 bg-white/5 px-2 py-0.5 rounded">
                      {profile.discord_id}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span>Tự động săn 24/7</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Plan Status Widget (Tonal sub-surface on mobile, bordered on sm+) */}
            <div className="flex flex-col sm:items-end justify-center rounded-2xl bg-slate-950/60 p-4 border-0 sm:border sm:border-white/5 space-y-3 min-w-[240px]">
              <div className="flex items-center justify-between w-full sm:justify-end gap-2">
                <span className="text-xs text-muted-foreground font-medium sm:hidden">
                  {labels.planStatus}
                </span>
                <div className="flex items-center gap-2">
                  {isPro ? (
                    <Badge className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black px-3 py-1 gap-1.5 text-xs shadow-md shadow-purple-600/30">
                      <Zap className="h-3.5 w-3.5 fill-current text-amber-300" />
                      <span>TopHub PRO</span>
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="font-bold text-xs bg-white/10 text-slate-300">
                      Gói Miễn Phí
                    </Badge>
                  )}

                  {isTrial && (
                    <Badge variant="outline" className="border-sky-500/40 text-sky-400 bg-sky-500/10 font-black text-xs uppercase tracking-wider">
                      {labels.trialBadge}
                    </Badge>
                  )}
                </div>
              </div>

              {isPro && (
                <div className="w-full space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-1 font-medium">
                      <Clock className="h-3.5 w-3.5 text-purple-400" />
                      <span>{daysLeftText}</span>
                    </div>
                    <span className="font-mono font-bold text-purple-300">{subscriptionProgress}%</span>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-500"
                      style={{ width: `${subscriptionProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { User, ShieldCheck, Sparkles, Clock, Crown, Zap } from "lucide-react";
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

  // Calculate remaining days
  let daysRemaining = 0;
  if (profile.subscription?.ends_at) {
    const end = new Date(profile.subscription.ends_at).getTime();
    const now = Date.now();
    const diff = end - now;
    if (diff > 0) {
      daysRemaining = Math.ceil(diff / (1000 * 60 * 60 * 24));
    }
  }

  const daysLeftText = labels.daysLeft.replace("{days}", daysRemaining.toString());

  return (
    <div className="space-y-4">
      {/* 7-Day Trial Promotional Alert */}
      {isTrial && (
        <div className="flex items-center gap-3 rounded-xl border border-primary/40 bg-primary/10 p-4 text-xs sm:text-sm text-foreground">
          <Sparkles className="h-5 w-5 text-primary shrink-0" />
          <span className="font-medium">{labels.trialBanner}</span>
        </div>
      )}

      {/* Main Profile & Plan Status Card */}
      <Card className="border border-border/60 bg-card/60 backdrop-blur-sm overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            {/* User Info */}
            <div className="flex items-center gap-4">
              <div className="relative">
                {discordUser?.image ? (
                  <img
                    src={discordUser.image}
                    alt={discordUser.name || "Discord User"}
                    className="h-16 w-16 rounded-full border-2 border-primary/40 object-cover shadow-sm"
                  />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 border-2 border-primary/20 text-primary">
                    <User className="h-8 w-8" />
                  </div>
                )}
                {isPro && (
                  <div className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-white shadow-md">
                    <Crown className="h-3.5 w-3.5" />
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <div className="text-xs text-muted-foreground font-medium">
                  {labels.welcome},
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-foreground">
                  {discordUser?.name || "Chiến Binh Top Heroes"}
                </h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                  <span>Discord ID:</span>
                  <span className="select-all font-semibold text-foreground/80">
                    {profile.discord_id}
                  </span>
                </div>
              </div>
            </div>

            {/* Plan Status Widget */}
            <div className="flex flex-col sm:items-end justify-center rounded-xl bg-muted/40 p-4 border border-border/40 space-y-2">
              <div className="text-xs text-muted-foreground font-medium">
                {labels.planStatus}
              </div>

              <div className="flex items-center gap-2">
                {isPro ? (
                  <Badge className="bg-primary text-primary-foreground font-bold px-3 py-1 gap-1 text-xs">
                    <Zap className="h-3.5 w-3.5" />
                    <span>TopHub PRO</span>
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="font-semibold text-xs">
                    Gói Miễn Phí
                  </Badge>
                )}

                {isTrial && (
                  <Badge variant="outline" className="border-sky-500/40 text-sky-500 bg-sky-500/10 font-bold text-xs">
                    {labels.trialBadge}
                  </Badge>
                )}
              </div>

              {isPro && daysRemaining > 0 && (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                  <Clock className="h-3.5 w-3.5 text-primary" />
                  <span>{daysLeftText}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

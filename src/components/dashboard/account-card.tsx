"use client";

import React, { useState } from "react";
import { UserCheck, Shield, Trash2, Sparkles, Calendar, Server } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { GameAccountItem } from "@/types/api";
import { formatServerCode } from "@/lib/utils";

interface AccountCardProps {
  account: GameAccountItem;
  onToggle: (accountId: string, field: "auto_redeem" | "auto_checkin", value: boolean) => void;
  onUnlink: (accountId: string) => void;
  labels: {
    autoRedeem: string;
    autoCheckin: string;
    unlink: string;
    unlinkConfirmTitle: string;
    unlinkConfirmDesc: string;
    confirm: string;
    cancel: string;
  };
}

export function AccountCard({ account, onToggle, onUnlink, labels }: AccountCardProps) {
  const [unlinking, setUnlinking] = useState(false);

  const handleUnlink = async () => {
    try {
      setUnlinking(true);
      await onUnlink(account.id);
    } finally {
      setUnlinking(false);
    }
  };

  return (
    <Card className="border border-white/10 bg-slate-900/50 backdrop-blur-md overflow-hidden hover:border-purple-500/40 rounded-2xl transition-all shadow-md">
      <CardContent className="p-5 space-y-4">
        {/* Account Info Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold shrink-0">
              <UserCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-base text-foreground leading-tight">
                  {account.nickname || "Top Heroes Player"}
                </h4>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1 font-semibold text-slate-300">
                  <Server className="h-3 w-3 text-purple-400" />
                  {formatServerCode(account.server_id)}
                </span>
                <span>•</span>
                <span className="font-mono text-muted-foreground select-all">
                  UID: {account.uid}
                </span>
              </div>
            </div>
          </div>

          {/* Unlink Action - Touch target >= 44x44px */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-11 w-11 min-h-[44px] min-w-[44px] rounded-xl text-muted-foreground hover:text-rose-400 hover:bg-rose-500/10 active:scale-95 transition-all"
                disabled={unlinking}
                aria-label={labels.unlink}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-slate-950/95 border-purple-500/30 backdrop-blur-xl shadow-2xl rounded-2xl">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-foreground">{labels.unlinkConfirmTitle}</AlertDialogTitle>
                <AlertDialogDescription className="text-slate-400">{labels.unlinkConfirmDesc}</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="min-h-[44px] rounded-xl border-white/10 hover:bg-white/5">{labels.cancel}</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleUnlink}
                  className="min-h-[44px] rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90 font-bold"
                >
                  {labels.confirm}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        {/* Automation Toggles */}
        <div className="pt-3 border-t border-white/5 space-y-3">
          {/* Auto Redeem Giftcodes */}
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-2.5">
              <div className="h-6 w-6 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
                <Sparkles className="h-3.5 w-3.5" />
              </div>
              <div className="text-xs sm:text-sm font-semibold text-foreground">
                {labels.autoRedeem}
              </div>
            </div>
            <Switch
              checked={account.auto_redeem}
              onCheckedChange={(checked) => onToggle(account.id, "auto_redeem", checked)}
              aria-label={labels.autoRedeem}
            />
          </div>

          {/* Auto Daily Check-in */}
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-2.5">
              <div className="h-6 w-6 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                <Calendar className="h-3.5 w-3.5" />
              </div>
              <div className="text-xs sm:text-sm font-semibold text-foreground">
                {labels.autoCheckin}
              </div>
            </div>
            <Switch
              checked={account.auto_checkin}
              onCheckedChange={(checked) => onToggle(account.id, "auto_checkin", checked)}
              aria-label={labels.autoCheckin}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

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
    <Card className="border border-border/60 bg-card/60 backdrop-blur-sm overflow-hidden hover:border-border transition-all">
      <CardContent className="p-5 space-y-4">
        {/* Account Info Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold">
              <UserCheck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-bold text-base text-foreground leading-tight">
                {account.nickname || "Top Heroes Player"}
              </h4>
              <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground">
                <span className="flex items-center gap-1 font-medium">
                  <Server className="h-3 w-3" />
                  {account.server_id}
                </span>
                <span>•</span>
                <span className="font-mono text-muted-foreground select-all">
                  UID: {account.uid}
                </span>
              </div>
            </div>
          </div>

          {/* Unlink Action */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                disabled={unlinking}
                aria-label={labels.unlink}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-card border-border/80">
              <AlertDialogHeader>
                <AlertDialogTitle>{labels.unlinkConfirmTitle}</AlertDialogTitle>
                <AlertDialogDescription>{labels.unlinkConfirmDesc}</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{labels.cancel}</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleUnlink}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {labels.confirm}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        {/* Automation Toggles */}
        <div className="pt-3 border-t border-border/40 space-y-3">
          {/* Auto Redeem Giftcodes */}
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary shrink-0" />
              <div className="text-xs sm:text-sm font-medium text-foreground">
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
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-emerald-500 shrink-0" />
              <div className="text-xs sm:text-sm font-medium text-foreground">
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

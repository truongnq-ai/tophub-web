"use client";

import React, { useState } from "react";
import { Check, Copy, Sparkles, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { GiftCodeItem } from "@/types/api";

interface GiftcodeCardProps {
  item: GiftCodeItem;
  labels?: {
    active?: string;
    expired?: string;
    copy?: string;
    copied?: string;
    discoveredAt?: string;
  };
}

export function GiftcodeCard({ item, labels }: GiftcodeCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(item.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const isActive = item.status === "ACTIVE";
  const formattedDate = new Date(item.discovered_at).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return (
    <Card className="overflow-hidden border border-border/80 bg-card/80 backdrop-blur-md transition-all duration-300 hover:border-primary/60 hover:shadow-[0_0_25px_rgba(124,58,237,0.18)] hover:-translate-y-0.5">
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-center justify-between gap-2">
          {isActive ? (
            <Badge
              variant="outline"
              className="border-emerald-500/40 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 gap-1.5 font-bold px-2.5 py-0.5"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              {labels?.active || "Còn Hạn"}
            </Badge>
          ) : (
            <Badge variant="secondary" className="gap-1 text-muted-foreground font-medium px-2 py-0.5">
              <Clock className="h-3 w-3" />
              {labels?.expired || "Hết Hạn"}
            </Badge>
          )}

          <div className="flex items-center text-xs text-muted-foreground gap-1.5">
            <span>{labels?.discoveredAt || "Phát hiện"}:</span>
            <span className="font-mono font-medium text-foreground/90">{formattedDate}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-primary/25 bg-primary/10 p-3 shadow-inner">
          <div className="flex items-center gap-2 overflow-hidden">
            <Sparkles className="h-4 w-4 text-amber-400 shrink-0 animate-pulse" />
            <code className="font-mono text-base sm:text-lg font-black tracking-widest text-foreground select-all truncate">
              {item.code}
            </code>
          </div>

          <Button
            size="sm"
            className={cn(
              "shrink-0 gap-1.5 min-h-[40px] px-3.5 font-bold transition-all active:scale-95 shadow-sm",
              copied
                ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/25"
                : "bg-primary hover:bg-primary/90 text-white shadow-primary/25"
            )}
            onClick={handleCopy}
            aria-label={copied ? labels?.copied || "Đã chép!" : labels?.copy || "Sao chép"}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-white" />
                <span className="text-xs font-bold">{labels?.copied || "Đã chép!"}</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span className="text-xs font-semibold">{labels?.copy || "Sao chép"}</span>
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

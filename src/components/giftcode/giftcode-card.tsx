"use client";

import React, { useState } from "react";
import { Check, Copy, Sparkles, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
      // Fallback if clipboard API fails
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
    <Card className="overflow-hidden border border-border/60 bg-card/60 backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-md">
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-center justify-between gap-2">
          {isActive ? (
            <Badge
              variant="outline"
              className="border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 gap-1.5 font-medium"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              {labels?.active || "Còn Hạn"}
            </Badge>
          ) : (
            <Badge variant="secondary" className="gap-1 text-muted-foreground font-medium">
              <Clock className="h-3 w-3" />
              {labels?.expired || "Hết Hạn"}
            </Badge>
          )}

          <div className="flex items-center text-xs text-muted-foreground gap-1">
            <span>{labels?.discoveredAt || "Phát hiện"}:</span>
            <span className="font-medium text-foreground/80">{formattedDate}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 rounded-lg border border-border/50 bg-muted/40 p-3">
          <div className="flex items-center gap-2 overflow-hidden">
            <Sparkles className="h-4 w-4 text-primary shrink-0" />
            <code className="font-mono text-base sm:text-lg font-bold tracking-wider text-foreground select-all truncate">
              {item.code}
            </code>
          </div>

          <Button
            size="sm"
            variant={copied ? "default" : "secondary"}
            className="shrink-0 gap-1.5 transition-all"
            onClick={handleCopy}
            aria-label={copied ? labels?.copied || "Đã chép!" : labels?.copy || "Sao chép"}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-300" />
                <span className="text-xs font-semibold">{labels?.copied || "Đã chép!"}</span>
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

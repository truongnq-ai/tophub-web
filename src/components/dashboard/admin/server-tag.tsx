import React from "react";
import { formatServerCode } from "@/lib/utils";

interface ServerTagProps {
  serverId?: string;
  className?: string;
}

export function ServerTag({ serverId, className = "" }: ServerTagProps) {
  const displayCode = formatServerCode(serverId);

  return (
    <span
      className={`inline-flex items-center px-1.5 py-0.5 rounded-md border border-border/60 bg-muted/50 font-mono text-[11px] font-bold text-muted-foreground transition-colors group-hover:border-primary/40 group-hover:text-foreground select-none ${className}`}
      title={`Máy chủ ${displayCode}`}
    >
      [{displayCode}]
    </span>
  );
}

import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TableSkeletonRowsProps {
  columns?: number;
  rows?: number;
  className?: string;
}

export function TableSkeletonRows({
  columns = 6,
  rows = 5,
  className,
}: TableSkeletonRowsProps) {
  return (
    <>
      {Array.from({ length: rows }).map((_, rIdx) => (
        <tr
          key={rIdx}
          className={cn("animate-pulse border-b border-border/30", className)}
        >
          {Array.from({ length: columns }).map((_, cIdx) => (
            <td key={cIdx} className="px-4 py-3.5">
              <div
                className={cn(
                  "h-4 bg-muted/60 rounded",
                  cIdx === 0
                    ? "w-28 sm:w-36"
                    : cIdx === 1
                    ? "w-16"
                    : cIdx === 2
                    ? "w-24"
                    : "w-16"
                )}
              />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

interface TableOverlayLoaderProps {
  label?: string;
  className?: string;
}

export function TableOverlayLoader({
  label = "Đang tải dữ liệu...",
  className,
}: TableOverlayLoaderProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "absolute inset-0 z-20 flex flex-col items-center justify-center gap-2.5 bg-background/60 backdrop-blur-[1.5px] transition-all animate-in fade-in-50",
        className
      )}
    >
      <Loader2 className="h-6 w-6 animate-spin text-primary" />
      <span className="text-xs sm:text-sm font-medium text-foreground tracking-wide">
        {label}
      </span>
    </div>
  );
}

interface TableContainerProps {
  isOverlayLoading?: boolean;
  overlayLabel?: string;
  children: React.ReactNode;
  className?: string;
}

export function TableContainer({
  isOverlayLoading = false,
  overlayLabel,
  children,
  className,
}: TableContainerProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-border/60",
        className
      )}
    >
      {isOverlayLoading && <TableOverlayLoader label={overlayLabel} />}
      {children}
    </div>
  );
}

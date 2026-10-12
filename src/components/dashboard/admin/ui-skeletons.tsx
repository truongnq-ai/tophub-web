import React from "react";

export function TableRowSkeleton({ columns = 6 }: { columns?: number }) {
  return (
    <tr className="animate-pulse border-b border-border/30">
      {Array.from({ length: columns }).map((_, idx) => (
        <td key={idx} className="px-4 py-3.5">
          <div
            className={`h-4 bg-muted/60 rounded ${
              idx === 0 ? "w-32" : idx === 1 ? "w-16" : idx === 2 ? "w-20" : "w-12"
            }`}
          />
        </td>
      ))}
    </tr>
  );
}

export function MetricCardSkeleton() {
  return (
    <div className="border border-border/60 bg-card/80 backdrop-blur-md rounded-xl p-4 flex items-center gap-3.5 animate-pulse">
      <div className="h-11 w-11 rounded-xl bg-muted/60 shrink-0" />
      <div className="space-y-2 flex-1">
        <div className="h-3 w-20 bg-muted/60 rounded" />
        <div className="h-6 w-12 bg-muted/60 rounded" />
        <div className="h-2 w-28 bg-muted/40 rounded" />
      </div>
    </div>
  );
}

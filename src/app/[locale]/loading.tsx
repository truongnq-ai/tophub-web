import React from "react";

export default function PublicPageLoading() {
  return (
    <div className="min-h-[70vh] w-full max-w-6xl mx-auto px-4 py-8 sm:py-12 space-y-8 animate-pulse">
      {/* Hero Banner Skeleton */}
      <div className="space-y-4 max-w-2xl mx-auto text-center">
        <div className="h-8 sm:h-12 w-3/4 mx-auto bg-muted/60 rounded-2xl" />
        <div className="h-4 sm:h-5 w-1/2 mx-auto bg-muted/40 rounded-xl" />
        <div className="h-12 max-w-md mx-auto bg-muted/50 rounded-xl mt-6" />
      </div>

      {/* Grid Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-border/40 bg-card/60 p-6 space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-muted/60 shrink-0" />
              <div className="space-y-2 flex-1">
                <div className="h-4 w-3/4 bg-muted/60 rounded" />
                <div className="h-3 w-1/2 bg-muted/40 rounded" />
              </div>
            </div>
            <div className="space-y-2 pt-2">
              <div className="h-3 w-full bg-muted/40 rounded" />
              <div className="h-3 w-5/6 bg-muted/40 rounded" />
            </div>
            <div className="h-9 w-full bg-muted/50 rounded-xl pt-2" />
          </div>
        ))}
      </div>
    </div>
  );
}

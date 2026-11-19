import React from "react";
import { MetricCardSkeleton } from "@/components/dashboard/admin/ui-skeletons";
import { TableSkeletonRows } from "@/components/ui/table-loader";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminDashboardLoading() {
  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in-50 duration-300">
      {/* Top Banner HUD Skeleton */}
      <div className="h-28 rounded-2xl bg-muted/40 border border-border/60 animate-pulse" />

      {/* 4 Metric Cards Skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        <MetricCardSkeleton />
        <MetricCardSkeleton />
        <MetricCardSkeleton />
        <MetricCardSkeleton />
      </div>

      {/* Main Table Skeleton Card */}
      <Card className="border border-border/60 bg-card/80 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border/40 flex justify-between items-center">
          <div className="h-5 w-40 bg-muted/60 rounded animate-pulse" />
          <div className="h-9 w-28 bg-muted/50 rounded-xl animate-pulse" />
        </div>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/30 border-b border-border/40">
                <tr>
                  {Array.from({ length: 6 }).map((_, idx) => (
                    <th key={idx} className="h-10 px-4 text-left">
                      <div className="h-3 w-16 bg-muted/70 rounded animate-pulse" />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <TableSkeletonRows rows={8} columns={6} />
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

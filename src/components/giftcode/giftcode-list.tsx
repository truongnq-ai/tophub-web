"use client";

import React, { useState, useMemo } from "react";
import { Search, Gift, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GiftcodeCard } from "@/components/giftcode/giftcode-card";
import type { GiftCodeItem } from "@/types/api";

interface GiftcodeListProps {
  initialItems: GiftCodeItem[];
  translations: {
    badgeActive: string;
    badgeExpired: string;
    filterAll: string;
    filterActive: string;
    filterExpired: string;
    searchPlaceholder: string;
    discoveredAt: string;
    expiresAt: string;
    empty: string;
    copy: string;
    copied: string;
  };
}

export function GiftcodeList({ initialItems, translations }: GiftcodeListProps) {
  const [activeTab, setActiveTab] = useState<"ALL" | "ACTIVE" | "EXPIRED">("ALL");
  const [search, setSearch] = useState("");

  const activeCount = useMemo(
    () => initialItems.filter((i) => i.status === "ACTIVE").length,
    [initialItems]
  );
  const expiredCount = useMemo(
    () => initialItems.filter((i) => i.status === "EXPIRED").length,
    [initialItems]
  );

  const filteredItems = useMemo(() => {
    return initialItems.filter((item) => {
      const matchesTab =
        activeTab === "ALL" ||
        (activeTab === "ACTIVE" && item.status === "ACTIVE") ||
        (activeTab === "EXPIRED" && item.status === "EXPIRED");

      const matchesSearch = item.code.toLowerCase().includes(search.trim().toLowerCase());

      return matchesTab && matchesSearch;
    });
  }, [initialItems, activeTab, search]);

  const cardLabels = {
    active: translations.badgeActive,
    expired: translations.badgeExpired,
    copy: translations.copy,
    copied: translations.copied,
    discoveredAt: translations.discoveredAt,
  };

  return (
    <div className="space-y-6">
      {/* Search & Filter Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={translations.searchPlaceholder}
            className="pl-9 bg-card/60 border-border/60"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Tabs
          value={activeTab}
          onValueChange={(val) => setActiveTab(val as "ALL" | "ACTIVE" | "EXPIRED")}
          className="w-full sm:w-auto"
        >
          <TabsList className="grid w-full grid-cols-3 sm:w-auto">
            <TabsTrigger value="ALL" className="gap-1.5 text-xs sm:text-sm">
              <span>{translations.filterAll}</span>
              <span className="rounded-full bg-muted-foreground/20 px-1.5 py-0.2 text-[10px] font-semibold">
                {initialItems.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="ACTIVE" className="gap-1.5 text-xs sm:text-sm text-emerald-600 dark:text-emerald-400">
              <span>{translations.filterActive}</span>
              <span className="rounded-full bg-emerald-500/20 px-1.5 py-0.2 text-[10px] font-semibold">
                {activeCount}
              </span>
            </TabsTrigger>
            <TabsTrigger value="EXPIRED" className="gap-1.5 text-xs sm:text-sm text-muted-foreground">
              <span>{translations.filterExpired}</span>
              <span className="rounded-full bg-muted-foreground/20 px-1.5 py-0.2 text-[10px] font-semibold">
                {expiredCount}
              </span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Giftcode Cards Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <GiftcodeCard key={item.code} item={item} labels={cardLabels} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-12 text-center">
          <Gift className="h-12 w-12 text-muted-foreground/50 mb-3" />
          <p className="text-sm font-medium text-muted-foreground">{translations.empty}</p>
        </div>
      )}
    </div>
  );
}

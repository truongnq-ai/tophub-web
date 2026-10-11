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
    copyAll?: string;
    copiedAll?: string;
  };
}

export function GiftcodeList({ initialItems, translations }: GiftcodeListProps) {
  const [activeTab, setActiveTab] = useState<"ALL" | "ACTIVE" | "EXPIRED">("ALL");
  const [search, setSearch] = useState("");
  const [batchCopied, setBatchCopied] = useState(false);

  const activeItems = useMemo(
    () => initialItems.filter((i) => i.status === "ACTIVE"),
    [initialItems]
  );
  const activeCount = activeItems.length;
  const expiredCount = useMemo(
    () => initialItems.filter((i) => i.status === "EXPIRED").length,
    [initialItems]
  );

  const handleBatchCopy = async () => {
    if (activeItems.length === 0) return;
    const allCodes = activeItems.map((item) => item.code).join("\n");
    try {
      await navigator.clipboard.writeText(allCodes);
      setBatchCopied(true);
      setTimeout(() => setBatchCopied(false), 2500);
    } catch {
      setBatchCopied(false);
    }
  };

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
      {/* Search & Batch Action Bar */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Search Input HUD */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
          <Input
            type="search"
            placeholder={translations.searchPlaceholder}
            className="pl-10 h-11 bg-card/80 border-border/80 rounded-xl focus:border-primary/80 focus:ring-primary/20 shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Action Buttons: Batch Copy & Filter Tabs */}
        <div className="flex flex-wrap items-center gap-3">
          {activeCount > 0 && (
            <button
              type="button"
              onClick={handleBatchCopy}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md active:scale-95 min-h-[44px] ${
                batchCopied
                  ? "bg-emerald-500 text-white shadow-emerald-500/25"
                  : "bg-primary hover:bg-primary/90 text-white shadow-primary/25 hover:shadow-primary/40"
              }`}
            >
              {batchCopied ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>{translations.copiedAll || "Đã chép tất cả code!"}</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>
                    {translations.copyAll || "Sao Chép Tất Cả Code"} ({activeCount})
                  </span>
                </>
              )}
            </button>
          )}

          <Tabs
            value={activeTab}
            onValueChange={(val) => setActiveTab(val as "ALL" | "ACTIVE" | "EXPIRED")}
            className="w-full sm:w-auto"
          >
            <TabsList className="grid w-full grid-cols-3 sm:w-auto h-11 p-1 bg-card/80 border border-border/80 rounded-xl">
              <TabsTrigger value="ALL" className="gap-1.5 text-xs sm:text-sm h-9 rounded-lg font-semibold">
                <span>{translations.filterAll}</span>
                <span className="rounded-full bg-muted-foreground/20 px-1.5 py-0.2 text-[10px] font-bold">
                  {initialItems.length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="ACTIVE" className="gap-1.5 text-xs sm:text-sm h-9 rounded-lg font-semibold text-emerald-500 data-[state=active]:text-emerald-400">
                <span>{translations.filterActive}</span>
                <span className="rounded-full bg-emerald-500/20 px-1.5 py-0.2 text-[10px] font-bold">
                  {activeCount}
                </span>
              </TabsTrigger>
              <TabsTrigger value="EXPIRED" className="gap-1.5 text-xs sm:text-sm h-9 rounded-lg font-semibold text-muted-foreground">
                <span>{translations.filterExpired}</span>
                <span className="rounded-full bg-muted-foreground/20 px-1.5 py-0.2 text-[10px] font-bold">
                  {expiredCount}
                </span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Giftcode Cards Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <GiftcodeCard key={item.code} item={item} labels={cardLabels} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/80 bg-card/40 p-12 text-center backdrop-blur-sm">
          <Gift className="h-12 w-12 text-muted-foreground/40 mb-3 animate-bounce" />
          <p className="text-sm font-semibold text-muted-foreground">{translations.empty}</p>
        </div>
      )}
    </div>
  );
}

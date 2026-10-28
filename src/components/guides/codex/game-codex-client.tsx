"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Database,
  Filter,
  Globe,
  Layers,
  Package,
  RotateCcw,
  Search,
  Shield,
  Sparkles,
  Swords,
  X,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import type {
  AssetFaction,
  AssetRarity,
  CodexCategoryId,
  CodexEntityRecord,
  CodexMenuZone,
  CodexSearchIndexItem,
  CodexSearchScope,
  GuideLocale,
  LocalizedText,
} from "@/content/guides/types";
import { GameAssetFrame } from "@/components/guides/media/game-asset-frame";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  CODEX_CATEGORY_FILTER_SCHEMA,
  CODEX_CATEGORY_LABELS,
  CODEX_FACTION_IDS,
  CODEX_FACTION_LABELS,
  CODEX_MENU_ZONES,
  CODEX_PAGE_SIZE,
  CODEX_RARITY_LABELS,
  INITIAL_CODEX_CATEGORY_COUNTS,
  fetchCodexCategoryShard,
  fetchCodexSearchIndex,
  filterCodexEntities,
  getInitialCodexSeedRecords,
  paginateCodexEntities,
  parseCodexUrlParams,
} from "./codex-utils";
import { CodexEntityDrawer } from "./codex-entity-drawer";

export interface GameCodexClientProps {
  readonly locale: GuideLocale;
  readonly initialSearchParams?: Record<string, string | string[] | undefined>;
}

const QUICK_CODEX_CHIPS: readonly {
  readonly id: string;
  readonly targetCategory: CodexCategoryId;
  readonly label: LocalizedText;
  readonly query: LocalizedText;
}[] = [
  {
    id: "wukong",
    targetCategory: "heroes",
    label: { vi: "🐒 Ngộ Không (Wukong)", en: "🐒 Wukong" },
    query: { vi: "Ngộ Không", en: "Wukong" },
  },
  {
    id: "soul-stone",
    targetCategory: "items",
    label: { vi: "💎 Hồn Đá Đỏ", en: "💎 Soul Stone" },
    query: { vi: "Đá Linh Hồn", en: "Soul Stone" },
  },
  {
    id: "titan-set",
    targetCategory: "equipment",
    label: { vi: "⚔️ Bộ Đồ Vàng", en: "⚔️ Golden Gear Set" },
    query: { vi: "Titan", en: "Titan" },
  },
  {
    id: "dragon-essence",
    targetCategory: "items",
    label: { vi: "🐉 Tinh Chất Rồng", en: "🐉 Dragon Essence" },
    query: { vi: "Tinh Chất Rồng", en: "Dragon Essence" },
  },
];

function renderZoneIcon(iconName: CodexMenuZone["iconName"]) {
  switch (iconName) {
    case "Swords":
      return <Swords className="h-4 w-4 text-amber-500 shrink-0" />;
    case "Shield":
      return <Shield className="h-4 w-4 text-amber-500 shrink-0" />;
    case "Package":
      return <Package className="h-4 w-4 text-amber-500 shrink-0" />;
    case "Globe":
      return <Globe className="h-4 w-4 text-amber-500 shrink-0" />;
  }
}

export function GameCodexClient({
  locale,
  initialSearchParams,
}: GameCodexClientProps) {
  const isVi = locale === "vi";
  const initialFilters = useMemo(
    () => parseCodexUrlParams(initialSearchParams),
    [initialSearchParams]
  );

  const initialCat: CodexCategoryId =
    initialFilters.category === "all" ? "heroes" : initialFilters.category;

  const [category, setCategory] = useState<CodexCategoryId>(initialCat);
  const [subCategory, setSubCategory] = useState<string>(
    initialFilters.subCategory ?? "all"
  );
  const [rarity, setRarity] = useState<AssetRarity | "all">(
    initialFilters.rarity
  );
  const [faction, setFaction] = useState<AssetFaction | "all">(
    initialFilters.faction
  );
  const [extraFilter, setExtraFilter] = useState<string>(
    initialFilters.extraFilter ?? "all"
  );
  const [searchScope, setSearchScope] = useState<CodexSearchScope>(
    initialFilters.searchScope ?? "category"
  );
  const [searchQuery, setSearchQuery] = useState<string>(initialFilters.query);
  const [page, setPage] = useState<number>(initialFilters.page);

  const seedRecords = useMemo(() => getInitialCodexSeedRecords(), []);
  const [loadedShards, setLoadedShards] = useState<
    Readonly<Record<string, readonly (CodexEntityRecord | CodexSearchIndexItem)[]>>
  >({});
  const [categoryCounts, setCategoryCounts] = useState<
    Readonly<Record<CodexCategoryId, number>>
  >(INITIAL_CODEX_CATEGORY_COUNTS);
  const [isLoadingShard, setIsLoadingShard] = useState<boolean>(false);
  const [selectedEntity, setSelectedEntity] = useState<
    CodexEntityRecord | CodexSearchIndexItem | null
  >(null);

  const totalCatalogCount = useMemo(
    () =>
      Object.values(categoryCounts).reduce((sum, count) => sum + count, 0),
    [categoryCounts]
  );

  // Sync URL query params on client mount if initialSearchParams was not passed
  useEffect(() => {
    if (
      !initialSearchParams &&
      typeof window !== "undefined" &&
      window.location.search
    ) {
      const sp = new URLSearchParams(window.location.search);
      const parsed = parseCodexUrlParams({
        cat: sp.get("cat") ?? undefined,
        sub: sp.get("sub") ?? undefined,
        rarity: sp.get("rarity") ?? undefined,
        faction: sp.get("faction") ?? undefined,
        extra: sp.get("extra") ?? undefined,
        scope: sp.get("scope") ?? undefined,
        q: sp.get("q") ?? undefined,
        page: sp.get("page") ?? undefined,
      });
      setCategory(parsed.category === "all" ? "heroes" : parsed.category);
      setSubCategory(parsed.subCategory ?? "all");
      setRarity(parsed.rarity);
      setFaction(parsed.faction);
      setExtraFilter(parsed.extraFilter ?? "all");
      setSearchScope(parsed.searchScope ?? "category");
      setSearchQuery(parsed.query);
      setPage(parsed.page);
    }
  }, [initialSearchParams]);

  const isGlobalSearchActive =
    searchScope === "all" && searchQuery.trim().length > 0;
  const targetShardKey = isGlobalSearchActive ? "all" : category;

  // GAP-04: Lazy-load category shard or search-index with AbortController & in-memory Map cache
  useEffect(() => {
    if (
      typeof navigator !== "undefined" &&
      /jsdom/i.test(navigator.userAgent || "") &&
      !(
        typeof window !== "undefined" &&
        window.fetch &&
        "mock" in (window.fetch as unknown as Record<string, unknown>)
      )
    ) {
      return;
    }

    const controller = new AbortController();
    let mounted = true;
    setIsLoadingShard(true);

    if (targetShardKey === "all") {
      fetchCodexSearchIndex(controller.signal)
        .then((payload) => {
          if (!mounted) return;
          setCategoryCounts(payload.categoryCounts);
          if (payload.items.length > 0) {
            setLoadedShards((prev) => ({ ...prev, all: payload.items }));
          }
          setIsLoadingShard(false);
        })
        .catch(() => {
          if (mounted) setIsLoadingShard(false);
        });
    } else {
      fetchCodexCategoryShard(category, controller.signal)
        .then((items) => {
          if (!mounted) return;
          if (items.length > 0) {
            setLoadedShards((prev) => ({ ...prev, [category]: items }));
            setCategoryCounts((prev) => ({
              ...prev,
              [category]: items.length,
            }));
          }
          setIsLoadingShard(false);
        })
        .catch(() => {
          if (mounted) setIsLoadingShard(false);
        });
    }

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [category, targetShardKey]);

  const activeSchema = CODEX_CATEGORY_FILTER_SCHEMA[category];
  const isFactionFilterVisible =
    activeSchema.supportsFaction &&
    (!activeSchema.factionSubCategories ||
      activeSchema.factionSubCategories.includes(subCategory));

  const activePool = loadedShards[targetShardKey] ?? seedRecords;

  const filteredEntities = useMemo(
    () =>
      filterCodexEntities(activePool, {
        category: isGlobalSearchActive ? "all" : category,
        subCategory: isGlobalSearchActive ? "all" : subCategory,
        rarity,
        faction: isFactionFilterVisible ? faction : "all",
        extraFilter: isGlobalSearchActive ? "all" : extraFilter,
        query: searchQuery,
      }),
    [
      activePool,
      category,
      extraFilter,
      faction,
      isFactionFilterVisible,
      isGlobalSearchActive,
      rarity,
      searchQuery,
      subCategory,
    ]
  );

  const paginated = useMemo(
    () => paginateCodexEntities(filteredEntities, page, CODEX_PAGE_SIZE),
    [filteredEntities, page]
  );

  /**
   * GAP-M1-02: Category switch sanitizes invalid cross-category filters automatically.
   */
  const handleCategoryChange = (nextCat: CodexCategoryId) => {
    const nextSchema = CODEX_CATEGORY_FILTER_SCHEMA[nextCat];
    setCategory(nextCat);
    setSubCategory("all");
    setExtraFilter("all");
    setSearchScope("category");
    setPage(1);

    if (
      !nextSchema.supportsFaction ||
      (faction !== "all" &&
        nextSchema.allowedFactions &&
        !nextSchema.allowedFactions.includes(faction))
    ) {
      setFaction("all");
    }

    if (rarity !== "all" && !nextSchema.allowedRarities.includes(rarity)) {
      setRarity("all");
    }
  };

  /**
   * GAP-M1-04: Conditional faction visibility inside `equipment` when switching subCategory.
   */
  const handleSubCategoryChange = (nextSub: string) => {
    setSubCategory(nextSub);
    setPage(1);
    if (
      activeSchema.factionSubCategories &&
      !activeSchema.factionSubCategories.includes(nextSub)
    ) {
      setFaction("all");
    }
  };

  const handleRarityChange = (nextRarity: AssetRarity | "all") => {
    setRarity(nextRarity);
    setPage(1);
  };

  const handleFactionChange = (nextFaction: AssetFaction | "all") => {
    setFaction(nextFaction);
    setPage(1);
  };

  const handleExtraFilterChange = (nextExtra: string) => {
    setExtraFilter(nextExtra);
    setPage(1);
  };

  const handleResetFilters = () => {
    setSubCategory("all");
    setRarity("all");
    setFaction("all");
    setExtraFilter("all");
    setSearchScope("category");
    setSearchQuery("");
    setPage(1);
  };

  const hasActiveFilters =
    subCategory !== "all" ||
    rarity !== "all" ||
    faction !== "all" ||
    extraFilter !== "all" ||
    searchQuery.trim().length > 0;

  return (
    <div
      data-testid="game-codex-client"
      className="min-w-0 overflow-hidden space-y-6"
    >
      {/* LAYER 1: Hero Header & Bilingual Instant Search */}
      <section className="card-rpg rounded-3xl p-5 sm:p-7 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-600 dark:text-amber-400">
            <Database className="h-3.5 w-3.5 text-amber-500" />
            <span>
              {isVi
                ? "Tầng 2 • Kho Đồ Giám & Từ Điển Vật Phẩm Song Ngữ"
                : "Tier 2 • Bilingual Game Codex & Asset Compendium"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="font-mono text-[11px] border-amber-500/35 text-amber-500"
            >
              {totalCatalogCount.toLocaleString()}{" "}
              {isVi ? "Thực thể chuẩn hóa" : "Verified Entities"}
            </Badge>
            <Link
              href="/guides"
              className="inline-flex items-center gap-1.5 rounded-xl border border-border/70 bg-background/60 px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:text-amber-500 hover:border-amber-500/40 transition-colors"
            >
              <BookOpen className="h-3.5 w-3.5 text-amber-500" />
              <span>{isVi ? "Về Cẩm Nang" : "Back to Guides"}</span>
            </Link>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-foreground leading-tight">
            {isVi
              ? "Kho Đồ Giám & Từ Điển Vật Phẩm Song Ngữ (Anh – Việt)"
              : "Top Heroes Bilingual Game Codex & Item Encyclopedia"}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl">
            {isVi
              ? "Hệ thống tra cứu 12 Danh mục chuyên biệt: Anh hùng, Trang bị Hoàng Kim, Vũ khí Độc quyền, Cổ ngữ, Thánh vật, Thú cưng, Công trình và Vật phẩm sự kiện chuẩn tên trong game kèm thuật ngữ cộng đồng."
              : "Structured 12-Category encyclopedia covering Heroes, Golden Gear, Exclusive Weapons, Runes, Relics, Companion Pets, Buildings, and Event Items with official in-game names and community aliases."}
          </p>
        </div>

        {/* Bilingual Instant Search Box + Search Scope Toggle + Quick Filter Chips */}
        <div className="pt-1 space-y-2.5">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 max-w-3xl">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-amber-500" />
              <Input
                type="text"
                data-testid="codex-search-input"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1);
                }}
                placeholder={
                  isVi
                    ? "Tìm theo tên trong game, tên cộng đồng hoặc mã ID... (VD: Thánh Đồ, Paragon, Hồn Đá Đỏ)"
                    : "Search by official name, community alias, or Game ID... (e.g., Paragon, Wukong, Soul Stone)"
                }
                className="pl-10 pr-10 h-11 rounded-2xl bg-background/85 text-xs sm:text-sm border-border/80 focus-visible:ring-amber-500/30 focus-visible:border-amber-500"
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setPage(1);
                  }}
                  aria-label={isVi ? "Xóa tìm kiếm" : "Clear search"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              ) : null}
            </div>

            {searchQuery.trim().length > 0 ? (
              <div className="inline-flex items-center rounded-2xl border border-border/80 bg-background/70 p-1 text-[11px] font-mono shrink-0">
                <button
                  type="button"
                  data-testid="codex-scope-category-btn"
                  onClick={() => {
                    setSearchScope("category");
                    setPage(1);
                  }}
                  className={cn(
                    "rounded-xl px-2.5 py-1.5 font-semibold transition-all",
                    searchScope === "category"
                      ? "bg-amber-500 text-slate-950"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {isVi ? "Trong danh mục này" : "In category"}
                </button>
                <button
                  type="button"
                  data-testid="codex-scope-all-btn"
                  onClick={() => {
                    setSearchScope("all");
                    setPage(1);
                  }}
                  className={cn(
                    "rounded-xl px-2.5 py-1.5 font-semibold transition-all",
                    searchScope === "all"
                      ? "bg-amber-500 text-slate-950"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {isVi ? "Toàn bộ 12 danh mục" : "All 12 categories"}
                </button>
              </div>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="font-mono text-[11px] text-muted-foreground mr-1">
              {isVi ? "Tra cứu nhanh:" : "Quick lookup:"}
            </span>
            {QUICK_CODEX_CHIPS.map((chip) => {
              const target = chip.query[locale];
              const isSelected =
                searchQuery.trim().toLowerCase() === target.toLowerCase() &&
                category === chip.targetCategory;
              return (
                <button
                  key={chip.id}
                  type="button"
                  onClick={() => {
                    if (isSelected) {
                      setSearchQuery("");
                      setPage(1);
                    } else {
                      handleCategoryChange(chip.targetCategory);
                      setSearchQuery(target);
                      setPage(1);
                    }
                  }}
                  className={cn(
                    "rounded-full border px-2.5 py-1 font-mono text-[11px] font-semibold transition-all",
                    isSelected
                      ? "border-amber-500 bg-amber-500 text-slate-950"
                      : "border-border/70 bg-background/60 text-muted-foreground hover:border-amber-500/40 hover:text-amber-500"
                  )}
                >
                  {chip.label[locale]}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* LAYER 2A: 4-Zone Category Menu Navigation (Option M1) */}
      <section className="rounded-3xl border border-border/80 bg-card/70 p-4 sm:p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-amber-500" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              {isVi
                ? "Menu 12 Danh Mục Vật Phẩm (4 Phân Khu Chuyên Biệt)"
                : "12-Category Encyclopedia Menu (4 Tactical Zones)"}
            </span>
          </div>

          {hasActiveFilters ? (
            <button
              type="button"
              data-testid="codex-reset-filters-btn"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-xs font-mono text-muted-foreground hover:text-amber-500 transition-colors"
            >
              <RotateCcw className="h-3 w-3" />
              <span>{isVi ? "Đặt lại bộ lọc" : "Reset filters"}</span>
            </button>
          ) : null}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
          {CODEX_MENU_ZONES.map((zone) => {
            const isZoneActive = zone.categories.includes(category);
            return (
              <div
                key={zone.id}
                data-testid={`codex-menu-zone-${zone.id}`}
                className={cn(
                  "rounded-2xl border p-3 space-y-2.5 transition-all",
                  isZoneActive
                    ? "border-amber-500/45 bg-amber-500/5"
                    : "border-border/70 bg-background/45"
                )}
              >
                <div className="space-y-0.5 px-1">
                  <div className="flex items-center gap-1.5 text-xs font-heading font-bold text-foreground">
                    {renderZoneIcon(zone.iconName)}
                    <span>{zone.title[locale]}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground line-clamp-1">
                    {zone.subtitle[locale]}
                  </p>
                </div>

                <div className="space-y-1.5">
                  {zone.categories.map((catId) => {
                    const isSelected =
                      !isGlobalSearchActive && category === catId;
                    const count = categoryCounts[catId];
                    return (
                      <button
                        key={catId}
                        type="button"
                        data-testid={`codex-cat-tab-${catId}`}
                        onClick={() => handleCategoryChange(catId)}
                        className={cn(
                          "w-full flex items-center justify-between gap-2 rounded-xl border px-3 py-2 text-xs font-heading font-bold transition-all text-left",
                          isSelected
                            ? "border-amber-500 bg-amber-500 text-slate-950 shadow-xs"
                            : "border-border/70 bg-background/70 text-foreground/85 hover:border-amber-500/40 hover:text-amber-500"
                        )}
                      >
                        <span className="truncate">
                          {CODEX_CATEGORY_LABELS[catId][locale]}
                        </span>
                        {typeof count === "number" ? (
                          <span
                            className={cn(
                              "rounded-md px-1.5 py-0.5 font-mono text-[10px] shrink-0",
                              isSelected
                                ? "bg-slate-950/20 text-slate-950"
                                : "bg-muted text-muted-foreground"
                            )}
                          >
                            {count}
                          </span>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* LAYER 2B: Context-Aware Dynamic Filter Bar for the Active Category */}
        <div
          data-testid="codex-context-filter-bar"
          className="rounded-2xl border border-border/75 bg-background/55 p-3.5 space-y-3"
        >
          {/* Row 1: Domain-Specific Sub-Category Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400 mr-1.5 flex items-center gap-1">
              <Filter className="h-3 w-3" />
              {isVi ? "Phân nhóm:" : "Sub-group:"}
            </span>
            {activeSchema.subCategories.map((sub) => {
              const isSelected = subCategory === sub.id;
              return (
                <button
                  key={sub.id}
                  type="button"
                  data-testid={`codex-subcat-${sub.id}`}
                  onClick={() => handleSubCategoryChange(sub.id)}
                  className={cn(
                    "rounded-xl border px-3 py-1 text-xs font-heading font-bold transition-all",
                    isSelected
                      ? "border-amber-500 bg-amber-500/20 text-amber-500"
                      : "border-border/65 bg-background/60 text-muted-foreground hover:border-amber-500/40 hover:text-foreground"
                  )}
                >
                  {sub.label[locale]}
                </button>
              );
            })}
          </div>

          {/* Row 2: Rarity + Conditional Faction + Conditional Extra Filter */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5 pt-2.5 border-t border-border/60">
            {/* Allowed Rarity Filter */}
            <div
              data-testid="codex-rarity-filter-group"
              className="flex flex-wrap items-center gap-1.5"
            >
              <span className="text-[11px] font-mono text-muted-foreground mr-1">
                {isVi ? "Phẩm cấp:" : "Rarity:"}
              </span>
              {(["all", ...activeSchema.allowedRarities] as const).map(
                (rId) => {
                  const isSelected = rarity === rId;
                  return (
                    <button
                      key={rId}
                      type="button"
                      data-testid={`codex-rarity-${rId}`}
                      onClick={() => handleRarityChange(rId)}
                      className={cn(
                        "rounded-lg border px-2.5 py-1 text-[11px] font-mono font-semibold transition-all",
                        isSelected
                          ? "border-amber-500/60 bg-amber-500/15 text-amber-500"
                          : "border-border/60 bg-background/50 text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {CODEX_RARITY_LABELS[rId][locale]}
                    </button>
                  );
                }
              )}
            </div>

            {/* Conditional Faction Filter (Only rendered when active category/subCategory supports Factions) */}
            {isFactionFilterVisible ? (
              <div
                data-testid="codex-faction-filter-group"
                className="flex flex-wrap items-center gap-1.5"
              >
                <span className="text-[11px] font-mono text-muted-foreground mr-1">
                  {isVi ? "Phe phái:" : "Faction:"}
                </span>
                {(
                  [
                    "all",
                    ...(activeSchema.allowedFactions ?? CODEX_FACTION_IDS),
                  ] as const
                ).map((fId) => {
                  const isSelected = faction === fId;
                  return (
                    <button
                      key={fId}
                      type="button"
                      data-testid={`codex-faction-${fId}`}
                      onClick={() => handleFactionChange(fId)}
                      className={cn(
                        "rounded-lg border px-2.5 py-1 text-[11px] font-mono font-semibold transition-all",
                        isSelected
                          ? "border-amber-500/60 bg-amber-500/15 text-amber-500"
                          : "border-border/60 bg-background/50 text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {CODEX_FACTION_LABELS[fId][locale]}
                    </button>
                  );
                })}
              </div>
            ) : null}

            {/* Conditional Extra Domain Filter (e.g., Hero Traits: Red Awakening / Economy Passive) */}
            {activeSchema.extraFilters &&
            activeSchema.extraFilters.length > 0 ? (
              <div
                data-testid="codex-extra-filter-group"
                className="flex flex-wrap items-center gap-1.5"
              >
                <span className="text-[11px] font-mono text-muted-foreground mr-1">
                  {activeSchema.extraFilterLabel?.[locale] ??
                    (isVi ? "Đặc tính:" : "Trait:")}
                </span>
                {activeSchema.extraFilters.map((opt) => {
                  const isSelected = extraFilter === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      data-testid={`codex-extra-${opt.id}`}
                      onClick={() => handleExtraFilterChange(opt.id)}
                      className={cn(
                        "rounded-lg border px-2.5 py-1 text-[11px] font-mono font-semibold transition-all",
                        isSelected
                          ? "border-amber-500/60 bg-amber-500/15 text-amber-500"
                          : "border-border/60 bg-background/50 text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {opt.label[locale]}
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* LAYER 3: Paginated RPG Entity Card Grid (Max 48 items/page) */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 px-1">
          <div className="text-xs font-mono text-muted-foreground">
            {isVi ? (
              <span>
                Danh mục{" "}
                <strong className="text-foreground">
                  {isGlobalSearchActive
                    ? CODEX_CATEGORY_LABELS.all.vi
                    : CODEX_CATEGORY_LABELS[category].vi}
                </strong>{" "}
                • Hiển thị{" "}
                <strong className="text-amber-500">
                  {paginated.items.length}
                </strong>{" "}
                /{" "}
                <strong className="text-foreground">
                  {paginated.totalItems}
                </strong>{" "}
                thực thể
              </span>
            ) : (
              <span>
                Category{" "}
                <strong className="text-foreground">
                  {isGlobalSearchActive
                    ? CODEX_CATEGORY_LABELS.all.en
                    : CODEX_CATEGORY_LABELS[category].en}
                </strong>{" "}
                • Showing{" "}
                <strong className="text-amber-500">
                  {paginated.items.length}
                </strong>{" "}
                of{" "}
                <strong className="text-foreground">
                  {paginated.totalItems}
                </strong>{" "}
                entities
              </span>
            )}
            {isLoadingShard ? (
              <span className="ml-2 text-amber-500 animate-pulse">
                • {isVi ? "Đang đồng bộ phân mục..." : "Syncing shard..."}
              </span>
            ) : null}
          </div>

          {paginated.totalPages > 1 ? (
            <div className="flex items-center gap-1.5 text-xs font-mono">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={paginated.currentPage <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="h-8 px-2.5 rounded-xl"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </Button>
              <span className="px-2">
                {isVi ? "Trang" : "Page"} {paginated.currentPage} /{" "}
                {paginated.totalPages}
              </span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={paginated.currentPage >= paginated.totalPages}
                onClick={() =>
                  setPage((p) => Math.min(paginated.totalPages, p + 1))
                }
                className="h-8 px-2.5 rounded-xl"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          ) : null}
        </div>

        {paginated.items.length > 0 ? (
          <div
            data-testid="codex-entity-grid"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5"
          >
            {paginated.items.map((item) => {
              const primaryName = isVi ? item.nameVi : item.nameEn;
              const secondaryName = isVi ? item.nameEn : null;
              const communityName = isVi
                ? item.communityNameVi
                : item.communityNameEn;
              const desc = isVi ? item.descVi : item.descEn;

              return (
                <button
                  key={item.id}
                  type="button"
                  data-testid="codex-entity-card"
                  onClick={() => setSelectedEntity(item)}
                  className="group text-left rounded-2xl border border-border/80 bg-card/75 hover:border-amber-500/55 p-3.5 flex flex-col justify-between gap-3 transition-all shadow-xs hover:shadow-md cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <GameAssetFrame
                      src={item.path}
                      alt={primaryName}
                      size="lg"
                      rarity={item.rarity}
                      faction={item.faction}
                    />
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-mono font-bold text-amber-500 truncate">
                          {CODEX_CATEGORY_LABELS[item.category][locale]}
                        </span>
                        {item.gameId !== null ? (
                          <span className="text-[10px] font-mono text-muted-foreground shrink-0">
                            #{item.gameId}
                          </span>
                        ) : null}
                      </div>

                      <h3 className="font-heading font-bold text-xs sm:text-sm text-foreground group-hover:text-amber-500 transition-colors line-clamp-1">
                        {primaryName}
                      </h3>

                      {secondaryName && secondaryName !== primaryName ? (
                        <p className="text-[11px] font-mono text-muted-foreground truncate">
                          {secondaryName}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                    {desc}
                  </p>

                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-border/50 text-[10px] font-mono">
                    {communityName && communityName !== primaryName ? (
                      <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 truncate">
                        <Sparkles className="h-3 w-3 shrink-0" />
                        <span className="truncate">{communityName}</span>
                      </span>
                    ) : (
                      <span className="text-muted-foreground">
                        {CODEX_RARITY_LABELS[item.rarity][locale]}
                      </span>
                    )}
                    <span className="text-amber-500 font-bold shrink-0">
                      {isVi ? "Chi tiết →" : "Inspect →"}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-border/80 bg-card/40 p-8 text-center space-y-3">
            <p className="text-sm text-muted-foreground">
              {isVi
                ? "Không tìm thấy vật phẩm hoặc thực thể nào khớp với bộ lọc hiện tại trong danh mục này."
                : "No game entities matched your active search and filter criteria in this category."}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {searchQuery.trim().length > 0 && searchScope !== "all" ? (
                <Button
                  type="button"
                  variant="default"
                  size="sm"
                  onClick={() => {
                    setSearchScope("all");
                    setPage(1);
                  }}
                  className="rounded-xl text-xs bg-amber-500 text-slate-950 hover:bg-amber-400"
                >
                  {isVi
                    ? "Tìm trên toàn bộ 12 Danh mục"
                    : "Search across all 12 Categories"}
                </Button>
              ) : null}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleResetFilters}
                className="rounded-xl text-xs"
              >
                {isVi ? "Đặt lại bộ lọc" : "Reset filters"}
              </Button>
            </div>
          </div>
        )}
      </section>

      {/* LAYER 4: Entity Detail Drawer */}
      <CodexEntityDrawer
        entity={selectedEntity}
        locale={locale}
        onClose={() => setSelectedEntity(null)}
      />
    </div>
  );
}

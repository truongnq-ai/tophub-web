"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Database,
  Filter,
  RotateCcw,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import type {
  AssetFaction,
  AssetRarity,
  CodexCategoryId,
  CodexEntityRecord,
  CodexSearchIndexItem,
  GuideLocale,
  LocalizedText,
} from "@/content/guides/types";
import { GameAssetFrame } from "@/components/guides/media/game-asset-frame";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  CODEX_CATEGORY_IDS,
  CODEX_CATEGORY_LABELS,
  CODEX_FACTION_IDS,
  CODEX_FACTION_LABELS,
  CODEX_PAGE_SIZE,
  CODEX_RARITY_IDS,
  CODEX_RARITY_LABELS,
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
  readonly label: LocalizedText;
  readonly query: LocalizedText;
}[] = [
  {
    id: "wukong",
    label: { vi: "🐒 Ngộ Không (Wukong)", en: "🐒 Wukong" },
    query: { vi: "Ngộ Không", en: "Wukong" },
  },
  {
    id: "soul-stone",
    label: { vi: "💎 Hồn Đá Đỏ", en: "💎 Soul Stone" },
    query: { vi: "Hồn Đá Đỏ", en: "Soul Stone" },
  },
  {
    id: "titan-set",
    label: { vi: "⚔️ Bộ Máu Titan", en: "⚔️ Blood of the Titan" },
    query: { vi: "Titan", en: "Titan" },
  },
  {
    id: "dragon-essence",
    label: { vi: "🐉 Tinh Hoa Rồng", en: "🐉 Dragon Essence" },
    query: { vi: "Tinh Hoa Rồng", en: "Dragon Essence" },
  },
];

export function GameCodexClient({
  locale,
  initialSearchParams,
}: GameCodexClientProps) {
  const isVi = locale === "vi";
  const initialFilters = useMemo(
    () => parseCodexUrlParams(initialSearchParams),
    [initialSearchParams]
  );

  const [category, setCategory] = useState<CodexCategoryId | "all">(
    initialFilters.category
  );
  const [rarity, setRarity] = useState<AssetRarity | "all">(
    initialFilters.rarity
  );
  const [faction, setFaction] = useState<AssetFaction | "all">(
    initialFilters.faction
  );
  const [searchQuery, setSearchQuery] = useState<string>(initialFilters.query);
  const [page, setPage] = useState<number>(initialFilters.page);

  const seedRecords = useMemo(() => getInitialCodexSeedRecords(), []);
  const [activePool, setActivePool] = useState<
    readonly (CodexEntityRecord | CodexSearchIndexItem)[]
  >(seedRecords);
  const [categoryCounts, setCategoryCounts] = useState<
    Partial<Record<CodexCategoryId, number>>
  >({});
  const [totalCatalogCount, setTotalCatalogCount] = useState<number>(3518);
  const [isLoadingShard, setIsLoadingShard] = useState<boolean>(false);
  const [selectedEntity, setSelectedEntity] = useState<
    CodexEntityRecord | CodexSearchIndexItem | null
  >(null);

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
        rarity: sp.get("rarity") ?? undefined,
        faction: sp.get("faction") ?? undefined,
        q: sp.get("q") ?? undefined,
        page: sp.get("page") ?? undefined,
      });
      setCategory(parsed.category);
      setRarity(parsed.rarity);
      setFaction(parsed.faction);
      setSearchQuery(parsed.query);
      setPage(parsed.page);
    }
  }, [initialSearchParams]);

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

    if (category === "all") {
      fetchCodexSearchIndex(controller.signal)
        .then((payload) => {
          if (!mounted) return;
          setTotalCatalogCount(payload.totalEntities);
          setCategoryCounts(payload.categoryCounts);
          if (payload.items.length > 0) {
            setActivePool(payload.items);
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
            setActivePool(items);
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
  }, [category]);

  const filteredEntities = useMemo(
    () =>
      filterCodexEntities(activePool, {
        category,
        rarity,
        faction,
        query: searchQuery,
      }),
    [activePool, category, rarity, faction, searchQuery]
  );

  const paginated = useMemo(
    () => paginateCodexEntities(filteredEntities, page, CODEX_PAGE_SIZE),
    [filteredEntities, page]
  );

  const handleCategoryChange = (nextCat: CodexCategoryId | "all") => {
    setCategory(nextCat);
    setPage(1);
  };

  const handleRarityChange = (nextRarity: AssetRarity | "all") => {
    setRarity(nextRarity);
    setPage(1);
  };

  const handleFactionChange = (nextFaction: AssetFaction | "all") => {
    setFaction(nextFaction);
    setPage(1);
  };

  const handleResetFilters = () => {
    setCategory("all");
    setRarity("all");
    setFaction("all");
    setSearchQuery("");
    setPage(1);
  };

  return (
    <div data-testid="game-codex-client" className="space-y-6">
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
              ? "Tra cứu tức thì hơn 3,400 Anh hùng, Trang bị Vàng/Đỏ, Vũ khí Độc quyền, Cổ ngữ, Thánh vật, Thú cưng, Công trình và Vật phẩm sự kiện kèm thuật ngữ cộng đồng và cẩm nang liên quan."
              : "Instant lookup across 3,400+ Heroes, Golden/Mythic Gear, Exclusive Weapons, Runes, Relics, Pets, Buildings, and Event Consumables with linked tactical guides."}
          </p>
        </div>

        {/* Bilingual Instant Search Box + Quick Filter Chips */}
        <div className="pt-1 space-y-2.5">
          <div className="relative max-w-2xl">
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
                  ? "Tìm theo tên Việt (có/không dấu) hoặc tên Tiếng Anh... (VD: ngo khong, hon da do, Soul Stone)"
                  : "Search by English name, hero, item, or Game ID... (e.g., Wukong, Soul Stone, Titan)"
              }
              className="pl-10 pr-10 h-11 rounded-2xl bg-background/85 text-xs sm:text-sm border-border/80 focus-visible:ring-amber-500/30 focus-visible:border-amber-500"
            />
            {searchQuery && (
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
            )}
          </div>

          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="font-mono text-[11px] text-muted-foreground mr-1">
              {isVi ? "Tra cứu nhanh:" : "Quick lookup:"}
            </span>
            {QUICK_CODEX_CHIPS.map((chip) => {
              const target = chip.query[locale];
              const isSelected =
                searchQuery.trim().toLowerCase() === target.toLowerCase();
              return (
                <button
                  key={chip.id}
                  type="button"
                  onClick={() => {
                    setSearchQuery(isSelected ? "" : target);
                    setPage(1);
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

      {/* LAYER 2: 12 Category Tabs + Rarity & Faction Filters */}
      <section className="rounded-3xl border border-border/80 bg-card/70 p-4 sm:p-5 space-y-4">
        {/* 12 Category Tabs */}
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
              <Filter className="h-3.5 w-3.5" />
              {isVi ? "12 Danh Mục Kho Đồ Giám" : "12 Codex Categories"}
            </span>
            {(category !== "all" ||
              rarity !== "all" ||
              faction !== "all" ||
              searchQuery.trim().length > 0) && (
              <button
                type="button"
                data-testid="codex-reset-filters-btn"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1 text-xs font-mono text-muted-foreground hover:text-amber-500 transition-colors"
              >
                <RotateCcw className="h-3 w-3" />
                <span>{isVi ? "Đặt lại bộ lọc" : "Reset filters"}</span>
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {(["all", ...CODEX_CATEGORY_IDS] as const).map((catId) => {
              const isSelected = category === catId;
              const count =
                catId === "all" ? totalCatalogCount : categoryCounts[catId];
              return (
                <button
                  key={catId}
                  type="button"
                  data-testid={`codex-cat-tab-${catId}`}
                  onClick={() => handleCategoryChange(catId)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-heading font-bold transition-all min-h-[36px]",
                    isSelected
                      ? "border-amber-500 bg-amber-500 text-slate-950 shadow-xs"
                      : "border-border/70 bg-background/60 text-foreground/85 hover:border-amber-500/40 hover:text-amber-500"
                  )}
                >
                  <span>{CODEX_CATEGORY_LABELS[catId][locale]}</span>
                  {typeof count === "number" && catId !== "all" && (
                    <span
                      className={cn(
                        "rounded-md px-1.5 py-0.5 font-mono text-[10px]",
                        isSelected
                          ? "bg-slate-950/20 text-slate-950"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Rarity & Faction Sub-Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 pt-2 border-t border-border/60">
          {/* Rarity Filter */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-mono text-muted-foreground mr-1">
              {isVi ? "Phẩm cấp:" : "Rarity:"}
            </span>
            {(["all", ...CODEX_RARITY_IDS] as const).map((rId) => {
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
            })}
          </div>

          {/* Faction Filter */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-mono text-muted-foreground mr-1">
              {isVi ? "Phe phái:" : "Faction:"}
            </span>
            {(["all", ...CODEX_FACTION_IDS] as const).map((fId) => {
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
        </div>
      </section>

      {/* LAYER 3: Paginated RPG Entity Card Grid (Max 48 items/page) */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 px-1">
          <div className="text-xs font-mono text-muted-foreground">
            {isVi ? (
              <span>
                Hiển thị{" "}
                <strong className="text-amber-500">
                  {paginated.items.length}
                </strong>{" "}
                /{" "}
                <strong className="text-foreground">
                  {paginated.totalItems}
                </strong>{" "}
                thực thể khớp bộ lọc
              </span>
            ) : (
              <span>
                Showing{" "}
                <strong className="text-amber-500">
                  {paginated.items.length}
                </strong>{" "}
                of{" "}
                <strong className="text-foreground">
                  {paginated.totalItems}
                </strong>{" "}
                matching entities
              </span>
            )}
            {isLoadingShard && (
              <span className="ml-2 text-amber-500 animate-pulse">
                • {isVi ? "Đang đồng bộ phân mục..." : "Syncing shard..."}
              </span>
            )}
          </div>

          {paginated.totalPages > 1 && (
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
          )}
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
                        {item.gameId !== null && (
                          <span className="text-[10px] font-mono text-muted-foreground shrink-0">
                            #{item.gameId}
                          </span>
                        )}
                      </div>

                      <h3 className="font-heading font-bold text-xs sm:text-sm text-foreground group-hover:text-amber-500 transition-colors line-clamp-1">
                        {primaryName}
                      </h3>

                      {secondaryName && secondaryName !== primaryName && (
                        <p className="text-[11px] font-mono text-muted-foreground truncate">
                          {secondaryName}
                        </p>
                      )}
                    </div>
                  </div>

                  <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                    {desc}
                  </p>

                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-border/50 text-[10px] font-mono">
                    {communityName ? (
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
                ? "Không tìm thấy vật phẩm hoặc thực thể nào khớp với bộ lọc hiện tại."
                : "No game entities matched your active search and filter criteria."}
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleResetFilters}
              className="rounded-xl text-xs"
            >
              {isVi ? "Xóa bộ lọc & xem tất cả" : "Reset filters & view all"}
            </Button>
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

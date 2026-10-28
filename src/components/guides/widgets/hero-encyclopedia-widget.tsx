"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Search,
  X,
  Sparkles,
  Coins,
  ChevronDown,
  ChevronUp,
  Crown,
  RotateCcw,
  Eye,
} from "lucide-react";
import type {
  GuideArticle,
  GuideLocale,
  GuideTableBlock,
} from "@/content/guides/types";
import { ARTICLE_2_1_ENCYCLOPEDIA } from "@/content/guides/groups/group-2/2.1-encyclopedia";
import {
  getAssetById,
  getHeroVisualProfile,
  resolveGearSetAssetsFromText,
} from "@/content/guides/asset-registry";
import { GameAssetFrame } from "@/components/guides/media/game-asset-frame";
import { cn } from "@/lib/utils";
import { RichGuideText } from "@/components/guides/blocks/rich-guide-text";

export type HeroFaction = "all" | "horde" | "league" | "nature";
export type HeroRarity = "all" | "mythic" | "legendary" | "epic" | "rare";
export type HeroRoleCategory = "all" | "tank" | "dps" | "support" | "economy";

export interface ExtractedHeroRecord {
  id: string;
  canonicalKey: string;
  nameEn: string;
  nameVi: string;
  faction: Exclude<HeroFaction, "all">;
  rarity: Exclude<HeroRarity, "all">;
  rarityBadge: string;
  isAwakenable: boolean;
  isEconomy: boolean;
  roleCategory: "tank" | "dps" | "support";
  roleDisplay: string;
  slotDisplay: string;
  assessment: string;
  tierS0?: string;
  tierSeason?: string;
  proMvs?: {
    source: string;
    mvsMilestone: string;
    sweetSpot: string;
    gearAndAwakening: string;
  };
}

interface HeroEncyclopediaWidgetProps {
  article?: GuideArticle;
  locale?: GuideLocale;
}

const FACTION_CREST_PATHS: Record<Exclude<HeroFaction, "all">, string> = {
  horde: "/images/factions/race_horde.webp",
  league: "/images/factions/race_alliance.webp",
  nature: "/images/factions/race_nature.webp",
};

const LABELS: Record<
  GuideLocale,
  {
    badge: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    resetBtn: string;
    showingCount: (shown: number, total: number) => string;
    factionLabel: string;
    factions: Record<HeroFaction, string>;
    rarityLabel: string;
    rarities: Record<HeroRarity, string>;
    roleLabel: string;
    roles: Record<HeroRoleCategory, string>;
    awakenBadge: string;
    economyBadge: string;
    slotPrefix: string;
    tierS0Prefix: string;
    tierSeasonPrefix: string;
    portraitBtnOpen: string;
    portraitBtnClose: string;
    portraitCaption: string;
    proMvsToggleOpen: string;
    proMvsToggleClose: string;
    exclusiveWeaponLabel: string;
    sourceLabel: string;
    mvsLabel: string;
    sweetSpotLabel: string;
    gearLabel: string;
    soulStoneChipLabel: string;
    emptyState: string;
  }
> = {
  vi: {
    badge: "BÁCH KHOA TƯƠNG TÁC • 55 ANH HÙNG SSoT",
    title: "Bách Khoa Toàn Thư 55 Anh Hùng & Điểm Ngọt MVS",
    subtitle:
      "Lọc tức thì theo Phe phái, Phẩm cấp, Vai trò chiến thuật & Tra cứu mốc đầu tư chuẩn S0 ➔ S4",
    searchPlaceholder:
      "Tìm tên tướng (Wukong, Ngộ Không, Đấng Toàn Năng, Tidecaller...), bộ đồ (Bộ Đồ Titan, Cơn Thịnh Nộ...), hoặc từ khóa...",
    resetBtn: "Đặt lại bộ lọc",
    showingCount: (shown, total) => `Hiển thị ${shown} / ${total} Anh hùng`,
    factionLabel: "Phe phái:",
    factions: {
      all: "Tất cả Phe",
      horde: "Bộ Lạc",
      league: "Liên Minh",
      nature: "Thiên Nhiên",
    },
    rarityLabel: "Phẩm cấp:",
    rarities: {
      all: "Mọi Phẩm",
      mythic: "🔴 Thần Thoại",
      legendary: "🟡 Huyền Thoại",
      epic: "🟣 Sử Thi",
      rare: "🔵 Hiếm",
    },
    roleLabel: "Vai trò:",
    roles: {
      all: "Mọi Vai Trò",
      tank: "🛡️ Đỡ Đòn / Đấu Sĩ",
      dps: "⚔️ Sát Thương (DPS)",
      support: "✨ Hỗ Trợ / Hồi Máu",
      economy: "🏦 Kinh Tế Dự Bị (18)",
    },
    awakenBadge: "🔥 Thức tỉnh Đỏ (9 Đá Linh Hồn)",
    economyBadge: "🏦 Nội tại Kinh tế",
    slotPrefix: "Vị trí:",
    tierS0Prefix: "S0:",
    tierSeasonPrefix: "S1–S4:",
    portraitBtnOpen: "Chân dung",
    portraitBtnClose: "Ẩn ảnh",
    portraitCaption: "Chân dung Chiến thuật (Lihui Artwork)",
    proMvsToggleOpen: "Xem Định Mức PRO (MVS, Điểm Ngọt & Bộ Trang Bị)",
    proMvsToggleClose: "Thu gọn Định Mức PRO",
    exclusiveWeaponLabel: "Vũ Khí Độc Quyền:",
    sourceLabel: "Nguồn sở hữu:",
    mvsLabel: "Mốc dùng được (MVS):",
    sweetSpotLabel: "Điểm ngọt ROI:",
    gearLabel: "Bộ Trang Bị Vàng ➔ Đỏ & Thức tỉnh:",
    soulStoneChipLabel: "Đá Linh Hồn (Hồn Đá Đỏ)",
    emptyState:
      "Không tìm thấy Anh hùng nào khớp với bộ lọc hiện tại. Hãy thử xóa từ khóa hoặc đặt lại bộ lọc.",
  },
  en: {
    badge: "INTERACTIVE ENCYCLOPEDIA • 55 SSoT HEROES",
    title: "55-Hero Tactical Encyclopedia & MVS Sweet Spots",
    subtitle:
      "Instant filtering by Faction, Rarity, Tactical Role & S0 ➔ S4 investment benchmarks",
    searchPlaceholder:
      "Search hero name (Wukong, Tidecaller, Paragon...), gear set (Titan's Might, Fury of Blood...), or keyword...",
    resetBtn: "Reset filters",
    showingCount: (shown, total) => `Showing ${shown} / ${total} Heroes`,
    factionLabel: "Faction:",
    factions: {
      all: "All Factions",
      horde: "Horde",
      league: "League",
      nature: "Nature",
    },
    rarityLabel: "Rarity:",
    rarities: {
      all: "All Rarities",
      mythic: "🔴 Mythic",
      legendary: "🟡 Legendary",
      epic: "🟣 Epic",
      rare: "🔵 Rare",
    },
    roleLabel: "Role:",
    roles: {
      all: "All Roles",
      tank: "🛡️ Tank / Bruiser",
      dps: "⚔️ Carry DPS",
      support: "✨ Support / Healer",
      economy: "🏦 Economy Passive (18)",
    },
    awakenBadge: "🔥 Mythic Awaken (9 Soul Stones)",
    economyBadge: "🏦 Economy Passive",
    slotPrefix: "Slot:",
    tierS0Prefix: "S0:",
    tierSeasonPrefix: "S1–S4:",
    portraitBtnOpen: "Portrait",
    portraitBtnClose: "Hide Art",
    portraitCaption: "Standing Tactical Portrait (Lihui Artwork)",
    proMvsToggleOpen: "View PRO Metrics (MVS, Sweet Spot & Gear Sets)",
    proMvsToggleClose: "Hide PRO Metrics",
    exclusiveWeaponLabel: "Exclusive Weapon:",
    sourceLabel: "Acquisition:",
    mvsLabel: "Min Viable Stars (MVS):",
    sweetSpotLabel: "ROI Sweet Spot:",
    gearLabel: "Gold ➔ Mythic Gear & Awakening:",
    soulStoneChipLabel: "Red Soul Stone (Awakening)",
    emptyState:
      "No heroes match your current filters. Try clearing the search query or resetting filters.",
  },
};

function detectRarity(rawRarity: string): Exclude<HeroRarity, "all"> {
  if (rawRarity.includes("🔴") || /mythic|thần thoại/i.test(rawRarity)) {
    return "mythic";
  }
  if (rawRarity.includes("🟡") || /legendary|huyền thoại/i.test(rawRarity)) {
    return "legendary";
  }
  if (rawRarity.includes("🟣") || /epic|sử thi/i.test(rawRarity)) {
    return "epic";
  }
  return "rare";
}

function detectRoleCategory(rawRole: string): "tank" | "dps" | "support" {
  if (/tank|bruiser|defense|đỡ đòn|đấu sĩ|phòng thủ/i.test(rawRole)) {
    return "tank";
  }
  if (/dps|carry|assassin|sát thương/i.test(rawRole)) {
    return "dps";
  }
  return "support";
}

function extractShortTier(tierLabel: string): string {
  if (tierLabel.includes("S+")) return "S+";
  if (/Tier S\b/i.test(tierLabel)) return "S";
  if (/Tier A\b/i.test(tierLabel)) return "A";
  if (/Tier B\b/i.test(tierLabel)) return "B";
  return "C";
}

export function extractHeroesFromArticle21(
  sourceArticle: GuideArticle,
  locale: GuideLocale
): ExtractedHeroRecord[] {
  const sec2 = sourceArticle.freeSections.find(
    (s) => s.id === "sec-2-master-hero-directory"
  );
  const sec3 = sourceArticle.freeSections.find(
    (s) => s.id === "sec-3-stage-tier-list-and-pitfalls"
  );
  const sec4 = sourceArticle.proSections.find(
    (s) => s.id === "sec-4-mvs-and-awakening-matrix"
  );

  // Build PRO 24-Hero Lookup Map
  const proMap = new Map<
    string,
    {
      source: string;
      mvsMilestone: string;
      sweetSpot: string;
      gearAndAwakening: string;
    }
  >();

  const proSub = sec4?.subSections?.find(
    (sub) => sub.id === "sub-4-1-pro-24-heroes-table"
  );
  const proTable = proSub?.blocks.find(
    (b): b is GuideTableBlock => b.type === "table"
  );
  if (proTable) {
    for (const row of proTable.rows) {
      if (row.length >= 7) {
        const key = row[0].en.split("(")[0].trim().toLowerCase();
        proMap.set(key, {
          source: row[3][locale],
          mvsMilestone: row[4][locale],
          sweetSpot: row[5][locale],
          gearAndAwakening: row[6][locale],
        });
      }
    }
  }

  // Build Tier List Lookup from sec-3
  const tierTable = sec3?.blocks.find(
    (b): b is GuideTableBlock => b.type === "table"
  );
  const tierRows = tierTable?.rows ?? [];

  const findHeroTiers = (
    nameEn: string,
    rarity: Exclude<HeroRarity, "all">,
    isEconomy: boolean
  ): { tierS0?: string; tierSeason?: string } => {
    let tierS0: string | undefined;
    let tierSeason: string | undefined;
    const escaped = nameEn.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`\\b${escaped}\\b`, "i");

    for (const r of tierRows) {
      if (r.length < 4) continue;
      const code = extractShortTier(r[0].en);
      if (!tierS0 && regex.test(r[2].en)) {
        tierS0 = code;
      }
      if (!tierSeason && regex.test(r[3].en)) {
        tierSeason = code;
      }
    }

    if (!tierS0) {
      if (rarity === "rare") tierS0 = "C";
      else if (rarity === "epic" || isEconomy) tierS0 = "B";
    }
    if (!tierSeason) {
      if (rarity === "rare") tierSeason = "C";
      else if (rarity === "epic" || isEconomy) tierSeason = "B";
    }

    return { tierS0, tierSeason };
  };

  const factionSubMap: Array<{
    subId: string;
    faction: Exclude<HeroFaction, "all">;
  }> = [
    { subId: "sub-2-1-league-heroes", faction: "league" },
    { subId: "sub-2-2-horde-heroes", faction: "horde" },
    { subId: "sub-2-3-nature-heroes", faction: "nature" },
  ];

  const records: ExtractedHeroRecord[] = [];

  for (const { subId, faction } of factionSubMap) {
    const sub = sec2?.subSections?.find((s) => s.id === subId);
    const tableBlock = sub?.blocks.find(
      (b): b is GuideTableBlock => b.type === "table"
    );
    if (!tableBlock) continue;

    for (const row of tableBlock.rows) {
      if (row.length < 6) continue;
      const nameEn = row[0].en.trim();
      const nameVi = row[1].vi.trim();
      const canonicalKey = nameEn.toLowerCase();
      const rawRarity = row[2][locale];
      const rarity = detectRarity(row[2].en);
      const isAwakenable = /awaken|thức tỉnh/i.test(row[2].en);
      const isEconomy =
        /econ/i.test(row[2].en) ||
        /kinh tế|economy|trait 3/i.test(row[3].vi);
      const roleCategory = detectRoleCategory(row[3].en);
      const { tierS0, tierSeason } = findHeroTiers(nameEn, rarity, isEconomy);

      records.push({
        id: `${faction}-${canonicalKey.replace(/\s+/g, "-")}`,
        canonicalKey,
        nameEn,
        nameVi,
        faction,
        rarity,
        rarityBadge: rawRarity,
        isAwakenable,
        isEconomy,
        roleCategory,
        roleDisplay: row[3][locale],
        slotDisplay: row[4][locale],
        assessment: row[5][locale],
        tierS0,
        tierSeason,
        proMvs: proMap.get(canonicalKey),
      });
    }
  }

  return records;
}

export function HeroEncyclopediaWidget({
  article,
  locale = "vi",
}: HeroEncyclopediaWidgetProps) {
  const sourceArticle =
    article?.slug === "encyclopedia" ? article : ARTICLE_2_1_ENCYCLOPEDIA;
  const copy = LABELS[locale];
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [factionFilter, setFactionFilter] = useState<HeroFaction>("all");
  const [rarityFilter, setRarityFilter] = useState<HeroRarity>("all");
  const [roleFilter, setRoleFilter] = useState<HeroRoleCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedProIds, setExpandedProIds] = useState<Record<string, boolean>>(
    {}
  );
  const [expandedPortraitIds, setExpandedPortraitIds] = useState<
    Record<string, boolean>
  >({});

  const allHeroes = useMemo(
    () => extractHeroesFromArticle21(sourceArticle, locale),
    [sourceArticle, locale]
  );

  // GAP-P3-09 & GAP-P3-10: Sync with GuidesToc CustomEvent and URL #hash
  useEffect(() => {
    if (typeof window === "undefined") return;

    const applyTargetId = (targetId: string, shouldScroll: boolean) => {
      if (!targetId) return;
      let matched = false;
      if (targetId === "sub-2-1-league-heroes") {
        setFactionFilter("league");
        setRarityFilter("all");
        setRoleFilter("all");
        setSearchQuery("");
        matched = true;
      } else if (targetId === "sub-2-2-horde-heroes") {
        setFactionFilter("horde");
        setRarityFilter("all");
        setRoleFilter("all");
        setSearchQuery("");
        matched = true;
      } else if (targetId === "sub-2-3-nature-heroes") {
        setFactionFilter("nature");
        setRarityFilter("all");
        setRoleFilter("all");
        setSearchQuery("");
        matched = true;
      } else if (targetId === "sub-2-4-economy-heroes-summary") {
        setFactionFilter("all");
        setRarityFilter("all");
        setRoleFilter("economy");
        setSearchQuery("");
        matched = true;
      }

      if (matched && shouldScroll && containerRef.current) {
        if (typeof containerRef.current.scrollIntoView === "function") {
          containerRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    };

    const initialHash = window.location.hash.replace(/^#/, "");
    if (initialHash) {
      applyTargetId(initialHash, false);
    }

    const handleTocNavigate = (e: Event) => {
      const customEvent = e as CustomEvent<{
        id?: string;
        targetId?: string;
      }>;
      const targetId =
        customEvent.detail?.targetId || customEvent.detail?.id || "";
      applyTargetId(targetId, true);
    };

    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#/, "");
      applyTargetId(hash, false);
    };

    window.addEventListener("tophub:toc-navigate", handleTocNavigate);
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("tophub:toc-navigate", handleTocNavigate);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const factionCounts = useMemo(() => {
    return {
      all: allHeroes.length,
      horde: allHeroes.filter((h) => h.faction === "horde").length,
      league: allHeroes.filter((h) => h.faction === "league").length,
      nature: allHeroes.filter((h) => h.faction === "nature").length,
    };
  }, [allHeroes]);

  const filteredHeroes = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return allHeroes.filter((hero) => {
      if (factionFilter !== "all" && hero.faction !== factionFilter) {
        return false;
      }
      if (rarityFilter !== "all" && hero.rarity !== rarityFilter) {
        return false;
      }
      if (roleFilter !== "all") {
        if (roleFilter === "economy") {
          if (!hero.isEconomy) return false;
        } else if (hero.roleCategory !== roleFilter) {
          return false;
        }
      }
      if (q) {
        const haystack = [
          hero.nameEn,
          hero.nameVi,
          hero.roleDisplay,
          hero.slotDisplay,
          hero.assessment,
          hero.proMvs?.gearAndAwakening ?? "",
          hero.proMvs?.mvsMilestone ?? "",
        ]
          .join(" ")
          .replace(/[*`]/g, "")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [allHeroes, factionFilter, rarityFilter, roleFilter, searchQuery]);

  const hasActiveFilters =
    factionFilter !== "all" ||
    rarityFilter !== "all" ||
    roleFilter !== "all" ||
    searchQuery.trim().length > 0;

  const handleReset = () => {
    setFactionFilter("all");
    setRarityFilter("all");
    setRoleFilter("all");
    setSearchQuery("");
  };

  const toggleProDrawer = (id: string) => {
    setExpandedProIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const togglePortraitPreview = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedPortraitIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const soulStoneAsset = getAssetById("item-soul-stone");

  return (
    <div
      ref={containerRef}
      data-testid="widget-hero-encyclopedia"
      className="relative my-5 rounded-2xl border border-amber-500/35 bg-card/85 dark:bg-slate-950/80 p-4 sm:p-6 space-y-5 shadow-lg shadow-amber-500/5"
    >
      {/* Consolidated TOC Anchor Stubs at Widget Top (GAP-P3-10) */}
      <span
        id="sub-2-1-league-heroes"
        data-consolidated-by-widget="true"
        className="scroll-mt-28"
        aria-hidden="true"
      />
      <span
        id="sub-2-2-horde-heroes"
        data-consolidated-by-widget="true"
        className="scroll-mt-28"
        aria-hidden="true"
      />
      <span
        id="sub-2-3-nature-heroes"
        data-consolidated-by-widget="true"
        className="scroll-mt-28"
        aria-hidden="true"
      />
      <span
        id="sub-2-4-economy-heroes-summary"
        data-consolidated-by-widget="true"
        className="scroll-mt-28"
        aria-hidden="true"
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border/60">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 px-2.5 py-0.5 text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400">
            <Sparkles className="h-3 w-3" />
            <span>{copy.badge}</span>
          </div>
          <h3 className="font-heading font-black text-lg sm:text-xl text-foreground">
            {copy.title}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {copy.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <span
            data-testid="hero-results-count"
            className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 font-mono text-xs font-extrabold text-amber-600 dark:text-amber-300"
          >
            {copy.showingCount(filteredHeroes.length, allHeroes.length)}
          </span>
          {hasActiveFilters && (
            <button
              type="button"
              data-testid="hero-reset-filters"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 min-h-[44px] px-3 rounded-xl border border-border/70 bg-muted/50 hover:bg-muted text-xs font-bold text-foreground transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>{copy.resetBtn}</span>
            </button>
          )}
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          data-testid="hero-search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={copy.searchPlaceholder}
          aria-label={copy.searchPlaceholder}
          className="w-full min-h-[44px] rounded-xl border border-border/80 bg-background/90 pl-10 pr-10 py-2 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-amber-500/70 focus:ring-2 focus:ring-amber-500/20"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            aria-label="Clear search"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Multi-Dimensional Filter Pills (Touch Target >= 44px) */}
      <div className="space-y-3">
        {/* 1. Faction Filter with Real Faction Crests */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-muted-foreground min-w-[70px]">
            {copy.factionLabel}
          </span>
          {(["all", "horde", "league", "nature"] as HeroFaction[]).map(
            (fac) => {
              const isActive = factionFilter === fac;
              const crestPath =
                fac !== "all" ? FACTION_CREST_PATHS[fac] : undefined;
              return (
                <button
                  key={fac}
                  type="button"
                  data-testid={`hero-filter-faction-${fac}`}
                  aria-pressed={isActive}
                  onClick={() => setFactionFilter(fac)}
                  className={cn(
                    "inline-flex items-center gap-2 min-h-[44px] px-3.5 rounded-xl border text-xs font-bold transition-all cursor-pointer",
                    isActive
                      ? fac === "horde"
                        ? "border-rose-500 bg-rose-500/15 text-rose-600 dark:text-rose-300 shadow-sm"
                        : fac === "league"
                        ? "border-sky-500 bg-sky-500/15 text-sky-600 dark:text-sky-300 shadow-sm"
                        : fac === "nature"
                        ? "border-emerald-500 bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 shadow-sm"
                        : "border-amber-500 bg-amber-500/15 text-amber-700 dark:text-amber-300 shadow-sm"
                      : "border-border/60 bg-background/60 text-muted-foreground hover:text-foreground hover:bg-muted/40"
                  )}
                >
                  {crestPath && (
                    <img
                      src={crestPath}
                      alt={copy.factions[fac]}
                      width={20} height={20} loading="lazy"
                      decoding="async"
                      className="h-5 w-5 rounded-full object-contain shrink-0"
                    />
                  )}
                  <span>{copy.factions[fac]}</span>
                  <span className="rounded-md bg-background/70 px-1.5 py-0.5 font-mono text-[10px]">
                    {factionCounts[fac]}
                  </span>
                </button>
              );
            }
          )}
        </div>

        {/* 2. Rarity & Role Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-bold text-muted-foreground min-w-[70px]">
              {copy.rarityLabel}
            </span>
            {(
              ["all", "mythic", "legendary", "epic", "rare"] as HeroRarity[]
            ).map((rar) => {
              const isActive = rarityFilter === rar;
              return (
                <button
                  key={rar}
                  type="button"
                  data-testid={`hero-filter-rarity-${rar}`}
                  aria-pressed={isActive}
                  onClick={() => setRarityFilter(rar)}
                  className={cn(
                    "inline-flex items-center min-h-[44px] px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer",
                    isActive
                      ? "border-amber-500 bg-amber-500/15 text-amber-700 dark:text-amber-300 shadow-sm"
                      : "border-border/60 bg-background/60 text-muted-foreground hover:text-foreground hover:bg-muted/40"
                  )}
                >
                  {copy.rarities[rar]}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-bold text-muted-foreground min-w-[70px]">
              {copy.roleLabel}
            </span>
            {(
              [
                "all",
                "tank",
                "dps",
                "support",
                "economy",
              ] as HeroRoleCategory[]
            ).map((role) => {
              const isActive = roleFilter === role;
              return (
                <button
                  key={role}
                  type="button"
                  data-testid={`hero-filter-role-${role}`}
                  aria-pressed={isActive}
                  onClick={() => setRoleFilter(role)}
                  className={cn(
                    "inline-flex items-center min-h-[44px] px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer",
                    isActive
                      ? "border-amber-500 bg-amber-500/15 text-amber-700 dark:text-amber-300 shadow-sm"
                      : "border-border/60 bg-background/60 text-muted-foreground hover:text-foreground hover:bg-muted/40"
                  )}
                >
                  {copy.roles[role]}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Hero Cards Grid */}
      {filteredHeroes.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-8 text-center space-y-3">
          <p className="text-sm text-muted-foreground">{copy.emptyState}</p>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 min-h-[44px] px-4 rounded-xl bg-amber-500/15 border border-amber-500/40 text-xs font-bold text-amber-600 dark:text-amber-300 cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>{copy.resetBtn}</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {filteredHeroes.map((hero) => {
            const slug = hero.canonicalKey.replace(/\s+/g, "-");
            const isProOpen = Boolean(expandedProIds[hero.id]);
            const isPortraitOpen = Boolean(expandedPortraitIds[hero.id]);
            const heroProfile =
              getHeroVisualProfile(hero.nameEn) ??
              getHeroVisualProfile(hero.canonicalKey);
            const avatarPath =
              heroProfile?.avatarPath ?? "/images/heroes/avatars/Head_10025.webp";
            const portraitPath = heroProfile?.portraitPath ?? avatarPath;
            const exclusiveWeaponPath =
              heroProfile?.exclusiveWeaponPath ??
              "/images/equipment/exclusive-weapons/equipment_Exclusive006.webp";
            const exclusiveWeaponName =
              locale === "vi"
                ? heroProfile?.exclusiveWeaponNameVi ??
                  `${copy.exclusiveWeaponLabel} ${hero.nameEn}`
                : heroProfile?.exclusiveWeaponNameEn ??
                  `${hero.nameEn} Exclusive Gear`;
            const gearSetAssets = hero.proMvs
              ? resolveGearSetAssetsFromText(
                  hero.proMvs.gearAndAwakening,
                  hero.faction
                )
              : [];

            const factionTopGlow =
              hero.faction === "horde"
                ? "from-rose-500 via-rose-500/40 to-transparent"
                : hero.faction === "league"
                ? "from-sky-500 via-sky-500/40 to-transparent"
                : "from-emerald-500 via-emerald-500/40 to-transparent";

            return (
              <div
                key={hero.id}
                data-testid={`hero-card-${slug}`}
                className="relative overflow-hidden rounded-2xl border border-border/80 bg-card/85 p-4 flex flex-col justify-between gap-3 transition-colors hover:border-amber-500/40 shadow-sm"
              >
                <div
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r",
                    factionTopGlow
                  )}
                />
                <div className="space-y-2.5">
                  {/* Top Row: 56x56 GameAssetFrame Avatar + Name + Portrait Toggle + Tier Badges */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <GameAssetFrame
                        src={avatarPath}
                        alt={hero.nameEn}
                        rarity={hero.rarity}
                        faction={hero.faction}
                        size="lg"
                      />
                      <div className="min-w-0">
                        <h4 className="font-heading font-extrabold text-sm sm:text-base text-foreground flex flex-wrap items-center gap-1.5">
                          <span>{hero.nameEn}</span>
                          {locale === "vi" &&
                            hero.nameVi &&
                            hero.nameVi !== hero.nameEn && (
                              <span className="text-xs font-medium text-muted-foreground">
                                ({hero.nameVi})
                              </span>
                            )}
                        </h4>
                        <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[11px]">
                          <span className="rounded-md bg-muted px-2 py-0.5 font-mono font-bold text-foreground">
                            {hero.rarityBadge}
                          </span>
                          <span className="rounded-md bg-muted/60 px-2 py-0.5 text-muted-foreground font-medium">
                            {hero.roleDisplay}
                          </span>
                          <span className="text-muted-foreground">
                            • {copy.slotPrefix} {hero.slotDisplay}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Tier S0 -> S1-S4 Pill + Standing Lihui Portrait Toggle */}
                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      {hero.tierSeason && (
                        <span
                          className={cn(
                            "rounded-lg px-2 py-0.5 font-mono text-[11px] font-extrabold border",
                            hero.tierSeason === "S+"
                              ? "border-amber-500/50 bg-amber-500/15 text-amber-600 dark:text-amber-300"
                              : hero.tierSeason === "S"
                              ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300"
                              : "border-border bg-muted/50 text-muted-foreground"
                          )}
                        >
                          {copy.tierSeasonPrefix} {hero.tierSeason}
                        </span>
                      )}
                      {hero.tierS0 && hero.tierS0 !== hero.tierSeason && (
                        <span className="font-mono text-[10px] text-muted-foreground">
                          {copy.tierS0Prefix} {hero.tierS0}
                        </span>
                      )}
                      <button
                        type="button"
                        data-testid={`hero-portrait-toggle-${slug}`}
                        onClick={(e) => togglePortraitPreview(hero.id, e)}
                        className={cn(
                          "inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-[10px] font-mono font-bold transition-colors cursor-pointer",
                          isPortraitOpen
                            ? "border-amber-500/60 bg-amber-500/20 text-amber-600 dark:text-amber-300"
                            : "border-border/70 bg-background/70 text-muted-foreground hover:text-foreground"
                        )}
                      >
                        <Eye className="h-3 w-3 shrink-0" />
                        <span>
                          {isPortraitOpen
                            ? copy.portraitBtnClose
                            : copy.portraitBtnOpen}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Standing Lihui Portrait Preview Panel */}
                  {isPortraitOpen && (
                    <div
                      data-testid={`hero-portrait-preview-${slug}`}
                      className="relative overflow-hidden rounded-xl border border-amber-500/35 bg-slate-950/90 p-3 flex flex-col items-center gap-2"
                    >
                      <img
                        src={portraitPath}
                        alt={`${hero.nameEn} Standing Portrait`}
                        width={180} height={208} loading="lazy"
                        decoding="async"
                        className="max-h-52 w-auto object-contain drop-shadow-[0_8px_20px_rgba(245,158,11,0.22)]"
                      />
                      <span className="text-[11px] font-mono text-amber-300/90">
                        {copy.portraitCaption} • {hero.nameEn}
                      </span>
                    </div>
                  )}

                  {/* Special Trait Badges */}
                  {(hero.isAwakenable || hero.isEconomy) && (
                    <div className="flex flex-wrap items-center gap-1.5">
                      {hero.isAwakenable && (
                        <span className="inline-flex items-center gap-1 rounded-md border border-rose-500/30 bg-rose-500/10 px-2 py-0.5 text-[11px] font-bold text-rose-600 dark:text-rose-300">
                          {soulStoneAsset && (
                            <img
                              src={soulStoneAsset.iconPath}
                              alt=""
                              width={14} height={14} loading="lazy"
                              decoding="async"
                              className="h-3.5 w-3.5 object-contain shrink-0"
                            />
                          )}
                          <span>{copy.awakenBadge}</span>
                        </span>
                      )}
                      {hero.isEconomy && (
                        <span className="inline-flex items-center gap-1 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-300">
                          <Coins className="h-3 w-3" />
                          <span>{copy.economyBadge}</span>
                        </span>
                      )}
                    </div>
                  )}

                  {/* Combat Assessment */}
                  <RichGuideText
                    text={hero.assessment}
                    locale={locale}
                    accentColor="amber"
                    className="text-xs text-muted-foreground leading-relaxed"
                  />
                </div>

                {/* Expandable PRO MVS Drawer (Available for the 24 Core Combat Heroes) */}
                {hero.proMvs && (
                  <div className="pt-2 border-t border-border/50">
                    <button
                      type="button"
                      onClick={() => toggleProDrawer(hero.id)}
                      className="w-full min-h-[44px] flex items-center justify-between gap-2 rounded-lg bg-amber-500/10 hover:bg-amber-500/15 border border-amber-500/25 px-3 py-1.5 text-xs font-bold text-amber-700 dark:text-amber-300 transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-1.5">
                        <Crown className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                        <span>
                          {isProOpen
                            ? copy.proMvsToggleClose
                            : copy.proMvsToggleOpen}
                        </span>
                      </span>
                      {isProOpen ? (
                        <ChevronUp className="h-4 w-4 shrink-0" />
                      ) : (
                        <ChevronDown className="h-4 w-4 shrink-0" />
                      )}
                    </button>

                    {isProOpen && (
                      <div className="mt-2 rounded-xl bg-muted/40 p-3 space-y-2 text-xs">
                        {/* Visual Exclusive Weapon Banner */}
                        <div
                          data-testid={`hero-pro-uw-${slug}`}
                          className="flex items-center gap-2.5 rounded-lg border border-amber-500/30 bg-amber-500/10 p-2"
                        >
                          <GameAssetFrame
                            src={exclusiveWeaponPath}
                            alt={exclusiveWeaponName}
                            rarity="mythic"
                            faction={hero.faction}
                            size="sm"
                          />
                          <div className="min-w-0">
                            <span className="block text-[10px] font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 font-bold">
                              {copy.exclusiveWeaponLabel}
                            </span>
                            <span className="font-heading font-bold text-foreground truncate block">
                              {exclusiveWeaponName}
                            </span>
                          </div>
                        </div>

                        <div className="flex justify-between gap-2">
                          <span className="text-muted-foreground font-medium">
                            {copy.sourceLabel}
                          </span>
                          <span className="font-bold text-foreground text-right">
                            <RichGuideText
                              text={hero.proMvs.source}
                              locale={locale}
                              variant="inline"
                              accentColor="amber"
                            />
                          </span>
                        </div>
                        <div className="flex justify-between gap-2">
                          <span className="inline-flex items-center gap-1 text-muted-foreground font-medium">
                            <img
                              src="/images/items/shards/icon_30176.webp"
                              alt=""
                              width={14} height={14} loading="lazy"
                              decoding="async"
                              className="h-3.5 w-3.5 object-contain shrink-0"
                            />
                            <span>{copy.mvsLabel}</span>
                          </span>
                          <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-right">
                            <RichGuideText
                              text={hero.proMvs.mvsMilestone}
                              locale={locale}
                              variant="inline"
                              accentColor="emerald"
                            />
                          </span>
                        </div>
                        <div className="flex justify-between gap-2">
                          <span className="inline-flex items-center gap-1 text-muted-foreground font-medium">
                            <img
                              src="/images/items/shards/icon_30176.webp"
                              alt=""
                              width={14} height={14} loading="lazy"
                              decoding="async"
                              className="h-3.5 w-3.5 object-contain shrink-0"
                            />
                            <span>{copy.sweetSpotLabel}</span>
                          </span>
                          <span className="font-mono font-bold text-amber-600 dark:text-amber-300 text-right">
                            <RichGuideText
                              text={hero.proMvs.sweetSpot}
                              locale={locale}
                              variant="inline"
                              accentColor="amber"
                            />
                          </span>
                        </div>

                        {/* Visual Golden Gear Set + Awakening Soul Stone Strip */}
                        <div
                          data-testid={`hero-pro-gear-${slug}`}
                          className="pt-2 border-t border-border/40 space-y-1.5 text-[11px] text-muted-foreground"
                        >
                          <div className="flex flex-wrap items-center gap-1.5">
                            {gearSetAssets.map((gearSet) => (
                              <span
                                key={gearSet.id}
                                className="inline-flex items-center gap-1.5 rounded-lg border border-amber-500/35 bg-background/80 px-2 py-1 text-[11px] font-semibold text-foreground"
                              >
                                <img
                                  src={gearSet.iconPath}
                                  alt=""
                                  width={16} height={16} loading="lazy"
                                  decoding="async"
                                  className="h-4 w-4 rounded-sm object-contain shrink-0"
                                />
                                <span>
                                  {locale === "vi"
                                    ? gearSet.inGameNameVi
                                    : gearSet.inGameNameEn}
                                </span>
                              </span>
                            ))}
                            {soulStoneAsset && (
                              <span className="inline-flex items-center gap-1.5 rounded-lg border border-rose-500/35 bg-rose-500/10 px-2 py-1 text-[11px] font-semibold text-rose-600 dark:text-rose-300">
                                <img
                                  src={soulStoneAsset.iconPath}
                                  alt=""
                                  width={16} height={16} loading="lazy"
                                  decoding="async"
                                  className="h-4 w-4 rounded-sm object-contain shrink-0"
                                />
                                <span>{copy.soulStoneChipLabel}</span>
                              </span>
                            )}
                          </div>
                          <div>
                            <span className="font-bold text-foreground">
                              {copy.gearLabel}{" "}
                            </span>
                            <RichGuideText
                              text={hero.proMvs.gearAndAwakening}
                              locale={locale}
                              variant="inline"
                              accentColor="amber"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

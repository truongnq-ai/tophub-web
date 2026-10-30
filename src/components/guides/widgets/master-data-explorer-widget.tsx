"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Database,
  ExternalLink,
  Search,
  X,
  Crown,
  Lock,
  Sparkles,
  Table2,
} from "lucide-react";
import type {
  GuideArticle,
  GuideLocale,
  GuideParagraphBlock,
  GuideTableBlock,
} from "@/content/guides/types";
import { ARTICLE_8_4_MASTER_DATA_TABLES } from "@/content/guides/groups/group-8/8.4-master-data-tables";
import { ResponsiveDataTable } from "@/components/guides/blocks/responsive-data-table";
import { RichGuideText } from "@/components/guides/blocks/rich-guide-text";
import { GameAssetFrame } from "@/components/guides/media/game-asset-frame";
import { getAssetById } from "@/content/guides/asset-registry";
import { useUidSession } from "@/hooks/use-uid-session";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export type MasterTableGroup = "all" | "free" | "pro_core" | "pro_endgame";

export interface ExtractedMasterTable {
  id: string;
  shortCode: string;
  shortTitle: string;
  fullTitle: string;
  group: Exclude<MasterTableGroup, "all">;
  isPro: boolean;
  introParagraphs: string[];
  caption?: string;
  headers: string[];
  rows: string[][];
}

interface MasterDataExplorerWidgetProps {
  article?: GuideArticle;
  locale?: GuideLocale;
  forceUnlockPro?: boolean;
}

const LABELS: Record<
  GuideLocale,
  {
    badge: string;
    title: string;
    subtitle: string;
    globalSearchPlaceholder: string;
    groups: Record<MasterTableGroup, string>;
    rowsCountBadge: (count: number) => string;
    searchHitsHeading: (query: string, tableHits: number, rowHits: number) => string;
    noSearchHits: string;
    clearSearchBtn: string;
    proLockedTitle: string;
    proLockedDesc: string;
    proUpgradeBtn: string;
    proCheckUidBtn: string;
  }
> = {
  vi: {
    badge: "TRÌNH KHÁM PHÁ DỮ LIỆU • 12 BẢNG SSoT CHUẨN HÓA",
    title: "Trình Khám Phá 12 Bảng Số Liệu Gốc (Master Data Explorer)",
    subtitle:
      "Chuyển đổi tức thì giữa 12 bảng định lượng chuẩn S0 ➔ S4 hoặc gõ từ khóa để quét xuyên toàn bộ cơ sở dữ liệu",
    globalSearchPlaceholder:
      "Tìm xuyên 12 bảng (VD: 780,000, VIP 8, Lv.8, 327,660, 1,181.162M, 9 Đá Linh Hồn / Soul Stone...)",
    groups: {
      all: "Tất cả (12 Bảng)",
      free: "🌱 5 Bảng Sinh Tồn & Cạm Bẫy (Free)",
      pro_core: "🔥 4 Bảng PRO Hệ Thống (4.1–4.4)",
      pro_endgame: "👑 3 Bảng PRO Cuối Game & VIP (4.5–4.7)",
    },
    rowsCountBadge: (count) => `${count} dòng`,
    searchHitsHeading: (query, tableHits, rowHits) =>
      `Kết quả quét xuyên bảng cho "${query}": Tìm thấy ${rowHits} dòng khớp trong ${tableHits} bảng`,
    noSearchHits:
      "Không tìm thấy dòng số liệu nào khớp với từ khóa trong các bảng hiện hành.",
    clearSearchBtn: "Xóa tìm kiếm",
    proLockedTitle: "Bảng Cơ Sở Dữ Liệu Định Lượng PRO (Tables 4.1 ➔ 4.7)",
    proLockedDesc:
      "Mở khóa toàn bộ 7 Bảng Định Lượng PRO: Cấp Phe Phái (Faction Level) Lv.1–80, Trang Bị Thần Thoại (Mythic Gear) & Vũ Khí Độc Quyền (UW), Trang Bị Chúa Tể (Lord Gear), Cổ Ngữ / Phù Văn (Runes) Lv.1–12, Thú Cưng (Pets) Lv.1–120, Ngoại Hình Quân Lính (Quân Trang / Troop Skins) Lv.1–50 & VIP 1–20.",
    proUpgradeBtn: "Nâng Cấp PRO Ngay",
    proCheckUidBtn: "Liên Kết UID Tại Trang Chủ",
  },
  en: {
    badge: "DATA EXPLORER • 12 STANDARDIZED SSoT TABLES",
    title: "12 Master Quantitative Tables Explorer",
    subtitle:
      "Switch instantaneously across all 12 S0 ➔ S4 datasets or search globally across every row without scrolling",
    globalSearchPlaceholder:
      "Search across all 12 tables (e.g., 780,000, VIP 8, Lv.8, 327,660, 1,181.162M, 9 Soul Stones...)",
    groups: {
      all: "All (12 Tables)",
      free: "🌱 5 Survival & Pitfalls Tables (Free)",
      pro_core: "🔥 4 PRO Core Systems (4.1–4.4)",
      pro_endgame: "👑 3 PRO Endgame & VIP (4.5–4.7)",
    },
    rowsCountBadge: (count) => `${count} rows`,
    searchHitsHeading: (query, tableHits, rowHits) =>
      `Cross-table search for "${query}": Found ${rowHits} matching rows across ${tableHits} tables`,
    noSearchHits: "No quantitative rows matched your query across active tables.",
    clearSearchBtn: "Clear search",
    proLockedTitle: "PRO Master Quantitative Dataset (Tables 4.1 ➔ 4.7)",
    proLockedDesc:
      "Unlock all 7 PRO Master Quantitative Datasets (Faction Levels 1–80, Mythic Gear & Exclusive Weapons (UW), Lord Gear, Runes Lv.1–12, Pets Lv.1–120, Troop Skins Lv.1–50 & VIP 1–20).",
    proUpgradeBtn: "Upgrade to PRO Now",
    proCheckUidBtn: "Link UID on Home Page",
  },
};

const MASTER_TABLE_ICON_BY_CODE: Record<string, string> = {
  "1.1": "item-universal-shard",
  "1.2": "item-soul-stone",
  "1.3": "item-upgrade-rune",
  "1.4": "troop-rank-4",
  "3.1": "building-castle",
  "4.1": "item-stamina",
  "4.2": "gear-exclusive-weapon",
  "4.3": "gear-lord-sword",
  "4.4": "rune-slot-6",
  "4.5": "pet-flickerkit",
  "4.6": "troop-skin-samurai",
  "4.7": "item-vip-points",
};

const MASTER_TABLE_CODEX_LINK_BY_CODE: Record<
  string,
  { href: string; label: Record<GuideLocale, string> }
> = {
  "1.1": {
    href: "/guides/codex?zone=combat&cat=heroes&sub=hero-units",
    label: { vi: "Mở Codex: Anh Hùng", en: "Codex: Heroes" },
  },
  "1.2": {
    href: "/guides/codex?zone=combat&cat=heroes&sub=hero-units&extra=awakenable",
    label: { vi: "Mở Codex: Thức Tỉnh Đỏ", en: "Codex: Red Awakening" },
  },
  "1.3": {
    href: "/guides/codex?zone=gear&cat=equipment&sub=hero-gear",
    label: { vi: "Mở Codex: Trang Bị Tướng", en: "Codex: Hero Gear" },
  },
  "1.4": {
    href: "/guides/codex?zone=combat&cat=troops&sub=troop-units",
    label: { vi: "Mở Codex: Binh Chủng", en: "Codex: Troop Units" },
  },
  "3.1": {
    href: "/guides/codex?zone=economy&cat=buildings-decor&sub=city-buildings",
    label: { vi: "Mở Codex: Công Trình", en: "Codex: City Buildings" },
  },
  "4.1": {
    href: "/guides/codex?zone=combat&cat=skills-tech&sub=research-tech",
    label: { vi: "Mở Codex: Khoa Kỹ & Phe Phái", en: "Codex: Research Tech" },
  },
  "4.2": {
    href: "/guides/codex?zone=gear&cat=equipment&sub=exclusive-weapons",
    label: { vi: "Mở Codex: Vũ Khí Độc Quyền", en: "Codex: Exclusive Weapons" },
  },
  "4.3": {
    href: "/guides/codex?zone=gear&cat=equipment&sub=lord-gear",
    label: { vi: "Mở Codex: Đồ Chúa Tể", en: "Codex: Lord Gear" },
  },
  "4.4": {
    href: "/guides/codex?zone=gear&cat=equipment&sub=runes",
    label: { vi: "Mở Codex: Cổ Ngữ (Runes)", en: "Codex: Runes" },
  },
  "4.5": {
    href: "/guides/codex?zone=gear&cat=pets-behemoths&sub=companion-pets",
    label: { vi: "Mở Codex: Thú Cưng (Pets)", en: "Codex: Companion Pets" },
  },
  "4.6": {
    href: "/guides/codex?zone=combat&cat=troops&sub=troop-skins",
    label: { vi: "Mở Codex: Quân Trang", en: "Codex: Troop Skins" },
  },
  "4.7": {
    href: "/guides/codex?zone=economy&cat=shop-vip&sub=vip-perks",
    label: { vi: "Mở Codex: Đặc Quyền VIP", en: "Codex: VIP Perks" },
  },
};

const SHORT_NAMES: Record<
  string,
  { code: string; vi: string; en: string; group: Exclude<MasterTableGroup, "all"> }
> = {
  "sub-1-1-hero-star-and-skill-books-table": {
    code: "1.1",
    vi: "1.1 Sao Tướng & Sách (Shards & Books)",
    en: "1.1 Hero Stars & Skill Books",
    group: "free",
  },
  "sub-1-2-hero-awakening-cost-table": {
    code: "1.2",
    vi: "1.2 Thức Tỉnh (9 Soul Stones)",
    en: "1.2 Awakening (9 Soul Stones)",
    group: "free",
  },
  "sub-1-3-gear-enhancement-master-table": {
    code: "1.3",
    vi: "1.3 Cường Hóa +40 (Enhancement)",
    en: "1.3 Enhancement Master +40",
    group: "free",
  },
  "sub-1-4-troop-tiers-unlock-table": {
    code: "1.4",
    vi: "1.4 Bậc Lính T5–T11 (Troop Tiers)",
    en: "1.4 Troop Tiers T5–T11",
    group: "free",
  },
  "sec-3-master-tables-common-pitfalls": {
    code: "3.1",
    vi: "3.1 Cạm Bẫy Tra Bảng (Pitfalls)",
    en: "3.1 Budgeting Pitfalls",
    group: "free",
  },
  "sub-4-1-faction-level-table": {
    code: "4.1",
    vi: "4.1 Cấp Phe Phái (Faction Lv.1–80)",
    en: "4.1 Faction Level 1–80",
    group: "pro_core",
  },
  "sub-4-2-mythic-gear-and-uw-table": {
    code: "4.2",
    vi: "4.2 Đồ Đỏ & VKĐQ (Mythic & UW)",
    en: "4.2 Mythic Gear & UW Lv.20",
    group: "pro_core",
  },
  "sub-4-3-lord-gear-master-table": {
    code: "4.3",
    vi: "4.3 Đồ Chúa Tể (Lord Gear)",
    en: "4.3 Lord Gear",
    group: "pro_core",
  },
  "sub-4-4-runes-master-table": {
    code: "4.4",
    vi: "4.4 Cổ Ngữ / Phù Văn (Runes 1–12)",
    en: "4.4 Runes Lv.1–12",
    group: "pro_core",
  },
  "sub-4-5-pets-master-table": {
    code: "4.5",
    vi: "4.5 Thú Cưng (Pets Lv.1–120)",
    en: "4.5 Pets Lv.1–120",
    group: "pro_endgame",
  },
  "sub-4-6-troop-skins-master-table": {
    code: "4.6",
    vi: "4.6 Quân Trang (Troop Skins 1–50)",
    en: "4.6 Troop Skins Lv.1–50",
    group: "pro_endgame",
  },
  "sub-4-7-vip-master-table": {
    code: "4.7",
    vi: "4.7 Đặc Quyền VIP 1–20 ($)",
    en: "4.7 VIP 1–20 ($)",
    group: "pro_endgame",
  },
};

const ALIAS_TARGET_MAP: Record<string, string> = {
  "sub-1-2-awakening-soul-stones-table": "sub-1-2-hero-awakening-cost-table",
  "sub-1-3-enhancement-master-table": "sub-1-3-gear-enhancement-master-table",
  "sub-1-4-troop-tier-unlock-table": "sub-1-4-troop-tiers-unlock-table",
  "sub-4-5-pet-system-master-table": "sub-4-5-pets-master-table",
  "sub-4-6-troop-skin-master-table": "sub-4-6-troop-skins-master-table",
  "sub-4-7-vip-level-master-table": "sub-4-7-vip-master-table",
  "sec-4-seven-master-quantitative-tables": "sub-4-1-faction-level-table",
};

function normalizeSearchToken(value: string): string {
  return value
    .replace(/[*`]/g, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "d")
    .toLowerCase();
}

function matchesSearchText(text: string | undefined, rawQuery: string, foldedQuery: string): boolean {
  if (!text) return false;
  const cleaned = text.replace(/[*`]/g, "").toLowerCase();
  if (cleaned.includes(rawQuery)) return true;
  return normalizeSearchToken(text).includes(foldedQuery);
}

export function extractMasterTablesFromArticle84(
  sourceArticle: GuideArticle,
  locale: GuideLocale
): ExtractedMasterTable[] {
  const results: ExtractedMasterTable[] = [];

  const sec1 = sourceArticle.freeSections.find(
    (s) => s.id === "sec-1-four-survival-summary-tables"
  );
  for (const sub of sec1?.subSections ?? []) {
    const tableBlock = sub.blocks.find(
      (b): b is GuideTableBlock => b.type === "table"
    );
    if (!tableBlock) continue;
    const paragraphs = sub.blocks
      .filter((b): b is GuideParagraphBlock => b.type === "paragraph")
      .map((p) => p.text[locale]);
    const meta = SHORT_NAMES[sub.id];
    results.push({
      id: sub.id,
      shortCode: meta?.code ?? "1.x",
      shortTitle: meta ? meta[locale] : sub.title[locale],
      fullTitle: sub.title[locale],
      group: "free",
      isPro: false,
      introParagraphs: paragraphs,
      caption: tableBlock.caption?.[locale],
      headers: tableBlock.headers.map((h) => h[locale]),
      rows: tableBlock.rows.map((r) => r.map((c) => c[locale])),
    });
  }

  // Section 3 Pitfalls Table
  const sec3 = sourceArticle.freeSections.find(
    (s) => s.id === "sec-3-master-tables-common-pitfalls"
  );
  const sec3Table = sec3?.blocks.find(
    (b): b is GuideTableBlock => b.type === "table"
  );
  if (sec3 && sec3Table) {
    const meta = SHORT_NAMES[sec3.id];
    results.push({
      id: sec3.id,
      shortCode: meta?.code ?? "3.1",
      shortTitle: meta ? meta[locale] : sec3.title[locale],
      fullTitle: sec3.title[locale],
      group: "free",
      isPro: false,
      introParagraphs: [],
      caption: sec3Table.caption?.[locale],
      headers: sec3Table.headers.map((h) => h[locale]),
      rows: sec3Table.rows.map((r) => r.map((c) => c[locale])),
    });
  }

  // Section 4 PRO Master Tables (4.1 -> 4.7)
  const sec4 = sourceArticle.proSections.find(
    (s) => s.id === "sec-4-seven-master-quantitative-tables"
  );
  for (const sub of sec4?.subSections ?? []) {
    const tableBlock = sub.blocks.find(
      (b): b is GuideTableBlock => b.type === "table"
    );
    if (!tableBlock) continue;
    const paragraphs = sub.blocks
      .filter((b): b is GuideParagraphBlock => b.type === "paragraph")
      .map((p) => p.text[locale]);
    const meta = SHORT_NAMES[sub.id];
    results.push({
      id: sub.id,
      shortCode: meta?.code ?? "4.x",
      shortTitle: meta ? meta[locale] : sub.title[locale],
      fullTitle: sub.title[locale],
      group: meta?.group ?? "pro_core",
      isPro: true,
      introParagraphs: paragraphs,
      caption: tableBlock.caption?.[locale],
      headers: tableBlock.headers.map((h) => h[locale]),
      rows: tableBlock.rows.map((r) => r.map((c) => c[locale])),
    });
  }

  return results;
}

export function MasterDataExplorerWidget({
  article,
  locale = "vi",
  forceUnlockPro = false,
}: MasterDataExplorerWidgetProps) {
  const sourceArticle =
    article?.slug === "master-data-tables"
      ? article
      : ARTICLE_8_4_MASTER_DATA_TABLES;
  const copy = LABELS[locale];
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { activeAccount } = useUidSession();

  // GAP-P3-12: Enforce PRO paywall inside Explorer when lock is active
  const isLockEnabled =
    process.env.NEXT_PUBLIC_ENABLE_PRO_CONTENT_LOCK === "true";
  const hasProAccess =
    forceUnlockPro || !isLockEnabled || activeAccount?.active_plan === "PRO";

  const allTables = useMemo(
    () => extractMasterTablesFromArticle84(sourceArticle, locale),
    [sourceArticle, locale]
  );

  const [groupFilter, setGroupFilter] = useState<MasterTableGroup>("all");
  const [activeTableId, setActiveTableId] = useState<string>(
    "sub-1-1-hero-star-and-skill-books-table"
  );
  const [globalSearch, setGlobalSearch] = useState("");

  // GAP-P3-09 & GAP-P3-10: Sync with GuidesToc CustomEvent and URL #hash
  useEffect(() => {
    if (typeof window === "undefined") return;

    const selectTargetTable = (rawId: string, shouldScroll: boolean) => {
      if (!rawId) return;
      const resolvedId = ALIAS_TARGET_MAP[rawId] ?? rawId;
      const exists = allTables.some((t) => t.id === resolvedId);
      if (!exists) return;

      setGroupFilter("all");
      setGlobalSearch("");
      setActiveTableId(resolvedId);

      if (shouldScroll && containerRef.current) {
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
      selectTargetTable(initialHash, false);
    }

    const handleTocNavigate = (e: Event) => {
      const customEvent = e as CustomEvent<{
        id?: string;
        targetId?: string;
      }>;
      const targetId =
        customEvent.detail?.targetId || customEvent.detail?.id || "";
      selectTargetTable(targetId, true);
    };

    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#/, "");
      selectTargetTable(hash, false);
    };

    window.addEventListener("tophub:toc-navigate", handleTocNavigate);
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("tophub:toc-navigate", handleTocNavigate);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [allTables]);

  const visibleTablesForGroup = useMemo(() => {
    if (groupFilter === "all") return allTables;
    return allTables.filter((t) => t.group === groupFilter);
  }, [allTables, groupFilter]);

  const selectedTable = useMemo(() => {
    return (
      visibleTablesForGroup.find((t) => t.id === activeTableId) ??
      visibleTablesForGroup[0] ??
      allTables[0]
    );
  }, [visibleTablesForGroup, activeTableId, allTables]);

  const activeTableAsset = selectedTable
    ? getAssetById(
        MASTER_TABLE_ICON_BY_CODE[selectedTable.shortCode] ??
          "item-universal-shard"
      )
    : undefined;

  const activeCodexLink = selectedTable
    ? (MASTER_TABLE_CODEX_LINK_BY_CODE[selectedTable.shortCode] ??
      MASTER_TABLE_CODEX_LINK_BY_CODE["1.1"])
    : undefined;

  const normalizedQuery = globalSearch.trim().toLowerCase();
  const foldedQuery = useMemo(
    () => normalizeSearchToken(globalSearch.trim()),
    [globalSearch]
  );

  // Cross-Table Instant Search Results (< 20ms)
  const crossTableSearchResults = useMemo(() => {
    if (!normalizedQuery) return [];
    const results: Array<{
      table: ExtractedMasterTable;
      matchingRows: string[][];
    }> = [];

    for (const tbl of allTables) {
      if (tbl.isPro && !hasProAccess) continue;
      const matchingRows = tbl.rows.filter((row) =>
        row.some((cell) => matchesSearchText(cell, normalizedQuery, foldedQuery))
      );
      const introMatch =
        tbl.introParagraphs.some((p) =>
          matchesSearchText(p, normalizedQuery, foldedQuery)
        ) ||
        matchesSearchText(tbl.fullTitle, normalizedQuery, foldedQuery) ||
        matchesSearchText(tbl.shortTitle, normalizedQuery, foldedQuery) ||
        matchesSearchText(tbl.caption, normalizedQuery, foldedQuery) ||
        tbl.headers.some((h) =>
          matchesSearchText(h, normalizedQuery, foldedQuery)
        );
      if (matchingRows.length > 0 || introMatch) {
        results.push({
          table: tbl,
          matchingRows:
            matchingRows.length > 0 ? matchingRows : tbl.rows.slice(0, 3),
        });
      }
    }
    return results;
  }, [allTables, normalizedQuery, foldedQuery, hasProAccess]);

  const totalMatchingRows = useMemo(
    () =>
      crossTableSearchResults.reduce(
        (acc, item) => acc + item.matchingRows.length,
        0
      ),
    [crossTableSearchResults]
  );

  return (
    <div
      ref={containerRef}
      data-testid="widget-master-data-explorer"
      className="relative my-5 rounded-2xl border border-amber-500/35 bg-card/85 dark:bg-slate-950/80 p-3.5 sm:p-6 space-y-5 shadow-lg shadow-amber-500/5"
    >
      {/* Consolidated TOC Anchor Stubs at Widget Top (GAP-P3-10: Zero duplicate IDs & accurate scroll target) */}
      {allTables
        .filter((t) => t.id !== "sec-3-master-tables-common-pitfalls")
        .map((t) => (
          <span
            key={t.id}
            id={t.id}
            data-consolidated-by-widget="true"
            className="scroll-mt-28"
            aria-hidden="true"
          />
        ))}

      {/* Header */}
      <div className="space-y-1 pb-4 border-b border-border/60">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 border-0 px-3 py-1 text-xs font-sans font-bold text-amber-600 dark:text-amber-400">
          <Database className="h-3.5 w-3.5 shrink-0" />
          <span>{copy.badge}</span>
        </div>
        <h3 className="font-heading font-black text-lg sm:text-xl text-foreground">
          {copy.title}
        </h3>
        <p className="text-sm sm:text-base font-sans leading-relaxed text-muted-foreground">
          {copy.subtitle}
        </p>
      </div>

      {/* Global Cross-Table Search Input — 16px (text-base) on mobile to prevent iOS Safari auto-zoom */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          data-testid="master-global-search"
          value={globalSearch}
          onChange={(e) => setGlobalSearch(e.target.value)}
          placeholder={copy.globalSearchPlaceholder}
          aria-label={copy.globalSearchPlaceholder}
          className="h-11 min-h-11 min-h-[44px] w-full rounded-xl border border-border/80 bg-background/90 pl-10 pr-11 py-2 text-base sm:text-sm font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-amber-500/70 focus:ring-2 focus:ring-amber-500/20"
        />
        {globalSearch && (
          <button
            type="button"
            onClick={() => setGlobalSearch("")}
            aria-label={copy.clearSearchBtn}
            className="absolute right-1 top-1/2 -translate-y-1/2 h-11 w-11 min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Pillar Group Filter Tabs */}
      <div
        role="tablist"
        aria-label={copy.title}
        className="flex flex-wrap items-center gap-2"
      >
        {(
          ["all", "free", "pro_core", "pro_endgame"] as MasterTableGroup[]
        ).map((grp) => {
          const isActive = groupFilter === grp;
          return (
            <button
              key={grp}
              type="button"
              role="tab"
              aria-selected={isActive}
              data-testid={`master-group-tab-${grp}`}
              onClick={() => {
                setGroupFilter(grp);
                const firstInGrp =
                  grp === "all"
                    ? allTables[0]
                    : allTables.find((t) => t.group === grp);
                if (firstInGrp) {
                  setActiveTableId(firstInGrp.id);
                }
              }}
              className={cn(
                "min-h-11 min-h-[44px] px-3.5 py-2 rounded-xl border text-xs font-sans font-extrabold transition-all cursor-pointer",
                isActive
                  ? "border-amber-500 bg-amber-500/15 text-amber-700 dark:text-amber-300 shadow-sm"
                  : "border-border/60 bg-background/60 text-muted-foreground hover:text-foreground hover:bg-muted/40"
              )}
            >
              {copy.groups[grp]}
            </button>
          );
        })}
      </div>

      {/* 12-Table Selector Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 snap-x">
        {visibleTablesForGroup.map((tbl) => {
          const isSelected = !normalizedQuery && selectedTable?.id === tbl.id;
          const pillAsset = getAssetById(
            MASTER_TABLE_ICON_BY_CODE[tbl.shortCode] ?? "item-universal-shard"
          );
          return (
            <button
              key={tbl.id}
              type="button"
              data-testid={`master-table-pill-${tbl.id}`}
              aria-pressed={isSelected}
              onClick={() => {
                setGlobalSearch("");
                setActiveTableId(tbl.id);
              }}
              className={cn(
                "snap-start shrink-0 min-h-11 min-h-[44px] px-3.5 py-2 rounded-xl border text-xs font-sans font-bold transition-all inline-flex items-center gap-2 cursor-pointer",
                isSelected
                  ? "border-amber-500 bg-amber-500/20 text-amber-700 dark:text-amber-300 shadow-sm ring-1 ring-amber-500/40"
                  : "border-border/60 bg-background/75 text-muted-foreground hover:text-foreground hover:bg-muted/40"
              )}
            >
              {pillAsset && (
                <span
                  data-testid={`master-pill-icon-${tbl.shortCode}`}
                  className="shrink-0"
                >
                  <GameAssetFrame
                    asset={pillAsset}
                    size="xs"
                    showFactionBadge={false}
                  />
                </span>
              )}
              {tbl.isPro && (
                <Crown className="h-3.5 w-3.5 text-amber-500 shrink-0" />
              )}
              <span>{tbl.shortTitle}</span>
              <span className="rounded-md bg-background/80 px-2 py-0.5 font-sans text-xs font-semibold text-muted-foreground">
                {copy.rowsCountBadge(tbl.rows.length)}
              </span>
            </button>
          );
        })}
      </div>

      {/* Mode A: Cross-Table Global Search View */}
      {normalizedQuery ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-2 rounded-xl border-0 bg-amber-500/10 px-3.5 py-2.5 text-xs sm:text-sm font-sans font-bold text-amber-700 dark:text-amber-300">
            <span>
              {copy.searchHitsHeading(
                globalSearch,
                crossTableSearchResults.length,
                totalMatchingRows
              )}
            </span>
            <button
              type="button"
              onClick={() => setGlobalSearch("")}
              className="min-h-11 min-h-[44px] px-2.5 inline-flex items-center underline cursor-pointer shrink-0"
            >
              {copy.clearSearchBtn}
            </button>
          </div>

          {crossTableSearchResults.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border p-8 text-center text-sm sm:text-base font-sans text-muted-foreground">
              {copy.noSearchHits}
            </div>
          ) : (
            <div className="space-y-5">
              {crossTableSearchResults.map(({ table, matchingRows }) => {
                const tableFallbackAsset = getAssetById(
                  MASTER_TABLE_ICON_BY_CODE[table.shortCode] ??
                    "item-universal-shard"
                );
                const tableCodexLink =
                  MASTER_TABLE_CODEX_LINK_BY_CODE[table.shortCode] ??
                  MASTER_TABLE_CODEX_LINK_BY_CODE["1.1"];
                return (
                  <div
                    key={table.id}
                    className="border-0 border-b border-border/60 bg-transparent pb-4 last:border-b-0 last:pb-0 sm:rounded-xl sm:border sm:border-border/70 sm:bg-background/70 sm:p-4 space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="font-heading font-extrabold text-sm sm:text-base text-foreground flex items-center gap-2">
                        <Table2 className="h-4 w-4 text-amber-500 shrink-0" />
                        <span>{table.fullTitle}</span>
                      </h4>
                      {tableCodexLink && (
                        <Link
                          href={tableCodexLink.href}
                          className="inline-flex min-h-11 min-h-[44px] items-center gap-1.5 rounded-xl border border-amber-500/35 bg-amber-500/10 px-3.5 py-2 text-xs font-sans font-bold text-amber-700 dark:text-amber-300 hover:bg-amber-500/20 transition-colors"
                        >
                          <Database className="h-3.5 w-3.5 shrink-0" />
                          <span>{tableCodexLink.label[locale]}</span>
                          <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                        </Link>
                      )}
                    </div>
                    {table.introParagraphs.map((p, idx) => (
                      <RichGuideText
                        key={idx}
                        text={p}
                        accentColor="amber"
                        className="text-sm sm:text-base font-sans text-foreground/90 leading-relaxed"
                      />
                    ))}
                    <ResponsiveDataTable
                      caption={table.caption}
                      headers={table.headers}
                      rows={matchingRows}
                      locale={locale}
                      defaultExpanded={true}
                      fallbackRowAsset={tableFallbackAsset}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        /* Mode B: Single-Table Focused Explorer — Single-Layer Containment on Mobile */
        selectedTable && (
          <div className="border-0 bg-transparent p-0 sm:rounded-2xl sm:border sm:border-border/80 sm:bg-background/80 sm:p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-border/50">
              <div className="flex flex-wrap items-center gap-2.5">
                {activeTableAsset && (
                  <span
                    data-testid="master-active-table-icon"
                    className="shrink-0"
                  >
                    <GameAssetFrame
                      asset={activeTableAsset}
                      size="sm"
                      showFactionBadge={false}
                    />
                  </span>
                )}
                {selectedTable.isPro ? (
                  <span className="inline-flex items-center gap-1 rounded-lg bg-amber-500/15 border-0 px-2.5 py-1 font-mono text-xs font-extrabold text-amber-600 dark:text-amber-300">
                    <Crown className="h-3.5 w-3.5 text-amber-500" />
                    <span>PRO SSoT #{selectedTable.shortCode}</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-500/15 border-0 px-2.5 py-1 font-mono text-xs font-extrabold text-emerald-600 dark:text-emerald-300">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>FREE SSoT #{selectedTable.shortCode}</span>
                  </span>
                )}
                <h4 className="font-heading font-black text-base sm:text-lg text-foreground">
                  {selectedTable.fullTitle}
                </h4>
              </div>

              {activeCodexLink && (
                <Link
                  href={activeCodexLink.href}
                  data-testid="master-active-codex-link"
                  className="inline-flex min-h-11 min-h-[44px] items-center gap-1.5 rounded-xl border border-amber-500/40 bg-amber-500/10 px-3.5 py-2 text-xs font-sans font-extrabold text-amber-700 dark:text-amber-300 hover:bg-amber-500/20 transition-colors shrink-0"
                >
                  <Database className="h-3.5 w-3.5 shrink-0" />
                  <span>{activeCodexLink.label[locale]}</span>
                  <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                </Link>
              )}
            </div>

            {selectedTable.isPro && !hasProAccess ? (
              /* PRO Paywall Overlay for Locked PRO Tables */
              <div className="rounded-xl border-0 sm:border sm:border-amber-500/40 bg-muted/40 sm:bg-card/95 p-5 sm:p-6 text-center space-y-3">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-500">
                  <Lock className="h-5 w-5" />
                </div>
                <h5 className="font-heading font-black text-base sm:text-lg text-foreground">
                  {copy.proLockedTitle}
                </h5>
                <p className="text-sm sm:text-base font-sans text-muted-foreground max-w-lg mx-auto leading-relaxed">
                  {copy.proLockedDesc}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
                  <Link
                    href="/"
                    className="inline-flex items-center min-h-11 min-h-[44px] px-4 rounded-xl border border-amber-500/35 text-xs sm:text-sm font-sans font-bold text-foreground hover:bg-amber-500/10"
                  >
                    {copy.proCheckUidBtn}
                  </Link>
                  <Link
                    href="/pricing"
                    className="inline-flex items-center min-h-11 min-h-[44px] px-5 rounded-xl bg-amber-500 text-slate-950 text-xs sm:text-sm font-sans font-extrabold"
                  >
                    {copy.proUpgradeBtn}
                  </Link>
                </div>
              </div>
            ) : (
              <>
                {selectedTable.introParagraphs.length > 0 && (
                  <div className="space-y-2 rounded-xl border-0 bg-amber-500/10 p-3.5">
                    {selectedTable.introParagraphs.map((p, idx) => (
                      <RichGuideText
                        key={idx}
                        text={p}
                        accentColor="amber"
                        className="text-sm sm:text-base font-sans text-foreground/90 leading-relaxed"
                      />
                    ))}
                  </div>
                )}

                <ResponsiveDataTable
                  key={selectedTable.id}
                  caption={selectedTable.caption}
                  headers={selectedTable.headers}
                  rows={selectedTable.rows}
                  locale={locale}
                  defaultExpanded={true}
                  fallbackRowAsset={activeTableAsset}
                />
              </>
            )}
          </div>
        )
      )}
    </div>
  );
}

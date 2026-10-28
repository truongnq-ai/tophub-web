"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Stethoscope,
  AlertTriangle,
  ShieldCheck,
  Search,
  X,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Clock,
  RefreshCcw,
  Lock,
  Crown,
} from "lucide-react";
import type {
  GuideArticle,
  GuideCalloutBlock,
  GuideListBlock,
  GuideLocale,
  GuideTableBlock,
} from "@/content/guides/types";
import { ARTICLE_1_4_TOP_10_TRAPS } from "@/content/guides/groups/group-1/1.4-top-10-account-traps";
import { useUidSession } from "@/hooks/use-uid-session";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { RichGuideText } from "@/components/guides/blocks/rich-guide-text";
import { getAssetById } from "@/content/guides/asset-registry";
import { GameAssetFrame } from "@/components/guides/media/game-asset-frame";

const TRAP_ICON_ASSET_ID_BY_NUMBER: Record<number, string> = {
  1: "item-universal-shard",
  2: "item-soul-stone",
  3: "gear-set-knights-glory",
  4: "event-guild-arms-race",
  5: "hero-brawler",
  6: "system-research-cottage",
  7: "system-runes",
  8: "system-brilliance-institute",
  9: "gear-exclusive-weapon",
  10: "meta-staircase-promotion",
};

const TRAP_GROUP_ICON_ASSET_ID: Partial<Record<TrapSystemGroup, string>> = {
  heroes_skills: "item-skill-book",
  shops_events: "item-guild-honor",
  gear_runes: "building-blacksmith",
  infra_tech: "building-castle",
};

const TRAP_ENTITY_FOCUS_BY_NUMBER: Record<number, { vi: string; en: string }> = {
  1: {
    vi: "Mảnh Anh Hùng Huyền Thoại Vạn Năng (Mảnh Vàng Vạn Năng) vs Tướng Quán Rượu",
    en: "Universal Legendary Hero Shard vs Tavern Heroes",
  },
  2: {
    vi: "Đá Linh Hồn (9 Hồn Đá Đỏ), Điểm Vinh Dự Bang & Xu Vinh Quang Hội",
    en: "Soul Stone (Red Soul Stone), Guild Honor & Guild Glory Coins",
  },
  3: {
    vi: "Bộ Đồ Quyết Đấu / Bộ Kỵ Sĩ / Bộ Hiền Giả (+30% Dấu Ấn Phe Phái)",
    en: "Duelist's Set / Knight Set / Sage Set (+30% Faction Mark)",
  },
  4: {
    vi: "Đua Vũ Trang Bang Hội (GAR), Thi Đấu Hội, Đức Vua Tối Cao (KvK) & Hộp Quà Công Trình Chưa Mở",
    en: "Guild Arms Race (GAR), Guild Race, Supreme King (KvK) & Unopened Building Gift Box",
  },
  5: {
    vi: "Võ Sĩ (Brawler), Kỵ Sĩ (Knight), Cung Thủ (Ranger) & Nhà Thơ (Bard)",
    en: "Brawler, Knight, Ranger & Bard (Economy Passives)",
  },
  6: {
    vi: "Viện Nghiên Cứu: Chuẩn Bị Đua Vũ Trang (Arms Race Prep) vs Quân Đội (Soldiers)",
    en: "Research Cottage: Arms Race Prep vs Soldiers",
  },
  7: {
    vi: "Cổ Ngữ / Phù Văn (Runes Bậc I–V) & Rương Cổ Ngữ Vàng Tự Chọn",
    en: "Runes (Tiers I–V) & Legendary Choice Rune Chest",
  },
  8: {
    vi: "Lâu Đài (Castle) & Viện Tinh Hoa / Học Viện Rực Rỡ (Brilliance Institute)",
    en: "Castle & Brilliance Institute",
  },
  9: {
    vi: "Rương Vũ Khí Độc Quyền (Ngộ Không, Đấng Toàn Năng, Triệu Hồi Thủy, Trinh Nữ Bão Tố)",
    en: "Exclusive Weapon Chest (Wukong, Paragon, Tidecaller, Storm Maiden)",
  },
  10: {
    vi: "Thăng Cấp Lính Bậc Thang (Staircase Troop Promotion T5–T11)",
    en: "Staircase Troop Promotion (T5–T11)",
  },
};

export type TrapSystemGroup =
  | "all"
  | "heroes_skills"
  | "shops_events"
  | "gear_runes"
  | "infra_tech";

export interface ExtractedTrapRecord {
  trapNumber: number;
  subSectionId: string;
  badge: string;
  title: string;
  systemGroup: Exclude<TrapSystemGroup, "all">;
  symptoms: string[];
  whyItRuins: string;
  metaRuleTitle: string;
  metaRuleContent: string;
  severity: string;
  severityTone: "rose" | "amber" | "emerald";
  stopLossAction: string;
  recoveryTime: string;
  rerollThreshold: string;
}

export interface AccountTrapsTriageWidgetProps {
  article?: GuideArticle;
  locale?: GuideLocale;
  forceUnlockPro?: boolean;
}

const TRAP_GROUP_BY_NUMBER: Record<number, Exclude<TrapSystemGroup, "all">> = {
  1: "heroes_skills",
  2: "shops_events",
  3: "gear_runes",
  4: "shops_events",
  5: "heroes_skills",
  6: "infra_tech",
  7: "gear_runes",
  8: "infra_tech",
  9: "heroes_skills",
  10: "infra_tech",
};

const LABELS: Record<
  GuideLocale,
  {
    badge: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    clearSearch: string;
    groups: Record<TrapSystemGroup, string>;
    healthHealthy: string;
    healthWarning: (count: number) => string;
    healthCritical: (count: number) => string;
    resetTriageBtn: string;
    symptomHeading: string;
    whyItRuinsHeading: string;
    metaRuleHeading: string;
    stopLossHeading: string;
    recoveryTimeLabel: string;
    rerollThresholdLabel: string;
    diagnoseBtnClosed: string;
    diagnoseBtnOpen: string;
    proLockedTitle: string;
    proLockedDesc: string;
    proUpgradeBtn: string;
    emptyState: string;
  }
> = {
  vi: {
    badge: "TRẠM CHẨN ĐOÁN • 10 ĐIỂM KIỂM TOÁN ĐỎ 60 NGÀY ĐẦU",
    title: "Trạm Chẩn Đoán & Cấp Cứu 10 Cạm Bẫy Phế Acc (1-Click Triage)",
    subtitle:
      "Lọc theo 4 Nhóm Hệ thống hoặc bấm vào lỗi bạn đang mắc phải để mở phác đồ cắt lỗ & thời gian phục hồi tức thì",
    searchPlaceholder:
      "Tìm cạm bẫy (VD: Mảnh Anh Hùng Huyền Thoại Vạn Năng, Đá Linh Hồn, Bộ Đồ Quyết Đấu, Võ Sĩ / Brawler, Viện Tinh Hoa...)",
    clearSearch: "Xóa tìm kiếm",
    groups: {
      all: "Tất cả (10 Bẫy)",
      heroes_skills: "🦸 Tướng & Kỹ năng (#1, #5, #9)",
      shops_events: "🛒 Cửa hàng & Sự kiện (#2, #4)",
      gear_runes: "⚒️ Trang bị & Cổ ngữ (#3, #7)",
      infra_tech: "🏰 Hạ tầng & Công nghệ (#6, #8, #10)",
    },
    healthHealthy:
      "🟢 Chưa đánh dấu lỗi nào — Bấm 'Tôi đang mắc lỗi này' ở bất kỳ thẻ nào bên dưới để khám sức khỏe tài khoản",
    healthWarning: (count) =>
      `🟠 Đang mắc ${count}/10 lỗi — Cần áp dụng Phác đồ Cắt lỗ ngay lập tức (Chưa cần Reroll)`,
    healthCritical: (count) =>
      `🔴 Cảnh báo Đỏ (${count}/10 lỗi) — Kiểm tra kỹ Ngưỡng Reroll và khóa ví ngay hôm nay!`,
    resetTriageBtn: "Đặt lại chẩn đoán",
    symptomHeading: "🔍 Triệu chứng nhận diện nhanh:",
    whyItRuinsHeading: "⚠️ Cơ chế Toán học gây thọt tài khoản:",
    metaRuleHeading: "✅ Luật Thép Meta (Meta Standard Rule):",
    stopLossHeading: "🩺 Phác Đồ Cắt Lỗ Tức Thì (PRO Stop-Loss Protocol):",
    recoveryTimeLabel: "⏱️ Thời gian phục hồi:",
    rerollThresholdLabel: "🔄 Ngưỡng khuyên Reroll:",
    diagnoseBtnClosed: "🩺 Tôi đang mắc lỗi này ➔ Xem thuốc giải",
    diagnoseBtnOpen: "Đang mở Phác đồ Cứu Acc (Bấm để đóng)",
    proLockedTitle: "Phác Đồ Cắt Lỗ Định Lượng & Ngưỡng Reroll (PRO)",
    proLockedDesc:
      "Liên kết UID hoặc nâng cấp PRO để xem thao tác cắt lỗ chi tiết, số chu kỳ phục hồi và ngưỡng quyết định Reroll.",
    proUpgradeBtn: "Xem Cổng Mở Khóa PRO",
    emptyState: "Không có cạm bẫy nào khớp với bộ lọc hiện tại.",
  },
  en: {
    badge: "TRIAGE STATION • 10 RED AUDIT CHECKPOINTS (FIRST 60 DAYS)",
    title: "10 Account-Ruining Traps Diagnostic & Triage Station",
    subtitle:
      "Filter by 4 System Groups or click any trap you committed to reveal its immediate stop-loss protocol & recovery timeline",
    searchPlaceholder:
      "Search traps (e.g., Universal Legendary Hero Shard, Soul Stone, Duelist's Set, Brawler, Brilliance Institute...)",
    clearSearch: "Clear search",
    groups: {
      all: "All (10 Traps)",
      heroes_skills: "🦸 Heroes & Skills (#1, #5, #9)",
      shops_events: "🛒 Shops & Events (#2, #4)",
      gear_runes: "⚒️ Gear & Runes (#3, #7)",
      infra_tech: "🏰 Infra & Tech (#6, #8, #10)",
    },
    healthHealthy:
      "🟢 0 Traps Selected — Click 'I committed this trap' on any card below to audit your account health",
    healthWarning: (count) =>
      `🟠 ${count}/10 Active Traps — Execute Immediate Stop-Loss Protocols below (No Reroll needed yet)`,
    healthCritical: (count) =>
      `🔴 Red Alert (${count}/10 Active Traps) — Review Reroll Thresholds and freeze wallets immediately!`,
    resetTriageBtn: "Reset Triage",
    symptomHeading: "🔍 Common Symptom:",
    whyItRuinsHeading: "⚠️ Why It Ruins Your Account (Math):",
    metaRuleHeading: "✅ Meta Standard Rule:",
    stopLossHeading: "🩺 Immediate Stop-Loss Action (PRO Protocol):",
    recoveryTimeLabel: "⏱️ Recovery Time:",
    rerollThresholdLabel: "🔄 Reroll Threshold:",
    diagnoseBtnClosed: "🩺 I committed this trap ➔ View Remedy",
    diagnoseBtnOpen: "Remedy Protocol Open (Click to collapse)",
    proLockedTitle: "Quantitative Stop-Loss & Reroll Threshold (PRO)",
    proLockedDesc:
      "Link your Game UID or upgrade to PRO to unlock exact stop-loss steps, recovery cycles, and reroll thresholds.",
    proUpgradeBtn: "Jump to PRO Gate",
    emptyState: "No traps matched your current filter.",
  },
};

function detectSeverityTone(rawSeverity: string): "rose" | "amber" | "emerald" {
  if (rawSeverity.includes("🔴") || /nặng|severe/i.test(rawSeverity)) {
    return "rose";
  }
  if (rawSeverity.includes("🟢") || /nhẹ|mild/i.test(rawSeverity)) {
    return "emerald";
  }
  return "amber";
}

export function extractTrapsFromArticle14(
  sourceArticle: GuideArticle,
  locale: GuideLocale
): ExtractedTrapRecord[] {
  const sec2 = sourceArticle.freeSections.find(
    (s) => s.id === "sec-2-ten-account-traps"
  );
  const sec4 = sourceArticle.proSections.find(
    (s) => s.id === "sec-4-account-recovery-protocol"
  );
  const recoveryTable = sec4?.blocks.find(
    (b): b is GuideTableBlock => b.type === "table"
  );
  const recoveryRows = recoveryTable?.rows ?? [];

  const results: ExtractedTrapRecord[] = [];
  for (const [idx, sub] of (sec2?.subSections ?? []).entries()) {
    const trapNumber = idx + 1;
    const listBlock = sub.blocks.find(
      (b): b is GuideListBlock => b.type === "list"
    );
    const calloutBlock = sub.blocks.find(
      (b): b is GuideCalloutBlock => b.type === "callout"
    );

    const rawItems = (listBlock?.items ?? []).map((item) => item[locale]);
    const symptoms =
      rawItems.length > 1 ? rawItems.slice(0, rawItems.length - 1) : rawItems;
    const whyItRuins =
      rawItems.length > 1 ? rawItems[rawItems.length - 1] : rawItems[0] ?? "";

    const recRow = recoveryRows[idx];
    const severity = recRow?.[1]?.[locale] ?? "🟡 Moderate";
    const stopLossAction = recRow?.[2]?.[locale] ?? "";
    const recoveryTime = recRow?.[3]?.[locale] ?? "";
    const rerollThreshold = recRow?.[4]?.[locale] ?? "";

    results.push({
      trapNumber,
      subSectionId: sub.id,
      badge: sub.badge?.[locale] ?? `#${trapNumber}`,
      title: sub.title[locale].replace(/^🚫\s*/, ""),
      systemGroup: TRAP_GROUP_BY_NUMBER[trapNumber] ?? "heroes_skills",
      symptoms,
      whyItRuins,
      metaRuleTitle: calloutBlock?.title[locale] ?? "",
      metaRuleContent: calloutBlock?.content[locale] ?? "",
      severity,
      severityTone: detectSeverityTone(severity),
      stopLossAction,
      recoveryTime,
      rerollThreshold,
    });
  }

  return results;
}

export function AccountTrapsTriageWidget({
  article,
  locale = "vi",
  forceUnlockPro = false,
}: AccountTrapsTriageWidgetProps) {
  const sourceArticle =
    article?.slug === "top-10-account-traps"
      ? article
      : ARTICLE_1_4_TOP_10_TRAPS;
  const copy = LABELS[locale];
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { activeAccount } = useUidSession();

  const isLockEnabled =
    process.env.NEXT_PUBLIC_ENABLE_PRO_CONTENT_LOCK === "true";
  const hasProAccess =
    forceUnlockPro || !isLockEnabled || activeAccount?.active_plan === "PRO";

  const traps = useMemo(
    () => extractTrapsFromArticle14(sourceArticle, locale),
    [sourceArticle, locale]
  );

  const [groupFilter, setGroupFilter] = useState<TrapSystemGroup>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedTraps, setExpandedTraps] = useState<Set<number>>(
    () => new Set()
  );

  // Sync with GuidesToc CustomEvent and URL #hash
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleTargetTrap = (rawId: string, shouldScroll: boolean) => {
      const match = rawId.match(/^sub-trap-(\d+)$/);
      if (!match) return;
      const trapNum = Number(match[1]);
      if (trapNum < 1 || trapNum > 10) return;

      setGroupFilter("all");
      setSearchQuery("");
      setExpandedTraps((prev) => {
        const next = new Set(prev);
        next.add(trapNum);
        return next;
      });

      if (shouldScroll) {
        const cardEl = document.getElementById(`sub-trap-${trapNum}`);
        if (cardEl && typeof cardEl.scrollIntoView === "function") {
          cardEl.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };

    const initialHash = window.location.hash.replace(/^#/, "");
    if (initialHash) {
      handleTargetTrap(initialHash, false);
    }

    const onTocNavigate = (e: Event) => {
      const custom = e as CustomEvent<{ targetId?: string; id?: string }>;
      const targetId = custom.detail?.targetId ?? custom.detail?.id ?? "";
      handleTargetTrap(targetId, true);
    };

    const onHashChange = () => {
      const hash = window.location.hash.replace(/^#/, "");
      handleTargetTrap(hash, false);
    };

    window.addEventListener("tophub:toc-navigate", onTocNavigate);
    window.addEventListener("hashchange", onHashChange);
    return () => {
      window.removeEventListener("tophub:toc-navigate", onTocNavigate);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredTraps = useMemo(() => {
    return traps.filter((trap) => {
      if (groupFilter !== "all" && trap.systemGroup !== groupFilter) {
        return false;
      }
      if (!normalizedQuery) return true;
      const assetId = TRAP_ICON_ASSET_ID_BY_NUMBER[trap.trapNumber];
      const trapAsset = assetId ? getAssetById(assetId) : undefined;
      const assetHaystack = trapAsset
        ? [
            trapAsset.inGameNameVi,
            trapAsset.inGameNameEn,
            trapAsset.nameVi,
            trapAsset.nameEn,
            ...(trapAsset.aliases ?? []),
          ]
            .filter(Boolean)
            .join(" ")
        : "";
      const haystack = [
        trap.title,
        TRAP_ENTITY_FOCUS_BY_NUMBER[trap.trapNumber]?.[locale] ?? "",
        assetHaystack,
        ...trap.symptoms,
        trap.whyItRuins,
        trap.metaRuleContent,
        trap.stopLossAction,
      ]
        .join(" ")
        .replace(/[*`]/g, "")
        .toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [traps, groupFilter, normalizedQuery, locale]);

  const toggleTrap = (trapNum: number) => {
    setExpandedTraps((prev) => {
      const next = new Set(prev);
      if (next.has(trapNum)) {
        next.delete(trapNum);
      } else {
        next.add(trapNum);
      }
      return next;
    });
  };

  const afflictedCount = expandedTraps.size;

  return (
    <div
      ref={containerRef}
      data-testid="widget-account-traps-triage"
      className="relative my-5 rounded-2xl border border-rose-500/35 bg-card/90 dark:bg-slate-950/85 p-4 sm:p-6 space-y-5 shadow-lg shadow-rose-500/5"
    >
      {/* Header */}
      <div className="space-y-1.5 pb-4 border-b border-border/60">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/15 border border-rose-500/30 px-2.5 py-0.5 text-[11px] font-mono font-bold text-rose-600 dark:text-rose-400">
          <Stethoscope className="h-3.5 w-3.5" />
          <span>{copy.badge}</span>
        </div>
        <h3 className="font-heading font-black text-lg sm:text-xl text-foreground">
          {copy.title}
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground">
          {copy.subtitle}
        </p>
      </div>

      {/* Live Account Health Triage Banner */}
      <div
        data-testid="trap-triage-status-banner"
        className={cn(
          "flex flex-wrap items-center justify-between gap-3 rounded-xl border p-3.5 text-xs sm:text-sm font-medium transition-colors",
          afflictedCount === 0
            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
            : afflictedCount <= 2
              ? "border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300"
              : "border-rose-500/45 bg-rose-500/15 text-rose-700 dark:text-rose-300"
        )}
      >
        <div className="flex items-center gap-2">
          {afflictedCount === 0 ? (
            <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-500" />
          ) : (
            <AlertTriangle className="h-4 w-4 shrink-0 text-rose-500" />
          )}
          <span>
            {afflictedCount === 0
              ? copy.healthHealthy
              : afflictedCount <= 2
                ? copy.healthWarning(afflictedCount)
                : copy.healthCritical(afflictedCount)}
          </span>
        </div>

        {afflictedCount > 0 && (
          <button
            type="button"
            data-testid="trap-reset-triage"
            onClick={() => setExpandedTraps(new Set())}
            className="inline-flex items-center gap-1 min-h-[36px] px-3 py-1 rounded-lg border border-current/30 bg-background/60 text-xs font-bold hover:bg-background cursor-pointer"
          >
            <RefreshCcw className="h-3.5 w-3.5" />
            <span>{copy.resetTriageBtn}</span>
          </button>
        )}
      </div>

      {/* Search & 4 System Group Filter Pills */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            data-testid="trap-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={copy.searchPlaceholder}
            aria-label={copy.searchPlaceholder}
            className="w-full min-h-[44px] rounded-xl border border-border/80 bg-background/90 pl-10 pr-10 py-2 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-rose-500/70"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              aria-label={copy.clearSearch}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div role="tablist" className="flex flex-wrap items-center gap-2">
          {(
            [
              "all",
              "heroes_skills",
              "shops_events",
              "gear_runes",
              "infra_tech",
            ] as TrapSystemGroup[]
          ).map((grp) => {
            const isActive = groupFilter === grp;
            return (
              <button
                key={grp}
                type="button"
                role="tab"
                aria-selected={isActive}
                data-testid={`trap-group-filter-${grp}`}
                onClick={() => setGroupFilter(grp)}
                className={cn(
                  "min-h-[44px] px-3.5 py-2 rounded-xl border text-xs font-heading font-bold transition-all cursor-pointer inline-flex items-center gap-2",
                  isActive
                    ? "border-rose-500 bg-rose-500/15 text-rose-700 dark:text-rose-300 shadow-xs"
                    : "border-border/70 bg-background/70 text-muted-foreground hover:text-foreground hover:border-rose-500/40"
                )}
              >
                {(() => {
                  const grpAssetId = TRAP_GROUP_ICON_ASSET_ID[grp];
                  const grpAsset = grpAssetId ? getAssetById(grpAssetId) : undefined;
                  return grpAsset ? (
                    <GameAssetFrame
                      src={grpAsset.iconPath}
                      alt=""
                      size="sm"
                      rarity={grpAsset.rarity}
                      faction={grpAsset.faction}
                    />
                  ) : null;
                })()}
                <span>{copy.groups[grp]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Consolidated TOC Anchor Stubs for all 10 traps (Ensures #sub-trap-1..10 always exist in DOM even when filtered) */}
      {traps.map((t) => (
        <span
          key={t.subSectionId}
          id={t.subSectionId}
          data-consolidated-by-widget="true"
          className="scroll-mt-28"
          aria-hidden="true"
        />
      ))}

      {/* 10 Trap Cards Grid */}
      {filteredTraps.length === 0 ? (
        <div className="rounded-xl border border-border/60 bg-background/50 p-6 text-center text-xs sm:text-sm text-muted-foreground">
          {copy.emptyState}
        </div>
      ) : (
        <div className="space-y-3.5">
          {filteredTraps.map((trap) => {
            const isExpanded = expandedTraps.has(trap.trapNumber);
            return (
              <div
                key={trap.trapNumber}
                data-testid={`trap-card-${trap.trapNumber}`}
                className={cn(
                  "rounded-2xl border transition-all overflow-hidden",
                  isExpanded
                    ? "border-rose-500/60 bg-rose-500/[0.04] dark:bg-rose-950/20 shadow-md"
                    : "border-border/75 bg-background/75 hover:border-rose-500/40"
                )}
              >
                <div className="p-4 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center rounded-lg bg-rose-500/15 border border-rose-500/35 px-2.5 py-0.5 font-mono text-xs font-black text-rose-600 dark:text-rose-400">
                        {trap.badge}
                      </span>
                      <span
                        className={cn(
                          "inline-flex items-center rounded-lg border px-2.5 py-0.5 text-[11px] font-semibold",
                          trap.severityTone === "rose"
                            ? "border-rose-500/40 bg-rose-500/10 text-rose-600 dark:text-rose-300"
                            : trap.severityTone === "emerald"
                              ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300"
                              : "border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-300"
                        )}
                      >
                        {trap.severity}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-muted-foreground">
                      {copy.groups[trap.systemGroup]}
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    {(() => {
                      const assetId = TRAP_ICON_ASSET_ID_BY_NUMBER[trap.trapNumber];
                      const trapAsset = assetId ? getAssetById(assetId) : undefined;
                      if (!trapAsset) return null;
                      return (
                        <div
                          data-testid={`trap-item-icon-${trap.trapNumber}`}
                          className="shrink-0 pt-0.5"
                        >
                          <GameAssetFrame
                            src={trapAsset.iconPath}
                            alt={locale === "vi" ? trapAsset.inGameNameVi : trapAsset.inGameNameEn}
                            size="md"
                            rarity={trapAsset.rarity}
                            faction={trapAsset.faction}
                            showFactionBadge={trapAsset.faction !== "neutral"}
                            className="h-11 w-11"
                          />
                        </div>
                      );
                    })()}
                    <h4 className="font-heading font-bold text-sm sm:text-base text-foreground leading-snug flex-1">
                      <RichGuideText
                        text={trap.title}
                        variant="inline"
                        accentColor="rose"
                        locale={locale}
                      />
                      {TRAP_ENTITY_FOCUS_BY_NUMBER[trap.trapNumber]?.[locale] && (
                        <span className="mt-1.5 block text-[11px] font-mono font-semibold text-muted-foreground">
                          🎯 {TRAP_ENTITY_FOCUS_BY_NUMBER[trap.trapNumber][locale]}
                        </span>
                      )}
                    </h4>
                  </div>

                  {/* Symptom Preview */}
                  <div className="rounded-xl border border-border/60 bg-muted/30 p-3 space-y-1.5">
                    <p className="text-[11px] font-heading font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                      {copy.symptomHeading}
                    </p>
                    {trap.symptoms.map((symp, sIdx) => (
                      <RichGuideText
                        key={sIdx}
                        text={symp}
                        accentColor="rose"
                        locale={locale}
                        className="text-xs sm:text-sm text-foreground/90 leading-relaxed"
                      />
                    ))}
                  </div>

                  {/* 1-Click Diagnose & View Remedy Action Button */}
                  <div className="flex items-center justify-end pt-1">
                    <button
                      type="button"
                      data-testid={`trap-diagnose-btn-${trap.trapNumber}`}
                      aria-expanded={isExpanded}
                      onClick={() => toggleTrap(trap.trapNumber)}
                      className={cn(
                        "inline-flex items-center justify-center gap-2 min-h-[44px] w-full sm:w-auto px-4 py-2 rounded-xl border text-xs font-heading font-bold transition-all cursor-pointer",
                        isExpanded
                          ? "border-emerald-500 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                          : "border-rose-500/50 bg-rose-500/10 text-rose-700 dark:text-rose-300 hover:bg-rose-500/20"
                      )}
                    >
                      <span>
                        {isExpanded
                          ? copy.diagnoseBtnOpen
                          : copy.diagnoseBtnClosed}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4 shrink-0" />
                      ) : (
                        <ChevronDown className="h-4 w-4 shrink-0" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Expanded 2-Column Remedy & Stop-Loss Drawer */}
                {isExpanded && (
                  <div
                    data-testid={`trap-remedy-panel-${trap.trapNumber}`}
                    className="border-t border-border/70 bg-card/95 dark:bg-slate-900/90 p-4 sm:p-5 grid grid-cols-1 lg:grid-cols-2 gap-4"
                  >
                    {/* Left Column: Why it ruins + Meta Standard Rule */}
                    <div className="space-y-3">
                      <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-3.5 space-y-1.5">
                        <p className="text-xs font-heading font-bold text-amber-600 dark:text-amber-400">
                          {copy.whyItRuinsHeading}
                        </p>
                        <RichGuideText
                          text={trap.whyItRuins}
                          accentColor="amber"
                          locale={locale}
                          className="text-xs sm:text-sm text-foreground/90 leading-relaxed"
                        />
                      </div>

                      {trap.metaRuleContent && (
                        <div className="rounded-xl border border-emerald-500/35 bg-emerald-500/10 p-3.5 space-y-1.5">
                          <p className="text-xs font-heading font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                            <span>{copy.metaRuleHeading}</span>
                          </p>
                          <RichGuideText
                            text={trap.metaRuleContent}
                            accentColor="emerald"
                            locale={locale}
                            className="text-xs sm:text-sm font-medium text-foreground leading-relaxed"
                          />
                        </div>
                      )}
                    </div>

                    {/* Right Column: Quantitative Stop-Loss Protocol (PRO-aware) */}
                    <div className="space-y-3">
                      {hasProAccess ? (
                        <div className="rounded-xl border border-amber-500/40 bg-amber-500/[0.07] p-3.5 space-y-3 h-full">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-xs font-heading font-bold text-amber-600 dark:text-amber-300 flex items-center gap-1.5">
                              <Crown className="h-4 w-4 text-amber-500 shrink-0" />
                              <span>{copy.stopLossHeading}</span>
                            </p>
                          </div>

                          <RichGuideText
                            text={trap.stopLossAction}
                            accentColor="amber"
                            locale={locale}
                            className="text-xs sm:text-sm text-foreground/95 leading-relaxed"
                          />

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                            <div className="rounded-lg border border-border/60 bg-background/80 p-2.5 space-y-1">
                              <span className="text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{copy.recoveryTimeLabel}</span>
                              </span>
                              <p className="text-xs text-foreground/90 leading-snug">
                                <RichGuideText
                                  text={trap.recoveryTime}
                                  variant="inline"
                                  accentColor="amber"
                                  locale={locale}
                                />
                              </p>
                            </div>

                            <div className="rounded-lg border border-border/60 bg-background/80 p-2.5 space-y-1">
                              <span className="text-[11px] font-mono font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1">
                                <RefreshCcw className="h-3 w-3" />
                                <span>{copy.rerollThresholdLabel}</span>
                              </span>
                              <p className="text-xs text-foreground/90 leading-snug">
                                <RichGuideText
                                  text={trap.rerollThreshold}
                                  variant="inline"
                                  accentColor="rose"
                                  locale={locale}
                                />
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="rounded-xl border border-amber-500/35 bg-amber-500/5 p-4 flex flex-col justify-between gap-3 h-full">
                          <div className="space-y-1.5">
                            <div className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-amber-600 dark:text-amber-400">
                              <Lock className="h-3.5 w-3.5" />
                              <span>{copy.proLockedTitle}</span>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {copy.proLockedDesc}
                            </p>
                          </div>
                          <Link
                            href="#sec-4-account-recovery-protocol"
                            className="inline-flex items-center justify-center min-h-[40px] px-3.5 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-heading font-bold hover:bg-amber-400 transition-colors"
                          >
                            {copy.proUpgradeBtn}
                          </Link>
                        </div>
                      )}
                    </div>
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

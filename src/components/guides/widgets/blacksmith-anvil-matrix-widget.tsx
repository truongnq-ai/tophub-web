"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import {
  Ban,
  CheckCircle2,
  Hammer,
  Lock,
  Search,
  Shield,
  Sparkles,
  Swords,
  Zap,
} from "lucide-react";
import type {
  GuideArticle,
  GuideLocale,
  GuideTableBlock,
} from "@/content/guides/types";
import { ARTICLE_5_2_GOLDEN_GEAR_SETS } from "@/content/guides/groups/group-5/5.2-golden-gear-sets";
import { useUidSession } from "@/hooks/use-uid-session";

export interface BlacksmithAnvilMatrixWidgetProps {
  article?: GuideArticle;
  locale?: GuideLocale;
  forceUnlockPro?: boolean;
}

type AnvilSetId = "knights_glory" | "titan_blood" | "sage_glory";
type BisRoleFilter = "all" | "tank" | "carry" | "support";
type BisFactionFilter = "all" | "league" | "horde" | "nature";

interface AnvilRowMeta {
  id: AnvilSetId;
  rowLabel: { vi: string; en: string };
  setName: { vi: string; en: string };
  twoPieceBonus: { vi: string; en: string };
  fourPieceBonus: { vi: string; en: string };
  archetype: { vi: string; en: string };
  linkedRole: "carry" | "tank" | "support";
}

interface ParsedHeroBisRow {
  index: number;
  role: "tank" | "carry" | "support";
  faction: "league" | "horde" | "nature";
  heroAndFaction: string;
  primaryBisSet: string;
  altSet: string;
  rationale: string;
}

const CONSOLIDATED_IDS = [
  "sub-1-1-three-golden-sets-decoded-table",
  "sub-4-1-tank-bruiser-bis-table",
  "sub-4-2-carry-dps-bis-table",
  "sub-4-3-support-healer-control-bis-table",
] as const;

const ANVIL_ROWS: AnvilRowMeta[] = [
  {
    id: "knights_glory",
    rowLabel: { vi: "Hàng Trên (Row 1)", en: "Top Row (Row 1)" },
    setName: {
      vi: "⚔️ Bộ Kỵ Sĩ Vinh Quang / Cuồng Chiến (Knight's Glory / Berserker's Wrath)",
      en: "⚔️ Knight's Glory / Berserker's Wrath (Fury of the Champion)",
    },
    twoPieceBonus: {
      vi: "Bộ 2: +80% Gear ATK",
      en: "2-Pc: +80% Gear ATK",
    },
    fourPieceBonus: {
      vi: "Bộ 4: Crit Rate, Crit Dmg & +6% Damage Increase",
      en: "4-Pc: Crit Rate, Crit Dmg & +6% Damage Increase",
    },
    archetype: {
      vi: "Burst DPS & Hyper-Carry (Wukong, Storm Maiden, Paragon, Tidecaller)",
      en: "Burst DPS & Hyper-Carry (Wukong, Storm Maiden, Paragon, Tidecaller)",
    },
    linkedRole: "carry",
  },
  {
    id: "titan_blood",
    rowLabel: { vi: "Hàng Giữa (Row 2)", en: "Middle Row (Row 2)" },
    setName: {
      vi: "🩸 Bộ Huyết Titan / Nộ Huyết (Blood of the Titan / Fury of Blood)",
      en: "🩸 Blood of the Titan / Fury of Blood",
    },
    twoPieceBonus: {
      vi: "Bộ 2: +160% Gear HP & DEF",
      en: "2-Pc: +160% Gear HP & DEF",
    },
    fourPieceBonus: {
      vi: "Bộ 4: +6% Giảm Sát Thương Nhận Vào (Damage Reduction)",
      en: "4-Pc: +6% Incoming Damage Reduction",
    },
    archetype: {
      vi: "Main Tank & Khiên % Max HP (Beastmaster, Rose Princess, Desert Prince, Monk)",
      en: "Main Tank & % Max HP Shielders (Beastmaster, Rose Princess, Desert Prince, Monk)",
    },
    linkedRole: "tank",
  },
  {
    id: "sage_glory",
    rowLabel: { vi: "Hàng Dưới (Row 3)", en: "Bottom Row (Row 3)" },
    setName: {
      vi: "⚡ Bộ Hiền Triết Quang Vinh (Glory of the Sage / Glory of the Knight)",
      en: "⚡ Glory of the Sage / Glory of the Knight",
    },
    twoPieceBonus: {
      vi: "Bộ 2: +40% Gear ATK & +80% Gear HP",
      en: "2-Pc: +40% Gear ATK & +80% Gear HP",
    },
    fourPieceBonus: {
      vi: "Bộ 4: Kháng Bạo Kích, Xoay Chiêu & +8% Skill Damage Amplify",
      en: "4-Pc: Crit Res, Cooldown Cycling & +8% Skill Damage Amplify",
    },
    archetype: {
      vi: "Support / Healer / Control & Hybrid Bruiser (Witch, Bishop, Nun, Forest Maiden)",
      en: "Support / Healer / Control & Hybrid Bruiser (Witch, Bishop, Nun, Forest Maiden)",
    },
    linkedRole: "support",
  },
];

function detectFaction(text: string): "league" | "horde" | "nature" {
  if (text.includes("🔴") || /Horde|Bộ Lạc/i.test(text)) return "horde";
  if (text.includes("🟢") || /Nature|Thiên Nhiên/i.test(text)) return "nature";
  return "league";
}

export function BlacksmithAnvilMatrixWidget({
  article,
  locale = "vi",
  forceUnlockPro = false,
}: BlacksmithAnvilMatrixWidgetProps) {
  const t = useTranslations("Guides");
  const { activeAccount } = useUidSession();
  const isLockEnabled =
    process.env.NEXT_PUBLIC_ENABLE_PRO_CONTENT_LOCK === "true";
  const hasProAccess =
    forceUnlockPro || !isLockEnabled || activeAccount?.active_plan === "PRO";

  const sourceArticle =
    article?.slug === "golden-gear-sets"
      ? article
      : ARTICLE_5_2_GOLDEN_GEAR_SETS;

  const [roleFilter, setRoleFilter] = useState<BisRoleFilter>("all");
  const [factionFilter, setFactionFilter] = useState<BisFactionFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const allHeroRows = useMemo<ParsedHeroBisRow[]>(() => {
    const allSections = [
      ...(sourceArticle.freeSections ?? []),
      ...(sourceArticle.proSections ?? []),
    ];
    const proSec = allSections.find(
      (sec) => sec.id === "sec-4-three-faction-bis-gear-matrix"
    );

    const roleTableMap: {
      subId: string;
      role: "tank" | "carry" | "support";
    }[] = [
      { subId: "sub-4-1-tank-bruiser-bis-table", role: "tank" },
      { subId: "sub-4-2-carry-dps-bis-table", role: "carry" },
      { subId: "sub-4-3-support-healer-control-bis-table", role: "support" },
    ];

    const parsed: ParsedHeroBisRow[] = [];
    let globalIdx = 0;

    for (const item of roleTableMap) {
      const sub = proSec?.subSections?.find((s) => s.id === item.subId);
      const tableBlock = sub?.blocks.find(
        (b): b is GuideTableBlock => b.type === "table"
      );
      if (!tableBlock) continue;

      for (const row of tableBlock.rows) {
        const heroAndFaction = row[0]?.[locale] ?? "";
        const primaryBisSet = row[1]?.[locale] ?? "";
        const altSet = row[2]?.[locale] ?? "";
        const rationale = row[3]?.[locale] ?? "";
        parsed.push({
          index: globalIdx++,
          role: item.role,
          faction: detectFaction(heroAndFaction),
          heroAndFaction,
          primaryBisSet,
          altSet,
          rationale,
        });
      }
    }

    return parsed;
  }, [sourceArticle, locale]);

  useEffect(() => {
    const handleTocNavigate = (event: Event) => {
      const customEvent = event as CustomEvent<{ targetId?: string }>;
      const targetId = customEvent.detail?.targetId;
      if (targetId === "sub-4-1-tank-bruiser-bis-table") {
        setRoleFilter("tank");
      } else if (targetId === "sub-4-2-carry-dps-bis-table") {
        setRoleFilter("carry");
      } else if (targetId === "sub-4-3-support-healer-control-bis-table") {
        setRoleFilter("support");
      } else if (targetId === "sub-1-1-three-golden-sets-decoded-table") {
        setRoleFilter("all");
      }
    };
    window.addEventListener("tophub:toc-navigate", handleTocNavigate);
    return () => {
      window.removeEventListener("tophub:toc-navigate", handleTocNavigate);
    };
  }, []);

  const filteredHeroRows = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    return allHeroRows.filter((row) => {
      if (roleFilter !== "all" && row.role !== roleFilter) return false;
      if (factionFilter !== "all" && row.faction !== factionFilter)
        return false;
      if (normalizedQuery) {
        const haystack =
          `${row.heroAndFaction} ${row.primaryBisSet} ${row.altSet} ${row.rationale}`.toLowerCase();
        if (!haystack.includes(normalizedQuery)) return false;
      }
      return true;
    });
  }, [allHeroRows, roleFilter, factionFilter, searchQuery]);

  return (
    <div
      data-testid="widget-blacksmith-anvil-matrix"
      className="my-6 rounded-2xl border border-amber-500/30 bg-gradient-to-b from-[#141824]/95 via-[#0F131D]/95 to-[#0B0E14]/95 p-4 sm:p-6 shadow-[0_14px_36px_rgba(0,0,0,0.45)]"
    >
      {/* Consolidated SSoT Anchor Stubs */}
      {CONSOLIDATED_IDS.map((id) => (
        <span
          key={id}
          id={id}
          data-consolidated-by-widget="true"
          className="scroll-mt-28"
          aria-hidden="true"
        />
      ))}

      {/* Widget Header */}
      <div className="flex flex-col gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-300">
            <Hammer className="h-3.5 w-3.5 text-amber-400" />
            <span>
              {locale === "vi"
                ? "Ma Trận Lò Rèn 3×4 & Phối Đồ BiS 24 Tướng"
                : "3×4 Blacksmith Anvil Matrix & 24-Hero BiS Explorer"}
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white">
            {t("widgetAnvilTitle")}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            {t("widgetAnvilSubtitle")}
          </p>
        </div>

        {/* Column 4 Forbidden Taboo Banner */}
        <div
          data-testid="anvil-col4-forbidden-banner"
          className="flex items-start gap-2.5 rounded-xl border border-rose-500/40 bg-rose-500/15 px-3.5 py-2.5 text-xs text-rose-100 sm:max-w-sm"
        >
          <Ban className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
          <div>
            <div className="font-bold uppercase tracking-wide text-rose-300">
              {locale === "vi"
                ? "❌ Cấm Tuyệt Đối Đúc Cột 4 (Không Dấu Hệ)"
                : "❌ Never Forge Column 4 (Unmarked Gear)"}
            </div>
            <p className="mt-0.5 text-[11px] leading-snug text-rose-100/90">
              {locale === "vi"
                ? "Tốn cùng lượng Thỏi Vàng nhưng mất vĩnh viễn +30% chỉ số Dấu Ấn Phe Phái!"
                : "Costs the exact same Gold Ingots while permanently losing +30% Faction Mark stats!"}
            </p>
          </div>
        </div>
      </div>

      {/* 3x4 Blacksmith Anvil Matrix */}
      <div className="mt-5 space-y-3">
        {ANVIL_ROWS.map((row) => (
          <div
            key={row.id}
            data-testid={`anvil-row-${row.id}`}
            className="rounded-xl border border-white/10 bg-[#0B0E14]/90 p-3.5 sm:p-4"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="rounded bg-amber-500/15 px-2 py-0.5 font-mono text-[11px] font-bold text-amber-300">
                  {row.rowLabel[locale]}
                </span>
                <h4 className="mt-1 text-sm sm:text-base font-bold text-white">
                  {row.setName[locale]}
                </h4>
                <p className="mt-0.5 text-xs text-slate-300">
                  {row.archetype[locale]}
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 text-[11px]">
                <span className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 font-mono font-semibold text-amber-200">
                  {row.twoPieceBonus[locale]}
                </span>
                <span className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 font-mono font-semibold text-emerald-200">
                  {row.fourPieceBonus[locale]}
                </span>
              </div>
            </div>

            {/* 4 Blacksmith Columns */}
            <div className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-4">
              <button
                type="button"
                onClick={() => {
                  setRoleFilter(row.linkedRole);
                  setFactionFilter("league");
                }}
                className="min-h-11 flex items-center justify-between rounded-lg border border-blue-500/35 bg-blue-500/10 px-3 py-2 text-left text-xs text-blue-100 transition hover:bg-blue-500/20"
              >
                <span className="font-bold">
                  {locale === "vi" ? "Cột 1: 🔵 Liên Minh" : "Col 1: 🔵 League"}
                </span>
                <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 font-mono text-[11px] font-bold text-emerald-300">
                  +30% Stats
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setRoleFilter(row.linkedRole);
                  setFactionFilter("horde");
                }}
                className="min-h-11 flex items-center justify-between rounded-lg border border-rose-500/35 bg-rose-500/10 px-3 py-2 text-left text-xs text-rose-100 transition hover:bg-rose-500/20"
              >
                <span className="font-bold">
                  {locale === "vi" ? "Cột 2: 🔴 Bộ Lạc" : "Col 2: 🔴 Horde"}
                </span>
                <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 font-mono text-[11px] font-bold text-emerald-300">
                  +30% Stats
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setRoleFilter(row.linkedRole);
                  setFactionFilter("nature");
                }}
                className="min-h-11 flex items-center justify-between rounded-lg border border-emerald-500/35 bg-emerald-500/10 px-3 py-2 text-left text-xs text-emerald-100 transition hover:bg-emerald-500/20"
              >
                <span className="font-bold">
                  {locale === "vi"
                    ? "Cột 3: 🟢 Thiên Nhiên"
                    : "Col 3: 🟢 Nature"}
                </span>
                <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 font-mono text-[11px] font-bold text-emerald-300">
                  +30% Stats
                </span>
              </button>

              <div className="min-h-11 flex items-center justify-between rounded-lg border border-rose-500/40 bg-rose-950/40 px-3 py-2 text-xs text-rose-300 opacity-85">
                <span className="font-bold line-through">
                  {locale === "vi"
                    ? "Cột 4: ⚪ Không Hệ"
                    : "Col 4: ⚪ Unmarked"}
                </span>
                <span className="rounded bg-rose-500/30 px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase text-rose-200">
                  {locale === "vi" ? "❌ CẤM ĐÚC" : "❌ FORBIDDEN"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 24-Hero BiS Gear Explorer */}
      <div className="mt-6 rounded-xl border border-white/10 bg-[#0B0E14]/90 p-4 sm:p-5">
        <div className="flex flex-col gap-3 border-b border-white/10 pb-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-400" />
              <h4 className="text-sm sm:text-base font-bold text-white">
                {locale === "vi"
                  ? "Tra Cứu Phối Đồ Vàng Chuẩn BiS Cho 24 Tướng Chủ Lực (3 Phe)"
                  : "24-Hero Best-in-Slot (BiS) Golden Gear Explorer"}
              </h4>
              {!hasProAccess && (
                <span className="inline-flex items-center gap-1 rounded bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                  <Lock className="h-3 w-3" /> PRO
                </span>
              )}
            </div>
            <p className="mt-0.5 text-xs text-slate-400">
              {locale === "vi"
                ? `Hiển thị ${filteredHeroRows.length} / ${allHeroRows.length} hồ sơ tướng SSoT (6 Tank • 8 Carry • 10 Support)`
                : `Showing ${filteredHeroRows.length} / ${allHeroRows.length} SSoT hero profiles (6 Tank • 8 Carry • 10 Support)`}
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-64">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              data-testid="bis-hero-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                locale === "vi"
                  ? "Tìm tướng (VD: Wukong, Beastmaster)..."
                  : "Search hero (e.g., Wukong, Beastmaster)..."
              }
              className="min-h-11 w-full rounded-xl border border-white/15 bg-black/40 pl-9 pr-3 text-xs text-white placeholder:text-slate-400 focus:border-amber-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Role & Faction Filter Pills */}
        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-1.5">
            {(
              [
                {
                  id: "all",
                  label: { vi: "Tất cả Vai trò (24)", en: "All Roles (24)" },
                },
                {
                  id: "tank",
                  label: { vi: "🛡️ Tank / Đấu Sĩ (6)", en: "🛡️ Tank / Bruiser (6)" },
                },
                {
                  id: "carry",
                  label: { vi: "⚔️ Carry / DPS (8)", en: "⚔️ Carry / DPS (8)" },
                },
                {
                  id: "support",
                  label: {
                    vi: "⚡ Hỗ Trợ / Khống Chế (10)",
                    en: "⚡ Support / Control (10)",
                  },
                },
              ] as const
            ).map((pill) => (
              <button
                key={pill.id}
                type="button"
                data-testid={`bis-role-filter-${pill.id}`}
                onClick={() => setRoleFilter(pill.id)}
                className={`min-h-11 rounded-lg border px-3 py-1.5 text-xs font-bold transition ${
                  roleFilter === pill.id
                    ? "border-amber-400/60 bg-amber-500/20 text-amber-200"
                    : "border-white/10 bg-white/[0.03] text-slate-300 hover:bg-white/[0.07]"
                }`}
              >
                {pill.label[locale]}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {(
              [
                { id: "all", label: { vi: "Mọi Phe", en: "All Factions" } },
                { id: "league", label: { vi: "🔵 League", en: "🔵 League" } },
                { id: "horde", label: { vi: "🔴 Horde", en: "🔴 Horde" } },
                { id: "nature", label: { vi: "🟢 Nature", en: "🟢 Nature" } },
              ] as const
            ).map((pill) => (
              <button
                key={pill.id}
                type="button"
                data-testid={`bis-faction-filter-${pill.id}`}
                onClick={() => setFactionFilter(pill.id)}
                className={`min-h-11 rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition ${
                  factionFilter === pill.id
                    ? "border-amber-400/60 bg-amber-500/20 text-amber-200"
                    : "border-white/10 bg-white/[0.03] text-slate-300 hover:bg-white/[0.07]"
                }`}
              >
                {pill.label[locale]}
              </button>
            ))}
          </div>
        </div>

        {/* Hero BiS Cards */}
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
          {filteredHeroRows.map((row) => (
            <div
              key={row.index}
              data-testid={`bis-hero-row-${row.index}`}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5 transition hover:border-amber-500/30"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="text-xs sm:text-sm font-bold text-white">
                  {row.heroAndFaction}
                </div>
                <span className="shrink-0 rounded bg-white/10 px-2 py-0.5 font-mono text-[10px] uppercase text-slate-300">
                  {row.role === "tank" ? (
                    <span className="inline-flex items-center gap-1 text-amber-300">
                      <Shield className="h-3 w-3" /> Tank
                    </span>
                  ) : row.role === "carry" ? (
                    <span className="inline-flex items-center gap-1 text-rose-300">
                      <Swords className="h-3 w-3" /> Carry
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-emerald-300">
                      <Zap className="h-3 w-3" /> Support
                    </span>
                  )}
                </span>
              </div>

              <div className="mt-2 rounded-lg border border-amber-500/25 bg-amber-500/10 px-2.5 py-1.5 text-xs font-semibold text-amber-200">
                <span className="inline-flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-amber-400" />
                  <span>BiS #1: {row.primaryBisSet}</span>
                </span>
              </div>

              <div className="mt-1.5 text-[11px] text-slate-300">
                <span className="font-semibold text-slate-400">
                  {locale === "vi" ? "Phương án phụ: " : "Alt Set: "}
                </span>
                {row.altSet}
              </div>

              <p className="mt-2 border-t border-white/10 pt-2 text-xs leading-relaxed text-slate-300">
                {row.rationale}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

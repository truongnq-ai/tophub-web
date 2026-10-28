"use client";

import React, { useEffect } from "react";
import { ArrowRight, BookOpen, Hash, Sparkles, X } from "lucide-react";
import { Link } from "@/i18n/routing";
import { getArticleBySlug } from "@/content/guides/registry";
import type {
  CodexEntityRecord,
  CodexSearchIndexItem,
  GuideLocale,
} from "@/content/guides/types";
import { GameAssetFrame } from "@/components/guides/media/game-asset-frame";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CODEX_CATEGORY_LABELS,
  CODEX_FACTION_LABELS,
  CODEX_RARITY_LABELS,
} from "./codex-utils";

export interface CodexEntityDrawerProps {
  readonly entity: CodexEntityRecord | CodexSearchIndexItem | null;
  readonly locale: GuideLocale;
  readonly onClose: () => void;
}

export function CodexEntityDrawer({
  entity,
  locale,
  onClose,
}: CodexEntityDrawerProps) {
  useEffect(() => {
    if (!entity) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [entity, onClose]);

  if (!entity) return null;

  const isVi = locale === "vi";
  const primaryName = isVi ? entity.nameVi : entity.nameEn;
  const secondaryBilingualName = isVi ? entity.nameEn : null;
  const communityName = isVi ? entity.communityNameVi : entity.communityNameEn;
  const description = isVi ? entity.descVi : entity.descEn;

  const categoryLabel =
    CODEX_CATEGORY_LABELS[entity.category]?.[locale] ?? entity.category;
  const rarityLabel =
    CODEX_RARITY_LABELS[entity.rarity]?.[locale] ?? entity.rarity;
  const factionLabel =
    CODEX_FACTION_LABELS[entity.faction]?.[locale] ?? entity.faction;

  const relatedArticles = entity.relatedArticleSlugs
    .map((fullSlug) => {
      const [catSlug, artSlug] = fullSlug.split("/");
      if (!catSlug || !artSlug) return null;
      return getArticleBySlug(catSlug, artSlug) ?? null;
    })
    .filter((a): a is NonNullable<typeof a> => a !== null);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-end bg-slate-950/70 backdrop-blur-xs p-3 sm:p-5"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="codex-drawer-title"
        data-testid="codex-entity-drawer"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl border border-amber-500/35 bg-card/95 p-5 sm:p-6 shadow-2xl space-y-5"
      >
        {/* Header + Close Button */}
        <div className="flex items-start justify-between gap-3 border-b border-border/70 pb-4">
          <div className="flex items-center gap-3.5 min-w-0">
            <GameAssetFrame
              src={entity.path}
              alt={primaryName}
              size="xl"
              rarity={entity.rarity}
              faction={entity.faction}
            />
            <div className="min-w-0 space-y-1">
              <div className="flex flex-wrap items-center gap-1.5">
                <Badge
                  variant="outline"
                  className="font-mono text-[10px] border-amber-500/40 text-amber-500"
                >
                  {categoryLabel}
                </Badge>
                <Badge variant="outline" className="font-mono text-[10px]">
                  {rarityLabel}
                </Badge>
                {entity.faction !== "neutral" && (
                  <Badge variant="outline" className="font-mono text-[10px]">
                    {factionLabel}
                  </Badge>
                )}
              </div>

              <h2
                id="codex-drawer-title"
                className="font-heading font-black text-lg sm:text-xl text-foreground leading-snug"
              >
                {primaryName}
              </h2>

              {secondaryBilingualName &&
                secondaryBilingualName !== primaryName && (
                  <p className="text-xs font-mono text-amber-500">
                    EN: {secondaryBilingualName}
                  </p>
                )}
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            size="icon"
            data-testid="codex-drawer-close-btn"
            onClick={onClose}
            aria-label={isVi ? "Đóng chi tiết" : "Close details"}
            className="h-11 w-11 shrink-0 rounded-xl border-border/80"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Full Portrait Preview (if available for Heroes) */}
        {entity.portraitPath ? (
          <div className="rounded-2xl border border-border/70 bg-slate-950/60 p-3 flex items-center justify-center">
            <img
              src={entity.portraitPath}
              alt={primaryName}
              width={180}
              height={208}
              loading="lazy"
              decoding="async"
              className="max-h-52 w-auto object-contain rounded-xl"
            />
          </div>
        ) : null}

        {/* Variant / Upgrade Stage Gallery (when multiple sprites were deduplicated into this entity) */}
        {entity.galleryPaths && entity.galleryPaths.length > 1 ? (
          <div className="rounded-2xl border border-border/70 bg-background/50 p-3 space-y-2">
            <span className="text-[10px] font-mono uppercase text-muted-foreground block">
              {isVi
                ? `Biến thể hình ảnh & Cấp bậc (${entity.galleryPaths.length})`
                : `Visual Variants & Upgrade Stages (${entity.galleryPaths.length})`}
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {entity.galleryPaths.slice(0, 8).map((gPath) => (
                <GameAssetFrame
                  key={gPath}
                  src={gPath}
                  alt={primaryName}
                  size="md"
                  rarity={entity.rarity}
                  faction={entity.faction}
                />
              ))}
            </div>
          </div>
        ) : null}

        {/* Metadata Badges (Community Term, Game ID, Glossary ID) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
          {communityName && (
            <div className="rounded-2xl border border-border/70 bg-background/60 p-3 space-y-0.5">
              <span className="text-[10px] font-mono uppercase text-muted-foreground flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-amber-500" />
                {isVi ? "Thuật ngữ Cẩm nang" : "Tactical Guide Term"}
              </span>
              <p className="font-heading font-bold text-foreground">
                {communityName}
              </p>
            </div>
          )}

          {entity.gameId !== null && (
            <div className="rounded-2xl border border-border/70 bg-background/60 p-3 space-y-0.5">
              <span className="text-[10px] font-mono uppercase text-muted-foreground flex items-center gap-1">
                <Hash className="h-3 w-3 text-amber-500" />
                {isVi ? "Mã định danh Game ID" : "In-Game Asset ID"}
              </span>
              <p className="font-mono font-bold text-amber-500">
                #{entity.gameId}
              </p>
            </div>
          )}
        </div>

        {/* In-Game Effect & Tactical Usage Description */}
        <div className="rounded-2xl border border-amber-500/25 bg-amber-500/5 p-4 space-y-1.5">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            {isVi
              ? "Công Dụng & Vai Trò Chiến Thuật"
              : "In-Game Effect & Tactical Role"}
          </h3>
          <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Related Tactical Guide Articles */}
        <div
          data-testid="codex-drawer-related-guides"
          className="space-y-2.5 pt-1"
        >
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5 text-amber-500" />
            <span>
              {isVi
                ? "Cẩm Nang Chiến Thuật Liên Quan"
                : "Related Strategy Guides"}
            </span>
          </h3>

          <div className="space-y-2">
            {relatedArticles.map((art) => (
              <Link
                key={`${art.categorySlug}/${art.slug}`}
                href={`/guides/${art.categorySlug}/${art.slug}`}
                onClick={onClose}
                className="group flex items-center justify-between gap-2.5 rounded-2xl border border-border/80 bg-background/70 hover:border-amber-500/50 p-3 text-xs transition-all"
              >
                <div className="min-w-0 space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[11px] font-bold text-amber-500">
                      #{art.code}
                    </span>
                    <span className="font-heading font-bold text-foreground group-hover:text-amber-500 truncate">
                      {art.title[locale]}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground line-clamp-1">
                    {art.summary[locale]}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-amber-500 shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import {
  CALCULATOR_ZONES,
  HOT_CALCULATOR_TAGS,
  getAdjacentCalculatorTools,
  getCategoryUniqueMaterials,
  searchCalculators,
} from "@/content/calculators/registry";
import type {
  CalculatorCategory,
  CalculatorLocale,
  CalculatorToolItem,
  CalculatorZone,
} from "@/content/calculators/types";
import { categoryIcons } from "./calculators-sidebar";
import { HeroStarsCalculator } from "./hero-stars-calculator";
import { HeroAwakeningCalculator } from "./hero-awakening-calculator";
import { HeroTraitsCalculator } from "./hero-traits-calculator";
import { GameAssetFrame } from "@/components/guides/media/game-asset-frame";
import { GuideCommentsSection } from "@/components/guides/guide-comments-section";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Calculator,
  Clock,
  Sparkles,
  Database,
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Layers,
  Search,
  X,
  HelpCircle,
  SlidersHorizontal,
  CheckCircle2,
} from "lucide-react";

interface CalculatorPlaceholderViewProps {
  mode: "hub" | "tool";
  zone?: CalculatorZone;
  category?: CalculatorCategory;
  tool?: CalculatorToolItem;
}

export function CalculatorPlaceholderView({
  mode,
  zone,
  category,
  tool,
}: CalculatorPlaceholderViewProps) {
  const rawLocale = useLocale();
  const locale: CalculatorLocale = rawLocale === "en" ? "en" : "vi";
  const t = useTranslations("Calculators");

  const [hubSearchQuery, setHubSearchQuery] = useState("");

  const hubSearchResults = useMemo(() => {
    if (hubSearchQuery.trim().length < 2) return null;
    return searchCalculators(hubSearchQuery, locale);
  }, [hubSearchQuery, locale]);

  if (mode === "tool" && category && tool) {
    const { prev, next } = getAdjacentCalculatorTools(category.slug, tool.slug);
    const CategoryIcon = categoryIcons[category.iconName] || Calculator;
    const example = tool.exampleCase[locale];

    return (
      <div
        data-testid="calculator-tool-placeholder"
        className="space-y-6 max-w-5xl"
      >
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground"
        >
          <Link
            href="/calculators"
            className="hover:text-amber-500 transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40 rounded-md px-1 py-0.5"
          >
            {t("backToHub")}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          {zone && (
            <>
              <span className="text-muted-foreground/80">
                {zone.label[locale]}
              </span>
              <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            </>
          )}
          <span className="text-amber-500 font-semibold">
            {category.title[locale]}
          </span>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <span className="text-foreground font-semibold">
            {tool.title[locale]}
          </span>
        </nav>

        {tool.slug === "hero-traits" ? (
          <HeroTraitsCalculator
            zone={zone}
            category={category}
            tool={tool}
            locale={locale}
          />
        ) : tool.slug === "hero-awakening" ? (
          <HeroAwakeningCalculator
            zone={zone}
            category={category}
            tool={tool}
            locale={locale}
          />
        ) : tool.slug === "hero-stars" ? (
          <HeroStarsCalculator
            zone={zone}
            category={category}
            tool={tool}
            locale={locale}
          />
        ) : (
        /* Main RPG Under-Development Card */
        <section className="card-rpg relative overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-card to-card p-6 sm:p-8 shadow-sm">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-300">
              <Clock className="w-3.5 h-3.5" />
              {t("underDevelopmentBadge")}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/80 border border-border px-3 py-1 text-xs font-mono font-bold text-muted-foreground">
              <Layers className="w-3.5 h-3.5 text-amber-500" />
              {t("phaseBadgeLabel", { phase: tool.phaseNumber })}
            </span>
          </div>

          <div className="flex items-start gap-3.5 mb-3">
            <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 shadow-md shrink-0 mt-0.5">
              <CategoryIcon className="h-6 w-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-black tracking-tight text-foreground">
              {tool.fullTitle[locale]}
            </h1>
          </div>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
            {tool.summary[locale]}
          </p>

          {/* Under Development Banner Box */}
          <div
            data-testid="calculator-under-development-banner"
            className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 sm:p-5 mb-6"
          >
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/15 text-amber-500 shrink-0 mt-0.5">
                <Calculator className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <h2 className="text-sm font-heading font-bold text-foreground">
                  {t("underDevelopmentTitle")}
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {t("underDevelopmentMessage")}
                </p>
                <div className="pt-1 flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 font-medium">
                  <Database className="w-3.5 h-3.5 shrink-0" />
                  <span>
                    {t("dataSourceLabel")}{" "}
                    <code className="font-mono font-bold">
                      {tool.dataSourceTab[locale]}
                    </code>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* UX-UPGRADE-05: Real-World Scenario & Input -> Output Simulation Preview */}
          <div
            data-testid="calculator-example-preview"
            className="rounded-2xl border border-border/80 bg-background/75 p-4 sm:p-5 mb-6 space-y-3.5"
          >
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-500 shrink-0" />
              <h3 className="text-xs font-mono font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                {t("exampleSectionTitle")}
              </h3>
            </div>

            <div className="rounded-xl border border-amber-500/25 bg-amber-500/[0.04] p-3.5">
              <div className="text-[11px] font-mono font-bold uppercase text-amber-600 dark:text-amber-400 mb-1">
                {t("exampleQuestionLabel")}
              </div>
              <p className="text-xs sm:text-sm font-medium text-foreground leading-relaxed">
                {example.question}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="rounded-xl border border-border/70 bg-card/70 p-3.5 space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-muted-foreground">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-amber-500" />
                  <span>{t("exampleInputLabel")}</span>
                </div>
                <p className="text-xs text-foreground/90 leading-relaxed font-medium">
                  {example.inputPreview}
                </p>
              </div>

              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/[0.05] p-3.5 space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{t("exampleOutputLabel")}</span>
                </div>
                <p className="text-xs text-foreground font-bold leading-relaxed">
                  {example.outputPreview}
                </p>
              </div>
            </div>
          </div>

          {/* UX-UPGRADE-02: Official In-Game Items & Currencies with <GameAssetFrame> */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-extrabold uppercase tracking-wider text-muted-foreground">
              {t("materialsSectionTitle")}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {tool.materials.map((mat) => {
                const matName = locale === "vi" ? mat.nameVi : mat.nameEn;
                return (
                  <div
                    key={mat.gameId}
                    className="flex items-center gap-3 rounded-2xl border border-border/70 bg-background/75 p-3 shadow-sm hover:border-amber-500/35 transition-colors"
                  >
                    <GameAssetFrame
                      src={mat.iconPath}
                      alt={matName}
                      rarity={mat.rarity}
                      faction={mat.faction}
                      size="md"
                    />
                    <div className="min-w-0">
                      <div className="text-xs font-heading font-bold text-foreground truncate">
                        {matName}
                      </div>
                      <div className="text-[11px] font-mono text-muted-foreground truncate">
                        ID: {mat.gameId}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        )}

        {/* Prev / Next Navigation Footer (Touch Target >= 44px) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
          {prev ? (
            <Link
              href={`/calculators/${prev.categorySlug}/${prev.slug}`}
              className="flex items-center gap-2.5 rounded-2xl border border-border/70 bg-card/65 px-4 py-3 min-h-[48px] text-xs hover:border-amber-500/50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40"
            >
              <ArrowLeft className="w-4 h-4 text-amber-500 shrink-0" />
              <div>
                <div className="text-[10px] font-mono text-muted-foreground uppercase font-semibold">
                  {t("prevTool")}
                </div>
                <div className="font-heading font-bold text-foreground">
                  {prev.title[locale]}
                </div>
              </div>
            </Link>
          ) : (
            <Link
              href="/calculators"
              className="flex items-center gap-2 rounded-2xl border border-border/70 bg-card/65 px-4 py-3 min-h-[48px] text-xs font-heading font-bold text-muted-foreground hover:text-foreground transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40"
            >
              <ArrowLeft className="w-4 h-4" />
              {t("backToHub")}
            </Link>
          )}

          {next && (
            <Link
              href={`/calculators/${next.categorySlug}/${next.slug}`}
              className="flex items-center justify-end gap-2.5 rounded-2xl border border-border/70 bg-card/65 px-4 py-3 min-h-[48px] text-xs text-right hover:border-amber-500/50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40"
            >
              <div>
                <div className="text-[10px] font-mono text-muted-foreground uppercase font-semibold">
                  {t("nextTool")}
                </div>
                <div className="font-heading font-bold text-foreground">
                  {next.title[locale]}
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-amber-500 shrink-0" />
            </Link>
          )}
        </div>

        {/* UX-UPGRADE-01: Live Discussion & Feedback Comments Section (#comments) */}
        <GuideCommentsSection
          pageKey={`calculators:${category.slug}/${tool.slug}`}
          locale={locale}
        />
      </div>
    );
  }

  /* Mode === "hub" (/calculators Overview Page) */
  return (
    <div data-testid="calculators-hub-placeholder" className="space-y-8">
      {/* Hero Banner with Instant Search & Hot Calculator Tags (UX-UPGRADE-03) */}
      <section className="card-rpg relative overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-500/15 via-card to-card p-6 sm:p-8 lg:p-10 shadow-sm">
        <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-300">
              <Sparkles className="w-3.5 h-3.5" />
              {t("hubBadge")}
            </span>
            <span
              data-testid="calculator-under-development-banner"
              className="inline-flex items-center gap-1.5 rounded-full bg-amber-500 text-slate-950 px-3 py-1 text-xs font-black uppercase tracking-wider"
            >
              <Clock className="w-3.5 h-3.5" />
              {t("underDevelopmentBadge")}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-heading font-black tracking-tight text-foreground leading-tight">
            {t("hubTitle")}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {t("hubSubtitle")}
          </p>

          {/* Hero Instant Search Bar + 5 Clickable Hot Tags (Mobile & Desktop accessible) */}
          <div className="pt-1 max-w-xl space-y-2.5">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-amber-500" />
              <Input
                type="text"
                data-testid="calculators-hub-search-input"
                value={hubSearchQuery}
                onChange={(e) => setHubSearchQuery(e.target.value)}
                placeholder={t("searchPlaceholder")}
                className="pl-11 pr-11 h-12 rounded-2xl bg-background/85 border-amber-500/30 text-sm shadow-inner focus-visible:ring-amber-500/40"
              />
              {hubSearchQuery && (
                <button
                  type="button"
                  onClick={() => setHubSearchQuery("")}
                  aria-label={t("clearSearch")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-mono text-muted-foreground mr-1">
                {t("hotTagsLabel")}
              </span>
              {HOT_CALCULATOR_TAGS.map((tag, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setHubSearchQuery(tag.query[locale])}
                  className="rounded-lg border border-amber-500/25 bg-amber-500/10 hover:bg-amber-500/20 px-2.5 py-1 min-h-[32px] font-mono text-[11px] font-semibold text-amber-600 dark:text-amber-400 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40"
                >
                  {tag.label[locale]}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-amber-500/30 bg-background/75 p-4 text-xs sm:text-sm text-muted-foreground leading-relaxed">
            <strong className="text-foreground font-heading font-bold">
              {t("underDevelopmentTitle")}:
            </strong>{" "}
            {t("underDevelopmentMessage")}
          </div>
        </div>
      </section>

      {/* Instant Hero Search Results Overlay OR 3 Zones -> 9 Category Bento Cards */}
      {hubSearchResults !== null ? (
        <section
          data-testid="calculators-hub-search-results"
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-heading font-black text-foreground flex items-center gap-2">
              <Search className="h-5 w-5 text-amber-500" />
              <span>
                {t("searchResultsCount", { count: hubSearchResults.length })}
              </span>
            </h2>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setHubSearchQuery("")}
              className="text-xs text-muted-foreground min-h-[40px] cursor-pointer"
            >
              {t("clearSearch")}
            </Button>
          </div>

          {hubSearchResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {hubSearchResults.map(({ category: cat, tool: toolItem }) => (
                <Link
                  key={`${cat.slug}/${toolItem.slug}`}
                  href={`/calculators/${cat.slug}/${toolItem.slug}`}
                  className="group rounded-2xl border border-border/80 bg-card/70 p-5 hover:border-amber-500/50 hover:shadow-md transition-all flex flex-col justify-between gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400">
                        {cat.title[locale]} • {toolItem.code}
                      </span>
                      {toolItem.status === "ready" ? (
                        <span className="rounded-full bg-emerald-500/15 border border-emerald-500/40 px-2.5 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                          {t("readyBadge")}
                        </span>
                      ) : (
                        <span className="rounded-full bg-amber-500/15 border border-amber-500/35 px-2.5 py-0.5 text-[10px] font-bold text-amber-600 dark:text-amber-400">
                          {t("underDevelopmentBadge")}
                        </span>
                      )}
                    </div>
                    <h3 className="font-heading font-bold text-base text-foreground group-hover:text-amber-500 transition-colors">
                      {toolItem.fullTitle[locale]}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {toolItem.summary[locale]}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-border/50">
                    <div className="flex items-center gap-1.5">
                      {toolItem.materials.slice(0, 4).map((mat) => (
                        <GameAssetFrame
                          key={mat.gameId}
                          src={mat.iconPath}
                          alt={locale === "vi" ? mat.nameVi : mat.nameEn}
                          rarity={mat.rarity}
                          faction={mat.faction}
                          size="sm"
                        />
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-heading font-bold text-amber-500">
                      {t("startWithToolBtn", { code: toolItem.code })}
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-border p-10 text-center space-y-3">
              <p className="text-sm text-muted-foreground">
                {t("searchNoResults")}
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={() => setHubSearchQuery("")}
                className="min-h-[44px] cursor-pointer"
              >
                {t("clearSearch")}
              </Button>
            </div>
          )}
        </section>
      ) : (
        /* 3 Zones -> 9 Category Groups -> 21 Sub-Calculators Directory (UX-UPGRADE-02 & UX-UPGRADE-04) */
        <section className="space-y-6">
          <h2 className="text-lg sm:text-xl font-heading font-black tracking-tight text-foreground">
            {t("exploreToolsTitle")}
          </h2>

          {CALCULATOR_ZONES.map((zoneItem) => (
            <div key={zoneItem.id} className="space-y-3.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  {zoneItem.label[locale]}
                </span>
                <div className="flex-1 h-px bg-border/60" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {zoneItem.categories.map((cat) => {
                  const Icon = categoryIcons[cat.iconName] || Calculator;
                  const uniqueMaterials = getCategoryUniqueMaterials(cat);
                  const firstTool = cat.tools[0];

                  return (
                    <div
                      key={cat.slug}
                      className="rounded-3xl border border-border/80 bg-card/65 p-5 sm:p-6 flex flex-col justify-between gap-4 hover:border-amber-500/40 transition-all shadow-sm"
                    >
                      <div className="space-y-3">
                        {/* Category Header with Gradient Icon Badge & PHASE 0X Pill */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 shadow-md shrink-0">
                              <Icon className="h-5 w-5" />
                            </div>
                            <div className="min-w-0">
                              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                                PHASE 0{cat.phaseNumber}
                              </span>
                              <h3 className="text-base sm:text-lg font-heading font-black text-foreground leading-snug truncate">
                                {cat.title[locale]}
                              </h3>
                            </div>
                          </div>

                          <span className="rounded-full bg-secondary border border-border/80 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-muted-foreground shrink-0">
                            {t("toolsCountBadge", { count: cat.tools.length })}
                          </span>
                        </div>

                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {cat.description[locale]}
                        </p>

                        {/* UX-UPGRADE-02: Rarity-Framed Material Icons Preview Strip */}
                        <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                          {uniqueMaterials.slice(0, 6).map((mat) => {
                            const matName =
                              locale === "vi" ? mat.nameVi : mat.nameEn;
                            return (
                              <div key={mat.gameId} title={matName}>
                                <GameAssetFrame
                                  src={mat.iconPath}
                                  alt={matName}
                                  rarity={mat.rarity}
                                  faction={mat.faction}
                                  size="sm"
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Sub-Calculators List (Touch Target >= 44px) */}
                      <div className="space-y-1.5 pt-3 border-t border-border/60">
                        {cat.tools.map((toolItem) => (
                          <Link
                            key={toolItem.slug}
                            href={`/calculators/${cat.slug}/${toolItem.slug}`}
                            className="flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 min-h-[44px] text-xs font-medium bg-secondary/40 hover:bg-amber-500/15 hover:text-amber-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40"
                          >
                            <span className="truncate flex items-center gap-1.5">
                              <strong className="font-mono text-[11px] text-amber-500">
                                {toolItem.code}
                              </strong>
                              <span>
                                {toolItem.title[locale].replace(
                                  `${toolItem.code} `,
                                  ""
                                )}
                              </span>
                            </span>
                            <span
                              className={
                                toolItem.status === "ready"
                                  ? "inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 shrink-0"
                                  : "inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 dark:text-amber-400 shrink-0"
                              }
                            >
                              {toolItem.status === "ready"
                                ? t("readyBadge")
                                : t("underDevelopmentBadge")}
                              <ChevronRight className="w-3.5 h-3.5" />
                            </span>
                          </Link>
                        ))}

                        {firstTool && (
                          <div className="pt-1.5">
                            <Link
                              href={`/calculators/${cat.slug}/${firstTool.slug}`}
                              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500/15 hover:bg-amber-500 hover:text-slate-950 border border-amber-500/35 px-3.5 py-2 min-h-[44px] font-heading font-bold text-xs text-amber-600 dark:text-amber-400 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40"
                            >
                              <span>
                                {t("startWithToolBtn", {
                                  code: firstTool.code,
                                })}
                              </span>
                              <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* UX-UPGRADE-01: Live Discussion & Feedback Comments Section (#comments) */}
      <GuideCommentsSection pageKey="calculators:hub" locale={locale} />
    </div>
  );
}

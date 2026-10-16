import React from "react";
import {
  Clock,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  FileText,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import type {
  GuideArticle,
  GuideCategory,
  GuideContentBlock,
  GuideLocale,
  GuideSection,
} from "@/content/guides/types";
import { CalloutBox } from "./blocks/callout-box";
import { ResponsiveDataTable } from "./blocks/responsive-data-table";
import { StepRoadmap } from "./blocks/step-roadmap";
import { TldrActionBox } from "./blocks/tldr-action-box";
import { VisualDiagramBlock } from "./blocks/visual-diagram-block";
import { InteractiveChecklistBlock } from "./blocks/interactive-checklist-block";
import { CaseStudyBlock } from "./blocks/case-study-block";
import { MediaSpotlightBlock } from "./blocks/media-spotlight-block";
import { ProContentGate } from "./pro-content-gate";
import { Badge } from "@/components/ui/badge";

interface GuideArticleRendererProps {
  category: GuideCategory;
  article: GuideArticle;
  prevArticle: GuideArticle | null;
  nextArticle: GuideArticle | null;
}

function renderBlock(
  block: GuideContentBlock,
  locale: GuideLocale,
  idx: number
) {
  switch (block.type) {
    case "paragraph":
      return (
        <p
          key={idx}
          className="text-sm sm:text-base text-foreground/90 leading-relaxed"
        >
          {block.text[locale]}
        </p>
      );
    case "list":
      if (block.ordered) {
        return (
          <ol
            key={idx}
            className="list-decimal list-inside space-y-2 text-sm sm:text-base text-foreground/90 pl-1"
          >
            {block.items.map((item, i) => (
              <li key={i} className="leading-relaxed">
                {item[locale]}
              </li>
            ))}
          </ol>
        );
      }
      return (
        <ul
          key={idx}
          className="space-y-2 text-sm sm:text-base text-foreground/90 pl-1"
        >
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
              <span>{item[locale]}</span>
            </li>
          ))}
        </ul>
      );
    case "callout":
      return (
        <CalloutBox
          key={idx}
          variant={block.variant}
          title={block.title[locale]}
          content={block.content[locale]}
        />
      );
    case "table":
      return (
        <ResponsiveDataTable
          key={idx}
          caption={block.caption?.[locale]}
          headers={block.headers.map((h) => h[locale])}
          rows={block.rows.map((r) => r.map((c) => c[locale]))}
        />
      );
    case "roadmap":
      return (
        <StepRoadmap
          key={idx}
          steps={block.steps.map((s) => ({
            badge: s.badge[locale],
            title: s.title[locale],
            timing: s.timing[locale],
            description: s.description[locale],
          }))}
        />
      );
    case "visual_diagram":
      return <VisualDiagramBlock key={idx} block={block} locale={locale} />;
    case "checklist":
      return (
        <InteractiveChecklistBlock key={idx} block={block} locale={locale} />
      );
    case "case_study":
      return <CaseStudyBlock key={idx} block={block} locale={locale} />;
    case "media_spotlight":
      return <MediaSpotlightBlock key={idx} block={block} locale={locale} />;
    case "widget":
      return null;
  }
}

function renderSection(section: GuideSection, locale: GuideLocale) {
  return (
    <div key={section.id} id={section.id} className="scroll-mt-24 space-y-5">
      <h2 className="font-heading font-bold text-lg sm:text-xl text-foreground border-l-4 border-amber-500 pl-3.5">
        {section.title[locale]}
      </h2>
      {section.blocks.length > 0 && (
        <div className="space-y-4">
          {section.blocks.map((block, idx) => renderBlock(block, locale, idx))}
        </div>
      )}
      {section.subSections && section.subSections.length > 0 && (
        <div className="space-y-6 pt-1">
          {section.subSections.map((sub) => (
            <div
              key={sub.id}
              id={sub.id}
              className="scroll-mt-24 rounded-2xl border border-border/70 bg-background/45 p-4 sm:p-5 space-y-3.5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-heading font-bold text-base sm:text-lg text-amber-600 dark:text-amber-400">
                  {sub.title[locale]}
                </h3>
                {sub.badge && (
                  <Badge
                    variant="outline"
                    className="font-mono text-[11px] border-amber-500/30 text-amber-600 dark:text-amber-400"
                  >
                    {sub.badge[locale]}
                  </Badge>
                )}
              </div>
              <div className="space-y-3.5">
                {sub.blocks.map((block, idx) => renderBlock(block, locale, idx))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function GuideArticleRenderer({
  category,
  article,
  prevArticle,
  nextArticle,
}: GuideArticleRendererProps) {
  const t = useTranslations("Guides");
  const rawLocale = useLocale();
  const locale: GuideLocale = rawLocale === "en" ? "en" : "vi";

  return (
    <article className="space-y-8">
      {/* Breadcrumb & Header Card */}
      <div className="card-rpg rounded-3xl p-5 sm:p-8 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2 font-mono">
            <Link
              href="/guides"
              className="hover:text-amber-500 transition-colors flex items-center gap-1"
            >
              <BookOpen className="h-3.5 w-3.5 text-amber-500" />
              <span>{t("backToHub")}</span>
            </Link>
            <span>/</span>
            <span className="text-amber-600 dark:text-amber-400 font-bold">
              {category.order}. {category.title[locale]}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="font-mono text-xs border-amber-500/30 text-amber-600 dark:text-amber-400"
            >
              #{article.code}
            </Badge>
            <span className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5 text-amber-500" />
              {t("readingTime", { minutes: article.readingMinutes })}
            </span>
          </div>
        </div>

        <h1 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-foreground leading-tight">
          {article.title[locale]}
        </h1>

        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          {article.summary[locale]}
        </p>

        {/* Structured 30-Second TL;DR Action Box (v2.0) */}
        {article.tldr && (
          <TldrActionBox tldr={article.tldr} locale={locale} />
        )}

        {/* Key Takeaways Box */}
        {article.keyTakeaways.length > 0 && (
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4 space-y-2.5">
            <h3 className="text-xs font-heading font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" />
              <span>{t("keyTakeawaysTitle")}</span>
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-sm text-foreground/90">
              {article.keyTakeaways.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span>{item[locale]}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Free Sections */}
      <div className="rounded-3xl border border-border/80 bg-card/60 p-5 sm:p-7 space-y-6">
        {article.freeSections.map((section) => renderSection(section, locale))}
      </div>

      {/* PRO Sections wrapped in ProContentGate */}
      {article.proSections.length > 0 && (
        <ProContentGate>
          {article.proSections.map((section) => renderSection(section, locale))}
        </ProContentGate>
      )}

      {/* Standardized Knowledge Sources Footer */}
      {article.sourceFiles.length > 0 && (
        <div className="rounded-2xl border border-border/60 bg-muted/20 px-4 py-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5 font-heading font-bold text-foreground">
            <FileText className="h-3.5 w-3.5 text-amber-500" />
            {t("sourceFilesLabel")}:
          </span>
          {article.sourceFiles.map((src) => (
            <code
              key={src}
              className="rounded-md bg-background/80 border border-border/60 px-2 py-0.5 font-mono text-[11px]"
            >
              {src}
            </code>
          ))}
        </div>
      )}

      {/* Previous / Next Article Sequential Navigation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border/70">
        {prevArticle ? (
          <Link
            href={`/guides/${prevArticle.categorySlug}/${prevArticle.slug}`}
            className="group rounded-2xl border border-border/80 bg-card/60 hover:border-amber-500/40 p-4 flex items-center gap-3 transition-all min-h-[64px]"
          >
            <ArrowLeft className="h-5 w-5 text-muted-foreground group-hover:text-amber-500 shrink-0 transition-transform group-hover:-translate-x-1" />
            <div className="overflow-hidden">
              <span className="block text-[11px] font-mono text-muted-foreground">
                {t("prevArticle")} ({prevArticle.code})
              </span>
              <span className="block font-heading font-bold text-sm text-foreground group-hover:text-amber-500 truncate">
                {prevArticle.title[locale]}
              </span>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {nextArticle ? (
          <Link
            href={`/guides/${nextArticle.categorySlug}/${nextArticle.slug}`}
            className="group rounded-2xl border border-border/80 bg-card/60 hover:border-amber-500/40 p-4 flex items-center justify-between gap-3 text-right transition-all min-h-[64px]"
          >
            <div className="overflow-hidden flex-1">
              <span className="block text-[11px] font-mono text-muted-foreground">
                {t("nextArticle")} ({nextArticle.code})
              </span>
              <span className="block font-heading font-bold text-sm text-foreground group-hover:text-amber-500 truncate">
                {nextArticle.title[locale]}
              </span>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-amber-500 shrink-0 transition-transform group-hover:translate-x-1" />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </article>
  );
}


"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Sprout,
  ShieldAlert,
  Castle,
  Flame,
  CalendarClock,
  ShoppingBag,
  Swords,
  Sparkles,
  Table2,
  BookOpen,
  ArrowRight,
  Clock,
  Calculator,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { getPublishedCategories } from "@/content/guides/registry";
import type {
  GuideArticle,
  GuideCategory,
  GuideLocale,
} from "@/content/guides/types";
import { Badge } from "@/components/ui/badge";
import { GuidesHubSidebar } from "./guides-hub-sidebar";
import { GuidesHubMobileDrawer } from "./guides-hub-mobile-drawer";
import { GuideCommentsSection } from "./guide-comments-section";
import { cn } from "@/lib/utils";

interface GuidesHubClientProps {
  locale: GuideLocale;
}

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  Sprout,
  ShieldAlert,
  Castle,
  Flame,
  CalendarClock,
  ShoppingBag,
  Swords,
  Sparkles,
  Table2,
};

const SECTION_CALCULATOR_LINKS: Record<
  number,
  Array<{ titleVi: string; titleEn: string; href: string }>
> = {
  1: [
    {
      titleVi: "Máy Tính Mảnh Nâng Sao Anh Hùng",
      titleEn: "Hero Star Promotion Calculator",
      href: "/calculators/hero-stars",
    },
    {
      titleVi: "Máy Tính Chi Phí Thức Tỉnh Tướng Đỏ",
      titleEn: "Mythic Hero Awakening Calculator",
      href: "/calculators/hero-awakening",
    },
  ],
  2: [
    {
      titleVi: "Máy Tính Mảnh Nâng Sao",
      titleEn: "Hero Star Calculator",
      href: "/calculators/hero-stars",
    },
    {
      titleVi: "Máy Tính Điểm Thiên Phú Tướng",
      titleEn: "Hero Traits Calculator",
      href: "/calculators/hero-traits",
    },
    {
      titleVi: "Máy Tính Thức Tỉnh Tướng Đỏ",
      titleEn: "Hero Awakening Calculator",
      href: "/calculators/hero-awakening",
    },
  ],
  3: [
    {
      titleVi: "Máy Tính Xây Dựng & Tài Nguyên Lâu Đài (C1–C40)",
      titleEn: "Castle Construction Calculator",
      href: "/calculators/construction",
    },
  ],
  4: [
    {
      titleVi: "Máy Tính Công Nghệ Viện Nghiên Cứu",
      titleEn: "Technology Research Calculator",
      href: "/calculators/technology",
    },
  ],
  5: [
    {
      titleVi: "Máy Tính Rèn Trang Bị",
      titleEn: "Gear Enhance Calculator",
      href: "/calculators/gear-enhance",
    },
    {
      titleVi: "Máy Tính Mảnh Nâng Sao",
      titleEn: "Hero Star Calculator",
      href: "/calculators/hero-stars",
    },
  ],
  6: [
    {
      titleVi: "Máy Tính Xây Dựng Lâu Đài",
      titleEn: "Castle Construction Calculator",
      href: "/calculators/construction",
    },
  ],
  7: [
    {
      titleVi: "Máy Tính Rèn & Cường Hóa Trang Bị",
      titleEn: "Gear Enhance Calculator",
      href: "/calculators/gear-enhance",
    },
    {
      titleVi: "Máy Tính Tiến Cấp Trang Bị",
      titleEn: "Gear Promotion Calculator",
      href: "/calculators/gear-promotion",
    },
    {
      titleVi: "Máy Tính Trang Bị Lãnh Chúa",
      titleEn: "Lord Gear Calculator",
      href: "/calculators/lord-gear",
    },
  ],
  8: [
    {
      titleVi: "Máy Tính Cổ Ngữ",
      titleEn: "Runes Calculator",
      href: "/calculators/runes",
    },
    {
      titleVi: "Máy Tính Thánh Vật",
      titleEn: "Relics Calculator",
      href: "/calculators/relics",
    },
  ],
  9: [
    {
      titleVi: "Mở Toàn Bộ 10 Công Cụ Tính Toán TopHub",
      titleEn: "Open All 10 TopHub Calculators",
      href: "/calculators",
    },
  ],
};

export function GuidesHubClient({ locale }: GuidesHubClientProps) {
  const t = useTranslations("Guides");
  const categories = useMemo(() => getPublishedCategories(), []);
  const [activeSectionId, setActiveSectionId] = useState("sec-1");

  // Scrollspy observer for 9 master sections
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSectionId(entry.target.id);
            break;
          }
        }
      },
      {
        rootMargin: "-20% 0px -70% 0px",
        threshold: 0,
      }
    );

    categories.forEach((cat, index) => {
      const sectionId = `sec-${cat.displayOrder ?? index + 1}`;
      const el = document.getElementById(sectionId);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [categories]);

  return (
    <div className="space-y-6 pb-16">
      {/* Streamlined Editorial Header (Minimalist & Compact, Zero Clutter) */}
      <header className="space-y-1 pb-3 border-b border-border/50">
        <h1 className="font-heading font-black text-xl sm:text-2xl text-foreground tracking-tight">
          {locale === "vi"
            ? "Cẩm Nang Chiến Thuật & Bảng Số Liệu Chuẩn Hóa"
            : "Tactical Guides & Min-Max Master Data"}
        </h1>
        <p className="font-sans text-xs sm:text-sm text-muted-foreground italic">
          {locale === "vi"
            ? "Cẩm nang thực chiến và dữ liệu tra cứu chính xác dành cho người chơi Top Heroes."
            : "Tactical gameplay guides and reference data for Top Heroes players."}
        </p>
      </header>

      {/* Main 2-Column Responsive Layout */}
      <div className="flex items-start gap-8">
        {/* Left Column: Master Sticky Sidebar (Desktop ~280px) */}
        <GuidesHubSidebar
          categories={categories}
          activeSectionId={activeSectionId}
          onSelectSection={setActiveSectionId}
          locale={locale}
        />

        {/* Right Column: 9 Master Sections (Stacked 1..9) */}
        <div className="min-w-0 flex-1 space-y-10">
          {categories.map((category, index) => {
            const sectionNumber = category.displayOrder ?? index + 1;
            const sectionId = `sec-${sectionNumber}`;
            const IconComponent =
              CATEGORY_ICONS[category.iconName] ?? BookOpen;
            const calculatorLinks =
              SECTION_CALCULATOR_LINKS[sectionNumber] ?? [];

            return (
              <section
                key={category.slug}
                id={sectionId}
                data-testid={`hub-section-${sectionNumber}`}
                className="scroll-mt-24 card-rpg rounded-3xl p-5 sm:p-7 space-y-6 border border-border/70 bg-card/70 backdrop-blur"
              >
                {/* Section Header: Zero-Prefix Clean Title */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-border/60">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                      <IconComponent className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <h2 className="font-heading font-black text-lg sm:text-xl text-foreground">
                        {category.title[locale]}
                      </h2>
                      <p className="font-sans text-xs sm:text-sm text-muted-foreground line-clamp-1">
                        {category.description[locale]}
                      </p>
                    </div>
                  </div>

                  <Badge
                    variant="outline"
                    className="font-mono text-xs font-bold border-border/80"
                  >
                    {category.articles.length}{" "}
                    {locale === "vi" ? "bài viết" : "articles"}
                  </Badge>
                </div>

                {/* Article Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {category.articles.map((article) => {
                    const isPublished = article.status === "published";

                    return (
                      <Link
                        key={article.slug}
                        href={`/guides/${category.slug}/${article.slug}`}
                        className={cn(
                          "group flex flex-col justify-between p-4 rounded-2xl border transition-all text-xs sm:text-sm min-h-[96px]",
                          isPublished
                            ? "bg-amber-500/5 border-amber-500/30 hover:border-amber-500 hover:bg-amber-500/10 shadow-xs"
                            : "bg-card/50 border-border/60 hover:border-amber-500/40 hover:bg-card/80"
                        )}
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-mono text-xs font-bold text-amber-500">
                              #{article.displayCode ?? article.code}
                            </span>

                            {isPublished ? (
                              <Badge
                                variant="outline"
                                className="font-sans text-xs font-bold bg-amber-500/15 border-amber-500/30 text-amber-600 dark:text-amber-400 flex items-center gap-1"
                              >
                                <BookOpen className="h-3 w-3" />
                                <span>
                                  {locale === "vi" ? "Đọc ngay" : "Read Now"}
                                </span>
                              </Badge>
                            ) : (
                              <Badge
                                variant="outline"
                                className="font-sans text-xs font-medium border-border text-muted-foreground flex items-center gap-1"
                              >
                                <Clock className="h-3 w-3" />
                                <span>
                                  {locale === "vi"
                                    ? "Sắp ra mắt"
                                    : "Coming Soon"}
                                </span>
                              </Badge>
                            )}
                          </div>

                          <h3 className="font-heading font-bold text-sm sm:text-base text-foreground group-hover:text-amber-500 transition-colors line-clamp-1">
                            {article.title[locale]}
                          </h3>

                          <p className="font-sans text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                            {article.summary[locale]}
                          </p>
                        </div>

                        <div className="pt-3 flex items-center justify-between text-xs text-muted-foreground/80 font-sans">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5 text-amber-500/70" />
                            <span>
                              {article.readingMinutes}{" "}
                              {locale === "vi" ? "phút đọc" : "min read"}
                            </span>
                          </span>

                          <span className="inline-flex items-center gap-1 font-bold text-amber-600 dark:text-amber-400 group-hover:translate-x-0.5 transition-transform">
                            <span>
                              {isPublished
                                ? locale === "vi"
                                  ? "Vào đọc"
                                  : "Read"
                                : locale === "vi"
                                  ? "Xem dàn ý"
                                  : "Preview"}
                            </span>
                            <ArrowRight className="h-3.5 w-3.5" />
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>

                {/* Section Calculators CTA Strip */}
                {calculatorLinks.length > 0 && (
                  <div
                    data-testid={`section-${sectionNumber}-calculators`}
                    className="p-3.5 rounded-2xl bg-amber-500/5 border border-amber-500/20 flex flex-wrap items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-sans font-bold">
                      <Calculator className="h-4 w-4 shrink-0" />
                      <span>
                        {locale === "vi"
                          ? "Công cụ tính toán liên kết cho chuyên mục này:"
                          : "Related calculators for this topic:"}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {calculatorLinks.map((calc) => (
                        <Link
                          key={calc.href}
                          href={calc.href}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 font-sans font-bold text-xs min-h-[36px] transition-all"
                        >
                          <span>
                            {locale === "vi" ? calc.titleVi : calc.titleEn}
                          </span>
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>

      {/* Floating Bottom Drawer for Mobile Viewports */}
      <GuidesHubMobileDrawer
        categories={categories}
        activeSectionId={activeSectionId}
        onSelectSection={setActiveSectionId}
        locale={locale}
      />

      {/* Unified Guide Discussion Hub (100% Free & Clean) */}
      <GuideCommentsSection
        pageKey="guides:hub"
        locale={locale}
        showFeedbackNotice={false}
      />
    </div>
  );
}

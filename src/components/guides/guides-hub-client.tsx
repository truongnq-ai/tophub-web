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
  Search,
  X,
  Clock,
  Calculator,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import {
  getPublishedCategories,
  searchPublishedGuides,
} from "@/content/guides/registry";
import type {
  GuideArticle,
  GuideCategory,
  GuideLocale,
} from "@/content/guides/types";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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

  const [searchQuery, setSearchQuery] = useState("");
  const [activeSectionId, setActiveSectionId] = useState("sec-1");

  const searchResults: GuideArticle[] = useMemo(() => {
    const q = searchQuery.trim();
    if (!q) return [];
    return searchPublishedGuides(q, locale);
  }, [searchQuery, locale]);

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
    <div className="space-y-8 pb-16">
      {/* Streamlined Hero Header & Instant Search */}
      <section className="card-rpg rounded-3xl p-6 sm:p-8 space-y-5 border border-border/70 bg-card/80 backdrop-blur">
        <div className="space-y-2 text-center max-w-3xl mx-auto">
          <Badge
            variant="outline"
            className="font-heading text-xs font-black uppercase tracking-wider border-amber-500/30 text-amber-600 dark:text-amber-400"
          >
            {locale === "vi"
              ? "Bách Khoa Toàn Thư Top Heroes (S0 ➔ S4)"
              : "Top Heroes Tactical Encyclopedia (S0 ➔ S4)"}
          </Badge>

          <h1 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-foreground tracking-tight">
            {locale === "vi"
              ? "Cẩm Nang Chiến Thuật & Bảng Số Liệu Chuẩn Hóa"
              : "Tactical Guides & Min-Max Master Data"}
          </h1>

          <p className="font-sans text-sm sm:text-base text-muted-foreground leading-relaxed">
            {locale === "vi"
              ? "Hệ thống cẩm nang thực chiến chuyên sâu 9 mục toàn diện từ khởi đầu đến late-game. 100% miễn phí, tối ưu hoá theo số liệu gốc Meta.bytes."
              : "Comprehensive 9-topic tactical guide system from onboarding to endgame. 100% free, grounded in Meta.bytes single-source-of-truth."}
          </p>
        </div>

        {/* Search Input */}
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              locale === "vi"
                ? "Tìm kiếm bài viết, tướng, sự kiện, công trình..."
                : "Search guides, heroes, events, buildings..."
            }
            className="pl-12 pr-10 h-12 text-base rounded-2xl border-border/80 bg-background/90 focus:border-amber-500"
            aria-label={
              locale === "vi" ? "Tìm kiếm cẩm nang" : "Search guides"
            }
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-muted-foreground hover:text-foreground rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label={locale === "vi" ? "Xóa tìm kiếm" : "Clear search"}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Live Search Results Popup / Box */}
        {searchQuery.trim().length > 0 && (
          <div
            data-testid="hub-search-results"
            className="max-w-2xl mx-auto p-4 rounded-2xl border border-amber-500/30 bg-background/95 space-y-3 shadow-lg animate-in fade-in duration-150"
          >
            <div className="text-xs font-sans font-bold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <BookOpen className="h-3.5 w-3.5 text-amber-500" />
                <span>
                  {locale === "vi"
                    ? "Kết quả tìm kiếm bài viết"
                    : "Article Search Results"}
                </span>
              </span>
              <span className="font-mono text-amber-500">
                {searchResults.length} {locale === "vi" ? "kết quả" : "results"}
              </span>
            </div>

            {searchResults.length > 0 ? (
              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {searchResults.map((art) => (
                  <Link
                    key={`${art.categorySlug}/${art.slug}`}
                    href={`/guides/${art.categorySlug}/${art.slug}`}
                    className="group flex items-center justify-between gap-3 p-3 rounded-xl border border-border/60 hover:border-amber-500/50 bg-card/60 hover:bg-card transition-all text-xs sm:text-sm min-h-[44px]"
                  >
                    <div className="min-w-0 space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-amber-500 shrink-0">
                          #{art.displayCode ?? art.code}
                        </span>
                        <span className="font-heading font-bold text-foreground group-hover:text-amber-500 truncate">
                          {art.title[locale]}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {art.summary[locale]}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-amber-500 shrink-0" />
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-xs sm:text-sm text-muted-foreground py-2 text-center">
                {locale === "vi"
                  ? "Không tìm thấy bài viết nào phù hợp với từ khóa."
                  : "No guide articles matched your search query."}
              </p>
            )}
          </div>
        )}
      </section>

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

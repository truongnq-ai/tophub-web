"use client";

import React from "react";
import {
  Clock,
  Sparkles,
  CheckCircle2,
  Calculator,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import type {
  GuideArticle,
  GuideCategory,
  GuideLocale,
} from "@/content/guides/types";
import { Badge } from "@/components/ui/badge";

interface GuideArticleShellProps {
  article: GuideArticle;
  category?: GuideCategory;
  locale?: GuideLocale;
}

const CALCULATOR_DIRECTORY: Record<
  string,
  { titleVi: string; titleEn: string; href: string }
> = {
  "hero-stars": {
    titleVi: "Máy Tính Mảnh Nâng Sao Anh Hùng",
    titleEn: "Hero Star Promotion Calculator",
    href: "/calculators/hero-stars",
  },
  "hero-awakening": {
    titleVi: "Máy Tính Chi Phí Thức Tỉnh Tướng Đỏ",
    titleEn: "Mythic Hero Awakening Calculator",
    href: "/calculators/hero-awakening",
  },
  "hero-traits": {
    titleVi: "Máy Tính Điểm Thiên Phú Tướng",
    titleEn: "Hero Traits Calculator",
    href: "/calculators/hero-traits",
  },
  construction: {
    titleVi: "Máy Tính Tài Nguyên & Thời Gian Xây Lâu Đài (C1–C40)",
    titleEn: "Castle Construction & Resource Calculator",
    href: "/calculators/construction",
  },
  technology: {
    titleVi: "Máy Tính Công Nghệ Viện Nghiên Cứu",
    titleEn: "Research Institute Technology Calculator",
    href: "/calculators/technology",
  },
  "gear-enhance": {
    titleVi: "Máy Tính Cường Hóa Trang Bị & Cộng Hưởng",
    titleEn: "Gear Enhancement & Resonance Calculator",
    href: "/calculators/gear-enhance",
  },
  "gear-promotion": {
    titleVi: "Máy Tính Tiến Cấp Trang Bị Thần Thoại",
    titleEn: "Mythic Gear Promotion Calculator",
    href: "/calculators/gear-promotion",
  },
  "lord-gear": {
    titleVi: "Máy Tính Trang Bị Lãnh Chúa (Lord Gear)",
    titleEn: "Lord Gear & Army Buff Calculator",
    href: "/calculators/lord-gear",
  },
  runes: {
    titleVi: "Máy Tính Cổ Ngữ 3 Phe",
    titleEn: "3-Faction Runes Calculator",
    href: "/calculators/runes",
  },
  relics: {
    titleVi: "Máy Tính Thánh Vật & Nhà Thánh Vật",
    titleEn: "Relics & Relic Hall Calculator",
    href: "/calculators/relics",
  },
};

export function GuideArticleShell({
  article,
  category,
  locale = "vi",
}: GuideArticleShellProps) {
  const isVi = locale === "vi";

  return (
    <article className="space-y-6 max-w-4xl mx-auto">
      {/* 1. Breadcrumbs & Header Card */}
      <div className="card-rpg rounded-3xl p-5 sm:p-7 space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground font-sans">
          <Link
            href="/guides"
            className="hover:text-amber-500 transition-colors inline-flex items-center gap-1.5 font-medium"
          >
            <BookOpen className="h-3.5 w-3.5 text-amber-500" />
            <span>{isVi ? "Cẩm Nang" : "Guides"}</span>
          </Link>
          {category && (
            <>
              <span>/</span>
              <span className="text-amber-600 dark:text-amber-400 font-bold">
                {category.title[locale]}
              </span>
            </>
          )}
          <span>/</span>
          <span className="font-mono text-amber-500 font-bold">
            #{article.displayCode ?? article.code}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <Badge
            variant="outline"
            className="font-mono text-xs font-bold border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400"
          >
            #{article.displayCode ?? article.code}
          </Badge>
          <Badge className="bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 font-sans text-xs font-bold inline-flex items-center gap-1">
            <Sparkles className="h-3 w-3" />
            <span>{isVi ? "Sắp ra mắt" : "Coming Soon"}</span>
          </Badge>
          <span className="text-xs text-muted-foreground font-sans flex items-center gap-1 ml-auto">
            <Clock className="h-3 w-3" />
            <span>
              {isVi
                ? `Dự kiến ${article.readingMinutes} phút đọc`
                : `Est. ${article.readingMinutes} min read`}
            </span>
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-foreground leading-tight">
            {article.title[locale]}
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            {article.summary[locale]}
          </p>
        </div>
      </div>

      {/* 2. Official Coming Soon Banner (Google MD3 Tone) */}
      <div className="rounded-2xl border border-amber-500/40 bg-gradient-to-br from-amber-500/15 via-amber-500/5 to-card p-5 sm:p-6 space-y-3 shadow-sm">
        <div className="flex items-center gap-2.5 text-amber-600 dark:text-amber-400">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20 border border-amber-500/30">
            <Clock className="h-5 w-5 text-amber-500" />
          </div>
          <h2 className="font-heading font-bold text-lg text-foreground">
            {isVi
              ? "Nội Dung Đang Được Biên Tập Chuyên Sâu"
              : "In-Depth Content In Progress"}
          </h2>
        </div>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed pl-1">
          {isVi
            ? "Chuyên đề này đang được đội ngũ biên tập đối soát số liệu thực tế (Meta.bytes) và sẽ sớm ra mắt trong các bản cập nhật tới. Dưới đây là khung kiến thức và các công cụ tính toán liên quan bạn có thể sử dụng ngay."
            : "This tactical guide is currently undergoing empirical verification (Meta.bytes) and will be released in an upcoming update. Below is the planned curriculum outline and direct access to related calculator tools."}
        </p>
      </div>

      {/* 3. Planned Curriculum Outline */}
      {article.plannedOutline && article.plannedOutline.length > 0 && (
        <div className="card-rpg rounded-2xl p-5 sm:p-6 space-y-4">
          <h3 className="font-heading font-bold text-base sm:text-lg text-foreground flex items-center gap-2">
            <span>📌</span>
            <span>
              {isVi ? "Các Đề Mục Dự Kiến Trong Bài Viết" : "Planned Curriculum Outline"}
            </span>
          </h3>

          <div className="grid grid-cols-1 gap-2.5">
            {article.plannedOutline.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 rounded-xl border border-border/70 bg-card/60 p-3 text-xs sm:text-sm text-foreground/90"
              >
                <CheckCircle2 className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                <span className="leading-relaxed">{item[locale]}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Contextual Calculators CTA Section */}
      {article.relatedCalculatorSlugs &&
        article.relatedCalculatorSlugs.length > 0 && (
          <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-card/90 to-card p-5 sm:p-6 space-y-4 shadow-sm">
            <div className="space-y-1">
              <h3 className="font-heading font-bold text-base sm:text-lg text-foreground flex items-center gap-2">
                <Calculator className="h-5 w-5 text-amber-500" />
                <span>
                  {isVi
                    ? "Sử Dụng Công Cụ Tính Toán Liên Quan Ngay"
                    : "Access Related Calculators Now"}
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {isVi
                  ? "Trong lúc chờ bài viết hoàn thiện, bạn có thể tính toán số liệu chính xác tuyệt đối tại bộ công cụ TopHub Calculators:"
                  : "While waiting for the full guide, perform precise data calculations using these related TopHub tools:"}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {article.relatedCalculatorSlugs.map((slug) => {
                const info = CALCULATOR_DIRECTORY[slug] ?? {
                  titleVi: `Công cụ tính toán (${slug})`,
                  titleEn: `Calculator (${slug})`,
                  href: `/calculators/${slug}`,
                };
                return (
                  <Link
                    key={slug}
                    href={info.href}
                    className="group flex items-center justify-between gap-3 rounded-xl border border-amber-500/30 bg-card/80 hover:border-amber-500/60 hover:bg-amber-500/10 p-3.5 transition-all text-xs sm:text-sm font-bold min-h-[44px]"
                  >
                    <span className="text-foreground group-hover:text-amber-500 transition-colors line-clamp-1">
                      {isVi ? info.titleVi : info.titleEn}
                    </span>
                    <ArrowRight className="h-4 w-4 text-amber-500 shrink-0 transition-transform group-hover:translate-x-1" />
                  </Link>
                );
              })}
            </div>
          </div>
        )}

      {/* 5. Bottom Navigation / Back Button */}
      <div className="pt-2 flex items-center justify-between">
        <Link
          href="/guides"
          className="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-card/60 hover:border-amber-500/40 px-4 py-2.5 text-xs sm:text-sm font-bold text-muted-foreground hover:text-foreground transition-all min-h-[44px]"
        >
          <BookOpen className="h-4 w-4 text-amber-500" />
          <span>{isVi ? "Quay lại Mục Lục Cẩm Nang" : "Back to Guides Hub"}</span>
        </Link>
      </div>
    </article>
  );
}

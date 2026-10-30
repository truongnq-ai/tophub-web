import type {
  GuideArticle,
  GuideCategory,
  GuideLocale,
  GuideZone,
} from "./types";
import { GROUP_1_GETTING_STARTED_CATEGORY } from "./groups/group-1-getting-started";
import { GROUP_2_HEROES_AND_META_CATEGORY } from "./groups/group-2-heroes-and-meta";
import { GROUP_3_EVENTS_AND_CALENDAR_CATEGORY } from "./groups/group-3-events-and-calendar";
import { GROUP_4_SERVER_ROADMAP_CATEGORY } from "./groups/group-4-server-roadmap";
import { GROUP_5_GEAR_AND_WEAPONS_CATEGORY } from "./groups/group-5-gear-and-weapons";
import { GROUP_6_POWER_SYSTEMS_CATEGORY } from "./groups/group-6-power-systems";
import { GROUP_7_SHOPS_AND_ECONOMY_CATEGORY } from "./groups/group-7-shops-and-economy";
import { GROUP_8_INFRASTRUCTURE_CATEGORY } from "./groups/group-8-infrastructure";
import { GROUP_9_EVENT_PLAYBOOKS_CATEGORY } from "./groups/group-9-event-playbooks";

const CATEGORY_SLUG_ALIASES: Readonly<Record<string, string>> = {
  "event-list": "event-playbooks",
};

const ARTICLE_SLUG_ALIASES: Readonly<Record<string, string>> = {
  "s0-major-point-races": "timeline-and-rules",
  "s0-gacha-mythic-banners": "tasks-and-milestones",
  "s0-satellites-and-raids": "shop-and-drops",
};

/**
 * Chuẩn hóa chuỗi tìm kiếm: loại bỏ dấu Tiếng Việt (Unicode NFD), đổi đ/Đ -> d, viết thường
 */
export function normalizeSearchText(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "d")
    .toLowerCase()
    .trim();
}

export const GUIDE_CATEGORIES: GuideCategory[] = [
  // ============================================================================
  // GROUP 1: NHẬP MÔN & LUẬT SỐNG CÒN (4 TRANG — MODULE HÓA CHUẨN V2.0)
  // ============================================================================
  GROUP_1_GETTING_STARTED_CATEGORY,

  // ============================================================================
  // GROUP 2: ANH HÙNG, TIER LIST & ĐỘI HÌNH (5 TRANG — MODULE HÓA CHUẨN V2.0)
  // ============================================================================
  GROUP_2_HEROES_AND_META_CATEGORY,

  // ============================================================================
  // GROUP 3: LỊCH SỰ KIỆN & GIỜ VÀNG DOUBLE-DIP (4 TRANG — MODULE HÓA CHUẨN V2.0)
  // ============================================================================
  GROUP_3_EVENTS_AND_CALENDAR_CATEGORY,

  // ============================================================================
  // GROUP 4: LỘ TRÌNH SERVER (S0➔S4) & CHUYỂN HỆ (3 TRANG — MODULE HÓA CHUẨN V2.0)
  // ============================================================================
  GROUP_4_SERVER_ROADMAP_CATEGORY,

  // ============================================================================
  // GROUP 5 (DISPLAY 6): TRANG BỊ, LÃNH CHÚA & VŨ KHÍ (4 TRANG — MODULE HÓA CHUẨN V2.0)
  // ============================================================================
  GROUP_5_GEAR_AND_WEAPONS_CATEGORY,

  // ============================================================================
  // GROUP 6 (DISPLAY 7): CỔ NGỮ, THÁNH VẬT & THÚ CƯNG (3 TRANG — MODULE HÓA CHUẨN V2.0)
  // ============================================================================
  GROUP_6_POWER_SYSTEMS_CATEGORY,

  // ============================================================================
  // GROUP 7 (DISPLAY 8): TIỆM MUA SẮM, TIỀN TỆ & QUÂN TRANG (4 TRANG — MODULE HÓA CHUẨN V2.0)
  // ============================================================================
  GROUP_7_SHOPS_AND_ECONOMY_CATEGORY,

  // ============================================================================
  // GROUP 8 (DISPLAY 9): HẠ TẦNG, CÔNG NGHỆ & BẢNG SỐ LIỆU (4 TRANG — MODULE HÓA CHUẨN V2.0)
  // ============================================================================
  GROUP_8_INFRASTRUCTURE_CATEGORY,

  // ============================================================================
  // GROUP 9 (DISPLAY 5 — PHÂN KHU II): DANH SÁCH EVENT (6 CHUYÊN MỤC CHUẨN HÓA 5.1 ➔ 5.6)
  // ============================================================================
  GROUP_9_EVENT_PLAYBOOKS_CATEGORY,
];

export const GUIDE_ZONES: GuideZone[] = [
  {
    id: "zone_onboarding_meta",
    title: {
      vi: "PHÂN KHU I: KHỞI ĐẦU & ĐỘI HÌNH META",
      en: "ZONE I: ONBOARDING & META LINEUPS",
    },
    categories: GUIDE_CATEGORIES.filter((c) => c.zoneId === "zone_onboarding_meta"),
  },
  {
    id: "zone_events_roadmap",
    title: {
      vi: "PHÂN KHU II: LỊCH SỰ KIỆN & LỘ TRÌNH MÙA GIẢI",
      en: "ZONE II: EVENT SCHEDULE & SEASONAL ROADMAP",
    },
    categories: GUIDE_CATEGORIES.filter((c) => c.zoneId === "zone_events_roadmap"),
  },
  {
    id: "zone_systems_economy",
    title: {
      vi: "PHÂN KHU III: TỐI ƯU SỨC MẠNH, KINH TẾ & SỐ LIỆU",
      en: "ZONE III: POWER SYSTEMS, ECONOMY & DATA TABLES",
    },
    categories: GUIDE_CATEGORIES.filter((c) => c.zoneId === "zone_systems_economy"),
  },
];

export function getAllCategories(): GuideCategory[] {
  return GUIDE_CATEGORIES;
}

/**
 * Trả về 9 danh mục theo đúng thứ tự hiển thị trực quan từ trên xuống dưới (1 ➔ 9):
 * Zone I (1, 2) ➔ Zone II (3, 4, 5. Danh sách event) ➔ Zone III (6, 7, 8, 9)
 */
export function getCategoriesInDisplayOrder(): GuideCategory[] {
  return GUIDE_ZONES.flatMap((zone) => zone.categories);
}

export function getAllArticles(): GuideArticle[] {
  return GUIDE_CATEGORIES.flatMap((category) => category.articles);
}

export function getCategoryBySlug(categorySlug: string): GuideCategory | undefined {
  const canonicalSlug = CATEGORY_SLUG_ALIASES[categorySlug] ?? categorySlug;
  return GUIDE_CATEGORIES.find((cat) => cat.slug === canonicalSlug);
}

export function getArticleBySlug(
  categorySlug: string,
  articleSlug: string
): GuideArticle | undefined {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return undefined;
  const canonicalArticleSlug = ARTICLE_SLUG_ALIASES[articleSlug] ?? articleSlug;
  return category.articles.find((art) => art.slug === canonicalArticleSlug);
}

export function getAdjacentArticles(
  categorySlug: string,
  articleSlug: string
): { prev: GuideArticle | null; next: GuideArticle | null } {
  const canonicalCatSlug = CATEGORY_SLUG_ALIASES[categorySlug] ?? categorySlug;
  const canonicalArtSlug = ARTICLE_SLUG_ALIASES[articleSlug] ?? articleSlug;
  const all = getAllArticles();
  const idx = all.findIndex(
    (art) => art.categorySlug === canonicalCatSlug && art.slug === canonicalArtSlug
  );
  if (idx === -1) {
    return { prev: null, next: null };
  }
  return {
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx < all.length - 1 ? all[idx + 1] : null,
  };
}

export function searchGuides(query: string, locale: GuideLocale): GuideArticle[] {
  const normalizedQuery = normalizeSearchText(query);
  if (normalizedQuery.length < 2) {
    return [];
  }

  return getAllArticles().filter((article) => {
    const titleNorm = normalizeSearchText(article.title[locale]);
    const summaryNorm = normalizeSearchText(article.summary[locale]);
    const codeNorm = normalizeSearchText(article.code);
    const displayCodeNorm = article.displayCode
      ? normalizeSearchText(article.displayCode)
      : "";
    const keywordsNorm = article.keywords.map((k) => normalizeSearchText(k));

    const tldrMatch = article.tldr
      ? normalizeSearchText(article.tldr.coreRule[locale]).includes(normalizedQuery) ||
        normalizeSearchText(article.tldr.immediateAction[locale]).includes(normalizedQuery) ||
        normalizeSearchText(article.tldr.strictTaboo[locale]).includes(normalizedQuery)
      : false;

    const allSections = [...article.freeSections, ...article.proSections];
    const sectionMatch = allSections.some((sec) => {
      if (normalizeSearchText(sec.title[locale]).includes(normalizedQuery)) {
        return true;
      }
      return (
        sec.subSections?.some((sub) =>
          normalizeSearchText(sub.title[locale]).includes(normalizedQuery)
        ) ?? false
      );
    });

    return (
      titleNorm.includes(normalizedQuery) ||
      summaryNorm.includes(normalizedQuery) ||
      codeNorm.includes(normalizedQuery) ||
      (displayCodeNorm.length > 0 && displayCodeNorm.includes(normalizedQuery)) ||
      keywordsNorm.some((k) => k.includes(normalizedQuery)) ||
      tldrMatch ||
      sectionMatch
    );
  });
}

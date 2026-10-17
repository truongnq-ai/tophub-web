import { describe, it, expect } from "vitest";
import {
  GUIDE_ZONES,
  getAllCategories,
  getAllArticles,
  getCategoryBySlug,
  getArticleBySlug,
  getAdjacentArticles,
  searchGuides,
  normalizeSearchText,
} from "../src/content/guides/registry";

describe("Guides Hub Registry Architecture (3 Zones - 8 Groups - 31 Pages)", () => {
  it("should contain exactly 3 Zones, 8 Level-1 Categories, and 31 Level-2 Articles", () => {
    expect(GUIDE_ZONES).toHaveLength(3);
    const categories = getAllCategories();
    expect(categories).toHaveLength(8);
    const articles = getAllArticles();
    expect(articles).toHaveLength(31);
  });

  it("should have unique category/article slug pairs and non-empty Free/PRO sections", () => {
    const articles = getAllArticles();
    const seenPaths = new Set<string>();

    for (const article of articles) {
      const fullPath = `${article.categorySlug}/${article.slug}`;
      expect(seenPaths.has(fullPath)).toBe(false);
      seenPaths.add(fullPath);

      expect(article.title.vi.length).toBeGreaterThan(3);
      expect(article.title.en.length).toBeGreaterThan(3);
      expect(article.freeSections.length).toBeGreaterThan(0);
      expect(article.proSections.length).toBeGreaterThan(0);
    }
  });

  it("should resolve category and article by slug and return undefined for unknown slugs", () => {
    const cat = getCategoryBySlug("getting-started");
    expect(cat).toBeDefined();
    expect(cat?.order).toBe(1);

    const art = getArticleBySlug("getting-started", "overview");
    expect(art).toBeDefined();
    expect(art?.code).toBe("1.1");

    expect(getArticleBySlug("invalid-cat", "overview")).toBeUndefined();
    expect(getArticleBySlug("getting-started", "invalid-slug")).toBeUndefined();
  });

  it("should navigate adjacent articles across category boundaries accurately", () => {
    const allArticles = getAllArticles();
    const first = allArticles[0];
    const last = allArticles[allArticles.length - 1];

    const firstAdj = getAdjacentArticles(first.categorySlug, first.slug);
    expect(firstAdj.prev).toBeNull();
    expect(firstAdj.next?.code).toBe(allArticles[1].code);

    const lastAdj = getAdjacentArticles(last.categorySlug, last.slug);
    expect(lastAdj.next).toBeNull();
    expect(lastAdj.prev?.code).toBe(allArticles[allArticles.length - 2].code);

    // Cross-boundary check between Group 1 (last article 1.4) and Group 2 (first article 2.1)
    const boundaryAdj = getAdjacentArticles("getting-started", "top-10-account-traps");
    expect(boundaryAdj.next?.categorySlug).toBe("heroes");
    expect(boundaryAdj.next?.code).toBe("2.1");
  });

  it("should normalize Vietnamese diacritics and search both accented & unaccented queries under 50ms", () => {
    expect(normalizeSearchText("Đấu Sĩ Bộ Lạc")).toBe("dau si bo lac");

    const start = performance.now();
    const accentedResults = searchGuides("Đấu Sĩ", "vi");
    const unaccentedResults = searchGuides("dau si", "vi");
    const guildRaceResults = searchGuides("thi dau hoi", "vi");
    const runeResults = searchGuides("co ngu", "vi");
    const elapsed = performance.now() - start;

    expect(elapsed).toBeLessThan(50);
    expect(accentedResults.length).toBeGreaterThan(0);
    expect(unaccentedResults.length).toBe(accentedResults.length);
    expect(guildRaceResults.some((a) => a.categorySlug === "events")).toBe(true);
    expect(runeResults.some((a) => a.categorySlug === "power-systems")).toBe(true);
  });
});

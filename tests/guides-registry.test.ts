import { describe, it, expect } from "vitest";
import {
  GUIDE_ZONES,
  getAllCategories,
  getCategoriesInDisplayOrder,
  getAllArticles,
  getCategoryBySlug,
  getArticleBySlug,
  getAdjacentArticles,
  searchGuides,
  normalizeSearchText,
} from "../src/content/guides/registry";

describe("Guides Hub Registry Architecture (3 Zones - 9 Groups - 37 Pages)", () => {
  it("should contain exactly 3 Zones, 9 Level-1 Categories, and 37 Level-2 Articles", () => {
    expect(GUIDE_ZONES).toHaveLength(3);
    const categories = getAllCategories();
    expect(categories).toHaveLength(9);
    const articles = getAllArticles();
    expect(articles).toHaveLength(37);
  });

  it("should expose getCategoriesInDisplayOrder() ordered sequentially 1 ➔ 9 with Category 5 'Danh sách event' and 6 canonical sub-menus (5.1 ➔ 5.6)", () => {
    const displayCategories = getCategoriesInDisplayOrder();
    expect(displayCategories).toHaveLength(9);
    expect(
      displayCategories.map((c) => c.displayOrder ?? c.order)
    ).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);

    const cat5 = displayCategories[4];
    expect(cat5.slug).toBe("event-playbooks");
    expect(cat5.displayOrder).toBe(5);
    expect(cat5.title.vi).toBe("Danh sách event");
    expect(cat5.title.en).toBe("Event List");
    expect(cat5.articles).toHaveLength(6);
    expect(cat5.articles.map((a) => a.code)).toEqual([
      "5.1",
      "5.2",
      "5.3",
      "5.4",
      "5.5",
      "5.6",
    ]);
    expect(cat5.articles.map((a) => a.slug)).toEqual([
      "timeline-and-rules",
      "tasks-and-milestones",
      "shop-and-drops",
      "packs-and-roi",
      "hoarding-and-prep-plan",
      "pro-player-mechanics",
    ]);

    // Zone III categories (6 ➔ 9) have displayOrder 6..9 and articles with displayCode 6.1..9.4
    expect(displayCategories[5].slug).toBe("gear");
    expect(displayCategories[5].articles.map((a) => a.displayCode)).toEqual([
      "6.1",
      "6.2",
      "6.3",
      "6.4",
    ]);
    expect(displayCategories[8].slug).toBe("infrastructure");
    expect(displayCategories[8].articles.map((a) => a.displayCode)).toEqual([
      "9.1",
      "9.2",
      "9.3",
      "9.4",
    ]);
  });

  it("should resolve legacy category/article slug aliases for backward compatibility", () => {
    const aliasCat = getCategoryBySlug("event-list");
    expect(aliasCat).toBeDefined();
    expect(aliasCat?.slug).toBe("event-playbooks");

    expect(
      getArticleBySlug("event-playbooks", "s0-major-point-races")?.code
    ).toBe("5.1");
    expect(
      getArticleBySlug("event-playbooks", "s0-gacha-mythic-banners")?.code
    ).toBe("5.2");
    expect(
      getArticleBySlug("event-playbooks", "s0-satellites-and-raids")?.code
    ).toBe("5.3");
    expect(
      getArticleBySlug("event-list", "timeline-and-rules")?.code
    ).toBe("5.1");
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

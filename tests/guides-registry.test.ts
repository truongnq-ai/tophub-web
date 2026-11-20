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
  PUBLISHED_GUIDE_CONFIG,
  isCodexPublished,
  isGuideCategoryPublished,
  isGuideArticlePublished,
  getPublishedCategories,
  getPublishedCategoryBySlug,
  getPublishedGuideZones,
  getPublishedArticles,
  getPublishedAdjacentArticles,
  searchPublishedGuides,
} from "../src/content/guides/registry";

describe("Guides Hub Registry Architecture (3 Zones - 9 Groups - 39 Pages)", () => {
  it("should contain exactly 3 Zones, 9 Level-1 Categories, and 39 Level-2 Articles", () => {
    expect(GUIDE_ZONES).toHaveLength(3);
    const categories = getAllCategories();
    expect(categories).toHaveLength(9);
    const articles = getAllArticles();
    expect(articles).toHaveLength(39);
  });

  it("should expose getCategoriesInDisplayOrder() ordered sequentially 1 ➔ 9 with Zero-Prefix clean titles", () => {
    const displayCategories = getCategoriesInDisplayOrder();
    expect(displayCategories).toHaveLength(9);
    expect(
      displayCategories.map((c) => c.displayOrder ?? c.order)
    ).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);

    // Verify category titles have NO artificial prefixes
    displayCategories.forEach((cat) => {
      expect(cat.title.vi).not.toMatch(/TRỤC|TOPIC|PHÂN KHU|ZONE/i);
      expect(cat.title.en).not.toMatch(/TRỤC|TOPIC|PHÂN KHU|ZONE/i);
    });

    expect(displayCategories[0].slug).toBe("getting-started");
    expect(displayCategories[1].slug).toBe("factions");
    expect(displayCategories[2].slug).toBe("buildings");
    expect(displayCategories[3].slug).toBe("technology");
    expect(displayCategories[4].slug).toBe("events");
    expect(displayCategories[5].slug).toBe("shops");
    expect(displayCategories[6].slug).toBe("gear");
    expect(displayCategories[7].slug).toBe("power-systems");
    expect(displayCategories[8].slug).toBe("master-tables");
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
    expect(
      getArticleBySlug("roadmap", "horde-pivot-roadmap")?.slug
    ).toBe("horde-progression-playbook");
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

  it("exposes Guides Hub v3.1 Published Layer with 9 clean sections, shell scaffolding, and calculator linkages", () => {
    // SSoT raw helpers remain intact with 9 legacy categories and 39 legacy articles
    expect(getAllCategories()).toHaveLength(9);
    expect(getAllArticles()).toHaveLength(39);

    expect(PUBLISHED_GUIDE_CONFIG.codexPublished).toBe(false);
    expect(isCodexPublished()).toBe(false);

    expect(isGuideCategoryPublished("getting-started")).toBe(true);
    expect(isGuideCategoryPublished("factions")).toBe(true);
    expect(isGuideArticlePublished("getting-started", "overview")).toBe(true);
    expect(isGuideArticlePublished("getting-started", "terminology")).toBe(true);
    expect(isGuideArticlePublished("factions", "faction-overview")).toBe(true);

    const publishedCategories = getPublishedCategories();
    expect(publishedCategories).toHaveLength(9);
    
    // Verify zero artificial prefixes in published categories
    publishedCategories.forEach((cat) => {
      expect(cat.title.vi).not.toMatch(/TRỤC|TOPIC|PHÂN KHU|ZONE/i);
      expect(cat.title.en).not.toMatch(/TRỤC|TOPIC|PHÂN KHU|ZONE/i);
    });

    // Check Article 1.1 Golden Reference
    const art11 = getArticleBySlug("getting-started", "overview");
    expect(art11).toBeDefined();
    expect(art11?.status ?? "published").toBe("published");
    expect(art11?.freeSections.length).toBeGreaterThan(0);

    // Check Article 2.1 is Published
    const art21 = getArticleBySlug("factions", "faction-overview");
    expect(art21).toBeDefined();
    expect(art21?.status).toBe("published");
    expect(art21?.freeSections.length).toBeGreaterThan(0);
    expect(art21?.relatedCalculatorSlugs?.length).toBeGreaterThan(0);

    // Check Shell Article 2.2
    const art22 = getArticleBySlug("factions", "s0-to-s4-progression");
    expect(art22).toBeDefined();
    expect(art22?.status).toBe("shell");
    expect(art22?.plannedOutline?.length).toBeGreaterThan(0);
    expect(art22?.relatedCalculatorSlugs?.length).toBeGreaterThan(0);

    const publishedArticles = getPublishedArticles();
    expect(publishedArticles.length).toBe(37); // 4 + 5 + 4 + 4 + 4 + 4 + 4 + 4 + 4

    const adj = getPublishedAdjacentArticles("getting-started", "overview");
    expect(adj.prev).toBeNull();
    expect(adj.next?.slug).toBe("strict-one-queue-rule");

    const searchHits = searchPublishedGuides("Desert Prince", "vi");
    expect(searchHits.length).toBeGreaterThanOrEqual(1);
    expect(searchHits.some((a) => a.slug === "overview")).toBe(true);
  });
});

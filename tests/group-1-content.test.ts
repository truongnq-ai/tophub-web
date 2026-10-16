import { describe, expect, it } from "vitest";
import {
  getCategoryBySlug,
  getArticleBySlug,
  searchGuides,
} from "../src/content/guides/registry";

describe("Group 1 (getting-started) Standardized v2.0 Content Audit", () => {
  it("loads all 4 Group 1 articles with structured TL;DR, Free/PRO sections, and 10 Sub-Traps in 1.4", () => {
    const category = getCategoryBySlug("getting-started");
    expect(category).toBeDefined();
    expect(category?.articles).toHaveLength(4);

    const expectedSlugs = [
      "overview",
      "strict-one-queue-rule",
      "diamond-and-spending-guide",
      "top-10-account-traps",
    ];

    for (const slug of expectedSlugs) {
      const article = getArticleBySlug("getting-started", slug);
      expect(article, `Article ${slug} should exist`).toBeDefined();
      expect(article?.tldr).toBeDefined();
      expect(article?.tldr?.coreRule.vi.length).toBeGreaterThan(20);
      expect(article?.tldr?.coreRule.en.length).toBeGreaterThan(20);
      expect(article?.tldr?.immediateAction.vi.length).toBeGreaterThan(20);
      expect(article?.tldr?.strictTaboo.vi.length).toBeGreaterThan(20);
      expect(article?.freeSections.length).toBeGreaterThanOrEqual(3);
      expect(article?.proSections.length).toBeGreaterThanOrEqual(2);
    }

    const trapsArticle = getArticleBySlug("getting-started", "top-10-account-traps");
    const tenTrapsSection = trapsArticle?.freeSections.find(
      (s) => s.id === "sec-2-ten-account-traps"
    );
    expect(tenTrapsSection?.subSections).toHaveLength(10);
  });

  it("preserves 100% of audited v2.0 quantitative benchmarks and 2-Phase Dynamic Event Schedule across Group 1", () => {
    const category = getCategoryBySlug("getting-started");
    const serialized = JSON.stringify(category);

    // 15-Star System & Awakening benchmarks
    expect(serialized).toContain("560");
    expect(serialized).toContain("280");
    expect(serialized).toContain("1,000");
    expect(serialized).toContain("6,000");
    expect(serialized).toContain("345–385");
    expect(serialized).toContain("9 Hồn Đá Đỏ");

    // Skill Books Lv.15 Max benchmark
    expect(serialized).toContain("24,700");
    expect(serialized).toContain("8,000");
    expect(serialized).toContain("600,000");

    // Dual-Currency Soul Stone Floor
    expect(serialized).toContain("40,000");
    expect(serialized).toContain("360,000");
    expect(serialized).toContain("54,000");

    // Epic Hero Economy Traits & Bard Construction
    expect(serialized).toContain("Brawler");
    expect(serialized).toContain("Knight");
    expect(serialized).toContain("Ranger");
    expect(serialized).toContain("Bard");
    expect(serialized).toContain("+40%");

    // Faction Level 40 Meat benchmark
    expect(serialized).toContain("1,181.16");

    // 2-Phase Dynamic Server Event Calendar benchmarks
    expect(serialized).toContain("Thi Đấu Hội");
    expect(serialized).toContain("09:00");
    expect(serialized).toContain("Tập Kích Cự Ma");
    expect(serialized).toContain("Khiêu Chiến Của Đội Quân Hắc Ám");
  });

  it("supports searching by Section, SubSection, and TL;DR content", () => {
    const stairResults = searchGuides("Staircase", "en");
    expect(stairResults.some((a) => a.slug === "top-10-account-traps")).toBe(true);

    const giantRaidResults = searchGuides("Tập Kích Cự Ma", "vi");
    expect(giantRaidResults.length).toBeGreaterThan(0);
  });

  it("enforces 100% Zero-Personalization Gate on Group 1 content", () => {
    const category = getCategoryBySlug("getting-started");
    const serialized = JSON.stringify(category);
    const forbidden = ["[GAS]Max", "10956", "acc của anh", "tài khoản của anh"];

    for (const term of forbidden) {
      expect(serialized).not.toContain(term);
    }
  });
});

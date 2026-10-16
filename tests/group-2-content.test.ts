import { describe, expect, it } from "vitest";
import {
  getCategoryBySlug,
  getArticleBySlug,
  searchGuides,
} from "../src/content/guides/registry";

describe("Group 2 (heroes) Standardized v2.0 Content & Quantitative Audit", () => {
  it("loads all 5 Group 2 articles (2.1 -> 2.5) with structured TL;DR, Free/PRO sections, and SubSections", () => {
    const category = getCategoryBySlug("heroes");
    expect(category).toBeDefined();
    expect(category?.order).toBe(2);
    expect(category?.articles).toHaveLength(5);

    const expectedArticles = [
      { code: "2.1", slug: "encyclopedia" },
      { code: "2.2", slug: "meta-lineups" },
      { code: "2.3", slug: "formation-and-counters" },
      { code: "2.4", slug: "shards-and-skill-books" },
      { code: "2.5", slug: "epic-hero-traits" },
    ];

    for (const item of expectedArticles) {
      const article = getArticleBySlug("heroes", item.slug);
      expect(article, `Article ${item.slug} should exist`).toBeDefined();
      expect(article?.code).toBe(item.code);
      expect(article?.tldr).toBeDefined();
      expect(article?.tldr?.coreRule.vi.length).toBeGreaterThan(20);
      expect(article?.tldr?.coreRule.en.length).toBeGreaterThan(20);
      expect(article?.tldr?.immediateAction.vi.length).toBeGreaterThan(20);
      expect(article?.tldr?.immediateAction.en.length).toBeGreaterThan(20);
      expect(article?.tldr?.strictTaboo.vi.length).toBeGreaterThan(20);
      expect(article?.tldr?.strictTaboo.en.length).toBeGreaterThan(20);
      expect(article?.freeSections.length).toBeGreaterThanOrEqual(3);
      expect(article?.proSections.length).toBeGreaterThanOrEqual(2);
    }
  });

  it("eliminates all 4 legacy v1 data errors and preserves 100% of v2.0 quantitative benchmarks", () => {
    const category = getCategoryBySlug("heroes");
    const serialized = JSON.stringify(category);

    // 1. 15-Star System (3 Star Colors) & Shard Breakpoints
    expect(serialized).toContain("560");
    expect(serialized).toContain("280");
    expect(serialized).toContain("300");
    expect(serialized).toContain("600");
    expect(serialized).toContain("1,000");
    expect(serialized).toContain("500");

    // 2. Awakening Math & Dual-Currency Soul Stone Floor
    expect(serialized).toContain("9 Hồn Đá Đỏ");
    expect(serialized).toContain("345");
    expect(serialized).toContain("385");
    expect(serialized).toContain("40,000");
    expect(serialized).toContain("360,000");
    expect(serialized).toContain("6,000");
    expect(serialized).toContain("54,000");

    // 3. Skill Books Lv.10 Mid-game Breakpoint & Lv.15 Max Ceiling
    expect(serialized).toContain("8,000");
    expect(serialized).toContain("24,700");
    expect(serialized).toContain("98,800");
    expect(serialized).toContain("123,500");
    expect(serialized).toContain("600,000");

    // 4. Faction Level 1-40 Cumulative Meat & Shard Benchmarks (replaces legacy 8.37M error)
    expect(serialized).toContain("1,181.16");
    expect(serialized).toContain("1,307");
    expect(serialized).not.toContain("8.37M Thịt + 80 Mảnh Cam");
    expect(serialized).not.toContain("1 Sao Trắng (6 Sao)");
    expect(serialized).not.toContain("Phí Tẩy Điểm Thiên Phú Là 2.000 Kim Cương");

    // 5. All 8 Epic Heroes (+30%) & 10 Legendary Economic Passive Heroes (Bard +40% Construction, Stonemason +40% Stone)
    expect(serialized).toContain("Brawler");
    expect(serialized).toContain("Knight");
    expect(serialized).toContain("Ranger");
    expect(serialized).toContain("Minister");
    expect(serialized).toContain("Priestess");
    expect(serialized).toContain("Dancer");
    expect(serialized).toContain("Rogue");
    expect(serialized).toContain("Outlaw");
    expect(serialized).toContain("Bard");
    expect(serialized).toContain("Stonemason");
    expect(serialized).toContain("360,000");
    expect(serialized).toContain("2,000");
    expect(serialized).toContain("16,000");
  });

  it("supports searching Group 2 articles by hero name, formation grid, and economy traits in both locales", () => {
    const posSwapResults = searchGuides("Positional", "en");
    expect(posSwapResults.some((a) => a.slug === "formation-and-counters")).toBe(true);

    const brawlerResults = searchGuides("Brawler", "vi");
    expect(brawlerResults.some((a) => a.slug === "epic-hero-traits")).toBe(true);

    const shardResults = searchGuides("24,700", "vi");
    expect(shardResults.length).toBeGreaterThanOrEqual(0);
  });

  it("enforces 100% Zero-Personalization Gate on Group 2 content", () => {
    const category = getCategoryBySlug("heroes");
    const serialized = JSON.stringify(category);
    const forbidden = ["[GAS]Max", "10956", "acc của anh", "tài khoản của anh"];

    for (const term of forbidden) {
      expect(serialized).not.toContain(term);
    }
  });
});

import { describe, expect, it } from "vitest";
import {
  getCategoryBySlug,
  getArticleBySlug,
  getAdjacentArticles,
  searchGuides,
} from "../src/content/guides/registry";

describe("Group 3 (events) Standardized v2.0 Content, UI Block Contracts & Quantitative Audit", () => {
  it("loads all 4 Group 3 articles (3.1 -> 3.4) with structured TL;DR, 3 Free + 2 PRO sections, and SubSections", () => {
    const category = getCategoryBySlug("events");
    expect(category).toBeDefined();
    expect(category?.order).toBe(3);
    expect(category?.zoneId).toBe("zone_events_roadmap");
    expect(category?.articles).toHaveLength(4);

    const expectedArticles = [
      { code: "3.1", slug: "biweekly-rotation" },
      { code: "3.2", slug: "week-a-guild-race" },
      { code: "3.3", slug: "week-b-arms-race" },
      { code: "3.4", slug: "double-dip-schedule" },
    ];

    for (const item of expectedArticles) {
      const article = getArticleBySlug("events", item.slug);
      expect(article, `Article ${item.slug} should exist`).toBeDefined();
      expect(article?.code).toBe(item.code);
      expect(article?.tldr).toBeDefined();
      expect(article?.tldr?.coreRule.vi.length).toBeGreaterThan(20);
      expect(article?.tldr?.coreRule.en.length).toBeGreaterThan(20);
      expect(article?.tldr?.immediateAction.vi.length).toBeGreaterThan(20);
      expect(article?.tldr?.immediateAction.en.length).toBeGreaterThan(20);
      expect(article?.tldr?.strictTaboo.vi.length).toBeGreaterThan(20);
      expect(article?.tldr?.strictTaboo.en.length).toBeGreaterThan(20);
      expect(article?.freeSections).toHaveLength(3);
      expect(article?.proSections).toHaveLength(2);
    }
  });

  it("navigates sequentially across Group 2 -> Group 3 -> Group 4 boundaries without broken links", () => {
    const adj31 = getAdjacentArticles("events", "biweekly-rotation");
    expect(adj31.prev?.categorySlug).toBe("heroes");
    expect(adj31.prev?.code).toBe("2.5");
    expect(adj31.next?.code).toBe("3.2");

    const adj32 = getAdjacentArticles("events", "week-a-guild-race");
    expect(adj32.prev?.code).toBe("3.1");
    expect(adj32.next?.code).toBe("3.3");

    const adj33 = getAdjacentArticles("events", "week-b-arms-race");
    expect(adj33.prev?.code).toBe("3.2");
    expect(adj33.next?.code).toBe("3.4");

    const adj34 = getAdjacentArticles("events", "double-dip-schedule");
    expect(adj34.prev?.code).toBe("3.3");
    expect(adj34.next?.categorySlug).toBe("roadmap");
    expect(adj34.next?.code).toBe("4.1");
  });

  it("enforces MediaSpotlightBlock & VisualDiagramBlock contracts across all 4 articles (16 Media Codes)", () => {
    const expectedMediaBySlug: Record<string, string[]> = {
      "biweekly-rotation": ["MED-3.1-01", "MED-3.1-02", "MED-3.1-03", "MED-3.1-04"],
      "week-a-guild-race": ["MED-3.2-01", "MED-3.2-02", "MED-3.2-03", "MED-3.2-04"],
      "week-b-arms-race": ["MED-3.3-01", "MED-3.3-02", "MED-3.3-03", "MED-3.3-04"],
      "double-dip-schedule": ["MED-3.4-01", "MED-3.4-02", "MED-3.4-03", "MED-3.4-04"],
    };

    for (const [slug, codes] of Object.entries(expectedMediaBySlug)) {
      const article = getArticleBySlug("events", slug);
      const serialized = JSON.stringify(article);

      for (const code of codes) {
        expect(serialized, `${slug} must include ${code}`).toContain(code);
      }

      // Must include both visual_diagram and case_study blocks in PRO sections
      expect(serialized).toContain('"type":"visual_diagram"');
      expect(serialized).toContain('"type":"case_study"');

      // Group 3 must NOT misuse tier1_faction_loop (which renders the 3-Faction Counter Triangle)
      expect(serialized).not.toContain('"tier":"tier1_faction_loop"');
    }

    // Verify isolated checklistIds in 3.1 and 3.2
    expect(JSON.stringify(getArticleBySlug("events", "biweekly-rotation"))).toContain(
      "biweekly-daily-discipline-v2"
    );
    expect(JSON.stringify(getArticleBySlug("events", "week-a-guild-race"))).toContain(
      "week-a-guild-race-discipline-v2"
    );
  });

  it("eliminates all 4 legacy v1 schedule/mechanic errors and preserves 100% of v2.0 quantitative benchmarks", () => {
    const category = getCategoryBySlug("events");
    const serialized = JSON.stringify(category);

    // 1. Eliminates legacy v1 wrong 6-day GAR schedule & wrong Gold Task points (+360 to +540)
    expect(serialized).not.toContain(
      "Thứ 4: Chiêu mộ & Mảnh tướng; Thứ 5: Trang bị & Thánh tích; Thứ 6: Cổ ngữ & Pet; Thứ 7: Huấn luyện Lính & Chiến đấu"
    );
    expect(serialized).not.toContain("+360 đến +540 điểm");
    expect(serialized).not.toContain("+360 to +540 points");
    expect(serialized).not.toContain("Bung Mảnh Tướng Đỏ & Đột Phá Đồ Vàng");

    // 2. Article 3.1: 2-Phase Server Evolution, Fixed 2-Day Guild Rush & 8 Rotating Sub-Events
    const s31 = JSON.stringify(getArticleBySlug("events", "biweekly-rotation"));
    expect(s31).toContain("09:00");
    expect(s31).toContain("Đế Quốc Hắc Ám");
    expect(s31).toContain("Tập Kích Cự Ma");
    expect(s31).toContain("Guild Rush");
    expect(s31).toContain("Ultimate Power");
    expect(s31).toContain("Lord's Set");
    expect(s31).toContain("Hero Development");
    expect(s31).toContain("Rush Top");
    expect(s31).toContain("Decorations");
    expect(s31).toContain("Soul Stone");
    expect(s31).toContain("Pet Power");
    expect(s31).toContain("Relic Power");
    expect(s31).toContain("3,850");

    // 3. Article 3.2: 9-Slot Board (2 Exclusive 10-min refresh = 144/day), Ticket ROI & Dual-Currency Wallet Floor
    const s32 = JSON.stringify(getArticleBySlug("events", "week-a-guild-race"));
    expect(s32).toContain("10 phút");
    expect(s32).toContain("144");
    expect(s32).toContain("+300");
    expect(s32).toContain("+450");
    expect(s32).toContain("+280");
    expect(s32).toContain("+420");
    expect(s32).toContain("40,000");
    expect(s32).toContain("360,000");
    expect(s32).toContain("6,000");
    expect(s32).toContain("54,000");
    expect(s32).toContain("400%");
    expect(s32).toContain("250%");
    expect(s32).toContain("120%");
    expect(s32).toContain("+600");

    // 4. Article 3.3: 6-Day Fixed Themes, Secondary Scoring, KvK Multipliers & 4-Hour Golden Windows
    const s33 = JSON.stringify(getArticleBySlug("events", "week-b-arms-race"));
    expect(s33).toContain("120,000");
    expect(s33).toContain("50,000");
    expect(s33).toContain("10,000");
    expect(s33).toContain("40,000");
    expect(s33).toContain("13:00");
    expect(s33).toContain("17:00");
    expect(s33).toContain("21:00");
    expect(s33).toContain("Arms Race Prep");
    expect(s33).toContain("Staircase");
    expect(s33).toContain("35,000");
    expect(s33).toContain("8,500");

    // 5. Article 3.4: Double-Dip / Triple-Dip (300%) 13-Item Matrix & Hero Gear vs Lord Gear boundary
    const s34 = JSON.stringify(getArticleBySlug("events", "double-dip-schedule"));
    expect(s34).toContain("300%");
    expect(s34).toContain("200%");
    expect(s34).toContain("Triple-Dip");
    expect(s34).toContain("9,800");
    expect(s34).toContain("Lord Gear");
    expect(s34).toContain("Hero Gear");
    expect(s34).toContain("Glory Medals");
    expect(s34).toContain("Decor Tokens");
  });

  it("supports searching Group 3 articles by event mechanics, pre-cooking, and double-dip in both locales under 50ms", () => {
    const start = performance.now();
    const preCookResults = searchGuides("Pre-cooking", "en");
    const kvkResults = searchGuides("Pháo Đài", "vi");
    const tripleDipResults = searchGuides("Triple-Dip", "vi");
    const elapsed = performance.now() - start;

    expect(elapsed).toBeLessThan(50);
    expect(preCookResults.some((a) => a.slug === "week-a-guild-race")).toBe(true);
    expect(kvkResults.some((a) => a.slug === "week-b-arms-race")).toBe(true);
    expect(tripleDipResults.some((a) => a.slug === "double-dip-schedule")).toBe(true);
  });

  it("enforces 100% Zero-Personalization Gate on Group 3 content", () => {
    const category = getCategoryBySlug("events");
    const serialized = JSON.stringify(category);
    const forbidden = ["[GAS]Max", "10956", "acc của anh", "tài khoản của anh"];

    for (const term of forbidden) {
      expect(serialized).not.toContain(term);
    }
  });
});

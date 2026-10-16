import { describe, expect, it } from "vitest";
import {
  getCategoryBySlug,
  getArticleBySlug,
  getAdjacentArticles,
  searchGuides,
} from "../src/content/guides/registry";
import type {
  GuideArticle,
  GuideContentBlock,
  GuideLocale,
} from "../src/content/guides/types";

/**
 * Trích xuất độc lập toàn bộ chuỗi văn bản theo từng ngôn ngữ (vi hoặc en)
 * để đảm bảo không có số liệu nào chỉ xuất hiện ở 1 ngôn ngữ mà bị thiếu ở ngôn ngữ kia.
 */
function extractLocaleText(node: unknown, locale: GuideLocale): string {
  if (!node || typeof node !== "object") return "";
  if (Array.isArray(node)) {
    return node.map((item) => extractLocaleText(item, locale)).join(" ");
  }
  const record = node as Record<string, unknown>;
  if (typeof record.vi === "string" && typeof record.en === "string") {
    return record[locale] as string;
  }
  return Object.values(record)
    .map((val) => extractLocaleText(val, locale))
    .join(" ");
}

/**
 * Thu thập toàn bộ GuideContentBlock từ cả freeSections, proSections và subSections
 */
function collectAllBlocks(article: GuideArticle): GuideContentBlock[] {
  const blocks: GuideContentBlock[] = [];
  for (const sec of [...article.freeSections, ...article.proSections]) {
    blocks.push(...sec.blocks);
    for (const sub of sec.subSections ?? []) {
      blocks.push(...sub.blocks);
    }
  }
  return blocks;
}

describe("Group 4 (roadmap) Standardized v2.0 Content, UI Block Contracts & Quantitative Audit", () => {
  it("loads all 3 Group 4 articles (4.1 -> 4.3) with structured TL;DR, 3 Free + 2 PRO sections, and unique TOC anchor IDs", () => {
    const category = getCategoryBySlug("roadmap");
    expect(category).toBeDefined();
    expect(category?.order).toBe(4);
    expect(category?.zoneId).toBe("zone_events_roadmap");
    expect(category?.articles).toHaveLength(3);

    const expectedArticles = [
      { code: "4.1", slug: "preseason-mythic-calendar" },
      { code: "4.2", slug: "horde-pivot-roadmap" },
      { code: "4.3", slug: "season-1-to-4-roadmap" },
    ];

    for (const item of expectedArticles) {
      const article = getArticleBySlug("roadmap", item.slug);
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

      // Verify proSections have isPro: true and all section/subSection IDs are unique valid slugs
      const seenAnchorIds = new Set<string>();
      for (const sec of article!.proSections) {
        expect(sec.isPro).toBe(true);
      }
      for (const sec of [...article!.freeSections, ...article!.proSections]) {
        expect(sec.id).toMatch(/^[a-z0-9-]+$/);
        expect(seenAnchorIds.has(sec.id)).toBe(false);
        seenAnchorIds.add(sec.id);
        for (const sub of sec.subSections ?? []) {
          expect(sub.id).toMatch(/^[a-z0-9-]+$/);
          expect(seenAnchorIds.has(sub.id)).toBe(false);
          seenAnchorIds.add(sub.id);
        }
      }
    }
  });

  it("navigates sequentially across Group 3 -> Group 4 -> Group 5 boundaries without broken links", () => {
    const adj41 = getAdjacentArticles("roadmap", "preseason-mythic-calendar");
    expect(adj41.prev?.categorySlug).toBe("events");
    expect(adj41.prev?.code).toBe("3.4");
    expect(adj41.next?.code).toBe("4.2");

    const adj42 = getAdjacentArticles("roadmap", "horde-pivot-roadmap");
    expect(adj42.prev?.code).toBe("4.1");
    expect(adj42.next?.code).toBe("4.3");

    const adj43 = getAdjacentArticles("roadmap", "season-1-to-4-roadmap");
    expect(adj43.prev?.code).toBe("4.2");
    expect(adj43.next?.categorySlug).toBe("gear");
    expect(adj43.next?.code).toBe("5.1");
  });

  it("enforces deep AST contracts for MediaSpotlight, VisualDiagram, Table, Checklist & CaseStudy blocks (12 Media Codes)", () => {
    const expectedMediaBySlug: Record<string, string[]> = {
      "preseason-mythic-calendar": ["MED-4.1-01", "MED-4.1-02", "MED-4.1-03", "MED-4.1-04"],
      "horde-pivot-roadmap": ["MED-4.2-01", "MED-4.2-02", "MED-4.2-03", "MED-4.2-04"],
      "season-1-to-4-roadmap": ["MED-4.3-01", "MED-4.3-02", "MED-4.3-03", "MED-4.3-04"],
    };

    for (const [slug, codes] of Object.entries(expectedMediaBySlug)) {
      const article = getArticleBySlug("roadmap", slug)!;
      const serialized = JSON.stringify(article);

      for (const code of codes) {
        expect(serialized, `${slug} must include ${code}`).toContain(code);
      }

      const blocks = collectAllBlocks(article);
      expect(blocks.some((b) => b.type === "visual_diagram")).toBe(true);
      expect(blocks.some((b) => b.type === "checklist")).toBe(true);
      expect(blocks.some((b) => b.type === "case_study")).toBe(true);

      for (const block of blocks) {
        if (block.type === "table") {
          expect(block.headers.length).toBeGreaterThanOrEqual(2);
          expect(block.rows.length).toBeGreaterThanOrEqual(2);
          for (const row of block.rows) {
            expect(
              row.length,
              `Table row column count must match headers in ${slug}`
            ).toBe(block.headers.length);
            for (const cell of row) {
              expect(cell.vi.trim().length).toBeGreaterThan(0);
              expect(cell.en.trim().length).toBeGreaterThan(0);
            }
          }
        }

        if (block.type === "media_spotlight") {
          // Group 4 must NEVER misuse tier1_faction_loop (which hardcodes the static 3-Faction Triangle)
          expect(block.tier).not.toBe("tier1_faction_loop");
          if (block.tier === "tier2_annotated_ui") {
            expect(block.annotations?.length ?? 0).toBeGreaterThanOrEqual(2);
          }
          if (block.tier === "tier4_youtube_ref") {
            expect(block.videoChannel?.trim().length ?? 0).toBeGreaterThan(2);
            expect(block.videoTitle?.trim().length ?? 0).toBeGreaterThan(5);
          }
        }

        if (block.type === "visual_diagram") {
          const hasNodesOrBranches =
            (block.nodes?.length ?? 0) > 0 || (block.branches?.length ?? 0) > 0;
          expect(hasNodesOrBranches).toBe(true);
          for (const branch of block.branches ?? []) {
            // Never use "blue" on VisualDiagramBranch (which renders red XCircle in visual-diagram-block.tsx)
            expect(branch.tone).not.toBe("blue");
            expect(branch.steps.length).toBeGreaterThanOrEqual(1);
          }
        }

        if (block.type === "case_study") {
          expect(block.metrics?.length ?? 0).toBeGreaterThanOrEqual(2);
          expect(block.diagnostics?.length ?? 0).toBeGreaterThanOrEqual(2);
          expect(block.recoverySteps.length).toBeGreaterThanOrEqual(2);
        }

        if (block.type === "checklist") {
          expect(block.items.length).toBeGreaterThanOrEqual(3);
          const itemIds = new Set(block.items.map((i) => i.id));
          expect(itemIds.size).toBe(block.items.length);
        }
      }
    }

    // Verify isolated checklistIds in 4.1, 4.2, and 4.3
    expect(JSON.stringify(getArticleBySlug("roadmap", "preseason-mythic-calendar"))).toContain(
      "preseason-s0-weekly-discipline-v2"
    );
    expect(JSON.stringify(getArticleBySlug("roadmap", "horde-pivot-roadmap"))).toContain(
      "horde-pivot-readiness-v2"
    );
    expect(JSON.stringify(getArticleBySlug("roadmap", "season-1-to-4-roadmap"))).toContain(
      "pre-s1-hoarding-readiness-v2"
    );
  });

  it("eliminates all 4 legacy v1 errors and preserves 100% of v2.0 quantitative benchmarks independently in BOTH vi and en", () => {
    const category = getCategoryBySlug("roadmap")!;
    const serialized = JSON.stringify(category);

    // 1. Eliminates legacy v1 errors (Brawler Day 21 Mythic, 1-White Star = 6 Stars, Shaman 9 Soul Stones)
    expect(serialized).not.toContain("Ngày 21 — Đấu Sĩ (Brawler) & Paragon");
    expect(serialized).not.toContain("Day 21 — Brawler & Paragon");
    expect(serialized).not.toContain("Ngày 21: Đấu Sĩ (Brawler) xuất hiện");
    expect(serialized).not.toContain("1 Sao Trắng (6 Sao)");
    expect(serialized).not.toContain("1-White Star (6 Stars)");
    expect(serialized).not.toContain("Thức tỉnh Shaman lên Đỏ (9 Đá Linh Hồn)");
    expect(serialized).not.toContain("Awaken Shaman to Mythic Red (9 Soul Stones)");

    // 2. Bilingual parity check across BOTH locales (vi and en) for 4.1, 4.2, and 4.3
    const a41 = getArticleBySlug("roadmap", "preseason-mythic-calendar")!;
    const a42 = getArticleBySlug("roadmap", "horde-pivot-roadmap")!;
    const a43 = getArticleBySlug("roadmap", "season-1-to-4-roadmap")!;

    for (const locale of ["vi", "en"] as const) {
      // Article 4.1 benchmarks in both vi and en
      const t41 = extractLocaleText(a41, locale);
      for (const token of [
        "Desert Prince",
        "Storm Maiden",
        "Paragon",
        "Witch",
        "Rose Princess",
        "Bishop",
        "Tidecaller",
        "Monk",
        "Ne Zha",
        "Petalis",
        "160",
        "400",
        "560",
        "1,000",
        "70",
        "100",
        "300",
        "28,500",
        "33,000",
        "13,500",
      ]) {
        expect(t41, `Article 4.1 (${locale}) must contain ${token}`).toContain(token);
      }

      // Article 4.2 benchmarks in both vi and en
      const t42 = extractLocaleText(a42, locale);
      for (const token of [
        "Soulmancer",
        "Warlock",
        "345",
        "385",
        "40,000",
        "360,000",
        "6,000",
        "54,000",
        "1,035",
        "1,155",
        "3.2M",
        "2.8M",
        "400,000",
        "600,000",
      ]) {
        expect(t42, `Article 4.2 (${locale}) must contain ${token}`).toContain(token);
      }

      // Article 4.3 benchmarks in both vi and en
      const t43 = extractLocaleText(a43, locale);
      for (const token of [
        "The Spring",
        "Spring Water",
        "Dune Devourer",
        "Lv.35",
        "Lv.40",
        "Brilliance Institute",
        "5,422",
        "30°C",
        "Wukong",
        "Beastmaster",
        "Legendary T1",
        "Legendary T2",
        "Sacred Codex",
        "Shadow Priest",
        "Artificer",
        "8,200",
        "58,000",
        "480",
        "8.5M",
      ]) {
        expect(t43, `Article 4.3 (${locale}) must contain ${token}`).toContain(token);
      }
    }
  });

  it("supports searching Group 4 articles by mythic schedule, horde pivot, and seasonal mechanics in both locales under 50ms", () => {
    const start = performance.now();
    const princeResults = searchGuides("Desert Prince", "en");
    const pivotResults = searchGuides("Soulmancer", "vi");
    const brillianceResults = searchGuides("Viện Huy Hoàng", "vi");
    const brillianceEnResults = searchGuides("Brilliance Institute", "en");
    const elapsed = performance.now() - start;

    expect(elapsed).toBeLessThan(50);
    expect(princeResults.some((a) => a.slug === "preseason-mythic-calendar")).toBe(true);
    expect(pivotResults.some((a) => a.slug === "horde-pivot-roadmap")).toBe(true);
    expect(brillianceResults.some((a) => a.slug === "season-1-to-4-roadmap")).toBe(true);
    expect(brillianceEnResults.some((a) => a.slug === "season-1-to-4-roadmap")).toBe(true);
  });

  it("enforces 100% Zero-Personalization Gate on Group 4 content", () => {
    const category = getCategoryBySlug("roadmap");
    const serialized = JSON.stringify(category);
    const forbidden = ["[GAS]Max", "10956", "acc của anh", "tài khoản của anh"];

    for (const term of forbidden) {
      expect(serialized).not.toContain(term);
    }
  });
});

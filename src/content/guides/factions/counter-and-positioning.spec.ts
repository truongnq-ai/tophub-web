import { describe, expect, it } from "vitest";
import { ARTICLE_2_5_COUNTER_AND_POSITIONING } from "./counter-and-positioning";
import {
  getCategoryBySlug,
  getArticleBySlug,
  isGuideArticlePublished,
  searchGuides,
} from "../registry";

const VI_DIACRITIC_REGEX =
  /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]/;

function collectVietnameseLeaksInEn(
  node: unknown,
  path: string,
  leaks: string[]
): void {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) {
    node.forEach((item, index) =>
      collectVietnameseLeaksInEn(item, `${path}[${index}]`, leaks)
    );
    return;
  }
  const record = node as Record<string, unknown>;
  if (typeof record.vi === "string" && typeof record.en === "string") {
    if (VI_DIACRITIC_REGEX.test(record.en)) {
      leaks.push(`${path}.en => ${JSON.stringify(record.en)}`);
    }
    return;
  }
  for (const [key, value] of Object.entries(record)) {
    collectVietnameseLeaksInEn(value, `${path}.${key}`, leaks);
  }
}

describe("Section 2.5: Counter and Positioning (counter-and-positioning) TDD Audit", () => {
  it("Suite 1: Metadata, Slug & Published Status Verification", () => {
    const article = ARTICLE_2_5_COUNTER_AND_POSITIONING;
    expect(article).toBeDefined();
    expect(article.code).toBe("2.5");
    expect(article.displayCode).toBe("2.5");
    expect(article.slug).toBe("counter-and-positioning");
    expect(article.categorySlug).toBe("factions");
    expect(article.status).toBe("published");
    expect(article.badge).toBe("HOT");
    expect(article.readingMinutes).toBeGreaterThanOrEqual(10);
    expect(article.readingMinutes).toBeLessThanOrEqual(15);
  });

  it("Suite 2: 100% Bilingual Completeness & Zero Vietnamese Diacritics Leaks", () => {
    const article = ARTICLE_2_5_COUNTER_AND_POSITIONING;
    expect(article.title.vi.length).toBeGreaterThanOrEqual(20);
    expect(article.title.en.length).toBeGreaterThanOrEqual(20);
    expect(article.summary.vi.length).toBeGreaterThanOrEqual(50);
    expect(article.summary.en.length).toBeGreaterThanOrEqual(50);

    expect(article.tldr).toBeDefined();
    expect(article.tldr?.coreRule.vi.length).toBeGreaterThanOrEqual(40);
    expect(article.tldr?.coreRule.en.length).toBeGreaterThanOrEqual(40);
    expect(article.tldr?.immediateAction.vi.length).toBeGreaterThanOrEqual(40);
    expect(article.tldr?.immediateAction.en.length).toBeGreaterThanOrEqual(40);
    expect(article.tldr?.strictTaboo.vi.length).toBeGreaterThanOrEqual(40);
    expect(article.tldr?.strictTaboo.en.length).toBeGreaterThanOrEqual(40);

    expect(article.keyTakeaways.length).toBeGreaterThanOrEqual(4);
    article.keyTakeaways.forEach((k, idx) => {
      expect(k.vi.length, `keyTakeaways[${idx}].vi`).toBeGreaterThanOrEqual(30);
      expect(k.en.length, `keyTakeaways[${idx}].en`).toBeGreaterThanOrEqual(30);
    });

    const leaks: string[] = [];
    collectVietnameseLeaksInEn(article, "article", leaks);
    expect(leaks, `English texts must have 0 Vietnamese diacritics leaks:\n${leaks.join("\n")}`).toHaveLength(0);
  });

  it("Suite 3: Quantitative SSoT Benchmarks Audit", () => {
    const article = ARTICLE_2_5_COUNTER_AND_POSITIONING;
    const serialized = JSON.stringify(article);

    // 6-Slot Grid & Targeting
    expect(serialized).toContain("2×3 Grid");
    expect(serialized).toContain("Ô 1");
    expect(serialized).toContain("Ô 2");
    expect(serialized).toContain("Ô 3");
    expect(serialized).toContain("Ô 4");
    expect(serialized).toContain("Ô 5");
    expect(serialized).toContain("Ô 6");

    // Counter & Auras
    expect(serialized).toContain("+20%");
    expect(serialized).toContain("-20%");
    expect(serialized).toContain("+10%");
    expect(serialized).toContain("+15%");
    expect(serialized).toContain("+25%");
    expect(serialized).toContain("+35%");

    // Tactical Concepts & Numbers
    expect(serialized).toContain("5+1 Flex");
    expect(serialized).toContain("10%–18%");
    expect(serialized).toContain("1,181.162M");
    expect(serialized).toContain("1,307");
    expect(serialized).toContain("Lv.31➔40");

    // Core Heroes
    expect(serialized).toContain("Adjudicator");
    expect(serialized).toContain("Pyromancer");
    expect(serialized).toContain("Beastmaster");
    expect(serialized).toContain("Wukong");
    expect(serialized).toContain("Tidecaller");
  });

  it("Suite 4: Structural Completeness (5 Focused Sections & UI Blocks)", () => {
    const article = ARTICLE_2_5_COUNTER_AND_POSITIONING;
    const allSections = [...article.freeSections, ...article.proSections];
    expect(allSections.length).toBeGreaterThanOrEqual(5);

    const expectedSectionIds = [
      "sec-1-six-slot-grid-mechanics",
      "sec-2-gold-positioning-map",
      "sec-3-counter-triangle-and-auras",
      "sec-4-positional-swapping-and-flex",
      "sec-5-meta-lineup-templates-and-calculators",
    ];

    expectedSectionIds.forEach((id) => {
      expect(allSections.some((s) => s.id === id), `Missing section: ${id}`).toBe(true);
    });

    const allBlocks = allSections.flatMap((s) => [
      ...s.blocks,
      ...(s.subSections?.flatMap((sub) => sub.blocks) ?? []),
    ]);

    expect(allBlocks.filter((b) => b.type === "callout").length).toBeGreaterThanOrEqual(3);
    expect(allBlocks.filter((b) => b.type === "table").length).toBeGreaterThanOrEqual(2);
    expect(allBlocks.filter((b) => b.type === "visual_diagram").length).toBeGreaterThanOrEqual(1);

    expect(article.relatedCalculatorSlugs).toEqual(
      expect.arrayContaining(["hero-traits", "hero-stars", "hero-awakening"])
    );
  });

  it("Suite 5: Registry & Navigation Integration", () => {
    const articleFromRegistry = getArticleBySlug("factions", "counter-and-positioning");
    expect(articleFromRegistry).toBeDefined();
    expect(articleFromRegistry?.code).toBe("2.5");
    expect(articleFromRegistry?.status).toBe("published");
    expect(isGuideArticlePublished("factions", "counter-and-positioning")).toBe(true);

    const viSearch = searchGuides("Xếp Trận 6 Ô", "vi");
    expect(viSearch.some((a) => a.slug === "counter-and-positioning")).toBe(true);

    const enSearch = searchGuides("6-Slot Grid", "en");
    expect(enSearch.some((a) => a.slug === "counter-and-positioning")).toBe(true);
  });

  it("Suite 6: Zero-Personalization Compliance Gate", () => {
    const article = ARTICLE_2_5_COUNTER_AND_POSITIONING;
    const serialized = JSON.stringify(article);
    const forbidden = ["[GAS]Max", "10956", "acc của anh", "tài khoản của anh", "server 10xxx"];

    for (const term of forbidden) {
      expect(serialized).not.toContain(term);
    }
  });
});

import { describe, expect, it } from "vitest";
import {
  getCategoryBySlug,
  getArticleBySlug,
  isGuideArticlePublished,
  searchGuides,
} from "../src/content/guides/registry";

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

describe("Section 2.1: Faction Overview (faction-overview) Hardened TDD Audit", () => {
  it("Suite 1: Metadata, Hierarchy & Published Status Verification", () => {
    const category = getCategoryBySlug("factions");
    expect(category, "Category factions must exist in display order").toBeDefined();
    expect(category?.order).toBe(2);

    const article = getArticleBySlug("factions", "faction-overview");
    expect(article, "Article faction-overview must exist").toBeDefined();
    expect(article?.code).toBe("2.1");
    expect(article?.displayCode).toBe("2.1");
    expect(article?.slug).toBe("faction-overview");
    expect(article?.categorySlug).toBe("factions");
    expect(article?.status).toBe("published");
    expect(article?.badge).toBe("HOT");
    expect(article?.readingMinutes).toBeGreaterThanOrEqual(10);
    expect(article?.readingMinutes).toBeLessThanOrEqual(15);
    expect(isGuideArticlePublished("factions", "faction-overview")).toBe(true);
  });

  it("Suite 2: 100% Bilingual Completeness & Zero Vietnamese Diacritics Leaks", () => {
    const article = getArticleBySlug("factions", "faction-overview");
    expect(article).toBeDefined();
    if (!article) return;

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
    const article = getArticleBySlug("factions", "faction-overview");
    const serialized = JSON.stringify(article);

    // Aura & Counter mechanics
    expect(serialized).toContain("+35%");
    expect(serialized).toContain("+25%");
    expect(serialized).toContain("+15%");
    expect(serialized).toContain("+20%");
    expect(serialized).toContain("-20%");

    // Soul Stones & Economy
    expect(serialized).toContain("9 Hồn Đá Đỏ");
    expect(serialized).toContain("360,000");
    expect(serialized).toContain("54,000");
    expect(serialized).toContain("40,000");
    expect(serialized).toContain("18–27");

    // Star System & Shards
    expect(serialized).toContain("160");
    expect(serialized).toContain("560");
    expect(serialized).toContain("1,000");
    expect(serialized).toContain("345–385");

    // Gear Columns & Relics & Pets
    expect(serialized).toContain("Cột 1");
    expect(serialized).toContain("Cột 2");
    expect(serialized).toContain("Cột 3");
    expect(serialized).toContain("Arcane Vault");
    expect(serialized).toContain("Dragon's Might");
    expect(serialized).toContain("Sacred Sylvan");
    expect(serialized).toContain("Eggy");
    expect(serialized).toContain("Tiggy");
    expect(serialized).toContain("Cactini");
    expect(serialized).toContain("Heavy Cavalry");
    expect(serialized).toContain("Desert Knight");
    expect(serialized).toContain("Divine Spirit");
    expect(serialized).toContain("Tree Spirit");
  });

  it("Suite 4: Structural Completeness (4 Free + 3 Pro Sections & UI Blocks)", () => {
    const article = getArticleBySlug("factions", "faction-overview");
    expect(article).toBeDefined();
    if (!article) return;

    expect(article.freeSections).toHaveLength(4);
    expect(article.proSections).toHaveLength(3);

    const expectedFreeIds = [
      "sec-1-aura-and-counter-triangle",
      "sec-2-three-factions-matrix",
      "sec-3-league-deep-dive",
      "sec-4-horde-deep-dive",
    ];
    expectedFreeIds.forEach((id) => {
      expect(article.freeSections.some((s) => s.id === id), `Missing free section: ${id}`).toBe(true);
    });

    const expectedProIds = [
      "sec-5-nature-deep-dive",
      "sec-6-day1-to-day7-decision-tree",
      "sec-7-calculators-bridge",
    ];
    expectedProIds.forEach((id) => {
      expect(article.proSections.some((s) => s.id === id && s.isPro === true), `Missing pro section: ${id}`).toBe(true);
    });

    const allBlocks = [
      ...article.freeSections.flatMap((s) => [...s.blocks, ...(s.subSections?.flatMap((sub) => sub.blocks) ?? [])]),
      ...article.proSections.flatMap((s) => [...s.blocks, ...(s.subSections?.flatMap((sub) => sub.blocks) ?? [])]),
    ];

    expect(allBlocks.filter((b) => b.type === "callout").length).toBeGreaterThanOrEqual(3);
    expect(allBlocks.filter((b) => b.type === "table").length).toBeGreaterThanOrEqual(2);
    expect(allBlocks.filter((b) => b.type === "visual_diagram").length).toBeGreaterThanOrEqual(1);
    expect(allBlocks.filter((b) => b.type === "checklist").length).toBeGreaterThanOrEqual(1);

    expect(article.relatedCalculatorSlugs).toEqual(
      expect.arrayContaining(["hero-stars", "hero-awakening", "hero-traits"])
    );
  });

  it("Suite 5: Search & SEO Discovery in Both Locales", () => {
    const viHorde = searchGuides("Bộ Tộc", "vi");
    expect(viHorde.some((a) => a.slug === "faction-overview")).toBe(true);

    const enHorde = searchGuides("Pure Horde", "en");
    expect(enHorde.some((a) => a.slug === "faction-overview")).toBe(true);

    const soulStoneSearch = searchGuides("9 Hồn Đá Đỏ", "vi");
    expect(soulStoneSearch.some((a) => a.slug === "faction-overview")).toBe(true);
  });

  it("Suite 6: Zero-Personalization Compliance Gate", () => {
    const article = getArticleBySlug("factions", "faction-overview");
    const serialized = JSON.stringify(article);
    const forbidden = ["[GAS]Max", "10956", "acc của anh", "tài khoản của anh", "server 10xxx"];

    for (const term of forbidden) {
      expect(serialized).not.toContain(term);
    }
  });
});

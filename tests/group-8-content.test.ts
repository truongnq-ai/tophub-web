import { describe, expect, it } from "vitest";
import {
  getAdjacentArticles,
  getAllArticles,
  getArticleBySlug,
  getCategoryBySlug,
  searchGuides,
} from "@/content/guides/registry";
import type {
  GuideArticle,
  GuideCaseStudyBlock,
  GuideChecklistBlock,
  GuideContentBlock,
  GuideLocale,
  GuideMediaSpotlightBlock,
  GuideTableBlock,
  GuideVisualDiagramBlock,
} from "@/content/guides/types";

/**
 * Trích xuất đệ quy toàn bộ văn bản theo từng ngôn ngữ độc lập ('vi' hoặc 'en')
 * để đảm bảo không bỏ sót dịch thuật số liệu ở bất kỳ ngôn ngữ nào (Blindspot #7).
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

function collectAllBlocks(article: GuideArticle): GuideContentBlock[] {
  const all: GuideContentBlock[] = [];
  for (const sec of [...article.freeSections, ...article.proSections]) {
    all.push(...sec.blocks);
    sec.subSections?.forEach((sub) => all.push(...sub.blocks));
  }
  return all;
}

describe("Track 4 Phase 3H (Final): Group 8 (infrastructure 8.1 -> 8.4) Standardized v2.0 Content & SSoT Integrity", () => {
  it("resolves Group 8 category and all 4 standardized articles (8.1 -> 8.4)", () => {
    const category = getCategoryBySlug("infrastructure");
    expect(category).toBeDefined();
    expect(category?.order).toBe(8);
    expect(category?.zoneId).toBe("zone_systems_economy");
    expect(category?.iconName).toBe("Castle");
    expect(category?.articles).toHaveLength(4);

    const expectedSlugs = [
      { code: "8.1", slug: "castle-and-brilliance" },
      { code: "8.2", slug: "builder-queues-and-villagers" },
      { code: "8.3", slug: "research-and-baiting" },
      { code: "8.4", slug: "master-data-tables" },
    ];

    for (const exp of expectedSlugs) {
      const article = getArticleBySlug("infrastructure", exp.slug);
      expect(article, `Article ${exp.code} (${exp.slug}) must exist`).toBeDefined();
      expect(article?.code).toBe(exp.code);
      expect(article?.categorySlug).toBe("infrastructure");
      expect(["FREE", "HOT", "PRO"]).toContain(article?.badge);
      expect(article?.tldr).toBeDefined();
      expect(article!.tldr!.coreRule.vi.trim().length).toBeGreaterThan(25);
      expect(article!.tldr!.coreRule.en.trim().length).toBeGreaterThan(25);
      expect(article!.tldr!.immediateAction.vi.trim().length).toBeGreaterThan(25);
      expect(article!.tldr!.immediateAction.en.trim().length).toBeGreaterThan(25);
      expect(article!.tldr!.strictTaboo.vi.trim().length).toBeGreaterThan(25);
      expect(article!.tldr!.strictTaboo.en.trim().length).toBeGreaterThan(25);
      expect(article!.keyTakeaways.length).toBeGreaterThanOrEqual(3);
      for (const kt of article!.keyTakeaways) {
        expect(kt.vi.trim().length).toBeGreaterThan(20);
        expect(kt.en.trim().length).toBeGreaterThan(20);
      }
      expect(article?.freeSections).toHaveLength(3);
      expect(article?.proSections).toHaveLength(2);
      expect(article?.sourceFiles.length).toBeGreaterThanOrEqual(1);
      expect(article?.sourceFiles[0]).toBe(
        `docs/06-game-guides/07-standardized-web-guides/group-8-infrastructure/${exp.code}-${exp.slug}.md`
      );
      expect(JSON.stringify(article?.sourceFiles)).not.toContain("group-8-vip-and-reference");
      expect(article?.keywords.length).toBeGreaterThanOrEqual(10);

      for (const freeSec of article!.freeSections) {
        expect(freeSec.isPro).toBeFalsy();
      }
      for (const proSec of article!.proSections) {
        expect(proSec.isPro).toBe(true);
      }
    }
  });

  it("enforces all 5 Rich RPG Blocks, all 16 Media Codes (MED-8.1-01 -> MED-8.4-04), nested component invariants & table column parity", () => {
    const articlesConfig = [
      {
        slug: "castle-and-brilliance",
        expectedMedia: ["MED-8.1-01", "MED-8.1-02", "MED-8.1-03", "MED-8.1-04"],
      },
      {
        slug: "builder-queues-and-villagers",
        expectedMedia: ["MED-8.2-01", "MED-8.2-02", "MED-8.2-03", "MED-8.2-04"],
      },
      {
        slug: "research-and-baiting",
        expectedMedia: ["MED-8.3-01", "MED-8.3-02", "MED-8.3-03", "MED-8.3-04"],
      },
      {
        slug: "master-data-tables",
        expectedMedia: ["MED-8.4-01", "MED-8.4-02", "MED-8.4-03", "MED-8.4-04"],
      },
    ];
    const seenChecklistIds = new Set<string>();

    for (const cfg of articlesConfig) {
      const article = getArticleBySlug("infrastructure", cfg.slug)!;
      expect(article).toBeDefined();

      // Unique TOC anchors per article (sec.id + sub.id) & non-empty titles/blocks (Blindspot #19)
      const seenAnchorIds = new Set<string>();
      for (const sec of [...article.freeSections, ...article.proSections]) {
        expect(seenAnchorIds.has(sec.id), `Duplicate section id ${sec.id} in ${cfg.slug}`).toBe(false);
        expect(sec.id).toMatch(/^[a-z0-9-]+$/);
        expect(sec.title.vi.trim().length).toBeGreaterThan(5);
        expect(sec.title.en.trim().length).toBeGreaterThan(5);
        seenAnchorIds.add(sec.id);
        for (const sub of sec.subSections ?? []) {
          expect(seenAnchorIds.has(sub.id), `Duplicate subSection id ${sub.id} in ${cfg.slug}`).toBe(false);
          expect(sub.id).toMatch(/^[a-z0-9-]+$/);
          expect(sub.title.vi.trim().length).toBeGreaterThan(5);
          expect(sub.title.en.trim().length).toBeGreaterThan(5);
          expect(sub.blocks.length).toBeGreaterThanOrEqual(1);
          seenAnchorIds.add(sub.id);
        }
      }

      const allBlocks = collectAllBlocks(article);
      const blockTypes = new Set(allBlocks.map((b) => b.type));

      expect(blockTypes.has("visual_diagram"), `${cfg.slug} missing visual_diagram`).toBe(true);
      expect(blockTypes.has("checklist"), `${cfg.slug} missing checklist`).toBe(true);
      expect(blockTypes.has("case_study"), `${cfg.slug} missing case_study`).toBe(true);
      expect(blockTypes.has("media_spotlight"), `${cfg.slug} missing media_spotlight`).toBe(true);
      expect(blockTypes.has("table"), `${cfg.slug} missing table`).toBe(true);

      // Verify all 4 Media Codes exist in the article
      const foundMediaCodes = new Set<string>();
      for (const b of allBlocks) {
        if ((b.type === "media_spotlight" || b.type === "visual_diagram") && b.mediaCode) {
          foundMediaCodes.add(b.mediaCode);
        }
      }
      for (const code of cfg.expectedMedia) {
        expect(foundMediaCodes.has(code), `${cfg.slug} missing mediaCode ${code}`).toBe(true);
      }

      // Validate Table Column Parity & Non-Empty Cells
      const tables = allBlocks.filter((b): b is GuideTableBlock => b.type === "table");
      for (const tbl of tables) {
        expect(tbl.headers.length).toBeGreaterThanOrEqual(2);
        expect(tbl.rows.length).toBeGreaterThanOrEqual(2);
        for (const row of tbl.rows) {
          expect(
            row.length,
            `Table row column mismatch in ${cfg.slug}: expected ${tbl.headers.length}, got ${row.length}`
          ).toBe(tbl.headers.length);
          for (const cell of row) {
            expect(cell.vi.trim().length).toBeGreaterThan(0);
            expect(cell.en.trim().length).toBeGreaterThan(0);
          }
        }
      }

      // Validate VisualDiagramBlock nested invariants
      const diagrams = allBlocks.filter(
        (b): b is GuideVisualDiagramBlock => b.type === "visual_diagram"
      );
      for (const diag of diagrams) {
        expect(diag.title.vi.trim().length).toBeGreaterThan(5);
        expect(diag.title.en.trim().length).toBeGreaterThan(5);
        const hasNodesOrBranches =
          (diag.nodes?.length ?? 0) > 0 || (diag.branches?.length ?? 0) > 0;
        expect(hasNodesOrBranches, `${cfg.slug} visual_diagram must have nodes or branches`).toBe(true);

        const seenNodeIds = new Set<string>();
        for (const node of diag.nodes ?? []) {
          expect(seenNodeIds.has(node.id), `Duplicate node.id ${node.id} in ${cfg.slug}`).toBe(false);
          seenNodeIds.add(node.id);
        }
        for (const br of diag.branches ?? []) {
          expect(["emerald", "gold"]).toContain(br.tone);
          expect(br.steps.length).toBeGreaterThanOrEqual(1);
          for (const step of br.steps) {
            expect(seenNodeIds.has(step.id), `Duplicate step.id ${step.id} in ${cfg.slug}`).toBe(false);
            seenNodeIds.add(step.id);
          }
        }
      }

      // Validate ChecklistBlock uniqueness & item IDs
      const checklists = allBlocks.filter(
        (b): b is GuideChecklistBlock => b.type === "checklist"
      );
      for (const chk of checklists) {
        expect(seenChecklistIds.has(chk.checklistId)).toBe(false);
        seenChecklistIds.add(chk.checklistId);
        expect(chk.items.length).toBeGreaterThanOrEqual(4);
        const seenItemIds = new Set<string>();
        for (const item of chk.items) {
          expect(seenItemIds.has(item.id)).toBe(false);
          seenItemIds.add(item.id);
          expect(item.label.vi.trim().length).toBeGreaterThan(5);
          expect(item.label.en.trim().length).toBeGreaterThan(5);
        }
      }

      // Validate CaseStudyBlock non-empty recoverySteps, diagnostics & metrics
      const caseStudies = allBlocks.filter(
        (b): b is GuideCaseStudyBlock => b.type === "case_study"
      );
      for (const cs of caseStudies) {
        expect(cs.recoverySteps.length).toBeGreaterThanOrEqual(3);
        expect(cs.diagnostics?.length ?? 0).toBeGreaterThanOrEqual(2);
        expect(cs.metrics?.length ?? 0).toBeGreaterThanOrEqual(3);
        expect(cs.profileSummary.vi.trim().length).toBeGreaterThan(10);
        expect(cs.profileSummary.en.trim().length).toBeGreaterThan(10);
      }

      // Validate MediaSpotlightBlock tier, LocalizedText title/description & string videoTitle (Blindspot #1 & #12)
      const spotlights = allBlocks.filter(
        (b): b is GuideMediaSpotlightBlock => b.type === "media_spotlight"
      );
      for (const sp of spotlights) {
        expect(sp.tier).not.toBe("tier1_faction_loop");
        expect(sp.title.vi.trim().length).toBeGreaterThan(5);
        expect(sp.title.en.trim().length).toBeGreaterThan(5);
        expect(sp.description.vi.trim().length).toBeGreaterThan(10);
        expect(sp.description.en.trim().length).toBeGreaterThan(10);
        if (sp.tier === "tier2_annotated_ui") {
          expect(sp.annotations?.length ?? 0).toBeGreaterThanOrEqual(2);
        }
        if (sp.tier === "tier4_youtube_ref") {
          expect(sp.videoChannel?.trim().length ?? 0).toBeGreaterThan(2);
          expect(sp.videoTitle?.trim().length ?? 0).toBeGreaterThan(5);
          expect(sp.videoTimestamp?.trim().length ?? 0).toBeGreaterThan(3);
        }
        if (sp.videoUrl) {
          expect(sp.videoUrl.startsWith("https://")).toBe(true);
        }
      }

      // Validate Paragraph, List & Callout Blocks non-empty bilingual parity (Blindspot #19)
      for (const b of allBlocks) {
        if (b.type === "paragraph") {
          expect(b.text.vi.trim().length).toBeGreaterThan(10);
          expect(b.text.en.trim().length).toBeGreaterThan(10);
        } else if (b.type === "list") {
          expect(b.items.length).toBeGreaterThanOrEqual(1);
          for (const item of b.items) {
            expect(item.vi.trim().length).toBeGreaterThan(5);
            expect(item.en.trim().length).toBeGreaterThan(5);
          }
        } else if (b.type === "callout") {
          expect(b.title.vi.trim().length).toBeGreaterThan(3);
          expect(b.title.en.trim().length).toBeGreaterThan(3);
          expect(b.content.vi.trim().length).toBeGreaterThan(10);
          expect(b.content.en.trim().length).toBeGreaterThan(10);
        }
      }
    }
  });

  it("enforces exact SSoT table row cardinality across all 23 tables in 8.1 -> 8.4 (Blindspot #9)", () => {
    const a81Tables = collectAllBlocks(getArticleBySlug("infrastructure", "castle-and-brilliance")!).filter(
      (b): b is GuideTableBlock => b.type === "table"
    );
    expect(a81Tables).toHaveLength(4);
    expect(a81Tables.map((t) => t.rows.length)).toEqual([3, 3, 32, 7]);
    // [3 Building Groups, 3 Common Pitfalls, 32 Castle Lv.10-40 + Total Rows, 7 Brilliance B1-B6 + Total Rows]

    const a82Tables = collectAllBlocks(getArticleBySlug("infrastructure", "builder-queues-and-villagers")!).filter(
      (b): b is GuideTableBlock => b.type === "table"
    );
    expect(a82Tables).toHaveLength(4);
    expect(a82Tables.map((t) => t.rows.length)).toEqual([4, 2, 3, 14]);
    // [4 Builder Queues, 2 Stage Matrices, 3 Common Pitfalls, 14 Villager Skill Rows Lv.1-6]

    const a83Tables = collectAllBlocks(getArticleBySlug("infrastructure", "research-and-baiting")!).filter(
      (b): b is GuideTableBlock => b.type === "table"
    );
    expect(a83Tables).toHaveLength(3);
    expect(a83Tables.map((t) => t.rows.length)).toEqual([5, 3, 17]);
    // [5 Research Priority Tiers, 3 Common Pitfalls, 17 Dragon Essence Tech Cost Rows]

    const a84Tables = collectAllBlocks(getArticleBySlug("infrastructure", "master-data-tables")!).filter(
      (b): b is GuideTableBlock => b.type === "table"
    );
    expect(a84Tables).toHaveLength(12);
    expect(a84Tables.map((t) => t.rows.length)).toEqual([3, 5, 4, 7, 2, 18, 5, 10, 12, 18, 20, 16]);
    // [3 Star Tiers, 5 Awakening Tiers, 4 Enhancement Master Tiers, 7 Troop Tiers T5-T11, 2 Pitfalls,
    //  18 Faction Level Rows, 5 Mythic Gear Star Rows, 10 Lord Gear Rows, 12 Rune Rows, 18 Pet Rows,
    //  20 Troop Skin Cost Rows, 16 VIP 1-20 Rows]
  });

  it("eliminates all legacy v1 errors and preserves 100% v2.0 metrics independently in both 'vi' and 'en'", () => {
    const a81 = getArticleBySlug("infrastructure", "castle-and-brilliance")!;
    const a82 = getArticleBySlug("infrastructure", "builder-queues-and-villagers")!;
    const a83 = getArticleBySlug("infrastructure", "research-and-baiting")!;
    const a84 = getArticleBySlug("infrastructure", "master-data-tables")!;

    for (const locale of ["vi", "en"] as const) {
      const t81 = extractLocaleText(a81, locale);
      const t82 = extractLocaleText(a82, locale);
      const t83 = extractLocaleText(a83, locale);
      const t84 = extractLocaleText(a84, locale);

      // 1. Negative assertions: eradicate legacy v1 DE-Dust hallucinations (~18,500 & ~64,000+) & wrong Rune Friday claim
      expect(t81).not.toMatch(/18[.,]500\s*DE/i);
      expect(t81).not.toMatch(/64[.,]000\+?\s*DE/i);
      expect(t84).not.toMatch(/8\.37M/i);

      // 2. Article 8.1 (castle-and-brilliance): 3 Building Groups, Even/Odd Rule, 32-Row Castle Table, Lv.35 T10 Breakpoint & Brilliance B1-B6 (8,400 DE vs 5,422 DE T11)
      for (const kw of [
        "Training Ground",
        "Research Cottage",
        "Hospital",
        "Bard",
        "+40%",
        "Brawler",
        "+30%",
        "Shaman",
        "19,950",
        "22,800",
        "26.6M",
        "8.36M",
        "139M",
        "51.8M",
        "490M",
        "500M",
        "165M",
        "82M",
        "417M",
        "142.8M",
        "126",
        "630",
        "151",
        "755",
        "227",
        "1,135",
        "303",
        "1,515",
        "388",
        "1,940",
        "485",
        "2,425",
        "8,400",
        "1,238.8M",
        "4,931.8M",
        "745",
        "4,677",
        "5,422",
        "288",
      ]) {
        expect(t81, `8.1 (${locale}) missing metric/term: ${kw}`).toContain(kw);
      }

      // 3. Article 8.2 (builder-queues-and-villagers): 4 Builder Queues, Passive Economic Heroes, 14-Row Villagers Lv.1-6 Table & Gift Box Banking
      for (const kw of [
        "Bard",
        "Brawler",
        "Shaman",
        "Knight",
        "Hostess",
        "Ranger",
        "Rogue",
        "Outlaw",
        "Headhunter",
        "Stonemason",
        "Treeguard",
        "Minister",
        "Priestess",
        "Dancer",
        "+0.60%",
        "+3.20%",
        "40s",
        "360s",
        "432s",
        "160s",
        "+17.50%",
        "+5.60%",
        "+4.40%",
        "+13",
        "+2,100",
        "+57.50%",
        "+143.75%",
        "16,560s",
      ]) {
        expect(t82, `8.2 (${locale}) missing metric/term: ${kw}`).toContain(kw);
      }

      // 4. Article 8.3 (research-and-baiting): 5-Tier Tech Priority, Economy Bait, 3-Sec Formation Tank Baiting, Pre-Click Snapshot & 17-Row DE-Dust Tech Cost
      for (const kw of [
        "Arms Race Prep",
        "Commendation",
        "Extra Rewards",
        "Double Rewards",
        "200%",
        "Combat Expertise",
        "Peacekeeper",
        "Euclidean",
        "Desert Prince",
        "Wukong",
        "Storm Maiden",
        "Paragon",
        "Pyromancer",
        "Tidecaller",
        "Ne Zha",
        "Pixie",
        "Adjudicator",
        "Secretary of Science",
        "24 DE",
        "197",
        "394",
        "292",
        "584",
        "390",
        "193",
        "290",
        "580",
        "482",
        "1,158",
        "2,316",
        "770",
        "1,444",
        "2,888",
        "288",
        "4,677",
        "1,152",
        "461",
        "723",
        "374",
        "441",
        "95.3%",
        "36.6%",
        "24.8%",
      ]) {
        expect(t83, `8.3 (${locale}) missing metric/term: ${kw}`).toContain(kw);
      }

      // 5. Article 8.4 (master-data-tables): 12 SSoT Tables (4 Free Survival + 1 Pitfall + 7 PRO Master Quantitative Datasets)
      for (const kw of [
        "500",
        "1,000",
        "280",
        "560",
        "24,700",
        "8,000",
        "345",
        "385",
        "21,000",
        "60,000",
        "118,500",
        "195,000",
        "780,000",
        "4,680,000",
        "936,000",
        "5,422",
        "1,181.162M",
        "1,307",
        "+4,908",
        "+96,200",
        "+20.00%",
        "6,000",
        "500K",
        "1,185",
        "920",
        "958,800",
        "9,955",
        "2,030",
        "101",
        "+41.45%",
        "+113.95%",
        "+14.40%",
        "+20.75%",
        "+43.15%",
        "+38.00%",
        "+15,091",
        "+191,019",
        "+722,271",
        "+17,753",
        "+108,500",
        "+14,000",
        "596,600",
        "596,850",
        "3,525",
        "714,000",
        "40,050",
        "36.00%",
        "96.00%",
        "80,400",
        "40,200",
        "20,100",
        "948,400",
        "1,155,400",
        "4,259,400",
        "4,791,400",
        "10,960,400",
        "11,832,400",
        "20,845,400",
        "28,345,400",
        "14,172,700",
        "7,086,350",
        "+14.38%",
        "+21.46%",
        "+11.49%",
        "+19.24%",
        "$1.00",
        "$50.00",
        "$166.70",
        "$1,000.00",
        "$5,000.00",
        "$33,670.00",
        "200,000",
        "3,000,000",
        "$500,000.00",
        "250,000",
        "180,000",
        "156,000",
      ]) {
        expect(t84, `8.4 (${locale}) missing metric/term: ${kw}`).toContain(kw);
      }
    }
  });

  it("verifies cross-boundary & terminal navigation chain (7.4 -> 8.1 -> 8.2 -> 8.3 -> 8.4 -> null) and bilingual search indexability", () => {
    const adj74 = getAdjacentArticles("economy", "troop-skins-and-medals");
    expect(adj74.next?.categorySlug).toBe("infrastructure");
    expect(adj74.next?.slug).toBe("castle-and-brilliance");

    const adj81 = getAdjacentArticles("infrastructure", "castle-and-brilliance");
    expect(adj81.prev?.categorySlug).toBe("economy");
    expect(adj81.prev?.slug).toBe("troop-skins-and-medals");
    expect(adj81.next?.slug).toBe("builder-queues-and-villagers");

    const adj82 = getAdjacentArticles("infrastructure", "builder-queues-and-villagers");
    expect(adj82.prev?.slug).toBe("castle-and-brilliance");
    expect(adj82.next?.slug).toBe("research-and-baiting");

    const adj83 = getAdjacentArticles("infrastructure", "research-and-baiting");
    expect(adj83.prev?.slug).toBe("builder-queues-and-villagers");
    expect(adj83.next?.slug).toBe("master-data-tables");

    const adj84 = getAdjacentArticles("infrastructure", "master-data-tables");
    expect(adj84.prev?.slug).toBe("research-and-baiting");
    expect(adj84.next).toBeNull();

    // Verify searchGuides hits all 4 Group 8 routes in both vi and en under 50ms
    const start = performance.now();
    const hits81Vi = searchGuides("vien huy hoang", "vi");
    const hits81En = searchGuides("brilliance institute", "en");
    const hits82Vi = searchGuides("dan lang", "vi");
    const hits82En = searchGuides("gift box banking", "en");
    const hits83Vi = searchGuides("moi nhu pha tuyen", "vi");
    const hits83En = searchGuides("formation tank baiting", "en");
    const hits84Vi = searchGuides("bang so lieu", "vi");
    const hits84En = searchGuides("master data tables", "en");
    const elapsed = performance.now() - start;

    expect(elapsed).toBeLessThan(50);
    expect(hits81Vi.some((h) => h.slug === "castle-and-brilliance")).toBe(true);
    expect(hits81En.some((h) => h.slug === "castle-and-brilliance")).toBe(true);
    expect(hits82Vi.some((h) => h.slug === "builder-queues-and-villagers")).toBe(true);
    expect(hits82En.some((h) => h.slug === "builder-queues-and-villagers")).toBe(true);
    expect(hits83Vi.some((h) => h.slug === "research-and-baiting")).toBe(true);
    expect(hits83En.some((h) => h.slug === "research-and-baiting")).toBe(true);
    expect(hits84Vi.some((h) => h.slug === "master-data-tables")).toBe(true);
    expect(hits84En.some((h) => h.slug === "master-data-tables")).toBe(true);
  });

  it("enforces 100% Zero-Personalization Gate across all Group 8 articles and confirms 31 total standardized articles", () => {
    const category = getCategoryBySlug("infrastructure")!;
    const raw = JSON.stringify(category);
    const forbidden = [
      /\[GAS\]Max/i,
      /10956/,
      /10766/,
      /Tập đoàn/i,
      /Sếp/i,
      /acc của anh/i,
      /tài khoản của anh/i,
      /account của bạn/i,
      /acc của bạn/i,
      /nick của bạn/i,
      /cá nhân mình/i,
      /theo kinh nghiệm của mình/i,
      /Castle\s*40\b/i,
    ];
    for (const pattern of forbidden) {
      expect(raw).not.toMatch(pattern);
    }
    expect(getAllArticles()).toHaveLength(31);
  });
});

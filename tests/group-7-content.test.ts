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

describe("Track 4 Phase 3G: Group 7 (economy 7.1 -> 7.4) Standardized v2.0 Content & Schema Integrity", () => {
  it("resolves Group 7 category and all 4 standardized articles (7.1 -> 7.4)", () => {
    const category = getCategoryBySlug("economy");
    expect(category).toBeDefined();
    expect(category?.order).toBe(7);
    expect(category?.zoneId).toBe("zone_systems_economy");
    expect(category?.iconName).toBe("ShoppingBag");
    expect(category?.articles).toHaveLength(4);

    const expectedSlugs = [
      { code: "7.1", slug: "shops-tier-list" },
      { code: "7.2", slug: "guild-honor-freeze" },
      { code: "7.3", slug: "exchange-and-vip-shops" },
      { code: "7.4", slug: "troop-skins-and-medals" },
    ];

    for (const exp of expectedSlugs) {
      const article = getArticleBySlug("economy", exp.slug);
      expect(article, `Article ${exp.code} (${exp.slug}) must exist`).toBeDefined();
      expect(article?.code).toBe(exp.code);
      expect(article?.categorySlug).toBe("economy");
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
      expect(article?.keywords.length).toBeGreaterThanOrEqual(10);

      for (const freeSec of article!.freeSections) {
        expect(freeSec.isPro).toBeFalsy();
      }
      for (const proSec of article!.proSections) {
        expect(proSec.isPro).toBe(true);
      }
    }
  });

  it("enforces all 5 Rich RPG Blocks, all 16 Media Codes (MED-7.1-01 -> MED-7.4-04), nested component invariants & table column parity", () => {
    const articlesConfig = [
      {
        slug: "shops-tier-list",
        expectedMedia: ["MED-7.1-01", "MED-7.1-02", "MED-7.1-03", "MED-7.1-04"],
      },
      {
        slug: "guild-honor-freeze",
        expectedMedia: ["MED-7.2-01", "MED-7.2-02", "MED-7.2-03", "MED-7.2-04"],
      },
      {
        slug: "exchange-and-vip-shops",
        expectedMedia: ["MED-7.3-01", "MED-7.3-02", "MED-7.3-03", "MED-7.3-04"],
      },
      {
        slug: "troop-skins-and-medals",
        expectedMedia: ["MED-7.4-01", "MED-7.4-02", "MED-7.4-03", "MED-7.4-04"],
      },
    ];
    const seenChecklistIds = new Set<string>();

    for (const cfg of articlesConfig) {
      const article = getArticleBySlug("economy", cfg.slug)!;
      expect(article).toBeDefined();

      // Unique TOC anchors per article (sec.id + sub.id)
      const seenAnchorIds = new Set<string>();
      for (const sec of [...article.freeSections, ...article.proSections]) {
        expect(seenAnchorIds.has(sec.id), `Duplicate section id ${sec.id} in ${cfg.slug}`).toBe(false);
        expect(sec.id).toMatch(/^[a-z0-9-]+$/);
        seenAnchorIds.add(sec.id);
        for (const sub of sec.subSections ?? []) {
          expect(seenAnchorIds.has(sub.id), `Duplicate subSection id ${sub.id} in ${cfg.slug}`).toBe(false);
          expect(sub.id).toMatch(/^[a-z0-9-]+$/);
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
    }
  });

  it("enforces exact SSoT table row cardinality across 7.1 -> 7.4 so no quantitative table is truncated (Blindspot #9)", () => {
    const a71Tables = collectAllBlocks(getArticleBySlug("economy", "shops-tier-list")!).filter(
      (b): b is GuideTableBlock => b.type === "table"
    );
    expect(a71Tables).toHaveLength(3);
    expect(a71Tables.map((t) => t.rows.length)).toEqual([13, 4, 16]);
    // [13 In-Game Shops, 4 Common Pitfalls, 16 Diamond Equivalent ROI Matrix Items]

    const a72Tables = collectAllBlocks(getArticleBySlug("economy", "guild-honor-freeze")!).filter(
      (b): b is GuideTableBlock => b.type === "table"
    );
    expect(a72Tables).toHaveLength(3);
    expect(a72Tables.map((t) => t.rows.length)).toEqual([4, 5, 3]);
    // [4 Common Pitfalls, 5 Awakening Cost Rows (Tiers I-IV + Total), 3 Faction Soul Stone Budgets]

    const a73Tables = collectAllBlocks(getArticleBySlug("economy", "exchange-and-vip-shops")!).filter(
      (b): b is GuideTableBlock => b.type === "table"
    );
    expect(a73Tables).toHaveLength(3);
    expect(a73Tables.map((t) => t.rows.length)).toEqual([4, 16, 7]);
    // [4 Common Pitfalls, 16 VIP Progression Rows (VIP 1-15 + VIP 16-20), 7 Wheel/Dice/Gacha Priority Tiers]

    const a74Tables = collectAllBlocks(getArticleBySlug("economy", "troop-skins-and-medals")!).filter(
      (b): b is GuideTableBlock => b.type === "table"
    );
    expect(a74Tables).toHaveLength(3);
    expect(a74Tables.map((t) => t.rows.length)).toEqual([11, 4, 34]);
    // [11 Core Troop Skin Groups, 4 Common Pitfalls, 34 Glory Medal Cost Rows (Lv.1-50 + Honor Level 1-150)]
  });

  it("eliminates all legacy v1 errors and preserves 100% v2.0 metrics independently in both 'vi' and 'en'", () => {
    const a71 = getArticleBySlug("economy", "shops-tier-list")!;
    const a72 = getArticleBySlug("economy", "guild-honor-freeze")!;
    const a73 = getArticleBySlug("economy", "exchange-and-vip-shops")!;
    const a74 = getArticleBySlug("economy", "troop-skins-and-medals")!;

    for (const locale of ["vi", "en"] as const) {
      const t71 = extractLocaleText(a71, locale);
      const t72 = extractLocaleText(a72, locale);
      const t73 = extractLocaleText(a73, locale);
      const t74 = extractLocaleText(a74, locale);

      // 1. Negative assertions: eradicate legacy v1 errors (12-15 star Exchange Shop claim & Shaman awakening)
      expect(t71).not.toMatch(/đạt 12[–-]15 sao để mở tiệm/i);
      expect(t72).not.toContain("Shaman");

      // 2. Article 7.1 (shops-tier-list): 13 Shops, Weekly Safety Floor, 16-Row Diamond ROI Matrix
      for (const kw of [
        "Arena Shop",
        "Guild Points",
        "Medal Shop",
        "VIP Shop",
        "Exchange Shop",
        "Wheel",
        "Dice of Fate",
        "Kingdom Emblem",
        "1,900",
        "2,000",
        "12,000",
        "15,000",
        "40,000",
        "6,000",
        "600%",
        "300%",
        "1,500",
        "Soulmancer",
        "Warlock",
        "Pyromancer",
        "Adjudicator",
        "Pixie",
        "Orichalcum",
      ]) {
        expect(t71, `7.1 (${locale}) missing metric/term: ${kw}`).toContain(kw);
      }

      // 3. Article 7.2 (guild-honor-freeze): Dual Soul Stone Pricing (40k / 360k & 6k / 54k), 4 Awakening Tiers (9 Stones + 345-385 Shards), 3-Faction Budget & 12,000 Universal Troop Skin Trap
      for (const kw of [
        "40,000",
        "360,000",
        "6,000",
        "54,000",
        "720,000",
        "1,080,000",
        "108,000",
        "162,000",
        "55–65",
        "75–95",
        "85–95",
        "130",
        "345–385",
        "12,000",
        "Universal Legendary Troop Skin",
        "Soulmancer",
        "Warlock",
        "Pyromancer",
        "Adjudicator",
        "Pixie",
      ]) {
        expect(t72, `7.2 (${locale}) missing metric/term: ${kw}`).toContain(kw);
      }

      // 4. Article 7.3 (exchange-and-vip-shops): 15-Star Knight (500 vs 1,000 Shards), 12-Star Trait 3 (+30%), 300-600 Wheel/Dice Coins, VIP 1-20 ($1.00 -> $500k)
      for (const kw of [
        "500",
        "1,000",
        "+30%",
        "Deluxe Choice Chest",
        "100",
        "300",
        "600",
        "1,200",
        "2,400",
        "DE-Dust",
        "Solar Gold Ingot",
        "$1.00",
        "$50.00",
        "$166.70",
        "$1,000.00",
        "$5,000.00",
        "$33,670.00",
        "200,000",
        "3,000,000",
        "$500k",
        "42,000",
      ]) {
        expect(t73, `7.3 (${locale}) missing metric/term: ${kw}`).toContain(kw);
      }

      // 5. Article 7.4 (troop-skins-and-medals): 11 Troop Skin Groups, 4:2:1 Ratio, 34-Row Cost Table (Lv.10/20/30/40/50 + Honor Level 1-150) & 2.5M Case Study
      for (const kw of [
        "Heavy Cavalry",
        "Divine Spirit",
        "Desert Knight",
        "Tree Spirit",
        "Brave Fighter",
        "Skeleton Soldier",
        "Honor Guard",
        "Siege Vehicle",
        "Samurai",
        "Bearskin Warrior",
        "Logistic Follower",
        "Shield Soldier",
        "+14.38%",
        "+21.46%",
        "+11.49%",
        "+19.24%",
        "80,400",
        "40,200",
        "20,100",
        "948,400",
        "1,155,400",
        "474,200",
        "577,700",
        "4,259,400",
        "4,791,400",
        "10,960,400",
        "11,832,400",
        "20,845,400",
        "10,422,700",
        "5,211,350",
        "28,345,400",
        "14,172,700",
        "7,086,350",
        "2,411,200",
      ]) {
        expect(t74, `7.4 (${locale}) missing metric/term: ${kw}`).toContain(kw);
      }
    }
  });

  it("verifies cross-boundary navigation chain (6.3 -> 7.1 -> 7.2 -> 7.3 -> 7.4 -> 8.1) and bilingual search indexability", () => {
    const adj63 = getAdjacentArticles("power-systems", "pets-and-behemoth");
    expect(adj63.next?.categorySlug).toBe("economy");
    expect(adj63.next?.slug).toBe("shops-tier-list");

    const adj71 = getAdjacentArticles("economy", "shops-tier-list");
    expect(adj71.prev?.categorySlug).toBe("power-systems");
    expect(adj71.prev?.slug).toBe("pets-and-behemoth");
    expect(adj71.next?.slug).toBe("guild-honor-freeze");

    const adj72 = getAdjacentArticles("economy", "guild-honor-freeze");
    expect(adj72.prev?.slug).toBe("shops-tier-list");
    expect(adj72.next?.slug).toBe("exchange-and-vip-shops");

    const adj73 = getAdjacentArticles("economy", "exchange-and-vip-shops");
    expect(adj73.prev?.slug).toBe("guild-honor-freeze");
    expect(adj73.next?.slug).toBe("troop-skins-and-medals");

    const adj74 = getAdjacentArticles("economy", "troop-skins-and-medals");
    expect(adj74.prev?.slug).toBe("exchange-and-vip-shops");
    expect(adj74.next?.categorySlug).toBe("infrastructure");
    expect(adj74.next?.slug).toBe("castle-and-brilliance");

    // Verify searchGuides hits all 4 Group 7 routes in both vi and en under 50ms
    const start = performance.now();
    const hits71Vi = searchGuides("cua hang dau truong", "vi");
    const hits71En = searchGuides("arena shop", "en");
    const hits72Vi = searchGuides("hon da do", "vi");
    const hits72En = searchGuides("soul stone", "en");
    const hits73Vi = searchGuides("tiem doi manh", "vi");
    const hits73En = searchGuides("deluxe choice chest", "en");
    const hits74Vi = searchGuides("huy chuong vinh quang", "vi");
    const hits74En = searchGuides("heavy cavalry", "en");
    const elapsed = performance.now() - start;

    expect(elapsed).toBeLessThan(50);
    expect(hits71Vi.some((h) => h.slug === "shops-tier-list")).toBe(true);
    expect(hits71En.some((h) => h.slug === "shops-tier-list")).toBe(true);
    expect(hits72Vi.some((h) => h.slug === "guild-honor-freeze")).toBe(true);
    expect(hits72En.some((h) => h.slug === "guild-honor-freeze")).toBe(true);
    expect(hits73Vi.some((h) => h.slug === "exchange-and-vip-shops")).toBe(true);
    expect(hits73En.some((h) => h.slug === "exchange-and-vip-shops")).toBe(true);
    expect(hits74Vi.some((h) => h.slug === "troop-skins-and-medals")).toBe(true);
    expect(hits74En.some((h) => h.slug === "troop-skins-and-medals")).toBe(true);
  });

  it("enforces 100% Zero-Personalization Gate across all Group 7 articles", () => {
    const category = getCategoryBySlug("economy")!;
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

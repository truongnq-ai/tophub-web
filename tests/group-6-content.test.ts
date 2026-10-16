import { describe, expect, it } from "vitest";
import {
  getAdjacentArticles,
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

describe("Track 4 Phase 3F: Group 6 (power-systems) Standardized v2.0 Content & Schema Integrity", () => {
  it("resolves Group 6 category and all 3 standardized articles (6.1 -> 6.3)", () => {
    const category = getCategoryBySlug("power-systems");
    expect(category).toBeDefined();
    expect(category?.order).toBe(6);
    expect(category?.zoneId).toBe("zone_systems_economy");
    expect(category?.iconName).toBe("Sparkles");
    expect(category?.articles).toHaveLength(3);

    const expectedSlugs = [
      { code: "6.1", slug: "runes-guide" },
      { code: "6.2", slug: "relics-guide" },
      { code: "6.3", slug: "pets-and-behemoth" },
    ];

    for (const exp of expectedSlugs) {
      const article = getArticleBySlug("power-systems", exp.slug);
      expect(article, `Article ${exp.code} (${exp.slug}) must exist`).toBeDefined();
      expect(article?.code).toBe(exp.code);
      expect(["FREE", "HOT", "PRO"]).toContain(article?.badge);
      expect(article?.tldr).toBeDefined();
      expect(article!.tldr!.coreRule.vi.trim().length).toBeGreaterThan(20);
      expect(article!.tldr!.coreRule.en.trim().length).toBeGreaterThan(20);
      expect(article!.tldr!.immediateAction.vi.trim().length).toBeGreaterThan(20);
      expect(article!.tldr!.immediateAction.en.trim().length).toBeGreaterThan(20);
      expect(article!.tldr!.strictTaboo.vi.trim().length).toBeGreaterThan(20);
      expect(article!.tldr!.strictTaboo.en.trim().length).toBeGreaterThan(20);
      expect(article!.keyTakeaways.length).toBeGreaterThanOrEqual(3);
      for (const kt of article!.keyTakeaways) {
        expect(kt.vi.trim().length).toBeGreaterThan(20);
        expect(kt.en.trim().length).toBeGreaterThan(20);
      }
      expect(article?.freeSections).toHaveLength(3);
      expect(article?.proSections).toHaveLength(2);
      expect(article?.sourceFiles.length).toBeGreaterThanOrEqual(2);
      expect(article?.keywords.length).toBeGreaterThanOrEqual(10);

      for (const freeSec of article!.freeSections) {
        expect(freeSec.isPro).toBeFalsy();
      }
      for (const proSec of article!.proSections) {
        expect(proSec.isPro).toBe(true);
      }
    }
  });

  it("enforces all 5 Rich RPG Blocks, all 12 Media Codes (MED-6.1-01 -> MED-6.3-04), nested component invariants & table column parity", () => {
    const articlesConfig = [
      {
        slug: "runes-guide",
        expectedMedia: ["MED-6.1-01", "MED-6.1-02", "MED-6.1-03", "MED-6.1-04"],
      },
      {
        slug: "relics-guide",
        expectedMedia: ["MED-6.2-01", "MED-6.2-02", "MED-6.2-03", "MED-6.2-04"],
      },
      {
        slug: "pets-and-behemoth",
        expectedMedia: ["MED-6.3-01", "MED-6.3-02", "MED-6.3-03", "MED-6.3-04"],
      },
    ];
    const seenChecklistIds = new Set<string>();

    for (const cfg of articlesConfig) {
      const article = getArticleBySlug("power-systems", cfg.slug)!;
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
        expect(tbl.headers.length).toBeGreaterThanOrEqual(4);
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

      // Validate CaseStudyBlock non-empty recoverySteps & diagnostics
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

      // Validate MediaSpotlightBlock tier, LocalizedText title/description & string videoTitle (Blindspot #12)
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

  it("enforces exact SSoT table row cardinality across 6.1 -> 6.3 so no quantitative table is truncated (Blindspot #9)", () => {
    const a61Tables = collectAllBlocks(getArticleBySlug("power-systems", "runes-guide")!).filter(
      (b): b is GuideTableBlock => b.type === "table"
    );
    expect(a61Tables).toHaveLength(4);
    expect(a61Tables.map((t) => t.rows.length)).toEqual([6, 8, 12, 2]);
    // [6 Rune Slots, 8 Merging Cost Levels Lv.1->Lv.8, 12 Stat Levels Lv.1->Lv.12, 2 Event Dump Items]

    const a62Tables = collectAllBlocks(getArticleBySlug("power-systems", "relics-guide")!).filter(
      (b): b is GuideTableBlock => b.type === "table"
    );
    expect(a62Tables).toHaveLength(4);
    expect(a62Tables.map((t) => t.rows.length)).toEqual([3, 3, 20, 6]);
    // [3 Relic Slots, 3 Faction BiS Loadouts, 20 Star Levels (4 Tiers x 5 Stars), 6 Event Scoring Actions]

    const a63Tables = collectAllBlocks(getArticleBySlug("power-systems", "pets-and-behemoth")!).filter(
      (b): b is GuideTableBlock => b.type === "table"
    );
    expect(a63Tables).toHaveLength(4);
    expect(a63Tables.map((t) => t.rows.length)).toEqual([3, 19, 14, 6]);
    // [3 Faction Pet Rosters, 19 Pet Promotion Milestones Lv.1->Lv.120, 14 Behemoth Milestones Lv.1->Lv.150, 6 Event Scoring Actions]
  });

  it("eliminates all 3 legacy v1 event/data errors and preserves 100% v2.0 metrics independently in both 'vi' and 'en'", () => {
    const a61 = getArticleBySlug("power-systems", "runes-guide")!;
    const a62 = getArticleBySlug("power-systems", "relics-guide")!;
    const a63 = getArticleBySlug("power-systems", "pets-and-behemoth")!;

    for (const locale of ["vi", "en"] as const) {
      const t61 = extractLocaleText(a61, locale);
      const t62 = extractLocaleText(a62, locale);
      const t63 = extractLocaleText(a63, locale);

      // 1. Negative assertions: Runes must NEVER say dump on Friday of Week B; Relics must NEVER say dump on Thursday of Week B
      expect(t61).not.toMatch(/xả đúng Thứ 6 của Tuần B/i);
      expect(t61).not.toMatch(/merge on Friday of Week B/i);
      expect(t62).not.toMatch(/xả vào Ngày Thứ 5 của Tuần B/i);
      expect(t62).not.toMatch(/for Thursday of Week B/i);
      expect(t62).not.toMatch(/Thứ Năm của Tuần B/i);

      // 1b. Semantic disambiguation assertions (Blindspot #14):
      // 6.2 must explicitly clarify standard GAR Day 5 does NOT score Relics (only KvK adds Day 5)
      if (locale === "vi") {
        expect(t62).toMatch(/GAR.*không tính điểm.*Ngày 5/i);
        expect(t63).toMatch(/Cactini.*Thiên Nhiên/i);
      } else {
        expect(t62).toMatch(/GAR.*does NOT score.*Day 5/i);
        expect(t63).toMatch(/Cactini.*Nature/i);
      }

      // 2. Article 6.1 (Runes Lv.1-12): 6 Slots, 3^(n-1) Merging, Lv.1-12 Stats, Combat Skill Level +1/+2 & Tuesday Day 2 Dump
      for (const kw of [
        "Hero HP Rune",
        "Hero Attack Rune",
        "Soldier HP Rune",
        "Soldier Attack Rune",
        "Relic Mastery Rune",
        "Queue Attack Rune",
        "81",
        "243",
        "729",
        "2,187",
        "8,000",
        "48,000",
        "25,000",
        "150,000",
        "225,000",
        "1,350,000",
        "15,091",
        "40,616",
        "191,019",
        "722,271",
        "371",
        "999",
        "4,696",
        "17,753",
        "28,660",
        "108,500",
        "3,845",
        "6,922",
        "14,000",
        "Combat Skill Level",
        "3,000",
        "5,000",
        "600",
        "1,200",
        "Arcane Crystal",
      ]) {
        expect(t61, `6.1 (${locale}) missing metric/term: ${kw}`).toContain(kw);
      }

      // 3. Article 6.2 (Relics Trio): -50% Star Rating Suppression, Owned Passive Stats, 3-Faction BiS, +1s vs Sustain, 20-Star Table & Day 1-2 Dump
      for (const kw of [
        "-50%",
        "4,810",
        "3,130",
        "1,800",
        "+6.00%",
        "+12.00%",
        "+20.00%",
        "+40.00%",
        "130",
        "330",
        "490",
        "1,100",
        "Thunder Judgment",
        "Dragonheart",
        "Dragonbone Amulet",
        "Petrification Staff",
        "Soul Guard Orb",
        "Feather of the Pact",
        "Vineborne Bow",
        "Undefeated Crown",
        "Sacred Scroll",
        "Frost Diadem",
        "Duke's Signet Ring",
        "Scale of Injustice",
        "Eternal Wings",
        "Moonstone",
        "1,500",
        "5,000",
        "Guild Rush",
      ]) {
        expect(t62, `6.2 (${locale}) missing metric/relic: ${kw}`).toContain(kw);
      }

      // 4. Article 6.3 (Pets & Behemoth): 3x Faction Bonus, 3-Faction Roster, 19-Row Pet Table (596,600 vs 714,000), 14-Row Behemoth Table (6,346 Seals)
      for (const kw of [
        "36.00%",
        "60.00%",
        "84.00%",
        "96.00%",
        "104.00%",
        "Eggy",
        "Sparrow",
        "Tiggy",
        "Howli",
        "Flickerkit",
        "Cactini",
        "Bear",
        "Candy Boo",
        "98,550",
        "368,600",
        "596,600",
        "596,850",
        "3,525",
        "714,000",
        "40,050",
        "44",
        "161",
        "58",
        "211",
        "+35.70%",
        "+52.50%",
        "+66.30%",
        "+97.50%",
        "+81.60%",
        "+120.00%",
        "5,880",
        "1,500",
        "750",
        "3,500",
        "6,080",
        "6,346",
        "4,648,680",
        "69,000",
        "210.00%",
        "630.00%",
        "15.00%",
        "175.00%",
        "960",
        "36,000",
        "2,000",
      ]) {
        expect(t63, `6.3 (${locale}) missing metric/pet: ${kw}`).toContain(kw);
      }
    }
  });

  it("verifies cross-boundary navigation chain (5.4 -> 6.1 -> 6.2 -> 6.3 -> 7.1) and bilingual search indexability", () => {
    const adj54 = getAdjacentArticles("gear", "lord-gear-strategy");
    expect(adj54.next?.categorySlug).toBe("power-systems");
    expect(adj54.next?.slug).toBe("runes-guide");

    const adj61 = getAdjacentArticles("power-systems", "runes-guide");
    expect(adj61.prev?.categorySlug).toBe("gear");
    expect(adj61.prev?.slug).toBe("lord-gear-strategy");
    expect(adj61.next?.slug).toBe("relics-guide");

    const adj62 = getAdjacentArticles("power-systems", "relics-guide");
    expect(adj62.prev?.slug).toBe("runes-guide");
    expect(adj62.next?.slug).toBe("pets-and-behemoth");

    const adj63 = getAdjacentArticles("power-systems", "pets-and-behemoth");
    expect(adj63.prev?.slug).toBe("relics-guide");
    expect(adj63.next?.categorySlug).toBe("economy");
    expect(adj63.next?.slug).toBe("shops-tier-list");

    // Verify searchGuides hits all 3 Group 6 routes in both vi and en under 50ms
    const start = performance.now();
    const hits61Vi = searchGuides("co ngu", "vi");
    const hits61Skill = searchGuides("combat skill level", "en");
    const hits62Vi = searchGuides("ap che sao", "vi");
    const hits62En = searchGuides("star rating suppression", "en");
    const hits63Vi = searchGuides("cu thu", "vi");
    const hits63En = searchGuides("covenant seals", "en");
    const elapsed = performance.now() - start;

    expect(elapsed).toBeLessThan(50);
    expect(hits61Vi.some((h) => h.slug === "runes-guide")).toBe(true);
    expect(hits61Skill.some((h) => h.slug === "runes-guide")).toBe(true);
    expect(hits62Vi.some((h) => h.slug === "relics-guide")).toBe(true);
    expect(hits62En.some((h) => h.slug === "relics-guide")).toBe(true);
    expect(hits63Vi.some((h) => h.slug === "pets-and-behemoth")).toBe(true);
    expect(hits63En.some((h) => h.slug === "pets-and-behemoth")).toBe(true);
  });

  it("enforces 100% Zero-Personalization Gate across all Group 6 articles", () => {
    const category = getCategoryBySlug("power-systems")!;
    const raw = JSON.stringify(category);
    const forbidden = [
      /Tập đoàn/i,
      /Kịch bản/i,
      /Sếp/i,
      /chúng ta/i,
      /các bạn/i,
      /\bVIP\s*9\b/i,
      /Castle\s*40\b/i,
    ];
    for (const pattern of forbidden) {
      expect(raw).not.toMatch(pattern);
    }
  });
});

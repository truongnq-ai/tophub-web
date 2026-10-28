import { describe, it, expect } from "vitest";
import {
  getCategoryBySlug,
  getArticleBySlug,
  getAdjacentArticles,
  searchGuides,
} from "../src/content/guides/registry";
import type {
  GuideArticle,
  GuideContentBlock,
  GuideTableBlock,
  GuideVisualDiagramBlock,
  GuideCaseStudyBlock,
  GuideChecklistBlock,
  GuideMediaSpotlightBlock,
  GuideLocale,
} from "../src/content/guides/types";

/**
 * Helper trích xuất đệ quy toàn bộ văn bản của 1 bài viết THEO TỪNG NGÔN NGỮ ĐỘC LẬP (`vi` hoặc `en`)
 * để đảm bảo không bỏ sót dịch thuật số liệu ở bất kỳ ngôn ngữ nào (Vá Điểm Mù #3).
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

describe("Track 4 Phase 3E: Group 5 (gear) Standardized v2.0 Content & Schema Integrity", () => {
  it("resolves Group 5 category and all 4 standardized articles (5.1 -> 5.4)", () => {
    const category = getCategoryBySlug("gear");
    expect(category).toBeDefined();
    expect(category?.order).toBe(5);
    expect(category?.zoneId).toBe("zone_systems_economy");
    expect(category?.articles).toHaveLength(4);

    const expectedSlugs = [
      { code: "5.1", slug: "gear-overview" },
      { code: "5.2", slug: "golden-gear-sets" },
      { code: "5.3", slug: "enhancement-and-mythic" },
      { code: "5.4", slug: "lord-gear-strategy" },
    ];

    for (const exp of expectedSlugs) {
      const article = getArticleBySlug("gear", exp.slug);
      expect(article, `Article ${exp.code} (${exp.slug}) must exist`).toBeDefined();
      expect(article?.code).toBe(exp.code);
      expect(["FREE", "HOT", "PRO"]).toContain(article?.badge);
      expect(article?.tldr).toBeDefined();
      expect(article?.freeSections).toHaveLength(3);
      expect(article?.proSections).toHaveLength(2);
      expect(article?.sourceFiles.length).toBeGreaterThanOrEqual(2);
      expect(article?.keywords.length).toBeGreaterThanOrEqual(10);

      // Verify all proSections have isPro === true and all freeSections do not
      for (const freeSec of article!.freeSections) {
        expect(freeSec.isPro).toBeFalsy();
      }
      for (const proSec of article!.proSections) {
        expect(proSec.isPro).toBe(true);
      }
    }
  });

  it("enforces all 5 Rich RPG Blocks, nested component invariants, unique TOC anchors & table column parity across 5.1 -> 5.4", () => {
    const slugs = [
      "gear-overview",
      "golden-gear-sets",
      "enhancement-and-mythic",
      "lord-gear-strategy",
    ];
    const seenChecklistIds = new Set<string>();

    for (const slug of slugs) {
      const article = getArticleBySlug("gear", slug)!;
      expect(article).toBeDefined();

      // Unique TOC anchors per article (sec.id + sub.id)
      const seenAnchorIds = new Set<string>();
      for (const sec of [...article.freeSections, ...article.proSections]) {
        expect(seenAnchorIds.has(sec.id), `Duplicate section id ${sec.id} in ${slug}`).toBe(false);
        seenAnchorIds.add(sec.id);
        for (const sub of sec.subSections ?? []) {
          expect(seenAnchorIds.has(sub.id), `Duplicate subSection id ${sub.id} in ${slug}`).toBe(false);
          seenAnchorIds.add(sub.id);
        }
      }

      const allBlocks = collectAllBlocks(article);
      const blockTypes = new Set(allBlocks.map((b) => b.type));

      expect(blockTypes.has("visual_diagram"), `${slug} missing visual_diagram`).toBe(true);
      expect(blockTypes.has("checklist"), `${slug} missing checklist`).toBe(true);
      expect(blockTypes.has("case_study"), `${slug} missing case_study`).toBe(true);
      expect(blockTypes.has("media_spotlight"), `${slug} missing media_spotlight`).toBe(true);
      expect(blockTypes.has("table"), `${slug} missing table`).toBe(true);

      // Validate Table Column Parity & Minimum Row Count (Blindspot #4)
      const tables = allBlocks.filter((b): b is GuideTableBlock => b.type === "table");
      for (const tbl of tables) {
        expect(tbl.headers.length).toBeGreaterThanOrEqual(3);
        expect(tbl.rows.length).toBeGreaterThanOrEqual(2);
        for (const row of tbl.rows) {
          expect(
            row.length,
            `Table row column mismatch in ${slug}: expected ${tbl.headers.length}, got ${row.length}`
          ).toBe(tbl.headers.length);
          for (const cell of row) {
            expect(cell.vi.trim().length).toBeGreaterThan(0);
            expect(cell.en.trim().length).toBeGreaterThan(0);
          }
        }
      }

      // Validate VisualDiagramBlock nested invariants (Blindspot #6 & #11)
      const diagrams = allBlocks.filter(
        (b): b is GuideVisualDiagramBlock => b.type === "visual_diagram"
      );
      for (const diag of diagrams) {
        expect(diag.title.vi.trim().length).toBeGreaterThan(5);
        expect(diag.title.en.trim().length).toBeGreaterThan(5);
        const hasNodesOrBranches =
          (diag.nodes?.length ?? 0) > 0 || (diag.branches?.length ?? 0) > 0;
        expect(hasNodesOrBranches, `${slug} visual_diagram must have nodes or branches`).toBe(true);

        const seenNodeIds = new Set<string>();
        for (const node of diag.nodes ?? []) {
          expect(seenNodeIds.has(node.id), `Duplicate node.id ${node.id} in ${slug}`).toBe(false);
          seenNodeIds.add(node.id);
        }
        for (const br of diag.branches ?? []) {
          expect(["emerald", "rose", "gold"]).toContain(br.tone);
          expect(br.steps.length).toBeGreaterThanOrEqual(1);
          for (const step of br.steps) {
            expect(seenNodeIds.has(step.id), `Duplicate step.id ${step.id} in ${slug}`).toBe(false);
            seenNodeIds.add(step.id);
          }
        }
      }

      // Validate ChecklistBlock uniqueness & item IDs (Blindspot #6)
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

      // Validate CaseStudyBlock non-empty recoverySteps & diagnostics (Blindspot #6)
      const caseStudies = allBlocks.filter(
        (b): b is GuideCaseStudyBlock => b.type === "case_study"
      );
      for (const cs of caseStudies) {
        expect(cs.recoverySteps.length).toBeGreaterThanOrEqual(2);
        expect(cs.profileSummary.vi.trim().length).toBeGreaterThan(10);
        expect(cs.profileSummary.en.trim().length).toBeGreaterThan(10);
      }

      // Validate MediaSpotlightBlock tier & annotations (Blindspot #6)
      const spotlights = allBlocks.filter(
        (b): b is GuideMediaSpotlightBlock => b.type === "media_spotlight"
      );
      for (const sp of spotlights) {
        expect(sp.tier).not.toBe("tier1_faction_loop");
        if (sp.tier === "tier2_annotated_ui") {
          expect(sp.annotations?.length ?? 0).toBeGreaterThanOrEqual(2);
        }
        if (sp.videoUrl) {
          expect(sp.videoUrl.startsWith("https://")).toBe(true);
        }
      }
    }
  });

  it("enforces exact SSoT table row cardinality across 5.1 -> 5.4 so no table is truncated (Blindspot #9)", () => {
    const a51Tables = collectAllBlocks(getArticleBySlug("gear", "gear-overview")!).filter(
      (b): b is GuideTableBlock => b.type === "table"
    );
    expect(a51Tables).toHaveLength(2);
    expect(a51Tables[0].rows).toHaveLength(5); // 5 comparison criteria across 3 equipment systems
    expect(a51Tables[1].rows).toHaveLength(4); // 4 player demand/pitfall scenarios

    const a52Tables = collectAllBlocks(getArticleBySlug("gear", "golden-gear-sets")!).filter(
      (b): b is GuideTableBlock => b.type === "table"
    );
    expect(a52Tables).toHaveLength(3);
    expect(a52Tables.map((t) => t.rows.length)).toEqual([6, 8, 10]); // 6 Tanks + 8 Carries + 10 Supports = 24 heroes

    const a53Tables = collectAllBlocks(getArticleBySlug("gear", "enhancement-and-mythic")!).filter(
      (b): b is GuideTableBlock => b.type === "table"
    );
    expect(a53Tables).toHaveLength(4);
    expect(a53Tables[0].rows).toHaveLength(4); // Lv.0->+10, Lv.11->+20, Lv.21->+30, Lv.31->+40
    expect(a53Tables[1].rows).toHaveLength(6); // 1★, 2★, 3★, 4★, 5★ Mythic + Total 0★->5★ row
    expect(a53Tables[2].rows).toHaveLength(20); // All 20 Exclusive Weapon levels (Lv.1 -> Lv.20)
    expect(a53Tables[3].rows).toHaveLength(5); // All 5 Exclusive Weapon Star levels (1★ -> 5★ = 920 Meteoric Iron Cores)

    const a54Tables = collectAllBlocks(getArticleBySlug("gear", "lord-gear-strategy")!).filter(
      (b): b is GuideTableBlock => b.type === "table"
    );
    expect(a54Tables).toHaveLength(2);
    expect(a54Tables[0].rows).toHaveLength(2); // Left Branch (LEFT) vs Right Branch (RIGHT)
    expect(a54Tables[1].rows).toHaveLength(14); // 13 tier milestones (G1 -> R4 Mythic T1 3★) + 1 Total 102-step row
  });

  it("eliminates all 4 legacy v1 gear errors and preserves 100% v2.0 metrics independently in both 'vi' and 'en'", () => {
    const a51 = getArticleBySlug("gear", "gear-overview")!;
    const a52 = getArticleBySlug("gear", "golden-gear-sets")!;
    const a53 = getArticleBySlug("gear", "enhancement-and-mythic")!;
    const a54 = getArticleBySlug("gear", "lord-gear-strategy")!;

    for (const locale of ["vi", "en"] as const) {
      const t51 = extractLocaleText(a51, locale);
      const t52 = extractLocaleText(a52, locale);
      const t53 = extractLocaleText(a53, locale);
      const t54 = extractLocaleText(a54, locale);

      // 1. Negative assertions: Brawler / Đấu Sĩ must NEVER be recommended for Exclusive Weapon Lv.10 or Fury of Blood DPS Carry
      for (const text of [t51, t52, t53, t54]) {
        expect(text).not.toMatch(/Vũ khí Độc quyền Lv\.10 cho Đấu Sĩ/i);
        expect(text).not.toMatch(/Lv\.10 Exclusive Weapons for Brawler/i);
        expect(text).not.toMatch(/Sát thương chủ lực \(Đấu Sĩ/i);
        expect(text).not.toMatch(/DPS carries \(Brawler/i);
      }

      // 2. Article 5.1: 3 Equipment Systems & Event Scoring Rules (0 Points vs High Points) + Brawler Epic clarity
      for (const kw of [
        "0",
        "Lv.40",
        "1★",
        "5★",
        "275",
        "1,185",
        "920",
        "Brawler",
        "+30%",
      ]) {
        expect(t51, `5.1 (${locale}) missing metric: ${kw}`).toContain(kw);
      }

      // 3. Article 5.2: 3 Golden Gear Sets, +30% Faction Mark, 3 Independent Bonus Layers & 24 Heroes BiS Matrix
      for (const kw of [
        "Knight Set",
        "Titan's Might",
        "Duelist's Set",
        "Fury of Blood",
        "Sage Set",
        "Glorious Light",
        "Blood of the Titan",
        "Glory of the Sage",
        "Knight's Glory",
        "+160%",
        "+6%",
        "+40%",
        "+80%",
        "+8%",
        "+30%",
        "750",
        "3,000",
        "18,000",
        "Adjudicator",
        "Rose Princess",
        "Desert Prince",
        "Beastmaster",
        "Monk",
        "Sage",
        "Paragon",
        "Pyromancer",
        "Wukong",
        "Storm Maiden",
        "Wilderness Hunter",
        "Tidecaller",
        "Ne Zha",
        "Pixie",
        "Nun",
        "Bishop",
        "Artificer",
        "Bard",
        "Witch",
        "Soulmancer",
        "Warlock",
        "Shadow Priest",
        "Forest Maiden",
        "Petalis",
      ]) {
        expect(t52, `5.2 (${locale}) missing metric/hero: ${kw}`).toContain(kw);
      }

      if (locale === "vi") {
        for (const viOfficialName of [
          "Bộ Kỵ Sĩ",
          "Bộ Đồ Titan",
          "Bộ Đồ Quyết Đấu",
          "Cơn Thịnh Nộ",
          "Bộ Hiền Giả",
          "Ánh Sáng Vinh Quang",
          "Thẩm Phán Quan",
          "Công Chúa Hoa Hồng",
          "Bậc Thầy Thú",
          "Thánh Tăng",
          "Đấng Toàn Năng",
          "Hoả Pháp Sư",
          "Ngộ Không",
          "Trinh Nữ Bão Tố",
          "Triệu Hồi Thủy",
          "Hồ Tiên",
          "Tu Nữ",
          "Bậc Thầy Cơ Khí",
          "Vu Nữ",
          "Thuật Sĩ",
          "Hồn Pháp Sư",
          "Giáo Sĩ Bóng Tối",
          "Thiếu Nữ Rừng Xanh",
          "Hoa Tiên",
        ]) {
          expect(t52, `5.2 (vi) missing official In-Game name: ${viOfficialName}`).toContain(
            viOfficialName
          );
        }
      }

      // 4. Article 5.3: Lv.0->+40 Enhancement, 1★->5★ Mythic Promotion, Exclusive Weapon Lv.1->Lv.20, 3-Faction UW Priority & Star Level 1★->5★
      for (const kw of [
        "21,000",
        "100,800",
        "504,000",
        "+5,900",
        "+74,000",
        "60,000",
        "288,000",
        "118,500",
        "568,800",
        "195,000",
        "936,000",
        "780,000",
        "3,744,000",
        "4,680,000",
        "22,464,000",
        "62,500",
        "81,250",
        "100,000",
        "118,750",
        "137,500",
        "1,650",
        "6,000",
        "500,000",
        "23,980,000",
        "575.52M",
        "275",
        "500",
        "605",
        "1,160",
        "1,035",
        "1,185",
        "1,850",
        "-2.30%",
        "+18.50%",
        "+37.00%",
        "7,110",
        "920",
        "Wukong",
        "Storm Maiden",
        "Desert Prince",
        "Beastmaster",
        "Witch",
        "Soulmancer",
        "Warlock",
        "Paragon",
        "Pyromancer",
        "Rose Princess",
        "Adjudicator",
        "Bishop",
        "Artificer",
        "Nun",
        "Tidecaller",
        "Ne Zha",
        "Monk",
        "Pixie",
        "Petalis",
        "Forest Maiden",
      ]) {
        expect(t53, `5.3 (${locale}) missing metric/hero: ${kw}`).toContain(kw);
      }

      // 5. Article 5.4: Lord Gear Left/Right Split (Tab Аркуш23), 4-Step Smart Staggered Upgrade, S3 Unlocks & 102-Step Cost Table
      for (const kw of [
        "+41.45%",
        "+113.95%",
        "+14.40%",
        "+18.70%",
        "+38.90%",
        "+34.25%",
        "+20.75%",
        "+43.15%",
        "+38.00%",
        "958,800",
        "9,955",
        "2,030",
        "101",
        "175",
        "1,050",
        "5,752,800",
        "59,730",
        "12,180",
        "606",
        "Sacred Codex",
      ]) {
        expect(t54, `5.4 (${locale}) missing metric: ${kw}`).toContain(kw);
      }
    }
  });

  it("verify cross-boundary navigation chain (4.3 -> 5.1 -> 5.2 -> 5.3 -> 5.4 -> 6.1) and bilingual search indexability", () => {
    const adj43 = getAdjacentArticles("roadmap", "season-1-to-4-roadmap");
    expect(adj43.next?.categorySlug).toBe("gear");
    expect(adj43.next?.slug).toBe("gear-overview");

    const adj51 = getAdjacentArticles("gear", "gear-overview");
    expect(adj51.prev?.slug).toBe("season-1-to-4-roadmap");
    expect(adj51.next?.slug).toBe("golden-gear-sets");

    const adj52 = getAdjacentArticles("gear", "golden-gear-sets");
    expect(adj52.prev?.slug).toBe("gear-overview");
    expect(adj52.next?.slug).toBe("enhancement-and-mythic");

    const adj53 = getAdjacentArticles("gear", "enhancement-and-mythic");
    expect(adj53.prev?.slug).toBe("golden-gear-sets");
    expect(adj53.next?.slug).toBe("lord-gear-strategy");

    const adj54 = getAdjacentArticles("gear", "lord-gear-strategy");
    expect(adj54.prev?.slug).toBe("enhancement-and-mythic");
    expect(adj54.next?.categorySlug).toBe("power-systems");
    expect(adj54.next?.slug).toBe("runes-guide");

    // Verify searchGuides hits all 4 Group 5 routes in both vi and en
    expect(searchGuides("huyết titan", "vi").some((a) => a.slug === "golden-gear-sets")).toBe(true);
    expect(searchGuides("blood of the titan", "en").some((a) => a.slug === "golden-gear-sets")).toBe(true);
    expect(searchGuides("bậc thầy cường hóa", "vi").some((a) => a.slug === "enhancement-and-mythic")).toBe(true);
    expect(searchGuides("meteoric iron", "en").some((a) => a.slug === "enhancement-and-mythic")).toBe(true);
    expect(searchGuides("lệch pha thông minh", "vi").some((a) => a.slug === "lord-gear-strategy")).toBe(true);
    expect(searchGuides("sacred codex", "en").some((a) => a.slug === "lord-gear-strategy")).toBe(true);
  });
});

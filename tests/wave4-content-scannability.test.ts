import { describe, expect, it } from "vitest";
import {
  getAllCategories,
  getArticleBySlug,
  searchGuides,
} from "../src/content/guides/registry";
import type {
  GuideArticle,
  GuideContentBlock,
  GuideLocale,
  VisualDiagramNode,
} from "../src/content/guides/types";

const WAVE4_CATEGORIES = getAllCategories().filter(
  (c) => c.order >= 5 && c.order <= 8
);
const WAVE4_ARTICLES: GuideArticle[] = WAVE4_CATEGORIES.flatMap(
  (c) => c.articles
);
const LOCALES: GuideLocale[] = ["vi", "en"];

// Matches any color/pictographic emoji OR orphaned ZWJ/Variation Selector/gender symbol while allowing monochrome star '★' (\u2605)
const FORBIDDEN_EMOJI_REGEX =
  /(?!\u2605)[\p{Emoji_Presentation}\p{Extended_Pictographic}]|[\u200D\uFE0F\u2640\u2642]/u;

// Zero-Personalization & Hallucination Gate across Groups 5-8 (GAP-W4-08)
const GLOBAL_FORBIDDEN_PATTERNS = [
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

const GROUP_6_EXTRA_FORBIDDEN_PATTERNS = [
  /Kịch bản/i,
  /chúng ta/i,
  /các bạn/i,
  /\bVIP\s*9\b/i,
];

function assertMaxLineLength(
  text: string | undefined,
  maxChars: number,
  contextLabel: string
) {
  if (!text) return;
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  for (const [idx, line] of lines.entries()) {
    expect(
      line.length,
      `${contextLabel} [line ${idx + 1}] exceeds ${maxChars} chars (${line.length} chars): "${line.slice(0, 80)}..."`
    ).toBeLessThanOrEqual(maxChars);
  }
}

describe("Wave 4 — Content Restructuring, Scannability & Zero-Emoji Gate (Groups 5–8, 15 Articles)", () => {
  it("AC-W4-05: preserves exact category, article, section, checklistId, table row counts, widget contracts, search queries, and zero-personalization gates across Groups 5–8", () => {
    expect(WAVE4_CATEGORIES.length).toBe(4);
    expect(WAVE4_ARTICLES.length).toBe(15);

    const expectedMeta: Record<
      string,
      { checklistId: string; tableRows: number[] }
    > = {
      "5.1": {
        checklistId: "gear-overview-daily-audit-v2",
        tableRows: [5, 4],
      },
      "5.2": {
        checklistId: "golden-gear-faction-mark-audit-v2",
        tableRows: [6, 8, 10],
      },
      "5.3": {
        checklistId: "enhancement-resonance-audit-v2",
        tableRows: [4, 6, 20, 5],
      },
      "5.4": {
        checklistId: "lord-gear-staggered-audit-v2",
        tableRows: [2, 14],
      },
      "6.1": {
        checklistId: "runes-guide-weekly-audit-v2",
        tableRows: [6, 8, 12, 2],
      },
      "6.2": {
        checklistId: "relics-guide-weekly-audit-v2",
        tableRows: [3, 3, 20, 6],
      },
      "6.3": {
        checklistId: "pets-behemoth-weekly-audit-v2",
        tableRows: [3, 19, 14, 6],
      },
      "7.1": {
        checklistId: "checklist-7-1-weekly-shop-routine",
        tableRows: [13, 4, 16],
      },
      "7.2": {
        checklistId: "checklist-7-2-guild-honor-freeze",
        tableRows: [4, 5, 3],
      },
      "7.3": {
        checklistId: "checklist-7-3-exchange-vip-event-audit",
        tableRows: [4, 16, 7],
      },
      "7.4": {
        checklistId: "checklist-7-4-troop-skin-medal-audit",
        tableRows: [11, 4, 34],
      },
      "8.1": {
        checklistId: "castle-rush-weekly-audit-v2",
        tableRows: [3, 3, 32, 7],
      },
      "8.2": {
        checklistId: "builder-villager-daily-audit-v2",
        tableRows: [4, 2, 3, 14],
      },
      "8.3": {
        checklistId: "research-snapshot-baiting-audit-v2",
        tableRows: [5, 3, 17],
      },
      "8.4": {
        checklistId: "master-tables-reverse-budget-audit-v2",
        tableRows: [3, 5, 4, 7, 2, 18, 5, 10, 12, 18, 20, 16],
      },
    };

    for (const art of WAVE4_ARTICLES) {
      expect(art.freeSections.length, `${art.code} freeSections`).toBe(3);
      expect(art.proSections.length, `${art.code} proSections`).toBe(2);

      const allBlocks: GuideContentBlock[] = [
        ...art.freeSections,
        ...art.proSections,
      ].flatMap((s) => [
        ...s.blocks,
        ...(s.subSections ?? []).flatMap((sub) => sub.blocks),
      ]);

      const checklists = allBlocks.filter((b) => b.type === "checklist");
      expect(checklists.length, `${art.code} checklist count`).toBe(1);
      if (checklists[0]?.type === "checklist") {
        expect(checklists[0].checklistId, `${art.code} checklistId`).toBe(
          expectedMeta[art.code].checklistId
        );
      }

      const tableRowCounts = allBlocks
        .filter(
          (b): b is Extract<GuideContentBlock, { type: "table" }> =>
            b.type === "table"
        )
        .map((t) => t.rows.length);
      expect(tableRowCounts, `${art.code} table row counts`).toEqual(
        expectedMeta[art.code].tableRows
      );

      // Zero-Personalization Gate per article (GAP-W4-08)
      const rawJson = JSON.stringify(art);
      const patternsToCheck =
        art.categorySlug === "power-systems"
          ? [...GLOBAL_FORBIDDEN_PATTERNS, ...GROUP_6_EXTRA_FORBIDDEN_PATTERNS]
          : GLOBAL_FORBIDDEN_PATTERNS;
      for (const pattern of patternsToCheck) {
        expect(
          rawJson,
          `${art.code} triggered forbidden pattern ${pattern}`
        ).not.toMatch(pattern);
      }
    }

    // Verify 7.1 ShopSafetyFloorWidget plain-text cell contract (GAP-W4-03)
    const art71 = getArticleBySlug("economy", "shops-tier-list")!;
    const sub12 = art71.freeSections[0].subSections?.find(
      (s) => s.id === "sub-1-2-thirteen-shops-master-map"
    );
    const tbl12 = sub12?.blocks.find((b) => b.type === "table");
    if (tbl12?.type === "table") {
      tbl12.rows.forEach((row, rIdx) => {
        for (let c = 0; c <= 4; c++) {
          for (const loc of LOCALES) {
            expect(
              row[c][loc],
              `7.1 sub-1-2 row[${rIdx}][${c}].${loc} must be plain text without ** or \``
            ).not.toMatch(/\*\*|`/);
          }
        }
      });
    }
    const sub41 = art71.proSections[0].subSections?.find(
      (s) => s.id === "sub-4-1-diamond-equivalent-roi-matrix"
    );
    const tbl41 = sub41?.blocks.find((b) => b.type === "table");
    if (tbl41?.type === "table") {
      tbl41.rows.forEach((row, rIdx) => {
        for (const c of [0, 2]) {
          for (const loc of LOCALES) {
            expect(
              row[c][loc],
              `7.1 sub-4-1 row[${rIdx}][${c}].${loc} must be plain text without ** or \``
            ).not.toMatch(/\*\*|`/);
          }
        }
      });
    }

    // Verify 28 searchGuides() queries across Groups 5-8 (GAP-W4-07)
    const searchPairs: Array<{ q: string; loc: GuideLocale; slug: string }> = [
      { q: "huyết titan", loc: "vi", slug: "golden-gear-sets" },
      { q: "blood of the titan", loc: "en", slug: "golden-gear-sets" },
      { q: "bậc thầy cường hóa", loc: "vi", slug: "enhancement-and-mythic" },
      { q: "meteoric iron", loc: "en", slug: "enhancement-and-mythic" },
      { q: "lệch pha thông minh", loc: "vi", slug: "lord-gear-strategy" },
      { q: "sacred codex", loc: "en", slug: "lord-gear-strategy" },
      { q: "co ngu", loc: "vi", slug: "runes-guide" },
      { q: "combat skill level", loc: "en", slug: "runes-guide" },
      { q: "ap che sao", loc: "vi", slug: "relics-guide" },
      { q: "star rating suppression", loc: "en", slug: "relics-guide" },
      { q: "cu thu", loc: "vi", slug: "pets-and-behemoth" },
      { q: "covenant seals", loc: "en", slug: "pets-and-behemoth" },
      { q: "cua hang dau truong", loc: "vi", slug: "shops-tier-list" },
      { q: "arena shop", loc: "en", slug: "shops-tier-list" },
      { q: "hon da do", loc: "vi", slug: "guild-honor-freeze" },
      { q: "soul stone", loc: "en", slug: "guild-honor-freeze" },
      { q: "tiem doi manh", loc: "vi", slug: "exchange-and-vip-shops" },
      { q: "deluxe choice chest", loc: "en", slug: "exchange-and-vip-shops" },
      { q: "huy chuong vinh quang", loc: "vi", slug: "troop-skins-and-medals" },
      { q: "heavy cavalry", loc: "en", slug: "troop-skins-and-medals" },
      { q: "vien huy hoang", loc: "vi", slug: "castle-and-brilliance" },
      { q: "brilliance institute", loc: "en", slug: "castle-and-brilliance" },
      { q: "dan lang", loc: "vi", slug: "builder-queues-and-villagers" },
      { q: "gift box banking", loc: "en", slug: "builder-queues-and-villagers" },
      { q: "moi nhu pha tuyen", loc: "vi", slug: "research-and-baiting" },
      { q: "formation tank baiting", loc: "en", slug: "research-and-baiting" },
      { q: "bang so lieu", loc: "vi", slug: "master-data-tables" },
      { q: "master data tables", loc: "en", slug: "master-data-tables" },
    ];
    for (const sp of searchPairs) {
      expect(
        searchGuides(sp.q, sp.loc).some((a) => a.slug === sp.slug),
        `searchGuides("${sp.q}", "${sp.loc}") failed to match ${sp.slug}`
      ).toBe(true);
    }
  });

  describe("AC-W4-01: 3-Layer Scannable TL;DR Briefs (coreRule, immediateAction, strictTaboo)", () => {
    for (const article of WAVE4_ARTICLES) {
      it(`[${article.code} ${article.slug}] enforces Lead Sentence + \\n• micro-bullets (<= 220 chars/line) + **bold** + \`code\` in both vi and en`, () => {
        expect(article.tldr).toBeDefined();
        const tldr = article.tldr!;

        for (const field of [
          "coreRule",
          "immediateAction",
          "strictTaboo",
        ] as const) {
          for (const locale of LOCALES) {
            const val = tldr[field][locale].trim();
            const ctx = `${article.code} tldr.${field}.${locale}`;

            expect(
              val.includes("\n•"),
              `${ctx} must contain "\\n•" micro-bullets`
            ).toBe(true);
            expect(val.includes("**"), `${ctx} must contain **bold**`).toBe(
              true
            );
            expect(
              val.includes("`"),
              `${ctx} must contain \`code\` metric pill`
            ).toBe(true);

            assertMaxLineLength(val, 220, ctx);
          }
        }
      });
    }
  });

  describe("AC-W4-02: Scannable Key Takeaways (**Bold Lead** + `Metric Pills` + <= 220 chars/line)", () => {
    for (const article of WAVE4_ARTICLES) {
      it(`[${article.code} ${article.slug}] formats all keyTakeaways with **bold** lead, \`code\` pills, and <= 220 chars/line`, () => {
        expect(article.keyTakeaways.length).toBeGreaterThanOrEqual(3);

        article.keyTakeaways.forEach((kt, idx) => {
          for (const locale of LOCALES) {
            const val = kt[locale].trim();
            const ctx = `${article.code} keyTakeaways[${idx}].${locale}`;

            expect(
              val.startsWith("**"),
              `${ctx} must start with a **Bold Lead**: "${val.slice(0, 40)}..."`
            ).toBe(true);
            expect(
              val.includes("`"),
              `${ctx} must include at least one \`code\` pill`
            ).toBe(true);
            assertMaxLineLength(val, 220, ctx);
          }
        });
      });
    }
  });

  describe("AC-W4-03: Zero Wall-of-Text Across All Prose Blocks & Single-Line List Items (<= 220 chars/line)", () => {
    for (const article of WAVE4_ARTICLES) {
      it(`[${article.code} ${article.slug}] keeps paragraph, callout, list, roadmap, checklist, and case_study lines <= 220 chars in vi and en`, () => {
        const allSecs = [...article.freeSections, ...article.proSections];

        for (const sec of allSecs) {
          const allBlocks: GuideContentBlock[] = [
            ...sec.blocks,
            ...(sec.subSections ?? []).flatMap((sub) => sub.blocks),
          ];

          for (const [bIdx, block] of allBlocks.entries()) {
            for (const locale of LOCALES) {
              const prefix = `${article.code} ${sec.id} block[${bIdx}](${block.type}).${locale}`;

              switch (block.type) {
                case "paragraph":
                  assertMaxLineLength(block.text[locale], 220, prefix);
                  break;
                case "callout":
                  assertMaxLineLength(block.content[locale], 220, prefix);
                  break;
                case "list":
                  block.items.forEach((item, iIdx) => {
                    const itemVal = item[locale].trim();
                    expect(
                      itemVal.includes("\n"),
                      `${prefix}.item[${iIdx}] must be a single line (no \\n inside list.items to protect <ol> inline rendering)`
                    ).toBe(false);
                    expect(
                      itemVal.includes("**"),
                      `${prefix}.item[${iIdx}] must contain **Bold Lead**`
                    ).toBe(true);
                    assertMaxLineLength(
                      itemVal,
                      220,
                      `${prefix}.item[${iIdx}]`
                    );
                  });
                  break;
                case "roadmap":
                  block.steps.forEach((st, sIdx) => {
                    assertMaxLineLength(
                      st.description[locale],
                      220,
                      `${prefix}.step[${sIdx}].description`
                    );
                  });
                  break;
                case "checklist":
                  block.items.forEach((it, iIdx) => {
                    assertMaxLineLength(
                      it.detail[locale],
                      220,
                      `${prefix}.item[${iIdx}].detail`
                    );
                  });
                  break;
                case "case_study":
                  assertMaxLineLength(
                    block.profileSummary[locale],
                    220,
                    `${prefix}.profileSummary`
                  );
                  assertMaxLineLength(
                    block.conclusion?.[locale],
                    220,
                    `${prefix}.conclusion`
                  );
                  (block.diagnostics ?? []).forEach((diag, dIdx) => {
                    assertMaxLineLength(
                      diag[locale],
                      220,
                      `${prefix}.diagnostics[${dIdx}]`
                    );
                  });
                  block.recoverySteps.forEach((step, sIdx) => {
                    assertMaxLineLength(
                      step.detail[locale],
                      220,
                      `${prefix}.recoverySteps[${sIdx}].detail`
                    );
                  });
                  break;
              }
            }
          }
        }
      });
    }
  });

  describe("AC-W4-04: Zero Pictographic/Status Emojis & Zero Orphaned ZWJ/VS16 Symbols Across All Fields (DEC-V4-02 & GAP-W4-01)", () => {
    for (const article of WAVE4_ARTICLES) {
      it(`[${article.code} ${article.slug}] contains 0 forbidden emojis or orphaned ZWJ/gender symbols across all text fields in vi and en`, () => {
        const violations: string[] = [];

        const checkEmoji = (str: string | undefined, label: string) => {
          if (!str) return;
          if (FORBIDDEN_EMOJI_REGEX.test(str)) {
            const match = str.match(FORBIDDEN_EMOJI_REGEX)?.[0] ?? "";
            violations.push(
              `${label} (found "${match}" U+${match
                .codePointAt(0)
                ?.toString(16)
                .toUpperCase()}): "${str.slice(0, 45)}"`
            );
          }
        };

        const checkDiagramNode = (
          node: VisualDiagramNode | undefined,
          label: string,
          locale: GuideLocale
        ) => {
          if (!node) return;
          checkEmoji(node.badge?.[locale], `${label}.badge.${locale}`);
          checkEmoji(node.title[locale], `${label}.title.${locale}`);
          checkEmoji(node.subtitle?.[locale], `${label}.subtitle.${locale}`);
          (node.metrics ?? []).forEach((m, mIdx) =>
            checkEmoji(m[locale], `${label}.metrics[${mIdx}].${locale}`)
          );
        };

        for (const locale of LOCALES) {
          checkEmoji(article.title[locale], `title.${locale}`);
          checkEmoji(article.summary[locale], `summary.${locale}`);

          if (article.tldr) {
            checkEmoji(article.tldr.coreRule[locale], `tldr.coreRule.${locale}`);
            checkEmoji(
              article.tldr.immediateAction[locale],
              `tldr.immediateAction.${locale}`
            );
            checkEmoji(
              article.tldr.strictTaboo[locale],
              `tldr.strictTaboo.${locale}`
            );
          }

          article.keyTakeaways.forEach((kt, i) =>
            checkEmoji(kt[locale], `keyTakeaways[${i}].${locale}`)
          );

          for (const sec of [...article.freeSections, ...article.proSections]) {
            checkEmoji(sec.title[locale], `sec(${sec.id}).title.${locale}`);
            const allBlocks: GuideContentBlock[] = [...sec.blocks];

            for (const sub of sec.subSections ?? []) {
              checkEmoji(sub.title[locale], `sub(${sub.id}).title.${locale}`);
              checkEmoji(sub.badge?.[locale], `sub(${sub.id}).badge.${locale}`);
              allBlocks.push(...sub.blocks);
            }

            for (const [bIdx, block] of allBlocks.entries()) {
              const bLabel = `${sec.id}.block[${bIdx}](${block.type})`;
              switch (block.type) {
                case "paragraph":
                  checkEmoji(block.text[locale], `${bLabel}.text.${locale}`);
                  break;
                case "callout":
                  checkEmoji(block.title[locale], `${bLabel}.title.${locale}`);
                  checkEmoji(
                    block.content[locale],
                    `${bLabel}.content.${locale}`
                  );
                  break;
                case "list":
                  block.items.forEach((it, idx) =>
                    checkEmoji(
                      it[locale],
                      `${bLabel}.items[${idx}].${locale}`
                    )
                  );
                  break;
                case "table":
                  checkEmoji(
                    block.caption?.[locale],
                    `${bLabel}.caption.${locale}`
                  );
                  checkEmoji(
                    block.footnote?.[locale],
                    `${bLabel}.footnote.${locale}`
                  );
                  block.headers.forEach((h, idx) =>
                    checkEmoji(
                      h[locale],
                      `${bLabel}.headers[${idx}].${locale}`
                    )
                  );
                  block.rows.forEach((r, rIdx) =>
                    r.forEach((c, cIdx) =>
                      checkEmoji(
                        c[locale],
                        `${bLabel}.rows[${rIdx}][${cIdx}].${locale}`
                      )
                    )
                  );
                  break;
                case "roadmap":
                  block.steps.forEach((st, sIdx) => {
                    checkEmoji(
                      st.badge[locale],
                      `${bLabel}.steps[${sIdx}].badge.${locale}`
                    );
                    checkEmoji(
                      st.title[locale],
                      `${bLabel}.steps[${sIdx}].title.${locale}`
                    );
                    checkEmoji(
                      st.timing[locale],
                      `${bLabel}.steps[${sIdx}].timing.${locale}`
                    );
                    checkEmoji(
                      st.description[locale],
                      `${bLabel}.steps[${sIdx}].description.${locale}`
                    );
                  });
                  break;
                case "visual_diagram":
                  checkEmoji(block.title[locale], `${bLabel}.title.${locale}`);
                  checkEmoji(
                    block.subtitle?.[locale],
                    `${bLabel}.subtitle.${locale}`
                  );
                  checkEmoji(
                    block.footnote?.[locale],
                    `${bLabel}.footnote.${locale}`
                  );
                  checkDiagramNode(
                    block.centerNode,
                    `${bLabel}.centerNode`,
                    locale
                  );
                  (block.nodes ?? []).forEach((n, nIdx) =>
                    checkDiagramNode(
                      n,
                      `${bLabel}.nodes[${nIdx}]`,
                      locale
                    )
                  );
                  (block.branches ?? []).forEach((br, brIdx) => {
                    checkEmoji(
                      br.title[locale],
                      `${bLabel}.branches[${brIdx}].title.${locale}`
                    );
                    checkEmoji(
                      br.badge?.[locale],
                      `${bLabel}.branches[${brIdx}].badge.${locale}`
                    );
                    checkEmoji(
                      br.outcome[locale],
                      `${bLabel}.branches[${brIdx}].outcome.${locale}`
                    );
                    br.steps.forEach((st, sIdx) =>
                      checkDiagramNode(
                        st,
                        `${bLabel}.branches[${brIdx}].steps[${sIdx}]`,
                        locale
                      )
                    );
                  });
                  break;
                case "checklist":
                  checkEmoji(block.title[locale], `${bLabel}.title.${locale}`);
                  checkEmoji(
                    block.description?.[locale],
                    `${bLabel}.description.${locale}`
                  );
                  block.items.forEach((it, iIdx) => {
                    checkEmoji(
                      it.label[locale],
                      `${bLabel}.items[${iIdx}].label.${locale}`
                    );
                    checkEmoji(
                      it.detail[locale],
                      `${bLabel}.items[${iIdx}].detail.${locale}`
                    );
                    checkEmoji(
                      it.badge?.[locale],
                      `${bLabel}.items[${iIdx}].badge.${locale}`
                    );
                  });
                  break;
                case "case_study":
                  checkEmoji(block.badge[locale], `${bLabel}.badge.${locale}`);
                  checkEmoji(block.title[locale], `${bLabel}.title.${locale}`);
                  checkEmoji(
                    block.profileSummary[locale],
                    `${bLabel}.profileSummary.${locale}`
                  );
                  checkEmoji(
                    block.conclusion?.[locale],
                    `${bLabel}.conclusion.${locale}`
                  );
                  (block.diagnostics ?? []).forEach((d, dIdx) =>
                    checkEmoji(
                      d[locale],
                      `${bLabel}.diagnostics[${dIdx}].${locale}`
                    )
                  );
                  block.recoverySteps.forEach((st, sIdx) => {
                    checkEmoji(
                      st.title[locale],
                      `${bLabel}.recoverySteps[${sIdx}].title.${locale}`
                    );
                    checkEmoji(
                      st.detail[locale],
                      `${bLabel}.recoverySteps[${sIdx}].detail.${locale}`
                    );
                    checkEmoji(
                      st.impactBadge?.[locale],
                      `${bLabel}.recoverySteps[${sIdx}].impactBadge.${locale}`
                    );
                  });
                  break;
                case "media_spotlight":
                  checkEmoji(block.title[locale], `${bLabel}.title.${locale}`);
                  checkEmoji(
                    block.description[locale],
                    `${bLabel}.description.${locale}`
                  );
                  (block.annotations ?? []).forEach((ann, aIdx) => {
                    checkEmoji(
                      ann.label[locale],
                      `${bLabel}.annotations[${aIdx}].label.${locale}`
                    );
                    checkEmoji(
                      ann.detail[locale],
                      `${bLabel}.annotations[${aIdx}].detail.${locale}`
                    );
                  });
                  break;
              }
            }
          }
        }

        expect(violations, `Forbidden emojis in ${article.code}`).toEqual([]);
      });
    }
  });
});

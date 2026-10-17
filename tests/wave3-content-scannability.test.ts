import { describe, expect, it } from "vitest";
import { getAllCategories } from "../src/content/guides/registry";
import type {
  GuideArticle,
  GuideContentBlock,
  GuideLocale,
  VisualDiagramNode,
} from "../src/content/guides/types";

const WAVE3_CATEGORIES = getAllCategories().filter((c) => c.order <= 4);
const WAVE3_ARTICLES: GuideArticle[] = WAVE3_CATEGORIES.flatMap(
  (c) => c.articles
);
const LOCALES: GuideLocale[] = ["vi", "en"];

// Matches any color/pictographic emoji anywhere in a string while allowing monochrome star '★' (\u2605)
const FORBIDDEN_EMOJI_REGEX =
  /(?!\u2605)[\p{Emoji_Presentation}\p{Extended_Pictographic}]/u;

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

describe("Wave 3 — Content Restructuring, Scannability & Zero-Emoji Gate (Groups 1–4, 16 Articles)", () => {
  it("AC-W3-05: preserves exact category, article, section, subsection, and widget counts across Groups 1–4", () => {
    expect(WAVE3_CATEGORIES.length).toBe(4);
    expect(WAVE3_ARTICLES.length).toBe(16);

    const expectedSectionCounts: Record<string, { free: number; pro: number }> =
      {
        "1.1": { free: 3, pro: 2 },
        "1.2": { free: 3, pro: 2 },
        "1.3": { free: 3, pro: 2 },
        "1.4": { free: 3, pro: 2 },
        "2.1": { free: 3, pro: 2 },
        "2.2": { free: 3, pro: 2 },
        "2.3": { free: 3, pro: 2 },
        "2.4": { free: 3, pro: 2 },
        "2.5": { free: 3, pro: 2 },
        "3.1": { free: 3, pro: 2 },
        "3.2": { free: 3, pro: 2 },
        "3.3": { free: 3, pro: 2 },
        "3.4": { free: 3, pro: 2 },
        "4.1": { free: 3, pro: 2 },
        "4.2": { free: 3, pro: 2 },
        "4.3": { free: 3, pro: 2 },
      };

    for (const art of WAVE3_ARTICLES) {
      expect(art.freeSections.length, `${art.code} freeSections`).toBe(
        expectedSectionCounts[art.code].free
      );
      expect(art.proSections.length, `${art.code} proSections`).toBe(
        expectedSectionCounts[art.code].pro
      );
    }
  });

  describe("AC-W3-01: 3-Layer Scannable TL;DR Briefs (coreRule, immediateAction, strictTaboo)", () => {
    for (const article of WAVE3_ARTICLES) {
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

  describe("AC-W3-02: Scannable Key Takeaways (**Bold Lead** + `Metric Pills` + <= 220 chars/line)", () => {
    for (const article of WAVE3_ARTICLES) {
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

  describe("AC-W3-03: Zero Wall-of-Text Across All Prose Blocks & Single-Line List Items (<= 220 chars/line)", () => {
    for (const article of WAVE3_ARTICLES) {
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

  describe("AC-W3-04: Zero Pictographic/Status Emojis Across All Article Fields & 10 Block Types (DEC-V4-02)", () => {
    for (const article of WAVE3_ARTICLES) {
      it(`[${article.code} ${article.slug}] contains 0 forbidden emojis across all text fields in vi and en`, () => {
        const violations: string[] = [];

        const checkEmoji = (str: string | undefined, label: string) => {
          if (!str) return;
          if (FORBIDDEN_EMOJI_REGEX.test(str)) {
            const match = str.match(FORBIDDEN_EMOJI_REGEX)?.[0] ?? "";
            violations.push(`${label} (found "${match}"): "${str.slice(0, 45)}"`);
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

  it("AC-W3-06: eliminates legacy Week A / Week B terminology across all 16 Wave 3 articles and category metadata", () => {
    const legacyRegex =
      /Tuần\s+[AB](?![\p{L}\p{N}_])|\bWeek\s+[AB](?![\p{L}\p{N}_])|Chu\s+kỳ\s+14\s+Ngày|Nhịp\s+Đập\s+14\s+Ngày|\bBi-weekly\s+Rotation\b|\b14-Day\s+Bi-weekly\b/iu;
    for (const cat of WAVE3_CATEGORIES) {
      expect(cat.title.vi, `${cat.slug} title.vi`).not.toMatch(legacyRegex);
      expect(cat.title.en, `${cat.slug} title.en`).not.toMatch(legacyRegex);
      expect(cat.description.vi, `${cat.slug} description.vi`).not.toMatch(legacyRegex);
      expect(cat.description.en, `${cat.slug} description.en`).not.toMatch(legacyRegex);
    }
    for (const article of WAVE3_ARTICLES) {
      const serialized = JSON.stringify({
        title: article.title,
        summary: article.summary,
        tldr: article.tldr,
        keyTakeaways: article.keyTakeaways,
        keywords: article.keywords,
        freeSections: article.freeSections,
        proSections: article.proSections,
      });
      expect(
        serialized,
        `Article ${article.code} (${article.slug}) must not contain legacy Week A/B terms`
      ).not.toMatch(legacyRegex);
    }
  });
});


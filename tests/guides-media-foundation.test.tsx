import React from "react";
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { GUIDE_GLOSSARY } from "../src/content/guides/glossary";
import { getAllArticles } from "../src/content/guides/registry";
import type { GuideMediaSpotlightBlock } from "../src/content/guides/types";
import {
  HERO_VISUAL_PROFILES,
  getAssetById,
  getAssetByGlossaryId,
  getHeroVisualProfile,
  resolveEntityFromCodeToken,
  resolveEntityFromTableCell,
  resolveEntityFromDiagramNode,
  getMediaShowcaseItems,
} from "../src/content/guides/asset-registry";
import { GameAssetFrame } from "../src/components/guides/media/game-asset-frame";
import { GameInlineChip } from "../src/components/guides/media/game-inline-chip";
import { VisualShowcaseDeck } from "../src/components/guides/media/visual-showcase-deck";
import { RichGuideText } from "../src/components/guides/blocks/rich-guide-text";
import { MediaSpotlightBlock } from "../src/components/guides/blocks/media-spotlight-block";
import { VisualDiagramBlock } from "../src/components/guides/blocks/visual-diagram-block";
import { ResponsiveDataTable } from "../src/components/guides/blocks/responsive-data-table";

const PUBLIC_DIR = path.resolve(__dirname, "../public");
const MEDIA_DIR = path.resolve(__dirname, "../src/components/guides/media");
const VI_DIACRITIC_REGEX =
  /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỠỲÝỴỶỸĐ]/;

function assertPublicFileExists(webPath: string | undefined, context: string) {
  expect(webPath, `${context}: webPath must be defined`).toBeDefined();
  expect(
    webPath!.startsWith("/images/"),
    `${context}: ${webPath} must start with /images/`
  ).toBe(true);
  const diskPath = path.join(PUBLIC_DIR, webPath!.replace(/^\//, ""));
  expect(
    fs.existsSync(diskPath),
    `${context}: File does not exist on disk: ${diskPath}`
  ).toBe(true);
}

describe("Phase 1 — Tier-1 Media Asset Registry & RPG Visual Primitives", () => {
  describe("Suite 1: SSoT Asset Registry Coverage & Disk File Integrity", () => {
    it("maps 100% of all 111 GlossaryTerm IDs to valid existing .webp files on disk and contains 0 Vietnamese diacritics in nameEn/descEn", () => {
      expect(GUIDE_GLOSSARY).toHaveLength(111);

      for (const term of GUIDE_GLOSSARY) {
        const asset = getAssetByGlossaryId(term.id);
        expect(
          asset,
          `Missing asset mapping for glossaryId: ${term.id}`
        ).toBeDefined();
        assertPublicFileExists(asset!.iconPath, `Glossary[${term.id}].iconPath`);
        if (asset!.portraitPath) {
          assertPublicFileExists(
            asset!.portraitPath,
            `Glossary[${term.id}].portraitPath`
          );
        }
        expect(
          VI_DIACRITIC_REGEX.test(asset!.nameEn),
          `${term.id} nameEn leaked VI: ${asset!.nameEn}`
        ).toBe(false);
        if (asset!.descEn) {
          expect(
            VI_DIACRITIC_REGEX.test(asset!.descEn),
            `${term.id} descEn leaked VI`
          ).toBe(false);
        }
      }
    });

    it("maps all 51 SSoT glossary heroes + 4 extra client heroes (55 total profiles, 54 Lihui portraits + Boar avatar) with distinct avatars for Wukong vs Wanderer", () => {
      const heroIds = Object.keys(HERO_VISUAL_PROFILES);
      expect(heroIds.length).toBeGreaterThanOrEqual(55);

      const wukong = getHeroVisualProfile("hero-wukong");
      const wanderer = getHeroVisualProfile("hero-wanderer");
      expect(wukong).toBeDefined();
      expect(wanderer).toBeDefined();
      expect(wukong!.avatarPath).toBe("/images/heroes/avatars/Head_10047.webp");
      expect(wanderer!.avatarPath).toBe("/images/heroes/avatars/Head_10029.webp");
      expect(wukong!.avatarPath).not.toBe(wanderer!.avatarPath);

      for (const profile of Object.values(HERO_VISUAL_PROFILES)) {
        assertPublicFileExists(
          profile.avatarPath,
          `Hero[${profile.id}].avatarPath`
        );
        if (profile.portraitPath) {
          assertPublicFileExists(
            profile.portraitPath,
            `Hero[${profile.id}].portraitPath`
          );
        }
        if (profile.exclusiveWeaponPath) {
          assertPublicFileExists(
            profile.exclusiveWeaponPath,
            `Hero[${profile.id}].exclusiveWeaponPath`
          );
        }
      }
    });

    it("maps 100% of all 91 MediaSpotlightBlock mediaCodes in the 31 articles to 2-6 valid .webp showcase items", () => {
      const articles = getAllArticles();
      const spotlightBlocks: GuideMediaSpotlightBlock[] = [];

      for (const article of articles) {
        for (const sec of [...article.freeSections, ...article.proSections]) {
          for (const b of sec.blocks) {
            if (b.type === "media_spotlight") spotlightBlocks.push(b);
          }
          for (const sub of sec.subSections ?? []) {
            for (const b of sub.blocks) {
              if (b.type === "media_spotlight") spotlightBlocks.push(b);
            }
          }
        }
      }

      expect(spotlightBlocks).toHaveLength(94);

      for (const block of spotlightBlocks) {
        const items = getMediaShowcaseItems(
          block.mediaCode,
          block.title,
          block.annotations
        );
        expect(
          items.length,
          `MediaSpotlight ${block.mediaCode} must have between 2 and 6 showcase items`
        ).toBeGreaterThanOrEqual(2);
        expect(items.length).toBeLessThanOrEqual(6);

        for (const item of items) {
          assertPublicFileExists(
            item.iconPath,
            `Showcase[${block.mediaCode} -> ${item.assetId}]`
          );
          expect(
            VI_DIACRITIC_REGEX.test(item.labelEn),
            `Showcase[${block.mediaCode}] labelEn leaked VI: ${item.labelEn}`
          ).toBe(false);
        }
      }
    });

    it("resolves O(1) aliases and compound quantitative tokens for code pills, table cells, and diagram nodes", () => {
      expect(resolveEntityFromCodeToken("560 Mảnh")?.id).toBe(
        "item-universal-shard"
      );
      expect(resolveEntityFromCodeToken("9 Hồn Đá Đỏ")?.id).toBe(
        "item-soul-stone"
      );
      expect(resolveEntityFromCodeToken("24,700 Sách")?.id).toBe(
        "item-skill-book"
      );
      expect(resolveEntityFromCodeToken("40,000 Điểm Vinh Dự")?.id).toBe(
        "item-guild-honor"
      );
      expect(resolveEntityFromCodeToken("Pyromancer")?.id).toBe(
        "hero-pyromancer"
      );
      expect(resolveEntityFromCodeToken("Wukong")?.id).toBe("hero-wukong");
      expect(resolveEntityFromCodeToken("Blood of the Titan")?.id).toBe(
        "gear-set-blood-of-the-titan"
      );

      // Pure numbers/prices/math must NOT false-positive match an entity
      expect(resolveEntityFromCodeToken("#1")).toBeUndefined();
      expect(resolveEntityFromCodeToken("$0.99")).toBeUndefined();
      expect(resolveEntityFromCodeToken("Lv.40")).toBeUndefined();

      // Table cell resolution
      expect(resolveEntityFromTableCell("🔥 Tôn Ngộ Không (Wukong)")?.id).toBe(
        "hero-wukong"
      );
      expect(
        resolveEntityFromTableCell("Kỵ Sĩ Vinh Quang (Knight's Glory)")?.id
      ).toBe("gear-set-knights-glory");

      // Diagram node resolution (cross-locale invariant)
      expect(
        resolveEntityFromDiagramNode({
          titleVi: "1,000 Mảnh Vàng",
          titleEn: "1,000 Universal Shards",
        })?.id
      ).toBe("item-universal-shard");
    });
  });

  describe("Suite 2: 4 RPG Visual Primitives & 4 Upgraded Blocks (GAP-01..04, GUARD-P1-07..10)", () => {
    it("renders GameAssetFrame with explicit lazy/async attributes, rarity ring, faction badge, zero border-l-2/4, and SVG fallback on image error", () => {
      const wukongAsset = getAssetById("hero-wukong")!;
      const { container } = render(
        <GameAssetFrame
          src={wukongAsset.iconPath}
          rarity={wukongAsset.rarity}
          faction={wukongAsset.faction}
          size="lg"
          alt=""
        />
      );

      expect(container.innerHTML).not.toContain("border-l-2");
      expect(container.innerHTML).not.toContain("border-l-4");
      expect(container.innerHTML).not.toContain("rounded-l-sm");

      const img = container.querySelector("img");
      expect(img).not.toBeNull();
      expect(img?.getAttribute("loading")).toBe("lazy");
      expect(img?.getAttribute("decoding")).toBe("async");

      // Trigger onError -> switches cleanly to inline SVG fallback
      fireEvent.error(img!);
      expect(
        container.querySelector("[data-testid='asset-frame-fallback']")
      ).not.toBeNull();
    });

    it("enforces Per-Paragraph Deduplication (including inside nested **bold** and structured-brief) and preserves exact code.textContent (GAP-02, GUARD-P1-08)", () => {
      const { container } = render(
        <RichGuideText
          text="Dồn **`560 Mảnh`** cho chủ lực đầu tiên, tuyệt đối không chia lẻ `560 Mảnh` cho tướng phụ."
          locale="vi"
        />
      );

      const codes = container.querySelectorAll("code");
      expect(codes).toHaveLength(2);
      expect(codes[0].textContent).toBe("560 Mảnh");
      expect(codes[1].textContent).toBe("560 Mảnh");

      // Only the FIRST occurrence in the paragraph renders an inline icon
      expect(codes[0].querySelector("img")).not.toBeNull();
      expect(codes[1].querySelector("img")).toBeNull();
    });

    it("mounts GameEntityPopover lazily on click/hover and obeys Strict Locale Gate in both locale='en' and ASCII-only strings in locale='vi' (GAP-01, GUARD-P1-07)", () => {
      const { container: enContainer, unmount } = render(
        <RichGuideText
          text="Invest `560 Shards` into `Pyromancer` first."
          locale="en"
        />
      );

      expect(enContainer.textContent).not.toMatch(VI_DIACRITIC_REGEX);
      const firstCodeEn = enContainer.querySelector("code")!;
      fireEvent.click(firstCodeEn);

      const popoverEn = screen.getByTestId("game-entity-popover");
      expect(popoverEn).toBeDefined();
      expect(popoverEn.textContent ?? "").not.toMatch(VI_DIACRITIC_REGEX);
      unmount();

      // Now test ASCII-only token in Vietnamese locale (GUARD-P1-07)
      const { container: viContainer } = render(
        <RichGuideText text="`Pyromancer`" locale="vi" />
      );
      fireEvent.click(viContainer.querySelector("code")!);
      const popoverVi = screen.getByTestId("game-entity-popover");
      expect(popoverVi.textContent ?? "").toContain("Pháp Sư Lửa");
    });

    it("renders VisualShowcaseDeck inside MediaSpotlightBlock with 0 Vietnamese characters in locale='en' and real faction crests in tier1_faction_loop", () => {
      const { container: tier1Container } = render(
        <MediaSpotlightBlock
          locale="en"
          block={{
            type: "media_spotlight",
            mediaCode: "MED-1.1-03",
            tier: "tier1_faction_loop",
            title: { vi: "Vòng lặp Khắc chế", en: "3-Faction Counter Loop" },
            description: { vi: "Mô tả", en: "Counter loop description" },
          }}
        />
      );

      expect(tier1Container.textContent ?? "").not.toMatch(VI_DIACRITIC_REGEX);
      expect(tier1Container.querySelectorAll("img").length).toBeGreaterThanOrEqual(3);

      const { container: tier2Container } = render(
        <MediaSpotlightBlock
          locale="en"
          block={{
            type: "media_spotlight",
            mediaCode: "MED-2.4-01",
            tier: "tier2_annotated_ui",
            title: { vi: "Bộ ba Tài nguyên", en: "The Core Resource Trinity" },
            description: { vi: "Mô tả", en: "Resource trinity breakdown" },
            annotations: [
              {
                kind: "do",
                label: { vi: "Mảnh Vạn Năng", en: "Universal Shards" },
                detail: { vi: "Dồn cho Mythic", en: "Funnel into Mythics" },
              },
            ],
          }}
        />
      );

      expect(
        tier2Container.querySelector("[data-testid='visual-showcase-deck']")
      ).not.toBeNull();
      expect(tier2Container.textContent ?? "").not.toMatch(VI_DIACRITIC_REGEX);
      expect(tier2Container.innerHTML).not.toContain("border-l-2");
      expect(tier2Container.innerHTML).not.toContain("border-l-4");
    });

    it("attaches 28x28px entity thumbnails to column 0 of ResponsiveDataTable and 40x40px icons to VisualDiagramBlock nodes without breaking textContent", () => {
      const { container: tableContainer } = render(
        <ResponsiveDataTable
          locale="en"
          headers={["Hero", "Target Star"]}
          rows={[
            ["🔥 Wukong (Mythic)", "1 White Star (560 Shards)"],
            ["Pyromancer", "1 White Star (280 Shards)"],
          ]}
        />
      );

      const firstColImgs = tableContainer.querySelectorAll(
        "tbody tr td:first-child [data-testid='game-asset-frame'] img"
      );
      expect(firstColImgs.length).toBeGreaterThanOrEqual(2);
      expect(tableContainer.textContent ?? "").not.toMatch(VI_DIACRITIC_REGEX);

      const { container: diagramContainer } = render(
        <VisualDiagramBlock
          locale="en"
          block={{
            type: "visual_diagram",
            mediaCode: "MED-2.4-03",
            variant: "timeline_phases",
            title: { vi: "Lộ trình Sao", en: "Star Domino Flow" },
            centerNode: {
              id: "root",
              title: { vi: "560 Mảnh Vạn Năng", en: "560 Universal Shards" },
            },
            nodes: [
              {
                id: "n1",
                title: { vi: "Tôn Ngộ Không", en: "Wukong" },
                subtitle: { vi: "Chủ lực Bộ Lạc", en: "Horde Hyper-Carry" },
                tone: "gold",
              },
            ],
          }}
        />
      );

      expect(
        diagramContainer.querySelectorAll("img").length
      ).toBeGreaterThanOrEqual(2);
      expect(diagramContainer.textContent ?? "").not.toMatch(VI_DIACRITIC_REGEX);
    });

    it("enforces Google MD3 typography & Single-Layer Containment across GameInlineChip, GameEntityPopover, and VisualShowcaseDeck (Track 3 Phase 3.3)", () => {
      const wukong = getAssetById("hero-wukong")!;
      const showcaseItems = getMediaShowcaseItems("MED-2.4-01", {
        vi: "Bộ ba Tài nguyên",
        en: "The Core Resource Trinity",
      });

      const { container } = render(
        <div>
          <GameInlineChip entity={wukong} locale="vi">
            Tôn Ngộ Không
          </GameInlineChip>
          <VisualShowcaseDeck items={showcaseItems} locale="vi" />
        </div>
      );

      const chip = container.querySelector("code[data-entity-id]");
      expect(chip).not.toBeNull();
      expect(chip?.className).toContain("font-sans");
      expect(chip?.className).toContain("text-xs");
      expect(chip?.className).toContain("sm:text-sm");
      expect(chip?.className).toContain("align-middle");
      expect(chip?.className).toContain("-translate-y-[1px]");
      expect(chip?.className).toContain("leading-snug");
      expect(chip?.className).not.toContain("font-mono");
      expect(chip?.className).not.toContain("text-[0.82em]");

      fireEvent.click(chip!);
      const popover = screen.getByTestId("game-entity-popover");
      expect(popover.className).toContain("max-w-[calc(100vw-2rem)]");
      expect(popover.innerHTML).not.toMatch(/\btext-\[(?:8|9|10|11)px\]/);

      const rarityBadge = screen.getByText("Thần Thoại (UR)");
      expect(rarityBadge.className).toContain("text-xs");
      expect(rarityBadge.className).toContain("font-sans");
      expect(rarityBadge.className).not.toContain("font-mono");
      expect(rarityBadge.className).not.toMatch(/(^|\s)border(\s|$)/);

      const deck = screen.getByTestId("visual-showcase-deck");
      expect(deck.className).toContain("min-w-0");
      expect(deck.className).toContain("border-0");
      expect(deck.innerHTML).not.toMatch(/\btext-\[(?:8|9|10|11)px\]/);

      const firstCard = screen.getByTestId("showcase-card-0");
      expect(firstCard.className).toContain("border-0");
      const figcaptionSpans = firstCard.querySelectorAll("figcaption span");
      expect(figcaptionSpans[0]?.className).toContain("text-sm");

      // Static source scan of all 4 files in src/components/guides/media/
      const mediaFiles = [
        "game-asset-frame.tsx",
        "game-inline-chip.tsx",
        "game-entity-popover.tsx",
        "visual-showcase-deck.tsx",
      ];
      for (const file of mediaFiles) {
        const src = fs.readFileSync(path.join(MEDIA_DIR, file), "utf-8");
        expect(src, `${file} contains forbidden micro-text`).not.toMatch(
          /\btext-\[(?:8|9|10|11)px\]|text-\[0\.82em\]/
        );
      }
    });
  });
});

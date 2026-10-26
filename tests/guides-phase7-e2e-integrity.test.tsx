import React from "react";
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import viMessages from "../messages/vi.json";
import enMessages from "../messages/en.json";
import { GUIDE_GLOSSARY } from "../src/content/guides/glossary";
import { getAllArticles } from "../src/content/guides/registry";
import type {
  CodexCategoryId,
  GuideMediaSpotlightBlock,
  GuideTableBlock,
  GuideVisualDiagramBlock,
} from "../src/content/guides/types";
import {
  GAME_ASSET_REGISTRY,
  HERO_VISUAL_PROFILES,
  MEDIA_SHOWCASE_BY_CODE,
  getAssetByGlossaryId,
  getMediaShowcaseItems,
  resolveEntityFromDiagramNode,
  resolveEntityFromTableCell,
} from "../src/content/guides/asset-registry";
import { GameAssetFrame } from "../src/components/guides/media/game-asset-frame";
import { RichGuideText } from "../src/components/guides/blocks/rich-guide-text";
import { ResponsiveDataTable } from "../src/components/guides/blocks/responsive-data-table";
import { GuideArticleRenderer } from "../src/components/guides/guide-article-renderer";
import { HeroEncyclopediaWidget } from "../src/components/guides/widgets/hero-encyclopedia-widget";
import { TacticalFormationBoardWidget } from "../src/components/guides/widgets/tactical-formation-board-widget";
import { AccountTrapsTriageWidget } from "../src/components/guides/widgets/account-traps-triage-widget";
import { BiweeklyCalendarWidget } from "../src/components/guides/widgets/biweekly-calendar-widget";
import { HordePivotStepperWidget } from "../src/components/guides/widgets/horde-pivot-stepper-widget";
import { BlacksmithAnvilMatrixWidget } from "../src/components/guides/widgets/blacksmith-anvil-matrix-widget";
import { ShopSafetyFloorWidget } from "../src/components/guides/widgets/shop-safety-floor-widget";
import { MasterDataExplorerWidget } from "../src/components/guides/widgets/master-data-explorer-widget";
import { GameCodexClient } from "../src/components/guides/codex/game-codex-client";
import {
  normalizeSearchQuery,
  parseCodexUrlParams,
} from "../src/components/guides/codex/codex-utils";
import { GuidesHubClient } from "../src/components/guides/guides-hub-client";
import { GuidesSidebar } from "../src/components/guides/guides-sidebar";

let activeMockLocale: "vi" | "en" = "en";
const mockPathname = vi.fn(() => "/guides/codex");
const mockRouterReplace = vi.fn();
let mockSearchParamsString = "";

vi.mock("next-intl", () => ({
  useLocale: () => activeMockLocale,
  useTranslations: () => (key: string, params?: Record<string, unknown>) => {
    const dict = (
      activeMockLocale === "en" ? enMessages.Guides : viMessages.Guides
    ) as Record<string, string>;
    const raw = dict[key] ?? key;
    if (!params) return raw;
    return Object.entries(params).reduce(
      (acc, [k, v]) => acc.replace(new RegExp(`\\{${k}\\}`, "g"), String(v)),
      raw
    );
  },
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: mockRouterReplace,
    push: vi.fn(),
  }),
  usePathname: () => mockPathname(),
  useSearchParams: () => new URLSearchParams(mockSearchParamsString),
}));

vi.mock("@/i18n/routing", () => ({
  Link: ({
    href,
    children,
    onClick,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  }) => (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </a>
  ),
  usePathname: () => mockPathname(),
}));

vi.mock("@/hooks/use-uid-session", () => ({
  useUidSession: () => ({
    activeAccount: {
      uid: "1000000000001",
      nickname: "CommanderAudit",
      server_id: "105",
      added_at: 1700000000000,
      active_plan: "PRO" as const,
    },
    isLoaded: true,
  }),
}));

const PUBLIC_DIR = path.resolve(__dirname, "../public");
const CODEX_DATA_DIR = path.join(PUBLIC_DIR, "data", "codex");
const SRC_DIR = path.resolve(__dirname, "../src");

const VI_DIACRITIC_REGEX =
  /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỠỲÝỴỶỸĐ]/u;

const RAW_SPRITE_NAME_REGEX =
  /^(?:icon[\s_]\d+|Head[\s_]\d+|Activity[\s_]\d+|Lihui[\s_]\d+|bg_.*)$/i;

const CODEX_CATEGORIES: readonly CodexCategoryId[] = [
  "heroes",
  "items",
  "equipment",
  "relics",
  "pets-behemoths",
  "buildings-decor",
  "skills-tech",
  "troops",
  "events-seasons",
  "monsters",
  "cosmetics",
  "shop-vip",
];

const verifiedWebpCache = new Map<string, boolean>();

function assertValidWebpOnDisk(webPath: string | undefined, context: string): void {
  expect(webPath, `${context}: webPath must be defined`).toBeDefined();
  const cleanPath = webPath!;
  expect(
    cleanPath.startsWith("/images/") && cleanPath.endsWith(".webp"),
    `${context}: "${cleanPath}" must start with /images/ and end with .webp`
  ).toBe(true);
  expect(
    !cleanPath.includes("\\") &&
      !cleanPath.includes(" ") &&
      !cleanPath.includes("undefined") &&
      !cleanPath.includes("null") &&
      !cleanPath.startsWith("/images/guides/"),
    `${context}: "${cleanPath}" violates path hygiene rules`
  ).toBe(true);

  if (verifiedWebpCache.get(cleanPath)) {
    return;
  }

  const diskPath = path.join(PUBLIC_DIR, cleanPath.replace(/^\//, ""));
  expect(
    fs.existsSync(diskPath),
    `${context}: Physical .webp file does NOT exist on disk: ${diskPath}`
  ).toBe(true);

  const stat = fs.statSync(diskPath);
  expect(
    stat.size,
    `${context}: Physical .webp file is empty or truncated (${stat.size} bytes): ${diskPath}`
  ).toBeGreaterThan(64);

  const fd = fs.openSync(diskPath, "r");
  const header = Buffer.alloc(12);
  try {
    fs.readSync(fd, header, 0, 12, 0);
  } finally {
    fs.closeSync(fd);
  }
  const riff = header.subarray(0, 4).toString("ascii");
  const webp = header.subarray(8, 12).toString("ascii");
  expect(
    riff === "RIFF" && webp === "WEBP",
    `${context}: Invalid RIFF/WEBP binary signature in ${diskPath} (got ${riff}/${webp})`
  ).toBe(true);

  verifiedWebpCache.set(cleanPath, true);
}

function collectSourceFiles(dir: string, exts: readonly string[]): string[] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectSourceFiles(full, exts));
    } else if (exts.some((ext) => entry.name.endsWith(ext))) {
      files.push(full);
    }
  }
  return files;
}

describe("Phase 7 — Guides Hub v4.0 Final E2E Asset/Codex Integrity & Production Release Audit (Rev 2)", () => {
  beforeEach(() => {
    activeMockLocale = "en";
    mockPathname.mockReturnValue("/guides/codex");
    mockSearchParamsString = "";
    mockRouterReplace.mockReset();
    window.localStorage.clear();

    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL) => {
        const urlStr = String(input);
        if (urlStr.startsWith("/data/codex/")) {
          const diskFile = path.join(PUBLIC_DIR, urlStr.replace(/^\//, ""));
          if (fs.existsSync(diskFile)) {
            const content = JSON.parse(fs.readFileSync(diskFile, "utf-8"));
            return {
              ok: true,
              status: 200,
              json: async () => content,
            } as Response;
          }
        }
        return {
          ok: false,
          status: 404,
          json: async () => ({}),
        } as Response;
      })
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe("Suite 1: Root Manifest Invariant, Tier-1 Asset Registry, 111 Glossary Terms, 55 Heroes & 31 Articles Physical WebP Audit", () => {
    it("verifies read-only public/images/manifest.json remains 100% intact (17,634 assets, 3,387 game_id, 111 glossary_index) (GAP-P7-R2-06)", () => {
      const rootManifestPath = path.join(PUBLIC_DIR, "images", "manifest.json");
      expect(fs.existsSync(rootManifestPath)).toBe(true);
      const manifest = JSON.parse(fs.readFileSync(rootManifestPath, "utf-8")) as {
        assets: Array<{ path: string; game_id: number | null }>;
        glossary_index: Record<string, { primary_image: string }>;
      };

      expect(manifest.assets).toHaveLength(17634);
      const withGameId = manifest.assets.filter((a) => a.game_id !== null);
      expect(withGameId).toHaveLength(3387);

      const glossaryKeys = Object.keys(manifest.glossary_index);
      expect(glossaryKeys).toHaveLength(111);
      for (const [gId, gMeta] of Object.entries(manifest.glossary_index)) {
        assertValidWebpOnDisk(
          gMeta.primary_image.startsWith("/")
            ? gMeta.primary_image
            : `/${gMeta.primary_image}`,
          `manifest.glossary_index[${gId}]`
        );
      }
    });

    it("verifies 100% of entries in GAME_ASSET_REGISTRY point to valid >64-byte RIFF/WEBP files on disk and have 0 Vietnamese leaks in EN", () => {
      const registryEntries = Object.values(GAME_ASSET_REGISTRY);
      expect(registryEntries.length).toBeGreaterThanOrEqual(120);

      for (const entry of registryEntries) {
        assertValidWebpOnDisk(entry.iconPath, `GAME_ASSET_REGISTRY[${entry.id}].iconPath`);
        if (entry.portraitPath) {
          assertValidWebpOnDisk(
            entry.portraitPath,
            `GAME_ASSET_REGISTRY[${entry.id}].portraitPath`
          );
        }
        expect(
          VI_DIACRITIC_REGEX.test(entry.nameEn),
          `GAME_ASSET_REGISTRY[${entry.id}].nameEn leaked VI: ${entry.nameEn}`
        ).toBe(false);
        if (entry.inGameNameEn) {
          expect(
            VI_DIACRITIC_REGEX.test(entry.inGameNameEn),
            `GAME_ASSET_REGISTRY[${entry.id}].inGameNameEn leaked VI: ${entry.inGameNameEn}`
          ).toBe(false);
        }
        if (entry.descEn) {
          expect(
            VI_DIACRITIC_REGEX.test(entry.descEn),
            `GAME_ASSET_REGISTRY[${entry.id}].descEn leaked VI: ${entry.descEn}`
          ).toBe(false);
        }
      }
    });

    it("verifies 111/111 SSoT Glossary Terms and 55/55 Hero Visual Profiles (54 Lihui portraits + Boar + Exclusive Weapons) exist on disk with >64 bytes", () => {
      expect(GUIDE_GLOSSARY).toHaveLength(111);
      for (const term of GUIDE_GLOSSARY) {
        const asset = getAssetByGlossaryId(term.id);
        expect(asset, `Missing asset for glossary term ${term.id}`).toBeDefined();
        assertValidWebpOnDisk(asset!.iconPath, `Glossary[${term.id}].iconPath`);
      }

      const heroProfiles = Object.values(HERO_VISUAL_PROFILES);
      expect(heroProfiles.length).toBeGreaterThanOrEqual(55);

      let lihuiCount = 0;
      let exclusiveWeaponCount = 0;
      for (const profile of heroProfiles) {
        assertValidWebpOnDisk(profile.avatarPath, `Hero[${profile.id}].avatarPath`);
        if (profile.portraitPath) {
          assertValidWebpOnDisk(profile.portraitPath, `Hero[${profile.id}].portraitPath`);
          if (profile.portraitPath.includes("/portraits/Lihui_")) {
            lihuiCount++;
          }
        }
        if (profile.exclusiveWeaponPath) {
          assertValidWebpOnDisk(
            profile.exclusiveWeaponPath,
            `Hero[${profile.id}].exclusiveWeaponPath`
          );
          exclusiveWeaponCount++;
        }
      }

      expect(lihuiCount).toBeGreaterThanOrEqual(54);
      expect(exclusiveWeaponCount).toBeGreaterThanOrEqual(35);
    });

    it("verifies all 94 MediaSpotlightBlocks, 39 VisualDiagramBlocks, and 123 ResponsiveDataTables across 34 articles resolve to valid >64-byte .webp files", () => {
      const articles = getAllArticles();
      expect(articles).toHaveLength(34);

      const spotlights: GuideMediaSpotlightBlock[] = [];
      const diagrams: GuideVisualDiagramBlock[] = [];
      const tables: GuideTableBlock[] = [];

      for (const article of articles) {
        for (const sec of [...article.freeSections, ...article.proSections]) {
          for (const b of sec.blocks) {
            if (b.type === "media_spotlight") spotlights.push(b);
            if (b.type === "visual_diagram") diagrams.push(b);
            if (b.type === "table") tables.push(b);
          }
          for (const sub of sec.subSections ?? []) {
            for (const b of sub.blocks) {
              if (b.type === "media_spotlight") spotlights.push(b);
              if (b.type === "visual_diagram") diagrams.push(b);
              if (b.type === "table") tables.push(b);
            }
          }
        }
      }

      expect(spotlights).toHaveLength(94);
      expect(diagrams).toHaveLength(39);
      expect(tables).toHaveLength(123);

      for (const sp of spotlights) {
        expect(
          MEDIA_SHOWCASE_BY_CODE[sp.mediaCode],
          `Missing explicit showcase mapping for ${sp.mediaCode}`
        ).toBeDefined();
        const items = getMediaShowcaseItems(sp.mediaCode, sp.title, sp.annotations);
        expect(items.length).toBeGreaterThanOrEqual(2);
        expect(items.length).toBeLessThanOrEqual(6);
        for (const item of items) {
          assertValidWebpOnDisk(
            item.iconPath,
            `MediaSpotlight[${sp.mediaCode} -> ${item.assetId}]`
          );
          expect(VI_DIACRITIC_REGEX.test(item.labelEn)).toBe(false);
        }
      }

      for (const diag of diagrams) {
        if (diag.centerNode) {
          const resolved = resolveEntityFromDiagramNode({
            titleVi: diag.centerNode.title.vi,
            titleEn: diag.centerNode.title.en,
            subtitleVi: diag.centerNode.subtitle?.vi,
            subtitleEn: diag.centerNode.subtitle?.en,
            nodeId: diag.centerNode.id,
            mediaCode: diag.mediaCode,
          });
          if (resolved) {
            assertValidWebpOnDisk(
              resolved.iconPath,
              `DiagramCenter[${diag.mediaCode} -> ${resolved.id}]`
            );
          }
        }
        for (const node of diag.nodes ?? []) {
          const resolved = resolveEntityFromDiagramNode({
            titleVi: node.title.vi,
            titleEn: node.title.en,
            subtitleVi: node.subtitle?.vi,
            subtitleEn: node.subtitle?.en,
            nodeId: node.id,
            mediaCode: diag.mediaCode,
          });
          if (resolved) {
            assertValidWebpOnDisk(
              resolved.iconPath,
              `DiagramNode[${diag.mediaCode}:${node.id} -> ${resolved.id}]`
            );
          }
        }
      }

      let resolvedTableCells = 0;
      for (const tbl of tables) {
        for (const row of tbl.rows) {
          const firstCellVi = row[0]?.vi ?? "";
          const firstCellEn = row[0]?.en ?? "";
          const entityVi = resolveEntityFromTableCell(firstCellVi);
          const entityEn = resolveEntityFromTableCell(firstCellEn);
          if (entityVi) {
            assertValidWebpOnDisk(entityVi.iconPath, `TableCellVi[${firstCellVi}]`);
            resolvedTableCells++;
          }
          if (entityEn) {
            assertValidWebpOnDisk(entityEn.iconPath, `TableCellEn[${firstCellEn}]`);
            resolvedTableCells++;
          }
        }
      }
      expect(resolvedTableCells).toBeGreaterThan(100);
    });
  });

  describe("Suite 2: Tier-2 Game Codex 12 Category Shards, Search Index & Canonical Article Link Audit (3,387+ Entities)", () => {
    it("verifies search-index.json (< 45 KB gzip) and all 12 category JSON shards cover all 3,387 game entities with 0 broken .webp paths, 0 Vietnamese leaks in EN, and 100% valid relatedArticleSlugs (GAP-P7-R2-02)", () => {
      const validArticleRouteSet = new Set(
        getAllArticles().map((a) => `${a.categorySlug}/${a.slug}`)
      );
      expect(validArticleRouteSet.size).toBe(34);

      const searchIndexPath = path.join(CODEX_DATA_DIR, "search-index.json");
      expect(
        fs.existsSync(searchIndexPath),
        `Missing Tier-2 search-index.json at ${searchIndexPath}`
      ).toBe(true);

      const rawSearchIndex = fs.readFileSync(searchIndexPath);
      const gzippedSearchIndex = zlib.gzipSync(rawSearchIndex);
      expect(
        gzippedSearchIndex.byteLength,
        `search-index.json gzip size (${gzippedSearchIndex.byteLength} B) exceeds 45 KB budget`
      ).toBeLessThan(45 * 1024);

      const searchPayload = JSON.parse(rawSearchIndex.toString("utf-8")) as {
        totalEntities: number;
        indexedEntities: number;
        categoryCounts: Record<string, number>;
        items: Array<{
          id: string;
          path: string;
          portraitPath?: string;
          nameVi: string;
          nameEn: string;
          communityNameEn: string | null;
          descVi: string;
          descEn: string;
          relatedArticleSlugs: string[];
        }>;
      };

      expect(searchPayload.totalEntities).toBeGreaterThanOrEqual(3387);
      expect(searchPayload.items.length).toBeGreaterThanOrEqual(500);

      for (const item of searchPayload.items) {
        assertValidWebpOnDisk(item.path, `SearchIndex[${item.id}].path`);
        if (item.portraitPath) {
          assertValidWebpOnDisk(item.portraitPath, `SearchIndex[${item.id}].portraitPath`);
        }
        expect(VI_DIACRITIC_REGEX.test(item.nameEn)).toBe(false);
        if (item.communityNameEn) {
          expect(VI_DIACRITIC_REGEX.test(item.communityNameEn)).toBe(false);
        }
        expect(VI_DIACRITIC_REGEX.test(item.descEn)).toBe(false);
        expect(item.relatedArticleSlugs.length).toBeGreaterThan(0);
        for (const routeSlug of item.relatedArticleSlugs) {
          expect(
            validArticleRouteSet.has(routeSlug),
            `SearchIndex[${item.id}] contains non-existent relatedArticleSlug "${routeSlug}"`
          ).toBe(true);
        }
      }

      let totalShardRecords = 0;
      const uniqueGameIds = new Set<number>();

      for (const catId of CODEX_CATEGORIES) {
        const shardPath = path.join(CODEX_DATA_DIR, `${catId}.json`);
        expect(
          fs.existsSync(shardPath),
          `Missing Tier-2 category shard: ${shardPath}`
        ).toBe(true);

        const shardPayload = JSON.parse(fs.readFileSync(shardPath, "utf-8")) as {
          category: string;
          total: number;
          items: Array<{
            id: string;
            gameId: number | null;
            glossaryId: string | null;
            category: string;
            path: string;
            portraitPath?: string;
            nameVi: string;
            nameEn: string;
            communityNameEn: string | null;
            descVi: string;
            descEn: string;
            relatedArticleSlugs: string[];
          }>;
        };

        expect(shardPayload.category).toBe(catId);
        expect(shardPayload.items.length).toBeGreaterThan(0);
        expect(shardPayload.total).toBe(shardPayload.items.length);
        totalShardRecords += shardPayload.items.length;

        for (const rec of shardPayload.items) {
          if (typeof rec.gameId === "number") {
            uniqueGameIds.add(rec.gameId);
          }
          assertValidWebpOnDisk(rec.path, `CodexShard[${catId}:${rec.id}].path`);
          if (rec.portraitPath) {
            assertValidWebpOnDisk(
              rec.portraitPath,
              `CodexShard[${catId}:${rec.id}].portraitPath`
            );
          }

          // GAP-P5-02: Zero raw sprite names
          expect(
            RAW_SPRITE_NAME_REGEX.test(rec.nameEn.trim()),
            `Raw sprite nameEn detected in ${catId}:${rec.id} => "${rec.nameEn}"`
          ).toBe(false);
          expect(
            RAW_SPRITE_NAME_REGEX.test(rec.nameVi.trim()),
            `Raw sprite nameVi detected in ${catId}:${rec.id} => "${rec.nameVi}"`
          ).toBe(false);

          // GAP-05 / GAP-P5-03: Non-empty bilingual descriptions
          expect(rec.descVi.trim().length).toBeGreaterThan(0);
          expect(rec.descEn.trim().length).toBeGreaterThan(0);

          // GAP-01: Zero Vietnamese diacritics in English fields
          expect(
            VI_DIACRITIC_REGEX.test(rec.nameEn),
            `CodexShard[${catId}:${rec.id}].nameEn leaked VI: ${rec.nameEn}`
          ).toBe(false);
          if (rec.communityNameEn) {
            expect(
              VI_DIACRITIC_REGEX.test(rec.communityNameEn),
              `CodexShard[${catId}:${rec.id}].communityNameEn leaked VI: ${rec.communityNameEn}`
            ).toBe(false);
          }
          expect(
            VI_DIACRITIC_REGEX.test(rec.descEn),
            `CodexShard[${catId}:${rec.id}].descEn leaked VI: ${rec.descEn}`
          ).toBe(false);

          // GAP-P7-R2-02: Every relatedArticleSlug must match one of the 31 canonical article routes
          expect(rec.relatedArticleSlugs.length).toBeGreaterThan(0);
          for (const routeSlug of rec.relatedArticleSlugs) {
            expect(
              validArticleRouteSet.has(routeSlug),
              `CodexShard[${catId}:${rec.id}] contains broken 404 relatedArticleSlug "${routeSlug}"`
            ).toBe(true);
          }
        }
      }

      expect(totalShardRecords).toBeGreaterThanOrEqual(3387);
      expect(uniqueGameIds.size).toBeGreaterThanOrEqual(2780);
    });
  });

  describe("Suite 3: Full-Matrix Render & Interactive State Audit — 31 Articles × 2 Locales, 8 Widgets × 2 Locales & Codex × 2 Locales (GAP-01..04, GAP-P7-R2-01..04, GAP-P7-R2-07)", () => {
    it("verifies all 8 Interactive Widgets render in BOTH locale='en' and locale='vi' with valid disk-backed .webp images, GAP-01 Bilingual Purity (including interactive state expansions), and GAP-03 De-Boxing", () => {
      const articles = getAllArticles();
      const findArticle = (code: string) => articles.find((a) => a.code === code)!;

      for (const locale of ["en", "vi"] as const) {
        activeMockLocale = locale;
        const widgetConfigs = [
          {
            name: `HeroEncyclopediaWidget[${locale}]`,
            el: <HeroEncyclopediaWidget article={findArticle("2.1")} locale={locale} />,
          },
          {
            name: `TacticalFormationBoardWidget[${locale}]`,
            el: (
              <TacticalFormationBoardWidget
                article={findArticle("2.2")}
                locale={locale}
                forceUnlockPro={true}
              />
            ),
          },
          {
            name: `AccountTrapsTriageWidget[${locale}]`,
            el: (
              <AccountTrapsTriageWidget
                article={findArticle("1.4")}
                locale={locale}
                forceUnlockPro={true}
              />
            ),
          },
          {
            name: `BiweeklyCalendarWidget[${locale}]`,
            el: <BiweeklyCalendarWidget article={findArticle("3.1")} locale={locale} />,
          },
          {
            name: `HordePivotStepperWidget[${locale}]`,
            el: (
              <HordePivotStepperWidget
                article={findArticle("4.2")}
                locale={locale}
                forceUnlockPro={true}
              />
            ),
          },
          {
            name: `BlacksmithAnvilMatrixWidget[${locale}]`,
            el: (
              <BlacksmithAnvilMatrixWidget
                article={findArticle("5.2")}
                locale={locale}
                forceUnlockPro={true}
              />
            ),
          },
          {
            name: `ShopSafetyFloorWidget[${locale}]`,
            el: (
              <ShopSafetyFloorWidget
                article={findArticle("7.1")}
                locale={locale}
                forceUnlockPro={true}
              />
            ),
          },
          {
            name: `MasterDataExplorerWidget[${locale}]`,
            el: (
              <MasterDataExplorerWidget
                article={findArticle("8.4")}
                locale={locale}
                forceUnlockPro={true}
              />
            ),
          },
        ];

        for (const { name, el } of widgetConfigs) {
          const { container, unmount } = render(el);

          if (locale === "en") {
            expect(
              VI_DIACRITIC_REGEX.test(container.textContent ?? ""),
              `${name} leaked Vietnamese diacritics in locale="en"`
            ).toBe(false);
          } else {
            expect(
              VI_DIACRITIC_REGEX.test(container.textContent ?? ""),
              `${name} must render authentic Vietnamese diacritics in locale="vi"`
            ).toBe(true);
          }

          expect(container.innerHTML).not.toMatch(/\bborder-l-[24]\b|\brounded-l-sm\b/);

          const imgs = Array.from(container.querySelectorAll("img"));
          expect(imgs.length, `${name} must render game asset images`).toBeGreaterThan(0);
          for (const img of imgs) {
            const src = img.getAttribute("src") ?? "";
            assertValidWebpOnDisk(src, `${name} rendered <img>`);
            expect(img.getAttribute("loading")).toBe("lazy");
            expect(img.getAttribute("decoding")).toBe("async");
          }

          unmount();
        }
      }

      // GAP-P7-R2-07: Interactive state mutation check in locale="en" (Popover + Widget tab toggles)
      activeMockLocale = "en";
      const { container: richContainer, unmount: unmountRich } = render(
        <RichGuideText text="Always save `Diamonds` and `Soul Stone` for `Wanderer`." />
      );
      const firstChipBtn = richContainer.querySelector("code button");
      if (firstChipBtn) {
        fireEvent.click(firstChipBtn);
        expect(VI_DIACRITIC_REGEX.test(document.body.textContent ?? "")).toBe(false);
      }
      unmountRich();
    });

    it("verifies <GameCodexClient /> and <CodexEntityDrawer /> render in BOTH locale='en' and locale='vi' with 0 broken images, 0 Vietnamese leaks in EN, and valid drawer interactions (GAP-P7-R2-01)", async () => {
      for (const locale of ["en", "vi"] as const) {
        activeMockLocale = locale;
        const { container, unmount } = render(<GameCodexClient locale={locale} />);

        await waitFor(() => {
          expect(container.querySelectorAll("img").length).toBeGreaterThan(0);
        });

        if (locale === "en") {
          expect(
            VI_DIACRITIC_REGEX.test(container.textContent ?? ""),
            `GameCodexClient leaked Vietnamese in locale="en"`
          ).toBe(false);
        } else {
          expect(
            VI_DIACRITIC_REGEX.test(container.textContent ?? ""),
            `GameCodexClient must render Vietnamese text in locale="vi"`
          ).toBe(true);
        }

        expect(container.innerHTML).not.toMatch(/\bborder-l-[24]\b|\brounded-l-sm\b/);

        const imgs = Array.from(container.querySelectorAll("img"));
        for (const img of imgs) {
          assertValidWebpOnDisk(
            img.getAttribute("src") ?? undefined,
            `GameCodexClient[${locale}] <img>`
          );
          expect(img.getAttribute("loading")).toBe("lazy");
          expect(img.getAttribute("decoding")).toBe("async");
        }

        // Open CodexEntityDrawer by clicking the first entity card inside the grid
        const gridCards = Array.from(
          container.querySelectorAll("[data-testid='codex-entity-card']")
        );
        expect(gridCards.length).toBeGreaterThan(0);
        fireEvent.click(gridCards[0]!);

        const dialog = await screen.findByRole("dialog");
        expect(dialog).toBeDefined();
        if (locale === "en") {
          expect(
            VI_DIACRITIC_REGEX.test(dialog.textContent ?? ""),
            `CodexEntityDrawer leaked Vietnamese in locale="en"`
          ).toBe(false);
        } else {
          expect(
            VI_DIACRITIC_REGEX.test(dialog.textContent ?? ""),
            `CodexEntityDrawer must render Vietnamese text in locale="vi"`
          ).toBe(true);
        }

        unmount();
      }
    });

    it(
      "verifies all 31 Articles render in locale='en' with 0 broken images, 0 Vietnamese leaks (GAP-01), preserved <code> textContent (GAP-02), and 0 border-l-2/4 (GAP-03)",
      () => {
        activeMockLocale = "en";
        for (const article of getAllArticles()) {
          const { container, unmount } = render(
            <GuideArticleRenderer article={article} locale="en" />
          );

          expect(
            VI_DIACRITIC_REGEX.test(container.textContent ?? ""),
            `Article ${article.code} leaked Vietnamese in locale="en"`
          ).toBe(false);

          const codeImgs = Array.from(container.querySelectorAll("code img"));
          for (const cImg of codeImgs) {
            expect(cImg.getAttribute("alt")).toBe("");
            expect(cImg.getAttribute("aria-hidden")).toBe("true");
          }

          expect(container.innerHTML).not.toMatch(/\bborder-l-[24]\b|\brounded-l-sm\b/);

          const allImgs = Array.from(container.querySelectorAll("img"));
          expect(allImgs.length).toBeGreaterThan(0);
          for (const img of allImgs) {
            assertValidWebpOnDisk(
              img.getAttribute("src") ?? undefined,
              `Article[${article.code}][en] <img>`
            );
            expect(img.getAttribute("loading")).toBe("lazy");
            expect(img.getAttribute("decoding")).toBe("async");
          }

          unmount();
        }
      },
      30_000
    );

    it(
      "verifies all 31 Articles render in locale='vi' with authentic Vietnamese prose, valid Vietnamese token icon resolution, 0 broken images, and 0 border-l-2/4 (GAP-P7-R2-03)",
      () => {
        activeMockLocale = "vi";
        for (const article of getAllArticles()) {
          const { container, unmount } = render(
            <GuideArticleRenderer article={article} locale="vi" />
          );

          expect(
            VI_DIACRITIC_REGEX.test(container.textContent ?? ""),
            `Article ${article.code} must contain authentic Vietnamese diacritics in locale="vi"`
          ).toBe(true);

          const codeImgs = Array.from(container.querySelectorAll("code img"));
          for (const cImg of codeImgs) {
            expect(cImg.getAttribute("alt")).toBe("");
            expect(cImg.getAttribute("aria-hidden")).toBe("true");
          }

          expect(container.innerHTML).not.toMatch(/\bborder-l-[24]\b|\brounded-l-sm\b/);

          const allImgs = Array.from(container.querySelectorAll("img"));
          expect(allImgs.length).toBeGreaterThan(0);
          for (const img of allImgs) {
            assertValidWebpOnDisk(
              img.getAttribute("src") ?? undefined,
              `Article[${article.code}][vi] <img>`
            );
            expect(img.getAttribute("loading")).toBe("lazy");
            expect(img.getAttribute("decoding")).toBe("async");
          }

          unmount();
        }
      },
      30_000
    );
  });

  describe("Suite 4: Security (GAP-06), Route/Fallback Safety (GAP-05) & Bundle/CLS Static Audit (GAP-04)", () => {
    it("guards normalizeSearchQuery, parseCodexUrlParams, GuidesHubClient, GameCodexClient, and ResponsiveDataTable against adversarial Regex / XSS strings '[*(?\\+^$' (GAP-06)", async () => {
      activeMockLocale = "en";
      const adversarialQuery = "[*(?\\+^$<script>alert(1)</script>";

      // Direct unit check on normalizeSearchQuery & parseCodexUrlParams
      expect(() => normalizeSearchQuery(adversarialQuery)).not.toThrow();
      const parsedMaliciousParams = parseCodexUrlParams({
        cat: "DROP_TABLE_USERS",
        rarity: "INVALID_RARITY",
        faction: "INVALID_FACTION",
        q: adversarialQuery,
        page: "-999",
      });
      expect(parsedMaliciousParams.category).toBe("all");
      expect(parsedMaliciousParams.rarity).toBe("all");
      expect(parsedMaliciousParams.faction).toBe("all");
      expect(parsedMaliciousParams.page).toBe(1);

      // GuidesHubClient search input check
      const { container: hubContainer, unmount: unmountHub } = render(
        <GuidesHubClient locale="en" />
      );
      const hubInput = hubContainer.querySelector("input");
      expect(hubInput).not.toBeNull();
      expect(() => {
        fireEvent.change(hubInput!, { target: { value: adversarialQuery } });
      }).not.toThrow();
      expect(VI_DIACRITIC_REGEX.test(hubContainer.textContent ?? "")).toBe(false);
      unmountHub();

      // GameCodexClient search input check
      const { container: codexContainer, unmount: unmountCodex } = render(
        <GameCodexClient locale="en" />
      );
      await waitFor(() => {
        expect(codexContainer.querySelector("input")).not.toBeNull();
      });
      const codexInput = codexContainer.querySelector("input")!;
      expect(() => {
        fireEvent.change(codexInput, { target: { value: adversarialQuery } });
      }).not.toThrow();
      unmountCodex();

      // ResponsiveDataTable search input check
      const { container: tableContainer, unmount: unmountTable } = render(
        <ResponsiveDataTable
          headers={["Hero", "Role"]}
          rows={Array.from({ length: 10 }, (_, idx) => [
            `Wanderer ${idx + 1}`,
            "Damage Dealer",
          ])}
          locale="en"
        />
      );
      const tableInput = tableContainer.querySelector("input");
      if (tableInput) {
        expect(() => {
          fireEvent.change(tableInput, { target: { value: adversarialQuery } });
        }).not.toThrow();
      }
      unmountTable();

      // GAP-05: GuidesSidebar on /guides/codex highlights Codex link and keeps group-1 open
      mockPathname.mockReturnValue("/guides/codex");
      const { container: sidebarContainer, unmount: unmountSidebar } = render(
        <GuidesSidebar />
      );
      expect(sidebarContainer.innerHTML).not.toMatch(/\bborder-l-[24]\b|\brounded-l-sm\b/);
      const activeCodexLink = sidebarContainer.querySelector('a[href="/guides/codex"]');
      expect(activeCodexLink).not.toBeNull();
      expect(activeCodexLink?.getAttribute("aria-current")).toBe("page");
      unmountSidebar();

      // GAP-05: GameAssetFrame onError switches cleanly to inline SVG fallback
      const { container: frameContainer, unmount: unmountFrame } = render(
        <GameAssetFrame
          src="/images/heroes/avatars/Head_10047.webp"
          rarity="mythic"
          faction="horde"
          size="md"
          alt=""
        />
      );
      const img = frameContainer.querySelector("img")!;
      fireEvent.error(img);
      expect(
        frameContainer.querySelector("[data-testid='asset-frame-fallback']")
      ).not.toBeNull();
      unmountFrame();
    });

    it("enforces static source guards across src/: 0 manifest.json imports, 0 GAP-03 forbidden classes, and explicit width/height/lazy/async on 100% of <img> tags", () => {
      const allSrcFiles = collectSourceFiles(SRC_DIR, [".ts", ".tsx"]);
      expect(allSrcFiles.length).toBeGreaterThan(50);

      for (const filePath of allSrcFiles) {
        const content = fs.readFileSync(filePath, "utf-8");
        const rel = path.relative(SRC_DIR, filePath);
        expect(
          /import\s+.*manifest\.json|require\(['"].*manifest\.json['"]\)/.test(content),
          `${rel} must NOT statically import manifest.json into client bundle`
        ).toBe(false);
        expect(
          /import\s+.*public\/data\/codex/.test(content),
          `${rel} must NOT statically import public/data/codex shards`
        ).toBe(false);
      }

      const guidesComponentsDir = path.join(SRC_DIR, "components", "guides");
      const guideTsxFiles = collectSourceFiles(guidesComponentsDir, [".tsx"]);
      const violations: string[] = [];

      for (const filePath of guideTsxFiles) {
        const content = fs.readFileSync(filePath, "utf-8");
        const rel = path.relative(guidesComponentsDir, filePath);

        if (/\bborder-l-2\b|\bborder-l-4\b|\brounded-l-sm\b/.test(content)) {
          violations.push(`${rel}: contains forbidden GAP-03 class`);
        }

        const imgTags = content.match(/<img\b[\s\S]*?\/>/g) ?? [];
        imgTags.forEach((tag, idx) => {
          if (!/\bwidth=\{/.test(tag) && !/\bwidth="/.test(tag)) {
            violations.push(`${rel} [img #${idx + 1}]: missing explicit width`);
          }
          if (!/\bheight=\{/.test(tag) && !/\bheight="/.test(tag)) {
            violations.push(`${rel} [img #${idx + 1}]: missing explicit height`);
          }
          if (!/\bloading="lazy"/.test(tag)) {
            violations.push(`${rel} [img #${idx + 1}]: missing loading="lazy"`);
          }
          if (!/\bdecoding="async"/.test(tag)) {
            violations.push(`${rel} [img #${idx + 1}]: missing decoding="async"`);
          }
        });
      }

      expect(violations).toEqual([]);
    });
  });
});

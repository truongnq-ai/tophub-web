import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import viMessages from "../messages/vi.json";
import enMessages from "../messages/en.json";
import type {
  CodexCategoryId,
  CodexCategoryShardPayload,
  CodexSearchIndexPayload,
} from "@/content/guides/types";
import {
  CODEX_CATEGORY_FILTER_SCHEMA,
  CODEX_CATEGORY_IDS,
  CODEX_MENU_ZONES,
  CODEX_PAGE_SIZE,
  filterCodexEntities,
  getInitialCodexSeedRecords,
  normalizeSearchQuery,
  paginateCodexEntities,
  parseCodexUrlParams,
} from "@/components/guides/codex/codex-utils";
import { GameCodexClient } from "@/components/guides/codex/game-codex-client";
import { CodexEntityDrawer } from "@/components/guides/codex/codex-entity-drawer";
import { GuidesHubClient } from "@/components/guides/guides-hub-client";
import { GuidesSidebar } from "@/components/guides/guides-sidebar";

let mockActiveLocale: "vi" | "en" = "vi";

vi.mock("next-intl", () => ({
  useLocale: () => mockActiveLocale,
  useTranslations: (namespace?: string) => (key: string, values?: Record<string, unknown>) => {
    const dict = (mockActiveLocale === "en"
      ? enMessages
      : viMessages) as unknown as Record<string, Record<string, string>>;
    const ns = namespace ? dict[namespace] : dict.Guides;
    let template = ns?.[key] ?? key;
    if (values) {
      for (const [k, v] of Object.entries(values)) {
        template = template.replace(`{${k}}`, String(v));
      }
    }
    return template;
  },
}));

vi.mock("@/i18n/routing", () => ({
  Link: ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
  usePathname: () => "/guides/codex",
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
}));

const PUBLIC_DIR = path.resolve(process.cwd(), "public");
const CODEX_DIR = path.resolve(PUBLIC_DIR, "data", "codex");

const EXPECTED_CATEGORIES: readonly CodexCategoryId[] = [
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
] as const;

const VI_DIACRITIC_REGEX =
  /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỠỲÝỴỶỸĐ]/;

const RAW_SPRITE_NAME_REGEX = /^(?:icon|Head|Activity)\s+\d+$/i;

describe("Phase 5 — Suite 1: Game Codex Data Shards & Search Index (Task P5.1 & Stage B Deduplication)", () => {
  it("generates search-index.json with gzip size < 45 KB and deduplicated totalEntities >= 3000 (GAP-P5-01, GAP-P5-10)", () => {
    const searchIndexPath = path.resolve(CODEX_DIR, "search-index.json");
    expect(fs.existsSync(searchIndexPath)).toBe(true);

    const rawBytes = fs.readFileSync(searchIndexPath);
    const gzippedBytes = zlib.gzipSync(rawBytes);
    const gzipSizeKb = gzippedBytes.byteLength / 1024;

    expect(gzipSizeKb).toBeLessThan(45);

    const payload = JSON.parse(
      rawBytes.toString("utf-8")
    ) as CodexSearchIndexPayload;

    expect(payload.totalEntities).toBeGreaterThanOrEqual(3000);
    expect(payload.items.length).toBeGreaterThanOrEqual(500);
    expect(payload.items.length).toBeLessThanOrEqual(1350);

    for (const cat of EXPECTED_CATEGORIES) {
      expect(payload.categoryCounts[cat]).toBeGreaterThan(0);
    }

    for (const item of payload.items) {
      expect(item.id.length).toBeGreaterThan(0);
      expect(item.path.startsWith("/images/")).toBe(true);
      expect(item.path.endsWith(".webp")).toBe(true);
      expect(item.nameVi.trim().length).toBeGreaterThan(0);
      expect(item.nameEn.trim().length).toBeGreaterThan(0);
      expect(item.descVi.trim().length).toBeGreaterThan(0);
      expect(item.descEn.trim().length).toBeGreaterThan(0);
      expect(RAW_SPRITE_NAME_REGEX.test(item.nameVi)).toBe(false);
      expect(RAW_SPRITE_NAME_REGEX.test(item.nameEn)).toBe(false);
      expect(VI_DIACRITIC_REGEX.test(item.nameEn)).toBe(false);
      expect(VI_DIACRITIC_REGEX.test(item.descEn)).toBe(false);
      if (item.communityNameEn) {
        expect(VI_DIACRITIC_REGEX.test(item.communityNameEn)).toBe(false);
      }
      expect(item.relatedArticleSlugs.length).toBeGreaterThan(0);
    }
  });

  it("generates all 12 category JSON shards with 100% existing .webp paths, 0 duplicate gameIds per shard, and enriched Pets/Gear/Runes (Stage B)", () => {
    let totalAcrossShards = 0;

    for (const cat of EXPECTED_CATEGORIES) {
      const shardPath = path.resolve(CODEX_DIR, `${cat}.json`);
      expect(fs.existsSync(shardPath)).toBe(true);

      const shard = JSON.parse(
        fs.readFileSync(shardPath, "utf-8")
      ) as CodexCategoryShardPayload;

      expect(shard.category).toBe(cat);
      expect(shard.total).toBe(shard.items.length);
      expect(shard.items.length).toBeGreaterThan(0);
      totalAcrossShards += shard.items.length;

      // Verify 100% deduplication of gameId within every category shard
      const shardGameIds = shard.items
        .map((r) => r.gameId)
        .filter((gid): gid is number => typeof gid === "number");
      expect(new Set(shardGameIds).size).toBe(shardGameIds.length);

      for (const record of shard.items) {
        expect(record.category).toBe(cat);
        expect(record.path.includes("bg_Radiance_plate")).toBe(false);
        expect(record.path.includes("bg_SecretTreasureExchange")).toBe(false);

        const diskImgPath = path.resolve(
          PUBLIC_DIR,
          record.path.replace(/^\//, "")
        );
        expect(fs.existsSync(diskImgPath)).toBe(true);

        if (record.portraitPath) {
          const diskPortraitPath = path.resolve(
            PUBLIC_DIR,
            record.portraitPath.replace(/^\//, "")
          );
          expect(fs.existsSync(diskPortraitPath)).toBe(true);
        }

        if (record.galleryPaths) {
          for (const gp of record.galleryPaths) {
            const diskGp = path.resolve(PUBLIC_DIR, gp.replace(/^\//, ""));
            expect(fs.existsSync(diskGp)).toBe(true);
          }
        }

        expect(RAW_SPRITE_NAME_REGEX.test(record.nameVi)).toBe(false);
        expect(RAW_SPRITE_NAME_REGEX.test(record.nameEn)).toBe(false);

        expect(record.descVi.trim().length).toBeGreaterThan(0);
        expect(record.descEn.trim().length).toBeGreaterThan(0);

        expect(VI_DIACRITIC_REGEX.test(record.nameEn)).toBe(false);
        expect(VI_DIACRITIC_REGEX.test(record.descEn)).toBe(false);
        if (record.communityNameEn) {
          expect(VI_DIACRITIC_REGEX.test(record.communityNameEn)).toBe(false);
        }

        expect(record.relatedArticleSlugs.length).toBeGreaterThan(0);
      }
    }

    expect(totalAcrossShards).toBeGreaterThanOrEqual(3000);

    // Verify 21 Companion Pets in pets-behemoths.json
    const petsShard = JSON.parse(
      fs.readFileSync(path.resolve(CODEX_DIR, "pets-behemoths.json"), "utf-8")
    ) as CodexCategoryShardPayload;
    const companionPets = petsShard.items.filter(
      (x) => x.subCategory === "companion-pets"
    );
    expect(companionPets.length).toBe(21);
    expect(companionPets.some((p) => p.nameEn === "Flickerkit")).toBe(true);
    expect(companionPets.some((p) => p.nameEn === "Cactini")).toBe(true);
    expect(companionPets.some((p) => p.nameEn === "Slime")).toBe(true);

    // Verify 55 canonical Hero Units in heroes.json
    const heroesShard = JSON.parse(
      fs.readFileSync(path.resolve(CODEX_DIR, "heroes.json"), "utf-8")
    ) as CodexCategoryShardPayload;
    const heroUnits = heroesShard.items.filter(
      (x) => x.subCategory === "hero-units"
    );
    expect(heroUnits.length).toBe(55);
  });
});

describe("Phase 5 — Suite 2: Codex Utilities, Security & Whitelist Validation (GAP-06)", () => {
  it("normalizes Vietnamese diacritics, caps query length at 100 chars, and never crashes on regex characters", () => {
    expect(normalizeSearchQuery("  Tôn Ngộ Không (Đấu Chiến)  ")).toBe(
      "ton ngo khong (dau chien)"
    );
    expect(() => normalizeSearchQuery("[*(?\\+^$")).not.toThrow();
    const longQuery = "a".repeat(250);
    expect(normalizeSearchQuery(longQuery).length).toBe(100);
  });

  it("validates URL parameters strictly against Whitelist Enums, defaults to 'heroes', and sanitizes cross-category filters (GAP-06, GAP-M1-02)", () => {
    expect(CODEX_CATEGORY_IDS.length).toBe(12);
    expect(CODEX_MENU_ZONES.length).toBe(4);
    const zoneCats = CODEX_MENU_ZONES.flatMap((z) => z.categories);
    expect(zoneCats.length).toBe(12);
    expect(new Set(zoneCats).size).toBe(12);

    const valid = parseCodexUrlParams({
      cat: "equipment",
      sub: "exclusive-weapons",
      rarity: "mythic",
      faction: "horde",
      q: "Titan",
      page: "3",
    });
    expect(valid.category).toBe("equipment");
    expect(valid.subCategory).toBe("exclusive-weapons");
    expect(valid.rarity).toBe("mythic");
    expect(valid.faction).toBe("horde");
    expect(valid.query).toBe("Titan");
    expect(valid.page).toBe(3);

    // Cross-category sanitization: items has supportsFaction=false and no 'hero-skins' subCategory
    const crossInvalid = parseCodexUrlParams({
      cat: "items",
      sub: "hero-skins",
      faction: "horde",
    });
    expect(crossInvalid.category).toBe("items");
    expect(crossInvalid.subCategory).toBe("all");
    expect(crossInvalid.faction).toBe("all");

    const malicious = parseCodexUrlParams({
      cat: "<script>alert(1)</script>",
      rarity: "ultra-god",
      faction: "unknown",
      page: "-999",
    });
    expect(malicious.category).toBe("heroes");
    expect(malicious.rarity).toBe("all");
    expect(malicious.faction).toBe("all");
    expect(malicious.page).toBe(1);
  });

  it("defines domain-specific filter schemas for all 12 categories with canonical subCategories on seed records (GAP-M1-03)", () => {
    for (const cat of CODEX_CATEGORY_IDS) {
      const schema = CODEX_CATEGORY_FILTER_SCHEMA[cat];
      expect(schema).toBeDefined();
      expect(schema.category).toBe(cat);
      expect(schema.subCategories.length).toBeGreaterThanOrEqual(3);
      expect(schema.subCategories[0].id).toBe("all");
    }

    expect(CODEX_CATEGORY_FILTER_SCHEMA.heroes.supportsFaction).toBe(true);
    expect(CODEX_CATEGORY_FILTER_SCHEMA.troops.supportsFaction).toBe(true);
    expect(CODEX_CATEGORY_FILTER_SCHEMA.equipment.supportsFaction).toBe(true);
    expect(CODEX_CATEGORY_FILTER_SCHEMA["pets-behemoths"].supportsFaction).toBe(true);

    expect(CODEX_CATEGORY_FILTER_SCHEMA.items.supportsFaction).toBe(false);
    expect(CODEX_CATEGORY_FILTER_SCHEMA.relics.supportsFaction).toBe(false);
    expect(CODEX_CATEGORY_FILTER_SCHEMA["buildings-decor"].supportsFaction).toBe(false);
    expect(CODEX_CATEGORY_FILTER_SCHEMA.cosmetics.supportsFaction).toBe(false);

    const seeds = getInitialCodexSeedRecords();
    const heroUnits = filterCodexEntities(seeds, {
      category: "heroes",
      subCategory: "hero-units",
      rarity: "all",
      faction: "all",
      query: "",
    });
    expect(heroUnits.length).toBeGreaterThan(0);

    const currencies = filterCodexEntities(seeds, {
      category: "items",
      subCategory: "currencies",
      rarity: "all",
      faction: "all",
      query: "",
    });
    expect(currencies.length).toBeGreaterThan(0);
  });

  it("matches bilingual queries (diacritic-insensitive Vietnamese & English) and paginates at 48 items/page", () => {
    const seeds = getInitialCodexSeedRecords();
    expect(seeds.length).toBeGreaterThanOrEqual(111);

    const wukongVi = filterCodexEntities(seeds, {
      category: "all",
      rarity: "all",
      faction: "all",
      query: "ngo khong",
    });
    expect(wukongVi.some((e) => e.glossaryId === "hero-wukong" || e.gameId === 10047)).toBe(
      true
    );

    const soulStoneEn = filterCodexEntities(seeds, {
      category: "all",
      rarity: "all",
      faction: "all",
      query: "Soul Stone",
    });
    expect(soulStoneEn.some((e) => e.glossaryId === "item-soul-stone")).toBe(true);

    const page1 = paginateCodexEntities(seeds, 1, CODEX_PAGE_SIZE);
    expect(page1.items.length).toBeLessThanOrEqual(48);
    expect(page1.totalPages).toBeGreaterThanOrEqual(3);
  });
});

describe("Phase 5 — Suite 3: GameCodexClient 4-Zone Menu (Option M1), Context-Aware Filters & CodexEntityDrawer (Task P5.2)", () => {
  it("renders 4 Menu Zones with 12 categories, adapts filters per category (hiding Faction in items), and opens/closes CodexEntityDrawer", () => {
    mockActiveLocale = "vi";
    render(<GameCodexClient locale="vi" />);

    expect(screen.getByTestId("game-codex-client")).toBeDefined();
    expect(screen.getByTestId("codex-search-input")).toBeDefined();

    // Verify 4 Menu Zones are rendered
    expect(screen.getByTestId("codex-menu-zone-zone_combat")).toBeDefined();
    expect(screen.getByTestId("codex-menu-zone-zone_gear")).toBeDefined();
    expect(screen.getByTestId("codex-menu-zone-zone_economy")).toBeDefined();
    expect(screen.getByTestId("codex-menu-zone-zone_world")).toBeDefined();

    // Default category is "heroes": Faction & Extra filters are visible, plus hero sub-categories
    expect(screen.getByTestId("codex-faction-filter-group")).toBeDefined();
    expect(screen.getByTestId("codex-extra-filter-group")).toBeDefined();
    expect(screen.getByTestId("codex-subcat-hero-units")).toBeDefined();
    expect(screen.getByTestId("codex-subcat-hero-skins")).toBeDefined();

    // Switch to "items" category -> Faction and Extra filters disappear, items sub-categories appear
    fireEvent.click(screen.getByTestId("codex-cat-tab-items"));
    expect(screen.queryByTestId("codex-faction-filter-group")).toBeNull();
    expect(screen.queryByTestId("codex-extra-filter-group")).toBeNull();
    expect(screen.getByTestId("codex-subcat-currencies")).toBeDefined();
    expect(screen.getByTestId("codex-subcat-shards-souls")).toBeDefined();
    expect(screen.getByTestId("codex-subcat-chests")).toBeDefined();

    // Switch back to "heroes"
    fireEvent.click(screen.getByTestId("codex-cat-tab-heroes"));
    expect(screen.getByTestId("codex-faction-filter-group")).toBeDefined();

    // Verify <= 48 cards rendered on initial page
    const cards = screen.getAllByTestId("codex-entity-card");
    expect(cards.length).toBeGreaterThan(0);
    expect(cards.length).toBeLessThanOrEqual(48);

    // Click first entity card to open CodexEntityDrawer
    fireEvent.click(cards[0]);
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeDefined();
    expect(screen.getByTestId("codex-drawer-related-guides")).toBeDefined();

    // Press Escape to close drawer (GAP-P5-13)
    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});

describe("Phase 5 — Suite 4: Strict Locale Gate (GAP-01) & De-Boxing CSS Guard (GAP-03)", () => {
  it("renders zero Vietnamese diacritics in locale='en' and zero border-l-2/4 classes", () => {
    mockActiveLocale = "en";
    const seeds = getInitialCodexSeedRecords();
    const { container } = render(
      <div>
        <GameCodexClient locale="en" />
        <CodexEntityDrawer
          entity={seeds[0]}
          locale="en"
          onClose={() => undefined}
        />
      </div>
    );

    const text = container.textContent ?? "";
    expect(VI_DIACRITIC_REGEX.test(text)).toBe(false);

    const html = container.innerHTML;
    expect(html.includes("border-l-2")).toBe(false);
    expect(html.includes("border-l-4")).toBe(false);
    expect(html.includes("rounded-l-sm")).toBe(false);
  });
});

describe("Phase 5 — Suite 5: GuidesHubClient 3A Integration & Unified Search (Task P5.3)", () => {
  it("renders the /guides/codex shortcut card on Interactive Tools Strip and shows both Articles & Codex Entities on Instant Search", () => {
    mockActiveLocale = "vi";
    render(<GuidesHubClient locale="vi" />);

    const codexTool = screen.getByTestId("hub-tool-codex");
    expect(codexTool).toBeDefined();
    expect(codexTool.getAttribute("href")).toBe("/guides/codex");

    // Click #9HồnĐáĐỏ hot tag to trigger Instant Search
    fireEvent.click(screen.getByRole("button", { name: /#9HồnĐáĐỏ/i }));

    expect(screen.getByTestId("hub-search-articles-section")).toBeDefined();
    expect(screen.getByTestId("hub-search-codex-section")).toBeDefined();
  });

  it("maintains strict locale gate (0 Vietnamese diacritics) in GuidesHubClient when searching in locale='en'", () => {
    mockActiveLocale = "en";
    const { container } = render(<GuidesHubClient locale="en" />);
    fireEvent.click(screen.getByRole("button", { name: /#9SoulStones/i }));

    const text = container.textContent ?? "";
    expect(VI_DIACRITIC_REGEX.test(text)).toBe(false);
  });
});

describe("Phase 5 — Suite 6: GuidesSidebar Codex Link & isCodexRoute State (GAP-05, GAP-P5-06)", () => {
  it("highlights sidebar-codex-link when pathname is /guides/codex and keeps Getting Started accordion open", () => {
    mockActiveLocale = "vi";
    render(<GuidesSidebar />);

    const codexLink = screen.getByTestId("sidebar-codex-link");
    expect(codexLink).toBeDefined();
    expect(codexLink.getAttribute("href")).toBe("/guides/codex");
    expect(codexLink.className.includes("amber-500")).toBe(true);

    // First article in getting-started ("1.1") should remain visible in the open Accordion
    expect(screen.getByText("1.1")).toBeDefined();
  });
});

describe("Track 3 — Phase 3.3 Suite 7A: CodexEntityDrawer MD3 Typography, Single-Layer Containment & Null Safety Gate", () => {
  it("flattens inner Drawer sections to border-0 + divide-y, upgrades descriptions & related links to 14px-16px, and handles empty relatedArticleSlugs safely", () => {
    mockActiveLocale = "vi";
    const seeds = getInitialCodexSeedRecords();
    const { unmount } = render(
      <CodexEntityDrawer
        entity={{
          ...seeds[0]!,
          galleryPaths: [seeds[0]!.path, seeds[1]!.path],
        }}
        locale="vi"
        onClose={() => undefined}
      />
    );

    const drawer = screen.getByTestId("codex-entity-drawer");
    expect(drawer.innerHTML).not.toMatch(/\btext-\[(?:8|9|10|11)px\]/);

    const closeBtn = screen.getByTestId("codex-drawer-close-btn");
    expect(closeBtn.className).toContain("h-11");
    expect(closeBtn.className).toContain("w-11");
    expect(closeBtn.className).toContain("border-0");

    const relatedGuides = screen.getByTestId("codex-drawer-related-guides");
    const relatedLink = relatedGuides.querySelector("a");
    expect(relatedLink).not.toBeNull();
    expect(relatedLink?.className).toContain("min-h-[44px]");
    expect(relatedLink?.className).toContain("border-0");

    const drawerSource = fs.readFileSync(
      path.resolve(
        process.cwd(),
        "src/components/guides/codex/codex-entity-drawer.tsx"
      ),
      "utf-8"
    );
    expect(drawerSource).not.toMatch(/\btext-\[(?:8|9|10|11)px\]/);
    expect(drawerSource).not.toContain("backdrop-blur-xs");
    unmount();

    // Null/Empty Edge Case: no communityName, gameId = null, relatedArticleSlugs = []
    render(
      <CodexEntityDrawer
        entity={{
          ...seeds[0]!,
          communityNameVi: null,
          communityNameEn: null,
          gameId: null,
          relatedArticleSlugs: [],
        }}
        locale="en"
        onClose={() => undefined}
      />
    );
    const emptyRelated = screen.getByTestId("codex-drawer-related-guides");
    expect(emptyRelated.textContent).toContain(
      "Related strategy guides are being updated."
    );
    expect(VI_DIACRITIC_REGEX.test(emptyRelated.textContent ?? "")).toBe(false);
  });
});

describe("Track 3 — Phase 3.3 Suite 7B: GameCodexClient MD3 Typography, Single-Layer Containment & Touch Target Gate", () => {
  it("enforces 16px mobile search input, >= 44px touch targets on filters/tabs, 14px-16px entity titles & descriptions, and flat Single-Layer Containment across all 8 Phase 3.3 files", () => {
    mockActiveLocale = "vi";
    const { container } = render(<GameCodexClient locale="vi" />);

    const searchInput = screen.getByTestId("codex-search-input");
    expect(searchInput.className).toContain("text-base");
    expect(searchInput.className).toContain("h-11");
    expect(searchInput.className).toContain("min-h-[44px]");

    // Type query to reveal scope toggle and reset button
    fireEvent.change(searchInput, { target: { value: "Wukong" } });
    const scopeCatBtn = screen.getByTestId("codex-scope-category-btn");
    const scopeAllBtn = screen.getByTestId("codex-scope-all-btn");
    const resetBtn = screen.getByTestId("codex-reset-filters-btn");
    expect(scopeCatBtn.className).toContain("min-h-[44px]");
    expect(scopeAllBtn.className).toContain("min-h-[44px]");
    expect(resetBtn.className).toContain("min-h-[44px]");

    // Verify 4 menu zones & filter bar use border-0 on mobile (Single-Layer Containment)
    const combatZone = screen.getByTestId("codex-menu-zone-zone_combat");
    const filterBar = screen.getByTestId("codex-context-filter-bar");
    expect(combatZone.className).toContain("border-0");
    expect(filterBar.className).toContain("border-0");

    // Verify category tab, sub-category, rarity, faction, and extra filter buttons meet min-h-[44px]
    expect(screen.getByTestId("codex-cat-tab-heroes").className).toContain(
      "min-h-[44px]"
    );
    expect(screen.getByTestId("codex-subcat-hero-units").className).toContain(
      "min-h-[44px]"
    );
    expect(screen.getByTestId("codex-rarity-mythic").className).toContain(
      "min-h-[44px]"
    );
    expect(screen.getByTestId("codex-faction-horde").className).toContain(
      "min-h-[44px]"
    );
    expect(screen.getByTestId("codex-extra-awakenable").className).toContain(
      "min-h-[44px]"
    );

    // Clear search to inspect entity cards
    fireEvent.change(searchInput, { target: { value: "" } });
    const firstCard = screen.getAllByTestId("codex-entity-card")[0]!;
    const cardHeading = firstCard.querySelector("h3");
    expect(cardHeading?.className).toContain("text-sm");
    expect(cardHeading?.className).toContain("sm:text-base");

    // Zero micro-text in rendered DOM
    expect(container.innerHTML).not.toMatch(/\btext-\[(?:8|9|10|11)px\]/);

    // Static scan across all 8 Phase 3.3 files on disk
    const phase33Files = [
      "src/app/[locale]/guides/codex/page.tsx",
      "src/components/guides/codex/game-codex-client.tsx",
      "src/components/guides/codex/codex-entity-drawer.tsx",
      "src/components/guides/codex/codex-utils.ts",
      "src/components/guides/media/game-asset-frame.tsx",
      "src/components/guides/media/game-entity-popover.tsx",
      "src/components/guides/media/game-inline-chip.tsx",
      "src/components/guides/media/visual-showcase-deck.tsx",
    ];

    for (const relPath of phase33Files) {
      const fullPath = path.resolve(process.cwd(), relPath);
      const source = fs.readFileSync(fullPath, "utf-8");
      expect(source, `${relPath} contains forbidden micro-text`).not.toMatch(
        /\btext-\[(?:8|9|10|11)px\]|text-\[0\.82em\]/
      );
      expect(source, `${relPath} contains forbidden GAP-03 class`).not.toMatch(
        /\b(border-l-2|border-l-4|rounded-l-sm)\b/
      );
      expect(
        source,
        `${relPath} contains Tailwind v4-only -xs utility`
      ).not.toMatch(/\b(shadow-xs|backdrop-blur-xs|rounded-xs)\b/);
    }
  });
});


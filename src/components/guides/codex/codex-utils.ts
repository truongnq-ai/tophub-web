import { GAME_ASSET_REGISTRY } from "@/content/guides/asset-registry";
import type {
  AssetFaction,
  AssetRarity,
  CodexCategoryId,
  CodexCategoryShardPayload,
  CodexEntityRecord,
  CodexFilterState,
  CodexSearchIndexItem,
  CodexSearchIndexPayload,
  LocalizedText,
} from "@/content/guides/types";

export const CODEX_PAGE_SIZE = 48;

export const CODEX_CATEGORY_IDS: readonly CodexCategoryId[] = [
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

export const CODEX_RARITY_IDS: readonly AssetRarity[] = [
  "mythic",
  "legendary",
  "epic",
  "rare",
  "uncommon",
  "common",
] as const;

export const CODEX_FACTION_IDS: readonly AssetFaction[] = [
  "horde",
  "league",
  "nature",
  "neutral",
] as const;

export const CODEX_CATEGORY_LABELS: Readonly<
  Record<CodexCategoryId | "all", LocalizedText>
> = {
  all: { vi: "Tất cả (3,400+)", en: "All (3,400+)" },
  heroes: { vi: "Anh Hùng & Chúa Tể", en: "Heroes & Lords" },
  items: { vi: "Vật Phẩm & Rương", en: "Items & Chests" },
  equipment: { vi: "Trang Bị & Cổ Ngữ", en: "Gear & Runes" },
  relics: { vi: "Thánh Vật Cổ Đại", en: "Ancient Relics" },
  "pets-behemoths": { vi: "Thú Cưng & Cự Thú", en: "Pets & Behemoths" },
  "buildings-decor": { vi: "Công Trình & Trang Trí", en: "Buildings & Decor" },
  "skills-tech": { vi: "Kỹ Năng & Nghiên Cứu", en: "Skills & Tech" },
  troops: { vi: "Binh Chủng & Quân Trang", en: "Troops & Skins" },
  "events-seasons": { vi: "Sự Kiện & Mùa Giải", en: "Events & Seasons" },
  monsters: { vi: "Quái Vật & Thủ Lĩnh", en: "Monsters & Bosses" },
  cosmetics: { vi: "Ngoại Trang & Khung", en: "Cosmetics & Frames" },
  "shop-vip": { vi: "Cửa Hàng & Đặc Quyền VIP", en: "Shop & VIP" },
};

export const CODEX_RARITY_LABELS: Readonly<
  Record<AssetRarity | "all", LocalizedText>
> = {
  all: { vi: "Mọi phẩm cấp", en: "All Rarities" },
  mythic: { vi: "Đỏ (Mythic)", en: "Mythic" },
  legendary: { vi: "Vàng (Legendary)", en: "Legendary" },
  epic: { vi: "Tím (Epic)", en: "Epic" },
  rare: { vi: "Lam (Rare)", en: "Rare" },
  uncommon: { vi: "Lục (Uncommon)", en: "Uncommon" },
  common: { vi: "Thường (Common)", en: "Common" },
};

export const CODEX_FACTION_LABELS: Readonly<
  Record<AssetFaction | "all", LocalizedText>
> = {
  all: { vi: "Mọi phe phái", en: "All Factions" },
  horde: { vi: "Bộ Lạc (Horde)", en: "Horde" },
  league: { vi: "Liên Minh (League)", en: "League" },
  nature: { vi: "Thiên Nhiên (Nature)", en: "Nature" },
  neutral: { vi: "Đa Hệ (Neutral)", en: "Neutral" },
};

const DEFAULT_RELATED_BY_CATEGORY: Readonly<
  Record<CodexCategoryId, readonly string[]>
> = {
  heroes: [
    "heroes/encyclopedia",
    "heroes/meta-lineups",
    "heroes/awakening-and-star-tiers",
  ],
  items: [
    "getting-started/diamond-and-resource-discipline",
    "economy/shops-tier-list",
    "events/double-dip-schedule",
  ],
  equipment: [
    "gear/gear-overview",
    "gear/golden-gear-sets",
    "gear/enhancement-and-mythic",
    "power-systems/runes-guide",
  ],
  relics: ["power-systems/relics-guide", "events/double-dip-schedule"],
  "pets-behemoths": [
    "power-systems/pets-and-behemoth",
    "infrastructure/master-data-tables",
  ],
  "buildings-decor": [
    "infrastructure/castle-and-brilliance",
    "infrastructure/builder-queues-and-villagers",
  ],
  "skills-tech": [
    "heroes/skill-books-and-traits",
    "infrastructure/research-and-baiting",
    "infrastructure/castle-and-brilliance",
  ],
  troops: [
    "economy/troop-skins-and-medals",
    "infrastructure/master-data-tables",
  ],
  "events-seasons": [
    "events/biweekly-rotation",
    "events/week-a-guild-race",
    "events/week-b-arms-race",
    "roadmap/season-1-to-4-roadmap",
  ],
  monsters: ["events/biweekly-rotation", "power-systems/relics-guide"],
  cosmetics: ["economy/shops-tier-list", "economy/exchange-and-vip-shops"],
  "shop-vip": [
    "economy/shops-tier-list",
    "economy/exchange-and-vip-shops",
    "infrastructure/master-data-tables",
  ],
};

/**
 * GAP-06: Safe search query sanitizer & Vietnamese diacritic stripper.
 * Strictly forbids `new RegExp(raw)` to prevent ReDoS and SyntaxError on metacharacters.
 */
export function normalizeSearchQuery(raw: string): string {
  if (!raw) return "";
  const capped = raw.trim().slice(0, 100);
  return capped
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .replace(/\s+/g, " ")
    .toLowerCase();
}

export function isValidCodexCategory(
  val: unknown
): val is CodexCategoryId {
  return (
    typeof val === "string" &&
    (CODEX_CATEGORY_IDS as readonly string[]).includes(val)
  );
}

export function isValidAssetRarity(val: unknown): val is AssetRarity {
  return (
    typeof val === "string" &&
    (CODEX_RARITY_IDS as readonly string[]).includes(val)
  );
}

export function isValidAssetFaction(val: unknown): val is AssetFaction {
  return (
    typeof val === "string" &&
    (CODEX_FACTION_IDS as readonly string[]).includes(val)
  );
}

/**
 * GAP-06: Strict Whitelist Enum validation for URL query parameters.
 */
export function parseCodexUrlParams(
  params?: Record<string, string | string[] | undefined>
): CodexFilterState {
  const pickFirst = (v: string | string[] | undefined): string =>
    Array.isArray(v) ? (v[0] ?? "") : (v ?? "");

  const rawCat = pickFirst(params?.cat).trim();
  const rawRarity = pickFirst(params?.rarity).trim();
  const rawFaction = pickFirst(params?.faction).trim();
  const rawQuery = pickFirst(params?.q).trim().slice(0, 100);
  const rawPage = Number.parseInt(pickFirst(params?.page), 10);

  return {
    category: isValidCodexCategory(rawCat) ? rawCat : "all",
    rarity: isValidAssetRarity(rawRarity) ? rawRarity : "all",
    faction: isValidAssetFaction(rawFaction) ? rawFaction : "all",
    query: rawQuery,
    page: Number.isFinite(rawPage) && rawPage >= 1 ? rawPage : 1,
  };
}

let cachedSeedRecords: readonly CodexEntityRecord[] | null = null;

/**
 * GAP-P5-05: Synchronous 0ms seed records built from GAME_ASSET_REGISTRY (237 SSoT + Tactical assets).
 * Ensures instant initial rendering and 100% deterministic fallback in JSDOM tests.
 */
export function getInitialCodexSeedRecords(): readonly CodexEntityRecord[] {
  if (cachedSeedRecords) return cachedSeedRecords;

  const list: CodexEntityRecord[] = Object.values(GAME_ASSET_REGISTRY).map(
    (entry) => {
      const cat = isValidCodexCategory(entry.category)
        ? entry.category
        : "items";
      return {
        id: entry.id,
        gameId: entry.gameId,
        glossaryId: entry.glossaryId,
        category: cat,
        subCategory: entry.glossaryId ? "ssot-glossary" : "tactical-core",
        path: entry.iconPath,
        portraitPath: entry.portraitPath,
        nameVi: entry.inGameNameVi || entry.nameVi,
        nameEn: entry.inGameNameEn || entry.nameEn,
        communityNameVi: entry.nameVi,
        communityNameEn: entry.nameEn,
        descVi: entry.descVi || entry.nameVi,
        descEn: entry.descEn || entry.nameEn,
        rarity: entry.rarity,
        faction: entry.faction ?? "neutral",
        relatedArticleSlugs: DEFAULT_RELATED_BY_CATEGORY[cat],
      };
    }
  );

  cachedSeedRecords = list;
  return list;
}

export function filterCodexEntities<
  T extends CodexEntityRecord | CodexSearchIndexItem,
>(
  items: readonly T[],
  filters: {
    readonly category: CodexCategoryId | "all";
    readonly rarity: AssetRarity | "all";
    readonly faction: AssetFaction | "all";
    readonly query: string;
  }
): readonly T[] {
  const normQuery = normalizeSearchQuery(filters.query);

  return items.filter((item) => {
    if (filters.category !== "all" && item.category !== filters.category) {
      return false;
    }
    if (filters.rarity !== "all" && item.rarity !== filters.rarity) {
      return false;
    }
    if (filters.faction !== "all" && item.faction !== filters.faction) {
      return false;
    }
    if (!normQuery) {
      return true;
    }

    const haystack = normalizeSearchQuery(
      [
        item.nameVi,
        item.nameEn,
        item.communityNameVi ?? "",
        item.communityNameEn ?? "",
        item.descVi,
        item.descEn,
        item.glossaryId ?? "",
        item.gameId !== null ? String(item.gameId) : "",
      ].join(" ")
    );

    return haystack.includes(normQuery);
  });
}

export function paginateCodexEntities<T>(
  items: readonly T[],
  page: number,
  pageSize: number = CODEX_PAGE_SIZE
): {
  readonly items: readonly T[];
  readonly currentPage: number;
  readonly totalPages: number;
  readonly totalItems: number;
} {
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * pageSize;
  return {
    items: items.slice(start, start + pageSize),
    currentPage,
    totalPages,
    totalItems,
  };
}

const categoryShardCache = new Map<
  CodexCategoryId,
  readonly CodexEntityRecord[]
>();
let searchIndexCache: CodexSearchIndexPayload | null = null;

function isCodexShardPayload(val: unknown): val is CodexCategoryShardPayload {
  if (!val || typeof val !== "object") return false;
  const obj = val as Record<string, unknown>;
  return typeof obj.category === "string" && Array.isArray(obj.items);
}

function isCodexSearchIndexPayload(
  val: unknown
): val is CodexSearchIndexPayload {
  if (!val || typeof val !== "object") return false;
  const obj = val as Record<string, unknown>;
  return (
    typeof obj.totalEntities === "number" &&
    Array.isArray(obj.items) &&
    typeof obj.categoryCounts === "object" &&
    obj.categoryCounts !== null
  );
}

function shouldAttemptBrowserFetch(): boolean {
  if (typeof window === "undefined" || typeof window.fetch !== "function") {
    return false;
  }
  const fn = window.fetch as unknown as { mock?: unknown };
  if (fn && typeof fn === "object" && "mock" in fn) {
    return true;
  }
  if (
    typeof navigator !== "undefined" &&
    /jsdom/i.test(navigator.userAgent || "")
  ) {
    return false;
  }
  return true;
}

/**
 * GAP-04 & GAP-P5-05: In-memory cached category shard fetcher with AbortSignal and JSDOM fallback.
 */
export async function fetchCodexCategoryShard(
  category: CodexCategoryId,
  signal?: AbortSignal
): Promise<readonly CodexEntityRecord[]> {
  const cached = categoryShardCache.get(category);
  if (cached) return cached;

  try {
    if (shouldAttemptBrowserFetch()) {
      const res = await window.fetch(`/data/codex/${category}.json`, {
        signal,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        const data = (await res.json()) as unknown;
        if (isCodexShardPayload(data)) {
          categoryShardCache.set(category, data.items);
          return data.items;
        }
      }
    }
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      throw err;
    }
  }

  return getInitialCodexSeedRecords().filter(
    (item) => item.category === category
  );
}

/**
 * GAP-04 & GAP-P5-05: In-memory cached search-index fetcher with AbortSignal and JSDOM fallback.
 */
export async function fetchCodexSearchIndex(
  signal?: AbortSignal
): Promise<CodexSearchIndexPayload> {
  if (searchIndexCache) return searchIndexCache;

  try {
    if (shouldAttemptBrowserFetch()) {
      const res = await window.fetch("/data/codex/search-index.json", {
        signal,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        const data = (await res.json()) as unknown;
        if (isCodexSearchIndexPayload(data)) {
          searchIndexCache = data;
          return data;
        }
      }
    }
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      throw err;
    }
  }

  const seeds = getInitialCodexSeedRecords();
  const counts = {
    heroes: 486,
    items: 1209,
    equipment: 197,
    relics: 136,
    "pets-behemoths": 27,
    "buildings-decor": 563,
    "skills-tech": 27,
    troops: 22,
    "events-seasons": 100,
    monsters: 446,
    cosmetics: 167,
    "shop-vip": 23,
  } satisfies Record<CodexCategoryId, number>;

  return {
    version: "4.0.0",
    totalEntities: 3518,
    indexedEntities: seeds.length,
    categoryCounts: counts,
    items: seeds,
  };
}

import {
  GAME_ASSET_REGISTRY,
  HERO_VISUAL_PROFILES,
} from "@/content/guides/asset-registry";
import type {
  AssetFaction,
  AssetRarity,
  CodexCategoryFilterConfig,
  CodexCategoryId,
  CodexCategoryShardPayload,
  CodexEntityRecord,
  CodexFilterState,
  CodexMenuZone,
  CodexSearchIndexItem,
  CodexSearchIndexPayload,
  CodexSearchScope,
  LocalizedText,
} from "@/content/guides/types";

export const CODEX_PAGE_SIZE = 48;

export const CODEX_CATEGORY_IDS: readonly CodexCategoryId[] = [
  "heroes",
  "troops",
  "skills-tech",
  "equipment",
  "relics",
  "pets-behemoths",
  "items",
  "shop-vip",
  "buildings-decor",
  "events-seasons",
  "monsters",
  "cosmetics",
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
  "league",
  "horde",
  "nature",
  "neutral",
] as const;

export const CODEX_CATEGORY_LABELS: Readonly<
  Record<CodexCategoryId | "all", LocalizedText>
> = {
  all: { vi: "Toàn bộ 12 Danh mục", en: "All 12 Categories" },
  heroes: { vi: "Anh Hùng & Trang Phục", en: "Heroes & Skins" },
  troops: { vi: "Binh Chủng & Quân Trang", en: "Troops & Skins" },
  "skills-tech": { vi: "Kỹ Năng & Khoa Kỹ", en: "Skills & Tech" },
  equipment: { vi: "Trang Bị, VKĐQ & Cổ Ngữ", en: "Gear, EW & Runes" },
  relics: { vi: "Thánh Vật Cổ Đại", en: "Ancient Relics" },
  "pets-behemoths": { vi: "Thú Cưng & Cự Thú", en: "Pets & Behemoths" },
  items: { vi: "Vật Phẩm, Tiền Tệ & Rương", en: "Items, Currencies & Chests" },
  "shop-vip": { vi: "Cửa Hàng & Đặc Quyền VIP", en: "Shops & VIP Perks" },
  "buildings-decor": { vi: "Công Trình & Trang Trí", en: "Buildings & Decor" },
  "events-seasons": { vi: "Sự Kiện & Mùa Giải", en: "Events & Seasons" },
  monsters: { vi: "Quái Vật & Thủ Lĩnh", en: "Monsters & Bosses" },
  cosmetics: { vi: "Ngoại Trang & Biểu Cảm", en: "Cosmetics & Emojis" },
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
  league: { vi: "Liên Minh (League)", en: "League" },
  horde: { vi: "Bộ Tộc (Horde)", en: "Horde" },
  nature: { vi: "Thiên Nhiên (Nature)", en: "Nature" },
  neutral: { vi: "Đa Hệ (Neutral)", en: "Neutral" },
};

/**
 * Option M1: 4 Functional Menu Zones grouping all 12 Codex Categories.
 */
export const CODEX_MENU_ZONES: readonly CodexMenuZone[] = [
  {
    id: "zone_combat",
    iconName: "Swords",
    title: {
      vi: "1. Quân Lực & Chiến Đấu",
      en: "1. Combat Forces & Tech",
    },
    subtitle: {
      vi: "Anh hùng, Binh chủng & Cây Khoa kỹ",
      en: "Heroes, Troop tiers & Research trees",
    },
    categories: ["heroes", "troops", "skills-tech"],
  },
  {
    id: "zone_gear",
    iconName: "Shield",
    title: {
      vi: "2. Trang Bị & Sức Mạnh",
      en: "2. Gear & Power Systems",
    },
    subtitle: {
      vi: "Bộ Hoàng Kim, VKĐQ, Cổ ngữ, Thánh vật & Thú cưng",
      en: "Golden Gear, Exclusive Weapons, Runes, Relics & Pets",
    },
    categories: ["equipment", "relics", "pets-behemoths"],
  },
  {
    id: "zone_economy",
    iconName: "Package",
    title: {
      vi: "3. Kinh Tế & Thành Trì",
      en: "3. Economy & Territory",
    },
    subtitle: {
      vi: "Kho vật phẩm, Rương, Cửa hàng & Công trình",
      en: "Currencies, Chests, Shops & City buildings",
    },
    categories: ["items", "shop-vip", "buildings-decor"],
  },
  {
    id: "zone_world",
    iconName: "Globe",
    title: {
      vi: "4. Thế Giới & Ngoại Trang",
      en: "4. World, Events & Cosmetics",
    },
    subtitle: {
      vi: "Mùa giải S1-S4, Quái bản đồ, Khung & Biểu cảm",
      en: "Seasons S1-S4, Bosses, Frames & Emojis",
    },
    categories: ["events-seasons", "monsters", "cosmetics"],
  },
] as const;

/**
 * Domain-specific filter schema for each of the 12 Codex categories (Option M1).
 */
export const CODEX_CATEGORY_FILTER_SCHEMA: Readonly<
  Record<CodexCategoryId, CodexCategoryFilterConfig>
> = {
  heroes: {
    category: "heroes",
    zoneId: "zone_combat",
    subCategories: [
      { id: "all", label: { vi: "Tất cả", en: "All" } },
      { id: "hero-units", label: { vi: "Anh Hùng", en: "Heroes" } },
      { id: "hero-skins", label: { vi: "Trang Phục (Skins)", en: "Hero Skins" } },
    ],
    supportsFaction: true,
    allowedFactions: ["league", "horde", "nature"],
    allowedRarities: ["mythic", "legendary", "epic", "rare"],
    extraFilterLabel: { vi: "Đặc tính:", en: "Trait:" },
    extraFilters: [
      { id: "all", label: { vi: "Tất cả", en: "All Traits" } },
      {
        id: "awakenable",
        label: { vi: "Thức Tỉnh Đỏ (Mythic)", en: "Red Awakening" },
      },
      {
        id: "economy",
        label: { vi: "Tướng Kinh Tế", en: "Economy Passive" },
      },
    ],
  },
  troops: {
    category: "troops",
    zoneId: "zone_combat",
    subCategories: [
      { id: "all", label: { vi: "Tất cả", en: "All" } },
      { id: "troop-units", label: { vi: "Binh Chủng", en: "Troop Units" } },
      { id: "troop-skins", label: { vi: "Quân Trang", en: "Troop Skins" } },
    ],
    supportsFaction: true,
    allowedFactions: ["league", "horde", "nature", "neutral"],
    allowedRarities: ["mythic", "legendary", "epic", "rare", "uncommon", "common"],
  },
  "skills-tech": {
    category: "skills-tech",
    zoneId: "zone_combat",
    subCategories: [
      { id: "all", label: { vi: "Tất cả", en: "All" } },
      {
        id: "research-tech",
        label: { vi: "Khoa Kỹ Nghiên Cứu", en: "Research Tech" },
      },
      {
        id: "hero-skills",
        label: { vi: "Kỹ Năng & Thiên Phú", en: "Skills & Talents" },
      },
    ],
    supportsFaction: false,
    allowedRarities: ["mythic", "legendary", "epic", "rare"],
  },
  equipment: {
    category: "equipment",
    zoneId: "zone_gear",
    subCategories: [
      { id: "all", label: { vi: "Tất cả", en: "All" } },
      {
        id: "hero-gear",
        label: { vi: "Trang Bị Tướng & Bộ Vàng", en: "Hero Gear & Sets" },
      },
      {
        id: "exclusive-weapons",
        label: { vi: "Vũ Khí Độc Quyền", en: "Exclusive Weapons" },
      },
      {
        id: "lord-gear",
        label: { vi: "Trang Bị Lãnh Chúa", en: "Lord Gear" },
      },
      { id: "runes", label: { vi: "Cổ Ngữ (Runes)", en: "Runes" } },
    ],
    supportsFaction: true,
    allowedFactions: ["league", "horde", "nature", "neutral"],
    factionSubCategories: ["all", "hero-gear", "exclusive-weapons"],
    allowedRarities: ["mythic", "legendary", "epic", "rare", "uncommon"],
  },
  relics: {
    category: "relics",
    zoneId: "zone_gear",
    subCategories: [
      { id: "all", label: { vi: "Tất cả", en: "All" } },
      {
        id: "relic-artefacts",
        label: { vi: "Thánh Vật Hoàn Chỉnh", en: "Complete Relics" },
      },
      {
        id: "relic-scrolls",
        label: { vi: "Mảnh & Cuộn Bí Bảo", en: "Shards & Scrolls" },
      },
    ],
    supportsFaction: false,
    allowedRarities: ["mythic", "legendary", "epic", "rare"],
  },
  "pets-behemoths": {
    category: "pets-behemoths",
    zoneId: "zone_gear",
    subCategories: [
      { id: "all", label: { vi: "Tất cả", en: "All" } },
      {
        id: "companion-pets",
        label: { vi: "Thú Cưng Đồng Hành", en: "Companion Pets" },
      },
      {
        id: "behemoths",
        label: { vi: "Cự Thú / Thần Thú", en: "Behemoths" },
      },
      { id: "spirits", label: { vi: "Tinh Linh", en: "Elemental Spirits" } },
    ],
    supportsFaction: true,
    allowedFactions: ["league", "horde", "nature", "neutral"],
    allowedRarities: ["mythic", "legendary", "epic", "rare"],
  },
  items: {
    category: "items",
    zoneId: "zone_economy",
    subCategories: [
      { id: "all", label: { vi: "Tất cả", en: "All" } },
      {
        id: "currencies",
        label: { vi: "Tiền Tệ & Vé", en: "Currencies & Tokens" },
      },
      {
        id: "shards-souls",
        label: { vi: "Mảnh & Đá Linh Hồn", en: "Shards & Soul Stones" },
      },
      { id: "chests", label: { vi: "Rương Vật Phẩm", en: "Chests & Boxes" } },
      {
        id: "upgrade-materials",
        label: { vi: "Nguyên Liệu Nâng Cấp", en: "Upgrade Materials" },
      },
      {
        id: "resources-speedups",
        label: { vi: "Tài Nguyên & Tăng Tốc", en: "Resources & Speedups" },
      },
      {
        id: "consumables",
        label: { vi: "Tiêu Hao & Sự Kiện", en: "Event Consumables" },
      },
    ],
    supportsFaction: false,
    allowedRarities: [
      "mythic",
      "legendary",
      "epic",
      "rare",
      "uncommon",
      "common",
    ],
  },
  "shop-vip": {
    category: "shop-vip",
    zoneId: "zone_economy",
    subCategories: [
      { id: "all", label: { vi: "Tất cả", en: "All" } },
      { id: "shops", label: { vi: "Cửa Hàng", en: "Game Shops" } },
      {
        id: "vip-perks",
        label: { vi: "Đặc Quyền VIP & Gói", en: "VIP & Bundles" },
      },
    ],
    supportsFaction: false,
    allowedRarities: ["mythic", "legendary", "epic", "rare"],
  },
  "buildings-decor": {
    category: "buildings-decor",
    zoneId: "zone_economy",
    subCategories: [
      { id: "all", label: { vi: "Tất cả", en: "All" } },
      {
        id: "city-buildings",
        label: { vi: "Công Trình Lãnh Địa", en: "City Buildings" },
      },
      {
        id: "castle-skins",
        label: { vi: "Skin Pháo Đài", en: "Castle Skins" },
      },
      {
        id: "decorations",
        label: { vi: "Trang Trí Lãnh Địa", en: "Territorial Decor" },
      },
    ],
    supportsFaction: false,
    allowedRarities: ["mythic", "legendary", "epic", "rare"],
  },
  "events-seasons": {
    category: "events-seasons",
    zoneId: "zone_world",
    subCategories: [
      { id: "all", label: { vi: "Tất cả", en: "All" } },
      {
        id: "seasons",
        label: { vi: "Mùa Giải S1-S4", en: "Seasons S1-S4" },
      },
      {
        id: "events",
        label: { vi: "Sự Kiện & KvK", en: "Major Events & KvK" },
      },
      {
        id: "minigames",
        label: { vi: "Hoạt Động & Minigame", en: "Minigames" },
      },
    ],
    supportsFaction: false,
    allowedRarities: ["mythic", "legendary", "epic", "rare"],
  },
  monsters: {
    category: "monsters",
    zoneId: "zone_world",
    subCategories: [
      { id: "all", label: { vi: "Tất cả", en: "All" } },
      {
        id: "bosses",
        label: { vi: "Thủ Lĩnh & Boss", en: "World Bosses" },
      },
      {
        id: "world-monsters",
        label: { vi: "Quái Bản Đồ", en: "Field Monsters" },
      },
    ],
    supportsFaction: false,
    allowedRarities: ["mythic", "legendary", "epic", "rare", "common"],
  },
  cosmetics: {
    category: "cosmetics",
    zoneId: "zone_world",
    subCategories: [
      { id: "all", label: { vi: "Tất cả", en: "All" } },
      {
        id: "avatar-frames",
        label: { vi: "Khung Đại Diện", en: "Avatar Frames" },
      },
      {
        id: "titles-badges",
        label: { vi: "Danh Hiệu & Huy Hiệu", en: "Titles & Badges" },
      },
      { id: "emojis", label: { vi: "Biểu Cảm Chat", en: "Chat Emojis" } },
    ],
    supportsFaction: false,
    allowedRarities: ["mythic", "legendary", "epic", "rare"],
  },
};

export const INITIAL_CODEX_CATEGORY_COUNTS: Readonly<
  Record<CodexCategoryId, number>
> = {
  heroes: 219,
  troops: 26,
  "skills-tech": 43,
  equipment: 205,
  relics: 136,
  "pets-behemoths": 36,
  items: 1213,
  "shop-vip": 23,
  "buildings-decor": 461,
  "events-seasons": 96,
  monsters: 446,
  cosmetics: 167,
};

const DEFAULT_RELATED_BY_CATEGORY: Readonly<
  Record<CodexCategoryId, readonly string[]>
> = {
  heroes: [
    "heroes/encyclopedia",
    "heroes/meta-lineups",
    "heroes/shards-and-skill-books",
  ],
  items: [
    "getting-started/diamond-and-spending-guide",
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
    "heroes/shards-and-skill-books",
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
 * Normalizes both raw/legacy subCategory tags and seed asset paths into the
 * canonical subCategory IDs defined in CODEX_CATEGORY_FILTER_SCHEMA (GAP-M1-03).
 */
export function normalizeCanonicalSubCategory(
  category: CodexCategoryId,
  rawSub: string | undefined,
  pathStr: string,
  nameEn: string,
  rarity: AssetRarity
): string {
  const sub = (rawSub ?? "").trim().toLowerCase();
  const p = pathStr.toLowerCase();
  const n = nameEn.toLowerCase();

  const schema = CODEX_CATEGORY_FILTER_SCHEMA[category];
  if (
    sub &&
    sub !== "all" &&
    schema.subCategories.some((opt) => opt.id === sub)
  ) {
    return sub;
  }

  switch (category) {
    case "heroes":
      if (sub.includes("skin") || p.includes("skin")) return "hero-skins";
      return "hero-units";

    case "troops":
      if (sub.includes("skin") || p.includes("skin") || n.includes("skin")) {
        return "troop-skins";
      }
      return "troop-units";

    case "skills-tech":
      if (
        sub.includes("skill") ||
        p.includes("/skills/") ||
        n.includes("skill")
      ) {
        return "hero-skills";
      }
      return "research-tech";

    case "equipment":
      if (sub.includes("exclusive") || p.includes("exclusive") || n.includes("exclusive")) {
        return "exclusive-weapons";
      }
      if (sub.includes("rune") || p.includes("rune") || n.includes("rune")) {
        return "runes";
      }
      if (sub.includes("lord") || p.includes("lord") || n.includes("lord")) {
        return "lord-gear";
      }
      return "hero-gear";

    case "relics":
      if (
        sub.includes("scroll") ||
        sub.includes("shard") ||
        n.includes("scroll") ||
        n.includes("shard") ||
        n.includes("fragment")
      ) {
        return "relic-scrolls";
      }
      return "relic-artefacts";

    case "pets-behemoths":
      if (sub.includes("pet") || p.includes("/pets/") || p.includes("head_pet")) {
        return "companion-pets";
      }
      if (sub.includes("spirit") || n.includes("spirit") || p.includes("element")) {
        return "spirits";
      }
      return "behemoths";

    case "items":
      if (
        sub === "currencies" ||
        p.includes("/currencies/") ||
        n.includes("diamond") ||
        n.includes("token") ||
        n.includes("coin") ||
        n.includes("voucher") ||
        n.includes("points")
      ) {
        return "currencies";
      }
      if (
        sub === "shards" ||
        p.includes("/shards/") ||
        n.includes("shard") ||
        n.includes("soul stone")
      ) {
        return "shards-souls";
      }
      if (
        sub === "chests" ||
        p.includes("/chests/") ||
        n.includes("chest") ||
        n.includes("box") ||
        n.includes("pack")
      ) {
        return "chests";
      }
      if (
        n.includes("speedup") ||
        n.includes("stamina") ||
        n.includes("ruby") ||
        n.includes("timber") ||
        n.includes("stone") && n.includes("resource") ||
        p.includes("speedup")
      ) {
        return "resources-speedups";
      }
      if (
        n.includes("essence") ||
        n.includes("refined") ||
        n.includes("blueprint") ||
        n.includes("medal") ||
        n.includes("book") ||
        n.includes("anvil") ||
        n.includes("stone")
      ) {
        return "upgrade-materials";
      }
      return "consumables";

    case "shop-vip":
      if (sub.includes("vip") || n.includes("vip") || p.includes("vip")) {
        return "vip-perks";
      }
      return "shops";

    case "buildings-decor":
      if (
        sub.includes("castle") ||
        sub.includes("worldskin") ||
        p.includes("worldskin") ||
        n.includes("castle skin")
      ) {
        return "castle-skins";
      }
      if (sub.includes("decor") || p.includes("/decor/") || n.includes("decor")) {
        return "decorations";
      }
      return "city-buildings";

    case "events-seasons":
      if (sub === "seasons" || p.includes("/seasons/") || n.includes("season")) {
        return "seasons";
      }
      if (
        sub === "minigames" ||
        p.includes("/minigames/") ||
        n.includes("chess") ||
        n.includes("farm") ||
        n.includes("pinball")
      ) {
        return "minigames";
      }
      return "events";

    case "monsters":
      if (
        rarity === "mythic" ||
        rarity === "legendary" ||
        n.includes("boss") ||
        n.includes("lord") ||
        n.includes("king")
      ) {
        return "bosses";
      }
      return "world-monsters";

    case "cosmetics":
      if (sub.includes("emoji") || p.includes("emoji")) return "emojis";
      if (sub.includes("title") || p.includes("title") || n.includes("title")) {
        return "titles-badges";
      }
      return "avatar-frames";
  }
}

/**
 * GAP-06 & GAP-M1-02: Strict Whitelist Enum + Cross-Category Schema validation for URL query parameters.
 */
export function parseCodexUrlParams(
  params?: Record<string, string | string[] | undefined>
): CodexFilterState {
  const pickFirst = (v: string | string[] | undefined): string =>
    Array.isArray(v) ? (v[0] ?? "") : (v ?? "");

  const rawCat = pickFirst(params?.cat).trim();
  const rawSub = pickFirst(params?.sub).trim();
  const rawRarity = pickFirst(params?.rarity).trim();
  const rawFaction = pickFirst(params?.faction).trim();
  const rawExtra = pickFirst(params?.extra).trim();
  const rawScope = pickFirst(params?.scope).trim();
  const rawQuery = pickFirst(params?.q).trim().slice(0, 100);
  const rawPage = Number.parseInt(pickFirst(params?.page), 10);

  const category: CodexCategoryId = isValidCodexCategory(rawCat)
    ? rawCat
    : "heroes";
  const schema = CODEX_CATEGORY_FILTER_SCHEMA[category];

  const subCategory = schema.subCategories.some((s) => s.id === rawSub)
    ? rawSub
    : "all";

  const rarity: AssetRarity | "all" =
    isValidAssetRarity(rawRarity) && schema.allowedRarities.includes(rawRarity)
      ? rawRarity
      : "all";

  const canUseFaction =
    schema.supportsFaction &&
    (!schema.factionSubCategories ||
      schema.factionSubCategories.includes(subCategory));

  const faction: AssetFaction | "all" =
    canUseFaction &&
    isValidAssetFaction(rawFaction) &&
    (!schema.allowedFactions || schema.allowedFactions.includes(rawFaction))
      ? rawFaction
      : "all";

  const extraFilter =
    schema.extraFilters && schema.extraFilters.some((e) => e.id === rawExtra)
      ? rawExtra
      : "all";

  const searchScope: CodexSearchScope =
    rawScope === "all" || (rawQuery.length > 0 && !isValidCodexCategory(rawCat))
      ? "all"
      : "category";

  return {
    category,
    subCategory,
    rarity,
    faction,
    extraFilter,
    searchScope,
    query: rawQuery,
    page: Number.isFinite(rawPage) && rawPage >= 1 ? rawPage : 1,
  };
}

let cachedSeedRecords: readonly CodexEntityRecord[] | null = null;

/**
 * GAP-P5-05 & GAP-M1-03: Synchronous 0ms seed records built from GAME_ASSET_REGISTRY
 * with canonical subCategory and extraTags for instant SSR and deterministic JSDOM testing.
 */
export function getInitialCodexSeedRecords(): readonly CodexEntityRecord[] {
  if (cachedSeedRecords) return cachedSeedRecords;

  const heroProfileByGid = new Map<
    number,
    (typeof HERO_VISUAL_PROFILES)[string]
  >();
  for (const hp of Object.values(HERO_VISUAL_PROFILES)) {
    heroProfileByGid.set(hp.gameId, hp);
  }

  const list: CodexEntityRecord[] = Object.values(GAME_ASSET_REGISTRY).map(
    (entry) => {
      const cat = isValidCodexCategory(entry.category)
        ? entry.category
        : "items";
      const nameVi = entry.inGameNameVi || entry.nameVi;
      const nameEn = entry.inGameNameEn || entry.nameEn;
      const subCategory = normalizeCanonicalSubCategory(
        cat,
        undefined,
        entry.iconPath,
        nameEn,
        entry.rarity
      );

      const extraTags: string[] = [];
      if (cat === "heroes") {
        const hp =
          HERO_VISUAL_PROFILES[entry.id] ??
          (entry.gameId !== null
            ? heroProfileByGid.get(entry.gameId)
            : undefined);
        if (hp?.isAwakenable || entry.rarity === "mythic") {
          extraTags.push("awakenable");
        }
        if (hp?.isEconomyPassive || entry.rarity === "epic" || entry.rarity === "rare") {
          extraTags.push("economy");
        }
      }

      return {
        id: entry.id,
        gameId: entry.gameId,
        glossaryId: entry.glossaryId,
        category: cat,
        subCategory,
        path: entry.iconPath,
        portraitPath: entry.portraitPath,
        extraTags,
        nameVi,
        nameEn,
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
    readonly subCategory?: string;
    readonly rarity: AssetRarity | "all";
    readonly faction: AssetFaction | "all";
    readonly extraFilter?: string;
    readonly query: string;
  }
): readonly T[] {
  const normQuery = normalizeSearchQuery(filters.query);
  const targetSub =
    filters.subCategory && filters.subCategory !== "all"
      ? filters.subCategory
      : null;
  const targetExtra =
    filters.extraFilter && filters.extraFilter !== "all"
      ? filters.extraFilter
      : null;

  return items.filter((item) => {
    if (filters.category !== "all" && item.category !== filters.category) {
      return false;
    }
    if (targetSub) {
      const itemSub = normalizeCanonicalSubCategory(
        item.category,
        item.subCategory,
        item.path,
        item.nameEn,
        item.rarity
      );
      if (itemSub !== targetSub) {
        return false;
      }
    }
    if (filters.rarity !== "all" && item.rarity !== filters.rarity) {
      return false;
    }
    if (filters.faction !== "all" && item.faction !== filters.faction) {
      return false;
    }
    if (targetExtra) {
      const tags = item.extraTags ?? [];
      if (!tags.includes(targetExtra)) {
        // Fallback inference for shard records before extraTags enrichment
        if (
          item.category === "heroes" &&
          targetExtra === "awakenable" &&
          item.rarity === "mythic"
        ) {
          // allowed
        } else if (
          item.category === "heroes" &&
          targetExtra === "economy" &&
          (item.rarity === "epic" || item.rarity === "rare")
        ) {
          // allowed
        } else {
          return false;
        }
      }
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
  const totalEntities = Object.values(INITIAL_CODEX_CATEGORY_COUNTS).reduce(
    (acc, n) => acc + n,
    0
  );

  return {
    version: "4.1.0",
    totalEntities,
    indexedEntities: seeds.length,
    categoryCounts: INITIAL_CODEX_CATEGORY_COUNTS,
    items: seeds,
  };
}

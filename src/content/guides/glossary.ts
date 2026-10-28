import type { GuideLocale } from "./types";

/**
 * Extended locale union supporting current active locales ("vi" | "en")
 * plus future international locales ("ja" | "ko" | "zh" | "th") per NFR-V4-03.
 */
export type GlossaryExtendedLocale = GuideLocale | "ja" | "ko" | "zh" | "th";

/**
 * Standardized 8-group classification per Master Plan DEC-V4-03 & Section 3.3.
 */
export type GlossaryCategory =
  | "factions"
  | "rarities_and_tiers"
  | "roles_and_positions"
  | "heroes"
  | "events"
  | "items_and_currencies"
  | "buildings_and_systems"
  | "meta_slang";

export interface GlossaryLocalizedText {
  vi: string;
  en: string;
  ja?: string;
  ko?: string;
  zh?: string;
  th?: string;
}

export interface GlossaryHeroMeta {
  faction: "league" | "horde" | "nature";
  rarity: "mythic" | "legendary" | "epic" | "rare";
  isAwakenable?: boolean;
  isEconomyPassive?: boolean;
}

export interface GlossaryTerm {
  /** Unique, stable kebab-case identifier (e.g., "faction-horde", "hero-wukong", "item-soul-stone") */
  id: string;
  /** Standardized 8-group classification per DEC-V4-03 */
  category: GlossaryCategory;
  /** Canonical localized display names (100% pure English in `.en`, zero Vietnamese parentheticals) */
  term: GlossaryLocalizedText;
  /** Optional community aliases / abbreviations for search & disambiguation */
  aliases?: {
    vi?: string[];
    en?: string[];
  };
  /** Concise tactical definition in both languages */
  definition: GlossaryLocalizedText;
  /** Optional hero/faction metadata when category === "heroes" */
  heroMeta?: GlossaryHeroMeta;
}

export const GLOSSARY_CATEGORIES: readonly GlossaryCategory[] = [
  "factions",
  "rarities_and_tiers",
  "roles_and_positions",
  "heroes",
  "events",
  "items_and_currencies",
  "buildings_and_systems",
  "meta_slang",
] as const;

export const GUIDE_GLOSSARY: readonly GlossaryTerm[] = [
  // ============================================================================
  // 1. FACTIONS (PHE PHÁI)
  // ============================================================================
  {
    id: "faction-league",
    category: "factions",
    term: { vi: "Phe Liên Minh (League)", en: "League Faction" },
    aliases: { vi: ["Liên Minh", "Hệ Lam", "Khiên Xanh"], en: ["League", "Blue Faction"] },
    definition: {
      vi: "Phe khởi đầu mượt nhất cho F2P/Low-Spender trong Ngày 1–20; khắc chế Thiên Nhiên (+20% DMG) và bị Bộ Lạc khắc chế.",
      en: "Smoothest starting faction for F2P/Low-Spenders during Days 1–20; counters Nature (+20% DMG) and is countered by Horde.",
    },
  },
  {
    id: "faction-horde",
    category: "factions",
    term: { vi: "Phe Bộ Lạc (Horde)", en: "Horde Faction" },
    aliases: { vi: ["Bộ Lạc", "Hệ Đỏ", "Đầu Lâu Đỏ"], en: ["Horde", "Red Faction"] },
    definition: {
      vi: "Phe thống trị Meta từ Ngày 21+ với 5–6 Tướng Đỏ gốc (Native Mythics); khắc chế Liên Minh (+20% DMG) và bị Thiên Nhiên khắc chế.",
      en: "Meta-dominating faction from Day 21+ with 5–6 Native Mythic heroes; counters League (+20% DMG) and is countered by Nature.",
    },
  },
  {
    id: "faction-nature",
    category: "factions",
    term: { vi: "Phe Thiên Nhiên (Nature)", en: "Nature Faction" },
    aliases: { vi: ["Thiên Nhiên", "Hệ Lục", "Lá Xanh"], en: ["Nature", "Green Faction"] },
    definition: {
      vi: "Phe triệu hồi và hồi phục cuối game (S1–S4); khắc chế cứng Bộ Lạc (+20% DMG) và bị Liên Minh khắc chế.",
      en: "Endgame summon-swarm and sustain faction (S1–S4); hard-counters Horde (+20% DMG) and is countered by League.",
    },
  },
  {
    id: "faction-aura",
    category: "factions",
    term: { vi: "Hào Quang Hệ Phái (Faction Aura)", en: "Faction Aura" },
    aliases: { vi: ["Buff Thuần Hệ", "Cộng hưởng 6 Tướng"], en: ["Pure Faction Bonus", "6-Hero Synergy"] },
    definition: {
      vi: "Chỉ số cộng thêm toàn đội khi xếp từ 4, 5 hoặc 6 tướng cùng Phe phái vào một đội hình.",
      en: "Team-wide stat multiplier granted when deploying 4, 5, or 6 heroes of the same Faction in a single queue.",
    },
  },
  {
    id: "faction-counter-bonus",
    category: "factions",
    term: { vi: "Khắc Chế Hệ Phái (Faction Counter)", en: "Faction Counter Bonus" },
    aliases: { vi: ["Tam Giác Khắc Chế"], en: ["Counter Triangle", "Elemental Advantage"] },
    definition: {
      vi: "Vòng lặp khắc chế Liên Minh ➔ Thiên Nhiên ➔ Bộ Lạc ➔ Liên Minh giúp tăng sát thương gây ra và giảm sát thương nhận vào.",
      en: "Rock-paper-scissors triangle (League ➔ Nature ➔ Horde ➔ League) granting bonus damage dealt and damage reduction.",
    },
  },

  // ============================================================================
  // 2. RARITIES & STAR TIERS (PHẨM CHẤT & CẤP SAO)
  // ============================================================================
  {
    id: "rarity-mythic",
    category: "rarities_and_tiers",
    term: { vi: "Tướng Đỏ (Mythic)", en: "Mythic (UR)" },
    aliases: { vi: ["Phẩm Đỏ", "Tướng Thần Thoại"], en: ["Mythic Hero", "Red Hero"] },
    definition: {
      vi: "Phẩm chất tướng cao nhất, tiêu tốn gấp đôi Mảnh Tướng so với Legendary (560 Mảnh cho 1★ Trắng, 1,000 Mảnh cho 15★).",
      en: "Highest hero rarity tier, requiring 2x the Hero Shards of Legendaries (560 Shards for 1★ White, 1,000 Shards for 15★).",
    },
  },
  {
    id: "rarity-legendary",
    category: "rarities_and_tiers",
    term: { vi: "Tướng Vàng (Legendary)", en: "Legendary (SSR)" },
    aliases: { vi: ["Phẩm Vàng", "Tướng Huyền Thoại"], en: ["Legendary Hero", "Gold Hero"] },
    definition: {
      vi: "Phẩm chất tướng trụ cột đầu game và kinh tế; cần 280 Mảnh cho 1★ Trắng và 500 Mảnh cho 15★.",
      en: "Core early-game and economic hero rarity; requires 280 Shards for 1★ White and 500 Shards for 15★.",
    },
  },
  {
    id: "rarity-epic",
    category: "rarities_and_tiers",
    term: { vi: "Tướng Tím (Epic)", en: "Epic (SR)" },
    aliases: { vi: ["Phẩm Tím", "8 Tướng Tím Kinh Tế"], en: ["Epic Hero", "Purple Hero"] },
    definition: {
      vi: "Nhóm 8 tướng chuyên cung cấp Thiên phú Kinh tế Ô 3 (+30%) khi đạt 2 Sao Trắng (12★ = 300 Mảnh).",
      en: "Group of 8 heroes providing +30% Trait 3 passive economic buffs upon reaching 2 White Stars (12★ = 300 Shards).",
    },
  },
  {
    id: "rarity-rare",
    category: "rarities_and_tiers",
    term: { vi: "Tướng Xanh (Rare)", en: "Rare (R)" },
    aliases: { vi: ["Phẩm Lam", "Tướng Tân Thủ"], en: ["Rare Hero", "Blue Hero"] },
    definition: {
      vi: "Nhóm 4 tướng khởi đầu 24h đầu tiên; chỉ giữ ở ghế dự bị để kích hoạt Liên kết Tướng (Hero Bonds).",
      en: "Group of 4 starter heroes used only during the first 24 hours; keep on the bench strictly for Hero Bonds.",
    },
  },
  {
    id: "tier-yellow-stars",
    category: "rarities_and_tiers",
    term: { vi: "Sao Vàng (Yellow Stars 1★–5★)", en: "Yellow Stars (1★–5★)" },
    aliases: { vi: ["1–5 Sao Vàng"], en: ["Gold Stars", "1★–5★"] },
    definition: {
      vi: "Giai đoạn 5 cấp sao đầu tiên của tướng (tốn 60 Mảnh Mythic hoặc 30 Mảnh Legendary).",
      en: "Initial 5-star progression stage (costs 60 Mythic Shards or 30 Legendary Shards).",
    },
  },
  {
    id: "tier-red-stars",
    category: "rarities_and_tiers",
    term: { vi: "Sao Đỏ (Red Stars 6★–10★)", en: "Red Stars (1★–5★ Red / 6★–10★)" },
    aliases: { vi: ["1 Sao Đỏ", "5 Sao Đỏ"], en: ["1 Red Star", "5 Red Stars"] },
    definition: {
      vi: "Giai đoạn 6★–10★; 1 Sao Đỏ (6★ = 160 Mảnh Mythic / 80 Mảnh Leg) mở khóa kỹ năng thứ 5/6.",
      en: "6★–10★ progression tier; 1 Red Star (6★ = 160 Mythic / 80 Legendary Shards) unlocks the 5th/6th combat skill.",
    },
  },
  {
    id: "tier-white-stars",
    category: "rarities_and_tiers",
    term: { vi: "Sao Trắng / Bạc (White Stars 11★–15★)", en: "White / Silver Stars (1★–5★ White / 11★–15★)" },
    aliases: { vi: ["1 Sao Trắng", "2 Sao Trắng", "5 Sao Trắng"], en: ["1 White Star", "2 White Stars", "5 White Stars", "Silver Stars"] },
    definition: {
      vi: "Giai đoạn 11★–15★; 1★ Trắng (11★ = 560 Mảnh Mythic / 280 Mảnh Leg) là điểm dừng tối ưu cho F2P.",
      en: "11★–15★ capstone tier; 1 White Star (11★ = 560 Mythic / 280 Legendary Shards) is the optimal F2P combat breakpoint.",
    },
  },
  {
    id: "tier-awakening",
    category: "rarities_and_tiers",
    term: { vi: "Thức Tỉnh Tướng Vàng (Awakening)", en: "Hero Awakening" },
    aliases: { vi: ["Thức Tỉnh Lên Đỏ", "4 Bậc Thức Tỉnh"], en: ["Awaken to Mythic", "4-Tier Awakening"] },
    definition: {
      vi: "Nâng cấp Tướng Vàng lên phẩm Đỏ (Mythic) qua 4 bậc bằng 9 Hồn Đá Đỏ + 345–385 Mảnh Tướng sau khi đạt 1★ Trắng.",
      en: "Upgrading an eligible Legendary hero to Mythic quality across 4 tiers using 9 Red Soul Stones + 345–385 Shards after 1★ White.",
    },
  },

  // ============================================================================
  // 3. ROLES & POSITIONS (VAI TRÒ & VỊ TRÍ ĐỘI HÌNH)
  // ============================================================================
  {
    id: "role-main-tank",
    category: "roles_and_positions",
    term: { vi: "Đỡ Đòn Chính (Main Tank)", en: "Main Tank" },
    aliases: { vi: ["Tanker Chính", "Lá Chắn Tuyến Đầu"], en: ["Primary Tank", "Frontline Anchor"] },
    definition: {
      vi: "Tướng đứng Hàng trước chịu toàn bộ sát thương mở màn; luôn mặc bộ trang bị Huyết Titan (Blood of the Titan).",
      en: "Frontline hero absorbing opening enemy focus fire; always equips the Blood of the Titan gear set.",
    },
  },
  {
    id: "role-bruiser",
    category: "roles_and_positions",
    term: { vi: "Đấu Sĩ Bán Chống Chịu (Bruiser / Off-Tank)", en: "Bruiser / Off-Tank" },
    aliases: { vi: ["Phụ Tank", "Bán Tank"], en: ["Sub-Tank", "Frontline Fighter"] },
    definition: {
      vi: "Tướng đứng Hàng trước vừa chia sẻ sát thương với Main Tank vừa gây sát thương diện rộng hoặc khống chế.",
      en: "Frontline warrior sharing incoming damage with the Main Tank while delivering AoE cleave or crowd control.",
    },
  },
  {
    id: "role-hyper-carry",
    category: "roles_and_positions",
    term: { vi: "Chủ Lực Sát Thương (Hyper-Carry DPS)", en: "Hyper-Carry DPS" },
    aliases: { vi: ["Carry Chính", "Chủ Lực Đội 1"], en: ["Main Carry", "Primary DPS"] },
    definition: {
      vi: "Nguồn sát thương số 1 của đội hình, được ưu tiên 100% Vũ khí Độc quyền, Sách Kỹ năng và bộ trang bị Kỵ Sĩ Vinh Quang.",
      en: "#1 damage dealer in the queue, receiving priority for Exclusive Weapons, Skill Books, and Knight's Glory gear.",
    },
  },
  {
    id: "role-support-healer",
    category: "roles_and_positions",
    term: { vi: "Hỗ Trợ / Hồi Máu (Support / Healer)", en: "Support / Healer" },
    aliases: { vi: ["Buff / Healer", "Khống Chế"], en: ["Controller", "Buffer"] },
    definition: {
      vi: "Tướng Hàng sau duy trì sinh lực, giải hiệu ứng và tăng tốc độ hồi năng lượng với bộ trang bị Hiền Triết Quang Vinh.",
      en: "Backline specialist providing healing, buffs, and crowd control using the Glory of the Sage gear set.",
    },
  },
  {
    id: "pos-frontline",
    category: "roles_and_positions",
    term: { vi: "Hàng Trước (Frontline — Ô 1 & 2)", en: "Frontline (Slots 1 & 2)" },
    aliases: { vi: ["Tuyến Đầu"], en: ["Front Row"] },
    definition: {
      vi: "2 vị trí đầu tiên trong đội hình 6 người, nơi đặt Main Tank và Off-Tank/Bruiser.",
      en: "First 2 positions in the 6-hero formation, reserved for Main Tanks and Off-Tanks/Bruisers.",
    },
  },
  {
    id: "pos-midline",
    category: "roles_and_positions",
    term: { vi: "Hàng Giữa (Midline — Ô 3 & 4)", en: "Midline (Slots 3 & 4)" },
    aliases: { vi: ["Tuyến Giữa"], en: ["Middle Row"] },
    definition: {
      vi: "2 vị trí trung tâm được bảo vệ tốt nhất trước cả sát thương trực diện lẫn sát thủ móc lốp; nơi đặt Hyper-Carry DPS.",
      en: "2 central slots safest from both frontal cleave and backline divers; optimal placement for Hyper-Carry DPS.",
    },
  },
  {
    id: "pos-backline",
    category: "roles_and_positions",
    term: { vi: "Hàng Sau (Backline — Ô 5 & 6)", en: "Backline (Slots 5 & 6)" },
    aliases: { vi: ["Tuyến Sau"], en: ["Back Row"] },
    definition: {
      vi: "2 vị trí cuối đội hình dành cho Healer và Support tầm xa.",
      en: "Rear 2 positions in the formation reserved for ranged Healers and Supports.",
    },
  },

  // ============================================================================
  // 4. HEROES — ALL 51 SSoT HEROES (16 LEAGUE + 19 HORDE + 16 NATURE)
  // ============================================================================
  // --- League (16 Heroes) ---
  {
    id: "hero-rose-princess",
    category: "heroes",
    term: { vi: "Công Chúa Hồng / Công Chúa Rose (Rose Princess)", en: "Rose Princess" },
    heroMeta: { faction: "league", rarity: "mythic" },
    definition: {
      vi: "Main Tank kiêm Buffer phẩm Đỏ số 1 của phe Liên Minh giai đoạn Endgame.",
      en: "Premier Mythic Main Tank and team-wide ATK/DEF buffer for Endgame League lineups.",
    },
  },
  {
    id: "hero-paragon",
    category: "heroes",
    term: { vi: "Đấng Toàn Năng / Thiện Xạ (Paragon)", en: "Paragon" },
    heroMeta: { faction: "league", rarity: "mythic" },
    definition: {
      vi: "Hyper-Carry DPS phẩm Đỏ gây sát thương chuẩn và chí mạng diện rộng của phe Liên Minh.",
      en: "Mythic Hyper-Carry DPS dealing devastating AoE true damage and critical strikes for League.",
    },
  },
  {
    id: "hero-bishop",
    category: "heroes",
    term: { vi: "Giám Mục (Bishop)", en: "Bishop" },
    heroMeta: { faction: "league", rarity: "mythic" },
    definition: {
      vi: "Burst DPS / Support phẩm Đỏ phe Liên Minh, khắc chế cứng đội hình triệu hồi Thiên Nhiên.",
      en: "League Mythic Burst DPS and support whose Sacred Burst hard-counters Nature summon swarms.",
    },
  },
  {
    id: "hero-artificer",
    category: "heroes",
    term: { vi: "Cơ Giới Sư / Thợ Chế Tạo (Artificer)", en: "Artificer" },
    heroMeta: { faction: "league", rarity: "mythic" },
    definition: {
      vi: "Siêu hỗ trợ phẩm Đỏ ra mắt ở Season 3 của phe Liên Minh.",
      en: "Season 3 Mythic hyper-support that enchants weapons and amplifies League team damage.",
    },
  },
  {
    id: "hero-adjudicator",
    category: "heroes",
    term: { vi: "Thẩm Phán Quan / Trọng Tài (Adjudicator)", en: "Adjudicator" },
    heroMeta: { faction: "league", rarity: "legendary", isAwakenable: true },
    definition: {
      vi: "Main Tank Vàng bền bỉ nhất đầu game của Liên Minh; có thể Thức tỉnh lên Đỏ.",
      en: "Most durable early-game League Legendary Main Tank; eligible for Mythic Awakening.",
    },
  },
  {
    id: "hero-pyromancer",
    category: "heroes",
    term: { vi: "Bộ Tinh / Pháp Sư Lửa (Pyromancer)", en: "Pyromancer" },
    heroMeta: { faction: "league", rarity: "legendary", isAwakenable: true },
    definition: {
      vi: "Pháp sư sát thương đốt diện rộng chủ lực giai đoạn S0 của Liên Minh; có thể Thức tỉnh lên Đỏ.",
      en: "Premier S0 AoE burn magic carry for League; eligible for Mythic Awakening.",
    },
  },
  {
    id: "hero-nun",
    category: "heroes",
    term: { vi: "Tu Nữ / Nữ Tu (Nun)", en: "Nun" },
    heroMeta: { faction: "league", rarity: "legendary", isAwakenable: true },
    definition: {
      vi: "Healer thuần hồi máu diện rộng lớn nhất của phe Liên Minh; có thể Thức tỉnh lên Đỏ.",
      en: "Primary AoE pure healer for the League faction; eligible for Mythic Awakening.",
    },
  },
  {
    id: "hero-bard",
    category: "heroes",
    term: { vi: "Nhà Thơ / Thi Sĩ (Bard)", en: "Bard" },
    heroMeta: { faction: "league", rarity: "legendary", isEconomyPassive: true },
    definition: {
      vi: "Buffer giảm hồi chiêu kiêm Tướng Vàng Kinh tế (+40% Tốc độ Xây dựng ở Trait 3 Lv.30).",
      en: "Cooldown/Crit buffer and Economy Legendary (+40% Construction Rate at Trait 3 Lv.30).",
    },
  },
  {
    id: "hero-astrologer",
    category: "heroes",
    term: { vi: "Nhà Chiêm Tinh / Chiêm Tinh Gia (Astrologer)", en: "Astrologer" },
    heroMeta: { faction: "league", rarity: "legendary" },
    definition: {
      vi: "Tướng Vàng sát thương đơn mục tiêu giai đoạn đầu game của Liên Minh.",
      en: "Early-game single-target burst Legendary hero for the League faction.",
    },
  },
  {
    id: "hero-secret-keeper",
    category: "heroes",
    term: { vi: "Vệ Binh Bí Mật / Người Giữ Bí Mật (Secret Keeper)", en: "Secret Keeper" },
    heroMeta: { faction: "league", rarity: "legendary", isEconomyPassive: true },
    definition: {
      vi: "Tanker Vàng đầu game kiêm Nội tại Kinh tế (+50% Tốc độ Hành quân PvP ở Trait 3 Lv.30).",
      en: "Early-game silence tank and Economy Legendary (+50% PvP March Speed at Trait 3 Lv.30).",
    },
  },
  {
    id: "hero-hostess",
    category: "heroes",
    term: { vi: "Chủ Quán Trọ / Nữ Chủ Quán (Hostess)", en: "Hostess" },
    heroMeta: { faction: "league", rarity: "legendary", isEconomyPassive: true },
    definition: {
      vi: "Tướng Vàng Kinh tế phe Liên Minh (+40% Tốc độ Huấn luyện Lính ở Trait 3 Lv.30).",
      en: "League Economy Legendary granting +40% Soldier Training Speed at Trait 3 Lv.30.",
    },
  },
  {
    id: "hero-knight",
    category: "heroes",
    term: { vi: "Kỵ Sĩ (Knight)", en: "Knight" },
    heroMeta: { faction: "league", rarity: "epic", isEconomyPassive: true },
    definition: {
      vi: "Tướng Tím Kinh tế ưu tiên #2: Mở khóa +30% Tốc độ Huấn luyện Lính ở 2 Sao Trắng (300 Mảnh).",
      en: "Epic Economy Hero #2: Unlocks +30% Soldier Training Speed at 2 White Stars (300 Shards).",
    },
  },
  {
    id: "hero-ranger",
    category: "heroes",
    term: { vi: "Du Hiệp / Cung Thủ (Ranger)", en: "Ranger" },
    heroMeta: { faction: "league", rarity: "epic", isEconomyPassive: true },
    definition: {
      vi: "Tướng Tím Kinh tế ưu tiên #3: Mở khóa +30% Tốc độ Thu thập Ruby ở 2 Sao Trắng (300 Mảnh).",
      en: "Epic Economy Hero #3: Unlocks +30% Ruby Gathering Speed at 2 White Stars (300 Shards).",
    },
  },
  {
    id: "hero-minister",
    category: "heroes",
    term: { vi: "Mục Sư / Bộ Trưởng (Minister)", en: "Minister" },
    heroMeta: { faction: "league", rarity: "epic", isEconomyPassive: true },
    definition: {
      vi: "Tướng Tím Kinh tế ưu tiên #6: Mở khóa +30% Tốc độ Chữa thương Bệnh viện ở 2 Sao Trắng.",
      en: "Epic Economy Hero #6: Unlocks +30% Hospital Healing Speed at 2 White Stars.",
    },
  },
  {
    id: "hero-guardsman",
    category: "heroes",
    term: { vi: "Vệ Binh (Guardsman)", en: "Guardsman" },
    aliases: { en: ["Guard"] },
    heroMeta: { faction: "league", rarity: "rare" },
    definition: {
      vi: "Tướng Xanh tân thủ phe Liên Minh; giữ ở ghế dự bị để kích Liên kết Tướng.",
      en: "League Rare starter hero; kept on the bench strictly for Hero Bonds.",
    },
  },
  {
    id: "hero-crossbowman",
    category: "heroes",
    term: { vi: "Nỏ Thủ (Crossbowman)", en: "Crossbowman" },
    heroMeta: { faction: "league", rarity: "rare" },
    definition: {
      vi: "Tướng Xanh tân thủ phe Liên Minh; giữ ở ghế dự bị để kích Liên kết Tướng.",
      en: "League Rare starter hero; kept on the bench strictly for Hero Bonds.",
    },
  },

  // --- Horde (19 Heroes) ---
  {
    id: "hero-desert-prince",
    category: "heroes",
    term: { vi: "Hoàng Tử Sa Mạc (Desert Prince)", en: "Desert Prince" },
    heroMeta: { faction: "horde", rarity: "mythic" },
    definition: {
      vi: "Bruiser / Main Tank phẩm Đỏ mở màn kỷ nguyên Bộ Lạc ở Ngày 21 (S0 Tuần 3).",
      en: "Mythic Bruiser and Main Tank who ushers in the Horde meta on Day 21 (S0 Week 3).",
    },
  },
  {
    id: "hero-storm-maiden",
    category: "heroes",
    term: { vi: "Thần Bão Tố / Nữ Thần Bão Tố (Storm Maiden)", en: "Storm Maiden" },
    heroMeta: { faction: "horde", rarity: "mythic" },
    definition: {
      vi: "Hyper-Carry AoE DPS phẩm Đỏ ra mắt Ngày 27, trụ cột sát thương của Bộ Lạc giai đoạn S0–S1.",
      en: "Mythic AoE Hyper-Carry releasing on Day 27; primary Horde firepower carry throughout S0–S1.",
    },
  },
  {
    id: "hero-witch",
    category: "heroes",
    term: { vi: "Vu Nữ / Phù Thủy (Witch)", en: "Witch" },
    heroMeta: { faction: "horde", rarity: "mythic" },
    definition: {
      vi: "Mythic Healer / CC ra mắt Ngày 41, mảnh ghép bắt buộc để xoay trục sang Bộ Lạc.",
      en: "Mythic Healer and crowd-controller releasing on Day 41; mandatory cornerstone for the Horde Pivot.",
    },
  },
  {
    id: "hero-wukong",
    category: "heroes",
    term: { vi: "Ngộ Không / Tôn Ngộ Không (Wukong)", en: "Wukong" },
    aliases: { vi: ["Ngộ Không", "Tôn Ngộ Không"], en: ["Monkey King"] },
    heroMeta: { faction: "horde", rarity: "mythic" },
    definition: {
      vi: "Siêu phẩm Hyper-Carry phẩm Đỏ ra mắt ở Season 2, đỉnh cao sát thương vật lý của phe Bộ Lạc.",
      en: "Season 2 apex Mythic Hyper-Carry; summons clones and delivers unmatched physical burst damage.",
    },
  },
  {
    id: "hero-beastmaster",
    category: "heroes",
    term: { vi: "Thợ Săn Quái Thú / Thú Tướng (Beastmaster)", en: "Beastmaster" },
    heroMeta: { faction: "horde", rarity: "mythic" },
    definition: {
      vi: "Ultimate Main Tank phẩm Đỏ ra mắt ở Season 2, hoàn thiện tuyến đầu bất tử của Bộ Lạc.",
      en: "Season 2 Mythic Main Tank generating massive HP shields and frontline crowd control for Horde.",
    },
  },
  {
    id: "hero-shadow-priest",
    category: "heroes",
    term: { vi: "Mục Sư Bóng Tối / Giáo Sĩ Bóng Tối (Shadow Priest)", en: "Shadow Priest" },
    heroMeta: { faction: "horde", rarity: "mythic" },
    definition: {
      vi: "Tướng Đỏ thứ 6 của Bộ Lạc ra mắt ở Season 3, hoàn tất đội hình 6 Mythic Thuần Bộ Lạc.",
      en: "Season 3 Mythic support/DPS that completes the 100% 6-Mythic Pure Horde endgame lineup.",
    },
  },
  {
    id: "hero-soulmancer",
    category: "heroes",
    term: { vi: "Kẻ Gọi Hồn / Thuật Sĩ Linh Hồn (Soulmancer)", en: "Soulmancer" },
    heroMeta: { faction: "horde", rarity: "legendary", isAwakenable: true },
    definition: {
      vi: "Support Vàng chia sẻ sát thương của Bộ Lạc; ứng viên Thức tỉnh lên Đỏ ở Season 1.",
      en: "Horde damage-link support Legendary; prime candidate for Mythic Awakening in Season 1.",
    },
  },
  {
    id: "hero-warlock",
    category: "heroes",
    term: { vi: "Pháp Sư Hắc Ám / Pháp Sư Bóng Tối (Warlock)", en: "Warlock" },
    heroMeta: { faction: "horde", rarity: "legendary", isAwakenable: true, isEconomyPassive: true },
    definition: {
      vi: "Buffer tăng Tốc đánh & Hút máu (Thức tỉnh Đỏ ở S1) kiêm Nội tại Kinh tế (+360,000 Giới hạn Cướp bóc).",
      en: "Attack Speed/Lifesteal buffer (Awakenable in S1) and Economy Legendary (+360,000 Plunder Cap).",
    },
  },
  {
    id: "hero-wilderness-hunter",
    category: "heroes",
    term: { vi: "Thợ Săn Hoang Dã (Wilderness Hunter)", en: "Wilderness Hunter" },
    heroMeta: { faction: "horde", rarity: "legendary" },
    definition: {
      vi: "DPS Vàng cầu nối của Bộ Lạc trong giai đoạn S0–S1 trước khi có Wukong.",
      en: "Mid-game physical DPS bridge hero for Horde during S0–S1 before Wukong arrives.",
    },
  },
  {
    id: "hero-swordmaster",
    category: "heroes",
    term: { vi: "Kiếm Sư / Kiếm Thánh (Swordmaster)", en: "Swordmaster" },
    heroMeta: { faction: "horde", rarity: "legendary" },
    definition: {
      vi: "Off-Tank Vàng đứng cặp tạm thời với Desert Prince ở S0–S1 trước khi có Beastmaster.",
      en: "Legendary Off-Tank pairing temporarily with Desert Prince in S0–S1 prior to Beastmaster.",
    },
  },
  {
    id: "hero-barbarian",
    category: "heroes",
    term: { vi: "Man Tộc / Chiến Binh Man Rợ (Barbarian)", en: "Barbarian" },
    heroMeta: { faction: "horde", rarity: "legendary" },
    definition: {
      vi: "Tanker Vàng chống chịu tạm thời đầu game của phe Bộ Lạc.",
      en: "Early-game temporary frontline Legendary tank for the Horde faction.",
    },
  },
  {
    id: "hero-wanderer",
    category: "heroes",
    term: { vi: "Lãng Khách / Kẻ Lang Thang (Wanderer)", en: "Wanderer" },
    heroMeta: { faction: "horde", rarity: "legendary" },
    definition: {
      vi: "Tướng Vàng sát thương đơn mục tiêu lên Boss PvE của phe Bộ Lạc.",
      en: "Low-cost single-target PvE Boss DPS Legendary hero for Horde.",
    },
  },
  {
    id: "hero-headhunter",
    category: "heroes",
    term: { vi: "Kẻ Săn Đầu / Thợ Săn Đầu Người (Headhunter)", en: "Headhunter" },
    heroMeta: { faction: "horde", rarity: "legendary", isEconomyPassive: true },
    definition: {
      vi: "Tướng Vàng Kinh tế phe Bộ Lạc (+40% Tốc độ Thu thập Ruby ở Trait 3 Lv.30).",
      en: "Horde Economy Legendary granting +40% Ruby Gathering Speed at Trait 3 Lv.30.",
    },
  },
  {
    id: "hero-shaman",
    category: "heroes",
    term: { vi: "Tế Tư / Pháp Sư Bộ Lạc (Shaman)", en: "Shaman" },
    heroMeta: { faction: "horde", rarity: "legendary", isEconomyPassive: true },
    definition: {
      vi: "Healer Vàng đầu game kiêm Nội tại Kinh tế (+40% Tốc độ Nghiên cứu Công nghệ ở Trait 3 Lv.30).",
      en: "Early healer and Economy Legendary granting +40% Tech Research Rate at Trait 3 Lv.30.",
    },
  },
  {
    id: "hero-boar",
    category: "heroes",
    term: { vi: "Người Heo Rừng (Boar)", en: "Boar" },
    aliases: { en: ["Boarman"] },
    heroMeta: { faction: "horde", rarity: "legendary" },
    definition: {
      vi: "Tanker Vàng kích hệ tạm thời đầu game của phe Bộ Lạc.",
      en: "Early-game temporary faction-filler tank for the Horde faction.",
    },
  },
  {
    id: "hero-brawler",
    category: "heroes",
    term: { vi: "Võ Sĩ / Đấu Sĩ (Brawler)", en: "Brawler" },
    heroMeta: { faction: "horde", rarity: "epic", isEconomyPassive: true },
    definition: {
      vi: "Tướng Tím quan trọng số 1 game (Epic #1): Mở khóa +30% Tốc độ Nghiên cứu Công nghệ ở 2 Sao Trắng (300 Mảnh).",
      en: "#1 Most Important Epic Hero in the game: Unlocks +30% Tech Research Rate at 2 White Stars (300 Shards).",
    },
  },
  {
    id: "hero-rogue",
    category: "heroes",
    term: { vi: "Đạo Tặc / Sát Thủ (Rogue)", en: "Rogue" },
    heroMeta: { faction: "horde", rarity: "epic", isEconomyPassive: true },
    definition: {
      vi: "Tướng Tím Kinh tế ưu tiên #4: Mở khóa +30% Tốc độ Thu thập Đá ở 2 Sao Trắng (300 Mảnh).",
      en: "Epic Economy Hero #4: Unlocks +30% Stone Gathering Speed at 2 White Stars (300 Shards).",
    },
  },
  {
    id: "hero-outlaw",
    category: "heroes",
    term: { vi: "Kẻ Đào Tẩu / Kẻ Ngoài Vòng Pháp Luật (Outlaw)", en: "Outlaw" },
    heroMeta: { faction: "horde", rarity: "epic", isEconomyPassive: true },
    definition: {
      vi: "Tướng Tím Kinh tế ưu tiên #5: Mở khóa +30% Tốc độ Thu thập Gỗ ở 2 Sao Trắng (300 Mảnh).",
      en: "Epic Economy Hero #5: Unlocks +30% Timber Gathering Speed at 2 White Stars (300 Shards).",
    },
  },
  {
    id: "hero-grunt",
    category: "heroes",
    term: { vi: "Lính Đánh Thuê (Grunt)", en: "Grunt" },
    aliases: { en: ["Mercenary"] },
    heroMeta: { faction: "horde", rarity: "rare" },
    definition: {
      vi: "Tướng Xanh tân thủ phe Bộ Lạc; giữ ở ghế dự bị để kích Liên kết Tướng.",
      en: "Horde Rare starter hero; kept on the bench strictly for Hero Bonds.",
    },
  },

  // --- Nature (16 Heroes) ---
  {
    id: "hero-tidecaller",
    category: "heroes",
    term: { vi: "Thủy Triều / Thuật Sĩ Thủy Triều (Tidecaller)", en: "Tidecaller" },
    heroMeta: { faction: "nature", rarity: "mythic" },
    definition: {
      vi: "Trái tim của hệ Thiên Nhiên: Vừa triệu hồi Thủy tinh linh đỡ đạn, vừa hồi máu và gây sát thương diện rộng.",
      en: "Core Mythic summoner, healer, and AoE carry anchoring all Nature lineups.",
    },
  },
  {
    id: "hero-monk",
    category: "heroes",
    term: { vi: "Tăng Nhân / Hòa Thượng (Monk)", en: "Monk" },
    heroMeta: { faction: "nature", rarity: "mythic" },
    definition: {
      vi: "Main Tank phẩm Đỏ của hệ Thiên Nhiên ra mắt ở Season 1 với khả năng tạo khiên vàng và miễn khống chế.",
      en: "Season 1 Nature Mythic Main Tank providing golden shields, crowd-control immunity, and enemy grouping.",
    },
  },
  {
    id: "hero-ne-zha",
    category: "heroes",
    term: { vi: "Na Tra (Ne Zha)", en: "Ne Zha" },
    heroMeta: { faction: "nature", rarity: "mythic" },
    definition: {
      vi: "Hyper-Carry AoE / Bruiser phẩm Đỏ công thủ toàn diện của hệ Thiên Nhiên ra mắt ở Season 1.",
      en: "Season 1 Nature Mythic two-way Hyper-Carry and Bruiser with screen-wide burn and self-revival.",
    },
  },
  {
    id: "hero-petalis",
    category: "heroes",
    term: { vi: "Hoa Tiên / Tiên Hoa Petalis (Petalis)", en: "Petalis" },
    heroMeta: { faction: "nature", rarity: "mythic" },
    definition: {
      vi: "Ultimate Support phẩm Đỏ ra mắt ở Season 3, hoàn thiện độ bất tử và phản sát thương của hệ Thiên Nhiên.",
      en: "Season 3 capstone Nature Mythic support granting near-immortality and damage reflection.",
    },
  },
  {
    id: "hero-pixie",
    category: "heroes",
    term: { vi: "Hồ Tiên / Tiên Nhỏ (Pixie)", en: "Pixie" },
    heroMeta: { faction: "nature", rarity: "legendary", isAwakenable: true },
    definition: {
      vi: "Pháp sư sát thương phép diện rộng của Thiên Nhiên; ưu tiên số 1 để Thức tỉnh lên Đỏ của hệ Nature.",
      en: "Primary Nature AoE magic burst DPS and #1 Awakening candidate for Nature mains.",
    },
  },
  {
    id: "hero-forest-maiden",
    category: "heroes",
    term: { vi: "Thần Rừng / Thiếu Nữ Rừng Xanh (Forest Maiden)", en: "Forest Maiden" },
    heroMeta: { faction: "nature", rarity: "legendary" },
    definition: {
      vi: "Support Vàng cộng hưởng triệu hồi, hồi năng lượng và máu mỗi khi đệ triệu hồi xuất hiện hoặc ngã xuống.",
      en: "Nature summon-resonance support who stacks team-wide Energy and Healing whenever summons spawn or fall.",
    },
  },
  {
    id: "hero-sage",
    category: "heroes",
    term: { vi: "Hiền Giả / Hiền Triết (Sage)", en: "Sage" },
    heroMeta: { faction: "nature", rarity: "legendary", isAwakenable: true },
    definition: {
      vi: "Tanker tạo giáp cây và hồi phục tuyến đầu của Thiên Nhiên; có thể Thức tỉnh lên Đỏ.",
      en: "Nature frontline shield tank with sustained regeneration; eligible for Mythic Awakening.",
    },
  },
  {
    id: "hero-windwalker",
    category: "heroes",
    term: { vi: "Phong Hành Giả (Windwalker)", en: "Windwalker" },
    heroMeta: { faction: "nature", rarity: "legendary" },
    definition: {
      vi: "Sát thủ Vàng nhảy hàng sau của Thiên Nhiên ở giai đoạn đầu-giữa game.",
      en: "Early-to-mid game backline assassin Legendary for the Nature faction.",
    },
  },
  {
    id: "hero-treeguard",
    category: "heroes",
    term: { vi: "Vệ Thần Rừng (Treeguard)", en: "Treeguard" },
    heroMeta: { faction: "nature", rarity: "legendary", isEconomyPassive: true },
    definition: {
      vi: "Tanker Vàng S0 kiêm Nội tại Kinh tế (+40% Tốc độ Thu thập Gỗ ở Trait 3 Lv.30).",
      en: "S0 frontline tank and Economy Legendary (+40% Timber Gathering Speed at Trait 3 Lv.30).",
    },
  },
  {
    id: "hero-stonemason",
    category: "heroes",
    term: { vi: "Thợ Đá (Stonemason)", en: "Stonemason" },
    heroMeta: { faction: "nature", rarity: "legendary", isEconomyPassive: true },
    definition: {
      vi: "Tướng Vàng Hệ Thiên Nhiên sở hữu Nội tại Kinh tế (+40% Tốc độ Thu thập Đá ở Trait 3 Lv.30).",
      en: "Legendary Nature Economy Hero granting +40% Stone Gathering Speed at Trait 3 Lv.30.",
    },
  },
  {
    id: "hero-druid",
    category: "heroes",
    term: { vi: "Tinh Linh / Đại Tư Tế Rừng (Druid)", en: "Druid" },
    heroMeta: { faction: "nature", rarity: "legendary" },
    definition: {
      vi: "Healer Vàng gọi đệ cây nhỏ giai đoạn đầu của hệ Thiên Nhiên.",
      en: "Early-game treant summoner and pure healer Legendary for Nature.",
    },
  },
  {
    id: "hero-watcher",
    category: "heroes",
    term: { vi: "Cổ Thụ / Người Quan Sát (Watcher)", en: "Watcher" },
    heroMeta: { faction: "nature", rarity: "legendary", isEconomyPassive: true },
    definition: {
      vi: "Tướng Vàng Kinh tế hệ Thiên Nhiên (+2,000 Quy mô Quân đoàn ở Trait 3 Lv.30).",
      en: "Nature Economy Legendary granting +2,000 Soldier Capacity at Trait 3 Lv.30.",
    },
  },
  {
    id: "hero-pathfinder",
    category: "heroes",
    term: { vi: "Người Dẫn Đường / Người Mở Đường (Pathfinder)", en: "Pathfinder" },
    heroMeta: { faction: "nature", rarity: "legendary", isEconomyPassive: true },
    definition: {
      vi: "Tướng Vàng Kinh tế hệ Thiên Nhiên (+50% Tốc độ Hành quân PvE ở Trait 3 Lv.30).",
      en: "Nature Economy Legendary granting +50% PvE March Speed at Trait 3 Lv.30.",
    },
  },
  {
    id: "hero-priestess",
    category: "heroes",
    term: { vi: "Nữ Tư Tế (Priestess)", en: "Priestess" },
    heroMeta: { faction: "nature", rarity: "epic", isEconomyPassive: true },
    definition: {
      vi: "Tướng Tím Kinh tế ưu tiên #7: Mở khóa +30% Tốc độ Chữa thương Bệnh viện ở 2 Sao Trắng.",
      en: "Epic Economy Hero #7: Unlocks +30% Hospital Healing Speed at 2 White Stars.",
    },
  },
  {
    id: "hero-dancer",
    category: "heroes",
    term: { vi: "Vũ Nữ / Vũ Công (Dancer)", en: "Dancer" },
    heroMeta: { faction: "nature", rarity: "epic", isEconomyPassive: true },
    definition: {
      vi: "Tướng Tím Kinh tế ưu tiên #8: Mở khóa +30% Tốc độ Chữa thương Bệnh viện ở 2 Sao Trắng.",
      en: "Epic Economy Hero #8: Unlocks +30% Hospital Healing Speed at 2 White Stars.",
    },
  },
  {
    id: "hero-scout",
    category: "heroes",
    term: { vi: "Trinh Sát Rừng (Scout)", en: "Scout" },
    aliases: { en: ["Forest Scout"] },
    heroMeta: { faction: "nature", rarity: "rare" },
    definition: {
      vi: "Tướng Xanh tân thủ hệ Thiên Nhiên; giữ ở ghế dự bị để kích Liên kết Tướng.",
      en: "Nature Rare starter hero; kept on the bench strictly for Hero Bonds.",
    },
  },

  // ============================================================================
  // 5. EVENTS & ROTATIONS (SỰ KIỆN & CHU KỲ LUÂN PHIÊN)
  // ============================================================================
  {
    id: "event-guild-race",
    category: "events",
    term: { vi: "Thi Đấu Hội (Guild Race)", en: "Guild Race" },
    aliases: { vi: ["Kỳ Thi Đấu Hội", "Đua Bang"], en: ["Guild Race", "9-Slot Task Board"] },
    definition: {
      vi: "Sự kiện Bảng Nhiệm vụ 9 Ô (có 2 Ô Độc quyền) chạy liên tiếp hàng tuần ở Server mới (Pha 1) và luân phiên theo tiến độ server (Pha 2) để cày Điểm Vinh Dự mua Hồn Đá Đỏ.",
      en: "9-Slot Task Board alliance event (with 2 Exclusive Gold Slots) running weekly on new servers (Phase 1) and alternating in Phase 2 to farm Guild Honor for Red Soul Stones.",
    },
  },
  {
    id: "event-guild-arms-race",
    category: "events",
    term: { vi: "Chạy Đua Vũ Trang Bang Hội (Guild Arms Race — GAR)", en: "Guild Arms Race (GAR)" },
    aliases: { vi: ["Kỳ Đua Vũ Trang", "GAR"], en: ["GAR", "6-Day Arms Race"] },
    definition: {
      vi: "Sự kiện đối kháng 6 ngày theo chủ đề (Xây dựng, Nghiên cứu, Đá Cổ Ngữ, Chiêu mộ, Luyện lính, Chiến đấu).",
      en: "6-day themed alliance competition (Construction, Research, Runes/Gear, Hero Development, Training, Combat).",
    },
  },
  {
    id: "event-kvk",
    category: "events",
    term: { vi: "Chiến Tranh Vương Quốc (Kingdom vs Kingdom — KvK)", en: "Kingdom vs Kingdom (KvK / Four Nations League)" },
    aliases: { vi: ["KvK", "Liên Đấu Bốn Quốc Gia"], en: ["KvK", "Four Nations League"] },
    definition: {
      vi: "Sự kiện đại chiến liên server gồm 5 ngày Chuẩn bị (Prep Phase) và Ngày 6 Thực chiến chiếm ngai vàng.",
      en: "Cross-server war featuring 5 themed Preparation Days followed by Day 6 throne warfare.",
    },
  },
  {
    id: "event-dark-empire-invasion",
    category: "events",
    term: { vi: "Đế Quốc Hắc Ám Xâm Nhập (Dark Empire Invasion)", en: "Dark Empire Invasion" },
    aliases: { vi: ["Đế Quốc Hắc Ám"], en: ["Dark Empire"] },
    definition: {
      vi: "Sự kiện PvE phòng thủ/phản công liên minh diễn ra định kỳ xoay tua cùng Khiêu Chiến Đội Quân Hắc Ám.",
      en: "Recurring alliance defense/counterattack PvE event alternating with Dark Legion Challenge.",
    },
  },
  {
    id: "event-dark-legion-challenge",
    category: "events",
    term: { vi: "Khiêu Chiến Của Đội Quân Hắc Ám (Dark Legion Challenge)", en: "Dark Legion Challenge" },
    aliases: { vi: ["Đội Quân Hắc Ám"], en: ["Dark Legion"] },
    definition: {
      vi: "Sự kiện thủ thành chống các đợt tấn công của Quân đoàn Hắc Ám cùng bang hội.",
      en: "Alliance wave-defense event against marching Dark Legion waves.",
    },
  },
  {
    id: "event-giant-raid",
    category: "events",
    term: { vi: "Tập Kích Cự Ma (Giant Raid / Guild Boss)", en: "Giant Raid (Guild Boss)" },
    aliases: { vi: ["Cự Ma", "Boss Bang"], en: ["Giant Raid", "Guild Boss"] },
    definition: {
      vi: "Hoạt động săn Boss tập thể hàng ngày của bang hội để nhận thịt, tăng tốc và quà cống hiến.",
      en: "Daily cooperative alliance Boss raid rewarding Meat, Speedups, and guild contribution chests.",
    },
  },
  {
    id: "event-guild-rush",
    category: "events",
    term: { vi: "Đua Điểm Bang Hội (Guild Rush / Ultimate Power)", en: "Guild Rush / Ultimate Power" },
    aliases: { vi: ["Sự kiện phụ Ăn Kép"], en: ["Guild Rush", "Ultimate Power"] },
    definition: {
      vi: "Chuỗi sự kiện phụ 2–3 ngày trùng khớp với Guild Race / GAR tạo ra Giờ Vàng Ăn Kép (Double-Dip).",
      en: "2–3 day sub-event milestones overlapping with Guild Race / GAR to enable Double-Dip scoring.",
    },
  },
  {
    id: "event-fortune-wheel",
    category: "events",
    term: { vi: "Vòng Quay May Mắn (Fortune Wheel)", en: "Fortune Wheel" },
    aliases: { vi: ["Vòng Quay Tướng Đỏ"], en: ["Wheel", "Mythic Wheel"] },
    definition: {
      vi: "Sự kiện Gacha Kim Cương (750 KC/lượt, tiệm mảnh Liên Minh) xoay tua 3 tuần/lần cùng Hero Gacha và Xúc Xắc, độc lập với sự kiện trục chính.",
      en: "Diamond Gacha event (750 Diamonds/spin, League token shop) rotating every 3rd week alongside Hero Gacha and Dice of Fate, independent of macro events.",
    },
  },
  {
    id: "event-dice-of-fate",
    category: "events",
    term: { vi: "Xúc Xắc Định Mệnh (Dice of Fate)", en: "Dice of Fate" },
    aliases: { vi: ["Sự Kiện Xúc Xắc"], en: ["Dice Event"] },
    definition: {
      vi: "Sự kiện Gacha Kim Cương (800 KC/lượt, tiệm mảnh Tự Nhiên) xoay tua 3 tuần/lần cùng Vòng Quay và Hero Gacha (1,000 KC — Bộ Lạc), độc lập với sự kiện trục chính.",
      en: "Diamond Gacha event (800 Diamonds/roll, Nature token shop) rotating every 3rd week alongside Fortune Wheel and Hero Gacha (1,000 Diamonds — Horde), independent of macro events.",
    },
  },

  // ============================================================================
  // 6. ITEMS, CURRENCIES & GEAR SETS (VẬT PHẨM, TIỀN TỆ & BỘ TRANG BỊ)
  // ============================================================================
  {
    id: "item-soul-stone",
    category: "items_and_currencies",
    term: { vi: "Đá Linh Hồn (Hồn Đá Đỏ / Red Soul Stone)", en: "Red Soul Stone" },
    aliases: { vi: ["Đá Linh Hồn", "Hồn Đá Đỏ", "Đá Thức Tỉnh", "9 Hồn Đá Đỏ"], en: ["Soul Stone", "9 Red Soul Stones"] },
    definition: {
      vi: "Vật phẩm tối thượng dùng để Thức tỉnh Tướng Vàng lên phẩm Đỏ (cần đúng 9 viên + 345–385 Mảnh Tướng).",
      en: "Endgame item required to Awaken a Legendary hero to Mythic quality (requires 9 stones + 345–385 Shards).",
    },
  },
  {
    id: "item-universal-shard",
    category: "items_and_currencies",
    term: { vi: "Mảnh Anh Hùng Huyền Thoại Vạn Năng (Universal Legendary Hero Shard)", en: "Universal Legendary Hero Shard" },
    aliases: { vi: ["Mảnh Anh Hùng Huyền Thoại Vạn Năng", "Mảnh Tướng Vàng Vạn Năng", "Mảnh Vạn Năng", "Mảnh Vàng Vạn Năng"], en: ["Universal Shard", "Gold Shard"] },
    definition: {
      vi: "Tài nguyên quý hiếm chỉ được phép đút cho Tướng Đỏ (Mythic) hoặc Tướng Vàng có lộ trình Thức tỉnh của Đội 1.",
      en: "Scarce progression currency strictly reserved for Queue 1 Mythic heroes or Awakenable Legendaries.",
    },
  },
  {
    id: "item-skill-book",
    category: "items_and_currencies",
    term: { vi: "Sách Kỹ Năng (Skill Book)", en: "Skill Book" },
    aliases: { vi: ["Sách Cam", "24,700 Sách/kỹ năng"], en: ["Orange Skill Book", "24,700 Books/skill"] },
    definition: {
      vi: "Nguyên liệu nâng cấp kỹ năng tướng (cần 8,000 Sách lên Lv.10 và 24,700 Sách lên Lv.15 cho mỗi kỹ năng).",
      en: "Hero skill upgrade material (requires 8,000 Books for Lv.10 and 24,700 Books for Lv.15 per skill).",
    },
  },
  {
    id: "item-guild-honor",
    category: "items_and_currencies",
    term: { vi: "Điểm Vinh Dự Bang Hội (Guild Honor)", en: "Guild Honor" },
    aliases: { vi: ["Điểm Vinh Dự", "40,000 Điểm Vinh Dự"], en: ["Guild Honor Points"] },
    definition: {
      vi: "Tiền tệ kiếm được từ Thi Đấu Hội (Guild Race), dùng mua Hồn Đá Đỏ (40,000 Điểm/viên = 360,000 Điểm/9 viên).",
      en: "Currency earned from Guild Race, used to buy Red Soul Stones (40,000 Honor/stone = 360,000 Honor for 9 stones).",
    },
  },
  {
    id: "item-guild-coins",
    category: "items_and_currencies",
    term: { vi: "Xu Vinh Quang Bang Hội (Guild Coins)", en: "Guild Coins" },
    aliases: { vi: ["Xu Vinh Quang", "6,000 Xu Vinh Quang"], en: ["Glory Coins"] },
    definition: {
      vi: "Tiền tệ dùng mua Hồn Đá Đỏ tại Tiệm Bang Hội (6,000 Xu/viên = 54,000 Xu/9 viên).",
      en: "Currency used to purchase Red Soul Stones in the Guild Shop (6,000 Coins/stone = 54,000 Coins for 9 stones).",
    },
  },
  {
    id: "item-promotion-stone",
    category: "items_and_currencies",
    term: { vi: "Đá Thăng Cấp Trang Bị (Promotion Stone)", en: "Promotion Stone" },
    aliases: { vi: ["Đá Thăng Cấp", "Titan Mark"], en: ["Gear Promotion Stone"] },
    definition: {
      vi: "Nguyên liệu đột phá sao cho Trang bị Vàng từ 1★ lên 5★ Đỏ Thần Thoại (tốn 195,000 Đá cho đủ 24 món của 6 tướng).",
      en: "Breakthrough material for promoting Golden Gear from 1★ to 5★ Mythic Red (195,000 Stones for 24 pieces).",
    },
  },
  {
    id: "item-refined-metal",
    category: "items_and_currencies",
    term: { vi: "Đá Xanh / Thép Tinh Luyện (Refined Metal)", en: "Refined Metal" },
    aliases: { vi: ["Đá Xanh", "Thép Tinh Luyện"], en: ["Lord Gear Metal"] },
    definition: {
      vi: "Nguyên liệu cơ bản nâng cấp Trang bị Chúa Tể (tốn 958,800 Thép/món từ G1 lên Mythic T1 3★).",
      en: "Primary material for upgrading Lord Gear (958,800 Refined Metal/piece from G1 to Mythic T1 3★).",
    },
  },
  {
    id: "item-magic-thread",
    category: "items_and_currencies",
    term: { vi: "Dây Gai / Chỉ Phép (Magic Thread)", en: "Magic Thread" },
    aliases: { vi: ["Dây Gai", "Chỉ Phép"], en: ["Lord Gear Thread"] },
    definition: {
      vi: "Nguyên liệu cấp 2 nâng cấp Trang bị Chúa Tể (tốn 9,955 Dây Gai/món từ G1 lên Mythic T1 3★).",
      en: "Secondary material for upgrading Lord Gear (9,955 Magic Thread/piece from G1 to Mythic T1 3★).",
    },
  },
  {
    id: "item-blueprints-orichalcum",
    category: "items_and_currencies",
    term: { vi: "Bản Vẽ / Hợp Kim (Blueprints / Orichalcum)", en: "Blueprints / Orichalcum" },
    aliases: { vi: ["Bản Vẽ", "Hợp Kim"], en: ["Blueprints", "Orichalcum"] },
    definition: {
      vi: "Nguyên liệu điểm nghẽn nâng cấp Trang bị Chúa Tể từ bậc Lam B1 1★ trở lên (tốn 2,030 Bản Vẽ/món).",
      en: "Bottleneck material required for Lord Gear upgrades from Blue B1 1★ onward (2,030 Blueprints/piece).",
    },
  },
  {
    id: "item-dragon-blood",
    category: "items_and_currencies",
    term: { vi: "Nguyên Liệu Đỏ / Máu Rồng (Dragon Blood)", en: "Dragon Blood (Mythic Material)" },
    aliases: { vi: ["Máu Rồng"], en: ["Dragon Blood"] },
    definition: {
      vi: "Nguyên liệu cao cấp nâng Trang bị Chúa Tể từ Vàng Y1 1★ lên Đỏ Mythic T1 3★ (101 viên/món).",
      en: "Endgame material for upgrading Lord Gear from Yellow Y1 1★ to Mythic T1 3★ (101 Dragon Blood/piece).",
    },
  },
  {
    id: "item-dragon-essence",
    category: "items_and_currencies",
    term: { vi: "Tinh Hoa Rồng (Dragon Essence — DE-Dust)", en: "Dragon Essence (DE-Dust)" },
    aliases: { vi: ["Bụi Rồng", "DE"], en: ["DE-Dust", "Dragon Essence"] },
    definition: {
      vi: "Nguyên liệu nghiên cứu công nghệ cao cấp dùng cho Viện Huy Hoàng và các cây nghiên cứu cuối game.",
      en: "Advanced research currency required for the Brilliance Institute and late-game tech trees.",
    },
  },
  {
    id: "item-glory-medal",
    category: "items_and_currencies",
    term: { vi: "Huy Chương Vinh Quang (Glory Medal)", en: "Glory Medal" },
    aliases: { vi: ["Huy Chương Quân Trang"], en: ["Glory Medals"] },
    definition: {
      vi: "Tiền tệ dùng mua và nâng cấp Quân Trang (Troop Skins) và Mảnh Thánh Vật.",
      en: "Currency used to purchase and upgrade Troop Skins and Relic Shards in the Medal Shop.",
    },
  },
  {
    id: "gear-set-blood-of-the-titan",
    category: "items_and_currencies",
    term: { vi: "Bộ Kỵ Sĩ ➔ Bộ Đồ Titan (Huyết Titan / Nộ Huyết)", en: "Knight Set ➔ Titan's Might (Blood of the Titan)" },
    aliases: { vi: ["Bộ Kỵ Sĩ", "Bộ Đồ Titan", "Huyết Titan", "Nộ Huyết"], en: ["Knight Set", "Titan's Might", "Blood of the Titan", "Fury of Blood"] },
    definition: {
      vi: "Bộ Trang bị Vàng ➔ Đỏ trấn phái cho Main Tank & Bruiser — tối đa hóa % HP, Giảm sát thương và Khiên đầu trận.",
      en: "Signature Golden-to-Mythic Gear set for Main Tanks & Bruisers — maximizes % HP, Damage Reduction, and opening HP Shields.",
    },
  },
  {
    id: "gear-set-knights-glory",
    category: "items_and_currencies",
    term: { vi: "Bộ Đồ Quyết Đấu ➔ Cơn Thịnh Nộ (Kỵ Sĩ Vinh Quang)", en: "Duelist's Set ➔ Fury of Blood (Knight's Glory)" },
    aliases: { vi: ["Bộ Đồ Quyết Đấu", "Cơn Thịnh Nộ", "Kỵ Sĩ Vinh Quang", "Cuồng Chiến"], en: ["Duelist's Set", "Fury of Blood", "Knight's Glory", "Knight's Glory Set"] },
    definition: {
      vi: "Bộ Trang bị Vàng ➔ Đỏ trấn phái cho Hyper-Carry DPS — khuếch đại Sát thương Kỹ năng và Tỷ lệ Chí mạng.",
      en: "Signature Golden-to-Mythic Gear set for Hyper-Carry Burst/Skill DPS — amplifies Skill Damage and Critical Rate.",
    },
  },
  {
    id: "gear-set-glory-of-the-sage",
    category: "items_and_currencies",
    term: { vi: "Bộ Hiền Giả ➔ Ánh Sáng Vinh Quang (Hiền Triết Quang Vinh)", en: "Sage Set ➔ Glorious Light (Glory of the Sage)" },
    aliases: { vi: ["Bộ Hiền Giả", "Ánh Sáng Vinh Quang", "Hiền Triết Quang Vinh", "Hiền Triết"], en: ["Sage Set", "Glorious Light", "Glory of the Sage", "Glory of the Sage Set"] },
    definition: {
      vi: "Bộ Trang bị Vàng ➔ Đỏ trấn phái cho Support, Healer & Controller — tăng Tốc đánh, Giảm hồi chiêu và Hồi Năng lượng.",
      en: "Signature Golden-to-Mythic Gear set for Supports, Healers & Controllers — boosts Attack Speed, Cooldown Reduction, and Energy Regen.",
    },
  },

  // ============================================================================
  // 7. BUILDINGS & PROGRESSION SYSTEMS (CÔNG TRÌNH & HỆ THỐNG SỨC MẠNH)
  // ============================================================================
  {
    id: "system-brilliance-institute",
    category: "buildings_and_systems",
    term: { vi: "Viện Huy Hoàng (Brilliance Institute)", en: "Brilliance Institute" },
    aliases: { vi: ["Cấp Huy Hoàng", "Brilliance 1–3"], en: ["Brilliance Level"] },
    definition: {
      vi: "Công trình mở khóa sau Lâu đài Lv.40, quyết định cấp độ Quân đoàn T11 và sức mạnh cuối game.",
      en: "Endgame building unlocked after Castle Lv.40 that governs T11 troop tiers and Brilliance research.",
    },
  },
  {
    id: "system-research-cottage",
    category: "buildings_and_systems",
    term: { vi: "Viện Nghiên Cứu (Research Cottage)", en: "Research Cottage" },
    aliases: { vi: ["Nhà Nghiên Cứu"], en: ["Tech Academy"] },
    definition: {
      vi: "Công trình nghiên cứu công nghệ Kinh tế, Chiến đấu và Nhân đôi Phần thưởng sự kiện.",
      en: "Core building for researching Economy, Combat, and Arms Race Double Rewards technologies.",
    },
  },
  {
    id: "system-training-ground",
    category: "buildings_and_systems",
    term: { vi: "Trại Huấn Luyện (Training Ground)", en: "Training Ground" },
    aliases: { vi: ["Doanh Trại"], en: ["Barracks"] },
    definition: {
      vi: "Công trình huấn luyện và thăng cấp Lính Bậc Thang (Staircase Promotion) vào Thứ Sáu Kỳ GAR/KvK.",
      en: "Military building used for training troops and executing Staircase Promotions on Friday of GAR/KvK.",
    },
  },
  {
    id: "system-lord-gear",
    category: "buildings_and_systems",
    term: { vi: "Trang Bị Chúa Tể (Lord Gear / Military Gear)", en: "Lord Gear (Military Gear)" },
    aliases: { vi: ["Đồ Chúa Tể", "Đồ Lãnh Chúa"], en: ["Lord Gear", "Military Gear"] },
    definition: {
      vi: "Hệ thống 6 món trang bị của Lãnh Chúa chia làm Nhánh Trái (Thủ/HP) và Nhánh Phải (Công/ATK).",
      en: "6-slot Lord equipment system split into Left Branch (Defense/HP) and Right Branch (Offense/ATK).",
    },
  },
  {
    id: "system-sacred-codex",
    category: "buildings_and_systems",
    term: { vi: "Thánh Điển (Sacred Codex)", en: "Sacred Codex" },
    aliases: { vi: ["Sách Thánh"], en: ["Codex"] },
    definition: {
      vi: "Tính năng mở khóa ở Tuần 4 Season 3 khi cả 6 món Trang bị Chúa Tể đạt tối thiểu bậc Vàng Y2 (Legendary T2).",
      en: "Season 3 Week 4 capstone system unlocked when all 6 main Lord Gear pieces reach Y2 (Legendary T2).",
    },
  },
  {
    id: "system-runes",
    category: "buildings_and_systems",
    term: { vi: "Đá Cổ Ngữ (Runes)", en: "Runes" },
    aliases: { vi: ["Cổ Ngữ"], en: ["Rune System"] },
    definition: {
      vi: "Hệ thống 6 khe đá khảm theo quy luật hợp thành 3^(n-1), xả điểm vào Thứ Ba Kỳ GAR/KvK.",
      en: "6-slot socket system governed by the 3^(n-1) merge law, scored on Tuesday of GAR/KvK.",
    },
  },
  {
    id: "system-relics",
    category: "buildings_and_systems",
    term: { vi: "Thánh Vật (Relics)", en: "Relics" },
    aliases: { vi: ["Bộ 3 Thánh Vật"], en: ["Relic System"] },
    definition: {
      vi: "Hệ thống 3 khe vật phẩm kích hoạt kỹ năng chủ động trong trận đấu (Khống chế, Công, Thủ/Hồi phục).",
      en: "3-slot active artifact system deployed in combat (Control, Offense, and Defense/Sustain).",
    },
  },
  {
    id: "system-pets-behemoth",
    category: "buildings_and_systems",
    term: { vi: "Thú Cưng & Cự Thú (Pets & Behemoth)", en: "Pets & Behemoth" },
    aliases: { vi: ["Thú Cưng", "Cự Thú"], en: ["Companion Pets", "Behemoth"] },
    definition: {
      vi: "Hệ thống thú đồng hành tăng chỉ số theo Phe phái (Cactini cho Nature, Howli cho Horde, Eggy/Ostrich cho League).",
      en: "Faction-aligned companion pet and Behemoth system (Cactini for Nature, Howli for Horde, Eggy/Ostrich for League).",
    },
  },
  {
    id: "system-troop-skins",
    category: "buildings_and_systems",
    term: { vi: "Quân Trang (Troop Skins)", en: "Troop Skins" },
    aliases: { vi: ["Skin Lính"], en: ["Soldier Skins"] },
    definition: {
      vi: "Hệ thống ngoại trang quân đội cộng chỉ số sở hữu toàn cục và chỉ số trang bị trực tiếp cho từng đội hình.",
      en: "Military skin system granting both passive ownership stats and active deployment multipliers.",
    },
  },

  // ============================================================================
  // 8. META SLANG & TACTICAL CONCEPTS (THUẬT NGỮ CHIẾN THUẬT & META)
  // ============================================================================
  {
    id: "meta-strict-one-queue",
    category: "meta_slang",
    term: { vi: "Kỷ Luật Độc Tôn Đội 1 (Strict One-Queue Rule)", en: "Strict One-Queue Rule" },
    aliases: { vi: ["Nuôi Duy Nhất Đội 1"], en: ["One-Queue Discipline", "Single-Queue Focus"] },
    definition: {
      vi: "Quy tắc sống còn dồn 95–100% Mảnh Vạn Năng, Sách Kỹ năng, Thịt và Trang bị Vàng cho duy nhất 6 tướng Đội 1.",
      en: "Golden survival rule funneling 95–100% of Universal Shards, Skill Books, Meat, and Golden Gear into Queue 1.",
    },
  },
  {
    id: "meta-double-dip",
    category: "meta_slang",
    term: { vi: "Ăn Kép Sự Kiện (Double-Dip / Triple-Dip)", en: "Double-Dip / Triple-Dip" },
    aliases: { vi: ["Giờ Vàng Ăn Kép"], en: ["Event Stacking"] },
    definition: {
      vi: "Kỹ thuật tích trữ tài nguyên xả vào đúng khung giờ giao thoa giữa 2–3 sự kiện để nhận gấp đôi/gấp ba phần thưởng.",
      en: "Hoarding and spending resources during overlapping event windows to claim 2x–3x milestone rewards simultaneously.",
    },
  },
  {
    id: "meta-horde-pivot",
    category: "meta_slang",
    term: { vi: "Xoay Trục Bộ Lạc (Horde Pivot)", en: "Horde Pivot" },
    aliases: { vi: ["Chuyển Hệ Bộ Lạc Ngày 41"], en: ["Day 41 Horde Transition"] },
    definition: {
      vi: "Chiến thuật khởi đầu bằng Liên Minh 0 Mảnh ở Ngày 1–20 rồi chuyển toàn bộ tài nguyên sang Bộ Lạc khi mở khóa Desert Prince, Storm Maiden và Witch.",
      en: "Starting with a zero-shard League bridge in Days 1–20, then pivoting 100% of hoarded resources into Horde once Desert Prince, Storm Maiden, and Witch unlock.",
    },
  },
  {
    id: "meta-staircase-promotion",
    category: "meta_slang",
    term: { vi: "Thăng Cấp Lính Bậc Thang (Staircase Promotion)", en: "Staircase Troop Promotion" },
    aliases: { vi: ["Đôn Cấp Lính", "Ủ Lính Trước"], en: ["Staircase Method", "Pre-cooking Troops"] },
    definition: {
      vi: "Huấn luyện sẵn lính bậc T(n-1) trong tuần rồi bấm Thăng cấp (Promote) lên T(n) vào Thứ Sáu GAR/KvK để tối ưu điểm trên mỗi giờ tăng tốc.",
      en: "Pre-training T(n-1) troops during the week and promoting them to T(n) on Friday of GAR/KvK to maximize points per speedup hour.",
    },
  },
  {
    id: "meta-guild-honor-freeze",
    category: "meta_slang",
    term: { vi: "Đóng Băng Điểm Vinh Dự (Guild Honor Freeze)", en: "Guild Honor Freeze" },
    aliases: { vi: ["Khóa Tiệm Bang Hội"], en: ["360,000 Guild Honor Floor"] },
    definition: {
      vi: "Kỷ luật giữ sàn an toàn 360,000 Điểm Vinh Dự + 54,000 Xu Vinh Quang để mua trọn 9 Hồn Đá Đỏ ngay khi mở khóa.",
      en: "Maintaining a strict safety floor of 360,000 Guild Honor + 54,000 Guild Coins to buy all 9 Red Soul Stones on schedule.",
    },
  },
  {
    id: "meta-smart-staggered-upgrade",
    category: "meta_slang",
    term: { vi: "Nâng Cấp Lệch Pha Thông Minh (Smart Staggered Upgrade)", en: "Smart Staggered Upgrade" },
    aliases: { vi: ["Chu Trình 4 Bước Đồ Chúa Tể"], en: ["4-Step Lord Gear Cycle"] },
    definition: {
      vi: "Chu trình nâng cấp Trang bị Chúa Tể: Nhánh Phải Hệ Đội 1 ➔ Nhánh Trái Hệ Đội 1 ➔ 1 món Nhánh Trái Hệ Phụ (kích Cộng hưởng 3 món) ➔ 3 món còn lại (kích Cộng hưởng 6 món).",
      en: "4-step Lord Gear upgrade order: Queue 1 Right ➔ Queue 1 Left ➔ 1 Off-Faction Left (3-Piece Resonance) ➔ Remaining 3 pieces (6-Piece Resonance).",
    },
  },
  {
    id: "meta-defense-baiting",
    category: "meta_slang",
    term: { vi: "Bẫy Thủ Thành & Giấu Quân (Defense Baiting)", en: "Defense Baiting & Garrison Trap" },
    aliases: { vi: ["Giấu Đội 1", "Bẫy Tường Thành"], en: ["Wall Trap", "Queue Hiding"] },
    definition: {
      vi: "Bỏ tích chọn phòng thủ cho Đội 2/3 để chỉ Đội 1 đứng trên tường thành, hoặc rút Đội 1 vào mỏ/hang rồi nhả về đúng 1 giây trước khi địch chạm thành.",
      en: "Unchecking wall defense for Queues 2/3 so only Queue 1 defends, or hiding Queue 1 in a cave/node and recalling it 1 second before enemy impact.",
    },
  },
] as const;

/**
 * Pre-computed O(1) lookup map indexed by GlossaryTerm.id.
 */
export const GUIDE_GLOSSARY_BY_ID: ReadonlyMap<string, GlossaryTerm> = new Map(
  GUIDE_GLOSSARY.map((entry) => [entry.id, entry])
);

/**
 * Retrieves a glossary term by its canonical kebab-case ID.
 */
export function getGlossaryTerm(termId: string): GlossaryTerm | undefined {
  return GUIDE_GLOSSARY_BY_ID.get(termId);
}

/**
 * Returns all glossary terms belonging to a specific GlossaryCategory.
 */
export function getGlossaryTermsByCategory(category: GlossaryCategory): GlossaryTerm[] {
  return GUIDE_GLOSSARY.filter((entry) => entry.category === category);
}

/**
 * Resolves the localized display string for a glossary term ID,
 * falling back gracefully to `.en` when an optional future locale
 * ("ja" | "ko" | "zh" | "th") has not yet been populated (NFR-V4-03).
 */
export function translateGlossaryTerm(
  termId: string,
  locale: GlossaryExtendedLocale = "en"
): string {
  const entry = GUIDE_GLOSSARY_BY_ID.get(termId);
  if (!entry) return termId;
  return entry.term[locale] ?? entry.term.en;
}

function normalizeGlossaryQuery(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .trim();
}

/**
 * Searches across GlossaryTerm IDs, localized terms, aliases, and definitions.
 */
export function searchGlossaryTerms(
  query: string,
  locale?: GuideLocale
): GlossaryTerm[] {
  const normalized = normalizeGlossaryQuery(query);
  if (!normalized) return [...GUIDE_GLOSSARY];

  return GUIDE_GLOSSARY.filter((entry) => {
    const candidates: string[] = [
      entry.id,
      ...(locale ? [entry.term[locale], entry.definition[locale]] : [
        entry.term.vi,
        entry.term.en,
        entry.definition.vi,
        entry.definition.en,
      ]),
      ...(entry.aliases?.vi ?? []),
      ...(entry.aliases?.en ?? []),
    ];

    return candidates.some((text) =>
      normalizeGlossaryQuery(text).includes(normalized)
    );
  });
}

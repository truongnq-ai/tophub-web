import type {
  CalculatorCategory,
  CalculatorLocale,
  CalculatorMaterialRef,
  CalculatorToolItem,
  CalculatorZone,
} from "./types";

/**
 * SSoT Vật phẩm gốc trích xuất 100% từ public/images/items/manifest.json
 * (game_version: 1.125.5, table_version: 1.0.42291 — Quyết định DEC-CALC-03 & UX-UPGRADE-02)
 */
export const CALCULATOR_MATERIALS = {
  legendaryUniversalHeroShard: {
    gameId: 220005,
    nameVi: "Mảnh Vạn Năng Anh Hùng Cam",
    nameEn: "Legendary Universal Hero Shard",
    iconPath: "/images/items/shards/icon_30177.webp",
    rarity: "legendary",
  },
  epicUniversalHeroShard: {
    gameId: 220004,
    nameVi: "Mảnh Vạn Năng Anh Hùng Tím",
    nameEn: "Epic Universal Hero Shard",
    iconPath: "/images/items/shards/icon_30176.webp",
    rarity: "epic",
  },
  rareUniversalHeroShard: {
    gameId: 220003,
    nameVi: "Mảnh Vạn Năng Anh Hùng Lam",
    nameEn: "Rare Universal Hero Shard",
    iconPath: "/images/items/shards/icon_30175.webp",
    rarity: "rare",
  },
  leagueSoulStone: {
    gameId: 141,
    nameVi: "Đá Linh Hồn Liên Minh",
    nameEn: "League Soul Stone",
    iconPath: "/images/items/shards/icon_30231.webp",
    rarity: "mythic",
    faction: "league",
  },
  hordeSoulStone: {
    gameId: 142,
    nameVi: "Đá Linh Hồn Bộ Tộc",
    nameEn: "Horde Soul Stone",
    iconPath: "/images/items/shards/icon_30233.webp",
    rarity: "mythic",
    faction: "horde",
  },
  natureSoulStone: {
    gameId: 143,
    nameVi: "Đá Linh Hồn Thiên Nhiên",
    nameEn: "Nature Soul Stone",
    iconPath: "/images/items/shards/icon_30232.webp",
    rarity: "mythic",
    faction: "nature",
  },
  universalHeroicSpiritShard: {
    gameId: 230003,
    nameVi: "Mảnh Linh Thể Vạn Năng",
    nameEn: "Universal Heroic Spirit Shard",
    iconPath: "/images/items/shards/icon_30993.webp",
    rarity: "mythic",
  },
  meat: {
    gameId: 3,
    nameVi: "Thịt",
    nameEn: "Meat",
    iconPath: "/images/items/resources/icon_20001.webp",
    rarity: "rare",
  },
  skillBook: {
    gameId: 250,
    nameVi: "Sách Skill",
    nameEn: "Skill Book",
    iconPath: "/images/items/materials/icon_30361.webp",
    rarity: "epic",
  },
  gloryMedal: {
    gameId: 12210200,
    nameVi: "Huy Chương Vinh Dự",
    nameEn: "Glory Medal",
    iconPath: "/images/items/consumables/icon_12210200.webp",
    rarity: "legendary",
  },
  gearEnhanceRune: {
    gameId: 206,
    nameVi: "Rune Cường Hóa Trang Bị",
    nameEn: "Gear Enhance Rune",
    iconPath: "/images/items/consumables/icon_30095.webp",
    rarity: "epic",
  },
  solarGoldIngot: {
    gameId: 404100005,
    nameVi: "Vàng Thái Dương",
    nameEn: "Solar Gold Ingot",
    iconPath: "/images/items/materials/icon_30370.webp",
    rarity: "legendary",
  },
  legendaryPromotionStone: {
    gameId: 151,
    nameVi: "Đá Đột Phá Trang Bị Cam",
    nameEn: "Legendary Promotion Stone",
    iconPath: "/images/items/materials/icon_30382.webp",
    rarity: "legendary",
  },
  mythicPromotionStone: {
    gameId: 152,
    nameVi: "Đá Đột Phá Trang Bị Đỏ",
    nameEn: "Mythic Promotion Stone",
    iconPath: "/images/items/materials/icon_30383.webp",
    rarity: "mythic",
  },
  universalExclusiveGearShard: {
    gameId: 230001,
    nameVi: "Mảnh Trang Bị Độc Quyền Vạn Năng",
    nameEn: "Universal Exclusive Gear Shard",
    iconPath: "/images/items/shards/icon_30511.webp",
    rarity: "legendary",
  },
  meteoricIronCore: {
    gameId: 258,
    nameVi: "Lõi Sắt Thiên Thạch",
    nameEn: "Meteoric Iron Core",
    iconPath: "/images/items/materials/icon_31013.webp",
    rarity: "mythic",
  },
  refinedMetal: {
    gameId: 154,
    nameVi: "Kim Loại Tinh Luyện",
    nameEn: "Refined Metal",
    iconPath: "/images/items/materials/icon_material_1.webp",
    rarity: "rare",
  },
  magicThread: {
    gameId: 155,
    nameVi: "Sợi Tơ Ma Thuật",
    nameEn: "Magic Thread",
    iconPath: "/images/items/materials/icon_material_2.webp",
    rarity: "epic",
  },
  orichalcum: {
    gameId: 156,
    nameVi: "Orichalcum",
    nameEn: "Orichalcum",
    iconPath: "/images/items/materials/icon_material_3.webp",
    rarity: "legendary",
  },
  dragonBlood: {
    gameId: 157,
    nameVi: "Huyết Rồng",
    nameEn: "Dragon Blood",
    iconPath: "/images/items/materials/icon_material_4.webp",
    rarity: "mythic",
  },
  runeDust: {
    gameId: 10029,
    nameVi: "Bụi Cổ Ngữ",
    nameEn: "Rune Dust",
    iconPath: "/images/items/currencies/icon_10029.webp",
    rarity: "epic",
  },
  relicScroll: {
    gameId: 236,
    nameVi: "Cuộn Bí Bảo",
    nameEn: "Relic Scroll",
    iconPath: "/images/items/consumables/icon_30397.webp",
    rarity: "epic",
  },
  legendaryUniversalRelicShard: {
    gameId: 220203,
    nameVi: "Mảnh Vạn Năng Bí Bảo Cam",
    nameEn: "Legendary Universal Relic Shard",
    iconPath: "/images/items/shards/icon_30400.webp",
    rarity: "legendary",
  },
  magicStone: {
    gameId: 237,
    nameVi: "Đá Vân Ma Thuật",
    nameEn: "Magic Stone",
    iconPath: "/images/items/materials/icon_30394.webp",
    rarity: "rare",
  },
  arcaneCrystal: {
    gameId: 238,
    nameVi: "Pha Lê Bí Thuật",
    nameEn: "Arcane Crystal",
    iconPath: "/images/items/consumables/icon_30395.webp",
    rarity: "mythic",
  },
  petFood: {
    gameId: 284,
    nameVi: "Đồ Ăn Thú Cưng",
    nameEn: "Pet Food",
    iconPath: "/images/items/consumables/icon_30468.webp",
    rarity: "rare",
  },
  petEssence: {
    gameId: 289,
    nameVi: "Tinh Chất Thú Cưng",
    nameEn: "Pet Essence",
    iconPath: "/images/items/consumables/icon_30651.webp",
    rarity: "legendary",
  },
  timber: {
    gameId: 4,
    nameVi: "Gỗ",
    nameEn: "Timber",
    iconPath: "/images/items/resources/icon_20007.webp",
    rarity: "common",
  },
  stone: {
    gameId: 5,
    nameVi: "Đá",
    nameEn: "Stone",
    iconPath: "/images/items/resources/icon_20004.webp",
    rarity: "common",
  },
  ruby: {
    gameId: 6,
    nameVi: "Ruby",
    nameEn: "Ruby",
    iconPath: "/images/items/currencies/icon_10004.webp",
    rarity: "epic",
  },
  dragonEssence: {
    gameId: 153,
    nameVi: "Tinh Chất Rồng",
    nameEn: "Dragon Essence",
    iconPath: "/images/items/materials/icon_30417.webp",
    rarity: "mythic",
  },
  excellentVillagerWorkGuide: {
    gameId: 296,
    nameVi: "Đào Tạo Dân Làng Xuất Chúng",
    nameEn: "Excellent Villager Work Guide",
    iconPath: "/images/items/consumables/Icon_Villager_Experience.webp",
    rarity: "legendary",
  },
  recruitmentToken: {
    gameId: 201,
    nameVi: "Lệnh Chiêu Mộ",
    nameEn: "Recruitment Token",
    iconPath: "/images/items/consumables/icon_30003.webp",
    rarity: "legendary",
  },
  guildHonor: {
    gameId: 505,
    nameVi: "Vinh Quang Hội",
    nameEn: "Guild Honor",
    iconPath: "/images/items/currencies/icon_10025.webp",
    rarity: "legendary",
  },
  diamond: {
    gameId: 2,
    nameVi: "Kim Cương",
    nameEn: "Diamond",
    iconPath: "/images/items/currencies/icon_10002.webp",
    rarity: "epic",
  },
} satisfies Record<string, CalculatorMaterialRef>;

export const HOT_CALCULATOR_TAGS: Array<{
  query: Record<CalculatorLocale, string>;
  label: Record<CalculatorLocale, string>;
}> = [
  {
    query: { vi: "Mảnh Vạn Năng", en: "Universal Hero Shard" },
    label: { vi: "#1000MảnhCam", en: "#1000HeroShards" },
  },
  {
    query: { vi: "Sách Skill", en: "Skill Book" },
    label: { vi: "#SáchSkill24700", en: "#24700SkillBooks" },
  },
  {
    query: { vi: "Sợi Tơ Ma Thuật", en: "Magic Thread" },
    label: { vi: "#SợiTơMaThuật", en: "#MagicThread" },
  },
  {
    query: { vi: "Bụi Cổ Ngữ", en: "Rune Dust" },
    label: { vi: "#CổNgữLv12", en: "#Lv12Runes" },
  },
  {
    query: { vi: "Tinh Chất Rồng", en: "Dragon Essence" },
    label: { vi: "#LínhT11", en: "#T11Troops" },
  },
];

export const CALCULATOR_ZONES: CalculatorZone[] = [
  {
    id: "zone-1",
    label: {
      vi: "PHÂN KHU 1: ANH HÙNG & QUÂN ĐOÀN",
      en: "ZONE 1: HEROES & LEGION",
    },
    categories: [
      {
        order: 1,
        phaseNumber: 1,
        slug: "heroes",
        zoneId: "zone-1",
        iconName: "Star",
        title: {
          vi: "1. Anh Hùng",
          en: "1. Heroes",
        },
        description: {
          vi: "Tính Mảnh Vạn Năng nâng sao từng cánh (0★ ➔ 5★ Trắng), Đá Linh Hồn thức tỉnh, Mảnh nâng 4 ô Thiên Phú (Lv.0–30), Thịt nâng cấp độ và Mảnh Linh Thể Vạn Năng.",
          en: "Calculate Universal Shards per star tier (0★ to 5★ Silver), Awakening Soul Stones, Shards for 4 Hero Trait slots (Lv.0–30), Meat for hero levels, and Universal Heroic Spirit Shards.",
        },
        tools: [
          {
            code: "1.1",
            slug: "hero-stars",
            categorySlug: "heroes",
            phaseNumber: 1,
            title: {
              vi: "1.1 Nâng Sao Tướng",
              en: "1.1 Hero Star Up",
            },
            fullTitle: {
              vi: "1.1 Máy Tính Nâng Sao Anh Hùng (0★ ➔ 5★ Trắng)",
              en: "1.1 Hero Star Upgrade Calculator (0★ to 5★ Silver)",
            },
            summary: {
              vi: "Tính chính xác số Mảnh Vạn Năng Anh Hùng Cam / Đỏ (1,000 mảnh), Tím (470 mảnh) và Lam (290 mảnh) cần thiết giữa hai bậc sao và cánh sao bất kỳ (VD: từ 1.2★ Vàng lên 1★ Bạc).",
              en: "Calculate the exact Legendary/Mythic (1,000), Epic (470), and Rare (290) Universal Hero Shards needed between any two star tiers and petals (e.g., from 1.2★ Gold to 1★ Silver).",
            },
            dataSourceTab: {
              vi: "Tab Heroes — Bảng Cánh Sao & Mảnh Vạn Năng",
              en: "Heroes Tab — Star Tier & Petal Matrix",
            },
            materials: [
              CALCULATOR_MATERIALS.legendaryUniversalHeroShard,
              CALCULATOR_MATERIALS.epicUniversalHeroShard,
              CALCULATOR_MATERIALS.rareUniversalHeroShard,
            ],
            exampleCase: {
              vi: {
                question:
                  "Tướng Đỏ Hoàng Tử Sa Mạc đang ở 1.2★ Vàng (1 sao vàng + 1 cánh của sao thứ 2) muốn lên 1★ Bạc (Sao thứ 11) thì cần bao nhiêu Mảnh Vạn Năng?",
                inputPreview:
                  "Phẩm chất: Đỏ (Mythic) • Đang ở: 1★ Vàng + 1 Cánh (12 mảnh) ➔ Mục tiêu: 1★ Bạc (560 mảnh)",
                outputPreview:
                  "Cần thêm 548 Mảnh Vạn Năng Anh Hùng Cam (Hoặc 546 mảnh nếu đã nâng 2 cánh của sao Vàng thứ 2)",
              },
              en: {
                question:
                  "Desert Prince (Mythic) is currently at 1.2★ Gold (1 Gold Star + 1st petal of 2nd star) and wants to reach 1★ Silver (11th Star) — how many Universal Shards are needed?",
                inputPreview:
                  "Rarity: Mythic • Current: 1★ Gold + 1 Petal (12 shards) ➔ Target: 1★ Silver (560 shards)",
                outputPreview:
                  "Requires 548 additional Legendary Universal Hero Shards (Or 546 shards if at 1★ Gold + 2 Petals)",
              },
            },
            status: "ready",
          },
          {
            code: "1.2",
            slug: "hero-awakening",
            categorySlug: "heroes",
            phaseNumber: 1,
            title: {
              vi: "1.2 Thức Tỉnh Tướng",
              en: "1.2 Hero Awakening",
            },
            fullTitle: {
              vi: "1.2 Máy Tính Thức Tỉnh Anh Hùng Cam Lên Đỏ (Bậc 0 ➔ Bậc 4)",
              en: "1.2 Legendary-to-Mythic Hero Awakening Calculator (Tier 0 to Tier 4)",
            },
            summary: {
              vi: "Tính tổng số Đá Linh Hồn Liên Minh / Bộ Tộc / Thiên Nhiên (9 viên) và Mảnh Anh Hùng tiêu hao qua 4 bậc Thức Tỉnh cùng từng bậc nhỏ bên trong.",
              en: "Calculate total League / Horde / Nature Soul Stones (9 stones) and Hero Shards required across all 4 Awakening Tiers and sub-nodes.",
            },
            dataSourceTab: {
              vi: "Tab Heroes — Ma Trận Thức Tỉnh Bậc 0–4",
              en: "Heroes Tab — Awakening Cost Matrix (Tier 0–4)",
            },
            materials: [
              CALCULATOR_MATERIALS.leagueSoulStone,
              CALCULATOR_MATERIALS.hordeSoulStone,
              CALCULATOR_MATERIALS.natureSoulStone,
              CALCULATOR_MATERIALS.legendaryUniversalHeroShard,
            ],
            exampleCase: {
              vi: {
                question:
                  "Thức tỉnh một Anh Hùng Cam (như Pháp Sư Lửa) từ Bậc 1 (Đã mở khóa) lên Bậc 4 (Hóa Đỏ hoàn toàn) cần bao nhiêu Đá Linh Hồn và Mảnh?",
                inputPreview:
                  "Phe: Liên Minh • Đang ở: Bậc 1 • Lv.5 (1 Đá + 55 Mảnh) ➔ Mục tiêu: Bậc 4 (Hóa Thần Thoại Đỏ)",
                outputPreview:
                  "Cần thêm 8 Đá Linh Hồn Liên Minh + 290 Mảnh Vạn Năng Anh Hùng Cam (Hoặc 8 Đá + 340 Mảnh nếu từ Bậc 1 • Lv.0)",
              },
              en: {
                question:
                  "Awakening a Legendary Hero (such as Pyromancer) from Tier 1 (Unlocked) to Tier 4 (Full Mythic Ascension) — how many Soul Stones and Shards are required?",
                inputPreview:
                  "Faction: League • Current: Tier 1 • Lv.5 (1 Stone + 55 Shards) ➔ Target: Tier 4 (Full Mythic Ascension)",
                outputPreview:
                  "Requires 8 League Soul Stones + 290 Legendary Universal Hero Shards (Or 8 Stones + 340 Shards from Tier 1 • Lv.0)",
              },
            },
            status: "ready",
          },
          {
            code: "1.3",
            slug: "hero-traits",
            categorySlug: "heroes",
            phaseNumber: 1,
            title: {
              vi: "1.3 Thiên Phú Tướng",
              en: "1.3 Hero Traits",
            },
            fullTitle: {
              vi: "1.3 Máy Tính Thiên Phú Anh Hùng (4 Ô Lv.0 ➔ Lv.30 & Trao Đổi Thiên Phú)",
              en: "1.3 Hero Traits Calculator (4 Slots Lv.0 to Lv.30 & Trait Swap)",
            },
            summary: {
              vi: "Tính chính xác số Mảnh Anh Hùng (10 mảnh/cấp, 300 mảnh/ô, 1,200 mảnh/tướng) cho 4 ô Thiên Phú (mở khóa ở 2★ Bạc), tối ưu lộ trình Ô 3 Kinh Tế 24/7 và cảnh báo bẫy 2,000 Kim Cương mở Ô 4.",
              en: "Calculate exact Hero Shards (10 shards/level, 300 shards/slot, 1,200 shards/hero) across all 4 Trait Slots (unlocked at 2★ Silver), optimize Slot 3 Economy 24/7 funnels, and guard against the 2,000-Diamond Slot 4 trap.",
            },
            dataSourceTab: {
              vi: "Tab Heroes — Ma Trận 4 Ô Thiên Phú (Lv.1–30) & Thiên Phú Đặc Thù",
              en: "Heroes Tab — 4-Slot Trait Matrix (Lv.1–30) & Individual Trait 3",
            },
            materials: [
              CALCULATOR_MATERIALS.legendaryUniversalHeroShard,
              CALCULATOR_MATERIALS.epicUniversalHeroShard,
              CALCULATOR_MATERIALS.rareUniversalHeroShard,
              CALCULATOR_MATERIALS.diamond,
            ],
            exampleCase: {
              vi: {
                question:
                  "Tướng Tím Đấu Sĩ (Brawler) đã đạt 2★ Bạc, muốn nâng Thiên Phú theo phễu Kinh Tế (Ô 1 Lv.15 mở cầu ➔ Ô 3 Max Lv.30 lấy +30% Tốc độ Nghiên cứu Công nghệ) tốn bao nhiêu Mảnh và có nên mở Ô 4 không?",
                inputPreview:
                  "Tướng: Đấu Sĩ (Tím) • Lộ trình: Phễu Kinh Tế (Ô 1 Lv.15 + Ô 2 Lv.0 + Ô 3 Lv.30 + Ô 4 Khóa)",
                outputPreview:
                  "Cần 450 Mảnh Tím (150 mảnh Ô 1 + 300 mảnh Ô 3) • Tiết kiệm 2,000 Kim Cương (Không mở Ô 4 cho tướng dự bị)",
              },
              en: {
                question:
                  "Brawler (Epic) has reached 2★ Silver and wants to follow the Economy Trait Funnel (Slot 1 Lv.15 bridge to Slot 3 Max Lv.30 for +30% Tech Research Speed) — how many Shards are needed and should Slot 4 be unlocked?",
                inputPreview:
                  "Hero: Brawler (Epic) • Mode: Economy Funnel (Slot 1 Lv.15 + Slot 2 Lv.0 + Slot 3 Lv.30 + Slot 4 Locked)",
                outputPreview:
                  "Requires 450 Epic Shards (150 for Slot 1 + 300 for Slot 3) • Saves 2,000 Diamonds (Do not unlock Slot 4 on benched economy heroes)",
              },
            },
            status: "ready",
          },
          {
            code: "1.4",
            slug: "hero-level-spirit",
            categorySlug: "heroes",
            phaseNumber: 1,
            title: {
              vi: "1.4 Cấp Tướng & Linh Thể",
              en: "1.4 Hero Level & Spirit",
            },
            fullTitle: {
              vi: "1.4 Máy Tính Thịt Nâng Cấp Tướng (Lv.1–250) & Mảnh Linh Thể (Lv.1–60)",
              en: "1.4 Hero Level Meat (Lv.1–250) & Heroic Spirit Shard (Lv.1–60) Calculator",
            },
            summary: {
              vi: "Tính lượng Thịt cần để nâng cấp 1 tướng hoặc 5 tướng Đội 1 từ Lv.1 đến Lv.250 theo trần Lâu Đài Chính, kết hợp tính Mảnh Linh Thể Vạn Năng (Lv.1–60).",
              en: "Compute Meat required to level 1 or 5 Main Queue heroes from Lv.1 to Lv.250 by Castle cap, plus Universal Heroic Spirit Shards (Lv.1–60).",
            },
            dataSourceTab: {
              vi: "Tab Hero Food & Tab Heroes (Linh Thể Lv.1–60)",
              en: "Hero Food Tab & Heroes Tab (Spirit Lv.1–60)",
            },
            materials: [
              CALCULATOR_MATERIALS.meat,
              CALCULATOR_MATERIALS.universalHeroicSpiritShard,
            ],
            exampleCase: {
              vi: {
                question:
                  "Nâng cấp toàn bộ 5 tướng Đội 1 từ Lv.190 lên Lv.220 khi vừa mở khóa Lâu Đài Chính Lv.40 tốn bao nhiêu Thịt?",
                inputPreview:
                  "Số tướng: 5 (Đội 1) • Cấp hiện tại: Lv.190 ➔ Cấp mục tiêu: Lv.220",
                outputPreview:
                  "Tổng lượng Thịt tiêu hao cho 5 tướng & đối chiếu tồn kho Rương Thịt",
              },
              en: {
                question:
                  "Leveling all 5 Main Queue heroes from Lv.190 to Lv.220 after unlocking Main Castle Lv.40 — how much Meat is required?",
                inputPreview:
                  "Hero Count: 5 (Queue 1) • Current Level: Lv.190 ➔ Target Level: Lv.220",
                outputPreview:
                  "Total Meat required across 5 heroes & Meat Chest inventory comparison",
              },
            },
            status: "coming_soon",
          },
        ],
      },
      {
        order: 2,
        phaseNumber: 2,
        slug: "skills-faction",
        zoneId: "zone-1",
        iconName: "BookOpen",
        title: {
          vi: "2. Kỹ Năng & Phe",
          en: "2. Skills & Faction",
        },
        description: {
          vi: "Tính Sách Skill nâng kỹ năng anh hùng (Lv.1–15) và lượng Thịt + Mảnh Tướng nâng Cấp Phe Phái (Lv.1–80).",
          en: "Calculate Skill Books for hero skills (Lv.1–15) and Meat + Hero Shards for Faction Level progression (Lv.1–80).",
        },
        tools: [
          {
            code: "2.1",
            slug: "skill-books",
            categorySlug: "skills-faction",
            phaseNumber: 2,
            title: {
              vi: "2.1 Sách Kỹ Năng",
              en: "2.1 Skill Books",
            },
            fullTitle: {
              vi: "2.1 Máy Tính Sách Skill Anh Hùng (Lv.1 ➔ Lv.15)",
              en: "2.1 Hero Skill Book Calculator (Lv.1 to Lv.15)",
            },
            summary: {
              vi: "Tính chính xác số lượng Sách Skill cần cho 1 kỹ năng (24,700 cuốn ở Lv.15), 1 tướng (4 hoặc 5 kỹ năng) hoặc toàn bộ đội hình 6 tướng.",
              en: "Calculate exact Skill Books needed for 1 skill (24,700 books at Lv.15), 1 hero (4 or 5 skills), or a full 6-hero lineup.",
            },
            dataSourceTab: {
              vi: "Tab Heroes — Bảng Sách Skill Lv.1–15",
              en: "Heroes Tab — Skill Book Progression (Lv.1–15)",
            },
            materials: [CALCULATOR_MATERIALS.skillBook],
            exampleCase: {
              vi: {
                question:
                  "Nâng tối đa cả 5 kỹ năng của 1 Tướng Thần Thoại Đỏ từ Lv.10 lên Lv.15 cần bao nhiêu Sách Skill?",
                inputPreview:
                  "Số kỹ năng: 5 kỹ năng • Đang ở: Lv.10 ➔ Mục tiêu: Lv.15 (Mốc 24,700 cuốn/kỹ năng)",
                outputPreview:
                  "Tổng số Sách Skill cần thêm & điểm dừng tối ưu ROI ở Lv.12 trước khi lên Lv.15",
              },
              en: {
                question:
                  "Maxing all 5 skills of a Mythic Hero from Lv.10 to Lv.15 — how many Skill Books are required?",
                inputPreview:
                  "Skill Count: 5 skills • Current: Lv.10 ➔ Target: Lv.15 (24,700 books/skill cap)",
                outputPreview:
                  "Total additional Skill Books needed & optimal Lv.12 ROI breakpoint analysis",
              },
            },
            status: "coming_soon",
          },
          {
            code: "2.2",
            slug: "faction-level",
            categorySlug: "skills-faction",
            phaseNumber: 2,
            title: {
              vi: "2.2 Cấp Phe Phái",
              en: "2.2 Faction Level",
            },
            fullTitle: {
              vi: "2.2 Máy Tính Cấp Phe Phái Liên Minh / Bộ Tộc / Thiên Nhiên (Lv.1 ➔ Lv.80)",
              en: "2.2 League / Horde / Nature Faction Level Calculator (Lv.1 to Lv.80)",
            },
            summary: {
              vi: "Tính lượng Thịt và Mảnh Tướng tiêu hao theo từng vạch thanh EXP Phe Phái từ Lv.1 đến Lv.80 cùng các mốc mở khóa chỉ số cộng thêm.",
              en: "Compute Meat and Hero Shards consumed across each Faction EXP bar segment from Lv.1 to Lv.80 and stat bonus milestones.",
            },
            dataSourceTab: {
              vi: "Tab Faction lvl — Bảng Cấp Phe Phái Lv.1–80",
              en: "Faction lvl Tab — Faction Progression (Lv.1–80)",
            },
            materials: [
              CALCULATOR_MATERIALS.meat,
              CALCULATOR_MATERIALS.legendaryUniversalHeroShard,
              CALCULATOR_MATERIALS.epicUniversalHeroShard,
            ],
            exampleCase: {
              vi: {
                question:
                  "Đẩy Cấp Phe Bộ Tộc từ Lv.30 lên Lv.50 cần bao nhiêu Thịt và Mảnh Anh Hùng dự phòng?",
                inputPreview:
                  "Phe: Bộ Tộc • Đang ở: Lv.30 (Vạch 0/5) ➔ Mục tiêu: Lv.50",
                outputPreview:
                  "Tổng lượng Thịt + Mảnh Anh Hùng theo từng vạch EXP & tổng % HP/ATK cộng thêm",
              },
              en: {
                question:
                  "Pushing Horde Faction Level from Lv.30 to Lv.50 — how much Meat and spare Hero Shards are required?",
                inputPreview:
                  "Faction: Horde • Current: Lv.30 (Segment 0/5) ➔ Target: Lv.50",
                outputPreview:
                  "Total Meat + Hero Shards across EXP segments & cumulative HP/ATK bonus",
              },
            },
            status: "coming_soon",
          },
        ],
      },
      {
        order: 3,
        phaseNumber: 3,
        slug: "troops",
        zoneId: "zone-1",
        iconName: "Shield",
        title: {
          vi: "3. Quân Trang & Lính",
          en: "3. Troop Skins",
        },
        description: {
          vi: "Tính Huy Chương Vinh Dự nâng cấp Quân Trang Cam/Tím/Lam (Lv.1–50) và lộ trình Cấp Vinh Dự Quân Trang (Lv.1–150).",
          en: "Calculate Glory Medals for Legendary/Epic/Rare Troop Skins (Lv.1–50) and Skin Honor Level milestones (Lv.1–150).",
        },
        tools: [
          {
            code: "3.1",
            slug: "troop-skins",
            categorySlug: "troops",
            phaseNumber: 3,
            title: {
              vi: "3.1 Quân Trang",
              en: "3.1 Troop Skins",
            },
            fullTitle: {
              vi: "3.1 Máy Tính Nâng Cấp Quân Trang Cam / Tím / Lam (Lv.1 ➔ Lv.50)",
              en: "3.1 Legendary / Epic / Rare Troop Skin Upgrade Calculator (Lv.1 to Lv.50)",
            },
            summary: {
              vi: "Tính tổng Huy Chương Vinh Dự và số bản sao Quân Trang cần thiết ở các mốc Lv.10/20/30/40/50 (Quân Trang Tím tốn 50%, Lam tốn 25% so với Cam).",
              en: "Calculate total Glory Medals and duplicate skin copies needed at Lv.10/20/30/40/50 milestones (Epic costs 50%, Rare costs 25% of Legendary).",
            },
            dataSourceTab: {
              vi: "Tab Troop Skins — Ma Trận Quân Trang Lv.1–50",
              en: "Troop Skins Tab — Upgrade Matrix (Lv.1–50)",
            },
            materials: [CALCULATOR_MATERIALS.gloryMedal],
            exampleCase: {
              vi: {
                question:
                  "Nâng 1 bộ Quân Trang Huyền Thoại (Cam) từ Lv.1 lên Lv.30 cần bao nhiêu Huy Chương Vinh Dự và bao nhiêu phôi bản sao?",
                inputPreview:
                  "Phẩm chất: Quân Trang Cam (100% chi phí) • Đang ở: Lv.1 ➔ Mục tiêu: Lv.30",
                outputPreview:
                  "Tổng Huy Chương Vinh Dự + số thẻ Quân Trang ở các mốc đột phá Lv.10 / Lv.20 / Lv.30",
              },
              en: {
                question:
                  "Upgrading a Legendary Troop Skin from Lv.1 to Lv.30 — how many Glory Medals and duplicate copies are needed?",
                inputPreview:
                  "Rarity: Legendary Troop Skin (100% cost) • Current: Lv.1 ➔ Target: Lv.30",
                outputPreview:
                  "Total Glory Medals + duplicate skin cards at Lv.10 / Lv.20 / Lv.30 milestones",
              },
            },
            status: "coming_soon",
          },
          {
            code: "3.2",
            slug: "skin-honor",
            categorySlug: "troops",
            phaseNumber: 3,
            title: {
              vi: "3.2 Vinh Dự Quân Trang",
              en: "3.2 Skin Honor",
            },
            fullTitle: {
              vi: "3.2 Máy Tính Cấp Vinh Dự Quân Trang Toàn Đội (Lv.1 ➔ Lv.150)",
              en: "3.2 Global Troop Skin Honor Level Calculator (Lv.1 to Lv.150)",
            },
            summary: {
              vi: "Quy hoạch tổng điểm Vinh Dự Quân Trang tích lũy từ nhiều bộ Quân Trang để chạm các mốc cộng chỉ số toàn quân từ Lv.1 đến Lv.150.",
              en: "Plan cumulative Troop Skin Honor points across multiple skins to hit global troop stat milestones from Lv.1 to Lv.150.",
            },
            dataSourceTab: {
              vi: "Tab Troop Skins — Cấp Vinh Dự Lv.1–150",
              en: "Troop Skins Tab — Global Honor Level (Lv.1–150)",
            },
            materials: [CALCULATOR_MATERIALS.gloryMedal],
            exampleCase: {
              vi: {
                question:
                  "Làm sao phân bổ Huy Chương Vinh Dự giữa Quân Trang Tím/Lam và Cam để đạt mốc Cấp Vinh Dự Toàn Đội tiết kiệm nhất?",
                inputPreview:
                  "Cấp Vinh Dự hiện tại: Lv.25 ➔ Mục tiêu: Lv.50 • Kho Quân Trang: 2 Cam, 4 Tím, 3 Lam",
                outputPreview:
                  "Gợi ý thứ tự nâng Quân Trang tối ưu điểm Vinh Dự trên mỗi Huy Chương Vinh Dự",
              },
              en: {
                question:
                  "How to distribute Glory Medals across Epic/Rare and Legendary Troop Skins to reach Global Honor Lv.50 at minimum cost?",
                inputPreview:
                  "Current Honor: Lv.25 ➔ Target: Lv.50 • Skin Roster: 2 Legendary, 4 Epic, 3 Rare",
                outputPreview:
                  "Optimal upgrade sequence maximizing Honor EXP per Glory Medal spent",
              },
            },
            status: "coming_soon",
          },
        ],
      },
    ],
  },
  {
    id: "zone-2",
    label: {
      vi: "PHÂN KHU 2: TRANG BỊ, BÍ BẢO & ĐỒNG HÀNH",
      en: "ZONE 2: GEAR, RELICS & COMPANIONS",
    },
    categories: [
      {
        order: 4,
        phaseNumber: 4,
        slug: "hero-gear",
        zoneId: "zone-2",
        iconName: "Swords",
        title: {
          vi: "4. Trang Bị & Vũ Khí",
          en: "4. Hero Gear & UW",
        },
        description: {
          vi: "Tính Rune Cường Hóa Trang Bị, Vàng Thái Dương, Đá Đột Phá Trang Bị Cam/Đỏ và Mảnh Trang Bị Độc Quyền Vạn Năng + Lõi Sắt Thiên Thạch.",
          en: "Calculate Gear Enhance Runes, Solar Gold Ingots, Legendary/Mythic Promotion Stones, Universal Exclusive Gear Shards, and Meteoric Iron Cores.",
        },
        tools: [
          {
            code: "4.1",
            slug: "gear-enhance",
            categorySlug: "hero-gear",
            phaseNumber: 4,
            title: {
              vi: "4.1 Cường Hóa Trang Bị",
              en: "4.1 Gear Enhancement",
            },
            fullTitle: {
              vi: "4.1 Máy Tính Rune Cường Hóa Trang Bị Anh Hùng (+0 ➔ +40)",
              en: "4.1 Hero Gear Enhance Rune Calculator (+0 to +40)",
            },
            summary: {
              vi: "Tính lượng Rune Cường Hóa Trang Bị để đạt các mốc Cộng Hưởng Cường Hóa (+10, +20, +30, +40) cho 1 món, 1 tướng (4 món) hoặc cả đội (24 món).",
              en: "Calculate Gear Enhance Runes to hit Enhancement Master milestones (+10, +20, +30, +40) for 1 piece, 1 hero (4 pieces), or a full team (24 pieces).",
            },
            dataSourceTab: {
              vi: "Tab Gear — Bảng Cường Hóa Trang Bị +0 đến +40",
              en: "Gear Tab — Enhancement Runes (+0 to +40)",
            },
            materials: [CALCULATOR_MATERIALS.gearEnhanceRune],
            exampleCase: {
              vi: {
                question:
                  "Cường hóa đều 4 món trang bị của 1 Tướng Chủ Lực từ +20 lên +40 để kích hoạt Cộng Hưởng Cường Hóa Bậc 4 cần bao nhiêu Rune?",
                inputPreview:
                  "Quy mô: 1 Tướng (4 món) • Đang ở: +20 ➔ Mục tiêu: +40 (Mốc Cộng Hưởng +40)",
                outputPreview:
                  "Tổng lượng Rune Cường Hóa Trang Bị cần thiết & chỉ số Cộng Hưởng nhận được",
              },
              en: {
                question:
                  "Enhancing all 4 gear pieces of a Main Carry from +20 to +40 to activate Enhancement Master Tier 4 — how many Runes are needed?",
                inputPreview:
                  "Scope: 1 Hero (4 pieces) • Current: +20 ➔ Target: +40 (Enhancement Master +40)",
                outputPreview:
                  "Total Gear Enhance Runes required & unlocked Enhancement Master stat bonuses",
              },
            },
            status: "coming_soon",
          },
          {
            code: "4.2",
            slug: "gear-promotion",
            categorySlug: "hero-gear",
            phaseNumber: 4,
            title: {
              vi: "4.2 Đột Phá Đồ Đỏ",
              en: "4.2 Mythic Promotion",
            },
            fullTitle: {
              vi: "4.2 Máy Tính Đột Phá Trang Bị Cam Lên Thần Thoại 5★ Đỏ",
              en: "4.2 Legendary-to-Mythic 5★ Gear Promotion Calculator",
            },
            summary: {
              vi: "Tính Vàng Thái Dương, Đá Đột Phá Trang Bị Cam, Đá Đột Phá Trang Bị Đỏ và số phôi Trang Bị Huyền Thoại cần thiết từ bậc 0★ đến 5★ Đỏ.",
              en: "Calculate Solar Gold Ingots, Legendary Promotion Stones, Mythic Promotion Stones, and Legendary Gear fodder required from 0★ to 5★ Mythic.",
            },
            dataSourceTab: {
              vi: "Tab Gear — Ma Trận Đột Phá Trang Bị Đỏ",
              en: "Gear Tab — Mythic Promotion Matrix",
            },
            materials: [
              CALCULATOR_MATERIALS.solarGoldIngot,
              CALCULATOR_MATERIALS.legendaryPromotionStone,
              CALCULATOR_MATERIALS.mythicPromotionStone,
            ],
            exampleCase: {
              vi: {
                question:
                  "Đột phá 1 món Trang Bị Cam từ 0★ lên Thần Thoại 1★ Đỏ (Mốc Hóa Đỏ) tốn bao nhiêu Đá Đột Phá và Vàng Thái Dương?",
                inputPreview:
                  "Số món: 1 món • Đang ở: 0★ Cam ➔ Mục tiêu: 1★ Đỏ (Thần Thoại)",
                outputPreview:
                  "Tổng Vàng Thái Dương + Đá Đột Phá Trang Bị Cam + Đá Đột Phá Trang Bị Đỏ + Phôi Cam",
              },
              en: {
                question:
                  "Promoting 1 Legendary Gear piece from 0★ to Mythic 1★ Red — how many Promotion Stones and Solar Gold Ingots are needed?",
                inputPreview:
                  "Pieces: 1 piece • Current: 0★ Legendary ➔ Target: 1★ Mythic (Red)",
                outputPreview:
                  "Total Solar Gold Ingots + Legendary Promotion Stones + Mythic Promotion Stones + Fodder",
              },
            },
            status: "coming_soon",
          },
          {
            code: "4.3",
            slug: "exclusive-weapon",
            categorySlug: "hero-gear",
            phaseNumber: 4,
            title: {
              vi: "4.3 Vũ Khí Độc Quyền",
              en: "4.3 Exclusive Weapon",
            },
            fullTitle: {
              vi: "4.3 Máy Tính Vũ Khí Độc Quyền (Lv.1–20) & Đột Phá Sao (1★–5★)",
              en: "4.3 Exclusive Weapon Level (Lv.1–20) & Star Breakthrough (1★–5★) Calculator",
            },
            summary: {
              vi: "Tính Mảnh Trang Bị Độc Quyền Vạn Năng để mở khóa và nâng cấp Vũ Khí Độc Quyền từ Lv.1 đến Lv.20 cùng Lõi Sắt Thiên Thạch cho bậc 1★–5★.",
              en: "Compute Universal Exclusive Gear Shards to unlock and upgrade Exclusive Weapons from Lv.1 to Lv.20 plus Meteoric Iron Cores for 1★–5★.",
            },
            dataSourceTab: {
              vi: "Tab Gear — Bảng Vũ Khí Độc Quyền Lv.1–20",
              en: "Gear Tab — Exclusive Weapon Table (Lv.1–20)",
            },
            materials: [
              CALCULATOR_MATERIALS.universalExclusiveGearShard,
              CALCULATOR_MATERIALS.meteoricIronCore,
            ],
            exampleCase: {
              vi: {
                question:
                  "Nâng Vũ Khí Độc Quyền từ Lv.10 lên Lv.20 cần bao nhiêu Mảnh Trang Bị Độc Quyền Vạn Năng?",
                inputPreview:
                  "Trạng thái: Đã mở khóa Lv.10 ➔ Mục tiêu: Lv.20 (Tối đa kỹ năng độc quyền)",
                outputPreview:
                  "Tổng số Mảnh Trang Bị Độc Quyền Vạn Năng & Lõi Sắt Thiên Thạch theo từng mốc",
              },
              en: {
                question:
                  "Upgrading an Exclusive Weapon from Lv.10 to Lv.20 — how many Universal Exclusive Gear Shards are required?",
                inputPreview:
                  "Current State: Lv.10 Unlocked ➔ Target: Lv.20 (Max Exclusive Skill)",
                outputPreview:
                  "Total Universal Exclusive Gear Shards & Meteoric Iron Cores per milestone",
              },
            },
            status: "coming_soon",
          },
        ],
      },
      {
        order: 5,
        phaseNumber: 5,
        slug: "lord-gear",
        zoneId: "zone-2",
        iconName: "Crown",
        title: {
          vi: "5. Đồ Chúa Tể",
          en: "5. Lord Gear",
        },
        description: {
          vi: "Tính Kim Loại Tinh Luyện, Sợi Tơ Ma Thuật, Orichalcum, Huyết Rồng cho 6 món Trang Bị Chúa Tể và tối ưu Chu trình 4 Bước.",
          en: "Calculate Refined Metal, Magic Thread, Orichalcum, and Dragon Blood across all 6 Lord Gear slots and optimize the 4-Step Resonance Cycle.",
        },
        tools: [
          {
            code: "5.1",
            slug: "lord-gear-upgrade",
            categorySlug: "lord-gear",
            phaseNumber: 5,
            title: {
              vi: "5.1 Trang Bị Chúa Tể",
              en: "5.1 Lord Gear Upgrade",
            },
            fullTitle: {
              vi: "5.1 Máy Tính Nguyên Liệu Nâng Cấp 6 Món Trang Bị Chúa Tể (G1 ➔ Đỏ T1 3★)",
              en: "5.1 6-Slot Lord Gear Material Calculator (Green 1 to Mythic T1 3★)",
            },
            summary: {
              vi: "Tính chính xác Kim Loại Tinh Luyện, Sợi Tơ Ma Thuật, Orichalcum và Huyết Rồng cần thiết cho từng món hoặc cả 6 món Trang Bị Chúa Tể.",
              en: "Calculate exact Refined Metal, Magic Thread, Orichalcum, and Dragon Blood needed for any individual piece or all 6 Lord Gear pieces.",
            },
            dataSourceTab: {
              vi: "Tab Lord Gear (Sheet 23) — Bảng Nguyên Liệu 6 Món",
              en: "Lord Gear Tab (Sheet 23) — 6-Slot Upgrade Table",
            },
            materials: [
              CALCULATOR_MATERIALS.refinedMetal,
              CALCULATOR_MATERIALS.magicThread,
              CALCULATOR_MATERIALS.orichalcum,
              CALCULATOR_MATERIALS.dragonBlood,
            ],
            exampleCase: {
              vi: {
                question:
                  "Nâng 2 món Trang Bị Chúa Tể phe Bộ Tộc từ Tím 2 (P2) lên Vàng 2 (Y2) để mở khóa Thánh Điển tốn bao nhiêu Sợi Tơ Ma Thuật và Orichalcum?",
                inputPreview:
                  "Số món: 2 món Bộ Tộc • Đang ở: P2 (Tím 2) ➔ Mục tiêu: Y2 (Vàng 2)",
                outputPreview:
                  "Tổng Kim Loại Tinh Luyện + Sợi Tơ Ma Thuật + Orichalcum + Huyết Rồng",
              },
              en: {
                question:
                  "Upgrading 2 Horde Lord Gear pieces from Purple 2 (P2) to Yellow 2 (Y2) to unlock Sacred Tome — how much Magic Thread and Orichalcum are needed?",
                inputPreview:
                  "Slots: 2 Horde pieces • Current: P2 (Purple 2) ➔ Target: Y2 (Yellow 2)",
                outputPreview:
                  "Exact Refined Metal + Magic Thread + Orichalcum + Dragon Blood totals",
              },
            },
            status: "coming_soon",
          },
          {
            code: "5.2",
            slug: "lord-gear-resonance",
            categorySlug: "lord-gear",
            phaseNumber: 5,
            title: {
              vi: "5.2 Lộ Trình Lệch Pha",
              en: "5.2 Resonance Planner",
            },
            fullTitle: {
              vi: "5.2 Quy Hoạch Chu Trình Lệch Pha 4 Bước & Điều Kiện Mở Thánh Điển (Y2)",
              en: "5.2 4-Step Staggered Resonance Planner & Sacred Tome (Y2) Unlock Checker",
            },
            summary: {
              vi: "Gợi ý thứ tự nâng cấp lệch pha giữa 3 phe để luôn kích hoạt Cộng Hưởng 3 món / 6 món và kiểm tra lộ trình chạm mốc Y2 mở khóa hệ thống Thánh Điển.",
              en: "Recommend the optimal 4-step staggered upgrade order across 3 factions to maintain 3pc/6pc Resonance bonuses and reach the Y2 Sacred Tome unlock.",
            },
            dataSourceTab: {
              vi: "Tab Lord Gear (Sheet 23) — Cộng Hưởng & Mốc Y2",
              en: "Lord Gear Tab (Sheet 23) — Resonance & Y2 Thresholds",
            },
            materials: [
              CALCULATOR_MATERIALS.magicThread,
              CALCULATOR_MATERIALS.orichalcum,
              CALCULATOR_MATERIALS.dragonBlood,
            ],
            exampleCase: {
              vi: {
                question:
                  "Với 6 món Trang Bị Chúa Tể hiện tại, bước nâng cấp tiếp theo nào giữ được Cộng Hưởng 6 món mà không làm hụt Sợi Tơ Ma Thuật?",
                inputPreview:
                  "Phe chính: Bộ Tộc • Cấu hình 6 ô hiện tại ➔ Kiểm tra Chu trình Lệch Pha 4 Bước",
                outputPreview:
                  "Thứ tự nâng từng ô chuẩn xác để kích hoạt Cộng Hưởng 3 món / 6 món & tiến độ mở Y2",
              },
              en: {
                question:
                  "Given your current 6 Lord Gear slots, which next upgrade step preserves 6-piece Resonance without bottlenecking Magic Thread?",
                inputPreview:
                  "Main Faction: Horde • Current 6-Slot Loadout ➔ 4-Step Staggered Cycle Audit",
                outputPreview:
                  "Exact slot-by-slot upgrade order preserving 3pc/6pc Resonance & Y2 unlock progress",
              },
            },
            status: "coming_soon",
          },
        ],
      },
      {
        order: 6,
        phaseNumber: 6,
        slug: "runes-relics",
        zoneId: "zone-2",
        iconName: "Gem",
        title: {
          vi: "6. Cổ Ngữ & Bí Bảo",
          en: "6. Runes & Relics",
        },
        description: {
          vi: "Tính Bụi Cổ Ngữ, quy đổi ghép Đá Cổ Ngữ (Lv.1–12), cùng Cuộn Bí Bảo, Đá Vân Ma Thuật và Pha Lê Bí Thuật.",
          en: "Calculate Rune Dust, Rune synthesis ratios (Lv.1–12), Relic Scrolls, Magic Stones, and Arcane Crystals.",
        },
        tools: [
          {
            code: "6.1",
            slug: "runes",
            categorySlug: "runes-relics",
            phaseNumber: 6,
            title: {
              vi: "6.1 Đá Cổ Ngữ",
              en: "6.1 Runes & Dust",
            },
            fullTitle: {
              vi: "6.1 Máy Tính Ghép Đá Cổ Ngữ & Bụi Cổ Ngữ (Lv.1 ➔ Lv.12)",
              en: "6.1 Rune Synthesis & Rune Dust Calculator (Lv.1 to Lv.12)",
            },
            summary: {
              vi: "Tính lượng Bụi Cổ Ngữ và số Rương Cổ Ngữ cần ghép theo quy luật lũy thừa 3 (3^(n-1)), kèm kiểm tra mốc đồng bộ Toàn Cổ Ngữ Lv.5 và Lv.8.",
              en: "Compute Rune Dust and Rune Chests required via the power-of-3 synthesis rule (3^(n-1)), including Full Lv.5 and Lv.8 Rune Set milestones.",
            },
            dataSourceTab: {
              vi: "Tab Runes — Bảng Bụi Cổ Ngữ & Chỉ Số Lv.1–12",
              en: "Runes Tab — Rune Dust & Stat Matrix (Lv.1–12)",
            },
            materials: [CALCULATOR_MATERIALS.runeDust],
            exampleCase: {
              vi: {
                question:
                  "Ghép 1 viên Đá Cổ Ngữ từ Lv.5 lên Lv.8 theo quy luật 3 viên bậc dưới = 1 viên bậc trên cần bao nhiêu Bụi Cổ Ngữ?",
                inputPreview:
                  "Bậc hiện tại: 1 viên Lv.5 ➔ Mục tiêu: 1 viên Lv.8 (Quy luật lũy thừa 3^(n-1))",
                outputPreview:
                  "Số viên Lv.1/Lv.5 tương đương & tổng lượng Bụi Cổ Ngữ cần thiết",
              },
              en: {
                question:
                  "Synthesizing 1 Rune from Lv.5 to Lv.8 under the 3-to-1 power rule — how much Rune Dust is required?",
                inputPreview:
                  "Current Tier: 1x Lv.5 Rune ➔ Target: 1x Lv.8 Rune (3^(n-1) synthesis rule)",
                outputPreview:
                  "Equivalent Lv.1/Lv.5 Rune count & total Rune Dust cost",
              },
            },
            status: "coming_soon",
          },
          {
            code: "6.2",
            slug: "relics",
            categorySlug: "runes-relics",
            phaseNumber: 6,
            title: {
              vi: "6.2 Bí Bảo",
              en: "6.2 Relics",
            },
            fullTitle: {
              vi: "6.2 Máy Tính Nâng Cấp, Đột Phá Sao & Thức Tỉnh Bí Bảo",
              en: "6.2 Relic Upgrade, Star Promotion & Awakening Calculator",
            },
            summary: {
              vi: "Tính Cuộn Bí Bảo, Mảnh Vạn Năng Bí Bảo Cam / Tím / Lam, Đá Vân Ma Thuật và Pha Lê Bí Thuật cho bộ 3 Bí Bảo chủ lực.",
              en: "Calculate Relic Scrolls, Universal Relic Shards, Magic Stones, and Arcane Crystals required for your 3-slot Relic loadout.",
            },
            dataSourceTab: {
              vi: "Tab Relic — Bảng Nâng Cấp & Đột Phá Bí Bảo",
              en: "Relic Tab — Relic Level & Star Upgrade Table",
            },
            materials: [
              CALCULATOR_MATERIALS.relicScroll,
              CALCULATOR_MATERIALS.legendaryUniversalRelicShard,
              CALCULATOR_MATERIALS.magicStone,
              CALCULATOR_MATERIALS.arcaneCrystal,
            ],
            exampleCase: {
              vi: {
                question:
                  "Nâng cấp và đột phá sao cho bộ 3 Bí Bảo Huyền Thoại đội chính cần bao nhiêu Cuộn Bí Bảo, Đá Vân Ma Thuật và Pha Lê Bí Thuật?",
                inputPreview:
                  "Bí Bảo Cam • Cấp & Sao hiện tại ➔ Cấp & Sao mục tiêu",
                outputPreview:
                  "Tổng Cuộn Bí Bảo + Mảnh Vạn Năng Bí Bảo Cam + Đá Vân Ma Thuật + Pha Lê Bí Thuật",
              },
              en: {
                question:
                  "Upgrading and star-promoting your 3-slot Legendary Relic set — how many Relic Scrolls, Magic Stones, and Arcane Crystals are required?",
                inputPreview:
                  "Legendary Relic • Current Level & Stars ➔ Target Level & Stars",
                outputPreview:
                  "Total Relic Scrolls + Legendary Universal Relic Shards + Magic Stones + Arcane Crystals",
              },
            },
            status: "coming_soon",
          },
        ],
      },
      {
        order: 7,
        phaseNumber: 7,
        slug: "pets-behemoths",
        zoneId: "zone-2",
        iconName: "PawPrint",
        title: {
          vi: "7. Thú Cưng & Cự Thú",
          en: "7. Pets & Behemoths",
        },
        description: {
          vi: "Tính Đồ Ăn Thú Cưng, Tinh Chất Thú Cưng (Lv.1–120, hệ số chuyển đổi 36% ➔ 104%+) và tài nguyên nâng cấp Cự Thú.",
          en: "Calculate Pet Food, Pet Essence (Lv.1–120, 36% to 104%+ stat inheritance), and Behemoth Guardian upgrade resources.",
        },
        tools: [
          {
            code: "7.1",
            slug: "companion-pets",
            categorySlug: "pets-behemoths",
            phaseNumber: 7,
            title: {
              vi: "7.1 Thú Cưng",
              en: "7.1 Companion Pets",
            },
            fullTitle: {
              vi: "7.1 Máy Tính Đồ Ăn Thú Cưng, Tinh Chất Thú Cưng & Hệ Số Chuyển Đổi (Lv.1–120)",
              en: "7.1 Pet Food, Pet Essence & Stat Inheritance Calculator (Lv.1–120)",
            },
            summary: {
              vi: "Tính lượng Đồ Ăn Thú Cưng, Tinh Chất Thú Cưng và số phôi Thú Cưng Lam/Hiệu Lực từ Lv.1 đến Lv.120 kèm tỷ lệ chuyển đổi chỉ số (36% ➔ 104%+).",
              en: "Compute Pet Food, Pet Essence, and fodder copies from Lv.1 to Lv.120 alongside the stat inheritance multiplier (36% to 104%+).",
            },
            dataSourceTab: {
              vi: "Tab Pets — Bảng Thú Cưng Lv.1–120 & Tiến Bậc",
              en: "Pets Tab — Level 1–120 & Promotion Matrix",
            },
            materials: [
              CALCULATOR_MATERIALS.petFood,
              CALCULATOR_MATERIALS.petEssence,
            ],
            exampleCase: {
              vi: {
                question:
                  "Nuôi Thú Cưng Đội 1 từ Lv.60 lên Lv.100 cần bao nhiêu Đồ Ăn Thú Cưng, Tinh Chất Thú Cưng và hệ số chuyển đổi chỉ số tăng lên bao nhiêu %?",
                inputPreview:
                  "Thú Cưng Chủ Lực • Đang ở: Lv.60 ➔ Mục tiêu: Lv.100",
                outputPreview:
                  "Tổng Đồ Ăn Thú Cưng + Tinh Chất Thú Cưng + Phôi Lam & % Hệ số chuyển đổi mới",
              },
              en: {
                question:
                  "Raising your Queue 1 Companion Pet from Lv.60 to Lv.100 — how much Pet Food and Pet Essence are needed, and what is the new stat inheritance %?",
                inputPreview:
                  "Main Queue Pet • Current: Lv.60 ➔ Target: Lv.100",
                outputPreview:
                  "Total Pet Food + Pet Essence + Rare Fodder copies & new Stat Inheritance %",
              },
            },
            status: "coming_soon",
          },
          {
            code: "7.2",
            slug: "behemoths",
            categorySlug: "pets-behemoths",
            phaseNumber: 7,
            title: {
              vi: "7.2 Cự Thú & Tinh Linh",
              en: "7.2 Behemoths",
            },
            fullTitle: {
              vi: "7.2 Máy Tính Nâng Cấp Cự Thú Hộ Vệ & Mốc Cộng Cấp Anh Hùng (+1 ➔ +9)",
              en: "7.2 Behemoth Guardian Upgrade & Hero Level Cap Bonus (+1 to +9) Calculator",
            },
            summary: {
              vi: "Tính tài nguyên nâng cấp cấp độ và đột phá sao cho 6 Cự Thú Hộ Vệ cùng các mốc mở khóa giới hạn cấp độ Anh Hùng (+1 ➔ +9).",
              en: "Calculate level and star breakthrough costs across all 6 Behemoth Guardians and track Hero Level Cap bonus milestones (+1 to +9).",
            },
            dataSourceTab: {
              vi: "Tab Behemoth — Ma Trận Cự Thú Hộ Vệ",
              en: "Behemoth Tab — Guardian Upgrade Matrix",
            },
            materials: [
              CALCULATOR_MATERIALS.petEssence,
              CALCULATOR_MATERIALS.dragonEssence,
            ],
            exampleCase: {
              vi: {
                question:
                  "Nâng cấp Cự Thú Hộ Vệ đến mốc mở khóa thêm +5 Giới Hạn Cấp Độ Anh Hùng cần bao nhiêu nguyên liệu?",
                inputPreview:
                  "Cự Thú Hộ Vệ • Cấp & Sao hiện tại ➔ Mốc cộng trần cấp độ Anh Hùng (+1 ➔ +9)",
                outputPreview:
                  "Tổng nguyên liệu nâng cấp & đột phá sao Cự Thú theo từng mốc",
              },
              en: {
                question:
                  "Upgrading Behemoth Guardians to unlock the +5 Hero Level Cap milestone — how many resources are required?",
                inputPreview:
                  "Behemoth Guardian • Current Level & Stars ➔ Hero Level Cap Milestone (+1 to +9)",
                outputPreview:
                  "Total Behemoth upgrade & star breakthrough materials per milestone",
              },
            },
            status: "coming_soon",
          },
        ],
      },
    ],
  },
  {
    id: "zone-3",
    label: {
      vi: "PHÂN KHU 3: LÃNH ĐỊA, KHOA KỸ & SỰ KIỆN",
      en: "ZONE 3: TERRITORY, TECH & EVENTS",
    },
    categories: [
      {
        order: 8,
        phaseNumber: 8,
        slug: "castle-tech",
        zoneId: "zone-3",
        iconName: "Castle",
        title: {
          vi: "8. Lâu Đài & Khoa Kỹ",
          en: "8. Castle & Tech",
        },
        description: {
          vi: "Tính Gỗ, Đá, Ruby, Tinh Chất Rồng nâng Lâu Đài Chính (Lv.10–40 & B1–B6), Viện Huy Hoàng mở Lính T11 và Dân Làng.",
          en: "Calculate Timber, Stone, Ruby, and Dragon Essence for Main Castle (Lv.10–40 & B1–B6), Brilliance Institute T11 Troops, and Villagers.",
        },
        tools: [
          {
            code: "8.1",
            slug: "main-castle",
            categorySlug: "castle-tech",
            phaseNumber: 8,
            title: {
              vi: "8.1 Lâu Đài Chính",
              en: "8.1 Main Castle",
            },
            fullTitle: {
              vi: "8.1 Máy Tính Tài Nguyên & Điều Kiện Nâng Lâu Đài Chính (Lv.10–40 & Huy Hoàng 1–6)",
              en: "8.1 Main Castle Resource & Prerequisite Calculator (Lv.10–40 & Brilliance 1–6)",
            },
            summary: {
              vi: "Tính Gỗ, Đá, Ruby, Tinh Chất Rồng, thời gian xây dựng và dây chuyền công trình điều kiện cho từng cấp Lâu Đài Chính đến Huy Hoàng 6 (B6).",
              en: "Calculate Timber, Stone, Ruby, Dragon Essence, build duration, and prerequisite buildings for every Main Castle level up to Brilliance 6 (B6).",
            },
            dataSourceTab: {
              vi: "Tab Castle — Bảng Lâu Đài Chính Lv.10–40 & B1–B6",
              en: "Castle Tab — Main Castle Lv.10–40 & Brilliance 1–6",
            },
            materials: [
              CALCULATOR_MATERIALS.timber,
              CALCULATOR_MATERIALS.stone,
              CALCULATOR_MATERIALS.ruby,
              CALCULATOR_MATERIALS.dragonEssence,
            ],
            exampleCase: {
              vi: {
                question:
                  "Từ Lâu Đài Chính Lv.35 lên Lv.40 (Mở trần Lính T10+) và tiếp lên Huy Hoàng 3 (B3) cần bao nhiêu Gỗ, Đá, Ruby, Tinh Chất Rồng và nhà điều kiện nào?",
                inputPreview:
                  "Cấp hiện tại: Lv.35 ➔ Mục tiêu: Huy Hoàng 3 (B3) • Tốc độ xây dựng: +120%",
                outputPreview:
                  "Tổng Gỗ / Đá / Ruby / Tinh Chất Rồng, danh sách công trình điều kiện & số ngày Tăng Tốc",
              },
              en: {
                question:
                  "Upgrading Main Castle from Lv.35 to Lv.40 and onward to Brilliance 3 (B3) — how much Timber, Stone, Ruby, Dragon Essence, and which prerequisite buildings are required?",
                inputPreview:
                  "Current: Lv.35 ➔ Target: Brilliance 3 (B3) • Construction Speed: +120%",
                outputPreview:
                  "Total Timber / Stone / Ruby / Dragon Essence, prerequisite building chain & Speedup days",
              },
            },
            status: "coming_soon",
          },
          {
            code: "8.2",
            slug: "tech-brilliance",
            categorySlug: "castle-tech",
            phaseNumber: 8,
            title: {
              vi: "8.2 Viện Huy Hoàng & Khoa Kỹ",
              en: "8.2 Brilliance & Tech",
            },
            fullTitle: {
              vi: "8.2 Máy Tính Tinh Chất Rồng Viện Huy Hoàng & Lộ Trình Mở Lính T11",
              en: "8.2 Brilliance Institute Dragon Essence & T11 Troop Unlock Calculator",
            },
            summary: {
              vi: "Tính chính xác lượng Tinh Chất Rồng cần cho Cây Viện Huy Hoàng (5,422 viên) và Cây Quân Đoàn T11 (4,677 viên) để mở khóa binh chủng Bậc 11.",
              en: "Calculate exact Dragon Essence required for the Brilliance Institute tree (5,422) and T11 Legion tree (4,677) to unlock Tier 11 troops.",
            },
            dataSourceTab: {
              vi: "Tab DE-Dust — Cây Viện Huy Hoàng & Khoa Kỹ T11",
              en: "DE-Dust Tab — Brilliance & T11 Tech Trees",
            },
            materials: [CALCULATOR_MATERIALS.dragonEssence],
            exampleCase: {
              vi: {
                question:
                  "Cần tích trữ còn thiếu bao nhiêu Tinh Chất Rồng trong Cây Viện Huy Hoàng (5,422 viên) và Cây Quân Đoàn (4,677 viên) để mở khóa Lính Bậc 11 (T11)?",
                inputPreview:
                  "Mục tiêu: Mở khóa Lính T11 • Nhánh Viện Huy Hoàng & Nhánh Quân Đoàn hiện tại",
                outputPreview:
                  "Số Tinh Chất Rồng đã dùng, số còn thiếu đến mốc T11 & số tuần dự kiến hoàn tất",
              },
              en: {
                question:
                  "How much Dragon Essence is still needed across the Brilliance Institute tree (5,422) and T11 Legion tree (4,677) to unlock Tier 11 Troops?",
                inputPreview:
                  "Target: T11 Troop Unlock • Current Brilliance Institute & Legion Tech nodes",
                outputPreview:
                  "Dragon Essence spent vs. remaining to T11 unlock & estimated completion weeks",
              },
            },
            status: "coming_soon",
          },
          {
            code: "8.3",
            slug: "villagers",
            categorySlug: "castle-tech",
            phaseNumber: 8,
            title: {
              vi: "8.3 Dân Làng",
              en: "8.3 Villagers",
            },
            fullTitle: {
              vi: "8.3 Máy Tính Đào Tạo Dân Làng Xuất Chúng (Lv.1 ➔ Lv.6)",
              en: "8.3 Excellent Villager Work Guide & Buff Calculator (Lv.1 to Lv.6)",
            },
            summary: {
              vi: "Tính số sách Đào Tạo Dân Làng Xuất Chúng cần thiết để nâng cấp Dân Làng từ Lv.1 lên Lv.6 cùng tổng % giảm thời gian xây dựng / nghiên cứu.",
              en: "Compute Excellent Villager Work Guides needed to upgrade Villagers from Lv.1 to Lv.6 and total construction/research speed buffs.",
            },
            dataSourceTab: {
              vi: "Tab Villagers — Bảng Dân Làng Lv.1–6",
              en: "Villagers Tab — Villager Upgrade Table (Lv.1–6)",
            },
            materials: [CALCULATOR_MATERIALS.excellentVillagerWorkGuide],
            exampleCase: {
              vi: {
                question:
                  "Nâng cấp nhóm Dân Làng phụ trách Xây Dựng & Nghiên Cứu từ Lv.3 lên Lv.6 cần bao nhiêu cuốn Đào Tạo Dân Làng Xuất Chúng?",
                inputPreview:
                  "Nhóm Dân Làng: Xây Dựng & Khoa Kỹ • Đang ở: Lv.3 ➔ Mục tiêu: Lv.6",
                outputPreview:
                  "Tổng số sách Đào Tạo Dân Làng Xuất Chúng & tổng % buff tốc độ cộng thêm",
              },
              en: {
                question:
                  "Upgrading Construction & Research Villagers from Lv.3 to Lv.6 — how many Excellent Villager Work Guides are required?",
                inputPreview:
                  "Villager Group: Construction & Tech • Current: Lv.3 ➔ Target: Lv.6",
                outputPreview:
                  "Total Excellent Villager Work Guides required & cumulative speed buff %",
              },
            },
            status: "coming_soon",
          },
        ],
      },
      {
        order: 9,
        phaseNumber: 9,
        slug: "events-vip",
        zoneId: "zone-3",
        iconName: "Trophy",
        title: {
          vi: "9. Sự Kiện & VIP",
          en: "9. Events & VIP",
        },
        description: {
          vi: "Tính điểm xả kho 6 ngày GAR & KvK, tối ưu ngân sách Tiệm Vinh Quang Hội và lộ trình Điểm VIP (VIP 1–20).",
          en: "Calculate 6-day GAR & KvK hoarding points, optimize Guild Honor shop budgets, and track VIP Point thresholds (VIP 1–20).",
        },
        tools: [
          {
            code: "9.1",
            slug: "event-points",
            categorySlug: "events-vip",
            phaseNumber: 9,
            title: {
              vi: "9.1 Tính Điểm GAR & KvK",
              en: "9.1 GAR & KvK Points",
            },
            fullTitle: {
              vi: "9.1 Máy Tính Điểm Xả Kho 6 Ngày Chạy Đua Vũ Trang (GAR) & Vương Quốc Chiến (KvK)",
              en: "9.1 6-Day Guild Arms Race (GAR) & Kingdom vs Kingdom (KvK) Point Calculator",
            },
            summary: {
              vi: "Nhập số lượng vật phẩm tích trữ trong túi đồ để tính tổng điểm đạt được theo từng ngày chủ đề (Xây Dựng, Khoa Kỹ, Chiêu Mộ, Anh Hùng, Trang Bị, Quân Lính).",
              en: "Enter hoarded inventory items to calculate total event points across each themed day (Construction, Tech, Recruitment, Heroes, Gear, Troops).",
            },
            dataSourceTab: {
              vi: "Tab KvK & GAR & TOP — Ma Trận Điểm Sự Kiện",
              en: "KvK & GAR & TOP Tab — Event Scoring Matrix",
            },
            materials: [
              CALCULATOR_MATERIALS.recruitmentToken,
              CALCULATOR_MATERIALS.legendaryUniversalHeroShard,
              CALCULATOR_MATERIALS.dragonEssence,
              CALCULATOR_MATERIALS.skillBook,
            ],
            exampleCase: {
              vi: {
                question:
                  "Với 300 Mảnh Vạn Năng Anh Hùng Cam, 15,000 Sách Skill và 120 Lệnh Chiêu Mộ trong túi đồ, bạn đạt bao nhiêu điểm Ngày Anh Hùng của GAR / KvK?",
                inputPreview:
                  "Ngày 4 (Anh Hùng): 300 Mảnh Cam + 15,000 Sách Skill + 120 Lệnh Chiêu Mộ (Có buff Nghiên cứu Điểm Sự Kiện)",
                outputPreview:
                  "Tổng điểm GAR / KvK đạt được, trạng thái mở 9 Rương Mốc & lượng vật phẩm nên giữ lại",
              },
              en: {
                question:
                  "With 300 Legendary Universal Hero Shards, 15,000 Skill Books, and 120 Recruitment Tokens in your bag, how many points will you score on GAR / KvK Hero Day?",
                inputPreview:
                  "Day 4 (Hero Development): 300 Legendary Shards + 15,000 Skill Books + 120 Recruitment Tokens",
                outputPreview:
                  "Total GAR / KvK points scored, 9 Milestone Chest unlock status & surplus reserve advice",
              },
            },
            status: "coming_soon",
          },
          {
            code: "9.2",
            slug: "vip-and-shops",
            categorySlug: "events-vip",
            phaseNumber: 9,
            title: {
              vi: "9.2 Đặc Quyền VIP & Tiệm",
              en: "9.2 VIP & Shop Planner",
            },
            fullTitle: {
              vi: "9.2 Máy Tính Cấp Đặc Quyền VIP (VIP 1–20) & Quy Hoạch Tiệm Vinh Quang Hội",
              en: "9.2 VIP Privilege Level (VIP 1–20) & Guild Honor Shop Budget Calculator",
            },
            summary: {
              vi: "Tra cứu mốc Điểm VIP / chi phí tích lũy từ VIP 1 đến VIP 20 và tính toán ngân sách Vinh Quang Hội giữ sàn dự phòng an toàn 360,000 xu.",
              en: "Look up VIP Point thresholds from VIP 1 to VIP 20 and plan weekly Guild Honor shop purchases while maintaining the 360,000 safety floor.",
            },
            dataSourceTab: {
              vi: "Tab VIP cost USD & Tab Shops",
              en: "VIP cost USD Tab & Shops Tab",
            },
            materials: [
              CALCULATOR_MATERIALS.guildHonor,
              CALCULATOR_MATERIALS.diamond,
            ],
            exampleCase: {
              vi: {
                question:
                  "Từ VIP 8 lên VIP 10 cần thêm bao nhiêu Điểm VIP, và cần giữ đáy ví bao nhiêu Vinh Quang Hội để không lỡ Đá Linh Hồn hàng tuần?",
                inputPreview:
                  "Cấp VIP hiện tại: VIP 8 ➔ Mục tiêu: VIP 10 • Ngân sách Vinh Quang Hội hàng tuần",
                outputPreview:
                  "Số Điểm VIP còn thiếu, quyền lợi mở khóa mới & bảng phân bổ Vinh Quang Hội an toàn",
              },
              en: {
                question:
                  "Moving from VIP 8 to VIP 10 — how many additional VIP Points are required, and what Guild Honor floor must be frozen for weekly Soul Stones?",
                inputPreview:
                  "Current VIP: VIP 8 ➔ Target: VIP 10 • Weekly Guild Honor Wallet Budget",
                outputPreview:
                  "Remaining VIP Points needed, unlocked privileges & safe Guild Honor allocation plan",
              },
            },
            status: "coming_soon",
          },
        ],
      },
    ],
  },
];

export function getAllCalculatorCategories(): CalculatorCategory[] {
  return CALCULATOR_ZONES.flatMap((zone) => zone.categories);
}

export function getAllCalculatorTools(): CalculatorToolItem[] {
  return getAllCalculatorCategories().flatMap((category) => category.tools);
}

export function getCategoryUniqueMaterials(
  category: CalculatorCategory
): CalculatorMaterialRef[] {
  const seen = new Set<number>();
  const unique: CalculatorMaterialRef[] = [];
  for (const tool of category.tools) {
    for (const mat of tool.materials) {
      if (!seen.has(mat.gameId)) {
        seen.add(mat.gameId);
        unique.push(mat);
      }
    }
  }
  return unique;
}

export function getCalculatorCategoryBySlug(
  categorySlug: string
): CalculatorCategory | undefined {
  return getAllCalculatorCategories().find(
    (category) => category.slug === categorySlug
  );
}

export function getCalculatorToolBySlug(
  categorySlug: string,
  toolSlug: string
): {
  zone: CalculatorZone;
  category: CalculatorCategory;
  tool: CalculatorToolItem;
} | null {
  for (const zone of CALCULATOR_ZONES) {
    for (const category of zone.categories) {
      if (category.slug !== categorySlug) continue;
      const tool = category.tools.find((item) => item.slug === toolSlug);
      if (tool) {
        return { zone, category, tool };
      }
    }
  }
  return null;
}

export function getAdjacentCalculatorTools(
  categorySlug: string,
  toolSlug: string
): {
  prev: CalculatorToolItem | null;
  next: CalculatorToolItem | null;
} {
  const allTools = getAllCalculatorTools();
  const currentIndex = allTools.findIndex(
    (item) => item.categorySlug === categorySlug && item.slug === toolSlug
  );
  if (currentIndex === -1) {
    return { prev: null, next: null };
  }
  return {
    prev: currentIndex > 0 ? (allTools[currentIndex - 1] ?? null) : null,
    next:
      currentIndex < allTools.length - 1
        ? (allTools[currentIndex + 1] ?? null)
        : null,
  };
}

function normalizeForSearch(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim();
}

export function searchCalculators(
  query: string,
  locale: CalculatorLocale
): Array<{
  category: CalculatorCategory;
  tool: CalculatorToolItem;
}> {
  const normalizedQuery = normalizeForSearch(query);
  if (!normalizedQuery) return [];

  const results: Array<{
    category: CalculatorCategory;
    tool: CalculatorToolItem;
  }> = [];

  for (const category of getAllCalculatorCategories()) {
    for (const tool of category.tools) {
      const materialNames = tool.materials
        .map((mat) => (locale === "vi" ? mat.nameVi : mat.nameEn))
        .join(" ");
      const searchableText = normalizeForSearch(
        `${tool.code} ${tool.title[locale]} ${tool.fullTitle[locale]} ${tool.summary[locale]} ${category.title[locale]} ${materialNames}`
      );
      if (searchableText.includes(normalizedQuery)) {
        results.push({ category, tool });
      }
    }
  }

  return results;
}

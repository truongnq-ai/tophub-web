import type { GuideArticle } from "../../types";

export const ARTICLE_2_1_ENCYCLOPEDIA: GuideArticle = {
  code: "2.1",
  slug: "encyclopedia",
  categorySlug: "heroes",
  badge: "HOT",
  readingMinutes: 12,
  title: {
    vi: "Bách Khoa Toàn Thư Tướng & Bảng Xếp Hạng Tier List (S0 – S4)",
    en: "Complete Hero Encyclopedia & Meta Tier List (S0 – S4)",
  },
  summary: {
    vi: "Danh mục toàn diện hơn 45 vị tướng thuộc 3 Phe phái (Liên Minh, Bộ Lạc, Thiên Nhiên), phân tích vai trò, bảng xếp hạng Tier List theo giai đoạn và mốc Sao tối thiểu khả dụng.",
    en: "Comprehensive directory of 45+ heroes across all 3 Factions (League, Horde, Nature), featuring role breakdowns, stage-specific Tier Lists, and Minimum Viable Stars.",
  },
  tldr: {
    coreRule: {
      vi: "**Phẩm chất gốc và thời điểm ra mắt quyết định trần sức mạnh thực chiến của từng tướng.**\n• **Tướng Thần Thoại (`Mythic` — Màu Đỏ):** Sở hữu chỉ số cơ bản và hệ số kỹ năng gấp `2.5 – 5 lần` tướng Huyền Thoại (`Legendary` — Màu Vàng) thông thường.",
      en: "**Base rarity and release era dictate a hero's combat power ceiling.**\n• **Mythic (`Red` Tier):** Boasts `2.5x–5x` the base stats and skill multipliers of regular Legendary (`Yellow`) heroes.",
    },
    immediateAction: {
      vi: "**Dùng dàn tướng Vàng Liên Minh đầu game và khóa chặt Mảnh Vạn Năng Vàng chờ Tướng Đỏ.**\n• **Ngày `1–20`:** Dùng tướng Vàng Liên Minh (`League`) dễ kiếm từ Quán Rượu để vượt ải PvE.\n• **Ngày `21+`:** Đóng băng `100%` Mảnh Vạn Năng Vàng (`Universal Legendary Shards`) chờ đợt Tướng Đỏ (`Mythic`).",
      en: "**Use farmable League Legendaries early and lock all Universal Shards for Mythics.**\n• **Days `1–20`:** Field easily farmable `League` Legendary heroes from the Tavern to clear PvE stages.\n• **Day `21+`:** Freeze `100%` of `Universal Legendary Shards` for `Mythic` heroes starting on Day `21+`.",
    },
    strictTaboo: {
      vi: "**Cấm đốt Mảnh Vạn Năng Vàng vào tướng Quán Rượu và cấm đút Thịt dư cho tướng Lam/Tím.**\n• **Tướng Quán Rượu:** Không bao giờ dùng Mảnh Vạn Năng Vàng cho `Secret Keeper`, `Astrologer`, `Barbarian`, `Treeguard`.\n• **Tướng Lam (`Rare`) & Tím (`Epic`):** Tuyệt đối không đút Thịt (`Meat`) vượt quá cấp độ mở khóa cơ bản.",
      en: "**Never waste Universal Shards on Tavern heroes or feed excess Meat to Rare/Epic units.**\n• **Tavern Heroes:** Never spend `Universal Legendary Shards` on `Secret Keeper`, `Astrologer`, `Barbarian`, or `Treeguard`.\n• **Rare (`Blue`) & Epic (`Purple`):** Never feed `Meat` past basic unlock levels.",
    },
  },
  keyTakeaways: [
    {
      vi: "**Đường cong Mảnh Tướng Thần Thoại (`Mythic` — Phẩm Đỏ):** Chỉ số và hệ số kỹ năng gấp `2.5–5 lần` Tướng Vàng thường.\n• **Định mức nâng sao:** Cần `160` Mảnh lên `1 Sao Đỏ` ➔ `400` Mảnh lên `5 Sao Đỏ` ➔ `560` Mảnh lên `1 Sao Trắng` (`+30%` hiệu ứng kỹ năng) ➔ `1,000` Mảnh lên `5 Sao Trắng` (`15 Sao`).",
      en: "**Mythic (`Red`) Shard Scaling Curve:** Scales at `2.5x–5x` the stats and skill multipliers of regular Legendaries.\n• **Star Breakpoints:** Requires `160` Shards for `1 Red Star` ➔ `400` Shards for `5 Red Stars` ➔ `560` Shards for `1 White Star` (`+30%` skill effect) ➔ `1,000` Shards for `5 White Stars` (`15 Stars`).",
    },
    {
      vi: "**Chi phí nâng sao & Thức tỉnh Tướng Vàng (`Legendary`):** Tốn đúng `1/2` lượng mảnh so với Tướng Đỏ (`80` / `200` / `280` = `1 Sao Trắng` / `300` = `2 Sao Trắng` / `500` = `5 Sao Trắng`).\n• **Chi phí Thức tỉnh (Season 1+):** Tướng Vàng Cốt Lõi lên Đỏ tiêu tốn `9 Hồn Đá Đỏ` (`Soul Stones`) + `345–385` Mảnh Tướng.",
      en: "**Legendary (`Yellow`) Star & Awakening Math:** Requires half the shards of Mythics (`80` / `200` / `280` = `1 White Star` / `300` = `2 White Stars` / `500` = `5 White Stars`).\n• **Season 1+ Awakening Cost:** Awakenable Legendaries ascend to Mythic for `9 Red Soul Stones` + `345–385` Hero Shards.",
    },
    {
      vi: "**Động cơ Kinh tế Dự bị (`Active without deployment`):** Toàn bộ `8` Tướng Tím Sử Thi (`Epic`) mở khóa Đặc tính Kinh tế Ô 3 (Max `Lv.30` = `+30%`) ở `2 Sao Trắng` (`12 Sao` = `300` Mảnh).\n• **Mở khóa Tiệm & Cộng dồn:** Chạm `5 Sao Trắng` (`15 Sao` = `500` Mảnh) mở `Exchange Shop`, cộng hưởng cùng `10` Tướng Vàng Kinh Tế kích hoạt buff toàn tài khoản từ ghế dự bị.",
      en: "**Bench Economy Engine (`Active without deployment`):** All `8` Epic (`Purple`) heroes unlock their 3rd Economy Trait (Max `Lv.30` = `+30%`) at `2 White Stars` (`12 Stars` = `300` Shards).\n• **Shop & Passive Stacking:** Reaching `5 White Stars` (`15 Stars` = `500` Shards) unlocks the `Exchange Shop`, alongside `10` Legendary Economic Passive Heroes active from the bench.",
    },
    {
      vi: "**Chuẩn hóa `3` Bộ Trang Bị Vàng (`+30% Faction Mark Bonus`):** Mọi tướng Đội 1 (`Queue 1`) đều hướng tới 1 trong 3 bộ đồ Vàng có Dấu Hệ.\n• **Phân bổ theo vai trò:** `Huyết Titan / Nộ Huyết` (Tank/Bruiser) ➔ `Kỵ Sĩ Vinh Quang` (Hyper-Carry Burst/Skill DPS) ➔ `Hiền Triết Quang Vinh` (Support/Healer/Hybrid).",
      en: "**Standardized `3` Golden Gear Sets (`+30% Faction Mark Bonus`):** Every hero in `Queue 1` targets 1 of the 3 Standardized Golden Gear Sets with a Faction Mark.\n• **Role Mapping:** `Blood of the Titan / Fury of Blood` (Tank/Bruiser) ➔ `Knight's Glory` (Hyper-Carry Burst/Skill DPS) ➔ `Glory of the Sage` (Support/Healer/Hybrid).",
    },
  ],
  keywords: [
    "bách khoa toàn thư tướng",
    "hero encyclopedia",
    "tier list",
    "bảng xếp hạng tướng",
    "mythic",
    "legendary",
    "epic",
    "rare",
    "560 mảnh",
    "1000 mảnh",
    "300 mảnh",
    "9 hồn đá đỏ",
    "soul stones",
    "minimum viable stars",
    "mvs",
    "storm maiden",
    "desert prince",
    "witch",
    "wukong",
    "beastmaster",
    "shadow priest",
    "rose princess",
    "paragon",
    "bishop",
    "artificer",
    "tidecaller",
    "monk",
    "ne zha",
    "petalis",
    "brawler",
    "stonemason",
    "huyết titan",
    "kỵ sĩ vinh quang",
    "hiền triết quang vinh",
  ],
  sourceFiles: [
    "docs/06-game-guides/02-heroes-and-lineups/danh-sach-tuong-top-heroes-studio.md",
    "docs/06-game-guides/02-heroes-and-lineups/best-teams-meta-2026-mobigg.md",
    "docs/06-game-guides/01-core-strategic-topics/topic-1-heroes-1queue-rule-epic-traits.md",
    "docs/06-game-guides/03-data-tables-and-mechanics/topheroes-tables-analysis-summary.md",
  ],
  freeSections: [
    {
      id: "sec-1-rarity-and-roles",
      title: {
        vi: "1. Giải thích Cơ chế Phẩm chất & Phân loại Vai trò (Rarity & Role Mechanics)",
        en: "1. Rarity Mechanics & Tactical Role Classification",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "**Hệ thống nhân vật xoay quanh `4` bậc phẩm chất (`Rarity Tiers`) và `5` vai trò chiến thuật (`Tactical Roles`).** Nắm vững ranh giới giữa các bậc phẩm chất giúp phân bổ đúng tài nguyên ngay từ Tuần 1.",
            en: "**The character roster is built around `4` Rarity Tiers and `5` Tactical Roles.** Mastering the exact boundaries and shard costs across rarity tiers ensures accurate resource allocation from Week 1.",
          },
        },
      ],
      subSections: [
        {
          id: "sub-1-1-four-rarity-tiers",
          title: {
            vi: "1.1. Bốn Bậc Phẩm Chất Tướng (4 Hero Rarity Tiers)",
            en: "1.1. The Four Hero Rarity Tiers",
          },
          badge: {
            vi: "4 BẬC PHẨM CHẤT",
            en: "4 RARITY TIERS",
          },
          blocks: [
            {
              type: "list",
              ordered: true,
              items: [
                {
                  vi: "**Thần Thoại (`Mythic` — Đỏ):** Có `5` kỹ năng, chỉ số gấp `2.5–5 lần` Vàng thường; điểm đến duy nhất của Mảnh Vạn Năng Vàng (`160` ➔ `1★ Đỏ`, `400` ➔ `5★ Đỏ`, `560` ➔ `1★ Trắng`, `1,000` ➔ `5★ Trắng / 15★`).",
                  en: "**Mythic (`Red` Tier):** Features `5` skills and `2.5x–5x` Legendary stats; sole valid target for Universal Shards (`160` ➔ `1★ Red`, `400` ➔ `5★ Red`, `560` ➔ `1★ White`, `1,000` ➔ `5★ White / 15★`).",
                },
                {
                  vi: "**Huyền Thoại (`Legendary` — Vàng):** Tốn `1/2` mảnh (`80`/`200`/`280`/`300`/`500` Mảnh); gồm nhóm Thức tỉnh lên Đỏ ở S1+ (`9 Hồn Đá Đỏ` + `345–385` Mảnh) và `10` Tướng Kinh Tế (`Trait 3 Lv.30` dự bị).",
                  en: "**Legendary (`SSR` — Yellow):** Costs `1/2` shards (`80`/`200`/`280`/`300`/`500` Shards); split into S1+ Awakenable cores (`9 Red Soul Stones` + `345–385` Shards) and `10` Economic Heroes (`Trait 3 Lv.30` on bench).",
                },
                {
                  vi: "**Sử Thi (`Epic` — Tím, `8` Tướng):** Dùng tạm `3–5` ngày đầu; mở Đặc tính Kinh tế Ô 3 (`Lv.30` = `+30%` dự bị) ở `2 Sao Trắng` (`12★` = `300` Mảnh) và mở `Exchange Shop` ở `5 Sao Trắng` (`15★` = `500` Mảnh).",
                  en: "**Epic (`SR` — Purple, `8` Heroes):** 3–5 day fillers; unlocks 3rd Economy Trait (`Lv.30` = `+30%` on bench) at `2 White Stars` (`12★` = `300` Shards) and opens `Exchange Shop` at `5 White Stars` (`15★` = `500` Shards).",
                },
                {
                  vi: "**Hiếm (`Rare` — Xanh Lam):** Nhân vật dẫn đường trong `24 giờ` đầu tiên (`24h starter`); không có giá trị chiến đấu hay kinh tế lâu dài, ngưng nâng cấp ngay khi rút được tướng Tím/Vàng.",
                  en: "**Rare (`R` — Blue Tier):** `24h` starter tutorial characters with zero long-term combat or economic value; stop upgrading them completely the moment you pull Epic or Legendary heroes.",
                },
              ],
            },
            {
              type: "media_spotlight",
              mediaCode: "MED-2.1-02",
              tier: "tier2_annotated_ui",
              title: {
                vi: "Giao Diện Chi Tiết Tướng Mythic (Storm Maiden): Kỹ Năng Thứ 5 & Đột Phá +30% Tại 1 Sao Trắng (560 Mảnh)",
                en: "Mythic Hero Detail UI (Storm Maiden): 5th Skill & +30% Breakthrough at 1 White Star (560 Shards)",
              },
              description: {
                vi: "Ảnh chụp màn hình giao diện Chi tiết Tướng Mythic (Storm Maiden), khoanh đỏ biểu tượng Kỹ năng thứ 5 mở khóa ở 1 Sao Đỏ (160 Mảnh) và dòng chú thích mở khóa +30% hiệu ứng kỹ năng đặc thù tại mốc 1 Sao Trắng (560 Mảnh).",
                en: "Annotated screenshot of the Mythic Hero Detail UI (Storm Maiden), highlighting the 5th Skill icon unlocked at 1 Red Star (160 Shards) and the tooltip confirming the +30% signature skill effect boost at 1 White Star (560 Shards).",
              },
              annotations: [
                {
                  kind: "do",
                  label: {
                    vi: "KỸ NĂNG THỨ 5 & ĐIỂM GÃY 1 SAO TRẮNG (560 MẢNH = +30%)",
                    en: "5TH SKILL & 1 WHITE STAR BREAKPOINT (560 SHARDS = +30%)",
                  },
                  detail: {
                    vi: "Mở khóa Kỹ năng thứ 5 ở 1 Sao Đỏ (160 Mảnh) giúp Storm Maiden vượt mặt tướng Vàng 3–4 Sao Đỏ; chạm mốc 1 Sao Trắng (560 Mảnh) kích hoạt nhảy vọt +30% hiệu ứng kỹ năng cốt lõi.",
                    en: "Unlocking the 5th Skill at 1 Red Star (160 Shards) lets Storm Maiden outperform 3–4 Red Star Legendaries; hitting 1 White Star (560 Shards) triggers a massive +30% signature skill effect spike.",
                  },
                },
                {
                  kind: "dont",
                  label: {
                    vi: "KHÔNG DỪNG LƯNG CHỪNG Ở 3–4 SAO ĐỎ",
                    en: "DO NOT STOP MIDWAY AT 3–4 RED STARS",
                  },
                  detail: {
                    vi: "Chia mảnh dàn trải làm nhiều tướng Mythic kẹt ở 3–4 Sao Đỏ sẽ bỏ lỡ hoàn toàn bước nhảy +30% sức mạnh tại 1 Sao Trắng (560 Mảnh).",
                    en: "Spreading shards across multiple Mythics stuck at 3–4 Red Stars forfeits the critical +30% power spike at 1 White Star (560 Shards).",
                  },
                },
              ],
            },
          ],
        },
        {
          id: "sub-1-2-five-tactical-roles",
          title: {
            vi: "1.2. Năm Vai Trò Chiến Thuật Trong Đội Hình 6 Người (5 Tactical Roles)",
            en: "1.2. The Five Tactical Roles in a 6-Hero Lineup",
          },
          badge: {
            vi: "5 VAI TRÒ & VỊ TRÍ Ô 1–6",
            en: "5 ROLES & SLOTS 1–6",
          },
          blocks: [
            {
              type: "list",
              items: [
                {
                  vi: "**Đỡ đòn Chính (`Main Tank` — Hàng trước / `Ô 1–2`):** Chịu đòn trực diện ở Hàng trước (`Ô 1 & Ô 2`), sở hữu kỹ năng tạo Khiên (`Shield`), Khiêu khích (`Taunt`) hoặc Bất tử ngắn hạn.",
                  en: "**Main Tank (Frontline / `Slots 1–2`):** Absorbs direct focus fire in the Frontline (`Slots 1 & 2`), equipped with `Shield` generation, `Taunt`, or short-term Invulnerability.",
                },
                {
                  vi: "**Đấu sĩ / Đỡ đòn Phụ (`Bruiser / Off-Tank` — Hàng trước / `Ô 1–2`):** Đứng Hàng trước (`Ô 1 & Ô 2`), vừa chia sẻ sát thương với `Main Tank` vừa gây sát thương cận chiến hoặc khống chế diện rộng.",
                  en: "**Bruiser / Off-Tank (Frontline / `Slots 1–2`):** Stands in the Frontline (`Slots 1 & 2`), sharing incoming damage with the `Main Tank` while dealing heavy melee damage or AoE crowd control.",
                },
                {
                  vi: "**Sát thương Chủ lực (`Hyper-Carry DPS` — Hàng giữa / `Ô 3–4`):** Đứng Hàng giữa (`Ô 3 & Ô 4`), gồm `AoE DPS` dọn lính diện rộng và `Burst / Single-Target DPS` chuyên kết liễu tướng địch, săn Boss.",
                  en: "**Hyper-Carry DPS (Midline / `Slots 3–4`):** Positioned in the Midline (`Slots 3 & 4`), split into `AoE DPS` for wave-clearing soldiers and `Burst / Single-Target DPS` for executing heroes and Bosses.",
                },
                {
                  vi: "**Hồi máu (`Healer` — Hàng sau / `Ô 5–6`):** Đứng Hàng sau (`Ô 5 & Ô 6`), duy trì lượng máu liên tục cho cả tướng lẫn đội quân hộ vệ (`Soldiers`).",
                  en: "**Healer (Backline / `Slots 5–6`):** Positioned in the Backline (`Slots 5 & 6`), sustaining HP across both heroes and their escorting `Soldiers`.",
                },
                {
                  vi: "**Hỗ trợ / Khống chế / Triệu hồi (`Support / Controller / Summoner` — `Ô 5–6`):** Đứng Hàng sau (`Ô 5 & Ô 6`), tăng Tốc đánh, Chí mạng, Giảm thủ địch hoặc triệu hồi đệ làm bia đỡ đạn.",
                  en: "**Support / Controller / Summoner (Backline / `Slots 5–6`):** Positioned in the Backline (`Slots 5 & 6`), boosting Attack Speed and Crit Rate, shredding enemy DEF, or summoning units to soak fire.",
                },
              ],
            },
          ],
        },
        {
          id: "sub-1-3-bonds-and-gear-sets",
          title: {
            vi: "1.3. Hệ Thống Liên Kết Tướng (Hero Bonds) & 3 Bộ Trang Bị Vàng Chuẩn Hóa (Golden Gear Sets)",
            en: "1.3. Hero Bonds & The 3 Standardized Golden Gear Sets (+30% Faction Mark Bonus)",
          },
          badge: {
            vi: "HERO BONDS & 3 BỘ ĐỒ VÀNG",
            en: "HERO BONDS & 3 GEAR SETS",
          },
          blocks: [
            {
              type: "paragraph",
              text: {
                vi: "**Hệ Thống Liên Kết Tướng (`Hero Bonds`):** Mở khóa tướng cùng nhóm và chạm mốc Sao (`3★ Vàng`, `1★ Đỏ`, `1★ Trắng`) sẽ cộng vĩnh viễn `% ATK`, `% HP`, `% DEF` toàn tài khoản.\n• **Kỷ luật nâng sao tự nhiên:** Có hiệu lực từ băng ghế dự bị (`Active without deployment`); dùng mảnh riêng nâng sao tướng Vàng/Tím vào Thứ Năm Tuần B (`GAR`).",
                en: "**Hero Bonds (`Active without deployment` Global Buffs):** Unlocking bond groups and hitting star milestones (`3★ Yellow`, `1★ Red`, `1★ White`) permanently adds global `% ATK`, `% HP`, and `% DEF`.\n• **Natural Star-Up Discipline:** Buffs apply account-wide from the bench; naturally star-up all Tavern Legendary/Epic heroes using specific shards on Thursday of Week B (`GAR`).",
              },
            },
            {
              type: "paragraph",
              text: {
                vi: "**`3` Bộ Trang Bị Vàng Chuẩn Hóa Theo Vai Trò (`Standardized Golden Gear Sets`):**\n• Khi trang bị cho Đội hình 1 (`Queue 1`), mọi vị tướng đều hướng tới 1 trong 3 bộ Trang bị Vàng có gán đúng Dấu Hệ nhận `+30% Faction Mark Bonus`:",
                en: "**`3` Standardized Golden Gear Sets by Role:**\n• When gearing `Queue 1`, every hero targets 1 of 3 Legendary Gear Sets equipped with a matching Faction Mark for the `+30% Faction Mark Bonus`:",
              },
            },
            {
              type: "list",
              ordered: true,
              items: [
                {
                  vi: "**Huyết Titan / Nộ Huyết (`Blood of the Titan / Fury of Blood`):** Bộ trang bị trấn phái cho `Main Tank & Bruiser` — tối đa hóa `% HP`, Giảm sát thương và tạo Khiên máu đầu trận (kèm `+30% Faction Mark Bonus`).",
                  en: "**Blood of the Titan / Fury of Blood (`Tank & Bruiser Set`):** Signature gear set for `Main Tanks & Bruisers` — maximizes `% HP`, Damage Reduction, and opening HP Shields (with `+30% Faction Mark Bonus`).",
                },
                {
                  vi: "**Kỵ Sĩ Vinh Quang (`Knight's Glory`):** Bộ trang bị trấn phái cho `Hyper-Carry Burst / Skill DPS` — khuếch đại Sát thương Kỹ năng (`Skill Damage`) và Tỷ lệ Chí mạng (kèm `+30% Faction Mark Bonus`).",
                  en: "**Knight's Glory (`Burst & Skill DPS Set`):** Signature gear set for `Hyper-Carry Burst / Skill DPS` — amplifies `Skill Damage` and Critical Strike Rate (with `+30% Faction Mark Bonus`).",
                },
                {
                  vi: "**Hiền Triết Quang Vinh (`Glory of the Sage`):** Bộ trang bị trấn phái cho `Support, Healer, Controller & Hybrid DPS` — tăng Tốc đánh (`Attack Speed`), Giảm hồi chiêu và Hồi Năng lượng (`+30% Faction Mark Bonus`).",
                  en: "**Glory of the Sage (`Support & Speed Set`):** Signature gear set for `Supports, Healers, Controllers & Hybrid DPS` — boosts `Attack Speed`, Cooldown Reduction, and Energy Regen (`+30% Faction Mark Bonus`).",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "sec-2-master-hero-directory",
      title: {
        vi: "2. Danh mục Toàn diện 45+ Tướng Theo 3 Phe Phái (3-Faction Master Directory)",
        en: "2. Comprehensive 45+ Hero Directory Across 3 Factions",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "**Hồ sơ phân tích đầy đủ toàn bộ `51` vị tướng thuộc `3` Phe phái (`16` Liên Minh, `19` Bộ Lạc, `16` Thiên Nhiên).**\n• **Thông số tra cứu chuẩn:** Bao gồm phẩm chất gốc, vai trò chiến thuật, vị trí đứng chuẩn trong đội hình `6` người, bộ trang bị Vàng khuyến nghị và chỉ số nội tại kinh tế.",
            en: "**Complete master directory of all `51` heroes across the `3` Factions (`16` League, `19` Horde, `16` Nature).**\n• **Standardized Reference Metrics:** Details base rarity, tactical role, optimal `6-slot` positioning, recommended Golden Gear set, and passive economic traits.",
          },
        },
        {
          type: "widget",
          widgetType: "hero_encyclopedia",
        },
        {
          type: "media_spotlight",
          mediaCode: "MED-2.1-01",
          tier: "tier2_annotated_ui",
          title: {
            vi: "Bộ Khung Chân Dung Chuẩn Hóa 45+ Tướng Theo 3 Phe Phái & 4 Bậc Phẩm Chất",
            en: "Standardized 45+ Hero Portrait Grid Across 3 Factions & 4 Rarity Borders",
          },
          description: {
            vi: "Bộ khung ảnh chân dung chuẩn hóa 45+ tướng (/images/guides/heroes/{faction}-{hero-slug}.webp, kích thước 128x128px, viền màu theo phẩm chất Đỏ Mythic / Vàng Legendary / Tím Epic / Xanh Rare).",
            en: "Standardized 45+ hero portrait asset grid (/images/guides/heroes/{faction}-{hero-slug}.webp, 128x128px resolution, color-coded borders for Red Mythic / Yellow Legendary / Purple Epic / Blue Rare).",
          },
          annotations: [
            {
              kind: "info",
              label: {
                vi: "VIỀN ĐỎ (MYTHIC) & VIỀN VÀNG THỨC TỈNH (AWAKENABLE)",
                en: "RED BORDER (MYTHIC) & AWAKENABLE LEGENDARY",
              },
              detail: {
                vi: "Nhóm tướng duy nhất được phép đầu tư tài nguyên chiến đấu dài hạn cho Đội hình 1 (Queue 1).",
                en: "The only hero groups eligible for long-term Queue 1 combat investment.",
              },
            },
            {
              kind: "do",
              label: {
                vi: "8 TƯỚNG TÍM & 10 TƯỚNG VÀNG KINH TẾ (ACTIVE WITHOUT DEPLOYMENT)",
                en: "8 EPIC & 10 LEGENDARY ECONOMY HEROES (ACTIVE WITHOUT DEPLOYMENT)",
              },
              detail: {
                vi: "Nâng lên 2 Sao Trắng (12 Sao = 300 Mảnh) bằng mảnh riêng để mở khóa Thiên phú Kinh tế Ô 3 (Lv.30) tự động cộng hiệu suất vĩnh viễn khi ngồi dự bị.",
                en: "Upgrade to 2 White Stars (12 Stars = 300 Shards) using hero-specific shards to unlock Trait 3 Lv.30 passive account-wide economy buffs from the bench.",
              },
            },
          ],
        },
      ],
      subSections: [
        {
          id: "sub-2-1-league-heroes",
          title: {
            vi: "2.1. Phe Liên Minh (League Faction — Biểu tượng Khiên Xanh Lam)",
            en: "2.1. League Faction (Blue Shield Emblem — 16 Heroes)",
          },
          badge: {
            vi: "16 TƯỚNG LIÊN MINH",
            en: "16 LEAGUE HEROES",
          },
          blocks: [
            {
              type: "paragraph",
              text: {
                vi: "Đặc trưng bởi hệ thống **khiên chắn kiên cố**, tăng tỷ lệ **Chí mạng** và sát thương nổ diện rộng (`Burst AoE`).\n• Phe khởi đầu mượt nhất cho người chơi `F2P` và `Low-Spender` trong **Ngày 1–20**.",
                en: "Defined by **fortified shields**, magic/physical **Critical Rate** buffs, and explosive `Burst AoE` damage.\n• `League` is the smoothest starting faction for `F2P` and `Low-Spender` players during **Days 1–20**.",
              },
            },
            {
              type: "table",
              caption: {
                vi: "Danh mục toàn diện 16 tướng Phe Liên Minh (League Faction)",
                en: "Complete 16-Hero Directory for the League Faction",
              },
              headers: [
                { vi: "Tên Quốc Tế (EN)", en: "Hero Name (EN)" },
                { vi: "Tên Tiếng Việt (VI)", en: "Hero Title / Alias (EN)" },
                { vi: "Phẩm Chất Gốc", en: "Base Rarity" },
                { vi: "Vai Trò Chiến Thuật", en: "Tactical Role" },
                { vi: "Vị Trí Chuẩn", en: "Standard Slot" },
                {
                  vi: "Đánh Giá Tác Chiến, Bộ Trang Bị & Nội Tại Kinh Tế",
                  en: "Combat Assessment, Golden Gear Set & Economic Passive",
                },
              ],
              rows: [
                [
                  { vi: "Rose Princess", en: "Rose Princess" },
                  { vi: "Công Chúa Rose", en: "Rose Princess" },
                  { vi: "Mythic", en: "Mythic" },
                  { vi: "Main Tank / Buffer", en: "Main Tank / Buffer" },
                  { vi: "Hàng trước", en: "Frontline" },
                  {
                    vi: "Trụ cột bất khả xâm phạm của Liên Minh Endgame; phản sát thương và buff công thủ toàn đội. Bộ đồ: Huyết Titan.",
                    en: "Untouchable Endgame League frontline pillar; reflects damage and buffs team-wide ATK/DEF. Gear Set: Blood of the Titan.",
                  },
                ],
                [
                  { vi: "Paragon", en: "Paragon" },
                  { vi: "Thiện Xạ", en: "Paragon" },
                  { vi: "Mythic", en: "Mythic" },
                  { vi: "Hyper-Carry DPS", en: "Hyper-Carry DPS" },
                  { vi: "Hàng giữa", en: "Midline" },
                  {
                    vi: "Sát thương chuẩn và chí mạng diện rộng cực gắt; nguồn hỏa lực số 1 của Liên Minh từ Ngày 35+. Bộ đồ: Kỵ Sĩ Vinh Quang.",
                    en: "Devastating AoE true damage and critical strikes; #1 League firepower carry from Day 35+. Gear Set: Knight's Glory.",
                  },
                ],
                [
                  { vi: "Bishop", en: "Bishop" },
                  { vi: "Giám Mục", en: "Bishop" },
                  { vi: "Mythic", en: "Mythic" },
                  { vi: "Burst DPS / Support", en: "Burst DPS / Support" },
                  { vi: "Hàng giữa / sau", en: "Midline / Backline" },
                  {
                    vi: "Sát thương bộc phát Sacred Burst khắc chế cứng các đội hình triệu hồi (Nature); mạnh từ mốc 1–3 Sao Trắng. Bộ đồ: Kỵ Sĩ Vinh Quang.",
                    en: "Explosive Sacred Burst that hard-counters summon swarms (Nature); spikes hard at 1–3 White Stars. Gear Set: Knight's Glory.",
                  },
                ],
                [
                  { vi: "Artificer", en: "Artificer" },
                  { vi: "Thợ Chế Tạo", en: "Artificer" },
                  { vi: "Mythic (S3)", en: "Mythic (S3)" },
                  { vi: "Top-tier Support", en: "Top-tier Support" },
                  { vi: "Hàng sau", en: "Backline" },
                  {
                    vi: "Siêu hỗ trợ ra mắt ở Season 3; cường hóa vũ khí và khuếch đại sát thương toàn đội Liên Minh. Bộ đồ: Hiền Triết Quang Vinh.",
                    en: "Premier Season 3 hyper-support; enchants weapons and amplifies full-team League damage. Gear Set: Glory of the Sage.",
                  },
                ],
                [
                  { vi: "Adjudicator", en: "Adjudicator" },
                  { vi: "Thẩm Phán", en: "Adjudicator" },
                  { vi: "Legendary (Awaken)", en: "Legendary (Awaken)" },
                  { vi: "Main Tank", en: "Main Tank" },
                  { vi: "Hàng trước", en: "Frontline" },
                  {
                    vi: "Tanker Vàng bền bỉ nhất đầu game; khi Thức tỉnh lên Đỏ (9 Hồn Đá Đỏ + 345–385 Mảnh Tướng) tạo lá chắn bất hoại. Bộ đồ: Huyết Titan.",
                    en: "Most durable early-game Legendary tank; Awakening to Mythic (9 Soul Stones + 345–385 Shards) grants an unbreakable shield. Gear Set: Blood of the Titan.",
                  },
                ],
                [
                  { vi: "Pyromancer", en: "Pyromancer" },
                  { vi: "Pháp Sư Lửa", en: "Pyromancer" },
                  { vi: "Legendary (Awaken)", en: "Legendary (Awaken)" },
                  { vi: "AoE Magic DPS", en: "AoE Magic DPS" },
                  { vi: "Hàng giữa", en: "Midline" },
                  {
                    vi: "\"Nữ hoàng vượt ải\" giai đoạn S0; sát thương thiêu đốt diện rộng cực lớn, bắt buộc Thức tỉnh nếu chơi thuần Liên Minh. Bộ đồ: Kỵ Sĩ Vinh Quang.",
                    en: "The S0 PvE wave-clear queen; massive AoE burn damage and mandatory Awakening target for pure League mains. Gear Set: Knight's Glory.",
                  },
                ],
                [
                  { vi: "Nun", en: "Nun" },
                  { vi: "Nữ Tu", en: "Nun" },
                  { vi: "Legendary (Awaken)", en: "Legendary (Awaken)" },
                  { vi: "Pure Healer", en: "Pure Healer" },
                  { vi: "Hàng sau", en: "Backline" },
                  {
                    vi: "Nguồn hồi máu diện rộng lớn nhất phe Liên Minh; giữ sống toàn bộ hàng Tank. Bộ đồ: Hiền Triết Quang Vinh.",
                    en: "Largest AoE healer in the League faction; keeps the entire frontline alive. Gear Set: Glory of the Sage.",
                  },
                ],
                [
                  { vi: "Bard", en: "Bard" },
                  { vi: "Nhà Thơ", en: "Bard" },
                  { vi: "Legendary (Econ)", en: "Legendary (Econ)" },
                  { vi: "Speed Buffer / Kinh tế", en: "Speed Buffer / Economy" },
                  { vi: "Hàng sau / Dự bị", en: "Backline / Bench" },
                  {
                    vi: "Giảm Cooldown & tăng Crit; sở hữu Nội tại Kinh tế Trait 3 Lv.30: +40% Tốc độ Xây dựng (Construction Rate) (Active without deployment).",
                    en: "Reduces Cooldowns & boosts Crit; features Trait 3 Lv.30 Economic Passive: +40% Construction Rate (Active without deployment).",
                  },
                ],
                [
                  { vi: "Astrologer", en: "Astrologer" },
                  { vi: "Chiêm Tinh Gia", en: "Astrologer" },
                  { vi: "Legendary", en: "Legendary" },
                  { vi: "Single-Target DPS", en: "Single-Target DPS" },
                  { vi: "Hàng giữa", en: "Midline" },
                  {
                    vi: "Sát thương đơn mục tiêu tốt ở tuần 1–3 để săn Boss, nhưng hụt hơi nhanh ở PvP về sau; thay thế khi có Paragon.",
                    en: "Solid single-target Boss DPS in Weeks 1–3, but falls off sharply in PvP later; replace once Paragon is unlocked.",
                  },
                ],
                [
                  { vi: "Secret Keeper", en: "Secret Keeper" },
                  { vi: "Người Giữ Bí Mật", en: "Secret Keeper" },
                  { vi: "Legendary (Econ)", en: "Legendary (Econ)" },
                  { vi: "Early Tank / Kinh tế", en: "Early Tank / Economy" },
                  { vi: "Hàng trước / Dự bị", en: "Frontline / Bench" },
                  {
                    vi: "Có câm lặng đầu game; sở hữu Nội tại Kinh tế Trait 3 Lv.30: +50% Tốc độ Hành quân PvP (PvP March Speed) (Active without deployment).",
                    en: "Provides early-game AoE silence; features Trait 3 Lv.30 Economic Passive: +50% PvP March Speed (Active without deployment).",
                  },
                ],
                [
                  { vi: "Hostess", en: "Hostess" },
                  { vi: "Nữ Chủ Quán", en: "Hostess" },
                  { vi: "Legendary (Econ)", en: "Legendary (Econ)" },
                  { vi: "Support / Kinh tế", en: "Support / Economy" },
                  { vi: "Dự bị (Bench)", en: "Bench" },
                  {
                    vi: "Sở hữu Nội tại Kinh tế Trait 3 Lv.30: +40% Tốc độ Huấn luyện Lính (Soldier Training Speed) (Active without deployment).",
                    en: "Features Trait 3 Lv.30 Economic Passive: +40% Soldier Training Speed (Active without deployment).",
                  },
                ],
                [
                  { vi: "Knight", en: "Knight" },
                  { vi: "Kỵ Sĩ", en: "Knight" },
                  { vi: "Epic (#2)", en: "Epic (#2)" },
                  { vi: "Kinh tế (Trait 3)", en: "Economy (Trait 3)" },
                  { vi: "Dự bị (Bench)", en: "Bench" },
                  {
                    vi: "Mở khóa +30% Tốc độ Huấn luyện Lính (Soldier Training Speed) ở 2 Sao Trắng (12 Sao = 300 Mảnh); lên 15 Sao (500 Mảnh) mở Exchange Shop.",
                    en: "Unlocks +30% Soldier Training Speed at 2 White Stars (12 Stars = 300 Shards); reaching 5 White Stars / 15 Stars (500 Shards) unlocks the Exchange Shop.",
                  },
                ],
                [
                  { vi: "Ranger", en: "Ranger" },
                  { vi: "Cung Thủ / Thợ Săn", en: "Ranger" },
                  { vi: "Epic (#3)", en: "Epic (#3)" },
                  { vi: "Kinh tế (Trait 3)", en: "Economy (Trait 3)" },
                  { vi: "Dự bị (Bench)", en: "Bench" },
                  {
                    vi: "Mở khóa +30% Tốc độ Thu thập Ruby (Ruby Gathering Speed) ở 2 Sao Trắng (12 Sao = 300 Mảnh) (Lưu ý: Không phải tốc độ xây dựng!).",
                    en: "Unlocks +30% Ruby Gathering Speed at 2 White Stars (12 Stars = 300 Shards) (Note: Ruby Gathering Speed — NOT construction!).",
                  },
                ],
                [
                  { vi: "Minister", en: "Minister" },
                  { vi: "Bộ Trưởng", en: "Minister" },
                  { vi: "Epic (#6)", en: "Epic (#6)" },
                  { vi: "Kinh tế (Trait 3)", en: "Economy (Trait 3)" },
                  { vi: "Dự bị (Bench)", en: "Bench" },
                  {
                    vi: "Mở khóa +30% Tốc độ Chữa thương Bệnh viện (Hospital Healing Speed) khi đạt 2 Sao Trắng (12 Sao = 300 Mảnh).",
                    en: "Unlocks +30% Hospital Healing Speed upon reaching 2 White Stars (12 Stars = 300 Shards).",
                  },
                ],
                [
                  { vi: "Guardsman", en: "Guardsman" },
                  { vi: "Vệ Binh", en: "Guard" },
                  { vi: "Rare", en: "Rare" },
                  { vi: "Tân thủ 24h", en: "24h Starter" },
                  { vi: "Dự bị (Bench)", en: "Bench" },
                  {
                    vi: "Không đầu tư tài nguyên; chỉ giữ kích hoạt bộ sưu tập và Liên kết Tướng (Hero Bonds).",
                    en: "Zero resource investment; keep on the bench strictly for collection index and Hero Bonds.",
                  },
                ],
                [
                  { vi: "Crossbowman", en: "Crossbowman" },
                  { vi: "Nỏ Thủ", en: "Crossbowman" },
                  { vi: "Rare", en: "Rare" },
                  { vi: "Tân thủ 24h", en: "24h Starter" },
                  { vi: "Dự bị (Bench)", en: "Bench" },
                  {
                    vi: "Không đầu tư tài nguyên; chỉ giữ kích hoạt bộ sưu tập và Liên kết Tướng (Hero Bonds).",
                    en: "Zero resource investment; keep on the bench strictly for collection index and Hero Bonds.",
                  },
                ],
              ],
            },
          ],
        },
        {
          id: "sub-2-2-horde-heroes",
          title: {
            vi: "2.2. Phe Bộ Lạc (Horde Faction — Biểu tượng Đầu Lâu Đỏ)",
            en: "2.2. Horde Faction (Red Skull Emblem — 19 Heroes)",
          },
          badge: {
            vi: "19 TƯỚNG BỘ LẠC",
            en: "19 HORDE HEROES",
          },
          blocks: [
            {
              type: "paragraph",
              text: {
                vi: "Nổi tiếng với cơ chế **Hút máu (`Lifesteal`)**, **Cuồng nộ (`Berserk`)** và khả năng càn quét cả `PvP` lẫn **Boss Thế Giới**.\n• Dù yếu ở 20 ngày đầu do tướng Vàng thiếu liên kết, **Bộ Lạc** thống trị tuyệt đối từ **Ngày 21+** nhờ sở hữu `5–6` **Tướng Đỏ gốc (`Native Mythics`)**.",
                en: "Renowned for **`Lifesteal`**, **`Berserk`** attack-speed steroids, and unmatched dominance across `PvP` and **World Bosses**.\n• Though weak during the first 20 days, `Horde` rises to supremacy from **Day 21+** by fielding `5–6` **Native Mythic** heroes.",
              },
            },
            {
              type: "table",
              caption: {
                vi: "Danh mục toàn diện 19 tướng Phe Bộ Lạc (Horde Faction)",
                en: "Complete 19-Hero Directory for the Horde Faction",
              },
              headers: [
                { vi: "Tên Quốc Tế (EN)", en: "Hero Name (EN)" },
                { vi: "Tên Tiếng Việt (VI)", en: "Hero Title / Alias (EN)" },
                { vi: "Phẩm Chất Gốc", en: "Base Rarity" },
                { vi: "Vai Trò Chiến Thuật", en: "Tactical Role" },
                { vi: "Vị Trí Chuẩn", en: "Standard Slot" },
                {
                  vi: "Đánh Giá Tác Chiến, Bộ Trang Bị & Nội Tại Kinh Tế",
                  en: "Combat Assessment, Golden Gear Set & Economic Passive",
                },
              ],
              rows: [
                [
                  { vi: "Desert Prince", en: "Desert Prince" },
                  { vi: "Hoàng Tử Sa Mạc", en: "Desert Prince" },
                  { vi: "Mythic (Day 21)", en: "Mythic (Day 21)" },
                  { vi: "Bruiser / Main Tank", en: "Bruiser / Main Tank" },
                  { vi: "Hàng trước", en: "Frontline" },
                  {
                    vi: "Mở màn kỷ nguyên Bộ Lạc ở Ngày 21; vừa trâu bò vừa chém diện rộng và tự hồi phục cực mạnh. Bộ đồ: Huyết Titan.",
                    en: "Ushers in the Horde era on Day 21; combines massive frontline durability with AoE cleaves and self-healing. Gear Set: Blood of the Titan.",
                  },
                ],
                [
                  { vi: "Storm Maiden", en: "Storm Maiden" },
                  { vi: "Nữ Thần Bão Tố", en: "Storm Maiden" },
                  { vi: "Mythic (Day 27)", en: "Mythic (Day 27)" },
                  { vi: "Hyper-Carry AoE DPS", en: "Hyper-Carry AoE DPS" },
                  { vi: "Hàng giữa", en: "Midline" },
                  {
                    vi: "Ra mắt Ngày 27; gọi lốc xoáy sấm sét hủy diệt hàng giữa và hàng sau đối phương. Trụ cột số 1 của Horde S0–S1. Bộ đồ: Kỵ Sĩ Vinh Quang.",
                    en: "Releases on Day 27; summons lightning tornadoes that shred enemy midline and backline units. #1 Horde carry in S0–S1. Gear Set: Knight's Glory.",
                  },
                ],
                [
                  { vi: "Witch", en: "Witch" },
                  { vi: "Phù Thủy", en: "Witch" },
                  { vi: "Mythic (Day 41)", en: "Mythic (Day 41)" },
                  { vi: "Mythic Healer / CC", en: "Mythic Healer / CC" },
                  { vi: "Hàng sau", en: "Backline" },
                  {
                    vi: "Ra mắt Ngày 41; Healer phẩm Đỏ duy nhất giai đoạn đầu, vừa hồi máu toàn đội vừa nguyền rủa giảm thủ kẻ địch. Bộ đồ: Hiền Triết Quang Vinh.",
                    en: "Releases on Day 41; the only early-game Mythic Healer, providing full-team healing while cursing and shredding enemy DEF. Gear Set: Glory of the Sage.",
                  },
                ],
                [
                  { vi: "Wukong", en: "Wukong" },
                  { vi: "Tôn Ngộ Không", en: "Monkey King (Wukong)" },
                  { vi: "Mythic (S2)", en: "Mythic (S2)" },
                  { vi: "Hyper-Carry Assassin", en: "Hyper-Carry Assassin" },
                  { vi: "Hàng giữa", en: "Midline" },
                  {
                    vi: "Siêu phẩm Mùa 2; phân thân và đập gậy Như Ý gây sát thương vật lý gấp 5 lần tướng thường. Bộ đồ: Kỵ Sĩ Vinh Quang.",
                    en: "Season 2 apex hyper-carry; summons clones and slams his staff for 5x the physical damage of regular heroes. Gear Set: Knight's Glory.",
                  },
                ],
                [
                  { vi: "Beastmaster", en: "Beastmaster" },
                  { vi: "Thú Tướng", en: "Beastmaster" },
                  { vi: "Mythic (S2)", en: "Mythic (S2)" },
                  { vi: "Ultimate Main Tank", en: "Ultimate Main Tank" },
                  { vi: "Hàng trước", en: "Frontline" },
                  {
                    vi: "Ra mắt Mùa 2; tạo khiên máu khổng lồ và khống chế cứng tuyến đầu, hoàn thiện bức tường thép Bộ Lạc. Bộ đồ: Huyết Titan.",
                    en: "Releases in Season 2; generates colossal HP shields and hard frontline crowd control, completing Horde's iron wall. Gear Set: Blood of the Titan.",
                  },
                ],
                [
                  { vi: "Shadow Priest", en: "Shadow Priest" },
                  { vi: "Giáo Sĩ Bóng Tối", en: "Shadow Priest" },
                  { vi: "Mythic (S3)", en: "Mythic (S3)" },
                  { vi: "Dark Support / DPS", en: "Dark Support / DPS" },
                  { vi: "Hàng sau", en: "Backline" },
                  {
                    vi: "Ra mắt Mùa 3; thay thế hoàn toàn vị trí tướng Vàng cuối cùng để tạo đội hình 6 Mythic Thuần Bộ Lạc. Bộ đồ: Hiền Triết Quang Vinh.",
                    en: "Releases in Season 3; replaces the final Legendary slot to complete a 100% 6-Mythic Pure Horde lineup. Gear Set: Glory of the Sage.",
                  },
                ],
                [
                  { vi: "Soulmancer", en: "Soulmancer" },
                  { vi: "Thuật Sĩ Linh Hồn", en: "Soulmancer" },
                  { vi: "Legendary (Awaken)", en: "Legendary (Awaken)" },
                  { vi: "Link Buffer / Support", en: "Link Buffer / Support" },
                  { vi: "Hàng sau", en: "Backline" },
                  {
                    vi: "Chia sẻ sát thương và cộng hưởng linh hồn tăng công toàn đội Bộ Lạc; ứng viên Thức tỉnh lên Đỏ ở S1. Bộ đồ: Hiền Triết Quang Vinh.",
                    en: "Links allies to share incoming damage and buffs Horde team ATK; prime Season 1 Awakening candidate. Gear Set: Glory of the Sage.",
                  },
                ],
                [
                  { vi: "Warlock", en: "Warlock" },
                  { vi: "Pháp Sư Bóng Tối", en: "Warlock" },
                  {
                    vi: "Legendary (Awaken/Econ)",
                    en: "Legendary (Awaken/Econ)",
                  },
                  {
                    vi: "Bloodlust Buffer / Kinh tế",
                    en: "Bloodlust Buffer / Economy",
                  },
                  { vi: "Hàng sau", en: "Backline" },
                  {
                    vi: "Tăng mạnh Tốc đánh & Hút máu (Thức tỉnh Đỏ ở S1); kiêm Nội tại Kinh tế Trait 3 Lv.30: +360,000 Giới hạn Cướp bóc (Plunder Cap) (Active without deployment).",
                    en: "Heavily buffs Attack Speed & Lifesteal (Awakens to Mythic in S1); features Trait 3 Lv.30 Economic Passive: +360,000 Plunder Cap (Active without deployment).",
                  },
                ],
                [
                  { vi: "Wilderness Hunter", en: "Wilderness Hunter" },
                  { vi: "Thợ Săn Hoang Dã", en: "Wilderness Hunter" },
                  { vi: "Legendary", en: "Legendary" },
                  { vi: "Mid-game Physical DPS", en: "Mid-game Physical DPS" },
                  { vi: "Hàng giữa", en: "Midline" },
                  {
                    vi: "Sát thương vật lý ổn định và dễ lên sao cao trong S0–S1 trước khi Wukong xuất hiện.",
                    en: "Consistent physical DPS and easy to star-up during S0–S1 as a bridge before Wukong arrives.",
                  },
                ],
                [
                  { vi: "Swordmaster", en: "Swordmaster" },
                  { vi: "Kiếm Thánh", en: "Swordmaster" },
                  { vi: "Legendary", en: "Legendary" },
                  { vi: "Off-Tank / Bruiser", en: "Off-Tank / Bruiser" },
                  { vi: "Hàng trước", en: "Frontline" },
                  {
                    vi: "Đứng cặp tạm thời với Desert Prince ở Hàng trước trong S0–S1 trước khi có Beastmaster.",
                    en: "Pairs temporarily with Desert Prince on the Frontline during S0–S1 until Beastmaster releases.",
                  },
                ],
                [
                  { vi: "Barbarian", en: "Barbarian" },
                  { vi: "Chiến Binh Man Rợ", en: "Barbarian" },
                  { vi: "Legendary", en: "Legendary" },
                  { vi: "Early Tank", en: "Early Tank" },
                  { vi: "Hàng trước", en: "Frontline" },
                  {
                    vi: "Chống chịu tạm thời đầu game; về sau chuyển hẳn xuống Đội 2 hoặc dự bị.",
                    en: "Temporary early-game frontline tank; relegated to Queue 2 or the bench later on.",
                  },
                ],
                [
                  { vi: "Wanderer", en: "Wanderer" },
                  { vi: "Kẻ Lang Thang", en: "Wanderer" },
                  { vi: "Legendary", en: "Legendary" },
                  { vi: "Boss DPS", en: "Boss DPS" },
                  { vi: "Hàng giữa / sau", en: "Midline / Backline" },
                  {
                    vi: "Gây sát thương đơn mục tiêu lên Boss PvE khá tốt với chi phí rẻ nhưng kém hiệu quả trong PvP.",
                    en: "Deals respectable low-cost single-target damage against PvE Bosses but underperforms in PvP.",
                  },
                ],
                [
                  { vi: "Headhunter", en: "Headhunter" },
                  { vi: "Thợ Săn Đầu Người", en: "Headhunter" },
                  { vi: "Legendary (Econ)", en: "Legendary (Econ)" },
                  {
                    vi: "Early Assassin / Kinh tế",
                    en: "Early Assassin / Economy",
                  },
                  { vi: "Dự bị (Bench)", en: "Bench" },
                  {
                    vi: "Sở hữu Nội tại Kinh tế Trait 3 Lv.30: +40% Tốc độ Thu thập Ruby (Ruby Gathering Speed) (Active without deployment).",
                    en: "Features Trait 3 Lv.30 Economic Passive: +40% Ruby Gathering Speed (Active without deployment).",
                  },
                ],
                [
                  { vi: "Shaman", en: "Shaman" },
                  { vi: "Pháp Sư Bộ Lạc", en: "Shaman" },
                  { vi: "Legendary (Econ)", en: "Legendary (Econ)" },
                  {
                    vi: "Early Healer / Kinh tế",
                    en: "Early Healer / Economy",
                  },
                  { vi: "Dự bị (Bench)", en: "Bench" },
                  {
                    vi: "Hồi máu tạm trước Ngày 41; sở hữu Nội tại Kinh tế Trait 3 Lv.30: +40% Tốc độ Nghiên cứu Công nghệ (Tech Research Rate) (Active without deployment).",
                    en: "Temporary healer prior to Day 41; features Trait 3 Lv.30 Economic Passive: +40% Tech Research Rate (Active without deployment).",
                  },
                ],
                [
                  { vi: "Boar", en: "Boar" },
                  { vi: "Người Heo Rừng", en: "Boarman" },
                  { vi: "Legendary", en: "Legendary" },
                  { vi: "Early Tank", en: "Early Tank" },
                  { vi: "Hàng trước", en: "Frontline" },
                  {
                    vi: "Bị động phản đòn nhẹ nhưng thiếu độ lỳ đòn ở cấp cao; chỉ dùng làm kích hệ tạm thời.",
                    en: "Minor counter-attack passive but lacks high-level durability; used only as a temporary faction filler.",
                  },
                ],
                [
                  { vi: "Brawler", en: "Brawler" },
                  { vi: "Đấu Sĩ", en: "Brawler" },
                  { vi: "Epic (#1)", en: "Epic (#1)" },
                  { vi: "Kinh tế Vua (Trait 3)", en: "King Economy (Trait 3)" },
                  { vi: "Dự bị (Bench)", en: "Bench" },
                  {
                    vi: "Tướng Tím quan trọng số 1 game (Epic #1): Mở khóa +30% Tốc độ Nghiên cứu Công nghệ (Tech Research Rate) ở 2 Sao Trắng (12 Sao = 300 Mảnh).",
                    en: "#1 Most Important Epic Hero in the game (Epic #1): Unlocks +30% Tech Research Rate at 2 White Stars (12 Stars = 300 Shards).",
                  },
                ],
                [
                  { vi: "Rogue", en: "Rogue" },
                  { vi: "Đạo Tặc / Sát Thủ", en: "Rogue" },
                  { vi: "Epic (#4)", en: "Epic (#4)" },
                  { vi: "Kinh tế (Trait 3)", en: "Economy (Trait 3)" },
                  { vi: "Dự bị (Bench)", en: "Bench" },
                  {
                    vi: "Mở khóa +30% Tốc độ Thu thập Đá (Stone Gathering Speed) ở 2 Sao Trắng (12 Sao = 300 Mảnh).",
                    en: "Unlocks +30% Stone Gathering Speed at 2 White Stars (12 Stars = 300 Shards).",
                  },
                ],
                [
                  { vi: "Outlaw", en: "Outlaw" },
                  { vi: "Kẻ Ngoài Vòng Pháp Luật", en: "Outlaw" },
                  { vi: "Epic (#5)", en: "Epic (#5)" },
                  { vi: "Kinh tế (Trait 3)", en: "Economy (Trait 3)" },
                  { vi: "Dự bị (Bench)", en: "Bench" },
                  {
                    vi: "Mở khóa +30% Tốc độ Thu thập Gỗ (Timber Gathering Speed) ở 2 Sao Trắng (12 Sao = 300 Mảnh).",
                    en: "Unlocks +30% Timber Gathering Speed at 2 White Stars (12 Stars = 300 Shards).",
                  },
                ],
                [
                  { vi: "Grunt", en: "Grunt" },
                  { vi: "Lính Đánh Thuê", en: "Mercenary" },
                  { vi: "Rare", en: "Rare" },
                  { vi: "Tân thủ 24h", en: "24h Starter" },
                  { vi: "Dự bị (Bench)", en: "Bench" },
                  {
                    vi: "Không nâng cấp; giữ trong kho kích điểm bộ sưu tập.",
                    en: "Do not upgrade; keep on the bench strictly for collection index points.",
                  },
                ],
              ],
            },
          ],
        },
        {
          id: "sub-2-3-nature-heroes",
          title: {
            vi: "2.3. Phe Thiên Nhiên (Nature Faction — Biểu tượng Lá Cây Xanh Lục)",
            en: "2.3. Nature Faction (Green Leaf Emblem — 16 Heroes)",
          },
          badge: {
            vi: "16 TƯỚNG THIÊN NHIÊN",
            en: "16 NATURE HEROES",
          },
          blocks: [
            {
              type: "paragraph",
              text: {
                vi: "Sở hữu lối chơi **Biển Người Triệu Hồi (`Summon Swarm`)**, **Cộng hưởng Khiên & Hồi phục** và khống chế dây chuyền.\n• **Thiên Nhiên (`Nature`)** là khắc tinh số 1 của đội hình **Bộ Lạc** ở giai đoạn Cuối Game (`S1–S4`).",
                en: "Built around **`Summon Swarm`** mechanics, cascading **Shield & Heal resonance**, and chain crowd control.\n• **`Nature`** is the #1 hard-counter to `Horde` lineups during **Endgame (`S1–S4`)**.",
              },
            },
            {
              type: "table",
              caption: {
                vi: "Danh mục toàn diện 16 tướng Phe Thiên Nhiên (Nature Faction)",
                en: "Complete 16-Hero Directory for the Nature Faction",
              },
              headers: [
                { vi: "Tên Quốc Tế (EN)", en: "Hero Name (EN)" },
                { vi: "Tên Tiếng Việt (VI)", en: "Hero Title / Alias (EN)" },
                { vi: "Phẩm Chất Gốc", en: "Base Rarity" },
                { vi: "Vai Trò Chiến Thuật", en: "Tactical Role" },
                { vi: "Vị Trí Chuẩn", en: "Standard Slot" },
                {
                  vi: "Đánh Giá Tác Chiến, Bộ Trang Bị & Nội Tại Kinh Tế",
                  en: "Combat Assessment, Golden Gear Set & Economic Passive",
                },
              ],
              rows: [
                [
                  { vi: "Tidecaller", en: "Tidecaller" },
                  { vi: "Thuật Sĩ Thủy Triều", en: "Tidecaller" },
                  {
                    vi: "Mythic (Cuối S0/S1)",
                    en: "Mythic (Late S0/S1)",
                  },
                  {
                    vi: "Core Summoner / DPS / Heal",
                    en: "Core Summoner / DPS / Heal",
                  },
                  { vi: "Hàng giữa", en: "Midline" },
                  {
                    vi: "Trái tim của hệ Thiên Nhiên: Vừa triệu hồi Thủy tinh linh đỡ đạn, vừa hồi máu và gây sát thương sóng thần. Bộ đồ: Kỵ Sĩ Vinh Quang hoặc Hiền Triết Quang Vinh.",
                    en: "The beating heart of Nature: summons Water Elementals to soak fire while healing allies and unleashing tidal wave AoE damage. Gear Set: Knight's Glory or Glory of the Sage.",
                  },
                ],
                [
                  { vi: "Monk", en: "Monk" },
                  { vi: "Hòa Thượng / Tu Sĩ", en: "Monk" },
                  { vi: "Mythic (S1)", en: "Mythic (S1)" },
                  { vi: "Evasion Main Tank", en: "Evasion Main Tank" },
                  { vi: "Hàng trước", en: "Frontline" },
                  {
                    vi: "Tanker phẩm Đỏ siêu cứng với khả năng tạo Khiên vàng, miễn nhiễm khống chế và gom địch. Bộ đồ: Huyết Titan.",
                    en: "Ultra-tanky Mythic frontline with golden shields, crowd-control immunity, and enemy grouping. Gear Set: Blood of the Titan.",
                  },
                ],
                [
                  { vi: "Ne Zha", en: "Ne Zha" },
                  { vi: "Na Tra", en: "Ne Zha" },
                  { vi: "Mythic (S1)", en: "Mythic (S1)" },
                  {
                    vi: "Hyper-Carry AoE / Bruiser",
                    en: "Hyper-Carry AoE / Bruiser",
                  },
                  { vi: "Hàng trước / giữa", en: "Frontline / Midline" },
                  {
                    vi: "Tướng công-thủ toàn diện bậc nhất game; lướt Hỗn Thiên Lăng đốt cháy toàn màn hình và tự tái sinh. Bộ đồ: Kỵ Sĩ Vinh Quang / Huyết Titan.",
                    en: "One of the most complete two-way carries in the game; scorches the entire screen and self-revives. Gear Set: Knight's Glory / Blood of the Titan.",
                  },
                ],
                [
                  { vi: "Petalis", en: "Petalis" },
                  { vi: "Tiên Hoa Petalis", en: "Petalis" },
                  { vi: "Mythic (S3)", en: "Mythic (S3)" },
                  {
                    vi: "Ultimate Nature Support",
                    en: "Ultimate Nature Support",
                  },
                  { vi: "Hàng sau", en: "Backline" },
                  {
                    vi: "Mảnh ghép Mùa 3 giúp hệ Thiên Nhiên đạt độ bất tử và phản sát thương tối đa. Bộ đồ: Hiền Triết Quang Vinh.",
                    en: "Season 3 capstone support granting Nature lineups near-immortality and maximum damage reflection. Gear Set: Glory of the Sage.",
                  },
                ],
                [
                  { vi: "Pixie", en: "Pixie" },
                  { vi: "Tiên Nhỏ", en: "Pixie" },
                  { vi: "Legendary (Awaken)", en: "Legendary (Awaken)" },
                  {
                    vi: "AoE Burst / Summon DPS",
                    en: "AoE Burst / Summon DPS",
                  },
                  { vi: "Hàng giữa / sau", en: "Midline / Backline" },
                  {
                    vi: "Nguồn sát thương phép chủ lực đi cặp hoàn hảo với Tidecaller; ưu tiên số 1 để Thức tỉnh lên Đỏ của hệ Nature. Bộ đồ: Kỵ Sĩ Vinh Quang.",
                    en: "Primary magic burst DPS that pairs seamlessly with Tidecaller; #1 Awakening priority for Nature mains. Gear Set: Knight's Glory.",
                  },
                ],
                [
                  { vi: "Forest Maiden", en: "Forest Maiden" },
                  { vi: "Thiếu Nữ Rừng Xanh", en: "Forest Maiden" },
                  { vi: "Legendary", en: "Legendary" },
                  {
                    vi: "Summon Buffer / Healer",
                    en: "Summon Buffer / Healer",
                  },
                  { vi: "Hàng sau", en: "Backline" },
                  {
                    vi: "Mỗi khi có đơn vị triệu hồi ngã xuống hoặc xuất hiện, cô cộng dồn Năng lượng và Hồi máu cho toàn đội. Bộ đồ: Hiền Triết Quang Vinh.",
                    en: "Whenever a summoned unit spawns or falls, she stacks team-wide Energy and Healing. Gear Set: Glory of the Sage.",
                  },
                ],
                [
                  { vi: "Sage", en: "Sage" },
                  { vi: "Hiền Giả", en: "Sage" },
                  { vi: "Legendary (Awaken)", en: "Legendary (Awaken)" },
                  { vi: "Shield Tank / Support", en: "Shield Tank / Support" },
                  { vi: "Hàng trước", en: "Frontline" },
                  {
                    vi: "Tạo giáp cây và hồi phục bền bỉ cho tuyến đầu; có thể Thức tỉnh lên Đỏ để đứng cặp cùng Monk hoặc Ne Zha. Bộ đồ: Huyết Titan.",
                    en: "Generates bark shields and sustained frontline regen; can Awaken to Mythic to pair with Monk or Ne Zha. Gear Set: Blood of the Titan.",
                  },
                ],
                [
                  { vi: "Windwalker", en: "Windwalker" },
                  { vi: "Phong Hành Giả", en: "Windwalker" },
                  { vi: "Legendary", en: "Legendary" },
                  { vi: "Backline Assassin", en: "Backline Assassin" },
                  { vi: "Hàng giữa", en: "Midline" },
                  {
                    vi: "Nhảy thẳng vào hàng sau kẻ địch chém tốc độ cao; rất mạnh ở đầu-giữa game trước khi thay bằng Ne Zha.",
                    en: "Dives directly into the enemy backline with high-speed slashes; strong in early-to-mid game before Ne Zha replaces him.",
                  },
                ],
                [
                  { vi: "Treeguard", en: "Treeguard" },
                  { vi: "Vệ Thần Rừng", en: "Treeguard" },
                  { vi: "Legendary (Econ)", en: "Legendary (Econ)" },
                  { vi: "Early Tank / Kinh tế", en: "Early Tank / Economy" },
                  { vi: "Hàng trước / Dự bị", en: "Frontline / Bench" },
                  {
                    vi: "Chịu đòn tốt ở S0; sở hữu Nội tại Kinh tế Trait 3 Lv.30: +40% Tốc độ Thu thập Gỗ (Timber Gathering Speed) (Active without deployment).",
                    en: "Solid S0 frontline tank; features Trait 3 Lv.30 Economic Passive: +40% Timber Gathering Speed (Active without deployment).",
                  },
                ],
                [
                  { vi: "Stonemason", en: "Stonemason" },
                  { vi: "Thợ Đá", en: "Stonemason" },
                  {
                    vi: "Legendary Nature (Econ)",
                    en: "Legendary Nature (Econ)",
                  },
                  { vi: "Defense / Kinh tế", en: "Defense / Economy" },
                  { vi: "Dự bị (Bench)", en: "Bench" },
                  {
                    vi: "Tướng Huyền Thoại Hệ Thiên Nhiên (Legendary Nature): Sở hữu Nội tại Kinh tế Trait 3 Lv.30: +40% Tốc độ Thu thập Đá (Stone Gathering Speed) (Active without deployment).",
                    en: "Legendary Nature Hero: Features Trait 3 Lv.30 Economic Passive: +40% Stone Gathering Speed (Active without deployment).",
                  },
                ],
                [
                  { vi: "Druid", en: "Druid" },
                  { vi: "Đại Tư Tế Rừng", en: "Druid" },
                  { vi: "Legendary", en: "Legendary" },
                  {
                    vi: "Pure Healer / Summoner",
                    en: "Pure Healer / Summoner",
                  },
                  { vi: "Hàng sau", en: "Backline" },
                  {
                    vi: "Gọi đệ cây nhỏ và hồi máu ổn định giai đoạn đầu; rút khỏi Đội 1 khi đã có bộ đôi Tidecaller + Petalis.",
                    en: "Summons treant minions and provides steady early healing; bench from Queue 1 once Tidecaller + Petalis are acquired.",
                  },
                ],
                [
                  { vi: "Watcher", en: "Watcher" },
                  { vi: "Người Quan Sát", en: "Watcher" },
                  { vi: "Legendary (Econ)", en: "Legendary (Econ)" },
                  { vi: "Mid-range CC / Kinh tế", en: "Mid-range CC / Economy" },
                  { vi: "Dự bị (Bench)", en: "Bench" },
                  {
                    vi: "Sở hữu Nội tại Kinh tế Trait 3 Lv.30: +2,000 Quy mô Quân đoàn (Soldier Capacity) (Active without deployment).",
                    en: "Features Trait 3 Lv.30 Economic Passive: +2,000 Soldier Capacity (Active without deployment).",
                  },
                ],
                [
                  { vi: "Pathfinder", en: "Pathfinder" },
                  { vi: "Người Mở Đường", en: "Pathfinder" },
                  { vi: "Legendary (Econ)", en: "Legendary (Econ)" },
                  { vi: "Explorer / Kinh tế", en: "Explorer / Economy" },
                  { vi: "Dự bị (Bench)", en: "Bench" },
                  {
                    vi: "Sở hữu Nội tại Kinh tế Trait 3 Lv.30: +50% Tốc độ Hành quân PvE (PvE March Speed) (Active without deployment).",
                    en: "Features Trait 3 Lv.30 Economic Passive: +50% PvE March Speed (Active without deployment).",
                  },
                ],
                [
                  { vi: "Priestess", en: "Priestess" },
                  { vi: "Nữ Tư Tế", en: "Priestess" },
                  { vi: "Epic (#7)", en: "Epic (#7)" },
                  { vi: "Kinh tế (Trait 3)", en: "Economy (Trait 3)" },
                  { vi: "Dự bị (Bench)", en: "Bench" },
                  {
                    vi: "Mở khóa +30% Tốc độ Chữa thương Bệnh viện (Hospital Healing Speed) khi đạt 2 Sao Trắng (12 Sao = 300 Mảnh).",
                    en: "Unlocks +30% Hospital Healing Speed upon reaching 2 White Stars (12 Stars = 300 Shards).",
                  },
                ],
                [
                  { vi: "Dancer", en: "Dancer" },
                  { vi: "Vũ Công", en: "Dancer" },
                  { vi: "Epic (#8)", en: "Epic (#8)" },
                  { vi: "Kinh tế (Trait 3)", en: "Economy (Trait 3)" },
                  { vi: "Dự bị (Bench)", en: "Bench" },
                  {
                    vi: "Mở khóa +30% Tốc độ Chữa thương Bệnh viện (Hospital Healing Speed) khi đạt 2 Sao Trắng (12 Sao = 300 Mảnh).",
                    en: "Unlocks +30% Hospital Healing Speed upon reaching 2 White Stars (12 Stars = 300 Shards).",
                  },
                ],
                [
                  { vi: "Scout", en: "Scout" },
                  { vi: "Trinh Sát Rừng", en: "Forest Scout" },
                  { vi: "Rare", en: "Rare" },
                  { vi: "Tân thủ 24h", en: "24h Starter" },
                  { vi: "Dự bị (Bench)", en: "Bench" },
                  {
                    vi: "Không nâng cấp; giữ trong kho kích điểm bộ sưu tập.",
                    en: "Do not upgrade; keep on the bench strictly for collection index points.",
                  },
                ],
              ],
            },
          ],
        },
        {
          id: "sub-2-4-economy-heroes-summary",
          title: {
            vi: "2.4. Bảng Tổng Hợp 8 Tướng Tím Kinh Tế (+30%) & 10 Tướng Vàng Nội Tại Kinh Tế (Active Without Deployment)",
            en: "2.4. Summary Table: All 8 Epic Economy Heroes (+30%) & 10 Legendary Economic Passive Heroes (Active Without Deployment)",
          },
          badge: {
            vi: "18 TƯỚNG KINH TẾ DỰ BỊ",
            en: "18 PASSIVE ECONOMY HEROES",
          },
          blocks: [
            {
              type: "table",
              caption: {
                vi: "Bảng tổng hợp 8 Tướng Tím Sử Thi (+30%) và 10 Tướng Vàng Kinh Tế tự động kích hoạt không cần ra trận (Active without deployment)",
                en: "Master summary of all 8 Epic Economy Heroes (+30%) and 10 Legendary Economic Passive Heroes (Active without deployment at Trait 3 Lv.30)",
              },
              headers: [
                { vi: "Nhóm Phẩm Chất", en: "Rarity Group" },
                {
                  vi: "Danh Sách Đầy Đủ & Chỉ Số Nội Tại Kinh Tế Ở Mốc Max (Trait 3 Lv.30 — Tự Động Kích Hoạt Không Cần Ra Trận)",
                  en: "Full Roster & Max Economic Passive Stats (Trait 3 Lv.30 — Active Without Deployment)",
                },
              ],
              rows: [
                [
                  {
                    vi: "8 Tướng Tím Sử Thi (Epic Heroes — Mở ở 2 Sao Trắng / 300 Mảnh, Max Lv.30 = +30%; 5 Sao Trắng / 500 Mảnh mở Exchange Shop)",
                    en: "8 Epic Economy Heroes (Unlocked at 2 White Stars / 300 Shards, Max Lv.30 = +30%; 5 White Stars / 500 Shards unlocks Exchange Shop)",
                  },
                  {
                    vi: "1. Brawler (Đấu Sĩ): +30% Tech Research Rate (Tốc độ Nghiên cứu)\n2. Knight (Kỵ Sĩ): +30% Soldier Training Speed (Tốc độ Huấn luyện Lính)\n3. Ranger (Cung Thủ): +30% Ruby Gathering Speed (Tốc độ Đào Ruby — Không phải xây dựng!)\n4. Rogue (Đạo Tặc): +30% Stone Gathering Speed (Tốc độ Đào Đá)\n5. Outlaw (Kẻ Ngoài Vòng Pháp Luật): +30% Timber Gathering Speed (Tốc độ Đốn Gỗ)\n6. Minister (Bộ Trưởng): +30% Hospital Healing Speed (Tốc độ Chữa thương)\n7. Priestess (Nữ Tư Tế): +30% Hospital Healing Speed (Tốc độ Chữa thương)\n8. Dancer (Vũ Công): +30% Hospital Healing Speed (Tốc độ Chữa thương)",
                    en: "1. Brawler: +30% Tech Research Rate\n2. Knight: +30% Soldier Training Speed\n3. Ranger: +30% Ruby Gathering Speed (NOT construction!)\n4. Rogue: +30% Stone Gathering Speed\n5. Outlaw: +30% Timber Gathering Speed\n6. Minister: +30% Hospital Healing Speed\n7. Priestess: +30% Hospital Healing Speed\n8. Dancer: +30% Hospital Healing Speed",
                  },
                ],
                [
                  {
                    vi: "10 Tướng Vàng Huyền Thoại Kinh Tế (Legendary Economic Passive Heroes — Mở ở 2 Sao Trắng / 300 Mảnh, Max Trait 3 Lv.30 Active without deployment)",
                    en: "10 Legendary Economic Passive Heroes (Unlocked at 2 White Stars / 300 Shards, Max Trait 3 Lv.30 Active without deployment)",
                  },
                  {
                    vi: "1. Bard (Nhà Thơ): +40% Construction Rate (Tốc độ Xây dựng)\n2. Shaman (Pháp Sư Bộ Lạc): +40% Tech Research Rate (Tốc độ Nghiên cứu)\n3. Hostess (Nữ Chủ Quán): +40% Soldier Training Speed (Tốc độ Huấn luyện Lính)\n4. Secret Keeper (Người Giữ Bí Mật): +50% PvP March Speed (Tốc độ Hành quân PvP)\n5. Pathfinder (Người Mở Đường): +50% PvE March Speed (Tốc độ Hành quân PvE)\n6. Headhunter (Thợ Săn Đầu Người): +40% Ruby Gathering Speed (Tốc độ Đào Ruby)\n7. Treeguard (Vệ Thần Rừng): +40% Timber Gathering Speed (Tốc độ Đốn Gỗ)\n8. Stonemason (Thợ Đá — Legendary Nature): +40% Stone Gathering Speed (Tốc độ Đào Đá)\n9. Warlock (Pháp Sư Bóng Tối): +360,000 Plunder Cap (Giới hạn Cướp bóc Tài nguyên)\n10. Watcher (Người Quan Sát): +2,000 Soldier Capacity (Giới hạn Sức chứa Binh lính)",
                    en: "1. Bard: +40% Construction Rate\n2. Shaman: +40% Tech Research Rate\n3. Hostess: +40% Soldier Training Speed\n4. Secret Keeper: +50% PvP March Speed\n5. Pathfinder: +50% PvE March Speed\n6. Headhunter: +40% Ruby Gathering Speed\n7. Treeguard: +40% Timber Gathering Speed\n8. Stonemason (Legendary Nature): +40% Stone Gathering Speed\n9. Warlock: +360,000 Plunder Cap\n10. Watcher: +2,000 Soldier Capacity",
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: "sec-3-stage-tier-list-and-pitfalls",
      title: {
        vi: "3. Bảng Xếp Hạng Tier List Theo Giai Đoạn & Cạm Bẫy Thường Gặp",
        en: "3. Stage-Specific Meta Tier List & Common Pitfalls",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "Sức mạnh của một vị tướng thay đổi rõ rệt khi máy chủ bước từ giai đoạn **Tiền Mùa Giải (`Pre-Season S0`: Ngày 1–65)** sang **Mùa Giải Chính Thức (`S1–S4`)**.\n• Bảng dưới đây phân tách rạch ròi 2 thời kỳ để người chơi không đầu tư nhầm vào các tướng \"sớm nở tối tàn\":",
            en: "A hero's combat value shifts dramatically as a server transitions from **Pre-Season (`S0`: Days 1–65)** into **Official Seasons (`S1–S4` Endgame)**.\n• The table below separates both eras so players never waste `Universal Shards` on early-game falloff units:",
          },
        },
        {
          type: "table",
          caption: {
            vi: "Bảng xếp hạng Tier List 5 hạng (Tier S+ đến Tier C) đối chiếu giai đoạn S0 (Ngày 1–65) và S1–S4 Endgame",
            en: "5-Tier Meta Ranking Table (Tier S+ through Tier C) comparing S0 (Days 1–65) vs. S1–S4 Endgame",
          },
          headers: [
            { vi: "Hạng (Tier)", en: "Tier" },
            { vi: "Định Nghĩa Giá Trị Đầu Tư", en: "Investment Value Definition" },
            {
              vi: "Giai Đoạn Đầu & Giữa Game (S0: Ngày 1–65)",
              en: "Early & Mid Game (S0: Days 1–65)",
            },
            {
              vi: "Giai Đoạn Cuối Game (S1–S4 Endgame)",
              en: "Endgame Meta (S1–S4 Endgame)",
            },
          ],
          rows: [
            [
              {
                vi: "Tier S+ ★ (God / Meta-Defining)",
                en: "Tier S+ ★ (God / Meta-Defining)",
              },
              {
                vi: "Trụ cột gánh đội; ưu tiên dồn 100% Mảnh Vạn Năng Vàng và Vũ Khí Độc Quyền.",
                en: "Lineup-defining carries; #1 priority for 100% of Universal Legendary Shards and Exclusive Weapons.",
              },
              {
                vi: "Storm Maiden, Desert Prince, Paragon, Rose Princess, Pyromancer, Adjudicator, Tidecaller",
                en: "Storm Maiden, Desert Prince, Paragon, Rose Princess, Pyromancer, Adjudicator, Tidecaller",
              },
              {
                vi: "Wukong, Ne Zha, Tidecaller, Storm Maiden, Desert Prince, Beastmaster, Rose Princess, Paragon, Artificer, Petalis, Shadow Priest, Monk",
                en: "Wukong, Ne Zha, Tidecaller, Storm Maiden, Desert Prince, Beastmaster, Rose Princess, Paragon, Artificer, Petalis, Shadow Priest, Monk",
              },
            ],
            [
              {
                vi: "Tier S (Core Staple)",
                en: "Tier S (Core Staple)",
              },
              {
                vi: "Mảnh ghép bắt buộc để hoàn thiện chuỗi cộng hưởng 6 tướng thuần hệ.",
                en: "Mandatory core staples required to complete 6-hero pure-faction synergy.",
              },
              {
                vi: "Witch, Bishop, Nun, Bard, Pixie, Forest Maiden, Sage",
                en: "Witch, Bishop, Nun, Bard, Pixie, Forest Maiden, Sage",
              },
              {
                vi: "Witch, Bishop, Pyromancer (Awakened), Adjudicator (Awakened), Pixie (Awakened), Soulmancer (Awakened), Warlock (Awakened), Forest Maiden, Nun (Awakened)",
                en: "Witch, Bishop, Pyromancer (Awakened), Adjudicator (Awakened), Pixie (Awakened), Soulmancer (Awakened), Warlock (Awakened), Forest Maiden, Nun (Awakened)",
              },
            ],
            [
              {
                vi: "Tier A (Viable / Transition)",
                en: "Tier A (Viable / Transition)",
              },
              {
                vi: "Dùng rất tốt khi chuyển giao hoặc lắp vào Đội 2 / Đội 3; chỉ nâng bằng mảnh riêng.",
                en: "Strong transitional bridges or Queue 2 / Queue 3 staples; upgrade using hero-specific shards only.",
              },
              {
                vi: "Wilderness Hunter, Swordmaster, Windwalker, Treeguard, Druid, Soulmancer, Warlock, Astrologer, Secret Keeper",
                en: "Wilderness Hunter, Swordmaster, Windwalker, Treeguard, Druid, Soulmancer, Warlock, Astrologer, Secret Keeper",
              },
              {
                vi: "Sage (Awakened), Bard, Wilderness Hunter, Swordmaster, Windwalker (Đội 2/3)",
                en: "Sage (Awakened), Bard, Wilderness Hunter, Swordmaster, Windwalker (Queues 2/3)",
              },
            ],
            [
              {
                vi: "Tier B (Situational / Economy)",
                en: "Tier B (Situational / Economy)",
              },
              {
                vi: "Tướng Tím & Tướng Vàng lấy nội tại kinh tế (Trait 3) hoặc kích hệ tạm thời tuần đầu.",
                en: "Epic & Legendary heroes leveled for Trait 3 passive economy buffs or Week 1 faction fillers.",
              },
              {
                vi: "8 Tướng Tím (Brawler, Knight, Ranger, Rogue, Outlaw, Minister, Priestess, Dancer) + Barbarian, Wanderer, Shaman, Stonemason",
                en: "8 Epic Heroes (Brawler, Knight, Ranger, Rogue, Outlaw, Minister, Priestess, Dancer) + Barbarian, Wanderer, Shaman, Stonemason",
              },
              {
                vi: "Toàn bộ 8 Tướng Tím & 10 Tướng Vàng Kinh tế đạt 2 Sao Trắng (300 Mảnh) ngồi dự bị kích hoạt Thiên Phú Kinh Tế vĩnh viễn (Active without deployment).",
                en: "All 8 Epic Heroes & 10 Legendary Economic Passive Heroes at 2 White Stars (300 Shards) sitting on the bench with permanent Active without deployment economy traits.",
              },
            ],
            [
              {
                vi: "Tier C (Outclassed in PvP)",
                en: "Tier C (Outclassed in PvP)",
              },
              {
                vi: "Không đầu tư Mảnh Vạn Năng; chỉ nâng bằng mảnh riêng Quán Rượu để lấy Trait Kinh tế & Hero Bonds.",
                en: "Zero Universal Shard investment; star-up strictly via Tavern hero-specific shards for Economy Traits & Hero Bonds.",
              },
              {
                vi: "Headhunter, Boar, Watcher, Pathfinder, Hostess, và toàn bộ Tướng Xanh Lam (Rare).",
                en: "Headhunter, Boar, Watcher, Pathfinder, Hostess, and all Rare (Blue) heroes.",
              },
              {
                vi: "Secret Keeper, Astrologer, Barbarian, Shaman, Treeguard, Druid, Stonemason (rút khỏi đội hình PvP chính, giữ dự bị lấy Trait Kinh tế).",
                en: "Secret Keeper, Astrologer, Barbarian, Shaman, Treeguard, Druid, Stonemason (retired from main PvP lineups, kept on bench for Economy Traits).",
              },
            ],
          ],
        },
        {
          type: "callout",
          variant: "danger",
          title: {
            vi: "Cạm Bẫy Phổ Biến: Đút 200–300 Mảnh Vạn Năng Vàng Cho Astrologer / Secret Keeper Ở Tuần 1",
            en: "Common Pitfall: Feeding 200–300 Universal Legendary Shards Into Astrologer / Secret Keeper in Week 1",
          },
          content: {
            vi: "**Sai lầm phổ biến:** Đút `200–300` **Mảnh Vạn Năng Vàng** cho `Astrologer` hoặc `Secret Keeper` ở tuần đầu để đua Top ngắn hạn.\n• **Hậu quả:** Đến **Ngày 35–46** khi `Paragon` và `Rose Princess` ra mắt (hoặc đổi sang **Bộ Lạc** ở Ngày 21–27), cả hai bị thay thế và chôn vùi số mảnh đã đút.\n• **Giải pháp tối ưu:** Chỉ nâng `Secret Keeper`, `Astrologer`, `Barbarian`, `Treeguard`, `Stonemason` bằng mảnh riêng tự nhiên từ **Quán Rượu (`Tavern`)**.\n• **Kỷ luật kho:** Khóa két sắt `100%` **Mảnh Vạn Năng Vàng** dành riêng cho tướng `Tier S+` / `Mythic`.",
            en: "**Common Mistake:** Dumping `200–300` **Universal Legendary Shards** into `Astrologer` or `Secret Keeper` in Week 1 for short-term power rankings.\n• **Consequence:** When `Paragon` and `Rose Princess` arrive on **Days 35–46** (or when pivoting to `Horde` on Days 21–27), both are benched, burying those shards forever.\n• **Optimal Solution:** Only upgrade `Secret Keeper`, `Astrologer`, `Barbarian`, `Treeguard`, and `Stonemason` using natural hero-specific shards from the `Tavern`.\n• **Vault Discipline:** Lock `100%` of **Universal Legendary Shards** exclusively for `Tier S+` / `Mythic` heroes.",
          },
        },
      ],
    },
  ],
  proSections: [
    {
      id: "sec-4-mvs-and-awakening-matrix",
      isPro: true,
      title: {
        vi: "4. Phân tích Định lượng: Nguồn Sở Hữu, Mốc Sao Khả Dụng (MVS), Bộ Trang Bị Chuẩn & Chi Phí Thức Tỉnh",
        en: "4. Quantitative Analysis: Acquisition Sources, Minimum Viable Stars (MVS), Golden Gear Sets & Awakening Costs",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "Trong giới nghiên cứu chiến thuật (`Theorycrafting`), mỗi vị tướng có một **Mốc Sao Tối Thiểu Khả Dụng (`Minimum Viable Stars — MVS`)**.\n• Đây là ngưỡng sao mà bộ kỹ năng kích hoạt đủ cơ chế để vượt qua một tướng Vàng nhiều sao hơn:",
            en: "In competitive Top Heroes `Theorycrafting`, every hero has a **Minimum Viable Stars (`MVS`)** threshold.\n• This is the exact star breakpoint where their skill kit unlocks enough mechanics to outperform a higher-star regular Legendary hero:",
          },
        },
        {
          type: "list",
          items: [
            {
              vi: "**Điểm gãy 1 Sao Đỏ (`6★` = `160` Mảnh Mythic / `80` Mảnh Vàng):** Mở khóa cấp cơ bản Kỹ năng 5 của tướng `Mythic`, giúp tướng Đỏ `1★ Đỏ` mạnh ngang hoặc vượt tướng Vàng `3–4★ Đỏ`.",
              en: "**1 Red Star Breakpoint (`6★` = `160` Mythic / `80` Legendary Shards):** Unlocks the base level of a `Mythic` hero's 5th Skill, letting a `1★ Red` Mythic beat a `3–4★ Red` regular Legendary.",
            },
            {
              vi: "**Điểm gãy 5 Sao Đỏ (`10★` = `400` Mảnh Mythic / `200` Mảnh Vàng):** Hoàn tất tầng Sao Đỏ với chỉ số cơ bản cao, làm bàn đạp tiến lên tầng Sao Trắng/Bạc (`White/Silver Stars`).",
              en: "**5 Red Stars Breakpoint (`10★` = `400` Mythic / `200` Legendary Shards):** Completes the Red Star tier with high base stats, acting as the launchpad into `White/Silver Stars`.",
            },
            {
              vi: "**Điểm gãy Vàng 1 Sao Trắng (`11★` = `560` Mảnh Mythic / `280` Mảnh Vàng):** Mở khóa `+30%` hiệu ứng kỹ năng cốt lõi trước khi lên `2★ Trắng` (`600`/`300`) và `5★ Trắng` (`1,000`/`500` Mảnh).",
              en: "**Golden 1 White Star Breakpoint (`11★` = `560` Mythic / `280` Legendary Shards):** Unlocks `+30%` signature skill effect before `2★ White` (`600`/`300`) and `5★ White` (`1,000`/`500` Shards).",
            },
          ],
        },
      ],
      subSections: [
        {
          id: "sub-4-1-pro-24-heroes-table",
          title: {
            vi: "4.1. Bảng PRO Tra Cứu Chi Tiết 24 Tướng Mythic & Legendary Trọng Điểm (Mảnh Sao, Bộ Đồ Vàng & Hồn Đá)",
            en: "4.1. PRO Master Lookup Table: 24 Core Mythic & Legendary Heroes (Shards, MVS, Golden Gear & Soul Stones)",
          },
          badge: {
            vi: "24 TƯỚNG TRỌNG ĐIỂM PRO",
            en: "24 CORE HEROES MATRIX",
          },
          blocks: [
            {
              type: "table",
              caption: {
                vi: "Bảng định lượng Mốc Sao Khả Dụng (MVS), Điểm Dừng ROI Tối Ưu (Sweet Spot), Bộ Trang Bị Vàng Chuẩn và Chi Phí Thức Tỉnh cho 24 Tướng Trọng Điểm",
                en: "Quantitative MVS, Optimal ROI Sweet Spot, Standardized Golden Gear Set, and Awakening Cost Matrix for all 24 Core Mythic & Legendary Heroes",
              },
              headers: [
                { vi: "Tên Tướng", en: "Hero Name" },
                { vi: "Phe", en: "Faction" },
                { vi: "Phẩm Gốc", en: "Base Tier" },
                {
                  vi: "Nguồn Sở Hữu Chính (F2P / Low-Spender)",
                  en: "Primary Acquisition Source (F2P / Low-Spender)",
                },
                {
                  vi: "Mốc Sao Dùng Được Ngay (MVS)",
                  en: "Minimum Viable Stars (MVS)",
                },
                {
                  vi: "Điểm Dừng ROI Tối Ưu (Sweet Spot)",
                  en: "Optimal ROI Sweet Spot",
                },
                {
                  vi: "Bộ Trang Bị Vàng Chuẩn (Golden Gear Set) & Chi Phí Thức Tỉnh",
                  en: "Standard Golden Gear Set & Awakening Cost",
                },
              ],
              rows: [
                [
                  { vi: "Desert Prince", en: "Desert Prince" },
                  { vi: "Horde", en: "Horde" },
                  { vi: "Mythic", en: "Mythic" },
                  {
                    vi: "Vòng Quay (Wheel) / Xúc Xắc (Ngày 21)",
                    en: "Lucky Wheel / Dice Event (Day 21)",
                  },
                  { vi: "1★ Đỏ (160 Mảnh)", en: "1★ Red (160 Shards)" },
                  {
                    vi: "1★ Trắng (560 Mảnh) ➔ Max 5★ Trắng (1,000)",
                    en: "1★ White (560 Shards) ➔ Max 5★ White (1,000)",
                  },
                  {
                    vi: "Huyết Titan / Nộ Huyết — Mythic gốc (0 Đá)",
                    en: "Blood of the Titan — Native Mythic (0 Stones)",
                  },
                ],
                [
                  { vi: "Storm Maiden", en: "Storm Maiden" },
                  { vi: "Horde", en: "Horde" },
                  { vi: "Mythic", en: "Mythic" },
                  {
                    vi: "Vòng Quay / Xúc Xắc (Ngày 27)",
                    en: "Lucky Wheel / Dice Event (Day 27)",
                  },
                  { vi: "1★ Đỏ (160 Mảnh)", en: "1★ Red (160 Shards)" },
                  {
                    vi: "1★ Trắng (560 Mảnh) ➔ Max 5★ Trắng (1,000)",
                    en: "1★ White (560 Shards) ➔ Max 5★ White (1,000)",
                  },
                  {
                    vi: "Kỵ Sĩ Vinh Quang — Mythic gốc (0 Đá)",
                    en: "Knight's Glory — Native Mythic (0 Stones)",
                  },
                ],
                [
                  { vi: "Witch", en: "Witch" },
                  { vi: "Horde", en: "Horde" },
                  { vi: "Mythic", en: "Mythic" },
                  {
                    vi: "Vòng Quay / Xúc Xắc (Ngày 41)",
                    en: "Lucky Wheel / Dice Event (Day 41)",
                  },
                  { vi: "3★ Vàng (60 Mảnh)", en: "3★ Yellow (60 Shards)" },
                  {
                    vi: "1★ Trắng (560 Mảnh) (Đủ hồi máu/debuff)",
                    en: "1★ White (560 Shards) (Full heal/debuff value)",
                  },
                  {
                    vi: "Hiền Triết Quang Vinh — Mythic gốc (0 Đá)",
                    en: "Glory of the Sage — Native Mythic (0 Stones)",
                  },
                ],
                [
                  { vi: "Wukong", en: "Wukong" },
                  { vi: "Horde", en: "Horde" },
                  { vi: "Mythic", en: "Mythic" },
                  {
                    vi: "Sự kiện Mùa 2 (Wheel / Dice S2)",
                    en: "Season 2 Event (Wheel / Dice S2)",
                  },
                  { vi: "1★ Đỏ (160 Mảnh)", en: "1★ Red (160 Shards)" },
                  {
                    vi: "Max 5★ Trắng (1,000 Mảnh) (Ưu tiên #1 S2)",
                    en: "Max 5★ White (1,000 Shards) (#1 S2 Priority)",
                  },
                  {
                    vi: "Kỵ Sĩ Vinh Quang — Mythic gốc (0 Đá)",
                    en: "Knight's Glory — Native Mythic (0 Stones)",
                  },
                ],
                [
                  { vi: "Beastmaster", en: "Beastmaster" },
                  { vi: "Horde", en: "Horde" },
                  { vi: "Mythic", en: "Mythic" },
                  {
                    vi: "Sự kiện Mùa 2 (Wheel / Dice S2)",
                    en: "Season 2 Event (Wheel / Dice S2)",
                  },
                  { vi: "1★ Đỏ (160 Mảnh)", en: "1★ Red (160 Shards)" },
                  {
                    vi: "1★ Trắng (560 Mảnh) ➔ 3★ Trắng",
                    en: "1★ White (560 Shards) ➔ 3★ White",
                  },
                  {
                    vi: "Huyết Titan / Nộ Huyết — Mythic gốc (0 Đá)",
                    en: "Blood of the Titan — Native Mythic (0 Stones)",
                  },
                ],
                [
                  { vi: "Shadow Priest", en: "Shadow Priest" },
                  { vi: "Horde", en: "Horde" },
                  { vi: "Mythic", en: "Mythic" },
                  {
                    vi: "Sự kiện Mùa 3 (Wheel / Dice S3)",
                    en: "Season 3 Event (Wheel / Dice S3)",
                  },
                  { vi: "1★ Đỏ (160 Mảnh)", en: "1★ Red (160 Shards)" },
                  { vi: "1★ Trắng (560 Mảnh)", en: "1★ White (560 Shards)" },
                  {
                    vi: "Hiền Triết Quang Vinh — Mythic gốc (0 Đá)",
                    en: "Glory of the Sage — Native Mythic (0 Stones)",
                  },
                ],
                [
                  { vi: "Soulmancer", en: "Soulmancer" },
                  { vi: "Horde", en: "Horde" },
                  { vi: "Legendary", en: "Legendary" },
                  {
                    vi: "Quán Rượu / Tiệm Đổi / Rương Hệ",
                    en: "Tavern / Exchange Shop / Faction Chests",
                  },
                  { vi: "1★ Trắng (280 Mảnh)", en: "1★ White (280 Shards)" },
                  {
                    vi: "2★ Trắng (300 Mảnh) + Thức tỉnh Đỏ",
                    en: "2★ White (300 Shards) + Mythic Awakening",
                  },
                  {
                    vi: "Hiền Triết Quang Vinh — 9 Hồn Đá Đỏ (Soul Stones) + 345–385 Mảnh Tướng",
                    en: "Glory of the Sage — 9 Red Soul Stones + 345–385 Hero Shards",
                  },
                ],
                [
                  { vi: "Warlock", en: "Warlock" },
                  { vi: "Horde", en: "Horde" },
                  { vi: "Legendary", en: "Legendary" },
                  {
                    vi: "Quán Rượu / Tiệm Đổi / Rương Hệ",
                    en: "Tavern / Exchange Shop / Faction Chests",
                  },
                  { vi: "1★ Trắng (280 Mảnh)", en: "1★ White (280 Shards)" },
                  {
                    vi: "2★ Trắng (300 Mảnh) + Thức tỉnh Đỏ",
                    en: "2★ White (300 Shards) + Mythic Awakening",
                  },
                  {
                    vi: "Hiền Triết Quang Vinh — 9 Hồn Đá Đỏ (Soul Stones) + 345–385 Mảnh Tướng",
                    en: "Glory of the Sage — 9 Red Soul Stones + 345–385 Hero Shards",
                  },
                ],
                [
                  { vi: "Paragon", en: "Paragon" },
                  { vi: "League", en: "League" },
                  { vi: "Mythic", en: "Mythic" },
                  {
                    vi: "Vòng Quay / Xúc Xắc (Ngày 35)",
                    en: "Lucky Wheel / Dice Event (Day 35)",
                  },
                  { vi: "1★ Đỏ (160 Mảnh)", en: "1★ Red (160 Shards)" },
                  {
                    vi: "1★ Trắng (560 Mảnh) ➔ Max 5★ Trắng (1,000)",
                    en: "1★ White (560 Shards) ➔ Max 5★ White (1,000)",
                  },
                  {
                    vi: "Kỵ Sĩ Vinh Quang — Mythic gốc (0 Đá)",
                    en: "Knight's Glory — Native Mythic (0 Stones)",
                  },
                ],
                [
                  { vi: "Rose Princess", en: "Rose Princess" },
                  { vi: "League", en: "League" },
                  { vi: "Mythic", en: "Mythic" },
                  {
                    vi: "Vòng Quay / Xúc Xắc (Ngày 46)",
                    en: "Lucky Wheel / Dice Event (Day 46)",
                  },
                  { vi: "1★ Đỏ (160 Mảnh)", en: "1★ Red (160 Shards)" },
                  {
                    vi: "1★ Trắng (560 Mảnh) ➔ 3★ Trắng",
                    en: "1★ White (560 Shards) ➔ 3★ White",
                  },
                  {
                    vi: "Huyết Titan / Nộ Huyết — Mythic gốc (0 Đá)",
                    en: "Blood of the Titan — Native Mythic (0 Stones)",
                  },
                ],
                [
                  { vi: "Bishop", en: "Bishop" },
                  { vi: "League", en: "League" },
                  { vi: "Mythic", en: "Mythic" },
                  {
                    vi: "Vòng Quay / Xúc Xắc (Ngày 46+)",
                    en: "Lucky Wheel / Dice Event (Day 46+)",
                  },
                  { vi: "1★ Trắng (560 Mảnh)", en: "1★ White (560 Shards)" },
                  {
                    vi: "3★ Trắng (720 Mảnh) (Cần sao cao để nổ)",
                    en: "3★ White (720 Shards) (Needs high stars to burst)",
                  },
                  {
                    vi: "Kỵ Sĩ Vinh Quang — Mythic gốc (0 Đá)",
                    en: "Knight's Glory — Native Mythic (0 Stones)",
                  },
                ],
                [
                  { vi: "Artificer", en: "Artificer" },
                  { vi: "League", en: "League" },
                  { vi: "Mythic", en: "Mythic" },
                  {
                    vi: "Sự kiện Mùa 3 (Wheel / Dice S3)",
                    en: "Season 3 Event (Wheel / Dice S3)",
                  },
                  { vi: "1★ Đỏ (160 Mảnh)", en: "1★ Red (160 Shards)" },
                  {
                    vi: "1★ Trắng (560 Mảnh) ➔ 3★ Trắng",
                    en: "1★ White (560 Shards) ➔ 3★ White",
                  },
                  {
                    vi: "Hiền Triết Quang Vinh — Mythic gốc (0 Đá)",
                    en: "Glory of the Sage — Native Mythic (0 Stones)",
                  },
                ],
                [
                  { vi: "Pyromancer", en: "Pyromancer" },
                  { vi: "League", en: "League" },
                  { vi: "Legendary", en: "Legendary" },
                  {
                    vi: "Quán Rượu / Tiệm Đấu Trường / Gói $0.99",
                    en: "Tavern / Arena Shop / $0.99 Starter Pack",
                  },
                  { vi: "3★ Đỏ (120 Mảnh)", en: "3★ Red (120 Shards)" },
                  {
                    vi: "Max 5★ Trắng (500 Mảnh) + Thức tỉnh",
                    en: "Max 5★ White (500 Shards) + Awakening",
                  },
                  {
                    vi: "Kỵ Sĩ Vinh Quang — 9 Hồn Đá Đỏ (Soul Stones) + 345–385 Mảnh Tướng",
                    en: "Knight's Glory — 9 Red Soul Stones + 345–385 Hero Shards",
                  },
                ],
                [
                  { vi: "Adjudicator", en: "Adjudicator" },
                  { vi: "League", en: "League" },
                  { vi: "Legendary", en: "Legendary" },
                  {
                    vi: "Quán Rượu / Tiệm Đấu Trường",
                    en: "Tavern / Arena Shop",
                  },
                  { vi: "3★ Đỏ (120 Mảnh)", en: "3★ Red (120 Shards)" },
                  {
                    vi: "2★–5★ Trắng (300–500 Mảnh) + Thức tỉnh",
                    en: "2★–5★ White (300–500 Shards) + Awakening",
                  },
                  {
                    vi: "Huyết Titan / Nộ Huyết — 9 Hồn Đá Đỏ (Soul Stones) + 345–385 Mảnh Tướng",
                    en: "Blood of the Titan — 9 Red Soul Stones + 345–385 Hero Shards",
                  },
                ],
                [
                  { vi: "Nun", en: "Nun" },
                  { vi: "League", en: "League" },
                  { vi: "Legendary", en: "Legendary" },
                  {
                    vi: "Quán Rượu / Tiệm Đổi",
                    en: "Tavern / Exchange Shop",
                  },
                  { vi: "1★ Đỏ (80 Mảnh)", en: "1★ Red (80 Shards)" },
                  {
                    vi: "2★ Trắng (300 Mảnh) + Thức tỉnh",
                    en: "2★ White (300 Shards) + Awakening",
                  },
                  {
                    vi: "Hiền Triết Quang Vinh — 9 Hồn Đá Đỏ (Soul Stones) + 345–385 Mảnh Tướng",
                    en: "Glory of the Sage — 9 Red Soul Stones + 345–385 Hero Shards",
                  },
                ],
                [
                  { vi: "Bard", en: "Bard" },
                  { vi: "League", en: "League" },
                  { vi: "Legendary", en: "Legendary" },
                  {
                    vi: "Quán Rượu / Tiệm Đổi",
                    en: "Tavern / Exchange Shop",
                  },
                  { vi: "1★ Đỏ (80 Mảnh)", en: "1★ Red (80 Shards)" },
                  {
                    vi: "2★ Trắng (300 Mảnh) (Mở +40% Xây dựng)",
                    en: "2★ White (300 Shards) (Unlocks +40% Construction)",
                  },
                  {
                    vi: "Hiền Triết Quang Vinh — Tuỳ chọn (Ưu tiên sau Pyro/Adj)",
                    en: "Glory of the Sage — Optional (After Pyro/Adj)",
                  },
                ],
                [
                  { vi: "Tidecaller", en: "Tidecaller" },
                  { vi: "Nature", en: "Nature" },
                  { vi: "Mythic", en: "Mythic" },
                  {
                    vi: "Vòng Quay / Xúc Xắc (Cuối S0 / Đầu S1)",
                    en: "Lucky Wheel / Dice Event (Late S0 / Early S1)",
                  },
                  { vi: "1★ Đỏ (160 Mảnh)", en: "1★ Red (160 Shards)" },
                  {
                    vi: "Max 5★ Trắng (1,000 Mảnh) (Core #1 Nature)",
                    en: "Max 5★ White (1,000 Shards) (Core #1 Nature)",
                  },
                  {
                    vi: "Kỵ Sĩ Vinh Quang / Hiền Triết Quang Vinh — Mythic gốc (0 Đá)",
                    en: "Knight's Glory / Glory of the Sage — Native Mythic (0 Stones)",
                  },
                ],
                [
                  { vi: "Monk", en: "Monk" },
                  { vi: "Nature", en: "Nature" },
                  { vi: "Mythic", en: "Mythic" },
                  {
                    vi: "Sự kiện Mùa 1 (Wheel / Dice S1)",
                    en: "Season 1 Event (Wheel / Dice S1)",
                  },
                  { vi: "1★ Đỏ (160 Mảnh)", en: "1★ Red (160 Shards)" },
                  {
                    vi: "1★ Trắng (560 Mảnh) ➔ 3★ Trắng",
                    en: "1★ White (560 Shards) ➔ 3★ White",
                  },
                  {
                    vi: "Huyết Titan / Nộ Huyết — Mythic gốc (0 Đá)",
                    en: "Blood of the Titan — Native Mythic (0 Stones)",
                  },
                ],
                [
                  { vi: "Ne Zha", en: "Ne Zha" },
                  { vi: "Nature", en: "Nature" },
                  { vi: "Mythic", en: "Mythic" },
                  {
                    vi: "Sự kiện Mùa 1 (Wheel / Dice S1)",
                    en: "Season 1 Event (Wheel / Dice S1)",
                  },
                  { vi: "1★ Đỏ (160 Mảnh)", en: "1★ Red (160 Shards)" },
                  {
                    vi: "Max 5★ Trắng (1,000 Mảnh) (Core #2 Nature)",
                    en: "Max 5★ White (1,000 Shards) (Core #2 Nature)",
                  },
                  {
                    vi: "Kỵ Sĩ Vinh Quang / Huyết Titan — Mythic gốc (0 Đá)",
                    en: "Knight's Glory / Blood of the Titan — Native Mythic (0 Stones)",
                  },
                ],
                [
                  { vi: "Petalis", en: "Petalis" },
                  { vi: "Nature", en: "Nature" },
                  { vi: "Mythic", en: "Mythic" },
                  {
                    vi: "Sự kiện Mùa 3 (Wheel / Dice S3)",
                    en: "Season 3 Event (Wheel / Dice S3)",
                  },
                  { vi: "1★ Đỏ (160 Mảnh)", en: "1★ Red (160 Shards)" },
                  { vi: "1★ Trắng (560 Mảnh)", en: "1★ White (560 Shards)" },
                  {
                    vi: "Hiền Triết Quang Vinh — Mythic gốc (0 Đá)",
                    en: "Glory of the Sage — Native Mythic (0 Stones)",
                  },
                ],
                [
                  { vi: "Pixie", en: "Pixie" },
                  { vi: "Nature", en: "Nature" },
                  { vi: "Legendary", en: "Legendary" },
                  {
                    vi: "Quán Rượu / Rương Hệ Nature",
                    en: "Tavern / Nature Faction Chests",
                  },
                  { vi: "3★ Đỏ (120 Mảnh)", en: "3★ Red (120 Shards)" },
                  {
                    vi: "2★–5★ Trắng (300–500 Mảnh) + Thức tỉnh",
                    en: "2★–5★ White (300–500 Shards) + Awakening",
                  },
                  {
                    vi: "Kỵ Sĩ Vinh Quang — 9 Hồn Đá Đỏ (Soul Stones) + 345–385 Mảnh Tướng",
                    en: "Knight's Glory — 9 Red Soul Stones + 345–385 Hero Shards",
                  },
                ],
                [
                  { vi: "Forest Maiden", en: "Forest Maiden" },
                  { vi: "Nature", en: "Nature" },
                  { vi: "Legendary", en: "Legendary" },
                  {
                    vi: "Quán Rượu / Rương Hệ Nature",
                    en: "Tavern / Nature Faction Chests",
                  },
                  { vi: "1★ Đỏ (80 Mảnh)", en: "1★ Red (80 Shards)" },
                  { vi: "2★ Trắng (300 Mảnh)", en: "2★ White (300 Shards)" },
                  {
                    vi: "Hiền Triết Quang Vinh — Tuỳ chọn",
                    en: "Glory of the Sage — Optional",
                  },
                ],
                [
                  { vi: "Sage", en: "Sage" },
                  { vi: "Nature", en: "Nature" },
                  { vi: "Legendary", en: "Legendary" },
                  {
                    vi: "Quán Rượu / Tiệm Đấu Trường",
                    en: "Tavern / Arena Shop",
                  },
                  { vi: "3★ Đỏ (120 Mảnh)", en: "3★ Red (120 Shards)" },
                  {
                    vi: "2★ Trắng (300 Mảnh) + Thức tỉnh",
                    en: "2★ White (300 Shards) + Awakening",
                  },
                  {
                    vi: "Huyết Titan / Nộ Huyết — 9 Hồn Đá Đỏ (Soul Stones) + 345–385 Mảnh Tướng",
                    en: "Blood of the Titan — 9 Red Soul Stones + 345–385 Hero Shards",
                  },
                ],
                [
                  { vi: "Stonemason", en: "Stonemason" },
                  { vi: "Nature", en: "Nature" },
                  { vi: "Legendary", en: "Legendary" },
                  {
                    vi: "Quán Rượu / Rương Hệ Nature",
                    en: "Tavern / Nature Faction Chests",
                  },
                  { vi: "2★ Trắng (300 Mảnh)", en: "2★ White (300 Shards)" },
                  {
                    vi: "2★ Trắng (300 Mảnh) (Mở +40% Đào Đá)",
                    en: "2★ White (300 Shards) (Unlocks +40% Stone Gathering)",
                  },
                  {
                    vi: "Dự bị Kinh tế (Active without deployment)",
                    en: "Economy Bench (Active without deployment)",
                  },
                ],
              ],
            },
          ],
        },
        {
          id: "sub-4-2-shard-decision-tree",
          title: {
            vi: "4.2. Sơ Đồ Luồng Quyết Định Đầu Tư Mảnh Tướng (Shard Allocation Decision Tree)",
            en: "4.2. Universal Legendary Shard Allocation Decision Tree",
          },
          badge: {
            vi: "DECISION TREE • 560 MẢNH",
            en: "DECISION TREE • 560 SHARDS",
          },
          blocks: [
            {
              type: "visual_diagram",
              mediaCode: "MED-2.1-03",
              variant: "decision_flow",
              title: {
                vi: "Sơ Đồ Luồng Quyết Định Đầu Tư Mảnh Vạn Năng Vàng (Shard Allocation Decision Tree)",
                en: "Universal Legendary Shard Allocation Decision Tree",
              },
              subtitle: {
                vi: "Quy trình kiểm tra 3 bước trước khi bấm đút Mảnh Vạn Năng Vàng để tối đa hóa điểm gãy 1 Sao Trắng (560 Mảnh = +30% Skill Effect)",
                en: "3-step verification flow before spending Universal Legendary Shards to hit the 1 White Star (560 Shards = +30% Skill Effect) breakpoint",
              },
              centerNode: {
                id: "start-universal-shards",
                badge: {
                  vi: "ĐẦU VÀO TÀI NGUYÊN",
                  en: "RESOURCE INPUT",
                },
                title: {
                  vi: "Nhận được Mảnh Vạn Năng Vàng (Universal Legendary Shards)",
                  en: "Acquire Universal Legendary Hero Shards",
                },
                subtitle: {
                  vi: "Kiểm tra phẩm chất gốc, mốc 1 Sao Trắng (11 Sao = 560 Mảnh) và vai trò chiến thuật của tướng trong Đội hình 1",
                  en: "Check base rarity, the 1 White Star (11 Stars = 560 Shards) threshold, and tactical role inside Queue 1",
                },
                tone: "gold",
              },
              branches: [
                {
                  title: {
                    vi: "Nhánh 1: Tướng Vàng có sẵn trong Quán Rượu (Tavern Legendaries)",
                    en: "Branch 1: Tavern-Pullable Legendary Heroes",
                  },
                  badge: {
                    vi: "CẤM TUYỆT ĐỐI",
                    en: "STRICT TABOO",
                  },
                  tone: "rose",
                  steps: [
                    {
                      id: "step-tavern-check",
                      title: {
                        vi: "Secret Keeper, Astrologer, Barbarian, Treeguard, Stonemason...",
                        en: "Secret Keeper, Astrologer, Barbarian, Treeguard, Stonemason...",
                      },
                      subtitle: {
                        vi: "Tướng có mảnh riêng rơi tự nhiên từ Quán Rượu hoặc Tiệm Đổi hàng tuần",
                        en: "Heroes whose specific shards drop naturally in the Tavern or weekly Exchange Shops",
                      },
                      tone: "rose",
                    },
                  ],
                  outcome: {
                    vi: "DỪNG LẠI NGAY! Chỉ nâng bằng mảnh riêng tự nhiên để lấy Trait Kinh tế & Hero Bonds.",
                    en: "STOP IMMEDIATELY! Upgrade strictly using hero-specific shards for Economy Traits & Hero Bonds.",
                  },
                },
                {
                  title: {
                    vi: "Nhánh 2: Tướng Đỏ (Mythic) Đội 1 chưa đạt 1 Sao Trắng (< 560 Mảnh)",
                    en: "Branch 2: Queue 1 Mythic Hero Below 1 White Star (< 560 Shards)",
                  },
                  badge: {
                    vi: "ƯU TIÊN SỐ 1",
                    en: "#1 PRIORITY",
                  },
                  tone: "gold",
                  steps: [
                    {
                      id: "step-push-560",
                      title: {
                        vi: "Kéo từ 1 Sao Đỏ (160 Mảnh) ➔ 5 Sao Đỏ (400 Mảnh) ➔ 1 Sao Trắng (560 Mảnh)",
                        en: "Push from 1 Red Star (160 Shards) ➔ 5 Red Stars (400 Shards) ➔ 1 White Star (560 Shards)",
                      },
                      subtitle: {
                        vi: "Tập trung 100% Mảnh Vạn Năng cho từng tướng một chạm mốc 11 Sao tổng (560 Mảnh)",
                        en: "Funnel 100% of Universal Shards into one Mythic at a time until hitting 11 Total Stars (560 Shards)",
                      },
                      metrics: [
                        { vi: "1★ Đỏ = 160 Mảnh", en: "1★ Red = 160 Shards" },
                        { vi: "1★ Trắng = 560 Mảnh (+30%)", en: "1★ White = 560 Shards (+30%)" },
                      ],
                      tone: "gold",
                    },
                  ],
                  outcome: {
                    vi: "Dồn 100% mảnh kéo lên đúng 1 Sao Trắng (560 Mảnh) để mở khóa bước nhảy +30% hiệu ứng kỹ năng cốt lõi.",
                    en: "Funnel 100% of shards straight to 1 White Star (560 Shards) to unlock the +30% signature skill effect spike.",
                  },
                },
                {
                  title: {
                    vi: "Nhánh 3: Tướng Đỏ (Mythic) Đội 1 đã đạt 1 Sao Trắng (≥ 560 Mảnh)",
                    en: "Branch 3: Queue 1 Mythic Hero Already at 1 White Star (≥ 560 Shards)",
                  },
                  badge: {
                    vi: "PHÂN NHÁNH VAI TRÒ",
                    en: "ROLE SPLIT",
                  },
                  tone: "emerald",
                  steps: [
                    {
                      id: "step-role-carry",
                      title: {
                        vi: "Nếu là Hyper-Carry DPS (Wukong, Storm Maiden, Tidecaller, Ne Zha, Paragon)",
                        en: "If Hyper-Carry DPS (Wukong, Storm Maiden, Tidecaller, Ne Zha, Paragon)",
                      },
                      subtitle: {
                        vi: "Tiếp tục dồn lên 3–5 Sao Trắng (1,000 Mảnh Max Out) để tối đa hóa sát thương dứt điểm",
                        en: "Continue pushing to 3–5 White Stars (1,000 Shards Max Out) for maximum execution damage",
                      },
                      tone: "emerald",
                    },
                    {
                      id: "step-role-support-tank",
                      title: {
                        vi: "Nếu là Tanker / Healer / Support (Witch, Monk, Beastmaster, Rose Princess)",
                        en: "If Tanker / Healer / Support (Witch, Monk, Beastmaster, Rose Princess)",
                      },
                      subtitle: {
                        vi: "Tạm dừng ở 1 Sao Trắng (560 Mảnh); chuyển toàn bộ mảnh cho tướng Mythic tiếp theo trong Đội 1",
                        en: "Park at 1 White Star (560 Shards); rotate Universal Shards to the next Mythic hero in Queue 1",
                      },
                      tone: "blue",
                    },
                  ],
                  outcome: {
                    vi: "Tối ưu hóa hoàn hảo tỷ suất ROI trên từng Mảnh Vạn Năng Vàng cho toàn bộ 6 vị trí Đội hình 1.",
                    en: "Maximizes ROI per Universal Legendary Shard across all 6 slots of Queue 1.",
                  },
                },
              ],
              footnote: {
                vi: "Quy tắc vàng: Không bao giờ nâng dàn trải nhiều tướng Mythic dừng ở 3–4 Sao Đỏ; hãy dứt điểm từng tướng chạm mốc 1 Sao Trắng (560 Mảnh) trước khi chuyển mục tiêu.",
                en: "Golden Rule: Never spread shards leaving multiple Mythics stranded at 3–4 Red Stars; finish each hero to 1 White Star (560 Shards) before rotating targets.",
              },
            },
            {
              type: "media_spotlight",
              mediaCode: "MED-2.1-04",
              tier: "tier4_youtube_ref",
              title: {
                vi: "Video Tham Chiếu Quốc Tế: Bảng Xếp Hạng Tier List & Thứ Tự Ưu Tiên Tướng Mythic (S0 – S3)",
                en: "International Video Reference: Complete Hero Tier List & Mythic Investment Priority (S0 to S3)",
              },
              description: {
                vi: "Thẻ Video tham chiếu quốc tế từ kênh RedBaron Gaming & Otiz Heroes Official — Chủ đề: \"Complete Hero Tier List & Mythic Investment Priority (S0 to S3)\".",
                en: "International community video reference card from RedBaron Gaming & Otiz Heroes Official — Topic: \"Complete Hero Tier List & Mythic Investment Priority (S0 to S3)\".",
              },
              videoChannel: "RedBaron Gaming & Otiz Heroes Official",
              videoTitle:
                "Complete Hero Tier List & Mythic Investment Priority (S0 to S3)",
            },
          ],
        },
      ],
    },
    {
      id: "sec-5-castle-27-shard-dilution-case-study",
      isPro: true,
      title: {
        vi: "5. Kịch bản Thực chiến Nâng cao: Case Study Tái Cấu Trúc Tài Khoản Lâu Đài Lv.27 (5.8M Lực Chiến) Bị \"Loãng Mảnh\"",
        en: "5. Advanced Tactical Case Study: Restructuring a Shard-Diluted Castle Lv.27 (5.8M Power) Account",
      },
      blocks: [
        {
          type: "case_study",
          badge: {
            vi: "CASE STUDY LÂU ĐÀI LV.27 (5.8M POWER)",
            en: "CASTLE LV.27 (5.8M POWER) CASE STUDY",
          },
          title: {
            vi: "Tái Cấu Trúc Danh Mục Tướng Cho Tài Khoản Lâu Đài Lv.27 (5.8M Lực Chiến) Bị \"Loãng 950 Mảnh Vạn Năng\"",
            en: "Restructuring a Shard-Diluted Castle Lv.27 (5.8M Power) Account After Spreading 950 Universal Shards",
          },
          profileSummary: {
            vi: "**Hiện trạng trước tối ưu:** Người chơi Lâu đài `Lv.27` (`5.8M` Lực chiến) chia đều `950` **Mảnh Vạn Năng Vàng** cho 8 tướng thuộc cả 3 phe.\n• **Chi tiết phân mảnh:** `Pyromancer` `2★ Đỏ`, `Astrologer` `2★ Đỏ`, `Secret Keeper` `1★ Đỏ`, `Wilderness Hunter` `2★ Đỏ`, `Desert Prince` `4★ Vàng`, `Storm Maiden` `3★ Vàng`, `Treeguard` `1★ Đỏ`, `Pixie` `1★ Đỏ`.\n• **Hậu quả:** Không có tướng `Mythic` nào chạm mốc `1★ Đỏ` (`6★` = `160` Mảnh) hoặc `1★ Trắng` (`11★` = `560` Mảnh).\n• **Thực chiến Arena:** Đội `5.8M` thua liên tiếp các acc `4.6M` có cặp `Storm Maiden` + `Desert Prince` `1★ Trắng` mặc chuẩn bộ `Kỵ Sĩ Vinh Quang` và `Huyết Titan / Nộ Huyết`.",
            en: "**Pre-Optimization State:** A Castle `Lv.27` (`5.8M` Power) player diluted `950` **Universal Legendary Shards** across 8 heroes spanning all 3 factions.\n• **Shard Spread:** `Pyromancer` `2★ Red`, `Astrologer` `2★ Red`, `Secret Keeper` `1★ Red`, `Wilderness Hunter` `2★ Red`, `Desert Prince` `4★ Yellow`, `Storm Maiden` `3★ Yellow`, `Treeguard` `1★ Red`, `Pixie` `1★ Red`.\n• **Consequence:** Zero `Mythic` heroes reached `1★ Red` (`6★` = `160` Shards) or `1★ White` (`11★` = `560` Shards).\n• **Arena Reality:** This `5.8M` lineup repeatedly lost to `4.6M` accounts fielding a `1★ White` `Storm Maiden` + `Desert Prince` duo in `Knight's Glory` and `Blood of the Titan`.",
          },
          metrics: [
            {
              label: {
                vi: "Phân bổ 950 Mảnh Vạn Năng Vàng",
                en: "950 Universal Legendary Shards Allocation",
              },
              before: {
                vi: "Chia vụn cho 8 tướng (0 Mythic đạt 1★ Đỏ)",
                en: "Diluted across 8 heroes (0 Mythics at 1★ Red)",
              },
              after: {
                vi: "Hội tụ 100% vào Storm Maiden & Desert Prince",
                en: "100% Funneled into Storm Maiden & Desert Prince",
              },
              delta: {
                vi: "Đạt điểm gãy 1★ Trắng (560 Mảnh = +30% Skill)",
                en: "Unlocked 1★ White (560 Shards = +30% Skill)",
              },
            },
            {
              label: {
                vi: "Lực Chiến Thực Chiến Đội 1 (Queue 1 Power)",
                en: "Queue 1 Real Combat Power",
              },
              before: {
                vi: "Thua liên tiếp các acc 4.6M chuẩn Meta",
                en: "Repeatedly lost to 4.6M Meta accounts",
              },
              after: {
                vi: "Tăng vọt +1.2M Lực chiến thực chiến Đội 1",
                en: "+1.2M Queue 1 Combat Power Surge",
              },
              delta: {
                vi: "+1.2M Queue 1 Power sau 28 ngày (2 kỳ GAR)",
                en: "+1.2M Queue 1 Power in 28 days (2 GAR cycles)",
              },
            },
            {
              label: {
                vi: "Thành tích Tháp Thử Thách & Đấu Trường",
                en: "Trial Tower & Server Arena Ranking",
              },
              before: {
                vi: "Kẹt tầng Tháp & văng khỏi Top 100 Arena",
                en: "Stuck in Trial Tower & outside Top 100 Arena",
              },
              after: {
                vi: "Vượt +45 tầng Tháp & lọt Top 30 Đấu Trường",
                en: "+45 Trial Tower floors & Top 30 Server Arena",
              },
              delta: {
                vi: "Top 30 Arena máy chủ",
                en: "Top 30 Server Arena",
              },
            },
          ],
          diagnostics: [
            {
              vi: "**Chẩn đoán 1:** Lãng phí hàng trăm **Mảnh Vạn Năng Vàng** vào tướng Quán Rượu (`Astrologer` `2★ Đỏ`, `Secret Keeper` `1★ Đỏ`, `Treeguard` `1★ Đỏ`) vốn chỉ dùng làm kinh tế dự bị.",
              en: "**Diagnosis 1:** Wasted hundreds of **Universal Legendary Shards** on Tavern-pullable heroes (`Astrologer` `2★ Red`, `Secret Keeper` `1★ Red`, `Treeguard` `1★ Red`) meant for the economy bench.",
            },
            {
              vi: "**Chẩn đoán 2:** Hai trụ cột `Mythic` là `Desert Prince` (`4★ Vàng`) và `Storm Maiden` (`3★ Vàng`) đói mảnh, chưa mở được Kỹ năng 5 ở `1★ Đỏ` (`160` Mảnh) lẫn `+30%` ở `1★ Trắng` (`560` Mảnh).",
              en: "**Diagnosis 2:** Core `Mythic` carries `Desert Prince` (`4★ Yellow`) and `Storm Maiden` (`3★ Yellow`) lacked shards for their 5th Skill at `1★ Red` (`160` Shards) or `+30%` at `1★ White` (`560` Shards).",
            },
          ],
          recoverySteps: [
            {
              stepNumber: "1",
              title: {
                vi: "Đóng băng tức thì (Immediate Freeze)",
                en: "Immediate Freeze on Non-Core Upgrades",
              },
              detail: {
                vi: "**Ngưng tuyệt đối** việc nâng sao bằng **Mảnh Vạn Năng** cho toàn bộ tướng ở Đội 2, Đội 3 và tướng Vàng Quán Rượu (`Secret Keeper`, `Astrologer`, `Treeguard`, `Wilderness Hunter`).",
                en: "**Immediately halt** all **Universal Shard** upgrades on Queue 2, Queue 3, and Tavern Legendary heroes (`Secret Keeper`, `Astrologer`, `Treeguard`, `Wilderness Hunter`).",
              },
              impactBadge: {
                vi: "Cắt đứt 100% rò rỉ mảnh",
                en: "100% Shard Bleed Halted",
              },
            },
            {
              stepNumber: "2",
              title: {
                vi: "Tập trung Hỏa lực (Hyper-Focus) Trong 2 Kỳ GAR",
                en: "Hyper-Focus Universal Shards Across 2 GAR Cycles",
              },
              detail: {
                vi: "**Dồn 100% Mảnh Vạn Năng Vàng** trong 2 kỳ `Guild Arms Race` (Tuần B) để kéo `Storm Maiden` từ `3★ Vàng` lên thẳng `1★ Trắng` (`11★` = `560` Mảnh).\n• Tiếp tục kéo `Desert Prince` lên `1★ Đỏ` (`160` Mảnh) ➔ `1★ Trắng` (`560` Mảnh), mặc chuẩn bộ `Kỵ Sĩ Vinh Quang` và `Huyết Titan / Nộ Huyết`.",
                en: "**Funnel 100% of Universal Legendary Shards** across the next 2 `Guild Arms Race` (Week B) cycles to push `Storm Maiden` from `3★ Yellow` straight to `1★ White` (`11★` = `560` Shards).\n• Then push `Desert Prince` to `1★ Red` (`160` Shards) ➔ `1★ White` (`560` Shards) while equipping `Knight's Glory` and `Blood of the Titan`.",
              },
              impactBadge: {
                vi: "560 Mảnh/Tướng • +30% Skill",
                en: "560 Shards/Hero • +30% Skill",
              },
            },
            {
              stepNumber: "3",
              title: {
                vi: "Thu hoạch Đột phá Thực chiến Sau 28 Ngày",
                en: "Harvest Real Combat Power Breakthrough After 28 Days",
              },
              detail: {
                vi: "Sau **28 ngày** (2 Chu kỳ Tuần A/B), **Lực chiến thực chiến Đội 1** tăng vọt `+1.2M`.\n• Giúp tài khoản vượt thêm `+45` tầng **Tháp Thử Thách** và lọt vào `Top 30` **Đấu Trường** máy chủ.",
                en: "After **28 days** (2 Bi-Weekly A/B Cycles), **Queue 1 Combat Power** surged by `+1.2M`.\n• Propelled the account through `+45` **Trial Tower** floors and into the `Top 30` **Server Arena**.",
              },
              impactBadge: {
                vi: "+1.2M Queue 1 • Top 30 Arena",
                en: "+1.2M Queue 1 • Top 30 Arena",
              },
            },
          ],
          conclusion: {
            vi: "**Bài học cốt lõi:** `1` tướng `Mythic` đạt `1 Sao Trắng` (`560` Mảnh) mặc đúng **Bộ Đồ Vàng Chuẩn Hóa** luôn nghiền nát 4 tướng nâng lưng chừng ở `3–4 Sao Vàng`.",
            en: "**Core Takeaway:** A single `Mythic` hero pushed to `1 White Star` (`560` Shards) in a **Standardized Golden Gear Set** will always crush four heroes stranded at `3–4 Yellow Stars`.",
          },
        },
      ],
    },
  ],
};

import type { GuideArticle } from "../../types";

export const ARTICLE_5_3_ENHANCEMENT_AND_MYTHIC: GuideArticle = {
  code: "5.3",
  slug: "enhancement-and-mythic",
  categorySlug: "gear",
  badge: "PRO",
  readingMinutes: 12,
  title: {
    vi: "Bậc Thầy Cường Hóa (+10 ➔ +40), Đột Phá Đồ Đỏ 5 Sao & Vũ Khí Độc Quyền",
    en: "Enhancement Master (+10 ➔ +40), 5-Star Mythic Gear Promotion & Exclusive Weapons",
  },
  summary: {
    vi: "Quy tắc cường hóa đồng bộ theo bậc +10 (Enhancement Master), thứ tự nâng Kiếm/Giày vs Mũ/Giáp, bảng chi phí cường hóa Lv.0➔+40 (195,000 Quặng/món), bảng đột phá Trang bị Thần Thoại 0★➔5★ Đỏ (6,000 Thỏi Vàng/món) và bảng phân tích 20 cấp Vũ khí Độc quyền (275 vs 1,185 mảnh) cùng 5 cấp Sao (920 Lõi Sắt Thiên Thạch).",
    en: "Master the +10 Enhancement Master resonance rule, role-based slot priority (Weapon/Boots vs Helmet/Chestplate), complete Lv.0➔+40 enhancement cost tables (195,000 Runes/piece), 0★➔5★ Mythic Gear promotion tables (6,000 Gold Ingots/piece), and 20-level Exclusive Weapon tables (275 vs 1,185 shards & 920 Meteoric Iron Cores).",
  },
  tldr: {
    coreRule: {
      vi: "• **Quy luật đồng bộ**: Luôn nâng cấp trang bị theo bậc thang đồng đều 4 món (`+10` ➔ `+20` ➔ `+30` ➔ `+40`) để kích hoạt chỉ số ẩn **Bậc Thầy Cường Hóa (Enhancement Master)**.\n• **Mốc cộng hưởng**: Mở ngay +5,900 ATK & +74,000 HP ở mốc Vàng `+10`; hệ thống luôn tính theo món có phẩm chất thấp nhất và cấp độ thấp nhất trong 4 món.",
      en: "• **Synchronized Law**: Always enhance equipment in synchronized 4-piece brackets (`+10` ➔ `+20` ➔ `+30` ➔ `+40`) to unlock hidden **Enhancement Master** resonance stats.\n• **Resonance Rule**: Grants +5,900 ATK & +74,000 HP right at Golden `+10`; the system always evaluates resonance by the lowest-rarity and lowest-level piece among the 4 slots.",
    },
    immediateAction: {
      vi: "• **Đồng bộ Đội 1**: Đẩy đồng loạt `24` món của Đội 1 lên Full `+10` (504,000 Quặng + 2.42M Ruby) trước khi nâng bất kỳ món nào lên `+11`.\n• **Thứ tự vai trò**: Khi bước sang bậc mới (`+20`/`+30`/`+40`), đập **Kiếm + Giày** trước cho DPS/Healer và **Mũ + Giáp** trước cho Tanker/Support, rồi kéo 2 món còn lại chạm bội số của `10`.",
      en: "• **Sync Queue 1**: Bring all `24` pieces across Queue 1 to Full `+10` (504,000 Upgrade Runes + 2.42M Rubies) before pushing any single piece to `+11`.\n• **Role Slot Order**: When advancing to `+20`/`+30`/`+40`, upgrade **Weapon + Boots** first for DPS/Healers and **Helmet + Chestplate** first for Tanks/Supports, then pull the other 2 slots to the multiple of `10`.",
    },
    strictTaboo: {
      vi: "• **Cấm đập lệch cấp**: Không đập dồn 1 món lẻ lên `+25` – `+30` khi 3 món còn lại đang ở `+12`/`+15`.\n• **Cấm đốt mảnh vũ khí**: Không tiêu Mảnh Vũ Khí Độc Quyền Vạn Năng cho tướng quá độ hoặc đẩy 1 tướng lẻ lên `Lv.18` khi các trụ cột Đội 1 chưa đạt Điểm gãy Vàng `Lv.10` (275 Mảnh).",
      en: "• **No Split-Leveling**: NEVER tunnel-vision a single piece to `+25` – `+30` while leaving 3 pieces at `+12`/`+15`.\n• **No Shard Burn**: NEVER waste Universal Exclusive Weapon Shards on transitional heroes or push a single weapon to `Lv.18` before Queue 1 pillars reach the `Lv.10` Golden Breakpoint (275 Shards).",
    },
  },
  keyTakeaways: [
    {
      vi: "**Chi phí Cường hóa Đồ Vàng (`Lv.0` ➔ `+40`):**\n• `Lv.0➔+10`: 21,000 Quặng + 100,800 Ruby/món (84,000 Quặng/tướng = 504,000 Quặng/24 món, kích hoạt +5,900 ATK & +74,000 HP).\n• `Lv.11➔+20`: +39,000 Quặng (tích lũy 60,000 Quặng + 288,000 Ruby/món = 240,000 Quặng/tướng); `Lv.21➔+30`: +58,500 Quặng (tích lũy 118,500 Quặng/món = 474,000 Quặng/tướng).\n• `Lv.31➔+40`: +76,500 Quặng (tích lũy 195,000 Quặng + 936,000 Ruby/món = 780,000 Quặng + 3,744,000 Ruby/tướng = 4,680,000 Quặng + 22,464,000 Ruby cho 24 món Đội 1).",
      en: "**Golden Gear Enhancement Costs (`Lv.0` ➔ `+40`):**\n• `Lv.0➔+10`: 21,000 Runes + 100,800 Rubies/piece (84,000 Runes/hero = 504,000 Runes/24 pieces, unlocking +5,900 ATK & +74,000 HP).\n• `Lv.11➔+20`: +39,000 Runes (cumulative 60,000 Runes + 288,000 Rubies/piece = 240,000 Runes/hero); `Lv.21➔+30`: +58,500 Runes (cumulative 118,500 Runes/piece = 474,000 Runes/hero).\n• `Lv.31➔+40`: +76,500 Runes (cumulative 195,000 Runes + 936,000 Rubies/piece = 780,000 Runes + 3,744,000 Rubies/hero = 4,680,000 Runes + 22,464,000 Rubies for Queue 1's 24 pieces).",
    },
    {
      vi: "**Chi phí Đột phá Sao Đồ Đỏ (`Lv.40` ➔ `1★` ➔ `5★ Mythic`):**\n• `1★`: 750 Thỏi Vàng + 62,500 Quặng + 3M Ruby + 5 Đá Vàng; `2★`: 975 Thỏi Vàng + 81,250 Quặng + 3.9M Ruby + 10 Đá Vàng; `3★`: 1,200 Thỏi Vàng + 100,000 Quặng + 4.8M Ruby + 15 Đá Vàng.\n• `4★`: 1,425 Thỏi Vàng + 118,750 Quặng + 5.68M Ruby + 20 Đá Vàng; `5★ MYTHIC`: 1,650 Thỏi Vàng + 137,500 Quặng + 6.6M Ruby + 10 Đá Đỏ.\n• **Tổng `0★➔5★` Đỏ**: 6,000 Thỏi Vàng + 500,000 Quặng + 23,980,000 Ruby + 50 Đá Vàng + 10 Đá Đỏ/món (144,000 Thỏi Vàng + 12,000,000 Quặng + 575.52M Ruby cho 24 món Đội 1).",
      en: "**Mythic Gear Star Promotion Costs (`Lv.40` ➔ `1★` ➔ `5★ Mythic`):**\n• `1★`: 750 Gold Ingots + 62,500 Runes + 3M Rubies + 5 Legendary Stones; `2★`: 975 Ingots + 81,250 Runes + 3.9M Rubies + 10 Stones; `3★`: 1,200 Ingots + 100,000 Runes + 4.8M Rubies + 15 Stones.\n• `4★`: 1,425 Ingots + 118,750 Runes + 5.68M Rubies + 20 Legendary Stones; `5★ MYTHIC`: 1,650 Ingots + 137,500 Runes + 6.6M Rubies + 10 Mythic Stones.\n• **Total `0★➔5★` Mythic**: 6,000 Gold Ingots + 500,000 Runes + 23,980,000 Rubies + 50 Legendary Stones + 10 Mythic Stones/piece (144,000 Gold Ingots + 12,000,000 Runes + 575.52M Rubies for 24 pieces).",
    },
    {
      vi: "**Vũ khí Độc quyền (`UW Lv.1` ➔ `Lv.20` = 1,185 Mảnh / 7,110 Mảnh cho 6 tướng & `1★➔5★` = 920 Lõi Sắt Thiên Thạch):**\n• Mở `Lv.1` (5 Mảnh) cho 6 tướng Đội 1, dừng hỗ trợ ở `Lv.5` (75 Mảnh), dồn đạt Điểm gãy Vàng `Lv.10` (275 Mảnh: 500 Defense Break, -0.60% Initial Ult CD, +5.00% ATK, +10.00% HP).\n• **Thứ tự 3 Phe**: Bộ Lạc (Wukong & Storm Maiden ➔ Desert Prince & Beastmaster) | Liên Minh (Paragon & Pyromancer ➔ Rose Princess & Adjudicator) | Thiên Nhiên (Tidecaller & Ne Zha ➔ Monk & Pixie).\n• Sau đó mới tiến tới `Lv.15` (605 Mảnh, 1,160 Defense Break), `Lv.19` (1,035 Mảnh) và `Lv.20` (1,185 Mảnh: 1,850 Defense Break, -2.30% Initial Ult CD, +18.50% ATK, +37.00% HP).",
      en: "**Exclusive Weapons (`UW Lv.1` ➔ `Lv.20` = 1,185 Shards / 7,110 Shards for 6 heroes & `1★➔5★` = 920 Meteoric Iron Cores):**\n• Unlock `Lv.1` (5 Shards) for all 6 Queue 1 heroes, park supports at `Lv.5` (75 Shards), and prioritize the `Lv.10` Golden Breakpoint (275 Shards: 500 Defense Break, -0.60% Initial Ult CD, +5.00% ATK, +10.00% HP).\n• **3-Faction Order**: Horde (Wukong & Storm Maiden ➔ Desert Prince & Beastmaster) | League (Paragon & Pyromancer ➔ Rose Princess & Adjudicator) | Nature (Tidecaller & Ne Zha ➔ Monk & Pixie).\n• Push `Lv.15` (605 Shards, 1,160 Defense Break), `Lv.19` (1,035 Shards), and `Lv.20` (1,185 Shards: 1,850 Defense Break, -2.30% Initial Ult CD, +18.50% ATK, +37.00% HP) only on primary Hyper-Carries.",
    },
  ],
  keywords: [
    "bậc thầy cường hóa",
    "bac thay cuong hoa",
    "enhancement master",
    "cường hóa +40",
    "đồ đỏ 5 sao",
    "mythic gear",
    "star promotion",
    "6,000 gold ingots",
    "6,000 thỏi vàng",
    "vũ khí độc quyền",
    "exclusive weapon",
    "275 mảnh",
    "1,185 mảnh",
    "lõi sắt thiên thạch",
    "meteoric iron",
    "920",
    "defense break",
    "xuyên thủ",
  ],
  sourceFiles: [
    "docs/06-game-guides/07-standardized-web-guides/group-5-gear-and-weapons/5.3-enhancement-and-mythic.md",
    "docs/06-game-guides/07-standardized-web-guides/group-8-infrastructure/8.4-master-data-tables.md",
  ],
  freeSections: [
    {
      id: "sec-1-enhancement-master-and-slot-priority",
      title: {
        vi: "1. Giải thích Cơ chế Cốt lõi: Bậc Thầy Cường Hóa (Enhancement Master) & Thứ Tự Nâng Theo Vai Trò",
        en: "1. Core Mechanics: Enhancement Master Resonance Laws & Role-Based Slot Priority",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "• **Cộng hưởng ẩn**: Nâng trang bị bằng Quặng Cường Hóa (Upgrade Runes) và Ruby không chỉ tăng chỉ số lẻ mà còn mở khóa **Bậc Thầy Cường Hóa (Enhancement Master)**.\n• **Đột biến ngay mốc `+10`**: Ngay ở mốc Trang bị Vàng đồng bộ `+10`, hệ thống thưởng trực tiếp +5,900 ATK và +74,000 HP cho vị tướng sở hữu.",
            en: "• **Hidden Resonance**: Upgrading equipment with Upgrade Runes and Rubies does far more than raise individual item stats—it unlocks **Enhancement Master**.\n• **Immediate `+10` Spike**: Right at the synchronized Golden `+10` bracket, the system grants an immediate +5,900 ATK and +74,000 HP bonus to the equipped hero.",
          },
        },
        {
          type: "media_spotlight",
          mediaCode: "MED-5.3-02",
          tier: "tier2_annotated_ui",
          title: {
            vi: "Đối Chiếu Giao Diện In-Game: Kẹt Phẩm Chất / Lệch Cấp Độ vs Đồng Bộ 4 Món Vàng Kích Hoạt Bậc Thầy Cường Hóa",
            en: "In-Game UI Comparison: Mixed-Rarity / Uneven Level Bottleneck vs Synchronized 4-Piece Golden Enhancement Master",
          },
          description: {
            vi: "So sánh trực quan hai trạng thái trên khung trang bị tướng: (Trái) Bộ trang bị bị kẹt 1 món Tím hoặc lệch cấp độ (+27 và +19) làm tối đèn Enhancement Master vs (Phải) Bộ 4 món Vàng đồng bộ +10 / +20 kích hoạt khung sáng thưởng chỉ số ẩn (+5,900 ATK & +74,000 HP ngay ở mốc Vàng +10).",
            en: "Visual comparison of two hero equipment states: (Left) A set bottlenecked by 1 Epic piece or uneven levels (+27 and +19) leaving the Enhancement Master icon dimmed vs (Right) A synchronized 4-piece Golden +10 / +20 set lighting up the hidden stat bonus (+5,900 ATK & +74,000 HP at Golden +10).",
          },
          annotations: [
            {
              kind: "dont",
              label: {
                vi: "Trái: Kẹt 1 món Tím hoặc đập lệch cấp (+27 và +19) — Mất trắng mốc cộng hưởng mới",
                en: "Left: 1 Epic Piece or Uneven Levels (+27 & +19) — Forfeits Higher Resonance Tier",
              },
              detail: {
                vi: "Nếu mặc 3 món Vàng +10 kèm 1 chiếc Mũ Tím +10, hệ thống chỉ tính phẩm chất Tím (mất trắng +5,900 ATK & +74,000 HP của mốc Vàng +10). Nếu đập Kiếm lên +27 nhưng để Mũ, Giáp, Giày ở +19, hệ thống chỉ tính mốc +10.",
                en: "Equipping 3 Golden +10 pieces with 1 Epic +10 Helmet forces the system to evaluate Epic resonance (losing +5,900 ATK & +74,000 HP from Golden +10). Pushing Weapon to +27 while leaving Helmet, Chestplate, and Boots at +19 only grants the +10 bracket.",
              },
            },
            {
              kind: "do",
              label: {
                vi: "Phải: Đồng bộ cả 4 món Vàng chạm mốc chẵn +10 / +20 / +30 / +40",
                en: "Right: Synchronize All 4 Golden Pieces at Exact +10 / +20 / +30 / +40 Brackets",
              },
              detail: {
                vi: "Ngay khoảnh khắc món thứ 4 chạm mốc +10 hoặc +20 cùng phẩm chất Vàng, biểu tượng Bậc Thầy Cường Hóa lập tức phát sáng và cộng vọt hàng chục ngàn điểm ATK và HP.",
                en: "The exact moment your 4th Golden piece reaches +10 or +20, the Enhancement Master emblem lights up and injects tens of thousands of flat ATK and HP.",
              },
            },
            {
              kind: "info",
              label: {
                vi: "Độc lập với Dấu Hệ (Faction-Agnostic Resonance): Không bắt buộc 4 món cùng Phe",
                en: "Faction-Agnostic Resonance: Does Not Require Matching Faction Marks",
              },
              detail: {
                vi: "Khác với dòng thưởng +30% Dấu Hệ, Bậc Thầy Cường Hóa chỉ xét Độ hiếm (Màu sắc) và Cấp độ chẵn 10, hoàn toàn không bắt buộc 4 món phải cùng một phe phái.",
                en: "Unlike the +30% Faction Mark bonus, Enhancement Master only checks Rarity (Color) and multiples of 10, without requiring all 4 pieces to share the same faction emblem.",
              },
            },
          ],
        },
      ],
      subSections: [
        {
          id: "sub-1-1-two-invariant-resonance-laws",
          title: {
            vi: "1.1. Hai Quy Luật Bất Biến Của Bậc Thầy Cường Hóa (Enhancement Master)",
            en: "1.1. Two Invariant Laws of Enhancement Master Resonance",
          },
          badge: {
            vi: "Quy luật Cộng hưởng",
            en: "Resonance Laws",
          },
          blocks: [
            {
              type: "list",
              ordered: true,
              items: [
                {
                  vi: "**Quy luật Mắt Xích Yếu Nhất:** Cả `4` món phải cùng phẩm chất và đạt mốc chẵn `+10`/`+20`/`+30`/`+40` (kẹt 1 món Tím hoặc để `+27` kèm 3 món `+19` sẽ mất mốc cộng hưởng mới).",
                  en: "**Lowest-Piece Bottleneck Law:** All `4` pieces must share the same rarity and hit `+10`/`+20`/`+30`/`+40` (1 Epic piece or a `+27` piece with three `+19` pieces forfeits the higher tier).",
                },
                {
                  vi: "**Quy luật Độc lập Phe Phái:** Bậc Thầy Cường Hóa chỉ xét Độ hiếm (Màu sắc) và Cấp độ chẵn `10`, không bắt buộc `4` món phải cùng chung Dấu Hệ.",
                  en: "**Faction-Agnostic Resonance Law:** Enhancement Master only evaluates Rarity (Color) and multiples of `10`—it never requires the `4` items to share a Faction Mark.",
                },
              ],
            },
            {
              type: "callout",
              variant: "rule",
              title: {
                vi: "Quy tắc Vàng: Cấp độ thấp nhất & Phẩm chất thấp nhất quyết định 100% mốc cộng hưởng",
                en: "Golden Rule: Lowest Rarity & Lowest Level Dictate 100% of Resonance",
              },
              content: {
                vi: "Mọi điểm Quặng đổ vào 1 món lẻ vượt quá bậc của 3 món còn lại (như Kiếm `+25` khi 3 món kia ở `+12`) đều bị treo cộng hưởng cho đến khi cả 4 món chạm bội số của `10` (`+10`/`+20`/`+30`/`+40`).",
                en: "Every Upgrade Rune spent pushing a lone piece past the bracket of the other 3 slots (such as `+25` Weapon with `+12` armor) yields zero new resonance until all 4 slots hit `+10`/`+20`/`+30`/`+40`.",
              },
            },
          ],
        },
        {
          id: "sub-1-2-role-based-slot-priority",
          title: {
            vi: "1.2. Thứ Tự Nâng Cấp Từng Món Trong Cùng Một Bậc Theo Vai Trò (Role-Based Slot Priority)",
            en: "1.2. Role-Based Slot Upgrade Priority Within Each Enhancement Bracket",
          },
          badge: {
            vi: "Kiếm/Giày vs Mũ/Giáp",
            en: "Weapon/Boots vs Helmet/Chest",
          },
          blocks: [
            {
              type: "paragraph",
              text: {
                vi: "Do mỗi lần bước sang bậc mới (từ `+10` lên `+20`, hoặc `+20` lên `+30`) cần tích lũy Quặng trong nhiều ngày, hãy tuân thủ thứ tự ưu tiên theo nhóm chỉ số vai trò:",
                en: "Because advancing to the next bracket (`+10` to `+20`, or `+20` to `+30`) takes days of saving Upgrade Runes, strictly follow role-based stat priority:",
              },
            },
            {
              type: "list",
              ordered: false,
              items: [
                {
                  vi: "**Tướng Sát Thương (DPS) & Healer Theo ATK:** Bước 1 ưu tiên đập **Kiếm (Weapon) + Giày (Boots)** lên mốc mục tiêu trước để lấy Flat ATK; Bước 2 kéo **Mũ + Giáp** đuổi theo chốt mốc 4 món.",
                  en: "**Damage Dealers (DPS) & ATK-Scaling Healers:** Step 1 upgrade **Weapon + Boots** to the target milestone first for flat ATK; Step 2 pull **Helmet + Chestplate** up afterward for 4-piece resonance.",
                },
                {
                  vi: "**Tướng Đỡ Đòn (Tanker) & Hỗ Trợ Thuần:** Bước 1 làm ngược lại — ưu tiên đập **Mũ (Helmet) + Áo Giáp (Chestplate)** trước để tối đa hóa HP tuyến đầu; Bước 2 mới kéo **Kiếm + Giày** đuổi theo.",
                  en: "**Frontline Tanks, HP-Shielders & Pure Supports:** Step 1 do the opposite—upgrade **Helmet + Chestplate** first to maximize frontline HP; Step 2 bring **Weapon + Boots** up afterward.",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "sec-2-lv0-to-lv40-cost-and-staircase-roadmap",
      title: {
        vi: "2. Chiến thuật Tối ưu cho F2P & Low-Spender: Bảng Chi Phí Cường Hóa (Lv.0 ➔ +40) & Lộ Trình Bậc Thang Đội 1",
        en: "2. F2P & Low-Spender Strategy: Complete Lv.0 ➔ +40 Enhancement Cost Table & Queue 1 Staircase Roadmap",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "• **Quy luật chi phí**: Chi phí Quặng Cường Hóa (Upgrade Runes) và Ruby tăng theo cấp số cộng ở mỗi bậc `10` cấp độ; từ `Lv.0` lên `Lv.40` cho 1 món Đồ Vàng tốn 195,000 Quặng và 936,000 Ruby.\n• **Tổng cầu Đội 1**: Tương đương 780,000 Quặng + 3,744,000 Ruby cho 1 tướng 4 món, và 4,680,000 Quặng + 22,464,000 Ruby cho trọn bộ `24` món Đội 1.",
            en: "• **Progressive Scaling**: Upgrade Rune and Ruby costs scale across each `10`-level bracket; enhancing 1 Golden Gear piece from `Lv.0` to `Lv.40` requires 195,000 Upgrade Runes and 936,000 Rubies.\n• **Queue 1 Total**: Equals 780,000 Runes + 3,744,000 Rubies per hero's 4-piece set, and 4,680,000 Runes + 22,464,000 Rubies across all `24` pieces in Queue 1.",
          },
        },
        {
          type: "media_spotlight",
          mediaCode: "MED-5.3-01",
          tier: "tier2_annotated_ui",
          title: {
            vi: "Bộ Huy Hiệu Bậc Thầy Cường Hóa & Nguyên Liệu Đột Phá Đá Vàng / Đá Đỏ 5 Sao",
            en: "Enhancement Master Badge & Legendary / 5-Star Mythic Promotion Stone Assets",
          },
          description: {
            vi: "Nhận diện chuẩn bộ 3 tài nguyên cốt lõi của lộ trình Cường hóa và Đột phá Sao: Huy hiệu Bậc Thầy Cường Hóa (/images/guides/gear/enhancement-master-badge.webp), Đá Thăng Cấp Huyền Thoại (/images/guides/gear/legendary-promotion-stone.webp — Đá Vàng dùng cho 1★–4★) và Đá Thăng Cấp Thần Thoại (/images/guides/gear/mythic-promotion-stone.webp — Đá Đỏ dùng cho 5★ Mythic).",
            en: "Visual identification of the 3 core progression assets: Enhancement Master Badge (/images/guides/gear/enhancement-master-badge.webp), Legendary Promotion Stone (/images/guides/gear/legendary-promotion-stone.webp — Golden Stone for 1★–4★), and Mythic Promotion Stone (/images/guides/gear/mythic-promotion-stone.webp — Red Stone for 5★ Mythic evolution).",
          },
          annotations: [
            {
              kind: "do",
              label: {
                vi: "Huy Hiệu Bậc Thầy Cường Hóa (+10 / +20 / +30 / +40): Cộng hưởng 0 điểm sự kiện — Đập ngay khi đủ mốc!",
                en: "Enhancement Master Badge (+10 / +20 / +30 / +40): 0 Event Points — Upgrade Immediately at Brackets!",
              },
              detail: {
                vi: "Đập Quặng Cường Hóa từ Lv.0 đến Lv.40 không cộng điểm trong Arms Race / KvK, vì vậy hãy nâng ngay khi tích đủ mốc +10 (21,000 Quặng/món) hoặc +20 (60,000 Quặng tích lũy/món) để tăng lực chiến vượt ải.",
                en: "Spending Upgrade Runes from Lv.0 to Lv.40 grants 0 points in Arms Race / KvK, so upgrade immediately whenever you can complete a +10 (21,000 Runes/piece) or +20 (60,000 cumulative Runes/piece) bracket.",
              },
            },
            {
              kind: "do",
              label: {
                vi: "Đá Thăng Cấp Huyền Thoại (Legendary Promotion Stones — Đá Vàng): Cần 50 viên/món từ 1★ ➔ 4★",
                en: "Legendary Promotion Stones (Golden Stones): 50 Stones/Piece Required Across 1★ ➔ 4★",
              },
              detail: {
                vi: "Mỗi món Đồ Vàng sau khi đạt Lv.40 cần 5 + 10 + 15 + 20 = 50 Đá Vàng ở các nấc đột phá 5/5 từ 1★ đến 4★ (tổng 200 Đá Vàng/tướng = 1,200 Đá Vàng cho 24 món Đội 1). Hãy mua vét Đá Vàng giảm giá trong Tiệm VIP/Sự kiện từ sớm.",
                en: "Each Lv.40 Golden piece requires 5 + 10 + 15 + 20 = 50 Legendary Promotion Stones across the 5/5 breakthrough steps of 1★ to 4★ (200 Stones/hero = 1,200 Stones for Queue 1's 24 pieces). Buy discounted stones early in VIP/Event shops.",
              },
            },
            {
              kind: "info",
              label: {
                vi: "Đá Thăng Cấp Thần Thoại (Mythic Promotion Stones / Titan Marks / Dragon Blood — Đá Đỏ): 10 viên/món lên 5★ Đỏ",
                en: "Mythic Promotion Stones (Titan Marks / Dragon Blood — Red Stones): 10 Stones/Piece for 5★ Mythic",
              },
              detail: {
                vi: "Ở nấc cuối 5/5 của bậc 5 Sao, bạn cần 10 Đá Đỏ (kèm 1,650 Thỏi Vàng + 137,500 Quặng + 6,600,000 Ruby trong bậc 5★) để tiến hóa món đồ thành Trang bị Đỏ Thần Thoại 5 Sao (tổng 40 Đá Đỏ/tướng = 240 Đá Đỏ cho 24 món Đội 1).",
                en: "At step 5/5 of the 5-Star tier, 10 Mythic Promotion Stones (alongside 1,650 Gold Ingots + 137,500 Runes + 6,600,000 Rubies across 5★) evolve the item into 5-Star Red Mythic Gear (40 Mythic Stones/hero = 240 Mythic Stones for 24 pieces).",
              },
            },
          ],
        },
      ],
      subSections: [
        {
          id: "sub-2-1-lv0-to-lv40-enhancement-cost-table",
          title: {
            vi: "2.1. Bảng Chi Phí Cường Hóa Trang Bị Vàng (Lv.0 ➔ Lv.40) & Lộ Trình Bậc Thang Đội 1 (24 Món)",
            en: "2.1. Golden Gear Enhancement Cost Table (Lv.0 ➔ Lv.40) & Queue 1 Staircase Allocation (24 Pieces)",
          },
          badge: {
            vi: "4,680,000 Quặng / 24 Món",
            en: "4,680,000 Runes / 24 Pieces",
          },
          blocks: [
            {
              type: "table",
              caption: {
                vi: "Bảng 2.1 — Chi Phí Cường Hóa Trang Bị Vàng (Lv.0 ➔ Lv.40) & Chiến Lược Phân Bổ Đội 1 (6 Tướng = 24 Món)",
                en: "Table 2.1 — Golden Gear Enhancement Costs (Lv.0 ➔ Lv.40) & Queue 1 Staircase Allocation (6 Heroes = 24 Pieces)",
              },
              headers: [
                {
                  vi: "Giai Đoạn Cấp Độ",
                  en: "Enhancement Bracket",
                },
                {
                  vi: "Chi Phí Trong Bậc (1 Món)",
                  en: "Bracket Cost (Per Piece)",
                },
                {
                  vi: "Tổng Tích Lũy (1 Món Từ Lv.0)",
                  en: "Cumulative Total (1 Piece From Lv.0)",
                },
                {
                  vi: "Tổng Chi Phí 1 Bộ 4 Món (1 Tướng)",
                  en: "4-Piece Set Cost (Per Hero)",
                },
                {
                  vi: "Lộ Trình Phân Bổ Chuẩn Cho Đội 1 (6 Tướng = 24 Món)",
                  en: "Optimal Queue 1 Staircase Roadmap (6 Heroes = 24 Pieces)",
                },
              ],
              rows: [
                [
                  {
                    vi: "Giai đoạn 1: Lv.0 ➔ +10 (Mốc Cộng Hưởng 1: +5,900 ATK & +74,000 HP)",
                    en: "Stage 1: Lv.0 ➔ +10 (Resonance Tier 1: +5,900 ATK & +74,000 HP)",
                  },
                  {
                    vi: "21,000 Quặng + 100,800 Ruby (1,500 ➔ 3,000 Quặng/cấp)",
                    en: "21,000 Runes + 100,800 Rubies (1,500 ➔ 3,000 Runes/lvl)",
                  },
                  {
                    vi: "21,000 Quặng + 100,800 Ruby",
                    en: "21,000 Runes + 100,800 Rubies",
                  },
                  {
                    vi: "84,000 Quặng + 403,200 Ruby",
                    en: "84,000 Runes + 403,200 Rubies",
                  },
                  {
                    vi: "Ưu tiên số 1 toàn đội: Đẩy đồng loạt cả 24 món của 6 tướng Đội 1 lên Full +10 (Tổng tốn 504,000 Quặng & 2.42M Ruby) trước khi nâng bất kỳ món nào lên +11.",
                    en: "#1 Team-Wide Priority: Push all 24 pieces across Queue 1's 6 heroes to Full +10 (Total: 504,000 Runes & 2.42M Rubies) before upgrading any single item to +11.",
                  },
                ],
                [
                  {
                    vi: "Giai đoạn 2: Lv.11 ➔ +20 (Mốc Cộng Hưởng 2)",
                    en: "Stage 2: Lv.11 ➔ +20 (Resonance Tier 2)",
                  },
                  {
                    vi: "39,000 Quặng + 187,200 Ruby (3,000 ➔ 4,500 Quặng/cấp; 156,000 Quặng/4 món)",
                    en: "39,000 Runes + 187,200 Rubies (3,000 ➔ 4,500 Runes/lvl; 156,000 Runes/4 pcs)",
                  },
                  {
                    vi: "60,000 Quặng + 288,000 Ruby",
                    en: "60,000 Runes + 288,000 Rubies",
                  },
                  {
                    vi: "240,000 Quặng + 1,152,000 Ruby (1,440,000 Quặng/24 món)",
                    en: "240,000 Runes + 1,152,000 Rubies (1,440,000 Runes/24 pcs)",
                  },
                  {
                    vi: "Sau khi cả đội đã Full +10, dồn Quặng đẩy bộ 4 món của Carry số 1 (Paragon/Pyromancer, Wukong/Storm Maiden, hoặc Tidecaller/Ne Zha) lên Full +20, tiếp theo là Main Tank số 1 lên Full +20, rồi mới kéo 4 tướng còn lại lên +20.",
                    en: "Once all 6 heroes are Full +10, funnel Runes to bring Carry #1's 4 pieces (Paragon/Pyromancer, Wukong/Storm Maiden, or Tidecaller/Ne Zha) to Full +20, followed by Main Tank #1 to Full +20, then pull the remaining 4 heroes to +20.",
                  },
                ],
                [
                  {
                    vi: "Giai đoạn 3: Lv.21 ➔ +30 (Mốc Cộng Hưởng 3)",
                    en: "Stage 3: Lv.21 ➔ +30 (Resonance Tier 3)",
                  },
                  {
                    vi: "58,500 Quặng + 280,800 Ruby (5,250 ➔ 6,750 Quặng/cấp; 234,000 Quặng/4 món)",
                    en: "58,500 Runes + 280,800 Rubies (5,250 ➔ 6,750 Runes/lvl; 234,000 Runes/4 pcs)",
                  },
                  {
                    vi: "118,500 Quặng + 568,800 Ruby",
                    en: "118,500 Runes + 568,800 Rubies",
                  },
                  {
                    vi: "474,000 Quặng + 2,275,200 Ruby (2,844,000 Quặng/24 món)",
                    en: "474,000 Runes + 2,275,200 Rubies (2,844,000 Runes/24 pcs)",
                  },
                  {
                    vi: "Khi cả 6 tướng Đội 1 đã chạm Full +20, tiếp tục đẩy bộ 4 món của Carry số 1 và Main Tank số 1 lên Full +30 (tốn 234,000 Quặng/tướng từ +20 ➔ +30), sau đó nâng dần Sub-DPS và Healer.",
                    en: "When all 6 Queue 1 heroes reach Full +20, push Carry #1 and Main Tank #1 to Full +30 (costing 234,000 Runes/hero from +20 ➔ +30), then gradually bring up your Sub-DPS and Healer.",
                  },
                ],
                [
                  {
                    vi: "Giai đoạn 4: Lv.31 ➔ +40 (Chạm Trần Mở Đột Phá Sao)",
                    en: "Stage 4: Lv.31 ➔ +40 (Level Cap Unlocking Star Promotion)",
                  },
                  {
                    vi: "76,500 Quặng + 367,200 Ruby (6,750 ➔ 8,250 Quặng/cấp; 306,000 Quặng/4 món)",
                    en: "76,500 Runes + 367,200 Rubies (6,750 ➔ 8,250 Runes/lvl; 306,000 Runes/4 pcs)",
                  },
                  {
                    vi: "195,000 Quặng + 936,000 Ruby",
                    en: "195,000 Runes + 936,000 Rubies",
                  },
                  {
                    vi: "780,000 Quặng + 3,744,000 Ruby",
                    en: "780,000 Runes + 3,744,000 Rubies",
                  },
                  {
                    vi: "Tổng cầu 24 món Đội 1 chạm Full +40: 4,680,000 Quặng + 22,464,000 Ruby. Đưa từng món chủ lực của Carry và Tanker chạm mốc +40 để mở khóa tính năng Thăng Cấp Sao (Gear Star Promotion 1★ ➔ 5★ Đỏ).",
                    en: "Total Queue 1 (24 pieces) Full +40 cost: 4,680,000 Runes + 22,464,000 Rubies. Bring core Carry and Tank pieces to +40 to unlock Gear Star Promotion (1★ ➔ 5★ Mythic).",
                  },
                ],
              ],
            },
            {
              type: "roadmap",
              steps: [
                {
                  badge: {
                    vi: "Bậc 1: Full +10 (24 Món)",
                    en: "Step 1: Full +10 (24 Pcs)",
                  },
                  title: {
                    vi: "Đồng Bộ 24 Món Đội 1 Lên +10 (504,000 Quặng + 2.42M Ruby)",
                    en: "Synchronize All 24 Queue 1 Pieces to +10 (504,000 Runes + 2.42M Rubies)",
                  },
                  timing: {
                    vi: "Ưu tiên số 1",
                    en: "Priority #1",
                  },
                  description: {
                    vi: "Tốn 21,000 Quặng + 100,800 Ruby/món (84,000 Quặng/tướng). Mở khóa ngay +5,900 ATK & +74,000 HP trên mỗi vị tướng Đội 1 trước khi bất kỳ món nào lên +11.",
                    en: "Costs 21,000 Runes + 100,800 Rubies/piece (84,000 Runes/hero). Unlocks +5,900 ATK & +74,000 HP on every Queue 1 hero before any piece touches +11.",
                  },
                },
                {
                  badge: {
                    vi: "Bậc 2: Carry & Tank +20",
                    en: "Step 2: Carry & Tank +20",
                  },
                  title: {
                    vi: "Đẩy Carry #1 (Kiếm + Giày Trước) & Main Tank #1 (Mũ + Giáp Trước) Lên +20",
                    en: "Push Carry #1 (Weapon + Boots First) & Main Tank #1 (Helmet + Chest First) to +20",
                  },
                  timing: {
                    vi: "+156,000 Quặng / Tướng",
                    en: "+156,000 Runes / Hero",
                  },
                  description: {
                    vi: "Từ `+10` lên `+20` tốn thêm 39,000 Quặng + 187,200 Ruby/món (tích lũy 60,000 Quặng/món = 240,000 Quặng/tướng). Kéo lần lượt Carry #1 ➔ Tank #1 ➔ 4 tướng còn lại chạm Full `+20`.",
                    en: "From `+10` to `+20` adds 39,000 Runes + 187,200 Rubies/piece (cumulative 60,000 Runes/piece = 240,000 Runes/hero). Advance Carry #1 ➔ Tank #1 ➔ remaining 4 heroes to Full `+20`.",
                  },
                },
                {
                  badge: {
                    vi: "Bậc 3: Cộng Hưởng +30",
                    en: "Step 3: +30 Resonance",
                  },
                  title: {
                    vi: "Đưa Bộ Khung Trụ Cột Chạm Chuẩn Bậc Thầy Cường Hóa +30",
                    en: "Bring Core Pillars to Synchronized +30 Enhancement Master",
                  },
                  timing: {
                    vi: "+234,000 Quặng / Tướng",
                    en: "+234,000 Runes / Hero",
                  },
                  description: {
                    vi: "Mỗi món từ +20 lên +30 tốn thêm 58,500 Quặng + 280,800 Ruby (tích lũy 118,500 Quặng + 568,800 Ruby/món = 474,000 Quặng + 2,275,200 Ruby/tướng).",
                    en: "Each piece from +20 to +30 adds 58,500 Runes + 280,800 Rubies (cumulative 118,500 Runes + 568,800 Rubies/piece = 474,000 Runes + 2,275,200 Rubies/hero).",
                  },
                },
                {
                  badge: {
                    vi: "Bậc 4: Chạm Trần +40",
                    en: "Step 4: +40 Cap & Stars",
                  },
                  title: {
                    vi: "Chạm Trần Lv.40 (195,000 Quặng/Món) & Mở Khóa Đột Phá Sao (1★ ➔ 5★ Đỏ)",
                    en: "Hit Lv.40 Cap (195,000 Runes/Piece) & Unlock Star Promotion (1★ ➔ 5★ Mythic)",
                  },
                  timing: {
                    vi: "780,000 Quặng / Tướng",
                    en: "780,000 Runes / Hero",
                  },
                  description: {
                    vi: "Từ `+30` lên `+40` tốn thêm 76,500 Quặng/món (tích lũy 195,000 Quặng + 936,000 Ruby/món = 4,680,000 Quặng + 22,464,000 Ruby/24 món), mở khóa Đột phá Sao bằng Thỏi Vàng và Đá Thăng Cấp.",
                    en: "From `+30` to `+40` adds 76,500 Runes/piece (cumulative 195,000 Runes + 936,000 Rubies/piece = 4,680,000 Runes + 22,464,000 Rubies/24 pieces), unlocking Star Promotion via Ingots and Stones.",
                  },
                },
              ],
            },
          ],
        },
        {
          id: "sub-2-2-enhancement-discipline-checklist",
          title: {
            vi: "2.2. Danh Sách Kiểm Tra Kỷ Luật Cường Hóa & Tích Lũy Đột Phá (Actionable Checklist)",
            en: "2.2. Enhancement Resonance & Promotion Preparation Checklist",
          },
          badge: {
            vi: "Checklist Kỷ luật",
            en: "Discipline Audit",
          },
          blocks: [
            {
              type: "checklist",
              checklistId: "enhancement-resonance-audit-v2",
              title: {
                vi: "Bảng Kiểm Toán Cộng Hưởng Cường Hóa & Vũ Khí Độc Quyền Đội 1",
                en: "Queue 1 Enhancement Resonance & Exclusive Weapon Audit Checklist",
              },
              description: {
                vi: "Đánh dấu xác nhận 4 nguyên tắc sống còn trước mỗi đợt đập Quặng Cường Hóa và xả Mảnh Vũ Khí Độc Quyền:",
                en: "Verify all 4 mandatory rules before spending Upgrade Runes or Universal Exclusive Weapon Shards:",
              },
              items: [
                {
                  id: "chk-53-max-one-bracket-gap",
                  label: {
                    vi: "Kiểm tra độ lệch cấp độ trong Đội 1 không vượt quá 1 bậc cộng hưởng (+10)",
                    en: "Ensure no Queue 1 hero has an enhancement gap exceeding 1 resonance bracket (+10)",
                  },
                  detail: {
                    vi: "Đảm bảo cả 24 món Đội 1 đạt Full +10 (504,000 Quặng) trước khi lên +20; tuyệt đối không để Carry lên +30 khi Healer/Support còn ở +0 hoặc +10.",
                    en: "Bring all 24 Queue 1 pieces to Full +10 (504,000 Runes) before pushing +20; never push Carry to +30 while your Healer/Support sits at +0 or +10.",
                  },
                  badge: {
                    vi: "Đồng bộ Đội 1",
                    en: "Queue 1 Sync",
                  },
                },
                {
                  id: "chk-53-pair-and-quad-batching",
                  label: {
                    vi: "Nâng cấp dứt điểm theo cặp 2 món (Kiếm+Giày / Mũ+Giáp) hoặc cụm 4 món",
                    en: "Upgrade decisively in 2-piece role pairs (Weapon+Boots / Helmet+Chest) or 4-piece brackets",
                  },
                  detail: {
                    vi: "Tích đủ 39,000 Quặng/món (156,000 Quặng cho 4 món từ +10 ➔ +20) hoặc 58,500 Quặng/món (234,000 Quặng cho 4 món từ +20 ➔ +30) để bấm chạm mốc cộng hưởng ngay lập tức.",
                    en: "Save 39,000 Runes/piece (156,000 Runes for 4 pieces from +10 ➔ +20) or 58,500 Runes/piece (234,000 Runes for 4 pieces from +20 ➔ +30) to hit resonance breakpoints cleanly.",
                  },
                  badge: {
                    vi: "Chạm mốc +10",
                    en: "Hit Multiples of 10",
                  },
                },
                {
                  id: "chk-53-stockpile-promotion-stones",
                  label: {
                    vi: "Mua vét Đá Thăng Cấp Huyền Thoại (Đá Vàng) giảm giá & giữ chặt Thỏi Vàng cho Lv.40+",
                    en: "Buy discounted Legendary Promotion Stones early & hoard Gold Ingots for Lv.40+",
                  },
                  detail: {
                    vi: "Mỗi món Đồ Đỏ 5★ ngốn 6,000 Thỏi Vàng + 50 Đá Vàng + 10 Đá Đỏ (144,000 Thỏi Vàng cho 24 món Đội 1) — chỉ xả Đá Thăng Cấp vào đúng ngày sự kiện tính điểm.",
                    en: "Each 5★ Mythic piece requires 6,000 Gold Ingots + 50 Legendary Stones + 10 Mythic Stones (144,000 Ingots for Queue 1) — only spend Promotion Stones during event scoring windows.",
                  },
                  badge: {
                    vi: "6,000 Thỏi Vàng/Món",
                    en: "6,000 Ingots/Piece",
                  },
                },
                {
                  id: "chk-53-uw-lv10-breakpoint-lock",
                  label: {
                    vi: "Khóa mục tiêu Vũ khí Độc quyền ở Điểm gãy Vàng Lv.10 (275 Mảnh) vào Thứ Năm Tuần B (GAR Ngày 4)",
                    en: "Lock Exclusive Weapon upgrades to the Lv.10 Golden Breakpoint (275 Shards) on Thursday Week B (GAR Day 4)",
                  },
                  detail: {
                    vi: "Mở khóa Lv.1 (5 mảnh) cho 6 tướng Đội 1, dừng Support ở Lv.5 (75 mảnh), và ưu tiên đẩy cặp Carry + Tank chủ lực chạm Lv.10 (275 mảnh) trước khi nghĩ tới Lv.15 (605 mảnh) hay Lv.20 (1,185 mảnh).",
                    en: "Unlock Lv.1 (5 shards) for all 6 Queue 1 heroes, park Supports at Lv.5 (75 shards), and bring core Carries + Tanks to Lv.10 (275 shards) before pushing Lv.15 (605 shards) or Lv.20 (1,185 shards).",
                  },
                  badge: {
                    vi: "Lv.10 = 275 Mảnh",
                    en: "Lv.10 = 275 Shards",
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "sec-3-enhancement-and-uw-pitfalls",
      title: {
        vi: "3. Những Cạm bẫy Phổ biến & Cách Phòng tránh (Common Pitfalls)",
        en: "3. Common Enhancement, Mythic Evolution & Exclusive Weapon Pitfalls",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "Dưới đây là `3` sai lầm nghiêm trọng nhất khiến người chơi F2P và Low-Spender lãng phí hàng trăm ngàn Quặng Cường Hóa, Thỏi Vàng và Mảnh Vũ Khí Độc Quyền:",
            en: "Below are the `3` most destructive mistakes that cause F2P and Low-Spender players to burn hundreds of thousands of Upgrade Runes, Gold Ingots, and Exclusive Weapon Shards:",
          },
        },
        {
          type: "list",
          ordered: true,
          items: [
            {
              vi: "**Sai lầm #1 — Đập Kiếm lẻ lên `+35` khi Mũ/Giáp ở `+15`:** Tốn `95,250` Quặng mà không mở mốc cộng hưởng nào; dùng đúng số Quặng đó kéo 3 món kia lên `+20` sẽ kích hoạt ngay Bậc Thầy Cường Hóa `+20`.",
              en: "**Pitfall #1 — Pushing a lone Weapon to `+35` with `+15` armor:** Burns `95,250` Runes for zero new resonance; spending those Runes to pull the other 3 slots to `+20` immediately unlocks Enhancement Master `+20`.",
            },
            {
              vi: "**Sai lầm #2 — Chờ đúc trực tiếp Đồ Đỏ trong Lò Rèn:** Bạn **KHÔNG THỂ** đúc trực tiếp Đồ Đỏ; mọi món Đồ Đỏ `5★` đều tiến hóa từ Đồ Vàng có Dấu Hệ đã đập `Lv.40` (tốn 6,000 Thỏi Vàng/món qua `1★➔5★`).",
              en: "**Pitfall #2 — Waiting to craft Red Mythic Gear directly in the Blacksmith:** You **CANNOT** forge Red Gear directly; every `5★` Mythic piece evolves from a `Lv.40` Faction-marked Golden piece (6,000 Gold Ingots).",
            },
            {
              vi: "**Sai lầm #3 — Mở Rương Vũ Khí Tự Chọn cho tướng quá độ:** Tướng Tím (như Brawler) không có Vũ khí Độc quyền; khóa chặt rương tự chọn cho trụ cột Endgame (Wukong, Storm Maiden, Paragon, Tidecaller).",
              en: "**Pitfall #3 — Spending Weapon Choice Chests on transitional heroes:** Epic heroes (like Brawler) have no Exclusive Weapon; lock choice chests for Endgame pillars (Wukong, Storm Maiden, Paragon, Tidecaller).",
            },
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: {
            vi: "Cảnh Báo Đốt Mảnh Vũ Khí: Tuyệt đối không đẩy 1 tướng lẻ lên Lv.18–Lv.19 khi Đội 1 chưa đủ Lv.10!",
            en: "Shard Burn Warning: Never Push a Single Hero to Lv.18–Lv.19 Before Core Queue 1 Reaches Lv.10!",
          },
          content: {
            vi: "• **Chi phí bậc cao**: Nâng 1 Vũ khí Độc quyền từ `Lv.10` (275 Mảnh) lên `Lv.20` (1,185 Mảnh) ngốn thêm tới `910` mảnh.\n• **Bài toán cơ hội**: Số mảnh đó đủ đập hơn `3` tướng trụ cột khác từ `Lv.0` lên thẳng Điểm gãy Vàng `Lv.10` (`275 × 3 = 825` mảnh)!",
            en: "• **Steep Upper Cost**: Pushing a single Exclusive Weapon from `Lv.10` (275 Shards) to `Lv.20` (1,185 Shards) consumes an extra `910` shards.\n• **Opportunity Cost**: Those shards can bring more than `3` other core heroes from `Lv.0` straight to the `Lv.10` Golden Breakpoint (`275 × 3 = 825` shards)!",
          },
        },
      ],
    },
  ],
  proSections: [
    {
      id: "sec-4-mythic-star-promotion-and-uw-tables",
      isPro: true,
      title: {
        vi: "4. Phân tích Định lượng & Điểm gãy: Đột Phá Đồ Đỏ 5 Sao (Mythic Gear) & Vũ Khí Độc Quyền (Lv.1 ➔ Lv.20 & 1★ ➔ 5★)",
        en: "4. Quantitative Analysis: 5-Star Mythic Gear Promotion (6,000 Gold Ingots) & Exclusive Weapon Tables (1,185 Shards & 920 Meteoric Iron Cores)",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "• **Mở khóa Đột phá Sao**: Ngay khi Trang bị Vàng chạm `Lv.40` (195,000 Quặng + 936,000 Ruby), giao diện nâng cấp mở khóa tab **Thăng Cấp Sao (Star Promotion)** gồm 5 Cấp Sao (`1★` ➔ `5★`).\n• **Cấu trúc 5 nấc nhỏ**: 4 nấc đầu (`1/5➔4/5`) tốn Thỏi Vàng + Quặng + Ruby; nấc thứ 5 (`5/5` — Đột phá Sao) tốn Thỏi Vàng + Quặng + **Đá Vàng** (`1★–4★`) hoặc **Đá Đỏ** (`5★`, miễn Ruby ở nấc `5/5`).",
            en: "• **Unlocking Star Promotion**: When a Golden Gear piece hits `Lv.40` (195,000 Runes + 936,000 Rubies), the upgrade UI unlocks the **Star Promotion** tab spanning 5 Star Tiers (`1★` ➔ `5★`).\n• **5 Sub-Step Structure**: The first 4 sub-steps (`1/5➔4/5`) consume Gold Ingots + Runes + Rubies, while step `5/5` consumes Ingots + Runes + **Legendary Stones** (`1★–4★`) or **Mythic Stones** (`5★`, 0 Ruby cost).",
          },
        },
      ],
      subSections: [
        {
          id: "sub-4-1-mythic-gear-star-promotion-table",
          title: {
            vi: "4.1. Bảng Chi Phí Đột Phá Sao Trang Bị (Gear Star Promotion: Lv.40 ➔ 1★ ➔ 5★ Mythic)",
            en: "4.1. Complete Gear Star Promotion Cost Table (Lv.40 ➔ 1★ ➔ 5★ Mythic)",
          },
          badge: {
            vi: "6,000 Thỏi Vàng / Món",
            en: "6,000 Gold Ingots / Piece",
          },
          blocks: [
            {
              type: "table",
              caption: {
                vi: "Bảng 4.1 — Chi Phí Đột Phá Sao Trang Bị Từ Lv.40 Lên 5★ Đỏ Thần Thoại (Trích xuất chính xác 100% từ TopHeroes Tables — Tab Gear)",
                en: "Table 4.1 — Gear Star Promotion Costs From Lv.40 to 5★ Mythic (100% Exact Data from TopHeroes Tables — Tab Gear)",
              },
              headers: [
                {
                  vi: "Cấp Sao Đột Phá (Sau Lv.40)",
                  en: "Star Promotion Tier (Post-Lv.40)",
                },
                {
                  vi: "Chi Phí Mỗi Nấc Nhỏ (1/5 ➔ 4/5)",
                  en: "Cost Per Sub-Step (1/5 ➔ 4/5)",
                },
                {
                  vi: "Chi Phí Nấc Đột Phá Cuối (5/5)",
                  en: "Final Breakthrough Step Cost (5/5)",
                },
                {
                  vi: "Tổng Nguyên Liệu Cần Ở Cấp Sao Này (1 Món)",
                  en: "Total Materials Required For This Star (1 Piece)",
                },
                {
                  vi: "Biến Đổi Phẩm Chất & Hiệu Ứng",
                  en: "Rarity Evolution & Strategic Notes",
                },
              ],
              rows: [
                [
                  {
                    vi: "★ 1 Sao (1-Star)",
                    en: "★ 1-Star (1★)",
                  },
                  {
                    vi: "150 Thỏi Vàng + 12,500 Quặng + 750,000 Ruby (×4 nấc)",
                    en: "150 Gold Ingots + 12,500 Runes + 750,000 Rubies (×4 steps)",
                  },
                  {
                    vi: "150 Thỏi Vàng + 12,500 Quặng + 5 Đá Thăng Cấp Vàng",
                    en: "150 Gold Ingots + 12,500 Runes + 5 Legendary Promotion Stones",
                  },
                  {
                    vi: "750 Thỏi Vàng + 62,500 Quặng + 3,000,000 Ruby + 5 Đá Vàng",
                    en: "750 Gold Ingots + 62,500 Runes + 3,000,000 Rubies + 5 Legendary Stones",
                  },
                  {
                    vi: "Trang bị Vàng Lv.40 gắn 1 Sao Vàng (mở đầu lộ trình cộng điểm Đá Thăng Cấp).",
                    en: "Lv.40 Golden Gear gains 1 Golden Star (begins Promotion Stone event scoring).",
                  },
                ],
                [
                  {
                    vi: "★★ 2 Sao (2-Star)",
                    en: "★★ 2-Star (2★)",
                  },
                  {
                    vi: "195 Thỏi Vàng + 16,250 Quặng + 975,000 Ruby (×4 nấc)",
                    en: "195 Gold Ingots + 16,250 Runes + 975,000 Rubies (×4 steps)",
                  },
                  {
                    vi: "195 Thỏi Vàng + 16,250 Quặng + 10 Đá Thăng Cấp Vàng",
                    en: "195 Gold Ingots + 16,250 Runes + 10 Legendary Promotion Stones",
                  },
                  {
                    vi: "975 Thỏi Vàng + 81,250 Quặng + 3,900,000 Ruby + 10 Đá Vàng",
                    en: "975 Gold Ingots + 81,250 Runes + 3,900,000 Rubies + 10 Legendary Stones",
                  },
                  {
                    vi: "Trang bị Vàng Lv.40 gắn 2 Sao Vàng (tích lũy 1,725 Thỏi Vàng + 143,750 Quặng + 15 Đá Vàng).",
                    en: "Lv.40 Golden Gear gains 2 Golden Stars (cumulative 1,725 Ingots + 143,750 Runes + 15 Legendary Stones).",
                  },
                ],
                [
                  {
                    vi: "★★★ 3 Sao (3-Star)",
                    en: "★★★ 3-Star (3★)",
                  },
                  {
                    vi: "240 Thỏi Vàng + 20,000 Quặng + 1,200,000 Ruby (×4 nấc)",
                    en: "240 Gold Ingots + 20,000 Runes + 1,200,000 Rubies (×4 steps)",
                  },
                  {
                    vi: "240 Thỏi Vàng + 20,000 Quặng + 15 Đá Thăng Cấp Vàng",
                    en: "240 Gold Ingots + 20,000 Runes + 15 Legendary Promotion Stones",
                  },
                  {
                    vi: "1,200 Thỏi Vàng + 100,000 Quặng + 4,800,000 Ruby + 15 Đá Vàng",
                    en: "1,200 Gold Ingots + 100,000 Runes + 4,800,000 Rubies + 15 Legendary Stones",
                  },
                  {
                    vi: "Trang bị Vàng Lv.40 gắn 3 Sao Vàng (tích lũy 2,925 Thỏi Vàng + 243,750 Quặng + 30 Đá Vàng).",
                    en: "Lv.40 Golden Gear gains 3 Golden Stars (cumulative 2,925 Ingots + 243,750 Runes + 30 Legendary Stones).",
                  },
                ],
                [
                  {
                    vi: "★★★★ 4 Sao (4-Star)",
                    en: "★★★★ 4-Star (4★)",
                  },
                  {
                    vi: "285 Thỏi Vàng + 23,750 Quặng + 1,420,000 Ruby (×4 nấc)",
                    en: "285 Gold Ingots + 23,750 Runes + 1,420,000 Rubies (×4 steps)",
                  },
                  {
                    vi: "285 Thỏi Vàng + 23,750 Quặng + 20 Đá Thăng Cấp Vàng",
                    en: "285 Gold Ingots + 23,750 Runes + 20 Legendary Promotion Stones",
                  },
                  {
                    vi: "1,425 Thỏi Vàng + 118,750 Quặng + 5,680,000 Ruby + 20 Đá Vàng",
                    en: "1,425 Gold Ingots + 118,750 Runes + 5,680,000 Rubies + 20 Legendary Stones",
                  },
                  {
                    vi: "Trang bị Vàng Lv.40 gắn 4 Sao Vàng (hoàn tất 50 Đá Thăng Cấp Vàng/món).",
                    en: "Lv.40 Golden Gear gains 4 Golden Stars (completes all 50 Legendary Promotion Stones/piece).",
                  },
                ],
                [
                  {
                    vi: "★★★★★ 5 Sao (5-Star MYTHIC)",
                    en: "★★★★★ 5-Star (5★ MYTHIC)",
                  },
                  {
                    vi: "330 Thỏi Vàng + 27,500 Quặng + 1,650,000 Ruby (×4 nấc)",
                    en: "330 Gold Ingots + 27,500 Runes + 1,650,000 Rubies (×4 steps)",
                  },
                  {
                    vi: "330 Thỏi Vàng + 27,500 Quặng + 10 Đá Thăng Cấp Đỏ (Mythic)",
                    en: "330 Gold Ingots + 27,500 Runes + 10 Mythic Promotion Stones (Red)",
                  },
                  {
                    vi: "1,650 Thỏi Vàng + 137,500 Quặng + 6,600,000 Ruby + 10 Đá Đỏ",
                    en: "1,650 Gold Ingots + 137,500 Runes + 6,600,000 Rubies + 10 Mythic Stones",
                  },
                  {
                    vi: "TIẾN HÓA THÀNH TRANG BỊ ĐỎ THẦN THOẠI (MYTHIC GEAR 5★)!",
                    en: "EVOLVES INTO 5-STAR RED MYTHIC GEAR (MYTHIC GEAR 5★)!",
                  },
                ],
                [
                  {
                    vi: "TỔNG CỘNG (0★ ➔ 5★ Đỏ / 1 Món)",
                    en: "TOTAL CUMULATIVE (0★ ➔ 5★ Mythic / 1 Piece)",
                  },
                  {
                    vi: "20 nấc thường (1/5 ➔ 4/5 qua 5 cấp Sao)",
                    en: "20 regular sub-steps (1/5 ➔ 4/5 across 5 Stars)",
                  },
                  {
                    vi: "5 nấc đột phá (5/5): 50 Đá Vàng + 10 Đá Đỏ",
                    en: "5 breakthrough steps (5/5): 50 Legendary + 10 Mythic Stones",
                  },
                  {
                    vi: "6,000 Thỏi Vàng + 500,000 Quặng + 23,980,000 Ruby + 50 Đá Vàng + 10 Đá Đỏ",
                    en: "6,000 Gold Ingots + 500,000 Runes + 23,980,000 Rubies + 50 Legendary Stones + 10 Mythic Stones",
                  },
                  {
                    vi: "1 bộ 4 món (1 tướng): 24,000 Thỏi Vàng, 2,000,000 Quặng, 95.92M Ruby, 200 Đá Vàng, 40 Đá Đỏ. Toàn Đội 1 (24 món): 144,000 Thỏi Vàng, 12,000,000 Quặng, 575.52M Ruby, 1,200 Đá Vàng, 240 Đá Đỏ.",
                    en: "1 Hero Set (4 pcs): 24,000 Ingots, 2,000,000 Runes, 95.92M Rubies, 200 Legendary Stones, 40 Mythic Stones. Full Queue 1 (24 pcs): 144,000 Gold Ingots, 12,000,000 Runes, 575.52M Rubies, 1,200 Legendary Stones, 240 Mythic Stones.",
                  },
                ],
              ],
            },
          ],
        },
        {
          id: "sub-4-2-uw-breakpoint-flowchart",
          title: {
            vi: "4.2. Sơ Đồ Lộ Trình Điểm Gãy Vũ Khí Độc Quyền (Lv.1 ➔ Lv.20 = 1,185 Mảnh & 1★ ➔ 5★ = 920 Lõi Sắt Thiên Thạch)",
            en: "4.2. Exclusive Weapon Breakpoint Flowchart (Lv.1 ➔ Lv.20 = 1,185 Shards & 1★ ➔ 5★ = 920 Meteoric Iron Cores)",
          },
          badge: {
            vi: "Điểm gãy Vàng Lv.10",
            en: "Lv.10 Golden Breakpoint",
          },
          blocks: [
            {
              type: "visual_diagram",
              mediaCode: "MED-5.3-03",
              variant: "timeline_phases",
              title: {
                vi: "Sơ Đồ Điểm Gãy Vũ Khí Độc Quyền (UW Lv.1 ➔ Lv.20 = 1,185 Mảnh) & Đột Phá Sao (920 Lõi Sắt Thiên Thạch)",
                en: "Exclusive Weapon ROI Breakpoint Roadmap (UW Lv.1 ➔ Lv.20 = 1,185 Shards) & Star Promotion (920 Meteoric Iron Cores)",
              },
              subtitle: {
                vi: "Chiến lược phân bổ mảnh Vũ khí Độc quyền theo các ngưỡng đột phá kỹ năng Lv.1 / Lv.5 / Lv.10 / Lv.15 / Lv.20",
                en: "Optimal Exclusive Weapon shard allocation across skill breakthrough tiers Lv.1 / Lv.5 / Lv.10 / Lv.15 / Lv.20",
              },
              centerNode: {
                id: "uw-root-node",
                badge: {
                  vi: "Vũ Khí Độc Quyền & Lõi Sắt",
                  en: "Exclusive Weapon & Iron Cores",
                },
                title: {
                  vi: "LỘ TRÌNH ĐIỂM GÃY VŨ KHÍ ĐỘC QUYỀN (1,185 MẢNH) & ĐỘT PHÁ SAO (920 LÕI SẮT THIÊN THẠCH)",
                  en: "EXCLUSIVE WEAPON BREAKPOINT ROADMAP (1,185 SHARDS) & STAR PROMOTION (920 METEORIC IRON CORES)",
                },
                subtitle: {
                  vi: "Ưu tiên tuyệt đối chạm Điểm gãy Vàng Lv.10 (275 Mảnh) cho bộ khung Đội 1 trước khi đẩy Hyper-Carry lên Lv.15 / Lv.20",
                  en: "Strictly prioritize hitting the Lv.10 Golden Breakpoint (275 Shards) across Queue 1 pillars before pushing Hyper-Carries to Lv.15 / Lv.20",
                },
                tone: "gold",
              },
              branches: [
                {
                  title: {
                    vi: "Giai đoạn 1: Mở Khóa Lv.1 (5 Mảnh) ➔ Điểm Gãy 1 Lv.5 (75 Mảnh)",
                    en: "Phase 1: Base Unlock Lv.1 (5 Shards) ➔ Breakpoint 1 Lv.5 (75 Shards)",
                  },
                  badge: {
                    vi: "5 ➔ 75 Mảnh",
                    en: "5 ➔ 75 Shards",
                  },
                  tone: "gold",
                  steps: [
                    {
                      id: "uw-phase1-lv1",
                      title: {
                        vi: "Lv.1 (5 Mảnh): Mở Khóa Vũ Khí & Kỹ Năng Gốc (+53.60% Base)",
                        en: "Lv.1 (5 Shards): Unlock Exclusive Weapon & Base Skill (+53.60% Base)",
                      },
                      subtitle: {
                        vi: "Bắt buộc mở khóa Lv.1 cho toàn bộ 6 tướng trong Đội 1 ngay khi có sự kiện (tổng 30 mảnh cho 6 tướng).",
                        en: "Mandatory base unlock for all 6 Queue 1 heroes as soon as their banner arrives (30 shards total for 6 heroes).",
                      },
                      tone: "gold",
                    },
                    {
                      id: "uw-phase1-lv5",
                      title: {
                        vi: "Lv.5 ★ (Tích Lũy 75 Mảnh): Cường Hóa Kỹ Năng Bậc 1 (+58.00% Base, +0.50% ATK)",
                        en: "Lv.5 ★ (75 Cumulative Shards): Tier 1 Skill Upgrade (+58.00% Base, +0.50% ATK)",
                      },
                      subtitle: {
                        vi: "Điểm dừng ngắn hạn hiệu quả cho các tướng Hỗ trợ / Tank phụ trong Đội 1.",
                        en: "Cost-effective short-term parking spot for secondary Supports and Off-Tanks in Queue 1.",
                      },
                      tone: "gold",
                    },
                  ],
                  outcome: {
                    vi: "Hoàn tất kích hoạt kỹ năng vũ khí bậc 1 cho toàn đội với chi phí mảnh thấp nhất.",
                    en: "Activates Tier 1 weapon skills across the squad at minimal shard cost.",
                  },
                },
                {
                  title: {
                    vi: "Giai đoạn 2: ĐIỂM GÃY VÀNG F2P Lv.10 ★ (275 Mảnh = 1,650 Mảnh Cho 6 Tướng)",
                    en: "Phase 2: F2P GOLDEN BREAKPOINT Lv.10 ★ (275 Shards = 1,650 Shards For 6 Heroes)",
                  },
                  badge: {
                    vi: "275 Mảnh / Tướng",
                    en: "275 Shards / Hero",
                  },
                  tone: "emerald",
                  steps: [
                    {
                      id: "uw-phase2-lv10-stats",
                      title: {
                        vi: "Lv.10 (275 Mảnh): Đột Phá Kỹ Năng Bậc 2 + 500 Defense Break & -0.60% Ult CD",
                        en: "Lv.10 (275 Shards): Tier 2 Skill Breakthrough + 500 Defense Break & -0.60% Ult CD",
                      },
                      subtitle: {
                        vi: "Cộng +65.70% Base, 500 Defense Break, -0.60% Initial Ult CD, +5.00% Hero ATK, +10.00% Hero HP.",
                        en: "Grants +65.70% Base, 500 Defense Break, -0.60% Initial Ult CD, +5.00% Hero ATK, +10.00% Hero HP.",
                      },
                      tone: "emerald",
                    },
                    {
                      id: "uw-phase2-faction-order",
                      title: {
                        vi: "Thứ Tự Đập Lv.10 Chuẩn 3 Phe: Carry #1 & #2 ➔ Main Tank & Off-Tank ➔ Support",
                        en: "3-Faction Lv.10 Priority: Carry #1 & #2 ➔ Main Tank & Off-Tank ➔ Supports",
                      },
                      subtitle: {
                        vi: "Bộ Lạc (Wukong & Storm Maiden ➔ Desert Prince & Beastmaster) | Liên Minh (Paragon & Pyromancer ➔ Rose Princess & Adjudicator) | Thiên Nhiên (Tidecaller & Ne Zha ➔ Monk & Pixie).",
                        en: "Horde (Wukong & Storm Maiden ➔ Desert Prince & Beastmaster) | League (Paragon & Pyromancer ➔ Rose Princess & Adjudicator) | Nature (Tidecaller & Ne Zha ➔ Monk & Pixie).",
                      },
                      tone: "emerald",
                    },
                  ],
                  outcome: {
                    vi: "Thay đổi hoàn toàn cơ chế giao tranh của Đội 1 với ROI mảnh/sức mạnh cao nhất trò chơi.",
                    en: "Completely transforms Queue 1 combat mechanics with the highest shard-to-power ROI in the game.",
                  },
                },
                {
                  title: {
                    vi: "Giai đoạn 3: Đột Phá Sâu Lv.15 (605 Mảnh) ➔ Đỉnh Cao Lv.20 (1,185 Mảnh) & 1★–5★ (920 Lõi Sắt)",
                    en: "Phase 3: Deep Push Lv.15 (605 Shards) ➔ Cap Lv.20 (1,185 Shards) & 1★–5★ (920 Iron Cores)",
                  },
                  badge: {
                    vi: "605 ➔ 1,185 Mảnh",
                    en: "605 ➔ 1,185 Shards",
                  },
                  tone: "gold",
                  steps: [
                    {
                      id: "uw-phase3-lv15",
                      title: {
                        vi: "Lv.15 ★ (605 Mảnh): Kỹ Năng Bậc 3 + 1,160 Defense Break, +11.50% ATK, +23.00% HP",
                        en: "Lv.15 ★ (605 Shards): Tier 3 Skill + 1,160 Defense Break, +11.50% ATK, +23.00% HP",
                      },
                      subtitle: {
                        vi: "Mốc mục tiêu Mid-to-Late Game cho Hyper-Carry số 1 (Wukong, Storm Maiden, Paragon, Tidecaller).",
                        en: "Mid-to-Late Game milestone for your #1 Hyper-Carry (Wukong, Storm Maiden, Paragon, Tidecaller).",
                      },
                      tone: "gold",
                    },
                    {
                      id: "uw-phase3-lv20-and-stars",
                      title: {
                        vi: "Lv.20 ★ (1,185 Mảnh = 7,110 Mảnh/6 Tướng) & 1★–5★ (920 Lõi Sắt Thiên Thạch)",
                        en: "Lv.20 ★ (1,185 Shards = 7,110 Shards/6 Heroes) & 1★–5★ (920 Meteoric Iron Cores)",
                      },
                      subtitle: {
                        vi: "Lv.20 mở Kỹ năng Bậc 4 (+86.20% Base, 1,850 Defense Break, -2.30% Initial Ult CD, +18.50% ATK, +37.00% HP) kết hợp 5 cấp Sao (65 / 200 / 480 / 720 / 920 Lõi Sắt).",
                        en: "Lv.20 unlocks Tier 4 Skill (+86.20% Base, 1,850 Defense Break, -2.30% Initial Ult CD, +18.50% ATK, +37.00% HP) alongside 5 Star tiers (65 / 200 / 480 / 720 / 920 Cores).",
                      },
                      tone: "gold",
                    },
                  ],
                  outcome: {
                    vi: "Chạm trần giới hạn Vũ khí Độc quyền Endgame cho siêu Carry chủ lực.",
                    en: "Reaches the absolute Endgame Exclusive Weapon ceiling for your primary Hyper-Carry.",
                  },
                },
              ],
              footnote: {
                vi: "Mẹo sự kiện: Luôn khóa 100% Mảnh Vũ Khí Độc Quyền Vạn Năng để xả vào Ngày Thứ Năm Tuần B (GAR Ngày 4: Hero Upgrade) kết hợp sự kiện phụ Hero Development.",
                en: "Event Tip: Always hoard 100% of Universal Exclusive Weapon Shards to dump on Thursday of Week B (GAR Day 4: Hero Upgrade) stacked with Hero Development.",
              },
            },
          ],
        },
        {
          id: "sub-4-3-uw-lv1-to-lv20-cost-table",
          title: {
            vi: "4.3. Bảng Tra Cứu Đầy Đủ 20 Cấp Độ Vũ Khí Độc Quyền (UW Lv.1 ➔ Lv.20 = 1,185 Mảnh)",
            en: "4.3. Complete 20-Level Exclusive Weapon Cost & Attribute Table (UW Lv.1 ➔ Lv.20 = 1,185 Shards)",
          },
          badge: {
            vi: "20 Cấp Độ (1,185 Mảnh)",
            en: "20 Levels (1,185 Shards)",
          },
          blocks: [
            {
              type: "table",
              caption: {
                vi: "Bảng 4.2 — Bảng Chi Phí 20 Cấp Vũ Khí Độc Quyền (UW Lv.1 ➔ Lv.20 = 1,185 Mảnh/Tướng = 7,110 Mảnh/6 Tướng) & Thuộc Tính Bậc Thầy",
                en: "Table 4.2 — Complete 20-Level Exclusive Weapon Cost Table (UW Lv.1 ➔ Lv.20 = 1,185 Shards/Hero = 7,110 Shards/6 Heroes) & Master Attributes",
              },
              headers: [
                {
                  vi: "Cấp Độ Vũ Khí (UW Level)",
                  en: "Weapon Level (UW Level)",
                },
                {
                  vi: "Mảnh Cần Ở Cấp Này (Per Lvl)",
                  en: "Shards Required (Per Lvl)",
                },
                {
                  vi: "Tổng Mảnh Tích Lũy (Cumulative)",
                  en: "Cumulative Shards Total",
                },
                {
                  vi: "Chỉ Số Vũ Khí & Thuộc Tính Bậc Thầy (Master Attributes)",
                  en: "Weapon Base & Master Attributes",
                },
                {
                  vi: "Đánh Giá Điểm Gãy Chiến Thuật (ROI Breakpoint)",
                  en: "Tactical ROI Breakpoint Evaluation",
                },
              ],
              rows: [
                [
                  {
                    vi: "Lv.1 (Mở khóa)",
                    en: "Lv.1 (Base Unlock)",
                  },
                  {
                    vi: "5 Mảnh",
                    en: "5 Shards",
                  },
                  {
                    vi: "5 Mảnh",
                    en: "5 Shards",
                  },
                  {
                    vi: "Mở khóa Vũ khí Độc quyền & Kỹ năng gốc (+53.60% Base)",
                    en: "Unlocks Exclusive Weapon & Base Signature Skill (+53.60% Base)",
                  },
                  {
                    vi: "Bắt buộc mở khóa (Lv.1 = 5 mảnh) cho toàn bộ 6 tướng trong Đội 1 ngay khi có sự kiện.",
                    en: "Mandatory unlock (Lv.1 = 5 shards) for all 6 Queue 1 heroes immediately upon release.",
                  },
                ],
                [
                  {
                    vi: "Lv.2",
                    en: "Lv.2",
                  },
                  {
                    vi: "10 Mảnh",
                    en: "10 Shards",
                  },
                  {
                    vi: "15 Mảnh",
                    en: "15 Shards",
                  },
                  {
                    vi: "+54.70% Base",
                    en: "+54.70% Base",
                  },
                  {
                    vi: "Bước đệm tích lũy tiến tới mốc Lv.5.",
                    en: "Stepping stone toward the Lv.5 milestone.",
                  },
                ],
                [
                  {
                    vi: "Lv.3",
                    en: "Lv.3",
                  },
                  {
                    vi: "15 Mảnh",
                    en: "15 Shards",
                  },
                  {
                    vi: "30 Mảnh",
                    en: "30 Shards",
                  },
                  {
                    vi: "+55.80% Base",
                    en: "+55.80% Base",
                  },
                  {
                    vi: "Bước đệm tích lũy tiến tới mốc Lv.5.",
                    en: "Stepping stone toward the Lv.5 milestone.",
                  },
                ],
                [
                  {
                    vi: "Lv.4",
                    en: "Lv.4",
                  },
                  {
                    vi: "20 Mảnh",
                    en: "20 Shards",
                  },
                  {
                    vi: "50 Mảnh",
                    en: "50 Shards",
                  },
                  {
                    vi: "+56.90% Base",
                    en: "+56.90% Base",
                  },
                  {
                    vi: "Chuẩn bị chạm mốc đột phá kỹ năng đầu tiên ở Lv.5.",
                    en: "Pre-breakthrough level right before the first skill upgrade at Lv.5.",
                  },
                ],
                [
                  {
                    vi: "Lv.5 ★ (Mốc Đột Phá 1)",
                    en: "Lv.5 ★ (Breakpoint 1)",
                  },
                  {
                    vi: "25 Mảnh",
                    en: "25 Shards",
                  },
                  {
                    vi: "75 Mảnh",
                    en: "75 Shards",
                  },
                  {
                    vi: "Cường hóa Kỹ năng Độc quyền Bậc 1 | +58.00% Base, +0.50% Hero ATK",
                    en: "Tier 1 Exclusive Skill Upgrade | +58.00% Base, +0.50% Hero ATK",
                  },
                  {
                    vi: "Điểm dừng ngắn hạn (Lv.5 = 75 mảnh) cho các tướng Hỗ trợ / Tank phụ trong Đội 1.",
                    en: "Short-term parking spot (Lv.5 = 75 shards) for secondary Supports and Off-Tanks in Queue 1.",
                  },
                ],
                [
                  {
                    vi: "Lv.6",
                    en: "Lv.6",
                  },
                  {
                    vi: "30 Mảnh",
                    en: "30 Shards",
                  },
                  {
                    vi: "105 Mảnh",
                    en: "105 Shards",
                  },
                  {
                    vi: "+59.10% Base, -0.20% Initial Ult CD, +0.50% Hero ATK, +2.50% Hero HP",
                    en: "+59.10% Base, -0.20% Initial Ult CD, +0.50% Hero ATK, +2.50% Hero HP",
                  },
                  {
                    vi: "Bắt đầu cộng Giảm hồi chiêu Tuyệt chiêu khởi đầu (Initial Ultimate Cooldown Reduced).",
                    en: "Begins granting Initial Ultimate Cooldown Reduction (-0.20% Initial Ult CD).",
                  },
                ],
                [
                  {
                    vi: "Lv.7",
                    en: "Lv.7",
                  },
                  {
                    vi: "35 Mảnh",
                    en: "35 Shards",
                  },
                  {
                    vi: "140 Mảnh",
                    en: "140 Shards",
                  },
                  {
                    vi: "+60.75% Base, 130 Defense Break, -0.20% Initial Ult CD, +1.50% ATK / +2.50% HP",
                    en: "+60.75% Base, 130 Defense Break, -0.20% Initial Ult CD, +1.50% ATK / +2.50% HP",
                  },
                  {
                    vi: "Mở khóa dòng chỉ số hiếm Xuyên Thủ (130 Defense Break).",
                    en: "Unlocks the rare Defense Break penetration stat (130 Defense Break).",
                  },
                ],
                [
                  {
                    vi: "Lv.8",
                    en: "Lv.8",
                  },
                  {
                    vi: "40 Mảnh",
                    en: "40 Shards",
                  },
                  {
                    vi: "180 Mảnh",
                    en: "180 Shards",
                  },
                  {
                    vi: "+62.40% Base, 250 Defense Break, -0.20% Initial Ult CD, +1.50% ATK / +5.00% HP",
                    en: "+62.40% Base, 250 Defense Break, -0.20% Initial Ult CD, +1.50% ATK / +5.00% HP",
                  },
                  {
                    vi: "Gia tăng Xuyên Thủ (250 Defense Break) và HP (+5.00%).",
                    en: "Scales up Defense Break (250) and Hero HP (+5.00%).",
                  },
                ],
                [
                  {
                    vi: "Lv.9",
                    en: "Lv.9",
                  },
                  {
                    vi: "45 Mảnh",
                    en: "45 Shards",
                  },
                  {
                    vi: "225 Mảnh",
                    en: "225 Shards",
                  },
                  {
                    vi: "+64.05% Base, 380 Defense Break, -0.60% Initial Ult CD, +4.00% ATK / +7.50% HP",
                    en: "+64.05% Base, 380 Defense Break, -0.60% Initial Ult CD, +4.00% ATK / +7.50% HP",
                  },
                  {
                    vi: "Giai đoạn nước rút ngay trước Điểm gãy Vàng Lv.10.",
                    en: "Final sprint level right before the Lv.10 Golden Breakpoint.",
                  },
                ],
                [
                  {
                    vi: "Lv.10 ★ (ĐIỂM GÃY VÀNG)",
                    en: "Lv.10 ★ (GOLDEN BREAKPOINT)",
                  },
                  {
                    vi: "50 Mảnh",
                    en: "50 Shards",
                  },
                  {
                    vi: "275 Mảnh",
                    en: "275 Shards",
                  },
                  {
                    vi: "Đột phá Kỹ năng Độc quyền Bậc 2 | +65.70% Base, 500 Defense Break, -0.60% Initial Ult CD, +5.00% Hero ATK, +10.00% Hero HP",
                    en: "Tier 2 Exclusive Skill Breakthrough | +65.70% Base, 500 Defense Break, -0.60% Initial Ult CD, +5.00% Hero ATK, +10.00% Hero HP",
                  },
                  {
                    vi: "ĐIỂM DỪNG TỐI ƯU SỐ 1 CHO F2P/LOW-SPENDER (Lv.10 = 275 mảnh, tổng 1,650 mảnh cho 6 tướng)! Thay đổi hoàn toàn cơ chế giao tranh của tướng.",
                    en: "#1 OPTIMAL STOP FOR F2P/LOW-SPENDERS (Lv.10 = 275 shards, 1,650 shards total for 6 heroes)! Fundamentally transforms hero combat mechanics.",
                  },
                ],
                [
                  {
                    vi: "Lv.11",
                    en: "Lv.11",
                  },
                  {
                    vi: "55 Mảnh",
                    en: "55 Shards",
                  },
                  {
                    vi: "330 Mảnh",
                    en: "330 Shards",
                  },
                  {
                    vi: "+67.35% Base, 630 Defense Break, -1.00% Initial Ult CD, +6.50% ATK / +12.50% HP",
                    en: "+67.35% Base, 630 Defense Break, -1.00% Initial Ult CD, +6.50% ATK / +12.50% HP",
                  },
                  {
                    vi: "Chỉ nâng tiếp cho duy nhất Hyper-Carry số 1 sau khi các trụ cột khác đã đạt Lv.10.",
                    en: "Only push past Lv.10 on your #1 Hyper-Carry after other Queue 1 pillars have secured Lv.10.",
                  },
                ],
                [
                  {
                    vi: "Lv.12",
                    en: "Lv.12",
                  },
                  {
                    vi: "60 Mảnh",
                    en: "60 Shards",
                  },
                  {
                    vi: "390 Mảnh",
                    en: "390 Shards",
                  },
                  {
                    vi: "+69.00% Base, 760 Defense Break, -1.00% Initial Ult CD, +6.50% ATK / +15.00% HP",
                    en: "+69.00% Base, 760 Defense Break, -1.00% Initial Ult CD, +6.50% ATK / +15.00% HP",
                  },
                  {
                    vi: "Gia tăng mạnh Xuyên Thủ (760 Defense Break) và HP (+15.00%).",
                    en: "Strong boost to Defense Break (760) and Hero HP (+15.00%).",
                  },
                ],
                [
                  {
                    vi: "Lv.13",
                    en: "Lv.13",
                  },
                  {
                    vi: "65 Mảnh",
                    en: "65 Shards",
                  },
                  {
                    vi: "455 Mảnh",
                    en: "455 Shards",
                  },
                  {
                    vi: "+71.20% Base, 890 Defense Break, -1.00% Initial Ult CD, +8.50% ATK / +15.00% HP",
                    en: "+71.20% Base, 890 Defense Break, -1.00% Initial Ult CD, +8.50% ATK / +15.00% HP",
                  },
                  {
                    vi: "Bước đệm tiến lên mốc đột phá Lv.15.",
                    en: "Mid-tier progression step toward the Lv.15 breakthrough.",
                  },
                ],
                [
                  {
                    vi: "Lv.14",
                    en: "Lv.14",
                  },
                  {
                    vi: "70 Mảnh",
                    en: "70 Shards",
                  },
                  {
                    vi: "525 Mảnh",
                    en: "525 Shards",
                  },
                  {
                    vi: "+73.40% Base, 1,020 Defense Break, -1.40% Initial Ult CD, +10.00% ATK / +20.50% HP",
                    en: "+73.40% Base, 1,020 Defense Break, -1.40% Initial Ult CD, +10.00% ATK / +20.50% HP",
                  },
                  {
                    vi: "Xuyên Thủ vượt ngưỡng 1,000 điểm (1,020 Defense Break).",
                    en: "Defense Break surpasses the 1,000 threshold (1,020 Defense Break).",
                  },
                ],
                [
                  {
                    vi: "Lv.15 ★ (Mốc Đột Phá 3)",
                    en: "Lv.15 ★ (Breakpoint 3)",
                  },
                  {
                    vi: "80 Mảnh",
                    en: "80 Shards",
                  },
                  {
                    vi: "605 Mảnh",
                    en: "605 Shards",
                  },
                  {
                    vi: "Đột phá Kỹ năng Độc quyền Bậc 3 | +75.65% Base, 1,160 Defense Break, -1.40% Initial Ult CD, +11.50% Hero ATK, +23.00% Hero HP",
                    en: "Tier 3 Exclusive Skill Breakthrough | +75.65% Base, 1,160 Defense Break, -1.40% Initial Ult CD, +11.50% Hero ATK, +23.00% Hero HP",
                  },
                  {
                    vi: "Mốc mục tiêu Mid-to-Late Game (Lv.15 = 605 mảnh) cho Carry chính (Wukong, Storm Maiden, Paragon, Tidecaller).",
                    en: "Mid-to-Late Game target milestone (Lv.15 = 605 shards) for primary Carries (Wukong, Storm Maiden, Paragon, Tidecaller).",
                  },
                ],
                [
                  {
                    vi: "Lv.16",
                    en: "Lv.16",
                  },
                  {
                    vi: "90 Mảnh",
                    en: "90 Shards",
                  },
                  {
                    vi: "695 Mảnh",
                    en: "695 Shards",
                  },
                  {
                    vi: "+77.75% Base, 1,290 Defense Break, -1.80% Initial Ult CD, +13.00% ATK / +26.00% HP",
                    en: "+77.75% Base, 1,290 Defense Break, -1.80% Initial Ult CD, +13.00% ATK / +26.00% HP",
                  },
                  {
                    vi: "Giai đoạn đầu tư sâu Endgame cho Hyper-Carry.",
                    en: "Deep Endgame investment stage for your primary Hyper-Carry.",
                  },
                ],
                [
                  {
                    vi: "Lv.17",
                    en: "Lv.17",
                  },
                  {
                    vi: "100 Mảnh",
                    en: "100 Shards",
                  },
                  {
                    vi: "795 Mảnh",
                    en: "795 Shards",
                  },
                  {
                    vi: "+79.85% Base, 1,430 Defense Break, -1.80% Initial Ult CD, +13.00% ATK / +28.50% HP",
                    en: "+79.85% Base, 1,430 Defense Break, -1.80% Initial Ult CD, +13.00% ATK / +28.50% HP",
                  },
                  {
                    vi: "Tăng mạnh chỉ số cơ bản và HP (+28.50% HP).",
                    en: "Substantial increase to base weapon stats and Hero HP (+28.50% HP).",
                  },
                ],
                [
                  {
                    vi: "Lv.18",
                    en: "Lv.18",
                  },
                  {
                    vi: "110 Mảnh",
                    en: "110 Shards",
                  },
                  {
                    vi: "905 Mảnh",
                    en: "905 Shards",
                  },
                  {
                    vi: "+81.95% Base, 1,570 Defense Break, -1.80% Initial Ult CD, +15.00% ATK / +28.50% HP",
                    en: "+81.95% Base, 1,570 Defense Break, -1.80% Initial Ult CD, +15.00% ATK / +28.50% HP",
                  },
                  {
                    vi: "Chuẩn bị chạm trần Lv.20 (lưu ý tránh kẹt dở dang ở Lv.18 nếu chưa đủ mảnh lên Lv.20).",
                    en: "Approaching the Lv.20 cap (avoid stalling at Lv.18 if you lack shards to finish Lv.20).",
                  },
                ],
                [
                  {
                    vi: "Lv.19",
                    en: "Lv.19",
                  },
                  {
                    vi: "130 Mảnh",
                    en: "130 Shards",
                  },
                  {
                    vi: "1,035 Mảnh",
                    en: "1,035 Shards",
                  },
                  {
                    vi: "+84.05% Base, 1,710 Defense Break, -2.30% Initial Ult CD, +17.00% ATK / +34.00% HP",
                    en: "+84.05% Base, 1,710 Defense Break, -2.30% Initial Ult CD, +17.00% ATK / +34.00% HP",
                  },
                  {
                    vi: "Cấp áp chót (Lv.19 = 130 mảnh, tích lũy 1,035 mảnh, mở mốc -2.30% Initial Ult CD).",
                    en: "Penultimate level (Lv.19 = 130 shards, cumulative 1,035 shards, unlocks -2.30% Initial Ult CD).",
                  },
                ],
                [
                  {
                    vi: "Lv.20 ★ (Đỉnh Cao Kịch Trần)",
                    en: "Lv.20 ★ (Max Ceiling)",
                  },
                  {
                    vi: "150 Mảnh",
                    en: "150 Shards",
                  },
                  {
                    vi: "Tổng: 1,185 Mảnh",
                    en: "Total: 1,185 Shards",
                  },
                  {
                    vi: "Hoàn thiện Kỹ năng Độc quyền Bậc 4 | +86.20% Base, 1,850 Defense Break, -2.30% Initial Ult CD, +18.50% Hero ATK, +37.00% Hero HP",
                    en: "Tier 4 Max Exclusive Skill | +86.20% Base, 1,850 Defense Break, -2.30% Initial Ult CD, +18.50% Hero ATK, +37.00% Hero HP",
                  },
                  {
                    vi: "Lv.20 = 150 mảnh (Tổng tích lũy: 1,185 mảnh/tướng = 7,110 mảnh cho 6 tướng). Chỉ dồn lên Lv.20 cho siêu Carry Endgame.",
                    en: "Lv.20 = 150 shards (Cumulative total: 1,185 shards/hero = 7,110 shards for 6 heroes). Reserve Lv.20 strictly for Endgame Hyper-Carries.",
                  },
                ],
              ],
            },
          ],
        },
        {
          id: "sub-4-4-uw-star-level-and-faction-priority",
          title: {
            vi: "4.4. Bảng Đột Phá Sao Vũ Khí (1★ ➔ 5★ = 920 Lõi Sắt Thiên Thạch) & Thứ Tự Ưu Tiên Lv.10 Cho 3 Phe",
            en: "4.4. Exclusive Weapon Star Promotion Table (1★ ➔ 5★ = 920 Meteoric Iron Cores) & 3-Faction Lv.10 Priority Order",
          },
          badge: {
            vi: "920 Lõi Sắt & 20 Tướng 3 Phe",
            en: "920 Iron Cores & 20 Heroes",
          },
          blocks: [
            {
              type: "table",
              caption: {
                vi: "Bảng 4.3 — Chi Phí Đột Phá Sao Vũ Khí Độc Quyền (UW Star Level 1★ ➔ 5★ = 920 Lõi Sắt Thiên Thạch / Meteoric Iron Cores)",
                en: "Table 4.3 — Exclusive Weapon Star Promotion Cost Table (UW Star Level 1★ ➔ 5★ = 920 Meteoric Iron Cores)",
              },
              headers: [
                {
                  vi: "Cấp Sao Vũ Khí (UW Star Level)",
                  en: "Weapon Star Tier (UW Star Level)",
                },
                {
                  vi: "Lõi Sắt Thiên Thạch Cần Ở Cấp Sao Này (Per Star)",
                  en: "Meteoric Iron Cores Required (Per Star)",
                },
                {
                  vi: "Tổng Lõi Sắt Thiên Thạch Tích Lũy (Cumulative)",
                  en: "Cumulative Meteoric Iron Cores",
                },
                {
                  vi: "Ý Nghĩa Chiến Thuật & Thứ Tự Đầu Tư",
                  en: "Strategic Value & Investment Priority",
                },
              ],
              rows: [
                [
                  {
                    vi: "★ 1 Sao (1★)",
                    en: "★ 1-Star (1★)",
                  },
                  {
                    vi: "65 Lõi (10 + 10 + 15 + 15 + 15)",
                    en: "65 Cores (10 + 10 + 15 + 15 + 15)",
                  },
                  {
                    vi: "65 Lõi Sắt Thiên Thạch",
                    en: "65 Meteoric Iron Cores",
                  },
                  {
                    vi: "Điểm khởi đầu chi phí thấp, ưu tiên mở 1★ cho toàn bộ tướng chủ lực Đội 1.",
                    en: "Low-cost entry milestone; prioritize unlocking 1★ across all core Queue 1 heroes.",
                  },
                ],
                [
                  {
                    vi: "★★ 2 Sao (2★)",
                    en: "★★ 2-Star (2★)",
                  },
                  {
                    vi: "135 Lõi (20 + 25 + 25 + 30 + 35)",
                    en: "135 Cores (20 + 25 + 25 + 30 + 35)",
                  },
                  {
                    vi: "200 Lõi Sắt Thiên Thạch",
                    en: "200 Meteoric Iron Cores",
                  },
                  {
                    vi: "Điểm dừng tầm trung hiệu quả cho Tanker và Sub-DPS trong Đội 1.",
                    en: "Efficient mid-game stopping point for Queue 1 Tanks and Sub-DPS.",
                  },
                ],
                [
                  {
                    vi: "★★★ 3 Sao (3★)",
                    en: "★★★ 3-Star (3★)",
                  },
                  {
                    vi: "280 Lõi (40 + 50 + 55 + 65 + 70)",
                    en: "280 Cores (40 + 50 + 55 + 65 + 70)",
                  },
                  {
                    vi: "480 Lõi Sắt Thiên Thạch",
                    en: "480 Meteoric Iron Cores",
                  },
                  {
                    vi: "Mốc đột phá sức mạnh lớn cho Hyper-Carry số 1.",
                    en: "Major power spike milestone for your #1 Hyper-Carry.",
                  },
                ],
                [
                  {
                    vi: "★★★★ 4 Sao (4★)",
                    en: "★★★★ 4-Star (4★)",
                  },
                  {
                    vi: "240 Lõi",
                    en: "240 Cores",
                  },
                  {
                    vi: "720 Lõi Sắt Thiên Thạch",
                    en: "720 Meteoric Iron Cores",
                  },
                  {
                    vi: "Bước đệm tiến lên kịch trần Endgame.",
                    en: "Late-game stepping stone toward the 5★ ceiling.",
                  },
                ],
                [
                  {
                    vi: "★★★★★ 5 Sao (5★ Max)",
                    en: "★★★★★ 5-Star (5★ Max)",
                  },
                  {
                    vi: "200 Lõi",
                    en: "200 Cores",
                  },
                  {
                    vi: "Tổng: 920 Lõi Sắt Thiên Thạch",
                    en: "Total: 920 Meteoric Iron Cores",
                  },
                  {
                    vi: "Hoàn tất 100% giới hạn Sao Vũ khí Độc quyền (65 / 200 / 480 / 720 / 920 Lõi Sắt Thiên Thạch).",
                    en: "Completes 100% of the Exclusive Weapon Star ceiling (65 / 200 / 480 / 720 / 920 Meteoric Iron Cores).",
                  },
                ],
              ],
            },
            {
              type: "list",
              ordered: true,
              items: [
                {
                  vi: "**Thứ tự `Lv.10` (275 Mảnh) — Phe Bộ Lạc (Horde):** Mở `Lv.1` (5 Mảnh) cho 6 tướng ➔ `Lv.10` cho Wukong và Storm Maiden ➔ `Lv.10` cho Desert Prince và Beastmaster ➔ `Lv.10` cho Witch, Soulmancer / Warlock.",
                  en: "**`Lv.10` (275 Shards) Priority — Horde Faction:** Unlock `Lv.1` (5 Shards) for 6 heroes ➔ `Lv.10` for Wukong and Storm Maiden ➔ `Lv.10` for Desert Prince and Beastmaster ➔ `Lv.10` for Witch, Soulmancer / Warlock.",
                },
                {
                  vi: "**Thứ tự `Lv.10` (275 Mảnh) — Phe Liên Minh (League):** Mở `Lv.1` (5 Mảnh) cho 6 tướng ➔ `Lv.10` cho Paragon và Pyromancer ➔ `Lv.10` cho Rose Princess và Adjudicator ➔ `Lv.10` cho Bishop, Artificer và Nun.",
                  en: "**`Lv.10` (275 Shards) Priority — League Faction:** Unlock `Lv.1` (5 Shards) for 6 heroes ➔ `Lv.10` for Paragon and Pyromancer ➔ `Lv.10` for Rose Princess and Adjudicator ➔ `Lv.10` for Bishop, Artificer, and Nun.",
                },
                {
                  vi: "**Thứ tự `Lv.10` (275 Mảnh) — Phe Thiên Nhiên (Nature):** Mở `Lv.1` (5 Mảnh) cho 6 tướng ➔ `Lv.10` cho Tidecaller và Ne Zha ➔ `Lv.10` cho Monk và Pixie ➔ `Lv.10` cho Petalis và Forest Maiden.",
                  en: "**`Lv.10` (275 Shards) Priority — Nature Faction:** Unlock `Lv.1` (5 Shards) for 6 heroes ➔ `Lv.10` for Tidecaller and Ne Zha ➔ `Lv.10` for Monk and Pixie ➔ `Lv.10` for Petalis and Forest Maiden.",
                },
              ],
            },
            {
              type: "media_spotlight",
              mediaCode: "MED-5.3-04",
              tier: "tier4_youtube_ref",
              title: {
                vi: "Video Tham Chiếu Quốc Tế: Đột Phá Đồ Đỏ 5 Sao (6,000 Thỏi Vàng) & Điểm Dừng Vũ Khí Độc Quyền Lv.10 vs Lv.20",
                en: "International Video Reference: Mythic Gear Star Promotion (6,000 Gold Ingots) & Exclusive Weapon Lv.10 vs Lv.20 Guide",
              },
              description: {
                vi: "Phân tích trực quan chi phí 6,000 Thỏi Vàng + 500,000 Quặng + 23,980,000 Ruby lên Đồ Đỏ 5 Sao và lý do tại sao mốc Vũ khí Độc quyền Lv.10 (275 mảnh) mang lại hiệu suất đầu tư vượt trội so với đẩy lẻ Lv.20 (1,185 mảnh).",
                en: "In-depth breakdown of the 6,000 Gold Ingots + 500,000 Runes + 23,980,000 Rubies 5-Star Mythic promotion cost and why the Lv.10 Exclusive Weapon breakpoint (275 shards) vastly outperforms rushing a single Lv.20 (1,185 shards).",
              },
              videoChannel: "RedBaron Gaming",
              videoTitle: "Mythic Gear Star Promotion & Exclusive Weapon Level 10 vs 20 Guide",
              videoTimestamp: "03:10 – 09:45",
              videoUrl: "https://www.youtube.com/watch?v=9xN0rK5pQ2M",
            },
          ],
        },
      ],
    },
    {
      id: "sec-5-castle31-850shards-600kore-case-study",
      isPro: true,
      title: {
        vi: "5. Kịch bản Thực chiến Nâng cao: Phân Bổ 850 Mảnh Vũ Khí Độc Quyền Vạn Năng & 600,000 Quặng Cường Hóa Trong Ngày Thứ Năm Tuần B (GAR Day 4)",
        en: "5. Advanced Tactical Case Study: Allocating 850 Universal Exclusive Weapon Shards & 600,000 Upgrade Runes on Thursday Week B (GAR Day 4)",
      },
      blocks: [
        {
          type: "case_study",
          badge: {
            vi: "Case Study Lâu Đài Lv.31 • GAR Ngày 4",
            en: "Castle Lv.31 Case Study • GAR Day 4",
          },
          title: {
            vi: "Bài Toán Phân Bổ 850 Mảnh Vũ Khí Vạn Năng & 600,000 Quặng Cường Hóa Giữa Phương Án Dồn Lẻ vs Chuẩn Điểm Gãy Min-Max",
            en: "Allocating 850 Universal Exclusive Weapon Shards & 600,000 Upgrade Runes: Tunnel-Vision vs Min-Max Breakpoints",
          },
          profileSummary: {
            vi: "• **Ngân sách tích lũy**: Tài khoản Mid-game (Lâu đài Lv.31) tích được 850 Mảnh Vũ Khí Độc Quyền Vạn Năng và 600,000 Quặng Cường Hóa để xả vào Ngày Thứ Năm Tuần B (GAR Day 4).\n• **Phương án A (Sai lầm)**: Dồn 830 mảnh vào Carry #1 từ `Lv.5` lên Lv.18, và dùng 270,000 Quặng đập riêng Kiếm + Giày của Carry lên `Lv.40` (để Mũ + Giáp ở `Lv.20`).\n• **Phương án B (Chuẩn Min-Max)**: Phân bổ chuẩn Điểm gãy Vàng `Lv.10` = 275 Mảnh kết hợp đồng bộ Bậc Thầy Cường Hóa `+30`.",
            en: "• **Saved Budget**: A mid-game account (Castle Lv.31) saved 850 Universal Exclusive Weapon Shards and 600,000 Upgrade Runes for Thursday Week B (GAR Day 4).\n• **Option A (Flawed)**: Dumping 830 shards into Carry #1 from `Lv.5` to Lv.18, and spending 270,000 Runes pushing only Carry #1's Weapon + Boots to `Lv.40` (Helmet + Chestplate at `Lv.20`).\n• **Option B (Min-Max)**: Distributing across `Lv.10` = 275 Shards Golden Breakpoints and synchronized `+30` Enhancement Master brackets.",
          },
          metrics: [
            {
              label: {
                vi: "Đột Phá Vũ Khí Độc Quyền (850 Mảnh)",
                en: "Exclusive Weapon Breakthroughs (850 Shards)",
              },
              before: {
                vi: "Phương án A: 1 tướng kẹt ở Lv.18 (tốn 830 mảnh, chưa mở kỹ năng Lv.20)",
                en: "Option A: 1 hero stuck at Lv.18 (830 shards spent, 0 Lv.20 skill)",
              },
              after: {
                vi: "Phương án B: 3 tướng đạt Lv.10 + 1 tướng đạt Lv.5 (tốn 825 mảnh, dư 25 mảnh)",
                en: "Option B: 3 heroes hit Lv.10 + 1 hero hits Lv.5 (825 shards spent, 25 left)",
              },
              delta: {
                vi: "+1,500 Defense Break, +15% ATK, +30% HP",
                en: "+1,500 Defense Break, +15% ATK, +30% HP",
              },
            },
            {
              label: {
                vi: "Cộng Hưởng Bậc Thầy Cường Hóa (600,000 Quặng)",
                en: "Enhancement Master Resonance (600,000 Runes)",
              },
              before: {
                vi: "Phương án A: Kiếm/Giày +40 nhưng Mũ/Giáp +20 (0 mốc cộng hưởng mới)",
                en: "Option A: Weapon/Boots +40 but Helmet/Chest +20 (0 new resonance)",
              },
              after: {
                vi: "Phương án B: Carry #1 Full +30, Main Tank Full +30, Carry #2 Kiếm/Giày +30",
                en: "Option B: Carry #1 Full +30, Main Tank Full +30, Carry #2 Weapon/Boots +30",
              },
              delta: {
                vi: "Mở khóa 2 Huy hiệu Bậc Thầy Cường Hóa +30",
                en: "Unlocks 2 Enhancement Master +30 Badges",
              },
            },
            {
              label: {
                vi: "Hiệu Quả Lực Chiến Thực Tế Toàn Đội 1",
                en: "Effective Queue 1 Combat Power Gain",
              },
              before: {
                vi: "Nghẽn cổ chai ở 1 tướng lẻ, tuyến trước bốc hơi sớm",
                en: "Single-hero bottleneck, frontline collapses early",
              },
              after: {
                vi: "Đồng bộ công thủ 4 trụ cột Đội 1 trong GAR Ngày 4",
                en: "Synchronized offense & defense across 4 Queue 1 pillars",
              },
              delta: {
                vi: "+38% Sức mạnh thực chiến so với Phương án A",
                en: "+38% Effective Combat Power vs Option A",
              },
            },
          ],
          diagnostics: [
            {
              vi: "**Bẫy Lv.18 Vũ khí Độc quyền**:\n• Đẩy 1 vũ khí từ `Lv.5` (75 Mảnh) lên Lv.18 (905 Mảnh) ngốn tới 830 mảnh nhưng chưa chạm `Lv.20` (1,185 Mảnh), làm lỡ kỹ năng Bậc 2 (`Lv.10` = 275 Mảnh) cho Carry số 2 và Main Tank.",
              en: "**The Lv.18 Exclusive Weapon Trap**:\n• Pushing a single weapon from `Lv.5` (75 Shards) to Lv.18 (905 Shards) consumes 830 shards without reaching `Lv.20` (1,185 Shards), starving Carry #2 and Main Tank of `Lv.10` (275 Shards) skills.",
            },
            {
              vi: "**Bẫy lệch cấp `+40`/`+20`**:\n• Đập Kiếm + Giày từ `+20` lên `+40` ngốn 270,000 Quặng (`135,000`/món), nhưng vì Mũ + Giáp vẫn ở `+20` nên hệ thống chỉ ghi nhận cấp thấp nhất là `20` — mất trắng Bậc Thầy Cường Hóa `+30`.",
              en: "**The `+40`/`+20` Split-Level Trap**:\n• Pushing Weapon + Boots from `+20` to `+40` burns 270,000 Runes (`135,000`/piece), yet leaving Helmet + Chestplate at `+20` restricts evaluation to `20`—forfeiting the `+30` Enhancement Master bonus.",
            },
          ],
          recoverySteps: [
            {
              stepNumber: "1",
              title: {
                vi: "Phân Bổ 825/850 Mảnh Vũ Khí Theo Điểm Gãy Vàng Lv.10 & Lv.5",
                en: "Allocate 825/850 Weapon Shards Across Lv.10 & Lv.5 Breakpoints",
              },
              detail: {
                vi: "• **3 trụ cột chạm `Lv.10`**: Dùng 200 mảnh đẩy Carry #1 từ `Lv.5➔Lv.10` (275 Mảnh), 275 mảnh đẩy Carry #2 lên `Lv.10`, và 275 mảnh đẩy Main Tank lên `Lv.10`.\n• **Hỗ trợ chạm `Lv.5`**: Dùng 75 mảnh đẩy Healer chạm mốc `Lv.5` (tổng tốn 825 mảnh, giữ lại 25 mảnh dư).",
                en: "• **3 Pillars to `Lv.10`**: Spend 200 shards pushing Carry #1 from `Lv.5➔Lv.10` (275 Shards), 275 shards pushing Carry #2 to `Lv.10`, and 275 shards pushing Main Tank to `Lv.10`.\n• **Healer to `Lv.5`**: Spend 75 shards bringing Healer to `Lv.5` (825 shards spent, 25 shards banked).",
              },
              impactBadge: {
                vi: "3 Kỹ năng Lv.10 + 1 Kỹ năng Lv.5",
                en: "3 Lv.10 Skills + 1 Lv.5 Skill",
              },
            },
            {
              stepNumber: "2",
              title: {
                vi: "Phân Bổ 585,000/600,000 Quặng Mở Khóa 2 Bộ Bậc Thầy Cường Hóa +30",
                en: "Allocate 585,000/600,000 Runes to Unlock Two Full +30 Enhancement Master Sets",
              },
              detail: {
                vi: "• **2 Bộ Full `+30`**: Chi 234,000 Quặng (`58,500 × 4` món) đẩy bộ 4 món Carry #1 từ `+20` lên `+30`; chi tiếp 234,000 Quặng đẩy 4 món Main Tank lên `+30`.\n• **Bước đệm Carry #2**: Dùng 117,000 Quặng còn lại (tổng 585,000 Quặng) nâng Kiếm + Giày của Carry #2 lên `+30`.",
                en: "• **Two Full `+30` Sets**: Spend 234,000 Runes (`58,500 × 4` pieces) bringing Carry #1's 4 pieces from `+20` to Full `+30`; spend another 234,000 Runes bringing Main Tank's 4 pieces to Full `+30`.\n• **Carry #2 Prep**: Use 117,000 remaining Runes (585,000 total) to upgrade Carry #2's Weapon + Boots to `+30`.",
              },
              impactBadge: {
                vi: "2 Huy hiệu Cộng hưởng +30",
                en: "2 Full +30 Resonance Badges",
              },
            },
          ],
          conclusion: {
            vi: "• **Hiệu quả vượt trội**: Với cùng ngân sách 850 Mảnh Vũ khí và 600,000 Quặng Cường Hóa trong GAR Day 4, Phương án B giúp lực chiến thực tế PvP tăng cao hơn `+38%` so với Phương án A.\n• **Đột biến toàn đội**: Kích hoạt đồng loạt `3` kỹ năng đột phá `Lv.10` (`+1,500` Defense Break, `+15%` ATK, `+30%` HP) và `2` Huy hiệu Bậc Thầy Cường Hóa `+30`.",
            en: "• **Superior ROI**: Using the exact same budget of 850 Weapon Shards and 600,000 Upgrade Runes on GAR Day 4, Option B delivers `+38%` higher effective PvP combat power than Option A.\n• **Squad-Wide Spike**: Unlocks `3` simultaneous `Lv.10` weapon breakthroughs (`+1,500` Defense Break, `+15%` ATK, `+30%` HP) and `2` Enhancement Master `+30` badges.",
          },
        },
      ],
    },
  ],
};

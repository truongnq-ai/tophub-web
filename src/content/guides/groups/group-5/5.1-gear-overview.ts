import type { GuideArticle } from "../../types";

export const ARTICLE_5_1_GEAR_OVERVIEW: GuideArticle = {
  code: "5.1",
  slug: "gear-overview",
  categorySlug: "gear",
  badge: "FREE",
  readingMinutes: 9,
  title: {
    vi: "Tổng Quan 3 Hệ Thống Trang Bị: Đồ Tướng, Vũ Khí Độc Quyền & Đồ Chúa Tể",
    en: "3 Equipment Systems Overview: Hero Gear, Exclusive Weapons & Lord Gear",
  },
  summary: {
    vi: "Phân biệt rõ 3 hệ thống trang bị độc lập trong Top Heroes (Trang bị Tướng 24 món, Vũ khí Độc quyền 6 món, Trang bị Chúa Tể 6 món), nguyên tắc dồn 100% Thỏi Vàng (Gold Ingots) & Quặng Cường Hóa (Upgrade Runes) cho Đội 1, quy trình tái chế đồ Tím 100% và sự khác biệt giữa 0 điểm sự kiện khi đúc/đập Quặng Lv.0➔+40 với điểm lớn của Đá Thăng Cấp Sao & Đồ Chúa Tể.",
    en: "Master the 3 independent equipment systems in Top Heroes (24 Hero Gear pieces, 6 Exclusive Weapons, 6 Lord Gear pieces), the strict Queue 1 Faction-marked Golden Gear funnel using Gold Ingots and Upgrade Runes, the 100% Epic gear recycling protocol, and the 0-point vs. high-point event scoring distinction.",
  },
  tldr: {
    coreRule: {
      vi: "**Top Heroes vận hành `3` hệ thống trang bị hoàn toàn độc lập với nguyên liệu và luật điểm sự kiện riêng biệt:**\n• **Trang bị Tướng (`24` món Đội 1) & Đồ Chúa Tể (`6` món):** Đồ Tướng cộng riêng lẻ, còn Đồ Chúa Tể cộng chỉ số toàn cục cho cả `3` Phe.\n• **Vũ khí Độc quyền (`1` món/tướng Vàng/Đỏ):** Tướng Tím kinh tế như `Brawler` (Đấu Sĩ `+30%` Tốc độ Nghiên cứu) tuyệt đối không có Vũ khí Độc quyền.",
      en: "**Top Heroes operates `3` independent equipment systems with distinct materials and event scoring rules:**\n• **Hero Gear (`24` Queue 1 pieces) & Lord Gear (`6` global slots):** Hero Gear buffs the wearer, while Lord Gear grants global passive stats across all `3` Factions.\n• **Exclusive Weapons (`1` per Legendary/Mythic hero):** Economy Epics like `Brawler` (`+30%` Research Speed) do not possess an Exclusive Weapon.",
    },
    immediateAction: {
      vi: "**Dồn `100%` Thỏi Vàng (Gold Ingots) và Quặng Cường Hóa (Upgrade Runes) cho `24` món Vàng Đội 1:**\n• **Rèn đúng Dấu Hệ (`+30%`):** Chế tạo đủ `24` món Trang bị Vàng có Dấu Hệ cho duy nhất Đội hình 1 (Main Queue).\n• **Đập ngay không cần chờ sự kiện:** Đúc đồ Vàng và Cường hóa `Lv.0` ➔ `Lv.40` cho `0` điểm Arms Race / KvK ➔ nâng ngay khi đủ mốc `+10`/`+20`/`+30`/`+40`.",
      en: "**Funnel `100%` of Gold Ingots and Upgrade Runes into `24` Faction-marked Golden Gear pieces for Queue 1:**\n• **Forge with Faction Mark (`+30%`):** Craft all `24` Faction-marked Golden Gear pieces exclusively for Queue 1.\n• **Upgrade immediately (`0` event points):** Forging Golden Gear and enhancing `Lv.0` ➔ `Lv.40` grant `0` points in Arms Race / KvK ➔ upgrade right away at `+10`/`+20`/`+30`/`+40`.",
    },
    strictTaboo: {
      vi: "**Tuyệt đối cấm phân tán Thỏi Vàng sang Đội 2 hoặc xả nguyên liệu ăn điểm ngoài ngày sự kiện:**\n• **Cấm rèn đồ Vàng Đội 2 sớm:** Đột phá `1★` ➔ `5★` Đỏ tốn `6,000` Thỏi Vàng/món (`144,000` Thỏi Vàng/24 món); giữ Đội 2/3 ở cấp `+0`.\n• **Cấm xả lẻ nguyên liệu sự kiện:** Khóa chặt Đá Thăng Cấp (`1★`–`5★` sau `Lv.40`), Mảnh Vũ Khí (`275` / `1,185` mảnh & `920` Lõi Sắt) và Đồ Chúa Tể chờ ngày Double-Dip.",
      en: "**Never divert Gold Ingots to Queue 2 or spend high-scoring materials outside Double-Dip events:**\n• **No early Queue 2 Golden Gear:** `1★` ➔ `5★` Mythic promotion costs `6,000` Gold Ingots/piece (`144,000` Gold Ingots/24 pieces); freeze Queue 2/3 at `+0`.\n• **No off-event material dumps:** Strictly hoard Gear Promotion Stones (`1★`–`5★` after `Lv.40`), Exclusive Weapon Shards (`275` / `1,185` shards & `920` Meteoric Iron Cores), and Lord Gear.",
    },
  },
  keyTakeaways: [
    {
      vi: "**Quy tắc `0` Điểm vs Điểm Cực Lớn:** Đúc Đồ Vàng và Cường hóa `Lv.0` ➔ `Lv.40` cho `0` ĐIỂM sự kiện — hãy đập ngay khi đủ mốc `+10`/`+20`/`+30`/`+40`.\n• **Chi phí `Lv.0` ➔ `Lv.40`:** Tốn `195,000` Quặng + `936,000` Ruby/món (`4,680,000` Quặng + `22,464,000` Ruby cho `24` món Đội 1).\n• **Nguyên liệu cộng điểm lớn:** Chỉ Đá Thăng Cấp Trang Bị (Gear Promotion Stones `1★`–`5★` sau `Lv.40`) mới cộng điểm lớn trong Arms Race / KvK!",
      en: "**The `0` Points vs. Massive Points Rule:** Forging Golden Gear and enhancing `Lv.0` ➔ `Lv.40` yield `0` POINTS in events — upgrade immediately at `+10`/`+20`/`+30`/`+40`.\n• **`Lv.0` ➔ `Lv.40` Cost:** Requires `195,000` Upgrade Runes + `936,000` Rubies/piece (`4,680,000` Upgrade Runes + `22,464,000` Rubies across `24` Queue 1 pieces).\n• **High-Scoring Materials:** Only Gear Promotion Stones (`1★`–`5★` after `Lv.40`) score massive points in Arms Race / KvK!",
    },
    {
      vi: "**Tái chế Đồ Tím hoàn trả `100%` Quặng:** Phân giải (Dismantle / Recycle) đồ Tím/Xanh đã cường hóa trong Lò Rèn hoàn trả trọn vẹn `100%` Quặng Cường Hóa.\n• **Dồn tài nguyên tuyệt đối:** Chuyển toàn bộ Quặng thu hồi sang đồ Vàng Đội 1 và khóa cứng trang bị Đội 2/3 ở cấp `+0`.",
      en: "**`100%` Upgrade Rune Recycling:** Dismantling enhanced Epic or Rare gear at the Blacksmith refunds `100%` of invested Upgrade Runes.\n• **Strict Queue 1 Funnel:** Transfer all recovered Runes directly into Queue 1 Golden Gear and keep all Queue 2/3 equipment locked at `+0`.",
    },
    {
      vi: "**Tổng cầu tài nguyên Đội 1 ở bậc tối đa (`Max Tier`):**\n• **Đột phá Đồ Đỏ `5★` (`24` món):** Tốn `144,000` Thỏi Vàng + `12,000,000` Quặng + `575.52M` Ruby + `1,200` Đá Vàng + `240` Đá Đỏ.\n• **Vũ khí Độc quyền (`6` tướng):** Tốn `1,650` Mảnh ở mốc `Lv.10` (`275` mảnh/tướng) hoặc `7,110` Mảnh ở `Lv.20` (`1,185` mảnh/tướng), cộng `920` Lõi Sắt Thiên Thạch (`1★`–`5★`).\n• **Đồ Chúa Tể (`6` món):** Tốn `958,800` Thép/món = `5,752,800` Thép + `59,730` Dây Gai + `12,180` Bản Vẽ + `606` Máu Rồng.",
      en: "**Queue 1 Max-Tier Resource Demand:**\n• **`5★` Mythic Gear (`24` pieces):** Costs `144,000` Gold Ingots + `12,000,000` Upgrade Runes + `575.52M` Rubies + `1,200` Legendary Stones + `240` Mythic Stones.\n• **Exclusive Weapons (`6` heroes):** Costs `1,650` Shards at `Lv.10` (`275` shards/hero) or `7,110` Shards at `Lv.20` (`1,185` shards/hero), plus `920` Meteoric Iron Cores (`1★`–`5★`).\n• **Lord Gear (`6` pieces):** Costs `958,800` Refined Metal/piece = `5,752,800` Refined Metal + `59,730` Magic Thread + `12,180` Blueprints + `606` Dragon Blood.",
    },
  ],
  keywords: [
    "trang bị",
    "trang bi",
    "hero gear",
    "exclusive weapon",
    "vũ khí độc quyền",
    "vu khi doc quyen",
    "lord gear",
    "trang bị chúa tể",
    "đồ lãnh chúa",
    "gold ingots",
    "thỏi vàng",
    "upgrade runes",
    "quặng cường hóa",
    "gear promotion stones",
    "đá thăng cấp",
    "refined metal",
    "thép tinh luyện",
    "dismantle",
    "phân giải",
    "tái chế",
    "brawler",
    "đấu sĩ",
  ],
  sourceFiles: [
    "docs/06-game-guides/07-standardized-web-guides/group-5-gear-and-weapons/5.1-gear-overview.md",
    "docs/06-game-guides/07-standardized-web-guides/group-8-infrastructure/8.4-master-data-tables.md",
  ],
  freeSections: [
    {
      id: "sec-1-three-independent-gear-systems",
      title: {
        vi: "1. Giải thích Cơ chế Cốt lõi: Phân Biệt 3 Hệ Thống Trang Bị Độc Lập",
        en: "1. Core Mechanics: Distinguishing the 3 Independent Equipment Systems",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "**Sai lầm lớn nhất của tân thủ là nhầm lẫn các tầng trang bị trong Top Heroes:**\n• **Ba hệ thống tách biệt hoàn toàn:** Khác biệt từ giao diện, nguyên liệu chế tạo đến phạm vi cộng chỉ số và cơ chế tính điểm sự kiện tuần.",
            en: "**The biggest pitfall for newer players is confusing the equipment layers in Top Heroes:**\n• **Three completely separate systems:** Distinct interfaces, crafting materials, stat buff scopes, and weekly event scoring rules.",
          },
        },
        {
          type: "media_spotlight",
          mediaCode: "MED-5.1-01",
          tier: "tier2_annotated_ui",
          title: {
            vi: "Bộ Icon Chuẩn Hóa 3 Nhóm Nguyên Liệu Trang Bị & Quy Tắc Điểm Sự Kiện",
            en: "Standardized Material Icons Across the 3 Equipment Systems & Event Scoring Rules",
          },
          description: {
            vi: "Phân biệt 3 luồng nguyên liệu cốt lõi: Thỏi Vàng (Gold Ingots) & Quặng Cường Hóa (Upgrade Runes) cho Đồ Tướng (0 điểm sự kiện ở Lv.0 ➔ Lv.40), Mảnh Vũ Khí Độc Quyền (Exclusive Weapon Shards — 275 mảnh đạt Lv.10, 1,185 mảnh đạt Lv.20) và Thép Tinh Luyện Chúa Tể (Refined Metal — cộng điểm cực lớn).",
            en: "Distinguishing the 3 core material streams: Gold Ingots & Upgrade Runes for Hero Gear (0 event points from Lv.0 ➔ Lv.40), Exclusive Weapon Shards (275 shards for Lv.10, 1,185 shards for Lv.20), and Lord Gear Refined Metal (massive event points).",
          },
          annotations: [
            {
              kind: "do",
              label: {
                vi: "Thỏi Vàng (Gold Ingots) & Quặng Cường Hóa (Lv.0 ➔ Lv.40): 0 Điểm Sự Kiện — Đập Ngay!",
                en: "Gold Ingots & Upgrade Runes (Lv.0 ➔ Lv.40): 0 Event Points — Upgrade Immediately!",
              },
              detail: {
                vi: "Đúc Trang bị Vàng trong Lò Rèn và Cường hóa từ Lv.0 lên Lv.40 (195,000 Quặng + 936,000 Ruby/món) hoàn toàn không cộng điểm trong Arms Race hay KvK. Hãy rèn và nâng ngay khi đủ mốc +10/+20/+30/+40 để vượt ải!",
                en: "Forging Golden Gear at the Blacksmith and enhancing from Lv.0 to Lv.40 (195,000 Upgrade Runes + 936,000 Rubies per piece) grant 0 points in Arms Race or KvK. Craft and enhance immediately at +10/+20/+30/+40 resonance brackets!",
              },
            },
            {
              kind: "info",
              label: {
                vi: "Đá Thăng Cấp Trang Bị (Gear Promotion Stones 1★–5★ sau Lv.40): Tích Trữ Chờ Sự Kiện",
                en: "Gear Promotion Stones (1★–5★ Star Promotion after Lv.40): Hoard for Events",
              },
              detail: {
                vi: "Sau khi món đồ Vàng chạm trần Lv.40, quá trình đột phá Sao từ 1★ lên 5★ Đỏ Thần Thoại tiêu thụ Đá Thăng Cấp Vàng/Đỏ (50 Đá Vàng + 10 Đá Đỏ/món) và cộng điểm sự kiện cực lớn.",
                en: "Once a Golden Gear piece hits Lv.40, promoting it from 1★ to 5★ Mythic consumes Legendary/Mythic Promotion Stones (50 Legendary + 10 Mythic Stones per piece) and yields massive event points.",
              },
            },
            {
              kind: "do",
              label: {
                vi: "Mảnh Vũ Khí Độc Quyền (275 / 1,185 Mảnh) & Thép Tinh Luyện Chúa Tể: Khóa Kho Chờ Double-Dip",
                en: "Exclusive Weapon Shards (275 / 1,185 Shards) & Lord Gear Refined Metal: Lock for Double-Dip",
              },
              detail: {
                vi: "Xả Mảnh Vũ Khí Độc Quyền vào Thứ Năm Kỳ GAR/KvK (GAR Ngày 4 + Hero Development), và xả Nguyên liệu Đồ Chúa Tể vào Ngày 3–4 Kỳ GAR/KvK hoặc Ngày 5–7 Kỳ Thi Đấu Hội (Guild Race).",
                en: "Dump Exclusive Weapon Shards on Thursday of GAR/KvK (GAR Day 4 + Hero Development), and dump Lord Gear materials on Days 3–4 of GAR/KvK or Days 5–7 of Guild Race.",
              },
            },
          ],
          videoUrl: "https://www.youtube.com/watch?v=9xN0rK5pQ2M",
        },
      ],
      subSections: [
        {
          id: "sub-1-1-three-systems-breakdown",
          title: {
            vi: "1.1. Giải Phẫu Chi Tiết 3 Hệ Thống Trang Bị & Đính Chính Sai Lầm Về Đấu Sĩ (Brawler)",
            en: "1.1. Anatomy of the 3 Equipment Systems & Clarifying the Brawler Myth",
          },
          badge: {
            vi: "3 Hệ Thống Độc Lập",
            en: "3 Independent Systems",
          },
          blocks: [
            {
              type: "list",
              ordered: true,
              items: [
                {
                  vi: "**Trang Bị Tướng (`24` món Đội 1):** Gồm Kiếm/Giày (`ATK`) và Mũ/Giáp (`HP`) cho cá nhân tướng với `3` bộ Vàng: Huyết Titan (Tank), Kỵ Sĩ Vinh Quang (DPS) và Hiền Triết Quang Vinh (Support).",
                  en: "**Hero Gear (`24` Queue 1 pieces):** Includes Sword/Boots (`ATK`) and Helmet/Chestplate (`HP`) per hero across `3` Golden sets: Blood of the Titan (Tank), Knight's Glory (DPS), and Glory of the Sage (Support).",
                },
                {
                  vi: "**Vũ Khí Độc Quyền (`1` món/tướng Vàng/Đỏ):** Mở kỹ năng ở `Lv.5`, `Lv.10` (`275` mảnh), `Lv.15`, `Lv.20` (`1,185` mảnh) & `1★`–`5★` (`920` Lõi Sắt); tướng Tím `Brawler` (`+30%` Nghiên cứu) không có ô này!",
                  en: "**Exclusive Weapon (`1` per Gold/Red hero):** Unlocks skills at `Lv.5`, `Lv.10` (`275` shards), `Lv.15`, `Lv.20` (`1,185` shards) & `1★`–`5★` (`920` Cores); Epic `Brawler` (`+30%` Research Speed) has none!",
                },
                {
                  vi: "**Trang Bị Chúa Tể (`6` món Hồ sơ Lãnh Chúa):** Chia đều `2` Liên Minh, `2` Bộ Lạc, `2` Thiên Nhiên ➔ cộng chỉ số Toàn cục (Global Passive Buff) cho cả `3` Phe và bật hào quang `3`/`6` món.",
                  en: "**Lord Gear (`6` Lord Profile slots):** Split into `2` League, `2` Horde, and `2` Nature pieces ➔ grants Global Passive Buffs across all `3` Factions and activates `3`-piece / `6`-piece resonance auras.",
                },
              ],
            },
          ],
        },
        {
          id: "sub-1-2-three-systems-comparison-table",
          title: {
            vi: "1.2. Bảng Đối Chiếu 5 Tiêu Chí Giữa 3 Hệ Thống Trang Bị",
            en: "1.2. 5-Criteria Comparison Matrix Across the 3 Equipment Systems",
          },
          badge: {
            vi: "Bảng Đối Chiếu",
            en: "Comparison Matrix",
          },
          blocks: [
            {
              type: "table",
              caption: {
                vi: "Đối Chiếu Toàn Diện 3 Hệ Thống Trang Bị: Phạm Vi Tác Dụng, Nguyên Liệu & Quy Tắc Điểm Sự Kiện",
                en: "Complete Comparison of the 3 Equipment Systems: Scope, Materials & Weekly Event Scoring Rules",
              },
              headers: [
                {
                  vi: "Tiêu chí Đối chiếu",
                  en: "Comparison Criterion",
                },
                {
                  vi: "1. Trang Bị Tướng (Hero Gear)",
                  en: "1. Hero Gear (24 Pieces)",
                },
                {
                  vi: "2. Vũ Khí Độc Quyền (Exclusive Weapon)",
                  en: "2. Exclusive Weapon (6 Pieces)",
                },
                {
                  vi: "3. Trang Bị Chúa Tể (Lord Gear)",
                  en: "3. Lord Gear (6 Global Pieces)",
                },
              ],
              rows: [
                [
                  {
                    vi: "Số lượng cần quản lý",
                    en: "Total Pieces Managed",
                  },
                  {
                    vi: "24 món cho Đội 1 (4 món × 6 tướng)",
                    en: "24 pieces for Queue 1 (4 pieces × 6 heroes)",
                  },
                  {
                    vi: "6 món cho 6 tướng Đội 1 (1 món/tướng Vàng/Đỏ)",
                    en: "6 weapons for Queue 1 (1 per Legendary/Mythic hero)",
                  },
                  {
                    vi: "6 món cố định trên Hồ sơ Lãnh Chúa (2 món × 3 Phe)",
                    en: "6 fixed slots on the Lord Profile (2 pieces × 3 Factions)",
                  },
                ],
                [
                  {
                    vi: "Phạm vi cộng chỉ số",
                    en: "Stat Buff Scope",
                  },
                  {
                    vi: "Cá nhân vị tướng đang mặc món trang bị đó",
                    en: "Strictly the individual hero wearing the piece",
                  },
                  {
                    vi: "Cá nhân tướng sở hữu + Mở khóa kỹ năng đột phá Lv.5/10/15/20",
                    en: "Individual owner + Exclusive Passive breakpoints at Lv.5/10/15/20",
                  },
                  {
                    vi: "Toàn cục (Global Passive Buff) cho toàn bộ Tướng & Lính của cả 3 Phe",
                    en: "Global Passive Buff to all Heroes & Soldiers across all 3 Factions",
                  },
                ],
                [
                  {
                    vi: "Nguyên liệu nâng cấp",
                    en: "Upgrade Materials",
                  },
                  {
                    vi: "Thỏi Vàng (Gold Ingots), Quặng Cường Hóa (Upgrade Runes), Ruby, Đá Thăng Cấp (Gear Promotion Stones)",
                    en: "Gold Ingots, Upgrade Runes, Rubies, Gear Promotion Stones (Legendary/Mythic)",
                  },
                  {
                    vi: "Mảnh Vũ Khí Độc Quyền (Exclusive Weapon Shards: 275 mảnh Lv.10 / 1,185 mảnh Lv.20) & Lõi Sắt Thiên Thạch (920 Lõi cho 1★–5★)",
                    en: "Exclusive Weapon Shards (275 shards Lv.10 / 1,185 shards Lv.20) & Meteoric Iron Cores (920 Cores for 1★–5★)",
                  },
                  {
                    vi: "Thép Tinh Luyện (Refined Metal), Dây Gai Ma Thuật (Magic Thread), Bản Vẽ / Orichalcum (Blueprints), Máu Rồng (Dragon Blood)",
                    en: "Refined Metal, Magic Thread, Blueprints / Orichalcum, Dragon Blood",
                  },
                ],
                [
                  {
                    vi: "Có tính điểm Sự kiện Tuần (GAR / KvK / Guild Race) không?",
                    en: "Scores Weekly Event Points (GAR / KvK / Guild Race)?",
                  },
                  {
                    vi: "0 ĐIỂM khi Đúc Trang bị Vàng (Gold Ingots) và Cường hóa (Lv.0 ➔ Lv.40 bằng Quặng Cường Hóa). Riêng Đá Thăng Cấp Trang Bị (Gear Promotion Stones khi đột phá Sao 1★–5★ sau Lv.40) mới cộng điểm lớn!",
                    en: "0 POINTS when forging Golden Gear (Gold Ingots) and enhancing (Lv.0 ➔ Lv.40 with Upgrade Runes). Only Gear Promotion Stones (1★–5★ Star Promotion after Lv.40) grant massive event points!",
                  },
                  {
                    vi: "CÓ TÍNH ĐIỂM trong Ngày Phát Triển Anh Hùng (Thứ Năm Kỳ GAR/KvK — Ngày 4) và sự kiện phụ Hero Development.",
                    en: "SCORES HIGH POINTS on Hero Development Day (Thursday of GAR/KvK — Day 4) and Hero Development side events.",
                  },
                  {
                    vi: "TÍNH ĐIỂM CỰC LỚN trong cả Kỳ Thi Đấu Hội (Nhiệm vụ Vàng Guild Race Ngày 5–7 & Guild Rush) và Kỳ GAR/KvK (GAR Ngày 3 & 4 / KvK Ngày 3–5).",
                    en: "SCORES MASSIVE POINTS in both Guild Race (Days 5–7 Gold Tasks & Guild Rush) and GAR/KvK (GAR Days 3–4 / KvK Days 3–5).",
                  },
                ],
                [
                  {
                    vi: "Kỷ luật nâng cấp tối ưu",
                    en: "Optimal Upgrade Discipline",
                  },
                  {
                    vi: "Đúc đồ Vàng và Cường hóa ngay lập tức khi đủ mốc cộng hưởng +10/+20/+30/+40 để vượt ải; riêng Đá Thăng Cấp (1★–5★) phải tích trữ chờ sự kiện.",
                    en: "Forge Golden Gear and enhance immediately at +10/+20/+30/+40 resonance milestones to push stages; strictly hoard Promotion Stones (1★–5★) for events.",
                  },
                  {
                    vi: "Tích trữ 100% và xả đồng loạt vào Thứ Năm Kỳ GAR/KvK hoặc khi trùng sự kiện Hero Development.",
                    en: "Hoard 100% and dump in bursts on Thursday of GAR/KvK or during active Hero Development events.",
                  },
                  {
                    vi: "Tích trữ nghiêm ngặt 100% — Tuyệt đối chỉ bấm nâng cấp khi trùng ngày sự kiện ăn điểm kép (Double-Dip).",
                    en: "Strictly hoard 100% — Only click upgrade during active Double-Dip event windows.",
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: "sec-2-strict-24-golden-gear-and-epic-recycling",
      title: {
        vi: "2. Chiến thuật Tối ưu cho F2P & Low-Spender: Lộ Trình 24 Món Vàng Đội 1 & Xử Lý Đồ Tím (100% Recycle)",
        en: "2. F2P & Low-Spender Strategy: Queue 1's 24 Golden Pieces Funnel & 100% Epic Gear Recycling",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "**Người chơi F2P và Nạp ít (`$0.99` – `$9.99`) luôn bị giới hạn sản lượng Lò Rèn và mỏ quặng:**\n• **Quy tắc 1 Đội hình Tuyệt đối (`Strict 1-Queue Rule`):** Bắt buộc dồn `100%` tài nguyên trang bị cho Đội 1 để tối đa hóa lực chiến thực tế.",
            en: "**F2P and Low-Spender players (`$0.99` – `$9.99`) face strict Blacksmith and ore mine output caps:**\n• **Enforce the `Strict 1-Queue Rule`:** Funnel `100%` of equipment upgrades into Queue 1 to maximize real combat power.",
          },
        },
        {
          type: "media_spotlight",
          mediaCode: "MED-5.1-02",
          tier: "tier2_annotated_ui",
          title: {
            vi: "Ảnh Ghép 3 Khung Giao Diện: Hero Gear, Lord Profile & Nút Phân Giải (Dismantle) Hoàn Trả 100% Quặng",
            en: "3-Panel UI Composite: Hero Gear Menu, Lord Profile & Blacksmith 100% Upgrade Rune Dismantle",
          },
          description: {
            vi: "Đối chiếu trực quan vị trí của 4 ô Trang bị Tướng + 1 ô Vũ khí Độc quyền trong Hero Menu, 6 ô Trang bị Chúa Tể trong Lord Profile, và tính năng Phân giải (Dismantle / Recycle) trong Lò Rèn hoàn trả 100% Quặng Cường Hóa.",
            en: "Visual guide to the 4 Hero Gear slots + 1 Exclusive Weapon slot inside the Hero Menu, the 6 Lord Gear slots inside the Lord Profile, and the Blacksmith Dismantle / Recycle button refunding 100% of Upgrade Runes.",
          },
          annotations: [
            {
              kind: "do",
              label: {
                vi: "Khung 1 (Hero Menu): 24 Món Vàng Có Dấu Hệ (+30%) Cho Duy Nhất Đội 1",
                en: "Panel 1 (Hero Menu): 24 Faction-Marked (+30%) Golden Pieces Exclusively for Queue 1",
              },
              detail: {
                vi: "Mỗi tướng Đội 1 mặc trọn bộ 4 món Vàng cùng tên có gắn đúng Dấu Hệ (+30% Faction Mark Bonus) và mở khóa 1 ô Vũ khí Độc quyền riêng.",
                en: "Equip each Queue 1 hero with a full 4-piece matching Golden Gear set bearing their +30% Faction Mark Bonus alongside their dedicated Exclusive Weapon slot.",
              },
            },
            {
              kind: "info",
              label: {
                vi: "Khung 2 (Lord Profile): 6 Ô Trang Bị Chúa Tể Cộng Chỉ Số Toàn Cục Cho 3 Phe",
                en: "Panel 2 (Lord Profile): 6 Global Lord Gear Slots Buffing All 3 Factions",
              },
              detail: {
                vi: "Bấm vào Avatar góc trên bên trái để mở 6 ô Đồ Chúa Tể (2 Liên Minh, 2 Bộ Lạc, 2 Thiên Nhiên) và kích hoạt hào quang cộng hưởng 3 món / 6 món.",
                en: "Tap the top-left Avatar to access the 6 Lord Gear slots (2 League, 2 Horde, 2 Nature) and trigger 3-piece and 6-piece tier resonance auras.",
              },
            },
            {
              kind: "do",
              label: {
                vi: "Khung 3 (Blacksmith Dismantle): Phân Giải Đồ Tím Thu Hồi 100% Quặng Cường Hóa",
                en: "Panel 3 (Blacksmith Dismantle): Recycle Epic Gear for a 100% Upgrade Rune Refund",
              },
              detail: {
                vi: "Mọi món đồ Tím/Xanh từng đập lên +10 trong 14 ngày đầu khi đưa vào Lò Rèn bấm Phân Giải (Dismantle) sẽ hoàn trả 100% Quặng Cường Hóa để dồn thẳng sang Đồ Vàng Đội 1.",
                en: "Any Epic or Rare gear enhanced to +10 during the first 14 days refunds 100% of invested Upgrade Runes when dismantled at the Blacksmith for immediate transfer into Queue 1 Golden Gear.",
              },
            },
          ],
        },
      ],
      subSections: [
        {
          id: "sub-2-1-queue1-24-golden-pieces-roadmap",
          title: {
            vi: "2.1. Nguyên Tắc \"24 Món Vàng Đội 1 Trước Khi Nhìn Sang Đội 2\" & Mẹo Chuyển Hệ Bộ Lạc",
            en: "2.1. The \"24 Queue 1 Golden Pieces Before Touching Queue 2\" Rule & Horde Pivot Trick",
          },
          badge: {
            vi: "Lộ Trình 24 Món Vàng",
            en: "24-Piece Funnel",
          },
          blocks: [
            {
              type: "roadmap",
              steps: [
                {
                  badge: {
                    vi: "Giai đoạn 1 (Ngày 1–14)",
                    en: "Stage 1 (Days 1–14)",
                  },
                  title: {
                    vi: "Mặc Tạm Đồ Tím +10 Cho Đội 1 & Chạy Lò Rèn 24/7 Đúc Thỏi Vàng",
                    en: "Equip Temporary +10 Epic Gear on Queue 1 & Run Blacksmith 24/7 for Gold Ingots",
                  },
                  timing: {
                    vi: "2 Tuần Đầu Server",
                    en: "First 2 Server Weeks",
                  },
                  description: {
                    vi: "**Trang bị quá độ cho Đội 1:** Mặc tạm bộ Trang bị Tím (Epic Gear) nâng lên mốc `+10` để vượt ải Adventure Mode.\n• **Chạy Lò Rèn `24/7`:** Liên tục chế tạo Thỏi Đồng ➔ Thỏi Tím (Amethyst) ➔ Thỏi Vàng (Gold Ingots).",
                    en: "**Transitional Queue 1 setup:** Equip Queue 1 with temporary `+10` Epic Gear to clear Adventure Mode stages.\n• **Run Blacksmith `24/7`:** Continuously smelt Bronze ➔ Amethyst ➔ Gold Ingots.",
                  },
                },
                {
                  badge: {
                    vi: "Giai đoạn 2 (Tuần 3+)",
                    en: "Stage 2 (Week 3+)",
                  },
                  title: {
                    vi: "Đúc Đủ 24 Món Vàng Có Dấu Hệ (+30%) Cho 6 Tướng Đội 1 (Áp Dụng Cả 3 Phe)",
                    en: "Forge All 24 Faction-Marked (+30%) Golden Pieces for Queue 1 Across All 3 Factions",
                  },
                  timing: {
                    vi: "Mục Tiêu Cốt Lõi Đầu & Giữa Game",
                    en: "Core Early-to-Mid Game Goal",
                  },
                  description: {
                    vi: "**Đúc đủ `24` món Vàng đúng Dấu Hệ (`+30%`) cho Đội 1:**\n• **Liên Minh (League):** Khiên Xanh cho Adjudicator, Rose Princess, Paragon, Pyromancer, Nun, Bishop / Bard.\n• **Bộ Lạc (Horde):** Lửa Đỏ cho Desert Prince, Beastmaster, Wukong, Storm Maiden, Witch, Warlock / Soulmancer.\n• **Thiên Nhiên (Nature):** Lá Xanh cho Monk, Sage, Ne Zha, Tidecaller, Forest Maiden, Pixie / Petalis.",
                    en: "**Craft `24` Faction-Marked (`+30%`) Golden pieces for Queue 1:**\n• **League:** Blue-Shield pieces for Adjudicator, Rose Princess, Paragon, Pyromancer, Nun, Bishop / Bard.\n• **Horde:** Red-Flame pieces for Desert Prince, Beastmaster, Wukong, Storm Maiden, Witch, Warlock / Soulmancer.\n• **Nature:** Green-Leaf pieces for Monk, Sage, Ne Zha, Tidecaller, Forest Maiden, Pixie / Petalis.",
                  },
                },
                {
                  badge: {
                    vi: "Giai đoạn 3 (Chuyển Giao)",
                    en: "Stage 3 (Faction Pivot)",
                  },
                  title: {
                    vi: "Mẹo Đúc Sẵn Dấu Ấn Bộ Lạc (Cột 2) Cho Lộ Trình Khởi Đầu Liên Minh ➔ Bộ Lạc Ngày 21+",
                    en: "Pre-Crafting Column 2 Horde Marks for the League Starter ➔ Day 21+ Horde Pivot",
                  },
                  timing: {
                    vi: "Từ Tuần 3 Máy Chủ",
                    en: "Starting Server Week 3",
                  },
                  description: {
                    vi: "**Đúc trước Dấu Ấn Bộ Lạc (Cột 2) từ Tuần 3:**\n• **Mặc tạm trên tướng Liên Minh:** Pyromancer hay Adjudicator vẫn nhận đủ `100%` chỉ số gốc và Hiệu ứng Bộ `4` món.\n• **Chuyển giao tốn `0` Thỏi Vàng:** Khi mở khóa Desert Prince & Storm Maiden, tháo đồ sang là bật ngay `+30%` chỉ số hệ.",
                    en: "**Pre-select the Horde Faction Mark (Column 2) starting Week 3:**\n• **Temporary League wearers:** Pyromancer or Adjudicator still get `100%` base stats and full `4`-piece Set Bonuses.\n• **Zero-cost Horde pivot:** Transferring the gear onto Desert Prince & Storm Maiden immediately activates the `+30%` faction bonus.",
                  },
                },
              ],
            },
          ],
        },
        {
          id: "sub-2-2-epic-gear-100-percent-recycling",
          title: {
            vi: "2.2. Quy Trình Tái Chế Đồ Tím Hoàn Trả 100% Quặng & Kỷ Luật Đóng Băng Đội 2/3 Ở +0",
            en: "2.2. The 100% Epic Gear Recycling Protocol & Locking Queue 2/3 Gear at +0",
          },
          badge: {
            vi: "Hoàn Trả 100% Quặng",
            en: "100% Rune Refund",
          },
          blocks: [
            {
              type: "list",
              ordered: true,
              items: [
                {
                  vi: "**Bước 1 — Thay thế bằng Đồ Vàng:** Khi đúc xong bộ `4` món Vàng cho tướng Đội 1, tháo đồ Tím ra và chỉ cho Đội 2 / Đội 3 mặc đồ Tím `Lv.0` (`+0`) lấy chỉ số gốc.",
                  en: "**Step 1 — Golden Gear Replacement:** Once a `4`-piece Golden set is ready for Queue 1, unequip their Epic Gear and only place `Lv.0` (`+0`) Epic pieces on Queue 2/3.",
                },
                {
                  vi: "**Bước 2 — Phân giải thu hồi `100%` Quặng:** Đưa mọi món đồ Tím/Xanh từng đập lên `+10` vào Lò Rèn (Blacksmith) ➔ bấm Phân Giải / Tái Chế (Dismantle / Recycle).",
                  en: "**Step 2 — Dismantle for `100%` Rune Recovery:** Take any Epic/Rare piece previously enhanced to `+10` into the Blacksmith ➔ select Dismantle / Recycle.",
                },
                {
                  vi: "**Bước 3 — Dồn sang Đội 1 & Khóa Đội 2/3 ở `+0`:** Đập toàn bộ `100%` Quặng Cường Hóa thu hồi được vào đồ Vàng mới của Đội 1 và khóa cứng trang bị Đội 2/3 ở cấp `+0`.",
                  en: "**Step 3 — Funnel into Queue 1 & Freeze Queue 2/3 at `+0`:** Pour `100%` of refunded Upgrade Runes into Queue 1's Golden Gear and lock all Queue 2/3 equipment at `+0`.",
                },
              ],
            },
            {
              type: "callout",
              variant: "tip",
              title: {
                vi: "Quy Tắc Vàng: 0 Điểm Sự Kiện (Đúc Đồ Vàng & Đập Quặng Lv.0 ➔ Lv.40) vs Điểm Cực Lớn (Đá Thăng Cấp 1★–5★, Vũ Khí Độc Quyền & Đồ Chúa Tể)",
                en: "Golden Rule: 0 Event Points (Forging & Lv.0 ➔ Lv.40 Runes) vs. Massive Event Points (1★–5★ Promotion Stones, Exclusive Weapons & Lord Gear)",
              },
              content: {
                vi: "**Phân tách rõ nguyên liệu đập ngay và nguyên liệu tích sự kiện:**\n• **Nhóm `0` điểm sự kiện:** Đúc Đồ Vàng (Gold Ingots) và Cường hóa `Lv.0` ➔ `Lv.40` (Upgrade Runes) cho `0` điểm GAR / KvK ➔ đập ngay khi đủ mốc `+10`/`+20`/`+30`/`+40`!\n• **Nhóm điểm cực lớn:** Đá Thăng Cấp (`1★`–`5★` sau `Lv.40`), Mảnh Vũ Khí Độc Quyền (`275` mảnh `Lv.10` / `1,185` mảnh `Lv.20` & `920` Lõi Sắt) và Đồ Chúa Tể bắt buộc tích chờ ngày Double-Dip.",
                en: "**Strictly separate immediate-upgrade materials from event-hoarding materials:**\n• **`0` Event Point Group:** Forging Golden Gear (Gold Ingots) and enhancing `Lv.0` ➔ `Lv.40` (Upgrade Runes) grant `0` GAR / KvK points ➔ upgrade immediately at `+10`/`+20`/`+30`/`+40`!\n• **Massive Event Point Group:** Gear Promotion Stones (`1★`–`5★` after `Lv.40`), Exclusive Weapon Shards (`275` shards `Lv.10` / `1,185` shards `Lv.20` & `920` Cores), and Lord Gear must be hoarded for Double-Dip days.",
              },
            },
          ],
        },
        {
          id: "sub-2-3-daily-blacksmith-checklist",
          title: {
            vi: "2.3. Danh Sách Kiểm Tra Hành Động Hàng Ngày (Daily Blacksmith & Bag Audit Checklist)",
            en: "2.3. Daily Actionable Blacksmith & Bag Audit Checklist",
          },
          badge: {
            vi: "Checklist Hàng Ngày",
            en: "Daily Audit Checklist",
          },
          blocks: [
            {
              type: "checklist",
              checklistId: "gear-overview-daily-audit-v2",
              title: {
                vi: "Bảng Kiểm Tra Kỷ Luật Lò Rèn & Túi Đồ Trang Bị Hàng Ngày",
                en: "Daily Blacksmith Production & Equipment Bag Audit Checklist",
              },
              description: {
                vi: "Hoàn thành 5 bước kiểm tra dưới đây mỗi ngày để tối đa hóa sản lượng Thỏi Vàng, Quặng Cường Hóa và Ruby cho 24 món Đồ Vàng Đội 1:",
                en: "Complete these 5 daily audit steps to maximize Gold Ingot, Upgrade Rune, and Ruby production for Queue 1's 24 Golden Gear pieces:",
              },
              items: [
                {
                  id: "blacksmith-247-ingots",
                  label: {
                    vi: "Thu gom nguyên liệu Lò Rèn 24/7 (Thỏi Đồng ➔ Thỏi Tím ➔ Thỏi Vàng)",
                    en: "Keep Blacksmith Slots Running 24/7 (Bronze ➔ Amethyst ➔ Gold Ingots)",
                  },
                  detail: {
                    vi: "Luôn giữ các ô sản xuất trong Lò Rèn hoạt động liên tục để chế tạo Thỏi Vàng (Gold Ingots) phục vụ đúc 24 món Vàng Đội 1 và dự trữ 6,000 Thỏi Vàng/món cho giai đoạn Đột phá 1★–5★.",
                    en: "Keep all Blacksmith production queues active 24/7 crafting Gold Ingots for Queue 1's 24 Golden pieces and the 6,000 Gold Ingots per piece required for 1★–5★ Star Promotion.",
                  },
                  badge: {
                    vi: "Lò Rèn 24/7",
                    en: "24/7 Smelting",
                  },
                },
                {
                  id: "adventure-boss-rune-sweep",
                  label: {
                    vi: "Cày Quặng miễn phí từ Adventure Boss & Phân giải đồ Xanh/Tím",
                    en: "Sweep Adventure Bosses for Free Gear Fodder & Dismantle for Runes",
                  },
                  detail: {
                    vi: "Dùng thể lực dư đánh quét các Boss trong Bản đồ Phiêu lưu (Adventure Mode) để nhặt trang bị Xanh/Tím rơi ra, sau đó đem Phân giải lấy Quặng Cường Hóa.",
                    en: "Spend surplus stamina sweeping Adventure Mode bosses to farm Rare/Epic gear drops, then dismantle them at the Blacksmith for free Upgrade Runes.",
                  },
                  badge: {
                    vi: "Quặng Miễn Phí",
                    en: "Free Runes",
                  },
                },
                {
                  id: "overnight-ruby-mining",
                  label: {
                    vi: "Đào mỏ Ruby mỗi đêm cho lộ trình Lv.0 ➔ Lv.40 (22,464,000 Ruby) & 5★ Đỏ (575.52M Ruby)",
                    en: "Send Off-Queues to Mine Rubies Overnight for Lv.40 (22,464,000 Rubies) & 5★ (575.52M Rubies)",
                  },
                  detail: {
                    vi: "Gửi các đội hình phụ đi đào mỏ Ruby trên bản đồ thế giới trước khi đi ngủ vì nâng cấp 24 món từ +20 lên Lv.40 tốn 22,464,000 Ruby và đột phá 1★–5★ ngốn tới 575.52M Ruby.",
                    en: "Dispatch secondary queues to world-map Ruby nodes every night before sleep—enhancing 24 pieces to Lv.40 costs 22,464,000 Rubies and 1★–5★ promotion consumes 575.52M Rubies.",
                  },
                  badge: {
                    vi: "Dự Trữ Ruby",
                    en: "Ruby Reserve",
                  },
                },
                {
                  id: "bag-audit-epic-recycle",
                  label: {
                    vi: "Kiểm tra Túi đồ (Bag Audit) & Tái chế 100% đồ Tím/Xanh có cấp > 0 ở Đội 2/3",
                    en: "Run a Bag Audit & Recycle 100% of Enhanced (> +0) Epic/Rare Gear on Queue 2/3",
                  },
                  detail: {
                    vi: "Mở tab Trang bị trong Túi đồ, tìm toàn bộ các món đồ Tím/Xanh đang nằm không hoặc đang mặc trên Đội 2/3 mà có cấp độ > 0 để Tái chế thu hồi 100% Quặng ngay lập tức.",
                    en: "Open the Equipment tab in your Bag, locate any idle or Queue 2/3 Epic/Rare pieces with enhancement level > 0, and dismantle them immediately to recover 100% of your Upgrade Runes.",
                  },
                  badge: {
                    vi: "100% Thu Hồi",
                    en: "100% Refund",
                  },
                },
                {
                  id: "lock-event-scoring-materials",
                  label: {
                    vi: "Khóa chặt Đá Thăng Cấp (1★–5★), Mảnh Vũ Khí Độc Quyền & Nguyên liệu Đồ Chúa Tể chờ Sự Kiện",
                    en: "Lock Promotion Stones (1★–5★), Exclusive Weapon Shards & Lord Gear Materials for Events",
                  },
                  detail: {
                    vi: "Chỉ đập ngay Thỏi Vàng & Quặng Cường Hóa (Lv.0 ➔ Lv.40 vì cho 0 điểm); khóa 100% Đá Thăng Cấp, Mảnh Vũ khí Độc quyền và Thép Tinh Luyện/Dây Gai chờ đúng ngày sự kiện Double-Dip.",
                    en: "Spend Gold Ingots and Upgrade Runes (Lv.0 ➔ Lv.40) immediately since they yield 0 event points, but lock 100% of Promotion Stones, Exclusive Weapon Shards, and Lord Gear materials for Double-Dip days.",
                  },
                  badge: {
                    vi: "Kỷ Luật Sự Kiện",
                    en: "Event Discipline",
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "sec-3-gear-overview-pitfalls",
      title: {
        vi: "3. Những Cạm bẫy Phổ biến & Cách Phòng tránh (Common Pitfalls)",
        en: "3. Common Equipment Management Pitfalls & Min-Max Solutions",
      },
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            {
              vi: "**Cạm bẫy #1 — Đập đồ Tím lên `+10`/`+20` cho Đội 2/3:** Khóa cứng Đội 2/3 ở `+0`; nâng `4` món Vàng lên `Lv.40` ngốn `780,000` Quặng/tướng (`4,680,000` Quặng + `22,464,000` Ruby cho `24` món Đội 1).",
              en: "**Pitfall #1 — Enhancing Queue 2/3 Epic Gear to `+10`/`+20`:** Freeze Queue 2/3 at `+0`; pushing `4` Golden pieces to `Lv.40` requires `780,000` Runes/hero (`4,680,000` Runes + `22,464,000` Rubies for Queue 1).",
            },
            {
              vi: "**Cạm bẫy #2 — Đúc Đồ Vàng cho Đội 2 quá sớm:** Tích `100%` Thỏi Vàng sau khi Đội 1 đủ `24` món vì đột phá `1★` ➔ `5★` Đỏ ngốn `6,000` Thỏi Vàng/món (`144,000` Thỏi Vàng cho `24` món Đội 1).",
              en: "**Pitfall #2 — Forging Queue 2 Golden Gear Too Early:** Hoard `100%` of Gold Ingots after Queue 1's `24` pieces because `1★` ➔ `5★` promotion devours `6,000` Gold Ingots/piece (`144,000` Gold Ingots total).",
            },
            {
              vi: "**Cạm bẫy #3 — Mặc `3` Vàng + `1` Tím & Nhịn đập Quặng chờ GAR:** Luôn mặc đồng bộ `4` món Vàng cho Carry/Tank và đập Quặng ngay ở mốc `+10`/`+20`/`+30`/`+40` vì Quặng cho `0` điểm GAR!",
              en: "**Pitfall #3 — Mixing `3` Golden + `1` Epic & Hoarding Runes for GAR:** Always complete full `4`-piece Golden sets per hero and spend Runes immediately at `+10`/`+20`/`+30`/`+40` (`0` GAR points)!",
            },
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: {
            vi: "Cảnh Báo Đính Chính Cơ Chế: Đấu Sĩ (Brawler) Không Có Vũ Khí Độc Quyền!",
            en: "Mechanics Correction Warning: Brawler Does NOT Have an Exclusive Weapon!",
          },
          content: {
            vi: "**Đính chính quan trọng về tướng Tím `Brawler` (Đấu Sĩ):**\n• **Thuần kinh tế:** Đấu Sĩ (`Brawler`) là Tướng Tím cộng `+30%` Tốc độ Nghiên cứu, không có Vũ khí Độc quyền và không phải tướng Đội 1.\n• **Dồn mảnh chuẩn xác:** Chỉ tướng Vàng/Đỏ mới có Vũ khí Độc quyền — hãy dồn mảnh Vạn năng cho Wukong, Storm Maiden, Desert Prince, Beastmaster, Paragon, Pyromancer, Tidecaller, Ne Zha.",
            en: "**Crucial mechanics clarification regarding Epic hero `Brawler`:**\n• **Economy Epic only:** `Brawler` grants `+30%` Research Speed, does not possess an Exclusive Weapon, and is never a Queue 1 combat hero.\n• **Proper shard funnel:** Only Legendary/Mythic heroes have Exclusive Weapons — save Universal Shards for Wukong, Storm Maiden, Desert Prince, Beastmaster, Paragon, Pyromancer, Tidecaller, and Ne Zha.",
          },
        },
      ],
    },
  ],
  proSections: [
    {
      id: "sec-4-resource-budget-and-event-dump-matrix",
      isPro: true,
      title: {
        vi: "4. Phân tích Định lượng & Điểm gãy: Ma Trận Ngân Sách Đội 1 & Lịch Tích Xả Sự Kiện (0 Điểm vs Điểm Cực Lớn)",
        en: "4. Quantitative Analysis: Queue 1 Total Resource Demand Matrix & Event Double-Dip Windows",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "**Tối ưu hóa đồng thời Sức mạnh Thực chiến (`Combat Power`) và Phần thưởng Sự kiện (`Event Double-Dip`):**\n• **Phân tách luồng nguyên liệu:** Tách rõ `3` hệ thống theo sơ đồ quyết định và ma trận ngân sách định lượng dưới đây.",
            en: "**Simultaneously maximize Real Combat Power and Event Double-Dip rewards:**\n• **Separate material workflows:** Route the `3` equipment systems using the decision flowchart and quantitative budget matrix below.",
          },
        },
      ],
      subSections: [
        {
          id: "sub-4-1-weekly-gear-decision-flowchart",
          title: {
            vi: "4.1. Sơ Đồ Quyết Định Phân Luồng Ngân Sách & Lịch Xả 3 Hệ Thống Trang Bị",
            en: "4.1. Weekly Equipment Resource Routing & Event Dump Decision Flowchart",
          },
          badge: {
            vi: "Sơ Đồ Quyết Định",
            en: "Decision Flowchart",
          },
          blocks: [
            {
              type: "visual_diagram",
              mediaCode: "MED-5.1-03",
              variant: "decision_flow",
              title: {
                vi: "Sơ Đồ Phân Luồng Ngân Sách & Lịch Xả 3 Hệ Thống Trang Bị Theo Chế Độ Sự Kiện Server",
                en: "3-System Equipment Budget Routing & Server Event Mode Dump Flowchart",
              },
              subtitle: {
                vi: "Phân tách rạch ròi nhóm nguyên liệu 0 điểm sự kiện (Rèn & Đập ngay) với nhóm nguyên liệu Điểm Cực Lớn (Khóa kho chờ Double-Dip)",
                en: "Strictly separating 0-point materials (Craft & Enhance immediately) from high-scoring materials (Hoard for Double-Dip windows)",
              },
              centerNode: {
                id: "weekly-gear-inventory-hub",
                badge: {
                  vi: "Kho Nguyên Liệu Tuần",
                  en: "Weekly Gear Inventory",
                },
                title: {
                  vi: "KHO NGUYÊN LIỆU TRANG BỊ HÀNG TUẦN: PHÂN TÁCH LUỒNG 0 ĐIỂM (ĐẬP NGAY) VS ĐIỂM CỰC LỚN (TÍCH XẢ DOUBLE-DIP)",
                  en: "WEEKLY GEAR INVENTORY: SPLIT 0-POINT STREAM (UPGRADE NOW) VS. HIGH-POINT STREAM (DOUBLE-DIP DUMP)",
                },
                subtitle: {
                  vi: "Kiểm tra loại nguyên liệu đang có để quyết định đập ngay vượt ải hay khóa kho chờ ngày sự kiện",
                  en: "Verify the material type in your inventory to decide between immediate stage-pushing or event hoarding",
                },
                tone: "gold",
              },
              branches: [
                {
                  title: {
                    vi: "1. Trang Bị Tướng (Hero Gear — 24 Món Đội 1)",
                    en: "1. Hero Gear (Queue 1 — 24 Pieces)",
                  },
                  badge: {
                    vi: "0 Điểm (Lv.0➔40) vs Điểm Lớn (1★–5★)",
                    en: "0 Pts (Lv.0➔40) vs. High Pts (1★–5★)",
                  },
                  tone: "emerald",
                  steps: [
                    {
                      id: "step-hero-gear-craft-enhance",
                      title: {
                        vi: "Thỏi Vàng Đúc Đồ & Quặng Cường Hóa + Ruby (Lv.0 ➔ Lv.40 = 0 Điểm)",
                        en: "Gold Ingots & Upgrade Runes + Rubies (Lv.0 ➔ Lv.40 = 0 Points)",
                      },
                      subtitle: {
                        vi: "RÈN & CƯỜNG HÓA NGAY theo mốc +10/+20/+30/+40 cho Đội 1 (195,000 Quặng + 936,000 Ruby/món) vì cho 0 điểm Arms Race / KvK",
                        en: "FORGE & ENHANCE IMMEDIATELY at +10/+20/+30/+40 breakpoints for Queue 1 (195,000 Runes + 936,000 Rubies/piece) since it yields 0 Arms Race / KvK points",
                      },
                      tone: "emerald",
                    },
                    {
                      id: "step-hero-gear-star-promote",
                      title: {
                        vi: "Đá Thăng Cấp Trang Bị (Gear Promotion Stones 1★ ➔ 5★ sau Lv.40)",
                        en: "Gear Promotion Stones (1★ ➔ 5★ Star Promotion after Lv.40)",
                      },
                      subtitle: {
                        vi: "TÍCH TRỮ 100% Đá Thăng Cấp Vàng/Đỏ (cùng 6,000 Thỏi Vàng/món) ➔ Bấm Đột phá Sao 1★–5★ đúng ngày Sự kiện ăn điểm lớn",
                        en: "HOARD 100% of Legendary/Mythic Promotion Stones (with 6,000 Gold Ingots/piece) ➔ Execute 1★–5★ Star Promotions on active event scoring days",
                      },
                      tone: "gold",
                    },
                  ],
                  outcome: {
                    vi: "Vừa tối đa lực chiến vượt ải hàng ngày (Lv.0➔Lv.40), vừa ăn trọn điểm sự kiện khi đột phá Sao (1★–5★).",
                    en: "Maximizes daily stage-pushing power (Lv.0➔Lv.40) while capturing full event points on 1★–5★ Star Promotions.",
                  },
                },
                {
                  title: {
                    vi: "2. Vũ Khí Độc Quyền (Exclusive Weapon — 6 Món Đội 1)",
                    en: "2. Exclusive Weapon (Queue 1 — 6 Weapons)",
                  },
                  badge: {
                    vi: "Thứ Năm Kỳ GAR/KvK (Ngày 4)",
                    en: "Thursday GAR/KvK (Day 4)",
                  },
                  tone: "gold",
                  steps: [
                    {
                      id: "step-uw-shards-hoard",
                      title: {
                        vi: "Mảnh Vũ Khí Độc Quyền, Rương Tự Chọn & Lõi Sắt Thiên Thạch (920 Lõi)",
                        en: "Exclusive Weapon Shards, Choice Chests & Meteoric Iron Cores (920 Cores)",
                      },
                      subtitle: {
                        vi: "TÍCH TRỮ 100% ➔ Xả đồng loạt vào Thứ Năm Kỳ GAR/KvK (Ngày 4: Hero Upgrade) kết hợp sự kiện phụ Hero Development (mốc vàng Lv.10 = 275 Mảnh/tướng, tối đa Lv.20 = 1,185 Mảnh)",
                        en: "HOARD 100% ➔ Dump in bursts on Thursday of GAR/KvK (Day 4: Hero Upgrade) paired with Hero Development (targeting Lv.10 = 275 Shards/hero, max Lv.20 = 1,185 Shards)",
                      },
                      tone: "gold",
                    },
                  ],
                  outcome: {
                    vi: "Mở khóa đột phá kỹ năng Lv.10 (1,650 mảnh/6 tướng) và ăn Double-Dip rương mốc Thứ Năm Kỳ GAR/KvK.",
                    en: "Unlocks Lv.10 skill breakpoints (1,650 shards across 6 heroes) while double-dipping Thursday GAR/KvK milestone chests.",
                  },
                },
                {
                  title: {
                    vi: "3. Trang Bị Chúa Tể (Lord Gear — 6 Món Toàn Cục)",
                    en: "3. Lord Gear (6 Global Profile Slots)",
                  },
                  badge: {
                    vi: "Thi Đấu Hội Ngày 5–7 | GAR/KvK Ngày 3–4",
                    en: "Guild Race Days 5–7 | GAR/KvK Days 3–4",
                  },
                  tone: "emerald",
                  steps: [
                    {
                      id: "step-lord-gear-week-a",
                      title: {
                        vi: "Nếu Server đang ở Kỳ Thi Đấu Hội (Guild Race)",
                        en: "If Server is in Guild Race Mode",
                      },
                      subtitle: {
                        vi: "Xả Thép Tinh Luyện, Dây Gai, Bản Vẽ, Máu Rồng vào Ngày 5–7 (Thứ Sáu – Chủ Nhật) ăn Double-Dip Nhiệm vụ Vàng Độc quyền + Guild Rush",
                        en: "Dump Refined Metal, Magic Thread, Blueprints, and Dragon Blood on Days 5–7 (Fri–Sun) to double-dip Exclusive Gold Tasks + Guild Rush",
                      },
                      tone: "emerald",
                    },
                    {
                      id: "step-lord-gear-week-b",
                      title: {
                        vi: "Nếu Server đang ở Kỳ Đua Vũ Trang (GAR / KvK)",
                        en: "If Server is in Arms Race Mode (GAR / KvK)",
                      },
                      subtitle: {
                        vi: "Xả vào Thứ Tư & Thứ Năm (GAR Ngày 3–4 / KvK Ngày 3–5: 100 Thép = 400 điểm, 1 Dây Gai = 400 điểm; tuyệt đối cấm xả Thứ Bảy Ngày 6)",
                        en: "Dump on Wednesday & Thursday (GAR Days 3–4 / KvK Days 3–5: 100 Metal = 400 pts, 1 Thread = 400 pts; never dump on Saturday Day 6)",
                      },
                      tone: "emerald",
                    },
                  ],
                  outcome: {
                    vi: "Tối ưu hóa toàn bộ 958,800 Thép/món (5,752,800 Thép/6 món) với điểm số sự kiện cao nhất.",
                    en: "Optimizes all 958,800 Refined Metal per piece (5,752,800 Metal across 6 pieces) for maximum event ROI.",
                  },
                },
              ],
            },
          ],
        },
        {
          id: "sub-4-2-queue1-total-resource-demand-table",
          title: {
            vi: "4.2. Bảng Định Lượng Tổng Cầu Tài Nguyên Đội 1 & Quy Tắc Tích Xả Sự Kiện",
            en: "4.2. Queue 1 Total Resource Demand Matrix & Event Double-Dip Windows",
          },
          badge: {
            vi: "Ma Trận Ngân Sách",
            en: "Budget Matrix",
          },
          blocks: [
            {
              type: "table",
              caption: {
                vi: "Tổng Cầu Tài Nguyên Đội 1 Ở Bậc Tối Đa (Max Tier) & Khung Giờ Xả Sự Kiện Chuẩn Ground-Truth",
                en: "Queue 1 Max-Tier Total Resource Demand & Ground-Truth Event Double-Dip Windows",
              },
              headers: [
                {
                  vi: "Hạng mục Trang bị",
                  en: "Equipment Category",
                },
                {
                  vi: "Nguyên liệu Cốt lõi",
                  en: "Core Materials",
                },
                {
                  vi: "Tổng Chi phí Cho 1 Món (Max Tier)",
                  en: "Total Cost Per Piece (Max Tier)",
                },
                {
                  vi: "Tổng Ngân sách Cho Đội 1 (6 Tướng)",
                  en: "Total Queue 1 Budget (6 Heroes)",
                },
                {
                  vi: "Điểm Sự kiện & Khung giờ Xả Tối Ưu (Double-Dip Window)",
                  en: "Event Scoring & Optimal Double-Dip Window",
                },
              ],
              rows: [
                [
                  {
                    vi: "Đúc Đồ Vàng & Cường hóa (Lv.0 ➔ Lv.40)",
                    en: "Golden Gear Forging & Enhancement (Lv.0 ➔ Lv.40)",
                  },
                  {
                    vi: "Thỏi Vàng (Gold Ingots) + Quặng Cường Hóa (Upgrade Runes) + Ruby",
                    en: "Gold Ingots + Upgrade Runes + Rubies",
                  },
                  {
                    vi: "195,000 Quặng + 936,000 Ruby (+ Thỏi Vàng đúc đồ gốc)",
                    en: "195,000 Upgrade Runes + 936,000 Rubies (+ base Gold Ingots)",
                  },
                  {
                    vi: "4,680,000 Quặng + 22,464,000 Ruby (24 món Đội 1)",
                    en: "4,680,000 Upgrade Runes + 22,464,000 Rubies (24 pieces)",
                  },
                  {
                    vi: "KHÔNG cộng điểm Arms Race / KvK (0 điểm). Có thể rèn đồ Vàng và nâng ngay khi đủ mốc cộng hưởng +10 / +20 / +30 / +40 để vượt ải.",
                    en: "Does NOT score points in Arms Race / KvK (0 points). Forge Golden Gear and enhance immediately upon hitting +10 / +20 / +30 / +40 resonance milestones.",
                  },
                ],
                [
                  {
                    vi: "Đột phá Thần Thoại (Lv.40 ➔ 1★ ➔ 5★ Đỏ)",
                    en: "Mythic Star Promotion (Lv.40 ➔ 1★ ➔ 5★ Red)",
                  },
                  {
                    vi: "Thỏi Vàng + Quặng + Ruby + Đá Thăng Cấp (Gear Promotion Stones)",
                    en: "Gold Ingots + Runes + Rubies + Gear Promotion Stones",
                  },
                  {
                    vi: "6,000 Thỏi Vàng + 500,000 Quặng + 23.98M Ruby + 50 Đá Vàng + 10 Đá Đỏ",
                    en: "6,000 Gold Ingots + 500,000 Runes + 23.98M Rubies + 50 Legendary Stones + 10 Mythic Stones",
                  },
                  {
                    vi: "144,000 Thỏi Vàng + 12,000,000 Quặng + 575.52M Ruby + 1,200 Đá Vàng + 240 Đá Đỏ (24 món)",
                    en: "144,000 Gold Ingots + 12,000,000 Runes + 575.52M Rubies + 1,200 Legendary Stones + 240 Mythic Stones (24 pieces)",
                  },
                  {
                    vi: "Đá Thăng Cấp Trang Bị (Gear Promotion Stones khi đột phá Sao 1★–5★ sau Lv.40) cộng điểm lớn trong sự kiện! Tích trữ Đá Thăng Cấp chờ đúng ngày sự kiện mới bấm đột phá Sao.",
                    en: "Gear Promotion Stones (1★–5★ Star Promotion after Lv.40) score massive event points! Hoard Promotion Stones and only click Star Promotion during active scoring events.",
                  },
                ],
                [
                  {
                    vi: "Vũ Khí Độc Quyền (Lv.0 ➔ Lv.20 & 1★ ➔ 5★)",
                    en: "Exclusive Weapons (Lv.0 ➔ Lv.20 & 1★ ➔ 5★)",
                  },
                  {
                    vi: "Mảnh Vũ Khí Độc Quyền (Exclusive Shards) & Lõi Sắt Thiên Thạch (Meteoric Iron Cores)",
                    en: "Exclusive Weapon Shards & Meteoric Iron Cores",
                  },
                  {
                    vi: "1,185 Mảnh (Mốc dừng tối ưu F2P: Lv.10 = 275 Mảnh) + 920 Lõi Sắt Thiên Thạch (1★–5★)",
                    en: "1,185 Shards (Optimal F2P breakpoint: Lv.10 = 275 Shards) + 920 Meteoric Iron Cores (1★–5★)",
                  },
                  {
                    vi: "1,650 Mảnh (cho 6 tướng đạt mốc Lv.10) hoặc 7,110 Mảnh (Full Lv.20 cho 6 tướng)",
                    en: "1,650 Shards (6 heroes at Lv.10) or 7,110 Shards (Full Lv.20 across 6 heroes)",
                  },
                  {
                    vi: "Xả vào Thứ Năm Kỳ GAR/KvK (GAR Ngày 4: Hero Upgrade) kết hợp sự kiện phụ Hero Development.",
                    en: "Dump on Thursday of GAR/KvK (GAR Day 4: Hero Upgrade) paired with the Hero Development side event.",
                  },
                ],
                [
                  {
                    vi: "Trang Bị Chúa Tể (Base ➔ Mythic T1 3★)",
                    en: "Lord Gear (Base ➔ Mythic T1 3★)",
                  },
                  {
                    vi: "Thép Tinh Luyện + Dây Gai + Bản Vẽ + Máu Rồng",
                    en: "Refined Metal + Magic Thread + Blueprints + Dragon Blood",
                  },
                  {
                    vi: "958,800 Thép + 9,955 Dây Gai + 2,030 Bản Vẽ + 101 Máu Rồng",
                    en: "958,800 Refined Metal + 9,955 Magic Thread + 2,030 Blueprints + 101 Dragon Blood",
                  },
                  {
                    vi: "5,752,800 Thép + 59,730 Dây Gai + 12,180 Bản Vẽ + 606 Máu Rồng (6 món)",
                    en: "5,752,800 Refined Metal + 59,730 Magic Thread + 12,180 Blueprints + 606 Dragon Blood (6 pieces)",
                  },
                  {
                    vi: "Cộng điểm cực lớn! Kỳ GAR/KvK: Xả Ngày 3 & 4 (100 Thép = 400 điểm, 1 Dây Gai = 400 điểm). Kỳ Thi Đấu Hội (Guild Race): Xả Ngày 5–7 cùng Nhiệm vụ Vàng & Guild Rush.",
                    en: "Massive event points! GAR/KvK: Dump on Days 3 & 4 (100 Metal = 400 pts, 1 Thread = 400 pts). Guild Race: Dump on Days 5–7 with Gold Tasks & Guild Rush.",
                  },
                ],
              ],
            },
            {
              type: "callout",
              variant: "rule",
              title: {
                vi: "Phân Biệt Rõ Rèn Đồ Vàng & Đập Quặng (0 Điểm) vs Đá Thăng Cấp Sao & Đồ Chúa Tể (Điểm Cực Lớn)",
                en: "Strict Distinction: Golden Gear Crafting & Runes (0 Points) vs. Star Promotion Stones & Lord Gear (Massive Points)",
              },
              content: {
                vi: "**Quy tắc thực thi Lò Rèn và Sự Kiện Tuần:**\n• **Nhóm `0` điểm (Rèn & Đập ngay):** Đúc Đồ Vàng (Huyết Titan, Kỵ Sĩ Vinh Quang, Hiền Triết Quang Vinh) và Cường hóa `Lv.0` ➔ `Lv.40` cho `0` điểm ➔ nâng ngay ở mốc `+10`/`+20`/`+30`/`+40`.\n• **Nhóm điểm lớn (Khóa kho):** Đá Thăng Cấp (`1★`–`5★` sau `Lv.40`) và Nguyên liệu Đồ Chúa Tể cộng điểm cực lớn ➔ khóa chặt chờ ngày sự kiện mới xả!",
                en: "**Blacksmith & Weekly Event Execution Rule:**\n• **`0`-Point Group (Craft & Upgrade Now):** Forging Golden Gear (Blood of the Titan, Knight's Glory, Glory of the Sage) and enhancing `Lv.0` ➔ `Lv.40` score `0` points ➔ upgrade immediately at `+10`/`+20`/`+30`/`+40`.\n• **Massive-Point Group (Lock in Bag):** Gear Promotion Stones (`1★`–`5★` after `Lv.40`) and Lord Gear materials yield massive points ➔ hoard strictly for active event windows!",
              },
            },
            {
              type: "media_spotlight",
              mediaCode: "MED-5.1-04",
              tier: "tier4_youtube_ref",
              title: {
                vi: "Video Tham Chiếu Quốc Tế: Tổng Quan Hệ Thống Trang Bị & Hướng Dẫn Lò Rèn Toàn Diện",
                en: "International Video Reference: Complete Gear System & Blacksmith Guide",
              },
              description: {
                vi: "Phân tích trực quan sự khác biệt giữa Hero Gear, Exclusive Weapons và Lord Gear cùng quy trình tối ưu hóa Lò Rèn từ kênh RedBaron Gaming / OGFlux.",
                en: "Visual breakdown of the differences between Hero Gear, Exclusive Weapons, and Lord Gear alongside Blacksmith optimization workflows by RedBaron Gaming / OGFlux.",
              },
              videoChannel: "RedBaron Gaming / OGFlux",
              videoTitle: "Top Heroes Complete Gear System & Blacksmith Guide",
              videoTimestamp: "01:15 – 06:40",
            },
          ],
        },
      ],
    },
    {
      id: "sec-5-castle27-41m-gear-audit-case-study",
      isPro: true,
      title: {
        vi: "5. Kịch bản Thực chiến Nâng cao: Phẫu Thuật Tài Khoản Lâu Đài Lv.27 (4.1M Lực Chiến) Bị Thọt Sát Thương PvP Do Phân Tán Quặng & Mặc Đồ Lệch Phẩm Chất",
        en: "5. Advanced Tactical Case Study: Auditing a Castle Lv.27 (4.1M Power) Account Suffering from Ore Dilution & Mixed-Rarity Gear",
      },
      blocks: [
        {
          type: "case_study",
          badge: {
            vi: "Case Study Lâu Đài Lv.27 (4.1M Power)",
            en: "Castle Lv.27 Case Study (4.1M Power)",
          },
          title: {
            vi: "Phẫu Thuật Tài Khoản 4.1M Lực Chiến: Thu Hồi 280,000 Quặng Chết & Mở Khóa Cộng Hưởng Vàng +20 (+240,000 Lực Chiến Thực)",
            en: "4.1M Power Account Surgery: Recovering 280,000 Dead Upgrade Runes & Unlocking +20 Golden Resonance (+240,000 Real Power)",
          },
          profileSummary: {
            vi: "**Hồ sơ Lâu đài `Lv.27` (`4.1M` Lực chiến: Đội 1 `1.85M`, Đội 2 `1.25M`, Đội 3 `1.0M`):**\n• **Mặc lệch phẩm chất Đội 1:** Pyromancer mặc `3` món Vàng Kỵ Sĩ Vinh Quang `+14` + `1` Mũ Tím `+12`; Adjudicator mặc `2` món Vàng Huyết Titan `+12` + `2` món Tím `+10`.\n• **Chôn Quặng ở Đội 2:** Có `16` món Tím/Xanh đập lên `+10`/`+11` (chôn chết `~280,000` Quặng), khiến Đội 1 thua đối thủ `1.6M` Lực chiến.",
            en: "**Castle `Lv.27` profile (`4.1M` total power: Queue 1 at `1.85M`, Queue 2 at `1.25M`, Queue 3 at `1.0M`):**\n• **Queue 1 mixed-rarity:** Pyromancer wears `3` Golden Knight's Glory pieces (`+14`) + `1` Epic Helmet (`+12`); Adjudicator wears `2` Golden Blood of the Titan (`+12`) + `2` Epics (`+10`).\n• **Dead Runes in Queue 2:** `16` Epic/Rare pieces at `+10`/`+11` bury `~280,000` Upgrade Runes, causing losses to `1.6M` Arena opponents.",
          },
          metrics: [
            {
              label: {
                vi: "Quặng Cường Hóa Bị Chôn Chết Ở Đội 2 & Túi Đồ",
                en: "Dead Upgrade Runes Buried in Queue 2 & Bag",
              },
              before: {
                vi: "280,000 Quặng Cường Hóa + 1.2M Ruby nằm chết trên 16 món đồ Tím/Xanh +10/+11",
                en: "280,000 Upgrade Runes + 1.2M Rubies locked in 16 enhanced (+10/+11) Epic/Rare pieces",
              },
              after: {
                vi: "Thu hồi 100% (280,000 Quặng) qua tính năng Phân Giải (Dismantle), đưa Đội 2 về +0",
                en: "100% refunded (280,000 Upgrade Runes) via Blacksmith Dismantle; Queue 2 reset to +0",
              },
              delta: {
                vi: "+280,000 Quặng Cường Hóa & +1.2M Ruby chuyển thẳng về Đội 1",
                en: "+280,000 Upgrade Runes & +1.2M Rubies funneled into Queue 1",
              },
            },
            {
              label: {
                vi: "Hiệu Ứng Bộ 4 Món Vàng & Bậc Thầy Cường Hóa (Pyromancer & Adjudicator)",
                en: "4-Piece Golden Set Bonus & Enhancement Master (Pyromancer & Adjudicator)",
              },
              before: {
                vi: "Mặc lệch 3 Vàng + 1 Tím (+14/+12) ➔ Mất thưởng Bộ 4 món Vàng & kẹt ở Cộng hưởng Tím",
                en: "Mixed 3 Golden + 1 Epic (+14/+12) ➔ Lost 4-piece Golden bonus & stuck at Epic resonance",
              },
              after: {
                vi: "Pyromancer trọn bộ 4 món Vàng +20 (+8% Skill Amp) & Adjudicator trọn bộ 4 món Vàng +10",
                en: "Pyromancer full 4-piece Golden +20 (+8% Skill Amp) & Adjudicator full 4-piece Golden +10",
              },
              delta: {
                vi: "Kích hoạt Cộng hưởng Vàng Lv.20 & Hiệu ứng Bộ 4 món chuẩn BiS",
                en: "Unlocked Golden Lv.20 Resonance & full 4-piece BiS Set Bonuses",
              },
            },
            {
              label: {
                vi: "Lực Chiến Thực Chiến Đội 1 & Thứ Hạng Đấu Trường / Tháp Thử Thách",
                en: "Queue 1 Real Combat Power & Arena / Trial Tower Progression",
              },
              before: {
                vi: "Đội 1 1.85M Lực chiến nhưng thua đối thủ 1.6M Lực chiến",
                en: "Queue 1 at 1.85M Power losing to 1.6M Power opponents",
              },
              after: {
                vi: "Đội 1 tăng vọt +240,000 Lực chiến thực (Đội 2 chỉ giảm 80,000 lực chiến ảo)",
                en: "Queue 1 surges by +240,000 real combat power (Queue 2 drops only 80,000 paper power)",
              },
              delta: {
                vi: "+240,000 Lực chiến Đội 1, vượt 18 tầng Tháp & lọt Top 30 Đấu Trường",
                en: "+240,000 Queue 1 Power, +18 Trial Tower floors & Top 30 Arena",
              },
            },
          ],
          diagnostics: [
            {
              vi: "**Lỗi phân tán Quặng sang Đội 2:** Đập `16` món Tím/Xanh lên `+10`/`+11` làm đóng băng `280,000` Quặng Cường Hóa vô ích trong PvP `1` đội hình.",
              en: "**Upgrade Rune Dilution Across Queue 2:** Enhancing `16` Epic/Rare pieces to `+10`/`+11` froze `280,000` Upgrade Runes with zero single-queue PvP value.",
            },
            {
              vi: "**Lỗi mặc đồ lệch phẩm chất (`3` Vàng + `1` Tím):** Chỉ `1` chiếc Mũ Tím trên Pyromancer đã làm mất trắng Bộ `4` món Vàng và Bậc Thầy Cường Hóa Vàng (`+10`/`+20`).",
              en: "**Mixed-Rarity Bottleneck (`3` Golden + `1` Epic):** A single Epic Helmet on Pyromancer disables both the `4`-piece Golden Set Bonus and Golden Enhancement Master (`+10`/`+20`).",
            },
          ],
          recoverySteps: [
            {
              stepNumber: "Bước 1",
              title: {
                vi: "Thu Hồi 100% Quặng Chết (~280,000 Quặng & 1.2M Ruby) Qua Lò Rèn",
                en: "Recover 100% of Dead Runes (~280,000 Upgrade Runes & 1.2M Rubies) via Blacksmith",
              },
              detail: {
                vi: "**Phân giải thu hồi `100%` tài nguyên:** Đưa `16` món Tím/Xanh `+10`/`+11` ở Đội 2 và Túi đồ vào Lò Rèn bấm Phân Giải (Dismantle) ➔ thu hồi `~280,000` Quặng + `1.2M` Ruby và đưa Đội 2 về `+0`.",
                en: "**Dismantle for `100%` recovery:** Recycle all `16` enhanced (`+10`/`+11`) Epic/Rare pieces from Queue 2 and Bag at the Blacksmith ➔ recover `~280,000` Runes + `1.2M` Rubies and reset Queue 2 to `+0`.",
              },
              impactBadge: {
                vi: "+280,000 Quặng Thu Hồi",
                en: "+280,000 Runes Recovered",
              },
            },
            {
              stepNumber: "Bước 2",
              title: {
                vi: "Tái Cấu Trúc Phẩm Chất Đồng Bộ 4 Món Vàng Cho Pyromancer & Adjudicator",
                en: "Restructure Full 4-Piece Golden Sets on Pyromancer & Adjudicator",
              },
              detail: {
                vi: "**Đồng bộ `4` món Vàng:** Đúc `1` Mũ Vàng cho Pyromancer (đủ `4` món Kỵ Sĩ Vinh Quang / Hiền Triết) và gom `4` món Vàng Huyết Titan cho Adjudicator (chuyển `2` món Tím sang tướng thứ 6).",
                en: "**Consolidate `4`-piece Golden sets:** Forge `1` Golden Helmet for Pyromancer (`4`-piece Knight's Glory / Glory of the Sage) and equip `4` Golden Blood of the Titan pieces on Adjudicator.",
              },
              impactBadge: {
                vi: "Bật Bộ 4 Món Vàng",
                en: "4-Piece Golden Active",
              },
            },
            {
              stepNumber: "Bước 3",
              title: {
                vi: "Dồn 280,000 Quặng Chạm Chuẩn Điểm Gãy Cộng Hưởng +20 & +10",
                en: "Funnel 280,000 Runes to Hit Exact +20 & +10 Resonance Breakpoints",
              },
              detail: {
                vi: "**Chạm chuẩn điểm gãy cộng hưởng:** Dùng `280,000` Quặng thu hồi kéo đồng đều `4` món Vàng của Pyromancer lên `+20` (Kiếm/Giày trước) và đưa `4` món Vàng của Adjudicator chạm chuẩn `+10`.",
                en: "**Hit exact resonance breakpoints:** Spend the `280,000` recovered Runes to bring all `4` Golden pieces on Pyromancer evenly to `+20` (Sword/Boots first) and all `4` on Adjudicator to `+10`.",
              },
              impactBadge: {
                vi: "+240,000 Lực Chiến Đội 1",
                en: "+240,000 Queue 1 Power",
              },
            },
          ],
          conclusion: {
            vi: "**Kết quả sau `5` phút tái cơ cấu (`0` Kim Cương):**\n• **Đột phá lực chiến thực:** Đội 2 giảm nhẹ `80,000` lực chiến ảo nhưng Đội 1 tăng vọt `+240,000` lực chiến thực.\n• **Leo hạng tức thì:** Mở Cộng hưởng Vàng `Lv.20` & `+8%` Khuếch đại Kỹ năng ➔ vượt `18` tầng Tháp và vào Top 30 Đấu Trường.",
            en: "**Results after `5` minutes of `0`-Diamond restructuring:**\n• **Real combat power surge:** Queue 2 dipped by `80,000` paper power while Queue 1 surged by `+240,000` real combat power.\n• **Immediate rank climb:** Unlocked Golden `Lv.20` Resonance & `+8%` Skill Damage Amplify ➔ +`18` Trial Tower floors & Top 30 Arena.",
          },
        },
      ],
    },
  ],
};

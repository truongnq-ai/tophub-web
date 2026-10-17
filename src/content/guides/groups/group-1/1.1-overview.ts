import type { GuideArticle } from "../../types";

export const ARTICLE_1_1_OVERVIEW: GuideArticle = {
  code: "1.1",
  slug: "overview",
  categorySlug: "getting-started",
  badge: "FREE",
  readingMinutes: 10,
  title: {
    vi: "Bản Đồ Tổng Quan & Lộ Trình Khởi Đầu Chuẩn Meta (Complete Overview & 90-Day Roadmap)",
    en: "Complete Overview & 90-Day Meta Roadmap",
  },
  summary: {
    vi: "Kiến trúc 7 trụ cột sức mạnh trong Top Heroes, cách phân biệt Lực chiến thật vs Lực chiến ảo và lộ trình 90 ngày chuyển giao Liên Minh sang Bộ Lạc tối ưu cho F2P/Low-Spender.",
    en: "The 7-pillar power architecture in Top Heroes, Combat Power vs. Inflated Power analysis, and the 90-day League-to-Horde transition roadmap for F2P/Low-Spenders.",
  },
  tldr: {
    coreRule: {
      vi: "**Sức mạnh thực chiến được quyết định 100% bởi Lực chiến Đội hình 1 (`Queue 1 Combat Power`), không phải Tổng Lực chiến (`Total Influence`).**\n• **Đối chiếu thực chiến:** Tài khoản `15M` tổng lực chiến có Đội 1 đạt `6M` sẽ nghiền nát tài khoản `20M` tổng nhưng Đội 1 chỉ đạt `4M`.",
      en: "**Real combat effectiveness is dictated 100% by `Queue 1 Combat Power` rather than account-wide `Total Influence`.**\n• **Combat Reality:** A `15M` total influence account with a `6.0M` Queue 1 effortlessly crushes a `20M` account whose Queue 1 is only `4.0M`.",
    },
    immediateAction: {
      vi: "**Gia nhập Bang hội `Top 1–3` của máy chủ ngay khi Lâu đài đạt `Cấp 7` (`Castle Lv.7`).**\n• **Đội hình & Tích trữ:** Khởi đầu bằng đội Liên Minh dễ kiếm mảnh, đồng thời đóng băng 100% `Mảnh Tướng Vàng Vạn Năng` và `Kim Cương` chờ làn sóng Tướng Đỏ từ `Ngày 21`.",
      en: "**Join a `Top 1–3` Server Guild immediately upon reaching `Castle Lv.7`.**\n• **Roster & Hoarding:** Start with an easily farmable League lineup and freeze 100% of `Universal Legendary Hero Shards` and `Diamonds` for the Mythic Hero wave on `Day 21`.",
    },
    strictTaboo: {
      vi: "**Tuyệt đối không đốt `Kim Cương` vào Quán Rượu (`Tavern`) và không chia tài nguyên cho Đội 2 / Đội 3.**\n• **Kỷ luật Lịch Event (`09:00` Thứ Hai):** Luôn mở Lịch kiểm tra chế độ tuần (Chế độ 1: Thi Đấu Hội nối tiếp hàng tuần ở đầu Pre-Season hay Chế độ 2: Đua Vũ Trang `GAR / KvK` 6 ngày) trước khi xả vật phẩm.",
      en: "**Never spend `Diamonds` in the `Tavern` and never split scarce resources into Queue 2 or Queue 3.**\n• **Monday `09:00` Calendar Check:** Never dump upgrade items blindly without checking your server's active weekly mode (Mode 1: continuous weekly `Guild Race` vs. Mode 2: 6-day `GAR / KvK` rotation).",
    },
  },
  keyTakeaways: [
    {
      vi: "**Kiến trúc `7 Trụ cột Sức mạnh`:** Đội hình 1 (`Queue 1` — 6 tướng chính) chiếm `35%` tỷ trọng PvP.\n• **Đòn bẩy Sự kiện:** Lịch Sự kiện Động (Thi Đấu Hội / `GAR / KvK`) đóng vai trò đòn bẩy nhân `2–3 lần` tốc độ tăng trưởng toàn tài khoản.",
      en: "**The `7 Strategic Pillars` Architecture:** `Queue 1` (your 6 main heroes) drives `35%` of total PvP combat impact.\n• **Event Multiplier:** The Dynamic Event Schedule (`Guild Race / GAR / KvK`) acts as a `2x–3x` account progression multiplier.",
    },
    {
      vi: "**Lộ trình Chuyển giao Bộ Lạc `3 Bước`:** Ngày 1–20 Liên Minh ➔ Ngày 21–40 Đội Lai (`4 Liên Minh + 2 Bộ Lạc`) ➔ Ngày 41+ Thuần Bộ Lạc.\n• **Tối ưu Thức tỉnh:** Giúp F2P sở hữu `5 Tướng Đỏ` và chỉ tốn `9 Hồn Đá Đỏ` + `345–385` Mảnh để thức tỉnh 1 Tướng Vàng (thay vì `27 Đá` như Liên Minh).",
      en: "**The `3-Step` Meta Horde Pivot:** Days 1–20 League ➔ Days 21–40 Hybrid (`4 League + 2 Horde`) ➔ Day 41+ Pure Horde.\n• **Awakening Efficiency:** Lets F2P field `5 Mythic` heroes while needing only `9 Soul Stones` + `345–385` Shards to awaken 1 Legendary (vs. `27 Soul Stones` for League).",
    },
    {
      vi: "**Quy chuẩn Hệ thống `15 Sao` (3 Màu Sao):** Điểm dừng ROI tối ưu đầu tiên cho mỗi Tướng Đỏ là `1 Sao Trắng` (`11 Sao` = `560` Mảnh Mythic / `280` Mảnh Leg).\n• **Động cơ Kinh tế Tím:** Đẩy `Brawler` và `Knight` đạt `2 Sao Trắng` (`12 Sao` = `300` Mảnh) để mở khóa `+30%` Tốc độ Nghiên cứu & Huấn luyện.",
      en: "**Master the `15-Star` (3-Color) System:** The first optimal ROI breakpoint for every Mythic hero is `1 White Star` (`11 Stars` = `560` Mythic / `280` Legendary Shards).\n• **Epic Economy Engine:** Push `Brawler` and `Knight` to `2 White Stars` (`12 Stars` = `300` Shards) to unlock `+30%` Research & Training speed.",
    },
    {
      vi: "**Quy tắc Nhìn Lịch Event `5 Giây` (`09:00` Thứ Hai):** Kiểm tra lịch tuần trước khi xả Mảnh Vạn Năng hoặc Tăng tốc.\n• **Phân tách 2 Chế độ:** Phân biệt tuần chạy Thi Đấu Hội nối tiếp (kèm Tập Kích Cự Ma & Khiêu Chiến Của Đội Quân Hắc Ám) với tuần mở Đua Vũ Trang `GAR / KvK` 6 ngày.",
      en: "**The Monday `09:00` 5-Second Calendar Check:** Inspect the weekly schedule before spending Universal Shards or Speedups.\n• **Two Active Modes:** Distinguish continuous weekly `Guild Race` cycles (paired with `Giant Raid` & `Dark Army Challenge`) from 6-day `GAR / KvK` war weeks.",
    },
  ],
  keywords: [
    "tân thủ",
    "beginner",
    "overview",
    "tổng quan",
    "90 ngày",
    "90-day roadmap",
    "7 trụ cột",
    "lực chiến thật",
    "lực chiến ảo",
    "combat power",
    "inflated power",
    "bộ lạc",
    "liên minh",
    "thiên nhiên",
    "horde pivot",
    "desert prince",
    "storm maiden",
    "witch",
    "soul stones",
    "hồn đá đỏ",
    "thi đấu hội",
    "tập kích cự ma",
    "khiêu chiến của đội quân hắc ám",
    "lịch event",
    "560 mảnh",
    "15 sao",
  ],
  sourceFiles: [
    "group-1-getting-started/1.1-overview.md",
    "group-8-infrastructure/8.4-master-data-tables.md",
  ],
  freeSections: [
    {
      id: "sec-1-seven-pillars",
      title: {
        vi: "1. Giải thích Cơ chế Cốt lõi: Bản Đồ 7 Trụ Cột Sức Mạnh & Bẫy \"Lực Chiến Ảo\"",
        en: "1. Core Mechanics: The 7 Strategic Pillars & The \"Inflated Power\" Trap",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "**Hệ thống phát triển tài khoản trong Top Heroes vận hành qua `7 Trụ cột Sức mạnh` (`The 7 Strategic Pillars`) liên kết chặt chẽ.**\n• **Sai lầm Tân thủ:** Dễ bị choáng ngợp bởi hàng chục tính năng mở khóa từ Lâu đài `Lv.1 ➔ Lv.30`, dẫn đến đầu tư cảm tính vào các chỉ số ảo không có giá trị thực chiến.",
            en: "**Account progression in Top Heroes operates around `7 interconnected Strategic Pillars` that scale together.**\n• **Beginner Pitfall:** Players often get overwhelmed by features unlocking from `Castle Lv.1 ➔ Lv.30`, leading to emotional investments in vanity stats with zero combat value.",
          },
        },
        {
          type: "visual_diagram",
          mediaCode: "MED-1.1-01",
          variant: "hub_pillars",
          title: {
            vi: "Sơ Đồ Kiến Trúc 7 Trụ Cột Sức Mạnh & Luồng Nhân Quả Double-Dip",
            en: "The 7 Strategic Pillars Architecture & Double-Dip Causal Loop",
          },
          subtitle: {
            vi: "Mối quan hệ nhân quả giữa Lịch Sự kiện Động (Thi Đấu Hội / GAR / KvK), Nghiên cứu Arms Race Prep và tốc độ phát triển Đội hình 1 (Queue 1)",
            en: "Causal synergy between the Dynamic Event Calendar (Guild Race / GAR / KvK), Arms Race Prep Research, and Queue 1 Combat Power growth",
          },
          centerNode: {
            id: "core-true-combat-power",
            badge: {
              vi: "TRUNG TÂM CHIẾN LƯỢC",
              en: "STRATEGIC CORE",
            },
            title: {
              vi: "Tài Khoản Chuẩn Meta (True Combat Power)",
              en: "Meta-Standard Account (True Combat Power)",
            },
            subtitle: {
              vi: "Hội tụ 100% tài nguyên quý hiếm vào 6 vị tướng chính của Đội hình 1 (Queue 1)",
              en: "Funnel 100% of scarce progression currencies into the 6 main heroes of Queue 1",
            },
            tone: "gold",
          },
          nodes: [
            {
              id: "pillar-1-heroes",
              badge: { vi: "Trụ cột 1 • 35% PvP", en: "Pillar 1 • 35% PvP" },
              title: {
                vi: "1. Tướng & Đội Hình (Heroes & 1-Queue Rule)",
                en: "1. Heroes, Strict 1-Queue & Epic Traits",
              },
              subtitle: {
                vi: "Đội 1 (6 tướng chính) đột phá Sao Trắng; Tướng Tím 2 Sao Trắng (12 Sao = 300 Mảnh) kích hoạt +30% Nghiên cứu & Huấn luyện.",
                en: "Queue 1 (6 main heroes) White Star breakpoints; Epic heroes at 2 White Stars (12 Stars = 300 Shards) unlock +30% Research & Training.",
              },
              metrics: [
                { vi: "Tỷ trọng PvP: 35%", en: "PvP Weight: 35%" },
                { vi: "1★ Trắng Mythic = 560 Mảnh", en: "1★ White Mythic = 560 Shards" },
              ],
              tone: "gold",
            },
            {
              id: "pillar-2-infrastructure",
              badge: { vi: "Trụ cột 2 • 15% PvP", en: "Pillar 2 • 15% PvP" },
              title: {
                vi: "2. Hạ Tầng & Lâu Đài (Castle & Barracks Rush)",
                en: "2. Castle, Barracks & Infrastructure",
              },
              subtitle: {
                vi: "Đua cấp Lâu Đài & Doanh Trại chạm mốc chia hết cho 5 (Lv.20 / Lv.25 / Lv.30) để mở khóa Bậc lính (Troop Tier) và trần cấp tướng.",
                en: "Rush Castle & Faction Barracks to multiples of 5 (Lv.20 / Lv.25 / Lv.30) to unlock higher Troop Tiers and hero level caps.",
              },
              metrics: [
                { vi: "Tỷ trọng PvP: 15%", en: "PvP Weight: 15%" },
                { vi: "Mốc gãy: Lv.20 / 25 / 30", en: "Breakpoints: Lv.20 / 25 / 30" },
              ],
              tone: "blue",
            },
            {
              id: "pillar-3-gear",
              badge: { vi: "Trụ cột 3 • 20% PvP", en: "Pillar 3 • 20% PvP" },
              title: {
                vi: "3. Trang Bị & Thần Khí (Hero Gear, Lord Gear & Weapons)",
                en: "3. Hero Gear, Lord Gear & Exclusive Weapons",
              },
              subtitle: {
                vi: "Bộ 4 món Đồ Vàng có Dấu Hệ (+30% chỉ số), kích hoạt Cộng hưởng Cường hóa (+10/+20/+30/+40) và ưu tiên Nhánh Phải Trang bị Lãnh Chúa.",
                en: "4-piece Faction-Marked Legendary Gear (+30% stats), Enhancement Resonance (+10/+20/+30/+40), and Right-Side Lord Gear focus.",
              },
              metrics: [
                { vi: "Tỷ trọng PvP: 20%", en: "PvP Weight: 20%" },
                { vi: "Dấu Hệ: +30% Stats", en: "Faction Mark: +30% Stats" },
              ],
              tone: "emerald",
            },
            {
              id: "pillar-4-research",
              badge: { vi: "Trụ cột 4 • 10% PvP", en: "Pillar 4 • 10% PvP" },
              title: {
                vi: "4. Viện Nghiên Cứu (Tech Tree & Arms Race Prep)",
                en: "4. Research Cottage & Tech Tree",
              },
              subtitle: {
                vi: "Nhánh Chuẩn bị Chạy đua Vũ trang (Arms Race Prep) nhân đôi toàn bộ rương sự kiện; Nhánh Tăng cường Đội 1 (Queue 1 Boost) có ROI cao nhất.",
                en: "Arms Race Prep branch doubles all event milestone chests; Queue 1 Boost branch delivers the highest combat ROI.",
              },
              metrics: [
                { vi: "Tỷ trọng PvP: 10%", en: "PvP Weight: 10%" },
                { vi: "Nhân đôi Rương Sự kiện", en: "2x Event Chest Rewards" },
              ],
              tone: "emerald",
            },
            {
              id: "pillar-5-shops",
              badge: { vi: "Trụ cột 5 • 5% PvP", en: "Pillar 5 • 5% PvP" },
              title: {
                vi: "5. Kinh Tế Cửa Hàng (Shops & Guild Honor Freeze)",
                en: "5. Shops, Currencies & Troop Skins",
              },
              subtitle: {
                vi: "Đóng băng Điểm Vinh Dự Bang & Xu Vinh Quang để mua 9 Hồn Đá Đỏ (Soul Stones) + 345–385 Mảnh thức tỉnh Tướng Vàng ở Lâu đài Lv.30.",
                en: "Freeze Guild Honor & Guild Glory Coins to purchase 9 Soul Stones + 345–385 Shards for Legendary-to-Mythic Awakening at Castle Lv.30.",
              },
              metrics: [
                { vi: "Tỷ trọng PvP: 5%", en: "PvP Weight: 5%" },
                { vi: "Thức tỉnh: 9 Hồn Đá Đỏ", en: "Awakening: 9 Soul Stones" },
              ],
              tone: "gold",
            },
            {
              id: "pillar-6-events",
              badge: { vi: "Trụ cột 6 • Đòn bẩy x2–x3", en: "Pillar 6 • x2–x3 Multiplier" },
              title: {
                vi: "6. Lịch Sự Kiện Động & Double-Dip (Guild Race / GAR / KvK)",
                en: "6. Dynamic Server Calendar & Double-Dip",
              },
              subtitle: {
                vi: "Đọc Lịch Event 09:00 Thứ Hai: từ Thi Đấu Hội chạy nối tiếp hàng tuần (kèm Tập Kích Cự Ma / Khiêu Chiến Của Đội Quân Hắc Ám) sang luân phiên GAR / KvK 6 ngày.",
                en: "Read the Monday 09:00 Event Calendar: transition from continuous weekly Guild Race (with Giant Raid / Dark Army Challenge) to 6-day GAR / KvK rotation.",
              },
              metrics: [
                { vi: "Đòn bẩy x2–x3 tốc độ", en: "x2–x3 Speed Leverage" },
                { vi: "Check Lịch 09:00 Thứ Hai", en: "Monday 09:00 Calendar Check" },
              ],
              tone: "rose",
            },
            {
              id: "pillar-7-runes-pets",
              badge: { vi: "Trụ cột 7 • 15% PvP", en: "Pillar 7 • 15% PvP" },
              title: {
                vi: "7. Cổ Ngữ, Thánh Vật & Pet (Runes, Relics & Pets Breakpoints)",
                en: "7. Runes, Relics, Pets & Behemoth",
              },
              subtitle: {
                vi: "Kích hoạt các điểm gãy cộng chỉ số theo phần trăm (% ATK / % HP) và mở rộng Quy mô Hành quân (March Size) ở Mid/Late-game.",
                en: "Trigger percentage stat breakpoints (% ATK / % HP) and expand March Size during Mid and Late-game.",
              },
              metrics: [
                { vi: "Tỷ trọng PvP: 15%", en: "PvP Weight: 15%" },
                { vi: "Tăng % ATK/HP & March Size", en: "+% ATK/HP & March Size" },
              ],
              tone: "slate",
            },
          ],
          footnote: {
            vi: "Chu trình khép kín: Trụ cột 4 (Nhánh Arms Race Prep) nhân đôi rương thưởng của Trụ cột 6 (Thi Đấu Hội / GAR / KvK) ➔ Trụ cột 6 cung cấp x2–x3 Mảnh Vàng, Sách Kỹ năng & Hồn Đá Đỏ nuôi ngược lại Trụ cột 1 và Trụ cột 5.",
            en: "Closed-Loop Synergy: Pillar 4 (Arms Race Prep) doubles Pillar 6 chests (Guild Race / GAR / KvK) ➔ Pillar 6 feeds 2x–3x Universal Shards, Skill Books & Soul Stones directly back into Pillar 1 and Pillar 5.",
          },
        },
      ],
      subSections: [
        {
          id: "sub-1-1-pillars-table",
          title: {
            vi: "1.1. Tổng quan 7 Trụ cột Chiến thuật trong Top Heroes",
            en: "1.1. Overview of the 7 Strategic Pillars in Top Heroes",
          },
          badge: {
            vi: "MA TRẬN 7 TRỤ CỘT",
            en: "7 PILLARS MATRIX",
          },
          blocks: [
            {
              type: "table",
              caption: {
                vi: "Bảng phân tích vai trò cốt lõi và tỷ trọng ảnh hưởng PvP của 7 Trụ cột Chiến thuật",
                en: "Core ecosystem roles and PvP combat impact weights of the 7 Strategic Pillars",
              },
              headers: [
                { vi: "Mã Trụ Cột", en: "Pillar Code" },
                { vi: "Tên Trụ Cột (Việt / Anh)", en: "Pillar Name (VI / EN)" },
                { vi: "Vai Trò Cốt Lõi Trong Hệ Sinh Thái", en: "Core Role in the Ecosystem" },
                { vi: "Tỷ Trọng Ảnh Hưởng PvP", en: "PvP Impact Weight" },
              ],
              rows: [
                [
                  { vi: "Trụ cột 1", en: "Pillar 1" },
                  {
                    vi: "Tướng, Quy tắc 1 Hàng & Thiên phú Tím (Heroes, Strict 1-Queue & Epic Traits)",
                    en: "Heroes, Strict 1-Queue & Epic Traits",
                  },
                  {
                    vi: "Xây dựng Đội hình 1 (Queue 1 — 6 tướng chính) đạt mốc Sao đột phá; dùng Tướng Tím 2 Sao Trắng / Bạc (12 Sao = 300 Mảnh) làm động cơ kinh tế vĩnh cửu (+30% Tốc độ Nghiên cứu & Huấn luyện).",
                    en: "Build Queue 1 (6 main heroes) to star breakpoints; use Epic Heroes at 2 White / Silver Stars (12 Stars = 300 Shards) as permanent economy engines (+30% Research & Training speed).",
                  },
                  { vi: "35%", en: "35%" },
                ],
                [
                  { vi: "Trụ cột 2", en: "Pillar 2" },
                  {
                    vi: "Công trình & Hạ tầng Làng (Castle, Barracks & Infrastructure)",
                    en: "Castle, Barracks & Infrastructure",
                  },
                  {
                    vi: "Đua cấp Lâu Đài (Castle) và Doanh Trại (Barracks) lên các mốc chia hết cho 5 (Lv.20 / Lv.25 / Lv.30) để mở khóa bậc lính (Troop Tier) cao hơn và tăng giới hạn cấp tướng.",
                    en: "Rush Castle and Faction Barracks to milestones divisible by 5 (Lv.20 / Lv.25 / Lv.30) to unlock higher Troop Tiers and raise hero level caps.",
                  },
                  { vi: "15%", en: "15%" },
                ],
                [
                  { vi: "Trụ cột 3", en: "Pillar 3" },
                  {
                    vi: "Trang bị Tướng, Lãnh Chúa & Vũ khí Độc quyền (Hero Gear, Lord Gear & Exclusive Weapons)",
                    en: "Hero Gear, Lord Gear & Exclusive Weapons",
                  },
                  {
                    vi: "Tối ưu bộ 4 món Trang bị Vàng (Legendary Gear) có gán Dấu Hệ (+30% chỉ số), kích hoạt cộng hưởng cường hóa (+10/+20/+30/+40) và nâng Nhánh Phải của Trang bị Lãnh Chúa (Lord Gear).",
                    en: "Optimize 4-piece Legendary Gear sets with Faction Marks (+30% stats), activate enhancement resonance (+10/+20/+30/+40), and prioritize the Right Side of Lord Gear.",
                  },
                  { vi: "20%", en: "20%" },
                ],
                [
                  { vi: "Trụ cột 4", en: "Pillar 4" },
                  {
                    vi: "Viện Nghiên cứu & Cây Công nghệ (Research Cottage & Tech Tree)",
                    en: "Research Cottage & Tech Tree",
                  },
                  {
                    vi: "Mở khóa nhanh nhánh Chuẩn bị Chạy đua Vũ trang (Arms Race Prep) để nhân đôi toàn bộ rương thưởng sự kiện và nhánh Tăng cường Đội 1 (Queue 1 Boost) — khoản đầu tư có ROI (Return on Investment — Tỷ suất Hoàn vốn / Hiệu quả Đầu tư) cao nhất toàn tài khoản.",
                    en: "Rush the Arms Race Prep branch to double all event milestone chests alongside the Queue 1 Boost branch — the highest ROI (Return on Investment) tech path in the entire account.",
                  },
                  { vi: "10%", en: "10%" },
                ],
                [
                  { vi: "Trụ cột 5", en: "Pillar 5" },
                  {
                    vi: "Hệ thống Cửa hàng & Tiền tệ (Shops, Currencies & Troop Skins)",
                    en: "Shops, Currencies & Troop Skins",
                  },
                  {
                    vi: "Quản trị Điểm Vinh Dự Bang (Guild Honor) và Xu Vinh Quang (Guild Glory Coins) để mua Hồn Đá Đỏ (Soul Stones) thức tỉnh tướng Vàng lên Đỏ khi Lâu đài đạt Lv.30 (9 Hồn Đá Đỏ + 345–385 Mảnh Tướng).",
                    en: "Manage Guild Honor and Guild Glory Coins to purchase Red Soul Stones for awakening Legendary heroes to Mythic at Castle Lv.30 (9 Red Soul Stones + 345–385 Hero Shards).",
                  },
                  { vi: "5%", en: "5%" },
                ],
                [
                  { vi: "Trụ cột 6", en: "Pillar 6" },
                  {
                    vi: "Lịch Sự kiện Động & Giao thoa Phần thưởng (Dynamic Server Calendar & Double-Dip)",
                    en: "Dynamic Server Calendar & Double-Dip",
                  },
                  {
                    vi: "Đọc Lịch Event (09:00 Thứ Hai) để điều phối tài nguyên theo đúng pha máy chủ: từ giai đoạn Thi Đấu Hội chạy nối tiếp hàng tuần (09:00 Thứ Hai ➔ 09:00 Thứ Hai ở đầu Pre-Season, leo hạng Bang D ➔ S kèm sự kiện vệ tinh Tập Kích Cự Ma / Khiêu Chiến Của Đội Quân Hắc Ám) sang chu kỳ luân phiên Thi Đấu Hội ⇄ GAR / KvK 6 ngày kết hợp Sự kiện Phụ (Double-Dip).",
                    en: "Read the Monday 09:00 Event Calendar to sync spending with your server's active phase: from continuous weekly Guild Race (running Monday 09:00 ➔ Monday 09:00 in early Pre-Season while climbing Guild Rank D ➔ S alongside Giant Raid & Dark Legion Challenge) to the 6-day alternating Guild Race ⇄ GAR / KvK rotation with sub-event Double-Dipping.",
                  },
                  { vi: "Đòn bẩy x2–x3 tốc độ", en: "x2–x3 Speed Multiplier" },
                ],
                [
                  { vi: "Trụ cột 7", en: "Pillar 7" },
                  {
                    vi: "Cổ Ngữ, Thánh Vật & Thú Cưng (Runes, Relics, Pets & Behemoth)",
                    en: "Runes, Relics, Pets & Behemoth",
                  },
                  {
                    vi: "Kích hoạt các mốc cộng chỉ số theo phần trăm (% ATK / % HP) và tăng Quy mô Hành quân (March Size) ở giai đoạn Giữa và Cuối game.",
                    en: "Unlock percentage stat breakpoints (% ATK / % HP) and expand March Size throughout Mid and Late-game.",
                  },
                  { vi: "15%", en: "15%" },
                ],
              ],
            },
          ],
        },
        {
          id: "sub-1-2-true-vs-inflated",
          title: {
            vi: "1.2. Phân biệt \"Lực Chiến Thật (Combat Power)\" vs \"Lực Chiến Ảo (Inflated Power)\"",
            en: "1.2. Distinguishing \"True Combat Power\" vs. \"Inflated / Bloated Power\"",
          },
          badge: {
            vi: "THỰC CHIẾN VS ẢO",
            en: "TRUE VS INFLATED",
          },
          blocks: [
            {
              type: "paragraph",
              text: {
                vi: "**Con số Tổng Lực Chiến (`Total Influence`) ở góc trái màn hình là cú lừa thị giác lớn nhất của dòng game chiến thuật 4X.**\n• **Quy luật Thực chiến:** Trong Đấu Trường (`Arena`), Chiến tranh Vương quốc (`KvK`) hay Cướp Xe Hàng (`Plunder Carriages`), chỉ có `6 vị tướng` thuộc Đội hình 1 (`Queue 1`) trực tiếp bước lên sàn đấu.",
                en: "**The `Total Influence` (`Total Power`) number in the top-left corner of the screen is the biggest visual trap in 4X strategy games.**\n• **Combat Reality:** In real battles (`Arena`, `Kingdom vs. Kingdom / KvK`, or `Plunder Carriages`), only the `6 heroes` inside `Queue 1` ever step onto the battlefield.",
              },
            },
            {
              type: "table",
              caption: {
                vi: "Bảng đối chiếu bản chất và hệ quả giữa Lực Chiến Thực Chiến (Đội 1) và Lực Chiến Ảo",
                en: "Direct comparison between True Combat Power (Queue 1) and Inflated / Bloated Power",
              },
              headers: [
                { vi: "Tiêu Chí So Sánh", en: "Comparison Criterion" },
                {
                  vi: "Lực Chiến Thực Chiến (True Combat Power)",
                  en: "True Combat Power (Queue 1 Focus)",
                },
                {
                  vi: "Lực Chiến Ảo / Phình To (Inflated / Bloated Power)",
                  en: "Inflated / Bloated Power (Account-Wide Spread)",
                },
              ],
              rows: [
                [
                  { vi: "Nguồn hình thành", en: "Primary Source" },
                  {
                    vi: "Chỉ số ATK, HP, DEF, Cấp Kỹ năng, Trang bị Vàng có Dấu Hệ, Cổ Ngữ Lv.5+, Thánh vật và Bậc lính mang theo của 6 tướng Đội hình 1 (Queue 1).",
                    en: "ATK, HP, DEF, Skill Levels, Faction-Marked Legendary Gear, Lv.5+ Runes, Relics, and high-tier troops carried by the 6 heroes of Queue 1.",
                  },
                  {
                    vi: "Lực chiến cộng dồn từ 15–30 tướng dự bị ở Đội 2/3/4, hàng vạn lính cấp thấp nhàn rỗi trong doanh trại, cấp độ Nhà Kho (Warehouse) và Tháp Canh (Watchtower).",
                    en: "Cumulative power from 15–30 bench heroes in Queues 2/3/4, tens of thousands of idle low-tier troops in barracks, and non-combat buildings like Warehouse and Watchtower.",
                  },
                ],
                [
                  { vi: "Hiệu quả trong PvP & Đấu Trường", en: "PvP & Arena Effectiveness" },
                  {
                    vi: "100% chuyển hóa thành sát thương và độ chống chịu. Đội 1 đạt 5.0M lực chiến thực sẽ đánh bại mọi đội hình 3.5M–4.2M bất kể tổng lực chiến đối phương cao hơn.",
                    en: "100% converted into real damage and survivability. A 5.0M Queue 1 will crush any 3.5M–4.2M lineup regardless of how much higher the opponent's Total Influence is.",
                  },
                  {
                    vi: "0% tác dụng trong trận đấu đơn. Tướng ngồi ở nhà hoặc ở Đội 3 không tham gia đánh giúp Đội 1.",
                    en: "0% impact in single-march battles. Bench heroes sitting at home or in Queue 3 never join the fight to help Queue 1.",
                  },
                ],
                [
                  { vi: "Hệ quả trong Ghép cặp Sự kiện", en: "Event Matchmaking Impact" },
                  {
                    vi: "Giữ tổng lực chiến gọn gàng giúp bang hội và cá nhân gặp đối thủ vừa tầm trong KvK / GAR (Guild Arms Race — Đua Vũ Trang Bang Hội).",
                    en: "Keeping total influence lean ensures your guild and account face fair, manageable opponents in KvK / GAR (Guild Arms Race).",
                  },
                  {
                    vi: "Đẩy tổng lực chiến của bang hội lên cao ảo, dẫn đến việc bị hệ thống ghép cặp (Matchmaking) xếp gặp các máy chủ \"Cá Voi\" (Whales) thực thụ.",
                    en: "Artificially inflates guild matchmaking rating, forcing your server into brackets against true Whale servers.",
                  },
                ],
                [
                  { vi: "Tác hại khi bị tấn công Lâu đài", en: "Castle Siege Vulnerability" },
                  {
                    vi: "Lính tinh nhuệ bậc cao nằm gọn trong Đội 1 dễ dàng rút lui hoặc bật Khiên bảo vệ.",
                    en: "Elite high-tier troops fit cleanly inside Queue 1 and can be easily shielded or garrisoned/evacuated.",
                  },
                  {
                    vi: "Hàng chục ngàn lính cấp thấp nằm chờ trong thành trở thành \"mỏ điểm miễn phí\" cho kẻ địch tàn sát trong Ngày 6 (Kill Event), làm tràn Bệnh Viện (Hospital) ngay lập tức.",
                    en: "Tens of thousands of idle low-tier troops become free point farms for enemies during Day 6 (Kill Event), overflowing your Hospital instantly.",
                  },
                ],
              ],
            },
            {
              type: "media_spotlight",
              mediaCode: "MED-1.1-02",
              tier: "tier2_annotated_ui",
              title: {
                vi: "Minh Họa Báo Cáo Chiến Đấu (Battle Report): Acc 15M (Đội 1 5.5M) Thắng Áp Đảo Acc 21M (Đội 1 4.1M)",
                en: "Annotated Battle Report: 15M Account (5.5M Queue 1) Crushes 21M Account (4.1M Queue 1)",
              },
              description: {
                vi: "Ảnh chụp màn hình Báo cáo Chiến đấu (Battle Report) đối chiếu tài khoản 15M Tổng lực chiến (Đội 1 đạt 5.5M) đánh bại hoàn toàn tài khoản 21M Tổng lực chiến (Đội 1 chỉ đạt 4.1M do nuôi dàn trải 3 đội).",
                en: "Annotated Battle Report comparing a lean 15M Total Influence account (with a 5.5M Queue 1) completely wiping a bloated 21M Total Influence account (whose Queue 1 is stuck at 4.1M due to splitting resources across 3 queues).",
              },
              annotations: [
                {
                  kind: "do",
                  label: {
                    vi: "CHUẨN META — HỘI TỤ ĐỘI 1 (15M TỔNG / 5.5M ĐỘI 1)",
                    en: "META STANDARD — QUEUE 1 FUNNEL (15M TOTAL / 5.5M QUEUE 1)",
                  },
                  detail: {
                    vi: "Dồn 100% Mảnh Vàng, Sách Kỹ năng và Đồ Vàng Dấu Hệ cho 6 tướng Đội 1 giúp vượt ngưỡng trừ giáp và kết thúc trận đấu khi vẫn còn >80% HP.",
                    en: "Funneling 100% of Universal Shards, Skill Books, and Faction-Marked Legendary Gear into Queue 1 overcomes armor mitigation and wins with >80% HP remaining.",
                  },
                },
                {
                  kind: "dont",
                  label: {
                    vi: "BẪY LỰC CHIẾN ẢO (21M TỔNG / 4.1M ĐỘI 1)",
                    en: "INFLATED POWER TRAP (21M TOTAL / 4.1M QUEUE 1)",
                  },
                  detail: {
                    vi: "Chia đều tài nguyên cho 3 đội khiến Đội 1 thiếu sát thương dứt điểm, bị khắc chế cấp sao (Star Suppression) và làm mồi điểm trong ngày Kill Event.",
                    en: "Splitting resources across 3 queues leaves Queue 1 under-starred, vulnerable to Star Suppression, and unable to break through enemy frontlines.",
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "sec-2-factions-and-pivot",
      title: {
        vi: "2. Chiến thuật Tối ưu cho F2P & Low-Spender: Định Hướng 3 Phe Phái & Lộ Trình Chuyển Giao",
        en: "2. F2P & Low-Spender Strategy: 3-Faction Analysis & The Meta Horde Pivot",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "**Mọi anh hùng trong Top Heroes thuộc một trong `3 Phe phái` (`Factions`) khắc chế vòng tròn và cộng hưởng Hào Quang Đồng Hệ (`Faction Aura`).**\n• **Vòng tròn Khắc chế (`+20% DMG` / `-20% DMG Taken`):** Bộ Lạc (`Horde`) khắc Liên Minh (`League`) ➔ Liên Minh khắc Thiên Nhiên (`Nature`) ➔ Thiên Nhiên khắc Bộ Lạc.\n• **Mốc Hào Quang Đồng Hệ:** Xếp `4 Tướng` cùng hệ (`+15% ATK & HP`), `5 Tướng` cùng hệ (`+25% ATK & HP`), và `6 Tướng` thuần hệ (`+35% ATK & HP` + Liên kết Phe phái).",
            en: "**Every hero in Top Heroes belongs to one of `3 Factions` locked in a counter loop while scaling with `Faction Aura` bonuses.**\n• **Counter Loop (`+20% DMG Dealt` / `-20% DMG Taken`):** `Horde` counters `League` ➔ `League` counters `Nature` ➔ `Nature` counters `Horde`.\n• **Faction Aura Milestones:** `4 Same-Faction` (`+15% ATK & HP`), `5 Same-Faction` (`+25% ATK & HP`), and `6 Pure-Faction` (`+35% ATK & HP` + Faction Bond passive).",
          },
        },
        {
          type: "media_spotlight",
          mediaCode: "MED-1.1-03",
          tier: "tier1_faction_loop",
          title: {
            vi: "Vòng Tròn Khắc Chế 3 Phe Phái (+20% DMG) & 3 Mốc Hào Quang Đồng Hệ",
            en: "3-Faction Counter Loop (+20% DMG) & Faction Aura Milestones",
          },
          description: {
            vi: "Bộ biểu tượng 3 Phe phái chuẩn hóa (/images/guides/factions/league-emblem.webp, horde-emblem.webp, nature-emblem.webp) kèm mũi tên khắc chế +20% DMG Dealt / -20% DMG Taken và mốc Hào quang 4/5/6 tướng (+15% / +25% / +35% ATK & HP).",
            en: "Standardized 3-Faction emblem set (/images/guides/factions/league-emblem.webp, horde-emblem.webp, nature-emblem.webp) showing the +20% DMG Dealt / -20% DMG Taken counter loop and 4/5/6-hero Faction Aura milestones (+15% / +25% / +35% ATK & HP).",
          },
        },
      ],
      subSections: [
        {
          id: "sub-2-1-three-factions",
          title: {
            vi: "2.1. Phân tích Đặc tính Chiến thuật của 3 Phe Phái (League / Horde / Nature)",
            en: "2.1. Tactical Breakdown of the 3 Factions (League / Horde / Nature)",
          },
          badge: {
            vi: "SO SÁNH 3 PHE PHÁI",
            en: "3-FACTION COMPARISON",
          },
          blocks: [
            {
              type: "table",
              caption: {
                vi: "Phân tích chuyên sâu cơ chế, số lượng Tướng Đỏ (Mythic) và rào cản Đá Linh Hồn (Soul Stones) của 3 Phe phái",
                en: "In-depth analysis of mechanics, Mythic hero counts, and Soul Stone awakening barriers across all 3 Factions",
              },
              headers: [
                { vi: "Phe Phái", en: "Faction" },
                { vi: "Đặc Điểm Lối Chơi & Cơ Chế", en: "Playstyle & Core Mechanics" },
                { vi: "Ưu Điểm Nổi Bật", en: "Key Strengths" },
                { vi: "Nhược Điểm & Rào Cản Chi Phí", en: "Weaknesses & Cost Barrier" },
                { vi: "Nhóm Người Chơi Phù Hợp", en: "Ideal Player Profile" },
              ],
              rows: [
                [
                  { vi: "Liên Minh (League)", en: "League" },
                  {
                    vi: "Sát thương phép diện rộng (AoE Burst), tạo khiên dày và buff tốc độ đánh/giảm hồi chiêu.",
                    en: "AoE magic burst damage, thick shields, and attack speed / cooldown reduction buffs.",
                  },
                  {
                    vi: "Rất dễ thu thập tướng Vàng đầu game (Pyromancer, Adjudicator, Secret Keeper, Nun, Bard, Astrologer). Mạnh ngay từ Ngày 1–20.",
                    en: "Extremely easy to collect Legendary heroes early on (Pyromancer, Adjudicator, Secret Keeper, Nun, Bard, Astrologer). Strong right from Days 1–20.",
                  },
                  {
                    vi: "Về cuối game (Endgame), đội hình chuẩn của Liên Minh chỉ có 3 Tướng Đỏ (Mythic) (Paragon, Rose Princess, Bishop), buộc phải dùng tới 3 Tướng Vàng Thức tỉnh (tốn 3 × 9 = 27 Hồn Đá Đỏ + 345–385 Mảnh/tướng). Ngoài ra, 80% người chơi server mới theo Liên Minh nên rất dễ bị khắc chế.",
                    en: "In Endgame, standard League lineups only have 3 Mythic heroes (Paragon, Rose Princess, Bishop), forcing you to awaken 3 Legendary heroes (costing 3 × 9 = 27 Soul Stones + 345–385 Shards/hero). Furthermore, 80% of new server players run League, making it heavily countered.",
                  },
                  {
                    vi: "Người chơi khởi đầu Ngày 1–20; hoặc người nạp tầm trung–cao (Dolphin/Whale) thích dồn sát thương phép.",
                    en: "Early-game starters (Days 1–20); or Mid-to-High spenders (Dolphins/Whales) who prefer magic burst.",
                  },
                ],
                [
                  { vi: "Bộ Lạc (Horde)", en: "Horde" },
                  {
                    vi: "Đấu sĩ cận chiến lăn xả, hút máu, bạo kích tốc độ cao và nhảy thẳng vào hàng sau đối phương.",
                    en: "Aggressive melee brawlers, lifesteal, high-speed critical strikes, and backline diving.",
                  },
                  {
                    vi: "Sở hữu tới 5 Tướng Đỏ (Mythic) cực mạnh (Desert Prince, Storm Maiden, Witch, Wukong, Beastmaster). Chỉ cần thức tỉnh duy nhất 1 Tướng Vàng (Soulmancer hoặc Warlock = chỉ tốn 9 Hồn Đá Đỏ (Soul Stones) + 345–385 Mảnh Tướng từ mốc 1–2 Sao Trắng / 11–12 Sao). Khắc chế cứng 80% server đang chơi Liên Minh!",
                    en: "Boasts 5 powerhouse Mythic heroes (Desert Prince, Storm Maiden, Witch, Wukong, Beastmaster). Requires awakening only 1 Legendary hero (Soulmancer or Warlock = costing just 9 Red Soul Stones + 345–385 Hero Shards from 1–2 White Stars / 11–12 Stars). Hard-counters 80% of League players on the server!",
                  },
                  {
                    vi: "Giai đoạn Ngày 1–20 dàn tướng Vàng Bộ Lạc (Barbarian, Wilderness Hunter, Shaman) khá yếu và thiếu sát thương diện rộng.",
                    en: "During Days 1–20, starter Legendary Horde heroes (Barbarian, Wilderness Hunter, Shaman) are relatively weak and lack AoE waveclear.",
                  },
                  {
                    vi: "Khuyên dùng số 1 cho F2P & Low-Spender thực hiện chiến thuật Chuyển giao từ Ngày 21+.",
                    en: "#1 Recommended choice for F2P & Low-Spenders executing the Meta Horde Pivot from Day 21+.",
                  },
                ],
                [
                  { vi: "Thiên Nhiên (Nature)", en: "Nature" },
                  {
                    vi: "Triệu hồi đệ (Summon Units), hồi máu liên tục và phản đòn bền bỉ theo thời gian.",
                    en: "Unit summoning (Summon Units), sustained healing over time, and resilient counter-attacks.",
                  },
                  {
                    vi: "Cực kỳ khó chịu ở giai đoạn Season 1+ khi có bộ đôi Tidecaller + Monk + Ne Zha tạo ra biển quân triệu hồi chặn đứng sát thương đơn mục tiêu.",
                    en: "Extremely oppressive in Season 1+ once Tidecaller + Monk + Ne Zha flood the board with summoned units that absorb single-target burst.",
                  },
                  {
                    vi: "Khó xây dựng nhất ở giai đoạn đầu (Ngày 1–41 thiếu tướng gánh đội). Tương tự Liên Minh, đội hình chuẩn thường cần thức tỉnh 2 tướng Vàng (Pixie, Sage hoặc Forest Maiden), tốn 18 Hồn Đá Đỏ (2 × 9 Đá + 345–385 Mảnh/tướng).",
                    en: "Hardest faction to build early on (lacks a true carry during Days 1–41). Standard lineups require awakening 2 Legendary heroes (Pixie, Sage, or Forest Maiden), costing 18 Soul Stones (2 × 9 Stones + 345–385 Shards/hero).",
                  },
                  {
                    vi: "Người chơi kiên nhẫn chờ đến Ngày 42+ / Season 1, hoặc muốn khắc chế các máy chủ có quá nhiều người chơi Bộ Lạc.",
                    en: "Patient players waiting for Day 42+ / Season 1, or those targeting Horde-heavy servers.",
                  },
                ],
              ],
            },
          ],
        },
        {
          id: "sub-2-2-horde-pivot",
          title: {
            vi: "2.2. Chiến thuật \"Khởi Đầu Liên Minh ➔ Chuyển Giao Bộ Lạc (Ngày 21–41)\" (The Meta Horde Pivot)",
            en: "2.2. The \"League Start ➔ Horde Pivot (Days 21–41)\" Strategy (The Meta Horde Pivot)",
          },
          badge: {
            vi: "LỘ TRÌNH CHUYỂN GIAO 3 BƯỚC",
            en: "3-STEP PIVOT ROADMAP",
          },
          blocks: [
            {
              type: "paragraph",
              text: {
                vi: "**Lộ trình thông minh nhất cho F2P và Low-Spender là chiến thuật Chuyển giao `3 Bước` (`3-Step Pivot`).**\n• **Tránh 2 thái cực sai lầm:** Không cố chấp chơi thuần Bộ Lạc từ Ngày 1 (thọt PvE/PvP 3 tuần đầu) và không lún quá sâu vào Liên Minh (bị kẹt bức tường `27 Hồn Đá Đỏ` ở Season 1).",
                en: "**The smartest progression path for F2P and Low-Spenders is the `3-Step Pivot` (`League ➔ Horde`).**\n• **Avoid Both Extremes:** Do not force pure Horde on Day 1 (weak early PvE/PvP for 3 weeks) or over-invest in League (getting trapped by a `27 Soul Stone` wall in Season 1).",
              },
            },
            {
              type: "roadmap",
              steps: [
                {
                  badge: { vi: "BƯỚC 1", en: "STEP 1" },
                  title: {
                    vi: "Giai đoạn 1: Khởi đầu bằng Đội 1 Liên Minh",
                    en: "Phase 1: Start with a Pure League Queue 1",
                  },
                  timing: {
                    vi: "Ngày 1 – Ngày 20",
                    en: "Day 1 – Day 20",
                  },
                  description: {
                    vi: "**Dùng mảnh tướng rơi tự nhiên từ Quán Rượu lắp đội hình `6 tướng Vàng Liên Minh` (`Adjudicator`, `Secret Keeper`, `Pyromancer`, `Astrologer`, `Nun`, `Bard`).**\n• **Kỷ luật Tích trữ:** Tuyệt đối đóng băng `100% Mảnh Vạn Năng Vàng` bắt đầu từ đầu `Tuần 3`.",
                    en: "**Use natural hero-specific shards from the Tavern to assemble a `6-Legendary League` lineup (`Adjudicator`, `Secret Keeper`, `Pyromancer`, `Astrologer`, `Nun`, `Bard`).**\n• **Hoarding Discipline:** Strictly freeze `100% of Universal Legendary Shards` starting at `Week 3`.",
                  },
                },
                {
                  badge: { vi: "BƯỚC 2", en: "STEP 2" },
                  title: {
                    vi: "Giai đoạn 2: Lắp Đội hình Lai (4 Liên Minh + 2 Bộ Lạc)",
                    en: "Phase 2: Deploy the Hybrid Lineup (4 League + 2 Horde)",
                  },
                  timing: {
                    vi: "Ngày 21 – Ngày 40",
                    en: "Day 21 – Day 40",
                  },
                  description: {
                    vi: "**Dùng Kim Cương tích trữ mở khóa ngay `Desert Prince` (`Ngày 21`) và `Storm Maiden` (`Ngày 27`) khi sự kiện ra mắt.**\n• **Đột phá Đội Lai:** Dồn Mảnh Vạn Năng đẩy cả hai lên `1 Sao Trắng` (`11 Sao` = `560` Mảnh Quy Đổi) và đưa vào Đội 1 thay thế `Secret Keeper` cùng `Astrologer`.",
                    en: "**Spend saved Diamonds to immediately unlock `Desert Prince` (`Day 21`) and `Storm Maiden` (`Day 27`) upon release.**\n• **Hybrid Breakthrough:** Funnel Universal Shards to push both to `1 White Star` (`11 Stars` = `560` Shards) and slot them into Queue 1 replacing `Secret Keeper` and `Astrologer`.",
                  },
                },
                {
                  badge: { vi: "BƯỚC 3", en: "STEP 3" },
                  title: {
                    vi: "Giai đoạn 3: Hoàn tất Thuần Bộ Lạc 100%",
                    en: "Phase 3: Complete the 100% Pure Horde Transition",
                  },
                  timing: {
                    vi: "Từ Ngày 41 trở đi",
                    en: "Day 41 Onward",
                  },
                  description: {
                    vi: "**Khi `Witch` ra mắt vào `Ngày 41`, lấy làm Healer chủ lực và chuyển toàn bộ Đội 1 sang `6 tướng Bộ Lạc` thuần hệ.**\n• **Đội hình Bộ Lạc:** Gồm `Desert Prince`, `Swordmaster/Beastmaster`, `Storm Maiden`, `Wilderness Hunter/Wukong`, `Witch`, và `Soulmancer/Warlock`.\n• **Thừa kế 0 Đồng:** Chuyển toàn bộ Đồ Vàng `+10/+20` sang tướng Bộ Lạc và đẩy `6 tướng Liên Minh` cũ xuống làm Đội 2 hoàn chỉnh miễn phí!",
                    en: "**When `Witch` arrives on `Day 41`, claim her as your main Healer and convert Queue 1 into `6 pure Horde` heroes.**\n• **Pure Horde Lineup:** Field `Desert Prince`, `Swordmaster/Beastmaster`, `Storm Maiden`, `Wilderness Hunter/Wukong`, `Witch`, and `Soulmancer/Warlock`.\n• **Zero-Cost Inheritance:** Transfer all `+10/+20` Legendary Gear onto Horde and push your `6 old League` heroes down to form Queue 2 for free!",
                  },
                },
              ],
            },
          ],
        },
        {
          id: "sub-2-3-server-lifecycle",
          title: {
            vi: "2.3. Bản Đồ Vòng Đời Máy Chủ 4 Giai Đoạn (S0 ➔ S4 Server Lifecycle) & Chuẩn Hóa Hệ Thống 15 Sao",
            en: "2.3. 4-Stage Server Lifecycle Map (S0 ➔ S4) & Standardized 15-Star System",
          },
          badge: {
            vi: "VÒNG ĐỜI S0➔S4 & HỆ 15 SAO",
            en: "S0➔S4 LIFECYCLE & 15-STAR SYSTEM",
          },
          blocks: [
            {
              type: "paragraph",
              text: {
                vi: "Để giúp Tân thủ hình dung toàn cảnh thời điểm mở khóa các tính năng cốt lõi, cơ chế Lịch Sự kiện Động 2 Giai đoạn và chi phí nâng sao tướng theo chuẩn quốc tế:",
                en: "To help players visualize when core systems unlock, how the 2-Phase Dynamic Event Schedule evolves, and the exact international star-up costs:",
              },
            },
            {
              type: "table",
              caption: {
                vi: "Bản đồ vòng đời máy chủ 4 giai đoạn từ S0 Pre-Season đến Season 4",
                en: "4-stage server progression lifecycle from S0 Pre-Season through Season 4",
              },
              headers: [
                { vi: "Giai Đoạn Máy Chủ", en: "Server Stage" },
                { vi: "Khung Thời Gian (Tuổi Server)", en: "Timeframe (Server Age)" },
                { vi: "Tính Năng & Công Trình Cốt Lõi Mở Khóa", en: "Core Features & Buildings Unlocked" },
                { vi: "Tướng Trọng Điểm Ra Mắt & Mục Tiêu Chiến Thuật", en: "Key Hero Releases & Strategic Objectives" },
              ],
              rows: [
                [
                  { vi: "Giai đoạn 1: S0 Pre-Season", en: "Stage 1: S0 Pre-Season" },
                  { vi: "Ngày 1 – Ngày 65", en: "Day 1 – Day 65" },
                  {
                    vi: "Lâu đài Lv.1 ➔ Lv.30, Quán Rượu, Thánh vật cơ bản, Lò Rèn Trang bị Vàng, Lịch Sự kiện Động: Thi Đấu Hội chạy nối tiếp hàng tuần (09:00 Thứ Hai ➔ 09:00 Thứ Hai, leo hạng Bang D ➔ C ➔ B ➔ A ➔ S kèm Tập Kích Cự Ma / Khiêu Chiến Của Đội Quân Hắc Ám) trước khi chuyển sang luân phiên Thi Đấu Hội ⇄ GAR / KvK.",
                    en: "Castle Lv.1 ➔ Lv.30, Tavern, basic Relics, Legendary Gear Blacksmith, Dynamic Event Schedule: continuous weekly Guild Race (from Monday 09:00 ➔ Monday 09:00 climbing Guild Rank D ➔ C ➔ B ➔ A ➔ S alongside Giant Raid & Dark Legion Challenge) before transitioning into alternating Guild Race ⇄ GAR / KvK.",
                  },
                  {
                    vi: "Ra mắt Desert Prince (Ngày 21), Storm Maiden (Ngày 27), Paragon (Ngày 35), Witch (Ngày 41), Rose Princess (Ngày 46). Chuyển giao Liên Minh ➔ Bộ Lạc.",
                    en: "Releases Desert Prince (Day 21), Storm Maiden (Day 27), Paragon (Day 35), Witch (Day 41), Rose Princess (Day 46). Execute League ➔ Horde Pivot.",
                  },
                ],
                [
                  { vi: "Giai đoạn 2: Season 1 — Đảo Mùa Xuân", en: "Stage 2: Season 1 — Spring Island" },
                  { vi: "Ngày 66 – Ngày 130+", en: "Day 66 – Day 130+" },
                  {
                    vi: "Chuồng Thú Cưng (Pet Paradise), Thức Tỉnh Tướng Vàng (Hồn Đá Đỏ / Soul Stones ở C30/S1), Cây Công nghệ Mùa giải (S1 Battle), Mảnh Thần khí (UW).",
                    en: "Pet Paradise, Legendary Hero Awakening (Red Soul Stones at C30/S1), Season 1 Tech Tree (S1 Battle), Exclusive Weapon Shards (UW).",
                  },
                  {
                    vi: "Ra mắt Tidecaller, Monk, Ne Zha. Mua đủ 9 Hồn Đá Đỏ thức tỉnh Soulmancer/Warlock (hoặc Pyromancer/Pixie).",
                    en: "Releases Tidecaller, Monk, Ne Zha. Purchase 9 Red Soul Stones to awaken Soulmancer/Warlock (or Pyromancer/Pixie).",
                  },
                ],
                [
                  { vi: "Giai đoạn 3: Season 2 — Kỷ Nguyên Băng Giá", en: "Stage 3: Season 2 — Frozen Era" },
                  { vi: "Sau Season 1 (~Tháng 5–7)", en: "Post-Season 1 (~Months 5–7)" },
                  {
                    vi: "Bản đồ Tuyết giá, Mở rộng trần Cấp độ Phe phái (Faction Level 40), Trang bị Thần Thoại (Mythic Gear).",
                    en: "Snowfield Map, expanded Faction Level 40 cap, and Mythic Gear progression.",
                  },
                  {
                    vi: "Ra mắt cặp siêu phẩm Bộ Lạc Wukong & Beastmaster — hoàn thiện Đội 1 5-Mythic Horde.",
                    en: "Releases Horde juggernauts Wukong & Beastmaster — completing the 5-Mythic Horde Queue 1.",
                  },
                ],
                [
                  { vi: "Giai đoạn 4: Season 3 & Season 4", en: "Stage 4: Season 3 & Season 4" },
                  { vi: "Endgame (~Tháng 8+)", en: "Endgame (~Month 8+)" },
                  {
                    vi: "Cự Thú (Behemoth ở S3), Viện Huy Hoàng (Brilliance Institute / C40+), Công nghệ Tinh Hoa Rồng (DE-Dust / Dragon Essence).",
                    en: "Behemoth system (S3), Brilliance Institute (C40+), and Dragon Essence (DE-Dust) technology.",
                  },
                  {
                    vi: "Ra mắt các Siêu Hỗ Trợ Shadow Priest (Horde), Artificer (League), Petalis (Nature) — đạt ngưỡng 6 Mythic Đỏ thuần hệ.",
                    en: "Releases hyper-supports Shadow Priest (Horde), Artificer (League), and Petalis (Nature) — achieving a full 6-Mythic pure-faction lineup.",
                  },
                ],
              ],
            },
            {
              type: "callout",
              variant: "rule",
              title: {
                vi: "Quy chuẩn Hệ thống 15 Sao (3 Màu Sao) & Chi phí Thức Tỉnh Chuẩn Xác",
                en: "Standardized 15-Star System (3 Star Colors) & Exact Awakening Costs",
              },
              content: {
                vi: "**Bảng định mức Mảnh Tướng theo `3 Màu Sao` (`15 Sao`) và chi phí `Thức Tỉnh` chuẩn quốc tế:**\n• **Tầng 1 — `1★–5★ Vàng` (`1★–5★`):** Tốn `50 Mảnh` (Tướng Vàng Legendary / Tím Epic) | `100 Mảnh` (Tướng Đỏ Mythic).\n• **Tầng 2 — `1★–5★ Đỏ` (`6★–10★`):** Tốn `+150 Mảnh` (Tích lũy: `1★ Đỏ = 80` | `5★ Đỏ = 200` Mảnh Leg/Epic) | `+300 Mảnh` (Tích lũy: `1★ Đỏ = 160` | `5★ Đỏ = 400` Mảnh Mythic).\n• **Tầng 3 — `1★–5★ Trắng / Bạc` (`11★–15★`):** Tốn `+300 Mảnh` (Tích lũy Leg/Epic: `1★ = 280` | `2★ = 300` | `5★ = 500`) | `+600 Mảnh` (Tích lũy Mythic: `1★ = 560` | `2★ = 600` | `5★ = 1,000`).\n• **Chi phí Thức Tỉnh (`Awakening`):** Mở khi tướng Vàng đạt `1–2 Sao Trắng` (`11–12 Sao`), tiêu tốn tổng cộng `9 Hồn Đá Đỏ` (`Soul Stones`) + `345–385` Mảnh Tướng qua 4 bậc.",
                en: "**International `3-Color Star` (`15-Star`) shard cost table and `Awakening` requirements:**\n• **Tier 1 — `1★–5★ Yellow Stars` (`1★–5★`):** Costs `50 Shards` (Legendary / Epic) | `100 Shards` (Mythic).\n• **Tier 2 — `1★–5★ Red Stars` (`6★–10★`):** Costs `+150 Shards` (Cumulative Leg/Epic: `1★ = 80` | `5★ = 200`) | `+300 Shards` (Cumulative Mythic: `1★ = 160` | `5★ = 400`).\n• **Tier 3 — `1★–5★ White / Silver Stars` (`11★–15★`):** Costs `+300 Shards` (Leg/Epic: `1★ = 280` | `2★ = 300` | `5★ = 500`) | `+600 Shards` (Mythic: `1★ = 560` | `2★ = 600` | `5★ = 1,000`).\n• **Legendary-to-Mythic Awakening:** Starts at `1–2 White Stars` (`11–12 Stars`), consuming `9 Red Soul Stones` + `345–385` Hero Shards across 4 tiers.",
              },
            },
          ],
        },
      ],
    },
    {
      id: "sec-3-common-pitfalls",
      title: {
        vi: "3. Những Cạm bẫy Phổ biến & Cách Phòng tránh (Common Pitfalls)",
        en: "3. Common Beginner Pitfalls & Meta Solutions",
      },
      blocks: [
        {
          type: "table",
          caption: {
            vi: "4 sai lầm phổ biến nhất của Tân thủ trong giai đoạn khởi đầu và giải pháp chuẩn Meta",
            en: "The 4 most common beginner mistakes during early progression and their Meta solutions",
          },
          headers: [
            { vi: "Sai lầm phổ biến của Tân thủ", en: "Common Beginner Pitfall" },
            { vi: "Giải pháp Chuẩn Meta", en: "Meta-Standard Solution" },
          ],
          rows: [
            [
              {
                vi: "Đốt Thịt (Food) nâng cấp Tướng Xanh (Rare) và Tướng Tím (Epic) lên cấp 120–150 để đi ải Adventure nhanh hơn trong tuần đầu.",
                en: "Burning Food to level Rare (Blue) and Epic (Purple) heroes up to Lv.120–150 just to push Adventure stages faster in Week 1.",
              },
              {
                vi: "Tướng Xanh ngừng nâng ngay sau Ngày 2. Tướng Tím chỉ nâng Sao (lên 2 Sao Trắng / 12 Sao = 300 Mảnh mở Thiên phú Kinh tế), giữ cấp độ dưới Lv.100 để dành hàng trăm triệu Thịt cho Đội 1.",
                en: "Stop leveling Blue heroes after Day 2. Only star-up Epic heroes to 2 White Stars (12 Stars = 300 Shards) to unlock their 3rd Economy Trait, keeping their level below Lv.100 to save hundreds of millions of Food for Queue 1.",
              },
            ],
            [
              {
                vi: "Vào một Bang hội ngẫu nhiên, ít người hoạt động vì ngại xin vào các bang lớn.",
                en: "Joining a casual, low-activity guild out of hesitation to apply to top alliances.",
              },
              {
                vi: "Bằng mọi giá phải xin vào Bang hội Top 1–3 của máy chủ ngay từ Cấp Lâu đài 7. Lượng quà Rương Bang, hỗ trợ giảm thời gian xây dựng (Guild Help) và Điểm Vinh Dự ở bang Top 1 gấp 3–5 lần bang nhỏ.",
                en: "Apply to a Top 1–3 Server Guild at all costs upon reaching Castle Lv.7. Daily Guild Chests, construction Guild Helps, and Guild Honor income in a Top 1–3 guild are 3x–5x higher than in small guilds.",
              },
            ],
            [
              {
                vi: "Mở khóa Ô Thiên phú thứ 4 của Tướng Tím tốn 2,000 Kim Cương vì tưởng cộng +3% HP cho toàn đội hình.",
                en: "Unlocking the 4th Trait Slot on Epic heroes for 2,000 KC (Diamonds) assuming it grants +3% HP to all queues.",
              },
              {
                vi: "Đọc kỹ mô tả: Ô thứ 4 chỉ cộng +3% HP cho riêng bản thân tướng Tím đó khi ra trận. Vì tướng Tím chỉ ngồi dự bị làm kinh tế, mở ô này là vứt bỏ 2,000 Kim Cương vô ích.",
                en: "Read the tooltip carefully: the 4th Trait Slot only grants +3% HP to that specific Epic hero when deployed in battle. Since Epic heroes stay on the bench for passive economy buffs, unlocking Slot 4 wastes 2,000 KC (2,000 Diamonds) for zero gain.",
              },
            ],
            [
              {
                vi: "Dồn hết Mảnh Vạn Năng Vàng cho Pyromancer hoặc Astrologer ở Tuần 1–2 để đua Top lực chiến ngắn hạn.",
                en: "Dumping Universal Legendary Shards into Pyromancer or Astrologer in Weeks 1–2 for short-term leaderboard flexing.",
              },
              {
                vi: "Chỉ nâng tướng Vàng Liên Minh bằng mảnh riêng chỉ định rơi từ Quán Rượu. Toàn bộ Mảnh Vạn Năng Vàng phải giữ nguyên trong túi để đập cho Tướng Đỏ (Mythic) từ Ngày 21.",
                en: "Only upgrade starter League Legendaries using hero-specific shards from the Tavern. Freeze 100% of Universal Legendary Shards in your bag to feed Mythic (Red) heroes starting on Day 21.",
              },
            ],
          ],
        },
      ],
    },
  ],
  proSections: [
    {
      id: "sec-4-ninety-day-roadmap",
      isPro: true,
      title: {
        vi: "4. Phân tích Định lượng & Điểm gãy: Lộ Trình 90 Ngày Đầu Tiên & Bảng Phân Bổ Nguồn Lực",
        en: "4. Quantitative Analysis & Breakpoints: First 90-Day Timeline & Resource Allocation Matrix",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "**Chủ Động Lộ Trình 90 Ngày:** Để không bị động trước lịch cập nhật, người chơi cần nắm vững Bản đồ Lộ trình 90 Ngày Đầu Tiên (`Pre-Season S0 ➔ Season 1`):",
            en: "**Master the 90-Day Cadence:** To stay ahead of the publisher's release cadence, players must master the First 90-Day Server Timeline (`Pre-Season S0 ➔ Season 1`):",
          },
        },
        {
          type: "visual_diagram",
          mediaCode: "MED-1.1-04",
          variant: "timeline_phases",
          title: {
            vi: "Sơ Đồ Lộ Trình 90 Ngày Đầu Tiên Của Máy Chủ Mới (Pre-Season S0 ➔ Season 1)",
            en: "First 90-Day New Server Progression Flowchart (Pre-Season S0 ➔ Season 1)",
          },
          subtitle: {
            vi: "Chuỗi cột mốc định lượng từ Ngày 1 (Khởi động Liên Minh) ➔ Ngày 21–41 (Chuyển dịch Bộ Lạc) ➔ Ngày 66–90 (Thức tỉnh Season 1)",
            en: "Quantitative milestone progression from Day 1 (League Start) ➔ Days 21–41 (Horde Pivot) ➔ Days 66–90 (Season 1 Awakening)",
          },
          nodes: [
            {
              id: "phase-1-onboarding",
              badge: { vi: "GIAI ĐOẠN 1 • NGÀY 1–20", en: "PHASE 1 • DAYS 1–20" },
              title: {
                vi: "Giai Đoạn 1: Khởi Động Liên Minh & Tích Trữ Đáy Ví (Ngày 1 – 20)",
                en: "Phase 1: League Onboarding & Iron Reserve Building (Days 1 – 20)",
              },
              subtitle: {
                vi: "Ngày 1–7: Vào Bang Top 1–3 & Mở Queue 1 Liên Minh. Ngày 8–20: Rush Lâu Đài Lv.22–25, đóng băng Mảnh Vạn Năng từ đầu Tuần 3 & tích đáy 30,000+ KC.",
                en: "Days 1–7: Join Top 1–3 Guild & build League Queue 1. Days 8–20: Rush Castle Lv.22–25, freeze Universal Shards at Week 3 & build a 30,000+ KC floor.",
              },
              metrics: [
                { vi: "Đáy ví: 30,000+ KC", en: "Floor: 30,000+ Diamonds" },
                { vi: "Đóng băng 100% Mảnh Vạn Năng", en: "100% Universal Shard Freeze" },
              ],
              tone: "blue",
            },
            {
              id: "phase-2-horde-pivot",
              badge: { vi: "GIAI ĐOẠN 2 • NGÀY 21–45", en: "PHASE 2 • DAYS 21–45" },
              title: {
                vi: "Giai Đoạn 2: Chuyển Dịch Bộ Lạc (Ngày 21 – 45)",
                en: "Phase 2: The Meta Horde Pivot (Days 21 – 45)",
              },
              subtitle: {
                vi: "Ngày 21: Lấy Desert Prince (Vòng Quay/Xúc Xắc) ➔ Ngày 27: Lấy Storm Maiden (Ghép Đội Lai 4 LM + 2 BL, đẩy 1 Sao Trắng = 560 Mảnh) ➔ Ngày 41: Lấy Witch (Hoàn tất Đội 1 Thuần Bộ Lạc).",
                en: "Day 21: Unlock Desert Prince (Wheel/Dice) ➔ Day 27: Unlock Storm Maiden (4 League + 2 Horde Hybrid, push 1 White Star = 560 Shards) ➔ Day 41: Unlock Witch (Complete Pure Horde Queue 1).",
              },
              metrics: [
                { vi: "Ngày 21: Desert Prince", en: "Day 21: Desert Prince" },
                { vi: "Ngày 27: Storm Maiden | Ngày 41: Witch", en: "Day 27: Storm Maiden | Day 41: Witch" },
              ],
              tone: "rose",
            },
            {
              id: "phase-3-season-1-awakening",
              badge: { vi: "GIAI ĐOẠN 3 • NGÀY 46–90", en: "PHASE 3 • DAYS 46–90" },
              title: {
                vi: "Giai Đoạn 3: Tích Lũy S1 & Thức Tỉnh (Ngày 46 – 90)",
                en: "Phase 3: Season 1 Preparation & Awakening (Days 46 – 90)",
              },
              subtitle: {
                vi: "Ngày 46–65: Bỏ qua tướng ngoại hệ (Paragon, Rose Princess) & đạt Lâu Đài Lv.30. Ngày 66–90 (Season 1): Mua đủ 9 Hồn Đá Đỏ + 345–385 Mảnh thức tỉnh Soulmancer/Warlock.",
                en: "Days 46–65: Skip off-faction Mythics (Paragon, Rose Princess) & hit Castle Lv.30. Days 66–90 (Season 1): Buy 9 Red Soul Stones + 345–385 Shards to awaken Soulmancer/Warlock.",
              },
              metrics: [
                { vi: "Lâu đài Lv.30 (C30)", en: "Castle Lv.30 (C30)" },
                { vi: "Thức tỉnh: 9 Hồn Đá Đỏ + 345–385 Mảnh", en: "Awaken: 9 Soul Stones + 345–385 Shards" },
              ],
              tone: "gold",
            },
          ],
          footnote: {
            vi: "Bằng cách bỏ qua tướng Đỏ ngoại hệ ở Ngày 35 & 46, F2P bảo toàn trọn vẹn quỹ Kim Cương và Mảnh Vạn Năng để hoàn thiện Đội 1 Bộ Lạc.",
            en: "By skipping off-faction Mythic banners on Days 35 & 46, F2P players preserve their entire Diamond and Universal Shard reserve to max out their Horde Queue 1.",
          },
        },
      ],
      subSections: [
        {
          id: "sub-4-1-resource-matrix",
          title: {
            vi: "4.1. Bảng Ma Trận Phân Bổ Tỷ Trọng Nguồn Lực Theo Giai Đoạn (Early / Mid / Late-Game Allocation)",
            en: "4.1. Stage-by-Stage Resource Allocation Matrix (Early / Mid / Late-Game)",
          },
          badge: {
            vi: "MA TRẬN 5 NGUỒN LỰC",
            en: "5-RESOURCE MATRIX",
          },
          blocks: [
            {
              type: "paragraph",
              text: {
                vi: "Bảng dưới đây quy định tỷ lệ phần trăm (%) phân bổ 5 nhóm tài nguyên cốt lõi qua từng giai đoạn phát triển của máy chủ, dựa trên dữ liệu định lượng từ TopHeroes Master Tables:",
                en: "The matrix below defines the exact percentage (%) allocation across 5 core resource groups throughout each stage of server progression, audited against the TopHeroes Master Data Tables:",
              },
            },
            {
              type: "table",
              caption: {
                vi: "Ma trận phân bổ tỷ trọng 5 nhóm tài nguyên và Điểm gãy Chiến thuật (Early / Mid / Late-Game)",
                en: "Resource allocation matrix across Early, Mid, and Late-Game with Critical Tactical Breakpoints",
              },
              headers: [
                { vi: "Nhóm Tài Nguyên / Hoạt Động", en: "Resource Group / Activity" },
                {
                  vi: "Giai Đoạn Đầu — Early Game (Ngày 1 – Ngày 20 / Castle Lv.1–24)",
                  en: "Early Game (Days 1 – 20 / Castle Lv.1–24)",
                },
                {
                  vi: "Giai Đoạn Giữa — Mid Game (Ngày 21 – Ngày 60 / Castle Lv.25–30)",
                  en: "Mid Game (Days 21 – 60 / Castle Lv.25–30)",
                },
                {
                  vi: "Giai Đoạn Cuối — Late Game (Ngày 61+ / Season 1–4 / Brilliance)",
                  en: "Late Game (Day 61+ / Season 1–4 / Brilliance)",
                },
                {
                  vi: "Điểm Gãy Chiến Thuật (Critical Breakpoints)",
                  en: "Critical Tactical Breakpoints",
                },
              ],
              rows: [
                [
                  { vi: "Kim Cương (Diamonds)", en: "Diamonds (KC)" },
                  {
                    vi: "20% Chi tiêu (Mua Điểm VIP chạm VIP 4, thuê Thợ xây thứ 2 bằng 500 KC) / 80% Tích trữ (Giữ đáy 30,000+ KC).",
                    en: "20% Spend (Buy VIP points to reach VIP 4, hire 2nd Builder Queue for 500 KC) / 80% Save (Maintain 30,000+ KC floor).",
                  },
                  {
                    vi: "70% Chi tiêu Sự kiện (Xả vào Vòng Quay Wheel / Xúc Xắc Dice đúng kỳ Tướng Đỏ hệ chính) / 30% Quỹ dự phòng (Khiên KvK, VIP Shop).",
                    en: "70% Event Spend (Dump into Lucky Wheel / Dice exclusively on main-faction Mythic banners) / 30% Reserve Fund (KvK Peace Shields, VIP Shop).",
                  },
                  {
                    vi: "60% Sự kiện Tướng S2/S3 & Thần Khí / 40% Cửa hàng VIP cấp cao (Đá Linh Hồn, Tinh Hoa Rồng Dragon Essence).",
                    en: "60% S2/S3 Hero & Exclusive Weapon Events / 40% High-VIP Store (Soul Stones, Dragon Essence).",
                  },
                  {
                    vi: "Không bao giờ để số dư Kim Cương tụt xuống dưới ngưỡng 30,000 KC trước tuần ra mắt Tướng Đỏ mới.",
                    en: "Never let your Diamond balance drop below the 30,000+ KC floor prior to a new main-faction Mythic release week.",
                  },
                ],
                [
                  {
                    vi: "Mảnh Tướng Vàng Vạn Năng (Universal Shards)",
                    en: "Universal Legendary Shards",
                  },
                  {
                    vi: "0% Chi tiêu — Đóng băng 100% từ đầu Tuần 3. Chỉ dùng mảnh riêng nâng tướng Liên Minh khởi đầu.",
                    en: "0% Spend — 100% Freeze starting at Week 3. Only use hero-specific shards on starter League heroes.",
                  },
                  {
                    vi: "100% Dồn cho Tướng Đỏ Đội 1 (Desert Prince, Storm Maiden, Witch hoặc chủ lực hệ đã chọn) vào Thứ Năm Tuần B (GAR / KvK Day 4) (hoặc canh lúc có Hero Development Rush / Nhiệm vụ Vàng nâng tướng nếu máy chủ đang ở giai đoạn Thi Đấu Hội chạy nối tiếp).",
                    en: "100% Funneled into Queue 1 Mythic heroes (Desert Prince, Storm Maiden, Witch) on Thursday of Week B (GAR / KvK Day 4) (or synced with Hero Development Rush / Golden Hero Upgrade Quests if the server is in continuous weekly Guild Race mode).",
                  },
                  {
                    vi: "70% Đẩy Tướng Đỏ lên 5 Sao Trắng (1,000 Mảnh/tướng Mythic; 500 Mảnh Legendary) / 30% Dành cho Thức Tỉnh Tướng Vàng (9 Hồn Đá Đỏ (Soul Stones) + 345–385 Mảnh Tướng từ mốc 1–2 Sao Trắng / 11–12 Sao).",
                    en: "70% Push Mythics to 5 White Stars (1,000 Shards/Mythic; 500 Shards/Legendary) / 30% Reserved for Legendary Awakening (9 Red Soul Stones + 345–385 Shards starting from 1–2 White Stars / 11–12 Stars).",
                  },
                  {
                    vi: "Mốc 1 Sao Trắng / Bạc (11 Sao = 560 Mảnh Mythic / 280 Mảnh Leg) mở khóa +30% hiệu ứng Kỹ năng là điểm dừng ROI tối ưu đầu tiên cho mỗi Tướng Đỏ.",
                    en: "The 1 White / Silver Star milestone (11 Stars = 560 Shards Mythic / 280 Shards Leg) unlocking +30% Skill Effect is the #1 first-stop ROI breakpoint for every Mythic hero.",
                  },
                ],
                [
                  {
                    vi: "Thịt & Cấp Độ Phe Phái (Food & Faction Level)",
                    en: "Food & Faction Level",
                  },
                  {
                    vi: "90% Đẩy Level 6 tướng Đội 1 chạm trần Lâu đài / 10% Nâng Đội 2 lên Lv.120–135 để đi đào mỏ.",
                    en: "90% Push the 6 heroes of Queue 1 to the Castle level cap / 10% Level Queue 2 to Lv.120–135 for resource gathering.",
                  },
                  {
                    vi: "70% Kéo Tướng Đỏ mới lên trần Lv.170–200 / 30% Bơm vào Cấp Độ Phe Phái (Faction Level).",
                    en: "70% Level newly acquired Mythics to Lv.170–200 cap / 30% Invest into Faction Level.",
                  },
                  {
                    vi: "80% Đẩy Faction Level chạm các mốc chia hết cho 10 (Lv.10 / Lv.20 / Lv.30 / Lv.40) và nâng lính kỷ nguyên Quang Huy.",
                    en: "80% Push Faction Level to multiples of 10 (Lv.10 / Lv.20 / Lv.30 / Lv.40) and Brilliance-era troop upgrades.",
                  },
                  {
                    vi: "Mốc Faction Level 40 = 1,181.16 Triệu Thịt + 1,307 Mảnh = +20% Queue HP (+5% mỗi 10 cấp).",
                    en: "Faction Level 40 = 1,181.16 Million Meat + 1,307 Shards = +20% Queue HP (+5% per 10 levels).",
                  },
                ],
                [
                  {
                    vi: "Tăng Tốc Nghiên Cứu (Research Speedups)",
                    en: "Research Speedups",
                  },
                  {
                    vi: "100% Nhánh Combat Expertise & Development (mở khóa toàn bộ cây công nghệ và giảm thời gian nghiên cứu).",
                    en: "100% Combat Expertise & Development branches (unlock tech tree gates and reduce base research timers).",
                  },
                  {
                    vi: "60% Nhánh Arms Race Prep (đặc biệt nốt Double Rewards mở Hộp 6) / 40% Nhánh Queue 1 Boost.",
                    en: "60% Arms Race Prep branch (specifically the Double Rewards & Box 6 nodes) / 40% Queue 1 Boost branch.",
                  },
                  {
                    vi: "50% Nhánh Soldiers (Tăng cấp Lính) / 50% Công nghệ Tinh Hoa Rồng (DE-Dust / Brilliance Institute).",
                    en: "50% Soldiers branch (Troop Tier upgrades) / 50% Dragon Essence Tech (DE-Dust / Brilliance Institute).",
                  },
                  {
                    vi: "Hoàn thành Đấu Sĩ (Brawler 2 Sao Trắng = 300 Mảnh = +30% Tech Research Rate) trước khi xả hàng trăm giờ tăng tốc nghiên cứu ở GAR / KvK (hoặc Nhiệm vụ Vàng Thi Đấu Hội).",
                    en: "Complete Brawler 2 White Stars (12 Stars = 300 Shards = +30% Tech Research Rate) before burning hundreds of hours of research speedups in GAR / KvK or Guild Race Golden Quests.",
                  },
                ],
                [
                  {
                    vi: "Quặng & Trang Bị (Gear Ore & Lord Materials)",
                    en: "Gear Ore & Lord Materials",
                  },
                  {
                    vi: "Đúc đủ 24 món Trang bị Tím/Vàng cho Đội 1. Phân giải toàn bộ đồ Xanh/Lục.",
                    en: "Craft a full set of 24 Epic/Legendary gear pieces for Queue 1. Dismantle all Blue/Green gear.",
                  },
                  {
                    vi: "Tập trung Đúc Đồ Vàng có Dấu Hệ (+30% Bonus) và đập đồng đều 4 món của từng tướng lên mốc +10 ➔ +20.",
                    en: "Focus on crafting Faction-Marked Legendary Gear (+30% Bonus) and evenly enhancing all 4 pieces on each hero to +10 ➔ +20.",
                  },
                  {
                    vi: "Đột phá Trang bị Thần Thoại (Mythic Gear) và nâng kịch trần Nhánh Phải (Right Side) của Trang bị Lãnh Chúa.",
                    en: "Promote into Mythic Gear and max out the Right Side of Lord Gear.",
                  },
                  {
                    vi: "Tuyệt đối không nâng lệch kiểu 1 món +25 và 3 món +5 (mất trắng chỉ số Cộng hưởng Cường hóa +10/+20).",
                    en: "Never enhance unevenly such as one piece at +25 and three pieces at +5 (which forfeits the +10/+20 Full-Set Enhancement Resonance).",
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: "sec-5-day-18-case-study",
      isPro: true,
      title: {
        vi: "5. Kịch bản Thực chiến Nâng cao: Case Study Thiết Lập Tài Khoản Chuẩn Hóa Ở Ngày 18 (Pre-Season)",
        en: "5. Advanced Tactical Case Study: Day-18 Pre-Season Account Setup (72h Before Desert Prince)",
      },
      blocks: [
        {
          type: "case_study",
          badge: {
            vi: "CASE STUDY NGÀY 18 PRE-SEASON",
            en: "DAY-18 PRE-SEASON CASE STUDY",
          },
          title: {
            vi: "Phác Đồ Chuẩn Bị Tài Khoản 72 Giờ Trước Giờ G: Đón Hoàng Tử Sa Mạc (Desert Prince) Ở Ngày 21",
            en: "72-Hour Pre-Launch Protocol: Preparing Your Account for Desert Prince on Day 21",
          },
          profileSummary: {
            vi: "**Bối cảnh bài toán mẫu: Tài khoản tiêu chuẩn ở `Ngày thứ 18` của Máy chủ mới (Giữa Tuần 3), đạt Lâu đài `Lv.24–25` với tổng lực chiến `6.0M`.**\n• **Trạng thái hiện tại:** Đang chạy sự kiện Thi Đấu Hội (`Guild Race`) kèm `Đế Quốc Hắc Ám Xâm Nhập` & `Bắt Bướm`; Đội 1 thuần `6 tướng Vàng Liên Minh` ở `Lv.160`.\n• **Mục tiêu 72 giờ tới:** Chuẩn bị tài nguyên đón vị Tướng Đỏ đầu tiên của hệ Bộ Lạc là Hoàng Tử Sa Mạc (`Desert Prince`) ra mắt vào đúng `Ngày 21`.",
            en: "**Scenario Context: A standard account on `Day 18` of a new server (Mid-Week 3) at `Castle Lv.24–25` with `~6.0M` Total Influence.**\n• **Current State:** Running `Guild Race` alongside `Dark Empire Invasion` & `Butterfly Catching` with a pure `6-Legendary League` Queue 1 at `Lv.160`.\n• **72-Hour Target:** Prepare reserves for the first Horde Mythic hero — `Desert Prince` — arriving in exactly 3 days on `Day 21`.",
          },
          metrics: [
            {
              label: {
                vi: "Kho Mảnh Vàng Vạn Năng",
                en: "Universal Shard Reserve",
              },
              before: {
                vi: "Đập lẻ cho Astrologer / Secret Keeper",
                en: "Spent piecemeal on Astrologer / Secret Keeper",
              },
              after: {
                vi: "160–250 Mảnh Vàng Vạn Năng",
                en: "160–250 Universal Legendary Shards",
              },
              delta: {
                vi: "Đủ kéo Desert Prince lên 1★ Đỏ (160 Mảnh)",
                en: "Instant 1★ Red (160 Shards) Desert Prince",
              },
            },
            {
              label: {
                vi: "Kho Sách Kỹ Năng (Skill Books)",
                en: "Skill Book Inventory",
              },
              before: {
                vi: "< 5,000 Sách (Cạn kho)",
                en: "< 5,000 Books (Depleted)",
              },
              after: {
                vi: "24,700+ Sách Kỹ Năng",
                en: "24,700+ Skill Books",
              },
              delta: {
                vi: "Max Lv.15 (24,700 Sách) hoặc 3 Skill Lv.10 (8,000/skill)",
                en: "1 Max Lv.15 Skill (24,700) or 3 Lv.10 Skills (8,000/skill)",
              },
            },
            {
              label: {
                vi: "Động Cơ Kinh Tế Brawler",
                en: "Brawler Economy Trait",
              },
              before: {
                vi: "Dưới 10 Sao (Mảnh Knight bị tồn đọng)",
                en: "Below 10 Stars (Excess Knight shards idle)",
              },
              after: {
                vi: "12 Sao (2 Sao Trắng = 300 Mảnh)",
                en: "12 Stars (2 White Stars = 300 Shards)",
              },
              delta: {
                vi: "+30% Tech Research Rate vĩnh viễn",
                en: "+30% Permanent Tech Research Rate",
              },
            },
          ],
          diagnostics: [
            {
              vi: "**Nguy cơ 1 (Hụt Mảnh & Sách):** Tiếp tục nâng `Astrologer` hoặc `Secret Keeper` ở Tuần 3 sẽ làm hụt mốc `160 Mảnh Vạn Năng` (`1★ Đỏ`) và `24,700+` Sách Kỹ Năng cho `Desert Prince` (`Ngày 21`).",
              en: "**Risk 1 (Shard & Book Deficit):** Investing shards/books into `Astrologer` or `Secret Keeper` in Week 3 leaves you short of `160 Universal Shards` (`1★ Red`) and `24,700+` Skill Books on `Day 21`.",
            },
            {
              vi: "**Nguy cơ 2 (Đọng Mảnh Tím):** Để mảnh `Knight` `15 Sao` (`500 Mảnh`) nằm im thay vì đổi lấy Mảnh Vạn Năng Tím trong `Exchange Shop` để hoàn thiện `Brawler` (`300 Mảnh` = `+30% Nghiên cứu`).",
              en: "**Risk 2 (Idle Epic Shards):** Letting excess `15-Star Knight` (`500 Shards`) shards sit idle instead of trading them in the `Exchange Shop` to finish `Brawler` (`300 Shards` = `+30% Research`).",
            },
            {
              vi: "**Nguy cơ 3 (Lệch Lịch Event):** Không kiểm tra Lịch Event lúc `09:00` Thứ Hai để biết Tuần 4 chạy Thi Đấu Hội nối sóng (kèm Tập Kích Cự Ma & Khiêu Chiến Của Đội Quân Hắc Ám) hay mở `GAR / KvK`.",
              en: "**Risk 3 (Calendar Desync):** Failing to check the Monday `09:00` Event Calendar to verify whether Week 4 continues back-to-back `Guild Race` (`Giant Raid` & `Dark Army`) or opens `GAR / KvK`.",
            },
          ],
          recoverySteps: [
            {
              stepNumber: "1",
              title: {
                vi: "Kiểm toán Kho Mảnh & Sách Kỹ Năng",
                en: "Audit Universal Shard & Skill Book Reserves",
              },
              detail: {
                vi: "**Ngưng toàn bộ việc nâng sao và kỹ năng cho `Astrologer` và `Secret Keeper` ngay lập tức.**\n• **Mốc Tích trữ:** Giữ tối thiểu `160–250 Mảnh Vàng Vạn Năng` (kéo thẳng `1 Sao Đỏ = 160 Mảnh`) và `24,700+` Sách Kỹ Năng (max 1 skill `Lv.15` hoặc 3 skill `Lv.10 = 8,000` Sách/skill) cho `Desert Prince`.",
                en: "**Immediately halt all star and skill upgrades on `Astrologer` and `Secret Keeper`.**\n• **Target Reserves:** Hold at least `160–250 Universal Shards` (instant `1 Red Star = 160 Shards`) and `24,700+` Skill Books (1 skill at `Lv.15 Max` or 3 skills at `Lv.10 = 8,000` Books/skill) for `Desert Prince`.",
              },
              impactBadge: {
                vi: "160–250 Mảnh + 24,700+ Sách",
                en: "160–250 Shards + 24,700+ Books",
              },
            },
            {
              stepNumber: "2",
              title: {
                vi: "Kích hoạt Động cơ Kinh tế Tướng Tím",
                en: "Activate the Epic Hero Economy Engine (Knight ➔ Brawler)",
              },
              detail: {
                vi: "**Kiểm tra tiến độ sao của Kỵ Sĩ (`Knight`) và Đấu Sĩ (`Brawler`) trong danh sách tướng Tím.**\n• **Quy đổi Mảnh dư:** Khi `Knight` đạt `15 Sao` (`500 Mảnh`), đem mảnh dư vào `Exchange Shop` đổi Mảnh Tím đút cho `Brawler` chạm `12 Sao` (`2★ Trắng = 300 Mảnh`) để lấy `+30% Tech Research Rate`.",
                en: "**Audit the star progression of `Knight` and `Brawler` in your Epic hero roster.**\n• **Shard Conversion:** Once `Knight` hits `15 Stars` (`500 Shards`), trade excess shards in the `Exchange Shop` to push `Brawler` to `12 Stars` (`2★ White = 300 Shards`) for `+30% Tech Research Rate`.",
              },
              impactBadge: {
                vi: "Brawler 300 Mảnh = +30% Research",
                en: "Brawler 300 Shards = +30% Research",
              },
            },
            {
              stepNumber: "3",
              title: {
                vi: "Chuẩn bị Hạ tầng Chuyển giao Bộ Lạc",
                en: "Pre-Build Horde Transition Infrastructure",
              },
              detail: {
                vi: "**Đưa Doanh Trại Bộ Lạc (`Horde Barracks`) và Tượng Bộ Lạc (`Horde Statue`) vào danh sách ưu tiên xây dựng ngang với Lâu đài từ cuối Tuần 3.**\n• **Sẵn sàng Chuyển dịch:** Đảm bảo cung cấp lính Bộ Lạc bậc cao nhất ngay khi Đội 1 chuyển giao ở `Ngày 21–27`.",
                en: "**Elevate `Horde Barracks` and `Horde Statue` to top construction priority alongside your Castle starting in late Week 3.**\n• **Transition Readiness:** Ensure highest-tier Horde troops are ready the moment Queue 1 pivots during `Days 21–27`.",
              },
              impactBadge: {
                vi: "Horde Barracks & Statue Ready",
                en: "Horde Barracks & Statue Ready",
              },
            },
            {
              stepNumber: "4",
              title: {
                vi: "Quy tắc \"Nhìn Lịch Event 5 Giây (09:00 Thứ Hai)\" Trước Khi Đập Mảnh",
                en: "The \"Monday 09:00 5-Second Event Calendar Check\" Before Spending Shards",
              },
              detail: {
                vi: "**Khi mở khóa `Desert Prince` vào `Ngày 21`, hãy mở ngay `Event ➔ Lịch Event` kiểm tra thanh sự kiện bắt đầu lúc `09:00` Thứ Hai Tuần 4:**\n• **Trường hợp A (Tuần 4 chạy Thi Đấu Hội nối sóng kèm Khiêu Chiến Của Đội Quân Hắc Ám & Tập Kích Cự Ma):** Canh Nhiệm vụ Vàng nâng Tướng để đút Mảnh đẩy `Desert Prince` lên thẳng `1 Sao Đỏ` (`160 Mảnh`) ngay.\n• **Trường hợp B (Tuần 4 mở `GAR / KvK` 6 ngày):** Chỉ mở khóa tướng ở Ngày 21 và giữ 100% Mảnh Vạn Năng chờ đúng Thứ Năm Tuần 4 (`Ngày 4 GAR/KvK`, khung `17:00 – 21:00`) mới nâng sao ăn trọn `Double-Dip`!",
                en: "**Upon unlocking `Desert Prince` on `Day 21`, immediately open `Event ➔ Event Calendar` and inspect Monday `09:00` of Week 4:**\n• **Case A (Week 4 continues back-to-back `Guild Race` with `Dark Army Challenge` & `Giant Raid`):** Claim a Golden Hero Upgrade Task and immediately push `Desert Prince` to `1 Red Star` (`160 Shards`).\n• **Case B (Week 4 opens 6-day `GAR / KvK`):** Unlock base `Desert Prince` on Day 21 and hold 100% of Universal Shards until Thursday of Week 4 (`Day 4 GAR/KvK`, `17:00 – 21:00`) for full `Double-Dip` points!",
              },
              impactBadge: {
                vi: "09:00 Thứ Hai • Tối ưu Double-Dip",
                en: "Monday 09:00 • Double-Dip Sync",
              },
            },
          ],
          conclusion: {
            vi: "**Kết quả thực chiến: Tài khoản bước sang `Ngày 21` với `Desert Prince` đạt `1 Sao Đỏ` (`160 Mảnh`) + Kỹ năng chủ lực `Lv.15` (`24,700` Sách).**\n• **Đồng bộ Toàn diện:** Giữ trọn tốc độ nghiên cứu `+30%` từ `Brawler` (`300 Mảnh`) và ăn khớp 100% điểm thưởng theo đúng chế độ Lịch Event của máy chủ.",
            en: "**Tactical Outcome: The account enters `Day 21` with a `1 Red Star` (`160 Shards`) `Desert Prince` + `Lv.15` signature skill (`24,700` Books).**\n• **Full Synchronization:** Retains permanent `+30%` Research speed from `Brawler` (`300 Shards`) and achieves 100% event point alignment.",
          },
        },
        {
          type: "media_spotlight",
          mediaCode: "MED-1.1-05",
          tier: "tier4_youtube_ref",
          title: {
            vi: "Video Tham Chiếu Quốc Tế: Lộ Trình Tân Thủ & Chọn Phe Phái Chuẩn Meta",
            en: "International Video Reference: Complete Beginner Guide & Faction Choice Roadmap",
          },
          description: {
            vi: "Thẻ Video tham chiếu quốc tế từ kênh OGFlux / RedBaron Gaming: \"Top Heroes Complete Beginner Guide & Faction Choice Roadmap\" (Mốc thời gian gợi ý: 02:15 – 08:40 phân tích 3 Phe phái và lỗi nâng lực chiến ảo).",
            en: "International community video reference by OGFlux / RedBaron Gaming: \"Top Heroes Complete Beginner Guide & Faction Choice Roadmap\" (Recommended timestamp: 02:15 – 08:40 covering the 3-Faction breakdown and Inflated Power mistakes).",
          },
          videoChannel: "OGFlux / RedBaron Gaming",
          videoTitle: "Top Heroes Complete Beginner Guide & Faction Choice Roadmap",
          videoTimestamp: "02:15 – 08:40",
        },
      ],
    },
  ],
};

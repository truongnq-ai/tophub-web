import type { GuideArticle } from "../../types";

export const ARTICLE_8_4_MASTER_DATA_TABLES: GuideArticle = {
  code: "8.4",
  slug: "master-data-tables",
  categorySlug: "infrastructure",
  badge: "PRO",
  readingMinutes: 18,
  title: {
    vi: "Trung Tâm Tra Cứu Số Liệu Định Lượng Toàn Diện (Master Data Tables — Single Source of Truth)",
    en: "Master Quantitative Data Tables (The Single Source of Truth — 12 Standardized Datasets)",
  },
  summary: {
    vi: "Kho cơ sở dữ liệu định lượng chuẩn hóa toàn tập (Single Source of Truth) gồm 12 bảng tra cứu cho Top Heroes: Chi phí Nâng Sao Tướng (500 / 1,000 Mảnh) & Sách Kỹ Năng (24,700), Thức Tỉnh 9 Hồn Đá Đỏ, Bậc Thầy Cường Hóa (+10/+20/+30/+40 = 780,000 Quặng/bộ), Bậc Lính T5–T11, Cấp Phe Phái Lv.1–80 (1,181.162M Thịt), Đột Phá Đồ Đỏ 1★–5★ & Vũ Khí Độc Quyền (1,185 mảnh / 920 Lõi), Đồ Chúa Tể (958,800 Đá Xanh), Cổ Ngữ Lv.1–12, Thú Cưng Lv.1–120 (596,600 / 714,000 Food), Quân Trang Lv.1–50 & Honor Lv.150 (28,345,400 Medals) và Đặc Quyền VIP 1–20 ($1.00 = 6 Points).",
    en: "The definitive quantitative Single Source of Truth featuring 12 standardized tables for Top Heroes: Hero Star Promotion (500 / 1,000 Shards) & Skill Books (24,700), 9-Soul-Stone Awakening, Enhancement Master (+10/+20/+30/+40 = 780,000 Ore/set), Troop Tiers T5–T11, Faction Levels 1–80 (1,181.162M Meat), Mythic Gear 1★–5★ & Exclusive Weapons (1,185 shards / 920 Cores), Lord Gear (958,800 Refined Metal), Runes Lv.1–12, Pets Lv.1–120 (596,600 / 714,000 Food), Troop Skins Lv.1–50 & Honor Lv.150 (28,345,400 Medals), and VIP 1–20 ($1.00 = 6 Points).",
  },
  tldr: {
    coreRule: {
      vi: "Mọi quyết định tích trữ và xả tài nguyên trong Top Heroes đều phải dựa trên Con số Điểm Gãy Định lượng Chính xác (Quantitative Breakpoints) thay vì cảm tính: 500 Mảnh để max 1 tướng Vàng/Tím (1,000 Mảnh cho tướng Đỏ Mythic; 1★ Trắng = 280/560 mảnh), 24,700 Sách Kỹ Năng/kỹ năng (Lv.10 = 8,000), 9 Hồn Đá Đỏ + 345–385 Mảnh để thức tỉnh 1 tướng Vàng, 780,000 Quặng cho 1 bộ trang bị +40 (4,680,000 Quặng cho Đội 1 24 món), và 1,181.162M Thịt + 1,307 Mảnh cho 40 cấp Phe Phái (+20.00% Queue HP).",
      en: "Every hoarding and dumping decision in Top Heroes must be governed by exact Quantitative Breakpoints rather than guesswork: 500 Shards to max a Legendary/Epic hero (1,000 Shards for a Mythic hero; 1★ White = 280/560 shards), 24,700 Skill Books per skill (Lv.10 = 8,000), 9 Soul Stones + 345–385 Shards to awaken a Legendary hero, 780,000 Ore for a +40 gear set (4,680,000 Ore for Queue 1's 24 pieces), and 1,181.162M Meat + 1,307 Shards for Faction Levels 1–40 (+20.00% Queue HP).",
    },
    immediateAction: {
      vi: "Dùng ngay 4 Bảng Tóm tắt Sinh tồn ở Phần I (Free Tier) để thực hiện 'Tính Ngược Từ Điểm Gãy (Reverse Breakpoint Budgeting)' trước mỗi kỳ Tuần B (Arms Race): kiểm tra số dư trong Túi đồ và chỉ giải ngân khi đủ nguyên liệu chạm trọn vẹn Mốc Cộng Hưởng Kế Tiếp (Full +10/+20/+30/+40, Rune Lv.5/Lv.8, Troop Skin Lv.10/Lv.20, Pet Lv.10/Lv.20/Lv.60/Lv.75/Lv.90, Faction Lv.10/20/30/40).",
      en: "Use the 4 Survival Quick-Reference Tables in Part I (Free Tier) to perform 'Reverse Breakpoint Budgeting' before every Week B (Arms Race): audit your Bag inventory and only disburse materials when you can hit a complete Next Resonance Breakpoint (Full +10/+20/+30/+40, Rune Lv.5/Lv.8, Troop Skin Lv.10/Lv.20, Pet Lv.10/Lv.20/Lv.60/Lv.75/Lv.90, Faction Lv.10/20/30/40).",
    },
    strictTaboo: {
      vi: "Tuyệt đối KHÔNG bấm nâng cấp dở dang ở giữa 2 mốc điểm gãy (ví dụ: nâng Cổ Ngữ dừng ở Lv.4 thay vì Lv.5, nâng Quân Trang dừng ở Lv.16 thay vì Lv.10/Lv.20, hoặc đập Trang bị lệch cấp +14/+17 không kích hoạt Enhancement Master); và KHÔNG tiêu cạn kiệt quỹ Thịt khiến bị kẹt cứng trước bức tường 1,181.162M Thịt của Faction Level 1–40!",
      en: "NEVER stop an upgrade halfway between two breakpoints (e.g., leaving Runes at Lv.4 instead of Lv.5, stopping Troop Skins at Lv.16 instead of Lv.10/Lv.20, or unevenly enhancing gear to +14/+17 without triggering Enhancement Master); and NEVER drain your Meat reserves before clearing the 1,181.162M Meat wall of Faction Levels 1–40!",
    },
  },
  keyTakeaways: [
    {
      vi: "Bộ 4 Bảng Sinh Tồn Free Tier (Tables 1.1 ➔ 1.4): (1) Nâng Sao Tướng 15 Sao tốn 50 + 150 + 300 = 500 Mảnh (Vàng/Tím) hoặc 100 + 300 + 600 = 1,000 Mảnh (Đỏ Mythic), với Điểm gãy Vàng 1★ Trắng ở 280/560 mảnh (+30% hiệu ứng kỹ năng) & 2★ Trắng ở 300/600 mảnh (Max Trait 3 Tướng Tím), kèm Sách Kỹ Năng Lv.1➔15 tốn 24,700 Sách/kỹ năng; (2) Thức Tỉnh Tướng Vàng tốn 9 Hồn Đá Đỏ (1+2+2+4) + 345–385 Mảnh (đội hình 5-Mythic Bộ Lạc chỉ tốn 9 viên vs 18–27 viên của Liên Minh/Thiên Nhiên); (3) Cường Hóa Trang Bị +10/+20/+30/+40 tốn 21,000 / 60,000 / 118,500 / 195,000 Quặng/món (780,000 Quặng/bộ 4 món, 4,680,000 Quặng/Đội 1 24 món); (4) Mở khóa Bậc Lính T5➔T11 tại Doanh Trại Lv.10/15/20/25/30/35 (T10) và Viện Huy Hoàng Lv.15 (T11 = 5,422 Dragon Essence).",
      en: "4 Free-Tier Survival Tables (Tables 1.1 ➔ 1.4): (1) 15-Star Hero Promotion costs 50 + 150 + 300 = 500 Shards (Legendary/Epic) or 100 + 300 + 600 = 1,000 Shards (Mythic), with Golden Breakpoints at 1★ White (280/560 shards for +30% skill effects) & 2★ White (300/600 shards for Epic Trait 3 Max), plus 24,700 Skill Books per Lv.15 skill; (2) Awakening costs 9 Soul Stones (1+2+2+4) + 345–385 Shards (5-Mythic Horde lineups need only 9 stones vs. 18–27 for League/Nature); (3) Enhancement Master +10/+20/+30/+40 requires 21,000 / 60,000 / 118,500 / 195,000 Ore/piece (780,000 Ore/4-piece set, 4,680,000 Ore/24-piece Queue 1); (4) Troop Tiers T5➔T11 unlock at Barracks Lv.10/15/20/25/30/35 (T10) and Brilliance Institute Lv.15 (T11 = 5,422 Dragon Essence).",
    },
    {
      vi: "Bộ Bảng Định Lượng PRO Phần 1 (Tables 4.1 ➔ 4.4 — Faction Level, Mythic Gear & UW, Lord Gear, Runes): (1) Faction Level 1➔40 ngốn 1,181.162M Thịt & 1,307 Mảnh (+4,908 Hero ATK, +96,200 Hero HP, +20.00% Queue HP tại Lv.10/20/30/40, mở rộng đến Lv.80); (2) Đột phá Đồ Đỏ 1★➔5★ MYTHIC tốn 6,000 Thỏi Vàng + 500K Quặng + 50 Đá Vàng + 10 Đá Đỏ/món, Vũ Khí Độc Quyền Lv.1➔20 tốn 1,185 mảnh (Lv.5=75, Lv.10=275, Lv.15=605, Lv.20=1,185) & 1★➔5★ tốn 920 Lõi Sắt Thiên Thạch (Meteoric Iron Cores); (3) Đồ Chúa Tể (Uncommon BASE ➔ Mythic T1 3★) tốn 958,800 Đá Xanh (Refined Metal) + 9,955 Dây Gai (Magic Thread) + 2,030 Bản Vẽ (Orichalcum) + 101 Nguyên Liệu Đỏ (Dragon Blood)/món (Nhánh Trái +41.45% Hero HP / +113.95% Soldier HP / +14.40% All ATK vs Nhánh Phải +20.75% Hero ATK / +43.15% Soldier ATK / +38.00% All HP); (4) Cổ Ngữ Lv.1➔12 với Điểm gãy Lv.5 (+15,091/+5% Hero HP, +371/+5% Hero ATK, +30/+50 March), Lv.8 (+191,019/+20%, +4,696/+20%, +50 March/+5% All, +28,660/+5% Relic HP) và Lv.12 (+722,271/+40%, +17,753/+40%, +100 March/+30% All, +108,500/+30%, +7,200 DEF/+14,000 Break/+250 March).",
      en: "PRO Master Datasets Part 1 (Tables 4.1 ➔ 4.4 — Faction Level, Mythic Gear & UW, Lord Gear, Runes): (1) Faction Levels 1➔40 require 1,181.162M Meat & 1,307 Shards (+4,908 Hero ATK, +96,200 Hero HP, +20.00% Queue HP across Lv.10/20/30/40, expanding to Lv.80); (2) Mythic Gear 1★➔5★ Promotion costs 6,000 Solar Gold Ingots + 500K Ore + 50 Legendary Stones + 10 Mythic Stones/piece, while Exclusive Weapons Lv.1➔20 take 1,185 shards (Lv.5=75, Lv.10=275, Lv.15=605, Lv.20=1,185) & 920 Meteoric Iron Cores for 1★➔5★; (3) Lord Gear (Uncommon BASE ➔ Mythic T1 3★) totals 958,800 Refined Metal + 9,955 Magic Thread + 2,030 Orichalcum + 101 Dragon Blood per piece (Left Branch +41.45% Hero HP / +113.95% Soldier HP / +14.40% All ATK vs. Right Branch +20.75% Hero ATK / +43.15% Soldier ATK / +38.00% All HP); (4) Runes Lv.1➔12 with Breakpoints at Lv.5 (+15,091/+5% Hero HP, +371/+5% Hero ATK, +30/+50 March), Lv.8 (+191,019/+20%, +4,696/+20%, +50 March/+5% All, +28,660/+5% Relic HP), and Lv.12 (+722,271/+40%, +17,753/+40%, +100 March/+30% All, +108,500/+30%, +7,200 DEF/+14,000 Break/+250 March).",
    },
    {
      vi: "Bộ Bảng Định Lượng PRO Phần 2 (Tables 4.5 ➔ 4.7 — Pets, Troop Skins, VIP 1–20): (5) Thú Cưng Lv.1➔90 tốn 596,600 Pet Food (Rare) / 596,850 (Uncommon + 3,525 Essence) + 44 same + 161 any (Conversion Rate 36.00% ➔ 96.00%, +27.20%/+81.60% ATK, +40.00%/+120.00% HP), và kịch trần Lv.120 tốn 714,000 Pet Food + 40,050 Pet Essence + 58 same + 211 any (Conversion Rate 104%+); (6) Quân Trang Lv.1➔50 & Honor Lv.1–150 theo tỷ lệ 4:2:1 (Lv.10: 80,400/40,200/20,100 | Lv.20: 948,400➔1,155,400 / 474,200➔577,700 / 237,100➔288,850 | Lv.30: 4,259,400➔4,791,400 | Lv.40: 10,960,400➔11,832,400 | Lv.50: 20,845,400/10,422,700/5,211,350 | Honor Lv.150: 28,345,400 / 14,172,700 / 7,086,350 Medals); (7) Đặc quyền VIP 1➔20 (1 USD = 6 VIP Points: từ VIP 1 6 Điểm/$1.00, VIP 4 300/$50.00, VIP 6 1,000/$166.70, VIP 8 6,000/$1,000.00, VIP 10 30,000/$5,000.00, VIP 15 200,000/$33,670.00 đến VIP 16–20 300,000➔3,000,000 Điểm / $50,000.00➔$500,000.00).",
      en: "PRO Master Datasets Part 2 (Tables 4.5 ➔ 4.7 — Pets, Troop Skins, VIP 1–20): (5) Pets Lv.1➔90 cost 596,600 Pet Food (Rare) / 596,850 (Uncommon + 3,525 Essence) + 44 same + 161 any (Conversion Rate 36.00% ➔ 96.00%, +27.20%/+81.60% ATK, +40.00%/+120.00% HP), and Mythic Max Lv.120 totals 714,000 Pet Food + 40,050 Pet Essence + 58 same + 211 any (Conversion Rate 104%+); (6) Troop Skins Lv.1➔50 & Honor Lv.1–150 follow a 4:2:1 ratio (Lv.10: 80,400/40,200/20,100 | Lv.20: 948,400➔1,155,400 / 474,200➔577,700 / 237,100➔288,850 | Lv.30: 4,259,400➔4,791,400 | Lv.40: 10,960,400➔11,832,400 | Lv.50: 20,845,400/10,422,700/5,211,350 | Honor Lv.150: 28,345,400 / 14,172,700 / 7,086,350 Medals); (7) VIP 1➔20 (1 USD = 6 VIP Points: VIP 1 6/$1.00, VIP 4 300/$50.00, VIP 6 1,000/$166.70, VIP 8 6,000/$1,000.00, VIP 10 30,000/$5,000.00, VIP 15 200,000/$33,670.00 to VIP 16–20 300,000➔3,000,000 Points / $50,000.00➔$500,000.00).",
    },
  ],
  keywords: [
    "bảng số liệu",
    "bang so lieu",
    "master data tables",
    "single source of truth",
    "topheroes tables",
    "faction level",
    "1,181.162m",
    "958,800",
    "596,600",
    "714,000",
    "28,345,400",
    "vip cost usd",
    "enhancement master",
    "780,000",
    "920 meteoric iron cores",
  ],
  sourceFiles: [
    "docs/06-game-guides/07-standardized-web-guides/group-8-infrastructure/8.4-master-data-tables.md",
    "docs/06-game-guides/03-data-tables-and-mechanics/topheroes-tables-analysis-summary.md",
    "docs/06-game-guides/03-data-tables-and-mechanics/topheroes-tables-max-raw-dataset.md",
  ],
  freeSections: [
    {
      id: "sec-1-four-survival-summary-tables",
      title: {
        vi: "1. Giải thích Cơ chế Cốt lõi: Bốn Bảng Tóm Tắt Sinh Tồn Cho Mọi Người Chơi (Free Tier Quick-Reference)",
        en: "1. Core Mechanics: Four Survival Quick-Reference Tables for Every Commander (Free Tier)",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "Để giúp người chơi ở mọi cấp độ có thể tra cứu nhanh trong 10 giây trước mỗi kỳ sự kiện, Phần I tổng hợp 4 Bảng Số Liệu Nền Tảng quyết định 80% sức mạnh cốt lõi của Đội hình 1 (Queue 1): Mảnh Sao Tướng & Sách Kỹ Năng, Thức Tỉnh 9 Hồn Đá Đỏ, Mốc Cộng Hưởng Cường Hóa Trang Bị +10/+20/+30/+40 và Lộ Trình Bậc Lính T5–T11.",
            en: "To let commanders at every stage audit their inventories in 10 seconds before each event cycle, Part I consolidates the 4 Foundational Data Tables that govern 80% of Queue 1's core combat power: Hero Star Shards & Skill Books, 9-Soul-Stone Awakening, Enhancement Master +10/+20/+30/+40 Resonance, and Troop Tiers T5–T11.",
          },
        },
        {
          type: "media_spotlight",
          mediaCode: "MED-8.4-02",
          tier: "tier2_annotated_ui",
          title: {
            vi: "Tổng Quan 4 Bảng Tra Cứu Nhanh Sinh Tồn Free Tier (Quick-Reference Breakpoint Dashboard)",
            en: "Free-Tier 4-Table Survival Quick-Reference Breakpoint Dashboard",
          },
          description: {
            vi: "Bảng điều khiển đối chiếu nhanh 4 định mức tài nguyên sinh tồn của Đội hình 1: 500/1,000 Mảnh Sao Tướng & 24,700 Sách Kỹ Năng, 9 Hồn Đá Đỏ Thức Tỉnh, 780,000 Quặng Cường Hóa +40 và Bậc Lính T5–T11 (5,422 Dragon Essence).",
            en: "Quick-reference dashboard mapping Queue 1's four core survival resource benchmarks: 500/1,000 Hero Star Shards & 24,700 Skill Books, 9 Awakening Soul Stones, 780,000 Ore for +40 Gear Sets, and Troop Tiers T5–T11 (5,422 Dragon Essence).",
          },
          annotations: [
            {
              kind: "do",
              label: {
                vi: "Chốt Điểm Gãy Vàng 1★ Trắng (280 Mảnh Vàng / 560 Mảnh Đỏ) & 2★ Trắng (300 / 600 Mảnh)",
                en: "Lock In the 1★ White (280 Legendary / 560 Mythic Shards) & 2★ White (300 / 600 Shards) Breakpoints",
              },
              detail: {
                vi: "Mốc 1★ Trắng (11★) mở khóa dòng tăng +30% hiệu ứng kỹ năng cốt lõi và điều kiện khởi tạo Thức Tỉnh; mốc 2★ Trắng (12★ = 300 mảnh) mở khóa Trait 3 Lv.30 cho Tướng Tím kinh tế và điều kiện Thức Tỉnh Tướng Vàng.",
                en: "Reaching 1★ White (11★) unlocks +30% core skill effectiveness and initial Awakening eligibility; 2★ White (12★ = 300 shards) unlocks Trait 3 Lv.30 for Epic economic heroes and Legendary Awakening progression.",
              },
            },
            {
              kind: "info",
              label: {
                vi: "Đồng Bộ Cả 4 Món Trang Bị Chạm Mốc +10 / +20 / +30 / +40 (780,000 Quặng/Bộ)",
                en: "Synchronize All 4 Gear Pieces to +10 / +20 / +30 / +40 (780,000 Ore/Set)",
              },
              detail: {
                vi: "Hào quang Bậc Thầy Cường Hóa (Enhancement Master) chỉ kích hoạt khi cả 4 món trên cùng 1 tướng đạt đúng mốc +10 (84,000 Quặng), +20 (240,000 Quặng), +30 (474,000 Quặng) hoặc +40 (780,000 Quặng).",
                en: "The Enhancement Master resonance aura only triggers when all 4 pieces on a single hero reach +10 (84,000 Ore), +20 (240,000 Ore), +30 (474,000 Ore), or +40 (780,000 Ore).",
              },
            },
            {
              kind: "dont",
              label: {
                vi: "Không Nâng Dở Dang Giữa 2 Điểm Gãy Trước Ngày Sự Kiện Arms Race",
                en: "Never Upgrade Halfway Between Two Breakpoints Before Arms Race",
              },
              detail: {
                vi: "Việc rải mảnh tướng dừng ở 3★ Đỏ hay cường hóa đồ lệch cấp +14/+17 vừa làm hụt điểm đua sự kiện vừa không mở khóa được bất kỳ dòng thưởng cộng hưởng phần trăm nào.",
                en: "Spreading hero shards to stop at 3★ Red or enhancing gear unevenly to +14/+17 wastes Arms Race scoring potential while activating zero percentage resonance bonuses.",
              },
            },
          ],
        },
      ],
      subSections: [
        {
          id: "sub-1-1-hero-star-and-skill-books-table",
          title: {
            vi: "1.1. Bảng Tóm tắt Chi phí Nâng Sao Tướng (0 ➔ 5 Sao Trắng = 1,000 Mảnh) & Sách Kỹ Năng",
            en: "1.1. Hero Star Promotion Cost Summary (0 ➔ 5 White Stars = 1,000 Shards) & Skill Books",
          },
          blocks: [
            {
              type: "paragraph",
              text: {
                vi: "Trong Top Heroes, mỗi cấp Sao được chia làm 5 nấc nhỏ (5 Tiers/Segments). Đặc biệt, một tướng Thần Thoại (Mythic — Đỏ) tiêu tốn lượng mảnh ở mỗi nấc gấp đôi so với tướng Huyền Thoại (Legendary — Vàng) nếu dùng mảnh riêng, hoặc quy đổi tương đương 1,000 Mảnh Tướng Vàng Vạn Năng (Universal Legendary Shards) để đạt kịch trần 5 Sao Trắng / Bạc (15 Sao vs 500 Mảnh cho Tướng Vàng/Tím):",
                en: "In Top Heroes, every Star level is divided into 5 sub-segments (5 Tiers/Segments). A Mythic (Red) hero consumes double the shards per segment compared to a Legendary (Yellow) or Epic (Purple) hero, requiring 1,000 Universal Legendary Shards to reach the 5 White/Silver Star ceiling (15 Stars vs. 500 Shards for Legendary/Epic heroes):",
              },
            },
            {
              type: "table",
              caption: {
                vi: "Bảng 1.1: Chi Phí Nâng Sao Tướng (0 ➔ 5 Sao Trắng = 500 Mảnh Vàng/Tím | 1,000 Mảnh Đỏ Mythic)",
                en: "Table 1.1: Hero Star Promotion Costs (0 ➔ 5 White Stars = 500 Legendary/Epic Shards | 1,000 Mythic Shards)",
              },
              headers: [
                { vi: "Bậc Sao Tướng (Star Tier)", en: "Hero Star Tier" },
                { vi: "Ký hiệu Cấp Sao", en: "Star Notation" },
                { vi: "Mảnh Tướng Vàng / Nấc (×5 Nấc)", en: "Legendary Shards / Segment (×5)" },
                { vi: "Tổng Mảnh Tướng Vàng / Tím (Legendary / Epic)", en: "Total Legendary / Epic Shards" },
                { vi: "Mảnh Tướng Đỏ / Nấc (×5 Nấc — Quy đổi)", en: "Mythic Shards / Segment (×5)" },
                { vi: "Tổng Mảnh Quy Đổi Tướng Đỏ (Mythic)", en: "Total Mythic Shards" },
                { vi: "Điểm Gãy Chiến Thuật (Strategic Breakpoint)", en: "Strategic Breakpoint" },
              ],
              rows: [
                [
                  { vi: "1 ➔ 5 Sao Vàng (Yellow Stars: 1★–5★)", en: "1 ➔ 5 Yellow Stars (1★–5★)" },
                  { vi: "1★ ➔ 5★ Vàng", en: "1★ ➔ 5★ Yellow" },
                  { vi: "1 ➔ 1 ➔ 2 ➔ 2 ➔ 4 (5, 5, 10, 10, 20)", en: "1 ➔ 1 ➔ 2 ➔ 2 ➔ 4 (5, 5, 10, 10, 20)" },
                  { vi: "50 Mảnh (Tích lũy: 50)", en: "50 Shards (Cumulative: 50)" },
                  { vi: "2 ➔ 2 ➔ 4 ➔ 4 ➔ 8 (10, 10, 20, 20, 40)", en: "2 ➔ 2 ➔ 4 ➔ 4 ➔ 8 (10, 10, 20, 20, 40)" },
                  { vi: "100 Mảnh (Tích lũy: 100)", en: "100 Shards (Cumulative: 100)" },
                  {
                    vi: "Mở khóa đầy đủ bộ kỹ năng cơ bản của tướng.",
                    en: "Unlocks the hero's complete base skill kit.",
                  },
                ],
                [
                  { vi: "1 ➔ 5 Sao Đỏ (Red Stars: 6★–10★)", en: "1 ➔ 5 Red Stars (6★–10★)" },
                  { vi: "1★ ➔ 5★ Đỏ", en: "1★ ➔ 5★ Red" },
                  { vi: "6 ➔ 4 ➔ 4 ➔ 8 ➔ 8 (30, 20, 20, 40, 40)", en: "6 ➔ 4 ➔ 4 ➔ 8 ➔ 8 (30, 20, 20, 40, 40)" },
                  {
                    vi: "150 Mảnh (Tích lũy: 1★ Đỏ = 80 | 5★ Đỏ = 200)",
                    en: "150 Shards (Cumulative: 1★ Red = 80 | 5★ Red = 200)",
                  },
                  {
                    vi: "12 ➔ 8 ➔ 8 ➔ 16 ➔ 16 (60, 40, 40, 80, 80)",
                    en: "12 ➔ 8 ➔ 8 ➔ 16 ➔ 16 (60, 40, 40, 80, 80)",
                  },
                  {
                    vi: "300 Mảnh (Tích lũy: 1★ Đỏ = 160 | 5★ Đỏ = 400)",
                    en: "300 Shards (Cumulative: 1★ Red = 160 | 5★ Red = 400)",
                  },
                  {
                    vi: "Mốc 1★ Đỏ (80–160 mảnh): Ngưỡng dùng được đầu game; 5★ Đỏ (200–400 mảnh): Hoàn tất bậc Sao Đỏ.",
                    en: "1★ Red (80–160 shards): Early-game playable threshold; 5★ Red (200–400 shards): Completes Red Star tier.",
                  },
                ],
                [
                  {
                    vi: "1 ➔ 5 Sao Trắng / Bạc (Platinum / Silver Stars: 11★–15★)",
                    en: "1 ➔ 5 White / Silver Stars (Platinum / Silver: 11★–15★)",
                  },
                  { vi: "1★ ➔ 5★ Trắng", en: "1★ ➔ 5★ White" },
                  {
                    vi: "16 ➔ 4 ➔ 8 ➔ 16 ➔ 16 (80, 20, 40, 80, 80)",
                    en: "16 ➔ 4 ➔ 8 ➔ 16 ➔ 16 (80, 20, 40, 80, 80)",
                  },
                  {
                    vi: "300 Mảnh (Tích lũy: 1★ Trắng = 280 | 2★ Trắng = 300 | Tổng: 500 Mảnh)",
                    en: "300 Shards (Cumulative: 1★ White = 280 | 2★ White = 300 | Total: 500 Shards)",
                  },
                  {
                    vi: "32 ➔ 8 ➔ 16 ➔ 32 ➔ 32 (160, 40, 80, 160, 160)",
                    en: "32 ➔ 8 ➔ 16 ➔ 32 ➔ 32 (160, 40, 80, 160, 160)",
                  },
                  {
                    vi: "600 Mảnh (Tích lũy: 1★ Trắng = 560 | 2★ Trắng = 600 | Tổng: 1,000 Mảnh)",
                    en: "600 Shards (Cumulative: 1★ White = 560 | 2★ White = 600 | Total: 1,000 Shards)",
                  },
                  {
                    vi: "🔥 Điểm gãy Vàng 1★ Trắng (280/560 mảnh): Mở khóa +30% hiệu ứng kỹ năng & bắt đầu Thức Tỉnh; 2★ Trắng (300/600 mảnh): Max Trait 3 Tướng Tím; 5★ Trắng (500/1,000 mảnh): Mở Tiệm Đổi Quà!",
                    en: "🔥 Golden Breakpoint 1★ White (280/560 shards): Unlocks +30% skill effect & Awakening start; 2★ White (300/600 shards): Max Epic Trait 3; 5★ White (500/1,000 shards): Unlocks Exchange Shop!",
                  },
                ],
              ],
            },
            {
              type: "paragraph",
              text: {
                vi: "📚 Chi phí Sách Kỹ Năng (Skill Books Lv.1 ➔ Lv.15 cho 1 Kỹ năng): Lv.2: 100 | Lv.3: 200 (Tổng 300) | Lv.4: 400 (700) | Lv.5: 600 (1,300) | Lv.6: 800 (2,100) | Lv.7: 1,100 (3,200) | Lv.8: 1,300 (4,500) | Lv.9: 1,600 (6,100) | Lv.10: 1,900 (8,000) | Lv.11: 2,200 (10,200) | Lv.12: 2,700 (12,900) | Lv.13: 3,200 (16,100) | Lv.14: 3,900 (20,000) | Lv.15: 4,700 (Tổng cộng: 24,700 Sách Kỹ Năng / 1 Kỹ năng).",
                en: "📚 Skill Book Progression Costs (Skill Books Lv.1 ➔ Lv.15 per Skill): Lv.2: 100 | Lv.3: 200 (Total 300) | Lv.4: 400 (700) | Lv.5: 600 (1,300) | Lv.6: 800 (2,100) | Lv.7: 1,100 (3,200) | Lv.8: 1,300 (4,500) | Lv.9: 1,600 (6,100) | Lv.10: 1,900 (8,000) | Lv.11: 2,200 (10,200) | Lv.12: 2,700 (12,900) | Lv.13: 3,200 (16,100) | Lv.14: 3,900 (20,000) | Lv.15: 4,700 (Grand Total: 24,700 Skill Books per Skill).",
              },
            },
          ],
        },
        {
          id: "sub-1-2-hero-awakening-cost-table",
          title: {
            vi: "1.2. Bảng Tóm tắt Chi phí Thức Tỉnh Tướng Vàng Lên Đỏ (Awakening Tiers 0 ➔ 4 = 9 Hồn Đá Đỏ)",
            en: "1.2. Legendary-to-Mythic Hero Awakening Cost Table (Awakening Tiers 0 ➔ 4 = 9 Soul Stones)",
          },
          blocks: [
            {
              type: "paragraph",
              text: {
                vi: "Khi một tướng Huyền Thoại (Vàng) đạt mốc 2 Sao Trắng / Bạc trở lên, người chơi có thể sử dụng Hồn Đá Đỏ (Soul Stones) kết hợp với Mảnh Tướng để tiến hành Thức Tỉnh (Awakening), biến vị tướng đó thành phẩm chất Thần Thoại (Đỏ) và nâng giới hạn cấp kỹ năng:",
                en: "Once a Legendary (Yellow) hero reaches 2 White/Silver Stars or higher, you can combine Red Soul Stones with Hero Shards to perform Awakening, ascending the hero to Mythic (Red) quality and raising their skill level cap:",
              },
            },
            {
              type: "table",
              caption: {
                vi: "Bảng 1.2: Chi Phí Thức Tỉnh Tướng Vàng Lên Đỏ (Awakening Tiers 0 ➔ 4 = 9 Hồn Đá Đỏ + 345–385 Mảnh)",
                en: "Table 1.2: Legendary-to-Mythic Awakening Costs (Awakening Tiers 0 ➔ 4 = 9 Soul Stones + 345–385 Shards)",
              },
              headers: [
                { vi: "Giai đoạn Thức Tỉnh (Awakening Tier)", en: "Awakening Tier" },
                { vi: "Số Nấc Nhỏ (Sub-levels)", en: "Sub-levels" },
                { vi: "Chi phí Mảnh Tướng Mỗi Nấc", en: "Hero Shards per Sub-level" },
                { vi: "Tổng Mảnh Tướng Ở Bậc Này", en: "Tier Total Shards" },
                { vi: "Số Hồn Đá Đỏ Cần Để Đột Phá Bậc (Tier Up)", en: "Soul Stones Required for Tier Up" },
                { vi: "Tổng Tích Lũy (Mảnh + Hồn Đá)", en: "Cumulative Total (Shards + Soul Stones)" },
              ],
              rows: [
                [
                  { vi: "Khởi tạo (Tier 0 ➔ Tier 1)", en: "Activation (Tier 0 ➔ Tier 1)" },
                  { vi: "1 bước mở khóa", en: "1 unlock step" },
                  { vi: "5 Mảnh", en: "5 Shards" },
                  { vi: "5 Mảnh", en: "5 Shards" },
                  { vi: "1 Hồn Đá Đỏ (Soul Stone)", en: "1 Soul Stone" },
                  { vi: "5 Mảnh + 1 Hồn Đá", en: "5 Shards + 1 Soul Stone" },
                ],
                [
                  { vi: "Bậc 1 (Tier 1: Lv.0 ➔ Lv.5)", en: "Tier 1 (Lv.0 ➔ Lv.5)" },
                  { vi: "6 nấc (0 ➔ 5)", en: "6 steps (0 ➔ 5)" },
                  { vi: "5 + 10 + 10 + 10 + 15 + 15", en: "5 + 10 + 10 + 10 + 15 + 15" },
                  { vi: "65 Mảnh", en: "65 Shards" },
                  { vi: "2 Hồn Đá Đỏ (Soul Stones)", en: "2 Soul Stones" },
                  { vi: "70 Mảnh + 3 Hồn Đá", en: "70 Shards + 3 Soul Stones" },
                ],
                [
                  { vi: "Bậc 2 (Tier 2: Lv.0 ➔ Lv.5)", en: "Tier 2 (Lv.0 ➔ Lv.5)" },
                  { vi: "6 nấc (0 ➔ 5)", en: "6 steps (0 ➔ 5)" },
                  { vi: "15 + 15 + 15 + 20 + 20 + 20", en: "15 + 15 + 15 + 20 + 20 + 20" },
                  { vi: "105 Mảnh", en: "105 Shards" },
                  { vi: "2 Hồn Đá Đỏ (Soul Stones)", en: "2 Soul Stones" },
                  { vi: "175 Mảnh + 5 Hồn Đá", en: "175 Shards + 5 Soul Stones" },
                ],
                [
                  { vi: "Bậc 3 (Tier 3: Lv.0 ➔ Lv.5)", en: "Tier 3 (Lv.0 ➔ Lv.5)" },
                  { vi: "6 nấc (0 ➔ 5)", en: "6 steps (0 ➔ 5)" },
                  { vi: "20 + 20 + 30 + 30 + 30 + 40", en: "20 + 20 + 30 + 30 + 30 + 40" },
                  { vi: "170 Mảnh", en: "170 Shards" },
                  { vi: "4 Hồn Đá Đỏ (Soul Stones)", en: "4 Soul Stones" },
                  { vi: "345 Mảnh + 9 Hồn Đá", en: "345 Shards + 9 Soul Stones" },
                ],
                [
                  { vi: "👑 Bậc 4 (Tier 4 — Hoàn Tất Hóa Đỏ)", en: "👑 Tier 4 (Full Mythic Ascension)" },
                  { vi: "Kích hoạt Thần Thoại", en: "Mythic Activation" },
                  { vi: "(Một số tướng tốn thêm 10–40 mảnh)", en: "(Some heroes require +10–40 shards)" },
                  { vi: "0–40 Mảnh", en: "0–40 Shards" },
                  { vi: "Đã hoàn tất ở cuối Bậc 3", en: "Completed at the end of Tier 3" },
                  {
                    vi: "Tổng chuẩn: 9 Hồn Đá Đỏ + 345–385 Mảnh",
                    en: "Standard Total: 9 Soul Stones + 345–385 Shards",
                  },
                ],
              ],
            },
          ],
        },
        {
          id: "sub-1-3-gear-enhancement-master-table",
          title: {
            vi: "1.3. Bảng Tóm tắt Mốc Cộng Hưởng Cường Hóa Trang Bị (Enhancement Master +10 / +20 / +30 / +40)",
            en: "1.3. Gear Enhancement Master Resonance Table (+10 / +20 / +30 / +40)",
          },
          blocks: [
            {
              type: "paragraph",
              text: {
                vi: "Hệ thống Bậc Thầy Cường Hóa (Enhancement Master) chỉ kích hoạt khi CẢ 4 MÓN TRANG BỊ trên người 1 tướng cùng đạt mốc +10, +20, +30 hoặc +40:",
                en: "The Enhancement Master resonance system only activates when ALL 4 GEAR PIECES equipped on a single hero simultaneously reach +10, +20, +30, or +40:",
              },
            },
            {
              type: "table",
              caption: {
                vi: "Bảng 1.3: Mốc Cộng Hưởng Cường Hóa Trang Bị (Enhancement Master +10 / +20 / +30 / +40)",
                en: "Table 1.3: Gear Enhancement Master Resonance Milestones (+10 / +20 / +30 / +40)",
              },
              headers: [
                { vi: "Mốc Cộng Hưởng Cường Hóa", en: "Enhancement Master Milestone" },
                { vi: "Quặng Cường Hóa / 1 Món (Trong Giai đoạn)", en: "Enhancement Ore / Piece (Stage Cost)" },
                { vi: "Tổng Quặng Tích Lũy / 1 Món (Từ Lv.0)", en: "Cumulative Ore / Piece (From Lv.0)" },
                { vi: "Tổng Quặng Cho 1 Bộ 4 Món (1 Tướng)", en: "Total Ore per 4-Piece Set (1 Hero)" },
                { vi: "Tổng Quặng Cho Cả Đội 1 (6 Tướng = 24 Món)", en: "Total Ore for Queue 1 (6 Heroes = 24 Pieces)" },
                { vi: "Chi Phí Ruby Tích Lũy / 1 Món (Từ Lv.0)", en: "Cumulative Ruby Cost / Piece (From Lv.0)" },
              ],
              rows: [
                [
                  { vi: "Mốc 1: Lv.0 ➔ +10", en: "Milestone 1: Lv.0 ➔ +10" },
                  { vi: "21,000 Quặng", en: "21,000 Ore" },
                  { vi: "21,000 Quặng", en: "21,000 Ore" },
                  { vi: "84,000 Quặng", en: "84,000 Ore" },
                  { vi: "504,000 Quặng", en: "504,000 Ore" },
                  { vi: "~100,800 Ruby", en: "~100,800 Rubies" },
                ],
                [
                  { vi: "Mốc 2: Lv.11 ➔ +20", en: "Milestone 2: Lv.11 ➔ +20" },
                  { vi: "39,000 Quặng", en: "39,000 Ore" },
                  { vi: "60,000 Quặng", en: "60,000 Ore" },
                  { vi: "240,000 Quặng", en: "240,000 Ore" },
                  { vi: "1,440,000 Quặng", en: "1,440,000 Ore" },
                  { vi: "~288,000 Ruby", en: "~288,000 Rubies" },
                ],
                [
                  { vi: "Mốc 3: Lv.21 ➔ +30", en: "Milestone 3: Lv.21 ➔ +30" },
                  { vi: "58,500 Quặng", en: "58,500 Ore" },
                  { vi: "118,500 Quặng", en: "118,500 Ore" },
                  { vi: "474,000 Quặng", en: "474,000 Ore" },
                  { vi: "2,844,000 Quặng", en: "2,844,000 Ore" },
                  { vi: "~568,800 Ruby", en: "~568,800 Rubies" },
                ],
                [
                  { vi: "Mốc 4: Lv.31 ➔ +40 (Max)", en: "Milestone 4: Lv.31 ➔ +40 (Max)" },
                  { vi: "76,500 Quặng", en: "76,500 Ore" },
                  { vi: "195,000 Quặng", en: "195,000 Ore" },
                  { vi: "780,000 Quặng", en: "780,000 Ore" },
                  { vi: "4,680,000 Quặng", en: "4,680,000 Ore" },
                  { vi: "~936,000 Ruby (Mở đột phá Sao Đỏ)", en: "~936,000 Rubies (Unlocks Star Promotion)" },
                ],
              ],
            },
          ],
        },
        {
          id: "sub-1-4-troop-tiers-unlock-table",
          title: {
            vi: "1.4. Bảng Tóm tắt Mốc Mở Khóa Bậc Lính (Troop Tiers T5 ➔ T11)",
            en: "1.4. Troop Tier Unlock Milestones Table (Troop Tiers T5 ➔ T11)",
          },
          blocks: [
            {
              type: "paragraph",
              text: {
                vi: "Cứ mỗi 5 cấp độ của Doanh Trại (Barracks) sẽ mở khóa một Bậc Lính mới. Riêng Lính Bậc 11 (Tier 11) được mở khóa qua node Soldier Level trong Viện Huy Hoàng (Brilliance Institute Lv.15). Dưới đây là lộ trình chuẩn từ T5 đến T11:",
                en: "Every 5 levels of your Faction Barracks unlocks a new Troop Tier, while Tier 11 Troops are unlocked via the Soldier Level node inside the Brilliance Institute (Lv.15). Below is the complete progression from T5 to T11:",
              },
            },
            {
              type: "table",
              caption: {
                vi: "Bảng 1.4: Mốc Mở Khóa Bậc Lính (Troop Tiers T5 ➔ T11)",
                en: "Table 1.4: Troop Tier Unlock Milestones (Troop Tiers T5 ➔ T11)",
              },
              headers: [
                { vi: "Bậc Binh Lính (Troop Tier)", en: "Troop Tier" },
                { vi: "Cấp Doanh Trại Yêu Cầu (Barracks Level)", en: "Required Barracks / Institute Level" },
                { vi: "Cấp Lâu Đài Tiên Quyết (Castle Level)", en: "Prerequisite Castle Level" },
                { vi: "Trần Cấp Tướng Tương Ứng", en: "Corresponding Hero Level Cap" },
                {
                  vi: "Đánh Giá Bước Nhảy Sức Mạnh & Lời Khuyên Chiến Thuật",
                  en: "Power Spike Assessment & Tactical Advice",
                },
              ],
              rows: [
                [
                  { vi: "Lính Bậc 5 (Tier 5)", en: "Tier 5 Troops (T5)" },
                  { vi: "Doanh Trại Lv.10", en: "Barracks Lv.10" },
                  { vi: "Lâu Đài Lv.10", en: "Castle Lv.10" },
                  { vi: "Lv.60", en: "Lv.60" },
                  {
                    vi: "Bậc lính khởi đầu giai đoạn tuần đầu tiên.",
                    en: "Baseline troop tier during the first week of server launch.",
                  },
                ],
                [
                  { vi: "Lính Bậc 6 (Tier 6)", en: "Tier 6 Troops (T6)" },
                  { vi: "Doanh Trại Lv.15", en: "Barracks Lv.15" },
                  { vi: "Lâu Đài Lv.15", en: "Castle Lv.15" },
                  { vi: "Lv.90", en: "Lv.90" },
                  {
                    vi: "Bắt đầu áp dụng kỹ thuật Thăng cấp Bậc thang (T5 ➔ T6) vào ngày sự kiện.",
                    en: "Begin applying Staircase Troop Promotion (T5 ➔ T6) on event scoring days.",
                  },
                ],
                [
                  { vi: "Lính Bậc 7 (Tier 7)", en: "Tier 7 Troops (T7)" },
                  { vi: "Doanh Trại Lv.20", en: "Barracks Lv.20" },
                  { vi: "Lâu Đài Lv.20", en: "Castle Lv.20" },
                  { vi: "Lv.115", en: "Lv.115" },
                  {
                    vi: "Mốc chuẩn cho Tuần 2 Pre-Season.",
                    en: "Standard benchmark for Pre-Season Week 2.",
                  },
                ],
                [
                  { vi: "Lính Bậc 8 (Tier 8)", en: "Tier 8 Troops (T8)" },
                  { vi: "Doanh Trại Lv.25", en: "Barracks Lv.25" },
                  { vi: "Lâu Đài Lv.25", en: "Castle Lv.25" },
                  { vi: "Lv.140", en: "Lv.140" },
                  {
                    vi: "Điểm gãy Pre-Season: Tăng vọt độ trâu bò cho Đội 1 trước khi sang Bộ Lạc.",
                    en: "Pre-Season Breakpoint: Massive durability surge for Queue 1 prior to the Horde pivot.",
                  },
                ],
                [
                  { vi: "Lính Bậc 9 (Tier 9)", en: "Tier 9 Troops (T9)" },
                  { vi: "Doanh Trại Lv.30", en: "Barracks Lv.30" },
                  { vi: "Lâu Đài Lv.30", en: "Castle Lv.30" },
                  { vi: "Lv.170", en: "Lv.170" },
                  {
                    vi: "Mốc tốt nghiệp Pre-Season / bước vào Season 1.",
                    en: "Pre-Season graduation milestone entering Season 1.",
                  },
                ],
                [
                  { vi: "🔥 Lính Bậc 10 (Tier 10)", en: "🔥 Tier 10 Troops (T10)" },
                  { vi: "Doanh Trại Lv.35", en: "Barracks Lv.35" },
                  { vi: "Lâu Đài Lv.35", en: "Castle Lv.35" },
                  { vi: "Lv.195", en: "Lv.195" },
                  {
                    vi: "ĐIỂM GÃY SINH TỬ MID-GAME: Mốc quân sự quan trọng nhất trước Castle Lv.40 (Castle Lv.40 không có bậc lính mới!).",
                    en: "LETHAL MID-GAME BREAKPOINT: The single most important military spike before Castle Lv.40 (Castle Lv.40 unlocks no new troop tier!).",
                  },
                ],
                [
                  { vi: "👑 Lính Bậc 11 (Tier 11)", en: "👑 Tier 11 Troops (T11)" },
                  { vi: "Viện Huy Hoàng Lv.15", en: "Brilliance Institute Lv.15" },
                  { vi: "Lâu Đài Lv.40+ (B1–B3)", en: "Castle Lv.40+ (B1–B3)" },
                  { vi: "Lv.220+", en: "Lv.220+" },
                  {
                    vi: "Mở khóa qua node Soldier Level trong Brilliance Institute (Tổng tốn 5,422 Dragon Essence).",
                    en: "Unlocked via the Soldier Level node inside the Brilliance Institute (Total cost: 5,422 Dragon Essence).",
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: "sec-2-reverse-breakpoint-budgeting-strategy",
      title: {
        vi: "2. Chiến thuật Tối ưu cho F2P & Low-Spender: Cách Đọc Bảng Số Liệu Để Lập Ngân Sách (Reverse Breakpoint Budgeting)",
        en: "2. F2P & Low-Spender Strategy: Reverse Breakpoint Budgeting Across All 3 Factions",
      },
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            {
              vi: "Nguyên tắc 'Tính Ngược Từ Điểm Gãy' (Reverse Breakpoint Budgeting): Trước mỗi kỳ Tuần B (Arms Race), hãy mở bảng số liệu kiểm tra số dư hiện tại trong Túi đồ. Ví dụ: muốn nâng một tướng từ 0 lên 1 Sao Trắng (280 Mảnh Vàng / 560 Mảnh Đỏ) hoặc nâng bộ đồ của Carry chính từ +20 lên +30 (cần 234,000 Quặng = 58,500 × 4 cho 4 món). Nếu trong túi mới có 150,000 Quặng, người chơi biết chắc mình chỉ đủ nâng trước Kiếm + Giày lên +30 (117,000 Quặng) và cần cày thêm 84,000 Quặng nữa để kéo nốt Mũ + Giáp kích hoạt hào quang +30.",
              en: "The 'Reverse Breakpoint Budgeting' Rule: Before every Week B (Arms Race), open the master tables and audit your current Bag inventory. For example, pushing a hero from 0 to 1★ White requires 280 Legendary / 560 Mythic Shards, and pushing a main Carry's 4-piece gear set from +20 to +30 requires 234,000 Ore (58,500 × 4). If your Bag holds 150,000 Ore, you know immediately that you can upgrade Sword + Boots to +30 first (117,000 Ore) and need to farm 84,000 more Ore to finish Helmet + Armor and trigger the +30 Enhancement Master aura.",
            },
            {
              vi: "Áp dụng Toán học Thức Tỉnh cho Cả 3 Phe Phái (League / Horde / Nature): Khi nhìn vào Bảng 1.2 (Thức Tỉnh Tướng Vàng = 9 Hồn Đá Đỏ + 345–385 Mảnh), người chơi F2P sẽ hiểu ngay bằng toán học tại sao Lộ trình Đội hình 5-Mythic Bộ Lạc (Desert Prince, Beastmaster, Wukong, Storm Maiden, Witch + 1 tướng Vàng Soulmancer/Warlock) chỉ cần duy nhất 9 Hồn Đá Đỏ, trong khi đội hình Liên Minh hoặc Thiên Nhiên sử dụng 2–3 tướng Vàng (Adjudicator, Pyromancer, Nun, Sage, Pixie) lại ngốn tới 18 – 27 Hồn Đá Đỏ!",
              en: "Applying Awakening Math Across All 3 Factions (League / Horde / Nature): Looking at Table 1.2 (Awakening 1 Legendary Hero = 9 Soul Stones + 345–385 Shards), F2P commanders can mathematically see why the 5-Mythic Horde lineup (Desert Prince, Beastmaster, Wukong, Storm Maiden, Witch + 1 Legendary Soulmancer/Warlock) requires only 9 Soul Stones total, whereas League or Nature lineups fielding 2–3 Legendary heroes (Adjudicator, Pyromancer, Nun, Sage, Pixie) consume 18 – 27 Soul Stones!",
            },
          ],
        },
        {
          type: "checklist",
          checklistId: "master-tables-reverse-budget-audit-v2",
          title: {
            vi: "Checklist Kiểm Toán Ngân Sách Điểm Gãy Trước Kỳ Sự Kiện (Reverse Breakpoint Audit)",
            en: "Pre-Event Reverse Breakpoint Budgeting Audit Checklist",
          },
          description: {
            vi: "Rà soát đủ 4 hạng mục định lượng dưới đây trước khi bấm xả nguyên liệu vào mỗi kỳ Đua Vũ Trang (Arms Race) hoặc KvK.",
            en: "Verify all 4 quantitative checkpoints below before disbursing hoarded materials during Arms Race or KvK.",
          },
          items: [
            {
              id: "audit-hero-shards-and-books",
              label: {
                vi: "Kiểm tra ngưỡng Mảnh Tướng (280 / 560 mảnh = 1★ Trắng; 300 / 600 mảnh = 2★ Trắng) & Sách Kỹ Năng (8,000 = Lv.10; 24,700 = Lv.15)",
                en: "Verify Hero Shard thresholds (280 / 560 shards = 1★ White; 300 / 600 shards = 2★ White) & Skill Books (8,000 = Lv.10; 24,700 = Lv.15)",
              },
              detail: {
                vi: "Chỉ xả Mảnh Tướng Vạn Năng khi đủ chạm mốc mở khóa kỹ năng/Thức tỉnh (1★ hoặc 2★ Trắng) vào Thứ Năm Tuần B.",
                en: "Only spend Universal Hero Shards when you can cross a full 1★ or 2★ White breakpoint on Week B Thursday.",
              },
              badge: {
                vi: "Thứ Năm Tuần B",
                en: "Week B Thursday",
              },
            },
            {
              id: "audit-gear-ore-and-lord-gear",
              label: {
                vi: "Kiểm tra Quặng Cường Hóa theo lô 4 món (84K = +10 | 240K = +20 | 474K = +30 | 780K = +40) & Đồ Chúa Tể Nhánh Phải",
                en: "Audit Enhancement Ore in 4-piece batches (84K = +10 | 240K = +20 | 474K = +30 | 780K = +40) & Right-Branch Lord Gear",
              },
              detail: {
                vi: "Tuyệt đối không cường hóa lệch cấp khiến 4 món của tướng dừng ở +14/+17; ưu tiên nâng 3 món Nhánh Phải của Đồ Chúa Tể (+Hero ATK / +Soldier ATK).",
                en: "Never leave a hero's 4 gear pieces unevenly at +14/+17; prioritize the 3 Right-Branch Lord Gear pieces (+Hero ATK / +Soldier ATK).",
              },
              badge: {
                vi: "Thứ Tư Tuần B",
                en: "Week B Wednesday",
              },
            },
            {
              id: "audit-runes-pets-and-skins",
              label: {
                vi: "Kiểm tra Điểm gãy Cổ Ngữ (Lv.5 +5% & Lv.8 +5% All), Phôi Thú Cưng (Lv.10/20/60/75/90) & Quân Trang (Lv.10 = 80,400 / 40,200 / 20,100 Medals)",
                en: "Check Rune Breakpoints (Lv.5 +5% & Lv.8 +5% All), Pet Copies (Lv.10/20/60/75/90) & Troop Skins (Lv.10 = 80,400 / 40,200 / 20,100 Medals)",
              },
              detail: {
                vi: "Đẩy Cổ Ngữ dứt điểm lên Lv.5/Lv.8 vào Thứ Ba Tuần B và nâng Quân Trang theo bậc thang Lv.10 ➔ Lv.20 để gom Owned Passive Bonus.",
                en: "Push Runes cleanly to Lv.5/Lv.8 on Week B Tuesday and upgrade Troop Skins in a Lv.10 ➔ Lv.20 staircase to stack Owned Passive Bonuses.",
              },
              badge: {
                vi: "Thứ Ba & Thứ Sáu",
                en: "Tuesday & Friday",
              },
            },
            {
              id: "audit-meat-reserve-faction-level",
              label: {
                vi: "Bảo toàn Quỹ Dự Trữ Thịt (1,181.162M Thịt + 1,307 Mảnh) cho 4 mốc Hào Quang Cấp Phe Phái (Lv.10 / Lv.20 / Lv.30 / Lv.40 = +20.00% Queue HP)",
                en: "Protect the Meat Reserve (1,181.162M Meat + 1,307 Shards) for the 4 Faction Level Aura Milestones (Lv.10 / Lv.20 / Lv.30 / Lv.40 = +20.00% Queue HP)",
              },
              detail: {
                vi: "Không đốt cạn Rương Thịt trong túi đồ vào các việc vụn vặt trước khi chạm các mốc +5.00% Queue HP ở Faction Level 10, 20, 30 và 40.",
                en: "Never burn your Bag Meat chests on trivial tasks before locking in the +5.00% Queue HP milestones at Faction Levels 10, 20, 30, and 40.",
              },
              badge: {
                vi: "Quỹ Dự Trữ Thịt",
                en: "Meat Reserve",
              },
            },
          ],
        },
      ],
    },
    {
      id: "sec-3-master-tables-common-pitfalls",
      title: {
        vi: "3. Những Cạm bẫy Phổ biến Khi Quản Trị Số Liệu (Common Pitfalls)",
        en: "3. Common Quantitative Budgeting Pitfalls",
      },
      blocks: [
        {
          type: "table",
          caption: {
            vi: "Bảng 3.1: Hai Cạm Bẫy Phổ Biến Khi Quản Trị Số Liệu & Giải Pháp Min-Max",
            en: "Table 3.1: Two Common Quantitative Budgeting Pitfalls & Min-Max Solutions",
          },
          headers: [
            { vi: "❌ Sai lầm Phổ biến (Account Traps)", en: "❌ Common Account Traps" },
            { vi: "✅ Giải pháp Tối ưu (Min-Max Solution)", en: "✅ Min-Max Solution" },
          ],
          rows: [
            [
              {
                vi: "Đập nguyên liệu theo cảm hứng 'có bao nhiêu bấm bấy nhiêu': Dẫn đến việc cả 6 tướng đều dừng ở mức trang bị +14, +17 hoặc Cổ Ngữ Lv.4, Quân Trang Lv.16, không kích hoạt được bất kỳ dòng thưởng % cộng hưởng nào.",
                en: "Impulse-upgrading 'whenever materials appear': Leaves all 6 heroes stuck at +14 or +17 gear, Lv.4 Runes, or Lv.16 Troop Skins without activating a single percentage resonance bonus.",
              },
              {
                vi: "Nâng Dứt Điểm Theo Lô (Batch Breakpoint Upgrading): Luôn gom đủ nguyên liệu để đẩy trọn vẹn 1 mốc điểm gãy (Full +20, Rune Lv.5, Troop Skin Lv.10/20, Faction Lv.10/20/30/40) rồi mới chuyển sang mục tiêu tiếp theo.",
                en: "Batch Breakpoint Upgrading: Always hoard until you can complete an entire breakpoint batch (Full +20 gear set, Rune Lv.5, Troop Skin Lv.10/20, Faction Lv.10/20/30/40) before moving to the next target.",
              },
            ],
            [
              {
                vi: "Quên tính lượng Thịt (Meat) khổng lồ của Cấp Độ Phe Phái (Faction Level): Tiêu sạch Thịt vào các việc vụn vặt rồi bị kẹt cứng khi nâng Faction Level từ Lv.20 ➔ Lv.40 (ngốn tổng cộng 1,181.162M Thịt / hơn 1.18 Tỷ Thịt!).",
                en: "Ignoring the massive Meat wall of Faction Levels: Draining Meat on minor upgrades and getting hard-stuck pushing Faction Level Lv.20 ➔ Lv.40 (which consumes 1,181.162M Meat / over 1.18 Billion Meat total!).",
              },
              {
                vi: "Quỹ Dự Trữ Thịt & Mảnh Dư: Luôn tích trữ các rương Thịt lớn trong túi đồ và đổi thêm Thịt trong Tiệm Đổi Quà để phục vụ các mốc +5.00% Queue HP ở Faction Level 10 / 20 / 30 / 40 (tổng +20.00% Queue HP).",
                en: "Dedicated Meat & Excess Shard Reserve: Keep large Meat chests sealed in your Bag and buy discounted Meat in the Exchange Shop specifically for the +5.00% Queue HP milestones at Faction Levels 10 / 20 / 30 / 40 (+20.00% Queue HP total).",
              },
            ],
          ],
        },
      ],
    },
  ],
  proSections: [
    {
      id: "sec-4-seven-master-quantitative-tables",
      isPro: true,
      title: {
        vi: "4. Bộ 7 Bảng Cơ Sở Dữ Liệu Định Lượng Toàn Tập (The 7 Master Quantitative Tables — Single Source of Truth)",
        en: "4. The 7 Master Quantitative Datasets (TopHeroes Tables - Max — Single Source of Truth)",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "Dưới đây là Bộ 7 Bảng Cơ Sở Dữ Liệu Định Lượng Toàn Tập (The 7 Master Quantitative Datasets) được bóc tách và chuẩn hóa 100% từ kho dữ liệu gốc TopHeroes Tables - Max, đóng vai trò là Single Source of Truth cho toàn bộ lộ trình đầu tư Mid-game và Endgame:",
            en: "Below are the 7 Master Quantitative Datasets extracted and 100% standardized from the TopHeroes Tables - Max repository, serving as the Single Source of Truth for all mid-game and endgame investment planning:",
          },
        },
        {
          type: "visual_diagram",
          mediaCode: "MED-8.4-01",
          variant: "hub_pillars",
          title: {
            vi: "📊 TRUNG TÂM DỮ LIỆU ĐỊNH LƯỢNG GỐC (MASTER DATA TABLES — SINGLE SOURCE OF TRUTH)",
            en: "📊 MASTER QUANTITATIVE DATA HUB (SINGLE SOURCE OF TRUTH — 12 STANDARDIZED TABLES)",
          },
          subtitle: {
            vi: "Kiến trúc kết nối 4 Bảng Tóm tắt Sinh tồn Free Tier và 7 Bảng Cơ sở Dữ liệu Định lượng PRO",
            en: "Architectural overview connecting the 4 Free-Tier Survival Tables and 7 PRO Master Quantitative Datasets",
          },
          centerNode: {
            id: "node-master-tables-ssot-hub",
            badge: { vi: "12 BẢNG SSoT", en: "12 SSoT TABLES" },
            title: {
              vi: "📊 MASTER DATA TABLES HUB (SINGLE SOURCE OF TRUTH)",
              en: "📊 MASTER DATA TABLES HUB (SINGLE SOURCE OF TRUTH)",
            },
            subtitle: {
              vi: "Tính Ngược Từ Điểm Gãy (Reverse Breakpoint Budgeting) trước mỗi kỳ Arms Race & KvK",
              en: "Reverse Breakpoint Budgeting before every Arms Race & KvK cycle",
            },
            tone: "gold",
          },
          branches: [
            {
              title: {
                vi: "Trụ Cột 1: 4 Bảng Tóm Tắt Sinh Tồn Free Tier (Tables 1.1 ➔ 1.4)",
                en: "Pillar 1: 4 Free-Tier Survival Quick-Reference Tables (Tables 1.1 ➔ 1.4)",
              },
              badge: { vi: "FREE TIER CORE", en: "FREE TIER CORE" },
              tone: "emerald",
              steps: [
                {
                  id: "step-84-pillar1-stars-awakening",
                  title: {
                    vi: "Nâng Sao Tướng (500 / 1,000 Mảnh), Sách Kỹ Năng (24,700) & Thức Tỉnh (9 Hồn Đá Đỏ)",
                    en: "Hero Stars (500 / 1,000 Shards), Skill Books (24,700) & Awakening (9 Soul Stones)",
                  },
                  subtitle: {
                    vi: "Điểm gãy Vàng 1★ Trắng (280/560 mảnh = +30% kỹ năng) & 2★ Trắng (300/600 mảnh); Thức tỉnh tốn 9 Soul Stones + 345–385 mảnh",
                    en: "1★ White (280/560 shards = +30% skill) & 2★ White (300/600 shards) breakpoints; Awakening costs 9 Soul Stones + 345–385 shards",
                  },
                  tone: "emerald",
                },
                {
                  id: "step-84-pillar1-gear-troops",
                  title: {
                    vi: "Bậc Thầy Cường Hóa (+10/+20/+30/+40 = 780,000 Quặng/bộ) & Bậc Lính T5–T11",
                    en: "Enhancement Master (+10/+20/+30/+40 = 780,000 Ore/set) & Troop Tiers T5–T11",
                  },
                  subtitle: {
                    vi: "195,000 Quặng/món (+40) = 4,680,000 Quặng/Đội 1; Lâu Đài Lv.35 mở Lính T10, Viện Huy Hoàng Lv.15 mở Lính T11 (5,422 DE)",
                    en: "195,000 Ore/piece (+40) = 4,680,000 Ore/Queue 1; Castle Lv.35 unlocks T10, Brilliance Institute Lv.15 unlocks T11 (5,422 DE)",
                  },
                  tone: "emerald",
                },
              ],
              outcome: {
                vi: "Giải quyết 80% bài toán phân bổ tài nguyên nền tảng của Đội hình 1 trong 10 giây tra cứu",
                en: "Solves 80% of Queue 1's foundational resource allocation decisions in a 10-second lookup",
              },
            },
            {
              title: {
                vi: "Trụ Cột 2: Cấp Phe Phái, Đột Phá Đồ Đỏ, Vũ Khí Độc Quyền, Đồ Chúa Tể & Cổ Ngữ (Tables 4.1 ➔ 4.4)",
                en: "Pillar 2: Faction Levels, Mythic Gear, Exclusive Weapons, Lord Gear & Runes (Tables 4.1 ➔ 4.4)",
              },
              badge: { vi: "PRO DATASETS 1–4", en: "PRO DATASETS 1–4" },
              tone: "gold",
              steps: [
                {
                  id: "step-84-pillar2-faction-mythic",
                  title: {
                    vi: "Cấp Phe Phái Lv.1–80 (1,181.162M Thịt & +20.00% Queue HP) & Đồ Đỏ 1★–5★ (6,000 Thỏi Vàng)",
                    en: "Faction Levels 1–80 (1,181.162M Meat & +20.00% Queue HP) & Mythic Gear 1★–5★ (6,000 Ingots)",
                  },
                  subtitle: {
                    vi: "Faction Lv.1–40 cần 1,307 Mảnh (+4,908 ATK, +96,200 HP); UW Lv.1–20 cần 1,185 mảnh & 920 Meteoric Iron Cores",
                    en: "Faction Lv.1–40 takes 1,307 Shards (+4,908 ATK, +96,200 HP); UW Lv.1–20 takes 1,185 shards & 920 Meteoric Iron Cores",
                  },
                  tone: "gold",
                },
                {
                  id: "step-84-pillar2-lord-runes",
                  title: {
                    vi: "Đồ Chúa Tể (958,800 Đá Xanh + 9,955 Dây Gai) & Cổ Ngữ Lv.1–12 (Điểm gãy Lv.5 & Lv.8)",
                    en: "Lord Gear (958,800 Refined Metal + 9,955 Thread) & Runes Lv.1–12 (Lv.5 & Lv.8 Breakpoints)",
                  },
                  subtitle: {
                    vi: "Lord Gear thêm 2,030 Bản Vẽ + 101 Máu Rồng; Runes Lv.5 mở +5% Hero & +30/+50 March, Lv.8 mở +5% All Soldiers",
                    en: "Lord Gear adds 2,030 Orichalcum + 101 Dragon Blood; Runes Lv.5 unlocks +5% Hero & +30/+50 March, Lv.8 unlocks +5% All Soldiers",
                  },
                  tone: "gold",
                },
              ],
              outcome: {
                vi: "Kiểm soát chính xác từng điểm gãy cộng hưởng phần trăm của Trang bị, Vũ khí, Chúa tể và Cổ ngữ",
                en: "Pinpoints every percentage resonance breakpoint across Hero Gear, Exclusive Weapons, Lord Gear, and Runes",
              },
            },
            {
              title: {
                vi: "Trụ Cột 3: Thú Cưng Lv.1–120, Quân Trang Lv.1–50 (+Honor 150) & VIP 1–20 (Tables 4.5 ➔ 4.7)",
                en: "Pillar 3: Pets Lv.1–120, Troop Skins Lv.1–50 (+Honor 150) & VIP 1–20 (Tables 4.5 ➔ 4.7)",
              },
              badge: { vi: "PRO DATASETS 5–7", en: "PRO DATASETS 5–7" },
              tone: "emerald",
              steps: [
                {
                  id: "step-84-pillar3-pets-skins",
                  title: {
                    vi: "Thú Cưng Lv.1–120 (596,600 / 714,000 Food) & Quân Trang Tỷ Lệ 4:2:1 (28,345,400 Medals)",
                    en: "Pets Lv.1–120 (596,600 / 714,000 Food) & 4:2:1 Troop Skins (28,345,400 Medals)",
                  },
                  subtitle: {
                    vi: "Pet Lv.90 đạt 96.00% Conversion (+81.60% ATK / +120.00% HP); Troop Skin Lv.10 tốn 80,400 / 40,200 / 20,100 Medals",
                    en: "Pet Lv.90 hits 96.00% Conversion (+81.60% ATK / +120.00% HP); Troop Skin Lv.10 costs 80,400 / 40,200 / 20,100 Medals",
                  },
                  tone: "emerald",
                },
                {
                  id: "step-84-pillar3-vip-matrix",
                  title: {
                    vi: "Bảng Quy Đổi Điểm & Chi Phí Đặc Quyền VIP 1 ➔ VIP 20 (1 USD = 6 Điểm VIP)",
                    en: "VIP 1 ➔ VIP 20 Points, USD Conversion & Strategic Perks Matrix ($1.00 = 6 VIP Points)",
                  },
                  subtitle: {
                    vi: "VIP 4 ($50.00 / 300 Điểm), VIP 8 ($1,000.00 / 6,000 Điểm), VIP 10 ($5,000.00), VIP 15 ($33,670.00) ➔ VIP 20 ($500,000.00 / 3,000,000 Điểm)",
                    en: "VIP 4 ($50.00 / 300 Pts), VIP 8 ($1,000.00 / 6,000 Pts), VIP 10 ($5,000.00), VIP 15 ($33,670.00) ➔ VIP 20 ($500,000.00 / 3,000,000 Pts)",
                  },
                  tone: "emerald",
                },
              ],
              outcome: {
                vi: "Tối đa hóa chỉ số cộng dồn toàn cục (Owned Passive) và hiệu suất đầu tư dài hạn trên mọi hệ thống",
                en: "Maximizes global Owned Passive stacking and long-term investment efficiency across every power system",
              },
            },
          ],
          footnote: {
            vi: "Nguồn trích xuất chuẩn hóa 100%: TopHeroes Tables - Max (Tabs: Faction lvl, ⚔️Gear, Аркуш23, 🀄️Runes, 🐣Pets, 💂‍♀️Troop Skins, VIP cost USD).",
            en: "100% standardized source extraction: TopHeroes Tables - Max (Tabs: Faction lvl, ⚔️Gear, Аркуш23, 🀄️Runes, 🐣Pets, 💂‍♀️Troop Skins, VIP cost USD).",
          },
        },
      ],
      subSections: [
        {
          id: "sub-4-1-faction-level-table",
          title: {
            vi: "4.1. Bảng 1: Cấp Độ Nghiên Cứu Phe Phái (Faction Level 1 ➔ 80 — Tab Faction lvl)",
            en: "4.1. Table 1: Faction Research Levels (Faction Level 1 ➔ 80 — Tab Faction lvl)",
          },
          blocks: [
            {
              type: "paragraph",
              text: {
                vi: "Cứ mỗi 10 cấp độ Phe Phái (Lv.10, Lv.20, Lv.30, Lv.40), đội hình sẽ kích hoạt hào quang cao cấp +5.00% Máu Toàn Đội Hình (Queue HP — Premium Faction Aura), đạt tổng cộng +20.00% Queue HP tại mốc Lv.40 (tiêu tốn tổng cộng 1,181.162M Thịt và 1,307 Mảnh tướng):",
                en: "Every 10 Faction Levels (Lv.10, Lv.20, Lv.30, Lv.40), your lineup unlocks a premium +5.00% Queue HP Faction Aura, reaching a cumulative +20.00% Queue HP at Lv.40 (consuming a total of 1,181.162M Meat and 1,307 Hero Shards):",
              },
            },
            {
              type: "table",
              caption: {
                vi: "Bảng 4.1: Cấp Độ Nghiên Cứu Phe Phái (Faction Level 1 ➔ 80 — Tổng Lv.1–40 = 1,181.162M Thịt & 1,307 Mảnh)",
                en: "Table 4.1: Faction Research Levels (Faction Level 1 ➔ 80 — Lv.1–40 Total = 1,181.162M Meat & 1,307 Shards)",
              },
              headers: [
                { vi: "Cấp Phe Phái (Faction Level)", en: "Faction Level" },
                { vi: "Số Thanh (Bars)", en: "Bars" },
                { vi: "Thịt / Thanh (Triệu M)", en: "Meat / Bar (Million M)" },
                { vi: "Tổng Thịt Cấp Này (Triệu M)", en: "Level Total Meat (Million M)" },
                { vi: "Mảnh Tướng Cần (Shards)", en: "Required Hero Shards" },
                { vi: "Công Tướng Cộng Thêm (Hero ATK / Cấp)", en: "Bonus Hero ATK / Level" },
                { vi: "Máu Tướng Cộng Thêm (Hero HP / Cấp)", en: "Bonus Hero HP / Level" },
                { vi: "Hào Quang Đặc Biệt (Queue HP Aura)", en: "Special Queue HP Aura" },
              ],
              rows: [
                [
                  { vi: "Lv.1", en: "Lv.1" },
                  { vi: "1", en: "1" },
                  { vi: "0.700M", en: "0.700M" },
                  { vi: "0.700M", en: "0.700M" },
                  { vi: "1", en: "1" },
                  { vi: "+8", en: "+8" },
                  { vi: "+200", en: "+200" },
                  { vi: "—", en: "—" },
                ],
                [
                  { vi: "Lv.2", en: "Lv.2" },
                  { vi: "1", en: "1" },
                  { vi: "0.702M", en: "0.702M" },
                  { vi: "0.702M", en: "0.702M" },
                  { vi: "2", en: "2" },
                  { vi: "+8", en: "+8" },
                  { vi: "+200", en: "+200" },
                  { vi: "—", en: "—" },
                ],
                [
                  { vi: "Lv.3 – Lv.4", en: "Lv.3 – Lv.4" },
                  { vi: "2 / cấp", en: "2 / lvl" },
                  { vi: "0.705M – 0.709M", en: "0.705M – 0.709M" },
                  { vi: "1.410M – 1.418M", en: "1.410M – 1.418M" },
                  { vi: "4 ➔ 8", en: "4 ➔ 8" },
                  { vi: "+16 / cấp", en: "+16 / lvl" },
                  { vi: "+400 / cấp", en: "+400 / lvl" },
                  { vi: "—", en: "—" },
                ],
                [
                  { vi: "Lv.5", en: "Lv.5" },
                  { vi: "3", en: "3" },
                  { vi: "0.718M", en: "0.718M" },
                  { vi: "2.154M", en: "2.154M" },
                  { vi: "4", en: "4" },
                  { vi: "+24", en: "+24" },
                  { vi: "+600", en: "+600" },
                  { vi: "—", en: "—" },
                ],
                [
                  { vi: "Lv.6 – Lv.8", en: "Lv.6 – Lv.8" },
                  { vi: "5 / cấp", en: "5 / lvl" },
                  { vi: "0.722M – 0.742M", en: "0.722M – 0.742M" },
                  { vi: "3.610M – 3.710M", en: "3.610M – 3.710M" },
                  { vi: "8 ➔ 8 ➔ 12", en: "8 ➔ 8 ➔ 12" },
                  { vi: "+40 / cấp", en: "+40 / lvl" },
                  { vi: "+1,000 / cấp", en: "+1,000 / lvl" },
                  { vi: "—", en: "—" },
                ],
                [
                  { vi: "Lv.9", en: "Lv.9" },
                  { vi: "7", en: "7" },
                  { vi: "0.754M", en: "0.754M" },
                  { vi: "5.278M", en: "5.278M" },
                  { vi: "12", en: "12" },
                  { vi: "+56", en: "+56" },
                  { vi: "+1,400", en: "+1,400" },
                  { vi: "—", en: "—" },
                ],
                [
                  { vi: "🔥 Lv.10 (Mốc 1)", en: "🔥 Lv.10 (Milestone 1)" },
                  { vi: "10", en: "10" },
                  { vi: "0.771M", en: "0.771M" },
                  { vi: "7.710M", en: "7.710M" },
                  { vi: "16", en: "16" },
                  { vi: "+100 (+10/bar)", en: "+100 (+10/bar)" },
                  { vi: "+0", en: "+0" },
                  { vi: "🌟 +5.00% Queue HP (Tổng +5%)", en: "🌟 +5.00% Queue HP (Total +5%)" },
                ],
                [
                  { vi: "Lv.11 – Lv.16", en: "Lv.11 – Lv.16" },
                  { vi: "10 / cấp", en: "10 / lvl" },
                  { vi: "0.791M – 0.978M", en: "0.791M – 0.978M" },
                  { vi: "7.910M – 9.780M", en: "7.910M – 9.780M" },
                  { vi: "16 ➔ 24", en: "16 ➔ 24" },
                  { vi: "+100 / cấp", en: "+100 / lvl" },
                  { vi: "+0", en: "+0" },
                  { vi: "—", en: "—" },
                ],
                [
                  { vi: "Lv.17 – Lv.19", en: "Lv.17 – Lv.19" },
                  { vi: "12 / cấp", en: "12 / lvl" },
                  { vi: "1.024M – 1.128M", en: "1.024M – 1.128M" },
                  { vi: "12.288M – 13.536M", en: "12.288M – 13.536M" },
                  { vi: "24 / cấp", en: "24 / lvl" },
                  { vi: "+120 / cấp", en: "+120 / lvl" },
                  { vi: "+0", en: "+0" },
                  { vi: "—", en: "—" },
                ],
                [
                  { vi: "🔥 Lv.20 (Mốc 2)", en: "🔥 Lv.20 (Milestone 2)" },
                  { vi: "12", en: "12" },
                  { vi: "1.222M", en: "1.222M" },
                  { vi: "14.664M", en: "14.664M" },
                  { vi: "30", en: "30" },
                  { vi: "+144 (+12/bar)", en: "+144 (+12/bar)" },
                  { vi: "+3,600 (+300/bar)", en: "+3,600 (+300/bar)" },
                  { vi: "🌟 +5.00% Queue HP (Tổng +10%)", en: "🌟 +5.00% Queue HP (Total +10%)" },
                ],
                [
                  { vi: "Lv.21 – Lv.24", en: "Lv.21 – Lv.24" },
                  { vi: "12 / cấp", en: "12 / lvl" },
                  { vi: "1.318M – 1.606M", en: "1.318M – 1.606M" },
                  { vi: "15.816M – 19.272M", en: "15.816M – 19.272M" },
                  { vi: "30 / cấp", en: "30 / lvl" },
                  { vi: "+144 / cấp", en: "+144 / lvl" },
                  { vi: "+3,600 / cấp", en: "+3,600 / lvl" },
                  { vi: "—", en: "—" },
                ],
                [
                  { vi: "Lv.25 – Lv.29", en: "Lv.25 – Lv.29" },
                  { vi: "12 / cấp", en: "12 / lvl" },
                  { vi: "1.703M – 2.093M", en: "1.703M – 2.093M" },
                  { vi: "20.436M – 25.116M", en: "20.436M – 25.116M" },
                  { vi: "40 / cấp", en: "40 / lvl" },
                  { vi: "+144 / cấp", en: "+144 / lvl" },
                  { vi: "+3,600 / cấp", en: "+3,600 / lvl" },
                  { vi: "—", en: "—" },
                ],
                [
                  { vi: "🔥 Lv.30 (Mốc 3)", en: "🔥 Lv.30 (Milestone 3)" },
                  { vi: "12", en: "12" },
                  { vi: "2.214M", en: "2.214M" },
                  { vi: "26.568M", en: "26.568M" },
                  { vi: "50", en: "50" },
                  { vi: "+216 (+18/bar)", en: "+216 (+18/bar)" },
                  { vi: "+5,400 (+450/bar)", en: "+5,400 (+450/bar)" },
                  { vi: "🌟 +5.00% Queue HP (Tổng +15%)", en: "🌟 +5.00% Queue HP (Total +15%)" },
                ],
                [
                  { vi: "Lv.31 – Lv.34", en: "Lv.31 – Lv.34" },
                  { vi: "12 / cấp", en: "12 / lvl" },
                  { vi: "2.333M – 2.695M", en: "2.333M – 2.695M" },
                  { vi: "27.996M – 32.340M", en: "27.996M – 32.340M" },
                  { vi: "50 / cấp", en: "50 / lvl" },
                  { vi: "+216 / cấp", en: "+216 / lvl" },
                  { vi: "+5,400 / cấp", en: "+5,400 / lvl" },
                  { vi: "—", en: "—" },
                ],
                [
                  { vi: "Lv.35 – Lv.39", en: "Lv.35 – Lv.39" },
                  { vi: "12 / cấp", en: "12 / lvl" },
                  { vi: "2.815M – 3.295M", en: "2.815M – 3.295M" },
                  { vi: "33.780M – 39.540M", en: "33.780M – 39.540M" },
                  { vi: "60 / cấp", en: "60 / lvl" },
                  { vi: "+216 / cấp", en: "+216 / lvl" },
                  { vi: "+5,400 / cấp", en: "+5,400 / lvl" },
                  { vi: "—", en: "—" },
                ],
                [
                  { vi: "👑 Lv.40 (Mốc 4)", en: "👑 Lv.40 (Milestone 4)" },
                  { vi: "12", en: "12" },
                  { vi: "3.415M", en: "3.415M" },
                  { vi: "40.980M", en: "40.980M" },
                  { vi: "70", en: "70" },
                  { vi: "+0", en: "+0" },
                  { vi: "+0", en: "+0" },
                  { vi: "🌟 +5.00% Queue HP (Tổng +20%)", en: "🌟 +5.00% Queue HP (Total +20%)" },
                ],
                [
                  { vi: "Lv.41 – Lv.50", en: "Lv.41 – Lv.50" },
                  { vi: "12 / cấp", en: "12 / lvl" },
                  { vi: "3.535M – 4.615M", en: "3.535M – 4.615M" },
                  { vi: "42.420M – 55.380M", en: "42.420M – 55.380M" },
                  { vi: "70+", en: "70+" },
                  { vi: "Mở rộng S1+", en: "Season 1+ Expansion" },
                  { vi: "Mở rộng S1+", en: "Season 1+ Expansion" },
                  { vi: "(Mở khóa giới hạn đến Lv.80)", en: "(Cap expands up to Lv.80)" },
                ],
                [
                  { vi: "TỔNG CỘNG (Lv.1–40)", en: "TOTAL (Lv.1–40)" },
                  { vi: "—", en: "—" },
                  { vi: "—", en: "—" },
                  { vi: "1,181.162M Thịt", en: "1,181.162M Meat" },
                  { vi: "1,307 Mảnh", en: "1,307 Shards" },
                  { vi: "+4,908 Hero ATK", en: "+4,908 Hero ATK" },
                  { vi: "+96,200 Hero HP", en: "+96,200 Hero HP" },
                  { vi: "+20.00% Queue HP Toàn Đội", en: "+20.00% Full Queue HP" },
                ],
              ],
            },
          ],
        },
        {
          id: "sub-4-2-mythic-gear-and-uw-table",
          title: {
            vi: "4.2. Bảng 2: Chi Phí Đột Phá Đồ Thần Thoại (Gear Promotion 0 ➔ 5 Sao Đỏ) & Vũ Khí Độc Quyền (UW Lv.1 ➔ Lv.20)",
            en: "4.2. Table 2: Mythic Gear Star Promotion (1★ ➔ 5★ MYTHIC) & Exclusive Weapons (UW Lv.1 ➔ Lv.20)",
          },
          blocks: [
            {
              type: "paragraph",
              text: {
                vi: "Sau khi 1 món Trang bị Vàng đạt Lv.40 (tốn 195,000 Quặng), người chơi mở khóa tính năng Thăng Cấp Sao (Gear Star Promotion 1★ ➔ 5★) qua 5 nấc nhỏ mỗi sao để hóa Đỏ hoàn toàn (Mythic Gear 5★):",
                en: "Once a Legendary gear piece reaches Lv.40 (consuming 195,000 Ore), you unlock Gear Star Promotion (1★ ➔ 5★) across 5 sub-segments per star to ascend it into 5★ Mythic Gear:",
              },
            },
            {
              type: "table",
              caption: {
                vi: "Bảng 4.2: Chi Phí Đột Phá Đồ Thần Thoại (Gear Star Promotion 1★ ➔ 5★ MYTHIC = 6,000 Thỏi Vàng + 500K Quặng)",
                en: "Table 4.2: Mythic Gear Star Promotion Costs (1★ ➔ 5★ MYTHIC = 6,000 Solar Gold Ingots + 500K Ore)",
              },
              headers: [
                { vi: "Cấp Sao Đột Phá (Sau Lv.40)", en: "Promotion Star Tier (Post-Lv.40)" },
                { vi: "Chi Phí Mỗi Nấc Nhỏ (×5 Nấc / Sao)", en: "Cost per Sub-segment (×5 / Star)" },
                { vi: "Đá Thăng Cấp Ở Nấc Cuối (5/5)", en: "Promotion Stones at Final Step (5/5)" },
                { vi: "Tổng Nguyên Liệu Cho 1 Món Ở Cấp Sao Này", en: "Total Materials per Piece at This Star" },
                { vi: "Tổng Tích Lũy Từ Lv.40 (1 Món Đồ)", en: "Cumulative Total from Lv.40 (1 Piece)" },
                { vi: "Thuộc Tính Cộng Thêm & Biến Đổi Phẩm Chất", en: "Bonus Attributes & Quality Ascension" },
              ],
              rows: [
                [
                  { vi: "⭐ 1 Sao (1-Star)", en: "⭐ 1-Star (1★)" },
                  {
                    vi: "150 Thỏi Vàng + 12,500 Quặng + 750K Ruby (×4 nấc)",
                    en: "150 Gold Ingots + 12,500 Ore + 750K Rubies (×4 steps)",
                  },
                  {
                    vi: "+5 Đá Thăng Cấp Vàng (Legendary Stones)",
                    en: "+5 Legendary Promotion Stones",
                  },
                  {
                    vi: "750 Thỏi Vàng + 62,500 Quặng + 3.0M Ruby + 5 Đá Vàng",
                    en: "750 Gold Ingots + 62,500 Ore + 3.0M Rubies + 5 Legendary Stones",
                  },
                  {
                    vi: "750 Thỏi Vàng + 62.5K Quặng",
                    en: "750 Gold Ingots + 62.5K Ore",
                  },
                  {
                    vi: "Trang bị Vàng Lv.40 gắn 1★ Vàng",
                    en: "Lv.40 Legendary Gear with 1★ Yellow Star",
                  },
                ],
                [
                  { vi: "⭐⭐ 2 Sao (2-Star)", en: "⭐⭐ 2-Star (2★)" },
                  {
                    vi: "195 Thỏi Vàng + 16,250 Quặng + 975K Ruby (×4 nấc)",
                    en: "195 Gold Ingots + 16,250 Ore + 975K Rubies (×4 steps)",
                  },
                  {
                    vi: "+10 Đá Thăng Cấp Vàng (Legendary Stones)",
                    en: "+10 Legendary Promotion Stones",
                  },
                  {
                    vi: "975 Thỏi Vàng + 81,250 Quặng + 3.9M Ruby + 10 Đá Vàng",
                    en: "975 Gold Ingots + 81,250 Ore + 3.9M Rubies + 10 Legendary Stones",
                  },
                  {
                    vi: "1,725 Thỏi Vàng + 143.75K Quặng",
                    en: "1,725 Gold Ingots + 143.75K Ore",
                  },
                  {
                    vi: "Trang bị Vàng Lv.40 gắn 2★ Vàng",
                    en: "Lv.40 Legendary Gear with 2★ Yellow Stars",
                  },
                ],
                [
                  { vi: "⭐⭐⭐ 3 Sao (3-Star)", en: "⭐⭐⭐ 3-Star (3★)" },
                  {
                    vi: "240 Thỏi Vàng + 20,000 Quặng + 1.2M Ruby (×4 nấc)",
                    en: "240 Gold Ingots + 20,000 Ore + 1.2M Rubies (×4 steps)",
                  },
                  {
                    vi: "+15 Đá Thăng Cấp Vàng (Legendary Stones)",
                    en: "+15 Legendary Promotion Stones",
                  },
                  {
                    vi: "1,200 Thỏi Vàng + 100,000 Quặng + 4.8M Ruby + 15 Đá Vàng",
                    en: "1,200 Gold Ingots + 100,000 Ore + 4.8M Rubies + 15 Legendary Stones",
                  },
                  {
                    vi: "2,925 Thỏi Vàng + 243.75K Quặng",
                    en: "2,925 Gold Ingots + 243.75K Ore",
                  },
                  {
                    vi: "Trang bị Vàng Lv.40 gắn 3★ Vàng",
                    en: "Lv.40 Legendary Gear with 3★ Yellow Stars",
                  },
                ],
                [
                  { vi: "⭐⭐⭐⭐ 4 Sao (4-Star)", en: "⭐⭐⭐⭐ 4-Star (4★)" },
                  {
                    vi: "285 Thỏi Vàng + 23,750 Quặng + 1.42M Ruby (×4 nấc)",
                    en: "285 Gold Ingots + 23,750 Ore + 1.42M Rubies (×4 steps)",
                  },
                  {
                    vi: "+20 Đá Thăng Cấp Vàng (Legendary Stones)",
                    en: "+20 Legendary Promotion Stones",
                  },
                  {
                    vi: "1,425 Thỏi Vàng + 118,750 Quặng + 5.68M Ruby + 20 Đá Vàng",
                    en: "1,425 Gold Ingots + 118,750 Ore + 5.68M Rubies + 20 Legendary Stones",
                  },
                  {
                    vi: "4,350 Thỏi Vàng + 362.5K Quặng",
                    en: "4,350 Gold Ingots + 362.5K Ore",
                  },
                  {
                    vi: "Trang bị Vàng Lv.40 gắn 4★ Vàng",
                    en: "Lv.40 Legendary Gear with 4★ Yellow Stars",
                  },
                ],
                [
                  { vi: "🔥 5 Sao (5-Star MYTHIC)", en: "🔥 5-Star (5★ MYTHIC)" },
                  {
                    vi: "330 Thỏi Vàng + 27,500 Quặng + 1.65M Ruby (×4 nấc)",
                    en: "330 Gold Ingots + 27,500 Ore + 1.65M Rubies (×4 steps)",
                  },
                  {
                    vi: "+10 Đá Thăng Cấp Đỏ (Mythic Stones / Titan Marks)",
                    en: "+10 Mythic Promotion Stones (Titan Marks)",
                  },
                  {
                    vi: "1,650 Thỏi Vàng + 137,500 Quặng + 6.6M Ruby + 10 Đá Đỏ",
                    en: "1,650 Gold Ingots + 137,500 Ore + 6.6M Rubies + 10 Mythic Stones",
                  },
                  {
                    vi: "6,000 Thỏi Vàng + 500K Quặng + 50 Đá Vàng + 10 Đá Đỏ",
                    en: "6,000 Gold Ingots + 500K Ore + 50 Legendary Stones + 10 Mythic Stones",
                  },
                  {
                    vi: "HÓA ĐỎ HOÀN TOÀN (MYTHIC GEAR 5★)!",
                    en: "FULL MYTHIC ASCENSION (5★ MYTHIC GEAR)!",
                  },
                ],
              ],
            },
            {
              type: "paragraph",
              text: {
                vi: "🗡️ Bảng Chi phí Mảnh Vũ Khí Độc Quyền (Hero Exclusive Gear / UW Lv.1 ➔ Lv.20 — Tab ⚔️Gear): Lv.1: 5 mảnh (Tổng: 5) | Lv.2: 10 (15) | Lv.3: 15 (30) | Lv.4: 20 (50) | 🔥 Lv.5 (Mốc Kỹ năng 1): 25 (Tổng: 75 mảnh) | Lv.6: 30 (105) | Lv.7: 35 (140) | Lv.8: 40 (180) | Lv.9: 45 (225) | 🔥 Lv.10 (Mốc Kỹ năng 2): 50 (Tổng: 275 mảnh) | Lv.11: 55 (330) | Lv.12: 60 (390) | Lv.13: 65 (455) | Lv.14: 70 (525) | 🔥 Lv.15 (Mốc Kỹ năng 3): 80 (Tổng: 605 mảnh) | Lv.16: 90 (695) | Lv.17: 100 (795) | Lv.18: 110 (905) | Lv.19: 130 (1,035) | 👑 Lv.20 (Mốc Kỹ năng Tối đa): 150 (Tổng: 1,185 mảnh)! Đột phá Sao Vũ Khí Độc Quyền (Star Level 1★ ➔ 5★ bằng Lõi Sắt Thiên Thạch Meteoric Iron Cores): 1★: 65 | 2★: 135 (Tích lũy: 200) | 3★: 280 (480) | 4★: 240 (720) | 5★: 200 (Tổng cộng: 920 Lõi Sắt Thiên Thạch).",
                en: "🗡️ Exclusive Weapon Shard Costs (Hero Exclusive Gear / UW Lv.1 ➔ Lv.20 — Tab ⚔️Gear): Lv.1: 5 shards (Total: 5) | Lv.2: 10 (15) | Lv.3: 15 (30) | Lv.4: 20 (50) | 🔥 Lv.5 (Skill Milestone 1): 25 (Total: 75 shards) | Lv.6: 30 (105) | Lv.7: 35 (140) | Lv.8: 40 (180) | Lv.9: 45 (225) | 🔥 Lv.10 (Skill Milestone 2): 50 (Total: 275 shards) | Lv.11: 55 (330) | Lv.12: 60 (390) | Lv.13: 65 (455) | Lv.14: 70 (525) | 🔥 Lv.15 (Skill Milestone 3): 80 (Total: 605 shards) | Lv.16: 90 (695) | Lv.17: 100 (795) | Lv.18: 110 (905) | Lv.19: 130 (1,035) | 👑 Lv.20 (Max Skill Milestone): 150 (Total: 1,185 shards)! Exclusive Weapon Star Promotion (1★ ➔ 5★ using Meteoric Iron Cores): 1★: 65 | 2★: 135 (Cumulative: 200) | 3★: 280 (480) | 4★: 240 (720) | 5★: 200 (Grand Total: 920 Meteoric Iron Cores).",
              },
            },
          ],
        },
        {
          id: "sub-4-3-lord-gear-master-table",
          title: {
            vi: "4.3. Bảng 3: Chi Phí Toàn Trình Đồ Chúa Tể (Lord Gear BASE / G1 ➔ T4 ➔ Mythic T1 3★ — Tab Аркуш23)",
            en: "4.3. Table 3: Complete Lord Gear Progression Costs (Uncommon BASE ➔ T4 ➔ Mythic T1 3★ — Tab Аркуш23)",
          },
          blocks: [
            {
              type: "paragraph",
              text: {
                vi: "Trang bị Chúa Tể gồm 6 món chia làm 2 Nhánh: 3 Món Nhánh Trái (LEFT) cộng % HP Tướng Hệ (Faction Hero HP), % HP Lính Hệ (Faction Soldier HP) và % ATK Toàn Bộ Lính (All Soldiers Attack); 3 Món Nhánh Phải (RIGHT — Ưu tiên nâng trước cho đội hình sát thương) cộng % ATK Tướng Hệ (Faction Hero Attack), % ATK Lính Hệ (Faction Soldier Attack) và % HP Toàn Bộ Lính (All Soldiers HP).",
                en: "Lord Gear consists of 6 pieces split into 2 Branches: the 3 Left-Branch pieces (LEFT) grant Faction Hero HP %, Faction Soldier HP %, and All Soldiers Attack %; the 3 Right-Branch pieces (RIGHT — prioritized first for damage-focused lineups) grant Faction Hero Attack %, Faction Soldier Attack %, and All Soldiers HP %.",
              },
            },
            {
              type: "table",
              caption: {
                vi: "Bảng 4.3: Chi Phí Toàn Trình Đồ Chúa Tể (Uncommon BASE ➔ Mythic T1 3★ = 958,800 Đá Xanh + 9,955 Dây Gai + 2,030 Bản Vẽ + 101 Nguyên Liệu Đỏ)",
                en: "Table 4.3: Complete Lord Gear Progression (Uncommon BASE ➔ Mythic T1 3★ = 958,800 Refined Metal + 9,955 Magic Thread + 2,030 Orichalcum + 101 Dragon Blood)",
              },
              headers: [
                { vi: "Cấp Bậc Đồ Chúa Tể (Lord Gear Tier)", en: "Lord Gear Tier" },
                { vi: "Đá Xanh / Thép Tinh Luyện (Refined Metal)", en: "Refined Metal (Green Stone)" },
                { vi: "Dây Gai / Chỉ Phép (Magic Thread)", en: "Magic Thread" },
                { vi: "Bản Vẽ / Hợp Kim (Blueprints / Orichalcum)", en: "Blueprints / Orichalcum" },
                { vi: "Nguyên Liệu Đỏ / Máu Rồng (Mythic Material / Dragon Blood)", en: "Mythic Material / Dragon Blood" },
                { vi: "Chỉ Số Nhánh Trái (LEFT: Hero HP / Soldier HP / All ATK)", en: "Left Branch Stats (LEFT: Hero HP / Soldier HP / All ATK)" },
                { vi: "Chỉ Số Nhánh Phải (RIGHT: Hero ATK / Soldier ATK / All HP)", en: "Right Branch Stats (RIGHT: Hero ATK / Soldier ATK / All HP)" },
              ],
              rows: [
                [
                  { vi: "Khởi tạo (Uncommon BASE ➔ ⭐)", en: "Uncommon (BASE ➔ ⭐)" },
                  { vi: "1,500 ➔ 3,800", en: "1,500 ➔ 3,800" },
                  { vi: "20 ➔ 40", en: "20 ➔ 40" },
                  { vi: "—", en: "—" },
                  { vi: "—", en: "—" },
                  { vi: "—", en: "—" },
                  { vi: "+1.15% / +2.40% / +2.10%", en: "+1.15% / +2.40% / +2.10%" },
                ],
                [
                  { vi: "Hiếm (Rare BASE ➔ ⭐⭐⭐)", en: "Rare (BASE ➔ ⭐⭐⭐)" },
                  { vi: "4,000 ➔ 6,400 (đầu) & 1,300 ➔ 1,500/nấc", en: "4,000 ➔ 6,400 (initial) & 1,300 ➔ 1,500/step" },
                  { vi: "50 ➔ 60 (đầu) & 5/nấc", en: "50 ➔ 60 (initial) & 5/step" },
                  { vi: "10 / nấc (từ 1★)", en: "10 / step (from 1★)" },
                  { vi: "—", en: "—" },
                  {
                    vi: "+2.70% / +7.45% / +0.95% ➔ +4.75% / +13.05% / +1.65%",
                    en: "+2.70% / +7.45% / +0.95% ➔ +4.75% / +13.05% / +1.65%",
                  },
                  {
                    vi: "+1.35% / +2.80% / +2.50% ➔ +2.15% / +4.55% / +4.00%",
                    en: "+1.35% / +2.80% / +2.50% ➔ +2.15% / +4.55% / +4.00%",
                  },
                ],
                [
                  { vi: "Sử Thi (Epic BASE ➔ ⭐⭐⭐)", en: "Epic (BASE ➔ ⭐⭐⭐)" },
                  { vi: "1,300 ➔ 3,500 / nấc", en: "1,300 ➔ 3,500 / step" },
                  { vi: "5 ➔ 30 / nấc", en: "5 ➔ 30 / step" },
                  { vi: "12 ➔ 15 / nấc", en: "12 ➔ 15 / step" },
                  { vi: "—", en: "—" },
                  { vi: "Tăng tịnh tiến qua 12 tiểu cấp", en: "Progressive scaling across 12 sub-tiers" },
                  { vi: "Tăng tịnh tiến qua 12 tiểu cấp", en: "Progressive scaling across 12 sub-tiers" },
                ],
                [
                  { vi: "Huyền Thoại T1 (BASE ➔ ⭐⭐⭐)", en: "Legendary T1 (BASE ➔ ⭐⭐⭐)" },
                  { vi: "3,900 ➔ 5,400 / nấc", en: "3,900 ➔ 5,400 / step" },
                  { vi: "30 ➔ 45 / nấc", en: "30 ➔ 45 / step" },
                  { vi: "15 ➔ 20 / nấc", en: "15 ➔ 20 / step" },
                  { vi: "—", en: "—" },
                  {
                    vi: "(Đủ 6 món T1 Legendary mở ô Thứ 7 ở Tuần 3 Season 3)",
                    en: "(Full 6x T1 Legendary unlocks 7th slot in Season 3 Week 3)",
                  },
                  { vi: "—", en: "—" },
                ],
                [
                  { vi: "Huyền Thoại T2 (BASE ➔ ⭐⭐⭐)", en: "Legendary T2 (BASE ➔ ⭐⭐⭐)" },
                  { vi: "7,300 ➔ 8,500 / nấc", en: "7,300 ➔ 8,500 / step" },
                  { vi: "75 ➔ 85 / nấc", en: "75 ➔ 85 / step" },
                  { vi: "20 / nấc", en: "20 / step" },
                  { vi: "—", en: "—" },
                  {
                    vi: "(Đủ 6 món T2 Legendary mở Sacred Codex ở Tuần 4 Season 3)",
                    en: "(Full 6x T2 Legendary unlocks Sacred Codex in Season 3 Week 4)",
                  },
                  { vi: "—", en: "—" },
                ],
                [
                  { vi: "Huyền Thoại T3 (BASE ➔ ⭐⭐⭐)", en: "Legendary T3 (BASE ➔ ⭐⭐⭐)" },
                  { vi: "9,000 ➔ 10,000 / nấc", en: "9,000 ➔ 10,000 / step" },
                  { vi: "90 ➔ 95 / nấc", en: "90 ➔ 95 / step" },
                  { vi: "20 / nấc", en: "20 / step" },
                  { vi: "—", en: "—" },
                  {
                    vi: "+18.55% / +51.05% / +6.45% ➔ +21.50% / +59.05% / +7.45%",
                    en: "+18.55% / +51.05% / +6.45% ➔ +21.50% / +59.05% / +7.45%",
                  },
                  {
                    vi: "+9.30% / +19.35% / +17.00% ➔ +10.75% / +22.35% / +19.70%",
                    en: "+9.30% / +19.35% / +17.00% ➔ +10.75% / +22.35% / +19.70%",
                  },
                ],
                [
                  { vi: "Huyền Thoại T4 (BASE ➔ ⭐⭐⭐)", en: "Legendary T4 (BASE ➔ ⭐⭐⭐)" },
                  { vi: "13,000 ➔ 15,000 / nấc", en: "13,000 ➔ 15,000 / step" },
                  { vi: "130 ➔ 150 / nấc", en: "130 ➔ 150 / step" },
                  { vi: "20 ➔ 25 / nấc", en: "20 ➔ 25 / step" },
                  { vi: "2 (ở nấc đột phá cuối)", en: "2 (at final breakthrough step)" },
                  {
                    vi: "+24.00% / +65.95% / +8.35% ➔ +27.70% / +76.15% / +9.60%",
                    en: "+24.00% / +65.95% / +8.35% ➔ +27.70% / +76.15% / +9.60%",
                  },
                  {
                    vi: "+12.00% / +25.00% / +22.00% ➔ +12.90%+ / +26.90%+ / +23.70%+",
                    en: "+12.00% / +25.00% / +22.00% ➔ +12.90%+ / +26.90%+ / +23.70%+",
                  },
                ],
                [
                  { vi: "Thần Thoại (Mythic BASE ➔ ⭐⭐⭐)", en: "Mythic (BASE ➔ ⭐⭐⭐)" },
                  { vi: "13,000 ➔ 15,000 / nấc", en: "13,000 ➔ 15,000 / step" },
                  { vi: "140 ➔ 180 / nấc", en: "140 ➔ 180 / step" },
                  { vi: "20 ➔ 25 / nấc", en: "20 ➔ 25 / step" },
                  { vi: "2 ➔ 4 / nấc", en: "2 ➔ 4 / step" },
                  {
                    vi: "+31.75% / +87.30% / +11.00% ➔ +33.75% / +92.80% / +11.70%",
                    en: "+31.75% / +87.30% / +11.00% ➔ +33.75% / +92.80% / +11.70%",
                  },
                  {
                    vi: "+15.85% / +33.05% / +29.10% ➔ +16.85% / +35.15% / +30.95%",
                    en: "+15.85% / +33.05% / +29.10% ➔ +16.85% / +35.15% / +30.95%",
                  },
                ],
                [
                  { vi: "👑 Thần Thoại T1 (BASE ➔ ⭐⭐⭐)", en: "👑 Mythic T1 (BASE ➔ ⭐⭐⭐)" },
                  { vi: "14,000 ➔ 16,500 / nấc", en: "14,000 ➔ 16,500 / step" },
                  { vi: "160 ➔ 175 / nấc", en: "160 ➔ 175 / step" },
                  { vi: "28 ➔ 30 / nấc", en: "28 ➔ 30 / step" },
                  { vi: "3 ➔ 4 / nấc", en: "3 ➔ 4 / step" },
                  {
                    vi: "+37.30% / +102.50% / +12.95% (1★) ➔ +41.45% Hero HP / +113.95% Soldier HP / +14.40% All ATK (3★)",
                    en: "+37.30% / +102.50% / +12.95% (1★) ➔ +41.45% Hero HP / +113.95% Soldier HP / +14.40% All ATK (3★)",
                  },
                  {
                    vi: "+18.70% / +38.90% / +34.25% (1★) ➔ +20.75% Hero ATK / +43.15% Soldier ATK / +38.00% All HP (3★)",
                    en: "+18.70% / +38.90% / +34.25% (1★) ➔ +20.75% Hero ATK / +43.15% Soldier ATK / +38.00% All HP (3★)",
                  },
                ],
                [
                  { vi: "TỔNG CỘNG (Full 1 Món Kịch Trần)", en: "TOTAL (1 Maxed Piece)" },
                  { vi: "958,800 Đá Xanh", en: "958,800 Refined Metal" },
                  { vi: "9,955 Dây Gai", en: "9,955 Magic Thread" },
                  { vi: "2,030 Bản Vẽ", en: "2,030 Orichalcum" },
                  { vi: "101 Nguyên Liệu Đỏ", en: "101 Dragon Blood" },
                  { vi: "—", en: "—" },
                  { vi: "—", en: "—" },
                ],
              ],
            },
            {
              type: "media_spotlight",
              mediaCode: "MED-8.4-04",
              tier: "tier2_annotated_ui",
              title: {
                vi: "Đối Chiếu Nhánh Trái vs Nhánh Phải Đồ Chúa Tể (Lord Gear) & Tab Chỉ Số Sở Hữu Quân Trang (Owned Attributes)",
                en: "Lord Gear Left vs. Right Branch Comparison & Troop Skin Owned Attributes Interface",
              },
              description: {
                vi: "Ảnh chụp đối chiếu giao diện Nhánh Trái (+41.45% Hero HP / +113.95% Soldier HP / +14.40% All ATK) vs Nhánh Phải (+20.75% Hero ATK / +43.15% Soldier ATK / +38.00% All HP) của Đồ Chúa Tể và tab Owned Attributes (+14.38% ATK / +21.46% HP) của Quân trang.",
                en: "Side-by-side annotated view comparing Lord Gear Left Branch (+41.45% Hero HP / +113.95% Soldier HP / +14.40% All ATK) vs. Right Branch (+20.75% Hero ATK / +43.15% Soldier ATK / +38.00% All HP) alongside the Troop Skin Owned Attributes (+14.38% ATK / +21.46% HP) panel.",
              },
              annotations: [
                {
                  kind: "do",
                  label: {
                    vi: "Ưu tiên nâng 3 Món Nhánh Phải (RIGHT) của Đồ Chúa Tể trước cho Đội 1",
                    en: "Prioritize the 3 Right-Branch (RIGHT) Lord Gear Pieces First for Queue 1",
                  },
                  detail: {
                    vi: "3 món Nhánh Phải cộng trực tiếp % ATK Tướng Hệ (+20.75%), % ATK Lính Hệ (+43.15%) và % HP Toàn Bộ Lính (+38.00%), mang lại hiệu suất dồn sát thương cao hơn Nhánh Trái.",
                    en: "The 3 Right-Branch pieces directly boost Faction Hero ATK (+20.75%), Faction Soldier ATK (+43.15%), and All Soldiers HP (+38.00%), delivering higher burst value than the Left Branch.",
                  },
                },
                {
                  kind: "info",
                  label: {
                    vi: "Mốc Đồng Bộ 6 Món T1 Legendary & T2 Legendary Trong Season 3",
                    en: "6-Piece T1 Legendary & T2 Legendary Synchronization in Season 3",
                  },
                  detail: {
                    vi: "Đủ 6 món T1 Legendary mở khóa Ô Thứ 7 ở Tuần 3 Season 3; đủ 6 món T2 Legendary mở khóa Sacred Codex ở Tuần 4 Season 3.",
                    en: "Completing 6x T1 Legendary pieces unlocks the 7th slot in Season 3 Week 3; 6x T2 Legendary pieces unlock the Sacred Codex in Season 3 Week 4.",
                  },
                },
                {
                  kind: "do",
                  label: {
                    vi: "Nâng Quân Trang theo bậc thang Lv.10 ⭐ (80,400 / 40,200 / 20,100 Medals) để gom Owned Bonus",
                    en: "Staircase Troop Skins to Lv.10 ⭐ (80,400 / 40,200 / 20,100 Medals) to Stack Owned Bonuses",
                  },
                  detail: {
                    vi: "Mọi Quân trang mở khóa đều cộng dồn vĩnh viễn dòng Owned Bonus (+14.38% ATK / +21.46% HP ở Skin Vàng max, +11.49% ATK / +19.24% HP ở Skin Tím max) cho cả 3 đội hình.",
                    en: "Every unlocked Troop Skin permanently stacks its Owned Bonus (+14.38% ATK / +21.46% HP for maxed Legendary, +11.49% ATK / +19.24% HP for maxed Epic) across all 3 queues.",
                  },
                },
              ],
            },
          ],
        },
        {
          id: "sub-4-4-runes-master-table",
          title: {
            vi: "4.4. Bảng 4: Hệ Thống Cổ Ngữ (Runes Lv.1 ➔ Lv.12 — Trọng tâm Điểm gãy Lv.5 & Lv.8)",
            en: "4.4. Table 4: Rune System Progression (Runes Lv.1 ➔ Lv.12 — Lv.5 & Lv.8 Breakpoints)",
          },
          blocks: [
            {
              type: "paragraph",
              text: {
                vi: "Trích xuất chính xác 100% từ TopHeroes Tables - Max (Tab 🀄️Runes): Điểm gãy Số 1 (Lv.5) mở khóa dòng +5% HP/ATK Tướng và +30 / +50 Quy mô Hành quân (March Size); Điểm gãy Số 2 (Lv.8) mở khóa dòng +5% HP/ATK của TẤT CẢ Lính (All Soldiers) và +5% HP Thánh Tích (Relic HP)!",
                en: "Extracted 100% from TopHeroes Tables - Max (Tab 🀄️Runes): Breakpoint #1 (Lv.5) unlocks +5% Hero HP/ATK and +30 / +50 March Size; Breakpoint #2 (Lv.8) unlocks +5% All Soldiers HP/ATK and +5% Relic HP!",
              },
            },
            {
              type: "table",
              caption: {
                vi: "Bảng 4.4: Chỉ Số Hệ Thống Cổ Ngữ (Runes Lv.1 ➔ Lv.12 — Điểm Gãy Lv.5 & Lv.8)",
                en: "Table 4.4: Rune System Stat Progression (Runes Lv.1 ➔ Lv.12 — Lv.5 & Lv.8 Breakpoints)",
              },
              headers: [
                { vi: "Cấp Cổ Ngữ (Rune Level)", en: "Rune Level" },
                { vi: "Hero HP Rune (Flat HP / % Hero HP)", en: "Hero HP Rune (Flat HP / % Hero HP)" },
                { vi: "Hero Attack Rune (Flat ATK / % Hero ATK)", en: "Hero Attack Rune (Flat ATK / % Hero ATK)" },
                { vi: "Soldier HP Rune (Soldier HP / March / % All HP)", en: "Soldier HP Rune (Soldier HP / March / % All HP)" },
                { vi: "Soldier Attack Rune (Soldier ATK / March / % All ATK)", en: "Soldier Attack Rune (Soldier ATK / March / % All ATK)" },
                { vi: "Relic Mastery Rune (Flat Relic HP / % Relic HP)", en: "Relic Mastery Rune (Flat Relic HP / % Relic HP)" },
                { vi: "Queue Attack Rune (DEF / DEF Break / March Size)", en: "Queue Attack Rune (DEF / DEF Break / March Size)" },
              ],
              rows: [
                [
                  { vi: "Lv.1", en: "Lv.1" },
                  { vi: "+650 / —", en: "+650 / —" },
                  { vi: "+16 / —", en: "+16 / —" },
                  { vi: "+2 / — / —", en: "+2 / — / —" },
                  { vi: "+2 / — / —", en: "+2 / — / —" },
                  { vi: "+850 / —", en: "+850 / —" },
                  { vi: "+600 DEF / +769 Break / —", en: "+600 DEF / +769 Break / —" },
                ],
                [
                  { vi: "Lv.2", en: "Lv.2" },
                  { vi: "+975 / —", en: "+975 / —" },
                  { vi: "+24 / —", en: "+24 / —" },
                  { vi: "+3 / — / —", en: "+3 / — / —" },
                  { vi: "+3 / — / —", en: "+3 / — / —" },
                  { vi: "+1,275 / —", en: "+1,275 / —" },
                  { vi: "+1,200 DEF / +1,538 Break / —", en: "+1,200 DEF / +1,538 Break / —" },
                ],
                [
                  { vi: "Lv.3", en: "Lv.3" },
                  { vi: "+2,193 / —", en: "+2,193 / —" },
                  { vi: "+54 / —", en: "+54 / —" },
                  { vi: "+5 / — / —", en: "+5 / — / —" },
                  { vi: "+5 / — / —", en: "+5 / — / —" },
                  { vi: "+2,040 / —", en: "+2,040 / —" },
                  { vi: "+1,800 DEF / +2,307 Break / —", en: "+1,800 DEF / +2,307 Break / —" },
                ],
                [
                  { vi: "Lv.4", en: "Lv.4" },
                  { vi: "+5,606 / —", en: "+5,606 / —" },
                  { vi: "+138 / —", en: "+138 / —" },
                  { vi: "+8 / — / —", en: "+8 / — / —" },
                  { vi: "+7 / — / —", en: "+7 / — / —" },
                  { vi: "+3,060 / —", en: "+3,060 / —" },
                  { vi: "+2,400 DEF / +3,076 Break / —", en: "+2,400 DEF / +3,076 Break / —" },
                ],
                [
                  { vi: "🔥 Lv.5 (Mốc 1)", en: "🔥 Lv.5 (Breakpoint 1)" },
                  { vi: "+15,091 / +5%", en: "+15,091 / +5%" },
                  { vi: "+371 / +5%", en: "+371 / +5%" },
                  { vi: "+11 / +30 March / —", en: "+11 / +30 March / —" },
                  { vi: "+9 / +30 March / —", en: "+9 / +30 March / —" },
                  { vi: "+4,950 / —", en: "+4,950 / —" },
                  { vi: "+3,000 DEF / +3,845 Break / +50 March", en: "+3,000 DEF / +3,845 Break / +50 March" },
                ],
                [
                  { vi: "Lv.6", en: "Lv.6" },
                  { vi: "+40,616 / +10%", en: "+40,616 / +10%" },
                  { vi: "+999 / +10%", en: "+999 / +10%" },
                  { vi: "+15 / +35 March / —", en: "+15 / +35 March / —" },
                  { vi: "+11 / +35 March / —", en: "+11 / +35 March / —" },
                  { vi: "+8,180 / —", en: "+8,180 / —" },
                  { vi: "+3,600 DEF / +4,614 Break / +80 March", en: "+3,600 DEF / +4,614 Break / +80 March" },
                ],
                [
                  { vi: "Lv.7", en: "Lv.7" },
                  { vi: "+88,792 / +15%", en: "+88,792 / +15%" },
                  { vi: "+2,183 / +15%", en: "+2,183 / +15%" },
                  { vi: "+25 / +42 March / —", en: "+25 / +42 March / —" },
                  { vi: "+13 / +42 March / —", en: "+13 / +42 March / —" },
                  { vi: "+17,580 / —", en: "+17,580 / —" },
                  { vi: "+4,200 DEF / +5,383 Break / +116 March", en: "+4,200 DEF / +5,383 Break / +116 March" },
                ],
                [
                  { vi: "🔥 Lv.8 (Mốc 2)", en: "🔥 Lv.8 (Breakpoint 2)" },
                  { vi: "+191,019 / +20%", en: "+191,019 / +20%" },
                  { vi: "+4,696 / +20%", en: "+4,696 / +20%" },
                  { vi: "+30 / +50 March / +5% All", en: "+30 / +50 March / +5% All" },
                  { vi: "+15 / +50 March / +5% All", en: "+15 / +50 March / +5% All" },
                  { vi: "+28,660 / +5%", en: "+28,660 / +5%" },
                  { vi: "+4,800 DEF / +6,922 Break / +150 March", en: "+4,800 DEF / +6,922 Break / +150 March" },
                ],
                [
                  { vi: "Lv.9", en: "Lv.9" },
                  { vi: "+312,456 / +25%", en: "+312,456 / +25%" },
                  { vi: "+7,681 / +25%", en: "+7,681 / +25%" },
                  { vi: "+45 / +60 March / +10% All", en: "+45 / +60 March / +10% All" },
                  { vi: "+18 / +60 March / +10% All", en: "+18 / +60 March / +10% All" },
                  { vi: "+46,880 / +10%", en: "+46,880 / +10%" },
                  { vi: "+5,400 DEF / +8,461 Break / +180 March", en: "+5,400 DEF / +8,461 Break / +180 March" },
                ],
                [
                  { vi: "Lv.10", en: "Lv.10" },
                  { vi: "+422,804 / +30%", en: "+422,804 / +30%" },
                  { vi: "+10,393 / +30%", en: "+10,393 / +30%" },
                  { vi: "+60 / +75 March / +15% All", en: "+60 / +75 March / +15% All" },
                  { vi: "+21 / +75 March / +15% All", en: "+21 / +75 March / +15% All" },
                  { vi: "+63,440 / +15%", en: "+63,440 / +15%" },
                  { vi: "+6,000 DEF / +10,000 Break / +210 March", en: "+6,000 DEF / +10,000 Break / +210 March" },
                ],
                [
                  { vi: "Lv.11", en: "Lv.11" },
                  { vi: "+561,993 / +35%", en: "+561,993 / +35%" },
                  { vi: "+13,814 / +35%", en: "+13,814 / +35%" },
                  { vi: "+75 / +85 March / +20% All", en: "+75 / +85 March / +20% All" },
                  { vi: "+23 / +85 March / +20% All", en: "+23 / +85 March / +20% All" },
                  { vi: "+84,330 / +20%", en: "+84,330 / +20%" },
                  { vi: "+6,600 DEF / +12,000 Break / +230 March", en: "+6,600 DEF / +12,000 Break / +230 March" },
                ],
                [
                  { vi: "👑 Lv.12 (Max)", en: "👑 Lv.12 (Max)" },
                  { vi: "+722,271 / +40%", en: "+722,271 / +40%" },
                  { vi: "+17,753 / +40%", en: "+17,753 / +40%" },
                  { vi: "+92 / +100 March / +30% All", en: "+92 / +100 March / +30% All" },
                  { vi: "+26 / +100 March / +30% All", en: "+26 / +100 March / +30% All" },
                  { vi: "+108,500 / +30%", en: "+108,500 / +30%" },
                  { vi: "+7,200 DEF / +14,000 Break / +250 March", en: "+7,200 DEF / +14,000 Break / +250 March" },
                ],
              ],
            },
          ],
        },
        {
          id: "sub-4-5-pets-master-table",
          title: {
            vi: "4.5. Bảng 5: Chi Phí Nâng Cấp & Tiến Hóa Thú Cưng (Pets Lv.1 ➔ Lv.90 / Lv.120 — Tab 🐣Pets)",
            en: "4.5. Table 5: Pet Leveling & Evolution Costs (Pets Lv.1 ➔ Lv.90 / Lv.120 — Tab 🐣Pets)",
          },
          blocks: [
            {
              type: "paragraph",
              text: {
                vi: "Chỉ số chiến đấu của Thú Cưng được tính theo công thức: Pet ATK / HP = [(Tổng ATK / HP của 6 Tướng Đội Hình) / 6] × Hệ Số Chuyển Đổi (Pet Stat Conversion Rate). Dưới đây là lộ trình chi phí Thức ăn Pet (Pet Food), Tinh chất (Essence), Phôi Tiến hóa (Promotion Copies) và Hệ số chuyển đổi (36.00% ➔ 96.00% ➔ 104%+) từ Lv.1 đến Lv.120:",
                en: "Pet combat stats follow the formula: Pet ATK / HP = [(Total ATK / HP of All 6 Queue Heroes) / 6] × Pet Stat Conversion Rate. Below is the complete progression of Pet Food, Pet Essence, Promotion Copies, and Conversion Rate (36.00% ➔ 96.00% ➔ 104%+) from Lv.1 to Lv.120:",
              },
            },
            {
              type: "table",
              caption: {
                vi: "Bảng 4.5: Chi Phí Nâng Cấp & Tiến Hóa Thú Cưng (Pets Lv.1 ➔ Lv.90 = 596,600 Food | Lv.120 = 714,000 Food + 40,050 Essence)",
                en: "Table 4.5: Pet Leveling & Evolution Costs (Pets Lv.1 ➔ Lv.90 = 596,600 Food | Lv.120 = 714,000 Food + 40,050 Essence)",
              },
              headers: [
                { vi: "Mốc Cấp Độ Pet (Pet Level)", en: "Pet Level Milestone" },
                { vi: "Thức Ăn Pet Ở Cấp Này (Pet Food)", en: "Pet Food at This Level" },
                { vi: "Tinh Chất / Nguyên Liệu Đặc Biệt (Essence)", en: "Essence / Special Material" },
                { vi: "Phôi Pet Cần Để Đột Phá (Promotion Copies)", en: "Promotion Copies Required" },
                { vi: "Trần Cấp Mở Khóa (Level Cap)", en: "Unlocked Level Cap" },
                { vi: "Hệ Số Chuyển Đổi (Conversion Rate)", en: "Stat Conversion Rate" },
                { vi: "Buff Toàn Cục / Hệ (All Hero ATK: Universal / Faction)", en: "All Hero ATK Buff (Universal / Faction)" },
                { vi: "Buff Toàn Cục / Hệ (All Hero HP: Universal / Faction)", en: "All Hero HP Buff (Universal / Faction)" },
              ],
              rows: [
                [
                  { vi: "Lv.1 (Khởi tạo Rare)", en: "Lv.1 (Base Rare)" },
                  { vi: "0", en: "0" },
                  { vi: "—", en: "—" },
                  { vi: "—", en: "—" },
                  { vi: "Lv.35", en: "Lv.35" },
                  { vi: "36.00%", en: "36.00%" },
                  { vi: "+1.70% / +5.10%", en: "+1.70% / +5.10%" },
                  { vi: "+2.50% / +7.50%", en: "+2.50% / +7.50%" },
                ],
                [
                  { vi: "Lv.2 ➔ Lv.9", en: "Lv.2 ➔ Lv.9" },
                  { vi: "100 ➔ 600 / cấp", en: "100 ➔ 600 / lvl" },
                  { vi: "—", en: "—" },
                  { vi: "(Uncommon ở Lv.5 cần 1 same)", en: "(Uncommon at Lv.5 requires 1 same)" },
                  { vi: "Lv.35", en: "Lv.35" },
                  { vi: "36.00%", en: "36.00%" },
                  { vi: "+1.70% / +5.10%", en: "+1.70% / +5.10%" },
                  { vi: "+2.50% / +7.50%", en: "+2.50% / +7.50%" },
                ],
                [
                  { vi: "🔥 Lv.10 (Đột phá 1)", en: "🔥 Lv.10 (Breakthrough 1)" },
                  { vi: "700", en: "700" },
                  { vi: "—", en: "—" },
                  { vi: "1 same (Rare) / 2 any (Uncommon)", en: "1 same (Rare) / 2 any (Uncommon)" },
                  { vi: "Lv.40", en: "Lv.40" },
                  { vi: "40.00%", en: "40.00%" },
                  { vi: "+3.40% / +10.20%", en: "+3.40% / +10.20%" },
                  { vi: "+5.00% / +15.00%", en: "+5.00% / +15.00%" },
                ],
                [
                  { vi: "Lv.11 ➔ Lv.19", en: "Lv.11 ➔ Lv.19" },
                  { vi: "800 ➔ 1,600 / cấp", en: "800 ➔ 1,600 / lvl" },
                  { vi: "—", en: "—" },
                  { vi: "(Uncommon ở Lv.15 cần 3 any)", en: "(Uncommon at Lv.15 requires 3 any)" },
                  { vi: "Lv.40", en: "Lv.40" },
                  { vi: "40.00%", en: "40.00%" },
                  { vi: "+3.40% / +10.20%", en: "+3.40% / +10.20%" },
                  { vi: "+5.00% / +15.00%", en: "+5.00% / +15.00%" },
                ],
                [
                  { vi: "🔥 Lv.20 (Đột phá 2)", en: "🔥 Lv.20 (Breakthrough 2)" },
                  { vi: "1,700", en: "1,700" },
                  { vi: "—", en: "—" },
                  { vi: "3 any (Rare) / 2 same (Uncommon)", en: "3 any (Rare) / 2 same (Uncommon)" },
                  { vi: "Lv.45", en: "Lv.45" },
                  { vi: "44.00%", en: "44.00%" },
                  { vi: "+5.10% / +15.30%", en: "+5.10% / +15.30%" },
                  { vi: "+7.50% / +22.50%", en: "+7.50% / +22.50%" },
                ],
                [
                  { vi: "Lv.21 ➔ Lv.29", en: "Lv.21 ➔ Lv.29" },
                  { vi: "1,800 ➔ 2,600 / cấp", en: "1,800 ➔ 2,600 / lvl" },
                  { vi: "—", en: "—" },
                  { vi: "(Uncommon ở Lv.25 cần 3 any)", en: "(Uncommon at Lv.25 requires 3 any)" },
                  { vi: "Lv.45", en: "Lv.45" },
                  { vi: "44.00%", en: "44.00%" },
                  { vi: "+5.10% / +15.30%", en: "+5.10% / +15.30%" },
                  { vi: "+7.50% / +22.50%", en: "+7.50% / +22.50%" },
                ],
                [
                  { vi: "🔥 Lv.30 ➔ Lv.55", en: "🔥 Lv.30 ➔ Lv.55" },
                  { vi: "Tăng dần tới 7,600", en: "Scales up to 7,600" },
                  { vi: "—", en: "—" },
                  { vi: "Đột phá mỗi 5–10 cấp (Epic)", en: "Promotes every 5–10 lvls (Epic)" },
                  { vi: "Lv.60 ➔ Lv.90", en: "Lv.60 ➔ Lv.90" },
                  { vi: "48% ➔ 68%", en: "48% ➔ 68%" },
                  { vi: "Tăng tịnh tiến", en: "Progressive scaling" },
                  { vi: "Tăng tịnh tiến", en: "Progressive scaling" },
                ],
                [
                  { vi: "🔥 Lv.60 (Đột phá Sâu)", en: "🔥 Lv.60 (Deep Breakthrough)" },
                  { vi: "8,850", en: "8,850" },
                  { vi: "2,000 Material (Uncommon)", en: "2,000 Material (Uncommon)" },
                  { vi: "3 same + 10 any", en: "3 same + 10 any" },
                  { vi: "Lv.90", en: "Lv.90" },
                  { vi: "72.00%", en: "72.00%" },
                  { vi: "+17.00% / +51.00%", en: "+17.00% / +51.00%" },
                  { vi: "+25.00% / +75.00%", en: "+25.00% / +75.00%" },
                ],
                [
                  { vi: "🔥 Lv.65", en: "🔥 Lv.65" },
                  { vi: "10,100", en: "10,100" },
                  { vi: "—", en: "—" },
                  { vi: "3 same + 15 any", en: "3 same + 15 any" },
                  { vi: "Lv.90", en: "Lv.90" },
                  { vi: "76.00%", en: "76.00%" },
                  { vi: "+18.70% / +56.10%", en: "+18.70% / +56.10%" },
                  { vi: "+27.50% / +82.50%", en: "+27.50% / +82.50%" },
                ],
                [
                  { vi: "🔥 Lv.70", en: "🔥 Lv.70" },
                  { vi: "11,350", en: "11,350" },
                  { vi: "—", en: "—" },
                  { vi: "4 same + 15 any", en: "4 same + 15 any" },
                  { vi: "Lv.90", en: "Lv.90" },
                  { vi: "80.00%", en: "80.00%" },
                  { vi: "+20.40% / +61.20%", en: "+20.40% / +61.20%" },
                  { vi: "+30.00% / +90.00%", en: "+30.00% / +90.00%" },
                ],
                [
                  { vi: "👑 Lv.75 (LEGENDARY)", en: "👑 Lv.75 (LEGENDARY)" },
                  { vi: "12,800", en: "12,800" },
                  { vi: "—", en: "—" },
                  { vi: "5 same + 15 any", en: "5 same + 15 any" },
                  { vi: "Lv.90", en: "Lv.90" },
                  { vi: "84.00%", en: "84.00%" },
                  { vi: "+22.10% / +66.30%", en: "+22.10% / +66.30%" },
                  { vi: "+32.50% / +97.50%", en: "+32.50% / +97.50%" },
                ],
                [
                  { vi: "🔥 Lv.80", en: "🔥 Lv.80" },
                  { vi: "14,300", en: "14,300" },
                  { vi: "1,000 Material (Uncommon)", en: "1,000 Material (Uncommon)" },
                  { vi: "3 same + 10 any", en: "3 same + 10 any" },
                  { vi: "Lv.95", en: "Lv.95" },
                  { vi: "88.00%", en: "88.00%" },
                  { vi: "+23.80% / +71.40%", en: "+23.80% / +71.40%" },
                  { vi: "+35.00% / +105.00%", en: "+35.00% / +105.00%" },
                ],
                [
                  { vi: "🔥 Lv.85", en: "🔥 Lv.85" },
                  { vi: "15,800", en: "15,800" },
                  { vi: "2,000 Material (Uncommon)", en: "2,000 Material (Uncommon)" },
                  { vi: "4 same + 15 any", en: "4 same + 15 any" },
                  { vi: "Lv.100", en: "Lv.100" },
                  { vi: "92.00%", en: "92.00%" },
                  { vi: "+25.50% / +76.50%", en: "+25.50% / +76.50%" },
                  { vi: "+37.50% / +112.50%", en: "+37.50% / +112.50%" },
                ],
                [
                  { vi: "👑 Lv.90 (Đỉnh Lv.90)", en: "👑 Lv.90 (Lv.90 Peak)" },
                  { vi: "17,300", en: "17,300" },
                  { vi: "4,000 Material (Uncommon)", en: "4,000 Material (Uncommon)" },
                  { vi: "5 same + 20 any", en: "5 same + 20 any" },
                  { vi: "Lv.105", en: "Lv.105" },
                  { vi: "96.00%", en: "96.00%" },
                  { vi: "+27.20% / +81.60%", en: "+27.20% / +81.60%" },
                  { vi: "+40.00% / +120.00%", en: "+40.00% / +120.00%" },
                ],
                [
                  { vi: "Lv.91 ➔ Lv.100 (MYTHIC)", en: "Lv.91 ➔ Lv.100 (MYTHIC)" },
                  { vi: "6,400 ➔ 7,000/cấp", en: "6,400 ➔ 7,000/lvl" },
                  { vi: "50 ➔ 500 Essence/cấp", en: "50 ➔ 500 Essence/lvl" },
                  {
                    vi: "6 same + 20 any (Lv.95) ➔ 8 same + 30 any (Lv.100)",
                    en: "6 same + 20 any (Lv.95) ➔ 8 same + 30 any (Lv.100)",
                  },
                  { vi: "Lv.110 ➔ Lv.115", en: "Lv.110 ➔ Lv.115" },
                  { vi: "100% ➔ 104%", en: "100% ➔ 104%" },
                  { vi: "+30.60% / +91.80%", en: "+30.60% / +91.80%" },
                  { vi: "+45.00% / +135.00%", en: "+45.00% / +135.00%" },
                ],
                [
                  { vi: "Lv.101 ➔ Lv.120 (MYTHIC Max)", en: "Lv.101 ➔ Lv.120 (MYTHIC Max)" },
                  { vi: "7,000 / cấp", en: "7,000 / lvl" },
                  { vi: "500 ➔ 2,000 Essence/cấp", en: "500 ➔ 2,000 Essence/lvl" },
                  {
                    vi: "Đột phá đến Lv.105 (Tổng: 58 same + 211 any)",
                    en: "Promotions up to Lv.105 (Total: 58 same + 211 any)",
                  },
                  { vi: "Lv.120", en: "Lv.120" },
                  { vi: "104%+", en: "104%+" },
                  { vi: "Mở rộng Thần Thoại", en: "Mythic Expansion" },
                  { vi: "Mở rộng Thần Thoại", en: "Mythic Expansion" },
                ],
                [
                  { vi: "TỔNG CỘNG Lv.90 (Rare / Uncommon)", en: "TOTAL Lv.90 (Rare / Uncommon)" },
                  { vi: "596,600 (Rare) / 596,850 (Uncommon)", en: "596,600 (Rare) / 596,850 (Uncommon)" },
                  { vi: "0 (Rare) / 3,525 Essence (Uncommon)", en: "0 (Rare) / 3,525 Essence (Uncommon)" },
                  { vi: "44 same + 161 any (Rare Lv.90)", en: "44 same + 161 any (Rare Lv.90)" },
                  { vi: "Lv.105", en: "Lv.105" },
                  { vi: "96.00%", en: "96.00%" },
                  { vi: "+27.20% / +81.60%", en: "+27.20% / +81.60%" },
                  { vi: "+40.00% / +120.00%", en: "+40.00% / +120.00%" },
                ],
                [
                  { vi: "TỔNG KỊCH TRẦN Lv.120 (Rare Faction Pet)", en: "MAX TOTAL Lv.120 (Rare Faction Pet)" },
                  { vi: "714,000 Thức Ăn Pet", en: "714,000 Pet Food" },
                  { vi: "40,050 Pet Essence", en: "40,050 Pet Essence" },
                  {
                    vi: "58 Phôi Cùng Loại (Same) + 211 Phôi Khác (Any)",
                    en: "58 Same Copies + 211 Any Copies",
                  },
                  { vi: "Lv.120", en: "Lv.120" },
                  { vi: "104%+", en: "104%+" },
                  { vi: "+30.60%+ / +91.80%+", en: "+30.60%+ / +91.80%+" },
                  { vi: "+45.00%+ / +135.00%+", en: "+45.00%+ / +135.00%+" },
                ],
              ],
            },
          ],
        },
        {
          id: "sub-4-6-troop-skins-master-table",
          title: {
            vi: "4.6. Bảng 6: Chi Phí Ngoại Hình Quân Lính (Troop Skins Lv.1 ➔ Lv.50 & Honor Level 1–150 — Tab 💂‍♀️Troop Skins)",
            en: "4.6. Table 6: Troop Skin Upgrade Costs (Lv.1 ➔ Lv.50 & Honor Level 1–150 — Tab 💂‍♀️Troop Skins)",
          },
          blocks: [
            {
              type: "paragraph",
              text: {
                vi: "Mỗi Quân Trang (Troop Skin) đều có Chỉ số Sở hữu Toàn cục (Owned Passive Bonus) cộng dồn vĩnh viễn cho mọi đội hình. Chi phí nâng cấp bằng Huân Chương (Glory Medals) của Skin Tím (Epic) luôn bằng đúng 50% Skin Vàng (Legendary), và Skin Xanh (Rare) bằng 25% Skin Vàng (Tỷ lệ 4:2:1):",
                en: "Every Troop Skin grants a permanent Owned Passive Bonus that stacks across all queues. Upgrading an Epic skin with Glory Medals always costs exactly 50% of a Legendary skin, while a Rare skin costs 25% of a Legendary skin (the 4:2:1 cost ratio):",
              },
            },
            {
              type: "table",
              caption: {
                vi: "Bảng 4.6: Chi Phí Ngoại Hình Quân Lính (Troop Skins Lv.1 ➔ Lv.50 & Honor Level 1–150 = 28,345,400 / 14,172,700 / 7,086,350 Medals)",
                en: "Table 4.6: Troop Skin Progression Costs (Lv.1 ➔ Lv.50 & Honor Level 1–150 = 28,345,400 / 14,172,700 / 7,086,350 Medals)",
              },
              headers: [
                { vi: "Cấp Độ Quân Trang (Troop Skin Level)", en: "Troop Skin Level" },
                { vi: "Số Nấc Nhỏ / Cấp (Sublevels)", en: "Sublevels / Level" },
                { vi: "Skin Vàng (Legendary): Huân Chương / Cấp", en: "Legendary Skin: Medals / Level" },
                { vi: "Skin Vàng (Legendary): Tổng Tích Lũy", en: "Legendary Skin: Cumulative Total" },
                { vi: "Skin Tím (Epic): Huân Chương / Cấp", en: "Epic Skin: Medals / Level" },
                { vi: "Skin Tím (Epic): Tổng Tích Lũy", en: "Epic Skin: Cumulative Total" },
                { vi: "Skin Xanh (Rare): Huân Chương / Cấp", en: "Rare Skin: Medals / Level" },
                { vi: "Skin Xanh (Rare): Tổng Tích Lũy", en: "Rare Skin: Cumulative Total" },
              ],
              rows: [
                [
                  { vi: "Lv.1 ➔ Lv.2", en: "Lv.1 ➔ Lv.2" },
                  { vi: "1 nấc", en: "1 step" },
                  { vi: "1,600", en: "1,600" },
                  { vi: "1,600", en: "1,600" },
                  { vi: "800", en: "800" },
                  { vi: "800", en: "800" },
                  { vi: "400", en: "400" },
                  { vi: "400", en: "400" },
                ],
                [
                  { vi: "Lv.3 ➔ Lv.4", en: "Lv.3 ➔ Lv.4" },
                  { vi: "1 nấc", en: "1 step" },
                  { vi: "2,300 ➔ 3,200", en: "2,300 ➔ 3,200" },
                  { vi: "7,100", en: "7,100" },
                  { vi: "1,150 ➔ 1,600", en: "1,150 ➔ 1,600" },
                  { vi: "3,550", en: "3,550" },
                  { vi: "575 ➔ 800", en: "575 ➔ 800" },
                  { vi: "1,775", en: "1,775" },
                ],
                [
                  { vi: "Lv.5 ➔ Lv.6", en: "Lv.5 ➔ Lv.6" },
                  { vi: "1 nấc", en: "1 step" },
                  { vi: "4,400 ➔ 6,200", en: "4,400 ➔ 6,200" },
                  { vi: "17,700", en: "17,700" },
                  { vi: "2,200 ➔ 3,100", en: "2,200 ➔ 3,100" },
                  { vi: "8,850", en: "8,850" },
                  { vi: "1,100 ➔ 1,550", en: "1,100 ➔ 1,550" },
                  { vi: "4,425", en: "4,425" },
                ],
                [
                  { vi: "Lv.7 ➔ Lv.9", en: "Lv.7 ➔ Lv.9" },
                  { vi: "1 nấc", en: "1 step" },
                  { vi: "8,700 ➔ 13K ➔ 17K", en: "8,700 ➔ 13K ➔ 17K" },
                  { vi: "56,400", en: "56,400" },
                  { vi: "4,350 ➔ 6,500 ➔ 8,500", en: "4,350 ➔ 6,500 ➔ 8,500" },
                  { vi: "28,200", en: "28,200" },
                  { vi: "2,175 ➔ 3,250 ➔ 4,250", en: "2,175 ➔ 3,250 ➔ 4,250" },
                  { vi: "14,100", en: "14,100" },
                ],
                [
                  { vi: "🔥 Lv.10 ⭐ (Điểm Gãy 1 — 1 Bản sao)", en: "🔥 Lv.10 ⭐ (Breakpoint 1 — 1 Copy)" },
                  { vi: "1 nấc", en: "1 step" },
                  { vi: "24,000", en: "24,000" },
                  { vi: "80,400", en: "80,400" },
                  { vi: "12,000", en: "12,000" },
                  { vi: "40,200", en: "40,200" },
                  { vi: "6,000", en: "6,000" },
                  { vi: "20,100", en: "20,100" },
                ],
                [
                  { vi: "Lv.11 ➔ Lv.15", en: "Lv.11 ➔ Lv.15" },
                  { vi: "1 nấc", en: "1 step" },
                  { vi: "34K ➔ 40K ➔ 48K ➔ 58K ➔ 69K", en: "34K ➔ 40K ➔ 48K ➔ 58K ➔ 69K" },
                  { vi: "329,400", en: "329,400" },
                  { vi: "17K ➔ 20K ➔ 24K ➔ 29K ➔ 34.5K", en: "17K ➔ 20K ➔ 24K ➔ 29K ➔ 34.5K" },
                  { vi: "164,700", en: "164,700" },
                  { vi: "8.5K ➔ 10K ➔ 12K ➔ 14.5K ➔ 17.25K", en: "8.5K ➔ 10K ➔ 12K ➔ 14.5K ➔ 17.25K" },
                  { vi: "82,350", en: "82,350" },
                ],
                [
                  { vi: "Lv.16 ➔ Lv.17", en: "Lv.16 ➔ Lv.17" },
                  { vi: "1 nấc", en: "1 step" },
                  { vi: "83,000 ➔ 100,000", en: "83,000 ➔ 100,000" },
                  { vi: "512,400", en: "512,400" },
                  { vi: "41,500 ➔ 50,000", en: "41,500 ➔ 50,000" },
                  { vi: "256,200", en: "256,200" },
                  { vi: "20,750 ➔ 25,000", en: "20,750 ➔ 25,000" },
                  { vi: "128,100", en: "128,100" },
                ],
                [
                  { vi: "Lv.17/1 ➔ Lv.19/2 (Chạm cửa Lv.20)", en: "Lv.17/1 ➔ Lv.19/2 (Pre-Lv.20 Gate)" },
                  { vi: "2 nấc / cấp", en: "2 steps / lvl" },
                  { vi: "120K ➔ 144K ➔ 172K", en: "120K ➔ 144K ➔ 172K" },
                  { vi: "948,400 (Trước đột phá 2★)", en: "948,400 (Before 2★ promotion)" },
                  { vi: "60K ➔ 72K ➔ 86K", en: "60K ➔ 72K ➔ 86K" },
                  { vi: "474,200 (Trước 2★)", en: "474,200 (Before 2★)" },
                  { vi: "30K ➔ 36K ➔ 43K", en: "30K ➔ 36K ➔ 43K" },
                  { vi: "237,100 (Trước 2★)", en: "237,100 (Before 2★)" },
                ],
                [
                  { vi: "🔥 Lv.20 ⭐⭐ (Điểm Gãy 2 — +1 Bản sao)", en: "🔥 Lv.20 ⭐⭐ (Breakpoint 2 — +1 Copy)" },
                  { vi: "3 nấc (69K×3)", en: "3 steps (69K×3)" },
                  { vi: "207,000", en: "207,000" },
                  { vi: "1,155,400 (Hoàn tất 20/3)", en: "1,155,400 (Completes 20/3)" },
                  { vi: "103,500 (34.5K×3)", en: "103,500 (34.5K×3)" },
                  { vi: "577,700 (Hoàn tất 20/3)", en: "577,700 (Completes 20/3)" },
                  { vi: "51,750 (17.25K×3)", en: "51,750 (17.25K×3)" },
                  { vi: "288,850 (Hoàn tất 20/3)", en: "288,850 (Completes 20/3)" },
                ],
                [
                  { vi: "Lv.21 ➔ Lv.25", en: "Lv.21 ➔ Lv.25" },
                  { vi: "3 nấc / cấp", en: "3 steps / lvl" },
                  { vi: "228K ➔ 249K ➔ 273K ➔ 300K ➔ 330K", en: "228K ➔ 249K ➔ 273K ➔ 300K ➔ 330K" },
                  { vi: "2,535,400", en: "2,535,400" },
                  { vi: "114K ➔ 165K / cấp", en: "114K ➔ 165K / lvl" },
                  { vi: "1,267,700", en: "1,267,700" },
                  { vi: "57K ➔ 82.5K / cấp", en: "57K ➔ 82.5K / lvl" },
                  { vi: "633,850", en: "633,850" },
                ],
                [
                  { vi: "Lv.26 ➔ Lv.29 (Chạm cửa Lv.30)", en: "Lv.26 ➔ Lv.29 (Pre-Lv.30 Gate)" },
                  { vi: "4 nấc / cấp", en: "4 steps / lvl" },
                  { vi: "400K ➔ 400K ➔ 440K ➔ 484K", en: "400K ➔ 400K ➔ 440K ➔ 484K" },
                  { vi: "4,259,400 (Trước đột phá 3★)", en: "4,259,400 (Before 3★ promotion)" },
                  { vi: "200K ➔ 200K ➔ 220K ➔ 242K", en: "200K ➔ 200K ➔ 220K ➔ 242K" },
                  { vi: "2,129,700 (Trước 3★)", en: "2,129,700 (Before 3★)" },
                  { vi: "100K ➔ 100K ➔ 110K ➔ 121K", en: "100K ➔ 100K ➔ 110K ➔ 121K" },
                  { vi: "1,064,850 (Trước 3★)", en: "1,064,850 (Before 3★)" },
                ],
                [
                  { vi: "🔥 Lv.30 ⭐⭐⭐ (Điểm Gãy 3 — +2 Bản sao)", en: "🔥 Lv.30 ⭐⭐⭐ (Breakpoint 3 — +2 Copies)" },
                  { vi: "4 nấc (133K×4)", en: "4 steps (133K×4)" },
                  { vi: "532,000", en: "532,000" },
                  { vi: "4,791,400 (Hoàn tất 30/4)", en: "4,791,400 (Completes 30/4)" },
                  { vi: "266,000 (66.5K×4)", en: "266,000 (66.5K×4)" },
                  { vi: "2,395,700 (Hoàn tất 30/4)", en: "2,395,700 (Completes 30/4)" },
                  { vi: "133,000 (33.25K×4)", en: "133,000 (33.25K×4)" },
                  { vi: "1,197,850 (Hoàn tất 30/4)", en: "1,197,850 (Completes 30/4)" },
                ],
                [
                  { vi: "Lv.31 ➔ Lv.33", en: "Lv.31 ➔ Lv.33" },
                  { vi: "5 nấc / cấp", en: "5 steps / lvl" },
                  { vi: "560K ➔ 590K ➔ 615K", en: "560K ➔ 590K ➔ 615K" },
                  { vi: "6,556,400", en: "6,556,400" },
                  { vi: "280K ➔ 295K ➔ 307.5K", en: "280K ➔ 295K ➔ 307.5K" },
                  { vi: "3,278,200", en: "3,278,200" },
                  { vi: "140K ➔ 147.5K ➔ 153.75K", en: "140K ➔ 147.5K ➔ 153.75K" },
                  { vi: "1,639,100", en: "1,639,100" },
                ],
                [
                  { vi: "Lv.34 ➔ Lv.36", en: "Lv.34 ➔ Lv.36" },
                  { vi: "6 nấc / cấp", en: "6 steps / lvl" },
                  { vi: "648K ➔ 678K ➔ 714K", en: "648K ➔ 678K ➔ 714K" },
                  { vi: "8,596,400", en: "8,596,400" },
                  { vi: "324K ➔ 339K ➔ 357K", en: "324K ➔ 339K ➔ 357K" },
                  { vi: "4,298,200", en: "4,298,200" },
                  { vi: "162K ➔ 169.5K ➔ 178.5K", en: "162K ➔ 169.5K ➔ 178.5K" },
                  { vi: "2,149,100", en: "2,149,100" },
                ],
                [
                  { vi: "Lv.37 ➔ Lv.38", en: "Lv.37 ➔ Lv.38" },
                  { vi: "7 nấc / cấp", en: "7 steps / lvl" },
                  { vi: "749,000 ➔ 791,000", en: "749,000 ➔ 791,000" },
                  { vi: "10,136,400", en: "10,136,400" },
                  { vi: "374,500 ➔ 395,500", en: "374,500 ➔ 395,500" },
                  { vi: "5,068,200", en: "5,068,200" },
                  { vi: "187,250 ➔ 197,750", en: "187,250 ➔ 197,750" },
                  { vi: "2,534,100", en: "2,534,100" },
                ],
                [
                  { vi: "Lv.39 (Chạm cửa Lv.40)", en: "Lv.39 (Pre-Lv.40 Gate)" },
                  { vi: "8 nấc (103K×8)", en: "8 steps (103K×8)" },
                  { vi: "824,000", en: "824,000" },
                  { vi: "10,960,400 (Trước đột phá 4★)", en: "10,960,400 (Before 4★ promotion)" },
                  { vi: "412,000", en: "412,000" },
                  { vi: "5,480,200 (Trước 4★)", en: "5,480,200 (Before 4★)" },
                  { vi: "206,000", en: "206,000" },
                  { vi: "2,740,100 (Trước 4★)", en: "2,740,100 (Before 4★)" },
                ],
                [
                  { vi: "🔥 Lv.40 ⭐⭐⭐⭐ (Điểm Gãy 4 — +3 Bản sao)", en: "🔥 Lv.40 ⭐⭐⭐⭐ (Breakpoint 4 — +3 Copies)" },
                  { vi: "8 nấc (109K×8)", en: "8 steps (109K×8)" },
                  { vi: "872,000", en: "872,000" },
                  { vi: "11,832,400 (Hoàn tất 40/8)", en: "11,832,400 (Completes 40/8)" },
                  { vi: "436,000 (54.5K×8)", en: "436,000 (54.5K×8)" },
                  { vi: "5,916,200 (Hoàn tất 40/8)", en: "5,916,200 (Completes 40/8)" },
                  { vi: "218,000 (27.25K×8)", en: "218,000 (27.25K×8)" },
                  { vi: "2,958,100 (Hoàn tất 40/8)", en: "2,958,100 (Completes 40/8)" },
                ],
                [
                  { vi: "Lv.41 ➔ Lv.44", en: "Lv.41 ➔ Lv.44" },
                  { vi: "9 nấc / cấp", en: "9 steps / lvl" },
                  { vi: "900K ➔ 918K ➔ 945K ➔ 1,000K", en: "900K ➔ 918K ➔ 945K ➔ 1,000K" },
                  { vi: "15,595,400", en: "15,595,400" },
                  { vi: "450K ➔ 459K ➔ 472.5K ➔ 500K", en: "450K ➔ 459K ➔ 472.5K ➔ 500K" },
                  { vi: "7,797,700", en: "7,797,700" },
                  { vi: "225K ➔ 229.5K ➔ 236.25K ➔ 250K", en: "225K ➔ 229.5K ➔ 236.25K ➔ 250K" },
                  { vi: "3,898,850", en: "3,898,850" },
                ],
                [
                  { vi: "Lv.45 ➔ Lv.49 ➔ Lv.50 ⭐⭐⭐⭐⭐⭐ (+6 Bản sao)", en: "Lv.45 ➔ Lv.49 ➔ Lv.50 ⭐⭐⭐⭐⭐⭐ (+6 Copies)" },
                  { vi: "10 nấc / cấp", en: "10 steps / lvl" },
                  { vi: "1.01M ➔ 1.03M ➔ 1.05M ➔ 1.07M ➔ 1.09M", en: "1.01M ➔ 1.03M ➔ 1.05M ➔ 1.07M ➔ 1.09M" },
                  { vi: "20,845,400 (+13 Bản sao Lv.10–50)", en: "20,845,400 (+13 Copies Lv.10–50)" },
                  { vi: "505K ➔ 545K / cấp", en: "505K ➔ 545K / lvl" },
                  { vi: "10,422,700 (+13 Bản sao)", en: "10,422,700 (+13 Copies)" },
                  { vi: "252.5K ➔ 272.5K / cấp", en: "252.5K ➔ 272.5K / lvl" },
                  { vi: "5,211,350 (+13 Bản sao)", en: "5,211,350 (+13 Copies)" },
                ],
                [
                  { vi: "👑 Honor Level 1 ➔ 150 (Sau Lv.50)", en: "👑 Honor Level 1 ➔ 150 (Post-Lv.50)" },
                  { vi: "150 cấp Vinh Dự", en: "150 Honor Levels" },
                  {
                    vi: "50,000 / cấp (= 7,500,000) hoặc 40 Bản sao",
                    en: "50,000 / lvl (= 7,500,000) or 40 Copies",
                  },
                  { vi: "Tổng: 28,345,400", en: "Total: 28,345,400" },
                  {
                    vi: "25,000 / cấp (= 3,750,000) hoặc 40 Bản sao",
                    en: "25,000 / lvl (= 3,750,000) or 40 Copies",
                  },
                  { vi: "Tổng: 14,172,700", en: "Total: 14,172,700" },
                  {
                    vi: "12,500 / cấp (= 1,875,000) hoặc 40 Bản sao",
                    en: "12,500 / lvl (= 1,875,000) or 40 Copies",
                  },
                  { vi: "Tổng: 7,086,350", en: "Total: 7,086,350" },
                ],
              ],
            },
            {
              type: "paragraph",
              text: {
                vi: "💂 Thông số Kịch trần của Các Quân Trang Chủ Lực (Ở Mốc Tối Đa): (1) Nhóm Skin Vàng (Heavy Cavalry, Honor Guard, Siege Vehicle, Brave Fighter, Skeleton Soldier, Tree Spirit, Desert Knight, Divine Spirit): Mỗi Skin cộng Chỉ số Sở hữu Toàn cục (Owned): +14.38% ATK & +21.46% HP cho TOÀN BỘ Lính! Khi đeo trực tiếp vào Đội 1 (Equipped): Cộng +28% ATK Lính & +56% HP Lính kèm kỹ năng đặc thù (Heavy Cavalry: +11.2% Sát thương công thành & +70% Tốc độ hành quân PvP; Divine Spirit / Desert Knight / Tree Spirit: +4.2% Morale và +16.8% HP Lính Hệ khi đi thuần 6 tướng cùng hệ). (2) Nhóm Skin Tím (Bearskin Warrior, Samurai, Drum Corps, Elegant Butler, Logistic Follower): Mỗi Skin cộng Chỉ số Sở hữu Toàn cục (Owned): +11.49% ATK & +19.24% HP cho TOÀN BỘ Lính! Khi đeo trực tiếp (Equipped): Cộng +21% ATK Lính & +42% HP Lính (Bearskin Warrior cộng +49% ATK đánh quái bản đồ PvE; Samurai cộng +49% ATK công thành).",
                en: "💂 Max-Level Stats of Core Troop Skin Groups: (1) Legendary Skins (Heavy Cavalry, Honor Guard, Siege Vehicle, Brave Fighter, Skeleton Soldier, Tree Spirit, Desert Knight, Divine Spirit): Each skin grants a permanent Owned Passive of +14.38% ATK & +21.46% HP to ALL Soldiers! When Equipped on Queue 1: Grants +28% Soldier ATK & +56% Soldier HP plus specialized combat passives (Heavy Cavalry: +11.2% siege damage & +70% PvP march speed; Divine Spirit / Desert Knight / Tree Spirit: +4.2% Morale and +16.8% Faction Soldier HP with 6 same-faction heroes). (2) Epic Skins (Bearskin Warrior, Samurai, Drum Corps, Elegant Butler, Logistic Follower): Each skin grants a permanent Owned Passive of +11.49% ATK & +19.24% HP to ALL Soldiers! When Equipped: Grants +21% Soldier ATK & +42% Soldier HP (Bearskin Warrior adds +49% World Map PvE Boss ATK; Samurai adds +49% Castle Invasion ATK).",
              },
            },
          ],
        },
        {
          id: "sub-4-7-vip-master-table",
          title: {
            vi: "4.7. Bảng 7: Điểm Yêu Cầu, Quy Đổi Chi Phí ($) & Đặc Quyền VIP 1 ➔ VIP 20 (Tab VIP cost USD)",
            en: "4.7. Table 7: VIP Points, USD Cost Conversion & Perks Matrix VIP 1 ➔ VIP 20 (Tab VIP cost USD)",
          },
          blocks: [
            {
              type: "paragraph",
              text: {
                vi: "Trích xuất chính xác từ TopHeroes Tables - Max — Tỷ lệ quy đổi chuẩn: $1.00 = 6 Điểm VIP (1 USD = 6 VIP Points), kết hợp điểm VIP miễn phí mua từ Tiệm Điểm Bang Hội và đăng nhập hàng ngày:",
                en: "Extracted directly from TopHeroes Tables - Max — Standard conversion rate: $1.00 = 6 VIP Points (1 USD = 6 VIP Points), supplemented by free VIP Points purchased from the Guild Points Shop and daily login rewards:",
              },
            },
            {
              type: "table",
              caption: {
                vi: "Bảng 4.7: Điểm Yêu Cầu, Quy Đổi Chi Phí ($1.00 = 6 Điểm VIP) & Đặc Quyền VIP 1 ➔ VIP 20",
                en: "Table 4.7: Required VIP Points, USD Cost Conversion ($1.00 = 6 VIP Points) & Perks VIP 1 ➔ VIP 20",
              },
              headers: [
                { vi: "Cấp Độ VIP (VIP Level)", en: "VIP Level" },
                { vi: "Điểm VIP Yêu Cầu (VIP Points)", en: "Required VIP Points" },
                { vi: "Quy Đổi Chi Phí Nạp Tương Đương (USD Cost)", en: "Equivalent USD Spend" },
                {
                  vi: "Điểm Gãy Đặc Quyền Chiến Lược & Mở Khóa Cửa Hàng (VIP Perks & Shop Unlocks)",
                  en: "Strategic VIP Perks & Shop Unlocks",
                },
              ],
              rows: [
                [
                  { vi: "VIP 1", en: "VIP 1" },
                  { vi: "6 Điểm", en: "6 Points" },
                  { vi: "$1.00", en: "$1.00" },
                  {
                    vi: "Mở khóa gói đặc quyền khởi đầu và tăng tốc cơ bản.",
                    en: "Unlocks starter privilege bundle and basic speed bonuses.",
                  },
                ],
                [
                  { vi: "VIP 2", en: "VIP 2" },
                  { vi: "30 Điểm", en: "30 Points" },
                  { vi: "$5.00", en: "$5.00" },
                  {
                    vi: "Tăng giới hạn mua vật phẩm cơ bản trong VIP Shop.",
                    en: "Increases purchase limits for basic items in the VIP Shop.",
                  },
                ],
                [
                  { vi: "VIP 3", en: "VIP 3" },
                  { vi: "100 Điểm", en: "100 Points" },
                  { vi: "$16.67", en: "$16.67" },
                  {
                    vi: "Cộng thêm tốc độ xây dựng và sản lượng tài nguyên.",
                    en: "Adds construction speed and base resource production bonuses.",
                  },
                ],
                [
                  { vi: "🔥 VIP 4 (Mốc F2P Đầu)", en: "🔥 VIP 4 (Early F2P Milestone)" },
                  { vi: "300 Điểm", en: "300 Points" },
                  { vi: "$50.00 (Cày Free dễ dàng)", en: "$50.00 (Easily farmed F2P)" },
                  {
                    vi: "Điểm gãy Tân thủ: Mở khóa các ô mua Mảnh Tướng & Bình Thể Lực giảm giá hàng tuần trong VIP Shop.",
                    en: "Beginner Breakpoint: Unlocks weekly discounted Hero Shards and Stamina Potions in the VIP Shop.",
                  },
                ],
                [
                  { vi: "VIP 5", en: "VIP 5" },
                  { vi: "500 Điểm", en: "500 Points" },
                  { vi: "$86.67", en: "$86.67" },
                  {
                    vi: "Tăng số lượt trợ giúp Bang hội và tốc độ hồi phục.",
                    en: "Increases Guild Help capacity and recovery speed.",
                  },
                ],
                [
                  { vi: "🔥 VIP 6", en: "🔥 VIP 6" },
                  { vi: "1,000 Điểm", en: "1,000 Points" },
                  { vi: "$166.70", en: "$166.70" },
                  {
                    vi: "Mở rộng thêm hàng đợi thu thập và các gói giảm giá sâu Sách Kỹ Năng / Đá Cường Hóa.",
                    en: "Expands gathering queues and unlocks deeply discounted Skill Books and Enhancement Ore.",
                  },
                ],
                [
                  { vi: "VIP 7", en: "VIP 7" },
                  { vi: "3,000 Điểm", en: "3,000 Points" },
                  { vi: "$500.00", en: "$500.00" },
                  {
                    vi: "Cộng % ATK/HP toàn đội và mở khóa thêm ô mua Mảnh Vạn Năng Cam trong VIP Shop.",
                    en: "Boosts global queue ATK/HP % and unlocks additional Universal Legendary Shard slots in the VIP Shop.",
                  },
                ],
                [
                  { vi: "🔥 VIP 8 (Mốc Mid-game)", en: "🔥 VIP 8 (Mid-game Milestone)" },
                  { vi: "6,000 Điểm", en: "6,000 Points" },
                  { vi: "$1,000.00", en: "$1,000.00" },
                  {
                    vi: "Điểm gãy Low-Spender / F2P Lâu năm: Mở khóa đặc quyền tự động hóa nâng cao và lượng mảnh tướng Vàng hàng ngày.",
                    en: "Low-Spender / Veteran F2P Breakpoint: Unlocks advanced automation perks and daily Legendary Hero Shards.",
                  },
                ],
                [
                  { vi: "VIP 9", en: "VIP 9" },
                  { vi: "10,000 Điểm", en: "10,000 Points" },
                  { vi: "$1,667.00", en: "$1,667.00" },
                  {
                    vi: "Tăng mạnh giới hạn mua Đá Thăng Cấp Trang Bị Huyền Thoại (Legendary Promotion Stones).",
                    en: "Significantly increases weekly purchase limits for Legendary Promotion Stones.",
                  },
                ],
                [
                  { vi: "👑 VIP 10", en: "👑 VIP 10" },
                  { vi: "30,000 Điểm", en: "30,000 Points" },
                  { vi: "$5,000.00", en: "$5,000.00" },
                  {
                    vi: "Điểm gãy Dolphin: Cộng lớn Quy mô Hành quân (March Size) và chỉ số chiến đấu toàn cục.",
                    en: "Dolphin Breakpoint: Grants a major March Size boost and global combat stat multipliers.",
                  },
                ],
                [
                  { vi: "VIP 11", en: "VIP 11" },
                  { vi: "50,000 Điểm", en: "50,000 Points" },
                  { vi: "$8,667.00", en: "$8,667.00" },
                  {
                    vi: "Mở khóa các gói nguyên liệu Thần Thoại hiếm trong VIP Shop.",
                    en: "Unlocks rare Mythic progression material bundles in the VIP Shop.",
                  },
                ],
                [
                  { vi: "VIP 12", en: "VIP 12" },
                  { vi: "80,000 Điểm", en: "80,000 Points" },
                  { vi: "$13,330.00", en: "$13,330.00" },
                  {
                    vi: "Tăng tốc độ huấn luyện lính, nghiên cứu và chỉ số kháng/xuyên phòng thủ.",
                    en: "Boosts troop training speed, tech research speed, and defense/resistance penetration.",
                  },
                ],
                [
                  { vi: "VIP 13", en: "VIP 13" },
                  { vi: "120,000 Điểm", en: "120,000 Points" },
                  { vi: "$20,000.00", en: "$20,000.00" },
                  {
                    vi: "Đặc quyền Whale cấp cao trong chiến trường Liên Server (KvK / SvS).",
                    en: "High-tier Whale privileges in Cross-Server War (KvK / SvS) battlefields.",
                  },
                ],
                [
                  { vi: "VIP 14", en: "VIP 14" },
                  { vi: "160,000 Điểm", en: "160,000 Points" },
                  { vi: "$26,670.00", en: "$26,670.00" },
                  {
                    vi: "Cộng thêm % Sát thương Kỹ năng và Giảm sát thương toàn diện.",
                    en: "Adds global Skill Damage % and all-damage mitigation.",
                  },
                ],
                [
                  { vi: "👑 VIP 15", en: "👑 VIP 15" },
                  { vi: "200,000 Điểm", en: "200,000 Points" },
                  { vi: "$33,670.00", en: "$33,670.00" },
                  {
                    vi: "Đỉnh cao đặc quyền VIP tiêu chuẩn (mở khóa danh hiệu & hào quang tối thượng).",
                    en: "Apex standard VIP milestone (unlocks supreme title and aura privileges).",
                  },
                ],
                [
                  { vi: "VIP 16 ➔ VIP 20", en: "VIP 16 ➔ VIP 20" },
                  { vi: "300,000 ➔ 3,000,000 Điểm", en: "300,000 ➔ 3,000,000 Points" },
                  { vi: "$50,000.00 ➔ $500,000.00", en: "$50,000.00 ➔ $500,000.00" },
                  {
                    vi: "Cụm cấp độ VIP Mở rộng (VIP 16: 300K / $50K | VIP 17: 600K / $100K | VIP 18: 1M / $166K | VIP 19: 2M / $332K | VIP 20: 3,000,000 Điểm / $500,000.00).",
                    en: "Extended Whale VIP Brackets (VIP 16: 300K / $50K | VIP 17: 600K / $100K | VIP 18: 1M / $166K | VIP 19: 2M / $332K | VIP 20: 3,000,000 Points / $500,000.00).",
                  },
                ],
              ],
            },
            {
              type: "media_spotlight",
              mediaCode: "MED-8.4-03",
              tier: "tier4_youtube_ref",
              title: {
                vi: "Phân Tích Chuyên Sâu: Cách Dùng 12 Bảng Dữ Liệu Gốc Để Tối Ưu Hóa Ngân Sách Điểm Gãy",
                en: "Deep-Dive Video Reference: Using the 12 Master Quantitative Tables for Breakpoint Budgeting",
              },
              description: {
                vi: "Hướng dẫn thực hành đối chiếu trực tiếp 7 Bảng Cơ sở Dữ liệu Định lượng PRO (Faction Level, Mythic Gear, Lord Gear, Runes, Pets, Troop Skins, VIP 1–20) để lập kế hoạch xả nguyên liệu theo tuần sự kiện.",
                en: "Practical walkthrough cross-referencing the 7 PRO Master Quantitative Datasets (Faction Levels, Mythic Gear, Lord Gear, Runes, Pets, Troop Skins, VIP 1–20) to plan weekly event material dumps.",
              },
              videoChannel: "Top Heroes Official & Community Theorycraft",
              videoTitle: "Top Heroes Master Data Tables: Complete Breakpoint & Resource ROI Guide",
              videoTimestamp: "04:15 – 19:40",
              videoUrl: "https://www.youtube.com/results?search_query=top+heroes+gear+runes+pets+troop+skins+guide",
            },
          ],
        },
      ],
    },
    {
      id: "sec-5-multi-resource-breakpoint-allocation-case-study",
      isPro: true,
      title: {
        vi: "5. Kịch bản Thực chiến Nâng cao: Phân Bổ Ngân Sách Đa Tài Nguyên (250,000 Huân Chương, 180,000 Quặng & 150,000 Thức Ăn Pet) Bằng Bảng Số Liệu",
        en: "5. Advanced Tactical Case Study: Multi-Resource Breakpoint Allocation (250,000 Glory Medals, 180,000 Ore & 150,000 Pet Food) Using Master Tables",
      },
      blocks: [
        {
          type: "case_study",
          badge: {
            vi: "CASE STUDY ĐA TÀI NGUYÊN",
            en: "MULTI-RESOURCE BREAKPOINT CASE STUDY",
          },
          title: {
            vi: "Phẫu Thuật Ngân Sách Trước Ngày Thứ Sáu & Thứ Bảy Tuần B (Arms Race): 250,000 Glory Medals + 180,000 Quặng + 150,000 Thức Ăn Pet",
            en: "Pre-Arms Race Friday & Saturday Budget Audit: 250,000 Glory Medals + 180,000 Enhancement Ore + 150,000 Pet Food",
          },
          profileSummary: {
            vi: "Hồ sơ người chơi Mid-game chuẩn bị bước vào ngày Thứ Sáu và Thứ Bảy của Tuần B (Arms Race) với ngân sách trong túi đồ gồm đúng 250,000 Huân Chương (Glory Medals), 180,000 Quặng Cường Hóa (Enhancement Ore) và 150,000 Thức Ăn Pet (Pet Food). Mục tiêu: Sử dụng 12 Bảng Số Liệu Định Lượng để giải ngân đúng điểm gãy (ví dụ dùng 156,000 Quặng đẩy trọn bộ +20), đạt hiệu suất tăng lực chiến thực chiến cao nhất.",
            en: "A mid-game commander entering Friday and Saturday of Week B (Arms Race) holding 250,000 Glory Medals, 180,000 Enhancement Ore, and 150,000 Pet Food. Objective: Use the 12 Master Quantitative Tables to disburse resources exclusively on exact resonance breakpoints (such as spending 156,000 Ore for a full +20 set) for maximum combat power ROI.",
          },
          diagnostics: [
            {
              vi: "Bẫy Phản Xạ 1 (Đập Lẻ 1 Quân Trang Vàng Lv.20 ➔ Lv.21): Nếu đập dồn vào 1 Quân Trang Vàng đang ở Lv.20 để lên Lv.21 sẽ ngốn tới 228,000 Huân chương (gần hết 250,000 Huân chương) nhưng không mở khóa mốc Sao mới, chỉ cộng một lượng nhỏ chỉ số cơ bản.",
              en: "Impulse Trap 1 (Pushing a Single Lv.20 Legendary Skin to Lv.21): Dumping 228,000 Glory Medals (out of 250,000) to push one Legendary Troop Skin from Lv.20 to Lv.21 unlocks zero new Star milestones and yields minimal flat stats.",
            },
            {
              vi: "Bẫy Phản Xạ 2 (Đập Quặng Lệch Cấp & Xả Thức Ăn Pet Khi Thiếu Phôi): Nếu rải 180,000 Quặng lên 2 tướng khác nhau dừng ở +16/+17 sẽ không kích hoạt được Enhancement Master Lv.20 (vốn chỉ cần 156,000 Quặng cho 4 món từ +10 lên +20); xả 150,000 Thức ăn Pet khi chưa kiểm tra Phôi trùng sẽ bị kẹt trần cấp.",
              en: "Impulse Trap 2 (Uneven Gear Ore & Blind Pet Food Dumping): Spreading 180,000 Ore across two heroes to stop at +16/+17 fails to trigger Enhancement Master Lv.20 (which requires exactly 156,000 Ore for 4 pieces from +10 to +20), while dumping 150,000 Pet Food without checking promotion copies hits a hard level cap.",
            },
          ],
          metrics: [
            {
              label: {
                vi: "Hiệu Suất 250,000 Huân Chương (Glory Medals)",
                en: "250,000 Glory Medals Efficiency",
              },
              before: {
                vi: "1 Skin Vàng Lv.20 ➔ Lv.21 (228,000 Medals — 0 mốc Sao mới)",
                en: "1 Legendary Skin Lv.20 ➔ Lv.21 (228,000 Medals — 0 new Stars)",
              },
              after: {
                vi: "2 Skin Vàng + 2 Skin Tím đạt Lv.10 ⭐ (241,200 / 250,000 Medals)",
                en: "2 Legendary + 2 Epic Skins to Lv.10 ⭐ (241,200 / 250,000 Medals)",
              },
              delta: {
                vi: "+4 Tầng Owned Passive ATK/HP Toàn Quân",
                en: "+4 Global Owned Passive ATK/HP Tiers",
              },
            },
            {
              label: {
                vi: "Hiệu Suất 180,000 Quặng Cường Hóa (Enhancement Ore)",
                en: "180,000 Enhancement Ore Efficiency",
              },
              before: {
                vi: "Rải đều dừng ở +16/+17 (Không có hào quang cộng hưởng)",
                en: "Spread unevenly at +16/+17 (Zero resonance aura)",
              },
              after: {
                vi: "Dùng 156,000 Quặng kéo Full bộ 4 món Carry từ +10 lên +20 (Dư 24,000 Quặng)",
                en: "Spend 156,000 Ore for Full +20 Carry 4-piece set (Save 24,000 Ore)",
              },
              delta: {
                vi: "Kích hoạt Enhancement Master Lv.20",
                en: "Activates Enhancement Master Lv.20",
              },
            },
            {
              label: {
                vi: "Hiệu Suất 150,000 Thức Ăn Pet (Pet Food)",
                en: "150,000 Pet Food Efficiency",
              },
              before: {
                vi: "Nâng dàn trải nhiều Pet phụ kẹt ở Lv.9 / Lv.19",
                en: "Spread across secondary pets stuck at Lv.9 / Lv.19",
              },
              after: {
                vi: "Đột phá Pet Hệ Đội 1 qua mốc Lv.10 (40.00%) ➔ Lv.20 (44.00%)",
                en: "Break through Main Faction Pet Lv.10 (40.00%) ➔ Lv.20 (44.00%)",
              },
              delta: {
                vi: "+8% Hệ số chuyển đổi & +All Hero ATK/HP",
                en: "+8% Stat Conversion & +All Hero ATK/HP",
              },
            },
          ],
          recoverySteps: [
            {
              stepNumber: "1",
              title: {
                vi: "Bài toán 1 — Phân bổ 250,000 Huân Chương (Tra cứu Bảng 4.6 - Troop Skins)",
                en: "Problem 1 — Allocating 250,000 Glory Medals (Lookup Table 4.6 - Troop Skins)",
              },
              detail: {
                vi: "Tra cứu Bảng 4.6: để nâng 1 Quân Trang Vàng từ Lv.1 ➔ Lv.10 ⭐ chỉ tốn 80,400 Huân chương, và nâng 1 Quân Trang Tím từ Lv.1 ➔ Lv.10 ⭐ chỉ tốn 40,200 Huân chương. Với 250,000 Huân chương, người chơi nâng đồng loạt 2 Quân Trang Vàng (160,800) + 2 Quân Trang Tím (80,400) chạm mốc Điểm gãy Lv.10 ⭐ (tổng 241,200 Huân chương, dư 8,800), kích hoạt tức thì 4 tầng Chỉ số Sở hữu Toàn cục (Owned Passive ATK/HP) cho toàn bộ tài khoản!",
                en: "Consulting Table 4.6: upgrading 1 Legendary Troop Skin from Lv.1 ➔ Lv.10 ⭐ costs 80,400 Glory Medals, and 1 Epic Troop Skin from Lv.1 ➔ Lv.10 ⭐ costs 40,200 Glory Medals. With 250,000 Glory Medals, push 2 Legendary Skins (160,800) + 2 Epic Skins (80,400) simultaneously to the Lv.10 ⭐ breakpoint (241,200 Medals spent, 8,800 saved), immediately activating 4 global Owned Passive ATK/HP tiers!",
              },
              impactBadge: {
                vi: "241,200 / 250,000 Medals ➔ 4× Mốc 1★",
                en: "241,200 / 250,000 Medals ➔ 4× 1★ Milestones",
              },
            },
            {
              stepNumber: "2",
              title: {
                vi: "Bài toán 2 — Phân bổ 180,000 Quặng Cường Hóa (Tra cứu Bảng 1.3 - Gear Enhancement)",
                en: "Problem 2 — Allocating 180,000 Enhancement Ore (Lookup Table 1.3 - Gear Enhancement)",
              },
              detail: {
                vi: "Tra cứu Bảng 1.3: để nâng 1 món đồ từ +10 lên +20 cần đúng 39,000 Quặng, tức là 1 bộ 4 món cần đúng 156,000 Quặng. Trong ngân sách 180,000 Quặng, người chơi dùng 156,000 Quặng đẩy trọn vẹn bộ 4 món của Carry số 1 từ +10 lên Full +20 (kích hoạt ngay lập tức huy hiệu Enhancement Master Lv.20), và giữ lại 24,000 Quặng dư cho tuần tiếp theo.",
                en: "Consulting Table 1.3: upgrading 1 gear piece from +10 to +20 requires 39,000 Ore, meaning a 4-piece set takes exactly 156,000 Ore. From the 180,000 Ore budget, spend 156,000 Ore to push your #1 Carry's entire 4-piece set from +10 to Full +20 (instantly triggering Enhancement Master Lv.20) while banking the remaining 24,000 Ore.",
              },
              impactBadge: {
                vi: "156,000 / 180,000 Quặng ➔ Full +20",
                en: "156,000 / 180,000 Ore ➔ Full +20 Set",
              },
            },
            {
              stepNumber: "3",
              title: {
                vi: "Bài toán 3 — Phân bổ 150,000 Thức Ăn Pet (Tra cứu Bảng 4.5 - Pets)",
                en: "Problem 3 — Allocating 150,000 Pet Food (Lookup Table 4.5 - Pets)",
              },
              detail: {
                vi: "Tra cứu Bảng 4.5: kiểm tra trước trong kho đã có đủ Phôi Pet trùng (1 same ở Lv.10, 3 any ở Lv.20) hay chưa. Chỉ xả gói 150,000 Thức ăn Pet vào Thứ Sáu Tuần B đúng tới các mốc đột phá mở khóa Hệ số chuyển đổi (36.00% ➔ 40.00% ➔ 44.00%) và dòng cộng % All Hero ATK/HP.",
                en: "Consulting Table 4.5: verify in advance that you hold the required promotion copies (1 same at Lv.10, 3 any at Lv.20). Disburse your 150,000 Pet Food on Week B Friday strictly up to the breakthrough tiers that unlock higher Stat Conversion Rates (36.00% ➔ 40.00% ➔ 44.00%) and % All Hero ATK/HP passives.",
              },
              impactBadge: {
                vi: "Mở khóa Conversion 40% ➔ 44%",
                en: "Unlocks 40% ➔ 44% Conversion",
              },
            },
          ],
          conclusion: {
            vi: "Kết luận Định lượng: Với cùng ngân sách 250,000 Huân chương, 180,000 Quặng và 150,000 Thức ăn Pet, việc tra cứu bảng số liệu để giải ngân đúng lô điểm gãy (241,200 Medals cho 4 Skin Lv.10 ⭐ + 156,000 Quặng cho Full bộ +20 + đột phá Pet theo phôi) mang lại lượng Lực chiến thực chiến gấp gần 3 lần so với đập lẻ theo cảm tính.",
            en: "Quantitative Takeaway: With the exact same budget of 250,000 Glory Medals, 180,000 Ore, and 150,000 Pet Food, using the master tables to disburse in exact breakpoint batches (241,200 Medals for four Lv.10 ⭐ skins + 156,000 Ore for a Full +20 gear set + copy-gated Pet breakthroughs) yields nearly 3x the effective combat power of impulse upgrading.",
          },
        },
      ],
    },
  ],
};

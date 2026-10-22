import type { GuideArticle } from "../../types";

export const ARTICLE_3_4_DOUBLE_DIP_SCHEDULE: GuideArticle = {
  code: "3.4",
  slug: "double-dip-schedule",
  categorySlug: "events",
  badge: "HOT",
  readingMinutes: 11,
  title: {
    vi: "Nghệ Thuật Double-Dip & Ma Trận Giao Thoa Tài Nguyên Toàn Diện (Master Double-Dip Matrix)",
    en: "The Art of Double-Dipping & The Master Resource Overlap Matrix",
  },
  summary: {
    vi: "Làm chủ cơ chế 'Một mũi tên trúng 2–3 đích (Double-Dip / Triple-Dip)': Bảng tra cứu toàn diện thời điểm xả đạt hiệu suất 300% / 200% / 100% / 0% cho mọi loại vật phẩm trong túi đồ.",
    en: "Master Double-Dipping and Triple-Dipping mechanics: The definitive lookup matrix mapping 300% / 200% / 100% / 0% efficiency windows for every inventory item.",
  },
  tldr: {
    coreRule: {
      vi: "**Định Nghĩa `Double-Dip (200%)` & `Triple-Dip (300%)`:** Là kỹ thuật chờ cho `2 đến 3 sự kiện` có cùng điều kiện tính điểm giao thoa trên cùng một khung giờ.\n• **Lợi tức gộp:** Chỉ bấm xả tài nguyên tại đúng điểm giao thoa để `1 vật phẩm` ăn đồng thời `2–3 bảng phần thưởng`.",
      en: "**Defining `Double-Dip (200%)` & `Triple-Dip (300%)`:** The art of waiting until `2 to 3 events` with identical scoring conditions overlap within the exact same time window.\n• **Compounded yield:** Unload only during overlap windows so `1 item` claims rewards from `2–3 event boards` simultaneously.",
    },
    immediateAction: {
      vi: "**Phân Tách Túi Đồ Thành 2 Nhóm:** `Nhóm A 'Đập Ngay'` gồm đúc `Hero Gear`, Đá Cường hóa thường `+10/+20/+30/+40`, và Mảnh Tướng Tím Kinh tế mở `Trait 3` ở mốc `12★ = 2 Sao Trắng = 300 Mảnh`.\n• **Nhóm B 'Găm Chờ Giao Thoa':** Khóa chặt Mảnh Tướng Vàng, `Hồn Đá Đỏ`, nguyên liệu `Lord Gear`, `Runes`, `Relics`, `Pets` và `Tăng tốc`.",
      en: "**Divide Inventory into 2 Groups:** `Group A 'Spend Immediately'` covers `Hero Gear` forging, regular Enhancement Ore `+10/+20/+30/+40`, and Epic Economy Shards unlocking `Trait 3` at `12★ = 2 White Stars = 300 Shards`.\n• **Group B 'Hoard for Overlap':** Lock Universal Shards, `Soul Stones`, `Lord Gear`, `Runes`, `Relics`, `Pet Food`, and `Speedups`.",
    },
    strictTaboo: {
      vi: "**Cấm Xả Vùng `0%` Hoặc Lệch Ngày:** Tuyệt đối KHÔNG xả tài nguyên ngoài sự kiện (`0%`) hoặc xả nhầm vào ngày không tính điểm.\n• **Hai bẫy chí mạng:** Cấm găm Đồ Chúa Tể (`Lord Gear`) sang Thứ Bảy Ngày 6 `GAR/KvK` và cấm xả Thánh Tích (`Relics`) vào Thứ Sáu Ngày 5 `GAR` tiêu chuẩn!",
      en: "**Never Spend in `0%` or Wrong-Day Traps:** NEVER spend hoarding resources outside events (`0%`) or dump items on a day that does not score them.\n• **Two fatal traps:** Never save `Lord Gear` for Saturday Day 6 of `GAR/KvK`, and never spend `Relics` on Friday Day 5 of standard `GAR`!",
    },
  },
  keyTakeaways: [
    {
      vi: "**Kiến Trúc 3 Lớp Sự Kiện:** Lớp 1 (`7-Day Guild Race / GAR / KvK`), Lớp 2 (`Vệ tinh, Guild Rush 2 ngày & 8 Sub-Events`), Lớp 3 (`Hourly Arms Race 4h — 6 ca/ngày`).\n• **4 Bậc hiệu suất:** Tạo ra 4 cấp độ xả tài nguyên từ `0% (Forbidden)` ➔ `100% (Single-Dip)` ➔ `200% (Double-Dip)` ➔ `300% (Triple-Dip)`.",
      en: "**3 Overlapping Event Layers:** Layer 1 (`7-Day Guild Race / GAR / KvK`), Layer 2 (`Satellites, 2-Day Guild Rush & 8 Sub-Events`), Layer 3 (`4-Hour Hourly Arms Race — 6 shifts/day`).\n• **4 Efficiency tiers:** Creates 4 spending tiers from `0% (Forbidden)` ➔ `100% (Single-Dip)` ➔ `200% (Double-Dip)` ➔ `300% (Triple-Dip)`.",
    },
    {
      vi: "**Ranh Giới `Hero Gear` vs `Lord Gear`:** Trang bị Tướng (`Hero Gear` trong Lò rèn + Đá Cường hóa thường `+10/+20/+30/+40`) hoàn toàn KHÔNG tính điểm `GAR/KvK` — phải đúc và đập ngay cho Đội 1.\n• **Đồ Chúa Tể (`Lord Gear`):** Găm kỹ chờ Thứ Sáu–CN Kỳ Thi Đấu Hội hoặc Thứ Tư–Năm Kỳ GAR/KvK (cấm chờ Thứ Bảy Ngày 6).",
      en: "**`Hero Gear` vs. `Lord Gear` Boundary:** `Hero Gear` (Blacksmith forging + regular Enhancement Ore `+10/+20/+30/+40`) grants `0 points` in `GAR/KvK` — forge and upgrade immediately for Queue 1.\n• **`Lord Gear` (Avatar):** Hoard strictly for Fri–Sun Guild Race or Wed–Thu GAR/KvK (NEVER wait until Saturday Day 6).",
    },
    {
      vi: "**Ngoại Lệ Kinh Tế Nhóm A2 (`12★ = 300 Mảnh`):** Mảnh Tướng Tím Kinh tế (`Knight`, `Brawler`, `Ranger`) khi CHƯA đạt `12★ (2 Sao Trắng = 300 Mảnh)` bắt buộc phải nâng ngay.\n• **Mở khóa động cơ kinh tế:** Kích hoạt ngay `Trait 3 (+25% đến +30% tốc độ Nghiên cứu / Luyện lính)` vĩnh viễn.",
      en: "**Group A2 Economic Exception (`12★ = 300 Shards`):** Epic Economy Hero Shards (`Knight`, `Brawler`, `Ranger`) below `12★ (2 White Stars = 300 Shards)` must be upgraded immediately.\n• **Unlock economy engine:** Permanently activates `Trait 3 (+25% to +30% Research / Troop Training speed)`.",
    },
    {
      vi: "**Cú Nổ `Triple-Dip 300%` Chiều Thứ Năm Kỳ GAR/KvK:** Xả trong 15 phút (`10:15–10:30 UTC / 17:15–17:30 Giờ VN`) với `365 Mảnh Vàng`, `9 Hồn Đá Đỏ (1 + 2 + 2 + 4 = 9)`, `6,000 Sách`, `240 Vé` và `Lord Gear`.\n• **Hoàn vốn khổng lồ:** Thu về `9,800` Kim Cương, `42 Mảnh Vàng`, `1,200 Sách` và `65h Tăng tốc` (tương đương gói `~$49.99` miễn phí).",
      en: "**Thursday `300% Triple-Dip` Burst (GAR/KvK):** Unload in 15 minutes (`10:15–10:30 UTC`) with `365 Universal Shards`, `9 Soul Stones (1 + 2 + 2 + 4 = 9)`, `6,000 Skill Books`, `240 Tokens`, and `Lord Gear`.\n• **Massive rebate:** Returns `9,800` Diamonds, `42 Universal Shards`, `1,200 Skill Books`, and `65h Speedups` (worth `~$49.99` free).",
    },
  ],
  keywords: [
    "Double-Dip",
    "Triple-Dip",
    "Single-Dip",
    "300%",
    "200%",
    "100%",
    "0%",
    "Master Double-Dip Matrix",
    "Hero Gear",
    "Lord Gear",
    "Soul Stone",
    "120,000",
    "40,000",
    "6,000",
    "12,000–18,000",
    "Glory Medals",
    "Decor Tokens",
    "Guild Rush",
    "Hourly Arms Race",
  ],
  sourceFiles: [
    "docs/06-game-guides/07-standardized-web-guides/group-3-events-double-dip/3.4-double-dip-schedule.md",
    "docs/06-game-guides/01-core-strategic-topics/topic-6-biweekly-event-schedule-week-a-b.md",
    "docs/06-game-guides/05-events-and-community-guides/event-strategy-hub-guide.md",
    "docs/06-game-guides/00-master-dashboard/master-dashboard-7-topics.md",
  ],
  freeSections: [
    {
      id: "sec-1-three-event-layers-and-efficiency",
      title: {
        vi: "1. Giải thích Cơ chế Cốt lõi: 3 Lớp Sự Kiện Chồng Xếp & 4 Cấp Độ Hiệu Suất (0% ➔ 100% ➔ 200% ➔ 300%)",
        en: "1. Core Mechanics: The 3 Overlapping Event Layers & 4 Resource Efficiency Tiers (0% to 300%)",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "**Kiến trúc 3 Lớp Chồng Xếp:** Trong Top Heroes, hệ thống sự kiện được thiết kế theo `3 Lớp Chồng Xếp Nhau` — hãy kiểm tra trực tiếp tại `Event ➔ Lịch Event` (cột `02:00 UTC / 09:00 Giờ VN` Thứ Hai).\n• **Đòn bẩy F2P:** Hiểu rõ cách 3 lớp này giao thoa giúp biến `1 đơn vị tài nguyên` thành `2–3 lần phần thưởng hoàn lại`.",
            en: "**3 Overlapping Event Layers:** In Top Heroes, events are engineered around `3 Overlapping Event Layers` — always verify directly via `Event ➔ Event Calendar` (Monday `02:00 UTC` column).\n• **F2P leverage:** Mastering how these 3 layers intersect turns `1 unit of resource` into `2–3x rebate rewards`.",
          },
        },
      ],
      subSections: [
        {
          id: "sub-1-1-three-overlapping-layers",
          title: {
            vi: "1.1. Giải Phẫu 3 Lớp Sự Kiện Chồng Xếp Nhau (3 Overlapping Event Layers)",
            en: "1.1. Anatomy of the 3 Overlapping Event Layers",
          },
          badge: {
            vi: "3 LỚP SỰ KIỆN",
            en: "3 EVENT LAYERS",
          },
          blocks: [
            {
              type: "list",
              ordered: true,
              items: [
                {
                  vi: "**Lớp 1 — Sự Kiện Trục Chính 7 Ngày (7-Day Macro Event):** Kỳ Thi Đấu Hội chạy bảng 9 ô `Thi Đấu Hội (Guild Race)`; Kỳ GAR/KvK chạy `GAR / KvK / Top Lord` với 6 Ngày Chủ Đề cố định từ Thứ Hai đến Thứ Bảy.",
                  en: "**Layer 1 — 7-Day Macro Event:** Guild Race Mode runs the 9-slot `Guild Race` task board; GAR/KvK Mode runs `Guild Arms Race (GAR)`, `Kingdom Duel (KvK)`, or `Top Lord` featuring 6 Fixed Daily Themes.",
                },
                {
                  vi: "**Lớp 2 — Vệ Tinh, Guild Rush 2 Ngày & 8 Sự Kiện Phụ:** Gồm sự kiện Vệ tinh (Đế Quốc Hắc Ám, Cự Ma), lịch `Guild Rush 2 Ngày` (Kỳ Guild Race: Pet/Relic/Lord Gear; Kỳ GAR/KvK: Xây/Tướng/Decor) và 8 sự kiện phụ.",
                  en: "**Layer 2 — Satellite, Fixed 2-Day Guild Rush & 8 Sub-Events:** Includes Satellite events (Dark Empire, Giant Raid), `2-Day Guild Rush` (Guild Race: Pets/Relics/Lord Gear; GAR/KvK: Build/Hero/Decor), and 8 sub-events.",
                },
                {
                  vi: "**Lớp 3 — Sự Kiện Giờ Xoay Vòng 4 Tiếng (Hourly Arms Race):** Chạy liên tục `6 ca/ngày` (mỗi ca 4h) với 5 chủ đề: `Xây Lãnh Thổ`, `Nghiên Cứu Công Nghệ`, `Mở Rộng Quân Đội`, `Bồi Dưỡng Anh Hùng`, `Loại Trừ Mối Nguy`.",
                  en: "**Layer 3 — 4-Hour Hourly Arms Race:** Runs `6 shifts/day` (4 hours/shift) rotating through 5 themes: `Territory Construction`, `Tech Research`, `Army Expansion`, `Hero Development`, and `Threat Elimination`.",
                },
              ],
            },
          ],
        },
        {
          id: "sub-1-2-four-efficiency-tiers",
          title: {
            vi: "1.2. Định Nghĩa 4 Cấp Độ Hiệu Suất Xả Tài Nguyên (0% ➔ 100% ➔ 200% ➔ 300%)",
            en: "1.2. The 4 Resource Spending Efficiency Tiers (0% ➔ 100% ➔ 200% ➔ 300%)",
          },
          badge: {
            vi: "4 CẤP HIỆU SUẤT",
            en: "4 EFFICIENCY TIERS",
          },
          blocks: [
            {
              type: "list",
              items: [
                {
                  vi: "**[0% Forbidden] — Đốt Tài Nguyên (Cấm Xả Tuyệt Đối):** Xả vật phẩm vào ngày thường không có sự kiện hoặc lệch ngày tính điểm (như đập `Lord Gear` vào Thứ Bảy Kỳ GAR/KvK), nhận về `0 Kim Cương` và `0 rương thưởng`.",
                  en: "**[0% Forbidden] — Resource Burn (Strictly Prohibited):** Spending items on regular off-days or wrong scoring days (such as upgrading `Lord Gear` on Saturday of GAR/KvK), receiving `0 Diamonds` and `0 event chests`.",
                },
                {
                  vi: "**[100% Single-Dip] — Đạt Chuẩn Cơ Bản:** Xả vật phẩm khi chỉ có `1 sự kiện duy nhất` đang tính điểm (như xả Thức ăn Pet ở `Guild Rush` đầu Kỳ Thi Đấu Hội) — chỉ xả vừa đủ mốc rương cá nhân cơ bản, cấm xả lố.",
                  en: "**[100% Single-Dip] — Baseline Standard:** Spending items when only `1 standalone event` scores them (e.g., feeding Pets in Guild Race `Guild Rush`) — spend just enough for basic milestone chests, never overspend.",
                },
                {
                  vi: "**[200% Double-Dip] — Một Mũi Tên Trúng 2 Đích:** Canh `Lớp 1 + Lớp 2` (hoặc `Lớp 1 + Lớp 3`) trùng chủ đề (như Ngày 5–6 Kỳ Guild Race nhận NV Vàng `Lord Gear` trùng `Guild Rush`) để 1 lần nâng ăn điểm cả 2 bảng!",
                  en: "**[200% Double-Dip] — Two Birds with One Stone:** Timing your spend when `Layer 1 + Layer 2` (or `Layer 1 + Layer 3`) align (e.g., Guild Race Gold `Lord Gear` task + `Guild Rush`) so 1 upgrade scores on both boards!",
                },
                {
                  vi: "**[300% Triple-Dip ★] — Điểm Nổ Tối Thượng:** Canh `Giờ Vàng 4h (Lớp 3)` trong `Ngày GAR/KvK (Lớp 1)` trùng `Guild Rush (Lớp 2)` (như `10:00–14:00 UTC / 17:00–21:00 Giờ VN` Thứ Năm) để nổ điểm cả 3 sự kiện!",
                  en: "**[300% Triple-Dip ★] — Ultimate Burst Window:** Unload inside the `4-Hour Golden Window (Layer 3)` on the matching `GAR/KvK Theme Day (Layer 1)` + `Guild Rush (Layer 2)` to score across 3 events simultaneously!",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "sec-2-spend-now-vs-hoard-boundary",
      title: {
        vi: "2. Chiến thuật Tối ưu cho F2P & Low-Spender: Bảng Phân Định Ranh Giới 'Đập Ngay' vs 'Ngâm Chờ'",
        en: "2. F2P & Low-Spender Strategy: The Boundary Between 'Spend Immediately' (Group A) and 'Hoard for Overlap' (Group B)",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "**Sai lầm phổ biến ở cả 3 Phe (`League`, `Horde`, `Nature`):** Cái cần giữ lại đem xả sớm, còn cái không bao giờ tính điểm sự kiện lại nhịn nâng làm kẹt tiến độ Đội 1.\n• **Giải pháp:** Dùng bộ nhận diện trực quan và bảng phân định ranh giới dưới đây để dọn dẹp túi đồ ngay hôm nay.",
            en: "**Common mistake across all 3 Factions (`League`, `Horde`, `Nature`):** Prematurely spending items that should be hoarded, while holding back items that NEVER score event points.\n• **Fix:** Use the visual spotlight cards and boundary table below to organize your inventory today.",
          },
        },
        {
          type: "media_spotlight",
          mediaCode: "MED-3.4-01",
          tier: "tier2_annotated_ui",
          title: {
            vi: "Bộ Nhận Diện 12 Nhóm Vật Phẩm Cốt Lõi Trong Túi Đồ (Inventory Core Asset Map)",
            en: "12 Core Inventory Item Categories Visual Map (Spend Now vs. Hoard for Overlap)",
          },
          description: {
            vi: "Bộ icon phân loại các nhóm vật phẩm cốt lõi trong túi đồ (Universal Shard, Soul Stone, Skill Book, Lord Gear Blueprint, Rune Dust, Pet Food, Relic Scroll, Dragon Essence) theo quy tắc Đập Ngay (Nhóm A) và Găm Chờ Giao Thoa (Nhóm B).",
            en: "Visual classification of core inventory assets (Universal Shard, Soul Stone, Skill Book, Lord Gear Blueprint, Rune Dust, Pet Food, Relic Scroll, Dragon Essence) mapped to Group A (Spend Immediately) vs. Group B (Hoard for 200%–300% Overlap).",
          },

          annotations: [
            {
              kind: "do",
              label: {
                vi: "[Nhóm A1] — Đồ Tướng (Hero Gear & Enhancement Ore +10/+20/+30/+40)",
                en: "[Group A1] — Hero Gear Forging & Enhancement Ore (+10/+20/+30/+40)",
              },
              detail: {
                vi: "Đúc trang bị Vàng đúng Dấu Hệ (+30%) và đập đá cường hóa thường trong Lò rèn hoàn toàn KHÔNG tính điểm GAR/KvK hay Guild Race ➔ Đập ngay lập tức cho Đội 1!",
                en: "Forging faction-matching Legendary Hero Gear (+30% bonus) and spending regular Enhancement Ore in the Blacksmith grant 0 points in GAR/KvK or Guild Race ➔ Upgrade Queue 1 immediately!",
              },
            },
            {
              kind: "do",
              label: {
                vi: "[Nhóm A2] — Mảnh Tướng Tím Kinh Tế Dưới 12 Sao (2 Sao Trắng = 300 Mảnh)",
                en: "[Group A2] — Epic Economy Heroes Below 12 Stars (2 White Stars = 300 Shards)",
              },
              detail: {
                vi: "Knight, Brawler và Ranger khi chưa đạt 12 Sao (2 Sao Trắng = 300 Mảnh) phải nâng ngay để mở khóa Trait 3 (+25% đến +30% tốc độ Nghiên cứu / Luyện lính).",
                en: "Knight, Brawler, and Ranger below 12 Stars (2 White Stars = 300 Shards) must be upgraded immediately to unlock Trait 3 (+25% to +30% Research / Troop Training speed).",
              },
            },
            {
              kind: "dont",
              label: {
                vi: "[Nhóm B] — Mảnh Vàng, Hồn Đá Đỏ (120,000đ), Sách Kỹ Năng, Vé Chiêu Mộ, Mảnh UW & Lõi Sắt (6,000đ)",
                en: "[Group B] — Universal Shards, Soul Stones (120,000 pts), Skill Books, Recruit Tokens, UW Shards & Iron Cores (6,000 pts)",
              },
              detail: {
                vi: "Tuyệt đối cấm xả tự do ngày thường! Khóa chặt 100% chờ khung Giờ Vàng 10:00–14:00 UTC (17:00–21:00 Giờ VN) Thứ Năm Kỳ GAR/KvK để ăn trọn cú nổ Triple-Dip 300%.",
                en: "Strictly forbidden to spend on regular days! Lock 100% in your bag until Thursday 10:00–14:00 UTC of GAR/KvK Week to trigger the 300% Triple-Dip burst.",
              },
            },
            {
              kind: "info",
              label: {
                vi: "[Nhóm B] — Đồ Chúa Tể (Lord Gear), Cổ Ngữ (Runes), Thánh Tích (Relics), Pet, Quân Trang & Trang Trí",
                en: "[Group B] — Lord Gear, Runes, Relics, Pets, Glory Medals & Decor Tokens",
              },
              detail: {
                vi: "Mỗi nhóm có khung ngày cộng điểm chính và phụ riêng biệt (VD: Lord Gear xả Ngày 5–7 Kỳ Thi Đấu Hội hoặc Ngày 3–4 Kỳ GAR/KvK; Glory Medals & Decor Tokens xả Thứ Bảy Ngày 6 Kỳ GAR/KvK).",
                en: "Each category has strict primary and secondary scoring days (e.g., Lord Gear on Days 5–7 Guild Race or Days 3–4 GAR/KvK; Glory Medals & Decor Tokens on Saturday Day 6 GAR/KvK).",
              },
            },
          ],
        },
        {
          type: "widget",
          widgetType: "biweekly_event_calendar",
        },
        {
          type: "media_spotlight",
          mediaCode: "MED-3.4-02",
          tier: "tier2_annotated_ui",
          title: {
            vi: "Phân Vùng Túi Đồ Thực Chiến: Khung Xanh 'Đập Ngay' vs Khung Đỏ 'Khóa Chờ Giao Thoa'",
            en: "Annotated Inventory Bag Split: Green Zone 'Spend Immediately' vs. Red Zone 'Lock for Overlap'",
          },
          description: {
            vi: "Ảnh chụp màn hình Túi Đồ (Inventory Bag) chia làm 2 nửa rõ rệt: Khung Xanh Lá (Đập Ngay) cho Quặng Đồ Tướng và Khung Đỏ (Khóa Chờ Thứ Năm/Thứ Sáu Kỳ GAR/KvK) cho Mảnh Vàng, Hồn Đá Đỏ, Rương Cổ Ngữ.",
            en: "Annotated Inventory Bag screenshot divided into two clear zones: Green Frame (Spend Immediately) for Hero Gear Ore and Red Frame (Lock for Thu/Fri GAR/KvK) for Universal Shards, Soul Stones, and Rune Chests.",
          },

          annotations: [
            {
              kind: "do",
              label: {
                vi: "Khung Xanh Lá (Đập Ngay Lập Tức)",
                en: "Green Frame (Spend Immediately)",
              },
              detail: {
                vi: "Thỏi Vàng & Quặng Đúc Đồ Tướng (Hero Gear Forging), Đá Cường Hóa Thường (+10/+20/+30/+40) và Mảnh Tướng Tím Kinh tế chưa chạm mốc 12 Sao (2 Sao Trắng = 300 Mảnh).",
                en: "Hero Gear Forging Ingots/Ores, regular Enhancement Ore (+10/+20/+30/+40), and Epic Economy Hero Shards below 12 Stars (2 White Stars = 300 Shards).",
              },
            },
            {
              kind: "dont",
              label: {
                vi: "Khung Đỏ (Khóa Chặt Chờ Điểm Nổ 200%–300%)",
                en: "Red Frame (Strictly Lock for 200%–300% Burst Windows)",
              },
              detail: {
                vi: "13 nhóm vật phẩm tính điểm sự kiện (Mảnh Vàng, Hồn Đá Đỏ 120,000đ, Sách Kỹ Năng, Vé Chiêu Mộ, Lord Gear, Runes, Relics, Pets, Speedups, Glory Medals, Decor Tokens) giúp hoàn vốn 30%–50%.",
                en: "All 13 event-scoring item categories (Universal Shards, 120,000-pt Soul Stones, Skill Books, Recruit Tokens, Lord Gear, Runes, Relics, Pets, Speedups, Glory Medals, Decor Tokens) yielding a 30%–50% rebate.",
              },
            },
          ],
        },
        {
          type: "table",
          caption: {
            vi: "Bảng Phân Định Ranh Giới: Vật Phẩm Nào KHÔNG Tính Điểm (Nhóm A1/A2) vs CÓ Tính Điểm Sự Kiện (Nhóm B)?",
            en: "Boundary Classification Table: Non-Scoring / Immediate ROI Items (Groups A1/A2) vs. Event-Scoring Hoard Items (Group B)",
          },
          headers: [
            {
              vi: "Nhóm Phân Loại",
              en: "Classification Group",
            },
            {
              vi: "Danh Sách Vật Phẩm Cụ Thể",
              en: "Specific Inventory Items",
            },
            {
              vi: "Quy Tắc Hành Động Chuẩn Cho Cả 3 Phe Phái",
              en: "Standard Action Rule (All 3 Factions)",
            },
            {
              vi: "Lý Do Cơ Chế Trong Game",
              en: "Underlying Game Mechanics",
            },
          ],
          rows: [
            [
              {
                vi: "[NHÓM A1] ĐẬP NGAY LẬP TỨC (Không cần chờ sự kiện)",
                en: "[GROUP A1] SPEND IMMEDIATELY (No event wait required)",
              },
              {
                vi: "1. Thỏi Vàng & Quặng Đúc Đồ Tướng (Hero Gear Forging) | 2. Đá Cường Hóa Đồ Tướng Thường (Enhancement Ore +10/+20/+30/+40)",
                en: "1. Gold Ingots & Hero Gear Forging Ores (Hero Gear Forging) | 2. Regular Hero Gear Enhancement Ore (+10/+20/+30/+40)",
              },
              {
                vi: "Đúc và đập ngay cho Đội 1 ngay khi đủ nguyên liệu để chạm mốc Cộng hưởng +10 / +20 / +30 / +40!",
                en: "Forge and upgrade immediately for Queue 1 as soon as you have enough materials to hit the +10 / +20 / +30 / +40 Gear Resonance milestones!",
              },
              {
                vi: "Đúc trang bị Tướng trong Lò rèn (Blacksmith) và đập đá cường hóa thường hoàn toàn KHÔNG tính điểm trong GAR, KvK hay Guild Race. Nhịn nâng chỉ làm Đội 1 yếu đi trong Đấu trường và PvE!",
                en: "Forging Hero Gear in the Blacksmith and spending regular Enhancement Ore grant ZERO points in GAR, KvK, or Guild Race. Holding them back only weakens Queue 1 in Arena and PvE!",
              },
            ],
            [
              {
                vi: "[NHÓM A2] ĐẬP NGAY LẬP TỨC (Ngoại lệ Kinh tế)",
                en: "[GROUP A2] SPEND IMMEDIATELY (Economic Exception)",
              },
              {
                vi: "3. Mảnh Tướng Tím Kinh Tế (Knight, Brawler, Ranger) khi CHƯA đạt 12 Sao (2 Sao Trắng = 300 Mảnh)",
                en: "3. Epic Economy Hero Shards (Knight, Brawler, Ranger) while BELOW 12 Stars (2 White Stars = 300 Shards)",
              },
              {
                vi: "Nâng ngay lập tức lên mốc 12 Sao (2 Sao Trắng = 300 Mảnh) để mở khóa ô Trait 3 (+25% đến +30% Tốc độ Nghiên cứu / Luyện lính)!",
                en: "Upgrade immediately to 12 Stars (2 White Stars = 300 Shards) to unlock Trait 3 (+25% to +30% Research / Troop Training speed)!",
              },
              {
                vi: "Lợi tức giảm 25–30% thời gian nghiên cứu/huấn luyện vĩnh viễn cho toàn tài khoản có giá trị lớn gấp trăm lần vài điểm sự kiện lẻ tẻ của mảnh Tím. Khi đã qua mốc 12 Sao thì mới bắt đầu tích mảnh Tím chờ Thứ Năm Kỳ GAR/KvK.",
                en: "Permanent 25–30% research and troop training time reduction across your entire account is worth 100x more than minor event points from Epic shards. Only hoard Epic shards for Thursday of GAR/KvK Week after reaching 12 Stars.",
              },
            ],
            [
              {
                vi: "[NHÓM B] GĂM CHỜ DOUBLE-DIP (Cấm xả tự do — 13 Nhóm Vật Phẩm)",
                en: "[GROUP B] HOARD FOR DOUBLE-DIP (Strictly Lock — 13 Item Categories)",
              },
              {
                vi: "1. Mảnh Tướng Vàng/Đỏ, Hồn Đá Đỏ (120,000đ), Sách Kỹ Năng, Vé Chiêu Mộ, Mảnh UW (6,000đ), Lõi Sắt (6,000đ) | 2. Đồ Chúa Tể (Lord Gear: Đá Xanh, Dây Gai, Bản Vẽ, Máu Rồng), Quân Trang (Glory Medals), Trang Trí (Decor Tokens) | 3. Cổ Ngữ (Runes), Thánh Tích (Relics), Thú Cưng (Pets), Anh Linh (Heroic Spirits), Cự Thú (Behemoth) | 4. Mọi loại Tăng Tốc, Đá Rồng (Dragon Essence), Thể Lực (Stamina)",
                en: "1. Legendary/Mythic Shards, Soul Stones (120,000 pts), Skill Books, Recruit Tokens, UW Shards (6,000 pts), Meteorite Iron Cores (6,000 pts) | 2. Lord Gear (Refined Metal, Magic Thread, Orichalcum, Dragon Blood), Troop Skins (Glory Medals), Castle Decor (Decor Tokens) | 3. Runes, Relics, Pets, Heroic Spirits, Behemoth | 4. All Speedups, Dragon Essence, Stamina",
              },
              {
                vi: "Khóa chặt 100% trong túi đồ! Chỉ mở khóa xả theo đúng lịch giao thoa 200% – 300% tại Bảng Ma Trận 13 Nhóm Vật Phẩm ở Phần II.",
                en: "Lock 100% in your inventory! Only unlock and spend during the exact 200%–300% overlap windows mapped in the 13-Item Master Matrix in Part II.",
              },
              {
                vi: "Đây là nguồn cung cấp 95% điểm số của toàn bộ các sự kiện lớn nhỏ trong game. Xả đúng điểm giao thoa giúp hoàn vốn từ 30% đến 50% lượng tài nguyên đã tiêu!",
                en: "These items generate 95% of all points across major and minor events. Spending them exclusively during overlap windows rebates 30% to 50% of the resources consumed!",
              },
            ],
          ],
        },
      ],
    },
    {
      id: "sec-3-double-dip-pitfalls",
      title: {
        vi: "3. Những Cạm bẫy Phổ biến & Cách Phòng tránh (Common Pitfalls)",
        en: "3. Common Double-Dip Pitfalls & Inventory Discipline",
      },
      blocks: [
        {
          type: "table",
          caption: {
            vi: "3 Cạm Bẫy Phổ Biến Làm Mất Double-Dip & Thọt Lực Chiến Đội 1",
            en: "3 Common Pitfalls That Ruin Double-Dipping & Stall Queue 1 Combat Power",
          },
          headers: [
            {
              vi: "Sai lầm Phổ biến (Mất Double-Dip & Thọt Lực Chiến)",
              en: "Common Pitfall (Lost Double-Dip & Power Stall)",
            },
            {
              vi: "Giải pháp Tối ưu (Chuẩn Điều Phối Gia Sản)",
              en: "Optimal Solution (Master Inventory Discipline)",
            },
          ],
          rows: [
            [
              {
                vi: "Nhầm lẫn giữa 'Trang bị Tướng (Hero Gear)' và 'Trang bị Chúa Tể (Lord Gear)', hoặc chờ đến Thứ Bảy (Ngày 6) Kỳ GAR/KvK mới nâng Đồ Chúa Tể.",
                en: "Confusing 'Hero Gear' with 'Lord Gear', or waiting until Saturday (Day 6) of GAR/KvK Week to upgrade Lord Gear.",
              },
              {
                vi: "Ghi nhớ câu thần chú: 'Đồ Tướng (Hero Gear trong Lò rèn) = Đập ngay không chờ; Đồ Chúa Tể (Lord Gear trên Avatar) = Găm kỹ chờ Thứ Sáu–CN Kỳ Thi Đấu Hội hoặc Thứ Tư–Thứ Năm Kỳ GAR/KvK (tuyệt đối CẤM chờ Thứ Bảy Ngày 6 vì Ngày 6 GAR/KvK KHÔNG tính điểm Lord Gear!).'",
                en: "Memorize the golden mantra: 'Hero Gear (in the Blacksmith) = Upgrade immediately without waiting; Lord Gear (on your Avatar) = Hoard strictly for Fri–Sun Guild Race Week or Wed–Thu GAR/KvK Week (NEVER wait for Saturday Day 6 because Day 6 GAR/KvK grants ZERO points for Lord Gear!).'",
              },
            ],
            [
              {
                vi: "Xả sạch 100% kho dự trữ trong một sự kiện phụ 3 ngày (Single-Dip 100%) ở Kỳ Thi Đấu Hội, dẫn đến khi bước sang Kỳ GAR/KvK không còn gì để mở rương mốc nhân đôi.",
                en: "Dumping 100% of your stockpile into a standalone 3-day sub-event (100% Single-Dip) during Guild Race Week, leaving your inventory empty when GAR/KvK double-reward chests arrive.",
              },
              {
                vi: "Khi một sự kiện phụ rơi vào ngày không giao thoa, chỉ xả vừa khít số điểm để lấy rương mốc cá nhân (Milestone Chests) rồi dừng lại ngay; giữ ít nhất 70% kho dự trữ cho điểm nổ 200%–300% ở Kỳ GAR/KvK.",
                en: "When a sub-event falls on a non-overlapping day, spend only the exact minimum needed to claim basic personal Milestone Chests and stop immediately; preserve at least 70% of your stockpile for the 200%–300% GAR/KvK burst windows.",
              },
            ],
            [
              {
                vi: "Cắn bình Tăng tốc Vạn Năng (Universal Speedups) cho Xây dựng hoặc Luyện lính trong khi nhánh Nghiên cứu Khoa học đang thiếu Tăng tốc trầm trọng.",
                en: "Burning Universal Speedups on Construction or Troop Training while your Tech Research tree is severely starved of speedups.",
              },
              {
                vi: "Giữ 90% Tăng tốc Vạn Năng dành riêng cho Nghiên cứu Khoa học (Tech Research) vào Thứ Ba Kỳ GAR/KvK (vì thời gian nghiên cứu công nghệ cuối game dài gấp nhiều lần thời gian xây nhà).",
                en: "Reserve 90% of your Universal Speedups exclusively for Tech Research on Tuesday of GAR/KvK Week (since late-game tech research timers are several times longer than building timers).",
              },
            ],
          ],
        },
      ],
    },
  ],
  proSections: [
    {
      id: "sec-4-master-double-dip-matrix",
      isPro: true,
      title: {
        vi: "4. Phân tích Định lượng & Điểm gãy: Sơ Đồ Quyết Định & Bảng Ma Trận Giao Thoa Tài Nguyên Toàn Diện (13 Nhóm Vật Phẩm)",
        en: "4. Quantitative Analysis: Pre-Spend Decision Flowchart & The 13-Item Master Double-Dip Matrix (300% / 200% / 100% / 0%)",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "Trước khi bấm sử dụng bất kỳ vật phẩm nào trong túi đồ, hãy đi qua **Sơ đồ Luồng Quyết định 3 Câu hỏi** và tra cứu trực tiếp trên **Bảng Ma Trận Giao Thoa Tài Nguyên Toàn Diện (`Master Double-Dip Matrix`)** dưới đây.\n• **4 Cấp hiệu suất:** Xác định chính xác thời điểm hiện tại đang mang lại hiệu suất `300% (Triple-Dip)`, `200% (Double-Dip)`, `100% (Single-Dip)` hay `0% (Cấm xả)`.",
            en: "Before tapping 'Use' on any item in your bag, walk through the **3-Question Decision Flowchart** and consult **The Master Double-Dip Matrix** below.\n• **4 Efficiency tiers:** Verify whether the current window yields `300% (Triple-Dip)`, `200% (Double-Dip)`, `100% (Single-Dip)`, or `0% (Forbidden)` efficiency.",
          },
        },
      ],
      subSections: [
        {
          id: "sub-4-1-three-question-decision-flow",
          title: {
            vi: "4.1. Sơ Đồ Luồng Quyết Định 3 Câu Hỏi Trước Khi Xả Tài Nguyên (Mermaid Decision Flow)",
            en: "4.1. Pre-Spend 3-Question Decision Flowchart (0% ➔ 100% ➔ 200% ➔ 300%)",
          },
          badge: {
            vi: "LUỒNG QUYẾT ĐỊNH",
            en: "DECISION FLOW",
          },
          blocks: [
            {
              type: "visual_diagram",
              mediaCode: "MED-3.4-03",
              variant: "decision_flow",
              title: {
                vi: "Sơ Đồ Luồng Quyết Định Trước Khi Xả Tài Nguyên (0% ➔ 100% ➔ 200% ➔ 300%)",
                en: "Pre-Spend Resource Decision Flowchart (0% ➔ 100% ➔ 200% ➔ 300%)",
              },
              subtitle: {
                vi: "Kiểm tra 3 câu hỏi sàng lọc bắt buộc trước khi bấm dùng bất kỳ vật phẩm nào trong túi đồ",
                en: "Mandatory 3-question screening protocol before spending any inventory resource",
              },
              centerNode: {
                id: "pre-spend-3-questions",
                badge: {
                  vi: "CỔNG KIỂM ĐỊNH TÚI ĐỒ",
                  en: "INVENTORY AUDIT GATE",
                },
                title: {
                  vi: "ĐỊNH BẤM DÙNG VẬT PHẨM TRONG TÚI ĐỒ: KIỂM TRA 3 CÂU HỎI",
                  en: "ABOUT TO USE AN INVENTORY ITEM: THE 3-QUESTION CHECK",
                },
                subtitle: {
                  vi: "Câu hỏi #1: Có thuộc Nhóm A (Đập ngay)? ➔ Câu hỏi #2: Có trùng Ngày Chủ Đề GAR/KvK / Nhiệm vụ Vàng Guild Race? ➔ Câu hỏi #3: Giao thoa mấy lớp sự kiện?",
                  en: "Q1: Is it Group A (Spend Now)? ➔ Q2: Does it match GAR/KvK Theme Day / Guild Race Gold Task? ➔ Q3: How many event layers overlap right now?",
                },
                metrics: [
                  {
                    vi: "Nhóm A: Đập ngay tăng Lực chiến Đội 1 & mở Trait 3 Kinh tế (12 Sao = 300 Mảnh)",
                    en: "Group A: Spend immediately for Queue 1 Power & Economy Trait 3 (12 Stars = 300 Shards)",
                  },
                  {
                    vi: "Nhóm B (13 danh mục): Canh chuẩn 100% Single-Dip ➔ 200% Double-Dip ➔ 300% Triple-Dip",
                    en: "Group B (13 categories): Time strictly for 100% Single-Dip ➔ 200% Double-Dip ➔ 300% Triple-Dip",
                  },
                ],
                tone: "gold",
              },
              branches: [
                {
                  title: {
                    vi: "Nhánh 1: Nhóm A — Đập Ngay Lập Tức (Không Tính Điểm Sự Kiện Hoặc Ngoại Lệ Kinh Tế)",
                    en: "Branch 1: Group A — Spend Immediately (Non-Scoring or Economic Exception)",
                  },
                  badge: {
                    vi: "ĐẬP NGAY LẬP TỨC",
                    en: "SPEND IMMEDIATELY",
                  },
                  tone: "emerald",
                  steps: [
                    {
                      id: "branch-1-step-1",
                      badge: {
                        vi: "CÂU HỎI #1A — ĐỒ TƯỚNG",
                        en: "QUESTION #1A — HERO GEAR",
                      },
                      title: {
                        vi: "Đồ Tướng (Hero Gear Forging) & Đá Cường Hóa Thường (+10/+20/+30/+40)",
                        en: "Hero Gear Forging & Regular Enhancement Ore (+10/+20/+30/+40)",
                      },
                      subtitle: {
                        vi: "Đúc trang bị Vàng đúng Dấu Hệ (+30%) và đập đá cường hóa thường trong Lò rèn không bao giờ tính điểm GAR/KvK hay Guild Race.",
                        en: "Forging faction-matching Legendary Hero Gear (+30%) and using regular Enhancement Ore in the Blacksmith never score points in GAR/KvK or Guild Race.",
                      },
                      tone: "emerald",
                    },
                    {
                      id: "branch-1-step-2",
                      badge: {
                        vi: "CÂU HỎI #1B — TƯỚNG TÍM KINH TẾ",
                        en: "QUESTION #1B — EPIC ECONOMY HEROES",
                      },
                      title: {
                        vi: "Mảnh Tướng Tím Kinh Tế (Knight, Brawler, Ranger) Chưa Đạt 12 Sao (2 Sao Trắng = 300 Mảnh)",
                        en: "Epic Economy Hero Shards (Knight, Brawler, Ranger) Below 12 Stars (2 White Stars = 300 Shards)",
                      },
                      subtitle: {
                        vi: "Ưu tiên nâng thẳng lên mốc 12 Sao (2 Sao Trắng = 300 Mảnh) để mở khóa ô Trait 3 (+25% đến +30% Tốc độ Nghiên cứu / Luyện lính).",
                        en: "Upgrade straight to 12 Stars (2 White Stars = 300 Shards) to unlock Trait 3 (+25% to +30% Research / Troop Training speed).",
                      },
                      tone: "emerald",
                    },
                  ],
                  outcome: {
                    vi: "KẾT LUẬN NHÁNH 1: ĐẬP NGAY LẬP TỨC! Tăng Lực chiến Đội 1 vượt ải PvE/Đấu trường và kích hoạt động cơ kinh tế vĩnh viễn ngay hôm nay.",
                    en: "BRANCH 1 OUTCOME: SPEND IMMEDIATELY! Boost Queue 1 combat power for PvE/Arena and activate your permanent account economy engine today.",
                  },
                },
                {
                  title: {
                    vi: "Nhánh 2: Nhóm B — Canh Giao Thoa Sự Kiện (100% Single-Dip ➔ 200% Double-Dip ➔ 300% Triple-Dip)",
                    en: "Branch 2: Group B — Event Overlap Windows (100% Single-Dip ➔ 200% Double-Dip ➔ 300% Triple-Dip)",
                  },
                  badge: {
                    vi: "GIAO THOA 100% ➔ 300%",
                    en: "100% ➔ 300% OVERLAP",
                  },
                  tone: "gold",
                  steps: [
                    {
                      id: "branch-2-step-1",
                      badge: {
                        vi: "1 LỚP — 100% SINGLE-DIP",
                        en: "1 LAYER — 100% SINGLE-DIP",
                      },
                      title: {
                        vi: "Chỉ Có 1 Sự Kiện Độc Lập Đang Tính Điểm",
                        en: "Only 1 Standalone Event Scoring",
                      },
                      subtitle: {
                        vi: "Chỉ xả cầm chừng vừa đủ mốc rương cá nhân cơ bản rồi dừng ngay lập tức (giữ lại ít nhất 70% kho dự trữ).",
                        en: "Spend only the bare minimum to reach basic personal milestone chests and stop immediately (preserve at least 70% of your stockpile).",
                      },
                      tone: "slate",
                    },
                    {
                      id: "branch-2-step-2",
                      badge: {
                        vi: "2 LỚP — 200% DOUBLE-DIP",
                        en: "2 LAYERS — 200% DOUBLE-DIP",
                      },
                      title: {
                        vi: "Trùng 2 Lớp Sự Kiện (Lớp 1 + Lớp 2 Hoặc Lớp 1 + Lớp 3)",
                        en: "2 Event Layers Intersect (Layer 1 + Layer 2 or Layer 1 + Layer 3)",
                      },
                      subtitle: {
                        vi: "Ví dụ: Nhiệm vụ Độc quyền Vàng Lord Gear Ngày 5–7 Kỳ Thi Đấu Hội trùng Guild Rush: Quân Trang & Đồ Chúa Tể ➔ Xả mở khóa Full 6/6 Rương Mốc Cá Nhân!",
                        en: "Example: Days 5–7 Guild Race Exclusive Gold Lord Gear Task overlapping with Guild Rush: Troop Skin & Lord Gear ➔ Spend to unlock all 6/6 Personal Milestone Chests!",
                      },
                      tone: "emerald",
                    },
                    {
                      id: "branch-2-step-3",
                      badge: {
                        vi: "3 LỚP — 300% TRIPLE-DIP",
                        en: "3 LAYERS — 300% TRIPLE-DIP",
                      },
                      title: {
                        vi: "Giao Thoa Đủ 3 Lớp (GAR/KvK + Guild Rush/Sub-Event + Khung Giờ Vàng 4h)",
                        en: "All 3 Layers Intersect (GAR/KvK + Guild Rush/Sub-Event + 4-Hour Golden Window)",
                      },
                      subtitle: {
                        vi: "Ví dụ: 10:00–14:00 UTC (17:00–21:00 Giờ VN) Thứ Năm Kỳ GAR/KvK (GAR/KvK Day 4 + Guild Rush Phát triển Tướng / Soul Stone + Ca Giờ Bồi Dưỡng Anh Hùng) ➔ Xả tất tay 80%–100% Kho Dự Trữ!",
                        en: "Example: Thursday 10:00–14:00 UTC of GAR/KvK Week (GAR/KvK Day 4 + Guild Rush Hero Dev / Soul Stone + Hourly Hero Dev) ➔ Unload 80%–100% of your stockpile!",
                      },
                      tone: "gold",
                    },
                  ],
                  outcome: {
                    vi: "KẾT LUẬN NHÁNH 2: XẢ ĐÚNG ĐIỂM NỔ 200%–300%! Một vật phẩm ăn trọn 2–3 bảng phần thưởng, hoàn vốn 30%–50% tổng tài nguyên tiêu thụ.",
                    en: "BRANCH 2 OUTCOME: UNLOAD AT 200%–300% BURST WINDOWS! One item claims 2–3 reward tracks simultaneously, rebating 30%–50% of spent resources.",
                  },
                },
                {
                  title: {
                    vi: "Nhánh 3: Vùng Cấm 0% — Cấm Xả Tuyệt Đối (Ngoài Sự Kiện Hoặc Lệch Ngày Tính Điểm)",
                    en: "Branch 3: 0% Forbidden Zone — Strictly Prohibited (Off-Event or Wrong Scoring Day)",
                  },
                  badge: {
                    vi: "HIỆU SUẤT 0% — CẤM XẢ",
                    en: "0% FORBIDDEN ZONE",
                  },
                  tone: "rose",
                  steps: [
                    {
                      id: "branch-3-step-1",
                      badge: {
                        vi: "CÂU HỎI #2 — KHÔNG TRÙNG SỰ KIỆN",
                        en: "QUESTION #2 — NO MATCHING EVENT",
                      },
                      title: {
                        vi: "Ngày Thường Không Có Ngày Chủ Đề GAR/KvK Hoặc Nhiệm Vụ Vàng Thi Đấu Hội",
                        en: "Off-Days Without Matching GAR/KvK Theme or Guild Race Gold Task",
                      },
                      subtitle: {
                        vi: "Đập Mảnh Vàng vào Thứ Hai/Thứ Ba/Thứ Tư/Thứ Sáu, thức tỉnh Hồn Đá Đỏ ngày thường, hoặc xả 20–80 Vé Chiêu Mộ cho bảng Guild Race.",
                        en: "Fusing Legendary Shards on Mon/Tue/Wed/Fri, awakening Soul Stones on regular days, or burning 20–80 Recruit Tokens on Guild Race tasks.",
                      },
                      tone: "rose",
                    },
                    {
                      id: "branch-3-step-2",
                      badge: {
                        vi: "BẪY ĐỎ — LỆCH NGÀY TÍNH ĐIỂM",
                        en: "RED TRAP — WRONG SCORING DAY",
                      },
                      title: {
                        vi: "Găm Nhầm Đồ Chúa Tể (Lord Gear) Sang Thứ Bảy Ngày 6 Hoặc Xả Relics Ngày 5 GAR",
                        en: "Saving Lord Gear for Saturday Day 6 or Spending Relics on GAR Day 5",
                      },
                      subtitle: {
                        vi: "Đồ Chúa Tể (Lord Gear) KHÔNG tính điểm vào Ngày 6 GAR/KvK, và Thánh Tích (Relics) KHÔNG tính điểm vào Ngày 5 GAR tiêu chuẩn!",
                        en: "Lord Gear grants ZERO points on Day 6 of GAR/KvK, and Relics grant ZERO points on Day 5 of standard GAR!",
                      },
                      tone: "rose",
                    },
                  ],
                  outcome: {
                    vi: "KẾT LUẬN NHÁNH 3: HIỆU SUẤT 0% — ĐÓNG BẢNG LẠI NGAY! Giữ nguyên 100% vật phẩm trong túi đồ và tra cứu khung giờ vàng tại Bảng Ma Trận 13 Nhóm Vật Phẩm.",
                    en: "BRANCH 3 OUTCOME: 0% EFFICIENCY — CLOSE MENU IMMEDIATELY! Keep 100% of your items locked in the bag and check the 13-Item Master Matrix below.",
                  },
                },
              ],
              footnote: {
                vi: "Mẹo tra cứu nhanh: Luôn mở Event ➔ Lịch Event (cột 02:00 UTC / 09:00 Giờ VN Thứ Hai) kết hợp đồng hồ Sự kiện Giờ 4 tiếng trước khi mở khóa bất kỳ vật phẩm Nhóm B nào.",
                en: "Quick lookup tip: Always check Event ➔ Event Calendar (Monday 02:00 UTC column) alongside the 4-Hour Hourly Event timer before unlocking any Group B resource.",
              },
            },
          ],
        },
        {
          id: "sub-4-2-thirteen-item-master-matrix",
          title: {
            vi: "4.2. Bảng Ma Trận Giao Thoa Tài Nguyên Toàn Diện (The 13-Item Master Double-Dip Matrix)",
            en: "4.2. The Complete 13-Item Master Double-Dip Matrix (300% / 200% / 100% / 0%)",
          },
          badge: {
            vi: "MA TRẬN 13 VẬT PHẨM",
            en: "13-ITEM MASTER MATRIX",
          },
          blocks: [
            {
              type: "table",
              caption: {
                vi: "Bảng Ma Trận Giao Thoa Tài Nguyên Toàn Diện (The Master Double-Dip Matrix — Đủ 13 Nhóm Vật Phẩm Cốt Lõi × 4 Cấp Hiệu Suất)",
                en: "The Master Double-Dip Matrix: All 13 Core Inventory Item Categories Across 300% / 200% / 100% / 0% Efficiency Windows",
              },
              headers: [
                {
                  vi: "STT",
                  en: "#",
                },
                {
                  vi: "Nhóm Vật Phẩm Trong Túi Đồ (Inventory Item)",
                  en: "Inventory Item Category",
                },
                {
                  vi: "Điểm Nổ 300% (Triple-Dip — Xả Tất Tay 80–100% Kho)",
                  en: "300% Triple-Dip Burst (Spend 80–100% Stockpile)",
                },
                {
                  vi: "Điểm Giao Thoa 200% (Double-Dip — Xả Đủ Full Rương Mốc)",
                  en: "200% Double-Dip Overlap (Max 6/6 Milestone Chests)",
                },
                {
                  vi: "Mốc Cầm Chừng 100% (Single-Dip — Chỉ Rướn Mốc Cơ Bản)",
                  en: "100% Single-Dip Baseline (Minimal Chest Threshold Only)",
                },
                {
                  vi: "Vùng Cấm 0% (Forbidden Zone — Cấm Đụng Tuyệt Đối)",
                  en: "0% Forbidden Zone (Strictly Do Not Touch)",
                },
              ],
              rows: [
                [
                  { vi: "1", en: "1" },
                  {
                    vi: "Mảnh Tướng Vàng Vạn Năng & Mảnh Riêng (Universal & Specific Hero Shards)",
                    en: "Universal & Specific Legendary/Mythic Hero Shards",
                  },
                  {
                    vi: "Thứ Năm Kỳ GAR/KvK (10:00–14:00 UTC / 17:00–21:00 Giờ VN): Trùng GAR/KvK Day 4 + Ca Giờ Bồi Dưỡng Anh Hùng + Guild Rush: Phát triển Tướng (T4–T5).",
                    en: "Thursday GAR/KvK (10:00–14:00 UTC): Overlaps GAR/KvK Day 4 + Hourly Hero Development + Guild Rush: Hero Development (Wed–Thu).",
                  },
                  {
                    vi: "Thứ Năm Kỳ GAR/KvK (10:00–14:00 UTC / 17:00–21:00 Giờ VN): Trùng GAR/KvK Day 4 + Ca Giờ Bồi Dưỡng Anh Hùng.",
                    en: "Thursday GAR/KvK (10:00–14:00 UTC): Overlaps GAR/KvK Day 4 + Hourly Hero Development.",
                  },
                  {
                    vi: "Khi chạy sự kiện phụ 3 ngày Hero Development rơi vào Kỳ Thi Đấu Hội (chỉ xả đủ mốc rương nếu cần).",
                    en: "When the standalone 3-day Hero Development sub-event lands in Guild Race Week (spend only to hit basic chest thresholds if needed).",
                  },
                  {
                    vi: "Cấm xả 100% vào Thứ Hai, Thứ Ba, Thứ Tư, Thứ Sáu và cấm nhận nhiệm vụ 40 Mảnh Vàng trong bảng Guild Race!",
                    en: "100% forbidden on Mon, Tue, Wed, Fri, and NEVER accept the 20–40 Legendary Shard task on the Guild Race board!",
                  },
                ],
                [
                  { vi: "2", en: "2" },
                  {
                    vi: "Hồn Đá Đỏ (120,000đ/viên) (Soul Stones — Giá 40,000 Điểm Vinh Dự hoặc 6,000 Xu Vinh Quang)",
                    en: "Soul Stones (120,000 pts/stone — Cost: 40,000 Guild Honor or 6,000 Guild Glory Coins)",
                  },
                  {
                    vi: "Thứ Năm Kỳ GAR/KvK (10:00–14:00 UTC / 17:00–21:00 Giờ VN): Trùng GAR/KvK Day 4 (120,000đ/viên) + Guild Rush: Phát triển Tướng + Sự kiện phụ Soul Stone.",
                    en: "Thursday GAR/KvK (10:00–14:00 UTC): Overlaps GAR/KvK Day 4 (120,000 pts/stone) + Guild Rush: Hero Development + Soul Stone sub-event.",
                  },
                  {
                    vi: "Thứ Năm Kỳ GAR/KvK: Trùng GAR/KvK Day 4 + Ca Giờ Bồi Dưỡng Anh Hùng.",
                    en: "Thursday GAR/KvK: Overlaps GAR/KvK Day 4 + Hourly Hero Development.",
                  },
                  {
                    vi: "Trong 3 ngày diễn ra sự kiện phụ Soul Stone độc lập.",
                    en: "During a standalone 3-day Soul Stone sub-event.",
                  },
                  {
                    vi: "Cấm thức tỉnh tướng vào ngày thường; cấm tiêu thủng Ngưỡng Đóng Băng Ví (40,000 Điểm Vinh Dự / 12,000–18,000 Xu Vinh Quang).",
                    en: "Never awaken heroes on regular days; never spend below the Wallet Freeze Floor (40,000 Guild Honor / 12,000–18,000 Guild Glory Coins).",
                  },
                ],
                [
                  { vi: "3", en: "3" },
                  {
                    vi: "Sách Kỹ Năng, Mảnh UW (6,000đ) & Lõi Sắt Thiên Thạch (6,000đ) (Skill Books, UW Shards & Meteorite Iron Cores)",
                    en: "Skill Books, UW Shards (6,000 pts) & Meteorite Iron Cores (6,000 pts)",
                  },
                  {
                    vi: "Thứ Năm Kỳ GAR/KvK (10:00–14:00 UTC / 17:00–21:00 Giờ VN): Trùng GAR/KvK Day 4 + Guild Rush: Phát triển Tướng (T4–T5) + Ca Giờ Bồi Dưỡng Anh Hùng.",
                    en: "Thursday GAR/KvK (10:00–14:00 UTC): Overlaps GAR/KvK Day 4 + Guild Rush: Hero Development (Wed–Thu) + Hourly Hero Development.",
                  },
                  {
                    vi: "Khi Guild Rush: Phát triển Tướng giao thoa với Ca Giờ Bồi Dưỡng Anh Hùng.",
                    en: "When Guild Rush: Hero Development intersects with the Hourly Hero Development shift.",
                  },
                  {
                    vi: "Xả vừa đủ mốc trong sự kiện phụ Hero Development độc lập.",
                    en: "Spend just enough to hit milestone thresholds during a standalone Hero Development sub-event.",
                  },
                  {
                    vi: "Cấm nâng kỹ năng tướng Đội 2/Đội 3; cấm xả Sách Kỹ Năng, Mảnh UW và Lõi Sắt ngoài ngày sự kiện Tướng.",
                    en: "Never upgrade Queue 2/Queue 3 hero skills; never spend Skill Books, UW Shards, or Meteorite Iron Cores outside Hero event days.",
                  },
                ],
                [
                  { vi: "4", en: "4" },
                  {
                    vi: "Thẻ Chiêu Mộ Quán Rượu (Tavern Recruitment Tokens)",
                    en: "Tavern Recruitment Tokens",
                  },
                  {
                    vi: "Thứ Năm Kỳ GAR/KvK (10:00–14:00 UTC / 17:00–21:00 Giờ VN): Trùng GAR/KvK Day 4 + Ca Giờ Bồi Dưỡng Anh Hùng + Guild Rush: Phát triển Tướng.",
                    en: "Thursday GAR/KvK (10:00–14:00 UTC): Overlaps GAR/KvK Day 4 + Hourly Hero Development + Guild Rush: Hero Development.",
                  },
                  {
                    vi: "Thứ Năm Kỳ GAR/KvK: Xả trong ngày GAR/KvK Day 4 để vừa lấy điểm rương vừa gom Điểm Đổi Tướng.",
                    en: "Thursday GAR/KvK: Spend during GAR/KvK Day 4 to claim milestone chests while stacking Tavern Hero Exchange points.",
                  },
                  {
                    vi: "Sự kiện phụ Hero Development độc lập (nếu thiếu vài mảnh để mở tướng chủ lực).",
                    en: "Standalone Hero Development sub-event (only if a few shards short of unlocking a core carry hero).",
                  },
                  {
                    vi: "TUYỆT ĐỐI CẤM xả 20–80 vé cho nhiệm vụ bảng Guild Race hoặc quay lẻ tẻ mỗi ngày!",
                    en: "STRICTLY FORBIDDEN to burn 20–80 tokens on Guild Race board tasks or do random daily pulls!",
                  },
                ],
                [
                  { vi: "5", en: "5" },
                  {
                    vi: "Đá Cường Hóa Thường & Phôi Đúc Đồ Tướng (Hero Gear Ore & Forging Ingots)",
                    en: "Regular Hero Gear Enhancement Ore & Forging Ingots",
                  },
                  {
                    vi: "Không áp dụng (Đập ngay cho Đội 1): Đúc đồ Vàng đúng Dấu Hệ (+30%) và đập lên mốc Cộng hưởng +10/+20/+30/+40 ngay lập tức!",
                    en: "N/A (Spend Immediately on Queue 1): Forge faction-matched Legendary Hero Gear (+30%) and upgrade to +10/+20/+30/+40 Resonance immediately!",
                  },
                  {
                    vi: "Riêng Lõi Sắt Thiên Thạch (6,000đ) xả vào Thứ Năm Kỳ GAR/KvK (Day 4); Máu Rồng (Dragon Blood) xả theo khung Lord Gear (Ngày 3–4 GAR/KvK / Ngày 5–7 Guild Race).",
                    en: "Exception: Spend Meteorite Iron Cores (6,000 pts) on Thursday GAR/KvK (Day 4); spend Dragon Blood during Lord Gear windows (Days 3–4 GAR/KvK / Days 5–7 Guild Race).",
                  },
                  {
                    vi: "Nâng ngay khi Đội 1 bị kẹt ải PvE hoặc trước giờ đánh Đấu trường / Chiến sự Bang.",
                    en: "Upgrade immediately whenever Queue 1 hits a PvE wall or right before Arena / Guild War battles.",
                  },
                  {
                    vi: "Cấm nhịn đúc đồ Vàng Đội 1 chờ sự kiện (vì đúc đồ và đập quặng thường không có điểm sự kiện!).",
                    en: "Never delay forging Queue 1 Legendary Hero Gear waiting for events (regular forging and enhancement ore grant 0 event points!).",
                  },
                ],
                [
                  { vi: "6", en: "6" },
                  {
                    vi: "Đồ Chúa Tể (Lord Gear: Đá Xanh, Dây Gai, Bản Vẽ, Máu Rồng) (Refined Metal, Magic Thread, Orichalcum, Dragon Blood)",
                    en: "Lord Gear (Refined Metal, Magic Thread, Orichalcum, Dragon Blood)",
                  },
                  {
                    vi: "Thứ Tư (Ngày 3) & Thứ Năm (Ngày 4) Kỳ GAR/KvK (trùng GAR/KvK Day 3–4 + sự kiện phụ Lord's Set, hoặc Ngày 5 ở KvK); HOẶC Thứ Sáu–Thứ Bảy (Ngày 5–6) Kỳ Thi Đấu Hội (trùng NV Độc quyền Vàng Guild Race + Guild Rush: Quân Trang & Đồ Chúa Tể + Lord's Set)!",
                    en: "Wednesday (Day 3) & Thursday (Day 4) GAR/KvK (overlapping GAR/KvK Days 3–4 + Lord's Set sub-event, or Day 5 in KvK); OR Friday–Saturday (Days 5–6) Guild Race (overlapping Guild Race Exclusive Gold Task + Guild Rush: Troop Skin & Lord Gear + Lord's Set)!",
                  },
                  {
                    vi: "Kỳ Thi Đấu Hội (Ngày 5–7: Thứ Sáu ➔ CN): Nhận Nhiệm vụ Độc quyền Vàng Lord Gear trên bảng Guild Race + trùng Guild Rush: Quân Trang & Đồ Chúa Tể.",
                    en: "Guild Race Week (Days 5–7: Fri ➔ Sun): Accept Exclusive Gold Lord Gear Tasks on the Guild Race board + overlap with Guild Rush: Troop Skin & Lord Gear.",
                  },
                  {
                    vi: "Thứ Tư / Thứ Năm Kỳ GAR/KvK (GAR/KvK Day 3–4) hoặc Ngày 5–7 Kỳ Thi Đấu Hội (xoay NV Vàng Lord Gear +300 ➔ +450 điểm).",
                    en: "Wednesday / Thursday GAR/KvK (GAR/KvK Days 3–4) or Days 5–7 Guild Race (rolling Exclusive Gold Lord Gear Tasks for +300 ➔ +450 pts).",
                  },
                  {
                    vi: "CẢNH BÁO ĐỎ: Đồ Chúa Tể KHÔNG tính điểm vào Ngày 6 (Thứ Bảy) của GAR/KvK! Cấm để dành sang Thứ Bảy GAR/KvK và cấm nâng từ Thứ Hai–Thứ Năm của Kỳ Thi Đấu Hội!",
                    en: "RED ALERT: Lord Gear grants ZERO points on Day 6 (Saturday) of GAR/KvK! Never save it for Saturday of GAR/KvK and never upgrade Mon–Thu of Guild Race Week!",
                  },
                ],
                [
                  { vi: "7", en: "7" },
                  {
                    vi: "Thánh Tích (Relics) & Cự Thú (Behemoth) (Wish Relic, Relic Shards, Arcane Crystals, Magic Stones & Magicite, Magic Core, Scroll Seal)",
                    en: "Relics & Behemoth (Wish Relic, Relic Shards, Arcane Crystals, Magic Stones & Magicite, Magic Core, Scroll Seal)",
                  },
                  {
                    vi: "Thứ Hai (Ngày 1) & Thứ Ba (Ngày 2) Kỳ GAR/KvK: Khi GAR/KvK Stage 1–2 giao thoa với sự kiện phụ Relic Power (hoặc thêm Ngày 5 nếu là KvK)! (Lưu ý: Behemoth tính điểm ở Ngày 1, 2, 5, 6 của GAR/KvK và thêm Ngày 3 ở KvK, nhưng GAR Ngày 3 KHÔNG tính Behemoth).",
                    en: "Monday (Day 1) & Tuesday (Day 2) GAR/KvK: When GAR/KvK Stages 1–2 overlap with the Relic Power sub-event (plus Day 5 in KvK)! (Note: Behemoth scores on Days 1, 2, 5, 6 of GAR/KvK plus Day 3 in KvK, whereas GAR Day 3 does NOT score Behemoth).",
                  },
                  {
                    vi: "Thứ Tư – Thứ Năm Kỳ Thi Đấu Hội: Trùng Guild Rush: Thánh Tích (Relic Hall & Relics) + sự kiện phụ Relic Power.",
                    en: "Wednesday – Thursday Guild Race Week: Overlaps Guild Rush: Relic Hall & Relics + Relic Power sub-event.",
                  },
                  {
                    vi: "Ngày 1–2 Kỳ GAR/KvK hoặc Thứ Tư–Thứ Năm Kỳ Thi Đấu Hội (Guild Rush).",
                    en: "Days 1–2 GAR/KvK or Wednesday–Thursday Guild Race Week (Guild Rush).",
                  },
                  {
                    vi: "Cấm xả Thánh Tích vào Ngày 5 (Thứ Sáu) của GAR tiêu chuẩn (vì GAR Ngày 5 KHÔNG tính điểm Relics, chỉ KvK Ngày 5 mới tính Relic Shards!).",
                    en: "Never spend Relics on Day 5 (Friday) of standard GAR (standard GAR Day 5 grants ZERO points for Relics; only KvK Day 5 scores Relic Shards!).",
                  },
                ],
                [
                  { vi: "8", en: "8" },
                  {
                    vi: "Thú Cưng (Pets) & Mảnh Anh Linh (Heroic Spirits) (Pet Food, Pet Essence & Heroic Spirit Shards)",
                    en: "Pets & Heroic Spirits (Pet Food, Pet Essence & Heroic Spirit Shards)",
                  },
                  {
                    vi: "Thứ Sáu (Ngày 5 — kèm Heroic Spirit Shards) & Thứ Bảy (Ngày 6) Kỳ GAR/KvK: Trùng GAR/KvK Day 5–6 + Sự kiện phụ 3 ngày Pet Power!",
                    en: "Friday (Day 5 — including Heroic Spirit Shards) & Saturday (Day 6) GAR/KvK: Overlaps GAR/KvK Days 5–6 + 3-day Pet Power sub-event!",
                  },
                  {
                    vi: "Thứ Hai – Thứ Ba Kỳ Thi Đấu Hội: Trùng Guild Rush: Nâng cấp Thú Cưng (Pets Development) + sự kiện phụ Pet Power.",
                    en: "Monday – Tuesday Guild Race Week: Overlaps Guild Rush: Pets Development + Pet Power sub-event.",
                  },
                  {
                    vi: "Thứ Sáu / Thứ Bảy Kỳ GAR/KvK (Day 5–6) hoặc Thứ Hai–Thứ Ba Kỳ Thi Đấu Hội (Guild Rush).",
                    en: "Friday / Saturday GAR/KvK (Days 5–6) or Monday–Tuesday Guild Race Week (Guild Rush).",
                  },
                  {
                    vi: "Cấm đút Thức ăn Pet lắt nhắt ngoài ngày sự kiện và cấm nuôi Pet phụ khi Pet Đội 1 chưa đạt mốc đột phá.",
                    en: "Never feed Pets piecemeal outside event days and never level secondary Pets before Queue 1's main Pet hits breakthrough milestones.",
                  },
                ],
                [
                  { vi: "9", en: "9" },
                  {
                    vi: "Bụi Cổ Ngữ & Rương Cổ Ngữ (Rune Dust & Rune Chests)",
                    en: "Rune Dust & Rune Chests",
                  },
                  {
                    vi: "Thứ Ba Kỳ GAR/KvK (10:00–14:00 UTC / 17:00–21:00 Giờ VN): Trùng GAR/KvK Day 2 (Tech & Runes) + Sự kiện phụ có tính điểm Cổ Ngữ + Đạt mốc Rune Lv.5 / Lv.8!",
                    en: "Tuesday GAR/KvK (10:00–14:00 UTC): Overlaps GAR/KvK Day 2 (Tech & Runes) + Rune-scoring sub-event + hitting Rune Lv.5 / Lv.8 breakpoints!",
                  },
                  {
                    vi: "Thứ Ba Kỳ GAR/KvK: Xả toàn bộ Bụi Cổ Ngữ và ghép phôi trong ngày GAR/KvK Day 2.",
                    en: "Tuesday GAR/KvK: Spend all Rune Dust and fuse runes during GAR/KvK Day 2.",
                  },
                  {
                    vi: "Khi thiếu đúng 1 viên để kích hoạt mốc đột phá Lv.5 (+% Tướng & March Size) hoặc Lv.8 (+% Toàn bộ Lính) trước trận đánh lớn.",
                    en: "Only when exactly 1 rune short of activating the Lv.5 (+% Hero & March Size) or Lv.8 (+% All Troops) set breakpoint right before a major war.",
                  },
                  {
                    vi: "Cấm mở Rương Cổ Ngữ Tự Chọn ở bậc Lv.1–Lv.3; cấm ghép Cổ Ngữ vào các ngày khác ngoài Thứ Ba Kỳ GAR/KvK!",
                    en: "Never open Choice Rune Chests at Lv.1–Lv.3; never fuse Runes on any day other than Tuesday of GAR/KvK Week!",
                  },
                ],
                [
                  { vi: "10", en: "10" },
                  {
                    vi: "Tăng Tốc Xây Dựng & Đá Rồng Công Trình (Construction Speedups & Dragon Essence)",
                    en: "Construction Speedups & Building Dragon Essence",
                  },
                  {
                    vi: "Thứ Hai Kỳ GAR/KvK (06:00–10:00 UTC / 13:00–17:00 Giờ VN): Khui hộp công trình xây sẵn + Xả Tăng tốc & Đá Rồng khi trùng GAR/KvK Day 1 + Ca Giờ Xây Lãnh Thổ + Guild Rush: Xây dựng & Nghiên cứu (T2–T3).",
                    en: "Monday GAR/KvK (06:00–10:00 UTC): Pop pre-built gift boxes + spend Construction Speedups & Dragon Essence overlapping GAR/KvK Day 1 + Hourly Territory Construction + Guild Rush: Building & Research (Mon–Tue).",
                  },
                  {
                    vi: "Kỳ Thi Đấu Hội: Nhận Nhiệm vụ Vàng Xây dựng trên bảng Guild Race + Trùng sự kiện phụ 2–3 ngày Rush Top / Ultimate Power.",
                    en: "Guild Race Week: Accept Gold Construction Tasks on the Guild Race board + overlap with 2–3 day Rush Top / Ultimate Power sub-events.",
                  },
                  {
                    vi: "Thứ Hai Kỳ GAR/KvK (06:00–10:00 UTC / 13:00–17:00 Giờ VN) hoặc khi nhận Nhiệm vụ Độc quyền Vàng Công trình ở Ngày 5–7 Kỳ Thi Đấu Hội.",
                    en: "Monday GAR/KvK (06:00–10:00 UTC) or when accepting Exclusive Gold Building Tasks on Days 5–7 of Guild Race Week.",
                  },
                  {
                    vi: "Cấm cắn Tăng tốc khi chưa xin đủ Trợ giúp Bang (Guild Help) và chưa bật buff Chức vụ Vương quốc!",
                    en: "Never burn Speedups before requesting full Guild Help and activating Kingdom Title construction buffs!",
                  },
                ],
                [
                  { vi: "11", en: "11" },
                  {
                    vi: "Tăng Tốc Nghiên Cứu & Tăng Tốc Vạn Năng (Research & Universal Speedups)",
                    en: "Research & Universal Speedups",
                  },
                  {
                    vi: "Thứ Ba Kỳ GAR/KvK (10:00–14:00 UTC / 17:00–21:00 Giờ VN): Trùng GAR/KvK Day 2 + Ca Giờ Nghiên Cứu Công Nghệ + Guild Rush: Xây dựng & Nghiên cứu (T2–T3).",
                    en: "Tuesday GAR/KvK (10:00–14:00 UTC): Overlaps GAR/KvK Day 2 + Hourly Tech Research + Guild Rush: Building & Research (Mon–Tue).",
                  },
                  {
                    vi: "Kỳ Thi Đấu Hội: Nhận Nhiệm vụ Vàng Nghiên cứu trên bảng Guild Race + Trùng sự kiện phụ 2–3 ngày Rush Top.",
                    en: "Guild Race Week: Accept Gold Research Tasks on the Guild Race board + overlap with the 2–3 day Rush Top sub-event.",
                  },
                  {
                    vi: "Thứ Ba Kỳ GAR/KvK (10:00–14:00 UTC / 17:00–21:00 Giờ VN) hoặc dùng các nốt nghiên cứu ngắn (5–30 phút) nhánh Kinh tế làm mồi trả nhiệm vụ Vàng.",
                    en: "Tuesday GAR/KvK (10:00–14:00 UTC) or completing short (5–30 min) Economy tech nodes to finish Gold Tasks.",
                  },
                  {
                    vi: "Cấm cắn Tăng tốc Nghiên cứu khi chưa kích hoạt Trait 3 (+25%–30% Tốc độ Tech) của Tướng Tím Kinh tế!",
                    en: "Never burn Research Speedups without first unlocking Trait 3 (+25%–30% Tech Speed) on your Epic Economy Heroes!",
                  },
                ],
                [
                  { vi: "12", en: "12" },
                  {
                    vi: "Tăng Tốc Huấn Luyện Lính (Troop Training Speedups)",
                    en: "Troop Training Speedups",
                  },
                  {
                    vi: "Thứ Sáu Kỳ GAR/KvK (14:00–18:00 UTC / 21:00–01:00 Giờ VN): Áp dụng Thăng cấp Bậc Thang (T4 ➔ T5 ➔ T6+) khi trùng GAR/KvK Day 5 + Ca Giờ Mở Rộng Quân Đội + Sự kiện phụ Ultimate Power / Rush Top.",
                    en: "Friday GAR/KvK (14:00–18:00 UTC): Execute Staircase Troop Promotion (T4 ➔ T5 ➔ T6+) overlapping GAR/KvK Day 5 + Hourly Army Expansion + Ultimate Power / Rush Top sub-event.",
                  },
                  {
                    vi: "Kỳ Thi Đấu Hội: Nhận Nhiệm vụ Vàng Luyện lính trên bảng Guild Race + Thu hoạch mẻ lính Pre-cook + Xả Tăng tốc trùng Rush Top.",
                    en: "Guild Race Week: Accept Gold Troop Training Tasks on the Guild Race board + harvest pre-cooked troops + spend Speedups overlapping Rush Top.",
                  },
                  {
                    vi: "Thứ Sáu Kỳ GAR/KvK (14:00–18:00 UTC / 21:00–01:00 Giờ VN) hoặc khung giờ Mở Rộng Quân Đội hàng ngày để lấy rương mốc Giờ.",
                    en: "Friday GAR/KvK (14:00–18:00 UTC) or daily Army Expansion hourly windows to claim hourly milestone chests.",
                  },
                  {
                    vi: "Cấm xả Tăng tốc để huấn luyện mới lính cấp thấp thay vì dùng cơ chế Thăng cấp (Promote) bậc thang!",
                    en: "Never burn Speedups training brand-new low-tier troops from scratch instead of using Staircase Promotion (Promote)!",
                  },
                ],
                [
                  { vi: "13", en: "13" },
                  {
                    vi: "Quân Trang (Glory Medals) & Trang Trí (Decor Tokens) (Troop Skins & Castle Decorations)",
                    en: "Troop Skins (Glory Medals) & Castle Decorations (Decor Tokens)",
                  },
                  {
                    vi: "Thứ Bảy (Ngày 6) Kỳ GAR/KvK: Xả Quân Trang (Glory Medals) & Trang Trí (Decor Tokens) khi trùng GAR/KvK Day 6 + Guild Rush: Nâng cấp Trang trí (T6–T7) + Sự kiện phụ Decorations!",
                    en: "Saturday (Day 6) GAR/KvK: Spend Troop Skins (Glory Medals) & Castle Decorations (Decor Tokens) overlapping GAR/KvK Day 6 + Guild Rush: Decor Upgrading (Fri–Sat) + Decorations sub-event!",
                  },
                  {
                    vi: "Thứ Sáu – Thứ Bảy Kỳ Thi Đấu Hội: Xả Quân Trang (Glory Medals) trùng Guild Rush: Quân Trang & Đồ Chúa Tể + NV Vàng Guild Race.",
                    en: "Friday – Saturday Guild Race Week: Spend Troop Skins (Glory Medals) overlapping Guild Rush: Troop Skin & Lord Gear + Guild Race Gold Tasks.",
                  },
                  {
                    vi: "Trong 3 ngày sự kiện phụ Decorations độc lập hoặc Guild Rush cuối tuần.",
                    en: "During a standalone 3-day Decorations sub-event or weekend Guild Rush.",
                  },
                  {
                    vi: "Cấm nâng cấp Quân Trang và Trang Trí vào đầu/giữa tuần (Thứ Hai ➔ Thứ Năm) khi không có sự kiện!",
                    en: "Never upgrade Troop Skins or Castle Decorations during early/mid-week (Monday ➔ Thursday) when no matching event is active!",
                  },
                ],
              ],
            },
            {
              type: "media_spotlight",
              mediaCode: "MED-3.4-04",
              tier: "tier4_youtube_ref",
              title: {
                vi: "Video Tham Chiếu Quốc Tế: Nghệ Thuật Canh Giờ Vàng Triple-Dip 300% (KvK + Hourly + Mini-Rush)",
                en: "International Video Reference: Mastering the 300% Triple-Dip Window (KvK + Hourly Event + Mini-Rush Overlap)",
              },
              description: {
                vi: "Hướng dẫn trực quan cách căn chỉnh đồng hồ 4 tiếng của Hourly Arms Race trùng khớp với Ngày Chủ Đề KvK/GAR và Guild Rush 2 ngày để nhận tối đa Kim Cương hoàn lại.",
                en: "Step-by-step visual guide on aligning the 4-Hour Hourly Arms Race clock with KvK/GAR Theme Days and 2-Day Guild Rush to maximize Diamond rebates.",
              },
              videoChannel: "RedBaron Gaming / OGFlux",
              videoTitle: "Master the 300% Triple-Dip Window: KvK + Hourly Event + Mini-Rush Overlap",
              videoTimestamp: "04:15 – 14:40",
              videoUrl: "https://www.youtube.com/results?search_query=top+heroes+double+dip+event+guide",
            },
          ],
        },
      ],
    },
    {
      id: "sec-5-thursday-triple-dip-case-study",
      isPro: true,
      title: {
        vi: "5. Kịch bản Thực chiến Nâng cao: Nhân Ba Lợi Tức (Triple-Dip 300%) Trong 15 Phút Chiều Thứ Năm Kỳ GAR/KvK (Hoàn Lại Gói $49.99 Miễn Phí)",
        en: "5. Advanced Tactical Case Study: Executing a 15-Minute Thursday 300% Triple-Dip Burst (9,800 Diamonds + 42 Universal Shards Rebate)",
      },
      blocks: [
        {
          type: "case_study",
          badge: {
            vi: "CASE STUDY THỰC CHIẾN — TRIPLE-DIP 300%",
            en: "TACTICAL CASE STUDY — 300% TRIPLE-DIP",
          },
          title: {
            vi: "Lâu Đài Lv.29 (Gói Tháng $4.99): Thực Thi Cú Nổ 15 Phút Khung 10:15–10:30 UTC (17:15–17:30 Giờ VN) Thứ Năm Kỳ GAR/KvK Thu Về Gói Hoàn Lại Tương Đương ~$49.99",
            en: "Castle Lv.29 ($4.99 Monthly Pass): 15-Minute Thursday 10:15–10:30 UTC GAR/KvK Triple-Dip Burst Yielding ~$49.99 in Free Rebate Rewards",
          },
          profileSummary: {
            vi: "Một tài khoản **Lâu đài Lv.29** (Đội 1 Liên Minh / Bộ Lạc, ngân sách gói Tháng `$4.99`) đã kiên trì đóng băng túi đồ suốt các ngày thường.\n• **Kho Hồn Đá Đỏ:** Có `365 Mảnh Vàng` và `9 viên Hồn Đá Đỏ` (đổi giá `40,000` Điểm Vinh Dự hoặc `6,000` Xu Vinh Quang / viên, giữ nguyên Ngưỡng Đóng Băng Ví `40,000` Điểm Vinh Dự / `12,000–18,000` Xu Vinh Quang).\n• **Kho bổ trợ:** Sẵn sàng `6,000 Sách Kỹ Năng Cam`, `240 Thẻ Chiêu Mộ` và nguyên liệu Đồ Chúa Tể (`Lord Gear`).",
            en: "A **Castle Lv.29** account (Queue 1 League or Horde, `$4.99` Monthly Pass budget) strictly froze its inventory across all non-scoring days.\n• **Soul Stone stockpile:** Holds `365 Universal Shards` and `9 Soul Stones` (redeemed at `40,000` Guild Honor or `6,000` Glory Coins / stone while keeping the `40,000` / `12,000–18,000` Wallet Freeze Floor).\n• **Support stockpile:** Ready with `6,000 Legendary Skill Books`, `240 Tavern Recruit Tokens`, and `Lord Gear` materials.",
          },
          metrics: [
            {
              label: {
                vi: "Kim Cương Hoàn Lại (Diamond Rebate)",
                en: "Diamond Rebate",
              },
              before: {
                vi: "0 Kim Cương (Người chơi A đập lẻ tẻ Thứ Ba Kỳ Thi Đấu Hội — 0%)",
                en: "0 Diamonds (Player A spending piecemeal on Tuesday Guild Race — 0%)",
              },
              after: {
                vi: "9,800 Kim Cương (Người chơi B nổ Triple-Dip 10:15 UTC / 17:15 Giờ VN Thứ Năm Kỳ GAR/KvK)",
                en: "9,800 Diamonds (Player B executing 10:15 UTC Thursday GAR/KvK Triple-Dip)",
              },
              delta: {
                vi: "+9,800 Kim Cương miễn phí",
                en: "+9,800 Free Diamonds",
              },
            },
            {
              label: {
                vi: "Mảnh Tướng Vàng & Sách Kỹ Năng Hoàn Lại",
                en: "Universal Shards & Skill Books Rebate",
              },
              before: {
                vi: "0 Mảnh Vàng / 0 Sách Kỹ Năng hoàn lại",
                en: "0 Universal Shards / 0 Skill Books returned",
              },
              after: {
                vi: "42 Mảnh Tướng Vàng Vạn Năng + 1,200 Sách Kỹ Năng",
                en: "42 Universal Legendary Shards + 1,200 Skill Books",
              },
              delta: {
                vi: "+42 Mảnh Vàng & +1,200 Sách Kỹ Năng",
                en: "+42 Universal Shards & +1,200 Skill Books",
              },
            },
            {
              label: {
                vi: "Tăng Tốc Hoàn Lại & Giá Trị Quy Đổi",
                en: "Speedup Rebate & Equivalent Pack Value",
              },
              before: {
                vi: "0 giờ Tăng tốc ($0 giá trị cộng thêm)",
                en: "0h Speedups ($0 bonus value)",
              },
              after: {
                vi: "65 giờ Tăng tốc (Tổng gói hoàn lại tương đương ~$49.99)",
                en: "65h Speedups (Total rebate bundle worth ~$49.99)",
              },
              delta: {
                vi: "+65h Tăng tốc (~$49.99 Rebate)",
                en: "+65h Speedups (~$49.99 Rebate)",
              },
            },
          ],
          diagnostics: [
            {
              vi: "**Lớp 1 (`7-Day Macro Event`):** Ngày 4 của Kingdom Duel (`KvK Stage 4: Hero Growth` — Hồn Đá Đỏ `120,000đ/viên` + tính điểm phụ Đồ Chúa Tể `Lord Gear`).",
              en: "**Layer 1 (`7-Day Macro Event`):** Day 4 of Kingdom Duel (`KvK Stage 4: Hero Growth` — Soul Stones score `120,000 pts/stone` + secondary scoring for `Lord Gear`).",
            },
            {
              vi: "**Lớp 2 (`Guild Rush & Sub-Event`):** Ngày thứ 2 của `Guild Rush: Phát triển Tướng (Thứ Tư–Thứ Năm)` kết hợp sự kiện phụ `Soul Stone Rush`.",
              en: "**Layer 2 (`Guild Rush & Sub-Event`):** Day 2 of `Guild Rush: Hero Development (Wed–Thu)` combined with the `Soul Stone Rush` sub-event.",
            },
            {
              vi: "**Lớp 3 (`4-Hour Hourly Window`):** Khung giờ vàng `10:00 – 14:00 UTC (17:00 – 21:00 Giờ VN)` của `Hourly Arms Race` (ca `Bồi Dưỡng Anh Hùng / Hero Development`).",
              en: "**Layer 3 (`4-Hour Hourly Window`):** The `10:00 – 14:00 UTC` golden shift of `Hourly Arms Race` (`Hero Development` theme).",
            },
          ],
          recoverySteps: [
            {
              stepNumber: "01",
              title: {
                vi: "Đóng Băng Túi Đồ Ngày Thường & Bảo Toàn Ngưỡng Đóng Băng Ví",
                en: "Off-Day Inventory Freeze & Wallet Floor Preservation",
              },
              detail: {
                vi: "Tích lũy đủ `365 Mảnh Tướng Vàng Vạn Năng` và `9 viên Hồn Đá Đỏ` (đổi với giá `40,000` Điểm Vinh Dự Bang / viên hoặc `6,000` Xu Vinh Quang Hội / viên).\n• **Bảo toàn vốn và phụ liệu:** Giữ nguyên **Ngưỡng Đóng Băng Ví** (`40,000` Điểm Vinh Dự / `12,000–18,000` Xu Vinh Quang), kèm `6,000 Sách Kỹ Năng Cam`, `240 Thẻ Chiêu Mộ` và nguyên liệu `Lord Gear`.",
                en: "Accumulate `365 Universal Legendary Shards` and `9 Soul Stones` (redeemed at `40,000` Guild Honor / stone or `6,000` Guild Glory Coins / stone).\n• **Preserve floor and materials:** Keep the **Wallet Freeze Floor** (`40,000` Guild Honor / `12,000–18,000` Glory Coins) intact, alongside `6,000 Skill Books`, `240 Recruit Tokens`, and `Lord Gear` materials.",
              },
              impactBadge: {
                vi: "365 MẢNH + 9 HỒN ĐÁ ĐỎ",
                en: "365 SHARDS + 9 SOUL STONES",
              },
            },
            {
              stepNumber: "02",
              title: {
                vi: "Thực Thi Cú Nổ Triple-Dip Trong 15 Phút (10:15 – 10:30 UTC / 17:15 – 17:30 Giờ VN Thứ Năm Kỳ GAR/KvK)",
                en: "Execute the 15-Minute Triple-Dip Burst (Thursday 10:15 – 10:30 UTC GAR/KvK)",
              },
              detail: {
                vi: "Đúng `10:15 UTC (17:15 Giờ VN) Thứ Năm` khi 3 lớp sự kiện giao thoa, mở khóa **4 Bậc Thức Tỉnh** (`Awakening Tier 1 ➔ Tier 4`: tốn `1 + 2 + 2 + 4 = 9 Hồn Đá Đỏ` + `345–385 Mảnh`) cho tướng Vàng chủ lực Đội 1.\n• **Xả đồng bộ phụ liệu:** Đồng thời xả `240 Thẻ Chiêu Mộ`, `6,000 Sách Kỹ Năng` và nâng cấp Đồ Chúa Tể (`Lord Gear`).",
                en: "At `10:15 UTC Thursday` when all 3 event layers align, unlock all **4 Awakening Tiers** (`Tier 1 ➔ Tier 4`: costing `1 + 2 + 2 + 4 = 9 Soul Stones` + `345–385 Hero Shards`) on Queue 1's core Legendary carry.\n• **Synchronized material dump:** Simultaneously spend `240 Recruit Tokens`, `6,000 Skill Books`, and upgrade `Lord Gear`.",
              },
              impactBadge: {
                vi: "1 + 2 + 2 + 4 = 9 HỒN ĐÁ",
                en: "1 + 2 + 2 + 4 = 9 STONES",
              },
            },
            {
              stepNumber: "03",
              title: {
                vi: "Thu Hoạch Đồng Thời 3 Bảng Xếp Hạng & Rương Nhân Đôi",
                en: "Claim 3 Simultaneous Event Boards & Double Milestone Chests",
              },
              detail: {
                vi: "Ăn trọn lớp vĩ mô và trung gian: `(1) 6/6 Rương Cá Nhân + 3 Rương Nhân Đôi (Double Rewards)` của KvK Stage 4; và `(2) 3/3 Rương Mốc + Top 5 Bảng Xếp Hạng` của sự kiện phụ Soul Stone / Hero Rush.\n• **Chốt hạ lớp vi mô:** Ăn tiếp `(3) 3/3 Rương Mốc + Top 1 Bảng Xếp Hạng` Ca Giờ `10:00–14:00 UTC (17:00–21:00 Giờ VN)`.",
                en: "Sweep the macro and mid-tier tracks: `(1) 6/6 Personal Chests + 3 Double Rewards Chests` in KvK Stage 4; and `(2) 3/3 Milestone Chests + Top 5 Leaderboard` in the Soul Stone / Hero Rush sub-event.\n• **Close out the micro track:** Claim `(3) 3/3 Milestone Chests + Top 1 Leaderboard` in the `10:00–14:00 UTC` Hourly Arms Race shift.",
              },
              impactBadge: {
                vi: "HOÀN LẠI ~$49.99 MIỄN PHÍ",
                en: "~$49.99 FREE REBATE",
              },
            },
          ],
          conclusion: {
            vi: "**Tổng phần thưởng hoàn lại (`Rebate`):** Thu về `9,800` Kim Cương, `42 Mảnh Tướng Vàng Vạn Năng`, `1,200 Sách Kỹ Năng` và `65 giờ Tăng tốc`.\n• **Giá trị thực chiến:** Tương đương một gói nạp `~$49.99` hoàn toàn miễn phí chỉ nhờ kỷ luật canh giờ `Triple-Dip 300%`!",
            en: "**Total Rebate Earned:** `9,800` Diamonds, `42 Universal Legendary Shards`, `1,200 Skill Books`, and `65 hours of Speedups`.\n• **Tactical value:** Equivalent to a `~$49.99` store bundle completely free, achieved purely through `300% Triple-Dip` timing discipline!",
          },
        },
      ],
    },
  ],
};

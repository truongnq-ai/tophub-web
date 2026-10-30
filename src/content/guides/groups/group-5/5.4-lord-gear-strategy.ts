import type { GuideArticle } from "../../types";

export const ARTICLE_5_4_LORD_GEAR_STRATEGY: GuideArticle = {
  code: "5.4",
  displayCode: "6.4",
  slug: "lord-gear-strategy",
  categorySlug: "gear",
  badge: "PRO",
  readingMinutes: 11,
  title: {
    vi: "Chiến Thuật Trang Bị Chúa Tể (Lord Gear): Nhánh Trái/Phải, Lệch Pha Thông Minh & Bảng Chi Phí Toàn Trình",
    en: "Lord Gear Strategy: Left/Right Split, Smart Staggered Upgrades & Complete Cost Tables",
  },
  summary: {
    vi: "Giải mã 6 món Trang bị Chúa Tể theo 3 Phe phái và 2 nhánh Trái/Phải (Tab Аркуш23), chu trình 4 bước Lệch Pha Thông Minh (Smart Staggered Upgrade), điều kiện mở Ô thứ 7 (Legendary T1) & Sách Thánh Sacred Codex (Legendary T2) ở Season 3, bảng chi phí 102 nấc từ G1 đến Mythic T1 3★ (958,800 Thép/món) và kỷ luật cấm xả Ngày 6 Thứ Bảy.",
    en: "Master the 6 Lord Gear slots across 3 Factions and Left/Right stat branches (Tab Аркуш23), the 4-step Smart Staggered Upgrade cycle, Season 3 unlock requirements for the 7th Slot (Legendary T1) & Sacred Codex (Legendary T2), complete 102-step G1-to-Mythic T1 3★ cost tables (958,800 Refined Metal/piece), and strict event Double-Dip timing.",
  },
  tldr: {
    coreRule: {
      vi: "6 món **Trang bị Chúa Tể (`Lord Gear`)** chia đều cho 3 Phe phái (mỗi phe 2 món):\n• **Nhánh Phải (`RIGHT` — 3 món Công):** Cộng `% ATK` Tướng Phe, `% ATK` Lính Phe & `% HP` Toàn Lính (đỉnh `Mythic T1 3★`: `+20.75%` / `+43.15%` / `+38.00%`).\n• **Nhánh Trái (`LEFT` — 3 món Thủ):** Cộng `% HP` Tướng Phe, `% HP` Lính Phe & `% ATK` Toàn Lính (đỉnh `Mythic T1 3★`: `+41.45%` / `+113.95%` / `+14.40%`).",
      en: "The 6 **Lord Gear (`Military Gear`)** pieces split across the 3 Factions (2 per faction):\n• **Right Branch (`RIGHT` — 3 Offense Slots):** Boosts Faction Hero/Soldier `ATK` & All Soldiers `HP` (`Mythic T1 3★` cap: `+20.75%` / `+43.15%` / `+38.00%`).\n• **Left Branch (`LEFT` — 3 Defense Slots):** Boosts Faction Hero/Soldier `HP` & All Soldiers `ATK` (`Mythic T1 3★` cap: `+41.45%` / `+113.95%` / `+14.40%`).",
    },
    immediateAction: {
      vi: "Áp dụng chu trình 4 bước **Lệch Pha Thông Minh (`Smart Staggered Upgrade`)**:\n• **Bước 1 & 2 (Hệ Đội 1):** Đẩy món **Nhánh Phải (`RIGHT`)** dẫn trước 1 bậc nhỏ, tiếp theo là món **Nhánh Trái (`LEFT`)** của Hệ Đội 1.\n• **Bước 3 & 4 (Hệ Phụ):** Nâng 1 món **Nhánh Trái (`LEFT`)** Hệ Phụ kích `Cộng hưởng 3 món`, rồi kéo nốt 3 món còn lại chốt `Cộng hưởng 6 món`.",
      en: "Execute the 4-step **Smart Staggered Upgrade** cycle:\n• **Steps 1 & 2 (Queue 1 Faction):** Push your Queue 1 **Right-side (`RIGHT`)** piece 1 sub-tier ahead first, then its **Left-side (`LEFT`)** piece.\n• **Steps 3 & 4 (Off-Faction):** Upgrade 1 off-faction **Left-side (`LEFT`)** piece to trigger `3-Piece Resonance`, then pull the last 3 pieces up for `6-Piece Resonance`.",
    },
    strictTaboo: {
      vi: "Tuyệt đối **KHÔNG bấm nâng cấp Đồ Chúa Tể** vào ngày thường hay **Ngày 6 (Thứ Bảy)**:\n• **Bẫy Ngày 6 (Thứ Bảy):** Chỉ tính điểm Quân Trang (`Troop Skins`), hoàn toàn cho `0 điểm` Đồ Chúa Tể.\n• **Kỷ luật Double-Dip:** Tích 100% nguyên liệu xả vào **Ngày 3 & Ngày 4** Kỳ `GAR / KvK` (cộng Ngày 5 trong `KvK`) hoặc **Ngày 5–7** Kỳ Thi Đấu Hội (`Guild Race`).",
      en: "Strictly **NEVER upgrade Lord Gear** on normal weekdays or on **Day 6 (Saturday)**:\n• **Day 6 (Saturday) Trap:** Scores `Troop Skins` exclusively and awards `0 points` for Lord Gear.\n• **Double-Dip Discipline:** Hoard 100% of materials to dump on **Days 3 & 4** of `GAR / KvK` (plus Day 5 in `KvK`) or **Days 5–7** of `Guild Race`.",
    },
  },
  keyTakeaways: [
    {
      vi: "**Tổng chi phí 102 nấc nâng cấp (`G1 ➔ Mythic T1 3★`):** `958,800` Đá Xanh / Thép Tinh Luyện + `9,955` Dây Gai + `2,030` Bản Vẽ + `101` Máu Rồng cho 1 món.\n• **Toàn bộ 6 món:** Tốn `5,752,800` Thép + `59,730` Dây Gai + `12,180` Bản Vẽ + `606` Máu Rồng (điểm nghẽn `175` Bản Vẽ/món = `1,050` Bản Vẽ từ `B1 1★` đến hết `P4 3★`).",
      en: "**Complete 102-Step Upgrade Cost (`G1 ➔ Mythic T1 3★`):** `958,800` Refined Metal + `9,955` Magic Thread + `2,030` Blueprints/Orichalcum + `101` Dragon Blood per piece.\n• **All 6 Pieces Total:** Requires `5,752,800` Refined Metal + `59,730` Magic Thread + `12,180` Blueprints + `606` Dragon Blood (with a `175` Blueprints/piece = `1,050` Blueprints bottleneck from `B1 1★` to `P4 3★`).",
    },
    {
      vi: "**Điều kiện mở khóa tính năng `Season 3`:** Cả 6 món chính phải đạt tối thiểu bậc Vàng `Y1` (`T1 Legendary`) để mở **Ô Trang bị Chúa Tể Thứ 7** vào Tuần 3 `Season 3`.\n• **Mở khóa Thánh Điển (`Sacred Codex`):** Cả 6 món chính bắt buộc đạt tối thiểu bậc Vàng `Y2` (`T2 Legendary`) vào Tuần 4 `Season 3`.",
      en: "**`Season 3` Unlock Requirements:** All 6 main Lord Gear pieces must reach at least `Y1` (`T1 Legendary`) to unlock the **7th Lord Gear Slot** in `Season 3` Week 3.\n• **Sacred Codex Unlock:** All 6 main pieces must reach at least `Y2` (`T2 Legendary`) in `Season 3` Week 4.",
    },
    {
      vi: "**Điểm sự kiện Đồ Chúa Tể:** Trong Kỳ `GAR / KvK` (Ngày 3 & 4), mỗi `100` Thép Tinh Luyện = `400 điểm` và mỗi `1` Dây Gai = `400 điểm`.\n• **Ăn kép Kỳ Thi Đấu Hội (`Guild Race` Ngày 5–7):** Nhận Nhiệm vụ Vàng Độc quyền (`Exclusive Gold Task`) kết hợp sự kiện phụ `Guild Rush: Troop Skin & Lord Gear`.",
      en: "**Lord Gear Event Scoring:** During `GAR / KvK` (Days 3 & 4), every `100` Refined Metal = `400 points` and every `1` Magic Thread = `400 points`.\n• **`Guild Race` (Days 5–7) Double-Dip:** Stack `Exclusive Gold Task` selections with the `Guild Rush: Troop Skin & Lord Gear` milestone event.",
    },
  ],
  keywords: [
    "trang bị chúa tể",
    "trang bi chua te",
    "đồ lãnh chúa",
    "lord gear",
    "military gear",
    "nhánh trái",
    "nhánh phải",
    "lệch pha thông minh",
    "lech pha thong minh",
    "smart staggered upgrade",
    "refined metal",
    "thép tinh luyện",
    "magic thread",
    "dây gai",
    "blueprints",
    "orichalcum",
    "bản vẽ",
    "dragon blood",
    "máu rồng",
    "sacred codex",
    "sách thánh",
    "thánh điển",
    "аркуш23",
  ],
  sourceFiles: [
    "docs/06-game-guides/07-standardized-web-guides/group-5-gear-and-weapons/5.4-lord-gear-strategy.md",
    "docs/06-game-guides/07-standardized-web-guides/group-8-infrastructure/8.4-master-data-tables.md",
  ],
  freeSections: [
    {
      id: "sec-1-lord-gear-six-slots-and-resonance",
      title: {
        vi: "1. Giải thích Cơ chế Cốt lõi: Cấu Trúc 6 Món Trang Bị Chúa Tể (LEFT vs RIGHT) & Cộng Hưởng Đồng Bộ",
        en: "1. Core Mechanics: Anatomy of the 6 Lord Gear Slots (LEFT vs RIGHT) & 3/6-Piece Tier Resonance",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "Khác với Trang bị Tướng chỉ tác dụng lên 1 cá nhân, **Trang bị Chúa Tể (`Lord Gear / Military Gear`)** cung cấp Chỉ số Toàn cục (`Global Passive Buff`) cộng thẳng `% ATK` và `% HP` cho toàn bộ Tướng lẫn Binh lính.\n• **Cấu trúc đối xứng (Tab Аркуш23):** 6 ô Trang bị Chúa Tể chia đều theo 3 Phe phái (Liên Minh, Bộ Lạc, Thiên Nhiên) và 2 cột **Nhánh Trái (`LEFT`)** / **Nhánh Phải (`RIGHT`)**.",
            en: "Unlike Hero Gear which only buffs a single hero, **Lord Gear (`Military Gear`)** inside your Lord Profile grants a permanent `Global Passive Buff` (`% ATK` and `% HP`) to all Heroes and Soldiers across every mode.\n• **Symmetrical Matrix (Tab Аркуш23):** The 6 Lord Gear slots divide evenly across the 3 Factions (League, Horde, Nature) and 2 stat columns: **Left Branch (`LEFT`)** and **Right Branch (`RIGHT`)**.",
          },
        },
        {
          type: "callout",
          variant: "rule",
          title: {
            vi: "Quy Tắc Cốt Lõi: Phân Tách Nhánh Phải (RIGHT — Công) vs Nhánh Trái (LEFT — Thủ) & Mở Khóa Season 3",
            en: "Core Rule: Right Branch (RIGHT — Offense) vs Left Branch (LEFT — Defense) & Season 3 Unlocks",
          },
          content: {
            vi: "**Nhánh Phải (`RIGHT` — 3 Món Công)** đạt đỉnh `Mythic T1 3★`: `+20.75%` ATK Tướng Phe, `+43.15%` ATK Lính Phe, `+38.00%` HP Toàn Lính (mốc `Mythic T1 1★`: `+18.70%` / `+38.90%` / `+34.25%`).\n• **Nhánh Trái (`LEFT` — 3 Món Thủ)** đạt đỉnh `Mythic T1 3★`: `+41.45%` HP Tướng Phe, `+113.95%` HP Lính Phe, và `+14.40%` ATK Toàn bộ Lính.\n• **Mở khóa Season 3:** Đủ 6 món Vàng `Y1` mở Ô Chúa Tể Thứ 7 (Tuần 3 S3); đủ 6 món Vàng `Y2` mở Thánh Điển `Sacred Codex` (Tuần 4 S3).",
            en: "**Right Branch (`RIGHT` — 3 Offense Slots)** at `Mythic T1 3★` Cap: `+20.75%` Faction Hero ATK, `+43.15%` Faction Soldier ATK, `+38.00%` All Soldiers HP (`Mythic T1 1★`: `+18.70%` / `+38.90%` / `+34.25%`).\n• **Left Branch (`LEFT` — 3 Defense Slots)** at `Mythic T1 3★` Cap: `+41.45%` Faction Hero HP, `+113.95%` Faction Soldier HP, and `+14.40%` All Soldiers ATK.\n• **Season 3 Unlocks:** Reaching 6 pieces at `Y1` unlocks the 7th Slot (S3 Week 3); reaching 6 pieces at `Y2` unlocks the `Sacred Codex` (S3 Week 4).",
          },
        },
        {
          type: "table",
          caption: {
            vi: "Bảng 1: Giải Phẫu Ma Trận 6 Ô Trang Bị Chúa Tể Theo 2 Nhánh Trái (LEFT) & Phải (RIGHT) — Nguồn: TopHeroes Tables (Tab Аркуш23)",
            en: "Table 1: Anatomy of the 6 Lord Gear Slots Across Left (LEFT) & Right (RIGHT) Branches — Source: TopHeroes Tables (Tab Аркуш23)",
          },
          headers: [
            {
              vi: "Phân Nhánh & 3 Món Theo Phe",
              en: "Profile Branch & 3 Faction Slots",
            },
            {
              vi: "3 Dòng Chỉ Số Cộng Thêm Trên Mỗi Món",
              en: "3 Stat Lines Granted Per Piece",
            },
            {
              vi: "Giá Trị Cực Đại (Mythic T1 1★ & 3★ Kịch Trần / Món)",
              en: "Peak Endgame Values (Mythic T1 1★ & 3★ Cap / Piece)",
            },
            {
              vi: "Vai Trò Chiến Thuật Cốt Lõi",
              en: "Core Tactical Role",
            },
          ],
          rows: [
            [
              {
                vi: "Nhánh Trái (LEFT — 3 Món): 1 Liên Minh (League) • 1 Bộ Lạc (Horde) • 1 Thiên Nhiên (Nature)",
                en: "Left Branch (LEFT — 3 Slots): 1 League • 1 Horde • 1 Nature",
              },
              {
                vi: "(1) % HP Tướng theo Phe (Faction Hero HP) • (2) % HP Lính theo Phe (Faction Soldier HP) • (3) % ATK Toàn bộ Lính (All Soldiers Attack)",
                en: "(1) Faction Hero HP (%) • (2) Faction Soldier HP (%) • (3) All Soldiers Attack (%)",
              },
              {
                vi: "Mythic T1 3★ Kịch Trần: +41.45% HP Tướng Phe / +113.95% HP Lính Phe / +14.40% ATK Toàn bộ Lính",
                en: "Mythic T1 3★ Cap: +41.45% Faction Hero HP / +113.95% Faction Soldier HP / +14.40% All Soldiers ATK",
              },
              {
                vi: "Gia tăng độ trâu bò khổng lồ cho dàn chắn của Phe tương ứng, đồng thời cộng thêm một lượng +14.40% ATK nền tảng cho toàn bộ quân lính mọi hệ.",
                en: "Massively increases frontline durability for the matching Faction while granting a foundational +14.40% All Soldiers ATK bonus across all queues.",
              },
            ],
            [
              {
                vi: "Nhánh Phải (RIGHT — 3 Món): 1 Liên Minh (League) • 1 Bộ Lạc (Horde) • 1 Thiên Nhiên (Nature)",
                en: "Right Branch (RIGHT — 3 Slots): 1 League • 1 Horde • 1 Nature",
              },
              {
                vi: "(1) % ATK Tướng theo Phe (Faction Hero Attack) • (2) % ATK Lính theo Phe (Faction Soldier Attack) • (3) % HP Toàn bộ Lính (All Soldiers HP)",
                en: "(1) Faction Hero Attack (%) • (2) Faction Soldier Attack (%) • (3) All Soldiers HP (%)",
              },
              {
                vi: "Mythic T1 1★: +18.70% Hero ATK / +38.90% Soldier ATK / +34.25% All HP • Mythic T1 3★ Kịch Trần: +20.75% Hero ATK / +43.15% Soldier ATK / +38.00% All HP",
                en: "Mythic T1 1★: +18.70% Hero ATK / +38.90% Soldier ATK / +34.25% All HP • Mythic T1 3★ Cap: +20.75% Hero ATK / +43.15% Soldier ATK / +38.00% All HP",
              },
              {
                vi: "Gia tăng trực tiếp Sức tấn công (% ATK) cho cả Tướng lẫn Lính của Phe tương ứng — đây là nhánh quyết định khả năng xuyên phá mục tiêu của Đội 1.",
                en: "Directly amplifies offensive power (% ATK) for both Heroes and Soldiers of the matching Faction — the decisive branch for Queue 1 target breakthrough.",
              },
            ],
          ],
        },
        {
          type: "list",
          items: [
            {
              vi: "**Cộng hưởng 3 Món (3-Piece Resonance):** Kích hoạt ngay khi có ít nhất 3 trên 6 món đạt cùng một bậc phẩm chất và cấp Sao (ví dụ: 3 món cùng đạt Tím 1★ hoặc Vàng Y1).",
              en: "**3-Piece Resonance:** Activates immediately when at least 3 out of 6 pieces reach the exact same quality tier and star level (e.g., 3 pieces at Epic 1★ or Legendary Y1).",
            },
            {
              vi: "**Cộng hưởng 6 Món (6-Piece Resonance):** Kích hoạt khi cả 6 trên 6 món đều chạm cùng một bậc phẩm chất và cấp Sao, mang lại bước nhảy vọt Lực chiến toàn cục.",
              en: "**6-Piece Resonance:** Activates when all 6 out of 6 pieces reach the same quality tier and star level, granting a massive global combat power spike.",
            },
            {
              vi: "**Điều kiện Mở khóa Season 3:** Đủ 6 món đạt Vàng Y1 (T1 Legendary) mở Ô Chúa Tể Thứ 7 (Tuần 3 Season 3); đủ 6 món đạt Vàng Y2 (T2 Legendary) mở Thánh Điển (Sacred Codex, Tuần 4 Season 3).",
              en: "**Season 3 Unlock Requirements:** All 6 pieces at Y1 (T1 Legendary) unlocks the 7th Lord Gear Slot (Season 3 Week 3); all 6 at Y2 (T2 Legendary) unlocks the Sacred Codex (Season 3 Week 4).",
            },
          ],
        },
        {
          type: "media_spotlight",
          mediaCode: "MED-5.4-01",
          tier: "tier2_annotated_ui",
          title: {
            vi: "Giải Phẫu Giao Diện Hồ Sơ Lãnh Chúa: Nhánh Trái (LEFT), Nhánh Phải (RIGHT) & 4 Nguyên Liệu Cốt Lõi (MED-5.4-01)",
            en: "Lord Profile UI Anatomy: Left Branch (LEFT), Right Branch (RIGHT) & 4 Core Upgrade Materials (MED-5.4-01)",
          },
          description: {
            vi: "Sơ đồ khoanh vùng giao diện Trang bị Chúa Tể (Lord Gear) hiển thị rõ 3 ô Nhánh Trái (+HP Phe & +ATK Toàn Lính), 3 ô Nhánh Phải (+ATK Phe & +HP Toàn Lính), biểu tượng Cộng hưởng 3/6 món ở trung tâm cùng bộ 4 nguyên liệu chuẩn: Đá Xanh / Thép Tinh Luyện (Refined Metal), Dây Gai / Chỉ Phép (Magic Thread), Bản Vẽ / Hợp Kim (Blueprints / Orichalcum) và Nguyên Liệu Đỏ / Máu Rồng (Dragon Blood).",
            en: "Annotated Lord Profile interface highlighting the 3 Left Branch slots (+Faction HP & +All Soldiers ATK), 3 Right Branch slots (+Faction ATK & +All Soldiers HP), the central 3/6-Piece Resonance emblem, and the 4 core materials: Refined Metal, Magic Thread, Blueprints / Orichalcum, and Dragon Blood.",
          },
          videoChannel: "OGFlux / RedBaron Gaming",
          videoTitle: "Top Heroes Lord Gear Upgrade Priority & Event Double-Dip Guide",
          videoTimestamp: "01:45 – 07:30",
          videoUrl: "https://www.youtube.com/watch?v=9xN0rK5pQ2M",
          annotations: [
            {
              kind: "do",
              label: {
                vi: "Ưu tiên số 1: Cột Phải (RIGHT) Hệ Đội 1",
                en: "#1 Priority: Queue 1 Right Branch (RIGHT)",
              },
              detail: {
                vi: "Đập món Nhánh Phải của Hệ Đội 1 lên bậc mới trước tiên để lấy ngay % ATK Tướng Phe & % ATK Lính Phe (đỉnh Mythic T1 3★ đạt +20.75% / +43.15% / +38.00%).",
                en: "Upgrade your Queue 1 Faction's Right-side slot first to immediately capture Faction Hero ATK & Faction Soldier ATK (Mythic T1 3★ peak: +20.75% / +43.15% / +38.00%).",
              },
            },
            {
              kind: "info",
              label: {
                vi: "Giá trị ẩn của Cột Trái (LEFT) Hệ Phụ",
                en: "Hidden Value of Off-Faction Left Slots (LEFT)",
              },
              detail: {
                vi: "Dòng thứ 3 của cả 3 món Nhánh Trái cộng % ATK Toàn bộ Lính (+14.40% ở Mythic T1 3★), nên khi kéo món thứ 3 kích Cộng hưởng 3 món hãy ưu tiên chọn Nhánh Trái của Hệ Phụ.",
                en: "The 3rd stat line on all 3 Left-side pieces grants All Soldiers ATK (+14.40% at Mythic T1 3★), so always pick an off-faction Left-side slot as your 3rd piece to trigger 3-Piece Resonance.",
              },
            },
            {
              kind: "dont",
              label: {
                vi: "Cấm bỏ rơi 4 món Hệ Phụ quá 1 bậc",
                en: "Never Leave 4 Off-Faction Slots Behind",
              },
              detail: {
                vi: "Bỏ mặc 4 món phụ ở Lục/Lam khiến bạn mất Cộng hưởng 6 món và bị khóa cứng không thể mở Ô Thứ 7 (Y1) & Sacred Codex (Y2) ở Season 3.",
                en: "Leaving 4 off-faction pieces at Green/Blue forfeits 6-Piece Resonance and locks you out of the Season 3 7th Slot (Y1) & Sacred Codex (Y2).",
              },
            },
          ],
        },
      ],
    },
    {
      id: "sec-2-three-faction-priority-and-event-discipline",
      title: {
        vi: "2. Chiến thuật Tối ưu cho F2P & Low-Spender: Thứ Tự Ưu Tiên Theo 3 Phe & Kỷ Luật Xả Sự Kiện",
        en: "2. F2P & Low-Spender Strategy: 3-Faction Upgrade Priority & Ground-Truth Event Dump Schedule",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "Nguyên liệu nâng cấp Trang bị Chúa Tể gồm 4 loại chuẩn: **Đá Xanh / Thép (`Refined Metal`)**, **Dây Gai (`Magic Thread`)**, **Bản Vẽ (`Blueprints / Orichalcum`)** và **Máu Rồng (`Dragon Blood`)**.\n• **Kỷ luật tối ưu:** Vì nguồn cung miễn phí rất giới hạn và Đồ Chúa Tể là mỏ điểm sự kiện cực lớn, hãy tuân thủ thứ tự nâng cấp 3 bước và lịch xả `Ground-Truth` dưới đây.",
            en: "Lord Gear progression uses 4 standardized materials: **Refined Metal**, **Magic Thread**, **Blueprints / Orichalcum**, and **Dragon Blood**.\n• **Optimization Discipline:** Because free supply is tightly gated and Lord Gear is a top-scoring event category, enforce this 3-step priority and `Ground-Truth` dump schedule.",
          },
        },
        {
          type: "roadmap",
          steps: [
            {
              badge: {
                vi: "ƯU TIÊN #1 & #2 (HỆ ĐỘI 1)",
                en: "PRIORITY #1 & #2 (QUEUE 1 FACTION)",
              },
              title: {
                vi: "Món Nhánh Phải (RIGHT) ➔ Món Nhánh Trái (LEFT) Của Hệ Đội 1",
                en: "Queue 1 Right Branch (RIGHT) ➔ Queue 1 Left Branch (LEFT)",
              },
              timing: {
                vi: "Mở đầu mỗi chu kỳ nâng cấp",
                en: "Start of every upgrade cycle",
              },
              description: {
                vi: "Đập món Nhánh Phải (RIGHT) thuộc Phe Đội 1 (Bộ Lạc / Liên Minh / Thiên Nhiên) lên bậc N+1 trước để tối đa hóa % ATK, tiếp theo là món Nhánh Trái (LEFT) của Đội 1 lên bậc N+1.",
                en: "Push your Queue 1 Faction's Right-side (RIGHT) slot (Horde / League / Nature) to tier N+1 first for maximum % ATK, followed immediately by Queue 1's Left-side (LEFT) slot.",
              },
            },
            {
              badge: {
                vi: "ƯU TIÊN #3 ➔ #6 (KÍCH CỘNG HƯỞNG)",
                en: "PRIORITY #3 ➔ #6 (RESONANCE SYNC)",
              },
              title: {
                vi: "1 Món Nhánh Trái Hệ Phụ (Cộng Hưởng 3 Món) ➔ 3 Món Còn Lại (Cộng Hưởng 6 Món)",
                en: "1 Off-Faction Left Slot (3-Piece Resonance) ➔ Remaining 3 Slots (6-Piece Resonance)",
              },
              timing: {
                vi: "Giữ độ lệch tối đa không quá 1 bậc nhỏ",
                en: "Keep max gap within 1 sub-tier",
              },
              description: {
                vi: "Nâng 1 món Nhánh Trái (LEFT) của Hệ Phụ để lấy % ATK Toàn bộ Lính và bật Cộng hưởng 3 món, sau đó kéo nốt 3 món còn lại lên cùng bậc để hoàn tất Cộng hưởng 6 món.",
                en: "Upgrade 1 off-faction Left-side (LEFT) piece for All Soldiers ATK and 3-Piece Resonance, then pull the last 3 off-faction pieces up to complete 6-Piece Resonance.",
              },
            },
            {
              badge: {
                vi: "GIỜ VÀNG XẢ KHO (DOUBLE-DIP)",
                en: "GOLDEN DUMP WINDOWS (DOUBLE-DIP)",
              },
              title: {
                vi: "Kỳ GAR/KvK Ngày 3–4 (400 Điểm) & Kỳ Thi Đấu Hội Ngày 5–7 (Guild Race Double-Dip)",
                en: "GAR/KvK Days 3–4 (400 Pts) & Guild Race Days 5–7 (Double-Dip)",
              },
              timing: {
                vi: "Cấm tuyệt đối xả Ngày 6 (Thứ Bảy)",
                en: "Strictly forbidden on Day 6 (Saturday)",
              },
              description: {
                vi: "Kỳ GAR/KvK xả vào Thứ Tư & Thứ Năm (Ngày 3–4 GAR/KvK, cộng Ngày 5 trong KvK: 100 Thép = 400 điểm, 1 Dây Gai = 400 điểm).\n• Kỳ Thi Đấu Hội xả vào Thứ Sáu – Chủ Nhật (Ngày 5–7 Guild Race) ăn kép Exclusive Gold Task + Guild Rush: Troop Skin & Lord Gear.",
                en: "In GAR/KvK, dump on Wed & Thu (GAR/KvK Days 3–4, plus Day 5 in KvK: 100 Refined Metal = 400 points, 1 Magic Thread = 400 points).\n• In Guild Race, dump on Fri–Sun (Guild Race Days 5–7) to stack Exclusive Gold Task + Guild Rush: Troop Skin & Lord Gear.",
              },
            },
          ],
        },
        {
          type: "media_spotlight",
          mediaCode: "MED-5.4-02",
          tier: "tier2_annotated_ui",
          title: {
            vi: "Bảng Đối Chiếu Điểm Sự Kiện Đồ Chúa Tể: Ngày 3–4 GAR/KvK vs Bẫy Ngày 6 Thứ Bảy (MED-5.4-02)",
            en: "Lord Gear Event Scoring Matrix: GAR/KvK Days 3–4 vs Saturday Day 6 Trap (MED-5.4-02)",
          },
          description: {
            vi: "Minh họa giao diện tính điểm sự kiện Lord's Set / Ultimate Power trong Kỳ GAR / KvK (Ngày 3 & 4: 100 Thép Tinh Luyện = 400 điểm, 1 Dây Gai = 400 điểm) và giao diện Nhiệm vụ Vàng Độc quyền (Exclusive Gold Task) trong Kỳ Thi Đấu Hội (Guild Race Ngày 5–7).",
            en: "Annotated event scoring screen showing Lord's Set / Ultimate Power during GAR / KvK (Days 3 & 4: 100 Refined Metal = 400 pts, 1 Magic Thread = 400 pts) alongside Guild Race Days 5–7 Exclusive Gold Tasks.",
          },
          annotations: [
            {
              kind: "do",
              label: {
                vi: "Kỳ GAR/KvK: Xả Ngày 3 & Ngày 4 (Thứ Tư & Thứ Năm)",
                en: "GAR/KvK: Dump on Days 3 & 4 (Wed & Thu)",
              },
              detail: {
                vi: "Mỗi 100 Đá Xanh / Thép Tinh Luyện = 400 điểm và mỗi 1 Dây Gai / Chỉ Phép = 400 điểm (trong KvK có thể xả thêm vào Ngày 5).",
                en: "Every 100 Refined Metal = 400 points and every 1 Magic Thread = 400 points (plus Day 5 during KvK).",
              },
            },
            {
              kind: "do",
              label: {
                vi: "Kỳ Thi Đấu Hội (Guild Race): Xả Ngày 5–7 (Thứ Sáu – Chủ Nhật)",
                en: "Guild Race: Dump on Days 5–7 (Fri – Sun)",
              },
              detail: {
                vi: "Nhận Nhiệm vụ Vàng Độc quyền (Exclusive Gold Task) nâng Đồ Chúa Tể kết hợp ăn mốc sự kiện phụ Guild Rush: Troop Skin & Lord Gear.",
                en: "Pick the Lord Gear Exclusive Gold Task while simultaneously scoring milestones in Guild Rush: Troop Skin & Lord Gear.",
              },
            },
            {
              kind: "dont",
              label: {
                vi: "Cấm Xả Vào Ngày 6 (Thứ Bảy) Của GAR / KvK",
                en: "Never Dump on Day 6 (Saturday) of GAR / KvK",
              },
              detail: {
                vi: "Ngày 6 (Thứ Bảy) chỉ tính điểm Quân Trang (Troop Skins). Xả Đồ Chúa Tể vào Thứ Bảy sẽ làm mất trắng toàn bộ điểm sự kiện.",
                en: "Day 6 (Saturday) only scores Troop Skins. Upgrading Lord Gear on Saturday wastes 100% of your potential GAR/KvK points.",
              },
            },
          ],
        },
        {
          type: "checklist",
          checklistId: "lord-gear-staggered-audit-v2",
          title: {
            vi: "Danh Sách Kiểm Tra Kỷ Luật Đồ Chúa Tể & Lệch Pha Thông Minh (5 Bước)",
            en: "Lord Gear & Smart Staggered Upgrade Audit Checklist (5 Steps)",
          },
          description: {
            vi: "Tích chọn từng mục để rà soát độ lệch 6 món Trang bị Chúa Tể và lịch tích trữ nguyên liệu hàng tuần:",
            en: "Check off each item to audit your 6 Lord Gear slots and weekly material hoarding discipline:",
          },
          items: [
            {
              id: "lg-audit-1",
              label: {
                vi: "1. Kiểm tra độ lệch 6 món hiện tại không vượt quá 1 bậc nhỏ",
                en: "1. Audit all 6 Lord Gear slots so no slot lags by more than 1 sub-tier",
              },
              detail: {
                vi: "Mở Hồ sơ Lãnh Chúa: nếu 1–2 món Hệ Đội 1 đang vọt lên quá cao trong khi 4 món Hệ Phụ tụt lại 2–3 bậc, ngưng đập món cao và dồn kéo 4 món thấp lên ngay kỳ sự kiện tới.",
                en: "Open your Lord Profile: if 1–2 Queue 1 pieces are 2–3 tiers ahead while 4 off-faction pieces lag behind, pause the high pieces and pull the 4 lower slots up during the next event.",
              },
              badge: {
                vi: "CỘNG HƯỞNG 6 MÓN",
                en: "6-PIECE RESONANCE",
              },
            },
            {
              id: "lg-audit-2",
              label: {
                vi: "2. Tuân thủ thứ tự Nhánh Phải (RIGHT) trước, Nhánh Trái (LEFT) sau",
                en: "2. Enforce Right Branch (RIGHT) first, Left Branch (LEFT) second",
              },
              detail: {
                vi: "Luôn nâng món Nhánh Phải (+ATK Phe) của Đội 1 đầu tiên, tiếp theo là Nhánh Trái (+HP Phe) của Đội 1, rồi đến Nhánh Trái của Hệ Phụ (+ATK Toàn Lính) để kích Cộng hưởng 3 món.",
                en: "Always upgrade Queue 1's Right-side (+Faction ATK) piece first, Queue 1's Left-side (+Faction HP) piece second, and an off-faction Left-side (+All Soldiers ATK) piece third for 3-Piece Resonance.",
              },
              badge: {
                vi: "RIGHT ➔ LEFT",
                en: "RIGHT ➔ LEFT",
              },
            },
            {
              id: "lg-audit-3",
              label: {
                vi: "3. Mua vét Bản Vẽ / Hợp Kim (Blueprints / Orichalcum) & Dây Gai giảm giá",
                en: "3. Stockpile discounted Blueprints / Orichalcum & Magic Thread weekly",
              },
              detail: {
                vi: "Giai đoạn từ B1 1★ đến hết P4 3★ ngốn tới 175 Bản Vẽ/món (1,050 Bản Vẽ cho cả 6 món). Hãy gom Bản Vẽ và Dây Gai trong Tiệm Điểm Hội, Tiệm VIP và cửa hàng sự kiện từ sớm.",
                en: "Progressing from B1 1★ through P4 3★ consumes 175 Blueprints per piece (1,050 Blueprints across all 6 pieces). Prioritize Blueprints and Magic Thread in Guild, VIP, and event shops early.",
              },
              badge: {
                vi: "1,050 BẢN VẼ (B1➔P4)",
                en: "1,050 BLUEPRINTS (B1➔P4)",
              },
            },
            {
              id: "lg-audit-4",
              label: {
                vi: "4. Khóa chặt kho nguyên liệu ngoài Ngày 3–4 Kỳ GAR/KvK và Ngày 5–7 Kỳ Thi Đấu Hội",
                en: "4. Lock all materials outside GAR/KvK Days 3–4 and Guild Race Days 5–7",
              },
              detail: {
                vi: "Tuyệt đối không bấm nâng cấp ngày thường hoặc Ngày 6 (Thứ Bảy — chỉ tính điểm Quân Trang). Chỉ xả vào Thứ Tư/Thứ Năm Kỳ GAR/KvK hoặc Thứ Sáu–Chủ Nhật Kỳ Thi Đấu Hội (Guild Race).",
                en: "Never upgrade on normal weekdays or Day 6 (Saturday — Troop Skins only). Dump strictly on Wed/Thu of GAR/KvK or Fri–Sun of Guild Race.",
              },
              badge: {
                vi: "DOUBLE-DIP",
                en: "DOUBLE-DIP",
              },
            },
            {
              id: "lg-audit-5",
              label: {
                vi: "5. Định hướng sớm cho lộ trình Chuyển Hệ (Horde Pivot) & Mốc Season 3",
                en: "5. Align early with Horde Pivot & Season 3 Y1/Y2 unlock milestones",
              },
              detail: {
                vi: "Nếu dùng tạm Liên Minh ở Ngày 1–20 nhưng xác định chuyển sang Bộ Lạc ở Ngày 21+, hãy ưu tiên dẫn trước 2 món Bộ Lạc và hướng tới mốc 6 món đạt Y1 (Ô Thứ 7) & Y2 (Sacred Codex).",
                en: "If running temporary League on Days 1–20 before pivoting to Horde on Day 21+, lead with the 2 Horde pieces and target all 6 pieces at Y1 (7th Slot) & Y2 (Sacred Codex) for Season 3.",
              },
              badge: {
                vi: "SEASON 3 UNLOCK",
                en: "SEASON 3 UNLOCK",
              },
            },
          ],
        },
      ],
    },
    {
      id: "sec-3-lord-gear-pitfalls",
      title: {
        vi: "3. Những Cạm bẫy Phổ biến & Cách Phòng tránh (Common Pitfalls)",
        en: "3. Common Lord Gear Upgrade & Event Timing Pitfalls",
      },
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            {
              vi: "**Cạm bẫy #1 — Đẩy lẻ 2 món Đội 1 lên Vàng (Y1–Y2) bỏ mặc 4 món Hệ Phụ ở Lục/Lam:** Mất Cộng hưởng 6 món và bị khóa Ô Thứ 7 (Y1) lẫn Sacred Codex (Y2) ở Season 3; luôn giữ độ lệch tối đa 1 bậc nhỏ.",
              en: "**Pitfall #1 — Pushing only 2 Queue 1 pieces to Y1–Y2 while leaving 4 off-faction pieces at G1/B1:** Forfeits 6-Piece Resonance and locks out the Season 3 7th Slot (Y1) & Sacred Codex (Y2); keep max gap to 1 sub-tier.",
            },
            {
              vi: "**Cạm bẫy #2 — Xả Đồ Chúa Tể vào ngày thường hoặc Ngày 6 (Thứ Bảy) của GAR / KvK:** Ngày 6 chỉ tính điểm Quân Trang (0 điểm Đồ Chúa Tể); chỉ xả vào Ngày 3–4 Kỳ GAR/KvK hoặc Ngày 5–7 Kỳ Thi Đấu Hội (Guild Race).",
              en: "**Pitfall #2 — Upgrading Lord Gear on weekdays or Day 6 (Saturday) of GAR / KvK:** Day 6 only scores Troop Skins (0 Lord Gear points); dump strictly on GAR/KvK Days 3–4 or Guild Race Days 5–7.",
            },
            {
              vi: "**Cạm bẫy #3 — Mua Thép đắt đỏ thay vì gom Bản Vẽ (1,050 Bản Vẽ B1➔P4) & nâng sai thứ tự nhánh:** Luôn ưu tiên mua Bản Vẽ/Dây Gai và nâng theo chuẩn: RIGHT Đội 1 ➔ LEFT Đội 1 ➔ LEFT Hệ Phụ ➔ RIGHT Hệ Phụ.",
              en: "**Pitfall #3 — Buying overpriced Metal instead of Blueprints (1,050 from B1➔P4) & ignoring branch order:** Stockpile Blueprints/Thread and upgrade strictly: Queue 1 RIGHT ➔ Queue 1 LEFT ➔ Off-Faction LEFT ➔ RIGHT.",
            },
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: {
            vi: "Cảnh Báo Đỏ: Tuyệt Đối Không Xả Đồ Chúa Tể Vào Ngày 6 (Thứ Bảy) Của GAR / KvK!",
            en: "Red Alert: Never Dump Lord Gear on Day 6 (Saturday) of GAR / KvK!",
          },
          content: {
            vi: "Rất nhiều người chơi nhìn thấy chữ 'Trang bị' vào **Ngày 6 (Thứ Bảy)** của `GAR / KvK` liền bấm xả sạch hàng trăm Bản Vẽ và hàng ngàn Dây Gai, nhưng Ngày 6 chỉ tính điểm **Quân Trang (`Troop Skins`)**!\n• **Kỷ luật sắt:** Khóa chặt tay và chỉ xả Đồ Chúa Tể vào **Thứ Tư – Thứ Năm** (Ngày 3–4 Kỳ `GAR / KvK`, cộng Ngày 5 trong `KvK`) hoặc **Thứ Sáu – Chủ Nhật** (Ngày 5–7 Kỳ Thi Đấu Hội `Guild Race`).",
            en: "Many players see equipment themes on **Day 6 (Saturday)** of `GAR / KvK` and dump hundreds of Blueprints and thousands of Magic Threads, only to realize Day 6 scores **Troop Skins** exclusively!\n• **Iron Discipline:** Keep materials locked and only dump Lord Gear on **Wednesday–Thursday** (`GAR / KvK` Days 3–4, plus Day 5 in `KvK`) or **Friday–Sunday** (`Guild Race` Days 5–7).",
          },
        },
      ],
    },
  ],
  proSections: [
    {
      id: "sec-4-smart-staggered-and-102-steps-table",
      isPro: true,
      title: {
        vi: "4. Phân tích Định lượng & Điểm gãy: Chu Trình 'Lệch Pha Thông Minh' & Bảng Chi Phí 102 Nấc Toàn Trình (G1 ➔ Mythic T1 3★)",
        en: "4. Quantitative Analysis: The 4-Step Smart Staggered Upgrade Cycle & Complete 102-Step Cost Table (G1 ➔ Mythic T1 3★)",
      },
      blocks: [
        {
          type: "visual_diagram",
          mediaCode: "MED-5.4-03",
          variant: "timeline_phases",
          title: {
            vi: "Chu Trình Vòng Lặp 4 Bước 'Lệch Pha Thông Minh (Smart Staggered Upgrade)' (MED-5.4-03)",
            en: "The 4-Step 'Smart Staggered Upgrade' Execution Loop (MED-5.4-03)",
          },
          subtitle: {
            vi: "Tối đa hóa % ATK/HP trực tiếp cho Đội 1 mà không bao giờ đánh mất Hào quang Cộng hưởng 3 món & 6 món",
            en: "Maximize direct Queue 1 % ATK/HP scaling while permanently preserving 3-Piece & 6-Piece Tier Resonance",
          },
          centerNode: {
            id: "node-lg-sync-base",
            badge: {
              vi: "TRẠNG THÁI CHUẨN ĐẦU CHU KỲ",
              en: "BASELINE SYNC STATE",
            },
            title: {
              vi: "CẢ 6 MÓN ĐỒ CHÚA TỂ ĐỒNG BỘ Ở BẬC N (ĐANG BẬT CỘNG HƯỞNG 6 MÓN)",
              en: "ALL 6 LORD GEAR PIECES SYNCED AT TIER N (6-PIECE RESONANCE ACTIVE)",
            },
            subtitle: {
              vi: "Từ trạng thái đồng bộ Bậc N, thực hiện tuần tự 4 bước dưới đây trong giờ vàng sự kiện để bước lên Bậc N+1",
              en: "From baseline Tier N sync, execute the 4 sequential steps below during golden event windows to advance to Tier N+1",
            },
            tone: "gold",
          },
          nodes: [
            {
              id: "lg-step-1-main-right",
              badge: {
                vi: "BƯỚC 1 (ƯU TIÊN #1)",
                en: "STEP 1 (PRIORITY #1)",
              },
              title: {
                vi: "1. Đập Món NHÁNH PHẢI (RIGHT) Hệ Đội 1 Lên Bậc N+1",
                en: "1. Push Queue 1 RIGHT Branch Piece to Tier N+1",
              },
              subtitle: {
                vi: "Tăng trực tiếp % ATK Tướng Phe, % ATK Lính Phe & % HP Toàn Lính cho đội hình chủ lực",
                en: "Directly boosts Faction Hero ATK, Faction Soldier ATK & All Soldiers HP for your main queue",
              },
              tone: "emerald",
              metrics: [
                {
                  vi: "Đội 1 nhận ngay % ATK Tướng Phe & % ATK Lính Phe bậc N+1",
                  en: "Queue 1 immediately gains Tier N+1 Faction Hero ATK & Soldier ATK",
                },
                {
                  vi: "Đỉnh Mythic T1 3★ đạt +20.75% ATK Tướng / +43.15% ATK Lính / +38.00% HP Toàn Lính",
                  en: "Mythic T1 3★ cap reaches +20.75% Hero ATK / +43.15% Soldier ATK / +38.00% All HP",
                },
              ],
            },
            {
              id: "lg-step-2-main-left",
              badge: {
                vi: "BƯỚC 2 (ƯU TIÊN #2)",
                en: "STEP 2 (PRIORITY #2)",
              },
              title: {
                vi: "2. Đập Món NHÁNH TRÁI (LEFT) Hệ Đội 1 Lên Bậc N+1",
                en: "2. Push Queue 1 LEFT Branch Piece to Tier N+1",
              },
              subtitle: {
                vi: "Tăng trực tiếp % HP Tướng Phe, % HP Lính Phe & % ATK Toàn Lính cho Đội 1",
                en: "Directly boosts Faction Hero HP, Faction Soldier HP & All Soldiers ATK for Queue 1",
              },
              tone: "blue",
              metrics: [
                {
                  vi: "Hoàn tất nâng cấp 2 món thuộc Hệ Đội 1 dẫn trước 1 bậc nhỏ",
                  en: "Completes pushing both Queue 1 Faction pieces 1 sub-tier ahead",
                },
                {
                  vi: "Đỉnh Mythic T1 3★ đạt +41.45% HP Tướng / +113.95% HP Lính / +14.40% ATK Toàn Lính",
                  en: "Mythic T1 3★ cap reaches +41.45% Hero HP / +113.95% Soldier HP / +14.40% All ATK",
                },
              ],
            },
            {
              id: "lg-step-3-off-left-resonance3",
              badge: {
                vi: "BƯỚC 3 (CỘNG HƯỞNG 3 MÓN)",
                en: "STEP 3 (3-PIECE RESONANCE)",
              },
              title: {
                vi: "3. Kéo 1 Món NHÁNH TRÁI Hệ Phụ Lên Bậc N+1",
                en: "3. Pull 1 Off-Faction LEFT Piece to Tier N+1",
              },
              subtitle: {
                vi: "Kích hoạt ngay lập tức Hào quang Cộng hưởng 3 Món (3-Piece Resonance) ở Bậc N+1",
                en: "Immediately activates 3-Piece Tier Resonance at Tier N+1",
              },
              tone: "rose",
              metrics: [
                {
                  vi: "Ưu tiên chọn Nhánh Trái (LEFT) của Hệ Phụ vì dòng thứ 3 cộng % ATK Toàn bộ Lính",
                  en: "Prioritize an off-faction Left-side (LEFT) slot because its 3rd stat line adds All Soldiers ATK",
                },
                {
                  vi: "Mở khóa ngay mốc thưởng Cộng hưởng 3 Món (3/6 món đạt Bậc N+1)",
                  en: "Unlocks the 3-Piece Resonance bonus milestone (3/6 slots at Tier N+1)",
                },
              ],
            },
            {
              id: "lg-step-4-off-remaining-resonance6",
              badge: {
                vi: "BƯỚC 4 (CỘNG HƯỞNG 6 MÓN)",
                en: "STEP 4 (6-PIECE RESONANCE)",
              },
              title: {
                vi: "4. Kéo Nốt 3 Món Hệ Phụ Còn Lại Lên Bậc N+1",
                en: "4. Pull Remaining 3 Off-Faction Pieces to Tier N+1",
              },
              subtitle: {
                vi: "Khóa chặt Cộng hưởng 6 Món Bậc N+1 & tiến tới mở khóa Ô Thứ 7 (Y1) + Sacred Codex (Y2)",
                en: "Locks in 6-Piece Resonance at Tier N+1 & progresses toward S3 7th Slot (Y1) + Sacred Codex (Y2)",
              },
              tone: "emerald",
              metrics: [
                {
                  vi: "Nâng món Nhánh Trái Hệ Phụ thứ 2 rồi đến 2 món Nhánh Phải Hệ Phụ lên Bậc N+1",
                  en: "Upgrade the 2nd off-faction Left piece followed by the 2 off-faction Right pieces to Tier N+1",
                },
                {
                  vi: "Đủ 6 món Y1 mở Ô Thứ 7 (Tuần 3 S3); đủ 6 món Y2 mở Sacred Codex (Tuần 4 S3)",
                  en: "All 6 at Y1 unlocks 7th Slot (S3 Week 3); all 6 at Y2 unlocks Sacred Codex (S3 Week 4)",
                },
              ],
            },
          ],
          branches: [
            {
              title: {
                vi: "Giai Đoạn 1: Đẩy 2 Món Hệ Đội 1 (Bước 1 & 2)",
                en: "Phase 1: Push 2 Queue 1 Slots (Steps 1 & 2)",
              },
              badge: {
                vi: "RIGHT ➔ LEFT ĐỘI 1",
                en: "QUEUE 1 RIGHT ➔ LEFT",
              },
              tone: "emerald",
              steps: [
                {
                  id: "br-step-1-right",
                  badge: { vi: "BƯỚC 1", en: "STEP 1" },
                  title: {
                    vi: "Món Nhánh Phải (RIGHT) Hệ Đội 1 ➔ Bậc N+1",
                    en: "Queue 1 Right Branch (RIGHT) ➔ Tier N+1",
                  },
                  subtitle: {
                    vi: "Lấy ngay % ATK Tướng Phe, % ATK Lính Phe & % HP Toàn Lính",
                    en: "Capture immediate Faction Hero ATK, Soldier ATK & All Soldiers HP",
                  },
                },
                {
                  id: "br-step-2-left",
                  badge: { vi: "BƯỚC 2", en: "STEP 2" },
                  title: {
                    vi: "Món Nhánh Trái (LEFT) Hệ Đội 1 ➔ Bậc N+1",
                    en: "Queue 1 Left Branch (LEFT) ➔ Tier N+1",
                  },
                  subtitle: {
                    vi: "Lấy tiếp % HP Tướng Phe, % HP Lính Phe & % ATK Toàn Lính",
                    en: "Capture Faction Hero HP, Soldier HP & All Soldiers ATK",
                  },
                },
              ],
              outcome: {
                vi: "Tối đa hóa 100% chỉ số chiến đấu trực tiếp cho Đội hình 1",
                en: "Maximizes 100% of direct combat stats for Queue 1",
              },
            },
            {
              title: {
                vi: "Giai Đoạn 2: Kích Cộng Hưởng 3 Món (Bước 3)",
                en: "Phase 2: Trigger 3-Piece Resonance (Step 3)",
              },
              badge: {
                vi: "3/6 MÓN CÙNG BẬC",
                en: "3/6 SLOTS SYNCED",
              },
              tone: "gold",
              steps: [
                {
                  id: "br-step-3-off-left",
                  badge: { vi: "BƯỚC 3", en: "STEP 3" },
                  title: {
                    vi: "1 Món Nhánh Trái (LEFT) Hệ Phụ ➔ Bậc N+1",
                    en: "1 Off-Faction Left Slot (LEFT) ➔ Tier N+1",
                  },
                  subtitle: {
                    vi: "Cộng thêm % ATK Toàn bộ Lính và chạm mốc 3 món cùng Bậc N+1",
                    en: "Adds All Soldiers ATK and reaches 3 pieces at Tier N+1",
                  },
                },
              ],
              outcome: {
                vi: "Kích hoạt Hào quang Cộng hưởng 3 Món (3-Piece Resonance) Bậc N+1",
                en: "Activates 3-Piece Tier Resonance at Tier N+1",
              },
            },
            {
              title: {
                vi: "Giai Đoạn 3: Chốt Cộng Hưởng 6 Món (Bước 4)",
                en: "Phase 3: Lock 6-Piece Resonance (Step 4)",
              },
              badge: {
                vi: "6/6 MÓN ĐỒNG BỘ",
                en: "6/6 SLOTS SYNCED",
              },
              tone: "emerald",
              steps: [
                {
                  id: "br-step-4-off-rest",
                  badge: { vi: "BƯỚC 4", en: "STEP 4" },
                  title: {
                    vi: "3 Món Hệ Phụ Còn Lại ➔ Bậc N+1",
                    en: "Remaining 3 Off-Faction Slots ➔ Tier N+1",
                  },
                  subtitle: {
                    vi: "Hoàn tất đồng bộ 6/6 món ở Bậc N+1 và sẵn sàng lặp lại chu trình",
                    en: "Completes 6/6 sync at Tier N+1 and resets the cycle",
                  },
                },
              ],
              outcome: {
                vi: "Bật Cộng hưởng 6 Món & mở khóa Ô Thứ 7 (Y1) / Sacred Codex (Y2) ở S3",
                en: "Unlocks 6-Piece Resonance & S3 7th Slot (Y1) / Sacred Codex (Y2)",
              },
            },
          ],
          footnote: {
            vi: "Quy tắc vàng: Không bao giờ để khoảng cách giữa món cao nhất (Đội 1) và món thấp nhất (Hệ Phụ) vượt quá 1 bậc phẩm chất nhỏ.",
            en: "Golden Rule: Never allow the gap between your highest slot (Queue 1) and lowest slot (Off-Faction) to exceed 1 sub-tier.",
          },
        },
        {
          type: "table",
          caption: {
            vi: "Bảng 2: Chi Phí Nguyên Liệu & Thông Số Toàn Trình 102 Nấc Trang Bị Chúa Tể (G1 ➔ R4 Mythic T1 3★) — Nguồn: TopHeroes Tables (Tab Аркуш23 & Gear)",
            en: "Table 2: Complete 102-Step Lord Gear Material Cost & Stat Progression Table (G1 ➔ R4 Mythic T1 3★) — Source: TopHeroes Tables (Tab Аркуш23 & Gear)",
          },
          headers: [
            {
              vi: "Cấp Bậc & Phẩm Chất (Tier Code)",
              en: "Tier & Quality (Tier Code)",
            },
            {
              vi: "Số Nấc Nhỏ (Steps)",
              en: "Sub-Steps (Steps)",
            },
            {
              vi: "Đá Xanh / Thép Tinh Luyện (Refined Metal)",
              en: "Refined Metal",
            },
            {
              vi: "Dây Gai / Chỉ Phép (Magic Thread)",
              en: "Magic Thread",
            },
            {
              vi: "Bản Vẽ / Hợp Kim (Blueprints / Orichalcum)",
              en: "Blueprints / Orichalcum",
            },
            {
              vi: "Nguyên Liệu Đỏ / Máu Rồng (Dragon Blood)",
              en: "Mythic Material / Dragon Blood",
            },
            {
              vi: "Chỉ Số Đạt Được Ở Cuối Bậc (Nhánh Trái LEFT | Nhánh Phải RIGHT)",
              en: "Stats Reached at Tier Completion (Left Branch LEFT | Right Branch RIGHT)",
            },
          ],
          rows: [
            [
              {
                vi: "G1 — Lục (Uncommon Base ➔ 1★)",
                en: "G1 — Uncommon (Base ➔ 1★)",
              },
              {
                vi: "2 nấc (Base, 1★)",
                en: "2 steps (Base, 1★)",
              },
              {
                vi: "5,300 (1,500 + 3,800)",
                en: "5,300 (1,500 + 3,800)",
              },
              {
                vi: "60 (20 + 40)",
                en: "60 (20 + 40)",
              },
              {
                vi: "0",
                en: "0",
              },
              {
                vi: "0",
                en: "0",
              },
              {
                vi: "Phải (RIGHT): +1.15% ATK Tướng, +2.40% ATK Lính, +2.10% HP Toàn Lính",
                en: "Right (RIGHT): +1.15% Hero ATK, +2.40% Soldier ATK, +2.10% All Soldiers HP",
              },
            ],
            [
              {
                vi: "B1 — Lam 1 (Rare Base ➔ 1★)",
                en: "B1 — Rare 1 (Base ➔ 1★)",
              },
              {
                vi: "3 nấc (Base + 2 nấc 1★)",
                en: "3 steps (Base + 2×1★)",
              },
              {
                vi: "11,700 (4k + 6.4k + 1.3k)",
                en: "11,700 (4k + 6.4k + 1.3k)",
              },
              {
                vi: "115 (50 + 60 + 5)",
                en: "115 (50 + 60 + 5)",
              },
              {
                vi: "10 (ở nấc cuối 1★)",
                en: "10 (at final 1★ step)",
              },
              {
                vi: "0",
                en: "0",
              },
              {
                vi: "Trái: +3.55% HP Tướng, +9.70% HP Lính, +1.20% ATK Toàn Lính | Phải: +1.75% ATK Tướng, +3.65% ATK Lính, +3.25% HP Toàn Lính",
                en: "Left: +3.55% Hero HP, +9.70% Soldier HP, +1.20% All ATK | Right: +1.75% Hero ATK, +3.65% Soldier ATK, +3.25% All HP",
              },
            ],
            [
              {
                vi: "B2 — Lam 2 (Rare 2★)",
                en: "B2 — Rare 2 (2★)",
              },
              {
                vi: "2 nấc",
                en: "2 steps",
              },
              {
                vi: "2,800 (1,500 + 1,300)",
                en: "2,800 (1,500 + 1,300)",
              },
              {
                vi: "10 (5 × 2)",
                en: "10 (5 × 2)",
              },
              {
                vi: "20 (10 × 2)",
                en: "20 (10 × 2)",
              },
              {
                vi: "0",
                en: "0",
              },
              {
                vi: "Trái: +4.35% HP Tướng, +11.95% HP Lính, +1.50% ATK Toàn Lính | Phải: +2.15% ATK Tướng, +4.55% ATK Lính, +4.00% HP Toàn Lính",
                en: "Left: +4.35% Hero HP, +11.95% Soldier HP, +1.50% All ATK | Right: +2.15% Hero ATK, +4.55% Soldier ATK, +4.00% All HP",
              },
            ],
            [
              {
                vi: "B3 — Lam 3 (Rare 3★)",
                en: "B3 — Rare 3 (3★)",
              },
              {
                vi: "2 nấc",
                en: "2 steps",
              },
              {
                vi: "3,300 (1,500 + 1,800)",
                en: "3,300 (1,500 + 1,800)",
              },
              {
                vi: "10 (5 × 2)",
                en: "10 (5 × 2)",
              },
              {
                vi: "22 (10 + 12)",
                en: "22 (10 + 12)",
              },
              {
                vi: "0",
                en: "0",
              },
              {
                vi: "Trái: +4.75%+ HP Tướng, +13.05%+ HP Lính, +1.65%+ ATK Toàn Lính",
                en: "Left: +4.75%+ Hero HP, +13.05%+ Soldier HP, +1.65%+ All Soldiers ATK",
              },
            ],
            [
              {
                vi: "P1–P2 — Tím 1–2 (Epic Base ➔ 1★)",
                en: "P1–P2 — Epic 1–2 (Base ➔ 1★)",
              },
              {
                vi: "4 nấc (Base + 3 nấc 1★)",
                en: "4 steps (Base + 3×1★)",
              },
              {
                vi: "6,400 (1.3k×3 + 2.5k)",
                en: "6,400 (1.3k×3 + 2.5k)",
              },
              {
                vi: "35 (5×3 + 20)",
                en: "35 (5×3 + 20)",
              },
              {
                vi: "48 (12 × 4)",
                en: "48 (12 × 4)",
              },
              {
                vi: "0",
                en: "0",
              },
              {
                vi: "Mở khóa Hào quang Cộng hưởng Phẩm chất Sử Thi (Epic Tier Resonance Bonus).",
                en: "Unlocks Epic Tier Resonance Bonus across matching slots.",
              },
            ],
            [
              {
                vi: "P3 — Tím 3 (Epic 2★)",
                en: "P3 — Epic 3 (2★)",
              },
              {
                vi: "3 nấc",
                en: "3 steps",
              },
              {
                vi: "8,500 (2.5k×2 + 3.5k)",
                en: "8,500 (2.5k×2 + 3.5k)",
              },
              {
                vi: "70 (20×2 + 30)",
                en: "70 (20×2 + 30)",
              },
              {
                vi: "36 (12 × 3)",
                en: "36 (12 × 3)",
              },
              {
                vi: "0",
                en: "0",
              },
              {
                vi: "Gia tăng mạnh tỷ lệ % ATK/HP cơ bản trước thềm đột phá đồ Vàng.",
                en: "Strong mid-Epic % ATK/HP scaling prior to Legendary promotion.",
              },
            ],
            [
              {
                vi: "P4 — Tím 4 (Epic 3★)",
                en: "P4 — Epic 4 (3★)",
              },
              {
                vi: "3 nấc",
                en: "3 steps",
              },
              {
                vi: "10,300 (3.5k×2 + 3.3k)",
                en: "10,300 (3.5k×2 + 3.3k)",
              },
              {
                vi: "90 (30 × 3)",
                en: "90 (30 × 3)",
              },
              {
                vi: "39 (12×2 + 15)",
                en: "39 (12×2 + 15)",
              },
              {
                vi: "0",
                en: "0",
              },
              {
                vi: "Hoàn tất bậc Sử Thi (tổng điểm nghẽn B1 1★ ➔ P4 3★ ngốn 175 Bản Vẽ/món = 1,050 Bản Vẽ cho 6 món).",
                en: "Completes Epic tier (cumulative B1 1★ ➔ P4 3★ bottleneck consumes 175 Blueprints/piece = 1,050 Blueprints for 6 pieces).",
              },
            ],
            [
              {
                vi: "Y1 — Vàng T1 (Legendary T1 Base ➔ 3★)",
                en: "Y1 — Legendary T1 (Base ➔ 3★)",
              },
              {
                vi: "13 nấc (Base + 4×1★ + 4×2★ + 4×3★)",
                en: "13 steps (Base + 4×1★ + 4×2★ + 4×3★)",
              },
              {
                vi: "63,200 (3.9k ➔ 5.4k/nấc)",
                en: "63,200 (3.9k ➔ 5.4k/step)",
              },
              {
                vi: "485 (30 ➔ 45/nấc)",
                en: "485 (30 ➔ 45/step)",
              },
              {
                vi: "220 (15 ➔ 20/nấc)",
                en: "220 (15 ➔ 20/step)",
              },
              {
                vi: "0",
                en: "0",
              },
              {
                vi: "Mốc Điều Kiện 1: Đủ 6 món đạt Y1 (T1 Legendary) mở khóa Ô Chúa Tể Thứ 7 ở Season 3 Tuần 3.",
                en: "Milestone 1: All 6 pieces at Y1 (T1 Legendary) unlocks the 7th Lord Gear Slot in Season 3 Week 3.",
              },
            ],
            [
              {
                vi: "Y2 — Vàng T2 (Legendary T2 Base ➔ 3★)",
                en: "Y2 — Legendary T2 (Base ➔ 3★)",
              },
              {
                vi: "13 nấc (Base + 4×1★ + 4×2★ + 4×3★)",
                en: "13 steps (Base + 4×1★ + 4×2★ + 4×3★)",
              },
              {
                vi: "101,300 (7.3k ➔ 8.5k/nấc)",
                en: "101,300 (7.3k ➔ 8.5k/step)",
              },
              {
                vi: "1,025 (75 ➔ 85/nấc)",
                en: "1,025 (75 ➔ 85/step)",
              },
              {
                vi: "260 (20/nấc)",
                en: "260 (20/step)",
              },
              {
                vi: "0",
                en: "0",
              },
              {
                vi: "Mốc Điều Kiện 2: Đủ 6 món đạt Y2 (T2 Legendary) mở khóa Thánh Điển (Sacred Codex) ở Season 3 Tuần 4.",
                en: "Milestone 2: All 6 pieces at Y2 (T2 Legendary) unlocks the Sacred Codex in Season 3 Week 4.",
              },
            ],
            [
              {
                vi: "Y3 — Vàng T3 (Legendary T3 Base ➔ 3★)",
                en: "Y3 — Legendary T3 (Base ➔ 3★)",
              },
              {
                vi: "13 nấc (Base + 4×1★ + 4×2★ + 4×3★)",
                en: "13 steps (Base + 4×1★ + 4×2★ + 4×3★)",
              },
              {
                vi: "124,000 (9.0k ➔ 10.0k/nấc)",
                en: "124,000 (9.0k ➔ 10.0k/step)",
              },
              {
                vi: "1,230 (95 ➔ 90/nấc)",
                en: "1,230 (95 ➔ 90/step)",
              },
              {
                vi: "260 (20/nấc)",
                en: "260 (20/step)",
              },
              {
                vi: "0",
                en: "0",
              },
              {
                vi: "Trái: +21.50% HP Tướng, +59.05% HP Lính, +7.45% ATK Toàn Lính | Phải: +10.75% ATK Tướng, +22.35% ATK Lính, +19.70% HP Toàn Lính",
                en: "Left: +21.50% Hero HP, +59.05% Soldier HP, +7.45% All ATK | Right: +10.75% Hero ATK, +22.35% Soldier ATK, +19.70% All HP",
              },
            ],
            [
              {
                vi: "Y4 — Vàng T4 (Legendary T4 Base ➔ 3★)",
                en: "Y4 — Legendary T4 (Base ➔ 3★)",
              },
              {
                vi: "13 nấc (Base + 4×1★ + 4×2★ + 4×3★)",
                en: "13 steps (Base + 4×1★ + 4×2★ + 4×3★)",
              },
              {
                vi: "175,000 (13.0k ➔ 15.0k/nấc)",
                en: "175,000 (13.0k ➔ 15.0k/step)",
              },
              {
                vi: "1,820 (130 ➔ 150/nấc)",
                en: "1,820 (130 ➔ 150/step)",
              },
              {
                vi: "300 (22 ➔ 25/nấc)",
                en: "300 (22 ➔ 25/step)",
              },
              {
                vi: "2 (ở nấc cuối 3★)",
                en: "2 (at final 3★ step)",
              },
              {
                vi: "Trái: +27.70% HP Tướng, +76.15% HP Lính, +9.60% ATK Toàn Lính | Phải: +13.85% ATK Tướng, +28.80% ATK Lính, +25.40% HP Toàn Lính",
                en: "Left: +27.70% Hero HP, +76.15% Soldier HP, +9.60% All ATK | Right: +13.85% Hero ATK, +28.80% Soldier ATK, +25.40% All HP",
              },
            ],
            [
              {
                vi: "R1–R2 — Đỏ Thần Thoại (Mythic Base ➔ 3★)",
                en: "R1–R2 — Mythic (Base ➔ 3★)",
              },
              {
                vi: "16 nấc (Base + 5×1★ + 5×2★ + 5×3★)",
                en: "16 steps (Base + 5×1★ + 5×2★ + 5×3★)",
              },
              {
                vi: "219,500 (13.0k ➔ 15.0k/nấc)",
                en: "219,500 (13.0k ➔ 15.0k/step)",
              },
              {
                vi: "2,480 (140 ➔ 180/nấc)",
                en: "2,480 (140 ➔ 180/step)",
              },
              {
                vi: "375 (20 ➔ 25/nấc)",
                en: "375 (20 ➔ 25/step)",
              },
              {
                vi: "44 (2 ➔ 4/nấc)",
                en: "44 (2 ➔ 4/step)",
              },
              {
                vi: "Trái: +33.75%+ HP Tướng, +92.80%+ HP Lính, +11.70%+ ATK Toàn Lính | Phải: +16.85%+ ATK Tướng, +35.15%+ ATK Lính, +30.95%+ HP Toàn Lính",
                en: "Left: +33.75%+ Hero HP, +92.80%+ Soldier HP, +11.70%+ All ATK | Right: +16.85%+ Hero ATK, +35.15%+ Soldier ATK, +30.95%+ All HP",
              },
            ],
            [
              {
                vi: "R3–R4 — Đỏ Thần Thoại T1 (Mythic T1 Base ➔ 3★ Kịch Trần)",
                en: "R3–R4 — Mythic T1 (Base ➔ 3★ Cap)",
              },
              {
                vi: "15 nấc (Base + 5×1★ + 5×2★ + 4×3★)",
                en: "15 steps (Base + 5×1★ + 5×2★ + 4×3★)",
              },
              {
                vi: "227,500 (14.0k ➔ 16.5k/nấc)",
                en: "227,500 (14.0k ➔ 16.5k/step)",
              },
              {
                vi: "2,525 (160 ➔ 175/nấc)",
                en: "2,525 (160 ➔ 175/step)",
              },
              {
                vi: "440 (28 ➔ 30/nấc)",
                en: "440 (28 ➔ 30/step)",
              },
              {
                vi: "55 (3 ➔ 4/nấc)",
                en: "55 (3 ➔ 4/step)",
              },
              {
                vi: "Trái (3★): +41.45% HP Tướng / +113.95% HP Lính / +14.40% All ATK | Phải (1★): +18.70% / +38.90% / +34.25% | Phải (3★): +20.75% Hero ATK / +43.15% Soldier ATK / +38.00% All HP",
                en: "Left (3★): +41.45% Hero HP / +113.95% Soldier HP / +14.40% All ATK | Right (1★): +18.70% / +38.90% / +34.25% | Right (3★): +20.75% Hero ATK / +43.15% Soldier ATK / +38.00% All HP",
              },
            ],
            [
              {
                vi: "TỔNG CỘNG (G1 ➔ R4 3★ — 102 NẤC: 1 Món | 6 Món)",
                en: "TOTAL (G1 ➔ R4 3★ — 102 STEPS: 1 Piece | All 6 Pieces)",
              },
              {
                vi: "102 nấc nâng cấp",
                en: "102 upgrade steps",
              },
              {
                vi: "958,800 Thép (1 món) | 5,752,800 Thép (6 món)",
                en: "958,800 Refined Metal (1 pc) | 5,752,800 Refined Metal (6 pcs)",
              },
              {
                vi: "9,955 Dây Gai (1 món) | 59,730 Dây Gai (6 món)",
                en: "9,955 Magic Thread (1 pc) | 59,730 Magic Thread (6 pcs)",
              },
              {
                vi: "2,030 Bản Vẽ (1 món) | 12,180 Bản Vẽ (6 món)",
                en: "2,030 Blueprints (1 pc) | 12,180 Blueprints (6 pcs)",
              },
              {
                vi: "101 Máu Rồng (1 món) | 606 Máu Rồng (6 món)",
                en: "101 Dragon Blood (1 pc) | 606 Dragon Blood (6 pcs)",
              },
              {
                vi: "Hoàn tất 100% cây Trang bị Chúa Tể 6 món cho cả 3 Phe phái.",
                en: "Completes 100% of the 6-piece Lord Gear progression tree across all 3 Factions.",
              },
            ],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: {
            vi: "Điểm Gãy Nút Cổ Chai Bản Vẽ / Hợp Kim (Blueprints / Orichalcum): 175 Bản Vẽ/Món (1,050 Bản Vẽ Cho 6 Món)",
            en: "Blueprints / Orichalcum Bottleneck Breakpoint: 175 Blueprints/Piece (1,050 Blueprints Across 6 Pieces)",
          },
          content: {
            vi: "Từ bậc `G1` đến `B1` (nấc 2), bạn tốn `0` Bản Vẽ (chỉ tốn `15,700` Đá Xanh / Thép Tinh Luyện và `170` Dây Gai / Chỉ Phép cho mỗi món).\n• **Nút cổ chai B1 ➔ P4:** Từ nấc cuối `B1 1★` lên hết `P4 3★`, mỗi món ngốn `175` Bản Vẽ (`1,050` Bản Vẽ cho 6 món); hãy ưu tiên đổi Bản Vẽ trong các tiệm sự kiện từ sớm.",
            en: "From `G1` through `B1` (step 2), upgrades require `0` Blueprints (costing only `15,700` Refined Metal and `170` Magic Thread per piece).\n• **B1 ➔ P4 Bottleneck:** From the final step of `B1 1★` through `P4 3★`, each piece demands `175` Blueprints (`1,050` Blueprints across 6 pieces); redeem Blueprints early in event shops.",
          },
        },
      ],
    },
    {
      id: "sec-5-p3-to-y1-lord-gear-case-study",
      isPro: true,
      title: {
        vi: "5. Kịch bản Thực chiến Nâng cao: Tái Phân Bổ Ngân Sách Đồ Chúa Tể (65,000 Thép + 520 Dây Gai + 230 Bản Vẽ) Trong Ngày Sự Kiện Kép",
        en: "5. Advanced Tactical Case Study: Reallocating 65,000 Refined Metal + 520 Magic Thread + 230 Blueprints Across P3 ➔ P4 ➔ Y1",
      },
      blocks: [
        {
          type: "case_study",
          badge: {
            vi: "CASE STUDY #5.4 • PHẪU THUẬT ĐỒ CHÚA TỂ (P3 ➔ P4 ➔ Y1)",
            en: "CASE STUDY #5.4 • LORD GEAR REALLOCATION (P3 ➔ P4 ➔ Y1)",
          },
          title: {
            vi: "Tài Khoản Mid-Game Thuần Bộ Lạc: 6 Món Đang Đồng Bộ Ở P3 (Epic 2★) Xả Kho Trong Kỳ GAR Ngày 3–4",
            en: "Mid-Game Pure Horde Account: 6 Pieces Synced at P3 (Epic 2★) Dumping Materials on GAR Days 3–4",
          },
          profileSummary: {
            vi: "Tài khoản Mid-game vận hành Đội 1 Thuần Bộ Lạc (`Pure Horde`) có cả 6 món Trang bị Chúa Tể đang đồng bộ ở bậc Tím 3 (`P3 — Epic 2★`).\n• **Ngân sách tích trữ sau 2 tuần:** Kho đang có `65,000` Đá Xanh / Thép Tinh Luyện, `520` Dây Gai / Chỉ Phép và `230` Bản Vẽ / Hợp Kim.",
            en: "A mid-game Pure Horde account has all 6 Lord Gear pieces synchronized at Epic 2★ (`P3`).\n• **2-Week Hoarded Inventory:** Holds `65,000` Refined Metal, `520` Magic Thread, and `230` Blueprints / Orichalcum.",
          },
          metrics: [
            {
              label: {
                vi: "Thời Điểm Xả & Điểm Sự Kiện",
                en: "Dump Timing & Event Points",
              },
              before: {
                vi: "Chờ Thứ Bảy Ngày 6 (0 điểm Đồ Chúa Tể)",
                en: "Wait for Saturday Day 6 (0 Lord Gear pts)",
              },
              after: {
                vi: "Xả Ngày 3–4 GAR/KvK (Ăn 100% rương mốc)",
                en: "Dump GAR/KvK Days 3–4 (100% milestone chests)",
              },
              delta: {
                vi: "+400 điểm / 100 Thép & +400 điểm / 1 Dây Gai",
                en: "+400 pts / 100 Metal & +400 pts / 1 Thread",
              },
            },
            {
              label: {
                vi: "Trạng Thái Cộng Hưởng 6 Món",
                en: "6-Piece Resonance Status",
              },
              before: {
                vi: "1 món Y1 2★ + 5 món P3 (Mất Cộng hưởng P4)",
                en: "1 slot Y1 2★ + 5 slots P3 (No P4 Resonance)",
              },
              after: {
                vi: "Đủ 6 món P4 (Epic 3★) + 1 món Nhánh Phải lên Y1",
                en: "All 6 slots at P4 (Epic 3★) + 1 Right slot at Y1",
              },
              delta: {
                vi: "Bật Cộng hưởng 6 Món P4 + Mở đầu Y1",
                en: "Unlocks P4 6-Piece Resonance + Y1 Lead",
              },
            },
            {
              label: {
                vi: "Hiệu Quả Hoàn Trả Từ Rương Sự Kiện",
                en: "Event Milestone Chest Rebates",
              },
              before: {
                vi: "Thiếu 20 Dây Gai & 4 Bản Vẽ",
                en: "Short by 20 Thread & 4 Blueprints",
              },
              after: {
                vi: "Rương mốc bù đủ 540 Dây Gai + 234 Bản Vẽ + dư lên Y1",
                en: "Milestone chests rebate 540 Thread + 234 Blueprints + Y1 push",
              },
              delta: {
                vi: "Chuỗi hoàn trả dây chuyền 100%",
                en: "100% chained milestone rebate",
              },
            },
          ],
          diagnostics: [
            {
              vi: "**Sai lầm 1 (Bẫy Ngày 6 Thứ Bảy):** Người chơi định chờ tới Thứ Bảy (`GAR` Ngày 6) mới xả kho, nhưng Ngày 6 chỉ tính điểm Quân Trang (`Troop Skins`).\n• **Hậu quả:** Xả Đồ Chúa Tể vào Thứ Bảy sẽ mất trắng 100% điểm sự kiện `GAR`.",
              en: "**Mistake 1 (Saturday Day 6 Trap):** The player planned to wait until Saturday (`GAR` Day 6) to dump, but Day 6 only scores `Troop Skins`.\n• **Consequence:** Dumping Lord Gear on Saturday forfeits 100% of `GAR` milestone rewards.",
            },
            {
              vi: "**Sai lầm 2 (Dồn 1 món lẻ phá vỡ Cộng hưởng):** Dồn toàn bộ ngân sách vào duy nhất 1 món Nhánh Phải Bộ Lạc lên `Y1 2★` (tốn `47,500` Thép, `365` Dây Gai, `164` Bản Vẽ).\n• **Hậu quả:** Chỉ tăng chỉ số cho 1 ô nhưng mất sạch Cộng hưởng 3 món ở cả bậc `P4` lẫn bậc `Y1`.",
              en: "**Mistake 2 (Single-Slot Tunnel Vision):** Dumping everything into a single Horde Right-side piece to `Y1 2★` (costing `47,500` Metal, `365` Thread, `164` Blueprints).\n• **Consequence:** Buffs 1 slot while failing to unlock 3-Piece Resonance at either `P4` or `Y1`.",
            },
          ],
          recoverySteps: [
            {
              stepNumber: "1",
              title: {
                vi: "Đồng Bộ Cả 6 Món Từ P3 Lên Hoàn Tất P4 (Epic 3★) Trong Giờ Vàng Ngày 3–4",
                en: "Sync All 6 Slots from P3 to Complete P4 (Epic 3★) During Days 3–4 Golden Window",
              },
              detail: {
                vi: "Đúng Thứ Tư/Thứ Năm Kỳ `GAR / KvK` (Ngày 3–4) hoặc Thứ Sáu–Chủ Nhật Kỳ Thi Đấu Hội (`Guild Race` Ngày 5–7), nâng cả 6 món từ `P3` lên `P4` (`Epic 3★`).\n• **Chi phí & Hoàn trả:** Tốn `61,800` Thép, `540` Dây Gai và `234` Bản Vẽ (lấy `20` Dây Gai và `4` Bản Vẽ từ rương mốc sự kiện vừa nhảy).",
                en: "On Wed/Thu of `GAR / KvK` (Days 3–4) or Fri–Sun of `Guild Race` (Days 5–7), bring all 6 pieces from `P3` to `P4` (`Epic 3★`).\n• **Cost & Rebates:** Uses `61,800` Refined Metal, `540` Magic Thread, and `234` Blueprints (`20` Thread and `4` Blueprints rebated live from milestone chests).",
              },
              impactBadge: {
                vi: "61,800 THÉP + 540 DÂY GAI + 234 BẢN VẼ",
                en: "61,800 METAL + 540 THREAD + 234 BLUEPRINTS",
              },
            },
            {
              stepNumber: "2",
              title: {
                vi: "Kích Hoạt Hào Quang Cộng Hưởng 6 Món Bậc P4 (Epic 3★)",
                en: "Activate P4 (Epic 3★) 6-Piece Tier Resonance",
              },
              detail: {
                vi: "Ngay khi món thứ 6 chạm P4 3★, hệ thống bật sáng Hào quang Cộng hưởng 6 Món Bậc P4, cộng thẳng chỉ số toàn cục cho toàn bộ tướng và lính của cả 3 đội hình.",
                en: "The moment your 6th piece reaches P4 3★, P4 6-Piece Resonance activates, granting global passive stats to all heroes and soldiers across all 3 queues.",
              },
              impactBadge: {
                vi: "BẬT CỘNG HƯỞNG 6 MÓN P4",
                en: "P4 6-PIECE RESONANCE ACTIVE",
              },
            },
            {
              stepNumber: "3",
              title: {
                vi: "Tái Đầu Tư Nguyên Liệu Hoàn Trả Đẩy Món Nhánh Phải Bộ Lạc Lên Y1 (Legendary T1 Base)",
                en: "Reinvest Rebated Materials to Push Horde Right Slot into Y1 (Legendary T1 Base)",
              },
              detail: {
                vi: "Dùng phần nguyên liệu thưởng hoàn trả từ rương mốc sự kiện để đột phá Món Nhánh Phải Bộ Lạc sang nấc đầu tiên của `Y1` (`Legendary T1 Base`).\n• **Chi phí mở đầu Y1:** Tốn `3,900` Thép, `30` Dây Gai, `15` Bản Vẽ, mở đầu chu kỳ Lệch Pha Thông Minh tiếp theo.",
                en: "Use the remaining milestone chest rebates to promote the Horde Right-side piece into the first step of `Y1` (`Legendary T1 Base`).\n• **Y1 Entry Cost:** Spends `3,900` Refined Metal, `30` Magic Thread, and `15` Blueprints, initiating the next Smart Staggered cycle.",
              },
              impactBadge: {
                vi: "ĐỘT PHÁ VÀNG Y1 (+ATK ĐỘI 1)",
                en: "LEGENDARY Y1 BREAKTHROUGH (+QUEUE 1 ATK)",
              },
            },
          ],
          conclusion: {
            vi: "**Kết quả thực chiến:** Người chơi ăn trọn vẹn 100% rương mốc cá nhân của cả 2 sự kiện nhờ hiệu ứng hoàn trả nguyên liệu dây chuyền.\n• **Đột phá sức mạnh:** Vừa mở khóa Cộng hưởng 6 món `P4`, vừa đưa món Nhánh Phải của Hệ Đội 1 chạm ngưỡng Huyền Thoại Vàng `Y1`.",
            en: "**Combat Result:** The player claims 100% of personal milestone chests across both events via chained material rebates.\n• **Power Breakthrough:** Simultaneously unlocks `P4` 6-Piece Resonance and advances Queue 1's Right-side slot into Legendary `Y1`.",
          },
        },
      ],
    },
  ],
};

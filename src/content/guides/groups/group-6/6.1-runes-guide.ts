import type { GuideArticle } from "../../types";

export const ARTICLE_6_1_RUNES_GUIDE: GuideArticle = {
  code: "6.1",
  slug: "runes-guide",
  categorySlug: "power-systems",
  badge: "HOT",
  readingMinutes: 10,
  title: {
    vi: "Cẩm Nang Cổ Ngữ (Runes Lv.1–12): Quy Tắc Rương Tự Chọn & Điểm Gãy Lv.5 / Lv.8",
    en: "Runes Master Guide (Lv.1–12): Choice Chest Discipline & Lv.5 / Lv.8 Breakpoints",
  },
  summary: {
    vi: "Phân tích toàn diện 6 vị trí Cổ Ngữ (Runes), kỷ luật giữ Rương Tự Chọn chờ Lv.4–Lv.5+, bảng chi phí ghép phôi Tam Phân Lv.1–Lv.8 và bảng thông số Lv.1–Lv.12 từ TopHeroes Tables (Tab Runes), giá trị toán học tối thượng của dòng Combat Skill Level +1/+2 và lịch xả Bụi Cổ Ngữ vào Ngày 2 (Thứ Ba) Kỳ GAR/KvK.",
    en: "Comprehensive guide to the 6 Rune slots, Choice Chest hoarding discipline until Lv.4–Lv.5+, complete Lv.1–Lv.8 ternary synthesis & Lv.1–Lv.12 stat tables from TopHeroes Tables (Tab Runes), Combat Skill Level +1/+2 math analysis, and Day 2 (Tuesday) GAR/KvK dumping schedule.",
  },
  tldr: {
    coreRule: {
      vi: "**Luôn nâng đồng đều cả 6 ô Cổ Ngữ chạm điểm gãy `Lv.5` trước khi ghép bất kỳ viên `Lv.6` nào.**\n• **Giai đoạn sơ cấp (`Lv.1–Lv.4`):** Cổ Ngữ chỉ cộng chỉ số phẳng (`Flat Stats`) rất thấp.\n• **Điểm gãy `Lv.5` (`81` phôi Lv.1, `8,000` Dust/viên = `48,000` Dust/6 ô):** Mở khóa `+5%` HP/ATK Tướng & `+110` Tổng Quy mô Hành quân (`March Size`).\n• **Đại đột phá `Lv.8` (`2,187` phôi Lv.1, `225,000` Dust/viên = `1,350,000` Dust/6 ô):** Mở khóa `+5%` HP/ATK Toàn bộ Lính & `+5%` HP Thánh vật.",
      en: "**Always bring all 6 Rune slots evenly to the `Lv.5` breakpoint before merging any single `Lv.6` rune.**\n• **Early Tiers (`Lv.1–Lv.4`):** Runes only grant minor `Flat Stats`.\n• **`Lv.5` Breakpoint (`81` Lv.1 runes, `8,000` Dust/rune = `48,000` Dust/6 slots):** Unlocks `+5%` Hero HP/ATK & `+110` Total `March Size`.\n• **`Lv.8` Grand Breakpoint (`2,187` Lv.1 runes, `225,000` Dust/rune = `1,350,000` Dust/6 slots):** Unlocks `+5%` All Soldiers HP/ATK & `+5%` Relic HP.",
    },
    immediateAction: {
      vi: "**Nâng cấp công trình Mỏ Cổ Ngữ (`Rune Mine`) bám sát cấp Lâu Đài vào Thứ Hai Kỳ GAR/KvK (Ngày Xây dựng).**\n• **Tích trữ 100% nguyên liệu:** Khóa chặt Bụi Cổ Ngữ (`DE-Dust` / `Magic Stones`: `600` điểm / `2,000` Magic Stones) và Tinh Thể Bí Thuật (`Arcane Crystal`: `1,200` điểm / 1 viên).\n• **Cửa sổ xả chuẩn:** Chỉ xả vào **Ngày 2 (Thứ Ba — Tech & Runes Day)** của Kỳ Đua Vũ Trang (`GAR` / `KvK`) hoặc trong Kỳ Thi Đấu Hội (`Guild Race`) ngay sau khi nhận Nhiệm vụ Cổ Ngữ chuyên biệt.",
      en: "**Upgrade your `Rune Mine` building to match your Castle level on GAR/KvK Monday (Construction Day).**\n• **Stockpile 100% of materials:** Strictly lock all Rune Dust (`DE-Dust` / `Magic Stones`: `600` points per `2,000` Magic Stones) and `Arcane Crystal` (`1,200` points per crystal).\n• **Optimal dump window:** Spend exclusively on **Day 2 (Tuesday — Tech & Runes Day)** of GAR / KvK or in Guild Race right after claiming a Dedicated Rune Task.",
    },
    strictTaboo: {
      vi: "**CẤM mở Rương Cổ Ngữ Tự Chọn (`Rune Choice Chests`) ở bậc thấp `Lv.1–Lv.3`!**\n• **Mảnh ghép chốt hạ (`Finisher Piece`):** Tích trữ Rương Tự Chọn đến tầng `Lv.4–Lv.5+` để chọn đúng viên khuyết thiếu nhằm kích hoạt mốc cộng hưởng `%`.\n• **Săn dòng chỉ số hiếm:** Ưu tiên mở khóa `Combat Skill Level` `+1/+2` (Cấp Kỹ năng Chiến đấu, tương đương `3,000`–`5,000` Sách Kỹ Năng Cam miễn phí).",
      en: "**NEVER open `Rune Choice Chests` early at the `Lv.1–Lv.3` bracket!**\n• **Save as `Finisher Pieces`:** Strictly hoard Choice Chests until the `Lv.4–Lv.5+` tier to fill missing slots and unlock percentage breakpoints.\n• **Hunt rare sub-stats:** Target the `Combat Skill Level` `+1/+2` sub-stat (equivalent to `3,000`–`5,000` free Orange Skill Books).",
    },
  },
  keyTakeaways: [
    {
      vi: "**Phân loại 6 Vị trí Ô Khảm Cổ Ngữ (`Tab Runes`):**\n• **Ô 1 (`Hero HP Rune`) & Ô 2 (`Hero Attack Rune`):** Ô 1 từ `Lv.5` (`15,091 / 5%`) ➔ `Lv.12` (`722,271 / 40%`); Ô 2 từ `Lv.5` (`371 / 5%`) ➔ `Lv.12` (`17,753 / 40%`).\n• **Ô 3 (`Soldier HP Rune`) & Ô 4 (`Soldier Attack Rune`):** Từ `Lv.5+` cộng `+30 ➔ +100` `March Size`; từ `Lv.8+` cộng `5% ➔ 30%` All Soldiers HP/ATK.\n• **Ô 5 (`Relic Mastery Rune`):** Đột phá tại `Lv.8` (`28,660 / 5%`) ➔ `Lv.12` (`108,500 / 30%` Relic HP).\n• **Ô 6 (`Queue Attack Rune`):** `Lv.5` (`3,000` Def / `3,845` Def Break / `+50` March) ➔ `Lv.8` (`4,800` / `6,922` / `+150`) ➔ `Lv.12` (`7,200` / `14,000` / `+250` & `Combat Skill Level` `+1/+2`).",
      en: "**The 6 Rune Slots Breakdown (`Tab Runes`):**\n• **Slot 1 (`Hero HP Rune`) & Slot 2 (`Hero Attack Rune`):** Slot 1 scales `Lv.5` (`15,091 / 5%`) ➔ `Lv.12` (`722,271 / 40%`); Slot 2 scales `Lv.5` (`371 / 5%`) ➔ `Lv.12` (`17,753 / 40%`).\n• **Slot 3 (`Soldier HP Rune`) & Slot 4 (`Soldier Attack Rune`):** `Lv.5+` adds `+30 ➔ +100` `March Size`; `Lv.8+` adds `5% ➔ 30%` All Soldiers HP/ATK.\n• **Slot 5 (`Relic Mastery Rune`):** Unlocks at `Lv.8` (`28,660 / 5%`) ➔ `Lv.12` (`108,500 / 30%` Relic HP).\n• **Slot 6 (`Queue Attack Rune`):** `Lv.5` (`3,000` Def / `3,845` Def Break / `+50` March) ➔ `Lv.8` (`4,800` / `6,922` / `+150`) ➔ `Lv.12` (`7,200` / `14,000` / `+250` & `Combat Skill Level` `+1/+2`).",
    },
    {
      vi: "**Công thức Ghép Phôi Tam Phân (`3^(n-1)`) & Chi phí Bụi Cổ Ngữ:**\n• **Bậc `Lv.1–Lv.4`:** `Lv.1` (`1` phôi, `0` Dust) ➔ `Lv.2` (`3` phôi, `200` Dust = `1,200`/6 ô) ➔ `Lv.3` (`9` phôi, `800` Dust = `4,800`/6 ô) ➔ `Lv.4` (`27` phôi, `2,600` Dust = `15,600`/6 ô).\n• **Điểm gãy `Lv.5 ★`:** Cần `81` phôi Lv.1, `8,000` Dust/viên (`48,000` Dust/6 ô) ➔ mở khóa `+5%` HP/ATK & `+110` March Size.\n• **Điểm gãy `Lv.6 ★`:** Cần `243` phôi Lv.1, `25,000` Dust/viên (`150,000` Dust/6 ô) ➔ nâng lên `+10%` HP/ATK & `+150` March Size.\n• **Đột phá `Lv.7` & `Lv.8 ★`:** `Lv.7` (`729` phôi, `75,000` Dust = `450,000`/6 ô) ➔ `Lv.8 ★` (`2,187` phôi Lv.1, `225,000` Dust/viên = `1,350,000` Dust/6 ô).",
      en: "**Ternary Synthesis Formula (`3^(n-1)`) & Rune Dust Costs:**\n• **Early Tiers (`Lv.1–Lv.4`):** `Lv.1` (`1` base, `0` Dust) ➔ `Lv.2` (`3` base, `200` Dust = `1,200`/6 slots) ➔ `Lv.3` (`9` base, `800` Dust = `4,800`/6) ➔ `Lv.4` (`27` base, `2,600` Dust = `15,600`/6).\n• **`Lv.5 ★` Breakpoint:** `81` Lv.1 base, `8,000` Dust/rune (`48,000` Dust/6 slots) ➔ unlocks `+5%` HP/ATK & `+110` March Size.\n• **`Lv.6 ★` Breakpoint:** `243` Lv.1 base, `25,000` Dust/rune (`150,000` Dust/6 slots) ➔ reaches `+10%` HP/ATK & `+150` March Size.\n• **`Lv.7` & `Lv.8 ★` Breakpoint:** `Lv.7` (`729` base, `75,000` Dust = `450,000`/6 slots) ➔ `Lv.8 ★` (`2,187` Lv.1 base, `225,000` Dust/rune = `1,350,000` Dust/6 slots).",
    },
    {
      vi: "**Lịch xả chuẩn Ground-Truth & Thứ tự ưu tiên 3 Phe:**\n• **Lịch xả sự kiện:** Xả Bụi Cổ Ngữ (`600` điểm / `2,000` Magic Stones) và `Arcane Crystal` (`1,200` điểm/viên) vào **Ngày 2 (Thứ Ba — Tech & Runes Day)** Kỳ GAR/KvK (`GAR`/`KvK`) hoặc Task Cổ Ngữ Hội.\n• **Ưu tiên theo Hệ:** Bộ Lạc (Ô 6 `Queue Attack` & Ô 2 `Hero Attack`), Liên Minh (Ô 2 `Hero Attack` & Ô 1 `Hero HP` ➔ Ô 5 `Relic Mastery`), Thiên Nhiên (Ô 1 `Hero HP` & Ô 3 `Soldier HP`).",
      en: "**Ground-Truth Dumping Schedule & 3-Faction Priority:**\n• **Event dump window:** Spend Rune Dust (`600` pts per `2,000` Magic Stones) and `Arcane Crystal` (`1,200` pts each) on **Day 2 (Tuesday — Tech & Runes Day)** of GAR/KvK (`GAR`/`KvK`) or Guild Race Rune Tasks.\n• **Faction priority:** Horde (Slot 6 `Queue Attack` & Slot 2 `Hero Attack`), League (Slot 2 `Hero Attack` & Slot 1 `Hero HP` ➔ Slot 5 `Relic Mastery`), Nature (Slot 1 `Hero HP` & Slot 3 `Soldier HP`).",
    },
  ],
  keywords: [
    "cổ ngữ",
    "co ngu",
    "ấn thạch",
    "runes",
    "rune dust",
    "de-dust",
    "magic stones",
    "bụi cổ ngữ",
    "mỏ cổ ngữ",
    "rune mine",
    "choice rune chest",
    "rương cổ ngữ tự chọn",
    "combat skill level",
    "cấp kỹ năng chiến đấu",
    "queue attack rune",
    "march size",
    "defense break",
    "mạt chược",
    "lv.5",
    "lv.8",
    "lv.12",
  ],
  sourceFiles: [
    "docs/06-game-guides/07-standardized-web-guides/group-6-runes-relics-pets/6.1-runes-guide.md",
    "docs/06-game-guides/07-standardized-web-guides/group-8-infrastructure/8.4-master-data-tables.md",
  ],
  freeSections: [
    {
      id: "sec-1-six-rune-slots-and-merging-mechanics",
      title: {
        vi: "1. Giải thích Cơ chế Cốt lõi: 6 Vị Trí Ô Khảm Cổ Ngữ & Quy Tắc Ghép Phôi Tam Phân (3^(n-1))",
        en: "1. Core Mechanics: The 6 Rune Slots & 3-to-1 Ternary Synthesis Rules (3^(n-1))",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "**Hệ thống Cổ Ngữ / Ấn Thạch (`Runes`) là trụ cột sức mạnh cốt lõi gia tăng trực tiếp chỉ số Tướng, Binh lính và Thánh vật.**\n• **Đột phá Quy mô Hành quân (`March Size`):** Tăng trực tiếp số lượng binh lính mang theo mỗi tướng trong đội hình.\n• **Cấu trúc 6 ô khảm (`Tab Runes`):** Được ký hiệu bằng 6 biểu tượng Mạt chược trong dữ liệu gốc `TopHeroes Tables`, chia làm 3 nhóm vai trò chiến đấu rõ rệt.",
            en: "**The `Runes` system is a foundational progression pillar that directly amplifies Hero stats, Soldier stats, and Relic HP.**\n• **`March Size` Expansion:** Directly increases the troop capacity deployed per hero across your lineup.\n• **6-Slot Architecture (`Tab Runes`):** Represented by 6 Mahjong-tile slots in the `TopHeroes Tables` dataset, divided into 3 distinct combat roles.",
          },
        },
      ],
      subSections: [
        {
          id: "sub-1-1-six-rune-slots-table",
          title: {
            vi: "1.1. Phân loại 6 Vị trí Ô Khảm Cổ Ngữ (The 6 Rune Slots — Tab Runes)",
            en: "1.1. Classification of the 6 Rune Slots (Tab Runes)",
          },
          blocks: [
            {
              type: "media_spotlight",
              mediaCode: "MED-6.1-01",
              tier: "tier2_annotated_ui",
              title: {
                vi: "Sơ Đồ 6 Vị Trí Ô Khảm Cổ Ngữ & Ngưỡng Đột Phá Lv.5 / Lv.8",
                en: "The 6 Rune Slots Layout & Lv.5 / Lv.8 Breakpoint Thresholds",
              },
              description: {
                vi: "Bộ 6 vị trí Cổ Ngữ (Hero HP Rune, Hero Attack Rune, Soldier HP Rune, Soldier Attack Rune, Relic Mastery Rune, Queue Attack Rune) cùng bước nhảy từ chỉ số phẳng (Lv.1–Lv.4) sang % chỉ số, March Size và Combat Skill Level ở Lv.5+ / Lv.8+.",
                en: "Overview of the 6 Rune slots (Hero HP Rune, Hero Attack Rune, Soldier HP Rune, Soldier Attack Rune, Relic Mastery Rune, Queue Attack Rune) illustrating the transition from flat stats (Lv.1–Lv.4) to percentage multipliers, March Size, and Combat Skill Level at Lv.5+ and Lv.8+.",
              },
              annotations: [
                {
                  kind: "do",
                  label: {
                    vi: "Nâng đồng đều 6 ô chạm mốc Lv.5 (81 phôi Lv.1/ô, 48,000 Dust/6 ô)",
                    en: "Level all 6 slots evenly to Lv.5 (81 Lv.1 copies/slot, 48,000 Dust/6 slots)",
                  },
                  detail: {
                    vi: "Chạm mốc Lv.5 trên cả 6 ô giúp mở khóa ngay +5% Hero HP (15,091 / 5%), +5% Hero ATK (371 / 5%), +3,845 Defense Break và tổng cộng +110 March Size (+30 từ Soldier HP, +30 từ Soldier ATK, +50 từ Queue Attack).",
                    en: "Reaching Lv.5 across all 6 slots immediately unlocks +5% Hero HP (15,091 / 5%), +5% Hero ATK (371 / 5%), +3,845 Defense Break, and +110 Total March Size (+30 Soldier HP, +30 Soldier ATK, +50 Queue Attack).",
                  },
                },
                {
                  kind: "info",
                  label: {
                    vi: "Điểm gãy Đại Đột Phá Lv.8 (2,187 phôi Lv.1/ô, 1,350,000 Dust/6 ô)",
                    en: "Lv.8 Grand Breakpoint (2,187 Lv.1 copies/slot, 1,350,000 Dust/6 slots)",
                  },
                  detail: {
                    vi: "Tại Lv.8, Ô 3 và Ô 4 mở khóa thêm +5% HP/ATK Toàn bộ Lính (All Soldiers HP/ATK), trong khi Ô 5 mở khóa 28,660 / +5% Relic HP và Ô 6 đạt 4,800 Def / 6,922 Def Break / +150 March Size.",
                    en: "At Lv.8, Slots 3 and 4 unlock +5% All Soldiers HP/ATK, while Slot 5 unlocks 28,660 / +5% Relic HP and Slot 6 reaches 4,800 Def / 6,922 Def Break / +150 March Size.",
                  },
                },
                {
                  kind: "dont",
                  label: {
                    vi: "Không dừng ở Lv.1–Lv.4 hoặc dồn lệch 1 viên lên Lv.6 sớm",
                    en: "Do not stall at Lv.1–Lv.4 or rush a single Lv.6 rune early",
                  },
                  detail: {
                    vi: "Từ Lv.1 đến Lv.4, cả 6 ô chỉ cộng chỉ số phẳng rất thấp. Ghép dồn 1 viên lên Lv.6 (243 phôi Lv.1, 25,000 Dust) làm mất cơ hội kích hoạt mốc Lv.5 cho 3 ô khác.",
                    en: "From Lv.1 to Lv.4, all 6 slots only provide minor flat stats. Rushing a single Lv.6 rune (243 Lv.1 copies, 25,000 Dust) starves 3 other slots from hitting their Lv.5 percentage and March Size breakpoints.",
                  },
                },
              ],
            },
            {
              type: "table",
              caption: {
                vi: "Bảng 1: Phân Loại 6 Vị Trí Ô Khảm Cổ Ngữ & Chỉ Số Đột Phá Mở Khóa Ở Lv.5 / Lv.8 / Lv.12 (Nguồn: TopHeroes Tables - Tab Runes)",
                en: "Table 1: The 6 Rune Slots Classification & Breakpoint Stats at Lv.5 / Lv.8 / Lv.12 (Source: TopHeroes Tables - Tab Runes)",
              },
              headers: [
                {
                  vi: "Vị Trí Ô Khảm",
                  en: "Rune Slot",
                },
                {
                  vi: "Tên Tiếng Việt & Tiếng Anh",
                  en: "Rune Name (VI & EN)",
                },
                {
                  vi: "Nhóm Chỉ Số Cơ Bản (Lv.1–Lv.4)",
                  en: "Base Stat Group (Lv.1–Lv.4)",
                },
                {
                  vi: "Chỉ Số Đột Phá Mở Khóa Ở Lv.5, Lv.8 & Lv.12",
                  en: "Breakpoint Stats Unlocked at Lv.5, Lv.8 & Lv.12",
                },
              ],
              rows: [
                [
                  {
                    vi: "Ô số 1",
                    en: "Slot 1",
                  },
                  {
                    vi: "Cổ Ngữ Sinh Lực Tướng (Hero HP Rune)",
                    en: "Hero HP Rune",
                  },
                  {
                    vi: "Cộng HP Tướng phẳng (Flat Hero HP: 650 ở Lv.1 ➔ 5,606 ở Lv.4)",
                    en: "Adds Flat Hero HP (650 at Lv.1 ➔ 5,606 at Lv.4)",
                  },
                  {
                    vi: "Lv.5+: Mở khóa +% Hero HP (Lv.5 = 15,091 / 5% ➔ Lv.6 = 40,616 / 10% ➔ Lv.8 = 191,019 / 20% ➔ Lv.12 = 722,271 / 40%)",
                    en: "Lv.5+: Unlocks +% Hero HP (Lv.5 = 15,091 / 5% ➔ Lv.6 = 40,616 / 10% ➔ Lv.8 = 191,019 / 20% ➔ Lv.12 = 722,271 / 40%)",
                  },
                ],
                [
                  {
                    vi: "Ô số 2",
                    en: "Slot 2",
                  },
                  {
                    vi: "Cổ Ngữ Tấn Công Tướng (Hero Attack Rune)",
                    en: "Hero Attack Rune",
                  },
                  {
                    vi: "Cộng ATK Tướng phẳng (Flat Hero Attack: 16 ở Lv.1 ➔ 138 ở Lv.4)",
                    en: "Adds Flat Hero Attack (16 at Lv.1 ➔ 138 at Lv.4)",
                  },
                  {
                    vi: "Lv.5+: Mở khóa +% Hero Attack (Lv.5 = 371 / 5% ➔ Lv.6 = 999 / 10% ➔ Lv.8 = 4,696 / 20% ➔ Lv.12 = 17,753 / 40%)",
                    en: "Lv.5+: Unlocks +% Hero Attack (Lv.5 = 371 / 5% ➔ Lv.6 = 999 / 10% ➔ Lv.8 = 4,696 / 20% ➔ Lv.12 = 17,753 / 40%)",
                  },
                ],
                [
                  {
                    vi: "Ô số 3",
                    en: "Slot 3",
                  },
                  {
                    vi: "Cổ Ngữ Sinh Lực Binh Lính (Soldier HP Rune)",
                    en: "Soldier HP Rune",
                  },
                  {
                    vi: "Cộng HP Lính phẳng (Flat Soldier HP: 2 ở Lv.1 ➔ 8 ở Lv.4)",
                    en: "Adds Flat Soldier HP (2 at Lv.1 ➔ 8 at Lv.4)",
                  },
                  {
                    vi: "Lv.5+: Cộng March Size (+30 ➔ +100); Lv.8+: Mở khóa +% HP of All Soldiers (+5% ở Lv.8 ➔ +30% ở Lv.12)",
                    en: "Lv.5+: Adds March Size (+30 ➔ +100); Lv.8+: Unlocks +% HP of All Soldiers (+5% at Lv.8 ➔ +30% at Lv.12)",
                  },
                ],
                [
                  {
                    vi: "Ô số 4",
                    en: "Slot 4",
                  },
                  {
                    vi: "Cổ Ngữ Tấn Công Binh Lính (Soldier Attack Rune)",
                    en: "Soldier Attack Rune",
                  },
                  {
                    vi: "Cộng ATK Lính phẳng (Flat Soldier Attack: 2 ở Lv.1 ➔ 7 ở Lv.4)",
                    en: "Adds Flat Soldier Attack (2 at Lv.1 ➔ 7 at Lv.4)",
                  },
                  {
                    vi: "Lv.5+: Cộng March Size (+30 ➔ +100); Lv.8+: Mở khóa +% Attack of All Soldiers (+5% ở Lv.8 ➔ +30% ở Lv.12)",
                    en: "Lv.5+: Adds March Size (+30 ➔ +100); Lv.8+: Unlocks +% Attack of All Soldiers (+5% at Lv.8 ➔ +30% at Lv.12)",
                  },
                ],
                [
                  {
                    vi: "Ô số 5",
                    en: "Slot 5",
                  },
                  {
                    vi: "Cổ Ngữ Tinh Thông Thánh Vật (Relic Mastery Rune)",
                    en: "Relic Mastery Rune",
                  },
                  {
                    vi: "Cộng HP Thánh Vật phẳng (Flat Relic HP: 850 ở Lv.1 ➔ 17,580 ở Lv.7)",
                    en: "Adds Flat Relic HP (850 at Lv.1 ➔ 17,580 at Lv.7)",
                  },
                  {
                    vi: "Lv.8+: Mở khóa +% Relic HP (Lv.8 = 28,660 / 5% ➔ Lv.12 = 108,500 / 30% Relic HP)",
                    en: "Lv.8+: Unlocks +% Relic HP (Lv.8 = 28,660 / 5% ➔ Lv.12 = 108,500 / 30% Relic HP)",
                  },
                ],
                [
                  {
                    vi: "Ô số 6",
                    en: "Slot 6",
                  },
                  {
                    vi: "Cổ Ngữ Tấn Công Hàng Đợi (Queue Attack Rune)",
                    en: "Queue Attack Rune",
                  },
                  {
                    vi: "Cộng Phòng thủ (Defense: 600–2,400) & Xuyên thủ (Defense Break: 769–3,076)",
                    en: "Adds Defense (600–2,400) & Defense Break (769–3,076)",
                  },
                  {
                    vi: "Lv.5+: 3,000 Def / 3,845 Def Break / +50 March Size ➔ Lv.8: 4,800 / 6,922 / +150 ➔ Lv.12: 7,200 / 14,000 / +250 & mở khóa Combat Skill Level +1 / +2, Damage Reduction %",
                    en: "Lv.5+: 3,000 Def / 3,845 Def Break / +50 March Size ➔ Lv.8: 4,800 / 6,922 / +150 ➔ Lv.12: 7,200 / 14,000 / +250 & unlocks Combat Skill Level +1 / +2, Damage Reduction %",
                  },
                ],
              ],
            },
          ],
        },
        {
          id: "sub-1-2-ternary-merging-and-rune-mine",
          title: {
            vi: "1.2. Cơ chế Ghép Phôi Tam Phân (3-to-1 Merging) & Chi Phí Bụi Cổ Ngữ (Lv.1 ➔ Lv.8)",
            en: "1.2. 3-to-1 Ternary Synthesis Mechanics & Rune Dust Cost Table (Lv.1 ➔ Lv.8)",
          },
          blocks: [
            {
              type: "paragraph",
              text: {
                vi: "**Theo quy tắc Ghép Phôi Tam Phân (`3-to-1 Synthesis`), cứ `3` viên Cổ Ngữ cùng loại và cùng cấp sẽ hợp thành `1` viên cấp kế tiếp.**\n• **Công thức lũy thừa (`3^(n-1)`):** Mỗi viên cấp `n` tiêu tốn `3^(n-1)` phôi `Lv.1` kết hợp cùng Bụi Cổ Ngữ (`Rune Dust` / `DE-Dust` / `Magic Stones`).\n• **Nguồn thu thập chính:** Khai thác từ Mỏ Cổ Ngữ (`Rune Mine`) trong Lâu Đài và các Rương Cổ Ngữ Ngẫu Nhiên (`Random Rune Chests`) vs Tự Chọn (`Choice Rune Chests`).",
                en: "**Under the `3-to-1` Ternary Synthesis rule, combining `3` identical Runes of the same level produces `1` Rune of the next tier.**\n• **Exponential Formula (`3^(n-1)`):** Each `Lv.n` rune requires `3^(n-1)` `Lv.1` base runes plus Rune Dust (`DE-Dust` / `Magic Stones`).\n• **Primary Sources:** Harvested from the passive `Rune Mine` building inside your Castle and `Random Rune Chests` vs `Choice Rune Chests` from events.",
              },
            },
            {
              type: "table",
              caption: {
                vi: "Bảng 2: Bảng Chi Phí Ghép Phôi Tam Phân (3^(n-1)) & Bụi Cổ Ngữ (Rune Dust) Từ Lv.1 ➔ Lv.8",
                en: "Table 2: Ternary Synthesis (3^(n-1)) & Rune Dust Cost Table from Lv.1 ➔ Lv.8",
              },
              headers: [
                {
                  vi: "Cấp Cổ Ngữ (Rune Lv)",
                  en: "Rune Level",
                },
                {
                  vi: "Công Thức Ghép Phôi",
                  en: "Synthesis Formula",
                },
                {
                  vi: "Tổng Phôi Lv.1 Quy Đổi (3^(n-1))",
                  en: "Total Lv.1 Base Copies (3^(n-1))",
                },
                {
                  vi: "Chi Phí Bụi Cổ Ngữ / Viên (Rune Dust)",
                  en: "Rune Dust Cost / Rune",
                },
                {
                  vi: "Tổng Bụi Cổ Ngữ Cho Đủ Bộ 6 Ô",
                  en: "Total Dust for Full 6 Slots",
                },
                {
                  vi: "Đánh Giá Điểm Gãy Chiến Thuật (ROI Breakpoint)",
                  en: "Tactical ROI Breakpoint Assessment",
                },
              ],
              rows: [
                [
                  {
                    vi: "Lv.1",
                    en: "Lv.1",
                  },
                  {
                    vi: "Phôi gốc (Base)",
                    en: "Base Copy",
                  },
                  {
                    vi: "1 phôi Lv.1",
                    en: "1 Lv.1 copy",
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
                    vi: "Khảm lấp đầy đủ 6 ô ngay ngày mở khóa tính năng.",
                    en: "Fill all 6 slots immediately upon unlocking the feature.",
                  },
                ],
                [
                  {
                    vi: "Lv.2",
                    en: "Lv.2",
                  },
                  {
                    vi: "3 × Lv.1",
                    en: "3 × Lv.1",
                  },
                  {
                    vi: "3 phôi Lv.1",
                    en: "3 Lv.1 copies",
                  },
                  {
                    vi: "200",
                    en: "200",
                  },
                  {
                    vi: "1,200",
                    en: "1,200",
                  },
                  {
                    vi: "Bước đệm sơ cấp, chỉ cộng chỉ số phẳng (Flat Stats).",
                    en: "Early stepping stone granting minor Flat Stats only.",
                  },
                ],
                [
                  {
                    vi: "Lv.3",
                    en: "Lv.3",
                  },
                  {
                    vi: "3 × Lv.2",
                    en: "3 × Lv.2",
                  },
                  {
                    vi: "9 phôi Lv.1",
                    en: "9 Lv.1 copies",
                  },
                  {
                    vi: "800",
                    en: "800",
                  },
                  {
                    vi: "4,800",
                    en: "4,800",
                  },
                  {
                    vi: "Ngưỡng cảnh báo: CẤM mở Rương Cổ Ngữ Tự Chọn ở mốc này.",
                    en: "Warning threshold: NEVER open Rune Choice Chests at this stage.",
                  },
                ],
                [
                  {
                    vi: "Lv.4",
                    en: "Lv.4",
                  },
                  {
                    vi: "3 × Lv.3",
                    en: "3 × Lv.3",
                  },
                  {
                    vi: "27 phôi Lv.1",
                    en: "27 Lv.1 copies",
                  },
                  {
                    vi: "2,600",
                    en: "2,600",
                  },
                  {
                    vi: "15,600",
                    en: "15,600",
                  },
                  {
                    vi: "Mốc chuẩn bị cuối cùng trước khi đột phá sang chỉ số phần trăm (%).",
                    en: "Final preparation tier before breaking into percentage (%) stats.",
                  },
                ],
                [
                  {
                    vi: "Lv.5 ★",
                    en: "Lv.5 ★",
                  },
                  {
                    vi: "3 × Lv.4",
                    en: "3 × Lv.4",
                  },
                  {
                    vi: "81 phôi Lv.1",
                    en: "81 Lv.1 copies",
                  },
                  {
                    vi: "8,000",
                    en: "8,000",
                  },
                  {
                    vi: "48,000",
                    en: "48,000",
                  },
                  {
                    vi: "ĐIỂM GÃY VÀNG SỐ 1: Mở khóa +5% HP/ATK Tướng & +110 Tổng March Size (30 + 30 + 50).",
                    en: "GOLDEN BREAKPOINT #1: Unlocks +5% Hero HP/ATK & +110 Total March Size (30 + 30 + 50).",
                  },
                ],
                [
                  {
                    vi: "Lv.6 ★",
                    en: "Lv.6 ★",
                  },
                  {
                    vi: "3 × Lv.5",
                    en: "3 × Lv.5",
                  },
                  {
                    vi: "243 phôi Lv.1",
                    en: "243 Lv.1 copies",
                  },
                  {
                    vi: "25,000",
                    en: "25,000",
                  },
                  {
                    vi: "150,000",
                    en: "150,000",
                  },
                  {
                    vi: "ĐIỂM GÃY TRUNG CẤP: Nhân đôi dòng % lên +10% HP/ATK Tướng & +150 Tổng March Size (35 + 35 + 80).",
                    en: "MID-GAME BREAKPOINT: Doubles percentage stats to +10% Hero HP/ATK & +150 Total March Size (35 + 35 + 80).",
                  },
                ],
                [
                  {
                    vi: "Lv.7",
                    en: "Lv.7",
                  },
                  {
                    vi: "3 × Lv.6",
                    en: "3 × Lv.6",
                  },
                  {
                    vi: "729 phôi Lv.1",
                    en: "729 Lv.1 copies",
                  },
                  {
                    vi: "75,000",
                    en: "75,000",
                  },
                  {
                    vi: "450,000",
                    en: "450,000",
                  },
                  {
                    vi: "Bước trung chuyển lên Lv.8 (+15% HP/ATK Tướng, +200 Tổng March Size).",
                    en: "Transition tier toward Lv.8 (+15% Hero HP/ATK, +200 Total March Size).",
                  },
                ],
                [
                  {
                    vi: "Lv.8 ★",
                    en: "Lv.8 ★",
                  },
                  {
                    vi: "3 × Lv.7",
                    en: "3 × Lv.7",
                  },
                  {
                    vi: "2,187 phôi Lv.1",
                    en: "2,187 Lv.1 copies",
                  },
                  {
                    vi: "225,000",
                    en: "225,000",
                  },
                  {
                    vi: "1,350,000",
                    en: "1,350,000",
                  },
                  {
                    vi: "ĐIỂM GÃY ĐẠI ĐỘT PHÁ: Mở khóa +5% HP/ATK Toàn Bộ Lính, +5% HP Thánh Vật & +250 Tổng March Size.",
                    en: "GRAND BREAKPOINT: Unlocks +5% All Soldiers HP/ATK, +5% Relic HP & +250 Total March Size.",
                  },
                ],
              ],
            },
            {
              type: "callout",
              variant: "tip",
              title: {
                vi: "Tối Ưu Mỏ Cổ Ngữ (Rune Mine) & Giá Trị Tối Thượng Của Combat Skill Level +1/+2",
                en: "Rune Mine Optimization & The Supreme Value of Combat Skill Level +1/+2",
              },
              content: {
                vi: "**Sản lượng Bụi Cổ Ngữ mỗi giờ phụ thuộc trực tiếp vào cấp độ Mỏ Cổ Ngữ (`Rune Mine`).**\n• **Lịch nâng mỏ:** Luôn nâng Mỏ Cổ Ngữ bám sát cấp Lâu Đài vào **Thứ Hai Kỳ GAR/KvK** (Ngày Xây dựng).\n• **Siêu chỉ số `Combat Skill Level` `+1/+2`:** Từ `Lv.5–Lv.6+`, cộng thẳng `1–2` cấp kỹ năng vượt trần (`+15%–35%` sát thương cho `Wukong`, `Storm Maiden`, `Paragon`, `Tidecaller`).\n• **Giá trị quy đổi:** Tương đương từ `3,000` đến `5,000` Sách Kỹ Năng Cam (`Orange Skill Books`) miễn phí!",
                en: "**Your hourly Rune Dust output scales directly with your `Rune Mine` building level.**\n• **Mine upgrade schedule:** Always upgrade the `Rune Mine` alongside your Castle on **GAR/KvK Monday** (Construction Day).\n• **Rare `Combat Skill Level` `+1/+2` Sub-Stat:** At `Lv.5–Lv.6+`, adds `+1–2` active skill levels above cap (`+15%–35%` skill dmg for `Wukong`, `Storm Maiden`, `Paragon`, `Tidecaller`).\n• **Equivalent value:** Worth `3,000` to `5,000` free `Orange Skill Books`!",
              },
            },
          ],
        },
      ],
    },
    {
      id: "sec-2-choice-chest-discipline-and-faction-priority",
      title: {
        vi: "2. Chiến thuật Tối ưu cho F2P & Low-Spender: Kỷ Luật Rương Tự Chọn (Lv.4–Lv.5+) & Thứ Tự Ưu Tiên 3 Phe",
        en: "2. F2P & Low-Spender Strategy: Choice Chest Discipline (Lv.4–Lv.5+) & 3-Faction Slot Priority",
      },
      blocks: [
        {
          type: "visual_diagram",
          mediaCode: "MED-6.1-03",
          variant: "decision_flow",
          title: {
            vi: "Sơ Đồ Quyết Định Quản Lý Rương Tự Chọn & Lịch Xả Bụi Cổ Ngữ Chuẩn Ground-Truth",
            en: "Choice Chest Finisher Discipline & Ground-Truth Rune Dust Dumping Flowchart",
          },
          subtitle: {
            vi: "Quy trình 3 nhánh từ thu thập phôi hàng ngày đến chạm mốc Full 6 Ô Lv.5 / Lv.8",
            en: "3-branch workflow from daily rune harvesting to hitting Full 6-Slot Lv.5 / Lv.8 breakpoints",
          },
          centerNode: {
            id: "node-rune-harvest-hub",
            badge: {
              vi: "NGUỒN THU THẬP 24/7",
              en: "24/7 HARVEST HUB",
            },
            title: {
              vi: "Thu Thập Phôi & Bụi Cổ Ngữ (DE-Dust / Magic Stones) Từ Mỏ Cổ Ngữ & Sự Kiện",
              en: "Harvest Runes & Rune Dust (DE-Dust / Magic Stones) from Rune Mine & Events",
            },
            subtitle: {
              vi: "Thu hoạch Mỏ Cổ Ngữ mỗi 12–24h và phân loại rương ngay trong túi đồ",
              en: "Collect Rune Mine output every 12–24h and classify chests in inventory",
            },
            tone: "gold",
          },
          branches: [
            {
              title: {
                vi: "Nhánh 1: Phân Loại Rương (Mở Random Chest vs Khóa Cứng Choice Chest)",
                en: "Branch 1: Chest Triage (Open Random Chests vs Lock Choice Chests)",
              },
              badge: {
                vi: "KỶ LUẬT TÚI ĐỒ",
                en: "INVENTORY RULE",
              },
              tone: "emerald",
              steps: [
                {
                  id: "step-rune-random-open",
                  title: {
                    vi: "Mở Rương Cổ Ngữ Ngẫu Nhiên (Random Rune Chests)",
                    en: "Open Random Rune Chests for Base Fodder",
                  },
                  subtitle: {
                    vi: "Lấy phôi nền lấp đầy 6 ô và tích lũy phôi Lv.1–Lv.4 tự nhiên",
                    en: "Fill all 6 slots and accumulate natural Lv.1–Lv.4 base copies",
                  },
                  tone: "emerald",
                },
                {
                  id: "step-rune-choice-lock",
                  title: {
                    vi: "KHÓA CHẶT 100% Rương Cổ Ngữ Tự Chọn (Choice Rune Chests)",
                    en: "STRICTLY LOCK 100% of Rune Choice Chests",
                  },
                  subtitle: {
                    vi: "Cấm tuyệt đối mở ở Lv.1–Lv.3; giữ làm Mảnh ghép Chốt hạ (Finisher Piece) ở Lv.4–Lv.5+",
                    en: "Never open at Lv.1–Lv.3; save as Finisher Pieces for Lv.4–Lv.5+ bottlenecks",
                  },
                  tone: "gold",
                },
              ],
              outcome: {
                vi: "Tránh lệch phôi xác suất thống kê khi ghép lên Lv.5",
                en: "Eliminates RNG slot starvation when pushing to Lv.5",
              },
            },
            {
              title: {
                vi: "Nhánh 2: Cửa Sổ Xả Chuẩn Ground-Truth (Thứ Ba Kỳ GAR/KvK & Task Thi Đấu Hội)",
                en: "Branch 2: Ground-Truth Dump Window (GAR/KvK Tuesday & Guild Race Task)",
              },
              badge: {
                vi: "DOUBLE-DIP",
                en: "DOUBLE-DIP",
              },
              tone: "gold",
              steps: [
                {
                  id: "step-rune-week-b-tuesday",
                  title: {
                    vi: "Kỳ Đua Vũ Trang (GAR / KvK): Xả Duy Nhất Vào Ngày 2 (Thứ Ba — Tech & Runes Day)",
                    en: "GAR / KvK: Dump Exclusively on Day 2 (Tuesday — Tech & Runes Day)",
                  },
                  subtitle: {
                    vi: "Nhận 600 điểm / 2,000 Magic Stones (DE-Dust) và 1,200 điểm / 1 Arcane Crystal",
                    en: "Score 600 pts per 2,000 Magic Stones (DE-Dust) and 1,200 pts per 1 Arcane Crystal",
                  },
                  tone: "gold",
                },
                {
                  id: "step-rune-week-a-task",
                  title: {
                    vi: "Kỳ Thi Đấu Hội (Guild Race): Xả Khi Nhận Nhiệm Vụ Cổ Ngữ Chuyên Biệt",
                    en: "Guild Race: Spend Only After Claiming a Dedicated Rune Task",
                  },
                  subtitle: {
                    vi: "Kết hợp ghép phôi và tiêu thụ Bụi Cổ Ngữ ngay sau khi nhận task Hội",
                    en: "Synchronize rune merging and Dust spending with active Guild Race tasks",
                  },
                  tone: "emerald",
                },
              ],
              outcome: {
                vi: "Tối đa hóa điểm sự kiện mà không lãng phí 1 hạt Bụi Cổ Ngữ nào",
                en: "Maximizes event milestones without wasting a single point of Rune Dust",
              },
            },
            {
              title: {
                vi: "Nhánh 3: Bung Rương Tự Chọn Chốt Hạ Full 6 Ô Lv.5 ➔ Lv.6 & Lv.8",
                en: "Branch 3: Unleash Choice Chests to Finish Full 6x Lv.5 ➔ Lv.6 & Lv.8",
              },
              badge: {
                vi: "ĐIỂM GÃY ROI",
                en: "ROI BREAKPOINT",
              },
              tone: "emerald",
              steps: [
                {
                  id: "step-rune-full-lv5",
                  title: {
                    vi: "Cán Mốc Đồng Đều Full 6 Ô Lv.5 (81 phôi Lv.1/ô, 48,000 Dust/6 ô)",
                    en: "Hit Even Full 6-Slot Lv.5 (81 Lv.1 copies/slot, 48,000 Dust/6 slots)",
                  },
                  subtitle: {
                    vi: "Mở khóa ngay +5% HP/ATK Tướng, +3,845 Def Break và +110 Tổng March Size",
                    en: "Unlocks +5% Hero HP/ATK, +3,845 Def Break, and +110 Total March Size",
                  },
                  tone: "emerald",
                },
                {
                  id: "step-rune-lv6-lv8",
                  title: {
                    vi: "Tiến Lên Lv.6 (243 phôi) & Lv.8 (2,187 phôi) + Săn Combat Skill Level +1/+2",
                    en: "Advance to Lv.6 (243 copies) & Lv.8 (2,187 copies) + Hunt Combat Skill Level +1/+2",
                  },
                  subtitle: {
                    vi: "Mở +10% ➔ +20% HP/ATK Tướng, +5% HP/ATK Toàn Lính, +5% Relic HP & +250 March Size",
                    en: "Unlocks +10% ➔ +20% Hero HP/ATK, +5% All Soldiers HP/ATK, +5% Relic HP & +250 March Size",
                  },
                  tone: "gold",
                },
              ],
              outcome: {
                vi: "Đột phá lực chiến thực tế vượt trội trên từng hạt Bụi Cổ Ngữ",
                en: "Superior real combat power per unit of Rune Dust invested",
              },
            },
          ],
        },
        {
          type: "media_spotlight",
          mediaCode: "MED-6.1-02",
          tier: "tier2_annotated_ui",
          title: {
            vi: "Đối Chiếu Rương Cổ Ngữ Ngẫu Nhiên vs Rương Tự Chọn & Giao Diện Đột Phá Lv.4 ➔ Lv.5",
            en: "Random vs. Choice Rune Chests & Lv.4 ➔ Lv.5 Breakpoint Preview Interface",
          },
          description: {
            vi: "Ảnh chụp giao diện Bảng Khảm Cổ Ngữ in-game thể hiện sự khác biệt giữa Rương Ngẫu Nhiên (mở lấy phôi nền) và Rương Tự Chọn (khóa chờ Lv.4 ➔ Lv.5 làm Finisher Piece), kèm dòng thuộc tính mở khóa ở Lv.5 (+5% Hero ATK & +50 March Size) và dòng hiếm Combat Skill Level +1/+2.",
            en: "Annotated in-game Rune Board preview comparing Random Rune Chests (open for base fodder) against Choice Rune Chests (lock until Lv.4 ➔ Lv.5 as Finisher Pieces), highlighting the Lv.5 unlock (+5% Hero ATK & +50 March Size) and the rare Combat Skill Level +1/+2 sub-stat.",
          },
          annotations: [
            {
              kind: "do",
              label: {
                vi: "Rương Cổ Ngữ Tự Chọn = Mảnh Ghép Chốt Hạ (Finisher Piece) ở Lv.4 ➔ Lv.5",
                en: "Choice Rune Chest = Finisher Piece at Lv.4 ➔ Lv.5",
              },
              detail: {
                vi: "Khi Rương Ngẫu Nhiên rơi lệch khiến Ô số 2 (Hero Attack) hoặc Ô số 6 (Queue Attack) thiếu đúng 1 viên Lv.4 để lên Lv.5, dùng Rương Tự Chọn bù đúng vị trí đó để kích hoạt ngay +5% ATK và +50 March Size.",
                en: "When RNG leaves Slot 2 (Hero Attack) or Slot 6 (Queue Attack) just one Lv.4 copy shy of Lv.5, use a Choice Chest to fill the exact missing piece and immediately trigger +5% ATK and +50 March Size.",
              },
            },
            {
              kind: "info",
              label: {
                vi: "Săn dòng chỉ số hiếm Combat Skill Level +1 / +2 (Tương đương 3,000–5,000 Sách Cam)",
                en: "Hunt Rare Combat Skill Level +1 / +2 Sub-Stat (Worth 3,000–5,000 Orange Skill Books)",
              },
              detail: {
                vi: "Từ bậc Lv.5–Lv.6 trở lên, dòng Combat Skill Level +1/+2 cộng thẳng cấp kỹ năng chiến đấu thực tế cho tướng chủ lực, gia tăng 15%–35% hệ số sát thương kỹ năng.",
                en: "From Lv.5–Lv.6 onward, rolling Combat Skill Level +1/+2 directly increases active skill levels for your core heroes, boosting skill multipliers by 15%–35%.",
              },
            },
            {
              kind: "dont",
              label: {
                vi: "Cấm khui Rương Tự Chọn ở Lv.1–Lv.3 để lấy vài điểm Flat Stats",
                en: "Never open Choice Chests at Lv.1–Lv.3 for negligible Flat Stats",
              },
              detail: {
                vi: "Khui Rương Tự Chọn ở giai đoạn Lv.1–Lv.3 chỉ mang lại vài chục điểm ATK/HP phẳng vô nghĩa và khiến tài khoản bị kẹt phôi hàng tuần liền khi lên tầng Lv.4–Lv.5.",
                en: "Opening Choice Chests at Lv.1–Lv.3 yields only negligible flat stats and leaves your main queue bottlenecked for weeks at Lv.4–Lv.5.",
              },
            },
          ],
        },
        {
          type: "roadmap",
          steps: [
            {
              badge: {
                vi: "PHE BỘ LẠC (HORDE)",
                en: "HORDE FACTION",
              },
              title: {
                vi: "Đội hình Sát thương Dồn & Càn lướt (Wukong, Storm Maiden, Desert Prince, Beastmaster)",
                en: "Burst & Dive Lineup (Wukong, Storm Maiden, Desert Prince, Beastmaster)",
              },
              timing: {
                vi: "Ưu tiên 1: Ô số 6 & Ô số 2 ➔ Ưu tiên 2: Ô số 4 & Ô số 1",
                en: "Priority 1: Slot 6 & Slot 2 ➔ Priority 2: Slot 4 & Slot 1",
              },
              description: {
                vi: "**Ưu tiên số 1 (`Ô số 6` & `Ô số 2`):** Đẩy `Queue Attack Rune` & `Hero Attack Rune` chạm `Lv.5 ➔ Lv.6` lấy Xuyên Thủ (`3,845 ➔ 4,614` Def Break) kèm `+50–80` `March Size` phá khiên Liên Minh.\n• **Ưu tiên số 2 (`Ô số 4` & `Ô số 1`):** Nâng `Soldier Attack Rune` và `Hero HP Rune` để gia cố lượng máu gốc cho `Desert Prince`.",
                en: "**Priority 1 (`Slot 6` & `Slot 2`):** Push `Queue Attack Rune` & `Hero Attack Rune` to `Lv.5 ➔ Lv.6` for Defense Break (`3,845 ➔ 4,614`) and `+50–80` `March Size` to shred League shields.\n• **Priority 2 (`Slot 4` & `Slot 1`):** Follow with `Soldier Attack Rune` and `Hero HP Rune` to bolster `Desert Prince`'s HP pool.",
              },
            },
            {
              badge: {
                vi: "PHE LIÊN MINH (LEAGUE)",
                en: "LEAGUE FACTION",
              },
              title: {
                vi: "Đội hình Phép Thuật & Khiên Chắn (Paragon, Pyromancer, Adjudicator, Rose Princess)",
                en: "AoE Magic & Shield Lineup (Paragon, Pyromancer, Adjudicator, Rose Princess)",
              },
              timing: {
                vi: "Ưu tiên 1: Ô số 2 & Ô số 1 ➔ Ưu tiên 2: Ô số 5 & Ô số 6",
                en: "Priority 1: Slot 2 & Slot 1 ➔ Priority 2: Slot 5 & Slot 6",
              },
              description: {
                vi: "**Ưu tiên số 1 (`Ô số 2` & `Ô số 1`):** Đẩy `Hero Attack Rune` & `Hero HP Rune` lên `Lv.5+` để tăng sát thương phép của `Paragon`/`Pyromancer` và độ dày khiên của `Adjudicator`/`Rose Princess`.\n• **Ưu tiên số 2 (`Ô số 5` & `Ô số 6`):** Nâng `Relic Mastery Rune` và `Queue Attack Rune` hỗ trợ bộ Thánh vật `Soul Guard Orb` & `Feather of the Pact`.",
                en: "**Priority 1 (`Slot 2` & `Slot 1`):** Push `Hero Attack Rune` & `Hero HP Rune` to `Lv.5+` to maximize AoE burst (`Paragon`/`Pyromancer`) and shield scaling (`Adjudicator`/`Rose Princess`).\n• **Priority 2 (`Slot 5` & `Slot 6`):** Follow with `Relic Mastery Rune` and `Queue Attack Rune` to amplify `Soul Guard Orb` and `Feather of the Pact`.",
              },
            },
            {
              badge: {
                vi: "PHE THIÊN NHIÊN (NATURE)",
                en: "NATURE FACTION",
              },
              title: {
                vi: "Đội hình Hồi Phục & Triệu Hồi (Tidecaller, Monk, Pixie, Forest Maiden)",
                en: "Sustain & Summon Lineup (Tidecaller, Monk, Pixie, Forest Maiden)",
              },
              timing: {
                vi: "Ưu tiên 1: Ô số 1 & Ô số 3 ➔ Ưu tiên 2: Ô số 6 & Ô số 2",
                en: "Priority 1: Slot 1 & Slot 3 ➔ Priority 2: Slot 6 & Slot 2",
              },
              description: {
                vi: "**Ưu tiên số 1 (`Ô số 1` & `Ô số 3`):** Đẩy `Hero HP Rune` & `Soldier HP Rune` lên `Lv.5 ➔ Lv.8` để kéo dài giao tranh cho `Tidecaller` và `Forest Maiden` triệu hồi (kế thừa máu & quy mô lính).\n• **Ưu tiên số 2 (`Ô số 6` & `Ô số 2`):** Nâng tiếp `Queue Attack Rune` và `Hero Attack Rune`.",
                en: "**Priority 1 (`Slot 1` & `Slot 3`):** Push `Hero HP Rune` & `Soldier HP Rune` to `Lv.5 ➔ Lv.8` to extend combat for `Tidecaller` and `Forest Maiden` summons (inheriting host HP and troop capacity).\n• **Priority 2 (`Slot 6` & `Slot 2`):** Follow with `Queue Attack Rune` and `Hero Attack Rune`.",
              },
            },
          ],
        },
        {
          type: "checklist",
          checklistId: "runes-guide-weekly-audit-v2",
          title: {
            vi: "Danh Sách Kiểm Tra Kỷ Luật Cổ Ngữ Hàng Tuần (Weekly Rune Audit Checklist)",
            en: "Weekly Rune Discipline Audit Checklist",
          },
          description: {
            vi: "Hoàn thành đủ 4 bước kiểm tra dưới đây mỗi tuần để đảm bảo không thất thoát Bụi Cổ Ngữ và Rương Tự Chọn:",
            en: "Complete all 4 weekly audit checks below to ensure zero wasted Rune Dust or Choice Chests:",
          },
          items: [
            {
              id: "chk-rune-mine-harvest",
              label: {
                vi: "Thu hoạch Mỏ Cổ Ngữ (Rune Mine) mỗi 12–24 giờ & nâng cấp vào Thứ Hai Kỳ GAR/KvK",
                en: "Harvest Rune Mine every 12–24 hours & upgrade on GAR/KvK Monday",
              },
              detail: {
                vi: "Không để kho chứa `Rune Mine` bị đầy tràn và luôn nâng cấp Mỏ Cổ Ngữ bám sát cấp Lâu Đài trong **Ngày Xây dựng**.",
                en: "Prevent `Rune Mine` storage cap overflow and keep the building upgraded to your Castle cap on **Construction Day**.",
              },
              badge: {
                vi: "HÀNG NGÀY",
                en: "DAILY",
              },
            },
            {
              id: "chk-rune-choice-chest-lock",
              label: {
                vi: "Khóa chặt 100% Rương Cổ Ngữ Tự Chọn (Choice Rune Chests) chờ mốc Lv.4–Lv.5+",
                en: "Lock 100% of Rune Choice Chests until reaching the Lv.4–Lv.5+ bracket",
              },
              detail: {
                vi: "Chỉ mở Rương Ngẫu Nhiên lấy phôi nền; giữ nguyên Rương Tự Chọn làm mảnh ghép chốt hạ (`Finisher Piece`) cho các ô bị khuyết.",
                en: "Only open Random Rune Chests for base fodder; preserve Choice Chests as `Finisher Pieces` for missing slots.",
              },
              badge: {
                vi: "CẤM MỞ SỚM",
                en: "HOARD",
              },
            },
            {
              id: "chk-rune-even-lv5",
              label: {
                vi: "Nâng đồng đều cả 6 ô của Đội 1 lên Full Lv.4 ➔ Full Lv.5 trước khi ghép Lv.6",
                en: "Level all 6 Queue 1 slots evenly to Full Lv.4 ➔ Full Lv.5 before merging any Lv.6",
              },
              detail: {
                vi: "Đảm bảo kích hoạt trọn vẹn `+5%` HP/ATK Tướng và `+110` Tổng `March Size` với chi phí chỉ `48,000` Bụi Cổ Ngữ cho cả 6 ô.",
                en: "Secure the full `+5%` Hero HP/ATK and `+110` Total `March Size` breakpoint for just `48,000` total Rune Dust across all 6 slots.",
              },
              badge: {
                vi: "ĐIỂM GÃY LV.5",
                en: "LV.5 BREAKPOINT",
              },
            },
            {
              id: "chk-rune-tuesday-dump",
              label: {
                vi: "Chỉ xả Bụi Cổ Ngữ (DE-Dust / Magic Stones) & Arcane Crystal vào Thứ Ba Kỳ GAR/KvK hoặc Task Thi Đấu Hội",
                en: "Spend Rune Dust (DE-Dust / Magic Stones) & Arcane Crystals only on GAR/KvK Tuesday or Guild Race Task",
              },
              detail: {
                vi: "Xả đúng **Ngày 2 (Thứ Ba — Tech & Runes Day)** Kỳ GAR/KvK (`600` điểm / `2,000` Magic Stones; `1,200` điểm / 1 `Arcane Crystal`) hoặc sau khi nhận Nhiệm vụ Cổ Ngữ trong Kỳ Thi Đấu Hội.",
                en: "Dump exclusively on **Day 2 (Tuesday — Tech & Runes Day)** of GAR/KvK (`600` pts / `2,000` Magic Stones; `1,200` pts / 1 `Arcane Crystal`) or after claiming a Dedicated Rune Task in Guild Race.",
              },
              badge: {
                vi: "THỨ BA GAR/KVK",
                en: "GAR/KVK TUESDAY",
              },
            },
          ],
        },
      ],
    },
    {
      id: "sec-3-runes-common-pitfalls",
      title: {
        vi: "3. Những Cạm bẫy Phổ biến & Cách Phòng tránh (Common Pitfalls)",
        en: "3. Common Rune Management Pitfalls & Min-Max Solutions",
      },
      blocks: [
        {
          type: "callout",
          variant: "danger",
          title: {
            vi: "Cảnh Báo 3 Sai Lầm Chí Mạng Khiến Tài Khoản Thọt Lực Chiến & Điểm Sự Kiện Cổ Ngữ",
            en: "Warning: 3 Fatal Mistakes That Cripple Rune Progression & Event Scoring",
          },
          content: {
            vi: "**Tuyệt đối tránh 3 sai lầm phá hỏng tiến độ Cổ Ngữ dưới đây:**\n• **(1) Khui Rương Tự Chọn ở `Lv.1–Lv.3`:** Chỉ lấy vài điểm chỉ số phẳng vô nghĩa thay vì giữ chờ `Lv.4–Lv.5+` làm mảnh ghép chốt hạ (`Finisher Piece`).\n• **(2) Ghép dồn 1 viên `Lv.6` (`243` phôi, `25,000` Dust) hoặc `Lv.7` (`729` phôi, `75,000` Dust) sớm:** Bỏ lỡ mốc Full 6 ô `Lv.5` (`81` phôi/ô) làm mất `+10%` chỉ số và `+60–80` `March Size`.\n• **(3) Xả Bụi Cổ Ngữ (`DE-Dust` / `Magic Stones`) & `Arcane Crystal` ngày thường:** Luôn gom xả vào **Ngày 2 (Thứ Ba — Tech & Runes Day)** Kỳ GAR/KvK (`GAR`/`KvK`) hoặc Task Cổ Ngữ Hội!",
            en: "**Strictly avoid these 3 progression-ruining Rune mistakes:**\n• **(1) Opening `Rune Choice Chests` at `Lv.1–Lv.3`:** Wastes chests on minor flat stats instead of saving them until `Lv.4–Lv.5+` as `Finisher Pieces`.\n• **(2) Rushing a single `Lv.6` (`243` copies, `25,000` Dust) or `Lv.7` (`729` copies, `75,000` Dust) early:** Delays Full 6x `Lv.5` (`81` copies each), sacrificing `+10%` stats and `+60–80` `March Size`.\n• **(3) Spending Rune Dust (`DE-Dust` / `Magic Stones`) & `Arcane Crystal` on normal days:** Always hoard for **GAR/KvK Day 2 (Tuesday — Tech & Runes Day)** or Guild Race Dedicated Rune Tasks!",
          },
        },
        {
          type: "list",
          ordered: true,
          items: [
            {
              vi: "**Cạm bẫy #1 — Khui Rương Tự Chọn ở `Lv.1–Lv.3`:** Chỉ cộng vài điểm ATK/HP phẳng vô nghĩa; hãy khóa 100% Rương Tự Chọn chờ tầng `Lv.4–Lv.5+` làm mảnh ghép bù khuyết kích hoạt ngay `+5%` HP/ATK ở `Lv.5`.",
              en: "**Pitfall #1 — Opening Choice Chests at `Lv.1–Lv.3`:** Yields only minor flat stats; lock 100% of Choice Chests until `Lv.4–Lv.5+` to fill missing copies and immediately trigger `+5%` HP/ATK at `Lv.5`.",
            },
            {
              vi: "**Cạm bẫy #2 — Ghép dồn 1 viên `Lv.6–Lv.7` sớm:** 1 viên `Lv.6` tốn `243` phôi (`Lv.7` tốn `729` phôi); hãy nâng đồng đều Full 6x `Lv.5` (`48,000` Dust) ➔ 6x `Lv.6` (`150,000` Dust) ➔ 6x `Lv.8` (`1,350,000` Dust).",
              en: "**Pitfall #2 — Rushing one `Lv.6–Lv.7` rune early:** One `Lv.6` costs `243` copies (`Lv.7` costs `729`); level evenly: Full 6x `Lv.5` (`48,000` Dust) ➔ 6x `Lv.6` (`150,000` Dust) ➔ 6x `Lv.8` (`1,350,000` Dust).",
            },
            {
              vi: "**Cạm bẫy #3 — Chia phôi cho Đội 2–3 hoặc xả sai ngày:** Dồn 100% Cổ Ngữ cấp cao nhất cho Đội 1 và chỉ xả Bụi Cổ Ngữ / `Arcane Crystal` vào **Ngày 2 (Thứ Ba)** Kỳ GAR/KvK hoặc khi nhận Task Cổ Ngữ Hội.",
              en: "**Pitfall #3 — Splitting runes to Queues 2–3 or dumping off-schedule:** Funnel 100% of top runes into Queue 1 and spend Rune Dust / `Arcane Crystal` only on **GAR/KvK Day 2 (Tuesday)** or Guild Race Rune Tasks.",
            },
          ],
        },
      ],
    },
  ],
  proSections: [
    {
      id: "sec-4-lv1-to-lv12-stat-tables-and-event-dump",
      isPro: true,
      title: {
        vi: "4. Phân tích Định lượng & Điểm gãy: Bảng Thông Số Lv.1➔Lv.12 (Tab Runes), Toán Học Combat Skill Level & Lịch Xả Double-Dip",
        en: "4. Quantitative Analysis: Lv.1➔Lv.12 Master Stat Table (Tab Runes), Combat Skill Level Math & Double-Dip Schedule",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "**Bảng dữ liệu dưới đây trích xuất nguyên bản toàn bộ thông số của cả 6 vị trí Cổ Ngữ từ `TopHeroes Tables` (`Tab Runes`).**\n• **Quy hoạch ngân sách (`Lv.1 ➔ Lv.12`):** Đối chiếu chính xác lượng phôi và Bụi Cổ Ngữ từ Mid-game đến Endgame.\n• **Tối ưu điểm gãy:** Kết hợp phân tích toán học dòng hiếm `Combat Skill Level` `+1/+2` và ma trận điểm sự kiện.",
            en: "**The master table below extracts the complete quantitative stats across all 6 Rune slots from `TopHeroes Tables` (`Tab Runes`).**\n• **Budget Planning (`Lv.1 ➔ Lv.12`):** Accurately project rune fodder and Rune Dust allocation from Mid-game through Endgame.\n• **Breakpoint Optimization:** Paired with `Combat Skill Level` `+1/+2` math and event scoring matrices.",
          },
        },
      ],
      subSections: [
        {
          id: "sub-4-1-lv1-to-lv12-master-table",
          title: {
            vi: "4.1. Bảng Thông Số Đột Phá 6 Loại Cổ Ngữ Từ Lv.1 ➔ Lv.12 (Trích xuất TopHeroes Tables - Tab Runes)",
            en: "4.1. Complete 12-Level Master Stat Table Across All 6 Rune Slots (TopHeroes Tables - Tab Runes)",
          },
          blocks: [
            {
              type: "table",
              caption: {
                vi: "Bảng 3: Thông Số Đột Phá 6 Loại Cổ Ngữ Từ Lv.1 ➔ Lv.12 (Nguồn: TopHeroes Tables - Tab Runes)",
                en: "Table 3: Master Stat Progression Across All 6 Rune Slots from Lv.1 ➔ Lv.12 (Source: TopHeroes Tables - Tab Runes)",
              },
              headers: [
                {
                  vi: "Cấp (LVL)",
                  en: "Level (LVL)",
                },
                {
                  vi: "Hero HP Rune (Flat HP / % HP)",
                  en: "Hero HP Rune (Flat HP / % HP)",
                },
                {
                  vi: "Hero Attack Rune (Flat ATK / % ATK)",
                  en: "Hero Attack Rune (Flat ATK / % ATK)",
                },
                {
                  vi: "Soldier HP Rune (HP / March / % All)",
                  en: "Soldier HP Rune (HP / March / % All)",
                },
                {
                  vi: "Soldier Attack Rune (ATK / March / % All)",
                  en: "Soldier Attack Rune (ATK / March / % All)",
                },
                {
                  vi: "Relic Mastery Rune (Flat HP / % Relic HP)",
                  en: "Relic Mastery Rune (Flat HP / % Relic HP)",
                },
                {
                  vi: "Queue Attack Rune (Def / Def Break / March)",
                  en: "Queue Attack Rune (Def / Def Break / March)",
                },
              ],
              rows: [
                [
                  { vi: "Lv.1", en: "Lv.1" },
                  { vi: "650 / -", en: "650 / -" },
                  { vi: "16 / -", en: "16 / -" },
                  { vi: "2 / - / -", en: "2 / - / -" },
                  { vi: "2 / - / -", en: "2 / - / -" },
                  { vi: "850 / -", en: "850 / -" },
                  { vi: "600 / 769 / -", en: "600 / 769 / -" },
                ],
                [
                  { vi: "Lv.2", en: "Lv.2" },
                  { vi: "975 / -", en: "975 / -" },
                  { vi: "24 / -", en: "24 / -" },
                  { vi: "3 / - / -", en: "3 / - / -" },
                  { vi: "3 / - / -", en: "3 / - / -" },
                  { vi: "1,275 / -", en: "1,275 / -" },
                  { vi: "1,200 / 1,538 / -", en: "1,200 / 1,538 / -" },
                ],
                [
                  { vi: "Lv.3", en: "Lv.3" },
                  { vi: "2,193 / -", en: "2,193 / -" },
                  { vi: "54 / -", en: "54 / -" },
                  { vi: "5 / - / -", en: "5 / - / -" },
                  { vi: "5 / - / -", en: "5 / - / -" },
                  { vi: "2,040 / -", en: "2,040 / -" },
                  { vi: "1,800 / 2,307 / -", en: "1,800 / 2,307 / -" },
                ],
                [
                  { vi: "Lv.4", en: "Lv.4" },
                  { vi: "5,606 / -", en: "5,606 / -" },
                  { vi: "138 / -", en: "138 / -" },
                  { vi: "8 / - / -", en: "8 / - / -" },
                  { vi: "7 / - / -", en: "7 / - / -" },
                  { vi: "3,060 / -", en: "3,060 / -" },
                  { vi: "2,400 / 3,076 / -", en: "2,400 / 3,076 / -" },
                ],
                [
                  { vi: "Lv.5 ★", en: "Lv.5 ★" },
                  { vi: "15,091 / 5%", en: "15,091 / 5%" },
                  { vi: "371 / 5%", en: "371 / 5%" },
                  { vi: "11 / 30 / -", en: "11 / 30 / -" },
                  { vi: "9 / 30 / -", en: "9 / 30 / -" },
                  { vi: "4,950 / -", en: "4,950 / -" },
                  { vi: "3,000 / 3,845 / 50", en: "3,000 / 3,845 / 50" },
                ],
                [
                  { vi: "Lv.6 ★", en: "Lv.6 ★" },
                  { vi: "40,616 / 10%", en: "40,616 / 10%" },
                  { vi: "999 / 10%", en: "999 / 10%" },
                  { vi: "15 / 35 / -", en: "15 / 35 / -" },
                  { vi: "11 / 35 / -", en: "11 / 35 / -" },
                  { vi: "8,180 / -", en: "8,180 / -" },
                  { vi: "3,600 / 4,614 / 80", en: "3,600 / 4,614 / 80" },
                ],
                [
                  { vi: "Lv.7", en: "Lv.7" },
                  { vi: "88,792 / 15%", en: "88,792 / 15%" },
                  { vi: "2,183 / 15%", en: "2,183 / 15%" },
                  { vi: "25 / 42 / -", en: "25 / 42 / -" },
                  { vi: "13 / 42 / -", en: "13 / 42 / -" },
                  { vi: "17,580 / -", en: "17,580 / -" },
                  { vi: "4,200 / 5,383 / 116", en: "4,200 / 5,383 / 116" },
                ],
                [
                  { vi: "Lv.8 ★", en: "Lv.8 ★" },
                  { vi: "191,019 / 20%", en: "191,019 / 20%" },
                  { vi: "4,696 / 20%", en: "4,696 / 20%" },
                  { vi: "30 / 50 / 5%", en: "30 / 50 / 5%" },
                  { vi: "15 / 50 / 5%", en: "15 / 50 / 5%" },
                  { vi: "28,660 / 5%", en: "28,660 / 5%" },
                  { vi: "4,800 / 6,922 / 150", en: "4,800 / 6,922 / 150" },
                ],
                [
                  { vi: "Lv.9", en: "Lv.9" },
                  { vi: "312,456 / 25%", en: "312,456 / 25%" },
                  { vi: "7,681 / 25%", en: "7,681 / 25%" },
                  { vi: "45 / 60 / 10%", en: "45 / 60 / 10%" },
                  { vi: "18 / 60 / 10%", en: "18 / 60 / 10%" },
                  { vi: "46,880 / 10%", en: "46,880 / 10%" },
                  { vi: "5,400 / 8,461 / 180", en: "5,400 / 8,461 / 180" },
                ],
                [
                  { vi: "Lv.10", en: "Lv.10" },
                  { vi: "422,804 / 30%", en: "422,804 / 30%" },
                  { vi: "10,393 / 30%", en: "10,393 / 30%" },
                  { vi: "60 / 75 / 15%", en: "60 / 75 / 15%" },
                  { vi: "21 / 75 / 15%", en: "21 / 75 / 15%" },
                  { vi: "63,440 / 15%", en: "63,440 / 15%" },
                  { vi: "6,000 / 10,000 / 210", en: "6,000 / 10,000 / 210" },
                ],
                [
                  { vi: "Lv.11", en: "Lv.11" },
                  { vi: "561,993 / 35%", en: "561,993 / 35%" },
                  { vi: "13,814 / 35%", en: "13,814 / 35%" },
                  { vi: "75 / 85 / 20%", en: "75 / 85 / 20%" },
                  { vi: "23 / 85 / 20%", en: "23 / 85 / 20%" },
                  { vi: "84,330 / 20%", en: "84,330 / 20%" },
                  { vi: "6,600 / 12,000 / 230", en: "6,600 / 12,000 / 230" },
                ],
                [
                  { vi: "Lv.12", en: "Lv.12" },
                  { vi: "722,271 / 40%", en: "722,271 / 40%" },
                  { vi: "17,753 / 40%", en: "17,753 / 40%" },
                  { vi: "92 / 100 / 30%", en: "92 / 100 / 30%" },
                  { vi: "26 / 100 / 30%", en: "26 / 100 / 30%" },
                  { vi: "108,500 / 30%", en: "108,500 / 30%" },
                  { vi: "7,200 / 14,000 / 250", en: "7,200 / 14,000 / 250" },
                ],
              ],
            },
          ],
        },
        {
          id: "sub-4-2-double-dip-event-synchronization",
          title: {
            vi: "4.2. Lịch Xả Bụi Cổ Ngữ (DE-Dust / Magic Stones) & Arcane Crystal Chuẩn Ground-Truth",
            en: "4.2. Ground-Truth Event Scoring & Double-Dip Schedule for Rune Dust & Arcane Crystals",
          },
          blocks: [
            {
              type: "paragraph",
              text: {
                vi: "**Tuyệt đối tuân thủ ma trận điểm số từ `TopHeroes Tables` (`Tab KvK & GAR & TOP`):**\n• **Kỳ Đua Vũ Trang (`GAR` / `KvK`):** Tiêu thụ Bụi Cổ Ngữ (`DE-Dust` / `Rune Dust` / `Magic Stones`) và `Arcane Crystal` tính điểm duy nhất vào **Ngày 2 (Thứ Ba — Tech & Runes Day)**.\n• **Kỳ Thi Đấu Hội (`Guild Race`):** Chỉ tiêu thụ ngay sau khi đã nhận Nhiệm vụ Cổ Ngữ chuyên biệt (`Dedicated Rune Task`).",
                en: "**Strictly follow the scoring matrix from `TopHeroes Tables` (`Tab KvK & GAR & TOP`):**\n• **GAR / KvK:** Consuming Rune Dust (`DE-Dust` / `Magic Stones`) and `Arcane Crystal` scores points exclusively on **Day 2 (Tuesday — Tech & Runes Day)**.\n• **Guild Race:** Only spend immediately after claiming a `Dedicated Rune Task`.",
              },
            },
            {
              type: "table",
              caption: {
                vi: "Bảng 4: Ma Trận Điểm Sự Kiện & Cửa Sổ Xả Bụi Cổ Ngữ (DE-Dust) / Arcane Crystal",
                en: "Table 4: Event Scoring Matrix & Optimal Dump Windows for Rune Dust (DE-Dust) / Arcane Crystals",
              },
              headers: [
                {
                  vi: "Vật Phẩm Tiêu Thụ",
                  en: "Resource Consumed",
                },
                {
                  vi: "Điểm Trong GAR / KvK Ngày 2 (Thứ Ba — Tech & Runes Day)",
                  en: "Points in GAR / KvK Day 2 (Tuesday — Tech & Runes Day)",
                },
                {
                  vi: "Điểm Trong Kỳ Thi Đấu Hội (Guild Race)",
                  en: "Points in Guild Race",
                },
                {
                  vi: "Thời Điểm Xả Tối Ưu Nhất (Double-Dip Window)",
                  en: "Optimal Double-Dip Dump Window",
                },
              ],
              rows: [
                [
                  {
                    vi: "Tiêu thụ 2,000 Magic Stones / Rune Dust (DE-Dust) & Ghép Cổ Ngữ",
                    en: "Consume 2,000 Magic Stones / Rune Dust (DE-Dust) & Merge Runes",
                  },
                  {
                    vi: "600 điểm",
                    en: "600 points",
                  },
                  {
                    vi: "Tính điểm khi nhận Nhiệm vụ Cổ Ngữ chuyên biệt (Dedicated Rune Task)",
                    en: "Scores when claiming a Dedicated Rune Task on the Guild board",
                  },
                  {
                    vi: "Ngày 2 (Thứ Ba — Tech & Runes Day) của Kỳ Đua Vũ Trang (GAR / KvK), hoặc sau khi nhận Nhiệm vụ Cổ Ngữ trong Kỳ Thi Đấu Hội (Guild Race).",
                    en: "Day 2 (Tuesday — Tech & Runes Day) of GAR / KvK, or right after claiming a Dedicated Rune Task in Guild Race.",
                  },
                ],
                [
                  {
                    vi: "Tiêu thụ 1 Arcane Crystal (Tinh thể Bí thuật)",
                    en: "Consume 1 Arcane Crystal",
                  },
                  {
                    vi: "1,200 điểm",
                    en: "1,200 points",
                  },
                  {
                    vi: "Tính theo nhiệm vụ Hội / Sự kiện phụ tương ứng",
                    en: "Scores via matching Guild tasks / sub-events",
                  },
                  {
                    vi: "Ngày 2 (Thứ Ba — Tech & Runes Day) của Kỳ Đua Vũ Trang (GAR / KvK).",
                    en: "Day 2 (Tuesday — Tech & Runes Day) of GAR / KvK.",
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: "sec-5-castle27-32m-runes-audit-case-study",
      isPro: true,
      title: {
        vi: "5. Hồ Sơ Thực Chiến Nâng Cao: Tái Cấu Trúc Bảng Cổ Ngữ Lệch Cấp Cho Đội 1 Bộ Lạc Trong Ngày Thứ Ba Kỳ GAR/KvK (GAR Day 2)",
        en: "5. Advanced Tactical Case Study: Rebalancing a Lopsided Horde Queue 1 Rune Board on GAR/KvK Tuesday (GAR Day 2)",
      },
      blocks: [
        {
          type: "case_study",
          badge: {
            vi: "PHẪU THUẬT BẢNG CỔ NGỮ ĐỘI 1 BỘ LẠC",
            en: "HORDE QUEUE 1 RUNE BOARD AUDIT",
          },
          title: {
            vi: "Tái Cấu Trúc Từ 1 Viên Lv.6 Lệch Cấp Sang Đồng Bộ Full 6 Ô Lv.5 Trong Ngày Thứ Ba Kỳ GAR/KvK",
            en: "Restructuring From a Lopsided 1x Lv.6 Board to Full 6x Lv.5 Synergy on GAR/KvK Tuesday",
          },
          profileSummary: {
            vi: "**Tài khoản Mid-game (Lâu đài `Lv.27–28`, `3.2M–4.1M` Lực chiến Đội 1 Bộ Lạc) ghép dồn Ô số 1 (`Hero HP Rune`) lên `Lv.6`.**\n• **Hiện trạng lệch cấp:** 5 ô còn lại (`Hero Attack`, `Soldier HP`, `Soldier Attack`, `Relic Mastery`, `Queue Attack`) bị kẹt ở `Lv.3–Lv.4` (đã dùng `336` phôi Lv.1, `34,400` Dust).\n• **Tài nguyên tồn kho:** Đang giữ `18` Rương Cổ Ngữ Tự Chọn và `60,000–72,000` Bụi Cổ Ngữ (`Magic Stones`).",
            en: "**Mid-game account (Castle `Lv.27–28`, `3.2M–4.1M` Horde Queue 1 power) over-invested Slot 1 (`Hero HP Rune`) to `Lv.6`.**\n• **Lopsided state:** The remaining 5 slots (`Hero Attack`, `Soldier HP`, `Soldier Attack`, `Relic Mastery`, `Queue Attack`) sit stuck at `Lv.3–Lv.4` (`336` Lv.1 copies used, `34,400` Dust).\n• **Banked resources:** Inventory holds `18` Rune Choice Chests and `60,000–72,000` Rune Dust (`Magic Stones`).",
          },
          metrics: [
            {
              label: {
                vi: "Cấu trúc Bảng Khảm & Chi phí Bụi Cổ Ngữ",
                en: "Rune Board Layout & Dust Investment",
              },
              before: {
                vi: "1x Lv.6 + 5x Lv.3–Lv.4 (336 phôi Lv.1, 34,400 Dust)",
                en: "1x Lv.6 + 5x Lv.3–Lv.4 (336 Lv.1 copies, 34,400 Dust)",
              },
              after: {
                vi: "Đồng bộ Full 6x Lv.5 (+ 1 ô Lv.6 = 48,000+ Dust chuẩn mốc)",
                en: "Full 6x Lv.5 Synergy (+ 1x Lv.6 = 48,000+ Dust baseline)",
              },
              delta: {
                vi: "Mở khóa trọn vẹn mốc % & March Size trên cả 6 ô",
                en: "Unlocks percentage & March Size breakpoints across all 6 slots",
              },
            },
            {
              label: {
                vi: "Chỉ số Đột phá (% ATK/HP, March Size & Defense Break)",
                en: "Breakpoint Stats (% ATK/HP, March Size & Defense Break)",
              },
              before: {
                vi: "0% Hero ATK, +0 March Size, 2,307–3,076 Def Break",
                en: "0% Hero ATK, +0 March Size, 2,307–3,076 Def Break",
              },
              after: {
                vi: "+5% HP/ATK, +110 March Size (+660 lính), +3,845 Def Break",
                en: "+5% HP/ATK, +110 March Size (+660 troops), +3,845 Def Break",
              },
              delta: {
                vi: "+1,980,000 lực chiến thực tế trong giao tranh",
                en: "+1,980,000 effective combat power in PvP",
              },
            },
            {
              label: {
                vi: "Điểm Sự Kiện GAR / KvK Ngày 2 (Thứ Ba)",
                en: "GAR / KvK Day 2 (Tuesday) Event Score",
              },
              before: {
                vi: "0 điểm (do nâng lẻ tẻ ngày thường)",
                en: "0 points (wasted on off-event days)",
              },
              after: {
                vi: "18,000 – 21,600 điểm GAR Ngày 2 Thứ Ba",
                en: "18,000 – 21,600 GAR Tuesday Day 2 points",
              },
              delta: {
                vi: "Ăn trọn 9 rương mốc cá nhân Ngày 2 Kỳ GAR/KvK",
                en: "Clears all 9 personal milestone chests on GAR/KvK Day 2",
              },
            },
          ],
          diagnostics: [
            {
              vi: "**Lỗi dồn phôi lệch cấp (`Lopsided Synthesis`):** Đẩy Ô số 1 lên `Lv.6` ngốn `243` phôi Lv.1 và `25,000` Dust (lên `Lv.7` cần thêm `486` phôi Lv.1).\n• **Hậu quả thực chiến:** Ô số 2 (`Hero Attack`) và Ô số 6 (`Queue Attack`) kẹt ở `Lv.3–Lv.4`, làm đội Bộ Lạc mất trắng `+5%` Hero Attack, `+110` March Size và `3,845` Defense Break.",
              en: "**Lopsided Synthesis Error:** Pushing Slot 1 to `Lv.6` consumed `243` Lv.1 copies and `25,000` Dust (and `Lv.7` would require `486` more Lv.1 copies).\n• **Combat penalty:** Leaving Slot 2 (`Hero Attack`) and Slot 6 (`Queue Attack`) stuck at `Lv.3–Lv.4` cost the Horde lineup `+5%` Hero Attack, `+110` March Size, and `3,845` Defense Break.",
            },
            {
              vi: "**Kẹt phôi xác suất do chưa dùng `Finisher Piece`:** Mở Rương Ngẫu Nhiên bị lệch phôi giữa các ô.\n• **Giải pháp:** Cần bung đúng `18` Rương Cổ Ngữ Tự Chọn vào cửa sổ **Ngày 2 Thứ Ba Kỳ GAR/KvK** để chốt hạ đồng loạt các ô còn thiếu lên `Lv.5`.",
              en: "**RNG Bottleneck Without `Finisher Piece` Execution:** Random Chests produced uneven copies across slots.\n• **Solution:** Deploy the `18` hoarded Choice Chests during **GAR/KvK Tuesday (`GAR Day 2`)** to finish all remaining `Lv.5` slots simultaneously.",
            },
          ],
          recoverySteps: [
            {
              stepNumber: "1",
              title: {
                vi: "Đóng băng viên Lv.6 tại Ô số 1 (Hero HP Rune)",
                en: "Freeze Upgrades on the Lv.6 Slot 1 (Hero HP Rune)",
              },
              detail: {
                vi: "**Ngừng dồn thêm phôi vào Ô số 1 (`Hero HP Lv.6`):** Để lên `Lv.7` cần tới `729` tổng phôi Lv.1 (tăng thêm `486` phôi) và `75,000` Dust mà chỉ đổi lấy thêm `+5%` HP đơn lẻ.",
                en: "**Halt further investment into Slot 1 (`Hero HP Lv.6`):** Reaching `Lv.7` requires `729` total Lv.1 copies (`486` additional copies) and `75,000` Dust for just `+5%` HP on one slot.",
              },
              impactBadge: {
                vi: "TIẾT KIỆM 486 PHÔI LV.1",
                en: "SAVES 486 LV.1 COPIES",
              },
            },
            {
              stepNumber: "2",
              title: {
                vi: "Kiểm kê chính xác số phôi Lv.4 còn thiếu ở 5 ô còn lại",
                en: "Audit Exact Missing Lv.4 Copies Across the Remaining 5 Slots",
              },
              detail: {
                vi: "**Tính toán số phôi `Lv.4` còn thiếu:** Rà soát tại Ô số 6 (`Queue Attack`), Ô số 2 (`Hero Attack`), Ô số 3 (`Soldier HP`) và Ô số 4 (`Soldier Attack`) để đạt mốc `81` phôi Lv.1 quy đổi (`3 × Lv.4`) trên mỗi ô.",
                en: "**Calculate exact missing `Lv.4` copies:** Audit Slot 6 (`Queue Attack`), Slot 2 (`Hero Attack`), Slot 3 (`Soldier HP`), and Slot 4 (`Soldier Attack`) to reach `81` Lv.1 equivalent copies (`3 × Lv.4`) per slot.",
              },
              impactBadge: {
                vi: "KHỚP NỐI FINISHER PIECE",
                en: "FINISHER PIECE MATCH",
              },
            },
            {
              stepNumber: "3",
              title: {
                vi: "Bung Rương Tự Chọn & Xả Bụi Cổ Ngữ Trong Ngày 2 Thứ Ba Kỳ GAR/KvK (GAR Day 2)",
                en: "Open Choice Chests & Dump Rune Dust on GAR/KvK Tuesday (GAR Day 2)",
              },
              detail: {
                vi: "**Bung Rương Tự Chọn bù khuyết:** Mở vừa đủ số Rương Tự Chọn để bù chính xác các phôi thiếu và xả `60,000–72,000` Bụi Cổ Ngữ (`Magic Stones`) hợp thành đồng loạt cả 6 ô đạt tối thiểu Full `Lv.5`.\n• **Thành quả kép:** Mở khóa `+5%` HP/ATK, `+110` March Size, `+3,845` Def Break (`+1,980,000` lực chiến thực) và thu về `18,000–21,600` điểm GAR Ngày 2.",
                en: "**Open Choice Chests to finish slots:** Open the exact number of Choice Chests needed and spend `60,000–72,000` Rune Dust (`Magic Stones`) to bring all 6 slots to at least Full `Lv.5`.\n• **Double payoff:** Unlocks `+5%` HP/ATK, `+110` March Size, `+3,845` Def Break (`+1,980,000` real power) and nets `18,000–21,600` GAR Tuesday Day 2 points.",
              },
              impactBadge: {
                vi: "+110 MARCH SIZE & +21,600 ĐIỂM GAR",
                en: "+110 MARCH SIZE & +21,600 GAR PTS",
              },
            },
          ],
          conclusion: {
            vi: "**Chỉ với 1 phiên tái cấu trúc vào Ngày 2 (Thứ Ba) Kỳ GAR/KvK:** Đội hình Bộ Lạc tăng thêm `660` tổng quân lính ra trận (`+110` March Size × 6 tướng) và đục thủng các đội hình Liên Minh cao hơn `300K` lực chiến hiển thị.",
            en: "**In a single GAR/KvK Tuesday restructuring session:** The Horde queue gains `660` total deployed troops (`+110` March Size × 6 heroes) and reliably punches through League lineups `300K` higher in displayed power.",
          },
        },
        {
          type: "media_spotlight",
          mediaCode: "MED-6.1-04",
          tier: "tier4_youtube_ref",
          title: {
            vi: "Video Tham Chiếu Quốc Tế: Phân Tích Cổ Ngữ Lv.1–12, Rương Tự Chọn & Toán Học Combat Skill Level",
            en: "International Reference Video: Complete Runes Guide Lv.1–12, Choice Chests & Combat Skill Level Breakdown",
          },
          description: {
            vi: "Video hướng dẫn chuyên sâu phân tích bảng ghép phôi Cổ Ngữ Lv.1–Lv.12, tối ưu hóa Mỏ Cổ Ngữ (Rune Mine), kỷ luật giữ Rương Tự Chọn và giá trị thực chiến của dòng chỉ số Combat Skill Level +1/+2.",
            en: "In-depth video guide covering Lv.1–Lv.12 Rune synthesis tables, Rune Mine optimization, Choice Chest hoarding discipline, and the combat math behind Combat Skill Level +1/+2.",
          },
          videoChannel: "@T.H.S.G-Official",
          videoTitle: "Top Heroes: Complete Runes Guide Lv.1-12 & Combat Skill Level Breakdown",
          videoTimestamp: "02:30 – 07:15",
          videoUrl: "https://www.youtube.com/results?search_query=Top+Heroes+Runes+Guide+Combat+Skill+Level",
        },
      ],
    },
  ],
};

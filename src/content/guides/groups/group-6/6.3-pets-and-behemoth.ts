import type { GuideArticle } from "../../types";

export const ARTICLE_6_3_PETS_AND_BEHEMOTH: GuideArticle = {
  code: "6.3",
  slug: "pets-and-behemoth",
  categorySlug: "power-systems",
  badge: "PRO",
  readingMinutes: 12,
  title: {
    vi: "Cẩm Nang Thú Cưng & Cự Thú (Pets & Behemoth): Chọn Pet 3 Phe & Bảng Chi Phí Lv.1–120",
    en: "Pets & Behemoth Master Guide: 3-Faction Companions & Lv.1–120 Progression Tables",
  },
  summary: {
    vi: "Hướng dẫn toàn diện về Thú Cưng (Pets — Season 1) và Cự Thú Bang Hội / Hộ Vệ (Behemoth — Season 3): công thức chuyển đổi 36%➔104%, hệ số nhân 3 lần theo Hệ (3x Faction Bonus), chọn Pet chủ lực cho cả 3 Phe (Eggy/Sparrow, Tiggy/Howli/Flickerkit, Cactini/Bear/Candy Boo), bảng 19 mốc tiến hóa Pet Lv.1➔Mythic Lv.120 (Tab Pets), bảng 14 mốc Behemoth Lv.1➔Lv.150 (Tab Behemoth) và lịch xả Thứ Sáu Tuần B.",
    en: "Complete guide to Pets (Season 1) and Behemoths (Season 3): 36%➔104% stat conversion formula, 3x Faction Multiplier, selecting main Pets across all 3 Factions (Eggy/Sparrow, Tiggy/Howli/Flickerkit, Cactini/Bear/Candy Boo), 19-milestone Pet Lv.1➔Mythic Lv.120 tables (Tab Pets), 14-milestone Behemoth Lv.1➔Lv.150 tables (Tab Behemoth), and Friday Week B dumping.",
  },
  tldr: {
    coreRule: {
      vi: "**Hệ Số Nhân `3x` Theo Hệ Phái (`Faction Bonus = 3 × Universal Bonus`):**\n• Thú Cưng chuyên biệt theo Hệ (`Rare Faction Pets` tiến hóa lên `Epic Lv.45` ➔ `Legendary Lv.75` ➔ `Mythic Lv.101–120`) cộng ATK/HP cho Hệ tương ứng cao gấp **3 lần** chỉ số chung.\n• Chọn Pet khớp hệ Đội 1: **Liên Minh** nuôi `Eggy` / `Sparrow`; **Bộ Lạc** nuôi `Tiggy` / `Howli` / `Flickerkit` (Pet Đỏ S2+); **Thiên Nhiên** nuôi `Cactini` / `Bear` / `Candy Boo` (Pet Đỏ S2+).",
      en: "**The `3x` Faction Multiplier (`Faction Bonus = 3 × Universal Bonus`):**\n• Faction-specific Pets (`Rare Faction Pets` evolving into `Epic Lv.45` ➔ `Legendary Lv.75` ➔ `Mythic Lv.101–120`) grant **3x higher** Hero ATK/HP to their matching faction compared to universal buffs.\n• Always match your Queue 1 faction: **League** raises `Eggy` / `Sparrow`; **Horde** raises `Tiggy` / `Howli` / `Flickerkit` (S2+ Mythic); **Nature** raises `Cactini` / `Bear` / `Candy Boo` (S2+ Mythic).",
    },
    immediateAction: {
      vi: "**Ấp Trứng 24/7, Khóa Cứng Phôi `Same Pet` & Chạm Mốc Điểm Gãy `Lv.90` / `Lv.120`:**\n• Ấp trứng liên tục 24/7, phóng sinh (`Release`) Pet Lục (`Uncommon`) dư thừa lấy `Pet Food`, nhưng **KHÓA CHẶT 100%** bản sao cùng tên (`Same Pet`) của Pet chủ lực.\n• Mốc chuẩn `Lv.90` (`Legendary +3`) cần `596,600` Thức Ăn Pet, `0` Essence và `44` Same + `161` Any (so với Uncommon tốn `596,850` Food + `3,525` Essence).\n• Lên `Mythic Lv.120` cần `714,000` Thức Ăn Pet + `40,050` Pet Essence + `58` Same + `211` Any.",
      en: "**Incubate 24/7, Lock `Same Pet` Copies & Push `Lv.90` / `Lv.120` Breakpoints:**\n• Keep egg incubators running 24/7, release surplus `Uncommon` pets for `Pet Food`, and **LOCK 100%** of identical copies (`Same Pet`) of your main faction Pet.\n• Reaching `Lv.90` (`Legendary +3`) requires `596,600` cumulative Pet Food, `0` Essence, and `44` Same + `161` Any copies (whereas Uncommon costs `596,850` Food + `3,525` Essence).\n• Max `Mythic Lv.120` requires `714,000` Pet Food + `40,050` Pet Essence + `58` Same + `211` Any.",
    },
    strictTaboo: {
      vi: "**Cấm Nuôi Nhầm `Cactini` Cho Bộ Lạc & Cấm Xả Lẻ Ngày Thường:**\n• Tuyệt đối **KHÔNG** nuôi nhầm `Cactini` cho đội Bộ Lạc (vì Cactini thuộc hệ Thiên Nhiên Nature!) và **CẤM** cho Pet ăn lẻ tẻ vào ngày thường.\n• Giữ toàn bộ `Pet Food`, `Pet Essence` và phôi tiến hóa chờ **Sự kiện Pets Development** (Thứ Hai – Thứ Ba Tuần A) hoặc **Thứ Sáu của Tuần B** (`GAR Day 5` / `KvK Stage 5–6` / `Top Lord Stage 5`).\n• Điểm sự kiện: nhận `960` điểm / `100` Pet Food, `480` điểm / `1` Pet Essence và `6,000` – `36,000` điểm mỗi lần tiến hóa.",
      en: "**Never Raise `Cactini` for Horde & Never Feed Pets on Non-Scoring Days:**\n• **NEVER** mistakenly raise `Cactini` for a Horde lineup (Cactini is a Nature pet!) and **NEVER** feed Pets randomly on weekdays.\n• Hoard 100% of your `Pet Food`, `Pet Essence`, and promotion fodder for **Pets Development** (Monday – Tuesday Week A) or **Friday of Week B** (`GAR Day 5` / `KvK Stage 5–6` / `Top Lord Stage 5`).\n• Event scoring: nets `960` pts per `100` Pet Food, `480` pts per `1` Pet Essence, and `6,000` – `36,000` pts per promotion.",
    },
  },
  keyTakeaways: [
    {
      vi: "**Công Thức Chuyển Đổi (`36.00%` ➔ `104.00%`) & Điểm Gãy `3x Faction Bonus`:**\n• Tỷ lệ chuyển đổi tăng từ `36.00%` ở Lv.1 ➔ `60.00%` ở Lv.45 Epic ➔ `84.00%` ở Lv.75 Legendary ➔ `96.00%` ở Lv.90 ➔ `104.00%` ở Lv.100–120.\n• Điểm gãy Mid-game: `Lv.45 Epic` (`98,550` Pet Food, `1 same + 5 any`, `+35.70%` ATK / `+52.50%` HP) và `Lv.75 Legendary` (`368,600` Pet Food, `5 same + 15 any`, `+66.30%` ATK / `+97.50%` HP).\n• Mốc `Lv.90 Legendary +3`: cần `596,600` Pet Food, `0` Essence, `44` Same + `161` Any (`+81.60%` ATK / `+120.00%` HP).\n• Kịch trần `Mythic Lv.120`: cần `714,000` Pet Food + `40,050` Essence + `58` Same + `211` Any (`+91.80%+` ATK / `+135.00%+` HP).",
      en: "**Pet Stat Conversion Formula (`36.00%` ➔ `104.00%`) & `3x` Faction Breakpoints:**\n• Conversion scales from `36.00%` at Lv.1 ➔ `60.00%` at Lv.45 Epic ➔ `84.00%` at Lv.75 Legendary ➔ `96.00%` at Lv.90 ➔ `104.00%` at Lv.100–120.\n• Mid-game milestones: `Lv.45 Epic` (`98,550` Pet Food, `1 same + 5 any`, `+35.70%` ATK / `+52.50%` HP) and `Lv.75 Legendary` (`368,600` Pet Food, `5 same + 15 any`, `+66.30%` ATK / `+97.50%` HP).\n• `Lv.90 Legendary +3` milestone: requires `596,600` Pet Food, `0` Essence, `44` Same + `161` Any (`+81.60%` ATK / `+120.00%` HP).\n• Max `Mythic Lv.120`: requires `714,000` Pet Food + `40,050` Essence + `58` Same + `211` Any (`+91.80%+` ATK / `+135.00%+` HP).",
    },
    {
      vi: "**Hệ Thống Cự Thú (`Behemoth Lv.1 ➔ Lv.150` — Season 3, Tab Behemoth):**\n• Thu thập `Magicite`, `Magic Core` & `Covenant Seals` từ `Mine Vein Battle` & `Frostfield Battle`; mở **Hero Level Cap** mỗi 20 cấp: `Lv.20` (`1★` = `+1` Cấp, `5,880` Magicite, `1,500` Core, `750` Ấn).\n• Các mốc Sao tiếp theo: `Lv.40` (`2★` = `+2` Cấp, `3,500` Ấn), `Lv.60` (`3★` = `+3` Cấp, `6,080` Ấn, `175.00%` Conversion), `Lv.80` (`4★` = `+4`), `Lv.100` (`5★` = `+5`, tổng `6,346` Ấn).\n• Kịch trần `Lv.150` (`+9` Cấp Tướng) tốn tổng `4,648,680` Magicite + `69,000` Magic Core + `6,346` Ấn Giao Ước, cộng `210.00%` ATK / `630.00%` HP / `15.00%` DR.",
      en: "**Behemoth System (`Lv.1 ➔ Lv.150` — Season 3, Tab Behemoth):**\n• Farm `Magicite`, `Magic Core` & `Covenant Seals` (`Mine Vein` & `Frostfield`); expands **Hero Level Cap** every 20 levels: `Lv.20` (`1★` = `+1` Cap, `5,880` Magicite, `1,500` Core, `750` Seals).\n• Next Star gates: `Lv.40` (`2★` = `+2` Cap, `3,500` Seals), `Lv.60` (`3★` = `+3` Cap, `6,080` Seals, `175.00%` Conversion), `Lv.80` (`4★` = `+4`), `Lv.100` (`5★` = `+5`, `6,346` total Seals).\n• Max Cap `Lv.150` (`+9` Hero Levels) requires `4,648,680` Magicite + `69,000` Magic Core + `6,346` Covenant Seals, granting `210.00%` ATK / `630.00%` HP / `15.00%` DR.",
    },
    {
      vi: "**Lịch Xả Chuẩn Double-Dip Cho Pet & Behemoth:**\n• **Xả Pet (Tuần B):** Xả `Pet Food` (`960` điểm / `100` Food), `Pet Essence` (`480` điểm / `1` Essence) & Tiến hóa (`6,000`–`36,000`đ) vào **Thứ Sáu Tuần B** (`GAR Day 5` / `KvK Stage 5–6` / `Top Lord Stage 5`).\n• **Xả Pet (Tuần A):** Hoặc xả tại sự kiện phụ `Pets Development` vào **Thứ Hai – Thứ Ba Tuần A**.\n• **Xả Behemoth:** Bung nguyên liệu Cự Thú vào **Thứ Ba / Thứ Tư / Thứ Bảy Tuần B** (`400` điểm / `400` Magicite, `40` điểm / `1` Magic Core, `2,000` điểm / `1` Covenant Seal).",
      en: "**Double-Dip Event Schedule for Pets & Behemoth:**\n• **Pet Dump (Week B):** Spend `Pet Food` (`960` pts / `100` Food), `Pet Essence` (`480` pts / `1` Essence) & Promotions (`6,000`–`36,000` pts) on **Friday Week B** (`GAR Day 5` / `KvK Stage 5–6` / `Top Lord Stage 5`).\n• **Pet Dump (Week A):** Alternatively spend during the `Pets Development` sub-event on **Mon–Tue Week A**.\n• **Behemoth Dump:** Spend Behemoth materials on **Tuesday / Wednesday / Saturday of Week B** (`400` pts / `400` Magicite, `40` pts / `1` Magic Core, `2,000` pts / `1` Covenant Seal).",
    },
  ],
  keywords: [
    "thú cưng",
    "thu cung",
    "pets",
    "pet food",
    "pet essence",
    "thức ăn pet",
    "cự thú",
    "cu thu",
    "behemoth",
    "eggy",
    "sparrow",
    "tiggy",
    "howli",
    "flickerkit",
    "cactini",
    "bear",
    "candy boo",
    "magicite",
    "đá ma tinh",
    "magic core",
    "lõi ma thuật",
    "covenant seals",
    "ấn giao ước",
    "hero level cap",
    "mine vein battle",
    "frostfield battle",
  ],
  sourceFiles: [
    "docs/06-game-guides/07-standardized-web-guides/group-6-runes-relics-pets/6.3-pets-and-behemoth.md",
    "docs/06-game-guides/07-standardized-web-guides/group-8-infrastructure/8.4-master-data-tables.md",
  ],
  freeSections: [
    {
      id: "sec-1-pets-and-behemoth-core-mechanics",
      title: {
        vi: "1. Giải thích Cơ chế Cốt lõi: Công Thức Chuyển Đổi Pet (36% ➔ 104%), Nhân 3 Hệ Phái (3x) & Cự Thú (Behemoth Season 3)",
        en: "1. Core Mechanics: Pet Stat Conversion (36% ➔ 104%), 3x Faction Multiplier & Season 3 Behemoth System",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "• **Thú Cưng (`Pets` — Season 1):** Xuất hiện như một đơn vị thứ 7 bất tử đi cùng đội hình, chuyển đổi trực tiếp chỉ số từ 6 tướng ra trận.\n• **Cự Thú (`Behemoth` — Season 3):** Mở khóa nguồn chỉ số phần trăm (`% Hero ATK/HP`), Giảm Sát Thương (`Damage Reduction %`) và giới hạn cấp độ tướng (**Hero Level Cap `+1 ➔ +9`**) lớn nhất trò chơi.",
            en: "• **Pets (Season 1):** Deploy as an immortal 7th combat unit alongside your lineup, converting stats directly from your 6 active heroes.\n• **Behemoth (Season 3):** Unlocks the largest source of percentage `Hero ATK/HP`, `Damage Reduction %`, and **Hero Level Cap expansion (`+1 ➔ +9`)** in the game.",
          },
        },
      ],
      subSections: [
        {
          id: "sub-1-1-pets-conversion-and-3x-faction-bonus",
          title: {
            vi: "1.1. Công Thức Chuyển Đổi Chỉ Số Trực Chiến (36.00% ➔ 104.00%), Hệ Số Nhân 3 Lần Theo Hệ (3x Faction Bonus) & Quy Tắc Giữ Phôi",
            en: "1.1. Pet Stat Conversion Formula (36.00% ➔ 104.00%), 3x Faction Multiplier & Fodder Retention Rules",
          },
          badge: {
            vi: "SEASON 1 • TAB PETS",
            en: "SEASON 1 • TAB PETS",
          },
          blocks: [
            {
              type: "media_spotlight",
              mediaCode: "MED-6.3-01",
              tier: "tier2_annotated_ui",
              title: {
                vi: "Giao Diện Tiến Hóa 8 Thú Cưng Chủ Lực 3 Phe & Hệ Số Nhân 3x Theo Hệ Phái (MED-6.3-01)",
                en: "8 Main Faction Pets Promotion Interface & 3x Faction Bonus Breakdown (MED-6.3-01)",
              },
              description: {
                vi: "Sơ đồ trực quan hóa 8 Thú Cưng chủ lực chia theo 3 Phe (Liên Minh: Eggy, Sparrow; Bộ Lạc: Tiggy, Howli, Flickerkit; Thiên Nhiên: Cactini, Bear, Candy Boo), công thức chuyển đổi chỉ số trực chiến (36.00% ➔ 104.00%) và mốc khóa phôi Same vs Any.",
                en: "Annotated breakdown of the 8 main faction Pets across 3 Factions (League: Eggy, Sparrow; Horde: Tiggy, Howli, Flickerkit; Nature: Cactini, Bear, Candy Boo), the combat stat conversion formula (36.00% ➔ 104.00%), and Same vs. Any fodder lock rules.",
              },
              annotations: [
                {
                  kind: "do",
                  label: {
                    vi: "Chọn Đúng 8 Pet Hệ Phái Chủ Lực Nhận 3x Faction Bonus",
                    en: "Select the 8 Main Faction Pets for the 3x Faction Bonus",
                  },
                  detail: {
                    vi: "Liên Minh (League) nuôi Eggy / Sparrow; Bộ Lạc (Horde) nuôi Tiggy / Howli / Flickerkit; Thiên Nhiên (Nature) nuôi Cactini / Bear / Candy Boo. Khóa chặt 100% bản sao cùng tên (cần 1 same + 5 any ở Lv.45 Epic, tích lũy 44 Same + 161 Any đến Lv.90 và 58 Same + 211 Any đến Mythic Lv.120).",
                    en: "League raises Eggy / Sparrow; Horde raises Tiggy / Howli / Flickerkit; Nature raises Cactini / Bear / Candy Boo. Lock 100% of identical Same copies (requires 1 same + 5 any at Lv.45 Epic, cumulative 44 Same + 161 Any by Lv.90, and 58 Same + 211 Any by Mythic Lv.120).",
                  },
                },
                {
                  kind: "info",
                  label: {
                    vi: "Tỷ Lệ Chuyển Đổi Chỉ Số (36.00% ➔ 104.00%)",
                    en: "Pet Stat Conversion Rate (36.00% ➔ 104.00%)",
                  },
                  detail: {
                    vi: "Pet ATK/HP = (Tổng ATK/HP của 6 tướng trong đội ÷ 6) × Tỷ lệ Chuyển đổi (tăng từ 36.00% ở Lv.1 ➔ 60.00% ở Lv.45 Epic ➔ 84.00% ở Lv.75 Legendary ➔ 96.00% ở Lv.90 ➔ 104.00% ở Lv.100–120).",
                    en: "Pet ATK/HP = (Total ATK/HP of 6 lineup heroes ÷ 6) × Pet Conversion Rate (scaling from 36.00% at Lv.1 ➔ 60.00% at Lv.45 Epic ➔ 84.00% at Lv.75 Legendary ➔ 96.00% at Lv.90 ➔ 104.00% at Lv.100–120).",
                  },
                },
                {
                  kind: "dont",
                  label: {
                    vi: "Cảnh Báo: Cactini Thuộc Hệ Thiên Nhiên & Bẫy Pet Uncommon",
                    en: "Warning: Cactini is a Nature Pet & Uncommon Base Pet Trap",
                  },
                  detail: {
                    vi: "Cactini (Xương Rồng Nhỏ) thuộc hệ Thiên Nhiên (Nature), tuyệt đối KHÔNG nuôi cho đội Bộ Lạc! Đồng thời không nâng Uncommon Base Pet lên cấp cao vì Lv.90 tốn 596,850 Pet Food + 3,525 Essence (trần chỉ 7.50% ATK/HP), trong khi Rare Faction Pet lên Lv.90 chỉ tốn 596,600 Pet Food + 0 Essence.",
                    en: "Cactini belongs to the Nature faction — never raise Cactini for a Horde lineup! Also avoid pushing Uncommon Base Pets to high levels: reaching Lv.90 wastes 596,850 Pet Food + 3,525 Essence (capped at 7.50% ATK/HP), whereas a Rare Faction Pet reaches Lv.90 for 596,600 Pet Food + 0 Essence.",
                  },
                },
              ],
            },
            {
              type: "paragraph",
              text: {
                vi: "• **Đơn vị thứ 7 bất tử (Tab Pets):** Pet chỉ ngưng hoạt động khi cả 6 tướng ngã xuống; công thức chỉ số trực chiến là `Pet Attack/HP = (Tổng Hero Attack/HP của 6 tướng ÷ 6) × Pet Conversion Rate %`.\n• **Các mốc Conversion Rate:** Khởi đầu ở `36.00%` (Lv.1 Rare), tăng lên `60.00%` ở `Lv.45` (Epic), `84.00%` ở `Lv.75` (Legendary), `96.00%` ở `Lv.90` (Legendary +3) và đạt `104.00%` ở `Lv.100–120` (Mythic).\n• **Kỷ luật Chuồng Thú:** Ấp trứng 24/7, chỉ phóng sinh (`Release`) Pet Lục (`Uncommon`) dư thừa lấy `Pet Food`, và tuyệt đối giữ lại toàn bộ Pet Xanh Lam (`Rare`) & Tím (`Epic`).",
                en: "• **Immortal 7th Combat Unit (Tab Pets):** Your Pet fights until all 6 heroes fall; combat stats follow `Pet Attack/HP = (Total Hero Attack/HP of 6 heroes ÷ 6) × Pet Conversion Rate %`.\n• **Conversion Rate Milestones:** Starts at `36.00%` (Lv.1 Rare), jumps to `60.00%` (`Lv.45` Epic), `84.00%` (`Lv.75` Leg), `96.00%` (`Lv.90` Leg +3), and peaks at `104.00%` (`Lv.100–120` Mythic).\n• **Kennel Discipline:** Run incubators 24/7, release surplus `Uncommon` pets after unlocking collection bonds for `Pet Food`, and never release `Rare` or `Epic` pets.",
              },
            },
            {
              type: "callout",
              variant: "rule",
              title: {
                vi: "Quy Luật Toán Học: Hệ Số Nhân 3 Lần Theo Hệ (Faction Bonus = 3 × Universal Bonus)",
                en: "Mathematical Law: The 3x Faction Multiplier (Faction Bonus = 3 × Universal Bonus)",
              },
              content: {
                vi: "• **Bẫy Uncommon Base Pets:** Trần chỉ số chỉ đạt `7.50%` All Hero ATK/HP ở Lv.60 nhưng lên `Lv.90` lại ngốn tới `596,850` Thức Ăn Pet + `3,525` Pet Essence.\n• **Ưu thế Rare Faction Pets (`3x Faction Bonus`):** Nhân gấp 3 chỉ số hệ — `Lv.45` (`98,550` Pet Food, `1 same + 5 any`) cộng `11.90%`/`17.50%` chung nhưng cộng tới `+35.70%` Hero ATK / `+52.50%` Hero HP hệ.\n• **Mốc `Lv.75` & `Lv.90`:** `Lv.75` (`368,600` Food, `5 same + 15 any`) đạt `+66.30%` ATK / `+97.50%` HP; `Lv.90` (`596,600` Food, `0` Essence, `44` Same + `161` Any) đạt `+81.60%` ATK / `+120.00%` HP.\n• **Kịch trần `Mythic Lv.120`:** Cần `714,000` Pet Food + `40,050` Essence + `58` Same + `211` Any, đẩy chỉ số hệ lên `+91.80%` ATK / `+135.00%` HP!",
                en: "• **Uncommon Base Pet Trap:** Caps at a meager `7.50%` All Hero ATK/HP at Lv.60 yet consumes `596,850` Pet Food + `3,525` Pet Essence by `Lv.90`.\n• **Rare Faction Pet Advantage (`3x Faction Bonus`):** Triples faction buffs — at `Lv.45` (`98,550` Pet Food, `1 same + 5 any`) it grants `11.90%`/`17.50%` universally but `+35.70%` ATK / `+52.50%` HP to its faction.\n• **`Lv.75` & `Lv.90` Milestones:** `Lv.75` (`368,600` Food, `5 same + 15 any`) grants `+66.30%` ATK / `+97.50%` HP; `Lv.90` (`596,600` Food, `0` Essence, `44` Same + `161` Any) surges to `+81.60%` ATK / `+120.00%` HP.\n• **Max `Mythic Lv.120`:** Requires `714,000` Pet Food + `40,050` Essence + `58` Same + `211` Any, reaching `+91.80%` ATK / `+135.00%` HP!",
              },
            },
          ],
        },
        {
          id: "sub-1-2-behemoth-season3-and-hero-level-cap",
          title: {
            vi: "1.2. Hệ Thống Cự Thú (Behemoth — Season 3) & Đột Phá Trần Cấp Độ Tướng (+1 ➔ +9 Hero Level Cap)",
            en: "1.2. Season 3 Behemoth System & Hero Level Cap Breakthroughs (+1 ➔ +9 Hero Level Cap)",
          },
          badge: {
            vi: "SEASON 3 • TAB BEHEMOTH",
            en: "SEASON 3 • TAB BEHEMOTH",
          },
          blocks: [
            {
              type: "media_spotlight",
              mediaCode: "MED-6.3-02",
              tier: "tier2_annotated_ui",
              title: {
                vi: "Hang Động Cự Thú Season 3: Đá Ma Tinh, Lõi Ma Thuật, Ấn Giao Ước & Trần Cấp Tướng +1 ➔ +9 (MED-6.3-02)",
                en: "Season 3 Behemoth Den: Magicite, Magic Core, Covenant Seals & +1 ➔ +9 Hero Level Cap (MED-6.3-02)",
              },
              description: {
                vi: "Giải phẫu 3 tầng sức mạnh của Cự Thú (Behemoth) mở khóa ở Season 3: nguồn thu hoạch nguyên liệu từ Chiến trường Mỏ Khoáng (Mine Vein Battle) & Chiến trường Băng Giá (Frostfield Battle), cùng lộ trình mở rộng Hero Level Cap mỗi 20 cấp.",
                en: "Anatomy of the 3 Behemoth power layers unlocking in Season 3: farming materials from Mine Vein Battle & Frostfield Battle, plus the Hero Level Cap expansion unlocked every 20 levels.",
              },
              annotations: [
                {
                  kind: "do",
                  label: {
                    vi: "Đột Phá Sao Mỗi 20 Cấp Mở Rộng +1 ➔ +9 Hero Level Cap",
                    en: "Break Through Stars Every 20 Levels for +1 ➔ +9 Hero Level Cap",
                  },
                  detail: {
                    vi: "Dùng Đá Ma Tinh (Magicite) và Lõi Ma Thuật (Magic Core) nâng Cự Thú chạm các mốc chẵn: Lv.20 (1★ = +1 Cấp Tướng), Lv.40 (2★ = +2 Cấp Tướng), Lv.60 (3★ = +3 Cấp Tướng), Lv.80 (4★ = +4 Cấp Tướng), Lv.100 (5★ = +5 Cấp Tướng) và kịch trần Lv.150 (+9 Cấp Tướng).",
                    en: "Spend Magicite and Magic Core to hit 20-level star breakpoints: Lv.20 (1★ = +1 Hero Level Cap), Lv.40 (2★ = +2), Lv.60 (3★ = +3), Lv.80 (4★ = +4), Lv.100 (5★ = +5), up to Max Lv.150 (+9 Hero Level Cap).",
                  },
                },
                {
                  kind: "info",
                  label: {
                    vi: "Tích Lũy 6,346 Ấn Giao Ước (Covenant Seals) Từ Mine Vein & Frostfield",
                    en: "Accumulate 6,346 Covenant Seals from Mine Vein & Frostfield Battles",
                  },
                  detail: {
                    vi: "Tham gia đầy đủ Mine Vein Battle và Frostfield Battle hàng tuần để gom đủ 6,346 Ấn Giao Ước (Covenant Seals) từ Lv.1 ➔ Lv.100 (750 Ấn ở Lv.20, 3,500 Ấn ở Lv.40, 6,080 Ấn ở Lv.60), mở khóa tới 15.00% Giảm Sát Thương (Hero Damage Reduction).",
                    en: "Participate weekly in Mine Vein Battle and Frostfield Battle to collect all 6,346 Covenant Seals from Lv.1 ➔ Lv.100 (750 Seals at Lv.20, 3,500 at Lv.40, 6,080 at Lv.60), unlocking up to 15.00% Hero Damage Reduction.",
                  },
                },
                {
                  kind: "dont",
                  label: {
                    vi: "Không Đốt Sạch Magicite Mà Bỏ Quên Magic Core & Covenant Seals",
                    en: "Never Burn Only Magicite While Neglecting Magic Core & Covenant Seals",
                  },
                  detail: {
                    vi: "Nếu chỉ đập Đá Ma Tinh (Magicite) mà thiếu Lõi Ma Thuật (1,500 Magic Core ở Lv.20; tổng 69,000 Magic Core ở Lv.150) và Ấn Giao Ước, Cự Thú sẽ bị kẹt cứng không thể lên Sao để cộng thêm cấp độ tối đa cho 6 tướng Đội 1.",
                    en: "If you spend only Magicite while neglecting Magic Core (1,500 Magic Core at Lv.20; 69,000 total at Lv.150) and Covenant Seals, your Behemoth will stall at star gates and fail to raise your Queue 1 Hero Level Cap.",
                  },
                },
              ],
            },
            {
              type: "paragraph",
              text: {
                vi: "• **Tầng 1 — Đột Phá Sao (Tab Behemoth):** Dùng `Magicite` (`4,648,680` ở Lv.150) & `Magic Core` (`1,500` ở Lv.20, `69,000` ở Lv.150) mở **Hero Level Cap** (`Lv.20/40/60/80/100/150` = `+1/+2/+3/+4/+5/+9`).\n• **Tầng 2 — Giao Ước (`Covenant Bonus`):** Dùng `Covenant Seals` (`750` ở Lv.20, `3,500` ở Lv.40, `6,080` ở Lv.60, tổng `6,346` ở Lv.100) cộng `210.00%` ATK, `630.00%` HP & `15.00%` `Hero Damage Reduction`.\n• **Tầng 3 — Xuất Trận (`Deploy Bonus`):** Đạt Tỷ lệ Chuyển đổi `175.00%` từ `Lv.60+` kèm Tăng Sát Thương (`Hero Damage Increase` từ `3.00%` ở Lv.6 lên `14.20%` ở Lv.120+).",
                en: "• **Layer 1 — Star Gates (Tab Behemoth):** Uses `Magicite` (`4,648,680` at Lv.150) & `Magic Core` (`1,500` at Lv.20, `69,000` at Lv.150) to expand **Hero Level Cap** (`Lv.20/40/60/80/100/150` = `+1/+2/+3/+4/+5/+9`).\n• **Layer 2 — Covenant Bonus:** Uses `Covenant Seals` (`750` at Lv.20, `3,500` at Lv.40, `6,080` at Lv.60, `6,346` total at Lv.100) for `210.00%` ATK, `630.00%` HP & `15.00%` `Hero Damage Reduction`.\n• **Layer 3 — Deploy Bonus:** Reaches a `175.00%` Conversion Rate from `Lv.60+` alongside `+3.00%` (Lv.6) to `+14.20%` (Lv.120+) `Hero Damage Increase`.",
              },
            },
          ],
        },
      ],
    },
    {
      id: "sec-2-three-faction-pet-roster-and-checklist",
      title: {
        vi: "2. Chiến thuật Tối ưu cho F2P & Low-Spender: Danh Sách Thú Cưng 3 Phe (Faction Pet Roster) & Checklist Hàng Tuần",
        en: "2. F2P & Low-Spender Strategy: 3-Faction Pet Roster & Weekly Audit Checklist",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "Áp dụng **Quy tắc 1 Đội hình Tuyệt đối**, người chơi F2P và Low-Spender phải dồn `100%` Thức ăn Pet (`Pet Food`) vào duy nhất 1 con Pet Chủ Lực khớp hệ Đội hình 1 để kích hoạt `3x Faction Buff`.\nLưu ý sống còn: `Cactini` (Xương Rồng Nhỏ) thuộc hệ Thiên Nhiên (Nature), tuyệt đối không nuôi nhầm cho đội Bộ Lạc (Horde)!",
            en: "Applying the **Absolute Single-Queue Rule**, F2P and Low-Spender players must funnel `100%` of their `Pet Food` into a single Main Faction Pet matching Queue 1's faction to activate the `3x Faction Buff`.\nCritical note: `Cactini` belongs to the Nature faction and must never be mistakenly raised for a Horde lineup!",
          },
        },
        {
          type: "table",
          caption: {
            vi: "Bảng 1: Ma Trận Lựa Chọn Thú Cưng Chủ Lực Theo 3 Phe Phái (3-Faction Pet Selection Matrix — 3x Faction Bonus)",
            en: "Table 1: 3-Faction Main Pet Selection Matrix (3x Faction Bonus & Target Heroes)",
          },
          headers: [
            {
              vi: "Phe Phái Đội 1 (Faction)",
              en: "Queue 1 Faction",
            },
            {
              vi: "Danh Sách Thú Cưng Chuẩn Của Hệ (Faction Pet Roster)",
              en: "Standard Faction Pet Roster",
            },
            {
              vi: "Vai Trò & Hiệu Ứng Thực Chiến (+% ATK/HP Tướng Hệ 3x)",
              en: "Combat Role & 3x Faction Buff Scaling",
            },
            {
              vi: "Đối Tượng Tướng Hưởng Lợi Trực Tiếp (3x Faction Buff)",
              en: "Direct Beneficiary Heroes (3x Faction Buff)",
            },
          ],
          rows: [
            [
              {
                vi: "PHE LIÊN MINH (League)",
                en: "LEAGUE FACTION",
              },
              {
                vi: "• Eggy (Trứng Tinh Anh)\n• Sparrow (Chim Sẻ Chiến / Biệt Kích)",
                en: "• Eggy\n• Sparrow",
              },
              {
                vi: "Cộng % ATK/HP Tướng Liên Minh cao gấp 3 lần chỉ số chung (3x League Hero ATK/HP: +35.70% ATK / +52.50% HP ở Lv.45 Epic ➔ +66.30% ATK / +97.50% HP ở Lv.75 Legendary ➔ +81.60% ATK / +120.00% HP ở Lv.90 ➔ +91.80% ATK / +135.00% HP ở Lv.100+). Gia tăng sát thương kỹ năng tầm xa, hỗ trợ tạo lá chắn bảo vệ và xuyên thủng phòng ngự địch.",
                en: "Grants 3x League Hero ATK/HP (+35.70% ATK / +52.50% HP at Lv.45 Epic ➔ +66.30% ATK / +97.50% HP at Lv.75 Legendary ➔ +81.60% ATK / +120.00% HP at Lv.90 ➔ +91.80% ATK / +135.00% HP at Lv.100+). Amplifies ranged AoE skill burst, protective shielding, and defense penetration.",
              },
              {
                vi: "Paragon, Pyromancer, Adjudicator, Rose Princess, Bishop, Artificer, Nun, Bard.",
                en: "Paragon, Pyromancer, Adjudicator, Rose Princess, Bishop, Artificer, Nun, Bard.",
              },
            ],
            [
              {
                vi: "PHE BỘ LẠC (Horde)",
                en: "HORDE FACTION",
              },
              {
                vi: "• Tiggy (Hổ Con)\n• Howli (Sói Con)\n• Flickerkit (Mèo Lửa — Pet Đỏ S2+)",
                en: "• Tiggy\n• Howli\n• Flickerkit (S2+ Mythic Red Pet)",
              },
              {
                vi: "Cộng % ATK/HP Tướng Bộ Lạc cao gấp 3 lần chỉ số chung (3x Horde Hero ATK/HP: đạt +35.70% ATK / +52.50% HP ở Lv.45, +66.30% ATK / +97.50% HP ở Lv.75, +81.60% ATK / +120.00% HP ở Lv.90 và +91.80% ATK / +135.00% HP ở Lv.100+). Tối ưu hóa sát thương đòn đánh, Tốc đánh và Sát thương Bạo kích cho đội hình càn lướt.",
                en: "Grants 3x Horde Hero ATK/HP (reaching +35.70% ATK / +52.50% HP at Lv.45, +66.30% ATK / +97.50% HP at Lv.75, +81.60% ATK / +120.00% HP at Lv.90, and +91.80% ATK / +135.00% HP at Lv.100+). Maximizes normal attack burst, Attack Speed, and Crit Damage for aggressive dive lineups.",
              },
              {
                vi: "Wukong, Storm Maiden, Desert Prince, Beastmaster, Witch, Warlock, Soulmancer, Wilderness Hunter, Shadow Priest.",
                en: "Wukong, Storm Maiden, Desert Prince, Beastmaster, Witch, Warlock, Soulmancer, Wilderness Hunter, Shadow Priest.",
              },
            ],
            [
              {
                vi: "PHE THIÊN NHIÊN (Nature)",
                en: "NATURE FACTION",
              },
              {
                vi: "• Cactini (Xương Rồng Nhỏ)\n• Bear (Gấu Chiến)\n• Candy Boo (Tinh Linh Kẹo — Pet Đỏ S2+)",
                en: "• Cactini\n• Bear\n• Candy Boo (S2+ Mythic Red Pet)",
              },
              {
                vi: "Cộng % ATK/HP Tướng Thiên Nhiên cao gấp 3 lần chỉ số chung (3x Nature Hero ATK/HP). Lưu ý sống còn: Cactini thuộc hệ Thiên Nhiên (Nature), tuyệt đối KHÔNG nuôi Cactini cho đội hình Bộ Lạc! Tối ưu hóa lượng máu tối đa (Max HP), phản đòn, khiên sinh mệnh và hồi phục bền bỉ cho cả tướng lẫn đơn vị triệu hồi.",
                en: "Grants 3x Nature Hero ATK/HP. Critical rule: Cactini belongs to the Nature faction and must NEVER be raised for a Horde lineup! Maximizes Max HP, counter-damage, life shields, and sustained healing for both Nature heroes and summoned units.",
              },
              {
                vi: "Tidecaller, Monk, Ne Zha, Pixie, Forest Maiden, Petalis, Sage, Druid.",
                en: "Tidecaller, Monk, Ne Zha, Pixie, Forest Maiden, Petalis, Sage, Druid.",
              },
            ],
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: {
            vi: "Chiến Thuật Chuyển Giao Liên Minh ➔ Bộ Lạc (Horde Pivot): Phân Biệt Rõ Tiggy vs Cactini!",
            en: "League ➔ Horde Pivot Strategy: Never Confuse Tiggy (Horde) with Cactini (Nature)!",
          },
          content: {
            vi: "• **Khóa phôi từ Ngày 1:** Nếu khởi đầu bằng Liên Minh trước khi rẽ sang Bộ Lạc (**Horde Pivot**), hãy khóa chặt bản sao `Tiggy` / `Howli` (và `Flickerkit` ở S2+) ngay từ Ngày 1 mở Chuồng Thú.\n• **Tránh bẫy lệch hệ:** Tuyệt đối không nuôi nhầm `Cactini` (hệ Thiên Nhiên Nature)! Chỉ nâng cầm chừng `Eggy` / `Sparrow` rồi dồn `100%` Pet Food đẩy `Tiggy` / `Howli` lên `Lv.45` ➔ `Lv.75` ➔ `Lv.90`.",
            en: "• **Lock Fodder from Day 1:** If starting with League before executing a **Horde Pivot**, lock every copy of `Tiggy` / `Howli` (and `Flickerkit` in S2+) from Day 1 of the Season 1 Pet Kennel.\n• **Avoid Faction Mismatch:** Never mistakenly raise `Cactini` (Nature faction)! Keep `Eggy` / `Sparrow` minimal, then funnel `100%` of Pet Food into `Tiggy` / `Howli` (`Lv.45` ➔ `Lv.75` ➔ `Lv.90`).",
          },
        },
        {
          type: "checklist",
          checklistId: "pets-behemoth-weekly-audit-v2",
          title: {
            vi: "Danh Sách Kiểm Tra Thực Hành Hàng Tuần: Thú Cưng & Cự Thú (Weekly Audit Checklist)",
            en: "Weekly Actionable Audit Checklist: Pets & Season 3 Behemoth",
          },
          description: {
            vi: "Hoàn thành 4 bước kiểm tra định kỳ dưới đây mỗi tuần để bảo toàn 100% phôi Same Pet và tối đa hóa điểm sự kiện Double-Dip:",
            en: "Complete the 4 weekly audit steps below to protect 100% of your Same Pet copies and maximize Double-Dip event points:",
          },
          items: [
            {
              id: "pet-audit-1",
              label: {
                vi: "1. Khóa cứng (Lock) 100% bản sao Cùng Tên (Same Pet) của Pet Hệ Đội 1",
                en: "1. Lock 100% of identical copies (Same Pet) for your Queue 1 Faction Pet",
              },
              detail: {
                vi: "Khóa `Eggy`/`Sparrow` (Liên Minh), `Tiggy`/`Howli`/`Flickerkit` (Bộ Lạc) hoặc `Cactini`/`Bear`/`Candy Boo` (Thiên Nhiên). `Lv.90` cần `44` Same + `161` Any; `Mythic Lv.120` cần `58` Same + `211` Any.",
                en: "Lock `Eggy`/`Sparrow` (League), `Tiggy`/`Howli`/`Flickerkit` (Horde), or `Cactini`/`Bear`/`Candy Boo` (Nature). `Lv.90` needs `44` Same + `161` Any; `Mythic Lv.120` needs `58` Same + `211` Any.",
              },
              badge: {
                vi: "44 ➔ 58 SAME PETS",
                en: "44 ➔ 58 SAME PETS",
              },
            },
            {
              id: "pet-audit-2",
              label: {
                vi: "2. Ấp trứng liên tục 24/7 và chỉ phóng sinh (Release) Pet Lục (Uncommon) dư thừa",
                en: "2. Run egg incubators 24/7 and only release surplus Uncommon pets",
              },
              detail: {
                vi: "Giữ lại toàn bộ Pet Xanh Lam (`Rare`) và Tím (`Epic`) khác hệ làm phôi lót (`Any Fodder`). Chỉ phóng sinh bản sao Pet Lục (`Uncommon`) sau khi mở sổ sưu tập để thu hồi `Pet Food`.",
                en: "Retain all off-faction `Rare` and `Epic` pets as generic promotion fodder (`Any Fodder`). Only release duplicate `Uncommon` pets after unlocking their collection entry to harvest `Pet Food`.",
              },
              badge: {
                vi: "161 ➔ 211 ANY FODDER",
                en: "161 ➔ 211 ANY FODDER",
              },
            },
            {
              id: "pet-audit-3",
              label: {
                vi: "3. Săn đủ Mine Vein Battle & Frostfield Battle mỗi tuần ở Season 3+",
                en: "3. Clear Mine Vein Battle & Frostfield Battle weekly in Season 3+",
              },
              detail: {
                vi: "Tích lũy đồng bộ 3 nguyên liệu Cự Thú (`Behemoth`): `Magicite`, `Magic Core` đột phá Sao ở các mốc `Lv.20/40/60/80/100` (`+1 ➔ +9` Hero Level Cap) và `6,346` Ấn Giao Ước (`Covenant Seals`).",
                en: "Farm all 3 Behemoth materials in parallel: `Magicite`, `Magic Core` for `Lv.20/40/60/80/100` star breakthroughs (`+1 ➔ +9` Hero Level Cap), and all `6,346` `Covenant Seals`.",
              },
              badge: {
                vi: "6,346 ẤN GIAO ƯỚC",
                en: "6,346 COVENANT SEALS",
              },
            },
            {
              id: "pet-audit-4",
              label: {
                vi: "4. Nhịn bấm Feed & Promote suốt ngày thường — Chỉ xả vào Giờ Vàng Sự Kiện",
                en: "4. Hold Feed & Promote on weekdays — Dump strictly in Golden Event Windows",
              },
              detail: {
                vi: "Găm `Pet Food` (`960` điểm / `100` Food), `Pet Essence` (`480` điểm / `1` Essence) & phôi tiến hóa (`6,000`–`36,000`đ) xả vào Thứ Hai–Ba Tuần A (`Pets Development`) hoặc Thứ Sáu Tuần B (`GAR Day 5`).",
                en: "Hoard `Pet Food` (`960` pts / `100` Food), `Pet Essence` (`480` pts / `1` Essence) & promotions (`6,000`–`36,000` pts) for Mon–Tue Week A (`Pets Development`) or Friday Week B (`GAR Day 5`).",
              },
              badge: {
                vi: "960Đ / 100 FOOD",
                en: "960 PTS / 100 FOOD",
              },
            },
          ],
        },
      ],
    },
    {
      id: "sec-3-pets-behemoth-common-pitfalls",
      title: {
        vi: "3. Những Cạm bẫy Phổ biến & Cách Phòng tránh (Common Pitfalls)",
        en: "3. Common Pet Evolution & Behemoth Upgrade Pitfalls",
      },
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            {
              vi: "**Sai lầm #1 — Dùng phôi `Same` làm `Any` hoặc nhầm `Cactini` là Bộ Lạc:** `Cactini` thuộc hệ `Nature`, còn `Tiggy`/`Howli`/`Flickerkit` thuộc Bộ Lạc; cần khóa `44` Same (Lv.90) & `58` Same (Lv.120).",
              en: "**Pitfall #1 — Feeding Main Pet copies as `Any` fodder or confusing `Cactini` as Horde:** `Cactini` belongs to `Nature`, while `Tiggy`/`Howli`/`Flickerkit` belong to Horde; lock `44` ➔ `58` Same.",
            },
            {
              vi: "**Sai lầm #2 — Chia đều `Pet Food` nuôi 3 Pet ở Lv.30–40:** Một Pet Hệ đạt `Lv.75` (`368,600` Pet Food, `84.00%` Conversion, `+66.30%` ATK / `+97.50%` HP) mạnh gấp 4 lần 3 Pet Lv.35 cộng lại.",
              en: "**Pitfall #2 — Splitting `Pet Food` across 3 Pets at Lv.30–40:** A single Faction Pet at `Lv.75` (`368,600` Pet Food, `84.00%` Conversion, `+66.30%` ATK / `+97.50%` HP) outperforms three Lv.35 pets by 4x.",
            },
            {
              vi: "**Sai lầm #3 — Nâng `Uncommon Pet` cấp cao hoặc nhầm `Essence` Lv.90:** Uncommon tốn `596,850` Food + `3,525` Essence ở Lv.90 (trần `7.50%`), còn Rare Faction Pet Lv.90 tốn `596,600` Food + `0` Essence.",
              en: "**Pitfall #3 — Leveling `Uncommon Pets` high or miscalculating Lv.90 `Essence`:** Uncommon Pets cost `596,850` Food + `3,525` Essence by Lv.90 (`7.50%` cap), vs. `596,600` Food + `0` Essence for Rare.",
            },
            {
              vi: "**Sai lầm #4 — Đốt `Magicite` nhưng bỏ quên `Magic Core` & `Covenant Seals`:** Cần tích `Magic Core` (`1,500` ở Lv.20) mở `Hero Level Cap +1 ➔ +9` và gom `6,346` Ấn Giao Ước lấy `15.00%` Damage Reduction.",
              en: "**Pitfall #4 — Burning `Magicite` while neglecting `Magic Core` & `Covenant Seals`:** Save `Magic Core` (`1,500` at Lv.20) for `+1 ➔ +9` Hero Level Cap and farm `6,346` Seals for `15.00%` DR.",
            },
          ],
        },
        {
          type: "callout",
          variant: "danger",
          title: {
            vi: "3 Cạm Bẫy Chí Tử Làm Phế Hệ Thống Thú Cưng & Cự Thú (Account-Ruining Pitfalls)",
            en: "3 Fatal Account-Ruining Mistakes in Pets & Season 3 Behemoth Progression",
          },
          content: {
            vi: "• **Bẫy 1 (Mất phôi Same & Lệch hệ):** Dùng nhầm `Same Pet` làm phôi Any thay vì khóa `44` Same (Lv.90) / `58` Same (Lv.120), nuôi `Cactini` (Nature) cho Bộ Lạc, hoặc nâng `Uncommon` tốn `596,850` Food + `3,525` Essence.\n• **Bẫy 2 (Xả ngoài sự kiện):** Cho Pet ăn ngoài khung Thứ Hai–Ba Tuần A (`Pets Development`) hoặc Thứ Sáu Tuần B (`GAR Day 5` / `KvK Stage 5–6`), mất `960` điểm / `100` Food & `6,000`–`36,000`đ tiến hóa.\n• **Bẫy 3 (Kẹt trần cấp tướng S3):** Bỏ bê `Mine Vein Battle` & `Frostfield Battle` ở Season 3 khiến thiếu `6,346` Ấn Giao Ước (`Covenant Seals`) và `Magic Core`, mất `+1 ➔ +9` **Hero Level Cap**!",
            en: "• **Trap 1 (Fodder Loss & Mismatch):** Feeding `Same Pet` as Any instead of locking `44`/`58` Same (Lv.90/120), raising `Cactini` (Nature) for Horde, or wasting `596,850` Food + `3,525` Essence on `Uncommon`.\n• **Trap 2 (Off-Event Feeding):** Spending `Pet Food`/`Pet Essence` outside Mon–Tue Week A (`Pets Development`) or Friday Week B (`GAR Day 5` / `KvK Stage 5–6`), losing `960` pts/`100` Food & `6,000`–`36,000` pts.\n• **Trap 3 (S3 Hero Level Cap Stall):** Neglecting `Mine Vein Battle` & `Frostfield Battle` in Season 3 and missing `6,346` `Covenant Seals` and `Magic Core`, costing Queue 1 `+1 ➔ +9` **Hero Level Cap**!",
          },
        },
      ],
    },
  ],
  proSections: [
    {
      id: "sec-4-pet-and-behemoth-progression-tables",
      isPro: true,
      title: {
        vi: "4. Phân tích Định lượng & Điểm gãy: Bảng 19 Mốc Tiến Hóa Pet Lv.1➔Lv.120 (Tab Pets), Bảng 14 Mốc Behemoth Lv.1➔Lv.150 (Tab Behemoth) & Lịch Xả (PRO)",
        en: "4. Quantitative Analysis: 19-Milestone Pet Lv.1➔Lv.120 Table (Tab Pets), 14-Milestone Behemoth Lv.1➔Lv.150 Table (Tab Behemoth) & Event Dump Schedule (PRO)",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "Dưới đây là dữ liệu định lượng **19 mốc đột phá phẩm chất Thú Cưng** (`Lv.1 ➔ Lv.90 ➔ Mythic Lv.120` từ Tab Pets) và **14 mốc điểm gãy Cự Thú** (`Behemoth Lv.1 ➔ Lv.150` từ Tab Behemoth).\nĐi kèm là bảng đối chiếu điểm sự kiện giúp hoạch định chính xác từng đơn vị `Pet Food`, `Pet Essence`, `Magicite`, `Magic Core` và `Covenant Seal`.",
            en: "Below is the complete quantitative dataset covering all **19 Pet promotion milestones** (`Lv.1 ➔ Lv.90 ➔ Mythic Lv.120` from Tab Pets) and **14 Behemoth progression breakpoints** (`Lv.1 ➔ Lv.150` from Tab Behemoth).\nIt is paired with the event scoring matrix to plan every unit of `Pet Food`, `Pet Essence`, `Magicite`, `Magic Core`, and `Covenant Seal`.",
          },
        },
      ],
      subSections: [
        {
          id: "sub-4-1-pet-lv1-to-lv120-master-table",
          title: {
            vi: "4.1. Bảng 19 Mốc Chi Phí Thức Ăn Pet (Pet Food), Phôi Tiến Hóa (Same + Any) & Chỉ Số 3x Hệ Phái Từ Lv.1 ➔ Mythic Lv.120 (Tab Pets)",
            en: "4.1. 19-Milestone Pet Food Cost, Promotion Fodder (Same + Any) & 3x Faction Stat Table Lv.1 ➔ Mythic Lv.120 (Tab Pets)",
          },
          badge: {
            vi: "19 MỐC • TAB PETS",
            en: "19 MILESTONES • TAB PETS",
          },
          blocks: [
            {
              type: "table",
              caption: {
                vi: "Bảng 2: Bảng 19 Mốc Đột Phá Phẩm Chất & Chi Phí Tích Lũy Nhánh Pet Hệ Phái (Rare Base ➔ Epic Lv.45 ➔ Legendary Lv.75 ➔ Lv.90 ➔ Mythic Lv.120)",
                en: "Table 2: Complete 19-Milestone Pet Progression, Cumulative Food/Essence & Fodder Table (Rare Base ➔ Epic Lv.45 ➔ Legendary Lv.75 ➔ Lv.90 ➔ Mythic Lv.120)",
              },
              headers: [
                {
                  vi: "Mốc Cấp Độ (LVL)",
                  en: "Level Milestone (LVL)",
                },
                {
                  vi: "Bậc Phẩm Chất (Promotion Tier)",
                  en: "Promotion Tier",
                },
                {
                  vi: "Chi Phí Pet Food Tại Cấp Đó",
                  en: "Single-Level Pet Food Cost",
                },
                {
                  vi: "Tổng Pet Food Tích Lũy Đến Mốc",
                  en: "Cumulative Pet Food",
                },
                {
                  vi: "Chi Phí Pet Essence & Material",
                  en: "Pet Essence & Material Cost",
                },
                {
                  vi: "Nguyên Liệu Phôi Pet Yêu Cầu (Same + Any)",
                  en: "Required Pet Fodder (Same + Any)",
                },
                {
                  vi: "Trần Cấp (Level Cap)",
                  en: "Level Cap",
                },
                {
                  vi: "Tỷ Lệ Chuyển Đổi (Conversion Rate)",
                  en: "Conversion Rate",
                },
                {
                  vi: "Chỉ Số Cộng Toàn Tướng: Hero ATK (Chung / Hệ 3x) & Hero HP (Chung / Hệ 3x)",
                  en: "Global Hero Buffs: Hero ATK (Universal / 3x Faction) & Hero HP (Universal / 3x Faction)",
                },
              ],
              rows: [
                [
                  { vi: "Lv.1", en: "Lv.1" },
                  { vi: "RARE (Xanh)", en: "RARE (Base)" },
                  { vi: "0", en: "0" },
                  { vi: "0", en: "0" },
                  { vi: "-", en: "-" },
                  { vi: "Mở khóa gốc", en: "Base Unlock" },
                  { vi: "35", en: "35" },
                  { vi: "36.00%", en: "36.00%" },
                  {
                    vi: "ATK: 1.70% / +5.10% | HP: 2.50% / +7.50%",
                    en: "ATK: 1.70% / +5.10% | HP: 2.50% / +7.50%",
                  },
                ],
                [
                  { vi: "Lv.10", en: "Lv.10" },
                  { vi: "Rare +1", en: "Rare +1" },
                  { vi: "700", en: "700" },
                  { vi: "3,200", en: "3,200" },
                  { vi: "-", en: "-" },
                  { vi: "1 same", en: "1 same" },
                  { vi: "40", en: "40" },
                  { vi: "40.00%", en: "40.00%" },
                  {
                    vi: "ATK: 3.40% / +10.20% | HP: 5.00% / +15.00%",
                    en: "ATK: 3.40% / +10.20% | HP: 5.00% / +15.00%",
                  },
                ],
                [
                  { vi: "Lv.20", en: "Lv.20" },
                  { vi: "Rare +2", en: "Rare +2" },
                  { vi: "1,700", en: "1,700" },
                  { vi: "15,700", en: "15,700" },
                  { vi: "-", en: "-" },
                  { vi: "3 any", en: "3 any" },
                  { vi: "45", en: "45" },
                  { vi: "44.00%", en: "44.00%" },
                  {
                    vi: "ATK: 5.10% / +15.30% | HP: 7.50% / +22.50%",
                    en: "ATK: 5.10% / +15.30% | HP: 7.50% / +22.50%",
                  },
                ],
                [
                  { vi: "Lv.30", en: "Lv.30" },
                  { vi: "Rare +3", en: "Rare +3" },
                  { vi: "2,750", en: "2,750" },
                  { vi: "38,250", en: "38,250" },
                  { vi: "-", en: "-" },
                  { vi: "1 same", en: "1 same" },
                  { vi: "50", en: "50" },
                  { vi: "48.00%", en: "48.00%" },
                  {
                    vi: "ATK: 6.80% / +20.40% | HP: 10.00% / +30.00%",
                    en: "ATK: 6.80% / +20.40% | HP: 10.00% / +30.00%",
                  },
                ],
                [
                  { vi: "Lv.35", en: "Lv.35" },
                  { vi: "Rare +4", en: "Rare +4" },
                  { vi: "3,500", en: "3,500" },
                  { vi: "54,250", en: "54,250" },
                  { vi: "-", en: "-" },
                  { vi: "3 any", en: "3 any" },
                  { vi: "55", en: "55" },
                  { vi: "52.00%", en: "52.00%" },
                  {
                    vi: "ATK: 8.50% / +25.50% | HP: 12.50% / +37.50%",
                    en: "ATK: 8.50% / +25.50% | HP: 12.50% / +37.50%",
                  },
                ],
                [
                  { vi: "Lv.40", en: "Lv.40" },
                  { vi: "Rare +5", en: "Rare +5" },
                  { vi: "4,300", en: "4,300" },
                  { vi: "74,050", en: "74,050" },
                  { vi: "-", en: "-" },
                  { vi: "1 same + 5 any", en: "1 same + 5 any" },
                  { vi: "60", en: "60" },
                  { vi: "56.00%", en: "56.00%" },
                  {
                    vi: "ATK: 10.20% / +30.60% | HP: 15.00% / +45.00%",
                    en: "ATK: 10.20% / +30.60% | HP: 15.00% / +45.00%",
                  },
                ],
                [
                  { vi: "Lv.45 ★", en: "Lv.45 ★" },
                  { vi: "EPIC (Tím)", en: "EPIC (Purple)" },
                  { vi: "5,300", en: "5,300" },
                  { vi: "98,550", en: "98,550" },
                  { vi: "-", en: "-" },
                  { vi: "1 same + 5 any", en: "1 same + 5 any" },
                  { vi: "70", en: "70" },
                  { vi: "60.00%", en: "60.00%" },
                  {
                    vi: "ATK: 11.90% / +35.70% | HP: 17.50% / +52.50%",
                    en: "ATK: 11.90% / +35.70% | HP: 17.50% / +52.50%",
                  },
                ],
                [
                  { vi: "Lv.50", en: "Lv.50" },
                  { vi: "Epic +1", en: "Epic +1" },
                  { vi: "6,350", en: "6,350" },
                  { vi: "128,100", en: "128,100" },
                  { vi: "-", en: "-" },
                  { vi: "2 same + 5 any", en: "2 same + 5 any" },
                  { vi: "80", en: "80" },
                  { vi: "64.00%", en: "64.00%" },
                  {
                    vi: "ATK: 13.60% / +40.80% | HP: 20.00% / +60.00%",
                    en: "ATK: 13.60% / +40.80% | HP: 20.00% / +60.00%",
                  },
                ],
                [
                  { vi: "Lv.55", en: "Lv.55" },
                  { vi: "Epic +2", en: "Epic +2" },
                  { vi: "7,600", en: "7,600" },
                  { vi: "163,600", en: "163,600" },
                  { vi: "-", en: "-" },
                  { vi: "2 same + 10 any", en: "2 same + 10 any" },
                  { vi: "90", en: "90" },
                  { vi: "68.00%", en: "68.00%" },
                  {
                    vi: "ATK: 15.30% / +45.90% | HP: 22.50% / +67.50%",
                    en: "ATK: 15.30% / +45.90% | HP: 22.50% / +67.50%",
                  },
                ],
                [
                  { vi: "Lv.60", en: "Lv.60" },
                  { vi: "Epic +3", en: "Epic +3" },
                  { vi: "8,850", en: "8,850" },
                  { vi: "205,350", en: "205,350" },
                  { vi: "-", en: "-" },
                  { vi: "3 same + 10 any", en: "3 same + 10 any" },
                  { vi: "90", en: "90" },
                  { vi: "72.00%", en: "72.00%" },
                  {
                    vi: "ATK: 17.00% / +51.00% | HP: 25.00% / +75.00%",
                    en: "ATK: 17.00% / +51.00% | HP: 25.00% / +75.00%",
                  },
                ],
                [
                  { vi: "Lv.65", en: "Lv.65" },
                  { vi: "Epic +4", en: "Epic +4" },
                  { vi: "10,100", en: "10,100" },
                  { vi: "253,350", en: "253,350" },
                  { vi: "-", en: "-" },
                  { vi: "3 same + 15 any", en: "3 same + 15 any" },
                  { vi: "90", en: "90" },
                  { vi: "76.00%", en: "76.00%" },
                  {
                    vi: "ATK: 18.70% / +56.10% | HP: 27.50% / +82.50%",
                    en: "ATK: 18.70% / +56.10% | HP: 27.50% / +82.50%",
                  },
                ],
                [
                  { vi: "Lv.70", en: "Lv.70" },
                  { vi: "Epic +5", en: "Epic +5" },
                  { vi: "11,350", en: "11,350" },
                  { vi: "307,600", en: "307,600" },
                  { vi: "-", en: "-" },
                  { vi: "4 same + 15 any", en: "4 same + 15 any" },
                  { vi: "90", en: "90" },
                  { vi: "80.00%", en: "80.00%" },
                  {
                    vi: "ATK: 20.40% / +61.20% | HP: 30.00% / +90.00%",
                    en: "ATK: 20.40% / +61.20% | HP: 30.00% / +90.00%",
                  },
                ],
                [
                  { vi: "Lv.75 ★", en: "Lv.75 ★" },
                  { vi: "LEGENDARY (Vàng)", en: "LEGENDARY (Gold)" },
                  { vi: "12,800", en: "12,800" },
                  { vi: "368,600", en: "368,600" },
                  { vi: "-", en: "-" },
                  { vi: "5 same + 15 any", en: "5 same + 15 any" },
                  { vi: "90", en: "90" },
                  { vi: "84.00%", en: "84.00%" },
                  {
                    vi: "ATK: 22.10% / +66.30% | HP: 32.50% / +97.50%",
                    en: "ATK: 22.10% / +66.30% | HP: 32.50% / +97.50%",
                  },
                ],
                [
                  { vi: "Lv.80", en: "Lv.80" },
                  { vi: "Legendary +1", en: "Legendary +1" },
                  { vi: "14,300", en: "14,300" },
                  { vi: "437,100", en: "437,100" },
                  { vi: "1,000 Mat", en: "1,000 Mat" },
                  { vi: "3 same + 10 any", en: "3 same + 10 any" },
                  { vi: "95", en: "95" },
                  { vi: "88.00%", en: "88.00%" },
                  {
                    vi: "ATK: 23.80% / +71.40% | HP: 35.00% / +105.00%",
                    en: "ATK: 23.80% / +71.40% | HP: 35.00% / +105.00%",
                  },
                ],
                [
                  { vi: "Lv.85", en: "Lv.85" },
                  { vi: "Legendary +2", en: "Legendary +2" },
                  { vi: "15,800", en: "15,800" },
                  { vi: "513,100", en: "513,100" },
                  { vi: "2,000 Mat", en: "2,000 Mat" },
                  { vi: "4 same + 15 any", en: "4 same + 15 any" },
                  { vi: "100", en: "100" },
                  { vi: "92.00%", en: "92.00%" },
                  {
                    vi: "ATK: 25.50% / +76.50% | HP: 37.50% / +112.50%",
                    en: "ATK: 25.50% / +76.50% | HP: 37.50% / +112.50%",
                  },
                ],
                [
                  { vi: "Lv.90 ★", en: "Lv.90 ★" },
                  {
                    vi: "Legendary +3 (Mốc Chuẩn)",
                    en: "Legendary +3 (Standard Benchmark)",
                  },
                  { vi: "17,300", en: "17,300" },
                  {
                    vi: "596,600 (Uncommon: 596,850)",
                    en: "596,600 (Uncommon: 596,850)",
                  },
                  {
                    vi: "0 Essence + 4,000 Mat (Uncommon: 3,525 Essence)",
                    en: "0 Essence + 4,000 Mat (Uncommon: 3,525 Essence)",
                  },
                  {
                    vi: "5 same + 20 any (Tích lũy Lv.90: 44 same + 161 any)",
                    en: "5 same + 20 any (Cumulative Lv.90: 44 same + 161 any)",
                  },
                  { vi: "105", en: "105" },
                  { vi: "96.00%", en: "96.00%" },
                  {
                    vi: "ATK: 27.20% / +81.60% | HP: 40.00% / +120.00%",
                    en: "ATK: 27.20% / +81.60% | HP: 40.00% / +120.00%",
                  },
                ],
                [
                  { vi: "Lv.95", en: "Lv.95" },
                  { vi: "Legendary +4", en: "Legendary +4" },
                  { vi: "6,400", en: "6,400" },
                  { vi: "627,200", en: "627,200" },
                  { vi: "250 Essence + 6,000 Mat", en: "250 Essence + 6,000 Mat" },
                  { vi: "6 same + 20 any", en: "6 same + 20 any" },
                  { vi: "110", en: "110" },
                  { vi: "100.00%", en: "100.00%" },
                  {
                    vi: "ATK: 28.90% / +86.70% | HP: 42.50% / +127.50%",
                    en: "ATK: 28.90% / +86.70% | HP: 42.50% / +127.50%",
                  },
                ],
                [
                  { vi: "Lv.100", en: "Lv.100" },
                  { vi: "Legendary +5", en: "Legendary +5" },
                  { vi: "7,000", en: "7,000" },
                  { vi: "661,000", en: "661,000" },
                  { vi: "500 Essence + 8,000 Mat", en: "500 Essence + 8,000 Mat" },
                  { vi: "8 same + 30 any", en: "8 same + 30 any" },
                  { vi: "115", en: "115" },
                  { vi: "104.00%", en: "104.00%" },
                  {
                    vi: "ATK: 30.60% / +91.80% | HP: 45.00% / +135.00%",
                    en: "ATK: 30.60% / +91.80% | HP: 45.00% / +135.00%",
                  },
                ],
                [
                  { vi: "Lv.101 ➔ 120 (Lv.115 ➔ 120)", en: "Lv.101 ➔ 120 (Lv.115 ➔ 120)" },
                  { vi: "MYTHIC (Đỏ — Kịch trần)", en: "MYTHIC (Red — Max Cap)" },
                  { vi: "7,200 ➔ 8,000+", en: "7,200 ➔ 8,000+" },
                  { vi: "Tổng: 714,000", en: "Total: 714,000" },
                  { vi: "Tổng: 40,050 Essence", en: "Total: 40,050 Essence" },
                  {
                    vi: "8 same + 30 any (Tổng Lv.120: 58 same + 211 any)",
                    en: "8 same + 30 any (Total Lv.120: 58 same + 211 any)",
                  },
                  { vi: "120", en: "120" },
                  { vi: "104.00%+", en: "104.00%+" },
                  {
                    vi: "Mở khóa phẩm chất Thần Thoại (Mythic) kịch trần (+91.80%+ ATK / +135.00%+ HP)",
                    en: "Unlocks Max Mythic tier (+91.80%+ ATK / +135.00%+ HP)",
                  },
                ],
              ],
            },
            {
              type: "callout",
              variant: "tip",
              title: {
                vi: "Quy Luật Bậc Thang Chi Phí Pet Food & Phân Biệt Mốc Lv.90 (596,600) vs Mythic Lv.120 (714,000)",
                en: "Step-by-Step Pet Food Scaling & Lv.90 (596,600) vs. Mythic Lv.120 (714,000) Breakdown",
              },
              content: {
                vi: "• **6 nấc thang Pet Food (1–3):** Lv.2–6 tăng `+50`/cấp (`100 ➔ 300`); Lv.7–29 tăng `+100`/cấp (`400 ➔ 2,600`); Lv.30–39 tăng `+150`/cấp (`2,750 ➔ 4,100`).\n• **6 nấc thang Pet Food (4–6):** Lv.40–49 tăng `+200`/cấp (`4,300 ➔ 6,100`); Lv.50–71 tăng `+250`/cấp (`6,350 ➔ 11,600`); Lv.72–90 tăng `+300`/cấp (`11,900 ➔ 17,300`).\n• **Mốc Lv.90:** Rare Faction Pet tốn `596,600` Food + `0` Essence + `44` Same + `161` Any (Uncommon tốn `596,850` Food + `3,525` Essence).\n• **Mốc Mythic Lv.120:** Từ Lv.91 ➔ Lv.120 tiêu thụ `40,050` Essence, nâng tổng tích lũy lên `714,000` Food + `58` Same + `211` Any.",
                en: "• **6 Linear Pet Food Steps (1–3):** Lv.2–6 adds `+50`/lvl (`100 ➔ 300`); Lv.7–29 adds `+100`/lvl (`400 ➔ 2,600`); Lv.30–39 adds `+150`/lvl (`2,750 ➔ 4,100`).\n• **6 Linear Pet Food Steps (4–6):** Lv.40–49 adds `+200`/lvl (`4,300 ➔ 6,100`); Lv.50–71 adds `+250`/lvl (`6,350 ➔ 11,600`); Lv.72–90 adds `+300`/lvl (`11,900 ➔ 17,300`).\n• **Lv.90 Milestone:** Rare Faction Pet Lv.90 costs `596,600` Food + `0` Essence + `44` Same + `161` Any (Uncommon costs `596,850` Food + `3,525` Essence).\n• **Mythic Lv.120 Milestone:** Lv.91 ➔ Lv.120 consumes `40,050` Essence, bringing cumulative totals to `714,000` Food + `58` Same + `211` Any.",
              },
            },
          ],
        },
        {
          id: "sub-4-2-behemoth-lv1-to-lv150-master-table",
          title: {
            vi: "4.2. Bảng 14 Mốc Điểm Gãy Cự Thú (Behemoth Lv.1 ➔ Lv.150 — Tab Behemoth & 6,346 Ấn Giao Ước)",
            en: "4.2. 14-Milestone Behemoth Progression Table (Lv.1 ➔ Lv.150 — Tab Behemoth & 6,346 Covenant Seals)",
          },
          badge: {
            vi: "14 MỐC • TAB BEHEMOTH",
            en: "14 MILESTONES • TAB BEHEMOTH",
          },
          blocks: [
            {
              type: "table",
              caption: {
                vi: "Bảng 3: Bảng 14 Mốc Đột Phá Cự Thú (Behemoth Lv.1 ➔ Lv.150), Chi Phí Đá Ma Tinh (Magicite), Lõi Ma Thuật (Magic Core), Ấn Giao Ước (Covenant Seals) & Hero Level Cap (+1 ➔ +9)",
                en: "Table 3: Complete 14-Milestone Behemoth Progression Table (Lv.1 ➔ Lv.150), Magicite, Magic Core, Covenant Seals & Hero Level Cap (+1 ➔ +9)",
              },
              headers: [
                {
                  vi: "Mốc Cấp Cự Thú (Behemoth LVL)",
                  en: "Behemoth Milestone (LVL)",
                },
                {
                  vi: "Chi Phí Đá Ma Tinh (Magicite)",
                  en: "Magicite Cost",
                },
                {
                  vi: "Chi Phí Lõi Ma Thuật (Magic Core Đột Phá Sao)",
                  en: "Magic Core Cost (Star Breakthrough)",
                },
                {
                  vi: "Chi Phí Ấn Giao Ước (Covenant Seals — Tại Mốc / Tích Lũy)",
                  en: "Covenant Seals (At Step / Cumulative)",
                },
                {
                  vi: "Trần Cấp Tướng Cộng Thêm (Hero Level Cap)",
                  en: "Hero Level Cap Bonus",
                },
                {
                  vi: "Giao Ước (Covenant Bonus: ATK / HP / Damage Reduction)",
                  en: "Covenant Bonus (ATK / HP / Damage Reduction)",
                },
                {
                  vi: "Xuất Trận (Deploy Bonus: ATK / HP / Damage Increase)",
                  en: "Deploy Bonus (ATK / HP / Damage Increase)",
                },
                {
                  vi: "Tỷ Lệ Chuyển Đổi Chỉ Số (Conversion Rate)",
                  en: "Stat Conversion Rate",
                },
              ],
              rows: [
                [
                  { vi: "Lv.1 (0 Sao)", en: "Lv.1 (0★)" },
                  { vi: "0", en: "0" },
                  { vi: "-", en: "-" },
                  { vi: "0 (Tích lũy: 0)", en: "0 (Cumulative: 0)" },
                  { vi: "-", en: "-" },
                  { vi: "1.50% / 4.50% / -", en: "1.50% / 4.50% / -" },
                  { vi: "1.80% / 5.40% / -", en: "1.80% / 5.40% / -" },
                  { vi: "100.00%", en: "100.00%" },
                ],
                [
                  { vi: "Lv.6", en: "Lv.6" },
                  { vi: "1,440", en: "1,440" },
                  { vi: "-", en: "-" },
                  { vi: "14 (Tích lũy: 50)", en: "14 (Cumulative: 50)" },
                  { vi: "-", en: "-" },
                  { vi: "9.00% / 27.00% / -", en: "9.00% / 27.00% / -" },
                  { vi: "10.80% / 32.40% / 3.00%", en: "10.80% / 32.40% / 3.00%" },
                  { vi: "107.50%", en: "107.50%" },
                ],
                [
                  { vi: "Lv.10", en: "Lv.10" },
                  { vi: "2,400", en: "2,400" },
                  { vi: "-", en: "-" },
                  { vi: "28 (Tích lũy: 140)", en: "28 (Cumulative: 140)" },
                  { vi: "-", en: "-" },
                  { vi: "15.00% / 45.00% / 3.00%", en: "15.00% / 45.00% / 3.00%" },
                  { vi: "18.00% / 54.00% / 3.00%", en: "18.00% / 54.00% / 3.00%" },
                  { vi: "113.50%", en: "113.50%" },
                ],
                [
                  { vi: "Lv.20 ★ (1 Sao)", en: "Lv.20 ★ (1★)" },
                  { vi: "5,880", en: "5,880" },
                  { vi: "1,500", en: "1,500" },
                  { vi: "88 (Tích lũy: 750)", en: "88 (Cumulative: 750)" },
                  { vi: "+1 Cấp Tướng", en: "+1 Hero Level Cap" },
                  { vi: "30.00% / 90.00% / 3.00%", en: "30.00% / 90.00% / 3.00%" },
                  { vi: "36.00% / 108.00% / 4.60%", en: "36.00% / 108.00% / 4.60%" },
                  { vi: "128.50%", en: "128.50%" },
                ],
                [
                  { vi: "Lv.30", en: "Lv.30" },
                  { vi: "10,560", en: "10,560" },
                  { vi: "3,100", en: "3,100" },
                  { vi: "136 (Tích lũy: 1,920)", en: "136 (Cumulative: 1,920)" },
                  { vi: "+1 Cấp Tướng", en: "+1 Hero Level Cap" },
                  { vi: "45.00% / 135.00% / 4.00%", en: "45.00% / 135.00% / 4.00%" },
                  { vi: "54.00% / 162.00% / 6.20%", en: "54.00% / 162.00% / 6.20%" },
                  { vi: "143.50%", en: "143.50%" },
                ],
                [
                  { vi: "Lv.40 ★ (2 Sao)", en: "Lv.40 ★ (2★)" },
                  { vi: "16,440", en: "16,440" },
                  { vi: "3,700", en: "3,700" },
                  { vi: "176 (Tích lũy: 3,500)", en: "176 (Cumulative: 3,500)" },
                  { vi: "+2 Cấp Tướng", en: "+2 Hero Level Cap" },
                  { vi: "60.00% / 180.00% / 4.00%", en: "60.00% / 180.00% / 4.00%" },
                  { vi: "72.00% / 216.00% / 7.80%", en: "72.00% / 216.00% / 7.80%" },
                  { vi: "158.50%", en: "158.50%" },
                ],
                [
                  { vi: "Lv.50", en: "Lv.50" },
                  { vi: "23,500", en: "23,500" },
                  { vi: "4,300", en: "4,300" },
                  { vi: "216 (Tích lũy: 5,480)", en: "216 (Cumulative: 5,480)" },
                  { vi: "+2 Cấp Tướng", en: "+2 Hero Level Cap" },
                  { vi: "75.00% / 225.00% / 5.50%", en: "75.00% / 225.00% / 5.50%" },
                  { vi: "90.00% / 270.00% / 9.40%", en: "90.00% / 270.00% / 9.40%" },
                  { vi: "173.50%", en: "173.50%" },
                ],
                [
                  { vi: "Lv.60 ★ (3 Sao)", en: "Lv.60 ★ (3★)" },
                  { vi: "31,800", en: "31,800" },
                  { vi: "4,900", en: "4,900" },
                  { vi: "80 (Lv.57 — Tích lũy: 6,080)", en: "80 (Lv.57 — Cumulative: 6,080)" },
                  { vi: "+3 Cấp Tướng", en: "+3 Hero Level Cap" },
                  { vi: "90.00% / 270.00% / 5.50%", en: "90.00% / 270.00% / 5.50%" },
                  { vi: "93.60%+ / 280.80%+ / 10.60%", en: "93.60%+ / 280.80%+ / 10.60%" },
                  { vi: "175.00%", en: "175.00%" },
                ],
                [
                  { vi: "Lv.70", en: "Lv.70" },
                  { vi: "41,280", en: "41,280" },
                  { vi: "5,500", en: "5,500" },
                  { vi: "- (Tích lũy: 6,080)", en: "- (Cumulative: 6,080)" },
                  { vi: "+3 Cấp Tướng", en: "+3 Hero Level Cap" },
                  { vi: "105.00% / 315.00% / 7.00%", en: "105.00% / 315.00% / 7.00%" },
                  { vi: "11.40% Damage Increase", en: "11.40% Damage Increase" },
                  { vi: "175.00%", en: "175.00%" },
                ],
                [
                  { vi: "Lv.80 ★ (4 Sao)", en: "Lv.80 ★ (4★)" },
                  { vi: "50,880", en: "50,880" },
                  { vi: "6,200", en: "6,200" },
                  { vi: "- (Tích lũy: 6,080)", en: "- (Cumulative: 6,080)" },
                  { vi: "+4 Cấp Tướng", en: "+4 Hero Level Cap" },
                  { vi: "120.00% / 360.00% / 7.00%", en: "120.00% / 360.00% / 7.00%" },
                  { vi: "12.60% Damage Increase", en: "12.60% Damage Increase" },
                  { vi: "175.00%", en: "175.00%" },
                ],
                [
                  { vi: "Lv.90", en: "Lv.90" },
                  { vi: "60,480", en: "60,480" },
                  { vi: "6,800", en: "6,800" },
                  { vi: "- (Tích lũy: 6,080)", en: "- (Cumulative: 6,080)" },
                  { vi: "+4 Cấp Tướng", en: "+4 Hero Level Cap" },
                  { vi: "135.00% / 405.00% / 9.00%", en: "135.00% / 405.00% / 9.00%" },
                  { vi: "118.80% / 356.40% / 13.00%", en: "118.80% / 356.40% / 13.00%" },
                  { vi: "175.00%", en: "175.00%" },
                ],
                [
                  { vi: "Lv.100 ★ (5 Sao)", en: "Lv.100 ★ (5★)" },
                  { vi: "70,080", en: "70,080" },
                  { vi: "7,400", en: "7,400" },
                  {
                    vi: "266 (Lv.91 — Tổng: 6,346 Ấn)",
                    en: "266 (Lv.91 — Total: 6,346 Seals)",
                  },
                  { vi: "+5 Cấp Tướng", en: "+5 Hero Level Cap" },
                  { vi: "150.00% / 450.00% / 9.00%", en: "150.00% / 450.00% / 9.00%" },
                  { vi: "13.80% Damage Increase", en: "13.80% Damage Increase" },
                  { vi: "175.00%", en: "175.00%" },
                ],
                [
                  { vi: "Lv.120", en: "Lv.120" },
                  { vi: "89,280", en: "89,280" },
                  { vi: "8,600", en: "8,600" },
                  { vi: "- (Tổng: 6,346 Ấn)", en: "- (Total: 6,346 Seals)" },
                  { vi: "+5 ➔ +6 Cấp Tướng", en: "+5 ➔ +6 Hero Level Cap" },
                  { vi: "180.00% / 540.00% / 11.00%", en: "180.00% / 540.00% / 11.00%" },
                  { vi: "14.20% Damage Increase", en: "14.20% Damage Increase" },
                  { vi: "175.00%", en: "175.00%" },
                ],
                [
                  { vi: "Lv.150 (Kịch trần)", en: "Lv.150 (Max Cap)" },
                  {
                    vi: "141,000 (Tổng: 4,648,680)",
                    en: "141,000 (Total: 4,648,680)",
                  },
                  {
                    vi: "9,000 (Tổng: 69,000)",
                    en: "9,000 (Total: 69,000)",
                  },
                  {
                    vi: "Tổng: 6,346 Ấn Giao Ước",
                    en: "Total: 6,346 Covenant Seals",
                  },
                  { vi: "+9 Cấp Tướng", en: "+9 Hero Level Cap" },
                  {
                    vi: "210.00% ATK / 630.00% HP / 15.00% DR",
                    en: "210.00% ATK / 630.00% HP / 15.00% DR",
                  },
                  {
                    vi: "Tối đa hóa sát thương toàn đội",
                    en: "Maximizes full-lineup combat damage",
                  },
                  { vi: "175.00%", en: "175.00%" },
                ],
              ],
            },
          ],
        },
        {
          id: "sub-4-3-pets-behemoth-event-dump-schedule",
          title: {
            vi: "4.3. Sơ Đồ Phân Luồng Lọc Phôi & Bảng Điểm Sự Kiện (Pets Development vs GAR Day 5 vs Top Lord Stage 5)",
            en: "4.3. Fodder Filtering Flowchart & Event Scoring Matrix (Pets Development vs. GAR Day 5 vs. Top Lord Stage 5)",
          },
          badge: {
            vi: "LỊCH XẢ DOUBLE-DIP",
            en: "DOUBLE-DIP SCHEDULE",
          },
          blocks: [
            {
              type: "visual_diagram",
              mediaCode: "MED-6.3-03",
              variant: "decision_flow",
              title: {
                vi: "Sơ Đồ Quyết Định: Lọc Phôi Chuồng Thú & Chọn Cửa Sổ Xả Double-Dip (MED-6.3-03)",
                en: "Decision Flow: Kennel Fodder Filtering & Double-Dip Dump Windows (MED-6.3-03)",
              },
              subtitle: {
                vi: "Tách biệt rõ nguồn thu hồi Pet Food, phôi khóa cứng Same Pet và lịch xả Pet (Thứ Sáu Tuần B) vs Behemoth (Thứ Ba/Tư/Bảy Tuần B)",
                en: "Strictly separate Pet Food recycling, locked Same Pet copies, and Friday Week B Pet dumps vs. Tue/Wed/Sat Behemoth dumps",
              },
              centerNode: {
                id: "node-pet-behemoth-hub",
                badge: {
                  vi: "CHUỒNG THÚ (S1+) & HANG CỰ THÚ (S3+)",
                  en: "PET KENNEL (S1+) & BEHEMOTH DEN (S3+)",
                },
                title: {
                  vi: "Ấp Trứng 24/7 & Săn Mine Vein / Frostfield Hàng Tuần",
                  en: "24/7 Egg Hatching & Weekly Mine Vein / Frostfield Farming",
                },
                subtitle: {
                  vi: "Phân loại 100% Pet mới nở và tích trữ nguyên liệu chờ đúng ngày sự kiện",
                  en: "Classify 100% of newly hatched Pets and stockpile all upgrade materials for event windows",
                },
                tone: "gold",
              },
              branches: [
                {
                  title: {
                    vi: "Nhánh 1: Quy Hoạch Phôi Thú Cưng (Uncommon vs Same vs Any)",
                    en: "Branch 1: Kennel Fodder Classification (Uncommon vs. Same vs. Any)",
                  },
                  badge: {
                    vi: "BẢO TOÀN 58 SAME",
                    en: "PROTECT 58 SAME",
                  },
                  tone: "emerald",
                  steps: [
                    {
                      id: "step-pet-release-uncommon",
                      title: {
                        vi: "Phóng Sinh (Release) Pet Lục (Uncommon) Dư Thừa",
                        en: "Release Surplus Uncommon Pets for Pet Food",
                      },
                      subtitle: {
                        vi: "Giữ 1 bản mở sổ sưu tập, phóng sinh toàn bộ bản sao Uncommon lấy Pet Food nuôi Pet chính",
                        en: "Keep 1 copy for collection bonds, then release all extra Uncommon copies into Pet Food",
                      },
                      tone: "emerald",
                    },
                    {
                      id: "step-pet-lock-same-and-any",
                      title: {
                        vi: "Khóa Cứng Bản Sao Cùng Tên (44 Same Lv.90 / 58 Same Lv.120)",
                        en: "Lock Identical Same Copies (44 Same Lv.90 / 58 Same Lv.120)",
                      },
                      subtitle: {
                        vi: "Khóa Eggy/Sparrow, Tiggy/Howli/Flickerkit hoặc Cactini/Bear/Candy Boo; giữ Rare/Epic khác hệ làm 161 ➔ 211 Any Fodder",
                        en: "Lock Eggy/Sparrow, Tiggy/Howli/Flickerkit, or Cactini/Bear/Candy Boo; save off-faction Rare/Epic as 161 ➔ 211 Any Fodder",
                      },
                      tone: "gold",
                    },
                  ],
                  outcome: {
                    vi: "Sẵn sàng 596,600 Food + 44 Same + 161 Any cho mốc Lv.90 (0 Essence) và 714,000 Food + 40,050 Essence + 58 Same + 211 Any cho Mythic Lv.120.",
                    en: "Secures 596,600 Food + 44 Same + 161 Any for Lv.90 (0 Essence) and 714,000 Food + 40,050 Essence + 58 Same + 211 Any for Mythic Lv.120.",
                  },
                },
                {
                  title: {
                    vi: "Nhánh 2: Cửa Sổ Xả Thú Cưng (Thứ Sáu Tuần B / Thứ Hai–Ba Tuần A)",
                    en: "Branch 2: Pet Dump Window (Friday Week B / Mon–Tue Week A)",
                  },
                  badge: {
                    vi: "GAR DAY 5 / KVK STAGE 5–6",
                    en: "GAR DAY 5 / KVK STAGE 5–6",
                  },
                  tone: "gold",
                  steps: [
                    {
                      id: "step-pet-friday-food-dump",
                      title: {
                        vi: "Xả 100% Pet Food (960đ / 100 Food) & Pet Essence (480đ / 1 Essence)",
                        en: "Dump 100% Pet Food (960 pts / 100 Food) & Pet Essence (480 pts / 1 Essence)",
                      },
                      subtitle: {
                        vi: "Đợi đúng Thứ Sáu Tuần B (GAR Ngày 5 / KvK Stage 5–6 / Top Lord Stage 5) hoặc Thứ Hai–Thứ Ba Tuần A (Pets Development)",
                        en: "Wait strictly for Friday Week B (GAR Day 5 / KvK Stage 5–6 / Top Lord Stage 5) or Mon–Tue Week A (Pets Development)",
                      },
                      tone: "gold",
                    },
                    {
                      id: "step-pet-friday-promote",
                      title: {
                        vi: "Đột Phá Phẩm Chất Pet (6,000 / 18,000 / 36,000 Điểm)",
                        en: "Execute Pet Promotions (6,000 / 18,000 / 36,000 Points)",
                      },
                      subtitle: {
                        vi: "Tiến hóa bậc Rare / Epic / Legendary ngay trong ngày sự kiện để bùng nổ điểm rương mốc",
                        en: "Trigger Rare / Epic / Legendary tier promotions during the active event window for massive milestone bursts",
                      },
                      tone: "emerald",
                    },
                  ],
                  outcome: {
                    vi: "Mở khóa điểm gãy Lv.45 Epic (+35.70% ATK / +52.50% HP), Lv.75 Legendary (+66.30% / +97.50%) & Lv.90 (+81.60% / +120.00%).",
                    en: "Unlocks Lv.45 Epic (+35.70% ATK / +52.50% HP), Lv.75 Legendary (+66.30% / +97.50%), and Lv.90 (+81.60% / +120.00%) breakpoints.",
                  },
                },
                {
                  title: {
                    vi: "Nhánh 3: Cửa Sổ Xả Cự Thú Behemoth (Thứ Ba / Tư / Bảy Tuần B)",
                    en: "Branch 3: Behemoth Dump Window (Tue / Wed / Sat Week B)",
                  },
                  badge: {
                    vi: "2,000Đ / 1 ẤN GIAO ƯỚC",
                    en: "2,000 PTS / 1 COVENANT SEAL",
                  },
                  tone: "emerald",
                  steps: [
                    {
                      id: "step-behemoth-covenant-seals",
                      title: {
                        vi: "Xả Ấn Giao Ước (2,000đ / 1 Seal) & Magic Core (40đ / 1 Core)",
                        en: "Spend Covenant Seals (2,000 pts / 1 Seal) & Magic Core (40 pts / 1 Core)",
                      },
                      subtitle: {
                        vi: "Đẩy Giao ước (tổng 6,346 Ấn) và Đột phá Sao ở các mốc Lv.20 (750 Ấn), Lv.40 (3,500 Ấn), Lv.60 (6,080 Ấn)",
                        en: "Advance Covenant nodes (6,346 total Seals) and Star gates at Lv.20 (750 Seals), Lv.40 (3,500 Seals), and Lv.60 (6,080 Seals)",
                      },
                      tone: "emerald",
                    },
                    {
                      id: "step-behemoth-magicite-dump",
                      title: {
                        vi: "Xả Đá Ma Tinh (400đ / 400 Magicite) Cán Mốc Chẵn 20 Cấp",
                        en: "Spend Magicite (400 pts / 400 Magicite) to Hit 20-Level Caps",
                      },
                      subtitle: {
                        vi: "Mở khóa liên tiếp +1 ➔ +9 Trần Cấp Độ Tướng (Hero Level Cap) và 175.00% Conversion Rate",
                        en: "Unlock sequential +1 ➔ +9 Hero Level Cap expansions and the 175.00% Conversion Rate ceiling",
                      },
                      tone: "gold",
                    },
                  ],
                  outcome: {
                    vi: "Mở rộng Hero Level Cap +1 ➔ +9 cho toàn bộ tướng và nhận tới 210.00% ATK / 630.00% HP / 15.00% Damage Reduction.",
                    en: "Expands Hero Level Cap by +1 ➔ +9 across all heroes and grants up to 210.00% ATK / 630.00% HP / 15.00% Damage Reduction.",
                  },
                },
              ],
            },
            {
              type: "table",
              caption: {
                vi: "Bảng 4: Bảng Điểm & Lịch Xả Thức Ăn Pet & Nguyên Liệu Cự Thú (Tab KvK & GAR & TOP)",
                en: "Table 4: Pets & Behemoth Event Scoring Matrix (Tab KvK & GAR & TOP)",
              },
              headers: [
                {
                  vi: "Nguyên Liệu / Hành Động",
                  en: "Material / Upgrade Action",
                },
                {
                  vi: "Sự Kiện Phụ Pets Development (Thứ Hai – Thứ Ba Tuần A)",
                  en: "Pets Development Sub-Event (Mon – Tue Week A)",
                },
                {
                  vi: "GAR Ngày 5 (Thứ Sáu) & KvK Stage 5–6 (Tuần B — Đua Vũ Trang)",
                  en: "GAR Day 5 (Friday) & KvK Stage 5–6 (Week B — Arms Race)",
                },
                {
                  vi: "Top Lord Stage 5 (Pet Enhancement)",
                  en: "Top Lord Stage 5 (Pet Enhancement)",
                },
              ],
              rows: [
                [
                  {
                    vi: "Tiêu thụ 100 Pet Food (Thức ăn Thú cưng)",
                    en: "Consume 100 Pet Food",
                  },
                  { vi: "30 điểm", en: "30 pts" },
                  {
                    vi: "960 điểm (hoặc 400–600 điểm tùy bảng)",
                    en: "960 pts (or 400–600 pts by bracket)",
                  },
                  {
                    vi: "600 điểm (6 điểm / 1 Pet Food)",
                    en: "600 pts (6 pts / 1 Pet Food)",
                  },
                ],
                [
                  {
                    vi: "Tiêu thụ 1 Pet Essence (Tinh chất Thú cưng)",
                    en: "Consume 1 Pet Essence",
                  },
                  { vi: "15 điểm", en: "15 pts" },
                  {
                    vi: "480 điểm (hoặc 200–300 điểm)",
                    en: "480 pts (or 200–300 pts)",
                  },
                  { vi: "300 điểm", en: "300 pts" },
                ],
                [
                  {
                    vi: "Tiến hóa 1 Pet (Rare / Epic / Legendary Promotion)",
                    en: "Pet Promotion (Rare / Epic / Legendary)",
                  },
                  {
                    vi: "150 điểm (Uncommon) / 900 điểm (Rare)",
                    en: "150 pts (Uncommon) / 900 pts (Rare)",
                  },
                  {
                    vi: "6,000 / 18,000 / 36,000 điểm",
                    en: "6,000 / 18,000 / 36,000 pts",
                  },
                  {
                    vi: "6,000 / 18,000 / 36,000 điểm",
                    en: "6,000 / 18,000 / 36,000 pts",
                  },
                ],
                [
                  {
                    vi: "Tiêu thụ 400 Magicite (Đá Ma Tinh Cự Thú)",
                    en: "Consume 400 Magicite (Behemoth)",
                  },
                  {
                    vi: "1 điểm (hoặc 6 điểm ngày Hero)",
                    en: "1 pt (or 6 pts on Hero day)",
                  },
                  {
                    vi: "400 điểm (1 điểm / 1 Magicite ngày T3/T4/T7)",
                    en: "400 pts (1 pt / 1 Magicite on Tue/Wed/Sat)",
                  },
                  {
                    vi: "400 điểm (1 điểm / 1 Magicite)",
                    en: "400 pts (1 pt / 1 Magicite)",
                  },
                ],
                [
                  {
                    vi: "Tiêu thụ 1 Magic Core (Lõi Ma Thuật Cự Thú)",
                    en: "Consume 1 Magic Core (Behemoth)",
                  },
                  { vi: "0.5 điểm", en: "0.5 pts" },
                  { vi: "40 điểm", en: "40 pts" },
                  { vi: "40 điểm", en: "40 pts" },
                ],
                [
                  {
                    vi: "Tiêu thụ 1 Covenant Seal / Scroll Seal (Ấn Giao Ước)",
                    en: "Consume 1 Covenant Seal / Scroll Seal",
                  },
                  { vi: "30 điểm", en: "30 pts" },
                  { vi: "2,000 điểm", en: "2,000 pts" },
                  { vi: "2,000 điểm", en: "2,000 pts" },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: "sec-5-s3-tiggy-and-behemoth-lv20-case-study",
      isPro: true,
      title: {
        vi: "5. Phân Tích Thực Chiến Nâng Cao: Đột Phá Tiggy Lv.75 ➔ Lv.90 (228,000 Pet Food) & Behemoth Lv.20 (1★ = 750 Ấn) Trong Tuần B GAR (PRO)",
        en: "5. Advanced Tactical Case Study: Pushing Tiggy Lv.75 ➔ Lv.90 (228,000 Pet Food) & Behemoth Lv.20 (1★ = 750 Seals) in Week B GAR (PRO)",
      },
      blocks: [
        {
          type: "case_study",
          badge: {
            vi: "CASE STUDY #6.3 • SEASON 3 HORDE QUEUE 1 (52M POWER)",
            en: "CASE STUDY #6.3 • SEASON 3 HORDE QUEUE 1 (52M POWER)",
          },
          title: {
            vi: "Tài Khoản Season 3 Đội 1 Thuần Bộ Lạc (52M Lực Chiến): Xả 228,000 Pet Food Đẩy Tiggy Lên Lv.90 & Đột Phá Behemoth Lv.20 (1★)",
            en: "Season 3 Pure Horde Queue 1 (52M Power): Dumping 228,000 Pet Food for Tiggy Lv.90 & Breaking Through Behemoth Lv.20 (1★)",
          },
          profileSummary: {
            vi: "• **Hồ sơ:** Đội 1 Thuần Bộ Lạc (`52M` Lực chiến) có `Tiggy` ở `Lv.75` (`368,600` Food, `+66.30%` ATK / `+97.50%` HP; hoặc đầu S3 dàn trải Tiggy Lv.32 + Eggy Lv.28 ở `+20.40%` / `+30.00%` với `60,300` Food).\n• **Tồn kho:** Đang găm `228,000` Pet Food, đủ phôi `Same + Any` (tích lũy `44` Same + `161` Any cho `Lv.90`), cùng `45,000` Magicite, `2,100` Magic Core và `800` Ấn Giao Ước (`Covenant Seals`).",
            en: "• **Profile:** Pure Horde Queue 1 (`52M` Power) has `Tiggy` at `Lv.75` (`368,600` Food, `+66.30%` ATK / `+97.50%` HP; or early-S3 diluted Tiggy Lv.32 + Eggy Lv.28 at `+20.40%` / `+30.00%` with `60,300` Food).\n• **Stockpile:** Holds `228,000` Pet Food, sufficient `Same + Any` fodder (`44` Same + `161` Any cumulative for `Lv.90`), plus `45,000` Magicite, `2,100` Magic Core, and `800` `Covenant Seals`.",
          },
          metrics: [
            {
              label: {
                vi: "Cấp Độ & Chỉ Số 3x Hệ Bộ Lạc Của Tiggy",
                en: "Tiggy Level & 3x Horde Faction Buff",
              },
              before: {
                vi: "Lv.75 Legendary (368,600 Food | +66.30% ATK / +97.50% HP | 84.00% Conv)",
                en: "Lv.75 Legendary (368,600 Food | +66.30% ATK / +97.50% HP | 84.00% Conv)",
              },
              after: {
                vi: "Lv.90 Legendary +3 (596,600 Food | +81.60% ATK / +120.00% HP | 96.00% Conv)",
                en: "Lv.90 Legendary +3 (596,600 Food | +81.60% ATK / +120.00% HP | 96.00% Conv)",
              },
              delta: {
                vi: "Xả 228,000 Pet Food (0 Essence) ➔ +2,188,800 điểm GAR Thứ Sáu",
                en: "Dumped 228,000 Pet Food (0 Essence) ➔ +2,188,800 Friday GAR pts",
              },
            },
            {
              label: {
                vi: "Đột Phá Cự Thú (Behemoth Season 3)",
                en: "Season 3 Behemoth Breakthrough",
              },
              before: {
                vi: "Lv.1–8 (0 Sao | +0 Cấp Tướng | Chưa kích hoạt DR%)",
                en: "Lv.1–8 (0★ | +0 Hero Level Cap | Unactivated DR%)",
              },
              after: {
                vi: "Lv.20 (1★ | +1 Hero Level Cap | +30.00% ATK / +90.00% HP / 3.00% DR)",
                en: "Lv.20 (1★ | +1 Hero Level Cap | +30.00% ATK / +90.00% HP / 3.00% DR)",
              },
              delta: {
                vi: "5,880 Magicite + 1,500 Magic Core + 750 Ấn = 1,500,000 điểm sự kiện",
                en: "5,880 Magicite + 1,500 Magic Core + 750 Seals = 1,500,000 event pts",
              },
            },
            {
              label: {
                vi: "Tổng Sức Mạnh Thực Chiến & Điểm GAR Tuần B",
                en: "Total Real Combat Power & Week B GAR Score",
              },
              before: {
                vi: "52.0M Lực chiến (Kẹt trần cấp tướng & thiếu 3x Faction Buff Lv.90)",
                en: "52.0M Power (Hero level cap locked & missing Lv.90 3x Faction Buff)",
              },
              after: {
                vi: "55.8M Lực chiến (+1 Cấp Tướng cho cả 6 tướng Đội 1 Bộ Lạc)",
                en: "55.8M Power (+1 Hero Level Cap across all 6 Horde Queue 1 heroes)",
              },
              delta: {
                vi: "+3,800,000 Lực chiến thực & 2,150,000 ➔ 3,790,000+ tổng điểm GAR",
                en: "+3,800,000 real combat power & 2,150,000 ➔ 3,790,000+ total GAR pts",
              },
            },
          ],
          diagnostics: [
            {
              vi: "**Chẩn đoán 1 (Hao hụt phôi Same Pet):** Chia `Pet Food` cho `Eggy`/Uncommon hoặc làm mất bản sao `Tiggy` khiến thiếu `12` bản Same từ Lv.75 lên Lv.90 (tích lũy `44` Same + `161` Any) để mở trần cấp `105`.",
              en: "**Diagnostic 1 (Same-Pet Fodder Depletion):** Splitting `Pet Food` into `Eggy`/Uncommon or feeding `Tiggy` copies as Any fodder prevents gathering the `12` Same copies needed from Lv.75 to Lv.90 (`44` Same + `161` Any).",
            },
            {
              vi: "**Chẩn đoán 2 (Nút cổ chai Cự Thú S3):** Găm `45,000` Magicite, `2,100` Magic Core và `800` Ấn Giao Ước nhưng chưa mở `Lv.20` (`1★`), làm 6 tướng Bộ Lạc mất `+1` **Hero Level Cap** và `3.00%` DR.",
              en: "**Diagnostic 2 (Season 3 Behemoth Bottleneck):** Sitting on `45,000` Magicite, `2,100` Magic Core, and `800` Covenant Seals without hitting `Lv.20` (`1★`) costs all 6 Horde heroes `+1` **Hero Level Cap** and `3.00%` DR.",
            },
          ],
          recoverySteps: [
            {
              stepNumber: "1",
              title: {
                vi: "Đóng Băng Mọi Pet Phụ & Khóa Cứng Kho Phôi Tiggy (44 Same + 161 Any)",
                en: "Freeze All Secondary Pets & Lock the Tiggy Fodder Pool (44 Same + 161 Any)",
              },
              detail: {
                vi: "• Ngưng hoàn toàn việc đút `Pet Food` cho `Eggy` và Pet `Uncommon` (tránh mất oan `596,850` Food + `3,525` Essence).\n• Khóa chặt toàn bộ bản sao `Tiggy` (`Same`), gom Pet Rare/Epic khác hệ làm phôi lót (`Any`) cho 3 lần đột phá `Legendary +1` (Lv.80), `Legendary +2` (Lv.85) và `Legendary +3` (Lv.90).",
                en: "• Immediately halt feeding `Eggy` and `Uncommon` pets (avoiding the `596,850` Food + `3,525` Essence trap).\n• Lock all identical `Tiggy` (`Same`) copies and consolidate off-faction Rare/Epic pets as generic `Any` fodder for `Legendary +1` (Lv.80), `Legendary +2` (Lv.85), and `Legendary +3` (Lv.90).",
              },
              impactBadge: {
                vi: "KHÓA 44 SAME + 161 ANY",
                en: "LOCK 44 SAME + 161 ANY",
              },
            },
            {
              stepNumber: "2",
              title: {
                vi: "Thứ Ba / Thứ Tư Tuần B: Đột Phá Cự Thú Chạm Điểm Gãy Lv.20 (1★ = +1 Hero Level Cap)",
                en: "Tuesday / Wednesday Week B: Push Behemoth to Lv.20 Breakpoint (1★ = +1 Hero Level Cap)",
              },
              detail: {
                vi: "• Xả `5,880+` Magicite, `1,500` Magic Core và `750` Ấn Giao Ước (`Covenant Seals`) đưa Behemoth chạm đúng Điểm gãy `Lv.20` (`1★`).\n• Riêng `750` Ấn Giao Ước (`× 2,000` điểm) mang về `1,500,000` điểm sự kiện, mở khóa `+1` **Hero Level Cap**, `+30.00%` ATK / `+90.00%` HP / `3.00%` DR và `+36.00%` ATK / `+108.00%` HP xuất trận!",
                en: "• Spend `5,880+` Magicite, `1,500` Magic Core, and `750` `Covenant Seals` to bring the Behemoth to the exact `Lv.20` (`1★`) breakpoint.\n• The `750` Covenant Seals (`× 2,000` pts) generate `1,500,000` event points while unlocking `+1` **Hero Level Cap**, `+30.00%` ATK / `+90.00%` HP / `3.00%` DR, and `+36.00%` / `+108.00%` Deploy Bonus!",
              },
              impactBadge: {
                vi: "750 ẤN = 1,500,000 ĐIỂM + 1 CẤP TƯỚNG",
                en: "750 SEALS = 1,500,000 PTS + 1 HERO CAP",
              },
            },
            {
              stepNumber: "3",
              title: {
                vi: "Thứ Sáu Tuần B (GAR Day 5): Xả 228,000 Pet Food Đẩy Tiggy Từ Lv.75 Lên Lv.90 (Legendary +3)",
                en: "Friday Week B (GAR Day 5): Dump 228,000 Pet Food to Push Tiggy from Lv.75 to Lv.90 (Legendary +3)",
              },
              detail: {
                vi: "• Thứ Sáu Tuần B (`GAR Ngày 5` / `KvK Stage 5–6`), xả `228,000` Pet Food (`960` điểm / `100` Food = `2,188,800` điểm GAR, `0` Essence) kéo `Tiggy` từ `Lv.75` (`368,600` Food) lên `Lv.90` (`596,600` Food).\n• Với tài khoản đầu S3 ở Lv.32, xả `60,300` Pet Food cán mốc `Lv.45 Epic` (`98,550` Food) và thu về hơn `2,150,000` điểm GAR.",
                en: "• On Friday Week B (`GAR Day 5` / `KvK Stage 5–6`), dump `228,000` Pet Food (`960` pts / `100` Food = `2,188,800` GAR pts, `0` Essence) to push `Tiggy` from `Lv.75` (`368,600` Food) to `Lv.90` (`596,600` Food).\n• For early-S3 accounts at Lv.32, spending `60,300` Pet Food hits `Lv.45 Epic` (`98,550` Food) and nets over `2,150,000` total GAR points.",
              },
              impactBadge: {
                vi: "2,188,800 ĐIỂM GAR • +81.60% ATK / +120.00% HP",
                en: "2,188,800 GAR PTS • +81.60% ATK / +120.00% HP",
              },
            },
          ],
          conclusion: {
            vi: "• **Kết quả định lượng:** Chỉ số `3x` từ `Tiggy` cho 6 tướng Bộ Lạc Đội 1 vọt lên `+81.60%` Hero ATK / `+120.00%` Hero HP (`96.00%` Conversion Rate).\n• Kết hợp cùng `Behemoth Lv.20` (`1★`) mở rộng `+1` **Hero Level Cap**, tổng lực chiến thực tăng `+3,800,000` (`52.0M ➔ 55.8M`) và gom trọn toàn bộ rương mốc GAR / KvK!",
            en: "• **Quantitative Result:** `Tiggy`'s `3x` Horde buff for all 6 Queue 1 heroes surges to `+81.60%` Hero ATK / `+120.00%` Hero HP (at `96.00%` Conversion Rate).\n• Combined with `Behemoth Lv.20` (`1★`) expanding `+1` **Hero Level Cap**, real combat power jumps `+3,800,000` (`52.0M ➔ 55.8M`) while sweeping every GAR / KvK milestone chest!",
          },
        },
        {
          type: "media_spotlight",
          mediaCode: "MED-6.3-04",
          tier: "tier4_youtube_ref",
          title: {
            vi: "Video Tham Chiếu Quốc Tế: Lộ Trình Nuôi Thú Cưng 3 Phe & Cự Thú Season 3 (MED-6.3-04)",
            en: "International Video Reference: 3-Faction Pets & Season 3 Behemoth Progression Guide (MED-6.3-04)",
          },
          description: {
            vi: "Hướng dẫn trực quan cách ấp trứng tối ưu ở Season 1, quy tắc khóa phôi Same vs Any đến mốc Lv.90 (596,600 Food) / Mythic Lv.120 (714,000 Food + 40,050 Essence), mẹo đánh Mine Vein Battle & Frostfield Battle gom 6,346 Ấn Giao Ước và đột phá Hero Level Cap +1 ➔ +9 ở Season 3.",
            en: "Visual walkthrough covering optimal Season 1 egg hatching, locking Same vs. Any fodder up to Lv.90 (596,600 Food) / Mythic Lv.120 (714,000 Food + 40,050 Essence), farming 6,346 Covenant Seals in Mine Vein & Frostfield Battles, and unlocking +1 ➔ +9 Hero Level Cap in Season 3.",
          },
          videoChannel: "@T.H.S.G-Official",
          videoTitle: "Top Heroes: Pets & Season 3 Behemoth Complete Progression Guide",
          videoTimestamp: "01:45 – 09:20",
          videoUrl: "https://www.youtube.com/results?search_query=Top+Heroes+Pets+and+Behemoth+Guide",
        },
      ],
    },
  ],
};

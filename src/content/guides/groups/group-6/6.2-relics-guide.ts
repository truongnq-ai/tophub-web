import type { GuideArticle } from "../../types";

export const ARTICLE_6_2_RELICS_GUIDE: GuideArticle = {
  code: "6.2",
  slug: "relics-guide",
  categorySlug: "power-systems",
  badge: "HOT",
  readingMinutes: 11,
  title: {
    vi: "Cẩm Nang Thánh Vật (Relics Trio): Phối Bộ 3 Phe Phái & Bảng Chi Phí Đột Phá Sao",
    en: "Relics Master Guide (Relics Trio): 3-Faction BiS Loadouts & Star Progression Tables",
  },
  summary: {
    vi: "Giải mã cơ chế 3 Ô Thánh Vật (Tấn công / Phòng thủ & Khống chế / Hỗ trợ & Hồi phục), sự khác biệt giữa Kỹ năng Kích hoạt và Chỉ số Sở hữu Toàn cục, quy luật Áp Chế Sao -50% (Star Rating Suppression), cấu hình BiS cho cả 3 Phe phái, phân định cộng hưởng +1 giây (1s) vs Sustain, bảng chi phí 20 cấp Sao từ TopHeroes Tables (Tab Relics) và lịch xả Ngày 1–2 Kỳ GAR/KvK.",
    en: "Complete guide to the 3 Relic slots (Offense / Defense & CC / Support & Healing), Active Combat Skills vs Owned Passive Stats, the -50% Star Rating Suppression rule, BiS Relic Loadouts for all 3 Factions, +1s duration synergy vs Sustain relics, 20-level Star upgrade cost tables from TopHeroes Tables (Tab Relics), and Day 1–2 GAR/KvK event dumping.",
  },
  tldr: {
    coreRule: {
      vi: "**Chỉ Số Sở Hữu Toàn Cục & Quy Luật Áp Chế Sao `-50%` (Star Rating Suppression):**\n• Mọi Thánh Vật trong `Relic Hall` cộng **Owned Passive Stats** toàn cục: **Rare** `4,810` mảnh (`+6.00%` ATK / `+12.00%` HP), **Epic** `3,130` mảnh (`+12.00%` / `+24.00%`).\n• **Legendary Relic** chỉ cần `1,800` mảnh đạt Max `20★` nhưng cộng tới `+20.00%` Hero ATK / `+40.00%` Hero HP.\n• Nếu tổng Sao của **3 Thánh Vật Vàng (Legendary)** trên đội hình cao hơn đối thủ dù chỉ `1★`, toàn bộ sát thương, hồi máu và hiệu lực Thánh Vật địch bị cắt giảm `-50%`!",
      en: "**Global Owned Passive Stats & `-50%` Star Rating Suppression Rule:**\n• Every Relic in the `Relic Hall` grants **Owned Passive Stats**: **Rare** `4,810` shards (`+6.00%` ATK / `+12.00%` HP), **Epic** `3,130` shards (`+12.00%` / `+24.00%`).\n• **Legendary Relics** require only `1,800` shards for Max `20★` yet grant `+20.00%` Hero ATK / `+40.00%` Hero HP.\n• If your team's total **Legendary Relic** star rating exceeds the enemy's by even `1★`, all enemy relic damage, healing, and durations are halved (`-50%`)!",
    },
    immediateAction: {
      vi: "**Kiểm Toán 3 Ô Thánh Vật (Relics Trio) & Đẩy Điểm Gãy Sao Vàng Đội 1:**\n• Đeo đủ **3 Thánh Vật Vàng (Legendary)** khớp bộ cộng hưởng của Phe chủ lực: Bộ Lạc (`Dragon's Might`), Liên Minh (`Arcane Vault`), hoặc Thiên Nhiên (`Oath of the Sacred Forest`).\n• Dồn mảnh Vàng chạm các điểm gãy ROI: **Bậc 1 - Sao 5** (`5★` = `130` mảnh, `+1.60%` ATK / `+3.20%` HP) và **Bậc 2 - Sao 3** (`330` mảnh, `+4.00%` ATK / `+8.00%` HP).\n• Tiếp tục đẩy lên **Bậc 2 - Sao 5** (`10★` = `490` mảnh, `+6.00%` ATK / `+12.00%` HP) và **Bậc 3 - Sao 5** (`15★` = `1,100` mảnh).",
      en: "**Audit Queue 1's 3 Active Relic Slots (Relics Trio) & Hit Legendary Breakpoints:**\n• Equip **3 Legendary Relics** matching your main faction's synergy set: Horde (`Dragon's Might`), League (`Arcane Vault`), or Nature (`Oath of the Sacred Forest`).\n• Push your core trio to the golden ROI breakpoints: **Tier 1 - Star 5** (`5★` = `130` shards, `+1.60%` ATK / `+3.20%` HP) and **Tier 2 - Star 3** (`330` shards, `+4.00%` / `+8.00%`).\n• Advance to **Tier 2 - Star 5** (`10★` = `490` shards, `+6.00%` ATK / `+12.00%` HP) and **Tier 3 - Star 5** (`15★` = `1,100` shards).",
    },
    strictTaboo: {
      vi: "**Cấm Đeo Thánh Vật Tím Ở Đội 1 & Cấm Xả Sai Ngày Sự Kiện:**\n• **CẤM** đeo Thánh Vật Tím `5★` thay vì Vàng `2–3★` ở Đội 1 (Tím tính `0` Sao Vàng gây phạt `-50%`) và **CẤM** tiêu thụ `Relic Shards`, `Arcane Crystals`, `Wish Relic` ngày thường.\n• **Kỳ Đua Vũ Trang (GAR / KvK):** Xả vào **Ngày 1 (Thứ Hai) & Ngày 2 (Thứ Ba)** (thêm Ngày 5 Thứ Sáu riêng trong KvK, còn GAR tiêu chuẩn KHÔNG tính điểm Thánh Vật vào Ngày 5).\n• **Kỳ Thi Đấu Hội (Guild Race):** Chỉ xả vào sự kiện phụ 2 ngày `Guild Rush: Relic Hall & Relics` (**Thứ Tư – Thứ Năm**) kết hợp làm Nhiệm vụ Hội.",
      en: "**Never Equip Epics in Queue 1 & Never Dump on Non-Scoring Days:**\n• **NEVER** equip a `5★` Epic over a `2–3★` Legendary in Queue 1 (Epics count as `0` Legendary Stars, triggering `-50%` penalty) or spend `Relic Shards`, `Arcane Crystals`, or `Wish Relic` on weekdays.\n• **GAR / KvK:** Dump on **Day 1 (Monday) & Day 2 (Tuesday)** (plus Day 5 Friday exclusively in KvK; standard GAR does NOT score Relics on Day 5).\n• **Guild Race:** Only spend during the 2-day `Guild Rush: Relic Hall & Relics` sub-event (**Wednesday – Thursday**) stacked with Guild Tasks.",
    },
  },
  keyTakeaways: [
    {
      vi: "**Cấu Hình Bộ 3 Thánh Vật BiS Cho Cả 3 Phe:**\n• **Bộ Lạc (`Dragon's Might`):** #1 `Thunder Judgment` (`Frost Diadem` / `Duke's Signet Ring`) + #2 `Dragonheart` (`Scale of Injustice`) + #3 `Dragonbone Amulet` (`Eternal Wings` / `Marshal's Warhorn`).\n• **Liên Minh (`Arcane Vault`):** #1 `Petrification Staff` (`Persecution` / `Frost Diadem`) + #2 `Soul Guard Orb` (`Anti-Magic Handcuffs` / `Royalty`) + #3 `Feather of the Pact` (`Eternal Wings` / `Sacred Scroll`).\n• **Thiên Nhiên (`Oath of the Sacred Forest`):** #1 `Vineborne Bow` (`Frost Diadem` / `Persecution`) + #2 `Undefeated Crown` (`Scale of Injustice`) + #3 `Sacred Scroll` (`Moonstone` / `Eternal Wings`).",
      en: "**3-Faction BiS Relic Trio Loadouts:**\n• **Horde (`Dragon's Might`):** #1 `Thunder Judgment` (`Frost Diadem` / `Duke's Signet Ring`) + #2 `Dragonheart` (`Scale of Injustice`) + #3 `Dragonbone Amulet` (`Eternal Wings` / `Marshal's Warhorn`).\n• **League (`Arcane Vault`):** #1 `Petrification Staff` (`Persecution` / `Frost Diadem`) + #2 `Soul Guard Orb` (`Anti-Magic Handcuffs` / `Royalty`) + #3 `Feather of the Pact` (`Eternal Wings` / `Sacred Scroll`).\n• **Nature (`Oath of the Sacred Forest`):** #1 `Vineborne Bow` (`Frost Diadem` / `Persecution`) + #2 `Undefeated Crown` (`Scale of Injustice`) + #3 `Sacred Scroll` (`Moonstone` / `Eternal Wings`).",
    },
    {
      vi: "**Phân Định Cộng Hưởng `+1s` vs Nhóm Phòng Thủ / Sustain:**\n• Hiệu ứng kéo dài **+1 giây (`1s`)** thời gian tác dụng thuộc về 3 Thánh Vật Khống chế/Buff cốt lõi: `Feather of the Pact`, `Dragonbone Amulet`, `Sacred Scroll`.\n• Trong khi đó, `Duke's Signet Ring`, `Soul Guard Orb` và `Moonstone` đóng vai trò là bộ 3 Thánh Vật Phòng thủ / Hồi phục (**Defensive / Sustain Relics**).",
      en: "**Exact Distinction Between `+1s` Synergy & Defensive / Sustain Relics:**\n• The **+1 second (`1s`)** duration extension synergy belongs to the 3 Core Control/Buff Relics: `Feather of the Pact`, `Dragonbone Amulet`, and `Sacred Scroll`.\n• Conversely, `Duke's Signet Ring`, `Soul Guard Orb`, and `Moonstone` serve as the 3 **Defensive / Sustain Relics**.",
    },
    {
      vi: "**Bảng 20 Cấp Sao (`4 Bậc × 5 Sao` — Tab Relics) & Điểm Sự Kiện:**\n• **Legendary Relic** chỉ cần `1,800` mảnh đạt Max `20★` (`+20.00%` ATK / `+40.00%` HP), ít hơn hẳn **Epic** (`3,130` mảnh) và **Rare** (`4,810` mảnh).\n• Điểm gãy mảnh Vàng: `5★` = `130` mảnh, Bậc 2 Sao 3 (`8★`) = `330` mảnh, `10★` = `490` mảnh, `15★` = `1,100` mảnh.\n• **GAR/KvK Ngày 1–2 (Thứ Hai–Thứ Ba):** `1` Mảnh Vàng = `5,000` điểm, `1` Mảnh Tím = `1,000` điểm, `1` Mảnh Xanh = `200` điểm, `1` Wish = `1,500` điểm, `1` Arcane Crystal = `1,200` điểm.",
      en: "**20-Level Star Progression (`4 Tiers × 5 Stars` — Tab Relics) & Event Scoring:**\n• A **Legendary Relic** requires only `1,800` shards for Max `20★` (`+20.00%` ATK / `+40.00%` HP)—far fewer than **Epic** (`3,130` shards) and **Rare** (`4,810` shards).\n• Legendary breakpoints: `5★` = `130` shards, Tier 2 Star 3 (`8★`) = `330` shards, `10★` = `490` shards, `15★` = `1,100` shards.\n• **GAR/KvK Days 1–2 (Mon–Tue):** `1` Legendary Shard = `5,000` pts, `1` Epic Shard = `1,000` pts, `1` Rare Shard = `200` pts, `1` Wish = `1,500` pts, `1` Arcane Crystal = `1,200` pts.",
    },
  ],
  keywords: [
    "thánh vật",
    "thanh vat",
    "thánh tích",
    "thanh tich",
    "bí bảo",
    "relics",
    "relic hall",
    "sảnh thánh tích",
    "áp chế sao",
    "ap che sao",
    "star rating suppression",
    "-50%",
    "thunder judgment",
    "dragonheart",
    "dragonbone amulet",
    "petrification staff",
    "soul guard orb",
    "feather of the pact",
    "vineborne bow",
    "undefeated crown",
    "sacred scroll",
    "moonstone",
    "duke's signet ring",
    "frost diadem",
    "eternal wings",
    "guild rush",
  ],
  sourceFiles: [
    "docs/06-game-guides/07-standardized-web-guides/group-6-runes-relics-pets/6.2-relics-guide.md",
    "docs/06-game-guides/07-standardized-web-guides/group-8-infrastructure/8.4-master-data-tables.md",
  ],
  freeSections: [
    {
      id: "sec-1-relics-trio-and-star-suppression",
      title: {
        vi: "1. Giải thích Cơ chế Cốt lõi: 3 Ô Thánh Vật (The Relics Trio), Chỉ Số Sở Hữu Toàn Cục & Quy Luật Áp Chế Sao (-50%)",
        en: "1. Core Mechanics: The 3 Active Relic Slots (Relics Trio), Owned Passive Stats & -50% Star Rating Suppression",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "Hệ thống **Thánh Vật / Bí Bảo (Relics)** và **Sảnh Thánh Tích (`Relic Hall`)** đóng vai trò như bộ kỹ năng tối thượng thứ hai của toàn đội hình.\nKhông chỉ tung đòn khống chế diện rộng, tạo khiên chắn hay hồi máu giữa giao tranh, Thánh Vật còn sở hữu cơ chế cộng dồn chỉ số toàn cục và **Áp Chế Sao trực tiếp (`-50%`)** lên đối phương.",
            en: "The **Relics** and **Relic Hall** system acts as a second ultimate skill kit for your entire march.\nBeyond unleashing AoE crowd control, damage-cap shields, and mid-combat healing, Relics provide permanent account-wide passive stats and direct **`-50%` Star Rating Suppression** against enemy queues.",
          },
        },
      ],
      subSections: [
        {
          id: "sub-1-1-three-relic-slots-architecture",
          title: {
            vi: "1.1. Cơ chế 3 Ô Thánh Vật Ra Trận (The Relics Trio)",
            en: "1.1. The 3 Active Relic Queue Slots (The Relics Trio)",
          },
          blocks: [
            {
              type: "media_spotlight",
              mediaCode: "MED-6.2-01",
              tier: "tier2_annotated_ui",
              title: {
                vi: "Bộ 9 Thánh Vật Vàng Chủ Lực Của 3 Phe Phái (Dragon's Might, Arcane Vault & Oath of the Sacred Forest)",
                en: "The 9 Core Legendary Relics Across All 3 Factions (Dragon's Might, Arcane Vault & Oath of the Sacred Forest)",
              },
              description: {
                vi: "Tổng quan 9 Thánh Vật Huyền Thoại (Legendary Relics) chia theo 3 bộ Phe phái chuẩn: Bộ Lạc (Thunder Judgment, Dragonheart, Dragonbone Amulet), Liên Minh (Petrification Staff, Soul Guard Orb, Feather of the Pact) và Thiên Nhiên (Vineborne Bow, Undefeated Crown, Sacred Scroll).",
                en: "Overview of the 9 core Legendary Relics organized by faction synergy sets: Horde Dragon's Might (Thunder Judgment, Dragonheart, Dragonbone Amulet), League Arcane Vault (Petrification Staff, Soul Guard Orb, Feather of the Pact), and Nature Oath of the Sacred Forest (Vineborne Bow, Undefeated Crown, Sacred Scroll).",
              },
              annotations: [
                {
                  kind: "do",
                  label: {
                    vi: "Đeo đủ 3 Thánh Vật Vàng đồng hệ cho Đội 1",
                    en: "Equip 3 Faction-Matched Legendary Relics on Queue 1",
                  },
                  detail: {
                    vi: "Ghép đúng bộ Dragon's Might (Thunder Judgment, Dragonheart, Dragonbone Amulet), Arcane Vault (Petrification Staff, Soul Guard Orb, Feather of the Pact) hoặc Oath of the Sacred Forest (Vineborne Bow, Undefeated Crown, Sacred Scroll) để nhận nhân hệ số theo từng tướng cùng phe.",
                    en: "Match Dragon's Might (Thunder Judgment, Dragonheart, Dragonbone Amulet), Arcane Vault (Petrification Staff, Soul Guard Orb, Feather of the Pact), or Oath of the Sacred Forest (Vineborne Bow, Undefeated Crown, Sacred Scroll) to scale active effects per same-faction hero.",
                  },
                },
                {
                  kind: "info",
                  label: {
                    vi: "Chu kỳ tự động kích hoạt 14s – 30s theo 3 vị trí ô",
                    en: "14s – 30s Auto-Cast Cycle Across 3 Role Slots",
                  },
                  detail: {
                    vi: "Ô 1 mở giao tranh bằng Khống chế & Sát thương diện rộng, Ô 2 dựng Khiên & Chặn trần sát thương (Damage Cap), Ô 3 duy trì Hồi phục, Tốc đánh, Chí mạng hoặc Phá khiên.",
                    en: "Slot 1 opens with AoE CC & burst damage, Slot 2 deploys Damage Cap mitigation & shields, and Slot 3 sustains the march with healing, Attack Speed, Crit Damage, or Shield Break.",
                  },
                },
                {
                  kind: "dont",
                  label: {
                    vi: "Không cài Thánh Vật Tím (Epic) vào Đội hình 1",
                    en: "Never Equip Epic Relics in Queue 1",
                  },
                  detail: {
                    vi: "Thánh Vật Tím dù 5 Sao vẫn tính là 0 Sao Vàng trong công thức Áp Chế Sao, khiến toàn bộ 3 Thánh Vật của Đội 1 bị đối phương cắt giảm -50% hiệu lực.",
                    en: "Even a 5-Star Epic Relic counts as 0 Legendary Stars for Star Rating Suppression, causing all 3 of your Queue 1 Relics to suffer a -50% effectiveness penalty.",
                  },
                },
              ],
            },
            {
              type: "table",
              caption: {
                vi: "Bảng Giải Phẫu 3 Ô Thánh Vật Ra Trận (The Relics Trio — Chu kỳ Cooldown 14 giây đến 30 giây)",
                en: "The 3 Active Relic Queue Slots Breakdown (The Relics Trio — 14s to 30s Cooldown Cycle)",
              },
              headers: [
                {
                  vi: "Vị Trí Ô",
                  en: "Queue Slot",
                },
                {
                  vi: "Phân Nhóm Vai Trò",
                  en: "Tactical Role",
                },
                {
                  vi: "Cơ Chế Tác Động Trong Giao Tranh",
                  en: "In-Combat Mechanical Impact",
                },
                {
                  vi: "Các Thánh Vật Tiêu Biểu",
                  en: "Signature Relics",
                },
              ],
              rows: [
                [
                  {
                    vi: "Ô số 1 (Slot 1)",
                    en: "Slot 1",
                  },
                  {
                    vi: "Tấn Công & Khống Chế (Control / Debuff / Shield)",
                    en: "Control / Debuff / Shield (Offense & Crowd Control)",
                  },
                  {
                    vi: "Gây sát thương diện rộng theo % Relic Attack kèm hiệu ứng khống chế cứng (Hóa đá, Đóng băng, Trói chân, Búa sét) và giảm kháng của đội hình địch.",
                    en: "Deals AoE damage scaling with % Relic Attack while applying hard crowd control (Petrify, Freeze, Entangle, Thunder Bind) and shredding enemy resistances.",
                  },
                  {
                    vi: "Thunder Judgment, Petrification Staff, Vineborne Bow, Frost Diadem (Frost Diablo Horn), Duke's Signet Ring, Persecution.",
                    en: "Thunder Judgment, Petrification Staff, Vineborne Bow, Frost Diadem (Frost Diablo Horn), Duke's Signet Ring, Persecution.",
                  },
                ],
                [
                  {
                    vi: "Ô số 2 (Slot 2)",
                    en: "Slot 2",
                  },
                  {
                    vi: "Phòng Thủ, Bảo Hộ & Kết Liễu (Burst Damage / Finisher / Defense)",
                    en: "Burst Damage / Finisher & Damage Cap Mitigation",
                  },
                  {
                    vi: "Kích hoạt cơ chế Chặn Trần Sát Thương (Damage Cap — không mất quá X% HP mỗi đòn đánh), tạo Khiên hấp thụ sát thương lớn hoặc khóa kỹ năng chủ lực địch.",
                    en: "Triggers per-hit Damage Cap protection (preventing hits from exceeding X% Max HP), deploys heavy absorption shields, or locks down enemy carries.",
                  },
                  {
                    vi: "Dragonheart, Soul Guard Orb, Undefeated Crown, Scale of Injustice, Anti-Magic Handcuffs, Royalty.",
                    en: "Dragonheart, Soul Guard Orb, Undefeated Crown, Scale of Injustice, Anti-Magic Handcuffs, Royalty.",
                  },
                ],
                [
                  {
                    vi: "Ô số 3 (Slot 3)",
                    en: "Slot 3",
                  },
                  {
                    vi: "Hỗ Trợ, Đa Dụng & Hồi Phục (Utility / Buff / Sustain)",
                    en: "Utility / Buff / Sustain (Support & Healing)",
                  },
                  {
                    vi: "Hồi máu toàn đội theo thời gian, cấp Khiên phụ trợ, tăng Tốc độ Đánh (Attack Speed), Sát thương Chí mạng (Crit Damage) hoặc Phá Khiên (Shield Break).",
                    en: "Provides team-wide heal-over-time, secondary shields, Attack Speed, Critical Damage amplification, or Shield Break.",
                  },
                  {
                    vi: "Dragonbone Amulet, Feather of the Pact, Sacred Scroll, Eternal Wings, Marshal's Warhorn, Moonstone, Philosopher's Rune.",
                    en: "Dragonbone Amulet, Feather of the Pact, Sacred Scroll, Eternal Wings, Marshal's Warhorn, Moonstone, Philosopher's Rune.",
                  },
                ],
              ],
            },
          ],
        },
        {
          id: "sub-1-2-star-rating-suppression-and-owned-passives",
          title: {
            vi: "1.2. Kỹ Năng Kích Hoạt, Chỉ Số Sở Hữu Toàn Cục (Owned Passive Stats) & Quy Luật Áp Chế Sao (-50%)",
            en: "1.2. Active Combat Skills, Global Owned Passive Stats & -50% Star Rating Suppression",
          },
          blocks: [
            {
              type: "paragraph",
              text: {
                vi: "• **Kỹ năng Kích hoạt (`Equipped Active Skill`):** Chỉ áp dụng cho 3 món đang đeo trực tiếp trên Hàng đợi và nhân thêm hiệu lực theo số lượng tướng đồng hệ.\n• **Chỉ số Sở hữu Toàn cục (`Owned Passive Stats` — Buff for all Heroes):** Cộng vĩnh viễn 24/7 cho **TẤT CẢ TƯỚNG** trong tài khoản ngay cả khi Thánh Vật nằm trong kho dự bị.",
                en: "• **Equipped Active Skills:** Trigger only for the 3 Relics equipped on a march and scale with the number of same-faction heroes.\n• **Global Owned Passive Stats (Buff for all Heroes):** Permanently boost **ALL heroes** in your roster 24/7 even while sitting in storage.",
              },
            },
            {
              type: "callout",
              variant: "rule",
              title: {
                vi: "Quy Luật Sinh Tử: Áp Chế Sao Thánh Vật (-50% Star Rating Suppression) & So Sánh Chỉ Số Sở Hữu Toàn Cục (20★)",
                en: "Life-or-Death Rule: -50% Star Rating Suppression & Global Owned Passive Stats Comparison (Max 20★)",
              },
              content: {
                vi: "• **Áp Chế Sao (`-50%` — Tab Relics):** Nếu Tổng Sao của 3 Thánh Vật trên đội (**CHỈ TÍNH Vàng Legendary+**) cao hơn địch dù chỉ `+1` Sao, sát thương, hồi máu và hiệu lực Thánh Vật địch bị giảm `-50%`!\n• **Chỉ số Sở hữu Toàn cục ở Max `20★`:** Rare Relic tốn `4,810` mảnh (`+6.00%` Hero ATK / `+12.00%` Hero HP); Epic Relic tốn `3,130` mảnh (`+12.00%` Hero ATK / `+24.00%` Hero HP).\n• **Ưu thế Legendary Relic:** Chỉ tốn `1,800` mảnh nhưng cộng tới `+20.00%` Hero ATK / `+40.00%` Hero HP.\n• **Điểm gãy mảnh Vàng:** `5★` = `130` mảnh (`+1.60%`/`+3.20%`), Bậc 2 Sao 3 = `330` mảnh (`+4.00%`/`+8.00%`), `10★` = `490` mảnh (`+6.00%`/`+12.00%`), `15★` = `1,100` mảnh (`+11.00%`/`+22.00%`).",
                en: "• **Star Rating Suppression (`-50%` — Tab Relics):** If your team's total Relic stars (**counting ONLY Legendary+ Relics**) exceed the enemy's by `+1` Star, all enemy Relic effects are halved (`-50%`)!\n• **Global Owned Passive Stats at Max `20★`:** Rare Relic costs `4,810` shards (`+6.00%` Hero ATK / `+12.00%` Hero HP); Epic Relic costs `3,130` shards (`+12.00%` Hero ATK / `+24.00%` Hero HP).\n• **Legendary Relic Advantage:** Costs only `1,800` shards yet grants `+20.00%` Hero ATK / `+40.00%` Hero HP.\n• **Legendary Breakpoints:** `5★` = `130` shards (`+1.60%`/`+3.20%`), Tier 2 Star 3 = `330` shards (`+4.00%`/`+8.00%`), `10★` = `490` shards (`+6.00%`/`+12.00%`), `15★` = `1,100` shards (`+11.00%`/`+22.00%`).",
              },
            },
          ],
        },
      ],
    },
    {
      id: "sec-2-collection-bonds-and-queue-allocation",
      title: {
        vi: "2. Chiến thuật Tối ưu cho F2P & Low-Spender: Cộng Hưởng +1 Giây (1s) vs Sustain & Phân Bổ 3 Đội Hình",
        en: "2. F2P & Low-Spender Strategy: +1 Second (1s) Control/Buff Synergy vs. Sustain & 3-Queue Allocation",
      },
      blocks: [
        {
          type: "media_spotlight",
          mediaCode: "MED-6.2-02",
          tier: "tier2_annotated_ui",
          title: {
            vi: "Giao Diện Sảnh Thánh Tích (Relic Hall Bonds), Chỉ Số Sở Hữu Toàn Cục & Hộp Thoại Áp Chế Sao (-50%)",
            en: "Relic Hall Collection Bonds, Owned Passive Stats Panel & -50% Star Rating Suppression Tooltip",
          },
          description: {
            vi: "Ảnh chụp giao diện kiểm toán Sảnh Thánh Tích: vị trí mở khóa Liên kết Bộ sưu tập (Relic Hall Bonds) cộng +1 giây (1s) thời gian hiệu lực, bảng đối chiếu Owned Passive Stats vs Active Skill và dòng cảnh báo Áp Chế Sao chỉ tính Thánh Vật Vàng (Legendary).",
            en: "Annotated view of the Relic Hall interface highlighting Collection Bond synergies (+1s duration extension), the Owned Passive Stats vs. Active Skill breakdown, and the Star Rating Suppression tooltip specifying that only Legendary+ Relics count.",
          },
          annotations: [
            {
              kind: "do",
              label: {
                vi: "Mở khóa liên kết +1 giây (1s) của 3 Thánh Vật Khống chế/Buff cốt lõi",
                en: "Unlock the +1s Duration Synergy on Core Control/Buff Relics",
              },
              detail: {
                vi: "Ưu tiên kích hoạt Relic Hall Bonds cho Feather of the Pact (Liên Minh), Dragonbone Amulet (Bộ Lạc) và Sacred Scroll (Thiên Nhiên) để kéo dài thêm +1 giây hiệu lực lá chắn và khống chế.",
                en: "Prioritize activating Relic Hall Bonds around Feather of the Pact (League), Dragonbone Amulet (Horde), and Sacred Scroll (Nature) to extend control and buff durations by +1 second.",
              },
            },
            {
              kind: "info",
              label: {
                vi: "Tách biệt 80% tài nguyên đua Sao Vàng Đội 1 & 20% mở rộng Thư viện",
                en: "80% Queue 1 Legendary Star Focus vs. 20% Catalog Unlocking",
              },
              detail: {
                vi: "Dành 20% nguồn mảnh ban đầu mở khóa Bậc 1 - Sao 1 (20 mảnh) kích hoạt Collection Bonds, sau đó dồn 80% mảnh Vàng đẩy 3 món Đội 1 chạm mốc 130 ➔ 330 ➔ 490 mảnh.",
                en: "Invest 20% of early shards to unlock Tier 1 - Star 1 (20 shards) across the catalog for Collection Bonds, then funnel 80% into Queue 1's 3 Legendary Relics to hit 130 ➔ 330 ➔ 490 shards.",
              },
            },
            {
              kind: "dont",
              label: {
                vi: "Không nhầm lẫn nhóm +1s Control/Buff với nhóm Phòng thủ/Sustain",
                en: "Do Not Confuse the +1s Trio with the Defensive/Sustain Trio",
              },
              detail: {
                vi: "Nhóm kéo dài +1s là Feather of the Pact, Dragonbone Amulet, Sacred Scroll; còn Duke's Signet Ring, Soul Guard Orb và Moonstone là bộ 3 Phòng thủ / Duy trì sinh tồn (Defensive / Sustain Relics).",
                en: "The +1s duration extension trio is Feather of the Pact, Dragonbone Amulet, and Sacred Scroll, whereas Duke's Signet Ring, Soul Guard Orb, and Moonstone form the Defensive / Sustain trio.",
              },
            },
          ],
        },
        {
          type: "roadmap",
          steps: [
            {
              badge: {
                vi: "Bước 1 • 20% Ngân sách Mở Rộng Thư Viện",
                en: "Step 1 • 20% Budget for Relic Hall Bonds",
              },
              title: {
                vi: "Kích Hoạt Mở Khóa Rộng & Liên Kết +1 Giây (Relic Hall Bonds)",
                en: "Unlock Catalog Bonds & the +1 Second (1s) Duration Extension Trio",
              },
              timing: {
                vi: "Giai đoạn S0 – Đầu S1 (Mở khóa Bậc 1 - Sao 1 = 20 mảnh)",
                en: "Season 0 – Early Season 1 (Tier 1 - Star 1 Unlock = 20 shards)",
              },
              description: {
                vi: "• Mở khóa (`Activate`) ngay khi đủ `20` mảnh để kích hoạt **Relic Hall Bonds** và cộng dồn **Owned Passive Stats** toàn cục.\n• Ưu tiên liên kết kéo dài **+1 giây (`1s`)** của 3 Thánh Vật Khống chế/Buff cốt lõi (`Feather of the Pact`, `Dragonbone Amulet`, `Sacred Scroll`).\n• Dùng `Duke's Signet Ring`, `Soul Guard Orb`, `Moonstone` làm bộ 3 Phòng thủ / Hồi phục (**Defensive / Sustain**).",
                en: "• Unlock (`Activate`) base Relics at `20` shards first to trigger **Relic Hall Bonds** and global **Owned Passive Stats**.\n• Prioritize the **+1 second (`1s`)** duration synergy tied to the 3 Core Control/Buff Relics (`Feather of the Pact`, `Dragonbone Amulet`, `Sacred Scroll`).\n• Use `Duke's Signet Ring`, `Soul Guard Orb`, and `Moonstone` as your **Defensive / Sustain** trio.",
              },
            },
            {
              badge: {
                vi: "Bước 2 • 80% Ngân sách Đua Sao Đội 1",
                en: "Step 2 • 80% Budget for Queue 1 Star Suppression",
              },
              title: {
                vi: "Dồn Mảnh Vàng Cho 3 Món Đội 1 Chạm Điểm Gãy 130 ➔ 330 ➔ 490 Mảnh",
                en: "Funnel 80% Legendary Shards into Queue 1's Trio (130 ➔ 330 ➔ 490 Shards)",
              },
              timing: {
                vi: "Mid-to-Endgame (Đua PvP & Thắng Áp Chế Sao -50%)",
                en: "Mid-to-Endgame (PvP & Winning -50% Star Suppression)",
              },
              description: {
                vi: "• Khi Đội 1 đã đeo đủ **3 Thánh Vật Vàng (Legendary)** đúng hệ phái, dồn `80%` mảnh Vàng tự chọn vào 3 món này.\n• Đẩy vượt **Bậc 1 - Sao 5** (`5★` = `130` mảnh), **Bậc 2 - Sao 3** (`8★` = `330` mảnh) và **Bậc 2 - Sao 5** (`10★` = `490` mảnh) để giữ Tổng Sao Vàng cao hơn địch tối thiểu `+1` Sao.",
                en: "• Once Queue 1 has **3 faction-matched Legendary Relics** equipped, funnel `80%` of your Legendary shards into those 3 pieces.\n• Push past **Tier 1 - Star 5** (`5★` = `130` shards), **Tier 2 - Star 3** (`8★` = `330` shards), and **Tier 2 - Star 5** (`10★` = `490` shards) to stay `+1` Star ahead of rivals.",
              },
            },
            {
              badge: {
                vi: "Bước 3 • Phân Bổ Đội 2 & Đội 3",
                en: "Step 3 • Queue 2 & Queue 3 Surplus Allocation",
              },
              title: {
                vi: "Tận Dụng Thánh Vật Vàng Dự Bị & Tím Sao Cao Cho Hàng Đợi Phụ",
                en: "Assign Surplus Legendary & High-Star Epic Relics to Queues 2 & 3",
              },
              timing: {
                vi: "Mọi giai đoạn vận hành 3 Hàng đợi (Queue 1 ➔ Queue 2 ➔ Queue 3)",
                en: "All Multi-Queue Stages (Queue 1 ➔ Queue 2 ➔ Queue 3)",
              },
              description: {
                vi: "• **Đội hình 1 (Main Queue):** Luôn giữ 3 Thánh Vật Vàng cao sao nhất đúng phe phái chủ lực.\n• **Đội hình 2 & 3 (Secondary / PvE):** Trang bị Thánh Vật Vàng đa dụng hoặc Tím sao cao như `Duke's Signet Ring`, `Scale of Injustice`, `Eternal Wings`, `Moonstone`, `Frost Diadem`, `Marshal's Warhorn`.",
                en: "• **Queue 1 (Main Queue):** Always retains your 3 highest-star faction-matched Legendary Relics.\n• **Queues 2 & 3 (Secondary / PvE):** Equip surplus versatile Legendaries or high-star Epics such as `Duke's Signet Ring`, `Scale of Injustice`, `Eternal Wings`, `Moonstone`, `Frost Diadem`, and `Marshal's Warhorn`.",
              },
            },
          ],
        },
        {
          type: "checklist",
          checklistId: "relics-guide-weekly-audit-v2",
          title: {
            vi: "Danh Sách Kiểm Tra Thực Hành Thánh Vật Hàng Tuần (Weekly Relic Audit Checklist)",
            en: "Weekly Relic Hall & Event Discipline Checklist",
          },
          description: {
            vi: "Hoàn thành 4 bước kiểm toán định kỳ mỗi tuần để tối đa hóa Chỉ số Sở hữu Toàn cục (Owned Passive Stats) và điểm số sự kiện Thi Đấu Hội / GAR-KvK.",
            en: "Complete these 4 weekly audit steps to maximize global Owned Passive Stats and Guild Race / GAR-KvK event scoring.",
          },
          items: [
            {
              id: "relic-check-1-tavern-wish",
              label: {
                vi: "Cài đặt đúng mảnh Thánh Vật Vàng hệ Đội 1 trong ô Ước Nguyện (Tavern Relic Wish)",
                en: "Lock Queue 1's faction Legendary Relic in Tavern Relic Wish",
              },
              detail: {
                vi: "Không bao giờ để trống ô Wish Relic trong Quán Rượu, nhưng tuyệt đối giữ toàn bộ vé quay chờ đúng ngày sự kiện tính điểm.",
                en: "Never leave the Tavern Relic Wish slot empty, but hoard 100% of your Wish scrolls until official scoring days.",
              },
              badge: {
                vi: "Wish Relic • 1,500 đ/lần",
                en: "Wish Relic • 1,500 pts/pull",
              },
            },
            {
              id: "relic-check-2-rare-epic-passives",
              label: {
                vi: "Xả toàn bộ mảnh Xanh (Rare) và Tím (Epic) tồn kho vào đúng ngày sự kiện",
                en: "Upgrade all banked Rare and Epic Relic shards on scoring days",
              },
              detail: {
                vi: "Nâng sao mọi Thánh Vật Xanh (tối đa +6.00% ATK / +12.00% HP) và Tím (tối đa +12.00% ATK / +24.00% HP) trong Sảnh Thánh Tích để lấy chỉ số toàn cục miễn phí cho cả tài khoản.",
                en: "Star up all Rare (up to +6.00% ATK / +12.00% HP) and Epic (up to +12.00% ATK / +24.00% HP) Relics in the Relic Hall during events for free account-wide stats.",
              },
              badge: {
                vi: "Owned Passive 24/7",
                en: "Owned Passive 24/7",
              },
            },
            {
              id: "relic-check-3-duration-synergy",
              label: {
                vi: "Kiểm tra Liên kết Thánh Vật cộng +1 giây (1s Duration Extension Synergy)",
                en: "Verify +1 Second (1s) Duration Extension Synergy Bonds",
              },
              detail: {
                vi: "Ưu tiên mở khóa liên kết phụ trợ xoay quanh bộ 3 Khống chế / Buff cốt lõi: Feather of the Pact, Dragonbone Amulet và Sacred Scroll.",
                en: "Prioritize unlocking Relic Hall sub-skill bonds centered around the 3 Core Control/Buff Relics: Feather of the Pact, Dragonbone Amulet, and Sacred Scroll.",
              },
              badge: {
                vi: "+1s Control / Buff",
                en: "+1s Control / Buff",
              },
            },
            {
              id: "relic-check-4-event-dump-window",
              label: {
                vi: "Găm 100% Relic Shards, Arcane Crystals & Magic Stones chờ đúng lịch xả Thi Đấu Hội / GAR-KvK",
                en: "Hoard 100% of Relic Shards, Arcane Crystals & Magic Stones for Guild Race / GAR-KvK windows",
              },
              detail: {
                vi: "• **Kỳ Đua Vũ Trang (GAR / KvK):** Xả vào Ngày 1 (Thứ Hai) & Ngày 2 (Thứ Ba) (+ Ngày 5 Thứ Sáu riêng trong KvK; lưu ý GAR tiêu chuẩn không tính điểm Thánh Vật vào Ngày 5).\n• **Kỳ Thi Đấu Hội:** Xả vào Thứ Tư – Thứ Năm trong sự kiện phụ `Guild Rush: Relic Hall & Relics` kết hợp Task Hội.",
                en: "• **GAR / KvK:** Dump on Day 1 (Monday) & Day 2 (Tuesday) (+ Day 5 Friday in KvK only; standard GAR does NOT score Relics on Day 5).\n• **Guild Race:** Dump on Wednesday – Thursday during `Guild Rush: Relic Hall & Relics` stacked with Guild Race tasks.",
              },
              badge: {
                vi: "5,000 đ / Mảnh Vàng",
                en: "5,000 pts / Leg Shard",
              },
            },
          ],
        },
      ],
    },
    {
      id: "sec-3-relics-common-pitfalls",
      title: {
        vi: "3. Những Cạm bẫy Phổ biến & Cách Phòng tránh (Common Pitfalls)",
        en: "3. Common Relic Loadout & Event Timing Pitfalls",
      },
      blocks: [
        {
          type: "callout",
          variant: "danger",
          title: {
            vi: "Cảnh Báo 3 Sai Lầm Chí Mạng Khiến Đội Hình 1 Bị Khóa -50% Hiệu Lực Thánh Vật",
            en: "Warning: 3 Fatal Relic Mistakes That Cripple Queue 1 by -50%",
          },
          content: {
            vi: "• **Bẫy 1 (Đeo Tím `5★` ở Đội 1):** Áp Chế Sao (`-50%`) CHỈ TÍNH SAO VÀNG TRỞ LÊN, nên đeo món Tím khiến Đội 1 bị tính `0` Sao ở ô đó và bị giảm `-50%` hiệu lực!\n• **Bẫy 2 (Nhầm vai trò):** Nhầm bộ 3 kéo dài `+1s` (`Feather of the Pact`, `Dragonbone Amulet`, `Sacred Scroll`) với bộ 3 Sustain (`Duke's Signet Ring`, `Soul Guard Orb`, `Moonstone`).\n• **Bẫy 3 (Xả sai ngày):** GAR tiêu chuẩn không tính điểm Thánh Vật vào Ngày 5 — chỉ xả vào Ngày 1–2 Kỳ GAR/KvK (thêm Ngày 5 nếu là KvK) hoặc Thứ Tư–Năm Kỳ Thi Đấu Hội dịp `Guild Rush`.",
            en: "• **Trap 1 (Equipping a `5★` Epic on Queue 1):** `-50%` Star Rating Suppression ONLY counts Legendary+ stars, so an Epic contributes `0` Stars and gets all 3 Relics halved (`-50%`)!\n• **Trap 2 (Role Mismatch):** Confusing the `+1s` trio (`Feather of the Pact`, `Dragonbone Amulet`, `Sacred Scroll`) with the Sustain trio (`Duke's Signet Ring`, `Soul Guard Orb`, `Moonstone`).\n• **Trap 3 (Wrong Dump Day):** Standard GAR does NOT score Relics on Day 5—only dump on GAR/KvK Days 1–2 (plus Day 5 in KvK) or Guild Race Wed–Thu during `Guild Rush: Relic Hall & Relics`.",
          },
        },
        {
          type: "list",
          ordered: true,
          items: [
            {
              vi: "**Sai lầm #1 — Đeo Thánh Vật Tím 5 Sao ở Đội 1:** Tím tính `0` Sao Vàng gây phạt `-50%`; hãy đeo đủ 3 món Legendary trên Đội 1 và chuyển `Duke's Signet Ring` / `Frost Diadem` xuống Đội 2.",
              en: "**Pitfall #1 — Equipping a 5-Star Epic on Queue 1:** Epics count as `0` Legendary Stars (`-50%` penalty); always equip 3 Legendaries on Queue 1 and move `Duke's Signet Ring` / `Frost Diadem` to Queue 2.",
            },
            {
              vi: "**Sai lầm #2 — Lắp lệch bộ Phe phái cho Đội 1:** Luôn đeo đúng bộ của phe chủ lực (`Dragon's Might` Bộ Lạc, `Arcane Vault` Liên Minh, `Oath of the Sacred Forest` Thiên Nhiên) để nhân hệ số theo 6 tướng.",
              en: "**Pitfall #2 — Mismatching Faction Relic Sets on Queue 1:** Always match your Queue 1 faction set (`Dragon's Might` Horde, `Arcane Vault` League, `Oath of the Sacred Forest` Nature) for 6-hero scaling.",
            },
            {
              vi: "**Sai lầm #3 — Nâng lẻ hoặc xả nhầm Ngày 5 GAR:** Kỳ GAR/KvK xả Ngày 1–2 (`5,000` điểm/mảnh Vàng; GAR tiêu chuẩn không tính điểm Thánh Vật vào Ngày 5, chỉ KvK có Ngày 5); Kỳ Thi Đấu Hội xả Thứ Tư–Năm dịp `Guild Rush`.",
              en: "**Pitfall #3 — Upgrading Randomly or on GAR Day 5:** GAR/KvK dumps on Days 1–2 (`5,000` pts/Leg shard; standard GAR does NOT score Relics on Day 5, only KvK adds Day 5); Guild Race dumps Wed–Thu in `Guild Rush`.",
            },
            {
              vi: "**Sai lầm #4 — Nhầm bộ 3 `+1s` với bộ 3 Sustain:** Nhóm kéo dài `+1s` là `Feather of the Pact`, `Dragonbone Amulet`, `Sacred Scroll`; còn `Duke's Signet Ring`, `Soul Guard Orb`, `Moonstone` là nhóm Sustain.",
              en: "**Pitfall #4 — Mixing Up `+1s` vs. Sustain Trio:** `+1s` duration belongs to `Feather of the Pact`, `Dragonbone Amulet`, and `Sacred Scroll`, while `Duke's Signet Ring`, `Soul Guard Orb`, and `Moonstone` are Sustain.",
            },
          ],
        },
      ],
    },
  ],
  proSections: [
    {
      id: "sec-4-bis-loadouts-and-20-star-cost-tables",
      isPro: true,
      title: {
        vi: "4. Phân tích Định lượng & Điểm gãy: Cấu Hình BiS 3 Phe, Bảng 20 Cấp Sao (4 Bậc × 5 Sao — Tab Relics) & Ma Trận Điểm Sự Kiện",
        en: "4. Quantitative Analysis: 3-Faction BiS Loadouts, 20-Level Star Progression Table (Tab Relics) & Event Scoring Matrix",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "Phần dữ liệu dưới đây tổng hợp cấu hình **3 Ô Thánh Vật chuẩn (Endgame BiS & F2P Transition)** cho cả 3 Phe phái.\nĐi kèm là bảng chi phí **20 cấp Sao (`4 Bậc × 5 Sao`)** từ `TopHeroes Tables - Max` (Tab Relics) và ma trận điểm số sự kiện Thi Đấu Hội / GAR-KvK.",
            en: "This quantitative reference compiles the exact **3-slot BiS and F2P transition loadouts** for all 3 Factions.\nIt also includes the complete **20-level Star progression table (`4 Tiers × 5 Stars`)** from `TopHeroes Tables - Max` (Tab Relics) and the Guild Race / GAR-KvK scoring matrix.",
          },
        },
      ],
      subSections: [
        {
          id: "sub-4-1-three-faction-bis-loadouts",
          title: {
            vi: "4.1. Bộ 3 Thánh Vật Chuẩn (BiS Relic Loadouts) Cho Cả 3 Phe Phái",
            en: "4.1. 3-Faction BiS Relic Trio Loadouts & F2P Alternatives",
          },
          blocks: [
            {
              type: "table",
              caption: {
                vi: "Bảng Ma Trận Phối Bộ 3 Thánh Vật Chuẩn (Endgame BiS & Phương Án Thay Thế F2P) Cho 3 Phe Phái (Tab Relics)",
                en: "3-Faction BiS Relic Trio Loadouts & F2P Mid-Game Transition Matrix (Tab Relics)",
              },
              headers: [
                {
                  vi: "Phe Phái & Bộ Cộng Hưởng",
                  en: "Faction & Synergy Set",
                },
                {
                  vi: "Ô 1: Tấn Công & Khống Chế (Offense / CC)",
                  en: "Slot 1: Offense & Crowd Control",
                },
                {
                  vi: "Ô 2: Phòng Thủ & Bảo Hộ (Defense / Mitigation)",
                  en: "Slot 2: Defense & Damage Cap",
                },
                {
                  vi: "Ô 3: Hỗ Trợ & Hồi Phục (Support / Buff)",
                  en: "Slot 3: Support, Sustain & Buff",
                },
                {
                  vi: "Phân Tích Chuỗi Cộng Hưởng Chiến Thuật (Synergy Breakdown)",
                  en: "Tactical Synergy & Mechanic Breakdown",
                },
              ],
              rows: [
                [
                  {
                    vi: "PHE BỘ LẠC (Horde — Bộ Dragon's Might)",
                    en: "HORDE (Dragon's Might Set)",
                  },
                  {
                    vi: "BiS: Thunder Judgment (F2P / Mid-game: Frost Diadem / Frost Diablo Horn / Duke's Signet Ring)",
                    en: "BiS: Thunder Judgment (F2P / Mid-game: Frost Diadem / Frost Diablo Horn / Duke's Signet Ring)",
                  },
                  {
                    vi: "BiS: Dragonheart (F2P / Mid-game: Scale of Injustice)",
                    en: "BiS: Dragonheart (F2P / Mid-game: Scale of Injustice)",
                  },
                  {
                    vi: "BiS: Dragonbone Amulet (F2P / Mid-game: Eternal Wings / Marshal's Warhorn)",
                    en: "BiS: Dragonbone Amulet (F2P / Mid-game: Eternal Wings / Marshal's Warhorn)",
                  },
                  {
                    vi: "Thunder Judgment giáng búa sét diện rộng gây Thunder Bind (bất động + câm lặng), cộng % Damage theo mỗi tướng Bộ Lạc và gắn debuff Static tăng sát thương đòn đánh thường cho Wukong & Storm Maiden. Duke's Signet Ring / Frost Diadem giảm Crit Resistance hoặc đóng băng diện rộng. Dragonheart & Dragonbone Amulet kích hoạt Indomitable (chặn trần sát thương mỗi đòn + hồi máu + Block Break) và cấp khiên kèm +% Critical Damage nhân theo số tướng Bộ Lạc.",
                    en: "Thunder Judgment slams an AoE lightning hammer applying Thunder Bind (immobilize + silence), scaling % Damage per Horde hero and inflicting Static to amplify normal attack damage for Wukong & Storm Maiden. Duke's Signet Ring / Frost Diadem shred Crit Resistance or freeze AoE. Dragonheart & Dragonbone Amulet trigger Indomitable (per-hit damage cap + heal + Block Break) and grant shields with +% Critical Damage scaling per Horde hero.",
                  },
                ],
                [
                  {
                    vi: "PHE LIÊN MINH (League — Bộ Arcane Vault)",
                    en: "LEAGUE (Arcane Vault Set)",
                  },
                  {
                    vi: "BiS: Petrification Staff (F2P / Mid-game: Persecution / Frost Diadem)",
                    en: "BiS: Petrification Staff (F2P / Mid-game: Persecution / Frost Diadem)",
                  },
                  {
                    vi: "BiS: Soul Guard Orb (F2P / Mid-game: Anti-Magic Handcuffs / Royalty)",
                    en: "BiS: Soul Guard Orb (F2P / Mid-game: Anti-Magic Handcuffs / Royalty)",
                  },
                  {
                    vi: "BiS: Feather of the Pact (F2P / Mid-game: Eternal Wings / Sacred Scroll)",
                    en: "BiS: Feather of the Pact (F2P / Mid-game: Eternal Wings / Sacred Scroll)",
                  },
                  {
                    vi: "Petrification Staff bắn tia hóa đá diện rộng (Immobilize & Silence), tăng % sát thương theo mỗi tướng Liên Minh và gắn debuff Shatter khiến mục tiêu nhận thêm sát thương đại chiêu từ Paragon & Pyromancer. Soul Guard Orb cấp hiệu ứng Resist ưu tiên cho hàng trước (Adjudicator, Rose Princess), chặn trần sát thương mỗi đòn (giảm trần thêm theo số tướng League), tạo khiên theo Relic HP và cộng Shield Break. Feather of the Pact tạo lá chắn cộng % theo mỗi tướng Liên Minh kèm Block Break và Skill Damage Reduction %.",
                    en: "Petrification Staff fires an AoE petrifying beam (Immobilize & Silence), scaling % damage per League hero and applying Shatter to amplify ultimate burst from Paragon & Pyromancer. Soul Guard Orb grants Resist to frontliners (Adjudicator, Rose Princess), capping max damage taken per hit (tightened per League hero) while granting a Relic HP shield and Shield Break. Feather of the Pact provides a League-scaling shield with Block Break and Skill Damage Reduction %.",
                  },
                ],
                [
                  {
                    vi: "PHE THIÊN NHIÊN (Nature — Bộ Oath of the Sacred Forest)",
                    en: "NATURE (Oath of the Sacred Forest Set)",
                  },
                  {
                    vi: "BiS: Vineborne Bow (F2P / Mid-game: Frost Diadem / Persecution)",
                    en: "BiS: Vineborne Bow (F2P / Mid-game: Frost Diadem / Persecution)",
                  },
                  {
                    vi: "BiS: Undefeated Crown (F2P / Mid-game: Scale of Injustice)",
                    en: "BiS: Undefeated Crown (F2P / Mid-game: Scale of Injustice)",
                  },
                  {
                    vi: "BiS: Sacred Scroll (F2P / Mid-game: Moonstone / Eternal Wings)",
                    en: "BiS: Sacred Scroll (F2P / Mid-game: Moonstone / Eternal Wings)",
                  },
                  {
                    vi: "Vineborne Bow trói chân diện rộng (Entangle), tăng sát thương theo mỗi tướng Thiên Nhiên và phát tán độc tố Toxin tăng sát thương kỹ năng địch phải nhận. Undefeated Crown kích hoạt Shelter chặn trần sát thương đơn mục tiêu (giảm sâu theo số tướng Nature), hồi phục % Max HP mỗi giây và cộng Critical Damage. Sacred Scroll & Moonstone cấp hiệu ứng Valor (tăng khiên theo số tướng Nature + giảm sát thương đánh thường + Shield Break) hoặc hất tung đội hình địch kèm hồi máu toàn diện cho dàn triệu hồi của Tidecaller & Pixie.",
                    en: "Vineborne Bow roots enemies in an AoE (Entangle), scaling damage per Nature hero and spreading Toxin to increase enemy skill damage taken. Undefeated Crown activates Shelter to cap single-target damage taken (strengthened per Nature hero), regenerates % Max HP per second, and boosts Critical Damage. Sacred Scroll & Moonstone grant Valor (Nature-scaling shield + normal attack damage reduction + Shield Break) or knock up enemies while healing Tidecaller & Pixie summons.",
                  },
                ],
              ],
            },
            {
              type: "callout",
              variant: "tip",
              title: {
                vi: "Giải Mã Chính Xác Cộng Hưởng Kéo Dài +1 Giây (1s) vs Nhóm Thánh Vật Phòng Thủ / Sustain",
                en: "Exact Distinction: +1 Second (1s) Duration Extension Trio vs. Defensive / Sustain Trio",
              },
              content: {
                vi: "• **Bộ 3 Khống Chế / Buff Cốt Lõi (+1 giây / `1s`):** `Feather of the Pact` (Lông Vũ Giao Ước — Liên Minh), `Dragonbone Amulet` (Bùa Xương Rồng — Bộ Lạc) và `Sacred Scroll` (Cuộn Thánh Thư — Thiên Nhiên).\n• **Bộ 3 Phòng Thủ / Duy Trì Sinh Tồn (`Defensive / Sustain Relics`):** `Duke's Signet Ring` (Nhẫn Công Tước), `Soul Guard Orb` (Ngọc Hộ Hồn) và `Moonstone` (Đá Mặt Trăng).",
                en: "• **3 Core Control/Buff Relics (+1 second / `1s` duration synergy):** `Feather of the Pact` (League), `Dragonbone Amulet` (Horde), and `Sacred Scroll` (Nature).\n• **3 Defensive / Sustain Relics (mitigation & healing):** `Duke's Signet Ring`, `Soul Guard Orb`, and `Moonstone`.",
              },
            },
          ],
        },
        {
          id: "sub-4-2-twenty-level-star-progression-table",
          title: {
            vi: "4.2. Bảng Chi Phí Mảnh Thánh Tích 20 Cấp Sao — 4 Bậc × 5 Sao (Rare / Epic / Legendary — Tab Relics)",
            en: "4.2. Complete 20-Level Star Progression Table — 4 Tiers × 5 Stars (Rare / Epic / Legendary — Tab Relics)",
          },
          blocks: [
            {
              type: "table",
              caption: {
                vi: "Bảng Chi Phí Mảnh Nâng Cấp 20 Cấp Sao (Bậc 1 - Sao 1 đến Bậc 4 - Sao 5 Max 20★) & Chỉ Số Sở Hữu Toàn Cục (TopHeroes Tables - Max)",
                en: "Complete 20-Level Star Upgrade Shard Cost Table (Tier 1 - Star 1 to Tier 4 - Star 5 Max 20★) & Owned Passive Stats (TopHeroes Tables - Max)",
              },
              headers: [
                {
                  vi: "Cấp Bậc & Sao (Tier & Star)",
                  en: "Tier & Star Level",
                },
                {
                  vi: "RARE RELIC (Xanh — Mảnh Cấp Này | Tích Lũy)",
                  en: "RARE RELIC (Blue — Step | Cumulative Shards)",
                },
                {
                  vi: "EPIC RELIC (Tím — Mảnh Cấp Này | Tích Lũy)",
                  en: "EPIC RELIC (Purple — Step | Cumulative Shards)",
                },
                {
                  vi: "LEGENDARY RELIC (Vàng — Mảnh | Tích Lũy | Owned ATK / HP)",
                  en: "LEGENDARY RELIC (Gold — Step | Cumulative | Owned ATK / HP)",
                },
              ],
              rows: [
                [
                  {
                    vi: "Bậc 1 - Sao 1 (1★)",
                    en: "Tier 1 - Star 1 (1★)",
                  },
                  {
                    vi: "20 (20) Rare",
                    en: "20 (20) Rare",
                  },
                  {
                    vi: "20 (20) Epic",
                    en: "20 (20) Epic",
                  },
                  {
                    vi: "20 (20) Leg (+0.30% ATK / +0.60% HP)",
                    en: "20 (20) Leg (+0.30% ATK / +0.60% HP)",
                  },
                ],
                [
                  {
                    vi: "Bậc 1 - Sao 2 (2★)",
                    en: "Tier 1 - Star 2 (2★)",
                  },
                  {
                    vi: "25 (45) Rare",
                    en: "25 (45) Rare",
                  },
                  {
                    vi: "25 (45) Epic",
                    en: "25 (45) Epic",
                  },
                  {
                    vi: "20 (40) Leg (+0.60% ATK / +1.20% HP)",
                    en: "20 (40) Leg (+0.60% ATK / +1.20% HP)",
                  },
                ],
                [
                  {
                    vi: "Bậc 1 - Sao 3 (3★)",
                    en: "Tier 1 - Star 3 (3★)",
                  },
                  {
                    vi: "30 (75) Rare",
                    en: "30 (75) Rare",
                  },
                  {
                    vi: "25 (70) Epic",
                    en: "25 (70) Epic",
                  },
                  {
                    vi: "30 (70) Leg (+0.90% ATK / +1.80% HP)",
                    en: "30 (70) Leg (+0.90% ATK / +1.80% HP)",
                  },
                ],
                [
                  {
                    vi: "Bậc 1 - Sao 4 (4★)",
                    en: "Tier 1 - Star 4 (4★)",
                  },
                  {
                    vi: "35 (110) Rare",
                    en: "35 (110) Rare",
                  },
                  {
                    vi: "30 (100) Epic",
                    en: "30 (100) Epic",
                  },
                  {
                    vi: "30 (100) Leg (+1.20% ATK / +2.40% HP)",
                    en: "30 (100) Leg (+1.20% ATK / +2.40% HP)",
                  },
                ],
                [
                  {
                    vi: "Bậc 1 - Sao 5 (5★ — Đột phá 1)",
                    en: "Tier 1 - Star 5 (5★ — Breakthrough 1)",
                  },
                  {
                    vi: "40 (150) Rare",
                    en: "40 (150) Rare",
                  },
                  {
                    vi: "30 (130) Epic",
                    en: "30 (130) Epic",
                  },
                  {
                    vi: "30 (130) Leg (+1.60% ATK / +3.20% HP)",
                    en: "30 (130) Leg (+1.60% ATK / +3.20% HP)",
                  },
                ],
                [
                  {
                    vi: "Bậc 2 - Sao 1 (6★)",
                    en: "Tier 2 - Star 1 (6★)",
                  },
                  {
                    vi: "50 (200) Rare",
                    en: "50 (200) Rare",
                  },
                  {
                    vi: "40 (170) Epic",
                    en: "40 (170) Epic",
                  },
                  {
                    vi: "60 (190) Leg (+2.40% ATK / +4.80% HP)",
                    en: "60 (190) Leg (+2.40% ATK / +4.80% HP)",
                  },
                ],
                [
                  {
                    vi: "Bậc 2 - Sao 2 (7★)",
                    en: "Tier 2 - Star 2 (7★)",
                  },
                  {
                    vi: "70 (270) Rare",
                    en: "70 (270) Rare",
                  },
                  {
                    vi: "60 (230) Epic",
                    en: "60 (230) Epic",
                  },
                  {
                    vi: "60 (250) Leg (+3.20% ATK / +6.40% HP)",
                    en: "60 (250) Leg (+3.20% ATK / +6.40% HP)",
                  },
                ],
                [
                  {
                    vi: "Bậc 2 - Sao 3 (8★)",
                    en: "Tier 2 - Star 3 (8★)",
                  },
                  {
                    vi: "90 (360) Rare",
                    en: "90 (360) Rare",
                  },
                  {
                    vi: "80 (310) Epic",
                    en: "80 (310) Epic",
                  },
                  {
                    vi: "80 (330) Leg (+4.00% ATK / +8.00% HP)",
                    en: "80 (330) Leg (+4.00% ATK / +8.00% HP)",
                  },
                ],
                [
                  {
                    vi: "Bậc 2 - Sao 4 (9★)",
                    en: "Tier 2 - Star 4 (9★)",
                  },
                  {
                    vi: "110 (470) Rare",
                    en: "110 (470) Rare",
                  },
                  {
                    vi: "100 (410) Epic",
                    en: "100 (410) Epic",
                  },
                  {
                    vi: "80 (410) Leg (+5.00% ATK / +10.00% HP)",
                    en: "80 (410) Leg (+5.00% ATK / +10.00% HP)",
                  },
                ],
                [
                  {
                    vi: "Bậc 2 - Sao 5 (10★ — Đột phá 2)",
                    en: "Tier 2 - Star 5 (10★ — Breakthrough 2)",
                  },
                  {
                    vi: "140 (610) Rare",
                    en: "140 (610) Rare",
                  },
                  {
                    vi: "120 (530) Epic",
                    en: "120 (530) Epic",
                  },
                  {
                    vi: "80 (490) Leg (+6.00% ATK / +12.00% HP)",
                    en: "80 (490) Leg (+6.00% ATK / +12.00% HP)",
                  },
                ],
                [
                  {
                    vi: "Bậc 3 - Sao 1 (11★)",
                    en: "Tier 3 - Star 1 (11★)",
                  },
                  {
                    vi: "250 (860) Rare",
                    en: "250 (860) Rare",
                  },
                  {
                    vi: "160 (690) Epic",
                    en: "160 (690) Epic",
                  },
                  {
                    vi: "100 (590) Leg (+7.00% ATK / +14.00% HP)",
                    en: "100 (590) Leg (+7.00% ATK / +14.00% HP)",
                  },
                ],
                [
                  {
                    vi: "Bậc 3 - Sao 2 (12★)",
                    en: "Tier 3 - Star 2 (12★)",
                  },
                  {
                    vi: "300 (1,160) Rare",
                    en: "300 (1,160) Rare",
                  },
                  {
                    vi: "200 (890) Epic",
                    en: "200 (890) Epic",
                  },
                  {
                    vi: "120 (710) Leg (+8.00% ATK / +16.00% HP)",
                    en: "120 (710) Leg (+8.00% ATK / +16.00% HP)",
                  },
                ],
                [
                  {
                    vi: "Bậc 3 - Sao 3 (13★)",
                    en: "Tier 3 - Star 3 (13★)",
                  },
                  {
                    vi: "360 (1,520) Rare",
                    en: "360 (1,520) Rare",
                  },
                  {
                    vi: "250 (1,140) Epic",
                    en: "250 (1,140) Epic",
                  },
                  {
                    vi: "120 (830) Leg (+9.00% ATK / +18.00% HP)",
                    en: "120 (830) Leg (+9.00% ATK / +18.00% HP)",
                  },
                ],
                [
                  {
                    vi: "Bậc 3 - Sao 4 (14★)",
                    en: "Tier 3 - Star 4 (14★)",
                  },
                  {
                    vi: "430 (1,950) Rare",
                    en: "430 (1,950) Rare",
                  },
                  {
                    vi: "310 (1,450) Epic",
                    en: "310 (1,450) Epic",
                  },
                  {
                    vi: "120 (950) Leg (+10.00% ATK / +20.00% HP)",
                    en: "120 (950) Leg (+10.00% ATK / +20.00% HP)",
                  },
                ],
                [
                  {
                    vi: "Bậc 3 - Sao 5 (15★ — Đột phá 3)",
                    en: "Tier 3 - Star 5 (15★ — Breakthrough 3)",
                  },
                  {
                    vi: "510 (2,460) Rare",
                    en: "510 (2,460) Rare",
                  },
                  {
                    vi: "380 (1,830) Epic",
                    en: "380 (1,830) Epic",
                  },
                  {
                    vi: "150 (1,100) Leg (+11.00% ATK / +22.00% HP)",
                    en: "150 (1,100) Leg (+11.00% ATK / +22.00% HP)",
                  },
                ],
                [
                  {
                    vi: "Bậc 4 - Sao 1 (16★)",
                    en: "Tier 4 - Star 1 (16★)",
                  },
                  {
                    vi: "330 (2,790) Rare",
                    en: "330 (2,790) Rare",
                  },
                  {
                    vi: "200 (2,030) Epic",
                    en: "200 (2,030) Epic",
                  },
                  {
                    vi: "120 (1,220) Leg (+12.60% ATK / +25.20% HP)",
                    en: "120 (1,220) Leg (+12.60% ATK / +25.20% HP)",
                  },
                ],
                [
                  {
                    vi: "Bậc 4 - Sao 2 (17★)",
                    en: "Tier 4 - Star 2 (17★)",
                  },
                  {
                    vi: "390 (3,180) Rare",
                    en: "390 (3,180) Rare",
                  },
                  {
                    vi: "220 (2,250) Epic",
                    en: "220 (2,250) Epic",
                  },
                  {
                    vi: "130 (1,350) Leg (+14.20% ATK / +28.40% HP)",
                    en: "130 (1,350) Leg (+14.20% ATK / +28.40% HP)",
                  },
                ],
                [
                  {
                    vi: "Bậc 4 - Sao 3 (18★)",
                    en: "Tier 4 - Star 3 (18★)",
                  },
                  {
                    vi: "460 (3,640) Rare",
                    en: "460 (3,640) Rare",
                  },
                  {
                    vi: "260 (2,510) Epic",
                    en: "260 (2,510) Epic",
                  },
                  {
                    vi: "140 (1,490) Leg (+15.80% ATK / +31.60% HP)",
                    en: "140 (1,490) Leg (+15.80% ATK / +31.60% HP)",
                  },
                ],
                [
                  {
                    vi: "Bậc 4 - Sao 4 (19★)",
                    en: "Tier 4 - Star 4 (19★)",
                  },
                  {
                    vi: "540 (4,180) Rare",
                    en: "540 (4,180) Rare",
                  },
                  {
                    vi: "290 (2,800) Epic",
                    en: "290 (2,800) Epic",
                  },
                  {
                    vi: "150 (1,640) Leg (+17.90% ATK / +35.80% HP)",
                    en: "150 (1,640) Leg (+17.90% ATK / +35.80% HP)",
                  },
                ],
                [
                  {
                    vi: "Bậc 4 - Sao 5 (Max 20★)",
                    en: "Tier 4 - Star 5 (Max 20★)",
                  },
                  {
                    vi: "630 (4,810) Rare (+6.00% ATK / +12.00% HP)",
                    en: "630 (4,810) Rare (+6.00% ATK / +12.00% HP)",
                  },
                  {
                    vi: "330 (3,130) Epic (+12.00% ATK / +24.00% HP)",
                    en: "330 (3,130) Epic (+12.00% ATK / +24.00% HP)",
                  },
                  {
                    vi: "160 (1,800) Leg (+20.00% ATK / +40.00% HP)",
                    en: "160 (1,800) Leg (+20.00% ATK / +40.00% HP)",
                  },
                ],
              ],
            },
          ],
        },
        {
          id: "sub-4-3-relic-event-scoring-and-dump-windows",
          title: {
            vi: "4.3. Lịch Xả Nguyên Liệu Thánh Vật Chuẩn Ground-Truth (Kỳ GAR/KvK: GAR / KvK vs Kỳ Thi Đấu Hội: Guild Race & Guild Rush)",
            en: "4.3. Ground-Truth Relic Event Scoring & Dump Windows (GAR/KvK: GAR / KvK vs. Guild Race: Guild Rush)",
          },
          blocks: [
            {
              type: "visual_diagram",
              mediaCode: "MED-6.2-03",
              variant: "decision_flow",
              title: {
                vi: "Sơ Đồ Quyết Định Lịch Xả Relic Shards, Wish Relic, Arcane Crystals & Magic Stones",
                en: "Decision Flowchart for Dumping Relic Shards, Wish Scrolls, Arcane Crystals & Magic Stones",
              },
              subtitle: {
                vi: "Phân nhánh chính xác giữa Kỳ Thi Đấu Hội (Guild Rush Thứ Tư – Thứ Năm) và Kỳ GAR/KvK (GAR / KvK Ngày 1–2 Thứ Hai – Thứ Ba)",
                en: "Exact routing between Guild Race (Wednesday–Thursday Guild Rush) and GAR/KvK (Monday–Tuesday GAR / KvK Days 1–2)",
              },
              centerNode: {
                id: "relic-flow-center",
                badge: {
                  vi: "Kho Tài Nguyên Thánh Vật",
                  en: "Relic Resource Vault",
                },
                title: {
                  vi: "Tích Lũy Relic Shards, Vé Wish, Arcane Crystals & Magic Stones",
                  en: "Banked Relic Shards, Wish Scrolls, Arcane Crystals & Magic Stones",
                },
                subtitle: {
                  vi: "Kiểm tra chu kỳ Thi Đấu Hội / GAR-KvK trước khi bấm nâng cấp",
                  en: "Verify Guild Race / GAR-KvK cycle before upgrading",
                },
                tone: "gold",
              },
              branches: [
                {
                  title: {
                    vi: "Nhánh 1: Kỳ Thi Đấu Hội — Guild Race & Guild Rush (Thứ Tư – Thứ Năm)",
                    en: "Branch 1: Guild Race — Guild Race & Guild Rush (Wednesday – Thursday)",
                  },
                  badge: {
                    vi: "Thi Đấu Hội • Thứ Tư – Thứ Năm",
                    en: "Guild Race • Wed – Thu",
                  },
                  tone: "emerald",
                  steps: [
                    {
                      id: "relic-flow-step-week-a-1",
                      title: {
                        vi: "Chờ sự kiện phụ 2 ngày Guild Rush: Relic Hall & Relics (Thứ Tư – Thứ Năm)",
                        en: "Wait for the 2-day Guild Rush: Relic Hall & Relics sub-event (Wed – Thu)",
                      },
                      subtitle: {
                        vi: "Nhận Nhiệm vụ Thánh Vật trong bảng Guild Race trước khi xả",
                        en: "Claim a Relic task on the Guild Race board before spending",
                      },
                      tone: "emerald",
                    },
                    {
                      id: "relic-flow-step-week-a-2",
                      title: {
                        vi: "Kích hoạt Thánh Vật mới (50đ Rare / 250đ Epic / 1,200đ Leg) vừa đủ ăn mốc rương",
                        en: "Activate new Relics (50 pts Rare / 250 pts Epic / 1,200 pts Leg) to hit milestone chests",
                      },
                      subtitle: {
                        vi: "Giữ phần lớn mảnh Vàng chủ lực chờ Ngày 1–2 Kỳ GAR/KvK",
                        en: "Reserve bulk Legendary shards for GAR/KvK Days 1–2",
                      },
                      tone: "emerald",
                    },
                  ],
                  outcome: {
                    vi: "Hoàn thành kép mốc thưởng Guild Rush + Nhiệm vụ Guild Race với chi phí tối thiểu",
                    en: "Double-dip Guild Rush milestones + Guild Race task points at minimal cost",
                  },
                },
                {
                  title: {
                    vi: "Nhánh 2: Kỳ GAR/KvK — GAR / KvK Ngày 1 (Thứ Hai) & Ngày 2 (Thứ Ba)",
                    en: "Branch 2: GAR/KvK — GAR / KvK Day 1 (Monday) & Day 2 (Tuesday)",
                  },
                  badge: {
                    vi: "GAR/KvK • Khung Giờ Vàng",
                    en: "GAR/KvK • Prime Window",
                  },
                  tone: "gold",
                  steps: [
                    {
                      id: "relic-flow-step-week-b-1",
                      title: {
                        vi: "Bung toàn bộ Wish Relic (1,500 đ/lần) và Mảnh Vàng (5,000 đ/mảnh) vào Ngày 1–2",
                        en: "Dump all Wish Relics (1,500 pts/pull) and Legendary Shards (5,000 pts/shard) on Days 1–2",
                      },
                      subtitle: {
                        vi: "Xả kèm Mảnh Tím (1,000 đ), Mảnh Xanh (200 đ), Arcane Crystal (1,200 đ) & 2,000 Magic Stones (600 đ)",
                        en: "Include Epic (1,000 pts), Rare (200 pts), Arcane Crystals (1,200 pts) & 2,000 Magic Stones (600 pts)",
                      },
                      tone: "gold",
                    },
                    {
                      id: "relic-flow-step-week-b-2",
                      title: {
                        vi: "Đẩy 3 món Vàng Đội 1 vượt mốc 130 ➔ 330 ➔ 490 ➔ 1,100 Mảnh Tích Lũy",
                        en: "Push Queue 1's 3 Legendary Relics past 130 ➔ 330 ➔ 490 ➔ 1,100 Cumulative Shards",
                      },
                      subtitle: {
                        vi: "Kích hoạt Áp Chế Sao (-50%) khóa nửa sức mạnh Thánh Vật đối phương",
                        en: "Trigger -50% Star Rating Suppression against enemy Relics",
                      },
                      tone: "gold",
                    },
                  ],
                  outcome: {
                    vi: "Ăn trọn 9 rương GAR / KvK Ngày 1–2 và thống trị Áp Chế Sao (-50%) trong PvP",
                    en: "Sweep all 9 GAR / KvK Day 1–2 chests and dominate PvP with -50% Star Suppression",
                  },
                },
                {
                  title: {
                    vi: "Nhánh 3: Phân Biệt Ngày 5 (Thứ Sáu) Giữa GAR Tiêu Chuẩn và KvK",
                    en: "Branch 3: Day 5 (Friday) Disambiguation — Standard GAR vs. KvK",
                  },
                  badge: {
                    vi: "Lưu Ý Ngày 5 Thứ Sáu",
                    en: "Day 5 Friday Rule",
                  },
                  tone: "emerald",
                  steps: [
                    {
                      id: "relic-flow-step-day5-check",
                      title: {
                        vi: "Kiểm tra sự kiện GAR/KvK là GAR tiêu chuẩn hay KvK liên server",
                        en: "Check whether GAR/KvK is standard GAR or cross-server KvK",
                      },
                      subtitle: {
                        vi: "GAR tiêu chuẩn không tính điểm Thánh Vật vào Ngày 5; chỉ riêng KvK mới tính điểm thêm vào Ngày 5 (Thứ Sáu)",
                        en: "Standard GAR does NOT score Relics on Day 5; only KvK adds Relic scoring on Day 5 (Friday)",
                      },
                      tone: "emerald",
                    },
                  ],
                  outcome: {
                    vi: "Không bao giờ xả nhầm mảnh Thánh Vật vào Ngày 5 của GAR tiêu chuẩn",
                    en: "Zero wasted Relic shards on Day 5 of standard GAR",
                  },
                },
              ],
              footnote: {
                vi: "Nguồn đối chiếu: TopHeroes Tables - Tab KvK & GAR & TOP. Tuyệt đối không xả Thánh Vật vào ngày thường.",
                en: "Source: TopHeroes Tables - Tab KvK & GAR & TOP. Never spend Relic materials on non-scoring weekdays.",
              },
            },
            {
              type: "table",
              caption: {
                vi: "Bảng Đối Chiếu Điểm Số Sự Kiện Thánh Vật: Kỳ Thi Đấu Hội (Guild Rush) vs Kỳ GAR/KvK (GAR / KvK Ngày 1–2) & Top Lord Stage 1",
                en: "Relic Event Scoring & Dump Windows: Guild Race (Guild Rush) vs. GAR/KvK (GAR / KvK Days 1–2) & Top Lord Stage 1",
              },
              headers: [
                {
                  vi: "Hành Động / Nguyên Liệu Tiêu Thụ",
                  en: "Action / Resource Consumed",
                },
                {
                  vi: "Kỳ Thi Đấu Hội: Guild Rush: Relic Hall & Relics (Thứ Tư – Thứ Năm & Task Hội)",
                  en: "Guild Race: Guild Rush: Relic Hall & Relics (Wed – Thu & Guild Tasks)",
                },
                {
                  vi: "Kỳ GAR/KvK: GAR / KvK Ngày 1–2 (Thứ Hai – Thứ Ba; + Ngày 5 chỉ riêng KvK)",
                  en: "GAR/KvK: GAR / KvK Days 1–2 (Mon – Tue; + Day 5 in KvK only)",
                },
                {
                  vi: "Top Lord Stage 1 (Relic Upgrade)",
                  en: "Top Lord Stage 1 (Relic Upgrade)",
                },
              ],
              rows: [
                [
                  {
                    vi: "Ước nguyện / Chiêu mộ Thánh Vật 1 lần (Summon / Wish Relic)",
                    en: "Summon / Wish Relic (1 Pull)",
                  },
                  {
                    vi: "Tính điểm theo Nhiệm vụ Guild Race",
                    en: "Scores via Guild Race Tasks",
                  },
                  {
                    vi: "1,500 điểm",
                    en: "1,500 pts",
                  },
                  {
                    vi: "1,500 điểm",
                    en: "1,500 pts",
                  },
                ],
                [
                  {
                    vi: "Tiêu thụ 1 Mảnh Thánh Vật Xanh (Rare Shard)",
                    en: "Consume 1 Rare Relic Shard",
                  },
                  {
                    vi: "5 điểm (50 điểm khi Kích hoạt)",
                    en: "5 pts (50 pts on Activation)",
                  },
                  {
                    vi: "200 điểm",
                    en: "200 pts",
                  },
                  {
                    vi: "200 điểm",
                    en: "200 pts",
                  },
                ],
                [
                  {
                    vi: "Tiêu thụ 1 Mảnh Thánh Vật Tím (Epic Shard)",
                    en: "Consume 1 Epic Relic Shard",
                  },
                  {
                    vi: "25 điểm (250 điểm khi Kích hoạt)",
                    en: "25 pts (250 pts on Activation)",
                  },
                  {
                    vi: "1,000 điểm",
                    en: "1,000 pts",
                  },
                  {
                    vi: "1,000 điểm",
                    en: "1,000 pts",
                  },
                ],
                [
                  {
                    vi: "Tiêu thụ 1 Mảnh Thánh Vật Vàng (Legendary Shard)",
                    en: "Consume 1 Legendary Relic Shard",
                  },
                  {
                    vi: "120 điểm (1,200 điểm khi Kích hoạt)",
                    en: "120 pts (1,200 pts on Activation)",
                  },
                  {
                    vi: "5,000 điểm (Cực lớn!)",
                    en: "5,000 pts (Massive ROI!)",
                  },
                  {
                    vi: "5,000 điểm (Cực lớn!)",
                    en: "5,000 pts (Massive ROI!)",
                  },
                ],
                [
                  {
                    vi: "Tiêu thụ 1 Tinh Thể Bí Thuật (Arcane Crystal)",
                    en: "Consume 1 Arcane Crystal",
                  },
                  {
                    vi: "12 điểm",
                    en: "12 pts",
                  },
                  {
                    vi: "1,200 điểm",
                    en: "1,200 pts",
                  },
                  {
                    vi: "1,200 điểm",
                    en: "1,200 pts",
                  },
                ],
                [
                  {
                    vi: "Tiêu thụ 2,000 Đá Ma Thuật (Magic Stones)",
                    en: "Consume 2,000 Magic Stones",
                  },
                  {
                    vi: "6 điểm",
                    en: "6 pts",
                  },
                  {
                    vi: "600 điểm",
                    en: "600 pts",
                  },
                  {
                    vi: "600 điểm",
                    en: "600 pts",
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: "sec-5-castle29-45m-star-suppression-case-study",
      isPro: true,
      title: {
        vi: "5. Phân Tích Thực Chiến Nâng Cao: Đảo Ngược Thế Cờ Áp Chế Sao (-50%) Cho Tài Khoản Castle 29 / 45M Lực Chiến (11★ ➔ 15★ Sao Vàng)",
        en: "5. Advanced Tactical Case Study: Reversing -50% Star Rating Suppression for a Castle 29 / 45M Power Account (11★ ➔ 15★ Legendary Stars)",
      },
      blocks: [
        {
          type: "case_study",
          badge: {
            vi: "Case Study • Castle 29 / 45M Power • Đảo Ngược Áp Chế Sao -50%",
            en: "Case Study • Castle 29 / 45M Power • Reversing -50% Star Suppression",
          },
          title: {
            vi: "Phẫu Thuật Hàng Đợi 1 (Castle 29 / 45M): Thay Thế Thánh Vật Tím 5 Sao & Bung 110 Mảnh Vàng Đạt 550,000 Điểm GAR Ngày 1",
            en: "Queue 1 Relic Audit (Castle 29 / 45M): Replacing a 5-Star Epic Relic & Dumping 110 Legendary Shards for 550,000 GAR Day 1 Points",
          },
          profileSummary: {
            vi: "• **Hồ sơ:** Castle 29 (`45M` tổng lực chiến, Đội 1 Liên Minh `4.5M`) liên tục thua các đối thủ `13★` Sao Vàng trong Đấu Trường (tỷ lệ thắng `68%`) dù chỉ số tướng tương đương.\n• **Hiện trạng:** Đội 1 đeo `Petrification Staff` (`6★` Vàng), `Duke's Signet Ring` (`5★` Tím = `0` Sao Vàng!) và `Feather of the Pact` (`5★` Vàng) ➔ Tổng Sao Vàng chỉ đạt `11★` (`6 + 0 + 5`), bị phạt `-50%`.",
            en: "• **Profile:** A Castle 29 account (`45M` total power, `4.5M` League Queue 1) repeatedly lost to `13★` Legendary Star rivals in Arena (`68%` win-rate) despite equal hero stats.\n• **Current State:** Queue 1 equipped `Petrification Staff` (`6★` Leg), `Duke's Signet Ring` (`5★` Epic = `0` Leg Stars!), and `Feather of the Pact` (`5★` Leg) ➔ `11★` total (`6 + 0 + 5`), suffering `-50%` suppression.",
          },
          metrics: [
            {
              label: {
                vi: "Tổng Số Sao Vàng Đội 1 (Legendary Star Rating)",
                en: "Queue 1 Total Legendary Star Rating",
              },
              before: {
                vi: "11★ Sao Vàng (6★ + 0★ Epic + 5★ — thua mốc 13★ của địch)",
                en: "11★ Legendary Stars (6★ + 0★ Epic + 5★ — below enemy 13★)",
              },
              after: {
                vi: "15★ Sao Vàng (6★ Petrification Staff + 4★ Soul Guard Orb + 5★ Feather of the Pact)",
                en: "15★ Legendary Stars (6★ Petrification Staff + 4★ Soul Guard Orb + 5★ Feather of the Pact)",
              },
              delta: {
                vi: "+4★ Sao Vàng (Đảo ngược từ bị phạt -50% sang khóa -50% đối thủ)",
                en: "+4★ Legendary Stars (Flipped from -50% suppressed to suppressing enemy by -50%)",
              },
            },
            {
              label: {
                vi: "Tỷ Lệ Thắng Đấu Trường Ngang Lực Chiến (Arena Win-Rate)",
                en: "Equal-Power Arena Win-Rate",
              },
              before: {
                vi: "68% (Thua sát nút do Khiên & Hóa đá bị cắt giảm -50%)",
                en: "68% (Losing close fights due to -50% halved shields & petrify duration)",
              },
              after: {
                vi: "100% (Toàn thắng các đối thủ 13★ và lật kèo đội hình hơn 300K – 500K lực chiến)",
                en: "100% (Sweeping 13★ rivals and beating marches +300K – 500K higher power)",
              },
              delta: {
                vi: "+32% Tỷ lệ thắng thực chiến",
                en: "+32% Arena Win-Rate",
              },
            },
            {
              label: {
                vi: "Điểm Sự Kiện GAR Ngày 1 (Thứ Hai Kỳ GAR/KvK)",
                en: "GAR Day 1 Event Score (GAR/KvK Monday)",
              },
              before: {
                vi: "0 điểm (Nâng lẻ tẻ ngày thường hoặc chờ nhầm Ngày 5)",
                en: "0 pts (Upgraded randomly on weekdays or waited for Day 5 by mistake)",
              },
              after: {
                vi: "550,000 điểm GAR Ngày 1 (từ 110 Mảnh Thánh Vật Vàng × 5,000 điểm)",
                en: "550,000 GAR Day 1 pts (from 110 Legendary Relic Shards × 5,000 pts)",
              },
              delta: {
                vi: "+550,000 điểm mở khóa toàn bộ rương mốc GAR Ngày 1",
                en: "+550,000 pts unlocking all GAR Day 1 milestone chests",
              },
            },
          ],
          diagnostics: [
            {
              vi: "**Chẩn đoán #1 (Bẫy Thánh Vật Tím 5 Sao):** `Duke's Signet Ring` dù ở Bậc 1 - Sao 5 (`5★` Tím) vẫn tính là `0` Sao Vàng trong Áp Chế Sao, làm Đội 1 hụt mất 4–5 Sao Vàng so với chuẩn 3 món Legendary.",
              en: "**Diagnostic #1 (5-Star Epic Trap):** Although `Duke's Signet Ring` was at Tier 1 - Star 5 (`5★` Epic), it contributed `0` Legendary Stars toward Star Rating Suppression, costing Queue 1 4–5 Legendary Stars.",
            },
            {
              vi: "**Chẩn đoán #2 (Đứt gãy Bộ 3 Phe Phái):** Thiếu mảnh ghép thứ 2 của bộ `Arcane Vault` (`Soul Guard Orb`) hoặc `Dragon's Might` (`Thunder Judgment`, `Dragonheart`, `Dragonbone Amulet`), mất hiệu ứng `Damage Cap`.",
              en: "**Diagnostic #2 (Broken 3-Piece Faction Synergy):** Missing the Slot 2 Legendary centerpiece (`Soul Guard Orb` for `Arcane Vault`, or `Dragonheart` for `Dragon's Might`) left the frontline without per-hit `Damage Cap`.",
            },
          ],
          recoverySteps: [
            {
              stepNumber: "1",
              title: {
                vi: "Gỡ Duke's Signet Ring (5★ Tím) Chuyển Xuống Đội 2 & Lắp Đủ 3 Món Vàng Đồng Hệ",
                en: "Move Duke's Signet Ring (5★ Epic) to Queue 2 & Equip a Full 3-Piece Faction Legendary Trio",
              },
              detail: {
                vi: "• Chuyển `Duke's Signet Ring` xuống Đội hình 2 làm phôi giảm kháng chí mạng phụ trợ.\n• Lắp `Soul Guard Orb` vào Ô số 2 của Đội 1 để hoàn thiện bộ 3 `Arcane Vault` (`Petrification Staff` + `Soul Guard Orb` + `Feather of the Pact`).",
                en: "• Reassign `Duke's Signet Ring` to Queue 2 for secondary crit-resistance shred.\n• Slot `Soul Guard Orb` into Queue 1's Slot 2 to complete the 3-piece `Arcane Vault` set (`Petrification Staff` + `Soul Guard Orb` + `Feather of the Pact`).",
              },
              impactBadge: {
                vi: "Kích hoạt Full Bộ 3 Legendary",
                en: "Full 3-Piece Legendary Trio",
              },
            },
            {
              stepNumber: "2",
              title: {
                vi: "Xả 110 Mảnh Vàng Vào Sáng Thứ Hai Kỳ GAR/KvK (GAR Ngày 1) Đẩy Tổng Sao Từ 11★ Lên 15★",
                en: "Dump 110 Legendary Shards on Monday GAR/KvK (GAR Day 1) to Push 11★ ➔ 15★",
              },
              detail: {
                vi: "• Đợi đúng Ngày 1 (Thứ Hai) Kỳ GAR/KvK (nhớ quy tắc GAR tiêu chuẩn không tính điểm Thánh Vật vào Ngày 5).\n• Xả `110` Mảnh Vàng (`550,000` điểm GAR) nâng `Soul Guard Orb` lên `4★` (`100` mảnh), đưa Đội 1 từ `11★` lên `15★` Sao Vàng (vượt mốc `13★` của địch).",
                en: "• Wait for Day 1 (Monday) of GAR/KvK (remembering standard GAR does NOT score Relics on Day 5).\n• Spend `110` Legendary Shards (`550,000` GAR pts) to raise `Soul Guard Orb` to `4★` (`100` shards), lifting Queue 1 from `11★` to `15★` Legendary Stars (past the enemy's `13★`).",
              },
              impactBadge: {
                vi: "11★ ➔ 15★ & +550,000 đ GAR",
                en: "11★ ➔ 15★ & +550,000 GAR pts",
              },
            },
            {
              stepNumber: "3",
              title: {
                vi: "Kích Hoạt Khóa -50% Đối Thủ & Cộng Hưởng +1 Giây (Feather of the Pact)",
                en: "Lock Enemy Relics at -50% & Activate +1s Duration Synergy",
              },
              detail: {
                vi: "• Với `15★ > 13★`, toàn bộ sát thương và lá chắn Thánh Vật của đối thủ bị cắt giảm `-50%`.\n• Liên kết `+1s` của `Feather of the Pact` và hiệu ứng chặn trần sát thương từ `Soul Guard Orb` hoạt động `100%` công suất, nâng tỷ lệ thắng Đấu Trường từ `68%` lên `100%`.",
                en: "• With `15★ > 13★`, all enemy Relic damage and shields are cut by `-50%`.\n• `Feather of the Pact`'s `+1s` duration synergy and `Soul Guard Orb`'s damage cap operate at `100%` strength—lifting Arena win-rate from `68%` to `100%`.",
              },
              impactBadge: {
                vi: "68% ➔ 100% Win-Rate",
                en: "68% ➔ 100% Win-Rate",
              },
            },
          ],
          conclusion: {
            vi: "Chỉ cần thay 1 món Tím `5★` bằng Thánh Vật Vàng đúng hệ và xả `110` mảnh Vàng đúng Ngày 1–2 Kỳ GAR/KvK, Đội 1 vừa thu về `550,000` điểm GAR vừa lật ngược cán cân **Áp Chế Sao `-50%`**.",
            en: "Replacing one `5★` Epic with a faction Legendary Relic and dumping `110` Legendary shards on GAR/KvK Days 1–2 nets `550,000` GAR pts while flipping **`-50%` Star Rating Suppression** in your favor.",
          },
        },
        {
          type: "media_spotlight",
          mediaCode: "MED-6.2-04",
          tier: "tier4_youtube_ref",
          title: {
            vi: "Video Tham Chiếu Quốc Tế: Phân Tích BiS Thánh Vật 3 Phe, Liên Kết Sảnh Thánh Tích & Cơ Chế Áp Chế Sao -50%",
            en: "Video Reference: Top Heroes Relics Tier List, -50% Star Suppression & 3-Faction BiS Loadouts",
          },
          description: {
            vi: "Video phân tích thực chiến cách kiểm toán 3 Ô Thánh Vật (Relics Trio), thứ tự mở khóa Relic Hall Bonds (+1s) và so sánh trực tiếp hiệu quả Áp Chế Sao (-50%) giữa 3 bộ Dragon's Might, Arcane Vault và Oath of the Sacred Forest.",
            en: "In-depth video guide covering 3-slot Relic Trio optimization, Relic Hall Bond (+1s) unlocking priority, and live PvP testing of -50% Star Rating Suppression across Dragon's Might, Arcane Vault, and Oath of the Sacred Forest.",
          },
          videoChannel: "@T.H.S.G-Official",
          videoTitle: "Top Heroes: Relics Tier List, Star Suppression & BiS Faction Loadouts",
          videoTimestamp: "03:00 – 08:45",
          videoUrl: "https://www.youtube.com/results?search_query=Top+Heroes+Relics+Guide+Star+Suppression",
        },
      ],
    },
  ],
};

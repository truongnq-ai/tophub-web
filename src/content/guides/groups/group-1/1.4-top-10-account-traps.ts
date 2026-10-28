import type { GuideArticle } from "../../types";

export const ARTICLE_1_4_TOP_10_TRAPS: GuideArticle = {
  code: "1.4",
  slug: "top-10-account-traps",
  categorySlug: "getting-started",
  badge: "HOT",
  readingMinutes: 12,
  title: {
    vi: "10 Cạm Bẫy 'Phế Acc' Kinh Điển & Phác Đồ Cấp Cứu (Top 10 Account-Ruining Traps & Recovery Protocol)",
    en: "Top 10 Account-Ruining Traps & Recovery Protocol",
  },
  summary: {
    vi: "Phân tích 10 sai lầm chí mạng khiến 90% người chơi tụt hậu trong 60 ngày đầu tiên và Bảng Phác đồ Cấp cứu Tài khoản (Account Recovery Protocol) định lượng theo chu kỳ sự kiện.",
    en: "Deep-dive analysis of the 10 fatal mistakes that cripple 90% of accounts in the first 60 days, complete with a quantitative Account Recovery Protocol.",
  },
  tldr: {
    coreRule: {
      vi: "**Bảo toàn Tài nguyên Khóa cứng (`Hard-Gated Currencies`):** Khoảng cách giữa tài khoản F2P Top đầu và tài khoản 'phế' không nằm ở số giờ cày cuốc.\n• **Kỷ luật 60 Ngày Đầu:** Tuyệt đối tránh 10 sai lầm hủy hoại tài nguyên không thể hoàn tác trong 60 ngày đầu tiên.",
      en: "**Preserve Hard-Gated Currencies:** The gap between a top-tier F2P account and a ruined account lies not in grinding hours.\n• **First 60 Days Discipline:** Avoid the 10 irreversible `Hard-Gated Currency` mistakes during the first 60 days.",
    },
    immediateAction: {
      vi: "**Kiểm toán 10 Điểm Đỏ (`Red Audit`):** Rà soát ngay tài khoản của bạn qua 10 Điểm Kiểm Toán Đỏ dưới đây.\n• **Kích hoạt Phác đồ Cắt lỗ (`Stop-Loss Protocol`):** Nếu phát hiện đang mắc bất kỳ lỗi nào, dừng ngay thao tác đó và thực thi bảng cấp cứu ở Phần II.",
      en: "**Run the 10-Point Red Audit:** Audit your account immediately against the 10 Red Audit Checkpoints below.\n• **Execute Stop-Loss Recovery:** If you detect any active mistake, halt that action right away and follow the `Stop-Loss Protocol` in Part II.",
    },
    strictTaboo: {
      vi: "**3 Cấm Kỵ Không Thể Hoàn Tác:** Không bao giờ đút `Mảnh Anh Hùng Huyền Thoại Vạn Năng` (`Mảnh Vàng Vạn Năng`) cho `Tướng Quán Rượu` (`Tavern Heroes`).\n• **Khóa Ví Bang & Rương Thần Khí:** Cấm tiêu `Điểm Vinh Dự Bang` / `Xu Vinh Quang Hội` trước `Lâu Đài` `Lv.30` (để mua `9 Hồn Đá Đỏ`) và cấm mở `Rương Vũ Khí Độc Quyền` cho tướng phụ.",
      en: "**3 Irreversible Taboos:** Never feed `Universal Legendary Hero Shard` items to standard `Tavern Heroes`.\n• **Lock Guild Wallet & UW Chests:** Never spend `Guild Honor` or `Guild Glory Coins` before `Castle` `Lv.30` (save for `9 Soul Stones`), and never open `Exclusive Weapon Chest` items for transitional heroes.",
    },
  },
  keyTakeaways: [
    {
      vi: "**Khóa `100%` `Mảnh Anh Hùng Huyền Thoại Vạn Năng` cho Tướng Đỏ Đội 1:** Tướng Đỏ tốn `400` / `560` / `1,000` Mảnh (gấp đôi mốc `200` / `280` / `500` Mảnh của Tướng Vàng).\n• **Quy tắc `Tướng Quán Rượu` (`Tavern Heroes`):** Chỉ được nâng sao tự nhiên bằng mảnh riêng rơi miễn phí hàng ngày.",
      en: "**Lock `100%` of `Universal Legendary Hero Shard` Reserves for Queue 1 Mythics:** Mythic heroes cost `400` / `560` / `1,000` Shards (double the `200` / `280` / `500` Shards of Legendaries).\n• **`Tavern Heroes` Rule:** Upgrade `Tavern Heroes` strictly using their own specific shards.",
    },
    {
      vi: "**Đáy Ví `Đá Linh Hồn` (`Soul Stone Safety Floor`):** Giữ tối thiểu `40,000` `Điểm Vinh Dự Bang` hoặc `12,000–18,000` `Xu Vinh Quang Hội` mỗi tuần.\n• **Định mức Thức tỉnh `Lv.30` (`S1`):** Gom đủ `9 Hồn Đá Đỏ` (`40,000` Điểm/viên = `360,000` hoặc `6,000` Xu/viên = `54,000`) + `345–385` Mảnh Tướng.",
      en: "**Weekly Wallet Safety Floor:** Maintain at least `40,000` `Guild Honor` or `12,000–18,000` `Guild Glory Coins` untouched every week.\n• **`Castle` `Lv.30` (`S1`) Awakening Quota:** Secure `9 Soul Stones` (`40,000` Guild Honor/stone = `360,000` or `6,000` Glory Coins/stone = `54,000`) + `345–385` Hero Shards.",
    },
    {
      vi: "**Thiên phú Kinh tế Bộ Ba Tướng Tím:** Đẩy `Võ Sĩ` (`Brawler` `+30%` Nghiên cứu), `Kỵ Sĩ` (`Knight` `+30%` Lính), `Cung Thủ` (`Ranger` `+30%` Đào Ruby) lên `2★ Trắng` (`300` Mảnh) ➔ `5★ Trắng` (`500` Mảnh).\n• **Chuỗi `Trait 3 Max Lv.30`:** Dừng `Trait 1` ở `Lv.15`, cấm mở Ô 4 tốn `2,000` KC; tốc độ xây dựng `+40%` thuộc về tướng Vàng `Nhà Thơ` (`Bard`).",
      en: "**Epic Economy Trio Traits:** Push `Brawler` (`+30%` Tech Research), `Knight` (`+30%` Soldier Training), and `Ranger` (`+30%` Ruby Gathering) to `2 White Stars` (`300` Shards) ➔ `5 White Stars` (`500` Shards).\n• **`Trait 3 Max Lv.30` Rule:** Stop `Trait 1` at `Lv.15`, never unlock Slot 4 for `2,000` Diamonds; `+40%` Construction Rate belongs to `Bard`.",
    },
    {
      vi: "**Kỹ thuật `Thăng Cấp Lính Bậc Thang` (`Staircase Troop Promotion`):** Đẻ lính bậc thấp ngày thường rồi bấm `Promote` hàng loạt vào Thứ Sáu `Đua Vũ Trang Bang Hội` (`GAR`) / `Đức Vua Tối Cao` (`KvK`).\n• **Kiểm toán Tối Chủ Nhật:** Đọc Lịch Event Thứ Hai lúc `02:00 UTC` (`09:00` sáng Giờ VN) và giữ nguyên `Hộp Quà Công Trình Chưa Mở` (`Unopened Building Gift Box`).",
      en: "**`Staircase Troop Promotion`:** Pre-train lower-tier troops on weekdays and batch-`Promote` on Friday of `Guild Arms Race` (`GAR`) / `Supreme King` (`KvK`).\n• **Sunday Evening Audit:** Check the Monday `02:00 UTC` Event Calendar and leave `Unopened Building Gift Box` rewards untouched until reset.",
    },
  ],
  keywords: [
    "top 10 account traps",
    "10 cam bay phe acc",
    "phac do cap cuu",
    "account recovery protocol",
    "staircase",
    "staircase troop promotion",
    "thang cap linh bac thang",
    "hon da do",
    "soul stones",
    "brawler",
    "knight",
    "ranger",
    "bard",
    "thi dau hoi",
    "tap kich cu ma",
    "khieu chien cua doi quan hac am",
    "unopened building gift box",
    "pre-cooking queues",
    "sunday audit checklist",
  ],
  sourceFiles: [
    "group-1-getting-started/1.4-top-10-account-traps.md",
    "group-8-infrastructure/8.4-master-data-tables.md",
  ],
  freeSections: [
    {
      id: "sec-1-irreversible-currencies",
      title: {
        vi: "1. Giải thích Cơ chế Cốt lõi: Tại Sao Một Vài Cú Bấm Sai Có Thể Làm Chậm Tiến Độ 2–3 Tháng?",
        en: "1. Core Mechanics: Why a Few Misclicks Can Set Your Account Back 2–3 Months",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "**Cơ chế Khóa cứng Tài nguyên (`Hard-Gated Currencies`):** Khác với các game nhập vai cho phép `Reset` tướng hoàn trả `100%` nguyên liệu, Top Heroes khóa vĩnh viễn tài nguyên cấp cao ngay khi bấm dùng:",
            en: "**Permanent `Hard-Gated Currencies`:** Unlike casual RPGs where you can freely `Reset` heroes for a `100%` refund, Top Heroes permanently locks high-tier currencies the moment they are spent:",
          },
        },
        {
          type: "list",
          items: [
            {
              vi: "**Không thể tách Sao Tướng:** Bạn không thể hạ cấp một vị tướng đã nâng Sao để thu hồi lại `Mảnh Anh Hùng Huyền Thoại Vạn Năng` (`Universal Legendary Hero Shard`).",
              en: "**Irreversible Star Upgrades:** You cannot dismantle or downgrade a starred-up hero to recover `Universal Legendary Hero Shard` investments.",
            },
            {
              vi: "**Không thể hoàn trả Sách & Thần khí:** Bạn không thể thu hồi `Sách Kỹ Năng` (`Skill Book`) hay `Rương Vũ Khí Độc Quyền` (`Exclusive Weapon Chest`) đã nâng nhầm cho tướng phụ.",
              en: "**Non-Refundable Books & Weapons:** You cannot refund `Skill Book` or `Exclusive Weapon Chest` resources mistakenly invested into secondary or transitional heroes.",
            },
            {
              vi: "**Không thể hoàn lại Tiền tệ Bang:** Tiêu `Điểm Vinh Dự Bang` (`Guild Honor`) hay `Xu Vinh Quang Hội` (`Guild Glory Coins`) mua mảnh lẻ sẽ mất vĩnh viễn khi cần `Đá Linh Hồn` (`9 Hồn Đá Đỏ`) ở `Season 1`.",
              en: "**Unrecoverable Guild Currency:** Tens of thousands of `Guild Honor` or `Guild Glory Coins` wasted on cosmetics/shards are lost forever when `Season 1` demands `9 Soul Stones` (`Soul Stone`).",
            },
          ],
        },
        {
          type: "visual_diagram",
          mediaCode: "MED-1.4-01",
          variant: "hub_pillars",
          title: {
            vi: "Kiểm Toán Sức Khỏe Tài Khoản (60 Ngày Đầu): 4 Nhóm Cạm Bẫy Hệ Thống",
            en: "Account Health Audit (First 60 Days): The 4 Systemic Trap Groups",
          },
          subtitle: {
            vi: "Sơ đồ phân loại 10 Cạm bẫy Phế Acc theo 4 nhóm hệ thống và hậu quả thất thoát tài nguyên không thể hoàn tác",
            en: "Classification of the 10 Account-Ruining Traps across 4 system pillars and their irreversible resource loss consequences",
          },
          centerNode: {
            id: "audit-core",
            badge: { vi: "60 Ngày Đầu", en: "First 60 Days" },
            title: {
              vi: "Kiểm Toán Sức Khỏe Tài Khoản",
              en: "Account Health Audit",
            },
            subtitle: {
              vi: "Bảo toàn Hard-Gated Currencies cho Đội hình 1",
              en: "Preserve Hard-Gated Currencies for Queue 1",
            },
            tone: "gold",
          },
          nodes: [
            {
              id: "trap-group-1",
              badge: { vi: "Bẫy #1, #5, #9", en: "Traps #1, #5, #9" },
              title: {
                vi: "Nhóm Bẫy Tướng & Kỹ Năng",
                en: "Heroes & Skills Traps",
              },
              subtitle: {
                vi: "Đút Mảnh Anh Hùng Huyền Thoại Vạn Năng cho Tướng Quán Rượu, nâng skill chiến đấu / mở Ô 4 (2,000 KC) tướng Tím, mở nhầm Rương Vũ Khí Độc Quyền.",
                en: "Feeding Universal Legendary Hero Shards to Tavern Heroes, leveling Epic combat skills / Slot 4 (2,000 KC), opening Exclusive Weapon Chests early.",
              },
              metrics: [
                {
                  vi: "Hậu quả: Mất hàng trăm Mảnh Vạn Năng, Sách Kỹ Năng & Rương Vũ Khí Độc Quyền",
                  en: "Impact: Lose hundreds of Universal Shards, Skill Books & Exclusive Weapon Chests",
                },
              ],
              tone: "rose",
            },
            {
              id: "trap-group-2",
              badge: { vi: "Bẫy #2, #4", en: "Traps #2, #4" },
              title: {
                vi: "Nhóm Bẫy Cửa Hàng & Sự Kiện",
                en: "Shops & Events Traps",
              },
              subtitle: {
                vi: "Tiêu sạch Điểm Vinh Dự Bang / Xu Vinh Quang Hội trước Lv.30 và xả tài nguyên trái Lịch Event Thứ Hai (02:00 UTC / 09:00 Giờ VN).",
                en: "Spending Guild Honor / Guild Glory Coins before Lv.30 and dumping resources off the Monday 02:00 UTC Event Calendar.",
              },
              metrics: [
                {
                  vi: "Hậu quả: Thiếu 9 Hồn Đá Đỏ (Đá Linh Hồn) Thức Tỉnh & Thiệt 50%–70% Quà Sự Kiện",
                  en: "Impact: Miss 9 Awakening Soul Stones & Lose 50%–70% Event Rewards",
                },
              ],
              tone: "rose",
            },
            {
              id: "trap-group-3",
              badge: { vi: "Bẫy #3, #7", en: "Traps #3, #7" },
              title: {
                vi: "Nhóm Bẫy Trang Bị & Cổ Ngữ",
                en: "Gear & Runes Traps",
              },
              subtitle: {
                vi: "Đúc sai Bộ Đồ Quyết Đấu / Bộ Kỵ Sĩ / Bộ Hiền Giả không Dấu Ấn Phe Phái, đập cường hóa lệch bậc (+25 vs +5) và ghép Cổ Ngữ / Phù Văn dàn trải ở Lv.1–3.",
                en: "Forging wrong Duelist's Set / Knight Set / Sage Set without Faction Mark, uneven enhancement (+25 vs +5), and spreading low-tier Lv.1–3 Runes.",
              },
              metrics: [
                {
                  vi: "Hậu quả: Mất +30% Chỉ số Dấu Ấn Phe Phái, kẹt Cộng hưởng +10/+20 & thiếu Mốc Rune Lv.5/Lv.8",
                  en: "Impact: Lose +30% Faction Mark Bonus, miss +10/+20 Resonance & Lv.5/Lv.8 Rune Breakpoints",
                },
              ],
              tone: "gold",
            },
            {
              id: "trap-group-4",
              badge: { vi: "Bẫy #6, #8, #10", en: "Traps #6, #8, #10" },
              title: {
                vi: "Nhóm Bẫy Hạ Tầng & Khoa Học",
                en: "Infrastructure & Tech Traps",
              },
              subtitle: {
                vi: "Nghiên cứu Quân Đội (Soldiers) trước Chuẩn Bị Đua Vũ Trang (Arms Race Prep), nâng Nhà Kho/Mỏ làm chậm Lâu Đài & Viện Tinh Hoa, và bỏ qua Thăng Cấp Lính Bậc Thang.",
                en: "Researching Soldiers before Arms Race Prep, upgrading Warehouses/Mines over Castle & Brilliance Institute, skipping Staircase Troop Promotion.",
              },
              metrics: [
                {
                  vi: "Hậu quả: Chậm mở Hộp 6 Double Rewards, chậm lên Lâu Đài Lv.30/Lv.40 & tích lính ảo",
                  en: "Impact: Delay Chest 6 Double Rewards, delay Castle Lv.30/Lv.40 & bloat fake troop power",
                },
              ],
              tone: "blue",
            },
          ],
          footnote: {
            vi: "Mọi sai lầm ở Nhóm 3 & 4 có thể khắc phục 100%, nhưng sai lầm ở Nhóm 1 & 2 làm thất thoát vĩnh viễn tài nguyên giới hạn.",
            en: "Mistakes in Groups 3 & 4 are 100% recoverable, whereas mistakes in Groups 1 & 2 permanently destroy hard-gated currencies.",
          },
        },
      ],
    },
    {
      id: "sec-2-ten-account-traps",
      title: {
        vi: "2. Phân tích Chi tiết 10 'Cạm Bẫy Phế Acc' Kinh Điển Nhất Trong 60 Ngày Đầu",
        en: "2. Deep-Dive Analysis of the Top 10 Account-Ruining Traps in the First 60 Days",
      },
      blocks: [
        {
          type: "widget",
          widgetType: "account_traps_triage",
        },
        {
          type: "paragraph",
          text: {
            vi: "**Hồ sơ Chẩn đoán 10 Điểm Kiểm Toán Đỏ:** Phân tích biểu hiện sai lầm phổ biến, cơ chế toán học gây tụt hậu và quy tắc chuẩn Meta cho từng hệ thống:",
            en: "**Diagnostic Breakdown of the 10 Red Audit Traps:** Covering common symptoms, the underlying math that cripples progression, and the exact Meta standard rule:",
          },
        },
        {
          type: "media_spotlight",
          mediaCode: "MED-1.4-02",
          tier: "tier2_annotated_ui",
          title: {
            vi: "Đối Chiếu Trực Quan Bẫy #3 & Bẫy #5: Thiên Phú Tướng Tím & Dấu Ấn Phe Phái Trang Bị Vàng (+30%)",
            en: "Visual Comparison for Traps #3 & #5: Epic Hero Traits & Faction-Marked Legendary Gear (+30%)",
          },
          description: {
            vi: "Ảnh ghép đôi (Side-by-Side Comparison): Bên trái khoanh đỏ Ô Thiên phú số 4 của Tướng Tím (2,000 KC — Cấm mở vì chỉ +3% HP cá nhân) và khoanh xanh Ô Thiên phú số 3 (+30% Research/Training/Ruby Speed — Nâng Max Lv.30); Bên phải đối chiếu món Trang bị Vàng có Biểu tượng Dấu Ấn Phe Phái (+30% Bonus) vs Trang bị Vàng không dấu.",
            en: "Side-by-side annotated UI: Left highlights Epic Hero Trait Slot 4 in red (2,000 Diamonds — DO NOT UNLOCK, only +3% personal HP) and Trait Slot 3 in green (+30% Research/Training/Ruby Speed — Max to Lv.30); Right contrasts Faction-Marked Legendary Gear (+30% Bonus) against unmarked Legendary Gear.",
          },
          annotations: [
            {
              kind: "dont",
              label: {
                vi: "CẤM MỞ: Ô Thiên Phú Số 4 (2,000 KC)",
                en: "DO NOT UNLOCK: 4th Trait Slot (2,000 Diamonds)",
              },
              detail: {
                vi: "Tốn 2,000 Kim Cương nhưng chỉ cộng +3% HP cho riêng bản thân tướng Tím khi ra trận — vô giá trị khi tướng ngồi dự bị.",
                en: "Costs 2,000 Diamonds for a mere +3% personal HP when deployed — completely useless on bench economy heroes.",
              },
            },
            {
              kind: "do",
              label: {
                vi: "NÂNG MAX: Ô Thiên Phú Số 3 (Lv.30) & Đồ Vàng Có Dấu Ấn Phe Phái (+30%)",
                en: "MAX OUT: 3rd Trait Slot (Lv.30) & Faction-Marked Gold Gear (+30%)",
              },
              detail: {
                vi: "Dừng Trait 1 ở Lv.15 để mở Trait 3 Max Lv.30 (+30% Nghiên cứu / Huấn luyện / Đào Ruby); luôn rèn Đồ Vàng có biểu tượng Phe phái (+30% chỉ số) và đập đều +10 / +20 / +30 / +40.",
                en: "Stop Trait 1 at Lv.15 to max Trait 3 at Lv.30 (+30% Research/Training/Ruby Speed); always craft Faction-Marked Gold Gear (+30% stats) and enhance evenly to +10 / +20 / +30 / +40.",
              },
            },
          ],
        },
        {
          type: "media_spotlight",
          mediaCode: "MED-1.4-03",
          tier: "tier2_annotated_ui",
          title: {
            vi: "Đối Chiếu Trực Quan Bẫy #6 & Bẫy #10: Nhánh Chuẩn Bị Đua Vũ Trang (Double Rewards) & Nút Promote Lính Bậc Thang",
            en: "Visual Comparison for Traps #6 & #10: Arms Race Prep (Double Rewards) & Staircase Troop Promotion Button",
          },
          description: {
            vi: "Ảnh chụp Cây Công Nghệ Chuẩn Bị Đua Vũ Trang (Arms Race Prep) chỉ mũi tên vào nốt Nhân Đôi Phần Thưởng Rương (Double Rewards 4–5–6) và giao diện Trại Lính minh họa nút Thăng cấp Lính (Promote Arrow Icon) trong kỹ thuật Thăng Cấp Lính Bậc Thang (Staircase Troop Promotion).",
            en: "Annotated screenshot of the Arms Race Prep tech tree pointing directly to the Double Rewards node (Chests 4–5–6) alongside the Barracks interface highlighting the Promote arrow button used in Staircase Troop Promotion.",
          },
          annotations: [
            {
              kind: "do",
              label: {
                vi: "ƯU TIÊN SỐ 1: Nốt Double Rewards (Nhánh Chuẩn Bị Đua Vũ Trang)",
                en: "PRIORITY #1: Double Rewards Node (Arms Race Prep Tree)",
              },
              detail: {
                vi: "Mở khóa Rương 4–5–6 và nhân đôi toàn bộ Kim Cương, Mảnh Anh Hùng Huyền Thoại Vạn Năng nhận được từ sự kiện Đua Vũ Trang Bang Hội mỗi tuần.",
                en: "Unlocks Chests 4–5–6 and doubles all Diamonds and Universal Legendary Hero Shards earned from weekly Guild Arms Race events.",
              },
            },
            {
              kind: "info",
              label: {
                vi: "KỸ THUẬT STAIRCASE: Nút Mũi Tên Thăng Cấp (Promote)",
                en: "STAIRCASE TECH: Barracks Promote Arrow Icon",
              },
              detail: {
                vi: "Nuôi lính bậc T(n-1) vào ngày thường (Thứ Bảy ➔ Thứ Năm), sau đó bấm Promote lên bậc cao nhất T(n) vào Thứ Sáu Kỳ GAR/KvK để ăn điểm gấp 2–3 lần trên mỗi giờ tăng tốc.",
                en: "Train T(n-1) troops on normal days (Saturday ➔ Thursday), then click Promote to upgrade them to T(n) on Friday of GAR/KvK for 2–3x event points per speedup hour.",
              },
            },
          ],
        },
      ],
      subSections: [
        {
          id: "sub-trap-1",
          badge: { vi: "Cạm bẫy #1", en: "Trap #1" },
          title: {
            vi: "Cạm Bẫy #1: Đút `Mảnh Anh Hùng Huyền Thoại Vạn Năng` (Mảnh Vàng Vạn Năng) Cho `Tướng Quán Rượu` (Tavern Heroes)",
            en: "Trap #1: Feeding `Universal Legendary Hero Shard` Reserves into Standard `Tavern Heroes`",
          },
          blocks: [
            {
              type: "list",
              items: [
                {
                  vi: "**Biểu hiện sai lầm:** Đem `Mảnh Anh Hùng Huyền Thoại Vạn Năng` (`Mảnh Vàng Vạn Năng`) đút cho nhóm `Tướng Quán Rượu` (`Tavern Heroes`: `Secret Keeper`, `Astrologer`, `Shaman`, `Barbarian`, `Treeguard`, `Windwalker`).",
                  en: "**Symptom:** Feeding hundreds of `Universal Legendary Hero Shard` items in Weeks 1–2 into standard `Tavern Heroes` (`Secret Keeper`, `Astrologer`, `Shaman`, `Barbarian`, `Treeguard`, `Windwalker`).",
                },
                {
                  vi: "**Tại sao gây phế acc:** `Tướng Quán Rượu` rơi mảnh riêng miễn phí (đổi tỷ lệ `5:1`); trong khi Tướng Đỏ tốn gấp đôi mảnh (`400` = `5★ Đỏ`, `560` = `1★ Trắng`, `1,000` = `5★ Trắng` vs `200 / 280 / 500` và `24,700` Sách).",
                  en: "**Why It Ruins Your Account:** `Tavern Heroes` drop free shards (`5:1` exchange); meanwhile Mythics cost double (`400` = `5★ Red`, `560` = `1★ White`, `1,000` = `5★ White` vs `200 / 280 / 500` and `24,700` Skill Books).",
                },
              ],
            },
            {
              type: "callout",
              variant: "rule",
              title: {
                vi: "Quy tắc chuẩn — Cạm bẫy #1",
                en: "Meta Standard Rule — Trap #1",
              },
              content: {
                vi: "**Đóng băng 100% `Mảnh Anh Hùng Huyền Thoại Vạn Năng`:** `Tướng Quán Rượu` chỉ nâng bằng mảnh riêng.\n• **Dồn 100% cho Đội 1:** Khóa chặt cho Tướng Đỏ Đội 1 (`Hoàng Tử Sa Mạc`, `Trinh Nữ Bão Tố`, `Ngộ Không`, `Đấng Toàn Năng`, `Triệu Hồi Thủy`) hoặc cặp Thức tỉnh (`Pháp Sư Hỏa Thuật` / `Hiền Nhân`)!",
                en: "**Freeze 100% `Universal Legendary Hero Shard` Stockpiles:** Upgrade `Tavern Heroes` strictly with their own specific shards.\n• **Queue 1 Priority:** Freeze `100%` of `Universal Legendary Hero Shard` items for Queue 1 Mythics (`Desert Prince`, `Storm Maiden`, `Wukong`, `Paragon`, `Tidecaller`) or Awakenable carries (`Pyromancer` / `Sage`)!",
              },
            },
          ],
        },
        {
          id: "sub-trap-2",
          badge: { vi: "Cạm bẫy #2", en: "Trap #2" },
          title: {
            vi: "Cạm Bẫy #2: Tiêu `Điểm Vinh Dự Bang` & `Xu Vinh Quang Hội` Mua Rác Thay Vì `Đá Linh Hồn` (9 Hồn Đá Đỏ)",
            en: "Trap #2: Wasting `Guild Honor` & `Guild Glory Coins` on Filler Instead of `Soul Stone` (Red Soul Stone)",
          },
          blocks: [
            {
              type: "list",
              items: [
                {
                  vi: "**Biểu hiện sai lầm:** Mỗi tuần kiếm được vài ngàn `Điểm Vinh Dự Bang` (`Guild Honor`) hoặc `Xu Vinh Quang Hội` (`Guild Glory Coins`) liền vào Tiệm Bang mua sạch mảnh tướng lẻ, rương đồ tím hoặc Quân Trang (`12,000 xu`).",
                  en: "**Symptom:** Spending weekly `Guild Honor` or `Guild Glory Coins` immediately on random hero shards, purple gear chests, or overpriced Universal Munitions (`12,000 coins`).",
                },
                {
                  vi: "**Tại sao gây phế acc:** `Lâu Đài` `Lv.30` (`S1`) mở `Đá Linh Hồn` (`9 Hồn Đá Đỏ`) giá `40,000` Điểm/viên (`360,000`) hoặc `6,000` Xu/viên (`54,000`) + `345–385` Mảnh; tiêu sớm làm chậm Thức tỉnh `6–10 tuần`.",
                  en: "**Why It Ruins Your Account:** `Castle` `Lv.30` (`S1`) unlocks `9 Soul Stones` at `40,000` Honor/stone (`360,000`) or `6,000` Coins/stone (`54,000`) + `345–385` Shards, delaying Awakening `6–10 weeks`.",
                },
              ],
            },
            {
              type: "callout",
              variant: "rule",
              title: {
                vi: "Quy tắc chuẩn — Cạm bẫy #2",
                en: "Meta Standard Rule — Trap #2",
              },
              content: {
                vi: "**Ngưỡng Đóng Băng Ví Hàng Tuần (`Weekly Wallet Safety Floor`):** Luôn giữ tối thiểu `40,000` `Điểm Vinh Dự Bang` hoặc `12,000–18,000` `Xu Vinh Quang Hội`.\n• **Mục tiêu Thức tỉnh:** Gom trọn `Đá Linh Hồn` (`9 Hồn Đá Đỏ` = `360,000` Điểm hoặc `54,000` Xu) và chỉ tiêu phần điểm dư trên ngưỡng này.",
                en: "**Weekly Wallet Safety Floor:** Enforce a floor of at least `40,000` `Guild Honor` or `12,000–18,000` `Guild Glory Coins`.\n• **Awakening Target:** Secure all `9 Soul Stones` (`360,000` Honor or `54,000` Glory Coins) and only spend surplus currency above this threshold.",
              },
            },
          ],
        },
        {
          id: "sub-trap-3",
          badge: { vi: "Cạm bẫy #3", en: "Trap #3" },
          title: {
            vi: "Cạm Bẫy #3: Đúc Sai 3 Bộ Đồ Vàng (`Bộ Đồ Quyết Đấu` / `Bộ Kỵ Sĩ` / `Bộ Hiền Giả`), Bỏ Qua `Dấu Ấn Phe Phái` (+30%) & Cường Hóa Lệch Mốc",
            en: "Trap #3: Forging Wrong Golden Gear Sets (`Duelist's Set` / `Knight Set` / `Sage Set`), Ignoring +30% `Faction Mark` & Breaking +10/+20 Breakpoints",
          },
          blocks: [
            {
              type: "list",
              items: [
                {
                  vi: "**Biểu hiện sai lầm 1:** Tốn `Thỏi Vàng` tại `Lò Rèn` đúc nhầm giữa `Bộ Đồ Quyết Đấu` (`+80% ATK`), `Bộ Kỵ Sĩ` (`+160% HP`), `Bộ Hiền Giả`, hoặc mặc đồ Vàng 'Trắng' mất `+30%` `Dấu Ấn Phe Phái`.",
                  en: "**Symptom 1:** Spending `Gold Ingots` at the `Blacksmith` forging the wrong set (\`Duelist's Set\`, \`Knight Set\`, \`Sage Set\`), or equipping unmarked gear missing the `+30%` `Faction Mark` bonus.",
                },
                {
                  vi: "**Biểu hiện sai lầm 2:** Dồn `Quặng Cường Hóa` đập 1 kiếm lên `+25` khi Mũ, Áo, Giày ở `+5` (thay vì nâng đều `+10` tốn `8,000` Quặng + `600,000` Ruby/món = `40,000` Quặng/5 tướng và `+20` tốn `24,700` Quặng/món).",
                  en: "**Symptom 2:** Pushing 1 weapon to `+25` while armor sits at `+5` (instead of even `+10` at `8,000` Ore + `600,000` Rubies/piece = `40,000` Ore/5 heroes and `+20` at `24,700` Ore/piece).",
                },
                {
                  vi: "**Tại sao gây phế acc:** Cộng hưởng Trang bị (`Gear Resonance`) cần cả 4 món đạt `+10`, `+20`, `+30`, `+40`; đập lệch 1 món tốn gấp `3x` `Quặng Cường Hóa` và lãng phí `Đá Thăng Cấp` mà mất cộng hưởng!",
                  en: "**Why It Ruins Your Account:** `Gear Resonance` requires all 4 pieces at `+10`, `+20`, `+30`, or `+40`; over-leveling 1 piece costs `3x` `Enhancement Ore` and triggers zero resonance!",
                },
              ],
            },
            {
              type: "callout",
              variant: "rule",
              title: {
                vi: "Quy tắc chuẩn — Cạm bẫy #3",
                en: "Meta Standard Rule — Trap #3",
              },
              content: {
                vi: "**Đúc Đúng Bộ Có `Dấu Ấn Phe Phái`:** Trang bị `Bộ Đồ Quyết Đấu` cho DPS, `Bộ Kỵ Sĩ` cho Tank, `Bộ Hiền Giả` cho Support kèm `Dấu Ấn Phe Phái` (`+30% Bonus`).\n• **Đập Đều Bậc:** Nâng đều cả 4 món lên `+10` ➔ `+20` ➔ `+30` ➔ `+40`.",
                en: "**Match Set & `Faction Mark`:** Equip `Duelist's Set` on DPS, `Knight Set` on Tanks, and `Sage Set` on Supports with a matching `Faction Mark` (`+30% Bonus`).\n• **Even Resonance:** Enhance all 4 pieces evenly to `+10` ➔ `+20` ➔ `+30` ➔ `+40`.",
              },
            },
          ],
        },
        {
          id: "sub-trap-4",
          badge: { vi: "Cạm bẫy #4", en: "Trap #4" },
          title: {
            vi: "Cạm Bẫy #4: Xả Tài Nguyên & Bấm Mở `Hộp Quà Công Trình Chưa Mở` Lệch Lịch `Đua Vũ Trang Bang Hội` (GAR), `Thi Đấu Hội` & `Đức Vua Tối Cao` (KvK)",
            en: "Trap #4: Spending Hoarded Resources & Popping `Unopened Building Gift Box` Rewards Outside `Guild Arms Race` (GAR), `Guild Race` & `Supreme King` (KvK)",
          },
          blocks: [
            {
              type: "list",
              items: [
                {
                  vi: "**Biểu hiện sai lầm 1:** Có `Mảnh Anh Hùng Huyền Thoại Vạn Năng`, `Sách Kỹ Năng`, `Trang Bị Chúa Tể`, `Bụi Cổ Ngữ`, `Tăng Tốc` hay vừa xây xong nhà liền khui ngay `Hộp Quà Công Trình Chưa Mở` ngày thường.",
                  en: "**Symptom 1:** Impulsively spending `Universal Legendary Hero Shard`, `Skill Book`, `Lord Gear` materials, `Rune Dust`, or `Speedups`, or immediately tapping an `Unopened Building Gift Box` on random weekdays.",
                },
                {
                  vi: "**Biểu hiện sai lầm 2:** Ở máy chủ mới (`Pre-Season`), nhịn tài nguyên chờ `Đua Vũ Trang Bang Hội` (`GAR`) mà không mở Lịch Event khung `02:00 UTC (09:00 Giờ VN)` ➔ `06:00 UTC` Thứ Hai kiểm tra `Thi Đấu Hội`.",
                  en: "**Symptom 2:** On a young `Pre-Season` server, skipping a whole week waiting for `Guild Arms Race` (`GAR`) without checking the Monday `02:00–06:00 UTC` overlap window for `Guild Race`.",
                },
                {
                  vi: "**Tại sao gây phế acc:** Pha 1 chạy `Thi Đấu Hội` kèm `Khiêu Chiến Của Đội Quân Hắc Ám` & `Tập Kích Cự Ma`; Pha 2 chạy `GAR` & `KvK` — xả đúng lịch `Double-Dip` và mở `Hộp Quà Công Trình Chưa Mở` lời gấp `250%–300%`!",
                  en: "**Why It Ruins Your Account:** Phase 1 runs `Guild Race` + `Dark Legion` & `Giant Raid`; Phase 2 alternates `GAR` & `KvK`—`Double-Dip` timing and Day 1 `Unopened Building Gift Box` pops yield `250%–300%` rewards!",
                },
              ],
            },
            {
              type: "callout",
              variant: "rule",
              title: {
                vi: "Quy tắc chuẩn — Cạm bẫy #4",
                en: "Meta Standard Rule — Trap #4",
              },
              content: {
                vi: "**Kiểm tra Lịch Event `02:00 UTC (09:00 Giờ VN)` Thứ Hai & Giữ `Hộp Quà Công Trình Chưa Mở`:** Chỉ nâng Trang bị Tướng vào ngày thường.\n• **Xả Đúng Nhịp:** Giữ nguyên `Hộp Quà Công Trình Chưa Mở` và xả tài nguyên đúng ngày chủ đề `Thi Đấu Hội`, `Đua Vũ Trang Bang Hội` (`GAR`) & `Đức Vua Tối Cao` (`KvK`)!",
                en: "**Inspect Monday `02:00 UTC` Calendar & Preserve `Unopened Building Gift Box` Rewards:** Only upgrade Hero Gear on regular days.\n• **Theme-Day Dispatch:** Keep every `Unopened Building Gift Box` untouched until Construction tasks/days in `Guild Race`, `Guild Arms Race` (`GAR`), and `Supreme King` (`KvK`)!",
              },
            },
          ],
        },
        {
          id: "sub-trap-5",
          badge: { vi: "Cạm bẫy #5", en: "Trap #5" },
          title: {
            vi: "Cạm Bẫy #5: Bỏ Quên Thiên Phú Kinh Tế Của Bộ 3 Tướng Tím (`Võ Sĩ` / `Kỵ Sĩ` / `Cung Thủ`) & `Nhà Thơ` (Bard)",
            en: "Trap #5: Ignoring the Passive Economy Skills of the Epic Trio (`Brawler` / `Knight` / `Ranger`) & Legendary `Bard`",
          },
          blocks: [
            {
              type: "list",
              items: [
                {
                  vi: "**Biểu hiện sai lầm:** Đốt `Sách Kỹ Năng` vào chiêu chiến đấu của 3 Tướng Tím (`Võ Sĩ` / `Brawler`, `Kỵ Sĩ` / `Knight`, `Cung Thủ` / `Ranger`), nâng `Trait 1` `Lv.30`, mở Ô 4 (`2,000` KC) hoặc bỏ quên `Nhà Thơ` (`Bard`).",
                  en: "**Symptom:** Burning `Skill Book` items on Epic combat skills (`Brawler`, `Knight`, `Ranger`), leveling `Trait 1` to `Lv.30`, paying `2,000` Diamonds for Slot 4, or ignoring `Bard`'s passive.",
                },
                {
                  vi: "**Tại sao gây phế acc:** `Võ Sĩ` (`+30%` Nghiên cứu), `Kỵ Sĩ` (`+30%` Lính), `Cung Thủ` (`+30%` Đào Ruby) và `Nhà Thơ` (`Bard` `+40%` Xây dựng) mạnh ở `Trait 3 Max Lv.30` (`300 ➔ 500` Mảnh), còn Ô 4 (`2,000` KC) vô dụng!",
                  en: "**Why It Ruins Your Account:** `Brawler`, `Knight`, `Ranger` (`+30%`), and `Bard` (`+40%` Construction) shine via `Trait 3 Max Lv.30` (`300 ➔ 500` Shards), whereas Slot 4 (`2,000` Diamonds) is useless!",
                },
              ],
            },
            {
              type: "callout",
              variant: "rule",
              title: {
                vi: "Quy tắc chuẩn — Cạm bẫy #5",
                en: "Meta Standard Rule — Trap #5",
              },
              content: {
                vi: "**Chuỗi Mở Khóa `Trait 3 Max Lv.30`:** Dùng `Mảnh Anh Hùng Sử Thi Vạn Năng` đẩy `Võ Sĩ` (`Brawler`), `Kỵ Sĩ` (`Knight`), `Cung Thủ` (`Ranger`) lên `2 Sao Trắng` (`300` Mảnh) ➔ `5 Sao Trắng` (`500` Mảnh).\n• **Nâng Đúng Nhánh:** Nâng `Trait 1 Lv.15` ➔ `Trait 2` ➔ `Trait 3 Max Lv.30` cùng kỹ năng `+40%` xây dựng của `Nhà Thơ` (`Bard`), cấm mở Ô 4 (`2,000` KC)!",
                en: "**`Trait 3 Max Lv.30` Chain:** Use `Universal Epic Hero Shard` items to push `Brawler`, `Knight`, and `Ranger` to `2★ White` (`300` Shards) ➔ `5★ White` (`500` Shards).\n• **Exact Skill Path:** Level `Trait 1 Lv.15` ➔ `Trait 2` ➔ `Trait 3 Max Lv.30` alongside `Bard`'s `+40%` construction passive, and never unlock Slot 4 (`2,000` Diamonds)!",
              },
            },
          ],
        },
        {
          id: "sub-trap-6",
          badge: { vi: "Cạm bẫy #6", en: "Trap #6" },
          title: {
            vi: "Cạm Bẫy #6: Đổ `Tăng Tốc` Vào Nhánh `Quân Đội` (Soldiers) Tại `Viện Nghiên Cứu` Trước Khi Max `Chuẩn Bị Đua Vũ Trang` (Arms Race Prep)",
            en: "Trap #6: Dumping `Speedups` into the `Soldiers` Branch at the `Research Cottage` Before Maxing `Arms Race Prep`",
          },
          blocks: [
            {
              type: "list",
              items: [
                {
                  vi: "**Biểu hiện sai lầm:** Vào `Viện Nghiên Cứu` (`Research Cottage`) đổ `Tăng Tốc` nghiên cứu nhánh `Quân Đội` (`Soldiers`) hoặc `S1 Battle` lấy lực chiến trước mắt mà bỏ quên nhánh `Chuẩn Bị Đua Vũ Trang`.",
                  en: "**Symptom:** Spending weeks inside the `Research Cottage` dumping `Speedups` into the `Soldiers` or `S1 Battle` branch for immediate power while ignoring `Arms Race Prep`.",
                },
                {
                  vi: "**Tại sao gây phế acc:** Nhánh `Chuẩn Bị Đua Vũ Trang` (`Arms Race Prep`) mở Rương `4–5–6`, `Huy Hiệu +1` và `Nhân Đôi Phần Thưởng Rương` (`Double Rewards`); chậm nhánh này mất `50%` Kim Cương & Mảnh Vạn Năng!",
                  en: "**Why It Ruins Your Account:** `Arms Race Prep` unlocks Event Chests `4–5–6`, `Arms Race Commendation +1`, and `Double Rewards`; delaying this branch forfeits `50%` of your weekly event Diamonds and Universal Shards!",
                },
              ],
            },
            {
              type: "callout",
              variant: "rule",
              title: {
                vi: "Quy tắc chuẩn — Cạm bẫy #6",
                en: "Meta Standard Rule — Trap #6",
              },
              content: {
                vi: "**Thứ tự tại `Viện Nghiên Cứu` (`Research Cottage`):** `1. Combat Expertise` ➔ `2. Chuẩn Bị Đua Vũ Trang` (`Arms Race Prep` — mở `Double Rewards`) ➔ `3. Queue 1 Boost` ➔ `4. Quân Đội` (`Soldiers`) / `S1 Battle`.",
                en: "**Unbreakable Priority at the `Research Cottage`:** `1. Combat Expertise` (Unlock tree) ➔ `2. Arms Race Prep` (Unlock `Double Rewards`) ➔ `3. Queue 1 Boost` ➔ `4. Soldiers` / `S1 Battle`.",
              },
            },
          ],
        },
        {
          id: "sub-trap-7",
          badge: { vi: "Cạm bẫy #7", en: "Trap #7" },
          title: {
            vi: "Cạm Bẫy #7: Ghép `Cổ Ngữ / Phù Văn` (Runes) Bậc Thấp (Bậc I–III) & Mở `Rương Cổ Ngữ Vàng Tự Chọn` Trước Mốc Đồng Bộ Lv.5 / Lv.8",
            en: "Trap #7: Merging Low-Tier `Runes` (Tiers I–III) & Opening `Legendary Choice Rune Chest` Items Before Lv.5 / Lv.8 Breakpoints",
          },
          blocks: [
            {
              type: "list",
              items: [
                {
                  vi: "**Biểu hiện sai lầm:** Mở sớm `Rương Cổ Ngữ Vàng Tự Chọn` (`Legendary Choice Rune Chest`) hoặc tiêu `Bụi Cổ Ngữ` (`Rune Dust`) ghép dàn trải `Cổ Ngữ / Phù Văn` (`Runes`) ở các bậc thấp `Bậc I–III`.",
                  en: "**Symptom:** Prematurely opening `Legendary Choice Rune Chest` (`Rune Choice Chests`) items or spreading `Rune Dust` across low-tier `Runes` at Tiers `I–III` (`Lv.1–Lv.3`).",
                },
                {
                  vi: "**Tại sao gây phế acc:** Quy luật `3^(n-1)` tốn `327,660` `Bụi Cổ Ngữ`/viên `Lv.12`; chạm `Lv.5` mới mở `+5%` ATK/HP Tướng, `+30 March Size` và `Cổ Ngữ Khe 5` (`+1/+2` Kỹ năng), còn `Lv.8` mở `+5%` ATK/HP Lính.",
                  en: "**Why It Ruins Your Account:** Under the `3^(n-1)` law (`327,660` `Rune Dust` for `Lv.12`), `Lv.5` unlocks `+5%` Hero stats, `+30 March Size` & `Slot 5` (`+1/+2` Skill), while `Lv.8` adds `+5%` Soldier stats.",
                },
              ],
            },
            {
              type: "callout",
              variant: "rule",
              title: {
                vi: "Quy tắc chuẩn — Cạm bẫy #7",
                en: "Meta Standard Rule — Trap #7",
              },
              content: {
                vi: "**Dồn Điểm Gãy `Lv.5` & `Lv.8`:** Khóa `Rương Cổ Ngữ Vàng Tự Chọn` và dồn `Bụi Cổ Ngữ` ghép từng khe Đội 1 (ưu tiên `Cổ Ngữ Khe 5`) chạm `Lv.5` rồi `Lv.8` vào Thứ Ba Kỳ `GAR` / `KvK`.",
                en: "**Target `Lv.5` & `Lv.8` Breakpoints:** Lock `Legendary Choice Rune Chest` items and focus `Rune Dust` on Queue 1 `Runes` (prioritizing `Slot 5 Combat Skill Rune`) to hit `Lv.5` and `Lv.8` on Tuesday of `GAR` / `KvK`.",
              },
            },
          ],
        },
        {
          id: "sub-trap-8",
          badge: { vi: "Cạm bẫy #8", en: "Trap #8" },
          title: {
            vi: "Cạm Bẫy #8: Nâng Cấp `Nhà Kho` & `Mỏ Tài Nguyên` Thay Vì Đua Thẳng `Lâu Đài` (Castle Lv.25 / Lv.30 / Lv.40) & `Viện Tinh Hoa` (`Học Viện Rực Rỡ` / Brilliance Institute)",
            en: "Trap #8: Upgrading `Warehouse` & `Resource Mines` Instead of Rushing `Castle` (Lv.25 / Lv.30 / Lv.40) & `Brilliance Institute`",
          },
          blocks: [
            {
              type: "list",
              items: [
                {
                  vi: "**Biểu hiện sai lầm:** Dành hàng chục ngày thợ xây để nâng tất cả `Mỏ Tài Nguyên` (`Resource Mines` — Mỏ Gỗ, Mỏ Đá, Mỏ Ruby) và `Nhà Kho` (`Warehouse`) lên ngang cấp với `Lâu Đài` (`Castle`).",
                  en: "**Symptom:** Tying up builder queues for weeks upgrading `Resource Mines` (Timber, Stone, Ruby Mines) and `Warehouse` structures to match your `Castle` level.",
                },
                {
                  vi: "**Tại sao gây phế acc:** Sản lượng `Mỏ Tài Nguyên` rất nhỏ so với `Rally Boss`; giam thợ xây làm chậm `Lâu Đài` `Lv.25/30` (trần `(Castle × 5) + 15`) và `Lv.40` mở `Viện Tinh Hoa` (`Brilliance Institute` — Lính `T11`)!",
                  en: "**Why It Ruins Your Account:** `Resource Mines` output is tiny vs `Rally Bosses`; delaying `Castle` `Lv.25/30/40` (cap `(Castle × 5) + 15`) blocks the `Brilliance Institute` unlock for `T11` troops!",
                },
              ],
            },
            {
              type: "callout",
              variant: "rule",
              title: {
                vi: "Quy tắc chuẩn — Cạm bẫy #8",
                en: "Meta Standard Rule — Trap #8",
              },
              content: {
                vi: "**Khóa Trục Công Trình Điều Kiện:** Chỉ nâng công trình bắt buộc để đẩy `Lâu Đài` chạm `Lv.25/30/40` và mở `Viện Tinh Hoa` (`Brilliance Institute`): `Viện Nghiên Cứu`, `Trại Lính` Đội 1, `Sân Tập`, Bệnh viện, Hội quán.",
                en: "**Strict Prerequisite Chain:** Only upgrade buildings required to rush `Castle` (`Lv.25/30/40`) and unlock the `Brilliance Institute`: `Research Cottage`, Queue 1 `Barracks`, `Training Ground`, Hospital, and Guild Hall.",
              },
            },
          ],
        },
        {
          id: "sub-trap-9",
          badge: { vi: "Cạm bẫy #9", en: "Trap #9" },
          title: {
            vi: "Cạm Bẫy #9: Mở `Rương Vũ Khí Độc Quyền` (Exclusive Weapon Chest) Cho Tướng Quá Độ Thay Vì `Ngộ Không`, `Đấng Toàn Năng`, `Triệu Hồi Thủy` & `Trinh Nữ Bão Tố`",
            en: "Trap #9: Opening `Exclusive Weapon Chest` Items for Transitional Heroes Instead of `Wukong`, `Paragon`, `Tidecaller` & `Storm Maiden`",
          },
          blocks: [
            {
              type: "list",
              items: [
                {
                  vi: "**Biểu hiện sai lầm:** Nhận `Rương Vũ Khí Độc Quyền` (`Exclusive Weapon Chest`) đầu tiên liền mở ngay cho tướng quá độ như `Nhà Chiêm Tinh` (`Astrologer`), `Người Giữ Bí Mật` (`Secret Keeper`) hay `Thợ Săn Hoang Dã`.",
                  en: "**Symptom:** Opening your first `Exclusive Weapon Chest` (`Exclusive Weapon Choice Chest`) items in Week 2 for transitional heroes like `Astrologer`, `Secret Keeper`, or `Wilderness Hunter`.",
                },
                {
                  vi: "**Tại sao gây phế acc:** Mảnh UW rất hiếm (`+5`, `+10` = `~155 Mảnh`, `+20`); khi dàn Carry cuối mùa (`Wukong`, `Paragon`, `Tidecaller`, `Storm Maiden`, `Desert Prince`, `Witch`) ra mắt, thần khí mở nhầm bị vứt ở Đội 2.",
                  en: "**Why It Ruins Your Account:** UW shards are scarce (`+10` = `~155 Shards`); when endgame Carries (`Wukong`, `Paragon`, `Tidecaller`, `Storm Maiden`, `Desert Prince`, `Witch`) arrive, early UWs sit on Queue 2.",
                },
              ],
            },
            {
              type: "callout",
              variant: "rule",
              title: {
                vi: "Quy tắc chuẩn — Cạm bẫy #9",
                en: "Meta Standard Rule — Trap #9",
              },
              content: {
                vi: "**Niêm phong `Rương Vũ Khí Độc Quyền`:** Giữ cho Đội 1 (`Ngộ Không`, `Đấng Toàn Năng`, `Triệu Hồi Thủy`, `Trinh Nữ Bão Tố`, `Hoàng Tử Sa Mạc`, `Phù Thủy`), ghép Thứ Năm (`10:00–14:00 UTC / 17:00–21:00 VN`) Kỳ `GAR`.",
                en: "**Seal `Exclusive Weapon Chest` Reserves:** Keep all chests sealed for Queue 1 carries (`Wukong`, `Paragon`, `Tidecaller`, `Storm Maiden`, `Desert Prince`, `Witch`), and craft on Thursday (`10:00–14:00 UTC`) of `GAR`.",
              },
            },
          ],
        },
        {
          id: "sub-trap-10",
          badge: { vi: "Cạm bẫy #10", en: "Trap #10" },
          title: {
            vi: "Cạm Bẫy #10: Huấn Luyện Mới Lính Bậc Cao Trực Tiếp Thay Vì `Thăng Cấp Lính Bậc Thang` (Staircase Troop Promotion T5–T11)",
            en: "Trap #10: Training High-Tier Troops From Scratch Instead of `Staircase Troop Promotion` (T5–T11)",
          },
          blocks: [
            {
              type: "list",
              items: [
                {
                  vi: "**Biểu hiện sai lầm:** Khi `Trại Lính` (`Barracks`) mở bậc lính mới (`T5–T11` lên `Lính Bậc 10` / `Lính Bậc 11`), người chơi xóa lính cũ hoặc đẻ mới trực tiếp thay vì dùng `Thăng Cấp Lính Bậc Thang` (`Staircase`).",
                  en: "**Symptom:** When `Barracks` unlock new troop tiers (`T5–T11` up to `Tier 10` / `Tier 11 Troops`), dismissing old troops or training max-tier troops from scratch instead of `Staircase Troop Promotion`.",
                },
                {
                  vi: "**Tại sao gây phế acc:** Lính cấp thấp làm tràn Bệnh viện khi đánh `PvP`; đẻ mới tốn nhiều giờ, bỏ lỡ hệ số `1,181.16` điểm/giây ở `Lính Bậc 10` (`T10` — gấp `10 lần` `T5`) khi dùng `Thăng Cấp Lính Bậc Thang`!",
                  en: "**Why It Ruins Your Account:** Low-tier troops clog Hospitals in `PvP`, while training from scratch misses the `1,181.16` pts/sec scoring at `Tier 10 Troops` (`10x` `T5`) via `Staircase Troop Promotion`!",
                },
              ],
            },
            {
              type: "callout",
              variant: "rule",
              title: {
                vi: "Quy tắc chuẩn — Cạm bẫy #10 (Staircase Troop Promotion)",
                en: "Meta Standard Rule — Trap #10 (Staircase Troop Promotion)",
              },
              content: {
                vi: "**Kỹ thuật `Thăng Cấp Lính Bậc Thang` (`Staircase Troop Promotion`):** Trong ngày thường (Thứ Bảy ➔ Thứ Năm), chỉ huấn luyện lính phôi bậc thấp hơn 1–2 cấp (`T5–T9`).\n• **Bùng nổ Điểm Thứ Sáu `GAR` / `KvK`:** Bấm nút Thăng cấp (`Promote`) toàn bộ phôi lên `Lính Bậc 10` (`T10`) / `Lính Bậc 11` (`T11`) kèm xả `Tăng Tốc` để ăn điểm gấp `2–3 lần` mỗi giờ tăng tốc!",
                en: "**Execute `Staircase Troop Promotion`:** On normal days (Saturday ➔ Thursday), pre-train fodder troops 1–2 tiers below your max tier (`T5–T9`).\n• **`GAR` / `KvK` Friday Spike:** Hit `Promote` to batch-upgrade all fodder into `Tier 10 Troops` (`T10`) / `Tier 11 Troops` (`T11`) with `Speedups`—scoring `2–3x` more event points!",
              },
            },
          ],
        },
      ],
    },
    {
      id: "sec-3-red-audit-comparison",
      title: {
        vi: "3. Bảng Đối Chiếu Nhanh: Kiểm Toán Đỏ vs Hành Động Chuẩn Meta",
        en: "3. Quick Audit Table: Red Flag Symptoms vs. Meta Standards",
      },
      blocks: [
        {
          type: "table",
          caption: {
            vi: "Bảng đối chiếu nhanh 3 nhóm hệ thống cốt lõi giúp tự chẩn đoán tình trạng tài khoản trong 30 giây",
            en: "Quick 3-pillar diagnostic table to self-audit your account health in 30 seconds",
          },
          headers: [
            { vi: "Nhóm Hệ Thống", en: "System Pillar" },
            {
              vi: "Dấu Hiệu Tài Khoản Đang Dính Bẫy",
              en: "Red Flag Trap Symptoms",
            },
            {
              vi: "Trạng Thái Tài Khoản Chuẩn Meta",
              en: "Meta-Standard Account State",
            },
          ],
          rows: [
            [
              { vi: "Tướng & Mảnh", en: "Heroes & Shards" },
              {
                vi: "Có trên 8 `Tướng Quán Rượu` được đút `Mảnh Anh Hùng Huyền Thoại Vạn Năng`; Ô Thiên phú 4 tướng Tím đã mở bằng 2,000 KC.",
                en: "More than 8 `Tavern Heroes` fed with `Universal Legendary Hero Shard` items; Epic Hero 4th Trait Slot unlocked for 2,000 Diamonds.",
              },
              {
                vi: "100% `Mảnh Anh Hùng Huyền Thoại Vạn Năng` dồn cho Tướng Đỏ Đội 1 (400 Mảnh = 5★ Đỏ, 560 Mảnh = 1★ Trắng, 1,000 Mảnh = 5★ Trắng); `Võ Sĩ` (`Brawler` +30% Nghiên cứu), `Kỵ Sĩ` (`Knight` +30% Huấn luyện lính), `Cung Thủ` (`Ranger` +30% Đào Ruby) đạt 2★ Trắng (300 Mảnh) ➔ 5★ Trắng (500 Mảnh); `Nhà Thơ` (`Bard`) kích hoạt +40% Xây dựng.",
                en: "100% `Universal Legendary Hero Shard` reserves funneled into Queue 1 Mythics (400 Shards = 5★ Red, 560 Shards = 1★ White, 1,000 Shards = 5★ White); `Brawler` (+30% Tech Research), `Knight` (+30% Soldier Training), `Ranger` (+30% Ruby Gathering) at 2★ White (300 Shards) ➔ 5★ White (500 Shards); `Bard` providing +40% Construction Rate.",
              },
            ],
            [
              { vi: "Trang Bị & Rèn", en: "Gear & Blacksmith" },
              {
                vi: "Mặc đồ Vàng sai bộ hoặc không có `Dấu Ấn Phe Phái`; đập 1 món +25 và 3 món +5; Đội 2 mặc đồ Tím +10.",
                en: "Wearing wrong sets or unmarked Gold Gear without `Faction Mark`; uneven +25 weapon with +5 armor pieces; Queue 2 wearing +10 Purple Gear.",
              },
              {
                vi: "Đội 1 mặc đủ 4 món `Bộ Đồ Quyết Đấu` (Carry), `Bộ Kỵ Sĩ` (Tank), `Bộ Hiền Giả` (Support) có `Dấu Ấn Phe Phái` (+30% Bonus) nâng đều +10 ➔ +20 ➔ +30 ➔ +40; đồ Tím Đội 2 để ở cấp +0.",
                en: "Queue 1 equipped with 4-piece `Duelist's Set` (Carry), `Knight Set` (Tank), and `Sage Set` (Support) with `Faction Mark` (+30% Bonus) enhanced evenly to +10 ➔ +20 ➔ +30 ➔ +40; Queue 2 Purple Gear kept at +0.",
              },
            ],
            [
              { vi: "Cửa Hàng & Sự Kiện", en: "Shops & Events" },
              {
                vi: "Túi đồ luôn trống rỗng; `Điểm Vinh Dự Bang` dưới 5,000; nâng Trang bị Lãnh Chúa vào Thứ Hai/Thứ Ba.",
                en: "Inventory always empty; `Guild Honor` below 5,000; upgrading Lord Gear on Monday or Tuesday.",
              },
              {
                vi: "Túi đồ luôn điều phối theo Lịch Event Thứ Hai (02:00 UTC / 09:00 Giờ VN); đóng băng 40,000 `Điểm Vinh Dự Bang` (hoặc 12,000–18,000 `Xu Vinh Quang Hội`) chờ mua `Đá Linh Hồn` (9 Hồn Đá Đỏ: 40,000 Điểm Vinh Dự / viên = 360,000 hoặc 6,000 Xu Vinh Quang / viên = 54,000 ở S1) + 345–385 Mảnh Tướng ở `Lâu Đài` Lv.30.",
                en: "Inventory dispatched strictly by the Monday 02:00 UTC Event Calendar; 40,000 `Guild Honor` (or 12,000–18,000 `Guild Glory Coins`) frozen for 9 `Soul Stone` items (40,000 Guild Honor/stone = 360,000 or 6,000 Glory Coins/stone = 54,000 in S1) + 345–385 Hero Shards at `Castle` Lv.30.",
              },
            ],
          ],
        },
      ],
    },
  ],
  proSections: [
    {
      id: "sec-4-account-recovery-protocol",
      isPro: true,
      title: {
        vi: "4. Phân tích Định lượng & Điểm gãy: Bảng Phác Đồ Cấp Cứu Tài Khoản (The Account Recovery Protocol)",
        en: "4. Quantitative Analysis: The Complete 10-Trap Account Recovery Protocol",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "**Quy Tắc Chống Reroll Vội Vàng:** Đừng vội bỏ tài khoản trừ khi server mới mở dưới 7 ngày và bạn đã đốt sạch toàn bộ Kim Cương vào Quán Rượu.\n• **Phác Đồ Cắt Lỗ:** Hãy tra cứu Bảng Phác Đồ Cấp Cứu Định Lượng (`MED-1.4-04`) dưới đây để thực hiện cắt lỗ ngay lập tức:",
            en: "**Anti-Panic Reroll Rule:** Do NOT rush to abandon your account (Reroll) unless your server is under 7 days old and you burned all Diamonds in the Tavern.\n• **Stop-Loss Lookup:** Consult the Quantitative Account Recovery Protocol (`MED-1.4-04`) below to execute immediate stop-loss actions:",
          },
        },
        {
          type: "table",
          caption: {
            vi: "Bảng Phác đồ Cấp cứu Tài khoản (Account Recovery Protocol) định lượng cho từng Cạm bẫy #1 ➔ #10",
            en: "Quantitative 10-Trap Account Recovery Protocol: Severity, Stop-Loss Action, Recovery Time & Reroll Threshold",
          },
          headers: [
            { vi: "Mã Bẫy", en: "Trap ID" },
            {
              vi: "Mức Độ Thiệt Hại (Damage Severity)",
              en: "Damage Severity",
            },
            {
              vi: "Thao Tác Cắt Lỗ Ngay Lập Tức (Immediate Stop-Loss Action)",
              en: "Immediate Stop-Loss Action",
            },
            {
              vi: "Thời Gian Phục Hồi Dự Kiến (Tính theo Chu kỳ 2 Tuần)",
              en: "Estimated Recovery Time (2-Week Cycles)",
            },
            {
              vi: "Khi Nào Nên Tạo Lại Acc Mới (Reroll Threshold)?",
              en: "Reroll Threshold",
            },
          ],
          rows: [
            [
              {
                vi: "Bẫy #1: Đút `Mảnh Anh Hùng Huyền Thoại Vạn Năng` cho `Tướng Quán Rượu` (`Tavern Heroes`)",
                en: "Trap #1: Feeding `Universal Legendary Hero Shard` items to `Tavern Heroes`",
              },
              {
                vi: "Nặng (Thất thoát vĩnh viễn số mảnh đã đút)",
                en: "Severe (Permanent loss of invested Universal Shards)",
              },
              {
                vi: "Khóa ví `Mảnh Anh Hùng Huyền Thoại Vạn Năng` (`Mảnh Vàng Vạn Năng`) ngay lập tức; dừng nâng sao `Người Giữ Bí Mật`, `Nhà Chiêm Tinh`, `Pháp Sư Bộ Lạc`; tận dụng tướng đã lỡ nâng làm Carry tạm đến Ngày 21–41 rồi chuyển xuống Đội 2 và dồn 100% mảnh mới cho `Hoàng Tử Sa Mạc`, `Trinh Nữ Bão Tố`, `Ngộ Không`, `Đấng Toàn Năng`, `Triệu Hồi Thủy`.",
                en: "Freeze your `Universal Legendary Hero Shard` wallet immediately; halt star upgrades on `Secret Keeper`, `Astrologer`, and `Shaman`; use the already-leveled hero as a temporary carry until Days 21–41 before moving it to Queue 2, and funnel 100% of new shards into `Desert Prince`, `Storm Maiden`, `Wukong`, `Paragon`, and `Tidecaller`.",
              },
              {
                vi: "1.5 – 2 Chu kỳ (2 – 4 Tuần / 1–2 kỳ `Đức Vua Tối Cao` / `KvK`) tích lũy lại từ VIP Shop, Xe hàng Mythic và Rương `Đua Vũ Trang Bang Hội` (`GAR`).",
                en: "1.5 – 2 Cycles (2 – 4 Weeks / 1–2 `Supreme King` / `KvK` cycles) accumulating shards from VIP Shop, Mythic Carriages, and `Guild Arms Race` (`GAR`) Chests.",
              },
              {
                vi: "Chỉ Reroll nếu đã đốt > 300–400 `Mảnh Anh Hùng Huyền Thoại Vạn Năng` (`400 Mảnh Vàng Vạn Năng` = 1 tướng Đỏ đạt 5 Sao Đỏ, hoặc gần đủ 560 Mảnh lên 1 Sao Trắng trong lộ trình 1,000 Mảnh lên 5 Sao Trắng) vào `Tướng Quán Rượu` (`Pháp Sư Bộ Lạc`, `Đấu Sĩ Man Rợ`, `Nhà Chiêm Tinh`) trước Ngày 20–30 S0 và VIP < 5.",
                en: "Only Reroll if you burned > 300–400 `Universal Legendary Hero Shard` items (equivalent to a 5-Red-Star = 400-Shard Mythic, or nearly the 560 Shards for 1 White Star on the 1,000-Shard path to 5 White Stars) on weak `Tavern Heroes` (`Shaman`, `Barbarian`, `Astrologer`) before Day 20–30 S0 at VIP < 5.",
              },
            ],
            [
              {
                vi: "Bẫy #2: Mua lệch `Đá Linh Hồn` (`9 Hồn Đá Đỏ`) bằng `Điểm Vinh Dự Bang` & `Xu Vinh Quang Hội`",
                en: "Trap #2: Draining `Guild Honor` & `Guild Glory Coins` instead of saving for `Soul Stone`",
              },
              {
                vi: "Nặng (Chậm tiến độ Thức tỉnh tướng ở S1)",
                en: "Severe (Delays Season 1 Hero Awakening)",
              },
              {
                vi: "Dừng mua trang bị tím/mảnh lẻ bằng `Điểm Vinh Dự Bang` & `Xu Vinh Quang Hội`; khóa đáy ví 40,000 `Điểm Vinh Dự Bang` (12,000–18,000 `Xu Vinh Quang Hội`) cho mục tiêu duy nhất là `Đá Linh Hồn` (`9 Hồn Đá Đỏ` — 40,000 Điểm/viên hoặc 6,000 Xu/viên) cho `Pháp Sư Hỏa Thuật` hoặc `Hiền Nhân`.",
                en: "Freeze all purple gear and random shard purchases with `Guild Honor` & `Guild Glory Coins`; enforce the 40,000 `Guild Honor` (12,000–18,000 `Guild Glory Coins`) safety floor exclusively for `Soul Stone` (`Red Soul Stone` — 40,000 Honor/stone or 6,000 Glory Coins/stone) for `Pyromancer` or `Sage`.",
              },
              {
                vi: "2 – 3 Chu kỳ (4 – 6 Tuần) cày full mốc `Thi Đấu Hội` (`Guild Race`) để gom đủ `9 Hồn Đá Đỏ` (40,000 Điểm Vinh Dự / viên = 360,000 hoặc 6,000 Xu Vinh Quang / viên = 54,000 ở S1) + 345–385 Mảnh Tướng.",
                en: "2 – 3 Cycles (4 – 6 Weeks) hitting full `Guild Race` milestones to recover 9 `Soul Stone` items (40,000 Guild Honor/stone = 360,000 or 6,000 Guild Glory Coins/stone = 54,000 in S1) + 345–385 Hero Shards.",
              },
              {
                vi: "Không cần Reroll; tập trung chuyển sang đội hình Bộ Lạc (`Horde`) vì Bộ Lạc chỉ cần thức tỉnh 1 tướng Vàng duy nhất (`9 Hồn Đá Đỏ` + 345–385 Mảnh) thay vì 27 viên như Liên Minh!",
                en: "No Reroll needed; pivot to `Horde` since Endgame Horde only requires awakening 1 Legendary hero (9 `Soul Stone` items + 345–385 Shards) instead of 27 Soul Stones like League!",
              },
            ],
            [
              {
                vi: "Bẫy #3: Đúc sai 3 Bộ Đồ Vàng (`Bộ Đồ Quyết Đấu`, `Bộ Kỵ Sĩ`, `Bộ Hiền Giả`) & lệch mốc `+10/+20`",
                en: "Trap #3: Forging wrong sets (`Duelist's Set`, `Knight Set`, `Sage Set`), missing `Faction Mark` & uneven `+10/+20`",
              },
              {
                vi: "Trung bình (Khắc phục được 90%–100% qua phân giải)",
                en: "Moderate (90%–100% Recoverable via dismantling)",
              },
              {
                vi: "Đưa đồ Tím cường hóa ở Đội 2 vào `Lò Rèn` (`Blacksmith`) phân giải (hoàn 100% `Quặng Cường Hóa`); nâng đồng đều cả 4 món Đội 1 chạm mốc `+10` / `+20`; đúc lại đúng `Bộ Đồ Quyết Đấu` (Carry), `Bộ Kỵ Sĩ` (Tank), `Bộ Hiền Giả` (Support) có `Dấu Ấn Phe Phái` (`+30%`).",
                en: "Dismantle enhanced Purple Gear on Queue 2 at the `Blacksmith` (100% `Enhancement Ore` refund); level all 4 Queue 1 pieces evenly to `+10` / `+20`; re-forge matching `Duelist's Set` (Carry), `Knight Set` (Tank), and `Sage Set` (Support) pieces with `+30%` `Faction Mark`.",
              },
              {
                vi: "10 phút đối với lỗi đập lệch; 1 – 2 Tuần tích lại `Thỏi Vàng` (`Gold Ingots`) đúc bù đồ có `Dấu Ấn Phe Phái`.",
                en: "10 minutes for uneven enhancement recovery; 1 – 2 Weeks accumulating `Gold Ingots` to forge `Faction Mark` replacements.",
              },
              {
                vi: "Không cần Reroll (`Quặng Cường Hóa` được hoàn trả 100% khi phân giải).",
                en: "Never Reroll (`Enhancement Ore` is 100% refunded upon dismantling).",
              },
            ],
            [
              {
                vi: "Bẫy #4: Xả tài nguyên & mở `Hộp Quà Công Trình Chưa Mở` lệch lịch `Đua Vũ Trang Bang Hội` (`GAR`)",
                en: "Trap #4: Dumping resources & popping `Unopened Building Gift Box` outside `Guild Arms Race` (`GAR`)",
              },
              {
                vi: "Trung bình (Mất phần thưởng cơ hội của chu kỳ đó)",
                en: "Moderate (Lost opportunity rewards for that cycle)",
              },
              {
                vi: "Đóng băng toàn bộ `Mảnh Anh Hùng Huyền Thoại Vạn Năng`, `Tăng Tốc`, `Bụi Cổ Ngữ` và giữ nguyên `Hộp Quà Công Trình Chưa Mở`; chỉ xả vào khung `02:00 – 06:00 UTC (09:00 – 13:00 Giờ VN)` đúng ngày chủ đề `Thi Đấu Hội` (kèm `Khiêu Chiến Của Đội Quân Hắc Ám` / `Tập Kích Cự Ma`), `Đua Vũ Trang Bang Hội` (`GAR`) & `Đức Vua Tối Cao` (`KvK`).",
                en: "Freeze all `Universal Legendary Hero Shard`, `Speedups`, and `Rune Dust` reserves and keep every `Unopened Building Gift Box` intact; spend only during the `02:00 – 06:00 UTC` overlap window on matching theme days of `Guild Race` (with `Dark Legion Challenge` / `Giant Raid`), `Guild Arms Race` (`GAR`), and `Supreme King` (`KvK`).",
              },
              {
                vi: "1 Chu kỳ (14 Ngày) tích trữ là quỹ tài nguyên dự trữ sẽ đầy trở lại.",
                en: "1 Cycle (14 Days) of disciplined hoarding to fully replenish your strategic stockpile.",
              },
              {
                vi: "Chỉ cân nhắc Reroll nếu đã xả sạch toàn bộ Kim Cương + Tăng Tốc khởi đầu mà không lấy được bất kỳ rương mốc nào ở Tuần 1–2.",
                en: "Only consider Rerolling if you burned 100% of starter Diamonds + Speedups without claiming any milestone chests in Weeks 1–2.",
              },
            ],
            [
              {
                vi: "Bẫy #5: Bỏ quên Thiên phú Kinh tế `Võ Sĩ`, `Kỵ Sĩ`, `Cung Thủ` & `Nhà Thơ` (`Bard`)",
                en: "Trap #5: Ignoring economy passives of `Brawler`, `Knight`, `Ranger` & `Bard`",
              },
              {
                vi: "Trung bình (Mất 2,000 KC mở Ô 4 và vài ngàn Sách Kỹ Năng)",
                en: "Moderate (Loss of 2,000 Diamonds on Slot 4 & several thousand Skill Books)",
              },
              {
                vi: "Dừng mở Ô thứ 4 (`2,000` KC) cho tướng Tím; dùng `Mảnh Anh Hùng Sử Thi Vạn Năng` đẩy ngay Kỹ năng thứ 3 (`Trait 3 Max Lv.30`) cho `Võ Sĩ` (`Brawler` `+30%` Nghiên cứu), `Kỵ Sĩ` (`Knight` `+30%` Huấn luyện lính), `Cung Thủ` (`Ranger` `+30%` Đào Ruby) ở `2 Sao Trắng` (`300` Mảnh) ➔ `5 Sao Trắng` (`500` Mảnh) và `Nhà Thơ` (`Bard` `+40%` xây dựng).",
                en: "Stop unlocking Slot 4 (`2,000` Diamonds) on Epic heroes; use `Universal Epic Hero Shard` items to max the 3rd passive skill (`Trait 3 Max Lv.30`) on `Brawler` (`+30%` Research), `Knight` (`+30%` Training), and `Ranger` (`+30%` Ruby Gathering) at `2 White Stars` (`300` Shards) ➔ `5 White Stars` (`500` Shards) alongside `Bard` (`+40%` Construction).",
              },
              {
                vi: "0 ngày cho thao tác nâng Thiên phú; 1 Tuần để bù lại 2,000 KC và `Sách Kỹ Năng` từ đánh Boss/Thám hiểm.",
                en: "0 days to activate passive traits; 1 Week to recoup 2,000 Diamonds and `Skill Book` reserves from Boss rallies.",
              },
              {
                vi: "Tuyệt đối không cần Reroll.",
                en: "Never Reroll.",
              },
            ],
            [
              {
                vi: "Bẫy #6: Nâng nhánh `Quân Đội` (`Soldiers`) tại `Viện Nghiên Cứu` trước `Chuẩn Bị Đua Vũ Trang` (`Arms Race Prep`)",
                en: "Trap #6: Researching `Soldiers` at the `Research Cottage` before `Arms Race Prep`",
              },
              {
                vi: "Nặng (Thiệt 50% rương thưởng sự kiện mỗi tuần)",
                en: "Severe (Lose 50% weekly event chest rewards)",
              },
              {
                vi: "Dừng toàn bộ lệnh nghiên cứu `Quân Đội` (`Soldiers`) tại `Viện Nghiên Cứu` (`Research Cottage`); chuyển 100% `Tăng Tốc` Nghiên cứu vào Thứ Ba Kỳ `Đua Vũ Trang Bang Hội` (`GAR`) / `Đức Vua Tối Cao` (`KvK`) để mở khóa `Nhân Đôi Phần Thưởng Rương` (`Double Rewards`) trong nhánh `Chuẩn Bị Đua Vũ Trang` (`Arms Race Prep`).",
                en: "Halt all `Soldiers` research queues at the `Research Cottage`; redirect 100% of Research `Speedups` on Tuesday of `Guild Arms Race` (`GAR`) / `Supreme King` (`KvK`) straight to `Double Rewards` in the `Arms Race Prep` branch.",
              },
              {
                vi: "1 – 1.5 Chu kỳ (2 – 3 Tuần) tích lại `Tăng Tốc` & Ruby tập trung nghiên cứu.",
                en: "1 – 1.5 Cycles (2 – 3 Weeks) of focused `Speedups` and Ruby research.",
              },
              {
                vi: "Chỉ cân nhắc Reroll nếu đã đốt sạch Tăng Tốc vào nhánh `Quân Đội` nhưng tiến độ `Chuẩn Bị Đua Vũ Trang` vẫn ở 0% sau Tuần 3 S0.",
                en: "Only consider Rerolling if you burned all Speedups into `Soldiers` while `Arms Race Prep` remains at 0% after Week 3 S0.",
              },
            ],
            [
              {
                vi: "Bẫy #7: Ghép `Cổ Ngữ / Phù Văn` (`Runes`) bậc thấp `I–III` & mở sớm `Rương Cổ Ngữ Vàng Tự Chọn`",
                en: "Trap #7: Merging low-tier `Runes` (`I–III`) & opening `Legendary Choice Rune Chest` early",
              },
              {
                vi: "Trung bình (Khắc phục được 100% khi gom ghép dồn bậc)",
                en: "Moderate (100% Recoverable via consolidated merging)",
              },
              {
                vi: "Ngừng ghép dàn trải `Cổ Ngữ / Phù Văn` Bậc `I–III`; khóa toàn bộ `Rương Cổ Ngữ Vàng Tự Chọn` và `Bụi Cổ Ngữ` chờ Thứ Ba Kỳ `Đua Vũ Trang Bang Hội` (`GAR`) / `Đức Vua Tối Cao` (`KvK`) để đẩy `Cổ Ngữ Khe 5` và bảng Đội 1 chạm mốc `Lv.5` (`+5%` Hero ATK/HP & `+30 March Size`) rồi `Lv.8` (`+5%` Soldier ATK/HP).",
                en: "Stop spreading merges across Tiers `I–III` `Runes`; lock all `Legendary Choice Rune Chest` and `Rune Dust` reserves until Tuesday of `Guild Arms Race` (`GAR`) / `Supreme King` (`KvK`) to push `Slot 5 Combat Skill Rune` and Queue 1 sockets to `Lv.5` (`+5%` Hero ATK/HP & `+30 March Size`) and `Lv.8` (`+5%` Soldier ATK/HP).",
              },
              {
                vi: "1 – 2 Chu kỳ (2 – 3 Tuần / Thứ Ba Ngày Cổ Ngữ GAR/KvK) để ghép dồn lại.",
                en: "1 – 2 Cycles (2 – 3 Weeks / Tuesday Runes Day of GAR/KvK) to consolidate and merge.",
              },
              {
                vi: "Không cần Reroll vì các viên `Cổ Ngữ / Phù Văn` bậc thấp vẫn giữ nguyên làm phôi nâng lên `Lv.5`.",
                en: "Never Reroll — low-tier `Runes` serve directly as merge fodder toward `Lv.5`.",
              },
            ],
            [
              {
                vi: "Bẫy #8: Nâng `Nhà Kho` & `Mỏ Tài Nguyên` thay vì đua `Lâu Đài` (`Castle`) & `Viện Tinh Hoa` (`Học Viện Rực Rỡ`)",
                en: "Trap #8: Upgrading `Warehouse` & `Resource Mines` instead of rushing `Castle` & `Brilliance Institute`",
              },
              {
                vi: "Trung bình (Chậm tiến độ Lâu Đài & Viện Tinh Hoa vài ngày)",
                en: "Moderate (Delays Castle & Brilliance Institute progression by several days)",
              },
              {
                vi: "Hủy ưu tiên `Nhà Kho` (`Warehouse`) và `Mỏ Tài Nguyên` (`Resource Mines`); dồn 100% hàng đợi xây dựng đẩy `Lâu Đài` (`Castle Lv.25 / Lv.30 / Lv.40`), `Viện Nghiên Cứu` (`Research Cottage`), `Trại Lính` (`Barracks`) và hướng tới `Viện Tinh Hoa` (`Học Viện Rực Rỡ` / `Viện Huy Hoàng` / `Brilliance Institute`).",
                en: "Deprioritize `Warehouse` and `Resource Mines`; lock 100% of builder queues onto rushing `Castle` (`Lv.25 / Lv.30 / Lv.40`), `Research Cottage`, and Queue 1 `Barracks` toward unlocking the `Brilliance Institute`.",
              },
              {
                vi: "1 – 2 Tuần (1 kỳ Ngày 1 Xây dựng `Đua Vũ Trang Bang Hội` / `Đức Vua Tối Cao`) là bắt kịp mốc chuẩn của máy chủ.",
                en: "1 – 2 Weeks (1 Day 1 Construction window of `Guild Arms Race` / `Supreme King`) to catch right back up to the server benchmark.",
              },
              {
                vi: "Không cần Reroll trừ khi kẹt ở `Lâu Đài` Lv.15 sau 3 tuần chơi vì cạn sạch Tăng Tốc.",
                en: "No Reroll needed unless stuck at `Castle` Lv.15 after 3 weeks with zero Speedups left.",
              },
            ],
            [
              {
                vi: "Bẫy #9: Mở `Rương Vũ Khí Độc Quyền` cho tướng quá độ thay vì trụ cột cuối mùa",
                en: "Trap #9: Opening `Exclusive Weapon Chest` items for transitional heroes instead of endgame carries",
              },
              {
                vi: "Nặng (Thất thoát mảnh Vũ khí Độc quyền quý hiếm)",
                en: "Severe (Loss of scarce Exclusive Weapon shards)",
              },
              {
                vi: "Dừng nâng cấp Vũ khí Độc quyền của tướng quá độ ở mức hiện tại (`Lv.1–Lv.5` cho Đội 2); khóa toàn bộ `Rương Vũ Khí Độc Quyền` mới cho `Ngộ Không` (`Wukong`), `Đấng Toàn Năng` (`Paragon`), `Triệu Hồi Thủy` (`Tidecaller`), `Trinh Nữ Bão Tố` (`Storm Maiden`), `Hoàng Tử Sa Mạc` (`Desert Prince`), `Phù Thủy` (`Witch`).",
                en: "Stop upgrading the transitional hero's Exclusive Weapon at its current level (`Lv.1–Lv.5` for Queue 2); lock all future `Exclusive Weapon Chest` items strictly for `Wukong`, `Paragon`, `Tidecaller`, `Storm Maiden`, `Desert Prince`, and `Witch`.",
              },
              {
                vi: "2 Chu kỳ (3 – 5 Tuần) tích lại từ Tiệm 4 Quốc Gia & vòng quay sự kiện Thần khí.",
                en: "2 Cycles (3 – 5 Weeks) accumulating chests from the Four Nations Shop and Exclusive Weapon events.",
              },
              {
                vi: "Chỉ cân nhắc Reroll nếu đã xả > 150 `Rương Vũ Khí Độc Quyền` vào tướng phụ làm mất mốc `+10` của Hyper-Carry chính; không cần Reroll nếu mới mở nhầm 5–10 mảnh đầu tiên.",
                en: "Only consider Rerolling if you burned > 150 `Exclusive Weapon Chest` items on a bench hero and lost your main Hyper-Carry's `+10` breakpoint; no Reroll needed if you only misspent 5–10 shards.",
              },
            ],
            [
              {
                vi: "Bẫy #10: Luyện mới lính cao cấp trực tiếp thay vì `Thăng Cấp Lính Bậc Thang` (`Staircase Troop Promotion` `T5–T11`)",
                en: "Trap #10: Training high-tier troops directly instead of `Staircase Troop Promotion` (`T5–T11`)",
              },
              {
                vi: "Trung bình (Khắc phục được 100% và chuyển thành kho điểm nổ!)",
                en: "Moderate (100% Recoverable — converts into a massive point jackpot!)",
              },
              {
                vi: "Không xóa lính cấp thấp! Chuyển toàn bộ `Trại Lính` (`Barracks`) sang chế tạo lính phôi bậc thấp (`T5–T9`) ngày thường; chỉ bấm nút **Thăng Cấp (`Promote`)** theo kỹ thuật `Thăng Cấp Lính Bậc Thang` (`Staircase Troop Promotion`) đồng loạt lên `Lính Bậc 10` (`T10`) / `Lính Bậc 11` (`T11`) vào Ngày 5 `Đua Vũ Trang Bang Hội` (`GAR`) / `Đức Vua Tối Cao` (`KvK`).",
                en: "Do NOT dismiss low-tier troops! Set all `Barracks` to pre-train lower-tier fodder (`T5–T9`) on weekdays; batch-**`Promote`** them via `Staircase Troop Promotion` into `Tier 10 Troops` (`T10`) / `Tier 11 Troops` (`T11`) on Day 5 of `Guild Arms Race` (`GAR`) / `Supreme King` (`KvK`).",
              },
              {
                vi: "1 Chu kỳ (7 – 14 Ngày tích phôi lính) để chuyển bại thành thắng ngay vào Thứ Sáu Kỳ `Đua Vũ Trang Bang Hội` (`GAR`) kế tiếp!",
                en: "1 Cycle (7 – 14 Days pre-training fodder) to turn the mistake into a massive win on the very next `Guild Arms Race` (`GAR`) Friday!",
              },
              {
                vi: "Tuyệt đối không cần Reroll — lượng lính bậc thấp tồn đọng chính là 'kho điểm nổ' cho kỳ `Đua Vũ Trang Bang Hội` (`GAR`) sắp tới!",
                en: "Never Reroll — your backlog of low-tier troops is a ready-made point goldmine for the upcoming `Guild Arms Race` (`GAR`)!",
              },
            ],
          ],
        },
      ],
    },
    {
      id: "sec-5-sunday-audit-checklist",
      isPro: true,
      title: {
        vi: "5. Kịch bản Thực chiến Nâng cao: Quy Trình Tự Kiểm Toán 15 Phút Mỗi Chủ Nhật (The Sunday 15-Minute Audit Checklist)",
        en: "5. Advanced Tactical Routine: The Sunday 15-Minute Account Audit Checklist",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "**Quy Trình Kiểm Toán Tối Chủ Nhật:** Để đảm bảo tài khoản vận hành ở hiệu suất 100% Min-Max trước tuần sự kiện mới (`02:00 UTC` / `09:00` sáng Thứ Hai Giờ VN), hãy thực hiện Quy trình Kiểm toán 5 Điểm:",
            en: "**Sunday Evening Audit Routine:** To guarantee your account operates at 100% Min-Max efficiency before the weekly reset at Monday `02:00 UTC` server time, complete this 5-Point Audit Checklist:",
          },
        },
        {
          type: "checklist",
          checklistId: "sunday-15min-audit-v2",
          title: {
            vi: "Checklist 5 Điểm Kiểm Toán Tối Chủ Nhật & Sáng Thứ Hai (02:00 UTC / 09:00 Giờ VN)",
            en: "The 5-Point Sunday Evening & Monday 02:00 UTC Audit Checklist",
          },
          description: {
            vi: "Đánh dấu từng bước kiểm toán trước giờ khởi chạy sự kiện tuần mới (02:00 UTC / 09:00 sáng Thứ Hai Giờ VN). Trạng thái được lưu tự động trên trình duyệt.",
            en: "Check off each audit step before the weekly event reset (Monday 02:00 UTC). Progress is saved automatically in your browser.",
          },
          items: [
            {
              id: "audit-1-monday-0900-calendar",
              badge: { vi: "02:00 UTC (09:00 VN) Thứ Hai", en: "Monday 02:00 UTC" },
              label: {
                vi: "Kiểm điểm 1 — Mở Event ➔ Lịch Event bấm kiểm tra các thanh sự kiện Thứ Hai (02:00 UTC / 09:00 Giờ VN)",
                en: "Checkpoint 1 — Open Event ➔ Event Calendar and inspect the Monday (02:00 UTC) event bars",
              },
              detail: {
                vi: "**Tuần Thi Đấu Hội (`Guild Race` — kèm `Khiêu Chiến Của Đội Quân Hắc Ám` & `Tập Kích Cự Ma`):** Chỉ tiêu vừa đủ mốc rương cá nhân, chuẩn bị nghiên cứu ngắn, lính Pre-cook và `Hộp Quà Công Trình Chưa Mở`.\n• **Giữ Nguyên Liệu & Khóa Kỳ GAR/KvK:** Giữ nguyên liệu Lord Gear cho Ngày 5–7; nếu tuần tới là `Đua Vũ Trang Bang Hội` (`GAR`) hoặc `Đức Vua Tối Cao` (`KvK`), đóng băng mọi nâng cấp để xả theo 6 ngày chủ đề.",
                en: "**Guild Race Week (with Dark Legion Challenge & Giant Raid):** Spend only for personal milestone chests, and prep 5–30m research nodes, pre-cooked troops, and `Unopened Building Gift Box` rewards.\n• **Save Lord Gear & Lock GAR/KvK:** Save Lord Gear for Days 5–7; if the upcoming week is `Guild Arms Race` (`GAR`) or `Supreme King` (`KvK`), freeze upgrades to unleash across the 6 fixed theme days.",
              },
            },
            {
              id: "audit-2-diamond-and-soul-stone-floor",
              badge: { vi: "30k KC & 9 Đá Đỏ", en: "30k KC & 9 Soul Stones" },
              label: {
                vi: "Kiểm điểm 2 — Kiểm tra Quỹ Kim Cương (30,000 KC) & Đáy Ví Đá Linh Hồn",
                en: "Checkpoint 2 — Verify the 30,000 Diamond Reserve & Soul Stone Dual-Currency Floor",
              },
              detail: {
                vi: "**Đáy Ví Kim Cương:** Đảm bảo Quỹ Kim Cương đạt tối thiểu `30,000 KC` trước giờ khởi chạy sự kiện tuần mới.\n• **Đáy Ví Đá Linh Hồn:** Khóa đáy ví `40,000` `Điểm Vinh Dự Bang` hoặc `12,000–18,000` `Xu Vinh Quang Hội` để gom đủ `9 Hồn Đá Đỏ` (`40,000` Điểm/viên = `360,000` hoặc `6,000` Xu/viên = `54,000`).",
                en: "**Diamond Floor:** Confirm your Diamond reserve stays above `30,000 Diamonds` before the weekly reset.\n• **Soul Stone Floor:** Lock `40,000` `Guild Honor` or `12,000–18,000` `Guild Glory Coins` to secure `9 Soul Stones` (`40,000` Honor/stone = `360,000` or `6,000` Glory Coins/stone = `54,000`).",
              },
            },
            {
              id: "audit-3-secondary-queue-gear-sweep",
              badge: { vi: "Thu hồi 100% Quặng", en: "100% Ore Recovery" },
              label: {
                vi: "Kiểm điểm 3 — Rà soát Trang bị Đội 2 & Đội 3",
                en: "Checkpoint 3 — Audit Queue 2 & Queue 3 Equipment",
              },
              detail: {
                vi: "**Rà Soát Đồ Đội 2/3:** Kiểm tra xem trong tuần có vô tình lắp nhầm Trang bị Vàng có `Dấu Ấn Phe Phái` (+30%) hoặc nâng cấp Quặng vào đồ của Đội 2/3 hay không.\n• **Thu Hồi Dồn Đội 1:** Nếu có, tháo ngay hoặc phân giải đồ Tím cường hóa để dồn 100% về kích mốc Cộng hưởng `+10` / `+20` / `+30` / `+40` cho Đội 1.",
                en: "**Sweep Secondary Queues:** Check if any Faction-Marked Gold Gear (`Faction Mark` +30%) or Enhancement Ore was accidentally placed on Queue 2/3.\n• **Reclaim for Queue 1:** Reclaim and dismantle enhanced purple pieces immediately to push Queue 1 `+10` / `+20` / `+30` / `+40` resonance.",
              },
            },
            {
              id: "audit-4-epic-traits-exchange-shop",
              badge: { vi: "300 ➔ 500 Mảnh", en: "300 ➔ 500 Shards" },
              label: {
                vi: "Kiểm điểm 4 — Kiểm tra Tiến độ Thiên phú Tướng Tím & Tiệm Đổi Quà (Exchange Shop)",
                en: "Checkpoint 4 — Check Epic Hero Economy Traits & Weekly Exchange Shop Reset",
              },
              detail: {
                vi: "**Đổi Mảnh Dư Tiệm Đổi Quà:** Vào Exchange Shop đổi toàn bộ mảnh tướng Tím 15 Sao (500 Mảnh) dư thừa sang Mảnh Vạn Năng Tím / Cam và Sách Kỹ năng giảm giá trước khi làm mới.\n• **Đẩy Tướng Kinh Tế:** Ưu tiên đẩy `Võ Sĩ` (`Brawler` `+30%` Nghiên cứu), `Kỵ Sĩ` (`Knight` `+30%` Lính), `Cung Thủ` (`Ranger` `+30%` Đào Ruby) đạt `2★ Trắng` (`300 Mảnh`) ➔ `5★ Trắng` (`500 Mảnh`).",
                en: "**Convert Surplus Shards:** In the Exchange Shop, convert all surplus shards from maxed 15-Star (500 Shards) Epic heroes into Universal Epic/Legendary Shards and discounted Skill Books before reset.\n• **Push Economy Heroes:** Prioritize pushing `Brawler` (+30% Research), `Knight` (+30% Training), and `Ranger` (+30% Ruby Gathering) to 2 White Stars (`300 Shards`) ➔ 5 White Stars (`500 Shards`).",
              },
            },
            {
              id: "audit-5-pre-cooking-unopened-gift-box",
              badge: { vi: "Unopened Gift Box", en: "Unopened Gift Box" },
              label: {
                vi: "Kiểm điểm 5 — Chuẩn bị 'Nấu Trước Hàng Đợi (Pre-Cooking Queues)' & Giữ Hộp Quà Công Trình",
                en: "Checkpoint 5 — Prep 'Pre-Cooking Queues' & Leave Building Gift Boxes Unopened",
              },
              detail: {
                vi: "**Nấu Trước Công Trình:** Bấm xây các công trình lớn từ trước để hoàn thành, nhưng TUYỆT ĐỐI KHÔNG BẤM VÀO `Hộp Quà Công Trình Chưa Mở` (`Unopened Building Gift Box`) trên màn hình làng.\n• **Khui Hộp Đúng Nhịp:** Chờ Thứ Hai (sau khi nhận Nhiệm vụ Vàng Công trình `Thi Đấu Hội` hoặc khung `06:00–10:00 UTC` / `13:00–17:00 VN` Thứ Hai `GAR`/`KvK`) mới khui hộp ăn điểm trong 10 giây!",
                en: "**Pre-Cook Buildings:** Start major building upgrades in advance so the timer finishes, but NEVER TAP THE `Unopened Building Gift Box` on your village screen.\n• **Pop on Monday Window:** Wait until Monday (after claiming a Golden Building Task in Guild Race or during the `06:00–10:00 UTC` Monday `GAR`/`KvK` window) before popping the box for instant points!",
              },
            },
          ],
        },
        {
          type: "media_spotlight",
          mediaCode: "MED-1.4-05",
          tier: "tier4_youtube_ref",
          title: {
            vi: "Video Tham Chiếu Quốc Tế: Top 10 Mistakes That Ruin Your Account in Top Heroes",
            en: "International Video Reference: Top 10 Mistakes That Ruin Your Account in Top Heroes",
          },
          description: {
            vi: "Phân tích trực quan 10 sai lầm phổ biến nhất của người chơi Top Heroes trong 60 ngày đầu và cách khắc phục từng lỗi trên giao diện thực tế.",
            en: "Visual breakdown of the 10 most common account-ruining mistakes in Top Heroes during the first 60 days and how to recover from each in-game.",
          },
          videoChannel: "OGFlux / RedBaron Gaming",
          videoTitle:
            "Top 10 Mistakes That Ruin Your Account in Top Heroes & How to Fix Them",
          videoTimestamp: "00:45 – 11:20",
          videoUrl:
            "https://www.youtube.com/results?search_query=Top+Heroes+Top+10+Mistakes+OGFlux+RedBaron",
        },
      ],
    },
  ],
};

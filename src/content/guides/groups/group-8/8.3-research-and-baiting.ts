import type { GuideArticle } from "../../types";

export const ARTICLE_8_3_RESEARCH_AND_BAITING: GuideArticle = {
  code: "8.3",
  displayCode: "9.3",
  slug: "research-and-baiting",
  categorySlug: "infrastructure",
  badge: "PRO",
  readingMinutes: 12,
  title: {
    vi: "Chiến Lược Cây Nghiên Cứu Khoa Học & Kỹ Thuật Mồi Nhử Phá Tuyến (Research, Pre-Click Snapshot & Tank Baiting)",
    en: "Research Cottage Tech Priority, Pre-Click Snapshot & 3-Second Formation Tank-Baiting Tactics",
  },
  summary: {
    vi: "Bảng xếp hạng 5 tầng ưu tiên Cây Nghiên cứu Khoa học (Arms Race Prep mở Hộp Thưởng Thứ 6 +200% ➔ Queue 1 Boost 100%), chiến thuật bảo tồn nhánh Economy làm kho mồi 5–30 phút, quy trình 4 bước Pre-Click Snapshot giảm 40%–60% thời gian, kỹ thuật PvP Mồi Nhử Phá Tuyến Địch (Formation Tank Baiting) trong 3 giây đầu trận và bảng 17 hàng chi phí Công nghệ Tinh Chất Rồng (DE-Dust).",
    en: "5-tier Research Cottage priority ranking (Arms Race Prep 6th Chest +200% ➔ 100% Queue 1 Boost), preserving the Economy tree as a 5–30m event-bait bank, the 4-step Pre-Click Snapshot formula cutting 40%–60% duration, 3-second Euclidean Formation Tank-Baiting PvP tactics, and the 17-row Dragon Essence (DE-Dust) tech cost table.",
  },
  tldr: {
    coreRule: {
      vi: "**Mục tiêu Tối thượng**: Khi Research Cottage đạt `Lv.20`, dồn `100%` tài nguyên vào `Arms Race Prep` / `Commendation`.\n• **Đột phá Lợi tức**: Mở Hộp Thứ 6 (`Extra Rewards` / `Double Rewards`) nhân đôi rương GAR `+200%`, song song đẩy `Queue 1 Boost` / `Combat Expertise` đạt `100%`.",
      en: "**Ultimate Priority**: Once Research Cottage hits `Lv.20`, funnel `100%` of resources into `Arms Race Prep` / `Commendation`.\n• **Yield Breakthrough**: Unlock the 6th Chest (`Extra Rewards` / `Double Rewards`) for `+200%` GAR yields while pushing `Queue 1 Boost` / `Combat Expertise` to `100%`.",
    },
    immediateAction: {
      vi: "**Bảo tồn Kho Mồi**: Giữ các nốt ngắn (`5–30 phút`) của nhánh `Economy` ở `~20%–25%` (`24.8%`) làm mồi ăn Nhiệm vụ Vàng Guild Race (Thi Đấu Hội) và rương GAR (GAR/KvK).\n• **Pre-Click Snapshot**: Bật đủ 4 bước (`Brawler`/`Knight` `12★` `+30%`, `Shaman`/`Hostess` `+40%`, Dân làng `+3.20%`, `Secretary of Science`) TRƯỚC khi bấm Research!",
      en: "**Preserve Bait Bank**: Freeze short `5–30m` `Economy` nodes at `~20%–25%` (`24.8%`) for Guild Race Golden Tasks and GAR/KvK Tuesday GAR chest thresholds.\n• **Pre-Click Snapshot**: Lock all 4 buffs (`12★` `Brawler`/`Knight` `+30%`, `Shaman`/`Hostess` `+40%`, Villagers `+3.20%`, `Secretary of Science`) BEFORE tapping Research!",
    },
    strictTaboo: {
      vi: "**Đóng băng Nhánh Đắt**: Cấm nâng các nhánh ngốn tài nguyên như `S1 Battle`, `Peacekeeper` hay `Queue 2 & 3 Boost` trước khi xong Hộp Thứ 6 `Arms Race Prep` và `100%` `Queue 1 Boost`.\n• **Cấm dọn sạch Economy**: Tuyệt đối không bấm nâng sạch `100%` các nốt ngắn của nhánh `Economy` vào ngày thường!",
      en: "**Freeze Costly Trees**: Strictly freeze `S1 Battle`, `Peacekeeper`, and `Queue 2 & 3 Boost` until unlocking the 6th Chest in `Arms Race Prep` and `100%` `Queue 1 Boost`.\n• **Never Clear Economy**: Never clear out `100%` of short `5–30m` `Economy` nodes on non-event days!",
    },
  },
  keyTakeaways: [
    {
      vi: "**Thứ tự 5 Tầng Nghiên cứu**: (1) `Arms Race Prep` / `Commendation` mở Hộp Thứ 6 `Extra Rewards` / `Double Rewards` (`+200%` rương GAR); (2) `Queue 1 Boost` / `Combat Expertise` (`100%`).\n• **Phân bổ Tầng 3–5**: (3) `Growth` / `Development` & `Economy` (chỉ lấy tốc độ & `Tool Improvement -5%`, giữ `Economy` ở `24.8%`); (4) `Soldiers & Heroes` + `Season Tech`; (5) Đóng băng `S1 Battle` / `Peacekeeper`.",
      en: "**5-Tier Tech Priority**: (1) `Arms Race Prep` / `Commendation` for the 6th Box `Extra Rewards` / `Double Rewards` (`+200%` GAR chests); (2) `Queue 1 Boost` / `Combat Expertise` (`100%`).\n• **Tiers 3–5 Allocation**: (3) `Growth` / `Development` & `Economy` (max speed & `Tool Improvement -5%`, freeze `Economy` at `24.8%`); (4) `Soldiers & Heroes` + `Season Tech`; (5) Freeze `S1 Battle` / `Peacekeeper`.",
    },
    {
      vi: "**Mồi Nhử Phá Tuyến (`0.0s ➔ 3.0s ➔ 3.5s+`)**: Lợi dụng AI khóa mục tiêu theo `Euclidean Distance` gần nhất trong 3 giây đầu để đặt Off-Tank (`Desert Prince`, `Tidecaller`, `Adjudicator`) lệch trục.\n• **Đột kích Hàng sau**: Kéo lệch 2 Tanker địch sang một cánh, mở `Open Chokepoint` cho `Wukong`, `Storm Maiden`, `Paragon`, `Pyromancer`, `Bishop`, `Ne Zha`, `Pixie` kết liễu hàng sau địch!",
      en: "**Formation Tank Baiting (`0.0s ➔ 3.0s ➔ 3.5s+`)**: Exploit the `0.0s–3.0s` AI targeting (`Euclidean Distance`) by placing an asymmetric Off-Tank (`Desert Prince`, `Tidecaller`, `Adjudicator`).\n• **Backline Assassination**: Pull both enemy Tankers diagonally to open an `Open Chokepoint` for `Wukong`, `Storm Maiden`, `Paragon`, `Pyromancer`, `Bishop`, `Ne Zha`, `Pixie` to burst the backline!",
    },
    {
      vi: "**Pre-Click Snapshot & `Tab DE-Dust`**: Chốt buff (`Brawler`/`Knight` `12★` `+30%`, `Shaman`/`Hostess` `+40%`, Dân làng `+3.20%`, `Secretary of Science`) trước khi bấm để giảm `40%–60%` giờ.\n• **Đường găng T11 (`4,677 DE`)**: Mở `Soldier Level` (`BI Lv.15`, `288 DE`) qua Training 1 (`24 DE`), Relic (`394 DE`), Soldier 1 (`584 DE`), March Size (`390 DE`).\n• **Các Nốt Điều kiện & Nhánh Sâu**: Tiếp qua Hero Lv1 (`193 DE`), Capacity (`580 DE`), Heal Speed (`482 DE`), Soldier 2 (`1,297 DE`), Soldier 3 (`1,472 DE`), Hero 1 (`2,316 DE`), Hero 2 (`2,888 DE`).",
      en: "**Pre-Click Snapshot & `Tab DE-Dust`**: Lock buffs (`12★` `Brawler`/`Knight` `+30%`, `Shaman`/`Hostess` `+40%`, Villagers `+3.20%`, `Secretary of Science`) before clicking to cut `40%–60%` time.\n• **T11 Critical Path (`4,677 DE`)**: Unlock `Soldier Level` (`BI Lv.15`, `288 DE`) via Training 1 (`24 DE`), Relic (`394 DE`), Soldier 1 (`584 DE`), March Size (`390 DE`).\n• **Prerequisite & Deep Nodes**: Followed by Hero Lv1 (`193 DE`), Capacity (`580 DE`), Heal Speed (`482 DE`), Soldier 2 (`1,297 DE`), Soldier 3 (`1,472 DE`), Hero 1 (`2,316 DE`), Hero 2 (`2,888 DE`).",
    },
  ],
  keywords: [
    "cây nghiên cứu",
    "cay nghien cuu",
    "research cottage",
    "arms race prep",
    "commendation",
    "extra rewards",
    "double rewards",
    "mồi nhử phá tuyến",
    "moi nhu pha tuyen",
    "formation tank baiting",
    "tank baiting",
    "pre-click snapshot",
    "secretary of science",
    "bộ trưởng khoa học",
    "dragon essence tech cost",
    "4,677",
  ],
  sourceFiles: [
    "docs/06-game-guides/07-standardized-web-guides/group-8-infrastructure/8.3-research-and-baiting.md",
    "docs/06-game-guides/01-core-strategic-topics/topic-2-and-4-buildings-and-research-tech.md",
    "docs/06-game-guides/04-account-audits-and-consultations/research-completion-and-next-steps.md",
    "docs/06-game-guides/03-data-tables-and-mechanics/topheroes-tables-max-raw-dataset.md",
  ],
  freeSections: [
    {
      id: "sec-1-research-cottage-priority-tier-list",
      title: {
        vi: "1. Giải thích Cơ chế Cốt lõi: Thứ Tự Ưu Tiên Cây Nghiên Cứu Khoa Học (Research Cottage)",
        en: "1. Core Mechanics: Research Cottage Tech Tree Priority Tier List",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "**Động cơ Kinh tế & Thực chiến**: Nếu Lâu Đài (`Castle`) là phần xác quyết định trần cấp độ, thì Viện Nghiên Cứu (`Research Cottage`) là phần hồn quyết định tốc độ sinh lời tài nguyên và sức mạnh ẩn.\n• **Rủi ro Sai thứ tự**: Sau khi xong nhánh Tân Thủ (`Beginner Combat` `100%`), việc phân bổ sai thứ tự giữa `7+` nhánh lớn sẽ làm thất thoát hàng chục ngàn Kim Cương và Mảnh Tướng Vàng mỗi tháng.",
            en: "**Economic & Combat Engine**: If your `Castle` level governs building caps, the `Research Cottage` is the economic engine and hidden combat core of your entire account.\n• **Misallocation Cost**: After finishing `Beginner Combat` (`100%`), investing across the `7+` major tech branches in the wrong sequence costs tens of thousands of Diamonds and Universal Shards monthly.",
          },
        },
      ],
      subSections: [
        {
          id: "sub-1-1-five-tier-tech-tree-priority-table",
          title: {
            vi: "1.1. Bảng Xếp Hạng 5 Tầng Ưu Tiên Tuyệt Đối (Tech Tree Priority Tier List)",
            en: "1.1. The 5-Tier Absolute Tech Tree Priority Ranking",
          },
          blocks: [
            {
              type: "media_spotlight",
              mediaCode: "MED-8.3-01",
              tier: "tier2_annotated_ui",
              title: {
                vi: "Giao Diện Cây Công Nghệ Arms Race Prep / Commendation & Mỏ Vàng Hộp Thưởng Thứ 6",
                en: "Arms Race Prep / Commendation Tech Tree UI & The 6th Reward Chest Goldmine",
              },
              description: {
                vi: "Ảnh chụp giao diện cây công nghệ Arms Race Prep (Chuẩn Bị Chạy Đua Vũ Trang — mở ở Viện Nghiên Cứu Lv.20), khoanh đỏ phát sáng vào node cuối Extra Rewards / Double Rewards (Hộp Phần Thưởng Thứ 6) giúp nhân đôi (+200%) lợi tức rương sự kiện.",
                en: "Annotated screenshot of the Arms Race Prep / Commendation tech tree (unlocked at Research Cottage Lv.20), highlighting the terminal Extra Rewards / Double Rewards (6th Reward Chest) node that doubles (+200%) event chest returns.",
              },
              annotations: [
                {
                  kind: "do",
                  label: {
                    vi: "Mục tiêu Số 1 Tuyệt đối — Node Extra Rewards / Double Rewards (Hộp Thứ 6)",
                    en: "#1 Absolute Target — Extra Rewards / Double Rewards Node (6th Chest)",
                  },
                  detail: {
                    vi: "Ngay khi Viện Nghiên Cứu đạt Lv.20, dồn 100% tài nguyên mở khóa Hộp Thứ 6 và nhân đôi phần thưởng rương trong Guild Arms Race (GAR), giúp lượng Kim Cương, Mảnh Vàng Vạn Năng và Bình Tăng Tốc thu về mỗi tuần tăng vọt 200%.",
                    en: "As soon as Research Cottage hits Lv.20, funnel 100% of resources to unlock the 6th Chest and double reward multipliers in Guild Arms Race (GAR), surging weekly Diamonds, Universal Shards, and Speedups by 200%.",
                  },
                },
                {
                  kind: "info",
                  label: {
                    vi: "Mục tiêu Song hành — Queue 1 Boost / Combat Expertise đạt 100%",
                    en: "Parallel Priority — Complete 100% of Queue 1 Boost / Combat Expertise",
                  },
                  detail: {
                    vi: "Bơm trực tiếp Quy mô Hành quân (March Size) và % ATK / HP / DEF cho Đội hình 1, đồng thời là điều kiện bắt buộc để mở khóa các cây quân sự chuyên sâu phía sau.",
                    en: "Directly injects March Size and % ATK / HP / DEF into Queue 1 while serving as the mandatory prerequisite gate to unlock advanced military tech trees.",
                  },
                },
                {
                  kind: "dont",
                  label: {
                    vi: "Đóng băng S1 Battle / Peacekeeper & Bảo tồn Kho Mồi Economy (~20%–25%)",
                    en: "Freeze S1 Battle / Peacekeeper & Preserve the Economy Bait Bank (~20%–25%)",
                  },
                  detail: {
                    vi: "Tuyệt đối không đốt tài nguyên vào S1 Battle hay Peacekeeper trước khi xong Arms Race Prep & Queue 1 Boost; giữ nguyên các node 5–30 phút của nhánh Economy để làm mồi nhiệm vụ sự kiện.",
                    en: "Never burn resources on S1 Battle or Peacekeeper before finishing Arms Race Prep & Queue 1 Boost; keep 5–30 minute Economy nodes untouched as event quest bait.",
                  },
                },
              ],
            },
            {
              type: "table",
              caption: {
                vi: "Bảng 1.1: Bảng xếp hạng 5 tầng thứ tự ưu tiên Cây Nghiên Cứu Khoa Học (Research Cottage Priority Tier List)",
                en: "Table 1.1: 5-Tier Research Cottage Tech Tree Priority Ranking & ROI Analysis",
              },
              headers: [
                {
                  vi: "Thứ Tự Ưu Tiên",
                  en: "Priority Tier",
                },
                {
                  vi: "Tên Nhánh Công Nghệ (In-game EN / VI)",
                  en: "Tech Branch Name (In-game EN / VI)",
                },
                {
                  vi: "Mục Tiêu Cốt Lõi Cần Mở Khóa",
                  en: "Core Unlock Objectives",
                },
                {
                  vi: "Tại Sao Phải Nâng Theo Đúng Thứ Tự Này? (Phân Tích ROI)",
                  en: "Why Must You Upgrade in This Exact Order? (ROI Analysis)",
                },
              ],
              rows: [
                [
                  {
                    vi: "SỐ 1 TUYỆT ĐỐI ★",
                    en: "#1 ABSOLUTE PRIORITY ★",
                  },
                  {
                    vi: "Arms Race Prep / Commendation (Chuẩn Bị Chạy Đua Vũ Trang — Mở ở Viện NC Lv.20)",
                    en: "Arms Race Prep / Commendation (Unlocked at Research Cottage Lv.20)",
                  },
                  {
                    vi: "• Các node Tăng % Điểm Sự Kiện (+Event Points) • Node Double Rewards / Extra Rewards (Hộp Phần Thưởng Thứ 6)",
                    en: "• +Event Points multiplier nodes • Double Rewards / Extra Rewards node (6th Reward Chest)",
                  },
                  {
                    vi: "Mỏ vàng lớn nhất toàn bộ trò chơi. Khi mở khóa Hộp Thứ 6 và nhân đôi phần thưởng rương trong sự kiện Guild Arms Race (GAR), lượng Kim Cương, Mảnh Vàng Vạn Năng và Bình Tăng Tốc thu về mỗi tuần tăng gấp 200%. Nâng xong nhánh này càng sớm, tài khoản càng giàu nhanh theo cấp số nhân.",
                    en: "The single biggest goldmine in the entire game. Unlocking the 6th Chest and doubling chest rewards in Guild Arms Race (GAR) boosts your weekly Diamonds, Universal Legendary Shards, and Speedups by 200%. Completing this tree early compounds account wealth exponentially.",
                  },
                ],
                [
                  {
                    vi: "SỐ 2",
                    en: "#2 PRIORITY",
                  },
                  {
                    vi: "Queue 1 Boost / Combat Expertise (Tăng Cường Đội Hình 1)",
                    en: "Queue 1 Boost / Combat Expertise (Main March Enhancement)",
                  },
                  {
                    vi: "• Cộng Quy mô Hành quân (March Size) cho Đội 1 • Cộng % ATK / HP / DEF cho toàn bộ Đội 1 • Đạt 100% để mở khóa các cây quân sự bậc cao",
                    en: "• Adds March Size to Queue 1 • Grants % ATK / HP / DEF to all Queue 1 units • Must hit 100% to unlock high-tier military trees",
                  },
                  {
                    vi: "Mọi trận chiến PvP, Đấu trường và săn Boss đều do Đội hình 1 gánh vác. Hoàn thiện 100% nhánh Queue 1 Boost / Combat Expertise vừa bơm thẳng lực chiến thực chất cho Đội 1, vừa là chìa khóa bắt buộc để mở khóa các nhánh nghiên cứu chuyên sâu phía sau.",
                    en: "Every PvP battle, Arena match, and Boss rally is carried by Queue 1. Completing 100% of Queue 1 Boost / Combat Expertise injects raw combat power directly into your main squad while acting as the mandatory key to deeper military branches.",
                  },
                ],
                [
                  {
                    vi: "SỐ 3",
                    en: "#3 PRIORITY",
                  },
                  {
                    vi: "Growth / Development & Economy (Phát Triển & Kinh Tế)",
                    en: "Growth / Development & Economy",
                  },
                  {
                    vi: "• Chỉ nâng tối đa các node Giảm Thời Gian Xây Dựng (Construction Speed) & Giảm Thời Gian Nghiên Cứu (Research Speed) • Node Tool Improvement (Giảm 5% chi phí xây dựng)",
                    en: "• Max only Construction Speed & Research Speed reduction nodes • Tool Improvement node (-5% construction resource cost)",
                  },
                  {
                    vi: "Mang lại 'Lãi kép thời gian' cho toàn bộ 3–4 Hàng đợi Thợ xây và 2 Hàng đợi Nghiên cứu. Lưu ý: Dừng ngay khi đã lấy hết các node giảm thời gian và Tool Improvement; giữ các node tăng sản lượng mỏ ngắn hạn (5–30 phút) ở nhánh Economy ở mức ~20%–25% làm Mồi Sự Kiện!",
                    en: "Delivers compounding time savings across all 3–4 Builder Queues and 2 Research Queues. Note: Stop immediately after maxing speed nodes and Tool Improvement; preserve short 5–30 minute resource yield nodes in the Economy branch at ~20%–25% as Event Bait!",
                  },
                ],
                [
                  {
                    vi: "SỐ 4",
                    en: "#4 PRIORITY",
                  },
                  {
                    vi: "Soldiers & Heroes (Binh Lính & Anh Hùng — Sau khi xong 1, 2, 3)",
                    en: "Soldiers & Heroes (After completing Tiers 1, 2, and 3)",
                  },
                  {
                    vi: "• Tăng lượng lớn HP & ATK cho Binh lính (đặc biệt là nhánh binh chủng của Hệ Đội 1) • Tăng chỉ số cho Tướng và Cây Công Nghệ Mùa Giải (Season Tech)",
                    en: "• Massive HP & ATK boosts for Soldiers (especially Queue 1's faction troop type) • Hero stat nodes and Season Tech trees",
                  },
                  {
                    vi: "Cộng hưởng trực tiếp với bậc lính cao (T8 / T9 / T10) sau khi Doanh trại đạt Lv.25 – Lv.35. Khi bước vào Season 1+, ưu tiên nâng Season Tech vì các chỉ số chiến đấu trong cây mùa giải được giữ lại vĩnh viễn sau khi kết thúc mùa!",
                    en: "Synergizes directly with high-tier troops (T8 / T9 / T10) once Barracks reach Lv.25 – Lv.35. Upon entering Season 1+, prioritize Season Tech because combat stats inside seasonal trees are retained permanently after the season ends!",
                  },
                ],
                [
                  {
                    vi: "ĐÓNG BĂNG",
                    en: "STRICT FREEZE",
                  },
                  {
                    vi: "S1 Battle / Peacekeeper / Queue 2 & 3 Boost (Các nhánh đắt đỏ / Đội phụ)",
                    en: "S1 Battle / Peacekeeper / Queue 2 & 3 Boost (Expensive Endgame / Sub-Queues)",
                  },
                  {
                    vi: "• Tạm khóa hoàn toàn ở giai đoạn Pre-Season và đầu Mid-game",
                    en: "• Completely frozen throughout Pre-Season and early Mid-game",
                  },
                  {
                    vi: "Các nhánh S1 Battle, Peacekeeper và Queue 2 & 3 Boost tiêu tốn hàng chục triệu Thịt/Ruby và hàng trăm giờ nghiên cứu cho mỗi % chỉ số nhỏ lẻ. Đầu tư vào đây khi chưa mở Hộp Thứ 6 Arms Race Prep là tự bóp nghẹt kinh tế tài khoản.",
                    en: "S1 Battle, Peacekeeper, and Queue 2 & 3 Boost consume tens of millions of Meat/Rubies and hundreds of research hours for marginal % gains. Investing here before unlocking the 6th Chest in Arms Race Prep chokes your account economy.",
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: "sec-2-dual-queue-economy-bait-and-factions",
      title: {
        vi: "2. Chiến thuật Tối ưu cho F2P & Low-Spender: Phối Hợp 2 Hàng Đợi Nghiên Cứu, Kho Mồi Economy & Công Nghệ 3 Phe",
        en: "2. F2P & Low-Spender Strategy: Dual Research Queues, The Economy Event Bait & 3-Faction Military Tech",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "**Kỷ luật Nghiên cứu Bi-Weekly**: Để tối đa hóa tốc độ mở khóa công nghệ mà không bị kẹt nhiệm vụ trong Kỳ Thi Đấu Hội (`Guild Race`) và Kỳ GAR/KvK (`Guild Arms Race`), người chơi cần thiết lập kỷ luật vận hành.\n• **3 Trụ cột Tối ưu**: Phân luồng cố định `2 Hàng đợi Nghiên cứu`, bảo tồn kho mồi `Economy` (`~20%–25%`) và định hướng đúng nhánh quân sự theo Hệ chủ lực của Đội 1.",
            en: "**Bi-Weekly Research Discipline**: To maximize tech progression without getting locked out of bi-weekly event tasks in Guild Race and GAR/KvK (`Guild Arms Race`), enforce a strict operating protocol.\n• **3 Optimization Pillars**: Lock in fixed roles across `2 Research Queues`, preserve the `Economy` bait bank (`~20%–25%`), and align military tech with Queue 1's main faction.",
          },
        },
      ],
      subSections: [
        {
          id: "sub-2-1-dual-research-queue-orchestration",
          title: {
            vi: "2.1. Cách Phối Hợp 2 Hàng Đợi Nghiên Cứu (Dual Research Queue Strategy)",
            en: "2.1. Dual Research Queue Orchestration Strategy",
          },
          blocks: [
            {
              type: "paragraph",
              text: {
                vi: "**Phân luồng 2 Hàng đợi**: Nếu sở hữu `2 Hàng đợi Nghiên cứu` (1 mặc định + 1 từ gói `Second Tech Queue` `$9.99 USD`), hãy phân công vai trò cố định cho từng hàng đợi thay vì bấm ngẫu nhiên:",
                en: "**Dual-Queue Routing**: If your account owns `2 Research Queues` (1 default + 1 unlocked via the `$9.99 USD` `Second Tech Queue` pack), assign fixed roles to each queue rather than upgrading randomly:",
              },
            },
            {
              type: "list",
              ordered: false,
              items: [
                {
                  vi: "**Hàng Đợi Nghiên Cứu 1 (Main Queue)**: Cắm cố định vào nhánh dài hạn (`Arms Race Prep` / `Commendation` ➔ `Queue 1 Boost` / `Combat Expertise` ➔ `Soldiers` / `Season Tech`), xả tăng tốc vào Thứ Ba Kỳ GAR/KvK.",
                  en: "**Research Queue 1 (Main Queue)**: Dedicate to long projects (`Arms Race Prep` / `Commendation` ➔ `Queue 1 Boost` / `Combat Expertise` ➔ `Soldiers` / `Season Tech`), burning speedups on GAR/KvK Tuesday.",
                },
                {
                  vi: "**Hàng Đợi Nghiên Cứu 2 (Speed Queue)**: Cắm vào nhánh `Development` / `Growth` (tối đa `Construction Speed`, `Research Speed`, `Tool Improvement -5%`), rồi quét các node điều kiện `Arms Race Prep` & `Heroes`.",
                  en: "**Research Queue 2 (Speed Queue)**: Dedicate to `Development` / `Growth` (maxing `Construction Speed`, `Research Speed`, and `Tool Improvement -5%`), then clear prerequisite nodes in `Arms Race Prep` & `Heroes`.",
                },
              ],
            },
          ],
        },
        {
          id: "sub-2-2-economy-tech-event-bait-strategy",
          title: {
            vi: "2.2. Chiến Thuật 'Để Dành Nhánh Kinh Tế Làm Mồi Sự Kiện' (The Economy Tech Bait)",
            en: "2.2. 'Preserving the Economy Branch as Event Bait' Strategy (The Economy Tech Bait)",
          },
          blocks: [
            {
              type: "paragraph",
              text: {
                vi: "**Nguyên lý Kho Mồi 24.8%**: Tại sao trong mọi hồ sơ kiểm toán chuẩn v2.0, nhánh `Economy` (Kinh Tế) luôn được khuyên dừng ở `~20%–25%` (`24.8%`) và TUYỆT ĐỐI KHÔNG ấn nâng cấp vào ngày thường?",
                en: "**The 24.8% Bait Principle**: Why does every standardized v2.0 account audit recommend freezing the `Economy` branch at `~20%–25%` (`24.8%`) and NEVER tapping upgrades on normal days?",
              },
            },
            {
              type: "list",
              ordered: false,
              items: [
                {
                  vi: "**Kho dự trữ node ngắn hạn**: Nhánh `Economy` chứa hàng chục node nghiên cứu bậc thấp (`1/5`, `2/5`) chỉ mất từ `5 phút` đến `30 phút` cho mỗi lần nâng cấp.",
                  en: "**Short-Node Reserve Bank**: The `Economy` branch contains dozens of low-tier research nodes (`1/5`, `2/5`) that take only `5 minutes` to `30 minutes` per upgrade.",
                },
                {
                  vi: "**Ứng dụng 1 — Kỳ Thi Đấu Hội (Guild Race)**: Khi nhận Nhiệm vụ Vàng đếm số lần hoàn thành nghiên cứu, chỉ cần bấm liên tiếp `4–6` node ngắn của nhánh `Economy` là lấy trọn điểm với chưa tới `1 giờ` tăng tốc!",
                  en: "**Application 1 — Guild Race**: When holding a Golden Task counting research completions, tap `4–6` short `Economy` nodes back-to-back to claim full points using under `1 hour` of speedups!",
                },
                {
                  vi: "**Ứng dụng 2 — Kỳ GAR/KvK (GAR Thứ Ba)**: Khi thiếu chút điểm chạm mốc rương cuối ngày mà nhánh chính kẹt dự án `48 giờ`, bấm các node `Economy` ngắn giúp rướn qua vạch đích tức thì với chi phí thấp nhất.",
                  en: "**Application 2 — GAR/KvK (Tuesday GAR)**: When slightly short of the final daily chest while main queues are locked in `48-hour` projects, tapping short `Economy` nodes crosses the threshold instantly.",
                },
              ],
            },
          ],
        },
        {
          id: "sub-2-3-three-faction-military-tech-focus",
          title: {
            vi: "2.3. Định Hướng Nghiên Cứu Quân Sự Theo 3 Phe Phái (League / Horde / Nature) & Checklist Kỷ Luật",
            en: "2.3. 3-Faction Military Tech Focus (League / Horde / Nature) & Discipline Checklist",
          },
          blocks: [
            {
              type: "list",
              ordered: false,
              items: [
                {
                  vi: "**Người chơi Hệ Bộ Lạc (Horde)**: Từ Tuần 4 trở đi, dồn `100%` điểm nghiên cứu hệ vào `Horde Soldier ATK/HP`, `Horde Hero ATK/HP` và Quy mô Hành quân Bộ Lạc (`Full Horde March Size`).",
                  en: "**Horde Commanders (or League ➔ Horde Pivot)**: From Week 4 onward, funnel `100%` of faction research into `Horde Soldier ATK/HP`, `Horde Hero ATK/HP`, and `Full Horde March Size`.",
                },
                {
                  vi: "**Người chơi Hệ Liên Minh (League)**: Tập trung tối đa vào nhánh `League Soldier / Hero` và các node tăng sát thương khắc chế hệ (`Damage on Counter`).",
                  en: "**League Commanders**: Focus exclusively on `League Soldier / Hero` stat nodes and faction counter damage multipliers (`Damage on Counter`).",
                },
                {
                  vi: "**Người chơi Hệ Thiên Nhiên (Nature)**: Ưu tiên `Nature Soldier HP`, `Damage Reduction on Counter` và `Full Nature March Size` để nuôi dàn đệ triệu hồi của `Tidecaller`, `Forest Maiden` và `Treeguard`.",
                  en: "**Nature Commanders**: Prioritize `Nature Soldier HP`, `Damage Reduction on Counter`, and `Full Nature March Size` to sustain the summon frontline of `Tidecaller`, `Forest Maiden`, and `Treeguard`.",
                },
              ],
            },
            {
              type: "checklist",
              checklistId: "research-snapshot-baiting-audit-v2",
              title: {
                vi: "Checklist Kỷ Luật Viện Nghiên Cứu, Pre-Click Snapshot & Mồi Nhử Phá Tuyến",
                en: "Research Cottage, Pre-Click Snapshot & Tank-Baiting Discipline Checklist",
              },
              description: {
                vi: "4 nguyên tắc kiểm tra bắt buộc trước mỗi kỳ xả Tăng tốc Nghiên cứu Thứ Ba Kỳ GAR/KvK và trước khi xếp đội hình PvP/Boss:",
                en: "4 mandatory verification steps before every GAR/KvK Tuesday Research Speedup dump and before setting PvP/Boss formations:",
              },
              items: [
                {
                  id: "chk-83-arms-race-sixth-chest",
                  label: {
                    vi: "Ưu tiên Số 1 mở Hộp Thứ 6 (Extra Rewards / Double Rewards) của Arms Race Prep & 100% Queue 1 Boost",
                    en: "Prioritize #1 unlocking the 6th Chest (Extra Rewards / Double Rewards) in Arms Race Prep & 100% Queue 1 Boost",
                  },
                  detail: {
                    vi: "Đóng băng hoàn toàn S1 Battle, Peacekeeper và Queue 2 & 3 Boost cho tới khi mở xong Hộp Thứ 6 (+200% phần thưởng rương GAR) và đạt 100% Combat Expertise.",
                    en: "Completely freeze S1 Battle, Peacekeeper, and Queue 2 & 3 Boost until the 6th Chest (+200% GAR chest rewards) and 100% Combat Expertise are completed.",
                  },
                  badge: {
                    vi: "ROI +200%",
                    en: "+200% ROI",
                  },
                },
                {
                  id: "chk-83-economy-bait-bank",
                  label: {
                    vi: "Bảo tồn nhánh Economy ở mức ~20%–25% (ví dụ 24.8%) làm Kho Mồi Sự Kiện 5–30 phút",
                    en: "Preserve the Economy branch at ~20%–25% (e.g., 24.8%) as a 5–30m Event Bait Bank",
                  },
                  detail: {
                    vi: "Tuyệt đối không bấm các node tăng sản lượng Gỗ/Đá/Thịt ngắn hạn vào ngày thường; để dành ăn Nhiệm vụ Vàng Guild Race (Thi Đấu Hội) hoặc rướn rương Thứ Ba GAR (GAR/KvK).",
                    en: "Never tap short Wood/Stone/Meat yield nodes on normal days; save them for Guild Race Golden Tasks or GAR/KvK Tuesday GAR chest thresholds.",
                  },
                  badge: {
                    vi: "Kho Mồi",
                    en: "Bait Bank",
                  },
                },
                {
                  id: "chk-83-pre-click-snapshot",
                  label: {
                    vi: "Thực hiện đủ 4 bước Pre-Click Snapshot (Brawler/Knight 12★ + Shaman/Hostess + Dân làng + Secretary of Science)",
                    en: "Execute all 4 Pre-Click Snapshot steps (12★ Brawler/Knight + Shaman/Hostess + Villagers + Secretary of Science)",
                  },
                  detail: {
                    vi: "Kiểm tra Brawler/Knight (+30%), Shaman/Hostess (+40%), Dân làng Research Cottage (+3.20% & 432s) và vương miện Secretary of Science TRƯỚC mili-giây bấm nút Research.",
                    en: "Verify Brawler/Knight (+30%), Shaman/Hostess (+40%), Research Cottage Villagers (+3.20% & 432s), and the Secretary of Science crown BEFORE the millisecond you tap Research.",
                  },
                  badge: {
                    vi: "-40%~60% Giờ",
                    en: "-40%~60% Time",
                  },
                },
                {
                  id: "chk-83-formation-tank-baiting",
                  label: {
                    vi: "Áp dụng Formation Tank Baiting (3 giây đầu trận) kéo lệch Tanker địch theo Euclidean Distance",
                    en: "Apply 3-Second Formation Tank Baiting to pull enemy Tankers via Euclidean Distance",
                  },
                  detail: {
                    vi: "Đặt Desert Prince, đệ Tidecaller hoặc Adjudicator lệch cánh để hút 2 Tanker địch sang một bên, mở hành lang trống cho Wukong, Storm Maiden, Paragon, Pyromancer, Ne Zha hoặc Pixie kết liễu hàng sau.",
                    en: "Place Desert Prince, Tidecaller summons, or Adjudicator asymmetrically to pull both enemy Tankers sideways, opening a lane for Wukong, Storm Maiden, Paragon, Pyromancer, Ne Zha, or Pixie to burst the backline.",
                  },
                  badge: {
                    vi: "PvP 0.0s–3.5s",
                    en: "PvP 0.0s–3.5s",
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "sec-3-research-common-pitfalls",
      title: {
        vi: "3. Những Cạm bẫy Phổ biến & Cách Phòng tránh (Common Pitfalls)",
        en: "3. Common Research & Snapshot Pitfalls",
      },
      blocks: [
        {
          type: "table",
          caption: {
            vi: "Bảng 3.1: 3 sai lầm nghiêm trọng nhất khi nâng Cây Nghiên Cứu và giải pháp Min-Max chuẩn v2.0",
            en: "Table 3.1: Top 3 Critical Research Cottage & Snapshot Pitfalls vs. v2.0 Min-Max Solutions",
          },
          headers: [
            {
              vi: "Sai Lầm Phổ Biến (Account Traps)",
              en: "Common Account Traps",
            },
            {
              vi: "Giải Pháp Tối Ưu (Min-Max Solution)",
              en: "Min-Max Solution",
            },
          ],
          rows: [
            [
              {
                vi: "Bấm nâng sạch 100% nhánh Economy (Kinh Tế) trong 2 tuần đầu vì thấy thời gian ngắn: Đến khi vào kỳ Guild Race (Thi Đấu Hội), toàn bộ các nhánh còn lại đều mất 15–30 giờ/lần, khiến người chơi không thể hoàn thành các Nhiệm vụ Vàng yêu cầu 'Hoàn thành số lần nghiên cứu'.",
                en: "Clearing 100% of the Economy branch in the first 2 weeks just because timers are short: Once Guild Race arrives, every remaining tech node takes 15–30 hours per upgrade, making 'Complete X research upgrades' Golden Tasks impossible without burning massive speedups.",
              },
              {
                vi: "Bảo tồn Kho Mồi Economy (~20%–25%): Khoanh vùng các node tăng sản lượng Gỗ/Đá/Thịt ở nhánh Economy, giữ nguyên ở 0/5 hoặc 1/5 và chỉ bấm khi đang cầm trên tay Nhiệm vụ Sự kiện Guild Race hoặc cần rướn mốc rương Thứ Ba GAR.",
                en: "Preserve the Economy Bait Bank (~20%–25%): Isolate Wood/Stone/Meat yield nodes in the Economy branch, leave them at 0/5 or 1/5, and only tap them while holding an active Guild Race task or pushing a Tuesday GAR chest threshold.",
              },
            ],
            [
              {
                vi: "Đổ hàng ngàn Bụi Rồng (Dragon Essence) và Tăng tốc vào nhánh S1 Battle / Peacekeeper quá sớm: Tốn lượng tài nguyên khổng lồ nhưng chỉ số chỉ áp dụng giới hạn cho đánh quái bản đồ hoặc mùa giải ngắn hạn, trong khi Arms Race Prep vẫn chưa mở Hộp Thứ 6.",
                en: "Dumping thousands of Dragon Essence (DE-Dust) and Speedups into S1 Battle / Peacekeeper too early: Burns massive resources for narrow map-monster or temporary seasonal stats while Arms Race Prep still lacks the 6th Reward Chest.",
              },
              {
                vi: "Kỷ luật Mở Hộp Thứ 6 Trước Tiên: Bắt buộc hoàn thành node Extra Rewards / Double Rewards của Arms Race Prep / Commendation (+200% phần thưởng rương) và 100% Queue 1 Boost / Combat Expertise trước khi chạm vào bất kỳ nhánh nâng cao nào.",
                en: "6th Chest First Discipline: Mandatory completion of the Extra Rewards / Double Rewards node in Arms Race Prep / Commendation (+200% chest rewards) and 100% Queue 1 Boost / Combat Expertise before touching any expensive late-game tree.",
              },
            ],
            [
              {
                vi: "Bấm nút Nghiên cứu xong rồi mới đi nâng Tướng Tím hoặc xin Chức vụ Vương quốc: Do cơ chế Snapshot Thời Gian, mọi buff tốc độ kích hoạt sau khi đã bấm nút đều vô tác dụng đối với dự án đang chạy!",
                en: "Tapping the Research button BEFORE upgrading Purple Heroes or applying for a Kingdom Title: Due to the server's duration snapshot mechanic, any speed buff activated after clicking Research has zero effect on the running timer!",
              },
              {
                vi: "Quy tắc 'Pre-Click Snapshot': Kiểm tra đầy đủ mọi nguồn cộng % Research Speed & % Training Speed — gồm Brawler & Knight đạt +30% ở Cấp Tối Đa (Trait 3 Lv.30 tại mốc 2 Sao Trắng / 12 Sao) cộng dồn với nội tại Tướng Vàng Shaman (+40% Tốc độ Nghiên cứu) và Hostess (+40% Tốc độ Luyện lính), cùng Dân làng (+3.20%) và chức vụ Secretary of Science — TRƯỚC KHI chạm ngón tay vào nút Research.",
                en: "'Pre-Click Snapshot' Rule: Verify all % Research Speed & % Training Speed sources—including Brawler & Knight at +30% Max Level (Trait 3 Lv.30 at 2 White Stars / 12 Stars) stacking with Legendary Shaman (+40% Research Speed) and Hostess (+40% Training Speed), Villagers (+3.20%), and the Secretary of Science kingdom title—BEFORE your finger taps Research.",
              },
            ],
          ],
        },
      ],
    },
  ],
  proSections: [
    {
      id: "sec-4-tank-baiting-preclick-snapshot-and-de-dust",
      isPro: true,
      title: {
        vi: "4. Phân tích Chuyên sâu: Kỹ Thuật Thực Chiến 'Mồi Nhử Phá Tuyến (Formation Tank Baiting)', Quy Trình 'Pre-Click Snapshot' & Bảng Chi Phí Tinh Chất Rồng (DE-Dust)",
        en: "4. Deep-Dive Analysis: 3-Second 'Formation Tank Baiting', The 'Pre-Click Snapshot' Formula & Dragon Essence Tech Cost Table",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "**3 Kỹ năng Định lượng PRO**: (1) Thao túng thuật toán tìm đường `Euclidean Distance` trong 3 giây đầu bằng `Formation Tank Baiting` để thắng đối thủ hơn `20%–30%` lực chiến.\n• **Snapshot & Đường găng DE**: (2) Chốt công thức `Pre-Click Snapshot` cắt giảm `40%–60%` thời gian gốc; và (3) Quy hoạch chuẩn xác đường găng `4,677 DE` trong Viện Huy Hoàng để mở Lính Bậc 11 (`T11`).",
            en: "**3 Quantitative PRO Skills**: (1) Manipulate the 3-second `Euclidean Distance` pathfinding algorithm via `Formation Tank Baiting` to defeat opponents `20%–30%` higher in power.\n• **Snapshot & DE Critical Path**: (2) Lock in the `Pre-Click Snapshot` formula to cut `40%–60%` off base timers; and (3) Budget the `4,677 DE` critical path in the Brilliance Institute to unlock `T11` Troops.",
          },
        },
      ],
      subSections: [
        {
          id: "sub-4-1-formation-tank-baiting-3sec-ai",
          title: {
            vi: "4.1. Kỹ Thuật Thực Chiến: 'Mồi Nhử Phá Tuyến Địch (Formation Tank Baiting)' Trong 3 Giây Đầu Trận",
            en: "4.1. Combat Tactics: 3-Second 'Formation Tank Baiting' & Euclidean AI Pathing Pull",
          },
          blocks: [
            {
              type: "paragraph",
              text: {
                vi: "**Bẫy Đội hình Đối xứng**: Trong Arena hoặc Ải Boss hơn `20%–30%` lực chiến, xếp 2 Tanker đối xứng khiến sát thương đầu trận bị hút sạch vào khiên bất tử của `Adjudicator`, `Rose Princess`, `Desert Prince`, `Monk`.\n• **Cơ chế Khóa Mục tiêu (`00:00 ➔ 00:03`)**: Trong 3 giây đầu, AI khóa vào đơn vị địch có `Euclidean Distance` gần nhất. `Formation Tank Baiting` lợi dụng quy luật này để kéo lệch Tanker địch:",
                en: "**Symmetric Formation Trap**: In Arena or Boss stages `20%–30%` above your power, symmetric frontlines dump all burst into enemy Tanker shields (`Adjudicator`, `Rose Princess`, `Desert Prince`, `Monk`).\n• **AI Targeting Window (`00:00 ➔ 00:03`)**: During the first 3 seconds, units lock onto the nearest `Euclidean Distance` target. `Formation Tank Baiting` exploits this rule to pull enemy Tankers sideways:",
              },
            },
            {
              type: "visual_diagram",
              mediaCode: "MED-8.3-02",
              variant: "timeline_phases",
              title: {
                vi: "Sơ Đồ Chiến Thuật 3 Giây Đầu Trận (0.0s ➔ 3.5s+): Kỹ Thuật Mồi Nhử Phá Tuyến Địch (Formation Tank Baiting)",
                en: "First 3-Second AI Targeting Window (0.0s ➔ 3.5s+): Formation Tank Baiting Tactical Flowchart",
              },
              subtitle: {
                vi: "Thao túng thuật toán khóa mục tiêu khoảng cách gần nhất (Euclidean Distance) để mở hành lang trống đột kích hàng sau",
                en: "Manipulating nearest Euclidean Distance AI targeting to open an unobstructed backline assassination lane",
              },
              centerNode: {
                id: "node-83-tank-baiting-core",
                badge: {
                  vi: "00:00 ➔ 00:03 AI WINDOW",
                  en: "00:00 ➔ 00:03 AI WINDOW",
                },
                title: {
                  vi: "KỸ THUẬT MỒI NHỬ PHÁ TUYẾN ĐỊCH (FORMATION TANK BAITING)",
                  en: "FORMATION TANK BAITING (EUCLIDEAN AI PATHING PULL)",
                },
                subtitle: {
                  vi: "Kéo lệch 2 Tanker địch sang một bên cánh ➔ Mở hành lang trống (Open Chokepoint) kết liễu DPS/Healer địch",
                  en: "Pull both enemy Tankers diagonally to one flank ➔ Open Chokepoint to assassinate enemy Mid/Backline DPS & Healers",
                },
                tone: "gold",
              },
              branches: [
                {
                  title: {
                    vi: "Giây 0.0s: Bố Trí Lệch Trục (Asymmetric Setup)",
                    en: "Second 0.0s: Asymmetric Frontline Setup",
                  },
                  badge: {
                    vi: "BƯỚC 1 (0.0s)",
                    en: "STEP 1 (0.0s)",
                  },
                  tone: "emerald",
                  steps: [
                    {
                      id: "step-83-bait-flank-left",
                      badge: {
                        vi: "Ô Hàng Trước 1 (Cánh Mồi Nhử)",
                        en: "Front Row Slot 1 (Bait Flank)",
                      },
                      title: {
                        vi: "Đặt Off-Tank / Bruiser / Tướng Gọi Đệ làm Mồi Nhử (Bait Unit)",
                        en: "Place Off-Tank / Bruiser / Summoner as the Bait Unit",
                      },
                      subtitle: {
                        vi: "Đặt Desert Prince (Bộ Lạc), đệ triệu hồi của Tidecaller / Forest Maiden / Treeguard (Thiên Nhiên) hoặc Adjudicator (Liên Minh) ở cánh đối diện với Hyper-Carry địch.",
                        en: "Deploy Desert Prince (Horde), summons from Tidecaller / Forest Maiden / Treeguard (Nature), or Adjudicator (League) on the flank opposite the enemy Hyper-Carry.",
                      },
                      tone: "emerald",
                    },
                    {
                      id: "step-83-strike-flank-right",
                      badge: {
                        vi: "Ô Hàng Trước 2 & Hàng Giữa",
                        en: "Front Row Slot 2 & Mid Row",
                      },
                      title: {
                        vi: "Đặt Main Tank Siêu Trâu + Kẹp Hyper-Carry DPS Cùng Phía Địch",
                        en: "Align Main Tank + Hyper-Carry DPS on the Enemy Carry's Flank",
                      },
                      subtitle: {
                        vi: "Kẹp Beastmaster + Wukong / Storm Maiden (Horde), Ne Zha / Pixie (Nature), hoặc Rose Princess + Paragon / Pyromancer (League) ngay phía sau hành lang tấn công.",
                        en: "Stack Beastmaster + Wukong / Storm Maiden (Horde), Ne Zha / Pixie (Nature), or Rose Princess + Paragon / Pyromancer (League) directly behind the strike lane.",
                      },
                      tone: "gold",
                    },
                  ],
                  outcome: {
                    vi: "Thiết lập chênh lệch khoảng cách tiếp xúc đầu tiên để điều hướng AI tiền tuyến đối phương.",
                    en: "Establishes an asymmetric initial contact distance to steer enemy frontline AI pathfinding.",
                  },
                },
                {
                  title: {
                    vi: "Giây 1.5s – 3.0s: Kéo Lệch Tuyến Địch (Euclidean AI Pathing Pull)",
                    en: "Second 1.5s – 3.0s: Euclidean AI Pathing Pull & Open Chokepoint",
                  },
                  badge: {
                    vi: "BƯỚC 2 (1.5s–3.0s)",
                    en: "STEP 2 (1.5s–3.0s)",
                  },
                  tone: "gold",
                  steps: [
                    {
                      id: "step-83-euclidean-pull",
                      badge: {
                        vi: "Euclidean Distance Lock",
                        en: "Euclidean Distance Lock",
                      },
                      title: {
                        vi: "2 Tanker Địch Bị Hút Chéo Sang Cánh Mồi Nhử",
                        en: "Both Enemy Tankers Pulled Diagonally Toward the Bait Flank",
                      },
                      subtitle: {
                        vi: "Do khóa mục tiêu vào đơn vị có khoảng cách hình học (Euclidean Distance) gần nhất, cả 2 Tanker địch xoay mặt sang hội đồng Mồi Nhử / Đệ triệu hồi.",
                        en: "Locking onto the shortest Euclidean Distance target, both enemy Tankers pivot diagonally to gang up on the Bait Unit or summoned minions.",
                      },
                      tone: "gold",
                    },
                    {
                      id: "step-83-open-chokepoint",
                      badge: {
                        vi: "Open Chokepoint",
                        en: "Open Chokepoint",
                      },
                      title: {
                        vi: "Lộ Khoảng Trống Hành Lang Tấn Công (Unobstructed Lane)",
                        en: "Unobstructed Attack Corridor Opens on Opposite Flank",
                      },
                      subtitle: {
                        vi: "Hàng giữa và hàng sau của đối phương mất hoàn toàn lá chắn Tanker che chắn trực diện.",
                        en: "The enemy Midline and Backline completely lose their frontal Tanker shield coverage.",
                      },
                      tone: "emerald",
                    },
                  ],
                  outcome: {
                    vi: "Vô hiệu hóa hoàn toàn góc che chắn của 2 Tanker địch trong 3 giây đầu trận.",
                    en: "Completely neutralizes the enemy Tankers' body-blocking angle within the first 3 seconds.",
                  },
                },
                {
                  title: {
                    vi: "Giây 3.5s+: Đột Kích Hàng Sau (Backline Assassination)",
                    en: "Second 3.5s+: Mid & Backline Assassination",
                  },
                  badge: {
                    vi: "BƯỚC 3 (3.5s+)",
                    en: "STEP 3 (3.5s+)",
                  },
                  tone: "emerald",
                  steps: [
                    {
                      id: "step-83-backline-assassination",
                      badge: {
                        vi: "Direct Target Lock",
                        en: "Direct Target Lock",
                      },
                      title: {
                        vi: "Hyper-Carry Xuyên Thẳng Vào Mid & Backline Địch",
                        en: "Hyper-Carries Bypass Frontline to Delete Enemy Mid & Backline",
                      },
                      subtitle: {
                        vi: "Wukong, Storm Maiden, Paragon, Pyromancer, Ne Zha và Pixie không bị khiên bất tử chắn đường, lập tức bắn/nhảy thẳng vào Pháp sư và Healer chủ lực của địch!",
                        en: "Unblocked by invulnerability shields, Wukong, Storm Maiden, Paragon, Pyromancer, Ne Zha, and Pixie leap or fire straight into the enemy's core Mages and Healers!",
                      },
                      tone: "emerald",
                    },
                  ],
                  outcome: {
                    vi: "Kết liễu nguồn sát thương/hồi máu của địch trước giây thứ 10, lật kèo đối thủ hơn 20%–30% Lực chiến!",
                    en: "Eliminates enemy DPS/Healers before the 10-second mark, overturning 20%–30% power deficits!",
                  },
                },
              ],
              footnote: {
                vi: "Áp dụng hiệu quả nhất trong Đấu Trường (Arena), Chiến Trường Vinh Quang và khi leo Ải Boss Thế Giới / Tháp Thử Thách.",
                en: "Most effective in Arena PvP, Glory Battlefield, and pushing high-deficit World Boss / Trial Tower stages.",
              },
            },
            {
              type: "list",
              ordered: true,
              items: [
                {
                  vi: "**Đội hình Bộ Lạc (Horde)**: Đặt `Desert Prince` ở cánh đối diện DPS địch hút 2 Tanker địch xoay sang một bên, giúp `Beastmaster` + `Wukong` / `Storm Maiden` xuyên thẳng vào Pháp sư/Healer địch.",
                  en: "**Horde Formations**: Place `Desert Prince` on the flank opposite enemy DPS to pull both enemy Tankers sideways, letting `Beastmaster` + `Wukong` / `Storm Maiden` slip through to execute Mages/Healers.",
                },
                {
                  vi: "**Đội hình Thiên Nhiên (Nature)**: Dùng đệ của `Tidecaller`, `Forest Maiden` hoặc `Treeguard` ở một cánh hút chiêu cuối đầu trận của địch, giúp `Ne Zha` hoặc `Pixie` ở cánh kia thoải mái xả sát thương.",
                  en: "**Nature Formations**: Use summoned units from `Tidecaller`, `Forest Maiden`, or `Treeguard` on one flank to absorb opening enemy ultimates, leaving `Ne Zha` or `Pixie` on the other flank free to burst.",
                },
                {
                  vi: "**Đội hình Liên Minh (League)**: Đặt `Adjudicator` lệch sang cánh sát thương vật lý của địch, đồng thời xếp `Rose Princess` + `Paragon` / `Pyromancer` dồn hỏa lực AOE vào đúng góc mà 2 Tanker địch bị gom cụm lại.",
                  en: "**League Formations**: Offset `Adjudicator` toward the enemy's physical flank while aligning `Rose Princess` + `Paragon` / `Pyromancer` to concentrate massive AOE fire directly onto the clustered enemy Tankers.",
                },
              ],
            },
          ],
        },
        {
          id: "sub-4-2-pre-click-snapshot-4step-protocol",
          title: {
            vi: "4.2. Kỹ Thuật 'Pre-Click Snapshot' (Công Thức & Quy Trình 4 Bước Chốt Tốc Độ Nghiên Cứu Trước Khi Bấm Nút)",
            en: "4.2. The 'Pre-Click Snapshot' Technique (Formula & 4-Step Protocol Before Tapping Research)",
          },
          blocks: [
            {
              type: "paragraph",
              text: {
                vi: "**Công thức Toán học**: `Thời Gian Thực Tế = Base Time / [1 + Tổng % Tốc Độ Nghiên Cứu]`. Mọi chỉ số `% Tốc độ Nghiên cứu` đều được máy chủ chụp ảnh tĩnh (`Pre-Click Snapshot`) ngay tại mili-giây bấm nút!\n• **Quy trình Bắt buộc**: Trước khi bấm bất kỳ dự án nghiên cứu lớn nào (từ `24 giờ` đến `10+ ngày`), bắt buộc thực hiện đầy đủ Quy trình 4 Bước `Pre-Click Snapshot` dưới đây:",
                en: "**Duration Formula**: `Actual Duration = Base Time / [1 + Sum of % Research Speed Buffs]`. Every `% Research Speed` modifier is permanently snapshotted (`Pre-Click Snapshot`) at the millisecond you click!\n• **Mandatory Protocol**: Before starting any major tech project (`24 hours` to `10+ days`), always execute the complete 4-Step `Pre-Click Snapshot` Protocol below:",
              },
            },
            {
              type: "list",
              ordered: true,
              items: [
                {
                  vi: "**Bước 1 — Nội tại Tướng Kinh Tế**: Nâng `Brawler` và `Knight` lên `12 Sao` (`Trait 3 Lv.30` nhận `+30%` mỗi tướng), cộng dồn thụ động trong kho tướng với `Shaman` (`+40%` Nghiên cứu) và `Hostess` (`+40%` Luyện lính).",
                  en: "**Step 1 — Passive Hero Traits**: Promote `Brawler` and `Knight` to `12 Stars` (`Trait 3 Lv.30` for `+30%` each), stacking passively in your roster with `Shaman` (`+40%` Research) and `Hostess` (`+40%` Training Speed).",
                },
                {
                  vi: "**Bước 2 — Dân Làng Research Cottage**: Đảm bảo toàn bộ ô Dân làng trong `Research Cottage` đang gắn các Dân làng có dòng `Tech Research Speed` (`+0.60% ➔ +3.20%`) và `Free Tech Speed-up` (`40s ➔ 432s`) cao nhất.",
                  en: "**Step 2 — Research Cottage Villagers**: Ensure all slots in the `Research Cottage` are staffed with your highest villagers granting `Tech Research Speed` (`+0.60% ➔ +3.20%`) and `Free Tech Speed-up` (`40s ➔ 432s`).",
                },
                {
                  vi: "**Bước 3 — Xin Chức Vụ Secretary of Science**: Khi máy chủ mở Cung điện (`Capitol`), nộp đơn xin chức vụ Bộ Trưởng Khoa Học (`Secretary of Science`) và đợi biểu tượng vương miện hiện lên trên đầu Lâu Đài.",
                  en: "**Step 3 — Claim Secretary of Science Title**: Once the `Capitol` opens, apply for the `Secretary of Science` kingdom title (auto-rotated every `5–10m`) and wait until the crown icon appears above your Castle.",
                },
                {
                  vi: "**Bước 4 — Bấm Nút ➔ Guild Help ➔ Xả Tăng Tốc**: Có `Secretary of Science` thì bấm Research ngay (giảm `40%–60%` giờ) rồi nhường lại chức vụ; đợi đầy thanh `Guild Help` mới xả tăng tốc vào Thứ Ba Kỳ GAR/KvK.",
                  en: "**Step 4 — Tap Research ➔ Guild Help ➔ Speedups**: Tap Research while `Secretary of Science` is active (cutting `40%–60%` time), relinquish the title, then wait for full `Guild Help` before dumping speedups on Tuesday.",
                },
              ],
            },
            {
              type: "media_spotlight",
              mediaCode: "MED-8.3-03",
              tier: "tier2_annotated_ui",
              title: {
                vi: "Đối Chiếu Thời Gian Nghiên Cứu Trước & Sau Khi Kích Hoạt Combo Pre-Click Snapshot",
                en: "Before & After Research Timer Comparison Using the Pre-Click Snapshot Combo",
              },
              description: {
                vi: "Ảnh chụp đối chiếu thời gian nghiên cứu thực tế trước và sau khi cộng dồn Brawler 12★ (+30%) + Shaman (+40%) + Dân làng Research Cottage (+3.20% & 432s) + chức vụ Vương quốc Secretary of Science.",
                en: "Annotated UI comparison showing research timer reduction before and after stacking 12★ Brawler (+30%) + Shaman (+40%) + Research Cottage Villagers (+3.20% & 432s) + the Secretary of Science kingdom title.",
              },
              annotations: [
                {
                  kind: "do",
                  label: {
                    vi: "Cộng dồn Nội tại Tướng Tím 12★ (+30%) & Tướng Vàng (+40%) trong kho tướng",
                    en: "Stack 12★ Epic (+30%) & Legendary (+40%) Passive Traits in Roster",
                  },
                  detail: {
                    vi: "Brawler (+30% ở Trait 3 Lv.30, 12 Sao) cộng dồn trực tiếp với Shaman (+40% Tech Research Rate), và Knight (+30%) cộng dồn với Hostess (+40% Soldier Training Speed) mà không cần lắp vào đội hình.",
                    en: "Brawler (+30% at Trait 3 Lv.30, 12 Stars) stacks directly with Shaman (+40% Tech Research Rate), while Knight (+30%) stacks with Hostess (+40% Soldier Training Speed) passively without deployment.",
                  },
                },
                {
                  kind: "info",
                  label: {
                    vi: "Chờ biểu tượng Vương miện Secretary of Science trước mili-giây bấm nút",
                    en: "Wait for the Secretary of Science Crown Before the Millisecond You Click",
                  },
                  detail: {
                    vi: "Hệ thống chốt (snapshot) tổng % tốc độ ngay khi bấm nút Research; sau khi bấm xong có thể nhường lại chức vụ Secretary of Science mà không bị tăng lại thời gian.",
                    en: "The server snapshots your total % speed at the exact instant you tap Research; relinquishing the Secretary of Science title afterward will not revert the timer.",
                  },
                },
                {
                  kind: "dont",
                  label: {
                    vi: "Không xả Bình Tăng Tốc khi thanh Guild Help chưa đầy",
                    en: "Never Burn Speedups Before the Guild Help Bar Is Full",
                  },
                  detail: {
                    vi: "Luôn đợi thành viên Bang hội ấn đầy lượt trợ giúp miễn phí rồi mới xả bình Tăng tốc vào đúng khung giờ Thứ Ba Kỳ GAR/KvK (Arms Race Day 2: Tech & Runes).",
                    en: "Always wait for guildmates to max out your free Guild Help clicks before dumping speedups during GAR/KvK Tuesday (Arms Race Day 2: Tech & Runes).",
                  },
                },
              ],
            },
          ],
        },
        {
          id: "sub-4-3-dragon-essence-tech-cost-master-table",
          title: {
            vi: "4.3. Bảng Tra Cứu 17 Hàng Chi Phí Công Nghệ Tinh Chất Rồng (Dragon Essence Tech Cost — Season 1 & 2, Tab DE-Dust)",
            en: "4.3. 17-Row Dragon Essence Tech Cost Master Table (Season 1 & 2, Tab DE-Dust)",
          },
          blocks: [
            {
              type: "paragraph",
              text: {
                vi: "**Dữ liệu Chuẩn xác 100% (`Tab DE-Dust`)**: Trích xuất từ TopHeroes Tables (`Tab DE-Dust`) để quy hoạch `Dragon Essence` cho `Brilliance Institute`, `Faction Tech` và `Season 2 Tech`:",
                en: "**100% Verified Dataset (`Tab DE-Dust`)**: Extracted verbatim from TopHeroes Tables (`Tab DE-Dust`) to budget your `Dragon Essence` across the `Brilliance Institute`, `Faction Tech`, and `Season 2 Tech` trees:",
              },
            },
            {
              type: "table",
              caption: {
                vi: "Bảng 4.3: Bảng tra cứu 17 hàng chi phí Công nghệ Tinh Chất Rồng (Dragon Essence Tech Cost — Season 1 & 2, Tab DE-Dust)",
                en: "Table 4.3: 17-Row Dragon Essence (DE-Dust) Technology Cost Master Table (Season 1 & 2, Tab DE-Dust)",
              },
              headers: [
                {
                  vi: "Nhóm Công Nghệ",
                  en: "Tech Category",
                },
                {
                  vi: "Tên Nhánh Nghiên Cứu (Research Node)",
                  en: "Research Node Name",
                },
                {
                  vi: "Cấp Viện Huy Hoàng Yêu Cầu (BI Level)",
                  en: "Required Brilliance Institute (BI) Level",
                },
                {
                  vi: "Tổng Cấp Độ Node",
                  en: "Total Node Levels",
                },
                {
                  vi: "Tổng Chi Phí Tinh Chất Rồng (Total DE-Dust)",
                  en: "Total Dragon Essence Cost (Total DE-Dust)",
                },
                {
                  vi: "Ghi Chú Chiến Lược & Mốc Mở Khóa",
                  en: "Strategic Notes & Unlock Milestones",
                },
              ],
              rows: [
                [
                  {
                    vi: "Viện Huy Hoàng (Brilliance Institute)",
                    en: "Brilliance Institute",
                  },
                  {
                    vi: "Training Speed 1 (Tốc độ Luyện lính 1)",
                    en: "Training Speed 1",
                  },
                  {
                    vi: "BI Lv.1",
                    en: "BI Lv.1",
                  },
                  {
                    vi: "10 cấp",
                    en: "10 levels",
                  },
                  {
                    vi: "24 DE",
                    en: "24 DE",
                  },
                  {
                    vi: "Rẻ nhất, nâng vừa đủ mở đường xuống các nhánh dưới",
                    en: "Cheapest starter node; upgrade just enough to unlock deeper branches",
                  },
                ],
                [
                  {
                    vi: "Viện Huy Hoàng",
                    en: "Brilliance Institute",
                  },
                  {
                    vi: "Relic HP & Relic Attack (Máu & Công Thánh tích)",
                    en: "Relic HP & Relic Attack",
                  },
                  {
                    vi: "BI Lv.3",
                    en: "BI Lv.3",
                  },
                  {
                    vi: "10 cấp / nhánh",
                    en: "10 levels / branch",
                  },
                  {
                    vi: "197 DE × 2 = 394 DE",
                    en: "197 DE × 2 = 394 DE",
                  },
                  {
                    vi: "Tăng chỉ số cơ bản cho Thánh vật (Relics)",
                    en: "Increases base HP and Attack stats for Relics",
                  },
                ],
                [
                  {
                    vi: "Viện Huy Hoàng",
                    en: "Brilliance Institute",
                  },
                  {
                    vi: "Soldier Assault 1 & Soldier Defense 1",
                    en: "Soldier Assault 1 & Soldier Defense 1",
                  },
                  {
                    vi: "BI Lv.5",
                    en: "BI Lv.5",
                  },
                  {
                    vi: "10 cấp / nhánh",
                    en: "10 levels / branch",
                  },
                  {
                    vi: "292 DE × 2 = 584 DE",
                    en: "292 DE × 2 = 584 DE",
                  },
                  {
                    vi: "Điều kiện bắt buộc trên đường găng tiến xuống Lính T11",
                    en: "Mandatory prerequisite along the critical path to Tier 11 Troops",
                  },
                ],
                [
                  {
                    vi: "Viện Huy Hoàng",
                    en: "Brilliance Institute",
                  },
                  {
                    vi: "March Size (Quy mô Hành quân)",
                    en: "March Size",
                  },
                  {
                    vi: "BI Lv.5",
                    en: "BI Lv.5",
                  },
                  {
                    vi: "10 cấp",
                    en: "10 levels",
                  },
                  {
                    vi: "390 DE",
                    en: "390 DE",
                  },
                  {
                    vi: "Tăng trực tiếp lượng quân mang theo của đội hình",
                    en: "Directly increases troop dispatch capacity per march",
                  },
                ],
                [
                  {
                    vi: "Viện Huy Hoàng",
                    en: "Brilliance Institute",
                  },
                  {
                    vi: "Hero Level (Tier 1) (Mở trần Cấp Tướng 1)",
                    en: "Hero Level (Tier 1)",
                  },
                  {
                    vi: "BI Lv.7",
                    en: "BI Lv.7",
                  },
                  {
                    vi: "2 cấp (62 + 131)",
                    en: "2 levels (62 + 131)",
                  },
                  {
                    vi: "193 DE",
                    en: "193 DE",
                  },
                  {
                    vi: "Ưu tiên cực cao: Tăng giới hạn cấp độ Tướng vượt trần Lâu Đài",
                    en: "Ultra-high priority: Raises Hero level cap beyond the Castle limit",
                  },
                ],
                [
                  {
                    vi: "Viện Huy Hoàng",
                    en: "Brilliance Institute",
                  },
                  {
                    vi: "Soldier Capacity 1 & Training Mastery",
                    en: "Soldier Capacity 1 & Training Mastery",
                  },
                  {
                    vi: "BI Lv.9",
                    en: "BI Lv.9",
                  },
                  {
                    vi: "5 cấp / nhánh",
                    en: "5 levels / branch",
                  },
                  {
                    vi: "290 DE × 2 = 580 DE",
                    en: "290 DE × 2 = 580 DE",
                  },
                  {
                    vi: "Tăng sức chứa Doanh trại và hiệu suất huấn luyện binh lính",
                    en: "Expands Barracks troop capacity and training efficiency",
                  },
                ],
                [
                  {
                    vi: "Viện Huy Hoàng",
                    en: "Brilliance Institute",
                  },
                  {
                    vi: "Healing Speed (Tốc độ Chữa thương)",
                    en: "Healing Speed",
                  },
                  {
                    vi: "BI Lv.9",
                    en: "BI Lv.9",
                  },
                  {
                    vi: "5 cấp",
                    en: "5 levels",
                  },
                  {
                    vi: "482 DE",
                    en: "482 DE",
                  },
                  {
                    vi: "Phục vụ chiến sự liên server KvK và giảm thời gian hồi phục Bệnh viện",
                    en: "Supports cross-server KvK warfare and reduces Hospital recovery time",
                  },
                ],
                [
                  {
                    vi: "Viện Huy Hoàng",
                    en: "Brilliance Institute",
                  },
                  {
                    vi: "Hero Assault 1 & Hero Defense 1",
                    en: "Hero Assault 1 & Hero Defense 1",
                  },
                  {
                    vi: "BI Lv.11",
                    en: "BI Lv.11",
                  },
                  {
                    vi: "10 cấp / nhánh",
                    en: "10 levels / branch",
                  },
                  {
                    vi: "1,158 DE × 2 = 2,316 DE",
                    en: "1,158 DE × 2 = 2,316 DE",
                  },
                  {
                    vi: "Khối lượng DE lớn nhất trên đường găng trước mốc mở Lính T11",
                    en: "Largest DE resource wall along the critical path prior to T11 unlock",
                  },
                ],
                [
                  {
                    vi: "Viện Huy Hoàng",
                    en: "Brilliance Institute",
                  },
                  {
                    vi: "Healing Boost (Hiệu quả Chữa thương)",
                    en: "Healing Boost",
                  },
                  {
                    vi: "BI Lv.13",
                    en: "BI Lv.13",
                  },
                  {
                    vi: "5 cấp",
                    en: "5 levels",
                  },
                  {
                    vi: "770 DE",
                    en: "770 DE",
                  },
                  {
                    vi: "Nâng mức tối thiểu để mở đường xuống nhánh cuối BI Lv.15",
                    en: "Upgrade only to the minimum required prerequisite to reach BI Lv.15",
                  },
                ],
                [
                  {
                    vi: "Viện Huy Hoàng",
                    en: "Brilliance Institute",
                  },
                  {
                    vi: "Hero Assault 2 & Hero Defense 2",
                    en: "Hero Assault 2 & Hero Defense 2",
                  },
                  {
                    vi: "BI Lv.13",
                    en: "BI Lv.13",
                  },
                  {
                    vi: "10 cấp / nhánh",
                    en: "10 levels / branch",
                  },
                  {
                    vi: "1,444 DE × 2 = 2,888 DE",
                    en: "1,444 DE × 2 = 2,888 DE",
                  },
                  {
                    vi: "Nhánh sâu đắt đỏ dành cho Endgame Whale (nâng mức tối thiểu mở đường trước)",
                    en: "Expensive deep branch for Endgame Whales (unlock minimum prerequisites first)",
                  },
                ],
                [
                  {
                    vi: "Viện Huy Hoàng ★",
                    en: "Brilliance Institute ★",
                  },
                  {
                    vi: "Soldier Level (Tier 11 Troops Unlock)",
                    en: "Soldier Level (Tier 11 Troops Unlock)",
                  },
                  {
                    vi: "BI Lv.15",
                    en: "BI Lv.15",
                  },
                  {
                    vi: "1 cấp đột phá",
                    en: "1 breakthrough level",
                  },
                  {
                    vi: "288 DE (Tổng đường găng: 4,677 DE)",
                    en: "288 DE (Total critical path: 4,677 DE)",
                  },
                  {
                    vi: "MỤC TIÊU SỐ 1: Mở khóa Lính Bậc 11 (T11) với tổng đường găng nghiên cứu 4,677 DE!",
                    en: "#1 GOAL: Unlocks Tier 11 Troops (T11) with a total research critical path of 4,677 DE!",
                  },
                ],
                [
                  {
                    vi: "Viện Huy Hoàng",
                    en: "Brilliance Institute",
                  },
                  {
                    vi: "Hero Level (Tier 2) (Mở trần Cấp Tướng 2)",
                    en: "Hero Level (Tier 2)",
                  },
                  {
                    vi: "BI Lv.15",
                    en: "BI Lv.15",
                  },
                  {
                    vi: "3 cấp (189 + 321 + 642)",
                    en: "3 levels (189 + 321 + 642)",
                  },
                  {
                    vi: "1,152 DE",
                    en: "1,152 DE",
                  },
                  {
                    vi: "Mở giới hạn cấp độ Tướng kịch trần sau khi hoàn tất Lính T11",
                    en: "Unlocks the ultimate Hero level cap ceiling after securing T11 Troops",
                  },
                ],
                [
                  {
                    vi: "Công Nghệ Hệ (Faction Tech)",
                    en: "Faction Tech",
                  },
                  {
                    vi: "Soldier Attack 1/2/3 & Soldier HP 1/2/3",
                    en: "Soldier Attack 1/2/3 & Soldier HP 1/2/3",
                  },
                  {
                    vi: "Viện NC Lv.30+",
                    en: "Research Cottage Lv.30+",
                  },
                  {
                    vi: "5 – 10 cấp",
                    en: "5 – 10 levels",
                  },
                  {
                    vi: "41 + 117 + 303 = 461 DE / nhánh",
                    en: "41 + 117 + 303 = 461 DE / branch",
                  },
                  {
                    vi: "Chỉ nâng duy nhất cho Hệ chủ lực của Đội hình 1!",
                    en: "Upgrade EXCLUSIVELY for Queue 1's main faction!",
                  },
                ],
                [
                  {
                    vi: "Công Nghệ Hệ (Faction Tech)",
                    en: "Faction Tech",
                  },
                  {
                    vi: "Hero Attack 1/2/3 & Hero HP 1/2/3",
                    en: "Hero Attack 1/2/3 & Hero HP 1/2/3",
                  },
                  {
                    vi: "Viện NC Lv.30+",
                    en: "Research Cottage Lv.30+",
                  },
                  {
                    vi: "5 – 10 cấp",
                    en: "5 – 10 levels",
                  },
                  {
                    vi: "55 + 227 + 441 = 723 DE / nhánh",
                    en: "55 + 227 + 441 = 723 DE / branch",
                  },
                  {
                    vi: "Tăng mạnh % chỉ số Tướng thuộc Hệ chính của Đội 1",
                    en: "Major % stat multiplier for Heroes belonging to Queue 1's main faction",
                  },
                ],
                [
                  {
                    vi: "Công Nghệ Hệ (Faction Tech)",
                    en: "Faction Tech",
                  },
                  {
                    vi: "Damage / Reduction on Counter 1/2/3",
                    en: "Damage / Reduction on Counter 1/2/3",
                  },
                  {
                    vi: "Viện NC Lv.30+",
                    en: "Research Cottage Lv.30+",
                  },
                  {
                    vi: "5 cấp / bậc",
                    en: "5 levels / tier",
                  },
                  {
                    vi: "48 + 152 + 374 DE (Dmg)",
                    en: "48 + 152 + 374 DE (Dmg)",
                  },
                  {
                    vi: "Tăng sát thương gây ra và giảm sát thương nhận vào khi khắc chế hệ",
                    en: "Amplifies damage dealt and damage reduction when countering rival factions",
                  },
                ],
                [
                  {
                    vi: "Season 2 Tech",
                    en: "Season 2 Tech",
                  },
                  {
                    vi: "League / Horde / Nature Hero Level",
                    en: "League / Horde / Nature Hero Level",
                  },
                  {
                    vi: "Season 2",
                    en: "Season 2",
                  },
                  {
                    vi: "1 cấp",
                    en: "1 level",
                  },
                  {
                    vi: "13 DE / hệ",
                    en: "13 DE / faction",
                  },
                  {
                    vi: "Cộng thêm cấp độ trực tiếp cho Tướng từng hệ trong Season 2",
                    en: "Adds bonus Hero level cap per faction in Season 2",
                  },
                ],
                [
                  {
                    vi: "Season 2 Tech",
                    en: "Season 2 Tech",
                  },
                  {
                    vi: "Full Faction March Size (Tier 1 / 2 / 3)",
                    en: "Full Faction March Size (Tier 1 / 2 / 3)",
                  },
                  {
                    vi: "Season 2",
                    en: "Season 2",
                  },
                  {
                    vi: "3 – 10 cấp",
                    en: "3 – 10 levels",
                  },
                  {
                    vi: "61 + 175 + 441 DE / hệ",
                    en: "61 + 175 + 441 DE / faction",
                  },
                  {
                    vi: "Tăng mạnh quy mô hành quân khi đi thuần 6 tướng cùng hệ",
                    en: "Massive March Size boost when deploying a full 6-hero single-faction queue",
                  },
                ],
              ],
            },
            {
              type: "media_spotlight",
              mediaCode: "MED-8.3-04",
              tier: "tier4_youtube_ref",
              title: {
                vi: "Video Phân Tích Cây Nghiên Cứu Khoa Học, Lộ Trình 4,677 DE Mở Lính T11 & Kỹ Thuật Tank Baiting",
                en: "Video Guide: Research Cottage Tech Priority, 4,677 DE T11 Critical Path & Formation Tank Baiting",
              },
              description: {
                vi: "Video hướng dẫn trực quan thứ tự nâng cấp Arms Race Prep (Hộp Thứ 6), mẹo Pre-Click Snapshot với chức vụ Secretary of Science và cách xếp đội hình Formation Tank Baiting trong 3 giây đầu trận.",
                en: "Visual walkthrough covering Arms Race Prep (6th Chest) priority, the Pre-Click Snapshot combo with Secretary of Science, and 3-second Euclidean Formation Tank Baiting setups.",
              },
              videoChannel: "Top Heroes Official & Strategic Community Guides",
              videoTitle: "Top Heroes Research Tech Tree Tier List, Pre-Click Snapshot & PvP Formation Baiting Guide",
              videoTimestamp: "03:15 - 14:40",
              videoUrl: "https://www.youtube.com/results?search_query=top+heroes+research+tech+tree+guide+formation+baiting",
            },
          ],
        },
      ],
    },
    {
      id: "sec-5-lv25-research-queue-restructure-case-study",
      isPro: true,
      title: {
        vi: "5. Kịch bản Thực chiến Nâng cao: Tái Cơ Cấu 2 Hàng Đợi Nghiên Cứu Cho Tài Khoản Lâu Đài Lv.25 (Viện NC Lv.24)",
        en: "5. Advanced Tactical Case Study: Restructuring 2 Research Queues for a Castle Lv.25 (Research Cottage Lv.24) Account",
      },
      blocks: [
        {
          type: "case_study",
          badge: {
            vi: "CASE STUDY TÁI CƠ CẤU 2 HÀNG ĐỢI NGHIÊN CỨU (CASTLE LV.25)",
            en: "DUAL RESEARCH QUEUE RESTRUCTURE CASE STUDY (CASTLE LV.25)",
          },
          title: {
            vi: "Phẫu Thuật Tài Khoản Lâu Đài Lv.25 (Viện Nghiên Cứu Lv.24): Chấm Dứt Đầu Tư Dàn Trải & Bảo Toàn Kho Mồi Economy 24.8%",
            en: "Auditing a Castle Lv.25 (Research Cottage Lv.24) Account: Halting Fragmented Tech Upgrades & Preserving the 24.8% Economy Bait Bank",
          },
          profileSummary: {
            vi: "**Hồ sơ Kiểm toán**: Lâu Đài `Lv.25` (Viện NC `Lv.24`), có `2 Hàng đợi Nghiên cứu`.\n• **Tiến độ Dàn trải**: Tân Thủ (`95.3%`), Tăng Cường Đội 1 / `Combat Expertise` (`36.6%`), Phát Triển (`30.1%`), Kinh Tế (`24.8%`), Lính (`17.0%`) và Anh Hùng (`13.6%`).",
            en: "**Audit Profile**: Castle `Lv.25` (Research Cottage `Lv.24`) owning `2 Research Queues`.\n• **Fragmented Progress**: Beginner Combat (`95.3%`), Queue 1 Boost / `Combat Expertise` (`36.6%`), Development (`30.1%`), Economy (`24.8%`), Soldiers (`17.0%`), and Heroes (`13.6%`).",
          },
          diagnostics: [
            {
              vi: "**Chia nhỏ Thời gian Quá sớm**: Dù đã mở `Arms Race Prep` / `Commendation` từ Viện NC `Lv.20` và Tân Thủ ở `95.3%`, người chơi lại rải điểm sang Lính (`17.0%`) và Anh Hùng (`13.6%`).\n• **Hệ quả**: Khiến cả `Arms Race Prep` lẫn Tăng Cường Đội 1 (`36.6%`) đều dở dang, mất trắng `+200%` lợi tức rương GAR.",
              en: "**Premature Fragmentation**: Despite unlocking `Arms Race Prep` / `Commendation` at `Lv.20` while Beginner sits at `95.3%`, queues were diverted into Soldiers (`17.0%`) and Heroes (`13.6%`).\n• **Consequence**: Both `Arms Race Prep` and Queue 1 Boost (`36.6%`) remain stalled, forfeiting `+200%` GAR chest yields.",
            },
            {
              vi: "**Nguy cơ Cạn kiệt Kho Mồi**: Nhánh Phát Triển đang ở `30.1%` và Kinh Tế (`Economy`) đang ở đúng ngưỡng vàng `24.8%`.\n• **Hệ quả**: Nếu tiếp tục bấm nâng tự do vào ngày thường, tài khoản sẽ mất sạch các node ngắn `10–20 phút` phục vụ Guild Race (Thi Đấu Hội) và Thứ Ba GAR (GAR/KvK).",
              en: "**Event Bait Depletion Risk**: Development sits at `30.1%` while `Economy` is right at the golden `24.8%` threshold.\n• **Consequence**: Continuing to tap `Economy` nodes on normal days wipes out the `10–20m` nodes needed for Guild Race and GAR/KvK Tuesday GAR.",
            },
          ],
          metrics: [
            {
              label: {
                vi: "Nhánh Arms Race Prep & Tăng Cường Đội 1 (Queue 1 Boost)",
                en: "Arms Race Prep & Queue 1 Boost (Combat Expertise)",
              },
              before: {
                vi: "Tân Thủ 95.3%, Tăng Cường Đội 1 dở dang ở 36.6%, chưa mở Hộp Thứ 6 Extra Rewards",
                en: "Beginner 95.3%, Queue 1 Boost stalled at 36.6%, 6th Chest Extra Rewards locked",
              },
              after: {
                vi: "Hoàn tất 100% Tân Thủ, mở Hộp Thứ 6 Arms Race Prep (+200% rương) ➔ đẩy Queue 1 Boost từ 36.6% lên 100%",
                en: "100% Beginner, unlocked Arms Race Prep 6th Chest (+200% chests) ➔ pushed Queue 1 Boost from 36.6% to 100%",
              },
              delta: {
                vi: "+200% Lợi tức Rương GAR & Max March Size Đội 1",
                en: "+200% GAR Chest Yield & Max Queue 1 March Size",
              },
            },
            {
              label: {
                vi: "Nhánh Phát Triển (Development) & Lính / Anh Hùng",
                en: "Development Branch & Soldiers / Heroes",
              },
              before: {
                vi: "Phát Triển 30.1%, Lính 17.0%, Anh Hùng 13.6% (nâng dàn trải không theo điểm gãy)",
                en: "Development 30.1%, Soldiers 17.0%, Heroes 13.6% (unfocused upgrades)",
              },
              after: {
                vi: "Đóng băng tạm thời Lính (17.0%) & Anh Hùng (13.6%); Hàng đợi 2 đẩy Phát Triển từ 30.1% lấy trọn node giảm thời gian",
                en: "Temporarily freeze Soldiers (17.0%) & Heroes (13.6%); Queue 2 pushes Development from 30.1% to max speed nodes",
              },
              delta: {
                vi: "Tối đa hóa Lãi kép Thời gian Xây dựng & Nghiên cứu",
                en: "Maximized Compounding Construction & Research Speed",
              },
            },
            {
              label: {
                vi: "Nhánh Kinh Tế (Economy Bait Bank)",
                en: "Economy Branch (Event Bait Bank)",
              },
              before: {
                vi: "Đang ở 24.8% (có nguy cơ bị bấm hết vào ngày thường)",
                en: "Sitting at 24.8% (at risk of being cleared on non-event days)",
              },
              after: {
                vi: "Đóng băng chiến thuật ở 24.8% vào ngày thường; chỉ bấm node 10–20 phút vào Thứ Ba Kỳ GAR/KvK (10:00–14:00 UTC / 17:00–21:00 Giờ VN) & Guild Race",
                en: "Tactically frozen at 24.8% on normal days; 10–20m nodes tapped only during GAR/KvK Tuesday (10:00–14:00 UTC) & Guild Race",
              },
              delta: {
                vi: "Hoàn thành 100% Nhiệm vụ Vàng nghiên cứu với < 1h tăng tốc",
                en: "100% Golden Research Task completion using < 1h speedups",
              },
            },
          ],
          recoverySteps: [
            {
              stepNumber: "1",
              title: {
                vi: "Hàng Đợi 1 (Cố Định 100%): Đột Phá Hộp Thứ 6 Arms Race Prep ➔ Đẩy Tăng Cường Đội 1 Từ 36.6% Lên 100%",
                en: "Queue 1 (100% Fixed): Rush Arms Race Prep 6th Chest ➔ Push Queue 1 Boost From 36.6% to 100%",
              },
              detail: {
                vi: "**Đột phá Hộp Thứ 6**: Hoàn tất nốt `4.7%` nhánh Tân Thủ (`95.3% ➔ 100%`), rồi dồn `100%` Hàng đợi 1 đẩy `Arms Race Prep` / `Commendation` mở Hộp Thứ 6 (`Extra Rewards` / `Double Rewards`).\n• **Tối đa Đội 1**: Ngay khi mở xong Hộp Thứ 6, quay lại đẩy nhánh Tăng Cường Đội 1 (`Queue 1 Boost` / `Combat Expertise`) từ `36.6%` lên thẳng `100%` lấy tối đa March Size.",
                en: "**6th Chest Breakthrough**: Finish the last `4.7%` of Beginner Combat (`95.3% ➔ 100%`), then dedicate Queue 1 to `Arms Race Prep` / `Commendation` to unlock the 6th Chest (`Extra Rewards` / `Double Rewards`).\n• **Max Queue 1**: Once unlocked, return to `Queue 1 Boost` / `Combat Expertise` and push it from `36.6%` straight to `100%` for maximum March Size.",
              },
              impactBadge: {
                vi: "Hàng Đợi 1 Chủ Lực",
                en: "Primary Queue 1",
              },
            },
            {
              stepNumber: "2",
              title: {
                vi: "Hàng Đợi 2 (Lãi Kép Thời Gian): Quét Nhánh Phát Triển (Development) Từ 30.1% & Đóng Băng Lính (17.0%) / Anh Hùng (13.6%)",
                en: "Queue 2 (Time Compounding): Sweep Development From 30.1% & Freeze Soldiers (17.0%) / Heroes (13.6%)",
              },
              detail: {
                vi: "**Đóng băng Nhánh Phụ**: Tạm dừng hoàn toàn việc rải điểm vào nhánh Lính (`17.0%`) và Anh Hùng (`13.6%`).\n• **Tối ưu Tốc độ**: Cho Hàng đợi 2 chạy dọc nhánh Phát Triển (`Development`) từ `30.1%`, chỉ bấm các node `Construction Speed`, `Research Speed` và `Tool Improvement -5%` kèm `Pre-Click Snapshot`.",
                en: "**Freeze Sub-Branches**: Immediately halt all scattered upgrades in Soldiers (`17.0%`) and Heroes (`13.6%`).\n• **Speed Optimization**: Run Queue 2 along `Development` from `30.1%`, tapping exclusively `Construction Speed`, `Research Speed`, and `Tool Improvement -5%` while applying `Pre-Click Snapshot`.",
              },
              impactBadge: {
                vi: "Hàng Đợi 2 Tốc Độ",
                en: "Speed Queue 2",
              },
            },
            {
              stepNumber: "3",
              title: {
                vi: "Kỷ Luật Đóng Băng Chiến Thuật Nhánh Kinh Tế (24.8%) Cho Khung Giờ Vàng 10:00 – 14:00 UTC (17:00 – 21:00 Giờ VN) Thứ Ba Kỳ GAR/KvK",
                en: "Tactical Freeze on Economy (24.8%) Reserved for GAR/KvK Tuesday 10:00 – 14:00 UTC & Guild Race",
              },
              detail: {
                vi: "**Khóa Chặt Ngưỡng 24.8%**: Giữ nguyên nhánh Kinh Tế (`Economy`) ở đúng mức `24.8%` vào ngày thường.\n• **Xả Đúng Giờ Vàng**: Bảo toàn các node `10–20 phút` cho khung `10:00 – 14:00 UTC (17:00 – 21:00 Giờ VN)` Thứ Ba Kỳ GAR/KvK (`Arms Race Day 2`) và Nhiệm vụ Vàng đếm số lần nghiên cứu của `Guild Race`!",
                en: "**Lock the 24.8% Threshold**: Freeze the `Economy` branch strictly at `24.8%` on non-event days.\n• **Golden Window Execution**: Preserve all `10–20m` nodes exclusively for `10:00 – 14:00 UTC` on GAR/KvK Tuesday (`Arms Race Day 2`) and frequency-based Golden Tasks in `Guild Race`!",
              },
              impactBadge: {
                vi: "Bảo Toàn Kho Mồi 24.8%",
                en: "24.8% Bait Preserved",
              },
            },
          ],
          conclusion: {
            vi: "**Kết quả Tái cơ cấu**: Sau 2 chu kỳ Thi Đấu Hội – GAR/KvK từ trạng thái dàn trải (Tân Thủ `95.3%`, Đội 1 `36.6%`, Phát Triển `30.1%`, Kinh Tế `24.8%`, Lính `17.0%`, Anh Hùng `13.6%`).\n• **Thành tựu Đột phá**: Mở khóa thành công Hộp Thứ 6 `Arms Race Prep` (`+200%` rương GAR), hoàn tất `100%` `Queue 1 Boost` và tiết kiệm hàng trăm giờ tăng tốc nhờ `Pre-Click Snapshot`.",
            en: "**Restructure Outcome**: Within two Guild Race – GAR/KvK cycles from a fragmented state (Beginner `95.3%`, Queue 1 `36.6%`, Development `30.1%`, Economy `24.8%`, Soldiers `17.0%`, Heroes `13.6%`).\n• **Breakthrough Gains**: Unlocked the `Arms Race Prep` 6th Chest (`+200%` GAR chests), completed `100%` `Queue 1 Boost`, and saved hundreds of speedup hours via `Pre-Click Snapshot`.",
          },
        },
      ],
    },
  ],
};

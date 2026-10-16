import type { GuideArticle } from "../../types";

export const ARTICLE_8_3_RESEARCH_AND_BAITING: GuideArticle = {
  code: "8.3",
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
      vi: "Ngay khi Viện Nghiên Cứu (Research Cottage) đạt Lv.20, dồn 100% tài nguyên vào nhánh Arms Race Prep / Commendation (Chuẩn Bị Chạy Đua Vũ Trang) để mở khóa Hộp Phần Thưởng Thứ 6 (Extra Rewards / Double Rewards — nhân đôi phần thưởng rương GAR +200%), song song với việc đẩy nhánh Queue 1 Boost / Combat Expertise (Tăng Cường Đội 1) đạt 100%.",
      en: "The moment your Research Cottage hits Lv.20, funnel 100% of resources into the Arms Race Prep / Commendation tree to unlock the 6th Reward Box (Extra Rewards / Double Rewards—doubling GAR chest yields by +200%), in parallel with pushing Queue 1 Boost / Combat Expertise to 100%.",
    },
    immediateAction: {
      vi: "Giữ nguyên các nốt nghiên cứu ngắn (5–30 phút) của nhánh Economy (Kinh Tế) ở mức ~20%–25% làm 'Kho Mồi Sự Kiện' ăn Nhiệm vụ Vàng Guild Race (Tuần A) hoặc rướn rương Thứ Ba Arms Race (Tuần B); đồng thời luôn thực hiện Quy trình 4 Bước Pre-Click Snapshot (Brawler/Knight 12★ +30% + Shaman/Hostess +40% + Dân làng +3.20% + Chức vụ Secretary of Science) TRƯỚC mili-giây bấm nút Research!",
      en: "Freeze short 5–30 minute nodes in the Economy branch at ~20%–25% as an 'Event Bait Bank' for Week A Guild Race Golden Tasks and Week B Tuesday Arms Race chest thresholds; and always execute the 4-Step Pre-Click Snapshot (12★ Brawler/Knight +30% + Shaman/Hostess +40% + Villagers +3.20% + Secretary of Science title) BEFORE the millisecond you tap Research!",
    },
    strictTaboo: {
      vi: "Tuyệt đối ĐÓNG BĂNG các nhánh công nghệ ngốn tài nguyên khổng lồ cuối game như S1 Battle, Peacekeeper hay Queue 2 & 3 Boost khi chưa mở xong Hộp Thứ 6 của Arms Race Prep và chưa hoàn tất 100% Queue 1 Boost; cấm bấm nâng sạch 100% nhánh Economy vào ngày thường!",
      en: "Strictly FREEZE resource-draining endgame branches like S1 Battle, Peacekeeper, or Queue 2 & 3 Boost until you have unlocked the 6th Chest in Arms Race Prep and completed 100% of Queue 1 Boost; never clear out 100% of short Economy nodes on normal days!",
    },
  },
  keyTakeaways: [
    {
      vi: "Thứ tự 5 Tầng Cây Nghiên Cứu & Kho Mồi Economy: (1) Số 1 Tuyệt đối là Arms Race Prep / Commendation (mở Hộp Thứ 6 Extra Rewards / Double Rewards tăng 200% lợi tức rương GAR); (2) Số 2 là Queue 1 Boost / Combat Expertise (100% mở March Size & nhánh sau); (3) Số 3 là Growth / Development & Economy (chỉ lấy node giảm thời gian Xây dựng/Nghiên cứu & Tool Improvement -5%, giữ nhánh Economy ở ~20%–25% làm mồi 5–30 phút); (4) Số 4 là Soldiers & Heroes + Season Tech (chỉ số Season Tech giữ lại vĩnh viễn); (5) Đóng băng S1 Battle / Peacekeeper / Queue 2 & 3 Boost.",
      en: "5-Tier Tech Priority & Economy Bait Bank: (1) #1 Absolute Priority is Arms Race Prep / Commendation (unlocking the 6th Box Extra Rewards / Double Rewards for +200% GAR chest returns); (2) #2 is Queue 1 Boost / Combat Expertise (100% for March Size & deeper trees); (3) #3 is Growth / Development & Economy (take only Construction/Research speed & Tool Improvement -5%, freezing Economy at ~20%–25% as 5–30m quest bait); (4) #4 is Soldiers & Heroes + Season Tech (Season Tech combat stats persist permanently after season end); (5) Freeze S1 Battle / Peacekeeper / Queue 2 & 3 Boost.",
    },
    {
      vi: "Kỹ thuật Thực chiến 'Mồi Nhử Phá Tuyến Địch (Formation Tank Baiting)' trong 3 Giây Đầu Trận (0.0s ➔ 3.5s+): Lợi dụng cơ chế AI khóa mục tiêu theo khoảng cách hình học gần nhất (Euclidean Distance) từ giây 0.0s–3.0s để đặt Off-Tank / Summoner (Desert Prince, đệ Tidecaller/Forest Maiden/Treeguard, Adjudicator) lệch trục hút cả 2 Tanker địch chéo sang một bên cánh, mở hành lang trống (Open Chokepoint) cho Hyper-Carry (Wukong, Storm Maiden, Paragon, Pyromancer, Ne Zha, Pixie) đột kích thẳng vào Mid/Backline địch!",
      en: "3-Second 'Formation Tank Baiting' Combat Technique (0.0s ➔ 3.5s+): Exploit the 0.0s–3.0s AI targeting window—which locks onto the nearest Euclidean Distance unit—by placing an asymmetric Off-Tank or Summoner (Desert Prince, Tidecaller/Forest Maiden/Treeguard summons, Adjudicator) on the opposite flank to pull both enemy Tankers diagonally, opening an unobstructed Open Chokepoint for your Hyper-Carry (Wukong, Storm Maiden, Paragon, Pyromancer, Ne Zha, Pixie) to assassinate the enemy Mid/Backline!",
    },
    {
      vi: "Công thức Pre-Click Snapshot & Bảng 17 Hàng Chi Phí Tinh Chất Rồng (DE-Dust Tech Cost — Tab ♾️DE-Dust): Chốt toàn bộ buff tốc độ (Brawler/Knight 12★ +30%, Shaman/Hostess +40%, Villagers +3.20% & 432s, chức vụ Secretary of Science) trước giây bấm nút để cắt giảm 40%–60% thời gian gốc. Trong Viện Huy Hoàng (Brilliance Institute), lộ trình mở khóa Lính Bậc 11 (Soldier Level ở BI Lv.15 tốn 288 DE) cần tổng đường găng 4,677 DE (Training Speed 1: 24 DE, Relic HP/ATK: 394 DE, Soldier Assault/Defense 1: 584 DE, March Size: 390 DE, Hero Level Tier 1: 193 DE, Soldier Capacity/Mastery: 580 DE, Healing Speed: 482 DE, Hero Assault/Defense 1: 2,316 DE, Healing Boost: 770 DE, Hero Assault/Defense 2: 2,888 DE, Hero Level Tier 2: 1,152 DE; cộng Faction Tech 461 DE / 723 DE và Season 2 Tech 13 DE / 61+175+441 DE).",
      en: "Pre-Click Snapshot Formula & 17-Row Dragon Essence Tech Cost Table (Tab ♾️DE-Dust): Lock in all speed buffs (12★ Brawler/Knight +30%, Shaman/Hostess +40%, Villagers +3.20% & 432s, Secretary of Science title) prior to clicking Research to slash 40%–60% off base duration. Inside the Brilliance Institute, unlocking Tier 11 Troops (Soldier Level at BI Lv.15 costing 288 DE) requires a 4,677 DE critical path (Training Speed 1: 24 DE, Relic HP/ATK: 394 DE, Soldier Assault/Defense 1: 584 DE, March Size: 390 DE, Hero Level Tier 1: 193 DE, Soldier Capacity/Mastery: 580 DE, Healing Speed: 482 DE, Hero Assault/Defense 1: 2,316 DE, Healing Boost: 770 DE, Hero Assault/Defense 2: 2,888 DE, Hero Level Tier 2: 1,152 DE; plus Faction Tech 461 DE / 723 DE and Season 2 Tech 13 DE / 61+175+441 DE).",
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
            vi: "Nếu cấp độ Lâu Đài (Castle) là 'phần xác' quyết định trần cấp độ anh hùng và doanh trại, thì Viện Nghiên Cứu (Research Cottage) chính là 'phần hồn' quyết định tốc độ sinh lời tài nguyên và sức mạnh thực chiến ẩn của toàn tài khoản. Ngay sau khi hoàn thành nhánh nhập môn Hoàn Thành Tân Thủ (Beginner Combat — 100%), người chơi sẽ đứng trước hơn 7 nhánh công nghệ lớn. Việc phân bổ sai thứ tự ưu tiên sẽ khiến tài khoản thất thoát hàng chục ngàn Kim Cương và Mảnh Tướng Vàng Vạn Năng mỗi tháng.",
            en: "If your Castle level represents the structural shell governing hero and barracks level caps, the Research Cottage is the economic engine and hidden combat core of your entire account. Immediately after completing the introductory Beginner Combat tree (100%), commanders face 7+ major technology branches. Investing in the wrong sequence will cost you tens of thousands of Diamonds and Universal Legendary Hero Shards every single month.",
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
                    vi: "🥇 SỐ 1 TUYỆT ĐỐI",
                    en: "🥇 #1 ABSOLUTE PRIORITY",
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
                    vi: "🥈 SỐ 2",
                    en: "🥈 #2 PRIORITY",
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
                    vi: "🥉 SỐ 3",
                    en: "🥉 #3 PRIORITY",
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
                    vi: "🏅 SỐ 4",
                    en: "🏅 #4 PRIORITY",
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
                    vi: "❄️ ĐÓNG BĂNG",
                    en: "❄️ STRICT FREEZE",
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
            vi: "Để tối đa hóa tốc độ mở khóa công nghệ mà không bị kẹt nhiệm vụ trong các sự kiện bi-weekly (Tuần A Guild Race và Tuần B Guild Arms Race), người chơi cần thiết lập kỷ luật phân luồng 2 Hàng đợi Nghiên cứu, bảo tồn kho mồi Economy và định hướng đúng nhánh quân sự theo Hệ chủ lực.",
            en: "To maximize tech progression without getting locked out of bi-weekly event tasks (Week A Guild Race and Week B Guild Arms Race), commanders must enforce strict dual-queue routing, preserve the Economy bait bank, and align military research with their main faction.",
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
                vi: "Nếu tài khoản sở hữu 2 Hàng đợi Nghiên cứu (1 hàng đợi mặc định + 1 hàng đợi mở khóa qua gói Second Tech Queue $9.99 USD hoặc đặc quyền), hãy phân luồng cố định cho từng hàng đợi thay vì bấm ngẫu nhiên:",
                en: "If your account owns 2 Research Queues (1 default queue + 1 unlocked via the $9.99 USD Second Tech Queue pack or privilege), assign fixed roles to each queue rather than starting upgrades randomly:",
              },
            },
            {
              type: "list",
              ordered: false,
              items: [
                {
                  vi: "🔬 Hàng Đợi Nghiên Cứu 1 (Main Tech Queue): Cắm cố định vào các dự án dài hạn có thời gian chờ lớn (Arms Race Prep / Commendation ➔ Queue 1 Boost / Combat Expertise ➔ Soldiers / Season Tech). Chỉ bấm thu hoạch và xả bình Tăng tốc Nghiên cứu vào Thứ Ba Tuần B (Arms Race Day 2: Tech & Runes) hoặc khi vừa nhận Nhiệm vụ Vàng trong Tuần A (Guild Race).",
                  en: "🔬 Research Queue 1 (Main Tech Queue): Dedicate permanently to long-duration critical path projects (Arms Race Prep / Commendation ➔ Queue 1 Boost / Combat Expertise ➔ Soldiers / Season Tech). Only collect completions and burn Research Speedups on Week B Tuesday (Arms Race Day 2: Tech & Runes) or when holding an active Golden Task in Week A (Guild Race).",
                },
                {
                  vi: "🔬 Hàng Đợi Nghiên Cứu 2 (Support / Speed Queue): Cắm vào nhánh Development / Growth (ưu tiên tối đa các node giảm thời gian Xây dựng Construction Speed, Nghiên cứu Research Speed và Tool Improvement -5%) ở giai đoạn đầu, sau đó hỗ trợ quét nốt các node điều kiện của Arms Race Prep và Heroes.",
                  en: "🔬 Research Queue 2 (Support / Speed Queue): Dedicate to the Development / Growth branch early on (maxing Construction Speed, Research Speed, and Tool Improvement -5%), then use it to clear prerequisite nodes in Arms Race Prep and Heroes.",
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
                vi: "Tại sao trong mọi hồ sơ kiểm toán tài khoản chuẩn v2.0, nhánh Economy (Kinh Tế) luôn được khuyên dừng ở mức ~20%–25% (ví dụ 24.8%) và TUYỆT ĐỐI KHÔNG ấn nâng cấp vào ngày thường?",
                en: "Why does every standardized v2.0 account audit recommend freezing the Economy branch at ~20%–25% (e.g., 24.8%) and NEVER tapping upgrades on normal days?",
              },
            },
            {
              type: "list",
              ordered: false,
              items: [
                {
                  vi: "Kho dự trữ node ngắn hạn: Nhánh Economy chứa hàng chục node nghiên cứu bậc thấp (1/5, 2/5) chỉ mất từ 5 phút đến 30 phút cho mỗi lần nâng cấp.",
                  en: "Short-Node Reserve Bank: The Economy branch contains dozens of low-tier research nodes (1/5, 2/5) that take only 5 minutes to 30 minutes per upgrade.",
                },
                {
                  vi: "Ứng dụng 1 — Trong Tuần A (Thi Đấu Hội / Guild Race): Khi xoay ra Nhiệm vụ Vàng yêu cầu 'Hoàn thành X lần nghiên cứu công nghệ' (tính theo số lần hoàn thành chứ không tính theo điểm lực chiến), người chơi chỉ việc bấm liên tiếp 4–6 node ngắn của nhánh Economy là lấy trọn điểm Nhiệm vụ Vàng mà tốn chưa tới 1 giờ tăng tốc!",
                  en: "Application 1 — During Week A (Guild Race): When you roll a Golden Task requiring 'Complete X technology researches' (counted by completion frequency rather than power gained), simply tap 4–6 short Economy nodes back-to-back to claim full Golden Task points using less than 1 hour of speedups!",
                },
                {
                  vi: "Ứng dụng 2 — Trong Tuần B (GAR Thứ Ba): Khi còn thiếu một lượng điểm nhỏ để chạm mốc rương thưởng cuối ngày nhưng các dự án ở nhánh chính đều mất 48 giờ, việc bấm các node Economy ngắn giúp rướn qua vạch đích tức thì với chi phí tiết kiệm nhất.",
                  en: "Application 2 — During Week B (Tuesday GAR): When you are slightly short of the final daily chest threshold while your main queues are locked in 48-hour projects, tapping short Economy nodes pushes you across the finish line instantly at minimal cost.",
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
                  vi: "🔴 Người chơi Hệ Bộ Lạc (Horde — hoặc Chuyển giao Liên Minh ➔ Bộ Lạc): Từ Tuần 4 trở đi, dồn 100% điểm nghiên cứu hệ vào các node Tăng Công/Máu Lính Bộ Lạc (Horde Soldier ATK/HP), Tăng Công/Máu Tướng Bộ Lạc (Horde Hero ATK/HP) và Quy mô Hành quân Bộ Lạc (Full Horde March Size).",
                  en: "🔴 Horde Commanders (or League ➔ Horde Pivot): From Week 4 onward, funnel 100% of faction research into Horde Soldier ATK/HP, Horde Hero ATK/HP, and Full Horde March Size.",
                },
                {
                  vi: "🔵 Người chơi Hệ Liên Minh (League): Tập trung tối đa vào nhánh League Soldier / Hero và các node tăng sát thương khắc chế (Damage on Counter).",
                  en: "🔵 League Commanders: Focus exclusively on League Soldier / Hero nodes and Damage on Counter multipliers.",
                },
                {
                  vi: "🟢 Người chơi Hệ Thiên Nhiên (Nature): Ưu tiên tối đa các node tăng HP Lính Thiên Nhiên (Nature Soldier HP), Giảm sát thương nhận vào khi khắc chế (Damage Reduction on Counter) và Full Nature March Size để nuôi sống dàn triệu hồi của Tidecaller, Forest Maiden và Treeguard.",
                  en: "🟢 Nature Commanders: Prioritize Nature Soldier HP, Damage Reduction on Counter, and Full Nature March Size to sustain the summon frontline of Tidecaller, Forest Maiden, and Treeguard.",
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
                vi: "4 nguyên tắc kiểm tra bắt buộc trước mỗi kỳ xả Tăng tốc Nghiên cứu Thứ Ba Tuần B và trước khi xếp đội hình PvP/Boss:",
                en: "4 mandatory verification steps before every Week B Tuesday Research Speedup dump and before setting PvP/Boss formations:",
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
                    vi: "Tuyệt đối không bấm các node tăng sản lượng Gỗ/Đá/Thịt ngắn hạn vào ngày thường; để dành ăn Nhiệm vụ Vàng Guild Race (Tuần A) hoặc rướn rương Thứ Ba GAR (Tuần B).",
                    en: "Never tap short Wood/Stone/Meat yield nodes on normal days; save them for Week A Guild Race Golden Tasks or Week B Tuesday GAR chest thresholds.",
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
                    en: "Place Desert Prince, Tidecaller summons, or Adjudicator asymmetrically to pull both enemy Tankers to one side, opening a chokepoint for Wukong, Storm Maiden, Paragon, Pyromancer, Ne Zha, or Pixie to assassinate the backline.",
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
              vi: "❌ Sai Lầm Phổ Biến (Account Traps)",
              en: "❌ Common Account Traps",
            },
            {
              vi: "✅ Giải Pháp Tối Ưu (Min-Max Solution)",
              en: "✅ Min-Max Solution",
            },
          ],
          rows: [
            [
              {
                vi: "Bấm nâng sạch 100% nhánh Economy (Kinh Tế) trong 2 tuần đầu vì thấy thời gian ngắn: Đến khi vào kỳ Guild Race (Tuần A), toàn bộ các nhánh còn lại đều mất 15–30 giờ/lần, khiến người chơi không thể hoàn thành các Nhiệm vụ Vàng yêu cầu 'Hoàn thành số lần nghiên cứu'.",
                en: "Clearing 100% of the Economy branch in the first 2 weeks just because timers are short: Once Week A Guild Race arrives, every remaining tech node takes 15–30 hours per upgrade, making 'Complete X research upgrades' Golden Tasks impossible without burning massive speedups.",
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
            vi: "Ở phân tầng PRO, sự khác biệt giữa một người chơi thông thường và một chiến lược gia Min-Max nằm ở 3 kỹ năng định lượng: (1) Thao túng thuật toán tìm đường Euclidean Distance trong 3 giây đầu trận bằng Formation Tank Baiting để thắng các đối thủ hơn 20%–30% lực chiến; (2) Chốt công thức Pre-Click Snapshot cắt giảm 40%–60% thời gian nghiên cứu gốc; và (3) Quy hoạch chính xác từng giọt Tinh Chất Rồng (Dragon Essence — tổng đường găng 4,677 DE trong Viện Huy Hoàng để mở khóa Lính Bậc 11).",
            en: "In the PRO tier, the gap between an average player and a Min-Max strategist comes down to 3 quantitative skills: (1) Manipulating the 3-second Euclidean Distance pathfinding algorithm via Formation Tank Baiting to defeat opponents 20%–30% higher in power; (2) Locking in the Pre-Click Snapshot formula to slash 40%–60% off base research timers; and (3) Budgeting every single drop of Dragon Essence (4,677 DE critical path inside the Brilliance Institute to unlock Tier 11 Troops).",
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
                vi: "Trong các trận giao tranh PvP Đấu Trường (Arena) hoặc khi leo Ải Boss có lực chiến cao hơn 20%–30%, nếu xếp đội hình đối xứng truyền thống (2 Tanker đứng thẳng hàng với 2 Tanker địch), toàn bộ sát thương đầu trận sẽ bị hút sạch vào lớp khiên bất tử của Tanker đối phương (như Adjudicator, Rose Princess, Desert Prince, Monk). Khi trận đấu bắt đầu (00:00 ➔ 00:03), toàn bộ tướng và binh lính của cả hai bên sẽ tiến về phía trước và khóa mục tiêu vào đơn vị kẻ địch có khoảng cách hình học (Euclidean Distance) gần nhất tại thời điểm tiếp xúc. Kỹ thuật Formation Tank Baiting lợi dụng chính quy luật này để kéo lệch Tanker chủ lực của địch ra khỏi hành lang bảo vệ:",
                en: "In Arena PvP matches or Boss stages where the enemy exceeds your power by 20%–30%, deploying a traditional symmetric formation (2 Tankers directly facing 2 enemy Tankers) causes all of your opening burst damage to be absorbed by enemy Tanker invulnerability shields (such as Adjudicator, Rose Princess, Desert Prince, or Monk). During the First 3-Second AI Targeting Window (00:00 ➔ 00:03), all heroes and soldiers advance and lock onto the enemy unit with the shortest geometric Euclidean Distance upon contact. Formation Tank Baiting exploits this exact rule to pull the enemy's main Tankers away from their protective lane:",
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
                  vi: "⚔️ KỸ THUẬT MỒI NHỬ PHÁ TUYẾN ĐỊCH (FORMATION TANK BAITING)",
                  en: "⚔️ FORMATION TANK BAITING (EUCLIDEAN AI PATHING PULL)",
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
                    vi: "⏱️ Giây 0.0s: Bố Trí Lệch Trục (Asymmetric Setup)",
                    en: "⏱️ Second 0.0s: Asymmetric Frontline Setup",
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
                    vi: "⏱️ Giây 1.5s – 3.0s: Kéo Lệch Tuyến Địch (Euclidean AI Pathing Pull)",
                    en: "⏱️ Second 1.5s – 3.0s: Euclidean AI Pathing Pull & Open Chokepoint",
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
                        vi: "🔥 Lộ Khoảng Trống Hành Lang Tấn Công (Unobstructed Lane)",
                        en: "🔥 Unobstructed Attack Corridor Opens on Opposite Flank",
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
                    vi: "⏱️ Giây 3.5s+: Đột Kích Hàng Sau (Backline Assassination)",
                    en: "⏱️ Second 3.5s+: Mid & Backline Assassination",
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
                  vi: "Với Đội hình Bộ Lạc (Horde): Đặt Desert Prince (có cơ chế bất tử tạm thời và lao lên rất nhanh) ở cánh đối diện với DPS địch làm Mồi Nhử, còn cánh cùng phía với DPS địch thì kẹp Beastmaster + Wukong / Storm Maiden. Khi Desert Prince lao lên hút cả 2 mục tiêu tiền tuyến của địch quay mặt sang một bên, Wukong và Storm Maiden sẽ lập tức xuyên qua khe hở để kết liễu Pháp sư/Healer hàng sau của đối thủ.",
                  en: "For Horde Formations: Place Desert Prince (whose rapid charge and temporary invulnerability make him the ultimate bait) on the flank opposite the enemy DPS, while stacking Beastmaster + Wukong / Storm Maiden on the same side as the enemy DPS. As Desert Prince pulls both enemy frontline units sideways, Wukong and Storm Maiden slip through the gap to execute enemy backline Mages and Healers.",
                },
                {
                  vi: "Với Đội hình Thiên Nhiên (Nature): Tận dụng các đơn vị triệu hồi của Tidecaller, Forest Maiden hoặc Treeguard ở một bên cánh làm bia đỡ đạn thu hút chiêu cuối đầu tiên của địch, giúp Ne Zha hoặc Pixie ở cánh đối diện thoải mái xả sát thương.",
                  en: "For Nature Formations: Use summoned units from Tidecaller, Forest Maiden, or Treeguard on one flank as sacrificial bait to absorb the enemy's opening ultimate skills, leaving Ne Zha or Pixie on the opposite flank free to unleash uninterrupted burst damage.",
                },
                {
                  vi: "Với Đội hình Liên Minh (League): Đặt Adjudicator lệch sang cánh có sát thương vật lý mạnh của địch, đồng thời xếp Rose Princess + Paragon / Pyromancer dồn hỏa lực diện rộng (AOE) vào đúng góc mà 2 Tanker địch bị gom cụm lại.",
                  en: "For League Formations: Offset Adjudicator toward the enemy's heavy physical damage flank while aligning Rose Princess + Paragon / Pyromancer to concentrate massive AOE fire directly onto the cluster where both enemy Tankers are pulled together.",
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
                vi: "Trong Top Heroes, công thức toán học tính thời gian nghiên cứu thực tế là: Thời Gian Thực Tế = Thời Gian Gốc (Base Time) / [1 + Tổng (% Tốc Độ Nghiên Cứu Tại Giây Bấm Nút)]. Mọi chỉ số % Tốc độ Nghiên cứu đều được máy chủ chụp ảnh tĩnh (Pre-Click Snapshot) ngay tại mili-giây bạn bấm nút bắt đầu! Do đó, trước khi bấm bất kỳ nhánh nghiên cứu lớn nào (từ 24 giờ đến 10+ ngày), bắt buộc thực hiện Quy trình 4 Bước Pre-Click Snapshot sau:",
                en: "In Top Heroes, the mathematical formula governing actual research duration is: Actual Duration = Base Time / [1 + Sum of (% Research Speed Buffs at the Millisecond of Clicking)]. Every % Research Speed modifier is permanently snapshotted (Pre-Click Snapshot) at the exact millisecond you tap the start button! Therefore, before starting any major tech project (24 hours to 10+ days), always execute this 4-Step Pre-Click Snapshot Protocol:",
              },
            },
            {
              type: "list",
              ordered: true,
              items: [
                {
                  vi: "Bước 1 — Kích hoạt Nội tại Tướng Kinh Tế (Passive Hero Traits): Đảm bảo Tướng Tím Brawler (Đấu Sĩ — Tăng tốc Nghiên cứu) và Knight (Kỵ Sĩ — Tăng tốc Luyện lính) đã được nâng lên mốc 2 Sao Trắng / 12 Sao và nâng tối đa Trait 3 Lv.30 để nhận trọn vẹn +30% ở Cấp Tối Đa cho mỗi tướng. Các chỉ số này cộng dồn (Stack) trực tiếp với nội tại Tướng Vàng Shaman (+40% Tốc độ Nghiên cứu / Tech Research Rate +40%) và Hostess (+40% Tốc độ Luyện lính / Soldier Training Speed +40%) kích hoạt thụ động ngay trong kho tướng (Active without deployment).",
                  en: "Step 1 — Activate Passive Economic Hero Traits: Ensure Epic heroes Brawler (Tech Research Speed) and Knight (Soldier Training Speed) are promoted to 2 White Stars / 12 Stars with Trait 3 maxed at Lv.30 to grant the full +30% Max Level bonus each. These stack directly with Legendary heroes Shaman (+40% Tech Research Rate) and Hostess (+40% Soldier Training Speed), which remain active passively from your hero roster without deployment.",
                },
                {
                  vi: "Bước 2 — Kiểm tra Dân Làng trong Viện Nghiên Cứu (Research Cottage Villagers): Đảm bảo toàn bộ các ô Dân làng trong Research Cottage đang gắn các Dân làng có dòng Tech Research Speed (+0.60% ➔ +3.20%) và Free Tech Speed-up (40s ➔ 432s) cao nhất đang sở hữu.",
                  en: "Step 2 — Verify Research Cottage Villagers: Ensure every villager slot inside the Research Cottage is staffed with your highest-level villagers granting Tech Research Speed (+0.60% ➔ +3.20%) and Free Tech Speed-up (40s ➔ 432s).",
                },
                {
                  vi: "Bước 3 — Xin Chức Vụ Vương Quốc (Secretary of Science / Bộ Trưởng Khoa Học): Nếu máy chủ đã mở Cung điện Vương quốc (Throne / Capitol), hãy nộp đơn xin chức vụ Bộ Trưởng Khoa Học (Secretary of Science — thường được duyệt tự động xoay vòng mỗi 5–10 phút). Đợi đúng lúc biểu tượng vương miện chức vụ hiện lên trên đầu Lâu Đài.",
                  en: "Step 3 — Claim the Kingdom Title (Secretary of Science): Once your server opens the Capitol / Throne, apply for the Secretary of Science title (typically auto-rotated every 5–10 minutes). Wait until the title crown icon appears directly above your Castle.",
                },
                {
                  vi: "Bước 4 — Bấm Nút Nghiên Cứu ➔ Xin Đầy Guild Help ➔ Xả Tăng Tốc: Ngay khi có chức vụ Secretary of Science, lập tức bấm bắt đầu dự án nghiên cứu lớn (thời gian tổng đã được cắt giảm 40%–60%!). Sau khi bấm xong, bạn có thể trả lại chức vụ cho người khác mà thời gian đã giảm vẫn được giữ nguyên 100%. Cuối cùng, đợi thành viên Bang hội bấm đầy thanh Guild Help rồi mới xả bình Tăng tốc vào đúng Thứ Ba Tuần B (Arms Race Day 2).",
                  en: "Step 4 — Tap Research ➔ Max Out Guild Help ➔ Dump Speedups: The moment the Secretary of Science buff is active, tap Research to lock in a 40%–60% duration reduction! You can immediately relinquish the title afterward while keeping 100% of the shortened timer. Finally, wait for guildmates to fill your Guild Help bar before burning Research Speedups on Week B Tuesday (Arms Race Day 2).",
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
                    vi: "Luôn đợi thành viên Bang hội ấn满 (đầy) lượt trợ giúp miễn phí rồi mới xả bình Tăng tốc vào đúng khung giờ Thứ Ba Tuần B (Arms Race Day 2: Tech & Runes).",
                    en: "Always wait for guildmates to max out your free Guild Help clicks before dumping speedups during Week B Tuesday (Arms Race Day 2: Tech & Runes).",
                  },
                },
              ],
            },
          ],
        },
        {
          id: "sub-4-3-dragon-essence-tech-cost-master-table",
          title: {
            vi: "4.3. Bảng Tra Cứu 17 Hàng Chi Phí Công Nghệ Tinh Chất Rồng (Dragon Essence Tech Cost — Season 1 & 2, Tab ♾️DE-Dust)",
            en: "4.3. 17-Row Dragon Essence Tech Cost Master Table (Season 1 & 2, Tab ♾️DE-Dust)",
          },
          blocks: [
            {
              type: "paragraph",
              text: {
                vi: "Dữ liệu dưới đây được trích xuất chính xác 100% từ TopHeroes Tables (Tab ♾️DE-Dust), dùng để quy hoạch lượng Tinh Chất Rồng (Dragon Essence) cho Viện Huy Hoàng (Brilliance Institute) và Cây Công nghệ Phe phái (Faction Tech & Season 2 Tech):",
                en: "The dataset below is extracted 100% verbatim from TopHeroes Tables (Tab ♾️DE-Dust) to budget your Dragon Essence across the Brilliance Institute, Faction Tech, and Season 2 Tech trees:",
              },
            },
            {
              type: "table",
              caption: {
                vi: "Bảng 4.3: Bảng tra cứu 17 hàng chi phí Công nghệ Tinh Chất Rồng (Dragon Essence Tech Cost — Season 1 & 2, Tab ♾️DE-Dust)",
                en: "Table 4.3: 17-Row Dragon Essence (DE-Dust) Technology Cost Master Table (Season 1 & 2, Tab ♾️DE-Dust)",
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
                    vi: "🏛️ Viện Huy Hoàng (Brilliance Institute)",
                    en: "🏛️ Brilliance Institute",
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
                    vi: "🏛️ Viện Huy Hoàng",
                    en: "🏛️ Brilliance Institute",
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
                    vi: "🏛️ Viện Huy Hoàng",
                    en: "🏛️ Brilliance Institute",
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
                    vi: "🏛️ Viện Huy Hoàng",
                    en: "🏛️ Brilliance Institute",
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
                    vi: "🏛️ Viện Huy Hoàng",
                    en: "🏛️ Brilliance Institute",
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
                    vi: "🏛️ Viện Huy Hoàng",
                    en: "🏛️ Brilliance Institute",
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
                    vi: "🏛️ Viện Huy Hoàng",
                    en: "🏛️ Brilliance Institute",
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
                    vi: "🏛️ Viện Huy Hoàng",
                    en: "🏛️ Brilliance Institute",
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
                    vi: "🏛️ Viện Huy Hoàng",
                    en: "🏛️ Brilliance Institute",
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
                    vi: "🏛️ Viện Huy Hoàng",
                    en: "🏛️ Brilliance Institute",
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
                    vi: "🔥 Viện Huy Hoàng",
                    en: "🔥 Brilliance Institute",
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
                    vi: "🏛️ Viện Huy Hoàng",
                    en: "🏛️ Brilliance Institute",
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
                    vi: "⚔️ Công Nghệ Hệ (Faction Tech)",
                    en: "⚔️ Faction Tech",
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
                    vi: "⚔️ Công Nghệ Hệ (Faction Tech)",
                    en: "⚔️ Faction Tech",
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
                    vi: "⚔️ Công Nghệ Hệ (Faction Tech)",
                    en: "⚔️ Faction Tech",
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
                    vi: "❄️ Season 2 Tech",
                    en: "❄️ Season 2 Tech",
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
                    vi: "❄️ Season 2 Tech",
                    en: "❄️ Season 2 Tech",
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
            vi: "Bài toán mẫu: Tài khoản ở giai đoạn Lâu Đài Lv.25 (Viện Nghiên Cứu Lv.24), sở hữu 2 Hàng đợi Nghiên cứu, đang có tiến độ công nghệ dàn trải: Tân Thủ (95.3%), Tăng Cường Đội 1 / Combat Expertise (36.6%), Phát Triển / Development (30.1%), Kinh Tế / Economy (24.8%), Lính / Soldiers (17.0%) và Anh Hùng / Heroes (13.6%).",
            en: "Benchmark Profile: A Castle Lv.25 account (Research Cottage Lv.24) owning 2 Research Queues with a fragmented tech progression profile: Beginner Combat (95.3%), Queue 1 Boost / Combat Expertise (36.6%), Development (30.1%), Economy (24.8%), Soldiers (17.0%), and Heroes (13.6%).",
          },
          diagnostics: [
            {
              vi: "Chia nhỏ thời gian nghiên cứu quá sớm: Dù đã mở khóa nhánh Arms Race Prep / Commendation từ Viện NC Lv.20 và nhánh Tân Thủ mới ở mức 95.3%, người chơi lại phân tán hàng đợi sang cả nhánh Lính (17.0%) và Anh Hùng (13.6%), khiến cả Arms Race Prep lẫn Tăng Cường Đội 1 (36.6%) đều dở dang.",
              en: "Premature Research Fragmentation: Despite unlocking Arms Race Prep / Commendation at Research Cottage Lv.20 while Beginner Combat sits at 95.3%, the commander diverted queues into Soldiers (17.0%) and Heroes (13.6%), leaving both Arms Race Prep and Queue 1 Boost (36.6%) unfinished.",
            },
            {
              vi: "Nguy cơ cạn kiệt Kho Mồi Sự Kiện: Nhánh Phát Triển đang ở 30.1% và nhánh Kinh Tế đang ở đúng ngưỡng vàng 24.8%. Nếu tiếp tục bấm nâng cấp tự do vào ngày thường, tài khoản sẽ mất sạch các node ngắn 10–20 phút phục vụ Guild Race (Tuần A) và Thứ Ba GAR (Tuần B).",
              en: "Event Bait Depletion Risk: Development sits at 30.1% while Economy is right at the golden 24.8% threshold. Continuing to tap Economy nodes on normal days would wipe out the 10–20 minute nodes needed for Week A Guild Race and Week B Tuesday GAR.",
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
                vi: "Đóng băng chiến thuật ở 24.8% vào ngày thường; chỉ bấm node 10–20 phút vào Thứ Ba Tuần B (17:00–21:00) & Guild Race",
                en: "Tactically frozen at 24.8% on normal days; 10–20m nodes tapped only during Week B Tuesday (17:00–21:00) & Guild Race",
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
                vi: "Hoàn tất nốt 4.7% cuối của nhánh Tân Thủ (95.3% ➔ 100%), sau đó dồn toàn lực Hàng đợi 1 đẩy thẳng nhánh Arms Race Prep / Commendation chạm mốc mở Hộp Thưởng Thứ 6 (Extra Rewards / Double Rewards). Ngay khi mở xong Hộp Thứ 6, quay lại đẩy nhánh Tăng Cường Đội 1 (Queue 1 Boost / Combat Expertise) từ 36.6% lên thẳng 100% để lấy tối đa March Size.",
                en: "Finish the remaining 4.7% of Beginner Combat (95.3% ➔ 100%), then dedicate Queue 1 100% to pushing Arms Race Prep / Commendation straight to the 6th Reward Chest (Extra Rewards / Double Rewards). Once unlocked, return to Queue 1 Boost / Combat Expertise and push it from 36.6% to 100% for maximum March Size.",
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
                vi: "Tạm dừng hoàn toàn việc rải điểm vào nhánh Lính (17.0%) và Anh Hùng (13.6%). Cho Hàng đợi 2 chạy dọc nhánh Phát Triển (Development) từ 30.1%, chỉ bấm vào các node Giảm thời gian Xây dựng (Construction Speed), Giảm thời gian Nghiên cứu (Research Speed) và Tool Improvement (-5%) kèm áp dụng Pre-Click Snapshot.",
                en: "Immediately halt all scattered upgrades in Soldiers (17.0%) and Heroes (13.6%). Run Queue 2 along the Development branch from 30.1%, tapping exclusively Construction Speed, Research Speed, and Tool Improvement (-5%) nodes while applying the Pre-Click Snapshot protocol.",
              },
              impactBadge: {
                vi: "Hàng Đợi 2 Tốc Độ",
                en: "Speed Queue 2",
              },
            },
            {
              stepNumber: "3",
              title: {
                vi: "Kỷ Luật Đóng Băng Chiến Thuật Nhánh Kinh Tế (24.8%) Cho Khung Giờ Vàng 17:00 – 21:00 Thứ Ba Tuần B",
                en: "Tactical Freeze on Economy (24.8%) Reserved for Week B Tuesday 17:00 – 21:00 & Guild Race",
              },
              detail: {
                vi: "Giữ nguyên nhánh Kinh Tế (Economy) ở đúng mức 24.8% vào ngày thường — bảo toàn nguyên vẹn các node 10–20 phút để dành riêng cho khung giờ 17:00 – 21:00 Thứ Ba Tuần B (Arms Race Day 2: Tech & Runes) và các Nhiệm vụ Vàng đếm số lần nghiên cứu của Guild Race (Tuần A)!",
                en: "Freeze the Economy branch strictly at 24.8% on normal days—preserving all 10–20 minute nodes exclusively for the 17:00 – 21:00 window on Week B Tuesday (Arms Race Day 2: Tech & Runes) and frequency-based Golden Tasks in Week A Guild Race!",
              },
              impactBadge: {
                vi: "Bảo Toàn Kho Mồi 24.8%",
                en: "24.8% Bait Preserved",
              },
            },
          ],
          conclusion: {
            vi: "Chỉ sau 2 chu kỳ Tuần A – Tuần B tái cơ cấu từ trạng thái dàn trải (Tân Thủ 95.3%, Tăng Cường Đội 1 36.6%, Phát Triển 30.1%, Kinh Tế 24.8%, Lính 17.0%, Anh Hùng 13.6%), tài khoản mở khóa thành công Hộp Thứ 6 Arms Race Prep (+200% lợi tức rương), hoàn tất 100% Queue 1 Boost và tiết kiệm hàng trăm giờ tăng tốc nhờ Pre-Click Snapshot.",
            en: "Within just two Week A – Week B cycles of restructuring from a fragmented state (Beginner 95.3%, Queue 1 Boost 36.6%, Development 30.1%, Economy 24.8%, Soldiers 17.0%, Heroes 13.6%), the account unlocks the Arms Race Prep 6th Chest (+200% chest returns), completes 100% Queue 1 Boost, and saves hundreds of speedup hours via Pre-Click Snapshot.",
          },
        },
      ],
    },
  ],
};

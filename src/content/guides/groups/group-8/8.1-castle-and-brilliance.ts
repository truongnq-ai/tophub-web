import type { GuideArticle } from "../../types";

export const ARTICLE_8_1_CASTLE_AND_BRILLIANCE: GuideArticle = {
  code: "8.1",
  slug: "castle-and-brilliance",
  categorySlug: "infrastructure",
  badge: "HOT",
  readingMinutes: 12,
  title: {
    vi: "Chiến Lược Đua Cấp Lâu Đài (Lv.1 ➔ Lv.40) & Kỷ Nguyên Quang Huy (Castle Rush & Brilliance)",
    en: "Castle Rush Strategy (Lv.1 to Lv.40) & The Brilliance Era",
  },
  summary: {
    vi: "Lộ trình tối ưu hóa đường găng nâng cấp Lâu Đài từ Lv.1 lên Lv.40 theo quy luật luân phiên Chẵn/Lẻ, giải mã điểm gãy sinh tử Lv.35 mở khóa Lính Bậc 10 (T10) và quy hoạch Tinh Chất Rồng (5,422 DE mở Lính T11 vs 8,400 DE vỏ Lâu Đài B1–B6) cho Viện Huy Hoàng ở Season 1+.",
    en: "Critical-path roadmap for rushing Castle Lv.1 to Lv.40 using the Even/Odd prerequisite rule, unlocking the lethal Lv.35 Tier 10 Troops breakpoint, and managing Dragon Essence (5,422 DE for T11 vs. 8,400 DE for Castle B1–B6) in the Brilliance Institute from Season 1+.",
  },
  tldr: {
    coreRule: {
      vi: "Đua Cấp Lâu Đài (Castle Rush Lv.1 ➔ Lv.40) là ưu tiên tối thượng của toàn bộ hệ thống hạ tầng. Mỗi cấp Lâu Đài trực tiếp mở trần cấp độ Tướng (+5 cấp/level, riêng Lv.14➔15 và Lv.29➔30 nhảy vọt +10 cấp) và mỗi 5 cấp Doanh Trại (Lv.15 / Lv.20 / Lv.25 / Lv.30 / Lv.35) mở khóa một Bậc Lính mới (Troop Tier T6 ➔ T10).",
      en: "Rushing Castle Level (Castle Rush Lv.1 ➔ Lv.40) is the supreme infrastructure priority. Every Castle level raises your Hero Level Cap (+5 levels per upgrade, with +10 level surges at Lv.14➔15 and Lv.29➔30), while every 5 Barracks levels (Lv.15 / Lv.20 / Lv.25 / Lv.30 / Lv.35) unlock a new Troop Tier (T6 ➔ T10).",
    },
    immediateAction: {
      vi: "Chỉ nâng các công trình nằm trên Đường Găng Tiên Quyết (Critical Prerequisite Path) theo quy luật luân phiên Chẵn/Lẻ: Cấp Lâu Đài Chẵn (Lv.2N) luôn đòi Hội (Guild) + Sân Tập (Training Ground); Cấp Lâu Đài Lẻ (Lv.2N+1) luôn đòi Viện Nghiên Cứu (Research Cottage) + Bệnh Viện (Hospital), kết hợp kéo duy nhất Doanh Trại Hệ Đội 1 (Main Faction Barracks).",
      en: "Only upgrade buildings on the Critical Prerequisite Path following the Even/Odd alternating rule: Even Castle Levels (Lv.2N) always require Guild + Training Ground; Odd Castle Levels (Lv.2N+1) always require Research Cottage + Hospital, alongside pushing only your Queue 1 Main Faction Barracks.",
    },
    strictTaboo: {
      vi: "Tuyệt đối KHÔNG nâng vượt cấp các công trình kinh tế/phòng thủ phụ như Nhà Kho (Warehouse), Khu Đốn Gỗ (Lumber Mill), Mỏ Đá (Quarry), Trang Trại (Farm) hay Doanh Trại 2 Hệ Phụ ngoài mốc bắt buộc — việc này làm cạn kiệt Gỗ/Đá/Ruby trước Điểm gãy sinh tử Lâu Đài Lv.35 (mở Lính Bậc 10 / Tier 10 Troops)!",
      en: "NEVER over-level secondary economy or filler buildings such as the Warehouse, Lumber Mill, Quarry, Farm, or off-faction Barracks beyond mandatory requirements—doing so drains hundreds of hours and millions of Timber/Stone/Rubies before the lethal Castle Lv.35 (Tier 10 Troops) breakpoint!",
    },
  },
  keyTakeaways: [
    {
      vi: "Phân loại 3 Nhóm Công trình & Quy luật Luân phiên Chẵn/Lẻ (Lv.10 ➔ Lv.40): Nhóm 1 Đường Găng Lõi (Castle, Guild, Training Ground, Research Cottage, Hospital, Main Barracks) chiếm 100% thời gian Thợ 1 & Thợ 2; Nhóm 2 Hỗ trợ Chiến đấu (Faction Statues Lv.20 cộng +100 lính/tướng, Rally Hall, Lord Hall Lv.25, Medal Hall Lv.25, Blacksmith, Monastery); Nhóm 3 Nông nghiệp & Hậu cần đóng băng ở Lv.12–16 làm mồi nhiệm vụ 5–15 phút.",
      en: "3 Building Priority Groups & Even/Odd Alternating Rule (Lv.10 ➔ Lv.40): Group 1 Critical Core (Castle, Guild, Training Ground, Research Cottage, Hospital, Main Barracks) takes 100% of Builder 1 & 2 uptime; Group 2 Combat Support (Faction Statues adding +100 soldiers/hero at Lv.20, Rally Hall, Lord Hall Lv.25, Medal Hall Lv.25, Blacksmith, Monastery); Group 3 Resource/Filler frozen at Lv.12–16 as 5–15 minute daily quest bait.",
    },
    {
      vi: "Điểm Gãy Sinh Tử Số 1 Mid-Game — Lâu Đài Lv.35 + Doanh Trại Lv.35 = Lính Bậc 10 (Tier 10 Troops): Toàn trình Lv.10 ➔ Lv.40 tốn ~490M–500M Gỗ/Đá và ~165M Ruby (Trần Tướng Lv.220), nhưng từ Lv.10 ➔ Lv.35 chỉ tốn ~82M Gỗ/Đá (Lv.35 tốn 26.6M Gỗ/Đá & 8.36M Ruby, Trần Lv.195), trong khi 5 cấp cuối Lv.36 ➔ Lv.40 ngốn tới ~417M Gỗ/Đá và ~142.8M Ruby (đắt gấp 3.5 lần) mà Doanh Trại Lv.36–40 KHÔNG mở khóa Bậc Lính mới!",
      en: "Mid-Game Lethal Breakpoint #1 — Castle Lv.35 + Barracks Lv.35 = Tier 10 Troops: While Lv.10 ➔ Lv.40 totals ~490M–500M Timber/Stone and ~165M Rubies (Hero Cap Lv.220), Lv.10 ➔ Lv.35 costs only ~82M Timber/Stone (Lv.35 costs 26.6M Timber/Stone & 8.36M Rubies, Hero Cap Lv.195), whereas the final 5 levels Lv.36 ➔ Lv.40 devour ~417M Timber/Stone and ~142.8M Rubies (3.5x more expensive) without unlocking any new Troop Tier!",
    },
    {
      vi: "Kỷ Nguyên Quang Huy (Brilliance B1 ➔ B6, Lv.41 ➔ Lv.70) & Bí Mật Mở Lính T11 (5,422 DE): Nâng vỏ Lâu Đài trọn 6 bậc B1–B6 (B1: 630 DE | B2: 755 DE, Trần Lv.225 | B3: 1,135 DE | B4: 1,515 DE, Trần Lv.230 | B5: 1,940 DE | B6: 2,425 DE, Trần Lv.235) ngốn tổng cộng 8,400 Dragon Essence, 1,238.8M Ruby và 4,931.8M Gỗ/Đá. Ngược lại, để mở khóa Lính Bậc 11 (Tier 11 Troops) tại Viện Huy Hoàng (Brilliance Institute Lv.15), chỉ cần 745 DE xây viện (1,375M Gỗ/Đá) + 4,677 DE nghiên cứu đường găng (node Soldier Level tốn 288 DE) = 5,422 Dragon Essence!",
      en: "The Brilliance Era (B1 ➔ B6, Lv.41 ➔ Lv.70) & The 5,422 DE Tier 11 Troops Secret: Maxing the Castle shell across B1–B6 (B1: 630 DE | B2: 755 DE, Cap Lv.225 | B3: 1,135 DE | B4: 1,515 DE, Cap Lv.230 | B5: 1,940 DE | B6: 2,425 DE, Cap Lv.235) consumes 8,400 Dragon Essence, 1,238.8M Rubies, and 4,931.8M Timber/Stone. Conversely, unlocking Tier 11 Troops at Brilliance Institute Lv.15 requires only 745 DE for building upgrades (1,375M Timber/Stone) + 4,677 DE in prerequisite tech (including 288 DE for Soldier Level) = 5,422 Dragon Essence!",
    },
  ],
  keywords: [
    "đua cấp lâu đài",
    "dua cap lau dai",
    "castle rush",
    "kỷ nguyên quang huy",
    "ky nguyen quang huy",
    "brilliance era",
    "viện huy hoàng",
    "vien huy hoang",
    "brilliance institute",
    "tinh chất rồng",
    "tinh chat rong",
    "dragon essence",
    "de-dust",
    "lính bậc 10",
    "tier 10 troops",
    "tier 11 troops",
    "5,422",
    "8,400",
  ],
  sourceFiles: [
    "docs/06-game-guides/07-standardized-web-guides/group-8-infrastructure/8.1-castle-and-brilliance.md",
    "docs/06-game-guides/01-core-strategic-topics/topic-2-and-4-buildings-and-research-tech.md",
    "docs/06-game-guides/03-data-tables-and-mechanics/topheroes-tables-max-raw-dataset.md",
  ],
  freeSections: [
    {
      id: "sec-1-why-castle-rush-core-mechanics",
      title: {
        vi: "1. Giải thích Cơ chế Cốt lõi: Tại sao Phải Đua Cấp Lâu Đài (Castle Rush)?",
        en: "1. Core Mechanics Explained: Why Must You Rush Castle Level (Castle Rush)?",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "Trong Top Heroes, nhiều người chơi mới thường mắc hội chứng \"quy hoạch đô thị đồng đều\" — tức là cố gắng nâng tất cả mọi công trình trong làng lên bằng cấp với Lâu Đài / Pháo Đài (Castle). Đây là sai lầm chiến lược nghiêm trọng nhất về mặt hạ tầng, khiến tài khoản bị tụt lại từ 2 đến 4 tuần tiến độ so với các người chơi cùng mức đầu tư.",
            en: "In Top Heroes, many newcomers fall into the \"uniform urban planning\" trap—trying to upgrade every building in town to match their Castle level. This is the single most destructive infrastructure mistake, setting your account back 2 to 4 weeks compared to peers with the same spending level.",
          },
        },
      ],
      subSections: [
        {
          id: "sub-1-1-two-exclusive-power-levers",
          title: {
            vi: "1.1. Hai Đòn bẩy Sức mạnh Độc quyền của Lâu Đài",
            en: "1.1. The Two Exclusive Power Levers of the Castle",
          },
          blocks: [
            {
              type: "paragraph",
              text: {
                vi: "Cấp độ của Lâu Đài (Castle) kiểm soát trực tiếp 2 nút cổ chai lớn nhất quyết định thắng bại trong cả PvE lẫn PvP:",
                en: "Your Castle level directly governs the two biggest progression bottlenecks that decide victory in both PvE and PvP:",
              },
            },
            {
              type: "list",
              ordered: true,
              items: [
                {
                  vi: "Giới hạn Cấp độ Tướng Tối đa (Hero Level Cap): Cứ mỗi cấp Lâu Đài được nâng lên từ Lv.1 đến Lv.40, trần cấp độ của toàn bộ tướng tăng thêm +5 cấp (riêng mốc đột phá Lv.14 ➔ Lv.15 nhảy từ Lv.80 lên Lv.90 và Lv.29 ➔ Lv.30 tăng vọt +10 cấp, từ Lv.160 lên Lv.170). Một đội hình ở Lâu Đài Lv.30 (Tướng Lv.170) sẽ đè bẹp hoàn toàn đội hình ở Lâu Đài Lv.27 (Tướng Lv.150) nhờ lượng chỉ số Tấn công (ATK) và Máu (HP) cơ bản chênh lệch vượt trội.",
                  en: "Maximum Hero Level Cap: Every Castle upgrade from Lv.1 to Lv.40 increases your Hero Level Cap by +5 levels (with special +10 level surges at Lv.14 ➔ Lv.15 from Lv.80 to Lv.90 and Lv.29 ➔ Lv.30 from Lv.160 to Lv.170). A Castle Lv.30 lineup (Heroes Lv.170) completely crushes a Castle Lv.27 lineup (Heroes Lv.150) due to massive base ATK and HP stat superiority.",
                },
                {
                  vi: "Mở khóa Bậc Lính Mới (Troop Tiers — Quy tắc Bước nhảy 5 Cấp): Lính đóng góp tới 40%–50% tổng lượng máu chống chịu và sát thương duy trì của đội hình. Cứ mỗi 5 cấp độ của Doanh Trại (Barracks) — vốn bị khóa trần bởi cấp Lâu Đài (Lv.15, Lv.20, Lv.25, Lv.30, Lv.35, Lv.40) — toàn bộ binh lính thuộc phe đó sẽ được Thăng thêm 1 Bậc (Tier). Đặc biệt, bước nhảy từ Lính Bậc 9 (T9 ở Lv.30) lên Lính Bậc 10 (Tier 10 Troops / T10 ở Lv.35) tạo ra sự khác biệt một trời một vực trên chiến trường.",
                  en: "Unlocking New Troop Tiers (The 5-Level Step Rule): Soldiers contribute 40%–50% of your lineup's total tankiness and sustained damage. Every 5 Barracks levels—hard-capped by your Castle level (Lv.15, Lv.20, Lv.25, Lv.30, Lv.35, Lv.40)—promotes all troops of that faction by +1 Tier. In particular, the leap from Tier 9 (T9 at Lv.30) to Tier 10 Troops (T10 at Lv.35) creates a night-and-day difference on the battlefield.",
                },
              ],
            },
          ],
        },
        {
          id: "sub-1-2-three-building-priority-groups",
          title: {
            vi: "1.2. Phân loại 3 Nhóm Công trình Trong Làng",
            en: "1.2. Classifying the 3 Building Priority Groups in Town",
          },
          blocks: [
            {
              type: "paragraph",
              text: {
                vi: "Để không bao giờ phân bổ nhầm hàng đợi thợ xây, người chơi cần chia toàn bộ công trình trong lãnh địa thành 3 nhóm có mức độ ưu tiên tách biệt:",
                en: "To never misallocate a builder queue again, divide all town buildings into 3 distinct priority tiers:",
              },
            },
            {
              type: "table",
              caption: {
                vi: "Bảng 1.2: Phân loại 3 Nhóm Công trình Hạ tầng & Quy tắc Phân bổ Thợ xây",
                en: "Table 1.2: 3 Infrastructure Building Priority Groups & Builder Allocation Rules",
              },
              headers: [
                {
                  vi: "Phân nhóm Hạ tầng",
                  en: "Infrastructure Group",
                },
                {
                  vi: "Danh sách Công trình (Việt - Anh)",
                  en: "Building List (VI - EN)",
                },
                {
                  vi: "Vai trò Chiến lược & Quy tắc Nâng cấp",
                  en: "Strategic Role & Upgrade Rule",
                },
              ],
              rows: [
                [
                  {
                    vi: "Nhóm 1: Đường Găng Lõi (Critical Core)",
                    en: "Group 1: Critical Core Path",
                  },
                  {
                    vi: "Lâu Đài / Pháo Đài (Castle), Hội / Sảnh Bang (Guild), Sân Tập (Training Ground), Viện Nghiên Cứu (Research Cottage), Bệnh Viện (Hospital), Doanh Trại Hệ Chính (Main Barracks)",
                    en: "Castle, Guild, Training Ground, Research Cottage, Hospital, Main Faction Barracks (Main Barracks)",
                  },
                  {
                    vi: "Ưu tiên Tuyệt đối (100% Thời gian Thợ 1 & Thợ 2). Đây là bộ 6 công trình bắt buộc phải bám sát cấp độ tối đa ở mọi giai đoạn để không bao giờ bị nghẽn điều kiện lên đời Lâu Đài và Bậc Lính.",
                    en: "Absolute Priority (100% of Builder 1 & Builder 2 uptime). These 6 core buildings must stay at maximum level at every stage so you never bottleneck Castle upgrades or Troop Tiers.",
                  },
                ],
                [
                  {
                    vi: "Nhóm 2: Hỗ trợ Chiến đấu (Combat Support)",
                    en: "Group 2: Combat Support",
                  },
                  {
                    vi: "Tượng Phe Phái (Faction Statues), Sảnh Tập Kết (Rally Hall), Sảnh Lãnh Chúa (Lord Hall — mở ở Lv.25), Sảnh Huân Chương (Medal Hall — mở ở Lv.25), Lò Rèn (Blacksmith) & Tu Viện (Monastery), Mỏ Quặng Cường Hóa / Mỏ Đá Vân Ma Thuật",
                    en: "Faction Statues, Rally Hall, Lord Hall (unlocks at Lv.25), Medal Hall (unlocks at Lv.25), Blacksmith & Monastery, Ore Mine / Magic Rune Mine",
                  },
                  {
                    vi: "Ưu tiên Thứ cấp (Thợ 3 hoặc xây khi dồn tài nguyên). Tượng Phe Phái tăng trực tiếp Quy mô hành quân (March Size) cho tướng cùng hệ (ví dụ: đạt cấp 20 cộng thêm +100 lính/tướng). Nâng bám theo Đội hình 1.",
                    en: "Secondary Priority (Builder 3 or while banking resources). Faction Statues directly increase March Size for matching faction heroes (e.g., Lv.20 adds +100 soldiers/hero). Upgrade in sync with Queue 1.",
                  },
                ],
                [
                  {
                    vi: "Nhóm 3: Nông nghiệp & Hậu cần (Resource / Filler)",
                    en: "Group 3: Resource & Filler",
                  },
                  {
                    vi: "Nhà Kho (Warehouse), Khu Đốn Gỗ (Lumber Mill), Mỏ Đá (Quarry), Trang Trại (Farm), Mỏ Ruby (Ruby Mine), Quán Rượu (Tavern), Doanh Trại Hệ Phụ",
                    en: "Warehouse, Lumber Mill, Quarry, Farm, Ruby Mine, Tavern, Off-Faction Barracks",
                  },
                  {
                    vi: "Đóng băng ở cấp thấp (Lv.12 – Lv.16). Chỉ nâng khi hệ thống ép buộc hoặc giữ nguyên ở cấp thấp để làm \"Mồi Nhiệm Vụ (Daily/Event Bait)\" tốn 5–15 phút mỗi ngày.",
                    en: "Freeze at low levels (Lv.12 – Lv.16). Only upgrade when forced by prerequisites, keeping them low as 5–15 minute \"Daily/Event Bait\" for quick quest completion.",
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: "sec-2-f2p-freeze-list-and-faction-paths",
      title: {
        vi: "2. Chiến thuật Tối ưu cho F2P & Low-Spender (Tầm trung)",
        en: "2. Mid-Game Optimization Strategy for F2P & Low-Spenders",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "Từ cấp Lâu Đài Lv.20 trở lên, chi phí Gỗ / Đá (Timber / Stone) và Ruby để nâng cấp Lâu Đài tăng theo cấp số nhân. Kỷ luật đóng băng công trình phụ và đồng bộ Doanh Trại theo phe phái chủ lực là chìa khóa giúp F2P bắt kịp tiến độ Top Server.",
            en: "From Castle Lv.20 onward, Timber / Stone and Ruby upgrade costs scale exponentially. Strict freeze discipline on filler buildings and faction-aligned Barracks progression are the keys for F2P players to keep pace with top server progression.",
          },
        },
      ],
      subSections: [
        {
          id: "sub-2-1-strict-building-freeze-list",
          title: {
            vi: "2.1. Danh sách Công trình CẤM Nâng Vượt Cấp Yêu Cầu (The Strict Freeze List)",
            en: "2.1. The Strict Freeze List: Buildings You Must Never Over-Level",
          },
          blocks: [
            {
              type: "list",
              ordered: true,
              items: [
                {
                  vi: "Nhà Kho (Warehouse): Công trình vô dụng nhất đối với người chơi biết quản lý túi đồ. Toàn bộ tài nguyên nằm trong Rương Tự Chọn (Resource Chests) trong Túi đồ (Bag) vốn dĩ không bao giờ bị cướp và không chiếm dung lượng kho. Chỉ nâng Nhà Kho khi có nhiệm vụ bắt buộc.",
                  en: "Warehouse: The most redundant building for players who practice proper inventory management. All resources stored inside Resource Chests in your Bag can never be plundered and take zero warehouse capacity. Only upgrade the Warehouse when required by main quests.",
                },
                {
                  vi: "Mỏ Gỗ, Mỏ Đá và Trang Trại Thịt (Lumber Mill, Quarry, Farm): Sản lượng thu hoạch tự nhiên trong làng từ cấp Lv.15 trở lên tốn hàng tuần mới hoàn vốn (ROI cực thấp) so với việc đi đào mỏ trên Bản đồ Thế giới hoặc ăn rương sự kiện Arms Race. Hãy giữ chúng ở khoảng Lv.12 – Lv.15 để mỗi khi cần làm nhiệm vụ \"Hoàn thành 1 lần nâng cấp công trình\", bạn chỉ mất vài phút là xong.",
                  en: "Lumber Mill, Quarry, and Farm: Passive town resource production above Lv.15 takes weeks to pay back its upgrade cost (extremely low ROI) compared to World Map gathering or Arms Race chests. Keep them at Lv.12 – Lv.15 so \"Complete 1 building upgrade\" quests take only a few minutes.",
                },
                {
                  vi: "Doanh Trại của 2 Hệ Phụ (Off-Faction Barracks): Trước khi Lâu Đài và Doanh Trại của Đội hình 1 (Queue 1) chạm mốc Lv.30 (hoặc Lv.35), tuyệt đối không đốt hàng chục triệu Gỗ/Đá để kéo cả 3 Doanh Trại (Liên Minh, Bộ Lạc, Thiên Nhiên) lên cùng một lúc.",
                  en: "Off-Faction Barracks (2 Secondary Factions): Before your Castle and Queue 1 Main Barracks reach Lv.30 (or Lv.35), never burn tens of millions of Timber/Stone leveling all 3 Barracks (League, Horde, Nature) simultaneously.",
                },
                {
                  vi: "Quán Rượu (Tavern) & Lò Rèn (Blacksmith) ở cấp cao: Chỉ nâng đến mốc mở khóa tính năng cốt lõi, không chạy đua theo cấp Lâu Đài khi đang thiếu tài nguyên.",
                  en: "High-Level Tavern & Blacksmith: Only upgrade to unlock core feature milestones; never race them alongside your Castle when Timber, Stone, or Rubies are tight.",
                },
              ],
            },
          ],
        },
        {
          id: "sub-2-2-three-faction-barracks-roadmap",
          title: {
            vi: "2.2. Lộ trình Hạ tầng Đồng bộ theo 3 Phe Phái (League / Horde / Nature)",
            en: "2.2. Faction-Synchronized Infrastructure Roadmap (League / Horde / Nature)",
          },
          blocks: [
            {
              type: "list",
              items: [
                {
                  vi: "🔵 Lộ trình Thuần Liên Minh (Pure League Path): Tập trung 100% vào Doanh Trại Liên Minh (League Barracks) và Tượng Liên Minh (League Statue) xuyên suốt từ Lv.1 ➔ Lv.40. Giữ Doanh Trại Bộ Lạc và Thiên Nhiên lùi lại phía sau từ 5–10 cấp (chỉ nâng lên các mốc chẵn Lv.20 / Lv.25 khi dư thừa tài nguyên hoặc cần điểm sự kiện Thứ Hai).",
                  en: "🔵 Pure League Path: Focus 100% on League Barracks and League Statue from Lv.1 ➔ Lv.40. Keep Horde and Nature Barracks 5–10 levels behind (only tapping even milestones Lv.20 / Lv.25 when overflowing with resources or scoring Monday event points).",
                },
                {
                  vi: "🔴 Lộ trình Khởi đầu Liên Minh ➔ Chuyển giao Bộ Lạc (League Start to Horde Pivot — Khuyên dùng cho F2P/Low-Spender): Giai đoạn 1 (Tuần 1 – Tuần 3 / Đua mốc Lv.25) ưu tiên nâng Doanh Trại Liên Minh lên Lv.20 ➔ Lv.25 để Đội 1 Liên Minh đầu game càn quét PvE/Arena, nhưng từ cuối Tuần 2 dùng Thợ phụ kéo Doanh Trại Bộ Lạc (Horde Barracks) đuổi theo lên Lv.23 ➔ Lv.25. Giai đoạn 2 (Từ Ngày 21+ / Đua mốc Lv.30 – Lv.35): Ngay khi đón tướng Thần Thoại Bộ Lạc (Desert Prince ở Ngày 21, Storm Maiden ở Ngày 27, Witch ở Ngày 41), lập tức đảo chiều ưu tiên đưa Doanh Trại Bộ Lạc và Tượng Bộ Lạc lên vị trí Ưu tiên Số 1 ngang hàng với Lâu Đài (Lv.25 ➔ Lv.30 ➔ Lv.35), đóng băng Doanh Trại Liên Minh ở Lv.25 cho Đội 2.",
                  en: "🔴 League Start to Horde Pivot Path (Recommended for F2P/Low-Spenders): Stage 1 (Weeks 1–3 / Rush Lv.25) prioritizes League Barracks to Lv.20 ➔ Lv.25 so your early League Queue 1 clears PvE/Arena, while a secondary builder pulls Horde Barracks to Lv.23 ➔ Lv.25 from late Week 2. Stage 2 (Day 21+ / Rush Lv.30–35): As soon as Horde Mythics arrive (Desert Prince Day 21, Storm Maiden Day 27, Witch Day 41), immediately flip priority—making Horde Barracks and Horde Statue Priority #1 alongside Castle (Lv.25 ➔ Lv.30 ➔ Lv.35) while freezing League Barracks at Lv.25 for Queue 2.",
                },
                {
                  vi: "🟢 Lộ trình Chuyển giao Thiên Nhiên (Nature Path): Kéo Doanh Trại Thiên Nhiên (Nature Barracks) và Tượng Thiên Nhiên (Nature Statue) lên ngang cấp Lâu Đài trước ngày ra mắt bộ đôi Tidecaller + Monk (Giai đoạn Ngày 42–65 / đầu Season 1) để tối đa hóa lượng máu cho đội hình triệu hồi.",
                  en: "🟢 Nature Pivot Path: Pull Nature Barracks and Nature Statue to match your Castle level ahead of the Tidecaller + Monk release window (Days 42–65 / early Season 1) to maximize HP scaling for summon lineups.",
                },
              ],
            },
          ],
        },
        {
          id: "sub-2-3-castle-rush-weekly-checklist",
          title: {
            vi: "2.3. Danh sách Kiểm tra Hành động Hàng tuần (Actionable Checklist)",
            en: "2.3. Weekly Actionable Castle Rush Checklist",
          },
          blocks: [
            {
              type: "checklist",
              checklistId: "castle-rush-weekly-audit-v2",
              title: {
                vi: "Checklist Kiểm Toán Đường Găng Lâu Đài Hàng Tuần",
                en: "Weekly Castle Critical-Path Audit Checklist",
              },
              description: {
                vi: "Đánh dấu từng bước trước mỗi kỳ sự kiện Xây dựng Thứ Hai (Arms Race / Guild Race) để không bao giờ kẹt điều kiện:",
                en: "Check off each step before every Monday Construction event (Arms Race / Guild Race) to avoid prerequisite bottlenecks:",
              },
              items: [
                {
                  id: "check-next-2-castle-prereqs",
                  label: {
                    vi: "Kiểm tra bảng điều kiện của 2 cấp Lâu Đài kế tiếp (Chẵn / Lẻ)",
                    en: "Verify prerequisites for the next 2 Castle levels (Even / Odd)",
                  },
                  detail: {
                    vi: "Nhớ quy luật: Cấp Lâu Đài Chẵn luôn đòi Hội (Guild) + Sân Tập (Training Ground); Cấp Lâu Đài Lẻ luôn đòi Viện Nghiên Cứu (Research Cottage) + Bệnh Viện (Hospital).",
                    en: "Remember the rule: Even Castle Levels always require Guild + Training Ground; Odd Castle Levels always require Research Cottage + Hospital.",
                  },
                },
                {
                  id: "activate-bard-construction-buffs",
                  label: {
                    vi: "Kích hoạt tối đa các nguồn Tăng Tốc độ Xây dựng (Construction Speed) trước khi bấm nâng cấp",
                    en: "Stack all Construction Speed buffs before clicking any major building upgrade",
                  },
                  detail: {
                    vi: "Gồm Bard (+40% Construction Rate — Tướng Vàng Liên Minh, kích hoạt thụ động không cần ra trận), kỹ năng Dân làng (Villager traits), Công nghệ Bang hội (Guild Tech), đặc quyền VIP và Chức vụ Vương quốc (King/Server titles) — phân biệt rõ với nhóm tăng Tốc độ Nghiên cứu từ Brawler (+30% Tech Research Rate) và Shaman (+40% Tech Research Rate).",
                    en: "Includes Bard (+40% Construction Rate — League Legendary hero, passive in-town effect), Villager traits, Guild Tech, VIP perks, and King/Server titles—distinguishing them clearly from Research Speed buffs provided by Brawler (+30% Tech Research Rate) and Shaman (+40% Tech Research Rate).",
                  },
                },
                {
                  id: "push-main-barracks-every-5-levels",
                  label: {
                    vi: "Kéo ngay Doanh Trại Hệ Đội 1 tại các mốc Lâu Đài Lv.20 / Lv.25 / Lv.30 / Lv.35",
                    en: "Push Queue 1 Main Barracks immediately at Castle Lv.20 / Lv.25 / Lv.30 / Lv.35",
                  },
                  detail: {
                    vi: "Ngay khi Lâu Đài vừa chạm mốc Lv.20, Lv.25, Lv.30 hoặc Lv.35, lập tức bấm nâng Doanh Trại Hệ Đội 1 lên cấp tương ứng để mở khóa Bậc Lính mới (T7 / T8 / T9 / Tier 10 Troops) ngay trong tuần đó.",
                    en: "The moment your Castle reaches Lv.20, Lv.25, Lv.30, or Lv.35, immediately upgrade your Queue 1 Main Barracks to the matching level to unlock the new Troop Tier (T7 / T8 / T9 / Tier 10 Troops) that same week.",
                  },
                },
                {
                  id: "keep-3-low-level-bait-mines",
                  label: {
                    vi: "Đóng băng 3–4 mỏ tài nguyên ở cấp thấp (Lv.12–Lv.14) làm mồi nhiệm vụ",
                    en: "Keep 3–4 resource mines frozen at low levels (Lv.12–Lv.14) as quest bait",
                  },
                  detail: {
                    vi: "Giữ lại ít nhất 3–4 mỏ tài nguyên ở cấp thấp (Lv.12–Lv.14) không nâng cấp để làm \"mồi\" lấy rương nhiệm vụ nhanh 5–15 phút.",
                    en: "Keep at least 3–4 resource mines frozen at low levels (Lv.12–Lv.14) as fast 5–15 minute daily/event quest bait.",
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "sec-3-castle-rush-common-pitfalls",
      title: {
        vi: "3. Những Cạm bẫy Phổ biến & Cách Phòng tránh (Common Pitfalls)",
        en: "3. Common Castle Rush Pitfalls & Min-Max Solutions",
      },
      blocks: [
        {
          type: "table",
          caption: {
            vi: "Bảng 3.1: 3 Sai lầm Hạ tầng Phổ biến Khiến Tài khoản Chậm Lính Bậc 10 (T10) & Giải pháp Min-Max",
            en: "Table 3.1: 3 Common Infrastructure Mistakes That Delay Tier 10 Troops (T10) & Min-Max Solutions",
          },
          headers: [
            {
              vi: "❌ Sai lầm Phổ biến (Account Traps)",
              en: "❌ Common Pitfalls (Account Traps)",
            },
            {
              vi: "✅ Giải pháp Tối ưu (Min-Max Solution)",
              en: "✅ Optimal Solution (Min-Max Solution)",
            },
          ],
          rows: [
            [
              {
                vi: "Nâng đồng đều cả 3 Doanh Trại Liên Minh, Bộ Lạc, Thiên Nhiên lên Lv.30 cùng lúc: Ngốn gấp 3 lần lượng Gỗ, Đá và Ruby, khiến Lâu Đài bị kẹt ở Lv.28–29 suốt nhiều tuần liền.",
                en: "Upgrading all 3 League, Horde, and Nature Barracks to Lv.30 simultaneously: Consumes 3x the Timber, Stone, and Rubies, trapping your Castle at Lv.28–29 for weeks.",
              },
              {
                vi: "Quy tắc 1 Doanh Trại Chủ Lực: Chỉ kéo duy nhất Doanh Trại của Đội hình 1 chạm mốc Lv.25 / Lv.30 / Lv.35 cùng Lâu Đài. Hai Doanh Trại phụ chỉ nâng cầm chừng khi kẹt điều kiện hoặc thừa thợ.",
                en: "Single Main Barracks Rule: Only push your Queue 1 Main Barracks to Lv.25 / Lv.30 / Lv.35 alongside your Castle. Leave the two off-faction Barracks behind until prerequisites demand them.",
              },
            ],
            [
              {
                vi: "Bấm mở toàn bộ Rương Tài Nguyên Tự Chọn trong túi đồ từ sớm: Làm lượng Gỗ/Đá hiển thị trên thanh tài nguyên vượt quá sức chứa Nhà Kho, trở thành \"miếng mồi béo bở\" cho kẻ địch cướp sạch trong ngày Chiến sự (Kill Event).",
                en: "Opening all Resource Selection Chests in your bag early: Pushes your visible Timber/Stone far above Warehouse protection limits, making you prime plunder bait during Kill Event.",
              },
              {
                vi: "Kỷ luật Kho Ngầm (Bag Banking): Tuyệt đối giữ nguyên Rương Tài Nguyên trong Túi đồ. Chỉ bấm mở số lượng vừa khít tới từng đơn vị ngay trước giây bấm nút nâng cấp Lâu Đài.",
                en: "Bag Banking Discipline: Keep all Resource Chests sealed inside your Bag. Only unpack the exact amount needed right before clicking the Castle upgrade button.",
              },
            ],
            [
              {
                vi: "Xả sạch Tăng tốc Xây dựng ở cấp Lv.31 – Lv.33: Khiến tài khoản hết sạch bình tăng tốc khi chạm ngưỡng cửa Lv.34 ➔ Lv.35, làm chậm thời điểm mở khóa Lính Bậc 10 (T10) hàng tháng trời.",
                en: "Burning all Construction Speed-ups at Lv.31 – Lv.33: Leaves your account completely dry at the Lv.34 ➔ Lv.35 threshold, delaying Tier 10 Troops (T10) by a full month.",
              },
              {
                vi: "Chiến thuật Nhịn Tăng Tốc Đột Phá Lv.35: Từ Lv.31 đến Lv.34, chỉ xả vừa đủ điểm lấy rương mốc Arms Race Thứ Hai. Tích lũy toàn bộ Tăng tốc Xây dựng để đẩy một mạch qua mốc Lâu Đài Lv.35 + Doanh Trại Lv.35.",
                en: "Lv.35 Breakthrough Speed-up Hoarding: From Lv.31 to Lv.34, spend only the minimum speed-ups needed for Monday Arms Race chests. Hoard the rest to blast straight through Castle Lv.35 + Main Barracks Lv.35.",
              },
            ],
          ],
        },
      ],
    },
  ],
  proSections: [
    {
      id: "sec-4-castle-table-lv35-breakpoint-and-brilliance",
      isPro: true,
      title: {
        vi: "4. Phân tích Định lượng: Bảng Lâu Đài Lv.10➔40, Điểm Gãy Lv.35 (T10) & Kỷ Nguyên Quang Huy (Brilliance B1➔B6)",
        en: "4. Quantitative Analysis: Castle Lv.10➔40 Master Table, Lv.35 (T10) Breakpoint & Brilliance Era (B1➔B6)",
      },
      blocks: [
        {
          type: "callout",
          variant: "rule",
          title: {
            vi: "Dữ liệu Kiểm chứng từ TopHeroes Tables - Max (Tab 🏰Castle, 👤Heroes & ♾️DE-Dust)",
            en: "Verified Ground-Truth Data from TopHeroes Tables - Max (🏰Castle, 👤Heroes & ♾️DE-Dust Tabs)",
          },
          content: {
            vi: "Toàn bộ số liệu Gỗ/Đá, Ruby, Trần Cấp Tướng và Tinh Chất Rồng (Dragon Essence / DE-Dust) dưới đây đã được chuẩn hóa 100%, loại bỏ hoàn toàn các con số ước tính sai lệch cũ và bổ sung định mức mở khóa Lính Bậc 11 (5,422 DE).",
            en: "All Timber/Stone, Ruby, Hero Level Cap, and Dragon Essence (DE-Dust) figures below are 100% standardized from raw community spreadsheets, eliminating legacy estimation errors and detailing the exact 5,422 DE path to Tier 11 Troops.",
          },
        },
      ],
      subSections: [
        {
          id: "sub-4-1-alternating-prerequisite-flowchart",
          title: {
            vi: "4.1. Sơ đồ Đường Găng Luân Phiên Chẵn / Lẻ (The Alternating Prerequisite Flowchart)",
            en: "4.1. The Alternating Even / Odd Prerequisite Flowchart (Lv.10 ➔ Lv.40)",
          },
          blocks: [
            {
              type: "paragraph",
              text: {
                vi: "Điều kiện tiên quyết để nâng cấp Lâu Đài từ Lv.10 đến Lv.40 tuân theo một Quy luật Luân phiên Chẵn – Lẻ tuyệt đối: Để lên Cấp Lâu Đài Chẵn (Lv.2N), hệ thống LUÔN LUÔN yêu cầu Hội (Guild) và Sân Tập (Training Ground) đạt cấp 2N - 1; để lên Cấp Lâu Đài Lẻ (Lv.2N + 1), hệ thống LUÔN LUÔN yêu cầu Viện Nghiên Cứu (Research Cottage) và Bệnh Viện (Hospital) đạt cấp 2N.",
                en: "Castle upgrade prerequisites from Lv.10 to Lv.40 obey an absolute Alternating Even–Odd Rule: Reaching an Even Castle Level (Lv.2N) ALWAYS requires Guild and Training Ground at level 2N - 1; reaching an Odd Castle Level (Lv.2N + 1) ALWAYS requires Research Cottage and Hospital at level 2N.",
              },
            },
            {
              type: "visual_diagram",
              mediaCode: "MED-8.1-01",
              variant: "decision_flow",
              title: {
                vi: "Sơ đồ Luân Phiên Điều Kiện Chẵn / Lẻ & 4 Điểm Gãy Sức Mạnh Lâu Đài",
                en: "Alternating Even / Odd Prerequisite Flowchart & 4 Lethal Castle Breakpoints",
              },
              subtitle: {
                vi: "Đồng bộ Thợ 1 (Lâu Đài) và Thợ 2 (Công trình tiên quyết kế tiếp) để triệt tiêu 100% thời gian chờ",
                en: "Synchronize Builder 1 (Castle) and Builder 2 (Next Prerequisite) to eliminate 100% of idle waiting time",
              },
              branches: [
                {
                  tone: "emerald",
                  badge: {
                    vi: "QUY LUẬT CẤP LẺ (2N+1)",
                    en: "ODD LEVEL RULE (2N+1)",
                  },
                  title: {
                    vi: "Lên Lâu Đài LẺ (Lv.15, 17... 35, 39)",
                    en: "Upgrading to ODD Castle (Lv.15, 17... 35, 39)",
                  },
                  steps: [
                    {
                      id: "step-odd-prereq",
                      title: {
                        vi: "Điều kiện Bắt buộc: Viện Nghiên Cứu + Bệnh Viện (Cấp 2N)",
                        en: "Mandatory Prereq: Research Cottage + Hospital (Lv.2N)",
                      },
                      subtitle: {
                        vi: "Ví dụ: Muốn lên Lâu Đài Lv.35 bắt buộc phải có Research Cottage (34) + Hospital (34).",
                        en: "Example: Upgrading to Castle Lv.35 strictly requires Research Cottage (34) + Hospital (34).",
                      },
                    },
                    {
                      id: "step-odd-prebuild",
                      title: {
                        vi: "Hành động Thợ 2: Xây sẵn Hội + Sân Tập cho cấp Chẵn kế tiếp",
                        en: "Builder 2 Action: Pre-build Guild + Training Ground for next Even level",
                      },
                      subtitle: {
                        vi: "Ngay khi bấm Lâu Đài Lẻ, chuyển Thợ 2 sang nâng Guild + Training Ground để đón đầu cấp Chẵn.",
                        en: "As soon as the Odd Castle upgrade starts, assign Builder 2 to Guild + Training Ground for the upcoming Even level.",
                      },
                    },
                  ],
                  outcome: {
                    vi: "Sẵn sàng bấm ngay Lâu Đài Chẵn (Lv.2N) mà không tốn 1 giây chờ điều kiện.",
                    en: "Ready to launch the next Even Castle (Lv.2N) with zero prerequisite waiting time.",
                  },
                },
                {
                  tone: "gold",
                  badge: {
                    vi: "QUY LUẬT CẤP CHẴN (2N)",
                    en: "EVEN LEVEL RULE (2N)",
                  },
                  title: {
                    vi: "Lên Lâu Đài CHẴN (Lv.16, 18... 36, 40)",
                    en: "Upgrading to EVEN Castle (Lv.16, 18... 36, 40)",
                  },
                  steps: [
                    {
                      id: "step-even-prereq",
                      title: {
                        vi: "Điều kiện Bắt buộc: Hội (Guild) + Sân Tập (Training Ground) (Cấp 2N-1)",
                        en: "Mandatory Prereq: Guild + Training Ground (Lv.2N-1)",
                      },
                      subtitle: {
                        vi: "Ví dụ: Muốn lên Lâu Đài Lv.40 bắt buộc phải có Guild (39) + Training Ground (39).",
                        en: "Example: Upgrading to Castle Lv.40 strictly requires Guild (39) + Training Ground (39).",
                      },
                    },
                    {
                      id: "step-even-prebuild",
                      title: {
                        vi: "Hành động Thợ 2: Xây sẵn Viện NC + Bệnh Viện cho cấp Lẻ kế tiếp",
                        en: "Builder 2 Action: Pre-build Research Cottage + Hospital for next Odd level",
                      },
                      subtitle: {
                        vi: "Khép kín vòng lặp luân phiên Chẵn/Lẻ không bao giờ đứt quãng từ Lv.10 đến Lv.40.",
                        en: "Completes the unbroken Even/Odd alternating loop from Lv.10 all the way to Lv.40.",
                      },
                    },
                  ],
                  outcome: {
                    vi: "Sẵn sàng bấm ngay Lâu Đài Lẻ (Lv.2N+1) vào đúng ngày sự kiện Thứ Hai.",
                    en: "Ready to launch the next Odd Castle (Lv.2N+1) right on Monday event day.",
                  },
                },
                {
                  tone: "emerald",
                  badge: {
                    vi: "4 ĐIỂM GÃY SINH TỬ",
                    en: "4 LETHAL BREAKPOINTS",
                  },
                  title: {
                    vi: "4 Cột Mốc Đột Phá Sức Mạnh Toàn Trình",
                    en: "4 Master Progression Power Breakpoints",
                  },
                  steps: [
                    {
                      id: "step-bp-25-30",
                      title: {
                        vi: "Lv.25 (Lính T8, Lord Hall, Medal Hall) ➔ Lv.30 (Trần Lv.170, Lính T9, Soul Stone)",
                        en: "Lv.25 (T8 Troops, Lord Hall, Medal Hall) ➔ Lv.30 (Cap Lv.170, T9 Troops, Soul Stone)",
                      },
                      subtitle: {
                        vi: "Mốc Lv.25 mở Sảnh Lãnh Chúa & Huân Chương; mốc Lv.30 nhảy +10 cấp tướng (Lv.160 ➔ Lv.170).",
                        en: "Lv.25 unlocks Lord Hall & Medal Hall; Lv.30 grants a +10 Hero Level surge (Lv.160 ➔ Lv.170).",
                      },
                    },
                    {
                      id: "step-bp-35-40",
                      title: {
                        vi: "Lv.35 (ĐIỂM GÃY SỐ 1: Trần Lv.195 & Lính Bậc 10 / T10) ➔ Lv.40 (Trần Lv.220 & Brilliance)",
                        en: "Lv.35 (BREAKPOINT #1: Cap Lv.195 & Tier 10 Troops / T10) ➔ Lv.40 (Cap Lv.220 & Brilliance)",
                      },
                      subtitle: {
                        vi: "Lv.35 mở khóa Tier 10 Troops chỉ với ~82M Gỗ/Đá tích lũy; Lv.40 mở Kỷ nguyên Quang Huy (DE-Dust).",
                        en: "Lv.35 unlocks Tier 10 Troops for just ~82M cumulative Timber/Stone; Lv.40 unlocks the Brilliance Era (DE-Dust).",
                      },
                    },
                  ],
                  outcome: {
                    vi: "Mở khóa Lính T10 tại Lv.35 và tiến thẳng vào Viện Huy Hoàng (5,422 DE mở Lính T11).",
                    en: "Unlocks Tier 10 Troops at Lv.35 and transitions into the Brilliance Institute (5,422 DE for Tier 11 Troops).",
                  },
                },
              ],
            },
          ],
        },
        {
          id: "sub-4-2-castle-lv10-to-lv40-master-table",
          title: {
            vi: "4.2. Bảng Tra Cứu Toàn Trình Nâng Cấp Lâu Đài (Lv.10 ➔ Lv.40) & Trần Cấp Tướng",
            en: "4.2. Complete Castle Upgrade Master Table (Lv.10 ➔ Lv.40) & Hero Level Caps",
          },
          blocks: [
            {
              type: "paragraph",
              text: {
                vi: "Nguồn dữ liệu: Trích xuất chính xác từ TopHeroes Tables - Max — Tab 🏰Castle & 👤Heroes. Lưu ý: Lượng tài nguyên thực tế giảm ~5% khi nâng công nghệ Tool Improvement I; thời gian xây dựng thực tế được cắt giảm nhờ Bard (+40% Construction Rate — Tướng Vàng Liên Minh, kích hoạt thụ động không cần ra trận), Dân làng, Công nghệ Bang, VIP và Chức vụ Vương quốc, trong khi thời gian nghiên cứu tại Viện Nghiên Cứu được cắt giảm nhờ Brawler (+30% Tech Research Rate) và Shaman (+40% Tech Research Rate).",
                en: "Data Source: Extracted verbatim from TopHeroes Tables - Max — 🏰Castle & 👤Heroes tabs. Note: Actual resource costs drop by ~5% with Tool Improvement I tech; build times are reduced by Bard (+40% Construction Rate — League Legendary hero, passive in-town effect), Villagers, Guild Tech, VIP, and Server Titles, whereas Research Cottage timers are reduced by Brawler (+30% Tech Research Rate) and Shaman (+40% Tech Research Rate).",
              },
            },
            {
              type: "table",
              caption: {
                vi: "Bảng 4.2: Định mức Nâng cấp Lâu Đài Toàn trình (Lv.10 ➔ Lv.40), Công trình Tiên quyết & Trần Cấp Tướng (32 Hàng)",
                en: "Table 4.2: Full Castle Upgrade Master Table (Lv.10 ➔ Lv.40), Prerequisites & Hero Level Caps (32 Rows)",
              },
              headers: [
                {
                  vi: "Cấp Lâu Đài (Castle Level)",
                  en: "Castle Level",
                },
                {
                  vi: "Công trình Tiên quyết Bắt buộc (Prerequisite Buildings)",
                  en: "Mandatory Prerequisite Buildings",
                },
                {
                  vi: "Chi phí Gỗ / Đá (Timber / Stone)",
                  en: "Timber / Stone Cost",
                },
                {
                  vi: "Chi phí Ruby (Rubies)",
                  en: "Ruby Cost",
                },
                {
                  vi: "Trần Cấp Tướng (Hero Level Cap)",
                  en: "Hero Level Cap",
                },
                {
                  vi: "Mốc Mở khóa Chiến lược & Bậc Lính (Strategic Unlocks)",
                  en: "Strategic Unlocks & Troop Tiers",
                },
              ],
              rows: [
                [
                  { vi: "Lv.10", en: "Lv.10" },
                  { vi: "Guild (4), Training Ground (4)", en: "Guild (4), Training Ground (4)" },
                  { vi: "75K", en: "75K" },
                  { vi: "—", en: "—" },
                  { vi: "Lv.60", en: "Lv.60" },
                  { vi: "Mở khóa khung cơ bản đầu game", en: "Unlocks early-game core town framework" },
                ],
                [
                  { vi: "Lv.11", en: "Lv.11" },
                  { vi: "Research Cottage (6), Hospital (6)", en: "Research Cottage (6), Hospital (6)" },
                  { vi: "130K", en: "130K" },
                  { vi: "—", en: "—" },
                  { vi: "Lv.65", en: "Lv.65" },
                  { vi: "—", en: "—" },
                ],
                [
                  { vi: "Lv.12", en: "Lv.12" },
                  { vi: "Guild (7), Training Ground (7)", en: "Guild (7), Training Ground (7)" },
                  { vi: "225K", en: "225K" },
                  { vi: "—", en: "—" },
                  { vi: "Lv.70", en: "Lv.70" },
                  { vi: "—", en: "—" },
                ],
                [
                  { vi: "Lv.13", en: "Lv.13" },
                  { vi: "Research Cottage (9), Hospital (9)", en: "Research Cottage (9), Hospital (9)" },
                  { vi: "330K", en: "330K" },
                  { vi: "—", en: "—" },
                  { vi: "Lv.75", en: "Lv.75" },
                  { vi: "—", en: "—" },
                ],
                [
                  { vi: "Lv.14", en: "Lv.14" },
                  { vi: "Guild (11), Training Ground (11)", en: "Guild (11), Training Ground (11)" },
                  { vi: "485K", en: "485K" },
                  { vi: "—", en: "—" },
                  { vi: "Lv.80", en: "Lv.80" },
                  { vi: "—", en: "—" },
                ],
                [
                  { vi: "Lv.15", en: "Lv.15" },
                  { vi: "Research Cottage (13), Hospital (13)", en: "Research Cottage (13), Hospital (13)" },
                  { vi: "700K", en: "700K" },
                  { vi: "—", en: "—" },
                  { vi: "Lv.90 (+10)", en: "Lv.90 (+10)" },
                  { vi: "Mở khóa Lính Bậc 6 (T6) khi Doanh trại đạt Lv.15", en: "Unlocks Tier 6 Troops (T6) when Barracks reaches Lv.15" },
                ],
                [
                  { vi: "Lv.16", en: "Lv.16" },
                  { vi: "Guild (14), Training Ground (14)", en: "Guild (14), Training Ground (14)" },
                  { vi: "800K", en: "800K" },
                  { vi: "—", en: "—" },
                  { vi: "Lv.95", en: "Lv.95" },
                  { vi: "—", en: "—" },
                ],
                [
                  { vi: "Lv.17", en: "Lv.17" },
                  { vi: "Research Cottage (16), Hospital (15)", en: "Research Cottage (16), Hospital (15)" },
                  { vi: "1.00M", en: "1.00M" },
                  { vi: "—", en: "—" },
                  { vi: "Lv.100", en: "Lv.100" },
                  { vi: "—", en: "—" },
                ],
                [
                  { vi: "Lv.18", en: "Lv.18" },
                  { vi: "Guild (17), Training Ground (16)", en: "Guild (17), Training Ground (16)" },
                  { vi: "1.10M", en: "1.10M" },
                  { vi: "—", en: "—" },
                  { vi: "Lv.105", en: "Lv.105" },
                  { vi: "—", en: "—" },
                ],
                [
                  { vi: "Lv.19", en: "Lv.19" },
                  { vi: "Research Cottage (18), Hospital (18)", en: "Research Cottage (18), Hospital (18)" },
                  { vi: "1.18M", en: "1.18M" },
                  { vi: "19,950", en: "19,950" },
                  { vi: "Lv.110", en: "Lv.110" },
                  { vi: "Bắt đầu tiêu tốn Ruby khi nâng cấp Lâu Đài", en: "Castle upgrades begin requiring Rubies" },
                ],
                [
                  { vi: "Lv.20", en: "Lv.20" },
                  { vi: "Guild (19), Training Ground (19)", en: "Guild (19), Training Ground (19)" },
                  { vi: "1.42M", en: "1.42M" },
                  { vi: "22,800", en: "22,800" },
                  { vi: "Lv.115", en: "Lv.115" },
                  { vi: "Mở khóa Lính Bậc 7 (T7); Viện NC Lv.20 mở Arms Race Prep", en: "Unlocks Tier 7 Troops (T7); Research Cottage Lv.20 unlocks Arms Race Prep" },
                ],
                [
                  { vi: "Lv.21", en: "Lv.21" },
                  { vi: "Research Cottage (20), Hospital (20)", en: "Research Cottage (20), Hospital (20)" },
                  { vi: "1.56M", en: "1.56M" },
                  { vi: "55,100", en: "55,100" },
                  { vi: "Lv.120", en: "Lv.120" },
                  { vi: "—", en: "—" },
                ],
                [
                  { vi: "Lv.22", en: "Lv.22" },
                  { vi: "Guild (21), Training Ground (21)", en: "Guild (21), Training Ground (21)" },
                  { vi: "1.66M", en: "1.66M" },
                  { vi: "95,000", en: "95,000" },
                  { vi: "Lv.125", en: "Lv.125" },
                  { vi: "—", en: "—" },
                ],
                [
                  { vi: "Lv.23", en: "Lv.23" },
                  { vi: "Research Cottage (22), Hospital (22)", en: "Research Cottage (22), Hospital (22)" },
                  { vi: "1.90M", en: "1.90M" },
                  { vi: "98,800", en: "98,800" },
                  { vi: "Lv.130", en: "Lv.130" },
                  { vi: "—", en: "—" },
                ],
                [
                  { vi: "Lv.24", en: "Lv.24" },
                  { vi: "Guild (23), Training Ground (23)", en: "Guild (23), Training Ground (23)" },
                  { vi: "2.18M", en: "2.18M" },
                  { vi: "123K", en: "123K" },
                  { vi: "Lv.135", en: "Lv.135" },
                  { vi: "—", en: "—" },
                ],
                [
                  { vi: "Lv.25", en: "Lv.25" },
                  { vi: "Research Cottage (24), Hospital (24)", en: "Research Cottage (24), Hospital (24)" },
                  { vi: "3.04M", en: "3.04M" },
                  { vi: "142K", en: "142K" },
                  { vi: "Lv.140", en: "Lv.140" },
                  { vi: "Mở Lính Bậc 8 (T8), Sảnh Lãnh Chúa (Lord Hall), Sảnh Huân Chương (Medal Hall)", en: "Unlocks Tier 8 Troops (T8), Lord Hall, and Medal Hall" },
                ],
                [
                  { vi: "Lv.26", en: "Lv.26" },
                  { vi: "Guild (25), Training Ground (25)", en: "Guild (25), Training Ground (25)" },
                  { vi: "2.94M", en: "2.94M" },
                  { vi: "218K", en: "218K" },
                  { vi: "Lv.145", en: "Lv.145" },
                  { vi: "—", en: "—" },
                ],
                [
                  { vi: "Lv.27", en: "Lv.27" },
                  { vi: "Research Cottage (26), Hospital (26)", en: "Research Cottage (26), Hospital (26)" },
                  { vi: "3.32M", en: "3.32M" },
                  { vi: "275K", en: "275K" },
                  { vi: "Lv.150", en: "Lv.150" },
                  { vi: "—", en: "—" },
                ],
                [
                  { vi: "Lv.28", en: "Lv.28" },
                  { vi: "Guild (27), Training Ground (27)", en: "Guild (27), Training Ground (27)" },
                  { vi: "3.99M", en: "3.99M" },
                  { vi: "475K", en: "475K" },
                  { vi: "Lv.155", en: "Lv.155" },
                  { vi: "—", en: "—" },
                ],
                [
                  { vi: "Lv.29", en: "Lv.29" },
                  { vi: "Research Cottage (28), Hospital (28)", en: "Research Cottage (28), Hospital (28)" },
                  { vi: "5.22M", en: "5.22M" },
                  { vi: "703K", en: "703K" },
                  { vi: "Lv.160", en: "Lv.160" },
                  { vi: "—", en: "—" },
                ],
                [
                  { vi: "Lv.30", en: "Lv.30" },
                  { vi: "Guild (29), Training Ground (29)", en: "Guild (29), Training Ground (29)" },
                  { vi: "6.74M", en: "6.74M" },
                  { vi: "1.29M", en: "1.29M" },
                  { vi: "Lv.170 (+10)", en: "Lv.170 (+10)" },
                  { vi: "Mở Lính Bậc 9 (T9) & Mở bán Hồn Đá Đỏ (Soul Stone)", en: "Unlocks Tier 9 Troops (T9) & Soul Stone availability" },
                ],
                [
                  { vi: "Lv.31", en: "Lv.31" },
                  { vi: "Research Cottage (30), Hospital (30)", en: "Research Cottage (30), Hospital (30)" },
                  { vi: "7.12M", en: "7.12M" },
                  { vi: "1.97M", en: "1.97M" },
                  { vi: "Lv.175", en: "Lv.175" },
                  { vi: "—", en: "—" },
                ],
                [
                  { vi: "Lv.32", en: "Lv.32" },
                  { vi: "Guild (31), Training Ground (31)", en: "Guild (31), Training Ground (31)" },
                  { vi: "10.9M", en: "10.9M" },
                  { vi: "2.47M", en: "2.47M" },
                  { vi: "Lv.180", en: "Lv.180" },
                  { vi: "—", en: "—" },
                ],
                [
                  { vi: "Lv.33", en: "Lv.33" },
                  { vi: "Research Cottage (32), Hospital (32)", en: "Research Cottage (32), Hospital (32)" },
                  { vi: "14.7M", en: "14.7M" },
                  { vi: "3.51M", en: "3.51M" },
                  { vi: "Lv.185", en: "Lv.185" },
                  { vi: "—", en: "—" },
                ],
                [
                  { vi: "Lv.34", en: "Lv.34" },
                  { vi: "Guild (33), Training Ground (33)", en: "Guild (33), Training Ground (33)" },
                  { vi: "20.9M", en: "20.9M" },
                  { vi: "4.46M", en: "4.46M" },
                  { vi: "Lv.190", en: "Lv.190" },
                  { vi: "Bước đệm chuẩn bị tích Tăng tốc cho Điểm gãy Lv.35", en: "Staging level to hoard Speed-ups for the Lv.35 Breakpoint" },
                ],
                [
                  { vi: "🔥 Lv.35", en: "🔥 Lv.35" },
                  { vi: "Research Cottage (34), Hospital (34)", en: "Research Cottage (34), Hospital (34)" },
                  { vi: "26.6M", en: "26.6M" },
                  { vi: "8.36M", en: "8.36M" },
                  { vi: "Lv.195", en: "Lv.195" },
                  { vi: "ĐIỂM GÃY SINH TỬ: Mở khóa Lính Bậc 10 (Tier 10 Troops)!", en: "LETHAL BREAKPOINT: Unlocks Tier 10 Troops (T10)!" },
                ],
                [
                  { vi: "Lv.36", en: "Lv.36" },
                  { vi: "Guild (35), Training Ground (35)", en: "Guild (35), Training Ground (35)" },
                  { vi: "36.1M", en: "36.1M" },
                  { vi: "12.3M", en: "12.3M" },
                  { vi: "Lv.200", en: "Lv.200" },
                  { vi: "—", en: "—" },
                ],
                [
                  { vi: "Lv.37", en: "Lv.37" },
                  { vi: "Research Cottage (36), Hospital (36)", en: "Research Cottage (36), Hospital (36)" },
                  { vi: "52.2M", en: "52.2M" },
                  { vi: "16.9M", en: "16.9M" },
                  { vi: "Lv.205", en: "Lv.205" },
                  { vi: "—", en: "—" },
                ],
                [
                  { vi: "Lv.38", en: "Lv.38" },
                  { vi: "Guild (37), Training Ground (37)", en: "Guild (37), Training Ground (37)" },
                  { vi: "78.8M", en: "78.8M" },
                  { vi: "25.2M", en: "25.2M" },
                  { vi: "Lv.210", en: "Lv.210" },
                  { vi: "—", en: "—" },
                ],
                [
                  { vi: "Lv.39", en: "Lv.39" },
                  { vi: "Research Cottage (38), Hospital (38)", en: "Research Cottage (38), Hospital (38)" },
                  { vi: "111M", en: "111M" },
                  { vi: "36.6M", en: "36.6M" },
                  { vi: "Lv.215", en: "Lv.215" },
                  { vi: "—", en: "—" },
                ],
                [
                  { vi: "👑 Lv.40", en: "👑 Lv.40" },
                  { vi: "Guild (39), Training Ground (39)", en: "Guild (39), Training Ground (39)" },
                  { vi: "139M", en: "139M" },
                  { vi: "51.8M", en: "51.8M" },
                  { vi: "Lv.220", en: "Lv.220" },
                  { vi: "Chạm trần Tiền Quang Huy; mở khóa Brilliance Levels", en: "Pre-Brilliance cap reached; unlocks Brilliance Levels" },
                ],
                [
                  { vi: "TỔNG CỘNG", en: "TOTAL (Lv.10 ➔ Lv.40)" },
                  { vi: "Toàn trình Lv.10 ➔ Lv.40", en: "Cumulative Lv.10 ➔ Lv.40" },
                  { vi: "~490M – 500M", en: "~490M – 500M" },
                  { vi: "~165M", en: "~165M" },
                  { vi: "Lv.220", en: "Lv.220" },
                  { vi: "Hoàn tất nền tảng Lâu Đài cơ bản", en: "Completes base Castle progression" },
                ],
              ],
            },
          ],
        },
        {
          id: "sub-4-3-lv35-t10-lethal-breakpoint-analysis",
          title: {
            vi: "4.3. Giải mã Điểm Gãy Sinh Tử: Lâu Đài Lv.35 + Doanh Trại Lv.35 = Lính Bậc 10 (T10)",
            en: "4.3. Decoding the Lethal Breakpoint: Castle Lv.35 + Barracks Lv.35 = Tier 10 Troops (T10)",
          },
          blocks: [
            {
              type: "list",
              ordered: true,
              items: [
                {
                  vi: "Chi phí từ Lv.35 lên Lv.40 đắt gấp 3.5 lần tổng chi phí từ Lv.1 đến Lv.35 cộng lại: Nhìn vào bảng số liệu trên, tổng lượng Gỗ/Đá từ Lv.10 đến Lv.35 chỉ tốn khoảng ~82M, nhưng chỉ riêng 5 cấp cuối (Lv.36 ➔ Lv.40) ngốn tới ~417M Gỗ/Đá và ~142.8M Ruby!",
                  en: "Upgrading from Lv.35 to Lv.40 costs 3.5x more than Lv.1 to Lv.35 combined: As shown in the master table, cumulative Timber/Stone from Lv.10 to Lv.35 is only ~82M, whereas the final 5 levels alone (Lv.36 ➔ Lv.40) devour ~417M Timber/Stone and ~142.8M Rubies!",
                },
                {
                  vi: "Doanh Trại Lv.36 ➔ Lv.40 KHÔNG mở khóa Bậc Lính mới: Lính Bậc 10 (Tier 10 Troops) mở khóa ngay tại Doanh Trại Lv.35 (khi Lâu Đài đạt Lv.35). Từ Lv.36 đến Lv.40, bạn chỉ nhận được thêm cấp độ tướng (Lv.195 ➔ Lv.220), trong khi Lính Bậc 11 (Tier 11 Troops) phải đợi sang tận giai đoạn Viện Huy Hoàng (Brilliance Institute) ở Season 1+!",
                  en: "Barracks Lv.36 ➔ Lv.40 DO NOT unlock a new Troop Tier: Tier 10 Troops unlock right at Barracks Lv.35 (when Castle hits Lv.35). From Lv.36 to Lv.40, you only gain Hero Level Cap increases (Lv.195 ➔ Lv.220), while Tier 11 Troops wait until the Brilliance Institute in Season 1+!",
                },
                {
                  vi: "Chiến thuật Thực thi: Khi tài khoản chạm mốc Lv.32 – Lv.33, hãy ngừng hoàn toàn việc tiêu Gỗ/Đá/Ruby/Tăng tốc vào các công trình phụ. Dồn 100% Rương Tài Nguyên và Tăng tốc Xây dựng để đẩy một mạch qua mốc Lâu Đài Lv.35 + Doanh Trại Hệ Đội 1 Lv.35, sau đó dùng kỹ thuật Thăng cấp Lính Bậc Thang (T9 ➔ T10) vào đúng Thứ Sáu Tuần B (Arms Race Day 5).",
                  en: "Execution Protocol: Once your account hits Lv.32 – Lv.33, halt all Timber/Stone/Ruby/Speed-up spending on side buildings. Funnel 100% of your Resource Chests and Construction Speed-ups to blast straight through Castle Lv.35 + Queue 1 Main Barracks Lv.35, then execute Ladder Troop Promotion (T9 ➔ T10) on Friday Week B (Arms Race Day 5).",
                },
              ],
            },
            {
              type: "media_spotlight",
              mediaCode: "MED-8.1-02",
              tier: "tier2_annotated_ui",
              title: {
                vi: "Giao diện Đột phá Lâu Đài Lv.35 & Mở khóa Lính Bậc 10 (Tier 10 Troops)",
                en: "Castle Lv.35 Breakthrough UI & Tier 10 Troops Unlock Panel",
              },
              description: {
                vi: "Chú thích 3 thông số kiểm toán trước khi bấm nâng cấp Lâu Đài Lv.34 ➔ Lv.35 và Doanh Trại Lv.35.",
                en: "Annotated 3-point audit before clicking Castle Lv.34 ➔ Lv.35 and Main Barracks Lv.35.",
              },
              annotations: [
                {
                  kind: "info",
                  label: {
                    vi: "Điều kiện Cấp Lẻ Lv.35: Research Cottage (34) + Hospital (34)",
                    en: "Odd Lv.35 Prerequisite: Research Cottage (34) + Hospital (34)",
                  },
                  detail: {
                    vi: "Kiểm tra Thợ 2 đã hoàn tất Viện Nghiên Cứu Lv.34 và Bệnh Viện Lv.34 kèm 26.6M Gỗ/Đá + 8.36M Ruby.",
                    en: "Confirm Builder 2 has completed Research Cottage Lv.34 and Hospital Lv.34 alongside 26.6M Timber/Stone + 8.36M Rubies.",
                  },
                },
                {
                  kind: "do",
                  label: {
                    vi: "Mở khóa Lính Bậc 10 (Tier 10 Troops) tại Doanh Trại Lv.35",
                    en: "Tier 10 Troops Unlock at Main Barracks Lv.35",
                  },
                  detail: {
                    vi: "Đẩy Doanh Trại Hệ Đội 1 lên Lv.35 ngay lập tức để kích hoạt bậc lính mạnh nhất giai đoạn Tiền Quang Huy.",
                    en: "Push Queue 1 Main Barracks to Lv.35 immediately to unlock the strongest pre-Brilliance troop tier.",
                  },
                },
                {
                  kind: "do",
                  label: {
                    vi: "Kích hoạt Bard (+40% Construction Rate) trước giây bấm nút",
                    en: "Verify Bard (+40% Construction Rate) Before Clicking Upgrade",
                  },
                  detail: {
                    vi: "Đảm bảo nội tại Bard (+40%), VIP, Công nghệ Bang và Chức vụ Vương quốc đã kích hoạt để cắt giảm tối đa thời gian xây.",
                    en: "Ensure Bard (+40% passive), VIP, Guild Tech, and Server Title buffs are active to slash base build duration.",
                  },
                },
              ],
            },
          ],
        },
        {
          id: "sub-4-4-brilliance-b1-to-b6-and-t11-institute",
          title: {
            vi: "4.4. Kỷ nguyên Quang Huy (Brilliance Levels B1 ➔ B6) & Viện Huy Hoàng (Season 1+)",
            en: "4.4. The Brilliance Era (Brilliance Levels B1 ➔ B6) & Brilliance Institute (Season 1+)",
          },
          blocks: [
            {
              type: "paragraph",
              text: {
                vi: "Sau khi Lâu Đài đạt Lv.40 và máy chủ bước vào Season 1+, hệ thống hạ tầng chuyển sang sử dụng tài nguyên quý hiếm Tinh Chất Rồng / Bụi Rồng (Dragon Essence / DE-Dust). Mỗi bậc Quang Huy (Brilliance Level 1 ➔ 6) được chia làm 5 tiểu cấp (tương ứng trên bảng dữ liệu là Level 41 đến Level 70):",
                en: "Once your Castle reaches Lv.40 and the server enters Season 1+, infrastructure progression shifts to the rare resource Dragon Essence (DE-Dust). Each Brilliance tier (Brilliance Level 1 ➔ 6) is divided into 5 sub-levels (corresponding to Levels 41 through 70 in the raw data tables):",
              },
            },
            {
              type: "table",
              caption: {
                vi: "Bảng 4.4: Định mức Tinh Chất Rồng (DE-Dust), Gỗ/Đá, Ruby & Trần Tướng Kỷ nguyên Quang Huy B1 ➔ B6 (7 Hàng)",
                en: "Table 4.4: Brilliance Era B1 ➔ B6 Dragon Essence (DE-Dust), Timber/Stone, Ruby & Hero Cap Master Table (7 Rows)",
              },
              headers: [
                {
                  vi: "Bậc Quang Huy (Brilliance Tier)",
                  en: "Brilliance Tier",
                },
                {
                  vi: "Tiểu cấp Tương ứng",
                  en: "Sub-Levels",
                },
                {
                  vi: "Công trình Tiên quyết ở Tiểu cấp Đầu tiên",
                  en: "First Sub-Level Prerequisites",
                },
                {
                  vi: "DE-Dust mỗi Tiểu cấp",
                  en: "DE-Dust per Sub-Level",
                },
                {
                  vi: "Tổng DE-Dust (5 Tiểu cấp)",
                  en: "Total DE-Dust (5 Sub-Levels)",
                },
                {
                  vi: "Tổng Gỗ/Đá & Ruby Cả Bậc",
                  en: "Total Ruby & Timber/Stone",
                },
                {
                  vi: "Thưởng Đột phá Cấp Tướng",
                  en: "Hero Level Cap Breakthrough",
                },
              ],
              rows: [
                [
                  { vi: "Brilliance 1 (B1)", en: "Brilliance 1 (B1)" },
                  { vi: "Lv.41 ➔ Lv.45", en: "Lv.41 ➔ Lv.45" },
                  { vi: "Research Cottage (40), Hospital (40)", en: "Research Cottage (40), Hospital (40)" },
                  { vi: "126 DE", en: "126 DE" },
                  { vi: "630 DE", en: "630 DE" },
                  { vi: "91.2M Ruby / 531.8M Gỗ-Đá", en: "91.2M Rubies / 531.8M Timber-Stone" },
                  { vi: "Giữ ở Lv.220 (Mở nền tảng B1)", en: "Stays at Lv.220 (Unlocks B1 foundation)" },
                ],
                [
                  { vi: "Brilliance 2 (B2)", en: "Brilliance 2 (B2)" },
                  { vi: "Lv.46 ➔ Lv.50", en: "Lv.46 ➔ Lv.50" },
                  { vi: "League Barracks B1, Guild B1", en: "League Barracks B1, Guild B1" },
                  { vi: "151 DE", en: "151 DE" },
                  { vi: "755 DE", en: "755 DE" },
                  { vi: "156.9M Ruby / 913M Gỗ-Đá", en: "156.9M Rubies / 913M Timber-Stone" },
                  { vi: "+5 Cấp Tướng (Trần Lv.225)", en: "+5 Hero Levels (Cap Lv.225)" },
                ],
                [
                  { vi: "Brilliance 3 (B3)", en: "Brilliance 3 (B3)" },
                  { vi: "Lv.51 ➔ Lv.55", en: "Lv.51 ➔ Lv.55" },
                  { vi: "Horde Barracks B1, Hospital B1", en: "Horde Barracks B1, Hospital B1" },
                  { vi: "227 DE", en: "227 DE" },
                  { vi: "1,135 DE", en: "1,135 DE" },
                  { vi: "205M Ruby / 1,196M Gỗ-Đá", en: "205M Rubies / 1,196M Timber-Stone" },
                  { vi: "Giữ ở Lv.225", en: "Stays at Lv.225" },
                ],
                [
                  { vi: "Brilliance 4 (B4)", en: "Brilliance 4 (B4)" },
                  { vi: "Lv.56 ➔ Lv.60", en: "Lv.56 ➔ Lv.60" },
                  { vi: "Nature Barracks B3, Guild B3", en: "Nature Barracks B3, Guild B3" },
                  { vi: "303 DE", en: "303 DE" },
                  { vi: "1,515 DE", en: "1,515 DE" },
                  { vi: "199.5M Ruby / 580M Gỗ-Đá", en: "199.5M Rubies / 580M Timber-Stone" },
                  { vi: "+5 Cấp Tướng (Trần Lv.230)", en: "+5 Hero Levels (Cap Lv.230)" },
                ],
                [
                  { vi: "Brilliance 5 (B5)", en: "Brilliance 5 (B5)" },
                  { vi: "Lv.61 ➔ Lv.65", en: "Lv.61 ➔ Lv.65" },
                  { vi: "Hospital B4, Any Barracks B4", en: "Hospital B4, Any Barracks B4" },
                  { vi: "388 DE", en: "388 DE" },
                  { vi: "1,940 DE", en: "1,940 DE" },
                  { vi: "228M Ruby / 665M Gỗ-Đá", en: "228M Rubies / 665M Timber-Stone" },
                  { vi: "Giữ ở Lv.230", en: "Stays at Lv.230" },
                ],
                [
                  { vi: "Brilliance 6 (B6)", en: "Brilliance 6 (B6)" },
                  { vi: "Lv.66 ➔ Lv.70", en: "Lv.66 ➔ Lv.70" },
                  { vi: "Hospital B5, Any Barracks B5", en: "Hospital B5, Any Barracks B5" },
                  { vi: "485 DE", en: "485 DE" },
                  { vi: "2,425 DE", en: "2,425 DE" },
                  { vi: "358.2M Ruby / 1,046M Gỗ-Đá", en: "358.2M Rubies / 1,046M Timber-Stone" },
                  { vi: "+5 Cấp Tướng (Trần Lv.235)", en: "+5 Hero Levels (Cap Lv.235)" },
                ],
                [
                  { vi: "TỔNG CỘNG (B1–B6)", en: "TOTAL (B1–B6)" },
                  { vi: "Lv.41 ➔ Lv.70", en: "Lv.41 ➔ Lv.70" },
                  { vi: "Toàn trình 6 Bậc Quang Huy", en: "Full 6 Brilliance Tiers" },
                  { vi: "—", en: "—" },
                  { vi: "8,400 DE", en: "8,400 DE" },
                  { vi: "1,238.8M Ruby / 4,931.8M Gỗ-Đá", en: "1,238.8M Rubies / 4,931.8M Timber-Stone" },
                  { vi: "Trần Tướng Lv.235", en: "Hero Level Cap Lv.235" },
                ],
              ],
            },
            {
              type: "callout",
              variant: "tip",
              title: {
                vi: "💡 Bí mật Tối ưu Tinh Chất Rồng (5,422 DE) để mở khóa Lính Bậc 11 (Tier 11 Troops)",
                en: "💡 Dragon Essence Secret (5,422 DE) to Unlock Tier 11 Troops (T11)",
              },
              content: {
                vi: "Theo dữ liệu kiểm chứng từ TopHeroes Tables - Max (♾️DE-Dust), người chơi KHÔNG CẦN nâng Lâu Đài lên tận Brilliance 3 (B3) để nâng Viện Huy Hoàng (Brilliance Institute — BI) lên mốc tối đa Lv.15 (B3)! Chi phí xây dựng Viện Huy Hoàng từ Lv.1 ➔ Lv.15 chỉ tốn tổng cộng 745 Dragon Essence (32 DE/cấp từ Lv.1–6; 57 DE/cấp từ Lv.7–11; 67 DE/cấp từ Lv.12–15) và 1,375M Gỗ/Đá. Kết hợp với 4,677 Dragon Essence cho các nhánh nghiên cứu bắt buộc trong Viện Huy Hoàng (đến node Soldier Level ở BI Lv.15 tốn 288 DE), tổng cộng bạn chỉ cần 5,422 Dragon Essence để mở khóa Lính Bậc 11 (Tier 11 Troops) — rẻ hơn rất nhiều so với việc đốt 8,400 DE vào vỏ Lâu Đài!",
                en: "According to verified data from TopHeroes Tables - Max (♾️DE-Dust), you DO NOT need to push your Castle to Brilliance 3 (B3) to upgrade the Brilliance Institute (BI) to Lv.15 (B3)! Building the Brilliance Institute from Lv.1 ➔ Lv.15 costs only 745 Dragon Essence (32 DE/lv for Lv.1–6; 57 DE/lv for Lv.7–11; 67 DE/lv for Lv.12–15) and 1,375M Timber/Stone. Combined with 4,677 Dragon Essence for mandatory prerequisite tech inside the Brilliance Institute (including 288 DE for the Soldier Level node at BI Lv.15), you need only 5,422 Dragon Essence total to unlock Tier 11 Troops—far cheaper than burning 8,400 DE on the Castle shell!",
              },
            },
            {
              type: "media_spotlight",
              mediaCode: "MED-8.1-03",
              tier: "tier2_annotated_ui",
              title: {
                vi: "Đối chiếu Ngân sách 5,422 DE (Viện Huy Hoàng Lính T11) vs 8,400 DE (Vỏ Lâu Đài B1–B6)",
                en: "5,422 DE (Brilliance Institute T11 Path) vs. 8,400 DE (Castle Shell B1–B6) Budget Audit",
              },
              description: {
                vi: "Phân tách 3 cấu phần tiêu hao Tinh Chất Rồng (Dragon Essence) trong Season 1+.",
                en: "3-part Dragon Essence (DE-Dust) expenditure breakdown in Season 1+.",
              },
              annotations: [
                {
                  kind: "info",
                  label: {
                    vi: "Chi phí Xây dựng Viện Huy Hoàng Lv.1 ➔ Lv.15: 745 DE",
                    en: "Brilliance Institute Lv.1 ➔ Lv.15 Construction: 745 DE",
                  },
                  detail: {
                    vi: "32 DE/cấp (Lv.1–6) + 57 DE/cấp (Lv.7–11) + 67 DE/cấp (Lv.12–15) = 745 DE và 1,375M Gỗ/Đá.",
                    en: "32 DE/lv (Lv.1–6) + 57 DE/lv (Lv.7–11) + 67 DE/lv (Lv.12–15) = 745 DE and 1,375M Timber/Stone.",
                  },
                },
                {
                  kind: "do",
                  label: {
                    vi: "Đường Găng Nghiên cứu Mở khóa Node Soldier Level (T11): 4,677 DE",
                    en: "Critical-Path Tech to Soldier Level (T11) Node: 4,677 DE",
                  },
                  detail: {
                    vi: "Đi tối thiểu qua các node điều kiện tiên quyết và chốt node Soldier Level (288 DE) để nâng +1 Bậc Lính lên T11.",
                    en: "Follow minimum prerequisite levels and complete the Soldier Level node (288 DE) to gain +1 Troop Level (Tier 11 Troops).",
                  },
                },
                {
                  kind: "do",
                  label: {
                    vi: "Tổng Chi phí Mở Lính T11 = 5,422 DE (Tiết kiệm 2,978 DE so với Max Lâu Đài)",
                    en: "Total Tier 11 Unlock Cost = 5,422 DE (Saves 2,978 DE vs. Maxing Castle B1–B6)",
                  },
                  detail: {
                    vi: "Ưu tiên hoàn thành 5,422 DE lấy Lính T11 trước khi dồn 8,400 DE nâng vỏ Lâu Đài lên B6 (Lv.70).",
                    en: "Prioritize the 5,422 DE Tier 11 Troops unlock before committing 8,400 DE to max the Castle shell at B6 (Lv.70).",
                  },
                },
              ],
            },
            {
              type: "media_spotlight",
              mediaCode: "MED-8.1-04",
              tier: "tier4_youtube_ref",
              title: {
                vi: "Video Tham chiếu Quốc tế: Lộ trình Castle Rush Lv.35/Lv.40 & Tối ưu Dragon Essence Mở Lính T11",
                en: "International Reference Video: Castle Rush Lv.35/Lv.40 Roadmap & Dragon Essence T11 Optimization",
              },
              description: {
                vi: "Phân tích trực quan quy luật Chẵn/Lẻ, điểm gãy Lv.35 (Tier 10 Troops) và đường găng 5,422 DE trong Viện Huy Hoàng.",
                en: "Visual breakdown of the Even/Odd prerequisite rule, Lv.35 Tier 10 Troops breakpoint, and the 5,422 DE Brilliance Institute path.",
              },
              videoChannel: "Top Heroes Official & Community Strategy Hub",
              videoTitle: "Top Heroes Castle Level 1-40 Requirements, Brilliance Dragon Essence & T10/T11 Troops Guide",
              videoTimestamp: "03:45",
              videoUrl: "https://www.youtube.com/results?search_query=top+heroes+castle+40+brilliance+institute+dragon+essence+tier+11",
            },
          ],
        },
      ],
    },
    {
      id: "sec-5-day18-lv24-horde-pivot-castle-case-study",
      isPro: true,
      title: {
        vi: "5. Kịch bản Thực chiến Nâng cao (Case Study: Đột phá Lv.24 ➔ Lv.25 & Chuyển giao Hạ tầng Bộ Lạc Ngày 18–20)",
        en: "5. Advanced Combat Case Study (Lv.24 ➔ Lv.25 Breakthrough & Day 18–20 Horde Infrastructure Pivot)",
      },
      blocks: [
        {
          type: "case_study",
          badge: {
            vi: "CASE STUDY HẠ TẦNG & CHUYỂN GIAO BỘ LẠC",
            en: "INFRASTRUCTURE & HORDE PIVOT CASE STUDY",
          },
          title: {
            vi: "Tài khoản Ngày 18–20 (Lâu Đài Lv.24): Đột phá Mốc Lv.25 & Đảo Chiều Doanh Trại Đón Desert Prince",
            en: "Day 18–20 Account (Castle Lv.24): Breaking Lv.25 & Flipping Barracks Priority for Desert Prince",
          },
          profileSummary: {
            vi: "Tài khoản ở Giai đoạn Ngày 18–20 (Lâu Đài Lv.24, Doanh Trại Liên Minh Lv.24, Doanh Trại Bộ Lạc Lv.21, 3 Hàng đợi Thợ Xây) chuẩn bị bước vào kỳ Chuyển giao Bộ Lạc (Horde Pivot) từ Ngày 21 (Desert Prince) đến Ngày 41 (Witch).",
            en: "Account at Days 18–20 (Castle Lv.24, League Barracks Lv.24, Horde Barracks Lv.21, 3 Builder Queues) preparing for the Horde Pivot window from Day 21 (Desert Prince) through Day 41 (Witch).",
          },
          diagnostics: [
            {
              vi: "Nguy cơ kẹt mốc Lv.25: Tài khoản đang ở ngưỡng cửa đột phá Lv.24 ➔ Lv.25 (đòi Research Cottage 24 + Hospital 24). Nếu tiếp tục rải thợ xây nâng Mỏ Gỗ/Đá hoặc nâng Doanh Trại Thiên Nhiên, tài khoản sẽ bị chậm mốc Lv.25 (mất Lính T8 và mở muộn Sảnh Lãnh Chúa Lord Hall / Sảnh Huân Chương Medal Hall).",
              en: "Lv.25 Bottleneck Risk: The account sits at the Lv.24 ➔ Lv.25 threshold (requiring Research Cottage 24 + Hospital 24). Spreading builders across Timber/Stone mines or Nature Barracks delays Lv.25 (losing T8 Troops and delaying Lord Hall / Medal Hall unlocks).",
            },
            {
              vi: "Nguy cơ lệch pha Bậc Lính khi tướng Mythic ra mắt: Nếu không kéo Doanh Trại Bộ Lạc (đang ở Lv.21) đuổi theo kịp thời, khi Desert Prince (Ngày 21) và Storm Maiden (Ngày 27) xuất hiện, quân lính Bộ Lạc vẫn mắc kẹt ở Bậc 7 (T7).",
              en: "Troop Tier Desync on Mythic Release: Without pulling Horde Barracks (currently Lv.21) up in time, when Desert Prince (Day 21) and Storm Maiden (Day 27) launch, Horde troops remain stuck at Tier 7 (T7).",
            },
          ],
          recoverySteps: [
            {
              stepNumber: "01",
              title: {
                vi: "Đột phá mốc Lv.25 trong 48 giờ",
                en: "48-Hour Lv.25 Breakthrough",
              },
              detail: {
                vi: "Cắm Thợ 1 vào Doanh Trại Liên Minh (Lv.24 ➔ Lv.25) để lấy ngay Lính T8 gánh đội hình hiện tại; cắm Thợ 2 hoàn tất Research Cottage (24) + Hospital (24) rồi bấm thẳng Lâu Đài (Lv.24 ➔ Lv.25, tốn 3.04M Gỗ/Đá & 142K Ruby) vào ngày Thứ Hai Tuần B (Arms Race Day 1).",
                en: "Lock Builder 1 on League Barracks (Lv.24 ➔ Lv.25) to secure T8 Troops for the active lineup; use Builder 2 to finish Research Cottage (24) + Hospital (24) and launch Castle (Lv.24 ➔ Lv.25, costing 3.04M Timber/Stone & 142K Rubies) on Monday Week B (Arms Race Day 1).",
              },
            },
            {
              stepNumber: "02",
              title: {
                vi: "Xây dựng Công trình Mở mới ở Lv.25",
                en: "Construct New Lv.25 Buildings",
              },
              detail: {
                vi: "Ngay khi Lâu Đài lên Lv.25 (Trần Tướng Lv.140), đặt xây ngay Sảnh Lãnh Chúa (Lord Hall) và Sảnh Huân Chương (Medal Hall) để kích hoạt hệ thống Trang bị Lãnh Chúa và Quân trang.",
                en: "As soon as Castle hits Lv.25 (Hero Cap Lv.140), immediately construct the Lord Hall and Medal Hall to activate Lord Gear and troop medal progression.",
              },
            },
            {
              stepNumber: "03",
              title: {
                vi: "Chuyển trọng tâm Hạ tầng sang Bộ Lạc từ Ngày 21",
                en: "Pivot Infrastructure to Horde from Day 21",
              },
              detail: {
                vi: "Cố định Thợ 2 vào Doanh Trại Bộ Lạc (Lv.21 ➔ Lv.25 ➔ Lv.30) và Tượng Bộ Lạc (Horde Statue) để trước Ngày 41 (khi Witch xuất hiện hoàn tất đội hình 100% Bộ Lạc), toàn bộ quân lính Bộ Lạc đã sẵn sàng ở Bậc 9 (T9 — Lv.30).",
                en: "Dedicate Builder 2 to Horde Barracks (Lv.21 ➔ Lv.25 ➔ Lv.30) and Horde Statue so that before Day 41 (when Witch completes the 5-Horde lineup), all Horde troops are combat-ready at Tier 9 (T9 — Lv.30).",
              },
            },
          ],
          metrics: [
            {
              label: {
                vi: "Mốc Đột Phá Ngắn Hạn (48 Giờ)",
                en: "Short-Term Breakthrough (48 Hours)",
              },
              before: {
                vi: "Castle Lv.24 + Lính T7",
                en: "Castle Lv.24 + T7 Troops",
              },
              after: {
                vi: "Castle Lv.25 + Lord Hall + Medal Hall + Lính T8",
                en: "Castle Lv.25 + Lord Hall + Medal Hall + T8 Troops",
              },
            },
            {
              label: {
                vi: "Đích Đến Ngày 41 (Horde Pivot)",
                en: "Day 41 Target (Horde Pivot)",
              },
              before: {
                vi: "Horde Barracks Lv.21 (Lính T7)",
                en: "Horde Barracks Lv.21 (T7 Troops)",
              },
              after: {
                vi: "Castle Lv.30 (Trần Lv.170) + Horde Barracks Lv.30 (Lính T9)",
                en: "Castle Lv.30 (Cap Lv.170) + Horde Barracks Lv.30 (T9 Troops)",
              },
            },
            {
              label: {
                vi: "Đích Đến Mid-Game & Season 1+",
                en: "Mid-Game & Season 1+ Target",
              },
              before: {
                vi: "Đốt 8,400 DE nâng vỏ Lâu Đài B1–B6",
                en: "Burning 8,400 DE on Castle B1–B6 shell",
              },
              after: {
                vi: "Lv.35 (Tier 10 Troops / ~82M Gỗ-Đá) ➔ BI Lv.15 (Tier 11 / 5,422 DE)",
                en: "Lv.35 (Tier 10 Troops / ~82M Timber-Stone) ➔ BI Lv.15 (Tier 11 / 5,422 DE)",
              },
            },
          ],
          conclusion: {
            vi: "Đua cấp Lâu Đài không phải là nâng bừa mọi công trình, mà là nghệ thuật điều phối đường găng Chẵn/Lẻ (Guild + Training Ground vs Research Cottage + Hospital), dồn lực phá vỡ Điểm gãy Lv.35 (Lính T10) và ưu tiên 5,422 DE vào Viện Huy Hoàng để mở Lính T11 sớm nhất.",
            en: "Castle rushing is not blind upgrading—it is the art of orchestrating the Even/Odd critical path (Guild + Training Ground vs. Research Cottage + Hospital), concentrating resources to shatter the Lv.35 (Tier 10 Troops) breakpoint, and prioritizing 5,422 DE in the Brilliance Institute for the earliest Tier 11 Troops unlock.",
          },
        },
      ],
    },
  ],
};

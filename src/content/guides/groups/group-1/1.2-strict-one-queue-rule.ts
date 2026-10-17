import type { GuideArticle } from "../../types";

export const ARTICLE_1_2_STRICT_ONE_QUEUE: GuideArticle = {
  code: "1.2",
  slug: "strict-one-queue-rule",
  categorySlug: "getting-started",
  badge: "HOT",
  readingMinutes: 9,
  title: {
    vi: "Quy Tắc 1 Đội Hình Tuyệt Đối (The Strict 1-Queue Rule)",
    en: "The Strict 1-Queue Rule",
  },
  summary: {
    vi: "Nguyên tắc sống còn quyết định 80% sức mạnh tài khoản F2P/Low-Spender: Tại sao 1 đội hình 5M lực chiến quét sạch 3 đội hình 2.5M và danh sách 5 loại tài nguyên cấm chia cho Đội 2/3.",
    en: "The survival rule determining 80% of F2P/Low-Spender strength: Why a single 5M queue wipes out three 2.5M queues, plus the 5 scarce resources strictly forbidden for Queue 2/3.",
  },
  tldr: {
    coreRule: {
      vi: "**Kỷ luật 1 Đội hình Tuyệt đối:** Dồn `100%` tài nguyên quý hiếm vào duy nhất `6 tướng` thuộc Đội hình 1 (`Main Queue` / `Queue 1`).\n• **Vai trò Đội 2 & 3:** Chỉ tồn tại để đi đào mỏ (`Gathering`) và mặc lại trang bị thừa từ Đội 1 (`Hand-me-down System`).",
      en: "**Strict 1-Queue Discipline:** Funnel `100%` of scarce resources into the `6 heroes` of Queue 1 (`Main Queue`).\n• **Queue 2 & 3 Role:** Exist solely for resource gathering (`Gathering`) and wearing leftover equipment from Queue 1 (`Hand-me-down System`).",
    },
    immediateAction: {
      vi: "**Đóng băng Tài nguyên Đội phụ:** Ngưng đút Thịt (`Food`), Sách Kỹ Năng (`Skill Books`) và Đá Cường Hóa (`Enhancement Ore`) cho Đội 2/3 ngay lập tức.\n• **Tái chế Trang bị Đội 2:** Tháo toàn bộ Đồ Vàng/Tím đã đập ở Đội 2 đem Phân giải (`Dismantle`) để dồn mốc Cộng hưởng `+10` / `+20` cho Đội 1.",
      en: "**Freeze Secondary Queues:** Immediately stop feeding Meat (`Food`), `Skill Books`, and `Enhancement Ore` to Queue 2/Queue 3.\n• **Recycle Queue 2 Gear:** Unequip all enhanced Gold/Epic Gear on Queue 2 and `Dismantle` them to push `+10` / `+20` resonance on Queue 1.",
    },
    strictTaboo: {
      vi: "**Cấm chia 5 Tài nguyên Cốt lõi:** Tuyệt đối không chia Mảnh Vàng Vạn Năng, Sách Kỹ Năng Cam, Đá Cường Hóa, `UW Essence` hay Thức ăn Pet chính cho tướng ngoài Đội 1.\n• **Ngưỡng Tốt nghiệp Đội 1:** Chỉ mở khóa đầu tư Đội 2 sau khi Đội 1 hoàn tất `~6,000` Mảnh Vàng và `~600,000+` Sách Kỹ năng (`98,800–123,500` Sách/tướng đạt trần `Lv.15`).",
      en: "**Never Split the 5 Scarce Resources:** Never share Universal Legendary Shards, Orange Skill Books, Enhancement Stone/Ore, `UW Essence`, or Main Pet Food outside Queue 1.\n• **Queue 1 Graduation Cap:** Only invest in Queue 2 after Queue 1 completes `~6,000` Universal Shards and `~600,000+` Skill Books (`98,800–123,500` Books/hero for `Lv.15` cap).",
    },
  },
  keyTakeaways: [
    {
      vi: "**Ưu thế Toán học 1 Đội `5.0M`:** Quét sạch liên tiếp 3 Đội hình `2.5M` mà vẫn giữ nguyên `85%–90% HP` nhờ Công thức Trừ Giáp.\n• **Áp Chế Cấp Sao (`Star Suppression`):** Đột phá `+30% Skill Effect` tại mốc `1 Sao Trắng` (`11 Sao` = `560` Mảnh Mythic / `280` Mảnh Leg).",
      en: "**Mathematical Supremacy (`5.0M` vs `3x 2.5M`):** Wipes out three `2.5M` queues back-to-back while retaining `85%–90% HP` via the Defense Mitigation Formula.\n• **Star Suppression Spike:** Unlocks `+30% Skill Effect` at `1 White Star` (`11 Stars` = `560` Mythic / `280` Leg Shards).",
    },
    {
      vi: "**Bức tường lửa 5 Tài nguyên Cấm chia:** Khóa chặt Mảnh Vàng Vạn Năng (`560` / `280` / `1,000` / `500` Mảnh) và Sách Kỹ Năng (`Lv.10` = `8,000` ➔ `Lv.15 Max` = `24,700` Sách/kỹ năng).\n• **Trang bị, Thần khí & Pet:** Dồn `100%` Đá Cường Hóa (`+10/+20/+30/+40`), `UW Essence` và Thức ăn Pet chính (`Cactini / Eggy / Cubbly`) cho Đội 1.",
      en: "**5-Resource Firewall for Queue 2/3:** Lock Universal Shards (`560` / `280` / `1,000` / `500` Shards) and Skill Books (`Lv.10` = `8,000` ➔ `Lv.15 Max` = `24,700` Books/skill) on Queue 1.\n• **Gear, UWs & Main Pet:** Funnel `100%` of Enhancement Stone (`+10/+20/+30/+40`), `UW Essence`, and Main Pet Food (`Cactini / Eggy / Cubbly`) into Queue 1.",
    },
    {
      vi: "**Quản trị Quỹ Thịt (`1.18 Tỷ Thịt`):** Giữ Đội 2 dừng ở ngưỡng `Lv.120–140` để bảo toàn hơn `1.18 Tỷ Thịt` nâng `Faction Level 40` (`+20% Queue HP`).\n• **Luân Chuyển Thừa Kế (`Hand-Me-Down System`):** Nuôi Đội 2 lớn lên miễn phí qua 3 luồng thừa kế Tướng, Trang bị và Cổ Ngữ.",
      en: "**Meat Reserve Management (`1.18 Billion Meat`):** Cap Queue 2 at `Lv.120–140` to preserve over `1.18 Billion Meat` for `Faction Level 40` (`+20% Queue HP`).\n• **Free Queue 2 Growth:** Grow Queue 2 at zero cost via the 3-stream `Hand-Me-Down System` (Roster, Gear, and Runes).",
    },
    {
      vi: "**5/5 Tiêu chuẩn Tốt nghiệp Đội 1:** Chỉ nuôi Đội 2 khi Đội 1 hoàn tất `6,000` Mảnh Tướng (`5 Sao Trắng`) và Thức tỉnh Bậc 4 (`9 Hồn Đá Đỏ` + `345–385` Mảnh).\n• **Hoàn thiện Kỹ năng & Đồ Vàng:** Đạt `~600,000+` Sách Kỹ năng (`592,800–741,000` Sách), `24 Đồ Vàng` đúng Dấu Hệ (`+20/+30/+40`) và `UW Lv.10+`.",
      en: "**5/5 Queue 1 Graduation Criteria:** Only invest in Queue 2 after Queue 1 hits `6,000` Hero Shards (`5 White Stars`) and Tier-4 Awakening (`9 Red Soul Stones` + `345–385` Shards).\n• **Maxed Skills & Faction Gear:** Complete `~600,000+` Skill Books (`592,800–741,000` Books), `24 Faction-Marked Golden Gear` (`+20/+30/+40`), and `Lv.10+ UWs`.",
    },
  ],
  keywords: [
    "strict 1-queue rule",
    "quy tắc 1 đội hình",
    "queue 1 funnel",
    "star suppression",
    "áp chế cấp sao",
    "hand-me-down system",
    "cơ chế thừa kế",
    "6000 shards",
    "600000 skill books",
    "24700 sách kỹ năng",
    "560 mảnh",
    "1 sao trắng",
    "9 hồn đá đỏ",
    "dismantle gear",
    "phân giải trang bị",
    "cactini",
    "eggy",
    "cubbly",
  ],
  sourceFiles: [
    "group-1-getting-started/1.2-strict-one-queue-rule.md",
    "group-8-infrastructure/8.4-master-data-tables.md",
  ],
  freeSections: [
    {
      id: "sec-1-why-5m-beats-three-2-5m",
      title: {
        vi: "1. Giải thích Cơ chế Cốt lõi: Tại Sao 1 Đội 5M Thắng Tuyệt Đối 3 Đội 2.5M?",
        en: "1. Core Mechanics: Why One 5.0M Queue Completely Wipes Three 2.5M Queues",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "**Cạm bẫy \"3 Đội Đồng Đều\":** Sai lầm khiến `90%` người chơi F2P/Low-Spender chững lại ở Lâu đài `Lv.25–30` là tâm lý muốn cả 3 đội hình mạnh ngang nhau.\n• **Hệ lụy Chia nhỏ Nguồn lực:** Khi mở khóa `Queue 2` và `Queue 3`, việc chia đều Thịt, Mảnh Vạn Năng và Đồ Vàng cho `18 tướng` cùng lúc làm phế hoàn toàn Đội 1.",
            en: "**The \"Balanced 3-Queue\" Trap:** The mistake that stalls `90%` of F2P/Low-Spender players at Castle `Lv.25–30` is trying to build all 3 queues equally.\n• **Resource Dilution Penalty:** Splitting Meat, Universal Shards, and Golden Gear evenly across `18 heroes` in `Queue 2` and `Queue 3` cripples your main march.",
          },
        },
        {
          type: "paragraph",
          text: {
            vi: "**Cấp số nhân Phi tuyến tính (`Exponential Scaling`):** Trong cơ chế chiến đấu toán học của Top Heroes, sức mạnh tăng vọt qua các mốc đột phá (`Breakpoints`) chứ không tăng cộng tuyến tính.",
            en: "**Non-Linear Exponential Scaling:** In Top Heroes' mathematical combat engine, power scales exponentially through key stat and skill breakpoints (`Exponential Scaling`) rather than linearly.",
          },
        },
        {
          type: "visual_diagram",
          mediaCode: "MED-1.2-01",
          variant: "comparison_split",
          title: {
            vi: "Đối Chiếu Chiến Thuật: Phễu Dồn Đội 1 (Queue 1 Funnel) vs Chia Đều 3 Đội (Balanced Spread)",
            en: "Tactical Comparison: Queue 1 Funnel (5.0M) vs. Balanced Spread (2.5M / 2.2M / 1.8M)",
          },
          subtitle: {
            vi: "Cùng 100% Tài nguyên Quý hiếm đầu vào nhưng tạo ra 2 kết cục trái ngược hoàn toàn trong Arena, Xe Hàng & KvK",
            en: "Identical 100% scarce resource input producing two polar-opposite outcomes in Arena, Carriages & KvK",
          },
          centerNode: {
            id: "resource-pool-100",
            badge: {
              vi: "NGUỒN LỰC CỐ ĐỊNH",
              en: "FIXED SCARCE INPUT",
            },
            title: {
              vi: "100% Tài Nguyên Quý Hiếm (Mảnh Vạn Năng, Sách Kỹ Năng, Đá Cường Hóa, Đồ Vàng)",
              en: "100% Scarce Resources (Universal Shards, Skill Books, Enhancement Stone, Golden Gear)",
            },
            subtitle: {
              vi: "Hội tụ 100% vào 6 tướng Đội 1 hay chia nhỏ cho 18 tướng ở cả 3 đội?",
              en: "Concentrate 100% into 6 Queue 1 heroes or dilute across 18 heroes in 3 queues?",
            },
          },
          branches: [
            {
              title: {
                vi: "Chiến Thuật Chuẩn: Phễu Dồn Đội 1 (Queue 1 Funnel)",
                en: "Meta Strategy: Queue 1 Funnel (5.0M)",
              },
              badge: {
                vi: "ĐỘI 1: 5.0M",
                en: "QUEUE 1: 5.0M",
              },
              tone: "emerald",
              steps: [
                {
                  id: "funnel-step-1",
                  badge: {
                    vi: "100% TÀI NGUYÊN",
                    en: "100% RESOURCES",
                  },
                  title: {
                    vi: "Đội 1: 5.0M Lực Chiến (Full Sao Trắng + Đồ Vàng +20)",
                    en: "Queue 1: 5.0M Combat Power (Full White Stars + +20 Gold Gear)",
                  },
                  subtitle: {
                    vi: "Kích hoạt Áp Chế Cấp Sao (Star Suppression) +30% Skill Effect tại 1 Sao Trắng (560 Mảnh Mythic / 280 Mảnh Leg) & Cộng hưởng Trang bị +20.",
                    en: "Activates Star Suppression (+30% Skill Effect at 1 White Star = 560 Mythic / 280 Leg Shards) & +20 Gear Resonance.",
                  },
                },
                {
                  id: "funnel-step-2",
                  badge: {
                    vi: "HAND-ME-DOWN",
                    en: "HAND-ME-DOWN",
                  },
                  title: {
                    vi: "Đội 2 & Đội 3: Đào Mỏ (Gathering) & Thừa Kế 0 Đồng",
                    en: "Queue 2 & 3: Gathering & Zero-Cost Inheritance",
                  },
                  subtitle: {
                    vi: "Nhận lại tướng Liên Minh Lv.160, đồ không dấu và Cổ Ngữ Lv.4 thừa từ Đội 1 mà không tốn 1 Mảnh Vạn Năng nào.",
                    en: "Inherits Lv.160 League heroes, unmarked gear, and Lv.4 Runes from Queue 1 while spending 0 Universal Shards.",
                  },
                },
              ],
              outcome: {
                vi: "Quét Sạch Liên Tiếp 3 Đội 2.5M (Mất <15% Máu Mỗi Trận — Còn nguyên 85%–90% HP)",
                en: "Wipes Out Three 2.5M Queues Back-to-Back (Loses <15% HP Per Fight — Keeps 85%–90% HP)",
              },
            },
            {
              title: {
                vi: "Sai Lầm Phế Acc: Chia Đều 3 Đội (Balanced Spread)",
                en: "Account-Ruining Trap: Balanced Spread (2.5M / 2.2M / 1.8M)",
              },
              badge: {
                vi: "2.5M / 2.2M / 1.8M",
                en: "2.5M / 2.2M / 1.8M",
              },
              tone: "rose",
              steps: [
                {
                  id: "spread-step-1",
                  badge: {
                    vi: "ĐỘI 1: 2.5M",
                    en: "QUEUE 1: 2.5M",
                  },
                  title: {
                    vi: "Đội 1: 2.5M (Thiếu Sao, Đồ +10 Lệch)",
                    en: "Queue 1: 2.5M (Star-Starved, Uneven +10 Gear)",
                  },
                  subtitle: {
                    vi: "Kẹt ở 3★–5★ Đỏ (240–400 Mảnh), không xuyên nổi giáp Tanker đối phương và bị áp chế cấp sao.",
                    en: "Stuck at 3★–5★ Red (240–400 Shards), unable to pierce enemy Tank defense and suffering Star Suppression.",
                  },
                },
                {
                  id: "spread-step-2",
                  badge: {
                    vi: "ĐỘI 2: 2.2M | ĐỘI 3: 1.8M",
                    en: "QUEUE 2: 2.2M | QUEUE 3: 1.8M",
                  },
                  title: {
                    vi: "Đội 2: 2.2M (Nửa Vời) & Đội 3: 1.8M (Yếu Ớt)",
                    en: "Queue 2: 2.2M (Mediocre) & Queue 3: 1.8M (Fragile)",
                  },
                  subtitle: {
                    vi: "Chôn chết hàng trăm Mảnh Vạn Năng, hàng vạn Sách Kỹ Năng và Quặng Cường Hóa vào các đội phụ.",
                    en: "Buries hundreds of Universal Shards, tens of thousands of Skill Books, and Enhancement Ore in secondary queues.",
                  },
                },
              ],
              outcome: {
                vi: "Thua Toàn Tập Trong Arena, Xe Hàng & Tràn Bệnh Viện Ngày KvK",
                en: "Loses Completely in Arena, Carriage Plunder & Floods Hospital in KvK",
              },
            },
          ],
          footnote: {
            vi: "Quy luật thực chiến: 3 đội hình 2.5M/2.2M/1.8M cộng lại (6.5M tổng) vẫn bị 1 đội hình 5.0M tiêu diệt sạch mà không hạ gục nổi Tanker hàng trước.",
            en: "Combat reality: Three queues of 2.5M/2.2M/1.8M combined (6.5M total) still get completely wiped by a single 5.0M queue without even taking down its frontline Tank.",
          },
        },
      ],
      subSections: [
        {
          id: "sub-1-1-five-combat-reasons",
          title: {
            vi: "1.1. 5 Lý do Cơ chế Game bắt buộc bạn phải dồn 100% cho Đội 1",
            en: "1.1. 5 Mathematical Game Mechanics Forcing 100% Investment in Queue 1",
          },
          badge: {
            vi: "5 LÝ DO TOÁN HỌC",
            en: "5 COMBAT REASONS",
          },
          blocks: [
            {
              type: "list",
              ordered: true,
              items: [
                {
                  vi: "**Công thức Trừ Giáp (Defense Mitigation):** ATK, CC & Xuyên thủ Đội `5.0M` vượt ngưỡng DEF Đội `2.5M`, cùng Healer (`Witch` / `Nun` / `Tidecaller`) giữ `85%–90% HP` và quét sạch cả 3 đội `2.5M`.",
                  en: "**Armor Piercing & Defense Mitigation:** A `5.0M` Queue's ATK, CC & Defense Break crush a `2.5M` Queue's DEF; with Healer sustain (`Witch`/`Nun`/`Tidecaller`), it keeps `85%–90% HP` and wipes three `2.5M` queues.",
                },
                {
                  vi: "**Áp Chế Cấp Sao (Star Suppression):** Bậc `1★–5★ Trắng` mở khóa `+30% Skill Effect` tại `1 Sao Trắng` (`11 Sao` = `560` Mảnh Mythic / `280` Mảnh Leg), nghiền nát các đội chia lẻ ở `3★–5★ Đỏ` (`240–400 Mảnh`).",
                  en: "**Star Suppression:** White-Star tier (`1★–5★ White`) unlocks `+30% Skill Effect` at `1 White Star` (`560` Mythic / `280` Leg Shards), effortlessly crushing rosters spread thin at `3★–5★ Red` (`240–400 Shards`).",
                },
                {
                  vi: "**95% Hoạt động Cốt lõi chỉ dùng 1 Đội:** Đấu Trường 1v1 (`Arena`), Cướp & Bảo vệ Xe Hàng (`Carriage Plunder`), Boss Thế Giới / `Adventure` / `Sanctum` / `Trial` và `Guild Rally` chỉ tính duy nhất `Queue 1`.",
                  en: "**95% of Core Modes Use Only 1 Queue:** `1v1 Arena`, Mythic `Carriage Plunder`, World/Guild Bosses, `Adventure` / `Sanctum` / `Trial`, and `Guild Rally` rely 100% on your single strongest `Queue 1` march.",
                },
                {
                  vi: "**Quy mô Hành quân (March Size) & Bậc Lính:** Bộ hệ số nhân `+35% / +30% / +25%` (`+35%` Aura, `+30%` Gear Mark, `+25%` Queue 1 Tech) giúp mỗi người lính Đội 1 mạnh gấp `2.5x–3x` đội chia lẻ.",
                  en: "**March Size Multipliers (`+35% / +30% / +25%`):** Stacking `+35%` Faction Aura, `+30%` Gear Mark, and `+25%` Queue 1 Tech Boost makes every soldier in `Queue 1` `2.5x–3x` stronger than a split queue.",
                },
                {
                  vi: "**Bảo toàn Dung lượng Bệnh Viện (Hospital Capacity):** Mang Đội 2/3 yếu ra đánh `KvK` chỉ làm tràn `Hospital`, đốt hàng triệu Thịt/Đá và hàng chục giờ tăng tốc chữa thương vô ích.",
                  en: "**Hospital Capacity Management in KvK:** Sending weak Queue 2/3 marches into `KvK` combat floods your `Hospital` with wounded troops, wasting millions of Meat/Stone and healing speedups.",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "sec-2-forbidden-resources-and-inheritance",
      title: {
        vi: "2. Chiến thuật Tối ưu cho F2P & Low-Spender: 5 Tài Nguyên Cấm Chia & Cơ Chế Thừa Kế",
        en: "2. F2P Strategy: The 5 Strictly Forbidden Resources & The Hand-Me-Down System",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "**Bức tường lửa Tài nguyên (`Resource Firewall`):** Để thực thi Quy tắc 1 Đội hình Tuyệt đối (`Strict 1-Queue Rule`), bạn phải khóa chặt luồng tài nguyên giữa Đội 1 và các đội phụ.",
            en: "**Enforcing the Resource Firewall:** To execute the `Strict 1-Queue Rule` with discipline, you must enforce an impenetrable firewall separating `Queue 1` from secondary queues.",
          },
        },
      ],
      subSections: [
        {
          id: "sub-2-1-five-forbidden-resources",
          title: {
            vi: "2.1. Danh sách 5 Loại Tài nguyên CẤM TUYỆT ĐỐI chia cho Đội 2 và Đội 3",
            en: "2.1. The 5 Scarce Resources STRICTLY FORBIDDEN for Queue 2 & Queue 3",
          },
          badge: {
            vi: "5 TÀI NGUYÊN CẤM CHIA",
            en: "5 FORBIDDEN RESOURCES",
          },
          blocks: [
            {
              type: "table",
              caption: {
                vi: "Bảng 5 Loại Tài Nguyên Quý Hiếm Cấm Chia Cho Đội 2 & Đội 3",
                en: "The 5 Scarce Resources Strictly Forbidden for Queue 2 & Queue 3",
              },
              headers: [
                { vi: "STT", en: "#" },
                {
                  vi: "Loại Tài Nguyên Quý Hiếm (Việt / Anh)",
                  en: "Scarce Resource Type (VI / EN)",
                },
                {
                  vi: "Quy Tắc Cấp Phát Cho Đội 1 (Main Queue)",
                  en: "Queue 1 (Main Queue) Allocation Rule",
                },
                {
                  vi: "Quy Tắc Cấm Đối Với Đội 2 & Đội 3",
                  en: "Strict Embargo Rule for Queue 2 & Queue 3",
                },
              ],
              rows: [
                [
                  { vi: "1", en: "1" },
                  {
                    vi: "Mảnh Tướng Vàng Vạn Năng (Universal Legendary Hero Shards)",
                    en: "Universal Legendary Hero Shards",
                  },
                  {
                    vi: "100% dồn cho các tướng Đỏ (Mythic) và tướng trụ cột trong Đội 1 để chạm mốc 1 Sao Trắng (560 Mảnh Mythic / 280 Mảnh Leg), 5 Sao Trắng (1,000 Mảnh Mythic / 500 Mảnh Leg) — các mốc 560 / 280 / 1,000 / 500 Mảnh — và Thức Tỉnh (9 Hồn Đá Đỏ + 345–385 Mảnh).",
                    en: "100% funneled into Mythic and core heroes in Queue 1 to hit 1 White Star (560 Mythic / 280 Leg Shards), 5 White Stars (1,000 Mythic / 500 Leg Shards) — the 560 / 280 / 1,000 / 500 Shard milestones — and Awakening (9 Red Soul Stones + 345–385 Shards).",
                  },
                  {
                    vi: "0 mảnh. Đội 2 và Đội 3 chỉ được nâng sao tự nhiên bằng mảnh riêng chỉ định rơi ra từ Quán Rượu (Tavern) hoặc rương mảnh ngẫu nhiên.",
                    en: "0 Shards. Queue 2 and Queue 3 may only upgrade stars naturally using hero-specific shards pulled from the Tavern or random shard chests.",
                  },
                ],
                [
                  { vi: "2", en: "2" },
                  {
                    vi: "Sách Kỹ Năng Cam / Tím (Skill Books)",
                    en: "Orange / Purple Skill Books",
                  },
                  {
                    vi: "100% dùng để nâng cấp kỹ năng cho 6 tướng Đội 1 chạm mốc dừng Mid-game Lv.10 = 8,000 (8,000 Sách/kỹ năng) rồi tiến lên trần cơ bản Lv.15 Max = 24,700 Sách/kỹ năng = 98,800–123,500 Sách/tướng, cộng thêm quỹ dự trữ 24,700+ cuốn chờ tướng Đỏ mới.",
                    en: "100% used to upgrade skills for the 6 Queue 1 heroes to the Mid-game stop Lv.10 = 8,000 (8,000 Books/skill) and then to the base cap Lv.15 Max = 24,700 Books/skill = 98,800–123,500 Books/hero, plus a 24,700+ Book reserve for upcoming Mythic heroes.",
                  },
                  {
                    vi: "0 cuốn (ngoại trừ việc nâng Chuỗi Thiên phú Kinh tế Ô 3 của Tướng Tím như Brawler và Knight). Tuyệt đối không nâng kỹ năng chiến đấu cho tướng Đội 2/3.",
                    en: "0 Books (except upgrading Slot 3 Economy Traits on Epic heroes like Brawler and Knight). Never upgrade combat skills on Queue 2/3 heroes.",
                  },
                ],
                [
                  { vi: "3", en: "3" },
                  {
                    vi: "Đá Cường Hóa & Trang Bị Vàng (Enhancement Stone / Ore, Titan Iron & Golden Gear)",
                    en: "Enhancement Stone / Ore, Titan Iron & Golden Gear",
                  },
                  {
                    vi: "100% Trang bị Vàng và Đá/Quặng Cường Hóa (Enhancement Stone) được dồn để đập bộ đồ của 6 tướng Đội 1 lên mốc Cộng hưởng +10/+20/+30/+40 (+10 ➔ +20 ➔ +30 ➔ +40).",
                    en: "100% of Golden Gear and Enhancement Stone / Ore are concentrated to push all 6 Queue 1 heroes' gear sets to the +10/+20/+30/+40 resonance milestones (+10 ➔ +20 ➔ +30 ➔ +40).",
                  },
                  {
                    vi: "0 viên Quặng. Đội 2 và Đội 3 chỉ mặc Trang bị Tím cấp +0 thừa ra. Nếu lỡ đập đồ Tím +10 ở Đội 2, phải bấm Phân giải / Tái chế để thu hồi Quặng về cho Đội 1.",
                    en: "0 Enhancement Stones. Queue 2 and Queue 3 wear leftover +0 Epic Gear only. If you enhanced Epic Gear to +10 on Queue 2, immediately Dismantle / Recycle it to recover 100% Ore for Queue 1.",
                  },
                ],
                [
                  { vi: "4", en: "4" },
                  {
                    vi: "Tinh Chất Vũ Khí Độc Quyền & Máu Rồng (UW Essence / Exclusive Weapon Shards & Dragon Blood)",
                    en: "UW Essence / Exclusive Weapon Shards & Dragon Blood",
                  },
                  {
                    vi: "100% Rương Vũ khí Độc quyền tự chọn (UW Essence) và nguyên liệu cường hóa Thần khí chỉ mở cho tướng chủ lực Đội 1 (Desert Prince, Storm Maiden, Wukong, Paragon, Tidecaller).",
                    en: "100% of custom Exclusive Weapon Chests (UW Essence) and weapon upgrade materials are opened exclusively for Queue 1 core heroes (Desert Prince, Storm Maiden, Wukong, Paragon, Tidecaller).",
                  },
                  {
                    vi: "0 mảnh. Không bao giờ mở rương Vũ khí Độc quyền cho các tướng quá độ hoặc tướng nằm ở Đội 2/3.",
                    en: "0 Shards. Never open Exclusive Weapon chests for transitional heroes or any hero sitting in Queue 2/3.",
                  },
                ],
                [
                  { vi: "5", en: "5" },
                  {
                    vi: "Thức Ăn Pet, Bụi Cổ Ngữ & Tinh Chất Thánh Vật (Pet Food, DE-Dust & Core Relic Essence)",
                    en: "Pet Food, DE-Dust & Core Relic Essence",
                  },
                  {
                    vi: "100% Thức ăn Pet dồn nâng cấp duy nhất 1 con Pet chủ lực đi theo Đội 1 (Cactini / Eggy / Cubbly); toàn bộ DE-Dust (Bụi Cổ Ngữ / Dark Empire Dust) dùng để chế tạo/nâng cấp Cổ Ngữ Lv.5–Lv.8 cho Đội 1.",
                    en: "100% of Pet Food is funneled into upgrading ONE single main Pet accompanying Queue 1 (Cactini / Eggy / Cubbly); all DE-Dust (Dark Empire Dust) is used to craft/upgrade Lv.5–Lv.8 Runes for Queue 1.",
                  },
                  {
                    vi: "Không nuôi dàn trải 3 con Pet lên cấp 30–40 cùng lúc; Pet của Đội 2/3 chỉ để cấp độ cơ bản nhằm kích hoạt dòng sưu tầm (Collection Buff).",
                    en: "Never level 3 Pets evenly to Lv.30–40 at the same time; keep Queue 2/3 Pets at base level solely to unlock Collection Buffs.",
                  },
                ],
              ],
            },
            {
              type: "media_spotlight",
              mediaCode: "MED-1.2-02",
              tier: "tier2_annotated_ui",
              title: {
                vi: "Giao Diện Quản Lý Đội Hình (Troop Queue Setup) — Phân Tầng Đầu Tư",
                en: "Troop Queue Setup Interface — Queue 1 Investment Firewall",
              },
              description: {
                vi: "Ảnh chụp giao diện Quản lý Đội hình (Troop Queue Setup) có khung viền vàng nổi bật ở Queue 1 (100% Invest) và nhãn khóa đỏ 'Gathering Only / 0 Universal Shards' đè lên Queue 2 và Queue 3.",
                en: "Annotated screenshot of the Troop Queue Setup screen featuring a highlighted gold border on Queue 1 (100% Invest) and red lock labels ('Gathering Only / 0 Universal Shards') over Queue 2 and Queue 3.",
              },
              annotations: [
                {
                  kind: "do",
                  label: {
                    vi: "QUEUE 1 (MAIN QUEUE) — 100% INVEST",
                    en: "QUEUE 1 (MAIN QUEUE) — 100% INVEST",
                  },
                  detail: {
                    vi: "Dồn 100% Mảnh Vàng Vạn Năng (560 / 280 / 1,000 / 500 Mảnh), Sách Kỹ Năng (Lv.15 Max = 24,700 Sách/kỹ năng), Đá Cường Hóa (+10/+20/+30/+40), UW Essence và Pet chính (Cactini / Eggy / Cubbly).",
                    en: "Funnel 100% of Universal Shards (560 / 280 / 1,000 / 500 Shards), Skill Books (Lv.15 Max = 24,700/skill), Enhancement Stone (+10/+20/+30/+40), UW Essence, and Main Pet (Cactini / Eggy / Cubbly).",
                  },
                },
                {
                  kind: "dont",
                  label: {
                    vi: "QUEUE 2 & QUEUE 3 — GATHERING ONLY / 0 UNIVERSAL SHARDS",
                    en: "QUEUE 2 & QUEUE 3 — GATHERING ONLY / 0 UNIVERSAL SHARDS",
                  },
                  detail: {
                    vi: "Khóa cấp ở Lv.120–140 đi đào mỏ; tuyệt đối 0 Mảnh Vạn Năng, 0 Sách chiến đấu, 0 Đá Cường Hóa (chỉ mặc đồ Tím +0 hoặc đồ thừa từ Đội 1).",
                    en: "Cap levels at Lv.120–140 for resource gathering; strictly 0 Universal Shards, 0 Combat Skill Books, and 0 Enhancement Stones (wear +0 Epic or hand-me-down gear only).",
                  },
                },
              ],
            },
            {
              type: "callout",
              variant: "warning",
              title: {
                vi: "Quy tắc Quản trị Thịt (Food / Meat Management — 1.18 Tỷ Thịt cho Faction Level 40)",
                en: "Food / Meat Management Rule (1.18 Billion Meat for Faction Level 40)",
              },
              content: {
                vi: "**Chi phí Thịt Cấp số nhân:** Từ Lâu đài `Lv.24+`, đẩy 1 tướng từ `Lv.150` lên `Lv.200` tốn hàng chục triệu Thịt, và nâng `Faction Level 40` cần hơn `1.18 Tỷ Thịt`.\n• **Ngưỡng Khóa Cấp Đội 2:** Giữ Đội 2 dừng ở `Lv.120–140` (đủ tải trọng đào mỏ Ruby/Đá/Gỗ) và dồn `100%` Thịt cho 6 tướng Đội 1 chạm trần Lâu đài!",
                en: "**Exponential Meat Scaling:** From Castle `Lv.24+`, pushing a hero from `Lv.150` to `Lv.200` costs tens of millions of Meat, while `Faction Level 40` requires `1.18 Billion Meat`.\n• **Queue 2 Level Cap:** Keep Queue 2 parked at `Lv.120–140` (enough load for Ruby/Stone/Wood gathering) and funnel `100%` of Meat into capping Queue 1!",
              },
            },
          ],
        },
        {
          id: "sub-2-2-hand-me-down-system",
          title: {
            vi: "2.2. Cơ chế \"Luân Chuyển Thừa Kế (The Hand-Me-Down System)\" cho Đội 2 và Đội 3",
            en: "2.2. The \"Hand-Me-Down System\" for Queue 2 & Queue 3",
          },
          badge: {
            vi: "3 LUỒNG THỪA KẾ",
            en: "3 INHERITANCE STREAMS",
          },
          blocks: [
            {
              type: "paragraph",
              text: {
                vi: "**Tăng trưởng Đội 2 Chi phí `0 Đồng`:** Không chia tài nguyên quý hiếm cho Đội 2 không làm Đội 2 yếu đi — Đội 2 lớn lên tự động nhờ 3 luồng Thừa kế Dây chuyền (`Hand-Me-Down`):",
                en: "**Zero-Cost Queue 2 Growth:** Investing zero scarce resources into Queue 2 does not keep it weak—Queue 2 grows automatically through the 3-stream `Hand-Me-Down System`:",
              },
            },
            {
              type: "list",
              ordered: false,
              items: [
                {
                  vi: "**Thừa kế Nhân sự (Roster Inheritance):** Khởi đầu bằng 6 tướng Liên Minh ở Đội 1 (Ngày 1–20) rồi xoay sang Bộ Lạc (Ngày 21–41), dàn tướng Liên Minh `Lv.160` tự động lùi xuống làm Đội 2 tốn `0 Thịt`.",
                  en: "**Hero Roster Inheritance:** Starting with 6 League heroes in Queue 1 (Days 1–20) and pivoting to Horde (Days 21–41) rotates your `Lv.160` League lineup into a complete Pure-League Queue 2 for `0 Meat`.",
                },
                {
                  vi: "**Thừa kế Trang bị (Gear Inheritance):** Mỗi khi rèn được Đồ Vàng có Dấu Hệ (`+30% Bonus`) cho Đội 1, món Đồ Vàng không dấu hoặc Đồ Tím đang mặc sẽ tháo ra chuyển xuống cho tướng tương ứng ở Đội 2.",
                  en: "**Gear Inheritance:** Whenever you forge a Faction-Marked Golden Gear piece (`+30% Bonus`) for Queue 1, the displaced unmarked Golden or Epic Gear passes down directly to the matching role in Queue 2.",
                },
                {
                  vi: "**Thừa kế Thánh Vật & Cổ Ngữ (Relic & Rune Inheritance):** Khi Đội 1 dùng `DE-Dust` nâng Cổ Ngữ `Lv.4` lên `Lv.5–Lv.8`, các viên bậc trung và Thánh vật phụ dôi ra sẽ tự động lấp đầy Đội 2.",
                  en: "**Relic & Mid-Tier Rune Inheritance:** As Queue 1 uses `DE-Dust` to replace `Lv.4` Runes with `Lv.5–Lv.8` Runes, the displaced mid-tier Runes and secondary Relics automatically populate Queue 2.",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "sec-3-queue-pitfalls",
      title: {
        vi: "3. Những Cạm bẫy Phổ biến & Cách Phòng tránh (Common Pitfalls)",
        en: "3. Common Pitfalls & Optimal Solutions",
      },
      blocks: [
        {
          type: "table",
          caption: {
            vi: "Bảng 3 Cạm Bẫy Chia Tài Nguyên Đội Hình Phổ Biến & Giải Pháp Chuẩn Meta",
            en: "3 Common Multi-Queue Pitfalls & Optimal Meta Solutions",
          },
          headers: [
            { vi: "Sai lầm phổ biến", en: "Common Pitfall" },
            { vi: "Giải pháp tối ưu", en: "Optimal Meta Solution" },
          ],
          rows: [
            [
              {
                vi: "Thấy Đội 2 bị cướp mỏ hoặc thua trong Đấu Trường 3 Đội (3v3 Arena) nên nóng ruột lấy Mảnh Vạn Năng và Quặng đập cho Đội 2.",
                en: "Getting frustrated when Queue 2 loses resource tiles or 3v3 Arena matches, then impulsively spending Universal Shards and Ore on Queue 2.",
              },
              {
                vi: "Trong Đấu Trường 3v3 (mở ở giai đoạn sau), quy tắc thắng là Thắng 2/3 Hiệp (Best of 3). Dù bạn có chia tài nguyên cho Đội 2 thì vẫn thua những người dồn Đội 1 + Đội 2 chuẩn thừa kế. Hãy kiên định giữ 100% tài nguyên cho Đội 1.",
                en: "In 3v3 Arena (unlocked later), victory is decided by Best of 3 (2 out of 3 rounds). Splitting resources into Queue 2 guarantees losing to players running a maxed Queue 1 + Hand-Me-Down Queue 2. Keep 100% of scarce resources on Queue 1.",
              },
            ],
            [
              {
                vi: "Đập 24 món Trang bị Tím lên +10 cho cả Đội 1 và Đội 2 vì nghĩ đồ Tím rẻ.",
                en: "Enhancing 24 pieces of Epic (Purple) Gear to +10 across both Queue 1 and Queue 2 thinking Epic gear is cheap.",
              },
              {
                vi: "Lượng Quặng Cường Hóa nằm chết trong 24 món đồ Tím +10 ở Đội 2 đủ để kéo cả bộ Đồ Vàng của tướng Carry Đội 1 từ +10 lên thẳng +20 (mở khóa dòng cộng hưởng lớn). Hãy phân giải ngay đồ Tím đã cường hóa ở Đội 2!",
                en: "The Enhancement Ore locked inside 24 pieces of +10 Epic Gear on Queue 2 is enough to push your Queue 1 Carry's Golden Gear set straight from +10 to +20 (unlocking major resonance stats). Dismantle enhanced Epic gear on Queue 2 immediately!",
              },
            ],
            [
              {
                vi: "Nâng cấp đồng đều cả 3 Doanh Trại (Liên Minh, Bộ Lạc, Thiên Nhiên) lên cấp 25–30 cùng lúc.",
                en: "Upgrading all 3 Faction Barracks (League, Horde, Nature) evenly to Lv.25–30 at the same time.",
              },
              {
                vi: "Mỗi cấp Doanh Trại từ Lv.24 trở lên tốn hàng chục triệu Gỗ/Đá và nhiều ngày xây dựng. Chỉ ưu tiên đẩy Doanh Trại của Hệ Đội 1 chạm mốc chia hết cho 5 (Lv.25 / Lv.30) trước tiên để mở bậc lính cao nhất cho Đội 1.",
                en: "Every Barracks level from Lv.24+ costs tens of millions of Wood/Stone and days of construction. Prioritize pushing ONLY your Queue 1 Faction Barracks to multiples of 5 (Lv.25 / Lv.30) first to unlock the highest troop tier for Queue 1.",
              },
            ],
          ],
        },
      ],
    },
  ],
  proSections: [
    {
      id: "sec-4-graduation-math",
      isPro: true,
      title: {
        vi: "4. Phân tích Định lượng & Điểm gãy: Bài Toán 6,000 Mảnh Vàng, 600,000+ Sách Kỹ Năng & Ngưỡng \"Tốt Nghiệp\" Đội 1",
        en: "4. Quantitative Analysis: The 6,000-Shard & 600,000-Book Math & Queue 1 Graduation Criteria",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "**Khi nào được phép nuôi Đội 2?** Nhiều người chơi hỏi đến lúc nào Đội 1 mới hoàn thiện để bắt đầu chuyển tài nguyên sang Đội 2.\n• **Bảng Định lượng Master Data:** Câu trả lời nằm ở chi phí nâng cấp định lượng trích xuất trực tiếp từ `TopHeroes Master Data Tables` dưới đây:",
            en: "**When Can You Invest in Queue 2?** Many players ask when `Queue 1` is officially complete enough to start funneling scarce resources into `Queue 2`.\n• **Master Data Cost Breakdown:** The answer lies in the quantitative upgrade cost breakdown extracted from the `TopHeroes Master Data Tables`:",
          },
        },
      ],
      subSections: [
        {
          id: "sub-4-1-cost-breakdown-table",
          title: {
            vi: "4.1. Bảng Chi phí Mảnh Tướng & Sách Kỹ Năng để Hoàn thiện 1 Đội Hình Chuẩn (6 Tướng)",
            en: "4.1. Hero Shard & Skill Book Cost Breakdown to Complete Queue 1 (6 Heroes)",
          },
          badge: {
            vi: "6,000 MẢNH & ~600,000+ SÁCH",
            en: "6,000 SHARDS & ~600,000+ BOOKS",
          },
          blocks: [
            {
              type: "table",
              caption: {
                vi: "Bảng Chi Phí Định Lượng Hoàn Thiện 1 Tướng Chủ Lực & Cả Đội Hình 1 (6 Tướng)",
                en: "Quantitative Cost Breakdown for 1 Core Hero & Full Queue 1 (6 Heroes)",
              },
              headers: [
                { vi: "Hạng Mục Đầu Tư", en: "Investment Category" },
                {
                  vi: "Chi Phí Cho 1 Tướng Chủ Lực",
                  en: "Cost Per Core Hero (1 Hero)",
                },
                {
                  vi: "Tổng Chi Phí Cho Cả Đội 1 (6 Tướng)",
                  en: "Total Cost for Full Queue 1 (6 Heroes)",
                },
                {
                  vi: "Điểm Gãy Ưu Tiên (Breakpoint ROI)",
                  en: "Priority Breakpoint & ROI",
                },
              ],
              rows: [
                [
                  {
                    vi: "Đột phá từ 0 Sao ➔ 5 Sao Đỏ (10 Sao tổng)",
                    en: "Breakthrough 0★ ➔ 5 Red Stars (10 Stars total)",
                  },
                  {
                    vi: "400 Mảnh (Tướng Đỏ Mythic: 100 Mảnh Vàng + 300 Mảnh Đỏ) | 200 Mảnh (Tướng Vàng Legendary)",
                    en: "400 Shards (Mythic: 100 Gold + 300 Red) | 200 Shards (Legendary)",
                  },
                  {
                    vi: "2,400 Mảnh (6 Mythic — 400 / 2,400)",
                    en: "2,400 Shards (6 Mythic — 400 / 2,400)",
                  },
                  {
                    vi: "Mở khóa toàn bộ kỹ năng cơ bản (mốc 1 Sao Đỏ / 6 Sao = 160 Mảnh Mythic / 80 Mảnh Leg) và hoàn tất tầng Sao Đỏ ở 400 Mảnh Mythic.",
                    en: "Unlocks all base skills (at 1 Red Star / 6 Stars = 160 Mythic / 80 Leg Shards) and completes the Red Star tier at 400 Mythic Shards.",
                  },
                ],
                [
                  {
                    vi: "Đột phá từ 5 Sao Đỏ ➔ 1–2 Sao Trắng / Bạc (11–12 Sao tổng)",
                    en: "Breakthrough 5 Red Stars ➔ 1–2 White/Silver Stars (11–12 Stars total)",
                  },
                  {
                    vi: "+160 Mảnh lên 1★ Trắng (Tích lũy 560 Mảnh Quy Đổi Mythic / 280 Mảnh Leg); lên 2★ Trắng (12 Sao) là 600 Mảnh Mythic / 300 Mảnh Leg",
                    en: "+160 Shards to 1★ White (Cumulative 560 Mythic / 280 Leg Shards); reaching 2★ White (12 Stars) takes 600 Mythic / 300 Leg Shards",
                  },
                  {
                    vi: "3,360 Mảnh (tại 1★ Trắng — 560 / 3,360)",
                    en: "3,360 Shards (at 1★ White — 560 / 3,360)",
                  },
                  {
                    vi: "ĐIỂM GÃY VÀNG SỐ 1: Mốc 1 Sao Trắng (560 Mảnh Mythic) mở khóa hiệu ứng cường hóa kỹ năng đặc biệt (+30% Skill Effect) và kích hoạt Áp Chế Cấp Sao (Star Suppression). Mốc 2 Sao Trắng (300 Mảnh Leg) mở khóa Thức Tỉnh!",
                    en: "GOLDEN BREAKPOINT #1: 1 White Star (560 Mythic Shards) unlocks the +30% Skill Effect boost and activates Star Suppression. 2 White Stars (300 Leg Shards) unlocks Awakening!",
                  },
                ],
                [
                  {
                    vi: "Đột phá từ 1 Sao Trắng ➔ 5 Sao Trắng (Max 15 Sao)",
                    en: "Breakthrough 1 White Star ➔ 5 White Stars (Max 15 Stars)",
                  },
                  {
                    vi: "+440 Mảnh (Tích lũy 1,000 Mảnh cho Tướng Đỏ Mythic | 500 Mảnh cho Tướng Vàng Legendary)",
                    en: "+440 Shards (Cumulative 1,000 Shards for Mythic | 500 Shards for Legendary)",
                  },
                  {
                    vi: "6,000 Mảnh Tướng (6 Mythic — 1,000 / 6,000)",
                    en: "6,000 Hero Shards (6 Mythic — 1,000 / 6,000)",
                  },
                  {
                    vi: "Tối đa hóa 100% chỉ số Tấn công/Máu và mở khóa quy đổi mảnh dư trong Tiệm Đổi Quà (Exchange Shop).",
                    en: "Maximizes 100% of Attack/HP stats and unlocks excess shard conversion in the Exchange Shop.",
                  },
                ],
                [
                  {
                    vi: "Thức Tỉnh Tướng Vàng lên Đỏ (Awakening Tiers 0 ➔ 4)",
                    en: "Awakening Legendary to Mythic (Awakening Tiers 0 ➔ 4)",
                  },
                  {
                    vi: "9 Hồn Đá Đỏ (Soul Stones) + 345–385 Mảnh Tướng (bảng chuẩn cơ sở 345 Mảnh từ mốc 1–2 Sao Trắng)",
                    en: "9 Red Soul Stones + 345–385 Hero Shards (base table 345 Shards from 1–2 White Stars)",
                  },
                  {
                    vi: "Phụ thuộc vào Phe phái: Bộ Lạc (1 tướng Vàng): 9 Hồn Đá Đỏ + 345–385 Mảnh | Thiên Nhiên (2 tướng Vàng): 18 Hồn Đá Đỏ + 690–770 Mảnh | Liên Minh (3 tướng Vàng): 27 Hồn Đá Đỏ + 1,035–1,155 Mảnh",
                    en: "Faction-dependent: Horde (1 Leg hero): 9 Soul Stones + 345–385 Shards | Nature (2 Leg heroes): 18 Soul Stones + 690–770 Shards | League (3 Leg heroes): 27 Soul Stones + 1,035–1,155 Shards",
                  },
                  {
                    vi: "ĐIỂM GÃY VÀNG SỐ 2: Chứng minh tại sao đội hình 5-Mythic Bộ Lạc tiết kiệm tới 18 Hồn Đá Đỏ và ~700+ Mảnh Vạn Năng so với Liên Minh, giúp tốt nghiệp Đội 1 sớm hơn 2–3 tháng!",
                    en: "GOLDEN BREAKPOINT #2: Proves why the 5-Mythic Horde lineup saves 18 Soul Stones and ~700+ Universal Shards compared to League, graduating Queue 1 2–3 months earlier!",
                  },
                ],
                [
                  {
                    vi: "Nâng Cấp Kỹ Năng Tướng (Skill Levels Lv.1 ➔ Lv.15 Max)",
                    en: "Hero Skill Upgrades (Skill Levels Lv.1 ➔ Lv.15 Max)",
                  },
                  {
                    vi: "24,700 Sách/kỹ năng (Lv.1 ➔ Lv.10 = 8,000 Sách; Lv.11 ➔ Lv.15 = +16,700 Sách) ➔ 98,800–123,500 Sách/tướng (4–5 Kỹ năng)",
                    en: "24,700 Books/skill (Lv.1 ➔ Lv.10 = 8,000; Lv.11 ➔ Lv.15 = +16,700) ➔ 98,800–123,500 Books/hero (4–5 Skills)",
                  },
                  {
                    vi: "~600,000+ Sách Kỹ Năng (592,800–741,000 Sách cho 6 tướng)",
                    en: "~600,000+ Skill Books (592,800–741,000 Books for 6 heroes)",
                  },
                  {
                    vi: "Trần cấp độ kỹ năng cơ bản là Lv.15 (không phải Lv.20). Ưu tiên đưa các kỹ năng cốt lõi chạm điểm dừng Mid-game Lv.10 (8,000 Sách/kỹ năng) trước khi dồn 24,700 Sách/kỹ năng lên Lv.15 Max cho Carry & Main Tank.",
                    en: "Base skill level cap is Lv.15 (not Lv.20). Prioritize parking core skills at the Lv.10 Mid-game stop (8,000 Books/skill) before pushing 24,700 Books/skill to Lv.15 Max on your Carry & Main Tank.",
                  },
                ],
              ],
            },
            {
              type: "visual_diagram",
              mediaCode: "MED-1.2-03",
              variant: "metric_bars",
              title: {
                vi: "Biểu Đồ Thanh Ngang: Bài Toán 6,000 Mảnh Vàng & So Sánh Chi Phí Hồn Đá Đỏ Giữa 3 Hệ",
                en: "Metric Bar Chart: The 6,000-Shard Math & 3-Faction Soul Stone Cost Comparison",
              },
              subtitle: {
                vi: "Đối chiếu các cột mốc Mảnh Tướng (400 / 2,400 ➔ 560 / 3,360 ➔ 1,000 / 6,000) và Đá Linh Hồn (9 vs 18 vs 27 viên)",
                en: "Comparing Hero Shard milestones (400 / 2,400 ➔ 560 / 3,360 ➔ 1,000 / 6,000) and Soul Stones (9 vs. 18 vs. 27)",
              },
              nodes: [
                {
                  id: "metric-white-star-breakpoint",
                  tone: "gold",
                  badge: {
                    vi: "560 / 3,360 MẢNH (1★ TRẮNG)",
                    en: "560 / 3,360 SHARDS (1★ WHITE)",
                  },
                  title: {
                    vi: "Điểm Gãy Vàng #1: Đột Phá 1 Sao Trắng (11 Sao = 560 Mảnh Mythic / 280 Mảnh Leg)",
                    en: "Golden Breakpoint #1: 1 White Star (11 Stars = 560 Mythic / 280 Leg Shards)",
                  },
                  subtitle: {
                    vi: "Sau khi chạm 5 Sao Đỏ (400 / 2,400 Mảnh), dồn +160 Mảnh/tướng lên 1 Sao Trắng (560 / 3,360 Mảnh) để mở khóa +30% Skill Effect và kích hoạt Áp Chế Cấp Sao.",
                    en: "After hitting 5 Red Stars (400 / 2,400 Shards), push +160 Shards/hero to 1 White Star (560 / 3,360 Shards) to unlock +30% Skill Effect and Star Suppression.",
                  },
                  metrics: [
                    { vi: "400 / 2,400 Mảnh (5★ Đỏ)", en: "400 / 2,400 Shards (5★ Red)" },
                    { vi: "560 / 3,360 Mảnh (1★ Trắng)", en: "560 / 3,360 Shards (1★ White)" },
                    { vi: "1,000 / 6,000 Mảnh (5★ Trắng)", en: "1,000 / 6,000 Shards (5★ White)" },
                  ],
                },
                {
                  id: "metric-skill-books-cap",
                  tone: "blue",
                  badge: {
                    vi: "~600,000+ SÁCH (592,800–741,000)",
                    en: "~600,000+ BOOKS (592,800–741,000)",
                  },
                  title: {
                    vi: "Điểm Gãy Kỹ Năng: Lv.10 (8,000 Sách) ➔ Trần Lv.15 Max (24,700 Sách/kỹ năng)",
                    en: "Skill Book Breakpoint: Lv.10 (8,000 Books) ➔ Lv.15 Max Cap (24,700 Books/skill)",
                  },
                  subtitle: {
                    vi: "Mỗi tướng tốn 98,800–123,500 Sách (4–5 kỹ năng) để đạt trần Lv.15 Max; tổng 6 tướng Đội 1 cần 592,800–741,000 Sách Kỹ Năng.",
                    en: "Each hero requires 98,800–123,500 Books (4–5 skills) to reach Lv.15 Max; a full 6-hero Queue 1 requires 592,800–741,000 Skill Books.",
                  },
                  metrics: [
                    { vi: "Lv.10 = 8,000 Sách/kỹ năng", en: "Lv.10 = 8,000 Books/skill" },
                    { vi: "Lv.15 Max = 24,700 Sách/kỹ năng", en: "Lv.15 Max = 24,700 Books/skill" },
                    { vi: "98,800–123,500 Sách/tướng", en: "98,800–123,500 Books/hero" },
                  ],
                },
                {
                  id: "metric-soul-stone-comparison",
                  tone: "emerald",
                  badge: {
                    vi: "9 VS 18 VS 27 HỒN ĐÁ ĐỎ",
                    en: "9 VS. 18 VS. 27 SOUL STONES",
                  },
                  title: {
                    vi: "Điểm Gãy Vàng #2: So Sánh Chi Phí Thức Tỉnh Giữa 3 Hệ (Bộ Lạc 9 viên vs Thiên Nhiên 18 viên vs Liên Minh 27 viên)",
                    en: "Golden Breakpoint #2: 3-Faction Awakening Cost (Horde 9 vs. Nature 18 vs. League 27 Stones)",
                  },
                  subtitle: {
                    vi: "Đội hình 5-Mythic Bộ Lạc chỉ cần thức tỉnh 1 tướng Vàng (9 Hồn Đá Đỏ + 345–385 Mảnh), tiết kiệm 18 Hồn Đá Đỏ và ~700+ Mảnh Vạn Năng so với Liên Minh.",
                    en: "The 5-Mythic Horde lineup only awakens 1 Legendary hero (9 Red Soul Stones + 345–385 Shards), saving 18 Soul Stones and ~700+ Universal Shards over League.",
                  },
                  metrics: [
                    { vi: "Bộ Lạc: 9 Hồn Đá Đỏ + 345–385 Mảnh", en: "Horde: 9 Stones + 345–385 Shards" },
                    { vi: "Thiên Nhiên: 18 Hồn Đá Đỏ + 690–770 Mảnh", en: "Nature: 18 Stones + 690–770 Shards" },
                    { vi: "Liên Minh: 27 Hồn Đá Đỏ + 1,035–1,155 Mảnh", en: "League: 27 Stones + 1,035–1,155 Shards" },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "sub-4-2-graduation-checklist",
          title: {
            vi: "4.2. Checklist 5 Điều Kiện \"Tốt Nghiệp Đội 1\" (Queue 1 Graduation Criteria)",
            en: "4.2. Checklist: The 5 \"Queue 1 Graduation\" Criteria",
          },
          badge: {
            vi: "CHECKLIST TƯƠNG TÁC",
            en: "INTERACTIVE CHECKLIST",
          },
          blocks: [
            {
              type: "checklist",
              checklistId: "queue-1-graduation-v2",
              title: {
                vi: "5 Tiêu Chuẩn Tốt Nghiệp Đội Hình 1 (Queue 1 Graduation Criteria)",
                en: "5 Queue 1 Graduation Criteria",
              },
              description: {
                vi: "Bạn CHỈ ĐƯỢC PHÉP bắt đầu rót Mảnh Vàng Vạn Năng và Sách Kỹ Năng sang Đội hình 2 khi và chỉ khi Đội hình 1 đã đạt đủ 5/5 tiêu chuẩn tốt nghiệp sau đây:",
                en: "You are ONLY PERMITTED to start funneling Universal Legendary Shards and Skill Books into Queue 2 when and only when Queue 1 has completed all 5/5 graduation criteria below:",
              },
              items: [
                {
                  id: "grad-crit-1-stars",
                  badge: {
                    vi: "1,000 / 500 MẢNH",
                    en: "1,000 / 500 SHARDS",
                  },
                  label: {
                    vi: "Tiêu chuẩn 1 (Sao Tướng): Toàn đội đạt 3–5 Sao Trắng, Carry & Main Tank kịch trần 5 Sao Trắng",
                    en: "Criterion 1 (Hero Stars): Full team at 3–5 White Stars, Carry & Main Tank maxed at 5 White Stars",
                  },
                  detail: {
                    vi: "**Toàn đội 3–5 Sao Trắng:** Cả 6 tướng trong Đội 1 đều đạt tối thiểu `3–5 Sao Trắng` (`Platinum 3–5 Stars`).\n• **Kịch trần Chủ lực:** Tướng Carry (`Wukong` / `Storm Maiden` / `Paragon` / `Tidecaller`) và Main Tank (`Desert Prince` / `Adjudicator` / `Monk`) đạt `5 Sao Trắng` (`1,000` Mảnh Mythic / `500` Mảnh Leg).",
                    en: "**Full Team at 3–5 White Stars:** All 6 heroes in Queue 1 have reached at least `3–5 White Stars` (`Platinum 3–5 Stars`).\n• **Maxed Core Carry & Tank:** Main DPS (`Wukong` / `Storm Maiden` / `Paragon` / `Tidecaller`) and Main Tank (`Desert Prince` / `Adjudicator` / `Monk`) capped at `5 White Stars` (`1,000` Mythic / `500` Leg Shards).",
                  },
                },
                {
                  id: "grad-crit-2-awakening",
                  badge: {
                    vi: "9 HỒN ĐÁ ĐỎ + 345–385 MẢNH",
                    en: "9 SOUL STONES + 345–385 SHARDS",
                  },
                  label: {
                    vi: "Tiêu chuẩn 2 (Thức Tỉnh): Hoàn tất Thức Tỉnh Bậc 4 sang khung Đỏ Mythic hoàn toàn",
                    en: "Criterion 2 (Awakening): Complete Tier-4 Awakening into a full Red Mythic frame",
                  },
                  detail: {
                    vi: "**Hoàn tất Thức Tỉnh Bậc 4:** Tướng Vàng mảnh ghép cuối trong Đội 1 (`Soulmancer` / `Warlock` / `Pyromancer` / `Nun` / `Pixie`) đã hoàn tất `9 Hồn Đá Đỏ` + `345–385` Mảnh chuyển sang khung Đỏ Mythic.",
                    en: "**Complete Tier-4 Awakening:** The final Legendary in Queue 1 (`Soulmancer` / `Warlock` / `Pyromancer` / `Nun` / `Pixie`) has finished Awakening (`9 Red Soul Stones` + `345–385` Shards) into a Red Mythic frame.",
                  },
                },
                {
                  id: "grad-crit-3-skills",
                  badge: {
                    vi: "24,700 SÁCH/KỸ NĂNG (~600,000+ SÁCH)",
                    en: "24,700 BOOKS/SKILL (~600,000+ BOOKS)",
                  },
                  label: {
                    vi: "Tiêu chuẩn 3 (Kỹ Năng): Toàn bộ 24–30 ô kỹ năng Đội 1 đạt kịch trần Lv.15 Max",
                    en: "Criterion 3 (Skills): All 24–30 skill slots in Queue 1 capped at Lv.15 Max",
                  },
                  detail: {
                    vi: "**Kịch trần 24–30 Ô Kỹ năng:** Toàn bộ kỹ năng của 6 tướng Đội 1 đạt `Lv.15 Max` (`24,700` Sách/kỹ năng, tổng `~600,000+` Sách Kỹ năng — `592,800–741,000` Sách).",
                    en: "**Maxed 24–30 Skill Slots:** All skill slots across the 6 Queue 1 heroes are maxed at `Lv.15 Max` (`24,700` Books/skill, totaling `~600,000+` Skill Books — `592,800–741,000` Books).",
                  },
                },
                {
                  id: "grad-crit-4-gear",
                  badge: {
                    vi: "24 ĐỒ VÀNG DẤU HỆ +20/+30/+40",
                    en: "24 FACTION GOLD GEAR +20/+30/+40",
                  },
                  label: {
                    vi: "Tiêu chuẩn 4 (Trang Bị Vàng): 24 món Đồ Vàng đúng Dấu Hệ (+30% Bonus) đạt Cộng hưởng +20 đến +40",
                    en: "Criterion 4 (Golden Gear): 24 Faction-Marked Golden Gear pieces (+30% Bonus) at +20 to +40 Resonance",
                  },
                  detail: {
                    vi: "**24 Đồ Vàng Đúng Dấu Hệ:** Toàn bộ 24 món trên 6 tướng Đội 1 đều gắn đúng Dấu Hệ (`+30% Faction Bonus`).\n• **Mốc Cộng hưởng Cường hóa:** Đạt tối thiểu `+20` đến `+30` (riêng vũ khí và giày của DPS đạt `+40` hoặc lên Thần Thoại).",
                    en: "**24 Faction-Marked Gold Gear:** All 24 slots across Queue 1 have matching Faction Marks (`+30% Faction Bonus`).\n• **Enhancement Resonance:** Enhanced to at least `+20` to `+30` resonance (with DPS weapons and boots at `+40` or Mythic).",
                  },
                },
                {
                  id: "grad-crit-5-uw-pet",
                  badge: {
                    vi: "UW LV.10+ & PET THẦN THOẠI",
                    en: "UW LV.10+ & MYTHIC PET",
                  },
                  label: {
                    vi: "Tiêu chuẩn 5 (Thần Khí & Pet): Vũ khí Độc quyền đạt Lv.10+ & Pet chính đạt Huyền Thoại/Thần Thoại",
                    en: "Criterion 5 (Exclusive Weapons & Pet): Lv.10+ Exclusive Weapons & Legendary/Mythic Main Pet",
                  },
                  detail: {
                    vi: "**Thần khí & Pet Tối đa:** Cả 6 tướng Đội 1 đã mở khóa Vũ khí Độc quyền đạt `UW Lv.10+`, và Pet chính (`Cactini / Eggy / Cubbly`) đạt tiến hóa Huyền Thoại/Thần Thoại.",
                    en: "**Maxed UWs & Main Pet:** All 6 Queue 1 heroes have unlocked Exclusive Weapons at `Lv.10+`, and Queue 1's main Pet (`Cactini / Eggy / Cubbly`) has reached Legendary/Mythic evolution.",
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "sec-5-castle-26-surgery-case-study",
      isPro: true,
      title: {
        vi: "5. Kịch bản Thực chiến Nâng cao: Case Study Phẫu Thuật Tài Khoản Lâu Đài Lv.26 (3.6M Lực Chiến) Bị Lỗi Chia Mảnh",
        en: "5. Advanced Case Study: Surgical Recovery for a Shard-Split Castle Lv.26 (3.6M Power) Account",
      },
      blocks: [
        {
          type: "case_study",
          badge: {
            vi: "CASE STUDY PHẪU THUẬT • CASTLE LV.26",
            en: "SURGICAL CASE STUDY • CASTLE LV.26",
          },
          title: {
            vi: "Phác Đồ Cấp Cứu 4 Bước: Phẫu Thuật Tài Khoản Lâu Đài Lv.26 Từ 3.6M Lên 4.25M (+650,000 Power) Trong 7 Ngày",
            en: "4-Step Recovery Protocol: Castle Lv.26 Account Surgery from 3.6M to 4.25M (+650,000 Power) in 7 Days",
          },
          profileSummary: {
            vi: "**Hồ sơ Kiểm toán (`Audit Profile`):** Lâu đài `Lv.26`, Tổng lực chiến `8.4M`, nhưng Đội 1 chỉ đạt `3.6M` (trong khi F2P chuẩn cùng cấp đạt `4.8M–5.2M`).\n• **Triệu chứng Thực chiến:** Liên tục thua các tài khoản Lâu đài `Lv.24–25` trong Đấu Trường, mất Xe Hàng Legendary và kẹt cứng ở ải `Adventure Classic`.",
            en: "**Audit Profile:** Castle `Lv.26` with `8.4M` Total Influence, yet Queue 1 sits at only `3.6M` Combat Power (vs `4.8M–5.2M` for standard F2P at Castle `Lv.26`).\n• **Combat Symptoms:** Repeatedly losing to Castle `Lv.24–25` accounts in Arena, unable to defend Legendary Carriages, and stuck in `Classic Adventure`.",
          },
          metrics: [
            {
              label: {
                vi: "Lực chiến Đội hình 1 (Queue 1 Power)",
                en: "Queue 1 Combat Power",
              },
              before: { vi: "3.6M", en: "3.6M" },
              after: { vi: "4.25M", en: "4.25M" },
              delta: { vi: "+650,000 Power", en: "+650,000 Power" },
            },
            {
              label: {
                vi: "Cộng hưởng Trang bị Đội 1",
                en: "Queue 1 Gear Resonance",
              },
              before: { vi: "Đồ Vàng +6 / +8 lệch", en: "Uneven +6 / +8 Gold Gear" },
              after: { vi: "Full +10 & Carry +20", en: "Full +10 & Carry +20" },
              delta: { vi: "+280,000 Power", en: "+280,000 Power" },
            },
            {
              label: {
                vi: "Cấp độ & Đột phá Sao Đội 1",
                en: "Queue 1 Level & Star Tier",
              },
              before: { vi: "Lv.130 & <5★ Đỏ", en: "Lv.130 & <5★ Red" },
              after: { vi: "Lv.170 & 1★ Trắng (560 Mảnh)", en: "Lv.170 & 1★ White (560 Shards)" },
              delta: { vi: "+190,000 & +180,000 Power", en: "+190,000 & +180,000 Power" },
            },
          ],
          diagnostics: [
            {
              vi: "**Chia lẻ `420` Mảnh Vàng Vạn Năng:** Rải cho 9 tướng ở cả 3 hệ (`Pyromancer`, `Astrologer`, `Secret Keeper`, `Wilderness Hunter`, `Shaman`, `Treeguard`, `Windwalker`, `Desert Prince`, `Storm Maiden`).\n• **Hậu quả Đột phá Sao:** Không một tướng Đỏ nào chạm nổi mốc `5 Sao Đỏ` (`400` Mảnh) hay `1 Sao Trắng` (`560` Mảnh Quy Đổi).",
              en: "**Split `420` Universal Shards:** Spread across 9 heroes from all 3 factions (`Pyromancer`, `Astrologer`, `Secret Keeper`, `Wilderness Hunter`, `Shaman`, `Treeguard`, `Windwalker`, `Desert Prince`, `Storm Maiden`).\n• **Star Bottleneck:** Left zero Mythic heroes at `5 Red Stars` (`400` Shards) or `1 White Star` (`560` Shards).",
            },
            {
              vi: "**Lãng phí `32,000` Sách Kỹ Năng:** Đốt lượng sách tương đương 4 kỹ năng `Lv.10` (`8,000` Sách) hoặc hơn 1 kỹ năng `Lv.15 Max` (`24,700` Sách) vào các tướng ở Đội 2 và Đội 3.",
              en: "**Wasted `32,000` Skill Books:** Burned books equivalent to four `Lv.10` skills (`8,000` Books) or over one `Lv.15 Max` skill (`24,700` Books) on Queue 2 and Queue 3 combat skills.",
            },
            {
              vi: "**Chôn Quặng ở Đồ Tím Đội 2:** Giữ `12 món` Trang bị Tím `+10` trên Đội 2 trong khi `Storm Maiden` ở Đội 1 mặc 2 món Đồ Vàng kẹt ở `+6` và `+8` (mất Cộng hưởng `+10`).",
              en: "**Trapped Ore in Queue 2 Epic Gear:** Kept `12 pieces` of `+10` Epic Gear on Queue 2 while `Storm Maiden` in Queue 1 wore Golden Gear stuck at `+6` and `+8` (missing `+10` Resonance).",
            },
            {
              vi: "**Bơm Thịt Lệch Đội Phụ:** Đẩy Đội 2 và Đội 3 lên `Lv.155` làm cạn sạch kho Thịt, khiến 2 tướng Đỏ mới lấy ở Đội 1 bị kẹt cứng ở `Lv.130`.",
              en: "**Misallocated Meat to Secondary Queues:** Pushed Queue 2 and Queue 3 heroes to `Lv.155`, depleting the Meat reserve and leaving 2 new Mythic heroes in Queue 1 stuck at `Lv.130`.",
            },
          ],
          recoverySteps: [
            {
              stepNumber: "1",
              title: {
                vi: "Bước 1 — Tái chế Trang bị Đội 2 ngay lập tức (Trong 5 phút)",
                en: "Step 1 — Immediately Dismantle Queue 2 Enhanced Gear (In 5 Minutes)",
              },
              detail: {
                vi: "**Phân giải Đồ Tím Đội 2:** Tháo `12 món` Đồ Tím `+10` ở Đội 2 đưa vào Lò Rèn bấm Phân giải (`Dismantle`) để thu hồi `100%` Quặng Cường Hóa (`Enhancement Ore`).\n• **Đập Cộng hưởng Đội 1:** Đập đồng đều `24 món` của 6 tướng Đội 1 lên `+10` (riêng 4 món Vàng của Carry đẩy lên `+20`), tăng vọt `+280,000` Lực chiến thật miễn phí!",
                en: "**Dismantle Queue 2 Epic Gear:** Unequip all `12 pieces` of `+10` Epic Gear from Queue 2 and use the Blacksmith `Dismantle` tab to recover `100%` of your `Enhancement Ore`.\n• **Activate Queue 1 Resonance:** Enhance all `24 pieces` across Queue 1 evenly to `+10` (and Carry's 4 Golden pieces to `+20`), gaining `+280,000` True Combat Power for free!",
              },
              impactBadge: {
                vi: "+280,000 Power",
                en: "+280,000 Power",
              },
            },
            {
              stepNumber: "2",
              title: {
                vi: "Bước 2 — Thiết lập Lệnh Cấm Vận Tài Nguyên Đội 2/3",
                en: "Step 2 — Enforce a Strict Queue 2/3 Resource Embargo",
              },
              detail: {
                vi: "**Khóa Danh sách Đội 1:** Khoanh vùng cố định 6 vị tướng thuộc Đội 1 và đóng băng `100%` việc cấp Thịt, Sách Kỹ Năng, Mảnh Vạn Năng cho mọi tướng ngoài danh sách này.",
                en: "**Lock Queue 1 Roster:** Lock in the exact 6 heroes belonging to Queue 1 and freeze `100%` of Meat, Skill Book, and Universal Shard allocation outside this list.",
              },
              impactBadge: {
                vi: "Cắt lỗ 100%",
                en: "100% Stop-Loss",
              },
            },
            {
              stepNumber: "3",
              title: {
                vi: "Bước 3 — Gom Thịt Kéo Trần Level Đội 1",
                en: "Step 3 — Funnel Meat to Cap Queue 1 Hero Levels",
              },
              detail: {
                vi: "**Kéo Trần Level `Lv.170`:** Dồn `100%` Thịt từ Thám hiểm, Boss Bang và Rương sự kiện trong 5 ngày để kéo 2 tướng Đỏ từ `Lv.130` lên `Lv.170` ngang toàn Đội 1.\n• **Hiệu quả Thực chiến:** Cộng thêm `+190,000` Lực chiến thật và kích hoạt lại hiệu ứng Hào quang Đội hình.",
                en: "**Push to `Lv.170` Cap:** Funnel `100%` of Meat from Adventure, Guild Bosses, and Event Chests over 5 days to pull the two `Lv.130` Mythic heroes up to `Lv.170`.\n• **Combat Impact:** Adds `+190,000` True Combat Power and restores full Queue Aura scaling.",
              },
              impactBadge: {
                vi: "+190,000 Power",
                en: "+190,000 Power",
              },
            },
            {
              stepNumber: "4",
              title: {
                vi: "Bước 4 — Đột phá Điểm gãy 1 Sao Trắng (560 Mảnh Quy Đổi) vào Thứ Năm Kỳ GAR/KvK",
                en: "Step 4 — Break Through 1 White Star (560 Shards) on GAR/KvK Thursday",
              },
              detail: {
                vi: "**Tích Mảnh Chờ Thứ Năm (`GAR`):** Gom toàn bộ Mảnh Vàng Vạn Năng từ `VIP Shop`, Xe Hàng và Rương `AR` trong tuần, chờ đúng Thứ Năm Kỳ `GAR`.\n• **Đột phá `1 Sao Trắng` (`560` Mảnh):** Đẩy `Desert Prince` và `Storm Maiden` vượt `5 Sao Đỏ` (`400` Mảnh) lên `1 Sao Trắng` (`11 Sao` = `560` Mảnh), mở khóa `+30% Skill Effect` và `+180,000` Power!",
                en: "**Hoard for Thursday (`GAR`):** Save all Universal Legendary Shards from the `VIP Shop`, Carriages, and `AR` Chests during the week until `GAR` Thursday.\n• **Break `1 White Star` (`560` Shards):** Push `Desert Prince` and `Storm Maiden` past `5 Red Stars` (`400` Shards) to `1 White Star` (`11 Stars` = `560` Shards) for `+30% Skill Effect` and `+180,000` Power!",
              },
              impactBadge: {
                vi: "+180,000 Power",
                en: "+180,000 Power",
              },
            },
          ],
          conclusion: {
            vi: "**Kết quả sau 7 ngày phẫu thuật:** Đội 1 tăng vọt từ `3.6M` lên `4.25M` (`+650,000` Power = `+280,000` + `+190,000` + `+180,000`) với `0 đồng` nạp thêm.\n• **Lật ngược Thế cờ:** Thắng ngược toàn bộ các đối thủ Lâu đài `Lv.26–27` chia đều 3 đội trong Đấu Trường và Xe Hàng!",
            en: "**7-Day Recovery Result:** Queue 1 surges from `3.6M` to `4.25M` (`+650,000` Power = `+280,000` + `+190,000` + `+180,000`) with zero extra spending.\n• **Arena Turnaround:** Defeats Castle `Lv.26–27` balanced-queue opponents across Arena and Carriages!",
          },
        },
        {
          type: "media_spotlight",
          mediaCode: "MED-1.2-04",
          tier: "tier2_annotated_ui",
          title: {
            vi: "Giao Diện Lò Rèn (Blacksmith — Dismantle Tab): Phân Giải Đồ Tím +10 Đội 2",
            en: "Blacksmith Dismantle Tab UI: Recycling Queue 2's +10 Epic Gear",
          },
          description: {
            vi: "Ảnh chụp giao diện Lò Rèn (Blacksmith - Dismantle Tab) hướng dẫn phân giải Trang bị Tím +10 của Đội 2 để thu hồi 100% Quặng Cường Hóa về đập đồ Vàng +20 cho Đội 1.",
            en: "Annotated screenshot of the Blacksmith Dismantle Tab guiding players to dismantle Queue 2's +10 Epic Gear and recover 100% of Enhancement Ore to push +20 Golden Gear on Queue 1.",
          },
          annotations: [
            {
              kind: "do",
              label: {
                vi: "THÁO & PHÂN GIẢI 12 ĐỒ TÍM +10 Ở ĐỘI 2 (100% ORE REFUND)",
                en: "UNEQUIP & DISMANTLE 12 +10 EPIC GEAR ON QUEUE 2 (100% ORE REFUND)",
              },
              detail: {
                vi: "Bấm tab Phân giải (Dismantle) trong Lò Rèn để rút toàn bộ Quặng Cường Hóa bị chôn ở Đội 2 về kho mà không chịu bất kỳ hao hụt nào.",
                en: "Use the Dismantle tab in the Blacksmith to extract 100% of the Enhancement Ore trapped on Queue 2 with zero loss.",
              },
            },
            {
              kind: "info",
              label: {
                vi: "KÍCH HOẠT CỘNG HƯỞNG +10 TOÀN ĐỘI 1 & +20 CHO CARRY (+280,000 POWER)",
                en: "ACTIVATE +10 FULL-QUEUE RESONANCE & +20 CARRY GEAR (+280,000 POWER)",
              },
              detail: {
                vi: "Đập đồng đều 24 món đồ của 6 tướng Đội 1 lên mốc +10 và đẩy 4 món Vàng của Carry chính lên +20 để nhận ngay +280,000 Lực chiến thật.",
                en: "Enhance all 24 gear pieces across Queue 1 evenly to +10 and push your primary Carry's 4 Golden pieces to +20 for an instant +280,000 True Power spike.",
              },
            },
          ],
        },
        {
          type: "media_spotlight",
          mediaCode: "MED-1.2-05",
          tier: "tier4_youtube_ref",
          title: {
            vi: "Thẻ Video Tham Chiếu Quốc Tế: Tại Sao Bắt Buộc Phải Dồn 1 Đội Hình?",
            en: "International Video Reference: Why Focusing ONE Queue is Mandatory",
          },
          description: {
            vi: "Thẻ Video tham chiếu quốc tế từ kênh RedBaron Gaming phân tích chi tiết lý do F2P và Low-Spender bắt buộc phải dồn 100% tài nguyên vào Đội hình 1 trong Top Heroes.",
            en: "International reference video card from RedBaron Gaming explaining why focusing 100% of scarce resources into a single Main Queue is mandatory for F2P and Low Spenders in Top Heroes.",
          },
          videoChannel: "RedBaron Gaming",
          videoTitle:
            "Why Focusing ONE Queue is Mandatory for F2P & Low Spenders in Top Heroes",
          videoTimestamp: "01:30 – 06:45",
          videoUrl:
            "https://www.youtube.com/results?search_query=RedBaron+Gaming+Why+Focusing+ONE+Queue+is+Mandatory+Top+Heroes",
        },
      ],
    },
  ],
};

import type {
  EventPlaybookArticleCode,
  EventPlaybookRecord,
  EventSeasonTag,
} from "./types";

/**
 * ZONE II PART 3 — S0 ➔ GAR EVENT PLAYBOOKS SSoT DATA (10 CANONICAL EVENTS)
 * Covers all events from Server Day 1 (S0) through Guild Arms Race (GAR — Day 28+).
 */
const PLAYBOOKS_PART_1: readonly EventPlaybookRecord[] = [
  // ==========================================================================
  // 1. TOP LORD (S0 DAYS 1–14) — ARTICLE 9.1
  // ==========================================================================
  {
    id: "top-lord",
    articleCode: "9.1",
    seasons: ["S0", "S1", "S2", "S3", "S4"],
    iconPath: "/images/events/entry-icons/Activity_106.webp",
    rarity: "mythic",
    faction: "league",
    name: {
      vi: "Chúa Tể Tối Cao (Top Lord / Chuỗi Đua 6 Giai Đoạn)",
      en: "Top Lord (6-Stage Server Opening Point Race)",
    },
    cadenceBadge: {
      vi: "6 Ngày / Chu kỳ mở máy chủ & Đua Cá Nhân",
      en: "6 Days / Server Opening & Solo Sprint Cycle",
    },
    s0TimingBadge: {
      vi: "Mùa S0: Ngày 1 – Ngày 14 (Tuần 1–2)",
      en: "Season S0: Day 1 – Day 14 (Weeks 1–2)",
    },
    overview: {
      summary: {
        vi: "Sự kiện đua điểm 6 giai đoạn đầu tiên của máy chủ mới (S0 Ngày 1–14), định hình thứ hạng lực chiến ban đầu và trao mảnh tướng Đỏ dẫn đường trước khi bước vào chu kỳ GAR.",
        en: "The inaugural 6-stage point race of a new server (S0 Days 1–14), establishing initial power rankings and awarding early Red hero shards before the GAR cycle begins.",
      },
      coreLoop: {
        vi: "Mỗi ngày mở 1 chủ đề tính điểm riêng biệt lúc 00:00 UTC (07:00 Giờ VN): Xây dựng ➔ Nghiên cứu ➔ Chiêu mộ ➔ Huấn luyện lính ➔ Trang bị ➔ Tổng lực tăng tốc.",
        en: "Each day unlocks a dedicated scoring theme at 00:00 UTC: Construction ➔ Research ➔ Recruitment ➔ Troop Training ➔ Gear Upgrade ➔ All-Out Speedup Sprint.",
      },
      carryoverRule: {
        vi: "Điểm giai đoạn không cộng dồn sang kỳ sau; nhưng Vé Chiêu Mộ, Mảnh Vạn Năng và Tăng Tốc chưa dùng được bảo lưu 100% trong túi đồ cá nhân.",
        en: "Stage points do not carry over to future runs; however, unused Recruit Tokens, Universal Shards, and Speedups are 100% retained in your inventory.",
      },
      goldenRule: {
        vi: "Người chơi F2P và Low-Spender chỉ xả tài nguyên vừa đủ ăn mốc rương điểm cá nhân bậc 3 (Tier 3 Chests), tuyệt đối không đốt sạch Kim Cương đua Top 10 với Whale.",
        en: "F2P and Low-Spender players should only spend enough resources to claim Tier 3 personal milestone chests, never draining Diamonds to chase Top 10 against Whales.",
      },
    },
    hoardingItems: [
      {
        id: "tl-recruit-token",
        name: {
          vi: "Vé Chiêu Mộ Anh Hùng (Recruit Token)",
          en: "Hero Recruit Token",
        },
        iconPath: "/images/ui/rarities/icon_recruit.webp",
        rarity: "legendary",
        targetAmount: {
          vi: "150 – 300 Vé trước Ngày Chiêu Mộ",
          en: "150 – 300 Tokens before Recruitment Day",
        },
        freezeWindow: {
          vi: "Ngừng quay lẻ ở quán rượu ngay sau khi đủ đội hình 5 tướng mở màn Ngày 1",
          en: "Stop random tavern pulls right after assembling your starter 5-hero team on Day 1",
        },
        dumpTiming: {
          vi: "Xả vào Giai đoạn Chiêu Mộ hoặc giữ lại cho sự kiện Hero Gacha tuần kế tiếp",
          en: "Dump during the Recruitment stage or hold for the upcoming Hero Gacha event",
        },
      },
      {
        id: "tl-speedups",
        name: {
          vi: "Tăng Tốc Xây Dựng / Nghiên Cứu / Luyện Lính",
          en: "Construction / Research / Training Speedups",
        },
        iconPath: "/images/ui/rarities/icon_speedUp.webp",
        rarity: "epic",
        targetAmount: {
          vi: "30 – 50 Giờ tăng tốc mỗi loại",
          en: "30 – 50 Hours of speedups per category",
        },
        freezeWindow: {
          vi: "Chỉ dùng tăng tốc miễn phí dưới 5 phút ngoài khung giờ tính điểm",
          en: "Use only free instant speedups outside active scoring windows",
        },
        dumpTiming: {
          vi: "Khớp lệnh xả vào đúng ngày chủ đề Xây Dựng, Khoa Kỹ hoặc Huấn Luyện Lính",
          en: "Align speedup dumps strictly with Construction, Tech, or Troop Training days",
        },
      },
      {
        id: "tl-uni-shards",
        name: {
          vi: "Mảnh Anh Hùng Vạn Năng (Universal Hero Shard)",
          en: "Universal Hero Shard",
        },
        iconPath: "/images/items/shards/icon_30175.webp",
        rarity: "legendary",
        targetAmount: {
          vi: "50 – 100 Mảnh Vàng dự trữ",
          en: "50 – 100 Legendary Shards in reserve",
        },
        freezeWindow: {
          vi: "Khóa 100% Mảnh Vạn Năng, không nâng sao dàn trải cho tướng SSR phụ",
          en: "Lock 100% of Universal Shards; never spread star upgrades across secondary SSR heroes",
        },
        dumpTiming: {
          vi: "Chỉ dùng vừa đủ mốc rương cá nhân Ngày Nâng Cấp Tướng, ưu tiên giữ cho Desert Prince (Ngày 21) và Storm Maiden (Ngày 27)",
          en: "Spend only to hit personal chest thresholds on Hero Day, saving the rest for Desert Prince (Day 21) and Storm Maiden (Day 27)",
        },
      },
    ],
    dailyStages: [
      {
        dayNumber: 1,
        label: { vi: "Ngày 1", en: "Day 1" },
        theme: {
          vi: "Xây Dựng Lãnh Thổ (Territory Construction)",
          en: "Territory Construction",
        },
        goldenWindow: {
          vi: "02:00 UTC (09:00 Giờ VN) & 14:00 UTC (21:00 Giờ VN)",
          en: "02:00 UTC & 14:00 UTC",
        },
        primaryScoring: {
          vi: "Điểm lực chiến công trình hoàn thành và mỗi phút Tăng Tốc Xây Dựng tiêu thụ",
          en: "Completed building power gain and every minute of Construction Speedup consumed",
        },
        proTip: {
          vi: "Bắt đầu nâng Lâu Đài Chính từ tối hôm trước để công trình hoàn tất ngay sau 00:00 UTC (07:00 Giờ VN).",
          en: "Start upgrading your Main Castle the night before so completion lands right after 00:00 UTC.",
        },
        doubleDipTarget: {
          vi: "Khớp với ca Đua Điểm 4 Giờ chủ đề Xây Dựng",
          en: "Overlap with the 4-Hour Mini-Sprint Construction window",
        },
      },
      {
        dayNumber: 2,
        label: { vi: "Ngày 2", en: "Day 2" },
        theme: {
          vi: "Đột Phá Khoa Kỹ (Tech Research)",
          en: "Tech Research Breakthrough",
        },
        goldenWindow: {
          vi: "06:00 UTC (13:00 Giờ VN) & 18:00 UTC (01:00 Giờ VN)",
          en: "06:00 UTC & 18:00 UTC",
        },
        primaryScoring: {
          vi: "Điểm lực chiến công nghệ hoàn tất và mỗi phút Tăng Tốc Nghiên Cứu",
          en: "Completed tech power gain and every minute of Research Speedup used",
        },
        proTip: {
          vi: "Ưu tiên nâng nhánh Kinh Tế và Chuẩn Bị Vũ Trang để mở khóa nhân đôi phần thưởng sớm nhất.",
          en: "Prioritize Economy and Arms Race Prep branches to unlock double rewards as early as possible.",
        },
        doubleDipTarget: {
          vi: "Khớp với nhiệm vụ Nghiên Cứu của Đua Bang 2 Ngày",
          en: "Overlap with 2-Day Guild Rush Research tasks",
        },
      },
      {
        dayNumber: 3,
        label: { vi: "Ngày 3", en: "Day 3" },
        theme: {
          vi: "Chiêu Mộ & Phát Triển Anh Hùng (Hero Development)",
          en: "Hero Recruitment & Development",
        },
        goldenWindow: {
          vi: "02:00 UTC (09:00 Giờ VN) & 10:00 UTC (17:00 Giờ VN)",
          en: "02:00 UTC & 10:00 UTC",
        },
        primaryScoring: {
          vi: "Sử dụng Vé Chiêu Mộ, tiêu thụ Mảnh Anh Hùng SSR/UR và Sách Kỹ Năng",
          en: "Using Recruit Tokens, consuming SSR/UR Hero Shards, and spending Skill Books",
        },
        proTip: {
          vi: "Ghép mảnh tướng cụ thể từ túi đồ trước, hạn chế đụng vào Mảnh Vạn Năng Vàng.",
          en: "Combine specific hero shards from your bag first; avoid touching Universal Legendary Shards.",
        },
        doubleDipTarget: {
          vi: "Khớp với ca 4 Giờ Tăng Sao Anh Hùng",
          en: "Overlap with the 4-Hour Hero Star-Up window",
        },
      },
      {
        dayNumber: 4,
        label: { vi: "Ngày 4", en: "Day 4" },
        theme: {
          vi: "Huấn Luyện Quân Đội (Troop Training & Promotion)",
          en: "Troop Training & Promotion",
        },
        goldenWindow: {
          vi: "10:00 UTC (17:00 Giờ VN) & 18:00 UTC (01:00 Giờ VN)",
          en: "10:00 UTC & 18:00 UTC",
        },
        primaryScoring: {
          vi: "Huấn luyện lính mới và Thăng Cấp (Promote) lính bậc thấp lên bậc cao nhất",
          en: "Training new troops and promoting lower-tier units to your highest unlocked tier",
        },
        proTip: {
          vi: "Áp dụng kỹ thuật Pre-cook: luyện sẵn mẻ lính bậc thấp từ ngày hôm trước và nhấn Promote lên bậc cao nhất trong giờ vàng.",
          en: "Apply Pre-cooking: pre-train lower-tier batches the day before and promote them to max tier during the golden window.",
        },
        doubleDipTarget: {
          vi: "Khớp với ca 4 Giờ Huấn Luyện Quân Đội",
          en: "Overlap with the 4-Hour Troop Training window",
        },
      },
      {
        dayNumber: 5,
        label: { vi: "Ngày 5", en: "Day 5" },
        theme: {
          vi: "Rèn Trang Bị & Cổ Vật (Gear & Relic Enhancement)",
          en: "Gear & Relic Enhancement",
        },
        goldenWindow: {
          vi: "06:00 UTC (13:00 Giờ VN) & 14:00 UTC (21:00 Giờ VN)",
          en: "06:00 UTC & 14:00 UTC",
        },
        primaryScoring: {
          vi: "Tiêu thụ Kim Loại Tinh Luyện, Chỉ Ma Thuật, Orichalcum và Mảnh Cổ Vật",
          en: "Consuming Refined Metal, Magic Thread, Orichalcum, and Relic Shards",
        },
        proTip: {
          vi: "Nâng đều 6 món Trang Bị Lãnh Chúa theo mốc kích hoạt cộng hưởng bộ (Set Bonus) để tối đa hóa chỉ số.",
          en: "Upgrade all 6 Lord Gear pieces evenly to hit Set Bonus milestones for maximum stat efficiency.",
        },
        doubleDipTarget: {
          vi: "Khớp với sự kiện phụ Rèn Đúc Trang Bị 2 Ngày",
          en: "Overlap with the 2-Day Gear Forging Mini-Rush",
        },
      },
      {
        dayNumber: 6,
        label: { vi: "Ngày 6", en: "Day 6" },
        theme: {
          vi: "Nước Rút Tổng Lực (Final Sprint & Power Surge)",
          en: "Final Sprint & Power Surge",
        },
        goldenWindow: {
          vi: "14:00 UTC (21:00 Giờ VN) – 23:55 UTC (06:55 Giờ VN)",
          en: "14:00 UTC – 23:55 UTC",
        },
        primaryScoring: {
          vi: "Tổng hợp mọi loại Tăng Tốc, điểm tiêu diệt quái bản đồ và tăng trưởng lực chiến ròng",
          en: "Combined Speedups of all types, world map monster kills, and net power growth",
        },
        proTip: {
          vi: "Kiểm tra bảng xếp hạng 15 phút trước giờ đóng sổ 00:00 UTC (07:00 Giờ VN); chỉ xả thêm nếu chắc chắn giữ được mốc thưởng.",
          en: "Check leaderboards 15 minutes before the 00:00 UTC cutoff; only spend extra if a higher bracket is guaranteed.",
        },
        doubleDipTarget: {
          vi: "Khớp với ca 4 Giờ Tăng Tốc Tổng Hợp cuối tuần",
          en: "Overlap with the weekend All-Speedup 4-Hour window",
        },
      },
    ],
    economy: {
      preBuyStrategy: {
        vi: "Không mua gói nạp đắt tiền chỉ để đua Top Lord tuần 1; ưu tiên kích hoạt Hàng Đợi Xây Dựng Thứ 2 và Thẻ Tháng để tích lũy Tăng Tốc bền vững.",
        en: "Do not buy expensive packs just to chase Week 1 Top Lord rankings; prioritize the 2nd Construction Queue and Monthly Pass for steady Speedup accumulation.",
      },
      diamondCeiling: {
        vi: "Trần Kim Cương cho phép: 0 – 2.000 Kim Cương (chỉ mua Tăng Tốc giảm giá sâu trong VIP Shop).",
        en: "Allowed Diamond Ceiling: 0 – 2,000 Diamonds (only buy deeply discounted VIP Shop Speedups).",
      },
      budgetTiers: [
        {
          tierId: "f2p",
          label: { vi: "F2P ($0)", en: "F2P ($0)" },
          budgetRange: { vi: "$0 / Sự kiện", en: "$0 / Event" },
          strategy: {
            vi: "Ăn trọn mốc rương cá nhân bậc 2–3 mỗi ngày, bảo toàn 100% Kim Cương và Mảnh Vạn Năng cho Ngày 21–28.",
            en: "Claim Tier 2–3 personal chests daily while preserving 100% of Diamonds and Universal Shards for Days 21–28.",
          },
          targetMilestone: {
            vi: "100% Rương Cá Nhân Bậc 3 (Không đua BXH)",
            en: "100% Tier 3 Personal Chests (Ignore Leaderboard)",
          },
        },
        {
          tierId: "low_mid",
          label: {
            vi: "Low-Mid Spender ($5 – $25)",
            en: "Low-Mid Spender ($5 – $25)",
          },
          budgetRange: { vi: "$4.99 – $19.99", en: "$4.99 – $19.99" },
          strategy: {
            vi: "Mở Hàng Đợi Xây Dựng số 2 + Quỹ Trưởng Thành (Growth Fund), lấy Top 20–50 tự nhiên nhờ lệch nhịp giờ vàng.",
            en: "Unlock 2nd Builder Queue + Growth Fund, securing Top 20–50 naturally via golden window timing.",
          },
          targetMilestone: {
            vi: "100% Rương Cá Nhân + Top 20–50 Tổng",
            en: "100% Personal Chests + Top 20–50 Overall",
          },
        },
        {
          tierId: "whale",
          label: { vi: "Whale ($100+)", en: "Whale ($100+)" },
          budgetRange: { vi: "$99.99+", en: "$99.99+" },
          strategy: {
            vi: "Thâu tóm gói Nguyên Liệu Trang Bị Lãnh Chúa (Ngày 5) vì chỉ số Lord Gear giữ nguyên giá trị vĩnh viễn qua mọi mùa giải.",
            en: "Focus spend on Lord Gear Material packs (Day 5) since Lord Gear stats retain permanent value across all seasons.",
          },
          targetMilestone: {
            vi: "Top 1 – Top 3 Máy Chủ & Khung Danh Hiệu Vĩnh Viễn",
            en: "Server Top 1–3 & Permanent Title Frame",
          },
        },
      ],
      shopTierList: [
        {
          id: "tl-shop-uni-shard",
          tier: "S",
          itemName: {
            vi: "Mảnh Anh Hùng Vạn Năng (Universal Hero Shard)",
            en: "Universal Hero Shard",
          },
          iconPath: "/images/items/shards/icon_30175.webp",
          rarity: "legendary",
          costAndCap: {
            vi: "Ưu tiên số 1 — Mua kịch trần giới hạn tuần",
            en: "Priority #1 — Buy out weekly cap",
          },
          verdict: {
            vi: "BẮT BUỘC MUA: Nguồn nâng sao cốt lõi cho tướng Thần Thoại Horde.",
            en: "MUST BUY: Core star-up fuel for Horde Mythic heroes.",
          },
        },
        {
          id: "tl-shop-speedup",
          tier: "A",
          itemName: {
            vi: "Tăng Tốc Nghiên Cứu / Xây Dựng (Speedups)",
            en: "Research / Construction Speedups",
          },
          iconPath: "/images/ui/rarities/icon_speedUp.webp",
          rarity: "epic",
          costAndCap: {
            vi: "Mua khi giảm giá >= 40% hoặc dư xu đổi",
            en: "Buy when discounted >= 40% or with surplus tokens",
          },
          verdict: {
            vi: "KHUYẾN NGHỊ: Tích trữ phục vụ mở khóa nhánh công nghệ GAR.",
            en: "RECOMMENDED: Stockpile to rush the GAR tech branch.",
          },
        },
        {
          id: "tl-shop-promo-stone",
          tier: "F",
          itemName: {
            vi: "Đá Thăng Cấp / Rương Tài Nguyên Thường",
            en: "Basic Promotion Stone / Common Resource Chests",
          },
          iconPath: "/images/items/materials/icon_30382.webp",
          rarity: "rare",
          costAndCap: {
            vi: "Không giới hạn — Cấm đổi bằng xu hiếm",
            en: "Unlimited — Never trade rare tokens for this",
          },
          verdict: {
            vi: "BẪY TÀI NGUYÊN: Có thể cày miễn phí dư thừa từ bản đồ thế giới.",
            en: "RESOURCE TRAP: Easily farmed for free from world map stages.",
          },
        },
      ],
    },
  },

  // ==========================================================================
  // 2. GUILD RACE (S0 DAY 15+ BIWEEKLY) — ARTICLE 9.1
  // ==========================================================================
  {
    id: "guild-race",
    articleCode: "9.1",
    seasons: ["S0", "S1", "S2", "S3", "S4"],
    iconPath: "/images/events/entry-icons/Activity_109.webp",
    rarity: "legendary",
    faction: "neutral",
    name: {
      vi: "Thi Đấu Hội (Guild Race — Bảng Nhiệm Vụ 9 Ô)",
      en: "Guild Race (9-Slot Task Board Cycle)",
    },
    cadenceBadge: {
      vi: "7 Ngày / Luân phiên 2 tuần 1 lần với GAR",
      en: "7 Days / Biweekly alternation with GAR",
    },
    s0TimingBadge: {
      vi: "Mùa S0: Khởi chạy từ Tuần 3 (Ngày 15–21) & Lặp lại",
      en: "Season S0: Starts Week 3 (Days 15–21) & Repeats Biweekly",
    },
    overview: {
      summary: {
        vi: "Sự kiện bang hội 7 ngày sử dụng bảng nhiệm vụ dùng chung 9 ô (Shared 9-Slot Board), là nguồn cày Vinh Dự Bang Hội (Guild Honor) quan trọng nhất để mua Đá Linh Hồn Đỏ mỗi tuần.",
        en: "A 7-day guild event featuring a shared 9-slot task board, serving as the primary source of Guild Honor to purchase weekly Red Soul Stones.",
      },
      coreLoop: {
        vi: "Thành viên nhận nhiệm vụ trên bảng 9 ô (ưu tiên nhiệm vụ Vàng/Đỏ điểm cao +220 đến +300 điểm); R4/R5 có quyền xóa nhiệm vụ rác điểm thấp (Refresh 30 phút).",
        en: "Members claim tasks from the 9-slot board (prioritizing high-point Gold/Red tasks worth +220 to +300 pts); R4/R5 officers purge low-tier trash tasks (30m cooldown).",
      },
      carryoverRule: {
        vi: "Điểm Thi Đấu Hội reset khi kết thúc tuần, nhưng tiền tệ Vinh Dự Bang Hội (Guild Honor) và Xu Bang Hội được bảo lưu vĩnh viễn trong ví.",
        en: "Guild Race points reset at the end of the week, while Guild Honor and Guild Coins carry over permanently in your wallet.",
      },
      goldenRule: {
        vi: "Chỉ nhận nhiệm vụ khi bạn đã có sẵn tài nguyên trong túi để hoàn thành ngay lập tức; tuyệt đối không ngâm nhiệm vụ làm tắc bảng chung của cả bang.",
        en: "Only accept a task when you already hold the required items to complete it immediately; never camp on a task and clog the shared guild board.",
      },
    },
    hoardingItems: [
      {
        id: "gr-stamina",
        name: {
          vi: "Bình Thể Lực (Stamina Potions)",
          en: "Stamina Potions",
        },
        iconPath: "/images/items/consumables/icon_30037.webp",
        rarity: "epic",
        targetAmount: {
          vi: "20 – 40 Bình Thể Lực trong túi",
          en: "20 – 40 Stamina Potions in bag",
        },
        freezeWindow: {
          vi: "Không uống bình thể lực khi chỉ đánh quái lẻ không có nhiệm vụ Guild Race",
          en: "Do not drink stamina potions for random monster kills without an active Guild Race task",
        },
        dumpTiming: {
          vi: "Dùng ngay khi nhận được nhiệm vụ Vàng tiêu hao Thể Lực hoặc Diệt Boss Rally",
          en: "Use immediately upon claiming a Gold Stamina Consumption or Boss Rally task",
        },
      },
      {
        id: "gr-guild-coins",
        name: {
          vi: "Xu Cống Hiến & Tăng Tốc Ngắn Hạn",
          en: "Guild Coins & Short-Duration Speedups",
        },
        iconPath: "/images/items/currencies/icon_10006.webp",
        rarity: "rare",
        targetAmount: {
          vi: "15 – 25 Giờ Tăng Tốc Tổng Hợp",
          en: "15 – 25 Hours of Universal Speedups",
        },
        freezeWindow: {
          vi: "Giữ lại các gói tăng tốc 5m/15m/60m từ thứ Sáu tuần trước",
          en: "Hold 5m/15m/60m speedups starting Friday of the preceding week",
        },
        dumpTiming: {
          vi: "Xả dứt điểm trong 5 phút sau khi nhận nhiệm vụ Tăng Tốc +240 điểm trên bảng 9 ô",
          en: "Dump within 5 minutes of claiming a +240pt Speedup task on the 9-slot board",
        },
      },
      {
        id: "gr-bounty-scrolls",
        name: {
          vi: "Lượt Nhiệm Vụ Treo Thưởng & Thức Ăn Thú Cưng",
          en: "Bounty Quests & Pet Food Reserves",
        },
        iconPath: "/images/items/currencies/icon_10035.webp",
        rarity: "epic",
        targetAmount: {
          vi: "10.000+ Thức Ăn Thú Cưng & 6 nhiệm vụ Bounty chờ thu hoạch",
          en: "10,000+ Pet Food & 6 completed Bounty quests waiting to be claimed",
        },
        freezeWindow: {
          vi: "Làm xong nhiệm vụ Bounty nhưng khoan bấm Nhận Thưởng trước khi nhận quest Guild Race",
          en: "Finish Bounty quests on the map but hold off clicking Claim until you grab the Guild Race task",
        },
        dumpTiming: {
          vi: "Nhận quest Guild Race ➔ Bấm thu hoạch 6 nhiệm vụ Bounty trong 10 giây",
          en: "Claim the Guild Race task ➔ Harvest all 6 pre-completed Bounty quests in 10 seconds",
        },
      },
    ],
    dailyStages: [
      {
        dayNumber: 1,
        label: { vi: "Giai đoạn 1 (Ngày 1–3)", en: "Phase 1 (Days 1–3)" },
        theme: {
          vi: "Lọc Bảng 9 Ô & Tích Điểm Nhiệm Vụ Nông Nghiệp",
          en: "9-Slot Board Filtering & Farming Task Accumulation",
        },
        goldenWindow: {
          vi: "00:00 UTC (07:00 Giờ VN) & 12:00 UTC (19:00 Giờ VN)",
          en: "00:00 UTC & 12:00 UTC",
        },
        primaryScoring: {
          vi: "Nhiệm vụ Thu thập tài nguyên, Nhiệm vụ Treo thưởng (Bounty), Hỗ trợ đồng minh và Tiêu hao Thể lực",
          en: "Resource gathering, Bounty quests, Guild Help clicks, and Stamina expenditure tasks",
        },
        proTip: {
          vi: "Phân công R4 trực xoay vòng mỗi 30 phút để xóa toàn bộ nhiệm vụ Xanh/Tím dưới 150 điểm.",
          en: "Assign R4 officers on 30-minute rotations to delete all Blue/Purple tasks below 150 points.",
        },
        doubleDipTarget: {
          vi: "Khớp với nhiệm vụ Đua Bang 2 Ngày (Guild Rush)",
          en: "Overlap with 2-Day Guild Rush daily objectives",
        },
      },
      {
        dayNumber: 2,
        label: { vi: "Giai đoạn 2 (Ngày 4–7)", en: "Phase 2 (Days 4–7)" },
        theme: {
          vi: "Bứt Tốc Nhiệm Vụ Độc Quyền Cá Nhân & Chốt Mốc Rương Bang",
          en: "Exclusive Personal Tasks & Final Guild Chest Push",
        },
        goldenWindow: {
          vi: "14:00 UTC (21:00 Giờ VN) – 22:00 UTC (05:00 Giờ VN)",
          en: "14:00 UTC – 22:00 UTC",
        },
        primaryScoring: {
          vi: "Nhiệm vụ Độc Quyền (Exclusive Slot thứ 10 của cá nhân) và Nhiệm vụ Vàng +300 điểm",
          en: "Personal Exclusive Slot (10th slot) tasks and +300pt Gold/Red tasks",
        },
        proTip: {
          vi: "Chỉ mua thêm 1–2 lượt vé nhiệm vụ (100–200 Kim Cương) nếu xuất hiện nhiệm vụ Đỏ +300 điểm.",
          en: "Only buy 1–2 extra task attempts (100–200 Diamonds) when a +300pt Red task appears.",
        },
        doubleDipTarget: {
          vi: "Khớp với đợt Tập Kích Cự Ma (Giant Raid) cuối tuần",
          en: "Overlap with weekend Giant Raid rallies",
        },
      },
    ],
    economy: {
      preBuyStrategy: {
        vi: "Không cần nạp tiền mặt cho Guild Race; chỉ cần dự trữ 500 – 1.000 Kim Cương để mua thêm lượt nhiệm vụ khi xoay (roll) ra nhiệm vụ Đỏ điểm tối đa.",
        en: "No cash purchases needed for Guild Race; simply keep 500–1,000 Diamonds to buy extra task attempts when you roll maximum-point Red tasks.",
      },
      diamondCeiling: {
        vi: "Trần Kim Cương tối ưu: 100 – 300 Kim Cương/ngày (chỉ mua lượt thứ 1 và thứ 2).",
        en: "Optimal Diamond Ceiling: 100–300 Diamonds/day (buy only the 1st and 2nd extra attempts).",
      },
      budgetTiers: [
        {
          tierId: "f2p",
          label: { vi: "F2P ($0)", en: "F2P ($0)" },
          budgetRange: { vi: "$0 (Dùng 300–500 Kim Cương)", en: "$0 (Spend 300–500 Diamonds)" },
          strategy: {
            vi: "Chỉ chọn nhiệm vụ từ +180 điểm trở lên ở ô độc quyền cá nhân, tích đủ Vinh Dự Bang mua Đá Linh Hồn Đỏ.",
            en: "Only pick tasks worth +180 points or higher in your personal slot, banking enough Guild Honor for Red Soul Stones.",
          },
          targetMilestone: {
            vi: "Mốc Rương Tối Đa Của Bang & 1 Đá Linh Hồn Đỏ/Tuần",
            en: "Max Guild Milestone Chest & 1 Red Soul Stone/Week",
          },
        },
        {
          tierId: "low_mid",
          label: {
            vi: "Low-Mid Spender ($5 – $15)",
            en: "Low-Mid Spender ($5 – $15)",
          },
          budgetRange: { vi: "$0 – $4.99", en: "$0 – $4.99" },
          strategy: {
            vi: "Mua thêm 1 lượt nhiệm vụ mỗi ngày bằng Kim Cương và tận dụng nhiệm vụ mua Gói $0.99 khi trùng ngày nạp Storm Maiden.",
            en: "Buy 1 extra daily attempt with Diamonds and leverage $0.99 pack tasks when coinciding with Storm Maiden pre-buys.",
          },
          targetMilestone: {
            vi: "Top 10 Cống Hiến Bang & Mua Sạch Đá Linh Hồn + Mảnh Vàng",
            en: "Top 10 Guild Contribution & Clear Soul Stone + Shard Stock",
          },
        },
        {
          tierId: "whale",
          label: { vi: "Whale ($50+)", en: "Whale ($50+)" },
          budgetRange: { vi: "$19.99+", en: "$19.99+" },
          strategy: {
            vi: "Nhận các nhiệm vụ Tiêu Kim Cương và Nạp Gói trên bảng 9 ô để giải phóng nhanh bảng nhiệm vụ cho anh em F2P trong bang.",
            en: "Clear Diamond-Spend and Pack-Purchase tasks on the 9-slot board to free up farming slots for F2P guildmates.",
          },
          targetMilestone: {
            vi: "Top 1–3 Bang Hội & Kéo Bang Lên Hạng Huyền Thoại",
            en: "Top 1–3 Guild Rank & Carry Guild to Legendary League",
          },
        },
      ],
      shopTierList: [
        {
          id: "gr-shop-soul-stone",
          tier: "S",
          itemName: {
            vi: "Đá Linh Hồn Đỏ / Hồn Thạch Horde (Red Soul Stone)",
            en: "Red Soul Stone / Horde Soul Stone",
          },
          iconPath: "/images/items/shards/icon_30231.webp",
          rarity: "mythic",
          costAndCap: {
            vi: "6.000 Vinh Dự Bang — Giới hạn 1 viên/tuần",
            en: "6,000 Guild Honor — Cap: 1 per week",
          },
          verdict: {
            vi: "BẮT BUỘC MUA SỐ 1: Vật phẩm thức tỉnh tướng SSR lên Thần Thoại Đỏ.",
            en: "PRIORITY #1 MUST BUY: Mandatory material to awaken SSR heroes to Mythic Red.",
          },
        },
        {
          id: "gr-shop-uni-shard",
          tier: "A",
          itemName: {
            vi: "Mảnh Anh Hùng Vạn Năng (Universal Hero Shard)",
            en: "Universal Hero Shard",
          },
          iconPath: "/images/items/shards/icon_30175.webp",
          rarity: "legendary",
          costAndCap: {
            vi: "Chỉ mua sau khi đã giữ sàn an toàn 6.000 Vinh Dự Bang",
            en: "Buy only after securing the 6,000 Guild Honor safety floor",
          },
          verdict: {
            vi: "MUA KHI DƯ QUỸ: Tăng tốc độ nâng sao cho đội hình chính.",
            en: "SURPLUS BUY: Accelerates star progression for your main march.",
          },
        },
        {
          id: "gr-shop-gear-box",
          tier: "F",
          itemName: {
            vi: "Rương Trang Bị Tím & Đá Cường Hóa Sơ Cấp",
            en: "Purple Gear Chest & Basic Enhancement Stones",
          },
          iconPath: "/images/items/materials/icon_30382.webp",
          rarity: "rare",
          costAndCap: {
            vi: "Mọi mức giá — Cấm tuyệt đối dùng Vinh Dự Bang để đổi",
            en: "Any price — Strictly forbidden to spend Guild Honor on this",
          },
          verdict: {
            vi: "PHÁ SẢN TÀI KHOẢN: Làm chậm tiến độ thức tỉnh tướng suốt 4 tuần.",
            en: "ACCOUNT BRICK TRAP: Delays your hero awakening timeline by 4 weeks.",
          },
        },
      ],
    },
  },

  // ==========================================================================
  // 3. GUILD ARMS RACE (GAR — 6 DAYS, S0 DAY 28+) — ARTICLE 9.1 (SPOTLIGHT!)
  // ==========================================================================
  {
    id: "guild-arms-race",
    articleCode: "9.1",
    seasons: ["S0", "S1", "S2", "S3", "S4"],
    iconPath: "/images/events/entry-icons/Activity_101.webp",
    rarity: "mythic",
    faction: "horde",
    name: {
      vi: "Đua Vũ Trang Bang Hội (Guild Arms Race / GAR 6 Ngày)",
      en: "Guild Arms Race (GAR — 6-Day Guild Matchup)",
    },
    cadenceBadge: {
      vi: "6 Ngày / Trọng tâm Chiến Lược Mùa S0 ➔ S4",
      en: "6 Days / Core Strategic Pillar Across S0 ➔ S4",
    },
    s0TimingBadge: {
      vi: "Mùa S0: Ngày 28+ (Ngay sau ngày ra mắt Storm Maiden Ngày 27!)",
      en: "Season S0: Day 28+ (Immediately following Day 27 Storm Maiden launch!)",
    },
    overview: {
      summary: {
        vi: "Sự kiện đối kháng bang hội quan trọng nhất Top Heroes kéo dài 6 ngày liên tiếp (mỗi ngày 1 chủ đề quyết định điểm Thắng/Bại toàn bang). Ở S0, GAR bùng nổ ngay Ngày 28 — đúng 24 giờ sau khi ra mắt Storm Maiden (Ngày 27).",
        en: "The most critical 6-day guild-vs-guild event in Top Heroes (each day featuring a distinct scoring theme that decides daily Guild Victory points). In S0, GAR ignites on Day 28 — just 24 hours after Storm Maiden's Day 27 debut.",
      },
      coreLoop: {
        vi: "Mỗi ngày mở 9 Rương Cá Nhân (3 bậc x 3 rương). Bắt buộc nâng nhánh công nghệ Arms Race Prep (Chuẩn Bị Vũ Trang) đạt mốc Double Rewards để nhận NHÂN ĐÔI toàn bộ phần thưởng 9 rương mỗi ngày.",
        en: "Unlock 9 Personal Chests daily (3 tiers x 3 chests). You must research the Arms Race Prep tech tree up to Double Rewards to receive 2x rewards from all 9 chests every single day.",
      },
      carryoverRule: {
        vi: "Điểm GAR reset mỗi 24 giờ lúc 00:00 UTC (07:00 Giờ VN); nhưng Huân Chương Vũ Trang, Tinh Hoa Rồng (Dragon Essence) và toàn bộ vật phẩm tích trữ được bảo lưu 100%.",
        en: "GAR daily points reset every 24 hours at 00:00 UTC; however, Arms Race Medals, Dragon Essence, and all hoarded materials carry over 100%.",
      },
      goldenRule: {
        vi: "Đóng băng 100% vật phẩm nâng cấp 7 ngày trước GAR; chỉ xả vào Khung Giờ Vàng trùng nhau lúc 02:00 UTC (09:00 Giờ VN) hoặc 14:00 UTC (21:00 Giờ VN) để ăn 2 lần điểm (GAR + Ca 4 Giờ).",
        en: "Freeze 100% of upgrade materials 7 days before GAR; dump strictly during the 02:00 UTC or 14:00 UTC Golden Overlap Windows to double-dip GAR and 4-Hour Mini-Sprint points.",
      },
    },
    hoardingItems: [
      {
        id: "gar-dragon-essence",
        name: {
          vi: "Tinh Hoa Rồng (Dragon Essence) & Tăng Tốc Xây Dựng / Nghiên Cứu",
          en: "Dragon Essence & Construction / Research Speedups",
        },
        iconPath: "/images/tech/research/icon_30417.webp",
        rarity: "mythic",
        targetAmount: {
          vi: "2.000+ Tinh Hoa Rồng & 60+ Giờ Tăng Tốc (Cho Ngày 1 & Ngày 2)",
          en: "2,000+ Dragon Essence & 60+ Hours of Speedups (For Day 1 & Day 2)",
        },
        freezeWindow: {
          vi: "Đóng băng hoàn toàn từ Ngày 21 S0 (sau khi kết thúc tuần Guild Race)",
          en: "Freeze completely starting S0 Day 21 (right after Guild Race week ends)",
        },
        dumpTiming: {
          vi: "Xả Xây dựng vào Ngày 1 lúc 02:00 UTC (09:00 Giờ VN); xả Khoa kỹ vào Ngày 2 lúc 06:00 UTC (13:00 Giờ VN)",
          en: "Dump Construction on Day 1 at 02:00 UTC; dump Tech Research on Day 2 at 06:00 UTC",
        },
      },
      {
        id: "gar-lord-gear",
        name: {
          vi: "Kim Loại Tinh Luyện, Chỉ Ma Thuật, Orichalcum & Bình Thể Lực",
          en: "Refined Metal, Magic Thread, Orichalcum & Stamina Potions",
        },
        iconPath: "/images/items/materials/icon_material_3.webp",
        rarity: "legendary",
        targetAmount: {
          vi: "Toàn bộ nguyên liệu rèn Trang Bị Lãnh Chúa + 30 Bình Thể Lực (Cho Ngày 3)",
          en: "All Lord Gear forging materials + 30 Stamina Potions (For Day 3)",
        },
        freezeWindow: {
          vi: "Tuyệt đối không bấm nâng Trang Bị Lãnh Chúa ngoài Ngày 3 GAR",
          en: "Strictly avoid upgrading Lord Gear outside GAR Day 3",
        },
        dumpTiming: {
          vi: "Xả toàn bộ nguyên liệu Lord Gear và chạy 50 lượt Boss Rally vào Ngày 3 GAR",
          en: "Dump all Lord Gear materials and run 50 Boss Rallies on GAR Day 3",
        },
      },
      {
        id: "gar-hero-shards",
        name: {
          vi: "Mảnh Storm Maiden / Desert Prince, Mảnh Vạn Năng & Sách Kỹ Năng",
          en: "Storm Maiden / Desert Prince Shards, Universal Shards & Skill Books",
        },
        iconPath: "/images/items/shards/icon_30175.webp",
        rarity: "mythic",
        targetAmount: {
          vi: "150–300 Mảnh Tướng + 200 Sách Kỹ Năng + 200 Vé Chiêu Mộ (Cho Ngày 4)",
          en: "150–300 Hero Shards + 200 Skill Books + 200 Recruit Tokens (For Day 4)",
        },
        freezeWindow: {
          vi: "Lấy xác Storm Maiden ở Ngày 27 nhưng KHOAN NÂNG SAO — nhịn đúng 3 ngày chờ Ngày 4 GAR!",
          en: "Unlock Storm Maiden on Day 27 but HOLD STAR UPGRADES — wait 3 days for GAR Day 4!",
        },
        dumpTiming: {
          vi: "Xả toàn bộ mảnh nâng sao Storm Maiden + Sách Kỹ Năng vào Ngày 4 GAR lúc 02:00 UTC (09:00 Giờ VN)",
          en: "Dump all shards to star-up Storm Maiden + Skill Books on GAR Day 4 at 02:00 UTC",
        },
      },
      {
        id: "gar-pet-food",
        name: {
          vi: "Thức Ăn Thú Cưng, Tinh Hoa Thú Cưng & Lính Chờ Thăng Cấp",
          en: "Pet Food, Pet Essence & Pre-trained Troops",
        },
        iconPath: "/images/items/currencies/icon_10036.webp",
        rarity: "legendary",
        targetAmount: {
          vi: "30.000+ Thức Ăn Thú Cưng + 3 đạo lính chờ Promote (Cho Ngày 5)",
          en: "30,000+ Pet Food + 3 pre-trained troop queues ready to Promote (For Day 5)",
        },
        freezeWindow: {
          vi: "Ngừng nâng cấp Pet từ 5 ngày trước khi GAR khởi tranh",
          en: "Stop leveling Pets 5 days before GAR kicks off",
        },
        dumpTiming: {
          vi: "Thu hoạch lính Pre-cook + Thăng cấp Lính + Đột phá Pet vào Ngày 5 GAR lúc 10:00 UTC (17:00 Giờ VN)",
          en: "Harvest pre-cooked troops + Promote units + Upgrade Pets on GAR Day 5 at 10:00 UTC",
        },
      },
    ],
    dailyStages: [
      {
        dayNumber: 1,
        label: { vi: "Ngày 1 (Thứ Hai)", en: "Day 1 (Monday)" },
        theme: {
          vi: "Xây Dựng Lãnh Thổ & Cổ Vật (Territory Construction & Relics)",
          en: "Territory Construction & Relics",
        },
        goldenWindow: {
          vi: "02:00 UTC (09:00 Giờ VN) & 14:00 UTC (21:00 Giờ VN)",
          en: "02:00 UTC & 14:00 UTC",
        },
        primaryScoring: {
          vi: "Mỗi phút Tăng Tốc Xây Dựng, Điểm lực chiến công trình hoàn tất, Tiêu thụ Tinh Hoa Rồng & Mảnh Cổ Vật",
          en: "Every minute of Construction Speedup, completed building power, Dragon Essence & Relic Shards consumed",
        },
        proTip: {
          vi: "Kỹ thuật Pre-build: Bấm nâng Lâu Đài/Trại Lính từ Chủ Nhật sao cho đồng hồ đếm ngược kết thúc sau 00:00 UTC (07:00 Giờ VN) sáng Thứ Hai, sau đó xả Tăng Tốc lúc 02:00 UTC (09:00 Giờ VN).",
          en: "Pre-build Trick: Start Castle/Barracks upgrades on Sunday so the timer finishes after 00:00 UTC Monday, then dump Construction Speedups at 02:00 UTC.",
        },
        doubleDipTarget: {
          vi: "Khớp 100% với Ca 4 Giờ Xây Dựng (02:00–06:00 UTC) + Ngày 1 Đua Bang",
          en: "100% overlap with 4-Hour Construction Sprint (02:00–06:00 UTC) + Guild Rush Day 1",
        },
      },
      {
        dayNumber: 2,
        label: { vi: "Ngày 2 (Thứ Ba)", en: "Day 2 (Tuesday)" },
        theme: {
          vi: "Nghiên Cứu Khoa Kỹ & Cổ Ngữ (Tech Research & Runes)",
          en: "Tech Research & Runes",
        },
        goldenWindow: {
          vi: "06:00 UTC (13:00 Giờ VN) & 18:00 UTC (01:00 Giờ VN)",
          en: "06:00 UTC & 18:00 UTC",
        },
        primaryScoring: {
          vi: "Mỗi phút Tăng Tốc Nghiên Cứu, Điểm lực chiến Khoa Kỹ, Bụi Cổ Ngữ (Rune Dust) và Mở Rương Cổ Ngữ",
          en: "Every minute of Research Speedup, Tech power gained, Rune Dust spent, and Rune Chests opened",
        },
        proTip: {
          vi: "Nếu chưa mở khóa ô Double Rewards trong nhánh Arms Race Prep, hãy dồn toàn bộ Tăng Tốc Nghiên Cứu vào nhánh này đầu tiên để lấy x2 rương ngay lập tức!",
          en: "If you haven't unlocked Double Rewards in the Arms Race Prep tree yet, rush all Research Speedups into that node first to trigger 2x chests immediately!",
        },
        doubleDipTarget: {
          vi: "Khớp với Ca 4 Giờ Nghiên Cứu (06:00–10:00 UTC) & Sự kiện phụ Cổ Ngữ",
          en: "Overlap with 4-Hour Research Sprint (06:00–10:00 UTC) & Rune Mini-Rush",
        },
      },
      {
        dayNumber: 3,
        label: { vi: "Ngày 3 (Thứ Tư)", en: "Day 3 (Wednesday)" },
        theme: {
          vi: "Diệt Quái, Tập Kích Boss & Trang Bị Lãnh Chúa (Rally & Lord Gear)",
          en: "Monster Hunt, Boss Rally & Lord Gear",
        },
        goldenWindow: {
          vi: "00:00 UTC (07:00 Giờ VN) & 12:00 UTC (19:00 Giờ VN)",
          en: "00:00 UTC & 12:00 UTC",
        },
        primaryScoring: {
          vi: "Tiêu hao Thể Lực đánh quái/Boss Rally, tiêu thụ Kim Loại Tinh Luyện, Chỉ Ma Thuật và Orichalcum nâng Lord Gear",
          en: "Stamina spent hunting monsters/Boss Rallies, plus Refined Metal, Magic Thread, and Orichalcum used on Lord Gear",
        },
        proTip: {
          vi: "Bật Auto-Join Rally từ đêm hôm trước để ăn trọn 50 lượt Rally miễn phí thể lực, sau đó xả toàn bộ Orichalcum nâng Trang Bị Lãnh Chúa.",
          en: "Enable Auto-Join Rally the night before to cap 50 free rally joins, then dump all Orichalcum into Lord Gear upgrades.",
        },
        doubleDipTarget: {
          vi: "Khớp với Tập Kích Cự Ma (Giant Raid) & Quân Đoàn Hắc Ám",
          en: "Overlap with Giant Raid rallies & Dark Legion invasion",
        },
      },
      {
        dayNumber: 4,
        label: { vi: "Ngày 4 (Thứ Năm)", en: "Day 4 (Thursday)" },
        theme: {
          vi: "Phát Triển Anh Hùng & Kỹ Năng (Hero Development — Ngày Vàng Storm Maiden!)",
          en: "Hero Development & Skills (Storm Maiden Golden Dump Day!)",
        },
        goldenWindow: {
          vi: "02:00 UTC (09:00 Giờ VN) & 14:00 UTC (21:00 Giờ VN)",
          en: "02:00 UTC & 14:00 UTC",
        },
        primaryScoring: {
          vi: "Tiêu thụ Mảnh Anh Hùng UR/SSR, Vé Chiêu Mộ, Sách Kỹ Năng và Mảnh Vũ Khí Độc Quyền",
          en: "Consuming UR/SSR Hero Shards, Recruit Tokens, Skill Books, and Exclusive Weapon Shards",
        },
        proTip: {
          vi: "Chiến thuật Ngày 27 ➔ Ngày 4 GAR: Sau khi lấy Storm Maiden ở Ngày 27, giữ toàn bộ Mảnh Vạn Năng và Sách Kỹ Năng đến đúng Ngày 4 GAR mới xả nâng lên 1★ Đỏ (Mốc mở Kỹ năng 5) để nổ hàng triệu điểm!",
          en: "Day 27 ➔ GAR Day 4 Combo: After unlocking Storm Maiden on Day 27, hold all Universal Shards and Skill Books until GAR Day 4 to push her to 1-Red Star (Skill 5 unlock) for massive points!",
        },
        doubleDipTarget: {
          vi: "Khớp với Ca 4 Giờ Tăng Sao Tướng + Tích lũy mốc thưởng Xúc Xắc Storm Maiden",
          en: "Overlap with 4-Hour Hero Star-Up Sprint + Storm Maiden Dice milestone rewards",
        },
      },
      {
        dayNumber: 5,
        label: { vi: "Ngày 5 (Thứ Sáu)", en: "Day 5 (Friday)" },
        theme: {
          vi: "Huấn Luyện Lính & Tiến Hóa Thú Cưng (Troop Training & Pet Promotion)",
          en: "Troop Training & Pet Promotion",
        },
        goldenWindow: {
          vi: "10:00 UTC (17:00 Giờ VN) & 18:00 UTC (01:00 Giờ VN)",
          en: "10:00 UTC & 18:00 UTC",
        },
        primaryScoring: {
          vi: "Huấn luyện/Thăng cấp lính (Promote), Tăng Tốc Luyện Lính, tiêu thụ Thức Ăn Thú Cưng và Tinh Hoa Thú Cưng",
          en: "Training/Promoting troops, Training Speedups, and consuming Pet Food and Pet Essence",
        },
        proTip: {
          vi: "Kỹ thuật Pre-cook Lính: Bấm luyện mẻ lính lớn nhất từ chiều Thứ Tư/Thứ Năm để thu hoạch ngay sau 00:00 UTC (07:00 Giờ VN) Thứ Sáu, sau đó dùng Tăng Tốc Promote lính bậc thấp lên bậc cao nhất.",
          en: "Troop Pre-cooking: Start your largest training batch on Wednesday/Thursday so it finishes right after 00:00 UTC Friday, then use Speedups to Promote lower-tier troops to max tier.",
        },
        doubleDipTarget: {
          vi: "Khớp với Ca 4 Giờ Luyện Lính (10:00–14:00 UTC) & Sự kiện phụ Thú Cưng",
          en: "Overlap with 4-Hour Troop Sprint (10:00–14:00 UTC) & Pet Mini-Rush",
        },
      },
      {
        dayNumber: 6,
        label: { vi: "Ngày 6 (Thứ Bảy)", en: "Day 6 (Saturday)" },
        theme: {
          vi: "Tác Chiến Liên Minh & Nước Rút Tổng Lực (Combat & Final Sprint)",
          en: "Alliance Combat & Final All-Out Sprint",
        },
        goldenWindow: {
          vi: "02:00 UTC (09:00 Giờ VN) & 14:00 UTC (21:00 Giờ VN)",
          en: "02:00 UTC & 14:00 UTC",
        },
        primaryScoring: {
          vi: "Tiêu diệt/Làm bị thương lính đối phương (hoặc Cấp Cứu lính), kết hợp xả mọi loại Tăng Tốc còn tồn đọng",
          en: "Eliminating/wounding enemy troops (or healing troops), combined with dumping any remaining Speedups",
        },
        proTip: {
          vi: "Ngày 6 quyết định lượng điểm Thắng/Bại cuối cùng của Bang: nếu không muốn hao lính vô ích, hãy trao đổi điểm công-thủ tại mỏ tài nguyên hoặc xả Tăng Tốc Chữa Trị trong Bệnh Viện.",
          en: "Day 6 awards the highest Guild Victory points: to avoid permanent troop loss, trade tile hits or use Healing Speedups in the Hospital to hit your 9 chests safely.",
        },
        doubleDipTarget: {
          vi: "Khớp với Chiến Trường Cuối Tuần & Ca 4 Giờ Tăng Tốc Tổng Hợp",
          en: "Overlap with Weekend Battlefield & All-Speedup 4-Hour window",
        },
      },
    ],
    economy: {
      preBuyStrategy: {
        vi: "Chiến thuật Nạp Trước / Mua Trước GAR: Không nạp gói Tăng Tốc đắt tiền; nếu muốn tối ưu điểm Ngày 4 GAR kết hợp Ngày 27 Storm Maiden, hãy mua gói mồi $0.99 / $4.99 ở sự kiện Xúc Xắc Storm Maiden để lấy Mảnh Tướng + Vé Quay, sau đó đem mảnh đó xả vào Ngày 4 GAR (1 đô-la ăn 2 sự kiện!).",
        en: "GAR Pre-Buy Strategy: Skip overpriced Speedup bundles; instead, buy the $0.99 / $4.99 daily bait packs in the Day 27 Storm Maiden Dice event to acquire Hero Shards + Rolls, then dump those exact shards on GAR Day 4 (1 dollar fuels 2 major events!).",
      },
      diamondCeiling: {
        vi: "Trần Kim Cương: Mua hết Tăng Tốc giảm giá trong VIP Shop trước GAR; giữ tối thiểu 15.000 Kim Cương phòng hộ cho Vòng Quay/Xúc Xắc tướng Thần Thoại.",
        en: "Diamond Ceiling: Buy discounted VIP Shop Speedups before GAR; preserve a 15,000 Diamond safety floor for Mythic Hero Wheel/Dice events.",
      },
      budgetTiers: [
        {
          tierId: "f2p",
          label: { vi: "F2P ($0)", en: "F2P ($0)" },
          budgetRange: { vi: "$0 / Tuần GAR", en: "$0 / GAR Week" },
          strategy: {
            vi: "Bắt buộc nâng kịch trần nhánh công nghệ Arms Race Prep (Double Rewards) để mở 9/9 rương cá nhân nhân đôi mỗi ngày hoàn toàn bằng đồ tích trữ.",
            en: "Max out the Arms Race Prep (Double Rewards) tech branch to unlock 9/9 doubled personal chests every day purely from hoarded materials.",
          },
          targetMilestone: {
            vi: "9/9 Rương Cá Nhân x2 (Double Rewards) Toàn Bộ 6 Ngày",
            en: "9/9 Doubled Personal Chests Across All 6 Days",
          },
        },
        {
          tierId: "low_mid",
          label: {
            vi: "Low-Mid Spender ($5 – $25)",
            en: "Low-Mid Spender ($5 – $25)",
          },
          budgetRange: { vi: "$4.99 – $24.99", en: "$4.99 – $24.99" },
          strategy: {
            vi: "Kết hợp Gói Ngày $0.99/$4.99 của Storm Maiden (xả mảnh Ngày 4) + Pass Cự Ma $4.99 (xả nguyên liệu Ngày 3) để lấy Top 10–20 cá nhân mỗi ngày.",
            en: "Combine Storm Maiden $0.99/$4.99 daily packs (dumped on Day 4) + $4.99 Giant Raid Pass (dumped on Day 3) to secure Top 10–20 daily ranks.",
          },
          targetMilestone: {
            vi: "9/9 Rương x2 + Top 10–20 Cá Nhân Ngày 3 & Ngày 4",
            en: "9/9 Doubled Chests + Top 10–20 Daily Rank on Days 3 & 4",
          },
        },
        {
          tierId: "whale",
          label: { vi: "Whale ($100+)", en: "Whale ($100+)" },
          budgetRange: { vi: "$99.99+", en: "$99.99+" },
          strategy: {
            vi: "Dồn hỏa lực vào Ngày 2 (Cổ Ngữ Đỏ), Ngày 3 (Orichalcum Lord Gear) và Ngày 4 (Nâng Storm Maiden lên 3★–5★ Đỏ) để gánh điểm thắng cho cả Bang.",
            en: "Concentrate firepower on Day 2 (Legendary Runes), Day 3 (Lord Gear Orichalcum), and Day 4 (pushing Storm Maiden to 3–5 Red Stars) to carry Guild Victory.",
          },
          targetMilestone: {
            vi: "Top 1–3 Toàn Cụm Server & Chiến Thắng Tuyệt Đối Cho Bang",
            en: "Top 1–3 Cross-Server Rank & Decisive Guild Victory",
          },
        },
      ],
      shopTierList: [
        {
          id: "gar-shop-dragon-essence",
          tier: "S",
          itemName: {
            vi: "Tinh Hoa Rồng (Dragon Essence) & Mảnh Tướng Vạn Năng",
            en: "Dragon Essence & Universal Hero Shards",
          },
          iconPath: "/images/tech/research/icon_30417.webp",
          rarity: "mythic",
          costAndCap: {
            vi: "Ưu tiên số 1 — Mua sạch giới hạn mỗi kỳ GAR",
            en: "Priority #1 — Buy out cap every GAR cycle",
          },
          verdict: {
            vi: "BẮT BUỘC MUA: Nút thắt cổ chai lớn nhất khi nâng Công Nghệ Tinh Hoa Rồng và Lâu Đài bậc Brilliance.",
            en: "MUST BUY: The biggest bottleneck for Dragon Essence Tech and Brilliance Castle levels.",
          },
        },
        {
          id: "gar-shop-orichalcum",
          tier: "A",
          itemName: {
            vi: "Orichalcum & Rương Cổ Ngữ Sử Thi / Huyền Thoại",
            en: "Orichalcum & Epic / Legendary Rune Chests",
          },
          iconPath: "/images/items/materials/icon_material_3.webp",
          rarity: "legendary",
          costAndCap: {
            vi: "Mua bằng lượng Huân Chương dư sau khi đã lấy hết Tier S",
            en: "Purchase with surplus Medals after clearing Tier S items",
          },
          verdict: {
            vi: "ĐẦU TƯ DÀI HẠN: Gia tăng chỉ số vĩnh viễn cho toàn bộ 3 đạo quân.",
            en: "LONG-TERM VALUE: Grants permanent stat scaling across all 3 marches.",
          },
        },
        {
          id: "gar-shop-gold-ingot",
          tier: "F",
          itemName: {
            vi: "Thỏi Vàng / Gỗ / Đá / Thịt Lẻ",
            en: "Loose Gold Ingots / Wood / Stone / Meat",
          },
          iconPath: "/images/items/consumables/icon_30222.webp",
          rarity: "common",
          costAndCap: {
            vi: "Không bao giờ dùng Huân Chương Vũ Trang để đổi tài nguyên thô",
            en: "Never spend Arms Race Medals on raw basic resources",
          },
          verdict: {
            vi: "CẤM ĐỔI: Lãng phí tiền tệ quý giá nhất của sự kiện tuần.",
            en: "FORBIDDEN: Wastes the most valuable weekly event currency.",
          },
        },
      ],
    },
  },

  // ==========================================================================
  // 4. TREASURE DICE / GALA — STORM MAIDEN DAY 27 (S0) — ARTICLE 9.2 (SPOTLIGHT!)
  // ==========================================================================
  {
    id: "treasure-dice-storm-maiden",
    articleCode: "9.2",
    seasons: ["S0", "S1", "S2", "S3", "S4"],
    iconPath: "/images/heroes/avatars/Head_10041.webp",
    rarity: "mythic",
    faction: "horde",
    name: {
      vi: "Xúc Xắc Kho Báu / Gala Thần Thoại (Storm Maiden Ngày 27 & Desert Prince Ngày 21)",
      en: "Treasure Dice / Mythic Gala (Day 27 Storm Maiden & Day 21 Desert Prince)",
    },
    cadenceBadge: {
      vi: "7 Ngày / Sự Kiện Mở Khóa Tướng Thần Thoại Horde",
      en: "7 Days / Core Horde Mythic Hero Unlock Banner",
    },
    s0TimingBadge: {
      vi: "Mùa S0: Ngày 21 (Desert Prince) ➔ Ngày 27 (Storm Maiden)",
      en: "Season S0: Day 21 (Desert Prince) ➔ Day 27 (Storm Maiden)",
    },
    overview: {
      summary: {
        vi: "Sự kiện bàn cờ Xúc Xắc Kho Báu (Treasure Dice / Gala) ra mắt các siêu tướng Thần Thoại phe Horde ở Mùa S0: Desert Prince (Ngày 21) và Storm Maiden (Ngày 27). Đây là thời điểm quyết định sức mạnh trục sát thương Horde trước thềm GAR Ngày 28.",
        en: "The Treasure Dice / Mythic Gala board event debuting core Horde Mythic heroes in Season S0: Desert Prince (Day 21) and Storm Maiden (Day 27). This banner defines your Horde damage core right before GAR starts on Day 28.",
      },
      coreLoop: {
        vi: "Tung xúc xắc di chuyển quanh bàn cờ để nhặt Xu Xúc Xắc (Dice Coins/Tokens) và tích lũy Mốc Lượt Tung (Cumulative Roll Milestones: 30 / 60 / 100 / 150 / 300 lượt).",
        en: "Roll dice to travel around the board, collecting Dice Coins/Tokens and hitting Cumulative Roll Milestones (30 / 60 / 100 / 150 / 300 rolls).",
      },
      carryoverRule: {
        vi: "QUY TẮC SỐNG CÒN: Xu Đổi Thưởng (Dice Coins) và Xúc Xắc Thường ĐƯỢC BẢO LƯU 100% sang kỳ Xúc Xắc tiếp theo; nhưng Mốc Lượt Tung Tích Lũy (Roll Milestones) sẽ RESET VỀ 0 khi kết thúc sự kiện!",
        en: "VITAL RULE: Dice Shop Coins and normal Dice CARRY OVER 100% to the next Dice event; however, Cumulative Roll Milestones RESET TO ZERO when the event ends!",
      },
      goldenRule: {
        vi: "Ở Ngày 27 (Storm Maiden): Chỉ tung xúc xắc khi gom đủ lượt chạm đúng mốc thưởng chẵn (Mốc 30, 60 hoặc 100 lượt để ăn rương mảnh cộng thêm), tuyệt đối không tung lỡ cỡ ở 45 hay 85 lượt!",
        en: "On Day 27 (Storm Maiden): Only roll when you can hit an exact cumulative milestone (30, 60, or 100 rolls for bonus shard chests); never stop mid-way at 45 or 85 rolls!",
      },
    },
    hoardingItems: [
      {
        id: "dice-diamonds",
        name: {
          vi: "Kim Cương Dự Trữ (Diamonds)",
          en: "Reserved Diamonds",
        },
        iconPath: "/images/items/currencies/icon_10002.webp",
        rarity: "mythic",
        targetAmount: {
          vi: "15.000 – 30.000 Kim Cương trước Ngày 27",
          en: "15,000 – 30,000 Diamonds before Day 27",
        },
        freezeWindow: {
          vi: "Cấm tiêu Kim Cương vào quán rượu thường từ Ngày 10 đến Ngày 27",
          en: "Never spend Diamonds on standard tavern pulls from Day 10 to Day 27",
        },
        dumpTiming: {
          vi: "Mua kịch trần Xúc Xắc bằng Kim Cương mỗi ngày để mở khóa Storm Maiden ngay Ngày 27–28",
          en: "Buy out the daily Diamond Dice cap every day to unlock Storm Maiden on Days 27–28",
        },
      },
      {
        id: "dice-tokens",
        name: {
          vi: "Xúc Xắc Kho Báu & Xu Gala Bảo Lưu",
          en: "Hoarded Treasure Dice & Carryover Gala Coins",
        },
        iconPath: "/images/items/chests/icon_chest_Monopoly_DragonTraining.webp",
        rarity: "legendary",
        targetAmount: {
          vi: "60 hoặc 100 Xúc Xắc gom đủ 1 lần xả",
          en: "60 or 100 Dice accumulated for a single milestone push",
        },
        freezeWindow: {
          vi: "Nếu dưới 30 Xúc Xắc ở ngày cuối, giữ toàn bộ sang kỳ sau",
          en: "If holding fewer than 30 Dice on the final day, save all of them for the next banner",
        },
        dumpTiming: {
          vi: "Tung chạm mốc 60 hoặc 100 lượt để lấy xác Storm Maiden + Rương Vũ Khí Độc Quyền",
          en: "Roll to exact 60 or 100 milestones to claim Storm Maiden + Exclusive Weapon Chests",
        },
      },
      {
        id: "dice-uni-shards",
        name: {
          vi: "Mảnh Vạn Năng Vàng (Chờ Ngày 4 GAR)",
          en: "Universal Hero Shards (Held for GAR Day 4)",
        },
        iconPath: "/images/items/shards/icon_30175.webp",
        rarity: "legendary",
        targetAmount: {
          vi: "100 – 250 Mảnh Vạn Năng cho Storm Maiden",
          en: "100 – 250 Universal Shards for Storm Maiden",
        },
        freezeWindow: {
          vi: "Sau khi triệu hồi Storm Maiden ở Ngày 27, KHÓA Mảnh Vạn Năng thêm 72 giờ",
          en: "After summoning Storm Maiden on Day 27, LOCK Universal Shards for 72 more hours",
        },
        dumpTiming: {
          vi: "Xả toàn bộ vào Ngày 4 của GAR (Hero Development) để vừa lên 1★ Đỏ Storm Maiden vừa nổ điểm GAR!",
          en: "Dump everything on GAR Day 4 (Hero Development) to hit 1-Red Star Storm Maiden while dominating GAR points!",
        },
      },
    ],
    dailyStages: [
      {
        dayNumber: 1,
        label: { vi: "Ngày 1 Sự Kiện (S0 Ngày 27)", en: "Event Day 1 (S0 Day 27)" },
        theme: {
          vi: "Khởi Động Bàn Cờ Storm Maiden & Gom Gói Mồi $0.99",
          en: "Storm Maiden Board Launch & $0.99 Daily Pack Stacking",
        },
        goldenWindow: {
          vi: "00:00 UTC (07:00 Giờ VN) — Ngay khi mở Banner Ngày 27",
          en: "00:00 UTC — Immediately upon Day 27 Banner Launch",
        },
        primaryScoring: {
          vi: "Làm nhiệm vụ đăng nhập, diệt quái nhận Xúc Xắc miễn phí, mua Xúc Xắc bằng Kim Cương và gói $0.99 ngày đầu",
          en: "Complete login/monster tasks for free Dice, buy daily Diamond Dice, and grab the Day 1 $0.99 pack",
        },
        proTip: {
          vi: "Mua gói $0.99 mỗi ngày liên tục 5–7 ngày sẽ rẻ hơn 60% so với việc nạp gấp gói $19.99/$49.99 vào ngày cuối cùng!",
          en: "Buying the $0.99 pack daily across 5–7 days is 60% cheaper than panic-buying $19.99/$49.99 bundles on the final day!",
        },
        doubleDipTarget: {
          vi: "Giữ các mảnh Storm Maiden nhận được trong túi để chờ Ngày 4 GAR",
          en: "Keep unlocked Storm Maiden shards in your bag until GAR Day 4",
        },
      },
      {
        dayNumber: 2,
        label: { vi: "Ngày 2–4 Sự Kiện (S0 Ngày 28–30)", en: "Event Days 2–4 (S0 Days 28–30)" },
        theme: {
          vi: "Tích Lũy Xúc Xắc Song Hành Cùng Ngày 1–3 Của GAR",
          en: "Dice Accumulation Parallel to GAR Days 1–3",
        },
        goldenWindow: {
          vi: "02:00 UTC (09:00 Giờ VN) mỗi ngày",
          en: "02:00 UTC daily",
        },
        primaryScoring: {
          vi: "Tiếp tục mua Xúc Xắc bằng Kim Cương + Gói mồi $0.99 / $4.99; hoàn thành nhiệm vụ sự kiện để chạm mốc 60 lượt",
          en: "Continue buying daily Diamond Dice + $0.99 / $4.99 packs; complete daily quests toward the 60-roll threshold",
        },
        proTip: {
          vi: "Có thể triệu hồi (Unlock) xác tướng Storm Maiden ngay khi đủ 10 mảnh để cho vào đội hình, nhưng tuyệt đối KHOAN nâng sao bằng Mảnh Vạn Năng cho tới Ngày 4 GAR!",
          en: "You may unlock the base Storm Maiden copy as soon as you hit 10 shards, but DO NOT feed Universal Shards until GAR Day 4!",
        },
        doubleDipTarget: {
          vi: "Nạp gói $0.99 / $4.99 khớp với nhiệm vụ Nạp Tiền Điểm Cao trên bảng Guild Race / Sự kiện phụ",
          en: "Time $0.99 / $4.99 pack purchases with high-point Pack Tasks in concurrent events",
        },
      },
      {
        dayNumber: 3,
        label: { vi: "Ngày 5–7 Sự Kiện (Trùng Ngày 4 GAR!)", en: "Event Days 5–7 (Hits GAR Day 4!)" },
        theme: {
          vi: "Chốt Mốc 60/100 Lượt Tung & Bùng Nổ Điểm Ngày 4 GAR",
          en: "Lock In 60/100 Roll Milestones & Explode GAR Day 4 Points",
        },
        goldenWindow: {
          vi: "02:00 UTC (09:00 Giờ VN) Ngày Thứ Năm (Ngày 4 GAR)",
          en: "02:00 UTC on Thursday (GAR Day 4)",
        },
        primaryScoring: {
          vi: "Tung dứt điểm Xúc Xắc chạm mốc 60/100 lượt, đổi hết Mảnh Storm Maiden trong Shop Xúc Xắc và xả toàn bộ nâng sao trong Ngày 4 GAR",
          en: "Finish rolling to exact 60/100 milestones, redeem Storm Maiden shards in the Dice Shop, and dump all star upgrades on GAR Day 4",
        },
        proTip: {
          vi: "Sau khi chạm mốc 60 hoặc 100 lượt, ngừng tung ngay lập tức! Mọi viên Xúc Xắc và Xu Đổi còn lẻ sẽ tự động bảo lưu sang đợt Wukong / Beastmaster.",
          en: "Once you hit the exact 60 or 100 roll milestone, stop rolling immediately! Any leftover Dice and Shop Coins carry over to Wukong / Beastmaster.",
        },
        doubleDipTarget: {
          vi: "Ăn trọn 9 Rương x2 Ngày 4 GAR + Mốc Thưởng Tích Lũy Xúc Xắc",
          en: "Claim all 9 Doubled Chests on GAR Day 4 + Cumulative Dice Milestones",
        },
      },
    ],
    economy: {
      preBuyStrategy: {
        vi: "Chiến thuật Mua Trước Ngày 27 Storm Maiden: Ngay từ Ngày 1 của sự kiện (S0 Ngày 27), chỉ mua Gói Mồi Ngày $0.99 (và $4.99 nếu là Low-Spender) mỗi ngày lúc 00:00 UTC (07:00 Giờ VN) thay vì nạp cục bộ ngày cuối. Giữ toàn bộ mảnh tướng thu được sang Ngày 4 của GAR để ăn điểm kép!",
        en: "Day 27 Storm Maiden Pre-Buy Strategy: Starting Event Day 1 (S0 Day 27), buy only the daily $0.99 pack (plus $4.99 for Low-Spenders) at 00:00 UTC each day instead of top-up rushing on the last day. Hold all acquired shards until GAR Day 4 for double-dip scoring!",
      },
      diamondCeiling: {
        vi: "Trần Kim Cương: Chi tối đa Kim Cương mua full lượt Xúc Xắc hàng ngày để đảm bảo mở khóa xác tướng (10 mảnh) và chạm mốc 60 lượt.",
        en: "Diamond Ceiling: Spend Diamonds to max out daily Dice purchases so you guarantee the base hero unlock (10 shards) and hit the 60-roll milestone.",
      },
      budgetTiers: [
        {
          tierId: "f2p",
          label: { vi: "F2P ($0)", en: "F2P ($0)" },
          budgetRange: { vi: "$0 (Dùng Kim Cương tích trữ)", en: "$0 (Spend hoarded Diamonds)" },
          strategy: {
            vi: "Mua full Xúc Xắc bằng Kim Cương mỗi ngày, dừng đúng ở mốc 30 hoặc 60 lượt để lấy xác Desert Prince (Ngày 21) và Storm Maiden (Ngày 27), sau đó nuôi sao bằng Mảnh Vạn Năng vào Ngày 4 GAR.",
            en: "Buy max daily Dice with Diamonds, stop strictly at the 30 or 60 roll milestone to unlock base Desert Prince (Day 21) and Storm Maiden (Day 27), then star them up using Universal Shards on GAR Day 4.",
          },
          targetMilestone: {
            vi: "Mốc 30–60 Lượt Tung & Mở Khóa Xác Storm Maiden (10 Mảnh)",
            en: "30–60 Roll Milestone & Base Storm Maiden Unlock (10 Shards)",
          },
        },
        {
          tierId: "low_mid",
          label: {
            vi: "Low-Mid Spender ($5 – $25)",
            en: "Low-Mid Spender ($5 – $25)",
          },
          budgetRange: {
            vi: "$0.99/ngày (Tổng ~$6.93) hoặc kèm 2 gói $4.99 (~$16.91)",
            en: "$0.99/day (~$6.93 total) or + 2x $4.99 packs (~$16.91)",
          },
          strategy: {
            vi: "Mua đều gói $0.99 mỗi ngày từ Ngày 27 kết hợp Xúc Xắc Kim Cương để chạm chuẩn mốc 100 Lượt Tung, lấy cả Storm Maiden lẫn Rương Vũ Khí Độc Quyền.",
            en: "Buy the $0.99 daily pack every day from Day 27 plus Diamond Dice to hit the exact 100-Roll Milestone, securing both Storm Maiden and Exclusive Weapon Chests.",
          },
          targetMilestone: {
            vi: "Mốc 100 Lượt Tung + Storm Maiden 1★ Đỏ (Nâng ở Ngày 4 GAR)",
            en: "100-Roll Milestone + 1-Red Star Storm Maiden (Upgraded on GAR Day 4)",
          },
        },
        {
          tierId: "whale",
          label: { vi: "Whale ($100+)", en: "Whale ($100+)" },
          budgetRange: { vi: "$99.99 – $299.99", en: "$99.99 – $299.99" },
          strategy: {
            vi: "Đẩy thẳng mốc 150 – 300 Lượt Tung để lấy tối đa Mảnh Storm Maiden, Vũ Khí Độc Quyền +10 và Skin/Trang Trí Giới Hạn.",
            en: "Push the 150–300 Roll Milestones to maximize Storm Maiden Shards, +10 Exclusive Weapon, and Limited Skins/Decorations.",
          },
          targetMilestone: {
            vi: "Mốc 150–300 Lượt Tung & Storm Maiden 3★–5★ Đỏ",
            en: "150–300 Roll Milestone & 3–5 Red Star Storm Maiden",
          },
        },
      ],
      shopTierList: [
        {
          id: "dice-shop-storm-maiden",
          tier: "S",
          itemName: {
            vi: "Mảnh Storm Maiden / Desert Prince & Rương Vũ Khí Độc Quyền",
            en: "Storm Maiden / Desert Prince Shards & Exclusive Weapon Chests",
          },
          iconPath: "/images/heroes/avatars/Head_10041.webp",
          rarity: "mythic",
          costAndCap: {
            vi: "Ưu tiên tuyệt đối — Đổi đủ mở khóa tướng và Vũ Khí Độc Quyền",
            en: "Absolute Priority — Redeem enough to unlock the hero and Exclusive Weapon",
          },
          verdict: {
            vi: "BẮT BUỘC MUA: Mở khóa tướng Thần Thoại là bước nhảy vọt lực chiến lớn nhất Mùa S0.",
            en: "MUST BUY: Unlocking Mythic heroes is the single biggest power spike in Season S0.",
          },
        },
        {
          id: "dice-shop-mythic-decor",
          tier: "A",
          itemName: {
            vi: "Rương Trang Trí Thần Thoại & Đá Linh Hồn Horde",
            en: "Mythic Decoration Chest & Horde Soul Stone",
          },
          iconPath: "/images/items/shards/icon_30232.webp",
          rarity: "mythic",
          costAndCap: {
            vi: "Chỉ đổi khi đã có xác tướng hoặc giữ Xu bảo lưu sang kỳ sau",
            en: "Redeem only after unlocking the hero, or save Coins for the next banner",
          },
          verdict: {
            vi: "GIÁ TRỊ CAO: Cộng chỉ số vĩnh viễn hoặc tiết kiệm 6.000 Vinh Dự Bang.",
            en: "HIGH VALUE: Grants permanent passive stats or saves 6,000 Guild Honor.",
          },
        },
        {
          id: "dice-shop-purple-shard",
          tier: "F",
          itemName: {
            vi: "Mảnh Tướng Tím / Rương Tài Nguyên / Tăng Tốc Lẻ",
            en: "Purple Hero Shards / Resource Chests / Loose Speedups",
          },
          iconPath: "/images/items/consumables/icon_30222.webp",
          rarity: "rare",
          costAndCap: {
            vi: "Cấm đổi — Hãy để Xu Xúc Xắc tự động bảo lưu sang kỳ sau!",
            en: "Never redeem — Let leftover Dice Coins carry over to the next banner!",
          },
          verdict: {
            vi: "SAI LẦM NGHIÊM TRỌNG: Xu Xúc Xắc bảo lưu vĩnh viễn, tuyệt đối không tiêu xài xả láng vào đồ rác cuối sự kiện.",
            en: "CRITICAL MISTAKE: Dice Coins carry over indefinitely; never panic-spend leftovers on trash items.",
          },
        },
      ],
    },
  },

  // ==========================================================================
  // 5. LUCKY WHEEL (FORTUNE WHEEL — 3-WEEK ROTATION) — ARTICLE 9.2
  // ==========================================================================
  {
    id: "lucky-wheel",
    articleCode: "9.2",
    seasons: ["S0", "S1", "S2", "S3", "S4"],
    iconPath: "/images/items/chests/icon_30059.webp",
    rarity: "mythic",
    faction: "league",
    name: {
      vi: "Vòng Quay May Mắn (Lucky Wheel / Chu Kỳ 3 Tuần)",
      en: "Lucky Wheel (Fortune Wheel / 3-Week Rotation)",
    },
    cadenceBadge: {
      vi: "3–5 Ngày / Xoay tua 3 Tuần (Wheel ➔ Dice ➔ Gacha)",
      en: "3–5 Days / 3-Week Rotation (Wheel ➔ Dice ➔ Gacha)",
    },
    s0TimingBadge: {
      vi: "Mùa S0: Khởi chạy từ Tuần 1–2 & Lặp lại theo chu kỳ 3 tuần",
      en: "Season S0: Starts Weeks 1–2 & Repeats on a 3-Week Cycle",
    },
    overview: {
      summary: {
        vi: "Kênh tiêu thụ Kim Cương hiệu quả nhất đối với người chơi F2P/Low-Spender để sở hữu mảnh tướng SSR/UR chủ lực và Rương Vũ Khí Độc Quyền thông qua các mốc Bảo Hiểm (Pity Milestones).",
        en: "The most Diamond-efficient banner for F2P/Low-Spender players to acquire core SSR/UR hero shards and Exclusive Weapon Chests via guaranteed Pity Milestones.",
      },
      coreLoop: {
        vi: "Sử dụng Xu Vòng Quay (mua bằng Kim Cương hoặc gói ngày) để quay thưởng và nhận Rương Bảo Hiểm tại các mốc cố định 10 / 25 / 45 / 70 / 100 / 150 lượt.",
        en: "Spend Wheel Tokens (bought with Diamonds or daily packs) to spin and claim guaranteed Pity Chests at fixed 10 / 25 / 45 / 70 / 100 / 150 spin milestones.",
      },
      carryoverRule: {
        vi: "Xu Vòng Quay trong túi đồ được bảo lưu sang kỳ sau; nhưng thanh tiến độ Mốc Bảo Hiểm (Spin Pity Counter) sẽ RESET VỀ 0 ngay khi đóng sự kiện.",
        en: "Wheel Tokens in your bag carry over to future cycles; however, the Spin Pity Counter RESETS TO ZERO as soon as the event closes.",
      },
      goldenRule: {
        vi: "Nếu Vòng Quay rơi vào tướng thuộc phe bạn không chơi (ví dụ bạn chơi Main Horde nhưng Vòng Quay ra tướng League/Nature phụ), chỉ quay lượt miễn phí và giữ chặt 100% Kim Cương cho Storm Maiden / Desert Prince!",
        en: "If the Wheel features a hero outside your main faction (e.g., you main Horde while the Wheel features a secondary League/Nature hero), use only free spins and save 100% of your Diamonds for Storm Maiden / Desert Prince!",
      },
    },
    hoardingItems: [
      {
        id: "lw-diamonds",
        name: {
          vi: "Quỹ Kim Cương An Toàn (Diamond Safety Floor)",
          en: "Diamond Safety Floor",
        },
        iconPath: "/images/items/currencies/icon_10002.webp",
        rarity: "mythic",
        targetAmount: {
          vi: "Tối thiểu 15.000 – 25.000 Kim Cương",
          en: "Minimum 15,000 – 25,000 Diamonds",
        },
        freezeWindow: {
          vi: "Bỏ qua hoàn toàn các kỳ Vòng Quay của tướng trái phe chủ lực",
          en: "Skip off-faction Wheel banners completely",
        },
        dumpTiming: {
          vi: "Chỉ xả khi Vòng Quay có mặt tướng thuộc đội hình 1 (Main March) của bạn",
          en: "Spend only when the Wheel features a hero in your primary Main March",
        },
      },
      {
        id: "lw-wheel-tokens",
        name: {
          vi: "Xu Vòng Quay May Mắn (Lucky Wheel Tokens)",
          en: "Lucky Wheel Tokens",
        },
        iconPath: "/images/items/chests/icon_30059.webp",
        rarity: "legendary",
        targetAmount: {
          vi: "45, 70 hoặc 100 Xu cho một đợt xả",
          en: "45, 70, or 100 Tokens for a single milestone push",
        },
        freezeWindow: {
          vi: "Mua gói xu giảm giá nhưng giữ trong túi nếu chưa đủ chạm mốc 45/70 lượt",
          en: "Buy discounted tokens but hold them in your bag if you cannot reach the 45/70 spin milestone",
        },
        dumpTiming: {
          vi: "Quay dứt điểm chạm đúng mốc rương bảo hiểm 45, 70 hoặc 100 lượt",
          en: "Spin strictly to exact 45, 70, or 100 guaranteed pity chest milestones",
        },
      },
      {
        id: "lw-skill-books",
        name: {
          vi: "Sách Kỹ Năng (Skill Books)",
          en: "Skill Books",
        },
        iconPath: "/images/items/chests/icon_30032.webp",
        rarity: "epic",
        targetAmount: {
          vi: "150 – 300 Sách Kỹ Năng",
          en: "150 – 300 Skill Books",
        },
        freezeWindow: {
          vi: "Giữ lại sau khi quay trúng tướng mới từ Vòng Quay",
          en: "Hold after pulling a new hero from the Wheel",
        },
        dumpTiming: {
          vi: "Nâng kỹ năng tướng mới vào đúng Ngày 4 của GAR để ăn điểm phát triển anh hùng",
          en: "Upgrade the new hero's skills on GAR Day 4 to score Hero Development points",
        },
      },
    ],
    dailyStages: [
      {
        dayNumber: 1,
        label: { vi: "Ngày 1–2", en: "Days 1–2" },
        theme: {
          vi: "Kiểm Định Tướng Trên Bàn Quay & Gom Xu Giảm Giá",
          en: "Banner Hero Evaluation & Discounted Token Stacking",
        },
        goldenWindow: {
          vi: "00:00 UTC (07:00 Giờ VN) mỗi ngày",
          en: "00:00 UTC daily",
        },
        primaryScoring: {
          vi: "Quay lượt miễn phí hàng ngày và mua Xu Vòng Quay bằng Kim Cương nếu đúng tướng Main Faction",
          en: "Use daily free spins and purchase Diamond Wheel Tokens only if the banner matches your Main Faction",
        },
        proTip: {
          vi: "Luôn tính tổng số lượt có thể đạt được vào ngày cuối trước khi xuống tiền mua lượt đầu tiên.",
          en: "Always calculate your total reachable spins by the final day before spending Diamonds on Day 1.",
        },
        doubleDipTarget: {
          vi: "Khớp với nhiệm vụ Tiêu Kim Cương của Guild Race",
          en: "Overlap with Guild Race Diamond-spend tasks",
        },
      },
      {
        dayNumber: 2,
        label: { vi: "Ngày Cuối", en: "Final Day" },
        theme: {
          vi: "Chốt Mốc Bảo Hiểm Chẵn (10 / 25 / 45 / 70 / 100 Lượt)",
          en: "Lock In Exact Pity Milestones (10 / 25 / 45 / 70 / 100 Spins)",
        },
        goldenWindow: {
          vi: "12:00 UTC (19:00 Giờ VN) – 22:00 UTC (05:00 Giờ VN)",
          en: "12:00 UTC – 22:00 UTC",
        },
        primaryScoring: {
          vi: "Mở rương mốc tích lũy lấy mảnh tướng chắc chắn và Xu Cửa Hàng Vòng Quay",
          en: "Open cumulative milestone chests for guaranteed hero shards and Wheel Shop currency",
        },
        proTip: {
          vi: "Hơn 60% lượng mảnh thực tế nằm ở Rương Bảo Hiểm bên cạnh bàn quay chứ không phải trên các ô xác suất thấp!",
          en: "Over 60% of your total shards come from the guaranteed Pity Chests beside the wheel, not the low-probability wheel slots!",
        },
        doubleDipTarget: {
          vi: "Giữ toàn bộ mảnh tướng nhận được chờ Ngày 4 GAR mới bấm nâng sao",
          en: "Hold all claimed hero shards until GAR Day 4 before upgrading stars",
        },
      },
    ],
    economy: {
      preBuyStrategy: {
        vi: "Chỉ mua gói mồi $0.99 mỗi ngày nếu Vòng Quay có tướng thuộc đội hình chính hoặc có Rương Vũ Khí Độc Quyền tự chọn.",
        en: "Only buy the $0.99 daily pack if the Wheel features a Main March hero or a selectable Exclusive Weapon Chest.",
      },
      diamondCeiling: {
        vi: "Trần Kim Cương: 0 Kim Cương (nếu lệch phe) hoặc vừa đủ chạm mốc 45/70 lượt (nếu đúng phe chủ lực).",
        en: "Diamond Ceiling: 0 Diamonds (if off-faction) or exact amount to hit 45/70 spins (if main faction).",
      },
      budgetTiers: [
        {
          tierId: "f2p",
          label: { vi: "F2P ($0)", en: "F2P ($0)" },
          budgetRange: { vi: "$0", en: "$0" },
          strategy: {
            vi: "Nhịn 1–2 kỳ Vòng Quay lệch phe để dồn Kim Cương quay 70–100 lượt ở kỳ đúng tướng chủ lực.",
            en: "Skip 1–2 off-faction Wheels to bank enough Diamonds for 70–100 spins on your core faction banner.",
          },
          targetMilestone: {
            vi: "Mốc 10 Lượt (Nếu Bỏ Qua) hoặc 45–70 Lượt (Nếu Đúng Phe)",
            en: "10 Spins (If Skipping) or 45–70 Spins (If Main Faction)",
          },
        },
        {
          tierId: "low_mid",
          label: {
            vi: "Low-Mid Spender ($5 – $15)",
            en: "Low-Mid Spender ($5 – $15)",
          },
          budgetRange: { vi: "$0.99/ngày (~$4.95)", en: "$0.99/day (~$4.95)" },
          strategy: {
            vi: "Mua gói $0.99 hàng ngày + Kim Cương để chạm mốc 70 hoặc 100 lượt một cách kinh tế nhất.",
            en: "Combine daily $0.99 packs + Diamonds to hit the 70 or 100 spin milestone at the lowest cost.",
          },
          targetMilestone: {
            vi: "Mốc 70–100 Lượt Bảo Hiểm",
            en: "70–100 Guaranteed Spin Milestone",
          },
        },
        {
          tierId: "whale",
          label: { vi: "Whale ($100+)", en: "Whale ($100+)" },
          budgetRange: { vi: "$49.99 – $99.99", en: "$49.99 – $99.99" },
          strategy: {
            vi: "Hoàn thành mốc 150+ lượt để lấy tối đa Rương Vũ Khí Độc Quyền nâng lên mốc +10/+20.",
            en: "Clear the 150+ spin milestone to maximize Exclusive Weapon Chests toward +10/+20.",
          },
          targetMilestone: {
            vi: "Full Mốc 150+ Lượt & Tối Đa Vũ Khí Độc Quyền",
            en: "Full 150+ Spin Milestones & Max Exclusive Weapon",
          },
        },
      ],
      shopTierList: [
        {
          id: "lw-shop-ew-chest",
          tier: "S",
          itemName: {
            vi: "Rương Vũ Khí Độc Quyền & Mảnh Tướng Chủ Lực",
            en: "Exclusive Weapon Chest & Core Hero Shards",
          },
          iconPath: "/images/equipment/exclusive-weapons/equipment_Exclusive003.webp",
          rarity: "mythic",
          costAndCap: {
            vi: "Ưu tiên số 1 — Mở khóa kỹ năng trấn phái của tướng",
            en: "Priority #1 — Unlocks hero signature weapon skills",
          },
          verdict: {
            vi: "BẮT BUỘC MUA: Nguồn cung cấp Vũ Khí Độc Quyền ổn định nhất cho F2P/Low-Spender.",
            en: "MUST BUY: Most reliable source of Exclusive Weapons for F2P/Low-Spender players.",
          },
        },
        {
          id: "lw-shop-uni-shard",
          tier: "A",
          itemName: {
            vi: "Mảnh Anh Hùng Vạn Năng (Universal Hero Shard)",
            en: "Universal Hero Shard",
          },
          iconPath: "/images/items/shards/icon_30175.webp",
          rarity: "legendary",
          costAndCap: {
            vi: "Đổi bằng điểm thưởng phụ sau khi đã lấy đủ mảnh tướng chính",
            en: "Redeem with secondary tokens after claiming featured hero shards",
          },
          verdict: {
            vi: "KHUYẾN NGHỊ: Dự trữ cho Storm Maiden và Desert Prince.",
            en: "RECOMMENDED: Stockpile for Storm Maiden and Desert Prince.",
          },
        },
        {
          id: "lw-shop-skill-book-blue",
          tier: "F",
          itemName: {
            vi: "Sách Kỹ Năng Lam & Đá Kinh Nghiệm Tướng",
            en: "Blue Skill Books & Hero EXP Potions",
          },
          iconPath: "/images/items/materials/icon_30382.webp",
          rarity: "common",
          costAndCap: {
            vi: "Cấm đổi bằng tiền tệ Vòng Quay",
            en: "Never redeem with Wheel currency",
          },
          verdict: {
            vi: "BẪY TÀI NGUYÊN: Dư thừa hàng triệu điểm ở giai đoạn giữa game.",
            en: "RESOURCE TRAP: You will have millions of surplus EXP by mid-game.",
          },
        },
      ],
    },
  },
];

const PLAYBOOKS_PART_2: readonly EventPlaybookRecord[] = [
  // ==========================================================================
  // 6. HERO GACHA (TAVERN / FACTION GACHA — 3-WEEK ROTATION) — ARTICLE 9.2
  // ==========================================================================
  {
    id: "hero-gacha",
    articleCode: "9.2",
    seasons: ["S0", "S1", "S2", "S3", "S4"],
    iconPath: "/images/heroes/avatars/Head_10039.webp",
    rarity: "legendary",
    faction: "horde",
    name: {
      vi: "Gacha Anh Hùng & Vòng Quay Phe (Hero Gacha / Chu Kỳ 3 Tuần)",
      en: "Hero Gacha & Faction Summon (3-Week Rotation)",
    },
    cadenceBadge: {
      vi: "5–7 Ngày / Xoay tua 3 Tuần (Wheel ➔ Dice ➔ Gacha)",
      en: "5–7 Days / 3-Week Rotation (Wheel ➔ Dice ➔ Gacha)",
    },
    s0TimingBadge: {
      vi: "Mùa S0: Mở xen kẽ giữa Vòng Quay và Xúc Xắc từ Tuần 2–4",
      en: "Season S0: Alternates with Wheel and Dice across Weeks 2–4",
    },
    overview: {
      summary: {
        vi: "Mảnh ghép thứ 3 trong chu kỳ banner 3 tuần, cho phép người chơi xả Vé Chiêu Mộ tích trữ và lựa chọn Phe/Tướng Tâm Nguyện (Wishlist) để nhận rương thưởng mốc quay lớn.",
        en: "The third pillar of the 3-week banner rotation, allowing players to dump hoarded Recruit Tokens and set a Faction/Hero Wishlist to claim high-tier milestone chests.",
      },
      coreLoop: {
        vi: "Cài đặt Tướng Tâm Nguyện (ưu tiên Horde khi chuyển trục) rồi xả Vé Chiêu Mộ Anh Hùng theo cụm 10 lượt để mở khóa mốc tích lũy 50 / 100 / 200 / 300 lượt.",
        en: "Set your Hero Wishlist (prioritizing Horde for your faction pivot) and spend Hero Recruit Tokens in 10-pulls to hit 50 / 100 / 200 / 300 cumulative summon milestones.",
      },
      carryoverRule: {
        vi: "Vé Chiêu Mộ Anh Hùng và Xu Gacha đặc biệt được bảo lưu 100%; nhưng mốc đếm tổng lượt quay trong tuần sự kiện sẽ reset khi kết thúc.",
        en: "Hero Recruit Tokens and special Gacha Tokens carry over 100%; however, the event's cumulative summon milestone bar resets when the banner ends.",
      },
      goldenRule: {
        vi: "Tuyệt đối không dùng Kim Cương để quay Gacha thường với giá nguyên gốc; chỉ xả Vé Chiêu Mộ gom được từ sự kiện và chọn thời điểm trùng với Ngày 3 Top Lord hoặc Ngày 4 GAR!",
        en: "Never spend raw Diamonds on standard Gacha pulls at full price; only dump accumulated Recruit Tokens and align your pulls with Top Lord Day 3 or GAR Day 4!",
      },
    },
    hoardingItems: [
      {
        id: "hg-recruit-tokens",
        name: {
          vi: "Vé Chiêu Mộ Anh Hùng (Hero Recruit Tokens)",
          en: "Hero Recruit Tokens",
        },
        iconPath: "/images/ui/rarities/icon_recruit.webp",
        rarity: "legendary",
        targetAmount: {
          vi: "200 – 400 Vé Chiêu Mộ",
          en: "200 – 400 Hero Recruit Tokens",
        },
        freezeWindow: {
          vi: "Chỉ quay đúng 1 lượt miễn phí mỗi ngày để làm nhiệm vụ ngày",
          en: "Use only the single free daily pull required for daily quests",
        },
        dumpTiming: {
          vi: "Xả vào đúng ngày trùng nhau giữa Hero Gacha và Ngày 4 của GAR (Hero Development)",
          en: "Dump on the exact overlap day between Hero Gacha and GAR Day 4 (Hero Development)",
        },
      },
      {
        id: "hg-horde-soul-stone",
        name: {
          vi: "Đá Linh Hồn Horde (Horde Soul Stone)",
          en: "Horde Soul Stone",
        },
        iconPath: "/images/items/shards/icon_30232.webp",
        rarity: "mythic",
        targetAmount: {
          vi: "2 – 4 Viên Đá Linh Hồn dự trữ",
          en: "2 – 4 Soul Stones in reserve",
        },
        freezeWindow: {
          vi: "Không thức tỉnh các tướng SSR quá độ như Secret Keeper hay Astrologer",
          en: "Never awaken transitional SSR heroes like Secret Keeper or Astrologer",
        },
        dumpTiming: {
          vi: "Dùng để thức tỉnh tướng SSR cốt lõi được phép lên Đỏ theo lộ trình chuyển trục Horde",
          en: "Use exclusively to awaken core SSR heroes approved in the Horde pivot roadmap",
        },
      },
      {
        id: "hg-uni-shards",
        name: {
          vi: "Mảnh Anh Hùng Vạn Năng (Universal Hero Shard)",
          en: "Universal Hero Shard",
        },
        iconPath: "/images/items/shards/icon_30175.webp",
        rarity: "legendary",
        targetAmount: {
          vi: "100+ Mảnh Vạn Năng Vàng",
          en: "100+ Legendary Universal Shards",
        },
        freezeWindow: {
          vi: "Giữ chặt không bù mảnh cho tướng thường trong bể quán rượu",
          en: "Never spend Universal Shards on standard tavern pool heroes",
        },
        dumpTiming: {
          vi: "Dồn 100% cho các tướng Giới Hạn / Thần Thoại như Desert Prince và Storm Maiden vào Ngày 4 GAR",
          en: "Funnel 100% into Limited / Mythic heroes like Desert Prince and Storm Maiden on GAR Day 4",
        },
      },
    ],
    dailyStages: [
      {
        dayNumber: 1,
        label: { vi: "Giai đoạn Chuẩn Bị (Ngày 1–3)", en: "Prep Phase (Days 1–3)" },
        theme: {
          vi: "Khóa Wishlist Phe Horde & Chờ Ngày 4 GAR",
          en: "Lock Horde Faction Wishlist & Wait for GAR Day 4",
        },
        goldenWindow: {
          vi: "00:00 UTC (07:00 Giờ VN)",
          en: "00:00 UTC",
        },
        primaryScoring: {
          vi: "Kiểm tra danh sách Tướng Tâm Nguyện và nhặt vé thưởng đăng nhập",
          en: "Verify your Hero Wishlist selection and claim daily login tokens",
        },
        proTip: {
          vi: "Đừng vội xả hết vé ngay Ngày 1 của Gacha nếu tuần đó đang chạy GAR — hãy đợi đến Thứ Năm (Ngày 4 GAR) để 1 vé chiêu mộ ăn điểm cả 2 sự kiện!",
          en: "Do not dump all your tokens on Day 1 of Gacha if GAR is active that week — wait until Thursday (GAR Day 4) so every token scores in both events!",
        },
        doubleDipTarget: {
          vi: "Chờ khớp lệnh với Ngày 4 GAR (Phát Triển Anh Hùng)",
          en: "Hold for overlap with GAR Day 4 (Hero Development)",
        },
      },
      {
        dayNumber: 2,
        label: { vi: "Ngày Xả Tổng Lực (Thứ Năm / Ngày Cuối)", en: "Dump Day (Thursday / Final Day)" },
        theme: {
          vi: "Xả Vé Theo Bội Số Mốc Chẵn (100 / 200 / 300 Lượt)",
          en: "Dump Tokens in Exact Milestone Increments (100 / 200 / 300 Pulls)",
        },
        goldenWindow: {
          vi: "02:00 UTC (09:00 Giờ VN) & 14:00 UTC (21:00 Giờ VN)",
          en: "02:00 UTC & 14:00 UTC",
        },
        primaryScoring: {
          vi: "Xả Vé Chiêu Mộ trong khung giờ vàng Ca 4 Giờ Chiêu Mộ / Tăng Sao",
          en: "Spend Recruit Tokens during the 4-Hour Recruitment / Hero Star-Up golden window",
        },
        proTip: {
          vi: "Nếu bạn có 240 vé và mốc thưởng ở 200 & 300 lượt: chỉ xả đúng 200 vé, cất 40 vé còn lại cho chu kỳ 3 tuần tiếp theo.",
          en: "If you hold 240 tokens and milestones sit at 200 & 300 pulls: spend exactly 200 tokens and bank the remaining 40 for the next 3-week cycle.",
        },
        doubleDipTarget: {
          vi: "Ăn Ba Lần Điểm: Hero Gacha + Ngày 4 GAR + Ca 4 Giờ Anh Hùng",
          en: "Triple-Dip Scoring: Hero Gacha + GAR Day 4 + 4-Hour Hero Sprint",
        },
      },
    ],
    economy: {
      preBuyStrategy: {
        vi: "Không mua gói Vé Chiêu Mộ Quán Rượu bằng tiền mặt vì tỷ lệ rơi mảnh Thần Thoại rất thấp; hãy dồn ngân sách đó sang gói $0.99 của Xúc Xắc Storm Maiden.",
        en: "Do not spend cash on standard Tavern Recruit Token bundles due to low Mythic value; redirect that budget into $0.99 Storm Maiden Dice packs.",
      },
      diamondCeiling: {
        vi: "Trần Kim Cương: 0 Kim Cương (Chỉ dùng Vé Chiêu Mộ miễn phí tích trữ được).",
        en: "Diamond Ceiling: 0 Diamonds (Use only hoarded free Recruit Tokens).",
      },
      budgetTiers: [
        {
          tierId: "f2p",
          label: { vi: "F2P ($0)", en: "F2P ($0)" },
          budgetRange: { vi: "$0", en: "$0" },
          strategy: {
            vi: "Tích vé xuyên suốt 3 tuần để xả đúng mốc 100 hoặc 200 lượt vào Ngày 4 GAR.",
            en: "Hoard tokens across 3 weeks to hit the exact 100 or 200 pull milestone on GAR Day 4.",
          },
          targetMilestone: {
            vi: "Mốc 100 – 200 Lượt Chiêu Mộ Tích Lũy",
            en: "100 – 200 Cumulative Summon Milestone",
          },
        },
        {
          tierId: "low_mid",
          label: {
            vi: "Low-Mid Spender ($5 – $15)",
            en: "Low-Mid Spender ($5 – $15)",
          },
          budgetRange: { vi: "$0 – $4.99", en: "$0 – $4.99" },
          strategy: {
            vi: "Chỉ mua gói $0.99 nếu thiếu đúng 5–10 lượt cuối cùng để chạm rương mốc 200/300 lượt.",
            en: "Only buy a $0.99 top-up if you are 5–10 pulls short of hitting the 200/300 milestone chest.",
          },
          targetMilestone: {
            vi: "Mốc 200 – 300 Lượt Chiêu Mộ",
            en: "200 – 300 Cumulative Summon Milestone",
          },
        },
        {
          tierId: "whale",
          label: { vi: "Whale ($100+)", en: "Whale ($100+)" },
          budgetRange: { vi: "$49.99+", en: "$49.99+" },
          strategy: {
            vi: "Tập trung vào Vòng Quay Phe / Gacha Vũ Khí Độc Quyền để hoàn thiện các mốc sao phụ trợ trong Sảnh Anh Hùng.",
            en: "Focus on Faction Gacha / Exclusive Weapon Gacha to max out bond and codex star bonuses.",
          },
          targetMilestone: {
            vi: "Full Mốc 300+ Lượt & Tối Đa Chỉ Số Liên Kết Tướng",
            en: "Full 300+ Milestones & Max Hero Bond Stats",
          },
        },
      ],
      shopTierList: [
        {
          id: "hg-shop-uni-shard",
          tier: "S",
          itemName: {
            vi: "Mảnh Tướng Tự Chọn / Mảnh Anh Hùng Vạn Năng",
            en: "Selectable Hero Shards / Universal Hero Shards",
          },
          iconPath: "/images/items/shards/icon_30175.webp",
          rarity: "legendary",
          costAndCap: {
            vi: "Ưu tiên số 1 từ Rương Mốc Gacha",
            en: "Priority #1 from Gacha Milestone Chests",
          },
          verdict: {
            vi: "BẮT BUỘC CHỌN: Luôn chọn mảnh tướng chủ lực thuộc đội hình 1.",
            en: "MUST PICK: Always select shards for your primary Main March core.",
          },
        },
        {
          id: "hg-shop-skill-book",
          tier: "A",
          itemName: {
            vi: "Sách Kỹ Năng Cao Cấp (Epic/Legendary Skill Books)",
            en: "Advanced Skill Books",
          },
          iconPath: "/images/items/chests/icon_30032.webp",
          rarity: "epic",
          costAndCap: {
            vi: "Đổi khi còn dư điểm chiêu mộ phụ",
            en: "Redeem with leftover secondary summon points",
          },
          verdict: {
            vi: "KHUYẾN NGHỊ: Luôn thiếu hụt khi nâng bộ 5 kỹ năng của tướng Thần Thoại.",
            en: "RECOMMENDED: Always in short supply when maxing 5 skills on Mythic heroes.",
          },
        },
        {
          id: "hg-shop-blue-hero",
          tier: "F",
          itemName: {
            vi: "Mảnh Tướng Lam / Tím & Thuốc Kinh Nghiệm",
            en: "Blue / Purple Hero Shards & EXP Potions",
          },
          iconPath: "/images/items/materials/icon_30382.webp",
          rarity: "common",
          costAndCap: {
            vi: "Cấm chọn trong rương tự chọn",
            en: "Never pick inside selectable chests",
          },
          verdict: {
            vi: "BẪY TÀI NGUYÊN: Tự động tràn kho khi quay quán rượu hàng tuần.",
            en: "RESOURCE TRAP: Automatically overflows from normal tavern pulls.",
          },
        },
      ],
    },
  },

  // ==========================================================================
  // 7. BUTTERFLY CATCHING / SEASONAL EXCHANGE SHOP — ARTICLE 9.3
  // ==========================================================================
  {
    id: "butterfly-catching",
    articleCode: "9.3",
    seasons: ["S0", "S1", "S2", "S3", "S4"],
    iconPath: "/images/items/chests/icon_chest_Monopoly_DragonTraining.webp",
    rarity: "legendary",
    faction: "nature",
    name: {
      vi: "Lễ Hội Bắt Bướm & Cửa Hàng Thu Thập Mùa Lễ (Butterfly Catching)",
      en: "Butterfly Catching & Seasonal Drop Exchange Event",
    },
    cadenceBadge: {
      vi: "5–7 Ngày / Sự Kiện Vệ Tinh Rơi Vật Phẩm Toàn Bản Đồ",
      en: "5–7 Days / World Map Drop & Exchange Satellite Event",
    },
    s0TimingBadge: {
      vi: "Mùa S0: Xuất hiện định kỳ ở Tuần 2–4 (Ngày 10–28+)",
      en: "Season S0: Appears periodically across Weeks 2–4 (Days 10–28+)",
    },
    overview: {
      summary: {
        vi: "Sự kiện vệ tinh phúc lợi cao bậc nhất cho phép người chơi thu thập Vợt Bắt Bướm / Vật phẩm lễ hội thông qua tiêu hao Thể Lực đánh quái, thu hoạch tài nguyên và làm nhiệm vụ ngày để đổi Mảnh Vạn Năng và Trang Trí Thần Thoại.",
        en: "A high-value welfare satellite event where players collect Butterfly Nets / seasonal drops by spending Stamina on monsters, gathering resources, and completing daily quests to trade for Universal Shards and Mythic Decorations.",
      },
      coreLoop: {
        vi: "Tiêu hao Thể Lực diệt quái bản đồ & Boss Rally để nhận Vợt/Huy Hiệu rơi thêm (có giới hạn trần rơi mỗi ngày), sau đó bắt bướm tích điểm mở Cửa Hàng Đổi Thưởng.",
        en: "Spend Stamina hunting world map monsters & Boss Rallies to earn bonus Nets/Badges (up to a daily drop cap), then catch butterflies to redeem items in the Exchange Shop.",
      },
      carryoverRule: {
        vi: "LƯU Ý QUAN TRỌNG: Vợt Bắt Bướm và Xu Sự Kiện Lễ Hội thường BỊ THU HỒI (đổi thành Vàng/Thịt rẻ mạt) khi đóng cửa hàng — bắt buộc phải tiêu sạch trước 23:59 UTC ngày cuối!",
        en: "CRITICAL NOTE: Butterfly Nets and Seasonal Exchange Tokens are typically RECLAIMED (converted into trivial Gold/Meat) when the shop closes — you must spend them all before 23:59 UTC on the final day!",
      },
      goldenRule: {
        vi: "Cày kịch trần giới hạn rơi vật phẩm miễn phí trên bản đồ mỗi ngày ngay từ Ngày 1 (vì trần rơi hàng ngày không cộng dồn sang ngày hôm sau), và dồn 100% xu đổi lấy Trang Trí Thần Thoại + Mảnh Vạn Năng!",
        en: "Cap the daily free world-map drop limit every single day starting Day 1 (as daily drop caps do not roll over), and funnel 100% of tokens into Mythic Decorations + Universal Shards!",
      },
    },
    hoardingItems: [
      {
        id: "bc-stamina-potions",
        name: {
          vi: "Bình Thể Lực Dự Trữ (Stamina Potions)",
          en: "Reserved Stamina Potions",
        },
        iconPath: "/images/items/consumables/icon_30037.webp",
        rarity: "epic",
        targetAmount: {
          vi: "25 – 50 Bình Thể Lực",
          en: "25 – 50 Stamina Potions",
        },
        freezeWindow: {
          vi: "Luôn giữ tối thiểu 25 bình trong túi đề phòng Lễ Hội Bắt Bướm mở bất ngờ",
          en: "Always keep at least 25 potions in reserve for surprise Butterfly Catching events",
        },
        dumpTiming: {
          vi: "Chia đều uống mỗi ngày vừa đủ chạm trần rơi Vợt Bắt Bướm hàng ngày trên bản đồ",
          en: "Pace consumption daily just enough to hit the daily map drop cap for Butterfly Nets",
        },
      },
      {
        id: "bc-decor-tokens",
        name: {
          vi: "Xu Trang Trí & Rương Tự Chọn (Decor Tokens)",
          en: "Decoration Tokens & Selectable Chests",
        },
        iconPath: "/images/items/currencies/icon_10030.webp",
        rarity: "legendary",
        targetAmount: {
          vi: "Ưu tiên ghép đủ Bộ Trang Trí Thần Thoại (Set Bonus)",
          en: "Prioritize completing Mythic Decoration Set Bonuses",
        },
        freezeWindow: {
          vi: "Không mở rương trang trí tự chọn cho tới khi biết món nào còn thiếu trong Bộ",
          en: "Hold selectable decoration chests until you can complete a full Set Bonus",
        },
        dumpTiming: {
          vi: "Đổi và kích hoạt trong Ngày 1 GAR (nếu tính điểm công trình/trang trí) hoặc ngay khi đủ bộ",
          en: "Redeem and activate on GAR Day 1 or immediately upon completing a set",
        },
      },
      {
        id: "bc-diamonds",
        name: {
          vi: "Kim Cương Mua Lượt Bổ Sung Cuối Kỳ",
          en: "Diamonds for Final-Day Threshold Top-Up",
        },
        iconPath: "/images/items/currencies/icon_10002.webp",
        rarity: "legendary",
        targetAmount: {
          vi: "1.000 – 2.500 Kim Cương",
          en: "1,000 – 2,500 Diamonds",
        },
        freezeWindow: {
          vi: "Không mua Vợt bằng Kim Cương ở Ngày 1 khi chưa biết tổng lượng rơi miễn phí",
          en: "Do not buy Nets with Diamonds on Day 1 before seeing your total free drops",
        },
        dumpTiming: {
          vi: "Chỉ mua thêm vào ngày cuối nếu thiếu vài chục xu để đổi Rương Trang Trí Thần Thoại",
          en: "Buy only on the final day if you are slightly short of redeeming the Mythic Decoration Chest",
        },
      },
    ],
    dailyStages: [
      {
        dayNumber: 1,
        label: { vi: "Ngày 1–4 (Cày Trần Rơi Hàng Ngày)", en: "Days 1–4 (Daily Drop Cap Farming)" },
        theme: {
          vi: "Đánh Quái Bản Đồ & Bật Auto-Rally Lấy Tối Đa Vợt Miễn Phí",
          en: "World Map Monster Farming & Auto-Rally for Max Free Nets",
        },
        goldenWindow: {
          vi: "00:00 UTC (07:00 Giờ VN) & 12:00 UTC (19:00 Giờ VN)",
          en: "00:00 UTC & 12:00 UTC",
        },
        primaryScoring: {
          vi: "Tiêu hao Thể Lực tự nhiên + Bình Thể Lực để lấy đủ 100% giới hạn Vợt rơi từ quái mỗi ngày",
          en: "Spend natural Stamina + Stamina Potions to hit 100% of the daily monster drop cap",
        },
        proTip: {
          vi: "Khi thấy thông báo 'Đã đạt giới hạn rơi hôm nay', hãy dừng uống Bình Thể Lực ngay để dành cho ngày tiếp theo!",
          en: "As soon as the system notifies that you hit the daily drop limit, stop using Stamina Potions and save them for the next day!",
        },
        doubleDipTarget: {
          vi: "Khớp với Ngày 3 GAR (Diệt Quái) hoặc Tập Kích Cự Ma",
          en: "Overlap with GAR Day 3 (Monster Hunt) or Giant Raid",
        },
      },
      {
        dayNumber: 2,
        label: { vi: "Ngày Cuối (Xả Sạch Xu Trước 23:59 UTC)", en: "Final Day (Clear Shop Before 23:59 UTC)" },
        theme: {
          vi: "Bắt Bướm Chốt Mốc & Đổi Sạch Cửa Hàng Trước Khi Thu Hồi",
          en: "Final Butterfly Catching & Full Shop Redemption Before Expiry",
        },
        goldenWindow: {
          vi: "14:00 UTC (21:00 Giờ VN) – 23:00 UTC (06:00 Giờ VN)",
          en: "14:00 UTC – 23:00 UTC",
        },
        primaryScoring: {
          vi: "Sử dụng toàn bộ Vợt còn lại và đổi sạch xu trong Cửa Hàng Sự Kiện",
          en: "Use all remaining Nets and spend every single token in the Event Exchange Shop",
        },
        proTip: {
          vi: "Đặt báo thức trước 22:00 UTC (05:00 Giờ VN) ngày cuối để đổi sạch xu — đừng để hàng trăm xu biến thành vài nghìn Vàng!",
          en: "Set a reminder before 22:00 UTC on the final day to spend all tokens — never let hundreds of tokens expire into trivial Gold!",
        },
        doubleDipTarget: {
          vi: "Đổi Mảnh Vạn Năng và Tinh Hoa Rồng cất vào kho phục vụ GAR",
          en: "Redeem Universal Shards and Dragon Essence to bank for GAR",
        },
      },
    ],
    economy: {
      preBuyStrategy: {
        vi: "Nếu có gói Battle Pass Lễ Hội $4.99 đi kèm (mở khóa hàng thưởng thứ 2 khi bắt bướm), hãy mua ngay khi bạn đã cày đạt cấp độ tối đa của bảng thưởng để nhận lượng Mảnh Vạn Năng + Trang Trí gấp 5 lần giá trị.",
        en: "If a $4.99 Seasonal Event Pass is attached (unlocking the second reward row), buy it once you hit the max pass tier for 5x value in Universal Shards and Decorations.",
      },
      diamondCeiling: {
        vi: "Trần Kim Cương: 0 – 2.000 Kim Cương (chỉ mua bù phần thiếu hụt nhỏ ở ngày cuối).",
        en: "Diamond Ceiling: 0 – 2,000 Diamonds (only to bridge a small gap on the final day).",
      },
      budgetTiers: [
        {
          tierId: "f2p",
          label: { vi: "F2P ($0)", en: "F2P ($0)" },
          budgetRange: { vi: "$0", en: "$0" },
          strategy: {
            vi: "Cày đủ trần rơi miễn phí toàn bộ các ngày để đổi trọn bộ Mảnh Vạn Năng Vàng hoặc 1 Rương Trang Trí lớn.",
            en: "Hit the free daily drop cap every day to redeem all Legendary Universal Shards or 1 major Decoration Chest.",
          },
          targetMilestone: {
            vi: "100% Mảnh Vạn Năng Vàng Trong Shop Đổi",
            en: "100% Legendary Universal Shards in Exchange Shop",
          },
        },
        {
          tierId: "low_mid",
          label: {
            vi: "Low-Mid Spender ($5 – $15)",
            en: "Low-Mid Spender ($5 – $15)",
          },
          budgetRange: { vi: "$4.99 (Event Pass)", en: "$4.99 (Event Pass)" },
          strategy: {
            vi: "Mua Event Pass $4.99 để lấy trọn cả Rương Trang Trí Thần Thoại lẫn toàn bộ Mảnh Tướng Vạn Năng.",
            en: "Purchase the $4.99 Event Pass to secure both the Mythic Decoration Chest and all Universal Hero Shards.",
          },
          targetMilestone: {
            vi: "Rương Trang Trí Thần Thoại + Full Mảnh Vạn Năng",
            en: "Mythic Decoration Chest + Full Universal Shards",
          },
        },
        {
          tierId: "whale",
          label: { vi: "Whale ($100+)", en: "Whale ($100+)" },
          budgetRange: { vi: "$29.99 – $99.99", en: "$29.99 – $99.99" },
          strategy: {
            vi: "Mua sạch Trang Trí Thần Thoại, Tinh Hoa Rồng, Orichalcum và Đá Linh Hồn Đỏ trong cửa hàng sự kiện.",
            en: "Clear out Mythic Decorations, Dragon Essence, Orichalcum, and Red Soul Stones from the event shop.",
          },
          targetMilestone: {
            vi: "Quét Sạch Toàn Bộ Vật Phẩm Giới Hạn Tier S & Tier A",
            en: "Full Clear of All Tier S & Tier A Limited Stock",
          },
        },
      ],
      shopTierList: [
        {
          id: "bc-shop-decor-shard",
          tier: "S",
          itemName: {
            vi: "Rương Trang Trí Thần Thoại & Mảnh Tướng Vạn Năng",
            en: "Mythic Decoration Chest & Universal Hero Shards",
          },
          iconPath: "/images/items/currencies/icon_10030.webp",
          rarity: "mythic",
          costAndCap: {
            vi: "Ưu tiên số 1 — Mua trước mọi vật phẩm khác",
            en: "Priority #1 — Redeem before anything else",
          },
          verdict: {
            vi: "BẮT BUỘC ĐỔI: Trang trí sự kiện cung cấp % ATK/HP toàn quân vĩnh viễn không thể kiếm ở nơi khác.",
            en: "MUST REDEEM: Event decorations grant permanent march-wide ATK/HP% unavailable elsewhere.",
          },
        },
        {
          id: "bc-shop-dragon-orichalcum",
          tier: "A",
          itemName: {
            vi: "Tinh Hoa Rồng (Dragon Essence) & Orichalcum",
            en: "Dragon Essence & Orichalcum",
          },
          iconPath: "/images/tech/research/icon_30417.webp",
          rarity: "legendary",
          costAndCap: {
            vi: "Đổi bằng xu còn dư sau khi đã lấy Tier S",
            en: "Redeem with leftover tokens after securing Tier S",
          },
          verdict: {
            vi: "GIÁ TRỊ CAO: Tích lũy trực tiếp cho Ngày 1 và Ngày 3 của GAR.",
            en: "HIGH VALUE: Directly fuels GAR Day 1 and Day 3.",
          },
        },
        {
          id: "bc-shop-resources",
          tier: "F",
          itemName: {
            vi: "Rương Gỗ / Đá / Thịt & Đá Thăng Cấp (Chỉ đổi xu lẻ cuối giờ)",
            en: "Wood / Stone / Meat Chests & Promo Stones (Leftover coins only)",
          },
          iconPath: "/images/items/materials/icon_30382.webp",
          rarity: "common",
          costAndCap: {
            vi: "Chỉ dùng để tiêu nốt 1–5 xu lẻ cuối cùng trước khi đóng shop",
            en: "Use only to burn the last 1–5 odd tokens right before shop closure",
          },
          verdict: {
            vi: "CHỈ ĐỔI XU LẺ: Tuyệt đối không ưu tiên đổi trước khi lấy hết Tier S/A.",
            en: "ODD CHANGE ONLY: Never prioritize before clearing Tier S/A.",
          },
        },
      ],
    },
  },

  // ==========================================================================
  // 8. GIANT TROLL RAID / BOSS HUNT PASS ($4.99) — ARTICLE 9.3
  // ==========================================================================
  {
    id: "giant-troll-raid",
    articleCode: "9.3",
    seasons: ["S0", "S1", "S2", "S3", "S4"],
    iconPath: "/images/equipment/exclusive-weapons/equipment_Exclusive003.webp",
    rarity: "legendary",
    faction: "neutral",
    name: {
      vi: "Tập Kích Cự Ma / Thợ Săn Boss (Giant Troll Raid & Pass $4.99)",
      en: "Giant Troll Raid / Boss Hunter Pass ($4.99 Value Pass)",
    },
    cadenceBadge: {
      vi: "5–7 Ngày / Sự Kiện Rally Bang Hội & Battle Pass",
      en: "5–7 Days / Guild Rally & Battle Pass Satellite",
    },
    s0TimingBadge: {
      vi: "Mùa S0: Lặp lại định kỳ từ Tuần 2–4+",
      en: "Season S0: Repeats periodically from Weeks 2–4+",
    },
    overview: {
      summary: {
        vi: "Sự kiện săn Boss Rally toàn bang hội (Tập Kích Cự Ma / Boss Thế Giới tuần) cung cấp lượng lớn nguyên liệu rèn Trang Bị Lãnh Chúa, Mảnh Vũ Khí Độc Quyền và gói Battle Pass $4.99 có tỷ suất lợi nhuận (ROI) cao nhất cho Low-Spender.",
        en: "A guild-wide Boss Rally event (Giant Troll Raid / Weekly Boss Hunt) yielding massive Lord Gear forging materials, Exclusive Weapon Shards, and the highest-ROI $4.99 Battle Pass for Low-Spenders.",
      },
      coreLoop: {
        vi: "Tạo hoặc tham gia Rally tiêu diệt Boss Cự Ma cùng đồng minh (50 lượt Auto-Join miễn phí thể lực mỗi ngày) để tăng cấp Thẻ Thợ Săn từ Cấp 1 đến Cấp 30.",
        en: "Start or join guild Rallies against Giant Troll Bosses (utilizing 50 free stamina Auto-Joins daily) to level up the Hunter Pass from Tier 1 to Tier 30.",
      },
      carryoverRule: {
        vi: "Điểm tiến độ Thẻ Thợ Săn reset khi kết thúc sự kiện; nhưng toàn bộ Rương Nguyên Liệu và Mảnh Vũ Khí nhận được giữ nguyên trong túi đồ.",
        en: "Hunter Pass progress resets when the event concludes; however, all claimed Material Chests and Weapon Shards remain permanently in your inventory.",
      },
      goldenRule: {
        vi: "Luôn bật Auto-Join Rally (Tự Động Tham Gia Tập Kích) trước khi đi ngủ hoặc đi làm để ăn đủ 50 lượt thưởng Boss miễn phí mỗi ngày mà không tốn 1 giọt Thể Lực cá nhân!",
        en: "Always enable Auto-Join Rally before sleeping or working to cap all 50 free daily Boss Rally rewards without spending a single point of personal Stamina!",
      },
    },
    hoardingItems: [
      {
        id: "gtr-stamina",
        name: {
          vi: "Bình Thể Lực (Dành Cho Người Dẫn Đầu Rally)",
          en: "Stamina Potions (For Rally Leaders)",
        },
        iconPath: "/images/items/consumables/icon_30037.webp",
        rarity: "epic",
        targetAmount: {
          vi: "15 – 30 Bình Thể Lực",
          en: "15 – 30 Stamina Potions",
        },
        freezeWindow: {
          vi: "Tiết kiệm thể lực trước ngày Tập Kích Cự Ma trùng với Ngày 3 GAR",
          en: "Save stamina ahead of Giant Raid days that overlap with GAR Day 3",
        },
        dumpTiming: {
          vi: "Mở Rally liên tục vào Ngày 3 GAR để cả bang cùng ăn điểm Diệt Quái + Điểm Cự Ma",
          en: "Launch continuous Rallies on GAR Day 3 so the whole guild double-dips Monster Hunt + Giant Raid points",
        },
      },
      {
        id: "gtr-lord-gear-mats",
        name: {
          vi: "Orichalcum & Nguyên Liệu Lord Gear Nhận Từ Pass",
          en: "Orichalcum & Lord Gear Materials Claimed from Pass",
        },
        iconPath: "/images/items/materials/icon_material_3.webp",
        rarity: "legendary",
        targetAmount: {
          vi: "Toàn bộ rương nguyên liệu từ 30 cấp Pass",
          en: "All material chests across the 30 Pass tiers",
        },
        freezeWindow: {
          vi: "Nhận rương từ Pass Cự Ma nhưng ĐỪNG BẤM RÈN ngay lập tức",
          en: "Claim chests from the Giant Raid Pass but DO NOT FORGE immediately",
        },
        dumpTiming: {
          vi: "Đợi đúng Ngày 3 của GAR (hoặc Ngày 5 Top Lord) mới xả nâng cấp Trang Bị Lãnh Chúa",
          en: "Wait until GAR Day 3 (or Top Lord Day 5) before upgrading your Lord Gear",
        },
      },
      {
        id: "gtr-ew-shards",
        name: {
          vi: "Mảnh Vũ Khí Độc Quyền Vạn Năng",
          en: "Universal Exclusive Weapon Shards",
        },
        iconPath: "/images/equipment/exclusive-weapons/equipment_Exclusive003.webp",
        rarity: "mythic",
        targetAmount: {
          vi: "10 – 50 Mảnh Vũ Khí Độc Quyền",
          en: "10 – 50 Exclusive Weapon Shards",
        },
        freezeWindow: {
          vi: "Giữ chặt không lắp cho tướng SSR phụ",
          en: "Never invest into secondary SSR heroes",
        },
        dumpTiming: {
          vi: "Xả nâng cấp Vũ Khí Độc Quyền cho Desert Prince / Storm Maiden vào Ngày 4 GAR",
          en: "Spend to upgrade Desert Prince / Storm Maiden Exclusive Weapons on GAR Day 4",
        },
      },
    ],
    dailyStages: [
      {
        dayNumber: 1,
        label: { vi: "Ngày 1–4 (Cày Full Cấp Pass)", en: "Days 1–4 (Maxing Pass Tiers)" },
        theme: {
          vi: "Kích Hoạt Auto-Join 50 Lượt & Săn Boss Cấp Cao",
          en: "Activate 50x Auto-Join & Hunt High-Tier Bosses",
        },
        goldenWindow: {
          vi: "00:00 UTC (07:00 Giờ VN) & 12:00 UTC (19:00 Giờ VN)",
          en: "00:00 UTC & 12:00 UTC",
        },
        primaryScoring: {
          vi: "Mỗi lượt diệt Boss Cự Ma thành công cộng điểm kinh nghiệm mở khóa 30 tầng thưởng",
          en: "Every successful Giant Troll Rally grants Pass EXP toward unlocking all 30 reward tiers",
        },
        proTip: {
          vi: "Cài đặt đội hình phụ (Đạo 2/Đạo 3) vào chế độ Auto-Join để Đạo 1 (Main March) luôn rảnh tay làm nhiệm vụ chính!",
          en: "Assign your secondary marches (March 2/3) to Auto-Join so your Main March stays free for active combat and quests!",
        },
        doubleDipTarget: {
          vi: "Khớp với nhiệm vụ Diệt Boss trên bảng 9 ô của Guild Race",
          en: "Overlap with Boss Rally tasks on the 9-slot Guild Race board",
        },
      },
      {
        dayNumber: 2,
        label: { vi: "Ngày Cuối (Mở Khóa Pass & Cất Kho Chờ GAR)", en: "Final Day (Unlock Pass & Bank for GAR)" },
        theme: {
          vi: "Thu Hoạch Toàn Bộ 30 Tầng Thưởng & Bảo Toàn Nguyên Liệu Cho GAR",
          en: "Claim All 30 Tiers & Preserve Materials for GAR",
        },
        goldenWindow: {
          vi: "14:00 UTC (21:00 Giờ VN) ngày cuối",
          en: "14:00 UTC on the final day",
        },
        primaryScoring: {
          vi: "Nhận toàn bộ rương Orichalcum, Mảnh Tướng và Vũ Khí Độc Quyền ở tầng 30",
          en: "Claim all Orichalcum, Hero Shards, and Exclusive Weapon Chests at Tier 30",
        },
        proTip: {
          vi: "Chỉ bấm thanh toán gói Pass $4.99 SAU KHI bạn đã cày đạt Cấp 25–30 để đảm bảo nhận 100% phần thưởng ngay lập tức!",
          en: "Only purchase the $4.99 Pass AFTER you have reached Tier 25–30 to guarantee 100% instant reward collection!",
        },
        doubleDipTarget: {
          vi: "Giữ nguyên liệu Lord Gear cho Ngày 3 GAR và Mảnh Tướng cho Ngày 4 GAR",
          en: "Bank Lord Gear mats for GAR Day 3 and Hero Shards for GAR Day 4",
        },
      },
    ],
    economy: {
      preBuyStrategy: {
        vi: "Pass Cự Ma $4.99 là một trong 3 gói nạp đáng tiền nhất toàn bộ trò chơi cho Low-Spender (cùng với Hàng Đợi Xây Dựng Thứ 2 và Gói $0.99 Xúc Xắc Thần Thoại). Tuy nhiên chỉ mua sau khi đã cày tối đa (full) cấp Pass!",
        en: "The $4.99 Giant Raid Pass is one of the top 3 highest-value purchases in the entire game for Low-Spenders (alongside the 2nd Builder Queue and $0.99 Mythic Dice packs). Always max the pass tiers first before buying!",
      },
      diamondCeiling: {
        vi: "Trần Kim Cương: 0 Kim Cương (Không bao giờ dùng Kim Cương mua cấp độ Pass vì cày Auto-Join miễn phí là dư sức đạt Cấp 30).",
        en: "Diamond Ceiling: 0 Diamonds (Never buy Pass tiers with Diamonds, as free Auto-Join rallies easily max out Tier 30).",
      },
      budgetTiers: [
        {
          tierId: "f2p",
          label: { vi: "F2P ($0)", en: "F2P ($0)" },
          budgetRange: { vi: "$0", en: "$0" },
          strategy: {
            vi: "Bật Auto-Join 24/7 để lấy trọn 30 tầng thưởng miễn phí (hàng trên), gom Kim Loại Tinh Luyện và Chỉ Ma Thuật cho Ngày 3 GAR.",
            en: "Keep Auto-Join active 24/7 to clear all 30 free pass tiers, banking Refined Metal and Magic Thread for GAR Day 3.",
          },
          targetMilestone: {
            vi: "Cấp 30/30 Nhánh Thưởng Miễn Phí",
            en: "Tier 30/30 Free Pass Track",
          },
        },
        {
          tierId: "low_mid",
          label: {
            vi: "Low-Mid Spender ($5 – $15)",
            en: "Low-Mid Spender ($5 – $15)",
          },
          budgetRange: { vi: "$4.99 (Giant Raid Pass)", en: "$4.99 (Giant Raid Pass)" },
          strategy: {
            vi: "Mở khóa nhánh thưởng cao cấp $4.99 khi đạt Cấp 30 để thu hoạch lượng lớn Orichalcum và Mảnh Vạn Năng/Vũ Khí.",
            en: "Unlock the $4.99 premium track at Tier 30 for a massive injection of Orichalcum and Universal/Weapon Shards.",
          },
          targetMilestone: {
            vi: "Full 30 Cấp Cả 2 Nhánh + Đột Phá Lord Gear Ở Ngày 3 GAR",
            en: "Full 30 Tiers Both Tracks + Lord Gear Spike on GAR Day 3",
          },
        },
        {
          tierId: "whale",
          label: { vi: "Whale ($100+)", en: "Whale ($100+)" },
          budgetRange: { vi: "$4.99 – $19.99", en: "$4.99 – $19.99" },
          strategy: {
            vi: "Mua trọn gói Pass và dẫn đầu các đợt Rally Boss cấp cao nhất để nhận thêm rương cống hiến người tạo phòng.",
            en: "Buy the full Pass and host max-level Boss Rallies to farm bonus Rally Leader chests.",
          },
          targetMilestone: {
            vi: "Full Pass + Tối Đa Rương Trưởng Phòng Rally",
            en: "Full Pass + Max Rally Host Bonus Chests",
          },
        },
      ],
      shopTierList: [
        {
          id: "gtr-shop-orichalcum",
          tier: "S",
          itemName: {
            vi: "Orichalcum & Rương Vũ Khí Độc Quyền (Từ Pass $4.99)",
            en: "Orichalcum & Exclusive Weapon Chests (From $4.99 Pass)",
          },
          iconPath: "/images/items/materials/icon_material_3.webp",
          rarity: "mythic",
          costAndCap: {
            vi: "Nhận ở các mốc Cấp 10, 20 và 30 của Thẻ Thợ Săn",
            en: "Claimed at Tiers 10, 20, and 30 of the Hunter Pass",
          },
          verdict: {
            vi: "SIÊU LỢI NHUẬN: Giá trị thực tế cao gấp 8 lần so với mua gói lẻ trong cửa hàng.",
            en: "ULTRA ROI: Delivers 8x more material value than standard direct shop bundles.",
          },
        },
        {
          id: "gtr-shop-metal-thread",
          tier: "A",
          itemName: {
            vi: "Kim Loại Tinh Luyện & Chỉ Ma Thuật (Refined Metal & Magic Thread)",
            en: "Refined Metal & Magic Thread",
          },
          iconPath: "/images/items/materials/icon_material_1.webp",
          rarity: "epic",
          costAndCap: {
            vi: "Rơi miễn phí từ 50 lượt Auto-Join Rally mỗi ngày",
            en: "Free daily drops from 50x Auto-Join Rallies",
          },
          verdict: {
            vi: "TÍCH TIỂU THÀNH ĐẠI: Nguồn nguyên liệu ổn định nhất để nâng đều 6 món Lord Gear.",
            en: "STEADY CORE: Most consistent daily income to level all 6 Lord Gear pieces evenly.",
          },
        },
        {
          id: "gtr-shop-buy-tiers",
          tier: "F",
          itemName: {
            vi: "Mua Cấp Độ Pass Bằng Kim Cương (Buy Pass Tiers)",
            en: "Buying Pass Levels with Diamonds",
          },
          iconPath: "/images/items/currencies/icon_10002.webp",
          rarity: "common",
          costAndCap: {
            vi: "Tốn hàng nghìn Kim Cương một cách vô nghĩa",
            en: "Wastes thousands of Diamonds unnecessarily",
          },
          verdict: {
            vi: "CẤM BẤM: Chỉ cần bật Auto-Join là tự động đạt Cấp 30 vào ngày thứ 4.",
            en: "NEVER CLICK: Simply enabling Auto-Join reaches Tier 30 naturally by Day 4.",
          },
        },
      ],
    },
  },

  // ==========================================================================
  // 9. DARK EMPIRE & DARK LEGION INVASION — ARTICLE 9.3
  // ==========================================================================
  {
    id: "dark-empire-and-legion",
    articleCode: "9.3",
    seasons: ["S0", "S1", "S2", "S3", "S4"],
    iconPath: "/images/events/entry-icons/Activity_103.webp",
    rarity: "epic",
    faction: "horde",
    name: {
      vi: "Đế Quốc Hắc Ám & Quân Đoàn Hắc Ám (Dark Empire & Dark Legion)",
      en: "Dark Empire Invasion & Dark Legion Siege",
    },
    cadenceBadge: {
      vi: "2–3 Ngày / Sự Kiện Phòng Thủ & Phản Công Liên Minh",
      en: "2–3 Days / Alliance Defense & Counter-Siege Event",
    },
    s0TimingBadge: {
      vi: "Mùa S0: Mở định kỳ hàng tuần từ Tuần 2–4+",
      en: "Season S0: Runs weekly starting Weeks 2–4+",
    },
    overview: {
      summary: {
        vi: "Chuỗi sự kiện PvE/PvP phối hợp bang hội nơi các đợt sóng Quân Đoàn Hắc Ám tấn công Lâu Đài thành viên và Pháo Đài Bang Hội, trao thưởng lượng lớn Mảnh Cổ Vật, Đá Cường Hóa và Điểm Cống Hiến Bang.",
        en: "A cooperative guild PvE/PvP siege event where waves of Dark Legion forces attack member Castles and Guild Fortresses, awarding Relic Shards, Enhancement Stones, and Guild Contribution points.",
      },
      coreLoop: {
        vi: "Giữ đạo quân chủ lực (Main March) trấn thủ trong Lâu Đài hoặc cử đạo quân phụ tiếp viện (Reinforce) cho các thành viên yếu hơn trong bang để ăn điểm phòng thủ cộng thêm.",
        en: "Keep your Main March garrisoned inside your Castle or send secondary marches to Reinforce weaker guildmates to farm bonus defense points.",
      },
      carryoverRule: {
        vi: "Điểm phòng thủ cá nhân và bang hội được tổng kết phát thưởng qua Thư ngay sau khi kết thúc đợt công thành; các rương thưởng giữ nguyên trong túi.",
        en: "Personal and guild defense scores are tallied and paid out via Mail right after the siege ends; reward chests stay in your inventory.",
      },
      goldenRule: {
        vi: "Tuyệt đối không cử đạo quân đi đào mỏ xa hoặc đánh quái lẻ trong 30 phút diễn ra đợt sóng công thành của Quân Đoàn Hắc Ám — hãy rút toàn bộ quân về thành và gửi 2 đạo quân đi Tiếp Viện (Reinforce) cho đồng minh!",
        en: "Never send marches out for distant resource gathering during the 30-minute Dark Legion siege wave — recall all troops and send 2 marches to Reinforce guildmates for double defense points!",
      },
    },
    hoardingItems: [
      {
        id: "del-speedup-heal",
        name: {
          vi: "Tăng Tốc Chữa Trị (Healing Speedups)",
          en: "Healing Speedups",
        },
        iconPath: "/images/ui/rarities/icon_speedUp.webp",
        rarity: "rare",
        targetAmount: {
          vi: "10 – 20 Giờ Tăng Tốc Chữa Trị",
          en: "10 – 20 Hours of Healing Speedups",
        },
        freezeWindow: {
          vi: "Giữ lại không dùng cho các vết thương nhỏ hàng ngày",
          en: "Save instead of burning on minor daily skirmishes",
        },
        dumpTiming: {
          vi: "Chữa trị nhanh giữa các đợt sóng công thành cấp cao hoặc để dành xả vào Ngày 6 GAR",
          en: "Quick-heal between high-tier siege waves or save to dump on GAR Day 6",
        },
      },
      {
        id: "del-relic-shards",
        name: {
          vi: "Mảnh Cổ Vật & Nguyên Liệu Nhận Từ Sự Kiện",
          en: "Relic Shards & Siege Reward Materials",
        },
        iconPath: "/images/items/materials/icon_material_2.webp",
        rarity: "legendary",
        targetAmount: {
          vi: "Toàn bộ rương thưởng hạng Cá Nhân & Bang Hội",
          en: "All Personal & Guild Rank reward chests",
        },
        freezeWindow: {
          vi: "Nhận thư thưởng nhưng chưa nâng cấp Cổ Vật ngay",
          en: "Claim mail rewards but hold off upgrading Relics immediately",
        },
        dumpTiming: {
          vi: "Xả nâng cấp Cổ Vật vào Ngày 1 GAR (hoặc Ngày 5 Top Lord) để lấy điểm tối đa",
          en: "Dump Relic upgrades on GAR Day 1 (or Top Lord Day 5) for maximum scoring",
        },
      },
      {
        id: "del-stamina",
        name: {
          vi: "Thể Lực Phản Công Đồn Trú Đế Quốc Hắc Ám",
          en: "Stamina for Dark Empire Stronghold Counter-Attacks",
        },
        iconPath: "/images/items/consumables/icon_30037.webp",
        rarity: "epic",
        targetAmount: {
          vi: "150 – 200 Điểm Thể Lực",
          en: "150 – 200 Stamina Points",
        },
        freezeWindow: {
          vi: "Ngừng đánh quái thường 4 tiếng trước giờ mở sự kiện Đế Quốc Hắc Ám",
          en: "Stop hitting normal monsters 4 hours before Dark Empire opens",
        },
        dumpTiming: {
          vi: "Tập kích các cứ điểm Đế Quốc Hắc Ám ngay khi mở bản đồ sự kiện",
          en: "Rally Dark Empire strongholds immediately when the event map opens",
        },
      },
    ],
    dailyStages: [
      {
        dayNumber: 1,
        label: { vi: "Giai Đoạn Phòng Thủ (Sóng Quân Đoàn)", en: "Defense Phase (Legion Waves)" },
        theme: {
          vi: "Rút Quân Trấn Thủ Lâu Đài & Tiếp Viện Đồng Minh (Reinforce)",
          en: "Garrison Main Castle & Reinforce Guildmates",
        },
        goldenWindow: {
          vi: "12:00 UTC (19:00 Giờ VN) hoặc 14:00 UTC (21:00 Giờ VN) theo lịch R4/R5",
          en: "12:00 UTC or 14:00 UTC as scheduled by R4/R5 officers",
        },
        primaryScoring: {
          vi: "Điểm tiêu diệt quân xâm lược tại thành của bạn + Điểm hỗ trợ tiêu diệt tại thành đồng minh",
          en: "Points for defeating invaders at your Castle + Bonus assist points from reinforced guildmates",
        },
        proTip: {
          vi: "Mẹo X2 Điểm Cá Nhân: Gửi Đạo 1 (mạnh nhất) của bạn sang đồn trú tại Lâu Đài của một thành viên đang online nhưng yếu hơn bạn — bạn sẽ ăn trọn điểm hạ gục đợt quái tấn công thành người đó!",
          en: "2x Personal Score Trick: Send your strongest March 1 to garrison an online lower-power guildmate's Castle — you will capture massive kill points from the waves hitting their walls!",
        },
        doubleDipTarget: {
          vi: "Hoàn thành đồng thời nhiệm vụ Hỗ Trợ Bang Hội trong Guild Race",
          en: "Simultaneously clear Guild Assist tasks in Guild Race",
        },
      },
      {
        dayNumber: 2,
        label: { vi: "Giai Đoạn Phản Công (Đế Quốc Hắc Ám)", en: "Counter-Attack Phase (Dark Empire)" },
        theme: {
          vi: "Tập Kích Pháo Đài Hắc Ám & Chiếm Cứ Điểm Trọng Yếu",
          en: "Rally Dark Fortresses & Capture Key Strongholds",
        },
        goldenWindow: {
          vi: "14:00 UTC (21:00 Giờ VN)",
          en: "14:00 UTC",
        },
        primaryScoring: {
          vi: "Điểm sát thương lên Pháo Đài Đế Quốc Hắc Ám và số lượng cứ điểm bang hội kiểm soát",
          en: "Damage dealt to Dark Empire Fortresses and total strongholds captured by the guild",
        },
        proTip: {
          vi: "Đi theo đúng ghim tọa độ (Pin) của R4/R5 để dứt điểm từng cứ điểm một thay vì đánh phân tán.",
          en: "Follow R4/R5 map pins strictly to focus-fire strongholds one by one rather than splitting marches.",
        },
        doubleDipTarget: {
          vi: "Cất toàn bộ rương thưởng nhận được qua thư chờ xả trong tuần GAR",
          en: "Bank all mail reward chests to open/spend during GAR week",
        },
      },
    ],
    economy: {
      preBuyStrategy: {
        vi: "Đây là sự kiện thuần phối hợp chiến thuật bang hội 100% miễn phí — tuyệt đối không cần nạp bất kỳ gói tiền mặt nào.",
        en: "This is a 100% free tactical guild coordination event — no cash purchases are ever required.",
      },
      diamondCeiling: {
        vi: "Trần Kim Cương: 0 Kim Cương (Chỉ dùng Dịch Chuyển Bang Hội mua bằng Xu Bang trong Guild Shop).",
        en: "Diamond Ceiling: 0 Diamonds (Only use Guild Teleports bought with Guild Coins in the Guild Shop).",
      },
      budgetTiers: [
        {
          tierId: "f2p",
          label: { vi: "F2P ($0)", en: "F2P ($0)" },
          budgetRange: { vi: "$0", en: "$0" },
          strategy: {
            vi: "Online đúng giờ R4 bật sự kiện và gửi quân tiếp viện thông minh để luôn lọt Top 10–20 điểm phòng thủ của Bang.",
            en: "Log in at the R4 scheduled start time and reinforce guildmates smartly to consistently place Top 10–20 in guild defense.",
          },
          targetMilestone: {
            vi: "100% Mốc Cá Nhân & Top 20 BXH Phòng Thủ Bang",
            en: "100% Personal Milestones & Top 20 Guild Defense Rank",
          },
        },
        {
          tierId: "low_mid",
          label: {
            vi: "Low-Mid Spender ($5 – $15)",
            en: "Low-Mid Spender ($5 – $15)",
          },
          budgetRange: { vi: "$0", en: "$0" },
          strategy: {
            vi: "Gửi cả 3 đạo quân đi tiếp viện cho 3 thành viên ở rìa ổ bang (Hive) để tối đa hóa lượt giao tranh.",
            en: "Send all 3 marches to reinforce 3 members on the outer edge of the guild hive to maximize combat ticks.",
          },
          targetMilestone: {
            vi: "Top 5 – Top 10 BXH Cá Nhân Trong Bang",
            en: "Top 5 – Top 10 Intra-Guild Rank",
          },
        },
        {
          tierId: "whale",
          label: { vi: "Whale ($100+)", en: "Whale ($100+)" },
          budgetRange: { vi: "$0", en: "$0" },
          strategy: {
            vi: "Gánh sát thương chính tại Pháo Đài Bang Hội và tiếp viện cho các thành viên sắp vỡ tường thành ở các đợt sóng cuối (Wave 15–20).",
            en: "Anchor the Guild Fortress garrison and reinforce members on the verge of breaching during final waves (Waves 15–20).",
          },
          targetMilestone: {
            vi: "Top 1–3 Toàn Server & Bảo Vệ Thành Công 20/20 Đợt Sóng",
            en: "Server Top 1–3 & Full 20/20 Wave Clear",
          },
        },
      ],
      shopTierList: [
        {
          id: "del-shop-uni-shard",
          tier: "S",
          itemName: {
            vi: "Mảnh Anh Hùng Vạn Năng & Mảnh Cổ Vật Hiếm",
            en: "Universal Hero Shards & Rare Relic Shards",
          },
          iconPath: "/images/items/shards/icon_30175.webp",
          rarity: "legendary",
          costAndCap: {
            vi: "Phần thưởng cốt lõi từ Rương Xếp Hạng Phòng Thủ",
            en: "Core rewards from Defense Ranking Chests",
          },
          verdict: {
            vi: "BẮT BUỘC THAM GIA: Nguồn thu mảnh miễn phí đều đặn hàng tuần.",
            en: "MUST PARTICIPATE: Consistent weekly source of free shards.",
          },
        },
        {
          id: "del-shop-guild-coins",
          tier: "A",
          itemName: {
            vi: "Xu Bang Hội (Mua Khiên Hòa Bình & Dịch Chuyển)",
            en: "Guild Coins (For Peace Shields & Teleports)",
          },
          iconPath: "/images/items/currencies/icon_10006.webp",
          rarity: "epic",
          costAndCap: {
            vi: "Luôn trữ sẵn 2 Dịch Chuyển + 2 Khiên 8h trong túi",
            en: "Always keep 2 Teleports + 2 8h Shields in bag",
          },
          verdict: {
            vi: "CHUẨN BỊ CHIẾN TRƯỜNG: Phục vụ Ngày 6 GAR và KvK.",
            en: "COMBAT PREP: Essential for GAR Day 6 and KvK.",
          },
        },
        {
          id: "del-shop-diamond-tp",
          tier: "F",
          itemName: {
            vi: "Mua Dịch Chuyển Trực Tiếp Bằng 2.000 Kim Cương",
            en: "Buying Direct Teleports for 2,000 Diamonds",
          },
          iconPath: "/images/items/currencies/icon_10002.webp",
          rarity: "common",
          costAndCap: {
            vi: "2.000 Kim Cương/lượt — Đắt gấp 10 lần giá trị thực",
            en: "2,000 Diamonds/use — 10x overpriced",
          },
          verdict: {
            vi: "CẤM MUA: Luôn mua trước Dịch Chuyển bằng Xu Bang Hội trong Guild Shop!",
            en: "NEVER BUY: Always pre-purchase Teleports using Guild Coins in the Guild Shop!",
          },
        },
      ],
    },
  },

  // ==========================================================================
  // 10. 2-DAY GUILD RUSH & 8 ROTATING MINI-RUSHES — ARTICLE 9.3
  // ==========================================================================
  {
    id: "mini-rushes-and-guild-rush",
    articleCode: "9.3",
    seasons: ["S0", "S1", "S2", "S3", "S4"],
    iconPath: "/images/events/entry-icons/Activity_104.webp",
    rarity: "epic",
    faction: "neutral",
    name: {
      vi: "Đua Bang 2 Ngày & 8 Sự Kiện Đua Điểm Ngắn Hạn (Guild Rush & 8 Mini-Rushes)",
      en: "2-Day Guild Rush & 8 Rotating 2–3 Day Mini-Rushes",
    },
    cadenceBadge: {
      vi: "2–3 Ngày / Xoay Tua Liên Tục Song Hành Cùng GAR & Ca 4 Giờ",
      en: "2–3 Days / Continuous Rotation Parallel to GAR & 4h Sprints",
    },
    s0TimingBadge: {
      vi: "Mùa S0: Chạy xuyên suốt từ Ngày 1 đến Ngày 65+",
      en: "Season S0: Runs continuously from Day 1 through Day 65+",
    },
    overview: {
      summary: {
        vi: "Hệ thống gồm Đua Bang 2 Ngày (Guild Rush) và 8 sự kiện đua điểm ngắn hạn 2–3 ngày (Trang Bị Lãnh Chúa, Cổ Vật, Cổ Ngữ, Thú Cưng, Luyện Lính, Xây Dựng, Khoa Kỹ, Chiêu Mộ). Đây vừa là mỏ Kim Cương miễn phí nếu biết gộp điểm (Triple-Dip), vừa là 'Bẫy Xả Sớm' nguy hiểm nhất trước thềm GAR!",
        en: "A continuous system of 2-Day Guild Rushes and 8 rotating 2–3 day Mini-Rushes (Lord Gear, Relics, Runes, Pets, Troop Training, Construction, Tech, Recruitment). These serve as either a free Diamond goldmine when Triple-Dipped with GAR, or a dangerous 'Premature Dump Trap' the week before GAR!",
      },
      coreLoop: {
        vi: "Mỗi 2–3 ngày hệ thống mở 1 chủ đề nâng cấp; nếu rơi vào tuần GAR thì khớp lệnh xả để ăn 3 tầng thưởng (GAR + Mini-Rush + Ca 4 Giờ), nếu rơi vào tuần nghỉ trước GAR thì chỉ ăn mốc rương 1 hoặc bỏ qua hoàn toàn.",
        en: "Every 2–3 days a specific upgrade theme opens; if it falls during GAR week, align your dump to claim 3 layers of rewards (GAR + Mini-Rush + 4h Sprint); if it falls in the off-week before GAR, take only Chest 1 or skip completely.",
      },
      carryoverRule: {
        vi: "Điểm đua 2–3 ngày reset ngay khi hết giờ; toàn bộ nguyên liệu nâng cấp (Orichalcum, Bụi Cổ Ngữ, Thức Ăn Pet, Mảnh Cổ Vật) được bảo lưu 100% trong kho.",
        en: "Mini-Rush points reset immediately when the timer expires; all upgrade materials (Orichalcum, Rune Dust, Pet Food, Relic Shards) are 100% retained in your bag.",
      },
      goldenRule: {
        vi: "LUẬT CHỐNG BẪY (ANTI-BAIT LAW): Nhà phát hành luôn cố tình mở Mini-Rush Cổ Ngữ, Thú Cưng hoặc Trang Bị Lãnh Chúa vào đúng 3–4 ngày TRƯỚC tuần GAR để dụ bạn xả sạch kho — hãy kiên quyết nhịn 100% chờ GAR!",
        en: "ANTI-BAIT LAW: The game intentionally schedules Rune, Pet, or Lord Gear Mini-Rushes 3–4 days BEFORE GAR week to bait you into emptying your inventory — strictly hold 100% of your materials for GAR!",
      },
    },
    hoardingItems: [
      {
        id: "mr-rune-dust",
        name: {
          vi: "Bụi Cổ Ngữ & Rương Cổ Ngữ (Rune Dust & Rune Chests)",
          en: "Rune Dust & Rune Chests",
        },
        iconPath: "/images/items/currencies/icon_10029.webp",
        rarity: "epic",
        targetAmount: {
          vi: "50.000+ Bụi Cổ Ngữ & 30+ Rương Cổ Ngữ",
          en: "50,000+ Rune Dust & 30+ Rune Chests",
        },
        freezeWindow: {
          vi: "Bỏ qua sự kiện phụ Cổ Ngữ nếu nó diễn ra vào tuần lễ Guild Race (tuần trước GAR)",
          en: "Skip the Rune Mini-Rush whenever it runs during Guild Race week (the week before GAR)",
        },
        dumpTiming: {
          vi: "Xả vào Ngày 2 của GAR (Tech & Runes) khi trùng với Mini-Rush Cổ Ngữ và Ca 4 Giờ",
          en: "Dump on GAR Day 2 (Tech & Runes) when overlapping with the Rune Mini-Rush and 4h Sprint",
        },
      },
      {
        id: "mr-lord-gear",
        name: {
          vi: "Orichalcum & Nguyên Liệu Trang Bị Lãnh Chúa",
          en: "Orichalcum & Lord Gear Materials",
        },
        iconPath: "/images/items/materials/icon_material_3.webp",
        rarity: "legendary",
        targetAmount: {
          vi: "Đủ nâng 2–3 bậc Trang Bị Lãnh Chúa",
          en: "Enough to upgrade 2–3 Lord Gear tiers",
        },
        freezeWindow: {
          vi: "Nhịn hoàn toàn trong các đợt Mini-Rush lẻ tẻ giữa tuần không có GAR",
          en: "Hold completely during standalone mid-week Mini-Rushes outside GAR",
        },
        dumpTiming: {
          vi: "Chỉ xả vào Ngày 3 của GAR (Boss Rally & Lord Gear)",
          en: "Dump exclusively on GAR Day 3 (Boss Rally & Lord Gear)",
        },
      },
      {
        id: "mr-pet-essence",
        name: {
          vi: "Thức Ăn Thú Cưng & Tinh Hoa Thú Cưng",
          en: "Pet Food & Pet Essence",
        },
        iconPath: "/images/items/currencies/icon_10036.webp",
        rarity: "legendary",
        targetAmount: {
          vi: "30.000+ Thức Ăn Pet & 500+ Tinh Hoa Pet",
          en: "30,000+ Pet Food & 500+ Pet Essence",
        },
        freezeWindow: {
          vi: "Không nâng cấp Pet lẻ tẻ hàng ngày",
          en: "Never level up Pets randomly day-to-day",
        },
        dumpTiming: {
          vi: "Xả dứt điểm vào Ngày 5 của GAR (Troop Training & Pet Promotion)",
          en: "Dump decisively on GAR Day 5 (Troop Training & Pet Promotion)",
        },
      },
    ],
    dailyStages: [
      {
        dayNumber: 1,
        label: { vi: "Kịch Bản A: Tuần Lễ GAR (Xả Gộp 3 Tầng)", en: "Scenario A: GAR Week (Triple-Dip Dump)" },
        theme: {
          vi: "Khớp Lệnh GAR + Mini-Rush 2 Ngày + Ca 4 Giờ (Triple-Dip)",
          en: "Synchronize GAR + 2-Day Mini-Rush + 4-Hour Sprint (Triple-Dip)",
        },
        goldenWindow: {
          vi: "02:00 UTC (09:00 Giờ VN), 06:00 UTC (13:00 Giờ VN) & 10:00 UTC (17:00 Giờ VN)",
          en: "02:00 UTC, 06:00 UTC & 10:00 UTC",
        },
        primaryScoring: {
          vi: "1 hành động tiêu thụ tài nguyên được cộng điểm đồng thời vào 3 bảng sự kiện khác nhau",
          en: "A single resource expenditure scores simultaneously across 3 separate event boards",
        },
        proTip: {
          vi: "Trước khi bấm nút nâng cấp, luôn mở màn hình Sự Kiện kiểm tra xem cả 3 bảng (GAR, Mini-Rush, Ca 4 Giờ) đã cùng bật chủ đề đó hay chưa!",
          en: "Before clicking upgrade, always check the Event Hub to verify that all 3 boards (GAR, Mini-Rush, and 4h Sprint) match that exact theme!",
        },
        doubleDipTarget: {
          vi: "Nhận 3 lần Kim Cương + Tăng Tốc hoàn trả trên cùng 1 lượng nguyên liệu",
          en: "Claim 3x Diamond + Speedup rebates from the exact same material stack",
        },
      },
      {
        dayNumber: 2,
        label: { vi: "Kịch Bản B: Tuần Trước GAR (Chế Độ Đóng Băng)", en: "Scenario B: Pre-GAR Week (Freeze Mode)" },
        theme: {
          vi: "Nhận Diện Bẫy Xả Sớm & Giữ Kỷ Luật Tích Trữ Tuyệt Đối",
          en: "Identify Bait Rushes & Maintain Strict Hoarding Discipline",
        },
        goldenWindow: {
          vi: "00:00 UTC (07:00 Giờ VN) — Kiểm tra lịch và khóa túi đồ",
          en: "00:00 UTC — Check calendar and lock inventory",
        },
        primaryScoring: {
          vi: "Chỉ lấy Rương Mốc 1 bằng các thao tác miễn phí hàng ngày, bảo toàn 100% nguyên liệu quý",
          en: "Claim only Chest 1 via free daily actions while preserving 100% of rare materials",
        },
        proTip: {
          vi: "Phần thưởng của 9 Rương x2 trong GAR cao gấp 4 lần phần thưởng của 1 kỳ Mini-Rush lẻ — đừng bao giờ vì cái lợi nhỏ trước mắt mà mất rương GAR tuần sau!",
          en: "The rewards from 9 Doubled GAR Chests are 4x higher than a standalone Mini-Rush — never sacrifice next week's GAR chests for a minor bait event!",
        },
        doubleDipTarget: {
          vi: "Dồn 100% kho đạn dược sang Ngày 1–6 của GAR tuần kế tiếp",
          en: "Carry 100% of your ammunition into Days 1–6 of the upcoming GAR week",
        },
      },
    ],
    economy: {
      preBuyStrategy: {
        vi: "Tuyệt đối không mua các gói pop-up đắt đỏ xuất hiện khi mở giao diện Mini-Rush 2 ngày; mọi nguyên liệu cần thiết đều lấy từ Pass Cự Ma $4.99 và các sự kiện chính.",
        en: "Never buy overpriced pop-up bundles triggered inside 2-day Mini-Rush menus; source all required materials from the $4.99 Giant Raid Pass and major events.",
      },
      diamondCeiling: {
        vi: "Trần Kim Cương: 0 Kim Cương (Sự kiện này là nơi bạn NHẬN Kim Cương hoàn trả từ rương mốc, không phải nơi tiêu Kim Cương).",
        en: "Diamond Ceiling: 0 Diamonds (Mini-Rushes exist to PAY YOU Diamond rebates from milestone chests, not to drain your Diamonds).",
      },
      budgetTiers: [
        {
          tierId: "f2p",
          label: { vi: "F2P ($0)", en: "F2P ($0)" },
          budgetRange: { vi: "$0", en: "$0" },
          strategy: {
            vi: "Bỏ qua Mini-Rush tuần lẻ, dồn xả vào tuần GAR để vừa ăn 9 Rương x2 GAR vừa tự động lấy trọn 3 rương Mini-Rush.",
            en: "Skip off-week Mini-Rushes and dump during GAR week to claim both 9 Doubled GAR Chests and all 3 Mini-Rush chests automatically.",
          },
          targetMilestone: {
            vi: "3/3 Rương Cá Nhân (Trong Tuần GAR) & 0 Tiêu Hao (Tuần Nghỉ)",
            en: "3/3 Personal Chests (During GAR Week) & Zero Spend (Off-Week)",
          },
        },
        {
          tierId: "low_mid",
          label: {
            vi: "Low-Mid Spender ($5 – $15)",
            en: "Low-Mid Spender ($5 – $15)",
          },
          budgetRange: { vi: "$0", en: "$0" },
          strategy: {
            vi: "Nhờ lượng nguyên liệu dồn 2 tuần + Pass Cự Ma, khi xả vào tuần GAR sẽ dễ dàng lọt Top 10–20 của cả Mini-Rush mà không tốn thêm 1 xu.",
            en: "By combining 2 weeks of hoarded mats + Giant Raid Pass, dumping during GAR week naturally lands Top 10–20 on the Mini-Rush leaderboard at zero extra cost.",
          },
          targetMilestone: {
            vi: "Full Rương Cá Nhân + Top 10–20 BXH Mini-Rush Tuần GAR",
            en: "Full Personal Chests + Top 10–20 Mini-Rush Rank in GAR Week",
          },
        },
        {
          tierId: "whale",
          label: { vi: "Whale ($100+)", en: "Whale ($100+)" },
          budgetRange: { vi: "Gộp chung ngân sách GAR", en: "Bundled into GAR budget" },
          strategy: {
            vi: "Ăn trọn Top 1–3 của cả 3 bảng xếp hạng (GAR + Mini-Rush + Ca 4 Giờ) trong cùng một khung giờ xả.",
            en: "Sweep Top 1–3 across all 3 leaderboards (GAR + Mini-Rush + 4h Sprint) within a single synchronized dump window.",
          },
          targetMilestone: {
            vi: "Triple Crown: Top 1–3 Trên Cả 3 Bảng Xếp Hạng",
            en: "Triple Crown: Top 1–3 Across All 3 Leaderboards",
          },
        },
      ],
      shopTierList: [
        {
          id: "mr-shop-epic-rune",
          tier: "S",
          itemName: {
            vi: "Rương Cổ Ngữ Huyền Thoại / Sử Thi & Mảnh Vạn Năng",
            en: "Legendary / Epic Rune Chests & Universal Shards",
          },
          iconPath: "/images/items/chests/icon_30248.webp",
          rarity: "legendary",
          costAndCap: {
            vi: "Phần thưởng mốc rương cuối và Top BXH Mini-Rush",
            en: "Final milestone chest and Top Leaderboard rewards",
          },
          verdict: {
            vi: "GIÁ TRỊ CỐT LÕI: Cổ Ngữ bậc cao cung cấp tốc độ hành quân và giảm sát thương cực lớn.",
            en: "CORE VALUE: High-tier Runes provide massive march speed and damage reduction.",
          },
        },
        {
          id: "mr-shop-pet-essence",
          tier: "A",
          itemName: {
            vi: "Tinh Hoa Thú Cưng & Kim Cương Hoàn Trả",
            en: "Pet Essence & Rebate Diamonds",
          },
          iconPath: "/images/items/currencies/icon_10036.webp",
          rarity: "epic",
          costAndCap: {
            vi: "Nhận tự động khi vượt qua mốc rương 2 và 3",
            en: "Automatically awarded upon clearing Chests 2 and 3",
          },
          verdict: {
            vi: "HOÀN VỐN TỨC THÌ: Giúp tái tạo quỹ Kim Cương cho sự kiện Xúc Xắc / Vòng Quay.",
            en: "INSTANT REBATE: Replenishes your Diamond reserve for Dice / Wheel banners.",
          },
        },
        {
          id: "mr-shop-offweek-dump",
          tier: "F",
          itemName: {
            vi: "Xả Kho Nguyên Liệu Vào Tuần Nghỉ Trước GAR",
            en: "Dumping Hoarded Materials in the Off-Week Before GAR",
          },
          iconPath: "/images/items/consumables/icon_30222.webp",
          rarity: "common",
          costAndCap: {
            vi: "Mất trắng 50% – 75% tổng phần thưởng cộng hưởng",
            en: "Loses 50% – 75% of total overlapping event rewards",
          },
          verdict: {
            vi: "BẪY LỚN NHẤT GAME: Tuyệt đối giữ kỷ luật đóng băng kho trước tuần GAR!",
            en: "BIGGEST BAIT IN THE GAME: Maintain strict inventory freeze discipline before GAR week!",
          },
        },
      ],
    },
  },
];

export const EVENT_PLAYBOOKS_DATA: readonly EventPlaybookRecord[] = [
  ...PLAYBOOKS_PART_1,
  ...PLAYBOOKS_PART_2,
];

export function getPlaybooksByArticleCode(
  articleCode: EventPlaybookArticleCode
): readonly EventPlaybookRecord[] {
  return EVENT_PLAYBOOKS_DATA.filter((item) => item.articleCode === articleCode);
}

export function getPlaybookById(id: string): EventPlaybookRecord | undefined {
  return EVENT_PLAYBOOKS_DATA.find((item) => item.id === id);
}

export function filterPlaybooksBySeason(
  playbooks: readonly EventPlaybookRecord[],
  season: EventSeasonTag
): readonly EventPlaybookRecord[] {
  if (season === "ALL") return playbooks;
  return playbooks.filter((item) => item.seasons.includes(season));
}

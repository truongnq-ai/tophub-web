import type { GuideArticle, GuideCategory } from "./types";
import { ARTICLE_1_1_OVERVIEW } from "./groups/group-1/1.1-overview";
import { ARTICLE_1_2_STRICT_ONE_QUEUE } from "./groups/group-1/1.2-strict-one-queue-rule";
import { ARTICLE_1_3_DIAMOND_SPENDING } from "./groups/group-1/1.3-diamond-and-spending-guide";
import { ARTICLE_1_4_TOP_10_TRAPS } from "./groups/group-1/1.4-top-10-account-traps";

function createShellArticle(params: {
  code: string;
  slug: string;
  categorySlug: string;
  badge?: "FREE" | "PRO" | "HOT";
  readingMinutes: number;
  titleVi: string;
  titleEn: string;
  summaryVi: string;
  summaryEn: string;
  plannedOutlineVi: string[];
  plannedOutlineEn: string[];
  relatedCalculatorSlugs?: string[];
}): GuideArticle {
  return {
    code: params.code,
    displayCode: params.code,
    slug: params.slug,
    categorySlug: params.categorySlug,
    badge: params.badge ?? "FREE",
    status: "shell",
    readingMinutes: params.readingMinutes,
    title: { vi: params.titleVi, en: params.titleEn },
    summary: { vi: params.summaryVi, en: params.summaryEn },
    plannedOutline: params.plannedOutlineVi.map((vi, i) => ({
      vi,
      en: params.plannedOutlineEn[i] ?? vi,
    })),
    relatedCalculatorSlugs: params.relatedCalculatorSlugs ?? [],
    keyTakeaways: [],
    keywords: [],
    sourceFiles: [],
    freeSections: [],
    proSections: [],
  };
}

// ============================================================================
// 1. CẨM NANG ĐẦU TAY (GETTING STARTED)
// ============================================================================
export const SECTION_1_GETTING_STARTED: GuideCategory = {
  order: 1,
  displayOrder: 1,
  slug: "getting-started",
  zoneId: "zone_onboarding_meta",
  iconName: "Sprout",
  title: {
    vi: "1. Cẩm Nang Đầu Tay",
    en: "1. Beginner Handbook",
  },
  description: {
    vi: "Quy tắc sinh tồn cốt lõi, phác đồ 1 đội hình tập trung, 10 sai lầm chí mạng và quản lý Kim Cương chuẩn SSoT.",
    en: "Core survival rules, strict 1-queue discipline, 10 fatal account traps, and optimal Diamond spending protocols.",
  },
  articles: [
    {
      ...ARTICLE_1_1_OVERVIEW,
      status: "published",
    },
    {
      ...ARTICLE_1_2_STRICT_ONE_QUEUE,
      status: "shell",
      plannedOutline: [
        {
          vi: "Từ điển 50+ thuật ngữ viết tắt phổ biến trong cộng đồng Top Heroes",
          en: "50+ common community abbreviations and terms glossary",
        },
        {
          vi: "Kỷ luật 1 hàng chờ: Tại sao dồn 100% tài nguyên cho Đội 1 là con đường sống sót duy nhất",
          en: "1-Queue discipline: Why funneling 100% resources into Queue 1 is the only survival path",
        },
        {
          vi: "Quy tắc bảo toàn tướng tím và mảnh vạn năng",
          en: "Preserving epic heroes and universal shards",
        },
        {
          vi: "Cách phân bổ thể lực và lượt quét phụ bản hàng ngày",
          en: "Daily stamina allocation and dungeon sweep protocols",
        },
      ],
      relatedCalculatorSlugs: ["hero-stars", "hero-traits"],
    },
    {
      ...ARTICLE_1_3_DIAMOND_SPENDING,
      status: "shell",
      plannedOutline: [
        {
          vi: "Chiến lược Gacha, Quán Rượu và tích lũy vé chiêu mộ",
          en: "Gacha, Tavern, and summon voucher accumulation strategy",
        },
        {
          vi: "Định giá Kim Cương chuẩn: Nên mua gì và cấm mua gì",
          en: "Diamond valuation: What to buy vs avoid",
        },
        {
          vi: "Mốc tích 20,000 Kim Cương phòng thủ",
          en: "The 20,000 Diamond emergency reserve",
        },
        {
          vi: "So sánh hiệu suất đầu tư giữa các gói nạp và tích lũy F2P",
          en: "Investment ROI across spender packs and F2P hoarding",
        },
      ],
      relatedCalculatorSlugs: ["hero-awakening"],
    },
    {
      ...ARTICLE_1_4_TOP_10_TRAPS,
      status: "shell",
      plannedOutline: [
        {
          vi: "Bẫy nuôi dàn trải 3 đội hình quá sớm làm phân tán tài nguyên",
          en: "The trap of building 3 teams too early causing resource drought",
        },
        {
          vi: "Sai lầm dùng Kim Cương mua tăng tốc / tài nguyên trong tiệm thường",
          en: "Mistake of spending Diamonds on speedups/resources in normal shops",
        },
        {
          vi: "Đốt sách kỹ năng và mảnh vạn năng cho tướng tím / xanh",
          en: "Wasting skill books and universal shards on epic/rare heroes",
        },
        {
          vi: "Kế hoạch 14 ngày sửa sai phục hồi tài khoản bị lệch hướng",
          en: "14-day emergency recovery plan for derailed accounts",
        },
      ],
      relatedCalculatorSlugs: ["construction", "hero-stars"],
    },
  ],
};

// ============================================================================
// 2. THÔNG TIN CÁC PHE (S0 - S4) (FACTIONS & HEROES)
// ============================================================================
export const SECTION_2_FACTIONS: GuideCategory = {
  order: 2,
  displayOrder: 2,
  slug: "factions",
  zoneId: "zone_onboarding_meta",
  iconName: "ShieldAlert",
  title: {
    vi: "2. Thông Tin Các Phe (S0 - S4)",
    en: "2. Faction & Meta Guides (S0 - S4)",
  },
  description: {
    vi: "Chi tiết 3 Phe (Tự Nhiên, Liên Minh, Bộ Lạc), lộ trình đội hình qua từng Season, chiến lược chuyển phe và Tier List.",
    en: "In-depth guide for Nature, League and Horde; seasonal team progression across S0-S4, pivot strategies and Tier Lists.",
  },
  articles: [
    createShellArticle({
      code: "2.1",
      slug: "faction-overview",
      categorySlug: "factions",
      readingMinutes: 8,
      titleVi: "Phân Tích Chuyên Sâu & Hướng Dẫn Chọn Phe (Tự Nhiên vs Liên Minh vs Bộ Lạc)",
      titleEn: "In-Depth Faction Guide: Nature vs League vs Horde",
      summaryVi: "So sánh toàn diện ưu/nhược điểm, phong cách chiến đấu và độ tốn kém của 3 phe lớn.",
      summaryEn: "Comprehensive comparison of pros/cons, combat archetypes, and investment tiers for all 3 factions.",
      plannedOutlineVi: [
        "Đặc trưng lối chơi: Tự Nhiên (Khống chế/Hồi máu), Liên Minh (Bạo kích/Sát thương dồn), Bộ Lạc (Sinh tồn/Phản đòn)",
        "Phân tích độ thân thiện với F2P / Low-Spender / Cá voi",
        "Khả năng thích ứng PvE leo tháp vs PvP đấu trường",
        "Khuyến nghị lựa chọn phe dựa theo tiến độ mở tướng ban đầu",
      ],
      plannedOutlineEn: [
        "Playstyle identity: Nature (Control/Heal), League (Burst Crit), Horde (Sustain/Reflect)",
        "Friendliness analysis for F2P, low-spenders, and whales",
        "PvE campaign pushing vs PvP arena adaptability",
        "Faction selection recommendations based on early hero pulls",
      ],
      relatedCalculatorSlugs: ["hero-stars", "hero-awakening"],
    }),
    createShellArticle({
      code: "2.2",
      slug: "s0-to-s4-progression",
      categorySlug: "factions",
      readingMinutes: 10,
      titleVi: "Lộ Trình Đội Hình 3 Phe Theo Từng Mùa Giải (S0 ➔ S1 ➔ S2 ➔ S3 ➔ S4)",
      titleEn: "3-Faction Team Progression Across S0-S4",
      summaryVi: "Sơ đồ xây dựng đội hình chuẩn từ ngày đầu server đến giai đoạn Endgame mùa 4.",
      summaryEn: "Step-by-step formation building roadmap from Day 1 server start to Season 4 Endgame.",
      plannedOutlineVi: [
        "Giai đoạn S0 (Ngày 1–65): Đội hình khởi đầu và tướng chuyển tiếp",
        "Giai đoạn S1 (Đảo Mùa Xuân): Đột phá thức tỉnh và tướng đỏ thế hệ mới",
        "Giai đoạn S2–S3: Hoàn thiện đội hình thuần 6 tướng và thánh vật",
        "Giai đoạn S4 Endgame: Đội hình tối thượng và khắc chế chéo",
      ],
      plannedOutlineEn: [
        "S0 Phase (Days 1–65): Starter lineups and transition champions",
        "S1 Phase (Spring Island): Awakening breakthrough and new-gen Mythics",
        "S2–S3 Phase: Perfecting pure 6-hero faction and relics synergy",
        "S4 Endgame Phase: Ultimate lineups and cross-counter positioning",
      ],
      relatedCalculatorSlugs: ["hero-stars", "hero-traits"],
    }),
    createShellArticle({
      code: "2.3",
      slug: "pivot-strategy",
      categorySlug: "factions",
      readingMinutes: 8,
      titleVi: "Thời Điểm Vàng Chuyển Phe (Pivot Strategy & Bảo Toàn Tài Nguyên)",
      titleEn: "Faction Pivot Strategy & Resource Preservation",
      summaryVi: "Bí quyết chuyển từ đội hình tạp nham sang phe thuần mà không bị tụt lực chiến.",
      summaryEn: "How to smoothly pivot from a hybrid team to a pure faction without losing battle rating.",
      plannedOutlineVi: [
        "Khi nào nên chuyển phe? Các tín hiệu từ số lượng mảnh tướng đỏ",
        "Quy tắc bảo tồn trang bị và đá thức tỉnh khi đổi tướng chủ lực",
        "Bảo tồn hàng chờ thứ 2 và cách tái sử dụng tướng cũ leo tháp",
        "Những rủi ro cần tránh khi pivot vội vàng giữa mùa giải",
      ],
      plannedOutlineEn: [
        "When to pivot? Key signals from Mythic shard accumulation",
        "Gear and Awakening Soul Stones preservation protocols",
        "Maintaining secondary queue and recycling old heroes for towers",
        "Risks to avoid when pivoting prematurely mid-season",
      ],
      relatedCalculatorSlugs: ["hero-awakening"],
    }),
    createShellArticle({
      code: "2.4",
      slug: "tier-list",
      categorySlug: "factions",
      readingMinutes: 7,
      titleVi: "Bảng Xếp Hạng Anh Hùng (Tier List Chuẩn Meta PvE, PvP & Boss Bang)",
      titleEn: "Hero Meta Tier List: PvE, PvP & Guild Boss",
      summaryVi: "Đánh giá sức mạnh toàn bộ tướng theo từng chế độ chơi và mức độ đầu tư.",
      summaryEn: "Objective tier list evaluating all heroes across game modes and investment tiers.",
      plannedOutlineVi: [
        "Tier SSS / SS / S / A cho chế độ Đấu trường PvP",
        "Tier List săn Boss Bang Hội & Boss Thế Giới",
        "Bảng xếp hạng tướng leo Tháp Viễn Chinh & Bản đồ PvE",
        "Đánh giá giá trị thức tỉnh: Tướng nào đáng dồn 9 Hồn Đá Đỏ nhất",
      ],
      plannedOutlineEn: [
        "Tier SSS / SS / S / A for PvP Arena",
        "Tier list for Guild Boss and World Boss raids",
        "Expedition Tower and PvE Campaign ranking",
        "Awakening value assessment: Who deserves the first 9 Soul Stones",
      ],
      relatedCalculatorSlugs: ["hero-stars"],
    }),
    createShellArticle({
      code: "2.5",
      slug: "counter-and-positioning",
      categorySlug: "factions",
      readingMinutes: 6,
      titleVi: "Cơ Chế Khắc Chế Hệ Phái, Hào Quang & Nghệ Thuật Sắp Đội Hình 6 Vị Trí",
      titleEn: "Faction Counters, Auras & 6-Hero Positioning",
      summaryVi: "Nguyên lý vòng tròn khắc chế 20% sát thương và nghệ thuật xếp vị trí hàng trước/hàng sau.",
      summaryEn: "The 20% faction counter circle and the tactical art of frontline/backline 6-hero positioning.",
      plannedOutlineVi: [
        "Vòng tròn khắc chế: Bộ Lạc > Tự Nhiên > Liên Minh > Bộ Lạc (+20% Dmg)",
        "Kích hoạt hào quang cùng phe: 3/4/5/6 tướng",
        "Quy tắc đặt Tanker, Sát thương chủ lực và Hỗ trợ trên bàn cờ 6 ô",
        "Chiến thuật xếp trận khắc chế đối thủ lực chiến cao hơn trong PvP",
      ],
      plannedOutlineEn: [
        "Counter circle: Horde > Nature > League > Horde (+20% Dmg)",
        "Same-faction aura activation buffs: 3/4/5/6 heroes",
        "Frontline tanker, core DPS and support placement rules",
        "Tactical formation adjustments to defeat higher-CP opponents in PvP",
      ],
      relatedCalculatorSlugs: ["hero-traits"],
    }),
  ],
};

// ============================================================================
// 3. CÔNG TRÌNH & XÂY DỰNG (BUILDINGS & INFRASTRUCTURE)
// ============================================================================
export const SECTION_3_BUILDINGS: GuideCategory = {
  order: 3,
  displayOrder: 3,
  slug: "buildings",
  zoneId: "zone_systems_economy",
  iconName: "Castle",
  title: {
    vi: "3. Công Trình & Xây Dựng",
    en: "3. Buildings & Castle Construction",
  },
  description: {
    vi: "Thứ tự nâng công trình, mốc Lâu Đài C1–C40, quản lý thợ xây và kiến trúc độc quyền theo mùa giải.",
    en: "Building upgrade priority, Castle C1–C40 power milestones, builder queues and seasonal architectures.",
  },
  articles: [
    createShellArticle({
      code: "3.1",
      slug: "building-priority",
      categorySlug: "buildings",
      readingMinutes: 6,
      titleVi: "Thứ Tự Ưu Tiên Nâng Cấp Công Trình Căn Cứ",
      titleEn: "Base Building Upgrade Priority",
      summaryVi: "Nhà nào bắt buộc phải nâng theo Lâu Đài, nhà nào có thể tạm gác lại để tiết kiệm tài nguyên.",
      summaryEn: "Mandatory prerequisite buildings versus non-essential structures to optimize resource flow.",
      plannedOutlineVi: [
        "Chuỗi điều kiện nâng Lâu Đài: Tường thành, Viện nghiên cứu, Doanh trại",
        "Nhà tài nguyên (Gỗ, Đá, Quặng): Có nên max cấp sớm không?",
        "Doanh trại lính và Trạm y tế: Cân bằng sản xuất và sức chứa thương binh",
        "Lịch nâng nhà đồng bộ với Sự kiện Đua Vũ Trang (GAR)",
      ],
      plannedOutlineEn: [
        "Castle prerequisite chain: Wall, Research Institute, Barracks",
        "Resource buildings (Lumber, Quarry, Mine): Should you max them early?",
        "Barracks and Infirmary: Balancing troop training and wounded capacity",
        "Synchronizing construction milestones with Guild Arms Race (GAR)",
      ],
      relatedCalculatorSlugs: ["construction"],
    }),
    createShellArticle({
      code: "3.2",
      slug: "castle-c1-c40",
      categorySlug: "buildings",
      readingMinutes: 8,
      titleVi: "Lộ Trình Nâng Lâu Đài C1–C40 & Các Mốc Đột Phá Lực Chiến",
      titleEn: "Castle C1–C40 Roadmap & Power Spikes",
      summaryVi: "Chi tiết yêu cầu tài nguyên, thời gian và các mốc mở khóa tính năng quan trọng C20, C25, C30, C35, C40.",
      summaryEn: "Detailed resource costs, build timers, and critical feature unlock milestones (C20, C25, C30, C35, C40).",
      plannedOutlineVi: [
        "Mốc C20–C25: Mở khóa hàng chờ hành quân và lính T8/T9",
        "Mốc C30: Ngưỡng cửa bước vào chiến trường liên server",
        "Mốc C35–C40: Đột phá hào quang vinh quang và lính T10",
        "Bảng tổng hợp chi phí tài nguyên và chiến lược tích trữ",
      ],
      plannedOutlineEn: [
        "C20–C25 Milestones: Queue unlocks and T8/T9 troops",
        "C30 Milestone: The gateway to cross-server warfare",
        "C35–C40 Milestones: Brilliance auras and T10 troops",
        "Total resource requirements summary and hoarding strategy",
      ],
      relatedCalculatorSlugs: ["construction"],
    }),
    createShellArticle({
      code: "3.3",
      slug: "construction-speed-and-builder",
      categorySlug: "buildings",
      readingMinutes: 5,
      titleVi: "Tối Ưu Tốc Độ Xây Dựng, Quản Lý Thợ Xây & Chống Cướp Tài Nguyên",
      titleEn: "Construction Speed, Builders & Resource Protection",
      summaryVi: "Kỹ thuật giảm 50%+ thời gian xây dựng bằng viện trợ bang, buff lãnh chúa và mẹo bảo vệ kho.",
      summaryEn: "Reduce 50%+ construction timers via alliance help, lord talents, and warehouse vault mechanics.",
      plannedOutlineVi: [
        "Cơ chế Viện trợ Bang hội: Tối đa hóa số lần bấm giúp đỡ",
        "Điểm thiên phú Lãnh chúa và Trang bị tăng tốc xây dựng",
        "Thợ xây thứ 2: Mua vĩnh viễn hay thuê theo tuần?",
        "Kỹ thuật giấu tài nguyên vào hòm đồ tránh bị đối thủ do thám cướp",
      ],
      plannedOutlineEn: [
        "Alliance help mechanics: Maximizing help reduction value",
        "Lord talents and construction speed gear setup",
        "Second builder queue: Permanent purchase vs weekly rental",
        "Resource sheltering techniques to protect from enemy scouting and raids",
      ],
      relatedCalculatorSlugs: ["construction"],
    }),
    createShellArticle({
      code: "3.4",
      slug: "seasonal-buildings",
      categorySlug: "buildings",
      readingMinutes: 6,
      titleVi: "Công Trình Mùa Giải Độc Quyền (Season 1 Đảo Mùa Xuân)",
      titleEn: "Exclusive Seasonal Buildings (S1 Spring Island)",
      summaryVi: "Hướng dẫn xây dựng và nâng cấp các công trình đặc biệt chỉ xuất hiện trong mùa giải.",
      summaryEn: "Guide to building and upgrading exclusive structures in seasonal expansion maps.",
      plannedOutlineVi: [
        "Xưởng chế tác mùa giải và kiến trúc khai thác khoáng thạch",
        "Pháo đài bang hội trên bản đồ mùa giải",
        "Thứ tự nâng cấp công trình mùa giải tối ưu điểm chiến tích",
        "Những lưu ý khi kết thúc mùa giải: Công trình nào được giữ lại",
      ],
      plannedOutlineEn: [
        "Seasonal workshop and special ore extraction plants",
        "Alliance fortresses on the seasonal world map",
        "Upgrade sequence to maximize seasonal prestige points",
        "Season reset rules: Which structures carry over",
      ],
      relatedCalculatorSlugs: ["construction"],
    }),
  ],
};

// ============================================================================
// 4. CÔNG NGHỆ & NGHIÊN CỨU (RESEARCH & TECH TREES)
// ============================================================================
export const SECTION_4_TECHNOLOGY: GuideCategory = {
  order: 4,
  displayOrder: 4,
  slug: "technology",
  zoneId: "zone_systems_economy",
  iconName: "Sparkles",
  title: {
    vi: "4. Công Nghệ & Nghiên Cứu",
    en: "4. Technology & Research Trees",
  },
  description: {
    vi: "Bản đồ Viện Nghiên Cứu, thứ tự ưu tiên kinh tế vs quân sự, công nghệ bang hội và cây khoa kỹ mùa giải.",
    en: "Research Institute branches, economic vs military priority, alliance tech contributions, and seasonal tech trees.",
  },
  articles: [
    createShellArticle({
      code: "4.1",
      slug: "research-overview-and-priority",
      categorySlug: "technology",
      readingMinutes: 7,
      titleVi: "Bản Đồ Viện Nghiên Cứu: Nhánh Nâng Trước vs Nhánh Nâng Sau",
      titleEn: "Research Institute Map & Priority Branches",
      summaryVi: "Tổng quan các nhánh nghiên cứu và thứ tự ưu tiên tối ưu nhất cho từng giai đoạn tài khoản.",
      summaryEn: "Overview of all research branches and the optimal progression path for each account stage.",
      plannedOutlineVi: [
        "Cấu trúc cây công nghệ: Phát triển căn cứ, Kinh tế, Quân sự, Bổ trợ",
        "Những công nghệ 'Core' bắt buộc phải hoàn thành trước ngày 30",
        "Kỹ thuật canh giờ nghiên cứu trùng với sự kiện ngày thứ 4 GAR",
        "Bảng thời gian và tài nguyên yêu cầu cho các mốc công nghệ lớn",
      ],
      plannedOutlineEn: [
        "Tech tree structure: Base development, Economy, Military, Support",
        "Core mandatory technologies before Day 30",
        "Timing research completions with Wednesday GAR Tech Race",
        "Time and resource requirements table for major tech breakthroughs",
      ],
      relatedCalculatorSlugs: ["technology"],
    }),
    createShellArticle({
      code: "4.2",
      slug: "economy-vs-military-tech",
      categorySlug: "technology",
      readingMinutes: 6,
      titleVi: "Thứ Tự Ưu Tiên: Công Nghệ Kinh Tế vs Quân Sự vs Phát Triển Phe",
      titleEn: "Economy vs Military vs Faction Tech Allocation",
      summaryVi: "Nên dồn điểm tăng sản lượng tài nguyên hay tăng sát thương/máu lính trước?",
      summaryEn: "Should you prioritize resource production or troop attack/HP stats first?",
      plannedOutlineVi: [
        "Phân tích hoàn vốn: Khi nào công nghệ kinh tế bắt đầu sinh lời",
        "Công nghệ quân sự: Ưu tiên sát thương hay giảm thương?",
        "Nhánh công nghệ riêng cho phe chủ lực (Tự Nhiên / Liên Minh / Bộ Lạc)",
        "Chiến lược cân bằng 70/30 giữa quân sự và kinh tế",
      ],
      plannedOutlineEn: [
        "Payback period analysis: When economy tech becomes profitable",
        "Military tech: Attack boost vs damage reduction priority",
        "Faction-specific branches for your main lineup",
        "The optimal 70/30 balance between military and economic trees",
      ],
      relatedCalculatorSlugs: ["technology"],
    }),
    createShellArticle({
      code: "4.3",
      slug: "guild-tech",
      categorySlug: "technology",
      readingMinutes: 5,
      titleVi: "Công Nghệ Bang Hội & Kỹ Thuật Đóng Góp Điểm Vinh Dự Tối Ưu",
      titleEn: "Guild Tech & Honor Point Contribution",
      summaryVi: "Cách đóng góp hiệu quả nhất để vừa giúp bang thăng tiến, vừa tối đa điểm cá nhân mua shop.",
      summaryEn: "How to contribute efficiently to advance alliance tech while maximizing personal shop coins.",
      plannedOutlineVi: [
        "Cơ chế đóng góp: Kim Cương vs Tài nguyên thường",
        "Cách tận dụng buff x2/x5 điểm vinh dự khi đóng góp",
        "Thứ tự ưu tiên nghiên cứu của Bang chủ & Cán sự",
        "Lợi ích khổng lồ từ công nghệ Sức Chứa Viện Trợ và Tốc Độ Hành Quân",
      ],
      plannedOutlineEn: [
        "Donation mechanics: Diamonds vs standard resources",
        "Leveraging x2/x5 crit multipliers during donations",
        "Officer priority roadmap for alliance research branches",
        "Massive perks from Reinforcement Capacity and March Speed tech",
      ],
      relatedCalculatorSlugs: ["technology"],
    }),
    createShellArticle({
      code: "4.4",
      slug: "season-tech-tree",
      categorySlug: "technology",
      readingMinutes: 6,
      titleVi: "Cây Công Nghệ Mùa Giải (Season 1 Tech Tree)",
      titleEn: "Seasonal Tech Tree (Season 1)",
      summaryVi: "Chiến thuật nâng nhánh công nghệ mùa giải để chiếm mỏ quặng cấp cao và săn boss đảo.",
      summaryEn: "Strategies for allocating seasonal tech points to capture high-level nodes and defeat island bosses.",
      plannedOutlineVi: [
        "Đơn vị tiền tệ khoa kỹ mùa giải và cách thu thập",
        "Nhánh kháng chướng khí và tăng tốc độ khai thác khoáng thạch",
        "Kỹ năng chủ động mùa giải trên bản đồ chiến trường",
        "Phác đồ reset điểm công nghệ mùa giải theo từng giai đoạn",
      ],
      plannedOutlineEn: [
        "Seasonal tech currency and collection mechanics",
        "Miasma resistance branch and mining speed acceleration",
        "Active battlefield skills unlocked through seasonal tech",
        "Tech respec strategies across early, mid, and late season phases",
      ],
      relatedCalculatorSlugs: ["technology"],
    }),
  ],
};

// ============================================================================
// 5. SỰ KIỆN & LỊCH TRÌNH (EVENTS & CALENDAR)
// ============================================================================
export const SECTION_5_EVENTS: GuideCategory = {
  order: 5,
  displayOrder: 5,
  slug: "events",
  zoneId: "zone_events_roadmap",
  iconName: "CalendarClock",
  title: {
    vi: "5. Sự Kiện & Lịch Trình",
    en: "5. Events & Seasonal Schedules",
  },
  description: {
    vi: "Lịch sự kiện tuần hoàn, kỹ thuật Double-Dip ăn điểm kép, đua vũ trang GAR, KvK và bách khoa 90 sự kiện.",
    en: "Recurring event calendar, Double-Dip point stacking techniques, GAR, KvK, and the 90-event compendium.",
  },
  articles: [
    createShellArticle({
      code: "5.1",
      slug: "recurring-calendar",
      categorySlug: "events",
      readingMinutes: 7,
      titleVi: "Lịch Sự Kiện Tuần Hoàn & Chu Kỳ 10 Tuần Toàn Server",
      titleEn: "Recurring Event Calendar & 10-Week Server Cycle",
      summaryVi: "Bảng phân bổ các sự kiện lặp lại Thứ 2 đến Chủ nhật và vòng lặp 10 tuần mở tướng đỏ.",
      summaryEn: "Weekly event timeline (Mon-Sun) and the 10-week server progression rotation schedule.",
      plannedOutlineVi: [
        "Lịch trình 7 ngày trong tuần: Thứ 2 Xây dựng, Thứ 4 Công nghệ, Thứ 6 Tướng...",
        "Chu kỳ 10 tuần ra mắt tướng đỏ và vũ khí độc quyền",
        "Kế hoạch tích trữ tài nguyên theo chu kỳ tuần hoàn",
        "Thời điểm máy chủ làm mới và lưu ý múi giờ quốc tế",
      ],
      plannedOutlineEn: [
        "7-day weekly schedule: Mon Building, Wed Tech, Fri Hero training...",
        "10-week server rotation for new Mythic champions and exclusive weapons",
        "Hoarding checklist aligned with recurring cycles",
        "Server reset times and timezone synchronization (UTC vs Local)",
      ],
      relatedCalculatorSlugs: ["gear-enhance"],
    }),
    createShellArticle({
      code: "5.2",
      slug: "double-dip-windows",
      categorySlug: "events",
      readingMinutes: 6,
      titleVi: "Giờ Vàng Double-Dip (Kỹ Thuật Ăn Điểm Kép 2 Sự Kiện Cùng Lúc)",
      titleEn: "Double-Dip Timing: Double Points Technique",
      summaryVi: "Tuyệt chiêu phối hợp tiêu tài nguyên 1 lần nhưng nhận thưởng tối đa từ 2 sự kiện cùng diễn ra.",
      summaryEn: "How to spend resources once to claim top milestone rewards from two simultaneous events.",
      plannedOutlineVi: [
        "Nguyên lý Double-Dip: Khi Sự Kiện Ngày trùng với Sự Kiện Mùa/Tuần",
        "Giờ vàng nâng cấp công trình & nghiên cứu",
        "Giờ vàng chiêu mộ tướng và rèn trang bị",
        "Bảng đối chiếu các khung giờ vàng trong tuần chuẩn giờ VN",
      ],
      plannedOutlineEn: [
        "Double-Dip principle: Aligning Daily sprints with Weekly/Seasonal milestones",
        "Golden windows for construction and research upgrades",
        "Golden windows for hero summons and gear forging",
        "Cross-reference timetable of golden hours in UTC and Local time",
      ],
      relatedCalculatorSlugs: ["hero-stars"],
    }),
    createShellArticle({
      code: "5.3",
      slug: "gar-and-kvk-guide",
      categorySlug: "events",
      readingMinutes: 9,
      titleVi: "Cẩm Nang Đua Vũ Trang Bang Hội (GAR) & Đấu Trường Liên Server (KvK)",
      titleEn: "Guild Arms Race (GAR) & KvK Cross-Server War",
      summaryVi: "Chiến thuật phối hợp toàn bang để giành chiến thắng trong cuộc đua điểm số và chiếm đóng thủ phủ liên server.",
      summaryEn: "Alliance coordination playbook to secure victory in point races and cross-server capital conquests.",
      plannedOutlineVi: [
        "Cơ chế 6 ngày Đua Vũ Trang Bang Hội (GAR): Luật ăn mốc và tích điểm",
        "Chiến trường KvK: Công thành, giữ tháp và chiếm đoạt ngai vàng",
        "Phân công vai trò: Quân chủ lực công kích vs Hậu cần xây dựng",
        "Chiến thuật sử dụng Khiên Hòa Bình và di chuyển căn cứ chiến thuật",
      ],
      plannedOutlineEn: [
        "6-day Guild Arms Race (GAR) mechanics: Point brackets and scoring rules",
        "KvK Battlefield: Castle sieges, spire defense, and capital capture",
        "Role allocation: Frontline shock troops vs logistics builders",
        "Peace shield deployment and tactical base relocations",
      ],
      relatedCalculatorSlugs: ["gear-enhance"],
    }),
    createShellArticle({
      code: "5.4",
      slug: "90-events-encyclopedia",
      categorySlug: "events",
      readingMinutes: 12,
      titleVi: "Bách Khoa Toàn Thư 90 Sự Kiện (Phân Chia Theo 3 Giai Đoạn Server)",
      titleEn: "90-Event Encyclopedia Across 3 Server Stages",
      summaryVi: "Tra cứu đầy đủ luật chơi, mốc điểm và phần thưởng của toàn bộ 90 sự kiện trong game.",
      summaryEn: "Comprehensive reference of rules, milestone brackets, and rewards for all 90 events.",
      plannedOutlineVi: [
        "Giai đoạn 1 (Ngày 1–39): 28 sự kiện tân thủ và mở đất",
        "Giai đoạn 2 (Ngày 40–100): 36 sự kiện tuần hoàn và đua bang",
        "Giai đoạn 3 (Mùa giải S1–S4): 26 sự kiện thế giới và lễ hội",
        "Chỉ số ROI và phân loại sự kiện: Nên dồn lực vs Nên bỏ qua",
      ],
      plannedOutlineEn: [
        "Stage 1 (Days 1–39): 28 beginner and expansion events",
        "Stage 2 (Days 40–100): 36 recurring and alliance war events",
        "Stage 3 (Seasons S1–S4): 26 world expedition and seasonal festivals",
        "ROI rating: Which events to commit heavily vs pass",
      ],
      relatedCalculatorSlugs: ["hero-stars"],
    }),
  ],
};

// ============================================================================
// 6. CỬA HÀNG & TIỆM MUA SẮM (SHOPS & ECONOMY)
// ============================================================================
export const SECTION_6_SHOPS: GuideCategory = {
  order: 6,
  displayOrder: 6,
  slug: "shops",
  zoneId: "zone_systems_economy",
  iconName: "ShoppingBag",
  title: {
    vi: "6. Cửa Hàng & Tiệm Mua Sắm",
    en: "6. Shops Priority & Game Economy",
  },
  description: {
    vi: "Chiến lược mua sắm 12 tiệm in-game, quản lý tiền tệ, chi tiêu Kim Cương và định giá tài nguyên.",
    en: "Purchasing priorities across 12 in-game shops, currency management, Diamond valuation, and spending rules.",
  },
  articles: [
    createShellArticle({
      code: "6.1",
      slug: "12-shops-priority",
      categorySlug: "shops",
      readingMinutes: 8,
      titleVi: "Hướng Dẫn Mua Sắm 12 Tiệm In-Game: 'Nên Mua Gì / Tuyệt Đối Không Mua Gì'",
      titleEn: "12 In-Game Shops Priority: What to Buy vs Avoid",
      summaryVi: "Bảng xếp hạng ưu tiên vật phẩm cho từng cửa hàng, tránh lãng phí tiền tệ quý hiếm.",
      summaryEn: "Item tier ranking for every in-game shop to prevent wasting rare currencies.",
      plannedOutlineVi: [
        "Tiệm Tạp Hóa & Tiệm VIP: Mua gì bằng Vàng và Kim Cương",
        "Tiệm Hắc Thị & Tiệm Bí Ẩn: Những món hời giảm giá 70%",
        "Tiệm Thám Hiểm & Tiệm Đấu Trường: Đổi mảnh tướng nào trước",
        "Quy tắc tuyệt đối không mua: Danh sách các 'bẫy tiền tệ'",
      ],
      plannedOutlineEn: [
        "General Store & VIP Shop: Gold vs Diamond purchase priorities",
        "Black Market & Mystery Shop: Finding genuine 70% discounts",
        "Expedition & Arena Shops: Which hero shards to prioritize",
        "Strict taboo list: Items that are a complete waste of currency",
      ],
      relatedCalculatorSlugs: ["construction"],
    }),
    createShellArticle({
      code: "6.2",
      slug: "guild-shop-strategy",
      categorySlug: "shops",
      readingMinutes: 6,
      titleVi: "Tiệm Bang Hội: Chiến Lược Tích Điểm & Đổi Mảnh Tướng / Trang Bị",
      titleEn: "Guild Shop: Points Strategy & Shard Redemption",
      summaryVi: "Cách kiếm tối đa điểm cống hiến bang và lộ trình đổi mảnh tướng đỏ, đá thức tỉnh.",
      summaryEn: "Maximizing alliance contribution coins and optimal redemption sequence for Mythic shards.",
      plannedOutlineVi: [
        "Các nguồn kiếm Điểm Cống Hiến: Đóng góp, viện trợ, sự kiện bang",
        "Thứ tự ưu tiên đổi: Mảnh tướng đỏ vs Bản vẽ trang bị vs Tăng tốc",
        "Có nên đóng băng điểm chờ sang Season mới không?",
        "Mẹo mua làm mới (refresh) tiệm bang hội có lời",
      ],
      plannedOutlineEn: [
        "Contribution coin income: Donations, helps, alliance events",
        "Redemption priority: Mythic hero shards vs gear blueprints vs speedups",
        "Should you hoard coins before a new Season transition?",
        "When is it mathematically profitable to refresh the Guild Shop",
      ],
      relatedCalculatorSlugs: ["hero-stars"],
    }),
    createShellArticle({
      code: "6.3",
      slug: "arena-and-honor-shops",
      categorySlug: "shops",
      readingMinutes: 5,
      titleVi: "Tiệm Đấu Trường & Tiệm Vinh Dự Server",
      titleEn: "Arena & Honor Shops Strategy",
      summaryVi: "Chiến thuật tích huy chương đấu trường và huân chương vinh dự liên server.",
      summaryEn: "Maximizing arena tokens and cross-server honor medals for end-game progression.",
      plannedOutlineVi: [
        "Tối ưu thứ hạng Đấu trường để nhận thưởng hàng ngày",
        "Ưu tiên đổi mảnh tướng độc quyền đấu trường",
        "Tiệm Vinh Dự KvK: Đổi nguyên liệu trang bị Lãnh Chúa",
        "Quản lý huy chương không bị lãng phí sau mỗi mùa giải",
      ],
      plannedOutlineEn: [
        "Optimizing daily arena ranking reward brackets",
        "Arena-exclusive hero shard redemption priority",
        "KvK Honor Shop: Lord Gear crafting materials",
        "Managing medals to avoid end-of-season expiration",
      ],
      relatedCalculatorSlugs: ["gear-promotion"],
    }),
    createShellArticle({
      code: "6.4",
      slug: "diamond-spending-rules",
      categorySlug: "shops",
      readingMinutes: 7,
      titleVi: "Cẩm Nang Tiêu Kim Cương Hiệu Quả & Định Giá Tài Nguyên",
      titleEn: "Diamond Spending Rules & Resource Valuation",
      summaryVi: "Bảng định giá quy đổi Kim Cương sang thể lực, vé quay, tăng tốc và mảnh tướng.",
      summaryEn: "Valuation exchange table: Converting Diamonds into stamina, vouchers, speedups, and shards.",
      plannedOutlineVi: [
        "Nguyên tắc 'Kim Cương Bất Động': Giữ tối thiểu 20,000 Kim Cương phòng thủ",
        "Top 3 mục tiêu tiêu Kim Cương sinh lời cao nhất tài khoản",
        "Bảng quy đổi giá trị chuẩn: 1 Vé quay = ? Kim Cương, 1h Tăng tốc = ? KC",
        "Những sai lầm tiêu Kim Cương phổ biến khiến F2P kiệt quệ",
      ],
      plannedOutlineEn: [
        "The 'Reserve Rule': Maintaining a 20,000 Diamond emergency floor",
        "Top 3 highest-ROI Diamond investments for account power",
        "Standard valuation table: 1 Summon Voucher = ? Diamonds, 1h Speedup = ? KC",
        "Common Diamond spending traps that deplete F2P reserves",
      ],
      relatedCalculatorSlugs: ["hero-awakening"],
    }),
  ],
};

// ============================================================================
// 7. TRANG BỊ & THẦN KHÍ (GEAR & EXCLUSIVE WEAPONS)
// ============================================================================
export const SECTION_7_GEAR: GuideCategory = {
  order: 7,
  displayOrder: 7,
  slug: "gear",
  zoneId: "zone_systems_economy",
  iconName: "Swords",
  title: {
    vi: "7. Trang Bị & Thần Khí",
    en: "7. Gear, Weapons & Lord Gear",
  },
  description: {
    vi: "Hệ thống rèn đúc, cộng hưởng trang bị, trang bị Thần Thoại, vũ khí độc quyền và trang bị Lãnh Chúa.",
    en: "Gear forging, resonance bonuses, Mythic gear refinement, exclusive hero weapons, and Lord Gear.",
  },
  articles: [
    createShellArticle({
      code: "7.1",
      slug: "gear-forge-and-resonance",
      categorySlug: "gear",
      readingMinutes: 7,
      titleVi: "Hệ Thống Rèn Đúc, Cường Hóa & Kích Hoạt Cộng Hưởng Trang Bị",
      titleEn: "Gear Forge, Enhancement & Resonance",
      summaryVi: "Nguyên lý nâng cấp 4 món trang bị (Vũ khí, Mũ, Áo, Giày) và kích hoạt mốc cộng hưởng chỉ số.",
      summaryEn: "Principles of upgrading the 4 gear pieces and activating gear set resonance thresholds.",
      plannedOutlineVi: [
        "4 loại trang bị: Vũ khí (Công), Mũ (Máu), Áo (Thủ), Giày (Tốc/Công)",
        "Các mốc Cộng Hưởng Cường Hóa (+10, +20, +30) cho toàn đội",
        "Thứ tự nâng đồ cho Tanker vs Sát thương chủ lực vs Hỗ trợ",
        "Kỹ thuật dồn tài nguyên rèn cho 1 tướng chủ lực gánh đội",
      ],
      plannedOutlineEn: [
        "4 gear slots: Weapon (Atk), Helm (HP), Armor (Def), Boots (Spd/Atk)",
        "Gear Enhancement Resonance milestones (+10, +20, +30) teamwide",
        "Slot upgrade priorities for Tankers vs Core DPS vs Supports",
        "Funneling forge materials to hypercarry a single core hero",
      ],
      relatedCalculatorSlugs: ["gear-enhance"],
    }),
    createShellArticle({
      code: "7.2",
      slug: "mythic-gear-refinement",
      categorySlug: "gear",
      readingMinutes: 6,
      titleVi: "Trang Bị Thần Thoại & Thứ Tự Tẩy Dòng Thuộc Tính Tối Ưu",
      titleEn: "Mythic Gear & Optimal Sub-Stat Refinement",
      summaryVi: "Cách chế tạo trang bị Thần Thoại (Đỏ) và phương pháp tẩy dòng thuộc tính chuẩn xác.",
      summaryEn: "Crafting Mythic (Red) gear sets and optimal sub-stat rerolling strategies.",
      plannedOutlineVi: [
        "Điều kiện nâng cấp từ Trang bị Vàng lên Thần Thoại Đỏ",
        "Hệ thống dòng thuộc tính phụ: Tỷ lệ bạo kích, Kháng bạo, Hút máu",
        "Thứ tự tẩy dòng thuộc tính cho từng vai trò tướng",
        "Cách khóa dòng thuộc tính tốt để tiết kiệm đá tẩy",
      ],
      plannedOutlineEn: [
        "Upgrade requirements from Legendary Gold to Mythic Red",
        "Sub-stat rolls: Crit Rate, Crit Resist, Lifesteal, Damage Reduction",
        "Stat refinement priority for each role archetypes",
        "Locking optimal sub-stats to minimize refinement stone consumption",
      ],
      relatedCalculatorSlugs: ["gear-promotion"],
    }),
    createShellArticle({
      code: "7.3",
      slug: "exclusive-weapons",
      categorySlug: "gear",
      readingMinutes: 8,
      titleVi: "Thần Khí Độc Quyền (Exclusive Weapons) Cho Từng Tướng Chủ Lực",
      titleEn: "Exclusive Weapons Guide for Meta Heroes",
      summaryVi: "Chi tiết thần khí độc quyền, mốc thức tỉnh vũ khí (+10, +20, +30) và tướng nên ưu tiên.",
      summaryEn: "Exclusive hero weapons, weapon breakthrough tiers (+10, +20, +30), and upgrade priority.",
      plannedOutlineVi: [
        "Cách sở hữu Thần Khí Độc Quyền và mảnh chế tạo",
        "Hiệu ứng biến đổi kỹ năng tại các mốc +10, +20, +30",
        "Top 5 thần khí tạo đột biến sức mạnh lớn nhất trong game",
        "Phân bổ tài nguyên nâng thần khí cho F2P và Spender",
      ],
      plannedOutlineEn: [
        "Unlocking Exclusive Weapons and crafting material acquisition",
        "Skill-altering effects at breakthrough milestones (+10, +20, +30)",
        "Top 5 game-changing exclusive weapons ranking",
        "Resource allocation for F2P vs competitive spenders",
      ],
      relatedCalculatorSlugs: ["gear-enhance"],
    }),
    createShellArticle({
      code: "7.4",
      slug: "lord-gear-system",
      categorySlug: "gear",
      readingMinutes: 7,
      titleVi: "Trang Bị Lãnh Chúa (Lord Gear) & Đột Phá Lực Chiến Toàn Quân",
      titleEn: "Lord Gear System & Global Power Spikes",
      summaryVi: "Trang bị gắn trên Lãnh Chúa cung cấp chỉ số % toàn quân cho mọi đội hình trong căn cứ.",
      summaryEn: "Lord equipment mechanics providing massive army-wide percentage buffs to all lineups.",
      plannedOutlineVi: [
        "6 món Trang bị Lãnh Chúa: Kiếm, Khiên, Vương miện, Áo choàng...",
        "Chỉ số % công kích, % máu toàn quân và giảm sát thương",
        "Cách thu thập nguyên liệu rèn Lãnh Chúa từ sự kiện KvK",
        "Thứ tự chế tạo và đột phá phẩm chất Lãnh Chúa tối ưu",
      ],
      plannedOutlineEn: [
        "6 Lord Gear slots: Sword, Shield, Crown, Cloak...",
        "Army-wide % Attack, % HP, and Global Damage Reduction stats",
        "Acquiring Lord crafting materials through KvK and Point Races",
        "Optimal crafting and quality tier breakthrough roadmap",
      ],
      relatedCalculatorSlugs: ["lord-gear"],
    }),
  ],
};

// ============================================================================
// 8. CỔ NGỮ, THÁNH VẬT & THÚ CƯNG (POWER SYSTEMS)
// ============================================================================
export const SECTION_8_POWER_SYSTEMS: GuideCategory = {
  order: 8,
  displayOrder: 8,
  slug: "power-systems",
  zoneId: "zone_systems_economy",
  iconName: "Flame",
  title: {
    vi: "8. Cổ Ngữ, Thánh Vật & Thú Cưng",
    en: "8. Runes, Relics & Pets",
  },
  description: {
    vi: "Hệ thống Cổ Ngữ theo hệ phái, Thánh Vật Tượng Đài, Thú Cưng và Cự Thú Behemoth bổ trợ sức mạnh toàn quân.",
    en: "Faction-specific Runes, Relic Hall monument buffs, Pets catching strategies, and Behemoth army boosts.",
  },
  articles: [
    createShellArticle({
      code: "8.1",
      slug: "runes-system",
      categorySlug: "power-systems",
      readingMinutes: 6,
      titleVi: "Toàn Tập Hệ Thống Cổ Ngữ (Runes) Cho 3 Hệ Phái",
      titleEn: "Complete Runes Guide for 3 Factions",
      summaryVi: "Phân loại cổ ngữ theo phe, cách ghép bộ kích hoạt hiệu ứng set và thứ tự nâng sao cổ ngữ.",
      summaryEn: "Rune categorization, set-effect synergies, and star promotion priority across all 3 factions.",
      plannedOutlineVi: [
        "Cổ ngữ Phe Tự Nhiên, Liên Minh và Bộ Lạc",
        "Kích hoạt hiệu ứng bộ 2 món và 4 món",
        "Chỉ số chính và phụ: Cách chọn dòng phù hợp với tướng sát thương / phòng thủ",
        "Quy tắc tái chế cổ ngữ rác để đổi nguyên liệu nâng cấp",
      ],
      plannedOutlineEn: [
        "Faction Runes: Nature, League, and Horde affinities",
        "Activating 2-piece and 4-piece set synergies",
        "Primary and secondary stats: Matching runes with DPS vs Tank archetypes",
        "Recycling obsolete runes for upgrade essence",
      ],
      relatedCalculatorSlugs: ["runes"],
    }),
    createShellArticle({
      code: "8.2",
      slug: "relics-system",
      categorySlug: "power-systems",
      readingMinutes: 6,
      titleVi: "Thánh Vật (Relics): Chỉ Số Hào Quang & Kích Hoạt Tượng Đài",
      titleEn: "Relics System: Auras & Hall Activation",
      summaryVi: "Khám phá Nhà Thánh Vật, cách kích hoạt chỉ số vĩnh viễn và thứ tự dồn sao cho bảo vật cam/đỏ.",
      summaryEn: "Relic Hall monuments, permanent stat passives, and star-leveling priority for Orange/Red relics.",
      plannedOutlineVi: [
        "Nhà Thánh Vật (Relic Hall) và chỉ số cộng dồn toàn tài khoản",
        "Sự khác biệt giữa chỉ số cơ bản và chỉ số hào quang (Resonance)",
        "Top các Thánh vật tăng tốc độ hành quân và công kích bắt buộc phải có",
        "Chiến lược dùng mảnh vạn năng thánh vật hợp lý",
      ],
      plannedOutlineEn: [
        "Relic Hall and account-wide permanent passive stack mechanics",
        "Base stats vs Resonance Aura boosts",
        "Must-have Relics for march speed and army attack amplification",
        "Universal relic shard investment strategy",
      ],
      relatedCalculatorSlugs: ["relics"],
    }),
    createShellArticle({
      code: "8.3",
      slug: "pets-system",
      categorySlug: "power-systems",
      readingMinutes: 6,
      titleVi: "Hệ Thống Thú Cưng (Pets) & Chiến Thuật Bắt Thú Tối Ưu",
      titleEn: "Pets System & Optimal Catching Strategy",
      summaryVi: "Hướng dẫn bắt pet, kỹ năng nội tại của thú cưng và cách ghép cặp pet với tướng chủ lực.",
      summaryEn: "Pet catching guides, companion passives, and pairing pets with your frontline and backline champions.",
      plannedOutlineVi: [
        "Hệ thống Thú cưng mở khóa từ Season 1: Vị trí và thời điểm xuất hiện",
        "Kỹ thuật dùng bẫy bắt thú: Tối đa hóa tỷ lệ bắt Pet Cam/Đỏ",
        "Kỹ năng bị động của pet: Hồi máu, lá chắn, tăng sát thương bạo kích",
        "Bảng ghép cặp thú cưng tối ưu cho từng tướng trong meta",
      ],
      plannedOutlineEn: [
        "Pet system unlocked in Season 1: Spawn mechanics and locations",
        "Snaring techniques: Maximizing capture rates for Legendary/Mythic pets",
        "Pet passive skill affinities: Healing, barrier shields, crit amplification",
        "Optimal pet-hero pairing matrix for current meta lineups",
      ],
      relatedCalculatorSlugs: ["hero-stars"],
    }),
    createShellArticle({
      code: "8.4",
      slug: "behemoth-system",
      categorySlug: "power-systems",
      readingMinutes: 5,
      titleVi: "Cự Thú (Behemoth) & Sức Mạnh Hiệu Ứng Toàn Quân",
      titleEn: "Behemoth System & Army-Wide Buffs",
      summaryVi: "Nuôi dưỡng Cự Thú khổng lồ, kỹ năng triệu hồi ra trận và các chỉ số bổ trợ cho toàn quân đoàn.",
      summaryEn: "Behemoth nurturing, battlefield summon skills, and massive stat boosts for the entire legion.",
      plannedOutlineVi: [
        "Cơ chế ấp trứng và tiến hóa Cự Thú",
        "Kỹ năng xuất chiến của Behemoth: Quét sạch lính đối phương",
        "Nguyên liệu nuôi thú và cách thu thập hàng ngày",
        "So sánh các loại Behemoth: Rồng Lửa vs Thú Băng vs Cự Thú Đất",
      ],
      plannedOutlineEn: [
        "Egg incubation and Behemoth evolution breakthrough tiers",
        "Battlefield deployment skills: AoE troop devastation",
        "Feeding essences and daily farm routines",
        "Behemoth archetype comparison: Fire Drake vs Frost Beast vs Earth Titan",
      ],
      relatedCalculatorSlugs: ["relics"],
    }),
  ],
};

// ============================================================================
// 9. BẢNG SỐ LIỆU GỐC (META.BYTES SSoT TABLES)
// ============================================================================
export const SECTION_9_MASTER_TABLES: GuideCategory = {
  order: 9,
  displayOrder: 9,
  slug: "master-tables",
  zoneId: "zone_systems_economy",
  iconName: "Castle",
  title: {
    vi: "9. Bảng Số Liệu Gốc (Meta.bytes)",
    en: "9. Master Data Tables (Meta.bytes)",
  },
  description: {
    vi: "Bảng tra cứu số liệu chuẩn xác tuyệt đối (Ground-Truth): mảnh tướng nâng sao, sách kỹ năng, tài nguyên lâu đài C1–C40, mốc điểm event.",
    en: "Ground-truth master reference tables: hero shards, skill books, castle upgrade costs, and event milestones.",
  },
  articles: [
    createShellArticle({
      code: "9.1",
      slug: "hero-stars-and-awakening-table",
      categorySlug: "master-tables",
      readingMinutes: 4,
      titleVi: "Bảng Tra Cứu Mảnh Tướng Nâng Sao & Thức Tỉnh (SSoT Ground-Truth)",
      titleEn: "Hero Stars & Awakening Requirement Master Table",
      summaryVi: "Bảng số liệu chi tiết số lượng mảnh tướng cần thiết từ 1 sao đến 5 sao trắng và thức tỉnh đỏ.",
      summaryEn: "Accurate milestone data table for hero shards from 1-star to 5-white stars and red awakening.",
      plannedOutlineVi: [
        "Mốc 1★ đến 5★ Vàng (Tướng Cam / Tướng Đỏ)",
        "Mốc 1★ đến 5★ Trắng: 560 mảnh (1★) đến 1,000 mảnh (5★)",
        "Chi phí Thức Tỉnh: 9 Hồn Đá Đỏ + 345–385 mảnh riêng theo từng tướng",
        "Link công cụ tính toán chi tiết",
      ],
      plannedOutlineEn: [
        "1★ to 5★ Gold milestone shard costs (Orange & Red champions)",
        "1★ to 5★ White milestone shard costs: 560 shards (1★) to 1,000 shards (5★)",
        "Awakening requirement breakdown: 9 Soul Stones + 345–385 specific shards",
        "Direct link to dedicated calculator tool",
      ],
      relatedCalculatorSlugs: ["hero-stars", "hero-awakening"],
    }),
    createShellArticle({
      code: "9.2",
      slug: "skill-books-table",
      categorySlug: "master-tables",
      readingMinutes: 4,
      titleVi: "Bảng Tra Cứu Sách Kỹ Năng & Lượng Sách Cần Nâng Lv.1–Lv.15",
      titleEn: "Skill Books Requirement Table (Lv.1–Lv.15)",
      summaryVi: "Bảng số liệu chính xác lượng sách kỹ năng yêu cầu cho từng cấp độ chiêu thức.",
      summaryEn: "Accurate skill book requirement table for every ability level from 1 to 15.",
      plannedOutlineVi: [
        "Số sách cần nâng từ Lv.1 đến Lv.10 (Ngưỡng 8,000 sách)",
        "Số sách đột phá từ Lv.11 đến Lv.15 (Tổng 24,700 sách max chiêu)",
        "Thứ tự ưu tiên nâng kỹ năng 1/2/3/4 cho từng class tướng",
        "Bảng quy đổi sách kỹ năng từ các rương phần thưởng",
      ],
      plannedOutlineEn: [
        "Books required from Lv.1 to Lv.10 (8,000 books bracket)",
        "Breakthrough books from Lv.11 to Lv.15 (24,700 total books to max)",
        "Skill upgrade hierarchy (Skill 1/2/3/4) across class archetypes",
        "Skill book yield conversion table from mystery reward chests",
      ],
      relatedCalculatorSlugs: ["hero-traits"],
    }),
    createShellArticle({
      code: "9.3",
      slug: "castle-upgrade-requirements-table",
      categorySlug: "master-tables",
      readingMinutes: 5,
      titleVi: "Bảng Tra Cứu Tài Nguyên & Thời Gian Nâng Lâu Đài C1–C40",
      titleEn: "Castle C1–C40 Resource & Time Table",
      summaryVi: "Bảng tra cứu số lượng Gỗ, Đá, Quặng và thời gian xây dựng chuẩn từng cấp Lâu Đài.",
      summaryEn: "Reference table for Wood, Stone, Iron costs and raw construction timers for Castle C1–C40.",
      plannedOutlineVi: [
        "Bảng chi phí Gỗ, Đá, Quặng từ C1 đến C40",
        "Công trình điều kiện tiên quyết bắt buộc cho từng cấp lâu đài",
        "Thời gian xây dựng cơ bản và thời gian sau khi có buff 50% tốc độ",
        "Mốc lực chiến tăng thêm sau mỗi cấp lâu đài hoàn thành",
      ],
      plannedOutlineEn: [
        "Wood, Stone, Iron cost table for Castle C1 through C40",
        "Prerequisite building requirements for every castle level",
        "Base construction timers vs reduced timers with 50%+ buffs",
        "Power rating gain gained upon completion of each level",
      ],
      relatedCalculatorSlugs: ["construction"],
    }),
    createShellArticle({
      code: "9.4",
      slug: "gar-kvk-point-milestones-table",
      categorySlug: "master-tables",
      readingMinutes: 4,
      titleVi: "Bảng Mốc Điểm & Phần Thưởng Đua Vũ Trang (GAR) & KvK",
      titleEn: "GAR & KvK Point Milestones & Rewards Table",
      summaryVi: "Bảng tra cứu các mốc điểm rương cá nhân và rương bang hội trong các kỳ thi đấu lớn.",
      summaryEn: "Personal and alliance milestone point reward brackets for GAR and cross-server KvK wars.",
      plannedOutlineVi: [
        "Bảng điểm ăn 9 rương cá nhân Đua Vũ Trang Bang Hội (GAR)",
        "Hệ số quy đổi điểm cho từng hành động: Nâng nhà, Nghiên cứu, Rèn đồ, Quay tướng",
        "Bảng thưởng thứ hạng cá nhân Top 1–100",
        "Chiến lược đạt mốc rương 9 tốn ít tài nguyên nhất",
      ],
      plannedOutlineEn: [
        "Point brackets for 9 personal chests in Guild Arms Race (GAR)",
        "Action scoring multipliers: Building, Research, Forging, Summons",
        "Individual rank leaderboard rewards Top 1–100",
        "Most cost-effective strategy to hit Chest 9 with minimal resource burn",
      ],
      relatedCalculatorSlugs: ["gear-enhance"],
    }),
  ],
};

export const MASTER_SECTIONS: GuideCategory[] = [
  SECTION_1_GETTING_STARTED,
  SECTION_2_FACTIONS,
  SECTION_3_BUILDINGS,
  SECTION_4_TECHNOLOGY,
  SECTION_5_EVENTS,
  SECTION_6_SHOPS,
  SECTION_7_GEAR,
  SECTION_8_POWER_SYSTEMS,
  SECTION_9_MASTER_TABLES,
];

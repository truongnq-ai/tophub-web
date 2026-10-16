import type { GuideArticle } from "../../types";

export const ARTICLE_3_4_DOUBLE_DIP_SCHEDULE: GuideArticle = {
  code: "3.4",
  slug: "double-dip-schedule",
  categorySlug: "events",
  badge: "HOT",
  readingMinutes: 11,
  title: {
    vi: "Nghệ Thuật Double-Dip & Ma Trận Giao Thoa Tài Nguyên Toàn Diện (Master Double-Dip Matrix)",
    en: "The Art of Double-Dipping & The Master Resource Overlap Matrix",
  },
  summary: {
    vi: "Làm chủ cơ chế 'Một mũi tên trúng 2–3 đích (Double-Dip / Triple-Dip)': Bảng tra cứu toàn diện thời điểm xả đạt hiệu suất 300% / 200% / 100% / 0% cho mọi loại vật phẩm trong túi đồ.",
    en: "Master Double-Dipping and Triple-Dipping mechanics: The definitive lookup matrix mapping 300% / 200% / 100% / 0% efficiency windows for every inventory item.",
  },
  tldr: {
    coreRule: {
      vi: "Double-Dip (Nhân đôi lợi tức — 200%) và Triple-Dip (Nhân ba lợi tức — 300%) là kỹ thuật chờ cho 2 đến 3 sự kiện có cùng điều kiện tính điểm trùng khớp nhau trên cùng một khung giờ, sau đó mới bấm xả tài nguyên để 1 vật phẩm ăn đồng thời 2–3 bảng phần thưởng.",
      en: "Double-Dip (200% yield) and Triple-Dip (300% yield) are the art of waiting until 2 to 3 events with identical scoring conditions overlap within the exact same time window before spending resources—allowing a single item to claim rewards from 2–3 event boards simultaneously.",
    },
    immediateAction: {
      vi: "Phân tách rạch ròi túi đồ của bạn thành 2 Nhóm: Nhóm 'Đập Ngay Lập Tức' (Trang bị Tướng Hero Gear, Đá Cường hóa thường +10/+20/+30/+40, Mảnh Tướng Tím mở Trait 3 Kinh tế ở mốc 12 Sao = 2 Sao Trắng = 300 Mảnh) và Nhóm 'Găm Chờ Giao Thoa' (Mảnh Tướng Vàng, Hồn Đá Đỏ, Bản vẽ Chúa tể Lord Gear, Cổ Ngữ, Thánh Tích, Thức ăn Pet, Tăng tốc).",
      en: "Strictly divide your inventory into 2 Groups: Group A 'Spend Immediately' (Hero Gear forging, regular Enhancement Ore +10/+20/+30/+40, Epic Economy Hero Shards to unlock Trait 3 at 12 Stars = 2 White Stars = 300 Shards) and Group B 'Hoard for Overlap' (Universal Legendary/Mythic Shards, Soul Stones, Lord Gear materials, Runes, Relics, Pet Food, Speedups).",
    },
    strictTaboo: {
      vi: "Tuyệt đối KHÔNG xả tài nguyên ở khung hiệu suất 0% (Ngoài sự kiện) hoặc xả nhầm vật phẩm vào sự kiện không ghi nhận điểm của vật phẩm đó (như găm Đồ Chúa Tể Lord Gear sang Thứ Bảy Ngày 6 GAR/KvK hoặc xả Thánh Tích Relics vào Thứ Sáu Ngày 5 GAR tiêu chuẩn).",
      en: "NEVER spend hoarding resources during a 0% efficiency window (outside events) or dump items into an event day that does not score them (such as saving Lord Gear for Saturday Day 6 of GAR/KvK, or spending Relics on Friday Day 5 of standard GAR).",
    },
  },
  keyTakeaways: [
    {
      vi: "Hệ thống sự kiện Top Heroes vận hành theo 3 Lớp Chồng Xếp Nhau (Lớp 1: Sự kiện trục chính 7 ngày Guild Race / GAR / KvK; Lớp 2: Vệ tinh, Guild Rush 2 ngày & 8 sự kiện phụ xoay tua; Lớp 3: Sự kiện Giờ 4 tiếng 6 ca/ngày), tạo ra 4 bậc hiệu suất xả tài nguyên từ 0% (Forbidden) ➔ 100% (Single-Dip) ➔ 200% (Double-Dip) ➔ 300% (Triple-Dip).",
      en: "Top Heroes events operate across 3 Overlapping Layers (Layer 1: 7-Day Macro Event Guild Race / GAR / KvK; Layer 2: Satellite Events, Fixed 2-Day Guild Rush & 8 Rotating Sub-Events; Layer 3: 4-Hour Hourly Arms Race 6 shifts/day), creating 4 resource efficiency tiers from 0% (Forbidden) ➔ 100% (Single-Dip) ➔ 200% (Double-Dip) ➔ 300% (Triple-Dip).",
    },
    {
      vi: "Phân biệt sống còn giữa Trang bị Tướng (Hero Gear trong Lò rèn + Đá Cường hóa thường +10/+20/+30/+40 = hoàn toàn KHÔNG tính điểm GAR/KvK, phải đúc và đập ngay cho Đội 1) và Trang bị Chúa Tể (Lord Gear trên Avatar = găm kỹ chờ Thứ Sáu–Chủ Nhật Tuần A hoặc Thứ Tư–Thứ Năm Tuần B, tuyệt đối CẤM chờ Thứ Bảy Ngày 6).",
      en: "Master the critical boundary between Hero Gear (Blacksmith forging + regular Enhancement Ore +10/+20/+30/+40 = 0 points in GAR/KvK, forge and upgrade immediately for Queue 1) and Lord Gear (Avatar gear = hoard strictly for Fri–Sun Week A or Wed–Thu Week B, NEVER wait until Saturday Day 6).",
    },
    {
      vi: "Ngoại lệ Kinh tế Nhóm A2: Mảnh Tướng Tím Kinh tế (Knight, Brawler, Ranger) khi CHƯA đạt mốc 12 Sao (2 Sao Trắng = 300 Mảnh) bắt buộc phải nâng ngay lập tức để mở khóa Trait 3 (+25% đến +30% tốc độ Nghiên cứu / Luyện lính).",
      en: "Group A2 Economic Exception: Epic Economy Hero Shards (Knight, Brawler, Ranger) below 12 Stars (2 White Stars = 300 Shards) must be upgraded immediately to unlock Trait 3 (+25% to +30% Research / Troop Training speed).",
    },
    {
      vi: "Thực thi cú nổ Triple-Dip 300% trong 15 phút (17:15–17:30 Thứ Năm Tuần B) với 365 Mảnh Vàng Vạn Năng, 9 Hồn Đá Đỏ (1 + 2 + 2 + 4 = 9), 6,000 Sách Kỹ Năng, 240 Vé Chiêu Mộ và Lord Gear giúp hoàn lại 9,800 Kim Cương, 42 Mảnh Vàng, 1,200 Sách Kỹ Năng và 65h Tăng tốc (tương đương gói nạp ~$49.99 miễn phí).",
      en: "Executing a 15-minute 300% Triple-Dip burst (Thursday 17:15–17:30 Week B) with 365 Universal Shards, 9 Soul Stones (1 + 2 + 2 + 4 = 9), 6,000 Skill Books, 240 Recruit Tokens, and Lord Gear yields a massive rebate of 9,800 Diamonds, 42 Universal Shards, 1,200 Skill Books, and 65h Speedups (worth ~$49.99 for free).",
    },
  ],
  keywords: [
    "Double-Dip",
    "Triple-Dip",
    "Single-Dip",
    "300%",
    "200%",
    "100%",
    "0%",
    "Master Double-Dip Matrix",
    "Hero Gear",
    "Lord Gear",
    "Soul Stone",
    "120,000",
    "40,000",
    "6,000",
    "12,000–18,000",
    "Glory Medals",
    "Decor Tokens",
    "Guild Rush",
    "Hourly Arms Race",
  ],
  sourceFiles: [
    "docs/06-game-guides/07-standardized-web-guides/group-3-events-double-dip/3.4-double-dip-schedule.md",
    "docs/06-game-guides/01-core-strategic-topics/topic-6-biweekly-event-schedule-week-a-b.md",
    "docs/06-game-guides/05-events-and-community-guides/event-strategy-hub-guide.md",
    "docs/06-game-guides/00-master-dashboard/master-dashboard-7-topics.md",
  ],
  freeSections: [
    {
      id: "sec-1-three-event-layers-and-efficiency",
      title: {
        vi: "1. Giải thích Cơ chế Cốt lõi: 3 Lớp Sự Kiện Chồng Xếp & 4 Cấp Độ Hiệu Suất (0% ➔ 100% ➔ 200% ➔ 300%)",
        en: "1. Core Mechanics: The 3 Overlapping Event Layers & 4 Resource Efficiency Tiers (0% to 300%)",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "Trong Top Heroes, hệ thống sự kiện không bao giờ chạy đơn lẻ mà được thiết kế theo 3 Lớp Chồng Xếp Nhau (3 Overlapping Event Layers) — bạn luôn có thể kiểm tra trực tiếp tại Event ➔ Lịch Event (cột 09:00 Thứ Hai). Hiểu rõ cách 3 lớp này giao thoa là vũ khí tối thượng giúp người chơi F2P và Low-Spender biến 1 đơn vị tài nguyên thành 2–3 lần phần thưởng hoàn lại.",
            en: "In Top Heroes, the event ecosystem never runs in isolation; it is engineered around 3 Overlapping Event Layers—which you should always verify directly via Event ➔ Event Calendar (Monday 09:00 column). Mastering how these 3 layers intersect is the ultimate F2P and Low-Spender weapon to turn 1 unit of resource into 2–3x rebate rewards.",
          },
        },
      ],
      subSections: [
        {
          id: "sub-1-1-three-overlapping-layers",
          title: {
            vi: "1.1. Giải Phẫu 3 Lớp Sự Kiện Chồng Xếp Nhau (3 Overlapping Event Layers)",
            en: "1.1. Anatomy of the 3 Overlapping Event Layers",
          },
          badge: {
            vi: "3 LỚP SỰ KIỆN",
            en: "3 EVENT LAYERS",
          },
          blocks: [
            {
              type: "list",
              ordered: true,
              items: [
                {
                  vi: "Lớp 1 — Sự Kiện Trục Chính 7 Ngày (7-Day Macro Event): Ở Chế độ Tuần A (Thi Đấu Hội / Guild Race — chạy nối tiếp mỗi tuần ở đầu Pre-Season hoặc luân phiên ở Tuần A), đây là bảng nhiệm vụ 9 ô Thi Đấu Hội (Guild Race) kéo dài từ 09:00 Thứ Hai đến 09:00 Thứ Hai tuần kế tiếp. Ở Chế độ Tuần B (GAR / KvK / Top Lord), đây là Chạy Đua Vũ Trang (Guild Arms Race — GAR), Chiến Tranh Vương Quốc (Kingdom Duel — KvK) hoặc Lãnh Chúa Tối Cao (Top Lord) với 6 Ngày Chủ Đề cố định.",
                  en: "Layer 1 — 7-Day Macro Event: In Week A Mode (Guild Race—running back-to-back weekly in early Pre-Season or bi-weekly in mature servers), this is the 9-slot Guild Race task board running from Monday 09:00 to the following Monday 09:00. In Week B Mode (GAR / KvK / Top Lord), this is Guild Arms Race (GAR), Kingdom Duel (KvK), or Top Lord featuring 6 Fixed Daily Themes.",
                },
                {
                  vi: "Lớp 2 — Sự Kiện Vệ Tinh (Event Giá Trị / Thường), Guild Rush 2 Ngày & Chuỗi Đua Ngắn Hạn 2–3 Ngày (Sub-Events): (a) Sự kiện Vệ tinh & Event Giá Trị xoay vòng hàng tuần như Đế Quốc Hắc Ám Xâm Nhập ⇄ Khiêu Chiến Của Đội Quân Hắc Ám (mục Thường) và Bắt Bướm ⇄ Tập Kích Cự Ma + Thẻ Thông Hành Tập Kích Cự Ma (mục Event Giá Trị); (b) Lịch Cố định Guild Rush 2 Ngày (Thứ Hai ➔ Thứ Bảy): Tuần A (Guild Race) gồm Thứ Hai–Thứ Ba Nâng cấp Thú Cưng (Pets Development) | Thứ Tư–Thứ Năm Thánh Tích (Relic Hall & Relics) | Thứ Sáu–Thứ Bảy Quân Trang & Đồ Chúa Tể (Troop Skin & Lord Gear — trùng khớp 100% với Nhiệm vụ Vàng Độc quyền Ngày 5–7 của Guild Race!); Tuần B (KvK / GAR) gồm Thứ Hai–Thứ Ba Xây dựng & Nghiên cứu (Building & Research) | Thứ Tư–Thứ Năm Phát triển Tướng (Hero Development) | Thứ Sáu–Thứ Bảy Nâng cấp Trang trí (Decor Upgrading); (c) Chuỗi 8 Sự kiện Phụ xoay tua 2–3 ngày: Ultimate Power, Lord's Set, Hero Development, Rush Top, Decorations, Soul Stone, Pet Power, Relic Power.",
                  en: "Layer 2 — Satellite Events, Fixed 2-Day Guild Rush & 8 Rotating 2–3 Day Sub-Events: (a) Weekly rotating Satellite & Value Events such as Dark Empire Invasion ⇄ Dark Legion Challenge (Regular tab) and Butterfly Catching ⇄ Giant/Troll Raid + Giant Raid Pass (Value Event tab); (b) Fixed 2-Day Guild Rush Schedule (Monday ➔ Saturday): Week A (Guild Race) features Mon–Tue Pets Development | Wed–Thu Relic Hall & Relics | Fri–Sat Troop Skin & Lord Gear (matching 100% with Days 5–7 Exclusive Gold Tasks in Guild Race!); Week B (KvK / GAR) features Mon–Tue Building & Research | Wed–Thu Hero Development | Fri–Sat Decor Upgrading; (c) 8 Rotating 2–3 Day Sub-Events: Ultimate Power, Lord's Set, Hero Development, Rush Top, Decorations, Soul Stone, Pet Power, Relic Power.",
                },
                {
                  vi: "Lớp 3 — Sự Kiện Giờ Xoay Vòng 4 Tiếng (4-Hour Hourly Arms Race): Chạy liên tục 6 ca/ngày (mỗi ca 4 tiếng) với các chủ đề: Xây Lãnh Thổ (Territory Construction), Nghiên Cứu Công Nghệ (Tech Research), Mở Rộng Quân Đội (Army Expansion), Bồi Dưỡng Anh Hùng (Hero Development), Loại Trừ Mối Nguy (Threat Elimination).",
                  en: "Layer 3 — 4-Hour Hourly Arms Race: Runs continuously across 6 shifts per day (4 hours per shift) rotating through 5 themes: Territory Construction, Tech Research, Army Expansion, Hero Development, and Threat Elimination.",
                },
              ],
            },
          ],
        },
        {
          id: "sub-1-2-four-efficiency-tiers",
          title: {
            vi: "1.2. Định Nghĩa 4 Cấp Độ Hiệu Suất Xả Tài Nguyên (0% ➔ 100% ➔ 200% ➔ 300%)",
            en: "1.2. The 4 Resource Spending Efficiency Tiers (0% ➔ 100% ➔ 200% ➔ 300%)",
          },
          badge: {
            vi: "4 CẤP HIỆU SUẤT",
            en: "4 EFFICIENCY TIERS",
          },
          blocks: [
            {
              type: "list",
              items: [
                {
                  vi: "⛔ Hiệu suất 0% (0% Forbidden — Đốt Tài Nguyên, Cấm Xả Tuyệt Đối): Bạn bấm dùng vật phẩm vào ngày thường không có sự kiện nào liên quan (Ví dụ: Đập 100 Mảnh Tướng Vàng vào chiều Thứ Ba khi không có nhiệm vụ hay sự kiện Tướng, hoặc đập Đồ Chúa Tể Lord Gear vào Thứ Bảy Tuần B khi không tính điểm). Bạn nhận được 0 Kim Cương, 0 rương thưởng sự kiện.",
                  en: "⛔ 0% Efficiency (0% Forbidden — Resource Burn, Strictly Prohibited): Spending items on a regular day with no matching event (e.g., fusing 100 Legendary Hero Shards on Tuesday afternoon with no hero task or event active, or upgrading Lord Gear on Saturday Week B when it grants zero points). You receive 0 Diamonds and 0 event chests.",
                },
                {
                  vi: "🟡 Hiệu suất 100% (100% Single-Dip — Đạt Chuẩn Cơ Bản): Bạn xả vật phẩm khi chỉ có 1 sự kiện duy nhất đang tính điểm (Ví dụ: Xả Thức ăn Pet khi chỉ có Guild Rush: Nâng cấp Thú Cưng ở Thứ Hai–Thứ Ba Tuần A). Khuyên dùng: Chỉ xả vừa đủ lấy các rương mốc cá nhân cơ bản, tuyệt đối không xả lố.",
                  en: "🟡 100% Efficiency (100% Single-Dip — Baseline Standard): Spending items when only 1 standalone event is scoring them (e.g., feeding Pets when only Guild Rush: Pets Development is active on Mon–Tue Week A). Recommended rule: Spend just enough to claim basic personal milestone chests, never overspend.",
                },
                {
                  vi: "🟢 Hiệu suất 200% (200% Double-Dip — Một Mũi Tên Trúng 2 Đích): Bạn canh thời điểm Lớp 1 + Lớp 2 (hoặc Lớp 1 + Lớp 3) trùng chủ đề với nhau (Ví dụ: Thứ Sáu–Thứ Bảy Tuần A vừa nhận Nhiệm vụ Độc quyền Vàng Lord Gear trên bảng Guild Race, vừa ăn điểm Guild Rush: Quân Trang & Đồ Chúa Tể). Cùng 1 lần nâng cấp ăn điểm ở cả 2 bảng!",
                  en: "🟢 200% Efficiency (200% Double-Dip — Two Birds with One Stone): Timing your spend when Layer 1 + Layer 2 (or Layer 1 + Layer 3) share the exact same theme (e.g., Fri–Sat Week A when you accept an Exclusive Gold Lord Gear Task on the Guild Race board while simultaneously scoring in Guild Rush: Troop Skin & Lord Gear). A single upgrade scores across both boards!",
                },
                {
                  vi: "🔥 Hiệu suất 300% (300% Triple-Dip — Điểm Nổ Tối Thượng): Bạn canh đúng Khung Giờ Vàng 4 Tiếng (Lớp 3) nằm trong Ngày Chủ Đề Tương Ứng của Tuần B (Lớp 1) lại trùng đúng ngày diễn ra Guild Rush / Sự Kiện Phụ (Lớp 2) (Ví dụ: Khung 17:00–21:00 Thứ Năm Tuần B khi cả GAR/KvK Day 4, Hourly Hero Dev và Guild Rush: Phát triển Tướng / Soul Stone cùng mở). Một viên Hồn Đá Đỏ (120,000đ) hoặc 1 Mảnh Tướng Vàng xả ra lúc này cộng điểm đồng thời vào 3 sự kiện khác nhau!",
                  en: "🔥 300% Efficiency (300% Triple-Dip — Ultimate Burst Window): Timing your spend inside the 4-Hour Golden Window (Layer 3) on the matching Week B Theme Day (Layer 1) while a matching Guild Rush / Sub-Event (Layer 2) is also active (e.g., Thursday 17:00–21:00 Week B when GAR/KvK Day 4, Hourly Hero Dev, and Guild Rush: Hero Development / Soul Stone all align). Every Soul Stone (120,000 pts) or Universal Shard spent scores simultaneously across 3 separate events!",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "sec-2-spend-now-vs-hoard-boundary",
      title: {
        vi: "2. Chiến thuật Tối ưu cho F2P & Low-Spender: Bảng Phân Định Ranh Giới 'Đập Ngay' vs 'Ngâm Chờ'",
        en: "2. F2P & Low-Spender Strategy: The Boundary Between 'Spend Immediately' (Group A) and 'Hoard for Overlap' (Group B)",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "Sai lầm lớn nhất của người mới là cái gì cần giữ thì lại đem xả sớm, còn cái gì không bao giờ tính điểm sự kiện thì lại nhịn không dám nâng làm kẹt tiến độ Đội 1 của cả 3 Phe phái (Liên Minh / League, Bộ Lạc / Horde, Thiên Nhiên / Nature). Hãy dùng bộ nhận diện trực quan và bảng phân định ranh giới dưới đây để dọn dẹp túi đồ ngay hôm nay.",
            en: "The biggest mistake beginners make across all 3 Factions (League, Horde, Nature) is prematurely spending items that should be hoarded, while hoarding items that NEVER score event points—throttling Queue 1 progression. Use the visual spotlight cards and boundary table below to organize your inventory today.",
          },
        },
        {
          type: "media_spotlight",
          mediaCode: "MED-3.4-01",
          tier: "tier2_annotated_ui",
          title: {
            vi: "Bộ Nhận Diện 12 Nhóm Vật Phẩm Cốt Lõi Trong Túi Đồ (Inventory Core Asset Map)",
            en: "12 Core Inventory Item Categories Visual Map (Spend Now vs. Hoard for Overlap)",
          },
          description: {
            vi: "Bộ icon phân loại các nhóm vật phẩm cốt lõi trong túi đồ (Universal Shard, Soul Stone, Skill Book, Lord Gear Blueprint, Rune Dust, Pet Food, Relic Scroll, Dragon Essence) theo quy tắc Đập Ngay (Nhóm A) và Găm Chờ Giao Thoa (Nhóm B).",
            en: "Visual classification of core inventory assets (Universal Shard, Soul Stone, Skill Book, Lord Gear Blueprint, Rune Dust, Pet Food, Relic Scroll, Dragon Essence) mapped to Group A (Spend Immediately) vs. Group B (Hoard for 200%–300% Overlap).",
          },
          imageSrc: "/images/guides/events/double-dip-items.webp",
          annotations: [
            {
              kind: "do",
              label: {
                vi: "⚡ Nhóm A1 — Đồ Tướng (Hero Gear & Enhancement Ore +10/+20/+30/+40)",
                en: "⚡ Group A1 — Hero Gear Forging & Enhancement Ore (+10/+20/+30/+40)",
              },
              detail: {
                vi: "Đúc trang bị Vàng đúng Dấu Hệ (+30%) và đập đá cường hóa thường trong Lò rèn hoàn toàn KHÔNG tính điểm GAR/KvK hay Guild Race ➔ Đập ngay lập tức cho Đội 1!",
                en: "Forging faction-matching Legendary Hero Gear (+30% bonus) and spending regular Enhancement Ore in the Blacksmith grant 0 points in GAR/KvK or Guild Race ➔ Upgrade Queue 1 immediately!",
              },
            },
            {
              kind: "do",
              label: {
                vi: "⚡ Nhóm A2 — Mảnh Tướng Tím Kinh Tế Dưới 12 Sao (2 Sao Trắng = 300 Mảnh)",
                en: "⚡ Group A2 — Epic Economy Heroes Below 12 Stars (2 White Stars = 300 Shards)",
              },
              detail: {
                vi: "Knight, Brawler và Ranger khi chưa đạt 12 Sao (2 Sao Trắng = 300 Mảnh) phải nâng ngay để mở khóa Trait 3 (+25% đến +30% tốc độ Nghiên cứu / Luyện lính).",
                en: "Knight, Brawler, and Ranger below 12 Stars (2 White Stars = 300 Shards) must be upgraded immediately to unlock Trait 3 (+25% to +30% Research / Troop Training speed).",
              },
            },
            {
              kind: "dont",
              label: {
                vi: "🔒 Nhóm B — Mảnh Vàng, Hồn Đá Đỏ (120,000đ), Sách Kỹ Năng, Vé Chiêu Mộ, Mảnh UW & Lõi Sắt (6,000đ)",
                en: "🔒 Group B — Universal Shards, Soul Stones (120,000 pts), Skill Books, Recruit Tokens, UW Shards & Iron Cores (6,000 pts)",
              },
              detail: {
                vi: "Tuyệt đối cấm xả tự do ngày thường! Khóa chặt 100% chờ khung Giờ Vàng 17:00–21:00 Thứ Năm Tuần B để ăn trọn cú nổ Triple-Dip 300%.",
                en: "Strictly forbidden to spend on regular days! Lock 100% in your bag until Thursday 17:00–21:00 Week B to trigger the 300% Triple-Dip burst.",
              },
            },
            {
              kind: "info",
              label: {
                vi: "🔒 Nhóm B — Đồ Chúa Tể (Lord Gear), Cổ Ngữ (Runes), Thánh Tích (Relics), Pet, Quân Trang & Trang Trí",
                en: "🔒 Group B — Lord Gear, Runes, Relics, Pets, Glory Medals & Decor Tokens",
              },
              detail: {
                vi: "Mỗi nhóm có khung ngày cộng điểm chính và phụ riêng biệt (VD: Lord Gear xả Ngày 5–7 Tuần A hoặc Ngày 3–4 Tuần B; Glory Medals & Decor Tokens xả Thứ Bảy Ngày 6 Tuần B).",
                en: "Each category has strict primary and secondary scoring days (e.g., Lord Gear on Days 5–7 Week A or Days 3–4 Week B; Glory Medals & Decor Tokens on Saturday Day 6 Week B).",
              },
            },
          ],
        },
        {
          type: "media_spotlight",
          mediaCode: "MED-3.4-02",
          tier: "tier2_annotated_ui",
          title: {
            vi: "Phân Vùng Túi Đồ Thực Chiến: Khung Xanh 'Đập Ngay' vs Khung Đỏ 'Khóa Chờ Giao Thoa'",
            en: "Annotated Inventory Bag Split: Green Zone 'Spend Immediately' vs. Red Zone 'Lock for Overlap'",
          },
          description: {
            vi: "Ảnh chụp màn hình Túi Đồ (Inventory Bag) chia làm 2 nửa rõ rệt: Khung Xanh Lá (⚡ Đập Ngay) cho Quặng Đồ Tướng và Khung Đỏ (🔒 Khóa Chờ Thứ Năm/Thứ Sáu Tuần B) cho Mảnh Vàng, Hồn Đá Đỏ, Rương Cổ Ngữ.",
            en: "Annotated Inventory Bag screenshot divided into two clear zones: Green Frame (⚡ Spend Immediately) for Hero Gear Ore and Red Frame (🔒 Lock for Thu/Fri Week B) for Universal Shards, Soul Stones, and Rune Chests.",
          },
          imageSrc: "/images/guides/events/inventory-bag-split-zones.webp",
          annotations: [
            {
              kind: "do",
              label: {
                vi: "Khung Xanh Lá (⚡ Đập Ngay Lập Tức)",
                en: "Green Frame (⚡ Spend Immediately)",
              },
              detail: {
                vi: "Thỏi Vàng & Quặng Đúc Đồ Tướng (Hero Gear Forging), Đá Cường Hóa Thường (+10/+20/+30/+40) và Mảnh Tướng Tím Kinh tế chưa chạm mốc 12 Sao (2 Sao Trắng = 300 Mảnh).",
                en: "Hero Gear Forging Ingots/Ores, regular Enhancement Ore (+10/+20/+30/+40), and Epic Economy Hero Shards below 12 Stars (2 White Stars = 300 Shards).",
              },
            },
            {
              kind: "dont",
              label: {
                vi: "Khung Đỏ (🔒 Khóa Chặt Chờ Điểm Nổ 200%–300%)",
                en: "Red Frame (🔒 Strictly Lock for 200%–300% Burst Windows)",
              },
              detail: {
                vi: "13 nhóm vật phẩm tính điểm sự kiện (Mảnh Vàng, Hồn Đá Đỏ 120,000đ, Sách Kỹ Năng, Vé Chiêu Mộ, Lord Gear, Runes, Relics, Pets, Speedups, Glory Medals, Decor Tokens) giúp hoàn vốn 30%–50%.",
                en: "All 13 event-scoring item categories (Universal Shards, 120,000-pt Soul Stones, Skill Books, Recruit Tokens, Lord Gear, Runes, Relics, Pets, Speedups, Glory Medals, Decor Tokens) yielding a 30%–50% rebate.",
              },
            },
          ],
        },
        {
          type: "table",
          caption: {
            vi: "Bảng Phân Định Ranh Giới: Vật Phẩm Nào KHÔNG Tính Điểm (Nhóm A1/A2) vs CÓ Tính Điểm Sự Kiện (Nhóm B)?",
            en: "Boundary Classification Table: Non-Scoring / Immediate ROI Items (Groups A1/A2) vs. Event-Scoring Hoard Items (Group B)",
          },
          headers: [
            {
              vi: "Nhóm Phân Loại",
              en: "Classification Group",
            },
            {
              vi: "Danh Sách Vật Phẩm Cụ Thể",
              en: "Specific Inventory Items",
            },
            {
              vi: "Quy Tắc Hành Động Chuẩn Cho Cả 3 Phe Phái",
              en: "Standard Action Rule (All 3 Factions)",
            },
            {
              vi: "Lý Do Cơ Chế Trong Game",
              en: "Underlying Game Mechanics",
            },
          ],
          rows: [
            [
              {
                vi: "⚡ NHÓM A1: ĐẬP NGAY LẬP TỨC (Không cần chờ sự kiện)",
                en: "⚡ GROUP A1: SPEND IMMEDIATELY (No event wait required)",
              },
              {
                vi: "1. Thỏi Vàng & Quặng Đúc Đồ Tướng (Hero Gear Forging) | 2. Đá Cường Hóa Đồ Tướng Thường (Enhancement Ore +10/+20/+30/+40)",
                en: "1. Gold Ingots & Hero Gear Forging Ores (Hero Gear Forging) | 2. Regular Hero Gear Enhancement Ore (+10/+20/+30/+40)",
              },
              {
                vi: "Đúc và đập ngay cho Đội 1 ngay khi đủ nguyên liệu để chạm mốc Cộng hưởng +10 / +20 / +30 / +40!",
                en: "Forge and upgrade immediately for Queue 1 as soon as you have enough materials to hit the +10 / +20 / +30 / +40 Gear Resonance milestones!",
              },
              {
                vi: "Đúc trang bị Tướng trong Lò rèn (Blacksmith) và đập đá cường hóa thường hoàn toàn KHÔNG tính điểm trong GAR, KvK hay Guild Race. Nhịn nâng chỉ làm Đội 1 yếu đi trong Đấu trường và PvE!",
                en: "Forging Hero Gear in the Blacksmith and spending regular Enhancement Ore grant ZERO points in GAR, KvK, or Guild Race. Holding them back only weakens Queue 1 in Arena and PvE!",
              },
            ],
            [
              {
                vi: "⚡ NHÓM A2: ĐẬP NGAY LẬP TỨC (Ngoại lệ Kinh tế)",
                en: "⚡ GROUP A2: SPEND IMMEDIATELY (Economic Exception)",
              },
              {
                vi: "3. Mảnh Tướng Tím Kinh Tế (Knight, Brawler, Ranger) khi CHƯA đạt 12 Sao (2 Sao Trắng = 300 Mảnh)",
                en: "3. Epic Economy Hero Shards (Knight, Brawler, Ranger) while BELOW 12 Stars (2 White Stars = 300 Shards)",
              },
              {
                vi: "Nâng ngay lập tức lên mốc 12 Sao (2 Sao Trắng = 300 Mảnh) để mở khóa ô Trait 3 (+25% đến +30% Tốc độ Nghiên cứu / Luyện lính)!",
                en: "Upgrade immediately to 12 Stars (2 White Stars = 300 Shards) to unlock Trait 3 (+25% to +30% Research / Troop Training speed)!",
              },
              {
                vi: "Lợi tức giảm 25–30% thời gian nghiên cứu/huấn luyện vĩnh viễn cho toàn tài khoản có giá trị lớn gấp trăm lần vài điểm sự kiện lẻ tẻ của mảnh Tím. Khi đã qua mốc 12 Sao thì mới bắt đầu tích mảnh Tím chờ Thứ Năm Tuần B.",
                en: "Permanent 25–30% research and troop training time reduction across your entire account is worth 100x more than minor event points from Epic shards. Only hoard Epic shards for Thursday Week B after reaching 12 Stars.",
              },
            ],
            [
              {
                vi: "🔒 NHÓM B: GĂM CHỜ DOUBLE-DIP (Cấm xả tự do — 13 Nhóm Vật Phẩm)",
                en: "🔒 GROUP B: HOARD FOR DOUBLE-DIP (Strictly Lock — 13 Item Categories)",
              },
              {
                vi: "1. Mảnh Tướng Vàng/Đỏ, Hồn Đá Đỏ (120,000đ), Sách Kỹ Năng, Vé Chiêu Mộ, Mảnh UW (6,000đ), Lõi Sắt (6,000đ) | 2. Đồ Chúa Tể (Lord Gear: Đá Xanh, Dây Gai, Bản Vẽ, Máu Rồng), Quân Trang (Glory Medals), Trang Trí (Decor Tokens) | 3. Cổ Ngữ (Runes), Thánh Tích (Relics), Thú Cưng (Pets), Anh Linh (Heroic Spirits), Cự Thú (Behemoth) | 4. Mọi loại Tăng Tốc, Đá Rồng (Dragon Essence), Thể Lực (Stamina)",
                en: "1. Legendary/Mythic Shards, Soul Stones (120,000 pts), Skill Books, Recruit Tokens, UW Shards (6,000 pts), Meteorite Iron Cores (6,000 pts) | 2. Lord Gear (Refined Metal, Magic Thread, Orichalcum, Dragon Blood), Troop Skins (Glory Medals), Castle Decor (Decor Tokens) | 3. Runes, Relics, Pets, Heroic Spirits, Behemoth | 4. All Speedups, Dragon Essence, Stamina",
              },
              {
                vi: "Khóa chặt 100% trong túi đồ! Chỉ mở khóa xả theo đúng lịch giao thoa 200% – 300% tại Bảng Ma Trận 13 Nhóm Vật Phẩm ở Phần II.",
                en: "Lock 100% in your inventory! Only unlock and spend during the exact 200%–300% overlap windows mapped in the 13-Item Master Matrix in Part II.",
              },
              {
                vi: "Đây là nguồn cung cấp 95% điểm số của toàn bộ các sự kiện lớn nhỏ trong game. Xả đúng điểm giao thoa giúp hoàn vốn từ 30% đến 50% lượng tài nguyên đã tiêu!",
                en: "These items generate 95% of all points across major and minor events. Spending them exclusively during overlap windows rebates 30% to 50% of the resources consumed!",
              },
            ],
          ],
        },
      ],
    },
    {
      id: "sec-3-double-dip-pitfalls",
      title: {
        vi: "3. Những Cạm bẫy Phổ biến & Cách Phòng tránh (Common Pitfalls)",
        en: "3. Common Double-Dip Pitfalls & Inventory Discipline",
      },
      blocks: [
        {
          type: "table",
          caption: {
            vi: "3 Cạm Bẫy Phổ Biến Làm Mất Double-Dip & Thọt Lực Chiến Đội 1",
            en: "3 Common Pitfalls That Ruin Double-Dipping & Stall Queue 1 Combat Power",
          },
          headers: [
            {
              vi: "❌ Sai lầm Phổ biến (Mất Double-Dip & Thọt Lực Chiến)",
              en: "❌ Common Pitfall (Lost Double-Dip & Power Stall)",
            },
            {
              vi: "✅ Giải pháp Tối ưu (Chuẩn Điều Phối Gia Sản)",
              en: "✅ Optimal Solution (Master Inventory Discipline)",
            },
          ],
          rows: [
            [
              {
                vi: "Nhầm lẫn giữa 'Trang bị Tướng (Hero Gear)' và 'Trang bị Chúa Tể (Lord Gear)', hoặc chờ đến Thứ Bảy (Ngày 6) Tuần B mới nâng Đồ Chúa Tể.",
                en: "Confusing 'Hero Gear' with 'Lord Gear', or waiting until Saturday (Day 6) of Week B to upgrade Lord Gear.",
              },
              {
                vi: "Ghi nhớ câu thần chú: 'Đồ Tướng (Hero Gear trong Lò rèn) = Đập ngay không chờ; Đồ Chúa Tể (Lord Gear trên Avatar) = Găm kỹ chờ Thứ Sáu–CN Tuần A hoặc Thứ Tư–Thứ Năm Tuần B (tuyệt đối CẤM chờ Thứ Bảy Ngày 6 vì Ngày 6 GAR/KvK KHÔNG tính điểm Lord Gear!).'",
                en: "Memorize the golden mantra: 'Hero Gear (in the Blacksmith) = Upgrade immediately without waiting; Lord Gear (on your Avatar) = Hoard strictly for Fri–Sun Week A or Wed–Thu Week B (NEVER wait for Saturday Day 6 because Day 6 GAR/KvK grants ZERO points for Lord Gear!).'",
              },
            ],
            [
              {
                vi: "Xả sạch 100% kho dự trữ trong một sự kiện phụ 3 ngày (Single-Dip 100%) ở Tuần A, dẫn đến khi bước sang Tuần B (KvK / GAR) không còn gì để mở rương mốc nhân đôi.",
                en: "Dumping 100% of your stockpile into a standalone 3-day sub-event (100% Single-Dip) during Week A, leaving your inventory empty when Week B (KvK / GAR) double-reward chests arrive.",
              },
              {
                vi: "Khi một sự kiện phụ rơi vào ngày không giao thoa, chỉ xả vừa khít số điểm để lấy rương mốc cá nhân (Milestone Chests) rồi dừng lại ngay; giữ ít nhất 70% kho dự trữ cho điểm nổ 200%–300% ở Tuần B.",
                en: "When a sub-event falls on a non-overlapping day, spend only the exact minimum needed to claim basic personal Milestone Chests and stop immediately; preserve at least 70% of your stockpile for the 200%–300% Week B burst windows.",
              },
            ],
            [
              {
                vi: "Cắn bình Tăng tốc Vạn Năng (Universal Speedups) cho Xây dựng hoặc Luyện lính trong khi nhánh Nghiên cứu Khoa học đang thiếu Tăng tốc trầm trọng.",
                en: "Burning Universal Speedups on Construction or Troop Training while your Tech Research tree is severely starved of speedups.",
              },
              {
                vi: "Giữ 90% Tăng tốc Vạn Năng dành riêng cho Nghiên cứu Khoa học (Tech Research) vào Thứ Ba Tuần B (vì thời gian nghiên cứu công nghệ cuối game dài gấp nhiều lần thời gian xây nhà).",
                en: "Reserve 90% of your Universal Speedups exclusively for Tech Research on Tuesday of Week B (since late-game tech research timers are several times longer than building timers).",
              },
            ],
          ],
        },
      ],
    },
  ],
  proSections: [
    {
      id: "sec-4-master-double-dip-matrix",
      isPro: true,
      title: {
        vi: "4. Phân tích Định lượng & Điểm gãy: Sơ Đồ Quyết Định & Bảng Ma Trận Giao Thoa Tài Nguyên Toàn Diện (13 Nhóm Vật Phẩm)",
        en: "4. Quantitative Analysis: Pre-Spend Decision Flowchart & The 13-Item Master Double-Dip Matrix (300% / 200% / 100% / 0%)",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "Trước khi bấm sử dụng bất kỳ vật phẩm nào trong túi đồ, hãy đi qua Sơ đồ Luồng Quyết định 3 Câu hỏi và tra cứu trực tiếp trên Bảng Ma Trận Giao Thoa Tài Nguyên Toàn Diện (The Master Double-Dip Matrix) dưới đây để xác định chính xác thời điểm hiện tại đang mang lại hiệu suất 300% (Triple-Dip), 200% (Double-Dip), 100% (Single-Dip) hay 0% (Cấm xả).",
            en: "Before tapping 'Use' on any item in your bag, walk through the 3-Question Decision Flowchart and consult The Master Double-Dip Matrix below to verify whether the current window yields 300% (Triple-Dip), 200% (Double-Dip), 100% (Single-Dip), or 0% (Forbidden) efficiency.",
          },
        },
      ],
      subSections: [
        {
          id: "sub-4-1-three-question-decision-flow",
          title: {
            vi: "4.1. Sơ Đồ Luồng Quyết Định 3 Câu Hỏi Trước Khi Xả Tài Nguyên (Mermaid Decision Flow)",
            en: "4.1. Pre-Spend 3-Question Decision Flowchart (0% ➔ 100% ➔ 200% ➔ 300%)",
          },
          badge: {
            vi: "LUỒNG QUYẾT ĐỊNH",
            en: "DECISION FLOW",
          },
          blocks: [
            {
              type: "visual_diagram",
              mediaCode: "MED-3.4-03",
              variant: "decision_flow",
              title: {
                vi: "Sơ Đồ Luồng Quyết Định Trước Khi Xả Tài Nguyên (0% ➔ 100% ➔ 200% ➔ 300%)",
                en: "Pre-Spend Resource Decision Flowchart (0% ➔ 100% ➔ 200% ➔ 300%)",
              },
              subtitle: {
                vi: "Kiểm tra 3 câu hỏi sàng lọc bắt buộc trước khi bấm dùng bất kỳ vật phẩm nào trong túi đồ",
                en: "Mandatory 3-question screening protocol before spending any inventory resource",
              },
              centerNode: {
                id: "pre-spend-3-questions",
                badge: {
                  vi: "CỔNG KIỂM ĐỊNH TÚI ĐỒ",
                  en: "INVENTORY AUDIT GATE",
                },
                title: {
                  vi: "🔍 ĐỊNH BẤM DÙNG VẬT PHẨM TRONG TÚI ĐỒ: KIỂM TRA 3 CÂU HỎI",
                  en: "🔍 ABOUT TO USE AN INVENTORY ITEM: THE 3-QUESTION CHECK",
                },
                subtitle: {
                  vi: "Câu hỏi #1: Có thuộc Nhóm A (Đập ngay)? ➔ Câu hỏi #2: Có trùng Ngày Chủ Đề Tuần B / Nhiệm vụ Vàng Tuần A? ➔ Câu hỏi #3: Giao thoa mấy lớp sự kiện?",
                  en: "Q1: Is it Group A (Spend Now)? ➔ Q2: Does it match Week B Theme Day / Week A Gold Task? ➔ Q3: How many event layers overlap right now?",
                },
                metrics: [
                  {
                    vi: "Nhóm A: Đập ngay tăng Lực chiến Đội 1 & mở Trait 3 Kinh tế (12 Sao = 300 Mảnh)",
                    en: "Group A: Spend immediately for Queue 1 Power & Economy Trait 3 (12 Stars = 300 Shards)",
                  },
                  {
                    vi: "Nhóm B (13 danh mục): Canh chuẩn 100% Single-Dip ➔ 200% Double-Dip ➔ 300% Triple-Dip",
                    en: "Group B (13 categories): Time strictly for 100% Single-Dip ➔ 200% Double-Dip ➔ 300% Triple-Dip",
                  },
                ],
                tone: "gold",
              },
              branches: [
                {
                  title: {
                    vi: "Nhánh 1: Nhóm A — Đập Ngay Lập Tức (Không Tính Điểm Sự Kiện Hoặc Ngoại Lệ Kinh Tế)",
                    en: "Branch 1: Group A — Spend Immediately (Non-Scoring or Economic Exception)",
                  },
                  badge: {
                    vi: "⚡ ĐẬP NGAY LẬP TỨC",
                    en: "⚡ SPEND IMMEDIATELY",
                  },
                  tone: "emerald",
                  steps: [
                    {
                      id: "branch-1-step-1",
                      badge: {
                        vi: "CÂU HỎI #1A — ĐỒ TƯỚNG",
                        en: "QUESTION #1A — HERO GEAR",
                      },
                      title: {
                        vi: "Đồ Tướng (Hero Gear Forging) & Đá Cường Hóa Thường (+10/+20/+30/+40)",
                        en: "Hero Gear Forging & Regular Enhancement Ore (+10/+20/+30/+40)",
                      },
                      subtitle: {
                        vi: "Đúc trang bị Vàng đúng Dấu Hệ (+30%) và đập đá cường hóa thường trong Lò rèn không bao giờ tính điểm GAR/KvK hay Guild Race.",
                        en: "Forging faction-matching Legendary Hero Gear (+30%) and using regular Enhancement Ore in the Blacksmith never score points in GAR/KvK or Guild Race.",
                      },
                      tone: "emerald",
                    },
                    {
                      id: "branch-1-step-2",
                      badge: {
                        vi: "CÂU HỎI #1B — TƯỚNG TÍM KINH TẾ",
                        en: "QUESTION #1B — EPIC ECONOMY HEROES",
                      },
                      title: {
                        vi: "Mảnh Tướng Tím Kinh Tế (Knight, Brawler, Ranger) Chưa Đạt 12 Sao (2 Sao Trắng = 300 Mảnh)",
                        en: "Epic Economy Hero Shards (Knight, Brawler, Ranger) Below 12 Stars (2 White Stars = 300 Shards)",
                      },
                      subtitle: {
                        vi: "Ưu tiên nâng thẳng lên mốc 12 Sao (2 Sao Trắng = 300 Mảnh) để mở khóa ô Trait 3 (+25% đến +30% Tốc độ Nghiên cứu / Luyện lính).",
                        en: "Upgrade straight to 12 Stars (2 White Stars = 300 Shards) to unlock Trait 3 (+25% to +30% Research / Troop Training speed).",
                      },
                      tone: "emerald",
                    },
                  ],
                  outcome: {
                    vi: "⚡ KẾT LUẬN NHÁNH 1: ĐẬP NGAY LẬP TỨC! Tăng Lực chiến Đội 1 vượt ải PvE/Đấu trường và kích hoạt động cơ kinh tế vĩnh viễn ngay hôm nay.",
                    en: "⚡ BRANCH 1 OUTCOME: SPEND IMMEDIATELY! Boost Queue 1 combat power for PvE/Arena and activate your permanent account economy engine today.",
                  },
                },
                {
                  title: {
                    vi: "Nhánh 2: Nhóm B — Canh Giao Thoa Sự Kiện (100% Single-Dip ➔ 200% Double-Dip ➔ 300% Triple-Dip)",
                    en: "Branch 2: Group B — Event Overlap Windows (100% Single-Dip ➔ 200% Double-Dip ➔ 300% Triple-Dip)",
                  },
                  badge: {
                    vi: "🔥 GIAO THOA 100% ➔ 300%",
                    en: "🔥 100% ➔ 300% OVERLAP",
                  },
                  tone: "gold",
                  steps: [
                    {
                      id: "branch-2-step-1",
                      badge: {
                        vi: "🟡 1 LỚP — 100% SINGLE-DIP",
                        en: "🟡 1 LAYER — 100% SINGLE-DIP",
                      },
                      title: {
                        vi: "Chỉ Có 1 Sự Kiện Độc Lập Đang Tính Điểm",
                        en: "Only 1 Standalone Event Scoring",
                      },
                      subtitle: {
                        vi: "Chỉ xả cầm chừng vừa đủ mốc rương cá nhân cơ bản rồi dừng ngay lập tức (giữ lại ít nhất 70% kho dự trữ).",
                        en: "Spend only the bare minimum to reach basic personal milestone chests and stop immediately (preserve at least 70% of your stockpile).",
                      },
                      tone: "slate",
                    },
                    {
                      id: "branch-2-step-2",
                      badge: {
                        vi: "🟢 2 LỚP — 200% DOUBLE-DIP",
                        en: "🟢 2 LAYERS — 200% DOUBLE-DIP",
                      },
                      title: {
                        vi: "Trùng 2 Lớp Sự Kiện (Lớp 1 + Lớp 2 Hoặc Lớp 1 + Lớp 3)",
                        en: "2 Event Layers Intersect (Layer 1 + Layer 2 or Layer 1 + Layer 3)",
                      },
                      subtitle: {
                        vi: "Ví dụ: Nhiệm vụ Độc quyền Vàng Lord Gear Ngày 5–7 Tuần A trùng Guild Rush: Quân Trang & Đồ Chúa Tể ➔ Xả mở khóa Full 6/6 Rương Mốc Cá Nhân!",
                        en: "Example: Days 5–7 Week A Exclusive Gold Lord Gear Task overlapping with Guild Rush: Troop Skin & Lord Gear ➔ Spend to unlock all 6/6 Personal Milestone Chests!",
                      },
                      tone: "emerald",
                    },
                    {
                      id: "branch-2-step-3",
                      badge: {
                        vi: "🔥 3 LỚP — 300% TRIPLE-DIP",
                        en: "🔥 3 LAYERS — 300% TRIPLE-DIP",
                      },
                      title: {
                        vi: "Giao Thoa Đủ 3 Lớp (GAR/KvK + Guild Rush/Sub-Event + Khung Giờ Vàng 4h)",
                        en: "All 3 Layers Intersect (GAR/KvK + Guild Rush/Sub-Event + 4-Hour Golden Window)",
                      },
                      subtitle: {
                        vi: "Ví dụ: 17:00–21:00 Thứ Năm Tuần B (GAR/KvK Day 4 + Guild Rush Phát triển Tướng / Soul Stone + Ca Giờ Bồi Dưỡng Anh Hùng) ➔ Xả tất tay 80%–100% Kho Dự Trữ!",
                        en: "Example: Thursday 17:00–21:00 Week B (GAR/KvK Day 4 + Guild Rush Hero Dev / Soul Stone + Hourly Hero Dev) ➔ Unload 80%–100% of your stockpile!",
                      },
                      tone: "gold",
                    },
                  ],
                  outcome: {
                    vi: "🔥 KẾT LUẬN NHÁNH 2: XẢ ĐÚNG ĐIỂM NỔ 200%–300%! Một vật phẩm ăn trọn 2–3 bảng phần thưởng, hoàn vốn 30%–50% tổng tài nguyên tiêu thụ.",
                    en: "🔥 BRANCH 2 OUTCOME: UNLOAD AT 200%–300% BURST WINDOWS! One item claims 2–3 reward tracks simultaneously, rebating 30%–50% of spent resources.",
                  },
                },
                {
                  title: {
                    vi: "Nhánh 3: Vùng Cấm 0% — Cấm Xả Tuyệt Đối (Ngoài Sự Kiện Hoặc Lệch Ngày Tính Điểm)",
                    en: "Branch 3: 0% Forbidden Zone — Strictly Prohibited (Off-Event or Wrong Scoring Day)",
                  },
                  badge: {
                    vi: "⛔ HIỆU SUẤT 0% — CẤM XẢ",
                    en: "⛔ 0% FORBIDDEN ZONE",
                  },
                  tone: "rose",
                  steps: [
                    {
                      id: "branch-3-step-1",
                      badge: {
                        vi: "CÂU HỎI #2 — KHÔNG TRÙNG SỰ KIỆN",
                        en: "QUESTION #2 — NO MATCHING EVENT",
                      },
                      title: {
                        vi: "Ngày Thường Không Có Ngày Chủ Đề Tuần B Hoặc Nhiệm Vụ Vàng Tuần A",
                        en: "Off-Days Without Matching Week B Theme or Week A Gold Task",
                      },
                      subtitle: {
                        vi: "Đập Mảnh Vàng vào Thứ Hai/Thứ Ba/Thứ Tư/Thứ Sáu, thức tỉnh Hồn Đá Đỏ ngày thường, hoặc xả 20–80 Vé Chiêu Mộ cho bảng Guild Race.",
                        en: "Fusing Legendary Shards on Mon/Tue/Wed/Fri, awakening Soul Stones on regular days, or burning 20–80 Recruit Tokens on Guild Race tasks.",
                      },
                      tone: "rose",
                    },
                    {
                      id: "branch-3-step-2",
                      badge: {
                        vi: "BẪY ĐỎ — LỆCH NGÀY TÍNH ĐIỂM",
                        en: "RED TRAP — WRONG SCORING DAY",
                      },
                      title: {
                        vi: "Găm Nhầm Đồ Chúa Tể (Lord Gear) Sang Thứ Bảy Ngày 6 Hoặc Xả Relics Ngày 5 GAR",
                        en: "Saving Lord Gear for Saturday Day 6 or Spending Relics on GAR Day 5",
                      },
                      subtitle: {
                        vi: "Đồ Chúa Tể (Lord Gear) KHÔNG tính điểm vào Ngày 6 GAR/KvK, và Thánh Tích (Relics) KHÔNG tính điểm vào Ngày 5 GAR tiêu chuẩn!",
                        en: "Lord Gear grants ZERO points on Day 6 of GAR/KvK, and Relics grant ZERO points on Day 5 of standard GAR!",
                      },
                      tone: "rose",
                    },
                  ],
                  outcome: {
                    vi: "⛔ KẾT LUẬN NHÁNH 3: HIỆU SUẤT 0% — ĐÓNG BẢNG LẠI NGAY! Giữ nguyên 100% vật phẩm trong túi đồ và tra cứu khung giờ vàng tại Bảng Ma Trận 13 Nhóm Vật Phẩm.",
                    en: "⛔ BRANCH 3 OUTCOME: 0% EFFICIENCY — CLOSE MENU IMMEDIATELY! Keep 100% of your items locked in the bag and check the 13-Item Master Matrix below.",
                  },
                },
              ],
              footnote: {
                vi: "Mẹo tra cứu nhanh: Luôn mở Event ➔ Lịch Event (cột 09:00 Thứ Hai) kết hợp đồng hồ Sự kiện Giờ 4 tiếng trước khi mở khóa bất kỳ vật phẩm Nhóm B nào.",
                en: "Quick lookup tip: Always check Event ➔ Event Calendar (Monday 09:00 column) alongside the 4-Hour Hourly Event timer before unlocking any Group B resource.",
              },
            },
          ],
        },
        {
          id: "sub-4-2-thirteen-item-master-matrix",
          title: {
            vi: "4.2. Bảng Ma Trận Giao Thoa Tài Nguyên Toàn Diện (The 13-Item Master Double-Dip Matrix)",
            en: "4.2. The Complete 13-Item Master Double-Dip Matrix (300% / 200% / 100% / 0%)",
          },
          badge: {
            vi: "MA TRẬN 13 VẬT PHẨM",
            en: "13-ITEM MASTER MATRIX",
          },
          blocks: [
            {
              type: "table",
              caption: {
                vi: "Bảng Ma Trận Giao Thoa Tài Nguyên Toàn Diện (The Master Double-Dip Matrix — Đủ 13 Nhóm Vật Phẩm Cốt Lõi × 4 Cấp Hiệu Suất)",
                en: "The Master Double-Dip Matrix: All 13 Core Inventory Item Categories Across 300% / 200% / 100% / 0% Efficiency Windows",
              },
              headers: [
                {
                  vi: "STT",
                  en: "#",
                },
                {
                  vi: "Nhóm Vật Phẩm Trong Túi Đồ (Inventory Item)",
                  en: "Inventory Item Category",
                },
                {
                  vi: "🔥 Điểm Nổ 300% (Triple-Dip — Xả Tất Tay 80–100% Kho)",
                  en: "🔥 300% Triple-Dip Burst (Spend 80–100% Stockpile)",
                },
                {
                  vi: "🟢 Điểm Giao Thoa 200% (Double-Dip — Xả Đủ Full Rương Mốc)",
                  en: "🟢 200% Double-Dip Overlap (Max 6/6 Milestone Chests)",
                },
                {
                  vi: "🟡 Mốc Cầm Chừng 100% (Single-Dip — Chỉ Rướn Mốc Cơ Bản)",
                  en: "🟡 100% Single-Dip Baseline (Minimal Chest Threshold Only)",
                },
                {
                  vi: "⛔ Vùng Cấm 0% (Forbidden Zone — Cấm Đụng Tuyệt Đối)",
                  en: "⛔ 0% Forbidden Zone (Strictly Do Not Touch)",
                },
              ],
              rows: [
                [
                  { vi: "1", en: "1" },
                  {
                    vi: "Mảnh Tướng Vàng Vạn Năng & Mảnh Riêng (Universal & Specific Hero Shards)",
                    en: "Universal & Specific Legendary/Mythic Hero Shards",
                  },
                  {
                    vi: "Thứ Năm Tuần B (17:00–21:00): Trùng GAR/KvK Day 4 + Ca Giờ Bồi Dưỡng Anh Hùng + Guild Rush: Phát triển Tướng (T4–T5).",
                    en: "Thursday Week B (17:00–21:00): Overlaps GAR/KvK Day 4 + Hourly Hero Development + Guild Rush: Hero Development (Wed–Thu).",
                  },
                  {
                    vi: "Thứ Năm Tuần B (17:00–21:00): Trùng GAR/KvK Day 4 + Ca Giờ Bồi Dưỡng Anh Hùng.",
                    en: "Thursday Week B (17:00–21:00): Overlaps GAR/KvK Day 4 + Hourly Hero Development.",
                  },
                  {
                    vi: "Khi chạy sự kiện phụ 3 ngày Hero Development rơi vào Tuần A (chỉ xả đủ mốc rương nếu cần).",
                    en: "When the standalone 3-day Hero Development sub-event lands in Week A (spend only to hit basic chest thresholds if needed).",
                  },
                  {
                    vi: "Cấm xả 100% vào Thứ Hai, Thứ Ba, Thứ Tư, Thứ Sáu và cấm nhận nhiệm vụ 40 Mảnh Vàng trong Guild Race Tuần A!",
                    en: "100% forbidden on Mon, Tue, Wed, Fri, and NEVER accept the 20–40 Legendary Shard task in Week A Guild Race!",
                  },
                ],
                [
                  { vi: "2", en: "2" },
                  {
                    vi: "Hồn Đá Đỏ (120,000đ/viên) (Soul Stones — Giá 40,000 Điểm Vinh Dự hoặc 6,000 Xu Vinh Quang)",
                    en: "Soul Stones (120,000 pts/stone — Cost: 40,000 Guild Honor or 6,000 Guild Glory Coins)",
                  },
                  {
                    vi: "Thứ Năm Tuần B (17:00–21:00): Trùng GAR/KvK Day 4 (120,000đ/viên) + Guild Rush: Phát triển Tướng + Sự kiện phụ Soul Stone.",
                    en: "Thursday Week B (17:00–21:00): Overlaps GAR/KvK Day 4 (120,000 pts/stone) + Guild Rush: Hero Development + Soul Stone sub-event.",
                  },
                  {
                    vi: "Thứ Năm Tuần B: Trùng GAR/KvK Day 4 + Ca Giờ Bồi Dưỡng Anh Hùng.",
                    en: "Thursday Week B: Overlaps GAR/KvK Day 4 + Hourly Hero Development.",
                  },
                  {
                    vi: "Trong 3 ngày diễn ra sự kiện phụ Soul Stone độc lập.",
                    en: "During a standalone 3-day Soul Stone sub-event.",
                  },
                  {
                    vi: "Cấm thức tỉnh tướng vào ngày thường; cấm tiêu thủng Ngưỡng Đóng Băng Ví (40,000 Điểm Vinh Dự / 12,000–18,000 Xu Vinh Quang).",
                    en: "Never awaken heroes on regular days; never spend below the Wallet Freeze Floor (40,000 Guild Honor / 12,000–18,000 Guild Glory Coins).",
                  },
                ],
                [
                  { vi: "3", en: "3" },
                  {
                    vi: "Sách Kỹ Năng, Mảnh UW (6,000đ) & Lõi Sắt Thiên Thạch (6,000đ) (Skill Books, UW Shards & Meteorite Iron Cores)",
                    en: "Skill Books, UW Shards (6,000 pts) & Meteorite Iron Cores (6,000 pts)",
                  },
                  {
                    vi: "Thứ Năm Tuần B (17:00–21:00): Trùng GAR/KvK Day 4 + Guild Rush: Phát triển Tướng (T4–T5) + Ca Giờ Bồi Dưỡng Anh Hùng.",
                    en: "Thursday Week B (17:00–21:00): Overlaps GAR/KvK Day 4 + Guild Rush: Hero Development (Wed–Thu) + Hourly Hero Development.",
                  },
                  {
                    vi: "Khi Guild Rush: Phát triển Tướng giao thoa với Ca Giờ Bồi Dưỡng Anh Hùng.",
                    en: "When Guild Rush: Hero Development intersects with the Hourly Hero Development shift.",
                  },
                  {
                    vi: "Xả vừa đủ mốc trong sự kiện phụ Hero Development độc lập.",
                    en: "Spend just enough to hit milestone thresholds during a standalone Hero Development sub-event.",
                  },
                  {
                    vi: "Cấm nâng kỹ năng tướng Đội 2/Đội 3; cấm xả Sách Kỹ Năng, Mảnh UW và Lõi Sắt ngoài ngày sự kiện Tướng.",
                    en: "Never upgrade Queue 2/Queue 3 hero skills; never spend Skill Books, UW Shards, or Meteorite Iron Cores outside Hero event days.",
                  },
                ],
                [
                  { vi: "4", en: "4" },
                  {
                    vi: "Thẻ Chiêu Mộ Quán Rượu (Tavern Recruitment Tokens)",
                    en: "Tavern Recruitment Tokens",
                  },
                  {
                    vi: "Thứ Năm Tuần B (17:00–21:00): Trùng GAR/KvK Day 4 + Ca Giờ Bồi Dưỡng Anh Hùng + Guild Rush: Phát triển Tướng.",
                    en: "Thursday Week B (17:00–21:00): Overlaps GAR/KvK Day 4 + Hourly Hero Development + Guild Rush: Hero Development.",
                  },
                  {
                    vi: "Thứ Năm Tuần B: Xả trong ngày GAR/KvK Day 4 để vừa lấy điểm rương vừa gom Điểm Đổi Tướng.",
                    en: "Thursday Week B: Spend during GAR/KvK Day 4 to claim milestone chests while stacking Tavern Hero Exchange points.",
                  },
                  {
                    vi: "Sự kiện phụ Hero Development độc lập (nếu thiếu vài mảnh để mở tướng chủ lực).",
                    en: "Standalone Hero Development sub-event (only if a few shards short of unlocking a core carry hero).",
                  },
                  {
                    vi: "TUYỆT ĐỐI CẤM xả 20–80 vé cho nhiệm vụ bảng Guild Race (Tuần A) hoặc quay lẻ tẻ mỗi ngày!",
                    en: "STRICTLY FORBIDDEN to burn 20–80 tokens on Week A Guild Race tasks or do random daily pulls!",
                  },
                ],
                [
                  { vi: "5", en: "5" },
                  {
                    vi: "Đá Cường Hóa Thường & Phôi Đúc Đồ Tướng (Hero Gear Ore & Forging Ingots)",
                    en: "Regular Hero Gear Enhancement Ore & Forging Ingots",
                  },
                  {
                    vi: "Không áp dụng (Đập ngay cho Đội 1): Đúc đồ Vàng đúng Dấu Hệ (+30%) và đập lên mốc Cộng hưởng +10/+20/+30/+40 ngay lập tức!",
                    en: "N/A (Spend Immediately on Queue 1): Forge faction-matched Legendary Hero Gear (+30%) and upgrade to +10/+20/+30/+40 Resonance immediately!",
                  },
                  {
                    vi: "Riêng Lõi Sắt Thiên Thạch (6,000đ) xả vào Thứ Năm Tuần B (Day 4); Máu Rồng (Dragon Blood) xả theo khung Lord Gear (Ngày 3–4 Tuần B / Ngày 5–7 Tuần A).",
                    en: "Exception: Spend Meteorite Iron Cores (6,000 pts) on Thursday Week B (Day 4); spend Dragon Blood during Lord Gear windows (Days 3–4 Week B / Days 5–7 Week A).",
                  },
                  {
                    vi: "Nâng ngay khi Đội 1 bị kẹt ải PvE hoặc trước giờ đánh Đấu trường / Chiến sự Bang.",
                    en: "Upgrade immediately whenever Queue 1 hits a PvE wall or right before Arena / Guild War battles.",
                  },
                  {
                    vi: "Cấm nhịn đúc đồ Vàng Đội 1 chờ sự kiện (vì đúc đồ và đập quặng thường không có điểm sự kiện!).",
                    en: "Never delay forging Queue 1 Legendary Hero Gear waiting for events (regular forging and enhancement ore grant 0 event points!).",
                  },
                ],
                [
                  { vi: "6", en: "6" },
                  {
                    vi: "Đồ Chúa Tể (Lord Gear: Đá Xanh, Dây Gai, Bản Vẽ, Máu Rồng) (Refined Metal, Magic Thread, Orichalcum, Dragon Blood)",
                    en: "Lord Gear (Refined Metal, Magic Thread, Orichalcum, Dragon Blood)",
                  },
                  {
                    vi: "Thứ Tư (Ngày 3) & Thứ Năm (Ngày 4) Tuần B (trùng GAR/KvK Day 3–4 + sự kiện phụ Lord's Set, hoặc Ngày 5 ở KvK); HOẶC Thứ Sáu–Thứ Bảy (Ngày 5–6) Tuần A (trùng NV Độc quyền Vàng Guild Race + Guild Rush: Quân Trang & Đồ Chúa Tể + Lord's Set)!",
                    en: "Wednesday (Day 3) & Thursday (Day 4) Week B (overlapping GAR/KvK Days 3–4 + Lord's Set sub-event, or Day 5 in KvK); OR Friday–Saturday (Days 5–6) Week A (overlapping Guild Race Exclusive Gold Task + Guild Rush: Troop Skin & Lord Gear + Lord's Set)!",
                  },
                  {
                    vi: "Tuần A (Ngày 5–7: Thứ Sáu ➔ CN): Nhận Nhiệm vụ Độc quyền Vàng Lord Gear trên bảng Guild Race + trùng Guild Rush: Quân Trang & Đồ Chúa Tể.",
                    en: "Week A (Days 5–7: Fri ➔ Sun): Accept Exclusive Gold Lord Gear Tasks on the Guild Race board + overlap with Guild Rush: Troop Skin & Lord Gear.",
                  },
                  {
                    vi: "Thứ Tư / Thứ Năm Tuần B (GAR/KvK Day 3–4) hoặc Ngày 5–7 Tuần A (xoay NV Vàng Lord Gear +300 ➔ +450 điểm).",
                    en: "Wednesday / Thursday Week B (GAR/KvK Days 3–4) or Days 5–7 Week A (rolling Exclusive Gold Lord Gear Tasks for +300 ➔ +450 pts).",
                  },
                  {
                    vi: "CẢNH BÁO ĐỎ: Đồ Chúa Tể KHÔNG tính điểm vào Ngày 6 (Thứ Bảy) của GAR/KvK! Cấm để dành sang Thứ Bảy Tuần B và cấm nâng từ Thứ Hai–Thứ Năm Tuần A!",
                    en: "RED ALERT: Lord Gear grants ZERO points on Day 6 (Saturday) of GAR/KvK! Never save it for Saturday Week B and never upgrade Mon–Thu of Week A!",
                  },
                ],
                [
                  { vi: "7", en: "7" },
                  {
                    vi: "Thánh Tích (Relics) & Cự Thú (Behemoth) (Wish Relic, Relic Shards, Arcane Crystals, Magic Stones & Magicite, Magic Core, Scroll Seal)",
                    en: "Relics & Behemoth (Wish Relic, Relic Shards, Arcane Crystals, Magic Stones & Magicite, Magic Core, Scroll Seal)",
                  },
                  {
                    vi: "Thứ Hai (Ngày 1) & Thứ Ba (Ngày 2) Tuần B: Khi GAR/KvK Stage 1–2 giao thoa với sự kiện phụ Relic Power (hoặc thêm Ngày 5 nếu là KvK)! (Lưu ý: Behemoth tính điểm ở Ngày 1, 2, 5, 6 của GAR/KvK và thêm Ngày 3 ở KvK, nhưng GAR Ngày 3 KHÔNG tính Behemoth).",
                    en: "Monday (Day 1) & Tuesday (Day 2) Week B: When GAR/KvK Stages 1–2 overlap with the Relic Power sub-event (plus Day 5 in KvK)! (Note: Behemoth scores on Days 1, 2, 5, 6 of GAR/KvK plus Day 3 in KvK, whereas GAR Day 3 does NOT score Behemoth).",
                  },
                  {
                    vi: "Thứ Tư – Thứ Năm Tuần A: Trùng Guild Rush: Thánh Tích (Relic Hall & Relics) + sự kiện phụ Relic Power.",
                    en: "Wednesday – Thursday Week A: Overlaps Guild Rush: Relic Hall & Relics + Relic Power sub-event.",
                  },
                  {
                    vi: "Ngày 1–2 Tuần B (GAR/KvK) hoặc Thứ Tư–Thứ Năm Tuần A (Guild Rush).",
                    en: "Days 1–2 Week B (GAR/KvK) or Wednesday–Thursday Week A (Guild Rush).",
                  },
                  {
                    vi: "Cấm xả Thánh Tích vào Ngày 5 (Thứ Sáu) của GAR tiêu chuẩn (vì GAR Ngày 5 KHÔNG tính điểm Relics, chỉ KvK Ngày 5 mới tính Relic Shards!).",
                    en: "Never spend Relics on Day 5 (Friday) of standard GAR (standard GAR Day 5 grants ZERO points for Relics; only KvK Day 5 scores Relic Shards!).",
                  },
                ],
                [
                  { vi: "8", en: "8" },
                  {
                    vi: "Thú Cưng (Pets) & Mảnh Anh Linh (Heroic Spirits) (Pet Food, Pet Essence & Heroic Spirit Shards)",
                    en: "Pets & Heroic Spirits (Pet Food, Pet Essence & Heroic Spirit Shards)",
                  },
                  {
                    vi: "Thứ Sáu (Ngày 5 — kèm Heroic Spirit Shards) & Thứ Bảy (Ngày 6) Tuần B: Trùng GAR/KvK Day 5–6 + Sự kiện phụ 3 ngày Pet Power!",
                    en: "Friday (Day 5 — including Heroic Spirit Shards) & Saturday (Day 6) Week B: Overlaps GAR/KvK Days 5–6 + 3-day Pet Power sub-event!",
                  },
                  {
                    vi: "Thứ Hai – Thứ Ba Tuần A: Trùng Guild Rush: Nâng cấp Thú Cưng (Pets Development) + sự kiện phụ Pet Power.",
                    en: "Monday – Tuesday Week A: Overlaps Guild Rush: Pets Development + Pet Power sub-event.",
                  },
                  {
                    vi: "Thứ Sáu / Thứ Bảy Tuần B (GAR/KvK Day 5–6) hoặc Thứ Hai–Thứ Ba Tuần A (Guild Rush).",
                    en: "Friday / Saturday Week B (GAR/KvK Days 5–6) or Monday–Tuesday Week A (Guild Rush).",
                  },
                  {
                    vi: "Cấm đút Thức ăn Pet lắt nhắt ngoài ngày sự kiện và cấm nuôi Pet phụ khi Pet Đội 1 chưa đạt mốc đột phá.",
                    en: "Never feed Pets piecemeal outside event days and never level secondary Pets before Queue 1's main Pet hits breakthrough milestones.",
                  },
                ],
                [
                  { vi: "9", en: "9" },
                  {
                    vi: "Bụi Cổ Ngữ & Rương Cổ Ngữ (Rune Dust & Rune Chests)",
                    en: "Rune Dust & Rune Chests",
                  },
                  {
                    vi: "Thứ Ba Tuần B (17:00–21:00): Trùng GAR/KvK Day 2 (Tech & Runes) + Sự kiện phụ có tính điểm Cổ Ngữ + Đạt mốc Rune Lv.5 / Lv.8!",
                    en: "Tuesday Week B (17:00–21:00): Overlaps GAR/KvK Day 2 (Tech & Runes) + Rune-scoring sub-event + hitting Rune Lv.5 / Lv.8 breakpoints!",
                  },
                  {
                    vi: "Thứ Ba Tuần B: Xả toàn bộ Bụi Cổ Ngữ và ghép phôi trong ngày GAR/KvK Day 2.",
                    en: "Tuesday Week B: Spend all Rune Dust and fuse runes during GAR/KvK Day 2.",
                  },
                  {
                    vi: "Khi thiếu đúng 1 viên để kích hoạt mốc đột phá Lv.5 (+% Tướng & March Size) hoặc Lv.8 (+% Toàn bộ Lính) trước trận đánh lớn.",
                    en: "Only when exactly 1 rune short of activating the Lv.5 (+% Hero & March Size) or Lv.8 (+% All Troops) set breakpoint right before a major war.",
                  },
                  {
                    vi: "Cấm mở Rương Cổ Ngữ Tự Chọn ở bậc Lv.1–Lv.3; cấm ghép Cổ Ngữ vào các ngày khác ngoài Thứ Ba Tuần B!",
                    en: "Never open Choice Rune Chests at Lv.1–Lv.3; never fuse Runes on any day other than Tuesday Week B!",
                  },
                ],
                [
                  { vi: "10", en: "10" },
                  {
                    vi: "Tăng Tốc Xây Dựng & Đá Rồng Công Trình (Construction Speedups & Dragon Essence)",
                    en: "Construction Speedups & Building Dragon Essence",
                  },
                  {
                    vi: "Thứ Hai Tuần B (13:00–17:00): Khui hộp công trình xây sẵn + Xả Tăng tốc & Đá Rồng khi trùng GAR/KvK Day 1 + Ca Giờ Xây Lãnh Thổ + Guild Rush: Xây dựng & Nghiên cứu (T2–T3).",
                    en: "Monday Week B (13:00–17:00): Pop pre-built gift boxes + spend Construction Speedups & Dragon Essence overlapping GAR/KvK Day 1 + Hourly Territory Construction + Guild Rush: Building & Research (Mon–Tue).",
                  },
                  {
                    vi: "Tuần A: Nhận Nhiệm vụ Vàng Xây dựng trên bảng Guild Race + Trùng sự kiện phụ 2–3 ngày Rush Top / Ultimate Power.",
                    en: "Week A: Accept Gold Construction Tasks on the Guild Race board + overlap with 2–3 day Rush Top / Ultimate Power sub-events.",
                  },
                  {
                    vi: "Thứ Hai Tuần B (13:00–17:00) hoặc khi nhận Nhiệm vụ Độc quyền Vàng Công trình ở Ngày 5–7 Tuần A.",
                    en: "Monday Week B (13:00–17:00) or when accepting Exclusive Gold Building Tasks on Days 5–7 of Week A.",
                  },
                  {
                    vi: "Cấm cắn Tăng tốc khi chưa xin đủ Trợ giúp Bang (Guild Help) và chưa bật buff Chức vụ Vương quốc!",
                    en: "Never burn Speedups before requesting full Guild Help and activating Kingdom Title construction buffs!",
                  },
                ],
                [
                  { vi: "11", en: "11" },
                  {
                    vi: "Tăng Tốc Nghiên Cứu & Tăng Tốc Vạn Năng (Research & Universal Speedups)",
                    en: "Research & Universal Speedups",
                  },
                  {
                    vi: "Thứ Ba Tuần B (17:00–21:00): Trùng GAR/KvK Day 2 + Ca Giờ Nghiên Cứu Công Nghệ + Guild Rush: Xây dựng & Nghiên cứu (T2–T3).",
                    en: "Tuesday Week B (17:00–21:00): Overlaps GAR/KvK Day 2 + Hourly Tech Research + Guild Rush: Building & Research (Mon–Tue).",
                  },
                  {
                    vi: "Tuần A: Nhận Nhiệm vụ Vàng Nghiên cứu trên bảng Guild Race + Trùng sự kiện phụ 2–3 ngày Rush Top.",
                    en: "Week A: Accept Gold Research Tasks on the Guild Race board + overlap with the 2–3 day Rush Top sub-event.",
                  },
                  {
                    vi: "Thứ Ba Tuần B (17:00–21:00) hoặc dùng các nốt nghiên cứu ngắn (5–30 phút) nhánh Kinh tế làm mồi trả nhiệm vụ Vàng.",
                    en: "Tuesday Week B (17:00–21:00) or completing short (5–30 min) Economy tech nodes to finish Gold Tasks.",
                  },
                  {
                    vi: "Cấm cắn Tăng tốc Nghiên cứu khi chưa kích hoạt Trait 3 (+25%–30% Tốc độ Tech) của Tướng Tím Kinh tế!",
                    en: "Never burn Research Speedups without first unlocking Trait 3 (+25%–30% Tech Speed) on your Epic Economy Heroes!",
                  },
                ],
                [
                  { vi: "12", en: "12" },
                  {
                    vi: "Tăng Tốc Huấn Luyện Lính (Troop Training Speedups)",
                    en: "Troop Training Speedups",
                  },
                  {
                    vi: "Thứ Sáu Tuần B (21:00–01:00): Áp dụng Thăng cấp Bậc Thang (T4 ➔ T5 ➔ T6+) khi trùng GAR/KvK Day 5 + Ca Giờ Mở Rộng Quân Đội + Sự kiện phụ Ultimate Power / Rush Top.",
                    en: "Friday Week B (21:00–01:00): Execute Staircase Troop Promotion (T4 ➔ T5 ➔ T6+) overlapping GAR/KvK Day 5 + Hourly Army Expansion + Ultimate Power / Rush Top sub-event.",
                  },
                  {
                    vi: "Tuần A: Nhận Nhiệm vụ Vàng Luyện lính trên bảng Guild Race + Thu hoạch mẻ lính Pre-cook + Xả Tăng tốc trùng Rush Top.",
                    en: "Week A: Accept Gold Troop Training Tasks on the Guild Race board + harvest pre-cooked troops + spend Speedups overlapping Rush Top.",
                  },
                  {
                    vi: "Thứ Sáu Tuần B (21:00–01:00) hoặc khung giờ Mở Rộng Quân Đội hàng ngày để lấy rương mốc Giờ.",
                    en: "Friday Week B (21:00–01:00) or daily Army Expansion hourly windows to claim hourly milestone chests.",
                  },
                  {
                    vi: "Cấm xả Tăng tốc để huấn luyện mới lính cấp thấp thay vì dùng cơ chế Thăng cấp (Promote) bậc thang!",
                    en: "Never burn Speedups training brand-new low-tier troops from scratch instead of using Staircase Promotion (Promote)!",
                  },
                ],
                [
                  { vi: "13", en: "13" },
                  {
                    vi: "Quân Trang (Glory Medals) & Trang Trí (Decor Tokens) (Troop Skins & Castle Decorations)",
                    en: "Troop Skins (Glory Medals) & Castle Decorations (Decor Tokens)",
                  },
                  {
                    vi: "Thứ Bảy (Ngày 6) Tuần B: Xả Quân Trang (Glory Medals) & Trang Trí (Decor Tokens) khi trùng GAR/KvK Day 6 + Guild Rush: Nâng cấp Trang trí (T6–T7) + Sự kiện phụ Decorations!",
                    en: "Saturday (Day 6) Week B: Spend Troop Skins (Glory Medals) & Castle Decorations (Decor Tokens) overlapping GAR/KvK Day 6 + Guild Rush: Decor Upgrading (Fri–Sat) + Decorations sub-event!",
                  },
                  {
                    vi: "Thứ Sáu – Thứ Bảy Tuần A: Xả Quân Trang (Glory Medals) trùng Guild Rush: Quân Trang & Đồ Chúa Tể + NV Vàng Guild Race.",
                    en: "Friday – Saturday Week A: Spend Troop Skins (Glory Medals) overlapping Guild Rush: Troop Skin & Lord Gear + Guild Race Gold Tasks.",
                  },
                  {
                    vi: "Trong 3 ngày sự kiện phụ Decorations độc lập hoặc Guild Rush cuối tuần.",
                    en: "During a standalone 3-day Decorations sub-event or weekend Guild Rush.",
                  },
                  {
                    vi: "Cấm nâng cấp Quân Trang và Trang Trí vào đầu/giữa tuần (Thứ Hai ➔ Thứ Năm) khi không có sự kiện!",
                    en: "Never upgrade Troop Skins or Castle Decorations during early/mid-week (Monday ➔ Thursday) when no matching event is active!",
                  },
                ],
              ],
            },
            {
              type: "media_spotlight",
              mediaCode: "MED-3.4-04",
              tier: "tier4_youtube_ref",
              title: {
                vi: "Video Tham Chiếu Quốc Tế: Nghệ Thuật Canh Giờ Vàng Triple-Dip 300% (KvK + Hourly + Mini-Rush)",
                en: "International Video Reference: Mastering the 300% Triple-Dip Window (KvK + Hourly Event + Mini-Rush Overlap)",
              },
              description: {
                vi: "Hướng dẫn trực quan cách căn chỉnh đồng hồ 4 tiếng của Hourly Arms Race trùng khớp với Ngày Chủ Đề KvK/GAR và Guild Rush 2 ngày để nhận tối đa Kim Cương hoàn lại.",
                en: "Step-by-step visual guide on aligning the 4-Hour Hourly Arms Race clock with KvK/GAR Theme Days and 2-Day Guild Rush to maximize Diamond rebates.",
              },
              videoChannel: "RedBaron Gaming / OGFlux",
              videoTitle: "Master the 300% Triple-Dip Window: KvK + Hourly Event + Mini-Rush Overlap",
              videoTimestamp: "04:15 – 14:40",
              videoUrl: "https://www.youtube.com/results?search_query=top+heroes+double+dip+event+guide",
            },
          ],
        },
      ],
    },
    {
      id: "sec-5-thursday-triple-dip-case-study",
      isPro: true,
      title: {
        vi: "5. Kịch bản Thực chiến Nâng cao: Nhân Ba Lợi Tức (Triple-Dip 300%) Trong 15 Phút Chiều Thứ Năm Tuần B (Hoàn Lại Gói $49.99 Miễn Phí)",
        en: "5. Advanced Tactical Case Study: Executing a 15-Minute Thursday 300% Triple-Dip Burst (9,800 Diamonds + 42 Universal Shards Rebate)",
      },
      blocks: [
        {
          type: "case_study",
          badge: {
            vi: "CASE STUDY THỰC CHIẾN — TRIPLE-DIP 300%",
            en: "TACTICAL CASE STUDY — 300% TRIPLE-DIP",
          },
          title: {
            vi: "Lâu Đài Lv.29 (Gói Tháng $4.99): Thực Thi Cú Nổ 15 Phút Khung 17:15–17:30 Thứ Năm Tuần B Thu Về Gói Hoàn Lại Tương Đương ~$49.99",
            en: "Castle Lv.29 ($4.99 Monthly Pass): 15-Minute Thursday 17:15–17:30 Week B Triple-Dip Burst Yielding ~$49.99 in Free Rebate Rewards",
          },
          profileSummary: {
            vi: "Một tài khoản Lâu đài Lv.29 (Đội 1 Liên Minh / League hoặc Bộ Lạc / Horde, ngân sách gói Tháng $4.99) đã kiên trì đóng băng túi đồ suốt 13 ngày. Trong kho hiện có: 365 Mảnh Tướng Vàng Vạn Năng, 9 viên Hồn Đá Đỏ (đổi từ Cửa hàng Bang hội với đơn giá 40,000 Điểm Vinh Dự Bang / viên hoặc 6,000 Xu Vinh Quang Hội / viên, vẫn bảo toàn Ngưỡng Đóng Băng Ví 40,000 Điểm Vinh Dự / 12,000–18,000 Xu Vinh Quang), 6,000 Sách Kỹ Năng Cam, 240 Thẻ Chiêu Mộ và nguyên liệu Đồ Chúa Tể (Lord Gear).",
            en: "A Castle Lv.29 account (Queue 1 League or Horde, $4.99 Monthly Pass budget) strictly froze its inventory for 13 consecutive days. Stockpile ready: 365 Universal Legendary Hero Shards, 9 Soul Stones (redeemed from the Guild Shop at 40,000 Guild Honor / stone or 6,000 Guild Glory Coins / stone while preserving the 40,000 Guild Honor / 12,000–18,000 Glory Coins Wallet Freeze Floor), 6,000 Legendary Skill Books, 240 Tavern Recruit Tokens, and Lord Gear materials.",
          },
          metrics: [
            {
              label: {
                vi: "Kim Cương Hoàn Lại (Diamond Rebate)",
                en: "Diamond Rebate",
              },
              before: {
                vi: "0 Kim Cương (Người chơi A đập lẻ tẻ Thứ Ba Tuần A — 0%)",
                en: "0 Diamonds (Player A spending piecemeal on Tuesday Week A — 0%)",
              },
              after: {
                vi: "9,800 Kim Cương (Người chơi B nổ Triple-Dip 17:15 Thứ Năm Tuần B)",
                en: "9,800 Diamonds (Player B executing 17:15 Thursday Week B Triple-Dip)",
              },
              delta: {
                vi: "+9,800 Kim Cương miễn phí",
                en: "+9,800 Free Diamonds",
              },
            },
            {
              label: {
                vi: "Mảnh Tướng Vàng & Sách Kỹ Năng Hoàn Lại",
                en: "Universal Shards & Skill Books Rebate",
              },
              before: {
                vi: "0 Mảnh Vàng / 0 Sách Kỹ Năng hoàn lại",
                en: "0 Universal Shards / 0 Skill Books returned",
              },
              after: {
                vi: "42 Mảnh Tướng Vàng Vạn Năng + 1,200 Sách Kỹ Năng",
                en: "42 Universal Legendary Shards + 1,200 Skill Books",
              },
              delta: {
                vi: "+42 Mảnh Vàng & +1,200 Sách Kỹ Năng",
                en: "+42 Universal Shards & +1,200 Skill Books",
              },
            },
            {
              label: {
                vi: "Tăng Tốc Hoàn Lại & Giá Trị Quy Đổi",
                en: "Speedup Rebate & Equivalent Pack Value",
              },
              before: {
                vi: "0 giờ Tăng tốc ($0 giá trị cộng thêm)",
                en: "0h Speedups ($0 bonus value)",
              },
              after: {
                vi: "65 giờ Tăng tốc (Tổng gói hoàn lại tương đương ~$49.99)",
                en: "65h Speedups (Total rebate bundle worth ~$49.99)",
              },
              delta: {
                vi: "+65h Tăng tốc (~$49.99 Rebate)",
                en: "+65h Speedups (~$49.99 Rebate)",
              },
            },
          ],
          diagnostics: [
            {
              vi: "Lớp 1 (7-Day Macro Event): Ngày 4 của Kingdom Duel (KvK Stage 4: Hero Growth — Hồn Đá Đỏ 120,000đ/viên + tính điểm phụ Đồ Chúa Tể Lord Gear).",
              en: "Layer 1 (7-Day Macro Event): Day 4 of Kingdom Duel (KvK Stage 4: Hero Growth — Soul Stones score 120,000 pts/stone + secondary scoring for Lord Gear).",
            },
            {
              vi: "Lớp 2 (Guild Rush & Sub-Event): Ngày thứ 2 của Guild Rush: Phát triển Tướng (Thứ Tư–Thứ Năm) kết hợp sự kiện phụ Soul Stone Rush.",
              en: "Layer 2 (Guild Rush & Sub-Event): Day 2 of Guild Rush: Hero Development (Wed–Thu) combined with the Soul Stone Rush sub-event.",
            },
            {
              vi: "Lớp 3 (4-Hour Hourly Window): Khung giờ vàng 17:00 – 21:00 của Hourly Arms Race (ca Bồi Dưỡng Anh Hùng / Hero Development).",
              en: "Layer 3 (4-Hour Hourly Window): The 17:00 – 21:00 golden shift of Hourly Arms Race (Hero Development theme).",
            },
          ],
          recoverySteps: [
            {
              stepNumber: "01",
              title: {
                vi: "Đóng Băng Túi Đồ 13 Ngày & Bảo Toàn Ngưỡng Đóng Băng Ví",
                en: "13-Day Inventory Freeze & Wallet Floor Preservation",
              },
              detail: {
                vi: "Tích lũy đủ 365 Mảnh Tướng Vàng Vạn Năng, 9 viên Hồn Đá Đỏ (đổi với giá 40,000 Điểm Vinh Dự Bang / viên hoặc 6,000 Xu Vinh Quang Hội / viên nhưng luôn giữ nguyên Ngưỡng Đóng Băng Ví 40,000 Điểm Vinh Dự / 12,000–18,000 Xu Vinh Quang), 6,000 Sách Kỹ Năng Cam, 240 Thẻ Chiêu Mộ và nguyên liệu Lord Gear.",
                en: "Accumulate 365 Universal Legendary Shards, 9 Soul Stones (redeemed at 40,000 Guild Honor / stone or 6,000 Guild Glory Coins / stone while strictly keeping the 40,000 Guild Honor / 12,000–18,000 Glory Coins Wallet Freeze Floor intact), 6,000 Legendary Skill Books, 240 Recruit Tokens, and Lord Gear materials.",
              },
              impactBadge: {
                vi: "365 MẢNH + 9 HỒN ĐÁ ĐỎ",
                en: "365 SHARDS + 9 SOUL STONES",
              },
            },
            {
              stepNumber: "02",
              title: {
                vi: "Thực Thi Cú Nổ Triple-Dip Trong 15 Phút (17:15 – 17:30 Thứ Năm Tuần B)",
                en: "Execute the 15-Minute Triple-Dip Burst (Thursday 17:15 – 17:30 Week B)",
              },
              detail: {
                vi: "Đúng 17:15 Thứ Năm khi cả 3 lớp sự kiện giao thoa, mở khóa trọn vẹn 4 Bậc Thức Tỉnh (Awakening Tier 1 ➔ Tier 4: tốn 1 + 2 + 2 + 4 = 9 Hồn Đá Đỏ + 345–385 Mảnh Tướng) cho tướng Vàng chủ lực Đội 1, đồng thời xả 240 Thẻ Chiêu Mộ, 6,000 Sách Kỹ Năng và nâng cấp Đồ Chúa Tể (Lord Gear).",
                en: "At 17:15 Thursday when all 3 event layers align, unlock all 4 Awakening Tiers (Tier 1 ➔ Tier 4: costing 1 + 2 + 2 + 4 = 9 Soul Stones + 345–385 Hero Shards) on Queue 1's core Legendary carry, while simultaneously spending 240 Recruit Tokens, 6,000 Skill Books, and upgrading Lord Gear.",
              },
              impactBadge: {
                vi: "1 + 2 + 2 + 4 = 9 HỒN ĐÁ",
                en: "1 + 2 + 2 + 4 = 9 STONES",
              },
            },
            {
              stepNumber: "03",
              title: {
                vi: "Thu Hoạch Đồng Thời 3 Bảng Xếp Hạng & Rương Nhân Đôi",
                en: "Claim 3 Simultaneous Event Boards & Double Milestone Chests",
              },
              detail: {
                vi: "Ăn trọn: (1) 6/6 Rương Cá Nhân + 3 Rương Nhân Đôi (Double Rewards) của KvK Stage 4; (2) 3/3 Rương Mốc + Top 5 Bảng Xếp Hạng của sự kiện phụ Soul Stone / Hero Rush; và (3) 3/3 Rương Mốc + Top 1 Bảng Xếp Hạng Ca Giờ 17:00–21:00.",
                en: "Sweep all 3 tracks: (1) 6/6 Personal Chests + 3 Double Rewards Chests in KvK Stage 4; (2) 3/3 Milestone Chests + Top 5 Leaderboard in the Soul Stone / Hero Rush sub-event; and (3) 3/3 Milestone Chests + Top 1 Leaderboard in the 17:00–21:00 Hourly Arms Race shift.",
              },
              impactBadge: {
                vi: "HOÀN LẠI ~$49.99 MIỄN PHÍ",
                en: "~$49.99 FREE REBATE",
              },
            },
          ],
          conclusion: {
            vi: "Tổng phần thưởng hoàn lại (Rebate): Thu về 9,800 Kim Cương, 42 Mảnh Tướng Vàng Vạn Năng, 1,200 Sách Kỹ Năng và 65 giờ Tăng tốc — tương đương giá trị của một gói nạp ~$49.99 hoàn toàn miễn phí chỉ nhờ kỷ luật canh giờ Triple-Dip 300%!",
            en: "Total Rebate Earned: 9,800 Diamonds, 42 Universal Legendary Shards, 1,200 Skill Books, and 65 hours of Speedups—equivalent to a ~$49.99 store bundle completely free, achieved purely through 300% Triple-Dip timing discipline!",
          },
        },
      ],
    },
  ],
};

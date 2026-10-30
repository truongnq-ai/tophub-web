import type { GuideArticle } from "../../types";

export const ARTICLE_7_2_GUILD_HONOR_FREEZE: GuideArticle = {
  code: "7.2",
  displayCode: "8.2",
  slug: "guild-honor-freeze",
  categorySlug: "economy",
  badge: "HOT",
  readingMinutes: 13,
  title: {
    vi: "Chiến Lược Đóng Băng 40,000 Điểm Vinh Dự Bang Hội (The 40,000 Guild Honor Freeze)",
    en: "The 40,000 Guild Honor Freeze & Soul Stone Awakening Economy",
  },
  summary: {
    vi: "Giải mã nút cổ chai Hồn Đá Đỏ (Soul Stone) mở khóa ở Lâu Đài Lv.30 và Season 1, phân tích chi phí 4 Bậc Thức Tỉnh (9 Soul Stones + 345–385 Mảnh Tướng), lý do tuyệt đối cấm tiêu Điểm Vinh Dự từ Lv.15–Lv.29, và bảng so sánh ngân sách thức tỉnh giữa 3 Phe phái (Bộ Lạc, Liên Minh, Thiên Nhiên).",
    en: "Master the 40,000 Guild Honor Freeze strategy, understand why Soul Stones unlock at Castle Lv.30 and Season 1, analyze the 4-Tier Awakening cost matrix (9 Soul Stones + 345–385 Hero Shards), and plan your 3-Faction Awakening budget across Horde, League, and Nature.",
  },
  tldr: {
    coreRule: {
      vi: "**Nút cổ chai Hồn Đá Đỏ (Soul Stone):** Nguyên liệu bắt buộc để Thức Tỉnh (Awakening) Tướng Vàng 5 Sao Đỏ lên Thần Thoại Đỏ (Mythic) qua 4 Bậc.\n• **Tổng định mức Cố định:** Cần chính xác `9` Hồn Đá Đỏ (`1 + 2 + 2 + 4`) cộng với `345–385` Mảnh Tướng (`55–65` + `75–95` + `85–95` + `130`, cộng dồn `185` mảnh ở Bậc III).",
      en: "**The Soul Stone Bottleneck:** Mandatory material required to Awaken a 5-Red-Star Legendary SSR Hero to Ascended Mythic quality across 4 Awakening Tiers.\n• **Fixed Total Cost:** Demands `9` Soul Stones (`1 + 2 + 2 + 4`) plus `345–385` Hero Shards (`55–65` + `75–95` + `85–95` + `130`, hitting `185` cumulative shards by Tier III).",
    },
    immediateAction: {
      vi: "**Lệnh Đóng Băng Điểm Vinh Dự (Lv.15–Lv.29):** Khóa chặt quỹ dự phòng tối thiểu `40,000` Điểm Vinh Dự (hoặc sàn `15,000`–`18,000` Xu Vinh Quang) trước khi lên Lv.30.\n• **Mua ngay khi mở kệ:** Chạm Lâu Đài Lv.30 (`40,000` Điểm/viên, `360,000` Điểm/9 viên) hoặc Tiệm S1 (`6,000` Xu/viên, `54,000` Xu/9 viên xoay tua 3 tuần: League ➔ Horde ➔ Nature) là xúc ngay.",
      en: "**The 40,000 Guild Honor Freeze (Lv.15–Lv.29):** Lock a minimum reserve floor of `40,000` Guild Honor (or `15,000`–`18,000` Guild Coins) before reaching Castle Lv.30.\n• **Buy on Sight at Unlock:** Hit Castle Lv.30 (`40,000` Honor/stone, `360,000` for 9) or Season 1 Guild Coin Shop (`6,000` Coins/stone, `54,000` for 9 on a 3-week League ➔ Horde ➔ Nature cycle) and buy immediately.",
    },
    strictTaboo: {
      vi: "**Cấm xả điểm sớm & Cấm thức tỉnh tướng phụ:** CẤM tiêu sạch Điểm Vinh Dự mua mảnh lẻ từ Lv.15–Lv.29 hoặc thức tỉnh tướng ngoài meta (Astrologer, Wilderness Hunter, Swordmaster, Barbarian).\n• **Bẫy Quân Trang 12,000 Xu:** CẤM mua Universal Legendary Troop Skin (`12,000` Xu / `72,000` Điểm / `1,440` KC quy đổi) khi chưa sở hữu Quân trang Vàng gốc vì vật phẩm này chỉ nâng sao, không mở khóa lính mới!",
      en: "**Zero Early Draining & Off-Meta Awakening:** NEVER drain Guild Honor on minor shards from Lv.15–Lv.29 or awaken off-meta heroes (Astrologer, Wilderness Hunter, Swordmaster, Barbarian).\n• **The 12,000-Coin Troop Skin Trap:** NEVER buy Universal Legendary Troop Skin (`12,000` Coins / `72,000` Honor / `1,440` Diamonds eq.) without owning the base Gold skin—it only upgrades stars and cannot unlock a skin!",
    },
  },
  keyTakeaways: [
    {
      vi: "**Định mức Kép Hồn Đá Đỏ (Dual Soul Stone Pricing):** Tại Cửa hàng Vinh Dự Bang Lâu Đài Lv.30, Hồn Đá Đỏ có giá `40,000` Điểm Vinh Dự/viên (`360,000` Điểm cho bộ `9` viên).\n• **Chuẩn Xoay Tua Season 1+:** Tại Tiệm Xu Vinh Quang Hội S1+, Hồn Đá theo Hệ có giá `6,000` Xu/viên (`54,000` Xu cho `9` viên), xoay tua cố định 3 tuần: Liên Minh (League) ➔ Bộ Lạc (Horde) ➔ Thiên Nhiên (Nature).",
      en: "**Dual Soul Stone Pricing Standard:** In the Castle Lv.30 Guild Honor Shop, Soul Stones cost `40,000` Guild Honor Points each (`360,000` Points for a full set of `9`).\n• **Season 1+ Rotation Standard:** In the S1+ Guild Coin Shop, faction Soul Stones cost `6,000` Guild Coins each (`54,000` Coins for `9`), rotating every 3 weeks: League ➔ Horde ➔ Nature.",
    },
    {
      vi: "**Ma trận Chi phí 4 Bậc Thức Tỉnh (4-Tier Awakening Matrix):** Tổng chi phí hoàn tất 1 tướng là `9` Hồn Đá Đỏ + `345–385` Mảnh Tướng (`345` đến `385` mảnh, mốc `50`–`100` mảnh đầu).\n• **Chi tiết 4 Bậc:** Bậc I (`1` Đá + `55–65` Mảnh); Bậc II (`2` Đá + `75–95` Mảnh); Bậc III (`2` Đá + `85–95` Mảnh); Bậc IV (`4` Đá + `130` Mảnh, `160,000` Điểm / `24,000` Xu).",
      en: "**4-Tier Awakening Cost Matrix:** Fully awakening 1 hero requires `9` Soul Stones + `345–385` Hero Shards (`345` to `385` shards total, starting with `50`–`100` early shards).\n• **Tier Breakdown:** Tier I (`1` Stone + `55–65` Shards); Tier II (`2` Stones + `75–95` Shards); Tier III (`2` Stones + `85–95` Shards); Tier IV (`4` Stones + `130` Shards, `160,000` Honor / `24,000` Coins).",
    },
    {
      vi: "**Lợi thế Kinh tế Tuyệt đối của Phe Bộ Lạc (Horde Economy Edge):** Bộ Lạc dùng 5 Tướng Đỏ gốc + 1 Tướng Vàng Thức tỉnh (Soulmancer hoặc Warlock), chỉ tốn đúng `9` Hồn Đá (`360,000` Điểm / `54,000` Xu).\n• **Áp lực Liên Minh & Thiên Nhiên:** Liên Minh (Pyromancer, Adjudicator, Nun) và Thiên Nhiên (Pixie, Forest Maiden, Sage) cần 2–3 tướng, tốn `18–27` Đá (`720,000`–`1,080,000` Điểm / `108,000`–`162,000` Xu).",
      en: "**Horde's Supreme Soul Stone Economy Advantage:** Endgame Horde runs 5 Native Mythics + 1 Awakened SSR (Soulmancer or Warlock), needing only `9` Soul Stones (`360,000` Honor / `54,000` Coins).\n• **League & Nature Burden:** League (Pyromancer, Adjudicator, Nun) and Nature (Pixie, Forest Maiden, Sage) need 2–3 Awakened SSRs, costing `18–27` Stones (`720,000`–`1,080,000` Honor / `108,000`–`162,000` Coins).",
    },
    {
      vi: "**Cạm bẫy Universal Legendary Troop Skin (`12,000` Xu) & Ngưỡng Dư An Toàn:** Cấm mua Quân Trang Vạn Năng `12,000` Xu khi chưa mở khóa Quân trang Vàng gốc.\n• **Kỷ luật Giải ngân:** Chỉ Bộ Lạc đã xong `9` Đá và có lính Vàng mới dùng `12,000` Xu nâng sao; chỉ mua Mảnh Vàng khi vượt sàn `40,000`–`80,000` Điểm (`100,000` Điểm dư) hoặc `12,000`–`18,000` Xu.",
      en: "**The `12,000`-Coin Universal Legendary Troop Skin Trap & Safe Surplus:** Never buy the `12,000`-Coin Universal Legendary Troop Skin without owning the base Gold skin first.\n• **Surplus Rule:** Only Horde players with `9` Stones done and a Gold skin can spend `12,000` Coins on stars; only buy Shards above the `40,000`–`80,000` Honor (`100,000` buffer) or `12,000`–`18,000` Coins floor.",
    },
  ],
  keywords: [
    "hon da do",
    "hồn đá đỏ",
    "soul stone",
    "soul stones",
    "guild honor freeze",
    "đóng băng điểm vinh dự",
    "40,000",
    "360,000",
    "6,000",
    "54,000",
    "720,000",
    "1,080,000",
    "108,000",
    "162,000",
    "345–385",
    "thức tỉnh tướng",
    "hero awakening",
    "universal legendary troop skin",
    "quân trang vạn năng",
    "soulmancer",
    "warlock",
    "pyromancer",
    "adjudicator",
    "pixie",
  ],
  sourceFiles: [
    "docs/06-game-guides/07-standardized-web-guides/group-7-shops-and-economy/7.2-guild-honor-freeze.md",
    "docs/06-game-guides/01-core-strategic-topics/topic-5-shops-currencies-military-gear.md",
    "docs/06-game-guides/03-data-tables-and-mechanics/topheroes-tables-analysis-summary.md",
  ],
  freeSections: [
    {
      id: "overview-and-mechanics",
      title: {
        vi: "1. Giải thích Cơ chế Cốt lõi: Tại sao Hồn Đá Đỏ (Soul Stone) là Nút Cổ Chai Lớn Nhất Game?",
        en: "1. Core Mechanics: Why Soul Stones Are the Biggest Progression Bottleneck in Top Heroes",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "**Giai đoạn Đầu Game (Castle Lv.1 – Lv.25):** Người chơi thường chỉ quan tâm đến Mảnh Tướng Vàng Vạn Năng (Universal Legendary Hero Shards) để nâng sao đội hình.\n• **Bước ngoặt Giữa & Cuối Game:** Khoảng cách sức mạnh thực chiến với đội hình Top Server nằm ở cơ chế Thức Tỉnh Tướng (Hero Awakening) — nâng cấp Tướng Vàng (Legendary SSR) lên Thần Thoại Đỏ (Ascended Mythic).",
            en: "**Early Game Focus (Castle Lv.1 – Lv.25):** Players mostly focus on Universal Legendary Hero Shards to star up their initial roster.\n• **Mid & Late Game Inflection Point:** The true combat power gap separating top-server squads is defined by Hero Awakening—ascending a Legendary SSR Hero into an Ascended Mythic powerhouse.",
          },
        },
        {
          type: "media_spotlight",
          mediaCode: "MED-7.2-01",
          tier: "tier2_annotated_ui",
          title: {
            vi: "Hệ Sinh Thái Hồn Đá Đỏ (Soul Stones) & Sự Tiến Hóa Kệ Hàng Cửa Hàng Vinh Dự Bang Ở Lv.30 / Season 1",
            en: "The Soul Stone Ecosystem & Dynamic Guild Honor / Guild Coin Shop Evolution at Lv.30 / Season 1",
          },
          description: {
            vi: "Minh họa bộ vật phẩm Hồn Đá Đỏ theo 3 Phe phái (League Soul Stone, Horde Soul Stone, Nature Soul Stone), Rương Hồn Đá Tự Chọn (Soul Stone Choice Chest) và cơ chế ẩn kệ hàng từ Lâu Đài Lv.15–Lv.29 trước khi mở khóa ở mốc Lâu Đài Lv.30 (40,000 Điểm Vinh Dự / viên) và Season 1 (6,000 Xu Vinh Quang Hội / viên).",
            en: "Visual breakdown of the 3 Faction Soul Stones (League Soul Stone, Horde Soul Stone, Nature Soul Stone), the Soul Stone Choice Chest, and the hidden shelf mechanic from Castle Lv.15–Lv.29 before unlocking at Castle Lv.30 (40,000 Guild Honor Points per stone) and Season 1 (6,000 Guild Coins per stone).",
          },
          annotations: [
            {
              kind: "do",
              label: {
                vi: "Khóa chặt Quỹ Dự Phòng Đóng Băng 40,000 Điểm Vinh Dự / 18,000 Xu Vinh Quang từ Lv.15–Lv.29",
                en: "Lock Your 40,000 Guild Honor / 18,000 Guild Coin Freeze Reserve from Lv.15–Lv.29",
              },
              detail: {
                vi: "Vì kệ hàng Hồn Đá Đỏ bị ẩn trước Lâu Đài Lv.30 và Season 1, việc tích trữ sẵn tối thiểu 40,000 Điểm Vinh Dự (chuẩn Lv.30) hoặc 12,000–18,000 Xu Vinh Quang Hội (chuẩn xoay tua S1) giúp bạn mua ngay viên Hồn Đá đầu tiên ngay ngày mở khóa mà không bị chậm tiến độ 2–3 tháng.",
                en: "Because the Soul Stone slot remains hidden before Castle Lv.30 and Season 1, banking at least 40,000 Guild Honor Points (Lv.30 standard) or 12,000–18,000 Guild Coins (S1 rotation standard) lets you purchase your first Soul Stone the exact day it unlocks without suffering a 2–3 month delay.",
              },
            },
            {
              kind: "info",
              label: {
                vi: "Định mức 9 Hồn Đá Đỏ (1 + 2 + 2 + 4) + 345–385 Mảnh Tướng cho mỗi Tướng Vàng Hóa Đỏ",
                en: "9 Soul Stones (1 + 2 + 2 + 4) + 345–385 Hero Shards per Awakened Mythic Hero",
              },
              detail: {
                vi: "Mỗi tướng Vàng đạt 5 Sao Đỏ (10 Sao) cần vượt qua 4 Bậc Thức Tỉnh (55–65, 75–95, 85–95 và 130 Mảnh Tướng) tương đương 360,000 Điểm Vinh Dự hoặc 54,000 Xu Vinh Quang Hội để chính thức Hóa Đỏ (Ascended Mythic).",
                en: "Every 5-Red-Star (10-Star) SSR hero must complete 4 Awakening Tiers (55–65, 75–95, 85–95, and 130 Hero Shards) costing 360,000 Guild Honor Points or 54,000 Guild Coins in total to achieve full Mythic Ascension.",
              },
            },
            {
              kind: "dont",
              label: {
                vi: "Cấm mở sớm Rương Hồn Đá Tự Chọn (Soul Stone Choice Chest) hoặc rải lẻ Bậc I cho nhiều tướng",
                en: "Never Open Soul Stone Choice Chests Early or Spread Tier I Across Multiple Heroes",
              },
              detail: {
                vi: "Giữ nguyên Rương Hồn Đá Tự Chọn trong túi đồ cho đến khi gom đủ 345–385 Mảnh Tướng và chốt dứt điểm từng tướng trụ cột (Pyromancer, Adjudicator, Pixie, Soulmancer, Warlock) lên thẳng Bậc II / Bậc IV.",
                en: "Keep Soul Stone Choice Chests sealed in your inventory until you have gathered the required 345–385 Hero Shards and can push a single core hero (Pyromancer, Adjudicator, Pixie, Soulmancer, Warlock) straight to Tier II and Tier IV.",
              },
            },
          ],
        },
      ],
      subSections: [
        {
          id: "sub-1-1-legendary-to-mythic-awakening",
          title: {
            vi: "1.1. Cơ chế Thức Tỉnh Tướng Vàng lên Đỏ (Legendary ➔ Mythic Awakening)",
            en: "1.1. Legendary SSR to Ascended Mythic Awakening Mechanics",
          },
          blocks: [
            {
              type: "list",
              ordered: true,
              items: [
                {
                  vi: "**Điều kiện mở Cây Thức Tỉnh:** Tướng Vàng cốt lõi (Pyromancer, Adjudicator, Nun; Soulmancer, Warlock; Pixie, Forest Maiden, Sage) đạt `10` Sao (5 Sao Đỏ) sẽ mở 4 Bậc Thức Tỉnh (Tiers I ➔ IV).",
                  en: "**Awakening Tree Prerequisite:** Core SSR Heroes (Pyromancer, Adjudicator, Nun; Soulmancer, Warlock; Pixie, Forest Maiden, Sage) reaching `10` Stars (Red 5-Star) unlock the 4-Tier Awakening Tree (Tiers I ➔ IV).",
                },
                {
                  vi: "**Đột phá Thần Thoại Đỏ:** Hoàn tất 4 bậc giúp tướng Vàng hóa Đỏ (Ascended Mythic), nâng cấp kỹ năng chủ động/bị động, tăng vọt trần chỉ số và kích hoạt Hào quang Đỏ (Mythic Faction Aura).",
                  en: "**Ascended Mythic Breakthrough:** Completing all 4 Awakening Tiers transforms the SSR Hero into an Ascended Mythic unit, upgrading skills, raising stat ceilings, and activating Mythic Faction Aura.",
                },
                {
                  vi: "**Định mức nguyên liệu cố định:** Mỗi tướng cần đúng `9` Hồn Đá Đỏ (`1 + 2 + 2 + 4`) cộng `345–385` Mảnh Tướng (`55–65` + `75–95` + `85–95` + `130` mảnh riêng hoặc Mảnh Vàng Vạn Năng).",
                  en: "**Fixed Total Material Requirement:** Each SSR Hero requires `9` Soul Stones (`1 + 2 + 2 + 4`) plus `345–385` Hero Shards (`55–65` + `75–95` + `85–95` + `130` specific or Universal Shards).",
                },
              ],
            },
          ],
        },
        {
          id: "sub-1-2-dynamic-shop-evolution",
          title: {
            vi: "1.2. Sự Tiến Hóa Ẩn của Cửa Hàng Vinh Dự Bang & Tiệm Xu Vinh Quang Hội",
            en: "1.2. Hidden Shelf Evolution of the Guild Honor Shop & Guild Coin Shop",
          },
          blocks: [
            {
              type: "paragraph",
              text: {
                vi: "**Cơ chế Cửa hàng Động (Dynamic Evolving Shop):** Từ Lâu Đài Lv.15 – Lv.29 (Pre-Season), Hồn Đá Đỏ bị ẩn hoàn toàn trên kệ; người chơi chỉ thấy Mảnh Vàng Vạn Năng và Universal Legendary Troop Skin (`12,000` Xu).\n• **Mở khóa ở Lv.30 & Season 1:** Chỉ khi Lâu Đài chạm mốc Lv.30 hoặc máy chủ bước vào Season 1, ô hàng đầu tiên mới mở bán Hồn Đá Đỏ theo 2 định mức tiền tệ chuẩn dưới đây:",
                en: "**Dynamic Evolving Shop Mechanics:** From Castle Lv.15 to Lv.29 (Pre-Season), Soul Stones are hidden from the shelves—players only see Universal Hero Shards and Universal Legendary Troop Skin (`12,000` Coins).\n• **Unlock at Lv.30 & Season 1:** Only when your Castle hits Lv.30 or your server enters Season 1 does the top slot unlock Soul Stones under two standard pricing models:",
              },
            },
            {
              type: "list",
              ordered: false,
              items: [
                {
                  vi: "**Chuẩn Vinh Dự Bang Lv.30 (Rương Tự Chọn):** Giá `40,000` Điểm Vinh Dự/viên (tổng `360,000` Điểm Vinh Dự cho trọn bộ `9` viên), giới hạn mua theo chu kỳ làm mới cửa hàng.",
                  en: "**Castle Lv.30 Guild Honor Standard (Choice Chest):** Priced at `40,000` Guild Honor Points per stone (`360,000` Guild Honor Points for a full set of `9` stones), capped by shop refresh.",
                },
                {
                  vi: "**Chuẩn Xu Vinh Quang Hội S1 (Xoay Tua 3 Tuần):** Giá `6,000` Xu Vinh Quang Hội/viên (tổng `54,000` Xu cho `9` viên), xoay tua cố định 3 tuần: Liên Minh (League) ➔ Bộ Lạc (Horde) ➔ Thiên Nhiên (Nature).",
                  en: "**Season 1 Guild Coin Standard (3-Week Rotation):** Priced at `6,000` Guild Coins per stone (`54,000` Guild Coins for `9` stones), rotating on a 3-week cycle: League ➔ Horde ➔ Nature.",
                },
              ],
            },
            {
              type: "callout",
              variant: "warning",
              title: {
                vi: "Hiệu Ứng 'Ẩn Kệ Hàng' Từ Lv.15 Đến Lv.29 Làm Chậm Tiến Độ 2–3 Tháng",
                en: "The Lv.15–Lv.29 'Hidden Shelf' Trap That Delays Awakening by 2–3 Months",
              },
              content: {
                vi: "**Ảo giác Kệ hàng Lv.15–Lv.29:** Vì Hồn Đá Đỏ bị ẩn trước Lâu Đài Lv.30 / Season 1, `90%` người chơi mới tưởng Cửa hàng Vinh Dự Bang chỉ dùng để mua Mảnh Vàng Vạn Năng hàng tuần.\n• **Bi kịch Rỗng Ví Ngày Mở Khóa:** Tiêu sạch điểm Guild Race khiến ngày lên Lv.30 / S1 nhìn thấy Hồn Đá Đỏ (`40,000` Điểm hoặc `6,000` Xu) nhưng ví rỗng túi, làm chậm Thức tỉnh Đội 1 từ `2–3` tháng!",
                en: "**The Lv.15–Lv.29 Shelf Illusion:** Because Soul Stones are hidden prior to Castle Lv.30 and Season 1, `90%` of new players assume the Guild Shop is merely for weekly Universal Hero Shards.\n• **Unlock Day Bankruptcy:** Draining Guild Race points leaves your wallet empty when Soul Stones (`40,000` Guild Honor or `6,000` Guild Coins) appear at Lv.30 / Season 1—delaying Queue 1 Awakening by `2–3` months!",
              },
            },
          ],
        },
      ],
    },
    {
      id: "f2p-core-rules",
      title: {
        vi: "2. Chiến thuật Tối ưu cho F2P & Low-Spender: Lộ trình Thực thi 'Đóng Băng 40,000 Điểm'",
        en: "2. F2P & Low-Spender Strategy: Executing the '40,000 Guild Honor Freeze' Roadmap",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "**Lộ trình Đóng Băng & Phân bổ 3 Phe:** Để không đứt gãy nguyên liệu Thức tỉnh ở Lv.30 và Season 1, người chơi F2P/Low-Spender phải tuân thủ quy trình tích lũy và dồn Hồn Đá Đỏ theo từng Phe.",
            en: "**Freeze & 3-Faction Allocation Roadmap:** To avoid Awakening material starvation at Castle Lv.30 and Season 1, every F2P and Low-Spender must follow the freeze protocol and faction Soul Stone roadmap.",
          },
        },
        {
          type: "media_spotlight",
          mediaCode: "MED-7.2-02",
          tier: "tier2_annotated_ui",
          title: {
            vi: "Giải Phẫu Giao Diện Cửa Hàng Vinh Dự Bang: Ô Hồn Đá Đỏ Số 1 vs Bẫy Quân Trang Vạn Năng 12,000 Xu",
            en: "Guild Honor Shop Interface Anatomy: Top-Slot Soul Stone vs. The 12,000-Coin Universal Legendary Troop Skin Trap",
          },
          description: {
            vi: "Ảnh chụp màn hình Cửa hàng Vinh Dự Bang / Tiệm Xu Vinh Quang Hội khoanh vùng xanh ô Hồn Đá Đỏ ở vị trí đầu tiên (40,000 Điểm Vinh Dự / 6,000 Xu Vinh Quang), đánh dấu chu kỳ xoay tua 3 tuần (League ➔ Horde ➔ Nature) và gạch chéo đỏ cảnh báo nguy hiểm lên ô Universal Legendary Troop Skin (12,000 Xu).",
            en: "Annotated screenshot of the Guild Honor / Guild Coin Shop highlighting the top-slot Soul Stone in green (40,000 Guild Honor / 6,000 Guild Coins), marking the 3-week faction rotation (League ➔ Horde ➔ Nature), and placing a red danger cross over the Universal Legendary Troop Skin (12,000 Guild Coins).",
          },
          annotations: [
            {
              kind: "do",
              label: {
                vi: "Ưu tiên số 1: Xúc ngay Hồn Đá Đỏ Hệ Đội 1 (40,000 Điểm Vinh Dự / 6,000 Xu Vinh Quang)",
                en: "Priority #1: Buy Main-Faction Soul Stones Immediately (40,000 Guild Honor / 6,000 Guild Coins)",
              },
              detail: {
                vi: "Chỉ mua Hồn Đá Đỏ đúng Hệ của Đội 1 trong chu kỳ xoay tua 3 tuần (Tuần 1 Liên Minh ➔ Tuần 2 Bộ Lạc ➔ Tuần 3 Thiên Nhiên) cho đến khi hoàn tất đủ 9 viên (360,000 Điểm hoặc 54,000 Xu) cho tướng trụ cột.",
                en: "Only purchase Soul Stones matching your Queue 1 faction during the 3-week rotation (Week 1 League ➔ Week 2 Horde ➔ Week 3 Nature) until you complete all 9 stones (360,000 Honor or 54,000 Coins) for your primary carry.",
              },
            },
            {
              kind: "info",
              label: {
                vi: "Đồng bộ xả Hồn Đá Đỏ vào Thứ Năm Kỳ GAR/KvK (GAR / KvK Day 4)",
                en: "Synchronize Soul Stone Upgrades with GAR/KvK Thursday (GAR / KvK Day 4)",
              },
              detail: {
                vi: "Sau khi mua Hồn Đá Đỏ về túi đồ, hãy giữ nguyên chờ đến Ngày 4 (Thứ Năm — Hero Development Day) Kỳ GAR/KvK hoặc Sự kiện Phụ 3 Ngày Soul Stone để vừa lên bậc Thức tỉnh vừa ăn trọn mốc điểm xếp hạng.",
                en: "After purchasing Soul Stones from the shop, hold them in your bag until Day 4 (Thursday — Hero Development Day) of GAR/KvK or the 3-Day Soul Stone side event to double-dip on Awakening stats and leaderboard milestone rewards.",
              },
            },
            {
              kind: "dont",
              label: {
                vi: "CẤM MUA Universal Legendary Troop Skin (12,000 Xu) khi chưa có Quân trang Vàng gốc!",
                en: "NEVER BUY Universal Legendary Troop Skin (12,000 Coins) Without a Base Gold Troop Skin!",
              },
              detail: {
                vi: "Vật phẩm Universal Legendary Troop Skin giá 12,000 Xu chỉ là phôi nâng sao cho Quân trang Vàng đã sở hữu, hoàn toàn KHÔNG THỂ mở khóa Kỵ Binh Hạng Nặng hay Quân trang mới. Mua nhầm khi chưa có lính gốc sẽ làm đóng băng vĩnh viễn 12,000 Xu (tương đương 2 viên Hồn Đá Đỏ S1)!",
                en: "The 12,000-Coin Universal Legendary Troop Skin is strictly a star-up material for an already unlocked Gold Troop Skin—it CANNOT unlock Heavy Cavalry or any new troop skin. Buying it without a base Gold skin permanently bricks 12,000 Coins (worth 2 Season 1 Soul Stones)!",
              },
            },
          ],
        },
      ],
      subSections: [
        {
          id: "sub-2-1-lv15-to-lv29-freeze-protocol",
          title: {
            vi: "2.1. Giai đoạn 1: Tích Lũy Tuyệt Đối từ Lâu Đài Lv.15 ➔ Lv.29 (Giai đoạn Đóng Băng)",
            en: "2.1. Phase 1: Absolute Accumulation from Castle Lv.15 ➔ Lv.29 (The Freeze Phase)",
          },
          blocks: [
            {
              type: "list",
              ordered: false,
              items: [
                {
                  vi: "**Nguồn thu Điểm Vinh Dự & Xu Vinh Quang:** Cày từ 9 mốc Rương Cá Nhân & Rương Bang Hội trong sự kiện Đua Bang Hội (Guild Race — Thi Đấu Hội) mỗi 2 tuần, kết hợp săn Cự Thú (Behemoth).",
                  en: "**Guild Honor & Guild Coin Income:** Earned by clearing all 9 Personal and Guild Milestone Chests in the Guild Race, supplemented by Behemoth raids and Guild warfare.",
                },
                {
                  vi: "**Quy tắc Bất khả xâm phạm:** Từ lúc mở tính năng Bang hội ở Lv.15 đến khi Lâu Đài đạt Lv.29, coi Điểm Vinh Dự Bang và Xu Vinh Quang Hội là tài sản dự trữ chiến lược bất khả xâm phạm.",
                  en: "**Inviolable Reserve Rule:** From the moment Guild features unlock at Lv.15 until your Castle reaches Lv.29, treat Guild Honor Points and Guild Coins as a locked strategic reserve.",
                },
                {
                  vi: "**Kỷ luật Khóa Ví Tuyệt Đối:** Ngưng mua cả Mảnh Vàng Vạn Năng cho đến khi tích đủ quỹ gốc tối thiểu `40,000` Điểm Vinh Dự (Lv.30) hoặc `12,000`–`18,000` Xu Vinh Quang Hội (S1).",
                  en: "**Strict Wallet Lock Discipline:** Pause even Universal Legendary Hero Shard purchases until banking the minimum reserve floor of `40,000` Guild Honor Points (Lv.30) or `12,000`–`18,000` Guild Coins (S1).",
                },
              ],
            },
          ],
        },
        {
          id: "sub-2-2-faction-awakening-targets",
          title: {
            vi: "2.2. Giai đoạn 2: Lựa Chọn Mục Tiêu Thức Tỉnh Đầu Tiên Theo 3 Phe Phái",
            en: "2.2. Phase 2: Selecting Your First Awakening Target Across the 3 Factions",
          },
          blocks: [
            {
              type: "paragraph",
              text: {
                vi: "**Quy tắc Dồn 1 Tướng Duy Nhất:** Mỗi tướng Vàng cần tới `9` Hồn Đá Đỏ + `345–385` Mảnh Tướng mới hoàn tất 4 bậc Thức tỉnh (điểm gãy Bậc II tốn `3` viên cộng dồn và Bậc IV Hóa Đỏ tốn `9` viên cộng dồn).\n• **Cấm rải lẻ Bậc I:** Tuyệt đối không chia lẻ mỗi tướng 1 viên Bậc I; hãy tập trung dồn đủ `9` viên cho duy nhất 1 tướng trụ cột số 1 của Đội 1:",
                en: "**Single-Hero Focus Rule:** Each SSR Hero demands `9` Soul Stones + `345–385` Hero Shards to complete all 4 Awakening Tiers (with Tier II Ultimate upgrade at `3` stones and Tier IV Mythic Ascension at `9` stones).\n• **Zero Tier-I Spreading:** Never spread 1 stone across multiple heroes; funnel all `9` stones into your single #1 core hero in Queue 1 first:",
              },
            },
            {
              type: "roadmap",
              steps: [
                {
                  badge: {
                    vi: "PHE BỘ LẠC (HORDE)",
                    en: "HORDE FACTION",
                  },
                  title: {
                    vi: "Lợi thế Kinh tế Hồn Đá lớn nhất game: Chỉ cần 1 Tướng Vàng Thức Tỉnh (Soulmancer hoặc Warlock)",
                    en: "Biggest Soul Stone Economy Edge: Only 1 Awakened SSR Needed (Soulmancer or Warlock)",
                  },
                  timing: {
                    vi: "Tổng ngân sách: 9 Hồn Đá Đỏ (360,000 Điểm Vinh Dự hoặc 54,000 Xu Vinh Quang)",
                    en: "Total Budget: 9 Soul Stones (360,000 Guild Honor or 54,000 Guild Coins)",
                  },
                  description: {
                    vi: "**Cấu trúc 5 Mythic gốc:** Đội hình chuẩn Bộ Lạc gồm 5 Tướng Đỏ gốc (Desert Prince, Wukong, Storm Maiden, Beastmaster, Witch) + 1 Tướng Vàng Thức Tỉnh là Soulmancer hoặc Warlock.\n• **Giải phóng Quỹ Xu S1:** Sau khi gom đủ `9` viên cho Soulmancer / Warlock, Bộ Lạc giải phóng hoàn toàn Xu Vinh Quang để mua Mảnh Vũ Khí Độc Quyền và nâng sao Universal Legendary Troop Skin (`12,000` Xu).",
                    en: "**5-Native-Mythic Roster:** Endgame Horde fields 5 Native Mythics (Desert Prince, Wukong, Storm Maiden, Beastmaster, Witch) + 1 Awakened SSR: either Soulmancer or Warlock.\n• **Permanent Coin Liberation:** Once those `9` stones for Soulmancer / Warlock are done, Horde players free up their Guild Coins for Exclusive Weapon Shards and `12,000`-Coin Universal Legendary Troop Skin upgrades.",
                  },
                },
                {
                  badge: {
                    vi: "PHE LIÊN MINH (LEAGUE)",
                    en: "LEAGUE FACTION",
                  },
                  title: {
                    vi: "Đội hình 2–3 Tướng Vàng Thức Tỉnh: Ưu tiên Pyromancer ➔ Adjudicator ➔ Nun / Bard",
                    en: "2–3 Awakened SSR Lineup: Priority Pyromancer ➔ Adjudicator ➔ Nun / Bard",
                  },
                  timing: {
                    vi: "Tổng ngân sách: 18–27 Hồn Đá Đỏ (720,000 – 1,080,000 Điểm Vinh Dự hoặc 108,000 – 162,000 Xu)",
                    en: "Total Budget: 18–27 Soul Stones (720,000 – 1,080,000 Guild Honor or 108,000 – 162,000 Guild Coins)",
                  },
                  description: {
                    vi: "**Cấu trúc 2–3 Tướng Thức Tỉnh:** Đội hình Liên Minh sử dụng 2 đến 3 tướng Vàng cần thức tỉnh (Pyromancer, Adjudicator, Nun hoặc Bard).\n• **Thứ tự Ưu tiên:** Dồn `9` viên đầu tiên thức tỉnh Pyromancer (nổ sát thương diện rộng) hoặc Adjudicator (dàn chắn bất tử tuyến đầu) trước khi gom bộ `9` viên thứ hai và thứ ba.",
                    en: "**2–3 Awakened SSR Structure:** Standard League lineups rely on 2 to 3 Awakened SSRs (Pyromancer, Adjudicator, Nun, or Bard).\n• **Priority Order:** Funnel your first `9` Soul Stones into Pyromancer (massive AoE burst spike) or Adjudicator (unbreakable frontline tank) before starting your second and third sets of `9` stones.",
                  },
                },
                {
                  badge: {
                    vi: "PHE THIÊN NHIÊN (NATURE)",
                    en: "NATURE FACTION",
                  },
                  title: {
                    vi: "Đội hình 2–3 Tướng Vàng Thức Tỉnh: Ưu tiên Pixie ➔ Forest Maiden / Sage",
                    en: "2–3 Awakened SSR Lineup: Priority Pixie ➔ Forest Maiden / Sage",
                  },
                  timing: {
                    vi: "Tổng ngân sách: 18–27 Hồn Đá Đỏ (720,000 – 1,080,000 Điểm Vinh Dự hoặc 108,000 – 162,000 Xu)",
                    en: "Total Budget: 18–27 Soul Stones (720,000 – 1,080,000 Guild Honor or 108,000 – 162,000 Guild Coins)",
                  },
                  description: {
                    vi: "**Cấu trúc 2–3 Tướng Thức Tỉnh:** Đội hình Thiên Nhiên cần thức tỉnh 2 đến 3 tướng Vàng (Pixie, Forest Maiden, cùng Sage / Druid / Windwalker).\n• **Thứ tự Ưu tiên:** Bắt buộc dồn `9` viên đầu tiên cho Pixie (sát thương chủ lực đi cặp cùng Tidecaller), sau đó mới chuyển sang Forest Maiden hoặc Sage.",
                    en: "**2–3 Awakened SSR Structure:** Nature lineups require awakening 2 to 3 SSR heroes (Pixie, Forest Maiden, plus Sage / Druid / Windwalker).\n• **Priority Order:** Always invest your first `9` Soul Stones into Pixie (primary AoE carry paired with Tidecaller), then transition to Forest Maiden or Sage.",
                  },
                },
              ],
            },
            {
              type: "checklist",
              checklistId: "checklist-7-2-guild-honor-freeze",
              title: {
                vi: "Checklist Hành Động Hàng Tuần Tại Cửa Hàng Vinh Dự Bang (Guild Honor Weekly Checklist)",
                en: "Weekly Guild Honor & Soul Stone Execution Checklist",
              },
              description: {
                vi: "Kiểm tra đủ 4 nguyên tắc dưới đây vào mỗi đầu tuần mới (sau 00:00 UTC / 07:00 sáng Giờ VN Thứ Hai) trước khi tiêu bất kỳ Điểm Vinh Dự hay Xu Vinh Quang Hội nào:",
                en: "Verify all 4 discipline rules below every Monday (after the 00:00 UTC reset) before spending any Guild Honor Points or Guild Coins:",
              },
              items: [
                {
                  id: "chk-7-2-monday-reserve-floor",
                  label: {
                    vi: "Kiểm tra số dư trước 00:00 UTC Thứ Hai (07:00 sáng Giờ VN): Giữ vững Ngưỡng Đóng Băng 40,000 Điểm / 18,000 Xu",
                    en: "Verify Balance Before Monday 00:00 UTC Reset: Maintain the 40,000 Honor / 18,000 Coin Floor",
                  },
                  detail: {
                    vi: "Đảm bảo số dư luôn nằm trên Ngưỡng Đóng Băng Cứng (40,000 Điểm Vinh Dự chuẩn Lv.30 hoặc 12,000–18,000 Xu Vinh Quang Hội chuẩn xoay tua S1) trước khi mua bất kỳ vật phẩm phụ nào.",
                    en: "Ensure your currency stays above the Hard Freeze Floor (40,000 Guild Honor Points for Lv.30 or 12,000–18,000 Guild Coins for S1 rotation) before buying any secondary items.",
                  },
                  badge: {
                    vi: "QUỸ DỰ PHÒNG",
                    en: "SAFETY FLOOR",
                  },
                },
                {
                  id: "chk-7-2-three-week-rotation",
                  label: {
                    vi: "Canh chuẩn chu kỳ xoay tua 3 tuần ở Season 1+ (League ➔ Horde ➔ Nature)",
                    en: "Track the 3-Week Season 1+ Faction Rotation (League ➔ Horde ➔ Nature)",
                  },
                  detail: {
                    vi: "Ghi nhớ thứ tự xoay tua cố định trên ô đầu tiên (6,000 Xu Vinh Quang Hội / viên): Tuần 1 Liên Minh ➔ Tuần 2 Bộ Lạc ➔ Tuần 3 Thiên Nhiên. Chỉ mua đúng Hồn Đá của Hệ Đội 1!",
                    en: "Follow the fixed top-slot rotation (6,000 Guild Coins per stone): Week 1 League ➔ Week 2 Horde ➔ Week 3 Nature. Exclusively buy Soul Stones matching your Queue 1 faction!",
                  },
                  badge: {
                    vi: "CHU KỲ 3 TUẦN",
                    en: "3-WEEK CYCLE",
                  },
                },
                {
                  id: "chk-7-2-single-hero-focus",
                  label: {
                    vi: "Khóa Rương Hồn Đá Tự Chọn & dồn trọn 9 viên + 345–385 Mảnh cho 1 Tướng duy nhất",
                    en: "Keep Soul Stone Choice Chests Sealed & Funnel All 9 Stones + 345–385 Shards into 1 Hero",
                  },
                  detail: {
                    vi: "Không mở sớm Soul Stone Choice Chest và không rải lẻ Bậc I cho nhiều tướng; tập trung chạm điểm gãy Bậc II (3 viên cộng dồn) và Bậc IV Hóa Đỏ (9 viên cộng dồn).",
                    en: "Keep Soul Stone Choice Chests sealed in bag and never spread Tier I across multiple units; rush Tier II (3 cumulative stones) and Tier IV Mythic (9 cumulative stones) on one hero at a time.",
                  },
                  badge: {
                    vi: "DỒN 1 TƯỚNG",
                    en: "SINGLE TARGET",
                  },
                },
                {
                  id: "chk-7-2-thursday-event-dump",
                  label: {
                    vi: "Chỉ bấm Thức tỉnh vào Thứ Năm Kỳ GAR/KvK (GAR / KvK Day 4) hoặc Sự kiện Phụ Soul Stone",
                    en: "Trigger Awakening Upgrades Only on GAR/KvK Thursday (GAR / KvK Day 4) or Soul Stone Side Events",
                  },
                  detail: {
                    vi: "Mua Hồn Đá Đỏ về túi đồ ngay khi xoay trúng hệ nhưng chờ đúng Thứ Năm Kỳ GAR/KvK (Hero Development Day) để bấm nâng bậc Thức tỉnh nhằm ăn trọn điểm sự kiện.",
                    en: "Buy your faction's Soul Stone immediately when it rotates in, but wait until GAR/KvK Thursday (Hero Development Day) to activate the Awakening node for maximum event points.",
                  },
                  badge: {
                    vi: "THỨ NĂM GAR/KVK",
                    en: "GAR/KVK THURSDAY",
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "common-pitfalls",
      title: {
        vi: "3. Những Cạm bẫy Phổ biến & Cách Phòng tránh (4 Critical Guild Honor & Soul Stone Pitfalls)",
        en: "3. Common Pitfalls & Min-Max Solutions (4 Critical Guild Honor & Soul Stone Pitfalls)",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "**Bốn Cạm bẫy Đốt Điểm Vinh Dự & Xu Vinh Quang:** Dưới đây là 4 sai lầm chí mạng khiến hàng loạt tài khoản F2P / Low-Spender bị kẹt cứng ở khung tướng Vàng suốt Season 1 – Season 2:",
            en: "**Four Destructive Guild Honor & Soul Stone Traps:** Below are the 4 critical mistakes that leave F2P and Low-Spender accounts stuck with unawakened SSR heroes throughout Season 1 and Season 2:",
          },
        },
        {
          type: "table",
          caption: {
            vi: "Bảng 4 Cạm Bẫy Điểm Vinh Dự Bang & Hồn Đá Đỏ Cần Tuyệt Đối Tránh",
            en: "4 Critical Guild Honor & Soul Stone Pitfalls vs. Min-Max Solutions",
          },
          headers: [
            {
              vi: "Sai lầm phổ biến (Account Traps)",
              en: "Common Pitfall (Account Trap)",
            },
            {
              vi: "Hậu quả lên Tiến độ Tài khoản",
              en: "Account Progression Penalty",
            },
            {
              vi: "Giải pháp tối ưu (Min-Max Solution)",
              en: "Optimal Min-Max Solution",
            },
          ],
          rows: [
            [
              {
                vi: "1. Đốt sạch Điểm Vinh Dự / Xu Vinh Quang mua Mảnh Vàng lẻ tẻ từ Lv.15–Lv.29",
                en: "1. Draining Guild Honor / Guild Coins on single SSR Shards from Lv.15–Lv.29 before Castle Lv.30 / Season 1",
              },
              {
                vi: "Khi vừa chạm Lâu Đài Lv.30 hoặc bước vào Season 1, nhìn thấy Hồn Đá Đỏ giá 40,000 Điểm Vinh Dự / 6,000 Xu Vinh Quang nhưng ví rỗng túi, làm chậm tiến độ Hóa Đỏ Đội 1 từ 2 đến 3 tháng.",
                en: "Reaching Castle Lv.30 or Season 1 with an empty wallet when 40,000 Guild Honor / 6,000 Guild Coin Soul Stones appear on the shelf, delaying Queue 1 Mythic Ascension by 2 to 3 months.",
              },
              {
                vi: "Áp dụng Lệnh Đóng Băng từ Lv.15–Lv.29: Chỉ mua Mảnh Vàng Vạn Năng bằng phần tiền dư ra phía trên Ngưỡng Đóng Băng Cứng (> 40,000 Điểm Vinh Dự hoặc > 18,000 Xu Vinh Quang).",
                en: "Enforce the Lv.15–Lv.29 Freeze: Only purchase Universal Legendary Hero Shards using surplus currency above your Hard Freeze Floor (> 40,000 Guild Honor or > 18,000 Guild Coins).",
              },
            ],
            [
              {
                vi: "2. Mở sớm Rương Hồn Đá Tự Chọn (Soul Stone Choice Chests) & dính bẫy Universal Legendary Troop Skin (12,000 Xu)",
                en: "2. Popping Soul Stone Choice Chests early & falling for the 12,000-Coin Universal Legendary Troop Skin trap",
              },
              {
                vi: "Mở sớm Rương Hồn Đá Tự Chọn dễ dẫn đến chọn sai hệ khi đổi meta; mua nhầm Universal Legendary Troop Skin (12,000 Xu) khi chưa có lính Vàng gốc khiến vật phẩm nằm chết trong kho vì nó chỉ nâng sao chứ không mở khóa lính mới.",
                en: "Opening Soul Stone Choice Chests prematurely risks locking stones into the wrong faction; buying Universal Legendary Troop Skin (12,000 Guild Coins) without owning the base Gold skin bricks 12,000 Coins since it only upgrades stars and cannot unlock a new skin.",
              },
              {
                vi: "Giữ nguyên Rương Hồn Đá Tự Chọn trong túi đồ cho đến khi gom đủ 345–385 Mảnh Tướng; tuyệt đối cấm mua Universal Legendary Troop Skin 12,000 Xu khi chưa sở hữu Quân trang Vàng gốc.",
                en: "Keep Soul Stone Choice Chests sealed in your inventory until you have all 345–385 Hero Shards ready; never buy the 12,000-Coin Universal Legendary Troop Skin unless you already own the base Gold Troop Skin.",
              },
            ],
            [
              {
                vi: "3. Thức tỉnh tướng Vàng ngoài Meta hoặc rải lẻ Bậc I (1 viên) cho 3 tướng cùng lúc",
                en: "3. Awakening off-meta SSR heroes or spreading Tier I (1 stone each) across multiple heroes simultaneously",
              },
              {
                vi: "Tốn 3 viên Hồn Đá và hàng trăm mảnh tướng nhưng cả 3 tướng đều kẹt ở Bậc I (chỉ cộng chút chỉ số cơ bản), không tướng nào chạm được điểm gãy Kỹ năng Bậc II hay Hóa Đỏ Bậc IV.",
                en: "Wasting 3 Soul Stones and hundreds of shards leaving 3 heroes stuck at Tier I (minor flat stats), with zero heroes reaching the Tier II Ultimate skill breakpoint or Tier IV Mythic Ascension.",
              },
              {
                vi: "Dồn toàn lực cho duy nhất 1 tướng trụ cột meta (Pyromancer, Adjudicator, Pixie, Soulmancer, Warlock) chạm mốc Bậc II (3 viên cộng dồn) và hoàn tất Bậc IV Hóa Đỏ (9 viên + 345–385 Mảnh) trước khi qua tướng thứ 2.",
                en: "Focus 100% of resources into a single meta carry (Pyromancer, Adjudicator, Pixie, Soulmancer, Warlock) to hit Tier II (3 cumulative stones) and finish Tier IV Mythic (9 stones + 345–385 Shards) before starting a second hero.",
              },
            ],
            [
              {
                vi: "4. Bỏ lỡ chu kỳ xoay tua 3 tuần (League ➔ Horde ➔ Nature) hoặc mua tràn lan Hồn Đá của cả 3 Hệ",
                en: "4. Missing the 3-week Guild Coin Shop rotation (League ➔ Horde ➔ Nature) or buying off-faction Soul Stones",
              },
              {
                vi: "Quên mua đúng tuần hệ Đội 1 khiến bạn phải chờ thêm 3 tuần mới quay lại; hoặc mua cả Hồn Đá Đội 2/Đội 3 làm cạn sạch Xu Vinh Quang, mất khả năng mua Mảnh Vũ Khí Độc Quyền và nâng sao Universal Legendary Troop Skin (12,000 Xu) của Bộ Lạc.",
                en: "Missing your main faction's week forces a 3-week wait; buying Queue 2/3 Soul Stones drains Guild Coins Needed for Exclusive Weapon Shards and Horde's post-awakening 12,000-Coin Universal Legendary Troop Skin upgrades.",
              },
              {
                vi: "Tuân thủ Quy tắc 1 Đội hình Tuyệt đối (Strict 1-Queue Rule): Chỉ mua Hồn Đá của Hệ Đội 1 trong vòng xoay 3 tuần; riêng Bộ Lạc sau khi xong 9 viên cho Soulmancer / Warlock có thể dùng 12,000 Xu dư để nâng sao Universal Legendary Troop Skin.",
                en: "Enforce the Strict 1-Queue Rule: Only buy Queue 1 faction Soul Stones on the 3-week rotation; Horde players who finish their 9 stones for Soulmancer / Warlock can then allocate 12,000 surplus Guild Coins toward Universal Legendary Troop Skin star upgrades.",
              },
            ],
          ],
        },
      ],
    },
  ],
  proSections: [
    {
      id: "pro-data-and-benchmarks",
      isPro: true,
      title: {
        vi: "4. Phân tích Định lượng & Điểm gãy: Ma Trận Chi Phí 4 Bậc Thức Tỉnh, Ngân Sách 3 Phe & Công Thức Ngưỡng Dư An Toàn",
        en: "4. Quantitative Benchmarks & Breakpoints: 4-Tier Awakening Cost Matrix, 3-Faction Budgets & Safe Surplus Formula",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "**Kế hoạch Tài chính Season 1 & Season 2:** Nắm vững ma trận định lượng chi phí của 4 Bậc Thức Tỉnh, sự chênh lệch ngân sách giữa 3 Phe phái và sơ đồ chi tiêu theo Ngưỡng Dư An Toàn (Safe Surplus Formula).",
            en: "**Season 1 & Season 2 Financial Planning:** Master the quantitative 4-Tier Awakening cost matrix, the massive budget divergence across the 3 Factions, and the Safe Surplus decision flow.",
          },
        },
        {
          type: "visual_diagram",
          mediaCode: "MED-7.2-03",
          variant: "decision_flow",
          title: {
            vi: "Sơ Đồ Quyết Định Kiểm Soát Ngưỡng Đóng Băng Điểm Vinh Dự & Xoay Tua Hồn Đá 3 Phe",
            en: "Guild Honor Freeze Threshold & 3-Faction Soul Stone Rotation Decision Flowchart",
          },
          subtitle: {
            vi: "Quy trình kiểm tra số dư 00:00 UTC (07:00 Sáng Giờ VN) Thứ Hai và phân bổ ngân sách giữa Hồn Đá Đỏ (360,000 vs 720,000 vs 1,080,000), Mảnh VK Độc Quyền và Mảnh Vàng Vạn Năng",
            en: "Monday 00:00 UTC balance audit workflow allocating budget across Soul Stones (360,000 vs 720,000 vs 1,080,000), Exclusive Weapon Shards, and Universal Hero Shards",
          },
          centerNode: {
            id: "node-7-2-monday-audit",
            badge: {
              vi: "KIỂM TRA 00:00 UTC / 07:00 VN THỨ HAI",
              en: "MONDAY 00:00 UTC AUDIT",
            },
            title: {
              vi: "Kiểm Tra Số Dư Điểm Vinh Dự Bang / Xu Vinh Quang Hội Đầu Tuần",
              en: "Audit Weekly Guild Honor Points & Guild Coin Balance at Reset",
            },
            subtitle: {
              vi: "Đối chiếu cấp độ Lâu Đài (Lv.15–29 vs Lv.30 / Season 1+) và chu kỳ xoay tua 3 tuần",
              en: "Check Castle progression (Lv.15–29 vs Lv.30 / Season 1+) and the 3-week faction rotation",
            },
            tone: "gold",
          },
          branches: [
            {
              title: {
                vi: "Nhánh 1: Giai Đoạn Pre-Lv.30 (Lâu Đài Lv.15 – Lv.29)",
                en: "Branch 1: Pre-Lv.30 Phase (Castle Lv.15 – Lv.29)",
              },
              badge: {
                vi: "CHẾ ĐỘ ĐÓNG BĂNG",
                en: "FREEZE MODE",
              },
              tone: "gold",
              steps: [
                {
                  id: "step-7-2-pre30-accumulate",
                  title: {
                    vi: "Tích Lũy Quỹ Gốc Tối Thiểu 40,000 Điểm Vinh Dự / 18,000 Xu Vinh Quang",
                    en: "Bank the Minimum 40,000 Guild Honor / 18,000 Guild Coin Reserve Floor",
                  },
                  subtitle: {
                    vi: "Cày tối đa rương Kỳ Guild Race; khóa ví trước mọi vật phẩm phụ và Quân trang 12,000 Xu",
                    en: "Maximize Guild Race chests; lock wallet against filler items and the 12,000-Coin Troop Skin trap",
                  },
                  tone: "gold",
                },
                {
                  id: "step-7-2-pre30-surplus-only",
                  title: {
                    vi: "Chỉ Mua Mảnh Vàng Vạn Năng Khi Số Dư Vượt Ngưỡng 40,000 Điểm / 18,000 Xu",
                  en: "Only Spend Surplus Above 40,000 Honor / 18,000 Coins on Universal Hero Shards",
                  },
                  subtitle: {
                    vi: "Giữ nguyên phần quỹ gốc để xúc ngay Hồn Đá Đỏ vào ngày cán mốc Lv.30 / Season 1",
                    en: "Preserve the core reserve to buy Soul Stones the exact day Castle Lv.30 / Season 1 unlocks",
                  },
                  tone: "emerald",
                },
              ],
              outcome: {
                vi: "Sẵn sàng 100% thanh khoản ngay ngày mở kệ Hồn Đá Đỏ",
                en: "100% liquidity ready on Day 1 of Soul Stone shelf unlock",
              },
            },
            {
              title: {
                vi: "Nhánh 2: Đã Mở Khóa Lv.30 / Season 1+ & Xoay Trúng Hồn Đá Hệ Đội 1",
                en: "Branch 2: Castle Lv.30 / Season 1+ Unlocked & Main-Faction Rotation Active",
              },
              badge: {
                vi: "ƯU TIÊN SỐ 1",
                en: "PRIORITY #1",
              },
              tone: "emerald",
              steps: [
                {
                  id: "step-7-2-buy-main-stone",
                  title: {
                    vi: "Mua Ngay Hồn Đá Đỏ Hệ Đội 1 (40,000 Điểm Vinh Dự hoặc 6,000 Xu Vinh Quang)",
                    en: "Immediately Buy Queue 1 Faction Soul Stone (40,000 Honor or 6,000 Guild Coins)",
                  },
                  subtitle: {
                    vi: "Canh chuẩn vòng xoay 3 tuần: Tuần 1 League ➔ Tuần 2 Horde ➔ Tuần 3 Nature",
                    en: "Follow the strict 3-week rotation: Week 1 League ➔ Week 2 Horde ➔ Week 3 Nature",
                  },
                  tone: "emerald",
                },
                {
                  id: "step-7-2-complete-9-stones",
                  title: {
                    vi: "Dồn Đủ 9 Viên + 345–385 Mảnh Tướng Cho Từng Trụ Cột (360,000 Điểm / 54,000 Xu)",
                    en: "Complete All 9 Stones + 345–385 Shards Per Core Carry (360,000 Honor / 54,000 Coins)",
                  },
                  subtitle: {
                    vi: "Horde: 9 viên (Soulmancer / Warlock) | League & Nature: 18–27 viên (Pyromancer, Adjudicator, Pixie)",
                    en: "Horde: 9 stones (Soulmancer / Warlock) | League & Nature: 18–27 stones (Pyromancer, Adjudicator, Pixie)",
                  },
                  tone: "gold",
                },
              ],
              outcome: {
                vi: "Hoàn tất Hóa Đỏ Mythic nhanh hơn 8–12 tuần so với người chơi không đóng băng",
                en: "Completes Mythic Ascension 8–12 weeks faster than un-frozen accounts",
              },
            },
            {
              title: {
                vi: "Nhánh 3: Phân Bổ Thặng Dư Sau Khi Đảm Bảo Ngưỡng An Toàn (Safe Surplus)",
                en: "Branch 3: Safe Surplus Allocation Above the Hard Reserve Floor",
              },
              badge: {
                vi: "TỐI ƯU THẶNG DƯ",
                en: "SURPLUS ROI",
              },
              tone: "emerald",
              steps: [
                {
                  id: "step-7-2-ew-and-hero-shards",
                  title: {
                    vi: "Mua 10 Mảnh Vũ Khí Độc Quyền (4,000 Xu) & 10 Mảnh Tướng Vàng (3,000 Xu)",
                    en: "Buy 10 Universal Exclusive Weapon Shards (4,000 Coins) & 10 Hero Shards (3,000 Coins)",
                  },
                  subtitle: {
                    vi: "Chỉ giải ngân khi số dư sau khi mua Hồn Đá vẫn > 40,000–80,000 Điểm / > 12,000–18,000 Xu",
                    en: "Only spend when post-Soul-Stone balance remains > 40,000–80,000 Honor / > 12,000–18,000 Coins",
                  },
                  tone: "emerald",
                },
                {
                  id: "step-7-2-horde-troop-skin-privilege",
                  title: {
                    vi: "Đặc Quyền Bộ Lạc Sau Viên Thứ 9: Nâng Sao Universal Legendary Troop Skin (12,000 Xu)",
                    en: "Horde Post-9th-Stone Privilege: Upgrade Universal Legendary Troop Skin (12,000 Coins)",
                  },
                  subtitle: {
                    vi: "Vì Bộ Lạc chỉ tốn 54,000 Xu cho 9 Hồn Đá, phần Xu dư được giải phóng để nâng sao Quân trang Vàng đã mở khóa",
                    en: "Because Horde only spends 54,000 Coins on 9 Soul Stones, surplus Coins are freed to star up owned Gold Troop Skins",
                  },
                  tone: "gold",
                },
              ],
              outcome: {
                vi: "Tối đa hóa đồng thời Vũ Khí Độc Quyền, Sao Tướng và Quân Trang Vàng",
                en: "Simultaneously maximizes Exclusive Weapons, Hero Stars, and Gold Troop Skins",
              },
            },
          ],
          footnote: {
            vi: "Lưu ý: Người chơi Liên Minh và Thiên Nhiên cần 18–27 Hồn Đá (720,000 – 1,080,000 Điểm Vinh Dự hoặc 108,000 – 162,000 Xu) nên phải duy trì kỷ luật Ngưỡng An Toàn xuyên suốt Season 1 – Season 2.",
            en: "Note: League and Nature players need 18–27 Soul Stones (720,000 – 1,080,000 Guild Honor or 108,000 – 162,000 Guild Coins) and must maintain Safe Surplus discipline throughout Season 1 and Season 2.",
          },
        },
      ],
      subSections: [
        {
          id: "sub-4-1-four-tier-awakening-cost-matrix",
          title: {
            vi: "4.1. Bảng Chi Phí Chi Tiết 4 Bậc Thức Tỉnh Tướng Vàng (Awakening Tiers I ➔ IV)",
            en: "4.1. Complete 4-Tier Awakening Cost Matrix (Awakening Tiers I ➔ IV)",
          },
          blocks: [
            {
              type: "paragraph",
              text: {
                vi: "**Định mức Hồn Đá & Mảnh Tướng:** Đối chiếu lượng Hồn Đá Đỏ (Soul Stones) và Mảnh Tướng (Hero Shards) cần thiết ở từng bậc Thức tỉnh (điều kiện tiên quyết: Tướng Vàng đã đạt 5 Sao Đỏ / `10` Sao):",
                en: "**Soul Stone & Hero Shard Requirements:** Review the exact Soul Stone and Hero Shard requirements across each of the 4 Awakening Tiers (prerequisite: SSR Hero at Red 5-Star / `10`-Star):",
              },
            },
            {
              type: "table",
              caption: {
                vi: "Ma Trận Định Lượng Chi Phí 4 Bậc Thức Tỉnh Tướng Vàng Lên Thần Thoại Đỏ (SSR ➔ Mythic)",
                en: "4-Tier Awakening Cost Matrix from Legendary SSR to Ascended Mythic",
              },
              headers: [
                {
                  vi: "Bậc Thức Tỉnh (Awakening Tier)",
                  en: "Awakening Tier",
                },
                {
                  vi: "Số Hồn Đá Đỏ (Soul Stones)",
                  en: "Soul Stones Required",
                },
                {
                  vi: "Số Mảnh Tướng (Hero Shards)",
                  en: "Hero Shards Required",
                },
                {
                  vi: "Chi Phí Điểm Vinh Dự Lv.30 (40,000/viên)",
                  en: "Lv.30 Guild Honor Cost (40,000/stone)",
                },
                {
                  vi: "Chi Phí Xu Vinh Quang S1 (6,000/viên)",
                  en: "S1 Guild Coin Cost (6,000/stone)",
                },
                {
                  vi: "Đột Phá Sức Mạnh Mở Khóa",
                  en: "Power Breakpoint Unlocked",
                },
              ],
              rows: [
                [
                  {
                    vi: "Bậc I (Tier I)",
                    en: "Tier I",
                  },
                  {
                    vi: "1 Viên (Cộng dồn: 1)",
                    en: "1 Soul Stone (Cumulative: 1)",
                  },
                  {
                    vi: "55–65 Mảnh",
                    en: "55–65 Hero Shards",
                  },
                  {
                    vi: "40,000 Điểm Vinh Dự",
                    en: "40,000 Guild Honor Points",
                  },
                  {
                    vi: "6,000 Xu Vinh Quang",
                    en: "6,000 Guild Coins",
                  },
                  {
                    vi: "Mở khóa nhánh Thức tỉnh & Cộng chỉ số cơ bản (ATK/HP).",
                    en: "Unlocks the Awakening branch & grants base ATK/HP stat boosts.",
                  },
                ],
                [
                  {
                    vi: "Bậc II (Tier II) ★",
                    en: "Tier II ★",
                  },
                  {
                    vi: "2 Viên (Cộng dồn: 3)",
                    en: "2 Soul Stones (Cumulative: 3)",
                  },
                  {
                    vi: "75–95 Mảnh",
                    en: "75–95 Hero Shards",
                  },
                  {
                    vi: "80,000 Điểm Vinh Dự",
                    en: "80,000 Guild Honor Points",
                  },
                  {
                    vi: "12,000 Xu Vinh Quang",
                    en: "12,000 Guild Coins",
                  },
                  {
                    vi: "ĐIỂM GÃY KỸ NĂNG: Cường hóa Kỹ năng Chủ động / Tuyệt chiêu (Ultimate Upgrade).",
                    en: "SKILL BREAKPOINT: Upgrades the Hero's Active / Ultimate Skill.",
                  },
                ],
                [
                  {
                    vi: "Bậc III (Tier III)",
                    en: "Tier III",
                  },
                  {
                    vi: "2 Viên (Cộng dồn: 5)",
                    en: "2 Soul Stones (Cumulative: 5)",
                  },
                  {
                    vi: "85–95 Mảnh",
                    en: "85–95 Hero Shards",
                  },
                  {
                    vi: "80,000 Điểm Vinh Dự",
                    en: "80,000 Guild Honor Points",
                  },
                  {
                    vi: "12,000 Xu Vinh Quang",
                    en: "12,000 Guild Coins",
                  },
                  {
                    vi: "Mở khóa hiệu ứng cộng thêm cho Kỹ năng Bị động / Độc quyền.",
                    en: "Unlocks bonus modifiers for Passive / Exclusive Skills.",
                  },
                ],
                [
                  {
                    vi: "Bậc IV (Tier IV — Ascended) ★",
                    en: "Tier IV (Ascended Mythic) ★",
                  },
                  {
                    vi: "4 Viên (Cộng dồn: 9)",
                    en: "4 Soul Stones (Cumulative: 9)",
                  },
                  {
                    vi: "130 Mảnh",
                    en: "130 Hero Shards",
                  },
                  {
                    vi: "160,000 Điểm Vinh Dự",
                    en: "160,000 Guild Honor Points",
                  },
                  {
                    vi: "24,000 Xu Vinh Quang",
                    en: "24,000 Guild Coins",
                  },
                  {
                    vi: "CHÍNH THỨC HÓA ĐỎ (Mythic Ascension) + Kích hoạt Hào quang Đỏ!",
                    en: "FULL MYTHIC ASCENSION + Activates Mythic Faction Aura!",
                  },
                ],
                [
                  {
                    vi: "TỔNG CỘNG (Total SSR ➔ Mythic)",
                    en: "Total SSR ➔ Mythic (1 Hero)",
                  },
                  {
                    vi: "9 Viên Hồn Đá (1 + 2 + 2 + 4)",
                    en: "9 Soul Stones (1 + 2 + 2 + 4)",
                  },
                  {
                    vi: "345–385 Mảnh Tướng",
                    en: "345–385 Hero Shards",
                  },
                  {
                    vi: "360,000 Điểm Vinh Dự",
                    en: "360,000 Guild Honor Points",
                  },
                  {
                    vi: "54,000 Xu Vinh Quang (S1)",
                    en: "54,000 Guild Coins (S1)",
                  },
                  {
                    vi: "Hoàn tất 1 vị trí Tướng Vàng Thức Tỉnh hoàn chỉnh trong Đội 1.",
                    en: "Completes 1 fully Ascended Mythic hero slot in Queue 1.",
                  },
                ],
              ],
            },
          ],
        },
        {
          id: "sub-4-2-three-faction-soul-stone-budget",
          title: {
            vi: "4.2. Bảng So Sánh Ngân Sách Hồn Đá Đỏ Giữa 3 Phe Phái (3-Faction Soul Stone Budget)",
            en: "4.2. 3-Faction Soul Stone Budget Comparison (Horde vs. League vs. Nature)",
          },
          blocks: [
            {
              type: "paragraph",
              text: {
                vi: "**Chênh lệch Ngân sách 3 Phe phái:** Sự khác biệt về số lượng Tướng Đỏ gốc (Native Mythics) và Tướng Vàng cần thức tỉnh (Awakened SSRs) tạo ra bài toán kinh tế hoàn toàn khác biệt cho F2P/Low-Spender:",
                en: "**3-Faction Budget Divergence:** The structural difference in Native Mythics versus Awakened SSRs across the 3 Factions creates a massive long-term Guild currency divergence for F2P and Low-Spender accounts:",
              },
            },
            {
              type: "table",
              caption: {
                vi: "Bảng Đối Chiếu Tổng Ngân Sách Hồn Đá Đỏ Theo 3 Phe Phái (Bộ Lạc vs Liên Minh vs Thiên Nhiên)",
                en: "3-Faction Soul Stone Budget Comparison (Horde vs. League vs. Nature)",
              },
              headers: [
                {
                  vi: "Phe Phái (Faction)",
                  en: "Faction",
                },
                {
                  vi: "Cấu Trúc Đội Hình Endgame Chuẩn",
                  en: "Endgame Lineup Structure",
                },
                {
                  vi: "Danh Sách Tướng Vàng Cần Thức Tỉnh",
                  en: "Target Awakened SSR Heroes",
                },
                {
                  vi: "Tổng Hồn Đá Cần (Soul Stones)",
                  en: "Total Soul Stones",
                },
                {
                  vi: "Tổng Ngân Sách Điểm Vinh Dự (40,000/viên)",
                  en: "Total Guild Honor Budget (40,000/stone)",
                },
                {
                  vi: "Tổng Ngân Sách Xu S1 (6,000/viên)",
                  en: "Total S1 Guild Coin Budget (6,000/stone)",
                },
                {
                  vi: "Đánh Giá Kinh Tế F2P & Phân Bổ Thặng Dư",
                  en: "F2P Economy Rating & Surplus Allocation",
                },
              ],
              rows: [
                [
                  {
                    vi: "Bộ Lạc (Horde)",
                    en: "Horde",
                  },
                  {
                    vi: "5 Native Mythics + 1 Awakened SSR",
                    en: "5 Native Mythics + 1 Awakened SSR",
                  },
                  {
                    vi: "1 Tướng: Soulmancer hoặc Warlock",
                    en: "1 Hero: Soulmancer or Warlock",
                  },
                  {
                    vi: "9 Soul Stones (+ 345–385 Mảnh)",
                    en: "9 Soul Stones (+ 345–385 Shards)",
                  },
                  {
                    vi: "360,000 Điểm Vinh Dự",
                    en: "360,000 Guild Honor Points",
                  },
                  {
                    vi: "54,000 Xu Vinh Quang",
                    en: "54,000 Guild Coins",
                  },
                  {
                    vi: "★★★★★ (Tối ưu số 1): Tiết kiệm 50%–66% ngân sách Hồn Đá, giải phóng 12,000 Xu Vinh Quang để nâng sao Universal Legendary Troop Skin (khi đã có lính Vàng gốc) & vét sạch Mảnh VK Độc Quyền!",
                    en: "★★★★★ (#1 F2P Choice): Saves 50%–66% on Soul Stones, freeing 12,000 Guild Coins to star up Universal Legendary Troop Skin (once base Gold skin is owned) & buy out Exclusive Weapon Shards!",
                  },
                ],
                [
                  {
                    vi: "Liên Minh (League)",
                    en: "League",
                  },
                  {
                    vi: "3–4 Native Mythics + 2–3 Awakened SSRs",
                    en: "3–4 Native Mythics + 2–3 Awakened SSRs",
                  },
                  {
                    vi: "2–3 Tướng: Pyromancer, Adjudicator, Nun / Bard",
                    en: "2–3 Heroes: Pyromancer, Adjudicator, Nun / Bard",
                  },
                  {
                    vi: "18–27 Soul Stones",
                    en: "18–27 Soul Stones",
                  },
                  {
                    vi: "720,000 – 1,080,000 Điểm Vinh Dự",
                    en: "720,000 – 1,080,000 Guild Honor Points",
                  },
                  {
                    vi: "108,000 – 162,000 Xu Vinh Quang",
                    en: "108,000 – 162,000 Guild Coins",
                  },
                  {
                    vi: "★★ (Đắt đỏ nhất): Áp lực Hồn Đá cực lớn, buộc phải khóa chặt chi tiêu Mảnh Vàng suốt nhiều tháng; ưu tiên dồn 9 viên đầu cho Pyromancer hoặc Adjudicator.",
                    en: "★★ (Most Expensive): Extreme Soul Stone pressure requiring strict shard freeze for months; prioritize first 9 stones into Pyromancer or Adjudicator.",
                  },
                ],
                [
                  {
                    vi: "Thiên Nhiên (Nature)",
                    en: "Nature",
                  },
                  {
                    vi: "3–4 Native Mythics + 2–3 Awakened SSRs",
                    en: "3–4 Native Mythics + 2–3 Awakened SSRs",
                  },
                  {
                    vi: "2–3 Tướng: Pixie, Forest Maiden, Druid / Windwalker / Sage",
                    en: "2–3 Heroes: Pixie, Forest Maiden, Druid / Windwalker / Sage",
                  },
                  {
                    vi: "18–27 Soul Stones",
                    en: "18–27 Soul Stones",
                  },
                  {
                    vi: "720,000 – 1,080,000 Điểm Vinh Dự",
                    en: "720,000 – 1,080,000 Guild Honor Points",
                  },
                  {
                    vi: "108,000 – 162,000 Xu Vinh Quang",
                    en: "108,000 – 162,000 Guild Coins",
                  },
                  {
                    vi: "★★★ (Trung bình – Cao): Cần gấp 2–3 lần thời gian tích Hồn Đá so với Bộ Lạc; bắt buộc dồn 9 viên đầu tiên cho Pixie (cặp bài trùng với Tidecaller).",
                    en: "★★★ (Moderate–High Cost): Requires 2x–3x the Soul Stone accumulation time of Horde; strictly funnel the first 9 stones into Pixie (core carry alongside Tidecaller).",
                  },
                ],
              ],
            },
          ],
        },
        {
          id: "sub-4-3-safe-surplus-formula",
          title: {
            vi: "4.3. Công Thức Tính 'Ngưỡng Dư An Toàn' (Safe Surplus Formula) Để Mua Mảnh Vàng & Mảnh VK Độc Quyền",
            en: "4.3. The 'Safe Surplus Formula' for Buying Universal Hero & Exclusive Weapon Shards",
          },
          blocks: [
            {
              type: "paragraph",
              text: {
                vi: "**Khi nào được mua Mảnh Vàng & Vũ Khí Độc Quyền?** Chỉ trích quỹ mua `10` Mảnh Vàng (`300 × 10 = 3,000` Xu/tuần) hoặc `10` Mảnh VK Độc Quyền (`400 × 10 = 4,000` Xu/tuần) khi vượt sàn dự phòng.\n• **Công thức Ngưỡng Dư An Toàn:** `Điểm Có Thể Chi Tiêu Tuần Này = Số Dư Hiện Tại − (Ngưỡng Đóng Băng Cứng + Chi Phí Hồn Đá Chu Kỳ Tới)`.",
                en: "**When to Buy Hero & Exclusive Weapon Shards?** Only spend currency on `10` Universal Hero Shards (`300 × 10 = 3,000` Coins/week) or `10` Exclusive Weapon Shards (`400 × 10 = 4,000` Coins/week) above your safety floor.\n• **Safe Surplus Formula:** `Spendable Weekly Currency = Current Balance − (Hard Freeze Floor + Next Cycle Soul Stone Cost)`.",
              },
            },
            {
              type: "callout",
              variant: "rule",
              title: {
                vi: "Hai Định Mức Ngưỡng Đóng Băng Cứng (Hard Freeze Floor) Bắt Buộc Ghi Nhớ",
                en: "The Two Mandatory Hard Freeze Floor Benchmarks",
              },
              content: {
                vi: "**1. Chuẩn Lâu Đài Lv.30 (`40,000` Điểm Vinh Dự/viên):** Giữ Ngưỡng Đóng Băng Cứng `40,000` Điểm (cho 1 viên ngay khi mở khóa) hoặc `80,000`–`100,000` Điểm (sát ngày reset tháng); chỉ tiêu phần vượt sàn.\n• **2. Chuẩn Xoay Tua 3 Tuần S1+ (`6,000` Xu/viên):** Mỗi vòng 3 tuần cần `6,000` Xu cho 1 Hồn Đá + `4,000` Xu/tuần cho `10` Mảnh VK; giữ sàn `12,000`–`18,000` Xu (`15,000` Xu chuẩn), chỉ mua Mảnh Vàng khi `> 18,000` Xu!",
                en: "**1. Castle Lv.30 Standard (`40,000` Guild Honor/stone):** Maintain a Hard Freeze Floor of `40,000` Points (for 1 immediate stone on unlock) or `80,000`–`100,000` Points (near monthly reset); only spend surplus.\n• **2. S1+ Rotation (`6,000` Coins/stone):** Every 3 weeks needs `6,000` Coins (1 Stone) + `4,000` Coins/wk (`10` EW Shards); keep `12,000`–`18,000` Coins (`15,000` floor) and buy Shards above `18,000`!",
              },
            },
          ],
        },
      ],
    },
    {
      id: "pro-execution-playbook",
      isPro: true,
      title: {
        vi: "5. Kịch bản Thực chiến Nâng cao: Đối Chiếu Tài Khoản Đóng Băng Chuẩn Bộ Lạc vs Tài Khoản Vỡ Trận Liên Minh",
        en: "5. Pro Execution Playbook: Guild Honor Freeze Horde Transition vs. Un-Frozen League Account Case Study",
      },
      blocks: [
        {
          type: "case_study",
          badge: {
            vi: "CASE STUDY THỰC CHIẾN S1–S2",
            en: "S1–S2 LIVE CASE STUDY",
          },
          title: {
            vi: "So Sánh 2 Tài Khoản F2P Cùng Đạt Lâu Đài Lv.30 Ở Ngày 55 & Bước Vào Season 1 Ở Ngày 65",
            en: "Comparing Two F2P Accounts Hitting Castle Lv.30 on Day 55 & Entering Season 1 on Day 65",
          },
          profileSummary: {
            vi: "**Đối chiếu 2 tài khoản F2P xuất phát Ngày 1:** Tài khoản A tiêu sạch Điểm Vinh Dự mỗi tuần và dính bẫy Universal Legendary Troop Skin `12,000` Xu khi chơi Liên Minh.\n• **Tài khoản B (Chuẩn Đóng Băng):** Thực thi nghiêm ngặt Lệnh Đóng Băng `40,000` Điểm / `18,000` Xu và chuyển giao sang Đội 1 Bộ Lạc (5 Native Mythics + Soulmancer).",
            en: "**Side-by-side audit of two Day-1 F2P accounts:** Account A drained Guild Honor weekly and fell for the `12,000`-Coin Universal Legendary Troop Skin trap while running League.\n• **Account B (Freeze Standard):** Enforced the `40,000` Honor / `18,000` Coin Freeze and transitioned to Queue 1 Horde (5 Native Mythics + Soulmancer).",
          },
          metrics: [
            {
              label: {
                vi: "Số dư Quỹ Bang Hội Ngày Mở Khóa Lv.30 / S1",
                en: "Guild Currency Balance on Lv.30 / S1 Unlock Day",
              },
              before: {
                vi: "Tài khoản A: 1,200 Điểm (Đã đốt 12,000 Xu vào bẫy Troop Skin)",
                en: "Account A: 1,200 Points (Burned 12,000 Coins on Troop Skin trap)",
              },
              after: {
                vi: "Tài khoản B: > 80,000 Điểm Vinh Dự / > 18,000 Xu Vinh Quang",
                en: "Account B: > 80,000 Guild Honor / > 18,000 Guild Coins",
              },
              delta: {
                vi: "Mua ngay lập tức Hồn Đá Đỏ tuần đầu tiên mở kệ",
                en: "Immediate Day-1 Soul Stone purchase upon shelf unlock",
              },
            },
            {
              label: {
                vi: "Thời Gian Hoàn Tất 9 Hồn Đá Đỏ Đầu Tiên (360,000 Điểm / 54,000 Xu)",
                en: "Time to Complete First 9 Soul Stones (360,000 Honor / 54,000 Coins)",
              },
              before: {
                vi: "Tài khoản A: Mất 18 tuần cày lại cho Pyromancer (Adjudicator & Nun vẫn kẹt Vàng)",
                en: "Account A: 18 weeks grinding from scratch for Pyromancer (Adjudicator & Nun stuck at SSR)",
              },
              after: {
                vi: "Tài khoản B: Hoàn tất 9 viên cho Soulmancer ngay đầu Season 1 (Đủ đội hình 6 Đỏ)",
                en: "Account B: Finishes all 9 stones for Soulmancer in early Season 1 (Full 6-Mythic lineup)",
              },
              delta: {
                vi: "Tiết kiệm 18–27 viên Hồn Đá (720,000 – 1,080,000 Điểm)",
                en: "Saves 18–27 total Soul Stones (720,000 – 1,080,000 Honor)",
              },
            },
            {
              label: {
                vi: "Chênh Lệch Lực Chiến Thực Chiến Giữa Season 2",
                en: "Real Combat Power Gap by Mid-Season 2",
              },
              before: {
                vi: "Tài khoản A: Thiếu 9–18 Hồn Đá cho Adjudicator / Nun, kẹt Vũ Khí Độc Quyền",
                en: "Account A: Still missing 9–18 Soul Stones for Adjudicator / Nun, starved on Exclusive Weapons",
              },
              after: {
                vi: "Tài khoản B: Vét sạch 10 Mảnh VK Độc Quyền + 10 Mảnh Vàng mỗi tuần từ đầu S1",
                en: "Account B: Buys out 10 Exclusive Weapon Shards + 10 Hero Shards weekly since early S1",
              },
              delta: {
                vi: "Vượt mặt +1.5M Lực chiến thực chiến ở giữa Season 2",
                en: "+1.5M Real Combat Power lead by Mid-Season 2",
              },
            },
          ],
          diagnostics: [
            {
              vi: "**Thiệt hại kép từ 'Ẩn kệ hàng' & bẫy `12,000` Xu:** Tài khoản A tiêu sạch Điểm Vinh Dự từ Lv.15–Lv.29 và mua nhầm Universal Legendary Troop Skin `12,000` Xu khi chưa có lính Vàng gốc.\n• **Áp lực Liên Minh:** Theo đuổi đội hình Liên Minh cần tới `18–27` Hồn Đá (`720,000` – `1,080,000` Điểm Vinh Dự hoặc `108,000` – `162,000` Xu) khiến tài khoản bị khóa chặt thanh khoản suốt 4 tháng.",
              en: "**Double penalty from 'Hidden Shelf' & `12,000`-Coin trap:** Account A drained Guild Honor from Lv.15–Lv.29 and wasted `12,000` Coins on Universal Legendary Troop Skin without a base Gold skin.\n• **League Burden:** Running League required `18–27` Soul Stones (`720,000` – `1,080,000` Guild Honor or `108,000` – `162,000` Guild Coins), locking shop liquidity for 4 months.",
            },
            {
              vi: "**Đòn bẩy kinh tế 5 Mythic gốc của Bộ Lạc:** Đóng băng `40,000` Điểm từ Ngày 15–55 và chuyển sang Bộ Lạc (Desert Prince, Wukong, Storm Maiden, Beastmaster, Witch + 1 Awakened SSR là Soulmancer hoặc Warlock).\n• **Tối giản Ngân sách:** Tài khoản B chỉ cần đúng `9` Hồn Đá Đỏ + `345–385` Mảnh Tướng (`360,000` Điểm hoặc `54,000` Xu) để khép kín đội hình 6 Tướng Đỏ.",
              en: "**Horde's 5-Native-Mythic economic leverage:** Froze `40,000`+ Guild Honor from Day 15–55 and pivoted to Horde (Desert Prince, Wukong, Storm Maiden, Beastmaster, Witch + Soulmancer or Warlock).\n• **Minimal Budget:** Account B needed only `9` Soul Stones + `345–385` Hero Shards (`360,000` Honor or `54,000` Coins) to complete a full 6-Mythic lineup.",
            },
          ],
          recoverySteps: [
            {
              stepNumber: "1",
              title: {
                vi: "Đóng băng toàn bộ Điểm Vinh Dự & Xu Vinh Quang từ Ngày 15 đến Ngày 55",
                en: "Freeze All Guild Honor & Guild Coins from Day 15 to Day 55",
              },
              detail: {
                vi: "Tích lũy quỹ dự phòng vượt ngưỡng `40,000`–`80,000` Điểm Vinh Dự và `18,000` Xu Vinh Quang Hội thông qua việc mở trọn 9 rương mốc cá nhân sự kiện Guild Race (Thi Đấu Hội).",
                en: "Accumulate a reserve exceeding `40,000`–`80,000` Guild Honor Points and `18,000` Guild Coins by clearing all 9 personal milestone chests in Guild Race.",
              },
              impactBadge: {
                vi: "QUỸ GỐC 80,000+ ĐIỂM",
                en: "80,000+ HONOR BANKED",
              },
            },
            {
              stepNumber: "2",
              title: {
                vi: "Dồn trọn 9 Hồn Đá Đỏ + 345–385 Mảnh Tướng cho trụ cột số 1 ngay đầu Season 1",
                en: "Funnel All 9 Soul Stones + 345–385 Shards into Primary Carry in Early Season 1",
              },
              detail: {
                vi: "**Mua liền mạch 3 tuần:** Kết hợp mở Rương Hồn Đá Tự Chọn và xả Thứ Năm Kỳ GAR/KvK (GAR Day 4).\n• **Chạm thẳng Bậc IV:** Đưa Soulmancer / Warlock (hoặc Pyromancer / Adjudicator / Pixie) qua Bậc II (`75–95` Mảnh) lên thẳng Bậc IV Hóa Đỏ (`130` Mảnh).",
                en: "**Buy on 3-Week Cycle:** Unseal Soul Stone Choice Chests and upgrade on GAR/KvK Thursday (GAR Day 4).\n• **Push to Tier IV:** Advance Soulmancer / Warlock (or Pyromancer / Adjudicator / Pixie) past Tier II (`75–95` Shards) straight to Tier IV Mythic (`130` Shards).",
              },
              impactBadge: {
                vi: "HOÀN TẤT 9 VIÊN ĐẦU S1",
                en: "9 STONES DONE EARLY S1",
              },
            },
            {
              stepNumber: "3",
              title: {
                vi: "Giải phóng 100% nguồn thu Bang Hội từ viên thứ 10 sang Mảnh VK Độc Quyền & Quân Trang Vàng",
                en: "Redirect 100% of Post-Awakening Guild Income into Exclusive Weapons & Gold Troop Skins",
              },
              detail: {
                vi: "**Giải phóng Xu S1:** Sau khi xong `9` viên cho Soulmancer / Warlock (`54,000` Xu), vét sạch `10` Mảnh VK Độc Quyền (`4,000` Xu/tuần) + `10` Mảnh Vàng (`3,000` Xu/tuần).\n• **Nâng sao Quân trang:** Dùng `12,000` Xu thặng dư nâng sao Universal Legendary Troop Skin đã sở hữu.",
                en: "**Free Up S1 Coins:** After finishing `9` stones for Soulmancer / Warlock (`54,000` Coins), buy out `10` Exclusive Weapon Shards (`4,000` Coins/week) + `10` Hero Shards (`3,000` Coins/week).\n• **Star Up Troop Skins:** Invest `12,000` surplus Coins into upgrading owned Universal Legendary Troop Skins.",
              },
              impactBadge: {
                vi: "+1.5M LỰC CHIẾN S2",
                en: "+1.5M POWER LEAD IN S2",
              },
            },
          ],
          conclusion: {
            vi: "Kỷ luật Đóng Băng `40,000` Điểm Vinh Dự kết hợp cấu trúc 5 Mythic gốc của Bộ Lạc giúp F2P rút ngắn tới 4 tháng cày Hồn Đá Đỏ và chiếm ưu thế tuyệt đối về Vũ Khí Độc Quyền ở Season 2.",
            en: "Combining the `40,000` Guild Honor Freeze with Horde's 5-Native-Mythic roster architecture saves F2P players up to 4 months of Soul Stone grinding and establishes a decisive Exclusive Weapon lead by Season 2.",
          },
        },
        {
          type: "media_spotlight",
          mediaCode: "MED-7.2-04",
          tier: "tier4_youtube_ref",
          title: {
            vi: "Video Tham Chiếu Quốc Tế: Hướng Dẫn Thức Tỉnh Tướng, Chi Phí Hồn Đá Đỏ & Lợi Thế Kinh Tế Bộ Lạc",
            en: "International Reference Video: Hero Awakening Guide, Soul Stone Costs & Why Horde Saves Months of Guild Honor",
          },
          description: {
            vi: "Phân tích thực chiến từ cộng đồng quốc tế (RedBaron Gaming / Otiz Heroes Official) về ma trận 9 Hồn Đá Đỏ + 345–385 Mảnh Tướng, chu kỳ xoay tua Tiệm Xu Vinh Quang Season 1 và lý do Bộ Lạc giúp tiết kiệm hàng trăm nghìn Điểm Vinh Dự Bang.",
            en: "In-depth international community breakdown (RedBaron Gaming / Otiz Heroes Official) covering the 9 Soul Stone + 345–385 Hero Shard awakening matrix, Season 1 Guild Coin Shop rotations, and why Horde saves hundreds of thousands of Guild Honor Points.",
          },
          videoChannel: "RedBaron Gaming / Otiz Heroes Official",
          videoTitle: "Top Heroes: Hero Awakening Guide, Soul Stone Costs & Why Horde Saves Months of Guild Honor",
          videoTimestamp: "03:15 – 11:40",
          videoUrl: "https://www.youtube.com/results?search_query=Top+Heroes+Soul+Stone+Awakening+Guide+Guild+Honor",
        },
      ],
    },
  ],
};

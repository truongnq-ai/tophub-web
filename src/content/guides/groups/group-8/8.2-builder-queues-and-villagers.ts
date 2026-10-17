import type { GuideArticle } from "../../types";

export const ARTICLE_8_2_BUILDER_QUEUES_AND_VILLAGERS: GuideArticle = {
  code: "8.2",
  slug: "builder-queues-and-villagers",
  categorySlug: "infrastructure",
  badge: "FREE",
  readingMinutes: 11,
  title: {
    vi: "Nghệ Thuật Điều Phối Hàng Đợi Thợ Xây & Tối Ưu Hóa Dân Làng (Builders & Villagers Lv.1–6)",
    en: "Builder Queue Orchestration & Villager Optimization Strategy (Lv.1–6)",
  },
  summary: {
    vi: "Chiến thuật phân công chuyên môn hóa 2–3–4 Hàng đợi Thợ xây không một giây nhàn rỗi, thông số Ground-Truth của dàn Tướng Kinh Tế 12 Sao (+30% / +40%), bảng 14 dòng kỹ năng Dân làng (Villagers Lv.1–6) và kỹ thuật găm Hộp Quà Công Trình (Gift Box Banking) ăn trọn điểm Thứ Hai Kỳ GAR/KvK.",
    en: "Zero-idle orchestration for 2–3–4 Builder Queues, Ground-Truth 12-Star passive Economic Hero traits (+30% / +40%), the 14-row quantitative Villager skill table (Lv.1–6), and Sunday Unopened Gift Box Banking for GAR / KvK Day 1.",
  },
  tldr: {
    coreRule: {
      vi: "**Phân hóa chuyên môn tuyệt đối** giữa các Hàng đợi Thợ xây theo **Mô hình Đường Găng 3–4 Mũi Nhọn**:\n• **Thợ 1 & Thợ 2**: Thợ 1 khóa `100%` vào trục **Lâu Đài** (`Castle`); Thợ 2 xây đón đầu điều kiện kế tiếp và **Doanh Trại Đội 1** (`Main Barracks`).\n• **Thợ 3 & Thợ 4**: Thợ 3 nâng công trình bổ trợ (`Faction Statue`, `Lord Hall`, `Medal Hall`) & mồi sự kiện; Thợ 4 chỉ chạy khi dư tài nguyên trên `150%`.",
      en: "**Enforce strict specialization** across Builder Queues using the **3–4 Pronged Critical Path Model**:\n• **Builders 1 & 2**: Builder 1 locks `100%` onto the `Castle` axis; Builder 2 pre-builds next prerequisites and Queue 1 `Main Barracks`.\n• **Builders 3 & 4**: Builder 3 handles support (`Faction Statue`, `Lord Hall`, `Medal Hall`) and bait; Builder 4 runs only above `150%` resource surplus.",
    },
    immediateAction: {
      vi: "**Tắt Auto-Assign** trong giao diện **Quản lý Dân Làng** (`Villagers`), tháo Dân làng khỏi mỏ Gỗ/Đá và gán thủ công:\n• **Nhóm Tốc độ (S+)**: **Viện Nghiên Cứu** (`+0.60% ➔ +3.20%` & `40s ➔ 432s`), **Hội** (`+1 ➔ +5` Help), **Lâu Đài** (`+0.60% ➔ +2.00%` & `40s ➔ 160s`).\n• **Nhóm Chiến đấu (S)**: **Sảnh Huân Chương** (`+17.50%` HP & `+5.60%` ATK Lính) và **Doanh Trại Hệ Chính** (`+4.40%` Tốc độ & `+13` Sức chứa).",
      en: "**Disable Auto-Assign** in the **Villager Management UI**, strip Villagers from Timber/Stone mills, and slot manually:\n• **Speed Tier (S+)**: **Research Cottage** (`+0.60% ➔ +3.20%` & `40s ➔ 432s`), **Guild** (`+1 ➔ +5` Help), **Castle** (`+0.60% ➔ +2.00%` & `40s ➔ 160s`).\n• **Combat Tier (S)**: **Medal Hall** (`+17.50%` HP & `+5.60%` ATK) and **Main Barracks** (`+4.40%` Speed & `+13` Training Cap).",
    },
    strictTaboo: {
      vi: "**Tuyệt đối KHÔNG** cắn bình Tăng tốc Xây dựng sớm hoặc khui Hộp Quà công trình sai ngày:\n• **Chờ Guild Help**: Không dùng bình tăng tốc khi thanh **Trợ giúp Bang hội** (`Guild Help`) chưa đầy.\n• **Gift Box Banking**: Không chạm mở biểu tượng Hộp Quà trên mái nhà vào Thứ Bảy/Chủ Nhật — giữ nguyên để nổ điểm vào **Thứ Hai Kỳ GAR/KvK** (`Arms Race Day 1`)!",
      en: "**NEVER waste** Construction Speed-ups early or pop completed building Gift Boxes on the wrong day:\n• **Wait for Guild Help**: Never consume speed-ups before your `Guild Help` bar is completely full.\n• **Gift Box Banking**: Never tap the rooftop Gift Box on Saturday/Sunday—leave it untouched to detonate points on **GAR/KvK Monday** (`Arms Race Day 1`)!",
    },
  },
  keyTakeaways: [
    {
      vi: "**Mô hình Đường Găng 3–4 Mũi Nhọn & Nội tại Tướng Kinh Tế (`12 Sao` / `Trait 3 Lv.30`)**:\n• **Xây dựng, NC & Lính**: Kích hoạt thụ động **Bard** (`+40%` Xây dựng), **Brawler** (`+30%`) + **Shaman** (`+40%` Nghiên cứu), **Knight** (`+30%`) + **Hostess** (`+40%` Luyện lính).\n• **Thu thập & Chữa thương**: **Ranger** / **Rogue** / **Outlaw** (`+30%` Ruby/Đá/Gỗ) + **Headhunter** / **Stonemason** / **Treeguard** (`+40%`), và **Minister** / **Priestess** / **Dancer** (`+30%` Chữa thương).",
      en: "**3–4 Pronged Builder Allocation & Passive Economic Hero Traits (`12-Star` / `Trait 3 Lv.30`)**:\n• **Build, Tech & Training**: Passive roster buffs from **Bard** (`+40%` Construction), **Brawler** (`+30%`) + **Shaman** (`+40%` Tech), **Knight** (`+30%`) + **Hostess** (`+40%` Training).\n• **Gathering & Healing**: **Ranger** / **Rogue** / **Outlaw** (`+30%` Ruby/Stone/Timber) + **Headhunter** / **Stonemason** / **Treeguard** (`+40%`), and **Minister** / **Priestess** / **Dancer** (`+30%` Healing).",
    },
    {
      vi: "**Bảng 14 Hàng Tra Cứu Toàn Diện Dân Làng (`Villagers Lv.1 ➔ Lv.6` — Tab `Villagers`)**:\n• **Hạng S+ & S**: `Research Cottage` (`+0.60%➔+3.20%`, `40s➔360s/432s`), `Guild` (`+1➔+5` Help), `Castle` (`+0.60%➔+2.00%`, `40s➔160s`), `Medal Hall` (`+17.50%` HP, `+5.60%` ATK), `Barracks` (`+4.40%`, `+13`).\n• **Hạng A+/A/B**: `Faction Statue` (`+1➔+7` March Size), `Hero Statue`, `Hospital` (`+200➔+2,100` chỗ), Mỏ Ruby/Đá Vân/Huân Chương (`+57.50%➔+143.75%`, `+16,560s` lưu trữ) và `Queue` (`+1%➔+10%` Boss).",
      en: "**14-Row Quantitative Villagers & Famous Villagers Table (`Lv.1 ➔ Lv.6` — `Tab Villagers`)**:\n• **S+ & S Tiers**: `Research Cottage` (`+0.60%➔+3.20%`, `40s➔360s/432s`), `Guild` (`+1➔+5` Help), `Castle` (`+0.60%➔+2.00%`, `40s➔160s`), `Medal Hall` (`+17.50%` HP, `+5.60%` ATK), `Barracks` (`+4.40%`, `+13`).\n• **A+/A/B Tiers**: `Faction Statue` (`+1➔+7` March Size), `Hero Statue`, `Hospital` (`+200➔+2,100` cap), Ruby/Ore/Medal Mines (`+57.50%➔+143.75%`, `+16,560s` storage), and `Queue` (`+1%➔+10%` Boss).",
    },
    {
      vi: "**Lịch trình Nhịp Sinh Học Ngày/Đêm (`Sleep-Cycle`) & Kỹ thuật Ngâm Hộp Quà (`Gift Box Banking`)**:\n• **Nhịp Ngày/Đêm**: Ban ngày (`08:00–22:00`) bấm nhà ngắn `15m–3h` ăn tối đa `Guild Help`; ban đêm (`23:00`) bấm dự án dài `8h–48h` chạy xuyên đêm.\n• **Ngâm Hộp Quà**: Chủ Nhật giữ nguyên biểu tượng `Gift Box` trên mái nhà để khui nổ điểm vào khung giờ vàng `13:00–17:00` Thứ Hai Kỳ GAR/KvK (`Arms Race Day 1`)!",
      en: "**Day/Night `Sleep-Cycle` Scheduling & Unopened `Gift Box Banking`**:\n• **Day/Night Routing**: Run short `15m–3h` upgrades during daytime (`08:00–22:00`) for free `Guild Helps`; queue long `8h–48h` projects before sleep (`23:00`).\n• **Gift Box Banking**: Leave Sunday's completed building `Gift Boxes` untouched on the roof to pop them in GAR/KvK Monday's `13:00–17:00` Golden Window (`Arms Race Day 1`)!",
    },
  ],
  keywords: [
    "hàng đợi thợ xây",
    "hang doi tho xay",
    "builder queues",
    "dân làng",
    "dan lang",
    "villagers",
    "famous villagers",
    "gift box banking",
    "găm hộp quà",
    "gam hop qua",
    "ngâm hộp quà",
    "sleep-cycle",
    "bard",
    "stonemason",
    "treeguard",
    "headhunter",
  ],
  sourceFiles: [
    "docs/06-game-guides/07-standardized-web-guides/group-8-infrastructure/8.2-builder-queues-and-villagers.md",
    "docs/06-game-guides/01-core-strategic-topics/topic-2-and-4-buildings-and-research-tech.md",
    "docs/06-game-guides/03-data-tables-and-mechanics/topheroes-tables-max-raw-dataset.md",
  ],
  freeSections: [
    {
      id: "sec-1-builder-queue-orchestration",
      title: {
        vi: "1. Giải thích Cơ chế Cốt lõi: Phân Công Chuyên Môn Hóa 2–3–4 Hàng Đợi Thợ Xây & Nội Tại Tướng Kinh Tế",
        en: "1. Core Mechanics: Specialized 2–3–4 Builder Queue Allocation & Passive Economic Hero Traits",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "Mặc định tài khoản mới có 1 Hàng đợi Thợ xây miễn phí (`Builder Queue 1`), có thể thuê tạm Thợ 2 bằng Kim Cương hoặc mở vĩnh viễn Thợ 2, 3, 4 qua gói tiện ích đầu game (`$0.99 – $4.99 USD`).\n• **Bẫy Nghẽn Cổ Chai Kép**: Có nhiều thợ nhưng nâng tự phát sẽ khiến lúc đủ tài nguyên bấm **Lâu Đài** (`Castle`) thì cả 3 thợ đều kẹt xây nhà phụ `24 giờ` hoặc thiếu công trình điều kiện.",
            en: "Every new account starts with 1 free Builder Queue (`Builder Queue 1`), with options to rent Builder 2 with Diamonds or permanently unlock Queues 2, 3, and 4 via early utility packs (`$0.99 – $4.99 USD`).\n• **Double Bottleneck Trap**: Owning multiple builders while upgrading at random leaves all 3 builders stuck on `24-hour` side projects or missing prerequisites right when you can upgrade your `Castle`.",
          },
        },
      ],
      subSections: [
        {
          id: "sub-1-1-four-builder-allocation-model",
          title: {
            vi: "1.1. Mô hình Phân công 'Đường Găng 3–4 Mũi Nhọn' (The 3–4 Pronged Builder Allocation)",
            en: "1.1. The '3–4 Pronged Critical Path' Builder Allocation Model",
          },
          blocks: [
            {
              type: "paragraph",
              text: {
                vi: "Để tốc độ phát triển hạ tầng đạt hiệu suất `100%` không một phút chết (`Zero-Idle Orchestration`), hãy gán vai trò chuyên trách cố định cho từng Đội Thợ xây theo bảng dưới đây:",
                en: "To achieve `100%` infrastructure velocity with zero idle time (`Zero-Idle Orchestration`), assign a strict, permanent specialization to each Builder Queue below:",
              },
            },
            {
              type: "table",
              caption: {
                vi: "Bảng 1.1: Mô Hình Phân Công 'Đường Găng 3–4 Mũi Nhọn' (The 3–4 Pronged Builder Allocation)",
                en: "Table 1.1: The 3–4 Pronged Critical Path Builder Allocation Model",
              },
              headers: [
                {
                  vi: "Hàng Đợi Thợ Xây",
                  en: "Builder Queue",
                },
                {
                  vi: "Vai Trò Chiến Lược",
                  en: "Strategic Role",
                },
                {
                  vi: "Danh Sách Công Trình Phụ Trách Cố Định",
                  en: "Assigned Fixed Buildings",
                },
                {
                  vi: "Quy Tắc Vận Hành Bất Di Bất Dịch",
                  en: "Strict Operating Rule",
                },
              ],
              rows: [
                [
                  {
                    vi: "Thợ Xây Số 1 (Primary Builder)",
                    en: "Builder Queue 1 (Primary Builder)",
                  },
                  {
                    vi: "Đường Găng Lâu Đài (Castle Critical Path)",
                    en: "Castle Critical Path",
                  },
                  {
                    vi: "• Lâu Đài / Pháo Đài (Castle)\n• Công trình điều kiện trực tiếp thứ nhất của cấp Lâu Đài hiện tại (Research Cottage ở cấp lẻ / Guild ở cấp chẵn)",
                    en: "• Castle (Main Fortress)\n• First direct prerequisite of the current Castle level (Research Cottage on odd levels / Guild on even levels)",
                  },
                  {
                    vi: "Không bao giờ rời khỏi trục Lâu Đài. Ngay khi công trình điều kiện vừa hoàn tất, Thợ 1 phải lập tức bấm nâng Lâu Đài.",
                    en: "Never leaves the Castle axis. The instant the prerequisite finishes, Builder 1 must immediately start the next Castle upgrade.",
                  },
                ],
                [
                  {
                    vi: "Thợ Xây Số 2 (Prerequisite Builder)",
                    en: "Builder Queue 2 (Prerequisite Builder)",
                  },
                  {
                    vi: "Đón Đầu Điều Kiện & Doanh Trại Đội 1",
                    en: "Prerequisite Pre-Cooking & Queue 1 Barracks",
                  },
                  {
                    vi: "• Công trình điều kiện thứ hai (Hospital ở cấp lẻ / Training Ground ở cấp chẵn)\n• Doanh Trại Hệ Đội 1 (Main Faction Barracks)\n• Xây đón đầu điều kiện của cấp Lâu Đài kế tiếp",
                    en: "• Second prerequisite building (Hospital on odd levels / Training Ground on even levels)\n• Queue 1 Main Faction Barracks\n• Pre-builds prerequisites for the next Castle level",
                  },
                  {
                    vi: "Trong lúc Thợ 1 đang đập Lâu Đài (mất 2–7 ngày), Thợ 2 phải nâng xong sẵn bộ đôi điều kiện của cấp Lâu Đài tiếp theo và kéo Doanh Trại Đội 1 chạm mốc mở Tier lính.",
                    en: "While Builder 1 is upgrading the Castle (2–7 days), Builder 2 completes the next Castle level's prerequisite pair ahead of time and pushes Queue 1 Barracks to troop tier breakpoints.",
                  },
                ],
                [
                  {
                    vi: "Thợ Xây Số 3 (Support Builder)",
                    en: "Builder Queue 3 (Support Builder)",
                  },
                  {
                    vi: "Hỗ Trợ Chiến Đấu & Mồi Sự Kiện",
                    en: "Combat Support & Event Bait",
                  },
                  {
                    vi: "• Tượng Phe Phái Đội 1 (Main Faction Statue)\n• Sảnh Tập Kết (Rally Hall), Sảnh Lãnh Chúa (Lord Hall), Sảnh Huân Chương (Medal Hall)\n• Mỏ Quặng Cường Hóa, Mỏ Đá Vân, Tu Viện (Monastery)\n• Các mỏ ngắn hạn để ăn Nhiệm vụ Vàng / Sự kiện",
                    en: "• Queue 1 Main Faction Statue\n• Rally Hall, Lord Hall, Medal Hall\n• Enhancement Ore Mine, Magic Stone Mine, Monastery\n• Short-duration resource nodes for Legendary Tasks / Events",
                  },
                  {
                    vi: "Luôn ưu tiên các công trình có thời gian xây ngắn hoặc trung bình để linh hoạt giải phóng hàng đợi mỗi khi bước vào Kỳ Thi Đấu Hội (Guild Race) hoặc Thứ Hai Kỳ GAR/KvK.",
                    en: "Prioritizes short-to-medium duration upgrades so the queue can be freed on demand entering Guild Race or Monday of GAR/KvK (GAR Day 1).",
                  },
                ],
                [
                  {
                    vi: "Thợ Xây Số 4 (Optional / Whale)",
                    en: "Builder Queue 4 (Optional / Whale)",
                  },
                  {
                    vi: "Hạ Tầng Đội 2 & Khai Khoáng Đặc Biệt",
                    en: "Queue 2 Infrastructure & Special Mining",
                  },
                  {
                    vi: "• Doanh Trại & Tượng của Hệ Đội 2\n• Mỏ Ruby (Ruby Mine), Lò Rèn (Blacksmith), Quán Rượu (Tavern)",
                    en: "• Queue 2 Faction Barracks & Statue\n• Ruby Mine, Blacksmith, Tavern",
                  },
                  {
                    vi: "Chỉ nâng khi quỹ Gỗ/Đá/Ruby dư trên 150% nhu cầu của Thợ 1 và Thợ 2.",
                    en: "Only active when Timber/Stone/Ruby reserves exceed 150% of Builder 1 and Builder 2 requirements.",
                  },
                ],
              ],
            },
            {
              type: "media_spotlight",
              mediaCode: "MED-8.2-02",
              tier: "tier2_annotated_ui",
              title: {
                vi: "Giao Diện Điều Phối 3–4 Hàng Đợi Thợ Xây & Biểu Tượng Hộp Quà Công Trình Chưa Mở (Unopened Gift Box)",
                en: "3–4 Builder Queue HUD & Unopened Building Gift Box Roof Icon Anatomy",
              },
              description: {
                vi: "Ảnh chụp màn hình toàn cảnh Làng khoanh vùng thanh 3–4 Hàng đợi Thợ xây bên góc trái (Thợ 1 khóa Lâu Đài, Thợ 2 đón đầu điều kiện, Thợ 3 công trình ngắn) và khoanh đỏ biểu tượng Hộp Quà Công Trình chưa mở (Unopened Building Gift Box) trên mái nhà chờ Thứ Hai Kỳ GAR/KvK.",
                en: "Annotated village overview highlighting the left-side 3–4 Builder Queue HUD (Builder 1 on Castle, Builder 2 pre-building prerequisites, Builder 3 on short support projects) and circling the Unopened Building Gift Box icon on the roof saved for GAR/KvK Monday.",
              },
              annotations: [
                {
                  kind: "do",
                  label: {
                    vi: "Khóa cố định Thợ 1 vào Lâu Đài & Thợ 2 xây đón đầu điều kiện Chẵn / Lẻ",
                    en: "Lock Builder 1 on Castle & Use Builder 2 to Pre-Cook Even/Odd Prerequisites",
                  },
                  detail: {
                    vi: "Luôn nhìn trước 1 cấp Lâu Đài: khi Thợ 1 đang nâng Lâu Đài cấp lẻ (ví dụ Lv.27), Thợ 2 phải nâng xong sẵn Guild Lv.27 + Training Ground Lv.27 để giây phút Lâu Đài Lv.27 hoàn tất là bấm được ngay Lv.28.",
                    en: "Always look 1 Castle level ahead: while Builder 1 upgrades an odd Castle level (e.g., Lv.27), Builder 2 finishes Guild Lv.27 + Training Ground Lv.27 so Lv.28 can be started the second Lv.27 completes.",
                  },
                },
                {
                  kind: "info",
                  label: {
                    vi: "Xin đầy thanh Trợ giúp Bang hội (Guild Help) trước mọi lần cắn bình Tăng tốc",
                    en: "Fill the Guild Help Bar Completely Before Using Any Speed-ups",
                  },
                  detail: {
                    vi: "Mỗi lượt thành viên Bang hội bấm bàn tay trợ giúp kết hợp Dân làng ở Hội (Help Accepted Count +1 ➔ +5 lượt) giúp cắt giảm hàng chục phút đến hàng giờ xây dựng miễn phí mỗi ngày.",
                    en: "Every guildmate hand tap combined with Guild Villagers (Help Accepted Count +1 ➔ +5) shaves dozens of minutes to hours off construction timers for free every day.",
                  },
                },
                {
                  kind: "dont",
                  label: {
                    vi: "Cấm chạm tay vào biểu tượng Hộp Quà Công Trình (Gift Box) vào Thứ Bảy / Chủ Nhật",
                    en: "Never Tap Completed Building Gift Boxes on Saturday or Sunday",
                  },
                  detail: {
                    vi: "Khi công trình xây xong, Thợ xây đã tự động rảnh để nhận việc mới; điểm Lực chiến công trình chỉ cộng vào sự kiện tại giây bạn chạm tay mở Gift Box trên mái nhà.",
                    en: "Once a building timer finishes, the Builder Queue is immediately freed for a new job; building power points only register for events the exact second you tap the roof Gift Box.",
                  },
                },
              ],
            },
          ],
        },
        {
          id: "sub-1-2-guild-help-and-economic-hero-traits",
          title: {
            vi: "1.2. Kỷ luật Vàng Trước Khi Dùng Tăng Tốc & Thông Số Ground-Truth Nội Tại Tướng Kinh Tế (12 Sao / Trait 3 Lv.30)",
            en: "1.2. Golden Pre-Speedup Discipline & Ground-Truth Passive Economic Hero Traits (12-Star / Trait 3 Lv.30)",
          },
          blocks: [
            {
              type: "list",
              ordered: true,
              items: [
                {
                  vi: "**Đợi đầy thanh Trợ giúp Bang hội (Guild Help)**: Mỗi lượt bấm trợ giúp cắt giảm trực tiếp thời gian xây; cắn bình tăng tốc ngay khi vừa bấm xây sẽ làm mất trắng `30 phút` đến hàng giờ giảm giá miễn phí mỗi ngày.",
                  en: "**Always Wait for a Full Guild Help Bar**: Each guildmate tap directly cuts construction duration; using speed-ups immediately after starting an upgrade wastes `30 minutes` to several hours of free daily reduction.",
                },
                {
                  vi: "**Tăng Tốc độ Xây dựng (Construction Rate)**: Tướng Vàng Liên Minh **Bard** (`+40%` Construction Rate ở `Trait 3 Lv.30`) — kích hoạt thụ động ngay trong kho tướng, không cần đưa vào đội hình ra trận.",
                  en: "**Construction Rate Boost**: League Legendary SSR Hero **Bard** (`+40%` Construction Rate at `Trait 3 Lv.30`)—activates passively from your hero roster without needing to be deployed in a march queue.",
                },
                {
                  vi: "**Tăng Tốc độ Nghiên cứu (Tech Research Rate)**: Tướng Tím **Brawler** (`+30%` ở mốc `12 Sao` / `Trait 3 Lv.30`) cộng dồn với Tướng Vàng **Shaman** (`+40%` Tech Research Rate).",
                  en: "**Tech Research Rate Boost**: Epic Hero **Brawler** (`+30%` at `12-Star` / `Trait 3 Lv.30`) stacking with Legendary Hero **Shaman** (`+40%` Tech Research Rate).",
                },
                {
                  vi: "**Tăng Tốc độ Huấn luyện Lính (Soldier Training Speed)**: Tướng Tím **Knight** (`+30%` ở mốc `12 Sao` / `Trait 3 Lv.30`) cộng dồn với Tướng Vàng **Hostess** (`+40%` Soldier Training Speed).",
                  en: "**Soldier Training Speed Boost**: Epic Hero **Knight** (`+30%` at `12-Star` / `Trait 3 Lv.30`) stacking with Legendary Hero **Hostess** (`+40%` Soldier Training Speed).",
                },
                {
                  vi: "**Tốc độ Thu thập (Gathering Speed)**: Tím **Ranger** (`+30%` Ruby), **Rogue** (`+30%` Đá), **Outlaw** (`+30%` Gỗ) + Vàng **Headhunter** (`+40%` Ruby), **Stonemason** (`+40%` Đá), **Treeguard** (`+40%` Gỗ).",
                  en: "**Gathering Speed**: Epic **Ranger** (`+30%` Ruby), **Rogue** (`+30%` Stone), **Outlaw** (`+30%` Timber) + SSR **Headhunter** (`+40%` Ruby), **Stonemason** (`+40%` Stone), **Treeguard** (`+40%` Timber).",
                },
                {
                  vi: "**Tăng Tốc độ Chữa thương Bệnh viện (Healing Speed)**: Bộ 3 Tướng Tím **Minister** / **Priestess** / **Dancer** (`+30%` Tốc độ Chữa thương mỗi tướng ở mốc `12 Sao` / `Trait 3 Lv.30`).",
                  en: "**Hospital Healing Speed Boost**: Epic trio **Minister** / **Priestess** / **Dancer** (`+30%` Healing Speed each at `12-Star` / `Trait 3 Lv.30`).",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "sec-2-builder-stage-matrix-and-checklist",
      title: {
        vi: "2. Chiến thuật Tối ưu cho F2P & Low-Spender: Ma Trận Phối Hợp Thợ Xây Theo 2 Giai Đoạn & 3 Phe Phái",
        en: "2. F2P & Low-Spender Strategy: 2-Stage Builder Coordination Matrix Across 3 Factions",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "Tùy thuộc vào tuổi Server và lộ trình Phe phái (`League`, `Horde`, `Nature`), trọng tâm điều phối của **3 Đội Thợ xây** sẽ dịch chuyển qua 2 giai đoạn chiến lược rõ rệt:",
            en: "Depending on server age and your chosen Faction path (`League`, `Horde`, or `Nature`), the focus of your **3 Builder Queues** shifts across two distinct progression stages:",
          },
        },
      ],
      subSections: [
        {
          id: "sub-2-1-two-stage-builder-matrix",
          title: {
            vi: "2.1. Ma trận Phối hợp Thợ Xây Theo Giai đoạn & 3 Phe Phái (Stage 1 Lv.25 vs Stage 2 Lv.30–35)",
            en: "2.1. 2-Stage Builder Coordination Matrix Across 3 Factions (Stage 1 Lv.25 vs. Stage 2 Lv.30–35)",
          },
          blocks: [
            {
              type: "table",
              caption: {
                vi: "Bảng 2.1: Ma Trận Phối Hợp Thợ Xây Theo 2 Giai Đoạn Phát Triển & 3 Phe Phái",
                en: "Table 2.1: 2-Stage Builder Queue Coordination Matrix Across 3 Factions",
              },
              headers: [
                {
                  vi: "Giai Đoạn Phát Triển",
                  en: "Progression Stage",
                },
                {
                  vi: "Ưu Tiên Số 1 (Thợ 1 & Thợ 2)",
                  en: "Priority #1 (Builder 1 & Builder 2)",
                },
                {
                  vi: "Ưu Tiên Số 2 (Thợ 3 — Hỗ Trợ & Chuẩn Bị Pivot)",
                  en: "Priority #2 (Builder 3 — Support & Pivot Prep)",
                },
                {
                  vi: "Ưu Tiên Số 3 (Xây Khi Kẹt Tài Nguyên)",
                  en: "Priority #3 (Resource Bottleneck Filler)",
                },
                {
                  vi: "Ưu Tiên Số 4 (Kho Mồi Nhiệm Vụ)",
                  en: "Priority #4 (Quest & Event Bait Bank)",
                },
              ],
              rows: [
                [
                  {
                    vi: "Giai đoạn 1: Đua Mốc Cấp 25 (Tuần 1 ➔ Tuần 3)",
                    en: "Stage 1: Rush to Lv.25 (Week 1 ➔ Week 3)",
                  },
                  {
                    vi: "• Lâu Đài (Lv.1 ➔ Lv.25)\n• Doanh Trại Hệ Đang Chơi (thường là Liên Minh Lv.1 ➔ Lv.25 để lấy Lính T8)\n• Sân Tập (Training Ground) & Hội (Guild) Lv.25",
                    en: "• Castle (Lv.1 ➔ Lv.25)\n• Active Main Barracks (typically League Lv.1 ➔ Lv.25 to unlock T8 Troops)\n• Training Ground & Guild Lv.25",
                  },
                  {
                    vi: "• Viện Nghiên Cứu (Research Cottage) & Bệnh Viện (Hospital) Lv.24 ➔ Lv.25\n• (Nếu theo lộ trình Horde Pivot): Kéo Doanh Trại Bộ Lạc đuổi theo lên Lv.23 ➔ Lv.25 trước Ngày 21!",
                    en: "• Research Cottage & Hospital Lv.24 ➔ Lv.25\n• (If executing Horde Pivot): Push Horde Barracks up to Lv.23 ➔ Lv.25 before Day 21!",
                  },
                  {
                    vi: "• Tượng Phe Phái Chính (Lv.20 ➔ Lv.25)\n• Sảnh Tập Kết (Rally Hall Lv.10 ➔ Lv.15)\n• Mỏ Quặng Cường Hóa",
                    en: "• Main Faction Statue (Lv.20 ➔ Lv.25)\n• Rally Hall (Lv.10 ➔ Lv.15)\n• Enhancement Ore Mine",
                  },
                  {
                    vi: "Giữ Mỏ Gỗ, Mỏ Đá, Trang Trại, Nhà Kho ở Lv.12–14 để làm mồi hoàn thành nhiệm vụ xây dựng hàng ngày trong 5 phút.",
                    en: "Keep Lumber Mill, Quarry, Farm, and Warehouse at Lv.12–14 as 5-minute bait upgrades for daily construction quests.",
                  },
                ],
                [
                  {
                    vi: "Giai đoạn 2: Đua Mốc Cấp 30 – 35 (Từ Tuần 4 / Ngày 21+)",
                    en: "Stage 2: Rush to Lv.30 – 35 (From Week 4 / Day 21+)",
                  },
                  {
                    vi: "• Lâu Đài (Lv.25 ➔ Lv.30 ➔ Lv.35)\n• Doanh Trại Hệ Endgame (Bộ Lạc / Liên Minh / Thiên Nhiên Lv.25 ➔ Lv.35 mở Lính T10)\n• Xây ngay Sảnh Lãnh Chúa (Lord Hall) & Sảnh Huân Chương (Medal Hall) vừa mở ở Lv.25",
                    en: "• Castle (Lv.25 ➔ Lv.30 ➔ Lv.35)\n• Endgame Faction Barracks (Horde / League / Nature Lv.25 ➔ Lv.35 unlocking T10 Troops)\n• Immediately build Lord Hall & Medal Hall unlocked at Lv.25",
                  },
                  {
                    vi: "• Tượng Hệ Endgame (Lv.25 ➔ Lv.35)\n• Viện Nghiên Cứu & Bệnh Viện (Lv.25 ➔ Lv.34)\n• Duy trì Doanh Trại Đội 2 ở mốc dừng Lv.25",
                    en: "• Endgame Faction Statue (Lv.25 ➔ Lv.35)\n• Research Cottage & Hospital (Lv.25 ➔ Lv.34)\n• Freeze Queue 2 Barracks at the Lv.25 stop-point",
                  },
                  {
                    vi: "• Mỏ Đá Vân Ma Thuật, Tu Viện (Monastery)\n• Mỏ Huân Chương (Medal Monument)\n• Mỏ Ruby (Ưu tiên cao hơn Gỗ/Đá vì cuối game cực khát Ruby)",
                    en: "• Magic Stone Mine, Monastery\n• Medal Monument\n• Ruby Mine (Higher priority than Timber/Stone due to late-game Ruby starvation)",
                  },
                  {
                    vi: "Tiếp tục dùng các công trình cấp thấp còn sót lại để rướn điểm Nhiệm vụ Vàng Guild Race (Thi Đấu Hội).",
                    en: "Continue using remaining low-level resource nodes to snipe Legendary Guild Race tasks (Guild Race).",
                  },
                ],
              ],
            },
          ],
        },
        {
          id: "sub-2-2-builder-villager-daily-checklist",
          title: {
            vi: "2.2. Danh sách Kiểm tra Quản lý Thợ Xây & Dân Làng Hàng Ngày (Actionable Checklist)",
            en: "2.2. Daily Builder Queue & Villager Management Checklist",
          },
          blocks: [
            {
              type: "checklist",
              checklistId: "builder-villager-daily-audit-v2",
              title: {
                vi: "Bảng Kiểm Tra Kỷ Luật Vận Hành Thợ Xây & Dân Làng Hàng Ngày",
                en: "Daily Builder Queue & Villager Optimization Audit Checklist",
              },
              description: {
                vi: "Đánh dấu xác nhận 4 bước kiểm toán mỗi ngày để đảm bảo 0 phút thợ xây nhàn rỗi và tối đa hóa chỉ số Dân làng (Villagers Lv.1–6):",
                en: "Complete these 4 daily audit checks to guarantee zero builder idle time and maximum Villager (Lv.1–6) stat efficiency:",
              },
              items: [
                {
                  id: "chk-8-2-1",
                  label: {
                    vi: "Kiểm tra Danh sách Công trình mỗi sáng: 0 phút trạng thái Zzz (Nhàn rỗi)",
                    en: "Morning Building Queue Audit: Zero Zzz (Idle) Builder Status",
                  },
                  detail: {
                    vi: "Đảm bảo cả 3–4 Hàng đợi Thợ xây vận hành đúng phân luồng (Thợ 1 `Castle`, Thợ 2 Điều kiện & `Main Barracks`, Thợ 3 Hỗ trợ/Mồi sự kiện), không để thợ nghỉ quá `15 phút`.",
                    en: "Verify all 3–4 Builder Queues run on their dedicated lanes (Builder 1 `Castle`, Builder 2 Prerequisites & `Main Barracks`, Builder 3 Support/Bait) with zero idle time over `15 minutes`.",
                  },
                  badge: {
                    vi: "MỖI SÁNG",
                    en: "EVERY MORNING",
                  },
                },
                {
                  id: "chk-8-2-2",
                  label: {
                    vi: "Tắt Auto-Assign & Gán thủ công Dân làng (Villagers & Famous Villagers) cấp cao nhất",
                    en: "Disable Auto-Assign & Manually Slot Top-Tier Villagers & Famous Villagers",
                  },
                  detail: {
                    vi: "Tháo Dân làng khỏi Mỏ Gỗ/Đá, gán vào `Research Cottage` (`+3.20%` & `432s`), `Guild` (`+5` Help), `Castle` (`+2.00%` & `160s`), `Medal Hall` (`+17.50%` HP & `+5.60%` ATK), `Main Barracks` (`+4.40%` & `+13`).",
                    en: "Strip Villagers from mills and slot into `Research Cottage` (`+3.20%` & `432s`), `Guild` (`+5` Help), `Castle` (`+2.00%` & `160s`), `Medal Hall` (`+17.50%` HP & `+5.60%` ATK), `Main Barracks` (`+4.40%` & `+13`).",
                  },
                  badge: {
                    vi: "ƯU TIÊN S+",
                    en: "S+ PRIORITY",
                  },
                },
                {
                  id: "chk-8-2-3",
                  label: {
                    vi: "Kiểm tra Nội tại Tướng Kinh Tế (Bard +40%) & Đợi đầy Guild Help trước khi tăng tốc",
                    en: "Verify Passive Economic Heroes (Bard +40%) & Full Guild Help Bar Before Speeding Up",
                  },
                  detail: {
                    vi: "Đảm bảo **Bard** (`+40%`), **Brawler** (`+30%`) + **Shaman** (`+40%`), **Knight** (`+30%`) + **Hostess** (`+40%`) đã nâng `Trait 3 Lv.30` và thanh `Guild Help` đầy `100%` trước khi cắn bình Tăng tốc.",
                    en: "Confirm **Bard** (`+40%`), **Brawler** (`+30%`) + **Shaman** (`+40%`), and **Knight** (`+30%`) + **Hostess** (`+40%`) have `Trait 3 Lv.30` active and `Guild Help` is `100%` full before using Speed-ups.",
                  },
                  badge: {
                    vi: "TRƯỚC KHI XẢ TĂNG TỐC",
                    en: "PRE-SPEEDUP GATE",
                  },
                },
                {
                  id: "chk-8-2-4",
                  label: {
                    vi: "Thiết lập Dự án Xuyên Đêm (8–12+ giờ) lúc 23:00 & Găm Hộp Quà (Gift Box) Chủ Nhật",
                    en: "Queue Overnight Projects (8–12h+) at 23:00 & Bank Unopened Gift Boxes on Sunday",
                  },
                  detail: {
                    vi: "Trước khi ngủ, nếu hàng đợi còn dưới `1–2 giờ`, hãy dùng ít tăng tốc dứt điểm rồi bấm nhà dài `8–12+ giờ`; vào Chủ Nhật giữ nguyên biểu tượng `Gift Box` trên mái nhà chờ Thứ Hai Kỳ GAR/KvK.",
                    en: "Before bed, finish any queue under `1–2 hours` and start an `8–12h+` overnight upgrade; on Sunday, leave completed `Gift Box` icons untouched on the roof for GAR/KvK Monday.",
                  },
                  badge: {
                    vi: "23:00 MỖI TỐI",
                    en: "NIGHTLY 23:00 SYNC",
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "sec-3-builder-villager-common-pitfalls",
      title: {
        vi: "3. Những Cạm bẫy Phổ biến & Cách Phòng tránh (Common Pitfalls)",
        en: "3. Common Builder Queue & Villager Pitfalls",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "Ba sai lầm vận hành dưới đây khiến hai tài khoản có cùng số lượng Thợ xây nhưng chênh lệch từ `3 đến 5 cấp Lâu Đài` và mất hàng chục ngàn điểm sự kiện mỗi tuần:",
            en: "The three operational mistakes below explain why two accounts with the same Builder Queues end up `3 to 5 Castle levels` apart and lose tens of thousands of weekly points:",
          },
        },
        {
          type: "table",
          caption: {
            vi: "Bảng 3.1: 3 Sai Lầm Phổ Biến Khi Điều Phối Thợ Xây & Dân Làng Và Giải Pháp Tối Ưu",
            en: "Table 3.1: 3 Common Builder Queue & Villager Pitfalls vs. Min-Max Solutions",
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
                vi: "Để tính năng 'Tự động phân công Dân Làng (Auto-Assign Villagers)' tự xếp ngẫu nhiên: Hệ thống thường nhét các Dân làng cấp cao vào Mỏ Gỗ/Đá trong khi Viện Nghiên Cứu (Research Cottage) hoặc Doanh Trại Đội 1 (Main Barracks) lại bị bỏ trống hoặc gắn Dân làng cấp thấp.",
                en: "Relying on 'Auto-Assign Villagers' random placement: The game algorithm frequently dumps high-rarity Villagers into Timber/Stone mills while leaving the Research Cottage, Medal Hall, or Main Barracks empty or stuck with Lv.1 Villagers.",
              },
              {
                vi: "Kiểm tra & Gán Thủ Công Theo Hiệu Ứng: Vào từng công trình trọng điểm (Research Cottage, Castle, Guild, Medal Hall, Main Barracks, Hospital) để gán đúng Dân làng và Famous Villagers có dòng kỹ năng cộng % Tốc độ (+3.20% NC, +2.00% Xây dựng), Chỉ số Lính (+17.50% HP, +5.60% ATK) và Lượt Trợ giúp (+5 lượt) cao nhất.",
                en: "Manual Perk-Based Assignment: Inspect each core building (Research Cottage, Castle, Guild, Medal Hall, Main Barracks, Hospital) and manually slot Villagers and Famous Villagers with the highest % Speed (+3.20% Tech, +2.00% Build), Soldier Stats (+17.50% HP, +5.60% ATK), and Help Accepted Count (+5).",
              },
            ],
            [
              {
                vi: "Bấm công trình mất 20 phút trước khi đi ngủ 8 tiếng: Khiến hàng đợi thợ xây bị đứng không suốt 7 tiếng 40 phút ban đêm (mỗi tuần mất trắng hơn 50 giờ lao động của mỗi thợ!).",
                en: "Starting a 20-minute upgrade right before an 8-hour sleep: Leaves the Builder Queue completely idle for 7 hours and 40 minutes every night (wasting over 50 hours of builder labor per queue every single week!).",
              },
              {
                vi: "Quy tắc Phân Luồng Ngày – Đêm (Sleep-Cycle Routing): Ban ngày (khi online liên tục 08:00–22:00) chỉ bấm các công trình ngắn 15 phút – 3 giờ để ăn tối đa Guild Help; ban đêm (23:00) bắt buộc bấm các công trình dài 8 – 48 giờ chạy xuyên đêm.",
                en: "Day–Night Sleep-Cycle Routing: During active daytime hours (08:00–22:00), run short 15-minute to 3-hour upgrades to farm maximum Guild Helps; before sleep (23:00), strictly queue long 8-to-48-hour projects.",
              },
            ],
            [
              {
                vi: "Bấm khui 'Hộp Quà Công Trình' (Unopened Gift Box) ngay khi xây xong vào Thứ Bảy / Chủ Nhật: Làm mất trắng hàng chục ngàn điểm sự kiện công trình vào sáng Thứ Hai tuần kế tiếp.",
                en: "Tapping the 'Unopened Gift Box' on completed buildings on Saturday or Sunday: Wastes tens of thousands of construction power points right before Monday's event reset.",
              },
              {
                vi: "Kỹ thuật Găm Hộp Quà Trên Mái Nhà (Gift Box Banking): Khi công trình xây xong, điểm Lực chiến công trình chỉ được cộng vào sự kiện tại thời điểm bạn chạm tay vào Gift Box trên nóc nhà. Hãy để nguyên hộp quà đó chờ tới Thứ Hai Kỳ GAR/KvK (Arms Race Day 1) mới bấm mở!",
                en: "Rooftop Gift Box Banking: When a building upgrade finishes, its Building Power points are only credited at the exact moment you tap the Gift Box icon on the roof. Leave the Gift Box untouched until GAR/KvK Monday (Arms Race Day 1) before popping it!",
              },
            ],
          ],
        },
      ],
    },
  ],
  proSections: [
    {
      id: "sec-4-villagers-master-table-and-sleep-sync",
      isPro: true,
      title: {
        vi: "4. Phân tích Định lượng Dân Làng (Villagers Lv.1 ➔ Lv.6) & Kỹ Thuật Xếp Lịch Theo Giờ Ngủ / Ngày Sự Kiện",
        en: "4. Quantitative Villager Table (Lv.1 ➔ Lv.6) & Sleep-Cycle / Event-Sync Scheduling",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "**Gia tăng Chiến đấu & Kinh tế**: Hệ thống **Dân Làng** (`Villagers`) và **Famous Villagers** cộng chỉ số toàn cục (`+17.50%` HP, `+5.60%` ATK toàn bộ lính) và giảm trực tiếp thời gian nghiên cứu/xây dựng.\n• **Nguồn dữ liệu**: Bảng thông số định lượng chính xác từ `Lv.1 ➔ Lv.6` dưới đây được trích xuất từ **TopHeroes Tables - Max** (`Tab Villagers`):",
            en: "**Global Combat & Speed Boosts**: The **Villagers** and **Famous Villagers** system grants massive global combat stats (`+17.50%` HP and `+5.60%` ATK to all soldiers) and directly slashes research/build timers.\n• **Data Source**: Below is the complete `Lv.1 ➔ Lv.6` quantitative dataset extracted from **TopHeroes Tables - Max** (`Tab Villagers`):",
          },
        },
      ],
      subSections: [
        {
          id: "sub-4-1-villagers-lv1-to-lv6-master-table",
          title: {
            vi: "4.1. Bảng Tra Cứu Toàn Diện Hệ Thống Dân Làng & Gia Tinh (Villagers & Famous Villagers Lv.1 ➔ Lv.6)",
            en: "4.1. Complete Quantitative Villagers & Famous Villagers Master Table (Lv.1 ➔ Lv.6)",
          },
          blocks: [
            {
              type: "media_spotlight",
              mediaCode: "MED-8.2-03",
              tier: "tier2_annotated_ui",
              title: {
                vi: "Giao Diện Gán Dân Làng (Villager Assignment) Tại Viện Nghiên Cứu & Sảnh Huân Chương",
                en: "Villager Assignment UI in the Research Cottage & Medal Hall",
              },
              description: {
                vi: "Ảnh chụp giao diện Quản lý Dân Làng (Villager Assignment) trong Research Cottage và Medal Hall, đánh dấu tích xanh vào các dòng kỹ năng S+ (+Tech Research Speed +0.60%➔+3.20%, Free Tech Speed-up 40s➔360s/432s) và kỹ năng chiến đấu S (+HP of All Soldiers +17.50%, +Attack of All Soldiers +5.60%).",
                en: "Annotated screenshot of the Villager Assignment interface inside the Research Cottage and Medal Hall, highlighting S+ research perks (+Tech Research Speed +0.60%➔+3.20%, Free Tech Speed-up 40s➔360s/432s) and S-tier global soldier buffs (+HP of All Soldiers +17.50%, +Attack of All Soldiers +5.60%).",
              },
              annotations: [
                {
                  kind: "do",
                  label: {
                    vi: "Ưu tiên Số 1 Tuyệt Đối: Research Cottage (+3.20% Tech Speed & 360s/432s miễn phí)",
                    en: "Absolute #1 Priority: Research Cottage (+3.20% Tech Speed & 360s/432s Free Speed-up)",
                  },
                  detail: {
                    vi: "Gán các Dân làng và Famous Villagers cấp cao nhất (Lv.4–Lv.6) vào Viện Nghiên Cứu để giảm trực tiếp thời gian gốc của mọi nhánh công nghệ trước khi tính Guild Help.",
                    en: "Slot your highest-level Villagers and Famous Villagers (Lv.4–Lv.6) into the Research Cottage to cut the base duration of every tech node before Guild Help is applied.",
                  },
                },
                {
                  kind: "info",
                  label: {
                    vi: "Đòn bẩy Chiến đấu Ngầm tại Medal Hall (+17.50% HP & +5.60% ATK Toàn bộ Lính)",
                    en: "Hidden Combat Multiplier in Medal Hall (+17.50% All Soldier HP & +5.60% ATK)",
                  },
                  detail: {
                    vi: "Dân làng gắn tại Sảnh Huân Chương cộng thẳng % Máu và % Công cho toàn bộ binh lính của mọi hệ, cộng hưởng nhân (multiplicative) với hệ thống Quân trang (Troop Skins).",
                    en: "Villagers assigned to the Medal Hall grant flat % HP and % ATK across all faction soldiers, scaling multiplicatively with your Troop Skins.",
                  },
                },
                {
                  kind: "dont",
                  label: {
                    vi: "Không bỏ quên Mỏ Ruby / Mỏ Đá Vân / Mỏ Huân Chương (+143.75% Sản lượng & 16,560s Lưu trữ)",
                    en: "Never Neglect Ruby / Magic Stone / Medal Mines (+143.75% Yield & 16,560s Storage)",
                  },
                  detail: {
                    vi: "Ở bậc Lv.6, Dân làng tăng hơn gấp đôi (+143.75%) sản lượng Ruby, Đá Vân Ma Thuật và Huân Chương thu hoạch thụ động kèm +16,560s thời gian lưu trữ không bị tràn.",
                    en: "At Lv.6, Villagers more than double (+143.75%) passive Ruby, Magic Stone, and Glory Medal output while extending storage cap time by +16,560s.",
                  },
                },
              ],
            },
            {
              type: "table",
              caption: {
                vi: "Bảng 4.1: Bảng Thông Số Định Lượng Dân Làng & Dân Làng Danh Tiếng (Villagers & Famous Villagers Lv.1 ➔ Lv.6 — Tab Villagers)",
                en: "Table 4.1: Quantitative Villagers & Famous Villagers Skill Matrix (Lv.1 ➔ Lv.6 — Tab Villagers)",
              },
              headers: [
                {
                  vi: "Thứ Tự Ưu Tiên",
                  en: "Priority Tier",
                },
                {
                  vi: "Công Trình Áp Dụng (Affected Building)",
                  en: "Affected Building",
                },
                {
                  vi: "Kỹ Năng / Đặc Quyền Dân Làng (Perk / Skill)",
                  en: "Villager Perk / Skill",
                },
                {
                  vi: "Cấp 1 (Lv.1)",
                  en: "Level 1 (Lv.1)",
                },
                {
                  vi: "Cấp 2 (Lv.2)",
                  en: "Level 2 (Lv.2)",
                },
                {
                  vi: "Cấp 3 (Lv.3)",
                  en: "Level 3 (Lv.3)",
                },
                {
                  vi: "Cấp 4 (Lv.4)",
                  en: "Level 4 (Lv.4)",
                },
                {
                  vi: "Cấp 5 (Lv.5)",
                  en: "Level 5 (Lv.5)",
                },
                {
                  vi: "Cấp 6 (Lv.6)",
                  en: "Level 6 (Lv.6)",
                },
                {
                  vi: "Đánh Giá Chiến Thuật & ROI",
                  en: "Tactical Evaluation & ROI",
                },
              ],
              rows: [
                [
                  {
                    vi: "[S+ ★] (Số 1)",
                    en: "[S+ ★] (#1)",
                  },
                  {
                    vi: "Viện Nghiên Cứu (Research Cottage)",
                    en: "Research Cottage",
                  },
                  {
                    vi: "Tech Research Speed (Tốc độ Nghiên cứu)",
                    en: "Tech Research Speed",
                  },
                  {
                    vi: "+0.60%",
                    en: "+0.60%",
                  },
                  {
                    vi: "+1.00% / +1.20%",
                    en: "+1.00% / +1.20%",
                  },
                  {
                    vi: "+1.40% / +1.68%",
                    en: "+1.40% / +1.68%",
                  },
                  {
                    vi: "+2.00% / +2.40%",
                    en: "+2.00% / +2.40%",
                  },
                  {
                    vi: "+3.20%",
                    en: "+3.20%",
                  },
                  {
                    vi: "—",
                    en: "—",
                  },
                  {
                    vi: "ROI cao nhất game. Giảm trực tiếp thời gian gốc của mọi nhánh công nghệ.",
                    en: "Highest ROI in the game. Directly cuts base research duration across all tech trees.",
                  },
                ],
                [
                  {
                    vi: "[S+ ★] (Số 1)",
                    en: "[S+ ★] (#1)",
                  },
                  {
                    vi: "Viện Nghiên Cứu (Research Cottage)",
                    en: "Research Cottage",
                  },
                  {
                    vi: "Free Tech Speed-up (sec) (Giảm giây NC miễn phí)",
                    en: "Free Tech Speed-up (sec)",
                  },
                  {
                    vi: "40s",
                    en: "40s",
                  },
                  {
                    vi: "60s",
                    en: "60s",
                  },
                  {
                    vi: "100s",
                    en: "100s",
                  },
                  {
                    vi: "160s / 192s",
                    en: "160s / 192s",
                  },
                  {
                    vi: "240s / 288s",
                    en: "240s / 288s",
                  },
                  {
                    vi: "360s / 432s",
                    en: "360s / 432s",
                  },
                  {
                    vi: "Cắt giảm trực tiếp số giây cho mỗi lần bấm nghiên cứu (cực lợi khi chạy mồi Economy).",
                    en: "Directly subtracts flat seconds from every research click (massive for Economy bait nodes).",
                  },
                ],
                [
                  {
                    vi: "[S+ ★] (Số 2)",
                    en: "[S+ ★] (#2)",
                  },
                  {
                    vi: "Hội (Guild)",
                    en: "Guild",
                  },
                  {
                    vi: "Help Accepted Count (Số lượt nhận Trợ giúp)",
                    en: "Help Accepted Count",
                  },
                  {
                    vi: "+1 lượt",
                    en: "+1 Help",
                  },
                  {
                    vi: "+2 lượt",
                    en: "+2 Helps",
                  },
                  {
                    vi: "+3 lượt",
                    en: "+3 Helps",
                  },
                  {
                    vi: "+4 lượt",
                    en: "+4 Helps",
                  },
                  {
                    vi: "+5 lượt",
                    en: "+5 Helps",
                  },
                  {
                    vi: "—",
                    en: "—",
                  },
                  {
                    vi: "Tăng trần số bàn tay Bang hội giúp đỡ cho cả Xây dựng lẫn Nghiên cứu!",
                    en: "Raises the maximum cap of guildmate hand helps for both Construction and Research!",
                  },
                ],
                [
                  {
                    vi: "[S+ ★] (Số 2)",
                    en: "[S+ ★] (#2)",
                  },
                  {
                    vi: "Lâu Đài (Castle)",
                    en: "Castle",
                  },
                  {
                    vi: "Construction Speed (Tốc độ Xây dựng)",
                    en: "Construction Speed",
                  },
                  {
                    vi: "+0.60%",
                    en: "+0.60%",
                  },
                  {
                    vi: "+1.00%",
                    en: "+1.00%",
                  },
                  {
                    vi: "+1.40%",
                    en: "+1.40%",
                  },
                  {
                    vi: "+2.00%",
                    en: "+2.00%",
                  },
                  {
                    vi: "—",
                    en: "—",
                  },
                  {
                    vi: "—",
                    en: "—",
                  },
                  {
                    vi: "Giảm thời gian xây dựng toàn bộ công trình trong làng (cộng dồn với Bard +40%).",
                    en: "Reduces construction time for all village buildings (stacks with Bard +40%).",
                  },
                ],
                [
                  {
                    vi: "[S+ ★] (Số 2)",
                    en: "[S+ ★] (#2)",
                  },
                  {
                    vi: "Lâu Đài (Castle)",
                    en: "Castle",
                  },
                  {
                    vi: "Free Construction Time (sec) (Giây xây miễn phí)",
                    en: "Free Construction Time (sec)",
                  },
                  {
                    vi: "40s",
                    en: "40s",
                  },
                  {
                    vi: "60s",
                    en: "60s",
                  },
                  {
                    vi: "100s",
                    en: "100s",
                  },
                  {
                    vi: "160s",
                    en: "160s",
                  },
                  {
                    vi: "—",
                    en: "—",
                  },
                  {
                    vi: "—",
                    en: "—",
                  },
                  {
                    vi: "Rút ngắn thời gian hoàn thành tức thì cho các công trình.",
                    en: "Grants instant flat-second completion reduction on building upgrades.",
                  },
                ],
                [
                  {
                    vi: "S (Số 3)",
                    en: "S (#3)",
                  },
                  {
                    vi: "Sảnh Huân Chương (Medal Hall)",
                    en: "Medal Hall",
                  },
                  {
                    vi: "HP of All Soldiers (Máu Toàn bộ Lính)",
                    en: "HP of All Soldiers",
                  },
                  {
                    vi: "+1.50%",
                    en: "+1.50%",
                  },
                  {
                    vi: "+2.70%",
                    en: "+2.70%",
                  },
                  {
                    vi: "+4.20%",
                    en: "+4.20%",
                  },
                  {
                    vi: "+6.80%",
                    en: "+6.80%",
                  },
                  {
                    vi: "+11.00%",
                    en: "+11.00%",
                  },
                  {
                    vi: "+17.50%",
                    en: "+17.50%",
                  },
                  {
                    vi: "Buff thẳng % Máu cho toàn bộ quân lính mọi hệ!",
                    en: "Directly buffs % HP for all soldiers across every faction!",
                  },
                ],
                [
                  {
                    vi: "S (Số 3)",
                    en: "S (#3)",
                  },
                  {
                    vi: "Sảnh Huân Chương (Medal Hall)",
                    en: "Medal Hall",
                  },
                  {
                    vi: "Attack of All Soldiers (Công Toàn bộ Lính)",
                    en: "Attack of All Soldiers",
                  },
                  {
                    vi: "+0.80%",
                    en: "+0.80%",
                  },
                  {
                    vi: "+1.40%",
                    en: "+1.40%",
                  },
                  {
                    vi: "+2.20%",
                    en: "+2.20%",
                  },
                  {
                    vi: "+3.50%",
                    en: "+3.50%",
                  },
                  {
                    vi: "+5.60%",
                    en: "+5.60%",
                  },
                  {
                    vi: "—",
                    en: "—",
                  },
                  {
                    vi: "Cộng hưởng trực tiếp với hệ thống Quân trang (Troop Skins).",
                    en: "Synergizes directly with the Troop Skins military gear system.",
                  },
                ],
                [
                  {
                    vi: "S (Số 3)",
                    en: "S (#3)",
                  },
                  {
                    vi: "Doanh Trại 3 Hệ (League / Horde / Nature Barracks)",
                    en: "3-Faction Barracks (League / Horde / Nature Barracks)",
                  },
                  {
                    vi: "Faction Soldier Training Speed (Tốc độ Luyện lính)",
                    en: "Faction Soldier Training Speed",
                  },
                  {
                    vi: "+0.60%",
                    en: "+0.60%",
                  },
                  {
                    vi: "+1.00%",
                    en: "+1.00%",
                  },
                  {
                    vi: "+1.80%",
                    en: "+1.80%",
                  },
                  {
                    vi: "+2.80%",
                    en: "+2.80%",
                  },
                  {
                    vi: "+4.40%",
                    en: "+4.40%",
                  },
                  {
                    vi: "—",
                    en: "—",
                  },
                  {
                    vi: "Cực kỳ quan trọng để đua điểm lính vào Thứ Sáu Kỳ GAR/KvK (GAR Day 5).",
                    en: "Crucial for maximizing troop training points on GAR/KvK Friday (GAR Day 5).",
                  },
                ],
                [
                  {
                    vi: "S (Số 3)",
                    en: "S (#3)",
                  },
                  {
                    vi: "Doanh Trại 3 Hệ & Troop Skin Center",
                    en: "3-Faction Barracks & Troop Skin Center",
                  },
                  {
                    vi: "Soldier Training Cap (Sức chứa Luyện lính)",
                    en: "Soldier Training Cap",
                  },
                  {
                    vi: "+1",
                    en: "+1",
                  },
                  {
                    vi: "+2",
                    en: "+2",
                  },
                  {
                    vi: "+3",
                    en: "+3",
                  },
                  {
                    vi: "+5",
                    en: "+5",
                  },
                  {
                    vi: "+8",
                    en: "+8",
                  },
                  {
                    vi: "+13",
                    en: "+13",
                  },
                  {
                    vi: "Giúp mỗi mẻ huấn luyện chứa được nhiều lính hơn, không bị tràn khi ngủ.",
                    en: "Increases batch training capacity per run, preventing overnight queue overflow.",
                  },
                ],
                [
                  {
                    vi: "A+ (Số 4)",
                    en: "A+ (#4)",
                  },
                  {
                    vi: "Tượng Phe Phái (League / Horde / Nature Statue)",
                    en: "Faction Statue (League / Horde / Nature Statue)",
                  },
                  {
                    vi: "Faction March Size (Quy mô Hành quân Hệ)",
                    en: "Faction March Size",
                  },
                  {
                    vi: "+1",
                    en: "+1",
                  },
                  {
                    vi: "+2",
                    en: "+2",
                  },
                  {
                    vi: "+3",
                    en: "+3",
                  },
                  {
                    vi: "+5",
                    en: "+5",
                  },
                  {
                    vi: "+7",
                    en: "+7",
                  },
                  {
                    vi: "—",
                    en: "—",
                  },
                  {
                    vi: "Tăng trực tiếp số lượng lính đi cùng tướng, kèm +8 ➔ +80 ATK và +150 ➔ +1,700 HP.",
                    en: "Directly increases soldiers deployed with heroes, plus +8 ➔ +80 ATK and +150 ➔ +1,700 HP.",
                  },
                ],
                [
                  {
                    vi: "A+ (Số 4)",
                    en: "A+ (#4)",
                  },
                  {
                    vi: "Tượng Anh Hùng (Hero Statue)",
                    en: "Hero Statue",
                  },
                  {
                    vi: "Hero HP % & Hero Attack %",
                    en: "Hero HP % & Hero Attack %",
                  },
                  {
                    vi: "+0.18% HP / +0.09% ATK",
                    en: "+0.18% HP / +0.09% ATK",
                  },
                  {
                    vi: "+0.30% HP / +0.15% ATK",
                    en: "+0.30% HP / +0.15% ATK",
                  },
                  {
                    vi: "+0.50% HP / +0.25% ATK",
                    en: "+0.50% HP / +0.25% ATK",
                  },
                  {
                    vi: "+0.92% HP / +0.40% ATK",
                    en: "+0.92% HP / +0.40% ATK",
                  },
                  {
                    vi: "—",
                    en: "—",
                  },
                  {
                    vi: "—",
                    en: "—",
                  },
                  {
                    vi: "Cộng chỉ số phần trăm trực tiếp cho toàn bộ tướng.",
                    en: "Grants direct percentage HP and Attack bonuses to all heroes.",
                  },
                ],
                [
                  {
                    vi: "A (Số 5)",
                    en: "A (#5)",
                  },
                  {
                    vi: "Bệnh Viện (Hospital)",
                    en: "Hospital",
                  },
                  {
                    vi: "Hospital Capacity & Healing Speed",
                    en: "Hospital Capacity & Healing Speed",
                  },
                  {
                    vi: "+200 chỗ / +1% tốc",
                    en: "+200 Cap / +1% Speed",
                  },
                  {
                    vi: "+320 chỗ / +2% tốc",
                    en: "+320 Cap / +2% Speed",
                  },
                  {
                    vi: "+510 chỗ / +3% tốc",
                    en: "+510 Cap / +3% Speed",
                  },
                  {
                    vi: "+820 chỗ / +5% tốc",
                    en: "+820 Cap / +5% Speed",
                  },
                  {
                    vi: "+1,300 / +7% tốc",
                    en: "+1,300 Cap / +7% Speed",
                  },
                  {
                    vi: "+2,100 chỗ",
                    en: "+2,100 Cap",
                  },
                  {
                    vi: "Chống chết lính vĩnh viễn trong ngày chiến sự KvK / SvS.",
                    en: "Prevents permanent troop deaths during high-casualty KvK / SvS war days.",
                  },
                ],
                [
                  {
                    vi: "B (Số 6)",
                    en: "B (#6)",
                  },
                  {
                    vi: "Mỏ Đá Vân / Mỏ Huân Chương / Mỏ Ruby",
                    en: "Magic Stone / Medal Monument / Ruby Mine",
                  },
                  {
                    vi: "Yield Boost & Storage Time",
                    en: "Yield Boost & Storage Time",
                  },
                  {
                    vi: "+57.50% (+4,968s)",
                    en: "+57.50% (+4,968s)",
                  },
                  {
                    vi: "+69.00% (+6,210s)",
                    en: "+69.00% (+6,210s)",
                  },
                  {
                    vi: "+82.80% (+8,280s)",
                    en: "+82.80% (+8,280s)",
                  },
                  {
                    vi: "+98.90% (+10,598s)",
                    en: "+98.90% (+10,598s)",
                  },
                  {
                    vi: "+120.75% (+13,248s)",
                    en: "+120.75% (+13,248s)",
                  },
                  {
                    vi: "+143.75% (+16,560s)",
                    en: "+143.75% (+16,560s)",
                  },
                  {
                    vi: "Tăng hơn gấp đôi sản lượng Ruby, Đá Vân Ma Thuật và Huân Chương thu hoạch thụ động!",
                    en: "More than doubles passive Ruby, Magic Stone, and Glory Medal production and storage time!",
                  },
                ],
                [
                  {
                    vi: "B (Số 7)",
                    en: "B (#7)",
                  },
                  {
                    vi: "Đội Hình (Queue)",
                    en: "March Queue",
                  },
                  {
                    vi: "Adventure Boss Dmg / Reduction / ATK / HP",
                    en: "Adventure Boss Dmg / Reduction / ATK / HP",
                  },
                  {
                    vi: "+1%",
                    en: "+1%",
                  },
                  {
                    vi: "+2%",
                    en: "+2%",
                  },
                  {
                    vi: "+3%",
                    en: "+3%",
                  },
                  {
                    vi: "+5%",
                    en: "+5%",
                  },
                  {
                    vi: "+7%",
                    en: "+7%",
                  },
                  {
                    vi: "+10%",
                    en: "+10%",
                  },
                  {
                    vi: "Hỗ trợ vượt các ải Boss Bản đồ Phiêu lưu (Adventure Mode) bị kẹt lực chiến.",
                    en: "Helps push past power-walled Adventure Mode World Boss stages.",
                  },
                ],
              ],
            },
          ],
        },
        {
          id: "sub-4-2-sleep-cycle-and-gift-box-banking",
          title: {
            vi: "4.2. Kỹ thuật Xếp Lịch Xây Dựng Theo Giờ Ngủ & Ngày Sự Kiện (Sleep-Cycle & Event-Sync)",
            en: "4.2. Sleep-Cycle Construction Scheduling & Sunday Rooftop Gift Box Banking",
          },
          blocks: [
            {
              type: "paragraph",
              text: {
                vi: "Để không lãng phí giây phút nào của **3–4 Hàng đợi Thợ xây** và gom trọn `100%` điểm số của Kỳ Thi Đấu Hội (`Guild Race`) lẫn Kỳ GAR/KvK (`Arms Race Day 1`), hãy áp dụng sơ đồ điều phối nhịp sinh học 7 ngày dưới đây:",
                en: "To guarantee zero wasted seconds across **3–4 Builder Queues** while capturing `100%` of points in Guild Race and GAR/KvK (`Arms Race Day 1`), execute the 7-day biological & event-sync timeline below:",
              },
            },
            {
              type: "visual_diagram",
              mediaCode: "MED-8.2-01",
              variant: "timeline_phases",
              title: {
                vi: "Lịch Trình Đồng Bộ 3–4 Hàng Đợi Thợ Xây Theo Nhịp Sinh Học Ngày/Đêm & Kỹ Thuật Găm Hộp Quà (Sleep-Cycle & Gift Box Banking)",
                en: "3–4 Builder Queue Day/Night Sleep-Cycle & Sunday Rooftop Gift Box Banking Timeline",
              },
              subtitle: {
                vi: "Phối hợp Thợ 1–2 (Công trình Lớn 24h–72h) và Thợ 3 (Công trình Ngắn/Vừa) từ Thứ Ba đến Khung Giờ Vàng Thứ Hai Kỳ GAR/KvK",
                en: "Synchronizing Builders 1–2 (Major 24h–72h Upgrades) and Builder 3 (Short/Medium Projects) from Tuesday through GAR/KvK Monday's Golden Window",
              },
              centerNode: {
                id: "node-8-2-center-sleep-giftbox",
                badge: {
                  vi: "ĐỒNG BỘ CHU KỲ 7 NGÀY",
                  en: "7-DAY SYNC PROTOCOL",
                },
                title: {
                  vi: "LỊCH TRÌNH NHỊP SINH HỌC NGÀY/ĐÊM & KỸ THUẬT GĂM HỘP QUÀ (SLEEP-CYCLE & GIFT BOX BANKING)",
                  en: "DAY/NIGHT SLEEP-CYCLE & UNOPENED ROOFTOP GIFT BOX BANKING PROTOCOL",
                },
                subtitle: {
                  vi: "0 phút thợ nhàn rỗi + Bảo lưu 100% điểm Lực chiến công trình sang Thứ Hai Kỳ GAR/KvK (Arms Race Day 1)",
                  en: "Zero idle builder minutes + 100% Building Power banked for GAR/KvK Monday (Arms Race Day 1)",
                },
                tone: "gold",
              },
              branches: [
                {
                  title: {
                    vi: "Giai Đoạn 1: Ngày Thường Thứ Ba ➔ Chủ Nhật (Sleep-Cycle Scheduling)",
                    en: "Phase 1: Weekdays Tuesday ➔ Sunday (Sleep-Cycle Scheduling)",
                  },
                  badge: {
                    vi: "THỨ BA ➔ CHỦ NHẬT",
                    en: "TUE ➔ SUN",
                  },
                  tone: "emerald",
                  steps: [
                    {
                      id: "step-8-2-b1-1",
                      badge: {
                        vi: "BAN NGÀY (08:00–22:00)",
                        en: "DAYTIME (08:00–22:00)",
                      },
                      title: {
                        vi: "Thợ 3 chạy công trình ngắn 15 phút – 3 giờ ăn tối đa Guild Help",
                        en: "Builder 3 Runs Short 15m–3h Upgrades to Farm Free Guild Helps",
                      },
                      subtitle: {
                        vi: "Khi online liên tục, dùng Thợ 3 bấm các công trình 15 phút – 3 giờ và xin đầy thanh Trợ giúp Bang hội (+1 ➔ +5 lượt từ Dân làng Hội) để cắt giảm hàng giờ miễn phí.",
                        en: "While actively online, use Builder 3 for 15m–3h projects and fill your Guild Help bar (+1 ➔ +5 extra helps from Guild Villagers) to shave hours off for free.",
                      },
                      tone: "emerald",
                    },
                    {
                      id: "step-8-2-b1-2",
                      badge: {
                        vi: "BAN ĐÊM (23:00) & THỢ 1–2",
                        en: "NIGHT (23:00) & BUILDERS 1–2",
                      },
                      title: {
                        vi: "Bấm dự án 8h–12h+ chạy xuyên đêm & Canh Thợ 1–2 xong vào Chủ Nhật",
                        en: "Queue 8h–12h+ Overnight Projects & Time Builders 1–2 to Finish Sunday",
                      },
                      subtitle: {
                        vi: "Trước khi ngủ (23:00) bắt buộc đặt công trình 8–12+ giờ; đồng thời canh Thợ 1 & Thợ 2 bấm Lâu Đài / Doanh Trại lớn (24h–72h) sao cho chạy hết đếm ngược vào Chủ Nhật.",
                        en: "Before sleep (23:00), always queue 8–12h+ upgrades; simultaneously time Builder 1 & Builder 2's major 24h–72h Castle/Barracks upgrades to complete on Sunday.",
                      },
                      tone: "emerald",
                    },
                  ],
                  outcome: {
                    vi: "Đạt hiệu suất 100% thời gian lao động của cả 3–4 thợ xây, tiết kiệm 30–50 giờ mỗi tuần.",
                    en: "Achieves 100% builder utilization across all 3–4 queues, saving 30–50 labor hours per week.",
                  },
                },
                {
                  title: {
                    vi: "Giai Đoạn 2: Đêm Chủ Nhật (Kỹ Thuật Ngâm Hộp Quà — Unopened Gift Box Banking)",
                    en: "Phase 2: Sunday Night (Unopened Rooftop Gift Box Banking)",
                  },
                  badge: {
                    vi: "CHỦ NHẬT",
                    en: "SUNDAY",
                  },
                  tone: "gold",
                  steps: [
                    {
                      id: "step-8-2-b2-1",
                      badge: {
                        vi: "CÔNG TRÌNH HOÀN TẤT",
                        en: "TIMER COMPLETES",
                      },
                      title: {
                        vi: "Hiện biểu tượng 'Hộp Quà' (Gift Box) trên mái nhà — Thợ xây tự động rảnh",
                        en: "Rooftop 'Gift Box' Icon Appears — Builder Queue Automatically Frees Up",
                      },
                      subtitle: {
                        vi: "Khi công trình lớn chạy hết đếm ngược vào Chủ Nhật, hàng đợi Thợ xây lập tức được giải phóng để bạn bấm nâng công trình tiếp theo mà không cần mở hộp quà.",
                        en: "When a major upgrade finishes its countdown on Sunday, the Builder Queue is immediately freed to start a new building without needing to tap the completed roof icon.",
                      },
                      tone: "gold",
                    },
                    {
                      id: "step-8-2-b2-2",
                      badge: {
                        vi: "KỶ LUẬT BẢO LƯU ĐIỂM",
                        en: "STRICT BANKING LOCK",
                      },
                      title: {
                        vi: "TUYỆT ĐỐI KHÔNG CHẠM VÀO HỘP QUÀ TRÊN MÁI NHÀ!",
                        en: "NEVER TAP THE ROOFTOP GIFT BOX ON SUNDAY!",
                      },
                      subtitle: {
                        vi: "Điểm Lực chiến công trình được giữ nguyên 100% bên trong hộp quà trên nóc nhà qua đêm Chủ Nhật.",
                        en: "100% of the building power gain remains safely banked inside the unopened rooftop Gift Box overnight.",
                      },
                      tone: "gold",
                    },
                  ],
                  outcome: {
                    vi: "Tích trữ sẵn 2–3 Hộp Quà công trình lớn (Guild, Training Ground, Barracks) chờ nổ điểm sáng Thứ Hai.",
                    en: "Banks 2–3 major completed building Gift Boxes (Guild, Training Ground, Barracks) ready to detonate on Monday.",
                  },
                },
                {
                  title: {
                    vi: "Giai Đoạn 3: Thứ Hai Kỳ GAR/KvK (Arms Race Day 1 — Khung Giờ Vàng Double-Dip)",
                    en: "Phase 3: GAR/KvK Monday (Arms Race Day 1 — Golden Window Double-Dip)",
                  },
                  badge: {
                    vi: "THỨ HAI GAR/KVK",
                    en: "GAR/KVK MONDAY",
                  },
                  tone: "emerald",
                  steps: [
                    {
                      id: "step-8-2-b3-1",
                      badge: {
                        vi: "BƯỚC 1: KHUI HỘP QUÀ",
                        en: "STEP 1: POP GIFT BOXES",
                      },
                      title: {
                        vi: "Chạm tay mở toàn bộ Hộp Quà Công Trình đã găm khi mở vòng Territory / Construction",
                        en: "Tap All Banked Rooftop Gift Boxes Once Territory / Construction Opens",
                      },
                      subtitle: {
                        vi: "Đúng khung giờ vàng (13:00–17:00), khui toàn bộ Gift Box trên mái nhà để ăn nổ hàng chục ngàn điểm Lực chiến công trình tức thì mà không tốn 1 phút tăng tốc nào!",
                        en: "During the 13:00–17:00 Golden Window, pop all banked rooftop Gift Boxes for an instant tens-of-thousands Building Power surge with zero speed-ups spent!",
                      },
                      tone: "emerald",
                    },
                    {
                      id: "step-8-2-b3-2",
                      badge: {
                        vi: "BƯỚC 2: XẢ TĂNG TỐC",
                        en: "STEP 2: SPEED-UP BURST",
                      },
                      title: {
                        vi: "Kích hoạt Bard (+40%) + Dân làng (+2.00%) ➔ Bấm Lâu Đài ➔ Đợi đầy Guild Help ➔ Xả Tăng tốc",
                        en: "Activate Bard (+40%) + Villagers (+2.00%) ➔ Start Castle ➔ Fill Guild Help ➔ Burst Speed-ups",
                      },
                      subtitle: {
                        vi: "Bấm nâng cấp Lâu Đài / Doanh Trại kế tiếp, đợi đầy thanh Guild Help rồi mới xả bình Tăng tốc Xây dựng để mở trọn 6 rương thưởng (gồm Hộp Thứ 6 Extra Rewards).",
                        en: "Queue the next Castle/Barracks level, fill the Guild Help bar completely, and burst Construction Speed-ups to clear all 6 personal chests (including the 6th Extra Rewards box).",
                      },
                      tone: "emerald",
                    },
                  ],
                  outcome: {
                    vi: "Hoàn thành toàn bộ 6 rương thưởng Arms Race Day 1 chỉ với 50% lượng bình tăng tốc thông thường!",
                    en: "Clears all 6 Arms Race Day 1 reward chests using only 50% of the normal Construction Speed-up budget!",
                  },
                },
              ],
              footnote: {
                vi: "Nguồn: Quy trình chuẩn hóa từ 8.2-builder-queues-and-villagers.md & TopHeroes Tables - Max (Tab Villagers).",
                en: "Source: Standardized workflow from 8.2-builder-queues-and-villagers.md & TopHeroes Tables - Max (Tab Villagers).",
              },
            },
          ],
        },
        {
          id: "sub-4-3-week-a-vs-week-b-speedup-protocol",
          title: {
            vi: "4.3. Quy tắc Xả Tăng Tốc Xây Dựng Giữa Kỳ Thi Đấu Hội (Guild Race) vs Kỳ Đua Vũ Trang (GAR / KvK)",
            en: "4.3. Construction Speed-up Burst Protocol: Guild Race vs. GAR / KvK",
          },
          blocks: [
            {
              type: "list",
              ordered: false,
              items: [
                {
                  vi: "**Kỳ Thi Đấu Hội (Guild Race)**: Chỉ xả Tăng tốc Xây dựng ngay sau khi vừa nhận **Nhiệm Vụ Vàng** (`Legendary Task`) yêu cầu tăng tốc/lực chiến công trình; ưu tiên ghép vào Thứ Sáu–Chủ Nhật nếu trùng `Guild Rush`.",
                  en: "**Guild Race**: Only spend Construction Speed-ups right after accepting a **Legendary Task** requiring build speed-ups or power; stack them on Friday–Sunday when `Guild Rush` or `Ultimate Power` overlaps.",
                },
                {
                  vi: "**Kỳ GAR / KvK / Top Lord**: Đóng băng `100%` bình Tăng tốc Xây dựng từ Thứ Ba đến Chủ Nhật; chỉ xả vào **Thứ Hai** (`GAR Day 1`) đúng Khung giờ Vàng (`13:00–17:00`) để mở trọn 6 rương (`Extra Rewards`).",
                  en: "**GAR / KvK / Top Lord**: Freeze `100%` of Construction Speed-ups from Tuesday to Sunday; burst exclusively on **Monday** (`GAR Day 1`) inside the `13:00–17:00` Golden Window to clear all 6 chests.",
                },
              ],
            },
            {
              type: "media_spotlight",
              mediaCode: "MED-8.2-04",
              tier: "tier4_youtube_ref",
              title: {
                vi: "Video Tham Chiếu Quốc Tế: Hướng Dẫn Tối Ưu Hóa Dân Làng (Villagers Lv.1–6), Tướng Kinh Tế & Mẹo Găm Hộp Quà",
                en: "International Reference Video: Complete Villager Optimization (Lv.1–6), Passive Economic Heroes & Gift Box Banking",
              },
              description: {
                vi: "Hướng dẫn thực chiến từ cộng đồng quốc tế phân tích bảng 14 kỹ năng Dân làng & Famous Villagers (Research Cottage +3.20% & 432s, Medal Hall +17.50% HP & +5.60% ATK), dàn tướng kinh tế 12 Sao (Bard, Brawler, Shaman, Knight, Hostess, Stonemason, Treeguard, Headhunter) và kỹ thuật ngâm Hộp Quà Công Trình cho ngày Thứ Hai Arms Race.",
                en: "In-depth community guide breaking down the 14-row Villagers & Famous Villagers skill table (Research Cottage +3.20% & 432s, Medal Hall +17.50% HP & +5.60% ATK), 12-Star passive economic heroes (Bard, Brawler, Shaman, Knight, Hostess, Stonemason, Treeguard, Headhunter), and Sunday Gift Box Banking for Monday Arms Race.",
              },
              videoChannel: "RedBaron Gaming / Top Heroes Guide",
              videoTitle: "Top Heroes: Complete Villagers & Famous Villagers Guide, Builder Queues & Gift Box Banking Trick",
              videoTimestamp: "01:45 – 10:30",
              videoUrl: "https://www.youtube.com/results?search_query=Top+Heroes+Villagers+Guide+Builder+Queue+Tips",
            },
          ],
        },
      ],
    },
    {
      id: "sec-5-friday-pre-cooking-gift-box-case-study",
      isPro: true,
      title: {
        vi: "5. Kịch bản Thực chiến Nâng cao: Thiết Lập Hàng Đợi Đón Đầu (Pre-Cooking) & Ngâm Hộp Quà Cho Tài Khoản Lâu Đài Lv.27",
        en: "5. Advanced Tactical Case Study: Friday Pre-Cooking & Sunday Gift Box Banking for a Castle Lv.27 Account",
      },
      blocks: [
        {
          type: "case_study",
          badge: {
            vi: "CASE STUDY ĐIỀU PHỐI THỢ XÂY (LV.27 ➔ LV.28)",
            en: "BUILDER ORCHESTRATION CASE STUDY (LV.27 ➔ LV.28)",
          },
          title: {
            vi: "Thiết Lập Hàng Đợi Đón Đầu (Pre-Cooking) Chiều Thứ Sáu & Ngâm Hộp Quà Chủ Nhật Cho Tài Khoản Lâu Đài Lv.27",
            en: "Friday Prerequisite Pre-Cooking & Sunday Rooftop Gift Box Banking for a Castle Lv.27 Account",
          },
          profileSummary: {
            vi: "Tài khoản sở hữu **3 Hàng đợi Thợ xây** ở tối Thứ Sáu Kỳ Thi Đấu Hội (`Castle Lv.27`) chuẩn bị bùng nổ điểm tối đa cho **Thứ Hai Kỳ GAR/KvK** (`Arms Race Day 1`) chỉ với `50%` lượng bình tăng tốc thông thường.",
            en: "A **3-Builder-Queue** account on Friday evening of Guild Race (`Castle Lv.27`) preparing to maximize construction points on **GAR/KvK Monday** (`Arms Race Day 1`) using only `50%` of the normal speed-up budget.",
          },
          metrics: [
            {
              label: {
                vi: "Điểm Nổ Tức Thì Khi Mở Vòng Build Thứ Hai (0 Bình Tăng Tốc)",
                en: "Instant Points on Monday Build Window Open (0 Speed-ups Spent)",
              },
              before: {
                vi: "0 điểm (Bấm khui sớm Guild Lv.27 & Training Ground Lv.27 vào Chủ Nhật)",
                en: "0 points (Prematurely tapped Guild Lv.27 & Training Ground Lv.27 on Sunday)",
              },
              after: {
                vi: "Ăn trọn điểm Lực chiến của 2 Hộp Quà (Gift Box) công trình Lv.27 đã ngâm trên mái nhà",
                en: "Full Building Power surge from popping banked Lv.27 rooftop Gift Boxes on Monday",
              },
              delta: {
                vi: "Tiết kiệm ~74 giờ xây dựng tự nhiên quy đổi thành điểm GAR Day 1",
                en: "Converts ~74 hours of natural weekend build time into GAR Day 1 points",
              },
            },
            {
              label: {
                vi: "Lượng Bình Tăng Tốc Xây Dựng Tiêu Hao Để Mở Đủ 6 Rương GAR",
                en: "Construction Speed-ups Required to Unlock All 6 GAR Chests",
              },
              before: {
                vi: "100% định mức (Phải dùng tăng tốc chạy từ đầu cả điều kiện lẫn Lâu Đài Lv.28)",
                en: "100% budget (Forced to speed up both prerequisites and Castle Lv.28 from scratch)",
              },
              after: {
                vi: "Chỉ tốn ~50% lượng bình tăng tốc thông thường (kết hợp Bard +40% & Dân làng +2.00%)",
                en: "Only ~50% of normal speed-up budget used (paired with Bard +40% & Villagers +2.00%)",
              },
              delta: {
                vi: "Tiết kiệm 50% quỹ bình Tăng tốc Xây dựng cho mốc Lv.30 – Lv.35",
                en: "Saves 50% of Construction Speed-up reserves for the Lv.30 – Lv.35 push",
              },
            },
            {
              label: {
                vi: "Hiệu Suất Gán Dân Làng & Nội Tại Tướng Kinh Tế",
                en: "Villager Assignment & Passive Economic Hero Efficiency",
              },
              before: {
                vi: "Để Auto-Assign nhét Dân làng vào mỏ Gỗ/Đá, quên xin đầy Guild Help",
                en: "Auto-Assign left top Villagers in Timber/Stone mills; skipped Guild Help bar",
              },
              after: {
                vi: "Gán chuẩn Research Cottage (+3.20%, 432s), Guild (+5 Help), Castle (+2.00%, 160s), Medal Hall (+17.50% HP, +5.60% ATK)",
                en: "Slotted Research Cottage (+3.20%, 432s), Guild (+5 Help), Castle (+2.00%, 160s), Medal Hall (+17.50% HP, +5.60% ATK)",
              },
              delta: {
                vi: "Tối đa hóa 100% tốc độ xây dựng, nghiên cứu và chỉ số lính toàn cục",
                en: "100% optimization across build speed, tech speed, and global soldier stats",
              },
            },
          ],
          diagnostics: [
            {
              vi: "**Phân tích Quy luật Chẵn / Lẻ (`Lv.27 ➔ Lv.29`)**: `Castle Lv.28` (cấp chẵn) đòi bộ đôi `Guild Lv.27` + `Training Ground Lv.27`; ngay sau đó `Castle Lv.29` (cấp lẻ) đòi `Research Cottage Lv.28` + `Hospital Lv.28`.",
              en: "**Even/Odd Prerequisite Audit (`Lv.27 ➔ Lv.29`)**: `Castle Lv.28` (even) requires `Guild Lv.27` + `Training Ground Lv.27`; immediately after, `Castle Lv.29` (odd) requires `Research Cottage Lv.28` + `Hospital Lv.28`.",
            },
            {
              vi: "**Tách Biệt Hàng Đợi & Hộp Quà**: Khi `Guild Lv.27` (`~36h`) và `Training Ground Lv.27` (`~38h`) xong sáng Chủ Nhật, Thợ 1 & 2 lập tức rảnh nhưng điểm Lực chiến vẫn nằm nguyên trong `Gift Box` trên mái nhà.",
              en: "**Queue Release vs. Gift Box**: When `Guild Lv.27` (`~36h`) and `Training Ground Lv.27` (`~38h`) finish Sunday morning, Builders 1 & 2 free up immediately while Building Power stays banked inside the `Gift Box`.",
            },
          ],
          recoverySteps: [
            {
              stepNumber: "1",
              title: {
                vi: "Chiều Thứ Sáu Kỳ Thi Đấu Hội: Thiết lập Hàng đợi Đón đầu (Pre-Cooking Construction)",
                en: "Friday Afternoon (Guild Race): Initiate Prerequisite Pre-Cooking",
              },
              detail: {
                vi: "Kiểm tra điều kiện của `Castle Lv.28`: Dùng Thợ 1 nâng `Guild` (`Lv.26 ➔ 27`, `~36h`) và Thợ 2 nâng `Training Ground` (`Lv.26 ➔ 27`, `~38h`), xin đầy `Guild Help` để tự chạy xuyên Thứ Bảy.",
                en: "Check `Castle Lv.28` prerequisites: Assign Builder 1 to `Guild` (`Lv.26 ➔ 27`, `~36h`) and Builder 2 to `Training Ground` (`Lv.26 ➔ 27`, `~38h`), filling `Guild Help` so both run through Saturday.",
              },
              impactBadge: {
                vi: "CHẠY TỰ NHIÊN 36H–38H",
                en: "36H–38H NATURAL RUN",
              },
            },
            {
              stepNumber: "2",
              title: {
                vi: "Sáng Chủ Nhật: Thực thi Kỹ thuật 'Ngâm Hộp Quà' (Gift Box Banking)",
                en: "Sunday Morning: Execute Rooftop 'Gift Box Banking'",
              },
              detail: {
                vi: "Sáng Chủ Nhật, cả `Guild Lv.27` và `Training Ground Lv.27` hoàn tất đếm ngược và hiện biểu tượng **Hộp Quà** (`Gift Box`) trên mái nhà.\n• **Bảo lưu điểm**: Giữ nguyên không chạm vào Hộp Quà, hoặc chỉ khui đúng 1 nhà điều kiện để bấm tiếp Thợ 1 vào `Castle Lv.27 ➔ 28` (`60h`) chạy qua đêm Chủ Nhật.",
                en: "On Sunday morning, both `Guild Lv.27` and `Training Ground Lv.27` finish their countdowns and display rooftop **Gift Box** icons.\n• **Bank Power**: Leave the Gift Boxes untouched, or pop only the minimum prerequisite needed to start Builder 1 on `Castle Lv.27 ➔ 28` (`60h`) overnight.",
              },
              impactBadge: {
                vi: "BẢO LƯU HỘP QUÀ MÁI NHÀ",
                en: "ROOFTOP GIFT BOXES BANKED",
              },
            },
            {
              stepNumber: "3",
              title: {
                vi: "Thứ Hai Kỳ GAR/KvK (Khung Giờ Vàng): Khui Hộp Quà & Bùng Nổ 6 Rương Arms Race",
                en: "GAR/KvK Monday (Golden Window): Pop Gift Boxes & Clear All 6 Arms Race Chests",
              },
              detail: {
                vi: "Đúng giờ mở vòng Công trình Thứ Hai: Bấm khui toàn bộ `Gift Box` đã ngâm, dùng Tăng tốc Xây dựng kết thúc `Castle Lv.28` và bấm tiếp `Research Cottage Lv.28` + `Hospital Lv.28`.\n• **Kết quả**: Hoàn thành trọn **6 rương Arms Race** (gồm Hộp Thứ 6 `Extra Rewards`) chỉ với `50%` lượng bình tăng tốc thông thường!",
                en: "At Monday's Construction open: Tap all banked rooftop `Gift Boxes`, use Construction Speed-ups to finish `Castle Lv.28`, and queue `Research Cottage Lv.28` + `Hospital Lv.28`.\n• **Result**: Unlocks all **6 Arms Race chests** (including the 6th `Extra Rewards` chest) using just `50%` of normal speed-ups!",
              },
              impactBadge: {
                vi: "ĐẠT 6/6 RƯƠNG VỚI 50% TĂNG TỐC",
                en: "6/6 CHESTS AT 50% COST",
              },
            },
          ],
          conclusion: {
            vi: "Kết hợp chuyên môn hóa **3–4 Hàng đợi Thợ xây**, gán thủ công **Dân làng** (`Villagers Lv.1–6`) và kỹ thuật **Ngâm Hộp Quà** (`Gift Box Banking`) giúp F2P nhân đôi hiệu suất điểm công trình mà không tốn thêm Kim Cương.",
            en: "Combining specialized **3–4 Builder Queues**, manual **Villager** (`Lv.1–6`) assignment, and Sunday **Gift Box Banking** allows F2P commanders to double weekly construction event output without spending extra Diamonds.",
          },
        },
      ],
    },
  ],
};

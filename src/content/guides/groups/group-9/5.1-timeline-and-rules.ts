import type { GuideArticle } from "../../types";

export const ARTICLE_5_1_TIMELINE_AND_RULES: GuideArticle = {
  code: "5.1",
  displayCode: "5.1",
  slug: "timeline-and-rules",
  categorySlug: "event-playbooks",
  badge: "FREE",
  readingMinutes: 10,
  title: {
    vi: "Bảng 1 — Trục thời gian & Thể lệ chính (Timeline, Unlock & Leftover Recycle Rules)",
    en: "Table 1 — Event Timeline & Core Rules (Schedule, Unlock & Leftover Recycle Rules)",
  },
  summary: {
    vi: "Khung Ngày/Tuần mở Server (take_effect_time), thời lượng kéo dài, điều kiện mở, quy tắc cốt lõi (faq) và cơ chế xử lý đạo cụ thừa khi đóng sự kiện (recycle) cho toàn bộ 10 sự kiện từ Mùa S0 đến GAR.",
    en: "Server Day/Week opening windows (take_effect_time), event duration, unlock requirements, core mechanics (faq), and leftover currency recycling rules (recycle) across all 10 events from Season S0 through GAR.",
  },
  tldr: {
    coreRule: {
      vi: "Mọi sự kiện trong Top Heroes đều vận hành theo trục tuổi Server (`take_effect_time`) và phân thành 2 cơ chế xử lý đạo cụ thừa (`recycle`): Nhóm Bảo Lưu Vĩnh Viễn (Xúc Xắc, Vòng Quay, Vé Chiêu Mộ) và Nhóm Thu Hồi Thành Vàng Khi Đóng Sự Kiện (Lễ Hội Bắt Bướm, Sự kiện Mùa Lễ).",
      en: "Every Top Heroes event follows a server-age schedule (`take_effect_time`) and splits into two leftover item rules (`recycle`): Permanent Carryover Currencies (Dice, Wheel Tokens, Recruit Tokens) versus Expiring Event Tokens converted into Gold at closure (Butterfly Catching, Seasonal Drops).",
    },
    immediateAction: {
      vi: "Tra cứu ngay Bảng 1 bên dưới trước `00:00 UTC` (`07:00 Giờ VN`) ngày mở sự kiện để biết điều kiện mở Lâu Đài, thời lượng kéo dài và hạn chót `23:59 UTC` (`06:59 Giờ VN`) đổi đạo cụ có thời hạn.",
      en: "Check Table 1 below before `00:00 UTC` on event launch day to verify Castle unlock thresholds, event duration, and the `23:59 UTC` deadline for expiring exchange tokens.",
    },
    strictTaboo: {
      vi: "Tuyệt đối KHÔNG để đạo cụ thuộc diện `recycle` (Vợt Bắt Bướm, Xu Lễ Hội) tồn đọng qua `23:59 UTC` (`06:59 Giờ VN`) ngày cuối và KHÔNG xả lẻ Xúc Xắc / Xu Vòng Quay khi chưa đủ mốc chẵn.",
      en: "NEVER let expiring `recycle` tokens (Butterfly Nets, Holiday Coins) sit past `23:59 UTC` on the final day and NEVER spend odd Dice or Wheel Tokens without hitting an exact milestone.",
    },
  },
  keyTakeaways: [
    {
      vi: "**Khung Ngày/Tuần Mở Server (`take_effect_time`):** Top Lord mở Ngày 1–14 S0, Desert Prince mở Ngày 21, Storm Maiden mở Ngày 27 và Đua Vũ Trang Bang Hội (GAR) mở Ngày 28 S0.",
      en: "**Server Launch Schedule (`take_effect_time`):** Top Lord runs S0 Days 1–14, Desert Prince launches Day 21, Storm Maiden launches Day 27, and Guild Arms Race (GAR) begins S0 Day 28.",
    },
    {
      vi: "**Thời Lượng & Khung Giờ Reset:** Các sự kiện lớn kéo dài 6–7 ngày, làm mới nhiệm vụ hàng ngày vào đúng `00:00 UTC` (`07:00 Giờ VN`).",
      en: "**Duration & Daily Reset:** Major events run for 6–7 days and reset daily tasks strictly at `00:00 UTC`.",
    },
    {
      vi: "**Quy Tắc Cốt Lõi (`faq`):** Thanh đếm mốc lượt quay/tung tích lũy luôn reset về 0 cuối kỳ, dù đạo cụ quay được phép bảo lưu.",
      en: "**Core Event Rules (`faq`):** Cumulative spin/roll milestone bars always reset to zero at event end, even when tokens carry over.",
    },
    {
      vi: "**Cơ Chế Xử Lý Đạo Cụ Thừa (`recycle`):** Phân biệt rõ vật phẩm giữ nguyên trong túi đồ và vật phẩm tự động quy đổi thành Vàng khi đóng sự kiện.",
      en: "**Leftover Currency Handling (`recycle`):** Clearly distinguish permanent inventory currencies from seasonal tokens converted into Gold at event closure.",
    },
  ],
  keywords: [
    "take_effect_time",
    "faq",
    "recycle",
    "Trục thời gian",
    "Thể lệ chính",
    "Danh sách event",
  ],
  sourceFiles: ["event-playbooks-data.ts"],
  freeSections: [
    {
      id: "sec-1-timeline-rules-console",
      title: {
        vi: "1. Bảng 1 — Trục Thời Gian, Điều Kiện Mở & Thể Lệ Chính Theo Từng Sự Kiện",
        en: "1. Table 1 — Event Timeline, Unlock Conditions & Core Rules Explorer",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "Chọn sự kiện bất kỳ trên thanh bộ lọc phẳng dưới đây để tra cứu trực tiếp **Bảng 1 — Trục thời gian & Thể lệ chính** (`take_effect_time`, `faq`, `recycle`):",
            en: "Select any event on the flat selector bar below to inspect **Table 1 — Timeline & Core Rules** (`take_effect_time`, `faq`, `recycle`):",
          },
        },
        {
          type: "widget",
          widgetType: "event_playbook_explorer",
        },
        {
          type: "media_spotlight",
          mediaCode: "MED-5.1-01",
          tier: "tier2_annotated_ui",
          title: {
            vi: "Trục Thời Gian Sự Kiện S0 ➔ GAR & Quy Tắc Bảo Lưu Đạo Cụ",
            en: "S0 ➔ GAR Event Timeline & Leftover Currency Carryover Rules",
          },
          description: {
            vi: "Bản đồ lịch mở khóa sự kiện từ Ngày 1 S0 đến Ngày 28+ GAR và quy tắc phân loại đạo cụ bảo lưu so với đạo cụ thu hồi cuối kỳ.",
            en: "Event unlock timeline from S0 Day 1 through Day 28+ GAR alongside permanent carryover versus expiring token rules.",
          },
          annotations: [
            {
              kind: "do",
              label: {
                vi: "Kiểm Tra Khung Ngày Mở Server (take_effect_time) Trước 7 Ngày",
                en: "Verify Server Launch Window (take_effect_time) 7 Days Ahead",
              },
              detail: {
                vi: "Giúp chủ động khóa kho Tăng Tốc, Mảnh Vạn Năng và Kim Cương trước khi bước vào tuần GAR hoặc Banner Thần Thoại.",
                en: "Allows locking Speedups, Universal Shards, and Diamonds before entering GAR week or Mythic Hero banners.",
              },
            },
            {
              kind: "info",
              label: {
                vi: "Phân Biệt Thanh Mốc Reset vs. Đạo Cụ Bảo Lưu (faq & recycle)",
                en: "Separate Resetting Milestone Bars from Carried-Over Tokens (faq & recycle)",
              },
              detail: {
                vi: "Xúc Xắc và Xu Vòng Quay giữ nguyên sang kỳ sau, nhưng thanh đếm mốc 30/60/100 lượt luôn xóa về 0 khi hết giờ.",
                en: "Dice and Wheel Tokens carry over to future runs, whereas the 30/60/100 cumulative counter resets to zero at closure.",
              },
            },
            {
              kind: "dont",
              label: {
                vi: "Không Để Đạo Cụ Thu Hồi (Recycle) Quá 23:59 UTC (06:59 Giờ VN) Ngày Cuối",
                en: "Never Leave Expiring (Recycle) Tokens Past 23:59 UTC on the Final Day",
              },
              detail: {
                vi: "Vợt Bắt Bướm và xu sự kiện mùa lễ sẽ bị hệ thống tự động đổi thành Vàng vụn ngay khi đóng cửa hàng.",
                en: "Butterfly Nets and seasonal tokens automatically convert into trivial Gold as soon as the event shop closes.",
              },
            },
          ],
        },
      ],
      subSections: [
        {
          id: "sub-1-1-timeline-diagram",
          title: {
            vi: "1.1. Sơ Đồ Trục Thời Gian Mở Khóa 10 Sự Kiện Từ Ngày 1 S0 Đến Tuần Lễ GAR",
            en: "1.1. Master Unlock Timeline Across All 10 Events (S0 Day 1 ➔ GAR Week)",
          },
          badge: {
            vi: "Trục Ngày 1➔33",
            en: "Day 1➔33 Axis",
          },
          blocks: [
            {
              type: "visual_diagram",
              variant: "timeline_phases",
              title: {
                vi: "Trục Tiến Độ Mở Sự Kiện Theo Tuổi Server (take_effect_time)",
                en: "Server-Age Event Unlock Progression (take_effect_time)",
              },
              subtitle: {
                vi: "Thứ tự xuất hiện các sự kiện đua điểm, banner tướng Đỏ và sự kiện vệ tinh từ tuần đầu mở máy chủ",
                en: "Sequential unlock order of point races, Mythic banners, and satellite events from server launch",
              },
              branches: [
                {
                  title: {
                    vi: "GIAI ĐOẠN 1: TUẦN 1–2 S0 (TOP LORD • VÒNG QUAY • BẮT BƯỚM)",
                    en: "PHASE 1: S0 WEEKS 1–2 (TOP LORD • LUCKY WHEEL • BUTTERFLY)",
                  },
                  badge: {
                    vi: "Ngày 1 ➔ 14",
                    en: "Days 1 ➔ 14",
                  },
                  tone: "gold",
                  steps: [
                    {
                      id: "tl-1",
                      title: {
                        vi: "Ngày 1–14 S0: Lãnh Chúa Mạnh Nhất (Top Lord) & Vòng Quay Liên Minh",
                        en: "S0 Days 1–14: Top Lord & League Lucky Wheel",
                      },
                      subtitle: {
                        vi: "Làm quen nhịp 6 ngày đua điểm cá nhân; tích lũy Kim Cương chờ tướng Thần Thoại",
                        en: "Learn the 6-day solo race cadence while banking Diamonds for Mythic heroes",
                      },
                      tone: "gold",
                    },
                  ],
                  outcome: {
                    vi: "Mở khóa nền tảng Lâu Đài Lv.15+ và giữ nguyên kho Mảnh Vạn Năng.",
                    en: "Reaches Castle Lv.15+ baseline while keeping Universal Shards untouched.",
                  },
                },
                {
                  title: {
                    vi: "GIAI ĐOẠN 2: TUẦN 3–4 S0 (THI ĐẤU HỘI • DESERT PRINCE • STORM MAIDEN)",
                    en: "PHASE 2: S0 WEEKS 3–4 (GUILD RACE • DESERT PRINCE • STORM MAIDEN)",
                  },
                  badge: {
                    vi: "Ngày 15 ➔ 27",
                    en: "Days 15 ➔ 27",
                  },
                  tone: "emerald",
                  steps: [
                    {
                      id: "tl-2",
                      title: {
                        vi: "Ngày 21 & Ngày 27 S0: Xúc Xắc Desert Prince & Storm Maiden",
                        en: "S0 Days 21 & 27: Desert Prince & Storm Maiden Treasure Dice",
                      },
                      subtitle: {
                        vi: "Mở khóa bộ đôi Thần Thoại Bộ Lạc bằng Kim Cương và gói $0.99 hàng ngày",
                        en: "Unlock the core Horde Mythic duo via Diamonds and daily $0.99 packs",
                      },
                      tone: "emerald",
                    },
                  ],
                  outcome: {
                    vi: "Sẵn sàng xác tướng Storm Maiden và 6,000 Vinh Dự Bang trước giờ mở GAR.",
                    en: "Secures base Storm Maiden and 6,000 Guild Honor ahead of GAR launch.",
                  },
                },
                {
                  title: {
                    vi: "GIAI ĐOẠN 3: NGÀY 28+ S0 ➔ S4 (CHU KỲ 2 TUẦN: GAR/KVK ⇄ THI ĐẤU HỘI)",
                    en: "PHASE 3: S0 DAY 28+ ➔ S4 (BI-WEEKLY CYCLE: GAR/KVK ⇄ GUILD RACE)",
                  },
                  badge: {
                    vi: "Ngày 28+ ➔ S4",
                    en: "Day 28+ ➔ S4",
                  },
                  tone: "gold",
                  steps: [
                    {
                      id: "tl-3",
                      title: {
                        vi: "Ngày 28–33 S0: Kỳ Đua Vũ Trang Bang Hội (GAR) Đầu Tiên",
                        en: "S0 Days 28–33: First 6-Day Guild Arms Race (GAR)",
                      },
                      subtitle: {
                        vi: "Xả toàn bộ kho tích trữ theo 6 ngày chủ đề lúc 00:00 UTC (07:00 Giờ VN)",
                        en: "Unleash hoarded stockpiles across the 6 themed days starting 00:00 UTC",
                      },
                      tone: "gold",
                    },
                  ],
                  outcome: {
                    vi: "Thiết lập vòng lặp chuẩn 14 ngày xuyên suốt từ S0 sang S1–S4.",
                    en: "Establishes the permanent 14-day rotation carrying through S1–S4.",
                  },
                },
              ],
            },
          ],
        },
        {
          id: "sub-1-2-timeline-master-table",
          title: {
            vi: "1.2. Bảng Tổng Hợp Khung Thời Gian Mở & Quy Tắc Xử Lý Đạo Cụ Thừa (10 Sự Kiện)",
            en: "1.2. Master Schedule & Leftover Currency Recycling Table (All 10 Events)",
          },
          badge: {
            vi: "Bảng 1 Tổng Hợp",
            en: "Master Table 1",
          },
          blocks: [
            {
              type: "table",
              caption: {
                vi: "Đối chiếu khung thời gian mở (take_effect_time), thời lượng và cơ chế xử lý đạo cụ thừa (recycle)",
                en: "Comparison of launch windows (take_effect_time), durations, and leftover currency rules (recycle)",
              },
              headers: [
                { vi: "Sự Kiện", en: "Event Name" },
                { vi: "Khung Mở & Thời Lượng (take_effect_time)", en: "Launch Window & Duration (take_effect_time)" },
                { vi: "Quy Tắc Cốt Lõi & Xử Lý Đạo Cụ Thừa (faq / recycle)", en: "Core Rules & Leftover Handling (faq / recycle)" },
              ],
              rows: [
                [
                  { vi: "Lãnh Chúa Mạnh Nhất (Top Lord)", en: "Strongest Lord (Top Lord)" },
                  { vi: "Ngày 1–14 S0 • Kéo dài 6 ngày/kỳ (Reset 00:00 UTC / 07:00 Giờ VN)", en: "S0 Days 1–14 • 6 days per cycle (00:00 UTC reset)" },
                  { vi: "Đua điểm cá nhân 6 giai đoạn; điểm mốc ngày không cộng dồn sang ngày hôm sau.", en: "6-stage solo point race; daily milestone points do not roll over to the next day." },
                ],
                [
                  { vi: "Thi Đấu Hội (Guild Race)", en: "Guild Race" },
                  { vi: "Từ Tuần 3 S0 • Chu kỳ 2 tuần/lần (7 ngày)", en: "From S0 Week 3 • Bi-weekly (7 days)" },
                  { vi: "Bảng nhiệm vụ 9 ô chung + 2 ô cá nhân; Điểm Vinh Dự Bang bảo lưu vĩnh viễn.", en: "9 shared + 2 personal task slots; Guild Honor stays in your permanent wallet." },
                ],
                [
                  { vi: "Đua Vũ Trang Bang Hội (GAR)", en: "Guild Arms Race (GAR)" },
                  { vi: "Từ Ngày 28 S0 • Chu kỳ 2 tuần/lần (6 ngày Thứ Hai ➔ Thứ Bảy)", en: "From S0 Day 28 • Bi-weekly (6 days Mon ➔ Sat)" },
                  { vi: "Đối kháng Bang 6 ngày chủ đề; nâng công nghệ Double Rewards để nhân đôi 9 rương/ngày.", en: "6-day guild point war; research Double Rewards tech to double all 9 daily chests." },
                ],
                [
                  { vi: "Xúc Xắc Kho Báu & Vòng Quay May Mắn", en: "Treasure Dice & Lucky Wheel" },
                  { vi: "Xoay tua hàng tuần (Ngày 21 Desert Prince, Ngày 27 Storm Maiden)", en: "Weekly rotation (Day 21 Desert Prince, Day 27 Storm Maiden)" },
                  { vi: "BẢO LƯU Xúc Xắc, Xu Đổi & Xu Vòng Quay; RESET thanh đếm mốc 30/60/100 lượt cuối kỳ.", en: "CARRIES OVER Dice, Shop Coins & Wheel Tokens; RESETS 30/60/100 milestone bar at end." },
                ],
                [
                  { vi: "Lễ Hội Bắt Bướm (Butterfly Catching)", en: "Butterfly Catching Festival" },
                  { vi: "Định kỳ 3–4 tuần/lần • Kéo dài 5–7 ngày", en: "Every 3–4 weeks • 5–7 days duration" },
                  { vi: "THU HỒI (Recycle): Vợt và Xu sự kiện quá hạn 23:59 UTC (06:59 Giờ VN) ngày cuối bị đổi thành Vàng.", en: "EXPIRES (Recycle): Nets and Seasonal Coins left past 23:59 UTC on the final day convert to Gold." },
                ],
              ],
            },
          ],
        },
        {
          id: "sub-1-3-timeline-checklist",
          title: {
            vi: "1.3. Checklist Kiểm Tra Thể Lệ & Thời Hạn Trước Khi Bắt Đầu Sự Kiện",
            en: "1.3. Pre-Event Timeline & Rule Verification Checklist",
          },
          blocks: [
            {
              type: "checklist",
              checklistId: "event-5-1-timeline-rules-v1",
              title: {
                vi: "5 Bước Kiểm Soát Trục Thời Gian & Hạn Đạo Cụ Sự Kiện",
                en: "5-Step Timeline & Currency Expiry Control Checklist",
              },
              items: [
                {
                  id: "chk-51-1",
                  label: {
                    vi: "Đã kiểm tra tuổi Server hiện tại để biết chính xác ngày mở Desert Prince (Ngày 21), Storm Maiden (Ngày 27) và GAR (Ngày 28).",
                    en: "Verified current server age for exact Desert Prince (Day 21), Storm Maiden (Day 27), and GAR (Day 28) launch dates.",
                  },
                  detail: {
                    vi: "Giúp chủ động khóa kho tài nguyên trước 7 ngày.",
                    en: "Enables locking resource stockpiles 7 days in advance.",
                  },
                },
                {
                  id: "chk-51-2",
                  label: {
                    vi: "Đã xác nhận điều kiện cấp Lâu Đài tối thiểu (Lv.8–Lv.15) và gia nhập Bang hội Top đầu trước 00:00 UTC (07:00 Giờ VN) ngày mở sự kiện.",
                    en: "Confirmed minimum Castle level (Lv.8–Lv.15) and active Top Guild membership before 00:00 UTC on event launch day.",
                  },
                  detail: {
                    vi: "Đảm bảo nhận đủ phần thưởng mốc Bang hội và lượt Giúp đỡ.",
                    en: "Ensures eligibility for Guild milestone chests and Help speedups.",
                  },
                },
                {
                  id: "chk-51-3",
                  label: {
                    vi: "Đã phân loại rõ đạo cụ sự kiện đang chạy thuộc Nhóm Bảo Lưu (Xúc Xắc/Vòng Quay) hay Nhóm Thu Hồi Cuối Kỳ (Bắt Bướm).",
                    en: "Classified whether active event tokens belong to Permanent Carryover (Dice/Wheel) or Final-Day Expiry (Butterfly).",
                  },
                  detail: {
                    vi: "Tránh mất trắng xu mùa lễ hoặc tiêu nhầm Xu Xúc Xắc vĩnh viễn.",
                    en: "Prevents losing seasonal tokens or wasting permanent Dice Coins.",
                  },
                },
                {
                  id: "chk-51-4",
                  label: {
                    vi: "Đã tính tổng số lượt quay/tung để dừng đúng mốc bảo hiểm chẵn (30 / 60 / 100 lượt) trước khi thanh tiến độ reset.",
                    en: "Calculated total spins/rolls to stop strictly at an exact pity milestone (30 / 60 / 100) before bar reset.",
                  },
                  detail: {
                    vi: "Không bao giờ để lẻ lượt tung ở giữa hai mốc thưởng.",
                    en: "Never strand odd rolls mid-way between milestone chests.",
                  },
                },
                {
                  id: "chk-51-5",
                  label: {
                    vi: "Đã đặt lịch đổi sạch 100% xu sự kiện có thời hạn trước 23:59 UTC (06:59 Giờ VN) ngày cuối cùng.",
                    en: "Scheduled full redemption of expiring seasonal tokens before 23:59 UTC on the final day.",
                  },
                  detail: {
                    vi: "Chuyển hóa tối đa thành Trang Trí Thần Thoại và Mảnh Vạn Năng.",
                    en: "Converts 100% of expiring currency into Mythic Decor and Universal Shards.",
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  proSections: [
    {
      id: "sec-2-pro-recycle-matrix",
      isPro: true,
      title: {
        vi: "2. [PRO] Bảng Kiểm Toán Cơ Chế Thu Hồi (Recycle) & Bảo Lưu Xuyên Mùa S0 ➔ S4",
        en: "2. [PRO] Cross-Season Currency Recycle & Carryover Audit Matrix (S0 ➔ S4)",
      },
      blocks: [
        {
          type: "table",
          caption: {
            vi: "Quy tắc xử lý đạo cụ khi đóng sự kiện (recycle) đối với từng nhóm sự kiện",
            en: "Exact closure handling rules (recycle) across all event categories",
          },
          headers: [
            { vi: "Nhóm Đạo Cụ", en: "Currency Category" },
            { vi: "Cơ Chế Khi Đóng Sự Kiện (recycle)", en: "Closure Mechanism (recycle)" },
            { vi: "Hành Động Chuẩn Cao Thủ", en: "Pro Player Protocol" },
          ],
          rows: [
            [
              { vi: "Xu Xúc Xắc, Xúc Xắc Thường & Xu Vòng Quay", en: "Dice Coins, Normal Dice & Wheel Tokens" },
              { vi: "Bảo lưu 100% trong túi đồ sang kỳ Banner tiếp theo.", en: "100% preserved in inventory for future banners." },
              { vi: "Giữ nguyên số dư lẻ; gom đủ 300–600 Xu đổi Tướng Đỏ / Vũ Khí Độc Quyền.", en: "Hold odd balances; stack 300–600 Coins for Mythic Heroes or Exclusive Weapons." },
            ],
            [
              { vi: "Vợt Bắt Bướm & Xu Đổi Lễ Hội Theo Mùa", en: "Butterfly Nets & Seasonal Holiday Tokens" },
              { vi: "Thu hồi tự động thành Vàng (Gold) lúc 00:00 UTC (07:00 Giờ VN) khi đóng shop.", en: "Automatically recycled into Gold at 00:00 UTC upon shop closure." },
              { vi: "Bắt buộc tiêu sạch 100% trước 23:59 UTC (06:59 Giờ VN) ngày cuối cùng.", en: "Spend 100% before 23:59 UTC on the final day without exception." },
            ],
          ],
        },
        {
          type: "case_study",
          badge: {
            vi: "Kiểm Toán Hạn Đạo Cụ",
            en: "Expiry Audit Triage",
          },
          title: {
            vi: "Ca Bệnh Điển Hình: Nhầm Lẫn Giữa Xu Bắt Bướm (Thu Hồi) Và Xu Xúc Xắc (Bảo Lưu)",
            en: "Case Study: Confusing Expiring Butterfly Tokens with Permanent Dice Coins",
          },
          profileSummary: {
            vi: "Người chơi ở tuần thứ 4 S0 vừa kết thúc Lễ Hội Bắt Bướm và Xúc Xắc Storm Maiden nhưng áp dụng ngược quy tắc bảo lưu cho cả hai sự kiện.",
            en: "An S0 Week 4 player finishes both Butterfly Catching and Storm Maiden Dice but applies the carryover rule backwards across the two events.",
          },
          diagnostics: [
            {
              vi: "Để quên 120 Xu Bắt Bướm qua 00:00 UTC (07:00 Giờ VN) ngày đóng shop khiến hệ thống thu hồi thành Vàng vụn.",
              en: "Left 120 Butterfly Tokens unspent past 00:00 UTC shop closure, losing them to automatic Gold conversion.",
            },
            {
              vi: "Hoảng sợ tiêu sạch 55 Xu Xúc Xắc Storm Maiden vào Mảnh Tướng Tím vì tưởng xu sẽ mất khi hết giờ.",
              en: "Panic-spent 55 leftover Storm Maiden Dice Coins on Purple Shards out of fear they would expire.",
            },
          ],
          recoverySteps: [
            {
              stepNumber: "01",
              title: {
                vi: "Tra Cứu Dòng 'Cơ Chế Đạo Cụ Thừa (Recycle)' Tại Bảng 1 Ngay Ngày Đầu",
                en: "Check the 'Leftover Currency Rule (Recycle)' Row in Table 1 on Day 1",
              },
              detail: {
                vi: "Xác định rõ sự kiện nào thu hồi đạo cụ cuối kỳ và sự kiện nào cho phép tích lũy xuyên mùa.",
                en: "Verify immediately whether an event recycles leftover tokens or preserves them across cycles.",
              },
            },
            {
              stepNumber: "02",
              title: {
                vi: "Đổi Sạch Xu Mùa Lễ Trước 23:59 UTC (06:59 Giờ VN) Ngày Cuối",
                en: "Redeem 100% of Seasonal Tokens Before 23:59 UTC on the Final Day",
              },
              detail: {
                vi: "Ưu tiên đổi Rương Trang Trí Thần Thoại và Mảnh Anh Hùng Vạn Năng, phần dư lẻ cuối cùng đổi lấy Gỗ/Thịt.",
                en: "Prioritize Mythic Decoration Chests and Universal Shards, burning any odd remainder on resource chests.",
              },
            },
            {
              stepNumber: "03",
              title: {
                vi: "Khóa Chặt Xu Xúc Xắc & Xu Vòng Quay Lẻ Trong Túi Đồ",
                en: "Lock Leftover Dice Coins & Wheel Tokens in Your Inventory",
              },
              detail: {
                vi: "Giữ nguyên toàn bộ Xu Xúc Xắc và Xu Vòng Quay còn dư để cộng dồn cho kỳ Wukong / Beastmaster kế tiếp.",
                en: "Leave all leftover Dice Coins and Wheel Tokens untouched to compound toward upcoming Wukong / Beastmaster banners.",
              },
            },
          ],
          conclusion: {
            vi: "Bảo toàn 100% giá trị quy đổi tương đương 4,000–6,000 Kim Cương mỗi chu kỳ sự kiện!",
            en: "Preserves 100% of your token equity worth 4,000–6,000 Diamonds every event cycle!",
          },
        },
      ],
    },
  ],
};

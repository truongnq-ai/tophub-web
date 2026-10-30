import type { GuideArticle } from "../../types";

export const ARTICLE_5_6_PRO_PLAYER_MECHANICS: GuideArticle = {
  code: "5.6",
  displayCode: "5.6",
  slug: "pro-player-mechanics",
  categorySlug: "event-playbooks",
  badge: "PRO",
  readingMinutes: 14,
  title: {
    vi: "Chuyên mục 6 — Mẹo & Kỹ thuật Cao Thủ Chuyên Nghiệp (Pro-Player Mechanics & Pre-cooking Tricks)",
    en: "Section 6 — Pro-Player Mechanics & Pre-Cooking Tricks (Veteran Execution Playbook)",
  },
  summary: {
    vi: "Hướng dẫn thực chiến 4 kỹ thuật thao tác cao thủ tối ưu từng điểm số: (1) Kỹ thuật Ủ nhà / Giữ hộp quà công trình (Pre-building), (2) Kỹ thuật Ủ lính & Nâng bậc lính T-1 ➔ T (Troop Pre-cooking & Tier Promotion), (3) Kỹ thuật Ủ Nghiên cứu / Cắm mỏ Ruby / Treo Thưởng chờ nhận (Pre-gathering & Quest Banking), và (4) Kỹ thuật Double-Dip / Triple-Dip gộp trùng 3–4 sự kiện.",
    en: "Veteran masterclass covering the 4 core execution mechanics to maximize every event point: (1) Pre-building & Unopened Gift Box Banking, (2) Troop Pre-cooking & Tier T-1 ➔ T Staircase Promotion, (3) Pre-gathering Overnight Ruby Mines, Bounty Quest Banking & Auto-Join Rally, and (4) 4-Hour Window Double-Dip / Triple-Dip Alignment.",
  },
  tldr: {
    coreRule: {
      vi: "Trong Top Heroes, hệ thống chỉ ghi nhận điểm số tại **thời điểm bạn bấm thu hoạch hoàn tất** (bấm vào Hộp quà công trình, bấm biểu tượng Lính trên Trại lính, bấm Nhận thưởng Treo Thưởng, hoặc đạo quân thu thập bước chân về thành) chứ KHÔNG tính lúc bắt đầu hay lúc thanh thời gian chạy xong!",
      en: "In Top Heroes, the server awards event points strictly at the **moment of manual claim** (tapping the floating Building Gift Box, tapping the Barracks Troop icon, claiming a completed Bounty Quest, or when a gathering march returns to the Castle) — NEVER when the timer starts or finishes!",
    },
    immediateAction: {
      vi: "Thực hiện đầy đủ 4 quy trình **Pre-cook (Ủ trước)** trước `00:00 UTC` (`07:00 Giờ VN`) ngày mở sự kiện và chỉ bấm thu hoạch / xả Tăng Tốc vào đúng khung giờ vàng `02:00 UTC` (`09:00 Giờ VN`), `06:00 UTC` (`13:00 Giờ VN`) hoặc `14:00 UTC` (`21:00 Giờ VN`) để **Double-Dip / Triple-Dip** 3–4 sự kiện cùng lúc!",
      en: "Execute all 4 **Pre-cooking protocols** ahead of `00:00 UTC` event reset and claim / dump Speedups strictly inside the `02:00 UTC`, `06:00 UTC`, or `14:00 UTC` golden windows to **Double-Dip / Triple-Dip** across 3–4 concurrent events!",
    },
    strictTaboo: {
      vi: "Tuyệt đối KHÔNG bấm nhầm vào Hộp quà trên nóc công trình hay biểu tượng Lính trên Trại lính trước giờ mở sự kiện, và KHÔNG luyện lính mới từ Bậc 1 vào ngày đua điểm thay vì bấm **Nâng bậc lính (`T-1 ➔ T`)**.",
      en: "NEVER accidentally tap floating Building Gift Boxes or Barracks Troop icons before the event opens, and NEVER train fresh troops from scratch on scoring days instead of **Promoting (`T-1 ➔ T`)** pre-cooked units.",
    },
  },
  keyTakeaways: [
    {
      vi: "**1. Kỹ Thuật Ủ Nhà / Giữ Hộp Quà Công Trình (`Pre-building / Gift Box Banking`):** Bấm xây công trình lớn từ nhiều ngày trước; khi xây xong tuyệt đối không ấn vào hộp quà hoàn thành trên nóc nhà, đợi đúng lúc Event mở (hoặc khung giờ Xây Dựng) mới bấm mở hộp để ăn điểm Lực chiến ngay lập tức.",
      en: "**1. Pre-Building & Unopened Gift Box Banking:** Start major building upgrades days in advance; once the timer finishes, do NOT tap the floating completion gift box on the roof until the Construction Event window opens to claim instant Power points.",
    },
    {
      vi: "**2. Kỹ Thuật Ủ Lính & Nâng Bậc Lính (`Troop Pre-cooking & Tier T-1 ➔ T Promotion`):** Huấn luyện xong nhưng không ấn thu hoạch trên Trại Lính chờ Event mới nhận; kết hợp trữ sẵn lính cấp thấp (`T-1`) để vào ngày Đua Vũ Trang / KvK bấm 'Nâng cấp bậc lính' lấy điểm/phút tăng tốc tối đa.",
      en: "**2. Troop Pre-Cooking & Tier `T-1 ➔ T` Promotion:** Let trained troop batches sit unclaimed on the Barracks until Event reset; combine with a large stockpile of `T-1` troops and use 'Promote' on GAR / KvK Troop Day for maximum points per speedup minute.",
    },
    {
      vi: "**3. Kỹ Thuật Ủ Nghiên Cứu / Cắm Mỏ Ruby / Treo Thưởng Chờ Nhận (`Pre-gathering & Quest Banking`):** Cử toàn bộ đạo quân đào mỏ Ruby cấp cao từ đêm trước để sáng hôm sau thu quân về ăn ngay vài nghìn Ruby; làm xong nhiệm vụ Treo Thưởng nhưng giữ lại chưa bấm nhận cho đến khi mở Event rơi đạo cụ; giữ bình Thể lực chạy Auto-Join Rally.",
      en: "**3. Pre-Gathering Ruby Mines, Bounty Quest Banking & Auto-Join Rally:** Send all marches to high-level Ruby mines the night before so they return after `00:00 UTC` reset; complete Bounty Quests without claiming until drop events start; save Stamina Potions for 50x Auto-Join Rally.",
    },
    {
      vi: "**4. Kỹ Thuật `Double-Dip / Triple-Dip` (Gộp Trùng 3–4 Sự Kiện):** Căn chính xác khung giờ 4 tiếng của Quân Bị Dũng Sĩ trùng với Quân Bị Hội / KvK, Thẻ Thông Hành và Niềm Vui Nhân Đôi để 1 lần xả tài nguyên ăn 3–4 đầu phần thưởng.",
      en: "**4. `Double-Dip / Triple-Dip` (3–4 Event Alignment):** Align the 4-hour Hourly Arms Race window with Guild Arms Race (GAR) / KvK, Battle Pass tasks, and Double Joy so a single resource dump claims 3–4 separate reward tracks.",
    },
  ],
  keywords: [
    "Pre-building",
    "Gift Box Banking",
    "Troop Pre-cooking",
    "Tier Promotion",
    "Pre-gathering",
    "Quest Banking",
    "Double-Dip",
    "Triple-Dip",
  ],
  sourceFiles: ["event-playbooks-data.ts"],
  freeSections: [
    {
      id: "sec-1-pro-mechanics-console",
      title: {
        vi: "1. Chuyên Mục 6 — Bàn Tra Cứu 4 Kỹ Thuật Cao Thủ Chuyên Nghiệp Theo Từng Sự Kiện",
        en: "1. Section 6 — Pro-Player Mechanics & Pre-Cooking Tricks Explorer",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "Chọn sự kiện bất kỳ dưới đây để xem **Chuyên mục 6 — Mẹo & Kỹ thuật Cao Thủ Chuyên Nghiệp** (Ủ nhà, Ủ lính & Nâng bậc `T-1 ➔ T`, Cắm mỏ Ruby & Treo Thưởng chờ nhận, và Gộp trùng `Double-Dip / Triple-Dip`):",
            en: "Select any event below to inspect **Section 6 — Pro-Player Mechanics & Pre-Cooking Tricks** (Pre-building, Troop Pre-cooking & `T-1 ➔ T` Promotion, Overnight Ruby Pre-gathering & Quest Banking, and `Double-Dip / Triple-Dip` alignment):",
          },
        },
        {
          type: "widget",
          widgetType: "event_playbook_explorer",
        },
        {
          type: "media_spotlight",
          mediaCode: "MED-5.6-01",
          tier: "tier2_annotated_ui",
          title: {
            vi: "4 Kỹ Thuật Thực Chiến Cốt Lõi Của Người Chơi Kỳ Cựu (Pre-Cook & Triple-Dip)",
            en: "The 4 Core Veteran Execution Mechanics (Pre-Cooking & Triple-Dip Alignment)",
          },
          description: {
            vi: "Quy trình giữ hộp quà công trình, đôn bậc lính T-1 ➔ T, găm mỏ Ruby/Treo thưởng qua đêm và căn khung giờ Ca 4 Tiếng.",
            en: "Protocols for banking building gift boxes, promoting T-1 ➔ T troops, overnight Ruby/Bounty banking, and 4-hour window syncing.",
          },
          annotations: [
            {
              kind: "do",
              label: {
                vi: "Giữ Hộp Quà Hoàn Thành Trên Nóc Công Trình & Biểu Tượng Lính Trên Trại",
                en: "Hold Floating Building Gift Boxes & Completed Barracks Troop Icons",
              },
              detail: {
                vi: "Điểm Lực chiến công trình và điểm Huấn luyện lính chỉ nổ khi bạn chạm tay vào hộp quà/biểu tượng thu hoạch.",
                en: "Building Power and Troop Training points only register at the exact second you tap the floating gift box or barracks icon.",
              },
            },
            {
              kind: "info",
              label: {
                vi: "Đôn Bậc Lính (T-1 ➔ T) Cho Điểm Trên Mỗi Phút Tăng Tốc Cao Nhất",
                en: "Troop Tier Promotion (T-1 ➔ T) Yields Maximum Points Per Speedup Minute",
              },
              detail: {
                vi: "Luyện sẵn hàng vạn lính bậc T-1 vào tuần thường, sau đó bấm Nâng Bậc (Promote) vào Thứ Sáu Ngày 5 GAR.",
                en: "Train thousands of T-1 units during off-weeks, then tap Promote on Friday (GAR Day 5) for explosive point efficiency.",
              },
            },
            {
              kind: "dont",
              label: {
                vi: "Cấm Xả Tài Nguyên Lệch Khung Giờ Ca 4 Tiếng (Hourly Arms Race)",
                en: "Never Dump Resources Outside Matching 4-Hour Sprint Windows",
              },
              detail: {
                vi: "Luôn đợi khung 02:00 UTC (09:00 Giờ VN), 06:00 UTC (13:00 Giờ VN) hoặc 14:00 UTC (21:00 Giờ VN) trùng chủ đề để ăn 3–4 đầu thưởng.",
                en: "Always wait for the 02:00 UTC, 06:00 UTC, or 14:00 UTC sprint matching the daily theme to capture 3–4 reward streams.",
              },
            },
          ],
        },
      ],
      subSections: [
        {
          id: "sub-1-1-pro-mechanics-diagram",
          title: {
            vi: "1.1. Sơ Đồ Thực Thi 4 Kỹ Thuật Cao Thủ Từ Đêm Trước Đến Khung Giờ Vàng",
            en: "1.1. Veteran 4-Technique Execution Flowchart (Overnight Prep ➔ Golden Window Burst)",
          },
          badge: {
            vi: "4 Kỹ Thuật Pro",
            en: "4 Pro Mechanics",
          },
          blocks: [
            {
              type: "visual_diagram",
              variant: "timeline_phases",
              title: {
                vi: "Chuỗi Thao Tác Thực Chiến: Pre-Build • Pre-Cook • Pre-Gather • Triple-Dip",
                en: "Tactical Execution Chain: Pre-Build • Pre-Cook • Pre-Gather • Triple-Dip",
              },
              subtitle: {
                vi: "Cách biến 1 đơn vị thời gian và nguyên liệu thành 300% điểm số sự kiện",
                en: "Turning every unit of time and material into 300% event scoring output",
              },
              branches: [
                {
                  title: {
                    vi: "KỸ THUẬT 1 & 2: Ủ HỘP QUÀ CÔNG TRÌNH & Ủ LÍNH / ĐÔN BẬC T-1 ➔ T",
                    en: "TECHNIQUES 1 & 2: GIFT BOX BANKING & TROOP PRE-COOK / T-1 ➔ T PROMOTION",
                  },
                  badge: {
                    vi: "Pre-Build & Troop",
                    en: "Pre-Build & Troop",
                  },
                  tone: "gold",
                  steps: [
                    {
                      id: "pm-1",
                      title: {
                        vi: "Xây Xong Để Nguyên Hộp Quà Trên Nóc Nhà + Luyện Xong Giữ Trên Trại Lính",
                        en: "Leave Completed Building Gift Boxes Unopened + Hold Finished Troops on Barracks",
                      },
                      subtitle: {
                        vi: "Đợi đúng ngày Xây dựng (Thứ Hai) hoặc ngày Lính (Thứ Sáu) mới bấm mở + xả Promote T-1 ➔ T",
                        en: "Wait until Construction Day (Mon) or Troop Day (Fri) to pop boxes + batch-promote T-1 ➔ T units",
                      },
                      tone: "gold",
                    },
                  ],
                  outcome: {
                    vi: "Ăn ngay hàng triệu điểm mở màn mà tốn 0 phút Tăng Tốc khởi động.",
                    en: "Scores millions of opening points while burning zero initial Speedups.",
                  },
                },
                {
                  title: {
                    vi: "KỸ THUẬT 3 & 4: CẮM MỎ RUBY / TREO THƯỞNG & GỘP TRÙNG TRIPLE-DIP",
                    en: "TECHNIQUES 3 & 4: RUBY / BOUNTY BANKING & TRIPLE-DIP ALIGNMENT",
                  },
                  badge: {
                    vi: "Quest & Triple-Dip",
                    en: "Quest & Triple-Dip",
                  },
                  tone: "emerald",
                  steps: [
                    {
                      id: "pm-2",
                      title: {
                        vi: "Cử 4 Đạo Đào Mỏ Ruby Từ Tối Hôm Trước + Giữ Nhiệm Vụ Treo Thưởng Chờ Nhận",
                        en: "Send 4 Marches to Ruby Mines Overnight + Bank Completed Bounty Quests",
                      },
                      subtitle: {
                        vi: "Thu quân sau 00:00 UTC (07:00 Giờ VN) và xả kho vào đúng ca 02:00 / 06:00 / 14:00 UTC",
                        en: "Recall marches after 00:00 UTC and dump stockpiles inside 02:00 / 06:00 / 14:00 UTC windows",
                      },
                      tone: "emerald",
                    },
                  ],
                  outcome: {
                    vi: "Một lần thao tác nhận thưởng đồng thời từ 3–4 bảng sự kiện đang mở.",
                    en: "A single execution claims rewards across 3–4 active event boards simultaneously.",
                  },
                },
              ],
            },
          ],
        },
        {
          id: "sub-1-2-four-mechanics-master-table",
          title: {
            vi: "1.2. Bảng Cẩm Nang 4 Kỹ Thuật Thao Tác Thực Chiến Cao Thủ (Pro-Player Mechanics)",
            en: "1.2. Master Reference Table: The 4 Veteran Pre-Cooking & Triple-Dip Mechanics",
          },
          badge: {
            vi: "4 Mẹo Thực Chiến",
            en: "4 Pro Tricks",
          },
          blocks: [
            {
              type: "table",
              caption: {
                vi: "Chi tiết cách thao tác từng bước và cơ chế ghi nhận điểm của 4 kỹ thuật cao thủ",
                en: "Step-by-step execution protocol and server scoring mechanics for the 4 veteran tricks",
              },
              headers: [
                { vi: "Tên Kỹ Thuật Cao Thủ", en: "Veteran Technique" },
                { vi: "Quy Trình Thao Tác Chính Xác", en: "Exact Step-by-Step Protocol" },
                { vi: "Lợi Thế Điểm Số Đạt Được", en: "Scoring Advantage Gained" },
              ],
              rows: [
                [
                  { vi: "1. Ủ nhà / Giữ hộp quà công trình (Pre-building)", en: "1. Pre-building & Gift Box Banking" },
                  { vi: "Bấm nâng Lâu Đài / Trại Lính từ 2–5 ngày trước; khi xây xong KHÔNG ấn vào hộp quà trên nóc nhà cho tới khi mở Event Xây dựng.", en: "Start Castle / Barracks upgrades 2–5 days prior; when finished, do NOT tap the roof gift box until the Construction Event opens." },
                  { vi: "Điểm Lực chiến công trình nổ ngay lập tức ở giây thứ 1 của sự kiện mà tốn 0 Tăng Tốc.", en: "Full building Power points register in second #1 of the event at zero Speedup cost." },
                ],
                [
                  { vi: "2. Ủ lính & Nâng bậc lính (Troop Pre-cooking & Tier Promotion)", en: "2. Troop Pre-cooking & Tier T-1 ➔ T Promotion" },
                  { vi: "Luyện xong giữ nguyên trên Trại Lính chờ Event mới thu; trữ sẵn lính cấp T-1 để vào ngày Đua Vũ Trang / KvK bấm 'Nâng cấp bậc lính'.", en: "Hold finished troops on Barracks until Event reset; stockpile T-1 units and batch-tap 'Promote' on GAR / KvK Troop Day." },
                  { vi: "Nhận điểm lính miễn phí đầu ngày + Tối đa hóa điểm nhận được trên mỗi phút Tăng Tốc Luyện Lính.", en: "Captures free opening troop points + Maximizes points earned per minute of Training Speedup." },
                ],
                [
                  { vi: "3. Ủ Nghiên cứu / Cắm mỏ Ruby / Treo Thưởng chờ nhận", en: "3. Tech Pre-cook, Ruby Pre-gathering & Quest Banking" },
                  { vi: "Cử toàn bộ đạo quân đào mỏ Ruby cấp cao từ đêm trước; hoàn thành nhiệm vụ Treo Thưởng nhưng chưa bấm nhận cho đến khi mở Event.", en: "Send all marches to high-level Ruby mines overnight; finish Bounty Quests without claiming until the drop event starts." },
                  { vi: "Sáng hôm sau thu quân ăn ngay vài nghìn điểm Ruby + Nhận 8–10 túi đạo cụ sự kiện ngay phút đầu.", en: "Morning recall banks thousands of Ruby points + Claims 8–10 event drop bags in minute #1." },
                ],
                [
                  { vi: "4. Double-Dip / Triple-Dip (Gộp trùng 3–4 sự kiện)", en: "4. Double-Dip / Triple-Dip (3–4 Event Sync)" },
                  { vi: "Căn chính xác khung giờ 4 tiếng của Quân Bị Dũng Sĩ trùng với GAR / KvK, Mini-Rush 2 ngày, Thẻ Thông Hành và Niềm Vui Nhân Đôi.", en: "Align the 4-hour Hourly Sprint with GAR / KvK, 2-day Mini-Rushes, Battle Pass, and Double Joy." },
                  { vi: "1 lần xả tài nguyên ăn trọn 3–4 đầu phần thưởng rương mốc (hiệu suất 300%–400%).", en: "A single resource dump claims 3–4 separate milestone reward tracks (300%–400% yield)." },
                ],
              ],
            },
          ],
        },
        {
          id: "sub-1-3-pro-mechanics-checklist",
          title: {
            vi: "1.3. Checklist Thao Tác 4 Kỹ Thuật Pre-Cook Trước Giờ Reset 00:00 UTC (07:00 Giờ VN)",
            en: "1.3. Pre-Reset 4-Mechanic Execution Checklist (Before 00:00 UTC)",
          },
          blocks: [
            {
              type: "checklist",
              checklistId: "event-5-6-pro-mechanics-v1",
              title: {
                vi: "5 Bước Kiểm Tra Kỹ Thuật Cao Thủ Trước Giờ Mở Màn",
                en: "5-Step Veteran Pre-Cooking Verification Checklist",
              },
              items: [
                {
                  id: "chk-56-1",
                  label: {
                    vi: "Đã giữ nguyên các Hộp Quà hoàn thành trên nóc công trình (không bấm nhầm) chờ đúng giờ mở ngày Xây Dựng.",
                    en: "Left completed Building Gift Boxes unopened on rooftops until Construction Day opens.",
                  },
                  detail: {
                    vi: "Bật đủ buff Lãnh Chúa/Dân Làng rồi mới bấm mở hộp quà.",
                    en: "Activate Lord/Villager buffs right before popping the gift boxes.",
                  },
                },
                {
                  id: "chk-56-2",
                  label: {
                    vi: "Đã ủ sẵn 1 mẻ lính lớn trên cả 3 Trại Lính và tích trữ lính bậc T-1 chờ ngày Đua Vũ Trang / KvK bấm Nâng Bậc.",
                    en: "Pre-cooked full troop batches across all 3 Barracks and stockpiled T-1 units for GAR / KvK Promotion Day.",
                  },
                  detail: {
                    vi: "Đạt hiệu suất điểm trên mỗi phút Tăng Tốc Luyện Lính cao nhất.",
                    en: "Achieves the highest point-per-minute Training Speedup ratio.",
                  },
                },
                {
                  id: "chk-56-3",
                  label: {
                    vi: "Đã cử toàn bộ đạo quân đi đào mỏ Ruby cấp cao từ tối hôm trước để thu quân về sau 00:00 UTC (07:00 Giờ VN).",
                    en: "Sent all marches to high-level Ruby mines the night before to return after 00:00 UTC reset.",
                  },
                  detail: {
                    vi: "Ăn trọn điểm thu thập mở màn ngày mới.",
                    en: "Banks instant gathering points right after daily reset.",
                  },
                },
                {
                  id: "chk-56-4",
                  label: {
                    vi: "Đã làm xong các nhiệm vụ Treo Thưởng (Bounty Quests) nhưng giữ nguyên trạng thái 'Nhận thưởng' chờ Event mở.",
                    en: "Completed Bounty Quests and held them in 'Claim' state until the event launches.",
                  },
                  detail: {
                    vi: "Thu hoạch đạo cụ rơi sự kiện ngay ở giây đầu tiên.",
                    en: "Harvests event drop tokens in the very first second.",
                  },
                },
                {
                  id: "chk-56-5",
                  label: {
                    vi: "Đã kiểm tra lịch Ca 4 Tiếng (02:00 / 06:00 / 14:00 UTC) trùng khớp với GAR / KvK và Mini-Rush trước khi xả kho.",
                    en: "Verified the 4-Hour Sprint schedule (02:00 / 06:00 / 14:00 UTC) matches GAR / KvK and Mini-Rush before dumping.",
                  },
                  detail: {
                    vi: "Kích hoạt chuỗi thưởng Triple-Dip 3–4 sự kiện cùng lúc.",
                    en: "Triggers 3–4 concurrent event reward tracks via Triple-Dip.",
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
      id: "sec-2-pro-triple-dip-windows",
      isPro: true,
      title: {
        vi: "2. [PRO] Bảng Khung Giờ Vàng Gộp Trùng 4 Sự Kiện (Quadruple-Dip Execution Matrix)",
        en: "2. [PRO] Golden Window 4-Event Alignment Matrix (Quadruple-Dip Execution)",
      },
      blocks: [
        {
          type: "table",
          caption: {
            vi: "Cách căn thời điểm xả kho để 1 hành động tính điểm đồng thời trên 4 sự kiện",
            en: "Timing resource dumps so a single action scores across 4 concurrent events",
          },
          headers: [
            { vi: "Nhóm Hành Động Xả Kho", en: "Resource Dump Action" },
            { vi: "Tổ Hợp 4 Sự Kiện Trùng Khớp", en: "4-Event Overlap Stack" },
            { vi: "Khung Giờ Thực Thi Chuẩn Xác", en: "Exact Execution Window" },
          ],
          rows: [
            [
              { vi: "Mở Hộp Quà Công Trình + Xả Tăng Tốc Xây Dựng + Đột Phá Cổ Vật", en: "Pop Building Gift Boxes + Construction Speedups + Relic Upgrades" },
              { vi: "GAR Ngày 1 + Ca 4 Giờ Xây Dựng + Mini-Rush Xây Dựng/Cổ Vật + Nhiệm Vụ Pass", en: "GAR Day 1 + 4h Build Sprint + Build/Relic Mini-Rush + Battle Pass Tasks" },
              { vi: "Thứ Hai lúc 02:00 UTC (09:00 Giờ VN) hoặc 14:00 UTC (21:00 Giờ VN).", en: "Monday at 02:00 UTC or 14:00 UTC." },
            ],
            [
              { vi: "Thu Hoạch Lính Pre-Cook + Đôn Bậc Lính (T-1 ➔ T) + Nâng Cấp Thú Cưng", en: "Harvest Pre-Cooked Troops + Promote T-1 ➔ T + Upgrade Pets" },
              { vi: "GAR Ngày 5 + Ca 4 Giờ Luyện Lính + Mini-Rush Lính/Pet + Thi Đấu Bang", en: "GAR Day 5 + 4h Troop Sprint + Troop/Pet Mini-Rush + Guild Milestone" },
              { vi: "Thứ Sáu lúc 10:00 UTC (17:00 Giờ VN) hoặc 22:00 UTC (05:00 Giờ VN).", en: "Friday at 10:00 UTC or 22:00 UTC." },
            ],
          ],
        },
        {
          type: "case_study",
          badge: {
            vi: "Thực Chiến Pre-Cook & Triple-Dip",
            en: "Pre-Cook & Triple-Dip Triage",
          },
          title: {
            vi: "Ca Bệnh Điển Hình: Bấm Mở Nhầm Hộp Quà Lâu Đài Lv.30 Vào Tối Chủ Nhật Trước GAR",
            en: "Case Study: Accidentally Tapping a Castle Lv.30 Gift Box on Sunday Night Before GAR",
          },
          profileSummary: {
            vi: "Người chơi đã chờ 9 ngày để xây xong Lâu Đài Lv.30 vào lúc 21:00 UTC tối Chủ Nhật (chỉ còn 3 tiếng nữa là mở Ngày 1 của Đua Vũ Trang Bang Hội — GAR), nhưng quen tay bấm luôn vào hộp quà trên nóc Lâu Đài.",
            en: "A player waited 9 days for Castle Lv.30 to finish at 21:00 UTC on Sunday night (just 3 hours before GAR Day 1 opens), then reflexively tapped the floating Castle gift box.",
          },
          diagnostics: [
            {
              vi: "Toàn bộ lượng Lực Chiến khổng lồ của Lâu Đài Lv.30 nổ vào tối Chủ Nhật (thời điểm không có sự kiện) nên nhận về 0 điểm GAR Ngày 1.",
              en: "The massive Castle Lv.30 Power spike registered on Sunday night during dead time, awarding zero GAR Day 1 points.",
            },
            {
              vi: "Sáng Thứ Hai phải đốt bù 25 ngày Tăng Tốc Xây Dựng vào các công trình nhỏ mới mở nổi Rương 9 GAR.",
              en: "Forced to burn 25 extra days of Construction Speedups on Monday morning just to reach GAR Chest 9.",
            },
          ],
          recoverySteps: [
            {
              stepNumber: "01",
              title: {
                vi: "Quy Tắc Bàn Tay Vàng: Tuyệt Đối Không Chạm Vào Nóc Nhà Có Hộp Quà",
                en: "Golden Hand Rule: Never Tap Rooftops with Floating Gift Boxes",
              },
              detail: {
                vi: "Khi công trình xây xong trước ngày sự kiện, hãy để nguyên hộp quà lơ lửng trên nóc nhà — bạn vẫn có thể bấm xây công trình tiếp theo ở hàng đợi thợ xây khác bình thường!",
                en: "When a building finishes before event day, leave the gift box floating on the roof — your builder queue is already free to start another upgrade!",
              },
            },
            {
              stepNumber: "02",
              title: {
                vi: "Đợi Đúng 02:00 UTC (09:00 Giờ VN) Sáng Thứ Hai Mới Bấm Mở Hộp Quà",
                en: "Wait Until 02:00 UTC Monday Morning to Pop the Gift Box",
              },
              detail: {
                vi: "Mở hộp quà đúng lúc Ca 4 Giờ Xây Dựng trùng với Ngày 1 GAR để ăn kép cả hai bảng điểm.",
                en: "Pop the gift box during the Monday 02:00 UTC 4-Hour Construction Sprint to double-dip both boards.",
              },
            },
            {
              stepNumber: "03",
              title: {
                vi: "Áp Dụng Tương Tự Cho Biểu Tượng Thu Hoạch Lính Trên Trại Lính",
                en: "Apply the Same Hold Rule to Completed Barracks Troop Icons",
              },
              detail: {
                vi: "Ủ xong mẻ lính lớn từ Thứ Năm và chỉ bấm thu hoạch vào Thứ Sáu (Ngày 5 GAR).",
                en: "Finish a max troop batch on Thursday and only tap to harvest on Friday (GAR Day 5).",
              },
            },
          ],
          conclusion: {
            vi: "Tiết kiệm 25 ngày Tăng Tốc Xây Dựng mỗi tuần và mở thẳng Rương 6–7 ngay giây đầu tiên của sự kiện!",
            en: "Saves 25 days of Construction Speedups every week and unlocks Chests 6–7 in the very first second of the event!",
          },
        },
      ],
    },
  ],
};

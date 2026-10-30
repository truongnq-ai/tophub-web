import type { GuideArticle } from "../../types";

export const ARTICLE_5_4_PACKS_AND_ROI: GuideArticle = {
  code: "5.4",
  displayCode: "5.4",
  slug: "packs-and-roi",
  categorySlug: "event-playbooks",
  badge: "PRO",
  readingMinutes: 12,
  title: {
    vi: "Bảng 4 — Gói nạp & Phần thưởng (Phân tích ROI & Gói ẩn liên thông)",
    en: "Table 4 — Event Packs & ROI Analysis (Best-Value Bundles & Cross-Event Packs)",
  },
  summary: {
    vi: "Bảng tổng hợp các gói nạp liên quan (exchange + exchange_payid: Tên gói, Giá USD/VNĐ, Giới hạn mua, Chi tiết vật phẩm nhận được) và chỉ rõ gói nào rẻ mà lời nhất, bao gồm cả các gói ẩn liên thông giữa các sự kiện mở cùng ngày.",
    en: "Comprehensive table of all event bundles (exchange + exchange_payid: Pack name, USD/VND price, Purchase limit, Detailed rewards), identifying the highest-ROI low-cost bundles and hidden cross-event packs.",
  },
  tldr: {
    coreRule: {
      vi: "Trong cấu trúc gói nạp sự kiện (`exchange` + `exchange_payid`), hiệu suất lợi tức trên mỗi đô-la (**ROI**) luôn tuân theo hình tháp ngược: **Gói Mồi Hàng Ngày `$0.99` (25,000 VNĐ) & Thẻ Thông Hành `$4.99` (129,000 VNĐ)** có tỷ lệ đạo cụ/USD cao gấp **2.5x – 3.5x** so với các gói nạp trực tiếp `$49.99 – $99.99`.",
      en: "Across all event pack structures (`exchange` + `exchange_payid`), return-on-investment (**ROI**) follows an inverted pyramid: **Daily `$0.99` Bait Packs & `$4.99` Battle Passes** deliver **2.5x to 3.5x** more event tokens per dollar than direct `$49.99 – $99.99` top-up bundles.",
    },
    immediateAction: {
      vi: "Nếu bạn là Low-Mid Spender, hãy rải mua gói `$0.99/ngày` ngay từ Ngày 1 của sự kiện Xúc Xắc / Vòng Quay (`7 ngày = $6.93`) kết hợp gói ẩn liên thông **Pass Tập Kích Cự Ma `$4.99`** (lấy Orichalcum cho Ngày 3 GAR) và **Gói Món Quà Bạn Hiền / Niềm Vui Nhân Đôi x2**.",
      en: "For Low-Mid Spenders, stack the daily `$0.99` pack starting Day 1 of Treasure Dice / Lucky Wheel (`7 days = $6.93`) alongside cross-event hidden value packs like the **`$4.99` Giant Raid Pass** (for GAR Day 3 Orichalcum) and **Double Joy x2 Coupons**.",
    },
    strictTaboo: {
      vi: "Tuyệt đối KHÔNG nhịn mua gói `$0.99` suốt 6 ngày đầu rồi đến ngày cuối cùng mới nạp gói `$29.99 / $49.99` đắt đỏ, và KHÔNG mua gói Tăng Tốc giá gốc trong cửa hàng GAR.",
      en: "NEVER skip the `$0.99` daily pack across the first 6 days only to panic-buy overpriced `$29.99 / $49.99` bundles on the final day, and NEVER buy raw Speedup packs inside the GAR shop.",
    },
  },
  keyTakeaways: [
    {
      vi: "**Gói Mồi `$0.99` (25,000 VNĐ — Giới hạn 1/ngày):** Rẻ và lời số 1 trong mọi kỳ Xúc Xắc Kho Báu (Desert Prince Ngày 21, Storm Maiden Ngày 27) và Vòng Quay May Mắn.",
      en: "**`$0.99` Daily Bait Pack (Limit 1/day):** #1 highest-ROI bundle across every Treasure Dice (Day 21 Desert Prince, Day 27 Storm Maiden) and Lucky Wheel run.",
    },
    {
      vi: "**Thẻ Thông Hành `$4.99` (129,000 VNĐ — 1 lần/kỳ):** Trong Tập Kích Cự Ma và Lễ Hội Bắt Bướm, gói Pass `$4.99` cung cấp lượng Orichalcum và Mảnh Vạn Năng gấp 4 lần gói thường.",
      en: "**`$4.99` Event Battle Pass (1/cycle):** In Giant Troll Raid and Butterfly Catching, the `$4.99` Pass delivers 4x more Orichalcum and Universal Shards than standard packs.",
    },
    {
      vi: "**Gói Ẩn Liên Thông Giữa Các Sự Kiện Cùng Ngày:** Mua gói ở sự kiện Xúc Xắc Storm Maiden (Ngày 27) để lấy mảnh tướng, sau đó đem mảnh đó xả ăn rương x2 ở Ngày 4 GAR.",
      en: "**Cross-Event Hidden Pack Synergy:** Buy `$0.99 / $4.99` packs inside Storm Maiden Dice (Day 27) for hero shards, then dump those exact shards on GAR Day 4 for doubled chests.",
    },
    {
      vi: "**Phiếu Niềm Vui Nhân Đôi (`Double Joy x2 Coupon`):** Khi tuần lễ có sự kiện Niềm Vui Nhân Đôi mở song song với Banner Thần Thoại, hiệu suất gói nạp tăng gấp đôi (`200% ROI`).",
      en: "**Double Joy x2 Coupon Alignment:** When Double Joy overlaps with a Mythic Banner or GAR week, pack token yields double (`200% ROI`).",
    },
  ],
  keywords: [
    "exchange",
    "exchange_payid",
    "Gói nạp",
    "Phân tích ROI",
    "$0.99",
    "$4.99",
    "Double Joy",
  ],
  sourceFiles: ["event-playbooks-data.ts"],
  freeSections: [
    {
      id: "sec-1-packs-roi-console",
      title: {
        vi: "1. Bảng 4 — Tra Cứu Gói Nạp, Giá USD/VNĐ & Phân Tích ROI Từng Sự Kiện",
        en: "1. Table 4 — Event Packs, USD/VND Pricing & ROI Analysis Explorer",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "Chọn sự kiện bất kỳ dưới đây để kiểm tra **Bảng 4 — Gói nạp & Phần thưởng (Phân tích ROI)** (`exchange` + `exchange_payid`, giới hạn mua và các gói ẩn liên thông):",
            en: "Select any event below to inspect **Table 4 — Event Packs & ROI Analysis** (`exchange` + `exchange_payid`, purchase limits, and cross-event hidden bundles):",
          },
        },
        {
          type: "widget",
          widgetType: "event_playbook_explorer",
        },
        {
          type: "media_spotlight",
          mediaCode: "MED-5.4-01",
          tier: "tier2_annotated_ui",
          title: {
            vi: "Tháp Hiệu Suất Gói Nạp (ROI Pyramid) & Nghệ Thuật Kẹp Gói Liên Thông",
            en: "Event Pack ROI Pyramid & Cross-Event Bundle Stacking Strategy",
          },
          description: {
            vi: "So sánh hiệu suất đạo cụ trên mỗi USD giữa gói ngày $0.99, Thẻ Thông Hành $4.99 và cách kẹp gói ẩn liên thông giữa Banner Ngày 27 với tuần lễ GAR.",
            en: "Comparing tokens-per-dollar across $0.99 daily packs, $4.99 Battle Passes, and cross-event bundle stacking between Day 27 banners and GAR week.",
          },
          annotations: [
            {
              kind: "do",
              label: {
                vi: "Gom Đủ 7 Ngày Gói $0.99 ($6.93) Thay Vì Nạp Gói $19.99 Ngày Cuối",
                en: "Stack 7 Days of $0.99 Packs ($6.93) Instead of a Final-Day $19.99 Bundle",
              },
              detail: {
                vi: "Gói $0.99 hàng ngày mang lại lượng Xúc Xắc / Xu Vòng Quay trên mỗi USD cao gấp 3 lần gói nạp lớn.",
                en: "Daily $0.99 bundles yield up to 3x more Dice / Wheel Tokens per dollar than bulk final-day packs.",
              },
            },
            {
              kind: "info",
              label: {
                vi: "Khai Thác Gói Ẩn Liên Thông: Mua Ở Sự Kiện A ➔ Nổ Điểm Ở Sự Kiện B",
                en: "Exploit Cross-Event Packs: Buy in Event A ➔ Score in Event B",
              },
              detail: {
                vi: "Mua Pass Tập Kích Cự Ma $4.99 lấy Orichalcum rồi đợi Thứ Tư (Ngày 3 GAR) mới rèn để ăn thêm 9 rương x2.",
                en: "Buy the $4.99 Giant Raid Pass for Orichalcum, then wait until Wednesday (GAR Day 3) to forge and sweep 9 doubled chests.",
              },
            },
            {
              kind: "dont",
              label: {
                vi: "Cấm Mua Gói Tăng Tốc Trực Tiếp Trong Giao Diện Đua Vũ Trang (GAR)",
                en: "Never Buy Direct Speedup Bundles Inside the GAR Interface",
              },
              detail: {
                vi: "Các gói Tăng Tốc bán trực tiếp trong GAR có tỷ giá ROI rất thấp (Tier F).",
                en: "Direct Speedup bundles inside the GAR store have among the lowest ROI in the game (Tier F).",
              },
            },
          ],
        },
      ],
      subSections: [
        {
          id: "sub-1-1-packs-roi-diagram",
          title: {
            vi: "1.1. Sơ Đồ Phân Bổ Ngân Sách & Gói Ẩn Liên Thông Giữa Các Sự Kiện Mở Cùng Ngày",
            en: "1.1. Budget Allocation & Cross-Event Pack Synergy Flowchart",
          },
          badge: {
            vi: "Tháp ROI",
            en: "ROI Pyramid",
          },
          blocks: [
            {
              type: "visual_diagram",
              variant: "decision_flow",
              title: {
                vi: "Chiến Thuật Chọn Gói Nạp Rẻ Mà Lời Nhất Theo 3 Tầng Ngân Sách",
                en: "Highest-ROI Pack Selection Strategy Across 3 Spender Tiers",
              },
              subtitle: {
                vi: "Tối ưu hóa từng đồng chi tiêu thông qua gói giới hạn ngày và gói liên thông sự kiện",
                en: "Maximizing every dollar via daily-capped micro-packs and cross-event synergies",
              },
              branches: [
                {
                  title: {
                    vi: "TẦNG 1: MICRO-SPENDER ($1 – $7/KỲ) • GÓI MỒI HÀNG NGÀY $0.99",
                    en: "TIER 1: MICRO-SPENDER ($1 – $7/CYCLE) • $0.99 DAILY BAIT PACKS",
                  },
                  badge: {
                    vi: "ROI 350%+",
                    en: "350%+ ROI",
                  },
                  tone: "emerald",
                  steps: [
                    {
                      id: "pr-1",
                      title: {
                        vi: "Mua Gói $0.99 (25,000 VNĐ) Mỗi Ngày Trong Kỳ Xúc Xắc / Vòng Quay",
                        en: "Buy the $0.99 Daily Pack Every Day During Treasure Dice / Lucky Wheel",
                      },
                      subtitle: {
                        vi: "Kết hợp Kim Cương miễn phí để đẩy từ mốc 30 lượt lên thẳng mốc 60 lượt",
                        en: "Combine with free Diamonds to jump from the 30-roll chest straight to the 60-roll milestone",
                      },
                      tone: "emerald",
                    },
                  ],
                  outcome: {
                    vi: "Mở khóa chắc chắn Tướng Thần Thoại kèm lượng lớn Xu Đổi Cửa Hàng.",
                    en: "Guarantees Mythic Hero unlock plus a massive Shop Coin surplus.",
                  },
                },
                {
                  title: {
                    vi: "TẦNG 2: LOW-MID SPENDER ($5 – $25/KỲ) • PASS $4.99 & GÓI LIÊN THÔNG",
                    en: "TIER 2: LOW-MID SPENDER ($5 – $25/CYCLE) • $4.99 PASS & CROSS-EVENT PACKS",
                  },
                  badge: {
                    vi: "ROI 300%",
                    en: "300% ROI",
                  },
                  tone: "gold",
                  steps: [
                    {
                      id: "pr-2",
                      title: {
                        vi: "Kẹp Pass Cự Ma $4.99 + 7 Gói $0.99 + 2 Gói $4.99 (Xúc Xắc Ngày 27)",
                        en: "Stack $4.99 Giant Raid Pass + 7x $0.99 + 2x $4.99 Packs (Day 27 Dice)",
                      },
                      subtitle: {
                        vi: "Chạm mốc 100 lượt Xúc Xắc lấy Vũ Khí Độc Quyền và gom Orichalcum nổ Ngày 3–4 GAR",
                        en: "Hit the 100-roll Dice milestone for Exclusive Weapon and bank Orichalcum for GAR Days 3–4",
                      },
                      tone: "gold",
                    },
                  ],
                  outcome: {
                    vi: "Ăn kép phần thưởng từ cả Banner Tướng Đỏ lẫn BXH Đua Vũ Trang Bang Hội.",
                    en: "Captures double rewards across both the Mythic Banner and GAR leaderboards.",
                  },
                },
              ],
            },
          ],
        },
        {
          id: "sub-1-2-packs-master-table",
          title: {
            vi: "1.2. Bảng Xếp Hạng Các Gói Nạp Sự Kiện Rẻ Mà Lời Nhất (exchange + exchange_payid)",
            en: "1.2. Master Ranking of Highest-ROI Event Packs (exchange + exchange_payid)",
          },
          badge: {
            vi: "Bảng 4 ROI",
            en: "Table 4 ROI",
          },
          blocks: [
            {
              type: "table",
              caption: {
                vi: "Đối chiếu giá USD/VNĐ, giới hạn mua, vật phẩm nhận được và xếp hạng ROI thực tế",
                en: "Comparison of USD/VND prices, purchase limits, included items, and real ROI verdicts",
              },
              headers: [
                { vi: "Tên Gói Nạp & Sự Kiện", en: "Bundle Name & Event" },
                { vi: "Giá USD / VNĐ & Giới Hạn", en: "Price (USD / VND) & Limit" },
                { vi: "Chi Tiết Vật Phẩm & Đánh Giá ROI", en: "Included Items & ROI Verdict" },
              ],
              rows: [
                [
                  { vi: "Gói Mồi Xúc Xắc / Vòng Quay Hàng Ngày (Daily Bait Bundle)", en: "Daily Dice / Wheel Bait Bundle" },
                  { vi: "$0.99 (~25,000 VNĐ) • Giới hạn 1 lần/ngày", en: "$0.99 (~25,000 VND) • Limit 1/day" },
                  { vi: "4–5 Xúc Xắc / Xu Vòng Quay + Kim Cương ➔ ROI SỐ 1 (350%): Bắt buộc rải mua từ Ngày 1.", en: "4–5 Dice / Wheel Tokens + Diamonds ➔ #1 BEST ROI (350%): Stack daily from Day 1." },
                ],
                [
                  { vi: "Thẻ Thợ Săn Cự Ma / Pass Lễ Hội (Hunter & Festival Pass)", en: "Giant Raid Hunter Pass & Festival Battle Pass" },
                  { vi: "$4.99 (~129,000 VNĐ) • Giới hạn 1 lần/kỳ", en: "$4.99 (~129,000 VND) • Limit 1/cycle" },
                  { vi: "Orichalcum, Mảnh Vạn Năng, Rương Vũ Khí ➔ ROI TIER S (300%): Gói ẩn liên thông nuôi Ngày 3–4 GAR.", en: "Orichalcum, Universal Shards, Weapon Chests ➔ TIER S ROI (300%): Cross-event fuel for GAR Days 3–4." },
                ],
                [
                  { vi: "Gói Niềm Vui Nhân Đôi (Double Joy x2 Coupon Pack)", en: "Double Joy x2 Coupon Bundle" },
                  { vi: "$0.99 – $4.99 (~25,000 – 129,000 VNĐ) • Theo phiếu x2", en: "$0.99 – $4.99 (~25,000 – 129,000 VND) • Per x2 coupon" },
                  { vi: "Nhân đôi (200%) toàn bộ đạo cụ trong gói ➔ ROI ĐỘT BIẾN: Chỉ mua khi có phiếu x2.", en: "Doubles (200%) all items in the bundle ➔ SUPREME ROI: Buy whenever an x2 coupon drops." },
                ],
              ],
            },
          ],
        },
        {
          id: "sub-1-3-packs-checklist",
          title: {
            vi: "1.3. Checklist Kiểm Định ROI Trước Khi Mua Bất Kỳ Gói Sự Kiện Nào",
            en: "1.3. Pre-Purchase Pack ROI Verification Checklist",
          },
          blocks: [
            {
              type: "checklist",
              checklistId: "event-5-4-packs-roi-v1",
              title: {
                vi: "5 Bước Kiểm Tra Gói Nạp & Gói Ẩn Liên Thông",
                en: "5-Step Pack ROI & Cross-Event Synergy Checklist",
              },
              items: [
                {
                  id: "chk-54-1",
                  label: {
                    vi: "Đã ưu tiên mua gói $0.99 hàng ngày ngay từ Ngày 1 của sự kiện thay vì nạp gói lớn vào ngày cuối.",
                    en: "Prioritized the $0.99 daily pack starting on Day 1 instead of buying bulk bundles on the final day.",
                  },
                  detail: {
                    vi: "Tiết kiệm tới 65% chi phí để chạm mốc 60–100 lượt.",
                    en: "Saves up to 65% of the cost to reach 60–100 rolls.",
                  },
                },
                {
                  id: "chk-54-2",
                  label: {
                    vi: "Đã kiểm tra xem có sự kiện Niềm Vui Nhân Đôi (Double Joy x2) hoặc Món Quà Bạn Hiền đang mở cùng ngày hay không.",
                    en: "Checked whether Double Joy x2 or Friend Gift cross-event promotions are active on the same day.",
                  },
                  detail: {
                    vi: "Kích hoạt nhân đôi vật phẩm hoặc nhận thêm thưởng nạp tích lũy.",
                    en: "Triggers 2x bundle yields or cumulative top-up rebates.",
                  },
                },
                {
                  id: "chk-54-3",
                  label: {
                    vi: "Đã cày Thẻ Thợ Săn Tập Kích Cự Ma lên Cấp 25–30 trước khi bấm mở khóa nhánh VIP $4.99.",
                    en: "Leveled the Giant Raid Hunter Pass to Tier 25–30 before purchasing the $4.99 VIP unlock.",
                  },
                  detail: {
                    vi: "Đảm bảo thu hoạch 100% Orichalcum ngay khi thanh toán.",
                    en: "Guarantees claiming 100% of the Orichalcum immediately upon purchase.",
                  },
                },
                {
                  id: "chk-54-4",
                  label: {
                    vi: "Đã giữ nguyên vật phẩm nhận từ gói nạp (Mảnh Tướng, Orichalcum, Cổ Ngữ) để xả đúng ngày chủ đề GAR.",
                    en: "Held all items claimed from packs (Hero Shards, Orichalcum, Runes) until their matching GAR theme day.",
                  },
                  detail: {
                    vi: "Biến 1 gói nạp thành 2–3 lần nhận thưởng sự kiện.",
                    en: "Turns a single pack purchase into 2–3 layers of event rewards.",
                  },
                },
                {
                  id: "chk-54-5",
                  label: {
                    vi: "Tuyệt đối nói KHÔNG với các gói Tăng Tốc hoặc Tài Nguyên giá gốc bán trong giao diện GAR.",
                    en: "Strictly avoided full-price Speedup or Resource bundles inside the GAR storefront.",
                  },
                  detail: {
                    vi: "Bảo vệ ngân sách khỏi các gói mồi ROI thấp (Tier F).",
                    en: "Protects your budget from low-ROI Tier F bundles.",
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
      id: "sec-2-pro-cross-event-packs",
      isPro: true,
      title: {
        vi: "2. [PRO] Bảng Giải Phẫu Các Gói Ẩn Liên Thông Giữa Các Sự Kiện Mở Cùng Ngày",
        en: "2. [PRO] Cross-Event Hidden Pack Synergies & Multi-Event Rebate Matrix",
      },
      blocks: [
        {
          type: "table",
          caption: {
            vi: "Cách mua gói ở Sự kiện A để ăn thưởng nạp tích lũy và nổ điểm ở Sự kiện B",
            en: "Purchasing bundles in Event A to trigger top-up rebates and score in Event B",
          },
          headers: [
            { vi: "Tổ Hợp Sự Kiện Mở Cùng Thời Điểm", en: "Concurrent Event Combination" },
            { vi: "Gói Mua Thông Minh (Gói Ẩn Liên Thông)", en: "Smart Cross-Event Purchase" },
            { vi: "Chuỗi Lợi Tức Kép Thu Về", en: "Combined Multi-Event Yield" },
          ],
          rows: [
            [
              { vi: "Xúc Xắc Storm Maiden (Ngày 27) + Đua Vũ Trang GAR (Ngày 28–33)", en: "Storm Maiden Dice (Day 27) + Guild Arms Race (Days 28–33)" },
              { vi: "Mua gói $0.99 & $4.99 ở Xúc Xắc Storm Maiden trong các ngày trùng GAR.", en: "Buy $0.99 & $4.99 Storm Maiden Dice packs on days overlapping with GAR." },
              { vi: "Vừa lấy Xúc Xắc chạm mốc 100 lượt (Vũ Khí Độc Quyền), vừa lấy Mảnh Tướng xả nổ 9 rương x2 ở Ngày 4 GAR.", en: "Hits the 100-roll Dice milestone (Exclusive Weapon) while supplying Hero Shards to sweep 9 doubled chests on GAR Day 4." },
            ],
            [
              { vi: "Tập Kích Cự Ma (Giant Raid) + Ngày 3 GAR (Thứ Tư)", en: "Giant Troll Raid + GAR Day 3 (Wednesday)" },
              { vi: "Mở khóa Pass Thợ Săn $4.99 trong sự kiện Tập Kích Cự Ma.", en: "Unlock the $4.99 Hunter Pass inside Giant Troll Raid." },
              { vi: "Nhận lượng lớn Orichalcum & Kim Loại Tinh Luyện với giá rẻ bằng 1/4 gói GAR, xả vào Thứ Tư lấy Top BXH Ngày 3.", en: "Acquires massive Orichalcum & Refined Metal at 1/4 the cost of GAR packs, dumping on Wednesday for Top Daily Rank." },
            ],
          ],
        },
        {
          type: "case_study",
          badge: {
            vi: "Tối Ưu Gói Nạp",
            en: "Pack ROI Triage",
          },
          title: {
            vi: "Ca Bệnh Điển Hình: Tốn $49.99 Ngày Cuối Mà Nhận Ít Lượt Hơn Người Rải Gói $0.99 + $4.99",
            en: "Case Study: Spending $49.99 on the Final Day for Fewer Rolls Than a $16.91 Daily Stack",
          },
          profileSummary: {
            vi: "Hai người chơi cùng muốn chạm mốc 100 lượt Xúc Xắc Storm Maiden (Ngày 27): Người A đợi ngày thứ 7 nạp gói $49.99, trong khi Người B rải mua gói $0.99 và $4.99 từ Ngày 1.",
            en: "Two players both target the 100-roll Storm Maiden Dice milestone (Day 27): Player A waits until Day 7 to buy a $49.99 bundle, while Player B stacks daily $0.99 and $4.99 packs from Day 1.",
          },
          diagnostics: [
            {
              vi: "Người A bỏ lỡ 6 lượt mua gói $0.99 (giới hạn 1 lần/ngày) ở 6 ngày đầu tiên nên buộc phải mua gói mệnh giá lớn có đơn giá mỗi viên Xúc Xắc đắt gấp 2.8 lần.",
              en: "Player A missed 6 daily resets of the 1/day $0.99 bundle, forcing them into bulk packs where each Die costs 2.8x more.",
            },
            {
              vi: "Người A nạp vào Chủ Nhật (ngày cuối Xúc Xắc) nên không khớp với sự kiện nạp tích lũy đầu tuần.",
              en: "Player A topped up on Sunday, missing weekday cumulative top-up rebate events.",
            },
          ],
          recoverySteps: [
            {
              stepNumber: "01",
              title: {
                vi: "Kích Hoạt Chuỗi 7 Ngày Gói $0.99 Ngay Từ 00:00 UTC (07:00 Giờ VN) Ngày 1",
                en: "Start the 7-Day $0.99 Pack Chain at 00:00 UTC on Day 1",
              },
              detail: {
                vi: "Mua đều đặn gói $0.99 mỗi ngày (7 ngày = $6.93) kết hợp full lượt Xúc Xắc Kim Cương.",
                en: "Buy the $0.99 pack daily (7 days = $6.93) alongside max daily Diamond Dice.",
              },
            },
            {
              stepNumber: "02",
              title: {
                vi: "Bổ Sung 2–3 Gói $4.99 Vào Ngày Có Sự Kiện Cộng Hưởng Nạp",
                en: "Add 2–3 Daily $4.99 Packs on Days with Top-Up Rebate Overlap",
              },
              detail: {
                vi: "Chỉ tốn thêm $9.98 – $14.97 là chạm chuẩn xác mốc 100 lượt tung Xúc Xắc.",
                en: "Adding just $9.98 – $14.97 cleanly bridges the gap to the exact 100-roll milestone.",
              },
            },
            {
              stepNumber: "03",
              title: {
                vi: "Đem Toàn Bộ Mảnh Tướng Thu Được Xả Vào Ngày 4 GAR",
                en: "Dump All Acquired Hero Shards on GAR Day 4",
              },
              detail: {
                vi: "Nhận thêm 9 rương cá nhân GAR nhân đôi hoàn toàn miễn phí.",
                en: "Claims 9 doubled GAR personal chests on top at zero extra cost.",
              },
            },
          ],
          conclusion: {
            vi: "Đạt mốc 100 lượt Xúc Xắc + Vũ Khí Độc Quyền chỉ với ~$16.91 – $21.90 (tiết kiệm hơn 60% chi phí so với gói $49.99)!",
            en: "Reaches the 100-roll Dice milestone + Exclusive Weapon for just ~$16.91 – $21.90 (saving over 60% compared to a $49.99 bundle)!",
          },
        },
      ],
    },
  ],
};

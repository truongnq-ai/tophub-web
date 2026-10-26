import type { GuideArticle } from "../../types";

export const ARTICLE_9_2_S0_GACHA_MYTHIC_BANNERS: GuideArticle = {
  code: "9.2",
  slug: "s0-gacha-mythic-banners",
  categorySlug: "event-playbooks",
  badge: "PRO",
  readingMinutes: 13,
  title: {
    vi: "Cẩm Nang 3 Sự Kiện Quay Tướng S0: Xúc Xắc Storm Maiden (Ngày 27), Vòng Quay May Mắn & Hero Gacha (Gacha & Mythic Banners)",
    en: "S0 Gacha & Mythic Banners Playbook: Day 27 Storm Maiden Treasure Dice, Lucky Wheel & Hero Gacha",
  },
  summary: {
    vi: "Chiến thuật tối ưu hóa Kim Cương và gói mồi $0.99 / $4.99 cho 3 sự kiện mở khóa tướng: Xúc Xắc Kho Báu (Desert Prince Ngày 21 & Storm Maiden Ngày 27), Vòng Quay May Mắn và Hero Gacha 3 tuần/lần.",
    en: "Diamond optimization and $0.99 / $4.99 pack-stacking strategy across the 3 hero acquisition banners: Treasure Dice (Day 21 Desert Prince & Day 27 Storm Maiden), Lucky Wheel, and the 3-week Hero Gacha.",
  },
  tldr: {
    coreRule: {
      vi: "Trong hệ thống 3 Banner xoay tua (Lucky Wheel ➔ Treasure Dice ➔ Hero Gacha), Xu Đổi Thưởng và Xúc Xắc/Vé luôn được bảo lưu sang kỳ sau, nhưng Thanh Đếm Mốc Tích Lũy (Roll/Spin Milestones) sẽ reset về 0 khi hết sự kiện — do đó chỉ xả khi đủ chạm mốc chẵn (30 / 60 / 100 lượt)!",
      en: "Across the 3 rotating banners (Lucky Wheel ➔ Treasure Dice ➔ Hero Gacha), Shop Coins and Dice/Tokens carry over to future runs, but the Cumulative Milestone Bar resets to zero when the event ends — only pull when you can hit exact milestones (30 / 60 / 100 rolls)!",
    },
    immediateAction: {
      vi: "Gom gói mồi `$0.99` mỗi ngày ở Xúc Xắc Storm Maiden (Ngày 27) kết hợp mua full Xúc Xắc Kim Cương để chạm mốc chẵn `30 / 60 / 100 lượt`, và để toàn bộ Xu Xúc Xắc / Xúc Xắc lẻ tự động bảo lưu sang kỳ sau.",
      en: "Stack the daily `$0.99` bait pack in Day 27 Storm Maiden Treasure Dice alongside max daily Diamond Dice to hit exact `30 / 60 / 100 roll` milestones, and let leftover Dice Coins / Dice carry over.",
    },
    strictTaboo: {
      vi: "Cấm quay Vòng Quay / Xúc Xắc của tướng lệch phe Đội 1, cấm tiêu Xu Xúc Xắc lẻ vào mảnh tướng Tím giờ chót, và cấm xả Vé Chiêu Mộ ở Hero Gacha trước Ngày 4 của GAR.",
      en: "Never pull on off-faction Wheel / Dice banners, never panic-spend leftover Dice Coins on Purple shards at closure, and never dump Recruit Tokens in Hero Gacha before GAR Day 4.",
    },
  },
  keyTakeaways: [
    {
      vi: "**Xúc Xắc Kho Báu (Treasure Dice — Ngày 21 Desert Prince & Ngày 27 Storm Maiden):** Mua full lượt Kim Cương mỗi ngày và canh dừng chính xác ở mốc 30, 60 hoặc 100 lượt tung.",
      en: "**Treasure Dice (Day 21 Desert Prince & Day 27 Storm Maiden):** Buy max daily Diamond rolls and stop strictly at the 30, 60, or 100 cumulative roll milestone.",
    },
    {
      vi: "**Vòng Quay May Mắn (Lucky Wheel):** Chỉ xả Kim Cương khi tướng trên bàn quay thuộc đúng Phe Chủ Lực (Đội 1), nhắm mốc 45, 70 hoặc 100 lượt để lấy Rương Vũ Khí Độc Quyền.",
      en: "**Lucky Wheel:** Spend Diamonds only when the featured hero belongs to your Main March faction, targeting 45, 70, or 100 spins for Exclusive Weapon Chests.",
    },
    {
      vi: "**Hero Gacha (Quay Quán Rượu Theo Chu Kỳ 3 Tuần):** Không tiêu Kim Cương mua vé giá gốc; chỉ tích trữ `200 – 300` Vé Chiêu Mộ miễn phí và xả trùng vào Ngày 4 GAR.",
      en: "**Hero Gacha (3-Week Tavern Summon Cycle):** Never buy full-price pulls with Diamonds; hoard `200 – 300` free Recruit Tokens and dump them on GAR Day 4.",
    },
    {
      vi: "**Kỷ luật Bảo Lưu Xu Đổi (Shop Currency Carryover):** Mọi đồng Xu Xúc Xắc và Xu Vòng Quay chưa dùng đều giữ nguyên sang đợt Wukong / Beastmaster ở các mùa sau.",
      en: "**Shop Currency Carryover Discipline:** Unused Dice Coins and Wheel Tokens remain in your inventory indefinitely for future Wukong / Beastmaster banners.",
    },
  ],
  keywords: [
    "Treasure Dice",
    "Storm Maiden",
    "Desert Prince",
    "Lucky Wheel",
    "Hero Gacha",
    "Dice Coins",
  ],
  sourceFiles: ["event-playbooks-data.ts"],
  freeSections: [
    {
      id: "sec-1-gacha-banners-interactive-console",
      title: {
        vi: "1. Bàn Điều Hành Chiến Thuật 3 Sự Kiện Gacha & Tướng Thần Thoại (Dice • Wheel • Gacha)",
        en: "1. Tactical Playbook Console: Treasure Dice, Lucky Wheel & Hero Gacha",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "Sử dụng **Bàn Điều Hành 4 Tab** dưới đây (mặc định mở sẵn **Xúc Xắc Kho Báu — Storm Maiden Ngày 27**) để tra cứu mốc dừng tối ưu, cách gom gói `$0.99 / $4.99` và bảng xếp hạng đổi Shop:",
            en: "Use the interactive **4-Tab Playbook Console** below (pre-selected to **Treasure Dice — Day 27 Storm Maiden**) to inspect optimal roll breakpoints, `$0.99 / $4.99` pack stacking, and shop tiers:",
          },
        },
        {
          type: "widget",
          widgetType: "event_playbook_explorer",
        },
        {
          type: "media_spotlight",
          mediaCode: "MED-9.2-01",
          tier: "tier2_annotated_ui",
          title: {
            vi: "Bộ Nhận Diện Cặp Đôi Thần Thoại Horde S0 (Storm Maiden & Desert Prince) & Vật Phẩm Gacha",
            en: "S0 Horde Mythic Duo (Storm Maiden & Desert Prince) & Core Gacha Currencies",
          },
          description: {
            vi: "Chân dung Storm Maiden (Ngày 27), Desert Prince (Ngày 21) cùng hệ thống Vé Chiêu Mộ, Vòng Quay, Xúc Xắc và Vũ Khí Độc Quyền.",
            en: "Portraits of Storm Maiden (Day 27) and Desert Prince (Day 21) alongside Recruit Tokens, Lucky Wheel, Treasure Dice, and Exclusive Weapons.",
          },
          annotations: [
            {
              kind: "do",
              label: {
                vi: "Gom Gói Ngày $0.99 Ngay Từ Ngày Đầu Mở Banner Storm Maiden (Ngày 27)",
                en: "Stack the $0.99 Daily Pack Starting Day 1 of Storm Maiden's Banner (Day 27)",
              },
              detail: {
                vi: "Gói $0.99 hàng ngày có tỷ lệ Xúc Xắc trên mỗi đô-la cao gấp 2.5 lần so với các gói nạp mệnh giá lớn.",
                en: "The $0.99 daily bundle delivers 2.5x more Dice per dollar than higher-priced direct top-up packs.",
              },
            },
            {
              kind: "info",
              label: {
                vi: "Tận Dụng Cơ Chế Bảo Lưu Xu Đổi Xuyên Kỳ (Carryover Shop Coins)",
                en: "Leverage Cross-Banner Shop Coin Carryover",
              },
              detail: {
                vi: "Sau khi đã đổi đủ xác Storm Maiden và Rương Vũ Khí Độc Quyền, hãy giữ nguyên số Xu Xúc Xắc còn dư cho kỳ sau.",
                en: "Once you redeem Storm Maiden and her Exclusive Weapon Chest, hold all remaining Dice Coins for the next banner.",
              },
            },
            {
              kind: "dont",
              label: {
                vi: "Cấm Dừng Ở Giữa Hai Mốc Thưởng Tích Lũy (Ví Dụ: 45 hoặc 85 Lượt)",
                en: "Never Stop Mid-Way Between Cumulative Milestones (e.g., 45 or 85 Rolls)",
              },
              detail: {
                vi: "Thanh đếm lượt tung tích lũy sẽ xóa về 0 khi kết thúc sự kiện; luôn tính toán để dừng đúng ở 30, 60 hoặc 100 lượt.",
                en: "The cumulative roll counter resets to zero when the banner ends; always budget to stop strictly at 30, 60, or 100 rolls.",
              },
            },
          ],
        },
      ],
      subSections: [
        {
          id: "sub-1-1-gacha-decision-tree-diagram",
          title: {
            vi: "1.1. Sơ Đồ Quyết Định Xả Hay Giữ Kim Cương Trong Chu Kỳ 3 Banner (Wheel • Dice • Gacha)",
            en: "1.1. Diamond Pull vs. Hold Decision Flowchart Across the 3-Banner Cycle",
          },
          badge: {
            vi: "Cây Quyết Định",
            en: "Decision Tree",
          },
          blocks: [
            {
              type: "visual_diagram",
              variant: "decision_flow",
              title: {
                vi: "Quy Trình 3 Bước Kiểm Định Trước Khi Xuống Tiền Ở Bất Kỳ Banner Nào",
                en: "3-Step Verification Protocol Before Spending Diamonds on Any Banner",
              },
              subtitle: {
                vi: "Bảo vệ quỹ Kim Cương của F2P và Low-Spender khỏi các banner mồi nhử lệch phe",
                en: "Protecting F2P and Low-Spender Diamond reserves from off-faction bait banners",
              },
              branches: [
                {
                  title: {
                    vi: "NHÁNH 1: XÚC XẮC KHO BÁU (DESERT PRINCE NGÀY 21 & STORM MAIDEN NGÀY 27)",
                    en: "BRANCH 1: TREASURE DICE (DAY 21 DESERT PRINCE & DAY 27 STORM MAIDEN)",
                  },
                  badge: {
                    vi: "Ưu Tiên Số 1",
                    en: "Priority #1",
                  },
                  tone: "emerald",
                  steps: [
                    {
                      id: "gacha-dt-1",
                      title: {
                        vi: "Mua Kịch Trần Xúc Xắc Bằng Kim Cương Mỗi Ngày + Gói Mồi $0.99",
                        en: "Buy Out Daily Diamond Dice Cap + $0.99 Daily Pack",
                      },
                      subtitle: {
                        vi: "Chốt mốc 30–60 lượt (F2P) hoặc 100 lượt (Low-Spender) để lấy xác tướng + Vũ Khí Độc Quyền",
                        en: "Lock in 30–60 rolls (F2P) or 100 rolls (Low-Spender) for base hero + Exclusive Weapon",
                      },
                      tone: "emerald",
                    },
                  ],
                  outcome: {
                    vi: "Sở hữu bộ đôi hạt nhân Horde ngay từ Tuần 4 S0 và giữ mảnh chờ Ngày 4 GAR.",
                    en: "Secures the core Horde duo by S0 Week 4 while banking shards for GAR Day 4.",
                  },
                },
                {
                  title: {
                    vi: "NHÁNH 2: VÒNG QUAY MAY MẮN (LUCKY WHEEL — KIỂM TRA PHE CHỦ LỰC)",
                    en: "BRANCH 2: LUCKY WHEEL (MAIN FACTION CHECK)",
                  },
                  badge: {
                    vi: "Có Điều Kiện",
                    en: "Conditional",
                  },
                  tone: "gold",
                  steps: [
                    {
                      id: "gacha-dt-2",
                      title: {
                        vi: "Nếu Đúng Tướng Đội 1: Quay Chạm Mốc 45/70 Lượt | Nếu Lệch Phe: Chỉ Quay Miễn Phí",
                        en: "If Queue 1 Hero: Spin to 45/70 Milestone | If Off-Faction: Free Spins Only",
                      },
                      subtitle: {
                        vi: "Không bao giờ tiêu quá 1,000 Kim Cương vào Vòng Quay của tướng phụ bạn không dùng lâu dài",
                        en: "Never spend Diamonds on a Wheel featuring a secondary hero outside your endgame lineup",
                      },
                      tone: "gold",
                    },
                  ],
                  outcome: {
                    vi: "Tiết kiệm 15,000–25,000 Kim Cương mỗi chu kỳ để dồn cho tướng Thần Thoại.",
                    en: "Saves 15,000–25,000 Diamonds per cycle to funnel into Mythic banners.",
                  },
                },
                {
                  title: {
                    vi: "NHÁNH 3: HERO GACHA (QUÁN RƯỢU — CHỈ DÙNG VÉ MIỄN PHÍ TRÙNG NGÀY 4 GAR)",
                    en: "BRANCH 3: HERO GACHA (TAVERN — FREE TOKENS ONLY ON GAR DAY 4)",
                  },
                  badge: {
                    vi: "Khớp Lệnh GAR",
                    en: "GAR Sync",
                  },
                  tone: "gold",
                  steps: [
                    {
                      id: "gacha-dt-3",
                      title: {
                        vi: "Tích 200+ Vé Chiêu Mộ & Đợi Đúng Thứ Năm (Ngày 4 GAR) Mới Xả Theo Mốc Chẵn",
                        en: "Hoard 200+ Recruit Tokens & Wait Until Thursday (GAR Day 4) to Dump at Exact Milestones",
                      },
                      subtitle: {
                        vi: "0 Kim Cương tiêu hao — 100% điểm số được tính đồng thời cho cả Hero Gacha và GAR",
                        en: "Zero Diamonds spent — 100% of pulls score simultaneously in both Hero Gacha and GAR",
                      },
                      tone: "gold",
                    },
                  ],
                  outcome: {
                    vi: "Ăn trọn rương mốc 200 lượt Gacha cộng thêm rương cá nhân x2 của Ngày 4 GAR.",
                    en: "Claims the 200-pull Gacha milestone chest plus doubled GAR Day 4 personal chests.",
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "sec-2-three-banners-carryover-comparison",
      title: {
        vi: "2. Bảng Đối Chiếu Luật Bảo Lưu & Mốc Dừng Tối Ưu Của 3 Sự Kiện Quay Tướng",
        en: "2. Carryover Laws & Optimal Milestone Breakpoints Across the 3 Gacha Banners",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "Hiểu rõ vật phẩm nào **được bảo lưu vĩnh viễn** và thanh tiến độ nào **bị xóa về 0** khi kết thúc sự kiện là chìa khóa giúp bạn không bao giờ lãng phí Kim Cương:",
            en: "Knowing exactly which currencies **carry over permanently** and which progress bars **reset to zero** at event closure ensures you never waste Diamonds:",
          },
        },
        {
          type: "callout",
          variant: "tip",
          title: {
            vi: "Mẹo Tính Nhẩm Trước Khi Tung Xúc Xắc Ở Ngày 27 Storm Maiden",
            en: "Quick Math Before Rolling Dice on Day 27 Storm Maiden",
          },
          content: {
            vi: "Trước khi bấm tung viên xúc xắc đầu tiên, hãy cộng tổng số Xúc Xắc từ nhiệm vụ miễn phí + số Xúc Xắc mua bằng Kim Cương trong 7 ngày + gói `$0.99`. Nếu tổng đạt `62 viên`, hãy tung đúng `60 viên` để lấy rương mốc `60` và cất `2 viên` còn lại sang kỳ sau!",
            en: "Before rolling your first die, sum your free quest Dice + 7-day Diamond Dice cap + `$0.99` packs. If your total reaches `62 Dice`, roll exactly `60 times` to claim the `60-roll` chest and save the remaining `2 Dice` for the next banner!",
          },
        },
      ],
      subSections: [
        {
          id: "sub-2-1-three-banners-carryover-table",
          title: {
            vi: "2.1. Bảng Ma Trận Bảo Lưu & Điểm Gãy Lợi Tức (ROI Breakpoints) Cho 3 Banner",
            en: "2.1. Carryover Matrix & ROI Breakpoints Across Treasure Dice, Lucky Wheel & Hero Gacha",
          },
          badge: {
            vi: "Luật Bảo Lưu",
            en: "Carryover Matrix",
          },
          blocks: [
            {
              type: "table",
              caption: {
                vi: "Đối chiếu cơ chế bảo lưu tiền tệ, mốc dừng tối ưu và vật phẩm ưu tiên số 1 trong cửa hàng của 3 sự kiện Gacha",
                en: "Comparison of currency carryover rules, optimal milestone stops, and #1 shop priorities across the 3 Gacha banners",
              },
              headers: [
                {
                  vi: "Tên Sự Kiện Banner",
                  en: "Banner Event Name",
                },
                {
                  vi: "Vật Phẩm Bảo Lưu vs. Phần Bị Reset Về 0",
                  en: "Carried Over Items vs. Reset Progress",
                },
                {
                  vi: "Mốc Dừng Tối Ưu & Mục Tiêu Đổi Shop Số 1",
                  en: "Optimal Stop Milestones & #1 Shop Target",
                },
              ],
              rows: [
                [
                  {
                    vi: "Xúc Xắc Kho Báu (Treasure Dice — Storm Maiden Ngày 27)",
                    en: "Treasure Dice (Day 27 Storm Maiden / Mythic Gala)",
                  },
                  {
                    vi: "BẢO LƯU: Xúc Xắc thường & Xu Đổi Cửa Hàng (Dice Coins). RESET: Thanh Mốc Lượt Tung Tích Lũy (30/60/100/150/300).",
                    en: "CARRIES OVER: Normal Dice & Shop Dice Coins. RESETS: Cumulative Roll Milestone Bar (30/60/100/150/300).",
                  },
                  {
                    vi: "Dừng đúng ở 30, 60 hoặc 100 lượt; đổi Mảnh Storm Maiden / Desert Prince & Rương Vũ Khí Độc Quyền.",
                    en: "Stop strictly at 30, 60, or 100 rolls; redeem Storm Maiden / Desert Prince Shards & Exclusive Weapon Chests.",
                  },
                ],
                [
                  {
                    vi: "Vòng Quay May Mắn (Lucky Wheel / Fortune Wheel)",
                    en: "Lucky Wheel (Fortune Wheel)",
                  },
                  {
                    vi: "BẢO LƯU: Xu Vòng Quay trong túi đồ. RESET: Thanh Mốc Bảo Hiểm Lượt Quay (10/25/45/70/100/150).",
                    en: "CARRIES OVER: Wheel Tokens in inventory. RESETS: Cumulative Spin Pity Counter (10/25/45/70/100/150).",
                  },
                  {
                    vi: "Dừng đúng ở 10 (nếu bỏ qua) hoặc 45 / 70 / 100 lượt (nếu đúng tướng Đội 1); lấy Rương Bảo Hiểm Mảnh Tướng & Vũ Khí.",
                    en: "Stop at 10 (if skipping) or 45 / 70 / 100 spins (if Queue 1 hero); claim guaranteed Hero & Weapon Pity Chests.",
                  },
                ],
                [
                  {
                    vi: "Gacha Anh Hùng (Hero Gacha — Chu Kỳ 3 Tuần)",
                    en: "Hero Gacha (3-Week Tavern Summon Cycle)",
                  },
                  {
                    vi: "BẢO LƯU: Vé Chiêu Mộ Anh Hùng (Recruit Tokens). RESET: Thanh Đếm Tổng Lượt Chiêu Mộ Trong Tuần (50/100/200/300).",
                    en: "CARRIES OVER: Hero Recruit Tokens. RESETS: Weekly Cumulative Summon Counter (50/100/200/300).",
                  },
                  {
                    vi: "Xả đúng mốc 100, 200 hoặc 300 vé vào Thứ Năm (Ngày 4 GAR); khóa Wishlist Phe Bộ Lạc (Horde).",
                    en: "Dump exact 100, 200, or 300 token blocks on Thursday (GAR Day 4); lock Horde Faction Wishlist.",
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: "sec-3-storm-maiden-day27-checklist",
      title: {
        vi: "3. Checklist Tác Chiến Ngày 27 (Ra Mắt Storm Maiden) ➔ Ngày 4 GAR",
        en: "3. Day 27 Storm Maiden Launch ➔ GAR Day 4 Execution Checklist",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "Thực hiện tuần tự 5 bước kiểm soát dưới đây ngay trong **Ngày 27 của Mùa S0** để vừa lấy được **Storm Maiden** với chi phí thấp nhất, vừa chuẩn bị kho đạn nổ điểm **Ngày 4 GAR**:",
            en: "Follow the 5 control steps below on **Season S0 Day 27** to unlock **Storm Maiden** at minimum cost while priming your shard stockpile for **GAR Day 4**:",
          },
        },
        {
          type: "checklist",
          checklistId: "s0-gacha-storm-maiden-readiness-v2",
          title: {
            vi: "Bảng Kiểm Tra 5 Bước Mở Khóa Storm Maiden (Ngày 27) & Bảo Toàn Điểm GAR",
            en: "5-Step Storm Maiden Unlock (Day 27) & GAR Point Preservation Checklist",
          },
          items: [
            {
              id: "chk-sm-1",
              label: {
                vi: "Đã chuẩn bị tối thiểu 15,000 – 25,000 Kim Cương trước 00:00 UTC (07:00 Giờ VN) Ngày 27 để mua full lượt Xúc Xắc Kim Cương mỗi ngày.",
                en: "Reserved at least 15,000 – 25,000 Diamonds before 00:00 UTC on Day 27 to buy out the daily Diamond Dice limit.",
              },
              detail: {
                vi: "Cung cấp nền tảng lượt tung cơ bản để chạm mốc 30 hoặc 60 lượt mà không cần nạp gói đắt tiền.",
                en: "Provides the baseline roll count to hit the 30 or 60 milestone without expensive top-up bundles.",
              },
            },
            {
              id: "chk-sm-2",
              label: {
                vi: "(Nếu là Low-Spender) Mua gói mồi $0.99 ngay trong Ngày 1 của sự kiện (Ngày 27 S0) thay vì đợi đến ngày cuối mới nạp gói lớn.",
                en: "(For Low-Spenders) Purchased the $0.99 daily pack starting Day 1 of the banner (S0 Day 27) instead of buying bulk packs on the final day.",
              },
              detail: {
                vi: "Gói $0.99 giới hạn 1 lần/ngày có hiệu suất Xúc Xắc trên mỗi USD cao gấp 3 lần gói lớn.",
                en: "The 1/day $0.99 pack yields 3x more Dice per dollar than bulk final-day packs.",
              },
            },
            {
              id: "chk-sm-3",
              label: {
                vi: "Sau khi đủ 10 mảnh Storm Maiden: Chỉ bấm Triệu Hồi (Unlock) xác tướng, tuyệt đối KHÔNG đụng vào Mảnh Vạn Năng Vàng trong suốt Ngày 27–30.",
                en: "Upon reaching 10 Storm Maiden shards: Only summoned the base hero copy, leaving Universal Legendary Shards 100% untouched across Days 27–30.",
              },
              detail: {
                vi: "Bảo toàn toàn bộ kho mảnh tướng cho Thứ Năm (Ngày 4 GAR).",
                en: "Preserves 100% of your shard stockpile for Thursday (GAR Day 4).",
              },
            },
            {
              id: "chk-sm-4",
              label: {
                vi: "Canh tổng số lượt tung Xúc Xắc dừng chính xác ở mốc chẵn (30, 60 hoặc 100 lượt) và để số Xúc Xắc/Xu lẻ tự động bảo lưu.",
                en: "Stopped rolling strictly at an exact milestone (30, 60, or 100 rolls) and allowed leftover Dice and Coins to carry over.",
              },
              detail: {
                vi: "Tránh lãng phí lượt tung lẻ khi thanh mốc tích lũy reset về 0 cuối sự kiện.",
                en: "Prevents wasting odd rolls when the cumulative milestone bar resets to zero at event end.",
              },
            },
            {
              id: "chk-sm-5",
              label: {
                vi: "Đợi đúng 02:00 UTC (09:00 Giờ VN) Thứ Năm (Ngày 4 GAR) mới xả toàn bộ Mảnh Storm Maiden + Mảnh Vạn Năng + Sách Kỹ Năng.",
                en: "Waited until 02:00 UTC on Thursday (GAR Day 4) to dump all Storm Maiden Shards + Universal Shards + Skill Books.",
              },
              detail: {
                vi: "Đẩy thẳng Storm Maiden lên 1★ Đỏ (mở Kỹ năng 5) đồng thời lấy trọn 9 rương cá nhân x2 của GAR.",
                en: "Pushes Storm Maiden straight to 1-Red Star (Skill 5 unlock) while sweeping all 9 doubled GAR chests.",
              },
            },
          ],
        },
      ],
    },
  ],
  proSections: [
    {
      id: "sec-4-pro-pack-stacking-math",
      isPro: true,
      title: {
        vi: "4. [PRO] Giải Phẫu Toán Học Gói Mồi $0.99 / $4.99 Trong Sự Kiện Xúc Xắc Storm Maiden",
        en: "4. [PRO] Mathematical Breakdown of $0.99 / $4.99 Pack Stacking in Storm Maiden Treasure Dice",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "Bảng phân tích dưới đây chứng minh vì sao việc rải mua gói `$0.99` (và `$4.99`) mỗi ngày từ Ngày 27 lại giúp người chơi Low-Spender đạt mốc `60 – 100 lượt` với chi phí chỉ bằng **1/3** so với người nạp gấp ngày cuối:",
            en: "The table below demonstrates why stacking the daily `$0.99` (and `$4.99`) packs starting Day 27 reaches the `60 – 100 roll` milestones at **one-third** the cost of final-day panic top-ups:",
          },
        },
      ],
      subSections: [
        {
          id: "sub-4-1-dice-pack-efficiency-table",
          title: {
            vi: "4.1. Bảng So Sánh Chi Phí Thực Tế Để Đạt Mốc 30 / 60 / 100 Lượt Tung Xúc Xắc",
            en: "4.1. True Cost Comparison to Reach 30 / 60 / 100 Treasure Dice Roll Milestones",
          },
          badge: {
            vi: "Toán Học Gói Nạp",
            en: "Pack ROI Math",
          },
          blocks: [
            {
              type: "table",
              caption: {
                vi: "Công thức phối hợp Nhiệm vụ miễn phí, Kim Cương và Gói mồi hàng ngày trong sự kiện Xúc Xắc 7 ngày",
                en: "Optimal combination of Free Quests, Diamonds, and Daily Bait Packs across a 7-day Treasure Dice banner",
              },
              headers: [
                {
                  vi: "Mốc Mục Tiêu",
                  en: "Target Milestone",
                },
                {
                  vi: "Công Thức Gom Lượt Rẻ Nhất (7 Ngày)",
                  en: "Lowest-Cost 7-Day Acquisition Formula",
                },
                {
                  vi: "Tổng Chi Phí & Phần Thưởng Chắc Chắn Nhận Được",
                  en: "Total Cost & Guaranteed Rewards Claimed",
                },
              ],
              rows: [
                [
                  {
                    vi: "Mốc 30 Lượt (Chuẩn F2P An Toàn)",
                    en: "30-Roll Milestone (Safe F2P Standard)",
                  },
                  {
                    vi: "Nhiệm vụ miễn phí 7 ngày + Mua Xúc Xắc bằng Kim Cương vừa đủ chạm đúng 30 lượt.",
                    en: "7 days of free quest Dice + Daily Diamond Dice purchases just enough to hit exactly 30 rolls.",
                  },
                  {
                    vi: "$0 (Chỉ tốn ~6,000–8,000 KC) ➔ Mở khóa chắc chắn xác tướng Storm Maiden / Desert Prince (10 Mảnh).",
                    en: "$0 (~6,000–8,000 Diamonds) ➔ Guaranteed base Storm Maiden / Desert Prince unlock (10 Shards).",
                  },
                ],
                [
                  {
                    vi: "Mốc 60 Lượt (F2P Tích Trữ Sâu / Micro-Spender)",
                    en: "60-Roll Milestone (Hoarded F2P / Micro-Spender)",
                  },
                  {
                    vi: "Nhiệm vụ miễn phí + Full Xúc Xắc Kim Cương 7 ngày + 5–7 gói $0.99 hàng ngày.",
                    en: "Free quest Dice + Max 7-day Diamond Dice + 5–7 daily $0.99 bait packs.",
                  },
                  {
                    vi: "~$4.95 – $6.93 + Kim Cương ➔ Xác tướng + Rương Mốc 30 & 60 + Lượng lớn Xu Đổi Mảnh/Vũ Khí.",
                    en: "~$4.95 – $6.93 + Diamonds ➔ Base Hero + 30 & 60 Milestone Chests + Massive Shop Coins.",
                  },
                ],
                [
                  {
                    vi: "Mốc 100 Lượt (Điểm Ngọt Low-Mid Spender)",
                    en: "100-Roll Milestone (Low-Mid Spender Sweet Spot)",
                  },
                  {
                    vi: "Full Xúc Xắc Kim Cương + 7 gói $0.99/ngày ($6.93) + 2–3 gói $4.99 ($9.98–$14.97) rải theo ngày.",
                    en: "Max Diamond Dice + 7x $0.99 daily packs ($6.93) + 2–3x $4.99 daily packs ($9.98–$14.97).",
                  },
                  {
                    vi: "~$16.91 – $21.90 ➔ Trọn bộ Rương Mốc 100 Lượt + Mở khóa Vũ Khí Độc Quyền + Đủ mảnh đẩy 1★ Đỏ ở Ngày 4 GAR!",
                    en: "~$16.91 – $21.90 ➔ Full 100-Roll Milestone Chests + Exclusive Weapon Unlock + Shards for 1-Red Star on GAR Day 4!",
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: "sec-5-pro-case-study-dice-coin-panic",
      isPro: true,
      title: {
        vi: "5. [PRO] Hồ Sơ Thực Chiến: Cứu Vãn Tài Khoản Định Đốt Sạch Xu Xúc Xắc Vào Giờ Chót",
        en: "5. [PRO] Tactical Case Study: Stopping Last-Minute Dice Coin Panic Spending",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "Tình huống kinh điển diễn ra vào tối ngày thứ 7 của sự kiện **Xúc Xắc Kho Báu** khi người chơi còn dư một lượng Xu Đổi (Dice Coins) lỡ cỡ:",
            en: "A classic scenario occurring on the final evening of **Treasure Dice** when a player holds an odd balance of leftover Shop Coins:",
          },
        },
        {
          type: "case_study",
          badge: {
            vi: "Bảo Lưu Xu Xúc Xắc",
            en: "Dice Coin Carryover",
          },
          title: {
            vi: "Ca Bệnh Điển Hình: Đổi Xu Xúc Xắc Lấy Mảnh Tím & Tài Nguyên Vì Sợ Hệ Thống Thu Hồi",
            en: "Case Study: Trading Leftover Dice Coins for Purple Shards Out of Expiry Fear",
          },
          profileSummary: {
            vi: "Sau khi chạm mốc 60 lượt tung và lấy được xác Storm Maiden, người chơi còn dư 45 Xu Xúc Xắc trong cửa hàng (không đủ mua thêm rương lớn) và còn 8 viên Xúc Xắc lẻ trong túi vào lúc 23:00 UTC (06:00 Giờ VN) ngày cuối.",
            en: "After hitting the 60-roll milestone and unlocking Storm Maiden, a player has 45 leftover Dice Shop Coins and 8 unused Dice in their bag at 23:00 UTC on the final day.",
          },
          diagnostics: [
            {
              vi: "Sợ hết giờ hệ thống xóa mất 45 Xu Xúc Xắc nên định bấm đổi hết sang Rương Gỗ/Thịt và Mảnh Tướng Tím.",
              en: "Afraid that the 45 Dice Coins will expire at reset, preparing to spend them all on Wood/Meat chests and Purple Hero Shards.",
            },
            {
              vi: "Định tung nốt 8 viên Xúc Xắc lẻ (nâng bộ đếm từ 60 lên 68 lượt) dù chắc chắn không thể chạm mốc 100 lượt.",
              en: "Planning to roll the remaining 8 odd Dice (pushing the counter from 60 to 68 rolls) despite having no way to reach 100 rolls.",
            },
          ],
          recoverySteps: [
            {
              stepNumber: "01",
              title: {
                vi: "Dừng Tung Xúc Xắc Ngay Tại Mốc Chẵn 60 Lượt",
                en: "Stop Rolling Strictly at the 60-Roll Milestone",
              },
              detail: {
                vi: "Dừng tung xúc xắc ngay tại con số 60. Giữ nguyên 8 viên Xúc Xắc trong túi đồ để kỳ Xúc Xắc tiếp theo có sẵn 8 lượt cộng vào mốc 30/60 mới.",
                en: "Stop rolling at exactly 60. Keep the 8 unused Dice in your bag so they count toward the 30/60 milestone on the next Dice banner.",
              },
            },
            {
              stepNumber: "02",
              title: {
                vi: "Bảo Lưu Nguyên Vẹn 45 Xu Xúc Xắc Trong Ví Sự Kiện",
                en: "Keep All 45 Leftover Dice Coins in Your Event Wallet",
              },
              detail: {
                vi: "Giữ nguyên 45 Xu Xúc Xắc trong ví sự kiện (không mua bất kỳ món rác Tier F nào); số xu này sẽ cộng dồn vào kỳ Xúc Xắc sau để đổi thẳng Rương Vũ Khí Độc Quyền hoặc Trang Trí Thần Thoại.",
                en: "Leave all 45 Dice Coins untouched in your event wallet (buying zero Tier F filler items); they will roll over to the next banner toward an Exclusive Weapon or Mythic Decoration.",
              },
            },
            {
              stepNumber: "03",
              title: {
                vi: "Chuyển Trọng Tâm Sang Chuẩn Bị Ngày 1 Của GAR",
                en: "Shift Focus to Preparing for GAR Day 1",
              },
              detail: {
                vi: "Chuyển toàn bộ sự tập trung sang chuẩn bị cho Ngày 1 của Đua Vũ Trang Bang Hội (GAR) mở vào 00:00 UTC (07:00 Giờ VN) sáng hôm sau.",
                en: "Shift full focus to preparing for Day 1 of Guild Arms Race (GAR) launching at 00:00 UTC the next morning.",
              },
            },
          ],
          conclusion: {
            vi: "Bảo toàn nguyên vẹn 100% giá trị của 45 Xu Xúc Xắc + 8 viên Xúc Xắc (tương đương ~4,000 Kim Cương) cho đợt tướng Thần Thoại tiếp theo!",
            en: "Preserves 100% of the value of 45 Dice Coins + 8 Dice (worth ~4,000 Diamonds) toward the next Mythic hero banner!",
          },
        },
      ],
    },
  ],
};

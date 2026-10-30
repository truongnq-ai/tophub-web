import type { GuideArticle } from "../../types";

export const ARTICLE_5_3_SHOP_AND_DROPS: GuideArticle = {
  code: "5.3",
  displayCode: "5.3",
  slug: "shop-and-drops",
  categorySlug: "event-playbooks",
  badge: "HOT",
  readingMinutes: 12,
  title: {
    vi: "Bảng 3 — Cửa hàng & Vật phẩm rơi (Drop Sources, Hidden Caps & Event Shop Priority)",
    en: "Table 3 — Event Shop & Item Drops (Drop Sources, Hidden Caps & Shop Priority Tiers)",
  },
  summary: {
    vi: "Nguồn rơi đạo cụ sự kiện, tỷ lệ rơi, trần giới hạn rơi ẩn trên bản đồ (activity_drop / form_list), cùng bảng toàn bộ mặt hàng trong Shop sự kiện (active_shop / turntable: Tên vật phẩm, Số lượng, Giá đổi, Giới hạn lượt mua, Xếp hạng ưu tiên mua).",
    en: "Event item drop sources, drop rates, hidden daily map drop caps (activity_drop / form_list), and full Event Shop catalogs (active_shop / turntable: Item name, Quantity, Exchange price, Purchase limit, Priority tier).",
  },
  tldr: {
    coreRule: {
      vi: "Mọi sự kiện thu thập trên bản đồ (`activity_drop` / `form_list`) đều có **Trần Rơi Ẩn Hàng Ngày (Hidden Daily Drop Cap)** cho từng nguồn (Đánh quái, Tập kết Boss, Thu thập mỏ), và mọi Cửa hàng Sự kiện (`active_shop` / `turntable`) đều phải mua theo thứ tự **Tier S (Độc quyền/Giới hạn) ➔ Tier A (Chiến lược) ➔ Cấm mua Tier F (Tài nguyên thô/Mảnh Tím)**.",
      en: "Every map-drop collection event (`activity_drop` / `form_list`) enforces a **Hidden Daily Drop Cap** per source (World Monsters, Boss Rallies, Resource Tiles), and every Event Shop (`active_shop` / `turntable`) must be redeemed strictly in **Tier S (Exclusive/Capped) ➔ Tier A (Strategic) ➔ Skip Tier F (Raw Resources/Purple Shards)** order.",
    },
    immediateAction: {
      vi: "Cày chạm trần rơi đạo cụ bản đồ mỗi ngày trước `23:59 UTC` (`06:59 Giờ VN`), giữ sàn `6,000 Điểm Vinh Dự Bang` mua **Đá Linh Hồn Đỏ (Red Soul Stone)**, và chỉ tiêu Xu Xúc Xắc / Vòng Quay vào **Mảnh Tướng Thần Thoại**, **Rương Vũ Khí Độc Quyền** và **Rương Trang Trí Thần Thoại**.",
      en: "Farm map drops up to the daily cap before `23:59 UTC` each day, lock the `6,000 Guild Honor` floor for the weekly **Red Soul Stone**, and spend Dice / Wheel Coins exclusively on **Mythic Hero Shards**, **Exclusive Weapon Chests**, and **Mythic Decoration Chests**.",
    },
    strictTaboo: {
      vi: "Tuyệt đối KHÔNG đốt Bình Thể Lực đánh quái sau khi đã chạm trần rơi đạo cụ trong ngày và KHÔNG đổi Xu sự kiện lấy Gỗ, Thịt, Đá hoặc Mảnh Tướng Tím khi chưa mua hết vật phẩm Tier S.",
      en: "NEVER burn Stamina Potions farming monsters after hitting the daily item drop cap, and NEVER trade event tokens for Wood, Meat, Stone, or Purple Shards while Tier S items remain.",
    },
  },
  keyTakeaways: [
    {
      vi: "**Trần Rơi Ẩn Trên Bản Đồ (`activity_drop` / `form_list`):** Khi đánh quái liên tiếp 5–8 trận không còn rơi túi đạo cụ sự kiện, tức là bạn đã chạm trần ngày của nguồn đó — hãy dừng tiêu Thể Lực ngay.",
      en: "**Hidden Daily Map Drop Caps (`activity_drop` / `form_list`):** When 5–8 consecutive monster kills yield zero event bags, you have hit that source's daily cap — stop spending Stamina immediately.",
    },
    {
      vi: "**Vật Phẩm Tier S Bắt Buộc Mua (`active_shop`):** Đá Linh Hồn Đỏ (`6,000 Vinh Dự Bang`), Mảnh Tướng Đỏ (`Storm Maiden / Desert Prince`), Rương Vũ Khí Độc Quyền và Rương Trang Trí Thần Thoại.",
      en: "**Mandatory Tier S Shop Targets (`active_shop`):** Red Soul Stones (`6,000 Guild Honor`), Mythic Hero Shards (`Storm Maiden / Desert Prince`), Exclusive Weapon Chests, and Mythic Decoration Chests.",
    },
    {
      vi: "**Vật Phẩm Tier A Mua Khi Dư Xu:** Mảnh Anh Hùng Huyền Thoại Vạn Năng (`Universal Shards`), Orichalcum và Tinh Hoa Rồng (`Dragon Essence`).",
      en: "**Tier A Secondary Targets:** Universal Legendary Hero Shards, Orichalcum, and Dragon Essence.",
    },
    {
      vi: "**Bẫy Đổi Thưởng Tier F:** Mảnh Tướng Tím, Đá Cường Hóa lẻ và Rương Tài Nguyên giá gốc có hiệu suất ROI thấp hơn 70% so với vật phẩm Tier S.",
      en: "**Tier F Shop Traps:** Purple Hero Shards, loose Enhancement Ore, and full-price Resource Chests yield over 70% lower ROI than Tier S items.",
    },
  ],
  keywords: [
    "activity_drop",
    "form_list",
    "active_shop",
    "turntable",
    "Cửa hàng sự kiện",
    "Vật phẩm rơi",
  ],
  sourceFiles: ["event-playbooks-data.ts"],
  freeSections: [
    {
      id: "sec-1-shop-drops-console",
      title: {
        vi: "1. Bảng 3 — Tra Cứu Nguồn Rơi Vật Phẩm, Trần Rơi Ẩn & Xếp Hạng Shop Sự Kiện",
        en: "1. Table 3 — Drop Sources, Hidden Caps & Event Shop Priority Explorer",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "Chọn sự kiện bất kỳ dưới đây để xem chi tiết **Bảng 3 — Cửa hàng & Vật phẩm rơi** (`activity_drop` / `form_list` và toàn bộ danh mục `active_shop` / `turntable`):",
            en: "Select any event below to inspect **Table 3 — Event Shop & Item Drops** (`activity_drop` / `form_list` and the complete `active_shop` / `turntable` catalog):",
          },
        },
        {
          type: "widget",
          widgetType: "event_playbook_explorer",
        },
        {
          type: "media_spotlight",
          mediaCode: "MED-5.3-01",
          tier: "tier2_annotated_ui",
          title: {
            vi: "Hệ Thống Rơi Đạo Cụ Bản Đồ & Thứ Tự Ưu Tiên Đổi Cửa Hàng Sự Kiện (Tier S ➔ F)",
            en: "Map Drop Mechanics & Event Shop Redemption Priority Hierarchy (Tier S ➔ F)",
          },
          description: {
            vi: "Cách kiểm soát trần rơi đạo cụ hàng ngày trên bản đồ thế giới và danh mục các vật phẩm Tier S bắt buộc ưu tiên trong Shop sự kiện.",
            en: "Controlling daily world-map drop caps and prioritizing Tier S items across all event exchange shops.",
          },
          annotations: [
            {
              kind: "do",
              label: {
                vi: "Cày Đủ Trần Rơi Đạo Cụ Từ Cả 3 Nguồn (Quái Đơn • Boss Rally • Mỏ Tài Nguyên)",
                en: "Cap Daily Drops Across All 3 Sources (Monsters • Boss Rallies • Resource Tiles)",
              },
              detail: {
                vi: "Mỗi nguồn hoạt động có hạn mức rơi đạo cụ riêng biệt mỗi ngày trước khi chạm trần ẩn lúc 23:59 UTC (06:59 Giờ VN).",
                en: "Each activity source maintains an independent daily drop quota before resetting at 00:00 UTC.",
              },
            },
            {
              kind: "info",
              label: {
                vi: "Ưu Tiên Số 1: Đá Linh Hồn Đỏ, Mảnh Tướng Thần Thoại & Trang Trí Đỏ",
                en: "Priority #1: Red Soul Stones, Mythic Hero Shards & Mythic Decorations",
              },
              detail: {
                vi: "Đây là những vật phẩm cộng chỉ số vĩnh viễn không thể cày chay từ bản đồ thông thường.",
                en: "These items grant permanent stat multipliers that cannot be farmed from normal world map stages.",
              },
            },
            {
              kind: "dont",
              label: {
                vi: "Cấm Đốt Bình Thể Lực Khi Đã Chạm Trần Rơi Đạo Cụ Trong Ngày",
                en: "Never Burn Stamina Potions After Hitting the Daily Drop Cap",
              },
              detail: {
                vi: "Giữ toàn bộ Bình Thể Lực trong kho để xả vào Ngày 3 của Đua Vũ Trang Bang Hội (GAR).",
                en: "Save 100% of Stamina Potions in your bag to dump on Day 3 of Guild Arms Race (GAR).",
              },
            },
          ],
        },
      ],
      subSections: [
        {
          id: "sub-1-1-shop-drops-diagram",
          title: {
            vi: "1.1. Sơ Đồ Kiểm Soát Trần Rơi Đạo Cụ (activity_drop) & Phân Tầng Mua Sắm (active_shop)",
            en: "1.1. Drop Cap Control (activity_drop) & Shop Tier Allocation Flowchart (active_shop)",
          },
          badge: {
            vi: "Drop & Shop",
            en: "Drop & Shop",
          },
          blocks: [
            {
              type: "visual_diagram",
              variant: "decision_flow",
              title: {
                vi: "Luồng Cày Đạo Cụ Rơi Trên Bản Đồ & Thứ Tự Đổi Thưởng Cửa Hàng",
                en: "Map Drop Farming Loop & Shop Redemption Priority Hierarchy",
              },
              subtitle: {
                vi: "Tối đa hóa số lượng xu sự kiện thu thập miễn phí và đổi đúng vật phẩm lõi",
                en: "Maximizing free daily event token drops and redeeming only high-impact items",
              },
              branches: [
                {
                  title: {
                    vi: "NHÁNH 1: CÀY CHẠM TRẦN RƠI ĐẠO CỤ BẢN ĐỒ HÀNG NGÀY (ACTIVITY_DROP)",
                    en: "BRANCH 1: CAP DAILY MAP ITEM DROPS (ACTIVITY_DROP)",
                  },
                  badge: {
                    vi: "3 Nguồn Rơi",
                    en: "3 Drop Sources",
                  },
                  tone: "emerald",
                  steps: [
                    {
                      id: "sd-1",
                      title: {
                        vi: "Đánh Quái Thế Giới (30–40 Túi) + Auto-Join Boss (15–20 Túi) + Thu Hoạch Mỏ",
                        en: "World Monsters (30–40 Bags) + Auto-Join Bosses (15–20 Bags) + Tile Gathering",
                      },
                      subtitle: {
                        vi: "Dùng Thể Lực tự hồi + 50 lượt Auto-Join miễn phí; dừng ngay khi 5 trận liền không rơi",
                        en: "Use natural Stamina + 50 free Auto-Joins; stop as soon as 5 consecutive runs drop nothing",
                      },
                      tone: "emerald",
                    },
                  ],
                  outcome: {
                    vi: "Thu thập kịch trần 60–80 đạo cụ sự kiện mỗi ngày hoàn toàn miễn phí.",
                    en: "Collects the full 60–80 daily event tokens completely free-to-play.",
                  },
                },
                {
                  title: {
                    vi: "NHÁNH 2: ĐỔI SHOP THEO THỨ TỰ TIER S ➔ TIER A (ACTIVE_SHOP)",
                    en: "BRANCH 2: REDEEM SHOP ITEMS IN TIER S ➔ TIER A ORDER (ACTIVE_SHOP)",
                  },
                  badge: {
                    vi: "Ưu Tiên Tier S",
                    en: "Tier S Priority",
                  },
                  tone: "gold",
                  steps: [
                    {
                      id: "sd-2",
                      title: {
                        vi: "Mua Hết Giới Hạn Tier S Trước (Đá Linh Hồn • Tướng Đỏ • Vũ Khí • Trang Trí)",
                        en: "Buy Out Tier S Caps First (Soul Stone • Mythic Hero • Weapon • Mythic Decor)",
                      },
                      subtitle: {
                        vi: "Số dư còn lại chuyển sang Mảnh Vạn Năng / Orichalcum (hoặc bảo lưu nếu là Xu Xúc Xắc)",
                        en: "Spend remainder on Universal Shards / Orichalcum (or carry over if Dice/Wheel Coins)",
                      },
                      tone: "gold",
                    },
                  ],
                  outcome: {
                    vi: "Tối đa hóa chỉ số vĩnh viễn cho Đội hình 1 mà không lãng phí 1 đồng xu sự kiện.",
                    en: "Maximizes permanent Queue 1 stats with zero wasted event currency.",
                  },
                },
              ],
            },
          ],
        },
        {
          id: "sub-1-2-shop-priority-table",
          title: {
            vi: "1.2. Bảng Xếp Hạng Ưu Tiên Mua Sắm Chuẩn Tại Các Cửa Hàng Sự Kiện (active_shop)",
            en: "1.2. Master Event Shop Redemption Priority Table (active_shop)",
          },
          badge: {
            vi: "Bảng 3 Shop",
            en: "Table 3 Shop",
          },
          blocks: [
            {
              type: "table",
              caption: {
                vi: "Danh mục mặt hàng trọng tâm, giới hạn lượt mua và xếp hạng ưu tiên (Tier S / A / F)",
                en: "Core shop items, purchase limits, and priority ratings (Tier S / A / F)",
              },
              headers: [
                { vi: "Cửa Hàng & Tên Vật Phẩm", en: "Event Shop & Item Name" },
                { vi: "Giá Đổi & Giới Hạn Mua", en: "Exchange Cost & Purchase Limit" },
                { vi: "Xếp Hạng & Khuyến Nghị", en: "Priority Tier & Verdict" },
              ],
              rows: [
                [
                  { vi: "Tiệm Bang Hội (Guild Honor): Đá Linh Hồn Đỏ (Red Soul Stone)", en: "Guild Honor Shop: Red Soul Stone" },
                  { vi: "6,000 Điểm Vinh Dự Bang • Giới hạn 1 viên/tuần", en: "6,000 Guild Honor • Limit 1/week" },
                  { vi: "TIER S (Bắt buộc số 1): Giữ sàn 6,000 điểm mua ngay mỗi sáng Thứ Hai 00:00 UTC (07:00 Giờ VN).", en: "TIER S (#1 Mandatory): Maintain 6,000 Honor floor to buy every Monday at 00:00 UTC." },
                ],
                [
                  { vi: "Tiệm Xúc Xắc / Vòng Quay: Mảnh Storm Maiden / Desert Prince & Vũ Khí Độc Quyền", en: "Dice / Wheel Shop: Storm Maiden / Desert Prince Shards & Exclusive Weapon" },
                  { vi: "Đổi bằng Xu Xúc Xắc / Xu Vòng Quay • Bảo lưu xu dư", en: "Redeemed via Dice / Wheel Coins • Leftover coins carry over" },
                  { vi: "TIER S (Bắt buộc): Chỉ đổi tướng và vũ khí thuộc đúng Phe Đội 1.", en: "TIER S (Mandatory): Redeem only heroes and weapons matching Queue 1 faction." },
                ],
                [
                  { vi: "Tiệm Lễ Hội Bắt Bướm: Rương Trang Trí Thần Thoại & Mảnh Vạn Năng", en: "Butterfly Festival Shop: Mythic Decoration Chest & Universal Shards" },
                  { vi: "Giới hạn 1–2 Rương Trang Trí + 5–10 Mảnh Vạn Năng/kỳ", en: "Limit 1–2 Mythic Decor Chests + 5–10 Universal Shards/cycle" },
                  { vi: "TIER S: Đổi sạch trước 23:59 UTC (06:59 Giờ VN) ngày cuối vì xu sẽ hết hạn.", en: "TIER S: Redeem before 23:59 UTC on the final day since tokens expire." },
                ],
              ],
            },
          ],
        },
        {
          id: "sub-1-3-shop-drops-checklist",
          title: {
            vi: "1.3. Checklist Kiểm Soát Rơi Vật Phẩm & Đổi Shop Sự Kiện",
            en: "1.3. Item Drop & Event Shop Redemption Checklist",
          },
          blocks: [
            {
              type: "checklist",
              checklistId: "event-5-3-shop-drops-v1",
              title: {
                vi: "5 Bước Cày Đạo Cụ Rơi & Đổi Cửa Hàng Chuẩn Xác",
                en: "5-Step Drop Farming & Shop Redemption Checklist",
              },
              items: [
                {
                  id: "chk-53-1",
                  label: {
                    vi: "Đã bật Auto-Join Rally 50 lượt/ngày để gom đủ đạo cụ rơi từ Boss mà không tốn Thể Lực.",
                    en: "Enabled 50x daily Auto-Join Rally to cap Boss event drops at zero Stamina cost.",
                  },
                  detail: {
                    vi: "Tận dụng tối đa trần rơi đạo cụ từ nguồn Tập kết.",
                    en: "Maximizes daily drop quota from the Boss Rally source.",
                  },
                },
                {
                  id: "chk-53-2",
                  label: {
                    vi: "Đã dừng đánh quái lẻ ngay khi phát hiện 5–8 trận liên tiếp không còn rơi túi sự kiện (chạm trần ẩn).",
                    en: "Stopped solo monster hunting immediately once 5–8 consecutive kills dropped zero event bags.",
                  },
                  detail: {
                    vi: "Bảo toàn Bình Thể Lực cho Ngày 3 của GAR.",
                    en: "Preserves Stamina Potions for GAR Day 3.",
                  },
                },
                {
                  id: "chk-53-3",
                  label: {
                    vi: "Đã khóa cứng sàn 6,000 Điểm Vinh Dự Bang để mua Đá Linh Hồn Đỏ vào sáng Thứ Hai 00:00 UTC (07:00 Giờ VN).",
                    en: "Locked the 6,000 Guild Honor safety floor to purchase the Red Soul Stone at Monday 00:00 UTC.",
                  },
                  detail: {
                    vi: "Không bao giờ để thiếu điểm khi cửa hàng Bang làm mới.",
                    en: "Never miss a weekly Soul Stone reset.",
                  },
                },
                {
                  id: "chk-53-4",
                  label: {
                    vi: "Đã mua hết giới hạn vật phẩm Tier S (Trang Trí Đỏ, Mảnh Vạn Năng, Orichalcum) trước khi nhìn sang món khác.",
                    en: "Bought out all Tier S limits (Mythic Decor, Universal Shards, Orichalcum) before considering lower tiers.",
                  },
                  detail: {
                    vi: "Đảm bảo hiệu suất ROI cao nhất trên mỗi đồng xu sự kiện.",
                    en: "Guarantees maximum ROI per event token.",
                  },
                },
                {
                  id: "chk-53-5",
                  label: {
                    vi: "Không mua bất kỳ vật phẩm Tier F nào (Mảnh Tím, Gỗ/Thịt) bằng Xu Xúc Xắc hoặc Xu Vòng Quay được phép bảo lưu.",
                    en: "Bought zero Tier F filler items (Purple Shards, Wood/Meat) using permanent Dice or Wheel Coins.",
                  },
                  detail: {
                    vi: "Giữ toàn bộ xu dư cho kỳ Banner kế tiếp.",
                    en: "Preserves 100% of leftover coins for the next banner.",
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
      id: "sec-2-pro-hidden-drop-caps",
      isPro: true,
      title: {
        vi: "2. [PRO] Bảng Giải Mã Trần Rơi Ẩn Trên Bản Đồ (activity_drop / form_list)",
        en: "2. [PRO] Hidden Daily Map Drop Caps Breakdown (activity_drop / form_list)",
      },
      blocks: [
        {
          type: "table",
          caption: {
            vi: "Trần giới hạn rơi ẩn mỗi ngày theo từng nguồn hoạt động trong sự kiện thu thập",
            en: "Hidden daily drop caps by activity source during map collection events",
          },
          headers: [
            { vi: "Nguồn Rơi Trên Bản Đồ (form_list)", en: "Map Drop Source (form_list)" },
            { vi: "Tỷ Lệ Rơi & Trần Giới Hạn Ẩn/Ngày", en: "Drop Rate & Hidden Daily Cap" },
            { vi: "Chiến Thuật Cày Tối Ưu", en: "Optimal Farming Tactic" },
          ],
          rows: [
            [
              { vi: "Tiêu diệt Quái Thế Giới (World Map Monsters)", en: "World Map Monsters" },
              { vi: "~70%–85% giai đoạn đầu ➔ Giảm về 0% sau ~30–40 túi/ngày", en: "~70%–85% early ➔ Drops to 0% after ~30–40 bags/day" },
              { vi: "Chỉ dùng Thể Lực tự nhiên theo ngày; dừng ngay khi 5 trận liền không rơi.", en: "Use natural daily Stamina only; stop once 5 consecutive kills yield 0 drops." },
            ],
            [
              { vi: "Tập Kết Boss Cự Ma (Boss Rallies)", en: "Boss Rallies (Giant Troll)" },
              { vi: "100% ở các lượt đầu ➔ Trần ~15–20 túi/ngày", en: "100% on initial runs ➔ Caps at ~15–20 bags/day" },
              { vi: "Bật Auto-Join Rally 50 lượt/ngày để ăn trọn trần này với 0 Thể Lực.", en: "Enable 50x Auto-Join Rally daily to cap this source at 0 Stamina cost." },
            ],
          ],
        },
        {
          type: "case_study",
          badge: {
            vi: "Bẫy Trần Rơi Ẩn",
            en: "Hidden Cap Trap",
          },
          title: {
            vi: "Ca Bệnh Điển Hình: Đốt 35 Bình Thể Lực Trong Ngày 1 Bắt Bướm Dù Đã Chạm Trần Rơi",
            en: "Case Study: Burning 35 Stamina Potions on Butterfly Day 1 Past the Hidden Drop Cap",
          },
          profileSummary: {
            vi: "Người chơi muốn gom đủ Vợt Bắt Bướm ngay trong Ngày 1 nên uống liền 35 Bình Thể Lực đi săn quái liên tục.",
            en: "Eager to finish the Butterfly shop on Day 1, a player drinks 35 Stamina Potions to hunt monsters non-stop.",
          },
          diagnostics: [
            {
              vi: "Sau 35 túi Vợt đầu tiên, 25 Bình Thể Lực tiếp theo không rơi thêm bất kỳ chiếc Vợt nào vì đã chạm trần ẩn.",
              en: "After the first 35 Net bags, the next 25 Stamina Potions yielded zero Nets due to the hidden daily drop cap.",
            },
            {
              vi: "Đến Ngày 3 của GAR (Thứ Tư — Diệt Quái), người chơi cạn sạch Bình Thể Lực để mở 9 rương x2.",
              en: "When GAR Day 3 (Wednesday — Monster Hunt) arrived, zero Stamina Potions remained to unlock the 9 doubled chests.",
            },
          ],
          recoverySteps: [
            {
              stepNumber: "01",
              title: {
                vi: "Chỉ Dùng Thể Lực Tự Hồi Hàng Ngày Cho Sự Kiện Bắt Bướm",
                en: "Use Only Natural Daily Stamina Recovery for Butterfly Catching",
              },
              detail: {
                vi: "Lượng Thể Lực tự hồi mỗi 24 giờ kết hợp 50 lượt Auto-Join đã dư sức chạm 100% trần rơi hàng ngày.",
                en: "Natural 24-hour Stamina regeneration plus 50 free Auto-Joins easily caps 100% of daily map drops.",
              },
            },
            {
              stepNumber: "02",
              title: {
                vi: "Khóa 100% Bình Thể Lực Trong Túi Chờ Ngày 3 GAR",
                en: "Lock 100% of Stamina Potions in Your Bag Until GAR Day 3",
              },
              detail: {
                vi: "Chỉ uống Bình Thể Lực vào Thứ Tư của tuần GAR để vừa ăn điểm GAR x2 vừa ăn đạo cụ rơi.",
                en: "Drink Stamina Potions exclusively on GAR Wednesday to double-dip GAR 2x chests and map drops.",
              },
            },
            {
              stepNumber: "03",
              title: {
                vi: "Đổi Hết Xu Lấy Trang Trí Thần Thoại Trước 23:59 UTC (06:59 Giờ VN) Ngày Cuối",
                en: "Redeem All Tokens for Mythic Decor Before 23:59 UTC on the Final Day",
              },
              detail: {
                vi: "Gom đủ 5–7 ngày rơi tự nhiên là mua sạch các mốc Tier S trong cửa hàng.",
                en: "5–7 days of natural cap farming is sufficient to buy out every Tier S item in the shop.",
              },
            },
          ],
          conclusion: {
            vi: "Lấy trọn bộ Trang Trí Thần Thoại + Mảnh Vạn Năng đồng thời bảo toàn 35 Bình Thể Lực cho tuần GAR!",
            en: "Claims all Mythic Decor + Universal Shards while preserving 35 Stamina Potions for GAR week!",
          },
        },
      ],
    },
  ],
};

import type { GuideArticle } from "../../types";

export const ARTICLE_5_2_TASKS_AND_MILESTONES: GuideArticle = {
  code: "5.2",
  displayCode: "5.2",
  slug: "tasks-and-milestones",
  categorySlug: "event-playbooks",
  badge: "HOT",
  readingMinutes: 11,
  title: {
    vi: "Bảng 2 — Nhiệm vụ & Mốc điểm (Daily/Cumulative Tasks & Free vs VIP Milestones)",
    en: "Table 2 — Tasks & Milestone Rewards (Daily/Cumulative Tasks & Free vs VIP Tiers)",
  },
  summary: {
    vi: "Danh sách đầy đủ nhiệm vụ Hàng ngày & Tích lũy cả kỳ (activity_task_target), điểm số từng nhiệm vụ, cùng bảng mốc điểm mở rương / cấp Thẻ Thông Hành (activity_point_mission — đối chiếu cột Free vs VIP) cho 10 sự kiện.",
    en: "Complete list of Daily and Cumulative tasks (activity_task_target), exact point values per action, and milestone chest / Battle Pass progression tables (activity_point_mission — Free vs VIP comparison) across all 10 events.",
  },
  tldr: {
    coreRule: {
      vi: "Mỗi sự kiện gồm 2 bảng dữ liệu gắn liền nhau: **Bảng Nhiệm Vụ (`activity_task_target`)** quy định tỷ lệ quy đổi hành động ra điểm số, và **Bảng Mốc Thưởng (`activity_point_mission`)** quy định ngưỡng điểm mở Rương Miễn Phí (`Free`) đối chiếu với Nhánh Đặc Quyền (`VIP Pass` / `Double Rewards`).",
      en: "Every event pairs two core datasets: the **Task Target Table (`activity_task_target`)** defining point conversion rates per action, and the **Milestone Mission Table (`activity_point_mission`)** mapping point thresholds to `Free` chests versus `VIP Pass` / `Double Rewards` bonus tiers.",
    },
    immediateAction: {
      vi: "Trước khi xả nguyên liệu vào lúc `02:00 UTC` (`09:00 Giờ VN`), hãy đối chiếu cột Điểm Mốc Rương cuối cùng (`Rương 9 GAR` hoặc `Cấp 30 Pass`) để tính chính xác số lượng nguyên liệu cần tiêu — chạm đúng mốc thưởng là dừng ngay!",
      en: "Before dumping materials at `02:00 UTC`, check the final Milestone Chest threshold (`GAR Chest 9` or `Pass Tier 30`) to calculate the exact material amount required — stop immediately once the target chest unlocks!",
    },
    strictTaboo: {
      vi: "Tuyệt đối KHÔNG xả vượt ngưỡng Rương 9 cá nhân khi không nhắm tranh Top 10 BXH và KHÔNG bỏ lỡ nhánh công nghệ `Double Rewards` nhân đôi (`x2`) cột thưởng GAR.",
      en: "NEVER overspend past Personal Chest 9 unless contesting Top 10 leaderboard ranks, and NEVER skip the `Double Rewards` tech node that doubles (`2x`) your GAR milestone payouts.",
    },
  },
  keyTakeaways: [
    {
      vi: "**Nhiệm Vụ Hàng Ngày vs. Tích Lũy (`activity_task_target`):** Nhiệm vụ Hàng ngày reset lúc `00:00 UTC` (`07:00 Giờ VN`), trong khi Nhiệm vụ Tích lũy cộng dồn suốt 6–7 ngày sự kiện.",
      en: "**Daily vs. Cumulative Tasks (`activity_task_target`):** Daily tasks reset at `00:00 UTC`, whereas Cumulative tasks stack across the entire 6–7 day event duration.",
    },
    {
      vi: "**Đối Chiếu Cột Free vs. VIP (`activity_point_mission`):** Trong GAR, cột VIP tương ứng với khi đã nâng công nghệ `Double Rewards` (nhận `x2` cả 9 rương hoàn toàn miễn phí bằng Khoa kỹ).",
      en: "**Free vs. VIP Column Comparison (`activity_point_mission`):** In GAR, the doubled VIP column is unlocked free-to-play by researching the `Double Rewards` tech node (`2x` on all 9 chests).",
    },
    {
      vi: "**Thẻ Thông Hành Sự Kiện (`$4.99 Battle Pass`):** Trong Tập Kích Cự Ma và Lễ Hội Bắt Bướm, nhánh VIP Pass `$4.99` mở khóa lượng lớn Orichalcum và Mảnh Vạn Năng ở Cấp 15–30.",
      en: "**Event Battle Pass (`$4.99 VIP Track`):** In Giant Troll Raid and Butterfly Catching, the `$4.99` VIP track unlocks massive Orichalcum and Universal Shards across Tiers 15–30.",
    },
    {
      vi: "**Kỷ Luật Chạm Mốc Chẵn:** Luôn dừng đúng tại điểm gãy rương mốc (`Chest 3/6/9` hoặc `30/60/100 lượt`), giữ phần nguyên liệu dư cho chu kỳ kế tiếp.",
      en: "**Exact Milestone Stop Discipline:** Always stop at exact milestone chest breakpoints (`Chest 3/6/9` or `30/60/100 rolls`), banking surplus materials for the next cycle.",
    },
  ],
  keywords: [
    "activity_task_target",
    "activity_point_mission",
    "Nhiệm vụ",
    "Mốc điểm",
    "Free vs VIP",
  ],
  sourceFiles: ["event-playbooks-data.ts"],
  freeSections: [
    {
      id: "sec-1-tasks-milestones-console",
      title: {
        vi: "1. Bảng 2 — Tra Cứu Nhiệm Vụ Tính Điểm & Mốc Rương (Free vs VIP) Từng Sự Kiện",
        en: "1. Table 2 — Scoring Tasks & Milestone Chests (Free vs VIP) Explorer",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "Sử dụng bộ chọn sự kiện bên dưới để xem chi tiết **Bảng 2 — Nhiệm vụ & Mốc điểm** (`activity_task_target` & `activity_point_mission` đối chiếu cột Free vs VIP):",
            en: "Use the event selector below to inspect **Table 2 — Tasks & Milestones** (`activity_task_target` & `activity_point_mission` with Free vs VIP columns):",
          },
        },
        {
          type: "widget",
          widgetType: "event_playbook_explorer",
        },
        {
          type: "media_spotlight",
          mediaCode: "MED-5.2-01",
          tier: "tier2_annotated_ui",
          title: {
            vi: "Cấu Trúc Bảng Nhiệm Vụ & Đối Chiếu Mốc Rương Free vs. VIP / Double Rewards",
            en: "Task Target Structure & Free vs. VIP / Double Rewards Milestone Comparison",
          },
          description: {
            vi: "Hệ thống quy đổi điểm nhiệm vụ hàng ngày/tích lũy và cơ chế nhân đôi phần thưởng mốc rương trong các sự kiện S0 ➔ GAR.",
            en: "Daily/cumulative task point conversion rates and milestone chest doubling mechanics across S0 ➔ GAR events.",
          },
          annotations: [
            {
              kind: "do",
              label: {
                vi: "Hoàn Tất Nhánh Công Nghệ Double Rewards Để Ăn Cột VIP x2 Miễn Phí Ở GAR",
                en: "Complete Double Rewards Tech to Claim the 2x VIP Column for Free in GAR",
              },
              detail: {
                vi: "Trong Đua Vũ Trang Bang Hội (GAR), cột thưởng x2 mở khóa vĩnh viễn bằng nghiên cứu Khoa kỹ mà không tốn tiền nạp.",
                en: "In Guild Arms Race (GAR), the 2x reward column is unlocked permanently via Tech Research without spending cash.",
              },
            },
            {
              kind: "info",
              label: {
                vi: "Ưu Tiên Nhiệm Vụ Hệ Số Điểm Cao Nhất Trong Bảng activity_task_target",
                en: "Prioritize Highest-Multiplier Tasks in the activity_task_target Table",
              },
              detail: {
                vi: "Tinh Hoa Rồng, Orichalcum, Đá Linh Hồn và Mảnh Tướng UR/SSR giúp chạm mốc Rương 9 nhanh gấp 5 lần việc xả Tăng Tốc chay.",
                en: "Dragon Essence, Orichalcum, Soul Stones, and UR/SSR Hero Shards reach Chest 9 up to 5x faster than raw Speedups alone.",
              },
            },
            {
              kind: "dont",
              label: {
                vi: "Không Mở Pass VIP $4.99 Nếu Chưa Cày Đủ Điểm Chạm Mốc Cấp 25–30",
                en: "Never Buy a $4.99 Event Pass Unless You Can Reach Tiers 25–30",
              },
              detail: {
                vi: "Hãy cày nhiệm vụ miễn phí lên Cấp 25–30 trước rồi mới bấm mở khóa nhánh VIP để nhận toàn bộ phần thưởng một lượt.",
                en: "Grind free daily tasks to Tier 25–30 first, then unlock the VIP track to claim all milestone rewards at once.",
              },
            },
          ],
        },
      ],
      subSections: [
        {
          id: "sub-1-1-tasks-milestones-diagram",
          title: {
            vi: "1.1. Sơ Đồ Chuyển Hóa Nhiệm Vụ (activity_task_target) Thành Mốc Rương (activity_point_mission)",
            en: "1.1. Task-to-Milestone Conversion Flowchart (activity_task_target ➔ activity_point_mission)",
          },
          badge: {
            vi: "Luồng Điểm Số",
            en: "Scoring Flow",
          },
          blocks: [
            {
              type: "visual_diagram",
              variant: "decision_flow",
              title: {
                vi: "Quy Trình 3 Bước Tối Ưu Hóa Điểm Nhiệm Vụ & Mở Rương Mốc Free vs. VIP",
                en: "3-Step Protocol for Task Scoring & Free vs. VIP Milestone Optimization",
              },
              subtitle: {
                vi: "Đạt tối đa phần thưởng rương mốc với lượng nguyên liệu tiêu hao thấp nhất",
                en: "Maximizing milestone chest payouts with minimal resource expenditure",
              },
              branches: [
                {
                  title: {
                    vi: "BƯỚC 1: QUÉT BẢNG NHIỆM VỤ HÀNG NGÀY MIỄN PHÍ (00:00 UTC / 07:00 GIỜ VN)",
                    en: "STEP 1: CLEAR FREE DAILY TASKS FIRST (00:00 UTC RESET)",
                  },
                  badge: {
                    vi: "0 Nguyên Liệu",
                    en: "Zero Cost",
                  },
                  tone: "emerald",
                  steps: [
                    {
                      id: "tm-1",
                      title: {
                        vi: "Làm Đủ Nhiệm Vụ Đăng Nhập, Đánh Quái, Auto-Join 50 Lượt & Thu Thập",
                        en: "Complete Login, Monster Hunt, 50x Auto-Join Rally & Gathering Tasks",
                      },
                      subtitle: {
                        vi: "Lấy trọn điểm nền miễn phí mỗi ngày để mở Rương 1–3 mà chưa cần đụng vào kho",
                        en: "Capture free baseline points daily to open Chests 1–3 without touching your bag",
                      },
                      tone: "emerald",
                    },
                  ],
                  outcome: {
                    vi: "Tiết kiệm 25–35% lượng nguyên liệu cần thiết để chạm mốc cuối.",
                    en: "Saves 25–35% of the materials required to hit the final milestone.",
                  },
                },
                {
                  title: {
                    vi: "BƯỚC 2: XẢ NGUYÊN LIỆU ĐIỂM CAO TRONG GIỜ VÀNG DOUBLE-DIP",
                    en: "STEP 2: DUMP HIGH-MULTIPLIER MATERIALS IN GOLDEN WINDOWS",
                  },
                  badge: {
                    vi: "02:00 / 06:00 UTC",
                    en: "02:00 / 06:00 UTC",
                  },
                  tone: "gold",
                  steps: [
                    {
                      id: "tm-2",
                      title: {
                        vi: "Bung Nguyên Liệu Đúng Chủ Đề Chạm Chính Xác Mốc Rương 9 GAR",
                        en: "Spend Theme-Matched Materials to Hit Exact GAR Chest 9 Threshold",
                      },
                      subtitle: {
                        vi: "Canh lúc 02:00 UTC (09:00 Giờ VN) hoặc 06:00 UTC (13:00 Giờ VN) để ăn đồng thời rương Ca 4 Giờ",
                        en: "Time dumps at 02:00 UTC or 06:00 UTC to claim 4-Hour Sprint chests simultaneously",
                      },
                      tone: "gold",
                    },
                  ],
                  outcome: {
                    vi: "Mở khóa 9/9 rương cá nhân nhân đôi (x2) và rương Ca 4 Tiếng.",
                    en: "Unlocks 9/9 doubled (2x) personal chests plus 4-Hour Sprint rewards.",
                  },
                },
              ],
            },
          ],
        },
        {
          id: "sub-1-2-milestone-comparison-table",
          title: {
            vi: "1.2. Bảng Đối Chiếu Mốc Điểm Mở Rương Chuẩn (Free vs. VIP / Double Rewards)",
            en: "1.2. Standard Milestone Chest Comparison Table (Free vs. VIP / Double Rewards)",
          },
          badge: {
            vi: "Free vs VIP",
            en: "Free vs VIP",
          },
          blocks: [
            {
              type: "table",
              caption: {
                vi: "So sánh phần thưởng cột Miễn phí (Free) và cột Đặc quyền (VIP / Double Rewards) ở các mốc điểm trọng yếu",
                en: "Comparison of Free versus VIP / Double Rewards payouts across key milestone breakpoints",
              },
              headers: [
                { vi: "Sự Kiện & Mốc Điểm (activity_point_mission)", en: "Event & Milestone Tier (activity_point_mission)" },
                { vi: "Phần Thưởng Cột Free (Cơ Bản)", en: "Free Column Reward (Base)" },
                { vi: "Phần Thưởng Cột VIP / Double Rewards (Nhân Đôi)", en: "VIP / Double Rewards Column (Upgraded)" },
              ],
              rows: [
                [
                  { vi: "Đua Vũ Trang (GAR) — Rương 1➔3 / Rương 4➔6 / Rương 7➔9", en: "Guild Arms Race (GAR) — Chests 1➔3 / 4➔6 / 7➔9" },
                  { vi: "1x Kim Cương, Tăng Tốc, Tinh Hoa Rồng & Huân Chương Vũ Trang.", en: "1x Diamonds, Speedups, Dragon Essence & Arms Race Medals." },
                  { vi: "Nhân đôi (2x) 100% vật phẩm cả 9 rương khi đã nâng ô công nghệ Double Rewards.", en: "Doubles (2x) 100% of items across all 9 chests once Double Rewards tech is researched." },
                ],
                [
                  { vi: "Tập Kích Cự Ma (Giant Raid) — Thẻ Thợ Săn Cấp 1 ➔ Cấp 30", en: "Giant Troll Raid — Hunter Pass Tiers 1 ➔ 30" },
                  { vi: "Kim Loại Tinh Luyện, Chỉ Ma Thuật, Bình Thể Lực & Mảnh Tướng SSR.", en: "Refined Metal, Magic Thread, Stamina Potions & SSR Hero Shards." },
                  { vi: "Nhánh VIP ($4.99): Cộng thêm lượng lớn Orichalcum, Rương Vũ Khí Độc Quyền & Kim Cương.", en: "VIP Track ($4.99): Adds massive Orichalcum, Exclusive Weapon Chests & bonus Diamonds." },
                ],
                [
                  { vi: "Xúc Xắc Kho Báu (Treasure Dice) — Mốc 30 / 60 / 100 Lượt", en: "Treasure Dice — 30 / 60 / 100 Roll Milestones" },
                  { vi: "Rương Mốc 30 (10 Mảnh Tướng Đỏ) & Rương Mốc 60 (15 Mảnh + Xu Xúc Xắc).", en: "30-Roll Chest (10 Mythic Shards) & 60-Roll Chest (15 Shards + Dice Coins)." },
                  { vi: "Mốc 100 Lượt (Gói $0.99+$4.99): Mở thêm Rương Vũ Khí Độc Quyền + 30 Mảnh Tướng Đỏ.", en: "100-Roll Milestone ($0.99+$4.99 stack): Unlocks Exclusive Weapon Chest + 30 Mythic Shards." },
                ],
              ],
            },
          ],
        },
        {
          id: "sub-1-3-tasks-checklist",
          title: {
            vi: "1.3. Checklist Kiểm Soát Nhiệm Vụ & Mở Rương Mốc Hàng Ngày",
            en: "1.3. Daily Task & Milestone Chest Execution Checklist",
          },
          blocks: [
            {
              type: "checklist",
              checklistId: "event-5-2-tasks-milestones-v1",
              title: {
                vi: "5 Bước Tối Ưu Hóa Bảng Nhiệm Vụ & Mốc Thưởng",
                en: "5-Step Task & Milestone Optimization Checklist",
              },
              items: [
                {
                  id: "chk-52-1",
                  label: {
                    vi: "Đã hoàn thành toàn bộ nhiệm vụ hàng ngày miễn phí trước khi dùng đến nguyên liệu tích trữ trong kho.",
                    en: "Completed all free daily tasks before spending any hoarded inventory materials.",
                  },
                  detail: {
                    vi: "Tối đa hóa điểm nền miễn phí mỗi ngày.",
                    en: "Maximizes free baseline points every day.",
                  },
                },
                {
                  id: "chk-52-2",
                  label: {
                    vi: "Đã nâng xong nhánh công nghệ Arms Race Prep (Double Rewards) để kích hoạt cột x2 rương GAR.",
                    en: "Researched Arms Race Prep (Double Rewards) to activate the 2x GAR chest column.",
                  },
                  detail: {
                    vi: "Tăng gấp đôi lượng Tinh Hoa Rồng và Kim Cương nhận về từ 9 rương.",
                    en: "Doubles Dragon Essence and Diamond yields across all 9 daily chests.",
                  },
                },
                {
                  id: "chk-52-3",
                  label: {
                    vi: "Trong Thi Đấu Hội: Chỉ chọn nhiệm vụ Bậc Vàng/Đỏ trên 2 Ô Độc Quyền cá nhân.",
                    en: "In Guild Race: Selected only Gold/Red tier tasks on your 2 personal Exclusive Slots.",
                  },
                  detail: {
                    vi: "Đạt hiệu suất Điểm Vinh Dự Bang trên mỗi lượt nhiệm vụ cao nhất.",
                    en: "Achieves the highest Guild Honor yield per task attempt.",
                  },
                },
                {
                  id: "chk-52-4",
                  label: {
                    vi: "Đã dừng xả nguyên liệu ngay khi vừa mở xong Rương 9 cá nhân (hoặc mốc 30/60/100 lượt).",
                    en: "Stopped spending materials immediately upon unlocking Personal Chest 9 (or 30/60/100 rolls).",
                  },
                  detail: {
                    vi: "Bảo toàn nguyên liệu dư cho tuần sự kiện kế tiếp.",
                    en: "Preserves surplus materials for the next event cycle.",
                  },
                },
                {
                  id: "chk-52-5",
                  label: {
                    vi: "Đã cày đạt Cấp 30/30 Thẻ Thợ Săn Tập Kích Cự Ma thông qua 50 lượt Auto-Join Rally mỗi ngày.",
                    en: "Reached Hunter Pass Tier 30/30 in Giant Raid via 50 daily Auto-Join Rallies.",
                  },
                  detail: {
                    vi: "Nhận trọn bộ cả cột Free lẫn cột VIP $4.99 mà không tốn Thể Lực cá nhân.",
                    en: "Claims full Free and $4.99 VIP columns without burning personal Stamina.",
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
      id: "sec-2-pro-task-efficiency",
      isPro: true,
      title: {
        vi: "2. [PRO] Bảng Quy Đổi Hiệu Suất Điểm Số Trên Từng Đơn Vị Nguyên Liệu (Point-Per-Unit ROI)",
        en: "2. [PRO] Point-Per-Unit Material Scoring Efficiency Matrix",
      },
      blocks: [
        {
          type: "table",
          caption: {
            vi: "Tỷ lệ điểm số nhận được trên mỗi đơn vị nguyên liệu trong các sự kiện đua điểm chính",
            en: "Point conversion efficiency per unit of material across flagship point races",
          },
          headers: [
            { vi: "Hành Động / Nguyên Liệu (activity_task_target)", en: "Action / Material (activity_task_target)" },
            { vi: "Ngày Tính Điểm Chuẩn", en: "Target Scoring Day" },
            { vi: "Đánh Giá Tốc Độ Mở Rương 9", en: "Chest 9 Unlock Speed Verdict" },
          ],
          rows: [
            [
              { vi: "Tiêu hao Tinh Hoa Rồng (Dragon Essence) & Mảnh Cổ Vật", en: "Spend Dragon Essence & Relic Shards" },
              { vi: "Ngày 1 GAR (Thứ Hai 02:00 UTC / 09:00 Giờ VN)", en: "GAR Day 1 (Monday 02:00 UTC)" },
              { vi: "Tốc độ S-Tier: Mở thẳng Rương 7–9 chỉ trong vài cú nhấp chuột.", en: "S-Tier Speed: Unlocks Chests 7–9 in seconds without burning Speedups." },
            ],
            [
              { vi: "Tiêu hao Orichalcum, Kim Loại & Chỉ Ma Thuật (Lord Gear)", en: "Spend Orichalcum, Refined Metal & Magic Thread (Lord Gear)" },
              { vi: "Ngày 3 GAR (Thứ Tư 12:00 UTC / 19:00 Giờ VN)", en: "GAR Day 3 (Wednesday 12:00 UTC)" },
              { vi: "Tốc độ S-Tier: Nguồn điểm nổ lớn nhất Ngày 3 kết hợp 50 lượt Auto-Join.", en: "S-Tier Speed: Highest Day 3 point burst alongside 50x Auto-Join rallies." },
            ],
          ],
        },
        {
          type: "case_study",
          badge: {
            vi: "Tối Ưu Mốc Rương",
            en: "Milestone Optimization",
          },
          title: {
            vi: "Ca Bệnh Điển Hình: Đốt Sạch Tăng Tốc Vượt Gấp Đôi Mốc Rương 9 Ở Ngày 1 GAR",
            en: "Case Study: Over-Dumping Speedups to 200% of Chest 9 on GAR Day 1",
          },
          profileSummary: {
            vi: "Người chơi xả toàn bộ 60 ngày Tăng Tốc Xây Dựng ngay sáng Thứ Hai (vượt gấp đôi điểm yêu cầu của Rương 9) nhưng không lọt nổi Top 20 BXH cá nhân.",
            en: "A player dumps all 60 days of Construction Speedups on Monday morning (reaching 200% of Chest 9 points) yet still finishes outside Top 20 personal rank.",
          },
          diagnostics: [
            {
              vi: "Phần điểm vượt quá ngưỡng Rương 9 không sinh ra bất kỳ rương mốc nào thêm.",
              en: "Every point scored above the Chest 9 threshold generated zero additional milestone chests.",
            },
            {
              vi: "Hết sạch Tăng Tốc Chung để cứu điểm vào Ngày 2 (Khoa kỹ) và Ngày 5 (Luyện lính).",
              en: "Depleted Universal Speedups needed to hit Chest 9 on Day 2 (Tech) and Day 5 (Troops).",
            },
          ],
          recoverySteps: [
            {
              stepNumber: "01",
              title: {
                vi: "Dừng Ngay Tại Ngưỡng Điểm Rương 9 (100% Mốc Cá Nhân)",
                en: "Hard-Stop Strictly at the Chest 9 Point Threshold",
              },
              detail: {
                vi: "Khi thanh tiến độ vừa chạm mốc Rương 9, dừng bấm Tăng Tốc ngay lập tức và giữ phần còn lại cho tuần GAR tiếp theo.",
                en: "As soon as the progress bar hits Chest 9, stop spending Speedups immediately and bank the rest for the next GAR.",
              },
            },
            {
              stepNumber: "02",
              title: {
                vi: "Phân Bổ Tăng Tốc Chung Cho Ngày Thiếu Hụt Nguyên Liệu",
                en: "Reserve Universal Speedups for Material-Short Days",
              },
              detail: {
                vi: "Dùng Tăng Tốc Chung làm quỹ dự phòng bù điểm cho Ngày 2 (Nghiên cứu) hoặc Ngày 6 (Chữa trị).",
                en: "Keep Universal Speedups as a buffer to bridge Chest 9 on Day 2 (Research) or Day 6 (Healing).",
              },
            },
            {
              stepNumber: "03",
              title: {
                vi: "Mở Khóa Cột VIP Nhân Đôi Bằng Công Nghệ Double Rewards",
                en: "Unlock the Doubled VIP Column via Double Rewards Tech",
              },
              detail: {
                vi: "Nhận gấp đôi phần thưởng ở cả 9 rương mà chỉ tốn đúng định mức điểm cơ bản.",
                en: "Claim 2x rewards across all 9 chests while spending only the baseline point requirement.",
              },
            },
          ],
          conclusion: {
            vi: "Đạt 54/54 rương cá nhân nhân đôi cả tuần đều đặn qua mọi kỳ GAR!",
            en: "Consistently secures 54/54 doubled weekly chests across every single GAR cycle!",
          },
        },
      ],
    },
  ],
};

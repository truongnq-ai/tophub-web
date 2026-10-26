import type { GuideArticle } from "../../types";

export const ARTICLE_9_1_S0_MAJOR_POINT_RACES: GuideArticle = {
  code: "9.1",
  slug: "s0-major-point-races",
  categorySlug: "event-playbooks",
  badge: "HOT",
  readingMinutes: 14,
  title: {
    vi: "Cẩm Nang 3 Sự Kiện Đua Điểm Cốt Lõi S0 ➔ GAR: Top Lord, Thi Đấu Hội & Đua Vũ Trang 6 Ngày (Major Point Races)",
    en: "S0 ➔ GAR Major Point Races Playbook: Top Lord, Guild Race & 6-Day Guild Arms Race (GAR)",
  },
  summary: {
    vi: "Phân tích thực chiến 3 sự kiện đua điểm trụ cột từ Ngày 1 Mùa S0 đến hết Đua Vũ Trang Bang Hội (GAR — Ngày 28+): cách khóa kho 7 ngày trước GAR, nâng công nghệ Double Rewards mở 9 rương x2 mỗi ngày và phối hợp xả mảnh Storm Maiden ở Ngày 4 GAR.",
    en: "Tactical deep dive into the 3 flagship point races from S0 Day 1 through Guild Arms Race (GAR — Day 28+): how to freeze your inventory 7 days prior, unlock Double Rewards for 9x2 daily chests, and dump Storm Maiden shards on GAR Day 4.",
  },
  tldr: {
    coreRule: {
      vi: "Chuyển dịch tư duy từ đua Top cá nhân ở Top Lord (Tuần 1–2) sang tích lũy Vinh Dự Bang ở Thi Đấu Hội (Tuần 3) và bung toàn bộ kho dự trữ vào 6 ngày chủ đề của Đua Vũ Trang Bang Hội (GAR — mở Ngày 28 S0, ngay sau ngày ra mắt Storm Maiden).",
      en: "Shift your strategy from solo milestones in Top Lord (Weeks 1–2) to banking Guild Honor in Guild Race (Week 3) and unleashing 100% of your hoarded stockpile across the 6 themed days of Guild Arms Race (GAR — launching S0 Day 28 right after Storm Maiden).",
    },
    immediateAction: {
      vi: "Ưu tiên nâng kịch trần nhánh công nghệ `Arms Race Prep` -> `Double Rewards` trước hoặc ngay trong Ngày 2 GAR để nhận nhân đôi (`x2`) phần thưởng 9 rương mỗi ngày; mở khóa xác Storm Maiden ở Ngày 27 nhưng giữ toàn bộ Mảnh Vạn Năng chờ đúng 02:00 UTC (09:00 Giờ VN) Thứ Năm (Ngày 4 GAR) mới xả.",
      en: "Prioritize maxing out the `Arms Race Prep` -> `Double Rewards` tech node before or on GAR Day 2 to double (`2x`) all 9 daily personal chests; unlock base Storm Maiden on Day 27, then hold all Universal Shards until 02:00 UTC Thursday (GAR Day 4) before upgrading stars.",
    },
    strictTaboo: {
      vi: "Tuyệt đối KHÔNG nhận nhiệm vụ Chiêu Mộ / Mảnh Vàng trên bảng chung Thi Đấu Hội và KHÔNG nâng Trang Bị Lãnh Chúa (Orichalcum) hay xả Mảnh Vạn Năng ngoài ngày chủ đề tương ứng của GAR.",
      en: "NEVER take Recruit / Universal Shard tasks on the shared Guild Race board and NEVER upgrade Lord Gear (Orichalcum) or spend Universal Shards outside their matching GAR theme days.",
    },
  },
  keyTakeaways: [
    {
      vi: "**Top Lord (Ngày 1–14 S0):** Chỉ xả vừa đủ lấy rương mốc bậc 3 mỗi ngày; giữ chặt Kim Cương và Mảnh Vạn Năng cho Desert Prince (Ngày 21) và Storm Maiden (Ngày 27).",
      en: "**Top Lord (S0 Days 1–14):** Spend only enough to claim Tier 3 daily milestone chests; preserve Diamonds and Universal Shards for Desert Prince (Day 21) and Storm Maiden (Day 27).",
    },
    {
      vi: "**Thi Đấu Hội (Guild Race — Bảng 9 Ô):** Ưu tiên làm 2 Ô Độc Quyền cá nhân và nhiệm vụ Vàng/Đỏ để gom đủ 6,000 Vinh Dự Bang mua Đá Linh Hồn Đỏ hàng tuần.",
      en: "**Guild Race (9-Slot Board):** Focus on your 2 personal Exclusive Slots and Gold/Red tasks to bank 6,000 Guild Honor for the weekly Red Soul Stone.",
    },
    {
      vi: "**Đua Vũ Trang Bang Hội (GAR — 6 Ngày):** Tuân thủ nghiêm ngặt lịch 6 ngày: Thứ Hai (Xây dựng), Thứ Ba (Khoa kỹ & Cổ ngữ), Thứ Tư (Diệt quái & Lord Gear), Thứ Năm (Tướng), Thứ Sáu (Lính & Pet), Thứ Bảy (Chiến đấu).",
      en: "**Guild Arms Race (6-Day GAR):** Strictly follow the 6-day rhythm: Monday (Construction), Tuesday (Tech & Runes), Wednesday (Monsters & Lord Gear), Thursday (Heroes), Friday (Troops & Pets), Saturday (Combat).",
    },
    {
      vi: "**Kỹ thuật Pre-build & Pre-cook:** Bấm nâng công trình và luyện lính từ ngày hôm trước sao cho thời gian hoàn thành rơi đúng vào sau 00:00 UTC (07:00 Giờ VN) của ngày tính điểm tương ứng.",
      en: "**Pre-build & Pre-cook Mechanics:** Start long building upgrades and troop training batches the day prior so completion lands right after 00:00 UTC on the matching scoring day.",
    },
  ],
  keywords: [
    "Top Lord",
    "Guild Race",
    "Guild Arms Race",
    "GAR",
    "Arms Race Prep",
    "Double Rewards",
    "Storm Maiden",
  ],
  sourceFiles: ["event-playbooks-data.ts"],
  freeSections: [
    {
      id: "sec-1-major-races-interactive-console",
      title: {
        vi: "1. Bàn Điều Hành Chiến Thuật 3 Sự Kiện Đua Điểm Lớn (Top Lord • Guild Race • GAR)",
        en: "1. Tactical Playbook Console: Top Lord, Guild Race & Guild Arms Race (GAR)",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "Sử dụng **Bàn Điều Hành 4 Tab** dưới đây để tra cứu tức thì quy tắc bảo lưu, chỉ tiêu tích đồ, lịch 6 ngày của **Đua Vũ Trang Bang Hội (GAR)** và bảng xếp hạng đổi cửa hàng cho từng sự kiện:",
            en: "Use the interactive **4-Tab Playbook Console** below to inspect carryover rules, hoarding targets, the 6-day **Guild Arms Race (GAR)** schedule, and shop priority tiers:",
          },
        },
        {
          type: "widget",
          widgetType: "event_playbook_explorer",
        },
        {
          type: "media_spotlight",
          mediaCode: "MED-9.1-01",
          tier: "tier2_annotated_ui",
          title: {
            vi: "Bộ Nhận Diện 3 Sự Kiện Đua Điểm Trụ Cột & Vật Phẩm Chiến Lược (S0 ➔ GAR)",
            en: "Visual Identification of the 3 Core Point Races & Key Strategic Currencies (S0 ➔ GAR)",
          },
          description: {
            vi: "Ba biểu tượng sự kiện đua điểm lớn nhất Mùa S0 cùng 3 nhóm vật phẩm quyết định điểm số: Tinh Hoa Rồng, Đá Linh Hồn Đỏ và Orichalcum.",
            en: "The three flagship Season S0 point race icons alongside the three decisive scoring materials: Dragon Essence, Red Soul Stones, and Orichalcum.",
          },
          annotations: [
            {
              kind: "do",
              label: {
                vi: "Mở Khóa Ô Nhân Đôi Rương GAR (Double Rewards — Nhánh Arms Race Prep)",
                en: "Unlock GAR Chest Doubling (Double Rewards — Arms Race Prep Tree)",
              },
              detail: {
                vi: "Giúp 100% rương cá nhân từ Rương 1 đến Rương 9 trong suốt 6 ngày GAR đều trả thưởng gấp đôi (nhân đôi Tinh Hoa Rồng, Kim Cương và Huân Chương).",
                en: "Doubles 100% of personal chest rewards from Chest 1 through Chest 9 across all 6 GAR days (2x Dragon Essence, Diamonds, and Medals).",
              },
            },
            {
              kind: "info",
              label: {
                vi: "Giữ Sàn An Toàn 6,000 Vinh Dự Bang Từ Thi Đấu Hội (Guild Race)",
                en: "Maintain the 6,000 Guild Honor Safety Floor from Guild Race",
              },
              detail: {
                vi: "Đảm bảo mua đủ 1 viên Đá Linh Hồn Đỏ mỗi tuần ngay khi cửa hàng Bang Hội làm mới lúc 00:00 UTC (07:00 Giờ VN) Thứ Hai.",
                en: "Guarantees purchasing 1 Red Soul Stone every week as soon as the Guild Shop resets at 00:00 UTC on Monday.",
              },
            },
            {
              kind: "dont",
              label: {
                vi: "Không Xả Mảnh Storm Maiden Vào Ngày 1–3 Của GAR",
                en: "Never Dump Storm Maiden Shards on GAR Days 1–3",
              },
              detail: {
                vi: "Mọi thao tác ghép mảnh và nâng sao anh hùng chỉ được tính điểm vào đúng Ngày 4 của GAR (Thứ Năm).",
                en: "Combining hero shards and upgrading hero stars only award GAR points on Day 4 (Thursday).",
              },
            },
          ],
        },
      ],
      subSections: [
        {
          id: "sub-1-1-gar-six-day-flow-diagram",
          title: {
            vi: "1.1. Sơ Đồ Luồng Chuyển Giao Từ Ngày 27 Storm Maiden Sang 6 Ngày Đua Vũ Trang (GAR)",
            en: "1.1. Tactical Flow from Day 27 Storm Maiden Into the 6-Day Guild Arms Race (GAR)",
          },
          badge: {
            vi: "Lộ Trình Ngày 27➔33",
            en: "Days 27➔33 Flow",
          },
          blocks: [
            {
              type: "visual_diagram",
              variant: "timeline_phases",
              title: {
                vi: "Chuỗi Phối Hợp Tác Chiến Ngày 27 (Storm Maiden) ➔ Ngày 28–33 (6 Ngày GAR)",
                en: "Tactical Execution Chain: Day 27 (Storm Maiden) ➔ Days 28–33 (6-Day GAR)",
              },
              subtitle: {
                vi: "Cách phân bổ tài nguyên chính xác theo từng ngày để tối đa hóa điểm thắng Bang hội và rương cá nhân x2",
                en: "Exact daily resource allocation to maximize Guild Victory points and doubled personal chests",
              },
              branches: [
                {
                  title: {
                    vi: "PHA MỞ MÀN: NGÀY 27 & NGÀY 1–2 GAR (XÂY DỰNG • KHOA KỸ)",
                    en: "OPENING PHASE: DAY 27 & GAR DAYS 1–2 (BUILD • TECH)",
                  },
                  badge: {
                    vi: "Ngày 27 ➔ Thứ Ba",
                    en: "Day 27 ➔ Tue",
                  },
                  tone: "gold",
                  steps: [
                    {
                      id: "gar-flow-1",
                      title: {
                        vi: "Ngày 27 S0: Mở Khóa Xác Storm Maiden & Khóa Mảnh Vạn Năng",
                        en: "S0 Day 27: Unlock Base Storm Maiden & Freeze Universal Shards",
                      },
                      subtitle: {
                        vi: "Mua Xúc Xắc bằng Kim Cương + gói $0.99 lấy xác tướng; nhịn nâng sao chờ Ngày 4 GAR",
                        en: "Buy Diamond Dice + $0.99 pack for base unlock; hold star upgrades for GAR Day 4",
                      },
                      tone: "gold",
                    },
                    {
                      id: "gar-flow-2",
                      title: {
                        vi: "Ngày 1 & Ngày 2 GAR: Xả Tinh Hoa Rồng, Xây Dựng, Khoa Kỹ & Cổ Ngữ",
                        en: "GAR Days 1 & 2: Dump Dragon Essence, Construction, Tech & Runes",
                      },
                      subtitle: {
                        vi: "Thứ Hai xả Xây dựng/Cổ vật (02:00 UTC / 09:00 Giờ VN); Thứ Ba xả Nghiên cứu/Cổ ngữ (06:00 UTC / 13:00 Giờ VN)",
                        en: "Monday dump Construction/Relics (02:00 UTC); Tuesday dump Tech/Runes (06:00 UTC)",
                      },
                      tone: "gold",
                    },
                  ],
                  outcome: {
                    vi: "Hoàn thành 9/9 rương x2 ở 2 ngày đầu và kích hoạt hiệu ứng Double Rewards.",
                    en: "Clears 9/9 doubled chests on the first two days and activates Double Rewards.",
                  },
                },
                {
                  title: {
                    vi: "PHA BÙNG NỔ: NGÀY 3 & NGÀY 4 GAR (LORD GEAR • STORM MAIDEN)",
                    en: "BURST PHASE: GAR DAYS 3 & 4 (LORD GEAR • STORM MAIDEN)",
                  },
                  badge: {
                    vi: "Thứ Tư ➔ Thứ Năm",
                    en: "Wed ➔ Thu",
                  },
                  tone: "emerald",
                  steps: [
                    {
                      id: "gar-flow-3",
                      title: {
                        vi: "Ngày 3 GAR (Thứ Tư): Bật Auto-Rally 50 Lượt & Rèn Trang Bị Lãnh Chúa",
                        en: "GAR Day 3 (Wednesday): 50x Auto-Rally & Lord Gear Forging",
                      },
                      subtitle: {
                        vi: "Xả Bình Thể Lực săn Boss Cự Ma và dồn toàn bộ Orichalcum nâng 6 món Lord Gear",
                        en: "Spend Stamina Potions on Boss Rallies and dump all Orichalcum into 6 Lord Gear pieces",
                      },
                      tone: "emerald",
                    },
                    {
                      id: "gar-flow-4",
                      title: {
                        vi: "Ngày 4 GAR (Thứ Năm): Xả Toàn Bộ Mảnh Nâng Storm Maiden Lên 1★ Đỏ",
                        en: "GAR Day 4 (Thursday): Dump All Shards to Push Storm Maiden to 1-Red Star",
                      },
                      subtitle: {
                        vi: "Bung Mảnh Storm Maiden, Mảnh Vạn Năng, Sách Kỹ Năng và Vé Chiêu Mộ lúc 02:00 UTC (09:00 Giờ VN)",
                        en: "Unleash Storm Maiden Shards, Universal Shards, Skill Books, and Recruit Tokens at 02:00 UTC",
                      },
                      tone: "emerald",
                    },
                  ],
                  outcome: {
                    vi: "Đột phá lực chiến Đội 1 Horde và chiếm trọn ưu thế điểm thắng cho Bang hội.",
                    en: "Spikes Queue 1 Horde combat power while securing dominant Guild Victory points.",
                  },
                },
                {
                  title: {
                    vi: "PHA CHỐT HẠ: NGÀY 5 & NGÀY 6 GAR (LUYỆN LÍNH • TÁC CHIẾN)",
                    en: "CLOSING PHASE: GAR DAYS 5 & 6 (TROOPS • COMBAT)",
                  },
                  badge: {
                    vi: "Thứ Sáu ➔ Thứ Bảy",
                    en: "Fri ➔ Sat",
                  },
                  tone: "gold",
                  steps: [
                    {
                      id: "gar-flow-5",
                      title: {
                        vi: "Ngày 5 GAR (Thứ Sáu): Thu Hoạch Lính Pre-Cook, Thăng Cấp Lính & Nâng Pet",
                        en: "GAR Day 5 (Friday): Harvest Pre-Cooked Troops, Promote Units & Level Pets",
                      },
                      subtitle: {
                        vi: "Dùng Tăng Tốc Luyện Lính đẩy lính bậc thấp lên bậc cao nhất + xả Thức Ăn Thú Cưng",
                        en: "Use Training Speedups to promote lower-tier units to max tier + dump Pet Food",
                      },
                      tone: "gold",
                    },
                    {
                      id: "gar-flow-6",
                      title: {
                        vi: "Ngày 6 GAR (Thứ Bảy): Giao Tranh Mỏ Tài Nguyên & Xả Tăng Tốc Chữa Trị",
                        en: "GAR Day 6 (Saturday): Tile Combat & Healing Speedup Sprint",
                      },
                      subtitle: {
                        vi: "Trao đổi điểm chiến đấu an toàn tại mỏ khoáng sản hoặc xả Tăng Tốc trong Bệnh Viện",
                        en: "Trade safe combat points on resource tiles or spend Healing Speedups in the Hospital",
                      },
                      tone: "gold",
                    },
                  ],
                  outcome: {
                    vi: "Chốt 54/54 rương cá nhân nhân đôi cả tuần và giành chiến thắng chung cuộc GAR.",
                    en: "Locks in all 54/54 doubled weekly personal chests and secures overall GAR victory.",
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "sec-2-six-day-gar-master-matrix",
      title: {
        vi: "2. Bảng Tham Chiếu Nhanh 6 Ngày Đua Vũ Trang Bang Hội (GAR) & Khung Giờ Vàng Double-Dip",
        en: "2. 6-Day Guild Arms Race (GAR) Master Schedule & Golden Double-Dip Windows",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "Mỗi ngày trong **Đua Vũ Trang Bang Hội (GAR)** có trọng số điểm Thắng/Bại khác nhau và chỉ tính điểm cho đúng nhóm hành động được quy định từ `00:00 UTC` (`07:00 Giờ VN`) đến `23:59 UTC` (`06:59 Giờ VN` sáng hôm sau):",
            en: "Each day in **Guild Arms Race (GAR)** carries a specific Guild Victory weight and only scores designated actions between `00:00 UTC` and `23:59 UTC`:",
          },
        },
        {
          type: "callout",
          variant: "warning",
          title: {
            vi: "Quy Tắc Sống Còn: Kiểm Tra Khung Giờ Ca 4 Tiếng Trước Khi Bấm Xả!",
            en: "Vital Rule: Always Check the 4-Hour Hourly Sprint Before Dumping!",
          },
          content: {
            vi: "Không bao giờ xả sạch Tăng Tốc ngay lúc `00:05 UTC` (`07:05 Giờ VN`) khi vừa sang ngày mới! Hãy chờ đến khung giờ vàng `02:00 UTC` (`09:00 Giờ VN`), `06:00 UTC` (`13:00 Giờ VN`) hoặc `14:00 UTC` (`21:00 Giờ VN`) khi **Ca 4 Giờ (Hourly Arms Race)** trùng khớp chủ đề với ngày GAR.",
            en: "Never dump your Speedups at `00:05 UTC` right after daily reset! Wait until the `02:00 UTC`, `06:00 UTC`, or `14:00 UTC` golden windows when the **4-Hour Hourly Arms Race** matches the daily GAR theme.",
          },
        },
      ],
      subSections: [
        {
          id: "sub-2-1-gar-six-days-breakdown-table",
          title: {
            vi: "2.1. Bảng Phân Tích Chi Tiết 6 Ngày Chủ Đề Của Đua Vũ Trang Bang Hội (GAR)",
            en: "2.1. Detailed 6-Day Guild Arms Race (GAR) Scoring & Double-Dip Breakdown Table",
          },
          badge: {
            vi: "Lịch 6 Ngày GAR",
            en: "6-Day GAR Table",
          },
          blocks: [
            {
              type: "table",
              caption: {
                vi: "Lịch trình 6 ngày của Đua Vũ Trang Bang Hội (GAR), vật phẩm tính điểm chính và khung giờ vàng kẹp điểm kép",
                en: "6-day Guild Arms Race (GAR) schedule, primary scoring items, and golden double-dip windows",
              },
              headers: [
                {
                  vi: "Ngày GAR",
                  en: "GAR Day",
                },
                {
                  vi: "Chủ Đề & Nguồn Tính Điểm Chính",
                  en: "Daily Theme & Primary Scoring Sources",
                },
                {
                  vi: "Khung Giờ Vàng & Mẹo Tối Ưu Hóa",
                  en: "Golden Window & Optimization Trick",
                },
              ],
              rows: [
                [
                  {
                    vi: "Ngày 1 (Thứ Hai)",
                    en: "Day 1 (Monday)",
                  },
                  {
                    vi: "Xây Dựng Lãnh Thổ & Cổ Vật: Tăng Tốc Xây Dựng, hoàn thành công trình, Tinh Hoa Rồng & Mảnh Cổ Vật.",
                    en: "Territory Construction & Relics: Construction Speedups, completed building power, Dragon Essence & Relic Shards.",
                  },
                  {
                    vi: "Xả lúc 02:00 UTC (09:00 Giờ VN) & 14:00 UTC (21:00 Giờ VN); bấm nâng Lâu Đài từ Chủ Nhật để nổ điểm sáng Thứ Hai.",
                    en: "Dump at 02:00 UTC & 14:00 UTC; pre-build Castle upgrades on Sunday so they finish Monday morning.",
                  },
                ],
                [
                  {
                    vi: "Ngày 2 (Thứ Ba)",
                    en: "Day 2 (Tuesday)",
                  },
                  {
                    vi: "Khoa Kỹ & Cổ Ngữ: Tăng Tốc Nghiên Cứu, hoàn thành công nghệ, Bụi Cổ Ngữ (Rune Dust) & Rương Cổ Ngữ.",
                    en: "Tech Research & Runes: Research Speedups, completed tech power, Rune Dust & Rune Chests.",
                  },
                  {
                    vi: "Xả lúc 06:00 UTC (13:00 Giờ VN) & 18:00 UTC (01:00 Giờ VN); ưu tiên hoàn tất nhánh Arms Race Prep (Double Rewards).",
                    en: "Dump at 06:00 UTC & 18:00 UTC; prioritize finishing the Arms Race Prep (Double Rewards) tech branch.",
                  },
                ],
                [
                  {
                    vi: "Ngày 3 (Thứ Tư)",
                    en: "Day 3 (Wednesday)",
                  },
                  {
                    vi: "Diệt Quái, Tập Kích Boss & Lord Gear: Tiêu hao Thể Lực, Kim Loại Tinh Luyện, Chỉ Ma Thuật & Orichalcum.",
                    en: "Monster Hunt, Boss Rally & Lord Gear: Stamina spent, Refined Metal, Magic Thread & Orichalcum.",
                  },
                  {
                    vi: "Bật Auto-Join 50 lượt từ 00:00 UTC (07:00 Giờ VN); xả toàn bộ nguyên liệu rèn Trang Bị Lãnh Chúa lúc 12:00 UTC (19:00 Giờ VN).",
                    en: "Enable 50x Auto-Join at 00:00 UTC; dump all Lord Gear forging materials at 12:00 UTC.",
                  },
                ],
                [
                  {
                    vi: "Ngày 4 (Thứ Năm)",
                    en: "Day 4 (Thursday)",
                  },
                  {
                    vi: "Phát Triển Anh Hùng: Mảnh Tướng UR/SSR (Storm Maiden / Desert Prince), Mảnh Vạn Năng, Sách Kỹ Năng & Vé Chiêu Mộ.",
                    en: "Hero Development: UR/SSR Hero Shards (Storm Maiden / Desert Prince), Universal Shards, Skill Books & Recruit Tokens.",
                  },
                  {
                    vi: "Xả lúc 02:00 UTC (09:00 Giờ VN) & 14:00 UTC (21:00 Giờ VN); ngày vàng để nâng Storm Maiden (mở Ngày 27) lên 1★ Đỏ!",
                    en: "Dump at 02:00 UTC & 14:00 UTC; the golden day to push Storm Maiden (unlocked Day 27) to 1-Red Star!",
                  },
                ],
                [
                  {
                    vi: "Ngày 5 (Thứ Sáu)",
                    en: "Day 5 (Friday)",
                  },
                  {
                    vi: "Huấn Luyện Lính & Thú Cưng: Luyện/Thăng cấp lính (Promote), Tăng Tốc Luyện Lính, Thức Ăn Pet & Tinh Hoa Pet.",
                    en: "Troop Training & Pet Promotion: Training/Promoting units, Training Speedups, Pet Food & Pet Essence.",
                  },
                  {
                    vi: "Thu hoạch lính Pre-cook sau 00:00 UTC (07:00 Giờ VN); xả Promote lính và nâng Pet lúc 10:00 UTC (17:00 Giờ VN).",
                    en: "Harvest pre-cooked troops after 00:00 UTC; promote lower-tier troops and upgrade Pets at 10:00 UTC.",
                  },
                ],
                [
                  {
                    vi: "Ngày 6 (Thứ Bảy)",
                    en: "Day 6 (Saturday)",
                  },
                  {
                    vi: "Tác Chiến & Nước Rút: Tiêu diệt/Cấp cứu lính giao tranh và xả mọi loại Tăng Tốc còn tồn đọng.",
                    en: "Combat & Final Sprint: Defeating/healing troops in combat and spending any remaining Speedups.",
                  },
                  {
                    vi: "Trao đổi điểm công-thủ tại mỏ tài nguyên hoặc xả Tăng Tốc Chữa Trị lúc 02:00 UTC (09:00 Giờ VN) & 14:00 UTC (21:00 Giờ VN).",
                    en: "Trade tile hits safely or spend Healing Speedups in the Hospital at 02:00 UTC & 14:00 UTC.",
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: "sec-3-gar-readiness-checklist",
      title: {
        vi: "3. Checklist Kiểm Tra Sẵn Sàng Trước Giờ Khởi Tranh GAR (00:00 UTC / 07:00 Giờ VN Thứ Hai)",
        en: "3. Pre-GAR Readiness Checklist (Before Monday 00:00 UTC Reset)",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "Đánh dấu hoàn thành 5 bước kiểm tra dưới đây vào tối Chủ Nhật (hoặc tối Ngày 27 S0 sau khi lấy Storm Maiden) để bước vào tuần lễ **Đua Vũ Trang Bang Hội (GAR)** với hiệu suất 200%:",
            en: "Complete the 5 verification steps below on Sunday night (or S0 Day 27 evening after unlocking Storm Maiden) to enter **Guild Arms Race (GAR)** week at 200% efficiency:",
          },
        },
        {
          type: "checklist",
          checklistId: "s0-major-races-gar-readiness-v2",
          title: {
            vi: "Bảng Kiểm Tra 5 Bước Sẵn Sàng Tác Chiến GAR",
            en: "5-Step GAR Tactical Readiness Checklist",
          },
          items: [
            {
              id: "chk-gar-1",
              label: {
                vi: "Đã nâng công nghệ Nhánh Chuẩn Bị Vũ Trang (Arms Race Prep) mở khóa các ô tăng điểm và ô Nhân Đôi Phần Thưởng (Double Rewards).",
                en: "Researched the Arms Race Prep tech branch to unlock point bonuses and the Double Rewards chest node.",
              },
              detail: {
                vi: "Nhân đôi (x2) toàn bộ phần thưởng từ 9 rương cá nhân mỗi ngày xuyên suốt 6 ngày GAR.",
                en: "Doubles (2x) all rewards from the 9 daily personal milestone chests across all 6 days of GAR.",
              },
            },
            {
              id: "chk-gar-2",
              label: {
                vi: "Đã bấm nâng cấp 1–2 công trình lớn từ Chủ Nhật (Pre-build) để thời gian hoàn tất rơi vào sau 00:00 UTC (07:00 Giờ VN) sáng Thứ Hai (Ngày 1 GAR).",
                en: "Started 1–2 major building upgrades on Sunday (Pre-build) timed to finish after 00:00 UTC Monday (GAR Day 1).",
              },
              detail: {
                vi: "Ăn ngay điểm Lực Chiến công trình hoàn tất khi vừa mở màn Ngày 1 GAR mà không tốn thêm Tăng Tốc.",
                en: "Captures immediate building Power completion points as soon as GAR Day 1 opens without burning extra Speedups.",
              },
            },
            {
              id: "chk-gar-3",
              label: {
                vi: "Đã khóa 100% nguyên liệu rèn Trang Bị Lãnh Chúa (Orichalcum, Kim Loại, Chỉ Ma Thuật) và 25+ Bình Thể Lực cho Thứ Tư (Ngày 3 GAR).",
                en: "Locked 100% of Lord Gear materials (Orichalcum, Refined Metal, Magic Thread) and 25+ Stamina Potions for Wednesday (GAR Day 3).",
              },
              detail: {
                vi: "Nâng đều 6 món Trang Bị Lãnh Chúa vào đúng Ngày 3 GAR để mở khóa toàn bộ 9 rương x2.",
                en: "Upgrade all 6 Lord Gear pieces evenly on GAR Day 3 to sweep all 9 doubled milestone chests.",
              },
            },
            {
              id: "chk-gar-4",
              label: {
                vi: "Đã lấy xác Storm Maiden ở Ngày 27 nhưng giữ nguyên toàn bộ Mảnh Vạn Năng Vàng và Sách Kỹ Năng trong túi chờ Thứ Năm (Ngày 4 GAR).",
                en: "Unlocked base Storm Maiden on Day 27 while keeping all Universal Legendary Shards and Skill Books untouched for Thursday (GAR Day 4).",
              },
              detail: {
                vi: "Bung toàn bộ mảnh tướng và sách kỹ năng lúc 02:00 UTC (09:00 Giờ VN) Thứ Năm để ăn điểm kép.",
                en: "Dump all hero shards and skill books at 02:00 UTC on Thursday for maximum double-dip scoring.",
              },
            },
            {
              id: "chk-gar-5",
              label: {
                vi: "Đã giữ sàn an toàn 6,000 Điểm Vinh Dự Bang Hội từ tuần Thi Đấu Hội để mua ngay Đá Linh Hồn Đỏ khi sang tuần mới.",
                en: "Preserved the 6,000 Guild Honor safety floor from Guild Race week to buy the weekly Red Soul Stone on Monday reset.",
              },
              detail: {
                vi: "Đảm bảo tiến độ 9 viên Đá Linh Hồn Đỏ thức tỉnh Thần Thoại cho các tướng Liên Minh/Thiên Nhiên.",
                en: "Safeguards the 9-week Red Soul Stone Mythic awakening schedule.",
              },
            },
          ],
        },
      ],
    },
  ],
  proSections: [
    {
      id: "sec-4-pro-prebuy-and-double-dip-roi",
      isPro: true,
      title: {
        vi: "4. [PRO] Ma Trận Kẹp Điểm Kép Ngày 27 Storm Maiden ➔ Ngày 4 GAR & Tối Ưu Hóa Ngân Sách",
        en: "4. [PRO] Day 27 Storm Maiden ➔ GAR Day 4 Double-Dip ROI Matrix & Budget Optimization",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "Điểm giao thoa vàng của Mùa S0 nằm ở **Ngày 27 (Ra mắt Storm Maiden)** và **Ngày 28 (Ngày 1 của GAR)**: thay vì nạp các gói Tăng Tốc đắt đỏ trong giao diện GAR, người chơi thông minh mua gói mồi `$0.99 / $4.99` ở sự kiện Xúc Xắc Storm Maiden rồi đem toàn bộ mảnh tướng đó xả vào **Ngày 4 GAR**:",
            en: "The golden intersection of Season S0 occurs between **Day 27 (Storm Maiden Launch)** and **Day 28 (GAR Day 1)**: instead of buying overpriced Speedup bundles inside the GAR menu, smart players buy `$0.99 / $4.99` daily packs in the Storm Maiden Dice event and dump those exact shards on **GAR Day 4**:",
          },
        },
      ],
      subSections: [
        {
          id: "sub-4-1-gar-budget-and-roi-comparison-table",
          title: {
            vi: "4.1. Bảng So Sánh Hiệu Suất Đầu Tư (ROI) Theo 3 Tầng Ngân Sách Trong Tuần Lễ GAR",
            en: "4.1. 3-Tier Budget ROI Comparison Matrix During GAR Week",
          },
          badge: {
            vi: "Ma Trận ROI GAR",
            en: "GAR ROI Matrix",
          },
          blocks: [
            {
              type: "table",
              caption: {
                vi: "Phân bổ ngân sách và chiến thuật gộp điểm giữa Xúc Xắc Storm Maiden (Ngày 27), Tập Kích Cự Ma và 6 Ngày GAR",
                en: "Budget allocation and point-stacking strategy across Storm Maiden Dice (Day 27), Giant Raid, and 6-Day GAR",
              },
              headers: [
                {
                  vi: "Phân Khúc Người Chơi",
                  en: "Player Tier",
                },
                {
                  vi: "Gói Mua Trước / Tích Trữ Khuyến Nghị",
                  en: "Recommended Pre-Buys & Hoarding Stack",
                },
                {
                  vi: "Kết Quả Thu Hoạch Kép (Storm Maiden + GAR)",
                  en: "Combined Yield (Storm Maiden + GAR)",
                },
              ],
              rows: [
                [
                  {
                    vi: "F2P ($0)",
                    en: "F2P ($0)",
                  },
                  {
                    vi: "Dùng Kim Cương tích trữ mua Xúc Xắc Ngày 27–31 + Tích 150 Mảnh Vạn Năng + Nâng kịch trần công nghệ Double Rewards.",
                    en: "Spend hoarded Diamonds on daily Dice (Days 27–31) + Bank 150 Universal Shards + Max out Double Rewards tech.",
                  },
                  {
                    vi: "Mở khóa Storm Maiden + Nâng lên 1★ Đỏ vào Ngày 4 GAR + Ăn trọn 54/54 rương cá nhân GAR nhân đôi.",
                    en: "Unlock Storm Maiden + Push to 1-Red Star on GAR Day 4 + Claim all 54/54 doubled GAR personal chests.",
                  },
                ],
                [
                  {
                    vi: "Low-Mid Spender ($5 – $25)",
                    en: "Low-Mid Spender ($5 – $25)",
                  },
                  {
                    vi: "Mua gói $0.99/ngày ở Xúc Xắc Storm Maiden (7 ngày = $6.93) + Pass Tập Kích Cự Ma $4.99 (lấy Orichalcum).",
                    en: "Buy $0.99/day Storm Maiden Dice packs (7 days = $6.93) + $4.99 Giant Raid Pass (for Orichalcum).",
                  },
                  {
                    vi: "Chạm mốc 100 lượt Xúc Xắc (Lấy cả Vũ Khí Độc Quyền) + Top 10–20 BXH Ngày 3 & Ngày 4 của GAR.",
                    en: "Hit the 100-Roll Dice Milestone (including Exclusive Weapon) + Place Top 10–20 on GAR Days 3 & 4.",
                  },
                ],
                [
                  {
                    vi: "Whale ($100+)",
                    en: "Whale ($100+)",
                  },
                  {
                    vi: "Đẩy mốc 150–300 lượt Xúc Xắc Storm Maiden + Gói Orichalcum Lord Gear Ngày 3 + Gói Cổ Ngữ Đỏ Ngày 2.",
                    en: "Push 150–300 Storm Maiden Dice Rolls + Day 3 Lord Gear Orichalcum Bundles + Day 2 Legendary Rune Packs.",
                  },
                  {
                    vi: "Storm Maiden 3★–5★ Đỏ + Vũ Khí Độc Quyền +10 + Top 1–3 Toàn Cụm Server & Gánh Bang Thắng Tuyệt Đối.",
                    en: "3–5 Red Star Storm Maiden + +10 Exclusive Weapon + Top 1–3 Cross-Server Rank & Guild Victory Carry.",
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: "sec-5-pro-case-study-day27-gar-transition",
      isPro: true,
      title: {
        vi: "5. [PRO] Hồ Sơ Thực Chiến: Xử Lý Khủng Hoảng Lệch Nhịp Ngày 27 Storm Maiden & Ngày 1 GAR",
        en: "5. [PRO] Tactical Case Study: Resolving Day 27 Storm Maiden & GAR Day 1 Desync",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "Phân tích tình huống thực tế của một người chơi tại **Ngày 27 của Mùa S0** (ngay trước ngày khởi tranh **Đua Vũ Trang Bang Hội — GAR**):",
            en: "Real-world tactical diagnosis for a player at **Season S0 Day 27** (24 hours before **Guild Arms Race — GAR** kicks off):",
          },
        },
        {
          type: "case_study",
          badge: {
            vi: "Phẫu Thuật Ngày 27➔28 S0",
            en: "S0 Day 27➔28 Triage",
          },
          title: {
            vi: "Ca Bệnh Điển Hình: Nôn Nóng Đập Hết Mảnh Vạn Năng Vào Storm Maiden Ngay Ngày 27",
            en: "Case Study: Prematurely Dumping Universal Shards Into Storm Maiden on Day 27",
          },
          profileSummary: {
            vi: "Người chơi Low-Spender tại Ngày 27 S0 vừa quay Xúc Xắc mở khóa được Storm Maiden và đang giữ 180 Mảnh Vạn Năng Vàng cùng 250 Sách Kỹ Năng. Ngày mai (Ngày 28 S0) là Ngày 1 của sự kiện Đua Vũ Trang Bang Hội (GAR).",
            en: "A Low-Spender on S0 Day 27 just unlocked Storm Maiden from Treasure Dice while holding 180 Universal Legendary Shards and 250 Skill Books. Tomorrow (S0 Day 28) is Day 1 of Guild Arms Race (GAR).",
          },
          diagnostics: [
            {
              vi: "Ngứa tay muốn đập ngay toàn bộ 180 Mảnh Vạn Năng và 250 Sách Kỹ Năng vào Storm Maiden trong tối Ngày 27 để đi đánh Đấu Trường (mất trắng điểm GAR Ngày 4).",
              en: "Tempted to immediately feed all 180 Universal Shards and 250 Skill Books into Storm Maiden on Day 27 evening for Arena (forfeiting all GAR Day 4 points).",
            },
            {
              vi: "Chưa nâng xong ô công nghệ Double Rewards trong nhánh Arms Race Prep nhưng đã tiêu gần hết Tăng Tốc Nghiên Cứu vào nhánh Quân Sự.",
              en: "Has not unlocked the Double Rewards node in Arms Race Prep yet, having burned Research Speedups on combat tech.",
            },
          ],
          recoverySteps: [
            {
              stepNumber: "01",
              title: {
                vi: "Tối Ngày 27 S0: Chỉ Mở Khóa Xác Storm Maiden & Khóa Kho Mảnh Vạn Năng",
                en: "S0 Day 27 Evening: Unlock Base Storm Maiden Copy & Freeze Universal Shards",
              },
              detail: {
                vi: "Chỉ triệu hồi xác Storm Maiden (10 mảnh) và tăng cấp EXP lên Lv.120+ để lắp vào đội hình; khóa chặt 100% Mảnh Vạn Năng và Sách Kỹ Năng trong túi.",
                en: "Only summon the base Storm Maiden copy (10 shards) and level her EXP to Lv.120+; lock 100% of Universal Shards and Skill Books.",
              },
            },
            {
              stepNumber: "02",
              title: {
                vi: "Ngày 1 & Ngày 2 GAR (Thứ Hai & Thứ Ba): Dồn Nghiên Cứu Mở Double Rewards",
                en: "GAR Days 1 & 2 (Mon & Tue): Funnel Research Into Double Rewards",
              },
              detail: {
                vi: "Xả Tăng Tốc Xây Dựng lúc 02:00 UTC (09:00 Giờ VN) Thứ Hai và dồn toàn bộ Tăng Tốc Nghiên Cứu lúc 06:00 UTC (13:00 Giờ VN) Thứ Ba vào nhánh Arms Race Prep để mở khóa Double Rewards.",
                en: "Spend Construction Speedups at 02:00 UTC Monday and funnel all Research Speedups at 06:00 UTC Tuesday into Arms Race Prep to unlock Double Rewards.",
              },
            },
            {
              stepNumber: "03",
              title: {
                vi: "Ngày 4 GAR (Thứ Năm 02:00 UTC / 09:00 Giờ VN): Bung Toàn Bộ Đẩy Storm Maiden 1★ Đỏ",
                en: "GAR Day 4 (Thursday 02:00 UTC): Unleash Stockpile to Push 1-Red Star Storm Maiden",
              },
              detail: {
                vi: "Bung toàn bộ 180 Mảnh Vạn Năng + Mảnh Storm Maiden từ mốc 60/100 lượt Xúc Xắc + 250 Sách Kỹ Năng để đẩy thẳng Storm Maiden lên 1★ Đỏ (mở Kỹ năng 5) và ăn trọn 9 Rương x2!",
                en: "Unleash all 180 Universal Shards + Storm Maiden shards from the 60/100 Dice milestone + 250 Skill Books to push Storm Maiden straight to 1-Red Star (Skill 5 unlock) and sweep all 9 doubled chests!",
              },
            },
          ],
          conclusion: {
            vi: "Giữ nguyên 100% sức mạnh Storm Maiden 1★ Đỏ nhưng thu thêm hơn 3,000 Kim Cương, 1,200 Tinh Hoa Rồng và 20 Mảnh Vạn Năng hoàn trả từ rương x2 Ngày 4 GAR!",
            en: "Achieves the exact same 1-Red Star Storm Maiden power spike while netting an extra 3,000+ Diamonds, 1,200 Dragon Essence, and 20 Universal Shards from GAR Day 4 doubled chests!",
          },
        },
      ],
    },
  ],
};

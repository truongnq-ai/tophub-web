import type { GuideArticle } from "../../types";

export const ARTICLE_9_3_S0_SATELLITES_AND_RAIDS: GuideArticle = {
  code: "9.3",
  slug: "s0-satellites-and-raids",
  categorySlug: "event-playbooks",
  badge: "HOT",
  readingMinutes: 12,
  title: {
    vi: "Cẩm Nang 4 Sự Kiện Vệ Tinh & Đua Điểm Phụ S0: Bắt Bướm, Tập Kích Cự Ma, Quân Đoàn Hắc Ám & 8 Mini-Rushes",
    en: "S0 Satellites & Mini-Rushes Playbook: Butterfly Catching, Giant Raid, Dark Legion & 8 Rotating Mini-Rushes",
  },
  summary: {
    vi: "Hướng dẫn khai thác tối đa 4 nhóm sự kiện vệ tinh chạy song hành từ đầu S0 đến GAR: cày kịch trần rơi Vợt Bắt Bướm mỗi ngày, tối ưu Pass Cự Ma $4.99 lấy Orichalcum, mẹo tiếp viện nhân đôi điểm Quân Đoàn Hắc Ám và kỷ luật chống bẫy xả sớm ở 8 Mini-Rushes.",
    en: "Complete guide to mastering the 4 satellite event groups from S0 Day 1 through GAR: capping daily Butterfly Net drops, maximizing the $4.99 Giant Raid Pass for Orichalcum, 2x reinforcement scoring in Dark Legion, and anti-bait discipline across the 8 Mini-Rushes.",
  },
  tldr: {
    coreRule: {
      vi: "Các sự kiện vệ tinh (Bắt Bướm, Tập Kích Cự Ma, Quân Đoàn Hắc Ám) là nguồn cung cấp Trang Trí Thần Thoại, Orichalcum và Mảnh Vạn Năng miễn phí/giá rẻ lớn nhất để làm 'đạn dược' bắn vào tuần lễ Đua Vũ Trang Bang Hội (GAR); trong khi 8 Mini-Rushes 2–3 ngày chỉ được phép xả khi trùng khớp với tuần GAR!",
      en: "Satellite events (Butterfly Catching, Giant Raid, Dark Legion) serve as your richest source of free/low-cost Mythic Decorations, Orichalcum, and Universal Shards to fuel Guild Arms Race (GAR) week; meanwhile, the 8 rotating 2–3 day Mini-Rushes must only be dumped when overlapping with GAR!",
    },
    immediateAction: {
      vi: "Bật Auto-Join Rally 50 lượt/ngày, cày kịch trần rơi Vợt Bắt Bướm hàng ngày (tiêu sạch xu trước 23:59 UTC / 06:59 Giờ VN ngày cuối), gửi quân Tiếp Viện trong Quân Đoàn Hắc Ám và giữ nguyên toàn bộ Orichalcum chờ Ngày 3 GAR.",
      en: "Enable 50x daily Auto-Join Rally, cap daily Butterfly Net drops (spending 100% of tokens before 23:59 UTC on the final day), Reinforce guildmates during Dark Legion, and bank all Orichalcum for GAR Day 3.",
    },
    strictTaboo: {
      vi: "Tuyệt đối KHÔNG sập 'Bẫy Xả Sớm' của 8 Mini-Rushes vào tuần nghỉ trước GAR và KHÔNG dùng Kim Cương mua cấp độ Pass Cự Ma hay mua Dịch Chuyển giá gốc 2,000 KC.",
      en: "NEVER fall for the 'Premature Dump Trap' of the 8 Mini-Rushes in the off-week before GAR and NEVER spend Diamonds on Giant Raid Pass tiers or 2,000-Diamond direct Teleports.",
    },
  },
  keyTakeaways: [
    {
      vi: "**Lễ Hội Bắt Bướm (Butterfly Catching):** Đánh quái chạm trần rơi vật phẩm hàng ngày và bắt buộc đổi sạch xu lấy Trang Trí Thần Thoại + Mảnh Vạn Năng trước khi đóng shop.",
      en: "**Butterfly Catching:** Farm monsters up to the daily drop cap every day and redeem 100% of tokens for Mythic Decorations + Universal Shards before shop closure.",
    },
    {
      vi: "**Tập Kích Cự Ma (Giant Troll Raid):** Treo Auto-Join bằng đạo quân phụ để lấy đủ 30 tầng thưởng; gói Pass `$4.99` là nguồn cung cấp Orichalcum rẻ nhất cho Ngày 3 GAR.",
      en: "**Giant Troll Raid:** Assign secondary marches to Auto-Join to clear all 30 tiers; the `$4.99` Pass is the cheapest source of Orichalcum for GAR Day 3.",
    },
    {
      vi: "**Đế Quốc & Quân Đoàn Hắc Ám (Dark Empire & Dark Legion):** Thu hồi toàn bộ quân về thành trước giờ mở sóng công thành và gửi 2 đạo quân đi Tiếp Viện (Reinforce) đồng minh.",
      en: "**Dark Empire & Dark Legion:** Recall all gathering marches before siege waves begin and send 2 marches to Reinforce online guildmates.",
    },
    {
      vi: "**Đua Bang 2 Ngày & 8 Mini-Rushes:** Đóng băng 100% nguyên liệu ở tuần nghỉ; chỉ xả khi sự kiện phụ trùng khớp với ngày chủ đề của GAR để ăn 3 lần thưởng (Triple-Dip).",
      en: "**2-Day Guild Rush & 8 Mini-Rushes:** Freeze 100% of materials during off-weeks; dump only when the Mini-Rush aligns with the active GAR daily theme for Triple-Dip rewards.",
    },
  ],
  keywords: [
    "Butterfly Catching",
    "Giant Troll Raid",
    "Dark Empire",
    "Dark Legion",
    "Guild Rush",
    "Mini-Rush",
    "Triple-Dip",
  ],
  sourceFiles: ["event-playbooks-data.ts"],
  freeSections: [
    {
      id: "sec-1-satellites-interactive-console",
      title: {
        vi: "1. Bàn Điều Hành Chiến Thuật 4 Sự Kiện Vệ Tinh & Mini-Rush (Bắt Bướm • Cự Ma • Hắc Ám • Mini-Rush)",
        en: "1. Tactical Playbook Console: Butterfly Catching, Giant Raid, Dark Legion & Mini-Rushes",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "Sử dụng **Bàn Điều Hành 4 Tab** dưới đây (mặc định mở sẵn **Lễ Hội Bắt Bướm**) để kiểm tra trần rơi vật phẩm hàng ngày, chiến thuật Pass Cự Ma `$4.99`, mẹo phòng thủ Quân Đoàn Hắc Ám và lịch chống bẫy Mini-Rush:",
            en: "Use the interactive **4-Tab Playbook Console** below (pre-selected to **Butterfly Catching**) to inspect daily drop caps, the `$4.99` Giant Raid Pass strategy, Dark Legion garrison tricks, and Mini-Rush anti-bait rules:",
          },
        },
        {
          type: "widget",
          widgetType: "event_playbook_explorer",
        },
        {
          type: "media_spotlight",
          mediaCode: "MED-9.3-01",
          tier: "tier2_annotated_ui",
          title: {
            vi: "Hệ Sinh Thái Sự Kiện Vệ Tinh & Kho Nguyên Liệu Bổ Trợ Cho Tuần Lễ GAR",
            en: "Satellite Event Ecosystem & Material Supply Chain Fueling GAR Week",
          },
          description: {
            vi: "Bốn sự kiện vệ tinh cung cấp đầu vào nguyên liệu (Trang Trí, Orichalcum, Cổ Ngữ, Thức Ăn Pet, Thể Lực) để người chơi dồn xả vào tuần lễ Đua Vũ Trang Bang Hội (GAR).",
            en: "The four satellite event groups supplying core upgrade materials (Decorations, Orichalcum, Runes, Pet Food, Stamina) to unleash during Guild Arms Race (GAR) week.",
          },
          annotations: [
            {
              kind: "do",
              label: {
                vi: "Đổi Hết Xu Lễ Hội Bắt Bướm Trước 23:59 UTC (06:59 Giờ VN) Ngày Cuối",
                en: "Spend 100% of Butterfly Catching Tokens Before 23:59 UTC on the Final Day",
              },
              detail: {
                vi: "Ưu tiên số 1 là Rương Trang Trí Thần Thoại và Mảnh Anh Hùng Vạn Năng; tuyệt đối không để xu hết hạn bị đổi thành Vàng.",
                en: "Top priorities are Mythic Decoration Chests and Universal Hero Shards; never let tokens expire into trivial Gold.",
              },
            },
            {
              kind: "info",
              label: {
                vi: "Nhận Rương Từ Pass Cự Ma $4.99 Nhưng Giữ Lại Chờ Ngày 3 GAR Mới Rèn",
                en: "Claim $4.99 Giant Raid Pass Chests But Hold Forging Until GAR Day 3",
              },
              detail: {
                vi: "Bấm nhận Orichalcum về túi ngay khi đạt Cấp 30 Pass, nhưng đợi đúng Thứ Tư của tuần GAR mới bấm nâng Trang Bị Lãnh Chúa.",
                en: "Claim your Orichalcum into your bag at Pass Tier 30, but wait until Wednesday of GAR week before upgrading Lord Gear.",
              },
            },
            {
              kind: "dont",
              label: {
                vi: "Cấm Xả Bụi Cổ Ngữ & Thức Ăn Pet Vào Mini-Rush Tuần Nghỉ Trước GAR",
                en: "Never Dump Rune Dust or Pet Food Into Off-Week Mini-Rushes Before GAR",
              },
              detail: {
                vi: "Giữ toàn bộ Bụi Cổ Ngữ cho Ngày 2 GAR và Thức Ăn Thú Cưng cho Ngày 5 GAR để ăn 3 tầng thưởng cùng lúc.",
                en: "Hold 100% of Rune Dust for GAR Day 2 and Pet Food for GAR Day 5 to capture 3 layers of rewards simultaneously.",
              },
            },
          ],
        },
      ],
      subSections: [
        {
          id: "sub-1-1-satellite-to-gar-supply-chain-diagram",
          title: {
            vi: "1.1. Sơ Đồ Chuỗi Cung Ứng Nguyên Liệu Từ Sự Kiện Vệ Tinh Vào 6 Ngày GAR",
            en: "1.1. Material Supply Chain Flowchart from Satellite Events Into 6-Day GAR",
          },
          badge: {
            vi: "Chuỗi Cung Ứng",
            en: "Supply Chain",
          },
          blocks: [
            {
              type: "visual_diagram",
              variant: "timeline_phases",
              title: {
                vi: "Cách Gom Nguyên Liệu Ở Sự Kiện Vệ Tinh Và Khớp Lệnh Xả Triple-Dip Trong Tuần GAR",
                en: "Harvesting Materials in Satellite Events & Executing Triple-Dip Dumps in GAR Week",
              },
              subtitle: {
                vi: "Biến mọi hoạt động cày cuốc hàng ngày thành điểm số nhân ba trong Đua Vũ Trang Bang Hội",
                en: "Converting daily satellite farming into triple-scored points during Guild Arms Race",
              },
              branches: [
                {
                  title: {
                    vi: "NGUỒN THU 1: LỄ HỘI BẮT BƯỚM & QUÂN ĐOÀN HẮC ÁM",
                    en: "SOURCE 1: BUTTERFLY CATCHING & DARK LEGION",
                  },
                  badge: {
                    vi: "Cày Miễn Phí",
                    en: "Free Farming",
                  },
                  tone: "emerald",
                  steps: [
                    {
                      id: "sat-flow-1",
                      title: {
                        vi: "Cày Trần Rơi Vợt Hàng Ngày & Tiếp Viện Đồng Minh Thủ Thành",
                        en: "Cap Daily Map Net Drops & Reinforce Allied Castles",
                      },
                      subtitle: {
                        vi: "Đổi lấy Trang Trí Thần Thoại, Mảnh Vạn Năng, Tinh Hoa Rồng và Mảnh Cổ Vật",
                        en: "Redeem Mythic Decorations, Universal Shards, Dragon Essence, and Relic Shards",
                      },
                      tone: "emerald",
                    },
                  ],
                  outcome: {
                    vi: "Cung cấp đạn dược cho Ngày 1 GAR (Tinh Hoa Rồng/Cổ Vật) và Ngày 4 GAR (Mảnh Tướng).",
                    en: "Supplies ammunition for GAR Day 1 (Dragon Essence/Relics) and GAR Day 4 (Hero Shards).",
                  },
                },
                {
                  title: {
                    vi: "NGUỒN THU 2: TẬP KÍCH CỰ MA & 50 LƯỢT AUTO-JOIN RALLY",
                    en: "SOURCE 2: GIANT TROLL RAID & 50X AUTO-JOIN RALLY",
                  },
                  badge: {
                    vi: "ROI Cao Nhất",
                    en: "Highest ROI",
                  },
                  tone: "gold",
                  steps: [
                    {
                      id: "sat-flow-2",
                      title: {
                        vi: "Treo Auto-Join 24/7 Đạt Cấp 30 Pass & Mở Nhánh $4.99 (Nếu Low-Spender)",
                        en: "Run 24/7 Auto-Join to Hit Pass Tier 30 & Unlock $4.99 Track (Low-Spender)",
                      },
                      subtitle: {
                        vi: "Tích trữ lượng lớn Orichalcum, Kim Loại Tinh Luyện, Chỉ Ma Thuật và Vũ Khí Độc Quyền",
                        en: "Stockpile massive Orichalcum, Refined Metal, Magic Thread, and Exclusive Weapons",
                      },
                      tone: "gold",
                    },
                  ],
                  outcome: {
                    vi: "Cung cấp 100% nguyên liệu rèn Trang Bị Lãnh Chúa để bùng nổ vào Ngày 3 GAR.",
                    en: "Provides 100% of Lord Gear forging materials to explode on GAR Day 3.",
                  },
                },
                {
                  title: {
                    vi: "ĐIỂM XẢ: KHỚP LỆNH TRIPLE-DIP (GAR + MINI-RUSH 2 NGÀY + CA 4 GIỜ)",
                    en: "DUMP POINT: TRIPLE-DIP SYNC (GAR + 2-DAY MINI-RUSH + 4H SPRINT)",
                  },
                  badge: {
                    vi: "Nhân 3 Phần Thưởng",
                    en: "3x Reward Sync",
                  },
                  tone: "emerald",
                  steps: [
                    {
                      id: "sat-flow-3",
                      title: {
                        vi: "Nhịn 100% Ở Tuần Nghỉ ➔ Chỉ Bấm Nâng Cấp Khi Cả 3 Bảng Cùng Bật Chủ Đề",
                        en: "Freeze 100% in Off-Weeks ➔ Only Click Upgrade When All 3 Boards Match",
                      },
                      subtitle: {
                        vi: "Ví dụ: Xả Cổ Ngữ vào Ngày 2 GAR lúc 06:00 UTC (13:00 Giờ VN) khi đang mở Mini-Rush Cổ Ngữ",
                        en: "Example: Dump Runes on GAR Day 2 at 06:00 UTC while the Rune Mini-Rush is active",
                      },
                      tone: "emerald",
                    },
                  ],
                  outcome: {
                    vi: "Thu về gấp 3 lần lượng Kim Cương và Tăng Tốc hoàn trả trên cùng 1 kho nguyên liệu.",
                    en: "Harvests 3x Diamond and Speedup rebates from the exact same material stockpile.",
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "sec-2-mini-rush-triple-dip-alignment",
      title: {
        vi: "2. Bảng Phối Hợp 8 Sự Kiện Đua Điểm Ngắn Hạn (Mini-Rushes) Với 6 Ngày GAR",
        en: "2. Synchronizing the 8 Rotating Mini-Rushes with the 6-Day GAR Schedule",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "Bảng đối chiếu dưới đây chỉ rõ **8 chủ đề Mini-Rush 2–3 ngày** phải được gộp vào đúng ngày nào của **Đua Vũ Trang Bang Hội (GAR)** và hành động bắt buộc khi chúng xuất hiện ở tuần nghỉ:",
            en: "The reference matrix below maps each of the **8 rotating 2–3 day Mini-Rushes** to its exact **Guild Arms Race (GAR)** dump day and defines the mandatory protocol during off-weeks:",
          },
        },
        {
          type: "callout",
          variant: "danger",
          title: {
            vi: "Cảnh Báo Đỏ: Tuyệt Đối Không Bị Lừa Bởi Mini-Rush Cuối Tuần Trước GAR!",
            en: "Red Alert: Never Fall for Weekend Mini-Rushes Right Before GAR!",
          },
          content: {
            vi: "Vào Thứ Sáu – Chủ Nhật của tuần Thi Đấu Hội (ngay trước khi bước sang Thứ Hai Ngày 1 của GAR), hệ thống rất hay mở Mini-Rush **Cổ Vật / Trang Bị Lãnh Chúa / Cổ Ngữ**. Ai xả kho lúc này sẽ mất trắng toàn bộ 9 rương x2 ở tuần GAR kế tiếp!",
            en: "On Friday–Sunday of Guild Race week (right before Monday GAR Day 1), the system frequently spawns **Relic / Lord Gear / Rune** Mini-Rushes. Dumping your bag here forfeits all 9 doubled chests in the upcoming GAR week!",
          },
        },
      ],
      subSections: [
        {
          id: "sub-2-1-eight-mini-rushes-alignment-table",
          title: {
            vi: "2.1. Bảng Ma Trận Khớp Lệnh 8 Mini-Rushes & Sự Kiện Vệ Tinh Vào Lịch 6 Ngày GAR",
            en: "2.1. Master Alignment Matrix: 8 Mini-Rushes & Satellites Mapped to GAR Days 1–6",
          },
          badge: {
            vi: "Ma Trận Triple-Dip",
            en: "Triple-Dip Matrix",
          },
          blocks: [
            {
              type: "table",
              caption: {
                vi: "Quy tắc khóa kho tuần lẻ và thời điểm xả gộp 3 tầng (Triple-Dip) cho toàn bộ các sự kiện phụ",
                en: "Off-week inventory freeze rules and Triple-Dip dump windows for all auxiliary and satellite events",
              },
              headers: [
                {
                  vi: "Nhóm Sự Kiện Phụ / Vệ Tinh",
                  en: "Mini-Rush / Satellite Group",
                },
                {
                  vi: "Hành Động Ở Tuần Nghỉ (Trước GAR)",
                  en: "Off-Week Action (Pre-GAR Week)",
                },
                {
                  vi: "Ngày Xả Chuẩn Trong Tuần Lễ GAR",
                  en: "Target Dump Day During GAR Week",
                },
              ],
              rows: [
                [
                  {
                    vi: "Mini-Rush Xây Dựng & Đột Phá Cổ Vật (Construction & Relics)",
                    en: "Construction & Relic Enhancement Mini-Rushes",
                  },
                  {
                    vi: "KHÓA KHO: Giữ toàn bộ Tinh Hoa Rồng, Mảnh Cổ Vật và Tăng Tốc Xây Dựng.",
                    en: "FREEZE: Hold 100% of Dragon Essence, Relic Shards, and Construction Speedups.",
                  },
                  {
                    vi: "Xả vào Ngày 1 GAR (Thứ Hai) lúc 02:00 UTC (09:00 Giờ VN) hoặc 14:00 UTC (21:00 Giờ VN).",
                    en: "Dump on GAR Day 1 (Monday) at 02:00 UTC or 14:00 UTC.",
                  },
                ],
                [
                  {
                    vi: "Mini-Rush Khoa Kỹ & Cổ Ngữ (Tech Research & Runes)",
                    en: "Tech Research & Rune Upgrade Mini-Rushes",
                  },
                  {
                    vi: "KHÓA KHO: Không mở Rương Cổ Ngữ và không tiêu Bụi Cổ Ngữ (Rune Dust) lẻ tẻ.",
                    en: "FREEZE: Do not open Rune Chests or spend Rune Dust off-schedule.",
                  },
                  {
                    vi: "Xả vào Ngày 2 GAR (Thứ Ba) lúc 06:00 UTC (13:00 Giờ VN) hoặc 18:00 UTC (01:00 Giờ VN).",
                    en: "Dump on GAR Day 2 (Tuesday) at 06:00 UTC or 18:00 UTC.",
                  },
                ],
                [
                  {
                    vi: "Mini-Rush Trang Bị Lãnh Chúa & Tập Kích Cự Ma (Lord Gear & Giant Raid)",
                    en: "Lord Gear Mini-Rush & Giant Troll Raid",
                  },
                  {
                    vi: "Cày đủ 30 cấp Pass Cự Ma lấy rương nguyên liệu về túi nhưng TUYỆT ĐỐI CHƯA BẤM RÈN.",
                    en: "Max all 30 Giant Raid Pass tiers and claim chests to bag, but DO NOT FORGE yet.",
                  },
                  {
                    vi: "Xả toàn bộ Orichalcum, Kim Loại & Chỉ Ma Thuật vào Ngày 3 GAR (Thứ Tư).",
                    en: "Dump all Orichalcum, Refined Metal & Magic Thread on GAR Day 3 (Wednesday).",
                  },
                ],
                [
                  {
                    vi: "Mini-Rush Chiêu Mộ & Tăng Sao Tướng (Hero Summon & Star-Up)",
                    en: "Hero Recruitment & Star-Up Mini-Rushes",
                  },
                  {
                    vi: "KHÓA KHO: Chỉ quay 1 lượt miễn phí/ngày; giữ nguyên mảnh Storm Maiden (mở Ngày 27).",
                    en: "FREEZE: Use only 1 free daily pull; keep Storm Maiden shards (from Day 27) locked.",
                  },
                  {
                    vi: "Xả toàn bộ Mảnh Tướng, Sách Kỹ Năng & Vé Chiêu Mộ vào Ngày 4 GAR (Thứ Năm) lúc 02:00 UTC (09:00 Giờ VN).",
                    en: "Dump all Hero Shards, Skill Books & Recruit Tokens on GAR Day 4 (Thursday) at 02:00 UTC.",
                  },
                ],
                [
                  {
                    vi: "Mini-Rush Luyện Lính & Thú Cưng (Troop Training & Pet Promotion)",
                    en: "Troop Training & Pet Promotion Mini-Rushes",
                  },
                  {
                    vi: "KHÓA KHO: Tích lũy Thức Ăn Pet, Tinh Hoa Pet và luyện sẵn lính bậc thấp (Pre-cook).",
                    en: "FREEZE: Stockpile Pet Food, Pet Essence, and pre-train lower-tier troop batches.",
                  },
                  {
                    vi: "Xả Promote lính + Nâng cấp Pet vào Ngày 5 GAR (Thứ Sáu) lúc 10:00 UTC (17:00 Giờ VN).",
                    en: "Promote troops + Upgrade Pets on GAR Day 5 (Friday) at 10:00 UTC.",
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: "sec-3-satellite-events-checklist",
      title: {
        vi: "3. Checklist Kiểm Soát Sự Kiện Vệ Tinh & Chống Thất Thoát Tài Nguyên Hàng Tuần",
        en: "3. Weekly Satellite Event Control & Loss-Prevention Checklist",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "Sử dụng bảng kiểm tra 5 điểm dưới đây mỗi tuần để đảm bảo bạn thu hoạch 100% phúc lợi từ các sự kiện vệ tinh mà không bao giờ bị mất xu hay xả nhầm nhịp:",
            en: "Use the 5-point checklist below every week to capture 100% of satellite event rewards without losing expiring tokens or dumping off-cycle:",
          },
        },
        {
          type: "checklist",
          checklistId: "s0-satellites-raid-readiness-v2",
          title: {
            vi: "Bảng Kiểm Tra 5 Bước Tối Ưu Sự Kiện Vệ Tinh (Bắt Bướm • Cự Ma • Hắc Ám)",
            en: "5-Step Satellite Event Optimization Checklist (Butterfly • Giant Raid • Dark Legion)",
          },
          items: [
            {
              id: "chk-sat-1",
              label: {
                vi: "Đã bật chế độ Auto-Join Rally (dùng Đạo 2/Đạo 3) mỗi ngày trước khi ngủ để lấy đủ 50 lượt thưởng Boss miễn phí thể lực.",
                en: "Enabled Auto-Join Rally (using March 2/3) daily before sleeping to cap all 50 free stamina Boss Rally rewards.",
              },
              detail: {
                vi: "Tự động tích lũy điểm Kinh Nghiệm Thợ Săn đạt Cấp 30 Pass Cự Ma mà không tốn Thể Lực cá nhân.",
                en: "Automatically caps Hunter Pass Tier 30 without spending personal Stamina.",
              },
            },
            {
              id: "chk-sat-2",
              label: {
                vi: "Trong sự kiện Lễ Hội Bắt Bướm: Đã đánh quái chạm trần rơi Vợt hàng ngày và đổi sạch xu lấy Trang Trí Thần Thoại + Mảnh Vạn Năng trước 23:59 UTC (06:59 Giờ VN) ngày cuối.",
                en: "During Butterfly Catching: Hit the daily monster net drop cap and redeemed all tokens for Mythic Decorations + Universal Shards before 23:59 UTC on the final day.",
              },
              detail: {
                vi: "Tránh bị hệ thống thu hồi xu sự kiện thành Vàng rẻ mạt khi đóng cửa hàng.",
                en: "Prevents seasonal exchange tokens from expiring into trivial Gold at shop closure.",
              },
            },
            {
              id: "chk-sat-3",
              label: {
                vi: "Trong Tập Kích Cự Ma: Đã cày đạt Cấp 30/30 Thẻ Thợ Săn và giữ nguyên toàn bộ Orichalcum nhận được chờ Ngày 3 của GAR.",
                en: "During Giant Troll Raid: Reached Hunter Pass Tier 30/30 and kept all claimed Orichalcum untouched until GAR Day 3.",
              },
              detail: {
                vi: "Dồn toàn bộ nguyên liệu rèn Trang Bị Lãnh Chúa vào Thứ Tư tuần GAR để ăn 9 rương x2.",
                en: "Funnel all Lord Gear forging materials into Wednesday of GAR week to claim 9 doubled chests.",
              },
            },
            {
              id: "chk-sat-4",
              label: {
                vi: "Trong Quân Đoàn Hắc Ám: Đã rút toàn bộ quân về thành trước giờ mở sóng và gửi 2 đạo quân đi Tiếp Viện (Reinforce) cho đồng minh đang online.",
                en: "During Dark Legion Siege: Recalled all marches before wave start and sent 2 marches to Reinforce online guildmates.",
              },
              detail: {
                vi: "Nhân đôi tốc độ tích điểm hạ gục cá nhân và bảo vệ thành viên yếu vượt qua Đợt 15–20.",
                en: "Doubles personal kill-point generation while protecting lower-power guildmates through Waves 15–20.",
              },
            },
            {
              id: "chk-sat-5",
              label: {
                vi: "Đã kiên quyết bỏ qua (chỉ ăn Rương 1 bằng lượt miễn phí) đối với mọi Mini-Rush Cổ Ngữ / Pet / Lord Gear xuất hiện ở tuần nghỉ trước GAR.",
                en: "Strictly skipped (claiming only Chest 1 via free actions) all Rune / Pet / Lord Gear Mini-Rushes appearing in the off-week before GAR.",
              },
              detail: {
                vi: "Bảo toàn 100% kho nguyên liệu để thực hiện Triple-Dip trong tuần lễ GAR.",
                en: "Preserves 100% of your material stockpile to execute a Triple-Dip during GAR week.",
              },
            },
          ],
        },
      ],
    },
  ],
  proSections: [
    {
      id: "sec-4-pro-expiration-vs-carryover-audit",
      isPro: true,
      title: {
        vi: "4. [PRO] Bảng Phân Loại Vật Phẩm Bị Thu Hồi vs. Bảo Lưu Vĩnh Viễn Toàn Bộ 10 Sự Kiện S0 ➔ GAR",
        en: "4. [PRO] Master Expiry vs. Permanent Carryover Audit Across All 10 S0 ➔ GAR Events",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "Để tránh hai sai lầm chết người — **(1) Để xu Lễ Hội hết hạn biến thành Vàng rẻ mạt** hoặc **(2) Hoảng loạn tiêu sạch Xu Xúc Xắc được phép bảo lưu** — hãy tra cứu bảng kiểm toán tổng hợp cho cả 10 sự kiện dưới đây:",
            en: "To prevent the two fatal mistakes — **(1) Letting seasonal exchange tokens expire into trivial Gold** or **(2) Panic-spending permanent Dice/Wheel Coins** — consult the master audit table for all 10 events below:",
          },
        },
      ],
      subSections: [
        {
          id: "sub-4-1-ten-events-expiry-audit-table",
          title: {
            vi: "4.1. Bảng Kiểm Toán Hạn Sử Dụng Tiền Tệ & Quy Tắc Đổi Cửa Hàng Cho 10 Sự Kiện S0 ➔ GAR",
            en: "4.1. Currency Expiry Audit & Shop Redemption Rules for All 10 S0 ➔ GAR Events",
          },
          badge: {
            vi: "Kiểm Toán 10 Event",
            en: "10-Event Audit",
          },
          blocks: [
            {
              type: "table",
              caption: {
                vi: "Phân loại dứt khoát nhóm tiền tệ bắt buộc tiêu sạch cuối kỳ và nhóm tiền tệ giữ lại tích lũy xuyên mùa",
                en: "Definitive classification of expiring currencies that must be spent vs. permanent currencies to hoard across cycles",
              },
              headers: [
                {
                  vi: "Phân Nhóm Tiền Tệ Sự Kiện",
                  en: "Event Currency Group",
                },
                {
                  vi: "Các Sự Kiện Áp Dụng (S0 ➔ GAR)",
                  en: "Applicable Events (S0 ➔ GAR)",
                },
                {
                  vi: "Quy Tắc Xử Lý Vào Ngày Cuối Sự Kiện",
                  en: "Mandatory Final-Day Protocol",
                },
              ],
              rows: [
                [
                  {
                    vi: "NHÓM 1: BỊ THU HỒI KHI ĐÓNG SHOP (Bắt Buộc Tiêu Sạch 100%)",
                    en: "GROUP 1: EXPIRES AT SHOP CLOSURE (Must Spend 100%)",
                  },
                  {
                    vi: "Lễ Hội Bắt Bướm (Butterfly Nets / Seasonal Tokens) & Các sự kiện thu thập rơi vật phẩm theo mùa lễ.",
                    en: "Butterfly Catching (Butterfly Nets / Seasonal Tokens) & Holiday Map-Drop Exchange Events.",
                  },
                  {
                    vi: "Đổi sạch 100% trước 23:59 UTC (06:59 Giờ VN) ngày cuối: Lấy Trang Trí Thần Thoại + Mảnh Vạn Năng, số xu lẻ cuối cùng đổi sang Gỗ/Thịt.",
                    en: "Spend 100% before 23:59 UTC on the final day: Redeem Mythic Decorations + Universal Shards first, then burn odd coins on resources.",
                  },
                ],
                [
                  {
                    vi: "NHÓM 2: BẢO LƯU VẬT PHẨM NHƯNG RESET THANH MỐC TÍCH LŨY",
                    en: "GROUP 2: ITEMS CARRY OVER BUT MILESTONE BAR RESETS",
                  },
                  {
                    vi: "Xúc Xắc Kho Báu (Storm Maiden / Desert Prince), Vòng Quay May Mắn (Lucky Wheel) & Hero Gacha.",
                    en: "Treasure Dice (Storm Maiden / Desert Prince), Lucky Wheel & Hero Gacha.",
                  },
                  {
                    vi: "Chỉ quay chạm mốc chẵn (30/60/100); tuyệt đối KHÔNG tiêu Xu Xúc Xắc / Xu Vòng Quay còn dư vào đồ rác Tier F — để chúng tự bảo lưu!",
                    en: "Roll strictly to exact milestones (30/60/100); NEVER spend leftover Dice/Wheel Coins on Tier F filler — let them carry over!",
                  },
                ],
                [
                  {
                    vi: "NHÓM 3: VÍ TIỀN TỆ VĨNH VIỄN & NGUYÊN LIỆU TÍCH KHO",
                    en: "GROUP 3: PERMANENT WALLET CURRENCIES & HOARDED MATERIALS",
                  },
                  {
                    vi: "Đua Vũ Trang (GAR), Thi Đấu Hội (Guild Race), Top Lord, Tập Kích Cự Ma, Quân Đoàn Hắc Ám & 8 Mini-Rushes.",
                    en: "Guild Arms Race (GAR), Guild Race, Top Lord, Giant Troll Raid, Dark Legion & 8 Mini-Rushes.",
                  },
                  {
                    vi: "Giữ sàn an toàn 6,000 Vinh Dự Bang mua Đá Linh Hồn Đỏ; gom toàn bộ Orichalcum, Tinh Hoa Rồng, Cổ Ngữ, Thức Ăn Pet xả đúng ngày chủ đề GAR.",
                    en: "Maintain the 6,000 Guild Honor floor for Red Soul Stones; bank all Orichalcum, Dragon Essence, Runes, and Pet Food for matching GAR days.",
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: "sec-5-pro-case-study-pre-gar-bait-trap",
      isPro: true,
      title: {
        vi: "5. [PRO] Hồ Sơ Thực Chiến: Giải Cứu Tài Khoản Khỏi Bẫy Mini-Rush Trước Thềm Tuần Lễ GAR",
        en: "5. [PRO] Tactical Case Study: Escaping the Pre-GAR Mini-Rush Bait Trap",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "Phân tích bài học thực tế về sự khác biệt một trời một vực giữa người chơi **sập bẫy xả kho vào Thứ Sáu tuần trước GAR** và người chơi **nhịn 4 ngày để xả Triple-Dip trong tuần GAR**:",
            en: "Real-world comparison illustrating the massive gap between a player who **falls for a Friday Mini-Rush before GAR** versus one who **waits 4 days to execute a Triple-Dip during GAR week**:",
          },
        },
        {
          type: "case_study",
          badge: {
            vi: "Chống Bẫy Mini-Rush",
            en: "Anti-Bait Discipline",
          },
          title: {
            vi: "Ca Bệnh Điển Hình: Xả Sạch 60,000 Bụi Cổ Ngữ & 40 Orichalcum Vào Mini-Rush Tuần Nghỉ",
            en: "Case Study: Dumping 60,000 Rune Dust & 40 Orichalcum Into an Off-Week Mini-Rush",
          },
          profileSummary: {
            vi: "Vào Thứ Sáu của tuần thứ 3 S0 (Ngày 25 S0 — chỉ còn 3 ngày nữa là bước vào Ngày 1 của GAR ở Ngày 28), hệ thống mở sự kiện đua điểm phụ 2 ngày 'Đột Phá Cổ Ngữ & Trang Bị'. Người chơi đang tích trữ được 60,000 Bụi Cổ Ngữ và 40 Orichalcum từ Pass Cự Ma.",
            en: "On Friday of S0 Week 3 (S0 Day 25 — just 3 days before GAR Day 1 launches on Day 28), a 2-day 'Rune & Gear Enhancement' Mini-Rush appears. The player holds 60,000 Rune Dust and 40 Orichalcum from the Giant Raid Pass.",
          },
          diagnostics: [
            {
              vi: "Thấy bảng xếp hạng Mini-Rush ngày đầu ít người đua nên nổi lòng tham xả sạch 60,000 Bụi Cổ Ngữ và 40 Orichalcum để tranh Top 5 nhận 1,000 Kim Cương.",
              en: "Seeing a quiet Day 1 Mini-Rush leaderboard, the player dumps all 60,000 Rune Dust and 40 Orichalcum to chase Top 5 for 1,000 Diamonds.",
            },
            {
              vi: "Đến Thứ Ba (Ngày 2 GAR — Tech & Runes) và Thứ Tư (Ngày 3 GAR — Boss Rally & Lord Gear) tuần kế tiếp, kho nguyên liệu bằng 0 nên chỉ mở được 3/9 rương cá nhân mỗi ngày.",
              en: "When Tuesday (GAR Day 2 — Tech & Runes) and Wednesday (GAR Day 3 — Boss Rally & Lord Gear) arrive next week, zero materials remain, unlocking only 3/9 personal chests per day.",
            },
          ],
          recoverySteps: [
            {
              stepNumber: "01",
              title: {
                vi: "Đóng Giao Diện Nâng Cấp Khi Thấy Mini-Rush Ở Ngày 24–27 S0",
                en: "Close the Upgrade Menu During Off-Week Mini-Rushes (S0 Days 24–27)",
              },
              detail: {
                vi: "Đóng giao diện nâng cấp ngay lập tức; chỉ nhận Rương Mốc 1 thông qua các lượt mở rương miễn phí hàng ngày.",
                en: "Close the upgrade menu immediately; claim only Chest 1 via free daily actions.",
              },
            },
            {
              stepNumber: "02",
              title: {
                vi: "Ngày 2 GAR (Thứ Ba 06:00 UTC / 13:00 Giờ VN): Xả Toàn Bộ 60,000 Bụi Cổ Ngữ",
                en: "GAR Day 2 (Tuesday 06:00 UTC): Dump All 60,000 Rune Dust",
              },
              detail: {
                vi: "Xả toàn bộ 60,000 Bụi Cổ Ngữ đúng lúc mở Ca 4 Giờ Nghiên Cứu/Cổ Ngữ để lấy trọn 9 Rương x2 Ngày 2 GAR + Rương Ca 4 Giờ.",
                en: "Dump all 60,000 Rune Dust during the 4-Hour Tech/Rune Sprint to sweep all 9 doubled GAR Day 2 chests + 4h Sprint chests.",
              },
            },
            {
              stepNumber: "03",
              title: {
                vi: "Ngày 3 GAR (Thứ Tư 12:00 UTC / 19:00 Giờ VN): Xả Toàn Bộ 40 Orichalcum Rèn Lord Gear",
                en: "GAR Day 3 (Wednesday 12:00 UTC): Dump All 40 Orichalcum Into Lord Gear",
              },
              detail: {
                vi: "Xả toàn bộ 40 Orichalcum nâng đều 6 món Trang Bị Lãnh Chúa để lấy trọn 9 Rương x2 Ngày 3 GAR + Top BXH Ngày 3.",
                en: "Dump all 40 Orichalcum across your 6 Lord Gear pieces to claim all 9 doubled GAR Day 3 chests + Top Daily Rank.",
              },
            },
          ],
          conclusion: {
            vi: "Thu về tổng cộng 4,500+ Kim Cương, 2,400 Tinh Hoa Rồng, 30 Mảnh Vạn Năng và Huân Chương Vũ Trang — gấp 4.2 lần tổng giá trị so với người xả sớm ở tuần nghỉ!",
            en: "Nets 4,500+ Diamonds, 2,400 Dragon Essence, 30 Universal Shards, and Arms Race Medals — 4.2x higher total value than dumping prematurely in the off-week!",
          },
        },
      ],
    },
  ],
};

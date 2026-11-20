import type { GuideArticle } from "../types";

export const ARTICLE_2_5_COUNTER_AND_POSITIONING: GuideArticle = {
  code: "2.5",
  displayCode: "2.5",
  slug: "counter-and-positioning",
  categorySlug: "factions",
  badge: "HOT",
  status: "published",
  readingMinutes: 12,
  title: {
    vi: "Cơ Chế Khắc Chế 20% & Nghệ Thuật Xếp Trận 6 Ô",
    en: "The 20% Counter Mechanics & Tactical 6-Slot Grid Positioning",
  },
  summary: {
    vi: "Cẩm nang chuyên sâu về nguyên lý Ma trận 6 ô (2×3 Grid), thuật toán khóa mục tiêu Targeting AI, vòng tròn tương khắc 3 hệ (+20% Dmg dealt, -20% Dmg taken), bảng thang kích hoạt Hào quang (3/4/5/6 tướng), nghệ thuật đảo ô PvP lật kèo 10%–18% lực chiến và biến thể kẹp 5+1 Flex.",
    en: "Comprehensive guide to the 6-Slot Combat Grid (2×3 Grid), Targeting AI logic, 3-Faction Counter Triangle (+20% Dmg dealt, -20% Dmg taken), Faction Aura milestones (3/4/5/6 heroes), PvP counter-swapping for 10%-18% combat power upsets, and 5+1 Flex hybrid formations.",
  },
  tldr: {
    coreRule: {
      vi: "**Nguyên lý Ma trận 6 Ô (`2×3 Grid`):** Hàng giữa (`Ô 3` & `Ô 4`) mới là pháo đài an toàn nhất cho **Hyper-Carry DPS**, tuyệt đối không phải Hàng sau! Luôn kích hoạt Hào quang đồng hệ tối thiểu mốc `5/6` hoặc `6/6` (`+25%` đến `+35% ATK & HP`) để tạo nền tảng chỉ số áp đảo.",
      en: "**6-Slot Combat Grid (`2×3 Grid`) Mechanics:** The Midline (`Slot 3` & `Slot 4`) is the true safest fortress for your **Hyper-Carry DPS**, NEVER the Backline! Always activate at least `5/6` or `6/6` Same-Faction Aura (`+25%` to `+35% ATK & HP`) to establish an overwhelming stat baseline.",
    },
    immediateAction: {
      vi: "**Quy tắc Đồng Trục Bảo Kê:** Luôn đặt **Hyper-Carry DPS** số 1 (`Pyromancer`, `Paragon`, `Storm Maiden`, `Wukong`, `Tidecaller`) ngay sau lưng **Main Tank** cứng nhất ở cùng một cột. Khi gặp đối thủ có lực chiến vượt trội trong PvP, áp dụng kỹ thuật Đảo Ô để khắc chế trục tấn công chính và kẹp biến thể `5+1 Flex`.",
      en: "**Same-Column Protection Rule:** Always position your #1 **Hyper-Carry DPS** (`Pyromancer`, `Paragon`, `Storm Maiden`, `Wukong`, `Tidecaller`) directly behind your primary **Main Tank** in the same column. When facing higher-CP opponents in PvP, deploy positional counter-swapping and 5+1 Flex hybrids.",
    },
    strictTaboo: {
      vi: "**Cấm kỵ đặt Carry máu giấy ở Hàng sau:** Tuyệt đối không xếp DPS chủ lực xuống `Ô 5` & `Ô 6` khi đối đầu với các sát thủ có kỹ năng nhảy tuyến sau (`Wukong`, `Storm Maiden`, `Windwalker`, `Headhunter`) vì chúng luôn ưu tiên bỏ qua Hàng giữa để hạ gục Hàng sau đầu tiên.",
      en: "**Squishy Carry Backline Taboo:** Never position fragile primary DPS heroes into `Slot 5` & `Slot 6` when facing backline diving assassins (`Wukong`, `Storm Maiden`, `Windwalker`, `Headhunter`), as they strictly bypass the Midline to burst the Backline first.",
    },
  },
  keyTakeaways: [
    {
      vi: "**Giải Phẫu Ma Trận 6 Ô (`2×3 Grid`):** Khóa Aggro trực diện theo cột đối diện. Khi `Ô 1` ngã xuống, tiền quân cánh trái sẽ tràn thẳng vào tấn công `Ô 3`. Hàng giữa là vùng an toàn nhất trước sát thương trực diện và miễn nhiễm với các pha nhảy sau ban đầu của sát thủ.",
      en: "**Anatomy of the 6-Slot Grid (`2×3 Grid`):** Direct melee Aggro locks by opposite column. If `Slot 1` falls, left-wing enemies advance directly into `Slot 3`. The Midline remains the safest zone from frontline melee and initial assassin dive paths.",
    },
    {
      vi: "**Vòng Tròn Tương Khắc `+20%` & Hào Quang `+35%`:** Chu trình `Liên Minh ➔ Thiên Nhiên ➔ Bộ Tộc ➔ Liên Minh` tạo độ lệch `+20% DMG` gây ra và `-20% DMG` nhận vào. Cộng hưởng với Hào quang thuần hệ 6 tướng `+35% ATK & HP` giúp đội hình thấp hơn lật ngược tình thế dễ dàng.",
      en: "**The `+20%` Counter Triangle & `+35%` Pure Aura:** The cycle `League ➔ Nature ➔ Horde ➔ League` creates a `+20% DMG` dealt and `-20% DMG` taken swing. Stacking this with the pure 6-hero aura of `+35% ATK & HP` enables decisive victories against raw stats.",
    },
    {
      vi: "**Nghệ Thuật Kẹp `5+1 Flex`:** Chấp nhận giảm từ `+35%` xuống `+25% ATK & HP` (mất `-10% Aura`) mang lại lợi tức chiến thuật khổng lồ khi kẹp quân bài đột biến như `Tidecaller` (1★ Trắng + Vũ khí độc quyền), `Witch` hoặc `Wukong` để phá vỡ thế trận.",
      en: "**The `5+1 Flex` Hybrid Art:** Trading down from `+35%` to `+25% ATK & HP` (sacrificing `-10% Aura`) yields massive net strategic value when flexing game-breaking picks like `Tidecaller` (1★ White + Exclusive Weapon), `Witch`, or `Wukong`.",
    },
    {
      vi: "**Đảo Ô PvP Lật Kèo `10%–18%` Lực Chiến:** Kết hợp đổi cột trực diện, bẫy sát thủ ở Hàng sau và nâng cấp Cấp độ Phe phái mốc `Lv.31➔40` (`+20.00% Queue HP`, tốn `1,181.162M Thịt` & `1,307 Mảnh`) giúp chiến thắng các đối thủ vượt `10%–18%` Lực chiến tại Đấu Trường.",
      en: "**PvP Swapping for `10%–18%` CP Upsets:** Combining direct column swaps, backline assassin baiting, and Faction Level `Lv.31➔40` (`+20.00% Queue HP`, costing `1,181.162M Meat` & `1,307 Shards`) reliably flips matches against opponents with `10%–18%` higher Combat Power.",
    },
  ],
  keywords: [
    "2×3 Grid",
    "ma trận 6 ô",
    "xếp trận 6 ô",
    "6-Slot Grid",
    "khắc chế 20%",
    "counter mechanics",
    "hào quang đồng hệ",
    "faction aura",
    "5+1 Flex",
    "đảo ô pvp",
    "positional swapping",
    "targeting ai",
    "vùng an toàn carry",
    "midline safe zone",
    "adjudicator",
    "pyromancer",
    "beastmaster",
    "wukong",
    "tidecaller",
  ],
  sourceFiles: [
    "docs/plans/2026-11-20-guides-v3-section-2-factions-master-plan.md",
    "tophub-web/src/content/guides/archive/legacy_groups/group-2/2.3-formation-and-counters.ts",
    "docs/06-game-guides/01-core-strategic-topics/topic-1-heroes-1queue-rule-epic-traits.md",
  ],
  relatedCalculatorSlugs: ["hero-traits", "hero-stars", "hero-awakening"],
  freeSections: [
    {
      id: "sec-1-six-slot-grid-mechanics",
      title: {
        vi: "1. Giải Phẫu Ma Trận 6 Ô (2×3 Grid) & Thuật Toán Khóa Mục Tiêu Targeting AI",
        en: "1. Anatomy of the 6-Slot Grid (2×3 Grid) & Targeting AI Algorithms",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "Trong Top Heroes, mọi trận chiến đều diễn ra trên bàn cờ **Ma trận 6 Ô** được tổ chức theo cấu trúc **3 Hàng × 2 Cột** (`2×3 Grid`: Cột Trái và Cột Phải). Thuật toán khóa mục tiêu (`Targeting AI`) tuân thủ nghiêm ngặt nguyên lý khóa Aggro trực diện theo cột và cơ chế nhảy tuyến sau của sát thủ.",
            en: "In Top Heroes, all combat unfolds on a **6-Slot Grid** arranged in a **3 Rows × 2 Columns** matrix (`2×3 Grid`: Left Column and Right Column). The automated Targeting AI strictly adheres to opposite-column direct Aggro locking and dedicated backline assassin dive rules.",
          },
        },
        {
          type: "callout",
          variant: "rule",
          title: {
            vi: "Quy Tắc Vàng: Aggro Trực Diện & Tuyến Sau Bị Ám Sát",
            en: "Golden Rule: Direct Aggro Locking & Backline Dive Target",
          },
          content: {
            vi: "**1. Khóa mục tiêu tiền quân:** Tiền quân địch luôn tấn công cận chiến vào tướng đối diện ở `Ô 1` (Trái-Trước) hoặc `Ô 2` (Phải-Trước). Nếu `Ô 1` tử trận, toàn bộ kẻ địch cánh trái sẽ lập tức tràn thẳng vào tấn công `Ô 3`.\n**2. Đường nhảy sát thủ:** Các sát thủ như `Wukong`, `Storm Maiden`, `Windwalker` và `Headhunter` sở hữu AI đặc biệt: bỏ qua hoàn toàn Hàng giữa để nhảy thẳng vào tấn công `Ô 5` hoặc `Ô 6` ngay đầu giao tranh.",
            en: "**1. Frontline Aggro Lock:** Enemy melee units always strike the hero directly facing them in `Slot 1` (Front-Left) or `Slot 2` (Front-Right). If `Slot 1` falls, all left-wing foes instantly march into `Slot 3`.\n**2. Assassin Dive Vector:** Assassins such as `Wukong`, `Storm Maiden`, `Windwalker`, and `Headhunter` possess unique AI that completely bypasses the Midline to dive directly into `Slot 5` or `Slot 6` at combat start.",
          },
        },
        {
          type: "visual_diagram",
          variant: "comparison_split",
          title: {
            vi: "Sơ Đồ Ma Trận 6 Ô (2×3 Grid Formation) & 2 Trục Chiến Lược",
            en: "6-Slot Grid Formation (2×3 Grid) & 2 Strategic Axes",
          },
          subtitle: {
            vi: "Trục Bảo Kê Chủ Lực (Cột Trái) vs Trục Đấu Sĩ & Khống Chế (Cột Phải) trước đòn đánh trực diện và sát thủ",
            en: "Main Carry Protection Axis (Left Column) vs Bruiser & Control Axis (Right Column) facing direct attacks and assassins",
          },
          branches: [
            {
              title: {
                vi: "Cột Trái: Trục Bảo Kê Hyper-Carry (Main Axis)",
                en: "Left Column: Hyper-Carry Protection Axis (Main Axis)",
              },
              badge: {
                vi: "TRỤC SINH TỒN CỐT LÕI",
                en: "CORE SURVIVAL AXIS",
              },
              tone: "emerald",
              steps: [
                {
                  id: "slot-1",
                  badge: {
                    vi: "Ô 1 • TRÁI - TRƯỚC",
                    en: "SLOT 1 • FRONT-LEFT",
                  },
                  title: {
                    vi: "Main Tanker Giữ Aggro",
                    en: "Main Tank Holding Aggro",
                  },
                  subtitle: {
                    vi: "Tướng: Adjudicator, Beastmaster, Monk, Rose Princess. Hấp thụ 100% sát thương cánh trái.",
                    en: "Heroes: Adjudicator, Beastmaster, Monk, Rose Princess. Absorbs 100% left-wing damage.",
                  },
                  tone: "emerald",
                },
                {
                  id: "slot-3",
                  badge: {
                    vi: "Ô 3 • TRÁI - GIỮA",
                    en: "SLOT 3 • MID-LEFT",
                  },
                  title: {
                    vi: "Pháo Đài Hyper-Carry DPS",
                    en: "Hyper-Carry DPS Fortress",
                  },
                  subtitle: {
                    vi: "Tướng: Pyromancer, Storm Maiden, Tidecaller, Paragon. An toàn tuyệt đối sau lưng Ô 1.",
                    en: "Heroes: Pyromancer, Storm Maiden, Tidecaller, Paragon. Maximally protected behind Slot 1.",
                  },
                  tone: "emerald",
                },
                {
                  id: "slot-5",
                  badge: {
                    vi: "Ô 5 • TRÁI - SAU",
                    en: "SLOT 5 • BACK-LEFT",
                  },
                  title: {
                    vi: "Main Healer Tuyến Hỗ Trợ",
                    en: "Main Healer Support Line",
                  },
                  subtitle: {
                    vi: "Tướng: Nun, Witch, Forest Maiden. Trang bị Mũ & Giáp HP/DEF để chịu sát thủ nhảy vào.",
                    en: "Heroes: Nun, Witch, Forest Maiden. Equipped with HP/DEF gear to survive assassin dives.",
                  },
                  tone: "slate",
                },
              ],
              outcome: {
                vi: "Kết quả Trục Trái: Hyper-Carry tại Ô 3 được xả kỹ năng tự do chừng nào Main Tank Ô 1 còn trụ vững.",
                en: "Left Axis Outcome: Hyper-Carry in Slot 3 unleashes full skill rotations as long as Slot 1 Main Tank stands.",
              },
            },
            {
              title: {
                vi: "Cột Phải: Trục Đấu Sĩ & Khống Chế (Disruption Axis)",
                en: "Right Column: Bruiser & Disruption Axis",
              },
              badge: {
                vi: "TRỤC PHẢN ĐÒN & PHÁ RỐI",
                en: "DISRUPTION & COUNTER AXIS",
              },
              tone: "gold",
              steps: [
                {
                  id: "slot-2",
                  badge: {
                    vi: "Ô 2 • PHẢI - TRƯỚC",
                    en: "SLOT 2 • FRONT-RIGHT",
                  },
                  title: {
                    vi: "Off-Tank / Bruiser Khống Chế",
                    en: "Off-Tank / CC Bruiser",
                  },
                  subtitle: {
                    vi: "Tướng: Desert Prince, Ne Zha, Sage, Secret Keeper. Gây áp lực và tung hiệu ứng khống chế CC.",
                    en: "Heroes: Desert Prince, Ne Zha, Sage, Secret Keeper. Pressures frontline and delivers crowd control.",
                  },
                  tone: "gold",
                },
                {
                  id: "slot-4",
                  badge: {
                    vi: "Ô 4 • PHẢI - GIỮA",
                    en: "SLOT 4 • MID-RIGHT",
                  },
                  title: {
                    vi: "Sub-DPS / Triệu Hồi Sư",
                    en: "Sub-DPS / Summoner Support",
                  },
                  subtitle: {
                    vi: "Tướng: Pixie, Bishop, Wukong, Astrologer. Hỗ trợ dồn sát thương và gọi đệ chia lửa.",
                    en: "Heroes: Pixie, Bishop, Wukong, Astrologer. Supplies secondary burst and minion shields.",
                  },
                  tone: "gold",
                },
                {
                  id: "slot-6",
                  badge: {
                    vi: "Ô 6 • PHẢI - SAU",
                    en: "SLOT 6 • BACK-RIGHT",
                  },
                  title: {
                    vi: "Buffer & Trạm Đảo Vị Trí",
                    en: "Buffer & Flex Swap Anchor",
                  },
                  subtitle: {
                    vi: "Tướng: Bard, Warlock, Soulmancer, Artificer, Petalis. Buff năng lượng và sẵn sàng bẫy sát thủ.",
                    en: "Heroes: Bard, Warlock, Soulmancer, Artificer, Petalis. Team battery ready for tactical swaps.",
                  },
                  tone: "blue",
                },
              ],
              outcome: {
                vi: "Kết quả Trục Phải: Duy trì áp lực khống chế diện rộng, hỗ trợ chia lửa cho Ô 1 và làm trạm đảo ô linh hoạt.",
                en: "Right Axis Outcome: Sustains area crowd control, relieves pressure from Slot 1, and acts as flex swap anchor.",
              },
            },
          ],
        },
      ],
    },
    {
      id: "sec-2-gold-positioning-map",
      title: {
        vi: "2. Bản Đồ Vị Trí Vàng: Phân Bổ Tanker, Hyper-Carry DPS & Support",
        en: "2. The Golden Positioning Map: Deploying Tankers, Hyper-Carry DPS & Support",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "Sai lầm phổ biến nhất của 80% người chơi mới là **đặt tướng DPS máu giấy ở Hàng sau (`Ô 5` & `Ô 6`)** với suy nghĩ tuyến sau luôn an toàn. Trên thực tế, thiết kế bàn cờ của Top Heroes tạo ra một cấu trúc hoàn toàn ngược lại.",
            en: "The most common blunder made by 80% of new commanders is placing squishy DPS carries in the Backline (`Slot 5` & `Slot 6`) assuming it is sheltered. In truth, Top Heroes combat geometry dictates the exact opposite.",
          },
        },
        {
          type: "table",
          caption: {
            vi: "Bảng Phân Bổ Chiến Thuật Ma Trận 6 Ô (2×3 Grid)",
            en: "6-Slot Combat Grid Tactical Deployment Matrix",
          },
          headers: [
            { vi: "Vị Trí Ô", en: "Slot Position" },
            { vi: "Phân Tầng & Vai Trò", en: "Tier & Tactical Role" },
            { vi: "Tướng Khuyên Dùng", en: "Recommended Heroes" },
            { vi: "Lý Do Bố Trí & Lưu Ý Sống Còn", en: "Deployment Rationale & Survival Rule" },
          ],
          rows: [
            [
              { vi: "Ô 1 (Trái-Trước)", en: "Slot 1 (Front-Left)" },
              { vi: "Frontline • Main Tanker", en: "Frontline • Main Tanker" },
              { vi: "Adjudicator, Beastmaster, Monk, Rose Princess", en: "Adjudicator, Beastmaster, Monk, Rose Princess" },
              { vi: "Chịu 100% sát thương trực diện cánh trái; bắt buộc có khiên chắn hoặc bất tử để che cho Ô 3.", en: "Absorbs 100% left-wing direct attacks; requires shields or invulnerability to shield Slot 3." },
            ],
            [
              { vi: "Ô 2 (Phải-Trước)", en: "Slot 2 (Front-Right)" },
              { vi: "Frontline • Off-Tank / Bruiser", en: "Frontline • Off-Tank / Bruiser" },
              { vi: "Desert Prince, Ne Zha, Sage, Secret Keeper", en: "Desert Prince, Ne Zha, Sage, Secret Keeper" },
              { vi: "Chia sẻ áp lực tiền quân, tung hiệu ứng khống chế cứng (Choáng, Đóng băng, Hất tung).", en: "Shares frontline load, executes hard crowd control (Stun, Freeze, Knockup)." },
            ],
            [
              { vi: "Ô 3 (Trái-Giữa)", en: "Slot 3 (Mid-Left)" },
              { vi: "Midline • #1 Hyper-Carry DPS", en: "Midline • #1 Hyper-Carry DPS" },
              { vi: "Pyromancer, Paragon, Storm Maiden, Tidecaller", en: "Pyromancer, Paragon, Storm Maiden, Tidecaller" },
              { vi: "Vị trí an toàn nhất bàn cờ; được Ô 1 che chắn cận chiến và miễn nhiễm đòn nhảy sau ban đầu.", en: "Safest position on the board; shielded by Slot 1 from melee and immune to initial assassin dives." },
            ],
            [
              { vi: "Ô 4 (Phải-Giữa)", en: "Slot 4 (Mid-Right)" },
              { vi: "Midline • Sub-DPS / Summoner", en: "Midline • Sub-DPS / Summoner" },
              { vi: "Pixie, Bishop, Wukong, Astrologer", en: "Pixie, Bishop, Wukong, Astrologer" },
              { vi: "Chi viện sát thương thứ cấp hoặc triệu hồi sinh vật chắn đòn bổ sung cho tuyến đầu.", en: "Supplies secondary burst or spawns minions to intercept breakthrough damage." },
            ],
            [
              { vi: "Ô 5 (Trái-Sau)", en: "Slot 5 (Back-Left)" },
              { vi: "Backline • Main Healer / Target Zone", en: "Backline • Main Healer / Target Zone" },
              { vi: "Nun, Witch, Forest Maiden", en: "Nun, Witch, Forest Maiden" },
              { vi: "Tâm điểm nhảy vào của sát thủ; bắt buộc trang bị Mũ & Giáp cấp cao để sống sót bơm máu.", en: "Target zone for assassin leaps; requires top-tier Helmet & Armor to sustain heals." },
            ],
            [
              { vi: "Ô 6 (Phải-Sau)", en: "Slot 6 (Back-Right)" },
              { vi: "Backline • Buffer / Tactical Swapper", en: "Backline • Buffer / Tactical Swapper" },
              { vi: "Bard, Warlock, Soulmancer, Artificer, Petalis", en: "Bard, Warlock, Soulmancer, Artificer, Petalis" },
              { vi: "Cung cấp buff tốc đánh, hồi nộ và là chốt chặn đảo vị trí linh hoạt khi cần bẫy đối phương.", en: "Provides attack speed, energy recharge, and acts as the prime pivot for tactical baiting." },
            ],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: {
            vi: "Mẹo Thực Chiến: Quy Tắc Đồng Trục Bảo Kê",
            en: "Combat Tip: Same-Column Protection Rule",
          },
          content: {
            vi: "Luôn đặt **Hyper-Carry số 1** ở `Ô 3` ngay sau lưng **Main Tank cứng nhất** tại `Ô 1`. Nếu bạn đổi Main Tank sang `Ô 2`, hãy lập tức chuyển Carry sang `Ô 4` để đảm bảo trục che chắn không bao giờ bị lệch tâm.",
            en: "Always place your **#1 Hyper-Carry** in `Slot 3` right behind your **sturdiest Main Tank** in `Slot 1`. If you move your Main Tank to `Slot 2`, immediately move your Carry to `Slot 4` to keep the protection axis aligned.",
          },
        },
      ],
    },
    {
      id: "sec-3-counter-triangle-and-auras",
      title: {
        vi: "3. Vòng Tròn Khắc Chế 20% & Bảng Thang Kích Hoạt Hào Quang Đồng Hệ",
        en: "3. The 20% Counter Triangle & Same-Faction Aura Activation Scaling",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "Sức mạnh thực chiến trong Top Heroes không đơn thuần là con số Lực chiến (Combat Power) hiển thị trên màn hình. Hai cơ chế số học cốt lõi quyết định kết quả trận đấu là **Vòng tròn khắc chế 3 Hệ** và **Thang kích hoạt Hào quang đồng hệ**.",
            en: "Combat effectiveness in Top Heroes extends far beyond displayed Combat Power. The two definitive mathematical pillars governing engagement outcomes are the **3-Faction Counter Triangle** and the **Same-Faction Aura Scaling**.",
          },
        },
        {
          type: "callout",
          variant: "danger",
          title: {
            vi: "Vòng Tròn Tương Khắc 3 Hệ: +20% Sát Thương & -20% Chịu Đòn",
            en: "The 3-Faction Counter Triangle: +20% Dealt & -20% Taken",
          },
          content: {
            vi: "Chu trình tương khắc bất biến: **Liên Minh ➔ Thiên Nhiên ➔ Bộ Tộc ➔ Liên Minh**.\n• Khi phe bạn khắc chế phe địch: Nhận ngay **`+20% DMG` gây ra** và **`-20% DMG` nhận vào** từ mọi nguồn sát thương.\n• Độ chênh lệch thực tế tạo ra tương đương **`~40%` lợi thế giao tranh**, giải thích tại sao Bộ Tộc có thể dễ dàng đè bẹp các đội hình Liên Minh có lực chiến vượt trội.",
            en: "The ironclad counter cycle: **League ➔ Nature ➔ Horde ➔ League**.\n• When your faction counters the enemy: Gain **`+20% DMG` dealt** and **`-20% DMG` taken** across all sources.\n• This generates a net swing of **`~40%` combat advantage**, explaining why Horde commanders consistently overpower higher-rating League lineups.",
          },
        },
        {
          type: "table",
          caption: {
            vi: "Thang Kích Hoạt Hào Quang Đồng Hệ (Same-Faction Aura)",
            en: "Same-Faction Aura Buff Progression Milestones",
          },
          headers: [
            { vi: "Số Lượng Tướng Cùng Phe", en: "Same-Faction Hero Count" },
            { vi: "Chỉ Số Hào Quang Nhận Được", en: "Aura Stat Multiplier" },
            { vi: "Mô Hình Đội Hình Phù Hợp", en: "Lineup Composition Model" },
            { vi: "Đánh Giá Thực Chiến SSoT", en: "Combat Evaluation" },
          ],
          rows: [
            [
              { vi: "3 Tướng Cùng Phe", en: "3 Same-Faction Heroes" },
              { vi: "+10% ATK & HP", en: "+10% ATK & HP" },
              { vi: "Đội hình hỗn hợp 3+3 hoặc 3+2+1", en: "Hybrid 3+3 or 3+2+1 Lineups" },
              { vi: "Rất yếu; chỉ chấp nhận trong 3 ngày đầu mở server khi chưa có đủ tướng.", en: "Extremely weak; only acceptable in first 3 server days when lacking hero copies." },
            ],
            [
              { vi: "4 Tướng Cùng Phe", en: "4 Same-Faction Heroes" },
              { vi: "+15% ATK & HP", en: "+15% ATK & HP" },
              { vi: "Đội hình 4+2 quá độ", en: "Transitional 4+2 Lineups" },
              { vi: "Tạm ổn ở tuần đầu; bị áp đảo nặng nề khi đối đầu với đội hình 5 hoặc 6 tướng.", en: "Passable early on; severely outclassed when clashing against 5 or 6-hero auras." },
            ],
            [
              { vi: "5 Tướng Cùng Phe", en: "5 Same-Faction Heroes" },
              { vi: "+25% ATK & HP", en: "+25% ATK & HP" },
              { vi: "Đội hình kẹp linh hoạt 5+1 Flex", en: "Flexible 5+1 Flex Lineups" },
              { vi: "Điểm cân bằng vàng: Mất -10% chỉ số so với thuần hệ nhưng nhận lại kỹ năng khống chế đột biến.", en: "Golden balance point: Sacrifices -10% stats for game-changing utility skills." },
            ],
            [
              { vi: "6 Tướng Thuần Hệ", en: "6 Pure-Faction Heroes" },
              { vi: "+35% ATK & HP", en: "+35% ATK & HP" },
              { vi: "Đội hình thuần hệ tối thượng (Pure 6)", en: "Ultimate Pure 6 Lineups" },
              { vi: "Đỉnh cao sức mạnh chỉ số; áp đảo toàn diện các đội hình lai ghép có lực chiến ảo.", en: "Peak raw power; thoroughly overwhelms hybrid teams carrying inflated ratings." },
            ],
          ],
        },
      ],
    },
    {
      id: "sec-4-positional-swapping-and-flex",
      title: {
        vi: "4. Nghệ Thuật Đảo Ô Khắc Chế PvP (Swapping) & Đội Hình Kẹp 5+1 Flex",
        en: "4. Tactical Positional Swapping in PvP & 5+1 Flex Hybrid Lineups",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "Tại Đấu Trường PvP, sự khác biệt giữa game thủ cao cấp và người chơi thông thường nằm ở khả năng **đọc đội hình đối phương và Đảo Ô trước giờ xuất trận**. Với việc điều chỉnh đúng vị trí 6 ô và áp dụng bài toán kẹp `5+1 Flex`, bạn hoàn toàn có thể lật kèo đối thủ hơn `10%–18%` Lực chiến.",
            en: "In the PvP Arena, the defining line between master tacticians and casual players lies in the ability to **scout enemy formations and execute positional swapping before battle**. By fine-tuning grid slots and deploying 5+1 Flex variants, overcoming a 10%-18% Combat Power deficit becomes routine.",
          },
        },
        {
          type: "list",
          ordered: true,
          items: [
            {
              vi: "**Đảo Cột Đối Trực Trực Diện (Mirror Column Swap):** Nhận diện vị trí Hyper-Carry của địch (thường nằm ở `Ô 3` hoặc `Ô 4`). Đảo ngay Main Tank cứng nhất của bạn (`Adjudicator`, `Beastmaster`, `Monk`) sang thẳng cột đó ở `Ô 1` hoặc `Ô 2` để hứng trọn loạt chiêu dồn sát thương đầu tiên.",
              en: "**Mirror Column Counter-Swap:** Identify the enemy Hyper-Carry location (typically in `Slot 3` or `Slot 4`). Move your sturdiest Main Tank (`Adjudicator`, `Beastmaster`, `Monk`) directly into that opposing column (`Slot 1` or `Slot 2`) to absorb the opening burst.",
            },
            {
              vi: "**Bẫy Sát Thủ Hàng Sau (Anti-Assassin Baiting):** Khi đối đầu đội hình có `Wukong`, `Storm Maiden` hoặc `Windwalker`, tuyệt đối không để Support máu giấy ở `Ô 5` hoặc `Ô 6`. Hoán đổi một Đấu sĩ/Off-Tank trâu bò (`Desert Prince`, `Rose Princess`, `Ne Zha`) xuống `Ô 5`/`Ô 6` để làm mồi nhử biến sát thủ địch thành bia tập bắn.",
              en: "**Anti-Assassin Backline Baiting:** When facing squads fielding `Wukong`, `Storm Maiden`, or `Windwalker`, never leave squishy buffers in `Slot 5` or `Slot 6`. Swap a resilient Off-Tank or Bruiser (`Desert Prince`, `Rose Princess`, `Ne Zha`) into the backline to turn diving assassins into easy targets.",
            },
            {
              vi: "**Biến Thể Kẹp 5+1 Flex Đột Biến:** Giảm từ `+35%` xuống `+25%` (mất đúng `-10% ATK & HP`), nhưng đổi lấy 1 quân bài đột biến có khả năng đảo chiều giao tranh:\n• Kẹp `Tidecaller` (1★ Trắng + Vũ khí độc quyền): Tung đại dương khống chế đóng băng toàn bộ bàn cờ.\n• Kẹp `Witch`: Hút máu diện rộng, giải trừ khống chế và hồi phục sinh lực.\n• Kẹp `Wukong`: Phân thân quấy rối và bắt chết hàng sau đối thủ.",
              en: "**Game-Breaking 5+1 Flex Hybrid Pick:** Accepting a drop from `+35%` to `+25%` (trading `-10% ATK & HP`), but gaining an asymmetric game-changer:\n• Flex `Tidecaller` (1★ White + Exclusive Weapon): Unleashes massive tidal wave freezing the entire board.\n• Flex `Witch`: Global lifesteal, crowd-control cleanse, and persistent sustain.\n• Flex `Wukong`: Illusions, disruption, and devastating backline assassination.",
            },
            {
              vi: "**Cộng Hưởng Cấp Độ Phe Phái (`Lv.31➔40`):** Khi chạm mốc `Lv.31➔40`, Đội hình nhận thêm **`+20.00% Queue HP`** (tiêu tốn `1,181.162M Thịt` & `1,307 Mảnh phe`). Lượng máu bổ sung khổng lồ này kết hợp cùng Đảo Ô giúp các tướng trụ vững qua đợt dồn sát thương đầu tiên để lật kèo thắng áp đảo.",
              en: "**Faction Level Synergy (`Lv.31➔40`):** Reaching `Lv.31➔40` grants an extra **`+20.00% Queue HP`** (costing `1,181.162M Meat` & `1,307 Shards`). This colossal health pool combined with positional swapping ensures survival through the opening burst for decisive comebacks.",
            },
          ],
        },
      ],
    },
    {
      id: "sec-5-meta-lineup-templates-and-calculators",
      title: {
        vi: "5. Đội Hình Mẫu Chuẩn 6 Ô & Cầu Nối TopHub Calculators",
        en: "5. Standard 6-Slot Lineup Templates & TopHub Calculator Suite",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "Dưới đây là 3 mẫu đội hình 6 ô chuẩn mực nhất qua các mùa giải dành cho Liên Minh, Bộ Tộc và Thiên Nhiên, đảm bảo tối đa hóa Hào quang và bảo vệ Hyper-Carry ở vị trí an toàn nhất:",
            en: "Below are the three premier 6-slot formation templates across all seasons for League, Horde, and Nature, maximizing Aura benefits while locking Hyper-Carries in absolute safety:",
          },
        },
        {
          type: "table",
          caption: {
            vi: "3 Đội Hình Mẫu Chuẩn 6 Ô Cho 3 Đại Phe",
            en: "Standard 6-Slot Formation Templates for All 3 Factions",
          },
          headers: [
            { vi: "Hệ Phái", en: "Faction" },
            { vi: "Hàng Trước (Ô 1 - Ô 2)", en: "Frontline (Slots 1 - 2)" },
            { vi: "Hàng Giữa (Ô 3 - Ô 4)", en: "Midline (Slots 3 - 4)" },
            { vi: "Hàng Sau (Ô 5 - Ô 6)", en: "Backline (Slots 5 - 6)" },
            { vi: "Phong Cách Tác Chiến", en: "Combat Archetype" },
          ],
          rows: [
            [
              { vi: "Liên Minh (League)", en: "League" },
              { vi: "Ô 1: Adjudicator • Ô 2: Rose Princess", en: "Slot 1: Adjudicator • Slot 2: Rose Princess" },
              { vi: "Ô 3: Pyromancer • Ô 4: Paragon", en: "Slot 3: Pyromancer • Slot 4: Paragon" },
              { vi: "Ô 5: Nun • Ô 6: Bard / Bishop", en: "Slot 5: Nun • Slot 6: Bard / Bishop" },
              { vi: "Khiên Bất Tử, Bạo kích dồn dập và xả chiêu diện rộng AoE liên hoàn.", en: "Immortal Shields, burst critical damage, and relentless AoE skill bombardment." },
            ],
            [
              { vi: "Bộ Tộc (Horde)", en: "Horde" },
              { vi: "Ô 1: Beastmaster • Ô 2: Desert Prince", en: "Slot 1: Beastmaster • Slot 2: Desert Prince" },
              { vi: "Ô 3: Storm Maiden • Ô 4: Wukong", en: "Slot 3: Storm Maiden • Slot 4: Wukong" },
              { vi: "Ô 5: Witch • Ô 6: Soulmancer / Warlock", en: "Slot 5: Witch • Slot 6: Soulmancer / Warlock" },
              { vi: "Hồi máu bền bỉ, xuất huyết, phản đòn và sát thương đơn mục tiêu diệt Boss.", en: "Sustained lifesteal, bleed ticks, damage reflect, and single-target boss execution." },
            ],
            [
              { vi: "Thiên Nhiên (Nature)", en: "Nature" },
              { vi: "Ô 1: Monk • Ô 2: Ne Zha", en: "Slot 1: Monk • Slot 2: Ne Zha" },
              { vi: "Ô 3: Tidecaller • Ô 4: Pixie", en: "Slot 3: Tidecaller • Slot 4: Pixie" },
              { vi: "Ô 5: Forest Maiden • Ô 6: Petalis / Sage", en: "Slot 5: Forest Maiden • Slot 6: Petalis / Sage" },
              { vi: "Chuỗi khống chế diện rộng, độc bào mòn sinh lực DoT và leo Tháp Nguyên Tố.", en: "Mass crowd control chains, poison DoT attrition, and Element Tower domination." },
            ],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: {
            vi: "Cầu Nối Trực Tiếp: Tối Ưu Hóa Bộ Chỉ Số Cùng TopHub Calculators",
            en: "Direct Bridge: Optimize Tactical Stats with TopHub Calculators",
          },
          content: {
            vi: "Để hoàn thiện đội hình 6 ô với hiệu quả chiến đấu cao nhất, hãy sử dụng ngay bộ công cụ tính toán độc quyền của TopHub:\n• **[Máy tính Thiên Phú](/calculators/hero-traits):** Tra cứu và phân bổ điểm thiên phú tối ưu cho từng vị trí Tanker, Carry và Support.\n• **[Máy tính Nâng Sao](/calculators/hero-stars):** Tính chính xác số lượng mảnh tướng cần thiết để chạm mốc an toàn `1★ Đỏ` (160 mảnh) và tối ưu `1★ Trắng` (560 mảnh).\n• **[Máy tính Thức Tỉnh](/calculators/hero-awakening):** Hoạch định lộ trình tích lũy `9 Hồn Đá Đỏ` (`360,000` Điểm Vinh Dự) chuẩn SSoT.",
            en: "To perfect your 6-slot lineup with peak combat efficiency, explore the official TopHub Calculator Suite:\n• **[Hero Traits Calculator](/calculators/hero-traits):** Calculate optimal talent trait distributions for Tankers, Carries, and Supports.\n• **[Hero Stars Calculator](/calculators/hero-stars):** Accurately plan hero shard investments to reach the `1★ Red` (160 shards) and `1★ White` (560 shards) milestones.\n• **[Hero Awakening Calculator](/calculators/hero-awakening):** Plan your `9 Red Soul Stones` (`360,000` Guild Honor) progression roadmap with SSoT precision.",
          },
        },
      ],
    },
  ],
  proSections: [],
};

export default ARTICLE_2_5_COUNTER_AND_POSITIONING;

import type { GuideArticle } from "../../types";

export const ARTICLE_7_4_TROOP_SKINS_AND_MEDALS: GuideArticle = {
  code: "7.4",
  displayCode: "8.4",
  slug: "troop-skins-and-medals",
  categorySlug: "economy",
  badge: "PRO",
  readingMinutes: 16,
  title: {
    vi: "Ngoại Hình Quân Lính & Tối Ưu Huy Chương Vinh Quang (Troop Skins & Glory Medals Lv.1–50)",
    en: "Troop Skins & Glory Medals Optimization Guide (Lv.1–50 Cost & Breakpoints)",
  },
  summary: {
    vi: "Giải mã cơ chế Hiệu ứng Đeo Trực Tiếp (Equipped Active Effect) vs Chỉ số Sở Hữu Vĩnh Viễn (Owned Passive Bonus) của 11 nhóm Ngoại hình Quân lính (Troop Skins), kỷ luật Ngưỡng Đóng Băng 15,000–30,000 Huy Chương Vinh Quang trong Medal Shop, bảng chi phí 34 mốc Lv.1–Lv.50 (+ Honor Level 1–150) theo tỷ lệ 4:2:1 và lộ trình Điểm Gãy Vàng Lv.10 / Lv.20.",
    en: "Complete guide to Troop Skins and Glory Medals: Equipped Active Effects vs Owned Passive Bonuses across all 11 core Troop Skin groups, the 15,000–30,000 Glory Medal safety floor in the Medal Shop, full 34-row Lv.1–50 (+ Honor Level 1–150) 4:2:1 cost matrix, and the Lv.10 / Lv.20 Staircase ROI Breakpoint math.",
  },
  tldr: {
    coreRule: {
      vi: "**Chỉ Số Sở Hữu Vĩnh Viễn (Owned Passive Bonus)**: Đạt `+14.38%` ATK / `+21.46%` HP cho Skin Vàng, `+11.49%` ATK / `+19.24%` HP cho Skin Tím, `+6.45%` ATK / `+14.49%` HP cho Xanh.\n• **Cộng dồn `100%` toàn tài khoản**: Tự động cộng cho toàn bộ binh lính của mọi đội hình ngay khi mở khóa mà không cần đeo.",
      en: "**Permanent Owned Passive Bonus**: Grants `+14.38%` ATK / `+21.46%` HP for Legendary, `+11.49%` ATK / `+19.24%` HP for Epic, and `+6.45%` ATK / `+14.49%` HP for Rare.\n• **`100%` Global Stacking**: Automatically stacks across all soldiers in every queue upon unlocking without being equipped.",
    },
    immediateAction: {
      vi: "**Duy trì Ngưỡng Đóng Băng `15,000–30,000` Glory Medals**: Giữ sẵn trong Medal Shop để mở khóa ngay Quân trang Xanh (`15,000` Shield Soldier, Cavalry) và Tím (`30,000` Bearskin Warrior).\n• **Nâng bậc thang `Lv.10` / `Lv.20`**: Kéo đồng đều mọi Skin chạm Điểm Gãy `Lv.10` (`80,400` / `40,200` / `20,100`) rồi `Lv.20` (`948,400–1,155,400` / `474,200–577,700`).",
      en: "**Maintain a `15,000–30,000` Glory Medals Safety Floor**: Reserve in the Medal Shop to unlock Rare (`15,000` Shield Soldier, Cavalry) and Epic (`30,000` Bearskin Warrior) skins.\n• **Staircase `Lv.10` / `Lv.20` Breakpoints**: Push all owned skins evenly to `Lv.10` (`80,400` / `40,200` / `20,100`) and `Lv.20` (`948,400–1,155,400` / `474,200–577,700`).",
    },
    strictTaboo: {
      vi: "**CẤM đập lẻ 1 Skin Vàng thẳng lên `Lv.40–Lv.50`**: Tốn `10,960,400` ➔ `20,845,400` Medals trong khi các Skin khác vẫn nằm ở `Lv.1`.\n• **Cấm chọn sớm Desert Knight**: Nếu định xoay Đội 1 sang Bộ Lạc (Divine Spirit) hoặc Thiên Nhiên (Tree Spirit), bắt buộc chọn Heavy Cavalry đầu tiên!",
      en: "**NEVER rush 1 Legendary Skin straight to `Lv.40–Lv.50`**: Costs `10,960,400` ➔ `20,845,400` Medals while leaving other owned skins at `Lv.1`.\n• **Never pick Desert Knight early**: If pivoting Queue 1 to Horde (Divine Spirit) or Nature (Tree Spirit), always pick Heavy Cavalry first!",
    },
  },
  keyTakeaways: [
    {
      vi: "**Hai tầng sức mạnh độc lập tại Medal Hall**: Hiệu ứng Đeo Trực Tiếp (giới hạn `1` Skin/Đội hình, cộng tới `+28%` ATK, `+56%` HP Lính và kỹ năng PvP/PvE/Rally).\n• **Chỉ số Sở Hữu Vĩnh Viễn (Owned Bonus)**: Cộng dồn vô hạn cho mọi hàng đợi, đạt `+14.38%` ATK / `+21.46%` HP (Vàng) và `+11.49%` ATK / `+19.24%` HP (Tím).",
      en: "**Two Independent Power Layers in Medal Hall**: Equipped Active Effect (limit `1` skin/queue, up to `+28%` ATK, `+56%` HP, and PvP/PvE/Rally mechanics).\n• **Owned Passive Bonus**: Stacks infinitely across all queues, reaching `+14.38%` ATK / `+21.46%` HP (Legendary) and `+11.49%` ATK / `+19.24%` HP (Epic).",
    },
    {
      vi: "**Xếp hạng 11 nhóm Ngoại hình Quân lính chủ lực**: Heavy Cavalry là Top 1 Đa dụng S++ (`+11.2%` công thành, `+70%` tốc chạy); Divine Spirit, Desert Knight và Tree Spirit chuyên biệt 3 hệ.\n• **Trụ cột PvP/Rally & F2P**: Brave Fighter, Skeleton Soldier, Honor Guard & Siege Vehicle cho PvP/Rally; Samurai, Bearskin Warrior, Logistic Follower và Shield Soldier tối ưu cho F2P.",
      en: "**Tier List of 11 Core Troop Skin Groups**: Heavy Cavalry is #1 universal S++ (`+11.2%` siege, `+70%` march speed); Divine Spirit, Desert Knight, and Tree Spirit are faction specialists.\n• **PvP/Rally & F2P Pillars**: Brave Fighter, Skeleton Soldier, Honor Guard & Siege Vehicle cover PvP/Rally; Samurai, Bearskin Warrior, Logistic Follower, and Shield Soldier anchor F2P.",
    },
    {
      vi: "**Tỷ lệ Chi phí `4:2:1` & Điểm Gãy `Lv.10` / `Lv.20`**: Tại `Lv.10` ★ tốn `80,400` / `40,200` / `20,100` Medals; tại `Lv.20` ★★ tốn `948,400` ➔ `1,155,400` (Vàng) và `474,200` ➔ `577,700` (Tím).\n• **Mốc `Lv.30–40`**: `Lv.30` ★★★ tốn `4,259,400` ➔ `4,791,400` (Vàng); `Lv.40` ★★★★ tốn `10,960,400` ➔ `11,832,400` (Vàng).\n• **Mốc `Lv.50` & Honor `150`**: `Lv.50` tốn `20,845,400` / `10,422,700` / `5,211,350`; Honor `150` đạt `28,345,400` / `14,172,700` / `7,086,350`.",
      en: "**The `4:2:1` Cost Ratio & `Lv.10` / `Lv.20` Breakpoints**: `Lv.10` ★ costs `80,400` / `40,200` / `20,100` Medals; `Lv.20` ★★ costs `948,400` ➔ `1,155,400` (SSR) and `474,200` ➔ `577,700` (Epic).\n• **`Lv.30–40` Milestones**: `Lv.30` ★★★ costs `4,259,400` ➔ `4,791,400` (SSR); `Lv.40` ★★★★ costs `10,960,400` ➔ `11,832,400` (SSR).\n• **`Lv.50` & Honor `150`**: `Lv.50` hits `20,845,400` / `10,422,700` / `5,211,350`; Honor `150` totals `28,345,400` / `14,172,700` / `7,086,350`.",
    },
    {
      vi: "**Chứng minh ngân sách `2,500,000` Glory Medals**: Phân bổ bậc thang `2,411,200` Medals (`1` Heavy Cavalry `Lv.20` = `948,400` + `3` Tím `Lv.20` = `1,422,600` + `2` Xanh `Lv.10` = `40,200`).\n• **Lợi tức gấp `~3.2x`**: Giữ lại `88,800` Medals đóng băng, kích hoạt `6` mốc Sao và đạt tổng ATK/HP Toàn quân gấp `~3.2` lần so với đập `1` Skin lên `Lv.25`.",
      en: "**`2,500,000` Glory Medals Benchmark Proof**: Staircase allocation of `2,411,200` Medals (`1` Heavy Cavalry `Lv.20` = `948,400` + `3` Epics `Lv.20` = `1,422,600` + `2` Rares `Lv.10` = `40,200`).\n• **`~3.2x` Higher Global ROI**: Keeps `88,800` Medals frozen, unlocks `6` Star milestones, and yields `~3.2x` higher soldier ATK/HP than rushing `1` skin to `Lv.25`.",
    },
  ],
  keywords: [
    "huy chuong vinh quang",
    "huy chương vinh quang",
    "glory medals",
    "ngoai hinh quan linh",
    "ngoại hình quân lính",
    "quan trang",
    "quân trang",
    "troop skins",
    "medal shop",
    "cua hang huan chuong",
    "cửa hàng huân chương",
    "medal hall",
    "sanh huan chuong",
    "heavy cavalry",
    "divine spirit",
    "desert knight",
    "tree spirit",
    "brave fighter",
    "skeleton soldier",
    "honor guard",
    "siege vehicle",
    "samurai",
    "bearskin warrior",
    "logistic follower",
    "shield soldier",
    "honor level 150",
  ],
  sourceFiles: [
    "docs/06-game-guides/07-standardized-web-guides/group-7-shops-and-economy/7.4-troop-skins-and-medals.md",
    "docs/06-game-guides/01-core-strategic-topics/topic-5-shops-currencies-military-gear.md",
    "docs/06-game-guides/03-data-tables-and-mechanics/topheroes-tables-analysis-summary.md",
  ],
  freeSections: [
    {
      id: "overview-and-mechanics",
      title: {
        vi: "1. Cơ Chế Cốt Lõi: Hai Tầng Sức Mạnh & Bảng Xếp Hạng 11 Nhóm Ngoại Hình Quân Lính Chủ Lực",
        en: "1. Core Mechanics: Dual Power Layers & Complete 11 Core Troop Skin Groups Tier List",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "**Vai trò cốt lõi của Binh lính**: Trong Top Heroes, binh lính đi kèm các vị tướng đóng góp tỷ trọng rất lớn vào tổng sát thương và máu thực tế của toàn đội hình.\n• **Hai tầng chỉ số tại Medal Hall**: Hệ thống Ngoại Hình Quân Lính dùng Glory Medals để mở khóa và nâng cấp 2 tầng hiệu ứng hoàn toàn độc lập dưới đây.",
            en: "**Core Role of Soldiers**: In Top Heroes, soldiers marching alongside your heroes contribute a massive share of your queue's total damage and effective HP.\n• **Dual Stat Layers in Medal Hall**: The Troop Skins system uses Glory Medals to unlock and upgrade two completely independent stat layers below.",
          },
        },
        {
          type: "list",
          ordered: true,
          items: [
            {
              vi: "**Hiệu Ứng Đeo Trực Tiếp (Equipped Active Effect)**: Giới hạn `1` Skin/Đội hình; cộng tới `+28%` ATK, `+56%` HP Lính Vàng (`+21%` ATK, `+42%` HP Tím) và kỹ năng đặc thù PvP/Boss PvE/Rally.",
              en: "**Equipped Active Effect (1 Skin per Queue)**: Grants direct stats to the wearing queue (`+28%` ATK, `+56%` HP on Legendary; `+21%` ATK, `+42%` HP on Epic) plus tactical PvP/PvE/Rally skills.",
            },
            {
              vi: "**Chỉ Số Sở Hữu Vĩnh Viễn (Owned Passive Bonus)**: Cộng dồn `100%` toàn tài khoản khi mở khóa (`+14.38%` ATK / `+21.46%` HP Vàng, `+11.49%` ATK / `+19.24%` HP Tím) và nhảy vọt tại mốc Sao `Lv.10–50`.",
              en: "**Owned Passive Bonus (Infinite Global Stacking)**: Permanently stacks `100%` across all queues upon unlock (`+14.38%` ATK / `+21.46%` HP SSR, `+11.49%` ATK / `+19.24%` HP Epic) and surges at `Lv.10–50`.",
            },
          ],
        },
        {
          type: "media_spotlight",
          mediaCode: "MED-7.4-01",
          tier: "tier2_annotated_ui",
          title: {
            vi: "Giải Phẫu Giao Diện Sảnh Huân Chương (Medal Hall): Equipped Effect vs Owned Passive Bonus",
            en: "Medal Hall UI Anatomy: Equipped Active Effect vs Owned Passive Bonus",
          },
          description: {
            vi: "Ảnh chụp màn hình giao diện Medal Hall / Troop Skin Upgrade khoanh vùng 2 tầng chỉ số độc lập và bộ thẻ Ngoại hình Quân lính chuẩn hóa (Heavy Cavalry, Divine Spirit, Desert Knight, Tree Spirit, Samurai, Bearskin Warrior, Shield Soldier).",
            en: "Annotated Medal Hall / Troop Skin Upgrade interface highlighting the two independent stat zones alongside standardized Troop Skin cards (Heavy Cavalry, Divine Spirit, Desert Knight, Tree Spirit, Samurai, Bearskin Warrior, Shield Soldier).",
          },
          annotations: [
            {
              kind: "do",
              label: {
                vi: "Khu vực 1 — Owned Bonus / Total Soldier Bonus (Cộng dồn Vĩnh viễn Toàn Tài khoản)",
                en: "Zone 1 — Owned Bonus / Total Soldier Bonus (Permanent Account-Wide Stacking)",
              },
              detail: {
                vi: "Dòng chỉ số Owned Bonus (+14.38% ATK / +21.46% HP ở Skin Vàng max, +11.49% ATK / +19.24% HP ở Skin Tím max) tự động cộng vào tổng lực chiến của cả 3 Đội hình ngay khi mở khóa và nâng mốc Sao Lv.10 / Lv.20.",
                en: "The Owned Bonus line (+14.38% ATK / +21.46% HP on maxed Legendary skins, +11.49% ATK / +19.24% HP on maxed Epic skins) permanently applies to all 3 queues upon unlocking and hitting Lv.10 / Lv.20 Star milestones.",
              },
            },
            {
              kind: "info",
              label: {
                vi: "Khu vực 2 — Equipped Active Effect (Chỉ tác dụng cho 1 Đội hình đang đeo)",
                en: "Zone 2 — Equipped Active Effect (Applies Only to the Single Equipped Queue)",
              },
              detail: {
                vi: "Hiệu ứng đeo trực tiếp (+28% ATK / +56% HP Lính Vàng cùng kỹ năng đặc thù như Heavy Cavalry +70% tốc chạy PvP hay Bearskin Warrior +49% ATK PvE) chỉ kích hoạt cho hàng đợi đang gắn thẻ Quân trang đó.",
                en: "The Equipped Active Effect (+28% ATK / +56% HP on Legendary skins plus tactical passives like Heavy Cavalry's +70% PvP march speed or Bearskin Warrior's +49% PvE Boss ATK) only applies to the specific queue wearing that skin.",
              },
            },
            {
              kind: "dont",
              label: {
                vi: "Không chọn Desert Knight (Liên Minh) ở Rương Tự Chọn Vàng đầu tiên nếu định xoay hệ",
                en: "Never Pick Desert Knight (League) from Your First Legendary Choice Chest If Pivoting",
              },
              detail: {
                vi: "Rương Tự Chọn Quân Trang Vàng đầu tiên bắt buộc phải chọn Heavy Cavalry (đa dụng S++ cho cả 3 hệ). Nếu chọn sớm Desert Knight rồi sang Giữa Game đổi sang Bộ Lạc (Divine Spirit) hoặc Thiên Nhiên (Tree Spirit), dòng +16.8% HP Lính Liên Minh khi đeo sẽ bị vô hiệu hóa hoàn toàn.",
                en: "Your first Legendary Troop Skin Choice Chest must always go to Heavy Cavalry (S++ universal across all 3 factions). Picking Desert Knight early and later pivoting to Horde (Divine Spirit) or Nature (Tree Spirit) completely wastes its League-locked +16.8% Soldier HP active effect.",
              },
            },
          ],
        },
        {
          type: "table",
          caption: {
            vi: "Bảng 1.1: Xếp Hạng & Thông Số Chi Tiết 11 Nhóm Ngoại Hình Quân Lính Chủ Lực (Chuẩn TopHeroes Tables — Level Max)",
            en: "Table 1.1: Complete Tier List & Max-Level Profiles of the 11 Core Troop Skin Groups (TopHeroes Tables SSoT)",
          },
          headers: [
            { vi: "Phẩm Chất", en: "Rarity" },
            { vi: "Tên Quân Trang (VI / EN)", en: "Troop Skin Name (EN / VI)" },
            { vi: "Chỉ Số Sở Hữu (Owned Bonus Max)", en: "Owned Passive Bonus (Max)" },
            { vi: "Hiệu Ứng Đeo Trực Tiếp (Equipped Active Effect Max)", en: "Equipped Active Effect (Max)" },
            { vi: "Đánh Giá Chiến Thuật & Định Hướng 3 Phe Phái", en: "Tactical Tier & 3-Faction Guidance" },
          ],
          rows: [
            [
              { vi: "Vàng (Legendary)", en: "Legendary (SSR)" },
              {
                vi: "Kỵ Binh Hạng Nặng (Heavy Cavalry)",
                en: "Heavy Cavalry",
              },
              {
                vi: "+14.38% ATK / +21.46% HP Toàn bộ Lính",
                en: "+14.38% ATK / +21.46% HP All Soldiers",
              },
              {
                vi: "Đội đeo: +28% ATK, +56% HP Lính; +11.2% Sát thương khi công thành; +70% Tốc độ hành quân PvP.",
                en: "Equipped queue: +28% ATK, +56% HP; +11.2% siege damage when attacking castles; +70% PvP march speed.",
              },
              {
                vi: "TOP 1 ĐA DỤNG TOÀN GAME (S++ Tier): Dùng hoàn hảo cho mọi Phe phái (Liên Minh, Bộ Lạc, Thiên Nhiên). Có Rương Tự Chọn Vàng đầu tiên bắt buộc chọn Heavy Cavalry vì đổi hệ Đội 1 cũng không bao giờ bị phế!",
                en: "#1 UNIVERSAL SKIN IN THE GAME (S++ Tier): Works flawlessly for every faction (League, Horde, Nature). Always pick Heavy Cavalry from your first Legendary Choice Chest — it never becomes obsolete even if you switch factions!",
              },
            ],
            [
              { vi: "Vàng (Legendary)", en: "Legendary (SSR)" },
              {
                vi: "Thần Linh Bộ Lạc (Divine Spirit)",
                en: "Divine Spirit",
              },
              {
                vi: "+14.38% ATK / +21.46% HP Toàn bộ Lính",
                en: "+14.38% ATK / +21.46% HP All Soldiers",
              },
              {
                vi: "Lính Bộ Lạc đội đeo: +28% ATK, +56% HP, +4.2% Morale (Nhuệ khí); khi đủ 6 tướng Bộ Lạc nhận thêm +16.8% HP Lính Bộ Lạc.",
                en: "Equipped Horde soldiers: +28% ATK, +56% HP, +4.2% Morale; deploying 6 Horde heroes grants an additional +16.8% Horde Soldier HP.",
              },
              {
                vi: "TOP 1 CHUYÊN BIỆT BỘ LẠC (S+ Tier): Best-in-Slot cho Đội 1 Thuần Bộ Lạc (5 Mythic Horde) ở Giữa và Cuối Game.",
                en: "#1 HORDE SPECIALIST (S+ Tier): Best-in-Slot equipped skin for a pure Horde Queue 1 (5 Mythic Horde) in Mid and Late Game.",
              },
            ],
            [
              { vi: "Vàng (Legendary)", en: "Legendary (SSR)" },
              {
                vi: "Hiệp Sĩ Sa Mạc (Desert Knight / Peloton)",
                en: "Desert Knight / Peloton",
              },
              {
                vi: "+14.38% ATK / +21.46% HP Toàn bộ Lính",
                en: "+14.38% ATK / +21.46% HP All Soldiers",
              },
              {
                vi: "Lính Liên Minh đội đeo: +28% ATK, +56% HP, +4.2% Morale; khi đủ 6 tướng Liên Minh nhận thêm +16.8% HP Lính Liên Minh.",
                en: "Equipped League soldiers: +28% ATK, +56% HP, +4.2% Morale; deploying 6 League heroes grants an additional +16.8% League Soldier HP.",
              },
              {
                vi: "CHUYÊN BIỆT LIÊN MINH (S Tier cho Pure League): Rất mạnh nếu kiên định chơi Thuần Liên Minh đến cuối game. Cấm chọn nếu định chuyển sang Bộ Lạc ở Ngày 21–41!",
                en: "LEAGUE SPECIALIST (S Tier for Pure League): Extremely strong for dedicated Pure League mains. Never pick if you plan to pivot to Horde at Day 21–41!",
              },
            ],
            [
              { vi: "Vàng (Legendary)", en: "Legendary (SSR)" },
              {
                vi: "Tinh Linh Cây (Tree Spirit)",
                en: "Tree Spirit",
              },
              {
                vi: "+14.38% ATK / +21.46% HP Toàn bộ Lính",
                en: "+14.38% ATK / +21.46% HP All Soldiers",
              },
              {
                vi: "Lính Thiên Nhiên đội đeo: +28% ATK, +56% HP, +4.2% Morale; khi đủ 6 tướng Thiên Nhiên nhận thêm +16.8% HP Lính Thiên Nhiên.",
                en: "Equipped Nature soldiers: +28% ATK, +56% HP, +4.2% Morale; deploying 6 Nature heroes grants an additional +16.8% Nature Soldier HP.",
              },
              {
                vi: "CHUYÊN BIỆT THIÊN NHIÊN (S Tier cho Pure Nature): Best-in-Slot cho Đội 1 Thuần Thiên Nhiên (Tidecaller + Monk + Pixie).",
                en: "NATURE SPECIALIST (S Tier for Pure Nature): Best-in-Slot equipped skin for a pure Nature Queue 1 (Tidecaller + Monk + Pixie).",
              },
            ],
            [
              { vi: "Vàng (Legendary)", en: "Legendary (SSR)" },
              {
                vi: "Chiến Binh Dũng Cảm (Brave Fighter)",
                en: "Brave Fighter",
              },
              {
                vi: "+14.38% ATK / +21.46% HP Toàn bộ Lính",
                en: "+14.38% ATK / +21.46% HP All Soldiers",
              },
              {
                vi: "Đội đeo: +28% ATK, +56% HP Lính; giảm 21% hao hụt nhuệ khí sau mỗi trận; tăng giới hạn diệt đội hình liên tiếp thêm +7 trong PvP.",
                en: "Equipped queue: +28% ATK, +56% HP; reduces post-battle Morale decay by 21%; increases consecutive PvP kill streak cap by +7.",
              },
              {
                vi: "TRÙM QUÉT CHUỖI PVP / KVK (S+ Tier): Cực mạnh khi thủ trụ, thủ thành hoặc càn quét nhiều đội hình liên tiếp trong chiến trường.",
                en: "PVP / KVK STREAK SWEEPER (S+ Tier): Dominant when garrisoning structures, defending castles, or chaining multi-queue sweeps on the battlefield.",
              },
            ],
            [
              { vi: "Vàng (Legendary)", en: "Legendary (SSR)" },
              {
                vi: "Chiến Binh Xương (Skeleton Soldier)",
                en: "Skeleton Soldier",
              },
              {
                vi: "+14.38% ATK / +21.46% HP Toàn bộ Lính",
                en: "+14.38% ATK / +21.46% HP All Soldiers",
              },
              {
                vi: "Đội đeo: +28% ATK, +56% HP Lính, cộng thêm +7% ATK Lính; khi Tập hợp (Rally) giảm 14% nhuệ khí khởi đầu của kẻ địch.",
                en: "Equipped queue: +28% ATK, +56% HP, plus +7% bonus Soldier ATK; when joining a Rally, reduces enemy starting Morale by 14%.",
              },
              {
                vi: "VŨ KHÍ TẬP HỢP BANG HỘI (S Tier): Bắt buộc phải có ít nhất 1 thành viên trong đoàn Rally đeo Skeleton Soldier để debuff -14% Morale của đối phương.",
                en: "GUILD RALLY DEBUFFER (S Tier): Mandatory for at least one member in every guild Rally to apply the -14% enemy starting Morale debuff.",
              },
            ],
            [
              { vi: "Vàng (Legendary)", en: "Legendary (SSR)" },
              {
                vi: "Vệ Binh Danh Dự (Honor Guard) & Xe Công Thành (Siege Vehicle / Balloon)",
                en: "Honor Guard & Siege Vehicle / Balloon",
              },
              {
                vi: "+14.38% ATK / +21.46% HP Toàn bộ Lính",
                en: "+14.38% ATK / +21.46% HP All Soldiers",
              },
              {
                vi: "Honor Guard: +14% Giảm sát thương khi thủ thành. Siege Vehicle: +11.2% Sát thương quái Ruin/Throne, diệt thêm +70% lính doanh trại khi thắng PvP.",
                en: "Honor Guard: +14% Damage Reduction when defending castle. Siege Vehicle: +11.2% damage vs Ruin/Throne guards, kills +70% more barracks troops on PvP victory.",
              },
              {
                vi: "TÌNH HUỐNG ĐẶC BIỆT (A+ Tier): Honor Guard dùng để thủ nhà dưới áp lực lớn; Siege Vehicle dùng để tàn sát lính địch trong ngày Kill Event.",
                en: "SITUATIONAL SPECIALISTS (A+ Tier): Equip Honor Guard for heavy castle defense; equip Siege Vehicle to maximize troop kills during Kill Event.",
              },
            ],
            [
              { vi: "Tím (Epic)", en: "Epic (SR)" },
              {
                vi: "Võ Sĩ Samurai (Samurai)",
                en: "Samurai",
              },
              {
                vi: "+11.49% ATK / +19.24% HP Toàn bộ Lính",
                en: "+11.49% ATK / +19.24% HP All Soldiers",
              },
              {
                vi: "Đội đeo: +21% ATK, +42% HP Lính; tăng thêm +49% ATK Lính khi tấn công Lâu đài địch (Castle Invasions).",
                en: "Equipped queue: +21% ATK, +42% HP; grants an extra +49% Soldier ATK during Castle Invasions.",
              },
              {
                vi: "TOP 1 SKIN TÍM CÔNG THÀNH (S+ Epic): Khi chưa có Heavy Cavalry, Samurai là Quân trang đeo số 1 để đi đốt nhà trong ngày Thứ Bảy KvK.",
                en: "#1 EPIC SIEGE SKIN (S+ Epic): Before unlocking Heavy Cavalry, Samurai is the #1 equipped skin for burning enemy castles on KvK Saturday.",
              },
            ],
            [
              { vi: "Tím (Epic)", en: "Epic (SR)" },
              {
                vi: "Chiến Binh Da Gấu / Gấu Chiến (Bearskin Warrior / Battle Bear)",
                en: "Bearskin Warrior / Battle Bear",
              },
              {
                vi: "+11.49% ATK / +19.24% HP Toàn bộ Lính",
                en: "+11.49% ATK / +19.24% HP All Soldiers",
              },
              {
                vi: "Đội đeo: +21% ATK, +42% HP Lính; tăng thêm +49% ATK Lính trong các trận đánh Quái/Boss trên Bản đồ Thế giới (World Map PvE).",
                en: "Equipped queue: +21% ATK, +42% HP; grants an extra +49% Soldier ATK against World Map PvE Monsters and Bosses.",
              },
              {
                vi: "TOP 1 SKIN TÍM SĂN BOSS (S+ Epic): Bán trực tiếp trong Medal Shop giá 30,000 Medals. Bắt buộc mua và đeo mỗi khi đánh Boss Thế Giới, Rồng Đen, Yeti và Rally quái!",
                en: "#1 EPIC BOSS HUNTER (S+ Epic): Sold directly in the Medal Shop for 30,000 Medals. Mandatory purchase and swap whenever hitting World Bosses, Black Dragon, Yeti, and monster Rallies!",
              },
            ],
            [
              { vi: "Tím (Epic)", en: "Epic (SR)" },
              {
                vi: "Đội Hậu Cần (Logistic Follower) & Đội Trống (Drum Corps) & Quản Gia (Elegant Butler)",
                en: "Logistic Follower & Drum Corps & Elegant Butler",
              },
              {
                vi: "+11.49% ATK / +19.24% HP Toàn bộ Lính",
                en: "+11.49% ATK / +19.24% HP All Soldiers",
              },
              {
                vi: "Logistic Follower: +28% HP riêng & +7% HP Lính cho toàn đoàn Rally (Cộng dồn được!). Drum Corps: +3.5% Morale đoàn Rally. Elegant Butler: +56% HP khi thủ thành.",
                en: "Logistic Follower: +28% self HP & stackable +7% Soldier HP for the entire Rally! Drum Corps: +3.5% Rally Morale. Elegant Butler: +56% HP when defending castle.",
              },
              {
                vi: "HỖ TRỢ ĐỘI 2/3 & RALLY (A Tier): Đặc biệt Logistic Follower cực kỳ bá đạo khi cả bang cùng đeo đi Rally vì hiệu ứng +7% HP Lính được phép cộng dồn nhiều người!",
                en: "QUEUE 2/3 & RALLY SUPPORT (A Tier): Logistic Follower is exceptionally strong when multiple guild members equip it in a Rally, as its +7% Rally Soldier HP stacks across joiners!",
              },
            ],
            [
              { vi: "Xanh (Rare)", en: "Rare (R)" },
              {
                vi: "Lính Khiên (Shield Soldier) & Kỵ Binh Nhẹ (Cavalry)",
                en: "Shield Soldier & Cavalry",
              },
              {
                vi: "+6.45% ATK / +14.49% HP Toàn bộ Lính",
                en: "+6.45% ATK / +14.49% HP All Soldiers",
              },
              {
                vi: "Shield Soldier: +52% Tải trọng thu hoạch tài nguyên. Cavalry: +85% Tốc độ hành quân PvP.",
                en: "Shield Soldier: +52% resource gathering load capacity. Cavalry: +85% PvP march speed.",
              },
              {
                vi: "CÔNG CỤ CHUYÊN DỤNG (A Tier): Bán trong Medal Shop giá 15,000 Medals. Đeo Shield Soldier cho Đội 2/3 đi đào mỏ ngày Thứ Tư!",
                en: "SPECIALIZED UTILITY TOOLS (A Tier): Sold in the Medal Shop for 15,000 Medals. Equip Shield Soldier on Queue 2/3 for resource gathering marches!",
              },
            ],
          ],
        },
      ],
    },
    {
      id: "f2p-core-rules",
      title: {
        vi: "2. Kỷ Luật Quản Trị Cửa Hàng Huân Chương (Medal Shop) & Quy Tắc Đổi Skin Thực Chiến Cho F2P / Low-Spender",
        en: "2. Medal Shop Freeze Discipline & Tactical Skin-Swapping Rules for F2P / Low-Spenders",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "**Nguồn cung Huy chương hữu hạn**: Đối với F2P và Low-Spender, lượng Glory Medals hàng tuần từ chiến trường, bang hội và mốc sự kiện là có giới hạn.\n• **Quản trị dòng tiền**: Cách tiêu dùng trong Medal Shop quyết định trực tiếp tốc độ mở rộng bộ sưu tập Owned Passive Bonus.",
            en: "**Finite Weekly Glory Medal Income**: For F2P and Low-Spender players, weekly Glory Medals from battlefield events and guild activities are limited.\n• **Cash-Flow Management**: Disciplined Medal Shop spending directly governs how fast you expand your Owned Passive Bonus collection.",
          },
        },
        {
          type: "callout",
          variant: "rule",
          title: {
            vi: "Quy Tắc Bất Biến: Ngưỡng Đóng Băng 15,000 – 30,000 Huy Chương Vinh Quang (Glory Medals)",
            en: "Immutable Rule: The 15,000 – 30,000 Glory Medals Safety Floor",
          },
          content: {
            vi: "**Làm mới mỗi Thứ Hai**: Ô đầu tiên của Medal Shop xoay tua ngẫu nhiên giữa Quân trang Xanh (`15,000` Shield Soldier, Cavalry) và Tím (`30,000` Bearskin Warrior).\n• **Ngưỡng đóng băng `15,000–30,000` Medals**: Luôn giữ quỹ dự phòng để mua đứt ngay Quân trang chưa sở hữu, kích hoạt vĩnh viễn Owned Bonus (`+11.49%` / `+6.45%` ATK).\n• **Không mua trùng lặp sớm**: Khi đã mở đủ bộ, dồn toàn bộ phần thặng dư trên `30,000` Medals để nâng cấp `Lv.10` / `Lv.20` vào đúng ngày sự kiện GAR/KvK!",
            en: "**Monday Weekly Refresh**: The first Medal Shop slot rotates randomly between Rare (`15,000` Shield Soldier, Cavalry) and Epic (`30,000` Bearskin Warrior) skins.\n• **`15,000–30,000` Safety Floor**: Keep a frozen reserve to immediately unlock unowned skins for their permanent Owned Bonus (`+11.49%` Epic / `+6.45%` Rare ATK).\n• **No Early Duplicates**: Once all shop skins are unlocked, funnel all surplus above `30,000` Medals into `Lv.10` / `Lv.20` upgrades during GAR/KvK!",
          },
        },
        {
          type: "media_spotlight",
          mediaCode: "MED-7.4-02",
          tier: "tier2_annotated_ui",
          title: {
            vi: "Chiến Thuật Quản Trị Medal Shop Hàng Tuần & Đổi Quân Trang 3 Giây",
            en: "Weekly Medal Shop Rotation Audit & 3-Second Tactical Skin Swapping",
          },
          description: {
            vi: "Hướng dẫn khoanh vùng ô xoay tua Quân trang 15,000 / 30,000 Medals mỗi Thứ Hai trong Medal Shop, gạch bỏ các ô tài nguyên thô gây lỗ vốn và quy trình đổi Quân trang theo 3 chế độ PvP / Boss PvE / Đào mỏ.",
            en: "Annotated guide to the Monday 15,000 / 30,000 Medals skin rotation slot in the Medal Shop, red-lining the overpriced raw resource traps, and executing the 3-mode PvP / Boss PvE / Gathering skin swap.",
          },
          annotations: [
            {
              kind: "do",
              label: {
                vi: "Mua mở khóa lần đầu tiên các Skin Xanh (15,000 Medals) & Tím (30,000 Medals)",
                en: "Buy First-Time Unlocks for Rare (15,000 Medals) & Epic (30,000 Medals) Skins",
              },
              detail: {
                vi: "Ưu tiên mua ngay Bearskin Warrior (30,000 Medals — +49% ATK đánh Boss bản đồ) và Shield Soldier (15,000 Medals — +52% tải trọng thu hoạch) ngay tuần đầu tiên xuất hiện để vừa lấy Owned Bonus vừa có công cụ chuyên dụng.",
                en: "Immediately purchase Bearskin Warrior (30,000 Medals — +49% World Map PvE Boss ATK) and Shield Soldier (15,000 Medals — +52% gathering load) on their first appearance to secure both global Owned Bonuses and essential utility actives.",
              },
            },
            {
              kind: "do",
              label: {
                vi: "Đổi Skin 3 Giây trước khi xuất quân: PvP vs Boss PvE vs Đào mỏ",
                en: "Execute the 3-Second Skin Swap Before Marching: PvP vs Boss PvE vs Gathering",
              },
              detail: {
                vi: "Đeo Heavy Cavalry / Samurai khi công thành PvP; đổi sang Bearskin Warrior trước khi đánh Boss Thế Giới / Rồng Đen / Yeti; gắn Shield Soldier cho Đội 2/3 khi đi đào mỏ tài nguyên.",
                en: "Equip Heavy Cavalry / Samurai for PvP castle sieges; swap to Bearskin Warrior before attacking World Bosses / Black Dragon / Yeti; assign Shield Soldier to Queue 2/3 for resource gathering marches.",
              },
            },
            {
              kind: "dont",
              label: {
                vi: "Cấm mua Rương Thịt / Gỗ / Đá (800 Medals/rương) hoặc mua thẻ trùng lặp sớm",
                en: "Never Buy Meat / Wood / Stone Chests (800 Medals) or Early Duplicate Shards",
              },
              detail: {
                vi: "Đốt 800 Medals/rương vào tài nguyên thô hoặc mua bản sao trùng lặp giá 15,000–30,000 Medals khi dàn Skin chưa đạt chuẩn Lv.10 / Lv.20 làm thất thoát trực tiếp hàng chục phần trăm ATK/HP Toàn quân.",
                en: "Burning 800 Medals per chest on raw resources or buying 15,000–30,000 Medal duplicate copies before your skin roster reaches Lv.10 / Lv.20 permanently drains tens of percent in global soldier ATK/HP.",
              },
            },
          ],
        },
        {
          type: "checklist",
          checklistId: "checklist-7-4-troop-skin-medal-audit",
          title: {
            vi: "Bảng Kiểm Kê Kỷ Luật Ngoại Hình Quân Lính & Huy Chương Vinh Quang",
            en: "Troop Skins & Glory Medals Optimization Audit Checklist",
          },
          description: {
            vi: "Đánh dấu từng mục dưới đây để đảm bảo tài khoản của bạn không bị thất thoát chỉ số Owned Passive Bonus và tối ưu hóa từng đồng Glory Medals.",
            en: "Check off each milestone below to ensure your account maximizes permanent Owned Passive Bonuses and extracts maximum ROI from every Glory Medal.",
          },
          items: [
            {
              id: "chk-74-freeze-floor",
              label: {
                vi: "Duy trì Ngưỡng Đóng Băng 15,000 – 30,000 Glory Medals trong Medal Shop",
                en: "Maintain the 15,000 – 30,000 Glory Medals Safety Floor in the Medal Shop",
              },
              detail: {
                vi: "Luôn giữ sẵn quỹ dự phòng 15,000 – 30,000 Medals trước kỳ làm mới 00:00 UTC Thứ Hai (07:00 sáng Giờ VN) để mua mở khóa ngay lập tức mọi Skin Xanh (Shield Soldier, Cavalry) và Tím (Bearskin Warrior) chưa sở hữu.",
                en: "Keep 15,000 – 30,000 Medals reserved before every Monday 00:00 UTC reset to instantly unlock any unowned Rare (Shield Soldier, Cavalry) or Epic (Bearskin Warrior) skin on rotation.",
              },
              badge: {
                vi: "QUY TẮC SỐ 1",
                en: "RULE #1",
              },
            },
            {
              id: "chk-74-first-ssr-chest",
              label: {
                vi: "Chọn Heavy Cavalry từ Rương Tự Chọn Quân Trang Vàng đầu tiên",
                en: "Select Heavy Cavalry from Your First Legendary Troop Skin Choice Chest",
              },
              detail: {
                vi: "Đảm bảo Đội 1 sở hữu Quân trang đa dụng S++ (`+11.2%` công thành, `+70%` tốc chạy PvP) dùng chung cho cả 3 Hệ trước khi lấy Skin khóa hệ (Divine Spirit / Desert Knight / Tree Spirit).",
                en: "Secure the S++ universal skin (`+11.2%` siege damage, `+70%` PvP march speed) usable across all 3 factions before selecting faction-locked skins (Divine Spirit / Desert Knight / Tree Spirit).",
              },
              badge: {
                vi: "S++ ĐA DỤNG",
                en: "S++ UNIVERSAL",
              },
            },
            {
              id: "chk-74-staircase-lv10",
              label: {
                vi: "Nâng đồng loạt toàn bộ Quân trang đang sở hữu chạm Điểm Gãy Lv.10 ★",
                en: "Push All Owned Troop Skins Evenly to the Lv.10 ★ Breakpoint First",
              },
              detail: {
                vi: "Đưa mọi Skin Vàng (`80,400`), Tím (`40,200`) và Xanh (`20,100` Medals) lên `Lv.10` ★ để kích hoạt hàng loạt mốc 1 Sao giá rẻ trước khi đẩy bất kỳ Skin nào lên `Lv.20`.",
                en: "Bring every owned Legendary (`80,400`), Epic (`40,200`), and Rare (`20,100` Medals) skin to `Lv.10` ★ to unlock high-ROI 1-Star Owned Bonuses before pushing any skin to `Lv.20`.",
              },
              badge: {
                vi: "BREAKPOINT 1",
                en: "BREAKPOINT 1",
              },
            },
            {
              id: "chk-74-staircase-lv20",
              label: {
                vi: "Kéo bậc thang dàn Skin Vàng & Tím chủ lực lên Điểm Gãy Lv.20 ★★",
                en: "Staircase Core Legendary & Epic Skins to the Lv.20 ★★ Breakpoint",
              },
              detail: {
                vi: "Đưa Skin đeo chính Đội 1 lên `Lv.20` ★★ (`948,400–1,155,400` Medals), rồi kéo dàn Skin Vàng & Tím phụ lên `Lv.20` ★★ (`474,200–577,700` Medals) thay vì đốt `20,845,400` Medals lên `Lv.50`.",
                en: "Push Queue 1's main skin to `Lv.20` ★★ (`948,400–1,155,400` Medals), then bring secondary Legendary & Epic skins to `Lv.20` ★★ (`474,200–577,700` Medals) instead of burning `20,845,400` on `Lv.50`.",
              },
              badge: {
                vi: "BREAKPOINT 2",
                en: "BREAKPOINT 2",
              },
            },
            {
              id: "chk-74-situational-swap",
              label: {
                vi: "Thực hiện đổi Skin theo đúng tình huống PvP / Boss PvE / Rally / Đào mỏ",
                en: "Swap Equipped Skins by Activity: PvP / Boss PvE / Rally / Gathering",
              },
              detail: {
                vi: "Đeo Heavy Cavalry / Samurai khi đánh PvP; đổi sang Bearskin Warrior (`+49%` ATK PvE) khi săn Boss; phối hợp Skeleton Soldier & Logistic Follower khi Rally; gắn Shield Soldier khi đào mỏ.",
                en: "Equip Heavy Cavalry / Samurai for PvP; swap to Bearskin Warrior (`+49%` PvE ATK) for World Bosses; pair Skeleton Soldier & Logistic Follower in Rallies; assign Shield Soldier for gathering.",
              },
              badge: {
                vi: "TỐI ƯU THỰC CHIẾN",
                en: "COMBAT MIN-MAX",
              },
            },
          ],
        },
      ],
    },
    {
      id: "common-pitfalls",
      title: {
        vi: "3. Bốn Sai Lầm Chí Mạng Khi Đầu Tư Ngoại Hình Quân Lính & Huy Chương Vinh Quang",
        en: "3. Four Critical Troop Skin & Glory Medal Investment Pitfalls",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "Do không nắm rõ quy luật cộng dồn Owned Passive Bonus và hàm mũ chi phí từ `Lv.20` trở lên, nhiều người chơi làm thọt `30%–50%` tổng chỉ số binh lính dù tiêu cùng một lượng Glory Medals.",
            en: "Overlooking global Owned Passive Bonus stacking and the exponential cost curve past `Lv.20` causes many players to forfeit `30%–50%` of potential soldier stats on the same Glory Medal budget.",
          },
        },
        {
          type: "table",
          caption: {
            vi: "Bảng 3.1: 4 Cạm Bẫy Phổ Biến Khi Nâng Cấp Quân Trang & Giải Pháp Chuẩn Min-Max",
            en: "Table 3.1: 4 Common Troop Skin & Glory Medal Pitfalls vs. Min-Max Solutions",
          },
          headers: [
            { vi: "Sai Lầm Phổ Biến (Account Traps)", en: "Common Pitfalls (Account Traps)" },
            { vi: "Giải Pháp Tối Ưu (Min-Max Solution)", en: "Optimal Min-Max Solution" },
          ],
          rows: [
            [
              {
                vi: "1. Dồn 100% Huy chương đập duy nhất 1 Skin Vàng thẳng lên Lv.35–Lv.50 (tốn tới 20,845,400 Medals ở Lv.50): Nghĩ rằng chỉ có Skin đang đeo cho Đội 1 mới có tác dụng nên bỏ mặc 6–8 Skin khác ở Lv.1 thay vì dừng ở các mốc Lv.10 (80,400 Medals) và Lv.20 (948,400–1,155,400 Medals).",
                en: "1. Dumping 100% of Glory Medals to rush 1 single Legendary Skin straight to Lv.35–Lv.50 (costing up to 20,845,400 Medals at Lv.50): Assuming only Queue 1's equipped skin matters and leaving 6–8 other owned skins at Lv.1 instead of spreading Lv.10 (80,400 Medals) and Lv.20 (948,400–1,155,400 Medals) breakpoints.",
              },
              {
                vi: "Mọi Skin đều cộng Owned Passive Bonus (+14.38% ATK / +21.46% HP Vàng, +11.49% ATK / +19.24% HP Tím) cho Đội 1! Chi phí từ Lv.30 (4,259,400–4,791,400 Medals) lên Lv.50 (20,845,400 Medals) tăng theo cấp số nhân. Bắt buộc nâng bậc thang tất cả các Skin chạm Điểm Gãy Lv.10 rồi Lv.20 trước khi đẩy lên Lv.30!",
                en: "Every owned skin permanently stacks its Owned Passive Bonus (+14.38% ATK / +21.46% HP Legendary, +11.49% ATK / +19.24% HP Epic) onto Queue 1! Costs from Lv.30 (4,259,400–4,791,400 Medals) to Lv.50 (20,845,400 Medals) scale exponentially. Always staircase all owned skins through Lv.10 -> Lv.20 -> Lv.30 global milestones!",
              },
            ],
            [
              {
                vi: "2. Quên đổi Quân trang theo tình huống (PvP vs World Boss vs Đào mỏ): Đeo cố định 1 Skin duy nhất 24/7 cho mọi hoạt động, bỏ phí +49% ATK đánh Boss của Bearskin Warrior và +52% tải trọng của Shield Soldier.",
                en: "2. Forgetting to switch equipped Troop Skins before PvP vs World Boss vs Gathering marches: Leaving a single skin equipped 24/7 across all content, forfeiting Bearskin Warrior's +49% PvE Boss ATK and Shield Soldier's +52% gathering load.",
              },
              {
                vi: "Thiết lập thói quen đổi Skin trong 3 giây: Đeo Heavy Cavalry / Divine Spirit / Desert Knight / Tree Spirit / Brave Fighter / Samurai khi đánh PvP/KvK; đổi sang Bearskin Warrior khi đánh Boss/Quái bản đồ (+49% ATK PvE); phối hợp Skeleton Soldier & Logistic Follower khi Rally; gắn Shield Soldier cho đội phụ đi đào mỏ (+52% Tải trọng).",
                en: "Build a 3-second skin-swap habit: Equip Heavy Cavalry / Divine Spirit / Desert Knight / Tree Spirit / Brave Fighter / Samurai for PvP/KvK; switch to Bearskin Warrior for World Boss/Monster fights (+49% PvE ATK); pair Skeleton Soldier & Logistic Follower in Rallies; equip Shield Soldier on secondary gathering marches (+52% load).",
              },
            ],
            [
              {
                vi: "3. Đốt quá nhiều Huy chương vào Skin Xanh/Tím vượt quá Lv.10/Lv.20 hoặc mua Rương Thịt / Gỗ / Đá (800 Medals/rương) hàng ngày trong Medal Shop: Tiêu sạch quỹ đóng băng 15,000–30,000 Medals vào tài nguyên thô hoặc nâng Skin Xanh quá Lv.10 (20,100 Medals) sớm.",
                en: "3. Over-investing Glory Medals into Blue/Purple Skins past Lv.10/Lv.20 early or buying daily Meat / Wood / Stone chests (800 Medals/chest) in the Medal Shop: Draining your 15,000–30,000 Medals safety floor on raw resources or pushing Rare skins past their Lv.10 (20,100 Medals) global milestone instead of saving for Legendary/Epic breakpoints.",
              },
              {
                vi: "CẤM TUYỆT ĐỐI mua tài nguyên thô trong Medal Shop! Giữ chặt Ngưỡng Đóng Băng 15,000–30,000 Medals để mở khóa đủ Skin mới, dừng các Skin Xanh (Shield Soldier, Cavalry) ở mốc Lv.10 ★ (20,100 Medals) và dồn Huy chương cho các mốc Lv.20 ★★ của Skin Vàng (948,400–1,155,400 Medals) & Tím (474,200–577,700 Medals).",
                en: "STRICTLY FORBIDDEN to buy raw resources in the Medal Shop! Maintain your 15,000–30,000 Medals safety floor for new unlocks, park Rare skins (Shield Soldier, Cavalry) at their high-ROI Lv.10 ★ (20,100 Medals) milestone, and channel medals into Lv.20 ★★ breakpoints on Legendary (948,400–1,155,400 Medals) and Epic (474,200–577,700 Medals) skins.",
              },
            ],
            [
              {
                vi: "4. Xả Huy chương nâng cấp Level Quân trang vào ngày thường (Thi Đấu Hội): Có bao nhiêu Huy chương là bấm nâng cấp lẻ tẻ ngay lập tức thay vì đồng bộ với sự kiện GAR / KvK / Top Lord.",
                en: "4. Upgrading Troop Skins on random off-event days (Guild Race): Spending Glory Medals impulsively whenever they trickle in instead of syncing with GAR / KvK Day 5–6 Soldier Prep / Power Spike events.",
              },
              {
                vi: "Tích trữ toàn bộ Huy chương vượt trên ngưỡng đóng băng 30,000 Medals và chờ đến đúng ngày tính điểm Quân Trang / Lính / Lực Chiến của Kỳ GAR / KvK / Top Lord mới bấm nâng cấp hàng loạt để ăn trọn rương mốc cá nhân.",
                en: "Hoard all Glory Medals above your 30,000 safety floor and wait until the designated Soldier / Troop Skin / Power Spike scoring window in GAR / KvK / Top Lord before executing batch upgrades to sweep personal milestone chests.",
              },
            ],
          ],
        },
      ],
    },
  ],
  proSections: [
    {
      id: "pro-data-and-benchmarks",
      isPro: true,
      title: {
        vi: "4. Phân Tích Định Lượng & Điểm Gãy: Bảng Chi Phí 34 Mốc Lv.1 ➔ Lv.50 (+ Honor Lv.150) & Toán Học Bậc Thang Lv.10 / Lv.20",
        en: "4. Quantitative Analysis & Breakpoints: Complete 34-Row Lv.1 ➔ Lv.50 (+ Honor Lv.150) Cost Matrix & Lv.10 / Lv.20 Staircase Math",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "**Ba quy luật định lượng bất biến (TopHeroes Tables — Tab Troop Skins)**: (1) Tỷ lệ chi phí `4 : 2 : 1` giữa Vàng : Tím : Xanh ở mọi cấp độ `Lv.1–50` và `Honor Level 1–150`.\n• **(2) Chia nhỏ thanh cấp độ (Sub-levels)**: `Lv.1–17` (`1` bậc), `Lv.18–19` (`2` bậc), `Lv.20–26` (`3` bậc), `Lv.27–30` (`4` bậc) và tăng dần lên `10` bậc mỗi cấp ở `Lv.44–50`!\n• **(3) Mốc Đột Phá Sao**: Tại `Lv.10` ★, `Lv.20` ★★, `Lv.30` ★★★, `Lv.40` ★★★★, `Lv.45` ★★★★★, `Lv.50` ★★★★★★ yêu cầu thêm Bản sao và nhảy vọt Owned Bonus.",
            en: "**Three Immutable Mathematical Laws (TopHeroes Tables — Tab Troop Skins)**: (1) The `4 : 2 : 1` Rarity Cost Ratio (Legendary : Epic : Rare) across `Lv.1–50` and `Honor Level 1–150`.\n• **(2) Sub-Level Bar Splitting**: `Lv.1–17` (`1` step), `Lv.18–19` (`2` steps), `Lv.20–26` (`3` steps), `Lv.27–30` (`4` steps), scaling up to `10` sub-levels per level at `Lv.44–50`!\n• **(3) Star Milestones**: `Lv.10` ★, `Lv.20` ★★, `Lv.30` ★★★, `Lv.40` ★★★★, `Lv.45` ★★★★★, and `Lv.50` ★★★★★★ require duplicate copies and surge Owned Bonuses.",
          },
        },
        {
          type: "table",
          caption: {
            vi: "Bảng 4.1: Ma Trận 34 Mốc Chi Phí Huy Chương Vinh Quang Từ Lv.1 ➔ Lv.50 & Honor Level 1–150 (Chuẩn TopHeroes Tables — Tỷ Lệ 4:2:1)",
            en: "Table 4.1: Complete 34-Row Glory Medal Cost Matrix from Lv.1 ➔ Lv.50 & Honor Level 1–150 (TopHeroes Tables SSoT — 4:2:1 Ratio)",
          },
          headers: [
            { vi: "Cấp Độ (Level)", en: "Level Milestone" },
            { vi: "Số Bậc Nhỏ (Sub-levels)", en: "Sub-levels" },
            { vi: "Chi Phí Riêng Cấp Đó (Skin Vàng / Legendary)", en: "Step Cost (Legendary / SSR)" },
            { vi: "Tổng Tích Lũy Tại Mốc (Skin Vàng / Legendary)", en: "Cumulative Total (Legendary / SSR)" },
            { vi: "Chi Phí Riêng Cấp Đó (Skin Tím / Epic)", en: "Step Cost (Epic / SR)" },
            { vi: "Tổng Tích Lũy Tại Mốc (Skin Tím / Epic)", en: "Cumulative Total (Epic / SR)" },
            { vi: "Tổng Tích Lũy Tại Mốc (Skin Xanh / Rare)", en: "Cumulative Total (Rare / R)" },
          ],
          rows: [
            [
              { vi: "Lv.1 (Gốc)", en: "Lv.1 (Base)" },
              { vi: "1", en: "1" },
              { vi: "0", en: "0" },
              { vi: "0", en: "0" },
              { vi: "0", en: "0" },
              { vi: "0", en: "0" },
              { vi: "0", en: "0" },
            ],
            [
              { vi: "Lv.2", en: "Lv.2" },
              { vi: "1", en: "1" },
              { vi: "1,600", en: "1,600" },
              { vi: "1,600", en: "1,600" },
              { vi: "800", en: "800" },
              { vi: "800", en: "800" },
              { vi: "400", en: "400" },
            ],
            [
              { vi: "Lv.3", en: "Lv.3" },
              { vi: "1", en: "1" },
              { vi: "2,300", en: "2,300" },
              { vi: "3,900", en: "3,900" },
              { vi: "1,150", en: "1,150" },
              { vi: "1,950", en: "1,950" },
              { vi: "975", en: "975" },
            ],
            [
              { vi: "Lv.4", en: "Lv.4" },
              { vi: "1", en: "1" },
              { vi: "3,200", en: "3,200" },
              { vi: "7,100", en: "7,100" },
              { vi: "1,600", en: "1,600" },
              { vi: "3,550", en: "3,550" },
              { vi: "1,775", en: "1,775" },
            ],
            [
              { vi: "Lv.5", en: "Lv.5" },
              { vi: "1", en: "1" },
              { vi: "4,400", en: "4,400" },
              { vi: "11,500", en: "11,500" },
              { vi: "2,200", en: "2,200" },
              { vi: "5,750", en: "5,750" },
              { vi: "2,875", en: "2,875" },
            ],
            [
              { vi: "Lv.6", en: "Lv.6" },
              { vi: "1", en: "1" },
              { vi: "6,200", en: "6,200" },
              { vi: "17,700", en: "17,700" },
              { vi: "3,100", en: "3,100" },
              { vi: "8,850", en: "8,850" },
              { vi: "4,425", en: "4,425" },
            ],
            [
              { vi: "Lv.7", en: "Lv.7" },
              { vi: "1", en: "1" },
              { vi: "8,700", en: "8,700" },
              { vi: "26,400", en: "26,400" },
              { vi: "4,350", en: "4,350" },
              { vi: "13,200", en: "13,200" },
              { vi: "6,600", en: "6,600" },
            ],
            [
              { vi: "Lv.8", en: "Lv.8" },
              { vi: "1", en: "1" },
              { vi: "13,000", en: "13,000" },
              { vi: "39,400", en: "39,400" },
              { vi: "6,500", en: "6,500" },
              { vi: "19,700", en: "19,700" },
              { vi: "9,850", en: "9,850" },
            ],
            [
              { vi: "Lv.9", en: "Lv.9" },
              { vi: "1", en: "1" },
              { vi: "17,000", en: "17,000" },
              { vi: "56,400", en: "56,400" },
              { vi: "8,500", en: "8,500" },
              { vi: "28,200", en: "28,200" },
              { vi: "14,100", en: "14,100" },
            ],
            [
              {
                vi: "Lv.10 ★ (1 Bản sao — Breakpoint 1)",
                en: "Lv.10 ★ (1 Copy — Breakpoint 1)",
              },
              { vi: "1", en: "1" },
              { vi: "24,000", en: "24,000" },
              { vi: "80,400", en: "80,400" },
              { vi: "12,000", en: "12,000" },
              { vi: "40,200", en: "40,200" },
              { vi: "20,100", en: "20,100" },
            ],
            [
              { vi: "Lv.11", en: "Lv.11" },
              { vi: "1", en: "1" },
              { vi: "34,000", en: "34,000" },
              { vi: "114,400", en: "114,400" },
              { vi: "17,000", en: "17,000" },
              { vi: "57,200", en: "57,200" },
              { vi: "28,600", en: "28,600" },
            ],
            [
              { vi: "Lv.12", en: "Lv.12" },
              { vi: "1", en: "1" },
              { vi: "40,000", en: "40,000" },
              { vi: "154,400", en: "154,400" },
              { vi: "20,000", en: "20,000" },
              { vi: "77,200", en: "77,200" },
              { vi: "38,600", en: "38,600" },
            ],
            [
              { vi: "Lv.13", en: "Lv.13" },
              { vi: "1", en: "1" },
              { vi: "48,000", en: "48,000" },
              { vi: "202,400", en: "202,400" },
              { vi: "24,000", en: "24,000" },
              { vi: "101,200", en: "101,200" },
              { vi: "50,600", en: "50,600" },
            ],
            [
              { vi: "Lv.14", en: "Lv.14" },
              { vi: "1", en: "1" },
              { vi: "58,000", en: "58,000" },
              { vi: "260,400", en: "260,400" },
              { vi: "29,000", en: "29,000" },
              { vi: "130,200", en: "130,200" },
              { vi: "65,100", en: "65,100" },
            ],
            [
              { vi: "Lv.15", en: "Lv.15" },
              { vi: "1", en: "1" },
              { vi: "69,000", en: "69,000" },
              { vi: "329,400", en: "329,400" },
              { vi: "34,500", en: "34,500" },
              { vi: "164,700", en: "164,700" },
              { vi: "82,350", en: "82,350" },
            ],
            [
              { vi: "Lv.16", en: "Lv.16" },
              { vi: "1", en: "1" },
              { vi: "83,000", en: "83,000" },
              { vi: "412,400", en: "412,400" },
              { vi: "41,500", en: "41,500" },
              { vi: "206,200", en: "206,200" },
              { vi: "103,100", en: "103,100" },
            ],
            [
              { vi: "Lv.17", en: "Lv.17" },
              { vi: "1", en: "1" },
              { vi: "100,000", en: "100,000" },
              { vi: "512,400", en: "512,400" },
              { vi: "50,000", en: "50,000" },
              { vi: "256,200", en: "256,200" },
              { vi: "128,100", en: "128,100" },
            ],
            [
              { vi: "Lv.18 (17/1–17/2)", en: "Lv.18 (17/1–17/2)" },
              { vi: "2 (60k×2)", en: "2 (60k×2)" },
              { vi: "120,000", en: "120,000" },
              { vi: "632,400", en: "632,400" },
              { vi: "60,000", en: "60,000" },
              { vi: "316,200", en: "316,200" },
              { vi: "158,100", en: "158,100" },
            ],
            [
              { vi: "Lv.19 (18/1–18/2)", en: "Lv.19 (18/1–18/2)" },
              { vi: "2 (72k×2)", en: "2 (72k×2)" },
              { vi: "144,000", en: "144,000" },
              { vi: "776,400", en: "776,400" },
              { vi: "72,000", en: "72,000" },
              { vi: "388,200", en: "388,200" },
              { vi: "194,100", en: "194,100" },
            ],
            [
              {
                vi: "Lv.20 ★★ (+1 Bản sao — Breakpoint 2)",
                en: "Lv.20 ★★ (+1 Copy — Breakpoint 2)",
              },
              {
                vi: "2 nấc (19/2) ➔ 3 nấc (20/3)",
                en: "2 steps (19/2) ➔ 3 steps (20/3)",
              },
              { vi: "172,000 ➔ 207,000", en: "172,000 ➔ 207,000" },
              {
                vi: "948,400 (Trước đột phá 19/2) ➔ 1,155,400 (Hoàn tất 3 nấc 20/3)",
                en: "948,400 (Pre-breakthrough 19/2) ➔ 1,155,400 (Full 3 steps 20/3)",
              },
              { vi: "86,000 ➔ 103,500", en: "86,000 ➔ 103,500" },
              { vi: "474,200 ➔ 577,700", en: "474,200 ➔ 577,700" },
              { vi: "237,100 ➔ 288,850", en: "237,100 ➔ 288,850" },
            ],
            [
              { vi: "Lv.22 (21/1–21/3)", en: "Lv.22 (21/1–21/3)" },
              { vi: "3 (76k×3)", en: "3 (76k×3)" },
              { vi: "228,000", en: "228,000" },
              { vi: "1,383,400", en: "1,383,400" },
              { vi: "114,000", en: "114,000" },
              { vi: "691,700", en: "691,700" },
              { vi: "345,850", en: "345,850" },
            ],
            [
              { vi: "Lv.23 (22/1–22/3)", en: "Lv.23 (22/1–22/3)" },
              { vi: "3 (83k×3)", en: "3 (83k×3)" },
              { vi: "249,000", en: "249,000" },
              { vi: "1,632,400", en: "1,632,400" },
              { vi: "124,500", en: "124,500" },
              { vi: "816,200", en: "816,200" },
              { vi: "408,100", en: "408,100" },
            ],
            [
              { vi: "Lv.24 (23/1–23/3)", en: "Lv.24 (23/1–23/3)" },
              { vi: "3 (91k×3)", en: "3 (91k×3)" },
              { vi: "273,000", en: "273,000" },
              { vi: "1,905,400", en: "1,905,400" },
              { vi: "136,500", en: "136,500" },
              { vi: "952,700", en: "952,700" },
              { vi: "476,350", en: "476,350" },
            ],
            [
              { vi: "Lv.25 (24/1–24/3)", en: "Lv.25 (24/1–24/3)" },
              { vi: "3 (100k×3)", en: "3 (100k×3)" },
              { vi: "300,000", en: "300,000" },
              { vi: "2,205,400", en: "2,205,400" },
              { vi: "150,000", en: "150,000" },
              { vi: "1,102,700", en: "1,102,700" },
              { vi: "551,350", en: "551,350" },
            ],
            [
              { vi: "Lv.26 (25/1–25/3)", en: "Lv.26 (25/1–25/3)" },
              { vi: "3 (110k×3)", en: "3 (110k×3)" },
              { vi: "330,000", en: "330,000" },
              { vi: "2,535,400", en: "2,535,400" },
              { vi: "165,000", en: "165,000" },
              { vi: "1,267,700", en: "1,267,700" },
              { vi: "633,850", en: "633,850" },
            ],
            [
              { vi: "Lv.27 (26/1–26/4)", en: "Lv.27 (26/1–26/4)" },
              { vi: "4 (100k×4)", en: "4 (100k×4)" },
              { vi: "400,000", en: "400,000" },
              { vi: "2,935,400", en: "2,935,400" },
              { vi: "200,000", en: "200,000" },
              { vi: "1,467,700", en: "1,467,700" },
              { vi: "733,850", en: "733,850" },
            ],
            [
              { vi: "Lv.28 (27/1–27/4)", en: "Lv.28 (27/1–27/4)" },
              { vi: "4 (100k×4)", en: "4 (100k×4)" },
              { vi: "400,000", en: "400,000" },
              { vi: "3,335,400", en: "3,335,400" },
              { vi: "200,000", en: "200,000" },
              { vi: "1,667,700", en: "1,667,700" },
              { vi: "833,850", en: "833,850" },
            ],
            [
              { vi: "Lv.29 (28/1–28/4)", en: "Lv.29 (28/1–28/4)" },
              { vi: "4 (110k×4)", en: "4 (110k×4)" },
              { vi: "440,000", en: "440,000" },
              { vi: "3,775,400", en: "3,775,400" },
              { vi: "220,000", en: "220,000" },
              { vi: "1,887,700", en: "1,887,700" },
              { vi: "943,850", en: "943,850" },
            ],
            [
              {
                vi: "Lv.30 ★★★ (+2 Bản sao — Breakpoint 3)",
                en: "Lv.30 ★★★ (+2 Copies — Breakpoint 3)",
              },
              {
                vi: "4 nấc (29/4) ➔ 4 nấc (30/4)",
                en: "4 steps (29/4) ➔ 4 steps (30/4)",
              },
              { vi: "484,000 ➔ 532,000", en: "484,000 ➔ 532,000" },
              {
                vi: "4,259,400 (Trước đột phá 29/4) ➔ 4,791,400 (Hoàn tất 4 nấc 30/4)",
                en: "4,259,400 (Pre-breakthrough 29/4) ➔ 4,791,400 (Full 4 steps 30/4)",
              },
              { vi: "242,000 ➔ 266,000", en: "242,000 ➔ 266,000" },
              { vi: "2,129,700 ➔ 2,395,700", en: "2,129,700 ➔ 2,395,700" },
              { vi: "1,064,850 ➔ 1,197,850", en: "1,064,850 ➔ 1,197,850" },
            ],
            [
              {
                vi: "Lv.35 (Tổng 30/1 ➔ 34/6)",
                en: "Lv.35 (Total 30/1 ➔ 34/6)",
              },
              { vi: "4 ➔ 6 / cấp", en: "4 ➔ 6 / level" },
              { vi: "2,945,000 (5 cấp)", en: "2,945,000 (5 levels)" },
              { vi: "7,204,400", en: "7,204,400" },
              { vi: "1,472,500 (5 cấp)", en: "1,472,500 (5 levels)" },
              { vi: "3,602,200", en: "3,602,200" },
              { vi: "1,801,100", en: "1,801,100" },
            ],
            [
              {
                vi: "Lv.40 ★★★★ (+3 Bản sao — Breakpoint 4)",
                en: "Lv.40 ★★★★ (+3 Copies — Breakpoint 4)",
              },
              {
                vi: "8 nấc (39/8) ➔ 8 nấc (40/8)",
                en: "8 steps (39/8) ➔ 8 steps (40/8)",
              },
              { vi: "824,000 ➔ 872,000", en: "824,000 ➔ 872,000" },
              {
                vi: "10,960,400 (Trước đột phá 39/8) ➔ 11,832,400 (Hoàn tất 8 nấc 40/8)",
                en: "10,960,400 (Pre-breakthrough 39/8) ➔ 11,832,400 (Full 8 steps 40/8)",
              },
              { vi: "412,000 ➔ 436,000", en: "412,000 ➔ 436,000" },
              { vi: "5,480,200 ➔ 5,916,200", en: "5,480,200 ➔ 5,916,200" },
              { vi: "2,740,100 ➔ 2,958,100", en: "2,740,100 ➔ 2,958,100" },
            ],
            [
              {
                vi: "Lv.45 ★★★★★ (Tổng 40/1 ➔ 44/10)",
                en: "Lv.45 ★★★★★ (Total 40/1 ➔ 44/10)",
              },
              { vi: "8 ➔ 10 / cấp", en: "8 ➔ 10 / level" },
              { vi: "4,635,000 (5 cấp)", en: "4,635,000 (5 levels)" },
              { vi: "15,595,400", en: "15,595,400" },
              { vi: "2,317,500 (5 cấp)", en: "2,317,500 (5 levels)" },
              { vi: "7,797,700", en: "7,797,700" },
              { vi: "3,898,850", en: "3,898,850" },
            ],
            [
              {
                vi: "Lv.50 ★★★★★★ (+6 Bản sao, Tổng 13 Bản sao Lv.10–50)",
                en: "Lv.50 ★★★★★★ (+6 Copies, Total 13 Copies Lv.10–50)",
              },
              { vi: "10 / cấp", en: "10 / level" },
              { vi: "5,250,000 (5 cấp)", en: "5,250,000 (5 levels)" },
              { vi: "20,845,400", en: "20,845,400" },
              { vi: "2,625,000 (5 cấp)", en: "2,625,000 (5 levels)" },
              { vi: "10,422,700", en: "10,422,700" },
              { vi: "5,211,350", en: "5,211,350" },
            ],
            [
              {
                vi: "Honor Level 1 ➔ 150 (Sau Lv.50)",
                en: "Honor Level 1 ➔ 150 (Post-Lv.50)",
              },
              { vi: "150 Cấp Vinh Dự", en: "150 Honor Levels" },
              {
                vi: "+7,500,000 Huân chương (50K/cấp) hoặc 40 Bản sao (1 bản sao mỗi 5 cấp ở Lv.1–100 + 2 bản sao mỗi 5 cấp ở Lv.101–150)",
                en: "+7,500,000 Medals (50K/level) or 40 Copies (1 copy per 5 levels at Lv.1–100 + 2 copies per 5 levels at Lv.101–150)",
              },
              { vi: "Tổng: 28,345,400", en: "Total: 28,345,400" },
              {
                vi: "+3,750,000 (25K/cấp) hoặc 40 Bản sao",
                en: "+3,750,000 (25K/level) or 40 Copies",
              },
              { vi: "Tổng: 14,172,700", en: "Total: 14,172,700" },
              {
                vi: "Tổng: 7,086,350 (+1,875,000 hoặc 40 Bản sao)",
                en: "Total: 7,086,350 (+1,875,000 or 40 Copies)",
              },
            ],
          ],
        },
        {
          type: "visual_diagram",
          mediaCode: "MED-7.4-03",
          variant: "decision_flow",
          title: {
            vi: "Sơ Đồ Lộ Trình Nâng Cấp Bậc Thang 6 Bước (The Staircase Medal Protocol: Lv.10 ➔ Lv.20 ➔ Lv.30)",
            en: "The 6-Step Staircase Medal Protocol (Lv.10 ➔ Lv.20 ➔ Lv.30 ROI Flowchart)",
          },
          subtitle: {
            vi: "Tại sao nâng đồng loạt Lv.10 / Lv.20 mang lại lợi tức ATK/HP Toàn quân cao gấp 3.2–3.8 lần so với dồn đập 1 Skin lên Lv.40–Lv.50?",
            en: "Why spreading Lv.10 / Lv.20 breakpoints across your roster yields 3.2x–3.8x higher global soldier ATK/HP than rushing one skin to Lv.40–Lv.50",
          },
          branches: [
            {
              title: {
                vi: "Giai Đoạn 1: Mở Rộng Kho & Điểm Gãy Vàng Lv.10 ★ (4:2:1 Ratio)",
                en: "Phase 1: Roster Expansion & Lv.10 ★ Breakpoint (4:2:1 Ratio)",
              },
              badge: {
                vi: "BƯỚC 1 ➔ BƯỚC 3",
                en: "STEPS 1 ➔ 3",
              },
              tone: "emerald",
              steps: [
                {
                  id: "step-74-unlock-shop",
                  badge: { vi: "BƯỚC 1", en: "STEP 1" },
                  title: {
                    vi: "Mở khóa tối đa số lượng Troop Skins trong Medal Shop",
                    en: "Unlock Maximum Troop Skins in the Medal Shop",
                  },
                  subtitle: {
                    vi: "Giữ Ngưỡng Đóng Băng 15,000–30,000 Medals để mua sạch Skin Xanh (15k: Shield Soldier, Cavalry) và Tím (30k: Bearskin Warrior) ngay lần đầu xuất hiện.",
                    en: "Maintain the 15,000–30,000 Medals freeze floor to buy every Rare (15k: Shield Soldier, Cavalry) and Epic (30k: Bearskin Warrior) skin on first rotation.",
                  },
                  tone: "emerald",
                },
                {
                  id: "step-74-main-lv10",
                  badge: { vi: "BƯỚC 2", en: "STEP 2" },
                  title: {
                    vi: "Đẩy Skin Đeo Chính của Đội 1 lên Lv.10 ★",
                    en: "Push Queue 1 Main Equipped Skin to Lv.10 ★",
                  },
                  subtitle: {
                    vi: "Đưa Heavy Cavalry hoặc Divine Spirit / Desert Knight / Tree Spirit lên Lv.10 ★ với chi phí chỉ 80,400 Medals.",
                    en: "Bring Heavy Cavalry or Divine Spirit / Desert Knight / Tree Spirit to Lv.10 ★ for just 80,400 Medals.",
                  },
                  tone: "emerald",
                },
                {
                  id: "step-74-all-lv10",
                  badge: { vi: "BƯỚC 3", en: "STEP 3" },
                  title: {
                    vi: "Nâng ĐỒNG LOẠT mọi Skin đang sở hữu chạm Lv.10 ★",
                    en: "Bring ALL Owned Skins Evenly to Lv.10 ★",
                  },
                  subtitle: {
                    vi: "Mỗi Skin Tím chỉ tốn 40,200 Medals và mỗi Skin Xanh chỉ tốn 20,100 Medals — kích hoạt toàn bộ mốc Owned Bonus 1 Sao với giá siêu rẻ!",
                    en: "Each Epic skin costs only 40,200 Medals and each Rare skin only 20,100 Medals — unlocking every 1-Star Owned Bonus at minimal cost!",
                  },
                  tone: "emerald",
                },
              ],
              outcome: {
                vi: "Hoàn tất nền tảng 1 Sao trên toàn bộ kho Quân trang với tổng chi phí dưới 300,000 Medals.",
                en: "Completes 1-Star global Owned Bonuses across your entire skin collection for under 300,000 Medals.",
              },
            },
            {
              title: {
                vi: "Giai Đoạn 2: Điểm Gãy Vàng Lv.20 ★★ & Đột Phá Lv.30 ★★★",
                en: "Phase 2: Lv.20 ★★ Golden Breakpoint & Lv.30 ★★★ Progression",
              },
              badge: {
                vi: "BƯỚC 4 ➔ BƯỚC 6",
                en: "STEPS 4 ➔ 6",
              },
              tone: "gold",
              steps: [
                {
                  id: "step-74-main-lv20",
                  badge: { vi: "BƯỚC 4", en: "STEP 4" },
                  title: {
                    vi: "Đẩy Skin Đeo Chính của Đội 1 lên Lv.20 ★★",
                    en: "Push Queue 1 Main Equipped Skin to Lv.20 ★★",
                  },
                  subtitle: {
                    vi: "Tổng tích lũy 948,400 Medals (chạm cửa đột phá 19/2) ➔ 1,155,400 Medals (hoàn tất 3 nấc 20/3) cho Skin Vàng chủ lực.",
                    en: "Cumulative cost of 948,400 Medals (pre-breakthrough 19/2) ➔ 1,155,400 Medals (full 3 steps 20/3) for your primary Legendary skin.",
                  },
                  tone: "gold",
                },
                {
                  id: "step-74-sub-lv20",
                  badge: { vi: "BƯỚC 5", en: "STEP 5" },
                  title: {
                    vi: "Kéo lần lượt toàn bộ Skin Vàng & Tím phụ lên Lv.20 ★★",
                    en: "Bring All Secondary Legendary & Epic Skins to Lv.20 ★★",
                  },
                  subtitle: {
                    vi: "Mỗi Skin Tím (Samurai, Bearskin Warrior, Logistic Follower) chỉ tốn 474,200 ➔ 577,700 Medals — lợi tức ATK/HP Toàn quân cao gấp 3.8 lần so với đập 1 Skin lên Lv.40+ (10,960,400–11,832,400 Medals)!",
                    en: "Each Epic skin (Samurai, Bearskin Warrior, Logistic Follower) costs just 474,200 ➔ 577,700 Medals — yielding 3.8x higher global soldier ATK/HP ROI than rushing one skin to Lv.40+ (10,960,400–11,832,400 Medals)!",
                  },
                  tone: "gold",
                },
                {
                  id: "step-74-main-lv30",
                  badge: { vi: "BƯỚC 6", en: "STEP 6" },
                  title: {
                    vi: "Dồn nâng Skin Đeo Chính Đội 1 lên Lv.30 ★★★",
                    en: "Advance Queue 1 Main Equipped Skin to Lv.30 ★★★",
                  },
                  subtitle: {
                    vi: "Chỉ sau khi toàn bộ dàn Skin đạt Lv.20 ★★ mới tiến lên mốc Lv.30 ★★★ (4,259,400 ➔ 4,791,400 Medals cho Vàng; 2,129,700 ➔ 2,395,700 cho Tím).",
                    en: "Only after your entire core skin roster reaches Lv.20 ★★ should you push Queue 1's main skin to Lv.30 ★★★ (4,259,400 ➔ 4,791,400 Medals for Legendary; 2,129,700 ➔ 2,395,700 for Epic).",
                  },
                  tone: "gold",
                },
              ],
              outcome: {
                vi: "Tối đa hóa tổng chỉ số Owned Passive Bonus toàn tài khoản trước khi chạm vùng chi phí hàm mũ Lv.40–Lv.50 (20,845,400 Medals) và Honor Level 150 (28,345,400 Medals).",
                en: "Maximizes account-wide Owned Passive Bonus multipliers before entering the exponential Lv.40–Lv.50 (20,845,400 Medals) and Honor Level 150 (28,345,400 Medals) whale brackets.",
              },
            },
          ],
          footnote: {
            vi: "Để đập 1 Quân trang Vàng từ Lv.20 lên Lv.50 phải đốt thêm 19,897,000 Medals (gấp 21 lần chi phí từ Lv.1 đến Lv.20). Luôn ưu tiên chiều rộng Lv.10 -> Lv.20 trước chiều sâu!",
            en: "Pushing a single Legendary skin from Lv.20 to Lv.50 burns an extra 19,897,000 Medals (21x the cost of Lv.1 to Lv.20). Always prioritize horizontal Lv.10 -> Lv.20 breadth over single-skin depth!",
          },
        },
      ],
    },
    {
      id: "pro-execution-playbook",
      isPro: true,
      title: {
        vi: "5. Kịch Bản Thực Chiến Nâng Cao: Bài Toán Phân Bổ 2,500,000 Huy Chương Vinh Quang (Người Chơi X vs Người Chơi Y)",
        en: "5. Pro Execution Playbook: The 2,500,000 Glory Medals Allocation Case Study (Player X vs. Player Y)",
      },
      blocks: [
        {
          type: "paragraph",
          text: {
            vi: "**So sánh định lượng thực chiến**: Để chứng minh khoảng cách giữa lối chơi tự phát ('All-in 1 Skin') và kỷ luật Điểm Gãy Bậc Thang ('Staircase `Lv.10` / `Lv.20`').\n• **Bài toán chuẩn hóa `2,500,000` Glory Medals**: Hai người chơi cùng sở hữu `6` Quân trang: `1` Vàng (Heavy Cavalry), `3` Tím (Samurai, Bearskin Warrior, Logistic Follower) và `2` Xanh (Shield Soldier, Cavalry).",
            en: "**Quantitative Benchmark Comparison**: To prove the gap between impulsive single-skin rushing ('All-in 1 Skin') and Staircase Breakpoint allocation ('Staircase `Lv.10` / `Lv.20`').\n• **Standardized `2,500,000` Glory Medals Budget**: Two players hold `6` Troop Skins: `1` Legendary (Heavy Cavalry), `3` Epics (Samurai, Bearskin Warrior, Logistic Follower), and `2` Rares (Shield Soldier, Cavalry).",
          },
        },
        {
          type: "case_study",
          badge: {
            vi: "CASE STUDY CHUẨN HÓA • NGÂN SÁCH 2,500,000 MEDALS",
            en: "STANDARDIZED BENCHMARK • 2,500,000 MEDALS BUDGET",
          },
          title: {
            vi: "So Sánh Thực Chiến 2,500,000 Glory Medals: All-In 1 Skin Lv.25 (2,205,400) vs Bậc Thang 6 Skins Lv.20/Lv.10 (2,411,200)",
            en: "2,500,000 Glory Medals Showdown: All-In 1 Skin Lv.25 (2,205,400) vs. 6-Skin Lv.20/Lv.10 Staircase (2,411,200)",
          },
          profileSummary: {
            vi: "**Ngân sách `2,500,000` Glory Medals**: Kho Quân trang gồm `6` Skins (`1` Vàng Heavy Cavalry + `3` Tím Samurai, Bearskin Warrior, Logistic Follower + `2` Xanh Shield Soldier, Cavalry).\n• **Hai phương án đối lập**: Người chơi X dồn `2,205,400` Medals đập Heavy Cavalry lên `Lv.25`; Người chơi Y phân bổ bậc thang `Lv.10` / `Lv.20` hết `2,411,200` Medals (dư `88,800` đóng băng).",
            en: "**`2,500,000` Glory Medals Budget**: Roster of `6` Skins (`1` Legendary Heavy Cavalry + `3` Epics Samurai, Bearskin Warrior, Logistic Follower + `2` Rares Shield Soldier, Cavalry).\n• **Two Opposing Strategies**: Player X burns `2,205,400` Medals pushing Heavy Cavalry to `Lv.25`; Player Y allocates `2,411,200` Medals across `Lv.10` / `Lv.20` breakpoints (`88,800` frozen).",
          },
          metrics: [
            {
              label: {
                vi: "Tổng Chi Phí Huy Chương Tiêu Thụ & Quỹ Đóng Băng Còn Dư",
                en: "Total Glory Medals Spent & Remaining Frozen Safety Reserve",
              },
              before: {
                vi: "Người chơi X: Tiêu 2,205,400 Medals vào 1 Skin Lv.25 (5 Skin phụ kẹt ở Lv.1)",
                en: "Player X: Spent 2,205,400 Medals on 1 Lv.25 skin (5 secondary skins stuck at Lv.1)",
              },
              after: {
                vi: "Người chơi Y: Tiêu 2,411,200 Medals (948,400 + 1,422,600 + 40,200), dư 88,800 Medals đóng băng",
                en: "Player Y: Spent 2,411,200 Medals (948,400 + 1,422,600 + 40,200), keeping 88,800 Medals frozen",
              },
              delta: {
                vi: "Tối ưu 100% ngân sách + Bảo toàn Ngưỡng Đóng Băng Medal Shop",
                en: "100% budget efficiency + Preserves Medal Shop safety floor",
              },
            },
            {
              label: {
                vi: "Số Mốc Đột Phá Sao (Star Milestones) Kích Hoạt Toàn Tài Khoản",
                en: "Total Account-Wide Star Milestones Activated",
              },
              before: {
                vi: "Người chơi X: Chỉ có 1 mốc 2 Sao (Heavy Cavalry Lv.25 — chưa tới 3 Sao Lv.30)",
                en: "Player X: Only one 2-Star milestone (Heavy Cavalry Lv.25 — short of 3-Star Lv.30)",
              },
              after: {
                vi: "Người chơi Y: 4 mốc Đột phá 2 Sao (Lv.20 ★★) + 2 mốc Đột phá 1 Sao (Lv.10 ★)",
                en: "Player Y: Four 2-Star milestones (Lv.20 ★★) + Two 1-Star milestones (Lv.10 ★)",
              },
              delta: {
                vi: "+5 Mốc Đột Phá Sao Owned Passive Bonus kích hoạt đồng thời",
                en: "+5 additional Star Milestone Owned Passive Bonuses active simultaneously",
              },
            },
            {
              label: {
                vi: "Hiệu Suất Tổng % ATK & % HP Toàn Bộ Binh Lính (Total Owned Soldier Bonus)",
                en: "Total Global Soldier % ATK & % HP Multiplier Efficiency",
              },
              before: {
                vi: "Người chơi X: 1.0x cơ sở (5 dòng Owned Bonus của Tím & Xanh dậm chân ở Lv.1)",
                en: "Player X: 1.0x baseline (5 Epic & Rare Owned Bonus lines stagnant at Lv.1)",
              },
              after: {
                vi: "Người chơi Y: Cao gấp ~3.2 lần lượng Total Owned Soldier Bonus + có sẵn Bearskin Warrior Lv.20 săn Boss",
                en: "Player Y: ~3.2x higher Total Owned Soldier Bonus + ready-to-swap Lv.20 Bearskin Warrior for Bosses",
              },
              delta: {
                vi: "Lợi tức chỉ số Toàn quân gấp ~3.2 lần trên cùng ngân sách 2.5M Medals",
                en: "~3.2x higher global soldier stat ROI on the exact same 2.5M Medal budget",
              },
            },
          ],
          diagnostics: [
            {
              vi: "**Bẫy Chi Phí Bậc Nhỏ `Lv.20` ➔ `Lv.25`**: Mỗi cấp của Skin Vàng chia làm `3` bậc nhỏ, đốt thêm `1,257,000` Medals (từ `948,400` lên `2,205,400` Medals).\n• **Hệ lụy**: Vẫn chưa chạm mốc 3 Sao `Lv.30` (`4,259,400` ➔ `4,791,400` Medals), khiến hơn `1.25M` Medals của Người chơi X không mở được sao mới nào.",
              en: "**`Lv.20` ➔ `Lv.25` Sub-Level Cost Trap**: Each Legendary level splits into `3` sub-levels, burning an extra `1,257,000` Medals (from `948,400` to `2,205,400` Medals).\n• **Consequence**: Still falls short of the 3-Star `Lv.30` milestone (`4,259,400` ➔ `4,791,400` Medals), wasting `1.25M+` Medals for zero new Star breakthroughs.",
            },
            {
              vi: "**Bỏ Quên Đòn Bẩy Tỷ Lệ `4:2:1` Trên Skin Tím & Xanh**: Đưa 1 Skin Tím lên `Lv.20` ★★ chỉ tốn `50%` Skin Vàng (`474,200` vs `948,400` Medals) nhưng đạt `~80–89%` giá trị Owned Bonus.\n• **Hệ lụy**: Đạt `+11.49%` ATK / `+19.24%` HP so với `+14.38%` ATK / `+21.46%` HP ở cấp tối đa; để `3` Tím và `2` Xanh ở `Lv.1` là lãng phí lớn nhất.",
              en: "**Ignoring the `4:2:1` Ratio on Epic & Rare Skins**: Bringing an Epic skin to `Lv.20` ★★ costs `50%` of a Legendary (`474,200` vs. `948,400` Medals) for `~80–89%` Owned Bonus.\n• **Consequence**: Grants `+11.49%` ATK / `+19.24%` HP vs. `+14.38%` ATK / `+21.46%` HP at max level; leaving `3` Epics and `2` Rares at `Lv.1` leaks massive stats.",
            },
          ],
          recoverySteps: [
            {
              stepNumber: "1",
              title: {
                vi: "Đưa Heavy Cavalry (Skin Vàng đeo chính Đội 1) chạm chuẩn Lv.20 ★★",
                en: "Push Heavy Cavalry (Queue 1 Main Legendary Skin) to Lv.20 ★★",
              },
              detail: {
                vi: "Đầu tư chính xác `948,400` Medals đưa Heavy Cavalry lên mốc 2 Sao `Lv.20` ★★ (hoặc `1,155,400` Medals hoàn tất `3` nấc `20/3`), sau đó khóa nâng cấp tránh vùng trũng `Lv.21–29`.",
                en: "Invest `948,400` Medals to bring Heavy Cavalry to its 2-Star `Lv.20` ★★ breakthrough (or `1,155,400` Medals for full `20/3`), then pause upgrades to avoid the `Lv.21–29` dead zone.",
              },
              impactBadge: {
                vi: "948,400 MEDALS • 1× LV.20 ★★ VÀNG",
                en: "948,400 MEDALS • 1× LV.20 ★★ SSR",
              },
            },
            {
              stepNumber: "2",
              title: {
                vi: "Kéo đồng loạt cả 3 Skin Tím (Samurai, Bearskin Warrior, Logistic Follower) lên Lv.20 ★★",
                en: "Bring All 3 Epic Skins (Samurai, Bearskin Warrior, Logistic Follower) to Lv.20 ★★",
              },
              detail: {
                vi: "Chi `3 × 474,200 = 1,422,600` Medals mở khóa 3 mốc 2 Sao cho Samurai (công thành), Bearskin Warrior (săn Boss PvE) và Logistic Follower (hỗ trợ Rally), cộng dồn 3 tầng Owned Bonus.",
                en: "Spend `3 × 474,200 = 1,422,600` Medals to unlock 2-Star breakthroughs on Samurai (siege), Bearskin Warrior (PvE Boss), and Logistic Follower (Rally), stacking 3 global Owned Bonuses.",
              },
              impactBadge: {
                vi: "1,422,600 MEDALS • 3× LV.20 ★★ TÍM",
                en: "1,422,600 MEDALS • 3× LV.20 ★★ EPIC",
              },
            },
            {
              stepNumber: "3",
              title: {
                vi: "Đưa cả 2 Skin Xanh (Shield Soldier, Cavalry) lên Lv.10 ★ & Khóa Quỹ Đóng Băng",
                en: "Bring Both Rare Skins (Shield Soldier, Cavalry) to Lv.10 ★ & Lock Safety Reserve",
              },
              detail: {
                vi: "Chi `2 × 20,100 = 40,200` Medals kích hoạt 1 Sao cho Shield Soldier và Cavalry. Tổng chi đạt `948,400 + 1,422,600 + 40,200 = 2,411,200` Medals, giữ lại `88,800` Medals làm Ngưỡng Đóng Băng!",
                en: "Spend `2 × 20,100 = 40,200` Medals for 1-Star Shield Soldier and Cavalry. Total spend equals `948,400 + 1,422,600 + 40,200 = 2,411,200` Medals, keeping `88,800` Medals safely frozen!",
              },
              impactBadge: {
                vi: "TỔNG 2,411,200 MEDALS • DƯ 88,800 QUỸ ĐÓNG BĂNG",
                en: "2,411,200 TOTAL • 88,800 FROZEN RESERVE",
              },
            },
          ],
          conclusion: {
            vi: "**Kết quả vượt trội**: Với `2,411,200` Glory Medals phân bổ theo Lộ trình Bậc Thang, Người chơi Y đạt tổng ATK/HP Toàn quân cao gấp `~3.2` lần Người chơi X.\n• **Đa nhiệm thực chiến**: Sở hữu trọn bộ Heavy Cavalry + Bearskin Warrior + Samurai + Logistic Follower + Shield Soldier và vẫn dư `88,800` Medals.",
            en: "**Decisive Victory**: Allocating `2,411,200` Glory Medals via the Staircase Protocol gives Player Y `~3.2x` higher total global soldier ATK/HP than Player X.\n• **Full Multi-Role Roster**: Commands Heavy Cavalry + Bearskin Warrior + Samurai + Logistic Follower + Shield Soldier while banking `88,800` Medals.",
          },
        },
        {
          type: "media_spotlight",
          mediaCode: "MED-7.4-04",
          tier: "tier4_youtube_ref",
          title: {
            vi: "Video Tham Chiếu Quốc Tế: Phân Tích Ngoại Hình Quân Lính & Điểm Gãy Huy Chương Lv.10 / Lv.20",
            en: "International Reference Video: Troop Skins & Glory Medals Guide — Why Lv.10 & Lv.20 Breakpoints Beat Maxing One Skin",
          },
          description: {
            vi: "Video phân tích chuyên sâu từ cộng đồng quốc tế (RedBaron Gaming / OGFlux) giải thích cơ chế cộng dồn Owned Passive Bonus, bảng chi phí Glory Medals Lv.1–Lv.50 và lý do nâng đồng loạt Lv.10 / Lv.20 luôn vượt trội so với đập lẻ 1 Skin.",
            en: "In-depth international community breakdown (RedBaron Gaming / OGFlux) covering Owned Passive Bonus stacking, the Lv.1–Lv.50 Glory Medal cost curve, and why horizontal Lv.10 / Lv.20 breakpoints outperform single-skin maxing.",
          },
          videoChannel: "RedBaron Gaming / OGFlux",
          videoTitle: "Troop Skins & Glory Medals Guide: Why Level 10 & 20 Breakpoints Beat Maxing One Skin",
          videoTimestamp: "01:45 – 08:20",
          videoUrl: "https://www.youtube.com/results?search_query=Top+Heroes+Troop+Skins+Glory+Medals+Guide",
        },
      ],
    },
  ],
};

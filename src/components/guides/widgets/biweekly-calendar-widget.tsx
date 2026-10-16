"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Calendar,
  Clock,
  Flame,
  ShieldAlert,
  Sparkles,
  Search,
  X,
  CheckCircle2,
  Layers,
} from "lucide-react";
import type {
  GuideArticle,
  GuideLocale,
  GuideTableBlock,
} from "@/content/guides/types";
import { ARTICLE_3_1_BIWEEKLY_ROTATION } from "@/content/guides/groups/group-3/3.1-biweekly-rotation";
import { ARTICLE_3_3_WEEK_B_ARMS_RACE } from "@/content/guides/groups/group-3/3.3-week-b-arms-race";
import { ARTICLE_3_4_DOUBLE_DIP_SCHEDULE } from "@/content/guides/groups/group-3/3.4-double-dip-schedule";
import { cn } from "@/lib/utils";

export type CalendarMode = "phase1" | "weekA" | "weekB" | "doubledip";
export type DoubleDipTierFilter = "all" | "300" | "200" | "immediate";

interface BiweeklyCalendarWidgetProps {
  article?: GuideArticle;
  locale?: GuideLocale;
}

interface DayScheduleEntry {
  dayNumber: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  shortLabel: string;
  fullLabel: string;
  guildRush: string;
  stageTitle: string;
  scoringDetail: string;
  goldenWindow: string;
  tabooWarning: string;
}

interface DoubleDipItemRecord {
  index: string;
  itemName: string;
  tripleDip300: string;
  doubleDip200: string;
  singleDip100: string;
  forbidden0: string;
  isImmediateSpend: boolean;
}

const LABELS: Record<
  GuideLocale,
  {
    badge: string;
    title: string;
    subtitle: string;
    modes: Record<CalendarMode, string>;
    todayBadge: string;
    dayNamesShort: [string, string, string, string, string, string, string];
    dayNamesFull: [string, string, string, string, string, string, string];
    guildRushLabel: string;
    goldenWindowLabel: string;
    scoringLabel: string;
    tabooLabel: string;
    phase1Heading: string;
    phase1BackboneTitle: string;
    phase1BackboneDesc: string;
    phase1SatellitesTitle: string;
    phase1Satellites: string[];
    phase1StrategyTitle: string;
    phase1StrategyDesc: string;
    doubleDipSearchPlaceholder: string;
    tierFilters: Record<DoubleDipTierFilter, string>;
    tier300Label: string;
    tier200Label: string;
    tier100Label: string;
    tier0Label: string;
  }
> = {
  vi: {
    badge: "BỘ LẬP LỊCH TƯƠNG TÁC • CHU KỲ 14 NGÀY & DOUBLE-DIP",
    title: "Lịch Chu Kỳ Sự Kiện & Tra Cứu Double-Dip 300%",
    subtitle:
      "Chuyển đổi Pha 1 (Server Mới) ⇄ Pha 2 (Tuần A Thi Đấu Hội / Tuần B GAR-KvK) & Khung giờ vàng 4 tiếng",
    modes: {
      weekB: "⚔️ Tuần B: Đua Vũ Trang (GAR/KvK)",
      weekA: "🛡️ Tuần A: Thi Đấu Hội (Guild Race)",
      phase1: "🌱 Pha 1: Server Mới (Pre-Season)",
      doubledip: "🔥 Tra Cứu 13 Vật Phẩm (300%)",
    },
    todayBadge: "HÔM NAY",
    dayNamesShort: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
    dayNamesFull: [
      "Thứ Hai (Ngày 1)",
      "Thứ Ba (Ngày 2)",
      "Thứ Tư (Ngày 3)",
      "Thứ Năm (Ngày 4)",
      "Thứ Sáu (Ngày 5)",
      "Thứ Bảy (Ngày 6)",
      "Chủ Nhật (Ngày 7)",
    ],
    guildRushLabel: "Guild Rush 2 Ngày chạy song song:",
    goldenWindowLabel: "Khung Giờ Vàng Giao Thoa (+20%):",
    scoringLabel: "Nguồn Điểm Chính & Cộng Điểm Phụ:",
    tabooLabel: "⛔ Cảnh Báo Đỏ & Cấm Kỵ Trong Ngày:",
    phase1Heading:
      "Cấu Trúc Lịch Pha 1 — Server Mới Mở (Trục Cố Định Thi Đấu Hội Hàng Tuần + Vệ Tinh Luân Phiên)",
    phase1BackboneTitle:
      "1. Trục Cố Định Hàng Tuần: Thi Đấu Hội (Guild Race) Chạy Nối Tiếp",
    phase1BackboneDesc:
      "Ở 2–3 tuần đầu mở máy chủ (trước khi mở KvK liên server), Thi Đấu Hội (Guild Race) xuất hiện liên tục mỗi tuần để bang hội tích lũy Xu Vinh Quang và Rương Mốc 9. Áp dụng ngay Kỷ luật 2 Giai đoạn: Ngày 1–4 làm nhiệm vụ thường, Ngày 5–7 mở khóa Nhiệm vụ Vàng Độc quyền!",
    phase1SatellitesTitle:
      "2. Hai Cặp Sự Kiện Vệ Tinh Luân Phiên Hàng Tuần:",
    phase1Satellites: [
      "Mục Thường: Đế Quốc Hắc Ám Xâm Nhập (Dark Empire Invasion) ⇄ Khiêu Chiến Đội Quân Hắc Ám (Dark Legion Challenge)",
      "Mục Event Giá Trị: Bắt Bướm (Butterfly Catching) ⇄ Tập Kích Cự Ma + Thẻ Thông Hành Cự Ma (Giant/Troll Raid)",
      "Sự Kiện Gacha Đi Kèm: Xúc Xắc (Dice Event) & Vòng Quay May Mắn (Lucky Wheel) — Tích Kim Cương chờ tướng Đỏ Bộ Lạc (Ngày 21+)",
    ],
    phase1StrategyTitle:
      "3. Nguyên Tắc Tích Trữ Chuyển Tiếp Lên Pha 2 (KvK / GAR):",
    phase1StrategyDesc:
      "Tuyệt đối không đốt Mảnh Vạn Năng Vàng, Hồn Đá Đỏ và Vé Chiêu Mộ cho các nhiệm vụ bảng chung của Thi Đấu Hội Pha 1. Hãy giữ nguyên trong kho để đón kỳ GAR / KvK đầu tiên!",
    doubleDipSearchPlaceholder:
      "Tìm vật phẩm (Mảnh Tướng, Hồn Đá Đỏ, Đồ Chúa Tể, Thánh Vật, Cổ Ngữ, Pet...)",
    tierFilters: {
      all: "Tất cả (13 Nhóm)",
      "300": "🔥 Cú Nổ 300% (Triple-Dip)",
      "200": "🟢 Giao Thoa 200% (Double-Dip)",
      immediate: "⚡ Đập Ngay Cho Đội 1",
    },
    tier300Label: "🔥 Cửa Sổ 300% (Triple-Dip Tối Thượng):",
    tier200Label: "🟢 Cửa Sổ 200% (Double-Dip Chuẩn):",
    tier100Label: "🟡 Cửa Sổ 100% (Chữa Cháy Cơ Bản):",
    tier0Label: "⛔ Cấm Kỵ Tuyệt Đối (0% Điểm):",
  },
  en: {
    badge: "INTERACTIVE PLANNER • 14-DAY CYCLE & DOUBLE-DIP",
    title: "Biweekly Event Cycle & 300% Double-Dip Planner",
    subtitle:
      "Switch Phase 1 (New Server) ⇄ Phase 2 (Week A Guild Race / Week B GAR-KvK) & 4-Hour Golden Windows",
    modes: {
      weekB: "⚔️ Week B: Arms Race (GAR/KvK)",
      weekA: "🛡️ Week A: Guild Race (Dice)",
      phase1: "🌱 Phase 1: New Server (Pre-Season)",
      doubledip: "🔥 13-Item Double-Dip Lookup (300%)",
    },
    todayBadge: "TODAY",
    dayNamesShort: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    dayNamesFull: [
      "Monday (Day 1)",
      "Tuesday (Day 2)",
      "Wednesday (Day 3)",
      "Thursday (Day 4)",
      "Friday (Day 5)",
      "Saturday (Day 6)",
      "Sunday (Day 7)",
    ],
    guildRushLabel: "Concurrent 2-Day Guild Rush:",
    goldenWindowLabel: "4-Hour Golden Overlap Window (+20%):",
    scoringLabel: "Primary & Secondary Scoring Actions:",
    tabooLabel: "⛔ Daily Red Alert & Strict Taboo:",
    phase1Heading:
      "Phase 1 Schedule Architecture — New Servers (Continuous Weekly Guild Race + Rotating Satellites)",
    phase1BackboneTitle:
      "1. Continuous Weekly Backbone: Back-to-Back Guild Race",
    phase1BackboneDesc:
      "During the first 2–3 weeks of a new server (prior to cross-server KvK unlock), Guild Race runs continuously every week so guilds can stack Guild Glory Coins and Tier 9 Chests. Enforce the 2-Stage Rhythm: Days 1–4 standard tasks, Days 5–7 Exclusive Gold Tasks!",
    phase1SatellitesTitle: "2. Two Weekly Rotating Satellite Event Pairs:",
    phase1Satellites: [
      "Regular Tab: Dark Empire Invasion ⇄ Dark Legion Challenge",
      "Value Event Tab: Butterfly Catching ⇄ Giant/Troll Raid + Giant Raid Pass",
      "Paired Gacha Events: Dice Event & Lucky Wheel — Hoard Diamonds for Horde Mythic releases (Day 21+)",
    ],
    phase1StrategyTitle:
      "3. Hoarding Transition Rule Into Phase 2 (KvK / GAR):",
    phase1StrategyDesc:
      "Never burn Universal Legendary Shards, Red Soul Stones, or Recruit Tokens on shared Phase 1 Guild Race board tasks. Lock them in your inventory for the first GAR / KvK cycle!",
    doubleDipSearchPlaceholder:
      "Search inventory item (Hero Shards, Soul Stones, Lord Gear, Relics, Runes, Pets...)",
    tierFilters: {
      all: "All (13 Categories)",
      "300": "🔥 300% Triple-Dip Burst",
      "200": "🟢 200% Double-Dip Overlap",
      immediate: "⚡ Spend Immediately (Queue 1)",
    },
    tier300Label: "🔥 300% Triple-Dip Window (Apex ROI):",
    tier200Label: "🟢 200% Double-Dip Window (Standard):",
    tier100Label: "🟡 100% Single-Dip Window (Fallback):",
    tier0Label: "⛔ Strictly Forbidden (0% Points):",
  },
};

function buildWeekBSchedule(locale: GuideLocale): DayScheduleEntry[] {
  const sec1 = ARTICLE_3_3_WEEK_B_ARMS_RACE.freeSections.find(
    (s) => s.id === "sec-1-six-day-themes-and-overlap"
  );
  const sub1 = sec1?.subSections?.find(
    (sub) => sub.id === "sub-1-1-six-day-master-table"
  );
  const table = sub1?.blocks.find(
    (b): b is GuideTableBlock => b.type === "table"
  );
  const rows = table?.rows ?? [];

  const taboosVi = [
    "Cấm bấm nhận công trình hoàn tất trước 13:00 Thứ Hai; cấm xả Đồ Chúa Tể hay Mảnh Tướng vào Ngày 1.",
    "Cấm mở Rương Cổ Ngữ Tự Chọn ở Lv.1–Lv.3; cấm ghép Cổ Ngữ ngoài khung 17:00–21:00 Thứ Ba.",
    "GAR tiêu chuẩn Ngày 3 Thứ Tư KHÔNG tính điểm Behemoth (chỉ KvK / Top Lord mới tính). Cấm xả Mảnh Tướng Vàng trước Thứ Năm!",
    "Sau khi xả xong Đại Lễ Tướng 17:00–21:00, khóa sổ ngay lập tức — không xả lố sang Thứ Sáu!",
    "CẢNH BÁO ĐỎ: Ở GAR tiêu chuẩn Ngày 5 (Thứ Sáu), Thánh Vật (Relics) được 0 điểm! Chỉ xả Thú Cưng, Mảnh Anh Linh & Tăng tốc Luyện lính.",
    "CẢNH BÁO ĐỎ: Đồ Chúa Tể (Lord Gear) được 0 điểm vào Ngày 6 (Thứ Bảy)! Ngày 6 chỉ cộng điểm phụ cho Quân Trang (Glory Medals), Trang Trí, Pet & Behemoth.",
  ];

  const taboosEn = [
    "Never unwrap completed building boxes before Monday 13:00; never spend Lord Gear or Hero Shards on Day 1.",
    "Never open Choice Rune Chests at Lv.1–Lv.3; never fuse Runes outside Tuesday 17:00–21:00.",
    "Standard GAR Day 3 Wednesday grants ZERO points for Behemoth (only KvK / Top Lord scores it). Hold Hero Shards until Thursday!",
    "Once the 17:00–21:00 Hero Burst window ends, lock your vault immediately — do not overspend into Friday!",
    "RED ALERT: In standard GAR Day 5 (Friday), Relics grant ZERO points! Only spend Pets, Heroic Spirit Shards & Troop Training Speedups.",
    "RED ALERT: Lord Gear grants ZERO points on Day 6 (Saturday)! Day 6 secondary scoring only applies to Troop Skins (Glory Medals), Decor, Pets & Behemoth.",
  ];

  const copy = LABELS[locale];
  const entries: DayScheduleEntry[] = [];

  for (let i = 0; i < 6; i++) {
    const r = rows[i];
    const dayNum = (i + 1) as 1 | 2 | 3 | 4 | 5 | 6;
    entries.push({
      dayNumber: dayNum,
      shortLabel: copy.dayNamesShort[i],
      fullLabel: copy.dayNamesFull[i],
      guildRush: r ? r[0][locale] : copy.dayNamesFull[i],
      stageTitle: r ? r[1][locale] : "",
      scoringDetail: r ? r[2][locale] : "",
      goldenWindow: r ? r[3][locale] : "17:00 – 21:00",
      tabooWarning: locale === "vi" ? taboosVi[i] : taboosEn[i],
    });
  }

  // Day 7 (Sunday Preparation)
  entries.push({
    dayNumber: 7,
    shortLabel: copy.dayNamesShort[6],
    fullLabel: copy.dayNamesFull[6],
    guildRush:
      locale === "vi"
        ? "Chủ Nhật (Ngày Nghỉ & Chuẩn Bị Chuyển Chu Kỳ Tuần A)"
        : "Sunday (Rest & Transition Prep for Week A Guild Race)",
    stageTitle:
      locale === "vi"
        ? "Tổng Kết GAR/KvK & Ủ Công Trình Đón Tuần Mới"
        : "GAR/KvK Settlement & Pre-Building for Next Cycle",
    scoringDetail:
      locale === "vi"
        ? "• Nhận thưởng tổng kết tuần GAR/KvK. • Bấm xây trước các công trình lớn để ủ hộp quà công trình và giữ toàn bộ Vé Nhiệm Vụ chuẩn bị cho 09:00 sáng Thứ Hai."
        : "• Claim weekly GAR/KvK settlement rewards. • Start long construction timers to pre-cook building boxes and hold Task Attempts for Monday 09:00.",
    goldenWindow:
      locale === "vi"
        ? "Đóng băng kho đồ — Chuẩn bị cho 09:00 Thứ Hai"
        : "Freeze Inventory — Prepare for Monday 09:00 Reset",
    tabooWarning:
      locale === "vi"
        ? "Tuyệt đối không xả bất kỳ vật phẩm tích trữ nào vào Chủ Nhật khi bảng điểm GAR/KvK đã đóng!"
        : "Strictly forbidden to spend any hoarded inventory items on Sunday after GAR/KvK scoring closes!",
  });

  return entries;
}

function buildWeekASchedule(locale: GuideLocale): DayScheduleEntry[] {
  const copy = LABELS[locale];
  if (locale === "vi") {
    return [
      {
        dayNumber: 1,
        shortLabel: copy.dayNamesShort[0],
        fullLabel: copy.dayNamesFull[0],
        guildRush: "Guild Rush 2 Ngày (Thứ 2–3): Nâng Cấp Thú Cưng (Pets Development)",
        stageTitle: "Giai Đoạn 1 (Ngày 1–4): Mở Bảng 9 Ô Thi Đấu Hội & Giao Thoa Pet",
        scoringDetail:
          "• Chốt 2 Ô Nhiệm Vụ Độc Quyền (làm mới mỗi 10 phút). • Ưu tiên nhận Nhiệm vụ Vàng Thức ăn Thú Cưng kết hợp lấy mốc Guild Rush Thú Cưng + Sự kiện phụ Pet Power.",
        goldenWindow: "13:00 – 17:00 & 17:00 – 21:00 (Làm mới Ô Độc Quyền mỗi 10 phút)",
        tabooWarning:
          "Cấm mua thêm lượt nhiệm vụ bằng Kim Cương ở Ngày 1–4 và cấm xả Đồ Chúa Tể trước Thứ Sáu!",
      },
      {
        dayNumber: 2,
        shortLabel: copy.dayNamesShort[1],
        fullLabel: copy.dayNamesFull[1],
        guildRush: "Guild Rush 2 Ngày (Thứ 2–3): Nâng Cấp Thú Cưng (Pets Development)",
        stageTitle: "Giai Đoạn 1 (Ngày 2): Chốt Sổ Mốc Guild Rush Thú Cưng",
        scoringDetail:
          "• Hoàn tất các nhiệm vụ Thú Cưng, Thu thập mỏ hoặc Đánh quái trên bảng 9 ô Thi Đấu Hội trước khi Guild Rush Pet kết thúc.",
        goldenWindow: "17:00 – 21:00 (Hoàn tất rương mốc Guild Rush Pet)",
        tabooWarning:
          "Cấm nhận nhiệm vụ tiêu 20–40 Mảnh Tướng Vàng hoặc quay 50–80 Vé Chiêu Mộ trên bảng chung!",
      },
      {
        dayNumber: 3,
        shortLabel: copy.dayNamesShort[2],
        fullLabel: copy.dayNamesFull[2],
        guildRush: "Guild Rush 2 Ngày (Thứ 4–5): Thánh Tích (Relic Hall & Relics)",
        stageTitle: "Giai Đoạn 1 (Ngày 3): Giao Thoa Nhiệm Vụ Thánh Vật (Relics)",
        scoringDetail:
          "• Nhận Nhiệm vụ Độc quyền nâng cấp Thánh Vật trên bảng Guild Race kết hợp ăn trọn mốc Guild Rush Thánh Tích (Thứ 4–5) và sự kiện phụ Relic Power.",
        goldenWindow: "17:00 – 21:00 (Giao thoa Guild Race + Guild Rush Thánh Tích)",
        tabooWarning:
          "Chỉ xả vừa đủ mảnh Thánh Vật khớp điểm nhiệm vụ đang cầm, giữ phần dư cho Ngày 1–2 Tuần B!",
      },
      {
        dayNumber: 4,
        shortLabel: copy.dayNamesShort[3],
        fullLabel: copy.dayNamesFull[3],
        guildRush: "Guild Rush 2 Ngày (Thứ 4–5): Thánh Tích (Relic Hall & Relics)",
        stageTitle: "Giai Đoạn 1 (Ngày 4): Đêm Trước Giờ Mở Khóa Nhiệm Vụ Huyền Thoại",
        scoringDetail:
          "• Hoàn tất nốt mốc Thánh Tích. • Giữ lại lượt nhận nhiệm vụ tối Thứ Năm để sẵn sàng đón Nhiệm Vụ Huyền Thoại Độc Quyền mở khóa vào Ngày 5!",
        goldenWindow: "21:00 – 01:00 (Chuẩn bị bước sang Giai đoạn 2 Ngày 5–7)",
        tabooWarning:
          "Cấm xả Đồ Chúa Tể (Lord Gear) vào Thứ Năm Tuần A — hãy đợi đúng sáng Thứ Sáu Ngày 5!",
      },
      {
        dayNumber: 5,
        shortLabel: copy.dayNamesShort[4],
        fullLabel: copy.dayNamesFull[4],
        guildRush:
          "Guild Rush 2 Ngày (Thứ 6–7): Quân Trang & Đồ Chúa Tể (Troop Skin & Lord Gear)",
        stageTitle:
          "🔥 Giai Đoạn 2 (Ngày 5): Mở Khóa Nhiệm Vụ Huyền Thoại Độc Quyền (+300 ➔ +450đ)",
        scoringDetail:
          "• Xoay Ô Độc Quyền (10 phút/lần) lấy Nhiệm vụ Vàng Đồ Chúa Tể (Lord Gear) hoặc Luyện lính bậc thang. • Trùng khớp 100% với Guild Rush Quân Trang & Đồ Chúa Tể + Sự kiện phụ Lord's Set (Triple-Dip 300%)!",
        goldenWindow: "17:00 – 21:00 & 21:00 – 01:00 (Cú nổ Triple-Dip Lord Gear Tuần A)",
        tabooWarning:
          "Bắt buộc phải nhận Nhiệm vụ Vàng Lord Gear trên bảng Guild Race TRƯỚC khi bấm nâng cấp Đồ Chúa Tể!",
      },
      {
        dayNumber: 6,
        shortLabel: copy.dayNamesShort[5],
        fullLabel: copy.dayNamesFull[5],
        guildRush:
          "Guild Rush 2 Ngày (Thứ 6–7): Quân Trang & Đồ Chúa Tể (Troop Skin & Lord Gear)",
        stageTitle:
          "🔥 Giai Đoạn 2 (Ngày 6): Đua Nước Rút Rương Cá Nhân Hạng 9 (Tier 9 Chest)",
        scoringDetail:
          "• Tiếp tục xoay 2 Ô Độc Quyền mỗi 10 phút lấy nhiệm vụ Lord Gear / Quân Trang / Tăng tốc để cán mốc Rương Cá Nhân Hạng 9 (nhận Xu Vinh Quang tối đa).",
        goldenWindow: "13:00 – 17:00 & 17:00 – 21:00 (Nước rút Rương Hạng 9)",
        tabooWarning:
          "Khi đã đủ điểm mở Rương Hạng 9, dừng xả ngay lập tức để bảo toàn phôi Đồ Chúa Tể cho Ngày 3–4 Tuần B!",
      },
      {
        dayNumber: 7,
        shortLabel: copy.dayNamesShort[6],
        fullLabel: copy.dayNamesFull[6],
        guildRush: "Chủ Nhật (Ngày 7): Chốt Sổ Thi Đấu Hội & Chuẩn Bị Sang Tuần B (GAR/KvK)",
        stageTitle: "Tổng Kết Rương Hạng 9 & Ủ Công Trình Đón Thứ Hai Tuần B",
        scoringDetail:
          "• Kiểm tra điểm cá nhân đã đạt mốc Rương Hạng 9 trước khi bảng đóng lúc 09:00 sáng Thứ Hai. • Bấm xây trước công trình lớn để ủ hộp quà cho Ngày 1 Tuần B.",
        goldenWindow: "Trước 09:00 sáng Thứ Hai (Chốt bảng Thi Đấu Hội)",
        tabooWarning:
          "Cấm quên nhận thưởng mốc cá nhân và cấm tiêu thủng sàn 12,000–18,000 Xu Vinh Quang trong Tiệm Bang!",
      },
    ];
  }

  return [
    {
      dayNumber: 1,
      shortLabel: copy.dayNamesShort[0],
      fullLabel: copy.dayNamesFull[0],
      guildRush: "2-Day Guild Rush (Mon–Tue): Pets Development",
      stageTitle: "Stage 1 (Days 1–4): 9-Slot Guild Race Board & Pet Overlap",
      scoringDetail:
        "• Lock onto the 2 Exclusive Task Slots (10-min refresh). • Prioritize Gold Pet Food tasks overlapping with Guild Rush: Pets Development + Pet Power sub-event.",
      goldenWindow: "13:00 – 17:00 & 17:00 – 21:00 (Refresh Exclusive Slots every 10m)",
      tabooWarning:
        "Never buy extra task attempts with Diamonds on Days 1–4 and never spend Lord Gear before Friday!",
    },
    {
      dayNumber: 2,
      shortLabel: copy.dayNamesShort[1],
      fullLabel: copy.dayNamesFull[1],
      guildRush: "2-Day Guild Rush (Mon–Tue): Pets Development",
      stageTitle: "Stage 1 (Day 2): Complete Guild Rush Pet Milestones",
      scoringDetail:
        "• Finish Pet, Gathering, or Monster tasks on the 9-slot Guild Race board before Pets Guild Rush ends.",
      goldenWindow: "17:00 – 21:00 (Claim Pets Guild Rush milestone chests)",
      tabooWarning:
        "Never accept 20–40 Legendary Shard or 50–80 Recruit Token tasks on the shared board!",
    },
    {
      dayNumber: 3,
      shortLabel: copy.dayNamesShort[2],
      fullLabel: copy.dayNamesFull[2],
      guildRush: "2-Day Guild Rush (Wed–Thu): Relic Hall & Relics",
      stageTitle: "Stage 1 (Day 3): Relic Upgrade Task Overlap",
      scoringDetail:
        "• Roll Exclusive Relic tasks on the Guild Race board overlapping with Wed–Thu Relic Guild Rush and Relic Power sub-event.",
      goldenWindow: "17:00 – 21:00 (Guild Race + Relic Guild Rush overlap)",
      tabooWarning:
        "Spend only enough Relic shards to complete your active task; save the rest for Days 1–2 of Week B!",
    },
    {
      dayNumber: 4,
      shortLabel: copy.dayNamesShort[3],
      fullLabel: copy.dayNamesFull[3],
      guildRush: "2-Day Guild Rush (Wed–Thu): Relic Hall & Relics",
      stageTitle: "Stage 1 (Day 4): Eve of Exclusive Legendary Task Unlock",
      scoringDetail:
        "• Wrap up Relic milestones. • Hold remaining task attempts on Thursday night so you are ready when Exclusive Legendary Tasks unlock on Day 5!",
      goldenWindow: "21:00 – 01:00 (Prep for Stage 2 Days 5–7)",
      tabooWarning:
        "Never spend Lord Gear on Thursday of Week A — wait until Friday morning (Day 5)!",
    },
    {
      dayNumber: 5,
      shortLabel: copy.dayNamesShort[4],
      fullLabel: copy.dayNamesFull[4],
      guildRush: "2-Day Guild Rush (Fri–Sat): Troop Skin & Lord Gear",
      stageTitle:
        "🔥 Stage 2 (Day 5): Exclusive Legendary Tasks Unlock (+300 ➔ +450 pts)",
      scoringDetail:
        "• Refresh your 2 Exclusive Slots (every 10m) for Gold Lord Gear or Staircase Troop tasks. • 100% overlap with Guild Rush: Troop Skin & Lord Gear + Lord's Set sub-event (300% Triple-Dip)!",
      goldenWindow: "17:00 – 21:00 & 21:00 – 01:00 (Week A Lord Gear 300% Burst)",
      tabooWarning:
        "Always accept the Gold Lord Gear task on the Guild Race board BEFORE clicking upgrade on your Lord Gear!",
    },
    {
      dayNumber: 6,
      shortLabel: copy.dayNamesShort[5],
      fullLabel: copy.dayNamesFull[5],
      guildRush: "2-Day Guild Rush (Fri–Sat): Troop Skin & Lord Gear",
      stageTitle: "🔥 Stage 2 (Day 6): Final Sprint to Tier 9 Personal Chest",
      scoringDetail:
        "• Continue refreshing the 2 Exclusive Slots every 10 minutes for Lord Gear / Troop Skin / Speedup tasks to secure the Tier 9 Personal Chest (maximum Guild Glory Coins).",
      goldenWindow: "13:00 – 17:00 & 17:00 – 21:00 (Tier 9 Chest Sprint)",
      tabooWarning:
        "Once you hit the Tier 9 Chest threshold, stop spending immediately to save Lord Gear materials for Days 3–4 of Week B!",
    },
    {
      dayNumber: 7,
      shortLabel: copy.dayNamesShort[6],
      fullLabel: copy.dayNamesFull[6],
      guildRush: "Sunday (Day 7): Guild Race Settlement & Week B GAR/KvK Prep",
      stageTitle: "Tier 9 Chest Settlement & Pre-Cooking Buildings for Week B",
      scoringDetail:
        "• Verify your personal points have reached Tier 9 Chest before Monday 09:00 close. • Start long building upgrades to pre-cook gift boxes for Day 1 of Week B.",
      goldenWindow: "Before Monday 09:00 Reset (Guild Race Board Closes)",
      tabooWarning:
        "Never forget to claim personal milestone chests and never spend below the 12,000–18,000 Guild Glory Coin floor!",
    },
  ];
}

function extractDoubleDipItems(locale: GuideLocale): DoubleDipItemRecord[] {
  const sec4 = ARTICLE_3_4_DOUBLE_DIP_SCHEDULE.proSections.find(
    (s) => s.id === "sec-4-master-double-dip-matrix"
  );
  const sub42 = sec4?.subSections?.find(
    (sub) => sub.id === "sub-4-2-thirteen-item-master-matrix"
  );
  const table = sub42?.blocks.find(
    (b): b is GuideTableBlock => b.type === "table"
  );
  const rows = table?.rows ?? [];

  return rows
    .filter((r) => r.length >= 6)
    .map((r) => {
      const idx = r[0][locale];
      const triple = r[2][locale];
      const isImmediate =
        idx === "5" || /đập ngay|spend immediately/i.test(triple);
      return {
        index: idx,
        itemName: r[1][locale],
        tripleDip300: triple,
        doubleDip200: r[3][locale],
        singleDip100: r[4][locale],
        forbidden0: r[5][locale],
        isImmediateSpend: isImmediate,
      };
    });
}

export function BiweeklyCalendarWidget({
  article,
  locale = "vi",
}: BiweeklyCalendarWidgetProps) {
  const copy = LABELS[locale];
  const containerRef = useRef<HTMLDivElement | null>(null);

  const initialMode: CalendarMode =
    article?.slug === "double-dip-schedule" ? "doubledip" : "weekB";

  const [activeMode, setActiveMode] = useState<CalendarMode>(initialMode);
  const [selectedDay, setSelectedDay] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7>(1);
  const [todayDay, setTodayDay] = useState<number | null>(null);
  const [tierFilter, setTierFilter] = useState<DoubleDipTierFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // GAP-P3-06: SSR-Safe Today detection inside useEffect after hydration
  useEffect(() => {
    const jsDay = new Date().getDay(); // 0 = Sun, 1 = Mon ... 6 = Sat
    const isoDay = (jsDay === 0 ? 7 : jsDay) as 1 | 2 | 3 | 4 | 5 | 6 | 7;
    setTodayDay(isoDay);
  }, []);

  // GAP-P3-09: Sync with GuidesToc CustomEvent
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleTocNavigate = (e: Event) => {
      const customEvent = e as CustomEvent<{
        id?: string;
        targetId?: string;
      }>;
      const targetId =
        customEvent.detail?.targetId || customEvent.detail?.id || "";
      if (!targetId) return;

      if (targetId.includes("phase-1")) {
        setActiveMode("phase1");
      } else if (
        targetId.includes("guild-rush") ||
        targetId.includes("week-a")
      ) {
        setActiveMode("weekA");
      } else if (
        targetId.includes("thirteen-item") ||
        targetId.includes("inventory-taxonomy")
      ) {
        setActiveMode("doubledip");
      }
    };

    window.addEventListener("tophub:toc-navigate", handleTocNavigate);
    return () => {
      window.removeEventListener("tophub:toc-navigate", handleTocNavigate);
    };
  }, []);

  const weekBSchedule = useMemo(() => buildWeekBSchedule(locale), [locale]);
  const weekASchedule = useMemo(() => buildWeekASchedule(locale), [locale]);
  const doubleDipItems = useMemo(() => extractDoubleDipItems(locale), [locale]);

  const activeDayEntry = useMemo(() => {
    const list = activeMode === "weekA" ? weekASchedule : weekBSchedule;
    return list.find((d) => d.dayNumber === selectedDay) ?? list[0];
  }, [activeMode, selectedDay, weekASchedule, weekBSchedule]);

  const filteredDoubleDipItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return doubleDipItems.filter((item) => {
      if (tierFilter === "immediate" && !item.isImmediateSpend) return false;
      if (tierFilter === "300" && item.isImmediateSpend) return false;
      if (tierFilter === "200" && item.isImmediateSpend) return false;
      if (q) {
        const haystack = [
          item.itemName,
          item.tripleDip300,
          item.doubleDip200,
          item.singleDip100,
          item.forbidden0,
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [doubleDipItems, tierFilter, searchQuery]);

  // KeepARTICLE_3_1_BIWEEKLY_ROTATION referenced for SSoT traceability
  const _ssot31Slug = ARTICLE_3_1_BIWEEKLY_ROTATION.slug;

  return (
    <div
      ref={containerRef}
      data-testid="widget-biweekly-calendar"
      data-ssot-ref={_ssot31Slug}
      className="my-5 rounded-2xl border border-amber-500/35 bg-card/85 dark:bg-slate-950/80 p-4 sm:p-6 space-y-5 shadow-lg shadow-amber-500/5"
    >
      {/* Header */}
      <div className="space-y-1 pb-4 border-b border-border/60">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 px-2.5 py-0.5 text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400">
          <Calendar className="h-3 w-3" />
          <span>{copy.badge}</span>
        </div>
        <h3 className="font-heading font-black text-lg sm:text-xl text-foreground">
          {copy.title}
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground">
          {copy.subtitle}
        </p>
      </div>

      {/* Mode Switcher Tabs (Touch Target >= 44px) */}
      <div
        role="tablist"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2"
      >
        {(
          ["weekB", "weekA", "phase1", "doubledip"] as CalendarMode[]
        ).map((mode) => {
          const isActive = activeMode === mode;
          return (
            <button
              key={mode}
              type="button"
              role="tab"
              aria-selected={isActive}
              data-testid={`calendar-phase-${mode}`}
              onClick={() => setActiveMode(mode)}
              className={cn(
                "min-h-[44px] px-3.5 py-2 rounded-xl border text-xs font-extrabold transition-all text-left flex items-center justify-between gap-2 cursor-pointer",
                isActive
                  ? "border-amber-500 bg-amber-500/15 text-amber-700 dark:text-amber-300 shadow-sm ring-1 ring-amber-500/30"
                  : "border-border/60 bg-background/60 text-muted-foreground hover:text-foreground hover:bg-muted/40"
              )}
            >
              <span className="truncate">{copy.modes[mode]}</span>
            </button>
          );
        })}
      </div>

      {/* Mode 1: Phase 1 (New Server Continuous Guild Race + Rotating Satellites) */}
      {activeMode === "phase1" && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 sm:p-5 space-y-4">
          <h4 className="font-heading font-extrabold text-sm sm:text-base text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
            <Layers className="h-4 w-4 shrink-0" />
            <span>{copy.phase1Heading}</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <div className="rounded-xl border border-border/60 bg-background/80 p-3.5 space-y-1.5">
              <div className="text-xs font-extrabold text-foreground">
                {copy.phase1BackboneTitle}
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {copy.phase1BackboneDesc}
              </p>
            </div>

            <div className="rounded-xl border border-border/60 bg-background/80 p-3.5 space-y-2">
              <div className="text-xs font-extrabold text-foreground">
                {copy.phase1SatellitesTitle}
              </div>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                {copy.phase1Satellites.map((sat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{sat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-xl border border-amber-500/35 bg-amber-500/10 p-3.5 space-y-1">
            <div className="text-xs font-extrabold text-amber-700 dark:text-amber-300">
              {copy.phase1StrategyTitle}
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {copy.phase1StrategyDesc}
            </p>
          </div>
        </div>
      )}

      {/* Mode 2 & 3: Week A (Guild Race) & Week B (GAR/KvK) 7-Day Interactive Planner */}
      {(activeMode === "weekA" || activeMode === "weekB") && (
        <div className="space-y-4">
          {/* 7-Day Selector Bar */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 snap-x">
            {(
              activeMode === "weekA" ? weekASchedule : weekBSchedule
            ).map((day) => {
              const isSelected = selectedDay === day.dayNumber;
              const isToday = todayDay === day.dayNumber;
              return (
                <button
                  key={day.dayNumber}
                  type="button"
                  data-testid={`calendar-day-pill-${day.dayNumber}`}
                  aria-pressed={isSelected}
                  onClick={() => setSelectedDay(day.dayNumber)}
                  className={cn(
                    "snap-start shrink-0 min-h-[44px] min-w-[88px] sm:min-w-[105px] px-3 py-2 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer",
                    isSelected
                      ? "border-amber-500 bg-amber-500/15 text-amber-700 dark:text-amber-300 shadow-sm ring-1 ring-amber-500/40"
                      : "border-border/60 bg-background/70 text-muted-foreground hover:text-foreground hover:bg-muted/40"
                  )}
                >
                  <div className="flex items-center justify-between gap-1 w-full">
                    <span className="font-mono text-xs font-black">
                      {day.shortLabel}
                    </span>
                    {isToday && (
                      <span className="rounded bg-amber-500 px-1.5 py-0.2 text-[9px] font-mono font-black text-slate-950">
                        {copy.todayBadge}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-medium truncate w-full mt-0.5">
                    {day.stageTitle.replace(/^🔥\s*/, "")}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Day Detail Panel */}
          <div
            data-testid="calendar-active-day-panel"
            className="rounded-2xl border border-border/80 bg-background/85 p-4 sm:p-5 space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-border/50">
              <div>
                <div className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
                  {activeDayEntry.fullLabel} • {activeDayEntry.guildRush}
                </div>
                <h4 className="font-heading font-black text-base sm:text-lg text-foreground mt-0.5">
                  {activeDayEntry.stageTitle}
                </h4>
              </div>

              <div className="inline-flex items-center gap-1.5 rounded-xl border border-amber-500/40 bg-amber-500/10 px-3 py-1.5 text-xs font-mono font-bold text-amber-700 dark:text-amber-300 self-start sm:self-center">
                <Clock className="h-3.5 w-3.5 shrink-0 text-amber-500" />
                <span>{activeDayEntry.goldenWindow}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {/* Primary & Secondary Scoring */}
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3.5 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-extrabold text-emerald-700 dark:text-emerald-300">
                  <Sparkles className="h-3.5 w-3.5 shrink-0" />
                  <span>{copy.scoringLabel}</span>
                </div>
                <p className="text-xs text-foreground/90 leading-relaxed">
                  {activeDayEntry.scoringDetail}
                </p>
              </div>

              {/* Red Alert Taboo */}
              <div className="rounded-xl border border-rose-500/35 bg-rose-500/10 p-3.5 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-extrabold text-rose-600 dark:text-rose-300">
                  <ShieldAlert className="h-3.5 w-3.5 shrink-0" />
                  <span>{copy.tabooLabel}</span>
                </div>
                <p className="text-xs text-foreground/90 leading-relaxed">
                  {activeDayEntry.tabooWarning}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode 4: 13-Item Double-Dip 300% Lookup Matrix */}
      {activeMode === "doubledip" && (
        <div className="space-y-4">
          {/* Search + Tier Filter Pills */}
          <div className="flex flex-col md:flex-row gap-2.5">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                data-testid="calendar-doubledip-search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={copy.doubleDipSearchPlaceholder}
                aria-label={copy.doubleDipSearchPlaceholder}
                className="w-full min-h-[44px] rounded-xl border border-border/80 bg-background/90 pl-10 pr-9 py-2 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-amber-500/70"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear item search"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {(
                ["all", "300", "200", "immediate"] as DoubleDipTierFilter[]
              ).map((tf) => {
                const isActive = tierFilter === tf;
                return (
                  <button
                    key={tf}
                    type="button"
                    data-testid={`calendar-tier-filter-${tf}`}
                    aria-pressed={isActive}
                    onClick={() => setTierFilter(tf)}
                    className={cn(
                      "min-h-[44px] px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer",
                      isActive
                        ? "border-amber-500 bg-amber-500/15 text-amber-700 dark:text-amber-300 shadow-sm"
                        : "border-border/60 bg-background/60 text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {copy.tierFilters[tf]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 13 Items Cards */}
          <div className="grid grid-cols-1 gap-3">
            {filteredDoubleDipItems.map((item) => (
              <div
                key={item.index}
                className="rounded-xl border border-border/70 bg-background/80 p-4 space-y-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-heading font-extrabold text-sm text-foreground flex items-center gap-2">
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-amber-500/15 border border-amber-500/30 font-mono text-xs font-black text-amber-600 dark:text-amber-300">
                      #{item.index}
                    </span>
                    <span>{item.itemName}</span>
                  </h4>
                  <span
                    className={cn(
                      "shrink-0 rounded-lg px-2.5 py-0.5 font-mono text-[11px] font-extrabold border",
                      item.isImmediateSpend
                        ? "border-sky-500/40 bg-sky-500/15 text-sky-600 dark:text-sky-300"
                        : "border-amber-500/40 bg-amber-500/15 text-amber-600 dark:text-amber-300"
                    )}
                  >
                    {item.isImmediateSpend ? "⚡ GROUP A" : "🔥 300% TRIPLE-DIP"}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs">
                  <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-2.5">
                    <div className="font-bold text-amber-700 dark:text-amber-300 mb-0.5 flex items-center gap-1">
                      <Flame className="h-3.5 w-3.5 shrink-0" />
                      <span>{copy.tier300Label}</span>
                    </div>
                    <p className="text-foreground/90 leading-relaxed">
                      {item.tripleDip300}
                    </p>
                  </div>

                  {tierFilter !== "300" && (
                    <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-2.5">
                      <div className="font-bold text-emerald-700 dark:text-emerald-300 mb-0.5">
                        {copy.tier200Label}
                      </div>
                      <p className="text-foreground/90 leading-relaxed">
                        {item.doubleDip200}
                      </p>
                    </div>
                  )}

                  <div className="rounded-lg border border-border/60 bg-muted/30 p-2.5">
                    <div className="font-bold text-muted-foreground mb-0.5">
                      {copy.tier100Label}
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.singleDip100}
                    </p>
                  </div>

                  <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-2.5">
                    <div className="font-bold text-rose-600 dark:text-rose-300 mb-0.5">
                      {copy.tier0Label}
                    </div>
                    <p className="text-foreground/90 leading-relaxed">
                      {item.forbidden0}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

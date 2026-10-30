import type {
  EventEncyclopediaSixTableData,
  EventPlaybookRecord,
} from "./types";

interface EventSpecificMetadata {
  readonly unlockConditions: { readonly vi: string; readonly en: string };
  readonly dropSources: EventEncyclopediaSixTableData["table3ShopAndDrops"]["dropSources"];
  readonly packs: EventEncyclopediaSixTableData["table4PacksAndRoi"]["packs"];
}

const EVENT_SPECIFIC_METADATA: Record<string, EventSpecificMetadata> = {
  "top-lord": {
    unlockConditions: {
      vi: "Lâu Đài Cấp 5+ (Mở tự động từ Ngày 1 máy chủ mới S0)",
      en: "Castle Lv.5+ (Unlocks automatically on Server Day 1 in S0)",
    },
    dropSources: [
      {
        sourceName: {
          vi: "Thưởng Rương Mốc Điểm Cá Nhân Bậc 1 – Bậc 3 (Stage Chests)",
          en: "Personal Stage Milestone Chests Tier 1 – Tier 3",
        },
        dropRate: {
          vi: "100% khi đủ mốc điểm ngày",
          en: "100% upon hitting daily point thresholds",
        },
        dailyHiddenCap: {
          vi: "Tối đa 3 Rương Cá Nhân / Ngày chủ đề",
          en: "Max 3 Personal Chests / Theme Day",
        },
      },
      {
        sourceName: {
          vi: "Tiêu Diệt Quái Bản Đồ & Boss Cự Ma (Ngày 6 Nước Rút)",
          en: "World Map Monster Kills & Giant Boss Rallies (Day 6 Sprint)",
        },
        dropRate: {
          vi: "100% nhận Tăng Tốc & Mảnh Tướng Tím/Vàng theo cấp quái",
          en: "100% Speedup & Purple/Gold Shard drops scaled by monster level",
        },
        dailyHiddenCap: {
          vi: "Giới hạn theo Điểm Thể Lực tự nhiên + 50 lượt Auto-Join Rally/ngày",
          en: "Capped by natural Stamina + 50 Auto-Join Rally runs/day",
        },
      },
    ],
    packs: [
      {
        packId: "tl-pack-builder-queue",
        packName: {
          vi: "Gói Hàng Đợi Xây Dựng Thứ 2 Vĩnh Viễn (2nd Builder Queue)",
          en: "Permanent 2nd Construction Queue Pack",
        },
        priceUsdVnd: {
          vi: "$1.99 (~49.000đ)",
          en: "$1.99 USD",
        },
        purchaseLimit: {
          vi: "1 lần duy nhất / Tài khoản",
          en: "1 time per account",
        },
        contentsSummary: {
          vi: "Mở khóa vĩnh viễn Thợ Xây số 2 + Tăng Tốc Xây Dựng + Kim Cương",
          en: "Permanently unlocks Builder #2 + Construction Speedups + Diamonds",
        },
        roiRating: {
          vi: "ROI 500% — Gói bắt buộc số 1 đầu game",
          en: "500% ROI — #1 Mandatory Early-Game Pack",
        },
        isBestValue: true,
        isHiddenCrossEvent: false,
      },
      {
        packId: "tl-pack-daily-stage-bait",
        packName: {
          vi: "Gói Tiếp Tế Chủ Đề Ngày (Daily Stage Booster Pack)",
          en: "Daily Stage Booster Pack",
        },
        priceUsdVnd: {
          vi: "$0.99 – $4.99 (~25.000đ – 125.000đ)",
          en: "$0.99 – $4.99 USD",
        },
        purchaseLimit: {
          vi: "1 lần / Ngày chủ đề",
          en: "1 / Theme Day",
        },
        contentsSummary: {
          vi: "Kim Cương + Tăng Tốc đúng nhánh chủ đề trong ngày + Rương Tài Nguyên",
          en: "Diamonds + Theme-matching Speedups + Resource Chests",
        },
        roiRating: {
          vi: "ROI 220% — Chỉ mua ở Ngày 3 (Tướng) hoặc Ngày 5 (Trang Bị)",
          en: "220% ROI — Buy only on Day 3 (Heroes) or Day 5 (Gear)",
        },
        isBestValue: false,
        isHiddenCrossEvent: true,
      },
    ],
  },
  "guild-race": {
    unlockConditions: {
      vi: "Lâu Đài Cấp 10+ & Gia nhập Bang Hội tối thiểu 24 giờ trước giờ mở sự kiện",
      en: "Castle Lv.10+ & Joined a Guild at least 24 hours before event start",
    },
    dropSources: [
      {
        sourceName: {
          vi: "Hoàn Thành Nhiệm Vụ Bảng Chung 9 Ô (activity_task_target)",
          en: "Completing Shared 9-Slot Board Tasks (activity_task_target)",
        },
        dropRate: {
          vi: "100% nhận Điểm Thi Đấu + Xu Vinh Dự Bang Hội (Guild Honor)",
          en: "100% Race Points + Guild Honor Tokens upon completion",
        },
        dailyHiddenCap: {
          vi: "Giới hạn 8 – 10 lượt nhận nhiệm vụ / Ngày (+1 lượt mua bằng Kim Cương)",
          en: "Capped at 8 – 10 task claims / Day (+1 extra purchase via Diamonds)",
        },
      },
      {
        sourceName: {
          vi: "Thưởng Rương Mốc Điểm Toàn Bang Hội (Guild Milestone Chests)",
          en: "Total Guild Point Milestone Chests",
        },
        dropRate: {
          vi: "100% mở khóa khi tổng điểm 50+ thành viên vượt mốc",
          en: "100% unlocked when combined guild points cross each threshold",
        },
        dailyHiddenCap: {
          vi: "1 bộ rương tổng kết / Kỳ sự kiện 7 ngày",
          en: "1 full chest set / 7-day event cycle",
        },
      },
    ],
    packs: [
      {
        packId: "gr-pack-honor-pass",
        packName: {
          vi: "Thẻ Thông Hành Vinh Dự Bang Hội (Guild Race Honor Pass)",
          en: "Guild Race Honor Pass",
        },
        priceUsdVnd: {
          vi: "$4.99 (~125.000đ)",
          en: "$4.99 USD",
        },
        purchaseLimit: {
          vi: "1 lần / Kỳ 7 ngày",
          en: "1 / 7-day cycle",
        },
        contentsSummary: {
          vi: "Nhân đôi Xu Vinh Dự Bang + Mảnh Anh Hùng Vạn Năng + Vé Làm Mới Bảng Nhiệm Vụ",
          en: "Bonus Guild Honor Tokens + Universal Hero Shards + Task Board Refresh Tickets",
        },
        roiRating: {
          vi: "ROI 320% — Giúp gom đủ 18.000 Xu Vinh Dự mua Đá Linh Hồn Đỏ",
          en: "320% ROI — Accelerates 18,000 Guild Honor for weekly Red Soul Stones",
        },
        isBestValue: true,
        isHiddenCrossEvent: false,
      },
      {
        packId: "gr-pack-bounty-bundle",
        packName: {
          vi: "Gói Ẩn Vé Làm Mới Nhiệm Vụ & Giao Thương (Hidden Refresh Bundle)",
          en: "Hidden Task Refresh & Caravan Bundle",
        },
        priceUsdVnd: {
          vi: "$0.99 (~25.000đ)",
          en: "$0.99 USD",
        },
        purchaseLimit: {
          vi: "1 lần / Ngày",
          en: "1 / Day",
        },
        contentsSummary: {
          vi: "300 Kim Cương + Vé Làm Mới Nhiệm Vụ Cam/Đỏ + Tăng Tốc 60 Phút",
          en: "300 Diamonds + Legendary Task Refresh Tickets + 60m Speedups",
        },
        roiRating: {
          vi: "ROI 180% — Tùy chọn cho R4/R5 cần lọc bảng nhiệm vụ điểm cao",
          en: "180% ROI — Optional for R4/R5 officers filtering high-point tasks",
        },
        isBestValue: false,
        isHiddenCrossEvent: true,
      },
    ],
  },
  "guild-arms-race": {
    unlockConditions: {
      vi: "Máy chủ đạt Ngày 28+ S0, Lâu Đài Cấp 12+ và thuộc Bang Hội nằm trong Top ghép cặp",
      en: "Server Day 28+ S0, Castle Lv.12+, and membership in a matchmade Guild",
    },
    dropSources: [
      {
        sourceName: {
          vi: "9 Rương Điểm Cá Nhân Mỗi Ngày × Công Nghệ Double Rewards (9x2 Chests)",
          en: "9 Daily Personal Milestone Chests × Double Rewards Tech (9x2 Chests)",
        },
        dropRate: {
          vi: "100% nhân đôi (x2) mọi rương khi max nhánh công nghệ Arms Race Prep",
          en: "100% doubled (2x) rewards on all 9 chests with maxed Arms Race Prep tech",
        },
        dailyHiddenCap: {
          vi: "Tối đa 9 Rương × 2 = 18 gói thưởng cá nhân / Ngày chủ đề",
          en: "Max 9 Chests × 2 = 18 personal reward bundles / Theme Day",
        },
      },
      {
        sourceName: {
          vi: "Hộp Quà Chiến Thắng Ngày & Tổng Kết 6 Ngày Bang Hội (GAR Victory Spoils)",
          en: "Daily Matchup Victory & 6-Day Final Guild Spoils",
        },
        dropRate: {
          vi: "100% cho toàn bộ thành viên đóng góp điểm trên mức sàn tối thiểu",
          en: "100% for all guild members contributing above the minimum point floor",
        },
        dailyHiddenCap: {
          vi: "6 trận ngày (1 Điểm ngày 1–5, 2 Điểm ngày 6) + 1 Rương Tổng Kết",
          en: "6 daily matchups (1 Pt Days 1–5, 2 Pts Day 6) + 1 Final Chest",
        },
      },
    ],
    packs: [
      {
        packId: "gar-pack-dragon-essence",
        packName: {
          vi: "Gói Tinh Hoa Rồng & Tăng Tốc Công Nghệ GAR (Dragon Essence Tech Pack)",
          en: "Dragon Essence & GAR Tech Rush Pack",
        },
        priceUsdVnd: {
          vi: "$4.99 – $9.99 (~125.000đ – 250.000đ)",
          en: "$4.99 – $9.99 USD",
        },
        purchaseLimit: {
          vi: "1 lần / Ngày 2 (Thứ Ba)",
          en: "1 / Day 2 (Tuesday)",
        },
        contentsSummary: {
          vi: "Tinh Hoa Rồng (Dragon Essence) + Tăng Tốc Nghiên Cứu + Kim Cương",
          en: "Dragon Essence + Research Speedups + Diamonds",
        },
        roiRating: {
          vi: "ROI 450% — Mở khóa ngay Double Rewards để ăn 18 rương/ngày vĩnh viễn",
          en: "450% ROI — Unlocks Double Rewards for 18 chests/day permanently",
        },
        isBestValue: true,
        isHiddenCrossEvent: false,
      },
      {
        packId: "gar-pack-orichalcum-hidden",
        packName: {
          vi: "Gói Ẩn Liên Thông Orichalcum & Khuôn Đúc Ngày 3 (Cross-Event Gear Bundle)",
          en: "Hidden Cross-Event Orichalcum & Blueprint Bundle (Day 3)",
        },
        priceUsdVnd: {
          vi: "$0.99 – $4.99 (~25.000đ – 125.000đ)",
          en: "$0.99 – $4.99 USD",
        },
        purchaseLimit: {
          vi: "2 lần / Ngày 3 (Thứ Tư)",
          en: "2 / Day 3 (Wednesday)",
        },
        contentsSummary: {
          vi: "Orichalcum + Chỉ Ma Thuật + Điểm cộng thẳng vào cả GAR và Mini-Rush Trang Bị",
          en: "Orichalcum + Magic Thread + Direct points for both GAR and Gear Mini-Rush",
        },
        roiRating: {
          vi: "ROI 380% — Ăn điểm kép (Double-Dip) trên cả 2 sự kiện mở cùng ngày",
          en: "380% ROI — Double-dips points across both concurrent Wednesday events",
        },
        isBestValue: true,
        isHiddenCrossEvent: true,
      },
    ],
  },
  "treasure-dice-storm-maiden": {
    unlockConditions: {
      vi: "Mở khóa vào Ngày 21 (Desert Prince) & Ngày 27 S0 (Storm Maiden), Lâu Đài Cấp 8+",
      en: "Unlocks on S0 Day 21 (Desert Prince) & Day 27 (Storm Maiden), Castle Lv.8+",
    },
    dropSources: [
      {
        sourceName: {
          vi: "Ô Thưởng Trên Bàn Cờ Xúc Xắc & Rương Mốc Lượt Đổ (30 / 60 / 100 Lượt)",
          en: "Dice Board Tiles & Cumulative Roll Milestone Chests (30 / 60 / 100 Rolls)",
        },
        dropRate: {
          vi: "100% chắc chắn nhận Mảnh Tướng Đỏ & Xu Xúc Xắc ở mốc 30/60/100 lượt",
          en: "100% guaranteed Red Hero Shards & Dice Coins at 30/60/100 roll milestones",
        },
        dailyHiddenCap: {
          vi: "Mua Xúc Xắc bằng Kim Cương giới hạn 10 – 15 viên/ngày (300 KC/viên)",
          en: "Diamond Dice purchases capped at 10 – 15 dice/day (300 Diamonds/die)",
        },
      },
    ],
    packs: [
      {
        packId: "dice-pack-daily-099",
        packName: {
          vi: "Gói Mồi Xúc Xắc Hàng Ngày $0.99 (Daily $0.99 Dice Bait Pack)",
          en: "Daily $0.99 Treasure Dice Bait Pack",
        },
        priceUsdVnd: {
          vi: "$0.99 / ngày (~25.000đ × 7 ngày)",
          en: "$0.99 USD / day (× 7 days)",
        },
        purchaseLimit: {
          vi: "1 lần / Ngày trong suốt kỳ sự kiện",
          en: "1 / Day throughout the event",
        },
        contentsSummary: {
          vi: "Xúc Xắc Kho Báu + Kim Cương (Rẻ hơn 65% so với nạp gói lẻ ngày cuối)",
          en: "Treasure Dice + Diamonds (65% cheaper per die than last-day bulk packs)",
        },
        roiRating: {
          vi: "ROI 480% — Gói lấy tướng Thần Thoại Storm Maiden rẻ và lời nhất game",
          en: "480% ROI — Highest-value Mythic Storm Maiden acquisition pack in the game",
        },
        isBestValue: true,
        isHiddenCrossEvent: false,
      },
      {
        packId: "dice-pack-499-pass",
        packName: {
          vi: "Gói Tiếp Tế Xúc Xắc $4.99 & Gói Ẩn Mở Khóa Vũ Khí Độc Quyền",
          en: "$4.99 Dice Supply Pack & Hidden Exclusive Weapon Popup",
        },
        priceUsdVnd: {
          vi: "$4.99 (~125.000đ)",
          en: "$4.99 USD",
        },
        purchaseLimit: {
          vi: "1 lần / Ngày hoặc khi vừa mở khóa tướng mới",
          en: "1 / Day or upon unlocking the featured Mythic hero",
        },
        contentsSummary: {
          vi: "Cụm Xúc Xắc Kho Báu + Mảnh Vũ Khí Độc Quyền + Kim Cương",
          en: "Treasure Dice bundle + Exclusive Weapon Shards + Diamonds",
        },
        roiRating: {
          vi: "ROI 350% — Kết hợp với gói $0.99 để cán mốc 60 / 100 lượt đổ chẵn",
          en: "350% ROI — Pair with the $0.99 daily pack to hit exact 60 / 100 roll milestones",
        },
        isBestValue: false,
        isHiddenCrossEvent: true,
      },
    ],
  },
  "lucky-wheel": {
    unlockConditions: {
      vi: "Lâu Đài Cấp 8+ (Xoay tua luân phiên cùng Xúc Xắc Kho Báu và Hero Gacha)",
      en: "Castle Lv.8+ (Rotates periodically alongside Treasure Dice and Hero Gacha)",
    },
    dropSources: [
      {
        sourceName: {
          vi: "Vòng Quay May Mắn (turntable) & Mốc Lượt Quay Tích Lũy (25 / 60 / 120 Lượt)",
          en: "Lucky Wheel (turntable) & Cumulative Spin Milestones (25 / 60 / 120 Spins)",
        },
        dropRate: {
          vi: "Tỷ lệ rơi trực tiếp Mảnh Tướng Chủ Đề + 100% thưởng rương mốc chẵn",
          en: "Direct featured Hero Shard drop rate + 100% guaranteed milestone chests",
        },
        dailyHiddenCap: {
          vi: "1 lượt quay miễn phí/ngày + Trần mua Xu Quay bằng Kim Cương theo ngày",
          en: "1 free spin/day + Daily cap on Diamond Wheel Token purchases",
        },
      },
    ],
    packs: [
      {
        packId: "lw-pack-099-spin",
        packName: {
          vi: "Gói Xu Vòng Quay Hàng Ngày $0.99 (Daily $0.99 Wheel Token Pack)",
          en: "Daily $0.99 Wheel Token Pack",
        },
        priceUsdVnd: {
          vi: "$0.99 / ngày (~25.000đ)",
          en: "$0.99 USD / day",
        },
        purchaseLimit: {
          vi: "1 lần / Ngày",
          en: "1 / Day",
        },
        contentsSummary: {
          vi: "Xu Vòng Quay May Mắn + Kim Cương (Tự động bảo lưu sang kỳ sau)",
          en: "Lucky Wheel Tokens + Diamonds (100% carried over to future Wheel banners)",
        },
        roiRating: {
          vi: "ROI 420% — Mua tích trữ ngay cả ở kỳ tướng lệch phe để dành cho tướng Horde",
          en: "420% ROI — Buy and bank even during off-faction banners for future Horde heroes",
        },
        isBestValue: true,
        isHiddenCrossEvent: false,
      },
      {
        packId: "lw-pack-499-bundle",
        packName: {
          vi: "Gói Tăng Tốc Vòng Quay $4.99 (Wheel Milestone Booster)",
          en: "$4.99 Wheel Milestone Booster Pack",
        },
        priceUsdVnd: {
          vi: "$4.99 (~125.000đ)",
          en: "$4.99 USD",
        },
        purchaseLimit: {
          vi: "1 lần / Ngày",
          en: "1 / Day",
        },
        contentsSummary: {
          vi: "10+ Xu Vòng Quay + Mảnh Anh Hùng Vạn Năng + Kim Cương",
          en: "10+ Wheel Tokens + Universal Hero Shards + Diamonds",
        },
        roiRating: {
          vi: "ROI 310% — Chỉ mua khi kỳ Vòng Quay rơi đúng tướng chủ lực của Đội 1",
          en: "310% ROI — Buy only when the Wheel features a core Team 1 hero",
        },
        isBestValue: false,
        isHiddenCrossEvent: true,
      },
    ],
  },
  "hero-gacha": {
    unlockConditions: {
      vi: "Lâu Đài Cấp 9+ (Chu kỳ 3 tuần / lần, mở khóa Quán Rượu Đặc Biệt)",
      en: "Castle Lv.9+ (3-week rotation cycle unlocking the Special Gacha Tavern)",
    },
    dropSources: [
      {
        sourceName: {
          vi: "Mốc Lượt Chiêu Mộ Đặc Biệt (50 / 100 / 200 / 300 Vé Chiêu Mộ)",
          en: "Special Recruitment Pull Milestones (50 / 100 / 200 / 300 Recruit Tokens)",
        },
        dropRate: {
          vi: "100% nhận Rương Tự Chọn Mảnh Tướng & Đá Linh Hồn theo mốc chẵn",
          en: "100% guaranteed Choice Hero Shard Chests & Soul Stones at exact milestones",
        },
        dailyHiddenCap: {
          vi: "Không giới hạn số vé xả từ túi đồ; điểm cộng thẳng vào Ngày 4 GAR",
          en: "Unlimited inventory token pulls; points stack directly into GAR Day 4",
        },
      },
    ],
    packs: [
      {
        packId: "hg-pack-recruit-pass",
        packName: {
          vi: "Gói Quỹ Chiêu Mộ & Thẻ Vé Tuần (Recruit Token Weekly Pass)",
          en: "Recruit Token Weekly Supply Pass",
        },
        priceUsdVnd: {
          vi: "$0.99 – $4.99 (~25.000đ – 125.000đ)",
          en: "$0.99 – $4.99 USD",
        },
        purchaseLimit: {
          vi: "1 lần / Kỳ sự kiện",
          en: "1 / Event cycle",
        },
        contentsSummary: {
          vi: "Cụm Vé Chiêu Mộ Anh Hùng giá chiết khấu + Kim Cương",
          en: "Discounted Hero Recruit Token bundle + Diamonds",
        },
        roiRating: {
          vi: "ROI 360% — Chỉ mua khi thiếu 10–20 vé để chạm mốc chẵn 100/200/300 lượt",
          en: "360% ROI — Buy only when 10–20 tokens short of an exact 100/200/300 milestone",
        },
        isBestValue: true,
        isHiddenCrossEvent: false,
      },
      {
        packId: "hg-pack-gar-day4-combo",
        packName: {
          vi: "Gói Ẩn Liên Thông Ngày 4 GAR × Hero Gacha (Thursday Hero Surge Pack)",
          en: "Hidden GAR Day 4 × Hero Gacha Combo Pack",
        },
        priceUsdVnd: {
          vi: "$4.99 – $9.99 (~125.000đ – 250.000đ)",
          en: "$4.99 – $9.99 USD",
        },
        purchaseLimit: {
          vi: "1 lần vào Thứ Năm (Ngày 4 GAR)",
          en: "1 on Thursday (GAR Day 4)",
        },
        contentsSummary: {
          vi: "Vé Chiêu Mộ + Mảnh Vạn Năng Vàng + Sách Kỹ Năng (Tính điểm 3 sự kiện)",
          en: "Recruit Tokens + Universal Legendary Shards + Skill Books (Triple-dip scoring)",
        },
        roiRating: {
          vi: "ROI 410% — Khớp lệnh Triple-Dip ăn thưởng Hero Gacha + GAR Ngày 4 + Ca 4 Giờ",
          en: "410% ROI — Triple-dips Hero Gacha + GAR Day 4 + 4-Hour Hero Sprint",
        },
        isBestValue: true,
        isHiddenCrossEvent: true,
      },
    ],
  },
  "butterfly-catching": {
    unlockConditions: {
      vi: "Lâu Đài Cấp 7+ (Sự kiện vệ tinh thu thập đạo cụ rơi trên bản đồ)",
      en: "Castle Lv.7+ (Satellite collection event with world map item drops)",
    },
    dropSources: [
      {
        sourceName: {
          vi: "Đánh Quái Bản Đồ, Khai Thác Mỏ & Thu Hoạch Lãnh Thổ (activity_drop)",
          en: "World Map Monsters, Resource Nodes & Territory Collection (activity_drop)",
        },
        dropRate: {
          vi: "Rơi xác suất cao ở 30 lượt đầu mỗi ngày, giảm dần khi tiệm cận trần ẩn",
          en: "High drop rate on the first 30 actions daily, tapering near the hidden cap",
        },
        dailyHiddenCap: {
          vi: "Trần giới hạn ẩn ~30 – 50 Vợt Bắt Bướm / Ngày từ bản đồ (Reset 00:00 UTC / 07:00 Giờ VN)",
          en: "Hidden daily cap of ~30 – 50 Butterfly Nets / Day from map actions (Resets 00:00 UTC)",
        },
      },
    ],
    packs: [
      {
        packId: "bf-pack-099-net",
        packName: {
          vi: "Gói Vợt Bắt Bướm Khởi Đầu $0.99 (Daily Butterfly Net Starter)",
          en: "Daily $0.99 Butterfly Net Starter Pack",
        },
        priceUsdVnd: {
          vi: "$0.99 (~25.000đ)",
          en: "$0.99 USD",
        },
        purchaseLimit: {
          vi: "1 lần / Ngày",
          en: "1 / Day",
        },
        contentsSummary: {
          vi: "Vợt Bắt Bướm + Xu Đổi Thưởng + Bình Thể Lực 50 Điểm",
          en: "Butterfly Nets + Exchange Tokens + 50-Stamina Bottles",
        },
        roiRating: {
          vi: "ROI 390% — Mua bổ sung vào ngày cuối nếu thiếu xu đổi Rương Trang Trí Đỏ",
          en: "390% ROI — Buy on the final day if slightly short of the Mythic Decoration Chest",
        },
        isBestValue: true,
        isHiddenCrossEvent: false,
      },
      {
        packId: "bf-pack-decor-pass",
        packName: {
          vi: "Thẻ Thông Hành Lễ Hội Bắt Bướm $4.99 (Festival Collection Pass)",
          en: "$4.99 Festival Collection Pass",
        },
        priceUsdVnd: {
          vi: "$4.99 (~125.000đ)",
          en: "$4.99 USD",
        },
        purchaseLimit: {
          vi: "1 lần / Kỳ sự kiện",
          en: "1 / Event cycle",
        },
        contentsSummary: {
          vi: "Mở khóa cột VIP Pass nhận Rương Trang Trí Thần Thoại + Mảnh Vạn Năng",
          en: "Unlocks VIP Pass column awarding Mythic Decoration Chest + Universal Shards",
        },
        roiRating: {
          vi: "ROI 440% — Nguồn Trang Trí cộng % ATK/HP toàn quân vĩnh viễn cực rẻ",
          en: "440% ROI — Ultra-cost-effective source of permanent all-troop ATK/HP Decorations",
        },
        isBestValue: true,
        isHiddenCrossEvent: true,
      },
    ],
  },
  "giant-troll-raid": {
    unlockConditions: {
      vi: "Lâu Đài Cấp 10+ & Tham gia tổ đội Rally Boss Cự Ma cùng Bang Hội",
      en: "Castle Lv.10+ & Joining Guild Rally attacks against Giant Troll Bosses",
    },
    dropSources: [
      {
        sourceName: {
          vi: "Auto-Join Rally Boss Cự Ma & Rương Sát Thương Tích Lũy (form_list)",
          en: "Auto-Join Giant Troll Rallies & Cumulative Damage Chests (form_list)",
        },
        dropRate: {
          vi: "100% nhận Điểm Pass Cự Ma + Orichalcum + Kim Loại Tinh Luyện mỗi lượt",
          en: "100% Raid Pass Points + Orichalcum + Refined Metal per rally hit",
        },
        dailyHiddenCap: {
          vi: "Tối đa 50 lượt thưởng Auto-Join Rally miễn phí thể lực / Ngày",
          en: "Max 50 stamina-free Auto-Join Rally reward claims / Day",
        },
      },
    ],
    packs: [
      {
        packId: "gtr-pack-499-pass",
        packName: {
          vi: "Thẻ Thông Hành Thợ Săn Cự Ma $4.99 (Giant Slayer Battle Pass)",
          en: "$4.99 Giant Slayer Battle Pass",
        },
        priceUsdVnd: {
          vi: "$4.99 (~125.000đ)",
          en: "$4.99 USD",
        },
        purchaseLimit: {
          vi: "1 lần / Kỳ sự kiện",
          en: "1 / Event cycle",
        },
        contentsSummary: {
          vi: "Lượng lớn Orichalcum + Khuôn Đúc Trang Bị Lãnh Chúa + Mảnh Vạn Năng Vàng",
          en: "Massive Orichalcum + Lord Gear Blueprints + Universal Legendary Shards",
        },
        roiRating: {
          vi: "ROI 490% — Gói Pass $4.99 có tỷ lệ Orichalcum / USD cao nhất toàn mùa S0",
          en: "490% ROI — Highest Orichalcum-per-dollar $4.99 Pass in all of Season S0",
        },
        isBestValue: true,
        isHiddenCrossEvent: false,
      },
      {
        packId: "gtr-pack-stamina-supply",
        packName: {
          vi: "Gói Tiếp Tế Thể Lực & Lệnh Tập Kết $0.99 (Rally Stamina Pack)",
          en: "$0.99 Rally Stamina Supply Pack",
        },
        priceUsdVnd: {
          vi: "$0.99 (~25.000đ)",
          en: "$0.99 USD",
        },
        purchaseLimit: {
          vi: "1 lần / Ngày",
          en: "1 / Day",
        },
        contentsSummary: {
          vi: "5 Bình Thể Lực + Tăng Tốc Hành Quân + 300 Kim Cương",
          en: "5 Stamina Bottles + March Speedups + 300 Diamonds",
        },
        roiRating: {
          vi: "ROI 260% — Mua tích trữ Bình Thể Lực chờ Ngày 1 và Ngày 6 của tuần GAR",
          en: "260% ROI — Bank the Stamina Bottles for GAR Day 1 and Day 6 monster sprints",
        },
        isBestValue: false,
        isHiddenCrossEvent: true,
      },
    ],
  },
  "dark-empire-and-legion": {
    unlockConditions: {
      vi: "Lâu Đài Cấp 11+ & Thành viên Bang Hội trực tuyến phòng thủ Pháo Đài Bang",
      en: "Castle Lv.11+ & Guild membership defending the Guild Fortress",
    },
    dropSources: [
      {
        sourceName: {
          vi: "Phòng Thủ Lâu Đài Bản Thân + Gửi Quân Tiếp Viện Đồng Đội (20 Đợt Công Thành)",
          en: "Personal Castle Defense + Reinforcing Guildmates (20 Siege Waves)",
        },
        dropRate: {
          vi: "100% nhận Điểm Phá Địch Cá Nhân + Điểm Tiếp Viện Nhân Đôi (2x Assist Score)",
          en: "100% Personal Defense Score + 2x Reinforcement Assist Score",
        },
        dailyHiddenCap: {
          vi: "Tối đa 20 đợt quân Hắc Ám + 1 đợt Boss Pháo Đài Bang / Kỳ sự kiện",
          en: "Max 20 Dark Legion waves + 1 Guild Fortress Boss wave / Event run",
        },
      },
    ],
    packs: [
      {
        packId: "del-pack-shield-heal",
        packName: {
          vi: "Gói Cứu Thương & Tăng Tốc Hồi Phục $0.99 (Emergency Healing Pack)",
          en: "$0.99 Emergency Healing & Shield Pack",
        },
        priceUsdVnd: {
          vi: "$0.99 (~25.000đ)",
          en: "$0.99 USD",
        },
        purchaseLimit: {
          vi: "1 lần / Kỳ công thành",
          en: "1 / Siege cycle",
        },
        contentsSummary: {
          vi: "Tăng Tốc Chữa Thương + Khiên Hòa Bình 8 Giờ + Dịch Chuyển Ngẫu Nhiên",
          en: "Healing Speedups + 8-Hour Peace Shield + Random Teleports",
        },
        roiRating: {
          vi: "ROI 240% — Dự phòng cho Ngày 6 Chiến Đấu của GAR / KvK",
          en: "240% ROI — Useful reserve for GAR Day 6 / KvK combat recovery",
        },
        isBestValue: true,
        isHiddenCrossEvent: false,
      },
      {
        packId: "del-pack-fortress-spoils",
        packName: {
          vi: "Rương Chiến Lợi Phẩm Hắc Ám Liên Thông Bang Hội $4.99",
          en: "$4.99 Dark Legion Guild Spoils Chest",
        },
        priceUsdVnd: {
          vi: "$4.99 (~125.000đ)",
          en: "$4.99 USD",
        },
        purchaseLimit: {
          vi: "1 lần sau khi Bang Hội hạ gục Boss đợt 20",
          en: "1 after Guild clears Wave 20 Boss",
        },
        contentsSummary: {
          vi: "Mảnh Cổ Vật Huyền Thoại + Xu Vinh Dự Bang + Phát lì xì rương cho cả Bang",
          en: "Legendary Relic Shards + Guild Honor + Shared Guild Gift Chests",
        },
        roiRating: {
          vi: "ROI 330% — Vừa lấy Mảnh Cổ Vật vừa tặng rương quà cho 50 anh em trong Bang",
          en: "330% ROI — Grants Relic Shards while gifting bonus chests to all 50 guildmates",
        },
        isBestValue: false,
        isHiddenCrossEvent: true,
      },
    ],
  },
  "mini-rushes-and-guild-rush": {
    unlockConditions: {
      vi: "Lâu Đài Cấp 8+ (8 sự kiện đua ngắn hạn 2–3 ngày xoay vòng liên tục)",
      en: "Castle Lv.8+ (8 rotating 2–3 day short-term sprint events)",
    },
    dropSources: [
      {
        sourceName: {
          vi: "3 Rương Mốc Điểm Cá Nhân Mini-Rush & Rương Cộng Hưởng Ca 4 Giờ",
          en: "3 Mini-Rush Personal Milestone Chests & 4-Hour Window Overlap Chests",
        },
        dropRate: {
          vi: "100% hoàn trả Kim Cương + Rương Cổ Ngữ / Tinh Hoa Thú Cưng khi chạm mốc",
          en: "100% Diamond rebate + Rune Chests / Pet Essence upon hitting thresholds",
        },
        dailyHiddenCap: {
          vi: "Chỉ mở khóa tối đa 3 mốc rương cá nhân / Kỳ Mini-Rush 2 ngày",
          en: "Capped at 3 personal milestone tiers / 2-day Mini-Rush window",
        },
      },
    ],
    packs: [
      {
        packId: "mr-pack-overlap-099",
        packName: {
          vi: "Gói Mồi Cộng Hưởng Ngày Trùng GAR $0.99 (GAR Overlap Micro-Pack)",
          en: "$0.99 GAR Overlap Micro-Pack",
        },
        priceUsdVnd: {
          vi: "$0.99 (~25.000đ)",
          en: "$0.99 USD",
        },
        purchaseLimit: {
          vi: "1 lần / Kỳ Mini-Rush trùng tuần GAR",
          en: "1 / Mini-Rush overlapping GAR week",
        },
        contentsSummary: {
          vi: "Nguyên liệu nâng cấp đúng chủ đề (Cổ Ngữ / Thú Cưng / Cổ Vật) + 300 Kim Cương",
          en: "Theme-matched upgrade materials (Runes / Pets / Relics) + 300 Diamonds",
        },
        roiRating: {
          vi: "ROI 400% — Chỉ mua khi Mini-Rush rơi đúng vào tuần lễ GAR (Triple-Dip)",
          en: "400% ROI — Buy strictly when the Mini-Rush lands inside GAR week (Triple-Dip)",
        },
        isBestValue: true,
        isHiddenCrossEvent: true,
      },
      {
        packId: "mr-pack-offweek-warning",
        packName: {
          vi: "Gói Bẫy Xả Sớm Tuần Nghỉ $19.99+ (Off-Week Bait Bundle — CẤM MUA)",
          en: "$19.99+ Off-Week Bait Bundle (DO NOT BUY)",
        },
        priceUsdVnd: {
          vi: "$19.99 (~500.000đ)",
          en: "$19.99 USD",
        },
        purchaseLimit: {
          vi: "3 lần / Kỳ",
          en: "3 / Cycle",
        },
        contentsSummary: {
          vi: "Gói nguyên liệu giá cao xuất hiện vào tuần nghỉ ngay trước GAR để dụ xả kho",
          en: "Overpriced material pack appearing in the off-week before GAR to bait inventory dumps",
        },
        roiRating: {
          vi: "ROI Kém (<90%) — Bỏ qua 100% vào tuần nghỉ, giữ ngân sách cho tuần GAR",
          en: "Poor ROI (<90%) — Skip 100% during off-weeks; save budget for GAR week",
        },
        isBestValue: false,
        isHiddenCrossEvent: false,
      },
    ],
  },
};

export function buildEventSixTablesData(
  record: EventPlaybookRecord
): EventEncyclopediaSixTableData {
  const meta =
    EVENT_SPECIFIC_METADATA[record.id] ?? EVENT_SPECIFIC_METADATA["top-lord"];

  return {
    table1TimelineRules: {
      takeEffectTime: record.s0TimingBadge,
      durationAndCooldown: {
        vi: `${record.cadenceBadge.vi} • Reset mốc ngày lúc 00:00 UTC (07:00 Giờ VN)`,
        en: `${record.cadenceBadge.en} • Daily reset at 00:00 UTC`,
      },
      unlockConditions: meta.unlockConditions,
      coreFaqRules: [
        record.overview.summary,
        record.overview.coreLoop,
        record.overview.goldenRule,
      ],
      recyclePolicy: record.overview.carryoverRule,
    },
    table2TasksAndMilestones: {
      tasks: record.dailyStages.map((stage, idx) => ({
        taskType: idx < 2 ? "daily" : "cumulative",
        taskName: {
          vi: `${stage.label.vi} — ${stage.theme.vi}`,
          en: `${stage.label.en} — ${stage.theme.en}`,
        },
        pointsAwarded: stage.primaryScoring,
        capOrNote: {
          vi: `Khung giờ vàng: ${stage.goldenWindow.vi} • Cộng hưởng: ${stage.doubleDipTarget.vi}`,
          en: `Golden Window: ${stage.goldenWindow.en} • Overlap: ${stage.doubleDipTarget.en}`,
        },
      })),
      milestones: record.economy.budgetTiers.map((tier, idx) => ({
        tierLabel: {
          vi: `Mốc Bậc ${idx + 1} (${tier.label.vi})`,
          en: `Tier ${idx + 1} Milestone (${tier.label.en})`,
        },
        pointsRequired: tier.targetMilestone,
        freeRewards: {
          vi: "Kim Cương hoàn trả + Tăng Tốc + Rương Nguyên Liệu Cốt Lõi (Free Track)",
          en: "Rebate Diamonds + Speedups + Core Material Chests (Free Track)",
        },
        vipOrPassRewards: tier.strategy,
      })),
    },
    table3ShopAndDrops: {
      dropSources: meta.dropSources,
      shopItems: record.economy.shopTierList.map((item) => ({
        id: item.id,
        itemName: item.itemName,
        iconPath: item.iconPath,
        rarity: item.rarity,
        quantityPerPurchase: {
          vi: item.tier === "S" ? "1 – 5 Vật phẩm / Lượt" : "1 Vật phẩm / Lượt",
          en: item.tier === "S" ? "1 – 5 Items / Purchase" : "1 Item / Purchase",
        },
        cost: item.costAndCap,
        purchaseLimit: {
          vi:
            item.tier === "S"
              ? "Giới hạn nghiêm ngặt theo kỳ (Mua kịch trần)"
              : item.tier === "A"
              ? "Giới hạn theo tuần / kỳ sự kiện"
              : "Không giới hạn (Cấm đổi)",
          en:
            item.tier === "S"
              ? "Strictly capped per cycle (Buy out 100%)"
              : item.tier === "A"
              ? "Capped per week / event cycle"
              : "Unlimited (Never buy)",
        },
        priorityTier: item.tier,
        verdict: item.verdict,
      })),
    },
    table4PacksAndRoi: {
      preBuyNote: record.economy.preBuyStrategy,
      diamondCeiling: record.economy.diamondCeiling,
      packs: meta.packs,
    },
    section5HoardingPlan: {
      shortTermTargets: record.hoardingItems,
      longTermRoadmap: [
        {
          horizonLabel: {
            vi: "Trước 2 – 3 Tuần (Giai đoạn Tích Lũy Nền Tảng)",
            en: "2 – 3 Weeks Prior (Foundation Stockpiling Phase)",
          },
          focusItems: {
            vi: "Kim Cương, Mảnh Anh Hùng Vạn Năng Vàng, Xu Vinh Dự Bang Hội & Tinh Hoa Rồng",
            en: "Diamonds, Universal Legendary Hero Shards, Guild Honor Tokens & Dragon Essence",
          },
          targetQuota: {
            vi: "Tối thiểu 15.000 – 30.000 Kim Cương + 100 Mảnh Vạn Năng + 18.000 Xu Vinh Dự",
            en: "Minimum 15,000 – 30,000 Diamonds + 100 Universal Shards + 18,000 Guild Honor",
          },
          rationale: {
            vi: "Nhịn tiêu thụ ở các tuần thường và Mini-Rush lẻ để dồn 100% thanh khoản cho tuần có Niềm Vui Nhân Đôi (Double Rewards x2), GAR hoặc Banner tướng chủ lực Horde.",
            en: "Hold spending during off-weeks and isolated Mini-Rushes to concentrate 100% of liquidity into Double Rewards (2x), GAR, or core Horde Mythic banners.",
          },
        },
        {
          horizonLabel: {
            vi: "Trước 7 Ngày (Tuần Đóng Băng Kho Tuyệt Đối — Hard Freeze)",
            en: "7 Days Prior (Strict Inventory Hard Freeze Week)",
          },
          focusItems: {
            vi: "Tăng Tốc (Xây Dựng / Nghiên Cứu / Luyện Lính), Orichalcum, Vé Chiêu Mộ & Đá Linh Hồn",
            en: "Speedups (Construction / Research / Training), Orichalcum, Recruit Tokens & Soul Stones",
          },
          targetQuota: {
            vi: "80 – 150 Giờ Tăng Tốc + 100% Orichalcum / Mảnh Cổ Vật / Đá Cổ Ngữ trong túi",
            en: "80 – 150 Hours of Speedups + 100% of Orichalcum / Relic Shards / Runes in bag",
          },
          rationale: {
            vi: "Khóa toàn bộ nâng cấp ngoài nhiệm vụ hàng ngày bắt buộc; chuẩn bị sẵn các công trình và mẻ lính thời gian dài để bước vào giai đoạn Ủ (Pre-cooking).",
            en: "Lock all upgrades outside mandatory daily quests; queue long-duration buildings and troop batches to enter the Pre-cooking window.",
          },
        },
      ],
    },
    section6ProMechanics: [
      {
        mechanicId: "pre_building",
        title: {
          vi: "Kỹ thuật 1 — Ủ Nhà / Giữ Hộp Quà Công Trình (Pre-building & Unopened Gift Box Banking)",
          en: "Technique 1 — Pre-building & Unopened Building Gift Box Banking",
        },
        whenToApply: {
          vi: "Bắt đầu bấm nâng cấp công trình lớn từ 2 – 4 ngày trước khi mở sự kiện (hoặc trước Ngày 1 Xây Dựng lúc 00:00 UTC / 07:00 Giờ VN)",
          en: "Start upgrading major buildings 2 – 4 days before event launch (or prior to Construction Day at 00:00 UTC)",
        },
        stepByStep: {
          vi: "Bấm nâng cấp Lâu Đài Chính / Trại Lính / Viện Nghiên Cứu từ nhiều ngày trước. Khi thanh thời gian chạy xong 100%, TUYỆT ĐỐI KHÔNG ấn vào biểu tượng Hộp Quà hoàn thành lơ lửng trên nóc nhà. Đợi đúng giờ mở sự kiện (hoặc ca 4 Giờ Xây Dựng lúc 02:00 UTC / 09:00 Giờ VN) mới bấm mở toàn bộ hộp quà để nổ hàng trăm nghìn điểm Lực Chiến công trình trong 1 giây.",
          en: "Start upgrading your Main Castle, Barracks, or Research Institute days in advance. Once the timer reaches 100%, DO NOT tap the floating completion Gift Box icon on the roof. Wait until the exact event start (or the 02:00 UTC 4-Hour Construction window) before tapping all gift boxes to burst hundreds of thousands of building power points in 1 second.",
        },
        warningNote: {
          vi: "Cảnh báo thao tác: Khi di chuyển camera trong thành phố, tránh chạm nhầm vào nóc công trình đang treo hộp quà trước giờ mở sự kiện!",
          en: "Execution warning: When panning your camera inside the city, avoid accidentally tapping rooftops holding completed gift boxes before the scoring window opens!",
        },
      },
      {
        mechanicId: "troop_precooking",
        title: {
          vi: "Kỹ thuật 2 — Ủ Lính & Nâng Bậc Lính Cầu Thang (Troop Pre-cooking & Tier T-1 ➔ T Promotion)",
          en: "Technique 2 — Troop Pre-cooking & Tier T-1 ➔ T Staircase Promotion",
        },
        whenToApply: {
          vi: "Chuẩn bị sẵn hàng vạn lính cấp T-1 trong tuần thường và bấm ủ mẻ lính dài nhất 12 – 24 giờ trước Ngày Luyện Lính (Ngày 4 Top Lord / Ngày 5 GAR)",
          en: "Stockpile tens of thousands of Tier T-1 troops during off-weeks and start your longest 12 – 24h training batch before Troop Day (Top Lord Day 4 / GAR Day 5)",
        },
        stepByStep: {
          vi: "Bước 1: Huấn luyện xong mẻ lính lớn ở tất cả các Trại Lính nhưng KHÔNG ấn thu hoạch trên nóc trại cho đến khi bước vào giờ mở sự kiện. Bước 2: Trong ngày thường, chỉ huấn luyện lính cấp thấp hơn 1 bậc (T-1, ví dụ T7/T8). Khi vào đúng khung giờ Đua Vũ Trang / KvK, chọn chức năng 'Thăng Cấp Lính' (Promote T-1 ➔ T tối đa) và xả Tăng Tốc Luyện Lính để nhận tỷ lệ Điểm / Phút Tăng Tốc cao gấp 1.4 lần so với luyện mới từ đầu.",
          en: "Step 1: Complete large troop batches across all Barracks without tapping the harvest icon until the event opens. Step 2: During off-days, train units one tier below your max (Tier T-1). Once inside the GAR / KvK Troop window, use 'Promote Troops' (T-1 ➔ Max Tier T) and dump Training Speedups to earn ~1.4x higher Points-per-Speedup-Minute than training from scratch.",
        },
        warningNote: {
          vi: "Không bao giờ dùng Tăng Tốc Chung (Universal Speedups) để luyện lính cấp thấp ngoài ngày sự kiện.",
          en: "Never spend Universal Speedups to train low-tier troops outside active event scoring days.",
        },
      },
      {
        mechanicId: "pre_gathering_quest_banking",
        title: {
          vi: "Kỹ thuật 3 — Ủ Nghiên Cứu / Cắm Mỏ Ruby Qua Đêm / Treo Thưởng Chờ Nhận (Pre-gathering & Quest Banking)",
          en: "Technique 3 — Tech Pre-cooking, Overnight Ruby Pre-gathering & Bounty Quest Banking",
        },
        stepByStep: {
          vi: "1) Cắm Mỏ Ruby: Từ 18:00 – 22:00 UTC (01:00 – 05:00 Giờ VN) đêm trước ngày sự kiện, cử toàn bộ 4 đạo quân đi đào mỏ Ruby/Tài nguyên cấp 6–8 trên bản đồ sao cho quân rút về thành đúng sau 00:00 UTC (07:00 Giờ VN) sáng hôm sau. 2) Treo Thưởng (Bounty Quests): Hoàn thành các nhiệm vụ Treo Thưởng và Nhiệm Vụ Radar nhưng giữ trạng thái 'Claim/Nhận thưởng' chưa bấm cho đến khi mở sự kiện rơi đạo cụ. 3) Thể lực: Giữ nguyên bình Thể lực để chạy 50 lượt Auto-Join Rally.",
          en: "1) Overnight Ruby Pre-gathering: Between 18:00 – 22:00 UTC the night before the event, dispatch all 4 marches to Lv.6–8 Ruby/Resource nodes so they return right after 00:00 UTC reset. 2) Bounty & Radar Quest Banking: Complete Bounty and Radar tasks the day prior, leaving the 'Claim' button untouched until the drop event opens. 3) Stamina: Bank all Stamina bottles for 50x daily Auto-Join Rallies.",
        },
        whenToApply: {
          vi: "Thực hiện vào buổi tối trước ngày mở sự kiện (18:00 – 23:50 UTC / 01:00 – 06:50 Giờ VN)",
          en: "Execute on the evening prior to event reset (18:00 – 23:50 UTC)",
        },
        warningNote: {
          vi: "Canh chuẩn tốc độ khai thác để đoàn xe không tự động quay về thành trước mốc 00:00 UTC (07:00 Giờ VN)!",
          en: "Verify gathering speed buffs so your marches do not return to the castle before the 00:00 UTC reset!",
        },
      },
      {
        mechanicId: "double_triple_dip",
        title: {
          vi: "Kỹ thuật 4 — Gộp Trùng 3 – 4 Sự Kiện (Double-Dip / Triple-Dip 4-Hour Window Alignment)",
          en: "Technique 4 — Double-Dip / Triple-Dip (Synchronizing 3–4 Concurrent Events)",
        },
        whenToApply: {
          vi: "Căn chính xác khung giờ 4 tiếng của Quân Bị Dũng Sĩ (02:00 UTC / 09:00 Giờ VN hoặc 14:00 UTC / 21:00 Giờ VN) trùng với ngày chủ đề GAR / KvK",
          en: "Align the exact 4-hour Arms Race window (02:00 UTC or 14:00 UTC) with the matching GAR / KvK theme day",
        },
        stepByStep: {
          vi: "Trước khi bấm xả bất kỳ Tăng Tốc, Mảnh Tướng Vàng hay Orichalcum nào, hãy kiểm tra bảng sự kiện để khớp 4 tầng cùng lúc: (1) Ngày chủ đề của Đua Vũ Trang Bang Hội (GAR / KvK) có bật Double Rewards x2 + (2) Khung giờ 4 tiếng của Quân Bị Dũng Sĩ trùng đúng chủ đề + (3) Sự kiện Mini-Rush 2 ngày hoặc Hero Gacha cùng nhánh + (4) Nhiệm vụ Thẻ Thông Hành / Thi Đấu Hội đang nhận trên bảng. Xả 1 lần duy nhất để ăn trọn 3 – 4 đầu phần thưởng!",
          en: "Before spending any Speedups, Universal Shards, or Orichalcum, verify that 4 reward layers align simultaneously: (1) Matching GAR / KvK theme day with Double Rewards 2x active + (2) Matching 4-Hour Arms Race window + (3) Concurrent 2-Day Mini-Rush or Hero Gacha of the same category + (4) Active Guild Race / Battle Pass task claimed on your board. Dump once to collect 3–4 reward streams simultaneously!",
        },
        warningNote: {
          vi: "Tuyệt đối không xả ngay lúc 00:05 UTC (07:05 Giờ VN) nếu ca 4 Giờ đầu tiên trong ngày đang là chủ đề lệch pha!",
          en: "Never dump immediately at 00:05 UTC if the first 4-Hour window of the day is on a mismatched theme!",
        },
      },
    ],
  };
}

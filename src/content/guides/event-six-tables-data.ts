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

const CANONICAL_PRO_MECHANICS: Record<
  string,
  readonly EventEncyclopediaSixTableData["section6ProMechanics"][number][]
> = {
  "top-lord": [
    {
      mechanicId: "tl-daily-theme-lock",
      title: {
        vi: "Mẹo 1 — Cơ chế Khóa Chủ Đề Theo Ngày (Ngày 1 Xây Dựng ➔ Ngày 6 Tổng Lực)",
        en: "Tip 1 — Daily Theme Lock (Day 1 Construction ➔ Day 6 Final Sprint)",
      },
      whenToApply: {
        vi: "Kiểm tra chủ đề mở khóa sau mốc reset 02:00 UTC (09:00 Giờ VN) mỗi ngày",
        en: "Verify the active theme after the 02:00 UTC daily reset",
      },
      stepByStep: {
        vi: "Mỗi ngày trong 6 ngày của Top Lord chỉ tính điểm cho đúng nhóm hành động của ngày đó (Ngày 1 Xây dựng ➔ Ngày 2 Khoa kỹ ➔ Ngày 3 Chiêu mộ ➔ Ngày 4 Luyện lính ➔ Ngày 5 Trang bị ➔ Ngày 6 Tăng tốc tổng lực). Tuyệt đối không xả Vé Chiêu Mộ ở Ngày 1–2 hoặc đập Orichalcum trước Ngày 5!",
        en: "Each of Top Lord's 6 days scores strictly on that day's theme (Day 1 Construction ➔ Day 2 Research ➔ Day 3 Recruitment ➔ Day 4 Troops ➔ Day 5 Gear ➔ Day 6 All-Out Speedups). Never spend Recruit Tokens on Days 1–2 or upgrade Gear before Day 5!",
      },
      warningNote: {
        vi: "Xả tài nguyên lệch ngày chủ đề sẽ mất trắng 100% điểm rương mốc ngày.",
        en: "Spending resources outside the matching theme day forfeits 100% of daily chest points.",
      },
    },
    {
      mechanicId: "tl-tier3-chest-stop-loss",
      title: {
        vi: "Mẹo 2 — Điểm Dừng Rương Mốc Cá Nhân Bậc 3 (Stop-Loss Ceiling)",
        en: "Tip 2 — Tier 3 Personal Milestone Chest Stop-Loss Ceiling",
      },
      whenToApply: {
        vi: "Ngay khi điểm cá nhân trong ngày vừa chạm ngưỡng mở Rương Bậc 3",
        en: "Immediately upon reaching the daily Tier 3 Personal Chest threshold",
      },
      stepByStep: {
        vi: "Người chơi F2P và Low-Spender chỉ xả Tăng Tốc và Vé Chiêu Mộ vừa đủ mở Rương Cá Nhân Bậc 3 mỗi ngày để lấy hoàn trả Kim Cương + Mảnh Tướng Vàng, sau đó khóa kho ngay để tích lũy cho Vòng Quay Desert Prince (Ngày 21) và GAR đầu tiên (Ngày 28).",
        en: "F2P and Low-Spenders should spend Speedups and Recruit Tokens strictly up to the daily Tier 3 Personal Chest for Diamond and Gold Shard rebates, then freeze inventory for Day 21 Desert Prince Wheel and Day 28 GAR.",
      },
      warningNote: {
        vi: "Đua Top 1–10 BXH Tổng với Whale ở Tuần 1 sẽ làm cạn sạch Kim Cương trước khi tướng Đỏ xuất hiện.",
        en: "Chasing Top 1–10 overall rankings against Whales in Week 1 drains Diamonds right before Mythic banners arrive.",
      },
    },
    {
      mechanicId: "tl-troop-staircase-promotion",
      title: {
        vi: "Mẹo 3 — Thăng Cấp Lính Cầu Thang (T-1 ➔ T) ở Ngày 4 Luyện Quân",
        en: "Tip 3 — Staircase Troop Promotion (T-1 ➔ T) on Day 4 Troop Day",
      },
      whenToApply: {
        vi: "Huấn luyện sẵn lính cấp T-1 ở Ngày 1–3, bấm Thăng Cấp (Promote) vào Ngày 4",
        en: "Train Tier T-1 troops on Days 1–3, then tap Promote on Day 4",
      },
      stepByStep: {
        vi: "Trong 3 ngày đầu, hãy huấn luyện sẵn lính thấp hơn 1 bậc so với cấp tối đa của Trại Lính (T-1). Khi bước sang Ngày 4 (Huấn Luyện Lính), chọn tính năng Thăng Cấp (Promote T-1 ➔ T) và xả Tăng Tốc Luyện Lính để nhận lượng điểm trên mỗi phút tăng tốc cao gấp 1.4 lần so với luyện mới.",
        en: "During Days 1–3, train troops one tier below your Barracks cap (T-1). When Day 4 (Troop Training) opens, use Promote (T-1 ➔ T) with Training Speedups to earn 1.4x more points per speedup minute than training from scratch.",
      },
      warningNote: {
        vi: "Không dùng Tăng Tốc Chung (Universal Speedups) để luyện lính cấp thấp ở Ngày 1–3.",
        en: "Never spend Universal Speedups training low-tier troops on Days 1–3.",
      },
    },
  ],
  "guild-race": [
    {
      mechanicId: "gr-shared-board-filtering",
      title: {
        vi: "Mẹo 1 — Lọc Nhiệm Vụ Cam/Đỏ (250đ ➔ 400đ+) Trên Bảng Chung 9 Ô",
        en: "Tip 1 — Filtering Legendary/Mythic Tasks (250 ➔ 400+ Pts) on the 9-Slot Shared Board",
      },
      whenToApply: {
        vi: "Trước mỗi lần bấm nhận nhiệm vụ trong giới hạn 8–10 lượt/ngày",
        en: "Before claiming any task within your 8–10 daily attempt cap",
      },
      stepByStep: {
        vi: "Bảng 9 ô nhiệm vụ (activity_task_target) dùng chung cho cả 50 thành viên Bang hội; hãy nhờ R4/R5 xóa liên tục các nhiệm vụ Trắng/Xanh/Tím (<180đ) mỗi 30 phút và chỉ nhận các nhiệm vụ Cam/Đỏ (Phái Thương Đội, Tập Kết Boss, Xả Tăng Tốc Chuyên Biệt) để đạt trung bình >300 điểm/lượt.",
        en: "The 9-slot task board (activity_task_target) is shared across all 50 guildmates; have R4/R5 officers purge White/Blue/Purple tasks (<180 pts) every 30 minutes and claim only Orange/Red tasks (>300 pts average per attempt).",
      },
      warningNote: {
        vi: "Nhận nhiệm vụ điểm thấp (<150đ) sẽ làm hụt mốc Rương Cuối của cá nhân và cả Bang hội.",
        en: "Accepting low-tier tasks (<150 pts) prevents you from hitting the final personal and guild milestone chests.",
      },
    },
    {
      mechanicId: "gr-non-retroactive-accept",
      title: {
        vi: "Mẹo 2 — Cơ Chế Tính Điểm Từ Lúc Bấm Nhận (Non-Retroactive Task Tracking)",
        en: "Tip 2 — Non-Retroactive Task Tracking (Counted Only After Clicking Accept)",
      },
      whenToApply: {
        vi: "Trước khi bấm phái Thương Đội, tiêu Kim Cương hoặc xả Tăng Tốc",
        en: "Before dispatching Caravans, spending Diamonds, or using Speedups",
      },
      stepByStep: {
        vi: "Hệ thống chỉ ghi nhận tiến độ sau khi bạn đã bấm nút Nhận (Accept) nhiệm vụ trên bảng Thi Đấu Hội. Hãy găm sẵn Thương Đội, rương Treo Thưởng hoặc mẻ lính hoàn thành, bấm Nhận nhiệm vụ trên bảng rồi mới ấn thu hoạch để hoàn thành trong 5 giây!",
        en: "Progress registers strictly after clicking Accept on the Guild Race board. Hold your Caravan, completed Bounty Quests, or finished troop batch, click Accept on the board first, and then claim to finish the task in 5 seconds!",
      },
      warningNote: {
        vi: "Chú ý đồng hồ đếm ngược của từng nhiệm vụ; quá hạn chưa xong sẽ mất trắng 1 lượt trong ngày.",
        en: "Watch each task's countdown timer; letting a task expire forfeits 1 daily attempt.",
      },
    },
    {
      mechanicId: "gr-honor-18k-safety-floor",
      title: {
        vi: "Mẹo 3 — Giữ Sàn An Toàn 18.000 Xu Vinh Dự Bang Đổi Đá Linh Hồn Đỏ",
        en: "Tip 3 — Maintain an 18,000 Guild Honor Safety Floor for Red Soul Stones",
      },
      whenToApply: {
        vi: "Khi chi tiêu Xu Vinh Dự trong Cửa Hàng Bang Hội hàng tuần",
        en: "When spending Guild Honor Tokens in the weekly Guild Shop",
      },
      stepByStep: {
        vi: "Tổng Xu Vinh Dự thu về từ rương mốc Guild Race phải ưu tiên giữ lại tối thiểu 18.000 Xu trong túi để mua ngay Đá Linh Hồn Đỏ (Soul Stone) và Mảnh Tướng Vạn Năng Vàng ngay khi Shop Bang Hội reset sáng Thứ Hai.",
        en: "Always preserve a minimum floor of 18,000 Guild Honor Tokens from Guild Race chests to immediately buy out Red Soul Stones and Universal Legendary Shards upon Monday Guild Shop reset.",
      },
      warningNote: {
        vi: "Không tiêu sạch Xu Vinh Dự vào Tăng Tốc lẻ khiến tuần sau không đủ xu mua Đá Linh Hồn.",
        en: "Never drain Guild Honor on loose speedups and miss the weekly Soul Stone buyout.",
      },
    },
  ],
  "guild-arms-race": [
    {
      mechanicId: "gar-double-rewards-2x-tech",
      title: {
        vi: "Mẹo 1 — Khoa Kỹ 'Double Rewards' Nhân Đôi 9 Rương Cá Nhân (9 ➔ 18 Rương/Ngày)",
        en: "Tip 1 — 'Double Rewards' Tech Doubling All 9 Personal Chests (9 ➔ 18 Chests/Day)",
      },
      whenToApply: {
        vi: "Ưu tiên nâng tối đa nhánh công nghệ Arms Race Prep ngay từ đầu mùa S0/S1",
        en: "Max out the Arms Race Prep tech tree branch early in S0/S1",
      },
      stepByStep: {
        vi: "Dồn 100% Tinh Hoa Rồng (Dragon Essence) vào nhánh nghiên cứu Arms Race Prep cho tới khi mở khóa nút cuối cùng 'Double Rewards' — giúp bạn nhận gấp đôi (x2) phần thưởng của toàn bộ 9 mốc rương cá nhân mỗi ngày (tương đương 18 rương/ngày xuyên suốt 6 ngày GAR).",
        en: "Funnel 100% of Dragon Essence into the Arms Race Prep tech tree until unlocking the final 'Double Rewards' node — permanently doubling (2x) all 9 daily personal milestone chests (18 chests/day across all 6 GAR days).",
      },
      warningNote: {
        vi: "Xả kho lớn khi chưa mở khóa Double Rewards đồng nghĩa với việc đánh mất 50% tổng Kim Cương và Mảnh Vàng hoàn trả.",
        en: "Dumping hoarded inventory before unlocking Double Rewards permanently costs you 50% of rebate Diamonds and Gold Shards.",
      },
    },
    {
      mechanicId: "gar-victory-point-111112",
      title: {
        vi: "Mẹo 2 — Quy Tắc Điểm Chiến Thắng 1-1-1-1-1-2 & Chiến Thuật Buông Ngày Lệch",
        en: "Tip 2 — The 1-1-1-1-1-2 Victory Point Rule & Tactical Day Concession",
      },
      whenToApply: {
        vi: "Khi đối đầu Bang hội ngang cơ hoặc mạnh hơn trong 6 ngày ghép cặp",
        en: "When matched against an equal or stronger Guild across the 6-day bracket",
      },
      stepByStep: {
        vi: "Ngày 1 ➔ Ngày 5 mỗi ngày thắng cho 1 Điểm Chiến Thắng, riêng Ngày 6 cho 2 Điểm Chiến Thắng (tổng 7 điểm). Hãy tập trung thắng 3 ngày thế mạnh (ví dụ Ngày 2 Khoa Kỹ + Ngày 4 Anh Hùng + Ngày 5 Luyện Lính = 3 điểm) và chốt Ngày 6 (+2 điểm = 5/7 điểm) thay vì dàn trải tài nguyên cả 6 ngày.",
        en: "Days 1 ➔ 5 award 1 Victory Point each while Day 6 awards 2 Victory Points (7 total). Focus on winning 3 core days (e.g., Day 2 Tech + Day 4 Heroes + Day 5 Troops = 3 pts) plus Day 6 (+2 pts = 5/7 pts) instead of spreading resources thin across all 6 days.",
      },
      warningNote: {
        vi: "Nếu ngày nào Bang đối phương xả quá mạnh từ sớm, hãy chỉ lấy đủ 9 rương cá nhân rồi dừng ngay để dồn đạn cho ngày hôm sau.",
        en: "If the rival guild overspends early on a given day, stop right at your 9th personal chest and save ammo for the next day.",
      },
    },
    {
      mechanicId: "gar-4h-hourly-window-overlap",
      title: {
        vi: "Mẹo 3 — Khớp Khung 4 Tiếng Quân Bị Dũng Sĩ (02:00 / 06:00 / 14:00 UTC)",
        en: "Tip 3 — Synchronizing 4-Hour Warrior Arms Race Windows (02:00 / 06:00 / 14:00 UTC)",
      },
      whenToApply: {
        vi: "Trước khi xả Tăng Tốc, Mảnh Vàng, Đá Hồn hoặc Orichalcum trong tuần GAR",
        en: "Before dumping Speedups, Gold Shards, Soul Stones, or Orichalcum during GAR week",
      },
      stepByStep: {
        vi: "Mỗi ngày GAR đều có các ca 4 tiếng của Quân Bị Dũng Sĩ xoay vòng. Luôn đợi đúng ca 4 tiếng trùng chủ đề với ngày GAR (thường mở lúc 02:00 UTC / 09:00 VN hoặc 14:00 UTC / 21:00 VN) mới xả kho để 1 lần tiêu nguyên liệu mở khóa cả 18 rương GAR lẫn 3 rương Quân Bị Dũng Sĩ.",
        en: "Every GAR day features rotating 4-hour Warrior Arms Race sprints. Always wait for the 4-hour window matching the daily GAR theme (typically 02:00 UTC or 14:00 UTC) so a single resource dump unlocks both 18 GAR chests and 3 Hourly chests.",
      },
      warningNote: {
        vi: "Tránh xả sạch kho ngay lúc 00:05 UTC nếu ca 4 tiếng đầu ngày đang lệch chủ đề!",
        en: "Never dump your stockpile at 00:05 UTC if the first 4-hour sprint of the day is on a different theme!",
      },
    },
  ],
  "treasure-dice-storm-maiden": [
    {
      mechanicId: "dice-recycle-vs-carryover-rule",
      title: {
        vi: "Mẹo 1 — Phân Biệt Xúc Xắc Định Mệnh (#204002 Bảo Lưu) vs Xúc Xắc Ma Thuật (#406181001 Thu Hồi)",
        en: "Tip 1 — Destiny Dice (#204002 Carryover) vs Magic Dice (#406181001 Auto-Recycle)",
      },
      whenToApply: {
        vi: "Kiểm tra mã đạo cụ trong túi trước ngày kết thúc sự kiện Xúc Xắc",
        en: "Check item IDs in your bag before the final day of the Dice event",
      },
      stepByStep: {
        vi: "Theo bảng goods trong Meta.bytes: Xúc Xắc Định Mệnh (#204002) có recycle = '' nên được bảo lưu vĩnh viễn sang kỳ sau; ngược lại Xúc Xắc Ma Thuật (#406181001) và Xu Ma Thuật (#406181006) sẽ bị hệ thống thu hồi đổi thành Vàng ngay khi đóng sự kiện — bắt buộc phải đổ hết và đổi sạch Tiệm trước 02:00 UTC (09:00 Giờ VN) ngày cuối!",
        en: "Per the Meta.bytes goods table: Destiny Dice (#204002) has recycle = '' and carries over indefinitely; however, Magic Dice (#406181001) and Magic Coins (#406181006) are recycled into Gold when the event closes — roll and spend 100% before 02:00 UTC on the final day!",
      },
      warningNote: {
        vi: "Để quên Xu Ma Thuật (#406181006) sau giờ đóng Tiệm sẽ làm mất trắng toàn bộ Mảnh Tướng Đỏ và Vũ Khí Độc Quyền.",
        en: "Leaving unspent Magic Coins (#406181006) past shop close forfeits your Mythic Shards and Exclusive Weapons.",
      },
    },
    {
      mechanicId: "dice-exact-milestone-30-60-100",
      title: {
        vi: "Mẹo 2 — Chốt Chẵn Mốc Rương Bảo Hiểm Lượt Đổ (30 ➔ 60 ➔ 100 Lượt)",
        en: "Tip 2 — Stopping Cleanly at Cumulative Roll Milestones (30 ➔ 60 ➔ 100 Rolls)",
      },
      whenToApply: {
        vi: "Khi tính toán số lượng Xúc Xắc mua bằng Kim Cương và gói $0.99",
        en: "When calculating Dice purchases with Diamonds and $0.99 daily packs",
      },
      stepByStep: {
        vi: "Hơn 60% giá trị mảnh tướng Storm Maiden và Rương Vũ Khí Độc Quyền nằm ở các Rương Mốc Lượt Đổ tích lũy (30 / 60 / 100 lượt). Hãy cộng tổng Xúc Xắc miễn phí từ nhiệm vụ ngày + lượt mua bằng Kim Cương (300 KC/viên) để dừng chính xác tại mốc 30, 60 hoặc 100 lượt.",
        en: "Over 60% of Storm Maiden shards and Exclusive Weapon Chests come from cumulative roll milestones (30 / 60 / 100 rolls). Sum your free daily task dice + Diamond dice (300 Diamonds each) and stop cleanly at 30, 60, or 100 rolls.",
      },
      warningNote: {
        vi: "Tuyệt đối không dừng lửng lơ ở 45 hay 85 lượt đổ gây lãng phí hàng nghìn Kim Cương mà không chạm rương mốc.",
        en: "Never stop mid-way at 45 or 85 rolls, wasting thousands of Diamonds without claiming the next chest.",
      },
    },
    {
      mechanicId: "dice-daily-099-drip-strategy",
      title: {
        vi: "Mẹo 3 — Mua Rải Gói Mồi $0.99/Ngày Rẻ Hơn 65% So Với Nạp Gói Lớn Giờ Chót",
        en: "Tip 3 — Buying Daily $0.99 Packs Saves 65% Compared to Last-Day Bulk Bundles",
      },
      whenToApply: {
        vi: "Mỗi ngày sau mốc reset 02:00 UTC (09:00 Giờ VN) cho người chơi Low-Spender",
        en: "Daily after the 02:00 UTC reset for Low-Spenders targeting Storm Maiden",
      },
      stepByStep: {
        vi: "Nếu bạn định chi ngân sách nhỏ lấy Storm Maiden, hãy mua đều đặn gói $0.99 mỗi ngày ngay từ Ngày 1 (tổng ~$4.95–$6.93 cho cả kỳ) thay vì đợi ngày cuối mới mua gói $19.99, giúp tiết kiệm 65% chi phí trên mỗi viên Xúc Xắc.",
        en: "If spending a small budget for Storm Maiden, buy the $0.99 daily pack every day from Day 1 (~$4.95–$6.93 total) instead of buying a $19.99 pack on the final day, cutting cost-per-die by 65%.",
      },
      warningNote: {
        vi: "Gói $0.99 giới hạn đúng 1 lần/ngày và không thể mua bù nếu bỏ lỡ các ngày đầu.",
        en: "The $0.99 pack is strictly capped at 1/day and cannot be bought retroactively if missed on early days.",
      },
    },
  ],
  "lucky-wheel": [
    {
      mechanicId: "lw-token-carryover-204001",
      title: {
        vi: "Mẹo 1 — Bảo Lưu 100% Xu Vòng Quay (#204001 — recycle = '') Qua Nhiều Mùa",
        en: "Tip 1 — 100% Lucky Wheel Token Carryover (#204001 — recycle = '') Across Seasons",
      },
      whenToApply: {
        vi: "Khi Vòng Quay hiện tại rơi vào tướng lệch hệ (không thuộc đội hình chính)",
        en: "When the current Lucky Wheel features an off-faction hero outside your main march",
      },
      stepByStep: {
        vi: "Xu Vòng Quay May Mắn (#204001) có thuộc tính recycle rỗng trong Meta.bytes nên không bao giờ hết hạn. Ở các kỳ Vòng Quay tướng phụ, bạn chỉ dùng lượt miễn phí và mua gom Xu giảm giá cất vào túi, đợi đúng kỳ tướng chủ lực hệ Horde (Desert Prince / Wukong / Beastmaster) mới xả 150 lượt một lần!",
        en: "Lucky Wheel Tokens (#204001) have an empty recycle field in Meta.bytes and never expire. During off-faction banners, use only free spins and bank discounted tokens in your bag until a core Horde banner (Desert Prince / Wukong / Beastmaster) arrives to burst 150 spins at once!",
      },
      warningNote: {
        vi: "Quay dàn trải mỗi tướng Đỏ 20–30 lượt sẽ khiến đội hình của bạn không có tướng nào đủ sao dùng thực chiến.",
        en: "Spreading 20–30 spins across every Mythic hero leaves your roster with zero usable high-star carries.",
      },
    },
    {
      mechanicId: "lw-pity-chest-10-25-70-150",
      title: {
        vi: "Mẹo 2 — Chốt Đúng Mốc Rương Bảo Hiểm Lượt Quay (10 ➔ 25 ➔ 70 ➔ 150 Lượt)",
        en: "Tip 2 — Targeting Exact Cumulative Spin Pity Chests (10 ➔ 25 ➔ 70 ➔ 150 Spins)",
      },
      whenToApply: {
        vi: "Trước khi bấm quay bằng Kim Cương trong bảng turntable",
        en: "Before spending Diamonds on turntable spins",
      },
      stepByStep: {
        vi: "Tỷ lệ rơi mảnh lớn trên bàn xoay chỉ chiếm ~45%, còn 55% lượng mảnh tướng Đỏ chắc chắn nằm trong Rương Mốc Lượt Quay (10 / 25 / 70 / 150 lượt). Luôn kiểm tra quỹ Kim Cương hiện có để dừng chuẩn xác tại mốc 25 lượt (F2P tiết kiệm), 70 lượt (mở khóa tướng + nâng sao) hoặc 150 lượt.",
        en: "Wheel probability accounts for ~45% of shards while 55% comes from guaranteed Cumulative Spin Chests (10 / 25 / 70 / 150 spins). Always calculate your Diamond reserve in advance and stop cleanly at 25, 70, or 150 spins.",
      },
      warningNote: {
        vi: "Dừng ở 50 lượt hoặc 110 lượt là sai lầm làm bốc hơi 10.000+ Kim Cương mà không nhận được rương bảo hiểm.",
        en: "Stopping at 50 or 110 spins wastes 10,000+ Diamonds without unlocking the next guaranteed chest.",
      },
    },
    {
      mechanicId: "lw-wait-final-day-free-spins",
      title: {
        vi: "Mẹo 3 — Tận Dụng Hết Lượt Quay Miễn Phí 5 Ngày Trước Khi Mua Bù Ngày Cuối",
        en: "Tip 3 — Claim All 5 Daily Free Spins Before Buying Remainder Spins on the Final Day",
      },
      whenToApply: {
        vi: "Xuyên suốt 5 ngày mở Vòng Quay May Mắn",
        en: "Across all 5 days of the Lucky Wheel event",
      },
      stepByStep: {
        vi: "Mỗi ngày sau 02:00 UTC (09:00 Giờ VN) hệ thống tặng 1 lượt quay miễn phí + lượt mua Xu giảm giá. Hãy kiên nhẫn quay lượt miễn phí suốt 4 ngày đầu, đến Ngày 5 mới mua bù đúng số lượt còn thiếu để cán mốc 70 hoặc 150 lượt (tiết kiệm 3.000–4.500 Kim Cương).",
        en: "Each day after 02:00 UTC grants 1 free spin plus discounted token purchases. Use free spins across the first 4 days and buy only the exact remaining spins needed on Day 5 to hit 70 or 150 (saving 3,000–4,500 Diamonds).",
      },
      warningNote: {
        vi: "Nếu xả chạm mốc 150 lượt ngay từ Ngày 1, 4 lượt miễn phí của Ngày 2–5 sẽ bị vượt mốc lãng phí.",
        en: "Hitting 150 spins on Day 1 wastes the 4 free daily spins from Days 2–5 beyond the milestone cap.",
      },
    },
  ],
  "hero-gacha": [
    {
      mechanicId: "hg-token-carryover-204015",
      title: {
        vi: "Mẹo 1 — Tích Đủ 100 ➔ 300 Vé Chiêu Mộ Đặc Biệt (#204015 Bảo Lưu Vĩnh Viễn)",
        en: "Tip 1 — Bank 100 ➔ 300 Special Recruit Tokens (#204015 Permanent Carryover)",
      },
      whenToApply: {
        vi: "Khi số lượng Vé Chiêu Mộ trong túi chưa chạm mốc chẵn 100 / 200 / 300 vé",
        en: "Whenever your Recruit Token stockpile is below the 100 / 200 / 300 milestone thresholds",
      },
      stepByStep: {
        vi: "Vé Chiêu Mộ (#204015) được bảo lưu 100% qua mọi mùa giải. Thay vì mỗi kỳ quay lẻ tẻ 30–40 vé chỉ lấy được rương mốc thấp, hãy nhịn 1–2 chu kỳ để gom đủ 100 ➔ 300 vé rồi xả 1 lần lấy trọn Rương Tự Chọn Mảnh Tướng Đỏ/Vàng và Đá Linh Hồn ở mốc cuối.",
        en: "Recruit Tokens (#204015) carry over 100% across seasons. Instead of spending 30–40 tokens per cycle on low chests, skip 1–2 rotations to bank 100 ➔ 300 tokens and clear the top Choice Hero Shard & Soul Stone milestone chests in one run.",
      },
      warningNote: {
        vi: "Xả vé khi dưới 50 vé sẽ mất toàn bộ phần thưởng hoàn trả bậc cao.",
        en: "Pulling with fewer than 50 tokens forfeits all high-tier rebate milestone chests.",
      },
    },
    {
      mechanicId: "hg-thursday-gar-day4-triple-dip",
      title: {
        vi: "Mẹo 2 — Khớp Lệnh Xả Vé Vào Đúng Thứ Năm (Ngày 4 Anh Hùng GAR / KvK)",
        en: "Tip 2 — Hold All Tavern Pulls Until Thursday (GAR / KvK Day 4 Hero Day)",
      },
      whenToApply: {
        vi: "Đợi đúng 02:00 UTC (09:00 Giờ VN) hoặc 14:00 UTC (21:00 Giờ VN) ngày Thứ Năm",
        en: "Wait until 02:00 UTC or 14:00 UTC on Thursday (Hero Development Day)",
      },
      stepByStep: {
        vi: "Dù sự kiện Hero Gacha mở từ đầu tuần, hãy giữ nguyên toàn bộ Vé Chiêu Mộ trong túi cho tới đúng Thứ Năm (Ngày 4 Phát Triển Anh Hùng của GAR / KvK) trùng với ca 4 Tiếng Chiêu Mộ để 1 vé quay nổ điểm đồng thời trên cả 3 bảng sự kiện!",
        en: "Even when Hero Gacha opens earlier in the week, hold 100% of your Recruit Tokens until Thursday (GAR / KvK Day 4 Hero Day) during the 4-Hour Hero Sprint so every single pull scores across 3 events simultaneously!",
      },
      warningNote: {
        vi: "Quay hết vé vào Thứ Ba hoặc Thứ Tư sẽ khiến bạn trắng tay không có điểm ở Ngày 4 GAR.",
        en: "Spending all tokens on Tuesday or Wednesday leaves you starved for points on GAR Day 4.",
      },
    },
    {
      mechanicId: "hg-faction-wishlist-lock",
      title: {
        vi: "Mẹo 3 — Khóa Danh Sách Ước Nguyện (Wishlist) Đúng Hệ Đội Hình Chính Trước Khi Quay",
        en: "Tip 3 — Lock Your Main Faction Wishlist Before Executing 10-Pull Batches",
      },
      whenToApply: {
        vi: "Trước lượt quay đầu tiên trong giao diện Quán Rượu Đặc Biệt",
        en: "Before your very first 10-pull inside the Special Tavern interface",
      },
      stepByStep: {
        vi: "Kiểm tra và chọn cố định tướng chủ lực hệ Horde (hoặc hệ đội hình 1 của bạn) vào ô Ước Nguyện / Định Hướng trước khi bấm quay theo cụm 10 lượt để mọi mảnh nổ bảo hiểm đều dồn vào đúng 1 đội hình duy nhất.",
        en: "Verify and lock your main Horde (or Team 1) carry heroes into the Wishlist/Target slots before running 10-pull batches so all pity drops funnel into a single core squad.",
      },
      warningNote: {
        vi: "Quên chọn tướng định hướng trước khi quay sẽ làm rơi ngẫu nhiên mảnh tướng lệch hệ.",
        en: "Forgetting to set your target hero before pulling scatters pity shards onto off-faction units.",
      },
    },
  ],
  "butterfly-catching": [
    {
      mechanicId: "bf-opcode-65-cap-300",
      title: {
        vi: "Mẹo 1 — Trần Giới Hạn Ẩn Opcode 65 (Tối Đa 300 Đạo Cụ Rơi Bản Đồ / Kỳ)",
        en: "Tip 1 — Opcode 65 Hidden Drop Cap (Max 300 Map-Dropped Items / Cycle)",
      },
      whenToApply: {
        vi: "Khi cày quái bản đồ, thu thập mỏ và thu hoạch thành nội trong 5–7 ngày sự kiện",
        en: "When farming world map monsters, gathering nodes, and harvesting city resources",
      },
      stepByStep: {
        vi: "Trong Meta.bytes (form_list: 65|<itemId>|300|<dropGroup>), tổng số đạo cụ sự kiện rơi từ bản đồ thế giới bị khóa cứng ở trần 300 cái/kỳ (~50–60 cái/ngày). Khi đã nhặt đủ 300 đạo cụ từ bản đồ, hệ thống sẽ ngưng rơi hoàn toàn — lúc này hãy dừng đốt Bình Thể Lực vô ích!",
        en: "In Meta.bytes (form_list: 65|<itemId>|300|<dropGroup>), total map-dropped event items are hard-capped at 300 per cycle (~50–60/day). Once you hit 300 map drops, the drop rate becomes 0% — stop burning extra Stamina Potions!",
      },
      warningNote: {
        vi: "Nhiều người chơi không biết trần 300 nên đốt hàng chục Bình Thể Lực ở ngày cuối mà không rớt thêm 1 đạo cụ nào.",
        en: "Players unaware of the 300 hard cap often waste dozens of Stamina Potions on the final day with zero drops.",
      },
    },
    {
      mechanicId: "bf-auto-rally-50-daily",
      title: {
        vi: "Mẹo 2 — Bật Auto-Join Rally 50 Lượt/Ngày Để Vét Trần Rơi Không Tốn Thể Lực",
        en: "Tip 2 — Enable 50x Daily Auto-Join Rally to Hit Drop Caps Without Spending Stamina",
      },
      whenToApply: {
        vi: "Bật liên tục mỗi ngày ngay sau giờ reset 02:00 UTC (09:00 Giờ VN)",
        en: "Keep active daily right after the 02:00 UTC server reset",
      },
      stepByStep: {
        vi: "Tham gia 50 lượt Auto-Join Rally đánh Boss cùng Bang hội mỗi ngày kết hợp thu hoạch mỏ tài nguyên trong thành giúp bạn chạm gần sát trần 50–60 đạo cụ rơi/ngày mà vẫn bảo toàn được Bình Thể Lực trong kho.",
        en: "Completing 50 daily Auto-Join Boss Rallies with your guild plus normal city/map gathering effortlessly reaches the 50–60 daily drop pace while preserving Stamina Potions in your bag.",
      },
      warningNote: {
        vi: "Đảm bảo gia hạn lại nút Auto-Join mỗi 8 tiếng để không bị ngắt quãng khi offline.",
        en: "Refresh your 8-hour Auto-Join timer before sleeping so offline rally participation never stops.",
      },
    },
    {
      mechanicId: "bf-final-day-tier-s-redeem",
      title: {
        vi: "Mẹo 3 — Chờ Chốt Tổng Xu Ngày Cuối Để Đổi Trọn Rương Trang Trí Đỏ & Mảnh Vàng (Tier S)",
        en: "Tip 3 — Wait Until Final-Day Token Tally to Redeem Mythic Decor & Gold Shards (Tier S)",
      },
      whenToApply: {
        vi: "Vào ngày cuối của sự kiện trước giờ đóng Tiệm (active_shop)",
        en: "On the final day of the event before the active_shop closes",
      },
      stepByStep: {
        vi: "Đợi khi đã nhặt kịch trần 300 đạo cụ bản đồ và hoàn tất chuỗi nhiệm vụ 5 ngày để biết tổng số xu thực tế; ưu tiên đổi Rương Trang Trí Thần Thoại (+% ATK/HP sở hữu vĩnh viễn) và Mảnh Tướng Vạn Năng Vàng trước, số xu lẻ còn dư mới đổi sang Orichalcum/Tăng tốc.",
        en: "Wait until you have capped all 300 map drops and 5-day mission chains to see your exact coin total; buy out the Mythic Decoration Chest (permanent Owned ATK/HP) and Universal Gold Shards first, then spend leftover coins on Orichalcum/Speedups.",
      },
      warningNote: {
        vi: "Đổi các món lặt vặt từ Ngày 1–2 sẽ khiến bạn thiếu vài chục xu mua Rương Trang Trí Đỏ ở ngày cuối!",
        en: "Buying minor items on Days 1–2 often leaves you just short of the Mythic Decoration Chest on the final day!",
      },
    },
  ],
  "giant-troll-raid": [
    {
      mechanicId: "gtr-50-stamina-free-rallies",
      title: {
        vi: "Mẹo 1 — Tận Dụng Tối Đa 50 Lượt Auto-Join Rally Miễn Phí Thể Lực Mỗi Ngày",
        en: "Tip 1 — Max Out 50 Stamina-Free Auto-Join Rallies Every Single Day",
      },
      whenToApply: {
        vi: "Reset mỗi ngày lúc 02:00 UTC (09:00 Giờ VN)",
        en: "Resets daily at 02:00 UTC",
      },
      stepByStep: {
        vi: "Hệ thống cho phép nhận thưởng tối đa 50 lượt tham gia tập kết Boss Cự Ma mỗi ngày hoàn toàn không tốn Thể lực khi đi ké Rally của đồng đội. Hãy bật Auto-Join 24/7 để lấy đủ 50 rương Orichalcum + Điểm Pass Cự Ma mỗi ngày miễn phí 100%.",
        en: "The game grants up to 50 Giant Troll rally join rewards per day at zero Stamina cost when joining guildmates' rallies. Keep Auto-Join active 24/7 to claim all 50 daily Orichalcum + Raid Pass chests completely free.",
      },
      warningNote: {
        vi: "Chỉ tự bỏ Thể lực cá nhân mở Rally khi đã nhận hết 50 lượt ké hoặc cần chạy nhiệm vụ ngày.",
        en: "Only spend personal Stamina hosting rallies as needed for daily quests after maximizing free joins.",
      },
    },
    {
      mechanicId: "gtr-5dps-gear-swap-burst",
      title: {
        vi: "Mẹo 2 — Tráo Trang Bị Đội 1 & Xếp Đội Hình 4–5 DPS Đơn Mục Tiêu Đánh Boss",
        en: "Tip 2 — Swap Main Gear & Deploy a 4–5 Single-Target DPS Lineup Against the Boss",
      },
      whenToApply: {
        vi: "Trước khi cử đạo quân chủ lực đánh Boss Cự Ma tính mốc sát thương",
        en: "Before sending your main march to hit Giant Troll damage milestones",
      },
      stepByStep: {
        vi: "Vì phần thưởng mốc phụ thuộc vào tổng sát thương gây ra trong 1 trận, hãy tháo tướng Tank phòng thủ thuần ra, thay bằng các tướng DPS đơn mục tiêu + tướng giảm giáp/tăng tốc đánh và dồn bộ Trang Bị Vàng/Đỏ +20/+40 mạnh nhất sang cho các tướng DPS đó.",
        en: "Because milestone chests scale with single-battle damage dealt, swap out pure defensive Tanks for single-target DPS + armor-shred/attack-speed buffers and transfer your best +20/+40 Gold/Mythic gear onto those carries.",
      },
      warningNote: {
        vi: "Nhớ trả lại đội hình chuẩn có Tank trước khi quay lại đánh Đấu Trường PVP hoặc công thành!",
        en: "Remember to restore your standard Tank lineup before returning to PVP Arena or siege battles!",
      },
    },
    {
      mechanicId: "gtr-freeze-orichalcum-for-gar",
      title: {
        vi: "Mẹo 3 — Đóng Băng 100% Orichalcum & Khuôn Đúc Thu Được Chờ Ngày Trang Bị GAR",
        en: "Tip 3 — Freeze 100% of Harvested Orichalcum & Blueprints for GAR Gear Day",
      },
      whenToApply: {
        vi: "Sau khi mở rương Boss Cự Ma và nhận thưởng Thẻ Thông Hành Cự Ma",
        en: "After claiming Giant Troll loot chests and Giant Slayer Pass rewards",
      },
      stepByStep: {
        vi: "Đột Kích Khổng Lồ là nguồn cung Orichalcum và Khuôn Đúc Trang Bị Lãnh Chúa lớn nhất mùa S0–S1. Tuyệt đối không bấm nâng cấp Trang Bị Lãnh Chúa ngay lúc vừa nhận; hãy cất toàn bộ vào kho chờ đúng Ngày 3/Ngày 5 của GAR hoặc Mini-Rush Trang Bị mới xả!",
        en: "Giant Troll Raid is the #1 source of Orichalcum and Lord Gear Blueprints in S0–S1. Never upgrade Lord Gear immediately upon claiming; bank 100% in your inventory until GAR Gear Day or the Lord Gear Mini-Rush!",
      },
      warningNote: {
        vi: "Đập lẻ Orichalcum ngoài ngày sự kiện làm mất trắng 3 mốc rương hoàn trả.",
        en: "Spending Orichalcum outside active gear events forfeits 3 tiers of rebate milestone chests.",
      },
    },
  ],
  "dark-empire-and-legion": [
    {
      mechanicId: "del-wave15-20-reinforce-2x",
      title: {
        vi: "Mẹo 1 — Gửi Quân Tiếp Viện Đồng Đội Từ Đợt 15 ➔ 20 Ăn Điểm Viện Trợ Nhân Đôi",
        en: "Tip 1 — Reinforce Guildmates During Waves 15 ➔ 20 for 2x Assist Scoring",
      },
      whenToApply: {
        vi: "Trong 20 đợt quái Quân Đoàn Hắc Ám tấn công Lâu Đài Bang hội",
        en: "During the 20 Dark Legion monster siege waves attacking guild castles",
      },
      stepByStep: {
        vi: "Từ Đợt 1 ➔ 14 hãy giữ đội hình chính ở nhà để thủ thành. Từ Đợt 15 trở đi (hoặc ngay khi thành bạn vừa thủ xong đợt quái), lập tức cử các đạo quân mạnh nhất sang đồn trú (Reinforce) tại Lâu Đài của thành viên lực chiến thấp và Pháo Đài Bang để gom lượng điểm Viện Trợ gấp đôi!",
        en: "Keep your main squad home during Waves 1 ➔ 14. From Wave 15 onward (or right after your castle clears its wave), immediately send your strongest marches to Reinforce lower-power guildmates and the Guild Fortress for double assist points!",
      },
      warningNote: {
        vi: "Chỉ để quân nằm im ở nhà mình suốt 20 đợt sẽ không bao giờ đủ điểm lọt Top 10 BXH Phòng Thủ Bang.",
        en: "Leaving all marches idle inside your own castle for all 20 waves makes it impossible to reach Top 10 Guild Defense.",
      },
    },
    {
      mechanicId: "del-recall-gathering-marches",
      title: {
        vi: "Mẹo 2 — Thu Hồi Toàn Bộ Đạo Quân Đào Mỏ Trước Giờ R4/R5 Phát Động 10 Phút",
        en: "Tip 2 — Recall All Gathering Marches 10 Minutes Before R4/R5 Launches the Siege",
      },
      whenToApply: {
        vi: "10 phút trước khung giờ hẹn mở sự kiện Phòng Thủ Pháo Đài của Bang hội",
        en: "10 minutes prior to your guild's scheduled Fortress Defense start time",
      },
      stepByStep: {
        vi: "Rút toàn bộ 4 đạo quân đang đi đào mỏ hoặc đánh quái về thành, lắp lại bộ trang bị mạnh nhất cho Đội 1 và Đội 2 để vừa giữ vững tường thành qua Đợt 20 vừa có sẵn 2–3 đạo quân cơ động đi tiếp viện đồng đội xung quanh.",
        en: "Recall all 4 gathering marches back to base and equip your best gear on Squads 1 and 2 so your walls survive through Wave 20 while freeing 2–3 mobile marches to reinforce nearby allies.",
      },
      warningNote: {
        vi: "Để Đội 1 kẹt ngoài mỏ tài nguyên khi quái Đợt 16–20 ập tới sẽ khiến thành bị cháy và ngừng tính điểm các đợt sau!",
        en: "Leaving Squad 1 out gathering during Waves 16–20 causes your castle wall to breach and halts subsequent wave spawns!",
      },
    },
    {
      mechanicId: "del-clear-hospital-before-boss",
      title: {
        vi: "Mẹo 3 — Làm Trống Bệnh Viện Trước Đợt 20 Đánh Boss Pháo Đài Bang",
        en: "Tip 3 — Empty Your Hospital Before the Wave 20 Guild Fortress Boss",
      },
      whenToApply: {
        vi: "Trước khi bước vào Đợt 18–20 và đợt Boss Pháo Đài cuối cùng",
        en: "Right before entering Waves 18–20 and the final Guild Fortress Boss wave",
      },
      stepByStep: {
        vi: "Dùng hỗ trợ bấm tay của Bang hội (Guild Help) để chữa lành toàn bộ lính bị thương tích lũy từ các đợt đầu, đảm bảo Bệnh Viện hoàn toàn trống trước khi chạm trán Boss Đợt 20 nhằm tránh tràn viện gây chết lính thật.",
        en: "Use Guild Help taps to heal wounded troops from earlier waves, keeping your Hospital completely empty before the Wave 20 Boss impact so zero troops overflow into permanent deaths.",
      },
      warningNote: {
        vi: "Tuyệt đối không để Bệnh Viện đầy >80% khi tham gia phòng thủ các đợt cuối.",
        en: "Never enter the final siege waves with your Hospital above 80% capacity.",
      },
    },
  ],
  "mini-rushes-and-guild-rush": [
    {
      mechanicId: "mr-anti-bait-offweek-freeze",
      title: {
        vi: "Mẹo 1 — Kỷ Luật Chống 'Sự Kiện Mồi' (Off-Week Bait) Ngay Trước Tuần GAR / KvK",
        en: "Tip 1 — Anti-Bait Discipline During the Off-Week Right Before GAR / KvK",
      },
      whenToApply: {
        vi: "Khi Mini-Rush 2 ngày xuất hiện vào tuần nghỉ (Tuần A — không có GAR/KvK)",
        en: "Whenever a 2-Day Mini-Rush spawns during an off-week (Week A — no GAR/KvK)",
      },
      stepByStep: {
        vi: "Nhà phát hành luôn đặt các kỳ Đua Ngắn 2 Ngày (Đá Hồn, Cổ Vật, Thú Cưng, Cổ Ngữ, Trang Bị) vào tuần nghỉ ngay trước GAR để dụ người chơi xả sạch kho. Ở tuần nghỉ, chỉ tiêu lượng nhỏ vừa chạm Rương 1–2 và bắt buộc giữ lại 85%–90% nguyên liệu cho tuần GAR kế tiếp!",
        en: "The publisher deliberately schedules 2-Day Mini-Rushes (Soul Stones, Relics, Pets, Runes, Gear) during the off-week before GAR to bait inventory dumps. During off-weeks, claim only Chest 1–2 and preserve 85%–90% of your stockpile for GAR week!",
      },
      warningNote: {
        vi: "Xả cạn Đá Hồn và Orichalcum vào Mini-Rush tuần nghỉ sẽ khiến bạn mất trắng 18 rương nhân đôi ở tuần GAR sau đó.",
        en: "Draining Soul Stones and Orichalcum in an off-week Mini-Rush costs you 18 doubled chests the following GAR week.",
      },
    },
    {
      mechanicId: "mr-triple-dip-gar-alignment",
      title: {
        vi: "Mẹo 2 — Gộp Ba Tầng Thưởng (Triple-Dip: Mini-Rush 2 Ngày + GAR + Ca 4 Giờ)",
        en: "Tip 2 — Triple-Dipping 3 Reward Tracks (2-Day Mini-Rush + GAR + 4-Hour Sprint)",
      },
      whenToApply: {
        vi: "Khi Mini-Rush 2 ngày mở trùng đúng ngày chủ đề của GAR / KvK",
        en: "When a 2-Day Mini-Rush overlaps the matching GAR / KvK theme day",
      },
      stepByStep: {
        vi: "Khi Mini-Rush 2 Ngày rơi vào tuần lễ GAR/KvK, hãy đợi đúng khung giờ 4 tiếng của Quân Bị Dũng Sĩ trùng chủ đề (02:00 UTC hoặc 14:00 UTC) rồi xả dứt điểm nguyên liệu để 1 lần nâng cấp ăn trọn cả 3 hệ thống rương mốc (hiệu suất 300% ROI).",
        en: "When a 2-Day Mini-Rush lands inside GAR/KvK week, wait for the matching 4-Hour Warrior Arms Race window (02:00 UTC or 14:00 UTC) and dump once to clear all 3 milestone tracks simultaneously (300% ROI).",
      },
      warningNote: {
        vi: "Luôn kiểm tra kỹ bảng lịch 4 tiếng trong ngày trước khi bấm nâng cấp hàng loạt.",
        en: "Always verify the daily 4-hour schedule table before executing batch upgrades.",
      },
    },
    {
      mechanicId: "mr-chest3-hard-stop",
      title: {
        vi: "Mẹo 3 — Dừng Tuyệt Đối Ngay Tại Rương Mốc Cá Nhân Số 3 (Hard Stop at Chest 3)",
        en: "Tip 3 — Hard Stop Immediately Upon Unlocking Personal Milestone Chest #3",
      },
      whenToApply: {
        vi: "Ngay giây phút thanh điểm cá nhân Mini-Rush vừa chạm mốc Rương 3",
        en: "The exact moment your personal Mini-Rush progress bar hits Chest #3",
      },
      stepByStep: {
        vi: "Trong cấu trúc thưởng của Mini-Rush 2 Ngày, Rương Mốc Cá Nhân 1 ➔ 3 hoàn trả tới 25%–35% nguyên liệu và Kim Cương, nhưng phần thưởng đua Top BXH lại rất thấp so với lượng tài nguyên phải đốt thêm. Chạm Rương 3 là dừng 100% để tích cho kỳ sau!",
        en: "In 2-Day Mini-Rushes, Personal Chests 1 ➔ 3 refund 25%–35% of materials and Diamonds, whereas leaderboard ranking rewards offer terrible marginal return. Stop 100% at Chest #3 and bank the rest for the next cycle!",
      },
      warningNote: {
        vi: "Mọi nguyên liệu xả vượt quá mốc Rương 3 đều có tỷ lệ hoàn vốn bằng 0.",
        en: "Every single material spent beyond Personal Chest #3 yields 0% milestone rebate.",
      },
    },
  ],
};

function resolveDynamicMetadata(record: EventPlaybookRecord): EventSpecificMetadata {
  const explicit = EVENT_SPECIFIC_METADATA[record.id];
  if (explicit) return explicit;

  const isPureRecharge = Boolean(record.isPureRecharge);
  const stageLabelVi =
    record.serverStage === "stage_1"
      ? "Giai đoạn 1 (Tân thủ Ngày 1–39)"
      : record.serverStage === "stage_2"
      ? "Giai đoạn 2 (Mùa Giải S1 — Ngày 40–90)"
      : "Giai đoạn 3 (Mùa Giải S2+ & Endgame)";
  const stageLabelEn =
    record.serverStage === "stage_1"
      ? "Stage 1 (Rookie Days 1–39)"
      : record.serverStage === "stage_2"
      ? "Stage 2 (Season 1 — Days 40–90)"
      : "Stage 3 (Season 2+ & Endgame)";

  return {
    unlockConditions: {
      vi: `Mở khóa tại ${stageLabelVi} • Khung lịch: ${record.s0TimingBadge.vi} (${record.name.vi})`,
      en: `Unlocks in ${stageLabelEn} • Window: ${record.s0TimingBadge.en} (${record.name.en})`,
    },
    dropSources: isPureRecharge
      ? [
          {
            sourceName: {
              vi: `Mốc Tích Lũy Giao Dịch & Gói Ưu Đãi (${record.name.vi})`,
              en: `Cumulative Top-Up & Bundle Milestones (${record.name.en})`,
            },
            dropRate: {
              vi: "100% kích hoạt tức thì khi hoàn tất gói trong bảng exchange",
              en: "100% instant activation upon completing eligible exchange bundles",
            },
            dailyHiddenCap: {
              vi: `Giới hạn theo mốc gói ngày / kỳ sự kiện (Reset 02:00 UTC / 09:00 Giờ VN)`,
              en: `Capped by daily / cycle bundle limits (Resets at 02:00 UTC)`,
            },
          },
        ]
      : record.id.includes("festival") || record.id.includes("collab")
      ? [
          {
            sourceName: {
              vi: `Đánh Quái Bản Đồ, Đào Mỏ & Chuỗi Nhiệm Vụ 5 Ngày (${record.name.vi})`,
              en: `World Map Monsters, Gathering & 5-Day Task Chain (${record.name.en})`,
            },
            dropRate: {
              vi: "100% từ nhiệm vụ mốc + Xác suất rơi từ quái và mỏ tài nguyên (activity_drop)",
              en: "100% from task milestones + World map monster/gathering drops (activity_drop)",
            },
            dailyHiddenCap: {
              vi: "Trần giới hạn ẩn Opcode 65: Tối đa 300 đạo cụ rơi bản đồ / Kỳ (~50–60 cái/ngày)",
              en: "Opcode 65 hidden cap: Max 300 map-dropped items / Cycle (~50–60/day)",
            },
          },
        ]
      : [
          {
            sourceName: {
              vi: `Chuỗi Nhiệm Vụ Điểm Mốc & Rương Tích Lũy (${record.name.vi})`,
              en: `Point Mission Chain & Milestone Chests (${record.name.en})`,
            },
            dropRate: {
              vi: "100% nhận trực tiếp khi hoàn thành các mốc tiến độ A ➔ B",
              en: "100% guaranteed upon clearing A ➔ B progression milestones",
            },
            dailyHiddenCap: {
              vi: `Giới hạn theo tổng mốc rương của kỳ ${record.cadenceBadge.vi} (Reset 02:00 UTC)`,
              en: `Capped by cycle milestone tiers across ${record.cadenceBadge.en} (02:00 UTC reset)`,
            },
          },
        ],
    packs: [
      {
        packId: `${record.id}-pack-starter`,
        packName: {
          vi: `Gói Khởi Động / Ngày ${record.name.vi} ($0.99 – $1.99)`,
          en: `${record.name.en} Daily Starter Pack ($0.99 – $1.99)`,
        },
        priceUsdVnd: {
          vi: "$0.99 – $1.99 (~25.000đ – 49.000đ)",
          en: "$0.99 – $1.99 USD",
        },
        purchaseLimit: {
          vi: "1 lần / Ngày (Reset 02:00 UTC / 09:00 Giờ VN)",
          en: "1 / Day (Resets at 02:00 UTC)",
        },
        contentsSummary: {
          vi: isPureRecharge
            ? "Kim Cương + Quà Mốc Nạp Ngày + Mảnh Tướng Vạn Năng Vàng"
            : "Kim Cương + Đạo Cụ Sự Kiện Giá Chiết Khấu + Nguyên Liệu Cốt Lõi",
          en: isPureRecharge
            ? "Diamonds + Daily Top-Up Milestone Rewards + Universal Legendary Shards"
            : "Diamonds + Discounted Event Tokens + Core Upgrade Materials",
        },
        roiRating: {
          vi: "ROI 380%+ — Gói tối ưu nhất cho Low-Spender chạm mốc chẵn",
          en: "380%+ ROI — Best value micro-pack for Low-Spenders hitting exact milestones",
        },
        isBestValue: true,
        isHiddenCrossEvent: false,
      },
      {
        packId: `${record.id}-pack-pass`,
        packName: {
          vi: `Thẻ Thông Hành / Gói Tăng Tốc ${record.name.vi} ($4.99 – $19.99)`,
          en: `${record.name.en} Battle Pass / Booster Bundle ($4.99 – $19.99)`,
        },
        priceUsdVnd: {
          vi: "$4.99 – $19.99 (~125.000đ – 500.000đ)",
          en: "$4.99 – $19.99 USD",
        },
        purchaseLimit: {
          vi: "1 lần / Kỳ sự kiện",
          en: "1 / Event cycle",
        },
        contentsSummary: {
          vi: "Mở khóa nhánh thưởng cao cấp (Mảnh Tướng Đỏ / Đá Linh Hồn / Orichalcum / Vũ Khí Độc Quyền)",
          en: "Unlocks premium reward track (Mythic Shards / Soul Stones / Orichalcum / Exclusive Weapons)",
        },
        roiRating: {
          vi: "ROI 320% — Chỉ mua khi đã cày tối đa điểm nhiệm vụ trong kỳ",
          en: "320% ROI — Buy only after maximizing active event mission progress",
        },
        isBestValue: false,
        isHiddenCrossEvent: true,
      },
    ],
  };
}

function resolveEventProMechanics(
  record: EventPlaybookRecord
): readonly EventEncyclopediaSixTableData["section6ProMechanics"][number][] {
  const canonical = CANONICAL_PRO_MECHANICS[record.id];
  if (canonical) return canonical;

  if (record.isPureRecharge) {
    return [
      {
        mechanicId: `${record.id}-stagger-topup-streak`,
        title: {
          vi: "Mẹo 1 — Tách Nhỏ Giao Dịch $0.99/Ngày Thay Vì Mua Dồn Một Lần",
          en: "Tip 1 — Stagger $0.99 Daily Purchases Instead of Buying All Packs on Day 1",
        },
        whenToApply: {
          vi: `Áp dụng xuyên suốt kỳ ${record.cadenceBadge.vi} sau mốc reset 02:00 UTC (09:00 Giờ VN)`,
          en: `Apply across ${record.cadenceBadge.en} after the 02:00 UTC daily reset`,
        },
        stepByStep: {
          vi: `${record.overview.goldenRule.vi} Khi chia nhỏ nhu cầu mua (Thợ Xây $1.99, Thẻ Tháng, Battle Pass $4.99) ra từng ngày riêng biệt, bạn kích hoạt đồng thời cả quà gói lẫn chuỗi Tích Nạp Liên Tiếp.`,
          en: `${record.overview.goldenRule.en} By staggering planned purchases (2nd Builder, Monthly Card, Battle Pass) across separate days, you double-dip both bundle contents and Consecutive Top-Up streak chests.`,
        },
        warningNote: {
          vi: "Tuyệt đối không nạp lẻ vào ngày thường khi không có sự kiện tích nạp hoặc hoàn trả đi kèm!",
          en: "Never make standalone purchases on off-days without an active cumulative recharge rebate!",
        },
      },
      {
        mechanicId: `${record.id}-grind-before-unlock`,
        title: {
          vi: "Mẹo 2 — Cày Đạt Mốc Tối Đa Trước Khi Bấm Mua Mở Khóa Quỹ / Pass",
          en: "Tip 2 — Reach Maximum Milestone Tier Before Purchasing Fund or Pass Unlocks",
        },
        whenToApply: {
          vi: "Khi tham gia các sự kiện Quỹ Trưởng Thành, Thẻ Thông Hành hoặc Hộp Quà VIP",
          en: "When evaluating Growth Funds, Battle Passes, or VIP Rebate Chests",
        },
        stepByStep: {
          vi: `${record.overview.coreLoop.vi} Chỉ bấm thanh toán mở khóa nhánh VIP khi bạn đã hoàn thành đủ cấp độ mốc mục tiêu và trùng vào ngày mở sự kiện Hoàn Trả Nạp để tối ưu 200%–500% ROI.`,
          en: `${record.overview.coreLoop.en} Purchase the VIP unlock strictly after reaching the target milestone level on an active Top-Up Rebate day to lock in 200%–500% ROI.`,
        },
        warningNote: {
          vi: "Bỏ qua 100% các gói pop-up ngẫu nhiên có tỷ lệ hoàn vốn thấp (<150% ROI).",
          en: "Skip 100% of random pop-up bundles with low efficiency (<150% ROI).",
        },
      },
    ];
  }

  if (record.id.includes("festival") || record.id.includes("collab")) {
    return [
      {
        mechanicId: `${record.id}-non-retroactive-5day-tasks`,
        title: {
          vi: "Mẹo 1 — Cơ Chế Tính Từ Lúc Mở Ngày & Dư Biên Độ Điểm Nhiệm Vụ (750đ vs Mốc Cuối 600đ)",
          en: "Tip 1 — Daily Unlock Task Tracking & 150-Point Surplus Buffer (750 Max vs 600 Chest Cap)",
        },
        whenToApply: {
          vi: "Trong chuỗi nhiệm vụ mở khóa theo 5 ngày (Reset 02:00 UTC / 09:00 Giờ VN)",
          en: "Across the 5-day staged mission chain (02:00 UTC daily reset)",
        },
        stepByStep: {
          vi: "Các nhiệm vụ Tăng tốc Xây/Nghiên cứu (Ngày 3), Đánh quái/Tập kết/Cống hiến (Ngày 4) và Chiêu mộ/Luyện lính/Thể lực (Ngày 5) chỉ bắt đầu tính khi ngày đó đã mở khóa. Ngoài ra, tổng 75 nhiệm vụ cho tối đa 750 điểm trong khi rương cuối chỉ cần 600 điểm — bạn được phép bỏ qua 15 mốc nhiệm vụ khó (như mốc 3.000p Tăng tốc) mà vẫn lấy trọn 100% rương mốc!",
          en: "Speedup tasks (Day 3), Monster/Rally/Donation tasks (Day 4), and Recruit/Troop/Stamina tasks (Day 5) only track once that specific day unlocks. Furthermore, 75 tasks grant 750 max points while the final chest requires only 600 points — letting you skip up to 15 expensive tasks and still claim 100% of milestone chests!",
        },
        warningNote: {
          vi: "Tuyệt đối không xả sớm Tăng Tốc hay Vé Chiêu Mộ ở Ngày 1–2 của sự kiện lễ hội!",
          en: "Never dump Speedups or Recruit Tokens prematurely on Days 1–2 of a festival event!",
        },
      },
      {
        mechanicId: `${record.id}-opcode65-cap-and-shop`,
        title: {
          vi: "Mẹo 2 — Trần Rơi Bản Đồ 300 Đạo Cụ (Opcode 65) & Ưu Tiên Quét Sạch Tier S Trước Giờ Thu Hồi",
          en: "Tip 2 — 300 Map Drop Cap (Opcode 65) & Clearing Tier S Before Token Recycle",
        },
        whenToApply: {
          vi: "Khi cày đạo cụ rơi từ quái bản đồ và đổi thưởng ngày cuối",
          en: "When farming map drops and redeeming shop rewards on the final day",
        },
        stepByStep: {
          vi: `${record.overview.goldenRule.vi} Lưu ý tổng đạo cụ rơi từ bản đồ bị khóa ở trần 300 cái/kỳ (Opcode 65); hãy chạy 50 lượt Auto-Join Rally mỗi ngày để lấy đủ trần miễn phí và đổi sạch Mảnh Tướng Đỏ/Vàng + Đá Hồn trước khi hệ thống thu hồi xu thừa.`,
          en: `${record.overview.goldenRule.en} Note that world map item drops are hard-capped at 300 per cycle (Opcode 65); run 50 daily Auto-Join Rallies to cap free drops and redeem all Mythic/Gold Shards + Soul Stones before leftover tokens expire.`,
        },
        warningNote: {
          vi: "Đạo cụ lễ hội và Collab sẽ bị thu hồi (recycle) ngay khi đóng Tiệm — không được để tồn đọng!",
          en: "Festival and Collab tokens expire immediately when the Shop closes — leave zero unspent coins!",
        },
      },
    ];
  }

  return [
    {
      mechanicId: `${record.id}-core-mechanic-execution`,
      title: {
        vi: `Mẹo 1 — Quy Tắc Thực Chiến Cốt Lõi: ${record.name.vi}`,
        en: `Tip 1 — Core Tactical Execution: ${record.name.en}`,
      },
      whenToApply: {
        vi: `Thực hiện trong khung mở ${record.s0TimingBadge.vi} (Reset 02:00 UTC / 09:00 Giờ VN)`,
        en: `Execute during ${record.s0TimingBadge.en} (02:00 UTC daily reset)`,
      },
      stepByStep: {
        vi: `${record.overview.coreLoop.vi} ${record.overview.goldenRule.vi}`,
        en: `${record.overview.coreLoop.en} ${record.overview.goldenRule.en}`,
      },
      warningNote: {
        vi: "Luôn dừng xả tài nguyên ngay khi vừa chạm mốc rương bảo hiểm mục tiêu để bảo toàn thanh khoản.",
        en: "Always stop spending immediately upon hitting your target guaranteed milestone chest to preserve liquidity.",
      },
    },
    {
      mechanicId: `${record.id}-window-sync-and-stop-loss`,
      title: {
        vi: "Mẹo 2 — Đồng Bộ Khung Giờ Cộng Hưởng & Kiểm Soát Điểm Dừng Hoàn Vốn",
        en: "Tip 2 — Golden Window Synchronization & Rebate Milestone Stop-Loss",
      },
      whenToApply: {
        vi: "Căn đúng ca 02:00 UTC (09:00 Giờ VN) hoặc 14:00 UTC (21:00 Giờ VN)",
        en: "Align with the 02:00 UTC or 14:00 UTC golden windows",
      },
      stepByStep: {
        vi: "Kiểm tra bảng sự kiện song hành trước khi thao tác: chỉ xả nguyên liệu hoặc lượt khiêu chiến khi có thể ăn điểm kép (Double-Dip) cùng Nhiệm vụ Bang hội / GAR / KvK, và ưu tiên đổi 100% vật phẩm giới hạn Tier S trong Cửa hàng.",
        en: "Check concurrent event boards before acting: spend materials or challenge attempts strictly when double-dipping with Guild Tasks / GAR / KvK, and clear 100% of capped Tier S shop items first.",
      },
      warningNote: {
        vi: "Không đốt Kim Cương đua Top BXH nếu phần thưởng chênh lệch thấp hơn chi phí bỏ ra.",
        en: "Never burn Diamonds chasing leaderboard ranks when marginal rewards are worth less than the cost.",
      },
    },
  ];
}

export function buildEventSixTablesData(
  record: EventPlaybookRecord
): EventEncyclopediaSixTableData {
  const meta = resolveDynamicMetadata(record);
  const proMechanics = resolveEventProMechanics(record);
  const tierS = record.economy.shopTierList.filter((i) => i.tier === "S");
  const tierA = record.economy.shopTierList.filter((i) => i.tier === "A");
  const tierF = record.economy.shopTierList.filter((i) => i.tier === "F");
  const sNamesVi =
    tierS.map((i) => i.itemName.vi).join(" + ") ||
    "Mảnh Tướng Vạn Năng & Vật phẩm giới hạn";
  const sNamesEn =
    tierS.map((i) => i.itemName.en).join(" + ") ||
    "Universal Hero Shards & Capped Core Items";
  const aNamesVi =
    tierA.map((i) => i.itemName.vi).join(" + ") ||
    "Đá Hồn / Orichalcum / Nguyên liệu bậc cao";
  const aNamesEn =
    tierA.map((i) => i.itemName.en).join(" + ") ||
    "Soul Stones / Orichalcum / High-tier Materials";
  const fNamesVi =
    tierF.map((i) => i.itemName.vi).join(" + ") ||
    "Tài nguyên thường (Gỗ/Thịt/Đá) & Mảnh Tím";
  const fNamesEn =
    tierF.map((i) => i.itemName.en).join(" + ") ||
    "Basic Resources (Wood/Meat/Stone) & Purple Shards";

  const hoardSummaryVi =
    record.hoardingItems.length > 0
      ? record.hoardingItems
          .map((h) => `${h.name.vi} (${h.targetAmount.vi})`)
          .join(" | ")
      : "Không tiêu hao đạo cụ tích trữ (Tính theo gói nạp trực tiếp trong thời gian mở sự kiện)";
  const hoardSummaryEn =
    record.hoardingItems.length > 0
      ? record.hoardingItems
          .map((h) => `${h.name.en} (${h.targetAmount.en})`)
          .join(" | ")
      : "No hoardable tokens consumed (Tracked via direct top-up bundles during the active window)";

  const firstDrop = meta.dropSources[0];

  return {
    table1TimelineRules: {
      takeEffectTime: record.s0TimingBadge,
      durationAndCooldown: {
        vi: `${record.cadenceBadge.vi} • Reset mốc ngày lúc 02:00 UTC (09:00 Giờ VN)`,
        en: `${record.cadenceBadge.en} • Daily reset at 02:00 UTC`,
      },
      unlockConditions: meta.unlockConditions,
      coreFaqRules: [
        record.overview.summary,
        record.overview.coreLoop,
        record.overview.goldenRule,
      ],
      recyclePolicy: record.overview.carryoverRule,
      conciseBullets: [
        {
          vi: `Lịch mở & Chu kỳ: ${record.s0TimingBadge.vi} ➔ ${record.cadenceBadge.vi} (Reset 02:00 UTC / 09:00 Giờ VN).`,
          en: `Schedule & Cadence: ${record.s0TimingBadge.en} ➔ ${record.cadenceBadge.en} (02:00 UTC daily reset).`,
        },
        {
          vi: `Cơ chế cốt lõi: ${record.overview.coreLoop.vi}`,
          en: `Core Mechanic: ${record.overview.coreLoop.en}`,
        },
        {
          vi: `Quy tắc bảo lưu / thu hồi (recycle): ${record.overview.carryoverRule.vi}`,
          en: `Carryover / Recycle Rule: ${record.overview.carryoverRule.en}`,
        },
      ],
      takeaway: {
        vi: `👉 Mục tiêu cốt lõi: ${record.overview.goldenRule.vi}`,
        en: `👉 Core Objective: ${record.overview.goldenRule.en}`,
      },
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
      conciseBullets: record.dailyStages.map((stage) => ({
        vi: `${stage.label.vi} (${stage.goldenWindow.vi}): ${stage.theme.vi} ➔ ${stage.primaryScoring.vi}`,
        en: `${stage.label.en} (${stage.goldenWindow.en}): ${stage.theme.en} ➔ ${stage.primaryScoring.en}`,
      })),
      milestoneSummary: {
        vi: `Mốc rương tích điểm (${record.economy.budgetTiers[0]?.targetMilestone.vi ?? "Mốc 1"} ➔ ${record.economy.budgetTiers[record.economy.budgetTiers.length - 1]?.targetMilestone.vi ?? "Mốc cuối"}): Hoàn trả Kim Cương, đạo cụ sự kiện và nguyên liệu nâng cấp đội hình chính.`,
        en: `Milestone Chest Progression (${record.economy.budgetTiers[0]?.targetMilestone.en ?? "Tier 1"} ➔ ${record.economy.budgetTiers[record.economy.budgetTiers.length - 1]?.targetMilestone.en ?? "Max Tier"}): Refunds Diamonds, event tokens, and core upgrade materials.`,
      },
      takeaway: {
        vi: `👉 Chốt mốc F2P / Low-Spender: Tập trung hoàn thành ${record.economy.budgetTiers[0]?.targetMilestone.vi ?? "Rương Mốc Cá Nhân Bậc 3"} để nhận tối đa quà miễn phí và dừng đúng điểm rơi hoàn vốn!`,
        en: `👉 F2P / Low-Spender Target: Clear ${record.economy.budgetTiers[0]?.targetMilestone.en ?? "Tier 3 Personal Milestone Chests"} for maximum free rewards and stop cleanly at the rebate breakpoint!`,
      },
    },
    table3ShopAndDrops: {
      dropSources: meta.dropSources,
      shopItems: record.economy.shopTierList.map((item) => ({
        id: item.id,
        itemName: item.itemName,
        iconPath: item.iconPath,
        rarity: item.rarity,
        quantityPerPurchase: {
          vi: item.tier === "S" ? "1 ➔ 5 Vật phẩm / Lượt" : "1 Vật phẩm / Lượt",
          en: item.tier === "S" ? "1 ➔ 5 Items / Purchase" : "1 Item / Purchase",
        },
        cost: item.costAndCap,
        purchaseLimit: {
          vi:
            item.tier === "S"
              ? "Giới hạn nghiêm ngặt theo kỳ (Mua bắt buộc)"
              : item.tier === "A"
              ? "Giới hạn theo tuần / kỳ sự kiện (Khi dư xu)"
              : "Không giới hạn (Bẫy cần tránh)",
          en:
            item.tier === "S"
              ? "Strictly capped per cycle (Mandatory buy)"
              : item.tier === "A"
              ? "Capped per week / event cycle (With surplus coins)"
              : "Unlimited (Trap to avoid)",
        },
        priorityTier: item.tier,
        verdict: item.verdict,
      })),
      dropSummary: {
        vi: `Nguồn rơi & Trần giới hạn: ${firstDrop.sourceName.vi} ➔ ${firstDrop.dailyHiddenCap.vi}.`,
        en: `Drop Source & Hidden Cap: ${firstDrop.sourceName.en} ➔ ${firstDrop.dailyHiddenCap.en}.`,
      },
      tierSSummary: {
        vi: `Tier S (Mua bắt buộc): ${sNamesVi} — Mua kịch trần giới hạn trước tiên.`,
        en: `Tier S (Mandatory Buy): ${sNamesEn} — Clear the purchase cap first.`,
      },
      tierASummary: {
        vi: `Tier A (Khi dư xu): ${aNamesVi} — Đổi sau khi đã vét sạch toàn bộ Tier S.`,
        en: `Tier A (Surplus Buy): ${aNamesEn} — Redeem only after clearing all Tier S items.`,
      },
      tierFSummary: {
        vi: `Tier F (Bẫy cần tránh): ${fNamesVi} — Tuyệt đối không đổi, tránh lãng phí xu sự kiện.`,
        en: `Tier F (Trap to Avoid): ${fNamesEn} — Strictly skip to avoid wasting event currency.`,
      },
      takeaway: {
        vi: `👉 Thứ tự ưu tiên Tiệm: Vét sạch 100% ${sNamesVi} (Tier S) ➔ Dư xu mới đổi ${aNamesVi} (Tier A) ➔ Bỏ qua hoàn toàn ${fNamesVi} (Tier F)!`,
        en: `👉 Shop Priority Order: Buy out 100% of ${sNamesEn} (Tier S) ➔ Spend surplus on ${aNamesEn} (Tier A) ➔ Strictly skip ${fNamesEn} (Tier F)!`,
      },
    },
    table4PacksAndRoi: {
      preBuyNote: record.economy.preBuyStrategy,
      diamondCeiling: record.economy.diamondCeiling,
      packs: meta.packs,
      conciseBullets: [
        ...meta.packs.map((p) => ({
          vi: `${p.packName.vi} (${p.priceUsdVnd.vi} | ${p.purchaseLimit.vi}): ${p.contentsSummary.vi} ➔ ${p.roiRating.vi}.`,
          en: `${p.packName.en} (${p.priceUsdVnd.en} | ${p.purchaseLimit.en}): ${p.contentsSummary.en} ➔ ${p.roiRating.en}.`,
        })),
        {
          vi: `${record.economy.diamondCeiling.vi}`,
          en: `${record.economy.diamondCeiling.en}`,
        },
      ],
      takeaway: {
        vi: `👉 Chốt chiến thuật gói nạp & Kim Cương: ${record.economy.preBuyStrategy.vi}`,
        en: `👉 Pack & Diamond ROI Takeaway: ${record.economy.preBuyStrategy.en}`,
      },
    },
    section5HoardingPlan: {
      shortTermTargets: record.hoardingItems,
      consumedSummary: {
        vi: `Tiêu thụ trực tiếp: ${hoardSummaryVi}.`,
        en: `Direct Consumption: ${hoardSummaryEn}.`,
      },
      hoardingQuotaSummary: {
        vi: record.isPureRecharge
          ? "Khuyến nghị ngân sách: Nhịn các gói pop-up lẻ (<150% ROI) ở tuần thường để dồn ngân sách vào đúng kỳ sự kiện này."
          : `Khuyến nghị tích trữ ngay: ${record.hoardingItems.map((h) => `${h.targetAmount.vi} (${h.freezeWindow.vi})`).join(" ➔ ")}.`,
        en: record.isPureRecharge
          ? "Budget Recommendation: Skip low-value pop-up bundles (<150% ROI) on off-days to concentrate budget into this active event."
          : `Recommended Pre-Event Hoard: ${record.hoardingItems.map((h) => `${h.targetAmount.en} (${h.freezeWindow.en})`).join(" ➔ ")}.`,
      },
      takeaway: {
        vi: record.isPureRecharge
          ? "👉 Sự kiện thuần nạp (isPureRecharge): Không cần tích đạo cụ — chỉ gộp lịch mua Thẻ Tháng / Pass / Gói $0.99 vào đúng ngày mở sự kiện để ăn thưởng kép!"
          : `👉 Kỷ luật tích trữ: Đóng băng tài nguyên trước sự kiện và chỉ xả vào đúng khung giờ vàng (${record.dailyStages[0]?.goldenWindow.vi ?? "02:00 UTC / 09:00 Giờ VN"}) vừa chạm mốc rương bảo hiểm!`,
        en: record.isPureRecharge
          ? "👉 Pure Recharge Event: No token hoarding required — simply align Monthly Card / Pass / $0.99 purchases with this window for double milestone rewards!"
          : `👉 Hoarding Discipline: Freeze core materials ahead of launch and dump strictly inside the golden window (${record.dailyStages[0]?.goldenWindow.en ?? "02:00 UTC"}) up to guaranteed milestone chests!`,
      },
      rechargeSavingAdvice: record.isPureRecharge
        ? {
            vi: "Mẹo tối ưu ngân sách nạp: Sự kiện này thuần nạp tiền/mua gói không có đạo cụ tích trữ. Nếu bạn không dư giả, hãy tiết kiệm ngân sách bằng cách nhịn mua những gói nạp lẻ kém hợp lý (pop-up 100%–150% ROI) ở các sự kiện trước đó để dồn ngân sách sang mua gói hiện tại nhằm nhận kép cả thưởng gói lẫn mốc tích nạp sự kiện.",
            en: "Budget Optimization Tip: This is a pure recharge/pack event with no hoardable tokens. If you are on a tight budget, skip low-efficiency pop-up bundles (100%–150% ROI) in prior events and concentrate your budget into this event's high-ROI packs to double-dip both pack contents and cumulative recharge milestones.",
          }
        : undefined,
    },
    section6ProMechanics: proMechanics,
    section6Takeaway: {
      vi: `👉 Nguyên tắc sống còn: ${proMechanics[0]?.warningNote.vi ?? record.overview.goldenRule.vi}`,
      en: `👉 Golden Execution Rule: ${proMechanics[0]?.warningNote.en ?? record.overview.goldenRule.en}`,
    },
  };
}

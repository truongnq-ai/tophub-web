import type { GuideCategory } from "../types";
import { ARTICLE_3_1_BIWEEKLY_ROTATION } from "./group-3/3.1-biweekly-rotation";
import { ARTICLE_3_2_WEEK_A_GUILD_RACE } from "./group-3/3.2-week-a-guild-race";
import { ARTICLE_3_3_WEEK_B_ARMS_RACE } from "./group-3/3.3-week-b-arms-race";
import { ARTICLE_3_4_DOUBLE_DIP_SCHEDULE } from "./group-3/3.4-double-dip-schedule";

export const GROUP_3_EVENTS_AND_CALENDAR_CATEGORY: GuideCategory = {
  order: 3,
  slug: "events",
  zoneId: "zone_events_roadmap",
  iconName: "CalendarClock",
  title: {
    vi: "Lịch Sự Kiện & Giờ Vàng Double-Dip",
    en: "Event Schedule & Double-Dip Windows",
  },
  description: {
    vi: "Lộ trình mở khóa sự kiện theo tiến độ Server (Khởi đầu Lãnh Chúa Mạnh Nhất ➔ Thi Đấu Hội liên tiếp kèm Sự kiện Vệ tinh ➔ Luân phiên Thi Đấu Hội & 6 Ngày Đua Vũ Trang GAR/KvK), Lịch Guild Rush 2 ngày và Ma trận Double-Dip / Triple-Dip 300% cho 13 nhóm vật phẩm.",
    en: "Server-progression event roadmap (Beginner Strongest Lord ➔ Consecutive Guild Race with rotating satellite events ➔ Mature Server rotation between Guild Race & 6-Day GAR/KvK), 2-Day Guild Rush schedules, and the 300% Triple-Dip Matrix for 13 item categories.",
  },
  articles: [
    ARTICLE_3_1_BIWEEKLY_ROTATION,
    ARTICLE_3_2_WEEK_A_GUILD_RACE,
    ARTICLE_3_3_WEEK_B_ARMS_RACE,
    ARTICLE_3_4_DOUBLE_DIP_SCHEDULE,
  ],
};

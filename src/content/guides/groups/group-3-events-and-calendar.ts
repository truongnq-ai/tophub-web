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
    vi: "2 Pha tiến hóa lịch máy chủ, Chu kỳ 14 ngày Tuần A (Thi Đấu Hội & Pre-cooking 10 phút) ⇄ Tuần B (6 ngày GAR/KvK & Lính Bậc Thang), Lịch Guild Rush 2 ngày và Ma trận Double-Dip / Triple-Dip 300% cho 13 nhóm vật phẩm.",
    en: "2-Phase server calendar evolution, 14-day Week A (Guild Race & 10-min Pre-cooking) ⇄ Week B (6-day GAR/KvK & Staircase Promotion) rotation, Fixed 2-Day Guild Rush, and the 300% Triple-Dip Matrix for 13 item categories.",
  },
  articles: [
    ARTICLE_3_1_BIWEEKLY_ROTATION,
    ARTICLE_3_2_WEEK_A_GUILD_RACE,
    ARTICLE_3_3_WEEK_B_ARMS_RACE,
    ARTICLE_3_4_DOUBLE_DIP_SCHEDULE,
  ],
};

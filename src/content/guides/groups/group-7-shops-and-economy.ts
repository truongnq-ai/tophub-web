import type { GuideCategory } from "../types";
import { ARTICLE_7_1_SHOPS_TIER_LIST } from "./group-7/7.1-shops-tier-list";
import { ARTICLE_7_2_GUILD_HONOR_FREEZE } from "./group-7/7.2-guild-honor-freeze";
import { ARTICLE_7_3_EXCHANGE_AND_VIP_SHOPS } from "./group-7/7.3-exchange-and-vip-shops";
import { ARTICLE_7_4_TROOP_SKINS_AND_MEDALS } from "./group-7/7.4-troop-skins-and-medals";

export const GROUP_7_SHOPS_AND_ECONOMY_CATEGORY: GuideCategory = {
  order: 7,
  slug: "economy",
  zoneId: "zone_systems_economy",
  iconName: "ShoppingBag",
  title: {
    vi: "Tiệm Mua Sắm, Tiền Tệ & Quân Trang",
    en: "Shops Priority, Currencies & Troop Skins",
  },
  description: {
    vi: "Bảng xếp hạng ROI 13 nhóm Tiệm mua sắm & Quỹ dự phòng an toàn tuần, Kỷ luật đóng băng Điểm Vinh Dự / Xu Vinh Quang Bang Hội cho 9 Đá Linh Hồn Thức tỉnh (Bậc I–IV), lộ trình mở khóa Tiệm Đổi Mảnh (15★ = 500–1,000 mảnh) & bảng điểm VIP 1–20, cùng ma trận 34 mốc Huy Chương Vinh Quang nâng Ngoại hình Quân lính (Lv.1–50 & Honor Lv.150).",
    en: "Complete 13-Shop ROI tier list & weekly currency safety floors, Guild Honor / Guild Coin freeze strategy for 9 Soul Stones (Awakening Tiers I–IV), Hero Shard Exchange Shop unlock (15★ = 500–1,000 shards) & VIP 1–20 progression tables, and 34-level Glory Medal matrix for Troop Skins (Lv.1–50 & Honor Lv.150).",
  },
  articles: [
    ARTICLE_7_1_SHOPS_TIER_LIST,
    ARTICLE_7_2_GUILD_HONOR_FREEZE,
    ARTICLE_7_3_EXCHANGE_AND_VIP_SHOPS,
    ARTICLE_7_4_TROOP_SKINS_AND_MEDALS,
  ],
};

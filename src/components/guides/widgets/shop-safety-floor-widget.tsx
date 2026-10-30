"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import {
  AlertOctagon,
  CheckCircle2,
  Coins,
  ExternalLink,
  Lock,
  ShieldAlert,
  ShoppingBag,
  TrendingUp,
} from "lucide-react";
import type {
  GameAssetEntry,
  GuideArticle,
  GuideLocale,
  GuideTableBlock,
} from "@/content/guides/types";
import { ARTICLE_7_1_SHOPS_TIER_LIST } from "@/content/guides/groups/group-7/7.1-shops-tier-list";
import { useUidSession } from "@/hooks/use-uid-session";
import { RichGuideText } from "@/components/guides/blocks/rich-guide-text";
import { GameAssetFrame } from "@/components/guides/media/game-asset-frame";
import {
  getAssetById,
  resolveEntityFromTableCell,
} from "@/content/guides/asset-registry";

export interface ShopSafetyFloorWidgetProps {
  article?: GuideArticle;
  locale?: GuideLocale;
  forceUnlockPro?: boolean;
}

type ShopArchCategory = "all" | "static" | "evolving" | "event";

interface ParsedShopRow {
  shopNumber: number;
  shopName: string;
  currencySource: string;
  architectureTier: string;
  resetCycle: string;
  supremeTarget: string;
  archCategory: "static" | "evolving" | "event";
}

interface ParsedRoiItem {
  tier: string;
  itemName: string;
  shopSource: string;
  costAndCap: string;
  diamondValue: string;
  roiDirective: string;
  bucket: "must_sweep" | "surplus" | "forbidden";
}

const CONSOLIDATED_IDS = [
  "sub-1-2-thirteen-shops-master-map",
  "sub-4-1-diamond-equivalent-roi-matrix",
] as const;

const SHOP_CURRENCY_ICON_BY_NUMBER: Record<number, string> = {
  1: "shop-arena-star",
  2: "shop-guild-point",
  3: "shop-valor-coin",
  4: "shop-clash-coin",
  5: "item-guild-honor",
  6: "item-diamond",
  7: "item-universal-shard",
  8: "event-fortune-wheel",
  9: "event-dice-of-fate",
  10: "item-glory-medal",
  11: "item-kingdom-emblem",
  12: "item-invasion-coin",
  13: "item-decor-token",
};

function resolveShopItemAsset(
  itemName: string,
  bucket: "must_sweep" | "surplus" | "forbidden"
): GameAssetEntry | undefined {
  const lower = itemName.toLowerCase();
  if (
    /guardian skin|trang phục tướng|trang phục bảo vệ|ngoại hình quân lính|quân trang|troop skin/.test(
      lower
    )
  ) {
    return getAssetById("troop-skin-samurai");
  }
  if (/recruit|chiêu mộ/.test(lower)) {
    return getAssetById("item-recruit-token");
  }
  if (/diamond|kim cương|kc\b/.test(lower)) {
    return getAssetById("item-diamond");
  }
  if (/soul stone|hồn đá|đá linh hồn/.test(lower)) {
    return getAssetById("item-soul-stone");
  }
  if (/vip/.test(lower)) {
    return getAssetById("item-vip-points");
  }
  if (/stamina|thể lực/.test(lower)) {
    return getAssetById("item-stamina-potion");
  }
  if (/shield|khiên|teleport|relocat|dịch chuyển/.test(lower)) {
    return getAssetById("item-peace-shield");
  }
  if (/exclusive|vũ khí độc quyền|vũ khí chuyên dụng/.test(lower)) {
    return getAssetById("gear-exclusive-weapon");
  }
  if (/orichalcum|bản vẽ/.test(lower)) {
    return getAssetById("item-lord-orichalcum");
  }
  if (/dragon essence|tinh chất rồng|tinh hoa rồng/.test(lower)) {
    return getAssetById("item-dragon-essence");
  }
  if (/dragon blood|máu rồng/.test(lower)) {
    return getAssetById("item-lord-dragon-blood");
  }
  if (/promotion|đá thăng cấp|đá đột phá/.test(lower)) {
    return getAssetById("item-promotion-stone");
  }
  if (/decor|trang trí|nội thất/.test(lower)) {
    return getAssetById("item-decor-token");
  }
  if (/speed|tăng tốc/.test(lower)) {
    return getAssetById("item-speedup");
  }
  if (/pet food|thức ăn thú cưng|lương thực thú cưng/.test(lower)) {
    return getAssetById("item-pet-food");
  }
  if (/pet|thú cưng/.test(lower)) {
    return getAssetById("item-pet-essence");
  }
  if (/relic|thánh vật/.test(lower)) {
    return getAssetById("relic-eternal-wings");
  }
  if (/book|sách/.test(lower)) {
    return getAssetById("item-skill-book");
  }
  if (/meat|wood|stone|ruby|rubies|thịt|gỗ|hồng ngọc/.test(lower)) {
    return getAssetById("item-ruby");
  }
  if (/shard|mảnh/.test(lower)) {
    return getAssetById("item-universal-shard");
  }

  const direct = resolveEntityFromTableCell(itemName);
  if (direct) return direct;

  if (bucket === "must_sweep") return getAssetById("item-universal-shard");
  if (bucket === "surplus") return getAssetById("item-speedup");
  return getAssetById("item-ruby");
}

const SHOP_SAFETY_FLOORS: Record<
  number,
  {
    floorBadge: { vi: string; en: string };
    floorDetail: { vi: string; en: string };
    surplusRule: { vi: string; en: string };
    forbiddenTrap: { vi: string; en: string };
    roiKeywords: string[];
  }
> = {
  1: {
    floorBadge: {
      vi: "Đáy Ví An Toàn: 1,900–2,000 Sao Đấu Trường (Arena Stars)",
      en: "Weekly Safety Floor: 1,900–2,000 Arena Stars",
    },
    floorDetail: {
      vi: "Khóa cứng 1,900–2,000 Sao Đấu Trường (Arena Stars) trước 00:00 UTC Thứ Hai (07:00 sáng Giờ VN) để vét ngay gói 300 KC (50 Sao, ROI 600%), Lệnh Chiêu Mộ Giảm Giá (50 Sao, ROI 300%), gói 300 KC định mức (300 Sao) và 5 Mảnh Tướng Vàng Hệ Chính (1,500 Sao: Hồn Pháp Sư / Soulmancer, Thuật Sĩ / Warlock, Hoả Pháp Sư / Pyromancer, Thẩm Phán Quan / Adjudicator, Hồ Tiên / Pixie).",
      en: "Lock 1,900–2,000 Arena Stars before Monday 00:00 UTC to immediately sweep the 300-Diamond Super Pack (50 Stars, 600% ROI), Recruitment Token (50 Stars, 300% ROI), standard 300-Diamond pack (300 Stars), and 5x Main-Faction Legendary Shards (1,500 Stars: Soulmancer, Warlock, Pyromancer, Adjudicator, Pixie).",
    },
    surplusRule: {
      vi: "Chỉ dùng phần thặng dư vượt trên 2,000 Sao để mua Rương Trang Trí Huyền Thoại / Sử Thi Tự Chọn (2,500 Sao) hoặc Đá Thăng Cấp Trang Bị (Promotion Stone) khi thiếu mảnh kích Set.",
      en: "Only spend surplus above 2,000 Stars on Epic Decoration Choice Chests (2,500 Stars) or Promotion Stones to finish a Decor Set.",
    },
    forbiddenTrap: {
      vi: "CẤM MUA Trang Phục Bảo Vệ Tướng (Hero Guardian Skin) giá 12,000 Sao (= 40 mảnh Tướng Vàng), vé giá gốc 300 Sao và mảnh lẻ 800 Sao!",
      en: "NEVER buy the 12,000-Star Guardian Skin (= 40 Legendary Shards), full-price 300-Star tokens, or 800-Star single shards!",
    },
    roiKeywords: ["Tiệm Đấu Trường", "Arena Shop", "Mọi Cửa Hàng", "All Shops"],
  },
  2: {
    floorBadge: {
      vi: "Đáy Ví An Toàn: 12,000–15,000 Điểm Bang Hội (Guild Points)",
      en: "Weekly Safety Floor: 12,000–15,000 Guild Points",
    },
    floorDetail: {
      vi: "Giữ sàn 12,000–15,000 Điểm Bang Hội (Guild Points) để luôn mua đủ Điểm VIP (VIP Points — 1,000 Điểm/tuần = ROI Vô Cực), Bình Thể Lực (Stamina Potion 25 — 800 Điểm, cất kho xả Thứ Tư Kỳ GAR/KvK) và Khiên Hòa Bình (Peace Shield 8h/24h) + Dịch Chuyển Ngẫu Nhiên / Chỉ Định (Random / Targeted Teleport) bảo vệ lính ngày Thứ Bảy KvK.",
      en: "Maintain 12,000–15,000 Guild Points to sweep VIP Points (1,000 Points/week = Infinite ROI), Stamina Potions (800 Points for Wednesday of GAR/KvK), and 8h/24h Peace Shields + Random / Targeted Teleports for Saturday KvK.",
    },
    surplusRule: {
      vi: "Khi số dư > 15,000 Điểm Bang Hội (Guild Points), mua thêm Vật Phẩm Tăng Tốc (Speed-ups) Xây dựng / Nghiên cứu 60m (2,000 Điểm).",
      en: "When balance exceeds 15,000 Guild Points, buy 60m Construction / Research Speed-ups (2,000 Points).",
    },
    forbiddenTrap: {
      vi: "Cấm xả cạn Điểm Bang Hội (Guild Points) trước ngày Thứ Bảy KvK khiến phải tốn 100–1,000 Kim Cương mua Khiên Hòa Bình khẩn cấp!",
      en: "Never zero out Guild Points before Saturday KvK and waste 100–1,000 Diamonds on emergency Shields!",
    },
    roiKeywords: [
      "Tiệm Bang Hội",
      "Guild Shop",
      "Guild Points Shop",
      "Mọi Cửa Hàng",
      "All Shops",
    ],
  },
  3: {
    floorBadge: {
      vi: "Ưu Tiên Tiệm Công Huân: Mảnh Anh Hùng Huyền Thoại Vạn Năng & Quặng Orichalcum",
      en: "Valor Shop Priority: Discounted Universal Shards & Orichalcum",
    },
    floorDetail: {
      vi: "Dồn 100% Xu Công Huân (Valor Coins) mua các bậc giảm giá Mảnh Anh Hùng Huyền Thoại Vạn Năng (Universal Legendary Hero Shard — 30/64/80 Xu), Mảnh Vũ Khí Độc Quyền Vạn Năng và Quặng Orichalcum (Orichalcum).",
      en: "Funnel 100% of Valor Coins into discounted Universal Legendary Hero Shards (30/64/80 Coins), Exclusive Gear Shards, and Orichalcum.",
    },
    surplusRule: {
      vi: "Mua thêm Chỉ Phép (Magic Thread) / Thép Tinh Luyện (Refined Metal) khi đã vét hết Mảnh Anh Hùng Huyền Thoại Vạn Năng và Quặng Orichalcum tuần.",
      en: "Buy Magic Thread / Refined Metal after sweeping weekly Universal Shards and Orichalcum.",
    },
    forbiddenTrap: {
      vi: "Cấm đốt Xu Công Huân (Valor Coins) vào Thịt / Gỗ / Đá / Hồng Ngọc (Ruby) cày miễn phí trên bản đồ!",
      en: "Never burn Valor Coins on farmable Meat / Wood / Stone / Rubies!",
    },
    roiKeywords: [
      "Tiệm Công Huân",
      "Valor Shop",
      "Combat Valor",
      "Mọi Cửa Hàng",
      "All Shops",
    ],
  },
  4: {
    floorBadge: {
      vi: "Ưu Tiên Tiệm Chiến Trường: Vũ Khí Độc Quyền Vạn Năng & Đá Thăng Cấp Trang Bị",
      en: "Battlefield / Clash Priority: Universal Exclusive Gear Shards & Promotion Stones",
    },
    floorDetail: {
      vi: "Tập trung Xu Chiến Trường (Clash Coins) cho Mảnh Vũ Khí Độc Quyền Vạn Năng (đột phá UW Lv.10 & Lv.20) và Đá Thăng Cấp Trang Bị (Promotion Stone).",
      en: "Focus Clash Coins on Universal Exclusive Gear Shards (for UW Lv.10 & Lv.20 breakthroughs) and Gear Promotion Stones.",
    },
    surplusRule: {
      vi: "Mua thêm Tinh Chất Thú Cưng (Pet Essence) và Quặng Orichalcum (Orichalcum) khi dư Xu Chiến Trường.",
      en: "Purchase Pet Essence and Orichalcum with remaining surplus.",
    },
    forbiddenTrap: {
      vi: "Cấm mua tài nguyên thô hoặc rương trang bị phẩm chất thấp!",
      en: "Never buy raw resources or low-rarity gear chests!",
    },
    roiKeywords: [
      "Tiệm Chiến Trường",
      "Battlefield",
      "Clash Shop",
      "4 Nations",
      "Citadel Clash",
      "Mọi Cửa Hàng",
      "All Shops",
    ],
  },
  5: {
    floorBadge: {
      vi: "Đáy Ví An Toàn: 40,000 Điểm Vinh Dự / 6,000 Xu Vinh Quang Bang (Đá Linh Hồn / Soul Stone)",
      en: "Safety Floor: 40,000 Guild Honor / 6,000 Guild Glory Coins (Soul Stone)",
    },
    floorDetail: {
      vi: "Khóa chặt 40,000 Điểm Vinh Dự Bang / viên (tổng 360,000 Điểm cho 9 viên ở Lâu Đài Lv.30) hoặc 6,000 Xu Vinh Quang Bang (Guild Glory Coins) / viên (tổng 54,000 Xu cho 9 viên xoay tua 3 tuần S1: League ➔ Horde ➔ Nature) để mua Đá Linh Hồn (Hồn Đá Đỏ / Soul Stone) thức tỉnh Hồn Pháp Sư (Soulmancer), Thuật Sĩ (Warlock), Hoả Pháp Sư (Pyromancer), Thẩm Phán Quan (Adjudicator), Hồ Tiên (Pixie).",
      en: "Lock 40,000 Guild Honor per stone (360,000 Honor for 9 stones at Castle Lv.30) or 6,000 Guild Glory Coins per stone (54,000 Coins for 9 stones on 3-week S1 rotation: League ➔ Horde ➔ Nature) to buy Soul Stones and awaken Soulmancer, Warlock, Pyromancer, Adjudicator, and Pixie.",
    },
    surplusRule: {
      vi: "Sau khi mua xong Đá Linh Hồn (Hồn Đá Đỏ / Soul Stone) trong tuần, dùng phần dư mua Mảnh Vũ Khí Độc Quyền Vạn Năng.",
      en: "After securing the weekly Soul Stone, spend surplus on Universal Exclusive Gear Shards.",
    },
    forbiddenTrap: {
      vi: "Cấm tiêu sạch Điểm Vinh Dự / Xu Vinh Quang Bang vào đạo cụ lặt vặt trước khi Lâu Đài đạt Lv.30 & bước vào S1!",
      en: "Never drain Guild Honor / Guild Glory Coins on minor items before Castle Lv.30 & Season 1!",
    },
    roiKeywords: [
      "Tiệm Vinh Quang Bang",
      "Guild Honor",
      "Guild Coin",
      "Mọi Cửa Hàng",
      "All Shops",
    ],
  },
  6: {
    floorBadge: {
      vi: "Đáy Ví Kim Cương: Giữ Quỹ 15,000–32,000+ Kim Cương (Diamonds) Cho Vòng Quay & Xúc Xắc",
      en: "Diamond Reserve: Keep 15,000–32,000+ Diamonds for Wheel & Dice",
    },
    floorDetail: {
      vi: "Trong Tiệm VIP & Cửa Hàng Hàng Ngày (VIP & Daily Shop), chỉ mua Mảnh Anh Hùng Huyền Thoại Vạn Năng (Universal Legendary Hero Shard) giảm giá sâu (150–240 KC) và Bình Thể Lực (Stamina Potion 25) giảm giá.",
      en: "In VIP & Daily Shop, only buy deeply discounted Universal Legendary Hero Shards (150–240 Diamonds) and Stamina Potions.",
    },
    surplusRule: {
      vi: "Mua thêm Sách Kỹ Năng Cam và Đá Cường Hóa giảm giá sâu nếu quỹ Kim Cương (Diamonds) vượt trên 32,000 KC.",
      en: "Buy discounted Legendary Skill Books and Enhancement Runes only if Diamonds exceed 32,000.",
    },
    forbiddenTrap: {
      vi: "Cấm mua Điểm VIP nguyên giá hoặc quay Quán Rượu bằng Kim Cương lẻ!",
      en: "Never buy full-price Diamond items or pull regular Tavern banners with raw Diamonds!",
    },
    roiKeywords: [
      "Tiệm VIP",
      "VIP & Daily Shop",
      "VIP Shop",
      "Mọi Cửa Hàng",
      "All Shops",
    ],
  },
  7: {
    floorBadge: {
      vi: "Mốc Mở Khóa: 12 Sao (Trait 3 +30%) vs 15 Sao (500 Mảnh Kỵ Sĩ / Knight Mở Exchange Shop)",
      en: "Unlock Rule: 12-Star (Trait 3 +30%) vs 15-Star (500 Knight / 1,000 Shards Exchange Unlock)",
    },
    floorDetail: {
      vi: "Phân biệt rõ: Tướng Tím Kinh tế dừng ở 12 Sao (2 Sao Trắng) để mở Trait 3 (+30% xây dựng/nghiên cứu), còn phải đẩy tối đa 1 tướng lên 15 Sao (5 Sao Trắng/Bạc = 500 Mảnh Kỵ Sĩ (Knight) hoặc 1,000 Mảnh Tím/Vàng) mới mở khóa Tiệm Đổi Mảnh Tướng (Hero Exchange Shop) sử dụng Mảnh Tướng Dư (Excess Hero Shards)!",
      en: "Distinguish clearly: Economy Epic heroes stop at 12 Stars (2 White Stars) for Trait 3 (+30% speed), whereas maxing 1 hero to 15 Stars (5 White/Silver Stars = 500 Knight Shards or 1,000 Epic/Legendary Shards) unlocks the Hero Exchange Shop for Excess Hero Shards!",
    },
    surplusRule: {
      vi: "Dùng Mảnh Tướng Dư (Excess Hero Shards) 15 Sao đổi Mảnh Anh Hùng Huyền Thoại Vạn Năng (Universal Legendary Hero Shard) và Mảnh Tím Vạn Năng hàng tuần.",
      en: "Exchange excess 15-Star shards for Universal Legendary and Epic Shards weekly.",
    },
    forbiddenTrap: {
      vi: "Cấm dừng tất cả tướng ở 12 Sao khiến không bao giờ mở được Tiệm Đổi Mảnh Tướng!",
      en: "Never stop every single hero at 12 Stars and lock yourself out of the Hero Exchange Shop!",
    },
    roiKeywords: [
      "Tiệm Đổi Mảnh",
      "Hero Exchange",
      "Exchange Shop",
      "Mọi Cửa Hàng",
      "All Shops",
    ],
  },
  8: {
    floorBadge: {
      vi: "Bảo Lưu Xu Vòng Quay (Wheel Coins Carry Over): Tích Đủ Mốc Đổi Tướng Đỏ & UW",
      en: "Wheel Coins Carry Over: Bank for Mythic Hero & Exclusive Weapon Chests",
    },
    floorDetail: {
      vi: "Xu Vòng Quay (Wheel Coins) trong Tiệm Vòng Quay & Sự Kiện Xu (Wheel & Coin Shop) được bảo lưu qua các kỳ 3 tuần/lần; chỉ đổi Rương Tướng Đỏ (Mythic Hero) và Rương Vũ Khí Độc Quyền Hệ Chính.",
      en: "Wheel Coins in the Wheel & Coin Shop carry over across 3-week cycles; redeem strictly for Main-Faction Mythic Hero and Exclusive Weapon Chests.",
    },
    surplusRule: {
      vi: "Giữ Xu Vòng Quay (Wheel Coins) chờ đúng kỳ Vòng Quay của Hệ Chính (Bộ Lạc / Thiên Nhiên / Liên Minh).",
      en: "Hold Wheel Coins until your Main Faction rotation arrives.",
    },
    forbiddenTrap: {
      vi: "Cấm tiêu lẻ Xu Vòng Quay vào Đá Cường Hóa hay Rương Tài Nguyên!",
      en: "Never spend Wheel Coins on enhancement stones or resource chests!",
    },
    roiKeywords: [
      "Tiệm Vòng Quay",
      "Wheel & Coin",
      "Wheel",
      "Mọi Cửa Hàng",
      "All Shops",
    ],
  },
  9: {
    floorBadge: {
      vi: "Bảo Lưu Vé Xúc Xắc (Dice Vouchers Carry Over): Đổi Đá Linh Hồn & Tướng Đỏ",
      en: "Dice Vouchers Carry Over: Redeem Soul Stones & Mythic Heroes",
    },
    floorDetail: {
      vi: "Vé Xúc Xắc (Dice Vouchers) tại Tiệm Xúc Xắc (Dice Event Shop) không mất đi khi hết sự kiện; tích lũy đổi Rương Tự Chọn Đá Linh Hồn (Hồn Đá Đỏ / Soul Stone) / Tướng Đỏ và Trang Trí Huyền Thoại (Legendary Decorations).",
      en: "Dice Vouchers in the Dice Event Shop persist across events; save for Soul Stone / Mythic Hero Choice Chests and Legendary Decorations.",
    },
    surplusRule: {
      vi: "Mua mảnh Trang Trí Huyền Thoại / Sử Thi (Legendary / Epic Decorations) hoàn thiện bộ sưu tập cộng % ATK/HP toàn quân.",
      en: "Redeem Legendary / Epic Decoration pieces that complete global % ATK/HP set bonuses.",
    },
    forbiddenTrap: {
      vi: "Cấm xả sạch Vé Xúc Xắc (Dice Vouchers) vào vật phẩm tiêu hao ngắn hạn!",
      en: "Never dump Dice Vouchers on short-term consumables!",
    },
    roiKeywords: [
      "Tiệm Xúc Xắc",
      "Dice Event",
      "Dice of Fate",
      "Dice",
      "Mọi Cửa Hàng",
      "All Shops",
    ],
  },
  10: {
    floorBadge: {
      vi: "Đáy Ví Huy Chương: 15,000–30,000 Huy Chương Vinh Quang (Glory Medals) Mở Quân Trang",
      en: "Medal Floor: 15,000–30,000 Glory Medals for First-Time Troop Skins",
    },
    floorDetail: {
      vi: "Ưu tiên số 1 tại Tiệm Huy Chương Vinh Quang (Glory Medal Shop) là mở khóa lần đầu Ngoại Hình Quân Lính (Quân Trang / Troop Skins) Tím / Xanh (30,000 / 15,000 Glory Medals) để nhận buff chỉ số sở hữu vĩnh viễn cho toàn tài khoản.",
      en: "Priority #1 in Glory Medal Shop is unlocking Epic / Rare Troop Skins for the first time (30,000 / 15,000 Glory Medals) for permanent account-wide ownership stats.",
    },
    surplusRule: {
      vi: "Sau khi mở khóa các Ngoại Hình Quân Lính (Quân Trang / Troop Skins) cơ bản, dùng thặng dư mua Vật Phẩm Tăng Tốc (Speed-ups) 60m.",
      en: "After unlocking core Troop Skins, spend surplus on 60m Speed-ups.",
    },
    forbiddenTrap: {
      vi: "Cấm mua lặp lại mảnh Skin đã tối đa hoặc đổi tài nguyên thô!",
      en: "Never over-buy maxed skin fragments or raw resources!",
    },
    roiKeywords: [
      "Tiệm Huy Chương",
      "Glory Medal",
      "Medal Shop",
      "Mọi Cửa Hàng",
      "All Shops",
    ],
  },
  11: {
    floorBadge: {
      vi: "Ưu Tiên Biểu Tượng Vương Quốc (KvK / S1+): Máu Rồng (Dragon Blood) & Tinh Chất Rồng",
      en: "Kingdom Emblem Priority: Dragon Blood, Dragon Essence & Exclusive Shards",
    },
    floorDetail: {
      vi: "Biểu Tượng Vương Quốc (Kingdom Emblems) tại Tiệm Biểu Tượng Vương Quốc (Kingdom Emblem Shop) là nguồn cung cấp độc quyền Máu Rồng (Dragon Blood), Tinh Chất Rồng (Dragon Essence) và Mảnh Vũ Khí Độc Quyền Vạn Năng.",
      en: "Kingdom Emblems in the Kingdom Emblem Shop are the primary bottleneck source for Dragon Blood, Dragon Essence, and Universal Exclusive Gear Shards.",
    },
    surplusRule: {
      vi: "Mua thêm Quặng Orichalcum (Orichalcum) khi đã vét hết giới hạn Máu Rồng và Vũ Khí Độc Quyền.",
      en: "Buy Orichalcum after capping Dragon Blood and Exclusive Gear Shards.",
    },
    forbiddenTrap: {
      vi: "Cấm đổi Biểu Tượng Vương Quốc lấy Vật Phẩm Tăng Tốc thường hoặc Gỗ/Đá!",
      en: "Never trade Kingdom Emblems for regular speed-ups or Wood/Stone!",
    },
    roiKeywords: [
      "Tiệm Biểu Tượng",
      "Kingdom Emblem",
      "Mọi Cửa Hàng",
      "All Shops",
    ],
  },
  12: {
    floorBadge: {
      vi: "Ưu Tiên Tiệm Điểm Xâm Lược: Mảnh Thánh Vật Vàng & Mảnh Anh Hùng Huyền Thoại Vạn Năng",
      en: "Invasion Shop Priority: Legendary Relic Shards & Universal Hero Shards",
    },
    floorDetail: {
      vi: "Dồn Xu Xâm Lược (Invasion Coins) tại Tiệm Điểm Xâm Lược (Invasion Shop) mua Mảnh Thánh Vật Vàng (Legendary Relic Shards) và Mảnh Anh Hùng Huyền Thoại Vạn Năng (Universal Legendary Hero Shard).",
      en: "Spend Invasion Coins strictly on Legendary Relic Shards and Universal Legendary Hero Shards.",
    },
    surplusRule: {
      vi: "Mua Cuộn Kinh Nghiệm Thánh Vật (Relic EXP Scrolls) khi còn dư Xu Xâm Lược.",
      en: "Buy Relic EXP Scrolls with leftover Invasion Coins.",
    },
    forbiddenTrap: {
      vi: "Cấm mua mảnh Thánh Vật Xanh/Tím dễ kiếm từ hầm ngục thường!",
      en: "Never buy Blue/Purple Relic shards that drop freely in dungeons!",
    },
    roiKeywords: [
      "Tiệm Điểm Xâm Lược",
      "Invasion Shop",
      "Invasion",
      "Black Dragon",
      "Mọi Cửa Hàng",
      "All Shops",
    ],
  },
  13: {
    floorBadge: {
      vi: "Ưu Tiên Tiệm Xu Trang Trí: Kích Hoạt Trọn Bộ Sưu Tập (Decor Set Bonus)",
      en: "Decoration Token Priority: Complete Unowned Decor Set Bonuses",
    },
    floorDetail: {
      vi: "Chỉ dùng Xu Trang Trí (Decor Tokens) tại Tiệm Xu Trang Trí (Decoration Token Shop) mua các món Trang Trí Huyền Thoại / Sử Thi (Legendary / Epic Decorations) chưa sở hữu để kích hoạt mốc thưởng Bộ Sưu Tập (Set Bonus +ATK/+HP/+March Size).",
      en: "Spend Decor Tokens in the Decoration Token Shop strictly on unowned Legendary / Epic Decorations to activate full Decor Set Bonuses (+ATK/+HP/+March Size).",
    },
    surplusRule: {
      vi: "Nâng bậc các bộ Trang Trí Huyền Thoại / Sử Thi cộng Tốc độ Xây dựng / Nghiên cứu hoặc HP Đội 1.",
      en: "Upgrade Legendary / Epic Decor Sets granting Construction/Research speed or Queue 1 HP.",
    },
    forbiddenTrap: {
      vi: "Cấm nâng cấp trùng lặp một món trang trí lẻ khi chưa mở khóa đủ bộ!",
      en: "Never upgrade duplicate single decorations before completing full sets!",
    },
    roiKeywords: [
      "Tiệm Xu Trang Trí",
      "Decoration Token",
      "Decor",
      "Mọi Cửa Hàng",
      "All Shops",
    ],
  },
};

function detectArchCategory(tierText: string): "static" | "evolving" | "event" {
  if (/Static|Fixed|Tĩnh|Cố định/i.test(tierText)) return "static";
  if (/Event|Sự kiện/i.test(tierText)) return "event";
  return "evolving";
}

function detectRoiBucket(
  tierText: string
): "must_sweep" | "surplus" | "forbidden" {
  if (/^S\+|^S\b|Must-Buy|Core Buy/i.test(tierText)) return "must_sweep";
  if (/^F\b|Trap|Cấm/i.test(tierText)) return "forbidden";
  return "surplus";
}

export function ShopSafetyFloorWidget({
  article,
  locale = "vi",
  forceUnlockPro = false,
}: ShopSafetyFloorWidgetProps) {
  const t = useTranslations("Guides");
  const { activeAccount } = useUidSession();
  const isLockEnabled =
    process.env.NEXT_PUBLIC_ENABLE_PRO_CONTENT_LOCK === "true";
  const hasProAccess =
    forceUnlockPro || !isLockEnabled || activeAccount?.active_plan === "PRO";

  const sourceArticle =
    article?.slug === "shops-tier-list" ? article : ARTICLE_7_1_SHOPS_TIER_LIST;

  const [archFilter, setArchFilter] = useState<ShopArchCategory>("all");
  const [activeShopNumber, setActiveShopNumber] = useState<number>(1);

  const shops = useMemo<ParsedShopRow[]>(() => {
    const allSections = [
      ...(sourceArticle.freeSections ?? []),
      ...(sourceArticle.proSections ?? []),
    ];
    const overviewSec = allSections.find(
      (sec) => sec.id === "overview-and-mechanics"
    );
    const mapSub = overviewSec?.subSections?.find(
      (sub) => sub.id === "sub-1-2-thirteen-shops-master-map"
    );
    const tableBlock = mapSub?.blocks.find(
      (b): b is GuideTableBlock => b.type === "table"
    );
    if (!tableBlock) return [];

    return tableBlock.rows.map((row, idx) => {
      const shopNumber = Number(row[0]?.[locale] ?? idx + 1) || idx + 1;
      const architectureTier = row[3]?.[locale] ?? "";
      return {
        shopNumber,
        shopName: row[1]?.[locale] ?? `Shop #${shopNumber}`,
        currencySource: row[2]?.[locale] ?? "",
        architectureTier,
        resetCycle: row[4]?.[locale] ?? "",
        supremeTarget: row[5]?.[locale] ?? "",
        archCategory: detectArchCategory(architectureTier),
      };
    });
  }, [sourceArticle, locale]);

  const roiItems = useMemo<ParsedRoiItem[]>(() => {
    const allSections = [
      ...(sourceArticle.freeSections ?? []),
      ...(sourceArticle.proSections ?? []),
    ];
    const proSec = allSections.find(
      (sec) => sec.id === "pro-data-and-benchmarks"
    );
    const roiSub = proSec?.subSections?.find(
      (sub) => sub.id === "sub-4-1-diamond-equivalent-roi-matrix"
    );
    const tableBlock = roiSub?.blocks.find(
      (b): b is GuideTableBlock => b.type === "table"
    );
    if (!tableBlock) return [];

    return tableBlock.rows.map((row) => {
      const tier = row[0]?.[locale] ?? "";
      return {
        tier,
        itemName: row[1]?.[locale] ?? "",
        shopSource: row[2]?.[locale] ?? "",
        costAndCap: row[3]?.[locale] ?? "",
        diamondValue: row[4]?.[locale] ?? "",
        roiDirective: row[5]?.[locale] ?? "",
        bucket: detectRoiBucket(tier),
      };
    });
  }, [sourceArticle, locale]);

  useEffect(() => {
    const handleTocNavigate = (event: Event) => {
      const customEvent = event as CustomEvent<{ targetId?: string }>;
      const targetId = customEvent.detail?.targetId;
      if (targetId === "sub-2-1-arena-shop-priority") {
        setActiveShopNumber(1);
      } else if (targetId === "sub-2-2-guild-points-and-battlefield-shops") {
        setActiveShopNumber(2);
      } else if (targetId === "sub-4-1-diamond-equivalent-roi-matrix") {
        setActiveShopNumber(1);
      }
    };
    window.addEventListener("tophub:toc-navigate", handleTocNavigate);
    return () => {
      window.removeEventListener("tophub:toc-navigate", handleTocNavigate);
    };
  }, []);

  const visibleShops = useMemo(() => {
    if (archFilter === "all") return shops;
    return shops.filter((s) => s.archCategory === archFilter);
  }, [shops, archFilter]);

  const activeShop =
    shops.find((s) => s.shopNumber === activeShopNumber) ?? shops[0];
  const activeFloorMeta =
    SHOP_SAFETY_FLOORS[activeShopNumber] ?? SHOP_SAFETY_FLOORS[1];
  const activeCurrencyAsset = getAssetById(
    SHOP_CURRENCY_ICON_BY_NUMBER[activeShopNumber] ?? "shop-arena-star"
  );

  const matchingRoiItems = useMemo(() => {
    const keywords = activeFloorMeta.roiKeywords;
    return roiItems.filter((item) =>
      keywords.some((kw) =>
        item.shopSource.toLowerCase().includes(kw.toLowerCase())
      )
    );
  }, [roiItems, activeFloorMeta]);

  const mustSweepItems = matchingRoiItems.filter(
    (i) => i.bucket === "must_sweep"
  );
  const surplusItems = matchingRoiItems.filter((i) => i.bucket === "surplus");
  const forbiddenItems = matchingRoiItems.filter(
    (i) => i.bucket === "forbidden"
  );

  const widgetTitleText =
    locale === "vi"
      ? t("widgetShopSafetyTitle")
      : "13 In-Game Shops • Safety Floors & Diamond Equivalent ROI";
  const widgetSubtitleText =
    locale === "vi"
      ? t("widgetShopSafetySubtitle")
      : "Interactive Safety Floor calculator and 3-bucket priority board (Must-Sweep, Surplus Only, Forbidden Traps) across all 13 Top Heroes shops.";

  return (
    <div
      data-testid="widget-shop-safety-floor"
      className="my-6 rounded-2xl border border-amber-500/30 bg-card/95 dark:bg-gradient-to-b dark:from-[#141824]/95 dark:via-[#0F131D]/95 dark:to-[#0B0E14]/95 p-3.5 sm:p-6 shadow-[0_14px_36px_rgba(0,0,0,0.45)]"
    >
      {/* Consolidated SSoT Anchor Stubs */}
      {CONSOLIDATED_IDS.map((id) => (
        <span
          key={id}
          id={id}
          data-consolidated-by-widget="true"
          className="scroll-mt-28"
          aria-hidden="true"
        />
      ))}

      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-border/75 dark:border-white/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 rounded-full border-0 bg-amber-500/15 px-3 py-1 text-xs font-sans font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-300">
            <ShoppingBag className="h-3.5 w-3.5 text-amber-400" />
            <span>
              {locale === "vi"
                ? "13 Cửa Hàng • Ngưỡng Đóng Băng Ví & Tỷ Giá Kim Cương"
                : "13 In-Game Shops • Safety Floors & Diamond ROI"}
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-heading font-bold text-foreground dark:text-white">
            {widgetTitleText}
          </h3>
          <p className="text-sm sm:text-base font-sans leading-relaxed text-muted-foreground dark:text-slate-300">
            {widgetSubtitleText}
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <Link
              href="/guides/codex?zone=economy&cat=shop-vip"
              data-testid="shop-codex-link-shops"
              className="inline-flex min-h-11 min-h-[44px] items-center gap-1.5 rounded-xl border border-amber-500/35 bg-amber-500/10 px-3.5 py-2 text-xs font-sans font-semibold text-amber-700 transition hover:bg-amber-500/20 dark:text-amber-300"
            >
              <ExternalLink className="h-3.5 w-3.5 shrink-0" />
              <span>
                {locale === "vi"
                  ? "Tra cứu Cửa Hàng & VIP (Codex)"
                  : "Shop & VIP Codex"}
              </span>
            </Link>
            <Link
              href="/guides/codex?zone=economy&cat=items"
              data-testid="shop-codex-link-items"
              className="inline-flex min-h-11 min-h-[44px] items-center gap-1.5 rounded-xl border border-border/75 bg-muted/40 px-3.5 py-2 text-xs font-sans font-semibold text-foreground/85 transition hover:bg-muted/70 dark:border-white/15 dark:bg-white/[0.04] dark:text-slate-200"
            >
              <ExternalLink className="h-3.5 w-3.5 shrink-0" />
              <span>
                {locale === "vi"
                  ? "Kho Vật Phẩm & Tiền Tệ"
                  : "Items & Currencies Codex"}
              </span>
            </Link>
          </div>
        </div>

        {/* Architecture Filter Tabs */}
        <div className="flex flex-wrap gap-1.5">
          {(
            [
              { id: "all", label: { vi: "Tất cả (13)", en: "All (13)" } },
              { id: "static", label: { vi: "Cố định (3)", en: "Static (3)" } },
              {
                id: "evolving",
                label: { vi: "Tiến hóa (7)", en: "Evolving (7)" },
              },
              { id: "event", label: { vi: "Sự kiện (3)", en: "Event (3)" } },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              data-testid={`shop-arch-filter-${tab.id}`}
              onClick={() => setArchFilter(tab.id)}
              className={`min-h-11 min-h-[44px] rounded-lg border px-3 py-1.5 text-xs font-sans font-bold transition ${
                archFilter === tab.id
                  ? "border-amber-400/60 bg-amber-500/20 text-amber-800 dark:text-amber-200"
                  : "border-border/75 dark:border-white/10 bg-muted/30 dark:bg-white/[0.03] text-muted-foreground dark:text-slate-300 hover:bg-muted/60 dark:hover:bg-white/[0.07]"
              }`}
            >
              {tab.label[locale]}
            </button>
          ))}
        </div>
      </div>

      {/* 13 Shop Selector Pills — Horizontal Snap Scroll on Mobile, Wrap on sm+ */}
      <div
        role="tablist"
        aria-label={widgetTitleText}
        className="mt-4 flex overflow-x-auto no-scrollbar snap-x gap-2 pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0"
      >
        {visibleShops.map((shop) => {
          const isActive = shop.shopNumber === activeShopNumber;
          const shortName = shop.shopName.split("(")[0].trim();
          const currencyAsset = getAssetById(
            SHOP_CURRENCY_ICON_BY_NUMBER[shop.shopNumber] ?? "shop-arena-star"
          );
          return (
            <button
              key={shop.shopNumber}
              type="button"
              role="tab"
              aria-selected={isActive}
              data-testid={`shop-pill-${shop.shopNumber}`}
              onClick={() => setActiveShopNumber(shop.shopNumber)}
              className={`snap-start shrink-0 min-h-11 min-h-[44px] inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-sans font-bold transition ${
                isActive
                  ? "border-amber-400/60 bg-amber-500/20 text-foreground dark:text-white shadow-[0_0_16px_rgba(245,158,11,0.2)]"
                  : "border-border/75 dark:border-white/10 bg-muted/30 dark:bg-white/[0.03] text-muted-foreground dark:text-slate-300 hover:border-amber-500/35 dark:hover:border-white/20 hover:bg-muted/60 dark:hover:bg-white/[0.07]"
              }`}
            >
              {currencyAsset && (
                <span
                  data-testid={`shop-pill-icon-${shop.shopNumber}`}
                  className="shrink-0"
                >
                  <GameAssetFrame
                    asset={currencyAsset}
                    size="xs"
                    showFactionBadge={false}
                  />
                </span>
              )}
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full font-mono text-xs ${
                  isActive
                    ? "bg-amber-400 text-slate-950"
                    : "bg-muted/70 dark:bg-white/10 text-muted-foreground dark:text-slate-300"
                }`}
              >
                {shop.shopNumber}
              </span>
              <span>{shortName}</span>
            </button>
          );
        })}
      </div>

      {/* Active Shop Safety Floor Banner */}
      {activeShop && (
        <div
          data-testid="shop-safety-floor-banner"
          className="mt-5 rounded-xl border-0 sm:border sm:border-amber-500/35 bg-amber-500/10 dark:bg-amber-500/[0.08] p-3.5 sm:p-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-xs font-sans font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-300">
                #{activeShop.shopNumber} • {activeShop.architectureTier} •{" "}
                {activeShop.resetCycle}
              </span>
              <h4 className="mt-0.5 text-base sm:text-lg font-heading font-bold text-foreground dark:text-white">
                {activeShop.shopName}
              </h4>
            </div>
            <span className="inline-flex items-center gap-2 rounded-lg border-0 sm:border sm:border-amber-400/40 bg-background/85 dark:bg-black/40 px-3 py-1.5 font-sans text-xs font-bold text-amber-700 dark:text-amber-300">
              {activeCurrencyAsset && (
                <span
                  data-testid="shop-floor-currency-icon"
                  className="shrink-0"
                >
                  <GameAssetFrame
                    asset={activeCurrencyAsset}
                    size="xs"
                    showFactionBadge={false}
                  />
                </span>
              )}
              <Coins className="h-3.5 w-3.5 text-amber-400" />
              {activeFloorMeta.floorBadge[locale]}
            </span>
          </div>

          <p className="mt-2.5 text-sm sm:text-base font-sans leading-relaxed text-foreground/90 dark:text-slate-200">
            {activeFloorMeta.floorDetail[locale]}
          </p>

          <div className="mt-2.5 flex flex-wrap items-center gap-2 text-xs font-sans text-muted-foreground dark:text-slate-300">
            <span className="rounded-md bg-muted/70 dark:bg-white/10 px-2.5 py-0.5 font-semibold text-amber-800 dark:text-amber-200">
              {locale === "vi" ? "Tiền tệ: " : "Currency: "}
              {activeShop.currencySource}
            </span>
            {!hasProAccess && (
              <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/20 px-2 py-0.5 font-sans text-xs font-bold text-amber-700 dark:text-amber-300">
                <Lock className="h-3 w-3" /> PRO ROI
              </span>
            )}
          </div>
        </div>
      )}

      {/* 3-Bucket Item Priority Board — Single-Layer Containment on Mobile */}
      <div className="mt-4 grid grid-cols-1 gap-3.5 lg:grid-cols-3">
        {/* Bucket 1: Must-Sweep (S+ / S) */}
        <div
          data-testid="shop-bucket-must-sweep"
          className="rounded-xl border-0 sm:border sm:border-emerald-500/30 bg-emerald-500/[0.06] p-3.5 sm:p-4"
        >
          <div className="flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>
              {locale === "vi"
                ? "🟢 Nên Vét Sạch (Must-Sweep S+ / S)"
                : "🟢 Must-Sweep (S+ / S Tier)"}
            </span>
          </div>

          {activeShop && (
            <div className="mt-2.5 rounded-xl border-0 bg-background/80 dark:bg-black/30 p-3 text-sm sm:text-base font-sans text-emerald-900 dark:text-emerald-100">
              <div className="text-xs sm:text-sm font-heading font-bold text-emerald-700 dark:text-emerald-300">
                {locale === "vi"
                  ? "👑 Mục Tiêu Số 1 SSoT:"
                  : "👑 #1 Supreme Target:"}
              </div>
              <RichGuideText
                text={activeShop.supremeTarget}
                accentColor="emerald"
                className="mt-1 text-sm sm:text-base font-sans leading-relaxed"
              />
            </div>
          )}

          <div className="mt-3 divide-y divide-border/60 dark:divide-white/10 sm:divide-y-0 sm:space-y-2.5">
            {mustSweepItems.map((item, idx) => {
              const itemAsset = resolveShopItemAsset(
                item.itemName,
                "must_sweep"
              );
              return (
                <div
                  key={idx}
                  className="border-0 bg-transparent py-3 first:pt-1 last:pb-0 sm:rounded-xl sm:bg-background/75 dark:sm:bg-black/25 sm:p-3"
                >
                  <div className="flex items-center justify-between gap-2 text-sm font-heading font-bold text-foreground dark:text-white">
                    <span className="inline-flex items-center gap-2">
                      {itemAsset && (
                        <GameAssetFrame
                          asset={itemAsset}
                          size="xs"
                          showFactionBadge={false}
                        />
                      )}
                      <span>
                        <RichGuideText
                          text={item.itemName}
                          variant="inline"
                          accentColor="emerald"
                        />
                      </span>
                    </span>
                    <span className="shrink-0 rounded-md bg-emerald-500/20 px-2 py-0.5 font-mono text-xs font-bold text-emerald-700 dark:text-emerald-300">
                      {item.tier}
                    </span>
                  </div>
                  <div className="mt-1.5 font-sans text-xs font-semibold text-amber-700 dark:text-amber-300">
                    <RichGuideText
                      text={item.costAndCap}
                      variant="inline"
                      accentColor="amber"
                    />{" "}
                    ➔{" "}
                    <RichGuideText
                      text={item.diamondValue}
                      variant="inline"
                      accentColor="amber"
                    />
                  </div>
                  <RichGuideText
                    text={item.roiDirective}
                    accentColor="emerald"
                    className="mt-1.5 text-sm sm:text-base font-sans leading-relaxed text-foreground/90 dark:text-slate-200"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Bucket 2: Surplus Only (A / B) */}
        <div
          data-testid="shop-bucket-surplus"
          className="rounded-xl border-0 sm:border sm:border-amber-500/30 bg-amber-500/[0.06] p-3.5 sm:p-4"
        >
          <div className="flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
            <TrendingUp className="h-4 w-4 text-amber-400" />
            <span>
              {locale === "vi"
                ? "🟡 Mua Khi Vượt Đáy Ví (Surplus A / B)"
                : "🟡 Buy Above Safety Floor (Surplus A / B)"}
            </span>
          </div>

          <div className="mt-2.5 rounded-xl border-0 bg-background/80 dark:bg-black/30 p-3 text-sm sm:text-base font-sans text-amber-900 dark:text-amber-100">
            <div className="text-xs sm:text-sm font-heading font-bold text-amber-700 dark:text-amber-300">
              {locale === "vi"
                ? "⚖️ Quy Tắc Chi Tiêu Thặng Dư:"
                : "⚖️ Surplus Spending Rule:"}
            </div>
            <p className="mt-1 text-sm sm:text-base font-sans leading-relaxed">
              {activeFloorMeta.surplusRule[locale]}
            </p>
          </div>

          <div className="mt-3 divide-y divide-border/60 dark:divide-white/10 sm:divide-y-0 sm:space-y-2.5">
            {surplusItems.map((item, idx) => {
              const itemAsset = resolveShopItemAsset(item.itemName, "surplus");
              return (
                <div
                  key={idx}
                  className="border-0 bg-transparent py-3 first:pt-1 last:pb-0 sm:rounded-xl sm:bg-background/75 dark:sm:bg-black/25 sm:p-3"
                >
                  <div className="flex items-center justify-between gap-2 text-sm font-heading font-bold text-foreground dark:text-white">
                    <span className="inline-flex items-center gap-2">
                      {itemAsset && (
                        <GameAssetFrame
                          asset={itemAsset}
                          size="xs"
                          showFactionBadge={false}
                        />
                      )}
                      <span>
                        <RichGuideText
                          text={item.itemName}
                          variant="inline"
                          accentColor="amber"
                        />
                      </span>
                    </span>
                    <span className="shrink-0 rounded-md bg-amber-500/20 px-2 py-0.5 font-mono text-xs font-bold text-amber-700 dark:text-amber-300">
                      {item.tier}
                    </span>
                  </div>
                  <div className="mt-1.5 font-sans text-xs font-semibold text-amber-700 dark:text-amber-300">
                    <RichGuideText
                      text={item.costAndCap}
                      variant="inline"
                      accentColor="amber"
                    />{" "}
                    ➔{" "}
                    <RichGuideText
                      text={item.diamondValue}
                      variant="inline"
                      accentColor="amber"
                    />
                  </div>
                  <RichGuideText
                    text={item.roiDirective}
                    accentColor="amber"
                    className="mt-1.5 text-sm sm:text-base font-sans leading-relaxed text-foreground/90 dark:text-slate-200"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Bucket 3: Forbidden Traps (F-Tier) */}
        <div
          data-testid="shop-bucket-forbidden"
          className="rounded-xl border-0 sm:border sm:border-rose-500/35 bg-rose-500/[0.07] p-3.5 sm:p-4"
        >
          <div className="flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-rose-700 dark:text-rose-300">
            <AlertOctagon className="h-4 w-4 text-rose-400" />
            <span>
              {locale === "vi"
                ? "🔴 Cấm Tuyệt Đối Mua (Forbidden F-Tier)"
                : "🔴 Strictly Forbidden (F-Tier Traps)"}
            </span>
          </div>

          <div className="mt-2.5 rounded-xl border-0 bg-background/80 dark:bg-black/30 p-3 text-sm sm:text-base font-sans text-rose-900 dark:text-rose-100">
            <div className="text-xs sm:text-sm font-heading font-bold text-rose-700 dark:text-rose-300">
              {locale === "vi" ? "🚫 Cạm Bẫy Đốt Ví:" : "🚫 Currency Trap:"}
            </div>
            <p className="mt-1 text-sm sm:text-base font-sans leading-relaxed">
              {activeFloorMeta.forbiddenTrap[locale]}
            </p>
          </div>

          <div className="mt-3 divide-y divide-border/60 dark:divide-white/10 sm:divide-y-0 sm:space-y-2.5">
            {forbiddenItems.map((item, idx) => {
              const itemAsset = resolveShopItemAsset(
                item.itemName,
                "forbidden"
              );
              return (
                <div
                  key={idx}
                  className="border-0 bg-transparent py-3 first:pt-1 last:pb-0 sm:rounded-xl sm:bg-background/75 dark:sm:bg-black/25 sm:p-3"
                >
                  <div className="flex items-center justify-between gap-2 text-sm font-heading font-bold text-rose-800 dark:text-rose-200">
                    <span className="inline-flex items-center gap-2">
                      {itemAsset && (
                        <GameAssetFrame
                          asset={itemAsset}
                          size="xs"
                          showFactionBadge={false}
                        />
                      )}
                      <span>
                        <RichGuideText
                          text={item.itemName}
                          variant="inline"
                          accentColor="rose"
                        />
                      </span>
                    </span>
                    <span className="shrink-0 rounded-md bg-rose-500/25 px-2 py-0.5 font-mono text-xs font-bold text-rose-700 dark:text-rose-300">
                      {item.tier}
                    </span>
                  </div>
                  <div className="mt-1.5 font-sans text-xs font-semibold text-rose-700 dark:text-rose-300">
                    <RichGuideText
                      text={item.costAndCap}
                      variant="inline"
                      accentColor="rose"
                    />{" "}
                    •{" "}
                    <RichGuideText
                      text={item.diamondValue}
                      variant="inline"
                      accentColor="rose"
                    />
                  </div>
                  <RichGuideText
                    text={item.roiDirective}
                    accentColor="rose"
                    className="mt-1.5 text-sm sm:text-base font-sans leading-relaxed text-foreground/90 dark:text-slate-200"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Double-Dip Guild Race -> GAR/KvK Footnote */}
      <div className="mt-4 flex items-start sm:items-center gap-2.5 rounded-xl border-0 bg-muted/35 dark:bg-white/[0.03] px-3.5 py-2.5 text-xs sm:text-sm font-sans leading-relaxed text-muted-foreground dark:text-slate-300">
        <ShieldAlert className="mt-0.5 sm:mt-0 h-4 w-4 shrink-0 text-amber-400" />
        <span>
          {locale === "vi"
            ? "Mẹo Double-Dip Theo Lộ Trình: Nhận Nhiệm Vụ Vàng Tiêu Sao/Xu trong Kỳ Thi Đấu Hội (Guild Race) mới bấm thanh toán giỏ hàng, sau đó cất kho 100% vật phẩm chờ đúng Ngày Sự Kiện Kỳ Đua Vũ Trang (GAR / KvK) mới mở dùng!"
            : "Event Roadmap Double-Dip Rule: Claim a Spend Currency Gold Task in Guild Race before checking out, then hoard 100% of purchased items in inventory until the matching GAR / KvK day!"}
        </span>
      </div>
    </div>
  );
}

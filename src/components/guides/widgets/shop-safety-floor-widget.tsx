"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import {
  AlertOctagon,
  CheckCircle2,
  Coins,
  Lock,
  ShieldAlert,
  ShoppingBag,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import type {
  GuideArticle,
  GuideLocale,
  GuideTableBlock,
} from "@/content/guides/types";
import { ARTICLE_7_1_SHOPS_TIER_LIST } from "@/content/guides/groups/group-7/7.1-shops-tier-list";
import { useUidSession } from "@/hooks/use-uid-session";
import { RichGuideText } from "@/components/guides/blocks/rich-guide-text";

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
      vi: "Đáy Ví An Toàn: 1,900–2,000 Arena Stars (Sao Đấu Trường)",
      en: "Weekly Safety Floor: 1,900–2,000 Arena Stars",
    },
    floorDetail: {
      vi: "Khóa cứng 1,900–2,000 Arena Stars trước 00:00 UTC Thứ Hai (07:00 sáng Giờ VN) để vét ngay gói 300 KC (50 Sao, ROI 600%), Vé Chiêu Mộ (50 Sao, ROI 300%), gói 300 KC định mức (300 Sao) và 5 Mảnh Tướng Vàng Hệ Chính (1,500 Sao: Soulmancer, Warlock, Pyromancer, Adjudicator, Pixie).",
      en: "Lock 1,900–2,000 Arena Stars before Monday 00:00 UTC to immediately sweep the 300-Diamond Super Pack (50 Stars, 600% ROI), Recruitment Token (50 Stars, 300% ROI), standard 300-Diamond pack (300 Stars), and 5x Main-Faction Legendary Shards (1,500 Stars: Soulmancer, Warlock, Pyromancer, Adjudicator, Pixie).",
    },
    surplusRule: {
      vi: "Chỉ dùng phần thặng dư vượt trên 2,000 Sao để mua Rương Trang Trí Tím Tự Chọn (2,500 Sao) khi thiếu đúng 1 mảnh kích Set.",
      en: "Only spend surplus above 2,000 Stars on Epic Decoration Choice Chests (2,500 Stars) to finish a Decor Set.",
    },
    forbiddenTrap: {
      vi: "CẤM MUA Trang Phục Guardian Skin giá 12,000 Sao (= 40 mảnh Tướng Vàng), vé giá gốc 300 Sao và mảnh lẻ 800 Sao!",
      en: "NEVER buy the 12,000-Star Guardian Skin (= 40 Legendary Shards), full-price 300-Star tokens, or 800-Star single shards!",
    },
    roiKeywords: ["Arena Shop", "Mọi Cửa Hàng", "All Shops"],
  },
  2: {
    floorBadge: {
      vi: "Đáy Ví An Toàn: 12,000–15,000 Guild Points (Điểm Cống Hiến Bang)",
      en: "Weekly Safety Floor: 12,000–15,000 Guild Points",
    },
    floorDetail: {
      vi: "Giữ sàn 12,000–15,000 Guild Points để luôn mua đủ Điểm VIP (1,000 Điểm/tuần = ROI Vô Cực), Bình Thể Lực 25 (800 Điểm, cất kho xả Thứ Tư Kỳ GAR/KvK) và Khiên Hòa Bình 8h/24h bảo vệ lính ngày Thứ Bảy KvK.",
      en: "Maintain 12,000–15,000 Guild Points to sweep VIP Points (1,000 Points/week = Infinite ROI), Stamina Potions (800 Points for Wednesday of GAR/KvK), and 8h/24h Peace Shields for Saturday KvK.",
    },
    surplusRule: {
      vi: "Khi số dư > 15,000 Guild Points, mua thêm Tăng tốc Xây dựng / Nghiên cứu 60m (2,000 Điểm).",
      en: "When balance exceeds 15,000 Guild Points, buy 60m Construction / Research Speed-ups (2,000 Points).",
    },
    forbiddenTrap: {
      vi: "Cấm xả cạn Guild Points trước ngày Thứ Bảy KvK khiến phải tốn 100–1,000 Kim Cương mua Khiên khẩn cấp!",
      en: "Never zero out Guild Points before Saturday KvK and waste 100–1,000 Diamonds on emergency Shields!",
    },
    roiKeywords: ["Guild Points Shop", "Mọi Cửa Hàng", "All Shops"],
  },
  3: {
    floorBadge: {
      vi: "Ưu Tiên Chiến Trường: Mảnh Vàng Vạn Năng Giảm Giá & Orichalcum",
      en: "Battlefield Priority: Discounted Universal Shards & Orichalcum",
    },
    floorDetail: {
      vi: "Dồn 100% Điểm Dũng Khí (Valor Coins) mua các bậc giảm giá Mảnh Tướng Vàng Vạn Năng (30/64/80 Xu), Mảnh Vũ Khí Độc Quyền và Orichalcum.",
      en: "Funnel 100% of Valor Coins into discounted Universal Legendary Hero Shards (30/64/80 Coins), Exclusive Gear Shards, and Orichalcum.",
    },
    surplusRule: {
      vi: "Mua thêm Magic Thread / Refined Metal khi đã vét hết Mảnh Vàng và Orichalcum tuần.",
      en: "Buy Magic Thread / Refined Metal after sweeping weekly Universal Shards and Orichalcum.",
    },
    forbiddenTrap: {
      vi: "Cấm đốt Xu Chiến Trường vào Thịt / Gỗ / Đá / Ruby cày miễn phí trên bản đồ!",
      en: "Never burn Valor Coins on farmable Meat / Wood / Stone / Rubies!",
    },
    roiKeywords: ["Combat Valor", "Mọi Cửa Hàng", "All Shops"],
  },
  4: {
    floorBadge: {
      vi: "Ưu Tiên 4 Quốc Gia: Vũ Khí Độc Quyền Vạn Năng & Đá Thăng Cấp",
      en: "4 Nations Priority: Universal Exclusive Gear Shards & Promotion Stones",
    },
    floorDetail: {
      vi: "Tập trung Xu Chiến Đấu (Clash Coins) cho Mảnh Vũ Khí Độc Quyền Vạn Năng (đột phá UW Lv.10 & Lv.20) và Đá Thăng Cấp Trang Bị (Promotion Stone).",
      en: "Focus Clash Coins on Universal Exclusive Gear Shards (for UW Lv.10 & Lv.20 breakthroughs) and Gear Promotion Stones.",
    },
    surplusRule: {
      vi: "Mua thêm Tinh Chất Thú Cưng (Pet Essence) và Orichalcum khi dư Xu.",
      en: "Purchase Pet Essence and Orichalcum with remaining surplus.",
    },
    forbiddenTrap: {
      vi: "Cấm mua tài nguyên thô hoặc rương trang bị phẩm chất thấp!",
      en: "Never buy raw resources or low-rarity gear chests!",
    },
    roiKeywords: ["4 Nations", "Citadel Clash", "Mọi Cửa Hàng", "All Shops"],
  },
  5: {
    floorBadge: {
      vi: "Đáy Ví An Toàn: 40,000 Điểm Vinh Dự / 6,000 Xu Vinh Quang (Hồn Đá Đỏ / Soul Stone)",
      en: "Safety Floor: 40,000 Guild Honor / 6,000 Guild Coins (Soul Stone)",
    },
    floorDetail: {
      vi: "Khóa chặt 40,000 Điểm Vinh Dự Bang / viên (tổng 360,000 Điểm cho 9 viên ở Lâu Đài Lv.30) hoặc 6,000 Xu Vinh Quang Hội / viên (tổng 54,000 Xu cho 9 viên xoay tua 3 tuần S1: League ➔ Horde ➔ Nature) để thức tỉnh Soulmancer, Warlock, Pyromancer, Adjudicator, Pixie.",
      en: "Lock 40,000 Guild Honor per stone (360,000 Honor for 9 stones at Castle Lv.30) or 6,000 Guild Coins per stone (54,000 Coins for 9 stones on 3-week S1 rotation: League ➔ Horde ➔ Nature) to awaken Soulmancer, Warlock, Pyromancer, Adjudicator, and Pixie.",
    },
    surplusRule: {
      vi: "Sau khi mua xong Hồn Đá Đỏ (Soul Stone) trong tuần, dùng phần dư mua Mảnh Vũ Khí Độc Quyền Vạn Năng.",
      en: "After securing the weekly Soul Stone, spend surplus on Universal Exclusive Gear Shards.",
    },
    forbiddenTrap: {
      vi: "Cấm tiêu sạch Điểm Vinh Dự / Xu Vinh Quang vào đạo cụ lặt vặt trước khi Lâu Đài đạt Lv.30 & bước vào S1!",
      en: "Never drain Guild Honor / Guild Coins on minor items before Castle Lv.30 & Season 1!",
    },
    roiKeywords: ["Guild Honor", "Guild Coin", "Mọi Cửa Hàng", "All Shops"],
  },
  6: {
    floorBadge: {
      vi: "Đáy Ví Kim Cương: Giữ Quỹ 15,000–32,000+ KC Cho Vòng Quay & Xúc Xắc",
      en: "Diamond Reserve: Keep 15,000–32,000+ Diamonds for Wheel & Dice",
    },
    floorDetail: {
      vi: "Trong VIP Shop chỉ mua Mảnh Tướng Vàng Vạn Năng giảm giá sâu (150–240 KC) và Bình Thể Lực 25 giảm giá.",
      en: "In VIP Shop, only buy deeply discounted Universal Legendary Shards (150–240 Diamonds) and Stamina Potions.",
    },
    surplusRule: {
      vi: "Mua thêm Sách Kỹ Năng Cam và Đá Cường Hóa giảm giá sâu nếu quỹ Kim Cương vượt trên 32,000 KC.",
      en: "Buy discounted Legendary Skill Books and Enhancement Runes only if Diamonds exceed 32,000.",
    },
    forbiddenTrap: {
      vi: "Cấm mua đồ nguyên giá bằng Kim Cương hoặc quay Tavern bằng Kim Cương lẻ!",
      en: "Never buy full-price Diamond items or pull regular Tavern banners with raw Diamonds!",
    },
    roiKeywords: ["VIP Shop", "Mọi Cửa Hàng", "All Shops"],
  },
  7: {
    floorBadge: {
      vi: "Mốc Mở Khóa: 12 Sao (Trait 3 +30%) vs 15 Sao (500 / 1,000 Mảnh Mở Exchange Shop)",
      en: "Unlock Rule: 12-Star (Trait 3 +30%) vs 15-Star (500 / 1,000 Shards Exchange Unlock)",
    },
    floorDetail: {
      vi: "Phân biệt rõ: Tướng Tím Kinh tế dừng ở 12 Sao (2 Sao Trắng) để mở Trait 3 (+30% xây dựng/nghiên cứu), còn phải đẩy tối đa 1 tướng lên 15 Sao (5 Sao Trắng/Bạc = 500 Mảnh Knight hoặc 1,000 Mảnh Tím/Vàng) mới mở khóa Hero Shard Exchange Shop!",
      en: "Distinguish clearly: Economy Epic heroes stop at 12 Stars (2 White Stars) for Trait 3 (+30% speed), whereas maxing 1 hero to 15 Stars (5 White/Silver Stars = 500 Knight Shards or 1,000 Epic/Legendary Shards) unlocks the Hero Shard Exchange Shop!",
    },
    surplusRule: {
      vi: "Đổi mảnh dư 15 Sao lấy Mảnh Vàng Vạn Năng và Mảnh Tím Vạn Năng hàng tuần.",
      en: "Exchange excess 15-Star shards for Universal Legendary and Epic Shards weekly.",
    },
    forbiddenTrap: {
      vi: "Cấm dừng tất cả tướng ở 12 Sao khiến không bao giờ mở được tiệm đổi mảnh dư!",
      en: "Never stop every single hero at 12 Stars and lock yourself out of the Shard Exchange Shop!",
    },
    roiKeywords: ["Exchange Shop", "Mọi Cửa Hàng", "All Shops"],
  },
  8: {
    floorBadge: {
      vi: "Bảo Lưu Xu Vòng Quay (Wheel Coins Carry Over): Tích Đủ Mốc Đổi Tướng Đỏ & UW",
      en: "Wheel Coins Carry Over: Bank for Mythic Hero & Exclusive Weapon Chests",
    },
    floorDetail: {
      vi: "Xu Vòng Quay (Wheel Coins) được bảo lưu qua các kỳ 3 tuần/lần; chỉ đổi Rương Tướng Đỏ (Mythic Hero) và Rương Vũ Khí Độc Quyền Hệ Chính.",
      en: "Wheel Coins carry over across 3-week cycles; redeem strictly for Main-Faction Mythic Hero and Exclusive Weapon Chests.",
    },
    surplusRule: {
      vi: "Giữ Xu chờ đúng kỳ Vòng Quay của Hệ Chính (Bộ Lạc / Thiên Nhiên / Liên Minh).",
      en: "Hold Wheel Coins until your Main Faction rotation arrives.",
    },
    forbiddenTrap: {
      vi: "Cấm tiêu lẻ Xu Vòng Quay vào Đá Cường Hóa hay Rương Tài Nguyên!",
      en: "Never spend Wheel Coins on enhancement stones or resource chests!",
    },
    roiKeywords: ["Wheel", "Mọi Cửa Hàng", "All Shops"],
  },
  9: {
    floorBadge: {
      vi: "Bảo Lưu Phiếu Xúc Xắc (Dice Vouchers Carry Over): Đổi Hồn Đá Đỏ & Tướng Đỏ",
      en: "Dice Vouchers Carry Over: Redeem Soul Stones & Mythic Heroes",
    },
    floorDetail: {
      vi: "Phiếu Xúc Xắc (Dice Vouchers) không mất đi khi hết sự kiện; tích lũy đổi Rương Tự Chọn Hồn Đá Đỏ / Tướng Đỏ và Trang Trí Huyền Thoại.",
      en: "Dice Vouchers persist across events; save for Soul Stone / Mythic Hero Choice Chests and Legendary Decorations.",
    },
    surplusRule: {
      vi: "Mua mảnh Trang Trí Vàng hoàn thiện bộ sưu tập cộng % ATK/HP toàn quân.",
      en: "Redeem Legendary Decor pieces that complete global % ATK/HP set bonuses.",
    },
    forbiddenTrap: {
      vi: "Cấm xả sạch Phiếu Xúc Xắc vào vật phẩm tiêu hao ngắn hạn!",
      en: "Never dump Dice Vouchers on short-term consumables!",
    },
    roiKeywords: ["Dice", "Mọi Cửa Hàng", "All Shops"],
  },
  10: {
    floorBadge: {
      vi: "Đáy Ví Huân Chương: 15,000–30,000 Glory Medals Mở Khóa Quân Trang",
      en: "Medal Floor: 15,000–30,000 Glory Medals for First-Time Troop Skins",
    },
    floorDetail: {
      vi: "Ưu tiên số 1 tại Medal Shop là mở khóa lần đầu Ngoại Hình Quân Lính Tím / Xanh (30,000 / 15,000 Glory Medals) để nhận buff chỉ số sở hữu vĩnh viễn cho toàn tài khoản.",
      en: "Priority #1 in Medal Shop is unlocking Epic / Rare Troop Skins for the first time (30,000 / 15,000 Glory Medals) for permanent account-wide ownership stats.",
    },
    surplusRule: {
      vi: "Sau khi mở khóa các Quân Trang cơ bản, dùng thặng dư mua Tăng tốc 60m.",
      en: "After unlocking core Troop Skins, spend surplus on 60m Speed-ups.",
    },
    forbiddenTrap: {
      vi: "Cấm mua lặp lại mảnh Skin đã满 hoặc đổi tài nguyên thô!",
      en: "Never over-buy maxed skin fragments or raw resources!",
    },
    roiKeywords: ["Medal Shop", "Mọi Cửa Hàng", "All Shops"],
  },
  11: {
    floorBadge: {
      vi: "Ưu Tiên Vương Quốc (KvK / S1+): Máu Rồng (Dragon Blood) & Tinh Chất Rồng",
      en: "Kingdom Emblem Priority: Dragon Blood, Dragon Essence & Exclusive Shards",
    },
    floorDetail: {
      vi: "Huy Hiệu Vương Quốc (Kingdom Emblems) là nguồn cung cấp độc quyền Máu Rồng (Dragon Blood), Tinh Chất Rồng (Dragon Essence) và Mảnh Vũ Khí Độc Quyền.",
      en: "Kingdom Emblems are the primary bottleneck source for Dragon Blood, Dragon Essence, and Universal Exclusive Gear Shards.",
    },
    surplusRule: {
      vi: "Mua thêm Orichalcum khi đã vét hết giới hạn Máu Rồng và Vũ Khí Độc Quyền.",
      en: "Buy Orichalcum after capping Dragon Blood and Exclusive Gear Shards.",
    },
    forbiddenTrap: {
      vi: "Cấm đổi Huy Hiệu Vương Quốc lấy Tăng tốc thường hoặc Gỗ/Đá!",
      en: "Never trade Kingdom Emblems for regular speed-ups or Wood/Stone!",
    },
    roiKeywords: ["Kingdom Emblem", "Mọi Cửa Hàng", "All Shops"],
  },
  12: {
    floorBadge: {
      vi: "Ưu Tiên Xâm Lăng (Invasion Shop): Mảnh Thánh Vật Vàng & Mảnh Tướng Vàng",
      en: "Invasion Shop Priority: Legendary Relic Shards & Universal Hero Shards",
    },
    floorDetail: {
      vi: "Dồn Xu Rồng Đen / Yeti (Invasion Coins) mua Mảnh Thánh Vật Vàng (Legendary Relic Shards) và Mảnh Tướng Vàng Vạn Năng.",
      en: "Spend Black Dragon / Yeti Invasion Coins strictly on Legendary Relic Shards and Universal Legendary Hero Shards.",
    },
    surplusRule: {
      vi: "Mua Cuộn Kinh Nghiệm Thánh Vật (Relic EXP Scrolls) khi còn dư xu.",
      en: "Buy Relic EXP Scrolls with leftover coins.",
    },
    forbiddenTrap: {
      vi: "Cấm mua mảnh Thánh Vật Xanh/Tím dễ kiếm từ hầm ngục thường!",
      en: "Never buy Blue/Purple Relic shards that drop freely in dungeons!",
    },
    roiKeywords: ["Invasion", "Black Dragon", "Mọi Cửa Hàng", "All Shops"],
  },
  13: {
    floorBadge: {
      vi: "Ưu Tiên Xu Trang Trí: Kích Hoạt Trọn Bộ Sưu Tập (Decor Set Bonus)",
      en: "Decor Token Priority: Complete Unowned Decor Set Bonuses",
    },
    floorDetail: {
      vi: "Chỉ dùng Xu Trang Trí (Decor Tokens) mua các món Trang Trí chưa sở hữu để kích hoạt mốc thưởng Bộ Sưu Tập (Set Bonus +ATK/+HP/+March Size).",
      en: "Spend Decor Tokens strictly on unowned decorations to activate full Decor Set Bonuses (+ATK/+HP/+March Size).",
    },
    surplusRule: {
      vi: "Nâng bậc các bộ Trang Trí cộng Tốc độ Xây dựng / Nghiên cứu hoặc HP Đội 1.",
      en: "Upgrade Decor Sets granting Construction/Research speed or Queue 1 HP.",
    },
    forbiddenTrap: {
      vi: "Cấm nâng cấp trùng lặp một món trang trí lẻ khi chưa mở khóa đủ bộ!",
      en: "Never upgrade duplicate single decorations before completing full sets!",
    },
    roiKeywords: ["Decor", "Mọi Cửa Hàng", "All Shops"],
  },
};

function detectArchCategory(tierText: string): "static" | "evolving" | "event" {
  if (/Static|Tĩnh/i.test(tierText)) return "static";
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

  return (
    <div
      data-testid="widget-shop-safety-floor"
      className="my-6 rounded-2xl border border-amber-500/30 bg-gradient-to-b from-[#141824]/95 via-[#0F131D]/95 to-[#0B0E14]/95 p-4 sm:p-6 shadow-[0_14px_36px_rgba(0,0,0,0.45)]"
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
      <div className="flex flex-col gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-300">
            <ShoppingBag className="h-3.5 w-3.5 text-amber-400" />
            <span>
              {locale === "vi"
                ? "13 Cửa Hàng • Ngưỡng Đóng Băng Ví & Tỷ Giá Kim Cương"
                : "13 In-Game Shops • Safety Floors & Diamond ROI"}
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white">
            {t("widgetShopSafetyTitle")}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            {t("widgetShopSafetySubtitle")}
          </p>
        </div>

        {/* Architecture Filter Tabs */}
        <div className="flex flex-wrap gap-1.5">
          {(
            [
              { id: "all", label: { vi: "Tất cả (13)", en: "All (13)" } },
              { id: "static", label: { vi: "Tĩnh (3)", en: "Static (3)" } },
              {
                id: "evolving",
                label: { vi: "Động / Bán động (7)", en: "Evolving (7)" },
              },
              { id: "event", label: { vi: "Sự kiện (3)", en: "Event (3)" } },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setArchFilter(tab.id)}
              className={`min-h-11 rounded-lg border px-2.5 py-1.5 text-xs font-bold transition ${
                archFilter === tab.id
                  ? "border-amber-400/60 bg-amber-500/20 text-amber-200"
                  : "border-white/10 bg-white/[0.03] text-slate-300 hover:bg-white/[0.07]"
              }`}
            >
              {tab.label[locale]}
            </button>
          ))}
        </div>
      </div>

      {/* 13 Shop Selector Pills */}
      <div
        role="tablist"
        aria-label={t("widgetShopSafetyTitle")}
        className="mt-4 flex flex-wrap gap-2"
      >
        {visibleShops.map((shop) => {
          const isActive = shop.shopNumber === activeShopNumber;
          const shortName = shop.shopName.split("(")[0].trim();
          return (
            <button
              key={shop.shopNumber}
              type="button"
              role="tab"
              aria-selected={isActive}
              data-testid={`shop-pill-${shop.shopNumber}`}
              onClick={() => setActiveShopNumber(shop.shopNumber)}
              className={`min-h-11 inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-bold transition ${
                isActive
                  ? "border-amber-400/60 bg-amber-500/20 text-white shadow-[0_0_16px_rgba(245,158,11,0.2)]"
                  : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/20 hover:bg-white/[0.07]"
              }`}
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full font-mono text-[10px] ${
                  isActive
                    ? "bg-amber-400 text-slate-950"
                    : "bg-white/10 text-slate-300"
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
          className="mt-5 rounded-xl border border-amber-500/35 bg-amber-500/[0.08] p-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                #{activeShop.shopNumber} • {activeShop.architectureTier} •{" "}
                {activeShop.resetCycle}
              </span>
              <h4 className="mt-0.5 text-base font-bold text-white">
                {activeShop.shopName}
              </h4>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-amber-400/40 bg-black/40 px-3 py-1.5 font-mono text-xs font-bold text-amber-300">
              <Coins className="h-3.5 w-3.5 text-amber-400" />
              {activeFloorMeta.floorBadge[locale]}
            </span>
          </div>

          <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-200">
            {activeFloorMeta.floorDetail[locale]}
          </p>

          <div className="mt-2.5 flex flex-wrap items-center gap-2 text-[11px] text-slate-300">
            <span className="rounded bg-white/10 px-2 py-0.5 font-semibold text-amber-200">
              {locale === "vi" ? "Tiền tệ: " : "Currency: "}
              {activeShop.currencySource}
            </span>
            {!hasProAccess && (
              <span className="inline-flex items-center gap-1 rounded bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                <Lock className="h-3 w-3" /> PRO ROI
              </span>
            )}
          </div>
        </div>
      )}

      {/* 3-Bucket Item Priority Board */}
      <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-3">
        {/* Bucket 1: Must-Sweep (S+ / S) */}
        <div
          data-testid="shop-bucket-must-sweep"
          className="rounded-xl border border-emerald-500/30 bg-emerald-500/[0.06] p-4"
        >
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-300">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>
              {locale === "vi"
                ? "🟢 Nên Vét Sạch (Must-Sweep S+ / S)"
                : "🟢 Must-Sweep (S+ / S Tier)"}
            </span>
          </div>

          {activeShop && (
            <div className="mt-2.5 rounded-lg border border-emerald-500/25 bg-black/30 p-2.5 text-xs text-emerald-100">
              <div className="font-bold text-emerald-300">
                {locale === "vi"
                  ? "👑 Mục Tiêu Số 1 SSoT:"
                  : "👑 #1 Supreme Target:"}
              </div>
              <RichGuideText
                text={activeShop.supremeTarget}
                accentColor="emerald"
                className="mt-1 leading-relaxed"
              />
            </div>
          )}

          <div className="mt-2.5 space-y-2">
            {mustSweepItems.map((item, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-white/10 bg-black/25 p-2.5 text-xs"
              >
                <div className="flex items-center justify-between gap-2 font-bold text-white">
                  <span>
                    <RichGuideText
                      text={item.itemName}
                      variant="inline"
                      accentColor="emerald"
                    />
                  </span>
                  <span className="shrink-0 rounded bg-emerald-500/20 px-1.5 py-0.5 font-mono text-[10px] text-emerald-300">
                    {item.tier}
                  </span>
                </div>
                <div className="mt-1 font-mono text-[11px] text-amber-300">
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
                  className="mt-1 text-[11px] text-slate-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bucket 2: Surplus Only (A / B) */}
        <div
          data-testid="shop-bucket-surplus"
          className="rounded-xl border border-amber-500/30 bg-amber-500/[0.06] p-4"
        >
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
            <TrendingUp className="h-4 w-4 text-amber-400" />
            <span>
              {locale === "vi"
                ? "🟡 Mua Khi Vượt Đáy Ví (Surplus A / B)"
                : "🟡 Buy Above Safety Floor (Surplus A / B)"}
            </span>
          </div>

          <div className="mt-2.5 rounded-lg border border-amber-500/25 bg-black/30 p-2.5 text-xs text-amber-100">
            <div className="font-bold text-amber-300">
              {locale === "vi"
                ? "⚖️ Quy Tắc Chi Tiêu Thặng Dư:"
                : "⚖️ Surplus Spending Rule:"}
            </div>
            <p className="mt-1 leading-relaxed">
              {activeFloorMeta.surplusRule[locale]}
            </p>
          </div>

          <div className="mt-2.5 space-y-2">
            {surplusItems.map((item, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-white/10 bg-black/25 p-2.5 text-xs"
              >
                <div className="flex items-center justify-between gap-2 font-bold text-white">
                  <span>
                    <RichGuideText
                      text={item.itemName}
                      variant="inline"
                      accentColor="amber"
                    />
                  </span>
                  <span className="shrink-0 rounded bg-amber-500/20 px-1.5 py-0.5 font-mono text-[10px] text-amber-300">
                    {item.tier}
                  </span>
                </div>
                <div className="mt-1 font-mono text-[11px] text-amber-300">
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
                  className="mt-1 text-[11px] text-slate-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bucket 3: Forbidden Traps (F-Tier) */}
        <div
          data-testid="shop-bucket-forbidden"
          className="rounded-xl border border-rose-500/35 bg-rose-500/[0.07] p-4"
        >
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-300">
            <AlertOctagon className="h-4 w-4 text-rose-400" />
            <span>
              {locale === "vi"
                ? "🔴 Cấm Tuyệt Đối Mua (Forbidden F-Tier)"
                : "🔴 Strictly Forbidden (F-Tier Traps)"}
            </span>
          </div>

          <div className="mt-2.5 rounded-lg border border-rose-500/30 bg-black/30 p-2.5 text-xs text-rose-100">
            <div className="font-bold text-rose-300">
              {locale === "vi" ? "🚫 Cạm Bẫy Đốt Ví:" : "🚫 Currency Trap:"}
            </div>
            <p className="mt-1 leading-relaxed">
              {activeFloorMeta.forbiddenTrap[locale]}
            </p>
          </div>

          <div className="mt-2.5 space-y-2">
            {forbiddenItems.map((item, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-rose-500/25 bg-black/25 p-2.5 text-xs"
              >
                <div className="flex items-center justify-between gap-2 font-bold text-rose-200">
                  <span>
                    <RichGuideText
                      text={item.itemName}
                      variant="inline"
                      accentColor="rose"
                    />
                  </span>
                  <span className="shrink-0 rounded bg-rose-500/25 px-1.5 py-0.5 font-mono text-[10px] text-rose-300">
                    {item.tier}
                  </span>
                </div>
                <div className="mt-1 font-mono text-[11px] text-rose-300">
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
                  className="mt-1 text-[11px] text-slate-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Double-Dip Guild Race -> GAR/KvK Footnote */}
      <div className="mt-4 flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 text-[11px] text-slate-300">
        <ShieldAlert className="h-3.5 w-3.5 shrink-0 text-amber-400" />
        <span>
          {locale === "vi"
            ? "Mẹo Double-Dip Theo Lộ Trình: Nhận Nhiệm Vụ Vàng Tiêu Sao/Xu trong Kỳ Thi Đấu Hội (Guild Race) mới bấm thanh toán giỏ hàng, sau đó cất kho 100% vật phẩm chờ đúng Ngày Sự Kiện Kỳ Đua Vũ Trang (GAR / KvK) mới mở dùng!"
            : "Event Roadmap Double-Dip Rule: Claim a Spend Currency Gold Task in Guild Race before checking out, then hoard 100% of purchased items in inventory until the matching GAR / KvK day!"}
        </span>
      </div>
    </div>
  );
}

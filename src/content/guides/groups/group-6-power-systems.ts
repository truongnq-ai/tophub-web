import type { GuideCategory } from "../types";
import { ARTICLE_6_1_RUNES_GUIDE } from "./group-6/6.1-runes-guide";
import { ARTICLE_6_2_RELICS_GUIDE } from "./group-6/6.2-relics-guide";
import { ARTICLE_6_3_PETS_AND_BEHEMOTH } from "./group-6/6.3-pets-and-behemoth";

export const GROUP_6_POWER_SYSTEMS_CATEGORY: GuideCategory = {
  order: 6,
  slug: "power-systems",
  zoneId: "zone_systems_economy",
  iconName: "Sparkles",
  title: {
    vi: "Cổ Ngữ, Thánh Vật & Thú Cưng",
    en: "Runes, Relics & Pets / Behemoth",
  },
  description: {
    vi: "Bảng thông số Cổ Ngữ (Runes Lv.1–12, điểm gãy Lv.5/Lv.8 & dòng Combat Skill Level +1/+2 xả Thứ Ba Kỳ GAR/KvK), phối Bộ 3 Thánh Vật (Relics Trio BiS 3 Phe, Áp Chế Sao -50% & bảng 20★ xả Ngày 1–2 Kỳ GAR/KvK) và chiến thuật nuôi Thú Cưng 3 Phe (Lv.1–120) / Cự Thú Behemoth (Lv.1–150).",
    en: "Runes Lv.1–12 stat tables (Lv.5/Lv.8 breakpoints, Combat Skill Level +1/+2 & Tuesday GAR/KvK dump), 3-Faction BiS Relic Trio loadouts (-50% Star Suppression, 20★ cost tables & Day 1–2 GAR/KvK dump), and 3-Faction Pets (Lv.1–120) & Season 3 Behemoth (Lv.1–150) progression.",
  },
  articles: [
    ARTICLE_6_1_RUNES_GUIDE,
    ARTICLE_6_2_RELICS_GUIDE,
    ARTICLE_6_3_PETS_AND_BEHEMOTH,
  ],
};

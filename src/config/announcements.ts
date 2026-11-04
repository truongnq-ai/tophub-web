export type AnnouncementType =
  | "CALCULATOR"
  | "FEATURE"
  | "GUIDE"
  | "GIFTCODE"
  | "EVENT"
  | "MAINTENANCE";

export type AnnouncementVisualKind =
  | "calculator"
  | "guide"
  | "giftcode"
  | "event"
  | "maintenance";

export interface LocalizedAnnouncementText {
  vi: string;
  en: string;
}

/**
 * SystemAnnouncement schema.
 * Hydrated dynamically from Admin Dashboard (`app_configs.key = "system:announcements"`)
 * with automatic fallback to `SYSTEM_ANNOUNCEMENTS`.
 */
export interface SystemAnnouncement {
  id: string;
  type: AnnouncementType;
  isActive: boolean;
  href: string;
  startsAt?: string | null;
  endsAt?: string | null;
  badge: LocalizedAnnouncementText;
  message: LocalizedAnnouncementText;
  ctaLabel: LocalizedAnnouncementText;
  sortOrder?: number;
  updatedAt?: string;
}

export function resolveAnnouncementVisualKind(
  item: Pick<SystemAnnouncement, "type" | "href">
): AnnouncementVisualKind {
  if (item.type === "CALCULATOR") return "calculator";
  if (item.type === "GUIDE") return "guide";
  if (item.type === "GIFTCODE") return "giftcode";
  if (item.type === "EVENT") return "event";
  if (item.type === "MAINTENANCE") return "maintenance";

  const cleanHref = (item.href || "").trim().toLowerCase();
  if (cleanHref.startsWith("/guides")) return "guide";
  if (cleanHref.startsWith("/calculators")) return "calculator";
  return "calculator";
}

export const SYSTEM_ANNOUNCEMENTS: SystemAnnouncement[] = [
  {
    id: "ann-official-domain-launch-2026",
    type: "EVENT",
    isActive: true,
    href: "https://topherohub.com",
    startsAt: null,
    endsAt: null,
    badge: {
      vi: "DIỆN MẠO MỚI",
      en: "NEW DOMAIN",
    },
    message: {
      vi: "🎉 Tự hào diện mạo mới! TopHub (Top Hero Hub) chính thức chuyển đổi tên miền từ tophero.vercel.app sang https://topherohub.com/ — Cổng tiện ích Nhận Quà, Tính Toán & Cẩm Nang chiến thuật số 1 dành cho Chỉ Huy Top Heroes!",
      en: "🎉 Proudly unveiling our new home! TopHub (Top Hero Hub) has officially moved from tophero.vercel.app to https://topherohub.com/ — The #1 Giftcode, Calculator & Tactical Guides Hub for Top Heroes Commanders!",
    },
    ctaLabel: {
      vi: "Truy Cập Ngay",
      en: "Visit Now",
    },
    sortOrder: 0,
  },
  {
    id: "ann-calculators-launch-2026",
    type: "FEATURE",
    isActive: true,
    href: "/calculators",
    startsAt: null,
    endsAt: null,
    badge: {
      vi: "TÍNH NĂNG MỚI",
      en: "NEW FEATURE",
    },
    message: {
      vi: "Ra mắt chuyên trang Tính Toán (Calculators) Top Heroes! Quy hoạch chính xác 100% Mảnh Vạn Năng nâng sao tướng, Sách Skill, Đồ Chúa Tể, Cổ Ngữ, Bí Bảo & Lâu Đài Chính theo bảng dữ liệu gốc — Khám phá ngay!",
      en: "Introducing the Top Heroes Calculators Hub! Plan 100% exact Universal Hero Shards, Skill Books, Lord Gear, Runes, Relics & Main Castle upgrades powered by the master dataset — Explore now!",
    },
    ctaLabel: {
      vi: "Mở Tính Toán",
      en: "Open Calculators",
    },
    sortOrder: 1,
  },
  {
    id: "ann-guides-launch-2026",
    type: "GUIDE",
    isActive: true,
    href: "/guides",
    startsAt: null,
    endsAt: null,
    badge: {
      vi: "CẨM NANG",
      en: "GUIDES",
    },
    message: {
      vi: "Ra mắt chuyên trang Cẩm Nang Chiến Thuật Top Heroes! Mở quyển sách tri thức với 33 bài viết chuyên sâu (S0 ➔ S4), Playbook 3 Phe Thuần từ Ngày 1, khung giờ vàng Double-Dip & 8 công cụ tra cứu tương tác — Khám phá ngay!",
      en: "Introducing the Top Heroes Tactical Guides Hub! Open the knowledge tome featuring 33 in-depth guides (S0 -> S4), 3-Faction Pure Playbooks, Double-Dip schedules & 8 interactive lookup tools — Explore now!",
    },
    ctaLabel: {
      vi: "Mở Cẩm Nang",
      en: "Open Guides",
    },
    sortOrder: 2,
  },
];

/**
 * Evaluates whether an announcement is currently active and within its optional date window.
 * Safely guards against malformed date strings (`GAP-06`).
 */
export function isAnnouncementActive(
  item: SystemAnnouncement,
  now: Date = new Date()
): boolean {
  if (!item.isActive) return false;

  const nowMs = now.getTime();
  if (Number.isNaN(nowMs)) return false;

  if (item.startsAt) {
    const startMs = Date.parse(item.startsAt);
    if (Number.isNaN(startMs) || nowMs < startMs) {
      return false;
    }
  }

  if (item.endsAt) {
    const endMs = Date.parse(item.endsAt);
    if (Number.isNaN(endMs) || nowMs > endMs) {
      return false;
    }
  }

  return true;
}

export function getActiveAnnouncements(
  now: Date = new Date(),
  source: SystemAnnouncement[] = SYSTEM_ANNOUNCEMENTS
): SystemAnnouncement[] {
  return source
    .filter((item) => isAnnouncementActive(item, now))
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}

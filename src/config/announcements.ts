export type AnnouncementType = "GUIDE" | "FEATURE" | "EVENT" | "MAINTENANCE";

export interface LocalizedAnnouncementText {
  vi: string;
  en: string;
}

/**
 * Future-proof SystemAnnouncement schema.
 * Phase 1: Loaded from static configuration (`SYSTEM_ANNOUNCEMENTS`).
 * Phase 2: Hydrated from Admin Dashboard & Database (`system_announcements` table)
 * without requiring any UI component refactoring.
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
}

export const SYSTEM_ANNOUNCEMENTS: SystemAnnouncement[] = [
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
  },
  {
    id: "ann-guides-launch-2026",
    type: "GUIDE",
    isActive: false,
    href: "/guides",
    startsAt: null,
    endsAt: null,
    badge: {
      vi: "THÔNG BÁO MỚI",
      en: "NEW UPDATE",
    },
    message: {
      vi: "Ra mắt chuyên trang Cẩm Nang Chiến Thuật Top Heroes! Mở quyển sách tri thức với 31 bài viết chuyên sâu (S0 ➔ S4), lộ trình xoay trục Bộ Lạc, khung giờ vàng Double-Dip & 8 công cụ tra cứu tương tác — Khám phá ngay!",
      en: "Introducing the Top Heroes Tactical Guides Hub! Open the knowledge tome featuring 31 in-depth guides (S0 -> S4), Horde Pivot roadmaps, Double-Dip schedules & 8 interactive lookup tools — Explore now!",
    },
    ctaLabel: {
      vi: "Mở Cẩm Nang",
      en: "Open Guides",
    },
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
  return source.filter((item) => isAnnouncementActive(item, now));
}

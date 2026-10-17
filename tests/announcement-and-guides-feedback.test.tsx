import React from "react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import viMessages from "../messages/vi.json";
import enMessages from "../messages/en.json";
import {
  SYSTEM_ANNOUNCEMENTS,
  isAnnouncementActive,
  getActiveAnnouncements,
  type SystemAnnouncement,
} from "../src/config/announcements";
import { HomeAnnouncementTicker } from "../src/components/home/home-announcement-ticker";
import { GuidesFeedbackNotice } from "../src/components/guides/guides-feedback-notice";
import { GuideCommentsSection } from "../src/components/guides/guide-comments-section";

vi.mock("@/i18n/routing", () => ({
  Link: ({ href, children, className, ...rest }: any) => (
    <a href={href} className={className} {...rest}>
      {children}
    </a>
  ),
  usePathname: () => "/",
}));

let mockLocale = "vi";
vi.mock("next-intl", () => ({
  useLocale: () => mockLocale,
  useTranslations: (ns?: string) => (key: string) => {
    if (ns === "Navigation") {
      return (viMessages.Navigation as Record<string, string>)[key] ?? key;
    }
    if (ns === "Header") {
      return (viMessages.Header as Record<string, string>)[key] ?? key;
    }
    return key;
  },
}));

let mockActiveAccount: any = null;
vi.mock("@/hooks/use-uid-session", () => ({
  useUidSession: () => ({
    activeAccount: mockActiveAccount,
    savedAccounts: mockActiveAccount ? [mockActiveAccount] : [],
    selectAccount: vi.fn(),
    logout: vi.fn(),
    isLoaded: true,
  }),
}));

vi.mock("@/actions/comments", () => ({
  getPublicCommentsAction: vi.fn().mockResolvedValue({
    success: true,
    data: { items: [], total: 0, page: 1, limit: 30 },
  }),
  createPublicCommentAction: vi.fn(),
  toggleCommentLikeAction: vi.fn(),
  deleteOwnCommentAction: vi.fn(),
}));

const VI_DIACRITIC_REGEX =
  /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]/;

describe("Task 1 — SystemAnnouncement Schema, Date Boundaries & i18n Parity", () => {
  beforeEach(() => {
    mockLocale = "vi";
    mockActiveAccount = null;
    vi.restoreAllMocks();
  });

  it("defines default Guides launch announcement with valid bilingual fields and zero Vietnamese leaks in .en", () => {
    expect(SYSTEM_ANNOUNCEMENTS.length).toBeGreaterThanOrEqual(1);
    const guidesAnn = SYSTEM_ANNOUNCEMENTS.find(
      (a) => a.id === "ann-guides-launch-2026"
    );
    expect(guidesAnn).toBeDefined();
    expect(guidesAnn?.type).toBe("GUIDE");
    expect(guidesAnn?.href).toBe("/guides");
    expect(guidesAnn?.isActive).toBe(true);
    expect(VI_DIACRITIC_REGEX.test(guidesAnn?.message.vi ?? "")).toBe(true);
    expect(VI_DIACRITIC_REGEX.test(guidesAnn?.message.en ?? "")).toBe(false);
    expect(VI_DIACRITIC_REGEX.test(guidesAnn?.badge.en ?? "")).toBe(false);
    expect(VI_DIACRITIC_REGEX.test(guidesAnn?.ctaLabel.en ?? "")).toBe(false);
  });

  it("evaluates isAnnouncementActive accurately across active flags, date ranges, and invalid dates (GAP-06)", () => {
    const baseItem: SystemAnnouncement = {
      id: "test-ann",
      type: "FEATURE",
      isActive: true,
      href: "/guides",
      startsAt: null,
      endsAt: null,
      badge: { vi: "MỚI", en: "NEW" },
      message: { vi: "Thông báo thử nghiệm", en: "Test announcement" },
      ctaLabel: { vi: "Mở Cẩm Nang", en: "Open Guides" },
    };

    const now = new Date("2026-10-17T12:00:00.000Z");

    expect(isAnnouncementActive(baseItem, now)).toBe(true);
    expect(isAnnouncementActive({ ...baseItem, isActive: false }, now)).toBe(
      false
    );
    expect(
      isAnnouncementActive(
        {
          ...baseItem,
          startsAt: "2026-10-01T00:00:00.000Z",
          endsAt: "2026-10-31T23:59:59.000Z",
        },
        now
      )
    ).toBe(true);
    expect(
      isAnnouncementActive(
        {
          ...baseItem,
          startsAt: "2026-11-01T00:00:00.000Z",
        },
        now
      )
    ).toBe(false);
    expect(
      isAnnouncementActive(
        {
          ...baseItem,
          endsAt: "2026-10-10T00:00:00.000Z",
        },
        now
      )
    ).toBe(false);
    expect(
      isAnnouncementActive(
        {
          ...baseItem,
          startsAt: "invalid-date-string",
        },
        now
      )
    ).toBe(false);
    expect(
      isAnnouncementActive(
        {
          ...baseItem,
          endsAt: "invalid-date-string",
        },
        now
      )
    ).toBe(false);

    expect(getActiveAnnouncements(now).length).toBeGreaterThanOrEqual(1);
  });

  it("maintains strict 1:1 i18n key parity for Navigation.guidesNewBadge and Guides beta notice keys (GAP-03)", () => {
    expect(
      (viMessages.Navigation as Record<string, unknown>).guidesNewBadge
    ).toBe("MỚI");
    expect(
      (enMessages.Navigation as Record<string, unknown>).guidesNewBadge
    ).toBe("NEW");

    const viGuides = viMessages.Guides as Record<string, string>;
    const enGuides = enMessages.Guides as Record<string, string>;

    const requiredGuideNoticeKeys = [
      "betaTopBarLabel",
      "betaTopBarText",
      "betaTopBarAction",
      "betaPreCommentTitle",
      "betaPreCommentBody",
      "betaPreCommentAction",
    ];

    for (const key of requiredGuideNoticeKeys) {
      expect(typeof viGuides[key], `Missing vi.Guides.${key}`).toBe("string");
      expect(typeof enGuides[key], `Missing en.Guides.${key}`).toBe("string");
      expect(VI_DIACRITIC_REGEX.test(enGuides[key])).toBe(false);
    }
  });
});

describe("Task 2 — HomeAnnouncementTicker (Marquee R-to-L, Icons, A11y & Bilingual)", () => {
  beforeEach(() => {
    mockLocale = "vi";
  });

  it("renders Megaphone and Open Book icons, links to /guides, and marks clone track aria-hidden (GAP-05)", () => {
    render(<HomeAnnouncementTicker locale="vi" />);

    const ticker = screen.getByTestId("home-announcement-ticker");
    expect(ticker).toBeTruthy();

    expect(screen.getByTestId("announcement-megaphone-icon")).toBeTruthy();
    expect(
      screen.getAllByTestId("announcement-book-icon").length
    ).toBeGreaterThanOrEqual(1);

    const primaryTrack = screen.getByTestId("announcement-track-primary");
    const cloneTrack = screen.getByTestId("announcement-track-clone");
    expect(primaryTrack.getAttribute("aria-hidden")).not.toBe("true");
    expect(cloneTrack.getAttribute("aria-hidden")).toBe("true");

    expect(primaryTrack.textContent).toContain("Cẩm Nang Chiến Thuật");

    const link = ticker.querySelector("a");
    expect(link?.getAttribute("href")).toBe("/guides");
  });

  it("renders 100% pure English in locale='en' and hides cleanly when no announcements are active", () => {
    const { container, unmount } = render(<HomeAnnouncementTicker locale="en" />);
    expect(container.textContent ?? "").not.toMatch(VI_DIACRITIC_REGEX);
    expect(container.textContent).toContain("Tactical Guides Hub");
    unmount();

    const { container: emptyContainer } = render(
      <HomeAnnouncementTicker locale="vi" announcements={[]} />
    );
    expect(emptyContainer.firstChild).toBeNull();
  });

  it("renders NEW / MỚI badge next to Guides link in Header navigation (DEC-QW-04)", async () => {
    const { Header } = await import("../src/components/header");
    render(<Header />);
    const badge = screen.getByTestId("header-guides-new-badge");
    expect(badge).toBeTruthy();
    expect(badge.textContent).toBe("MỚI");
  });
});

describe("Task 3 — GuidesFeedbackNotice (Dual-Touch Top-Bar & Pre-Comment + 1-Click Focus)", () => {
  beforeEach(() => {
    mockLocale = "vi";
    mockActiveAccount = null;
  });

  it("renders both top-bar and pre-comment variants in VI and pure EN with zero Vietnamese leaks (GAP-01, GAP-02)", () => {
    const { unmount } = render(
      <div>
        <GuidesFeedbackNotice variant="top-bar" locale="vi" />
        <GuidesFeedbackNotice variant="pre-comment" locale="vi" />
      </div>
    );

    expect(screen.getByTestId("guides-feedback-top-bar")).toBeTruthy();
    expect(screen.getByTestId("guides-feedback-pre-comment")).toBeTruthy();
    expect(
      screen.getByTestId("guides-feedback-pre-comment").textContent
    ).toContain("Đây là nội dung đang xây dựng");
    unmount();

    const { container: enContainer } = render(
      <div>
        <GuidesFeedbackNotice variant="top-bar" locale="en" />
        <GuidesFeedbackNotice variant="pre-comment" locale="en" />
      </div>
    );
    expect(enContainer.textContent ?? "").not.toMatch(VI_DIACRITIC_REGEX);
    expect(enContainer.textContent).toContain("currently under active development");
  });

  it("scrolls safely without crashing in JSDOM and focuses comment textarea when user clicks feedback CTA (GAP-04)", async () => {
    mockActiveAccount = {
      uid: "2446869146316",
      nickname: "CommanderOne",
      server_id: "1028",
      active_plan: "PRO",
    };

    // Ensure JSDOM missing scrollIntoView does not crash first
    const originalScrollIntoView = Element.prototype.scrollIntoView;
    // @ts-expect-error testing missing scrollIntoView in JSDOM
    delete Element.prototype.scrollIntoView;

    render(
      <div>
        <GuidesFeedbackNotice variant="top-bar" locale="vi" />
        <GuideCommentsSection pageKey="guides:hub" locale="vi" />
      </div>
    );

    const topBarBtn = screen.getByTestId("guides-feedback-top-bar-btn");
    expect(() => fireEvent.click(topBarBtn)).not.toThrow();

    // Now attach a spy for scrollIntoView and click the pre-comment feedback CTA
    const scrollSpy = vi.fn();
    Element.prototype.scrollIntoView = scrollSpy;

    const preCommentBtn = screen.getByTestId("guides-feedback-action-btn");
    fireEvent.click(preCommentBtn);

    expect(scrollSpy).toHaveBeenCalled();

    const textarea = await screen.findByTestId("comment-root-textarea");
    await waitFor(() => {
      expect(document.activeElement).toBe(textarea);
    });

    Element.prototype.scrollIntoView = originalScrollIntoView;
  });
});

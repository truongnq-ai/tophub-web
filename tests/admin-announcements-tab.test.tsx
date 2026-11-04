import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { buildAdminNavGroups } from "@/components/dashboard/admin/admin-sidebar";
import { TabAnnouncements } from "@/components/dashboard/admin/tab-announcements";

vi.mock("@/i18n/routing", () => ({
  Link: ({ href, children, className, ...rest }: any) => (
    <a href={href} className={className} {...rest}>
      {children}
    </a>
  ),
  usePathname: () => "/",
}));

vi.mock("next-intl", () => ({
  useLocale: () => "vi",
}));

const actions = vi.hoisted(() => ({
  getAdminAnnouncementsAction: vi.fn(),
  createAdminAnnouncementAction: vi.fn(),
  updateAdminAnnouncementAction: vi.fn(),
  deleteAdminAnnouncementAction: vi.fn(),
  reorderAdminAnnouncementsAction: vi.fn(),
  resetAdminAnnouncementsAction: vi.fn(),
}));

vi.mock("@/actions/admin", () => actions);

const sampleItems = [
  {
    id: "ann-calculators-launch-2026",
    type: "CALCULATOR" as const,
    isActive: true,
    href: "/calculators",
    startsAt: null,
    endsAt: null,
    badge: { vi: "TÍNH NĂNG MỚI", en: "NEW FEATURE" },
    message: {
      vi: "Ra mắt chuyên mục Tính Toán Tài Nguyên Top Heroes!",
      en: "Introducing the Top Heroes Calculators Hub!",
    },
    ctaLabel: { vi: "Mở Tính Toán", en: "Open Calculators" },
    sortOrder: 0,
    updatedAt: "2026-11-04T00:00:00.000Z",
  },
  {
    id: "ann-guides-launch-2026",
    type: "GUIDE" as const,
    isActive: true,
    href: "/guides",
    startsAt: null,
    endsAt: null,
    badge: { vi: "CẨM NANG", en: "GUIDES" },
    message: {
      vi: "Ra mắt chuyên mục Cẩm Nang Toàn Thư Top Heroes!",
      en: "Introducing the Top Heroes Guides & Codex Hub!",
    },
    ctaLabel: { vi: "Mở Cẩm Nang", en: "Open Guides" },
    sortOrder: 1,
    updatedAt: "2026-11-04T00:00:00.000Z",
  },
];

describe("Admin Sidebar & TabAnnouncements (Below Proxy)", () => {
  beforeEach(() => {
    Object.values(actions).forEach((fn) => fn.mockReset());
    actions.getAdminAnnouncementsAction.mockResolvedValue({
      success: true,
      data: {
        items: sampleItems,
        summary: { total: 2, active: 2 },
      },
    });
  });

  it("places 'Thông Báo' (announcements) directly below 'Proxy' inside the 'Cấu hình' sidebar group", () => {
    const groups = buildAdminNavGroups({
      proxiesHealthy: 3,
      proxiesTotal: 4,
      announcementsActiveCount: 2,
      announcementsTotalCount: 2,
    });
    const configGroup = groups.find((g) => g.groupId === "config-group");
    expect(configGroup).toBeDefined();
    const ids = configGroup!.items.map((i) => i.id);
    const proxyIdx = ids.indexOf("proxies");
    const annIdx = ids.indexOf("announcements");
    expect(proxyIdx).toBeGreaterThanOrEqual(0);
    expect(annIdx).toBe(proxyIdx + 1);
    expect(configGroup!.items[annIdx]?.label).toBe("Thông Báo");
    expect(configGroup!.items[annIdx]?.badgeValue).toBe("2/2");
  });

  it("renders Live Ticker Preview, lists announcements, and reports summary via onSummaryChange", async () => {
    const onSummary = vi.fn();
    render(<TabAnnouncements onSummaryChange={onSummary} />);

    const matches = await screen.findAllByText(
      /Ra mắt chuyên mục Tính Toán Tài Nguyên Top Heroes!/i
    );
    expect(matches.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByTestId("home-announcement-ticker")).toBeTruthy();

    await waitFor(() =>
      expect(onSummary).toHaveBeenCalledWith({ active: 2, total: 2 })
    );
  });

  it("toggles announcement active state via Switch", async () => {
    actions.updateAdminAnnouncementAction.mockResolvedValue({
      success: true,
      data: { ...sampleItems[0], isActive: false },
    });

    render(<TabAnnouncements />);
    const toggleSwitch = await screen.findByRole("switch", {
      name: /Bật\/tắt thông báo TÍNH NĂNG MỚI/i,
    });
    fireEvent.click(toggleSwitch);

    await waitFor(() =>
      expect(actions.updateAdminAnnouncementAction).toHaveBeenCalledWith(
        "ann-calculators-launch-2026",
        { isActive: false }
      )
    );
  });

  it("creates a new announcement via modal dialog", async () => {
    actions.createAdminAnnouncementAction.mockResolvedValue({
      success: true,
      data: {
        id: "ann-new-1",
        type: "GUIDE",
        isActive: true,
        href: "/guides",
        startsAt: null,
        endsAt: null,
        badge: { vi: "GUILD BOSS", en: "GUILD BOSS" },
        message: { vi: "Hướng dẫn đánh Boss Guild mới", en: "New Guild Boss guide" },
        ctaLabel: { vi: "Xem Cẩm Nang", en: "View Guide" },
        sortOrder: 2,
      },
    });

    render(<TabAnnouncements />);
    fireEvent.click(
      await screen.findByRole("button", { name: /Thêm thông báo mới/i })
    );

    fireEvent.change(screen.getByLabelText(/Nhãn huy hiệu \(VI\)/i), {
      target: { value: "GUILD BOSS" },
    });
    fireEvent.change(screen.getByLabelText(/Nhãn huy hiệu \(EN\)/i), {
      target: { value: "GUILD BOSS" },
    });
    fireEvent.change(screen.getByLabelText(/Nội dung thông báo \(VI\)/i), {
      target: { value: "Hướng dẫn đánh Boss Guild mới" },
    });
    fireEvent.change(screen.getByLabelText(/Nội dung thông báo \(EN\)/i), {
      target: { value: "New Guild Boss guide" },
    });
    fireEvent.change(screen.getByLabelText(/Nút hành động CTA \(VI\)/i), {
      target: { value: "Xem Cẩm Nang" },
    });
    fireEvent.change(screen.getByLabelText(/Nút hành động CTA \(EN\)/i), {
      target: { value: "View Guide" },
    });
    fireEvent.change(screen.getByLabelText(/Đường dẫn đích \(Href\)/i), {
      target: { value: "/guides" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Lưu thông báo/i }));

    await waitFor(() =>
      expect(actions.createAdminAnnouncementAction).toHaveBeenCalledWith(
        expect.objectContaining({
          href: "/guides",
          badge: { vi: "GUILD BOSS", en: "GUILD BOSS" },
        })
      )
    );
  });

  it("reorders announcements and deletes with confirmation", async () => {
    actions.reorderAdminAnnouncementsAction.mockResolvedValue({
      success: true,
      data: { items: [sampleItems[1], sampleItems[0]] },
    });
    actions.deleteAdminAnnouncementAction.mockResolvedValue({
      success: true,
      data: { id: "ann-calculators-launch-2026" },
    });

    render(<TabAnnouncements />);

    const moveDownBtns = await screen.findAllByTitle("Chuyển xuống");
    fireEvent.click(moveDownBtns[0]!);

    await waitFor(() =>
      expect(actions.reorderAdminAnnouncementsAction).toHaveBeenCalledWith([
        "ann-guides-launch-2026",
        "ann-calculators-launch-2026",
      ])
    );

    const deleteBtns = await screen.findAllByTitle("Xóa thông báo");
    fireEvent.click(deleteBtns[0]!);
    fireEvent.click(screen.getByRole("button", { name: "Xác nhận xóa" }));

    await waitFor(() =>
      expect(actions.deleteAdminAnnouncementAction).toHaveBeenCalledWith(
        "ann-calculators-launch-2026"
      )
    );
  });
});

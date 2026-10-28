"use client";

import React, { useEffect, useState } from "react";
import {
  Users,
  Crown,
  Gift,
  History,
  CalendarCheck,
  MessageSquare,
  SlidersHorizontal,
  PanelLeftClose,
  PanelLeftOpen,
  Menu,
  ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export type AdminTabId =
  | "accounts"
  | "whale-analytics"
  | "giftcodes"
  | "redemptions"
  | "checkins"
  | "comments"
  | "system-params";

export interface AdminSidebarBadges {
  accountsCount?: number;
  payingWhalesCount?: number;
  activeGiftcodesCount?: number;
  redemptionsCount?: number;
  failedRedemptionsCount?: number;
  checkinsCount?: number;
  failedCheckinsCount?: number;
  pendingCommentsCount?: number;
  systemParamsCount?: number;
}

export interface AdminNavItemConfig {
  id: AdminTabId;
  label: string;
  legacyAlias?: string;
  shortDesc: string;
  icon: React.ComponentType<{ className?: string }>;
  badgeValue?: number | string;
  badgeTone?: "default" | "amber" | "rose" | "emerald" | "purple";
}

export interface AdminNavGroupConfig {
  groupId: string;
  groupLabel: string;
  items: AdminNavItemConfig[];
}

interface AdminSidebarProps {
  activeTab: AdminTabId;
  onSelectTab: (tab: AdminTabId) => void;
  badges: AdminSidebarBadges;
}

const STORAGE_COLLAPSED_KEY = "tophub_admin_sidebar_collapsed";

export function buildAdminNavGroups(badges: AdminSidebarBadges): AdminNavGroupConfig[] {
  const hasFailedRedemptions = (badges.failedRedemptionsCount ?? 0) > 0;
  const hasFailedCheckins = (badges.failedCheckinsCount ?? 0) > 0;

  return [
    {
      groupId: "accounts-group",
      groupLabel: "Tài khoản",
      items: [
        {
          id: "accounts",
          label: "Tài Khoản & Bot",
          legacyAlias: "Tài Khoản Game",
          shortDesc: "Danh sách tài khoản game, trạng thái gói PRO và cấu hình bot",
          icon: Users,
          badgeValue: badges.accountsCount,
          badgeTone: "default",
        },
        {
          id: "whale-analytics",
          label: "Thống Kê Nạp",
          shortDesc: "Phân tích doanh thu đa kênh Funtap + Official Store và bảng xếp hạng VIP",
          icon: Crown,
          badgeValue: badges.payingWhalesCount,
          badgeTone: "amber",
        },
      ],
    },
    {
      groupId: "giftcodes-group",
      groupLabel: "Gift Code",
      items: [
        {
          id: "giftcodes",
          label: "Kho Giftcode",
          legacyAlias: "Quản Lý Giftcode",
          shortDesc: "Quản lý danh sách mã quà tặng, thời hạn và kích hoạt phát quà tự động",
          icon: Gift,
          badgeValue: badges.activeGiftcodesCount,
          badgeTone: "emerald",
        },
        {
          id: "redemptions",
          label: "Lịch Sử Nhận Quà",
          legacyAlias: "Lịch Sử Đổi Mã",
          shortDesc: "Theo dõi kết quả nhập code tự động và chạy lại các lượt bị lỗi",
          icon: History,
          badgeValue: hasFailedRedemptions
            ? `${badges.failedRedemptionsCount} lỗi`
            : badges.redemptionsCount,
          badgeTone: hasFailedRedemptions ? "rose" : "default",
        },
        {
          id: "checkins",
          label: "Lịch Sử Điểm Danh",
          shortDesc: "Theo dõi tiến độ điểm danh 7 ngày và xử lý các tài khoản điểm danh lỗi",
          icon: CalendarCheck,
          badgeValue: hasFailedCheckins
            ? `${badges.failedCheckinsCount} lỗi`
            : badges.checkinsCount,
          badgeTone: hasFailedCheckins ? "rose" : "default",
        },
      ],
    },
    {
      groupId: "guides-group",
      groupLabel: "Cẩm nang",
      items: [
        {
          id: "comments",
          label: "Kiểm Duyệt Bình Luận",
          legacyAlias: "Bình Luận Cẩm Nang",
          shortDesc: "Kiểm duyệt bình luận bài viết cẩm nang, trả lời chính thức và lọc từ cấm",
          icon: MessageSquare,
          badgeValue: badges.pendingCommentsCount,
          badgeTone: badges.pendingCommentsCount ? "purple" : "default",
        },
      ],
    },
    {
      groupId: "config-group",
      groupLabel: "Cấu hình",
      items: [
        {
          id: "system-params",
          label: "Tham Số Hệ Thống",
          shortDesc: "Quản lý tỷ giá Store Point, mốc phân hạng VIP và tham số vận hành động",
          icon: SlidersHorizontal,
          badgeValue: badges.systemParamsCount,
          badgeTone: "default",
        },
      ],
    },
  ];
}

function getBadgeClasses(tone: AdminNavItemConfig["badgeTone"], isActive: boolean): string {
  if (tone === "rose") {
    return "bg-rose-500/20 text-rose-300 border-rose-500/40";
  }
  if (tone === "amber") {
    return "bg-amber-500/20 text-amber-300 border-amber-500/40";
  }
  if (tone === "emerald") {
    return "bg-emerald-500/20 text-emerald-300 border-emerald-500/40";
  }
  if (tone === "purple") {
    return "bg-purple-500/20 text-purple-300 border-purple-500/40";
  }
  return isActive
    ? "bg-amber-500/20 text-amber-200 border-amber-500/30"
    : "bg-slate-800/90 text-slate-400 border-slate-700/70";
}

export function AdminSidebar({ activeTab, onSelectTab, badges }: AdminSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_COLLAPSED_KEY);
      if (saved === "1") {
        setIsCollapsed(true);
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const toggleCollapsed = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      try {
        window.localStorage.setItem(STORAGE_COLLAPSED_KEY, next ? "1" : "0");
      } catch {
        // ignore storage errors
      }
      return next;
    });
  };

  const groups = buildAdminNavGroups(badges);
  const allItems = groups.flatMap((g) => g.items);
  const activeItem = allItems.find((i) => i.id === activeTab) ?? allItems[0]!;

  const renderNavList = (collapsedMode: boolean, onAfterSelect?: () => void) => (
    <div
      role="tablist"
      aria-orientation="vertical"
      aria-label="Menu Quản Trị Hệ Thống"
      className="space-y-4"
    >
      {groups.map((group) => (
        <div key={group.groupId} className="space-y-1">
          {!collapsedMode ? (
            <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400/90 flex items-center justify-between">
              <span>{group.groupLabel}</span>
              <span className="h-px flex-1 ml-2.5 bg-slate-800/80" />
            </div>
          ) : (
            <div
              className="mx-auto my-1.5 h-px w-6 bg-slate-800"
              title={group.groupLabel}
            />
          )}

          <div className="space-y-1">
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              const showBadge =
                (typeof item.badgeValue === "number" && item.badgeValue > 0) ||
                (typeof item.badgeValue === "string" && item.badgeValue.trim().length > 0);

              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  id={`admin-tab-${item.id}`}
                  aria-selected={isActive}
                  aria-controls={`admin-tabpanel-${item.id}`}
                  aria-label={
                    item.legacyAlias
                      ? `${item.label} (${item.legacyAlias}) ${item.badgeValue ?? ""}`.trim()
                      : `${item.label} ${item.badgeValue ?? ""}`.trim()
                  }
                  data-state={isActive ? "active" : "inactive"}
                  title={collapsedMode ? `${group.groupLabel} • ${item.label}` : item.shortDesc}
                  onMouseDown={(e) => {
                    if (e.button === 0) {
                      onSelectTab(item.id);
                      onAfterSelect?.();
                    }
                  }}
                  onClick={() => {
                    onSelectTab(item.id);
                    onAfterSelect?.();
                  }}
                  className={cn(
                    "group relative flex w-full items-center rounded-xl text-left text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60",
                    collapsedMode
                      ? "justify-center px-2 py-2.5"
                      : "justify-between gap-2.5 px-3 py-2.5",
                    isActive
                      ? "bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-transparent text-amber-300 border border-amber-500/30 shadow-[inset_2px_0_0_0_rgba(245,158,11,0.9)]"
                      : "text-slate-300 hover:bg-slate-800/60 hover:text-white border border-transparent"
                  )}
                >
                  <span className="flex items-center gap-2.5 min-w-0">
                    <Icon
                      className={cn(
                        "h-4 w-4 shrink-0 transition-colors",
                        isActive
                          ? "text-amber-400"
                          : "text-slate-400 group-hover:text-slate-200"
                      )}
                    />
                    {!collapsedMode && (
                      <span className="truncate leading-tight">{item.label}</span>
                    )}
                  </span>

                  {!collapsedMode && showBadge && (
                    <span
                      className={cn(
                        "ml-auto inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-[10px] font-bold tabular-nums leading-none",
                        getBadgeClasses(item.badgeTone, isActive)
                      )}
                    >
                      {item.badgeValue}
                    </span>
                  )}

                  {collapsedMode && showBadge && (
                    <span
                      className={cn(
                        "absolute top-1.5 right-1.5 h-2 w-2 rounded-full",
                        item.badgeTone === "rose"
                          ? "bg-rose-500"
                          : item.badgeTone === "amber"
                          ? "bg-amber-400"
                          : "bg-emerald-400"
                      )}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* Mobile / Tablet Sticky Bar + Drawer */}
      <div className="lg:hidden sticky top-16 z-30 -mx-4 px-4 py-2.5 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/25 text-amber-400">
            <activeItem.icon className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
              Phân hệ đang mở
            </div>
            <div className="text-sm font-bold text-white truncate">
              {activeItem.label}
            </div>
          </div>
        </div>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="border-slate-700 bg-slate-900/90 text-slate-200 hover:bg-slate-800 hover:text-white gap-2 shrink-0"
            >
              <Menu className="h-4 w-4 text-amber-400" />
              <span>Danh mục quản trị</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[290px] bg-slate-950 border-r border-slate-800 p-4 text-slate-100 overflow-y-auto"
          >
            <SheetHeader className="pb-4 mb-4 border-b border-slate-800 text-left">
              <SheetTitle className="flex items-center gap-2 text-base font-bold text-white">
                <ShieldAlert className="h-4 w-4 text-amber-400" />
                Trung Tâm Quản Trị
              </SheetTitle>
            </SheetHeader>
            {renderNavList(false, () => setMobileOpen(false))}
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sticky Left Sidebar */}
      <aside
        aria-label="Thanh điều hướng quản trị"
        className={cn(
          "hidden lg:block shrink-0 transition-[width] duration-200 ease-out",
          isCollapsed ? "w-14" : "w-64"
        )}
      >
        <div className="sticky top-20 rounded-2xl border border-slate-800/80 bg-slate-900/50 backdrop-blur-md p-2.5 shadow-xl">
          <div
            className={cn(
              "flex items-center border-b border-slate-800/80 pb-2.5 mb-3",
              isCollapsed ? "justify-center" : "justify-between px-2"
            )}
          >
            {!isCollapsed && (
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-wider text-amber-400/90">
                  Điều Hướng
                </p>
                <p className="text-[11px] text-slate-400 truncate">
                  4 nhóm • 7 chức năng
                </p>
              </div>
            )}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={toggleCollapsed}
              title={isCollapsed ? "Mở rộng thanh menu" : "Thu gọn thanh menu (tối ưu bảng rộng)"}
              className="h-7 w-7 text-slate-400 hover:text-white hover:bg-slate-800/80 shrink-0"
            >
              {isCollapsed ? (
                <PanelLeftOpen className="h-4 w-4" />
              ) : (
                <PanelLeftClose className="h-4 w-4" />
              )}
            </Button>
          </div>

          {renderNavList(isCollapsed)}
        </div>
      </aside>
    </>
  );
}

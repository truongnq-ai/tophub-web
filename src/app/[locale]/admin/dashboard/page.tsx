import React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { setRequestLocale } from "next-intl/server";
import { apiClient } from "@/lib/api-client";
import { AdminManager } from "@/components/dashboard/admin-manager";
import { extractPaginatedResult } from "@/components/dashboard/admin/types";
import type { AdminAccountsSummary } from "@/types/api";

interface AdminDashboardPageProps {
  params: {
    locale: string;
  };
}

export const metadata: Metadata = {
  title: "Admin Dashboard | TopHub",
  robots: {
    index: false,
    follow: false,
  },
};

const MOCK_FALLBACK_ACCOUNTS = [
  {
    id: "acc-1",
    uid: "1000000000001",
    nickname: "DragonSlayer",
    server_id: "1024",
    active_plan: "PRO",
    ends_at: "2026-12-31T23:59:59Z",
    auto_redeem: true,
    auto_checkin: false,
    token_status: "VALID",
    created_at: "2026-10-10T00:00:00Z",
  },
  {
    id: "acc-2",
    uid: "2446869146317",
    nickname: "ShadowNinja",
    server_id: "1028",
    active_plan: "FREE",
    ends_at: null,
    auto_redeem: false,
    auto_checkin: true,
    token_status: "EXPIRED",
    created_at: "2026-10-11T00:00:00Z",
  },
  {
    id: "acc-3",
    uid: "2446869146318",
    nickname: "CyberViking",
    server_id: "1028",
    active_plan: "PRO",
    ends_at: "2026-11-15T00:00:00Z",
    auto_redeem: true,
    auto_checkin: true,
    token_status: "VALID",
    created_at: "2026-10-09T00:00:00Z",
  },
  {
    id: "acc-4",
    uid: "2446869146319",
    nickname: "PhoenixLord",
    server_id: "1045",
    active_plan: "PRO",
    ends_at: "2026-12-01T00:00:00Z",
    auto_redeem: true,
    auto_checkin: true,
    token_status: "VALID",
    created_at: "2026-10-08T00:00:00Z",
  },
  {
    id: "acc-5",
    uid: "2446869146320",
    nickname: "IronKnight",
    server_id: "1088",
    active_plan: "FREE",
    ends_at: null,
    auto_redeem: false,
    auto_checkin: false,
    token_status: "EXPIRED",
    created_at: "2026-10-01T00:00:00Z",
  },
];

export default async function AdminDashboardPage({ params: { locale } }: AdminDashboardPageProps) {
  setRequestLocale(locale);
  const cookieStore = cookies();
  const adminToken = cookieStore.get("tophub_admin_token")?.value;

  let accounts = MOCK_FALLBACK_ACCOUNTS;
  let accountsSummary: AdminAccountsSummary | undefined = undefined;

  if (adminToken) {
    try {
      const res = await apiClient.getAdminAccounts(adminToken, { page: 1, limit: 20 });
      if (res.success && res.data) {
        const normalized = extractPaginatedResult(res.data, 1, 20);
        if (normalized.items.length > 0) {
          accounts = normalized.items;
        }
        accountsSummary = normalized.summary;
      }
    } catch {
      // Backend offline fallback
    }
  } else if (process.env.NODE_ENV === "production") {
    redirect(`/${locale}/admin/login`);
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 max-w-6xl">
      <AdminManager
        initialAccounts={accounts}
        initialAccountsSummary={accountsSummary}
        locale={locale}
      />
    </div>
  );
}

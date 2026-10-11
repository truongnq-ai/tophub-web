import React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";
import { authOptions } from "@/auth";
import { createBackendToken } from "@/lib/auth-token";
import { apiClient } from "@/lib/api-client";
import { AdminManager } from "@/components/dashboard/admin-manager";
import { UserStatusCard } from "@/components/dashboard/user-status-card";
import { AccountsManager } from "@/components/dashboard/accounts-manager";
import type { UserProfileResponse, GameAccountItem } from "@/types/api";

interface DashboardPageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params: { locale } }: DashboardPageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Dashboard" });
  return {
    title: `${t("title")} | TopHub`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function DashboardPage({ params: { locale } }: DashboardPageProps) {
  const cookieStore = cookies();
  const adminToken = cookieStore.get("tophub_admin_token")?.value;

  // 1. If Admin is logged in, show Admin Manager
  if (adminToken) {
    const adminRes = await apiClient.getAdminAccounts(adminToken);
    if (adminRes.success && adminRes.data) {
      return (
        <div className="container mx-auto px-4 py-8 sm:py-12 max-w-6xl">
          <AdminManager initialAccounts={adminRes.data} locale={locale} />
        </div>
      );
    }
  }

  // 2. Check Discord Session fallback for existing users
  const session = await getServerSession(authOptions);
  if (!session?.user?.discord_id) {
    redirect(`/${locale}/login`);
  }

  const t = await getTranslations({ locale, namespace: "Dashboard" });
  const tCommon = await getTranslations({ locale, namespace: "Common" });

  const authSecret = process.env.AUTH_SECRET || "default-secret-key-32-chars-long";
  const token = createBackendToken(session.user.discord_id, authSecret);

  // Parallel fetch profile and linked accounts from backend
  const [profileRes, accountsRes] = await Promise.all([
    apiClient.getUserProfile(token),
    apiClient.getUserAccounts(token),
  ]);

  let profile: UserProfileResponse;
  if (profileRes.success && profileRes.data) {
    profile = profileRes.data;
  } else {
    // Fallback profile if offline
    profile = {
      id: "local-user",
      discord_id: session.user.discord_id,
      active_plan: "PRO",
      subscription: {
        status: "ACTIVE",
        ends_at: new Date(Date.now() + 7 * 86400000).toISOString(),
        source: "TRIAL",
      },
      trial_used: false,
    };
  }

  let accounts: GameAccountItem[] = [];
  if (accountsRes.success && accountsRes.data) {
    accounts = accountsRes.data;
  }

  const userStatusLabels = {
    welcome: t("welcome"),
    planStatus: t("planStatus"),
    daysLeft: t("daysLeft"),
    trialBadge: t("trialBadge"),
    trialBanner: t("trialBanner"),
  };

  const accountManagerLabels = {
    manageAccountsTitle: t("manageAccountsTitle"),
    manageAccountsDesc: t("manageAccountsDesc"),
    addAccountBtn: t("addAccountBtn"),
    autoRedeem: t("autoRedeem"),
    autoCheckin: t("autoCheckin"),
    unlink: t("unlink"),
    unlinkConfirmTitle: t("unlinkConfirmTitle"),
    unlinkConfirmDesc: t("unlinkConfirmDesc"),
    addModalTitle: t("addModalTitle"),
    addModalDesc: t("addModalDesc"),
    uidLabel: t("uidLabel"),
    uidPlaceholder: t("uidPlaceholder"),
    verifying: t("verifying"),
    addSuccess: t("addSuccess"),
    emptyAccounts: t("emptyAccounts"),
    confirm: tCommon("confirm"),
    cancel: tCommon("cancel"),
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 max-w-5xl space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground font-heading">
          {t("title")}
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          Theo dõi trạng thái dịch vụ và cấu hình tự động hóa cho nhân vật Top Heroes.
        </p>
      </div>

      {/* User Status Card */}
      <UserStatusCard
        profile={profile}
        discordUser={{
          name: session.user.name,
          image: session.user.image,
        }}
        labels={userStatusLabels}
      />

      {/* Accounts Management Section */}
      <AccountsManager
        initialAccounts={accounts}
        labels={accountManagerLabels}
      />
    </div>
  );
}

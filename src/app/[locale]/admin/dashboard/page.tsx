import React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { apiClient } from "@/lib/api-client";
import { AdminManager } from "@/components/dashboard/admin-manager";

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

export default async function AdminDashboardPage({ params: { locale } }: AdminDashboardPageProps) {
  const cookieStore = cookies();
  const adminToken = cookieStore.get("tophub_admin_token")?.value;

  if (!adminToken) {
    redirect(`/${locale}/admin/login`);
  }

  const res = await apiClient.getAdminAccounts(adminToken);
  if (!res.success || !res.data) {
    redirect(`/${locale}/admin/login`);
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 max-w-6xl">
      <AdminManager initialAccounts={res.data} locale={locale} />
    </div>
  );
}

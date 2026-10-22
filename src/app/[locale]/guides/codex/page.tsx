import React, { Suspense } from "react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import type { GuideLocale } from "@/content/guides/types";
import { GameCodexClient } from "@/components/guides/codex/game-codex-client";

interface GuidesCodexPageProps {
  params: {
    locale: string;
  };
  searchParams?: Record<string, string | string[] | undefined>;
}

export async function generateMetadata({
  params: { locale },
}: GuidesCodexPageProps): Promise<Metadata> {
  const isVi = locale === "vi";
  const title = isVi
    ? "Kho Đồ Giám & Từ Điển Vật Phẩm Song Ngữ | TopHub"
    : "Bilingual Game Codex & Item Encyclopedia | TopHub";
  const description = isVi
    ? "Tra cứu hơn 3,400 Anh hùng, Trang bị, Cổ ngữ, Thánh vật, Thú cưng, Công trình và Vật phẩm sự kiện Top Heroes song ngữ Anh – Việt."
    : "Explore 3,400+ Top Heroes characters, gear, runes, relics, pets, buildings, and event items with linked strategy guides.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      locale: isVi ? "vi_VN" : "en_US",
    },
  };
}

export default async function GuidesCodexPage({
  params: { locale },
  searchParams,
}: GuidesCodexPageProps) {
  setRequestLocale(locale);
  const safeLocale: GuideLocale = locale === "en" ? "en" : "vi";

  // GAP-P5-04: Do not re-wrap in GuidesShell because src/app/[locale]/guides/layout.tsx already wraps children.
  // GAP-P5-09: Wrap in Suspense and pass initialSearchParams for Next.js 14 production build compatibility.
  return (
    <Suspense
      fallback={
        <div className="min-h-[480px] rounded-3xl bg-card/40 animate-pulse" />
      }
    >
      <GameCodexClient
        locale={safeLocale}
        initialSearchParams={searchParams}
      />
    </Suspense>
  );
}

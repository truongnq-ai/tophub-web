import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Sparkles, ShieldCheck, Loader2 } from "lucide-react";
import { CheckClient } from "@/components/check/check-client";

interface CheckPageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params: { locale } }: CheckPageProps): Promise<Metadata> {
  const isVi = locale === "vi";
  const title = isVi ? "Tra Cứu Trạng Thái Bot Top Heroes | TopHub" : "Top Heroes Bot Status Lookup | TopHub";
  const description = isVi
    ? "Tra cứu trạng thái bot tự động, gói cước PRO và lịch sử nhận quà giftcode Top Heroes trực tiếp theo UID game."
    : "Lookup Top Heroes automated bot status, PRO subscription and recent giftcode redemptions directly by Game UID.";

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

export default function CheckPage({ params: { locale } }: CheckPageProps) {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-14 max-w-6xl space-y-10">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3.5 py-1 text-xs font-semibold text-purple-300">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Tra Cứu Công Khai Không Cần Đăng Nhập</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-heading">
          Tra Cứu Trạng Thái Bot
        </h1>
        <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
          Nhập Game UID của bạn để kiểm tra gói cước hiện tại, trạng thái kết nối bot tự động và lịch sử đổi thưởng mới nhất.
        </p>
      </div>

      {/* Interactive Search & Status Display */}
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-20 text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin text-purple-400" />
          </div>
        }
      >
        <CheckClient locale={locale} />
      </Suspense>
    </div>
  );
}

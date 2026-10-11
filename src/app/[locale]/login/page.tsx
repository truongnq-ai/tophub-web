"use client";

import React from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sparkles, Disc as DiscordIcon } from "lucide-react";

export default function Login() {
  const locale = useLocale();
  const tNav = useTranslations("Navigation");
  const callbackUrl = "/" + locale + "/dashboard";

  return (
    <div className="relative flex min-h-[calc(100vh-16rem)] w-full items-center justify-center p-6 md:p-10 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className={cn("flex flex-col gap-6")}>
          <Card className="border border-white/10 bg-slate-900/60 backdrop-blur-2xl shadow-[0_0_50px_rgba(124,58,237,0.15)] rounded-2xl overflow-hidden">
            <CardHeader className="text-center space-y-2.5 pb-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white mx-auto shadow-[0_0_25px_rgba(124,58,237,0.5)]">
                <Sparkles className="h-7 w-7" />
              </div>
              <CardTitle className="text-2xl font-black text-foreground tracking-tight">{tNav("login")}</CardTitle>
              <CardDescription className="text-xs sm:text-sm text-slate-400">
                Đăng nhập an toàn bằng tài khoản Discord để quản lý UID game và đồng bộ gói TopHub Pro
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Button
                onClick={() => signIn("discord", { callbackUrl })}
                className="w-full flex items-center justify-center gap-3 bg-[#5865F2] hover:bg-[#4752C4] text-white min-h-[48px] py-6 text-base font-black rounded-xl shadow-[0_0_25px_rgba(88,101,242,0.4)] transition-all hover:scale-[1.01] active:scale-[0.98]"
              >
                <DiscordIcon className="h-5 w-5" />
                Đăng nhập với Discord
              </Button>
              <p className="text-xs text-center text-muted-foreground mt-2 leading-relaxed">
                Bằng việc đăng nhập, bạn đồng ý với{" "}
                <Link href={`/${locale}/terms`} className="underline text-purple-400 hover:text-purple-300 transition-colors">
                  Điều khoản dịch vụ
                </Link>{" "}
                và{" "}
                <Link href={`/${locale}/privacy`} className="underline text-purple-400 hover:text-purple-300 transition-colors">
                  Chính sách bảo mật
                </Link>{" "}
                của TopHub Companion.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

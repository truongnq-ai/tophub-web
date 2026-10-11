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
    <div className="flex min-h-[calc(100vh-16rem)] w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-md">
        <div className={cn("flex flex-col gap-6")}>
          <Card className="border border-border/70 bg-card/80 backdrop-blur-sm shadow-xl">
            <CardHeader className="text-center space-y-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-primary to-indigo-500 text-primary-foreground mx-auto shadow-md">
                <Sparkles className="h-6 w-6" />
              </div>
              <CardTitle className="text-2xl font-extrabold">{tNav("login")}</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Đăng nhập an toàn bằng tài khoản Discord để quản lý UID game và đồng bộ gói TopHub Pro
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Button
                onClick={() => signIn("discord", { callbackUrl })}
                className="w-full flex items-center justify-center gap-2.5 bg-[#5865F2] hover:bg-[#4752C4] text-white py-6 text-base font-bold shadow-md transition-transform hover:scale-[1.01]"
              >
                <DiscordIcon className="h-5 w-5" />
                Đăng nhập với Discord
              </Button>
              <p className="text-xs text-center text-muted-foreground mt-2 leading-relaxed">
                Bằng việc đăng nhập, bạn đồng ý với{" "}
                <Link href={`/${locale}/terms`} className="underline hover:text-foreground">
                  Điều khoản dịch vụ
                </Link>{" "}
                và{" "}
                <Link href={`/${locale}/privacy`} className="underline hover:text-foreground">
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

"use client";

import React from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import {
  Sparkles,
  Gift,
  Zap,
  ShieldCheck,
  Calendar,
  ArrowRight,
  Bot,
  Gamepad2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function LandingPage() {
  const tNav = useTranslations("Navigation");

  const highlightFeatures = [
    {
      icon: Gift,
      title: "Tự Động Săn Giftcode",
      desc: "Quét liên tục mạng xã hội & Discord Top Heroes. Tự động nhập vào tài khoản game của bạn trong 60 giây.",
      badge: "Siêu Tốc 60s",
      badgeColor: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30",
    },
    {
      icon: Calendar,
      title: "Điểm Danh Hàng Ngày",
      desc: "Tự động hoàn thành điểm danh game mỗi ngày vào lúc 00:05 UTC. Không bao giờ bỏ lỡ quà đăng nhập.",
      badge: "Tự Động 24/7",
      badgeColor: "bg-primary/10 text-primary border-primary/30",
    },
    {
      icon: Bot,
      title: "Thông Báo Bot Discord",
      desc: "Nhận tin nhắn thông báo riêng từ bot TopHub ngay khi có code mới được nhập thành công vào nhân vật.",
      badge: "Real-time",
      badgeColor: "bg-indigo-500/10 text-indigo-500 border-indigo-500/30",
    },
    {
      icon: ShieldCheck,
      title: "An Toàn Tuyệt Đối",
      desc: "Chỉ sử dụng mã số UID game công khai. Tuyệt đối không yêu cầu mật khẩu hay thông tin đăng nhập của bạn.",
      badge: "Bảo Mật 100%",
      badgeColor: "bg-amber-500/10 text-amber-500 border-amber-500/30",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 sm:py-20 max-w-6xl space-y-20">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary shadow-sm">
          <Sparkles className="h-4 w-4" />
          <span>Trợ Thủ Đắc Lực Cho Game Thủ Top Heroes</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15]">
          Không Bao Giờ Bỏ Lỡ Bất Kỳ Mã{" "}
          <span className="bg-gradient-to-r from-primary to-indigo-500 bg-clip-text text-transparent">
            Giftcode Top Heroes
          </span>
        </h1>

        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl leading-relaxed">
          TopHub tự động hóa toàn bộ quy trình săn quà tặng, điểm danh nhận kim cương và quản lý
          nhiều tài khoản game Top Heroes cùng lúc một cách dễ dàng và an toàn.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Button asChild size="lg" className="font-bold gap-2 text-sm sm:text-base px-6 py-6 shadow-lg shadow-primary/20">
            <Link href="/giftcodes">
              <Gift className="h-5 w-5" />
              <span>Săn Giftcode Hôm Nay</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg" className="font-semibold text-sm sm:text-base px-6 py-6 border-border/80">
            <Link href="/pricing">
              <Zap className="h-5 w-5 text-amber-500" />
              <span>Xem Gói Cước PRO</span>
            </Link>
          </Button>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Tại Sao Hơn 10.000+ Game Thủ Tin Dùng TopHub?
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Giải pháp thông minh giúp bạn tiết kiệm thời gian và dẫn đầu bảng xếp hạng
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {highlightFeatures.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <Card
                key={idx}
                className="border border-border/60 bg-card/60 backdrop-blur-sm hover:border-primary/40 transition-all hover:shadow-md"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <Badge variant="outline" className={`font-bold text-[11px] ${feat.badgeColor}`}>
                      {feat.badge}
                    </Badge>
                  </div>

                  <h3 className="text-lg font-bold text-foreground">{feat.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {feat.desc}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Quick CTA Banner */}
      <section className="rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/10 via-indigo-500/10 to-primary/10 p-8 sm:p-12 text-center space-y-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground mx-auto shadow-md">
          <Gamepad2 className="h-8 w-8" />
        </div>
        <div className="space-y-2 max-w-2xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Sẵn Sàng Nhận Quà Tự Động 24/7?
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Đăng nhập bằng tài khoản Discord ngay hôm nay để nhận ngay 7 ngày trải nghiệm gói PRO hoàn toàn miễn phí.
          </p>
        </div>
        <Button asChild size="lg" className="font-bold px-8 shadow-md">
          <Link href="/login">Bắt Đầu Trải Nghiệm Ngay</Link>
        </Button>
      </section>
    </div>
  );
}

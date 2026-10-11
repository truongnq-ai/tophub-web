"use client";

import React, { useState } from "react";
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
  Copy,
  Check,
  Flame,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function LandingPage() {
  const tNav = useTranslations("Navigation");
  const [copiedDemo, setCopiedDemo] = useState(false);

  const handleCopyDemo = () => {
    navigator.clipboard.writeText("TOPHERO2026");
    setCopiedDemo(true);
    setTimeout(() => setCopiedDemo(false), 2000);
  };

  const highlightFeatures = [
    {
      icon: Gift,
      title: "Tự Động Săn Giftcode",
      desc: "Quét liên tục mạng xã hội & Discord Top Heroes. Tự động nhập vào tài khoản game của bạn trong 60 giây.",
      badge: "Siêu Tốc 60s",
      badgeColor: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
    },
    {
      icon: Calendar,
      title: "Điểm Danh Hàng Ngày",
      desc: "Tự động hoàn thành điểm danh game mỗi ngày vào lúc 00:05 UTC. Không bao giờ bỏ lỡ quà đăng nhập.",
      badge: "Tự Động 24/7",
      badgeColor: "bg-primary/15 text-primary border-primary/30",
    },
    {
      icon: Bot,
      title: "Thông Báo Bot Discord",
      desc: "Nhận tin nhắn thông báo riêng từ bot TopHub ngay khi có code mới được nhập thành công vào nhân vật.",
      badge: "Real-time",
      badgeColor: "bg-indigo-500/15 text-indigo-400 border-indigo-500/30",
    },
    {
      icon: ShieldCheck,
      title: "An Toàn Tuyệt Đối",
      desc: "Chỉ sử dụng mã số UID game công khai. Tuyệt đối không yêu cầu mật khẩu hay thông tin đăng nhập của bạn.",
      badge: "Bảo Mật 100%",
      badgeColor: "bg-amber-500/15 text-amber-500 border-amber-500/30",
    },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-primary/20 via-purple-600/10 to-amber-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="container mx-auto px-4 py-12 sm:py-20 max-w-6xl space-y-24">
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto pt-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-4 py-1.5 text-xs font-bold text-primary shadow-sm shadow-primary/20">
            <Sparkles className="h-4 w-4 animate-pulse text-amber-400" />
            <span>Trợ Thủ Đắc Lực Số 1 Cho Game Thủ Top Heroes</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black tracking-tight text-foreground leading-[1.12]">
            Không Bao Giờ Bỏ Lỡ Bất Kỳ Mã{" "}
            <span className="bg-gradient-to-r from-primary via-purple-400 to-amber-400 bg-clip-text text-transparent">
              Giftcode Top Heroes
            </span>
          </h1>

          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl leading-relaxed font-sans">
            TopHub tự động hóa toàn bộ quy trình săn quà tặng, điểm danh nhận kim cương và quản lý
            nhiều tài khoản game Top Heroes cùng lúc một cách dễ dàng, nhanh chóng và an toàn.
          </p>

          {/* Interactive Fast Giftcode Preview */}
          <div className="w-full max-w-md p-4 rounded-2xl border border-border/80 bg-card/85 backdrop-blur-xl shadow-xl shadow-black/25 space-y-3">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5 font-bold text-emerald-400 uppercase tracking-wider">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Code Đang Hoạt Động Hôm Nay
              </span>
              <span className="font-mono text-xs">Cập nhật 60s trước</span>
            </div>

            <div className="flex items-center justify-between gap-3 p-3 rounded-xl border border-primary/30 bg-primary/10">
              <div className="flex items-center gap-2 overflow-hidden">
                <Gift className="h-5 w-5 text-amber-400 shrink-0" />
                <code className="font-mono font-extrabold text-lg sm:text-xl tracking-widest text-foreground select-all">
                  TOPHERO2026
                </code>
              </div>
              <Button
                size="sm"
                onClick={handleCopyDemo}
                className={`min-h-[40px] px-3.5 font-bold transition-all ${
                  copiedDemo ? "bg-emerald-500 text-white" : "bg-primary text-white hover:bg-primary/90"
                }`}
              >
                {copiedDemo ? (
                  <>
                    <Check className="h-4 w-4 mr-1 text-white" />
                    <span>Đã chép!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-1" />
                    <span>Sao chép</span>
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button
              asChild
              size="lg"
              className="font-bold gap-2 text-base px-7 py-6 min-h-[48px] bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-500 shadow-xl shadow-primary/25 active:scale-95 transition-transform"
            >
              <Link href="/giftcodes">
                <Gift className="h-5 w-5" />
                <span>Xem Toàn Bộ Giftcode</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="font-bold text-base px-7 py-6 min-h-[48px] border-border/80 bg-card/60 hover:bg-card hover:border-primary/50 backdrop-blur-sm transition-all"
            >
              <Link href="/pricing">
                <Zap className="h-5 w-5 text-amber-500 mr-1" />
                <span>Khám Phá Gói PRO</span>
              </Link>
            </Button>
          </div>
        </section>

        {/* Feature Highlights Grid */}
        <section className="space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-xs font-bold text-primary">
              <Users className="h-3.5 w-3.5" />
              <span>Cộng Đồng 10.000+ Game Thủ</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-foreground tracking-tight">
              Tại Sao Game Thủ Tin Dùng TopHub?
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Giải pháp tự động hóa thông minh giúp bạn tiết kiệm thời gian, tối đa hóa tài nguyên và luôn dẫn đầu bảng xếp hạng
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {highlightFeatures.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <Card
                  key={idx}
                  className="border border-border/80 bg-card/75 backdrop-blur-md hover:border-primary/50 hover:shadow-[0_0_25px_rgba(124,58,237,0.15)] hover:-translate-y-1 transition-all duration-300"
                >
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="h-12 w-12 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary shadow-inner">
                        <Icon className="h-6 w-6" />
                      </div>
                      <Badge variant="outline" className={`font-bold text-xs px-2.5 py-0.5 ${feat.badgeColor}`}>
                        {feat.badge}
                      </Badge>
                    </div>

                    <h3 className="text-xl font-heading font-bold text-foreground">{feat.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feat.desc}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Quick CTA Banner */}
        <section className="rounded-3xl border border-primary/40 bg-gradient-to-br from-card/90 via-primary/15 to-card/90 p-8 sm:p-12 text-center space-y-6 shadow-2xl shadow-primary/15 relative overflow-hidden backdrop-blur-xl">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-primary to-amber-500 text-white mx-auto shadow-xl shadow-primary/30">
            <Gamepad2 className="h-9 w-9" />
          </div>
          <div className="space-y-3 max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-heading font-black text-foreground tracking-tight">
              Sẵn Sàng Nhận Quà Tự Động 24/7?
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Đăng nhập bằng tài khoản Discord ngay hôm nay để nhận ngay 7 ngày trải nghiệm gói PRO hoàn toàn miễn phí.
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="font-bold px-8 py-6 min-h-[48px] bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/30 active:scale-95 transition-transform"
          >
            <Link href="/login" className="flex items-center gap-2">
              <span>Bắt Đầu Trải Nghiệm Ngay</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </section>
      </div>
    </div>
  );
}

import React from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Sparkles, Shield, Heart } from "lucide-react";

export function Footer() {
  const tNav = useTranslations("Navigation");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border/60 bg-muted/30 dark:bg-card/40 py-12 mt-auto">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand info */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="font-extrabold text-lg text-foreground">TopHub Companion</span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Nền tảng hỗ trợ game thủ Top Heroes tự động hóa săn giftcode, điểm danh hàng ngày và theo dõi sự kiện nhanh chóng.
            </p>
            <p className="text-[11px] text-muted-foreground/80 leading-relaxed border-l-2 border-primary/40 pl-2">
              Lưu ý: TopHub là công cụ hỗ trợ cộng đồng độc lập, không thuộc sở hữu hay liên kết chính thức với nhà phát hành game Top Heroes.
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-3 md:pl-8">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Tính năng nổi bật
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/giftcodes" className="text-muted-foreground hover:text-primary transition-colors">
                  {tNav("giftcodes")} 2026
                </Link>
              </li>
              <li>
                <Link href="/check" className="text-muted-foreground hover:text-primary transition-colors">
                  Tra Cứu Trạng Thái UID
                </Link>
              </li>
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Tự Động Điểm Danh 24/7
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal and Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Chính sách & Hỗ trợ
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Điều Khoản Dịch Vụ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Chính Sách Bảo Mật
                </Link>
              </li>
              <li>
                <a
                  href="https://discord.gg/topheroes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Cộng Đồng Discord Top Heroes
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {currentYear} TopHub Companion. Bản quyền thuộc về cộng đồng người chơi.</p>
          <p className="flex items-center gap-1">
            Phát triển với <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" /> dành cho Top Heroes gamers
          </p>
        </div>
      </div>
    </footer>
  );
}
